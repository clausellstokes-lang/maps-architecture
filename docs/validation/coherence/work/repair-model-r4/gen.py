#!/usr/bin/env python3
"""repair-model-r4 generator: count-asserted edits over the live §2.6, §2.7 and §2.9, written as REPLACE blocks.

usage: python3 gen.py BASE.md OUT_BLOCKS.txt
Only the touched line ranges are re-wrapped (prose width 120, code-comment width as given, their own indents); every
other line is verbatim. Adapted from repair-model-r3's gen.py (same helpers; `rewrap` takes a width; `splice` writes
composed lines over a located range).
"""
import hashlib, re, sys, textwrap

BASE_SHA = '593c657d34849302d1e4bd2355149b6606b2ed1c10c9ea2ca03746d78c9a7fe3'   # assemble-r3's output, the live base
WIDTH = 120
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

base_path, out_path = sys.argv[1], sys.argv[2]
raw = open(base_path, encoding='utf-8').read()
assert hashlib.sha256(raw.encode('utf-8')).hexdigest() == BASE_SHA, 'base is not assemble-r3 output'
lines = raw.split('\n')


def section(heading):
    """[start, end) line indices of a subsection: heading line to the next heading of the same or higher level."""
    idx = [i for i, l in enumerate(lines) if l == heading]
    assert len(idx) == 1, (heading, idx)
    s = idx[0]
    lvl = len(HEAD.match(heading).group(1))
    infence = False
    for j in range(s + 1, len(lines)):
        if FENCE.match(lines[j]):
            infence = not infence
            continue
        m = HEAD.match(lines[j]) if not infence else None
        if m and len(m.group(1)) <= lvl:
            return s, j
    return s, len(lines)


def find_line(sec, anchor, after=None):
    s, e = sec
    lo = s if after is None else after
    hits = [i for i in range(lo, e) if anchor in lines[i]]
    assert hits, ('anchor not found', anchor)
    if after is None:
        assert len(hits) == 1, ('anchor not unique', anchor, hits)
    return hits[0]


def bad_start(l):
    t = l.lstrip()
    return bool(re.match(r'([-*+>|#]\s|\d+[.)]\s|=== )', t))


def wrap(text, first_indent, cont_indent, width=WIDTH):
    """Wrap one paragraph; never let a continuation line open with a list, quote, table or heading marker."""
    assert '  ' not in text, ('double space', text[:80])
    w = textwrap.TextWrapper(width=width, initial_indent=first_indent, subsequent_indent=cont_indent,
                             break_long_words=False, break_on_hyphens=False)
    out = w.wrap(text)
    for _ in range(50):
        badk = [k for k in range(1, len(out)) if bad_start(out[k][len(cont_indent):])]
        if not badk:
            break
        k = badk[0]
        prev = out[k - 1]
        cut = prev.rstrip().rfind(' ')
        assert cut > len(cont_indent if k - 1 else first_indent), 'cannot fix wrap'
        moved = prev[cut + 1:]
        out[k - 1] = prev[:cut]
        out[k] = cont_indent + moved + ' ' + out[k][len(cont_indent):]
        if len(out[k]) > width + 12:
            out = w.wrap(' '.join(x.strip() for x in out))
    assert not any(bad_start(out[k][len(cont_indent):]) for k in range(1, len(out)))
    return out


def joined(sec, start_anchor, end_anchor, first_indent, cont_indent):
    """(i, j, text): the lines [i..j] (j the first line at/after i holding end_anchor) joined without their indents."""
    i = find_line(sec, start_anchor)
    j = find_line(sec, end_anchor, after=i)
    parts = []
    for k in range(i, j + 1):
        l = lines[k]
        ind = first_indent if k == i else cont_indent
        assert l.startswith(ind), ('indent', k, l[:40])
        parts.append(l[len(ind):].strip())
    return i, j, ' '.join(parts)


def subst(text, subs):
    for old, new, cnt in subs:
        n = text.count(old)
        assert n == cnt, ('count', n, cnt, old[:90])
        text = text.replace(old, new)
    return text


def rewrap(sec, start_anchor, end_anchor, first_indent, cont_indent, subs, width=WIDTH):
    """Join lines [start..end], apply subs (old, new, count), re-wrap with the given indents, write back."""
    i, j, text = joined(sec, start_anchor, end_anchor, first_indent, cont_indent)
    out = wrap(subst(text, subs), first_indent, cont_indent, width)
    lines[i:j + 1] = out
    return len(out) - (j - i + 1)


def splice(i, j, new_lines):
    """Write composed lines over [i..j]."""
    lines[i:j + 1] = new_lines


def inline(sec, anchor, subs):
    """Edit one line in place (a long code-block line), count-asserted."""
    i = find_line(sec, anchor)
    lines[i] = subst(lines[i], subs)


H26 = '### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface'
H27 = ("### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; "
       "the staged layers' records")
H29 = '### 2.9 The document and serialisation'

exec(open(__file__.replace('gen.py', 'edits.py'), encoding='utf-8').read())

blocks = []
for h in (H26, H27, H29):
    s, e = section(h)
    body = lines[s:e]
    while body and body[-1] == '':
        body.pop()
    blocks.append('=== REPLACE %s ===\n%s\n=== END ===\n' % (h, '\n'.join(body)))
open(out_path, 'w', encoding='utf-8').write('\n'.join(blocks))
print('edits applied:', APPLIED)
