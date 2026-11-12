#!/bin/bash
# J757's measurement: the role registry's version raised to 2 (with the `shape` row appended) in a scratch worktree,
# the whole suite run at reduced strength one test folder per unit; every red is a pin the raise moves.
# Resumable: a unit with its .rc is never run again. Results in /home/user/maps-scratch/rq2/<unit>.log|.rc
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
M=/home/user/maps-scratch/rq2-measure
D=/home/user/maps-scratch/rq2
mkdir -p $D
echo $$ > $D/chain.pid
until [ -e /home/user/maps-scratch/gates-a11s6.done ]; do sleep 30; done
cd $M/plat || exit 1
if [ ! -e $D/build.rc ]; then corepack pnpm build > $D/build.log 2>&1; echo $? > $D/build.rc; fi
export PLAT_FUZZ_RUNS=25
for d in $(find . -name '*.test.ts' -not -path '*/node_modules/*' | sed -E 's#^\./##; s#/[^/]+$##' | awk -F/ '{ if ($1=="packages") print $1"/"$2"/"$3"/"$4; else print $1"/"$2"/"$3 }' | sort -u); do
  n=$(echo $d | tr '/' '_')
  [ -e $D/$n.rc ] && continue
  timeout 5400 corepack pnpm exec vitest run --maxWorkers=2 $d > $D/$n.log 2>&1
  echo $? > $D/$n.rc
done
touch $D/chain.done
