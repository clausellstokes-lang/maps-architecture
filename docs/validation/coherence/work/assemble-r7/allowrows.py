#!/usr/bin/env python3
"""allowrows.py (coherence/assemble-r7, P5; assemble-r6's allowrows.py, its two rules unchanged but that a run several
seats' text carries may be covered by the row its proposer proposed) — append the reviewed allow rows for the unreviewed
hits of the combined document, as ONE block, to docs/validation/doc-checks-allow.tsv (append only; the file is shared).
Two kinds of row, each written only after its assertions hold on attrib.py's attribution (c3-attribution.tsv):
  (1) PROPOSED — a hit the seat that wrote the text proposed a row for (this round: repair-r7-scope's NOTE FOR ASSEMBLE
      (2), twelve C3 runs in §13.2's T110-2, and repair-r7-determinism's four proposed rows in §7.1 and §7.3; one run,
      "law 1 2 5 6", proposed by both): new text carried by a proposing seat's repair-r7 block (every proposer among the
      carriers; where the model's §2.7 text carries the same run too, this seat read that site as well), absent from the
      untouched base, held whole by no corpus file (assemble-r4's rule);
  (2) REVIEWED — a hit no seat proposed a row for (this round: forty-three C3 runs in model's §2.7 block — the laws, their
      terms and the worked examples; the model's header lists them for this seat and proposes no row): the assembler's own
      review, written only when the hit is new text of the named seat's block, absent from the untouched base, held whole
      by no corpus file — or, for two runs, held whole only by a reader-tier findings note in our own words where the run
      is ordinary English of another subject, read in context (assemble-r1's precedent) — and every final-base line the
      run starts on carries the text the review quotes, case aside (assemble-r3's reviewrows.py rule).
Every attributed hit must be covered by exactly one of the two, or the script stops. Usage: allowrows.py ATTRIBUTION.tsv [--dry]"""
import os, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7/final/docs/ARCHITECTURE.md'
TAG = 'coherence/assemble-r7'
DRY = '--dry' in sys.argv
att = {(r[0], r[1]): r for r in (l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')) if r[0] != 'check'}
L = open(FIN, encoding='utf-8').read().split('\n')
# (check, run, carrying repair unit, the final-base text the run's start line carries, the reason)
M = "repair-r7-model.md's §2.7 block"
LAWS, EX = "§2.7's laws", "§2.7's worked examples"
PTR, ENG = 'numbered law pointers of the citation form Part H\'s head binds, no reference phrasing', 'our own plain English'
SEC = 'our own section-pointer digits with their item numbers'
# (run, carrying unit, the text the start line carries, where, the quoted context, kind, corpus note or None)
R = [
    ('1 3 and a road', 'law 1 (3)); and a road', f"{EX}, *beneath*", "(law 1 (3)); and a road deck's carried way on its ground course", PTR, None),
    ('1 4 is a gate and', 'law 1 (4)), is a gate and', f"{EX}, the way-and-channel table's row (d)", "(these laws, law 1 (4)), is a gate and one of `c`", PTR, None),
    ('1 5 6 4 3', 'law 1 (5), (6); §4.3', f"{EX}, *over the band*", "(law 1 (5), (6); §4.3 *Where it may not go*", PTR, None),
    ('2 1 3 5 6', 'T110-2 (1), (3), (5), (6', f"{EX}, the way-and-channel table's row (e)", "T110-2 (1), (3), (5), (6)", 'a test id with its clause numbers, our own', None),
    ('3 19 2 2 the', 'V06 §3.19.2 (2)) — the', f"{EX}, *What *beneath* reads from each raised-way state*", "C2 standing, in use or `abandoned` (V06 §3.19.2 (2)) — the cap", SEC, None),
    ('3 7 2 3 and', 'V06 §3.7.2 (3)) and', f"{EX}, the crossing table's rows W7 and W8", "a superseded palisade's pathway's end (V06 §3.7.2 (3)) and by a hand `convert`", SEC, None),
    ('3 7 6 1 and', 'V06 §3.7.6 (1), and', f"{EX}, the bent-group sentence", "the `EnceinteStrategy`'s, V06 §3.7.6 (1), and takes *beneath*'s pull", SEC, None),
    ('3 7 6 4 and', 'V06 §3.7.6 (4)) and', f"{EX}, the crossing table's row W6", "(a palisade neglected or superseded, V06 §3.7.3, V06 §3.7.6 (4)) and by a hand `convert`", SEC, None),
    ('3 where the wall is', '(3)). Where the wall is', f"{LAWS}, law 2 *Carried way*", "which the trace keeps (law 1 (3)). Where the wall is shape-locked", ENG, None),
    ('along a line at the', 'along a line at the', f"{EX}, *Strips, zones and nearest points*", "places a thing the op itself lays or places along a line at the nearest point clear of a strip or zone", ENG, None),
    ('as they are drawn a', 'as they are drawn. A', f"{EX}, *beneath*", "a line is kept out of them as they are drawn. A trace laid by the `EnceinteStrategy`'s pull", ENG, None),
    ('at the end of every', 'at the end of every', f"{LAWS}, law 1's lead and *The check*", "At the end of every commit, on every path, at every rung", ENG,
     "held whole only by research/findings/code-village.md, a reader-tier note in our own words, where it is ordinary English of another subject (\"at the end of every approach trail\"); read in context"),
    ('at the point of the', 'at the', f"{LAWS}, the Terms (*the zone*)", "the width at the point of the line nearest it", ENG, None),
    ('b from the first point', 'b) from the first point', f"{LAWS}, law 2 *Carried way*", "is re-routed by law 2 (b) from the first point beyond the foot", PTR, None),
    ('band law 1 2 4 6', 'band*** (law 1 (2), (4)–(6', f"{EX}, *over the band*'s head", "***over the band*** (law 1 (2), (4)–(6) with law 2 (a)–(b))", PTR, None),
    ('clear it is placed along the', 'clear it is placed along the', f"{EX}, *over the band*", "where the arches do not clear it is placed along the trace at the nearest lawful point", ENG, None),
    ('edge is the union s boundary', "edge is the union's boundary", f"{EX}, the bent-group sentence", "made on their union as one strip: its edge is the union's boundary", ENG, None),
    ('entry and the other side', 'Entry*) — and the other side', f"{EX}, the crossing table's row W12", "the lock sentence's reach, law 2 *Entry*) — and the other side as W12·C2", PTR, None),
    ('footprint of the gate or', 'footprint of the gate or', f"{EX}, *Strips, zones and nearest points* and the fixed-place sentence", "the footprint of the gate or tower standing there", ENG, None),
    ('gate at the midpoint of the', 'gate at the midpoint of the', f"{EX}, the fixed-place sentence", "S3 (8) fixes the town-side gate at the midpoint of the side with the least-cost path to the plaza", ENG, None),
    ('inserted on the wall s', "inserted on the wall's", f"{LAWS}, law 2 *Carried way*", "a placement-locked one too, inserted on the wall's standing line", ENG, None),
    ('is a part of the', 'is a part of', f"{EX}, the bent-group sentence", "A **lawful crossing** is a part of the line that enters the strip on one long side", ENG,
     "held whole only by research/findings/watabou-extra-a.md, a reader-tier note in our own words, where it is ordinary English of another subject (\"it is a part of the forest\"); read in context"),
    ('is at the end of every', 'is.** At the end of every', f"{LAWS}, law 1's head and lead", "**LAW 1 — what a valid meeting is.** At the end of every commit", ENG, None),
    ('law 1 2 4 9', 'law 1 (2)–(4), (9', f"{EX}, *beneath*", "the impassables these laws give a trace (law 1 (2)–(4), (9), (10)", PTR, None),
    ('law 1 2 4 of', 'law 1', f"{EX}, the bent-group sentence (*a lawful crossing*)", "meeting the deck line once (law 1 (2)–(4)): of an aqueduct at its level", PTR, None),
    ('law 1 2 and a', 'law 1 (2)) and a', f"{LAWS}, law 2 *The soft readings*", "a wall merged round an aqueduct's arch or pier (law 1 (2)) and a run's top capped", PTR, None),
    ('line at the dry run', 'line at the dry run', f"{EX}, *beneath*", "by hand in `bend.wall.raisedCrossing`'s line at the dry run", ENG, None),
    ('of the wall and the', 'of the wall and the', f"{EX}, the fixed-place sentence", "whichever of the wall and the raised way is laid later keeps them apart", ENG, None),
    ('on it and a deck', 'on it, and a deck', f"{LAWS}, law 1 (1)", "no gate stands on it, and a deck passing over a wall is no crossing of the gate law", ENG, None),
    ('once as a function of', 'once, as a function of', f"{LAWS}, the Terms' lead", "**Terms** — each defined once, as a function of what stands when it is read", ENG, None),
    ('only on the axis the', 'only on the axis the', f"{EX}, the lock sentence", "A building is held only on the axis the user locks (these laws' *held*)", ENG, None),
    ('part of the other side', 'part of', f"{LAWS}, *The check*", "and every part of the other side it meets, touched or not", ENG, None),
    ('passage and a gate with no', 'passage, and a gate with no', f"{EX}, *Strips, zones and nearest points*", "the gatehouse's with its passage, and a gate with no gatehouse its passage across the band", ENG, None),
    ('passing through it in the', 'passing through it in the', f"{LAWS}, law 1 (2)", "the water passing through it in the channel, the arch no gate", ENG, None),
    ('point is the first point', 'point is **the first point', f"{LAWS}, the Terms (*beyond the foot*)", "the nearest such point is **the first point beyond the foot**", ENG, None),
    ('point of the edge on the side', 'point of the edge on the side', f"{EX}, the bent-group sentence", "by the line to the nearest point of the edge on the side it entered from", ENG, None),
    ('raised at a village and', 'RAISED at a', f"{EX}, *beneath*", "F-REDERIVE's raised-way rung, F-V-RAISED at a village), and by hand", 'our own rung name followed by ordinary words', None),
    ('the entrance and the tower', 'the entrance and the tower', f"{EX}, the fixed-place sentence", "a harbour-mouth chain (`Gate.mouth`: its water gate across the entrance and the tower at each head", ENG, None),
    ('the gate and the wall and', 'the gate and the wall and', f"{EX}, the way-and-channel table's row (b) and the crossing table's row W13", "or an aqueduct's unless its arches there clear the gate and the wall and", ENG, None),
    ('the gate and the wall and the way', 'the gate and the wall and the way', f"{EX}, the way-and-channel table's row (b)", "unless its arches there clear the gate and the wall and the way passes the strip by the crossing rule", ENG, None),
    ('them and the other side', 'them, and the other side', f"{LAWS}, law 2 (a)", "one its own edit carries among them, and the other side's Tier-2 structure", ENG, None),
    ('to it 0 2 7', 'to it:', "§2.7's support step (6)'s lead and its first bullet", "everything laid after the raised way gives way to it: * (0) **§2.7's laws**", 'ordinary words followed by our own bullet number and section pointer', None),
    ('to the shape of a', 'to the shape of a', f"{LAWS}, law 4's (G2)", "Every change a meeting makes to the shape of a thing held in placement", ENG, None),
]
REVIEWED = [('C3', r, 'model', t, w, q, k, c) for r, t, w, q, k, c in R]
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
rows = []
rev = {(c, r): (u, t, w, q, k, cn) for c, r, u, t, w, q, k, cn in REVIEWED}
for key, a in sorted(att.items(), key=lambda kv: kv[0]):
    c, run, lines, sub, unt, car, corpus, prop, preason = a
    cars, props = set(car.split(';')), set(prop.split(';')) - {'-'}
    if key in have: sys.exit(f'STOP — {c} {run!r} already has a reviewed row')
    if unt != 'no': sys.exit(f'STOP — {c} {run!r}: in the untouched base')
    if props:
        if key in rev: sys.exit(f'STOP — {c} {run!r}: both proposed and reviewed')
        if not props <= cars or corpus != '-': sys.exit(f'STOP — {c} {run!r}: proposed by {prop}, carried by {car}, corpus {corpus}')
        also = sorted(cars - props)
        where = (f"new text of repair-r7-{'.md and repair-r7-'.join(sorted(cars))}.md, final base l. {lines} ({sub.strip()}), absent from the untouched base; held whole by no "
                 f"corpus file (its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier"
                 + (f"; the run also stands in {', '.join(also)}'s text, read there by this seat: our own words, no reference phrasing" if also else ''))
        reason = f"{TAG}: the reviewed row proposed by repair-r7-{' and repair-r7-'.join(sorted(props))} — {preason.split(' || ')[0]} — re-checked: {where}"
    elif key in rev:
        u, text, w, q, k, cn = rev[key]
        if car != u: sys.exit(f'STOP — {c} {run!r}: carried by {car}; the review expects {u}')
        if (corpus != '-') != bool(cn) or (cn and corpus.split('/')[-1] not in cn): sys.exit(f'STOP — {c} {run!r}: corpus {corpus} against the review note {cn}')
        for ln in lines.split(','):
            if text.lower() not in L[int(ln) - 1].lower(): sys.exit(f'STOP — {run!r}: l. {ln} does not carry {text!r}')
        held = cn if cn else 'held whole by no corpus file (its 3-grams meet the corpus by chance)'
        reason = (f"{TAG} (2026-10-02): the assembler's review — {w} ({M}): \"{q}\"; {k}; new text of repair-r7-{u}.md, absent from the "
                  f"untouched base, {held}; no list, table, grammar, palette or identifier (final base l. {lines})")
    else:
        sys.exit(f'STOP — {c} {run!r}: neither proposed nor reviewed here')
    rows.append('\t'.join([c, run, reason.replace('\t', ' ')]))
unused = sorted(set(rev) - set(att))
if unused: sys.exit(f'STOP — reviewed rows with no hit: {unused}')
hdr = (f"# block: {TAG}, 2026-10-02 (opus, the mechanical assembler of the coherence pass's repair round 7; PENDING FABLE REVIEW) — every "
       f"unreviewed hit of the assembled docs/ARCHITECTURE.md (the repair-r7 blocks applied, the model's first, then repair-r7-scope's J-A110.01 swap and one "
       f"mechanical G-cite prefix, which touch no hit) over every top-level heading key (34) and the eight # keys, by the three-copy method against one "
       f"corpus snapshot (untouched = the live base before this round, sha256 f39f1c30…; new = the blocks applied, 99242252…; combined = the installed "
       f"text, 14304a3d…); each hit is new text of a repair block, attributed by script (work/assemble-r7/attrib.py -> c3-attribution.tsv, "
       f"hitctx.py, allowrows.py): fifteen rows proposed by the seats that wrote the text (repair-r7-scope's NOTE FOR ASSEMBLE (2), twelve; "
       f"repair-r7-determinism's proposed rows, four; one run proposed by both), forty-three the assembler's own review (model's §2.7 text; its "
       f"header lists its runs for this seat and proposes no row). Run in the cloud checkout, where doc_checks warns that the reference corpus is "
       f"INCOMPLETE (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external absent), so these rows are PROVISIONAL. "
       f"Rows: {len(rows)}.")
print(len(rows), 'rows')
if DRY:
    print(hdr); [print(r) for r in rows]
else:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
