# builds the mapping table (every V06 inventory id -> where it now lives) and the edges map for rewrite-V06.md
import json, re
d = json.load(open('docs/validation/coherence/inventory-vol-V05-V06.json'))
c = json.load(open('docs/validation/coherence/canon.json'))['by_inventory_id']
items = [i for i in d['items'] if i['id'].startswith('V06-')]
terms = [t for t in d['terms'] if t['id'].startswith('V06-')]
new = open('docs/validation/coherence/new/volumes/V06-evolution.md').read()

bcr = {1: ('317', '§4.11; §14'), 2: ('321', '§4.11 *Works*'), 3: ('254', '§2.7'), 4: ('429', '§2.7; §10.2'),
       5: ('209', '§4.11; §2.4'), 6: ('206', '§2.3'), 7: ('264', '§2.8; §7.1'), 8: ('342', '§6.1'),
       9: ('343', '§4.11; §6.1'), 10: ('443', '§10.3'), 11: ('458', '§11.2; §7.8'), 12: ('388 and 383', '§7.7'),
       13: ('275', '§2.9; §4.5 (iv)'), 14: ('339', '§5.4'), 15: ('409', '§8.2; §11.1; §10.4'), 16: ('550', 'II.7.1'),
       17: ('335', '§2.7; §4.11; §5.3'), 18: ('336', '§4.11; §5.3'), 19: ('293', '§4.4'), 20: ('265', '§2.8'),
       21: ('266', '§4.11; §2.8'), 22: ('478', '§12.6'), 23: ('479', '§4.11 (c)'), 24: ('260', '§2.8'),
       25: ('290 and 244', '§4.3; §4.5; §4.11'), 26: ('291', '§4.11'), 27: ('573', '§4.11'),
       28: ('574', '§4.11 (6); II.7.3 (c); §4.5 S7b (6)')}

ov = {
    # reference role: the fact's home is elsewhere; V06 cites it
    'V06-0099': 'V06 §2.2 (cites V11 §3.18\'s cells; no copy)',
    'V06-0100': 'V06 §2.2 (V09\'s per-device settings; J-V6.80)',
    'V06-0110': 'V06 §2.7 cites §2.7 (file f item 254)',
    'V06-0111': 'V06 §2.8 (`EvolveOp` declaration kept: the base union lacks it — cross-part note to pipeline §4.11; file f item 209)',
    'V06-0112': 'V06 §2.8 (`repairWall`; the no-stretch, nothing-to-lift case a no-op with its line, V06-ICONF-1; item 114\'s material)',
    'V06-0113': 'V06 §2.8 (`retypeLand`; file f item 209)',
    'V06-0114': 'V06 §2.8 cites §2.4\'s `Way.formerClass` (file f item 209)',
    'V06-0115': 'V06 §2.9 (`Use.strain` kept: model §2.7 lacks it — cross-part note; file f item 429)',
    'V06-0129': 'V06 §2.12 (crypt row cites V03 §3.7.4 and V02\'s crypt ladder)',
    'V06-0150': 'V06 §3.2 (cites V04 §3.5.4 (d))',
    'V06-0279': 'V06 §3.19 (cites V11 §3.24.2; no copy — V11:X-V11-11)',
    'V06-0307': 'V06 §4.5 (V10\'s raised-way provider; the ledger\'s single-subject read, file f item 290; V10:CVR-V10-11)',
    'V06-0345': 'V06 §8 *Exits and the calibration register* (cites V12 §3.11)',
    'V06-0346': 'V06 §8 (bar registrations; J-V6.117)',
    # index rows
    'V06-0012': 'V06 §1.3 (index row; home V05 §3.15)', 'V06-0013': 'V06 §1.3 (index row; home V04 §3.10)',
    'V06-0014': 'V06 §1.3 (index row; home V03 §3.7.4, V02\'s crypt ladder)',
    'V06-0015': 'V06 §1.3 (index row; the base side of items 105–108 at its homes, V11\'s rows)',
    'V06-0016': 'V06 §1.3 (index row; home V08 §3.6)', 'V06-0017': 'V06 §1.3 (index row; item 110\'s base half, file f items 244, 290)',
    'V06-0065': 'V06 §1b W80 (bars list with T-V6-62 and T-V6-72)', 'V06-0253': 'V06 §3.18 (index paragraph; V04 owns the systems)',
    # conflicts, retired terms, renumbered rows
    'V06-0070': 'V06 §1b dossier trace (calamities: DR28, V06-XCONF-2)',
    'V06-0074': 'V06 §1b dossier trace (the realm latitude: DR29, V06-XCONF-2)',
    'V06-0102': 'V06 §2.3 (`AdvanceRequest`; `advance.stoppedAt?` in the provenance, file f item 343, V06-ICONF-3)',
    'V06-0106': 'V06 §2.4 (the calamity table, DR28; the `drought` row added, J-V6.128)',
    'V06-0296': 'V06 §4.1 and §1.3 (a standalone neighbourhood document has no clock — CANON-C02; J-V6.102)',
    'V06-0310': 'V06 §5.1 (timeline bar; "Open a copy from here", V06-ICONF-4)',
    'V06-0352': 'V06 §9 J-V6.4 (marked "superseded by J-V6.127"; V06-XCONF-1; item 113 at V06 §3.20)',
    'V06-0353': 'V06 §9 J-V6.5 (marked "amended by J-V6.61", E-24)',
    'V06-0427': 'V06 §9 J-V6.79 (final form; round narration dropped)',
    'V06-0440': 'V06 §9 J-V6.92 (reworded to the ruled form, V06-ICONF-2)',
    'V06-0446': 'V06 §9 J-V6.98 ("standalone neighbourhood document", G-standalone)',
    'V06-0450': 'V06 §9 J-V6.102 (the decided rule: no clock; no deferral — CANON-C02, V06-DEFER-1)',
    'V06-0458': 'V06 §9 J-V6.110 (marked "amended by J-V6.131", E-24)',
    'V06-0459': 'V06 §9 J-V6.111 (marked "amended by J-V6.126", E-24)',
    'V06-0460': 'V06 §9 J-V6.112 (marked "amended by J-V6.131", E-24)',
    'V06-0466': 'V06 §9 J-V6.118 (final bounds 25 / 115 / 215 s; round history dropped; V06 §6.2 cites V05 §6 by row name — V06-RESTATE-1)',
    'V06-0473': 'V06 §9 J-V6.125 (final form)', 'V06-0474': 'V06 §9 J-V6.126 (E9\'s due `V6-E9` added)',
    # §11-§13, integration and reconciliation records
    'V06-0496': 'V06 §11 (decided: (a) right after M4, J122; price 29.5–41.75 pw)',
    'V06-0497': 'validation records (history out); V06 §12 keeps one CONFIRMED paragraph and one PLAUSIBLE list',
    'V06-0498': 'V06 §13 (none open; every finding fixed in the text)',
    'V06-0499': 'V06 §13 (closed at destinations; this report §6 lists X1–X49 by destination; cross-part notes §9)',
    'V06-0500': 'folded: V06 §2.5, §3.10.1 (H34); V06 §3.4 (2), §3.13, §3.19 (7) (J-VI.5); V06 §3.2, §3.19 (5) (H20); V06 *Integration notes* map',
    'V06-0501': 'folded: V06 §3.19.4 (5) (H19); T-V6-65 (H21); V06 §4.1, §5.1 (J-VI.12); V06 §2.13, §1b DR28 (J-VI.2, J-VI.14, J-VI.13); V06 *Integration notes* map',
    'V06-0502': 'validation records (history out; every change already in the body)',
}

