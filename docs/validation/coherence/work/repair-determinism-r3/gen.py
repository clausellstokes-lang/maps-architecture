#!/usr/bin/env python3
"""gen.py — lane coherence/repair-determinism-r3: builds docs/validation/coherence/repair-r3-determinism.md.

Mechanical: each edit names one live subsection of docs/ARCHITECTURE.md (assemble-r2's output), a span of its lines
(the first line holding marker A through the first later line holding marker B; each marker asserted unique in the
subsection), and exact substitutions on that span's text, each asserted to occur exactly the stated number of times.
A prose span is joined and re-wrapped at 120 columns with its own indents (only the touched paragraph's line breaks
move); a code or table span (wrap=False) is substituted in place. Every untouched line stays verbatim. The block for
a subsection is its complete new text (REPLACE <exact heading line>). The header (header.md) is prepended.
Run from the repository root:  python3 docs/validation/coherence/work/repair-determinism-r3/gen.py [--out PATH]
"""
import json, os, re, sys, textwrap

ROOT = '/home/user/maps-architecture'
DOC = os.path.join(ROOT, 'docs/ARCHITECTURE.md')
OUT = os.path.join(ROOT, 'docs/validation/coherence/repair-r3-determinism.md')
W = os.path.join(ROOT, 'docs/validation/coherence/work/repair-determinism-r3')
if '--out' in sys.argv:
    OUT = sys.argv[sys.argv.index('--out') + 1]
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
lines = open(DOC, encoding='utf-8').read().split('\n')


def headings(ls):
    out, fence = [], None
    for i, l in enumerate(ls):
        m = FENCE.match(l)
        if m:
            if fence is None:
                fence = m.group(1)
            elif m.group(1) == fence:
                fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out


HEADS = headings(lines)


def section(prefix):
    ks = [k for k, h in enumerate(HEADS) if h[2].startswith(prefix)]
    assert len(ks) == 1, (prefix, ks)
    i, lvl, hl = HEADS[ks[0]]
    j = next((h[0] for h in HEADS[ks[0] + 1:] if h[1] <= lvl), len(lines))
    body = lines[i:j]
    while body and not body[-1].strip():
        body.pop()
    return hl, body


def wrap(text, first, rest, width=120):
    return textwrap.wrap(text, width=width, initial_indent=first, subsequent_indent=rest,
                         break_long_words=False, break_on_hyphens=False)


LOG = []


def edit(body, a, b, subs, wrap_it, ids, first=None, rest=None):
    ia = [k for k, l in enumerate(body) if a in l]
    assert len(ia) == 1, ('marker A not unique', a, ia)
    s = ia[0]
    ib = [k for k in range(s, len(body)) if b in body[k]]
    assert ib, ('marker B not found after A', b)
    e = ib[0]
    span = body[s:e + 1]
    if wrap_it:
        lead = re.match(r'^(\s*(?:[*-] |\d+\. )?)', span[0]).group(1)
        f = first if first is not None else lead
        r = rest if rest is not None else ' ' * len(lead)
        text = ' '.join([span[0][len(lead):].strip()] + [l.strip() for l in span[1:]])
    else:
        text = '\n'.join(span)
    for old, new, n in subs:
        c = text.count(old)
        assert c == n, ('substitution count', ids, old[:80], c, n)
        text = text.replace(old, new)
    new_span = wrap(text, f, r) if wrap_it else text.split('\n')
    LOG.append({'ids': ids, 'lines_before': len(span), 'lines_after': len(new_span),
                'subs': len(subs)})
    return body[:s] + new_span + body[e + 1:]


from edits import EDITS   # noqa: E402  (list of (heading prefix, marker A, marker B, subs, wrap, ids))

order = []
bodies = {}
for head, a, b, subs, wrap_it, ids, *ind in EDITS:
    if head not in bodies:
        hl, body = section(head)
        bodies[head] = [hl, body, body[:]]
        order.append(head)
    first, rest = (ind[0] if ind else (None, None))
    bodies[head][2] = edit(bodies[head][2], a, b, subs, wrap_it, ids, first, rest)

out = [open(os.path.join(W, 'header.md'), encoding='utf-8').read().rstrip('\n'), '']
for head in order:
    hl, before, after = bodies[head]
    assert after[0] == hl
    out += [f'=== REPLACE {hl} ===', *after, '=== END ===', '']
open(OUT, 'w', encoding='utf-8').write('\n'.join(out))
json.dump({'blocks': [b[0] for b in bodies.values()], 'edits': LOG,
           'words': {h: [len(' '.join(v[1]).split()), len(' '.join(v[2]).split())] for h, v in bodies.items()}},
          open(os.path.join(W, 'gen-log.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('blocks', len(order), 'edits', len(LOG))
for h, v in bodies.items():
    print(f'  {v[0][:60]:<60} lines {len(v[1])}->{len(v[2])} words {len(" ".join(v[1]).split())}->{len(" ".join(v[2]).split())}')
