import type { SkillGroup } from "../data/skills";

type Props = { group: SkillGroup };

export default function SkillCluster({ group }: Props) {
  const count = group.skills.length;
  const seed = group.id.length;

  const points = group.skills.map((skill, i) => {
    // Even spacing around the hub, plus a small repeatable nudge
    const angleNudge = ((i * 53 + seed * 29) % 21) - 10;       // -10 to +10 degrees
    const angle = (group.rotation ?? 0) + (360 / count) * i + angleNudge; // ?? -> if the value on left is null, use right value
    const radius = 34 + ((i * 17 + seed * 7) % 13);            // 34 to 46 (% of the box)
    const rad = (angle * Math.PI) / 180;

    return {
      skill,
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad),
    };
  });

  return (
    <div
      className="skill-cluster"
      style={{ left: `${group.x}%`, top: `${group.y}%` }}
    >
      <svg
        className="cluster-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {points.map((p) => (
          <line key={p.skill} x1="50" y1="50" x2={p.x} y2={p.y} />
        ))}
      </svg>

      <h3 className="cluster-name">{group.name}</h3>

      <ul className="cluster-skills">
        {points.map((p) => (
          <li
            key={p.skill}
            className="skill"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.skill}
          </li>
        ))}
      </ul>
    </div>
  );
}