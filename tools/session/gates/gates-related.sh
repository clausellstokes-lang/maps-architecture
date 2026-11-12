#!/bin/bash
# usage: gates-related.sh <name> <commit> <workers> <near paths, comma list> <sources...>
# The gates of a landing whose sources move other items' outputs: install, lint, build, landed:verify, NEAR at full
# strength, then RELATED@1000 over the landing's sources on the merged tree.
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
N=$1; C=$2; W=$3; NEAR=$(echo $4 | tr ',' ' '); shift 4
G=/home/user/maps-scratch/gates-$N
rm -f $G.done $G.sum
cd /home/user/maps-architecture && git worktree add -q --detach $G $C || { echo "worktree failed" > $G.sum; touch $G.done; exit 1; }
cd $G/plat
corepack pnpm install --frozen-lockfile --offline > $G.log 2>&1; echo "install rc=$?" >> $G.sum
corepack pnpm lint >> $G.log 2>&1; echo "lint rc=$? $(grep -c 'probe-red ok' $G.log) probe-red-ok" >> $G.sum
corepack pnpm build >> $G.log 2>&1; echo "build rc=$?" >> $G.sum
corepack pnpm landed:verify -- flow-7 > $G.verify.log 2>&1; echo "verify rc=$? $(tail -1 $G.verify.log)" >> $G.sum
corepack pnpm exec vitest run --maxWorkers=$W $NEAR > $G.near.log 2>&1
echo "near (full strength, workers=$W: $NEAR) rc=$? $(grep -E 'Test Files|Tests |Duration' $G.near.log | tr -s ' ' | tr '\n' ';')" >> $G.sum
PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=$W --reporter=default --reporter=json --outputFile=$G.related.json "$@" > $G.related.log 2>&1
echo "related@1000 (workers=$W: $*) rc=$? $(grep -E 'Test Files|Tests |Duration' $G.related.log | tr -s ' ' | tr '\n' ';')" >> $G.sum
# J793: three test files register cases only at FULL strength (PLAT_FUZZ_RUNS unset), so RELATED@1000 never runs them and
# a landing in another item can turn them red unseen (the seven later-rung pins of s5seeds.test.ts, red from the
# fifty-sixth landing to the eighty-first). Whichever of them RELATED's own file list reached is run again at full strength.
FULLONLY=""
for f in packages/layout/test/enceinte/s3seeds.test.ts packages/layout/test/enceinte/s5seeds.test.ts packages/testkit/test/kernel/arr-bands/representation.test.ts; do
  b=$(basename $f)
  if grep -q "$b" $G.related.json 2>/dev/null; then FULLONLY="$FULLONLY $f"; fi
done
if [ -n "$FULLONLY" ]; then
  corepack pnpm exec vitest run --maxWorkers=$W $FULLONLY > $G.fullonly.log 2>&1
  echo "full-only (the strength-gated files RELATED reached:$FULLONLY) rc=$? $(grep -E 'Test Files|Tests |Duration' $G.fullonly.log | tr -s ' ' | tr '\n' ';')" >> $G.sum
else
  echo "full-only: none of the three strength-gated files is on the RELATED path" >> $G.sum
fi
touch $G.done
cat $G.sum
