import React from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const TwoColumnWrapper = ({ left, right }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        columnGap: "2.5rem",
        rowGap: "1.5rem",
        marginBottom: "4rem",
      }}
    >
      <div style={{ flexShrink: 0 }}>{left}</div>
      <div style={{ minWidth: 0 }}>
        {right}
      </div>
    </div>
  );
};
