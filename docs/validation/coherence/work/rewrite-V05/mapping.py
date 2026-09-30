# builds the mapping table (every V05 inventory id -> where it now lives) for rewrite-V05.md
import json,re
d=json.load(open('docs/validation/coherence/inventory-vol-V05-V06.json'))
c=json.load(open('docs/validation/coherence/canon.json'))['by_inventory_id']
items=[i for i in d['items'] if i['id'].startswith('V05-')]
terms=[t for t in d['terms'] if t['id'].startswith('V05-')]
bcr={1:(251,'§2.7, §2.8'),2:(203,'§2.2, §2.9, §6.3'),3:(282,'§4.1'),4:(546,'II.6, §4.9'),5:(295,'§4.5'),6:(213,'§2.5, §10.2'),7:(320,'§4.11'),8:(307,'§4.7'),9:(252,'§2.7, §2.3'),10:(356,'§7.1, §7.8'),11:(331,'§5.2, §5.3'),12:('387, 383','§7.7'),13:(415,'§8.4, §8.2, §9.1, §9.2, §11.1'),14:(476,'§12.4, §13.2, §14, §16, §6.1, §6.3'),15:(296,'§4.5, §8.4, §13.2'),16:(308,'§4.7, §4.5, §10.2, §13.2'),17:(547,'II.6'),18:(408,'§8.2'),19:(286,'§4.2, §2.5'),20:(299,'§4.6'),21:(274,'§2.9, §7.5'),22:(416,'§8.4, §8.1'),23:(None,'V06 §2.1, §3.8.1 (V06 X10)'),24:(204,'§2.2'),25:(375,'§7.4'),26:(253,'§2.7'),27:(245,'§2.7'),28:(None,'V06 §3.2 (V06 W66)'),29:(290,'§4.3'),30:(309,'§4.7 S10–S11')}
ov={
'V05-0013':'the head\'s *How to read* (citation form V05 §x; G-cite)',
'V05-0014':'the head\'s *Two kinds of tier* paragraph','V05-0015':'the head\'s *Two kinds of tier* paragraph',
'V05-0019':'V05 §1.2 cites §1.1 (the rung values dropped; V05-RESTATE-1)',
'V05-0020':'V05 §3.1 and §3.22 (1) cite §4.3\'s slot (file f item 290 (1)); V05-RESTATE-2, V05-DEFER-2',
'V05-0021':'V05 §1.3','V05-0022':'V05 §1.3','V05-0023':'V05 §1.3','V05-0025':'V05 §1.3 (cites §4.5 *Fields*)','V05-0026':'V05 §1.3',
'V05-0027':'V05 §1b (`skyGate` row)','V05-0033':'V05 §1b (register row); V05 §8',
'V05-0036':'V05 §1b (state fields → §2.6); V05 §2.1','V05-0037':'V05 §2.6 (`key` / `nextSkyPart` row); V05 §2.1',
'V05-0040':'V05 §2.6 (`terrainEcho` row)','V05-0042':'V05 §2.6 (rim strip and claims row)',
'V05-0043':'V05 §2.6 (ground landing yard row; rim strip and claims row)','V05-0044':'V05 §2.6 (`accesses` and every `SkyAccess` field row)',
'V05-0045':'V05 §2.6 (ground landing row)','V05-0047':'V05 §2.6 (`field` row)','V05-0048':'V05 §1b (`skyUnitInput` row; G-unitinput)',
'V05-0049':'V05 §2.6 (`altitudeCm`, `groundRefCm` row)','V05-0050':'V05 §1b (`islandShadeStrip` row); V05 §2.6 (strip rows)',
'V05-0051':'V05 §2.6 (`shadeBasis` row); the schedule V05 §3.19 (6)','V05-0052':'V05 §2.6 (strip fields row); V05 §2.3a `basis`',
'V05-0053':'V05 §1b (`islandShadeStrip` row); V05 §2.6 (strips onto an island row)','V05-0057':'V05 §1b (institution rows and their `handover` column)',
'V05-0058':'V05 §2.6 (crypt site row)','V05-0064':'V05 §2.6 (`EpochOps.demandTaken` row)','V05-0071':'V05 §2.6 (`underside` row); V05 §1b (`undersideTiers`)',
'V05-0074':'V05 §1b (`fallIsland` row); V05 §3.16 (4)\'s table','V05-0079':'V05 §2.6 (island `RetainingWall`s row)',
'V05-0082':'V05 §1b (`levelledGroundCm` row: this volume\'s uses; the reader list §4.7, file f item 309)',
'V05-0083':'V05 §2.6 (`removed`, `removedAccesses` rows); V05 §1b (`removedSlots(doc)`)','V05-0084':'V05 §1b (DR27 row; ID-DR)',
'V05-0104':'V05 §2.3 (`SkyUnitInput`; G-unitinput)','V05-0105':'V05 §2.3',
'V05-0106':'V05 §2.3 cites V01 §3.10.3 (2), §3.16','V05-0113':'V05 §2.4 cites II.6 (4) (values dropped)',
'V05-0136':'V05 §2.4 (kept: V11 §3.5.13 compiles its rows from these facts; citation added)',
'V05-0160':'V05 §2.6 (`Way.formerClass` row: this volume\'s writer cell; V06 §2.12)','V05-0161':'V05 §2.6 (stretch-state profiles row: writer cell; §2.2 rule 5, E-01)',
'V05-0173':'V05 §3.1 (the unit run row cites V01 §3.10.3)','V05-0176':'V05 §3.1 cites §4.1 (V05-RESTATE-5)',
'V05-0242':'V05 §3.10 (6) cites §4.5 *Fields* (file f item 295)','V05-0254':'V05 §3.12 cites V01 §3.10.3 (the contract kept, tested by T-V5-9)',
'V05-0256':'closed at V01 §3.10.3 (the seven inputs); V05 §3.12 cites it','V05-0287':'V05 §3.17 (F-OUTLINE, base)',
'V05-0364':'V05 §4.3 cites §7.4 (file f item 375)','V05-0423':'V05 §8 *The register at the exits* (cites V12 §3.11)',
'V05-0535':'V05 §11 (decided: J122)','V05-0536':'validation records; V05 §12 keeps one CONFIRMED paragraph and one PLAUSIBLE list',
'V05-0537':'V05 §13 (closed at destinations; cross-part notes)','V05-0538':'V05 §13 (closed at destinations; cross-part notes)','V05-0539':'V05 §13 (closed at destinations; cross-part notes)',
'V05-0540':'folded: V05 §3.2 (3)–(4), §3.21 (3), §3.22 (3)–(4), §4.1, §4.2, §3.23; V05 *Integration notes*','V05-0541':'folded: V05 §3.2 (6), §3.10 (1), §4.2 (E-02)',
'V05-0542':'folded: V05 §4.4 (DR27)','V05-0543':'folded: V05 §3.21 (1) (`sheer`, J-VI.3)',
'V05-0544':'validation records (history out; every change already in the body)',
}
rows=[]
for i in items:
    iid=i['id']; sec=i.get('sec',''); role=c.get(iid,{}).get('role','home')
    if iid in ov: where=ov[iid]
    elif sec=='10':
        m=re.match(r'BCR-V5-(\d+)',i['statement']); n=int(m.group(1)); f,home=bcr[n]
        where=f'V05 §10 row BCR-V5-{n} → '+(f'file f item {f} → {home}' if f else home)
    elif sec in ('0','1.1','1.2','1.3','1b') or re.match(r'^[2-9](\.\d+[a-z]?)?$',sec):
        where=f'V05 §{sec}'
    else: where=f'V05 §{sec}'
    rows.append((iid,sec,role,where))
for t in terms:
    home=t.get('home','').replace('V5 §','V05 §')
    if 'SkyHandover' in t['term'] or 'hand-over' in t['term'].lower(): home+=' (renamed `SkyUnitInput`, G-unitinput)'
    if 'DR-SKY' in t['term']: home+=' (DR27, ID-DR)'
    rows.append((t['id'],'term','glossary',f"{home} — term `{t['term']}`"))
out=['| inventory id | old section | canon role | now lives |','|---|---|---|---|']
for r in rows: out.append('| '+' | '.join(r)+' |')
open('docs/validation/coherence/work/rewrite-V05/mapping.md','w').write('\n'.join(out)+'\n')
print(len(rows),'rows')
