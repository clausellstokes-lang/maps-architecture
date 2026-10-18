#!/usr/bin/env python3
"""build.py (coherence/repair-V02-r3) — builds docs/validation/coherence/repair-r3-V02.md's block section from the live
V02 by count-asserted substitutions (edits.py, each edit tagged with the issue or END line it applies), then emits one
REPLACE block per touched subsection (its text from the edited volume). It never writes a live file. Outputs (out/):
V02-expected.md (the whole edited volume), blocks.md (the block section), diff.txt (a unified line diff), log.txt.
Run: python3 build.py   (the shape of work/repair-V12-r3/build.py)"""
import difflib, hashlib, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = '/home/user/maps-architecture'
LIVE = os.path.join(ROOT, 'docs/volumes/V02-buildings.md')
OUT = os.path.join(HERE, 'out')
os.makedirs(OUT, exist_ok=True)
sys.path.insert(0, HERE)

src = open(LIVE, encoding='utf-8').read()
STATE = {'doc': src, 'log': []}
WIDTH = 120


def sub(tag, old, new, count=1):
    d = STATE['doc']
    n = d.count(old)
    if n != count:
        sys.exit(f'STOP {tag}: expected {count} occurrence(s), found {n}: {old[:160]!r}')
    STATE['doc'] = d.replace(old, new)
    STATE['log'].append((tag, count))


def after_line(tag, anchor, added):
    d = STATE['doc']
    if d.count(anchor) != 1:
        sys.exit(f'STOP {tag}: anchor found {d.count(anchor)} times: {anchor[:160]!r}')
    i = d.index(anchor)
    j = d.index('\n', i)
    STATE['doc'] = d[:j + 1] + added + '\n' + d[j + 1:]
    STATE['log'].append((tag, 1))


def tokens(text):
    """words, a backticked span kept whole (so no line breaks inside inline code)"""
    out, cur, tick = [], '', False
    for ch in text:
        if ch == '`':
            tick = not tick
        if ch == ' ' and not tick:
            if cur:
                out.append(cur)
            cur = ''
        else:
            cur += ch
    if cur:
        out.append(cur)
    # a number and its unit stay on one line ("4 B", "1.5 m", "20 KB")
    units = {'B', 'KB', 'MB', 'µs', 'ms', 's', 'm', 'px', 'pw', '%', 'cm'}
    merged = []
    for w in out:
        bare = w.rstrip(',;:.)')
        if merged and bare in units and re.fullmatch(r'[≤≈(]?[0-9][0-9.,]*', merged[-1]):
            merged[-1] += ' ' + w
        else:
            merged.append(w)
    return merged


def wrap(text, first='', rest='', width=WIDTH):
    lines, line = [], first
    base = len(first)
    for w in tokens(' '.join(text.split())):
        if len(line) > base and len(line) + 1 + len(w) > width:
            lines.append(line)
            line = rest + w
            base = len(rest)
        else:
            line = line + (' ' if len(line) > base else '') + w
    lines.append(line)
    return '\n'.join(lines)


def span(tag, start, end):
    """the exact live text from the line starting with `start` to the end of the line containing `end`"""
    d = STATE['doc']
    if d.count(start) != 1:
        sys.exit(f'STOP {tag}: start found {d.count(start)} times: {start[:120]!r}')
    i = d.index(start)
    if i and d[i - 1] != '\n':
        sys.exit(f'STOP {tag}: start not at a line start: {start[:120]!r}')
    j = d.find(end, i)
    if j < 0:
        sys.exit(f'STOP {tag}: end not found after start: {end[:120]!r}')
    k = d.find('\n', j + len(end) - 1)
    k = len(d) if k < 0 else k
    return d[i:k]


def rewrap(tag, start, end, new_text, first='', rest=''):
    old = span(tag, start, end)
    sub(tag, old, wrap(new_text, first, rest))


import edits  # noqa: E402
edits.apply(sub, after_line, rewrap, wrap)

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


REPLACED = edits.REPLACED

src_lines = src.split('\n')
blocks = ['=== FILE docs/volumes/V02-buildings.md ===', '']
for h in REPLACED:
    if h not in src_lines:
        sys.exit(f'STOP: heading not in the live volume: {h!r}')
    old_sec, new_sec = section(src, h), section(doc, h)
    if old_sec == new_sec:
        sys.exit(f'STOP: REPLACE of an unchanged subsection: {h!r}')
    blocks.append(f'=== REPLACE {h} ===\n{new_sec}\n=== END ===\n')

# every change must fall inside a replaced subsection: rebuild the expected volume from the live one by the blocks alone
check = src
for h in REPLACED:
    old_sec = section(check, h)
    new_sec = section(doc, h)
    if check.count(old_sec) != 1:
        sys.exit(f'STOP: live subsection not unique: {h!r}')
    check = check.replace(old_sec, new_sec)
if check != doc:
    sys.exit('STOP: an edit falls outside the replaced subsections (blocks alone do not reproduce the edited volume)')

open(os.path.join(OUT, 'V02-expected.md'), 'w', encoding='utf-8').write(doc)
open(os.path.join(OUT, 'blocks.md'), 'w', encoding='utf-8').write('\n'.join(blocks))
diff = difflib.unified_diff(src.split('\n'), doc.split('\n'), 'live/V02-buildings.md', 'expected/V02-buildings.md',
                            lineterm='', n=0)
open(os.path.join(OUT, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(diff) + '\n')
w0, w1 = len(src.split()), len(doc.split())
log = '\n'.join(f'{t}  x{c}' for t, c in STATE['log'])
open(os.path.join(OUT, 'log.txt'), 'w', encoding='utf-8').write(log + '\n')
print(f'edits {len(STATE["log"])}; blocks {len(blocks) - 2}; words {w0} -> {w1} ({w1 - w0:+d}); '
      f'sha256 live {hashlib.sha256(src.encode()).hexdigest()[:16]} expected {hashlib.sha256(doc.encode()).hexdigest()[:16]}')
