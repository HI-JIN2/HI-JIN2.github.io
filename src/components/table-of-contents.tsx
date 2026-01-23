import { useEffect, useMemo, useRef, useState } from "react";
import { useResumeData } from "../context/resume-context";

type Section = {
  id: string;
  title: string;
};

export const TableOfContents = () => {
  const { skills } = useResumeData();
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutIdsRef.current = [];
    };
  }, []);
  const sections = useMemo<Section[]>(() => {
    return [
      { id: "about", title: "About" },
      ...(skills && skills.length > 0 ? [{ id: "skills", title: "Skills" }] : []),
      { id: "work-experience", title: "Work Experience" },
      { id: "side-project", title: "Side Project" },
      { id: "award", title: "Award" },
      { id: "community", title: "Community" },
      { id: "presentation", title: "Presentation" },
      { id: "interview", title: "Interview" },
      { id: "education", title: "Education" },
      { id: "certificates", title: "Certificates" },
    ];
  }, [skills]);

  useEffect(() => {
    const updateActiveSection = () => {
      // 수동 스크롤 중이면 업데이트하지 않음
      if (isScrolling) {
        return;
      }

      const scrollPosition = window.scrollY + 200;
      const viewportBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 페이지 맨 아래에 도달했거나 거의 도달한 경우 마지막 섹션 활성화
      const lastSection = sections[sections.length - 1];
      const lastElement = document.getElementById(lastSection.id);
      if (lastElement) {
        const lastElementTop = lastElement.offsetTop;
        const lastElementBottom = lastElementTop + lastElement.offsetHeight;
        
        // 마지막 섹션이 화면에 보이거나 페이지 하단 근처에 있으면 활성화
        if (viewportBottom >= documentHeight - 100 || 
            (scrollPosition >= lastElementTop && viewportBottom >= lastElementBottom - 200)) {
          setActiveId(lastSection.id);
          return;
        }
      }

      // 아래에서 위로 순회하여 현재 스크롤 위치보다 위에 있는 첫 번째 섹션 찾기
      let activeSection = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const elementTop = element.offsetTop;
          
          // 섹션이 뷰포트 상단 기준선보다 위에 있으면
          if (scrollPosition >= elementTop) {
            // 마지막 섹션인 경우 더 관대하게 처리
            if (i === sections.length - 1) {
              // 마지막 섹션이 화면에 보이기 시작하면 활성화
              if (elementTop <= viewportBottom - 100) {
                activeSection = sections[i].id;
                break;
              }
            } else {
              activeSection = sections[i].id;
              break;
            }
          }
        }
      }

      if (activeSection) {
        setActiveId(activeSection);
      }
    };

    // 초기 실행
    updateActiveSection();

    // 스크롤 이벤트 리스너
    const handleScroll = () => {
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // 수동 스크롤 중이면 업데이트하지 않음
        if (isScrolling) {
          return;
        }

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top,
            ratio: entry.intersectionRatio,
          }));

        if (visibleSections.length > 0) {
          // 가장 많이 보이는 섹션 선택 (intersectionRatio가 높은 것)
          const mostVisible = visibleSections.reduce((prev, current) => {
            return current.ratio > prev.ratio ? current : prev;
          });
          
          // 뷰포트 상단 근처에 있는 섹션 우선
          const viewportTop = 200;
          const closestToTop = visibleSections.reduce((prev, current) => {
            const prevDistance = Math.abs(prev.top - viewportTop);
            const currentDistance = Math.abs(current.top - viewportTop);
            return currentDistance < prevDistance ? current : prev;
          });
          
          // 두 조건을 종합하여 선택
          if (mostVisible.ratio > 0.3) {
            setActiveId(mostVisible.id);
          } else {
            setActiveId(closestToTop.id);
          }
        }
      },
      {
        rootMargin: "-10% 0% -70% 0%",
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isScrolling, sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 즉시 활성화 상태 업데이트
      setActiveId(id);
      setIsScrolling(true);
      
      // 스크롤 위치 계산
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // 스크롤 실행
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      
      // 스크롤 완료 후 다시 확인
      timeoutIdsRef.current.push(window.setTimeout(() => {
        const finalElement = document.getElementById(id);
        if (finalElement) {
          const finalY = finalElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, finalY), behavior: "smooth" });
        }
        // 확실하게 활성화 상태 유지
        setActiveId(id);
        
        // 스크롤 완료 후 약간의 지연을 두고 감지 재개
        timeoutIdsRef.current.push(window.setTimeout(() => {
          // 마지막 확인: 여전히 클릭한 섹션이 활성화되어 있어야 함
          const checkElement = document.getElementById(id);
          if (checkElement) {
            const checkY = checkElement.getBoundingClientRect().top + window.pageYOffset;
            const currentScroll = window.scrollY;
            // 스크롤 위치가 해당 섹션 근처에 있으면 활성화 유지
            if (Math.abs(currentScroll - checkY) < 300) {
              setActiveId(id);
            }
          }
          setIsScrolling(false);
        }, 800));
      }, 300));
    }
  };

  return (
    <aside className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-48">
      <nav className="sticky top-24">
        <ul className="space-y-2">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <button
                onClick={() => handleClick(id)}
                className={`text-sm transition-colors text-left w-full ${
                  activeId === id
                    ? "text-[#191f28] font-semibold"
                    : "text-[#8b95a1] hover:text-[#4e5968]"
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
