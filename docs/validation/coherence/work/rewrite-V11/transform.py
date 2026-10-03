#!/usr/bin/env python3
"""rewrite-V11: mechanical transforms of the source volume into a working copy (read, then rewritten by hand in parts).

G-cite: 'V6 §' -> 'V06 §' (V1..V9); 'V1-3.15' -> 'V01 §3.15' (V01's internal form); 'V9's' -> 'V09's'.
G-DR:   DR-V1.1 -> DR26, DR-SKY -> DR27, DR-V6.1 / DR-V8.6 -> DR28, DR-V8.1..5 -> DR29..33, DR-V8.7 -> DR34, DR-V8.8 -> DR35.
ID-BCR: 'V04 BCR-n' / "V04's BCR-n" -> 'BCR-V4-n'; 'V01 BCR-n' / "V01's BCR-n" -> 'BCR-V1-n' (bare BCR-n left for review).
S7 (V11-BREF-2): a bare § continuing a list after a volume-prefixed ref ('V10 §2.10, §3.3') takes that volume's prefix;
     a bare § whose target exists only in V11 (not a base heading) becomes 'V11 §'.
Every change is logged (line, tag, before, after) for review.
Usage: transform.py <out.md> <log.tsv>
"""
import re, sys, json

ROOT = '/home/user/maps-architecture/'
SRC = ROOT + 'docs/volumes/V11-content.md'
SECS = sys.argv[3] if len(sys.argv) > 3 else None
out_path, log_path = sys.argv[1], sys.argv[2]

def secset(path):
    out = set()
    for l in open(path, encoding='utf-8'):
        m = re.match(r'#+\s+(?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b', l)
        if m: out.add(m.group(1))
        m = re.match(r'#+\s+(II\.[0-9]+(?:\.[0-9]+)*)', l)
        if m: out.add(m.group(1))
        for m in re.finditer(r'\*\*([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)+)\b', l):
            out.add(m.group(1))
    return out

BASE = secset(ROOT + 'docs/ARCHITECTURE.md')
OWN = secset(SRC)

lines = open(SRC, encoding='utf-8').read().split('\n')
log = []

def sub_log(pattern, repl, s, ln, tag):
    def f(m):
        r = m.expand(repl) if isinstance(repl, str) else repl(m)
        if r != m.group(0):
            log.append((ln, tag, m.group(0), r))
        return r
    return re.sub(pattern, f, s)

DRMAP = {'DR-V1.1': 'DR26', 'DR-SKY': 'DR27', 'DR-V6.1': 'DR28', 'DR-V8.6': 'DR28', 'DR-V8.1': 'DR29', 'DR-V8.2': 'DR30',
         'DR-V8.3': 'DR31', 'DR-V8.4': 'DR32', 'DR-V8.5': 'DR33', 'DR-V8.7': 'DR34', 'DR-V8.8': 'DR35'}

SEC = r'§(?:[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)'
CONT = re.compile(r'(V(0[1-9]|1[0-2]) §[0-9][0-9a-z.]*(?:\'s)?(?: \([0-9a-z]{1,3}\))*(?: \*[^*]{1,40}\*)?(?: rows? [0-9–-]+)?)((?:, and |, | and | or ))(§)(?=[0-9])')

out = []
for i, s in enumerate(lines, 1):
    # G-cite: V01's internal form V1-3.15 (not inside an id such as BCR-V1-3 or T-V1-3)
    s = sub_log(r'(?<![-\w/])V1-([0-9][0-9a-z.]*[0-9a-z])', r'V01 §\1', s, i, 'cite-V1-')
    s = sub_log(r'(?<![-\w/])V([1-9])(?= §)', r'V0\1', s, i, 'cite-Vn')
    s = sub_log(r"(?<![-\w/])V([1-9])(?='s\b)", r'V0\1', s, i, 'cite-Vn')
    # G-DR
    s = sub_log(r'DR-(?:V1\.1|SKY|V6\.1|V8\.[1-8])\b', lambda m: DRMAP[m.group(0)], s, i, 'G-DR')
    # ID-BCR
    s = sub_log(r"\bV04(?:'s)? BCR-([0-9]+)\b", r'BCR-V4-\1', s, i, 'ID-BCR')
    s = sub_log(r"\bV01(?:'s)? BCR-([0-9]+)\b", r'BCR-V1-\1', s, i, 'ID-BCR')
    # list continuations after a volume citation (repeat until stable)
    while True:
        m = CONT.search(s)
        if not m:
            break
        new = m.group(1) + m.group(3) + 'V' + m.group(2) + ' §'
        log.append((i, 'cont', m.group(0), new))
        s = s[:m.start()] + new + s[m.end():]
    # own-only bare refs -> V11 §
    def own(m):
        st = m.start()
        before = s[max(0, st - 14):st]
        tok = m.group(1)
        if re.search(r'V\d\d ?$', before) or re.search(r"base's ?$", before) or re.search(r'[–-]$', before):
            return m.group(0)
        if tok in OWN and tok not in BASE:
            return 'V11 §' + tok
        return m.group(0)
    s2 = re.sub(r'(?<![\w§])§((?:[0-9]+[a-z]?)(?:\.[0-9]+[a-z]?)*)', own, s)
    if s2 != s:
        log.append((i, 'own', '', ''))
    s = s2
    out.append(s)

open(out_path, 'w', encoding='utf-8').write('\n'.join(out))
with open(log_path, 'w', encoding='utf-8') as f:
    for r in log:
        f.write('\t'.join(str(x) for x in r) + '\n')
import collections
print(collections.Counter(r[1] for r in log), file=sys.stderr)
