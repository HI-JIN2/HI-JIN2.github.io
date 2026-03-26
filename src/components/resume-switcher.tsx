import { useResume } from "../context/resume-context";

export const ResumeSwitcher = () => {
  const { type, setType, theme, toggleTheme } = useResume();
  const isAndroid = type === "android";

  return (
    <nav className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setType("android")}
          className={`font-medium ${isAndroid ? "text-[color:var(--color-text)] underline underline-offset-4" : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"}`}
        >
          Android
        </button>
        <span className="text-[color:var(--color-border)]">/</span>
        <button
          onClick={() => setType("general")}
          className={`font-medium ${!isAndroid ? "text-[color:var(--color-text)] underline underline-offset-4" : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"}`}
        >
          SW Engineer
        </button>
      </div>
      
      <button
        onClick={toggleTheme}
        className="p-2 border border-[color:var(--color-border)] rounded hover:bg-[color:var(--ui-secondary-hover-bg)] text-[color:var(--color-text)] transition-colors flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        )}
      </button>
    </nav>
  );
};
