import { useResumeData } from "../context/resume-context";

export const LastUpdatedAt = () => {
  const { lastUpdatedAt } = useResumeData();

  return (
    <div className="text-sm text-center mt-24 text-[color:var(--color-text-subtle)]">
      Last updated: {lastUpdatedAt}
    </div>
  );
};