def where(i):
    iid, sec, st = i['id'], i.get('sec', ''), i['statement']
    if iid in ov:
        return ov[iid]
    if sec == '10':
        m = re.match(r'BCR-V6-(\d+)', st)
        n = int(m.group(1)); f, home = bcr[n]
        return f'V06 §10 pointer row BCR-V6-{n} → file f item {f} → {home}'
    if sec == '9':
        m = re.match(r'(J-V6\.\d+)', st)
        return f'V06 §9 {m.group(1)}' if m else 'V06 §9'
    if sec == '1b':
        m = re.match(r'(W\d+)', st)
        return f'V06 §1b {m.group(1)}' if m else 'V06 §1b (dossier trace)'
    if sec == '7':
        m = re.match(r'(T-V6-\d+)', st)
        return f'V06 §7 {m.group(1)}' if m else 'V06 §7'
    return f'V06 §{sec}'

rows = []
for i in items:
    role = c.get(i['id'], {}).get('role', 'home')
    rows.append((i['id'], i.get('sec', ''), role, where(i)))
for t in terms:
    home = t.get('home', '').replace('V6 §', 'V06 §')
    note = ''
    if 'retired way' in t['term']:
        note = ' ("retired way" retired, G-hollow)'
    if t['term'] == 'strike pool':
        note = ' (defined once; "decline pool", "decline lottery", "the lottery" retired, G-strike)'
    rows.append((t['id'], 'term', 'glossary', f"{home} — term `{t['term']}`{note}"))

# every cited section must exist in the new text
defined = set()
for l in new.split('\n'):
    m = re.match(r'^#{2,4} (\d+[a-z]?(?:\.\d+)*)\b', l)
    if m: defined.add(m.group(1))
    m = re.match(r'^\*\*(\d+(?:\.\d+)+)\b', l)
    if m: defined.add(m.group(1))
bad = []
for r in rows:
    for s in re.findall(r'V06 §(\d+[a-z]?(?:\.\d+)*)', r[3]):
        if s not in defined: bad.append((r[0], s))
for jid in set(re.findall(r'(J-V6\.\d+|T-V6-\d+|\bW\d+\b)', ' '.join(r[3] for r in rows))):
    if jid not in new: bad.append(('id', jid))
print('unresolved', bad)

