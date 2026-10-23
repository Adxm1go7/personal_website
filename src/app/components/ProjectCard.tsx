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

      <header className="project-header">
        <div className="project-heading">
          <span className="project-label">Project</span>
          <h3 className="project-title">{project.title}</h3>
        </div>

        {project.link && variant === "active" && (
          <a
            className="project-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View project 
          </a>
        )}
      </header>

      <p className="project-description">{project.description}</p>

      <footer className="project-footer">
        <ul className="project-tech">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
}