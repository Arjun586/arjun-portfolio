import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
    allProjects,
    filterProjects,
    projectFilters,
    type Project,
    type ProjectFilterId,
} from "../../data/projects";
import { ProjectThumbnail } from "./ProjectThumbnail";

const MAX_TECH_TAGS = 5;

function TechTags({ technologies }: { technologies: string[] }) {
    const visible = technologies.slice(0, MAX_TECH_TAGS);
    const remaining = technologies.length - visible.length;

    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {visible.map((tech) => (
                <span
                    key={tech}
                    className="border border-border-default bg-transparent px-2 py-1 font-heading text-caption tracking-widest uppercase"
                >
                    {tech}
                </span>
            ))}
            {remaining > 0 && (
                <span className="px-1 font-heading text-caption tracking-widest text-text/50">
                    +{remaining}
                </span>
            )}
        </div>
    );
}

function ProjectActions({ project }: { project: Project }) {
    if (!project.githubUrl && !project.liveUrl && !project.caseStudy) {
        return null;
    }

    return (
        <div className="mt-4 flex flex-wrap gap-4 border-t border-border-subtle pt-4">
            {project.githubUrl && (
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow inline-flex items-center gap-2"
                >
                    <FaGithub size={14} />
                    GITHUB
                </a>
            )}
            {project.liveUrl && (
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow inline-flex items-center gap-2"
                >
                    <ExternalLink size={14} />
                    LIVE DEMO
                </a>
            )}
            {project.caseStudy && (
                <Link to={`/projects/${project.id}`} className="link-arrow inline-flex items-center gap-2">
                    CASE STUDY <span aria-hidden>→</span>
                </Link>
            )}
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <article
            className={[
                "flex min-w-0 flex-col",
                project.featured ? "border-l-2 border-accent pl-4 xl:pl-5" : "",
            ].join(" ")}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-border-subtle">
                <span className="absolute top-0 left-0 z-10 border border-border-strong bg-secondary px-2 py-1 font-heading text-caption leading-none">
                    {project.number}
                </span>
                {project.featured && (
                    <span className="absolute top-0 right-0 z-10 border border-accent bg-background/90 px-2 py-1 font-heading text-caption tracking-widest text-accent">
                        FEATURED
                    </span>
                )}
                {project.caseStudy ? (
                    <Link
                        to={`/projects/${project.id}`}
                        aria-label={`View ${project.title} case study`}
                        className="block h-full w-full transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                    >
                        <ProjectThumbnail
                            src={project.thumbnail}
                            alt={`${project.title} preview`}
                            className="h-full w-full"
                        />
                    </Link>
                ) : (
                    <ProjectThumbnail
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        className="h-full w-full"
                    />
                )}
            </div>

            <div className="flex flex-1 flex-col pt-4">
                <h3 className="font-heading text-subheading leading-none tracking-wide xl:text-card-title">
                    {project.caseStudy ? (
                        <Link
                            to={`/projects/${project.id}`}
                            className="transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                            {project.title}
                        </Link>
                    ) : (
                        project.title
                    )}
                </h3>
                <span className="mt-2 inline-block w-fit border border-border-default px-2 py-1 font-heading text-caption tracking-wide text-accent">
                    {project.category}
                </span>
                <p className="mt-3 text-small leading-relaxed">{project.description}</p>
                <TechTags technologies={project.technologies} />
                <ProjectActions project={project} />
            </div>
        </article>
    );
}

export function ProjectsContent() {
    const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all");
    const filtered = filterProjects(allProjects, activeFilter);

    return (
        <section className="max-w-full border-b border-border-default">
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-4 border-b border-border-default px-6 py-4 xl:px-8">
                <div className="flex min-w-0 flex-wrap items-center">
                    {projectFilters.map((f, i) => (
                        <button
                            key={f.id}
                            onClick={() => setActiveFilter(f.id)}
                            className={[
                                "font-heading text-caption tracking-wide transition-opacity xl:text-small",
                                "py-1",
                                i > 0 ? "ml-4 border-l border-border-default pl-4" : "",
                                activeFilter === f.id
                                    ? "text-text"
                                    : "opacity-40 hover:opacity-70",
                            ].join(" ")}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, idx) => (
                    <div
                        key={project.id}
                        className={[
                            "min-w-0 pad-section xl:pad-section-lg",
                            idx % 3 !== 2 ? "lg:border-r lg:border-border-default" : "",
                            idx >= 3 ? "lg:border-t lg:border-border-default" : "",
                            idx % 2 === 0 ? "sm:border-r sm:border-border-default" : "",
                            idx >= 2 ? "sm:border-t sm:border-border-default" : "",
                            idx % 3 === 2 ? "lg:border-r-0" : "",
                            idx < 3 ? "lg:border-t-0" : "",
                        ].join(" ")}
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </section>
    );
}
