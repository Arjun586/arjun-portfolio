import {
    GesturalScribble,
    GoldenRatioSpiral,
    HandDrawnSunburst,
    LooseSpiral,
    OrbitalArcs,
    PrinterRegistration,
    RoughPencilCircle,
} from "./EditorialMotifs";

/**
 * A deliberately small set of print-inspired marks used only in page heroes.
 * The SVG is decorative: it stays out of the accessibility tree and never
 * receives pointer input.
 */
type HeroEditorialDetailsProps = {
    detailsLabel?: string;
};

export function HeroEditorialDetails({
    detailsLabel = "01 / FIELD NOTES",
}: HeroEditorialDetailsProps) {
    return (
        <div className="hero-editorial-details" aria-hidden="true">
            <svg
                viewBox="0 0 1200 620"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
            >
                <OrbitalArcs transform="translate(372 118) scale(1.5 1.32)" />
                <OrbitalArcs className="editorial-motif--quiet" transform="translate(526 58) scale(.74 .64)" />
                <GesturalScribble transform="translate(954 320) scale(.86)" />
                <RoughPencilCircle transform="translate(1010 150) scale(.38)" />
                <GoldenRatioSpiral transform="translate(636 208) scale(.98)" />
                <LooseSpiral transform="translate(366 460) scale(.6)" />
                <HandDrawnSunburst transform="translate(1062 100) scale(.48)" />
                <PrinterRegistration transform="translate(480 76) scale(.7)" />
                <PrinterRegistration transform="translate(732 474) scale(.62)" />
                <PrinterRegistration transform="translate(1060 438) scale(.48)" />
            </svg>
            <span className="hero-editorial-details__watermark">ARJUN</span>
            <span className="hero-editorial-details__index">{detailsLabel}</span>
        </div>
    );
}
