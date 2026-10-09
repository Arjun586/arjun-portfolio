import { Code2, FolderOpen, GraduationCap } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { experienceSnapshot } from "../../data/experience";
import { EditorialDetails } from "../ui/EditorialDetails";
const snapshotIcons = {
    folder: FolderOpen,
    code: Code2,
    github: FaGithub,
    graduation: GraduationCap,
} as const;
export function ExperienceSnapshot() {
    return (
        <section className="editorial-section border-b border-border-default">
            <EditorialDetails variant="snapshot" />
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:divide-x lg:divide-border-default">
                {experienceSnapshot.map((stat) => {
                    const Icon = snapshotIcons[stat.icon];
                    return (
                        <div
                            key={stat.label}
                            className="flex min-w-0 items-center gap-4 border-b border-border-default py-5 pad-section last:border-b-0 lg:border-b-0"
                        >
                            <div className="icon-box shrink-0">
                                <Icon size={18} className="text-accent" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-heading text-card-title leading-none xl:text-section">
                                    {stat.value}
                                </p>
                                <p className="mt-1 font-heading text-caption tracking-wide text-text/70">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
