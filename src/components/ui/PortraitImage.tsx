import portraitImg from "../../assets/myImage.png";

type PortraitImageProps = {
    alt?: string;
    className?: string;
};

export function PortraitImage({
    alt = "Arjun",
    className = "",
}: PortraitImageProps) {
    return (
        <div
            className={`relative z-10 flex items-start justify-center px-6 pt-6 pb-4 sm:pad-hero xl:pad-hero-lg ${className}`}
        >
            <div className="portrait-paper-frame aspect-[3/4] w-[min(72vw,180px)] sm:w-[240px] xl:w-[280px]">
                <span className="portrait-paper-frame__offset" aria-hidden="true" />
                <div className="relative z-10 h-full w-full border border-border-strong bg-secondary/15 p-1">
                    <img
                        src={portraitImg}
                        alt={alt}
                        className="h-full w-full object-cover object-top grayscale dark:brightness-90"
                    />
                </div>
            </div>
        </div>
    );
}
