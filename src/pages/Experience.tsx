import { MobileHeader } from "../components/ui/MobileHeader";
import { ExperienceHero } from "../components/experience/ExperienceHero";
import { WorkExperienceSection } from "../components/experience/WorkExperienceSection";
import { ExperienceMiddleSection } from "../components/experience/ExperienceMiddleSection";
import { ExperienceSnapshot } from "../components/experience/ExperienceSnapshot";

export default function Experience() {
    return (
        <>
            <MobileHeader />

            <ExperienceHero />
            <WorkExperienceSection />
            <ExperienceMiddleSection />
            <ExperienceSnapshot />
        </>
    );
}
