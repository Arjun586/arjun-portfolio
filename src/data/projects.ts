import { nexusCaseStudy } from "./case-studies/nexus";
import { rateLimiterCaseStudy } from "./case-studies/rate-limiter";
import { searchTestCaseStudy } from "./case-studies/search-test";
import { distributedJobQueueCaseStudy } from "./case-studies/distributed-job-queue";
import type {
    CaseStudyTable,
    CaseStudyDiagram,
    CaseStudySection,
    ProjectCaseStudy,
} from "./case-studies/types";

export type {
    CaseStudyTable,
    CaseStudyDiagram,
    CaseStudySection,
    ProjectCaseStudy,
};

export type ProjectFilterId =
    | "all"
    | "featured"
    | "full-stack"
    | "backend"
    | "hackathon"
    | "frontend";

export type ProjectCategory =
    | "full-stack"
    | "backend"
    | "frontend"
    | "hackathon";

export type Project = {
    id: string;
    number: string;

    title: string;
    description: string;

    category: string;
    categoryIds: ProjectCategory[];

    featured: boolean;

    thumbnail: string;

    githubUrl?: string;
    liveUrl?: string;

    technologies: string[];

    caseStudy?: ProjectCaseStudy;

    status: "Completed" | "Hackathon" | "MVP Complete";
};

export const projectFilters: {
    id: ProjectFilterId;
    label: string;
}[] = [
    { id: "all", label: "ALL" },
    { id: "featured", label: "FEATURED" },
    { id: "full-stack", label: "FULL STACK" },
    { id: "backend", label: "BACKEND" },
    { id: "hackathon", label: "HACKATHON" },
    { id: "frontend", label: "FRONTEND" },
];

export const projectsHero = {
    label: "MY WORK",
    title: "PROJECTS",
    subtitle:
        "A collection of full-stack applications, backend systems, hackathon projects, and developer tools built while exploring software engineering and modern web technologies.",
    metadata:
        "FULL-STACK DEVELOPMENT • BACKEND SYSTEMS • REAL-TIME APPLICATIONS",
} as const;

