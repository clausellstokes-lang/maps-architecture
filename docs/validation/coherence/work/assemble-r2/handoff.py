#!/usr/bin/env python3
"""handoff.py (coherence/assemble-r2, P3b) — the scripted hand-offs the repair-r2 files address to the assembler (their
ASSEMBLE NOTES, brief ROUND-2 NOTES (9) (a)), applied to a copy of apply.py's outputs (scratch asm2/out -> asm2/final;
out/ stays the 'new' copy of the three-copy method). Each is applied exactly as its note writes it, count-asserted:
 (1) scope's NOTE FOR ASSEMBLE (1): RATIONALE-A's last six rows restate existing Part A entries (J-DET-11, J-A20.71,
     J-A113.61, J-A114.01, J-A568.01, J-A76.41) — each appended row takes its older row's place and the older row is
     deleted, so Part A keeps one row per id (assemble-r1's swap_restated, logic unchanged; the duplicate id set must be
     exactly those six in Part A and empty in the judgment index, whose rows scope's REPLACE changed in place).
 (2) scope's NOTE FOR ASSEMBLE (2): the quoted sentence under "#### R25 — §7.7 → J-DET-11" in the rationale's Part F,
     replaced once by the exact strings of work/repair-scope-r2/dryrun.py (R25_OLD / R25_NEW, imported, not retyped).
 (3) the title-block substitutions R2-07 gives to Assemble ("text inside a title's level-1 subsection is Assemble's to
     set in place"), each from that volume's own repair-r2 header: V02, V04, V06, V07, V08 (two), V09, V10, V11, V12.
     Each old string must occur exactly once in the title block (the text above the volume's first '## ' heading) and
     nowhere else in that block's new form; a string crossing a hard line break keeps the break before the same word.
Writes handoff.json beside it."""
import hashlib, importlib.util, json, os, re, shutil, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r2')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm2'
OUT, FIN = f'{SCR}/out', f'{SCR}/final'
sha = lambda s: hashlib.sha256(s.encode('utf-8')).hexdigest()
if os.path.exists(FIN): shutil.rmtree(FIN)
shutil.copytree(OUT, FIN)
log = dict(swap={}, r25={}, substitutions=[])
ROW_ID = re.compile(r'^\|\s*([^|]+?)\s*\|')
FENCE = re.compile(r'^\s*(```|~~~)')
INDEX_HDR = re.compile(r'^\|\s*id\s*\|\s*the choice\s*\|\s*where\s*\|\s*$')
PARTA_HDR = re.compile(r'^\|\s*id\s*\|\s*call\s*\|\s*$')
RESTATED = {'J-DET-11', 'J-A20.71', 'J-A113.61', 'J-A114.01', 'J-A568.01', 'J-A76.41'}

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

# the RATIONALE-A rows of scope's block file (the only rows allowed to be the later, restated row)
blk = open(f'{W}/split/base/repair-r2-scope.md', encoding='utf-8').read().split('\n')
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
        swaps.append(dict(id=k, older_line=i + 1, appended_line=j + 1, old_row_sha256=sha(old), new_row_sha256=sha(new)))
    h, last = table_bounds(lines, header_rx)
    ids = [ROW_ID.match(l).group(1) for l in lines[h + 2:last + 1] if ROW_ID.match(l)]
    log['swap'][name] = dict(ids_swapped=[x['id'] for x in swaps], swaps=swaps, rows_after=len(ids),
                             duplicate_ids_after=sorted({i for i in ids if ids.count(i) > 1}))
    return ids

