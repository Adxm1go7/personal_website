"use client";

import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const total = projects.length;

  // The + total keeps the result positive when index is 0 and we go back
  const wrap = (i: number) => (i + total) % total;

  const prev = () => setIndex((i) => wrap(i - 1));
  const next = () => setIndex((i) => wrap(i + 1));

  return (
    <div className="carousel">
      <button className="carousel-arrow left" onClick={prev}>
        ←
      </button>

      <ProjectCard project={projects[wrap(index - 1)]} variant="side" onClick={prev} />
      <ProjectCard project={projects[index]} variant="active" />
      <ProjectCard project={projects[wrap(index + 1)]} variant="side" onClick={next} />

      <button className="carousel-arrow right" onClick={next}>
        →
      </button>
    </div>
  );
}