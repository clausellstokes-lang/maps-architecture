#!/usr/bin/env python3
import json,re,hashlib,collections,os
ROOT='/Users/cstokes/Desktop/Maps'; W=f'{ROOT}/docs/validation/coherence/work/vol-V03-V04'
SC='/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/v0304'
items=[json.loads(l) for l in open(f'{W}/items.jsonl') if l.strip()]
finds=[json.loads(l) for l in open(f'{W}/findings.jsonl') if l.strip()]
SRC={'V03':'docs/volumes/V03-interiors.md','V04':'docs/volumes/V04-underground.md'}
def words(path,a=None,b=None):
    L=open(f'{ROOT}/{path}',encoding='utf-8').read().split('\n')
    seg=L[(a-1 if a else 0):(b if b else len(L))]
    return sum(len(re.findall(r'\S+',l)) for l in seg)
NARR={'V03':[(3,112,'banners and PROGRESS/revision/reconciliation ledgers'),(3138,3324,'§12 CONFIRMED/PLAUSIBLE round records'),(3325,3525,'§13 fix list and per-round hand-offs'),(3548,3855,'reconciliation rounds 1-6 and finalization records')],
      'V04':[(3,131,'banners and ledgers'),(3466,3633,'§12 CONFIRMED/PLAUSIBLE round records'),(3634,3764,'§13 per-round fix lists and hand-offs'),(3811,4168,'reconciliation rounds 1-6, continuations and finalization records (IN notes excluded)')]}
source={}
for v,p in SRC.items():
    raw=open(f'{ROOT}/{p}','rb').read(); L=raw.decode('utf-8').split('\n')
    nw=words(p); nar=[dict(lines=f'{a}-{b}',what=w,words=words(p,a,b)) for a,b,w in NARR[v]]
    source[v]=dict(file=p,lines=len(L)-(1 if L[-1]=='' else 0),md5=hashlib.md5(raw).hexdigest(),words=nw,narration_ranges=nar,
                   narration_words=sum(x['words'] for x in nar),narration_share=round(sum(x['words'] for x in nar)/nw,3))
kinds={v:collections.Counter(i['kind'] for i in items if i['id'].startswith(v)) for v in SRC}
terms=[i for i in items if i['kind']=='term']
refs=json.load(open(f'{SC}/refs.json'))
census={}
for v in refs:
    c=collections.Counter((r['kind'],'ok' if r['status']=='ok' else ('prefix' if r['status'].startswith('prefix') else 'unresolved')) for r in refs[v])
    census[v]={f'{k}:{s}':n for (k,s),n in sorted(c.items())}
