import type { ProjectCaseStudy } from "./types";

export const rateLimiterCaseStudy: ProjectCaseStudy = {
    eyebrow: "HIGH-THROUGHPUT TRAFFIC SHAPING",
    brief:
        "A production-grade, distributed rate-limiting engine implementing six distinct algorithmic strategies with Redis atomic operations and sub-millisecond evaluation latency.",
    challenge:
        "Prevent distributed race conditions and memory bloat under high-concurrency burst traffic while maintaining sub-millisecond evaluation latency across distributed application instances.",
    approach: [
        {
            title: "ALGORITHM SUITE",
            description:
                "Implemented Fixed Window, Sliding Window Log, Sliding Window Counter, Token Bucket, Leaky Bucket, and Sliding Window Rate Limiting.",
        },
        {
            title: "ATOMIC STATE EVALUATION",
            description:
                "Redis Lua scripting guarantees atomic get-check-increment-expire execution without client-side race conditions or distributed locking overhead.",
        },
        {
            title: "ZERO-ALLOCATION MEMORY PROFILES",
            description:
                "Engineered custom Singly Linked Lists for sliding log timestamp queues, eliminating V8 Array.shift() O(n) GC memory churn under sustained traffic.",
        },
    ],
    outcome:
        "Deterministic traffic shaping across all 6 strategies with <1ms Redis round-trip overhead, zero-leak memory stability, and verified race condition immunity under concurrent thread simulation.",
    architecture:
        "Modular middleware layer positioning algorithmic evaluators between the edge ingress and downstream business logic. Storage is abstracted between in-memory collections and distributed Redis clusters, orchestrating multi-key evaluations through single-roundtrip atomic Lua scripts.",
    mvpFocus: [
        "6 Core Rate Limiting Algorithms",
        "Atomic Redis Lua Execution (No Race Conditions)",
        "Memory Optimization (Singly Linked List vs Array.shift)",
        "Dynamic Header Injection (X-RateLimit-*)",
    ],
    sections: [
        {
            heading: "ALGORITHMIC STRATEGY COMPARISON",
            body: "Rate limiting is not one-size-fits-all. Different workloads require distinct trade-offs between memory efficiency, burst tolerance, and boundary precision. The engine implements six production algorithms to handle diverse ingress patterns.",
            table: {
                caption: "RATE LIMITING ALGORITHMS: PRODUCTION COMPARISON MATRIX",
                headers: [
                    "Algorithm",
                    "Burst Handling",
                    "Memory / Key",
                    "Boundary Precision",
                    "Redis Primitive",
                    "Primary Use Case",
                ],
                rows: [
                    [
                        "Fixed Window",
                        "Vulnerable: 2x burst at boundary",
                        "O(1) - Single integer",
                        "Coarse (Resets on clock tick)",
                        "INCR + EXPIRE",
                        "Basic bot throttling, public APIs",
                    ],
                    [
                        "Sliding Window Log",
                        "Strictly zero burst leakage",
                        "O(N) - 1 entry per request",
                        "Microsecond precision",
                        "ZADD + ZREMRANGEBYSCORE",
                        "High-security financial & auth endpoints",
                    ],
                    [
                        "Sliding Window Counter",
                        "Smooth weighted approximation",
                        "O(1) - 2 integer counters",
                        "High (~99.5% accuracy)",
                        "Multi-key Lua weighted sum",
                        "High-volume standard API rate limiting",
                    ],
                    [
                        "Token Bucket",
                        "Permits controlled burst up to capacity",
                        "O(1) - Tokens + Last Timestamp",
                        "Continuous refill calculation",
                        "Atomic Lua token decrement",
                        "API gateways, burst-tolerant webhook tiers",
                    ],
                    [
                        "Leaky Bucket",
                        "Zero burst: Constant egress rate",
                        "O(Queue Size) - Buffer list",
                        "Constant output spacing",
                        "Redis List (LPUSH + RPOP)",
                        "Downstream database write smoothing",
                    ],
                ],
            },
        },
        {
            heading: "MEMORY COMPLEXITY & GC ALLOCATION OPTIMIZATION",
            body: "In V8 runtime profiling, Naive Sliding Window Log implementations relying on JavaScript Array.shift() suffered acute performance degradation under load. Array.shift() in V8 incurs an O(n) memory copy of all subsequent array elements every time an expired timestamp is evicted. Replacing the array with a custom Singly Linked List transformed eviction into an O(1) pointer unlinking operation.",
            diagram: {
                caption: "MEMORY STRUCTURE: ARRAY.SHIFT() VS SINGLY LINKED LIST",
                ascii: `NAIVE V8 ARRAY.SHIFT() - O(N) ELEMENT COPY:
┌────────┬────────┬────────┬────────┬────────┐
│  t0    │  t1    │  t2    │  t3    │  t4    │  (Array size: N)
└────────┴────────┴────────┴────────┴────────┘
    ▲
    └─ Evict head (shift): Must re-index and copy N-1 elements in V8 memory!
       Causes heavy GC thrashing and CPU spikes at 10k req/sec.

CUSTOM SINGLY LINKED LIST - O(1) HEAD UNLINKING:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Head (t0)   │───▶ │  Node (t1)   │───▶ │  Node (t2)   │───▶ ...
└──────────────┘     └──────────────┘     └──────────────┘
       │
       └─ Evict: head = head.next  [Deterministic O(1) pointer swap]
          Zero element copying. Negligible heap allocation.`,
            },
            table: {
                caption: "TIME & SPACE ASYMPTOTIC COMPLEXITY COMPARISON",
                headers: [
                    "Data Structure / Engine",
                    "Evaluation Complexity",
                    "Eviction Complexity",
                    "Per-User Space",
                    "V8 GC Impact",
                ],
                rows: [
                    [
                        "Naive Array.shift()",
                        "O(1) append",
                        "O(N) memory copy",
                        "High (Array resizing overhead)",
                        "Frequent GC pauses under load",
                    ],
                    [
                        "Singly Linked List",
                        "O(1) append",
                        "O(1) head unlink",
                        "Low (Node pointers only)",
                        "Negligible steady-state allocation",
                    ],
                    [
                        "Redis Sorted Set (ZSET)",
                        "O(log N) insert",
                        "O(log M + M) score range",
                        "Moderate (Skip list + Dict)",
                        "Offloaded to external Redis process",
                    ],
                ],
            },
        },
        {
            heading: "ATOMIC DISTRIBUTED EXECUTION VIA REDIS LUA",
            body: "In distributed architectures with multiple API server instances, multi-step Redis interactions (GET current tokens -> evaluate limit in Node.js -> SET updated tokens) suffer critical race conditions. Two concurrent requests arriving at separate servers both read token_count = 1, both approve the request, and decrement the counter, allowing clients to breach their strict limit. The engine encapsulates state evaluation inside atomic Redis Lua scripts.",
            diagram: {
                caption: "DISTRIBUTED RACE CONDITION VS LUA ATOMICITY",
                ascii: `RACE CONDITION (MULTI-STEP NODE.JS ROUNDTRIPS):
Instance 1: ─── GET count (99) ──▶ [Safe] ─────────────── SET count (100) ──▶ ALLOW (100th)
Instance 2: ─────── GET count (99) ──▶ [Safe] ─────────────── SET count (100) ──▶ ALLOW (101st - LEAK!)

ATOMIC REDIS LUA EXECUTION (EVALSHA):
Instance 1: ─── EVALSHA script ──▶ [ATOMIC EXECUTE: Check & Incr] ──▶ ALLOW (100th)
Instance 2: ─── EVALSHA script ─────────▶ [ATOMIC EXECUTE: Check Limit] ──▶ REJECT 429 (BLOCKED)`,
            },
            codeSnippet: {
                language: "lua",
                code: `-- Sliding Window Counter: Atomic Redis Lua Evaluation
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

local clear_before = now - window
redis.call('ZREMRANGEBYSCORE', key, 0, clear_before)

local current_requests = redis.call('ZCARD', key)
if current_requests < limit then
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, math.ceil(window / 1000))
    return { 1, limit - current_requests - 1 } -- 1 = ALLOWED, remaining
else
    return { 0, 0 } -- 0 = REJECTED (HTTP 429)
end`,
            },
        },
    ],
};
