#!/usr/bin/env python3
# Mirror-only mutant runner (M0-c-06 self-check): apply one mutant at a time in the mirror, run the fast subset,
# then the whole folder for a survivor; restore from the tree and cmp before the next.
import json, subprocess, sys, shutil, filecmp, os, time
TREE = '/home/user/maps-architecture/plat'
MIR = '/home/user/maps-scratch/waves/selfcheck-build-M0-c-06/plat'
OUT = '/home/user/maps-scratch/waves/probe-c06/mut'
FAST = ['bench/test/fusion/drift.test.ts', 'bench/test/fusion/hausdorff.test.ts', 'bench/test/fusion/report.test.ts']
muts = json.load(open(sys.argv[1]))
only = set(sys.argv[2:])
res = {}
if os.path.exists(f'{OUT}/results.json'):
    res = json.load(open(f'{OUT}/results.json'))
def vit(files, log):
    t = time.time()
    with open(log, 'w') as f:
        r = subprocess.run(['corepack', 'pnpm', 'exec', 'vitest', 'run', '--maxWorkers=1', '--bail=1', *files], cwd=MIR, stdout=f, stderr=subprocess.STDOUT)
    return r.returncode, round(time.time() - t)
for m in muts:
    mid = m['id']
    if only and mid not in only: continue
    if mid in res and not only: continue
    path = f"{MIR}/{m['file']}"
    src = open(path).read()
    if src.count(m['old']) != 1:
        res[mid] = {'verdict': 'BAD', 'why': f"old occurs {src.count(m['old'])} times"}
        print(mid, 'BAD'); continue
    open(path, 'w').write(src.replace(m['old'], m['new']))
    try:
        code, secs = vit(m.get('fast', FAST), f'{OUT}/{mid}.fast.log')
        stage = 'fast'
        if code == 0:
            code, secs2 = vit(['bench/test/fusion'], f'{OUT}/{mid}.full.log')
            secs += secs2; stage = 'full'
        log = open(f'{OUT}/{mid}.{stage}.log').read()
        failed = [l.strip() for l in log.splitlines() if l.strip().startswith('FAIL')][:3]
        res[mid] = {'verdict': 'killed' if code != 0 else 'survived', 'stage': stage, 'secs': secs, 'failed': failed, 'promise': m['promise']}
    finally:
        shutil.copyfile(f"{TREE}/{m['file']}", path)
        assert filecmp.cmp(f"{TREE}/{m['file']}", path, shallow=False), 'restore failed'
    print(mid, res[mid]['verdict'], res[mid]['stage'], res[mid]['secs'], res[mid]['failed'][:1], flush=True)
    json.dump(res, open(f'{OUT}/results.json', 'w'), indent=1)
