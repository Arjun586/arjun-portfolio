import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import { MobileHeader } from "../components/ui/MobileHeader";
import { ProjectThumbnail } from "../components/projects/ProjectThumbnail";
import { allProjects } from "../data/projects";

export default function ProjectDetail() {
    const { projectId } = useParams();
    const project = allProjects.find((item) => item.id === projectId);

    if (!project?.caseStudy) {
        return <Navigate to="/projects" replace />;
    }

    const { caseStudy } = project;

    return (
        <>
            <MobileHeader />

            <section className="border-b border-border-default pad-hero xl:pad-hero-lg">
                <Link to="/projects" className="link-arrow inline-flex items-center gap-2">
                    <ArrowLeft size={15} /> ALL PROJECTS
                </Link>
                <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)] lg:items-end">
                    <div>
                        <p className="font-heading text-caption tracking-[0.18em] text-accent xl:text-small">
                            {project.number} / {caseStudy.eyebrow}
                        </p>
                        <h1 className="mt-2 font-heading text-hero-display leading-[0.9] tracking-tight">
                            {project.title}
                        </h1>
                        <div className="divider-strong mt-3 max-w-xs" />
                        <p className="mt-4 max-w-3xl text-body leading-relaxed">{caseStudy.brief}</p>
                    </div>
                    <div className="border-l-2 border-accent pl-4 lg:pb-1">
                        <span className="font-heading text-caption tracking-widest text-accent">{project.category}</span>
                        <p className="mt-2 font-heading text-subheading leading-snug">{project.status.toUpperCase()}</p>
                    </div>
                </div>
            </section>

            <section className="grid border-b border-border-default lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)] lg:divide-x lg:divide-border-default">
                <div className="pad-section xl:pad-section-lg">
                    <div className="aspect-[16/10] overflow-hidden border border-border-subtle">
                        <ProjectThumbnail src={project.thumbnail} alt={`${project.title} preview`} />
                    </div>
                </div>
                <div className="border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                    <p className="font-heading text-caption tracking-widest text-accent">THE CHALLENGE</p>
                    <p className="mt-3 text-body leading-relaxed">{caseStudy.challenge}</p>
                    <div className="mt-6 flex flex-wrap gap-4 border-t border-border-subtle pt-5">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-2">
                                <FaGithub size={15} /> GITHUB
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-2">
                                <ExternalLink size={15} /> LIVE DEMO
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {caseStudy.architecture && (
                <section className="grid border-b border-border-default lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)] lg:divide-x lg:divide-border-default">
                    <div className="pad-section xl:pad-section-lg">
                        <p className="font-heading text-caption tracking-widest text-accent">SYSTEM ARCHITECTURE</p>
                        <h2 className="mt-1 font-heading text-section leading-none tracking-wide">ONE SERVER, TWO PROTOCOLS</h2>
                        <p className="mt-4 max-w-3xl text-body leading-relaxed">{caseStudy.architecture}</p>
                    </div>
                    <div className="border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                        <p className="font-heading text-caption tracking-widest text-accent">MVP FOCUS</p>
                        <div className="mt-4 space-y-3">
                            {caseStudy.mvpFocus?.map((item, index) => (
                                <div key={item} className="flex items-baseline gap-3 border-b border-border-subtle pb-3 last:border-b-0 last:pb-0">
                                    <span className="font-heading text-caption text-accent">0{index + 1}</span>
                                    <span className="font-heading text-subheading tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-b border-border-default">
                <div className="border-b border-border-default pad-section xl:pad-section-lg">
                    <p className="font-heading text-caption tracking-widest text-accent">BUILD NOTES</p>
                    <h2 className="mt-1 font-heading text-section leading-none tracking-wide">HOW IT COMES TOGETHER</h2>
                </div>
                <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-border-default">
                    {caseStudy.approach.map((item, index) => (
                        <article key={item.title} className="border-b border-border-default pad-section last:border-b-0 sm:border-b-0 xl:pad-section-lg">
                            <span className="font-heading text-caption text-accent">0{index + 1}</span>
                            <h3 className="mt-5 font-heading text-card-title leading-none tracking-wide">{item.title}</h3>
                            <p className="mt-3 text-small leading-relaxed">{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="grid border-b border-border-default lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)] lg:divide-x lg:divide-border-default">
                <div className="pad-section xl:pad-section-lg">
                    <p className="font-heading text-caption tracking-widest text-accent">RESULT</p>
                    <p className="mt-3 max-w-3xl font-heading text-card-title leading-snug tracking-wide">{caseStudy.outcome}</p>
                </div>
                <div className="border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                    <p className="font-heading text-caption tracking-widest text-accent">TECH STACK</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                            <span key={technology} className="border border-border-default px-2 py-1 font-heading text-caption tracking-widest uppercase">
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <div className="pad-section xl:pad-section-lg">
                <Link to="/projects" className="btn-primary">
                    <ArrowLeft size={17} /> BACK TO PROJECTS
                </Link>
            </div>
        </>
    );
}
