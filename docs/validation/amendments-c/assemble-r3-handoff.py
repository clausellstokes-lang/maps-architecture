#!/usr/bin/env python3
"""assemble-r3-handoff.py (amendments-c) — the scripted assembler hand-off of repair round 3 of the bundled pass c + d + e
(lane amendments-c/assemble-r3, 2026-09-28). Stdlib only; never writes in place. Run it on the outputs of apply-blocks.py.
It reuses docs/validation/amendments-b/assemble-r1-handoff.py's block_rows and swap_restated unchanged (imported), as
assemble-r1 and assemble-r2 of this pass did, and runs the determinism seat's own hand-off script unchanged.

usage:
  python3 assemble-r3-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md \
      --log LOG.json BLOCKFILE [BLOCKFILE ...]

What it does, in this order (each step asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (every repair-r3 seat's hand-off: determinism report "Outcome" (J-A68.73), model report hand-off 1
    (J-A88.21), pipeline report §4 (1) (index J-A88.42; Part A J-A88.42, J-A42.41, J-P37), rendering report hand-off 1
    (J-A68.85, J-A68.89, J-A68.90, J-A68.92, J-A101.86), scope report §4 (1) (J-A81.01)). For every id that occurs
    exactly twice in the judgment index or in Part A, the later row, which must be a row of one of the block files'
    J-ROWS / RATIONALE-A bodies, is moved into the older row's place and the older row deleted (swap_restated,
    unchanged). The swapped id sets must equal EXPECTED_INDEX / EXPECTED_PART_A, or the script stops. The new ids
    (rendering's J-A68.93, J-A68.94) must then stand once in each table, and the two tables must hold the same id set.
 2. VD2-03 POINTER HAND-OFF (determinism report "Outcome" row VD2-03 and "Order": run after every block file is applied
    and the restated rows are swapped): docs/validation/amendments-c/repair-determinism-r3-handoff.py is run unchanged,
    as a subprocess, on step 1's document with --rationale step 1's rationale file; it must exit 0. Its log is embedded.
 3. CHECKED, NOT APPLIED: the cross-seat texts the seats said depend on each other (scope report §4 (2), model report
    hand-off 3, pipeline report §3's second note, determinism report "Cross-part notes"). Each text must be present the
    stated number of times, whitespace-normalised, inside its named subsection or index row; the pipeline note's old
    wording must be absent from the whole document.
The log records every swap (old row, new row, positions), the VD2-03 script's log and every check.
"""
import argparse, hashlib, importlib.util, json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('r1handoff', os.path.join(HERE, '..', 'amendments-b', 'assemble-r1-handoff.py'))
r1 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r1)
VD203 = os.path.join(HERE, 'repair-determinism-r3-handoff.py')

EXPECTED_INDEX = {
    'J-A68.73',                                                       # determinism
    'J-A88.21',                                                       # model (hand-off 1)
    'J-A88.42',                                                       # pipeline (§4 (1))
    'J-A68.85', 'J-A68.89', 'J-A68.90', 'J-A68.92', 'J-A101.86',      # rendering (hand-off 1)
    'J-A81.01',                                                       # scope (§4 (1))
}
EXPECTED_PART_A = EXPECTED_INDEX | {'J-A42.41', 'J-P37'}              # pipeline (§4 (1); Part A only)
NEW_IDS = ['J-A68.93', 'J-A68.94']                                    # rendering (new; appended, not swapped)

H = {
    '7.4': "### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8",
    '13.2': "### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT",
    '2.9': "### 2.9 The document and serialisation",
    '2.7': "### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records",
}

