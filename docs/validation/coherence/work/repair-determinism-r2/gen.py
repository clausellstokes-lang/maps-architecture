#!/usr/bin/env python3
"""gen.py — lane coherence/repair-determinism-r2: builds docs/validation/coherence/repair-r2-determinism.md.

Mechanical: every edit is an exact substring of one live subsection of docs/ARCHITECTURE.md, asserted to occur exactly
once in that subsection; the block for a subsection is its complete new text (REPLACE <exact heading line>). Run from the
repository root:  python3 docs/validation/coherence/work/repair-determinism-r2/gen.py [--out PATH]
"""
import re, sys, os, json, hashlib

DOC = 'docs/ARCHITECTURE.md'
OUT = 'docs/validation/coherence/repair-r2-determinism.md'
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

text = open(DOC, encoding='utf-8').read()
lines = text.split('\n')


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


def section(head_prefix):
    ks = [k for k, h in enumerate(HEADS) if h[2].startswith(head_prefix)]
    assert len(ks) == 1, (head_prefix, ks)
    k = ks[0]
    i, lvl, hl = HEADS[k]
    j = next((h[0] for h in HEADS[k + 1:] if h[1] <= lvl), len(lines))
    body = lines[i:j]
    while body and not body[-1].strip():
        body.pop()
    return hl, i, '\n'.join(body)


EDITS = []   # (head_prefix, old, new, ids)


def E(head, old, new, *ids):
    EDITS.append((head, old, new, ids))


H52 = '### 5.2 '
H53 = '### 5.3 '
H54 = '### 5.4 '
H61 = '### 6.1 '
H62 = '### 6.2 '
H63 = '### 6.3 '
H65 = '### 6.5 '
H71 = '### 7.1 '
H74 = '### 7.4 '
H77 = '### 7.7 '

exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'edits.py'), encoding='utf-8').read())


def main():
    out = OUT
    if '--out' in sys.argv:
        out = sys.argv[sys.argv.index('--out') + 1]
    order = []
    by = {}
    for head, old, new, ids in EDITS:
        if head not in by:
            hl, i, body = section(head)
            by[head] = dict(hl=hl, i=i, body=body, ids=[])
            order.append(head)
        s = by[head]
        n = s['body'].count(old)
        assert n == 1, (head, ids, n, old[:160])
        s['body'] = s['body'].replace(old, new)
        s['ids'] += [x for x in ids if x not in s['ids']]
    order.sort(key=lambda h: by[h]['i'])
    parts = []
    log = []
    for h in order:
        s = by[h]
        parts.append(f"=== REPLACE {s['hl']} ===\n{s['body']}\n=== END ===\n")
        log.append(dict(heading=s['hl'], ids=s['ids']))
    hdr = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'header.md')
    head = open(hdr, encoding='utf-8').read().rstrip('\n') + '\n\n' if os.path.exists(hdr) else ''
    open(out, 'w', encoding='utf-8').write(head + '\n'.join(parts))
    json.dump(dict(doc_sha256=hashlib.sha256(text.encode('utf-8')).hexdigest(), blocks=log, edits=len(EDITS)),
              open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gen-log.json'), 'w'), indent=1, ensure_ascii=False)
    print(f'{len(order)} blocks, {len(EDITS)} edits -> {out}')


if __name__ == '__main__':
    main()
