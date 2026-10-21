#!/usr/bin/env python3
"""Builds draft-w.fragments.json and items.md from frags_*.py; checks every fragment:
old found exactly once in its target and starting on the stated line; no overlap per target; applied in order to
copies each old found once at its turn and each new once after; reversal restores the copies byte-for-byte."""
import hashlib, json, os, sys
ROOT = '/home/user/maps-architecture'
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import frags_v13a, frags_v13b, frags_rest
FR = frags_v13a.F + frags_v13b.F + frags_rest.F
DESIGNS = {d: {r['id']: r for r in json.load(open(f'{ROOT}/docs/validation/hidden-ways-2026-10-18/design-{d}.fragments.json'))} for d in 'ABC'}
TEXT = {}
def text(f):
    if f not in TEXT: TEXT[f] = open(f'{ROOT}/{f}', encoding='utf-8').read()
    return TEXT[f]
def md5(s): return hashlib.md5(s.encode('utf-8')).hexdigest()
MD5 = {}
problems = []
# resolve olds
Q5_ROW = "| V13 | Q5 — the hidden ways (file w): their price (M-W2 8 → 9 pw, the staged row 38–46), whether the host's bodies chain waits on M-W2 or builds its stand-in from `routeFacts`' stretches meanwhile, and whether the trod record reaches the host as the simulator feed's third optional product rather than a canon slot | accept the price and name M-W2; the stand-in meanwhile; the product as proposed (recommended; vetoable) |"
for fr in FR:
    t = text(fr['file']); lines = t.split('\n')
    o = fr['old']
    if isinstance(o, tuple):
        if o[0] in 'ABC':
            r = DESIGNS[o[0]][o[1]]
            assert r['file'] == fr['file'], (fr['item'], fr['letter'], r['file'], fr['file'])
            fr['old'] = r['old']
            if r['line'] != fr['line']: problems.append(f"{fr['item']} ({fr['letter']}): design line {r['line']} != {fr['line']}")
        elif o[0] == 'LINE':
            fr['old'] = lines[o[1]-1]
        elif o[0] == 'LINES':
            fr['old'] = '\n'.join(lines[o[1]-1:o[2]])
    if fr['new'] is None:  # 969 (g): the Q5 row after the Q4 row
        fr['new'] = fr['old'] + '\n' + Q5_ROW
    fr['md5'] = MD5.setdefault(fr['file'], md5(text(fr['file'])))
# check uniqueness and line
spans = {}
for fr in FR:
    t = text(fr['file']); o = fr['old']
    n = t.count(o)
    if n != 1: problems.append(f"{fr['item']} ({fr['letter']}) {fr['file']}:{fr['line']}: old occurs {n} times"); continue
    i = t.index(o); ln = t[:i].count('\n') + 1
    if ln != fr['line']: problems.append(f"{fr['item']} ({fr['letter']}) {fr['file']}: old starts at line {ln}, stated {fr['line']}")
    spans.setdefault(fr['file'], []).append((i, i+len(o), f"{fr['item']} ({fr['letter']})"))
    if fr['new'].count(fr['old']) > 1: problems.append(f"{fr['item']} ({fr['letter']}): new contains old more than once")
    if fr['old'] == fr['new']: problems.append(f"{fr['item']} ({fr['letter']}): new equals old")
    if t.count(fr['new']) and fr['new'] != fr['old']: problems.append(f"{fr['item']} ({fr['letter']}): new text already in the target")
for f, sp in spans.items():
    sp.sort()
    for a, b in zip(sp, sp[1:]):
        if a[1] > b[0]: problems.append(f"overlap in {f}: {a[2]} and {b[2]}")
# forward application in order, then reverse
work = {f: text(f) for f in TEXT}
for fr in FR:
    w = work[fr['file']]
    if w.count(fr['old']) != 1: problems.append(f"apply {fr['item']} ({fr['letter']}): old occurs {w.count(fr['old'])} times at its turn"); continue
    w = w.replace(fr['old'], fr['new'], 1)
    if w.count(fr['new']) != 1: problems.append(f"apply {fr['item']} ({fr['letter']}): new occurs {w.count(fr['new'])} times after")
    work[fr['file']] = w
after = dict(work)
for fr in reversed(FR):
    w = work[fr['file']]
    if w.count(fr['new']) != 1: problems.append(f"reverse {fr['item']} ({fr['letter']}): new occurs {w.count(fr['new'])} times"); continue
    work[fr['file']] = w.replace(fr['new'], fr['old'], 1)
for f in TEXT:
    if work[f] != text(f): problems.append(f"reversal of {f} is not byte-identical")
