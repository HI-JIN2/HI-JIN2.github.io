import { useResumeData } from "../context/resume-context";
import { LinkList } from "./link-list";
import { Section } from "./Section";
import { TwoColumnWrapper } from "./two-column-wrapper";
import { parseBold } from "../utils/parse-bold";

type Props = {
  title?: string;
  sectionTitle?: string;
};

export const OpenSourceProject = ({ title, sectionTitle }: Props = {}) => {
  const { openSourceProjects } = useResumeData();

  const projectsToRender = title
    ? openSourceProjects.filter((project) => project.title === title)
    : openSourceProjects;

  if (projectsToRender.length === 0) {
    return null;
  }

  const getSectionId = (t: string): string => {
    const idMap: Record<string, string> = {
      "Awards": "award",
      "Activities": "experience",
      "Community": "community",
      "Interview": "interview",
      "Education": "education",
      "Certificates": "certificates",
    };
    return idMap[t] || t.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      {projectsToRender.map((project) => {
        const sectionId = getSectionId(project.title);
        const hasLinks = project.links && project.links.length > 0;

        return (
          <Section key={project.title} title={sectionTitle || project.title} mt={64} id={sectionId}>
            {/* Each feature becomes its own 2-column row */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {project.features.map((feature, featureIndex) => (
                <TwoColumnWrapper
                  key={featureIndex}
                  left={
                    (() => {
                      const title = feature.title;
                      const dateMatch = title.match(/\(([^)]+)\)$/);
                      const date = dateMatch ? dateMatch[0] : "";
                      const rest = dateMatch ? title.slice(0, dateMatch.index).trim() : title;
                      
                      // Split by " - " to separate activity name and role
                      const parts = rest.split(" - ");
                      const activityName = parts[0];
                      const role = parts.slice(1).join(" - ");
                      
                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", margin: 0, lineHeight: 1.2 }}>
                            {activityName}
                          </h3>
                          {(role || date) && (
                            <p style={{ fontSize: "11px", color: "var(--color-text-subtle)", margin: 0, lineHeight: 1.3 }}>
                              {role} {date}
                            </p>
                          )}
                          {featureIndex === 0 && hasLinks && (
                            <div style={{ marginTop: "0.5rem" }}>
                              <LinkList links={project.links || []} />
                            </div>
                          )}
                        </div>
                      );
                    })()
                  }
                  right={
                    <ul style={{ margin: 0, padding: "0 0 0 1.2rem", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {feature.descriptions.map((description, index) => {
                        const href = feature.links && feature.links[index];
                        return (
                          <li key={index} style={{ color: "var(--color-text)" }}>
                            {href ? (
                              <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-link)" }}>
                                {parseBold(description)}
                              </a>
                            ) : (
                              parseBold(description)
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
        );
      })}
    </>
  );
};
