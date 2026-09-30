#!/usr/bin/env python3
"""assemble-r2-handoff.py (handfix) — the scripted assembler hand-off of the hand-fix repair round 2 (lane
handfix-b/assemble-r2, 2026-09-27). Stdlib only; never writes in place. Run it on the outputs of apply-blocks.py.
It reuses docs/validation/amendments-b/assemble-r1-handoff.py's block_rows and swap_restated unchanged (imported), as
handfix/assemble-r1-handoff.py did for round 1.

usage:
  python3 assemble-r2-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md \
      --log LOG.json BLOCKFILE [BLOCKFILE ...]

What it does, in this order (each step asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (hand-off (1) of five of the six repair-r2 files: the determinism report's NOTE FOR ASSEMBLE (1), the
    kernel, model and pipeline preambles (1); the rendering and scope files restate no row). For every id that occurs
    exactly twice in the document's judgment index or in Part A of the rationale file, the later row, which must be a row
    of one of the block files' J-ROWS / RATIONALE-A bodies, is moved into the older row's place and the older row deleted
    (swap_restated, unchanged). The swapped id sets must equal EXPECTED_INDEX / EXPECTED_PART_A below, or the script stops.
 2. ONE ONE-STRING SUBSTITUTION (repair-r2-pipeline.md's preamble hand-off (2): the new field `BuildingSlot.unhoused` in
    §2.5, which the pipeline's §4.7 and §10.2 blocks and its J-A28.46 rows cite). The old string must occur exactly once
    in the document, inside §2.5; the new string must not be present yet; and both old and new must be verbatim lines of
    the pipeline block file's preamble — the line after the one ending "Old:" and the line after "#   new:" (a
    transcription check).
The log records every swap (old row, new row, positions) and the substitution (line, old, new).
"""
import argparse, hashlib, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('r1handoff', os.path.join(HERE, '..', 'assemble-r1-handoff.py'))
r1 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r1)

# The restated ids each seat's hand-off names.
EXPECTED_INDEX = {
    'J-A28.23', 'J-A28.26',                           # model (preamble (1))
    'J-A28.46',                                       # pipeline (preamble (1))
}
EXPECTED_PART_A = {
    'J-A20.74',                                       # determinism (Part A only; report "NOTE FOR ASSEMBLE" (1))
    'J-A28.34',                                       # kernel (Part A only; preamble (1))
    'J-A28.23', 'J-A28.26',                           # model (preamble (1))
    'J-A28.46',                                       # pipeline (preamble (1))
}

P1_OLD = "persisted with the slot */ }   // persisted: no polygon"
P1_NEW = ("persisted with the slot */; unhoused?: true /* item 28 (f): present only on a residential slot of a workplace's or an"
          " institution's plot — its main slot or one within a required structure's least count — for which §4.7's generation"
          " fill found no household of its band or drift, and which S11 so built as a slot without houses: every reader of a"
          " slot's houses (§4.7 S11, §2.6's capacity, §13.2 T19-4) reads it as one without; written by every run of that fill,"
          " cleared by the designation mutator (§4.7), whose undo restores it with the former parts */ }   // persisted: no polygon")
SUBSTITUTIONS = [  # (hand-off item, heading line that must hold the old string, old, new)
    ("pipeline P1 — §2.5 BuildingSlot.unhoused (VPH1-01 refinement (c)): the stored typing of an unhoused slot",
     "### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector",
     P1_OLD, P1_NEW),
]
HEAD = re.compile(r'^(#{1,6})\s+\S')


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def section_span(text, heading):
    """(start, end) character offsets of the subsection under the exact heading line (to the next heading of the same
    or higher level; fenced code respected); stops unless the heading occurs exactly once."""
    lines = text.split('\n')
    offs, o = [], 0
    for l in lines:
        offs.append(o)
        o += len(l) + 1
    fence, found = None, []
    heads = []
    for i, l in enumerate(lines):
        m = r1.FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and HEAD.match(l):
            heads.append((i, len(l) - len(l.lstrip('#')), l))
    ks = [k for k, h in enumerate(heads) if h[2] == heading]
    if len(ks) != 1:
        sys.exit(f'STOP — heading {heading[:60]!r} found {len(ks)} times')
    i, lvl, _ = heads[ks[0]]
    end = next((h[0] for h in heads[ks[0] + 1:] if h[1] <= lvl), len(lines))
    return offs[i], (offs[end] if end < len(lines) else len(text))


def preamble_pair(path):
    """The (old, new) lines the pipeline preamble's hand-off (2) quotes: the line after the one ending 'Old:' and the line
    after '#   new:', each with its '#' and surrounding whitespace stripped."""
    text = open(path, encoding='utf-8').read()
    pre = text[:text.index('\n=== ')].split('\n')
    olds = [i for i, l in enumerate(pre) if l.startswith('#') and l.rstrip().endswith('Old:')]
    news = [i for i, l in enumerate(pre) if l.strip() == '#   new:']
    if len(olds) != 1 or len(news) != 1:
        sys.exit(f'STOP — pipeline preamble: {len(olds)} "Old:" markers, {len(news)} "new:" markers')
    return pre[olds[0] + 1][1:].strip(), pre[news[0] + 1][1:].strip()


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

    # 2. P1
    pipe = [p for p in a.blockfiles if os.path.basename(p) == 'repair-r2-pipeline.md']
    if len(pipe) != 1:
        sys.exit('STOP — repair-r2-pipeline.md not among the block files')
    pre_old, pre_new = preamble_pair(pipe[0])
    text = '\n'.join(doc)
    subs = []
    for what, heading, o, n in SUBSTITUTIONS:
        if (o, n) != (pre_old, pre_new):
            sys.exit(f'STOP — {what}: old or new string differs from the pipeline preamble\'s quoted lines')
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
