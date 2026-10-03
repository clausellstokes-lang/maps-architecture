# builds the mapping table (every V07 inventory id -> where it now lives) for rewrite-V07.md
import json, re
d = json.load(open('docs/validation/coherence/inventory-vol-V07-V08.json'))
c = json.load(open('docs/validation/coherence/canon.json'))['by_inventory_id']
items = [i for i in d['items'] if i['id'].startswith('V07-')]
terms = [t for t in d['defined_terms'] if t.get('volume') == 'V07']
new = open('docs/validation/coherence/new/volumes/V07-village.md').read()

# BCR-V7-n -> (file f item, base home), as V07 §10's pointer table states it
bcr = {1: ('201', '§1.1'), 2: ('287', '§4.2 S0'), 3: ('267', '§2.8'), 4: ('214', '§2.5'), 5: ('215', '§2.5'),
       6: ('255', '§2.7'), 7: ('314', '§4.9'), 8: ('315', '§4.9'), 9: ('418', '§8.5'), 10: ('505', '§14'),
       11: ('202, 326', '§1.1, §4.12, §14, PART III'), 12: ('276', '§2.9'), 13: ('377', '§7.6'), 14: ('378', '§2.5'),
       15: ('344', '§6.1'), 16: ('527', '§16'), 17: ('202, 528', '§1.1, §7.7, §16'), 18: ('202, 317', '§4.11, §7.7'),
       19: ('357', '§7.1'), 20: ('312', '§4.8'), 21: ('430 (carried by 432)', '§10.2'), 22: ('431 (absorbed into 209)', '§4.11, §7.4'),
       23: ('495', '§13.5'), 24: ('310', '§4.7'), 25: ('292', '§4.3'), 26: ('322', '§4.11'), 27: ('565', 'II.7.6, PART III'),
       28: ('316', '§4.9'), 29: ('283', '§4.1'), 30: ('279', '§3.2'), 31: ('424', '§9.5'), 32: ('268', '§2.8, §4.11'),
       33: ('290', '§4.3'), 34: ('506', '§14'), 35: ('290', '§4.3, §2.7'), 36: ('576', '§10.2, §2.5'), 37: ('577', 'PART III'),
       38: ('579', '§4.7')}

