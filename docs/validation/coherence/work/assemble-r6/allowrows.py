#!/usr/bin/env python3
"""allowrows.py (coherence/assemble-r6, P5; assemble-r5's allowrows.py, its two rules unchanged) — append the reviewed allow
rows for the unreviewed hits of the combined document, as ONE block, to docs/validation/doc-checks-allow.tsv (append only;
the file is shared). Two kinds of row, each written only after its assertions hold on attrib.py's attribution
(c3-attribution.tsv):
  (1) PROPOSED — a hit the seat that wrote the text proposed a row for (this round: repair-r6-scope's NOTE FOR ASSEMBLE
      (2), six C3 runs in §13.2's T110-2 and T114-3 and §13.8's T110 row): new text carried by that seat's repair-r6 block,
      absent from the untouched base, held whole by no corpus file (assemble-r4's rule);
  (2) REVIEWED — a hit no seat proposed a row for (this round: twelve C3 runs in model's §2.7 block — the support step,
      the way-and-channel table and the crossing table): the assembler's own review, written only when the hit is new
      text of the named seat's block, absent from the untouched base, held whole by no corpus file, and every final-base
      line the run starts on carries the text the review quotes (assemble-r3's reviewrows.py rule).
Every attributed hit must be covered by exactly one of the two, or the script stops. Usage: allowrows.py ATTRIBUTION.tsv [--dry]"""
import os, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm6/final/docs/ARCHITECTURE.md'
TAG = 'coherence/assemble-r6'
DRY = '--dry' in sys.argv
att = {(r[0], r[1]): r for r in (l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')) if r[0] != 'check'}
L = open(FIN, encoding='utf-8').read().split('\n')
# (check, run, carrying repair unit, the final-base text the run's start line carries, the reason)
M = "repair-r6-model.md's §2.7 block"
REVIEWED = [
    ('C3', '0 clear of the ramp', 'model', 'through a gate there on ground part 0',
     f"the assembler's review — the crossing table's outcome *beneath* ({M}): \"a road deck's carried way on its ground course beyond a foot, through a gate "
     f"there on ground part 0 clear of the ramp, stair, foot and under-deck strip\": our own ground-part number followed by ordinary words"),
    ('C3', '3 19 2 1 and', 'model', 'V06 §3.19.2 (1)) and',
     f"the assembler's review — §2.7's support step (7), a frame growth's extension ({M}): a volume section pointer's digits and item number (\"V06 §3.19.2 (1))\") "
     f"followed by \"and\"; our own section-pointer digits"),
    ('C3', '3 7 6 3 s', 'model', "V06 §3.7.6 (3)'s",
     f"the assembler's review — the crossing table's outcome *beneath* and its row W1 ({M}): a volume section pointer with its item number "
     f"and possessive (\"V06 §3.7.6 (3)'s quay wall\"); our own section-pointer digits"),
    ('C3', 'a ring is a standing', 'model', "a ring is a standing support's",
     f"the assembler's review — the way-and-channel table's lead ({M}): \"a ring is a standing support's and a `vault` span under a wall "
     f"is read `open`\"; our own plain English"),
    ('C3', 'a wall and a raised', 'model', '*a wall and a raised way*',
     f"the assembler's review — §2.7's support step (6) (d) ({M}): \"*a wall and a raised way* meet by this table, **the crossing "
     f"table**\"; our own plain English naming the base's own records"),
    ('C3', 'clear of the towers and gates', 'model', 'its strip clear',
     f"the assembler's review — the crossing table's note on the table ({M}): \"an aqueduct's supports off the band and its strip clear of the towers "
     f"and gates (`bend.wall.aqueductArch`)\"; our own plain English"),
    ('C3', 'no crossing of the gate law', 'model', 'no crossing of the gate law',
     f"the assembler's review — the crossing table's outcome *beneath* ({M}): \"No gate on the deck, which passes over the run and "
     f"is no crossing of the gate law\"; our own plain English naming the base's own gate law"),
    ('C3', 'on either side of the way', 'model', 'on either side of the way',
     f"the assembler's review — the crossing table's outcome *beneath* ({M}): \"bent locally, between its nearest points clear of the "
     f"strip on either side of the way, to pass through the gate\"; our own plain English"),
    ('C3', 's or the edge of', 'model', "a road deck's, or the edge of",
     f"the assembler's review — the crossing table's outcome *beneath* ({M}): \"The band is laid through every support standing in it — "
     f"a road deck's, or the edge of an aqueduct's\"; a possessive's s and ordinary words"),
    ('C3', 'so it crosses the boundary', 'model', 'so it crosses the boundary on ground part 0',
     f"the assembler's review — the way-and-channel table's row (d) ({M}): \"its course comes down before the stage's picked boundary "
     f"(*down before the wall*), so it crosses the boundary on ground part 0\"; our own plain English"),
    ('C3', 'state and the test that', 'model', 'raised-way state and the test that',
     f"the assembler's review — the crossing table's note on the table ({M}): \"each cell gives the outcome for that raised-way state and "
     f"the test that runs it\"; our own plain English"),
    ('C3', 'the foot of the ramp', 'model', 'carried way beyond the',
     f"the assembler's review — the crossing table's outcome *beneath* ({M}): \"to cross a road deck's carried way beyond the foot of the "
     f"ramp, stair or foot it met, through a gate there\"; our own plain English"),
]
SCOPE6 = ['and on the second run', 'no reading of the wall', 'and none in the band', 're derived from the new', 'waiting on the other the',
          'of 1 2 4 5 7 and']
PROPOSED_UNIT = {('C3', r): 'scope' for r in SCOPE6}

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
        where = (f"new text of repair-r6-{car}.md, final base l. {lines} ({sub.strip()}), absent from the untouched base; held whole by no "
                 f"corpus file ({kind}; its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier")
        reason = f"{TAG}: the reviewed row proposed by repair-r6-{prop} — {preason.split(' || ')[0]} — re-checked: {where}"
    elif key in rev:
        u, text, why = rev[key]
        if car != u or prop != '-': sys.exit(f'STOP — {c} {run!r}: carried by {car}, proposed by {prop}; the review expects {u}, none')
        for ln in lines.split(','):
            if text not in L[int(ln) - 1]: sys.exit(f'STOP — {run!r}: l. {ln} does not carry {text!r}')
        reason = (f"{TAG} (2026-10-01): {why}; new text of repair-r6-{u}.md, absent from the untouched base, held whole by no corpus file "
                  f"(its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier (final base l. {lines}, {sub.strip()})")
    else:
        sys.exit(f'STOP — {c} {run!r}: neither proposed nor reviewed here')
    rows.append('\t'.join([c, run, reason.replace('\t', ' ')]))
hdr = (f"# block: {TAG}, 2026-10-01 (opus, the mechanical assembler of the coherence pass's repair round 6; PENDING FABLE REVIEW) — every "
       f"unreviewed hit of the assembled docs/ARCHITECTURE.md (the repair-r6 blocks applied, then repair-r6-scope's J-A67.45 swap, which touches no hit) over every top-level heading "
       f"key (34) and the eight # keys, by the three-copy method against one corpus snapshot (untouched = the live base before this round, "
       f"sha256 2d84eac2…; new = the blocks applied, fd59b926…; combined = the installed text after the swap, f39f1c30…); each hit is new text of a repair "
       f"block, attributed by script (work/assemble-r6/attrib.py -> c3-attribution.tsv, allowrows.py): six rows proposed by the seat that "
       f"wrote the text (repair-r6-scope's NOTE FOR ASSEMBLE (2)), twelve the assembler's own review (model's §2.7 text; no repair-r6 seat "
       f"proposed them). Run "
       f"in the cloud checkout, where doc_checks warns that the reference corpus is INCOMPLETE (captures/, research/patreon, "
       f"research/devlogs, research/ftg-docs, research/external absent), so these rows are PROVISIONAL. Rows: {len(rows)}.")
print(len(rows), 'rows')
if DRY:
    print(hdr); [print(r) for r in rows]
else:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
