import { aboutContent } from "../../data/about";
import { EditorialDetails } from "../ui/EditorialDetails";

export function AboutSection() {
    const { bio, currently } = aboutContent;

    return (
        <section className="editorial-section border-b border-border-default">
            <EditorialDetails variant="about" label="01 / MARGIN NOTES" />
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] lg:divide-x lg:divide-border-default">
                {/* ── Left: Bio ── */}
                <div className="pad-section xl:pad-section-lg">
                    <span className="font-heading text-caption tracking-widest text-accent">
                        01
                    </span>
                    <h2 className="font-heading mt-1 text-section tracking-wide">
                        ABOUT
                    </h2>

                    <div className="divider-strong mt-4" />

                    <div className="mt-8 max-w-xl space-y-6">
                        {bio.map((paragraph, i) => (
                            <p
                                key={i}
                                className="text-subheading font-body leading-relaxed"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* ── Right: Currently ── */}
                <div className="border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                    <span className="font-heading text-caption tracking-widest text-accent">
                        CURRENTLY
                    </span>

                    <div className="divider-strong mt-3" />

                    {/* Education */}
                    <div className="mt-8">
                        <span className="font-heading text-caption tracking-widest text-text/70">
                            EDUCATION
                        </span>
                        <p className="mt-2 font-heading text-subheading tracking-wide">
                            {currently.education.degree}
                        </p>
                        <p className="mt-1 text-body leading-relaxed">
                            {currently.education.institution}
                        </p>
                        <p className="mt-0.5 text-small text-text/70">
                            {currently.education.period}
                        </p>
                    </div>

                    {/* Focus */}
                    <div className="mt-8">
                        <span className="font-heading text-caption tracking-widest text-text/70">
                            FOCUS
                        </span>
                        <ul className="mt-2 space-y-1">
                            {currently.focus.map((item) => (
                                <li
                                    key={item}
                                    className="font-heading text-subheading tracking-wide"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Based In */}
                    <div className="mt-8">
                        <span className="font-heading text-caption tracking-widest text-text/70">
                            BASED IN
                        </span>
                        <p className="mt-2 font-heading text-subheading tracking-wide">
                            {currently.location}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
