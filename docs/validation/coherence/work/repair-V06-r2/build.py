#!/usr/bin/env python3
"""build.py (coherence/repair-V06-r2) — builds docs/validation/coherence/repair-r2-V06.md's block section from the live
V06 by count-asserted substitutions (edits_a … edits_d, each edit tagged with the issue or ruling it applies), then emits one
REPLACE block per touched subsection (its text from the edited volume) plus one APPEND block for the new V06 §3.22–§3.23.
It never writes a live file. Outputs: out/V06-expected.md (the whole edited volume), out/blocks.md (the block section),
out/diff.txt (a unified line diff). Run: python3 build.py"""
import difflib, hashlib, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
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
        sys.exit(f'STOP {tag}: expected {count} occurrence(s), found {n}: {old[:120]!r}')
    STATE['doc'] = d.replace(old, new)
    STATE['log'].append((tag, count))


def after_line(tag, anchor, added):
    """insert `added` (one or more full lines, no trailing newline) after the one line that contains `anchor`"""
    d = STATE['doc']
    if d.count(anchor) != 1:
        sys.exit(f'STOP {tag}: anchor found {d.count(anchor)} times: {anchor[:120]!r}')
    i = d.index(anchor)
    j = d.index('\n', i)
    STATE['doc'] = d[:j + 1] + added + '\n' + d[j + 1:]
    STATE['log'].append((tag, 1))


import edits_a, edits_b, edits_c, edits_d  # noqa: E402  (each applies its edits through sub / after_line)
for m in (edits_a, edits_b, edits_c, edits_d):
    m.apply(sub, after_line)

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
    '### 1.2 The base hooks consumed (cited, never restated)',
    '### 1.3 Out of scope, with the reason',
    '## 1b Wiring table — every new piece, what feeds it and what it feeds',
    '### 2.1 The engine\'s interfaces (`@plat/evolve`)',
    '### 2.3 The trajectory and the `advance` event',
    '### 2.9 `Use.strain` — the use step\'s memory',
    '### 2.10 The epoch report and the chronicle (non-canonical, rebuilt by replay)',
    '### 2.12 Lifecycle of every new state (create · read · persist · regenerate · undo · migrate)',
    '### 2.14 The history replay\'s records (item 113)',
    '### 3.2 The phase order',
    '### 3.3 Epoch inputs',
    '### 3.5 Decline',
    '### 3.6 Growth — fill first, crowd next, spread last',
    '### 3.7 Fortification — new circuits, old rings, shorter rings',
    '### 3.13 Works on the weekly clock (item 67) — scheduling what the epoch decided',
    '### 3.15 The history record, replay and time scrubbing',
    '### 3.17 Failure handling — never a whole-map retry (§5)',
    '### 3.18 The underground over epochs (item 109 (h), (j) (1)–(5) with (3b), (k) (1)–(6); item 113 (d), (e); J-V6.50–J-V6.53, J-V6.62–J-V6.66)',
    '### 3.19 Item 110 over epochs — raised ways, retaining walls and decks (item 110 (a), (b), (d); J-V6.82–J-V6.95)',
    '### 3.20 The history replay at generation (item 113)',
    '### 3.21 Edges — every mechanism at its limits (principle (11))',
    '### 4.1 Advancing time (`advance`) — T1\'s time card, the clerk and the CLI',
    '### 4.3 Locality, locks and the order of events',
    '### 5.2 Labels, names and words',
    '## 6 Performance budgets',
    '## 7 Tests and acceptance bars',
    '## 8 Build plan',
    '## 9 Decisions (each "chose X over Y because Z"; vetoable)',
    '## 10 Base change requests',
    '## 11 Owner questions',
    '## 12 CONFIRMED versus PLAUSIBLE',
]
NEW_AFTER = '### 3.21 Edges — every mechanism at its limits (principle (11))'
PARENT = '## 3 Generation — the evolution engine'   # the new §3.22–§3.23 append to their parent section (V03 §5.5's precedent)

# the new subsections V06 §3.22 and §3.23 sit after §3.21 in the edited volume; they travel in one APPEND block
lines = doc.split('\n')
hs = headings(lines)
i322 = [x for x in hs if x[2].startswith('### 3.22 ')][0][0]
i4 = [x for x in hs if x[2].startswith('## 4 ')][0][0]
new_sections = '\n'.join(lines[i322:i4]).rstrip('\n')
# the §3.21 REPLACE body is §3.21 alone (it ends at §3.22's heading in the edited volume)

blocks = ['=== FILE docs/volumes/V06-evolution.md ===']
for h in REPLACED:
    if h not in src.split('\n'):
        sys.exit(f'STOP: heading not in the live volume: {h!r}')
    old_sec, new_sec = section(src, h), section(doc, h)
    if old_sec == new_sec:
        sys.exit(f'STOP: REPLACE of an unchanged subsection: {h!r}')
    blocks.append(f'=== REPLACE {h} ===\n{new_sec}\n=== END ===')
    if h == NEW_AFTER:
        blocks.append(f'=== APPEND TO SECTION {PARENT} ===\n{new_sections}\n=== END ===')

open(os.path.join(OUT, 'V06-expected.md'), 'w', encoding='utf-8').write(doc)
open(os.path.join(OUT, 'blocks.md'), 'w', encoding='utf-8').write('\n'.join(blocks) + '\n')
diff = difflib.unified_diff(src.split('\n'), doc.split('\n'), 'live/V06-evolution.md', 'expected/V06-evolution.md', lineterm='', n=0)
open(os.path.join(OUT, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(diff) + '\n')
w0, w1 = len(src.split()), len(doc.split())
print(f'edits {len(STATE["log"])}; blocks {len(blocks) - 1}; words {w0} -> {w1} ({w1 - w0:+d}); '
      f'sha256 live {hashlib.sha256(src.encode()).hexdigest()[:16]} expected {hashlib.sha256(doc.encode()).hexdigest()[:16]}')
