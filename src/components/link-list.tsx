import { Link } from "./link";
import { GitHubMark } from "./icons/github-mark";
import { PlayStore } from "./icons/play-store";

const isGitHubUrl = (href: string) => {
  try {
    const u = new URL(href);
    return u.hostname.toLowerCase().endsWith("github.com");
  } catch (e) {
    return href.includes("github.com");
  }
};

const isPlayStoreUrl = (href: string, title: string) => {
  const isUrl = href.includes("play.google.com");
  const isTitle = title.toLowerCase().includes("play store") || title.toLowerCase().includes("플레이스토어");
  return isUrl || isTitle;
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
      {links.map((link, index) => {
        const isGithub = isGitHubUrl(link.url) || link.title.toLowerCase() === "github";
        const isPlayStore = isPlayStoreUrl(link.url, link.title);
        const isIconLink = isGithub || isPlayStore;

        return (
          <Link
            key={index}
            target="_blank"
            href={link.url}
            className={
              isIconLink
                ? "inline-flex items-center !text-black !hover:text-black"
                : "text-sm"
            }
            aria-label={isGithub ? "GitHub" : isPlayStore ? "Play Store" : undefined}
            title={isGithub ? "GitHub" : isPlayStore ? "Play Store" : undefined}
          >
            {isGithub ? (
              <GitHubMark size={24} title="" className="mx-0.5" />
            ) : isPlayStore ? (
              <PlayStore size={24} title="" className="mx-0.5" />
            ) : (
              link.title
            )}
          </Link>
        );
      })}
    </div>
  );
};
