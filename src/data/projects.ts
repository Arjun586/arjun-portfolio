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
            "Argon2",
            "Docker",
            "Tailwind CSS",
            "Zod",
            "JWT",
        ],

        caseStudy: {
            eyebrow: "DISTRIBUTED STATE SYNCHRONIZATION",
            brief:
                "A real-time collaborative infinite canvas and state synchronization engine powered by Yjs CRDTs, Hocuspocus WebSockets, and tldraw, designed to solve concurrent multi-user editing without central locks or data loss.",
            challenge:
                "Database locks destroy canvas interactivity, while last-write-wins silently discards edits. The challenge was achieving deterministic state convergence across concurrent users under network latency without central locks, UI lag, or write amplification.",
            architecture:
                "A single Node.js runtime multiplexes two protocols on port 4000: an Express REST API for identity, workspaces, and memberships, plus a Hocuspocus WebSocket server for real-time Yjs CRDT sync. The React frontend mounts a tldraw canvas backed by a local store, synchronizing bidirectionally with Yjs via origin-tagged transactions to suppress echo loops. PostgreSQL persists binary Yjs snapshots on a debounced schedule, while Redis handles ephemeral presence and collaborator awareness.",
            mvpFocus: [
                "CONFLICT-FREE CRDT SYNC",
                "ZERO-ECHO DUAL-STORE BRIDGE",
                "DEBOUNCED SNAPSHOT PERSISTENCE",
            ],
            approach: [
                {
                    title: "TWO STORES, ZERO ECHO LOOPS",
                    description:
                        "Local tldraw canvas mutations are written to Yjs with a unique local origin marker. Broadcasted updates returning with that same origin are ignored, while collaborator changes cleanly update the local store without triggering recursive sync loops.",
                },
                {
                    title: "AUTH SPLIT BY TRUST BOUNDARY",
                    description:
                        "Short-lived in-memory access tokens secure high-frequency REST and WebSocket connections, while Argon2-hashed refresh tokens stored in httpOnly cookies enable instant session revocation via PostgreSQL.",
                },
                {
                    title: "DEBOUNCED CRDT PERSISTENCE",
                    description:
                        "Canvas state is persisted to PostgreSQL 2 seconds after the last edit, throttled to a maximum frequency of once every 10 seconds, eliminating per-stroke database write amplification while preserving a tight recovery window.",
                },
            ],
            outcome:
                "A production-ready collaborative engine enabling seamless concurrent whiteboard editing with sub-50ms sync latency, zero lock contention, and deterministic offline-reconnect state reconciliation.",
            sections: [
                {
                    heading: "OVERVIEW & DISTRIBUTED STATE CHALLENGE",
                    body: "Nexus was engineered to explore the distributed systems challenges behind real-time collaborative tools like Figma and Miro. Building an infinite canvas for concurrent editors requires explicit decisions regarding consistency models, conflict resolution, and state ownership. Rather than relying on heavyweight operational transformation (OT) servers that serialize all operations, Nexus employs Conflict-free Replicated Data Types (CRDTs) to allow decentralized, mathematically guaranteed convergence.",
                },
                {
                    heading: "CONFLICT RESOLUTION VIA YJS CRDTS",
                    body: "Nexus uses Yjs to represent the collaborative canvas as a shared document. Every shape, coordinate, and text element is an entry in a CRDT map or array. When multiple users edit or move shapes at the same millisecond, Yjs uses logical clocks (vector clocks) and unique client IDs to merge mutations deterministically without a central coordinator.",
                    bullets: [
                        "Commutative and idempotent mutations guarantee identical final state regardless of message arrival order",
                        "Offline edits cleanly merge upon reconnection without overwriting collaborator changes made in the interim",
                        "Ephemeral awareness states track remote user cursors and presence without writing to persistent storage",
                    ],
                },
                {
                    heading: "PREVENTING ECHO LOOPS: TLDRAW-TO-YJS BRIDGE",
                    body: "A critical engineering hurdle was bridging tldraw's reactive in-memory state with Yjs's distributed document. A naive bidirectional listener creates an infinite echo loop: local edits update Yjs, Yjs broadcasts to the server, the server echoes back to the client, and the client treats the echo as a new edit.",
                    bullets: [
                        "Transact with origin: Local mutations are committed with doc.transact(() => { ... }, localOrigin)",
                        "Origin suppression: The Yjs update listener checks transaction origin; updates matching localOrigin are discarded immediately",
                        "Collaborator application: Updates from remote origins are selectively written to the tldraw store without re-emitting local change events",
                    ],
                },
                {
                    heading: "PERSISTENCE & WRITE AMPLIFICATION",
                    body: "Whiteboard drawing generates hundreds of micro-updates per second (cursor moves, pencil strokes, shape dragging). Writing every update directly to PostgreSQL would overwhelm connection pools and degrade disk I/O.",
                    bullets: [
                        "In-memory synchronization: Hocuspocus holds the live Yjs document in memory for sub-millisecond broadcast",
                        "Debounced snapshot writes: Persistence is scheduled 2 seconds after the last mutation, with a hard cap ensuring a write at least once every 10 seconds during continuous drawing",
                        "Compact binary storage: The complete Yjs state vector is serialized as a compressed binary buffer and stored directly in PostgreSQL",
                    ],
                },
                {
                    heading: "APPLICATION SHELL & COLLABORATION UX",
                    body: "The frontend provides a distraction-free application shell designed for productivity: a 260px collapsible sidebar with keyboard toggle (Ctrl+B), real-time WebSocket connection pulse indicators, role-based workspace member management, and instant invite link generation.",
                },
                {
                    heading: "TECHNICAL DECISIONS & KEY LEARNINGS",
                    body: "CRDTs trade slightly higher memory usage for total freedom from central locking bottlenecks. Splitting authentication into short-lived in-memory tokens and Argon2-hashed persistent refresh tokens provides security without adding latency to high-frequency WebSocket handshakes. The dual-store bridge architecture proved that third-party canvas engines can be integrated into distributed sync models cleanly when transaction origins are strictly respected.",
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
            "Algorithms",
            "Data Structures",
            "Factory Pattern",
        ],

        caseStudy: {
            eyebrow: "ALGORITHMS & BACKEND INFRASTRUCTURE",
            brief:
                "A backend infrastructure library implementing six rate-limiting algorithms from scratch with a unified interface, custom linked-list data structures, Express middleware, and 73 deterministic Vitest unit tests.",
            challenge:
                "Different workloads demand conflicting rate limits: APIs need burst tolerance, queues need uniform pacing, and caches need bounded memory. The challenge was implementing all six algorithms from scratch behind a single contract with proven complexity guarantees.",
            architecture:
                "All six algorithms adhere to a unified allow(userId) interface returning an immutable { allowed, remaining } contract. An extensible Factory Pattern instantiates the configured strategy at runtime, while a reusable Express middleware adapter intercepts HTTP requests, extracts client identifiers (IP, API key, user ID), enforces quotas, and injects standard RFC-compliant rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After).",
            mvpFocus: [
                "SIX FROM-SCRATCH ALGORITHMS",
                "O(1) LINKED-LIST QUEUE",
                "DETERMINISTIC VIRTUAL TIMERS",
            ],
            approach: [
                {
                    title: "SIX STRATEGIES, ONE CONTRACT",
                    description:
                        "Token Bucket, Leaky Bucket (Counter), Leaky Bucket (Queue), Fixed Window, Sliding Window Log, and Sliding Window Counter all implement the identical allow(userId) interface, allowing runtime swapping via one config parameter.",
                },
                {
                    title: "CUSTOM LINKED-LIST QUEUE",
                    description:
                        "Engineered a dedicated singly-linked list for the queue-based Leaky Bucket to guarantee true O(1) push and pop operations, avoiding the O(n) memory re-indexing penalties of JavaScript Array.shift().",
                },
                {
                    title: "DETERMINISTIC FAKE-TIMER SUITE",
                    description:
                        "Constructed 73 Vitest unit tests utilizing virtual timers (vi.useFakeTimers()) to validate boundary resets, token refills, and queue leaks with microsecond precision and zero test suite clock drift.",
                },
            ],
            outcome:
                "A comprehensive, fully tested backend infrastructure library providing concrete mathematical trade-offs between burst tolerance, memory overhead, and precision across all major rate-limiting paradigms.",
            sections: [
                {
                    heading: "THE SIX ALGORITHMS COMPARED",
                    body: "Every rate-limiting algorithm balances three competing attributes: burst allowance, memory consumption, and boundary precision. Implementing all six from scratch reveals their unique characteristics:",
                    bullets: [
                        "Token Bucket: Accumulates tokens at a constant refill rate up to capacity; allows controlled bursts while maintaining an average rate",
                        "Leaky Bucket (Counter): Increments water level per request and leaks at a constant rate; smooths bursts into a perfectly uniform stream",
                        "Leaky Bucket (Queue): Buffers requests in a FIFO queue and processes them at a fixed interval; enforces strict request ordering",
                        "Fixed Window Counter: Divides time into fixed intervals and increments a counter; O(1) memory but vulnerable to 2x burst spikes at window boundaries",
                        "Sliding Window Log: Stores every request timestamp in an array; 100% boundary accuracy but unbounded O(n) memory per user",
                        "Sliding Window Counter: Calculates a weighted average between previous and current window counts; O(1) memory with 99%+ boundary accuracy",
                    ],
                },
                {
                    heading: "TIME & SPACE COMPLEXITY ANALYSIS",
                    body: "A rigorous mathematical evaluation of per-request execution time and per-user memory footprint demonstrates why production systems choose different strategies:",
                    bullets: [
                        "Token Bucket: O(1) time, O(1) space (tracks tokens and lastRefill timestamp)",
                        "Leaky Bucket (Counter): O(1) time, O(1) space (tracks water level and lastLeak timestamp)",
                        "Leaky Bucket (Queue): O(k) drain time, O(n) space where n is queued requests",
                        "Fixed Window Counter: O(1) time, O(1) space (tracks count and windowStart)",
                        "Sliding Window Log: O(k) eviction time, O(n) space where n is timestamp count",
                        "Sliding Window Counter: O(1) time, O(1) space (tracks prevCount, currCount, windowStart)",
                    ],
                },
                {
                    heading: "CUSTOM DATA STRUCTURES: AVOIDING ARRAY.SHIFT()",
                    body: "In V8 (Node.js), calling Array.shift() on an array requires re-indexing every remaining element, causing an O(n) memory copy on every dequeued request. For high-throughput rate limiters, this causes severe latency spikes and garbage collection pressure.",
                    bullets: [
                        "Implemented a custom Singly Linked List with head and tail pointers",
                        "Enqueuing at tail is guaranteed O(1) with zero array resizing",
                        "Dequeuing at head is guaranteed O(1) pointer reassignment with zero element shifting",
                    ],
                },
                {
                    heading: "DETERMINISTIC TESTING WITH VIRTUAL CLOCKS",
                    body: "Testing time-dependent algorithms using real-time setTimeout makes CI/CD suites slow and flaky due to CPU jitter. This project uses Vitest's virtual timer API (vi.useFakeTimers()) across 73 unit tests.",
                    bullets: [
                        "Simulates exact millisecond token refills and window rollovers instantaneously",
                        "Verifies boundary spike resistance by advancing virtual time to 59.999s and 60.001s",
                        "Achieves 100% test coverage across algorithms, factories, data structures, and Express middleware in under 300ms total test execution",
                    ],
                },
                {
                    heading: "EXPRESS MIDDLEWARE & RFC COMPLIANCE",
                    body: "The middleware adapter wraps any factory-selected algorithm into Express request handlers. It extracts client keys from IP or headers, evaluates quotas, returns HTTP 429 Too Many Requests upon breach, and populates standard RFC headers (X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After).",
                },
                {
                    heading: "ENGINEERING TRADE-OFFS & PRODUCTION MATRIX",
                    body: "Token Bucket is optimal for public REST APIs where clients need flexibility to perform bursts. Leaky Bucket Counter is essential for protecting downstream services with rigid concurrency limits. Sliding Window Counter is the industry standard for distributed Redis caching (used by Cloudflare and Stripe) because it provides near-perfect precision with fixed O(1) memory.",
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
            "Search-engine benchmarking lab comparing PostgreSQL Trigram Search (pg_trgm), PostgreSQL Full-Text Search, and Elasticsearch across 100,000 documents (~91 MB).",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: true,

        thumbnail: "/projects/search-test.png",

        githubUrl: "https://github.com/Arjun586/search-test",

        technologies: [
            "PostgreSQL",
            "Elasticsearch",
            "TypeScript",
            "Node.js",
            "Express",
            "React",
            "Vite",
            "Tailwind CSS",
            "Trigram Search",
            "Full-Text Search",
            "Docker",
        ],

        caseStudy: {
            eyebrow: "SEARCH BENCHMARKING & INFORMATION RETRIEVAL",
            brief:
                "An empirical search benchmarking lab evaluating PostgreSQL Trigram Search (pg_trgm), PostgreSQL Full-Text Search (FTS), and Elasticsearch across 100,000 documents (~91 MB) to measure latency percentiles, linguistic morphology, and substring matching under identical application conditions.",
            challenge:
                "Single-query benchmarks hide critical real-world search trade-offs in stemming, substring matching, and pagination counts. The challenge was evaluating PostgreSQL and Elasticsearch over 100,000 documents across diverse, production-like query profiles under identical conditions.",
            architecture:
                "A streaming CSV batch importer (500 rows/batch) dual-writes into PostgreSQL 16 (generating stored tsvector columns and GIN pg_trgm indexes) and Elasticsearch 8.19 (inverted index with standard analysis). An Express API coordinates sequential execution to prevent CPU contention, feeding an interactive React dashboard with latency percentiles and full corpus match tracking.",
            mvpFocus: [
                "100K-DOCUMENT CORPUS BENCHMARK",
                "STEMMING VS SUBSTRING DIVIDE",
                "WINDOW COUNT PAGINATION COST",
            ],
            approach: [
                {
                    title: "8-SCENARIO REAL QUERY SUITE",
                    description:
                        "Evaluated 8 distinct real-world query scenarios ranging from common terms (database) to high-frequency matches (replication), plural variations (replications), and substrings (kuber, postgr).",
                },
                {
                    title: "REAL PAGINATION OVERHEAD",
                    description:
                        "Enforced full-corpus match counting (count(*) OVER () in PostgreSQL, track_total_hits: true in Elasticsearch) alongside top-5 retrieval to simulate production paginated search UIs rather than artificial early-exit scans.",
                },
                {
                    title: "SEQUENTIAL BENCHMARK PIPELINE",
                    description:
                        "Designed the benchmark runner with 10 warm-up runs followed by 100 sequential iterations per engine to eliminate OS cache and CPU core contention between databases.",
                },
            ],
            outcome:
                "Empirical proof that PostgreSQL ILIKE and FTS have nearly identical latency on standard words (~134–136 ms), while Elasticsearch is ~3x faster. Revealed that FTS uniquely triumphs on grammatical plurals via Snowball stemming, pg_trgm uniquely succeeds on substrings, and Elasticsearch only reaches a 10x advantage under high match volumes (>20k rows).",
            sections: [
                {
                    heading: "THE 8-QUERY BENCHMARK MATRIX",
                    body: "Benchmarking a single word does not reveal engine trade-offs. The lab ran 100 iterations per query across 100,000 documents (~91 MB CSV), recording end-to-end latencies:",
                    bullets: [
                        "database (Common word, 12.5k hits): ILIKE 136.12ms (7.34 QPS), FTS 133.80ms (7.47 QPS), ES 46.18ms (21.64 QPS). ES missed 599 plural-only documents due to unstemmed standard analyzer",
                        "replication (High frequency, 23.7k hits): ILIKE 464.17ms (2.15 QPS), FTS 412.87ms (2.42 QPS), ES 42.35ms (23.59 QPS). ES maintained flat latency while Postgres slowed by ~3x",
                        "replications (Plural query, singular data): ILIKE 0 matches, FTS 23,666 matches (396.26ms), ES 0 matches. FTS Snowball stemmer won decisively",
                        "container (Singular query, plural data): ILIKE 11,908 matches, FTS 11,908 matches, ES 0 matches. Confirmed ES standard analyzer limitation",
                        "containers (Plural query, plural data): All three matched 11,908 docs, proving Test 4 failure was purely morphological",
                        "artificial (Zero matches): ILIKE 81.91ms, FTS 80.11ms, ES 37.51ms. Baseline index traversal with zero heap fetching",
                        "kuber (Substring of Kubernetes): ILIKE 11,908 matches (142.03ms), FTS 0 matches, ES 0 matches. Trigram character n-grams succeeded where tokenizers failed",
                        "postgr (Substring of PostgreSQL): ILIKE 11,927 matches (130.23ms), FTS 0 matches, ES 0 matches. Confirmed trigram substring superiority",
                    ],
                },
                {
                    heading: "THE STEMMING DIVIDE: FTS SNOWBALL TRIUMPH",
                    body: "The benchmark demonstrated the crucial power of morphological stemming. When querying 'replications', the documents contained only 'replication'. PostgreSQL FTS reduced 'replications' to the root stem 'replic', matching all 23,666 documents. Because Elasticsearch was configured with the standard analyzer, it looked for exact tokens and returned 0 matches, as did ILIKE. In production, Elasticsearch requires an explicit English stemmer to achieve feature parity with PostgreSQL FTS.",
                },
                {
                    heading: "THE SUBSTRING DIVIDE: PG_TRGM SUPERPOWER",
                    body: "When searching partial words or prefixes like 'kuber' or 'postgr', both PostgreSQL FTS and Elasticsearch returned 0 matches because they tokenize on word boundaries. PostgreSQL ILIKE with pg_trgm broke the query into 3-character slices (kub, ube, ber) and matched ~11,900 documents in ~130–142 ms, proving why trigrams remain indispensable for autocomplete and SKU lookups.",
                },
                {
                    heading: "HEAP VISITS VS IN-MEMORY INVERTED INDEXES",
                    body: "As match counts scaled from 0 to 12.5k to 23.7k documents, PostgreSQL latency increased from 80ms to 134ms to 464ms. This occurs because PostgreSQL GIN indexes must perform a Bitmap Heap Scan to read table tuples and evaluate count(*) OVER (). Conversely, Elasticsearch evaluates term postings directly in memory using Roaring Bitmaps, maintaining flat 42ms latency even across 23,666 matches.",
                },
                {
                    heading: "WHY COUNT(*) OVER () MATTERS FOR BENCHMARKS",
                    body: "In real pagination (e.g. 'Showing 1–5 of 12,511 results'), the backend must compute the total count. Without count(*) OVER (), a simple LIMIT 5 terminates as soon as 5 rows are found, making PostgreSQL appear artificially instantaneous. Computing the window count exposes the true cost of large result set resolution.",
                },
                {
                    heading: "DECISION MATRIX & RECOMMENDATIONS",
                    body: "Stick with PostgreSQL FTS if your application manages articles/documents and requires relevance ranking without extra infrastructure. Pair it with pg_trgm if you require autocomplete or SKU lookups. Migrate to Elasticsearch when datasets reach millions of records or search traffic threatens transactional OLTP database performance.",
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
            "A distributed background worker engine using Redis Streams for message brokering and PostgreSQL for job persistence, featuring consumer groups, worker crash recovery, and Dead Letter Queues.",

        category: "BACKEND",
        categoryIds: ["backend"],

        featured: true,

        thumbnail: "/projects/distributed-job-queue.png",

        githubUrl: "https://github.com/Arjun586/distributed-job-queue",

        technologies: [
            "TypeScript",
            "Node.js",
            "Express",
            "Redis Streams",
            "PostgreSQL",
            "Prisma",
            "Docker",
            "Distributed Systems",
            "Worker Coordination",
        ],

        caseStudy: {
            eyebrow: "DISTRIBUTED SYSTEMS & ASYNCHRONOUS PROCESSING",
            brief:
                "A distributed background worker engine built with Redis Streams, PostgreSQL, and Prisma, featuring consumer groups, per-worker concurrency, exponential backoff with jitter, retry error classification, and a Dead Letter Queue (DLQ).",
            challenge:
                "Synchronous processing of slow background tasks degrades HTTP throughput and risks data loss on failure. The challenge was coordinating distributed workers via Redis Streams to guarantee at-least-once delivery, recover crashed jobs, and isolate failures without thundering herds.",
            architecture:
                "The platform cleanly separates job submission from job execution. An Express REST API persists job records in PostgreSQL via Prisma and publishes messages to a Redis Stream. Multiple distributed worker processes subscribe to a shared Consumer Group (XREADGROUP), process jobs concurrently, update PostgreSQL state, and acknowledge completion (XACK). Abandoned jobs are reclaimed using XPENDING and XCLAIM, while repeated failures move to a Dead Letter Queue.",
            mvpFocus: [
                "REDIS CONSUMER GROUPS",
                "CRASH RECOVERY VIA XCLAIM",
                "EXPONENTIAL BACKOFF & DLQ",
            ],
            approach: [
                {
                    title: "DUAL-STORE RELIABILITY",
                    description:
                        "Redis Streams acts as the high-throughput, ordered message broker while PostgreSQL provides durable job history, metadata querying, and relational state persistence.",
                },
                {
                    title: "AT-LEAST-ONCE DELIVERY & ACK",
                    description:
                        "Workers process jobs within consumer groups and issue XACK only upon successful completion. Unacknowledged jobs stay in the Pending Entry List (PEL) for automated crash recovery.",
                },
                {
                    title: "RESILIENT RETRY WITH JITTER",
                    description:
                        "Engineered an exponential backoff formula with randomized jitter (base * 2^attempt + jitter) paired with error classification (retryable vs non-retryable) to prevent thundering herd crashes.",
                },
            ],
            outcome:
                "A production-grade distributed task processing engine capable of concurrent worker scaling, automated crash recovery without work loss, and resilient failure isolation via a dedicated Dead Letter Queue.",
            sections: [
                {
                    heading: "SYSTEM ARCHITECTURE: DECOUPLING PRODUCERS & CONSUMERS",
                    body: "Synchronous request processing creates fragile web services: slow downstream operations hold database connections open and client timeouts cause orphaned processing. The Distributed Job Queue completely separates submission from execution: the API accepts jobs, writes initial state to PostgreSQL, queues a stream message, and immediately returns a job ID to the client.",
                },
                {
                    heading: "REDIS STREAMS AS A DISTRIBUTED MESSAGE BROKER",
                    body: "Redis Streams was selected over Redis Pub/Sub and heavyweight message brokers like RabbitMQ or Kafka. Unlike Pub/Sub, Streams are append-only logs with disk persistence, consumer group offsets, and message acknowledgment semantics, providing enterprise message broker reliability with Redis's lightweight footprint.",
                },
                {
                    heading: "WORKER COORDINATION & CRASH RECOVERY (PEL & XCLAIM)",
                    body: "Multiple worker processes join a single Redis consumer group using XREADGROUP, ensuring each message is delivered to exactly one active worker.",
                    bullets: [
                        "Pending Entry List (PEL): When a worker receives a message, Redis records it in the PEL as unacknowledged",
                        "Explicit Ack: Only after successful execution and PostgreSQL status update does the worker call XACK",
                        "Automated Crash Recovery: If a worker process crashes mid-job, a watchdog checks XPENDING for timed-out messages and calls XCLAIM to reassign the task to a healthy worker",
                    ],
                },
                {
                    heading: "RETRY CLASSIFICATION, EXPONENTIAL BACKOFF & JITTER",
                    body: "Naive retry loops can DDOS recovering downstream services (the thundering herd problem). This system implements intelligent retry mechanics:",
                    bullets: [
                        "Error Classification: Differentiates retryable errors (network timeouts, rate limits, 503s) from non-retryable errors (malformed payloads, 400s)",
                        "Exponential Backoff: Retry delay scales exponentially: delay = baseDelay * (2 ^ attempt)",
                        "Randomized Jitter: Introduces random variance into delay calculation to desynchronize retrying workers and spread server load evenly",
                    ],
                },
                {
                    heading: "DEAD LETTER QUEUE (DLQ) ARCHITECTURE",
                    body: "When a job exceeds its configured maximum retry attempts, it is classified as a poison pill. Instead of retrying indefinitely or silently dropping the task, the worker routes it to a dedicated Dead Letter Queue (DLQ) stream and marks the PostgreSQL job record as FAILED with the full error stack trace for operator inspection.",
                },
                {
                    heading: "TECHNICAL DECISIONS & KEY LEARNINGS",
                    body: "Dual-writing to PostgreSQL and Redis introduces distributed state coordination trade-offs. Persisting to PostgreSQL first guarantees durable job history before stream publishing. Worker idempotency is critical: because at-least-once delivery can redeliver messages after worker crashes, job handlers must check job state before applying side effects.",
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
