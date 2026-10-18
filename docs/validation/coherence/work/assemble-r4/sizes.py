#!/usr/bin/env python3
"""sizes.py (coherence/assemble-r4, P7) — sizes before (snapshot.py's untouched copies) and after (the installed files) per
unit and for the set, and the census of duplicate id definitions across the set (principle (4); assemble-r0's sizes.py
method). Writes sizes.json; prints a table."""
import glob, json, os, re
from collections import Counter
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
W = 'docs/validation/coherence/work/assemble-r4'
B = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm4/before'
rd = lambda p: open(p, encoding='utf-8').read()
units = [('base', 'docs/ARCHITECTURE.md')] + [(os.path.basename(f)[:3], f) for f in sorted(glob.glob('docs/volumes/V*.md'))] + \
        [('INDEX', 'docs/volumes/INDEX.md'), ('rationale', 'docs/ARCHITECTURE-RATIONALE.md')]
rows = []
for u, p in units:
    ta, tb = rd(f'{B}/{p}'), rd(p)
    rows.append(dict(unit=u, path=p, old_bytes=len(ta.encode()), new_bytes=len(tb.encode()), old_words=len(ta.split()), new_words=len(tb.split()),
                     old_lines=ta.count('\n'), new_lines=tb.count('\n')))
def tot(sel):
    r = [x for x in rows if x['unit'] in sel]
    return {k: sum(x[k] for x in r) for k in ('old_bytes', 'new_bytes', 'old_words', 'new_words', 'old_lines', 'new_lines')}
vols = [x['unit'] for x in rows if x['unit'].startswith('V')]
totals = {'base + volumes': tot(['base'] + vols), 'volumes': tot(vols), 'base + volumes + INDEX': tot(['base', 'INDEX'] + vols)}
base = rd('docs/ARCHITECTURE.md'); bl = base.split('\n')
jc = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls')); st = next(i for i, l in enumerate(bl) if l.startswith('# Staged by'))
dups = {}
c = Counter(m.group(1) for l in bl[jc:st] for m in [re.match(r'\|\s*(J-[A-Za-z]+-?\d+(?:\.\d+)?)\s*\|', l)] if m); dups['base index J rows'] = sorted(k for k, n in c.items() if n > 1)
c = Counter(re.findall(r'^\*\*(D-\d+)\b', base, re.M)); dups['base D-n'] = sorted(k for k, n in c.items() if n > 1)
c = Counter(m.group(1) for m in re.finditer(r'^\|\s*(T-ER-\d+)\s*\|', base, re.M)); dups['base T-ER'] = sorted(k for k, n in c.items() if n > 1)
rat = rd('docs/ARCHITECTURE-RATIONALE.md')
c = Counter(m.group(1) for m in re.finditer(r'^\|\s*(J-[A-Za-z]+-?\d+(?:\.\d+)?)\s*\|', rat, re.M)); dups['rationale Part A'] = sorted(k for k, n in c.items() if n > 1)
for f in sorted(glob.glob('docs/volumes/V*.md')):
    n = str(int(os.path.basename(f)[1:3])); t = rd(f)
    def sect(k):
        m = re.search(r'^## ' + k + r' .*?(?=^## )', t, re.M | re.S); return m.group(0) if m else ''
    body = sect('7') + '\n' + sect('9')
    ids = [m.group(1) for m in re.finditer(r'^(?:\|\s*|\s*(?:[*-] )?\*\*)(?:\*\*)?((?:T-V|J-V)' + n + r'[-.]\d+)\b(?![-.]\d)(?!\s*[–-]\s*(?:T|J)-V)(?!\'s)', body, re.M)]
    c = Counter(ids); dups[os.path.basename(f)[:3] + ' T-V/J-V'] = sorted(k for k, m in c.items() if m > 1)
c = Counter(re.findall(r'^\|\s*(J-VI\.\d+)\s*\|', rd('docs/volumes/_integrate.md'), re.M)); dups['_integrate J-VI'] = sorted(k for k, n in c.items() if n > 1)
json.dump(dict(units=rows, totals=totals, duplicate_definitions=dups), open(f'{W}/sizes.json', 'w'), indent=1)
for x in rows + [dict(unit=k, **v) for k, v in totals.items()]:
    print(f"{x['unit']:<24} {x['old_bytes']:>9} -> {x['new_bytes']:>9} B ({(x['new_bytes'] / x['old_bytes'] - 1) * 100:+6.1f} %)  "
          f"{x['old_words']:>7} -> {x['new_words']:>7} w ({(x['new_words'] / x['old_words'] - 1) * 100:+6.1f} %)  KB {x['old_bytes'] / 1024:.1f} -> {x['new_bytes'] / 1024:.1f}")
print('duplicate definitions:', {k: v for k, v in dups.items() if v} or 'none')
