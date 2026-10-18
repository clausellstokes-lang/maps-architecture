#!/usr/bin/env python3
"""reviewrows.py (coherence/assemble-r3, P5) — the assembler's own reviewed allow rows for the unreviewed hits of the
combined base that no repair seat proposed a row for (no repair-r3 preamble proposes any row this round). Each row is
written only after the assertions below hold on attrib.py's attribution (c3-attribution.tsv): the hit is new text of a
repair-r3 block (absent from the untouched base), held whole by no corpus file, and its text reads as stated in the row's
reason (checked against the final base line). Appends one block to docs/validation/doc-checks-allow.tsv (append only;
the file is shared). Usage: reviewrows.py ATTRIBUTION.tsv [--dry]"""
import os, re, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm3/final/docs/ARCHITECTURE.md'
DRY = '--dry' in sys.argv
att = {(r[0], r[1]): r for r in (l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')) if r[0] != 'check'}
L = open(FIN, encoding='utf-8').read().split('\n')
# (check, run, carrying repair unit, the final-base text the run is read from, the reason)
REVIEWED = [
    ('C3', 'in 8 8 2 9', 'rendering', '| §8.8, §2.9 |',
     "coherence/assemble-r3 (2026-10-01): the assembler's review — a run across two cells of the judgment index's new row "
     "J-A122.02 (repair-r3-rendering.md's J-ROWS block): the last word of its choice cell (\"the camps the crisis framing takes "
     "in\") and its where cell's two section pointers (\"§8.8, §2.9\"); our own section-pointer digits after an ordinary word, "
     "held whole by no corpus file (its 3-grams 'in 8 8', '8 8 2', '8 2 9' sit in different findings files, meeting by "
     "chance); absent from the untouched base; no list, table, grammar, palette or identifier"),
]
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
rows = []
for c, run, unit, text, reason in REVIEWED:
    a = att.get((c, run))
    if not a: sys.exit(f'STOP — {c} {run!r} is not among the attributed hits')
    _, _, lines, sub, unt, car, corpus, prop, _ = a
    if unt != 'no' or car != unit or corpus != '-' or prop != '-':
        sys.exit(f'STOP — {c} {run!r}: attribution differs from the review ({unt}, {car}, {corpus}, {prop})')
    for ln in lines.split(','):
        if text not in L[int(ln) - 1]: sys.exit(f'STOP — {run!r}: l. {ln} does not carry {text!r}')
    if (c, run) in have: sys.exit(f'STOP — {c} {run!r} already has a reviewed row')
    rows.append('\t'.join([c, run, reason + f" (final base l. {lines}, {sub.strip()})"]))
missing = [k for k in att if k not in {(r[0], r[1]) for r in REVIEWED}]
if missing: sys.exit(f'STOP — unreviewed hits without a review here: {missing}')
hdr = ("# block: coherence/assemble-r3, 2026-10-01 (opus, the mechanical assembler of the coherence pass's repair round 3; PENDING FABLE "
       "REVIEW) — every unreviewed hit of the assembled docs/ARCHITECTURE.md (the repair-r3 blocks applied, the restated rows swapped) over "
       "every top-level heading key (34) and the eight # keys, by the three-copy method against one corpus snapshot (untouched = the live "
       "base before this round, sha256 4ed292e9…; new = the blocks applied; combined = the installed text, 593c657d…); no repair-r3 seat "
       "proposed a row, so each row is the assembler's own review, attributed by script (work/assemble-r3/attrib.py -> c3-attribution.tsv, "
       "reviewrows.py). Run in the cloud checkout, where doc_checks warns that the reference corpus is INCOMPLETE (captures/, "
       f"research/patreon, research/devlogs, research/ftg-docs, research/external absent), so these rows are PROVISIONAL. Rows: {len(rows)}.")
print(len(rows), 'rows')
if DRY:
    print(hdr); [print(r) for r in rows]
else:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
