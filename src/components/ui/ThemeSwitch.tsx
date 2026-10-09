import { useTheme } from "../../lib/theme";

export function ThemeSwitch({ className = "" }: { className?: string }) {
    const { theme, toggle } = useTheme();

    return (
        <button
            type="button"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Dark mode"
            onClick={(event) => toggle(event.currentTarget)}
            className={`theme-rocker ${className}`.trim()}
        >
            <span className="theme-rocker__paddle" aria-hidden="true" />
            <span className="theme-rocker__label theme-rocker__label--light" aria-hidden="true">
                LIGHT
            </span>
            <span className="theme-rocker__label theme-rocker__label--dark" aria-hidden="true">
                DARK
            </span>
        </button>
    );
}