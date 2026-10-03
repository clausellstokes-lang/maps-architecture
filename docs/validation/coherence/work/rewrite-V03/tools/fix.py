#!/usr/bin/env python3
"""Apply exact-string replacements to the V03 rewrite parts (each must match exactly once across all parts), then
re-assemble new/volumes/V03-interiors.md. Usage: fix.py REPS.json  (a list of [old, new] pairs)."""
import json, glob, os, sys
base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
parts = sorted(glob.glob(os.path.join(base, 'parts', '*.md')))
reps = json.load(open(sys.argv[1]))
texts = {p: open(p).read() for p in parts}
for a, b in reps:
    hits = [p for p in parts if a in texts[p]]
    total = sum(texts[p].count(a) for p in parts)
    if total != 1:
        print('SKIP (%d hits): %s' % (total, a[:90])); continue
    p = hits[0]; texts[p] = texts[p].replace(a, b); print('ok', os.path.basename(p), a[:60])
for p in parts:
    open(p, 'w').write(texts[p])
out = '\n'.join(open(p).read().rstrip('\n') + '\n' for p in parts)
dst = os.path.join(base, '..', '..', 'new', 'volumes', 'V03-interiors.md')
open(os.path.normpath(dst), 'w').write(out)
print('assembled', len(out.split()), 'words')
