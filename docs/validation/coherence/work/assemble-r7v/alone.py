#!/usr/bin/env python3
"""alone.py (coherence/assemble-r7v, P3b) — each base seat's recorded stand-alone dry run reproduced: its split block file
applied ALONE (docs/validation/amendments-b/apply-blocks.py, unchanged) on the untouched base and rationale (snapshot.py's
copies); its counts, lines, bytes and the old-line numbers its diff touches compared with what its header records; then the
five diffs checked disjoint (the old lines each touches) and their union checked equal to the combined run's diff (apply.py's
base output). Writes alone.json beside it. Never writes a live file."""
import difflib, hashlib, json, os, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r7v')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7v'
AB = os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py')
B, R = f'{SCR}/before/docs/ARCHITECTURE.md', f'{SCR}/before/docs/ARCHITECTURE-RATIONALE.md'
os.makedirs(f'{SCR}/alone', exist_ok=True)
old = open(B, encoding='utf-8').read().split('\n')

def changed(a, b):
    """1-based old-line numbers a diff a -> b replaces or deletes, and the old positions it inserts after."""
    s = set(); ins = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag in ('replace', 'delete'): s.update(range(i1 + 1, i2 + 1))
        elif tag == 'insert': ins.append(i1)
    return s, ins

def runs(nums):
    nums = sorted(nums); out = []
    for n in nums:
        if out and n == out[-1][1] + 1: out[-1][1] = n
        else: out.append([n, n])
    return ', '.join(f'{a}' if a == b else f'{a}–{b}' for a, b in out)

units = ['model', 'determinism', 'pipeline', 'rendering', 'scope']
split = lambda u: os.path.join(W, 'split/base', ('a-' if u == 'model' else 'b-') + f'repair-r7v-{u}.md')
res = {}
for u in units:
    od, orat, lg = f'{SCR}/alone/{u}.md', f'{SCR}/alone/{u}-rat.md', f'{SCR}/alone/{u}.json'
    r = subprocess.run(['python3', AB, '--doc', B, '--rationale', R, '--out-doc', od, '--out-rationale', orat, '--log', lg, split(u)],
                       capture_output=True, text=True)
    if r.returncode: sys.exit(f'STOP {u}: {r.stderr[-400:]}')
    log = json.load(open(lg)); c = log['checks']
    new = open(od, encoding='utf-8').read().split('\n')
    ch, ins = changed(old, new)
    bad = [x for x in log['audit']['blocks'] if not x['state'].startswith(('OK', 'CARRIED', 'SUPERSEDED'))]
    res[u] = dict(found=c['blocks_total'], applied=c['blocks_applied'], skipped=c['blocks_skipped'], audit_not_ok=len(bad),
                  headings=[c['headings_before'], c['headings_after']], fences=[c['fence_lines_before'], c['fence_lines_after']],
                  fences_balanced=c['fences_balanced'], title_block_unchanged=c['title_block_unchanged'],
                  lines=[len(old) - 1, len(new) - 1], bytes=[c['doc_bytes_before'], c['doc_bytes_after']], sha256=c['output_doc_sha256'],
                  rationale_unchanged=open(orat, 'rb').read() == open(R, 'rb').read(), changed_old_lines=runs(ch),
                  n_changed_old_lines=len(ch), inserts_after_old_lines=ins, _set=sorted(ch))
