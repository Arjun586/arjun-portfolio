import { Outlet, useLocation } from "react-router-dom";
import { PaperBackdrop } from "../ui/PaperBackdrop";
import { ThemeSwitch } from "../ui/ThemeSwitch";
import { Sidebar } from "./Sidebar";

export function PageLayout() {
    const { pathname } = useLocation();

    return (
        <div className="portfolio-shell min-h-screen">
            <div className="fixed top-4 right-4 z-40 hidden lg:block">
                <ThemeSwitch />
            </div>
            <div className="portfolio-shell__frame mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[180px_1fr]">
                <Sidebar />

                {/* relative + isolate: the backdrop spans exactly this column's full height and sits behind its content */}
                <main className="relative isolate min-w-0 border-border-default lg:border-l">
                    <PaperBackdrop salt={pathname} />
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
