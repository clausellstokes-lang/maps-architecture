#!/usr/bin/env python3
"""build.py (coherence/repair-V06-r3) — builds docs/validation/coherence/repair-r3-V06.md's block section from the live
V06 by count-asserted substitutions (edits_a … edits_d, each edit tagged with the issue, ruling or END line it applies),
then emits one REPLACE block per touched subsection (its text from the edited volume). It never writes a live file.
Outputs: out/V06-expected.md (the whole edited volume), out/blocks.md (the block section), out/diff.txt (a line diff).
Run: python3 build.py"""
import difflib, hashlib, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
ROOT = '/home/user/maps-architecture'
LIVE = os.path.join(ROOT, 'docs/volumes/V06-evolution.md')
OUT = os.path.join(HERE, 'out')
os.makedirs(OUT, exist_ok=True)

src = open(LIVE, encoding='utf-8').read()
STATE = {'doc': src, 'log': []}


def sub(tag, old, new, count=1):
    d = STATE['doc']
    n = d.count(old)
    if n != count:
        sys.exit(f'STOP {tag}: expected {count} occurrence(s), found {n}: {old[:160]!r}')
    STATE['doc'] = d.replace(old, new)
    STATE['log'].append((tag, count))


import edits_a, edits_b, edits_c, edits_d  # noqa: E402
for m in (edits_a, edits_b, edits_c, edits_d):
    m.apply(sub)

doc = STATE['doc']
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')


def headings(lines):
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out


def section(text, heading):
    lines = text.split('\n')
    hs = headings(lines)
    k = [x for x in hs if x[2] == heading]
    if len(k) != 1:
        sys.exit(f'STOP section: heading {heading!r} found {len(k)} times')
    i, lvl, _ = k[0]
    end = len(lines)
    for j, l2, _ in hs:
        if j > i and l2 <= lvl:
            end = j
            break
    body = lines[i:end]
    while body and body[-1].strip() == '':
        body.pop()
    return '\n'.join(body)


REPLACED = [
    '### 1.1 What this volume builds',
    '## 1b Wiring table — every new piece, what feeds it and what it feeds',
    '## 2 Data model',
    '### 3.3 Epoch inputs',
    '### 3.5 Decline',
    '### 3.7 Fortification — new circuits, old rings, shorter rings',
    '### 3.10 Designation mutations over epochs — the `MutationPlan` (item 18 (c))',
    '### 3.20 The history replay at generation (item 113)',
    '### 3.21 Edges — every mechanism at its limits (principle (11))',
    '### 3.22 Crisis looks and the epoch path — the hand-over (item 122)',
    '### 3.23 The decay level of a building lineage (item 123)',
    '### 4.3 Locality, locks and the order of events',
    '## 6 Performance budgets',
    '## 7 Tests and acceptance bars',
    '## 9 Decisions (each "chose X over Y because Z"; vetoable)',
    '## 12 CONFIRMED versus PLAUSIBLE',
]

# every changed line must lie inside a REPLACEd section
src_lines, doc_lines = src.split('\n'), doc.split('\n')
if [h[2] for h in headings(src_lines)] != [h[2] for h in headings(doc_lines)]:
    sys.exit('STOP: the edits changed the heading sequence')
covered = set()
for h in REPLACED:
    hs = headings(doc_lines)
    k = [x for x in hs if x[2] == h][0]
    end = next((j for j, l2, _ in hs if j > k[0] and l2 <= k[1]), len(doc_lines))
    covered.update(range(k[0], end))
sm = difflib.SequenceMatcher(None, src_lines, doc_lines, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag != 'equal':
        for j in range(j1, max(j2, j1 + 1)):
            if j not in covered:
                sys.exit(f'STOP: a change at expected line {j + 1} lies outside every REPLACEd section')

blocks = ['=== FILE docs/volumes/V06-evolution.md ===']
for h in REPLACED:
    if h not in src_lines:
        sys.exit(f'STOP: heading not in the live volume: {h!r}')
    old_sec, new_sec = section(src, h), section(doc, h)
    if old_sec == new_sec:
        sys.exit(f'STOP: REPLACE of an unchanged subsection: {h!r}')
    blocks.append(f'=== REPLACE {h} ===\n{new_sec}\n=== END ===')

open(os.path.join(OUT, 'V06-expected.md'), 'w', encoding='utf-8').write(doc)
open(os.path.join(OUT, 'blocks.md'), 'w', encoding='utf-8').write('\n'.join(blocks) + '\n')
diff = difflib.unified_diff(src_lines, doc_lines, 'live/V06-evolution.md', 'expected/V06-evolution.md', lineterm='', n=0)
open(os.path.join(OUT, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(diff) + '\n')
w0, w1 = len(src.split()), len(doc.split())
print(f'edits {len(STATE["log"])}; blocks {len(blocks) - 1}; words {w0} -> {w1} ({w1 - w0:+d}); '
      f'sha256 live {hashlib.sha256(src.encode()).hexdigest()[:16]} expected {hashlib.sha256(doc.encode()).hexdigest()[:16]}')
for t, c in STATE['log']:
    print(f'  {t} ×{c}')
