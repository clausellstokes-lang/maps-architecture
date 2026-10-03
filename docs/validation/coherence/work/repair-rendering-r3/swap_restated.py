#!/usr/bin/env python3
"""swap_restated.py — NOTE FOR ASSEMBLE of repair-r3-rendering: the RATIONALE-A block's last row restates the existing
Part A entry J-A68.89. After the blocks are applied, the appended row takes the older row's place and the older row is
deleted (assemble-r1's `swap_restated` rule). The script stops unless J-A68.89 occurs exactly twice in Part A.
usage: python3 swap_restated.py RATIONALE_IN RATIONALE_OUT"""
import hashlib, re, sys
IDS = ['J-A68.89']
src, out = sys.argv[1], sys.argv[2]
lines = open(src, encoding='utf-8').read().split('\n')
a = next(i for i, l in enumerate(lines) if l.startswith('## Part A'))
b = next(i for i, l in enumerate(lines) if l.startswith('## Part B'))
for rid in IDS:
    rows = [i for i in range(a, b) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', lines[i])]
    if len(rows) != 2:
        sys.exit(f'STOP — {rid} found {len(rows)} times in Part A, expected 2')
    old, new = rows
    lines[old] = lines[new]
    del lines[new]
    print(f'{rid}: l. {old + 1} <- l. {new + 1}')
text = '\n'.join(lines)
ids = [m.group(1) for l in lines[a:b] for m in [re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)] if m]
dups = sorted({i for i in ids if ids.count(i) > 1})
print('Part A rows', len(ids), 'duplicates', dups)
open(out, 'w', encoding='utf-8').write(text)
print('sha256', hashlib.sha256(text.encode('utf-8')).hexdigest())
