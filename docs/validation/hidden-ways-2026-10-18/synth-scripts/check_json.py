#!/usr/bin/env python3
"""Independent check of draft-w.fragments.json against the targets: md5s, each old once at its line, in-order
application and byte-exact reversal on copies. Reads only the JSON and the targets."""
import hashlib, json, sys
ROOT = '/home/user/maps-architecture'
recs = json.load(open(f'{ROOT}/docs/validation/hidden-ways-2026-10-18/draft-w.fragments.json', encoding='utf-8'))
texts, bad = {}, []
for r in recs:
    f = r['file']
    if f not in texts: texts[f] = open(f'{ROOT}/{f}', encoding='utf-8').read()
    t = texts[f]
    if hashlib.md5(t.encode()).hexdigest() != r['md5']: bad.append(f"{r['id']}: md5 mismatch for {f}")
    n = t.count(r['old'])
    if n != 1: bad.append(f"{r['id']}: old occurs {n}×"); continue
    ln = t[:t.index(r['old'])].count('\n') + 1
    if ln != r['line']: bad.append(f"{r['id']}: old at line {ln}, stated {r['line']}")
work = dict(texts)
for r in recs:
    w = work[r['file']]
    if w.count(r['old']) != 1: bad.append(f"apply {r['id']}: old {w.count(r['old'])}×"); continue
    w = w.replace(r['old'], r['new'], 1)
    if w.count(r['new']) != 1: bad.append(f"apply {r['id']}: new {w.count(r['new'])}× after")
    work[r['file']] = w
applied = dict(work)
for r in reversed(recs):
    w = work[r['file']]
    if w.count(r['new']) != 1: bad.append(f"reverse {r['id']}: new {w.count(r['new'])}×"); continue
    work[r['file']] = w.replace(r['new'], r['old'], 1)
for f in texts:
    if work[f] != texts[f]: bad.append(f"reversal not byte-identical: {f}")
ids = [r['id'] for r in recs]
if len(set(ids)) != len(ids): bad.append('duplicate ids')
print('fragments:', len(recs), 'targets:', len(texts))
if bad: print('FAIL'); [print(' -', b) for b in bad]; sys.exit(1)
for f in texts: print(f, hashlib.md5(applied[f].encode()).hexdigest()[:8], len(applied[f].split('\n')), 'lines after application')
print('PASS: every old once at its line, md5s match, application clean, reversal byte-identical')
