#!/usr/bin/env python3
"""alone.py (coherence/assemble-r7y, P3b) — each base seat's recorded stand-alone dry run reproduced: its split block file
applied ALONE (docs/validation/amendments-b/apply-blocks.py, unchanged) on the untouched base and rationale (snapshot.py's
copies); its counts, lines, bytes and the old-line numbers its diff touches compared with what its header records; then the
four diffs checked disjoint (the old lines each touches) and their union checked equal to the combined run's diff (apply.py's
base output). Writes alone.json beside it. Never writes a live file."""
import difflib, hashlib, json, os, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r7y')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7y'
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
split = lambda u: os.path.join(W, 'split/base', ('a-' if u == 'model' else 'b-') + f'repair-r7y-{u}.md')
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
# the records each header states (quoted from the repair-r7y files' preambles)
PIPE = [5708, 5795, 6222, 6224, 6241, 6248, 6413, 6414, 6422, 6500, 6583, 6600, 6603, 6605, 6615, 6636, 6642, 6650, 6718, 8344, 8402]
DET = {9851, 9852, 9869, 9982, 11145, 11146, 11147, 11148, 11339, 11340, 11341, 11693, 11694, 11701, 11702, 12813}
rec = {
    'model': ("1 block found, 1 applied, 0 skipped; audit not OK 0; headings 153 → 153; fences balanced; title block unchanged; "
              "document 24 192 → 24 202 lines; rationale unchanged; every line before and after §2.7 byte-identical to the live file",
              lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'],
                         r['rationale_unchanged'], r['title_block_unchanged'], r['fences_balanced'])
              == (1, 1, 0, 0, [153, 153], [140, 140], [24192, 24202], True, True, True)
              and all(2249 <= n <= 3517 for n in r['_set']) and all(2249 <= i <= 3517 for i in r['inserts_after_old_lines'])),
    'determinism': ("5/5 REPLACE applied, 0 skipped, audit not OK 0, headings 153 → 153, fences balanced (140 → 140), title block "
                    "unchanged, rationale unchanged; document 24 192 → 24 195 lines; hunks (live lines) 9851 – 9852 (D2; D4, D1), "
                    "9869 (D4), 9982 (D3), 11145 – 11148 → 6 lines (D6), 11339 – 11341 (D8, D9, D10), 11693 – 11694, 11701 – 11702 "
                    "(D5), 12813 (D7)",
                    lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['title_block_unchanged'],
                               r['rationale_unchanged'], r['lines'])
                    == (5, 5, 0, 0, [153, 153], [140, 140], True, True, [24192, 24195])
                    and set(r['_set']) == DET),
    'pipeline': ("5 blocks found, 5 applied, 0 skipped; audit not OK: 0; headings 153 → 153; fences balanced (140 → 140); title block "
                 "unchanged; rationale byte-identical; 24 192 → 24 192 lines; 3 209 864 → 3 212 949 bytes; diff live → patched exactly "
                 "on 21 lines — l. 5708, 5795, 6222, 6224, 6241, 6248, 6413, 6414, 6422, 6500, 6583, 6600, 6603, 6605, 6615, 6636, "
                 "6642, 6650, 6718, 8344, 8402",
                 lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'], r['bytes'],
                            r['rationale_unchanged'], r['title_block_unchanged'])
                 == (5, 5, 0, 0, [153, 153], [140, 140], [24192, 24192], [3209864, 3212949], True, True)
                 and sorted(r['_set']) == PIPE and not r['inserts_after_old_lines']),
    'scope': ("2 blocks found, 2 applied, 0 skipped; audit 2 OK (not OK 0); headings 153 → 153; fences balanced (140 → 140); title "
              "block unchanged; document 24 192 → 24 228 lines (3 209 864 → 3 213 945 bytes, sha256 e2c6ce59…); rationale unchanged; "
              "9 hunks, 8 inside §13.2's T110 bullet (l. 19302 – 19650) and 1 in §13.8's T110 row (l. 20507)",
              lambda r: (r['found'], r['applied'], r['skipped'], r['audit_not_ok'], r['headings'], r['fences'], r['lines'], r['bytes'],
                         r['rationale_unchanged'], r['title_block_unchanged'])
              == (2, 2, 0, 0, [153, 153], [140, 140], [24192, 24228], [3209864, 3213945], True, True) and r['sha256'].startswith('e2c6ce59')
              and all(19302 <= n <= 19650 or n == 20507 for n in r['_set']) and 20507 in r['_set']),
}
for u in units:
    res[u]['recorded'] = rec[u][0]; res[u]['equals_recorded'] = bool(rec[u][1](res[u]))
# scope's 9 hunks
sm = difflib.SequenceMatcher(None, old, open(f'{SCR}/alone/scope.md', encoding='utf-8').read().split('\n'), autojunk=False)
res['scope']['hunks'] = sum(1 for t in sm.get_opcodes() if t[0] != 'equal')
res['scope']['equals_recorded'] = res['scope']['equals_recorded'] and res['scope']['hunks'] == 9
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
