import { memo, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { BAND_H, PIECES, buildLayout, type Placed } from "./paperGeometry";
import { seeded } from "../../lib/pencil";

/**
 * Full-height pencil geometry for the whole page. It is mounted once inside
 * <main> (see PageLayout) and measures its parent, so it always spans the
 * entire scrollable height – hero, every middle section, case studies,
 * skills and contact – instead of living only at the top.
 *
 * `salt` (the route path) re-seeds the layout, so each page and each case
 * study gets its own arrangement of shapes.
 */

function PencilFilter() {
    return (
        <svg className="paper-geo__defs" width="0" height="0" aria-hidden="true" focusable="false">
            <defs>
                {/* wobble the line a little, then eat tiny gaps out of it – graphite on rough paper */}
                <filter id="paper-pencil" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="warp" />
                    <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="wobbled" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" result="grain" />
                    <feColorMatrix
                        in="grain"
                        type="matrix"
                        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.2"
                        result="tooth"
                    />
                    <feComposite in="wobbled" in2="tooth" operator="in" />
                </filter>
            </defs>
        </svg>
    );
}

const Piece = memo(function Piece({ p, top }: { p: Placed; top: number }) {
    const def = PIECES[p.kind];
    const rng = seeded(p.seed);
    const style = {
        top,
        [p.side === "right" ? "right" : "left"]: `${p.off}%`,
        "--pg-w": p.width,
        "--pg-sw": `${p.stroke}px`,
        "--pg-rot": `${p.rotate}deg`,
        "--pg-o": p.opacity,
    } as CSSProperties;

    return (
        <div className={`paper-geo paper-geo--${p.side} paper-geo--${p.kind}`} style={style}>
            <svg viewBox={`0 0 ${def.w} ${def.h}`} focusable="false">
                <g className="paper-geo__ink">{def.draw(rng, p.seed)}</g>
            </svg>
        </div>
    );
});

export function PaperBackdrop({ salt = "" }: { salt?: string }) {
    const root = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const host = root.current?.parentElement;
        if (!host) return;
        // quantised, so late-loading images don't re-render us on every pixel
        const measure = () => setHeight(Math.round(host.offsetHeight / 40) * 40);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(host);
        return () => ro.disconnect();
    }, [salt]);

    const bands = Math.max(1, Math.ceil(height / BAND_H));
    const layout = useMemo(() => buildLayout(salt, bands), [salt, bands]);

    return (
        <div ref={root} className="paper-backdrop" aria-hidden="true">
            <PencilFilter />
            {height > 0 &&
                layout.map((p) => (
                    // keep the final band inside the page instead of cropping it away
                    <Piece key={p.key + salt} p={p} top={Math.max(0, Math.min(p.top, height - p.approxH * 0.8 - 24))} />
                ))}
        </div>
    );
}
