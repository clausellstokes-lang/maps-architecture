#!/usr/bin/env python3
"""handoff.py (coherence/assemble-r5, P3b) — the scripted hand-offs the repair-r5 files address to the assembler (brief
ROUND-5 NOTES (9) (a)), and the checks of the base seats' recorded stand-alone dry runs.

This round the census of the eighteen headers finds ONE note addressed to Assemble — scope's "NOTE FOR ASSEMBLE (one
proposed allow row)" — and no swap, no restated J-ROWS or RATIONALE-A row (no block of the round is a J-ROWS or
RATIONALE-A block). The allow row is reviewed and written by allowrows.py (P5), not here. So final/ is apply.py's out/
unchanged, plus every live file no block routes to (INDEX.md) carried from the untouched copy.

CHECKS (no output): the rationale and the base's judgment index are untouched (byte-identical rationale; index and Part A
805 rows each, one id set, no duplicate, orders unchanged); each base seat's recorded stand-alone dry run is reproduced on
the untouched copies and compared with what its header records:
  determinism: 8 applied, 0 skipped, audit OK, headings 153 -> 153; diff confined to l. 9208, 9221, 9253, 9971-9973,
               10180-10183, 10319, 10592-10595, 10845, 11190, 11365, 11786, 11873, 11978 of the live base;
  kernel:      1 found, 1 applied, 0 skipped, audit not-OK 0, headings 153 -> 153; 2 hunks (l. 3562 changed; 5 lines added
               after l. 3655); rationale unchanged; combined with the other five: 37 found, 37 applied, section 3 identical
               to section 3 alone;
  model:       2 applied, 0 skipped, audit OK, headings 153 -> 153; diff confined to l. 2292, 2315-2317, 2535-2540,
               2546-2615, 3392-3393 of the live base;
  pipeline:    10 found, 10 applied, 0 skipped, audit 0, headings 153 -> 153, 22 934 -> 22 950 lines, rationale unchanged;
  rendering:   11 found, 11 applied, 0 skipped, audit 0, headings 153 -> 153, index 805 and Part A 805, no duplicate;
  scope:       5 found, 5 applied, 0 skipped, audit 0, headings 153 -> 153, 22 934 -> 22 967 lines, rationale untouched.
Writes handoff.json beside it."""
import difflib, hashlib, json, os, re, shutil, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r5')
AB = os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm5'
BEFORE, OUT, FIN, TMP = f'{SCR}/before', f'{SCR}/out', f'{SCR}/final', f'{SCR}/handoff-tmp'
BASE, RAT = 'docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'
h = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
for d in (FIN, TMP):
    if os.path.exists(d): shutil.rmtree(d)
shutil.copytree(OUT, FIN); os.makedirs(TMP)
log = dict(swaps=[], notes_for_assemble=['repair-r5-scope.md: NOTE FOR ASSEMBLE (one proposed allow row) — P5, allowrows.py'],
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


def ids(lines, a, b):
    return [m.group(1) for l in lines[a:b] for m in [re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)] if m]


def bounds(bl, rl):
    a = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls')); b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
    pa = next(i for i, l in enumerate(rl) if l.startswith('## Part A')); pb = next(i for i, l in enumerate(rl) if l.startswith('## Part B'))
    return a, b, pa, pb


rd = lambda p: open(p, encoding='utf-8').read().split('\n')
bl, rl = rd(f'{FIN}/{BASE}'), rd(f'{FIN}/{RAT}')
bl0, rl0 = rd(f'{BEFORE}/{BASE}'), rd(f'{BEFORE}/{RAT}')
a, b, pa, pb = bounds(bl, rl); a0, b0, pa0, pb0 = bounds(bl0, rl0)
bi, ri, bi0, ri0 = ids(bl, a, b), ids(rl, pa, pb), ids(bl0, a0, b0), ids(rl0, pa0, pb0)
c = log['checks']['ids'] = dict(index_before=len(bi0), part_a_before=len(ri0), index_after=len(bi), part_a_after=len(ri),
                                index_duplicates=sorted({i for i in bi if bi.count(i) > 1}), part_a_duplicates=sorted({i for i in ri if ri.count(i) > 1}),
                                one_id_set=(set(bi) == set(ri)), index_order_unchanged=(bi == bi0), part_a_order_unchanged=(ri == ri0),
                                index_rows_unchanged=([l for l in bl[a:b] if l.startswith('| J-')] == [l for l in bl0[a0:b0] if l.startswith('| J-')]),
                                rationale_byte_identical=(open(f'{FIN}/{RAT}', 'rb').read() == open(f'{BEFORE}/{RAT}', 'rb').read()))
