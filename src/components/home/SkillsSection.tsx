import { Link } from "react-router-dom";
import { EditorialDetails } from "../ui/EditorialDetails";

const frontend = ["JavaScript", "React.js", "Next.js"];
const backend = ["Node.js", "Express.js",];
const database = ["MongoDB", "PostgreSQL"];
const tools = ["Git", "Docker", "AWS"];

function TagList({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {items.map((item) => (
                <span
                    key={item}
                    className="border border-border-default bg-transparent px-3 py-1.5 font-heading text-caption font-medium tracking-wider uppercase"
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <div className="w-fit">
                <h3 className="font-heading text-subheading tracking-wide">{title}</h3>
                <div className="divider-strong mt-3" />
            </div>
            <TagList items={items} />
        </div>
    );
}

export function SkillsSection() {
    return (
        <section id="skills" className="editorial-section flex min-w-0 flex-col pad-section xl:pad-section-lg">
            <EditorialDetails variant="skills" />
            <h2 className="font-heading text-section tracking-tight">SKILLS</h2>
            <p className="mt-4 max-w-lg font-body text-small tracking-normal text-text/80">
                Technologies I work with to build modern, scalable and user-centric solutions.
            </p>

            <div className="mt-10 space-y-8">
                <SkillGroup title="FRONTEND" items={frontend} />
                <SkillGroup title="BACKEND" items={backend} />
                <SkillGroup title="DATABASE" items={database} />
                <SkillGroup title="TOOLS & DEVOPS" items={tools} />
            </div>

            <Link to="/skills" className="link-arrow mt-8">SEE ALL SKILLS</Link>
        </section>
    );
}
