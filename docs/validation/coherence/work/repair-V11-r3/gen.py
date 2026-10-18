#!/usr/bin/env python3
"""gen.py — lane coherence/repair-V11-r3: builds docs/validation/coherence/repair-r3-V11.md.

Mechanical: every edit is an exact substring of one live subsection of docs/volumes/V11-content.md, asserted to occur
exactly once in that subsection; the block for a subsection is its complete new text (REPLACE <exact heading line>),
every other line verbatim. Run from the repository root:
    python3 docs/validation/coherence/work/repair-V11-r3/gen.py [--out PATH]
"""
import re, sys, os, json, hashlib

DOC = 'docs/volumes/V11-content.md'
OUT = 'docs/validation/coherence/repair-r3-V11.md'
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
HERE = os.path.dirname(os.path.abspath(__file__))

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


H1B = '### 1b '
H21 = '### 2.1 '
H23 = '### 2.3 '
H28 = '### 2.8 '
H28D = '### 2.8d '
H31 = '### 3.1 '
H324 = '### 3.24 '
H325 = '### 3.25 '
H326 = '### 3.26 '
H4 = '## 4 '
H7 = '## 7 '
H8 = '## 8 '
H9 = '## 9 '
H12 = '## 12 '

exec(open(os.path.join(HERE, 'edits.py'), encoding='utf-8').read())


def main():
    out = OUT
    if '--out' in sys.argv:
        out = sys.argv[sys.argv.index('--out') + 1]
    order, by = [], {}
    for head, old, new, ids in EDITS:
        if head not in by:
            hl, i, body = section(head)
            by[head] = dict(hl=hl, i=i, body=body, ids=[], words0=len(body.split()))
            order.append(head)
        s = by[head]
        n = s['body'].count(old)
        assert n == 1, (head, ids, n, old[:160])
        s['body'] = s['body'].replace(old, new)
        s['ids'] += [x for x in ids if x not in s['ids']]
    order.sort(key=lambda h: by[h]['i'])
    parts, log = [], []
    for h in order:
        s = by[h]
        parts.append(f"=== REPLACE {s['hl']} ===\n{s['body']}\n=== END ===\n")
        log.append(dict(heading=s['hl'], ids=s['ids'], words_before=s['words0'], words_after=len(s['body'].split())))
    hdr = os.path.join(HERE, 'header.md')
    head = open(hdr, encoding='utf-8').read().rstrip('\n') + '\n\n' if os.path.exists(hdr) else ''
    open(out, 'w', encoding='utf-8').write(head + '=== FILE docs/volumes/V11-content.md ===\n\n' + '\n'.join(parts))
    json.dump(dict(doc=DOC, doc_sha256=hashlib.sha256(text.encode('utf-8')).hexdigest(), blocks=log, edits=len(EDITS)),
              open(os.path.join(HERE, 'gen-log.json'), 'w'), indent=1, ensure_ascii=False)
    print(f'{len(order)} blocks, {len(EDITS)} edits -> {out}')


if __name__ == '__main__':
    main()
