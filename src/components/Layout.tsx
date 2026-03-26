import React from "react";
import { ResumeSwitcher } from "./resume-switcher";
import { useResumeData } from "../context/resume-context";

type Props = {
  children: React.ReactNode;
};
export const Layout = ({ children }: Props) => {
  const { profile } = useResumeData();

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[color:var(--color-bg)] border-b border-[color:var(--color-border)]">
          <div className="max-w-[680px] w-full mx-auto px-20 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-base font-bold text-[color:var(--color-text)] truncate">
                {profile.name}
              </div>
            </div>
            <ResumeSwitcher />
          </div>
        </div>
      </header>
      <main className="max-w-[680px] w-full mx-auto pt-24 px-20 pb-16 relative">
        {children}
      </main>
    </div>
  );
};
