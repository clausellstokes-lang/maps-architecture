# Lane coherence/assemble-r0, step (b): write the reviewed allow rows for the unreviewed hits of the combined document
# (docs/ARCHITECTURE.md as assembled, with the assembler's fixes) and append them, as one block, to
# docs/validation/doc-checks-allow.tsv. Every row is a false positive, reviewed as follows:
#   C3  attributed by attrib.py; a run held whole by no corpus file is a chain of 3-grams from several places; a run held
#       whole only by the program's own design pages (research/findings/dwellings-synthesis.md, code-impact.md) is our
#       text quoted there; every run held whole by a reference-findings file was read in context (READ below).
#   S2  a volume-prefixed pointer 'Vnn §x.y': S2 reads the base's headings only; every occurrence is checked to carry its
#       volume prefix, and refs.py resolves each against that volume.
#   C2, C4  read in context (below).
# Usage: allowrows.py DOC_CHECKS_OUTPUT(combined, all keys) [--dry]
import os, re, subprocess, sys
from collections import Counter, defaultdict
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
OUTF = sys.argv[1]; DRY = '--dry' in sys.argv
WORK = 'docs/validation/coherence/work/assemble-r0'
ALLOW = 'docs/validation/doc-checks-allow.tsv'
subprocess.run(['python3', f'{WORK}/attrib.py', OUTF, f'{WORK}/c3-attribution.tsv'], check=True, capture_output=True)
att = [l.rstrip('\n').split('\t') for l in open(f'{WORK}/c3-attribution.tsv', encoding='utf-8')][1:]
un = [l.rstrip('\n').split(' | ') for l in open(OUTF, encoding='utf-8') if l.startswith('UNREVIEWED ')]
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
PROGRAM = {'findings/dwellings-synthesis.md', 'findings/code-impact.md'}
READ = {   # runs held whole by a reference-findings file: each read in context in the assembled base
 '0 5 0 75 1': "the population sweep's multipliers (× 0.5, 0.75, 1, 1.5, 2) of our own §13.2 bar on the dossier's COUNT, QUARTER and GUILD records; a number run",
 '1 2 1 one record': "§2.1 pointer and 'one record' in our `RaisedWayRecord` comment (§2.4, g item 110 (b)); numbers and an ordinary phrase",
 '61 vg 1 6 9': "§0.2's landing-table row 61 (the owner's item 61, 'VG 1.6.9's observations'): a row number and the reference build version we cite",
 'always a street facing door': "§15.1's F5 parity row, our statement of what stage 3's entrance rule adds beyond the reference ('always a street-facing door'; from V02); a feature fact in our words, not code or a list",
 'and the rest of the': 'ordinary phrasing (II.7)',
 'and whether it is a': "ordinary phrasing of our own `Plot.deck` sentence (§4, item 110 (b))",
 'byte identical to the base': "our no-op pin wording ('byte-identical to the base', the volumes' and §13.2's pins); an ordinary phrase",
 'is byte identical to the base': "our no-op pin wording ('is byte-identical to the base'); an ordinary phrase",
 'captures manor readme frequencies md': "a capture file path cited for traceability (`captures/manor/README-frequencies.md` §3–§4) in §13.5's layout-family row",
 'cuts perpendicular to the frontage': "our plot-cut sentence in §4 ('bent plot cuts perpendicular to the frontage'; already in the archived base); generic geometry wording",
 'do not depend on the': 'ordinary phrasing (§10)',
 'does not advance it the': "ordinary phrasing of our own §6 rule (New random at the cap 'does not advance it')",
 'for a building with a': 'ordinary phrasing (§2, §7)',
 'hours per day days per week': "§10.3's day schedule: a generic calendar field list (hours per day, days per week, rest days, weekday names) in our own record",
 'is left out of the': 'ordinary phrasing (§8)',
 'no geometry of its own': "ordinary phrasing of our own §11.1 GeoJSON sentence (a `condition` feature has no geometry of its own)",
 'orientation is derived from the': "ordinary phrasing of our own §10 sentence on a class's orientation (derived from the goods table)",
 'rules 1 and 2 the': "a pointer to §2.2's rules 1 and 2 ('§5.3's rows check rules 1 and 2; the test is …')",
 's cell is the one': "ordinary phrasing of our own §6 registry sentence ('the row's cell is the one statement of how its draws are keyed')",
 'the band s upper bound': 'ordinary phrasing (§2)',
 'the basement lies inside the ground': "our §2.6 *Basements* rule ('The basement lies inside the ground wings'; already in the archived base and V02)",
 'the distance to the nearest': 'ordinary phrasing (II.7)',
 'the export dialog and the': 'ordinary phrasing of our own §14 sentence',
 'the square s centrepiece is': "ordinary phrasing of our own II.2 sentence (the square's centrepiece drawn by `hood.squares`' row)",
 'wings in the collision set': "our own addition to the manor model (J-A59.21: 'the wings in the collision set'; already in V02)",
}
C2C4 = {
 ('C2', '#ffffff'): "§8.2's palette table, row `snow` (g item 117's seasonal look): pure white, a universal value in our own palette, not a copied palette; the corpus hit is NG's background and roof colours in research/findings/profile-neighbourhood.md",
 ('C4', 'apothecary baker barber bathhouse tavern'): "§4's spread-and-pull bullet (g items 103 (f), 107): our own six-item example of everyday services (apothecary, baker, tavern, chapel, barber, bathhouse), generic trade nouns in our own selection and order; 5 shared with FTG's 209-member building-type list in research/ftg-capture/*.json — not a copied list",
}
def numish(t): return t.isdigit() or len(t) <= 1 or re.fullmatch(r's\d+|[a-z]\d+', t) is not None
rows = []; problems = []
for run, lines, sec, ours, held, n in att:
    loc = f"{sec} (l. {lines.split(',')[0]})"
    prior = f"; already in the {ours.replace('archived ', 'archived ').replace(';', ', ')}" if ours != '-' else '; text of this pass'
    toks = run.split()
    if held == '-':
        kind = ('a chain of section pointers and numbers' if sum(map(numish, toks)) * 2 >= len(toks) else 'our own wording')
        why = f'{kind} in {loc}{prior}; held whole by no corpus file (3-grams of several files meeting by chance)'
    elif set(held.split(';')) <= PROGRAM:
        why = f"our own text in {loc}{prior}; held whole only by the program's own design page {held.replace(';', ', ')}, which quotes the design"
    elif run in READ:
        why = f"{READ[run]}; {loc}{prior}; held whole by {held.replace(';', ', ')}"
    else:
        problems.append(f'unread held-whole run: {run!r} ({held})'); continue
    rows.append(('C3', run, why + ' — no copied list, table, grammar, palette or identifier'))
