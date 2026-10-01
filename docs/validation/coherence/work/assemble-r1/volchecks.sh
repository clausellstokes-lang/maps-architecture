#!/bin/sh
# volchecks.sh OUTDIR — (coherence/assemble-r1, P5 (b')) doc_checks.py over each volume and INDEX, whole document, untouched
# (snapshot copy, S2 against the untouched base) and final (the installed file, S2 against the installed base), in parallel.
# Information for the volume seats' proposed allow rows; volume runs are not held to exit 0.
OUT=$1; SCR=/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence
mkdir -p "$OUT"; cd /home/user/maps-architecture
for f in docs/volumes/V*.md docs/volumes/INDEX.md; do
  b=$(basename $f .md)
  echo "$SCR/before/$f $SCR/before/docs/ARCHITECTURE.md $OUT/$b-untouched.out"
  echo "$f docs/ARCHITECTURE.md $OUT/$b-final.out"
done | xargs -P 6 -L 1 sh -c 'python3 docs/validation/bench/doc_checks.py --doc "$0" --heads "$1" > "$2" 2>&1; echo "exit $?" >> "$2"'
