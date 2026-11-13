#!/bin/bash
# usage: sweep.sh <name> <commit> <workers> <strength: 1000|full> <seeds, comma list> [<test files or folders...>]
# THE SEED SWEEP (J801 (4)), RESUMABLE like gate2.sh (J796): a run of the suite reads its property tests at ONE random
# seed, so a property that is red at some seeds and green at others shows up only now and then in a gate. This script
# reads the property tests of a tree at EACH of the given seeds: the worktree, install and build once; the file list once
# (the test files a fixed seed can reach — sweep-list.py — or the files under the given paths); then, per seed, the list in chunks of twelve
# files with the seed fixed (PLAT_FUZZ_SEED) at 1 000 runs or at full strength (PLAT_FUZZ_RUNS unset), every chunk with
# its exit code and JSON report beside it; then EVERY RED FILE AGAIN, ALONE, on one worker at the same seed — red again
# is a red of that seed (or of every seed), green alone is a load flake. One summary line per seed in $G.sum, each red
# tagged with the head's declared row where it is one (sweep-sum.py holds the table). A restart costs one chunk.
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
HERE=$(cd "$(dirname "$0")" && pwd)
N=$1; C=$2; W=$3; S=$4; SEEDS=$(echo $5 | tr ',' ' '); shift 5
PATHS=$(echo "$*" | tr ',' ' ')
G=/home/user/maps-scratch/sweep-$N
[ -f $G.done ] && { cat $G.sum; exit 0; }
touch $G.sum
echo $$ > $G.pid   # a waiter reads it (tools/session/gates/sweep-child.md)
case "$S" in 1000|full) ;; *) echo "strength must be 1000 or full, got: $S" >> $G.sum; exit 1;; esac
for s in $SEEDS; do case "$s" in ''|*[!0-9]*) echo "a seed must be a positive integer, got: $s" >> $G.sum; exit 1;; esac; done
[ -n "$SEEDS" ] || { echo "no seed given" >> $G.sum; exit 1; }
cd /home/user/maps-architecture && git worktree prune
if [ ! -d $G/plat ]; then git worktree add -q --detach $G $C || { echo "worktree failed" >> $G.sum; exit 1; }; fi
[ "$(git -C $G rev-parse --short HEAD)" = "$(git rev-parse --short $C)" ] || { echo "worktree is not at $C" >> $G.sum; exit 1; }
cd $G/plat
has() { grep -q "^$1" $G.sum; }
for f in $PATHS; do [ -e "$f" ] || { echo "path not found in the tree: $f" >> $G.sum; exit 1; }; done
has 'install rc=' || { corepack pnpm install --frozen-lockfile --offline > $G.log 2>&1 || PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile >> $G.log 2>&1; echo "install rc=$?" >> $G.sum; }
has 'build rc=' || { corepack pnpm build >> $G.log 2>&1; echo "build rc=$?" >> $G.sum; }
if [ ! -s $G.list ]; then
  if [ -n "$PATHS" ]; then find $PATHS -name '*.test.ts' -not -path '*/node_modules/*' | sort -u > $G.list
  else python3 $HERE/sweep-list.py > $G.list; fi
fi
TOTAL=$(wc -l < $G.list)
[ "$TOTAL" -gt 0 ] || { echo "sweep: empty file list" >> $G.sum; exit 1; }
has 'list:' || echo "list: $TOTAL test files (${PATHS:-every test file a fixed seed can reach, sweep-list.py}), strength $S, workers $W, tree $(git -C $G rev-parse --short HEAD)" >> $G.sum
mkdir -p $G.sw
[ -f $G.sw/chunk.000 ] || split -l 12 -d -a 3 $G.list $G.sw/chunk.
run() { # run <seed> <workers> <report> <log> <files...>
  local seed=$1 w=$2 rep=$3 log=$4; shift 4
  if [ "$S" = 1000 ]; then
    env PLAT_FUZZ_SEED=$seed PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --passWithNoTests --maxWorkers=$w --reporter=default --reporter=json --outputFile=$rep "$@" > $log 2>&1
  else
    env -u PLAT_FUZZ_RUNS PLAT_FUZZ_SEED=$seed corepack pnpm exec vitest run --passWithNoTests --maxWorkers=$w --reporter=default --reporter=json --outputFile=$rep "$@" > $log 2>&1
  fi
}
for seed in $SEEDS; do
  has "seed $seed " && continue
  D=$G.sw/$seed; mkdir -p $D
  for ch in $G.sw/chunk.???; do
    i=${ch##*.}
    [ -f $D/$i.rc ] && continue
    run $seed $W $D/$i.json $D/$i.log $(tr '\n' ' ' < $ch)
    echo $? > $D/$i.rc
  done
  # every red file again, alone, one worker, the same seed
  [ -f $D/reds.list ] || python3 $HERE/sweep-sum.py reds $D $G/plat > $D/reds.list
  n=0
  while read -r f; do
    [ -n "$f" ] || continue
    n=$((n+1))
    [ -f $D/alone-$n.rc ] && continue
    run $seed 1 $D/alone-$n.json $D/alone-$n.log $f
    echo $? > $D/alone-$n.rc
  done < $D/reds.list
  python3 $HERE/sweep-sum.py seed $D $G/plat $seed $TOTAL >> $G.sum
done
touch $G.done
cat $G.sum
