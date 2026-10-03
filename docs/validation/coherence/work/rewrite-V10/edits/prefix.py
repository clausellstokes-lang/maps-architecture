#!/usr/bin/env python3
"""Prefix list continuations: 'V09 §2.7, §2.9' -> 'V09 §2.7, V09 §2.9' (V10-BREF-2); also across a line wrap."""
import re, glob
F = '/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V10/parts/'
pat = re.compile(r'(V\d\d) §([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*(?: \([0-9a-z]+\))?)((?:(?:,| and|,\s*and| or|–)\s*§[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*(?: \([0-9a-z]+\))?)+)')
total = 0
for p in sorted(glob.glob(F + '*.md')):
    s = open(p, encoding='utf-8').read(); o = s
    def rep(m):
        vol = m.group(1)
        tail = re.sub(r'(?<![V\d] )§', vol + ' §', m.group(3))
        return m.group(1) + ' §' + m.group(2) + tail
    for _ in range(3):
        s = pat.sub(rep, s)
    s = s.replace('V09 §2.9–§2.10', 'V09 §2.9–V09 §2.10')
    if s != o:
        n = sum(1 for _ in re.finditer(r'V\d\d §', s)) - sum(1 for _ in re.finditer(r'V\d\d §', o))
        total += n; open(p, 'w', encoding='utf-8').write(s); print(p.split('/')[-1], n)
print('total prefixes added', total)
