import { useResumeData } from "../context/resume-context";
import { Section } from "./Section";
import { parseBold } from "../utils/parse-bold";

export const AboutMe = () => {
  const { about } = useResumeData();

  return (
    <Section title="About" id="about">
      <div className="flex flex-col gap-8">
        {about.map(({ title, descriptions }, index) => (
          <div key={index}>
            <h3 className="font-semibold text-xl mb-3 text-[color:var(--color-text)]">{title}</h3>
            <div className="flex flex-col gap-3">
              {descriptions.map((description, descIndex) => (
                <p key={descIndex} className="text-[color:var(--color-text-muted)] leading-relaxed">
                  {parseBold(description)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
