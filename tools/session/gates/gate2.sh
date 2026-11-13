#!/bin/bash
# usage: gate2.sh <name> <commit> <workers> <near paths, comma list> <sources...>
# The landing gate, RESUMABLE (J796): a restart of the container kills every process and keeps every file, so each step
# records itself in $G.sum and is skipped when re-run; the long RELATED@1000 step runs in CHUNKS of its own file list,
# each chunk with its exit code beside it, so a restart costs one chunk. Steps: install, lint, build, the whole
# landed:verify, NEAR at full strength, RELATED@1000 over the landing's sources on the merged tree (one fuzz seed for the
# whole run, recorded), then the strength-gated test files RELATED reached, at FULL strength (J793), by cell (J798).
export PATH=/root/.local/bin:/opt/node24/bin:$PATH
HERE=$(cd "$(dirname "$0")" && pwd)
N=$1; C=$2; W=$3; NEAR=$(echo $4 | tr ',' ' '); shift 4
# the sources: any mix of separate arguments, one quoted list, commas or spaces (a caller that quotes the list must not empty RELATED)
SRCS=$(echo "$*" | tr ',' ' ')
G=/home/user/maps-scratch/gates-$N
[ -f $G.done ] && { cat $G.sum; exit 0; }
touch $G.sum
echo $$ > $G.pid   # a waiter reads it (tools/session/gates/gate-child.md)
cd /home/user/maps-architecture && git worktree prune
if [ ! -d $G/plat ]; then git worktree add -q --detach $G $C || { echo "worktree failed" >> $G.sum; exit 1; }; fi
[ "$(git -C $G rev-parse --short HEAD)" = "$(git rev-parse --short $C)" ] || { echo "worktree is not at $C" >> $G.sum; exit 1; }
cd $G/plat
has() { grep -q "^$1" $G.sum; }
for f in $NEAR $SRCS; do [ -e "$f" ] || { echo "path not found in the tree: $f" >> $G.sum; exit 1; }; done
has 'install rc=' || { corepack pnpm install --frozen-lockfile --offline > $G.log 2>&1 || PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile >> $G.log 2>&1; echo "install rc=$?" >> $G.sum; }
has 'lint rc=' || { corepack pnpm lint >> $G.log 2>&1; echo "lint rc=$? $(grep -c 'probe-red ok' $G.log) probe-red-ok" >> $G.sum; }
has 'build rc=' || { corepack pnpm build >> $G.log 2>&1; echo "build rc=$?" >> $G.sum; }
has 'verify rc=' || { corepack pnpm landed:verify -- flow-7 > $G.verify.log 2>&1; echo "verify rc=$? $(tail -1 $G.verify.log)" >> $G.sum; }
has 'near (' || { corepack pnpm exec vitest run --maxWorkers=$W $NEAR > $G.near.log 2>&1
  RC=$?; echo "near (full strength, workers=$W, the run's seed $(grep -m1 -o "this run's seed is [-0-9]*" $G.near.log | grep -o '[-0-9]*$'): $NEAR) rc=$RC $(grep -E 'Test Files|Tests |Duration' $G.near.log | tr -s ' ' | tr '\n' ';')" >> $G.sum
  grep -E '^ FAIL ' $G.near.log | sort -u | cut -c1-220 | sed 's/^/  near red: /' >> $G.sum; }
if ! has 'related@1000 ('; then
  # the seed of the whole RELATED run (one per gate, kept across restarts)
  [ -f $G.seed ] || echo $(( ( $(date +%s) % 2000000000 ) + 1 )) > $G.seed
  export PLAT_FUZZ_SEED=$(cat $G.seed)
  mkdir -p $G.rel
  if [ ! -s $G.related.list ]; then
    # the file list: RELATED's own selection, every test filtered out (the files are collected, nothing runs)
    PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=$W --reporter=json --outputFile=$G.related.list.json -t '^__no_such_test__$' $SRCS > $G.related.list.log 2>&1
    python3 - $G.related.list.json $G/plat > $G.related.list <<'PY'
