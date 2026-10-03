#!/usr/bin/env python3
"""repair-kernel-r2 builder: live §3.3 and §3.4 + count-asserted substitutions -> REPLACE block bodies.

Each substitution must match exactly once in its subsection; every other line stays verbatim.
Writes blocks.txt (the block section of the repair file), old-sections/ and new-sections/ (for diffing).
"""
import os, re, hashlib

ROOT = '/home/user/maps-architecture'
DOC = os.path.join(ROOT, 'docs/ARCHITECTURE.md')
HERE = os.path.dirname(os.path.abspath(__file__))
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

text = open(DOC, encoding='utf-8').read()
assert hashlib.sha256(text.encode()).hexdigest().startswith('137ecc0e4fe12c44'), 'base changed under us'
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

H33 = '### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end'
H34 = '### 3.4 Kernel operations the pipeline needs (complete list)'

EDITS = {
  H33: [
    ('VKr1-05: expect takes the batch-scope rows of class hard; a soft row goes to the report (§5.3)',
     "of scope 'batch' (§4.12), the class floors of the faces it makes among them (§4.7's class-floor row);",
     "of scope 'batch' and class 'hard' (§4.12, §5.3; a soft row goes to the report, never into `expect`), the class "
     "floors of the faces it makes among them (§4.7's class-floor row);"),
  ],
  H34: [
    ('VKr1-03 (R2-26 (a)): the feet cite §2.7 and restate nothing; the stray short line rejoined',
     "`UndergroundLink`, §2.7) — whose two `link_end` vertices lie one in each part it joins, and a raised way's two feet\n"
     "(`RaisedWayRecord.feet`, §2.7), where its ramps or stairs meet part 0 (item 110 (b)), each a `raised_foot` vertex on\n"
     "part 0 and one on the raised part — as an `AccessPoint` names a ground point and a kerb vertex (II.7.4). Each end\n"
     "names its part (`{ part; at }`), so `resolve`\n"
     "reads it with that part's key, and is placed or stripped by a transaction on that part alone — never a vertex two arenas\n",
     "`UndergroundLink`, §2.7) — whose two `link_end` vertices lie one in each part it joins, and a raised way's two feet\n"
     "(`RaisedWayRecord.feet`, §2.7; item 110 (b)), each a `raised_foot` vertex on part 0 and one on the raised part — as an\n"
     "`AccessPoint` names a ground point and a kerb vertex (II.7.4). Each end names its part (`{ part; at }`), so `resolve`\n"
     "reads it with that part's key, and is placed or stripped by a transaction on that part alone — never a vertex two arenas\n"),
  ],
}

os.makedirs(os.path.join(HERE, 'new-sections'), exist_ok=True)
os.makedirs(os.path.join(HERE, 'old-sections'), exist_ok=True)
blocks, nsub = [], 0
for h, tag in ((H33, '3.3'), (H34, '3.4')):
    old = section(h); new = old
    for t, a, b in EDITS[h]:
        new = sub(new, a, b, t); nsub += 1
    assert new != old
    open(os.path.join(HERE, 'old-sections', f'{tag}.md'), 'w').write(old + '\n')
    open(os.path.join(HERE, 'new-sections', f'{tag}.md'), 'w').write(new + '\n')
    blocks.append(f'=== REPLACE {h} ===\n{new}\n=== END ===\n')
open(os.path.join(HERE, 'blocks.txt'), 'w').write('\n'.join(blocks))
print(f'blocks {len(blocks)}, substitutions {nsub}, each applied exactly once')
