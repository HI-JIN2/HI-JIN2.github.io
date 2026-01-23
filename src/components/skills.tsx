import { useResumeData } from "../context/resume-context";
import { Section } from "./Section";
import { SpecSheet } from "./spec-sheet";
import { TwoColumnWrapper } from "./two-column-wrapper";

export const Skills = () => {
  const { skills } = useResumeData();

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <Section title="Skills" id="skills" mt={80}>
      <div className="flex flex-col gap-10">
        {skills.map(({ title, items }, index) => (
          <TwoColumnWrapper
            key={`${title}-${index}`}
            left={
              <h3 className="text-lg font-bold text-[color:var(--color-text)]">{title}</h3>
            }
            right={<SpecSheet items={items} />}
          />
        ))}
      </div>
    </Section>
  );
};
