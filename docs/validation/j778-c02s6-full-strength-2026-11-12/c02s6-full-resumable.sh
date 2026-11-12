#!/bin/bash
# The enceinte landing's full-strength tests on its merged tree (4d490aa7), in units small enough that a container
# restart loses only the unit in flight: a unit with its .rc is never run again. Lane A: s3seeds, one cell per run
# (vitest -t on the describe title). Lane B: every other file, one file per run. Usage: c02s6-full-resumable.sh A|B|sum
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
W=/home/user/maps-scratch/gates-c02s6
D=/home/user/maps-scratch/c02s6-full
mkdir -p $D
cd $W/plat || exit 1
T=packages/layout/test/enceinte
CELLS=("F-WALL — relief-60 default" "F-WALL — relief-60 coarse" "F-WALL — relief-3000 default" "F-WALL — relief-3000 coarse" "E_DEGENERATE — relief-3000 default" "E_DEGENERATE — relief-3000 coarse")
case "$1" in
A)
  echo $$ > $D/chainA.pid
  for i in 0 1 2 3 4 5; do
    n=s3seeds-$i
    [ -e $D/$n.rc ] && continue
    corepack pnpm exec vitest run --maxWorkers=1 $T/s3seeds.test.ts -t "${CELLS[$i]}" > $D/$n.log 2>&1
    echo $? > $D/$n.rc
  done
  touch $D/chainA.done ;;
B)
  echo $$ > $D/chainB.pid
  for f in $(ls $T/*.test.ts | sort); do
    n=$(basename $f .test.ts)
    [ "$n" = s3seeds ] && continue
    [ -e $D/$n.rc ] && continue
    corepack pnpm exec vitest run --maxWorkers=1 $f > $D/$n.log 2>&1
    echo $? > $D/$n.rc
  done
  touch $D/chainB.done ;;
sum)
  ( for f in $D/*.rc; do n=$(basename $f .rc); echo "$n rc=$(cat $f) $(grep -E 'Tests ' $D/$n.log | tr -s ' ' | head -1) $(grep -E 'Duration' $D/$n.log | tr -s ' ' | head -1)"; done ) > /home/user/maps-scratch/gates-c02s6.full.sum
  cat /home/user/maps-scratch/gates-c02s6.full.sum ;;
esac
