import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { InitialLoadGate } from "./components/ui/InitialLoadGate";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
// const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <InitialLoadGate>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="projects" element={<Projects />} />
                        {/* <Route path="experience" element={<Experience />} /> */}
                        <Route path="skills" element={<Skills />} />
                        <Route path="contact" element={<Contact />} />
                    </Route>
                </Routes>
            </InitialLoadGate>
        </BrowserRouter>
    );
}

export default App;
