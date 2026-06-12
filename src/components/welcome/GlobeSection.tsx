"use client";

import { useEffect, useRef } from "react";
import { TypeText } from "@/components/motion/TypeText";

const ACCENT = "#d4af7a";
const DOT_FRONT = "#f2ead8";
const DOT_BACK = "#8a9aad";
const ARC_STROKE = "rgba(212, 175, 122, 0.65)";

function latLon(lat: number, lon: number): [number, number, number] {
  const a = (lat * Math.PI) / 180;
  const b = (lon * Math.PI) / 180;
  return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)];
}

// Bengaluru first — every route starts at home base
const HUBS: [number, number, number][] = [
  latLon(12.97, 77.59), // Bengaluru
  latLon(25.2, 55.3), // Dubai
  latLon(51.5, -0.1), // London
  latLon(1.3, 103.8), // Singapore
  latLon(40.6, -73.8), // New York
  latLon(-33.9, 151.2), // Sydney
];
const ARCS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [3, 5],
];

/** Rotating dotted globe with flight arcs — global reach section. */
export function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const cv = canvasRef.current;
    if (!sec || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    function size() {
      if (!sec || !cv) return;
      const s = Math.min(sec.clientWidth * 0.82, sec.clientHeight * 0.92, 600);
      cv.style.width = `${s}px`;
      cv.style.height = `${s}px`;
      cv.width = s * DPR;
      cv.height = s * DPR;
    }
    size();
    window.addEventListener("resize", size);

    // Fibonacci-distributed points on a sphere
    const N = 620;
    const pts: [number, number, number][] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }

    let rot = reduce ? -0.5 : 0;
    const rotY = (p: [number, number, number], a: number): [number, number, number] => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
    };

    let frame = 0;
    function draw() {
      if (!cv || !ctx) return;
      const W = cv.width;
      const H = cv.height;
      const R = Math.min(W, H) * 0.42;
      const cx = W / 2;
      const cy = H / 2;
      ctx.clearRect(0, 0, W, H);

      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.25);
      g.addColorStop(0, "rgba(120, 170, 210, 0.18)");
      g.addColorStop(1, "rgba(120, 170, 210, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, 7);
      ctx.fill();

      for (let i = 0; i < pts.length; i++) {
        const p = rotY(pts[i], rot);
        const depth = (p[2] + 1) / 2;
        const x = cx + p[0] * R;
        const y = cy - p[1] * R;
        const sz = (0.7 + depth * 1.8) * DPR;
        ctx.globalAlpha = 0.18 + depth * 0.66;
        ctx.fillStyle = depth > 0.5 ? DOT_FRONT : DOT_BACK;
        ctx.beginPath();
        ctx.arc(x, y, sz, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const proj: [number, number, number][] = [];
      for (let h = 0; h < HUBS.length; h++) {
        const p = rotY(HUBS[h], rot);
        const depth = (p[2] + 1) / 2;
        const x = cx + p[0] * R;
        const y = cy - p[1] * R;
        proj.push([x, y, depth]);
        if (p[2] > -0.1) {
          ctx.globalAlpha = 0.4 + depth * 0.6;
          ctx.fillStyle = ACCENT;
          ctx.beginPath();
          ctx.arc(x, y, 2.2 * DPR, 0, 7);
          ctx.fill();
        }
      }

      const t = (Date.now() / 2600) % 1;
      for (let a = 0; a < ARCS.length; a++) {
        const A = proj[ARCS[a][0]];
        const B = proj[ARCS[a][1]];
        if (A[2] < -0.05 && B[2] < -0.05) continue;
        const mx = (A[0] + B[0]) / 2;
        const my = (A[1] + B[1]) / 2;
        const dx = B[0] - A[0];
        const dy = B[1] - A[1];
        const d = Math.sqrt(dx * dx + dy * dy);
        const ny = my - d * 0.32;
        ctx.globalAlpha = 0.25 + 0.3 * Math.max(A[2], B[2]);
        ctx.strokeStyle = ARC_STROKE;
        ctx.lineWidth = 1 * DPR;
        ctx.beginPath();
        ctx.moveTo(A[0], A[1]);
        ctx.quadraticCurveTo(mx, ny, B[0], B[1]);
        ctx.stroke();

        const tt = (t + a * 0.2) % 1;
        const px = (1 - tt) * (1 - tt) * A[0] + 2 * (1 - tt) * tt * mx + tt * tt * B[0];
        const py = (1 - tt) * (1 - tt) * A[1] + 2 * (1 - tt) * tt * ny + tt * tt * B[1];
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(px, py, 1.8 * DPR, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduce) {
        rot += 0.0016;
        frame = requestAnimationFrame(draw);
      }
    }
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="global"
      aria-label="Global reach"
      className="group relative grid min-h-[92svh] content-center overflow-hidden bg-[radial-gradient(120%_100%_at_50%_-10%,#14283f_0%,#0a1828_60%,#07111f_100%)] px-[clamp(16px,5vw,64px)] py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[14%] z-0 -translate-x-1/2 whitespace-nowrap font-inktrap font-semibold leading-none tracking-[-0.04em] text-transparent"
        style={{
          fontSize: "clamp(110px, 26vw, 360px)",
          WebkitTextStroke: "1px rgba(255,255,255,0.07)",
        }}
      >
        Global
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-[46%] transition-transform duration-[1400ms] ease-signature will-change-transform group-hover:scale-110"
      />

      <div className="section-container relative z-[2]">
        <div className="max-w-sm max-md:mx-auto max-md:text-center">
          <p className="type-caption text-accent">Global careers</p>
          <TypeText
            as="h2"
            text={"Train anywhere.\nQualify everywhere."}
            speed={36}
            className="mt-3 type-heading-lg text-bone-white"
          />
          <p className="mt-5 type-body text-slate">
            A DGCA licence earned in India is the foundation of a global flying
            career. Our students train in Bengaluru and build toward
            airline opportunities across the world.
          </p>
        </div>

      </div>
    </section>
  );
}
