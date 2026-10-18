#!/usr/bin/env python3
"""assemble-r2-handoff.py (amendments-c) — the scripted assembler hand-off of repair round 2 of the bundled pass c + d + e
(lane amendments-c/assemble-r2, 2026-09-28). Stdlib only; never writes in place. Run it on the outputs of apply-blocks.py.
It reuses docs/validation/amendments-b/assemble-r1-handoff.py's block_rows and swap_restated unchanged (imported), as
assemble-r1 of this pass did.

usage:
  python3 assemble-r2-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc OUT.md --out-rationale OUT-R.md \
      --log LOG.json BLOCKFILE [BLOCKFILE ...]

What it does, in this order (each step asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (every repair-r2 seat's hand-off: determinism preamble (1), model report hand-off 1, pipeline preamble
    (1) and report §5 (1), rendering report hand-off 1, scope preamble (1) and report §4 (1); kernel has none). For every
    id that occurs exactly twice in the document's judgment index or in Part A of the rationale file, the later row, which
    must be a row of one of the block files' J-ROWS / RATIONALE-A bodies, is moved into the older row's place and the
    older row deleted (swap_restated, unchanged). The swapped id sets must equal EXPECTED_INDEX / EXPECTED_PART_A below,
    or the script stops.
 2. ONE-STRING SUBSTITUTIONS (repair-rendering-r2-report.md "Assembler hand-off" 2-5, the same strings as its script
    repair-rendering-r2-handoff.py, here with scope checks): each old string must occur exactly once in its file, inside
    its named subsection (document) or its named table row (index row / Part A row), and the new string must not be
    present yet. Hand-off 4 (II.7.3) runs on pipeline's r2 REPLACE of II.7.3, applied by apply-blocks.py before this.
 3. CHECKED, NOT APPLIED: pipeline r2 hand-off (2) (the two §5.2 F-SITING texts determinism r2 folded into its §5.2
    block; determinism preamble (3)); kernel r2 cross-part note 1 (model's §2.2 states the further part's ring); scope r2
    hand-off (2) (the relief toggle of pipeline's §4.2 and the draw order of determinism's §6.1 land together). Each text
    must be present exactly once, whitespace-normalised, inside its named subsection.
The log records every swap (old row, new row, positions), every substitution (line, old, new) and every check.
"""
import argparse, hashlib, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('r1handoff', os.path.join(HERE, '..', 'amendments-b', 'assemble-r1-handoff.py'))
r1 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r1)

EXPECTED_INDEX = {
    'J-A68.73',                                                       # determinism (preamble (1))
    'J-A63.22',                                                       # model (report hand-off 1)
    'J-A72.50', 'J-A88.42', 'J-A65.46', 'J-A65.49',                   # pipeline (preamble (1); report §5 (1))
    'J-A68.83', 'J-A68.85', 'J-A68.89',                               # rendering (report hand-off 1)
}                                                                     # kernel: none; scope: none in the index
EXPECTED_PART_A = EXPECTED_INDEX | {'J-A66.01'}                       # scope (preamble (1); Part A only)

H = {
    '5.2': "### 5.2 Failure classes: detection, ladder, test",
    '2.2': "### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices",
    '4.2': "### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace",
    '6.1': "### 6.1 RNG and stream design",
    'II.7.3': "### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order",
    '13.4': "### 13.4 Visual regression, B-ZOOM and the app harness",
}

# (hand-off, file, scope kind, scope, old, new) — repair-rendering-r2-report.md "Assembler hand-off" 2-5
SUBS = [
    ("rendering 2a — J-A20.82 index row: §2.8's marker -> §2.8's `factTier` (V-MC1-09 = VD1-11 = VRC1-10)",
     'doc', 'row', 'J-A20.82',
     "every answer and every export mark each fact's tier by §2.8's marker (`dossier`, `declared`, `map`)",
     "every answer and every export mark each fact's tier by §2.8's `factTier` (`dossier`, `declared`, `map`)"),
    ("rendering 2b — J-A20.82 Part A: §2.8's marker -> §2.8's `factTier`",
     'rat', 'row', 'J-A20.82',
     "each fact's tier by §2.8's marker — `dossier`, `declared` or `map` —",
     "each fact's tier by §2.8's `factTier` — `dossier`, `declared` or `map` —"),
    ("rendering 3 — J-A68.86 Part A: the readings' clause (VRC1-16)",
     'rat', 'row', 'J-A68.86',
     "the FTG, NG and Fantasy Manor cells carry their builds and their readings' sections, their P-ids P22–P24, and no constant",
     "the FTG, NG and Fantasy Manor cells carry their builds and their P-ids P22–P24 (the readings' sections are `research/findings/code-impact.md` §(d)'s), and no constant"),
    ("rendering 4 — II.7.3 the shaft sentence: a secret shaft lit only under a key that draws it (VRC1-03's note; after pipeline's II.7.3 REPLACE)",
     'doc', 'section', H['II.7.3'],
     "every access that breaks the surface — is a light shaft for §8.4's lighting:",
     "every access that breaks the surface — is a light shaft for §8.4's lighting, a secret one lit only for a key under\nwhich it draws (§8.1 item 7):"),
    ("rendering 5 — §13.4 light-pass fallback: 'the march unchanged' -> 'the traversal unchanged' (§8.4 (c)'s traversal)",
     'doc', 'section', H['13.4'],
     "  — the march unchanged — and is re-measured;",
     "  — the traversal unchanged — and is re-measured;"),
]

