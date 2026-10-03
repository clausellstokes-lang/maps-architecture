#!/usr/bin/env python3
"""build.py (coherence/repair-V12-r2) — builds docs/validation/coherence/repair-r2-V12.md's block section from the live
V12 by count-asserted substitutions (edits_a … edits_e, each edit tagged with the issue or ruling it applies), then emits
one REPLACE block per touched subsection (its text from the edited volume). It never writes a live file. Outputs:
out/V12-expected.md (the whole edited volume), out/blocks.md (the block section), out/diff.txt (a unified line diff).
Run: python3 build.py   (the same shape as work/repair-V06-r2/build.py)"""
import difflib, hashlib, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = '/home/user/maps-architecture'
LIVE = os.path.join(ROOT, 'docs/volumes/V12-calibration.md')
OUT = os.path.join(HERE, 'out')
os.makedirs(OUT, exist_ok=True)
sys.path.insert(0, HERE)

src = open(LIVE, encoding='utf-8').read()
STATE = {'doc': src, 'log': []}


def sub(tag, old, new, count=1):
    d = STATE['doc']
    n = d.count(old)
    if n != count:
        sys.exit(f'STOP {tag}: expected {count} occurrence(s), found {n}: {old[:160]!r}')
    STATE['doc'] = d.replace(old, new)
    STATE['log'].append((tag, count))


def after_line(tag, anchor, added):
    """insert `added` (one or more full lines, no trailing newline) after the one line that contains `anchor`"""
    d = STATE['doc']
    if d.count(anchor) != 1:
        sys.exit(f'STOP {tag}: anchor found {d.count(anchor)} times: {anchor[:160]!r}')
    i = d.index(anchor)
    j = d.index('\n', i)
    STATE['doc'] = d[:j + 1] + added + '\n' + d[j + 1:]
    STATE['log'].append((tag, 1))


import edits_a, edits_b, edits_c, edits_d, edits_e  # noqa: E402
for m in (edits_a, edits_b, edits_c, edits_d, edits_e):
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


# (live heading, heading in the edited volume) — a retitled subsection's REPLACE body opens with its new heading
REPLACED = [
    ('## 0 In plain words', None),
    ('## 1 Scope, the base hooks consumed, and what is out of scope', None),
    ('## 1b Wiring table', None),
    ('### 2.8 Panels and sittings', None),
    ('### 2.10 Provenance evidence (item 381)', None),
    ('### 2.11 Lifecycle and wiring of every record (E-35)', None),
    ('### 2.13 The no-op pins (V12 §3.7.8; E-20)', None),
    ('### 3.4 The metric suite', None),
    ('### 3.7 Tuning runs — table-version bumps with declared shifts', None),
    ('### 3.11 The calibration register — no provisional number dangles', None),
    ('### 3.12 Failure handling — every failure, its rung, its report', None),
    ('### 3.15 The owner rules 111–120 on the harness', '### 3.15 The owner rules 111–126 on the harness'),
    ('### 3.16 Edges and combinations (principle (11))', None),
    ('### 4.4 The clerk\'s view and the cell inspector', None),
    ('### 5.2 Run, register and correlation reports', None),
    ('## 6 Performance budgets', None),
    ('### 7.1 The bars', None),
    ('### 7.2 Parity metrics for this volume\'s own subject', None),
    ('### 8.1 Where it slots into §16', None),
    ('### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)', None),
    ('## 9 Decisions (each vetoable)', None),
    ('### 10.2 Hand-offs from this volume — each closed at its destination', None),
    ('### 10.3 Hand-offs to this volume — closed here', None),
    ('## 12 CONFIRMED versus PLAUSIBLE', None),
]

src_lines = src.split('\n')
blocks = ['=== FILE docs/volumes/V12-calibration.md ===']
for h, h_new in REPLACED:
    if h not in src_lines:
        sys.exit(f'STOP: heading not in the live volume: {h!r}')
    old_sec, new_sec = section(src, h), section(doc, h_new or h)
    if old_sec == new_sec:
        sys.exit(f'STOP: REPLACE of an unchanged subsection: {h!r}')
    blocks.append(f'=== REPLACE {h} ===\n{new_sec}\n=== END ===')

# every change must fall inside a replaced subsection: rebuild the expected volume from the live one by the blocks alone
check = src
for h, h_new in REPLACED:
    old_sec = section(check, h)
    new_sec = section(doc, h_new or h)
    if check.count(old_sec) != 1:
        sys.exit(f'STOP: live subsection not unique: {h!r}')
    check = check.replace(old_sec, new_sec)
if check != doc:
    sys.exit('STOP: an edit falls outside the replaced subsections (blocks alone do not reproduce the edited volume)')

open(os.path.join(OUT, 'V12-expected.md'), 'w', encoding='utf-8').write(doc)
open(os.path.join(OUT, 'blocks.md'), 'w', encoding='utf-8').write('\n'.join(blocks) + '\n')
diff = difflib.unified_diff(src.split('\n'), doc.split('\n'), 'live/V12-calibration.md', 'expected/V12-calibration.md',
                            lineterm='', n=0)
open(os.path.join(OUT, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(diff) + '\n')
w0, w1 = len(src.split()), len(doc.split())
print(f'edits {len(STATE["log"])}; blocks {len(blocks) - 1}; words {w0} -> {w1} ({w1 - w0:+d}); '
      f'sha256 live {hashlib.sha256(src.encode()).hexdigest()[:16]} expected {hashlib.sha256(doc.encode()).hexdigest()[:16]}')
