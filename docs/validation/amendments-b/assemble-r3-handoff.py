#!/usr/bin/env python3
"""assemble-r3-handoff.py — the scripted assembler hand-off of amendments-b repair round 3 (lane amendments-b/assemble-r3,
2026-09-27). Stdlib only; never writes in place. Run it on the outputs of apply-blocks.py. It reuses assemble-r1-handoff.py's
step-1 logic unchanged (imported from the sibling file).

usage:
  python3 assemble-r3-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md \
      --log LOG.json BLOCKFILE [BLOCKFILE ...]

What it does (it asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (hand-off (1) of all six repair-r3 files: the determinism, pipeline and scope preambles; the kernel,
    model and rendering reports). For every id that occurs exactly twice in the document's judgment index
    ("| id | the choice | where |") or in Part A of the rationale file ("| id | call |"), the later row, which must be a
    row of one of the given block files' J-ROWS / RATIONALE-A bodies, is moved into the older row's place and the older
    row is deleted, so one row per id remains at the older row's position. An id occurring more than twice (two files
    restating one id), or a later row that no block file carries, stops the script. This is assemble-r1-handoff.py's
    swap_restated, unchanged.
 2. EXPECTED SETS. The swapped ids must be exactly the ids the six seats' hand-offs list (EXPECTED_INDEX, EXPECTED_PART_A
    below); any difference stops the script.
Round 3 hands off no paragraph swap and no one-string substitution (no repair-r3 file or report hands one off).
The log records every swap (old row, new row, positions).
"""
import argparse, hashlib, importlib.util, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('r1handoff', os.path.join(HERE, 'assemble-r1-handoff.py'))
r1 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r1)

# The restated ids each seat's hand-off names (block-file preamble or report "hand-off" / "NOTE FOR ASSEMBLE").
EXPECTED_INDEX = {
    'J-A20.75', 'J-A31.76', 'J-A28.73', 'J-DET-53',   # determinism (index and Part A)
    'J-A28.23', 'J-A28.26', 'J-A29.25',               # model (index and Part A)
    'J-A30.41', 'J-A28.46', 'J-A11.43',               # pipeline (index and Part A)
    'J-A30.87',                                       # rendering (index and Part A)
    'J-A17.01',                                       # scope (index and Part A)
}
EXPECTED_PART_A = EXPECTED_INDEX | {
    'J-A28.33', 'J-A28.34',                           # kernel (Part A only)
    'J-A20.01',                                       # scope (Part A only)
}


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


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

    n1 = r1.swap_restated(doc, r1.INDEX_HDR, rows['J-ROWS'], 'index', log)
    n2 = r1.swap_restated(rat, r1.PARTA_HDR, rows['RATIONALE-A'], 'part_a', log)
    got_i, got_a = set(log['index']['ids_swapped']), set(log['part_a']['ids_swapped'])
    if got_i != EXPECTED_INDEX or got_a != EXPECTED_PART_A:
        sys.exit(f'STOP — swapped ids differ from the hand-offs: index extra {sorted(got_i - EXPECTED_INDEX)} missing '
                 f'{sorted(EXPECTED_INDEX - got_i)}; Part A extra {sorted(got_a - EXPECTED_PART_A)} missing {sorted(EXPECTED_PART_A - got_a)}')
    log['paragraph_swaps'] = []
    log['substitutions'] = []

    out_doc = '\n'.join(doc)
    out_rat = '\n'.join(rat)
    log['output_doc_sha256'] = sha(out_doc)
    log['output_rationale_sha256'] = sha(out_rat)
    open(a.out_doc, 'w', encoding='utf-8').write(out_doc)
    open(a.out_rationale, 'w', encoding='utf-8').write(out_rat)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'index: {n1} restated rows swapped into place: {log["index"]["ids_swapped"]}')
    print(f'Part A: {n2} restated rows swapped into place: {log["part_a"]["ids_swapped"]}')
    print(f'document {len(doc_text.encode())} -> {len(out_doc.encode())} bytes, {doc_text.count(chr(10))} -> {out_doc.count(chr(10))} lines, sha256 {log["output_doc_sha256"]}')
    print(f'rationale {len(rat_text.encode())} -> {len(out_rat.encode())} bytes, {rat_text.count(chr(10))} -> {out_rat.count(chr(10))} lines, sha256 {log["output_rationale_sha256"]}')


if __name__ == '__main__':
    main()
