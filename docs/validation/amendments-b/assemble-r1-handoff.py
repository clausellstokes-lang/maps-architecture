#!/usr/bin/env python3
"""assemble-r1-handoff.py — the scripted assembler hand-off of amendments-b repair round 1 (lane amendments-b/assemble-r1,
2026-09-27). Stdlib only; never writes in place. Run it on the outputs of apply-blocks.py.

usage:
  python3 assemble-r1-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md \
      --log LOG.json BLOCKFILE [BLOCKFILE ...]

What it does, in this order (each step asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (hand-off (1) of the determinism, kernel, pipeline, rendering and scope repair files). The protocol only
    appends rows, so a restated row carries an id the table already holds. For every id that occurs exactly twice in the
    document's judgment index ("| id | the choice | where |") or in Part A of the rationale file ("| id | call |"), the
    later row, which must be a row of one of the given block files' J-ROWS / RATIONALE-A bodies, is moved into the older
    row's place and the older row is deleted, so one row per id remains at the older row's position. An id occurring more
    than twice, or a later row that no block file carries, stops the script.
 2. VS-40, THE INDEX PARAGRAPH (repair-r1-scope.md hand-off (2)). The "# OLD| " lines of that file's preamble (prefix
    stripped) must occur exactly once in the document as a contiguous run; they are replaced by its "# NEW| " lines.
 3. THREE ONE-STRING SUBSTITUTIONS (repair-rendering-r1-report.md hand-off (2)-(4)): each old string must occur exactly
    once in the document; it is replaced by the new one.
The log records every swap (old row, new row, positions), the paragraph swap and the substitutions.
"""
import argparse, hashlib, json, os, re, sys

ROW_ID = re.compile(r'^\|\s*([^|]+?)\s*\|')
INDEX_HDR = re.compile(r'^\|\s*id\s*\|\s*the choice\s*\|\s*where\s*\|\s*$')
PARTA_HDR = re.compile(r'^\|\s*id\s*\|\s*call\s*\|\s*$')
FENCE = re.compile(r'^\s*(```|~~~)')

SUBSTITUTIONS = [  # (hand-off item, old, new) — repair-rendering-r1-report.md "Assembler hand-off"
    ("rendering (2) §2.6 Room.lit pointer (VR-07, VK-24 (2))",
     "lit: boolean /* a light at the room's spine summit (§8.5; J-A28.32); corridors unlit */",
     "lit: boolean /* a light at the room's spine summit (§8.5, §11.1; J-A28.32); corridors unlit */"),
    ("rendering (3) §7.6 table enumeration (VR-30)",
     "the farmland modes `FarmModeRow` (§4.9) and the reach weights (§4.6) —",
     "the farmland modes `FarmModeRow` (§4.9), the reach weights (§4.6) and the knowledge admission table `knowledge.admit` (§9.2) —"),
    ("rendering (4) §2.9 reach of the knowledge key (VR-10)",
     "reader (§11.2) and every export (§11.1) admit by §9.2's table",
     "reader (§11.2) and every picture and interchange export (§11.1) admit by §9.2's table"),
]


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def table_bounds(lines, header_rx):
    fence = None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and header_rx.match(l) and i + 1 < len(lines) and re.match(r'^\|\s*:?-{3,}', lines[i + 1]):
            j = i + 1
            while j + 1 < len(lines) and lines[j + 1].startswith('|'):
                j += 1
            return i, j
    sys.exit(f'STOP — table {header_rx.pattern} not found')


def block_rows(paths):
    """Rows of every J-ROWS / RATIONALE-A body of the block files, by kind."""
    rows = {'J-ROWS': set(), 'RATIONALE-A': set()}
    for p in paths:
        kind = None
        for l in open(p, encoding='utf-8').read().split('\n'):
            if l.startswith('=== '):
                m = re.match(r'^=== (J-ROWS|RATIONALE-A) ===\s*$', l)
                kind = m.group(1) if m else None
                continue
            if kind and l.startswith('|'):
                rows[kind].add(l)
    return rows


