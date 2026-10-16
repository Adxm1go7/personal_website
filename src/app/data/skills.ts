export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express", "Tailwind"],
  },
  {
    id: "tools",
    title: "Tools",
    items: ["Git", "Docker", "Linux", "Figma", "PostgreSQL"],
  },
];