# (check, scope kind, scope, text, expected count) — whitespace-normalised, inside the subsection or the index row
CHECKS = [
    ("scope §4 (2) / determinism cross-part note — §13.2's lit-street fixture follows determinism r3's door-light wording",
     'section', H['13.2'], "the door light keeping its fraction of the footprint ring's edge it stands on and never re-seated", 1),
    ("determinism VD2-01 — §7.4's door light keeps its fraction of the ring edge its point lies on",
     'section', H['7.4'], "keeps its fraction of the ring edge its point lies on", 1),
    ("determinism VD2-01 — the restated J-A68.73 index row carries the reworded fraction (pipeline §3's C3 note)",
     'row', 'J-A68.73', "fraction of the footprint ring's edge", 1),
    ("scope §4 (2) — the restated J-A88.42 index row names the catacomb age (VS2-03's T88-1 follows it)",
     'row', 'J-A88.42', "its age the catacomb rule's age", 1),
    ("model hand-off 3 — §2.9's Recipe.history reader list cites II.7.6's rules (V-MC2-01)",
     'section', H['2.9'], "a recipe input read by S2's growth-stage count and II.7.6's rules (§2.7; §4.2 S2)", 1),
    ("model hand-off 3 — the restated J-A88.21 index row points at J-A88.42's readers",
     'row', 'J-A88.21', "(its readers J-A88.42's)", 1),
    ("model V-MC2-02 — §2.7's UndergroundSystem.sources names the scar-buried districts",
     'section', H['2.7'], "the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42)", 1),
    ("scope VD2-05 — the restated J-A81.01 index row's section column",
     'row', 'J-A81.01', "| §7.7 item 15, §1.1, §14 |", 1),
]
ABSENT = [
    ("pipeline §3 note 2 — the C3 wording 'fraction along the footprint edge' is gone from the document",
     "fraction along the footprint edge"),
]


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def section_span(text, heading):
    lines = text.split('\n')
    offs, o = [], 0
    for l in lines:
        offs.append(o)
        o += len(l) + 1
    fence, start, lvl = None, None, None
    for i, l in enumerate(lines):
        m = r1.FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and re.match(r'^(#{1,6})\s+\S', l):
            L = len(l) - len(l.lstrip('#'))
            if start is None and l == heading:
                start, lvl = i, L
            elif start is not None and L <= lvl:
                return offs[start], offs[i]
    if start is None:
        sys.exit(f'STOP — heading {heading[:70]!r} not found')
    return offs[start], len(text)


