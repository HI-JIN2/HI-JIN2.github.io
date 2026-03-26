import { useResumeData } from "../context/resume-context";
import { Section } from "./Section";
import { TwoColumnWrapper } from "./two-column-wrapper";
import { formatDateRange } from "../utils/calculate-duration";
import { parseBold } from "../utils/parse-bold";
import { LinkList } from "./link-list";
import { SpecSheet } from "./spec-sheet";

/**
 * 1. About Me Section
 */
export const AboutMe = () => {
  const { about } = useResumeData();
  return (
    <Section title="About" id="about">
      {/* 1-Column Layout for Bio/About */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "100%" }}>
        {about.map(({ title, descriptions }, index) => (
          <div key={index}>
            <h3 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.5rem", color: "var(--color-text)" }}>
              {title}
            </h3>
            <ul style={{ listStyleType: "disc" }}>
              {descriptions.map((description, descIndex) => (
                <li key={descIndex}>{parseBold(description)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

/**
 * 2. Skills Section (1-Column)
 */
export const Skills = () => {
  const { skills } = useResumeData();
  if (!skills || skills.length === 0) return null;
  return (
    <Section title="Skills" id="skills" mt={64}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {skills.map((category, idx) => (
          <div key={idx} className="space-y-3">
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>{category.title}</h3>
            <ul style={{ listStyleType: "disc", color: "var(--color-text)" }}>
              {category.items.map((skill, sIdx) => (
                <li key={sIdx}>{parseBold(skill)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

/**
 * 3. Work Experience Section
 */
export const WorkExperience = () => {
  const { experience } = useResumeData();
  return (
    <Section title="Work Experience" id="work" mt={64}>
      <div className="flex flex-col gap-12">
        {experience.map((exp, idx) => (
          <TwoColumnWrapper
            key={`${exp.corp}-${idx}`}
            left={
              <div className="flex flex-col gap-1">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginTop: "2rem", marginBottom: "1rem", padding: 0, lineHeight: 1.2 }}>
                  {exp.corp}
                </h2>
                {exp.about && exp.about.length > 0 && (
                  <div className="text-[color:var(--color-text-muted)] text-[12px] leading-snug mt-1">
                    {exp.about.map((item, i) => <p key={i} className="m-0 italic">{item}</p>)}
                  </div>
                )}
                <div className="space-y-0 mt-3">
                  <div className="text-[color:var(--color-text)] font-semibold text-sm">{exp.position}</div>
                  <div className="text-[11px] text-[color:var(--color-text-subtle)]">{formatDateRange(exp.from, exp.to).dateRange}</div>
                </div>
              </div>
            }
            right={
              <div className="flex flex-col gap-8">
                {exp.features.map((f, fIdx) => (
                  <div key={fIdx} className="space-y-2">
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginTop: "2rem", marginBottom: "1rem", lineHeight: 1.2 }}>
                      {f.title}
                    </h3>
                    <ul style={{ listStyleType: "disc", color: "var(--color-text)" }}>
                      {[...f.achievements, ...f.contributions].map((item, i) => <li key={i}>{parseBold(item)}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </Section>
  );
};

/**
 * 4. Projects Section (Refined H3 Hierarchy)
 */
export const PersonalProject = () => {
  const { personalProjects = [] } = useResumeData();
  return (
    <Section title="Projects" id="project" mt={64}>
      <div className="flex flex-col gap-12">
        {personalProjects.map((p, idx) => (
          <TwoColumnWrapper
            key={`${p.title}-${idx}`}
            left={
              <div className="flex flex-col gap-1">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginTop: "2rem", marginBottom: "1rem", padding: 0, lineHeight: 1.2 }}>
                  {p.title}
                </h2>
                {p.features[0]?.title && (
                  <p className="text-[color:var(--color-text-muted)] text-[12px] leading-snug m-0 mt-1 italic">
                    {p.features[0].title}
                  </p>
                )}
                <div className="text-[11px] text-[color:var(--color-text-subtle)] mt-2">{formatDateRange(p.from, p.to).dateRange}</div>
                {p.links && p.links.length > 0 && (
                  <div className="mt-2"><LinkList links={p.links} /></div>
                )}
              </div>
            }
            right={
              <div className="flex flex-col gap-8">
                {p.features.map((f, fIdx) => (
                  <div key={fIdx} className="space-y-4">
                    {/* H3 Hierarchy: 주요 기여 -> 성과 -> Tech Stack */}
                    <div className="space-y-6">
                      {f.contributions.length > 0 && (
                        <div>
                          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.5rem" }}>주요 기여</h3>
                          <ul style={{ listStyleType: "disc" }}>
                            {f.contributions.map((item, i) => <li key={i}>{parseBold(item)}</li>)}
                          </ul>
                        </div>
                      )}
                      {f.achievements.length > 0 && (
                        <div>
                          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.5rem" }}>성과</h3>
                          <ul style={{ listStyleType: "disc" }}>
                            {f.achievements.map((item, i) => <li key={i}>{parseBold(item)}</li>)}
                          </ul>
                        </div>
                      )}
                      {f.spec && f.spec.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-[color:var(--color-border)]">
                          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-subtle)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Tech Stack</h3>
                          <SpecSheet items={f.spec} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </Section>
  );
};

/**
 * 5. Open Source / Community Section
 */
export const OpenSourceProject = ({ title, sectionTitle }: { title?: string; sectionTitle?: string } = {}) => {
  const { openSourceProjects } = useResumeData();
  const projects = title ? openSourceProjects.filter(p => p.title === title) : openSourceProjects;
  if (projects.length === 0) return null;

  const getSectionId = (t: string) => {
    const map: Record<string, string> = { "Awards": "award", "Activities": "experience", "Community": "community" };
    return map[t] || t.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      {projects.map(project => (
        <Section key={project.title} title={sectionTitle || project.title} mt={64} id={getSectionId(project.title)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {project.features.map((feature, fIdx) => (
              <TwoColumnWrapper
                key={fIdx}
                left={
                  (() => {
                    const t = feature.title;
                    const dMatch = t.match(/\(([^)]+)\)$/);
                    const d = dMatch ? dMatch[0] : "";
                    const rest = dMatch ? t.slice(0, dMatch.index).trim() : t;
                    const pts = rest.split(" - ");
                    return (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", margin: 0, lineHeight: 1.2 }}>{pts[0]}</h3>
                        {(pts[1] || d) && <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", margin: 0, lineHeight: 1.3 }}>{pts[1]} {d}</p>}
                      </div>
                    );
                  })()
                }
                right={
                  <ul style={{ listStyleType: "disc", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {feature.descriptions.map((desc, i) => {
                      const href = feature.links && feature.links[i];
                      return (
                        <li key={i}>
                          {href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline text-[color:var(--color-link)] font-medium">
                              {parseBold(desc)}
                            </a>
                          ) : (
                            parseBold(desc)
                          )}
                        </li>
                      );
                    })}
                  </ul>
                }
              />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
};

/**
 * 6. Simple List (Awards, Education, etc.)
 */
export const SimpleList = ({ title, sectionTitle, sectionId }: { title: string; sectionTitle?: string; sectionId?: string }) => {
  const { simpleLists } = useResumeData();
  const list = simpleLists.find(l => l.title === title);
  if (!list) return null;

  return (
    <Section title={sectionTitle || list.title} mt={64} id={sectionId || list.title.toLowerCase()}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {list.features.map((f, fIdx) => (
          <div key={fIdx} className="space-y-3">
            {f.title && <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>{f.title}</h3>}
            <ul style={{ listStyleType: "disc", color: "var(--color-text)" }}>
              {f.descriptions.map((desc, i) => {
                const href = f.links && f.links[i];
                return (
                  <li key={i}>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline text-[color:var(--color-link)] font-medium">
                        {parseBold(desc)}
                      </a>
                    ) : (
                      parseBold(desc)
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

/**
 * 7. Last Updated At
 */
export const LastUpdatedAt = () => {
  const { lastUpdatedAt } = useResumeData();
  return (
    <footer style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)", textAlign: "center", color: "var(--color-text-subtle)", fontSize: "12px" }}>
      Last updated at: {lastUpdatedAt}
    </footer>
  );
};
