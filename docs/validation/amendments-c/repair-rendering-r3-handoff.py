#!/usr/bin/env python3
# PENDING FABLE REVIEW — hand-off script of amendments-c/repair-rendering-r3 (opus stand-in). Stdlib only.
"""repair-rendering-r3-handoff.py — the restated-row swap of repair-rendering-r3 (its report's § Assembler hand-off).

apply-blocks.py appends the J-ROWS and RATIONALE-A rows after each table's last row, so the five restated ids
(J-A68.85, J-A68.89, J-A68.90, J-A68.92, J-A101.86) stand twice in the judgment index and twice in Part A ("DUPLICATE ID
inserted"). This script moves each appended (later) row into the older row's place and deletes the older row, in both
files, asserting that each id stands exactly twice before and once after, and that the two new ids (J-A68.93, J-A68.94)
stand once. Run it AFTER every repair-r3 block file is applied. It never writes in place.

usage: python3 repair-rendering-r3-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md
"""
import argparse, sys

RESTATED = ['J-A68.85', 'J-A68.89', 'J-A68.90', 'J-A68.92', 'J-A101.86']
NEW = ['J-A68.93', 'J-A68.94']

def swap(text, label):
    L = text.split('\n')
    for jid in RESTATED:
        idx = [i for i, l in enumerate(L) if l.startswith('| ' + jid + ' |')]
        if len(idx) != 2:
            sys.exit(f'STOP — {label}: {jid} stands {len(idx)} times, expected 2 (blocks not applied, or already swapped)')
        old, new = idx
        L[old] = L[new]
        del L[new]
        print(f'ok {label}: {jid} restated row moved to l. {old + 1}')
    for jid in RESTATED + NEW:
        n = sum(1 for l in L if l.startswith('| ' + jid + ' |'))
        if n != 1:
            sys.exit(f'STOP — {label}: {jid} stands {n} times after the swap')
    return '\n'.join(L)

ap = argparse.ArgumentParser()
ap.add_argument('--doc', required=True); ap.add_argument('--rationale', required=True)
ap.add_argument('--out-doc', required=True); ap.add_argument('--out-rationale', required=True)
a = ap.parse_args()
for src, dst in ((a.doc, a.out_doc), (a.rationale, a.out_rationale)):
    if src == dst:
        sys.exit('STOP — this script never writes in place; give new output paths')
d = swap(open(a.doc, encoding='utf-8').read(), 'index')
r = swap(open(a.rationale, encoding='utf-8').read(), 'Part A')
open(a.out_doc, 'w', encoding='utf-8').write(d)
open(a.out_rationale, 'w', encoding='utf-8').write(r)
print('done')
