#!/usr/bin/env python3
"""allowrows.py (coherence/assemble-r5, P5; assemble-r4's allowrows.py and assemble-r3's reviewrows.py in one) — append
the reviewed allow rows for the unreviewed hits of the combined document, as ONE block, to
docs/validation/doc-checks-allow.tsv (append only; the file is shared). Two kinds of row, each written only after its
assertions hold on attrib.py's attribution (c3-attribution.tsv):
  (1) PROPOSED — a hit the seat that wrote the text proposed a row for (this round: scope's NOTE FOR ASSEMBLE, C3
      "3 on the city and"): new text carried by that seat's repair-r5 block, absent from the untouched base, held whole
      by no corpus file (assemble-r4's rule);
  (2) REVIEWED — a hit no seat proposed a row for (this round: four C3 runs in model's §2.7 block): the assembler's own
      review, written only when the hit is new text of the named seat's block, absent from the untouched base, held whole
      by no corpus file, and every final-base line the run stands on carries the text the review quotes (assemble-r3's
      reviewrows.py rule).
Every attributed hit must be covered by exactly one of the two, or the script stops. Usage: allowrows.py ATTRIBUTION.tsv [--dry]"""
import os, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm5/final/docs/ARCHITECTURE.md'
TAG = 'coherence/assemble-r5'
DRY = '--dry' in sys.argv
att = {(r[0], r[1]): r for r in (l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')) if r[0] != 'check'}
L = open(FIN, encoding='utf-8').read().split('\n')
# (check, run, carrying repair unit, the final-base text the run is read from, the reason)
REVIEWED = [
    ('C3', '5 and the hand off', 'model', 'V06 §3.7.6 (5)) and the hand-off down',
     "the assembler's review — §2.7's support step on the wall-borne station (repair-r5-model.md's §2.7 block): a section "
     "pointer's last item number (\"V06 §3.7.6 (5))\") followed by ordinary words (\"and the hand-off down that makes the "
     "enceinte the village's palisade\"); our own section-pointer digit and plain English"),
    ('C3', 'junction with a ring road', 'model', 'no junction with a ring road',
     "the assembler's review — §2.7's support step on the wall-borne station (repair-r5-model.md's §2.7 block): \"a "
     "free-standing gate tower or arch carrying the deck, with no gate law and no junction with a ring road\"; our own plain "
     "English naming the base's own ring road (no identifier)"),
    ('C3', '4 3 s for a', 'model', "(§4.3's for a route;",
     "the assembler's review — §2.7's under-deck strip clause (a) (repair-r5-model.md's §2.7 block): a section pointer "
     "with its possessive (\"§4.3's for a route\") in the list of each way's own crossing ladder; our own section-pointer "
     "digits and plain English"),
    ('C3', '3 3 s for a', 'model', "V01 §3.17.3 (3)'s for a stage-2",
     "the assembler's review — §2.7's under-deck strip clause (a) (repair-r5-model.md's §2.7 block): a volume section "
     "pointer's last digits with its possessive (\"V01 §3.17.3 (3)'s for a stage-2 seed's way\") in the same list; our own "
     "section-pointer digits and plain English"),
]
PROPOSED_UNIT = {('C3', '3 on the city and'): 'scope'}
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
rows = []
rev = {(c, r): (u, t, why) for c, r, u, t, why in REVIEWED}
for key, a in sorted(att.items(), key=lambda kv: kv[0]):
    c, run, lines, sub, unt, car, corpus, prop, preason = a
    if key in have: sys.exit(f'STOP — {c} {run!r} already has a reviewed row')
    if unt != 'no' or corpus != '-': sys.exit(f'STOP — {c} {run!r}: in the untouched base ({unt}) or held whole by {corpus}')
    if key in PROPOSED_UNIT:
        u = PROPOSED_UNIT[key]
        if prop != u or car != u: sys.exit(f'STOP — {c} {run!r}: proposed by {prop}, carried by {car}, expected {u}')
        kind = 'our own plain English'
        where = (f"new text of repair-r5-{car}.md, final base l. {lines} ({sub.strip()}), absent from the untouched base; held whole by no "
                 f"corpus file ({kind}; its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier")
        reason = f"{TAG}: the reviewed row proposed by repair-r5-{prop} — {preason.split(' || ')[0]} — re-checked: {where}"
    elif key in rev:
        u, text, why = rev[key]
        if car != u or prop != '-': sys.exit(f'STOP — {c} {run!r}: carried by {car}, proposed by {prop}; the review expects {u}, none')
        for ln in lines.split(','):
            if text not in L[int(ln) - 1]: sys.exit(f'STOP — {run!r}: l. {ln} does not carry {text!r}')
        reason = (f"{TAG} (2026-10-01): {why}; new text of repair-r5-{u}.md, absent from the untouched base, held whole by no corpus file "
                  f"(its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier (final base l. {lines}, {sub.strip()})")
    else:
        sys.exit(f'STOP — {c} {run!r}: neither proposed nor reviewed here')
    rows.append('\t'.join([c, run, reason.replace('\t', ' ')]))
hdr = (f"# block: {TAG}, 2026-10-01 (opus, the mechanical assembler of the coherence pass's repair round 5; PENDING FABLE REVIEW) — every "
       f"unreviewed hit of the assembled docs/ARCHITECTURE.md (the repair-r5 blocks applied; no swap this round) over every top-level heading "
       f"key (34) and the eight # keys, by the three-copy method against one corpus snapshot (untouched = the live base before this round, "
       f"sha256 5f34cceb…; new = the blocks applied; combined = the installed text, 2d84eac2…, equal to new); each hit is new text of a repair "
       f"block, attributed by script (work/assemble-r5/attrib.py -> c3-attribution.tsv, allowrows.py): one row proposed by the seat that "
       f"wrote the text (repair-r5-scope's NOTE FOR ASSEMBLE), the others the assembler's own review (no repair-r5 seat proposed them). Run "
       f"in the cloud checkout, where doc_checks warns that the reference corpus is INCOMPLETE (captures/, research/patreon, "
       f"research/devlogs, research/ftg-docs, research/external absent), so these rows are PROVISIONAL. Rows: {len(rows)}.")
print(len(rows), 'rows')
if DRY:
    print(hdr); [print(r) for r in rows]
else:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
