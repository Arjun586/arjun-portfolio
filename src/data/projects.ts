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

export type CaseStudySection = {
    heading: string;
    body: string;
    bullets?: string[];
    codeSnippet?: { language: string; code: string };
};

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

    caseStudy?: {
        eyebrow: string;
        brief: string;
        challenge: string;
        approach: { title: string; description: string }[];
        outcome: string;
        architecture?: string;
        mvpFocus?: string[];
        sections?: CaseStudySection[];
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
                        "Local tldraw edits are written to Yjs with an origin marker. Returning changes with that marker are ignored, while collaborators' changes update the canvas—preventing an echo loop.",
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
            sections: [
                {
                    heading: "OVERVIEW",
                    body: "Nexus is a real-time collaborative whiteboard application built to explore distributed state synchronization. It allows multiple users to draw, annotate, and edit on a shared infinite canvas where every change appears instantly for all participants.",
                },
                {
                    heading: "PROBLEM STATEMENT",
                    body: "Traditional collaborative editing faces the challenge of conflicting concurrent modifications. Simple last-write-wins approaches silently discard changes, while locking mechanisms block other users. The goal was to build a system where concurrent edits merge automatically without data loss or user-visible conflicts.",
                },
                {
                    heading: "TECHNICAL IMPLEMENTATION",
                    body: "The application uses Yjs CRDTs for conflict-free state synchronization, tldraw for the canvas rendering engine, and Hocuspocus as the WebSocket server for live collaborative sync. Authentication uses a split-token strategy with short-lived access tokens in memory and hashed refresh tokens in httpOnly cookies, backed by PostgreSQL through Prisma.",
                    bullets: [
                        "Yjs CRDT document with origin-based echo suppression",
                        "Hocuspocus WebSocket server for real-time sync",
                        "tldraw rendering engine for the infinite canvas",
                        "Express REST API for auth, workspaces, and membership",
                        "Debounced persistence: 2s after last edit, capped at 10s intervals",
                    ],
                },
                {
                    heading: "ENGINEERING CHALLENGES",
                    body: "The primary challenge was preventing echo loops when syncing local edits through Yjs back to the canvas. This was solved by tagging local writes with an origin marker and ignoring returning changes with the same marker. Another challenge was balancing persistence frequency—too often wastes writes, too rarely risks data loss.",
                },
                {
                    heading: "KEY LEARNINGS",
                    body: "CRDTs provide a powerful foundation for collaborative applications but require careful integration with rendering engines. The debounced persistence pattern proved effective for balancing write costs against recovery windows. Token-based auth with trust-level separation keeps real-time connections fast while maintaining security.",
                },
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
                "A practical learning project that turns rate-limiting theory into tested, reusable Node.js middleware—and makes each algorithm's trade-offs concrete.",
            sections: [
                {
                    heading: "OVERVIEW",
                    body: "A Node.js library implementing six rate-limiting algorithms from scratch with a unified API. Each algorithm is accessible through a Factory Pattern and deployable as Express middleware.",
                },
                {
                    heading: "TECHNICAL IMPLEMENTATION",
                    body: "Six algorithms are implemented behind a common allow(userId) interface: Token Bucket, Leaky Bucket (queue-based), Leaky Bucket (counter-based), Fixed Window, Sliding Window Log, and Sliding Window Counter. A factory function selects the algorithm based on a configuration key, and Express middleware wraps the selected strategy for HTTP request-level rate limiting.",
                    bullets: [
                        "Custom linked-list queue to avoid O(n) Array.shift() costs",
                        "Factory Pattern for runtime algorithm selection",
                        "Reusable Express middleware adapter",
                        "73 Vitest tests with fake timers for deterministic behavior",
                    ],
                },
                {
                    heading: "TECHNICAL DECISIONS & TRADE-OFFS",
                    body: "Each algorithm makes different trade-offs between memory usage, burst tolerance, and precision. Token Bucket allows controlled bursts but requires per-user state. Sliding Window Log offers the highest precision but stores every request timestamp. Sliding Window Counter balances precision and memory by interpolating between two fixed windows.",
                },
                {
                    heading: "KEY LEARNINGS",
                    body: "Building rate limiters from scratch revealed how theoretical algorithm properties translate into practical engineering constraints. The project demonstrated the value of a unified interface for swappable strategies and the importance of deterministic testing with controlled time.",
                },
            ],
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
        id: "search-test",
        number: "07",

        title: "SEARCH-TEST",

        description:
            "Search-engine benchmarking project comparing PostgreSQL Trigram Search, PostgreSQL Full-Text Search, and Elasticsearch across 100,000 documents.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: false,

        thumbnail: "/projects/search-test.png",

        technologies: [
            "PostgreSQL",
            "Elasticsearch",
            "Node.js",
            "Trigram Search",
            "Full-Text Search",
        ],

        caseStudy: {
            eyebrow: "SEARCH ENGINE BENCHMARKING",
            brief:
                "A benchmarking project that evaluates three document-search approaches—PostgreSQL Trigram Search, PostgreSQL Full-Text Search (FTS), and Elasticsearch—across 100,000 documents to understand their indexing, query behavior, and performance trade-offs.",
            challenge:
                "Choosing the right search approach for a document-heavy application involves trade-offs in indexing complexity, query latency, relevance ranking, and infrastructure overhead. This project provides a controlled comparison to inform that decision.",
            approach: [
                {
                    title: "THREE SEARCH STRATEGIES",
                    description:
                        "PostgreSQL Trigram Search (pg_trgm) for fuzzy substring matching, PostgreSQL Full-Text Search for language-aware keyword search with ranking, and Elasticsearch for distributed full-text search with inverted indexes.",
                },
                {
                    title: "CONTROLLED TEST ENVIRONMENT",
                    description:
                        "All three approaches are tested against the same 100,000-document dataset with identical queries to ensure fair comparison of indexing time, query latency, and result relevance.",
                },
                {
                    title: "INDEXING APPROACHES COMPARED",
                    description:
                        "GIN indexes for trigram and FTS in PostgreSQL versus inverted indexes in Elasticsearch, each with different storage and update characteristics.",
                },
            ],
            outcome:
                "A structured benchmarking framework for evaluating search strategies. Actual performance measurements can be added as tests are run against specific hardware configurations.",
            sections: [
                {
                    heading: "OVERVIEW",
                    body: "Search-Test benchmarks three document-search approaches across a dataset of 100,000 documents. The project is designed to evaluate real-world search behavior including indexing speed, query latency, fuzzy matching capability, and relevance ranking quality.",
                },
                {
                    heading: "PROBLEM STATEMENT",
                    body: "Applications dealing with large document collections need efficient search. PostgreSQL offers built-in options (trigram and full-text search), while Elasticsearch provides a dedicated search engine. Each approach has different strengths, and the right choice depends on query patterns, infrastructure constraints, and relevance requirements.",
                },
                {
                    heading: "TECHNICAL IMPLEMENTATION",
                    body: "The project sets up three search backends against the same dataset:",
                    bullets: [
                        "PostgreSQL Trigram Search: Uses pg_trgm extension with GIN indexes for fuzzy substring matching and similarity scoring.",
                        "PostgreSQL Full-Text Search: Uses tsvector/tsquery with GIN indexes for language-aware keyword search with ts_rank relevance scoring.",
                        "Elasticsearch: Uses inverted indexes with BM25 scoring for distributed full-text search with built-in analyzers and tokenizers.",
                    ],
                },
                {
                    heading: "TECHNICAL DECISIONS & TRADE-OFFS",
                    body: "PostgreSQL-based approaches avoid additional infrastructure but may have performance limitations at scale. Elasticsearch adds operational complexity but offers purpose-built search features. Trigram search excels at typo-tolerant fuzzy matching but is slower for large datasets. FTS provides good keyword search within PostgreSQL but lacks Elasticsearch's analyzer flexibility.",
                },
                {
                    heading: "PERFORMANCE & RELIABILITY",
                    body: "Performance benchmarks are structured to measure: indexing time for 100K documents, average query latency across common search patterns, memory and storage overhead for each indexing approach, and result relevance quality for typo-tolerant and exact-match queries. Actual measurements to be added after running benchmarks on target hardware.",
                },
                {
                    heading: "KEY LEARNINGS",
                    body: "Building a fair comparison framework requires careful control of variables. The project structure ensures that differences in results are attributable to the search approach rather than data preparation or query construction differences.",
                },
            ],
        },

        status: "Completed",
    },

    {
        id: "distributed-job-queue",
        number: "08",

        title: "DISTRIBUTED JOB-QUEUE",

        description:
            "A distributed background worker engine using Redis Streams for message brokering and PostgreSQL for job persistence, designed for reliable job processing and worker coordination.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: false,

        thumbnail: "/projects/distributed-job-queue.png",

        technologies: [
            "Node.js",
            "Redis Streams",
            "PostgreSQL",
            "Worker Coordination",
        ],

        caseStudy: {
            eyebrow: "DISTRIBUTED SYSTEMS & JOB PROCESSING",
            brief:
                "A distributed background worker engine that uses Redis Streams for message brokering and PostgreSQL for job persistence. Workers coordinate through consumer groups with acknowledgment-based processing to ensure reliable job execution.",
            challenge:
                "Background job processing requires reliable message delivery, worker coordination, failure handling, and job state persistence. The system needs to handle worker crashes, message re-delivery, and maintain job history without losing work.",
            approach: [
                {
                    title: "REDIS STREAMS AS MESSAGE BROKER",
                    description:
                        "Redis Streams provide ordered, persistent message delivery with consumer groups for coordinated worker processing and built-in acknowledgment semantics.",
                },
                {
                    title: "POSTGRESQL FOR JOB PERSISTENCE",
                    description:
                        "Job definitions, status, and results are persisted in PostgreSQL, providing durable job history and enabling retry logic independent of the message broker.",
                },
                {
                    title: "CONSUMER GROUP COORDINATION",
                    description:
                        "Workers join consumer groups where Redis distributes messages, preventing duplicate processing. Pending Entry Lists track unacknowledged messages for failure recovery.",
                },
            ],
            outcome:
                "A working distributed job queue demonstrating message-based worker coordination, acknowledgment-driven processing, and persistent job state management.",
            sections: [
                {
                    heading: "OVERVIEW",
                    body: "The Distributed Job-Queue is a backend system for processing background jobs reliably. It separates job submission from execution using Redis Streams as a message broker and PostgreSQL for durable job storage.",
                },
                {
                    heading: "PROBLEM STATEMENT",
                    body: "Many applications need to process work asynchronously—sending emails, generating reports, processing uploads. A reliable job queue must ensure jobs are not lost, are not processed twice, and can recover from worker failures.",
                },
                {
                    heading: "TECHNICAL IMPLEMENTATION",
                    body: "The system consists of three components: a job producer API, Redis Streams for message brokering, and worker processes that consume and execute jobs.",
                    bullets: [
                        "Job Producer: HTTP API that creates jobs in PostgreSQL and publishes messages to Redis Streams.",
                        "Redis Streams: Ordered message log with consumer groups for distributed processing. Workers XREADGROUP to receive messages and XACK to acknowledge completion.",
                        "Workers: Node.js processes that join consumer groups, execute job logic, update PostgreSQL with results, and acknowledge messages.",
                        "Failure Handling: Unacknowledged messages in the Pending Entry List can be claimed by other workers after a timeout using XCLAIM.",
                    ],
                },
                {
                    heading: "ENGINEERING CHALLENGES",
                    body: "Coordinating multiple workers without duplicate processing required careful use of Redis consumer groups. Handling worker crashes meant implementing pending message recovery with XPENDING and XCLAIM. Maintaining consistency between Redis message state and PostgreSQL job state required consideration of failure modes at each step.",
                },
                {
                    heading: "TECHNICAL DECISIONS & TRADE-OFFS",
                    body: "Redis Streams were chosen over Redis Pub/Sub because Streams provide message persistence, consumer groups, and acknowledgment semantics. PostgreSQL was chosen for job persistence over Redis alone because it provides durable storage, complex queries on job history, and transactional guarantees. The trade-off is added latency from dual-write to both Redis and PostgreSQL.",
                },
                {
                    heading: "KEY LEARNINGS",
                    body: "Building a job queue from Redis Streams primitives provided deep understanding of distributed message processing patterns. The Pending Entry List mechanism in Redis Streams proved effective for failure recovery without requiring a separate dead-letter queue for most scenarios.",
                },
            ],
        },

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
