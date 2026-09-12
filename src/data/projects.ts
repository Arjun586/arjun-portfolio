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

    contribution?: string;

    caseStudy?: {
        eyebrow: string;
        brief: string;
        challenge: string;
        approach: { title: string; description: string }[];
        outcome: string;
        architecture?: string;
        mvpFocus?: string[];
    };

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
            "Real-time collaborative whiteboard where multiple people draw and edit on a shared infinite canvas, with CRDT-powered changes appearing instantly for everyone.",

        category: "FULL STACK",
        categoryIds: ["full-stack"],

        featured: true,

        thumbnail: "/projects/nexus.png",

        githubUrl: "https://github.com/Arjun586/Nexus",

        liveUrl: "https://nexus-tan-eta.vercel.app/",

        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "Yjs",
            "Hocuspocus",
            "tldraw",
            "Docker",
            "Tailwind CSS",
            "Zod",
            "JWT",
        ],

        caseStudy: {
            eyebrow: "DISTRIBUTED STATE SYNCHRONIZATION",
            brief:
                "A real-time collaborative whiteboard where people draw together on a shared infinite canvas. Changes appear instantly for every collaborator, powered by CRDTs.",
            challenge:
                "When people edit the same canvas at once, conventional locking blocks work and last-write-wins can silently discard it. Nexus uses CRDTs so concurrent edits merge automatically—without a central lock or data loss—even when a collaborator reconnects after being offline.",
            approach: [
                {
                    title: "TWO STORES, NO ECHO LOOP",
                    description:
                        "Local tldraw edits are written to Yjs with an origin marker. Returning changes with that marker are ignored, while collaborators’ changes update the canvas—preventing an echo loop.",
                },
                {
                    title: "AUTH SPLIT BY TRUST",
                    description:
                        "Short-lived access tokens stay in memory, while hashed refresh tokens live in httpOnly cookies. This keeps requests fast and makes sessions revocable through PostgreSQL.",
                },
                {
                    title: "DEBOUNCED CRDT PERSISTENCE",
                    description:
                        "Yjs state is saved two seconds after the last edit, capped at once every ten seconds. This avoids a write per keystroke while keeping the recovery window small.",
                },
            ],
            outcome:
                "An in-progress collaboration engine exploring how responsive infinite canvases can stay consistent under concurrent edits and network latency.",
            architecture:
                "One Node.js server runs two protocols on the same port: an Express REST API for authentication, workspaces, and membership, plus a Hocuspocus WebSocket server for live canvas sync. Both share PostgreSQL through Prisma, while Yjs holds the live collaborative state.",
            mvpFocus: [
                "MULTI-USER DRAWING",
                "CONFLICT-FREE SYNC",
                "RESPONSIVE INFINITE CANVAS",
            ],
        },

        status: "MVP Complete",
    },

    {
        id: "rate-limiter",
        number: "02",

        title: "RATE LIMITER",

        description:
            "Backend infrastructure library implementing six rate limiting algorithms from scratch with a unified API, Factory Pattern, reusable Express middleware, custom data structures, and comprehensive automated testing.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: true,

        thumbnail: "/projects/rate-limiter.png",

        githubUrl: "https://github.com/Arjun586/rate-limiter",

        technologies: [
            "JavaScript",
            "Node.js",
            "Express",
            "Vitest",
            "Factory Pattern",
            "Algorithms",
            "Data Structures",
        ],

        caseStudy: {
            eyebrow: "ALGORITHMS & BACKEND INFRASTRUCTURE",
            brief:
                "A hands-on Node.js implementation of six widely used rate-limiting algorithms, built from scratch to understand the trade-offs behind production backend infrastructure.",
            challenge:
                "Rate limiting protects APIs from abuse, brute-force attempts, traffic spikes, and noisy tenants. The challenge was to expose the different precision, memory, and burst-handling trade-offs of each strategy through a clean integration point—without relying on third-party rate-limiting packages.",
            approach: [
                {
                    title: "SIX STRATEGIES, ONE CONTRACT",
                    description:
                        "Token Bucket, two Leaky Bucket variants, Fixed Window, Sliding Window Log, and Sliding Window Counter all expose allow(userId), returning allowed and remaining state.",
                },
                {
                    title: "CONFIGURABLE AT THE EDGE",
                    description:
                        "Factory-based selection swaps algorithms through one configuration key, while reusable Express middleware makes the same contract available at the request boundary.",
                },
                {
                    title: "BUILT & TESTED FROM SCRATCH",
                    description:
                        "A linked-list queue avoids Array.shift() costs, and 73 Vitest tests use fake timers to cover algorithm behavior, middleware, factories, and data structures.",
                },
            ],
            outcome:
                "A practical learning project that turns rate-limiting theory into tested, reusable Node.js middleware—and makes each algorithm’s trade-offs concrete.",
        },

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

        featured: true,

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

        featured: true,

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

        contribution:
            "Developed WebSocket communication, backend services using Node.js and Express, and MongoDB integrations.",

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

        featured: true,

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

        featured: true,

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
        id: "verichain",
        number: "07",

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
        number: "08",

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
        number: "09",

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
        number: "10",

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
