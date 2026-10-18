#!/usr/bin/env python3
"""handoff.py (coherence/assemble-r1, P3b) — the scripted hand-offs the repair files address to the assembler, applied
to a copy of apply.py's outputs (scratch out/ -> final/; out/ stays the 'new' copy of the three-copy method):
 (1) scope's NOTE FOR ASSEMBLE (1): RATIONALE-A's J-A73.06 restates the existing Part A entry (VCS-15) — the appended row
     is swapped into the older row's place and the older row deleted, so Part A keeps one row per id (the precedent:
     amendments-b/assemble-r1-handoff.py's swap_restated, reused unchanged in logic; the swapped id set must equal
     {J-A73.06} for Part A and {} for the judgment index, or the script stops).
 (2) three one-token range widenings in a volume's title block (the level-1 subsection a REPLACE reaches only by
     replacing the whole volume), each asked of the assembler by that volume's own repair: V10 (preamble, HAND-OFFS:
     "Title block (assembler or close): 'items 1–119' → 'items 1–120'"), V11 (preamble: "The assembler may widen the
     preamble's range to '102–120'"), V12 (preamble note (8): "it should read '102–120'. One token; assemble applies it in
     place"). Each old string must occur exactly once on its line, the line above the volume's first '## ' heading, and
     the new string must be absent there before.
Writes handoff.json beside it."""
import hashlib, json, os, re, shutil, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r1')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence'
OUT, FIN = f'{SCR}/out', f'{SCR}/final'
sha = lambda s: hashlib.sha256(s.encode('utf-8')).hexdigest()
if os.path.exists(FIN): shutil.rmtree(FIN)
shutil.copytree(OUT, FIN)
log = dict(swap={}, substitutions=[])
ROW_ID = re.compile(r'^\|\s*([^|]+?)\s*\|')
FENCE = re.compile(r'^\s*(```|~~~)')
INDEX_HDR = re.compile(r'^\|\s*id\s*\|\s*the choice\s*\|\s*where\s*\|\s*$')
PARTA_HDR = re.compile(r'^\|\s*id\s*\|\s*call\s*\|\s*$')
def table_bounds(lines, header_rx):
    fence = None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence); continue
        if fence is None and header_rx.match(l) and i + 1 < len(lines) and re.match(r'^\|\s*:?-{3,}', lines[i + 1]):
            j = i + 1
            while j + 1 < len(lines) and lines[j + 1].startswith('|'): j += 1
            return i, j
    sys.exit('STOP — table not found')
# the RATIONALE-A rows of scope's block file (the rows allowed to be the later, restated row)
blk = open(f'{W}/split/base/repair-r1-scope.md', encoding='utf-8').read().split('\n')
s = blk.index('=== RATIONALE-A ===')
e = next(i for i in range(s + 1, len(blk)) if blk[i].startswith('=== '))
allowed = set(l for l in blk[s + 1:e] if l.startswith('|'))
def swap_restated(lines, header_rx, name, expected):
    h, last = table_bounds(lines, header_rx)
    pos = {}
    for i in range(h + 2, last + 1):
        m = ROW_ID.match(lines[i])
        if m: pos.setdefault(m.group(1), []).append(i)
    dups = {k: v for k, v in pos.items() if len(v) > 1}
    if set(dups) != expected:
        sys.exit(f'STOP — {name}: duplicate ids {sorted(dups)} differ from the expected {sorted(expected)}')
    swaps = []
    for k, (i, j) in sorted(dups.items(), key=lambda kv: -kv[1][1]):
        if lines[j] not in allowed: sys.exit(f'STOP — {name}: the later row of {k} is carried by no RATIONALE-A row')
        old, new = lines[i], lines[j]
        lines[i] = new; del lines[j]
        swaps.append(dict(id=k, older_line=i + 1, appended_line=j + 1, old_row_sha256=sha(old), new_row_sha256=sha(new), old_row=old, new_row=new))
    h, last = table_bounds(lines, header_rx)
    ids = [ROW_ID.match(l).group(1) for l in lines[h + 2:last + 1] if ROW_ID.match(l)]
    log['swap'][name] = dict(ids_swapped=[x['id'] for x in swaps], swaps=swaps, rows_after=len(ids), duplicate_ids_after=sorted({i for i in ids if ids.count(i) > 1}))
    return ids
