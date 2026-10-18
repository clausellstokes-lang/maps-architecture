#!/usr/bin/env python3
"""gen.py — lane coherence/repair-scope-r5: builds docs/validation/coherence/repair-r5-scope.md.

Mechanical: every edit is an exact substring of one live subsection (base docs/ARCHITECTURE.md, or docs/volumes/INDEX.md),
asserted to occur exactly once in that subsection; the block for a subsection is its complete new text
(REPLACE <exact heading line>), every untouched line verbatim. The J-ROWS and RATIONALE-A blocks restate J-A120.01's index
row and Part A entry, each built from the live row by an asserted substitution (swap_restated.py puts them in place).
Run from the repository root:  python3 docs/validation/coherence/work/repair-scope-r5/gen.py [--out PATH]
"""
import re, sys, os, json, hashlib

W = os.path.dirname(os.path.abspath(__file__))
DOC = 'docs/ARCHITECTURE.md'
RAT = 'docs/ARCHITECTURE-RATIONALE.md'
IDX = 'docs/volumes/INDEX.md'
OUT = 'docs/validation/coherence/repair-r5-scope.md'
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

TEXT = {p: open(p, encoding='utf-8').read() for p in (DOC, RAT, IDX)}


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


def section(path, head_prefix):
    lines = TEXT[path].split('\n')
    heads = headings(lines)
    ks = [k for k, h in enumerate(heads) if h[2].startswith(head_prefix)]
    assert len(ks) == 1, (path, head_prefix, ks)
    k = ks[0]
    i, lvl, hl = heads[k]
    j = next((h[0] for h in heads[k + 1:] if h[1] <= lvl), len(lines))
    body = lines[i:j]
    while body and not body[-1].strip():
        body.pop()
    return hl, i, '\n'.join(body)


EDITS = []   # (path, head_prefix, old, new, ids)
ROWS = []    # (kind 'J-ROWS'|'RATIONALE-A', path, row id, old, new, ids)


def E(path, head, old, new, *ids):
    EDITS.append((path, head, old, new, ids))


def ROW(kind, path, rid, old, new, *ids):
    ROWS.append((kind, path, rid, old, new, ids))


H02 = '### 0.2 '
H11 = '### 1.1 '
H131 = '### 13.1 '
H132 = '### 13.2 '
H134 = '### 13.4 '
H138 = '### 13.8 '
H14 = '## §14 '
H16 = '## §16 '
HAPA = '# Appendix A '
HIDX1 = '## 1 The product map'

exec(open(os.path.join(W, 'edits.py'), encoding='utf-8').read())


def main():
    out = OUT
    if '--out' in sys.argv:
        out = sys.argv[sys.argv.index('--out') + 1]
    by, order = {}, []
    for path, head, old, new, ids in EDITS:
        key = (path, head)
        if key not in by:
            hl, i, body = section(path, head)
            by[key] = dict(hl=hl, i=i, body=body, ids=[], n=0)
            order.append(key)
        s = by[key]
        n = s['body'].count(old)
        assert n == 1, (path, head, ids, n, old[:200])
        s['body'] = s['body'].replace(old, new)
        s['ids'] += [x for x in ids if x not in s['ids']]
        s['n'] += 1
    order.sort(key=lambda k: ({DOC: 0, IDX: 1}[k[0]], by[k]['i']))
    parts, log = [], []
    for key in order:
        if key[0] != DOC:
            continue
        s = by[key]
        parts.append(f"=== REPLACE {s['hl']} ===\n{s['body']}\n=== END ===\n")
        log.append(dict(file=key[0], heading=s['hl'], edits=s['n'], ids=s['ids']))
    # restated rows: J-ROWS (the judgment index) and RATIONALE-A (Part A)
    for kind in ('J-ROWS', 'RATIONALE-A'):
        rows = [r for r in ROWS if r[0] == kind]
        if not rows:
            continue
        body = []
        for _, path, rid, old, new, ids in rows:
            live = [l for l in TEXT[path].split('\n') if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', l)]
            assert len(live) == 1, (kind, rid, len(live))
            assert live[0].count(old) == 1, (kind, rid, old[:200])
            body.append(live[0].replace(old, new))
            log.append(dict(file=path, block=kind, row=rid, ids=list(ids)))
        parts.append(f"=== {kind} ===\n" + '\n'.join(body) + "\n=== END ===\n")
    idx = [k for k in order if k[0] == IDX]
    if idx:
        parts.append(f"=== FILE {IDX} ===\n")
        for key in idx:
            s = by[key]
            parts.append(f"=== REPLACE {s['hl']} ===\n{s['body']}\n=== END ===\n")
            log.append(dict(file=key[0], heading=s['hl'], edits=s['n'], ids=s['ids']))
    hdr = os.path.join(W, 'header.md')
    head = open(hdr, encoding='utf-8').read().rstrip('\n') + '\n\n' if os.path.exists(hdr) else ''
    open(out, 'w', encoding='utf-8').write(head + '\n'.join(parts))
    json.dump(dict(sha256={p: hashlib.sha256(t.encode('utf-8')).hexdigest() for p, t in TEXT.items()}, blocks=log,
                   edits=len(EDITS), rows=len(ROWS)),
              open(os.path.join(W, 'gen-log.json'), 'w'), indent=1, ensure_ascii=False)
    print(f'{len(parts)} block groups, {len(EDITS)} edits, {len(ROWS)} rows -> {out}')


if __name__ == '__main__':
    main()