import json,sys
d=json.load(open(sys.argv[1])); root=sys.argv[2].rstrip('/')+'/'
for n in sorted(t['name'] for t in d['testResults']): print(n[len(root):] if n.startswith(root) else n)
PY
  fi
  TOTAL=$(wc -l < $G.related.list)
  [ "$TOTAL" -gt 0 ] || { echo "related: empty file list" >> $G.sum; exit 1; }
  split -l 12 -d -a 3 $G.related.list $G.rel/chunk.
  for ch in $G.rel/chunk.???; do
    i=${ch##*.}
    [ -f $G.rel/$i.rc ] && continue
    PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --passWithNoTests --maxWorkers=$W --reporter=default --reporter=json --outputFile=$G.rel/$i.json $(tr '\n' ' ' < $ch) > $G.rel/$i.log 2>&1
    echo $? > $G.rel/$i.rc
  done
  python3 - $G.rel $TOTAL "$W" "$PLAT_FUZZ_SEED" "$SRCS" >> $G.sum <<'PY'
import json,glob,sys,os
d,total,w,seed,src=sys.argv[1:6]
files=fp=ff=tests=tp=tf=0; reds=[]; bad=[]; names=set()   # a file is counted once by NAME (it may run in two projects)
for j in sorted(glob.glob(d+'/???.json')):
    r=json.load(open(j))
    for t in r['testResults']:
        files+=1; names.add(t['name'])
        if t['status']=='passed': fp+=1
        else:
            ff+=1
            for a in t['assertionResults']:
                if a['status']=='failed': reds.append(t['name'].split('/plat/')[-1]+' > '+a['fullName'][:160])
            if not any(a['status']=='failed' for a in t['assertionResults']): reds.append(t['name'].split('/plat/')[-1]+' > (suite error) '+str(t.get('message',''))[:160])
    tests+=r['numTotalTests']; tp+=r['numPassedTests']; tf+=r['numFailedTests']
for c in sorted(glob.glob(d+'/chunk.???')):
    i=c.rsplit('.',1)[1]
    if not os.path.exists(d+'/'+i+'.json'): bad.append(i)
rc=0 if (ff==0 and not bad and len(names)==int(total)) else 1
print(f"related@1000 (workers={w}, in chunks of 12 files, seed {seed}: {src}) rc={rc} Test Files {ff} failed | {fp} passed ({files} results for {len(names)} of {total} listed files); Tests {tf} failed | {tp} passed ({tests});"+(f" chunks without a report: {bad};" if bad else ''))
for x in reds[:20]: print('  related red: '+x)
PY
fi
if ! has 'full-only'; then
  # The strength-gated files RELATED reached, at FULL strength (J793) — BY CELL, three at a time, each cell with its own
  # exit code and report (J798): enceinte/s3seeds alone is 122 city derivations in one file, longer than a container lives.
  LIST=$G.related.list
  mkdir -p $G.full; : > $G.full/jobs.tsv
  job() { printf '%s\t%s\t%s\n' "$1" "$2" "$3" >> $G.full/jobs.tsv; }
  if grep -q 'enceinte/s3seeds.test.ts' $LIST 2>/dev/null; then
    f=packages/layout/test/enceinte/s3seeds.test.ts
    job s3-fwall-60-default $f 'F-WALL — relief-60 default'; job s3-fwall-60-coarse $f 'F-WALL — relief-60 coarse'
    job s3-fwall-3000-default $f 'F-WALL — relief-3000 default'; job s3-fwall-3000-coarse $f 'F-WALL — relief-3000 coarse'
    job s3-degenerate-3000-default $f 'E_DEGENERATE — relief-3000 default'; job s3-degenerate-3000-coarse $f 'E_DEGENERATE — relief-3000 coarse'
  fi
  if grep -q 'enceinte/s5seeds.test.ts' $LIST 2>/dev/null; then
    f=packages/layout/test/enceinte/s5seeds.test.ts
    job s5-commits $f 'the S5 sources that commit'; job s5-later-rungs $f 'later rungs'
  fi
  grep -q 'arr-bands/representation.test.ts' $LIST 2>/dev/null && job representation packages/testkit/test/kernel/arr-bands/representation.test.ts ''
  if [ ! -s $G.full/jobs.tsv ]; then
    echo "full-only: none of the three strength-gated files is on the RELATED path" >> $G.sum
  else
    run1() {
      n=$1
      f=$(awk -F'\t' -v n="$n" '$1==n{print $2}' $G.full/jobs.tsv)
      t=$(awk -F'\t' -v n="$n" '$1==n{print $3}' $G.full/jobs.tsv)
      [ -f $G.full/$n.rc ] && return 0
      cd $G/plat || return 1
      if [ -n "$t" ]; then
        corepack pnpm exec vitest run --maxWorkers=1 --reporter=default --reporter=json --outputFile=$G.full/$n.json $f -t "$t" > $G.full/$n.log 2>&1
      else
        corepack pnpm exec vitest run --maxWorkers=1 --reporter=default --reporter=json --outputFile=$G.full/$n.json $f > $G.full/$n.log 2>&1
      fi
      echo $? > $G.full/$n.rc
    }
    export -f run1; export G
    cut -f1 $G.full/jobs.tsv | xargs -P 3 -I{} bash -c 'run1 {}'
    python3 $HERE/gate2-fullsum.py $G.full >> $G.sum
  fi
fi
touch $G.done
cat $G.sum
