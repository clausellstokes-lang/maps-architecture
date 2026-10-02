#!/bin/sh
# Cloud-session safeguard: the container is ephemeral, so commit the program's working folders and push them to the
# session's branch (never main). The cloud counterpart of tools/snapshot.sh.
#   sh tools/cloud-checkpoint.sh            # one checkpoint
#   sh tools/cloud-checkpoint.sh loop 3     # three checkpoints, 30 minutes apart (fits a 2-hour background task)
cd "$(dirname "$0")/.." || exit 1
BRANCH=$(git rev-parse --abbrev-ref HEAD)
[ "$BRANCH" = main ] && { echo "on main: refusing to checkpoint"; exit 1; }

checkpoint() {
  git add -A docs workflows tools session-state
  if git diff --cached --quiet; then echo "$(date -u '+%Y-%m-%d %H:%M') nothing to commit"; else
    n=$(git diff --cached --name-only | wc -l | tr -d ' ')
    landed=$(grep -c "coherence/.* LANDED" docs/lane-events.log)
    git commit -q -F - <<EOF
Coherence pass checkpoint $(date -u '+%Y-%m-%d %H:%M') UTC: $n files

Work in progress saved from the cloud session; $landed coherence LANDED lines in
docs/lane-events.log so far.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BhWAhfTQqibtunMkWpxEQj
EOF
    echo "$(date -u '+%Y-%m-%d %H:%M') committed $n files"
  fi
  i=0; for wait in 2 4 8 16; do
    git push -q -u origin "$BRANCH" 2>/dev/null && { echo "pushed $BRANCH"; return 0; }
    i=$((i + 1)); sleep "$wait"
  done
  echo "push FAILED after $i tries"
}

if [ "$1" = loop ]; then
  k=0; while [ "$k" -lt "${2:-3}" ]; do sleep 1800; checkpoint; k=$((k + 1)); done
else
  checkpoint
fi
