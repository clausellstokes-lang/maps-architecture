# Lane coherence/assemble-r0, step (a) fixes: apply the mechanical reference fixes refs.py classed FIX — the G-cite rename
# the rewrite reports record (canon S7: a volume's section is 'Vnn §x.y' everywhere, self-references and every item of a
# list included; V04, V05, V06, V09, V10, V11, V12 *Id rulings*), applied only where the bare '§x' resolves in no base
# heading and in exactly one volume (the list's head volume, or the citing volume for a self-reference). Each fix inserts
# 'Vnn ' before the '§' (or 'Vnn §' before a list continuation written without one). Nothing else is changed.
# Usage: fixrefs.py REFS.json [--dry]. Writes work/assemble-r0/ref-fixes.tsv and work/assemble-r0/ambiguous-refs.tsv.
import json, os, sys
from collections import defaultdict
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
WORK = 'docs/validation/coherence/work/assemble-r0'
PATH = {'base': 'docs/ARCHITECTURE.md', 'INDEX': 'docs/volumes/INDEX.md'}
import glob
for f in glob.glob('docs/volumes/V*.md'): PATH[os.path.basename(f)[:3]] = f
res = json.load(open(sys.argv[1], encoding='utf-8'))
DRY = '--dry' in sys.argv
by = defaultdict(list)
for r in res['refs']:
    if r['cls'] == 'FIX': by[r['unit']].append(r)
rows = ['unit\tline\tref\tinserted\twhy\tcontext']
problems = []
for u, fx in sorted(by.items()):
    t = open(PATH[u], encoding='utf-8').read()
    seen = set()
    for r in sorted(fx, key=lambda r: -r['fix']['orig_index']):
        i = r['fix']['orig_index']; ins = r['fix']['insert']
        if i in seen: continue
        seen.add(i)
        ch = t[i]
        if not (ch == '§' and not ins.endswith('§')) and not (ch.isdigit() and ins.endswith('§')):
            problems.append(f'{u} l. {r["line"]}: unexpected character {ch!r} at the fix position for {r["ref"]}'); continue
        if t[max(0, i - 4):i].rstrip().endswith(ins.split(' ')[0]):
            problems.append(f'{u} l. {r["line"]}: already prefixed'); continue
        t = t[:i] + ins + t[i:]
        rows.append('\t'.join([u, str(r['line']), r['ref'], ins, r.get('why', ''), r['ctx'][-100:].replace('\t', ' ').replace('\n', ' / ')]))
    if not DRY and not problems: open(PATH[u], 'w', encoding='utf-8').write(t)
    print(f'{u:<6} {len(seen)} fixes')
amb = ['unit\tline\tref\tlist head (the other reading)\tcontext']
for r in res['refs']:
    if r['cls'] == 'ambiguous':
        amb.append('\t'.join([r['unit'], str(r['line']), r['ref'], r.get('alt', ''), r['ctx'][-100:].replace('\t', ' ').replace('\n', ' / ')]))
if problems:
    print('STOP:'); [print(' ', p) for p in problems]; sys.exit(2)
open(f'{WORK}/ref-fixes.tsv', 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
open(f'{WORK}/ambiguous-refs.tsv', 'w', encoding='utf-8').write('\n'.join(amb) + '\n')
print(f'{len(rows) - 1} fixes {"checked (dry)" if DRY else "applied"}; {len(amb) - 1} ambiguous-form references listed')
