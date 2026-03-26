import React from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const TwoColumnWrapper = ({ left, right }: Props) => {
  return (
    <div
      className="two-column-grid"
      style={{
        columnGap: "2rem",
        rowGap: "1.5rem",
        marginBottom: "4rem",
        alignItems: "start",
      }}
    >
      <div style={{ flexShrink: 0 }}>{left}</div>
      <div
        style={{
          minWidth: 0,
        }}
      >
        {right}
      </div>
    </div>
  );
};
