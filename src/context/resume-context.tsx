import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DEFAULT_RESUME_TYPE,
  ResumeContent,
  ResumeType,
  getResumeContent,
} from "../data";

type ResumeContextValue = {
  type: ResumeType;
  data: ResumeContent;
  theme: "light" | "dark";
  setType: (type: ResumeType) => void;
  toggleTheme: () => void;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

const resolveInitialType = (pathname: string): ResumeType => {
  // 경로에서 타입 확인
  if (pathname === "/sw" || pathname === "/general") {
    return "general";
  }
  // 기본값은 android
  return DEFAULT_RESUME_TYPE;
};

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [type, setType] = useState<ResumeType>(() =>
    resolveInitialType(pathname)
  );
  const data = useMemo(() => getResumeContent(type), [type]);

  // 경로 변경 시 타입 업데이트
  useEffect(() => {
    const newType = resolveInitialType(pathname);
    if (newType !== type) {
      setType(newType);
    }
  }, [pathname, type]);

  // 타입 변경 시 경로 업데이트
  const handleSetType = (newType: ResumeType) => {
    setType(newType);
    const targetPath = newType === "general" ? "/sw" : "/android";
    navigate(targetPath, { replace: true });
  };

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as "light" | "dark";
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ResumeContext.Provider value={{ type, data, theme, setType: handleSetType, toggleTheme }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);

  if (!ctx) {
    throw new Error("useResume는 ResumeProvider 내에서 사용되어야 합니다.");
  }

  return ctx;
};

export const useResumeData = () => {
  const { data } = useResume();
  return data;
};
