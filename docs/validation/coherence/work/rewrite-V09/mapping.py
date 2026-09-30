#!/usr/bin/env python3
"""rewrite-V09: every inventory id of the volume -> where it now lives. Reads the canon's V09 inventory extract
(inv-V09.tsv: id, kind, source section, role, target, text) and writes mapping.md beside this script."""
import re, sys, os, json, collections
INV = sys.argv[1]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mapping.md')
BCR = {'BCR-V9-1':'514','BCR-V9-2':'515','BCR-V9-3':'277','BCR-V9-4':'— (superseded by J-V9.36)','BCR-V9-5':'460',
 'BCR-V9-6':'— (superseded by J-V9.33)','BCR-V9-7':'411','BCR-V9-8':'516','BCR-V9-9':'517','BCR-V9-10':'461','BCR-V9-11':'462',
 'BCR-V9-12':'463','BCR-V9-13':'360','BCR-V9-14':'453','BCR-V9-15':'454','BCR-V9-16':'348','BCR-V9-17':'494','BCR-V9-18':'530',
 'BCR-V9-19':'269','BCR-V9-20':'278, 413','BCR-V9-21':'361','BCR-V9-22':'372','BCR-V9-23':'464','BCR-V9-24':'490','BCR-V9-25':'413',
 'BCR-V9-26':'362','BCR-V9-27':'465','BCR-V9-28':'466','BCR-V9-29':'363','BCR-V9-30':'246','BCR-V9-31':'447, 448','BCR-V9-32':'455',
 'BCR-V9-33':'364, 244','BCR-V9-34':'467','BCR-V9-35':'570','BCR-V9-36':'583'}
SPECIAL = {
 'V09-0361':'retired by E-32: the unreachable clerk is `refuse.clerk.offline` (V10 §3.16; V09 §4.9\'s `refuse.clerk.*` family)',
 'V09-0383':'V09 §4.9 (`bend.crypt.largest`, worded to V03 §3.7.4\'s rank cap; V09-XAGREE-2)',
 'V09-0434':'retired for V02 §1b\'s set (J-V9.136): `bend.tiers.axial` (V09 §4.9)',
 'V09-0436':'retired for V02 §1b\'s set (J-V9.136): `bend.tiers.none` / `bend.tiers.axial` (V09 §4.9)',
 'V09-0437':'retired for V02 §1b\'s set (J-V9.136): `bend.tiers.internal` / `bend.tiers.none` (V09 §4.9)',
 'V09-0438':'retired for V02 §1b\'s set (J-V9.136): `bend.stack.groundWing` (V09 §4.9)',
 'V09-0439':'retired for V02 §1b\'s set (J-V9.136): `bend.deck.single` (V09 §4.9)',
 'V09-0440':'retired for V02 §1b\'s set (J-V9.136): `bend.tiers.stepped` (V09 §4.9)',
 'V09-0469':'retired with `bend.stack.notStepped` (J-V9.136): the bend makes the building stepped itself',
 'V09-0590':'V09 §4.17.5 (the crypt rows by key, V10 §3.9a; wet ground V03 §3.7.4; V10-XAGREE-4)',
 'V09-0621':'V11 §3.24.1\'s `terrace` table (cited in V09 §4.20; RESTATE-6)',
 'V09-0622':'V11 §3.24.1\'s `terrace` table (cited in V09 §4.20; RESTATE-6)',
 'V09-0623':'V11 §3.24.1\'s `terrace` table (cited in V09 §4.20; RESTATE-6)',
 'V09-0624':'V11 §3.24.1\'s `terrace` table (cited in V09 §4.20; RESTATE-6)',
 'V09-0625':'§7.1\'s retaining-wall dry run (cited in V09 §4.20; RESTATE-6)',
 'V09-0627':'V11 §3.24.2\'s `raisedWays` settings (cited in V09 §4.20; RESTATE-6)',
 'V09-0628':'V11 §3.24.4 (cited in V09 §4.20)',
 'V09-0629':'§11.2\'s `PreviewResult.effects` (cited in V09 §4.20; RESTATE-6)',
 'V09-0630':'§11.1\'s deck-scene cap (cited in V09 §4.20, V09 §5.10)',
 'V09-0633':'V09 §4.20.1 (3) (the bends); the flat test §7.1',
 'V09-0653':'V09 §4.20.5 (4), reworded (V09-ICONF-3)',
 'V09-0744':'V09 §6.1 (the values cited from §12.5; RESTATE-3)',
 'V09-0001':'the head\'s *How to read this volume* (citations, words, clean room, names)',
 'V09-1067':'V09 §11 (every question answered, J121, J122)',
 'V09-1073':'V09 §13 (none open) — the disposition in the validation records',
 'V09-1074':'the Integration notes\' map: J-VI.1/J-VI.23 → V09 §2.5, V09 §3.5; J-VI.4 → V09 §4.9, V09 §4.20; J-VI.2/J-VI.3 → V09 §2.7',
 'V09-1075':'V09 §4.20.5 (1) and V09 §3.5 (folded, V09-WGAP-2)',
 'V09-1076':'V09 §4.14 and V09 §7.2 (folded, V09-WGAP-2; W-IF-04)',
 'V09-1077':'the Integration notes\' map: J-VI.27 → V09 §4.20.6 (6); J-VI.30 → V09 §4.9',
 'V09-1078':'J-V9.125 (V09 §9) and V09 §4.16 (3); the narration removed',
}
rows=[]
cnt=collections.Counter()
for line in open(INV,encoding='utf-8'):
    f=line.rstrip('\n').split('\t')
    if len(f)<6: continue
    iid,kind,sec,role,target,text=f[:6]
    if iid in SPECIAL: where=SPECIAL[iid]
    elif role=='home':
        if sec=='glossary': where='the canon\'s glossary; the term used in V09 as defined there'
        else: where=f'V09 §{sec}'
    elif role=='reference': where=f'reference → {target} (cited, never restated, at V09 §{sec})'
    elif role=='bcr-pointer':
        m=re.search(r'BCR-V9-\d+',text); b=m.group(0) if m else '?'
        where=f'V09 §10.1\'s pointer table: {b} → file f item {BCR.get(b,"?")} (base {target})'
    elif role=='handoff': where='V09 §10.2 (closed at its destination, or routed there)'
    elif role=='index-row': where=f'V09 §{sec} (kept; the base section cited)'
    elif role=='answer-J121-J122': where='V09 §11 (answered: J121, J122)'
    elif role=='history-out': where='removed (narration; V09 §12\'s condensed paragraphs; the validation records keep it)'
    elif role=='glossary': where='the canon\'s glossary; the term used in V09 as defined there'
    else: where=f'V09 §{sec}'
    cnt[role]+=1
    rows.append((iid,kind,sec,role,where))
with open(OUT,'w',encoding='utf-8') as o:
    o.write('| inventory id | kind | source § | role | where it now lives |\n|---|---|---|---|---|\n')
    for r in rows: o.write('| '+' | '.join(r)+' |\n')
print(len(rows), dict(cnt))
