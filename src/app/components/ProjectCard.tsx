import type { CSSProperties } from "react";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
  offset: number;      // 0 = centre, -1 = left, 1 = right, others hidden
  teleport?: boolean;
  onClick?: () => void;
};

export default function ProjectCard({ project, offset, teleport, onClick }: Props) {
  const variant = offset === 0 ? "active" : Math.abs(offset) === 1 ? "side" : "hidden";

  return (
    <article
      className={`project-card ${variant} ${teleport ? "teleport" : ""}`}
      style={{ "--offset": offset } as CSSProperties}
      onClick={variant === "side" ? onClick : undefined}
      aria-hidden={variant !== "active"}
    >
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      <ul className="project-tech">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      {project.link && variant === "active" && (
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          View project
        </a>
      )}
    </article>
  );
}