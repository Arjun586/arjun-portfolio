import type { ReactNode } from "react";
import {
    between,
    clipLineToBox,
    f,
    hashString,
    pick,
    seeded,
    sketchEllipse,
    sketchLine,
    smoothPath,
    spiralPoints,
    type Pt,
    type Rng,
} from "../../lib/pencil";
import { GoldenConstruction } from "./GoldenConstruction";

/* ──────────────────────────────────────────────────────────────────────────
   Page-wide pencil geometry. Every piece draws itself from a seed, so two
   spirals (or two sunbursts…) never come out identical. Strokes are styled by
   .paper-geo in index.css: pg-fine = lighter second pass, pg-accent = accent ink,
   pg-dot = filled dot, pg-dotted = dotted stroke, pg-label = small caption.
   ────────────────────────────────────────────────────────────────────────── */

export type PieceKind =
    | "golden"
    | "goldenRects"
    | "orbital"
    | "circles"
    | "spiral"
    | "curves"
    | "hatch"
    | "sunburst"
    | "arrow"
    | "zigzag"
    | "dotted"
    | "dimension"
    | "ruler"
    | "registration";

type Def = { w: number; h: number; draw: (rng: Rng, seed: number) => ReactNode };

const P = ({ d, fine, accent }: { d: string; fine?: boolean; accent?: boolean }) => (
    <path d={d} className={`${fine ? "pg-fine" : ""} ${accent ? "pg-accent" : ""}`.trim() || undefined} />
);

const rotPt = ([x, y]: Pt, [cx, cy]: Pt, a: number): Pt => {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c];
};

function rectStrokes(x: number, y: number, w: number, h: number, angle: number, rng: Rng, wob = 1.2): string[] {
    const o: Pt = [x, y];
    const c: Pt[] = [
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h],
    ].map((p) => rotPt(p as Pt, o, angle));
    return [0, 1, 2, 3].map((i) => sketchLine(c[i], c[(i + 1) % 4], rng, wob, 5));
}

/* 1 · golden ratio ───────────────────────────────────────────────────────── */

const golden: Def = {
    w: 377,
    h: 377,
    draw: (rng, seed) => <GoldenConstruction seed={seed} square orient={Math.floor(rng() * 8)} labels />,
};

/** Overlapping golden rectangles with the square cut away and the remainder hatched. */
const goldenRects: Def = {
    w: 340,
    h: 250,
    draw: (rng) => {
        const a = between(rng, -0.05, 0.05);
        const base = rectStrokes(24, 40, 233, 144, a, rng);
        const second = rectStrokes(40, 62, 233, 144, a + between(rng, -0.3, -0.18), rng, 1.5);
        const third = rectStrokes(142, 74, 144, 89, a + between(rng, 0.2, 0.34), rng, 1.3);
        // split of rectangle one: square 144 + remainder 89 × 144
        const o: Pt = [24, 40];
        const sp = [rotPt([168, 40], o, a), rotPt([168, 184], o, a)];
        const diag = [rotPt([24, 184], o, a), rotPt([257, 40], o, a)];
        const hatch: string[] = [];
        for (let i = 0; i < 8; i++) {
            const x0 = 176 + i * 10;
            hatch.push(sketchLine(rotPt([x0, 184], o, a), rotPt([x0 + 18, 42 + i * 3], o, a), rng, 0.8, 2));
        }
        return (
            <>
                {base.map((d, i) => (
                    <P key={`b${i}`} d={d} />
                ))}
                {second.map((d, i) => (
                    <P key={`s${i}`} d={d} fine />
                ))}
                {third.map((d, i) => (
                    <P key={`t${i}`} d={d} accent />
                ))}
                <P d={sketchLine(sp[0], sp[1], rng, 1, 4)} />
                <P d={sketchLine(diag[0], diag[1], rng, 1.2, 6)} fine />
                {hatch.map((d, i) => (
                    <P key={`h${i}`} d={d} fine />
                ))}
                <text className="pg-label" x="76" y="30">
                    1 : 1.618
                </text>
                <text className="pg-label" x="278" y="132">
                    φ
                </text>
            </>
        );
    },
};

/* 2 · orbits, circles, spirals ─────────────────────────────────────────── */

