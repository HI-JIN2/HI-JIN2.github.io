import { useResumeData } from "../context/resume-context";
import { LinkList } from "./link-list";
import { List } from "./List";
import { RichTextLine } from "./rich-text-line";
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

        const featureBlocks = (
          <div className="flex flex-col gap-10">
            {project.features.map((feature, featureIndex) => (
              <div key={`${project.title}-${featureIndex}`}>
                <h2 className="text-lg font-bold mb-3 text-[color:var(--color-text)]">
                  {feature.title}
                </h2>
                <List
                  items={feature.descriptions.map((description, index) => {
                    const href = feature.links && feature.links[index];
                    return <RichTextLine key={index} text={description} href={href} />;
                  })}
                />
              </div>
            ))}
          </div>
        );

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
                  right={featureBlocks}
                />
              ) : (
                featureBlocks
              )}
            </div>
          </Section>
        );
      })}
    </>
  );
};
