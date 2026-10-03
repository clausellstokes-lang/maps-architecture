#!/usr/bin/env python3
"""volrows.py (coherence/assemble-r3, P5 (b'); assemble-r1's, with V08's and V10's prose-listed runs in place of V01's) — the volume seats' proposed allow rows ("this lane writes no shared file";
"proposed allow rows for the assembler"). For each volume: the NEW unreviewed hits (in the final run, not in the
untouched run of volchecks.sh); each matched to its seat's proposed row (the row-format lines of the repair preamble, or
V08's and V10's prose lists with their shared reasons) and attributed as attrib.py does (carried by the volume's repair block, absent from
the untouched volume, which corpus files hold it whole). Writes vol-attribution.tsv; with --append, appends the matched
rows (no corpus file holding the run whole, or read in context: READ) as one block to the allow file. Hits without a
proposed row are listed, not appended. Usage: volrows.py VOLCHECKS_DIR [--append]"""
import glob, json, os, re, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm3'
W = 'docs/validation/coherence/work/assemble-r3'; ALLOW = 'docs/validation/doc-checks-allow.tsv'
D = sys.argv[1]; APPEND = '--append' in sys.argv
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower()); sp = lambda ts: ' ' + ' '.join(ts) + ' '
def stream_json(p):
    out = []
    def walk(x):
        if isinstance(x, str): out.extend(t for t in tok(x) if not t.isdigit())
        elif isinstance(x, dict):
            for k, v in x.items(): out.extend(t for t in tok(k) if not t.isdigit()); walk(v)
        elif isinstance(x, list):
            for v in x: walk(v)
    try: walk(json.load(open(p, encoding='utf-8', errors='replace')))
    except Exception: pass
    return out
corpus = {p: sp(tok(open(p, encoding='utf-8', errors='replace').read())) for p in sorted(glob.glob('research/findings/*.md'))}
corpus.update({p: sp(stream_json(p)) for p in sorted(glob.glob('research/**/*.json', recursive=True))})
un = lambda f: {(l.split(' | ')[0].split()[1], l.rstrip('\n').split(' | ')[1]) for l in open(f, encoding='utf-8') if l.startswith('UNREVIEWED ')}
rx = re.compile(r'^[#\s-]*(?:ALLOW)?[ \t]*(C[1-4]|S[12])\t([^\t]+)\t(.+)$')
# the prose-listed proposals (the seat gave the runs in its preamble, not as rows):
# V08 — "Each is proposed for docs/validation/doc-checks-allow.tsv (this lane writes no shared file): C3<TAB><run><TAB>repair-V08-r2 …"
V08_LIST = ["are read only where the", "position is the user s", "the frame and the party", "stands in the view s", "run it is the one",
            "the rung s own word for the population", "1 and 2 9 s", "2 4 5 7 and", "2 4 and the table", "3 5 1 4 5", "3 8 and the final",
            "5 1 2 3 the", "b 2 4 4 6"]
V08_REASON = "repair-V08-r2 (2026-10-01): our own wording or a pointer-number run in V08's item-122/125/126 text; no reference text"
# V10 — "the 6 new runs our own plain English ("and the house's own", …) … — proposed allow rows" (quotes tokenised as doc_checks does;
# its section-number run, written "§10.2 … §2.9's", is the run '10 2 2 9 s', read in context: READ)
V10_LIST = ["and the house s own", "because the plan is one plan", "is absent from the read", "or as a change to", "read from the same plan",
            "s level and the building s own", "10 2 2 9 s"]
