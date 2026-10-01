#!/usr/bin/env python3
"""allowrows.py (coherence/assemble-r3, P5; assemble-r1's, the S2 reason generalised) — append the reviewed allow rows
for the unreviewed hits of the combined document, as one block, to docs/validation/doc-checks-allow.tsv (append only;
the file is shared). A row is written only for a hit attrib.py attributed (c3-attribution.tsv): new text carried by a
repair-r3 block, absent from the untouched base, with a reviewed row proposed by the seat that wrote the text, and (C3)
held whole by no corpus file; an S2 pointer only when every occurrence of it in the final base carries the volume prefix
its proposed row names (checked here) and refs.py resolves it in that volume. Usage: allowrows.py ATTRIBUTION.tsv TAG [--dry]"""
import os, re, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm3/final/docs/ARCHITECTURE.md'
att = [l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')][1:]
TAG = sys.argv[2]; DRY = '--dry' in sys.argv
base = open(FIN, encoding='utf-8').read()
S2_VOL = {'§6.8': ('V06', 'V06 §6.8 *The comfort level*'), '§4.19': ('V09', 'V09 §4.19')}
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
        if corpus != '-': sys.exit(f'STOP — {run!r} is held whole by {corpus}: read it first')
        where = (f"new text of repair-r3-{car.replace(';', '.md / repair-r3-')}.md, final base l. {lines} ({sub.strip()}), absent from the "
                 f"untouched base; held whole by no corpus file (a chain of 3-grams of our own section pointers, item, volume and person-week numbers)")
    elif c == 'S2':
        vol, name = S2_VOL[run]
        occ = [m.start() for m in re.finditer(re.escape(run) + r'(?![0-9])', base)]
        if not occ or any(not base[:i].endswith(vol + ' ') for i in occ):
            sys.exit(f'STOP — S2 {run}: an occurrence in the final base lacks the prefix {vol}')
        where = (f"final base l. {lines} ({sub.strip()}): all {len(occ)} occurrences of the text in the base carry the prefix '{vol} {run}' "
                 f"(checked by script); S2 reads the base's headings only, and refs.py resolves it in {vol} ({name})")
    else:
        sys.exit(f'STOP — {c} {run!r}: no rule for this check')
    first = preason.split(' || ')[0]
    reason = f"{TAG}: the reviewed row proposed by repair-r3-{prop.replace(';', ' / repair-r3-')} — {first} — re-checked: {where}".replace('\t', ' ')
    rows.append('\t'.join([c, run, reason]))
hdr = (f"# block: {TAG}, 2026-10-01 (opus, the mechanical assembler of the coherence pass's repair round 2; PENDING FABLE REVIEW) — every "
       f"unreviewed hit of the assembled docs/ARCHITECTURE.md (the repair-r3 blocks applied) over every top-level heading key (34) and the "
       f"eight # keys, by the three-copy method against one corpus snapshot (untouched = the live base before this round, sha256 137ecc0e…; "
       f"new = the blocks applied; combined = the installed text, 4ed292e9…); each hit is new text of the repair block of the seat that "
       f"proposed its row, attributed by script (work/assemble-r3/attrib.py -> c3-attribution.tsv). Run in the cloud checkout, where "
       f"doc_checks warns that the reference corpus is INCOMPLETE (captures/, research/patreon, research/devlogs, research/ftg-docs, "
       f"research/external absent), so these rows are PROVISIONAL. Rows: {len(rows)}.")
print(len(rows), 'rows;', len(skipped), 'skipped (already reviewed)')
if not DRY:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
else:
    print(hdr[:300]); [print(r[:420]) for r in rows]
