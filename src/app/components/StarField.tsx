"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;      // radius in px
  alpha: number;  // resting brightness
  rgb: string;

  vx: number;  // px per second
  vy: number;
};

type Twinkle = {
  star: Star;
  start: number;
  duration: number;
  peak: number;   // max brightness during the twinkle
};

// ---- Tweak these to taste ----
const DENSITY = 1 / 8000;        // stars per px² (lower = fewer stars)
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
const DRIFT_SPEED = 5;        // px/second for the largest stars (try 3 to 12)
const DRIFT_DIRECTION = 260;  // degrees: 180 = left, 0 = right, 270 = up, 90 = down
const SIZE_SCALE = 1.8;

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
      const angle = (DRIFT_DIRECTION * Math.PI) / 180;

      stars = Array.from({ length: count }, () => {
        const r = rand(0.4, 1.5) * SIZE_SCALE;
        const speed = DRIFT_SPEED * (r / 1.3 * SIZE_SCALE); // bigger stars drift faster
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          alpha: rand(0.1, 0.35),  // match whatever alpha range you're using
          rgb: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          vx: Math.cos(angle + (Math.random()-0.5)*50) * speed,
          vy: Math.sin(angle + (Math.random()-0.5)*30) * speed,
        };
      });
    }

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

    const update = (dt: number) => {
      for (const s of stars) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // Wrap around the edges
        if (s.x < -2) s.x = width + 2;
        else if (s.x > width + 2) s.x = -2;
        if (s.y < -2) s.y = height + 2;
        else if (s.y > height + 2) s.y = -2;
      }
    };

    let last = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1); // cap so a background tab doesn't cause a jump
      last = now;
      if (!reduceMotion) update(dt);
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