"use client";

import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsCarousel() {
  // Keep the previous index so a card that wraps from one side to the other can jump instead of sliding across
  const [{ index, prevIndex }, setPosition] = useState({ index: 0, prevIndex: 0 });
  const total = projects.length;
  const half = Math.floor(total / 2);

  const prev = () => setPosition((p) => ({ index: (p.index - 1 + total) % total, prevIndex: p.index }));
  const next = () => setPosition((p) => ({ index: (p.index + 1) % total, prevIndex: p.index }));

  // Shortest signed distance from the active card: ..., -1, 0, 1, ...
  const offsetFrom = (active: number, i: number) => ((i - active + total + half) % total) - half;

  return (
    <div className="carousel">
      {projects.map((project, i) => {
        const offset = offsetFrom(index, i);
        const teleport = Math.abs(offset - offsetFrom(prevIndex, i)) > 1;

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