# the records each header states (quoted from the repair files' preambles)
rec = {
    'model': ("1 found, 1 applied, 0 skipped, audit OK; headings 153 → 153; fences balanced 140 → 140; title block unchanged; "
              "rationale unchanged; document 24,062 → 24,074 lines; every line outside §2.7 byte-identical",
              lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'], r['rationale_unchanged'])
              == (1, 1, 0, 0, [153, 153], [140, 140], [24062, 24074], True) and all(2249 <= n <= 3507 for n in r['_set'])),
    'determinism': ("alone 6/6 REPLACE applied, audit not OK 0, headings 153 → 153, fences balanced (140 → 140), title block unchanged; "
                    "hunks l. 9840, 9857, 9938, 9991, 10030–10042, 10370–10371, 10384–10402, 11133–11152, 11323, 11325, 11326, 11676–11677",
                    lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['title_block_unchanged'])
                    == (6, 6, 0, 0, [153, 153], [140, 140], True)
                    and set(r['_set']) <= set([9840, 9857, 9938, 9991, 11323, 11325, 11326] + list(range(10030, 10043)) + [10370, 10371]
                                              + list(range(10384, 10403)) + list(range(11133, 11153)) + [11676, 11677])),
    'pipeline': ("5 found, 5 applied, 0 skipped; audit not OK 0; headings 153 → 153; fences balanced; title block unchanged; rationale "
                 "byte-identical; 24 062 → 24 062 lines; exactly 9 lines changed (l. 5700, 6214, 6231, 6267, 6285, 6589, 6638, 6873, 8378)",
                 lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['lines'], r['rationale_unchanged'], r['_set'])
                 == (5, 5, 0, 0, [24062, 24062], True, [5700, 6214, 6231, 6267, 6285, 6589, 6638, 6873, 8378])),
    'rendering': ("2 found, 2 applied, 0 skipped, audit not OK 0, headings 153 → 153, fences balanced, title block unchanged, the "
                  "rationale byte-identical; the diff touches exactly lines 15463 and 16703",
                  lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['rationale_unchanged'], r['_set'])
                  == (2, 2, 0, 0, [153, 153], True, [15463, 16703])),
    'scope': ("3 blocks found, 3 applied, 0 skipped; audit 3 OK; headings 153 → 153; fences balanced (140 → 140); title block "
              "unchanged; document 24 062 → 24 099 lines; rationale unchanged; 20 hunks",
              lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'], r['rationale_unchanged'])
              == (3, 3, 0, 0, [153, 153], [140, 140], [24062, 24099], True)),
}
for u in units:
    res[u]['recorded'] = rec[u][0]; res[u]['equals_recorded'] = bool(rec[u][1](res[u]))
# scope's 20 hunks
sm = difflib.SequenceMatcher(None, old, open(f'{SCR}/alone/scope.md', encoding='utf-8').read().split('\n'), autojunk=False)
res['scope']['hunks'] = sum(1 for t in sm.get_opcodes() if t[0] != 'equal')
res['scope']['equals_recorded'] = res['scope']['equals_recorded'] and res['scope']['hunks'] == 20
# disjoint and union
sets = {u: set(res[u]['_set']) for u in units}
inter = [(a, b, sorted(sets[a] & sets[b])[:5]) for i, a in enumerate(units) for b in units[i + 1:] if sets[a] & sets[b]]
comb = open(f'{SCR}/out/docs/ARCHITECTURE.md', encoding='utf-8').read().split('\n')
cs, _ = changed(old, comb)
union = set().union(*sets.values())
grow = sum(res[u]['lines'][1] - res[u]['lines'][0] for u in units)
summary = dict(pairwise_intersections=inter, combined_changed_old_lines=len(cs), union_of_alone=len(union), union_equal=(cs == union),
               sum_of_growths=grow, combined_growth=len(comb) - len(old), growth_equal=(grow == len(comb) - len(old)))
for u in units:
    r = res[u]
    print(f"{u:<12} {r['found']}/{r['applied']}/{r['skipped']}/{r['audit_not_ok']} lines {r['lines'][0]}->{r['lines'][1]} bytes {r['bytes'][0]}->{r['bytes'][1]} "
          f"rat-same {r['rationale_unchanged']} changed {r['n_changed_old_lines']} equals_recorded {r['equals_recorded']}\n     old lines: {r['changed_old_lines'][:300]}")
print(summary)
for u in units: res[u].pop('_set')
json.dump(dict(alone=res, summary=summary), open(f'{W}/alone.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
