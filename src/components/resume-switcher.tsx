import { useResume } from "../context/resume-context";

export const ResumeSwitcher = () => {
  const { type, setType, theme, toggleTheme } = useResume();
  const isAndroid = type === "android";

  return (
    <nav className="flex items-center gap-4">
      <div className="flex bg-[color:var(--ui-secondary-bg)] p-1 rounded-md border border-[color:var(--color-border)]">
        <button
          onClick={() => setType("android")}
          className={`px-3 py-1 text-xs font-medium rounded transition-all ${
            isAndroid
              ? "bg-[color:var(--color-bg)] text-[color:var(--color-text)] shadow-sm"
              : "text-[color:var(--color-text-subtle)] hover:text-[color:var(--color-text)]"
          }`}
        >
          Android
        </button>
        <button
          onClick={() => setType("general")}
          className={`px-3 py-1 text-xs font-medium rounded transition-all ${
            !isAndroid
              ? "bg-[color:var(--color-bg)] text-[color:var(--color-text)] shadow-sm"
              : "text-[color:var(--color-text-subtle)] hover:text-[color:var(--color-text)]"
          }`}
        >
          SW Engineer
        </button>
      </div>
      
      <button
        onClick={toggleTheme}
        className="p-2 border border-[color:var(--color-border)] rounded hover:bg-[color:var(--ui-secondary-hover-bg)] transition-colors flex items-center justify-center"
        style={{ color: "var(--color-text)" }}
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        )}
      </button>
    </nav>
  );
};
