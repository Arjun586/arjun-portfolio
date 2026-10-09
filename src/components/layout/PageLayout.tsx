import { Outlet } from "react-router-dom";
import { ThemeSwitch } from "../ui/ThemeSwitch";
import { Sidebar } from "./Sidebar";

export function PageLayout() {
    return (
        <div className="min-h-screen bg-background">
            <div className="fixed top-4 right-4 z-40 hidden lg:block">
                <ThemeSwitch />
            </div>
            <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[180px_1fr]">
                <Sidebar />

                <main className="border-border-default lg:border-l">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
