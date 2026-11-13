#!/usr/bin/env python3
"""The seed sweep's reader (tools/session/gates/sweep.sh).
usage: sweep-sum.py reds <seed dir> <tree's plat dir>            -> the red test files of the seed's chunks, one per line
       sweep-sum.py seed <seed dir> <tree's plat dir> <seed> <n> -> the seed's summary line — the reds the head DECLARES
           as counts by row (the table below), each with how many were red again when the file ran ALONE on one worker
           at the same seed — and one line per NEW red with the same reading (RED AGAIN alone: a red of the seed or of
           every seed; GREEN alone: a load flake). Every red in full goes to <seed dir>/reds.txt.
The table is the head's declared reds at 2026-11-13 (docs/HANDOFF.md's takeover table); bring it up to date when a row
closes — a stale tag only mislabels a line, it hides nothing: every red is printed."""
import glob
import json
import os
import sys

DECLARED = [  # (file suffix or folder, substring of the test's full name or '', the row)
    ('packages/kernel/test/arr/bands/closing.test.ts', 'along-run closing', 'Q152'),
    ('packages/kernel/test/arr/bands/closing.test.ts', 'mechanism on round S15', 'Q152'),  # the name's apostrophes are typographic: match none
    ('packages/kernel/test/arr/bands/dryrun.test.ts', 'held cycle runs along', 'Q152'),
    ('packages/kernel/test/arr/bands/hardening-s15.test.ts', 'network 561', 'Q152'),
    ('packages/kernel/test/arr/bands/restage.test.ts', 'restaged read', 'Q152'),
    ('packages/kernel/test/arr/bands/derived.test.ts', 'straight lanes', 'Q191 (seed-dependent)'),
    ('packages/testkit/test/kernel/arr-bands/agreement-tilerings.test.ts', '', 'Q206 (seed-dependent)'),
    ('packages/testkit/test/determinism/dilation.test.ts', '', 'Q153 (flake)'),
    ('bench/test/calibrate/', '', 'J176 (reference machine)'),
    ('bench/test/host/', '', 'J176 (reference machine)'),
    ('bench/test/timing/', '', 'J176 (reference machine)'),
    ('bench/test/site/summary.test.ts', '', 'J772 (7) (the canary)'),
    ('packages/layout/test/enceinte/s5seeds.test.ts', 'later rungs', 'Q202 (full strength only)'),
    ('bench/test/timing-phase/script.test.ts', 'real python3 child', 'Q209 (a) (load flake)'),
    ('packages/site/test/terrain/range.test.ts', 'writes an Int32Array', 'Q210 (the one-door scan, red since landing 84)'),
    ('packages/layout/test/districts/perimeter.test.ts', 'buffer of the closed ring', 'Q209 (b) (load flake)'),
]


def rel(name, root):
    root = root.rstrip('/') + '/'
    return name[len(root):] if name.startswith(root) else name.split('/plat/')[-1]


def tag(f, t):
    for suf, sub, row in DECLARED:
        if (f.endswith(suf) or f.startswith(suf)) and (sub == '' or sub in t):
            return 'declared ' + row
    return 'NEW'


def chunks(d):
    return sorted(j for j in glob.glob(d + '/???.json'))


def failed_tests(report, root):
    out = []
    for t in report['testResults']:
        if t['status'] == 'passed':
            continue
        f = rel(t['name'], root)
        fa = [a['fullName'] for a in t['assertionResults'] if a['status'] == 'failed']
        if not fa:
            fa = ['(suite error) ' + str(t.get('message', ''))[:140]]
        for a in fa:
            out.append((f, a))
    return out


mode, d, root = sys.argv[1:4]
if mode == 'reds':
    files = []
    for j in chunks(d):
        for f, _ in failed_tests(json.load(open(j)), root):
            if f not in files:
                files.append(f)
    print('\n'.join(files))
    sys.exit(0)

seed, total = sys.argv[4], int(sys.argv[5])
names = set()
fp = ff = tests = tp = tf = 0
reds = []
for j in chunks(d):
    r = json.load(open(j))
    for t in r['testResults']:
        names.add(t['name'])
        if t['status'] == 'passed':
            fp += 1
        else:
            ff += 1
    tests += r['numTotalTests']
    tp += r['numPassedTests']
    tf += r['numFailedTests']
    reds += failed_tests(r, root)
missing = [c.rsplit('.', 1)[1] for c in sorted(glob.glob(os.path.dirname(d.rstrip('/')) + '/chunk.???')) if not os.path.exists(d + '/' + c.rsplit('.', 1)[1] + '.json')]
# the files' runs alone: reds.list line n -> alone-n.json
alone = {}
order = [x for x in open(d + '/reds.list', encoding='utf-8').read().split('\n') if x] if os.path.exists(d + '/reds.list') else []
for n, f in enumerate(order, 1):
    p = d + '/alone-' + str(n) + '.json'
    try:
        r = json.load(open(p))
        alone[f] = {a for _, a in failed_tests(r, root)}
        if r['numTotalTests'] == 0:
            alone[f] = None
    except Exception:
        alone[f] = None
new = [x for x in reds if tag(*x) == 'NEW']
rc = 0 if (not new and not missing and len(names) == total) else 1


def how(f, a):
    al = alone.get(f)
    if al is None:
        return 'no report alone'
    if a in al or (a.startswith('(suite error)') and any(x.startswith('(suite error)') for x in al)):
        return 'RED AGAIN alone'
    return 'GREEN alone' if not al else 'GREEN alone (another test of the file red alone)'


# the declared reds as counts by row (each with how many were red again alone); every red in full beside the reports
by = {}
full = []
for f, a in reds:
    t, h = tag(f, a), how(f, a)
    full.append(f"red [{t}] {f} > {a[:200]} — {h}")
    if t != 'NEW':
        k = by.setdefault(t[len('declared '):], [0, 0])
        k[0] += 1
        k[1] += 1 if h == 'RED AGAIN alone' else 0
open(d + '/reds.txt', 'w', encoding='utf-8').write('\n'.join(full) + ('\n' if full else ''))
decl = '; '.join(f"{k} ×{v[0]} ({v[1]} red again alone)" for k, v in sorted(by.items()))
print(f"seed {seed} rc={rc} Test Files {ff} failed | {fp} passed ({len(names)} of {total} listed); Tests {tf} failed | {tp} passed ({tests}); "
      f"reds {len(reds)} — NEW {len(new)}; declared: {decl or 'none'};" + (f" chunks without a report: {missing};" if missing else ''))
for f, a in new:
    print(f"  NEW red: {f} > {a[:170]} — {how(f, a)}")
