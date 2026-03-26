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
        className="p-1 px-2 border border-[color:var(--color-border)] rounded hover:bg-[color:var(--ui-secondary-hover-bg)] text-[color:var(--color-text)] transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
};
