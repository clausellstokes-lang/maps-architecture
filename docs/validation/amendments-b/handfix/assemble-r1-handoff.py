#!/usr/bin/env python3
"""assemble-r1-handoff.py (handfix) — the scripted assembler hand-off of the hand-fix repair round 1 (lane
handfix-b/assemble-r1, 2026-09-27). Stdlib only; never writes in place. Run it on the outputs of apply-blocks.py.
It reuses docs/validation/amendments-b/assemble-r1-handoff.py's block_rows and swap_restated unchanged (imported).

usage:
  python3 assemble-r1-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md \
      --log LOG.json BLOCKFILE [BLOCKFILE ...]

What it does, in this order (each step asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (hand-off (1) of all four repair-r1 files: the determinism report's NOTE FOR ASSEMBLE, the model,
    pipeline and scope preambles). For every id that occurs exactly twice in the document's judgment index or in Part A
    of the rationale file, the later row, which must be a row of one of the block files' J-ROWS / RATIONALE-A bodies, is
    moved into the older row's place and the older row deleted (swap_restated, unchanged). The swapped id sets must equal
    EXPECTED_INDEX / EXPECTED_PART_A below, or the script stops.
 2. TWO ONE-STRING SUBSTITUTIONS (repair-r1-model.md's preamble hand-off (2), H1 and H2; the model report §3): each old
    string must occur exactly once in the document, inside its named subsection; the new string must not be present yet;
    and both old and new must be verbatim in the model block file's preamble (a transcription check).
The log records every swap (old row, new row, positions) and both substitutions (line, old, new).
"""
import argparse, hashlib, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('r1handoff', os.path.join(HERE, '..', 'assemble-r1-handoff.py'))
r1 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r1)

# The restated ids each seat's hand-off names.
EXPECTED_INDEX = {
    'J-A28.73',                                       # determinism (index only; report "NOTE FOR ASSEMBLE" (1))
    'J-A28.23', 'J-A28.26', 'J-A28.28', 'J-A29.25',   # model (preamble (1))
    'J-A28.46', 'J-A11.43',                           # pipeline (preamble (1))
}
EXPECTED_PART_A = {
    'J-A28.26',                                       # model
    'J-A28.46',                                       # pipeline
    'J-A16.01',                                       # scope (Part A only; preamble (1))
}

H1_OLD = "composition has a wing spanning the passage (§2.6's carry trigger);"
H1_NEW = (H1_OLD + " an event that changes a spanning wing's heights, or makes its building a footprint trace or a tombstone,"
          " holds the passage it spans, whose `headroomCm` or `frontBuilding` it rewrites (§2.5's `Passage`, §2.6's `BaseWing.spans`);")
H2_OLD = "demolished or succeeded;"
H2_NEW = ("demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no"
          " `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`);")
SUBSTITUTIONS = [  # (hand-off item, heading line that must hold the old string, old, new)
    ("model H1 — §7.3 item 1 (VHM-01, VHM-02): the passage in a heights / trace / tombstone event's scope",
     "### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)", H1_OLD, H1_NEW),
    ("model H2 — §13.2 T8-3 (VHM-02): the bar for the trace-and-tombstone rule",
     "### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT", H2_OLD, H2_NEW),
]
HEAD = re.compile(r'^(#{1,6})\s+\S')


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def section_span(text, heading):
    """(start, end) character offsets of the subsection under the exact heading line (to the next heading of the same
    or higher level; fenced code respected)."""
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
        if fence is None and HEAD.match(l):
            L = len(l) - len(l.lstrip('#'))
            if start is None and l == heading:
                start, lvl = i, L
            elif start is not None and L <= lvl:
                return offs[start], offs[i]
    if start is None:
        sys.exit(f'STOP — heading {heading[:60]!r} not found')
    return offs[start], len(text)


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
    log = dict(input_doc_sha256=sha(doc_text), input_rationale_sha256=sha(rat_text))

    # 1. restated rows
    n1 = r1.swap_restated(doc, r1.INDEX_HDR, rows['J-ROWS'], 'index', log)
    n2 = r1.swap_restated(rat, r1.PARTA_HDR, rows['RATIONALE-A'], 'part_a', log)
    got_i, got_a = set(log['index']['ids_swapped']), set(log['part_a']['ids_swapped'])
    if got_i != EXPECTED_INDEX or got_a != EXPECTED_PART_A:
        sys.exit(f'STOP — swapped ids differ from the hand-offs: index extra {sorted(got_i - EXPECTED_INDEX)} missing '
                 f'{sorted(EXPECTED_INDEX - got_i)}; Part A extra {sorted(got_a - EXPECTED_PART_A)} missing {sorted(EXPECTED_PART_A - got_a)}')

    # 2. H1, H2
    model = [p for p in a.blockfiles if os.path.basename(p) == 'repair-r1-model.md']
    if len(model) != 1:
        sys.exit('STOP — repair-r1-model.md not among the block files')
    mtext = open(model[0], encoding='utf-8').read()
    pre = mtext[:mtext.index('\n=== ')]
    pre_lines = [l[1:].strip() for l in pre.split('\n') if l.startswith('#')]
    text = '\n'.join(doc)
    subs = []
    for what, heading, o, n in SUBSTITUTIONS:
        if o not in pre_lines or n not in pre_lines:
            sys.exit(f'STOP — {what}: old or new string is not a verbatim line of the model preamble')
        c = text.count(o)
        if c != 1:
            sys.exit(f'STOP — {what}: old string occurs {c} times in the document')
        if n in text:
            sys.exit(f'STOP — {what}: new string already present')
        s, e = section_span(text, heading)
        at = text.index(o)
        if not (s <= at < e):
            sys.exit(f'STOP — {what}: old string lies outside {heading[:40]!r}')
        line = text[:at].count('\n') + 1
        text = text.replace(o, n)
        subs.append(dict(item=what, heading=heading, line=line, old=o, new=n))
    log['substitutions'] = subs

    out_rat = '\n'.join(rat)
    log['output_doc_sha256'] = sha(text)
    log['output_rationale_sha256'] = sha(out_rat)
    open(a.out_doc, 'w', encoding='utf-8').write(text)
    open(a.out_rationale, 'w', encoding='utf-8').write(out_rat)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'index: {n1} restated rows swapped into place: {log["index"]["ids_swapped"]}')
    print(f'Part A: {n2} restated rows swapped into place: {log["part_a"]["ids_swapped"]}')
    for s in subs:
        print(f'substitution at l. {s["line"]}: {s["item"]}')
    print(f'document {len(doc_text.encode())} -> {len(text.encode())} bytes, {doc_text.count(chr(10))} -> {text.count(chr(10))} lines, sha256 {log["output_doc_sha256"]}')
    print(f'rationale {len(rat_text.encode())} -> {len(out_rat.encode())} bytes, {rat_text.count(chr(10))} -> {out_rat.count(chr(10))} lines, sha256 {log["output_rationale_sha256"]}')


if __name__ == '__main__':
    main()
