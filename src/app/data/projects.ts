export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string; /*? = optional property*/
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    description: "A short description of what this project does.",
    tech: ["React", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    id: "project-two",
    title: "Project Two",
    description: "A short description of what this project does.",
    tech: ["Next.js", "TypeScript"],
    link: "#",
  },
  {
    id: "project-three",
    title: "Project Three",
    description: "A short description of what this project does.",
    tech: ["Python", "Django"],
    link: "#",
  },
];