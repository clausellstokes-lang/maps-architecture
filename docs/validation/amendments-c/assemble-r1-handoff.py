#!/usr/bin/env python3
"""assemble-r1-handoff.py (amendments-c) — the scripted assembler hand-off of repair round 1 of the bundled pass c + d + e
(lane amendments-c/assemble-r1, 2026-09-28). Stdlib only; never writes in place. Run it on the outputs of
apply-blocks.py. It reuses docs/validation/amendments-b/assemble-r1-handoff.py's block_rows and swap_restated unchanged
(imported), as the handfix assembler did.

usage:
  python3 assemble-r1-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --impact research/findings/code-impact.md \
      --out-doc OUT.md --out-rationale OUT-R.md --out-impact OUT-I.md --log LOG.json \
      --reports DIR BLOCKFILE [BLOCKFILE ...]

What it does, in this order (each step asserts its preconditions and stops on any surprise):
 1. RESTATED ROWS (every repair-r1 seat's hand-off: the determinism preamble (1), the kernel report §4 (1), the model
    report "Assembler hand-off" 1, the pipeline report §5 (1), the rendering report hand-off 1, the scope preamble (2)).
    For every id that occurs exactly twice in the document's judgment index or in Part A of the rationale file, the later
    row, which must be a row of one of the block files' J-ROWS / RATIONALE-A bodies, is moved into the older row's place
    and the older row deleted (swap_restated, unchanged). The swapped id sets must equal EXPECTED_INDEX /
    EXPECTED_PART_A below, or the script stops.
 2. P22-P24 (rendering report hand-off 3; scope preamble (1) and report §4 hand-off (1); route section C.3 (3) — the
    reader-tier provenance rows the repaired design cites at §8.4 (h) and §13.5). The three rows are taken verbatim from
    the fenced block of repair-rendering-r1-report.md (a transcription check: each row must be a line of that report) and
    appended to research/findings/code-impact.md section (d)'s table directly after its last row, which must be P21; no
    P22-P24 row may exist yet; every back-quoted source name of a row must occur in the reading its "reading §" cell names
    (code-ftg-client.md, code-neighbourhood.md, code-manor.md), and every section it names must be a heading there.
 3. ONE-STRING SUBSTITUTIONS (rendering report hand-offs 2, 4, 5 and 7): each old string must occur exactly once — in the
    document, inside its named subsection, or in the rationale file inside the named Part A row — and the new string must
    not be present yet. Hand-off 2 runs only after step 2 (it drops the clause saying the rows are still to be appended).
 4. HAND-OFF 6 (§13.2 T30-5) is CHECKED, not applied: scope's §13.2 REPLACE (VSC-08) already carries the aligned clause.
    The script asserts that the old clause is absent and the aligned clause present, and logs it as satisfied.
The log records every swap (old row, new row, positions), the appended rows and every substitution (line, old, new).
"""
import argparse, hashlib, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('r1handoff', os.path.join(HERE, '..', 'amendments-b', 'assemble-r1-handoff.py'))
r1 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(r1)

EXPECTED_INDEX = {
    'J-A67.61', 'J-A66.71', 'J-A76.72', 'J-A72.61',                   # determinism (preamble (1))
    'J-A65.31', 'J-A65.32',                                           # kernel (report §4 hand-off (1))
    'J-A68.21', 'J-A79.23',                                           # model (report hand-off 1)
    'J-A88.41', 'J-A65.48', 'J-A65.46', 'J-A81.41', 'J-A12.45',       # pipeline (report §5 (1))
    'J-A68.83', 'J-A68.84', 'J-A68.85', 'J-A68.87',                   # rendering (report hand-off 1)
}                                                                     # scope: none (its index rows are edited in place)
EXPECTED_PART_A = EXPECTED_INDEX | {
    'J-A65.47',                                                       # pipeline (Part A only)
    'J-A32.02', 'J-A50.01', 'J-A63.01',                               # scope (preamble (2); Part A only)
}

H13_2 = "### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT"
DOC_SUBS = [  # (hand-off, heading that must hold the old string, old, new) — repair-rendering-r1-report.md "Assembler hand-off"
    ("rendering 4 — §5.2 F-LIGHT: the last `ShadowPass` name (VRC-17)",
     "### 5.2 Failure classes: detection, ladder, test",
     "the vector `ShadowPass` with glow sprites",
     "the vector pass (§8.2's `shadowPass` program) with glow sprites"),
    ("rendering 5 — §13.4 pre-decided fallback: §8.4 (g)'s full-precision surface, no halved march (VRC-08)",
     "### 13.4 Visual regression, B-ZOOM and the app harness",
     "runs the pass\n  at full float precision with the march step halved and is re-measured",
     "takes §8.4 (g)'s full-precision surface\n  — the march unchanged — and is re-measured"),
    ("rendering 7 — §16 M2b exit: the re-declaration trigger at the re-summed pooled p50 (VRC-13; J-A72.82)",
     "## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2",
     "if its pooled p50 exceeds 48 ms",
     "if its pooled p50 exceeds 53 ms"),
]
RAT_SUBS = [  # (hand-off, Part A row id that must hold the old string, old, new)
    ("rendering 2 — Part A J-A68.86: the P-ids now exist (VRC-15)",
     'J-A68.86',
     "their P-ids (P22–P24) to be appended to the reader-tier provenance table before a cell cites them",
     "their P-ids P22–P24"),
]
H6_OLD = ("a `why` on the withheld place — and, on T63-2's front\n    fixture, on the front or anything its concealed use placed — "
          "answers at `public` naming the withheld place by its address\n    only, with `withheld: true`, a front from its own rows, and no rule")