const orbital: Def = {
    w: 320,
    h: 210,
    draw: (rng) => {
        const tilt = between(rng, -0.42, -0.14);
        const rings = [
            [136, 56],
            [104, 42],
            [72, 30],
        ].map(([rx, ry]) => sketchEllipse(160, 104, rx * between(rng, 0.96, 1.04), ry, rng, tilt, 0.1));
        const cross = sketchEllipse(160, 104, 118, 74, rng, tilt + 1.05, 0.08);
        const planet = (rx: number, ry: number, t: number): Pt => {
            const x = Math.cos(t) * rx;
            const y = Math.sin(t) * ry;
            return [160 + x * Math.cos(tilt) - y * Math.sin(tilt), 104 + x * Math.sin(tilt) + y * Math.cos(tilt)];
        };
        const p1 = planet(136, 56, between(rng, 0.3, 1.2));
        const p2 = planet(72, 30, between(rng, 3.4, 4.6));
        const p3 = planet(104, 42, between(rng, 5, 6));
        return (
            <>
                {rings.map((d, i) => (
                    <P key={i} d={d} fine={i === 2} accent={i === 1} />
                ))}
                <P d={cross} fine />
                <circle className="pg-dot" cx={f(p1[0])} cy={f(p1[1])} r="4" />
                <circle className="pg-dot" cx={f(p2[0])} cy={f(p2[1])} r="3" />
                <circle cx={f(p3[0])} cy={f(p3[1])} r="5" />
                <circle className="pg-dot" cx="160" cy="104" r="2.4" />
                <P d={sketchLine([150, 104], [170, 104], rng, 0.4, 1)} fine />
                <P d={sketchLine([160, 94], [160, 114], rng, 0.4, 1)} fine />
            </>
        );
    },
};

const circles: Def = {
    w: 250,
    h: 220,
    draw: (rng) => {
        const r = between(rng, 58, 68);
        const c: Pt[] = [
            [84, 84],
            [84 + r * between(rng, 0.9, 1.1), 76],
            [84 + r * 0.5, 84 + r * between(rng, 0.85, 1)],
        ];
        return (
            <>
                {c.map((p, i) => (
                    <P key={i} d={sketchEllipse(p[0], p[1], r, r * between(rng, 0.97, 1.03), rng, 0, 0.12)} accent={i === 1} />
                ))}
                <P d={sketchEllipse(c[0][0] + 6, c[0][1] + 4, r, r, rng, 0, 0.1)} fine />
                {c.map((p, i) => (
                    <circle key={`d${i}`} className="pg-dot" cx={f(p[0])} cy={f(p[1])} r="2.4" />
                ))}
                <P d={sketchLine(c[0], [c[0][0] + r * 0.7, c[0][1] - r * 0.7], rng, 0.6, 2)} fine />
                <P d={sketchLine(c[1], c[2], rng, 0.8, 4)} fine />
                <text className="pg-label" x={f(c[0][0] + r * 0.74)} y={f(c[0][1] - r * 0.76)}>
                    r
                </text>
            </>
        );
    },
};

const spiral: Def = {
    w: 200,
    h: 200,
    draw: (rng) => {
        const pts = spiralPoints(100, 100, 3, between(rng, 70, 84), between(rng, 3, 3.8), rng, rng() * 6.28, 0.035);
        const pts2 = spiralPoints(101, 99, 3, between(rng, 70, 84), between(rng, 3, 3.8), rng, rng() * 6.28, 0.05);
        const tail = pts[pts.length - 1];
        return (
            <>
                <P d={smoothPath(pts)} />
                <P d={smoothPath(pts2)} fine />
                <P d={sketchLine(tail, [tail[0] + between(rng, 10, 30), tail[1] + between(rng, -26, 26)], rng, 1.5, 0)} />
                <circle className="pg-dot" cx="100" cy="100" r="2.2" />
            </>
        );
    },
};

/* 3 · abstract curves, zigzags, arrows ───────────────────────────────── */

