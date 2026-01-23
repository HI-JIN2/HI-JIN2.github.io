import { useResumeData } from "../context/resume-context";
import { Section } from "./Section";
import { SpecSheet } from "./spec-sheet";

export const Skills = () => {
  const { skills } = useResumeData();

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <Section title="Skills" id="skills" mt={80}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skills.map(({ title, items }, index) => (
          <div
            key={`${title}-${index}`}
            className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-5"
          >
            <h3 className="text-lg font-bold text-[color:var(--color-text)] mb-3">
              {title}
            </h3>
            <SpecSheet items={items} />
          </div>
        ))}
      </div>
    </Section>
  );
};