census_note=('Every §x.y, II.x, V0n §x / Vn-x.y, J-Vn.m, J-VI.n, J-Ann.m, J-Pnn, T-Vn-m, base Tnn-m, BCR-Vn-m, file f item and g item reference in both volumes was extracted by script (work/vol-V03-V04/refs.py) and resolved: volume refs against each volume\'s numbered headings and bold sub-numbers, base refs against ARCHITECTURE.md\'s headings, ids against their defining tables, f items against AMENDMENTS-2026-09-28f.md (200-585), g items against the amendments files. All volume, id and amendment references resolve. The "base:prefix" hits were read one by one: all are volume references in list continuations (e.g. "V2 §2.6, §3.15.1, §3.15.4") or V04 self-references written without "V4" (see finding bref V04-1); none is a base reference to a missing base section. Program J rows (J84, J111, J114, J120-J124) resolve in docs/PROGRESS.md; J-S23.., J-SS3.10 in the critique seam files; DEFINITION §3 and §4 in docs/DEFINITION.md.')
bcrmap=open(f'{SC}/fmap.txt').read().split('\n')[2:6]
RESTATE=[
 ('V03-0034','base §9.4','room label cap-height range 5-9 px (restated in §1 hooks row and §5.1 Labels)'),
 ('V03-0039','base §12.7 / §12.8','plan rung budget 5 ms median / 20 ms p95 and cache line 4 KB per storey (restated in §1 hooks row and §6)'),
 ('V03-0127','V03 §2.4 PlanGeometryRow (roomProgram.json) is the home; base §12.7 restates it','the wing-local module 50 cm (base §12.7 fallback "50 -> 100 cm")'),
 ('V03-0233','base §2.6 step 3','the trapdoor fallback of an external basement with no door side (restated in 3.7.1, 3.7.7, 3.9)'),
 ('V04-0097','base §4.2 S2','the dense core plot share 0.62 (restated with its citation in P2)'),
 ('V04-0097','base II.7.3','the sewer-front capacity law 2 x sum lengthM x admissibleShare / meanFrontage and the minimum underground depth 4 m x the band row (restated in P4 and §2.4\'s NetworkForecast comment)'),
 ('V04-0159','base §4.11 persistence table','rate(underground) 0.03 and "tunnels two bands slower than a building" (restated in 3.10)'),
 ('V04-0178','base §8.4','ambient.underground 0.02 (restated in 5.3)'),
 ('V04-0137','base II.7.6 / §2.6','accessReachM 5 m (restated in 3.5.7 (c)) and the basement floor = baseCm less Basement.floors x cellar.depthCm (restated in (d))'),
 ('V04-0106','base §2.7 (BCR-45)','raised.supportFoundationCm 400 cm (restated in 3.5.0 (1)) and raised.vaultCap per rung (restated in §6: 240 at METROPOLIS)'),
 ('V04-0118','base II.7.6 (as BCR-36 amends it)','the ossuary need law A(f) (restated in full in 3.5.1 (2))'),
 ('V04-0071','V11 §3.23.8','growthCapShare 0.01 per year compounded (finding restate V04-1)'),
 ('V04-0069','V11 §3.23','the V11-owned rows of ruin, openings, dig and catacomb tables (finding restate V04-3)'),
 ('V04-0344','base §16','the base total 185.5-248.5 pw (finding restate V04-2)'),
]
restatements=[dict(item=a,canonical_home=b,fact=c) for a,b,c in RESTATE]
def fl(t): return [dict(id=f"{d['vol']}-{t.upper()}-{d['n']}",severity=d['severity'],items=d['items'],where=d['where'],claim=d['claim'],hint=d['hint']) for d in finds if d['type']==t]
out=dict(key='coherence/inventory-vol-V03-V04',unit='volumes V03 (interiors) and V04 (underground)',
 scope='docs/volumes/V03-interiors.md and docs/volumes/V04-underground.md, each read completely (every section, the integration notes, the reconciliation and finalization records)',
 source=source,
 counts=dict(items=len(items),facts=len(items)-len(terms),terms=len(terms),by_volume={v:dict(items=sum(kinds[v].values()),by_kind=dict(kinds[v])) for v in SRC},
   restatements=len(restatements),findings=len(finds),by_type=dict(collections.Counter(d['type'] for d in finds)),by_severity=dict(collections.Counter(d['severity'] for d in finds))),
 reference_census=dict(by_volume=census,method=census_note,bcr_to_f_items='every BCR-V3-1..33 and V04 BCR-1..46 (BCR-34 and BCR-44 carried inside BCR-14 and BCR-3) maps to an f item; see scratchpad fmap.txt: '+' '.join(bcrmap)),
 items=items,
 restatements=restatements,
 internal_duplications=fl('dup'),
 internal_conflicts=fl('iconf'),
 cross_part_conflicts=fl('xconf'),
 broken_references=fl('bref'),
 wiring_gaps=fl('wgap'),
 missing_parts=fl('missing'),
 elegance_candidates=fl('eleg'),
 edges_observed=fl('edge'),
 deferral_wording=fl('defer'),
 narration=fl('narr'),
 terminology=fl('term'),
 restatement_findings=fl('restate'),
 g_items_routing=dict(note='g items from 111 onward: 111 names V07, V08, V11, V06, V05, V09, V10, V12 (not V03 or V04); 112 names base §8, §9, §13, V09, V12 (not V03 or V04); 113 names V04 (buried former-town ruins; lost access) among V06, V08, V07, V11, V09, V10, V12 - V04 carries no part of it (finding MISSING V04-1). J121/J122: V03 Q1 and V04 Q1, Q2 are decided in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md but not marked answered (findings MISSING V03-1, V04-2).'))
json.dump(out,open(f'{ROOT}/docs/validation/coherence/inventory-vol-V03-V04.json','w'),ensure_ascii=False,indent=1)
print(json.dumps(out['counts'],indent=1)); print(json.dumps(source,indent=1)[:1500])