doc_p, rat_p = f'{FIN}/docs/ARCHITECTURE.md', f'{FIN}/docs/ARCHITECTURE-RATIONALE.md'
doc = open(doc_p, encoding='utf-8').read().split('\n'); rat = open(rat_p, encoding='utf-8').read().split('\n')
idx_ids = swap_restated(doc, INDEX_HDR, 'index', set())
pa_ids = swap_restated(rat, PARTA_HDR, 'part_a', {'J-A73.06'})
log['swap']['index_equals_part_a'] = (sorted(idx_ids) == sorted(pa_ids))
open(doc_p, 'w', encoding='utf-8').write('\n'.join(doc)); open(rat_p, 'w', encoding='utf-8').write('\n'.join(rat))
SUBS = [  # (volume, 1-based line, old, new, the requesting text)
    ('docs/volumes/V10-clerk.md', 12, "items 1–119 the owner's instructions and file g's rules", "items 1–120 the owner's instructions and file g's rules",
     "repair-r1-V10.md preamble, HAND-OFFS: \"Title block (assembler or close): 'items 1–119' → 'items 1–120'.\""),
    ('docs/volumes/V11-content.md', 11, "items 1–101 the owner's instructions, 102–119", "items 1–101 the owner's instructions, 102–120",
     "repair-r1-V11.md preamble: \"The preamble under the volume's title … still reads '102–119' … The assembler may widen the preamble's range to '102–120' by hand.\""),
    ('docs/volumes/V12-calibration.md', 8, "1–101 the owner's instructions, 102–119 file g's owner and program rules", "1–101 the owner's instructions, 102–120 file g's owner and program rules",
     "repair-r1-V12.md preamble, note (8) ASSEMBLE NOTE: \"it should read '102–120'. One token; assemble applies it in place (no other text there changes).\""),
]
for path, ln, old, new, why in SUBS:
    p = f'{FIN}/{path}'; L = open(p, encoding='utf-8').read().split('\n')
    first_h2 = next(i for i, l in enumerate(L) if l.startswith('## '))
    line = L[ln - 1]
    if not (ln - 1 < first_h2 and line.count(old) == 1 and new not in line and sum(l.count(old) for l in L[:first_h2]) == 1):
        sys.exit(f'STOP — {path} l. {ln}: the old string is not exactly once in the title block, or the new one is there')
    L[ln - 1] = line.replace(old, new)
    open(p, 'w', encoding='utf-8').write('\n'.join(L))
    log['substitutions'].append(dict(file=path, line=ln, old=old, new=new, requested_by=why, line_before_sha256=sha(line), line_after_sha256=sha(L[ln - 1])))
log['final_sha256'] = {p: hashlib.sha256(open(f'{FIN}/{p}', 'rb').read()).hexdigest() for p in
                       ['docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'] + [x[0] for x in SUBS]}
json.dump(log, open(f'{W}/handoff.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('index swaps', log['swap']['index']['ids_swapped'], 'rows', log['swap']['index']['rows_after'], 'dups', log['swap']['index']['duplicate_ids_after'])
print('Part A swaps', log['swap']['part_a']['ids_swapped'], 'rows', log['swap']['part_a']['rows_after'], 'dups', log['swap']['part_a']['duplicate_ids_after'],
      'older line', [x['older_line'] for x in log['swap']['part_a']['swaps']], 'appended line', [x['appended_line'] for x in log['swap']['part_a']['swaps']])
print('index id set == Part A id set:', log['swap']['index_equals_part_a'])
for s in log['substitutions']: print('SUB', s['file'], 'l.', s['line'], repr(s['old'][-20:]), '->', repr(s['new'][-20:]))
