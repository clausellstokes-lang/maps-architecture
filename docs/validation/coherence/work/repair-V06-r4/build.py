#!/usr/bin/env python3
"""Build repair-r4-V06 blocks: every REPLACE body is the live subsection with count-asserted substitutions."""
import hashlib, os, re, sys, json
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from edits_a import EDITS_A
from edits_b import EDITS_B
from edits_c import EDITS_C

ROOT = '/home/user/maps-architecture'
SRC = os.path.join(ROOT, 'docs/volumes/V06-evolution.md')
text = open(SRC, encoding='utf-8').read()
lines = text.split('\n')
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

def heads(lines):
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            if fence is None: fence = m.group(1)
            elif m.group(1) == fence: fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out

H = heads(lines)
def section(heading):
    idx = [k for k, (i, lv, l) in enumerate(H) if l == heading]
    assert len(idx) == 1, (heading, len(idx))
    k = idx[0]; i, lv, _ = H[k]
    end = len(lines)
    for j in range(k + 1, len(H)):
        if H[j][1] <= lv:
            end = H[j][0]; break
    return i, end

EDITS = EDITS_A + EDITS_B + EDITS_C
order = []
for h, *_ in EDITS:
    if h not in order: order.append(h)
# keep document order
order.sort(key=lambda h: section(h)[0])
log = []
blocks = []
for h in order:
    i, end = section(h)
    body = '\n'.join(lines[i:end]).rstrip('\n')
    before = body
    for (hh, tag, old, new, cnt) in EDITS:
        if hh != h: continue
        c = body.count(old)
        assert c == cnt, (tag, h, c, cnt)
        body = body.replace(old, new)
        log.append({'section': h, 'tag': tag, 'count': c})
    assert body != before, h
    blocks.append((h, body))

out = ['=== FILE docs/volumes/V06-evolution.md ===']
for h, body in blocks:
    out.append('=== REPLACE %s ===' % h)
    out.append(body)
    out.append('=== END ===')
blocktext = '\n'.join(out) + '\n'
open(os.path.join(HERE, 'blocks.md'), 'w', encoding='utf-8').write(blocktext)
json.dump(log, open(os.path.join(HERE, 'build-log.json'), 'w'), indent=1, ensure_ascii=False)

# expected volume (for checks)
newlines = list(lines)
for h, body in sorted(blocks, key=lambda b: section(b[0])[0], reverse=True):
    i, end = section(h)
    # keep the replaced range's trailing blank lines
    seg = lines[i:end]
    trail = 0
    while trail < len(seg) and seg[len(seg) - 1 - trail] == '':
        trail += 1
    newlines[i:end] = body.split('\n') + [''] * trail
exp = '\n'.join(newlines)
open(os.path.join(HERE, 'V06-expected.md'), 'w', encoding='utf-8').write(exp)
print('edits', len(log), 'blocks', len(blocks))
print('src sha', hashlib.sha256(text.encode()).hexdigest()[:16], len(text.encode()), 'bytes', len(lines), 'lines')
print('exp sha', hashlib.sha256(exp.encode()).hexdigest()[:16], len(exp.encode()), 'bytes', len(newlines), 'lines')
def words(s): return len(re.findall(r'\S+', s))
print('words', words(text), '->', words(exp), '(%+d)' % (words(exp) - words(text)))
