#!/usr/bin/env python3
"""allowrows.py (coherence/assemble-r1, P5) — append the reviewed allow rows for the unreviewed hits of the combined
document, as one block, to docs/validation/doc-checks-allow.tsv (append only; the file is shared). A row is written only
for a hit attrib.py attributed (c3-attribution.tsv): new text carried by a repair-r1 block, absent from the untouched base,
with a reviewed row proposed by the seat that wrote the text; a run held whole by a corpus file is read in context (READ).
Usage: allowrows.py ATTRIBUTION.tsv BLOCK-TAG [--dry]"""
import os, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
att = [l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')][1:]
TAG = sys.argv[2]; DRY = '--dry' in sys.argv
READ = {
 'dormer set back from the eave': "held whole by research/findings/code-manor.md, a reader-tier note written in our own words; read in context: our `DormerKind` comment ('a roof dormer set back from the eave; a gablet that breaks the eave'), in V02 since the pre-coherence archive (archived V02 l. 548) and moved verbatim to §2.6 (MC-11) — an ordinary description of a dormer, not code, a list or an identifier",
 '10 2 the room programme': "held whole only by research/findings/dwellings-synthesis.md, the program's own design page, which quotes the design; §2.6's pointer '(`RoomProgramRow.for`, §10.2)' and our own words",
}
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
rows, skipped = [], []
for c, run, lines, sub, unt, car, corpus, prop, preason in att:
    if (c, run) in have: skipped.append((c, run, 'already reviewed')); continue
    if prop == '-' or unt != 'no' or (c == 'C3' and car == '-'):
        sys.exit(f'STOP — {c} {run!r}: no proposed row, or not new text of a repair block')
    if c == 'C3':
        if corpus != '-' and run not in READ: sys.exit(f'STOP — {run!r} is held whole by {corpus}: read it first')
        cl = READ.get(run, 'held whole by no corpus file (a chain of 3-grams from several places)')
        where = f"new text of repair-r1-{car.replace(';', '.md / repair-r1-')}.md, final base l. {lines} ({sub.strip()}), absent from the untouched base; {cl}"
    else:
        where = f"final base l. {lines} ({sub.strip()}): every occurrence of the text in the base carries its volume prefix ('V10 §2.12'); S2 reads the base's headings only, and refs.py resolves it in V10"
    first = preason.split(' || ')[0]
    reason = f"{TAG}: the reviewed row proposed by repair-r1-{prop.replace(';', ' / ')} — {first} — re-checked: {where}".replace('\t', ' ')
    rows.append('\t'.join([c, run, reason]))
hdr = (f"# block: {TAG}, 2026-10-01 (opus, the mechanical assembler of the coherence pass's repair round 1; PENDING FABLE REVIEW) — every "
       f"unreviewed hit of the assembled docs/ARCHITECTURE.md (the repair-r1 blocks applied) over every top-level heading key (34) and the "
       f"eight # keys, by the three-copy method against one corpus snapshot (untouched = the live base before this round, sha256 484af066…; "
       f"new = the blocks applied; combined = the installed text); each hit is new text of the repair block of the seat that proposed its "
       f"row, attributed by script (work/assemble-r1/attrib.py -> c3-attribution.tsv) and every run a corpus file holds whole read in "
       f"context. Run in the cloud checkout, where doc_checks warns that the reference corpus is INCOMPLETE (captures/, research/patreon, "
       f"research/devlogs, research/ftg-docs, research/external absent), so these rows are PROVISIONAL. Rows: {len(rows)}.")
print(len(rows), 'rows;', len(skipped), 'skipped (already reviewed)')
if not DRY:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
else:
    print(hdr[:300]); print(rows[0][:400]); print(rows[-1][:400]); print([r for r in rows if r.startswith('C3\tdormer')][0][:600])
