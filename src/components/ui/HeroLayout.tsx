import type { ReactNode } from "react";
import { HeroDecorativePanel } from "./HeroDecorativePanel";
import { HeroEditorialDetails } from "./HeroEditorialDetails";
import { HeroQuoteColumn } from "./HeroQuoteColumn";
import { PortraitImage } from "./PortraitImage";

export type HeroQuote = {
    text: string;
    author?: string;
    showLocation?: boolean;
};

export type HeroLayoutProps = {
    id?: string;
    label: string;
    title: string;
    subtitle?: ReactNode;
    description?: string;
    metadata?: string;
    quote?: HeroQuote;
    action?: ReactNode;
    imageAlt?: string;
};

function HeroSubtitle({ subtitle }: { subtitle: ReactNode }) {
    if (typeof subtitle === "string") {
        return (
            <h2 className="font-heading mt-4 text-subheading tracking-widest uppercase">
                {subtitle}
            </h2>
        );
    }

    return <div className="mt-4">{subtitle}</div>;
}

export function HeroLayout({
    id,
    label,
    title,
    subtitle,
    description,
    metadata,
    quote,
    action,
    imageAlt = "Arjun",
}: HeroLayoutProps) {
    return (
        <section
            id={id}
            className="relative isolate grid grid-cols-1 items-start overflow-hidden border-b border-border-default lg:grid-cols-[1.15fr_auto_1fr]"
        >
            <HeroEditorialDetails />
            <div className="relative z-10 flex flex-col justify-start pad-hero xl:pad-hero-lg">
                <span className="font-body text-body text-accent italic xl:text-subheading">
                    {label}
                </span>

                <h1 className="font-heading text-hero-display leading-[0.85] tracking-tight">
                    {title}
                </h1>

                {subtitle && <HeroSubtitle subtitle={subtitle} />}

                <div className="divider-strong mt-4" />

                {description && (
                    <p className="mt-4 max-w-md text-body leading-relaxed">
                        {description}
                    </p>
                )}

                {metadata && (
                    <p className="mt-6 font-heading text-caption tracking-widest text-accent xl:text-small">
                        {metadata}
                    </p>
                )}

                {action && (
                    <div className="mt-6 w-fit xl:mt-8">{action}</div>
                )}
            </div>

            <PortraitImage alt={imageAlt} />

            {quote ? (
                <HeroQuoteColumn
                    quote={quote.text}
                    author={quote.author}
                    showLocation={quote.showLocation}
                />
            ) : (
                <HeroDecorativePanel />
            )}
        </section>
    );
}