H6_ALIGNED = ("a `why` on the withheld place answers at `public` with\n    its address and kind only, `withheld: true`, and no rule, input or "
              "alternative, and on T63-2's front fixture the front's\n    `why` is the front's own and a `why` on a concealed part answers empty")
P_IDS = ('P22', 'P23', 'P24')
READINGS = {'FTG client': 'code-ftg-client.md', 'NG': 'code-neighbourhood.md', 'FM': 'code-manor.md'}
IMPACT_HDR = re.compile(r'^\|\s*P-id\s*\|\s*idea as the design takes it\s*\|')
HEAD = re.compile(r'^(#{1,6})\s+\S')


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


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
        if fence is None and HEAD.match(l):
            L = len(l) - len(l.lstrip('#'))
            if start is None and l == heading:
                start, lvl = i, L
            elif start is not None and L <= lvl:
                return offs[start], offs[i]
    if start is None:
        sys.exit(f'STOP — heading {heading[:60]!r} not found')
    return offs[start], len(text)


def p_rows(report_path, findings_dir):
    """The P22-P24 rows, verbatim from the rendering report's fenced hand-off block, each checked against its reading."""
    lines = [l.strip() for l in open(report_path, encoding='utf-8').read().split('\n')]
    rows = []
    for pid in P_IDS:
        hit = [l for l in lines if l.startswith(f'| {pid} |')]
        if len(hit) != 1:
            sys.exit(f'STOP — {pid}: {len(hit)} rows in {report_path}')
        rows.append(hit[0])
    checks = []
    for r in rows:
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', r)[1:-1]]
        if len(cells) != 6:
            sys.exit(f'STOP — {r[:12]}: {len(cells)} cells, the table has 6')
        pid, _, build, src, where, aitem = cells
        reading = next((f for k, f in READINGS.items() if where.startswith(k)), None)
        if reading is None or aitem != '68':
            sys.exit(f'STOP — {pid}: reading cell {where!r} or A-item {aitem!r} unexpected')
        rtext = open(os.path.join(findings_dir, reading), encoding='utf-8').read()
        names = re.findall(r'`([^`]+)`', src)
        missing = [n for n in names if n not in rtext]
        heads = [l for l in rtext.split('\n') if HEAD.match(l)]
        secs = re.findall(r'§(\d+(?:\.\d+)*)', where)
        secs_missing = [s for s in secs if not any(re.match(r'^#+\s+§?' + re.escape(s) + r'(\s|$)', h) for h in heads)]
        if missing or secs_missing:
            sys.exit(f'STOP — {pid}: names {missing} or sections {secs_missing} not found in {reading}')
        checks.append(dict(id=pid, reading=reading, names_checked=names, sections_checked=secs))
    return rows, checks


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--doc', required=True)
    ap.add_argument('--rationale', required=True)
    ap.add_argument('--impact', required=True)
    ap.add_argument('--out-doc', required=True)
    ap.add_argument('--out-rationale', required=True)
    ap.add_argument('--out-impact', required=True)
    ap.add_argument('--log', required=True)
    ap.add_argument('--reports', required=True, help='the folder holding repair-rendering-r1-report.md')
    ap.add_argument('blockfiles', nargs='+')
    a = ap.parse_args()
    for p in (a.out_doc, a.out_rationale, a.out_impact):
        if os.path.abspath(p) in (os.path.abspath(a.doc), os.path.abspath(a.rationale), os.path.abspath(a.impact)):
            sys.exit('STOP — never writes in place')
    doc_text = open(a.doc, encoding='utf-8').read()
    rat_text = open(a.rationale, encoding='utf-8').read()
    imp_text = open(a.impact, encoding='utf-8').read()
    doc, rat = doc_text.split('\n'), rat_text.split('\n')
    rows = r1.block_rows(a.blockfiles)
    log = dict(input_doc_sha256=sha(doc_text), input_rationale_sha256=sha(rat_text), input_impact_sha256=sha(imp_text))

    # 1. restated rows
    n1 = r1.swap_restated(doc, r1.INDEX_HDR, rows['J-ROWS'], 'index', log)
    n2 = r1.swap_restated(rat, r1.PARTA_HDR, rows['RATIONALE-A'], 'part_a', log)
    got_i, got_a = set(log['index']['ids_swapped']), set(log['part_a']['ids_swapped'])
    if got_i != EXPECTED_INDEX or got_a != EXPECTED_PART_A:
        sys.exit(f'STOP — swapped ids differ from the hand-offs: index extra {sorted(got_i - EXPECTED_INDEX)} missing '
                 f'{sorted(EXPECTED_INDEX - got_i)}; Part A extra {sorted(got_a - EXPECTED_PART_A)} missing {sorted(EXPECTED_PART_A - got_a)}')

    # 2. P22-P24 into code-impact.md section (d)
    report = os.path.join(a.reports, 'repair-rendering-r1-report.md')
    prow, pchecks = p_rows(report, os.path.dirname(os.path.abspath(a.impact)))
    imp = imp_text.split('\n')
    hs = [i for i, l in enumerate(imp) if IMPACT_HDR.match(l)]
    if len(hs) != 1:
        sys.exit(f'STOP — code-impact.md: the P table header found {len(hs)} times')
    j = hs[0] + 1
    while j + 1 < len(imp) and imp[j + 1].startswith('|'):
        j += 1
    ids = [m.group(1) for l in imp[hs[0] + 2:j + 1] for m in [r1.ROW_ID.match(l)] if m]
    if ids[-1] != 'P21' or any(p in ids for p in P_IDS) or any(re.search(r'\|\s*' + p + r'\s*\|', imp_text) for p in P_IDS):
        sys.exit(f'STOP — code-impact.md: last row {ids[-1]!r}, or a P22-P24 row already present')
    imp[j + 1:j + 1] = prow
    out_imp = '\n'.join(imp)
    log['p_rows'] = dict(inserted_after_line=j + 1, rows=prow, checks=pchecks, table_rows_before=len(ids), table_rows_after=len(ids) + 3)

    # 3. one-string substitutions
    text = '\n'.join(doc)
    subs = []
    for what, heading, o, n in DOC_SUBS:
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
        text = text[:at] + n + text[at + len(o):]
        subs.append(dict(item=what, file='document', heading=heading, line=line, old=o, new=n))
    rtext = '\n'.join(rat)
    for what, rid, o, n in RAT_SUBS:
        c = rtext.count(o)
        if c != 1:
            sys.exit(f'STOP — {what}: old string occurs {c} times in the rationale')
        if n in rtext:
            sys.exit(f'STOP — {what}: new string already present')
        at = rtext.index(o)
        ls = rtext.rfind('\n', 0, at) + 1
        if not rtext[ls:].startswith(f'| {rid} |'):
            sys.exit(f'STOP — {what}: old string lies outside the Part A row {rid}')
        line = rtext[:at].count('\n') + 1
        rtext = rtext[:at] + n + rtext[at + len(o):]
        subs.append(dict(item=what, file='rationale', row=rid, line=line, old=o, new=n))
    log['substitutions'] = subs

    # 4. hand-off 6: checked, not applied
    s, e = section_span(text, H13_2)
    if text.count(H6_OLD) != 0 or text.count(H6_ALIGNED) != 1 or not (s <= text.index(H6_ALIGNED) < e):
        sys.exit('STOP — hand-off 6: the old T30-5 clause is present, or the aligned clause is not once in §13.2')
    log['handoff_6'] = dict(state='SATISFIED by scope\'s §13.2 REPLACE (VSC-08); nothing applied',
                            line=text[:text.index(H6_ALIGNED)].count('\n') + 1, aligned=H6_ALIGNED)

    log['output_doc_sha256'] = sha(text)
    log['output_rationale_sha256'] = sha(rtext)
    log['output_impact_sha256'] = sha(out_imp)
    open(a.out_doc, 'w', encoding='utf-8').write(text)
    open(a.out_rationale, 'w', encoding='utf-8').write(rtext)
    open(a.out_impact, 'w', encoding='utf-8').write(out_imp)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'index: {n1} restated rows swapped into place: {sorted(log["index"]["ids_swapped"])}')
    print(f'Part A: {n2} restated rows swapped into place: {sorted(log["part_a"]["ids_swapped"])}')
    print(f'code-impact.md: {len(prow)} rows appended after l. {j + 1} ({", ".join(P_IDS)}); names and sections checked against the readings')
    for s_ in subs:
        print(f'substitution in the {s_["file"]} at l. {s_["line"]}: {s_["item"]}')
    print(f'hand-off 6: {log["handoff_6"]["state"]} (l. {log["handoff_6"]["line"]})')
    print(f'document {len(doc_text.encode())} -> {len(text.encode())} bytes, {doc_text.count(chr(10))} -> {text.count(chr(10))} lines, sha256 {log["output_doc_sha256"]}')
    print(f'rationale {len(rat_text.encode())} -> {len(rtext.encode())} bytes, {rat_text.count(chr(10))} -> {rtext.count(chr(10))} lines, sha256 {log["output_rationale_sha256"]}')
    print(f'code-impact {len(imp_text.encode())} -> {len(out_imp.encode())} bytes, {imp_text.count(chr(10))} -> {out_imp.count(chr(10))} lines, sha256 {log["output_impact_sha256"]}')


if __name__ == '__main__':
    main()
