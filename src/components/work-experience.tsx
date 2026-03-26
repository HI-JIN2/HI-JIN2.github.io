import { useResumeData } from "../context/resume-context";
import { TwoColumnWrapper } from "./two-column-wrapper";
import { formatDateRange } from "../utils/calculate-duration";
import { parseBold } from "../utils/parse-bold";
import { Section } from "./Section";

export const WorkExperience = () => {
  const { experience } = useResumeData();

  return (
    <Section title="Work Experience" id="work" mt={64}>
      <div className="flex flex-col gap-12">
        {experience.map((exp, idx) => {
          const { corp, position, from, to, about = [], features = [] } = exp;
          return (
            <TwoColumnWrapper
              key={`${corp}-${idx}`}
              left={
                <div className="flex flex-col gap-1">
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginTop: "2rem", marginBottom: "1rem", padding: 0, lineHeight: 1.2 }}>
                    {corp}
                  </h2>

                  {about.length > 0 && (
                    <div className="text-[color:var(--color-text-muted)] text-[12px] leading-snug mt-1">
                      {about.map((item, index) => (
                        <p key={index} className="m-0 italic">{item}</p>
                      ))}
                    </div>
                  )}

                  <div className="space-y-0 mt-3">
                    <div className="text-[color:var(--color-text)] font-semibold text-sm">{position}</div>
                    <div className="text-[11px] text-[color:var(--color-text-subtle)]">
                      {formatDateRange(from, to).dateRange}
                    </div>
                  </div>
                </div>
              }
              right={
                <div className="flex flex-col gap-8">
                  {features.map((feature, fIdx) => (
                    <div key={fIdx} className="space-y-2">
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginTop: "2rem", marginBottom: "1rem", lineHeight: 1.2 }}>
                        {feature.title}
                      </h3>
                      <ul style={{ listStyleType: "disc", color: "var(--color-text)" }}>
                        {[...feature.achievements, ...feature.contributions].map((item, iIdx) => (
                        <li key={iIdx}>
                          {parseBold(item)}
                        </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              }
            />
          );
        })}
      </div>
    </Section>
  );
};
