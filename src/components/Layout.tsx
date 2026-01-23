import React from "react";
import { TableOfContents } from "./table-of-contents";
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
        <div className="bg-[color:var(--color-surface)] backdrop-blur-md border-b border-[color:var(--color-border)]">
          <div className="max-w-[900px] w-full mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[color:var(--color-text)] truncate">
                {profile.name}
              </div>
              {profile.headline && (
                <div className="text-xs text-[color:var(--color-text-subtle)] truncate">
                  {profile.headline}
                </div>
              )}
            </div>
            <ResumeSwitcher />
          </div>
        </div>
      </header>
      <main className="max-w-[900px] w-full mx-auto pt-24 px-6 pb-16 relative">
        {children}
      </main>
      <TableOfContents />
    </div>
  );
};
