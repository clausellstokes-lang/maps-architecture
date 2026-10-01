#!/usr/bin/env python3
"""handoff.py (coherence/assemble-r3, P3b) — the scripted hand-offs the repair-r3 files address to the assembler (their
ASSEMBLE NOTES, brief ROUND-3 NOTES (9) (a)), applied to a copy of apply.py's outputs (scratch asm3/out -> asm3/final;
out/ stays the 'new' copy of the three-copy method). Each is applied exactly as its note writes it, count-asserted:
 (1) rendering's NOTE FOR ASSEMBLE: RATIONALE-A's last row restates Part A's J-A68.89 — the seat's own script
     work/repair-rendering-r3/swap_restated.py RATIONALE_IN RATIONALE_OUT (run unchanged; it stops unless J-A68.89 occurs
     exactly twice in Part A);
 (2) scope's NOTE FOR ASSEMBLE: J-A120.01 restated in the judgment index and Part A — work/repair-scope-r3/
     swap_restated.py BASE RATIONALE BASE_OUT RATIONALE_OUT (unchanged; stops unless twice in each);
 (3) kernel's NOTE FOR ASSEMBLE: J-A81.31 restated in both — work/repair-kernel-r3/swap_restated.py, same usage;
     run in the order kernel's note gives ("run in rendering, scope, kernel order"); each is independent of the others;
 (4) V05's ASSEMBLE NOTE (R2-07; Part H · V05's note on VAL-R2-04): in V05's title block (the text above its first '## '
     heading), l. 11's "items 1–120 the owner's" reads "items below 200 the owner's"; the old string must occur exactly
     once there and the new one not at all; no line added or removed; no other text of the title block changes.
After (1)–(3): the judgment index and Part A must hold one id set, no duplicate in either.
Also a CHECK (no output): kernel's recorded 'alone' dry run (its blocks alone on the live base and rationale, then its swap)
is reproduced and compared with the sha256 prefixes its header records (base 590e3def…, rationale ac868127…).
Writes handoff.json beside it."""
import hashlib, json, os, re, shutil, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r3')
WK = os.path.join(ROOT, 'docs/validation/coherence/work')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm3'
BEFORE, OUT, FIN, TMP = f'{SCR}/before', f'{SCR}/out', f'{SCR}/final', f'{SCR}/handoff-tmp'
BASE, RAT = 'docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'
h = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
for d in (FIN, TMP):
    if os.path.exists(d): shutil.rmtree(d)
shutil.copytree(OUT, FIN); os.makedirs(TMP)
log = dict(swaps=[], substitutions=[], checks={})

def run(cmd, label):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f'STOP — {label}: exit {r.returncode}\n{r.stdout}\n{r.stderr}')
    return r.stdout

# (1) rendering — rationale only
b0, r0 = f'{FIN}/{BASE}', f'{FIN}/{RAT}'
r1 = f'{TMP}/rat-1.md'
o = run(['python3', f'{WK}/repair-rendering-r3/swap_restated.py', r0, r1], 'rendering swap')
log['swaps'].append(dict(note='repair-r3-rendering.md, NOTE FOR ASSEMBLE (J-A68.89, Part A only)', script='work/repair-rendering-r3/swap_restated.py',
                         stdout=o.strip().split('\n'), rationale_sha256=h(r1)))
shutil.copyfile(r1, r0)
# (2) scope, (3) kernel — base and rationale
for unit, rid in (('scope', 'J-A120.01'), ('kernel', 'J-A81.31')):
    bo, ro = f'{TMP}/base-{unit}.md', f'{TMP}/rat-{unit}.md'
    o = run(['python3', f'{WK}/repair-{unit}-r3/swap_restated.py', b0, r0, bo, ro], f'{unit} swap')
    log['swaps'].append(dict(note=f'repair-r3-{unit}.md, NOTE FOR ASSEMBLE ({rid}, judgment index and Part A)',
                             script=f'work/repair-{unit}-r3/swap_restated.py', stdout=o.strip().split('\n'), base_sha256=h(bo), rationale_sha256=h(ro)))
    shutil.copyfile(bo, b0); shutil.copyfile(ro, r0)

# the id sets after the three swaps
def ids(lines, a, b):
    return [m.group(1) for l in lines[a:b] for m in [re.match(r'^\|\s*(J-[^|\s]+)\s*\|', l)] if m]
