#!/usr/bin/env python3
"""staleallow.py (coherence/assemble-r7v, P5) — the allow file's C3 rows that matched text in the untouched set (base, volumes,
INDEX, rationale) and match nothing in the final set: rows pointing at text this round removed (the brief: "may be dropped
with a note"). Read-only; the shared allow file is append-only for this seat, so they are listed, not dropped. Tokenised as
doc_checks does. Writes staleallow.json beside it."""
import glob, json, os, re
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7v'
W = 'docs/validation/coherence/work/assemble-r7v'
tok = lambda s: ' ' + ' '.join(re.findall(r'[a-z0-9_]+', s.lower())) + ' '
files = ['docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md', 'docs/volumes/INDEX.md'] + sorted(os.path.relpath(p, f'{SCR}/before') for p in glob.glob(f'{SCR}/before/docs/volumes/V*.md'))
B = {f: tok(open(f'{SCR}/before/{f}', encoding='utf-8').read()) for f in files}
F = {f: tok(open(f'{SCR}/final/{f}', encoding='utf-8').read()) for f in files}
rows = []
for n, l in enumerate(open('docs/validation/doc-checks-allow.tsv', encoding='utf-8'), 1):
    p = l.rstrip('\n').split('\t')
    if l.startswith('#') or len(p) < 3 or p[0] != 'C3' or not p[2].strip(): continue
    needle = ' ' + p[1].lower() + ' '
    inb = [f for f in files if needle in B[f]]; inf = [f for f in files if needle in F[f]]
    if inb and not inf:
        rows.append(dict(line=n, run=p[1], was_in=inb, block_reason=p[2][:160]))
json.dump(rows, open(f'{W}/staleallow.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(rows), 'C3 rows matched the untouched set and match nothing in the final set')
for r in rows: print(f"  l. {r['line']} {r['run']!r} (was in {', '.join(x.split('/')[-1] for x in r['was_in'])}) | {r['block_reason'][:110]}")
