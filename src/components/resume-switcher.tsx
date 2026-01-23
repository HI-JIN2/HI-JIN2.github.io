import { useResume } from "../context/resume-context";

export const ResumeSwitcher = () => {
  const { type, setType } = useResume();
  const isAndroid = type === "android";

  const toggleType = () => {
    setType(isAndroid ? "general" : "android");
  };

  return (
    <div className="absolute top-4 right-6 xl:top-16 z-50">
      <button
        type="button"
        onClick={toggleType}
        aria-label={`Switch to ${isAndroid ? "General" : "Android"} resume`}
        aria-pressed={isAndroid}
        className={`
          relative inline-flex h-8 w-[72px] items-center px-2
          rounded-full
          transition-all duration-300 ease-in-out
          outline-none
          focus:outline-none
          active:outline-none
          focus-visible:outline-none
          ${isAndroid ? "!bg-[color:var(--color-accent)] justify-start" : "!bg-[color:var(--color-border)] justify-end"}
        `}
      >
        <span
          className={`
            absolute h-6 w-6
            rounded-full
            !bg-white
            shadow-sm
            transition-all duration-300 ease-in-out
            transform
            ${isAndroid ? "right-1 translate-x-0" : "left-1 translate-x-0"}
            hover:scale-110
            active:scale-95
          `}
        />
        {isAndroid ? (
          <span className="relative z-10 text-[10px] font-medium text-white/80 ml-2 mr-6 transition-opacity duration-300 ease-in-out">
            android
          </span>
        ) : (
          <span className="relative z-10 text-[10px] font-medium text-[color:var(--color-text-subtle)] ml-6 mr-2 transition-opacity duration-300 ease-in-out">
            general
          </span>
        )}
      </button>
    </div>
  );
};
