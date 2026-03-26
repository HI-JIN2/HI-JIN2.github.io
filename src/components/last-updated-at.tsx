import { useEffect, useState } from "react";
import { useResumeData } from "../context/resume-context";

export const LastUpdatedAt = () => {
  const { lastUpdatedAt: fallbackDate } = useResumeData();
  const [date, setDate] = useState<string>(fallbackDate);

  useEffect(() => {
    fetch("https://api.github.com/repos/HI-JIN2/HI-JIN2.github.io/commits/main")
      .then((res) => res.json())
      .then((data) => {
        if (data.commit?.committer?.date) {
          const d = new Date(data.commit.committer.date);
          const formatted = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
          setDate(formatted);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch last updated date:", err);
      });
  }, []);

  return (
    <div className="text-sm text-center mt-12 text-[color:var(--color-text-subtle)]">
      Last updated: {date}
    </div>
  );
};
