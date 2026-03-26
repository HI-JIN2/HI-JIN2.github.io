import React from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const TwoColumnWrapper = ({ left, right }: Props) => {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex-shrink-0">
        {left}
      </div>
      <div className="flex-1 min-w-0 border-l-2 border-[color:var(--color-border)] pl-6 ml-1">
        {right}
      </div>
    </div>
  );
};
