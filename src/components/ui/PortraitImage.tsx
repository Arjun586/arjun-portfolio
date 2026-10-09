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
            className={`flex items-start justify-center px-6 pt-6 pb-4 sm:pad-hero xl:pad-hero-lg ${className}`}
        >
            <div className="aspect-[3/4] w-[min(72vw,180px)] border border-border-strong sm:w-[240px] xl:w-[280px]">
                <img
                    src={portraitImg}
                    alt={alt}
                    className="h-full w-full object-cover object-top grayscale dark:brightness-90"
                />
            </div>
        </div>
    );
}
