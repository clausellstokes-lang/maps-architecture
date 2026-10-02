#!/usr/bin/env python3
"""unitsizes.py (coherence/assemble-r7y, P7) — per repair unit (the nine repair-r7y files): blocks found, applied,
skipped (with reason), from the apply logs; and the words and KB before and after of the text the unit's blocks cover
(a REPLACE: its heading's section in the untouched text against the section of the body's heading in the installed text;
an APPEND: the target section; J-ROWS / RATIONALE-A: their rows, a restated row against the older row it replaces).
assemble-r7y: the 'after' text is apply.py's output (scratch out/), the blocks alone, so that each unit's words are its own
(this round the assembler changes nothing after the blocks, so out/ equals the installed text). Writes unitsizes.json."""
import glob, json, os, re, sys
import importlib.util
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
W = 'docs/validation/coherence/work/assemble-r7y'
B = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7y/before'
OUT = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7y/out'
spec = importlib.util.spec_from_file_location('ab', 'docs/validation/amendments-b/apply-blocks.py'); ab = importlib.util.module_from_spec(spec); spec.loader.exec_module(ab)
inv = json.load(open(f'{W}/blocks.json', encoding='utf-8'))
units = {}
def sec_text(lines, heading):
    heads, _ = ab.headings(lines)
    ks = [k for k, h in enumerate(heads) if h[2] == heading]
    if len(ks) != 1: return None
    s, e = ab.section_range(lines, heads, ks[0]); return '\n'.join(lines[s:e])
for target, t in inv['targets'].items():
    key = os.path.basename(t['split_dir'])
    log = json.load(open(f'{W}/logs/{key}.json', encoding='utf-8'))
    before = open(f'{B}/{target}', encoding='utf-8').read().split('\n'); after = open(f'{OUT}/{target}', encoding='utf-8').read().split('\n')
    applied = {(r['file'], r['index']): r for r in log['applied']}
    skipped = {(s['file'], int(re.search(r'#(\d+)', s['block']).group(1))): s['reason'] for s in log['skipped']}
    for b in t['blocks']:
        u = re.search(r'repair-r7y-(.+)\.md$', b['repair']).group(1)
        d = units.setdefault(u, dict(found=0, applied=0, skipped=0, skipped_detail=[], targets=set(), words_before=0, words_after=0, bytes_before=0, bytes_after=0, whole_files=[]))
        d['found'] += 1; d['targets'].add(target)
        k = (b['repair'], b['index'])
        if k in skipped:
            d['skipped'] += 1; d['skipped_detail'].append(f"#{b['index']} {b['kind']} {b['target'][:60]} — {skipped[k]}"); continue
        d['applied'] += 1
        r = applied[k]
        if b['kind'] in ('REPLACE', 'APPEND TO SECTION', 'INSERT AFTER'):
            tb = sec_text(before, b['target'])
            new_head = r.get('retitled_to') or b['target']
            ta = sec_text(after, new_head)
            if b['kind'] == 'REPLACE' and b.get('pre_level') == 1 and target != 'docs/ARCHITECTURE.md':
                d['whole_files'].append(target)
        else:
            ta_rows = [x for x in ab.parse_blocks(f"{t['split_dir']}/{b['repair']}")['blocks'][b['index'] - 1]['body'] if x.startswith('|')]
            ta = '\n'.join(ta_rows)
            # assemble-r5: a restated row (an id the untouched table already holds) counts the older row as its 'before'
            src = before if b['kind'] == 'J-ROWS' else open(f'{B}/docs/ARCHITECTURE-RATIONALE.md', encoding='utf-8').read().split('\n')
            rid = lambda x: (re.match(r'^\|\s*([^|]+?)\s*\|', x) or [None, None])[1]
            ids = {rid(x) for x in ta_rows}
            if b['kind'] == 'J-ROWS':
                a0 = next(i for i, l in enumerate(src) if l.startswith('# Judgment calls')); b0 = next(i for i in range(a0 + 1, len(src)) if src[i].startswith('# '))
            else:
                a0 = next(i for i, l in enumerate(src) if l.startswith('## Part A')); b0 = next(i for i, l in enumerate(src) if l.startswith('## Part B'))
            old_rows = [x for x in src[a0:b0] if x.startswith('|') and rid(x) in ids]
            tb = '\n'.join(old_rows)
            d.setdefault('restated_rows', []).extend(f"{b['kind']} {rid(x)}" for x in old_rows)
        if tb is None or ta is None: sys.exit(f'STOP — section not found for {u} #{b["index"]} {b["target"][:60]}')
        if b['kind'] == 'APPEND TO SECTION':   # the appended body only (the target's own text is counted by its REPLACE, if any)
            ta = '\n'.join(ab.strip_blank(ab.parse_blocks(f"{t['split_dir']}/{b['repair']}")['blocks'][b['index'] - 1]['body'])); tb = ''
        d['words_before'] += len(tb.split()); d['words_after'] += len(ta.split())
        d['bytes_before'] += len(tb.encode()); d['bytes_after'] += len(ta.encode())
out = {}
for u in sorted(units, key=lambda x: (not x.startswith('V'), x)):
    d = units[u]; d['targets'] = sorted(d['targets'])
    out[u] = d
    print(f"{u:<12} found {d['found']:>3} applied {d['applied']:>3} skipped {d['skipped']}  words {d['words_before']:>7} -> {d['words_after']:>7} "
          f"({(d['words_after'] / d['words_before'] - 1) * 100 if d['words_before'] else 0:+5.1f} %)  KB {d['bytes_before'] / 1024:7.1f} -> {d['bytes_after'] / 1024:7.1f}  {','.join(os.path.basename(x) for x in d['targets'])}")
    for s in d['skipped_detail']: print('     skipped', s)
tf = sum(d['found'] for d in units.values()); ta = sum(d['applied'] for d in units.values()); ts = sum(d['skipped'] for d in units.values())
print('total found', tf, 'applied', ta, 'skipped', ts)
json.dump(dict(units=out, total=dict(found=tf, applied=ta, skipped=ts)), open(f'{W}/unitsizes.json', 'w'), ensure_ascii=False, indent=1)
