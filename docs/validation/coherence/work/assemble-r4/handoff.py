#!/usr/bin/env python3
"""handoff.py (coherence/assemble-r4, P3b) — the scripted hand-offs the repair-r4 files address to the assembler (their
NOTES FOR ASSEMBLE, brief ROUND-4 NOTES (9) (a)), applied to a copy of apply.py's outputs (scratch asm4/out -> asm4/final;
out/ stays the 'new' copy of the three-copy method). Each is applied exactly as its note writes it, by the seat's own script,
run unchanged (each stops unless every id it swaps occurs exactly twice in its table):
 (1) pipeline's NOTE FOR ASSEMBLE: the RATIONALE-A row restates J-A81.41's Part A entry (its index row unchanged) —
     work/repair-pipeline-r4/swap_restated.py RATIONALE_IN RATIONALE_OUT ("Independent of any other seat's swap");
 (2) rendering's NOTE FOR ASSEMBLE: the J-ROWS block restates J-A121.02's judgment-index row and the RATIONALE-A block the
     Part A entries of J-A68.85, J-A68.89 and J-A68.90 — work/repair-rendering-r4/swap_restated.py BASE RATIONALE BASE_OUT
     RATIONALE_OUT.
The two touch disjoint ids, and each puts the appended row in its older row's place and deletes the appended row, so their
order does not change the result; they run in the round's name order (pipeline, rendering).
After both: the judgment index and Part A must hold one id set, no duplicate in either, no id removed; each restated id stands
on its older row's line (Part A exactly; the index moved only by the base REPLACE blocks above it), carrying the block's row.
CHECKS (no output): each base seat's recorded stand-alone dry run is reproduced on the untouched copies and compared with
what its header records (determinism: result sha256 6f7048f1a2f9f949…; kernel: base 2ecdccd9…, rationale unchanged e7b59eac…;
model: 22 731 -> 22 781 lines, rationale byte-identical; pipeline: 22 731 -> 22 788 lines, then its swap 'J-A81.41 l. 639 <-
l. 852', Part A 805 rows; rendering: with its swap, 'index l. 22706 <- l. 22714; Part A l. 685, 689, 772 <- l. 852', index 805,
Part A 805; scope: 6 found, 6 applied, rationale untouched). Writes handoff.json beside it."""
import hashlib, json, os, re, shutil, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r4')
WK = os.path.join(ROOT, 'docs/validation/coherence/work')
AB = os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm4'
BEFORE, OUT, FIN, TMP = f'{SCR}/before', f'{SCR}/out', f'{SCR}/final', f'{SCR}/handoff-tmp'
BASE, RAT = 'docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'
h = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
for d in (FIN, TMP):
    if os.path.exists(d): shutil.rmtree(d)
shutil.copytree(OUT, FIN); os.makedirs(TMP)
log = dict(swaps=[], checks={}, carried_unchanged=[])
# a live file no block routes to (this round: INDEX.md) is carried into final/ unchanged from the untouched copy
for f in json.load(open(f'{W}/snapshot.json'))['files']:
    if not os.path.exists(f'{FIN}/{f["path"]}'):
        os.makedirs(os.path.dirname(f'{FIN}/{f["path"]}'), exist_ok=True)
        shutil.copyfile(f'{BEFORE}/{f["path"]}', f'{FIN}/{f["path"]}')
        log['carried_unchanged'].append(f['path'])


def run(cmd, label):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f'STOP — {label}: exit {r.returncode}\n{r.stdout}\n{r.stderr}')
    return r.stdout


b0, r0 = f'{FIN}/{BASE}', f'{FIN}/{RAT}'
# (1) pipeline — rationale only
r1 = f'{TMP}/rat-pipeline.md'
o = run(['python3', f'{WK}/repair-pipeline-r4/swap_restated.py', r0, r1], 'pipeline swap')
log['swaps'].append(dict(note='repair-r4-pipeline.md, NOTE FOR ASSEMBLE (J-A81.41, Part A only)', script='work/repair-pipeline-r4/swap_restated.py',
                         stdout=o.strip().split('\n'), rationale_sha256=h(r1)))
shutil.copyfile(r1, r0)
# (2) rendering — base and rationale
bo, ro = f'{TMP}/base-rendering.md', f'{TMP}/rat-rendering.md'
o = run(['python3', f'{WK}/repair-rendering-r4/swap_restated.py', b0, r0, bo, ro], 'rendering swap')
log['swaps'].append(dict(note='repair-r4-rendering.md, NOTE FOR ASSEMBLE (J-A121.02 in the judgment index; J-A68.85, J-A68.89, J-A68.90 in Part A)',
                         script='work/repair-rendering-r4/swap_restated.py', stdout=o.strip().split('\n'), base_sha256=h(bo), rationale_sha256=h(ro)))