V10_REASON = "repair-V10-r2 (2026-10-01): one of the six new C3 runs of our own plain English in V10's item-122/123 text, reviewed by that seat and proposed as allow rows; no reference text"
READ = {   # proposed runs outside the plain rule, each read in context in the installed volume
 '5 6 5 5 5': "new text spanning two adjacent sections, read in context (V03 l. 2575): the pointer '(V03 §5.6 (5)).' that ends V03 §5.4's repaired block and the heading number of V03 §5.5 ('### 5.5 Find at the interior band'); section digits only",
 '5 1 2 3 the': "new text spanning two adjacent sections, read in context (V08 l. 494): the pointer '(V08 §5.1)' closing V08 §2.2's code comment and the heading '### 2.3 The binding in practice'; section digits and the heading's first word",
 '10 2 2 9 s': "read in context (V10 l. 1002): V10's own described run ('§10.2 … §2.9's'), two section pointers in the code comments of the `crises` field ('/* §10.2 */ } /* §2.9's crisis display'); section digits only",
}
have = set()
for l in open(ALLOW, encoding='utf-8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 3 and not l.startswith('#') and p[2].strip(): have.add((p[0], p[1]))
rows = ['volume\tcheck\trun\tproposed\tin_untouched_volume\tcarried_by_block\tcorpus_whole\treason']
append = []; unmatched = {}; counts = {}
for fin in sorted(glob.glob(f'{D}/*-final.out')):
    b = os.path.basename(fin)[:-len('-final.out')]
    new = sorted(un(fin) - un(f'{D}/{b}-untouched.out'))
    unit = b.split('-')[0]
    pre = f'{SCR}/pre/repair-r3-{unit}.md'
    prop = {}
    if os.path.exists(pre):
        for l in open(pre, encoding='utf-8'):
            m = rx.match(l.rstrip('\n'))
            if m: prop[(m.group(1), m.group(2))] = m.group(3)
    if unit == 'V08':
        for r in V08_LIST: prop[('C3', r)] = V08_REASON
    if unit == 'V10':
        for r in V10_LIST: prop[('C3', r)] = V10_REASON
    vol_before = sp(tok(open(f'{SCR}/before/docs/volumes/{b}.md', encoding='utf-8').read()))
    blk = f'{W}/split/{b}/repair-r3-{unit}.md'
    blk_t = sp(tok(open(blk, encoding='utf-8').read())) if os.path.exists(blk) else ' '
    if unit == 'INDEX':
        blk_t = sp(tok(open(f'{W}/split/INDEX/repair-r3-scope.md', encoding='utf-8').read()))
    c_new = {'matched': 0, 'unmatched': 0}
    for c, r in new:
        needle = ' ' + r + ' '
        if c == 'C3':
            held = [os.path.relpath(x, 'research') for x, s in corpus.items() if needle in s]
            inu = needle in vol_before; car = needle in blk_t
        elif c == 'C4':
            held = ['(C4 list)']; inu = False; car = True
        else:
            held = ['(S2)']; inu = False; car = True
        pr = prop.get((c, r))
        rows.append('\t'.join([b, c, r, 'yes' if pr else 'no', 'yes' if inu else 'no', 'yes' if car else 'no', ';'.join(held) or '-', (pr or '')[:240]]))
        if pr and (c, r) not in have and (r in READ or (not inu and car and (c != 'C3' or not held))):
            append.append((b, c, r, pr)); have.add((c, r)); c_new['matched'] += 1
        elif pr and (c, r) in have:
            c_new['matched'] += 1
        else:
            unmatched.setdefault(b, []).append((c, r, 'proposed' if pr else 'not proposed', ';'.join(held) or '-', 'carried' if car else 'not in block', 'in untouched' if inu else 'new'))
            c_new['unmatched'] += 1
    counts[b] = dict(new_unreviewed=len(new), by_check={k: sum(1 for x in new if x[0] == k) for k in ('C1', 'C2', 'C3', 'C4', 'S1', 'S2') if any(x[0] == k for x in new)}, **c_new)
open(f'{W}/vol-attribution.tsv', 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
json.dump(dict(counts=counts, appended=[dict(volume=b, check=c, run=r) for b, c, r, _ in append],
               unmatched={k: [list(x) for x in v] for k, v in unmatched.items()}), open(f'{W}/volrows.json', 'w'), ensure_ascii=False, indent=1)
for b, c in counts.items(): print(b, c)
print('to append:', len(append))
for b, v in unmatched.items():
    for x in v:
        if x[0] != 'S2': print('  UNMATCHED', b, x)
def why(b, r, pr):
    tail = READ[r] if r in READ else f"new text of that volume's repair block ({b}), absent from the untouched volume, held whole by no corpus file"
    return f"coherence/assemble-r3 (volumes): the reviewed row proposed by repair-r3-{b.split('-')[0]} — {pr} — re-checked: {tail}".replace('\t', ' ')
if APPEND and append:
    hdr = (f"# block: coherence/assemble-r3 (volumes), 2026-10-01 (opus, the mechanical assembler of the coherence pass's repair round 2; PENDING FABLE "
           f"REVIEW) — the volume repair seats' proposed rows (each seat writes no shared file), appended for the new unreviewed hits of each "
           f"installed volume (doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md, untouched against final, one corpus snapshot; "
           f"work/assemble-r3/volchecks.sh, volrows.py -> vol-attribution.tsv): each run is new text of that volume's repair block, absent from the "
           f"untouched volume, held whole by no corpus file. The volumes' runs are information (not held to exit 0). Reference corpus INCOMPLETE "
           f"in this checkout (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external absent): PROVISIONAL. Rows: {len(append)}.")
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join('\t'.join([c, r, why(b, r, pr)]) for b, c, r, pr in append) + '\n')
    print('appended', len(append))
