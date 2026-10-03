#!/usr/bin/env python3
"""Generator for repair-r1-V01: count-asserted substitutions on the live V01's sections, emitted as REPLACE blocks.
Each edit names its section heading (exact), the old text, the new text, the expected count of the old text in that
section and the issue it answers. Every untouched line of a replaced section is verbatim. Run: python3 gen.py
Outputs: blocks.txt (the REPLACE blocks), V01.new.md (the intended whole file), tags.json (edits per issue)."""
import sys, os, json, hashlib
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
from lib import section, headings

ORIG = os.path.join(S, 'V01.orig.md')
src = open(ORIG, encoding='utf-8').read()
lines = src.split('\n')

EDITS = []          # (heading, old, new, count, tag)


def E(heading, old, new, count=1, tag=''):
    EDITS.append((heading, old, new, count, tag))


import edits_a, edits_b, edits_c
for m in (edits_a, edits_b, edits_c):
    m.add(E, lines)

by_head = {}
order = []
for h, o, n, c, t in EDITS:
    if h not in by_head:
        by_head[h] = []
        order.append(h)
    by_head[h].append((o, n, c, t))

out_sections, fails, tags = [], [], {}
for h in order:
    i, e = section(lines, h)
    text = '\n'.join(lines[i:e])
    for o, n, c, t in by_head[h]:
        k = text.count(o)
        if k != c:
            fails.append((h[:60], t, k, c, o[:140]))
            continue
        text = text.replace(o, n)
        tags[t] = tags.get(t, 0) + 1
    out_sections.append((i, e, h, text))

if fails:
    for f in fails:
        print('FAIL', f)
    sys.exit(1)

out_sections.sort()
for a, b in zip(out_sections, out_sections[1:]):
    assert a[1] <= b[0], ('overlap', a[2], b[2])

blk = ['=== FILE docs/volumes/V01-neighbourhoods.md ===', '']
for i, e, h, text in out_sections:
    body = text.split('\n')
    while body and not body[-1].strip():
        body.pop()
    blk.append('=== REPLACE %s ===' % h)
    blk.extend(body)
    blk.append('=== END ===')
    blk.append('')
open(os.path.join(S, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(blk))

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
newtext = '\n'.join(new)
open(os.path.join(S, 'V01.new.md'), 'w', encoding='utf-8').write(newtext)
json.dump(tags, open(os.path.join(S, 'tags.json'), 'w'), indent=1, sort_keys=True)
print('source sha256', hashlib.sha256(src.encode()).hexdigest()[:16], '; new sha256',
      hashlib.sha256(newtext.encode()).hexdigest()[:16])
print('sections', len(out_sections), 'edits', len(EDITS))
for i, e, h, text in out_sections:
    print('  ', i + 1, h[:100])
for t in sorted(tags):
    print('  ', t, tags[t])
