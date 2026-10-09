/**
 * Tiny deterministic helpers for hand-drawn (pencil-like) SVG geometry.
 * Everything is seeded, so a given seed always draws the same wobble.
 */
export type Rng = () => number;
export type Pt = [number, number];

/** mulberry32 – small, fast, good enough for jitter. */
export function seeded(seed: number): Rng {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function hashString(input: string): number {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

export const pick = <T,>(rng: Rng, list: readonly T[]): T => list[Math.floor(rng() * list.length)];
export const between = (rng: Rng, min: number, max: number) => min + rng() * (max - min);
export const f = (n: number) => Math.round(n * 10) / 10;

/** A slightly bowed pencil stroke that overshoots both ends like a real hand. */
export function sketchLine(a: Pt, b: Pt, rng: Rng, wobble = 1.3, overshoot = 4): string {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;
    const o1 = rng() * overshoot;
    const o2 = rng() * overshoot;
    const sx = a[0] - ux * o1;
    const sy = a[1] - uy * o1;
    const ex = b[0] + ux * o2;
    const ey = b[1] + uy * o2;
    const j = () => (rng() - 0.5) * 2 * wobble;
    const c1x = sx + (ex - sx) * 0.32 + nx * j();
    const c1y = sy + (ey - sy) * 0.32 + ny * j();
    const c2x = sx + (ex - sx) * 0.68 + nx * j();
    const c2y = sy + (ey - sy) * 0.68 + ny * j();
    return `M${f(sx)} ${f(sy)}C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)}`;
}

/** Catmull-Rom through points → cubic Béziers (smooth freehand curve). */
export function smoothPath(pts: Pt[], closed = false): string {
    if (pts.length < 2) return "";
    const n = pts.length;
    const at = (i: number): Pt => {
        if (closed) return pts[(i + n) % n];
        return pts[Math.max(0, Math.min(n - 1, i))];
    };
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    const last = closed ? n : n - 1;
    for (let i = 0; i < last; i++) {
        const p0 = at(i - 1);
        const p1 = at(i);
        const p2 = at(i + 1);
        const p3 = at(i + 2);
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return closed ? `${d}Z` : d;
}

/** An arc (radians) with a little radial drift, so it never looks compass-perfect. */
export function sketchArc(
    cx: number,
    cy: number,
    r: number,
    a0: number,
    a1: number,
    rng: Rng,
    jitter = 0.012,
): string {
    const sweep = a1 - a0;
    const steps = Math.max(4, Math.ceil((Math.abs(sweep) * r) / 26));
    const pts: Pt[] = [];
    const drift = (rng() - 0.5) * r * jitter * 2;
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const a = a0 + sweep * t;
        const rr = r + drift * t + (rng() - 0.5) * r * jitter;
        pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    return smoothPath(pts);
}

/** A wobbly, slightly unclosed ellipse – drawn by hand, in one go. */
export function sketchEllipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    rng: Rng,
    tilt = 0,
    overlap = 0.14,
): string {
    const start = rng() * Math.PI * 2;
    const total = Math.PI * 2 * (1 + overlap);
    const steps = Math.max(10, Math.ceil(((rx + ry) * Math.PI) / 22));
    const pts: Pt[] = [];
    const cos = Math.cos(tilt);
    const sin = Math.sin(tilt);
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const a = start + total * t;
        const grow = 1 + (t - 0.5) * 0.035 + (rng() - 0.5) * 0.018;
        const x = Math.cos(a) * rx * grow;
        const y = Math.sin(a) * ry * grow;
        pts.push([cx + x * cos - y * sin, cy + x * sin + y * cos]);
    }
    return smoothPath(pts);
}

export function spiralPoints(
    cx: number,
    cy: number,
    r0: number,
    r1: number,
    turns: number,
    rng: Rng,
    startAngle = 0,
    jitter = 0.03,
): Pt[] {
    const steps = Math.ceil(turns * 18);
    const pts: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const a = startAngle + t * turns * Math.PI * 2;
        const r = (r0 + (r1 - r0) * t) * (1 + (rng() - 0.5) * jitter * 2);
        pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts;
}

/** Clip an infinite line x*dx + y*dy = c to an axis-aligned box. Returns null when it misses. */
export function clipLineToBox(
    box: { x: number; y: number; w: number; h: number },
    nx: number,
    ny: number,
    c: number,
): [Pt, Pt] | null {
    const hits: Pt[] = [];
    const { x, y, w, h } = box;
    const tryX = (px: number) => {
        if (Math.abs(ny) < 1e-9) return;
        const py = (c - nx * px) / ny;
        if (py >= y - 1e-6 && py <= y + h + 1e-6) hits.push([px, py]);
    };
    const tryY = (py: number) => {
        if (Math.abs(nx) < 1e-9) return;
        const px = (c - ny * py) / nx;
        if (px >= x - 1e-6 && px <= x + w + 1e-6) hits.push([px, py]);
    };
    tryX(x);
    tryX(x + w);
    tryY(y);
    tryY(y + h);
    if (hits.length < 2) return null;
    let best: [Pt, Pt] = [hits[0], hits[1]];
    let max = 0;
    for (let i = 0; i < hits.length; i++) {
        for (let j = i + 1; j < hits.length; j++) {
            const d = Math.hypot(hits[i][0] - hits[j][0], hits[i][1] - hits[j][1]);
            if (d > max) {
                max = d;
                best = [hits[i], hits[j]];
            }
        }
    }
    return max > 0.5 ? best : null;
}
