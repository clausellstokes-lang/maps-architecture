#!/usr/bin/env python3
"""ambdiff.py (coherence/assemble-r7y, P4) — the ambiguous-form references new and gone this round: refs.py's two runs
compared by (unit, reference, the 80 characters of context before it), line numbers ignored. Writes ambiguous-diff.txt."""
import json, sys, os
from collections import Counter
W = os.path.dirname(os.path.abspath(__file__))
b, f = (json.load(open(p, encoding='utf-8')) for p in sys.argv[1:3])
key = lambda r: (r['unit'], r['ref'], ' '.join(r['ctx'][-80:].split()))
A = Counter(key(r) for r in b['refs'] if r['cls'] == 'ambiguous'); B = Counter(key(r) for r in f['refs'] if r['cls'] == 'ambiguous')
lines = {key(r): r['line'] for r in f['refs'] if r['cls'] == 'ambiguous'}; olines = {key(r): r['line'] for r in b['refs'] if r['cls'] == 'ambiguous'}
out = [f'ambiguous-form references: untouched {sum(A.values())}, final {sum(B.values())}']
for k in sorted((B - A).elements()): out.append(f'NEW  {k[0]} l. {lines[k]} {k[1]} | …{k[2]}')
for k in sorted((A - B).elements()): out.append(f'GONE {k[0]} (was l. {olines[k]}) {k[1]} | …{k[2]}')
open(f'{W}/ambiguous-diff.txt', 'w', encoding='utf-8').write('\n'.join(out) + '\n'); print('\n'.join(out))
