import { Link } from "react-router-dom";
import { ThemeSwitch } from "./ThemeSwitch";

export function MobileHeader() {
    return (
        <div className="flex items-center justify-between border-b border-border-default pad-mobile-header lg:hidden">
            <Link
                to="/"
                className="font-heading text-card-title leading-none tracking-tight"
            >
                ARJUN
            </Link>
            <ThemeSwitch />
        </div>
    );
}