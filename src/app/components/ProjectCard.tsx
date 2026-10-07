import type { Project } from "../data/projects";

type Props = {
  project: Project;
  variant: "active" | "side";
  onClick?: () => void;
};

export default function ProjectCard({ project, variant, onClick }: Props) {
  return (
    <article
      className={`project-card ${variant}`}
      onClick={variant === "side" ? onClick : undefined}
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