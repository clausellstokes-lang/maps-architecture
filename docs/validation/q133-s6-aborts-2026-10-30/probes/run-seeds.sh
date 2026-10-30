#!/usr/bin/env bash
# Q133: derive seeds through derive-one.mts, P at a time. usage: run-seeds.sh <plat root> <tag> <P> <kind> <extra flags or -> <seed>...
# Writes <out>/<tag>-<kind>-<seed>.json (+ .s6in.json) and <out>/log-<tag>-<kind>-<seed>.txt; touches <out>/done-<tag>-<batch> at the end.
set -u
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
Q=/tmp/claude-0/-home-user-maps-architecture/d499ae8b-5088-523d-96b3-13eb55179f60/scratchpad/q133
PLAT=$1; TAG=$2; P=$3; KIND=$4; EXTRA=$5; shift 5
[ "$EXTRA" = "-" ] && EXTRA=""
OUT=$Q/out
mkdir -p "$OUT"
BATCH=$(date -u +%H%M%S)
cd "$PLAT" || exit 1
printf '%s\n' "$@" | xargs -P "$P" -I{} bash -c "corepack pnpm exec tsx --conditions=plat-source $Q/derive-one.mts {} $KIND --plat $PLAT --tag $TAG $EXTRA > $OUT/log-$TAG-$KIND-{}.txt 2>&1; echo \"seed {} exit \$?\" >> $OUT/status-$TAG.txt"
date -u +%FT%TZ > "$OUT/done-$TAG-$BATCH"
echo "done-$TAG-$BATCH"
