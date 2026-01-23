import { useResumeData } from "../context/resume-context";
import { Link } from "./link";
import { Section } from "./Section";

export const Profile = () => {
  const { profile } = useResumeData();
  const items = profile.links || [];

  return (
    <Section title={profile.name} mb={64}>
      {profile.headline && (
        <p className="text-[color:var(--color-text-muted)] text-base leading-relaxed -mt-4 mb-6">
          {profile.headline}
        </p>
      )}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {items.map(({ label, value, href }) => {
          const resolvedHref =
            href ||
            (value.startsWith("http")
              ? value
              : value.includes("@")
              ? `mailto:${value}`
              : undefined);
              
            return (
              <div key={`${label}-${value}`} className="flex items-center gap-2">
                <span className="text-[color:var(--color-text-subtle)] text-sm font-medium">{label}</span>
                {resolvedHref ? (
                  <Link href={resolvedHref}>
                    {value}
                  </Link>
                ) : (
                  <span className="text-[color:var(--color-text)]">{value}</span>
                )}
              </div>
            );
          })}
      </div>
    </Section>
  );
};
