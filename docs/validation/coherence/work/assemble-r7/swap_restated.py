#!/usr/bin/env python3
"""swap_restated.py — NOTE FOR ASSEMBLE (1) of repair-r7-scope (copied by coherence/assemble-r7 from work/repair-scope-r3/swap_restated.py, IDS changed): the J-ROWS block's row and the RATIONALE-A block's row restate
the existing judgment-index row and Part A entry of J-A110.01 (JUDGMENT 1 of repair-r7-scope: "T110-1 – T110-7" -> "T110-1 – T110-8"). After every block file is applied, each appended
row takes its older row's place and the older row is deleted (assemble-r1's `swap_restated` rule). The script stops unless
J-A110.01 occurs exactly twice in the base's judgment index ("# Judgment calls" up to the next "# " heading) and exactly
twice in the rationale's Part A ("## Part A" up to "## Part B"); the appended row is the later one.
usage: python3 swap_restated.py BASE_IN RATIONALE_IN BASE_OUT RATIONALE_OUT"""
import hashlib, re, sys

IDS = ['J-A110.01']


def swap(lines, a, b, where):
    for rid in IDS:
        rows = [i for i in range(a, b) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', lines[i])]
        if len(rows) != 2:
            sys.exit(f'STOP — {rid} found {len(rows)} times in {where}, expected 2')
        old, new = rows
        lines[old] = lines[new]
        del lines[new]
        print(f'{where}: {rid}: l. {old + 1} <- l. {new + 1}')
    return lines


def ids_in(lines, a, b):
    return [m.group(1) for l in lines[a:b] for m in [re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)] if m]


base_in, rat_in, base_out, rat_out = sys.argv[1:5]
bl = open(base_in, encoding='utf-8').read().split('\n')
a = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls'))
b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
bl = swap(bl, a, b, 'judgment index')
b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
bi = ids_in(bl, a, b)
rl = open(rat_in, encoding='utf-8').read().split('\n')
pa = next(i for i, l in enumerate(rl) if l.startswith('## Part A'))
pb = next(i for i, l in enumerate(rl) if l.startswith('## Part B'))
rl = swap(rl, pa, pb, 'Part A')
pb = next(i for i, l in enumerate(rl) if l.startswith('## Part B'))
ri = ids_in(rl, pa, pb)
for name, ids in (('judgment index', bi), ('Part A', ri)):
    print(name, 'rows', len(ids), 'duplicates', sorted({i for i in ids if ids.count(i) > 1}))
print('ids in one and not the other', sorted(set(bi) ^ set(ri)))
bt, rt = '\n'.join(bl), '\n'.join(rl)
open(base_out, 'w', encoding='utf-8').write(bt)
open(rat_out, 'w', encoding='utf-8').write(rt)
print('base sha256', hashlib.sha256(bt.encode('utf-8')).hexdigest())
print('rationale sha256', hashlib.sha256(rt.encode('utf-8')).hexdigest())
