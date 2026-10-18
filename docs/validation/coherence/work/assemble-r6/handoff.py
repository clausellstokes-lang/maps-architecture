#!/usr/bin/env python3
"""handoff.py (coherence/assemble-r6, P3b) — the scripted hand-offs the repair-r6 files address to the assembler (brief
ROUND-6 NOTES (9) (a)), applied to a copy of apply.py's outputs (scratch asm6/out -> asm6/final; out/ stays the 'new'
copy of the three-copy method), and the checks of the base seats' recorded stand-alone dry runs.

The census of the seventeen headers finds ONE note addressed to Assemble — repair-r6-scope's NOTE FOR ASSEMBLE:
 (1) restated rows (assemble-r1's swap rule): the J-ROWS block restates the judgment-index row of J-A67.45 and the
     RATIONALE-A block its Part A entry; after every block file is applied, each appended row takes its older row's place
     and the older row is deleted — "the logic of work/repair-scope-r3/swap_restated.py with IDS = ['J-A67.45']": run here
     as work/assemble-r6/swap_restated.py (that script copied, its IDS and docstring changed, nothing else); it stops unless
     J-A67.45 occurs exactly twice in the base's judgment index and exactly twice in the rationale's Part A;
 (2) six proposed allow rows — reviewed and written by allowrows.py (P5), not here.
Pipeline's HAND-OFF 1 (the same Part A entry, "swapped into the older row's place as assemble-r1's rule does") is the row
(1) swaps; nothing more is owed to it. No other header asks the assembler for anything (no title-block change, no other
restated row).
After (1): the judgment index and Part A must hold one id set, 805 rows each, no duplicate; their orders unchanged; every
index row but J-A67.45's and every rationale line but J-A67.45's Part A entry byte-identical to the untouched copies.

CHECKS (no output): each base seat's recorded stand-alone dry run is reproduced on the untouched copies and compared with
what its header records:
  determinism: 6 applied, 0 skipped, audit 0 not OK, headings 153 -> 153, fences balanced, title block unchanged; the diff
               confined to l. 9244, 9247, 9257, 9289, 10357, 10443-10460, 10587, 10630-10633, 10708-10719, 10883, 11228,
               11825, 12068-12069 of the live base; combined with model, pipeline, rendering and scope: 31 blocks applied,
               audit OK, no two files replace one subsection;
  model:       3 applied, 0 skipped, audit OK, headings 153 -> 153, fences 140 -> 140 balanced, title block unchanged; diff
               confined to l. 556, 2292, 2317, 2503-2523, 2537-2628, 2638-2649, 3140 of the live base;
  pipeline:    9 found, 9 applied, 0 skipped, audit 0 not OK, headings 153 -> 153, fences 140 -> 140 balanced, title block
               unchanged; 23 029 -> 22 972 lines, 3 019 440 -> 3 019 888 bytes; rationale unchanged (805 = 805, no
               duplicate); 25 hunks; combined with model and rendering: 20 found, 20 applied, 0 skipped, audit 0;
  rendering:   8 found, 8 applied, 0 skipped, audit not OK 0, headings 153 -> 153, fences balanced, title block unchanged,
               the rationale byte-identical; with repair-r6-pipeline and repair-r6-scope: the same;
  scope:       5 found, 5 applied, 0 skipped, audit not-OK 0 (two DUPLICATE ID notes for J-A67.45), headings 153 -> 153,
               fences 140 -> 140 balanced, title block unchanged; 23 029 -> 23 087 lines (23 086 after the swap), rationale
               2 386 -> 2 387 (2 386); the swap: index l. 22799 <- l. 23020, Part A l. 631 <- l. 852; 805 = 805, one id
               set, no duplicate.
Writes handoff.json beside it."""
import difflib, hashlib, json, os, re, shutil, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r6')
AB = os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py')
SWAP = os.path.join(W, 'swap_restated.py')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm6'
BEFORE, OUT, FIN, TMP = f'{SCR}/before', f'{SCR}/out', f'{SCR}/final', f'{SCR}/handoff-tmp'
BASE, RAT = 'docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'
SPLIT = f'{W}/split/base'
h = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
for d in (FIN, TMP):
    if os.path.exists(d): shutil.rmtree(d)
