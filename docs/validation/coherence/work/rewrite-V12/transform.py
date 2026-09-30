#!/usr/bin/env python3
"""rewrite-V12: mechanical transforms of the source volume into a working copy (logged).

G-cite: 'V2 §' -> 'V02 §' (V1..V9); 'V1-3.15' -> 'V01 §3.15' (never inside a test id T-V1-n).
List continuation after a volume citation ('V04 §5.1, §4.4' -> 'V04 §5.1, V04 §4.4').
V12-BREF-1: a bare '§x.y' naming no base section -> 'V12 §x.y' (logged for review).
G-DR (ID-DR): DR-V8.1..8 -> DR29..DR35 numbers.  ID-JT: 'J-T' -> 'JT'.
ID-BCR: V01's / V04's bare BCR-n -> BCR-V1-n / BCR-V4-n.
Writes src/V12-work.md and src/transform-log.tsv beside this script.
"""
import re, os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = '/home/user/maps-architecture/docs/volumes/V12-calibration.md'
BASE = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
secs = set()
for l in open(BASE, encoding='utf-8').read().split('\n'):
    m = re.match(r'^#+\s+§?(\d+(?:\.\d+)*[a-z]?)\b', l)
    if m: secs.add(m.group(1))
secs |= {'12.10'}   # added by the rendering part (item 119's register rows)
lines = open(SRC, encoding='utf-8').read().split('\n')
log = []
def sub(p, r, s, i, tag):
    def f(m):
        n = m.expand(r) if isinstance(r, str) else r(m)
        if n != m.group(0): log.append((i, tag, m.group(0), n))
        return n
    return re.sub(p, f, s)
SEC = r'§(?:[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)'
QUAL = r"(?:'s)?(?: \((?:[a-z0-9]{1,3})\))*"
SEP = r"(?:, and |, | and | or | – |–)"
DR = {'DR-V8.1':'DR29','DR-V8.2':'DR30','DR-V8.3':'DR31','DR-V8.4':'DR32','DR-V8.5':'DR33','DR-V8.7':'DR34','DR-V8.8':'DR35'}
out = []
for i, s in enumerate(lines, 1):
    s = sub(r'(?<![-\w/])V1-([0-9][0-9a-z.]*[0-9a-z])', r'V01 §\1', s, i, 'cite-V1-')
    s = sub(r'(?<![-\w/])V([1-9])(?= §)', r'V0\1', s, i, 'cite-Vn')
    s = sub(r"(?<![-\w/])V([1-9])(?='s\b)", r'V0\1', s, i, 'cite-Vn')
    s = sub(r'DR-V8\.[1-8]', lambda m: DR[m.group(0)], s, i, 'G-DR')
    s = sub(r'\bJ-T\b', 'JT', s, i, 'ID-JT')
    s = sub(r"(?:V01's |volume 1's )BCR-(\d+)\b", r'BCR-V1-\1', s, i, 'ID-BCR')
    s = sub(r"(?:V04's |V04 |volume 4's )BCR-(\d+)\b", r'BCR-V4-\1', s, i, 'ID-BCR')
    s = sub(r"(?<![-\w])BCR-45\b", 'BCR-V4-45', s, i, 'ID-BCR')
    s = sub(r"(?<![-\w])BCR-42\b", 'BCR-V1-42', s, i, 'ID-BCR')
    # list continuation after a volume prefix
    pat = re.compile(r'(V(?:0[1-9]|1[0-2]) )(' + SEC + r')(' + QUAL + SEP + r')(' + SEC + r')')
    while True:
        m = pat.search(s)
        if not m: break
        new = m.group(1) + m.group(2) + m.group(3) + m.group(1) + m.group(4)
        log.append((i, 'list-cont', m.group(0), new))
        s = s[:m.start()] + new + s[m.end():]
    # bare § not naming a base section -> V12 §
    def bare(m):
        num = m.group(1)
        if num in secs: return m.group(0)
        return 'V12 §' + num
    s = sub(r'(?<![A-Za-z0-9] )(?<!V\d\d )§(\d+[a-z]?(?:\.\d+[a-z]?)*)', bare, s, i, 'BREF')
    out.append(s)
open(os.path.join(HERE, 'src', 'V12-work.md'), 'w', encoding='utf-8').write('\n'.join(out))
with open(os.path.join(HERE, 'src', 'transform-log.tsv'), 'w', encoding='utf-8') as f:
    for r in log: f.write('\t'.join(str(x) for x in r) + '\n')
from collections import Counter
print(Counter(r[1] for r in log))
