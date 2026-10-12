import { skillGroups } from "../data/skills";
import SkillCluster from "./SkillCluster";

export default function SkillsField() {
  return (
    <div className="skills-field">
      {skillGroups.map((group) => (
        <SkillCluster key={group.id} group={group} />
      ))}
    </div>
  );
}