const curves: Def = {
    w: 320,
    h: 160,
    draw: (rng) => {
        const amp = between(rng, 14, 28);
        const freq = between(rng, 0.016, 0.03);
        const phase = rng() * 6;
        const lines = Array.from({ length: 6 }, (_, k) => {
            const pts: Pt[] = [];
            for (let x = 0; x <= 316; x += 22) {
                pts.push([x, 30 + k * 15 + Math.sin(x * freq + phase + k * 0.28) * amp + (rng() - 0.5) * 2]);
            }
            return smoothPath(pts);
        });
        const cross: Pt[] = [];
        for (let x = 0; x <= 316; x += 26) cross.push([x, 124 - Math.cos(x * freq * 1.4 + phase) * amp * 0.8]);
        return (
            <>
                {lines.map((d, i) => (
                    <P key={i} d={d} fine={i % 2 === 1} accent={i === 2} />
                ))}
                <P d={smoothPath(cross)} />
            </>
        );
    },
};

const zigzag: Def = {
    w: 250,
    h: 76,
    draw: (rng) => {
        const pts: Pt[] = [[0, 40]];
        let x = 0;
        let up = true;
        while (x < 232) {
            x += between(rng, 15, 28);
            pts.push([x, up ? between(rng, 6, 20) : between(rng, 46, 68)]);
            up = !up;
        }
        const d = pts.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join("");
        const d2 = pts.map((p, i) => `${i ? "L" : "M"}${f(p[0] + 3)} ${f(p[1] + 5)}`).join("");
        return (
            <>
                <P d={d} />
                <P d={d2} fine />
            </>
        );
    },
};

const arrow: Def = {
    w: 240,
    h: 140,
    draw: (rng) => {
        const loop = rng() > 0.4;
        const pts: Pt[] = loop
            ? [
                  [6, 118],
                  [44, 84],
                  [92, 74],
                  [124, 96],
                  [104, 118],
                  [82, 98],
                  [112, 58],
                  [160, 40],
                  [214, 46],
              ]
            : [
                  [6, 112],
                  [48, 62],
                  [104, 36],
                  [158, 52],
                  [196, 92],
                  [220, 100],
              ];
        const end = pts[pts.length - 1];
        const prev = pts[pts.length - 2];
        const a = Math.atan2(end[1] - prev[1], end[0] - prev[0]);
        const head = (da: number): Pt => [end[0] - Math.cos(a + da) * 16, end[1] - Math.sin(a + da) * 16];
        return (
            <>
                <P d={smoothPath(pts)} />
                <P d={smoothPath(pts.map((p) => [p[0] + 3, p[1] + 4] as Pt))} fine />
                <P d={sketchLine(head(0.45), end, rng, 0.5, 1)} />
                <P d={sketchLine(head(-0.5), end, rng, 0.5, 1)} />
            </>
        );
    },
};

/* 4 · hatching, sunbursts ────────────────────────────────────────────── */

const hatch: Def = {
    w: 190,
    h: 150,
    draw: (rng) => {
        const box = { x: 14, y: 14, w: 150, h: 110 };
        const lines: string[] = [];
        // first family: ‒45°, whole patch
        for (let c = box.x + box.y - box.h; c <= box.x + box.y + box.w + box.h; c += between(rng, 7, 9.5)) {
            const seg = clipLineToBox(box, 1, 1, c);
            if (seg) lines.push(sketchLine([seg[0][0] + rng() * 4, seg[0][1]], [seg[1][0] - rng() * 4, seg[1][1]], rng, 0.7, 1));
        }
        // second family: +45°, only the lower-right lens → cross-hatching
        const lens = { x: 66, y: 44, w: 98, h: 80 };
        const cross: string[] = [];
        for (let c = -200; c <= 400; c += between(rng, 7, 9)) {
            const seg = clipLineToBox(lens, 1, -1, c);
            if (seg) cross.push(sketchLine(seg[0], seg[1], rng, 0.6, 1));
        }
        return (
            <>
                {rectStrokes(box.x, box.y, box.w, box.h, between(rng, -0.04, 0.04), rng, 1.4).map((d, i) => (
                    <P key={`o${i}`} d={d} />
                ))}
                {lines.map((d, i) => (
                    <P key={`l${i}`} d={d} fine />
                ))}
                {cross.map((d, i) => (
                    <P key={`c${i}`} d={d} fine accent />
                ))}
            </>
        );
    },
};

