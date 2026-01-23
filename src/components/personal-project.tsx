import { useResumeData } from "../context/resume-context";
import { LinkList } from "./link-list";
import { List } from "./List";
import { RichTextLine } from "./rich-text-line";
import { Section } from "./Section";
import { SpecSheet } from "./spec-sheet";
import { TwoColumnWrapper } from "./two-column-wrapper";

export const PersonalProject = () => {
  const { personalProjects } = useResumeData();

  return (
    <Section title="Side Project" mt={80} id="side-project">
      <div className="flex flex-col gap-16">
        {personalProjects.map((project) => (
          <TwoColumnWrapper
            key={project.title}
            left={
              <>
                <h3 className="text-xl font-bold mb-2 text-[color:var(--color-text)] whitespace-pre-line leading-tight">
                  {project.title}
                </h3>

                <div className="text-sm text-[color:var(--color-text-subtle)] mb-4">
                  {project.from === project.to
                    ? project.from
                    : `${project.from} - ${project.to || "현재"}`}
                </div>
                <LinkList links={project.links || []} />
              </>
            }
            right={
              <div className="flex flex-col gap-10">
                {project.features.map((feature, featureIndex) => (
                  <div key={`${project.title}-${featureIndex}`}>
                    <h2 className="text-lg font-bold mb-3 text-[color:var(--color-text)]">
                      {feature.title}
                    </h2>
                    {feature.achievements.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-[color:var(--color-text)]">성과</h3>
                        <List
                          items={feature.achievements.map(
                            (description: string, index: number) => (
                              <RichTextLine key={index} text={description} />
                            )
                          )}
                        />
                      </div>
                    )}
                    {feature.contributions.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-[color:var(--color-text)]">
                          주요 기여
                        </h3>
                        <List
                          items={feature.contributions.map(
                            (description: string, index: number) => (
                              <RichTextLine key={index} text={description} />
                            )
                          )}
                        />
                      </div>
                    )}
                    {feature.spec && feature.spec.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold mb-3 text-[color:var(--color-text)]"></h3>
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
    </Section>
  );
};
