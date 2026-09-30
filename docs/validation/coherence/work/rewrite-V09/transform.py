#!/usr/bin/env python3
"""rewrite-V09: mechanical transforms of the source volume into a working copy.

G-cite: 'V9 §' -> 'V09 §' (and V1..V8 likewise); 'V1-4.2' -> 'V01 §4.2'; 'V9's' -> 'V09's' in prose.
G-DR:   DR-V8.7 -> DR34, DR-V8.8 -> DR35 (ID-DR).
V09-BREF-3: a bare '§x' continuing a list after a volume citation ('V08 §5.1, §4.4') gets the volume prefix
            ('V08 §5.1, V08 §4.4'); every change is logged for review.
Writes: <scratch>/V09-work.md and <scratch>/transform-log.tsv
"""
import re, sys, os

SRC = '/home/user/maps-architecture/docs/volumes/V09-application.md'
OUT = sys.argv[1] if len(sys.argv) > 1 else 'V09-work.md'
LOG = sys.argv[2] if len(sys.argv) > 2 else 'transform-log.tsv'

text = open(SRC, encoding='utf-8').read()
lines = text.split('\n')
log = []

def sub_log(pattern, repl, s, ln, tag):
    def f(m):
        r = m.expand(repl) if isinstance(repl, str) else repl(m)
        if r != m.group(0):
            log.append((ln, tag, m.group(0), r))
        return r
    return re.sub(pattern, f, s)

# section-ref token: §1b, §4.20.3, §3.12 etc.
SEC = r'§(?:[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*|[0-9]+b)'
# allowed text between a cited ref and a continuation '§' (qualifiers only)
QUAL = r"(?:'s)?(?: \((?:[a-z0-9]{1,3}|[a-z]\)–\([a-z])\))*(?: step [0-9]+(?: \([a-z]\))*)?(?: \([0-9a-z]{1,3}\))*"
SEP = r"(?:, and |, | and | or )"

out = []
for i, s in enumerate(lines, 1):
    # 1. V1-4.2 forms (V01 V1-4.2 doubled prefix first)
    s = sub_log(r'V01 V1-([0-9][0-9a-z.]*[0-9a-z])', r'V01 §\1', s, i, 'cite-V1-')
    s = sub_log(r'(?<![-\w])V1-([0-9][0-9a-z.]*[0-9a-z])', r'V01 §\1', s, i, 'cite-V1-')
    # 2. single-digit volume prefixes before § or 's or a space-word
    s = sub_log(r'(?<![-\w/])V([1-9])(?= §)', r'V0\1', s, i, 'cite-Vn')
    s = sub_log(r"(?<![-\w/])V([1-9])(?='s\b)", r'V0\1', s, i, 'cite-Vn')
    # 3. DR aliases
    s = sub_log(r'DR-V8\.7', 'DR34', s, i, 'G-DR')
    s = sub_log(r'DR-V8\.8', 'DR35', s, i, 'G-DR')
    # 4. list continuations after a volume citation
    pat = re.compile(r'(V(?:0[1-9]|1[0-2]) )(' + SEC + r')(' + QUAL + SEP + r')(' + SEC + r')')
    while True:
        m = pat.search(s)
        if not m:
            break
        pre, a, sep, b = m.group(1), m.group(2), m.group(3), m.group(4)
        new = pre + a + sep + pre + b
        log.append((i, 'list-cont', m.group(0), new))
        s = s[:m.start()] + new + s[m.end():]
    out.append(s)

open(OUT, 'w', encoding='utf-8').write('\n'.join(out))
with open(LOG, 'w', encoding='utf-8') as f:
    for r in log:
        f.write('\t'.join(str(x) for x in r) + '\n')
from collections import Counter
print(Counter(r[1] for r in log))

# ---- stage 2: body citations of base change requests -> the applied file f item (canon: BCR blocks -> pointers) ----
BCR = {
 'BCR-V9-1':'514','BCR-V9-2':'515','BCR-V9-3':'277','BCR-V9-5':'460','BCR-V9-7':'411','BCR-V9-8':'516','BCR-V9-9':'517',
 'BCR-V9-10':'461','BCR-V9-11':'462','BCR-V9-12':'463','BCR-V9-13':'360','BCR-V9-14':'453','BCR-V9-15':'454','BCR-V9-16':'348',
 'BCR-V9-17':'494','BCR-V9-18':'530','BCR-V9-19':'269','BCR-V9-20':'278','BCR-V9-21':'361','BCR-V9-22':'372','BCR-V9-23':'464',
 'BCR-V9-24':'490','BCR-V9-25':'413','BCR-V9-26':'362','BCR-V9-27':'465','BCR-V9-28':'466','BCR-V9-29':'363','BCR-V9-30':'246',
 'BCR-V9-31':'447','BCR-V9-32':'455','BCR-V9-33':'364','BCR-V9-34':'467','BCR-V9-35':'570','BCR-V9-36':'583',
 'BCR-V10-1':'468','BCR-V10-3':'270','BCR-V10-5':'469','BCR-V10-6':'470','BCR-V10-7':'473','BCR-V10-12':'348','BCR-V10-17':'366',
 'BCR-V10-18':'367','BCR-V10-20':'368','BCR-V10-21':'290','BCR-V10-22':'572','BCR-V10-23':'571','BCR-V11-10':'380',
 'BCR-V2-30':'402','BCR-V3-16':'353','BCR-V5-27':'245','BCR-V6-11':'458','BCR-V6-24':'260','BCR-V8-1':'472','BCR-V8-3':'507',
 'BCR-V8-6':'358','BCR-V8-8':'390','BCR-V8-15':'410','BCR-V8-19':'359','BCR-V8-32':'399',
}
OUT2 = OUT.replace('.md', '2.md')
src = open(OUT, encoding='utf-8').read().split('\n')
res = []
for i, s in enumerate(src, 1):
    s = sub_log(r"(?:V04's |volume 4's )BCR-10\b", 'file f item 413', s, i, 'bcr')
    s = sub_log(r"(?:V01's |volume 1's )BCR-12\b", 'file f item 272', s, i, 'bcr')
    s = sub_log(r'\bBCR-V\d+-\d+\b', lambda m: ('file f item ' + BCR[m.group(0)]) if m.group(0) in BCR else m.group(0), s, i, 'bcr')
    res.append(s)
open(OUT2, 'w', encoding='utf-8').write('\n'.join(res))
with open(LOG, 'w', encoding='utf-8') as f:
    for r in log:
        f.write('\t'.join(str(x) for x in r) + '\n')
print(Counter(r[1] for r in log))