const sunburst: Def = {
    w: 210,
    h: 210,
    draw: (rng) => {
        const n = Math.floor(between(rng, 13, 22));
        const half = rng() > 0.6;
        const rays: string[] = [];
        for (let i = 0; i < n; i++) {
            const a = (half ? Math.PI : Math.PI * 2) * (i / (half ? n - 1 : n)) + (half ? Math.PI : 0) + (rng() - 0.5) * 0.12;
            const r1 = between(rng, 22, 30);
            const r2 = r1 + (i % 2 ? between(rng, 22, 38) : between(rng, 46, 74));
            rays.push(sketchLine([105 + Math.cos(a) * r1, 105 + Math.sin(a) * r1], [105 + Math.cos(a) * r2, 105 + Math.sin(a) * r2], rng, 0.8, 0));
        }
        return (
            <>
                {rays.map((d, i) => (
                    <P key={i} d={d} fine={i % 3 === 0} />
                ))}
                <P d={sketchEllipse(105, 105, 15, 15, rng, 0, 0.15)} accent />
                <P d={sketchEllipse(105, 105, 9, 9, rng, 0, 0.1)} fine />
                {half && <P d={sketchLine([8, 106], [202, 106], rng, 1, 6)} />}
            </>
        );
    },
};

/* 5 · dotted paths, dimension lines, rulers, registration ────────────── */

const dotted: Def = {
    w: 330,
    h: 150,
    draw: (rng) => {
        const pts: Pt[] = [
            [10, between(rng, 96, 130)],
            [74, between(rng, 40, 70)],
            [150, between(rng, 90, 126)],
            [232, between(rng, 30, 66)],
            [314, between(rng, 46, 90)],
        ];
        const end = pts[pts.length - 1];
        return (
            <>
                <path className="pg-dotted" d={smoothPath(pts)} />
                <P d={sketchEllipse(pts[0][0], pts[0][1], 7, 7, rng, 0, 0.18)} />
                <P d={sketchLine([end[0] - 8, end[1] - 8], [end[0] + 8, end[1] + 8], rng, 0.4, 0)} />
                <P d={sketchLine([end[0] - 8, end[1] + 8], [end[0] + 8, end[1] - 8], rng, 0.4, 0)} />
            </>
        );
    },
};

const DIM_LABELS = ["φ = 1.618", "377 u", "233 : 144", "a + b = c", "1 : φ", "144 u", "89 / 55"] as const;

const dimension: Def = {
    w: 280,
    h: 70,
    draw: (rng) => {
        const len = between(rng, 210, 262);
        const y = 38;
        return (
            <>
                <P d={sketchLine([6, y], [6 + len, y], rng, 0.6, 3)} />
                <P d={sketchLine([6, y - 17], [6, y + 17], rng, 0.4, 1)} />
                <P d={sketchLine([6 + len, y - 17], [6 + len, y + 17], rng, 0.4, 1)} />
                <P d={sketchLine([6, y], [18, y - 7], rng, 0.3, 0)} />
                <P d={sketchLine([6, y], [18, y + 7], rng, 0.3, 0)} />
                <P d={sketchLine([6 + len, y], [len - 6, y - 7], rng, 0.3, 0)} />
                <P d={sketchLine([6 + len, y], [len - 6, y + 7], rng, 0.3, 0)} />
                <P d={sketchLine([6 + len * 0.5, y - 5], [6 + len * 0.5, y + 5], rng, 0.2, 0)} fine />
                <text className="pg-label" x={f(6 + len / 2)} y={y - 12} textAnchor="middle">
                    {pick(rng, DIM_LABELS)}
                </text>
            </>
        );
    },
};

const ruler: Def = {
    w: 260,
    h: 46,
    draw: (rng) => {
        const ticks: string[] = [];
        for (let i = 0; i <= 24; i++) {
            const x = 6 + i * 10;
            const hgt = i % 5 === 0 ? 20 : i % 2 === 0 ? 12 : 8;
            ticks.push(sketchLine([x, 14], [x, 14 + hgt], rng, 0.3, 0));
        }
        return (
            <>
                <P d={sketchLine([4, 14], [250, 14], rng, 0.7, 3)} />
                {ticks.map((d, i) => (
                    <P key={i} d={d} fine={i % 5 !== 0} />
                ))}
                {[0, 5, 10, 15, 20].map((n) => (
                    <text key={n} className="pg-label" x={6 + n * 10} y="44" textAnchor="middle">
                        {n * 5}
                    </text>
                ))}
            </>
        );
    },
};

