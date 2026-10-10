import { currentlyExploring, growthTimeline, highlights } from "../../data/experience";
import {
    AsteriskSparkle,
    CurvedSketchArrow,
    DraftingDimensionLine,
    MarginalTicks,
    TopographicContours,
} from "../ui/EditorialMotifs";

function ExperienceLowerMotifs() {
    return (
        <svg
            className="experience-lower-motifs"
            viewBox="0 0 1200 560"
            preserveAspectRatio="none"
            focusable="false"
            aria-hidden="true"
        >
            <TopographicContours transform="translate(72 230) scale(.85)" />
            <DraftingDimensionLine transform="translate(510 94) scale(.8)" />
            <CurvedSketchArrow transform="translate(936 194) scale(.72)" />
            <MarginalTicks transform="translate(1120 366)" />
            <AsteriskSparkle transform="translate(786 404) scale(.52)" />
        </svg>
    );
}

export function ExperienceMiddleSection() {
    return (
        <section className="experience-middle-section grid min-w-0 grid-cols-1 border-b border-border-default lg:grid-cols-3 lg:items-stretch lg:divide-x lg:divide-border-default">
            <ExperienceLowerMotifs />
            <div className="min-w-0 pad-section xl:pad-section-lg">
                <h2 className="font-heading text-section tracking-wide">GROWTH TIMELINE</h2>
                <div className="relative mt-6 space-y-6 pl-6">
                    <div className="absolute top-2 bottom-2 left-0 w-px bg-border-strong" />
                    {growthTimeline.map((item) => (
                        <div key={item.period} className="relative">
                            <div className="absolute top-[5px] left-[-1.85rem] h-3 w-3 rounded-full border-2 border-border-strong bg-border-strong" />

                            <p className="font-heading text-caption tracking-wide text-accent">
                                {item.period}
                            </p>
                            <h3 className="font-heading mt-1 text-subheading tracking-wide">
                                {item.title}
                            </h3>
                            <ul className="mt-2 space-y-1">
                                {item.bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-2 text-small leading-relaxed">
                                        <span className="mt-[0.35rem] h-1 w-1 shrink-0 bg-text/50" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 text-small leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex min-w-0 flex-col border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                <h2 className="font-heading text-section tracking-wide">CURRENTLY EXPLORING</h2>
                <div className="mt-5 flex flex-1 flex-col gap-3 sm:mt-6 sm:gap-4">
                    {currentlyExploring.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col justify-center border border-border-subtle bg-background/35 px-4 py-3.5 sm:flex-1 sm:py-5 xl:px-5 xl:py-6"
                        >
                            <h3 className="font-heading text-subheading tracking-wide">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-small leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="min-w-0 border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                <h2 className="font-heading text-section tracking-wide">HIGHLIGHTS</h2>
                <div className="mt-6 divide-y divide-border-subtle">
                    {highlights.map((item) => (
                        <div key={item.number} className="flex min-w-0 items-start gap-4 py-4 first:pt-0 last:pb-0">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-accent bg-secondary/50 font-heading text-small text-accent">
                                {item.number}
                            </span>
                            <p className="min-w-0 text-body leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
