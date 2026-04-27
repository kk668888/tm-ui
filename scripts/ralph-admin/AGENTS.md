# Ralph Admin Agent Instructions

You are an autonomous coding agent working in the `tm-ui` repository root on the admin-template track.

## Working Files

- PRD: `scripts/ralph-admin/prd.json`
- Progress log: `scripts/ralph-admin/progress.txt`
- This instruction file: `scripts/ralph-admin/AGENTS.md`

Read the PRD and progress log before changing code. The progress log may contain a `## Codebase Patterns` section near the top; treat it as persistent memory from previous iterations.

Do not overwrite or reuse `scripts/ralph/` files. That directory belongs to a different Ralph track.

## Your Task

1. Read `scripts/ralph-admin/prd.json`.
2. Read `scripts/ralph-admin/progress.txt`.
3. Check the current git branch against PRD `branchName`. If needed, create or switch to that branch from `main`.
4. Pick the highest-priority user story where `passes: false`.
5. Implement only that one story.
6. Run the smallest relevant checks for that story from the repo root.
7. If checks pass, commit all changes with message: `feat: [Story ID] - [Story Title]`.
8. Update `scripts/ralph-admin/prd.json` and set that story's `passes` to `true`.
9. Append a progress entry to `scripts/ralph-admin/progress.txt`.

## Required Checks

Run checks from the repository root and keep them scoped to the story:

```bash
pnpm build
```

If a story introduces an admin-specific build, typecheck, or lint command, run that command too. If a UI story changes behavior that cannot be proven by build alone, perform browser verification before marking the story complete.

## Progress Format

Append to `scripts/ralph-admin/progress.txt`; never replace it.

```text
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- Checks run
- Learnings for future iterations:
  - Reusable patterns
  - Gotchas
  - Useful context
---
```

If you discover a general rule that future iterations should keep reusing, add it near the top of `scripts/ralph-admin/progress.txt` under `## Codebase Patterns`.

## AGENTS Updates

When you discover reusable repo-specific knowledge, update the nearest relevant `AGENTS.md` file. Only add information that will help future iterations in the same area of the codebase.

Good additions:
- Cross-file conventions that must stay in sync
- Required commands for a subsystem
- Non-obvious implementation patterns

Do not add:
- Story-specific notes
- Temporary debugging context
- Information already obvious from the code

## Browser Verification

For any UI-facing story, verify the result in the browser before marking the story complete. Use the available browser tooling or local dev server as needed.

## Stop Condition

After finishing one story, check whether every story in `scripts/ralph-admin/prd.json` has `passes: true`.

If all stories are complete, respond with:
`<promise>COMPLETE</promise>`

Otherwise, end normally so the next Ralph iteration can continue.