shutil.copytree(OUT, FIN); os.makedirs(TMP)
log = dict(swaps=[], notes_for_assemble=['repair-r6-scope.md: NOTE FOR ASSEMBLE (1) — the J-A67.45 swap, here',
                                         'repair-r6-scope.md: NOTE FOR ASSEMBLE (2) — six proposed allow rows, P5 (allowrows.py)'],
           checks={}, carried_unchanged=[])
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


# (1) the swap, on the combined output (FIN), written back over FIN
b0, r0 = f'{FIN}/{BASE}', f'{FIN}/{RAT}'
bo, ro = f'{TMP}/swap-base.md', f'{TMP}/swap-rat.md'
o = run(['python3', SWAP, b0, r0, bo, ro], 'scope swap')
log['swaps'].append(dict(note='repair-r6-scope.md, NOTE FOR ASSEMBLE (1) (J-A67.45, judgment index and Part A)',
                         script='work/assemble-r6/swap_restated.py (work/repair-scope-r3/swap_restated.py with IDS = [\'J-A67.45\'])',
                         before_base_sha256=h(b0), before_rationale_sha256=h(r0),
                         stdout=o.strip().split('\n'), base_sha256=h(bo), rationale_sha256=h(ro)))
shutil.copyfile(bo, b0); shutil.copyfile(ro, r0)


def ids(lines, a, b):
    return [m.group(1) for l in lines[a:b] for m in [re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)] if m]


def bounds(bl, rl):
    a = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls')); b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
    pa = next(i for i, l in enumerate(rl) if l.startswith('## Part A')); pb = next(i for i, l in enumerate(rl) if l.startswith('## Part B'))
    return a, b, pa, pb