shutil.copyfile(bo, b0); shutil.copyfile(ro, r0)


def ids(lines, a, b):
    return [m.group(1) for l in lines[a:b] for m in [re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)] if m]


def bounds(bl, rl):
    a = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls')); b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
    pa = next(i for i, l in enumerate(rl) if l.startswith('## Part A')); pb = next(i for i, l in enumerate(rl) if l.startswith('## Part B'))
    return a, b, pa, pb


bl = open(b0, encoding='utf-8').read().split('\n'); rl = open(r0, encoding='utf-8').read().split('\n')
a, b, pa, pb = bounds(bl, rl)
bi, ri = ids(bl, a, b), ids(rl, pa, pb)
bl0 = open(f'{BEFORE}/{BASE}', encoding='utf-8').read().split('\n'); rl0 = open(f'{BEFORE}/{RAT}', encoding='utf-8').read().split('\n')
a0, b0_, pa0, pb0 = bounds(bl0, rl0)
bi0, ri0 = ids(bl0, a0, b0_), ids(rl0, pa0, pb0)
log['checks']['ids'] = dict(index_before=len(bi0), part_a_before=len(ri0), index_after=len(bi), part_a_after=len(ri),
                            index_duplicates=sorted({i for i in bi if bi.count(i) > 1}), part_a_duplicates=sorted({i for i in ri if ri.count(i) > 1}),
                            one_id_set=(set(bi) == set(ri)), only_in_index=sorted(set(bi) - set(ri)), only_in_part_a=sorted(set(ri) - set(bi)),
                            new_ids=sorted(set(bi) - set(bi0)), removed_ids=sorted(set(bi0) - set(bi)),
                            index_order_unchanged=(bi == bi0), part_a_order_unchanged=(ri == ri0))
c = log['checks']['ids']
if c['index_duplicates'] or c['part_a_duplicates'] or not c['one_id_set'] or c['removed_ids']:
    sys.exit(f'STOP — id sets after the swaps: {c}')

# each restated row: where it stood before, where it stands now, and that it now carries the block's row (the new text)
blk = {}
for f in ('repair-r4-pipeline.md', 'repair-r4-rendering.md'):
    for l in open(f'{W}/split/base/{f}', encoding='utf-8').read().split('\n'):
        m = re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)
        if m: blk.setdefault(m.group(1), []).append((f, l))


