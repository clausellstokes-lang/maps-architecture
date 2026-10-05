#!/usr/bin/env bash
# Autosave (owner, 2026-10-05: "make sure you're regularly updating the github repository"; the machine can lose power).
# Run every ~10 minutes by the session (CronCreate). Never forces, never stages item work (the flow's steward commits
# checked items through tools/flow_stage.mjs):
# 1. commits the session's append-only lane logs (docs/lane-events.log, docs/lanes-snapshots.jsonl) when nothing else is staged;
# 2. pushes main when it is ahead of origin and not behind.
set -u
cd "$(dirname "$0")/.." || exit 1
ts=$(date '+%Y-%m-%d %H:%M')
[ -e .git/index.lock ] && { echo "autosave $ts: index locked (a commit in progress), skipped"; exit 0; }
git fetch -q origin main 2>/dev/null
if [ -z "$(git diff --cached --name-only)" ]; then
  logs=$(git status --porcelain -- docs/lane-events.log docs/lanes-snapshots.jsonl | awk '{print $2}')
  if [ -n "$logs" ]; then
    git add -- $logs && git commit -q -m "autosave $ts: lane logs" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- $logs && echo "autosave $ts: committed lane logs"
  fi
fi
ahead=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 0)
behind=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0)
if [ "$behind" -gt 0 ]; then echo "autosave $ts: main is behind origin by $behind; not pushing"
elif [ "$ahead" -gt 0 ]; then git push -q origin HEAD:main && echo "autosave $ts: pushed $ahead commit(s)"
else echo "autosave $ts: up to date"; fi
