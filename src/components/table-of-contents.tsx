import { useEffect, useMemo, useRef, useState } from "react";
import { useResume } from "../context/resume-context";

type Section = {
  id: string;
  title: string;
};

export const TableOfContents = () => {
  const { data, isTOCOpen, setIsTOCOpen } = useResume();
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
      const lastElement = document.getElementById(lastSection.id);
      if (lastElement) {
        if (viewportBottom >= documentHeight - 50) {
          setActiveId(lastSection.id);
          return;
        }
      }

      let activeSection = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          if (scrollPosition >= element.offsetTop) {
            activeSection = sections[i].id;
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
      setIsTOCOpen(false); // Close drawer on click

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


      {/* Mobile Drawer Overlay */}
      {isTOCOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] transition-opacity animate-in fade-in"
          onClick={() => setIsTOCOpen(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-[color:var(--color-bg)] rounded-t-3xl p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-[color:var(--color-border)] rounded-full mx-auto mb-8"></div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Contents</h2>
              <button onClick={() => setIsTOCOpen(false)} className="text-[color:var(--color-text-subtle)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <ul className="grid grid-cols-1 gap-3 m-0 p-0 list-none">
              {sections.map(({ id, title }) => (
                <li key={id} className="m-0 p-0">
                  <button
                    onClick={() => handleClick(id)}
                    className={`w-full text-left py-4 px-6 rounded-2xl text-base font-medium transition-colors ${
                      activeId === id
                        ? "bg-[color:var(--color-accent)] text-white"
                        : "bg-[color:var(--color-bg-subtle)] text-[color:var(--color-text)] active:bg-[color:var(--color-border-subtle)]"
                    }`}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
