import type { ReactNode } from "react";
import { Braces, KeyRound, Users } from "lucide-react";
import { FaAws, FaGithub } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import {
    SiCss,
    SiDocker,
    SiElasticsearch,
    SiExpress,
    SiFirebase,
    SiGit,
    SiGithubactions,
    SiHtml5,
    SiJavascript,
    SiJsonwebtokens,
    SiMongodb,
    SiMongoose,
    SiNetlify,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPostman,
    SiPrisma,
    SiRailway,
    SiReact,
    SiRedis,
    SiRedux,
    SiRender,
    SiSocketdotio,
    SiSupabase,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
} from "react-icons/si";
import type { SkillIconKey } from "../../data/skillsPage";

type SkillIconProps = {
    type: SkillIconKey;
    size?: number;
    className?: string;
};

export function SkillIcon({
    type,
    size = 22,
    className = "text-text",
}: SkillIconProps) {
    const icons: Record<SkillIconKey, ReactNode> = {
        html5: <SiHtml5 size={size} className={className} />,
        css3: <SiCss size={size} className={className} />,
        javascript: <SiJavascript size={size} className={className} />,
        typescript: <SiTypescript size={size} className={className} />,
        react: <SiReact size={size} className={className} />,
        nextjs: <SiNextdotjs size={size} className={className} />,
        redux: <SiRedux size={size} className={className} />,
        tailwind: <SiTailwindcss size={size} className={className} />,
        nodejs: <SiNodedotjs size={size} className={className} />,
        express: <SiExpress size={size} className={className} />,
        api: <Braces size={size} className={className} />,
        socketio: <SiSocketdotio size={size} className={className} />,
        jwt: <SiJsonwebtokens size={size} className={className} />,
        oauth: <KeyRound size={size} className={className} />,
        rbac: <Users size={size} className={className} />,
        mongodb: <SiMongodb size={size} className={className} />,
        postgresql: <SiPostgresql size={size} className={className} />,
        redis: <SiRedis size={size} className={className} />,
        elasticsearch: <SiElasticsearch size={size} className={className} />,
        prisma: <SiPrisma size={size} className={className} />,
        mongoose: <SiMongoose size={size} className={className} />,
        supabase: <SiSupabase size={size} className={className} />,
        git: <SiGit size={size} className={className} />,
        github: <FaGithub size={size} className={className} />,
        docker: <SiDocker size={size} className={className} />,
        githubactions: <SiGithubactions size={size} className={className} />,
        vercel: <SiVercel size={size} className={className} />,
        netlify: <SiNetlify size={size} className={className} />,
        railway: <SiRailway size={size} className={className} />,
        render: <SiRender size={size} className={className} />,
        aws: <FaAws size={size} className={className} />,
        firebase: <SiFirebase size={size} className={className} />,
        vscode: <VscVscode size={size} className={className} />,
        postman: <SiPostman size={size} className={className} />,
    };
    return icons[type];
}
