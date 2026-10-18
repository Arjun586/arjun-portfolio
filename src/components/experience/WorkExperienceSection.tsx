import { Briefcase, MapPin, Calendar } from "lucide-react";
import type { WorkExperience } from "../../data/experience";
import { workExperience } from "../../data/experience";
import { EditorialDetails } from "../ui/EditorialDetails";

function ExperienceEntry({ entry }: { entry: WorkExperience }) {
    return (
        <article className="py-8 first:pt-0 last:pb-0">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="flex-1">
                    <h3 className="font-heading text-card-title leading-none tracking-wide">
                        {entry.role}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                        <Briefcase size={14} className="shrink-0 text-accent" />
                        <span className="font-heading text-subheading tracking-wide text-accent">
                            {entry.company}
                        </span>
                    </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-small text-text/70 sm:mt-0 sm:flex-col sm:items-end sm:gap-1">
                    <span className="flex items-center gap-1.5 font-heading text-caption font-medium tracking-wide">
                        <Calendar size={12} className="shrink-0" />
                        {entry.duration}
                    </span>
                    <span className="flex items-center gap-1.5 font-heading text-caption font-medium tracking-wide">
                        <MapPin size={12} className="shrink-0" />
                        {entry.location}
                    </span>
                </div>
            </div>

            <p className="font-body mt-4 max-w-2xl text-body leading-relaxed">
                {entry.description}
            </p>

            {entry.contributions.length > 0 && (
                <ul className="mt-4 max-w-2xl space-y-2">
                    {entry.contributions.map((item, index) => (
                        <li
                            key={index}
                            className="font-body flex items-start gap-3 text-small leading-relaxed"
                        >
                            <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

export function WorkExperienceSection() {
    return (
        <section className="editorial-section border-b border-border-default pad-section xl:pad-section-lg">
            <EditorialDetails variant="experience" label="01 / SELECTED ROLES" />
            <div className="flex items-baseline gap-4">
                <span className="font-heading text-caption tracking-widest text-accent">
                    01
                </span>
                <h2 className="font-heading text-section tracking-wide">
                    WORK EXPERIENCE
                </h2>
            </div>
            <div className="divider-strong mt-4" />

            <div className="mt-6 divide-y divide-border-subtle">
                {workExperience.map((entry) => (
                    <ExperienceEntry key={entry.id} entry={entry} />
                ))}
            </div>
        </section>
    );
}
