#!/usr/bin/env python3
"""rewrite-V10: exact replacements on a part file, each asserted to match exactly `n` times (default 1).

usage: rep.py <part.md> <spec.py>
spec.py defines R = [(old, new), (old, new, n), ...]. Nothing is written unless every pair matches as stated.
Each applied pair is appended to rep-log.tsv beside this script (part, first 160 chars of old, of new).
"""
import sys, os, runpy
HERE = os.path.dirname(os.path.abspath(__file__))
part, spec = sys.argv[1], sys.argv[2]
R = runpy.run_path(spec)['R']
s = open(part, encoding='utf-8').read()
bad = []
for r in R:
    old, new = r[0], r[1]
    n = r[2] if len(r) > 2 else 1
    c = s.count(old)
    if c != n:
        bad.append((c, n, old[:200]))
if bad:
    for c, n, o in bad:
        print(f'MISMATCH found {c} expected {n}: {o!r}')
    sys.exit(1)
with open(os.path.join(HERE, 'rep-log.tsv'), 'a', encoding='utf-8') as log:
    for r in R:
        s = s.replace(r[0], r[1])
        log.write(f"{os.path.basename(part)}\t{r[0][:160]!r}\t{r[1][:160]!r}\n")
open(part, 'w', encoding='utf-8').write(s)
print('applied', len(R))
