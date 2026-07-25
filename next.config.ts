import type { NextConfig } from "next";

/**
 * Fully static export: `next build` emits plain HTML/CSS/JS into `out/`,
 * which nginx serves directly, no Node.js server at runtime.
 *
 * Deliberately absent (unsupported with `output: "export"`):
 * - headers()/redirects()/rewrites(): HTTP security headers (CSP, HSTS,
 *   nosniff, …) are applied by nginx instead; see deploy/nginx.conf.
 * - ISR, server actions, route handlers reading the request, and the
 *   default next/image optimizer all require a Node server.
 */
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
