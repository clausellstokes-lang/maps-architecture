#!/usr/bin/env python3
"""sweeps.py (coherence/assemble-r7y, P4, new) — the seats' own class (A) sweep edits, outside Part H (each named in its
repair header with old -> new): model X1-X5, pipeline SW1, V07's F-V-RAISED detection. Each new text (as the header quotes
it) checked present in the INSTALLED unit, its old text gone, whitespace joined. Usage: sweeps.py UNTOUCHED FINAL."""
import json, os, re, sys
W = os.path.dirname(os.path.abspath(__file__)); J = lambda s: re.sub(r'\s+', ' ', s).strip()
U, F = sys.argv[1], sys.argv[2]; B = 'docs/ARCHITECTURE.md'
CASES = [
 ('model X1', B, "admit its gate (law 1 (5), law 2 (a), law 3; `bend.raised.underSpan`, its wall form)",
  "admit its gate (law 1, read with its terms, chiefly (5); law 2 (a), law 3; `bend.raised.underSpan`, its wall form)"),
 ('model X2', B, "(law 1 (2); *Where the line crosses*)", "(law 1, read with its terms; chiefly (2); *Where the line crosses*)"),
 ('model X3', B, "meeting each standing wall as a course laid then (these laws, law 1 (2)–(6);",
  "meeting each standing wall as a course laid then (these laws, law 1 (2)–(6), (9)–(11);"),
 ('model X4', B, "no gate, postern, tower or fixed place under it but where law 1 (4)–(6) admit it",
  "no gate, postern, tower or fixed place under it but where these laws admit it (law 1, read with its terms; chiefly (4)–(6))"),
 ('model X5', B, "the wall bending itself, else giving way (law 1 (10)).",
  "the wall bending itself, else the soft things moved, else giving way (law 1 (10); law 2, in its order)."),
 ('pipeline SW1', B, "a raised way met by §2.7's laws (law 1 (1), (3)–(5); its worked example *beneath*)",
  "a raised way met by §2.7's laws (law 1, read with its terms, chiefly (1), (3)–(5); its worked example *beneath*)"),
 ('V07 sweep (F-V-RAISED)', 'docs/volumes/V07-village.md', "a fixed place with no clear point in reach",
  "a fixed place with no point in reach that §2.7's laws admit"),
]
res = []
for name, f, old, new in CASES:
    b, a = J(open(f'{U}/{f}', encoding='utf-8').read()), J(open(f'{F}/{f}', encoding='utf-8').read())
    r = dict(entry=name, file=f, old_before=b.count(J(old)), old_after=a.count(J(old)), new_before=b.count(J(new)), new_after=a.count(J(new)))
    res.append(r); print(f"{name:<24} old {r['old_before']} -> {r['old_after']}   new {r['new_before']} -> {r['new_after']}")
json.dump(res, open(f'{W}/sweeps.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
