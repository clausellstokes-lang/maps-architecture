#!/usr/bin/env python3
"""tablerefs.py (coherence/assemble-r7y, P4 (b'); brief ROUND-7 NOTES (9) (e)) — the citations by name of §2.7's two tables
(model's block; assemble-r6's script, the header match widened to the installed table's '| wall event (paths) |'): every 'crossing table' citation's outcome name (*over the band*, *down before the wall*, *beneath*,
*unchanged meeting*), every crossing-table cell 'Wn·Cm' and every 'way-and-channel table, row(s) …' letter, in the
installed base and volumes, checked against what the installed §2.7 defines (the four bold-italic outcome names, the
crossing table's W rows and C columns, the way-and-channel table's rows (a)–(e)). Read-only. Usage: tablerefs.py ROOT
(a tree holding docs/ARCHITECTURE.md and docs/volumes/V*.md). Writes tablerefs.json beside it."""
import glob, json, os, re, sys
from collections import Counter
R = sys.argv[1]
W = os.path.dirname(os.path.abspath(__file__))
base = open(f'{R}/docs/ARCHITECTURE.md', encoding='utf-8').read()
s = base.index('\n### 2.7 '); e = base.index('\n### 2.8 ', s)
sec = base[s:e]
outcomes = set(re.findall(r'\*\*\*([a-z][a-z ]+?)\*\*\*', sec))
hdr = next(l for l in sec.split('\n') if l.strip().startswith('| wall event'))
cols = set(int(x) for x in re.findall(r'\bC(\d+)\b', hdr))
rows = set(int(x) for x in re.findall(r'^\s*\| \*\*W(\d+)\*\*', sec, re.M))
wc_rows = set(re.findall(r'^\s*\| \*\*\(([a-e])\)\*\*', sec, re.M))
units = [('base', f'{R}/docs/ARCHITECTURE.md')] + [(os.path.basename(f)[:3], f) for f in sorted(glob.glob(f'{R}/docs/volumes/V*.md'))]
res = dict(defined=dict(outcomes=sorted(outcomes), crossing_rows=sorted(rows), crossing_cols=sorted(cols), way_channel_rows=sorted(wc_rows)),
           cites=Counter(), bad=[])
for u, p in units:
    t = open(p, encoding='utf-8').read()
    j = re.sub(r'\s*\n\s*', ' ', t)          # lines read joined
    for m in re.finditer(r'crossing table[^.;()]{0,40}?\*([a-z][a-z ]+?)\*', j):
        nm = m.group(1); res['cites'][f'{u} outcome'] += 1
        if nm not in outcomes: res['bad'].append(dict(unit=u, kind='outcome', ref=nm, ctx=j[max(0, m.start() - 80):m.end() + 20]))
    for m in re.finditer(r'\bW(\d+)\s?·\s?C(\d+)\b', j):
        r_, c_ = int(m.group(1)), int(m.group(2)); res['cites'][f'{u} cell'] += 1
        if r_ not in rows or c_ not in cols: res['bad'].append(dict(unit=u, kind='cell', ref=m.group(0), ctx=j[max(0, m.start() - 80):m.end() + 20]))
    for m in re.finditer(r'way-and-channel table,? rows? ([^;:)\]]{0,40})', j):
        tail = m.group(1)
        letters = re.findall(r'(?<![A-Za-z])\(?([a-e])\)?(?![A-Za-z])', re.split(r'[,.]\s(?!and|\(|[a-e]\b)', tail)[0])
        res['cites'][f'{u} wc-row'] += 1
        if not letters or any(x not in wc_rows for x in letters):
            res['bad'].append(dict(unit=u, kind='wc-row', ref=tail[:40], ctx=j[max(0, m.start() - 60):m.end() + 10]))
    for m in re.finditer(r'crossing table,? (?:rows? |row )?(W\d+)', j):
        if int(m.group(1)[1:]) not in rows: res['bad'].append(dict(unit=u, kind='row', ref=m.group(1), ctx=j[max(0, m.start() - 60):m.end() + 10]))
res['cites'] = dict(sorted(res['cites'].items()))
json.dump(res, open(f'{W}/tablerefs.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('defined', res['defined']); print('cites', res['cites']); print('bad', len(res['bad']))
for b in res['bad']: print('  ', b['unit'], b['kind'], repr(b['ref']), '|', b['ctx'][-200:])
