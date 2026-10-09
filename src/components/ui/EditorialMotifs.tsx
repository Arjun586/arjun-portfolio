import { GoldenConstruction } from "./GoldenConstruction";

type MotifProps = {
    className?: string;
    transform?: string;
};

function motifClass(name: string, className?: string) {
    return `editorial-motif editorial-motif--${name}${className ? ` ${className}` : ""}`;
}

/** Loose, overlapping graphite loops used once or twice as a margin gesture. */
export function GesturalScribble({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("scribble", className)} transform={transform}>
            <path d="M 3 44 C 18 4 45 3 58 31 C 69 56 43 69 27 51 C 11 34 32 13 65 20 C 96 27 94 57 69 61" />
            <path d="M 0 52 C 24 36 31 1 58 8 C 86 15 52 45 73 62 C 89 75 115 50 104 26 C 94 5 73 25 89 43" />
            <path d="M 15 70 C 37 52 59 73 81 55 C 97 42 109 28 124 37" />
            <path className="editorial-motif__fine" d="M 7 61 C 31 71 48 35 74 42 C 96 48 100 71 126 61" />
        </g>
    );
}

/** A deliberately imperfect two-pass circle, not a geometric ellipse. */
export function RoughPencilCircle({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("rough-circle", className)} transform={transform}>
            <path d="M 101 19 C 145 29 167 65 159 104 C 150 142 110 158 68 151 C 25 143 4 110 15 70 C 25 32 56 11 101 19" />
            <path className="editorial-motif__fine" d="M 95 13 C 137 20 166 58 163 96 C 160 135 120 161 74 157 C 32 153 9 120 12 78 C 15 37 52 10 95 13" />
            <path className="editorial-motif__fine" d="M 142 130 C 151 133 158 137 164 144" />
        </g>
    );
}

/** Two independently drawn pencil strokes for selective heading emphasis. */
export function DoublePencilUnderline({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("double-underline", className)} transform={transform}>
            <path d="M 0 12 C 52 6 109 14 173 9 C 196 7 218 10 239 6" />
            <path className="editorial-motif__fine" d="M 8 21 C 60 16 122 23 180 17 C 202 15 219 18 231 15" />
        </g>
    );
}

/** Smooth, offset orbital arcs reserved for image and portrait compositions. */
export function OrbitalArcs({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("orbital", className)} transform={transform}>
            <path d="M 1 112 C 23 33 119 -8 190 28 C 240 53 255 111 222 151" />
            <path className="editorial-motif__fine" d="M 27 156 C 0 93 49 20 119 17 C 186 14 233 61 237 119" />
            <path className="editorial-motif__fine" d="M 62 177 C 111 194 175 177 209 142" />
            <circle className="editorial-motif__dot" cx="222" cy="151" r="2.4" />
        </g>
    );
}

/** Geometric crop corners plus a registration cross: intentionally unlike pencil work. */
export function PrinterRegistration({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("printer", className)} transform={transform}>
            <path d="M 0 20 V 0 H 20 M 76 20 V 0 H 56 M 0 56 V 76 H 20 M 76 56 V 76 H 56" />
            <path d="M 29 38 H 47 M 38 29 V 47" />
            <circle className="editorial-motif__dot" cx="38" cy="38" r="1.35" />
        </g>
    );
}

/** Angular technical callout with a dot and hand-drawn arrowhead. */
export function AnnotationLeader({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("leader", className)} transform={transform}>
            <path d="M 0 12 H 62 V 45 H 126" />
            <path d="M 126 45 l -9 -5 M 126 45 l -9 6" />
            <circle className="editorial-motif__dot" cx="0" cy="12" r="2" />
        </g>
    );
}

/** A compact cluster of uneven graphite shading strokes. */
export function GraphiteHatching({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("hatching", className)} transform={transform}>
            <path d="M 0 42 L 42 0 M 10 50 L 53 6 M 24 53 L 61 16 M 39 51 L 68 23 M 51 47 L 74 28" />
            <path className="editorial-motif__fine" d="M 0 13 L 46 54 M 9 3 L 58 48 M 28 1 L 72 39" />
        </g>
    );
}

