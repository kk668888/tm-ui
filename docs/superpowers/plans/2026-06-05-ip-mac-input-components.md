# IP And MAC Input Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `TmIpInput` and `TmMacInput` components with parser-backed normalization, structured parse output, validation state events, tests, and docs.

**Architecture:** Keep parsing and normalization in focused parser modules under each component directory, and keep Vue components as thin wrappers around `a-input`. Implement behavior test-first: parser unit tests first, then component interaction tests, then minimal production code to satisfy them. Export the new components from the component index and package entry, and add standalone docs pages under `docs/components/`.

**Tech Stack:** Vue 3, TypeScript, ant-design-vue, Vue Test Utils, Vitest, VitePress

---

### Task 1: Define file boundaries

**Files:**
- Create: `src/components/tm-ip-input/TmIpInput.vue`
- Create: `src/components/tm-ip-input/component.ts`
- Create: `src/components/tm-ip-input/index.ts`
- Create: `src/components/tm-ip-input/parser.ts`
- Create: `src/components/tm-ip-input/types.ts`
- Create: `src/components/tm-ip-input/parser.test.ts`
- Create: `src/components/tm-ip-input/TmIpInput.test.ts`
- Create: `src/components/tm-mac-input/TmMacInput.vue`
- Create: `src/components/tm-mac-input/component.ts`
- Create: `src/components/tm-mac-input/index.ts`
- Create: `src/components/tm-mac-input/parser.ts`
- Create: `src/components/tm-mac-input/types.ts`
- Create: `src/components/tm-mac-input/parser.test.ts`
- Create: `src/components/tm-mac-input/TmMacInput.test.ts`
- Create: `docs/components/ip-input.md`
- Create: `docs/components/mac-input.md`
- Modify: `src/components/index.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Keep parser logic isolated from Vue components**
- [ ] **Step 2: Keep each component directory self-contained with parser, types, tests, and wrapper exports**
- [ ] **Step 3: Keep docs isolated per component page under `docs/components/`**

### Task 2: Write failing parser tests

**Files:**
- Test: `src/components/tm-ip-input/parser.test.ts`
- Test: `src/components/tm-mac-input/parser.test.ts`

- [ ] **Step 1: Add IP parser tests for single IP, multi-IP with mixed separators, range, segment, invalid trailing separator, and invalid mixed syntax**
- [ ] **Step 2: Add MAC parser tests for raw 12 hex chars, dash-separated, colon-separated, uppercase normalization, invalid length, and invalid hex content**
- [ ] **Step 3: Run `pnpm test:run -- src/components/tm-ip-input/parser.test.ts src/components/tm-mac-input/parser.test.ts` and verify failures are due to missing parser modules**

### Task 3: Implement minimal parser code

**Files:**
- Create: `src/components/tm-ip-input/parser.ts`
- Create: `src/components/tm-ip-input/types.ts`
- Create: `src/components/tm-mac-input/parser.ts`
- Create: `src/components/tm-mac-input/types.ts`

- [ ] **Step 1: Implement IP normalization and mode detection with support for commas, semicolons, Chinese separators, and newline-delimited lists**
- [ ] **Step 2: Implement IPv4 octet validation, range ordering validation, segment validation, and normalized output generation**
- [ ] **Step 3: Implement MAC normalization from raw, dash, or colon input to uppercase colon-separated output**
- [ ] **Step 4: Run `pnpm test:run -- src/components/tm-ip-input/parser.test.ts src/components/tm-mac-input/parser.test.ts` and verify all parser tests pass**

### Task 4: Write failing component tests

**Files:**
- Test: `src/components/tm-ip-input/TmIpInput.test.ts`
- Test: `src/components/tm-mac-input/TmMacInput.test.ts`

- [ ] **Step 1: Add `TmIpInput` tests for class forwarding, blur normalization, and `update:parsed` / `update:status` / `update:valid` emissions**
- [ ] **Step 2: Add `TmMacInput` tests for class forwarding, blur normalization to colon-uppercase format, and validation event emissions**
- [ ] **Step 3: Run `pnpm test:run -- src/components/tm-ip-input/TmIpInput.test.ts src/components/tm-mac-input/TmMacInput.test.ts` and verify failures are due to missing component modules**

### Task 5: Implement Vue components and exports

**Files:**
- Create: `src/components/tm-ip-input/TmIpInput.vue`
- Create: `src/components/tm-ip-input/component.ts`
- Create: `src/components/tm-ip-input/index.ts`
- Create: `src/components/tm-mac-input/TmMacInput.vue`
- Create: `src/components/tm-mac-input/component.ts`
- Create: `src/components/tm-mac-input/index.ts`
- Modify: `src/components/index.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Implement `TmIpInput` as a thin `a-input` wrapper using parser output for `modelValue`, `parsed`, `status`, and `valid` emissions**
- [ ] **Step 2: Implement `TmMacInput` with the same event contract and blur-time normalization**
- [ ] **Step 3: Export both components and their public types from component and package entry points**
- [ ] **Step 4: Run `pnpm test:run -- src/components/tm-ip-input/TmIpInput.test.ts src/components/tm-mac-input/TmMacInput.test.ts src/components/tm-ip-input/parser.test.ts src/components/tm-mac-input/parser.test.ts` and verify all tests pass**

### Task 6: Add docs and run validation

**Files:**
- Create: `docs/components/ip-input.md`
- Create: `docs/components/mac-input.md`

- [ ] **Step 1: Document accepted input formats, normalized `v-model` output, and structured parse output for both components**
- [ ] **Step 2: Include at least one valid and one invalid example per component**
- [ ] **Step 3: Run `pnpm test:run -- src/components/tm-ip-input/parser.test.ts src/components/tm-mac-input/parser.test.ts src/components/tm-ip-input/TmIpInput.test.ts src/components/tm-mac-input/TmMacInput.test.ts`**
- [ ] **Step 4: Run `pnpm build`**
