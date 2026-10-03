#!/usr/bin/env python3
"""rewrite-V10: mechanical transforms of the source volume into a working copy (src/V10-work.md).

G-cite: 'V9 §' -> 'V09 §' (V1..V9 likewise), "V9's" -> "V09's", 'V1-4.2' -> 'V01 §4.2'.
G-DR:   DR-V1.1 -> DR26, DR-SKY -> DR27, DR-V6.1/DR-V8.6 -> DR28, DR-V8.1..5 -> DR29..33, DR-V8.7 -> DR34, DR-V8.8 -> DR35.
G-clerkhandle: ClerkHarness -> ClerkHandle (the alias line itself is dropped by hand; E-33).
V10-BREF-2: a bare '§x' continuing a list after a volume citation ('V09 §4.8, §7.1'):
   section only in that volume -> prefixed ('V09 §4.8, V09 §7.1');
   section only in the base -> left bare (a bare § is always the base's);
   in both -> left and logged 'AMBIG' for a hand decision; in neither -> logged 'NONE'.
Writes src/V10-work.md and transform-log.tsv beside this script.
"""
import re, json, os
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = '/home/user/maps-architecture/docs/volumes/V10-clerk.md'
SECS = json.load(open('/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/secs.json'))
BASE = set(SECS['base'])
VOLS = {k: set(v) for k, v in SECS['vols'].items()}

lines = open(SRC, encoding='utf-8').read().split('\n')
log = []

def sub_log(pattern, repl, s, ln, tag):
    def f(m):
        r = m.expand(repl) if isinstance(repl, str) else repl(m)
        if r != m.group(0):
            log.append((ln, tag, m.group(0), r))
        return r
    return re.sub(pattern, f, s)

DR = {'DR-V1.1': 'DR26', 'DR-SKY': 'DR27', 'DR-V6.1': 'DR28', 'DR-V8.6': 'DR28', 'DR-V8.1': 'DR29', 'DR-V8.2': 'DR30',
      'DR-V8.3': 'DR31', 'DR-V8.4': 'DR32', 'DR-V8.5': 'DR33', 'DR-V8.7': 'DR34', 'DR-V8.8': 'DR35'}
SEC = r'§((?:[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*))'
QUAL = r"(?:'s)?(?: \((?:[a-z0-9]{1,3})\))*(?: (?:step|row|rule) [0-9]+(?: \([a-z]\))*)?(?:'s [a-zA-Z`*_ -]{1,40}?)?"
SEP = r"(?:, and |, | and | or |; |–|-)"

out = []
for i, s in enumerate(lines, 1):
    s = sub_log(r'V01 V1-([0-9][0-9a-z.]*[0-9a-z])', r'V01 §\1', s, i, 'cite-V1-')
    s = sub_log(r'(?<![-\w/])V([1-9])-([0-9][0-9a-z.]*[0-9a-z])', lambda m: 'V0%s §%s' % (m.group(1), m.group(2)), s, i, 'cite-Vn-')
    s = sub_log(r'(?<![-\w/.])V([1-9])(?= §)', r'V0\1', s, i, 'cite-Vn')
    s = sub_log(r"(?<![-\w/.])V([1-9])(?='s\b)", r'V0\1', s, i, 'cite-Vn')
    s = sub_log(r'DR-V1\.1|DR-SKY|DR-V6\.1|DR-V8\.[1-8]', lambda m: DR[m.group(0)], s, i, 'G-DR')
    s = sub_log(r'ClerkHarness', 'ClerkHandle', s, i, 'G-clerkhandle')
    # list continuations after a volume citation
    pos = 0
    while True:
        m = re.search(r'(V(0[1-9]|1[0-2]) )' + SEC + r'(' + QUAL + r')' + r'(' + SEP + r')' + SEC, s[pos:])
        if not m:
            break
        st = pos + m.start()
        vol = 'V' + m.group(2)
        b = m.group(6)
        b_in_vol = b in VOLS.get(vol, set())
        b_in_base = b in BASE
        # the continuation's own start inside s
        cont_start = pos + m.start(6) - 1  # the '§'
        if b_in_vol and not b_in_base:
            s = s[:cont_start] + m.group(1) + s[cont_start:]
            log.append((i, 'list-prefix', m.group(0), vol + ' §' + b))
            pos = cont_start + len(m.group(1))
        else:
            tag = 'list-base' if (b_in_base and not b_in_vol) else ('AMBIG' if b_in_base else 'NONE')
            log.append((i, tag, m.group(0), vol + ' / base §' + b))
            pos = cont_start
    out.append(s)

os.makedirs(os.path.join(HERE, 'src'), exist_ok=True)
open(os.path.join(HERE, 'src', 'V10-work.md'), 'w', encoding='utf-8').write('\n'.join(out))
with open(os.path.join(HERE, 'transform-log.tsv'), 'w', encoding='utf-8') as f:
    for r in log:
        f.write('\t'.join(str(x) for x in r) + '\n')
print(Counter(r[1] for r in log))
