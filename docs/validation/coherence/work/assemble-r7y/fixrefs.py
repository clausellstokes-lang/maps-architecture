#!/usr/bin/env python3
"""fixrefs.py (coherence/assemble-r7y, P4) — the mechanical reference fixes refs.py classes FIX (assemble-r0's fixrefs.py
logic, unchanged): the G-cite prefix of canon S7 (a volume's section is 'Vnn §x.y' everywhere, self-references and every
item of a list or range included; V12's *Id rulings*), inserted only where the bare '§x' resolves in no base heading and
in exactly one volume. Applied to the installed live file (guarded: it must equal the final copy refs.py read) and to the
final copy, so both stay identical. Usage: fixrefs.py REFS-FINAL.json. Writes ref-fixes.tsv and fixrefs.json beside it."""
import hashlib, json, os, sys
from collections import defaultdict
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
W = 'docs/validation/coherence/work/assemble-r7y'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7y/final'
import glob
PATH = {'base': 'docs/ARCHITECTURE.md', 'INDEX': 'docs/volumes/INDEX.md'}
for f in glob.glob('docs/volumes/V*.md'): PATH[os.path.basename(f)[:3]] = f
h = lambda b: hashlib.sha256(b).hexdigest()
res = json.load(open(sys.argv[1], encoding='utf-8'))
by = defaultdict(list)
for r in res['refs']:
    if r['cls'] == 'FIX': by[r['unit']].append(r)
rows = ['unit\tline\tref\tinserted\twhy\tcontext']; log = []
for u, fx in sorted(by.items()):
    live, fin = PATH[u], f'{FIN}/{PATH[u]}'
    if open(live, 'rb').read() != open(fin, 'rb').read(): sys.exit(f'STOP — {live} differs from the final copy refs.py read')
    t = open(live, encoding='utf-8').read(); before = h(t.encode('utf-8'))
    seen = set()
    for r in sorted(fx, key=lambda r: -r['fix']['orig_index']):
        i = r['fix']['orig_index']; ins = r['fix']['insert']
        if i in seen: continue
        seen.add(i)
        ch = t[i]
        if not (ch == '§' and not ins.endswith('§')) and not (ch.isdigit() and ins.endswith('§')):
            sys.exit(f'STOP — {u} l. {r["line"]}: unexpected character {ch!r} at the fix position for {r["ref"]}')
        if t[max(0, i - 4):i].rstrip().endswith(ins.split(' ')[0]):
            sys.exit(f'STOP — {u} l. {r["line"]}: already prefixed')
        t = t[:i] + ins + t[i:]
        rows.append('\t'.join([u, str(r['line']), r['ref'], ins, r.get('why', ''), r['ctx'][-100:].replace('\t', ' ').replace('\n', ' / ')]))
    for p in (live, fin): open(p, 'w', encoding='utf-8').write(t)
    log.append(dict(unit=u, file=live, fixes=len(seen), sha256_before=before, sha256_after=h(t.encode('utf-8'))))
    print(f'{u:<6} {len(seen)} fixes  {before[:16]} -> {h(t.encode("utf-8"))[:16]}')
open(f'{W}/ref-fixes.tsv', 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
json.dump(log, open(f'{W}/fixrefs.json', 'w', encoding='utf-8'), indent=1)
print(f'{len(rows) - 1} fixes applied')
