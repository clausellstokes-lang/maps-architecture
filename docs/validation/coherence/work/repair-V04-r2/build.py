#!/usr/bin/env python3
"""Build the V04 repair (coherence/repair-V04-r2): count-asserted substitutions over the live V04 (V04.orig.md, the
assemble-r1 text, sha256 47c14477…), then one REPLACE block per changed leaf subsection (a heading with no heading below
it before the next of its level) and one APPEND TO SECTION block per new heading (its parent's section). Writes
V04.new.md (the full new text), blocks.md (FILE line first), diff.txt and edits.log here. Every untouched line is
verbatim. Run: python3 build.py"""
import os, sys, re, difflib, hashlib, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'V04.orig.md')
LIVE = '/home/user/maps-architecture/docs/volumes/V04-underground.md'
MODS = ['edits_a', 'edits_b', 'edits_c', 'edits_d']
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')


def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + '.py'))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.EDITS


def heads(lines):
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out


def ranges(lines):
    """{heading line: (start, end_section, end_own)} — section to the next heading of the same or higher level;
    own text to the next heading of any level."""
    hs = heads(lines)
    r = {}
    for k, (i, lvl, l) in enumerate(hs):
        end = next((h[0] for h in hs[k + 1:] if h[1] <= lvl), len(lines))
        own = hs[k + 1][0] if k + 1 < len(hs) else len(lines)
        assert l not in r, ('duplicate heading', l)
        r[l] = (i, end, own, lvl)
    return r


orig = open(SRC, encoding='utf-8').read()
live = open(LIVE, encoding='utf-8').read()
assert orig == live, 'the live V04 moved since the snapshot'
text = orig
bad, n, log = 0, 0, []
for mod in MODS:
    if not os.path.exists(os.path.join(HERE, mod + '.py')):
        continue
    for ids, old, new, count in load(mod):
        k = text.count(old)
        if k != count:
            print(f'FAIL {mod} {ids}: found {k}, want {count}: {old[:110]!r}')
            bad += 1
            continue
        text = text.replace(old, new)
        n += 1
        log.append(f'{mod}\t{ids}\t{count}\t{old[:80]!r}')
if bad:
    print(bad, 'edits failed')
    sys.exit(1)
open(os.path.join(HERE, 'V04.new.md'), 'w', encoding='utf-8').write(text)
open(os.path.join(HERE, 'edits.log'), 'w', encoding='utf-8').write('\n'.join(log) + '\n')

ol, nl = orig.split('\n'), text.split('\n')
ro, rn = ranges(ol), ranges(nl)
blocks, replaced, appended = [], [], []
for h, (i, end, own, lvl) in rn.items():
    if h in ro:
        oi, oend, oown, _ = ro[h]
        if nl[i:own] == ol[oi:oown]:
            continue
        # a changed own text: the heading must be a leaf (no heading below it inside its section)
        assert own == end, ('changed text in a heading with sub-headings', h)
        assert oown == oend, ('changed text in a heading whose live section has sub-headings', h)
        body = '\n'.join(nl[i:end]).rstrip('\n')
        blocks.append(f'=== REPLACE {h} ===\n{body}\n=== END ===\n')
        replaced.append(h)
    else:
        # a new heading: appended to its parent's section (the nearest earlier heading of a higher level)
        parent = None
        for h2, (i2, end2, own2, lvl2) in rn.items():
            if i2 < i and lvl2 < lvl and end2 >= end:
                parent = h2
        assert parent in ro, ('new heading without a live parent', h)
        body = '\n'.join(nl[i:end]).rstrip('\n')
        blocks.append(f'=== APPEND TO SECTION {parent} ===\n{body}\n=== END ===\n')
        appended.append((parent, h))
for h in ro:
    assert h in rn, ('a live heading vanished', h)
open(os.path.join(HERE, 'blocks.md'), 'w', encoding='utf-8').write(
    '=== FILE docs/volumes/V04-underground.md ===\n\n' + '\n'.join(blocks))
d = difflib.unified_diff(ol, nl, 'live', 'new', lineterm='', n=0)
open(os.path.join(HERE, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(d) + '\n')
print(n, 'edits applied;', len(replaced), 'REPLACE,', len(appended), 'APPEND;', 'src',
      hashlib.sha256(orig.encode()).hexdigest()[:16], 'new', hashlib.sha256(text.encode()).hexdigest()[:16],
      'words', len(orig.split()), '->', len(text.split()))
for h in replaced:
    print('  REPLACE', h[:100])
for p, h in appended:
    print('  APPEND ', p[:60], '<-', h[:70])