# emit
if problems:
    print('PROBLEMS:'); [print(' -', p) for p in problems]; sys.exit(1)
out = [dict(id=f"{fr['item']} ({fr['letter']})", file=fr['file'], line=fr['line'], md5=fr['md5'], old=fr['old'], new=fr['new']) for fr in FR]
json.dump(out, open(f"{ROOT}/docs/validation/hidden-ways-2026-10-18/draft-w.fragments.json", 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
# items markdown
def bq(s):
    return '\n'.join(('> ' + l) if l else '>' for l in s.split('\n'))
md = []
cur = None
TITLES = {955: "The owner's rule and the word: the host's hidden way is the map's **trod**, its end a junction, its kind `goat`, `drove` or `broad`; *way* and *hidden* stay what they are.",
 956: "The records: `Trod` and `TrodJunction` beside `WorldRoute`; the `trods` raster layer; the hearing's `trod` and `junction` places; the knowledge event's `cause` and `at`; a trod `secret` at birth under the one admission function.",
 957: "The rule table `world.trod`: the owner's density rule as parameters the host can read; no patrol cadence on a trod.",
 958: "Identity, lifecycle, the digest and the storage: a trod keyed by its seed cell with an anchor, re-joined through the host's lived changes, never persisted, rebuilt on load by replaying the lay versions.",
 959: "The generation step W7 (13) 'W7c Trods' after W7b: rough patches, touch points, Urquhart candidates, the lay, the kind, the incremental lifecycle, the exclusions, the sparse rung, the work limit.",
 960: "The port: the trod record as the simulator feed's third optional product (no canon slot); `routeFacts`' ordered stretches (the host's fallback); the map feed, `placeOf` and `hostOverlay` on a trod.",
 961: "The layer and the reveal: the `trods` layer a toggle default off under V14's three states; the knowing settlement's mark the `events` layer's pin; the exports and the audience filter; the quarantine refusals kept with a note; no ninth lens now (D-V13.8's danger lens later).",
 962: "The budgets: the W7c row 25 / 50 / 100 ms, the totals 755 / 2 950 / 6 800 ms, the register row `WORLD-18`.",
 963: "The tests and report codes: T-V13-59 (the trods), T-V13-60 (the reveal and the leak); T-V13-42, 43 and 50 amended; `W_TROD_SPARSE`, `W_TROD_UNJOINED`, `W_TROD_CUT`.",
 964: "The milestones and the host's track: M-W2 at 9 pw carries A, B and C; the staged row 38–46; the host's row H32 with M-W2.",
 965: "The decisions J-V13.114 – J-V13.128, each 'chose X over Y because Z', each vetoable.",
 966: "The owner questions: Q2 counts H32; Q5 — the price, the bodies chain's order and the trod record's door.",
 967: "Volume 14: the reveal precedent names its second reader; the route-borne coherence tests count no trod; E1's world crop lays an admitted trod's band; the requests list gains (19).",
 968: "The host document: H32 in the M-W2 table and the summary table; H17's row; ENC-HS-06, ENC-HP-09, ENC-HL-10, ENC-HL-11, ENC-HL-12 and ENC-HL-13 re-read against the answer; one open point.",
 969: "The index and the summary: file w named, V13's row, the staged row 38–46, the V13 Q5 row, the owner's decision counts, the plain-words account of the trods."}
for fr in FR:
    if fr['item'] != cur:
        cur = fr['item']; md.append(f"\n**{cur}.** **{TITLES[cur]}**\n")
    kind = '(insertion)' if fr['new'].startswith(fr['old']) and fr['new'] != fr['old'] else '(edit)'
    md.append(f"**{fr['item']} ({fr['letter']}).** {fr['locator']} {kind}. Target: `{fr['file']}`, line {fr['line']} (md5 `{fr['md5'][:8]}…`) as it stands now.")
    md.append("*Current text (as it stands now):*"); md.append(bq(fr['old']))
    md.append("*New text:*"); md.append(bq(fr['new']))
    md.append(f"*Evidence:* {fr['evidence']}\n")
open(f"{HERE}/items.md", 'w', encoding='utf-8').write('\n'.join(md))
# summary
from collections import Counter
c = Counter(fr['file'] for fr in FR); ci = Counter((fr['item'], fr['file']) for fr in FR)
print('OK', len(FR), 'fragments'); print(dict(c))
items = {}
for fr in FR: items.setdefault(fr['item'], Counter())[fr['file']] += 1
for k in sorted(items): print(k, dict(items[k]))
for f in TEXT: print(f, MD5[f][:8], '->', md5(after[f])[:8], len(after[f].split('\n')), 'lines after')
