#!/usr/bin/env python3
"""hidden-ways/apply: apply draft-w.fragments.json IN ORDER to the five live targets.
Usage: apply_w.py ROOT OUT_JSON [--live]
Without --live, works on in-memory copies only (the dry run: the expected after-md5s).
Before each fragment: its new must not already occur (else it is counted as already applied, resume rule) and
its old must occur exactly once in the target as it now stands; then old -> new once, the new checked once after,
the line it landed at recorded. Live: each target written after each fragment. Stops at the first failure."""
import hashlib, json, sys
ROOT, OUT = sys.argv[1], sys.argv[2]
LIVE = '--live' in sys.argv
recs = json.load(open(f'{ROOT}/docs/validation/hidden-ways-2026-10-18/draft-w.fragments.json', encoding='utf-8'))
md5 = lambda s: hashlib.md5(s.encode('utf-8')).hexdigest()
texts, before = {}, {}
for r in recs:
    f = r['file']
    if f not in texts:
        texts[f] = open(f'{ROOT}/{f}', encoding='utf-8', newline='').read()
        before[f] = md5(texts[f])
rows, failure = [], None
for r in recs:
    f, t = r['file'], texts[r['file']]
    nn, no = t.count(r['new']), t.count(r['old'])
    if nn == 1 and not (no == 1 and r['new'].count(r['old']) == 1 and r['new'] == r['old']):
        # new already present: applied by an earlier run (only legitimate on resume)
        ln = t[:t.index(r['new'])].count('\n') + 1
        rows.append({'id': r['id'], 'file': f, 'line': ln, 'ok': 'already'}); continue
    if nn != 0:
        failure = f"{r['id']}: new occurs {nn}x before application"; break
    if no != 1:
        failure = f"{r['id']}: old occurs {no}x in {f} as it now stands"; break
    pos = t.index(r['old'])
    ln = t[:pos].count('\n') + 1
    t2 = t[:pos] + r['new'] + t[pos + len(r['old']):]
    if t2.count(r['new']) != 1 or t2.index(r['new']) != pos:
        failure = f"{r['id']}: new not exactly once at its place after application"; break
    texts[f] = t2
    if LIVE:
        with open(f'{ROOT}/{f}', 'w', encoding='utf-8', newline='') as h: h.write(t2)
    rows.append({'id': r['id'], 'file': f, 'line': ln, 'stated': r['line'], 'ok': 'ok'})
after = {f: md5(t) for f, t in texts.items()}
lines = {f: t.count('\n') for f, t in texts.items()}
final = []
if failure is None:
    for r in recs:
        t = texts[r['file']]
        final.append({'id': r['id'], 'newCount': t.count(r['new']),
                      'oldOutsideNew': t.count(r['old']) - r['new'].count(r['old'])})
json.dump({'live': LIVE, 'failure': failure, 'before': before, 'after': after, 'lines': lines,
           'rows': rows, 'final': final}, open(OUT, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print('live' if LIVE else 'dry', 'applied', sum(x['ok'] == 'ok' for x in rows), 'already',
      sum(x['ok'] == 'already' for x in rows), 'of', len(recs))
print('FAILURE:', failure) if failure else print('no failure')
for f in texts: print(f, before[f][:8], '->', after[f][:8], lines[f], 'lines')
if final:
    print('new exactly once:', sum(x['newCount'] == 1 for x in final), '/', len(final))
    bad = [x for x in final if x['oldOutsideNew'] != 0]
    print('old left outside its own new:', len(bad), [ (x['id'], x['oldOutsideNew']) for x in bad])
sys.exit(1 if failure else 0)
