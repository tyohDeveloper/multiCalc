#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push

mkdir -p docs/tasks
cp .local/tasks/*.md docs/tasks/ 2>/dev/null || true
