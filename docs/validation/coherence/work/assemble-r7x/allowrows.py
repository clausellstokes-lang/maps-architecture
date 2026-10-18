#!/usr/bin/env python3
"""allowrows.py (coherence/assemble-r7x, P5; assemble-r7w's allowrows.py, its two rules kept, the sites read from c3runs.py)
— append the reviewed allow rows for the unreviewed hits of the combined (installed) document, as ONE block, to
docs/validation/doc-checks-allow.tsv (append only; the file is shared). A hit's SITES are the installed copy's C3 runs
equal to it (c3runs.json, doc_checks' own run rule); for every hit, before any row is written:
  * every site's first line is a line this round's blocks changed (new text: not an 'equal' line of the untouched →
    installed diff), and no run of the untouched copy equals it (where the untouched copy carries the words, it carries
    them only inside a longer run that already has a reviewed row);
  * no corpus file holds the run whole (attrib.py), and the run has no reviewed row yet.
Two kinds of row:
  (1) PROPOSED — a hit the seat that wrote the text proposed a row for in its repair-r7x header (determinism's two,
      pipeline's one — the same run as determinism's first —, scope's five): every proposer carries it in its split block;
  (2) REVIEWED — a hit no seat proposed a row for (this round: four runs of the model's §2.7 block, whose header records
      no document-check run): the assembler's own review, written only when the hit is carried by the named seat's block
      and every site's line carries the text the review quotes, case aside.
Every attributed hit must be covered by exactly one of the two, or the script stops.
Usage: allowrows.py ATTRIBUTION.tsv C3RUNS.json CHECKS.json [--dry]"""
import difflib, hashlib, json, os, subprocess, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
ALLOW = 'docs/validation/doc-checks-allow.tsv'
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7x'
FIN, BEF = f'{SCR}/final/docs/ARCHITECTURE.md', f'{SCR}/before/docs/ARCHITECTURE.md'
TAG = 'coherence/assemble-r7x'
DRY = '--dry' in sys.argv
att = {(r[0], r[1]): r for r in (l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8')) if r[0] != 'check'}
c3 = json.load(open(sys.argv[2], encoding='utf-8'))
chk = json.load(open(sys.argv[3]))
L = open(FIN, encoding='utf-8').read().split('\n'); B = open(BEF, encoding='utf-8').read().split('\n')
newl = set()
for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, B, L, autojunk=False).get_opcodes():
    if tag != 'equal': newl.update(range(j1 + 1, j2 + 1))
if hashlib.sha256(open(ALLOW, 'rb').read()).digest() != hashlib.sha256(subprocess.check_output(['git', 'show', f'HEAD:{ALLOW}'])).digest():
    sys.exit('STOP — the allow file differs from HEAD')
if not all(chk['runs'][k]['exit'] == 0 for k in ('untouched-a', 'untouched-b')):
    sys.exit('STOP — the untouched copy does not exit 0')
sub_of = lambda ln: next(x for x in reversed(L[:ln]) if x.startswith('### ') or x.startswith('## ')).lstrip('#').strip().split(' ')[0] + ' '
# the assembler's review of the hits no seat proposed a row for: key -> (seat, text on the site's line, where, quote, kind)
REVIEWED = {
    ('C3', '5 is a gate and'): ('model', 'is a gate and',
        "§2.7's way-and-channel table, row (d)'s gates cell, adjudication-r7x M10's text",
        "where the boundary crosses it (law 1 (1), (4), (5)) is a gate and one of `c` where S5a moves its pin to a lawful place",
        "a numbered law pointer followed by our own plain English"),
    ('C3', 'is moved to the nearest'): ('model', 'is moved to the nearest',
        "§2.7's lock sentence, the retaining wall's stroke, the model seat's R7-01 (2) sweep site X2 (form F2)",
        "a stroke across the strip of such a span is moved to the nearest place these laws admit it",
        "our own plain English, the root-cause ruling's form F2"),
    ('C3', 'it is placed along the'): ('model', 'it is placed along the',
        "§2.7's *over the band*, adjudication-r7x M1's text",
        "a tower its spacing or a turn would place where law 1 (5) bars it is placed along the trace at the nearest lawful point",
        "our own plain English; M1's edit ends the untouched copy's longer run"),
    ('C3', 'law 1 2 where the'): ('model', 'law 1 (2); *where the',
        "§2.7's crossing table, the C5 column's lead, adjudication-r7x M9's text",
        "only where these laws admit the crossing (law 1 (2); *Where the line crosses*)",
        "a numbered law pointer followed by the name of the design's own worked example"),
}
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
rows = []
for key, a in sorted(att.items(), key=lambda kv: kv[0]):
    c, run, lines, sub, unt, car, corpus, prop, preason = a
    cars, props = set(car.split(';')) - {'-'}, set(prop.split(';')) - {'-'}
    if key in have: sys.exit(f'STOP — {c} {run!r} already has a reviewed row')
    if c != 'C3': sys.exit(f'STOP — {c} {run!r}: not a C3 run')
    info = c3[run]; sites = info['final_sites']
    if not sites: sys.exit(f'STOP — {run!r}: no installed site')
    bad = [s for s in sites if s not in newl]
    if bad: sys.exit(f'STOP — {run!r}: site(s) {bad} are not new text of this round')
    if any(x['run'] == run for x in info['untouched_containing_runs']): sys.exit(f'STOP — {run!r} is a run of the untouched copy')
    if not all(x['reviewed'] for x in info['untouched_containing_runs']): sys.exit(f'STOP — {run!r}: an untouched containing run is unreviewed')
    if corpus != '-': sys.exit(f'STOP — {run!r}: held whole by {corpus}')
    inu = ('; the untouched copy carries these words only inside the longer run(s) ' +
           ', '.join(f"'{x['run']}' (l. {x['line']}, reviewed)" for x in info['untouched_containing_runs'])) if info['untouched_containing_runs'] else ''
    where_sites = ', '.join(f'l. {s} (§{sub_of(s).strip()})' for s in sites)
    if props:
        if key in REVIEWED: sys.exit(f'STOP — {c} {run!r}: both proposed and reviewed')
        if not props <= cars: sys.exit(f'STOP — {c} {run!r}: proposed by {prop}, carried by {car}')
        seat_of = lambda ln: ('model' if sub_of(ln).startswith('2.7 ') else 'pipeline' if sub_of(ln).startswith('4.') else
                              'scope' if sub_of(ln).startswith('13.2 ') else 'determinism' if sub_of(ln)[:4] in ('5.2 ', '7.1 ', '7.3 ') else '?')
        site_seats = {seat_of(x) for x in sites}
        if not site_seats <= cars: sys.exit(f'STOP — {run!r}: sites in {site_seats}, carriers {cars}')
        also = sorted(site_seats - props)
        also_t = (f"; the same run also stands in repair-r7x-{'.md and repair-r7x-'.join(also)}.md's text (the same citation form)" if also else '')
        reason = (f"{TAG}: the reviewed row proposed by repair-r7x-{' and repair-r7x-'.join(sorted(props))} — {preason.split(' || ')[0]} — "
                  f"re-checked: every installed site is new text of this round's blocks ({where_sites}){also_t}; no run of the untouched base"
                  f"{inu}; held whole by no corpus file (its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier")
    elif key in REVIEWED:
        u, text, w, q, k = REVIEWED[key]
        if cars != {u}: sys.exit(f'STOP — {c} {run!r}: carried by {car}; the review expects {u}')
        for ln in sites:
            if text.lower() not in L[ln - 1].lower(): sys.exit(f'STOP — {run!r}: l. {ln} does not carry {text!r}')
        reason = (f"{TAG} (2026-10-02): the assembler's review — {w}: \"{q}\"; {k}; new text of repair-r7x-{u}.md (its header records "
                  f"no document-check run and proposes no row), installed at {where_sites}; no run of the untouched base{inu}; held whole by "
                  f"no corpus file; no list, table, grammar, palette or identifier")
    else:
        sys.exit(f'STOP — {c} {run!r}: neither proposed nor reviewed here')
    rows.append('\t'.join([c, run, reason.replace('\t', ' ')]))
unused = sorted(set(REVIEWED) - set(att))
if unused: sys.exit(f'STOP — reviewed rows with no hit: {unused}')
npro = sum(1 for r in rows if 'proposed by' in r)
hdr = (f"# block: {TAG}, 2026-10-02 (opus, the mechanical assembler of the coherence pass's round-7 third family fix pass; PENDING FABLE "
       f"REVIEW) — every unreviewed hit of the installed docs/ARCHITECTURE.md (the nine repair-r7x files' blocks applied, the model's first; "
       f"no assembler change after them) over every top-level heading key (34) and the eight # keys, by the three-copy method against one "
       f"corpus snapshot (untouched = the live base before this round, sha256 561d5541…; new = combined = installed, 03573b4f…); each hit "
       f"is new text of a repair block, attributed and located by script (work/assemble-r7x/attrib.py -> c3-attribution.tsv, c3runs.py, "
       f"hitctx.py, allowrows.py): {npro} rows proposed by the seats that wrote the text (repair-r7x-determinism's two, repair-r7x-pipeline's "
       f"one — the same run as determinism's 'law 1 2 6 9', one row —, repair-r7x-scope's five), {len(rows) - npro} the assembler's own review "
       f"(four runs of repair-r7x-model's §2.7 block). Run in the cloud checkout, where doc_checks warns that the reference corpus is "
       f"INCOMPLETE (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external absent), so these rows are "
       f"PROVISIONAL. Rows: {len(rows)}.")
print(len(rows), 'rows;', npro, 'proposed')
if DRY:
    print(hdr); [print(r) for r in rows]
else:
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join(rows) + '\n')