def index_row(lines, rid):
    h, last = r1.table_bounds(lines, r1.INDEX_HDR)
    rows = [lines[i] for i in range(h + 2, last + 1) if lines[i].startswith(f'| {rid} |')]
    if len(rows) != 1:
        sys.exit(f'STOP — index row {rid}: {len(rows)} rows')
    return rows[0]


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
    rows = r1.block_rows(a.blockfiles)
    log = dict(input_doc_sha256=sha(doc_text), input_rationale_sha256=sha(rat_text),
               blockfiles={os.path.basename(p): hashlib.sha256(open(p, 'rb').read()).hexdigest() for p in a.blockfiles})

    # 1. restated rows
    n1 = r1.swap_restated(doc, r1.INDEX_HDR, rows['J-ROWS'], 'index', log)
    n2 = r1.swap_restated(rat, r1.PARTA_HDR, rows['RATIONALE-A'], 'part_a', log)
    got_i, got_a = set(log['index']['ids_swapped']), set(log['part_a']['ids_swapped'])
    if got_i != EXPECTED_INDEX or got_a != EXPECTED_PART_A:
        sys.exit(f'STOP — swapped ids differ from the hand-offs: index extra {sorted(got_i - EXPECTED_INDEX)} missing '
                 f'{sorted(EXPECTED_INDEX - got_i)}; Part A extra {sorted(got_a - EXPECTED_PART_A)} missing {sorted(EXPECTED_PART_A - got_a)}')
    idsets = {}
    for name, lines, hdr in (('index', doc, r1.INDEX_HDR), ('part_a', rat, r1.PARTA_HDR)):
        h, last = r1.table_bounds(lines, hdr)
        ids = [m.group(1) for l in lines[h + 2:last + 1] for m in [r1.ROW_ID.match(l)] if m]
        if len(ids) != len(set(ids)):
            sys.exit(f'STOP — {name}: duplicate ids remain after the swap')
        for nid in NEW_IDS:
            if ids.count(nid) != 1:
                sys.exit(f'STOP — {name}: new id {nid} stands {ids.count(nid)} times')
        log[name]['rows_after'] = len(ids)
        log[name]['id_set_sha256'] = sha('\n'.join(sorted(ids)))
        idsets[name] = set(ids)
    if idsets['index'] != idsets['part_a']:
        sys.exit(f"STOP — index and Part A id sets differ: {sorted(idsets['index'] ^ idsets['part_a'])[:10]}")
    log['new_ids'] = NEW_IDS

    # 2. VD2-03 pointer hand-off, run unchanged on step 1's output
    with tempfile.TemporaryDirectory() as td:
        d1, r1p, d2, lg = (os.path.join(td, n) for n in ('d1.md', 'r1.md', 'd2.md', 'vd203.json'))
        open(d1, 'w', encoding='utf-8').write('\n'.join(doc))
        open(r1p, 'w', encoding='utf-8').write('\n'.join(rat))
        cp = subprocess.run([sys.executable, VD203, '--doc', d1, '--out-doc', d2, '--log', lg, '--rationale', r1p],
                            capture_output=True, text=True)
        if cp.returncode != 0:
            sys.exit(f'STOP — repair-determinism-r3-handoff.py exited {cp.returncode}:\n{cp.stdout}\n{cp.stderr}')
        out_doc = open(d2, encoding='utf-8').read()
        log['vd203'] = dict(script=os.path.basename(VD203), script_sha256=hashlib.sha256(open(VD203, 'rb').read()).hexdigest(),
                            stdout=cp.stdout, log=json.load(open(lg, encoding='utf-8')))
    out_rat = '\n'.join(rat)

    # 3. checks, not applied
    checks = []
    dl = out_doc.split('\n')
    for what, kind, scope, needle, want in CHECKS:
        if kind == 'section':
            s, e = section_span(out_doc, scope)
            hay = out_doc[s:e]
        else:
            hay = index_row(dl, scope)
        c = norm(hay).count(norm(needle))
        if c != want:
            sys.exit(f'STOP — {what}: present {c} times (expected {want})')
        checks.append(dict(check=what, scope=scope, text=needle, state=f'SATISFIED (present {c} time(s), whitespace-normalised)'))
    for what, needle in ABSENT:
        c = norm(out_doc).count(norm(needle))
        if c:
            sys.exit(f'STOP — {what}: still present {c} times')
        checks.append(dict(check=what, text=needle, state='SATISFIED (absent from the document)'))
    log['checks'] = checks

    log['output_doc_sha256'] = sha(out_doc)
    log['output_rationale_sha256'] = sha(out_rat)
    open(a.out_doc, 'w', encoding='utf-8').write(out_doc)
    open(a.out_rationale, 'w', encoding='utf-8').write(out_rat)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'index: {n1} restated rows swapped into place: {sorted(log["index"]["ids_swapped"])}; rows after {log["index"]["rows_after"]}')
    print(f'Part A: {n2} restated rows swapped into place: {sorted(log["part_a"]["ids_swapped"])}; rows after {log["part_a"]["rows_after"]}')
    print(f'new ids once in each table: {NEW_IDS}; index id set == Part A id set: True')
    print('VD2-03 hand-off (repair-determinism-r3-handoff.py, unchanged):')
    for l in cp.stdout.strip().split('\n'):
        print('   ' + l)
    for c_ in checks:
        print(f'check: {c_["check"][:100]} — {c_["state"]}')
    print(f'document {len(doc_text.encode())} -> {len(out_doc.encode())} bytes, {doc_text.count(chr(10))} -> {out_doc.count(chr(10))} lines, sha256 {log["output_doc_sha256"]}')
    print(f'rationale {len(rat_text.encode())} -> {len(out_rat.encode())} bytes, {rat_text.count(chr(10))} -> {out_rat.count(chr(10))} lines, sha256 {log["output_rationale_sha256"]}')


if __name__ == '__main__':
    main()
