"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const total = projects.length;
  const half = Math.floor(total / 2);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // Shortest signed distance from the active card: ..., -1, 0, 1, ...
  const offsets = projects.map((_, i) => ((i - index + total + half) % total) - half);

  // Remember last offsets so a card that wraps from one side to the other can jump instead of sliding across
  const prevOffsets = useRef<number[]>([]);
  useEffect(() => {
    prevOffsets.current = offsets;
  });

  return (
    <div className="carousel">
      {projects.map((project, i) => {
        const offset = offsets[i];
        const last = prevOffsets.current[i];
        const teleport = last !== undefined && Math.abs(offset - last) > 1;

        return (
          <ProjectCard
            key={project.id}
            project={project}
            offset={offset}
            teleport={teleport}
            onClick={offset < 0 ? prev : next}
          />
        );
      })}
    </div>
  );
}