#!/usr/bin/env python3
"""allowrows.py (coherence/assemble-r7v, P5; assemble-r7's allowrows.py, its two rules unchanged) — append the reviewed allow
rows for the unreviewed hits of the combined document, as ONE block, to docs/validation/doc-checks-allow.tsv (append only;
the file is shared). Two kinds of row, each written only after its assertions hold on attrib.py's attribution
(c3-attribution.tsv):
  (1) PROPOSED — a hit the seat that wrote the text proposed a row for (this round: repair-r7v-scope's four proposed rows
      in §13.2's T110-2 (5), (6), and repair-r7v-determinism's one in §7.3 (b) 3): new text carried by a proposing seat's
      repair-r7v block (every proposer among the carriers), held whole by no corpus file, absent from the untouched base —
      but for one run, "the gate and the wall", which the untouched base carries only inside longer runs that already have
      reviewed rows (the untouched copy exits 0; the proposing seat states it), so the hit is its new occurrence in the
      proposer's text (asserted below);
  (2) REVIEWED — a hit no seat proposed a row for (this round: one C3 run in the model's §2.7 block, which the model's header
      records and proposes no row for): the assembler's own review, written only when the hit is new text of the named
      seat's block, absent from the untouched base, held whole by no corpus file, and every final-base line the run starts
      on carries the text the review quotes, case aside (assemble-r3's reviewrows.py rule).
Every attributed hit must be covered by exactly one of the two, or the script stops. Usage: allowrows.py ATTRIBUTION.tsv
CHECKS.json [--dry]"""
import hashlib, json, os, subprocess, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7v/final/docs/ARCHITECTURE.md'
TAG = 'coherence/assemble-r7v'
DRY = '--dry' in sys.argv
att = {(r[0], r[1]): r for r in (l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')) if r[0] != 'check'}
chk = json.load(open(sys.argv[2]))
L = open(FIN, encoding='utf-8').read().split('\n')
# the allow file must still be the committed one (no other writer since this seat read it)
if hashlib.sha256(open(ALLOW, 'rb').read()).digest() != hashlib.sha256(subprocess.check_output(['git', 'show', f'HEAD:{ALLOW}'])).digest():
    sys.exit('STOP — the allow file differs from HEAD')
M = "repair-r7v-model.md's §2.7 block"
# (run, carrying unit, the text the start line carries, where, the quoted context, kind, corpus note or None)
R = [
    ('fields outside the model digest and inside the records digest', 'fields outside the model digest and inside the records digest',
     "§2.7's `Order` type, the comment on `Enceinte.laidAt` and `RaisedWayRecord.courseAt` (the model's M11 with E-M2's sentence)",
     "`Enceinte.laidAt` and `RaisedWayRecord.courseAt` are record fields outside the model digest and inside the records digest (§6.2), as a `DerivationRecord` is",
     "our own design terms (§6.2's model digest and records digest) in plain English; its 3-grams meet only the program's own "
     "research/findings/dwellings-synthesis.md, which uses this design's digest terms (\"outside the model digest and inside the records digest\")", None),
]
REVIEWED = {('C3', r): ('model', t, w, q, k, c) for r, t, w, q, k, c in R}
# a proposed run the untouched base carries only inside longer reviewed runs: (run) -> (the proposer, the final-base line of its new occurrence)
INU_OK = {('C3', 'the gate and the wall'): ('scope', 19477)}
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
untouched_clean = all(chk['runs'][k]['exit'] == 0 for k in ('untouched-a', 'untouched-b'))
rows = []
for key, a in sorted(att.items(), key=lambda kv: kv[0]):
    c, run, lines, sub, unt, car, corpus, prop, preason = a
    cars, props = set(car.split(';')), set(prop.split(';')) - {'-'}
    if key in have: sys.exit(f'STOP — {c} {run!r} already has a reviewed row')
    inu_note = ''
    if unt != 'no':
        if key not in INU_OK or not untouched_clean: sys.exit(f'STOP — {c} {run!r}: in the untouched base')
        u, ln = INU_OK[key]
        if u not in props or str(ln) not in lines.split(',') or run.split()[0] not in L[ln - 1].lower():
            sys.exit(f'STOP — {c} {run!r}: its new occurrence is not l. {ln} of {u}')
        inu_note = (f"; the untouched base carries the run only inside longer runs with reviewed rows (its copy exits 0), so the hit is its new "
                    f"occurrence, l. {ln}, in repair-r7v-{u}.md's text; the other sites (l. {', '.join(x for x in lines.split(',') if x != str(ln))}) were read: "
                    f"the model's §2.7 text, unchanged by this round")
    if props:
        if key in REVIEWED: sys.exit(f'STOP — {c} {run!r}: both proposed and reviewed')
        if not props <= cars or corpus != '-': sys.exit(f'STOP — {c} {run!r}: proposed by {prop}, carried by {car}, corpus {corpus}')
        also = sorted(cars - props)
        if inu_note:   # name the new occurrence's line and subsection, not the first line's
            u, ln = INU_OK[key]; lines = str(ln); sub = next(x for x in reversed(L[:ln]) if x.startswith('### ')).lstrip('#').strip()[:40]
        where = (f"new text of repair-r7v-{'.md and repair-r7v-'.join(sorted(props))}.md, final base l. {lines} ({sub.strip()})"
                 + ('' if inu_note else ', absent from the untouched base')
                 + "; held whole by no corpus file (its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier"
                 + inu_note)
        reason = f"{TAG}: the reviewed row proposed by repair-r7v-{' and repair-r7v-'.join(sorted(props))} — {preason.split(' || ')[0]} — re-checked: {where}"
    elif key in REVIEWED:
        u, text, w, q, k, cn = REVIEWED[key]
        if car != u: sys.exit(f'STOP — {c} {run!r}: carried by {car}; the review expects {u}')
        if corpus != '-': sys.exit(f'STOP — {c} {run!r}: held whole by {corpus}')
        for ln in lines.split(','):
            if text.lower() not in L[int(ln) - 1].lower(): sys.exit(f'STOP — {run!r}: l. {ln} does not carry {text!r}')
        reason = (f"{TAG} (2026-10-02): the assembler's review — {w} ({M}): \"{q}\"; {k}; new text of repair-r7v-{u}.md (its header records "
                  f"the run and proposes no row), absent from the untouched base, held whole by no corpus file; no list, table, grammar, "
                  f"palette or identifier (final base l. {lines})")
    else:
        sys.exit(f'STOP — {c} {run!r}: neither proposed nor reviewed here')
    rows.append('\t'.join([c, run, reason.replace('\t', ' ')]))
unused = sorted(set(REVIEWED) - set(att))
if unused: sys.exit(f'STOP — reviewed rows with no hit: {unused}')
npro = sum(1 for r in rows if 'proposed by' in r)
hdr = (f"# block: {TAG}, 2026-10-02 (opus, the mechanical assembler of the coherence pass's round-7 family fix pass; PENDING FABLE REVIEW) — "
       f"every unreviewed hit of the assembled docs/ARCHITECTURE.md (the twelve repair-r7v files' blocks applied, the model's first; no "
       f"assembler change after them) over every top-level heading key (34) and the eight # keys, by the three-copy method against one corpus "
       f"snapshot (untouched = the live base before this round, sha256 14304a3d…; new = combined = the blocks applied, 2612044e…); each hit is "
       f"new text of a repair block, attributed by script (work/assemble-r7v/attrib.py -> c3-attribution.tsv, hitctx.py, allowrows.py): "
       f"{npro} rows proposed by the seats that wrote the text (repair-r7v-scope's four, repair-r7v-determinism's one), {len(rows) - npro} the "
       f"assembler's own review (the model's §2.7 text; its header records the run and proposes no row). Run in the cloud checkout, where "
       f"doc_checks warns that the reference corpus is INCOMPLETE (captures/, research/patreon, research/devlogs, research/ftg-docs, "
       f"research/external absent), so these rows are PROVISIONAL. Rows: {len(rows)}.")
print(len(rows), 'rows')
if DRY:
    print(hdr); [print(r) for r in rows]
else:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