if c['index_duplicates'] or c['part_a_duplicates'] or not c['one_id_set'] or not c['index_order_unchanged'] or not c['rationale_byte_identical']:
    sys.exit(f'STOP — judgment tables: {c}')


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


alone = {}
outs = {}
for unit in ('determinism', 'kernel', 'model', 'pipeline', 'rendering', 'scope'):
    kb, kr, kl = f'{TMP}/{unit}-alone-base.md', f'{TMP}/{unit}-alone-rat.md', f'{TMP}/{unit}-alone.json'
    run(['python3', AB, '--doc', f'{BEFORE}/{BASE}', '--rationale', f'{BEFORE}/{RAT}', '--out-doc', kb, '--out-rationale', kr,
         '--log', kl, f'{W}/split/base/repair-r5-{unit}.md'], f'{unit} alone')
    lg = json.load(open(kl, encoding='utf-8')); ck = lg['checks']
    bad = [x for x in lg['audit']['blocks'] if not x['state'].startswith(('OK', 'CARRIED', 'SUPERSEDED'))]
    new = rd(kb)
    ch, ins, hunks = changed_old_lines(bl0, new)
    rl1 = rd(kr); a1, b1, pa1, pb1 = bounds(new, rl1)
    i1, r1 = ids(new, a1, b1), ids(rl1, pa1, pb1)
    rec = dict(found=ck['blocks_total'], applied=ck['blocks_applied'], skipped=ck['blocks_skipped'], audit_not_ok=len(bad),
               headings=[ck['headings_before'], ck['headings_after']], lines=[ck['doc_lines_before'], ck['doc_lines_after']],
               fences_balanced=ck['fences_balanced'], title_block_unchanged=ck['title_block_unchanged'],
               base_sha256=h(kb), rationale_unchanged=(open(kr, 'rb').read() == open(f'{BEFORE}/{RAT}', 'rb').read()),
               hunks=hunks, changed_old_lines_n=len(ch), inserts=ins, index_rows=len(i1), part_a_rows=len(r1),
               duplicates=sorted({i for i in i1 if i1.count(i) > 1} | {i for i in r1 if r1.count(i) > 1}))
    rec['_changed'] = sorted(ch)
    alone[unit] = rec; outs[unit] = new
DET = rng([9208, 9221, 9253, (9971, 9973), (10180, 10183), 10319, (10592, 10595), 10845, 11190, 11365, 11786, 11873, 11978])
MOD = rng([2292, (2315, 2317), (2535, 2540), (2546, 2615), (3392, 3393)])
base_ok = lambda r, n: (r['found'], r['applied'], r['skipped'], r['audit_not_ok']) == (n, n, 0, 0) and r['headings'] == [153, 153] and r['fences_balanced'] and r['title_block_unchanged']
within = lambda r, S: set(r['_changed']) <= S and all(i <= max(S) for i, _ in r['inserts'])


def kernel_sec3(lines):
    s = next(i for i, l in enumerate(lines) if l.startswith('## §3') or re.match(r'^## 3\b', l))
    e = next(i for i in range(s + 1, len(lines)) if lines[i].startswith('## ') or lines[i].startswith('# '))
    return lines[s:e]


