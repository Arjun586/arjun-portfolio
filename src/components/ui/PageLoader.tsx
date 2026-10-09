import { useEffect, useRef, type AnimationEvent } from "react";

const LOADER_DURATION_MS = 1400;

type PageLoaderProps = {
    onComplete?: () => void;
};

export function PageLoader({ onComplete }: PageLoaderProps) {
    const hasCompletedRef = useRef(false);

    useEffect(() => {
        if (!onComplete) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            if (hasCompletedRef.current) {
                return;
            }

            hasCompletedRef.current = true;
            onComplete();
        }, LOADER_DURATION_MS);

        return () => window.clearTimeout(timeoutId);
    }, [onComplete]);

    function handleAnimationEnd(event: AnimationEvent<HTMLSpanElement>) {
        if (event.animationName !== "page-loader-fill" || !onComplete || hasCompletedRef.current) {
            return;
        }

        hasCompletedRef.current = true;
        onComplete();
    }

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-text"
            role="status"
            aria-live="polite"
            aria-label="Loading page"
        >
            <p className="font-heading text-section tracking-[0.12em]">LOADING</p>
            <div className="page-loader-track" aria-hidden="true">
                <span className="page-loader-bar" onAnimationEnd={handleAnimationEnd} />
            </div>
            <style>{`
                .page-loader-track {
                    width: 12rem;
                    height: 2px;
                    background-color: color-mix(in srgb, var(--color-text) 15%, transparent);
                    overflow: hidden;
                }

                .page-loader-bar {
                    display: block;
                    width: 0;
                    height: 100%;
                    background-color: var(--color-accent);
                    animation: page-loader-fill ${LOADER_DURATION_MS}ms ease-out forwards;
                }

                @keyframes page-loader-fill {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
