import { skillsHero } from "../../data/skillsPage";
import { EditorialDetails } from "../ui/EditorialDetails";

export function SkillsHero() {
    return (
        <section className="editorial-section max-w-full border-b border-border-default">
            <EditorialDetails variant="skills" label="TOOLKIT / 05" />
            <div className="flex min-w-0 flex-col justify-start pad-hero xl:pad-hero-lg">
                <span className="font-body text-body text-accent italic xl:text-subheading">
                    {skillsHero.label}
                </span>

                <h1 className="font-heading text-hero-display leading-[0.9] tracking-tight">
                    {skillsHero.title}
                </h1>

                <h2 className="font-heading mt-2 text-subheading tracking-wide uppercase">
                    {skillsHero.subtitle}
                </h2>

                <div className="divider-strong mt-2 max-w-xs" />

                <p className="mt-2 w-full text-body leading-snug">
                    {skillsHero.description}
                </p>
            </div>
        </section>
    );
}
