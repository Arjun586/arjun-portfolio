import { MapPin } from "lucide-react";

type HeroQuoteColumnProps = {
    quote: string;
    author?: string;
    showLocation?: boolean;
};

export function HeroQuoteColumn({
    quote,
    author = "Arjun",
    showLocation = true,
}: HeroQuoteColumnProps) {
    return (
        <div className="relative z-10 flex flex-col justify-start px-6 pt-4 pb-6 sm:pad-hero xl:pad-hero-lg">
            <div className="font-bebas text-[5rem] leading-none text-accent">
                &ldquo;
            </div>

            <p className="font-bebas mt-2 max-w-sm text-[1.5rem] font-normal leading-snug tracking-wide sm:mt-4">
                {quote}
            </p>

            <p className="mt-4 font-signature text-[1.5rem] text-accent italic sm:mt-6 xl:mt-8">
                {author}
            </p>

            {showLocation && (
                <div className="mt-6 sm:mt-10 xl:mt-12">
                    <div className="divider-strong mb-3 sm:mb-4" />
                    <div className="flex items-center justify-between font-bebas text-[0.875rem] font-normal tracking-widest xl:text-[1.0625rem]">
                        <span>BASED IN INDIA</span>
                        <MapPin size={18} />
                    </div>
                </div>
            )}
        </div>
    );
}
