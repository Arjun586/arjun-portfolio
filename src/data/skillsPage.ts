export const skillsHero = {
    label: "MY EXPERTISE",
    title: "SKILLS",
    subtitle: "FULL STACK DEVELOPER",
    description:
        "Technologies, tools, and foundations I use to design, build, and ship modern full stack applications — from interface to infrastructure.",
    quote: "SKILLS ARE CHEAP. PASSION IS PRICELESS.",
} as const;

export const csFoundations = [
    {
        label: "Data Structures & Algorithms",
        link: "https://leetcode.com/u/arjun586/",
    },
    { label: "Object-Oriented Programming" },
    { label: "DBMS" },
    { label: "Operating Systems" },
    { label: "Computer Networks" },
] as const;

export type CSFoundationItem = (typeof csFoundations)[number];

export type SkillIconKey =
    | "html5" | "css3" | "javascript" | "typescript" | "react" | "nextjs" | "redux" | "tailwind"
    | "nodejs" | "express" | "api" | "socketio" | "jwt" | "oauth" | "rbac"
    | "mongodb" | "postgresql" | "redis" | "elasticsearch" | "prisma" | "mongoose" | "supabase"
    | "git" | "github" | "docker" | "githubactions" | "vercel" | "netlify" | "railway" | "render"
    | "aws" | "firebase" | "vscode" | "postman";

export type SkillItem = {
    name: string;
    icon: SkillIconKey;
};

export type SkillGroup = {
    id: string;
    title: string;
    skills: readonly SkillItem[];
};

export const skillGroups: readonly SkillGroup[] = [
    {
        id: "languages",
        title: "LANGUAGES",
        skills: [
            { name: "JavaScript", icon: "javascript" },
            { name: "TypeScript", icon: "typescript" },
        ],
    },
    {
        id: "frontend",
        title: "FRONTEND",
        skills: [
            { name: "HTML5", icon: "html5" },
            { name: "CSS3", icon: "css3" },
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Redux Toolkit", icon: "redux" },
            { name: "Tailwind CSS", icon: "tailwind" },
        ],
    },
    {
        id: "backend",
        title: "BACKEND & APIS",
        skills: [
            { name: "Node.js", icon: "nodejs" },
            { name: "Express.js", icon: "express" },
            { name: "REST APIs", icon: "api" },
            { name: "Socket.io", icon: "socketio" },
            { name: "JWT", icon: "jwt" },
            { name: "OAuth", icon: "oauth" },
            { name: "RBAC", icon: "rbac" },
        ],
    },
    {
        id: "data",
        title: "DATABASES & SEARCH",
        skills: [
            { name: "MongoDB", icon: "mongodb" },
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "Redis", icon: "redis" },
            { name: "Elasticsearch", icon: "elasticsearch" },
            { name: "Prisma", icon: "prisma" },
            { name: "Mongoose", icon: "mongoose" },
            { name: "Supabase", icon: "supabase" },
        ],
    },
    {
        id: "infra",
        title: "INFRASTRUCTURE & SYSTEMS",
        skills: [
            { name: "Docker", icon: "docker" },
            { name: "GitHub Actions", icon: "githubactions" },
            { name: "AWS", icon: "aws" },
            { name: "Firebase", icon: "firebase" },
            { name: "Vercel", icon: "vercel" },
            { name: "Netlify", icon: "netlify" },
            { name: "Railway", icon: "railway" },
            { name: "Render", icon: "render" },
        ],
    },
    {
        id: "tools",
        title: "TOOLS & PLATFORMS",
        skills: [
            { name: "Git", icon: "git" },
            { name: "GitHub", icon: "github" },
            { name: "VS Code", icon: "vscode" },
            { name: "Postman", icon: "postman" },
        ],
    },
];