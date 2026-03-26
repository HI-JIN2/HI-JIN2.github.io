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
        gridTemplateColumns: "250px 1fr", // 너비를 200px에서 250px로 확장
        columnGap: "2rem",
        rowGap: "1.5rem",
        marginBottom: "4rem",
        alignItems: "start", // 시작점 정렬 보장
      }}
    >
      <div style={{ flexShrink: 0, paddingTop: "0.25rem" }}>{left}</div>
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
