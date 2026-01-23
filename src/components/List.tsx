import React from "react";

type Props = {
  items: string[] | React.ReactNode[];
  type?: "disc" | "decimal";
};
export const List = ({ items, type = "disc" }: Props) => {
  return (
    <ul className="ml-6 space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          style={{ listStyleType: type }}
          className="relative leading-relaxed break-keep text-[color:var(--color-text-muted)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
