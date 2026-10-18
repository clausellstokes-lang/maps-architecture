#!/usr/bin/env python3
"""partH.py (coherence/assemble-r7x, P4, new) — ROUND-7 NOTES (9) (b), (f): every quoted "old" → "new" pair of
adjudication-r7x.md's Part H, read per unit, checked against the INSTALLED set: the new text present in the unit's file
(whitespace joined; a pair whose text the same entry rewrites further is reported, not failed), the old text gone (or
fewer). Read-only. Usage: partH.py UNTOUCHED_ROOT FINAL_ROOT. Writes partH.json beside it."""
import json, os, re, sys
W = os.path.dirname(os.path.abspath(__file__))
ADJ = '/home/user/maps-architecture/docs/validation/coherence/adjudication-r7x.md'
FILES = {'model': 'docs/ARCHITECTURE.md', 'pipeline': 'docs/ARCHITECTURE.md', 'determinism': 'docs/ARCHITECTURE.md',
         'scope': 'docs/ARCHITECTURE.md', 'V04': 'docs/volumes/V04-underground.md', 'V06': 'docs/volumes/V06-evolution.md',
         'V07': 'docs/volumes/V07-village.md', 'V09': 'docs/volumes/V09-application.md', 'V11': 'docs/volumes/V11-content.md'}
J = lambda s: re.sub(r'\s+', ' ', s).strip()
adj = open(ADJ, encoding='utf-8').read()
a = adj.index('## Part H — by unit'); b = adj.index("## Builders' choices")
H = adj[a:b]
parts = re.split(r'\n### ', H)[1:]
U, F = sys.argv[1], sys.argv[2]
rd = lambda R, p: J(open(f'{R}/{p}', encoding='utf-8').read())
cache = {}
res = []
PAIR = re.compile(r'"((?:[^"]|"(?=[^"→]*"\s*(?:,|\)|;|\.|—|$)))+?)"\s*→\s*"((?:[^"])+?)"(?=[\s.,;:)—]|$)')
for p in parts:
    unit = p.split('\n', 1)[0].split()[0]
    if unit not in FILES: continue
    f = FILES[unit]
    if (U, f) not in cache: cache[(U, f)] = rd(U, f)
    if (F, f) not in cache: cache[(F, f)] = rd(F, f)
    before, after = cache[(U, f)], cache[(F, f)]
    body = J(p)
    for m in re.finditer(r'"([^"]*)"\s*→\s*"([^"]*)"', body):
        old, new = m.group(1).strip(), m.group(2).strip()
        # strip leading/trailing ellipses used to elide context
        o2 = old.strip('… ').strip(); n2 = new.strip('… ').strip()
        segs = [s.strip() for s in n2.split('…') if len(s.strip()) > 12]
        new_ok = all(s in after for s in segs) if segs else (n2 in after)
        osegs = [s.strip() for s in o2.split('…') if len(s.strip()) > 12]
        old_before = sum(before.count(s) for s in osegs) if osegs else before.count(o2)
        old_after = sum(after.count(s) for s in osegs) if osegs else after.count(o2)
        res.append(dict(unit=unit, old=old[:160], new=new[:160], new_present=bool(new_ok),
                        missing_new_segments=[s[:120] for s in segs if s not in after],
                        old_count_before=old_before, old_count_after=old_after))
    # insertions: after "X" insert/add "Y" (X followed by Y), before "X" insert "Y" (Y followed by X)
    for m in re.finditer(r'(after|before) "(.+?)" (?:insert|add) "(.+?)"(?=[;,.]? *(?:\d\.|\*|$|;|its|\(|and|on|the|—))', body):
        where, x, y = m.group(1), m.group(2), m.group(3)
        joined = (x + y) if where == 'after' else (y + x)
        # the inner quotes of a catalogue line (V09) break the pattern; check the longest unquoted segments then
        segs = [s.strip() for s in re.split(r'"|…', joined) if len(s.strip()) > 12]
        present = J(joined) in after or (segs and all(s in after for s in segs))
        res.append(dict(unit=unit, kind='insert ' + where, old=x[:160], new=y[:160], new_present=bool(present),
                        missing_new_segments=[s[:120] for s in segs if s not in after] if not present else [],
                        old_count_before=before.count(J(joined)), old_count_after=after.count(J(joined))))
ok = sum(r['new_present'] for r in res)
print(f'pairs {len(res)}; new text present {ok}; absent {len(res) - ok}')
from collections import Counter
print('by unit', dict(Counter(r['unit'] for r in res))); print('insertions', dict(Counter(r['unit'] for r in res if r.get('kind'))), 'present', sum(r['new_present'] for r in res if r.get('kind')))
for r in res:
    if not r['new_present'] or (r.get('kind') is None and r['old_count_after'] >= r['old_count_before'] > 0):
        print('CHECK', r['unit'], '| new present', r['new_present'], '| old', r['old_count_before'], '->', r['old_count_after'])
        print('   old:', r['old'][:150]); print('   new:', r['new'][:150])
        for s in r['missing_new_segments']: print('   missing:', s)
json.dump(res, open(f'{W}/partH.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
