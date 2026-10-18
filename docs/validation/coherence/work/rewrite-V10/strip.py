#!/usr/bin/env python3
"""rewrite-V10: strip review-round and critique ids (narration, principle (5); V10-NARR-2) from part files, in place.

Design ids stay: J-V10.n, J-VI.n, J-An.m, D-n, T-…, items, DRn, K1–K18, CVR-V10-n, BCR ids in V10 §10.
Removed with their separators: SS-n, SR-n, SRk-n, C10-n, C8-n, C4-n, C4-110-n, TR-n, TW-n, TX-n, SCC-…, V9C-n, J-SSk.m,
ST-n, XV-V9-n, 'seam SS-n', 'seam-surfaces-rk', 'seam-time-rk', 'reconcile-V10-rk', 'critique-V10's'.
Every change is appended to strip-log.tsv beside this script.  usage: strip.py <part.md> [...]
"""
import re, sys, os

ID = (r"(?:(?:seam-surfaces-r\d+|seam-time-r\d+|seam-settlements-r\d+|reconcile-V\d+-r\d+)(?:'s continuation| second brief)?"
      r"(?: \([a-z0-9]+\))?(?: |, |; )?)?(?:seam |critique-V10's |critique-V4 )?"
      r"(?:SS-\d+|SR\d-\d+|SR-\d+|C10-\d+|C8-\d+|C4-110-\d+|C4-\d+|TR-\d+|TW-\d+|TX-\d+|SCC-R\d+C-\d+|SCC-\d+|V9C-\d+"
      r"|J-SS\d+\.\d+|ST-\d+|XV-V9-\d+)"
      r"(?: \((?:[a-z0-9]+|[a-z]\) – \([a-z]|[a-z]\)–\([a-z])\))*")
IDS = ID + r"(?:(?:, and |, | and | – |–|; )" + ID + r")*"
LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'strip-log.tsv')

pats = [
    (re.compile(r"; " + IDS + r"(?=[);\]])"), ''),
    (re.compile(r"\(" + IDS + r"; "), '('),
    (re.compile(r", " + IDS + r"(?=[);,\]])"), ''),
    (re.compile(r"\(" + IDS + r", "), '('),
    (re.compile(r" ?\(" + IDS + r"\)"), ''),
    (re.compile(r"; " + IDS + r"$"), ''),
    (re.compile(r" ?\((?:seam-surfaces-r\d+|seam-time-r\d+|reconcile-V\d+-r\d+)\)"), ''),
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
                log.write(f"{os.path.basename(path)}\t{i}\t{l.strip()[:400]}\t{n.strip()[:400]}\n")
            new.append(n)
    open(path, 'w', encoding='utf-8').write('\n'.join(new))
    left = [(i, m.group(0)) for i, l in enumerate(new, 1) for m in re.finditer(ID, l)]
    print(path, 'left:', len(left))
    for i, m in left[:80]:
        print('  ', i, m)
