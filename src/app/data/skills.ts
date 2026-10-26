export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript",  "C#", "HTML/CSS", "SQL"],
  },
  {
    id: "tools",
    title: "Tools",
    items: ["Git", "Linux", "React", "Unity"],
  },
  {
    id: "computer-science",
    title: "Computer Science",
    items: ["Advanced Algorithms", "Dynamic Programming", "Computer Architecture", "SQL Databases", "Version Control", "Object-Oriented Design"],
  },
  
];