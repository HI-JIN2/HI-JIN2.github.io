import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AboutMe } from "./components/about-me";
import { LastUpdatedAt } from "./components/last-updated-at";
import { Layout } from "./components/Layout";
import { OpenSourceProject } from "./components/open-source-project";
import { SimpleList } from "./components/simple-list";
import { PersonalProject } from "./components/personal-project";
import { Profile } from "./components/Profile";
import { Skills } from "./components/skills";
import { WorkExperience } from "./components/work-experience";
import { ResumeProvider } from "./context/resume-context";

function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // trailing slash 제거
    if (location.pathname !== '/' && location.pathname.endsWith('/')) {
      const pathWithoutSlash = location.pathname.slice(0, -1);
      navigate({ pathname: pathWithoutSlash, search: location.search, hash: location.hash }, { replace: true });
      return;
    }
    
    // /sw-engineer를 /sw로 리다이렉트
    if (location.pathname === '/sw-engineer') {
      navigate({ pathname: '/sw', search: location.search, hash: location.hash }, { replace: true });
      return;
    }
    
    // 허용된 경로가 아니면 /android로 리다이렉트
    const allowedPaths = ['/android', '/sw', '/general'];
    if (!allowedPaths.includes(location.pathname)) {
      navigate({ pathname: '/android', search: location.search, hash: location.hash }, { replace: true });
    }
  }, [navigate, location]);
  
  return null;
}

function ResumeContent() {
  return (
    <>
      <RedirectHandler />
      <Layout>
        <Profile />
        <AboutMe />
        <Skills />
        <WorkExperience />
        <PersonalProject />
        <SimpleList title="Awards" sectionTitle="Award" sectionId="award" />
        <OpenSourceProject title="Community" sectionTitle="Community" />
        <SimpleList title="Presentation" sectionId="presentation" />
        <SimpleList title="Interview" sectionId="interview" />
        <SimpleList title="Education" sectionId="education" />
        <SimpleList title="Certificates" sectionId="certificates" />
        <LastUpdatedAt />
      </Layout>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ResumeProvider>
              <ResumeContent />
            </ResumeProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
