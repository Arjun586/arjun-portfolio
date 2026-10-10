import { useMemo } from "react";
import { between, f, seeded, sketchLine, smoothPath, type Pt, type Rng } from "../../lib/pencil";

const SIDES = ["left", "top", "right", "bottom"] as const;
type Side = (typeof SIDES)[number];
type Square = { x: number; y: number; s: number; side: Side };

const W = 377;
const H = 233;

function buildSquares(steps: number): Square[] {
    let x = 0;
    let y = 0;
    let w = W;
    let h = H;
    const out: Square[] = [];
    for (let i = 0; i < steps; i++) {
        const side = SIDES[i % 4];
        if (side === "left") {
            out.push({ x, y, s: h, side });
            x += h;
            w -= h;
        } else if (side === "top") {
            out.push({ x, y, s: w, side });
            y += w;
            h -= w;
        } else if (side === "right") {
            out.push({ x: x + w - h, y, s: h, side });
            w -= h;
        } else {
            out.push({ x, y: y + h - w, s: w, side });
            h -= w;
        }
    }
    return out;
}

function corners({ x, y, s, side }: Square): { start: Pt; end: Pt; center: Pt } {
    const tl: Pt = [x, y];
    const tr: Pt = [x + s, y];
    const bl: Pt = [x, y + s];
    const br: Pt = [x + s, y + s];
    switch (side) {
        case "left":
            return { start: bl, end: tr, center: br };
        case "top":
            return { start: tl, end: br, center: bl };
        case "right":
            return { start: tr, end: bl, center: tl };
        default:
            return { start: br, end: tl, center: tr };
    }
}

function arcPoints(sq: Square, rng: Rng, jitter: number): Pt[] {
    const { start, end, center } = corners(sq);
    const a0 = Math.atan2(start[1] - center[1], start[0] - center[0]);
    let sweep = Math.atan2(end[1] - center[1], end[0] - center[0]) - a0;
    while (sweep > Math.PI) sweep -= Math.PI * 2;
    while (sweep < -Math.PI) sweep += Math.PI * 2;
    const steps = Math.max(5, Math.ceil((sq.s * Math.PI) / 2 / 20));
    const drift = (rng() - 0.5) * sq.s * jitter * 2;
    const pts: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const r = sq.s + drift * t + (rng() - 0.5) * sq.s * jitter;
        const a = a0 + sweep * t;
        pts.push([center[0] + Math.cos(a) * r, center[1] + Math.sin(a) * r]);
    }
    pts[0] = start;
    pts[pts.length - 1] = end;
    return pts;
}

type Props = {
    seed?: number;
    labels?: boolean;
    steps?: number;
    orient?: number;
    square?: boolean;
};

export function GoldenConstruction({ seed = 11, labels = true, steps = 9, orient = 0, square = false }: Props) {
    const geo = useMemo(() => {
        const rng = seeded(seed);
        const rot = ((orient % 4) * Math.PI) / 2;
        const mirror = orient >= 4;
        const c0: Pt = [W / 2, H / 2];
        const c1: Pt = square ? [W / 2, W / 2] : c0;
        const cos = Math.cos(rot);
        const sin = Math.sin(rot);
        const T = ([x, y]: Pt): Pt => {
            let dx = x - c0[0];
            const dy = y - c0[1];
            if (mirror) dx = -dx;
            return [c1[0] + dx * cos - dy * sin, c1[1] + dx * sin + dy * cos];
        };

        const squares = buildSquares(steps);

        const edges: string[] = [];
        for (const { x, y, s } of squares) {
            const [tl, tr, br, bl]: Pt[] = [
                [x, y],
                [x + s, y],
                [x + s, y + s],
                [x, y + s],
            ];
            const wob = Math.min(1.6, 0.4 + s / 140);
            edges.push(sketchLine(T(tl), T(tr), rng, wob, 5));
            edges.push(sketchLine(T(tr), T(br), rng, wob, 5));
            edges.push(sketchLine(T(br), T(bl), rng, wob, 5));
            edges.push(sketchLine(T(bl), T(tl), rng, wob, 5));
        }

        const guides = [
            sketchLine(T([0, 0]), T([W, H]), rng, 1.2, 6),
            sketchLine(T([H, H]), T([W, 0]), rng, 1.2, 6),
        ];

        const spiralPass = (jitter: number) => {
            const rg = seeded(Math.floor(rng() * 1e9));
            const pts: Pt[] = [];
            squares.forEach((sq, i) => {
                const arc = arcPoints(sq, rg, jitter).map(T);
                pts.push(...(i === 0 ? arc : arc.slice(1)));
            });
            return smoothPath(pts);
        };
        const spiral = spiralPass(0.006);
        const spiralFine = spiralPass(0.016);

        const texts = squares
            .filter((sq) => sq.s >= 21)
            .map((sq) => {
                const { center } = corners(sq);
                const mid: Pt = [sq.x + sq.s / 2, sq.y + sq.s / 2];
                const at = T([center[0] + (mid[0] - center[0]) * 0.46, center[1] + (mid[1] - center[1]) * 0.46]);
                return { at, size: Math.max(8, Math.min(24, sq.s * 0.15)), label: String(sq.s), tilt: between(rng, -3, 3) };
            });

        return { edges, guides, spiral, spiralFine, texts };
    }, [seed, steps, orient, square]);

    return (
        <>
            {geo.edges.map((d, i) => (
                <path key={`e${i}`} className="gc-square" d={d} />
            ))}
            {geo.guides.map((d, i) => (
                <path key={`g${i}`} className="gc-guide" d={d} />
            ))}
            <path className="gc-spiral-fine" d={geo.spiralFine} />
            <path className="gc-spiral" d={geo.spiral} />
            {labels &&
                geo.texts.map((t) => (
                    <text
                        key={t.label}
                        className="gc-label"
                        x={f(t.at[0])}
                        y={f(t.at[1])}
                        fontSize={t.size}
                        transform={`rotate(${f(t.tilt)} ${f(t.at[0])} ${f(t.at[1])})`}
                    >
                        {t.label}
                    </text>
                ))}
        </>
    );
}
