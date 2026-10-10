import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";

function readStoredTheme(): Theme | null {
    try {
        const value = window.localStorage.getItem(STORAGE_KEY);
        return value === "light" || value === "dark" ? value : null;
    } catch {
        return null;
    }
}

function getCurrentTheme(): Theme {
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme);
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

function persistTheme(theme: Theme) {
    try {
        window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
        void e;
    }
}

function setTheme(theme: Theme) {
    persistTheme(theme);
    applyTheme(theme);
}

type ViewTransitionLike = {
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
};
type StartViewTransition = (update: () => void) => ViewTransitionLike;

const REVEAL_DURATION_MS = 650;
const REVEAL_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

let activeTransition: ViewTransitionLike | null = null;
let pendingTheme: Theme | null = null;

function revealOrigin(origin?: Element | null) {
    if (origin) {
        const rect = origin.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: window.innerWidth - 56, y: 32 };
}

function setThemeWithReveal(theme: Theme, origin?: Element | null) {
    const start = (document as unknown as { startViewTransition?: StartViewTransition })
        .startViewTransition;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof start !== "function" || reduceMotion) {
        setTheme(theme);
        return;
    }

    persistTheme(theme);
    pendingTheme = theme;
    activeTransition?.skipTransition();

    const { x, y } = revealOrigin(origin);
    const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.setAttribute("data-theme-transition", "");

    const transition = start.call(document, () => {
        flushSync(() => applyTheme(pendingTheme ?? theme));
    });
    activeTransition = transition;

    transition.ready
        .then(() => {
            root.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${radius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: REVEAL_DURATION_MS,
                    easing: REVEAL_EASING,
                    pseudoElement: "::view-transition-new(root)",
                },
            );
        })
        .catch(() => {
        });

    transition.finished
        .catch(() => { })
        .finally(() => {
            if (activeTransition === transition) {
                activeTransition = null;
                pendingTheme = null;
                root.removeAttribute("data-theme-transition");
            }
        });
}

function subscribe(callback: () => void) {
    window.addEventListener(CHANGE_EVENT, callback);
    return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function initThemeSync() {
    applyTheme(readStoredTheme() ?? "light");
    window.addEventListener("storage", (event) => {
        if (event.key === STORAGE_KEY) {
            applyTheme(readStoredTheme() ?? "light");
        }
    });
}

export function useTheme() {
    const theme = useSyncExternalStore(subscribe, getCurrentTheme, (): Theme => "light");
    const toggle = useCallback((origin?: Element | null) => {
        const current = pendingTheme ?? getCurrentTheme();
        setThemeWithReveal(current === "dark" ? "light" : "dark", origin);
    }, []);

    return { theme, toggle };
}