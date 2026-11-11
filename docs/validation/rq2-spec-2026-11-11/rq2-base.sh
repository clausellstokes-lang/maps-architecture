#!/bin/bash
# The base comparison for J757's measurement: every unit that is red with the version raised is run again on the
# UNCHANGED tree (the gates worktree at 55042d29) at the same strength; a red there is not the raise's.
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
D=/home/user/maps-scratch/rq2
B=$D/base
mkdir -p $B
until [ -e $D/chain.done ]; do sleep 60; done
cd /home/user/maps-scratch/gates-a11s6/plat || exit 1
export PLAT_FUZZ_RUNS=25
for f in $D/*.rc; do
  n=$(basename $f .rc)
  [ "$n" = build ] && continue
  [ "$(cat $f)" = 0 ] && continue
  [ -e $B/$n.rc ] && continue
  d=$(echo $n | sed -E 's#^packages_([a-z]+)_test_#packages/\1/test/#; s#^bench_test_#bench/test/#')
  timeout 5400 corepack pnpm exec vitest run --maxWorkers=2 $d > $B/$n.log 2>&1
  echo $? > $B/$n.rc
done
touch $B/chain.done