def at(lines, s, e, rid):
    return [i for i in range(s, e) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', lines[i])]


pos = {}
for rid, table in (('J-A81.41', 'part_a'), ('J-A121.02', 'index'), ('J-A68.85', 'part_a'), ('J-A68.89', 'part_a'), ('J-A68.90', 'part_a')):
    if table == 'index':
        before, after, L0, L1 = at(bl0, a0, b0_, rid), at(bl, a, b, rid), bl0, bl
    else:
        before, after, L0, L1 = at(rl0, pa0, pb0, rid), at(rl, pa, pb, rid), rl0, rl
    rows = [x[1] for x in blk.get(rid, [])]
    ok = (len(before) == 1 and len(after) == 1 and len(rows) == 1 and L1[after[0]] == rows[0] and L0[before[0]] != rows[0])
    pos[rid] = dict(table=table, line_before=before[0] + 1 if before else None, line_after=after[0] + 1 if after else None,
                    carries_block_row=bool(rows) and len(after) == 1 and L1[after[0]] == rows[0], old_row_differs=bool(rows) and L0[before[0]] != rows[0],
                    block=[x[0] for x in blk.get(rid, [])], ok=ok)
    if not ok:
        sys.exit(f'STOP — restated row {rid}: {pos[rid]}')
if pos['J-A81.41']['line_before'] != pos['J-A81.41']['line_after'] or any(pos[r]['line_before'] != pos[r]['line_after'] for r in ('J-A68.85', 'J-A68.89', 'J-A68.90')):
    sys.exit(f'STOP — a Part A restated row moved: {pos}')
log['checks']['restated_positions'] = pos
# the rationale differs from the untouched one only on the four restated lines
diff = [i + 1 for i, (x, y) in enumerate(zip(rl0, rl)) if x != y]
log['checks']['rationale_changed_lines'] = diff if len(rl0) == len(rl) else f'line count {len(rl0)} -> {len(rl)}'

# CHECKS — the base seats' recorded stand-alone dry runs, reproduced on the untouched copies
alone = {}
for unit in ('determinism', 'kernel', 'model', 'pipeline', 'rendering', 'scope'):
    kb, kr, kl = f'{TMP}/{unit}-alone-base.md', f'{TMP}/{unit}-alone-rat.md', f'{TMP}/{unit}-alone.json'
    out = run(['python3', AB, '--doc', f'{BEFORE}/{BASE}', '--rationale', f'{BEFORE}/{RAT}', '--out-doc', kb, '--out-rationale', kr,
               '--log', kl, f'{W}/split/base/repair-r4-{unit}.md'], f'{unit} alone')
    lg = json.load(open(kl, encoding='utf-8')); ck = lg['checks']
    bad = [x for x in lg['audit']['blocks'] if not x['state'].startswith(('OK', 'CARRIED', 'SUPERSEDED'))]
    rec = dict(found=ck['blocks_total'], applied=ck['blocks_applied'], skipped=ck['blocks_skipped'], audit_not_ok=len(bad),
               headings=[ck['headings_before'], ck['headings_after']], lines=[ck['doc_lines_before'], ck['doc_lines_after']],
               base_sha256=h(kb), rationale_unchanged=(open(kr, 'rb').read() == open(f'{BEFORE}/{RAT}', 'rb').read()))
    if unit == 'pipeline':
        so = run(['python3', f'{WK}/repair-pipeline-r4/swap_restated.py', kr, kr + '.s'], 'pipeline alone swap')
        rec['swap'] = so.strip().split('\n')
    if unit == 'rendering':
        so = run(['python3', f'{WK}/repair-rendering-r4/swap_restated.py', kb, kr, kb + '.s', kr + '.s'], 'rendering alone swap')
        rec['swap'] = so.strip().split('\n')
    alone[unit] = rec
rec_exp = {
    'determinism': ('result sha256 6f7048f1a2f9f949…', lambda r: r['base_sha256'].startswith('6f7048f1a2f9f949') and r['rationale_unchanged']),
    'kernel': ('base sha256 2ecdccd9…, rationale unchanged (e7b59eac…)', lambda r: r['base_sha256'].startswith('2ecdccd9') and r['rationale_unchanged']),
    'model': ('document 22 731 → 22 781 lines; rationale byte-identical', lambda r: r['lines'] == [22731, 22781] and r['rationale_unchanged']),
    'pipeline': ('document 22 731 → 22 788 lines; swap J-A81.41 l. 639 ← l. 852; Part A 805 rows, 0 duplicates',
                 lambda r: r['lines'] == [22731, 22788] and 'J-A81.41: l. 639 <- l. 852' in r['swap'] and 'Part A rows 805 duplicates []' in r['swap']),
    'rendering': ('index l. 22706 ← l. 22714; Part A l. 685, 689, 772 ← l. 852; index 805, Part A 805, no duplicate',
                  lambda r: any('J-A121.02: l. 22706 <- l. 22714' in x for x in r['swap']) and
                  all(any(f'{i}: l. {n} <- l. 852' in x for x in r['swap']) for i, n in (('J-A68.85', 685), ('J-A68.89', 689), ('J-A68.90', 772))) and
                  'judgment index rows 805 duplicates []' in r['swap'] and 'Part A rows 805 duplicates []' in r['swap']),
    'scope': ('6 found, 6 applied, 0 skipped, audit not-OK 0, headings 153 → 153, the rationale untouched',
              lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok']) == (6, 6, 0, 0) and r['headings'] == [153, 153] and r['rationale_unchanged']),
}
for u, (txt, f) in rec_exp.items():
    alone[u]['recorded'] = txt
    alone[u]['equals_recorded'] = bool(f(alone[u]))
log['checks']['alone'] = alone

paths = [BASE, RAT]
log['final_sha256'] = {p: h(f'{FIN}/{p}') for p in paths}
log['out_equals_final'] = {p: open(f'{OUT}/{p}', 'rb').read() == open(f'{FIN}/{p}', 'rb').read() for p in paths}
json.dump(log, open(f'{W}/handoff.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for s in log['swaps']:
    print('SWAP', s['note']); [print('    ', x) for x in s['stdout']]
print('ids', json.dumps(c))
print('restated positions', json.dumps(pos))
print('rationale changed lines', log['checks']['rationale_changed_lines'])
for u, r in alone.items():
    print(f"alone {u:<12} found {r['found']} applied {r['applied']} skipped {r['skipped']} audit {r['audit_not_ok']} lines {r['lines']} "
          f"sha {r['base_sha256'][:16]} rat-unchanged {r['rationale_unchanged']} equals-recorded {r['equals_recorded']}" + (f" swap {r['swap']}" if 'swap' in r else ''))
for p, x in log['final_sha256'].items(): print(f'{p:<40} {x[:16]}')
