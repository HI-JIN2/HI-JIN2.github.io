import React from "react";

type Props = {
  items: string[] | React.ReactNode[];
};
export const List = ({ items }: Props) => {
  return (
    <ul className="ml-6 list-disc">
      {items.map((item, index) => (
        <li
          key={index}
          className="break-keep"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
