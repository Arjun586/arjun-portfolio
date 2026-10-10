export type CaseStudyTable = {
    caption?: string;
    headers: string[];
    rows: (string | number)[][];
};

export type CaseStudyDiagram = {
    caption?: string;
    ascii: string;
};

export type CaseStudySection = {
    heading: string;
    body: string;
    bullets?: string[];
    codeSnippet?: { language: string; code: string };
    table?: CaseStudyTable;
    diagram?: CaseStudyDiagram;
};

export type ProjectCaseStudy = {
    eyebrow: string;
    brief: string;
    challenge: string;
    approach: { title: string; description: string }[];
    outcome: string;
    architecture?: string;
    mvpFocus?: string[];
    sections?: CaseStudySection[];
};
