#!/bin/bash
# usage: gates.sh <name> <commit> <fuzz runs or -> <workers> <near paths...>
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
N=$1; C=$2; R=$3; W=$4; shift 4
G=/home/user/maps-scratch/gates-$N
rm -f $G.done $G.sum
cd /home/user/maps-architecture && git worktree add -q --detach $G $C || { echo "worktree failed" > $G.sum; touch $G.done; exit 1; }
cd $G/plat
corepack pnpm install --frozen-lockfile --offline > $G.log 2>&1; echo "install rc=$?" >> $G.sum
corepack pnpm lint >> $G.log 2>&1; echo "lint rc=$? $(grep -c 'probe-red ok' $G.log) probe-red-ok" >> $G.sum
corepack pnpm build >> $G.log 2>&1; echo "build rc=$?" >> $G.sum
corepack pnpm landed:verify -- flow-7 > $G.verify.log 2>&1; echo "verify rc=$? $(tail -1 $G.verify.log)" >> $G.sum
if [ "$R" != "-" ]; then export PLAT_FUZZ_RUNS=$R; fi
corepack pnpm exec vitest run --maxWorkers=$W --passWithNoTests "$@" > $G.near.log 2>&1
echo "near (runs=$R workers=$W: $*) rc=$? $(grep -E 'Test Files|Tests |Duration' $G.near.log | tr -s ' ' | tr '\n' ';')" >> $G.sum
touch $G.done
cat $G.sum