out = ['| inventory id | old section | canon role | now lives |', '|---|---|---|---|']
for r in rows:
    out.append('| ' + ' | '.join(x.replace('|', '/') for x in r) + ' |')
open('docs/validation/coherence/work/rewrite-V06/mapping.md', 'w').write('\n'.join(out) + '\n')
print(len(rows), 'rows')

# edges map: catalogue id -> the V06 §3.21 row and its test
sc = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/'
tab = new[new.index('### 3.21 '):new.index('## 4 ')]
a = tab[tab.index('**(a)'):tab.index('**(b)')]
b = tab[tab.index('**(b)'):]
arows = []
for l in a.split('\n'):
    if l.startswith('| ') and not l.startswith('| mechanism') and not l.startswith('|---'):
        cells = [x.strip() for x in l.strip('|').split('|')]
        arows.append((cells[0], cells[-1]))
brows = []
for l in b.split('\n'):
    if l.startswith('| ') and not l.startswith('| combination') and not l.startswith('|---'):
        cells = [x.strip() for x in l.strip('|').split('|')]
        brows.append((cells[0], cells[-1]))

def arow_for(sec):
    # the most specific row naming the section, else its parent
    best = None
    for name, test in arows:
        secs = re.findall(r'§(\d+(?:\.\d+)*)', name)
        rng = re.search(r'§(\d+\.\d+)–§(\d+\.\d+)', name)
        cand = set(secs)
        if rng:
            p, q = rng.group(1), rng.group(2)
            if p.split('.')[0] == q.split('.')[0]:
                for k in range(int(p.split('.')[1]), int(q.split('.')[1]) + 1):
                    cand.add(f"{p.split('.')[0]}.{k}")
        for s in cand:
            if sec == s or sec.startswith(s + '.') or (s == '5' and sec.startswith('5.')):
                if best is None or len(s) > best[0]:
                    best = (len(s), name, test)
    return best

emap = []
for l in open(sc + 'edges-V06.md'):
    m = re.match(r'\* (M-V06-\S+) — (UNDEFINED|UNTESTED) — V06 §([0-9.]+)', l)
    if not m: continue
    r = arow_for(m.group(3))
    emap.append((m.group(1), m.group(2), f'§{m.group(3)}', f'V06 §3.21 (a) "{r[1]}"' if r else 'UNMAPPED', r[2] if r else ''))
for eid, secname, rowkey in [('EI-V06-EDGE-1', '§2.3, §3.3.2', 'the trajectory and `advance`'),
                              ('EI-V06-EDGE-2', '§4.1, §2.12', 'an advance group after a save')]:
    r = next(((n, t) for n, t in arows if n.startswith(rowkey)), None)
    emap.append((eid, 'UNDEFINED', secname, f'V06 §3.21 (a) "{r[0]}"' if r else 'UNMAPPED', r[1] if r else ''))
keys = {'cliff': 'cliff', 'steep': 'cliff', 'river': 'river', 'coast': 'river', 'harbour': 'river', 'moat': 'moat',
        'deckplot': 'deck plot', 'square': 'square', 'oasis': 'oasis', 'frame': 'frame', 'hood': 'neighbourhood fabric',
        'terraced-ward': 'neighbourhood fabric', 'composed': 'composed', 'tiers': 'composed', 'crypt': 'composed',
        'plan': 'composed', 'sewer': 'sewer', 'cavern': 'sewer', 'ruin': 'sewer', 'catacomb': 'sewer',
        'undercity': 'sewer', 'void': 'sewer', 'vault': 'sewer', 'island': 'islands', 'shade': 'islands',
        'skyaccess': 'islands', 'landfall': 'islands', 'epoch-light': 'lights', 'history-light': 'lights',
        'works-light': 'lights', 'history-lock': '× locks', 'history-saveload': 'save and load',
        'history-export': 'export'}
for l in open(sc + 'combos-V06.md'):
    m = re.match(r'\* (C-(\S+)) — ', l)
    if not m: continue
    cid, body = m.group(1), m.group(2)
    if body == 'access-works':
        key = 'access × Works'
    elif body == 'access-history':
        key = 'sewer'
    else:
        key = None
        for k, v in keys.items():
            if body == k or body.startswith(k + '-') or body == k.replace('-', ''):
                key = v; break
        if key is None:
            for k, v in keys.items():
                if k in body: key = v; break
    r = next(((n, t) for n, t in brows if key and key in n), None)
    emap.append((cid, 'COMBINATION', '', f'V06 §3.21 (b) "{r[0]}"' if r else 'UNMAPPED', r[1] if r else ''))
unm = [e for e in emap if e[3] == 'UNMAPPED']
print('edges', len(emap), 'unmapped', unm)
out = ['| catalogue id | kind | V06 section | now defined at | test |', '|---|---|---|---|---|']
for e in emap:
    out.append('| ' + ' | '.join(x.replace('|', '/') for x in e) + ' |')
open('docs/validation/coherence/work/rewrite-V06/edges-map.md', 'w').write('\n'.join(out) + '\n')