/** One loose pencil connector, intentionally less regular than orbital arcs. */
export function WavyPencilConnector({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("wavy-connector", className)} transform={transform}>
            <path d="M 0 31 C 29 4 48 54 76 30 C 99 10 118 42 146 23 C 165 10 183 18 203 4" />
            <path className="editorial-motif__fine" d="M 3 39 C 32 13 50 61 79 37 C 105 17 123 49 149 30" />
        </g>
    );
}

/** Small drafting ticks and index strokes for empty page margins. */
export function MarginalTicks({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("ticks", className)} transform={transform}>
            <path d="M 0 0 V 42 M -8 8 H 8 M -5 21 H 5 M -8 34 H 8 M 24 10 H 43 M 31 3 V 17" />
            <path className="editorial-motif__fine" d="M 24 30 H 39 M 24 39 H 34" />
        </g>
    );
}

/** A visibly winding, loose pencil spiral. */
export function LooseSpiral({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("loose-spiral", className)} transform={transform}>
            <path d="M 88 50 A 38 38 0 1 1 50 12 A 28 28 0 1 0 78 50 A 19 19 0 1 1 59 31 A 11 11 0 1 0 70 50" />
            <path className="editorial-motif__fine" d="M 92 53 A 42 42 0 1 1 50 9 A 31 31 0 1 0 81 50" />
        </g>
    );
}

/** Angular, uneven pencil turns that cannot be mistaken for an orbital curve. */
export function IrregularZigzag({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("zigzag", className)} transform={transform}>
            <path d="M 0 46 L 21 18 L 39 42 L 64 8 L 82 35 L 108 16 L 127 48" />
            <path className="editorial-motif__fine" d="M 5 54 L 26 30 L 44 51 L 67 20 L 86 44 L 112 27" />
        </g>
    );
}

/** A compact continuous-line doodle for quiet empty margins. */
export function ContinuousLineDoodle({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("continuous-doodle", className)} transform={transform}>
            <path d="M 2 44 C 16 15 44 7 62 27 C 74 40 67 58 51 59 C 32 61 26 41 39 32 C 54 22 79 31 80 51 C 81 68 62 78 48 70 C 34 62 15 75 4 61" />
        </g>
    );
}

/** Short uneven rays around a tiny core, like a quick pencil sunburst. */
export function HandDrawnSunburst({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("sunburst", className)} transform={transform}>
            <circle className="editorial-motif__fine" cx="38" cy="38" r="7" />
            <path d="M 38 2 L 40 22 M 60 9 L 51 26 M 74 29 L 54 34 M 70 56 L 52 48 M 48 73 L 43 53 M 22 71 L 28 52 M 4 51 L 24 45 M 7 23 L 26 30 M 20 7 L 31 25" />
        </g>
    );
}

/** A rough asterisk/sparkle for tiny incidental accents. */
export function AsteriskSparkle({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("sparkle", className)} transform={transform}>
            <path d="M 20 0 L 22 15 L 38 11 L 27 22 L 37 34 L 22 29 L 14 42 L 15 27 L 0 30 L 11 20 L 3 8 L 17 14 Z" />
        </g>
    );
}

/** Curved hand-drawn arrow with a deliberately imperfect two-stroke head. */
export function CurvedSketchArrow({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("sketch-arrow", className)} transform={transform}>
            <path d="M 0 60 C 35 20 82 12 119 36 C 136 47 146 42 157 26" />
            <path d="M 157 26 l -7 17 M 157 26 l -16 4" />
            <path className="editorial-motif__fine" d="M 5 64 C 41 28 81 20 115 40" />
        </g>
    );
}

