#!/usr/bin/env python3
"""rewrite-V09: strip review-round and critique ids (narration, principle (5); V09-NARR-3/5) from a part file, in place.

Design ids stay: J-V9.n, J-VI.n, J-An.m, D-n, T-…, file f items, DRn. Removed: SS-n, SRk-n, SR-n, XV-V9-n, CVR-V10-n,
V9C-n, J-SSk.m, C4-110-n, C10-n, V1C-n, V3C-n, C6-n, SCC-…, ST-n, 'seam-surfaces-rK', 'reconcile-V09-rK' — with the
separators around them. Every removal is appended to strip-log.tsv beside this script.
usage: strip.py <part.md> [...]
"""
import re, sys, os

ID = (r"(?:seam-surfaces-r\d+(?:'s continuation)? |seam-settlements-r\d+ |seam-content-calibration-r\d+ )?"
      r"(?:SS-\d+|SR\d-\d+|SR-\d+|XV-V9-\d+|CVR-V10-\d+|V9C-\d+|J-SS\d+\.\d+|C4-110-\d+|C10-\d+|V1C-\d+|V3C-\d+"
      r"|C6-\d+|SCC-R\d+C-\d+|SCC-\d+|ST-\d+|reconcile-V09-r\d+(?:'s second brief| second brief)?)"
      r"(?: \([a-z0-9]+\))*")
IDS = ID + r"(?:(?:, | and | – |–)" + ID + r")*"
LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'strip-log.tsv')

pats = [
    (re.compile(r"; " + IDS + r"(?=[);])"), ''),           # '...; SR2-23)' or '...; SS-06;'
    (re.compile(r"\(" + IDS + r"; "), '('),                  # '(SS-15; J-V9.82)' -> '(J-V9.82)'
    (re.compile(r", " + IDS + r"(?=[);,])"), ''),           # '..., SS-08)'
    (re.compile(r"\(" + IDS + r", "), '('),                  # '(SS-06, SR-16, ...'
    (re.compile(r" ?\(" + IDS + r"\)"), ''),                 # ' (SR-16)'
    (re.compile(r"; " + IDS + r"$"), ''),
]

def strip(s):
    out = s
    for _ in range(6):
        prev = out
        for p, r in pats:
            out = p.sub(r, out)
        if out == prev:
            break
    return out

for path in sys.argv[1:]:
    lines = open(path, encoding='utf-8').read().split('\n')
    new = []
    with open(LOG, 'a', encoding='utf-8') as log:
        for i, l in enumerate(lines, 1):
            n = strip(l)
            if n != l:
                log.write(f"{os.path.basename(path)}\t{i}\t{l.strip()[:300]}\t{n.strip()[:300]}\n")
            new.append(n)
    open(path, 'w', encoding='utf-8').write('\n'.join(new))
    left = [(i, m.group(0)) for i, l in enumerate(new, 1) for m in re.finditer(ID, l)]
    print(path, 'left:', len(left))
    for i, m in left[:60]:
        print('  ', i, m)
