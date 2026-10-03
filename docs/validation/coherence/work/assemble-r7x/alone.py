#!/usr/bin/env python3
"""alone.py (coherence/assemble-r7x, P3b) — each base seat's recorded stand-alone dry run reproduced: its split block file
applied ALONE (docs/validation/amendments-b/apply-blocks.py, unchanged) on the untouched base and rationale (snapshot.py's
copies); its counts, lines, bytes and the old-line numbers its diff touches compared with what its header records; then the
four diffs checked disjoint (the old lines each touches) and their union checked equal to the combined run's diff (apply.py's
base output). Writes alone.json beside it. Never writes a live file."""
import difflib, hashlib, json, os, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r7x')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7x'
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

units = ['model', 'determinism', 'pipeline', 'scope']
split = lambda u: os.path.join(W, 'split/base', ('a-' if u == 'model' else 'b-') + f'repair-r7x-{u}.md')
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
# the records each header states (quoted from the repair-r7x files' preambles)
PIPE = [5709, 5713, 6227, 6244, 6251, 6407, 6503, 6586, 6602, 6603, 6618, 6645, 6653, 6658, 6693, 8347, 8405, 8954, 8964, 9710, 9712]
rec = {
    'model': ("1 block found, 1 applied, 0 skipped; audit not OK 0; headings 153 → 153; fences balanced; title block unchanged; "
              "document 24 163 → 24 160 lines; rationale unchanged; every line before and after §2.7 byte-identical to the live file",
              lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'],
                         r['rationale_unchanged'], r['title_block_unchanged'], r['fences_balanced'])
              == (1, 1, 0, 0, [153, 153], [140, 140], [24163, 24160], True, True, True)
              and all(2249 <= n <= 3520 for n in r['_set'])),
    'determinism': ("3/3 REPLACE applied, 0 skipped, audit not OK 0, headings 153 → 153, fences balanced (140 → 140), title block "
                    "unchanged, rationale unchanged; hunks (live lines) 9855 (D4, D5), 11147 – 11155 (re-wrapped to 8 lines: D3), "
                    "11343 (D1), 11344 (D2), 11601 (D6)",
                    lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['title_block_unchanged'],
                               r['rationale_unchanged'], r['lines'])
                    == (3, 3, 0, 0, [153, 153], [140, 140], True, True, [24163, 24162])
                    and set(r['_set']) <= set([9855, 11343, 11344, 11601] + list(range(11147, 11156)))
                    and {9855, 11343, 11344, 11601, 11147} <= set(r['_set'])),
    'pipeline': ("7 blocks found, 7 applied, 0 skipped; audit not OK: 0; headings 153 → 153; fences balanced (140 → 140); title block "
                 "unchanged; rationale byte-identical; 24 163 → 24 163 lines; diff live → patched exactly on 21 lines — l. 5709, 5713, "
                 "6227, 6244, 6251, 6407, 6503, 6586, 6602, 6603, 6618, 6645, 6653, 6658, 6693, 8347, 8405, 8954, 8964, 9710, 9712",
                 lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'],
                            r['rationale_unchanged'], r['title_block_unchanged'])
                 == (7, 7, 0, 0, [153, 153], [140, 140], [24163, 24163], True, True)
                 and sorted(r['_set']) == PIPE and not r['inserts_after_old_lines']),
    'scope': ("1 block found, 1 applied, 0 skipped; audit 1 OK (not OK 0); headings 153 → 153; fences balanced (140 → 140); title "
              "block unchanged; document 24 163 → 24 196 lines (3 208 376 → 3 211 705 bytes, sha256 79d7a8ef…); rationale unchanged; "
              "18 hunks, all inside §13.2's T110 bullet (l. 19256 – 19567)",
              lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'], r['bytes'],
                         r['rationale_unchanged'], r['title_block_unchanged'])
              == (1, 1, 0, 0, [153, 153], [140, 140], [24163, 24196], [3208376, 3211705], True, True) and r['sha256'].startswith('79d7a8ef')
              and all(19256 <= n <= 19567 for n in r['_set'])),
}
for u in units:
    res[u]['recorded'] = rec[u][0]; res[u]['equals_recorded'] = bool(rec[u][1](res[u]))
# scope's 18 hunks
sm = difflib.SequenceMatcher(None, old, open(f'{SCR}/alone/scope.md', encoding='utf-8').read().split('\n'), autojunk=False)
res['scope']['hunks'] = sum(1 for t in sm.get_opcodes() if t[0] != 'equal')
res['scope']['equals_recorded'] = res['scope']['equals_recorded'] and res['scope']['hunks'] == 18
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
