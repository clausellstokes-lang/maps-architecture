#!/usr/bin/env python3
"""route.py (coherence/assemble-r1, P2) — the block inventory and routing of the eighteen repair-r1 files.

Each docs/validation/coherence/repair-r1-<unit>.md is cut at its "=== FILE <path> ===" lines; every block goes to the
document its nearest FILE line above names (docs/ARCHITECTURE.md when none). For each target document one split block
file per repair file is written to split/<target-key>/<repair basename> (the basename kept, so apply-blocks.py's NAME
order is the round's order), the FILE lines left out (routing, not blocks), every other line kept verbatim — RULING
REQUEST blocks included, so the applier's own MALFORMED rule is seen to skip them. Writes blocks.json (inventory,
ruling requests, the census of targets in the pre-round text: missing headings, double and nested REPLACEs)."""
import glob, hashlib, json, os, re, sys
sys.path.insert(0, '/home/user/maps-architecture/docs/validation/amendments-b')
import importlib.util
spec = importlib.util.spec_from_file_location('ab', '/home/user/maps-architecture/docs/validation/amendments-b/apply-blocks.py')
ab = importlib.util.module_from_spec(spec); spec.loader.exec_module(ab)

ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r1')
BEFORE = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/before'
os.chdir(ROOT)
FILE_RX = re.compile(r'^=== FILE (\S+) ===\s*$')
RULING_RX = re.compile(r'^=== RULING REQUEST (.+?) ===\s*$')
BASE = 'docs/ARCHITECTURE.md'

def key(path):
    return 'base' if path == BASE else os.path.basename(path)[:-3]

repairs = sorted(glob.glob('docs/validation/coherence/repair-r1-*.md'), key=os.path.basename)
inv = dict(repair_files=[], targets={}, ruling_requests=[], census={})
split = {}   # target path -> {basename: [lines]}
for rp in repairs:
    lines = open(rp, encoding='utf-8').read().split('\n')
    bn = os.path.basename(rp)
    target = BASE
    seen = False
    rec = dict(file=rp, sha256=hashlib.sha256(open(rp, 'rb').read()).hexdigest(), lines=len(lines), file_lines=[], blocks=[])
    cur_rr = None
    for n, l in enumerate(lines):
        m = FILE_RX.match(l)
        if m:
            target = m.group(1); rec['file_lines'].append(dict(line=n + 1, target=target)); seen = True
            continue
        if l.startswith('=== '):
            seen = True
        if not seen:
            continue       # the preamble (the repair report) stays out of the split files, as the applier ignores it
        split.setdefault(target, {}).setdefault(bn, []).append(l)
        mr = RULING_RX.match(l)
        if mr:
            # first non-blank line of the request's text
            first = next((x for x in lines[n + 1:] if x.strip()), '')
            nxt = next((i for i in range(n + 1, len(lines)) if lines[i].startswith('=== ')), len(lines))
            inv['ruling_requests'].append(dict(unit=bn[len('repair-r1-'):-3], id=mr.group(1), file=rp, line=n + 1,
                                               first_line=first.strip(), body_lines=nxt - n - 1, closed_by=lines[nxt] if nxt < len(lines) else None,
                                               target_doc=target))
    # trailing text after the last END (ignored by the applier) — recorded
    last_end = max((i for i, l in enumerate(lines) if l.rstrip() == '=== END ==='), default=None)
    tail = [l for l in lines[last_end + 1:]] if last_end is not None else []
    rec['tail_nonblank_lines_after_last_END'] = sum(1 for l in tail if l.strip())
    inv['repair_files'].append(rec)