ov = {
 'V07-0008': "the head's *Provenance* sentence (cites §17.1 (6), item 62; trace key row D5 / P17)",
 'V07-0011': 'V07 §1 *Base hooks consumed* (cited, never restated)',
 'V07-0012': 'V07 §1 *Base hooks consumed* (item 110\'s base side cited at §2.7, §4.7, §4.3; items 244, 245, 290, 309)',
 'V07-0014': 'V07 §1 (1) as a current fact at its home (V04 §2.2, §3.5.1; V07-DEFER-1 closed, fallback removed)',
 'V07-0015': 'V07 §1 (2)–(3)',
 'V07-0016': 'V07 §1 (4)–(7) (V04\'s arch-vault source and the span rule\'s `country` reason at §2.7, item 244, J-C4; V07-XCONF-2, V07-DEFER-1)',
 'V07-0017': 'V07 §1 (8)–(13) as current facts at their homes (V11, V08 §3.5.1, V06 §2.1; landing history removed, V07-NARR-4, V07-ICONF-5)',
 'V07-0018': 'V07 §1 (14); V07 §8 risk (10)',
 'V07-0058': 'row deleted (V07-NARR-5); its one fact at V07 §2.1 (item 105 (h)\'s threshold at village rungs; V11 §3.7.4\'s one off switch) and J-V7.115',
 'V07-0088': 'V07 §1b W70 (cites V07 §3.12, the records placement\'s one home; V07-DUP-1)',
 'V07-0096': 'V07 §2.1 (item 105 (h) cited as an owner rule)',
 'V07-0100': 'V07 §2.1 `ProductDecl` type (item 202 names V07 §2.1 as the type\'s home; routing, registry and call points cited at §1.1, §4.12, §14; V07-RESTATE-1)',
 'V07-0101': 'V07 §2.1 cites §1.1\'s `LadderRouter` (D-33; item 202) — the routing no longer restated',
 'V07-0102': 'V07 §3.12 *Records at a village epoch* (`village.records`, the records placement\'s one home; type cited at V06 §2.1; V07-DUP-1)',
 'V07-0105': 'V07 §2.2 anchor law; the `neighbourTracks` row reads "4 from about 227" (V07-ICONF-1)',
 'V07-0107': 'V07 §2.2 default rows (`territory.haPerHead` removed: derived at V07 §3.9 (1), E-38)',
 'V07-0108': 'V07 §2.2 default rows (ICONF-1 gloss fixed; `network.slack`, `network.emptyDensity` removed, J-V7.139, V07-WGAP-2)',
 'V07-0109': 'V07 §2.2 default rows (`network.slack`, `network.emptyDensity` removed; J-V7.139)',
 'V07-0111': 'V07 §2.2 `epoch.rows` (persistence keyed by V11 §3.5.1\'s church-family members, checked by T-V7-44; the street rate cited at V06 §3.5.2; V07-RESTATE-2, V07-RESTATE-4)',
 'V07-0113': 'V07 §2.2a (the reference cell is §7.6\'s `{ref:{table,row,cell}}`, E-30; V07-ELEG-1)',
 'V07-0118': 'V07 §2.2a factor rows (one home; V07 §3.9 (3) cites; V07-DUP-2)',
 'V07-0120': 'V07 §2.2a *reference trace*: row D5 of `research/findings/code-impact.md` §(d) (sub-keys dropped; FL-1)',
 'V07-0123': 'V07 §2.3 (base records cited at §2.5, §2.7; items 214, 215)',
 'V07-0145': 'V07 §2.4 decorations (values at V07 §2.2a; the village pond one term, V07-ICONF-2, V07-DUP-2)',
 'V07-0152': 'V07 §2.4 item-108 table (`v.smithy` gains `K spread 200`; V07-BREF-1)',
 'V07-0168': 'V07 §2.7 cites §10.2\'s `villageForm` (items 430, 432; VOL-V07-V08-RESTATEMENTS-004)',
 'V07-0175': 'V07 §3.1 *named draw shapes* (glossary home)',
 'V07-0176': 'V07 §3.1 (the dials\' cells at V07 §2.2a: `formRules.organicDialFrom`, `formRules.districtDensity`; V07-WGAP-1)',
 'V07-0177': 'V07 §3.1 (1) cites V08 §2.6b (3)\'s toll-bridge rule at its village column (E-31; IN-V07-3 folded)',
 'V07-0181': 'V07 §3.2 (3) (dwelling count `N`, G-dwell; V07-TERM-2)',
 'V07-0183': 'V07 §3.2 (4) (`D(x)` only the daylight share; climate cell sign; V07-TERM-2)',
 'V07-0184': 'V07 §3.2 (4) heart (epoch nuclei spaced by the polyfocal rule at V07 §3.12 (9v); V07-ICONF-4)',
 'V07-0190': 'V07 §3.3 (`density.bandWeight` wired as `q`\'s weight; J-V7.139; V07-WGAP-2)',
 'V07-0191': 'V07 §3.4 (cells `palisade.denseDialFrom`, `palisade.pullM`, `palisade.reachedCloseHa` at V07 §2.2a; V07-WGAP-1)',
 'V07-0192': 'V07 §3.4 steps 1 and 5 (`walls.barriers`, `WallBarrierRow.arcKind` named; IN-V07-4 folded; V07-ELEG-3)',
 'V07-0193': 'V07 §3.4 (sections from `palisade.section` at V07 §2.2a; V07-WGAP-1); condition and patches V07 §3.4 (8) (item 114)',
 'V07-0196': 'V07 §3.5 (no `slack` or `emptyDensity` reader; V07-WGAP-2)',
 'V07-0205': 'V07 §3.5a (7)–(9) (the span rule\'s `country` reason at §2.7, item 244, J-C4; narration removed; V07-XCONF-2, V07-NARR-6)',
 'V07-0211': 'V07 §3.6 (5)–(7) (the centrepiece pond is not "the village pond"; V07-ICONF-2)',
 'V07-0212': 'V07 §3.7 (`perimeter.closeM` cell; V07-WGAP-1)',
 'V07-0222': 'V07 §3.9 (1) (the area per head derived from the farm rows, 2.275 ha, never stored; E-38; V07-ELEG-2)',
 'V07-0224': 'V07 §3.9 (3) (factor rows cited at V07 §2.2a; V07-DUP-2)',
 'V07-0225': 'V07 §3.9 (4)–(6) (values cited at V07 §2.2a; V07-DUP-2)',
 'V07-0227': 'V07 §3.10 ends (cap gloss "6 from about 563"; V07-ICONF-3)',
 'V07-0241': 'V07 §3.11 DR11–DR19 (mapping tables by their row-set names; V07-TERM-4)',
 'V07-0248': 'V07 §3.12 *siting* (cells at V07 §2.2a; (9v) reads the polyfocal rule; V07-WGAP-1, V07-ICONF-4)',
 'V07-0254': 'V07 §3.12 *decline and desertion* (V06 §3.5.2\'s street rate cited without the number; V07-RESTATE-4)',
 'V07-0257': 'V07 §3.12 *hand-off down* (current facts: V04 §2.2 `blockedBy \'rung\'`; V07-DEFER-1)',
 'V07-0266': 'V07 §3.16 (1) (the span rule\'s `country` reason at §2.7; V07-XCONF-2)',
 'V07-0270': 'V07 §4.1 (tools with their words, T1 `intend` … T12 `dress`; V07-TERM-4)',
 'V07-0271': 'V07 §4.1 (V07-TERM-4)',
 'V07-0273': 'V07 §4.2 cites §7.1\'s `declareEnd` and `walk` forms (item 357; VOL-V07-V08-RESTATEMENTS-006)',
 'V07-0278': 'V07 §5.1 (`LayerSpec.showCircuit` named; IN-V07-4, -5 folded; V07-ELEG-3)',
 'V07-0281': 'V07 §5.1 (the item-110 roles are §8.2\'s; V07-DEFER-2)',
 'V07-0298': 'V07 §7 T-V7-42 (cells named; V07-WGAP-1)',
 'V07-0304': 'V07 §8 opening paragraph (built on the finished base; V-M0 on M0\'s kernel, M0 (b)\'s tables and its own fixtures; V07-XCONF-1)',
 'V07-0310': 'V07 §8 opening paragraph (J122\'s slot: V-M0 right after M0; V-M1 – V-M4 after M4, parallel with M5; V-M2u after M6-U\'s tail; V07-XCONF-1)',
 'V07-0332': 'V07 §11 Q1 **Decided (a), J122** (V07-XCONF-1)',
 'V07-0333': 'folded into the body at its homes (IN-V07-1 V07 §2.7 `arableFactor`; IN-V07-2 V07 §1 (1), §3.12, §3.16; IN-V07-3 V07 §3.1 (1); IN-V07-4 V07 §3.4, §5.1; IN-V07-5 V07 §4.1; IN-V07-6 validation records; IN-V07-7 V07 §1b dossier trace); V07 *Integration notes* keeps the map of J-VI rows to homes',
}

