#!/usr/bin/env python3
"""Generator for repair-r1-V03: count-asserted substitutions on the live V03 sections, emitted as REPLACE blocks.
Each edit names its section heading (exact), the old text, the new text, the expected count of the old text in that
section and the issue it serves. Every untouched line of a replaced section is verbatim. Run from anywhere:
    python3 gen.py        -> blocks.txt (the block bodies), V03.new.md (the intended whole volume), edits.log
"""
import sys, os
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
from lib import section, headings

ORIG = os.path.join(S, 'V03.orig.md')
lines = open(ORIG, encoding='utf-8').read().split('\n')

EDITS = []          # (heading, old, new, count, tag)

def E(heading, old, new, count=1, tag=''):
    assert old != new, (heading, tag, old[:60])
    EDITS.append((heading, old, new, count, tag))

import edits_a, edits_b, edits_c
for m in (edits_a, edits_b, edits_c):
    m.add(E)

by_head = {}
order = []
for h, o, n, c, t in EDITS:
    if h not in by_head:
        by_head[h] = []
        order.append(h)
    by_head[h].append((o, n, c, t))

out_sections, fails, log = [], [], []
for h in order:
    i, e = section(lines, h)
    text = '\n'.join(lines[i:e])
    for o, n, c, t in by_head[h]:
        k = text.count(o)
        if k != c:
            fails.append((h, t, k, c, o[:140]))
            continue
        text = text.replace(o, n)
        log.append('%s\t%s\tcount %d' % (t, h[:60], c))
    first = text.split('\n', 1)[0]
    assert first == h, ('heading changed', h, first)
    out_sections.append((i, e, h, text))

if fails:
    for f in fails:
        print('FAIL', f)
    sys.exit(1)

out_sections.sort()
for a, b in zip(out_sections, out_sections[1:]):
    assert a[1] <= b[0], ('overlap', a[2], b[2])

blk = []
for i, e, h, text in out_sections:
    body = text.split('\n')
    while body and not body[-1].strip():
        body.pop()
    blk.append('=== REPLACE %s ===' % h)
    blk.extend(body)
    blk.append('=== END ===')
    blk.append('')
open(os.path.join(S, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(blk))

# the intended full text (REPLACE keeps the replaced range's trailing blank lines)
new, pos = [], 0
for i, e, h, text in out_sections:
    new.extend(lines[pos:i])
    body = text.split('\n')
    while body and not body[-1].strip():
        body.pop()
    tb = 0
    for l in reversed(lines[i:e]):
        if l.strip():
            break
        tb += 1
    new.extend(body)
    new.extend([''] * tb)
    pos = e
new.extend(lines[pos:])
open(os.path.join(S, 'V03.new.md'), 'w', encoding='utf-8').write('\n'.join(new))
open(os.path.join(S, 'edits.log'), 'w', encoding='utf-8').write('\n'.join(log) + '\n')
print('sections', len(out_sections), 'edits', len(EDITS))
for i, e, h, text in out_sections:
    print('  ', i + 1, h[:90])
