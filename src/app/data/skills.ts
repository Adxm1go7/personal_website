export type SkillGroup = {
  id: string;
  name: string;
  x: number;          // hub position on the page, in %
  y: number;
  rotation?: number;  // rotates the whole ring of skills, in degrees
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    name: "Languages",
    x: 16,
    y: 48,
    rotation: -20,
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    id: "frontend",
    name: "Frontend",
    x: 38,
    y: 74,
    rotation: 30,
    skills: ["React", "Next.js", "Tailwind", "Figma"],
  },
  {
    id: "backend",
    name: "Backend",
    x: 60,
    y: 42,
    rotation: 10,
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Django"],
  },
  {
    id: "tools",
    name: "Tools",
    x: 80,
    y: 72,
    rotation: -40,
    skills: ["Git", "Docker", "Linux", "CI/CD"],
  },
];