rec_exp = {
    'determinism': ('8 applied, 0 skipped, audit OK, headings 153 → 153; diff confined to l. 9208, 9221, 9253, 9971–9973, 10180–10183, 10319, '
                    '10592–10595, 10845, 11190, 11365, 11786, 11873, 11978 of the live base',
                    lambda r: base_ok(r, 8) and within(r, DET)),
    'kernel': ('1 found, 1 applied, 0 skipped, audit not-OK 0; headings 153 → 153; 2 hunks (l. 3562 changed; 5 lines added after l. 3655); '
               'index 805 = Part A 805; rationale unchanged (a480f02e…); combined: §3 of the combined output identical to §3 alone',
               lambda r: base_ok(r, 1) and r['hunks'] == 2 and r['_changed'] == [3562] and r['inserts'] == [(3655, 5)] and r['rationale_unchanged']
               and r['index_rows'] == 805 and r['part_a_rows'] == 805 and kernel_sec3(outs['kernel']) == kernel_sec3(bl)),
    'model': ('2 applied, 0 skipped, audit OK, headings 153 → 153; diff confined to l. 2292, 2315–2317, 2535–2540, 2546–2615, 3392–3393 of the live base',
              lambda r: base_ok(r, 2) and within(r, MOD)),
    'pipeline': ('10 found, 10 applied, 0 skipped, audit 0, headings 153 → 153; document 22 934 → 22 950 lines; rationale unchanged',
                 lambda r: base_ok(r, 10) and r['lines'] == [22934, 22950] and r['rationale_unchanged']),
    'rendering': ('11 found, 11 applied, 0 skipped, audit not OK 0, headings 153 → 153; index 805 rows and Part A 805 rows, no duplicate',
                  lambda r: base_ok(r, 11) and r['index_rows'] == 805 and r['part_a_rows'] == 805 and not r['duplicates']),
    'scope': ('5 found, 5 applied, 0 skipped, audit not-OK 0, headings 153 → 153, the rationale untouched (805 = 805, 0 duplicates); '
              'document 22 934 → 22 967 lines',
              lambda r: base_ok(r, 5) and r['rationale_unchanged'] and r['lines'] == [22934, 22967] and r['index_rows'] == 805 and not r['duplicates']),
}
for u, (txt, f) in rec_exp.items():
    alone[u]['recorded'] = txt
    alone[u]['equals_recorded'] = bool(f(alone[u]))
for u in alone:
    ch = alone[u].pop('_changed')
    alone[u]['changed_old_lines_sample'] = ch[:12]
log['checks']['alone'] = alone
# the six stand-alone diffs are disjoint, so the combined base is their union: its line count is the sum of their growths
grow = sum(r['lines'][1] - r['lines'][0] for r in alone.values())
log['checks']['combined_lines'] = dict(before=len(bl0), after=len(bl), sum_of_alone_growths=grow, equal=(len(bl) - len(bl0) == grow))

paths = [f['path'] for f in json.load(open(f'{W}/snapshot.json'))['files']]
log['final_sha256'] = {p: h(f'{FIN}/{p}') for p in paths}
log['out_equals_final'] = {p: (os.path.exists(f'{OUT}/{p}') and open(f'{OUT}/{p}', 'rb').read() == open(f'{FIN}/{p}', 'rb').read()) for p in paths}
json.dump(log, open(f'{W}/handoff.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ids', json.dumps(c))
for u, r in alone.items():
    print(f"alone {u:<12} found {r['found']} applied {r['applied']} skipped {r['skipped']} audit {r['audit_not_ok']} lines {r['lines']} "
          f"hunks {r['hunks']} inserts {r['inserts'][:4]} sha {r['base_sha256'][:16]} rat-unchanged {r['rationale_unchanged']} "
          f"idx/A {r['index_rows']}/{r['part_a_rows']} equals-recorded {r['equals_recorded']}")
print('combined lines', log['checks']['combined_lines'])
print('carried unchanged', log['carried_unchanged'])
for p, x in log['final_sha256'].items(): print(f'{p:<40} {x[:16]} out==final {log["out_equals_final"][p]}')
