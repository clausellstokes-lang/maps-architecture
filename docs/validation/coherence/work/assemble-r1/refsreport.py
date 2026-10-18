#!/usr/bin/env python3
"""refsreport.py (coherence/assemble-r1, P4) — summarises refs.py's two runs (the untouched set and the final set, each a
mirror tree): counts by unit and class, the BROKEN and FIX lists (FIX = assemble-r0's mechanical G-cite prefix), the
ambiguous-form list (ambiguous-refs.tsv) and the external list (external-refs.tsv). Usage: refsreport.py BEFORE.json FINAL.json"""
import json, sys, os
from collections import Counter
W = os.path.dirname(os.path.abspath(__file__))
b, f = (json.load(open(p, encoding='utf-8')) for p in sys.argv[1:3])
out = dict(before=dict(heads=b['heads'], defs=b['defs'], by_class=dict(Counter(r['cls'] for r in b['refs'])), counts=b['counts']),
           final=dict(heads=f['heads'], defs=f['defs'], by_class=dict(Counter(r['cls'] for r in f['refs'])), counts=f['counts']),
           broken_before=[{k: r[k] for k in ('unit', 'line', 'kind', 'ref')} | {'ctx': r['ctx'][-130:]} for r in b['refs'] if r['cls'] == 'BROKEN'],
           broken_final=[{k: r[k] for k in ('unit', 'line', 'kind', 'ref')} | {'ctx': r['ctx'][-130:]} for r in f['refs'] if r['cls'] == 'BROKEN'],
           fix_final=[{k: r[k] for k in ('unit', 'line', 'kind', 'ref')} for r in f['refs'] if r['cls'] == 'FIX'],
           total_before=len(b['refs']), total_final=len(f['refs']))
amb = ['unit\tline\tref\tlist head (the other reading)\tcontext']
for r in f['refs']:
    if r['cls'] == 'ambiguous':
        amb.append('\t'.join([r['unit'], str(r['line']), r['ref'], r.get('alt', ''), r['ctx'][-100:].replace('\t', ' ').replace('\n', ' / ')]))
ext = ['unit\tline\tkind\tref\tcontext']
for r in f['refs']:
    if r['cls'] == 'external':
        ext.append('\t'.join([r['unit'], str(r['line']), r['kind'], r['ref'], r['ctx'][-100:].replace('\t', ' ').replace('\n', ' / ')]))
open(f'{W}/ambiguous-refs.tsv', 'w', encoding='utf-8').write('\n'.join(amb) + '\n')
open(f'{W}/external-refs.tsv', 'w', encoding='utf-8').write('\n'.join(ext) + '\n')
out['ambiguous_by_unit'] = dict(Counter(r['unit'] for r in f['refs'] if r['cls'] == 'ambiguous'))
out['external_by_kind'] = dict(Counter(r['kind'] for r in f['refs'] if r['cls'] == 'external'))
out['final_by_kind_resolved'] = dict(Counter(r['kind'] for r in f['refs'] if r['cls'].startswith('resolved')))
json.dump(out, open(f'{W}/refs-summary.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('total', out['total_before'], '->', out['total_final'])
print('before', out['before']['by_class']); print('final ', out['final']['by_class'])
print('broken before', out['broken_before']); print('broken final', out['broken_final']); print('FIX final', len(out['fix_final']))
print('ambiguous by unit', out['ambiguous_by_unit']); print('external by kind', out['external_by_kind'])
print('resolved by kind', out['final_by_kind_resolved'])
print('ids defined', out['before']['defs'], '->', out['final']['defs'])
