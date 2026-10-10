import {
    CurvedSketchArrow,
    GoldenRatioSpiral,
    GraphiteHatching,
    OrbitalArcs,
    PrinterRegistration,
    RepeatedOutlineBoxes,
    TopographicContours,
    WavyPencilConnector,
} from "../ui/EditorialMotifs";

type ProjectPreviewMotifKind =
    | "printer"
    | "orbital"
    | "wavy"
    | "boxes"
    | "hatching"
    | "spiral"
    | "arrow"
    | "contours";

type ProjectPreviewMotifProps = {
    kind: ProjectPreviewMotifKind;
};

export function ProjectPreviewMotif({ kind }: ProjectPreviewMotifProps) {
    return (
        <svg
            className={`project-preview-motif project-preview-motif--${kind}`}
            viewBox="0 0 320 200"
            preserveAspectRatio="none"
            focusable="false"
            aria-hidden="true"
        >
            {kind === "printer" && (
                <PrinterRegistration transform="translate(12 12) scale(.72)" />
            )}
            {kind === "orbital" && (
                <OrbitalArcs transform="translate(196 40) scale(.44)" />
            )}
            {kind === "wavy" && (
                <WavyPencilConnector transform="translate(66 152) scale(.86)" />
            )}
            {kind === "boxes" && (
                <RepeatedOutlineBoxes transform="translate(204 118) scale(.86)" />
            )}
            {kind === "hatching" && (
                <GraphiteHatching transform="translate(218 126) scale(.9)" />
            )}
            {kind === "spiral" && (
                <GoldenRatioSpiral transform="translate(162 44) scale(.55)" />
            )}
            {kind === "arrow" && (
                <CurvedSketchArrow transform="translate(48 118) scale(.92)" />
            )}
            {kind === "contours" && (
                <TopographicContours transform="translate(150 118) scale(.95)" />
            )}
        </svg>
    );
}
