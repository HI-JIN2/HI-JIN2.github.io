import { Link } from "./link";
import { GitHubMark } from "./icons/github-mark";

const isGitHubUrl = (href: string) => {
  try {
    const u = new URL(href);
    return u.hostname.toLowerCase().endsWith("github.com");
  } catch (e) {
    return href.includes("github.com");
  }
};

type LinkItem = {
  title: string;
  url: string;
};

type Props = {
  links: LinkItem[];
};

export const LinkList = ({ links }: Props) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {links.map((link, index) => (
        <Link
          key={index}
          target="_blank"
          href={link.url}
          className={
            isGitHubUrl(link.url) || link.title.toLowerCase() === "github"
              ? "inline-flex items-center text-[color:var(--color-text)] hover:text-[color:var(--color-text)] hover:no-underline"
              : "text-sm"
          }
          aria-label={isGitHubUrl(link.url) || link.title.toLowerCase() === "github" ? "GitHub" : undefined}
          title={isGitHubUrl(link.url) || link.title.toLowerCase() === "github" ? "GitHub" : undefined}
        >
          {isGitHubUrl(link.url) || link.title.toLowerCase() === "github" ? (
            <GitHubMark size={18} title="" className="mx-0.5" />
          ) : (
            link.title
          )}
        </Link>
      ))}
    </div>
  );
};
