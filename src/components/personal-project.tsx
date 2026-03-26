import { useResumeData } from "../context/resume-context";
import { TwoColumnWrapper } from "./two-column-wrapper";
import { formatDateRange } from "../utils/calculate-duration";
import { LinkList } from "./link-list";
import { SpecSheet } from "./spec-sheet";
import { parseBold } from "../utils/parse-bold";

const SubTitle = ({ title }: { title: string }) => (
  <div className="text-[10px] font-bold text-[color:var(--color-text-subtle)] uppercase tracking-wider mb-1">
    {title}
  </div>
);

export const PersonalProject = () => {
  const { personalProjects: project = [] } = useResumeData();

  return (
    <section id="project" className="mt-16">
      <h1 className="text-2xl font-bold mb-8 border-b-2 border-[color:var(--color-border)] pb-2 uppercase tracking-tighter">
        Personal Projects
      </h1>
      <div className="flex flex-col gap-12">
        {project.map((p, idx) => (
          <TwoColumnWrapper
            key={`${p.title}-${idx}`}
            left={
              <div className="flex flex-col gap-1">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", margin: 0, padding: 0, lineHeight: 1.2 }}>
                  {p.title}
                </h2>
                
                {p.features[0]?.title && (
                  <p className="text-[color:var(--color-text-muted)] text-[12px] leading-snug m-0 mt-1 italic">
                    {p.features[0].title}
                  </p>
                )}

                <div className="text-[11px] text-[color:var(--color-text-subtle)] mt-2">
                  {formatDateRange(p.from, p.to).dateRange}
                </div>

                {p.links && p.links.length > 0 && (
                  <div className="mt-2">
                    <LinkList links={p.links} />
                  </div>
                )}
              </div>
            }
            right={
              <div className="flex flex-col gap-8">
                {p.features.map((feature, fIdx) => (
                  <div key={fIdx} className="space-y-3">
                    <h3 className="text-base font-bold text-[color:var(--color-text)] m-0 leading-snug">
                      Project Experience
                    </h3>
                    
                    <ul style={{ margin: 0, paddingLeft: "1.2rem", listStyleType: "disc", color: "var(--color-text)" }}>
                      {[...feature.achievements, ...feature.contributions].map((item, iIdx) => (
                        <li key={iIdx} style={{ fontSize: "13px" }}>
                          {parseBold(item)}
                        </li>
                      ))}
                    </ul>

                    {feature.spec && feature.spec.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-[color:var(--color-border)]">
                        <SubTitle title="Tech Stack" />
                        <SpecSheet items={feature.spec} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};
