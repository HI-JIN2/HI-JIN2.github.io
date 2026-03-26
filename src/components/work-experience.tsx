import { useResumeData } from "../context/resume-context";
import { TwoColumnWrapper } from "./two-column-wrapper";
import { formatDateRange } from "../utils/calculate-duration";
import { parseBold } from "../utils/parse-bold";

export const WorkExperience = () => {
  const { experience } = useResumeData();

  return (
    <section id="work" className="mt-16">
      <h1 className="text-2xl font-bold mb-8 border-b-2 border-[color:var(--color-border)] pb-2 uppercase tracking-tighter">
        Work Experience
      </h1>
      <div className="flex flex-col gap-12">
        {experience.map((exp, idx) => {
          const { corp, position, from, to, about = [], features = [] } = exp;
          return (
            <TwoColumnWrapper
              key={`${corp}-${idx}`}
              left={
                <div className="flex flex-col gap-1">
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", margin: 0, padding: 0, lineHeight: 1.2 }}>
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
                      <h3 className="text-base font-bold text-[color:var(--color-text)] m-0 leading-snug">
                        {feature.title}
                      </h3>
                      <ul style={{ margin: 0, paddingLeft: "1.2rem", listStyleType: "disc", color: "var(--color-text)" }}>
                        {[...feature.achievements, ...feature.contributions].map((item, iIdx) => (
                          <li key={iIdx} style={{ fontSize: "13px" }}>
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
    </section>
  );
};
