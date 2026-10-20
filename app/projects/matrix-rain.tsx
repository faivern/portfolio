"use client";

import { useEffect, useRef } from "react";

const GLYPHS =
  "アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロ0123456789";
const FONT_SIZE = 11;
const TRAIL = 7;
const FADE_PER_SECOND = 7;

type Column = { head: number; speed: number; glyphs: string[] };

function glyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function makeColumn(height: number): Column {
  return {
    head: -Math.random() * height,
    speed: 28 + Math.random() * 46,
    glyphs: Array.from({ length: TRAIL }, glyph),
  };
}

/** Falling glyphs behind the Cybersecurity filter chip, clipped to it by the
 *  chip's own overflow. Takes its colour from the element's `color`, so it
 *  follows --area-accent through the theme swap. The loop keeps running after
 *  `active` drops so the trails can fade out, then parks itself. */
export function MatrixRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const kickRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let columns: Column[] = [];
    let width = 0;
    let height = 0;
    let opacity = 0;
    let frame = 0;
    let last = 0;

    const measure = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(1, Math.ceil(width / FONT_SIZE));
      columns = Array.from({ length: count }, () => makeColumn(height));
    };

    const draw = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;

      const target = activeRef.current ? 1 : 0;
      opacity += (target - opacity) * Math.min(1, dt * FADE_PER_SECOND);

      ctx.clearRect(0, 0, width, height);

      if (!activeRef.current && opacity < 0.02) {
        frame = 0;
        return;
      }

      ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = getComputedStyle(canvas).color;

      columns.forEach((column, index) => {
        column.head += column.speed * dt;
        if (column.head > height + TRAIL * FONT_SIZE) {
          columns[index] = makeColumn(height);
          return;
        }
        if (Math.random() < 0.12) {
          column.glyphs[Math.floor(Math.random() * TRAIL)] = glyph();
        }

        const x = index * FONT_SIZE;
        for (let i = 0; i < TRAIL; i += 1) {
          const y = column.head - i * FONT_SIZE;
          if (y < -FONT_SIZE || y > height) continue;
          ctx.globalAlpha = opacity * (1 - i / TRAIL) * (i === 0 ? 1 : 0.6);
          ctx.fillText(column.glyphs[i], x, y);
        }
      });
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(draw);
    };

    kickRef.current = () => {
      if (frame) return;
      if (!columns.length) measure();
      last = performance.now();
      frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(canvas);

    if (activeRef.current) kickRef.current();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      kickRef.current = null;
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
    if (active) kickRef.current?.();
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-area-accent"
    />
  );
}
