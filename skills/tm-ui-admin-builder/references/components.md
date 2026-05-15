# TM UI Admin Component Reference

Read this file before changing admin UI in this repo.

## Primary Admin Wrappers

These wrappers already exist and should be preferred for admin page construction:

- Shell/navigation: `TmPageHeader`, `TmBreadcrumb`, `TmMenu`, `TmTabs`, `TmDropdown`
- Forms: `TmForm`, `TmInput`, `TmInputPassword`, `TmTextarea`, `TmSelect`, `TmInputNumber`, `TmSwitch`, `TmDatePicker`, `TmTimePicker`, `TmUpload`
- Data display: `TmTable`, `TmDescriptions`, `TmTag`, `TmBadge`, `TmStatistic`, `TmCard`, `TmList`
- Overlays/feedback: `TmModal`, `TmDrawer`, `TmPopconfirm`, `TmAlert`, `TmResult`, `TmMessage`, `TmNotification`
- Layout/helpers: `TmSpace`, `TmFlex`, `TmRow`, `TmCol`, `TmDivider`, `TmEmpty`, `TmSpin`
- Tree/selectors: `TmTree`, `TmTreeSelect`, `TmTransfer`, `TmCascader`

Source of truth:

- `src/components/index.ts`
- `src/index.ts`

## Important Behavior Notes

### TmTable

- `TmTable` is backed by `vxe-table`.
- Keep using `dataSource`, `columns`, `pagination`, and `#bodyCell` patterns already used in `apps/admin`.
- Prefer `TmTable` over raw `a-table` for admin pages.

### TmForm

- `TmForm` wraps the form container.
- `TmFormItem` is available and should be preferred over raw `a-form-item`.

### TmModal / TmDrawer

- Prefer `v-model:model-value` for modal visibility.
- Use these wrappers instead of raw `a-modal` / `a-drawer` for page overlays.

### TmTree

- Prefer `@update:checked-keys` and `@update:selected-keys` instead of raw Ant tree events when possible.

## Known Wrapper Gaps

These are acceptable raw Ant fallbacks today:

- `a-radio` as child options inside `TmRadioGroup`
- Rare slot-only substructures inside wrapped components when tm-ui does not expose a dedicated primitive

Do not treat this list as permission to use raw Ant broadly. Keep fallbacks local and minimal.

## Repo-Specific Guidance

- The admin app lives in `apps/admin`.
- Shared admin scaffolds live in `apps/admin/src/components/app`.
- If you find a repeated raw Ant fallback pattern across admin pages, prefer adding a local shared wrapper or improving tm-ui instead of copying the fallback again.
