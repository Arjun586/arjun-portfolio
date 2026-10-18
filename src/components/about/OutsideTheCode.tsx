import { outsideTheCode } from "../../data/about";

export function OutsideTheCode() {
    const { text, currentlyReading } = outsideTheCode;

    return (
        <section className="border-b border-border-default pad-section xl:pad-section-lg">
            <span className="font-heading text-caption font-medium tracking-wider text-accent">
                02
            </span>
            <h2 className="font-heading mt-1 text-section tracking-wide">
                OUTSIDE THE CODE
            </h2>

            <div className="divider-strong mt-4" />

            <p className="font-body mt-8 max-w-xl text-body leading-relaxed">
                {text}
            </p>

            <div className="mt-10">
                <span className="font-heading text-caption font-medium tracking-wider text-text/70">
                    CURRENTLY READING
                </span>
                <p className="mt-3 font-heading text-subheading tracking-wide">
                    {currentlyReading.title}
                </p>
                <p className="mt-1 text-body text-accent">
                    — {currentlyReading.author}
                </p>
            </div>
        </section>
    );
}
