import type { Diagram, DiagramNode } from "../data";

// The SVG is drawn in a fixed 640-wide coordinate space and scales
// with the page column; below min-w it becomes a horizontal scroller
// so the labels never shrink beneath legibility.
const VIEW_W = 640;
const COL_W = 150;
const MIN_GAP = 24;
// Keeps edge attachment points away from node corners.
const EDGE_PAD = 14;

type PlacedNode = DiagramNode & { x: number; y: number; h: number };

function nodeHeight(node: DiagramNode) {
  const lines = node.details?.length ?? 0;
  return 34 + (lines > 0 ? 8 + lines * 13 : 0);
}

function layout(diagram: Diagram) {
  const columns = new Map<number, DiagramNode[]>();
  for (const node of diagram.nodes) {
    const col = columns.get(node.column) ?? [];
    col.push(node);
    columns.set(node.column, col);
  }
  const colKeys = [...columns.keys()].sort((a, b) => a - b);
  const gapX =
    colKeys.length > 1
      ? (VIEW_W - colKeys.length * COL_W) / (colKeys.length - 1)
      : 0;

  const height = Math.max(
    ...colKeys.map((key) => {
      const nodes = columns.get(key)!;
      return (
        nodes.reduce((sum, n) => sum + nodeHeight(n), 0) +
        (nodes.length - 1) * MIN_GAP
      );
    }),
  );

  const placed = new Map<string, PlacedNode>();
  colKeys.forEach((key, i) => {
    const nodes = columns.get(key)!;
    const x = i * (COL_W + gapX);
    if (nodes.length === 1) {
      placed.set(nodes[0].id, { ...nodes[0], x, y: 0, h: height });
      return;
    }
    const total = nodes.reduce((sum, n) => sum + nodeHeight(n), 0);
    const gap = (height - total) / (nodes.length - 1);
    let y = 0;
    for (const node of nodes) {
      const h = nodeHeight(node);
      placed.set(node.id, { ...node, x, y, h });
      y += h + gap;
    }
  });

  return { placed, height };
}

function edgeGeometry(diagram: Diagram, placed: Map<string, PlacedNode>) {
  const pairs = new Map<string, number[]>();
  diagram.edges.forEach((edge, i) => {
    const key = [edge.from, edge.to].sort().join("↔");
    const group = pairs.get(key) ?? [];
    group.push(i);
    pairs.set(key, group);
  });

  return diagram.edges.map((edge, i) => {
    const s = placed.get(edge.from)!;
    const t = placed.get(edge.to)!;
    const group = pairs.get([edge.from, edge.to].sort().join("↔"))!;

    // Parallel edges between the same two nodes are spread evenly
    // across the vertical range where both nodes overlap.
    const lo = Math.max(s.y, t.y) + EDGE_PAD;
    const hi = Math.min(s.y + s.h, t.y + t.h) - EDGE_PAD;
    let sy: number;
    let ty: number;
    if (hi > lo) {
      const y = lo + ((group.indexOf(i) + 1) * (hi - lo)) / (group.length + 1);
      sy = y;
      ty = y;
    } else {
      sy = s.y + s.h / 2;
      ty = t.y + t.h / 2;
    }

    const leftToRight = s.x <= t.x;
    return {
      edge,
      sx: leftToRight ? s.x + COL_W : s.x,
      sy,
      tx: leftToRight ? t.x : t.x + COL_W,
      ty,
    };
  });
}

export default function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  const { placed, height } = layout(diagram);
  const lines = edgeGeometry(diagram, placed);

  const nodeLabel = (id: string) =>
    diagram.nodes.find((n) => n.id === id)?.label ?? id;
  const description = `Architecture diagram. ${diagram.edges
    .map((e) => {
      const link =
        e.kind === "duplex"
          ? "connects two-way with"
          : e.kind === "async"
            ? "sends background work to"
            : "connects to";
      return `${nodeLabel(e.from)} ${link} ${nodeLabel(e.to)}${
        e.label ? ` via ${e.label}` : ""
      }`;
    })
    .join("; ")}.`;

  return (
    <figure className="mt-4">
      <div
        role="img"
        aria-label={description}
        tabIndex={0}
        className="overflow-x-auto"
      >
        <svg
          aria-hidden="true"
          viewBox={`-1 -1 ${VIEW_W + 2} ${height + 2}`}
          className="block w-full min-w-[560px]"
        >
          <defs>
            <marker
              id="arch-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0L8 4L0 8Z" className="fill-muted" />
            </marker>
          </defs>

          {[...placed.values()].map((node) => {
            // Center the text block when the node is stretched taller
            // than its natural height (single-node columns).
            const offset = (node.h - nodeHeight(node)) / 2;
            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={COL_W}
                  height={node.h}
                  rx={3}
                  className="fill-none stroke-foreground/25"
                />
                <text
                  x={node.x + 14}
                  y={node.y + offset + 21}
                  fontSize={11.5}
                  className="fill-foreground"
                >
                  {node.label}
                </text>
                {node.details?.map((detail, i) => (
                  <text
                    key={detail}
                    x={node.x + 14}
                    y={node.y + offset + 38 + i * 13}
                    fontSize={9}
                    className="fill-muted font-sans normal-case tracking-normal"
                  >
                    {detail}
                  </text>
                ))}
              </g>
            );
          })}

          {lines.map(({ edge, sx, sy, tx, ty }, i) => (
            <g key={i}>
              <line
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                strokeWidth={1}
                strokeDasharray={edge.kind === "async" ? "4 4" : undefined}
                markerEnd="url(#arch-arrow)"
                markerStart={
                  edge.kind === "duplex" ? "url(#arch-arrow)" : undefined
                }
                className="stroke-muted"
              />
              {edge.label && (
                <text
                  x={(sx + tx) / 2}
                  y={Math.min(sy, ty) - 5}
                  fontSize={9}
                  textAnchor="middle"
                  className="fill-muted font-sans normal-case tracking-normal"
                >
                  {edge.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      {diagram.caption && (
        <figcaption className="mt-3 font-sans text-xs normal-case tracking-normal leading-relaxed text-muted [text-shadow:none]">
          {diagram.caption}
        </figcaption>
      )}
    </figure>
  );
}
