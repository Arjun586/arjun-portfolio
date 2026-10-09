import { csFoundations, skillGroups, type SkillGroup } from "../../data/skillsPage";
import { SkillIcon } from "../ui/SkillIcon";
import { SiLeetcode } from "react-icons/si";
import { EditorialDetails } from "../ui/EditorialDetails";

function SectionHeading({
    title,
    className,
}: {
    title: string;
    className: string;
}) {
    return (
        <div className="w-fit">
            <h2 className={className}>{title}</h2>
            <div className="divider-strong mt-3" />
        </div>
    );
}

function SkillGroupRow({ group }: { group: SkillGroup }) {
    const headingId = `skills-${group.id}`;

    return (
        <div className="grid min-w-0 gap-3 border-b border-border-default px-6 py-5 lg:grid-cols-[15rem_1fr] lg:gap-8 xl:px-8 xl:py-6">
            <h2 id={headingId} className="font-heading text-card-title tracking-wide">
                {group.title}
            </h2>
            <ul aria-labelledby={headingId} className="flex min-w-0 flex-wrap gap-2">
                {group.skills.map((skill) => (
                    <li key={skill.name} className="skill-pill">
                        <span aria-hidden="true" className="flex shrink-0">
                            <SkillIcon type={skill.icon} size={16} />
                        </span>
                        {skill.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CSFoundationsSection() {
    return (
        <div className="min-w-0 pad-section xl:pad-section-lg">
            <SectionHeading
                title="COMPUTER SCIENCE FOUNDATIONS"
                className="font-heading text-card-title tracking-wide text-accent xl:text-section"
            />
            <p className="mt-4 max-w-2xl text-body leading-relaxed">
                Core concepts that shape how I approach problem solving, system design, and
                software engineering decisions.
            </p>
            <ul className="mt-6 divide-y divide-border-subtle border-y border-border-subtle">
                {csFoundations.map((item, index) => (
                    <li key={item.label} className="flex items-center gap-6 py-5">
                        <span className="font-heading text-caption tabular-nums text-accent">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                            <span className="font-heading text-subheading tracking-wide">
                                {item.label}
                            </span>
                            {"link" in item && item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LeetCode profile"
                                    className="shrink-0 transition-opacity hover:opacity-70"
                                >
                                    <SiLeetcode size={18} className="text-text" />
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function SkillsGridSection() {
    return (
        <section className="editorial-section max-w-full border-b border-border-default">
            <EditorialDetails variant="skills-grid" />
            {skillGroups.map((group) => (
                <SkillGroupRow key={group.id} group={group} />
            ))}
            <CSFoundationsSection />
        </section>
    );
}
