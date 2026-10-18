#!/usr/bin/env python3
"""rewrite-V09: every catalogue edge and combination the canon routes to V09 -> its V09 §3.16 row (and rule). Reads
docs/validation/coherence/edges.json; writes edges-map.md beside this script."""
import json, os, re
R='/home/user/maps-architecture/docs/validation/coherence/edges.json'
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'edges-map.md')
ROW={'2.3':3,'2.5':4,'2.6':5,'2.7':6,'2.8':7,'2.10':8,'2.11':9,'3.1':10,'3.2':11,'3.3':1,'3.4':12,'3.5':13,'3.6':14,'3.7':15,
 '3.8':16,'3.9':17,'3.12':18,'3.14':19,'3.15':20,'4.2':21,'4.3':22,'4.4':23,'4.5':24,'4.6':25,'4.7':26,'4.8':27,'4.9':28,
 '4.10':29,'4.11':30,'4.12':31,'4.13':32,'4.14':33,'4.16':34,'4.17':35,'4.18':36,'4.20':37,'4.20.1':38,'4.20.2':39,
 '4.20.3':41,'4.20.4':42,'4.20.5':43,'4.20.6':44,'4.20.7':45,'4.20.8':46,'4.20.9':47,'5.1':48,'5.2':49,'5.3':50,'5.4':51,
 '5.5':52,'5.7':53,'5.8':54,'5.9':55,'5.10':56,'5.12':57,'5.13':58,'5.14':59,'5.15':60}
COMBO={'C-steep-tools':61,'C-steep-layers':62,'C-moat-tools':63,'C-bridge-layers':64,'C-oasis-tools':65,'C-oasis-layers':66,
 'C-frame-tools':67,'C-frame-layers':68,'C-hood-layers':69,'C-terraced-ward-tools':70,'C-terraced-ward-layers':71,
 'C-composed-layers':72,'C-crypt-tools':73,'C-crypt-layers':74,'C-plan-layers':75,'C-shade-tools':76,'C-shade-layers':77,
 'C-skyaccess-layers':78,'C-landfall-tools':79,'C-landfall-layers':80,'C-history-tools':81,'C-history-layers':82,
 'C-dossier-tools':83,'C-custom-tools':84,'C-custom-layers':85}
RULE={'E4':'rule (E4) and ','E6':'rule (E6) and ','E8':'rule (E8) and '}
d=json.load(open(R))
lines=['| edge | status | V09 §3.16 | test |','|---|---|---|---|']
n=0
for e in d['edges']:
    if e.get('unit')!='V09' or e['status'] not in ('UNDEFINED','UNTESTED'): continue
    if e['id'].startswith('EI-'):
        lines.append(f"| {e['id']} | {e['status']} | row 40 (`bend.raised.skyAccess`) | T-V9-52 |"); n+=1; continue
    sec=re.search(r'§([\d.]+)',e['section']).group(1)
    cls=e['class'].split('-')[0]
    row=ROW.get(sec)
    lines.append(f"| {e['id']} | {e['status']} | {RULE.get(cls,'')}row {row} | T-V9-80 ({row}) |"); n+=1
for c in d['combinations']:
    if c.get('owner')!='V09' or c['status']!='UNDEFINED': continue
    r=COMBO[c['id']]; lines.append(f"| {c['id']} | UNDEFINED (combination) | row {r} | T-V9-80 ({r}) or the row's named bar |"); n+=1
open(OUT,'w',encoding='utf-8').write('\n'.join(lines)+'\n')
print(n)
