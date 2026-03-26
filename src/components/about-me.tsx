import { useResumeData } from "../context/resume-context";
import { Section } from "./Section";
import { parseBold } from "../utils/parse-bold";

export const AboutMe = () => {
  const { about } = useResumeData();

  return (
    <Section title="About" id="about">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {about.map(({ title, descriptions }, index) => (
          <div key={index}>
            <h3
              style={{
                fontWeight: 600,
                fontSize: "1rem",
                marginBottom: "0.5rem",
                color: "var(--color-text)",
              }}
            >
              {title}
            </h3>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 1.2rem",
                listStyleType: "disc",
              }}
            >
              {descriptions.map((description, descIndex) => (
                <li
                  key={descIndex}
                >
                  {parseBold(description)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};
