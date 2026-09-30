#!/usr/bin/env python3
"""assemble-r2-handoff.py — the scripted assembler hand-off of amendments-b repair round 2 (lane amendments-b/assemble-r2,
2026-09-27). Stdlib only; never writes in place. Run it on the outputs of apply-blocks.py. It reuses assemble-r1-handoff.py's
step-1 logic unchanged (imported from the sibling file) and replaces round 1's paragraph and substitution steps with
round 2's.

usage:
  python3 assemble-r2-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md \
      --log LOG.json BLOCKFILE [BLOCKFILE ...]

What it does, in this order (each step asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (hand-off (1) of the determinism, kernel, model, pipeline, rendering and scope repair-r2 files). For
    every id that occurs exactly twice in the document's judgment index ("| id | the choice | where |") or in Part A of the
    rationale file ("| id | call |"), the later row, which must be a row of one of the given block files' J-ROWS /
    RATIONALE-A bodies, is moved into the older row's place and the older row is deleted, so one row per id remains at the
    older row's position. An id occurring more than twice (two files restating one id: the kernel seat's hand-off (2)), or
    a later row that no block file carries, stops the script. This is assemble-r1-handoff.py's swap_restated, unchanged.
 2. VS1-04, THE INDEX PARAGRAPH (repair-r2-scope.md hand-off (2)). The "# OLD| " lines of that file's preamble (prefix
    stripped) must be exactly 2 and occur exactly once in the document as a contiguous run; they are replaced by its
    exactly 2 "# NEW| " lines. The NEW lines must not already occur.
There are no one-string substitutions in round 2 (no repair-r2 file or report hands one off).
The log records every swap (old row, new row, positions) and the paragraph swap.
"""
import argparse, hashlib, importlib.util, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('r1handoff', os.path.join(HERE, 'assemble-r1-handoff.py'))
r1 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r1)


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

    scope = [p for p in a.blockfiles if os.path.basename(p) == 'repair-r2-scope.md']
    if len(scope) != 1:
        sys.exit('STOP — repair-r2-scope.md not among the block files')
    pre = open(scope[0], encoding='utf-8').read().split('\n')
    first_hdr = next(i for i, l in enumerate(pre) if l.startswith('=== '))
    pre = pre[:first_hdr]
    old = [l[len('# OLD| '):] for l in pre if l.startswith('# OLD| ')]
    new = [l[len('# NEW| '):] for l in pre if l.startswith('# NEW| ')]
    hits = [i for i in range(len(doc)) if doc[i:i + len(old)] == old]
    new_hits = [i for i in range(len(doc)) if doc[i:i + len(new)] == new]
    if len(old) != 2 or len(new) != 2 or len(hits) != 1 or new_hits:
        sys.exit(f'STOP — VS1-04: {len(old)} OLD lines, {len(new)} NEW lines, {len(hits)} occurrences, NEW already present {len(new_hits)}')
    doc[hits[0]:hits[0] + len(old)] = new
    log['vs1_04'] = dict(line=hits[0] + 1, old=old, new=new)
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
    print(f'VS1-04 paragraph swapped at l. {log["vs1_04"]["line"]} (2 -> 2 lines)')
    print(f'document {len(doc_text.encode())} -> {len(out_doc.encode())} bytes, {doc_text.count(chr(10))} -> {out_doc.count(chr(10))} lines, sha256 {log["output_doc_sha256"]}')
    print(f'rationale {len(rat_text.encode())} -> {len(out_rat.encode())} bytes, {rat_text.count(chr(10))} -> {out_rat.count(chr(10))} lines, sha256 {log["output_rationale_sha256"]}')


if __name__ == '__main__':
    main()
