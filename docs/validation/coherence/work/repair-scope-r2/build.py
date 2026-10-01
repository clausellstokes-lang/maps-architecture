#!/usr/bin/env python3
"""build.py (coherence/repair-scope-r2) — builds the scope unit's round-2 block file from the LIVE files by
count-asserted substitutions. Every section block is the live section text with the substitutions of the edits_*.py
modules applied, each asserted to match exactly `count` times; every untouched line stays verbatim.

usage: python3 build.py [--out FILE]   (default: prints a summary; --out writes the blocks to FILE)
"""
import argparse, hashlib, importlib.util, json, os, sys

ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/repair-scope-r2')
spec = importlib.util.spec_from_file_location('ab', os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py'))
ab = importlib.util.module_from_spec(spec); spec.loader.exec_module(ab)

BASE = os.path.join(ROOT, 'docs/ARCHITECTURE.md')
INDEX = os.path.join(ROOT, 'docs/volumes/INDEX.md')


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def section(lines, heading):
    heads, _ = ab.headings(lines)
    ks = [k for k, h in enumerate(heads) if h[2] == heading]
    if len(ks) != 1:
        sys.exit(f'STOP: heading found {len(ks)} times: {heading[:100]}')
    s, e = ab.section_range(lines, heads, ks[0])
    body = lines[s:e]
    while body and not body[-1].strip():
        body.pop()
    return '\n'.join(body)


class Edits:
    """An ordered set of substitutions per target section."""
    def __init__(self):
        self.by = {}       # (file, heading) -> [(old, new, count, tag)]
        self.order = []    # (file, heading) in first-seen order

    def add(self, file, heading, old, new, count=1, tag=''):
        k = (file, heading)
        if k not in self.by:
            self.by[k] = []; self.order.append(k)
        self.by[k].append((old, new, count, tag))


def load_edits(E):
    mods = sorted(f for f in os.listdir(W) if f.startswith('edits_') and f.endswith('.py'))
    for m in mods:
        sp = importlib.util.spec_from_file_location(m[:-3], os.path.join(W, m))
        mod = importlib.util.module_from_spec(sp); sp.loader.exec_module(mod)
        mod.register(E)
    return mods


def build():
    E = Edits()
    mods = load_edits(E)
    texts = {BASE: open(BASE, encoding='utf-8').read().split('\n'), INDEX: open(INDEX, encoding='utf-8').read().split('\n')}
    blocks, log = [], []
    for (file, heading) in E.order:
        t = section(texts[file], heading)
        before = t
        for old, new, count, tag in E.by[(file, heading)]:
            n = t.count(old)
            if n != count:
                sys.exit(f'STOP: [{tag}] in {heading[:60]!r}: expected {count}, found {n}: {old[:160]!r}')
            t = t.replace(old, new)
            log.append(dict(file=os.path.basename(file), section=heading[:80], tag=tag, count=count))
        if t == before:
            sys.exit(f'STOP: no change in {heading[:80]}')
        blocks.append((file, heading, t, before))
    return E, mods, blocks, log


def jrows_rat():
    out = {}
    for name in ('jrows', 'rationale'):
        p = os.path.join(W, f'{name}.txt')
        out[name] = [l for l in open(p, encoding='utf-8').read().split('\n') if l.strip()] if os.path.exists(p) else []
    return out


def render(blocks, jr):
    parts = []
    base_blocks = [b for b in blocks if b[0] == BASE]
    idx_blocks = [b for b in blocks if b[0] == INDEX]
    for file, heading, t, _ in base_blocks:
        parts.append(f'=== REPLACE {heading} ===\n{t}\n=== END ===\n')
    if jr['jrows']:
        parts.append('=== J-ROWS ===\n' + '\n'.join(jr['jrows']) + '\n=== END ===\n')
    if jr['rationale']:
        parts.append('=== RATIONALE-A ===\n' + '\n'.join(jr['rationale']) + '\n=== END ===\n')
    if idx_blocks:
        parts.append('=== FILE docs/volumes/INDEX.md ===\n')
        for file, heading, t, _ in idx_blocks:
            parts.append(f'=== REPLACE {heading} ===\n{t}\n=== END ===\n')
    return '\n'.join(parts)


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('--out'); ap.add_argument('--diff', action='store_true')
    a = ap.parse_args()
    E, mods, blocks, log = build()
    jr = jrows_rat()
    txt = render(blocks, jr)
    print('modules:', mods)
    print('substitutions:', len(log), '; blocks:', len(blocks), '+ J-ROWS', len(jr['jrows']), '+ RATIONALE-A', len(jr['rationale']))
    for file, heading, t, before in blocks:
        print(f'  {os.path.basename(file):16} {heading[:70]:72} words {len(before.split()):>6} -> {len(t.split()):>6}')
    json.dump(log, open(os.path.join(W, 'build-log.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    if a.out:
        open(a.out, 'w', encoding='utf-8').write(txt)
        print('wrote', a.out, sha(txt)[:16])
    if a.diff:
        import difflib
        for file, heading, t, before in blocks:
            for l in difflib.unified_diff(before.split('\n'), t.split('\n'), lineterm='', n=0):
                print(l[:400])
