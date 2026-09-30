#!/usr/bin/env python3
"""rewrite-V10: the MAPPING TABLE (every V10 inventory id -> where it now lives) and the EDGES MAP, as markdown.
Writes mapping.md and edges-map.md beside this script."""
import json, re, os
HERE = os.path.dirname(os.path.abspath(__file__))
COH = os.path.dirname(os.path.dirname(HERE))
d = json.load(open(os.path.join(COH, 'inventory-vol-V09-V10.json')))
canon = json.load(open(os.path.join(COH, 'canon.json')))['by_inventory_id']
unit = json.load(open(os.path.join(HERE, 'unit.json')))
bcr2f = {r['request']: (r['f_item'], r['base_section'].split(' ')[0]) for r in unit['requests_in_f']}
its = [i for i in d['items'] if i['id'].startswith('V10-')]

O = {
 'V10-0006': 'V10 §0 *Turning it on* (SettlementForge\'s own assistant; provider, model and key follow the AI setup — J121, J122; V10-J121-1)',
 'V10-0100': 'V10 §1b.2 (`ClerkHandle`, no alias; E-33)', 'V10-0785': 'V10 §2.6 (`createClerk(mount)` → `ClerkHandle`; E-33)',
 'V10-0152': 'V10 §2.6 dispatch table (`ClerkHandle.run`; E-33)', 'V10-0591': 'V10 §7.1 T-V10-44 (`ClerkHandle.run`; E-33)',
 'V10-0141': 'V10 §2.2 (unchanged; `anthropic` names the built-in backend over the provider\'s SDK, item 538)',
 'V10-0194': 'V10 §2.11 (unchanged; see V10-0141)', 'V10-0608': 'V10 §8 C2 (unchanged)',
 'V10-0150': 'V10 §2.6 (the label comment cites V10 §1b.1\'s label row; SR6-05 (c))',
 'V10-0186': 'V10 §2.10 `content.encoders` (islet size and scope ring added; V10-WGAP-1)',
 'V10-0196': 'V10 §2.12 `IntendInput` (`history` added, item 113)',
 'V10-0198': 'V10 §2.12 `ShapeInput` (link cells V11 §4.2\'s, V10-XAGREE-1; the weights gloss cited to V09 §2.6)',
 'V10-0214': 'removed: V01 §4.5 names V11\'s families (V10-XAGREE-2); CVR-V10-6 met',
 'V10-0231': 'V10 §3 opening (`clerk.ops` or `clerk.content`; V10-BREF-1)',
 'V10-0282': 'V10 §3.4 (`ground`\'s description with the spring-fed lake)',
 'V10-0300': 'V10 §3.5 step 3 (SR6-05 (a), (b), (f))',
 'V10-0321': 'V10 §3.9 owed table (V03\'s keys; `deckNoCellar`; E-28\'s notes)',
 'V10-0339': 'V10 §3.9 *The solver\'s explanation* (inputs and terms cited to §4.7 S10b, item 311; the placed set, shares, candidates and drift kept)',
 'V10-0340': 'V10 §3.9 *The field\'s drivers* (a reference to §4.5, item 297; the water term and climate cell named)',
 'V10-0348': 'V10 §3.9a catacomb row (`CatacombRule.rankCap` cited; V10-RESTATE-2)',
 'V10-0355': 'V10 §3.9a crypt table (V03 §3.7.4\'s wet-ground rule; V10-XAGREE-4)',
 'V10-0384': 'V10 §3.13 step 4 (`button.openCopy`, `button.undo`; J-V10.112)',
 'V10-0386': 'V10 §3.14 (`avoid` a declared cell, V10-XAGREE-1)',
 'V10-0388': 'V10 §3.15 (the ravine quarter by V01 §3.17.1 (2); CVR-V10-13 met; V10-HANDOFF-1)',
 'V10-0389': 'V10 §3.16 opening (§7.1\'s dry-run outcome table cited, E-07)',
 'V10-0399': 'V10 §3.16 `key` row (provider-neutral words, J121; J-V10.121)',
 'V10-0400': 'V10 §3.16 `offline` row (the one sentence, E-32)',
 'V10-0403': 'V10 §3.16 *The dry run\'s bends* (V02 §1b\'s set, V05\'s and V06\'s lines, `bend.tiers.internal`; V09-XAGREE-3, V05-WGAP-2b, V06-WGAP-1b)',
 'V10-0404': 'V10 §3.17 configurations (SettlementForge\'s is C, J121, J122; V10-J121-2)',
 'V10-0417': 'V10 §3.17 (a relay follows SettlementForge\'s AI setup, J121)',
 'V10-0419': 'V10 §3.19 key check (provider-neutral words)',
 'V10-0440': 'V10 §3.20 data notice (the service the setup names, J121)',
 'V10-0450': 'V10 §4.1 `islet` (`encoders.islet.sizeM2`; V10-WGAP-1)',
 'V10-0470': 'V10 §4.1 T8 (`encoders.scopeRingSides`; V10-WGAP-1)',
 'V10-0472': 'V10 §4.1 `green` (`encoders.ringSides`; V10-WGAP-1)',
 'V10-0493': 'V10 §4.2 (3) (the untouched town dropped, no Recent entry; J-V9.127; V10-EDGE-1)',
 'V10-0495': 'V10 §4.4 (Undo worded by `button.undo`)',
 'V10-0504': 'V10 §5.4 (SR6-05 (c), (d), (f); the grandeur line)',
 'V10-0535': 'V10 §6.4 (the tier follows the AI setup, J121)', 'V10-0546': 'V10 §6.5 (J121)',
 'V10-0602': 'V10 §7.3 group I (a failing case reported, J122)',
 'V10-0603': 'V10 §7.3 *When it runs* (J122\'s staged spend; J-V10.119)',
 'V10-0613': 'V10 §8 risks (1), (3) (J121)',
 'V10-0617': 'V10 §9 J-V10.4 (J121 wording)', 'V10-0637': 'V10 §9 J-V10.24 (J121 wording)',
 'V10-0670': 'V10 §9 J-V10.57 (*Superseded by J-V10.88*, E-24)', 'V10-0701': 'V10 §9 J-V10.88 (E-33 wording)',
 'V10-0720': 'V10 §9 J-V10.107 (SR6-05 (a))',
 'V10-0779': 'V10 §12 CONFIRMED (standing evidence; the per-round record to the validation records)',
 'V10-0780': 'V10 §12 PLAUSIBLE', 'V10-0781': 'V10 §13 (none open)',
 'V10-0782': 'folded into the body (V10 §3.16, V10 §2.13, V10 §2.12, V10 §10.2, V10 §4.1); V10\'s Integration notes map',
 'V10-0783': 'applied in place (V10 §2.6, V10 §3.5 step 3, V10 §3.16; J-V10.110); the record to the validation records',
 'V10-0144': 'V10 §2.3 (the clerk\'s use of V09 §2.10\'s effective key; the key itself V09\'s)',
 'V10-0163': 'V10 §2.6 *The bridge, through the mount only* (V09 §2.10\'s `ClerkMount.host`; J-V9.81)',
 'V10-0169': 'V10 §2.10 default rows (provenance cites V11 §3.1 rows 88–89)',
 'V10-0140': 'V10 §2.1 (a reference to §14, item 518; the clerk\'s own details kept)',
 'V10-0121': 'V10 §1b.3 (citing §7.1\'s rows and binding table)',
 'V10-0410': 'V10 §3.17 *Door 1* (V08 §5.4 (3)\'s rows for the base kinds; this volume\'s kinds here)',
}
AMD = {'28': 'amended by J-V10.111', '34': 'superseded by J-V10.80', '57': 'superseded by J-V10.88', '101': 'amended by J-V10.106',
       '102': 'amended by J-V10.112', '106': 'amended by J-V10.110'}

