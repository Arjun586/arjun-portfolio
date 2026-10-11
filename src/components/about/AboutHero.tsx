import { Download } from "lucide-react";
import { aboutHero, aboutHeroQuote } from "../../data/about";
import { resumeUrl } from "../../data/home";
import { Button } from "../ui/Button";
import { HeroEditorialDetails } from "../ui/HeroEditorialDetails";
import { HeroQuoteColumn } from "../ui/HeroQuoteColumn";
import { PortraitImage } from "../ui/PortraitImage";

export function AboutHero() {
    return (
        <section className="relative isolate grid grid-cols-1 overflow-hidden border-b border-border-default lg:grid-cols-[1.15fr_auto_1fr]">
            <HeroEditorialDetails detailsLabel="02 / PROFILE" />

            <div className="relative z-10 flex flex-col justify-center pad-hero xl:pad-hero-lg">
                <span className="font-body text-body text-accent italic xl:text-subheading">
                    {aboutHero.label}
                </span>

                <h1 className="font-heading text-hero-display leading-[0.85] tracking-tight">
                    {aboutHero.title}
                </h1>

                <h2 className="font-heading mt-4 text-subheading tracking-widest uppercase">
                    {aboutHero.subtitle}
                </h2>

                <div className="divider-strong mt-4" />

                <p className="mt-4 max-w-md text-body leading-relaxed">
                    {aboutHero.bio}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 xl:mt-8">
                    <a
                        href={resumeUrl.view}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-fit"
                    >
                        <Button>VIEW RESUME</Button>
                    </a>
                    <a
                        href={resumeUrl.download}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Arjun_Resume.pdf"
                        className="inline-block w-fit"
                    >
                        <Button showArrow={false}>
                            <span className="inline-flex items-center gap-2">
                                DOWNLOAD RESUME
                                <Download size={15} />
                            </span>
                        </Button>
                    </a>
                </div>
            </div>

            <PortraitImage alt="Arjun" />

            <HeroQuoteColumn quote={aboutHeroQuote.text} author={aboutHeroQuote.author} />
        </section>
    );
}
