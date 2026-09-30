#!/usr/bin/env python3
"""handfix-apply.py — lane handfix-c/apply (2026-09-28; opus mechanical seat, PENDING FABLE REVIEW).

Applies the 59 data rows of closing-handfix-rows.py (this folder) with the engine of
docs/validation/amendments-b/handfix/handfix.py (H.locate, H.apply_one — every single space of an anchor also matches
ONE soft line break with its indentation). The rows and the engine are imported, never copied or rewritten. Unlike the
rows file's own dry run (which refuses to write when any row fails), a row whose anchor is not found exactly once — on
the original file AND on the evolving text — is SKIPPED and recorded, and the run continues.

Checks: (1) the input sha256 equals the rows file's EXPECT_DOC / EXPECT_RAT; (2) per row, before writing, the anchor
count on the original and on the evolving text is exactly 1; (3) per row, right after applying, the new text occurs
exactly once (whitespace-normalised, as the rows file counts it); (4) after all rows, every applied text is re-counted
in the final result (whitespace-normalised and by the engine's soft-break pattern), exactly once each.

Writes ONLY the files named by --out-doc / --out-rationale / --log (scratch copies); never a live design file.
usage (from the project root):
  python3 docs/validation/amendments-c/handfix-apply.py --out-doc D --out-rationale R --log L
"""
import argparse, importlib.util, json, os, re, sys

ROOT = os.getcwd()
spec = importlib.util.spec_from_file_location('closing_rows', os.path.join(ROOT, 'docs/validation/amendments-c/closing-handfix-rows.py'))
M = importlib.util.module_from_spec(spec); spec.loader.exec_module(M)
H, R = M.H, M.R
LIVE = {'doc': os.path.realpath(M.DOC), 'rat': os.path.realpath(M.RAT)}


def ws(s):
    return re.sub(r'\s+', ' ', s)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out-doc', required=True); ap.add_argument('--out-rationale', required=True); ap.add_argument('--log', required=True)
    a = ap.parse_args()
    for p in (a.out_doc, a.out_rationale, a.log):
        if os.path.realpath(p) in LIVE.values():
            sys.exit(f'refused: {p} is a live design file')
    src = {'doc': open(M.DOC, encoding='utf-8').read(), 'rat': open(M.RAT, encoding='utf-8').read()}
    if H.sha(src['doc']) != M.EXPECT_DOC or H.sha(src['rat']) != M.EXPECT_RAT:
        sys.exit('STOP: input hashes differ from the rows file\'s EXPECT_DOC / EXPECT_RAT')
    cur = dict(src)
    log = dict(input={f: dict(sha256=H.sha(t), bytes=len(t.encode()), newlines=t.count('\n')) for f, t in src.items()},
               rows=[], problems=[])
    for i, r in enumerate(R, 1):
        rec = dict(i=i, n=r['n'], id=r['id'], owner=r['owner'], sub=r['sub'], file=r['file'], kind=r['kind'], scope=r['scope'])
        n0, _ = H.locate(src[r['file']], r)
        n1, ms = H.locate(cur[r['file']], r)
        rec['anchor_count_original'], rec['anchor_count_evolving'] = n0, n1
        if n0 != 1 or n1 != 1:
            rec['state'] = 'SKIPPED'; rec['why'] = f'anchor found {n0} time(s) on the original, {n1} on the evolving text'
            log['rows'].append(rec); continue
        rec['at_line'] = H.line_of(cur[r['file']], ms[0][0]) + 1
        rec['heading'], rec['top'] = H.heading_at(cur[r['file']], ms[0][0])
        cur[r['file']], note = H.apply_one(cur[r['file']], r, ms[0])
        if note: rec['note'] = note
        rec['new_text_count_after_row'] = ws(cur[r['file']]).count(ws(r['text'].strip()))
        rec['state'] = 'applied' if rec['new_text_count_after_row'] == 1 else 'APPLIED-BUT-COUNT'
        if rec['state'] != 'applied':
            log['problems'].append(f"row {i} ({r['id']} {r['sub']}): new text found {rec['new_text_count_after_row']} times right after applying")
        log['rows'].append(rec)
    for rec, r in zip(log['rows'], R):
        if rec['state'].startswith('APPLIED') or rec['state'] == 'applied':
            rec['final_ws_count'] = ws(cur[r['file']]).count(ws(r['text'].strip()))
            rec['final_flex_count'] = len(H.flex(r['text'].strip()).findall(cur[r['file']]))
            if rec['final_ws_count'] != 1 or rec['final_flex_count'] != 1:
                log['problems'].append(f"row {rec['i']} ({r['id']} {r['sub']}): final count ws={rec['final_ws_count']} flex={rec['final_flex_count']}")
    log['output'] = {f: dict(sha256=H.sha(t), bytes=len(t.encode()), newlines=t.count('\n')) for f, t in cur.items()}
    st = [x['state'] for x in log['rows']]
    log['summary'] = dict(rows=len(R), applied=st.count('applied'), skipped=st.count('SKIPPED'),
                          applied_but_count=st.count('APPLIED-BUT-COUNT'), problems=len(log['problems']))
    open(a.out_doc, 'w', encoding='utf-8').write(cur['doc'])
    open(a.out_rationale, 'w', encoding='utf-8').write(cur['rat'])
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for x in log['rows']:
        print(f"{x['state']:<8} {x['i']:>2} #{x['n']:<2} {x['id'][:24]:<24} {x['sub'][:52]:<52} l.{x.get('at_line', '-')} "
              f"a={x['anchor_count_original']}/{x['anchor_count_evolving']} new={x.get('new_text_count_after_row', '-')} "
              f"final={x.get('final_ws_count', '-')}/{x.get('final_flex_count', '-')}{'  ' + x['note'] if x.get('note') else ''}{'  ' + x['why'] if x.get('why') else ''}")
    for p in log['problems']: print('PROBLEM', p)
    print('summary', json.dumps(log['summary']))
    for f in ('doc', 'rat'):
        print(f"{f}: {log['input'][f]['bytes']} -> {log['output'][f]['bytes']} bytes, sha256 {log['output'][f]['sha256']}")
    sys.exit(1 if log['problems'] else 0)


if __name__ == '__main__':
    main()
