#!/usr/bin/env python3
"""repair-r1-V02 generator: count-asserted substitutions over the live V02 (V02.orig.md), producing the new volume
(V02.new.md), a unified diff (diff.txt) and the block body (one REPLACE of the level-1 title = the whole volume).
Each edit: (tag, old, new, count). Every old string must occur exactly `count` times in the text as it stands when the
edit applies (edits apply in order). Untouched text stays byte-identical."""
import os, sys, difflib, hashlib
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
orig = open(os.path.join(S, 'V02.orig.md'), encoding='utf-8').read()

EDITS = []
def E(tag, old, new, count=1):
    EDITS.append((tag, old, new, count))

import edits_a, edits_b, edits_c, edits_d
for m in (edits_a, edits_b, edits_c, edits_d):
    m.add(E)

text = orig
fails = []
for tag, old, new, count in EDITS:
    k = text.count(old)
    if k != count:
        fails.append((tag, k, count, old[:160]))
        continue
    text = text.replace(old, new)
if fails:
    for f in fails:
        print('FAIL', f)
    sys.exit(1)

open(os.path.join(S, 'V02.new.md'), 'w', encoding='utf-8').write(text)
d = difflib.unified_diff(orig.split('\n'), text.split('\n'), 'V02.orig.md', 'V02.new.md', lineterm='', n=0)
open(os.path.join(S, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(d) + '\n')
title = orig.split('\n', 1)[0]
assert title.startswith('# Volume 2'), title
body = text.split('\n')
while body and not body[-1].strip():
    body.pop()
blk = ['=== FILE docs/volumes/V02-buildings.md ===', '', '=== REPLACE %s ===' % title] + body + ['=== END ===', '']
open(os.path.join(S, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(blk))
print('edits', len(EDITS), 'ok')
print('orig sha', hashlib.sha256(orig.encode()).hexdigest()[:16], 'words', len(orig.split()))
print('new  sha', hashlib.sha256(text.encode()).hexdigest()[:16], 'words', len(text.split()))
