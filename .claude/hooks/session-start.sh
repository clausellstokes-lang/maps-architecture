#!/bin/bash
# The managing seat's long-run watchdog (the owner, 2026-10-28 02:3xZ: "Add the hook"; J578 / J580). A container
# restart kills the session's detached 1 000-seed fusion run (N-52 (6); the git worktree
# /home/user/maps-scratch/fusion-1000 and its driver/run.sh, which continues from the chunks on disk). This hook
# re-launches the driver at every SessionStart of THAT container (startup, resume, compact) when no chunk process
# is running and the run is not done. In every other container — every child's, every later session's — the
# worktree does not exist and the hook exits at once. Remove the hook (and this file) when the run's done-file
# exists and its summary has landed.
set -uo pipefail
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0
D="${FUSION_DIR:-/home/user/maps-scratch/fusion-1000}"
[ -x "$D/driver/run.sh" ] || exit 0
[ -f "$D/done" ] && exit 0
if pgrep -f '[c]hunk.mts' > /dev/null 2>&1; then exit 0; fi
IN="$(cat 2>/dev/null || true)"
SRC="$(printf '%s' "$IN" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("source","?"))' 2>/dev/null || echo '?')"
nohup setsid bash -c "$D/driver/run.sh" > "$D/run2.nohup" 2>&1 < /dev/null &
echo "$(date -u +%FT%TZ) run.sh re-launched by the session-start hook (SessionStart source: $SRC)" >> "$D/run2.log"
echo "fusion-1000: driver/run.sh re-launched by the session-start hook (source: $SRC)"
exit 0