doc_p, rat_p = f'{FIN}/docs/ARCHITECTURE.md', f'{FIN}/docs/ARCHITECTURE-RATIONALE.md'
doc = open(doc_p, encoding='utf-8').read().split('\n'); rat = open(rat_p, encoding='utf-8').read().split('\n')
idx_ids = swap_restated(doc, INDEX_HDR, 'index', set())
pa_ids = swap_restated(rat, PARTA_HDR, 'part_a', RESTATED)
log['swap']['index_equals_part_a'] = (sorted(idx_ids) == sorted(pa_ids))
log['swap']['only_in_index'] = sorted(set(idx_ids) - set(pa_ids)); log['swap']['only_in_part_a'] = sorted(set(pa_ids) - set(idx_ids))
# (2) R25 — the exact strings of scope's dry run
spec = importlib.util.spec_from_file_location('scopedry', os.path.join(ROOT, 'docs/validation/coherence/work/repair-scope-r2/dryrun.py'))
sd = importlib.util.module_from_spec(spec); spec.loader.exec_module(sd)   # module top level only defines constants and functions
rt = '\n'.join(rat)
r25_head = rt.find('#### R25 — §7.7 → J-DET-11')
if rt.count(sd.R25_OLD) != 1 or sd.R25_NEW in rt or r25_head < 0:
    sys.exit('STOP — R25: the old sentence is not exactly once, the new one is already there, or the R25 heading is missing')
at = rt.index(sd.R25_OLD)
nxt = rt.find('\n#### ', r25_head + 1)
if not (r25_head < at < (nxt if nxt > 0 else len(rt))):
    sys.exit('STOP — R25: the old sentence is not under the R25 heading')
rt = rt.replace(sd.R25_OLD, sd.R25_NEW)
log['r25'] = dict(heading='#### R25 — §7.7 → J-DET-11', line=rt[:at].count('\n') + 1, old_sha256=sha(sd.R25_OLD), new_sha256=sha(sd.R25_NEW))
open(doc_p, 'w', encoding='utf-8').write('\n'.join(doc)); open(rat_p, 'w', encoding='utf-8').write(rt)