def where(i):
    k, s, st, kind = i['id'], i['sec'], i['statement'], i['kind']
    role = canon.get(k, {}).get('role')
    if k in O: return O[k]
    if role == 'reference':
        c = canon[k]
        if c['home_unit'] in ('rendering', 'model') and s == '2.13':
            return 'V10 §2.13 (home confirmed: §11.2 cites V10 §2.13\'s types)'
        if c['home_unit'] in ('V04',): return 'V10 §3.9a (the words\' home, loaded by V09 §4.9; the rows\' data V04 §4.5)'
        if c['home_unit'] in ('V03',): return 'V10 §3.9a crypt table (the words\' home; keyed by V03 §4.6)'
        return f"V10 §{s} (cites {c['home_sec'] or c['home_unit']})"
    if kind == 'bcr':
        m = re.search(r'BCR-V10-\d+', st)
        if m and m.group(0) in bcr2f:
            f, bs = bcr2f[m.group(0)]
            return f"V10 §10.1 pointer row → file f item {f} (base §{bs})"
    if s == '10': return 'V10 §10.1 opening'
    if s == '10.2': return 'V10 §10.2 (closed at its destination)'
    if s == '10.3': return 'V10 §10.1\'s closing paragraph (one text each in the base)'
    if s == '11': return 'V10 §11 (answered, J121/J122)'
    if s == 'glossary':
        m = re.search(r'V10 §([0-9a-z.]+)', st)
        return f"V10 §{m.group(1)} (the term's definition)" if m else 'V10 §2'
    if s == 'header': return 'the head\'s *How to read* (one marker line)'
    if kind == 'decision':
        m = re.search(r'J-V10\.(\d+)', st)
        if m:
            n = m.group(1); note = f' ({AMD[n]}, E-24)' if n in AMD else ''
            return f'V10 §9 J-V10.{n}{note}'
    if kind == 'test':
        m = re.search(r'T-V10-(\d+)', st)
        if m: return f'V10 §7.1 T-V10-{m.group(1)}'
    if kind == 'lexicon-row' and 'population' in st:
        if re.match(r'(thorp|hamlet|village)', st): return 'V10 §3.3 lexicon (the rung\'s default target, §1.1\'s rung table; V10-RESTATE-1)'
        return 'V10 §3.3 lexicon (V09 §4.5\'s quantile; V10-XAGREE-3, J-V10.118)'
    if s == '3.9' and 'Explanation' in st and 'step' in st: return 'V10 §3.9 *The solver\'s explanation*'
    return f'V10 §{s}'

