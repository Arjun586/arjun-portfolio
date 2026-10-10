import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import { ProjectThumbnail } from "../projects/ProjectThumbnail";
import { EditorialDetails } from "../ui/EditorialDetails";

export function FeaturedProjects() {
    return (
        <section id="projects" className="editorial-section flex min-w-0 flex-col pad-section xl:pad-section-lg">
            <EditorialDetails variant="projects" />
            <div className="flex flex-col gap-3 border-b border-border-strong pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h2 className="font-heading text-section tracking-wide">FEATURED PROJECTS</h2>
                <Link to="/projects" className="link-arrow w-fit shrink-0">
                    VIEW ALL PROJECTS
                </Link>
            </div>

            <div className="mt-6 grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:gap-8">
                {featuredProjects.map((project) => {
                    const projectUrl = project.caseStudy
                        ? `/projects/${project.id}`
                        : "/projects";

                    return (
                        <article
                            key={project.id}
                            className="group flex min-w-0 flex-col border-b border-border-subtle pb-8 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0"
                        >
                            <Link
                                to={projectUrl}
                                aria-label={`View ${project.title} case study`}
                                className="relative aspect-[16/10] overflow-hidden border border-border-subtle block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                            >
                                <span className="absolute -top-px -left-px z-10 border border-border-strong bg-secondary px-2 py-1 font-heading text-caption leading-none">
                                    {project.number}
                                </span>
                                <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]">
                                    <ProjectThumbnail
                                        src={project.thumbnail}
                                        alt={`${project.title} preview`}
                                    />
                                </div>
                            </Link>

                            <h3 className="font-heading mt-3 text-subheading leading-snug tracking-wide sm:mt-4 xl:text-card-title">
                                <Link
                                    to={projectUrl}
                                    className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                >
                                    {project.title}
                                </Link>
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
                                to={projectUrl}
                                className="link-arrow mt-5 border-t border-border-subtle pt-4 sm:mt-6 inline-flex items-center gap-1.5"
                            >
                                {project.caseStudy ? "VIEW CASE STUDY" : "VIEW PROJECT"}{" "}
                                <span aria-hidden>→</span>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