# S2: every occurrence must carry its volume prefix
doc = open('docs/ARCHITECTURE.md', encoding='utf-8').read()
flat = re.sub(r'\n[ \t]*', ' ', doc)
s2 = sorted({h[1] for h in un if h[0] == 'UNREVIEWED S2'})
for t in s2:
    num = t[1:]
    occ = [m for m in re.finditer(r'§' + re.escape(num) + r'(?![\d.]*\d)', flat)]
    forms = Counter()
    for m in occ:
        pre = flat[max(0, m.start() - 12):m.start()]
        mv = re.search(r'(?:V(\d{2})|[Vv]olume (\d{1,2}))(?:\'s)? ?$', pre)
        if mv: forms[f'V{int(mv.group(1) or mv.group(2)):02d}'] += 1
        else: forms['bare'] += 1
    if forms.get('bare'): problems.append(f'S2 {t}: {forms["bare"]} occurrence(s) without a volume prefix'); continue
    rows.append(('S2', t, "a volume-prefixed pointer — every occurrence in the base reads " + ', '.join(f'{v} {t} ×{c}' for v, c in sorted(forms.items())) +
                 "; S2 reads the base's headings only; each resolves in its volume (work/assemble-r0/refs.py)"))
for h in un:
    if h[0] in ('UNREVIEWED C2', 'UNREVIEWED C4'):
        k = (h[0].split()[1], h[1])
        if k in C2C4: rows.append((k[0], k[1], C2C4[k]))
        else: problems.append(f'unread {k}')
rows = list(dict.fromkeys(rows))
rows = [r for r in rows if (r[0], r[1]) not in have]
if problems:
    print('STOP:'); [print(' ', p) for p in problems]; sys.exit(2)
cnt = Counter(r[0] for r in rows)
hdr = ("# block: coherence/assemble-r0, 2026-09-30 (opus, the mechanical assembler of the coherence pass; PENDING FABLE REVIEW) — "
       "every unreviewed hit of the assembled docs/ARCHITECTURE.md over every top-level heading key (34) and the eight # keys, "
       "checked by the three-copy method against one corpus snapshot (untouched archive, the placed section files, the live document "
       "with the assembler's fixes); run in the cloud checkout, where doc_checks warns that the reference corpus is INCOMPLETE "
       "(captures/, research/patreon, research/devlogs, research/ftg-docs, research/external absent: 6 JSON files, 426 823 C3 3-grams), "
       "so these rows are PROVISIONAL and the checks must be re-run on the machine that holds the corpus. Each C3 run attributed by "
       f"script (work/assemble-r0/attrib.py → c3-attribution.tsv) and every run held whole by a reference-findings file read in context; "
       f"S2 rows verified volume-prefixed at every occurrence. Rows: {dict(cnt)}.")
block = hdr + '\n' + '\n'.join('\t'.join(r) for r in rows) + '\n'
print(hdr); print(f'{len(rows)} rows', dict(cnt))
if DRY:
    import random; random.seed(3); [print("\t".join(r)[:330]) for r in random.sample(rows, 8)]; print("DRY RUN"); sys.exit(0)
with open(ALLOW, 'a', encoding='utf-8') as f: f.write(block)
print('appended to', ALLOW)
