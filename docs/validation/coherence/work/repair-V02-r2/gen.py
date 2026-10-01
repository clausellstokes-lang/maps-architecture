#!/usr/bin/env python3
"""repair-r2-V02 generator (coherence/repair-V02-r2): count-asserted substitutions over the live V02 (V02.orig.md =
assemble-r1's install), producing V02.new.md and diff.txt, then the subsection blocks (blocks.txt) whose application to
V02.orig.md must give V02.new.md byte for byte (checked by dryrun.sh with the BLOCK PROTOCOL's apply-blocks.py).
Edits: edits_a (R2-13, R2-16, R2-10, VV12-r1-05), edits_b (G123-V02, G122-V02). Untouched text stays byte-identical."""
import os, re, sys, difflib, hashlib, json
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
ROOT = '/home/user/maps-architecture'
LIVE = os.path.join(ROOT, 'docs/volumes/V02-buildings.md')
orig = open(os.path.join(S, 'V02.orig.md'), encoding='utf-8').read()
assert open(LIVE, encoding='utf-8').read() == orig, 'the live V02 is no longer assemble-r1\'s install'
sha = lambda s: hashlib.sha256(s.encode('utf-8')).hexdigest()

import edits_a, edits_b
text = orig
log = []
for mod in (edits_a, edits_b):
    for tag, old, new, count in mod.build(text):
        k = text.count(old)
        if k != count:
            sys.exit(f'FAIL {tag}: {k} occurrences, {count} expected: {old[:160]!r}')
        text = text.replace(old, new)
        log.append(tag)
open(os.path.join(S, 'V02.new.md'), 'w', encoding='utf-8').write(text)
d = difflib.unified_diff(orig.split('\n'), text.split('\n'), 'V02.orig.md', 'V02.new.md', lineterm='', n=0)
open(os.path.join(S, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(d) + '\n')

FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
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
def section(lines, heading):
    H = heads(lines)
    ks = [k for k, h in enumerate(H) if h[2] == heading]
    assert len(ks) == 1, (heading, len(ks))
    i, lvl, _ = H[ks[0]]
    e = next((h[0] for h in H[ks[0] + 1:] if h[1] <= lvl), len(lines))
    body = lines[i:e]
    while body and not body[-1].strip():
        body.pop()
    return body

O, N = orig.split('\n'), text.split('\n')
# (kind, target heading in the text as it stands, the heading whose new section is the body)
SPEC = [
    ('REPLACE', '## 0 In plain words', None),
    ('REPLACE', '### 1a Scope', None),
    ('REPLACE', '### 1b The wiring table — every new piece, what feeds it and what it feeds', None),
    ('REPLACE', '### 1c The base hooks consumed (by section)', None),
    ('REPLACE', '### 1d Out of scope (and where it lives)', None),
    ('REPLACE', '### 2.2 The composition\'s records (lazy; stored only when edited)', None),
    ('REPLACE', '### 2.3 The composition tables (`composition.json`, `@plat/tables`)', None),
    ('APPEND TO SECTION', '### 2.4 Derived at read (never stored)', 'D24'),
    ('REPLACE', '### 2.5 Identity and lifecycle of every state field', None),
    ('REPLACE', '### 2.6 Stacked tiers and deck buildings — the records (item 110 (c), (d))', None),
    ('REPLACE', '### 3.2 The row a building reads, and its band', None),
    ('REPLACE', '### 3.10 The default rows — the diversity ladder from hovel to giant manor', None),
    ('REPLACE', '### 3.11 Elaboration by click, staleness and the canonical prior', None),
    ('REPLACE', '### 3.18 Edges — every mechanism at its limits (principle (11))', None),
    ('REPLACE', '### 4.5 The canvas, the clerk and the skeleton file', None),
    ('REPLACE', '### 5.1 What each band draws (§8.5\'s bands, with stage 3)', None),
    ('REPLACE', '### 5.3 Style rows and paint programs', None),
    ('REPLACE', '### 5.5 Exports (item 449)', None),
    ('APPEND TO SECTION', '## 5 Rendering, labels, exports', '### 5.7 Ruin and disaster on the exterior (items 123 (d), 122)'),
    ('REPLACE', '## 6 Performance budgets', None),
    ('REPLACE', '### 7.1 Fixtures', None),
    ('APPEND TO SECTION', '## 7 Tests and acceptance bars', '### 7.8 Ruin and disaster on the exterior'),
    ('REPLACE', '### 8.3 Milestones', None),
    ('APPEND TO SECTION', '## 8 Build plan', '### 8.6 Ruin and disaster in the build (items 123, 122)'),
    ('REPLACE', '## 9 Decisions', None),
    ('REPLACE', '## 12 CONFIRMED versus PLAUSIBLE', None),
    ('REPLACE', '## 13 Fix list', None),
]
blocks, inv = [], []
for kind, target, src in SPEC:
    if kind == 'REPLACE':
        body = section(N, target)
        assert section(O, target) != body, ('unchanged', target)
    elif src == 'D24':
        body = edits_b.D24.rstrip('\n').split('\n')
    else:
        body = section(N, src)
    blocks += [f'=== {kind} {target} ==='] + body + ['=== END ===', '']
    inv.append(dict(kind=kind, target=target, lines=len(body), words=len(' '.join(body).split())))
open(os.path.join(S, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(blocks))
wc = lambda s: len(s.split())
res = dict(edits=len(log), tags=log, blocks=len(SPEC), inventory=inv, orig_sha=sha(orig), new_sha=sha(text),
           words_before=wc(orig), words_after=wc(text))
json.dump(res, open(os.path.join(S, 'gen-log.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('edits', len(log), 'blocks', len(SPEC))
print('orig sha', res['orig_sha'][:16], 'words', res['words_before'])
print('new  sha', res['new_sha'][:16], 'words', res['words_after'], f"({(res['words_after'] - res['words_before']) / res['words_before'] * 100:+.2f} %)")
