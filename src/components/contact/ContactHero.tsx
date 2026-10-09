import { contactHero, contactHeroQuote } from "../../data/contactPage";
import { HeroEditorialDetails } from "../ui/HeroEditorialDetails";
import { HeroQuoteColumn } from "../ui/HeroQuoteColumn";
import { PortraitImage } from "../ui/PortraitImage";

export function ContactHero() {
    return (
        <section className="relative isolate grid grid-cols-1 items-start overflow-hidden border-b border-border-default lg:grid-cols-[1.15fr_auto_1fr]">
            <HeroEditorialDetails detailsLabel="06 / CONTACT" />

            <div className="relative z-10 flex flex-col justify-start pad-hero xl:pad-hero-lg">
                <span className="font-body text-body text-accent italic xl:text-subheading">
                    {contactHero.label}
                </span>
                <h1 className="font-heading text-hero-display leading-[0.9] tracking-tight">
                    {contactHero.title}
                </h1>
                <h2 className="font-heading mt-4 text-subheading tracking-wide uppercase">
                    {contactHero.subtitle}
                </h2>
                <div className="divider-strong mt-4 max-w-xs" />
                <p className="mt-4 max-w-md text-body leading-relaxed">
                    {contactHero.description}
                </p>
            </div>

            <PortraitImage />
            <HeroQuoteColumn quote={contactHeroQuote.text} author={contactHeroQuote.author} />
        </section>
    );
}
