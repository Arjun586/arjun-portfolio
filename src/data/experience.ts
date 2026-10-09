export const experienceHero = {
    label: "MY GROWTH",
    title: "EXPERIENCE",
    roleLine: "ARJUN",
    roleLineAccent: "CSE STUDENT • FULL-STACK DEVELOPMENT & BACKEND SYSTEMS",
    bio: "Building projects, exploring backend engineering, and learning how reliable software systems are designed, deployed, and maintained.",
    quote: "EXPERIENCE IS THE NAME EVERYONE GIVES TO THEIR MISTAKES.",
} as const;

export type WorkExperience = {
    id: string;
    role: string;
    company: string;
    duration: string;
    location: string;
    description: string;
    contributions: string[];
};

export const workExperience: WorkExperience[] = [
    {
        id: "unfazed-ai",
        role: "Full Stack Developer",
        company: "Unfazed AI",
        duration: "December 2025 – July 2026",
        location: "Noida, India",
        description:
            "Contributed to UI/UX improvements on the Unfazed AI website and developed DocStream AI's document search, filtering, urgency triage, and event-driven real-time backend systems.",
        contributions: [
            "Improved website UI/UX and interface consistency.",
            "Developed REST APIs and MongoDB aggregation pipelines with compound text-search indexes for document filtering and urgency triage.",
            "Implemented real-time updates using MongoDB Change Streams and WebSockets, including resume-token recovery to avoid polling and improve recovery after interruptions.",
        ],
    },
];

export const growthTimeline = [
    {
        period: "2026 – PRESENT",
        title: "ENGINEERING & INFRASTRUCTURE",
        bullets: ["Docker", "CI/CD Pipelines", "Deployment Workflows", "System Design"],
        description:
            "Exploring infrastructure, automation, and modern engineering practices.",
    },
    {
        period: "2025 – 2026",
        title: "BACKEND & SYSTEMS",
        bullets: ["Node.js & Express", "PostgreSQL & Prisma", "Authentication & Authorization", "REST APIs"],
        description:
            "Focused on backend engineering, APIs, and scalable architecture.",
    },
    {
        period: "2024 – 2025",
        title: "FULL-STACK DEVELOPMENT",
        bullets: ["React & TypeScript", "MERN Applications", "State Management", "Responsive Interfaces"],
        description:
            "Expanded into full-stack development, building larger and more complex applications.",
    },
    {
        period: "2023 – 2024",
        title: "FOUNDATIONS",
        bullets: ["HTML & CSS", "JavaScript", "Git & GitHub", "Programming Fundamentals"],
        description:
            "Built my first websites and established a foundation in web development.",
    },
] as const;

export const currentlyExploring = [
    {
        title: "BACKEND ENGINEERING",
        description: "Designing APIs and scalable services.",
    },
    {
        title: "DOCKER",
        description: "Containerization and development workflows.",
    },
    {
        title: "CI/CD",
        description: "Deployment automation and software delivery.",
    },
    {
        title: "SYSTEM DESIGN",
        description: "Learning how scalable systems are structured.",
    },
    {
        title: "AI APPLICATIONS",
        description: "Exploring practical AI integration.",
    },
    {
        title: "DEVELOPER TOOLING",
        description: "Improving workflows, tooling, and productivity.",
    },
] as const;

export const highlights = [
    {
        number: "01",
        text: "Built multiple full-stack applications using modern web technologies.",
    },
    {
        number: "02",
        text: "Participated in hackathons and collaborative development projects.",
    },
    {
        number: "03",
        text: "Exploring Docker, CI/CD, and modern deployment workflows.",
    },
] as const;

export const experienceSnapshot = [
    { value: "B.TECH", label: "CSE (AI & ML)", icon: "code" as const },
    { value: "OPEN", label: "TO INTERNSHIPS", icon: "graduation" as const },
    { value: "15+", label: "PROJECTS BUILT", icon: "folder" as const },
    { value: "3+", label: "YEARS CODING", icon: "github" as const },
] as const;