bl = open(b0, encoding='utf-8').read().split('\n'); rl = open(r0, encoding='utf-8').read().split('\n')
a = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls')); b = next(i for i in range(a + 1, len(bl)) if bl[i].startswith('# '))
pa = next(i for i, l in enumerate(rl) if l.startswith('## Part A')); pb = next(i for i, l in enumerate(rl) if l.startswith('## Part B'))
bi, ri = ids(bl, a, b), ids(rl, pa, pb)
bl0 = open(f'{BEFORE}/{BASE}', encoding='utf-8').read().split('\n'); rl0 = open(f'{BEFORE}/{RAT}', encoding='utf-8').read().split('\n')
a0 = next(i for i, l in enumerate(bl0) if l.startswith('# Judgment calls')); b0_ = next(i for i in range(a0 + 1, len(bl0)) if bl0[i].startswith('# '))
pa0 = next(i for i, l in enumerate(rl0) if l.startswith('## Part A')); pb0 = next(i for i, l in enumerate(rl0) if l.startswith('## Part B'))
bi0, ri0 = ids(bl0, a0, b0_), ids(rl0, pa0, pb0)
log['checks']['ids'] = dict(index_before=len(bi0), part_a_before=len(ri0), index_after=len(bi), part_a_after=len(ri),
                            index_duplicates=sorted({i for i in bi if bi.count(i) > 1}), part_a_duplicates=sorted({i for i in ri if ri.count(i) > 1}),
                            one_id_set=(set(bi) == set(ri)), only_in_index=sorted(set(bi) - set(ri)), only_in_part_a=sorted(set(ri) - set(bi)),
                            new_ids=sorted(set(bi) - set(bi0)), removed_ids=sorted(set(bi0) - set(bi)))
c = log['checks']['ids']
if c['index_duplicates'] or c['part_a_duplicates'] or not c['one_id_set'] or c['removed_ids']:
    sys.exit(f'STOP — id sets after the swaps: {c}')
# each restated row now stands where its older row stood (line position of the id unchanged against the untouched text)
pos = {}
for rid in ('J-A68.89', 'J-A120.01', 'J-A81.31'):
    pos[rid] = dict(index_before=next((i + 1 for i in range(a0, b0_) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', bl0[i])), None),
                    index_after=next((i + 1 for i in range(a, b) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', bl[i])), None),
                    part_a_before=next((i + 1 for i in range(pa0, pb0) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', rl0[i])), None),
                    part_a_after=next((i + 1 for i in range(pa, pb) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', rl[i])), None))
log['checks']['restated_positions'] = pos

# (4) V05's title block
SUBS = [('docs/volumes/V05-sky.md', "items 1–120 the owner's", "items below 200 the owner's",
         "repair-r3-V05.md header, ASSEMBLE NOTE — the title block (R2-07; Part H · V05's note on VAL-R2-04): docs/volumes/V05-sky.md "
         "l. 11, 'amendment item — items 1–120 the owner's, items 200 and above file f's, each the applied text of a volume's base change': "
         "'items 1–120 the owner's' reads 'items below 200 the owner's' … No other text of the title block changes.")]
for path, old, new, why in SUBS:
    p = f'{FIN}/{path}'; t = open(p, encoding='utf-8').read()
    m = re.search(r'^## ', t, re.M); tb, rest = t[:m.start()], t[m.start():]
    if tb.count(old) != 1 or new in tb:
        sys.exit(f'STOP — {path}: the old string is not exactly once in the title block, or the new one is already there')
    line = tb[:tb.index(old)].count('\n') + 1
    tb2 = tb.replace(old, new)
    assert tb2.count('\n') == tb.count('\n')
    open(p, 'w', encoding='utf-8').write(tb2 + rest)
    full_line = (tb2 + rest).split('\n')[line - 1]
    log['substitutions'].append(dict(file=path, line=line, old=old, new=new, line_after=full_line, requested_by=why))

# CHECK — kernel's recorded 'alone' dry run reproduced
kb, kr = f'{TMP}/k-alone-base.md', f'{TMP}/k-alone-rat.md'
run(['python3', os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py'), '--doc', f'{BEFORE}/{BASE}', '--rationale', f'{BEFORE}/{RAT}',
     '--out-doc', kb, '--out-rationale', kr, '--log', f'{TMP}/k-alone.json', f'{W}/split/base/repair-r3-kernel.md'], 'kernel alone')
run(['python3', f'{WK}/repair-kernel-r3/swap_restated.py', kb, kr, kb + '.s', kr + '.s'], 'kernel alone swap')
log['checks']['kernel_alone'] = dict(base_sha256=h(kb + '.s'), rationale_sha256=h(kr + '.s'),
                                     equals_recorded=(h(kb + '.s').startswith('590e3def') and h(kr + '.s').startswith('ac868127')))

paths = [BASE, RAT] + [s[0] for s in SUBS]
log['final_sha256'] = {p: h(f'{FIN}/{p}') for p in paths}
log['out_equals_final'] = {p: open(f'{OUT}/{p}', 'rb').read() == open(f'{FIN}/{p}', 'rb').read() for p in paths}
json.dump(log, open(f'{W}/handoff.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for s in log['swaps']:
    print('SWAP', s['note']); [print('    ', x) for x in s['stdout']]
print('ids', json.dumps(c))
print('restated positions', json.dumps(pos))
for s in log['substitutions']: print('SUB', s['file'], 'l.', s['line'], repr(s['old']), '->', repr(s['new']), '|', s['line_after'][:130])
print('kernel alone reproduced:', log['checks']['kernel_alone'])
for p, x in log['final_sha256'].items(): print(f'{p:<40} {x[:16]}')
