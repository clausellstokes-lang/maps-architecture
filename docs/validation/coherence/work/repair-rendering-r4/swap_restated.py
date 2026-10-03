#!/usr/bin/env python3
"""swap_restated.py — NOTE FOR ASSEMBLE of repair-r4-rendering: the J-ROWS block restates the judgment-index row of
J-A121.02 and the RATIONALE-A block the Part A entries of J-A68.85, J-A68.89 and J-A68.90 (VCS-r3-07: the retired term
"reference view" read "reference viewport", G-refview; nothing else in the rows changes). After every block file is
applied, each appended row takes its older row's place and the older row is deleted (assemble-r1's `swap_restated`
rule). The script stops unless each id occurs exactly twice in its table — the base's judgment index ("# Judgment calls"
up to the next "# " heading) for INDEX_IDS, the rationale's Part A ("## Part A" up to "## Part B") for PART_A_IDS — the
appended row being the later one.
usage: python3 swap_restated.py BASE_IN RATIONALE_IN BASE_OUT RATIONALE_OUT"""
import hashlib, re, sys

INDEX_IDS = ['J-A121.02']
PART_A_IDS = ['J-A68.85', 'J-A68.89', 'J-A68.90']


def swap(lines, a, b, where, ids):
    for rid in ids:
        rows = [i for i in range(a, b) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', lines[i])]
        if len(rows) != 2:
            sys.exit(f'STOP — {rid} found {len(rows)} times in {where}, expected 2')
        old, new = rows
        lines[old] = lines[new]
        del lines[new]
        b -= 1
        print(f'{where}: {rid}: l. {old + 1} <- l. {new + 1}')
    return lines


def ids_in(lines, a, b):
    return [m.group(1) for l in lines[a:b] for m in [re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)] if m]


base_in, rat_in, base_out, rat_out = sys.argv[1:5]
bl = open(base_in, encoding='utf-8').read().split('\n')
a = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls'))
b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
bl = swap(bl, a, b, 'judgment index', INDEX_IDS)
b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
bi = ids_in(bl, a, b)
rl = open(rat_in, encoding='utf-8').read().split('\n')
pa = next(i for i, l in enumerate(rl) if l.startswith('## Part A'))
pb = next(i for i, l in enumerate(rl) if l.startswith('## Part B'))
rl = swap(rl, pa, pb, 'Part A', PART_A_IDS)
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
