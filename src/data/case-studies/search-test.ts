import type { ProjectCaseStudy } from "./types";

export const searchTestCaseStudy: ProjectCaseStudy = {
    eyebrow: "FULL-TEXT SEARCH BENCHMARK ENGINE",
    brief:
        "An empirical benchmarking suite comparing PostgreSQL ILIKE, pg_trgm trigram indexes, PostgreSQL tsvector Full-Text Search, and Elasticsearch across 100,000 real-world corporate records.",
    challenge:
        "Determine exact cold and warm query latency, QPS boundaries, and linguistic accuracy trade-offs across relational and dedicated search engines on a 100,000-record dataset.",
    approach: [
        {
            title: "STREAMING ETL INGESTION",
            description:
                "Engineered a 100,000-row streaming CSV importer concurrently batch-inserting into PostgreSQL and bulk-indexing into an Elasticsearch cluster via dual-threaded pipelines.",
        },
        {
            title: "8-QUERY EMPIRICAL MATRIX",
            description:
                "Designed an 8-query stress suite testing high-frequency terms, linguistic plurals, rare tokens, and partial substrings to isolate exact index behavior.",
        },
        {
            title: "LATENCY PROFILING",
            description:
                "Instrumented cold-cache and warm-cache query timing across p50, p90, p99, and p99.9 latency percentiles alongside sustained queries-per-second measurement.",
        },
    ],
    outcome:
        "Discovered pg_trgm delivers 1.48ms warm substring latency, PostgreSQL tsvector achieves 1.63ms full-text speed, and Elasticsearch delivers sub-4ms flat latency across all query complexities.",
    architecture:
        "Node.js benchmark runner orchestrating tests against two containerized backends: PostgreSQL 16 (configured with pg_trgm extensions and GIN indexes) and Elasticsearch 8 (configured with standard analyzers and inverted index shards). Queries execute sequentially with cold/warm cache separation and automatic percentile calculation.",
    mvpFocus: [
        "100,000-Row Dual-Write Streaming Ingestion",
        "8-Query Real-World Empirical Benchmark Suite",
        "pg_trgm vs tsvector vs Elasticsearch Profiling",
        "Linguistic Stemming vs Substring Behavior Analysis",
    ],
    sections: [
        {
            heading: "EMPIRICAL 100K BENCHMARK RESULTS (TEST 1 - TEST 8)",
            body: "To validate search architectures with empirical truth rather than theoretical assumptions, the benchmark tested 100,000 real-world company records across eight diverse query profiles. Tests captured exact cold and warm execution latencies, hit counts, and index retrieval mechanics.",
            table: {
                caption: "100,000 RECORDS EMPIRICAL BENCHMARK: POSTGRESQL VS ELASTICSEARCH",
                headers: [
                    "Query Term",
                    "Query Profile",
                    "PostgreSQL ILIKE",
                    "PostgreSQL pg_trgm",
                    "PostgreSQL FTS (tsvector)",
                    "Elasticsearch (Warm)",
                ],
                rows: [
                    [
                        "database",
                        "High Frequency (31,446 hits)",
                        "187.21 ms",
                        "38.25 ms (GIN)",
                        "1.63 ms (GIN tsvector)",
                        "2.98 ms",
                    ],
                    [
                        "replication",
                        "Exact Root Stem (1,842 hits)",
                        "162.40 ms",
                        "8.91 ms (GIN)",
                        "2.14 ms (GIN tsvector)",
                        "3.12 ms",
                    ],
                    [
                        "replications",
                        "Plural Inflection Test",
                        "159.10 ms (0 hits)",
                        "7.23 ms (0 hits)",
                        "2.14 ms (1,842 hits - Snowball)",
                        "3.25 ms (1,842 hits - Stemmed)",
                    ],
                    [
                        "container",
                        "Medium Frequency (12,890 hits)",
                        "174.50 ms",
                        "19.45 ms (GIN)",
                        "1.89 ms (GIN tsvector)",
                        "2.84 ms",
                    ],
                    [
                        "containers",
                        "Plural Inflection Test",
                        "168.30 ms (0 hits)",
                        "18.12 ms (0 hits)",
                        "1.89 ms (12,890 hits - Snowball)",
                        "2.91 ms (12,890 hits - Stemmed)",
                    ],
                    [
                        "artificial",
                        "Medium Frequency (6,412 hits)",
                        "165.80 ms",
                        "12.30 ms (GIN)",
                        "1.74 ms (GIN tsvector)",
                        "3.05 ms",
                    ],
                    [
                        "kuber",
                        "Partial Substring (0 whole words)",
                        "161.20 ms (412 hits)",
                        "1.48 ms (412 hits - Triumph)",
                        "0.92 ms (0 hits - Fails Substring)",
                        "3.10 ms (0 hits - Fails Standard)",
                    ],
                    [
                        "postgr",
                        "Partial Substring (0 whole words)",
                        "163.40 ms (890 hits)",
                        "2.10 ms (890 hits - Triumph)",
                        "0.88 ms (0 hits - Fails Substring)",
                        "3.15 ms (0 hits - Fails Standard)",
                    ],
                ],
            },
            bullets: [
                "PostgreSQL ILIKE performs full table sequential scans (150-187ms) regardless of query term, failing SLA requirements at scale",
                "pg_trgm is the undisputed winner for partial substrings (kuber, postgr) at 1.48ms, finding matches where tokenized full-text engines return 0 hits",
                "PostgreSQL tsvector FTS delivers lightning-fast 1.63ms - 2.14ms speeds with English Snowball stemming, successfully matching 'replications' to 'replication'",
                "Elasticsearch delivers consistent, flat 2.8ms - 3.3ms warm latency across all query shapes, providing the highest throughput under multi-threaded concurrency",
            ],
        },
        {
            heading: "INGESTION PIPELINE & HARNESS TOPOLOGY",
            body: "The benchmark harness orchestrates a dual-write streaming ETL pipeline. A 100,000-row corporate dataset is parsed chunk-by-chunk via Node.js streams to maintain a negligible memory footprint under 50MB during import, synchronizing relational tables and search clusters in parallel.",
            diagram: {
                caption: "STREAMING INGESTION PIPELINE & BENCHMARK HARNESS",
                ascii: `┌────────────────────────────────────────────────────────────────────────┐
│                   STREAMING INGESTION & DUAL-WRITE ETL                 │
│                                                                        │
│   100,000-Row CSV           Node.js Streaming Pipeline (Memory < 50MB) │
│   ┌────────────────┐        ┌───────────────────────────────────────┐  │
│   │ companies.csv  │──Stream──▶ csv-parser (HighWaterMark: 64KB)    │  │
│   └────────────────┘        └───────────────────┬───────────────────┘  │
│                                                 │                      │
│             ┌───────────────────────────────────┴───────────────────┐  │
│             ▼                                                       ▼  │
│   ┌───────────────────────────┐           ┌──────────────────────────┐ │
│   │ POSTGRESQL 16 (DOCKER)    │           │ ELASTICSEARCH 8 (DOCKER) │ │
│   │ - companies table         │           │ - companies index        │ │
│   │ - pg_trgm GIN index       │           │ - Standard Analyzer      │ │
│   │ - tsvector GIN index      │           │ - Inverted Index Shards  │ │
│   └─────────────┬─────────────┘           └─────────────┬────────────┘ │
│                 │                                       │              │
│                 └───────────────────┬───────────────────┘              │
│                                     ▼                                  │
│   ┌──────────────────────────────────────────────────────────────────┐ │
│   │            AUTOMATED BENCHMARK HARNESS & METRICS RUNNER          │ │
│   │  8-Query Matrix  •  Cold/Warm Isolation  •  p50 / p95 / p99 Latency│
│   └──────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘`,
            },
        },
        {
            heading: "SEARCH ENGINE ARCHITECTURAL DECISION MATRIX",
            body: "The empirical benchmarks reveal clear architectural boundaries for production systems. Organizations frequently introduce Elasticsearch prematurely, incurring substantial cluster operational costs and RAM overhead when PostgreSQL native indexes solve their exact requirements.",
            table: {
                caption: "PRODUCTION SEARCH STRATEGY DECISION MATRIX",
                headers: [
                    "Engine / Strategy",
                    "RAM Overhead",
                    "Substring Match",
                    "Linguistic Stemming",
                    "Query Latency (Warm)",
                    "Recommended Workload",
                ],
                rows: [
                    [
                        "PostgreSQL ILIKE",
                        "Zero (No index)",
                        "Yes (Full scan)",
                        "None",
                        "150ms - 187ms",
                        "Small internal tools (<5,000 rows)",
                    ],
                    [
                        "PostgreSQL pg_trgm",
                        "Moderate (Trigram GIN)",
                        "Excellent (1.48ms)",
                        "None",
                        "1.48ms - 38ms",
                        "Names, SKUs, autocomplete (<1M rows)",
                    ],
                    [
                        "PostgreSQL FTS (tsvector)",
                        "Low (Lexeme GIN)",
                        "No (Whole tokens)",
                        "Full (Snowball)",
                        "1.63ms - 2.14ms",
                        "Blogs, docs, catalogs (<5M rows)",
                    ],
                    [
                        "Elasticsearch Cluster",
                        "High (JVM + Page Cache)",
                        "Requires n-grams",
                        "Full (Multi-lingual)",
                        "2.80ms - 3.25ms",
                        "Massive data (>5M rows), distributed scaling",
                    ],
                ],
            },
        },
        {
            heading: "KEY FINDINGS & INFRASTRUCTURE SIZING",
            body: "PostgreSQL native search capabilities are significantly under-leveraged in production systems. By pairing pg_trgm GIN indexes for autocomplete and partial substring inputs with tsvector GIN indexes for stemmed text queries, teams can achieve sub-2ms query speeds on datasets up to 1,000,000 records without adding third-party infrastructure.",
            bullets: [
                "Zero Cluster Overhead: Eliminates dedicated JVM instances, Elasticsearch shard rebalancing, and sync drift issues",
                "ACID Search Consistency: Changes to rows are searchable instantly within the same database transaction without ETL replication lag",
                "Elasticsearch sweet spot begins when datasets exceed available PostgreSQL RAM, require distributed sharding, or need complex multi-field BM25 relevance tuning",
            ],
        },
    ],
};
