import { useResumeData } from "../context/resume-context";
import { parseBold } from "../utils/parse-bold";
import { Link } from "./link";
import { LinkList } from "./link-list";
import { List } from "./List";
import { Section } from "./Section";
import { TwoColumnWrapper } from "./two-column-wrapper";

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

  const getSectionId = (title: string): string => {
    const idMap: Record<string, string> = {
      "Awards": "award",
      "Activities": "experience",
      "Community": "community",
      "Interview": "interview",
      "Education": "education",
      "Certificates": "certificates",
    };
    return idMap[title] || title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      {projectsToRender.map((project) => {
        const sectionId = getSectionId(project.title);
        const hasName = project.name && project.name.trim() !== "";
        const hasLinks = project.links && project.links.length > 0;
        const useTwoColumn = hasName || hasLinks;

        return (
          <Section key={project.title} title={sectionTitle || project.title} mt={80} id={sectionId}>
            <div className="flex flex-col gap-16">
              {useTwoColumn ? (
                <TwoColumnWrapper
                  left={
                    <>
                      {hasName && (
                        <h3 className="text-xl font-bold mb-2 text-[color:var(--color-text)] whitespace-pre-line leading-tight">
                          {project.name}
                        </h3>
                      )}
                      {hasLinks && <LinkList links={project.links || []} />}
                    </>
                  }
                  right={
                    <div className="flex flex-col gap-10">
                      {project.features.map((feature, featureIndex) => (
                        <div key={`${project.title}-${featureIndex}`}>
                          <h2 className="text-lg font-bold mb-3 text-[color:var(--color-text)]">
                            {feature.title}
                          </h2>
                          <List
                            items={feature.descriptions.map((description, index) => {
                              const link = feature.links && feature.links[index];
                              if (link) {
                                // 콤마 기준으로 분리: 콤마 앞은 일반 텍스트, 콤마 뒤는 링크
                                const commaIndex = description.indexOf(",");
                                if (commaIndex !== -1) {
                                  const beforeComma = description.substring(0, commaIndex + 1);
                                  const afterComma = description.substring(commaIndex + 1).trim();
                                  return (
                                    <p key={index} className="text-[color:var(--color-text-muted)]">
                                      {parseBold(beforeComma)}{" "}
                                      <Link href={link} target="_blank" rel="noopener noreferrer">
                                        {parseBold(afterComma)}
                                      </Link>
                                    </p>
                                  );
                                }
                                // 콤마가 없으면 전체를 링크로
                                return (
                                  <p key={index} className="text-[color:var(--color-text-muted)]">
                                    <Link href={link} target="_blank" rel="noopener noreferrer">
                                      {parseBold(description)}
                                    </Link>
                                  </p>
                                );
                              }
                              return (
                                <p key={index} className="text-[color:var(--color-text-muted)]">
                                  {parseBold(description)}
                                </p>
                              );
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  }
                />
              ) : (
                <div className="flex flex-col gap-10">
                  {project.features.map((feature, featureIndex) => (
                    <div key={`${project.title}-${featureIndex}`}>
                      <h2 className="text-lg font-bold mb-3 text-[color:var(--color-text)]">
                        {feature.title}
                      </h2>
                      <List
                        items={feature.descriptions.map((description, index) => {
                          const link = feature.links && feature.links[index];
                          if (link) {
                            // 콤마 기준으로 분리: 콤마 앞은 일반 텍스트, 콤마 뒤는 링크
                            const commaIndex = description.indexOf(",");
                            if (commaIndex !== -1) {
                              const beforeComma = description.substring(0, commaIndex + 1);
                              const afterComma = description.substring(commaIndex + 1).trim();
                              return (
                                <p key={index} className="text-[color:var(--color-text-muted)]">
                                  {parseBold(beforeComma)}{" "}
                                  <Link href={link} target="_blank" rel="noopener noreferrer">
                                    {parseBold(afterComma)}
                                  </Link>
                                </p>
                              );
                            }
                            // 콤마가 없으면 전체를 링크로
                            return (
                              <p key={index} className="text-[color:var(--color-text-muted)]">
                                <Link href={link} target="_blank" rel="noopener noreferrer">
                                  {parseBold(description)}
                                </Link>
                              </p>
                            );
                          }
                          return (
                            <p key={index} className="text-[color:var(--color-text-muted)]">
                              {parseBold(description)}
                            </p>
                          );
                        })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>
        );
      })}
    </>
  );
};