const registration: Def = {
    w: 74,
    h: 74,
    draw: (rng) => (
        <>
            <P d={sketchEllipse(37, 37, 15, 15, rng, 0, 0.12)} />
            <P d={sketchEllipse(37, 37, 9, 9, rng, 0, 0.1)} fine />
            <P d={sketchLine([4, 37], [70, 37], rng, 0.4, 2)} />
            <P d={sketchLine([37, 4], [37, 70], rng, 0.4, 2)} />
            <circle className="pg-dot" cx="37" cy="37" r="1.8" />
        </>
    ),
};

export const PIECES: Record<PieceKind, Def> = {
    golden,
    goldenRects,
    orbital,
    circles,
    spiral,
    curves,
    hatch,
    sunburst,
    arrow,
    zigzag,
    dotted,
    dimension,
    ruler,
    registration,
};

/* ──────────────────────────────────────────────────────────────────────────
   Layout: walks the page in BAND_H slices and places 2-3 pieces per slice.
   The sequence is prefix-stable (same salt → same first N bands), so growing
   content never reshuffles what is already drawn.
   ────────────────────────────────────────────────────────────────────────── */

export const BAND_H = 640;

const MAJORS: PieceKind[] = ["goldenRects", "orbital", "circles", "spiral", "curves", "hatch", "sunburst"];
const MINORS: PieceKind[] = ["arrow", "zigzag", "dotted", "dimension", "ruler", "registration", "hatch", "sunburst"];

export type Placed = {
    key: string;
    kind: PieceKind;
    side: "left" | "right";
    top: number;
    /** % from the chosen edge (negative bleeds off-canvas) */
    off: number;
    /** natural px width before the responsive scale */
    width: number;
    rotate: number;
    stroke: number;
    opacity: number;
    seed: number;
    /** natural px height (width × aspect), used to keep the last band inside the page */
    approxH: number;
};

function makeBag<T>(items: readonly T[], rng: Rng): T[] {
    const bag = [...items];
    for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    return bag;
}

export function buildLayout(salt: string, bands: number): Placed[] {
    const rng = seeded(hashString(`paper:${salt}`));
    const goldenPhase = Math.floor(rng() * 4);
    let majorBag: PieceKind[] = [];
    let minorBag: PieceKind[] = [];
    const nextMajor = () => (majorBag.length ? majorBag : (majorBag = makeBag(MAJORS, rng))).pop()!;
    const nextMinor = () => (minorBag.length ? minorBag : (minorBag = makeBag(MINORS, rng))).pop()!;
    const out: Placed[] = [];

    const place = (
        i: number,
        slot: string,
        kind: PieceKind,
        side: Placed["side"],
        top: number,
        [minW, maxW]: [number, number],
        strength: [number, number],
        off?: [number, number],
    ) => {
        const def = PIECES[kind];
        const width = between(rng, minW, maxW);
        const straight = kind === "dimension" || kind === "ruler";
        const rotate = straight ? pick(rng, [0, 0, 90, -90, 3, -3]) : kind === "registration" ? 0 : between(rng, -24, 24);
        const [o0, o1] = off ?? (side === "right" ? [-4, 5] : [-10, -1]);
        out.push({
            key: `${i}-${slot}`,
            kind,
            side,
            top: i * BAND_H + top,
            off: between(rng, o0, o1),
            width,
            rotate,
            stroke: between(rng, 1.45, 2.3),
            opacity: between(rng, strength[0], strength[1]),
            seed: Math.floor(rng() * 1e9),
            approxH: (width * def.h) / def.w,
        });
    };

    // Per 640px band: a big drawing and a small mark in the right margin,
    // plus one narrow mark bleeding in from the left edge (the left is where the text is).
    for (let i = 0; i < bands; i++) {
        const isGolden = (i + goldenPhase) % 4 === 0;
        place(i, "a", isGolden ? "golden" : nextMajor(), "right", between(rng, 10, 110), isGolden ? [360, 470] : [250, 380], [0.8, 0.95]);
        place(i, "b", nextMinor(), "right", between(rng, 360, 470), [150, 240], [0.7, 0.9], [6, 22]);
        place(i, "c", i % 2 ? nextMajor() : nextMinor(), "left", between(rng, 170, 400), [110, 200], [0.5, 0.66]);
    }
    return out;
}
