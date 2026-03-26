import { useEffect, useMemo, useRef, useState } from "react";
import { useResume } from "../context/resume-context";

type Section = {
  id: string;
  title: string;
};

export const TableOfContents = () => {
  const { data } = useResume();
  const { skills } = data;
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id: number) => window.clearTimeout(id));
      timeoutIdsRef.current = [];
    };
  }, []);

  const sections = useMemo<Section[]>(() => {
    return [
      { id: "about", title: "About Me" },
      ...(skills && skills.length > 0 ? [{ id: "skills", title: "Skills" }] : []),
      { id: "work", title: "Work Experience" },
      { id: "project", title: "Personal Projects" },
      { id: "award", title: "Awards" },
      { id: "community", title: "Community" },
      { id: "presentation", title: "Presentation" },
      { id: "interview", title: "Interview" },
      { id: "education", title: "Education" },
      { id: "certificates", title: "Certificates" },
    ];
  }, [skills]);

  useEffect(() => {
    const updateActiveSection = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 200;
      const viewportBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const lastSection = sections[sections.length - 1];
      if (!lastSection) return;

      const lastElement = document.getElementById(lastSection.id);
      if (lastElement) {
        if (viewportBottom >= documentHeight - 50) {
          setActiveId(lastSection.id);
          return;
        }
      }

      let activeSection = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        const element = document.getElementById(section.id);
        if (element) {
          if (scrollPosition >= element.offsetTop) {
            activeSection = section.id;
            break;
          }
        }
      }

      if (activeSection) setActiveId(activeSection);
    };

    updateActiveSection();
    const handleScroll = () => updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling, sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      setIsScrolling(true);

      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

      timeoutIdsRef.current.push(window.setTimeout(() => setIsScrolling(false), 1000));
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block"
        style={{
          position: "fixed",
          top: "7rem",
          right: "2rem",
          width: "180px",
          maxHeight: "calc(100vh - 9rem)",
          overflowY: "auto",
          zIndex: 100,
        }}
      >
        <nav style={{ borderLeft: "1px solid var(--color-border)", paddingLeft: "1.25rem" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-text-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
            Table of Contents
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {sections.map(({ id, title }) => (
              <li key={id} style={{ margin: 0, padding: 0 }}>
                <button
                  onClick={() => handleClick(id)}
                  style={{
                    fontSize: "12px",
                    textAlign: "left",
                    width: "100%",
                    display: "block",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    background: activeId === id ? "var(--color-bg-subtle)" : "transparent",
                    color: activeId === id ? "var(--color-accent)" : "var(--color-text-subtle)",
                    fontWeight: activeId === id ? 700 : 400,
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={e => { if (activeId !== id) (e.target as HTMLElement).style.color = "var(--color-text)"; }}
                  onMouseLeave={e => { if (activeId !== id) (e.target as HTMLElement).style.color = "var(--color-text-subtle)"; }}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>


    </>
  );
};
