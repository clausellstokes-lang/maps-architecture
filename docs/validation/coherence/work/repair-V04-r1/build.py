#!/usr/bin/env python3
"""Build the V04 repair (coherence/repair-V04-r1): count-asserted substitutions over the live V04, then one REPLACE block
of the volume's level-1 title heading (the head paragraph has no heading of its own, so only that block reaches it).
Writes V04.new.md (the full new text), blocks.md (the block body, FILE line first) and diff.txt here.
Run: python3 build.py   (from this folder). Every untouched line is verbatim."""
import os, sys, difflib, hashlib, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = '/home/user/maps-architecture/docs/volumes/V04-underground.md'
MODS = ['edits_a', 'edits_b', 'edits_c', 'edits_d']


def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + '.py'))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.EDITS


orig = open(SRC, encoding='utf-8').read()
text = orig
bad, n = 0, 0
log = []
for mod in MODS:
    if not os.path.exists(os.path.join(HERE, mod + '.py')):
        continue
    for ids, old, new, count in load(mod):
        k = text.count(old)
        if k != count:
            print(f'FAIL {mod} {ids}: found {k}, want {count}: {old[:100]!r}')
            bad += 1
            continue
        text = text.replace(old, new)
        n += 1
        log.append(f'{mod}\t{ids}\t{count}\t{old[:70]!r}')
if bad:
    print(bad, 'edits failed')
    sys.exit(1)
open(os.path.join(HERE, 'V04.new.md'), 'w', encoding='utf-8').write(text)
open(os.path.join(HERE, 'edits.log'), 'w', encoding='utf-8').write('\n'.join(log) + '\n')
title = text.split('\n', 1)[0]
assert title == orig.split('\n', 1)[0] and title.startswith('# ')
body = text.rstrip('\n')
blocks = '=== FILE docs/volumes/V04-underground.md ===\n\n=== REPLACE ' + title + ' ===\n' + body + '\n=== END ===\n'
open(os.path.join(HERE, 'blocks.md'), 'w', encoding='utf-8').write(blocks)
d = difflib.unified_diff(orig.split('\n'), text.split('\n'), 'live', 'new', lineterm='', n=0)
open(os.path.join(HERE, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(d) + '\n')
print(n, 'edits applied;', 'src', hashlib.sha256(orig.encode()).hexdigest()[:16], 'new',
      hashlib.sha256(text.encode()).hexdigest()[:16], 'words', len(orig.split()), '->', len(text.split()))
