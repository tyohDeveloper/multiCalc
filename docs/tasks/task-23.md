---
title: Unique widget test IDs
---
# Unique Widget Test IDs

## What & Why
Add a stable `data-testid` attribute to every interactive UI widget (starting with keyboard buttons) so that test cases can select any widget unambiguously without relying on text content, CSS class, or DOM position. This is the foundation for reliable UI test authoring across multiple calculators.

## Done looks like
- Every `KeyButton` renders a `data-testid` attribute in the DOM.
- IDs follow the format: `calc-hp48gx__sec-<sectionId>__row-<rowId>__key-<keyId>`, using the stable IDs already present in `hp48Keys.json`.
- An optional `data-key-op` attribute is also present on each button (e.g., `data-key-op="RECIPROCAL"`) for diagnostic readability, but is not the primary selector.
- An automated uniqueness test verifies that no two widgets share the same `data-testid`.
- The scheme is namespaced by calculator (`calc-hp48gx`) so future calculators can coexist without collision.
- No visual or runtime behavior changes — the IDs are purely structural/metadata.

## Out of scope
- Applying IDs to non-button widgets (dropdowns, text entry) — those come later as those widgets are built.
- Any runtime use of the IDs beyond rendering them as HTML attributes.

## Tasks
1. **Compute composite test ID in KeyGrid** — For each key rendered, compose `data-testid` from the calculator identifier plus the section, row, and key IDs already available in `hp48Keys.json`. Pass it as a `testId` prop to `KeyButton`.
2. **Render test ID on KeyButton** — Accept `testId` prop and render it as `data-testid` (and `data-key-op` for the logical op) on the underlying `<button>` element.
3. **Automated uniqueness test** — Add a test that traverses the key data and asserts every composed `data-testid` value is unique across the full HP 48GX key map.

## Relevant files
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/logic/ui/buildKeyButtonViewModel.ts`
- `artifacts/rpn-calc/src/data/hp48Keys.json`