# Document zero-based counting convention

## What & Why
A task description recently referenced "Row 3, key 0 (SIN)" but then attributed the label "HOME" to it — a label that actually belongs to the row above. The root cause was an inconsistency between 0-based and 1-based row counting within the same description. Adding an explicit, numbered convention to CONVENTIONS.md ensures all future task authors and agents apply the same counting scheme throughout.

## Done looks like
- CONVENTIONS.md has a new rule stating that all positional references (rows, keys, stack levels, registers, panes, etc.) are 0-indexed throughout — in code, JSON data, and task descriptions
- The rule includes a note that whenever a task description identifies something by both position and name/label, both must agree under 0-based counting before the description is finalised

## Out of scope
- Changing any existing code or JSON (the convention is already followed in code; this is a documentation fix only)
- Renaming or renumbering anything in existing task descriptions

## Tasks
1. Add a "Counting and Indexing" rule to `CONVENTIONS.md` specifying that all positional references are 0-indexed, with a brief example showing how to cross-check position against label.

## Relevant files
- `artifacts/rpn-calc/CONVENTIONS.md`
