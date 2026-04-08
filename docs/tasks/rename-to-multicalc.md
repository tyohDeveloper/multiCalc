# Rename Project to MultiCalc

## What & Why
Rename the project from "RPN Calculator" / "workspace" to "MultiCalc" across all user-facing titles, the root workspace package name, artifact registrations, and documentation references. This includes the root `package.json` name so the project appears as "MultiCalc" on the Replit home screen.

## Done looks like
- The browser tab shows "MultiCalc" when the app is open
- The project appears as "MultiCalc" on the Replit home screen
- The artifact is titled "MultiCalc" in the workspace
- All documentation and task files refer to the project as "MultiCalc"
- Internal sub-package names (e.g. `@workspace/rpn-calc`) are left unchanged to avoid breaking build tooling

## Out of scope
- Renaming internal sub-package names or directory paths (`@workspace/rpn-calc`, `artifacts/rpn-calc/`)
- Any visual or UI changes to the calculator itself

## Tasks
1. Update the root `package.json` name from `"workspace"` to `"multicalc"` so the project is identified as "MultiCalc" on the Replit home screen.
2. Update the app's HTML title from "RPN Calculator" to "MultiCalc" in the calculator artifact's `index.html`.
3. Update the artifact's registered title from "RPN Calculator" to "MultiCalc" using the artifact management tooling.
4. Update any references to "RPN Calculator" or "workspace" project name in `replit.md` and task documentation files to use "MultiCalc".

## Relevant files
- `package.json`
- `artifacts/rpn-calc/index.html`
- `replit.md`
- `docs/tasks/rpn-calculator-app.md`
- `.local/tasks/rpn-calculator-app.md`
- `.local/tasks/task-1.md`
