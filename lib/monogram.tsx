/**
 * Shared renderer for the overlapping-initials monogram used as the site
 * icon/apple-icon. Reproduces the business-card badge (app/page.tsx,
 * `.card-monogram` in app/globals.css): the initials of `site.name`,
 * set in EB Garamond and overlapped Rolls-Royce-badge style, in antique
 * gold on bone card stock. Initials derive from `site.name` so the icon
 * stays in sync with identity.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

const BONE = "#f1ede2"; // --background
const GOLD = "#9a7b3f"; // --accent (full strength here for small-size legibility)

const initials = site.name.split(/\s+/).map((w) => w[0]);

// Read once at build/render (server-side icon route).
const fontData = readFileSync(
  join(process.cwd(), "lib/fonts/EBGaramond-Regular.ttf"),
);

type MonogramOptions = {
  rounded?: boolean; // round the background tile corners
  shadow?: boolean; // soft drop shadow to lift the gold off the bone
};

export function renderMonogram(size: number, opts: MonogramOptions = {}) {
  const fontSize = Math.round(size * 0.62);
  const overlap = Math.round(fontSize * 0.34);
  const blur = Math.max(1, Math.round(fontSize * 0.08));

  // Soft dark drop shadow gives the muted gold separation from the bone
  // background without the hard edge of an outline.
  const textShadow = opts.shadow
    ? `0 ${Math.max(1, Math.round(blur / 2))}px ${blur}px rgba(0, 0, 0, 0.4)`
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BONE,
          ...(opts.rounded
            ? { borderRadius: Math.round(size * 0.2) }
            : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "EB Garamond",
            fontSize,
            lineHeight: 1,
            color: GOLD,
            ...(textShadow ? { textShadow } : {}),
          }}
        >
          {initials.map((letter, i) => (
            <span
              key={i}
              style={
                i > 0
                  ? {
                      marginLeft: -overlap,
                      transform: `translateY(${overlap}px)`,
                    }
                  : undefined
              }
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [
        { name: "EB Garamond", data: fontData, style: "normal", weight: 400 },
      ],
    },
  );
}
