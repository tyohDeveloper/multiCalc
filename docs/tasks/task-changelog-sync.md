# Task Changelog Sync to docs/tasks

## What & Why
After every task merge, copy all task plan files from `.local/tasks/` into `docs/tasks/` so they are tracked by Git and form a permanent changelog. `.local/` is not committed to version control, so the only way to persist task history in GitHub is to mirror the files to a committed directory.

## Done looks like
- A `docs/tasks/` directory exists and is committed to the repo.
- After every task merge, all `.md` files from `.local/tasks/` are synced into `docs/tasks/`.
- New or updated task files appear in `git status` / `git log` after a merge, ready to be pushed to GitHub.

## Out of scope
- Automatically pushing to GitHub (the user handles `git push`).
- Deleting files from `docs/tasks/` when tasks are removed from `.local/tasks/`.

## Tasks
1. **Create `docs/tasks/` and seed it** — Create the `docs/tasks/` directory and copy all existing `.md` files from `.local/tasks/` into it.
2. **Update post-merge script** — Add a step to `scripts/post-merge.sh` that syncs (copies) all files from `.local/tasks/` to `docs/tasks/` so the copy runs automatically after every future merge.

## Relevant files
- `scripts/post-merge.sh`