rd = lambda p: open(p, encoding='utf-8').read().split('\n')
bl, rl = rd(f'{FIN}/{BASE}'), rd(f'{FIN}/{RAT}')
bl0, rl0 = rd(f'{BEFORE}/{BASE}'), rd(f'{BEFORE}/{RAT}')
a, b, pa, pb = bounds(bl, rl); a0, b0_, pa0, pb0 = bounds(bl0, rl0)
bi, ri, bi0, ri0 = ids(bl, a, b), ids(rl, pa, pb), ids(bl0, a0, b0_), ids(rl0, pa0, pb0)
SW = 'J-A67.45'
rows = lambda L, x, y: [l for l in L[x:y] if l.startswith('| J-')]
idx_now, idx_old = rows(bl, a, b), rows(bl0, a0, b0_)
row_of = lambda R, rid: [l for l in R if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', l)]
rl_diff = [(i + 1, x, y) for i, (x, y) in enumerate(zip(rl0, rl)) if x != y]
c = log['checks']['ids'] = dict(
    index_before=len(bi0), part_a_before=len(ri0), index_after=len(bi), part_a_after=len(ri),
    index_duplicates=sorted({i for i in bi if bi.count(i) > 1}), part_a_duplicates=sorted({i for i in ri if ri.count(i) > 1}),
    one_id_set=(set(bi) == set(ri)), id_set_unchanged=(set(bi) == set(bi0)), index_order_unchanged=(bi == bi0), part_a_order_unchanged=(ri == ri0),
    index_rows_unchanged_but_swapped=([l for l in idx_now if not l.startswith(f'| {SW} ')] == [l for l in idx_old if not l.startswith(f'| {SW} ')]),
    swapped_index_row_position=[bi.index(SW), bi0.index(SW)],
    swapped_part_a_position=[ri.index(SW), ri0.index(SW)],
    rationale_lines=[len(rl0), len(rl)],
    rationale_lines_changed=[(n, SW in x and SW in y) for n, x, y in rl_diff],
    index_row_after=row_of(idx_now, SW)[0], index_row_before=row_of(idx_old, SW)[0])
ok = (not c['index_duplicates'] and not c['part_a_duplicates'] and c['one_id_set'] and c['id_set_unchanged'] and c['index_order_unchanged']
      and c['part_a_order_unchanged'] and c['index_rows_unchanged_but_swapped'] and len(rl0) == len(rl) and len(rl_diff) == 1 and rl_diff[0][1].startswith(f'| {SW} ')
      and len(bi) == 805 and len(ri) == 805)
c['ok'] = ok
if not ok:
    sys.exit(f'STOP — judgment tables after the swap: {json.dumps(c)[:3000]}')
# the swapped rows equal the J-ROWS / RATIONALE-A rows of repair-r6-scope (byte for byte)
sc = rd(f'{SPLIT}/repair-r6-scope.md')
jr = sc[sc.index('=== J-ROWS ===') + 1]; ra = sc[sc.index('=== RATIONALE-A ===') + 1]
c['index_row_equals_block_row'] = (c['index_row_after'] == jr)
c['part_a_row_equals_block_row'] = (rl_diff[0][2] == ra)
if not (c['index_row_equals_block_row'] and c['part_a_row_equals_block_row']):
    sys.exit('STOP — swapped rows differ from the block rows')


def changed_old_lines(old, new):
    """old-side line numbers (1-based) a diff replaces or deletes, and the insertion points ('after l. n') of pure inserts"""
    ch, ins, hunks = set(), [], 0
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes():
        if tag == 'equal': continue
        hunks += 1
        if tag == 'insert': ins.append((i1, j2 - j1))
        else: ch.update(range(i1 + 1, i2 + 1))
    return ch, ins, hunks


def rng(spec):
    s = set()
    for p in spec:
        if isinstance(p, tuple): s.update(range(p[0], p[1] + 1))
        else: s.add(p)
    return s


def apply(files, tag):
    kb, kr, kl = f'{TMP}/{tag}-base.md', f'{TMP}/{tag}-rat.md', f'{TMP}/{tag}.json'
    run(['python3', AB, '--doc', f'{BEFORE}/{BASE}', '--rationale', f'{BEFORE}/{RAT}', '--out-doc', kb, '--out-rationale', kr,
         '--log', kl] + [f'{SPLIT}/repair-r6-{u}.md' for u in files], f'{tag}')
    return kb, kr, json.load(open(kl, encoding='utf-8'))


alone, outs = {}, {}
for unit in ('determinism', 'model', 'pipeline', 'rendering', 'scope'):
    kb, kr, lg = apply([unit], f'{unit}-alone'); ck = lg['checks']
    bad = [x for x in lg['audit']['blocks'] if not x['state'].startswith(('OK', 'CARRIED', 'SUPERSEDED'))]
    new = rd(kb)
    ch, ins, hunks = changed_old_lines(bl0, new)
    rl1 = rd(kr); a1, b1, pa1, pb1 = bounds(new, rl1)
    i1, r1 = ids(new, a1, b1), ids(rl1, pa1, pb1)
    rec = dict(found=ck['blocks_total'], applied=ck['blocks_applied'], skipped=ck['blocks_skipped'], audit_not_ok=len(bad),
               headings=[ck['headings_before'], ck['headings_after']], lines=[ck['doc_lines_before'], ck['doc_lines_after']],
               bytes=[ck['doc_bytes_before'], ck['doc_bytes_after']], fences=[ck['fence_lines_before'], ck['fence_lines_after']],
               fences_balanced=ck['fences_balanced'], title_block_unchanged=ck['title_block_unchanged'],
               rat_lines=[ck['rationale_lines_before'], ck['rationale_lines_after']],
               base_sha256=h(kb), rationale_unchanged=(open(kr, 'rb').read() == open(f'{BEFORE}/{RAT}', 'rb').read()),
               hunks=hunks, changed_old_lines_n=len(ch), inserts=ins, index_rows=len(i1), part_a_rows=len(r1),
               duplicates=sorted({i for i in i1 if i1.count(i) > 1} | {i for i in r1 if r1.count(i) > 1}),
               notes=[n['note'] + ': ' + str(n.get('items')) for n in lg['notes']])
    if unit == 'scope':
        # the swap on the stand-alone output, as scope's header records it
        so = run(['python3', SWAP, kb, kr, kb + '.s', kr + '.s'], 'scope alone swap')
        sb, sr = rd(kb + '.s'), rd(kr + '.s'); a2, b2, pa2, pb2 = bounds(sb, sr)
        i2, r2 = ids(sb, a2, b2), ids(sr, pa2, pb2)
        rec['swap'] = dict(stdout=so.strip().split('\n'), lines_after_swap=len(sb) - 1, rat_lines_after_swap=len(sr) - 1,
                           index_rows=len(i2), part_a_rows=len(r2), one_id_set=(set(i2) == set(r2)),
                           duplicates=sorted({i for i in i2 if i2.count(i) > 1} | {i for i in r2 if r2.count(i) > 1}))
    rec['_changed'] = sorted(ch)
    alone[unit] = rec; outs[unit] = new

DET = rng([9244, 9247, 9257, 9289, 10357, (10443, 10460), 10587, (10630, 10633), (10708, 10719), 10883, 11228, 11825, (12068, 12069)])
MOD = rng([556, 2292, 2317, (2503, 2523), (2537, 2628), (2638, 2649), 3140])
base_ok = lambda r, n: ((r['found'], r['applied'], r['skipped'], r['audit_not_ok']) == (n, n, 0, 0) and r['headings'] == [153, 153]
                        and r['fences_balanced'] and r['title_block_unchanged'])
within = lambda r, S: set(r['_changed']) <= S and all(i <= max(S) for i, _ in r['inserts'])
# the combined runs the seats record
_, _, lg_pmr = apply(['model', 'pipeline', 'rendering'], 'pipeline-model-rendering')
_, _, lg_rps = apply(['pipeline', 'rendering', 'scope'], 'rendering-pipeline-scope')
_, _, lg_all = apply(['determinism', 'model', 'pipeline', 'rendering', 'scope'], 'all-five')
cnt = lambda lg: (lg['checks']['blocks_total'], lg['checks']['blocks_applied'], lg['checks']['blocks_skipped'],
                  len([x for x in lg['audit']['blocks'] if not x['state'].startswith(('OK', 'CARRIED', 'SUPERSEDED'))]))
log['checks']['combined_runs'] = {'model+pipeline+rendering': cnt(lg_pmr), 'pipeline+rendering+scope': cnt(lg_rps), 'all five': cnt(lg_all)}
rec_exp = {
    'determinism': ('6 applied, 0 skipped, audit 0 not OK; headings 153 → 153, fences balanced, title block unchanged; the diff confined to '
                    'l. 9244, 9247, 9257, 9289, 10357, 10443–10460, 10587, 10630–10633, 10708–10719, 10883, 11228, 11825, 12068–12069 of the '
                    'live base; combined with the landed base repairs of round 6: 31 blocks applied, audit OK',
                    lambda r: base_ok(r, 6) and within(r, DET) and cnt(lg_all) == (31, 31, 0, 0)),
    'model': ('3 blocks applied, 0 skipped, audit OK; headings 153 → 153, fences balanced 140 → 140, title block unchanged; diff confined '
              'to l. 556, 2292, 2317, 2503–2523, 2537–2628, 2638–2649, 3140 of the live base',
              lambda r: base_ok(r, 3) and r['fences'] == [140, 140] and within(r, MOD)),
    'pipeline': ('9 blocks found, 9 applied, 0 skipped; audit 0 not OK; headings 153 → 153; fences balanced (140 → 140); title block '
                 'unchanged; document 23 029 → 22 972 lines, 3 019 440 → 3 019 888 bytes; rationale unchanged (805 = 805, no duplicate); '
                 '25 hunks; combined with model and rendering: 20 found, 20 applied, 0 skipped, audit 0 not OK',
                 lambda r: base_ok(r, 9) and r['fences'] == [140, 140] and r['lines'] == [23029, 22972] and r['bytes'] == [3019440, 3019888]
                 and r['rationale_unchanged'] and r['index_rows'] == 805 and r['part_a_rows'] == 805 and not r['duplicates']
                 and r['hunks'] == 25 and cnt(lg_pmr) == (20, 20, 0, 0)),
    'rendering': ('alone: 8 found, 8 applied, 0 skipped, audit not OK 0, headings 153 → 153, fences balanced, title block unchanged, the '
                  'rationale byte-identical; with repair-r6-pipeline and repair-r6-scope: the same',
                  lambda r: base_ok(r, 8) and r['rationale_unchanged'] and cnt(lg_rps) == (22, 22, 0, 0)),
    'scope': ('5 found, 5 applied, 0 skipped, audit not-OK 0 (two DUPLICATE ID notes for J-A67.45), headings 153 → 153, fences balanced '
              '(140 → 140), title block unchanged; document 23 029 → 23 087 lines (23 086 after the swap), rationale 2 386 → 2 387 (2 386); '
              'the swap: index l. 22799 ← l. 23020, Part A l. 631 ← l. 852; 805 = 805, one id set, no duplicate',
              lambda r: base_ok(r, 5) and r['fences'] == [140, 140] and r['lines'] == [23029, 23087] and r['rat_lines'] == [2386, 2387]
              and r['swap']['lines_after_swap'] == 23086 and r['swap']['rat_lines_after_swap'] == 2386
              and r['swap']['stdout'][:2] == ['judgment index: J-A67.45: l. 22799 <- l. 23020', 'Part A: J-A67.45: l. 631 <- l. 852']
              and r['swap']['index_rows'] == 805 and r['swap']['part_a_rows'] == 805 and r['swap']['one_id_set'] and not r['swap']['duplicates']),
}
for u, (txt, f) in rec_exp.items():
    alone[u]['recorded'] = txt
    alone[u]['equals_recorded'] = bool(f(alone[u]))
for u in alone:
    ch = alone[u].pop('_changed')
    alone[u]['changed_old_lines_sample'] = ch[:12]
log['checks']['alone'] = alone
# the five stand-alone diffs are disjoint when the combined base's growth is the sum of theirs (the swap removes one line)
grow = sum(r['lines'][1] - r['lines'][0] for r in alone.values())
log['checks']['combined_lines'] = dict(before=len(bl0) - 1, after_blocks=lg_all['checks']['doc_lines_after'], after_swap=len(bl) - 1,
                                       sum_of_alone_growths=grow, equal=(lg_all['checks']['doc_lines_after'] - (len(bl0) - 1) == grow))
log['checks']['all_five_equals_apply_out'] = (h(f'{TMP}/all-five-base.md') == h(f'{OUT}/{BASE}'))

paths = [f['path'] for f in json.load(open(f'{W}/snapshot.json'))['files']]
log['final_sha256'] = {p: h(f'{FIN}/{p}') for p in paths}
log['out_equals_final'] = {p: (os.path.exists(f'{OUT}/{p}') and open(f'{OUT}/{p}', 'rb').read() == open(f'{FIN}/{p}', 'rb').read()) for p in paths}
json.dump(log, open(f'{W}/handoff.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for s in log['swaps']:
    print('SWAP', s['note']); [print('    ', x) for x in s['stdout']]
print('ids', json.dumps({k: v for k, v in c.items() if k not in ('index_row_after', 'index_row_before')}))
for u, r in alone.items():
    print(f"alone {u:<12} found {r['found']} applied {r['applied']} skipped {r['skipped']} audit {r['audit_not_ok']} lines {r['lines']} bytes {r['bytes']} "
          f"hunks {r['hunks']} inserts {r['inserts'][:3]} rat-unchanged {r['rationale_unchanged']} idx/A {r['index_rows']}/{r['part_a_rows']} "
          f"notes {len(r['notes'])} equals-recorded {r['equals_recorded']}")
    if 'swap' in r: print('      swap', r['swap'])
print('combined runs', log['checks']['combined_runs'])
print('combined lines', log['checks']['combined_lines'], 'all-five == apply out:', log['checks']['all_five_equals_apply_out'])
print('carried unchanged', log['carried_unchanged'])
for p, x in log['final_sha256'].items(): print(f'{p:<40} {x[:16]} out==final {log["out_equals_final"][p]}')
