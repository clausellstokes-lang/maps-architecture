#!/usr/bin/env python3
"""partH-hand.py (coherence/assemble-r7y, P4, new) — the three insertions of adjudication-r7y's Part H that partH.py's
pattern cannot cut (its look-ahead runs past their closing quote into the next entry): scope S2 item 3, scope S4 item 1,
V06 V6-1 item 2. Each insert text is cut from the adjudication by its exact opening and closing delimiters (never
retyped), joined to its anchor ('before' / 'after'), whitespace-joined, and checked present exactly once in the INSTALLED
unit and absent from the untouched one. Usage: partH-hand.py UNTOUCHED_ROOT FINAL_ROOT. Writes partH-hand.json."""
import json, os, re, sys
W = os.path.dirname(os.path.abspath(__file__))
J = lambda s: re.sub(r'\s+', ' ', s).strip()
adj = J(open('/home/user/maps-architecture/docs/validation/coherence/adjudication-r7y.md', encoding='utf-8').read())
U, F = sys.argv[1], sys.argv[2]
CASES = [
 ('scope S2 (3)', 'docs/ARCHITECTURE.md', 'before', "; and (3)'s table-edit variant regenerated",
  "*Carried way*)\") insert \"", "\". (This file's clauses"),
 ('scope S4 (1)', 'docs/ARCHITECTURE.md', 'before', "; (4) *beneath* by hand and at an epoch",
  "by hand and at an epoch\" insert \"", "\"; 2. T110-2 (1)"),
 ('V06 V6-1 (2)', 'docs/volumes/V06-evolution.md', 'after', "every crossing under a span §4.3 admits;",
  "every crossing under a span §4.3 admits;\" insert \"", "\". §13.8's T110 row and V06's E3 cell"),
]
res = []
for name, f, where, anchor, op, cl in CASES:
    assert adj.count(op) == 1 and adj.count(cl) == 1, (name, adj.count(op), adj.count(cl))
    a = adj.index(op) + len(op); b = adj.index(cl, a); ins = adj[a:b]
    joined = J(ins + anchor) if where == 'before' else J(anchor + ins)
    before, after = J(open(f'{U}/{f}', encoding='utf-8').read()), J(open(f'{F}/{f}', encoding='utf-8').read())
    r = dict(entry=name, file=f, where=where, anchor=anchor, insert_words=len(ins.split()), insert_head=ins[:120], insert_tail=ins[-120:],
             joined_in_installed=after.count(joined), joined_in_untouched=before.count(joined), insert_in_installed=after.count(J(ins)))
    res.append(r); print(f"{name:<14} {where:<6} words {r['insert_words']:>3} joined installed {r['joined_in_installed']} untouched {r['joined_in_untouched']} | {ins[:90]} … {ins[-60:]}")
json.dump(res, open(f'{W}/partH-hand.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
