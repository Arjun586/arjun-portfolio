import { Check, Clock, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { availableFor, contactDetails, socialLinks } from "../../data/contactPage";
import { ContactForm } from "./ContactForm";
import { EditorialDetails } from "../ui/EditorialDetails";

function DetailIcon({ type }: { type: (typeof contactDetails)[number]["icon"] }) {
    const className = "text-text";
    const size = 18;
    if (type === "mail")     return <Mail size={size} className={className} />;
    if (type === "location") return <MapPin size={size} className={className} />;
    return <Clock size={size} className={className} />;
}

function SocialIcon({ type }: { type: (typeof socialLinks)[number]["icon"] }) {
    const className = "text-text";
    const size = 20;
    if (type === "github")   return <FaGithub size={size} className={className} />;
    if (type === "linkedin") return <FaLinkedinIn size={size} className={className} />;
    if (type === "x")        return <FaXTwitter size={size} className={className} />;
    return <Mail size={size} className={className} />;
}

export function ContactMainSection() {
    return (
        <section className="editorial-section grid grid-cols-1 border-b border-border-default lg:grid-cols-3 lg:divide-x lg:divide-border-default">
            <EditorialDetails variant="contact" label="06 / CORRESPONDENCE" />
            {/* SEND ME A MESSAGE */}
            <div className="pad-section xl:pad-section-lg">
                <h2 className="font-heading text-section tracking-wide">SEND ME A MESSAGE</h2>
                <div className="divider-strong mt-3 max-w-[180px]" />
                <ContactForm />
            </div>

            {/* CONTACT DETAILS */}
            <div className="border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                <h2 className="font-heading text-section tracking-wide">CONTACT DETAILS</h2>
                <div className="divider-strong mt-3 max-w-[160px]" />
                <ul className="mt-6">
                    {contactDetails.map((item) => (
                        <li key={item.label} className="flex gap-4 border-b border-dashed border-border-subtle py-6 first:pt-0 last:border-b-0">
                            <div className="icon-box shrink-0">
                                <DetailIcon type={item.icon} />
                            </div>
                            <div>
                                <p className="font-heading text-caption tracking-wide text-accent">{item.label}</p>
                                <p className="mt-1 text-body leading-relaxed">{item.value}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* LET'S CONNECT */}
            <div className="border-t border-border-default pad-section lg:border-t-0 xl:pad-section-lg">
                <h2 className="font-heading text-section tracking-wide">LET&apos;S CONNECT</h2>
                <div className="divider-strong mt-3 max-w-[120px]" />
                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.icon === "mail" ? undefined : "_blank"}
                            rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                            className="flex flex-col items-center gap-4 border border-border-subtle bg-background/40 px-2 py-4 transition-opacity hover:opacity-70"
                        >
                            <SocialIcon type={link.icon} />
                            <span className="font-heading text-caption tracking-wide">{link.label}</span>
                        </a>
                    ))}
                </div>

                <h3 className="font-heading mt-8 text-subheading tracking-wide text-accent">I&apos;M AVAILABLE FOR</h3>
                <ul className="mt-4 space-y-3">
                    {availableFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <Check size={16} className="mt-[3px] shrink-0 text-accent" />
                            <span className="text-body leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
