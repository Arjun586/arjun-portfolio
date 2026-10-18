import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { heroBio, heroQuote, resumeUrl } from "../../data/home";
import { Button } from "../ui/Button";
import { HeroEditorialDetails } from "../ui/HeroEditorialDetails";
import { HeroQuoteColumn } from "../ui/HeroQuoteColumn";
import { PortraitImage } from "../ui/PortraitImage";

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative isolate grid min-w-0 grid-cols-1 items-start overflow-hidden border-b border-border-default lg:grid-cols-[1.15fr_auto_1fr]"
        >
            <HeroEditorialDetails detailsLabel="01 / INTRODUCTION" />
            <div className="relative z-10 flex min-w-0 flex-col justify-start pad-hero xl:pad-hero-lg">
                <span className="font-body text-small text-accent italic sm:text-body xl:text-subheading">
                    HELLO, I&apos;M
                </span>

                <h1 className="font-bebas text-hero-name font-normal leading-[0.85] tracking-tight">
                    Arjun
                </h1>

                <h2 className="font-heading mt-4 text-subheading tracking-wider uppercase">
                    FULL STACK DEVELOPER
                </h2>

                <div className="divider-strong mt-4" />

                <p className="font-body mt-4 max-w-md text-body leading-relaxed">
                    {heroBio}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 xl:mt-8">
                    <Link to="/projects" className="inline-block w-fit">
                        <Button>VIEW MY WORK</Button>
                    </Link>
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

            <HeroQuoteColumn quote={heroQuote.text} author={heroQuote.author} />
        </section>
    );
}
