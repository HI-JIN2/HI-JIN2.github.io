import { parseBold } from "../utils/parse-bold";
import { Link } from "./link";

type Props = {
  text: string;
  href?: string;
  className?: string;
};

export const RichTextLine = ({ text, href, className = "" }: Props) => {
  const baseClassName = `text-[color:var(--color-text-muted)] ${className}`.trim();

  if (!href) {
    return <p className={baseClassName}>{parseBold(text)}</p>;
  }

  const commaIndex = text.indexOf(",");
  if (commaIndex !== -1) {
    const beforeComma = text.substring(0, commaIndex + 1);
    const afterComma = text.substring(commaIndex + 1).trim();

    return (
      <p className={baseClassName}>
        {parseBold(beforeComma)}{" "}
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {parseBold(afterComma)}
        </Link>
      </p>
    );
  }

  return (
    <p className={baseClassName}>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {parseBold(text)}
      </Link>
    </p>
  );
};
