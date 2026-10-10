import {
    AnnotationLeader,
    AsteriskSparkle,
    ContinuousLineDoodle,
    CurvedSketchArrow,
    DraftingDimensionLine,
    DottedTrail,
    DoublePencilUnderline,
    GesturalScribble,
    GoldenRatioSpiral,
    GraphiteHatching,
    HandDrawnBracket,
    HandDrawnSunburst,
    ImperfectStar,
    IrregularZigzag,
    LooseSpiral,
    MarginalTicks,
    OrbitalArcs,
    OverlappingOvalLoops,
    PrinterRegistration,
    RepeatedOutlineBoxes,
    RoughPencilCircle,
    SketchFlourish,
    TopographicContours,
    WavyPencilConnector,
} from "./EditorialMotifs";

export type EditorialDetailsVariant =
    | "about"
    | "experience"
    | "projects"
    | "skills"
    | "skills-grid"
    | "contact"
    | "case-study"
    | "snapshot";

type EditorialDetailsProps = {
    variant: EditorialDetailsVariant;
    label?: string;
};

function AboutDetails() {
    return (
        <>
            <DoublePencilUnderline transform="translate(62 152)" />
            <MarginalTicks transform="translate(1114 78)" />
            <GesturalScribble className="editorial-motif--small" transform="translate(1014 348) scale(.52)" />
            <OverlappingOvalLoops transform="translate(840 104) scale(.6)" />
            <HandDrawnBracket transform="translate(1020 170) scale(.9)" />
            <LooseSpiral transform="translate(82 316) scale(.52)" />
            <DottedTrail transform="translate(882 300) scale(.72)" />
            <ContinuousLineDoodle transform="translate(626 378) scale(.62)" />
        </>
    );
}

function ExperienceDetails() {
    return (
        <>
            <PrinterRegistration transform="translate(1050 58) scale(.72)" />
            <DoublePencilUnderline transform="translate(58 176) scale(.74 .8)" />
            <MarginalTicks transform="translate(92 440)" />
            <DraftingDimensionLine transform="translate(862 178) scale(.86)" />
            <CurvedSketchArrow transform="translate(894 282) scale(.72)" />
            <RoughPencilCircle transform="translate(1004 364) scale(.42)" />
            <DottedTrail transform="translate(94 358) scale(.62)" />
        </>
    );
}

function ProjectsDetails() {
    return (
        <>
            <PrinterRegistration transform="translate(1070 54) scale(.75)" />
            <OrbitalArcs transform="translate(852 218) scale(.68)" />
            <WavyPencilConnector transform="translate(78 310) scale(.7)" />
            <RepeatedOutlineBoxes transform="translate(90 112) scale(.78)" />
            <IrregularZigzag transform="translate(862 110) scale(.74)" />
            <HandDrawnSunburst transform="translate(1090 318) scale(.58)" />
            <DottedTrail transform="translate(516 266) scale(.8)" />
        </>
    );
}

function SkillsDetails() {
    return (
        <>
            <RoughPencilCircle transform="translate(80 26) scale(1.2 .75)" />
            <DoublePencilUnderline transform="translate(72 226) scale(.72)" />
            <MarginalTicks transform="translate(1064 78) scale(.8)" />
            <OverlappingOvalLoops transform="translate(852 106) scale(.45)" />
            <ImperfectStar transform="translate(1018 260) scale(.5)" />
        </>
    );
}

function SkillsGridDetails() {
    return (
        <>
            <OverlappingOvalLoops transform="translate(866 108) scale(.46)" />
            <DoublePencilUnderline transform="translate(76 156) scale(.64)" />
            <MarginalTicks transform="translate(1102 354) scale(.78)" />
        </>
    );
}

function ContactDetails() {
    return (
        <>
            <GesturalScribble transform="translate(970 402) scale(.75)" />
            <GraphiteHatching transform="translate(888 432) scale(.7)" />
            <PrinterRegistration transform="translate(1082 64) scale(.62)" />
            <SketchFlourish transform="translate(862 304) scale(.78)" />
            <HandDrawnSunburst transform="translate(1032 274) scale(.5)" />
            <HandDrawnBracket transform="translate(856 104) scale(.82)" />
            <AsteriskSparkle transform="translate(1124 376) scale(.46)" />
        </>
    );
}