# (3) title blocks (R2-07)
SUBS = [  # (volume, old, new, the requesting text)
    ('docs/volumes/V02-buildings.md', "owner items 1–101, file g 102–120, file f 200–585", "owner items 1–101, file g, file f 200–585",
     "repair-r2-V02.md header, ASSEMBLE NOTE (R2-07; VV12-r1-06): line 7 — replace the one occurrence of 'owner items 1–101, file g 102–120, file f 200–585' with 'owner items 1–101, file g, file f 200–585'"),
    ('docs/volumes/V04-underground.md',
     "items 1–120 the\nowner's rules (item 112 the program's, under J122), items 200 and above file f's",
     "items numbered below 200 the\nowner's rules (item 112 the program's, under J122), items 200 and above file f's",
     "repair-r2-V04.md header, HAND-OFFS, 'Assemble (R2-07 …)': the reading note's 'items 1–120 the owner's rules (item 112 the program's, under J122), items 200 and above file f's' in R2-07's form reads 'items numbered below 200 the owner's rules (item 112 the program's, under J122), items 200 and above file f's'"),
    ('docs/volumes/V06-evolution.md', "items 1–119 the owner's", "items below 200 the owner's",
     "repair-r2-V06.md header, ASSEMBLE NOTE (R2-07): l. 10's 'items 1–119 the owner's' reads 'items below 200 the owner's'"),
    ('docs/volumes/V07-village.md', "items 1–120 the owner's, items 200 and", "items below 200 the owner's, items 200 and",
     "repair-r2-V07.md header, NOTE FOR ASSEMBLE (R2-07): head l. 10, 'items 1–120 the owner's, items 200 and' → 'items below 200 the owner's, items 200 and'"),
    ('docs/volumes/V08-settlementforge.md', "items 1–120 the owner's", "items below 200 the owner's",
     "repair-r2-V08.md header, ASSEMBLE NOTE (R2-07): l. 10–11's 'items 1–120 the owner's' reads 'items below 200 the owner's'"),
    ('docs/volumes/V08-settlementforge.md', "`DR1`–`DR43`", "`DR1`–`DR44`",
     "repair-r2-V08.md header, ASSEMBLE NOTE (R2-07, R2-11): l. 15's '`DR1`–`DR43`' reads '`DR1`–`DR44`' (R2-11's DR44)"),
    ('docs/volumes/V09-application.md', "102–119 file g's owner and program rules,", "file g's items, from 102, its owner and program rules,",
     "repair-r2-V09.md header, HAND-OFFS, 'Assemble (R2-07)': the title block's '… 102–119 file g's owner and program rules, 200 and above file f's'; in R2-07's form the g clause states no upper number ('file g's items, from 102, its owner and program rules')"),
    ('docs/volumes/V10-clerk.md', "items 1–120 the owner's instructions and file g's rules", "items below 200 the owner's instructions and file g's items",
     "repair-r2-V10.md header, ASSEMBLE NOTE (R2-07): l. 12's 'items 1–120 the owner's instructions and file g's rules'; in R2-07's form it names no upper number for file g (the note's own wording: 'items below 200 the owner's instructions and file g's items')"),
    ('docs/volumes/V11-content.md',
     "items 1–101 the owner's instructions, 102–120\nfile g's owner and program rules",
     "items 1–101 the owner's instructions,\nfile g's items the owner's and program rules",
     "repair-r2-V11.md header, ASSEMBLE NOTE (R2-07): l. 12's 'items 1–101 the owner's instructions, 102–120 file g's owner and program rules' reads 'items 1–101 the owner's instructions, file g's items the owner's and program rules'"),
    ('docs/volumes/V12-calibration.md',
     "1–101 the owner's instructions, 102–120 file g's owner and program rules, 200 and",
     "1–101 the owner's instructions, file g's items, from 102, its owner and program rules, 200 and",
     "repair-r2-V12.md header, ASSEMBLE NOTE (R2-07): line 8's '1–101 the owner's instructions, 102–120 file g's owner and program rules, 200 and above file f's' reads '1–101 the owner's instructions, file g's items, from 102, its owner and program rules, 200 and above file f's'"),
]
for path, old, new, why in SUBS:
    p = f'{FIN}/{path}'; t = open(p, encoding='utf-8').read()
    m = re.search(r'^## ', t, re.M); tb, rest = t[:m.start()], t[m.start():]
    if tb.count(old) != 1 or new in tb:
        sys.exit(f'STOP — {path}: the old string is not exactly once in the title block, or the new one is already there')
    line = tb[:tb.index(old)].count('\n') + 1
    tb2 = tb.replace(old, new)
    assert tb2.count('\n') == tb.count('\n')            # no line added or removed
    open(p, 'w', encoding='utf-8').write(tb2 + rest)
    log['substitutions'].append(dict(file=path, line=line, lines_spanned=old.count('\n') + 1, old=old, new=new, requested_by=why))
paths = ['docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'] + sorted({x[0] for x in SUBS})
log['final_sha256'] = {p: hashlib.sha256(open(f'{FIN}/{p}', 'rb').read()).hexdigest() for p in paths}
log['out_equals_final'] = {p: open(f'{OUT}/{p}', 'rb').read() == open(f'{FIN}/{p}', 'rb').read() for p in paths}
json.dump(log, open(f'{W}/handoff.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('index swaps', log['swap']['index']['ids_swapped'], 'rows', log['swap']['index']['rows_after'], 'dups', log['swap']['index']['duplicate_ids_after'])
print('Part A swaps', log['swap']['part_a']['ids_swapped'], 'rows', log['swap']['part_a']['rows_after'], 'dups', log['swap']['part_a']['duplicate_ids_after'],
      'older lines', [x['older_line'] for x in log['swap']['part_a']['swaps']], 'appended lines', [x['appended_line'] for x in log['swap']['part_a']['swaps']])
print('index id set == Part A id set:', log['swap']['index_equals_part_a'], log['swap']['only_in_index'], log['swap']['only_in_part_a'])
print('R25 at rationale line', log['r25']['line'])
for s in log['substitutions']: print('SUB', s['file'], 'l.', s['line'], f"({s['lines_spanned']} line(s))", repr(s['old'][:40]), '->', repr(s['new'][:44]))
for p, h in log['final_sha256'].items(): print(f'{p:<40} {h[:16]}')