def swap_restated(lines, header_rx, allowed_rows, name, log):
    h, last = table_bounds(lines, header_rx)
    pos = {}
    for i in range(h + 2, last + 1):
        m = ROW_ID.match(lines[i])
        if m:
            pos.setdefault(m.group(1), []).append(i)
    dups = {k: v for k, v in pos.items() if len(v) > 1}
    for k, v in dups.items():
        if len(v) != 2:
            sys.exit(f'STOP — {name}: id {k} occurs {len(v)} times')
        if lines[v[1]] not in allowed_rows:
            sys.exit(f'STOP — {name}: the later row of {k} is carried by no block file')
    # apply from the bottom so earlier positions stay valid
    swaps = []
    for k, (i, j) in sorted(dups.items(), key=lambda kv: -kv[1][1]):
        old, new = lines[i], lines[j]
        lines[i] = new
        del lines[j]
        swaps.append(dict(id=k, older_line=i + 1, appended_line=j + 1, old_row_sha256=sha(old), new_row_sha256=sha(new),
                          old_row=old, new_row=new))
    swaps.sort(key=lambda s: s['older_line'])
    log[name] = dict(table_header_line=h + 1, ids_swapped=[s['id'] for s in swaps], swaps=swaps)
    return len(swaps)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--doc', required=True)
    ap.add_argument('--rationale', required=True)
    ap.add_argument('--out-doc', required=True)
    ap.add_argument('--out-rationale', required=True)
    ap.add_argument('--log', required=True)
    ap.add_argument('blockfiles', nargs='+')
    a = ap.parse_args()
    for p in (a.out_doc, a.out_rationale):
        if os.path.abspath(p) in (os.path.abspath(a.doc), os.path.abspath(a.rationale)):
            sys.exit('STOP — never writes in place')
    doc_text = open(a.doc, encoding='utf-8').read()
    rat_text = open(a.rationale, encoding='utf-8').read()
    doc, rat = doc_text.split('\n'), rat_text.split('\n')
    rows = block_rows(a.blockfiles)
    log = dict(input_doc_sha256=sha(doc_text), input_rationale_sha256=sha(rat_text))

    n1 = swap_restated(doc, INDEX_HDR, rows['J-ROWS'], 'index', log)
    n2 = swap_restated(rat, PARTA_HDR, rows['RATIONALE-A'], 'part_a', log)

    scope = [p for p in a.blockfiles if os.path.basename(p) == 'repair-r1-scope.md']
    if len(scope) != 1:
        sys.exit('STOP — repair-r1-scope.md not among the block files')
    pre = open(scope[0], encoding='utf-8').read().split('\n')
    old = [l[len('# OLD| '):] for l in pre if l.startswith('# OLD| ')]
    new = [l[len('# NEW| '):] for l in pre if l.startswith('# NEW| ')]
    hits = [i for i in range(len(doc)) if doc[i:i + len(old)] == old]
    if len(old) != 4 or len(new) != 5 or len(hits) != 1:
        sys.exit(f'STOP — VS-40: {len(old)} OLD lines, {len(new)} NEW lines, {len(hits)} occurrences')
    doc[hits[0]:hits[0] + len(old)] = new
    log['vs40'] = dict(line=hits[0] + 1, old=old, new=new)

    text = '\n'.join(doc)
    subs = []
    for what, o, n in SUBSTITUTIONS:
        c = text.count(o)
        if c != 1:
            sys.exit(f'STOP — substitution {what!r}: old string occurs {c} times')
        if text.count(n) != 0:
            sys.exit(f'STOP — substitution {what!r}: new string already present')
        line = text[:text.index(o)].count('\n') + 1
        text = text.replace(o, n)
        subs.append(dict(item=what, line=line, old=o, new=n))
    log['substitutions'] = subs
    out_rat = '\n'.join(rat)
    log['output_doc_sha256'] = sha(text)
    log['output_rationale_sha256'] = sha(out_rat)
    open(a.out_doc, 'w', encoding='utf-8').write(text)
    open(a.out_rationale, 'w', encoding='utf-8').write(out_rat)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'index: {n1} restated rows swapped into place: {log["index"]["ids_swapped"]}')
    print(f'Part A: {n2} restated rows swapped into place: {log["part_a"]["ids_swapped"]}')
    print(f'VS-40 paragraph swapped at l. {log["vs40"]["line"]} (4 -> 5 lines)')
    for s in subs:
        print(f'substitution at l. {s["line"]}: {s["item"]}')
    print(f'document {len(doc_text.encode())} -> {len(text.encode())} bytes, {doc_text.count(chr(10))} -> {text.count(chr(10))} lines, sha256 {log["output_doc_sha256"]}')
    print(f'rationale {len(rat_text.encode())} -> {len(out_rat.encode())} bytes, {rat_text.count(chr(10))} -> {out_rat.count(chr(10))} lines, sha256 {log["output_rationale_sha256"]}')


if __name__ == '__main__':
    main()