export const allProjects: Project[] = [
    {
        id: "nexus",
        number: "01",

        title: "NEXUS",

        description:
            "A collaborative workspace combining an infinite vector drawing canvas with rich block-based notes, live multiplayer editing, and granular document exports.",

        category: "FULL STACK",
        categoryIds: ["full-stack"],

        featured: true,

        thumbnail: "/projects/nexus.png",

        githubUrl: "https://github.com/Arjun586/Nexus",
        liveUrl: "https://nexus-notes-tau.vercel.app/",

        technologies: [
            "Next.js",
            "TypeScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "Socket.io",
            "Yjs",
            "Docker",
            "TailwindCSS",
        ],

        caseStudy: nexusCaseStudy,

        status: "Completed",
    },

    {
        id: "rate-limiter",
        number: "02",

        title: "RATE LIMITER",

        description:
            "A high-throughput distributed rate-limiting engine implementing six distinct algorithmic strategies with Redis persistence and sub-millisecond evaluation latency.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: true,

        thumbnail: "/projects/rate-limiter.png",

        githubUrl: "https://github.com/Arjun586/Rate-limiter",

        technologies: [
            "TypeScript",
            "Node.js",
            "Express",
            "Redis",
            "Docker",
            "Jest",
            "Lua",
        ],

        caseStudy: rateLimiterCaseStudy,

        status: "Completed",
    },

    {
        id: "replayos",
        number: "03",

        title: "REPLAYOS",

        description:
            "Developer observability platform that transforms logs, traces, and incidents into visual timelines, enabling faster debugging and root-cause analysis.",

        category: "FULL STACK",
        categoryIds: ["full-stack"],

        featured: false,

        thumbnail: "/projects/replayos.png",

        githubUrl: "https://github.com/Arjun586/ReplayOS",

        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "BullMQ",
            "JWT",
            "RBAC",
        ],

        caseStudy: {
            eyebrow: "DEVELOPER OBSERVABILITY",
            brief:
                "ReplayOS turns operational signals such as logs, traces, and incidents into visual timelines for faster debugging.",
            challenge:
                "Debugging often means reconstructing what happened across scattered events. ReplayOS focuses that investigation around a single chronological view.",
            approach: [
                {
                    title: "TIMELINE FIRST",
                    description:
                        "Logs, traces, and incidents are organized as visual sequences so engineers can follow an event's context over time.",
                },
                {
                    title: "FULL-STACK FOUNDATION",
                    description:
                        "React and TypeScript pair with Node.js, Express, PostgreSQL, and Prisma for the platform's application layer.",
                },
                {
                    title: "CONTROLLED ACCESS",
                    description:
                        "JWT authentication and role-based access control support protected observability workflows.",
                },
            ],
            outcome:
                "A focused observability concept designed to reduce the distance between an incident and its root cause.",
            sections: [
                {
                    heading: "OVERVIEW",
                    body: "ReplayOS is a developer observability platform that aggregates logs, traces, and incidents into visual timelines. The goal is to help engineers debug faster by showing events in chronological context rather than isolated log entries.",
                },
                {
                    heading: "TECHNICAL IMPLEMENTATION",
                    body: "The platform uses a React/TypeScript frontend with a Node.js/Express backend. PostgreSQL with Prisma handles persistent storage, Redis provides caching, and BullMQ manages background job processing for data aggregation and timeline generation.",
                    bullets: [
                        "Visual timeline rendering for correlated events",
                        "JWT authentication with role-based access control",
                        "BullMQ for background data processing",
                        "PostgreSQL + Prisma for structured event storage",
                    ],
                },
                {
                    heading: "KEY LEARNINGS",
                    body: "Building an observability tool highlighted the importance of data correlation across different signal types. Timeline-based visualization proved more intuitive than traditional log-search interfaces for understanding incident sequences.",
                },
            ],
        },

        status: "Completed",
    },

    {
        id: "kmrl",
        number: "04",

        title: "KMRL",

        description:
            "Intelligent document processing platform that classifies, routes, and interprets documents while connecting policies, approvals, and workflows in real time.",

        category: "FULL STACK",
        categoryIds: ["full-stack"],

        featured: false,

        thumbnail: "/projects/kmrl.png",

        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "WebSockets",
            "LangChain",
            "Gemini",
            "n8n",
        ],

        status: "Completed",
    },

    {
        id: "studynotion",
        number: "05",

        title: "STUDYNOTION",

        description:
            "EdTech platform where students purchase and consume courses while instructors create, manage, and analyze educational content.",

        category: "FULL STACK",
        categoryIds: ["full-stack"],

        featured: false,

        thumbnail: "/projects/studynotion.png",

        githubUrl:
            "https://github.com/Arjun586/studynotion",

        technologies: [
            "React",
            "Redux Toolkit",
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Tailwind",
        ],

        status: "Completed",
    },

    {
        id: "resq360",
        number: "06",

        title: "RESQ360",

        description:
            "Emergency response platform that combines real-time alerts, community reporting, and safety resources to improve crisis coordination.",

        category: "HACKATHON",
        categoryIds: ["hackathon"],

        featured: false,

        thumbnail: "/projects/resq360.png",

        githubUrl:
            "https://github.com/Arjun586/RESQ360-hacknovate",

        technologies: [
            "React",
            "TypeScript",
            "Firebase",
            "Firestore",
            "Gemini API",
            "Tailwind",
        ],

        status: "Hackathon",
    },

    {
        id: "search-test",
        number: "07",

        title: "SEARCH-TEST",

        description:
            "An empirical search benchmarking engine comparing PostgreSQL ILIKE, pg_trgm trigrams, PostgreSQL tsvector FTS, and Elasticsearch across 100,000 real-world corporate records.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: true,

        thumbnail: "/projects/search-test.png",

        githubUrl: "https://github.com/Arjun586/search-test",

        technologies: [
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Elasticsearch",
            "Docker",
            "Kibana",
        ],

        caseStudy: searchTestCaseStudy,

        status: "Completed",
    },

    {
        id: "distributed-job-queue",
        number: "08",

        title: "DISTRIBUTED JOB-QUEUE",

        description:
            "A production-grade distributed asynchronous task queue built on Redis Streams, PostgreSQL state tracking, and consumer group worker pools with automatic PEL crash recovery.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: true,

        thumbnail: "/projects/distributed-job-queue.png",

        githubUrl: "https://github.com/Arjun586/distributed-job-queue",

        technologies: [
            "TypeScript",
            "Node.js",
            "Express",
            "Redis",
            "PostgreSQL",
            "Docker",
        ],

        caseStudy: distributedJobQueueCaseStudy,

        status: "Completed",
    },

    {
        id: "verichain",
        number: "09",

        title: "VERICHAIN",

        description:
            "Blockchain-powered property verification system that converts physical assets into secure, verifiable digital records.",

        category: "BACKEND • HACKATHON",
        categoryIds: ["backend", "hackathon"],

        featured: false,

        thumbnail: "/projects/verichain.png",

        githubUrl:
            "https://github.com/aryan-saini-dev/Verichain-Property_Transfer_Using_Blockchain",

        technologies: [
            "Blockchain",
            "NFT",
            "Property Verification",
        ],

        status: "Hackathon",
    },

    {
        id: "chat-app",
        number: "10",

        title: "CHAT APP",

        description:
            "Real-time messaging application featuring instant communication, authentication, and scalable client-server architecture.",

        category: "FULL STACK",
        categoryIds: ["full-stack"],

        featured: false,

        thumbnail: "/projects/chat-app.png",

        githubUrl:
            "https://github.com/Arjun586/chat-app",

        technologies: [
            "React",
            "Node.js",
            "Express",
            "Socket.io",
            "MongoDB",
            "JWT",
        ],

        status: "Completed",
    },

    {
        id: "video-backend",
        number: "11",

        title: "VIDEO BACKEND",

        description:
            "Production-style backend inspired by modern video platforms, featuring authentication, subscriptions, comments, likes, and media management.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: false,

        thumbnail: "/projects/video-backend.png",

        githubUrl:
            "https://github.com/Arjun586/full_backend",

        technologies: [
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
            "JWT",
            "Bcrypt",
        ],

        status: "Completed",
    },

    {
        id: "advanced-event-studio",
        number: "12",

        title: "ADVANCED EVENT STUDIO",

        description:
            "Interactive JavaScript playground designed to explore modern DOM events, event delegation, and real-world event-driven UI patterns.",

        category: "FRONTEND",
        categoryIds: ["frontend"],

        featured: false,

        thumbnail: "/projects/advanced-event-studio.png",

        githubUrl:
            "https://github.com/Arjun586/advance-event-studio",

        technologies: [
            "JavaScript",
            "HTML",
            "CSS",
            "DOM Events",
        ],

        status: "Completed",
    },
];

export const featuredProjects = allProjects.filter(
    (project) => project.featured,
);

export function filterProjects(
    projects: Project[],
    filterId: ProjectFilterId,
): Project[] {
    if (filterId === "all") {
        return projects;
    }

    if (filterId === "featured") {
        return projects.filter((project) => project.featured);
    }

    return projects.filter((project) =>
        project.categoryIds.includes(filterId as ProjectCategory),
    );
}