def norm(sec):
    if sec == 'header Reading':
        return "the head's *How to read this volume* paragraph"
    if sec == 'Integration notes':
        return 'V07 *Integration notes*'
    m = re.match(r'^1b (W\d+)$', sec)
    if m:
        return f'V07 §1b {m.group(1)}'
    if sec == '1b dossier trace':
        return 'V07 §1b (the dossier trace paragraph)'
    m = re.match(r'^(\d+(?:\.\d+[a-z]?)?)\s+(DR.*)$', sec)
    if m:
        return f'V07 §{m.group(1)} {m.group(2).replace("-", "–")}'
    m = re.match(r'^(\d+(?:\.\d+[a-z]?)?)\s+(\(.*)$', sec)
    if m:
        return f'V07 §{m.group(1)} {m.group(2).replace(")-(", ")–(")}'
    m = re.match(r'^(\d+(?:\.\d+[a-z]?)?)\s+(.*)$', sec)
    if m:
        return f'V07 §{m.group(1)} (*{m.group(2)}*)'
    return f'V07 §{sec}'

def ids(pat, s):
    out = []
    for a, b in re.findall(pat, s):
        out.append(a if not b else f'{a}–{b}')
    return out

rows = []
for i in items:
    iid, sec = i['id'], i.get('sec', '')
    role = c.get(iid, {}).get('role', 'home')
    st = i['statement']
    if iid in ov:
        where = ov[iid]
    elif sec == '10':
        ns = sorted({int(n) for n in re.findall(r'BCR-V7-(\d+)', st)})
        parts = [f'BCR-V7-{n} → item {bcr[n][0]} → {bcr[n][1]}' for n in ns if n in bcr]
        where = 'V07 §10 pointer rows: ' + '; '.join(parts) + ' (the request text is file f\'s; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3)'
    elif sec == '7':
        t = sorted(set(re.findall(r'T-V7-\d+', st)), key=lambda x: int(x[5:]))
        where = 'V07 §7 ' + (', '.join(t[:6]) if t else '') + ' (seam ids dropped)'
    elif sec == '9':
        j = sorted(set(re.findall(r'J-V7\.\d+', st)), key=lambda x: int(x[5:]))
        where = 'V07 §9 ' + (', '.join(j[:8]) if j else '') + (' (final choice; E-24 marks)' )
        if iid in ('V07-0312','V07-0313','V07-0314','V07-0316','V07-0320','V07-0322','V07-0323','V07-0324'):
            where += '; history removed (V07-NARR-7)'
    else:
        where = norm(sec)
    rows.append((iid, sec, role, where))

for t in terms:
    rows.append(('term: ' + t['term'].replace('|', '/'), 'term', 'glossary', f"defined at {t['defined_at']} → " + next((r[3] for r in rows if r[0] == t['defined_at']), '?')))

# sanity: every cited V07 section exists as a heading of the new volume
heads = set(re.findall(r'^#+ (\d+(?:\.\d+[a-z]?)?)\b', new, re.M))
bad = []
for r in rows:
    for s in re.findall(r'V07 §(\d+(?:\.\d+[a-z]?)?)', r[3]):
        if s not in heads:
            bad.append((r[0], s))
out = ['| inventory id | old section | canon role | now lives |', '|---|---|---|---|']
for r in rows:
    out.append('| ' + ' | '.join(x.replace('|', '/') for x in r) + ' |')
open('docs/validation/coherence/work/rewrite-V07/mapping.md', 'w').write('\n'.join(out) + '\n')
print(len(items), 'items', len(terms), 'terms', len(rows), 'rows; unresolved', bad[:10])
