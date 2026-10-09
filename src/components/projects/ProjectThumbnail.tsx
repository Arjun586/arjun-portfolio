import { useState } from "react";

type ProjectThumbnailProps = {
    src: string;
    alt: string;
    className?: string;
};

export function ProjectThumbnail({ src, alt, className = "" }: ProjectThumbnailProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div
                className={`flex h-full w-full items-center justify-center border border-border-subtle bg-secondary/30 ${className}`}
            >
                <span className="font-heading text-caption tracking-widest text-text/70">
                    NO PREVIEW
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`h-full w-full object-cover ${className}`}
            onError={() => setHasError(true)}
        />
    );
}
