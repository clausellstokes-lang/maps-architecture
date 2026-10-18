#!/usr/bin/env bash
# WIP snapshot (the J250 recipe's second half, rebuilt for the cloud session, J251): copies the WHOLE working tree —
# unchecked item work included — onto the branch wip/cloud-autosave through a temporary index, so a lost container
# loses nothing. Never touches main, its index or its working tree; the branch is a backup, NEVER merged into main
# (checked work reaches main only through tools/flow_stage.mjs). Restore on a new machine:
#   git fetch origin wip/cloud-autosave && git checkout FETCH_HEAD -- plat docs/lanes.json && git reset -q
# Run every ~10 minutes with tools/autosave.sh. Prints one line.
set -u
cd "$(dirname "$0")/.." || exit 1
BR=${WIP_BRANCH:-wip/cloud-autosave}
ts=$(date -u '+%Y-%m-%dT%H:%M:%SZ')
[ -e .git/index.lock ] && { echo "wip $ts: index locked (a commit in progress), skipped"; exit 0; }
head=$(git rev-parse HEAD)
tmp=$(mktemp "${TMPDIR:-/tmp}/wip-index.XXXXXX") || exit 1
trap 'rm -f "$tmp"' EXIT
GIT_INDEX_FILE="$tmp" git read-tree "$head" || exit 1
GIT_INDEX_FILE="$tmp" git add -A -- . || exit 1            # honours .gitignore (node_modules, dist, captures, …)
tree=$(GIT_INDEX_FILE="$tmp" git write-tree) || exit 1
prev=$(git rev-parse -q --verify "refs/remotes/origin/$BR" 2>/dev/null || git rev-parse -q --verify "refs/heads/$BR" 2>/dev/null || true)
if [ -n "$prev" ] && [ "$(git rev-parse "$prev^{tree}")" = "$tree" ] && [ "$(git rev-parse "$prev^")" = "$head" ]; then
  echo "wip $ts: unchanged since the last snapshot ($prev on main ${head:0:8})"; exit 0
fi
commit=$(printf 'WIP autosave %s on main %s (unchecked work; never merge into main)\n' "$ts" "$head" | git commit-tree "$tree" -p "$head") || exit 1
git update-ref "refs/heads/$BR" "$commit"
if git push -q --force origin "refs/heads/$BR:refs/heads/$BR" 2>/dev/null; then
  echo "wip $ts: ${commit:0:8} on main ${head:0:8} pushed to $BR ($(git diff --shortstat "$head" "$commit" | sed 's/^ //'))"
else
  echo "wip $ts: ${commit:0:8} written locally on $BR; the push FAILED (retry on the next tick)"
fi
