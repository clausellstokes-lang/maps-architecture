#!/usr/bin/env python3
"""headings.py (coherence/assemble-r7v, P3) — every heading added, removed or retitled by this round, per live file: the
untouched copy (asm7v/before) against the final copy (asm7v/final), headings outside fenced code (apply-blocks' rule).
A retitle is a heading of the same level and the same leading number (or, for an unnumbered one, the same position
among its siblings) whose text changed. Writes headings.json beside it."""
import json, os, re, glob
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r7v')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7v'
FENCE = re.compile(r'^\s*(```|~~~)'); HEAD = re.compile(r'^(#{1,6})\s+(\S.*)$')
NUM = re.compile(r'^((?:PART [IVX]+|II\.\d+(?:\.\d+)*|\d+[a-z]?(?:\.\d+[a-z]?)*))\b')
def heads(p):
    out, fence = [], None
    for i, l in enumerate(open(p, encoding='utf-8').read().split('\n')):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence); continue
        if fence is None:
            h = HEAD.match(l)
            if h: out.append((len(h.group(1)), h.group(2).rstrip(), i + 1))
    return out
files = ['docs/ARCHITECTURE.md'] + sorted(glob.glob(f'{SCR}/before/docs/volumes/*.md'))
files = [f if f.startswith('docs/') else os.path.relpath(f, f'{SCR}/before') for f in files]
res = {}
for f in files:
    a, b = heads(f'{SCR}/before/{f}'), heads(f'{SCR}/final/{f}')
    A, B = [(l, t) for l, t, _ in a], [(l, t) for l, t, _ in b]
    sa, sb = set(A), set(B)
    gone = [x for x in A if x not in sb]; new = [x for x in B if x not in sa]
    key = lambda x: (x[0], (NUM.match(x[1]).group(1) if NUM.match(x[1]) else None))
    retitled, added, removed = [], [], []
    gk = {}
    for g in gone: gk.setdefault(key(g), []).append(g)
    for n in new:
        k = key(n)
        if k[1] is not None and gk.get(k):
            o = gk[k].pop(0); retitled.append(dict(level=n[0], old=o[1], new=n[1]))
        else:
            added.append(dict(level=n[0], title=n[1], line=next(ln for l, t, ln in b if (l, t) == n)))
    for k, v in gk.items():
        for o in v: removed.append(dict(level=o[0], title=o[1]))
    res[f] = dict(before=len(a), after=len(b), added=added, retitled=retitled, removed=removed)
    print(f"{f}: {len(a)} -> {len(b)}; added {len(added)}, retitled {len(retitled)}, removed {len(removed)}")
    for x in added: print(f"   + {'#' * x['level']} {x['title'][:150]}  (l. {x['line']})")
    for x in retitled: print(f"   ~ {'#' * x['level']} {x['old'][:110]}\n       -> {x['new'][:110]}")
    for x in removed: print(f"   - {'#' * x['level']} {x['title'][:150]}")
json.dump(res, open(f'{W}/headings.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