/** A rough bracket that frames a small editorial note without becoming a card border. */
export function HandDrawnBracket({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("bracket", className)} transform={transform}>
            <path d="M 18 0 C 2 3 4 21 16 24 C 5 29 4 48 18 54 M 52 0 C 68 5 66 20 54 25 C 66 30 67 48 52 54" />
            <path className="editorial-motif__fine" d="M 22 3 C 11 9 12 18 22 23 M 48 3 C 59 9 58 18 48 23" />
        </g>
    );
}

/** Two imperfect loops crossing each other, for a distinct hand-sketched emphasis. */
export function OverlappingOvalLoops({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("oval-loops", className)} transform={transform}>
            <path d="M 8 48 C 8 14 49 0 83 13 C 111 24 109 62 80 76 C 45 91 8 78 8 48" />
            <path className="editorial-motif__fine" d="M 31 17 C 59 0 101 15 105 45 C 109 77 73 91 39 78 C 9 65 8 32 31 17" />
        </g>
    );
}

/** Uneven parallel contour strokes—topographic rather than orbital. */
export function TopographicContours({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("contours", className)} transform={transform}>
            <path d="M 0 22 C 26 2 55 8 70 22 C 88 39 112 30 132 12" />
            <path d="M 0 38 C 26 19 52 24 68 39 C 86 55 110 46 132 29" />
            <path className="editorial-motif__fine" d="M 7 54 C 30 37 52 42 68 56 C 87 72 111 62 127 48" />
            <path className="editorial-motif__fine" d="M 15 68 C 35 54 52 59 67 71 C 85 85 105 79 120 65" />
        </g>
    );
}

/** Small spaced dots for restrained connector trails. */
export function DottedTrail({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("dotted-trail", className)} transform={transform}>
            <path d="M 0 33 C 34 8 71 57 111 28 C 128 16 143 20 160 10" />
        </g>
    );
}

/** Two slightly offset drafting boxes—not a perfect UI rectangle. */
export function RepeatedOutlineBoxes({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("outline-boxes", className)} transform={transform}>
            <path d="M 4 8 L 92 3 L 96 58 L 7 63 Z" />
            <path className="editorial-motif__fine" d="M 10 2 L 99 8 L 90 67 L 2 57 Z" />
        </g>
    );
}

/** Precise architectural dimension line with extension ticks. */
export function DraftingDimensionLine({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("dimension", className)} transform={transform}>
            <path d="M 0 16 H 144 M 0 6 V 27 M 144 6 V 27 M 6 11 L 0 16 L 6 21 M 138 11 L 144 16 L 138 21" />
            <path className="editorial-motif__fine" d="M 30 8 V 24 M 72 8 V 24 M 114 8 V 24" />
        </g>
    );
}

/** A slightly asymmetric small star, more pencilled than icon-like. */
export function ImperfectStar({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("imperfect-star", className)} transform={transform}>
            <path d="M 25 0 L 31 18 L 51 16 L 36 29 L 43 49 L 25 38 L 8 51 L 13 30 L 0 17 L 20 18 Z" />
            <path className="editorial-motif__fine" d="M 24 4 L 28 20 L 46 18 M 39 45 L 24 34 L 12 46" />
        </g>
    );
}

/** A tiny freehand flourish for a signature-like final gesture. */
export function SketchFlourish({ className, transform }: MotifProps) {
    return (
        <g className={motifClass("flourish", className)} transform={transform}>
            <path d="M 0 29 C 19 1 47 8 47 27 C 47 47 21 45 30 24 C 39 4 65 8 78 22 C 90 35 108 28 121 13" />
            <path className="editorial-motif__fine" d="M 9 37 C 37 46 72 45 108 31" />
        </g>
    );
}

/** Pencil golden-ratio construction: Fibonacci squares, eye diagonals and a continuous quarter-circle spiral. */
export function GoldenRatioSpiral({ className, transform, seed }: MotifProps & { seed?: number }) {
    return (
        <g className={motifClass("golden-spiral", className)} transform={transform}>
            <GoldenConstruction seed={seed} />
        </g>
    );
}
