#!/usr/bin/env python3
"""volrows.py (coherence/assemble-r1, P5 (b')) — the volume seats' proposed allow rows ("this lane writes no shared file";
"proposed allow rows for the assembler"). For each volume: the NEW unreviewed hits (in the final run, not in the
untouched run of volchecks.sh); each matched to its seat's proposed row (the row-format lines of the repair preamble, or
V01's prose list with its shared reason) and attributed as attrib.py does (carried by the volume's repair block, absent from
the untouched volume, which corpus files hold it whole). Writes vol-attribution.tsv; with --append, appends the matched
rows (no corpus file holding the run whole, or read in context: READ) as one block to the allow file. Hits without a
proposed row are listed, not appended. Usage: volrows.py VOLCHECKS_DIR [--append]"""
import glob, json, os, re, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence'
W = 'docs/validation/coherence/work/assemble-r1'; ALLOW = 'docs/validation/doc-checks-allow.tsv'
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
V01_LIST = ["16 1 2 the base hooks", "3 10 1 1 5 2 1 5", "3 4 4 3 3 7", "4 5 and the tree s", "4 7 the gate s", "5 4 5 5 4", "a cell that is a rule",
            "as it is the longer", "by name and the map", "committed state and the key", "definition of the town s", "its state is the per", "or not at all a",
            "ring of the union of the outline s", "small medium large size small", "the look of an area"]
V01_REASON = "repair-V01-r1 (2026-10-01): one of the 16 C3 three-gram runs the new text adds, reviewed by that seat — generic English or section-number runs, no reference identifier, word list, palette or table"
READ = {   # proposed runs outside the plain rule, each read in context in the installed volume
 'small medium large size small': "held whole by research/findings/profile-dwellings.md l. 72 (a size row of a reference's options); read in context: V01 §5.1.2's size chips '**small / medium / large**, `size.small`, `size.medium` and `size.large` houses (V01 §3.14)' — a generic three-step size scale with our own keys, not a copied list (three generic words), not code",
 '16 1 2 the base hooks': "new text spanning two adjacent repair blocks: the pointer '(V01 §5.4, V01 §3.16).' that ends V01 §1.1's block and the heading of V01 §1.2's block; section digits and the heading's own words",
 '4 9 and the client s': "a section-pointer run of V08 §1b's W86 row ('(3.7, 3.9, 4.2, 4.9) and the client's …'); the words stood in the untouched volume, and the prefix pass moved the maximal run's ends; digits and ordinary words",
 'a click or elaborate view': "held whole only by research/findings/dwellings-synthesis.md, the program's own design page, which quotes the design; V03 §5.5's 'a click or `elaborate: 'view'` does (V03 §4.5)'",
 'b city lite s clicked buildings': "held whole only by research/findings/dwellings-synthesis.md, the program's own design page, which quotes the design; T-V3-38's 'B-CITY-lite's clicked buildings'",
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
    pre = f'{SCR}/pre-repair-r1-{unit}.md'
    prop = {}
    if os.path.exists(pre):
        for l in open(pre, encoding='utf-8'):
            m = rx.match(l.rstrip('\n'))
            if m: prop[(m.group(1), m.group(2))] = m.group(3)
    if unit == 'V01':
        for r in V01_LIST: prop[('C3', r)] = V01_REASON
    vol_before = sp(tok(open(f'{SCR}/before/docs/volumes/{b}.md', encoding='utf-8').read()))
    blk = f'{W}/split/{b}/repair-r1-{unit}.md'
    blk_t = sp(tok(open(blk, encoding='utf-8').read())) if os.path.exists(blk) else ' '
    if unit == 'INDEX':
        blk_t = sp(tok(open(f'{W}/split/INDEX/repair-r1-scope.md', encoding='utf-8').read()))
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
    return f"coherence/assemble-r1 (volumes): the reviewed row proposed by repair-r1-{b.split('-')[0]} — {pr} — re-checked: {tail}".replace('\t', ' ')
if APPEND and append:
    hdr = (f"# block: coherence/assemble-r1 (volumes), 2026-10-01 (opus, the mechanical assembler of the coherence pass's repair round 1; PENDING FABLE "
           f"REVIEW) — the volume repair seats' proposed rows (each seat writes no shared file), appended for the new unreviewed hits of each "
           f"installed volume (doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md, untouched against final, one corpus snapshot; "
           f"work/assemble-r1/volchecks.sh, volrows.py -> vol-attribution.tsv): each run is new text of that volume's repair block, absent from the "
           f"untouched volume, held whole by no corpus file (five runs read in context, their reasons say so). The volumes' runs are information (not held to exit 0). Reference corpus INCOMPLETE "
           f"in this checkout (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external absent): PROVISIONAL. Rows: {len(append)}.")
    with open(ALLOW, 'a', encoding='utf-8') as f:
        f.write(hdr + '\n' + '\n'.join('\t'.join([c, r, why(b, r, pr)]) for b, c, r, pr in append) + '\n')
    print('appended', len(append))
