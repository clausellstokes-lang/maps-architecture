#!/usr/bin/env python3
"""Build repair-r3-V05's blocks from the live V05 with count-asserted substitutions (lane coherence/repair-V05-r3)."""
import hashlib, importlib.util, os, sys

ROOT = '/home/user/maps-architecture'
LIVE = os.path.join(ROOT, 'docs/volumes/V05-sky.md')
HERE = os.path.dirname(os.path.abspath(__file__))

spec = importlib.util.spec_from_file_location('ab', os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py'))
ab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ab)

text = open(LIVE, encoding='utf-8').read()
EXPECT_SHA = '7617d87cff90221648d3152f847bad8a9c3926683066543ab69331edd764bf95'
assert hashlib.sha256(text.encode('utf-8')).hexdigest() == EXPECT_SHA, 'live V05 changed since P1'
lines = text.split('\n')

H12 = '### 1.2 The base hooks this volume consumes (cited, never restated)'
H322 = '### 3.22 Item 110 on, under and against the island (the owner\'s "they go in")'
H12C = '## 12 CONFIRMED versus PLAUSIBLE'

# (heading, old, new, count, issue)
EDITS = [
    (H12,
     '| items 102–120 of `docs/AMENDMENTS-2026-09-28g.md` as the coherence pass applies them to the base | their island parts (V05 §1.1 items 13–18) |',
     '| file g\'s items as the coherence pass applies them to the base | their island parts (V05 §1.1 items 13–18) |',
     1, 'VAL-R2-04 (l. 198)'),
    (H322,
     '   (d) **No raised way reaches an island.** A raised part\'s two ends are ramps or stairs joined to ground vertices (item\n'
     '   110 (b)); a T4 `raised` or aqueduct stroke that ends on an island\'s rim makes no way and is bent into a sky access (V05\n'
     '   §4.2; J-VI.4 (d)), so II.1\'s "sky: no portals, no roads in or out" stands. **No raised part stands on an island:** item\n'
     '   110 (b)\'s decks live in ground parts ≥ 1, and the sky layer has one part per island (V05 §2.1); a T4 `raised` or\n'
     '   aqueduct stroke on an island\'s key is bent (J-VI.4 (e): `raised` dropped, the aqueduct made a fountain pin), with V09\n'
     '   §4.9\'s lines `bend.raised.onIsland` and `bend.aqueduct.onIsland`. **No access is a way** (V05 §2.2).\n',
     '   (d) **No raised way reaches an island.** A raised part\'s two ends are its feet on ground part 0 (§2.7\'s\n'
     '   `RaisedWayRecord.feet`; item 110 (b)); a T4 `raised` or aqueduct stroke that ends on an island\'s rim makes no way and\n'
     '   is bent into a sky access (V05 §4.2; J-VI.4 (d)), so II.1\'s "sky: no portals, no roads in or out" stands.\n'
     '   **No raised part stands on an island:** item 110 (b)\'s decks live in ground parts ≥ 1, and the sky layer has one part\n'
     '   per island (V05 §2.1); a T4 `raised` or aqueduct stroke on an island\'s key is bent (J-VI.4 (e): `raised` dropped, the\n'
     '   aqueduct made a fountain pin), with V09 §4.9\'s lines `bend.raised.onIsland` and `bend.aqueduct.onIsland`.\n'
     '   **No access is a way** (V05 §2.2).\n',
     1, 'VKr2-07 (l. 1687; R3-25 (a))'),
    (H12C,
     'J111 included) and items 102–120 of `docs/AMENDMENTS-2026-09-28g.md`; `docs/volumes/_integrate.md`\'s J-VI rows; the',
     'J111 included) and file g\'s items in `docs/AMENDMENTS-2026-09-28g.md`; `docs/volumes/_integrate.md`\'s J-VI rows; the',
     1, 'VAL-R2-04 (l. 3015)'),
]

ORDER = [H12, H322, H12C]
heads, fence_ok = ab.headings(lines)
assert fence_ok
log, blocks = [], []
for h in ORDER:
    ks = [k for k, x in enumerate(heads) if x[2] == h]
    assert len(ks) == 1, (h, ks)
    s, e = ab.section_range(lines, heads, ks[0])
    body = '\n'.join(ab.strip_blank(lines[s:e]))
    for (hh, old, new, cnt, iss) in EDITS:
        if hh != h:
            continue
        n = body.count(old)
        assert n == cnt, (iss, n)
        body = body.replace(old, new)
        log.append(f'{iss}: {h[:60]} — {n} replaced')
    blocks.append((h, body))

out = []
for h, body in blocks:
    out.append(f'=== REPLACE {h} ===')
    out.append(body)
    out.append('=== END ===')
    out.append('')
open(os.path.join(HERE, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(out))
open(os.path.join(HERE, 'edits.log'), 'w', encoding='utf-8').write('\n'.join(log) + '\n')

# the expected volume, built directly (the dry run must equal it)
new = text
for (hh, old, new_s, cnt, iss) in EDITS:
    assert new.count(old) == cnt, iss
    new = new.replace(old, new_s)
open(os.path.join(HERE, 'V05.expected.md'), 'w', encoding='utf-8').write(new)
print('\n'.join(log))
print('expected sha256', hashlib.sha256(new.encode('utf-8')).hexdigest(), len(new.encode('utf-8')), 'bytes')
# longest new line
for l in new.split('\n'):
    pass
