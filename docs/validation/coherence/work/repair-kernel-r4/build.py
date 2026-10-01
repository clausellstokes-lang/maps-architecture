#!/usr/bin/env python3
"""repair-kernel-r4 builder: live §3.2 + one count-asserted substitution -> the REPLACE block body.

The substitution must match exactly once in the subsection; every other line stays verbatim.
Writes blocks.txt (the block section of the repair file), old-sections/ and new-sections/ (for diffing), sizes.txt.
"""
import os, re, hashlib

ROOT = '/home/user/maps-architecture'
DOC = os.path.join(ROOT, 'docs/ARCHITECTURE.md')
HERE = os.path.dirname(os.path.abspath(__file__))
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

text = open(DOC, encoding='utf-8').read()
assert hashlib.sha256(text.encode()).hexdigest().startswith('593c657d34849302'), 'base changed under us'
lines = text.split('\n')


def headings(ls):
    out, fence = [], None
    for i, l in enumerate(ls):
        m = FENCE.match(l)
        if m:
            if fence is None: fence = m.group(1)
            elif m.group(1) == fence: fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out


HEADS = headings(lines)


def section(head_line):
    ks = [k for k, (_, _, l) in enumerate(HEADS) if l == head_line]
    assert len(ks) == 1, (head_line, ks)
    k = ks[0]; i, lvl, _ = HEADS[k]
    j = len(lines)
    for i2, l2, _ in HEADS[k + 1:]:
        if l2 <= lvl: j = i2; break
    body = lines[i:j]
    while body and body[-1].strip() == '': body.pop()
    return '\n'.join(body)


def sub(s, old, new, tag):
    n = s.count(old)
    assert n == 1, f'{tag}: expected 1 match, found {n}'
    return s.replace(old, new)


H32 = '### 3.2 Numeric policy'

import textwrap

OLD_SPAN = (
    "   request — at the frame's own `aspect`, centred on (0, 0), kept at the current frame where that is no larger; the new\n"
    "   arena is the new frame plus the current law's margin, kept at the current arena where that is no larger. So a frame\n"
    "   and its arena never shrink — a change of frame law included (item 322's product fold, §4.11) — each new one encloses\n"
    "   its predecessor, and where neither grows, nothing runs. The range bound of (1) holds for every grown coordinate. The\n")
NEW_TEXT = (
    "request — at the frame's own `aspect`, centred on (0, 0), kept at the current frame where that is no larger or would "
    "move one of its sides out by at most `attractCm` ((2); measured on the lattice); the new arena is the new frame plus "
    "the current law's margin, kept at the current arena where that is no larger or would move one of its sides out by at "
    "most `attractCm` — so no new chain is laid within attraction of the chain it replaces, which §3.6's vertex and "
    "stretch attraction would merge into it before the strip removes its rows, and no through-road's continuation (§4.11) or raised foot's move "
    "(below) spans `attractCm` or less. So a frame and its arena never shrink — a change of frame law included (item "
    "322's product fold, §4.11) — each new one encloses its predecessor, and where neither grows, nothing runs. The range "
    "bound of (1) holds for every grown coordinate. The")
# re-wrapped at 120 characters with the paragraph's 3-space indent; no break inside a backticked token or before a
# closing bracket (textwrap breaks on spaces only, and the text holds no space inside a token)
NEW_SPAN = '\n'.join(textwrap.wrap(NEW_TEXT, width=120, initial_indent='   ', subsequent_indent='   ',
                                   break_long_words=False, break_on_hyphens=False)) + '\n'

EDITS = {
  H32: [
    ("VKr3-02: a growth moving one of the frame's or arena's sides out by at most attractCm keeps it",
     OLD_SPAN, NEW_SPAN),
  ],
}

os.makedirs(os.path.join(HERE, 'old-sections'), exist_ok=True)
os.makedirs(os.path.join(HERE, 'new-sections'), exist_ok=True)
blocks, sizes = [], []
for h, edits in EDITS.items():
    old = section(h)
    new = old + '\n'
    for tag, a, b in edits:
        new = sub(new, a, b, tag)
    new = new.rstrip('\n')
    slug = h.split()[1]
    open(os.path.join(HERE, 'old-sections', slug + '.md'), 'w', encoding='utf-8').write(old + '\n')
    open(os.path.join(HERE, 'new-sections', slug + '.md'), 'w', encoding='utf-8').write(new + '\n')
    blocks.append(f'=== REPLACE {h} ===\n{new}\n=== END ===\n')
    sizes.append(f'{h}: words {len(old.split())} -> {len(new.split())} ({len(new.split()) - len(old.split()):+d}); '
                 f'lines {old.count(chr(10)) + 1} -> {new.count(chr(10)) + 1}')
    long = [l for l in new.split('\n') if len(l) > 121 and not l.startswith('  marginShare')]
    sizes.append(f'  lines over 121 chars (outside the Frame interface): {len(long)}')

open(os.path.join(HERE, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(blocks))
open(os.path.join(HERE, 'sizes.txt'), 'w', encoding='utf-8').write('\n'.join(sizes) + '\n')
print('\n'.join(sizes))