rows = ['| id | kind | was | now lives |', '|---|---|---|---|']
for i in its:
    rows.append(f"| {i['id']} | {i['kind']} | {i['sec']} | {where(i)} |")
open(os.path.join(HERE, 'mapping.md'), 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
print('mapped', len(its))

# EDGES MAP
EM = {('2.1', 'E5'): '1', ('2.3', 'E5'): '2', ('2.4', 'E5'): '3', ('2.9', 'E5'): '4', ('2.10', 'E5'): '5', ('2.12', 'E5'): '6',
      ('3.1', 'E4'): 'E4 rule', ('3.1', 'E8'): 'E8 rule; 7', ('3.2', 'E1'): '8', ('3.2', 'E2'): '8', ('3.2', 'E4'): 'E4 rule (no geometry)',
      ('3.2', 'E8'): 'E8 rule; 8', ('3.3', 'E4'): '9', ('3.4', 'E4'): 'E4 rule (no geometry)', ('3.5', 'E4'): 'E4 rule', ('3.5', 'E6'): 'E6 rule; 10',
      ('3.6', 'E4'): '11', ('3.7', 'E1'): '7; 12', ('3.7', 'E2'): '12', ('3.7', 'E4'): 'E4 rule', ('3.7', 'E5'): '12', ('3.7', 'E6'): '12',
      ('3.8', 'E1'): '13', ('3.8', 'E2'): '13', ('3.8', 'E4'): 'E4 rule; 13', ('3.8', 'E5'): '13', ('3.9', 'E4'): '14',
      ('3.9a', 'E4'): 'E4 rule; 15', ('3.9a', 'E6'): '15', ('3.9a', 'E8'): '15', ('3.10', 'E3'): '16', ('3.10', 'E4'): '16', ('3.10', 'E8'): '16',
      ('3.12', 'E4'): 'E4 rule (no geometry)', ('3.12', 'E6'): '17', ('3.12', 'E8'): '17', ('3.13', 'E4'): 'E4 rule (no geometry)',
      ('3.15', 'E1'): '18', ('3.16', 'E4'): 'E4 rule (no geometry)', ('3.16', 'E6'): '19', ('3.17', 'E4'): 'E4 rule (no geometry)',
      ('3.18', 'E1'): '20', ('3.18', 'E2'): '20', ('3.18', 'E3'): '20', ('3.18', 'E5'): '20', ('3.19', 'E5'): '21', ('3.19', 'E8'): '21',
      ('3.20', 'E1'): '22 (never sent: V10 §3.20)', ('3.20', 'E2'): '22', ('3.20', 'E5'): '22', ('3.20', 'E8'): '22', ('3.22', 'E1'): '23',
      ('3.22', 'E6'): '23', ('4.1', 'E4'): 'E4 rule; 24', ('4.5', 'E2'): '25', ('4.6', 'E5'): '26', ('4.6', 'E7'): '26', ('4.6', 'E8'): '26',
      ('5.1', 'E8'): '27', ('5.3', 'E1'): '28', ('5.3', 'E2'): '28', ('5.3', 'E8'): '18', ('5.4', 'E1'): '29', ('5.4', 'E4'): 'E4 rule (no geometry)'}
em = ['| edge | state in the catalogue | V10 §3.23 row | test |', '|---|---|---|---|']
for l in open(os.path.join(HERE, 'edges-v10.md'), encoding='utf-8'):
    m = re.match(r'\* (M-V10-\d+-(E\d)-\w+) — (UNDEFINED|UNTESTED) — V10 §([0-9a-z.]+) ', l)
    if m:
        key = (m.group(4), m.group(2)); r = EM.get(key, '??')
        em.append(f"| {m.group(1)} | {m.group(3)} | {r} | T-V10-50 |")
    m = re.match(r'\* (EI-V10-EDGE-1) ', l)
    if m: em.append('| EI-V10-EDGE-1 | UNDEFINED (inventory) | 30 | T-V10-50 (24), T-V9-40 |')
    m = re.match(r'\* (C-\w+-clerk) — ', l)
    if m:
        c = {'C-steep-clerk': 'C1', 'C-moat-clerk': 'C2', 'C-square-clerk': 'C3', 'C-frame-clerk': 'C4', 'C-sewer-clerk': 'C5',
             'C-access-clerk': 'C6', 'C-vault-clerk': 'C7', 'C-custom-clerk': 'C8'}[m.group(1)]
        em.append(f"| {m.group(1)} | combination UNDEFINED | {c} | T-V10-50 |")
open(os.path.join(HERE, 'edges-map.md'), 'w', encoding='utf-8').write('\n'.join(em) + '\n')
print('edges', len(em) - 2, 'unmapped', sum('??' in x for x in em))
