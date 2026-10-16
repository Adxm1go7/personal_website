import type { SkillGroup } from "../data/skills";

export default function SkillBox({ group }: { group: SkillGroup }) {
  return (
    <section className="skill-box">
      <h3 className="skill-box-title">{group.title}</h3>
      <ul className="skill-box-list">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}