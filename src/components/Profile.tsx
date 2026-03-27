import { useResumeData } from "../context/resume-context";
import { Link } from "./link";
import { GitHubMark } from "./icons/github-mark";
import { Section } from "./Section";

const isGitHubUrl = (href: string) => {
  try {
    const u = new URL(href);
    return u.hostname.toLowerCase().endsWith("github.com");
  } catch (e) {
    return href.includes("github.com");
  }
};

export const Profile = () => {
  const { profile } = useResumeData();
  const items = profile.links || [];

  return (
    <Section mb={48}>
      {profile.headline && (
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--color-text)",
            border: "none",
            paddingTop: 0,
            margin: 0,
            marginBottom: "2rem",
            lineHeight: 1.3,
          }}
        >
          {profile.headline}
        </h1>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          marginTop: "1.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        {items.map(({ label, value, href }) => {
          const resolvedHref =
            href ||
            (value.startsWith("http")
              ? value
              : value.includes("@")
              ? `mailto:${value}`
              : undefined);

          return (
            <div
              key={`${label}-${value}`}
              style={{ display: "flex", alignItems: "baseline" }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--color-text-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "90px",
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              {resolvedHref ? (
                <Link
                  href={resolvedHref}
                  style={{ textDecoration: "none", fontSize: "13px" }}
                >
                  {label.toLowerCase() === "github" || isGitHubUrl(resolvedHref) ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "var(--color-text)",
                      }}
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <GitHubMark size={16} title="" />
                    </span>
                  ) : (
                    value
                  )}
                </Link>
              ) : (
                <span style={{ fontSize: "13px", color: "var(--color-text)" }}>
                  {value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
};
