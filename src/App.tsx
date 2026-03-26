import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  AboutMe,
  LastUpdatedAt,
  OpenSourceProject,
  SimpleList,
  PersonalProject,
  Skills,
  WorkExperience,
} from "./components/ResumeSections";
import { Profile } from "./components/Profile";
import { Layout } from "./components/Layout";
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
    const allowedPaths = ["/android", "/sw", "/general"];
    const currentPath = location.pathname;
    
    if (currentPath === "/") {
      return;
    }

    if (!allowedPaths.includes(currentPath)) {
      // GitHub Pages 서브경로 대응 (예: /about/sw -> /sw)
      const matched = allowedPaths.find(p => currentPath.endsWith(p));
      if (matched) {
         // If it ends with /sw but didn't match exactly, it might be /about/sw
         return; 
      }
      navigate({ pathname: "/android", search: location.search, hash: location.hash }, { replace: true });
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
