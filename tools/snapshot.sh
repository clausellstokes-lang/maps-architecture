#!/bin/sh
# Timed backup of the Maps program's working files (owner, 2026-09-29: "regularly save progress so in case another
# interruption happens, we can assure smooth resume"). Copies docs/ (without docs/archive, itself a backup), workflows/
# and tools/ into backups/snap-<time>.tar.gz and keeps the newest KEEP snapshots. research/ and captures/ are static
# inputs and are not copied. Restore one file:  tar -xzf backups/snap-<time>.tar.gz docs/volumes/V04-underground.md
set -e
cd "$(dirname "$0")/.."
KEEP=${KEEP:-24}
TS=$(date '+%Y-%m-%d_%H%M')
OUT="backups/snap-$TS.tar.gz"
tar -czf "$OUT" --exclude 'docs/archive' docs workflows tools
ls -1t backups/snap-*.tar.gz | tail -n +$((KEEP + 1)) | while read f; do rm -f "$f"; done
printf '%s %s (%s); %s snapshots kept\n' "$(date '+%Y-%m-%d %H:%M')" "$OUT" "$(du -h "$OUT" | cut -f1)" "$(ls -1 backups/snap-*.tar.gz | wc -l | tr -d ' ')"
