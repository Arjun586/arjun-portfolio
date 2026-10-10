import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={null}>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="experience" element={<Experience />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="projects/:projectId" element={<ProjectDetail />} />
                        <Route path="skills" element={<Skills />} />
                        <Route path="contact" element={<Contact />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