os.makedirs(os.path.join(W, 'split'), exist_ok=True)
for target, per in split.items():
    d = os.path.join(W, 'split', key(target)); os.makedirs(d, exist_ok=True)
    for bn, ls in per.items():
        open(os.path.join(d, bn), 'w', encoding='utf-8').write('\n'.join(ls) + '\n')
    pre = os.path.join(BEFORE, target)
    doc = open(pre, encoding='utf-8').read().split('\n')
    heads, bal = ab.headings(doc)
    blocks = []
    for bn in sorted(per):
        pf = ab.parse_blocks(os.path.join(d, bn))
        for b in pf['blocks']:
            ent = dict(repair=bn, index=b['index'], line_in_split=b['line'], kind=b['kind'], target=b['target'], closed=b['closed'],
                       body_lines=len(ab.strip_blank(b['body'])))
            if b['kind'] in ('REPLACE', 'INSERT AFTER', 'APPEND TO SECTION'):
                ks = [k for k, h in enumerate(heads) if h[2] == b['target']]
                ent['found_in_pre_round_text'] = len(ks)
                if len(ks) == 1:
                    s, e = ab.section_range(doc, heads, ks[0])
                    ent['pre_range'] = [s, e]; ent['pre_level'] = heads[ks[0]][1]
                body = ab.strip_blank(b['body'])
                bh, _ = ab.headings(body)
                ent['body_headings'] = len(bh)
                ent['body_first'] = body[0][:120] if body else ''
            blocks.append(ent)
            if pf['issues']:
                ent['file_issues'] = pf['issues']
    # census: same-heading and nested REPLACE/other overlaps in the pre-round text
    overl = []
    sec = [b for b in blocks if 'pre_range' in b]
    for i in range(len(sec)):
        for j in range(i + 1, len(sec)):
            a, c = sec[i], sec[j]
            (s1, e1), (s2, e2) = a['pre_range'], c['pre_range']
            if s1 < e2 and s2 < e1:
                kind = 'same heading' if (s1, e1) == (s2, e2) else 'nested'
                overl.append(dict(kind=kind, a=f"{a['repair']} #{a['index']} {a['kind']} {a['target'][:80]}",
                                  b=f"{c['repair']} #{c['index']} {c['kind']} {c['target'][:80]}", a_range=a['pre_range'], b_range=c['pre_range']))
    inv['targets'][target] = dict(split_dir=os.path.relpath(d, ROOT), files=sorted(per), blocks=blocks)
    inv['census'][target] = dict(blocks=len(blocks),
                                 by_kind={k: sum(1 for b in blocks if b['kind'] == k) for k in sorted({b['kind'] for b in blocks})},
                                 missing=[f"{b['repair']} #{b['index']} {b['kind']} {b['target']}" for b in blocks if b.get('found_in_pre_round_text') == 0],
                                 ambiguous=[f"{b['repair']} #{b['index']} {b['target']}" for b in blocks if (b.get('found_in_pre_round_text') or 0) > 1],
                                 unclosed=[f"{b['repair']} #{b['index']} {b['kind']}" for b in blocks if not b['closed']],
                                 overlaps=overl)
json.dump(inv, open(os.path.join(W, 'blocks.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for t, c in inv['census'].items():
    print(f"{t}: {c['blocks']} blocks {c['by_kind']}; missing {len(c['missing'])}; ambiguous {len(c['ambiguous'])}; unclosed {len(c['unclosed'])}; overlaps {len(c['overlaps'])}")
    for x in c['missing'] + c['ambiguous'] + c['unclosed']:
        print('   ', x)
    for o in c['overlaps']:
        print('    OVERLAP', o['kind'], '|', o['a'], '|', o['b'], o['a_range'], o['b_range'])
print('ruling requests:', len(inv['ruling_requests']))
for r in inv['ruling_requests']:
    print('  ', r['unit'], r['id'], 'l.', r['line'], '->', r['target_doc'], '| closed by', r['closed_by'], '|', r['first_line'][:160])
for r in inv['repair_files']:
    if r['tail_nonblank_lines_after_last_END']:
        print('TAIL after last END:', r['file'], r['tail_nonblank_lines_after_last_END'])
