#!/usr/bin/env python3
"""Generator for repair-r1-V12: count-asserted substitutions on the live V12 sections, emitted as REPLACE blocks.
Each edit names its section heading (exact), the old text, the new text and the expected count of the old text in that
section. Every untouched line of a replaced section is verbatim."""
import sys, os, json
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
from lib import section, headings

ORIG = os.path.join(S, 'V12.orig.md')
lines = open(ORIG, encoding='utf-8').read().split('\n')

EDITS = []          # (heading, old, new, count, tag)
RETITLE = {}        # heading -> new heading line

def E(heading, old, new, count=1, tag=''):
    EDITS.append((heading, old, new, count, tag))

import edits_a, edits_b, edits_c
for m in (edits_a, edits_b, edits_c):
    m.add(E, RETITLE)

# apply per section, in document order
by_head = {}
for h, o, n, c, t in EDITS:
    by_head.setdefault(h, []).append((o, n, c, t))

out_sections = []
fails = []
for h, subs in by_head.items():
    i, e = section(lines, h)
    text = '\n'.join(lines[i:e])
    for o, n, c, t in subs:
        k = text.count(o)
        if k != c:
            fails.append((h, t, k, c, o[:120]))
            continue
        text = text.replace(o, n)
    if h in RETITLE:
        first, rest = text.split('\n', 1)
        assert first == h
        text = RETITLE[h] + '\n' + rest
    out_sections.append((i, e, h, text))

if fails:
    for f in fails:
        print('FAIL', f)
    sys.exit(1)

out_sections.sort()
# non-overlap check
for a, b in zip(out_sections, out_sections[1:]):
    assert a[1] <= b[0], ('overlap', a[2], b[2])

# blocks
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
new = []
pos = 0
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
open(os.path.join(S, 'V12.new.md'), 'w', encoding='utf-8').write('\n'.join(new))
print('sections', len(out_sections), 'edits', len(EDITS))
for i, e, h, text in out_sections:
    print('  ', i + 1, h[:90])
