#!/usr/bin/env python3
"""hidden-ways/file-x: check draft-x.fragments.json and draft-x.md against the live targets (confirm-only, copies only).
check_json's form (md5s, each old once at its line, in-order application, new once after, byte-identical reversal) plus
verify_w3's (md <-> json by id and order, every item has a fragment, negative controls) plus the blockquotes of the md
equal to the JSON's old/new, and the clean room over the V13/V14 new texts. Usage: check_x.py ROOT"""
import copy, hashlib, json, re, sys
ROOT = sys.argv[1]
D = f'{ROOT}/docs/validation/hidden-ways-2026-10-18'
frags = json.load(open(f'{D}/draft-x.fragments.json', encoding='utf-8'))
md = open(f'{D}/draft-x.md', encoding='utf-8', newline='').read()
TOKENS = ['way_known', 'way_rung', 'way_forgotten', 'settlementId', 'wayId', '.js', '.ts', 'research/sf', 'HRQ:', 'FPI:',
          'TRD:', 'FTH:', 'FPS:', 'FRR:', 'PLG:', 'LNS:', 'src/', 'spatialLedgers', "how: 'office'", "kind: 'hidden'",
          '`wild`', 'tick)']
def run(fr):
    F, n = [], 0
    raw = {f: open(f'{ROOT}/{f}', 'rb').read() for f in sorted({x['file'] for x in fr})}
    texts = {f: b.decode('utf-8') for f, b in raw.items()}
    for x in fr:
        t = texts[x['file']]
        n += 1
        if hashlib.md5(raw[x['file']]).hexdigest() != x['md5']: F.append(f"{x['id']}: md5 {x['md5'][:8]} != live ({x['file']})")
        n += 1; c = t.count(x['old'])
        if c != 1: F.append(f"{x['id']}: old occurs {c}x"); continue
        n += 1; L = t[:t.index(x['old'])].count('\n') + 1
        if L != x['line']: F.append(f"{x['id']}: old at line {L}, stated {x['line']}")
    cur = dict(texts)
    for x in fr:
        n += 1
        if cur[x['file']].count(x['old']) != 1: F.append(f"apply {x['id']}: old {cur[x['file']].count(x['old'])}x"); continue
        cur[x['file']] = cur[x['file']].replace(x['old'], x['new'], 1)
        n += 1
        if cur[x['file']].count(x['new']) != 1: F.append(f"apply {x['id']}: new {cur[x['file']].count(x['new'])}x after")
    applied = dict(cur)
    for x in fr:
        n += 1
        t = applied[x['file']]
        if t.count(x['new']) != 1: F.append(f"final {x['id']}: new {t.count(x['new'])}x")
        n += 1
        if t.count(x['old']) - x['new'].count(x['old']) != 0: F.append(f"final {x['id']}: old left outside its new")
    for x in reversed(fr):
        n += 1
        if cur[x['file']].count(x['new']) != 1: F.append(f"reverse {x['id']}: new {cur[x['file']].count(x['new'])}x"); continue
        cur[x['file']] = cur[x['file']].replace(x['new'], x['old'], 1)
    for f in texts:
        n += 1
        if cur[f].encode('utf-8') != raw[f]: F.append(f'reversal not byte-identical: {f}')
    return F, n, applied, texts
fails, checks, applied, texts = run(frags)
ids = [x['id'] for x in frags]
checks += 1
if len(set(ids)) != len(ids): fails.append('duplicate ids')
mdids = re.findall(r'^\*\*(\d{3} \([a-z]+\))\.\*\*', md, re.M)
checks += 1
if mdids != ids: fails.append(f'md ids/order != json ({len(mdids)} vs {len(ids)})')
items = sorted(set(re.findall(r'^\*\*(\d{3})\.\*\*', md, re.M)))
for it in items:
    checks += 1
    if not any(j.startswith(it + ' (') for j in ids): fails.append(f'item {it} has no fragment')
# the md's quotes equal the JSON's old / new, and its locator line and md5 equal the JSON's
def unq(block): return '\n'.join('' if l == '>' else l[2:] for l in block.split('\n'))
for x in frags:
    m = re.search(r'^\*\*' + re.escape(x['id']) + r'\.\*\* .*?Target: `([^`]+)`, line (\d+) \(md5 `([0-9a-f]{8})…`\) as it stands now\.\n'
                  r'\*Current text \(as it stands now\):\*\n((?:>.*\n)+)\*New text:\*\n((?:>.*\n)+)\*Evidence:\*', md, re.M)
    checks += 1
    if not m: fails.append(f"md {x['id']}: block not found"); continue
    f, ln, h, o, nw = m.group(1), int(m.group(2)), m.group(3), unq(m.group(4).rstrip('\n')), unq(m.group(5).rstrip('\n'))
    for ok, what in ((f == x['file'], 'file'), (ln == x['line'], 'line'), (x['md5'].startswith(h), 'md5'),
                     (o == x['old'], 'old'), (nw == x['new'], 'new')):
        checks += 1
        if not ok: fails.append(f"md {x['id']}: {what} differs from the JSON")
# clean room over V13/V14 new texts
for x in frags:
    if x['file'].startswith('docs/volumes/V1'):
        for tok in TOKENS:
            checks += 1
            if tok in x['new']: fails.append(f"clean room: {x['id']} new carries {tok!r}")
# negative controls on copies: each must fail
neg = []
for kind in ('old', 'line', 'md5', 'ambiguous-old'):
    m = copy.deepcopy(frags); x = m[3]
    if kind == 'old': x['old'] = x['old'][:-1] + ('X' if x['old'][-1] != 'X' else 'Y')
    if kind == 'line': x['line'] += 40
    if kind == 'md5': x['md5'] = '0' * 32
    if kind == 'ambiguous-old': x['old'] = ' pw'
    Fn, _, _, _ = run(m); neg.append((kind, x['id'], len(Fn), Fn[:1]))
checks += len(neg)
for k in neg:
    if k[2] == 0: fails.append(f'negative control {k[0]} not caught')
print('fragments', len(frags), 'md ids', len(mdids), 'items', len(items), items[0], items[-1])
print('checks', checks, 'failures', len(fails))
for f in fails: print(' FAIL', f)
for k in neg: print(' NEG', k)
for f in texts:
    print(f, hashlib.md5(texts[f].encode()).hexdigest()[:8], '->', hashlib.md5(applied[f].encode()).hexdigest()[:8],
          texts[f].count('\n'), '->', applied[f].count('\n'), 'lines')
sys.exit(1 if fails else 0)
