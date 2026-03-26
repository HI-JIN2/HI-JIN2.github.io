import React from "react";

type Props = {
  items: string[] | React.ReactNode[];
};
export const List = ({ items }: Props) => {
  return (
    <ul className="ml-6 space-y-2 list-disc">
      {items.map((item, index) => (
        <li
          key={index}
          className="leading-relaxed break-keep text-[color:var(--color-text-muted)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
