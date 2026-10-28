#!/usr/bin/env bash
# The fusion-run RANGE driver for a runner container (the managing session, J588, 2026-10-28): seeds FROM..TO of the
# 1 000-seed fusion run (N-52 (6), M0 §16 (c)) on the tree 4abd334a in 2-seed chunks through the harness's own task
# pool (driver/chunk.mts); each finished chunk is gzipped and pushed to the runner's chunk branch wip/fusion-chunks-<R>
# at once, so a lost container loses at most the chunk in flight. The repository's SessionStart hook re-launches this
# script after a container restart; it skips the chunks already on disk. The range file: "<R> <FROM> <TO>".
set -u
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
D=/home/user/maps-scratch/fusion-1000
C=/home/user/maps-scratch/fusion-chunks
read -r R FROM TO < "$D/range"
TSX="corepack pnpm exec tsx --conditions=plat-source"
cd "$D/plat" || exit 1
mkdir -p "$D/chunks"
echo "$(date -u +%FT%TZ) run.sh start ($R seeds $FROM-$TO)" >> "$D/run2.log"
for from in $(seq "$FROM" 2 "$TO"); do
  f=$(printf 'chunk-%04d-0002.json' "$from")
  [ -f "$D/chunks/$f" ] && continue
  echo "$(date -u +%FT%TZ) chunk $from start" >> "$D/run2.log"
  $TSX "$D/driver/chunk.mts" "$from" 2 4 "$D/chunks" >> "$D/chunks.log" 2>&1 || { echo "$(date -u +%FT%TZ) chunk $from FAILED" >> "$D/run2.log"; echo fail > "$D/exit"; exit 2; }
  echo "$(date -u +%FT%TZ) chunk $from done" >> "$D/run2.log"
  gzip -9 -k -f "$D/chunks/$f" && cp "$D/chunks/$f.gz" "$C/" && (cd "$C" && git add "$f.gz" && git commit -qm "$R: $f" && for d in 2 4 8 16 32; do git push -q origin "wip/fusion-chunks-$R" && break || sleep $d; done) >> "$D/push.log" 2>&1
done
date -u +%FT%TZ > "$D/done"
(cd "$C" && date -u +%FT%TZ > "DONE-$R" && git add "DONE-$R" && git commit -qm "$R: done" && for d in 2 4 8 16 32; do git push -q origin "wip/fusion-chunks-$R" && break || sleep $d; done) >> "$D/push.log" 2>&1
echo "$(date -u +%FT%TZ) run.sh done ($R)" >> "$D/run2.log"
