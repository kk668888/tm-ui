# IP Input Mixed Conditions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `TmIpInput` support mixed IP conditions in one input value.

**Architecture:** Keep the public parser entry `parseIpInput(raw)` and parse by top-level separators first. Each separated token is then parsed independently as a single IP, IP range, or wildcard segment; aggregate results expose `conditions` while preserving existing `mode` behavior for simple values.

**Tech Stack:** Vue 3, TypeScript, Vitest, VitePress Markdown docs.

---

### Task 1: Parser And Types

**Files:**
- Modify: `src/components/tm-ip-input/types.ts`
- Modify: `src/components/tm-ip-input/parser.ts`

- [ ] Add `TmIpInputCondition` for structured single/range/segment items.
- [ ] Add `conditions?: TmIpInputCondition[]` to `TmIpInputParsed`.
- [ ] Parse top-level separators `,` `，` `;` `；` `、` and newline.
- [ ] Validate each token independently; normalize valid mixed input to comma-separated conditions.

### Task 2: Tests

**Files:**
- Modify: `src/components/tm-ip-input/TmIpInput.test.ts`

- [ ] Cover mixed single IP, range, and segment in one input.
- [ ] Cover Chinese separators and newline normalization.
- [ ] Cover invalid mixed token error state.

### Task 3: Docs

**Files:**
- Modify: `docs/components/ip-input.md`

- [ ] Document that formats can be mixed in a single value.
- [ ] Add live mixed-condition example.
- [ ] Document `conditions` in parse result.
