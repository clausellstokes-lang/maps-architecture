#!/usr/bin/env python3
"""gen.py — lane coherence/repair-pipeline-r3: builds docs/validation/coherence/repair-r3-pipeline.md.

Mechanical: every edit is an exact substring of one live subsection of docs/ARCHITECTURE.md, asserted to occur exactly
once in that subsection; the block for a subsection is its complete new text (REPLACE <exact heading line>). Run from the
repository root:  python3 docs/validation/coherence/work/repair-pipeline-r3/gen.py [--out PATH]
"""
import re, sys, os, json, hashlib

DOC = 'docs/ARCHITECTURE.md'
OUT = 'docs/validation/coherence/repair-r3-pipeline.md'
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


H41 = '### 4.1 '
H42 = '### 4.2 '
H43 = '### 4.3 '
H44 = '### 4.4 '
H45 = '### 4.5 '
H46 = '### 4.6 '
H47 = '### 4.7 '
H48 = '### 4.8 '
H49 = '### 4.9 '
H411 = '### 4.11 '
H412 = '### 4.12 '
H413 = '### 4.13 '
H102 = '### 10.2 '
H103 = '### 10.3 '
H104 = '### 10.4 '
HII1 = '## II.1 '
HII2 = '## II.2 '
HII4 = '## II.4 '
HII5 = '## II.5 '
HII6 = '## II.6 '
HII71 = '### II.7.1 '
HII72 = '### II.7.2 '
HII73 = '### II.7.3 '
HII74 = '### II.7.4 '
HII75 = '### II.7.5 '
HII76 = '### II.7.6 '
HIII = '# PART III '

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
