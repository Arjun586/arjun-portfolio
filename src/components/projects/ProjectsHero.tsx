import { projectsHero } from "../../data/projects";

export function ProjectsHero() {
    return (
        <section className="relative border-b border-border-default">
            <div className="flex flex-col justify-start pad-hero xl:pad-hero-lg">
                <span className="font-body text-small text-accent italic sm:text-body xl:text-subheading">
                    {projectsHero.label}
                </span>
                <h1 className="font-heading text-hero-display leading-[0.9] tracking-tight">
                    {projectsHero.title}
                </h1>
                <div className="divider-strong mt-2 max-w-xs" />
                <p className="font-body mt-2 w-full text-body leading-relaxed">
                    {projectsHero.subtitle}
                </p>
                <p className="mt-3 font-heading text-caption font-medium tracking-wider text-accent xl:text-small">
                    {projectsHero.metadata}
                </p>
            </div>
        </section>
    );
}
