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
    } catch {
        // Storage unavailable (e.g. private mode): the theme still applies for this session.
    }
}

function setTheme(theme: Theme) {
    persistTheme(theme);
    applyTheme(theme);
}

/* ── Animated theme change ──────────────────────────────────────────────
   The new theme is revealed through a circle that grows from the switch
   (top-right) until it covers the whole viewport. It uses the View
   Transitions API; browsers without it, and users who prefer reduced
   motion, get the normal instant change. The matching CSS is in index.css. */

type ViewTransitionLike = {
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
};
type StartViewTransition = (update: () => void) => ViewTransitionLike;

const REVEAL_DURATION_MS = 650;
const REVEAL_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

let activeTransition: ViewTransitionLike | null = null;
// The theme the latest click asked for. Lets a rapid second click interrupt a running reveal.
let pendingTheme: Theme | null = null;

function revealOrigin(origin?: Element | null) {
    if (origin) {
        const rect = origin.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: window.innerWidth - 56, y: 32 }; // where the switch sits by default
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
        // flushSync so React (the switch state) is updated before the new view is captured.
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
            // Transition was skipped or interrupted; the theme change itself still applies.
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

/** Call once at startup. Syncs stored theme or defaults to light, and syncs across tabs. */
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
    /** `origin` is the element the reveal grows from (the switch that was clicked). */
    const toggle = useCallback((origin?: Element | null) => {
        const current = pendingTheme ?? getCurrentTheme();
        setThemeWithReveal(current === "dark" ? "light" : "dark", origin);
    }, []);

    return { theme, toggle };
}