# (check, heading, text) — each text present exactly once, whitespace-normalised, inside the heading's subsection
CHECKS = [
    ("pipeline hand-off (2) a — §5.2 F-SITING detection cell as pipeline r2 wrote it (folded by determinism r2, its preamble (3))",
     H['5.2'],
     "finds no district whose capacity holds a household that fills no dossier's population (a household no district's range admits housed at the nearest range, J-A72.50)"),
    ("pipeline hand-off (2) b — §5.2 F-SITING: reported with the refusing capacities",
     H['5.2'], "reported with the capacities that refused it"),
    ("kernel cross-part note 1 — §2.2 rule 1 states the further part's ring (VKC1-02, J-A65.22), the target of §3.2 (9)'s pointer",
     H['2.2'], "the ground's frame plus its context margin, as the sewer's is (II.7.2)"),
]
SCOPE_TOGETHER = [  # scope hand-off (2): the texts its blocks name exist in the landed siblings (presence, not count)
    ("scope hand-off (2) a — the S0 relief toggle of pipeline's §4.2 (VPR1-12)", H['4.2'], "relief: 'auto'"),
    ("scope hand-off (2) b — §6.1's geology-then-relief draw order (VPR1-15)", H['6.1'], "relief"),
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
    for name, lines, hdr in (('index', doc, r1.INDEX_HDR), ('part_a', rat, r1.PARTA_HDR)):
        h, last = r1.table_bounds(lines, hdr)
        ids = [m.group(1) for l in lines[h + 2:last + 1] for m in [r1.ROW_ID.match(l)] if m]
        if len(ids) != len(set(ids)):
            sys.exit(f'STOP — {name}: duplicate ids remain after the swap')
        log[name]['rows_after'] = len(ids)
        log[name]['id_set_sha256'] = sha('\n'.join(sorted(ids)))

    # 2. one-string substitutions, scope-checked
    texts = {'doc': '\n'.join(doc), 'rat': '\n'.join(rat)}
    subs = []
    for what, f, kind, scope, o, n in SUBS:
        t = texts[f]
        c = t.count(o)
        if c != 1:
            sys.exit(f'STOP — {what}: old string occurs {c} times')
        if n in t:
            sys.exit(f'STOP — {what}: new string already present')
        at = t.index(o)
        if kind == 'section':
            s, e = section_span(t, scope)
            if not (s <= at < e):
                sys.exit(f'STOP — {what}: old string lies outside {scope[:50]!r}')
        else:
            ls = t.rfind('\n', 0, at) + 1
            if not t[ls:].startswith(f'| {scope} |'):
                sys.exit(f'STOP — {what}: old string lies outside the row {scope}')
        line = t[:at].count('\n') + 1
        texts[f] = t[:at] + n + t[at + len(o):]
        subs.append(dict(item=what, file='document' if f == 'doc' else 'rationale', scope=scope, line=line, old=o, new=n))
    log['substitutions'] = subs

    # 3. checks, not applied
    checks = []
    t = texts['doc']
    for what, heading, needle in CHECKS:
        s, e = section_span(t, heading)
        c = norm(t[s:e]).count(norm(needle))
        if c != 1:
            sys.exit(f'STOP — {what}: present {c} times in {heading[:40]!r}')
        checks.append(dict(check=what, heading=heading, text=needle, state='SATISFIED (present once, whitespace-normalised)'))
    for what, heading, needle in SCOPE_TOGETHER:
        s, e = section_span(t, heading)
        c = norm(t[s:e]).count(norm(needle))
        if c < 1:
            sys.exit(f'STOP — {what}: absent from {heading[:40]!r}')
        checks.append(dict(check=what, heading=heading, text=needle, state=f'SATISFIED (present {c} times)'))
    log['checks'] = checks

    out_doc, out_rat = texts['doc'], texts['rat']
    log['output_doc_sha256'] = sha(out_doc)
    log['output_rationale_sha256'] = sha(out_rat)
    open(a.out_doc, 'w', encoding='utf-8').write(out_doc)
    open(a.out_rationale, 'w', encoding='utf-8').write(out_rat)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'index: {n1} restated rows swapped into place: {sorted(log["index"]["ids_swapped"])}; rows after {log["index"]["rows_after"]}')
    print(f'Part A: {n2} restated rows swapped into place: {sorted(log["part_a"]["ids_swapped"])}; rows after {log["part_a"]["rows_after"]}')
    print(f'index id set == Part A id set: {log["index"]["id_set_sha256"] == log["part_a"]["id_set_sha256"]}')
    for s_ in subs:
        print(f'substitution in the {s_["file"]} at l. {s_["line"]}: {s_["item"]}')
    for c_ in checks:
        print(f'check: {c_["check"][:90]} — {c_["state"]}')
    print(f'document {len(doc_text.encode())} -> {len(out_doc.encode())} bytes, {doc_text.count(chr(10))} -> {out_doc.count(chr(10))} lines, sha256 {log["output_doc_sha256"]}')
    print(f'rationale {len(rat_text.encode())} -> {len(out_rat.encode())} bytes, {rat_text.count(chr(10))} -> {out_rat.count(chr(10))} lines, sha256 {log["output_rationale_sha256"]}')


if __name__ == '__main__':
    main()
