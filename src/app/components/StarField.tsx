"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;      // radius in px
  alpha: number;  // resting brightness
  rgb: string;
};

type Twinkle = {
  star: Star;
  start: number;
  duration: number;
  peak: number;   // max brightness during the twinkle
};

// ---- Tweak these to taste ----
const DENSITY = 1 / 5000;        // stars per px² (lower = fewer stars)
const MAX_TWINKLES = 3;          // how many can shine at once
const TWINKLE_MS = [3000, 5500]; // how long one twinkle lasts
const SPAWN_GAP_MS = [900, 2500]; // wait between new twinkles
const PALETTE = [
  "235,238,255", // cool white
  "235,238,255",
  "235,238,255",
  "255,246,214", // warm white
  "150,170,255", // faint blue
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let twinkles: Twinkle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let nextSpawn = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(width * height * DENSITY);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(0.4, 1.3),
        alpha: rand(0.15, 0.5),
        rgb: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
      twinkles = [];
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Resting stars
      for (const s of stars) {
        ctx.fillStyle = `rgba(${s.rgb},${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      //if (reduceMotion) return;

      // Start a new twinkle every so often, up to the max
      if (now >= nextSpawn && twinkles.length < MAX_TWINKLES) {
        twinkles.push({
          star: stars[Math.floor(Math.random() * stars.length)],
          start: now,
          duration: rand(TWINKLE_MS[0], TWINKLE_MS[1]),
          peak: rand(0.8, 1),
        });
        nextSpawn = now + rand(SPAWN_GAP_MS[0], SPAWN_GAP_MS[1]);
      }

      // Draw active twinkles on top of their resting star
      twinkles = twinkles.filter((t) => now - t.start < t.duration);
      for (const t of twinkles) {
        const progress = (now - t.start) / t.duration;
        const pulse = Math.sin(progress * Math.PI) ** 2; // smooth 0 → 1 → 0
        const s = t.star;
        const alpha = s.alpha + (t.peak - s.alpha) * pulse;

        ctx.save();
        ctx.shadowColor = `rgba(${s.rgb},${0.8 * pulse})`;
        ctx.shadowBlur = 10 * pulse;
        ctx.fillStyle = `rgba(${s.rgb},${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (1 + 0.5 * pulse), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      build();
      if (reduceMotion) draw(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}