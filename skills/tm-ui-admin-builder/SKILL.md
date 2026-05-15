---
name: tm-ui-admin-builder
description: Build or refactor admin pages in this repository with tm-ui as the primary UI layer. Use when working in `apps/admin` or related admin/demo surfaces, especially for layout shells, CRUD pages, tables, filters, drawers, modals, navigation, feedback, and page headers. Prefer `tm-*` components over raw `ant-design-vue`; only fall back to raw Ant subcomponents when tm-ui does not expose an equivalent wrapper or group/item primitive.
---

# TM UI Admin Builder

Use this skill when editing admin UI in this repo.

## Workflow

1. Read `src/components/index.ts` first.
2. Read `references/components.md` before changing admin UI.
3. Treat `tm-ui` as the product surface and `ant-design-vue` as an implementation detail.
4. Prefer replacing page-level `a-*` components with `tm-*` wrappers before changing styles.
5. If a required primitive is missing in tm-ui, keep the raw Ant usage as small and local as possible.

## Build Rules

- Use `tm-page-header`, `tm-breadcrumb`, `tm-menu`, `tm-tabs`, `tm-dropdown` for admin shell/navigation.
- Use `tm-form`, `tm-input`, `tm-input-password`, `tm-textarea`, `tm-select`, `tm-input-number`, `tm-switch`, `tm-date-picker`, `tm-time-picker`, `tm-upload` for forms.
- Use `tm-table` for tables. It is the default table surface for this repo.
- Use `tm-modal`, `tm-drawer`, `tm-popconfirm`, `tm-alert`, `tm-result` for overlays and stateful feedback surfaces.
- Use `TmMessage` and `TmNotification` for feedback APIs instead of `message` and `notification` from Ant.
- Use `tm-descriptions`, `tm-tag`, `tm-badge`, `tm-statistic`, `tm-card`, `tm-space`, `tm-flex` for read-only/detail surfaces.

## Allowed Fallbacks

Raw `ant-design-vue` is allowed only when tm-ui lacks the needed abstraction. Current known cases are listed in `references/components.md`.

When falling back:

1. Keep the raw Ant usage at subcomponent level only.
2. Do not introduce new raw Ant page-level containers if a tm-ui wrapper already exists.
3. Mention the wrapper gap in your final summary.

## Admin Conventions

- Keep admin pages dense, restrained, and operational rather than decorative.
- Prefer shared admin scaffolds in `apps/admin/src/components/app/`.
- When refactoring an existing admin page, convert structure to tm-ui wrappers first, then adjust spacing/styling.
- Do not mix `tm-*` and `a-*` for the same page-level role unless the fallback rule requires it.

## Validate

- Run `pnpm admin:build` after meaningful admin UI changes.
- If you add or remove a wrapper dependency pattern, update `references/components.md`.