function CaseStudyDetails() {
    return (
        <>
            <AnnotationLeader transform="translate(874 70)" />
            <AnnotationLeader transform="translate(986 164) scale(.78)" />
            <PrinterRegistration transform="translate(82 410) scale(.65)" />
            <RoughPencilCircle transform="translate(1052 220) scale(.35)" />
            <DraftingDimensionLine transform="translate(826 252) scale(.72)" />
            <GoldenRatioSpiral transform="translate(808 300) scale(.68)" />
            <TopographicContours transform="translate(76 256) scale(.72)" />
            <DottedTrail transform="translate(786 122) scale(.68)" />
            <GraphiteHatching transform="translate(1028 414) scale(.55)" />
        </>
    );
}

function SnapshotDetails() {
    return (
        <>
            <DraftingDimensionLine transform="translate(94 102) scale(.78)" />
            <AsteriskSparkle transform="translate(798 148) scale(.52)" />
            <TopographicContours transform="translate(1014 226) scale(.74)" />
        </>
    );
}

function BottomDetails({ variant }: Pick<EditorialDetailsProps, "variant">) {
    switch (variant) {
        case "about":
            return (
                <>
                    <SketchFlourish transform="translate(858 420) scale(.86)" />
                    <AsteriskSparkle transform="translate(1082 390) scale(.52)" />
                </>
            );
        case "experience":
            return (
                <>
                    <TopographicContours transform="translate(832 382) scale(.8)" />
                    <GraphiteHatching transform="translate(990 430) scale(.7)" />
                    <PrinterRegistration transform="translate(104 408) scale(.58)" />
                </>
            );
        case "projects":
            return (
                <>
                    <GoldenRatioSpiral transform="translate(836 290) scale(.48)" />
                    <AnnotationLeader transform="translate(716 176) scale(.76)" />
                    <RepeatedOutlineBoxes transform="translate(86 398) scale(.7)" />
                    <AsteriskSparkle transform="translate(1122 432) scale(.45)" />
                </>
            );
        case "skills":
            return (
                <>
                    <DottedTrail transform="translate(812 414) scale(.74)" />
                    <HandDrawnBracket transform="translate(1060 396) scale(.76)" />
                </>
            );
        case "skills-grid":
            return (
                <>
                    <DottedTrail transform="translate(812 414) scale(.74)" />
                    <HandDrawnBracket transform="translate(1060 396) scale(.76)" />
                </>
            );
        case "contact":
        case "case-study":
            return null;
        case "snapshot":
            return <MarginalTicks transform="translate(1048 420) scale(.86)" />;
    }
}

function DetailsForVariant({ variant }: Pick<EditorialDetailsProps, "variant">) {
    switch (variant) {
        case "about":
            return <AboutDetails />;
        case "experience":
            return <ExperienceDetails />;
        case "projects":
            return <ProjectsDetails />;
        case "skills":
            return <SkillsDetails />;
        case "skills-grid":
            return <SkillsGridDetails />;
        case "contact":
            return <ContactDetails />;
        case "case-study":
            return <CaseStudyDetails />;
        case "snapshot":
            return <SnapshotDetails />;
    }
}

export function EditorialDetails({ variant, label }: EditorialDetailsProps) {
    return (
        <div className={`editorial-details editorial-details--${variant}`} aria-hidden="true">
            <svg className="editorial-details__canvas" viewBox="0 0 1200 560" preserveAspectRatio="none" focusable="false">
                <DetailsForVariant variant={variant} />
            </svg>
            <svg className="editorial-details__canvas editorial-details__canvas--bottom" viewBox="0 0 1200 560" preserveAspectRatio="none" focusable="false">
                <BottomDetails variant={variant} />
            </svg>
            {label && <span className="editorial-details__label">{label}</span>}
        </div>
    );
}
