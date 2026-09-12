import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import { ProjectThumbnail } from "../projects/ProjectThumbnail";

export function FeaturedProjects() {
    return (
        <section id="projects" className="flex min-w-0 flex-col pad-section xl:pad-section-lg">
            <div className="flex flex-col gap-3 border-b border-border-strong pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h2 className="font-heading text-section tracking-wide">FEATURED PROJECTS</h2>
                <Link to="/projects" className="link-arrow w-fit shrink-0">
                    VIEW ALL PROJECTS
                </Link>
            </div>

            <div className="mt-6 grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:gap-6">
                {featuredProjects.map((project) => (
                    <article
                        key={project.id}
                        className="flex min-w-0 flex-col border-b border-border-subtle pb-8 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden border border-border-subtle">
                            <span className="absolute -top-px -left-px z-10 border border-border-strong bg-secondary px-2 py-1 font-heading text-caption leading-none">
                                {project.number}
                            </span>
                            <ProjectThumbnail
                                src={project.thumbnail}
                                alt={`${project.title} preview`}
                            />
                        </div>

                        <h3 className="font-heading mt-3 text-subheading leading-snug tracking-wide sm:mt-4 xl:text-card-title">
                            {project.title}
                        </h3>
                        <span className="mt-2 font-heading text-caption tracking-wide text-accent">
                            {project.category}
                        </span>
                        <p className="mt-2 flex-1 text-body leading-relaxed">
                            {project.description}
                        </p>

                        {(project.githubUrl || project.liveUrl) && (
                            <div className="mt-3 flex flex-wrap gap-3 sm:mt-4">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-arrow inline-flex items-center gap-1.5"
                                    >
                                        <FaGithub size={13} />
                                        GITHUB
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-arrow inline-flex items-center gap-1.5"
                                    >
                                        <ExternalLink size={13} />
                                        DEMO
                                    </a>
                                )}
                            </div>
                        )}

                        <Link
                            to={project.caseStudy ? `/projects/${project.id}` : "/projects"}
                            className="link-arrow mt-5 border-t border-border-subtle pt-4 sm:mt-6"
                        >
                            {project.caseStudy ? "VIEW CASE STUDY" : "VIEW PROJECT"}
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
