import json,os,sys,collections,hashlib
ROOT='/Users/cstokes/Desktop/Maps'; D=ROOT+'/docs'
W=D+'/validation/coherence/work/vol-V11-V12'
SP='/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/v11v12'
sys.path.insert(0,W); from terms import TERMS
items=[json.loads(l) for l in open(W+'/items.jsonl') if l.strip()]
F=[json.loads(l) for l in open(W+'/findings.jsonl') if l.strip()]
CAT={'narr':'narration','term':'terminology','handoff':'handoffs_to_canon','bref':'broken_references','restate':'restatement_findings','dup':'internal_duplications','iconf':'internal_conflicts','xconf':'cross_volume_conflicts','defer':'deferral_wording','wgap':'wiring_gaps','eleg':'elegance_candidates','missing':'missing_parts','edge':'edges_observed'}
TAG={'narr':'NARR','term':'TERM','handoff':'HANDOFF','bref':'BREF','restate':'RESTATE','dup':'DUP','iconf':'ICONF','xconf':'XCONF','defer':'DEFER','wgap':'WGAP','eleg':'ELEG','missing':'MISSING','edge':'EDGE'}
cats={v:[] for v in CAT.values()}
cnt=collections.Counter()
for f in F:
    cnt[(f['vol'],f['type'])]+=1
    rec=dict(id='%s-%s-%d'%(f['vol'],TAG[f['type']],cnt[(f['vol'],f['type'])]),severity=f['severity'],items=f['items'],where=f['where'],claim=f['claim'],hint=f['hint'])
    if f['type']=='missing' and ('g item 11' in f['claim']): rec['code']='F-MISSING'
    cats[CAT[f['type']]].append(rec)
RESTATE=[
('V11-0108','base §2.1 (units)','the unit list m, m2, ha, cm, cdeg, share, weight, people, yr, wk, m3, lvl with its additions'),
('V11-0111','base §7.1 (item 101 R2), §5.2 F-EDIT','clamp-to-bound on an out-of-range edit with the one-line message; also V11-0280, V11-0486'),
('V11-0126','base §7.6 (cells)','the compiled cell shape {value, unit, provenance {source, date, note, evidence?}}'),
('V11-0123','base §7.6 (resolution order)','preset resolution: own entry, else 0 or off for an extension cell, else the default'),
('V11-0175','V11 §3.24.1 rows (from V09 §4.20.1 (3))','the bend cells 15 m, 12 m, 0.8 given as V09\'s constants in the lifecycle migrate cell'),
('V11-0283','base §17.1 (5)','the list-hit rule (five or more words of one reference list on a line or column fails unless an allow row is reviewed)'),
('V11-0332','V07 §2.4 (J-V7.64)','v.parish_church crypt cells (cellar chance 0.1, cryptM2 20/25/35/45) and v.chapel never, while saying cited not restated'),
('V11-0308','V11 §3.5.1 (restated in base §10.2 prose)','undergroundAccess.prob defaults (0.15-0.30 lodging and works families, 0.02 housing, 0 barracks, courthouse, temple)'),
('V11-0450','V11 §3.23 (restated in V04\'s defaults table)','the underground content rows\' values, carried in V04 until its next revision (X-V11-4)'),
('V11-0465','V12 §3.11 register line 21','the bend cells\' calibration milestone, stated as M3a (V12: panel M4-110 at M4)'),
('V12-0103','V11 §3.24.0 (switch table)','the item-110 off values listed again in NoOpPin.overlay\'s comment'),
('V12-0163','V11 row 80 (IN-V11-1)','the raised-way calibration minima 0.02 (chance) and 1 (cap), also in J-V12.42, T-V12-39 and line 1879'),
]
restatements=[dict(item=a,canonical_home=b,fact=c) for a,b,c in RESTATE]
iid={i['id'] for i in items}
for r in restatements: assert r['item'] in iid, r
terms=[dict(term=t,volume=v,defined_at=s,definition=d,note=n) for t,v,s,d,n in TERMS]
src={}
for v,fn,rng in (('V11','docs/volumes/V11-content.md',[(3,108,'banners and PROGRESS/REVISION/RECONCILIATION ledgers'),(4825,5020,'§12 CONFIRMED/PLAUSIBLE per-round paragraphs'),(5064,5411,'reconciliation round 1-6 and continuation records, finalization (lines 5209-5219 hold normative integration notes IN-V11-4.., 108 words)')]),
                 ('V12','docs/volumes/V12-calibration.md',[(3,105,'banners and REVISION/RECONCILIATION/PROGRESS ledgers'),(3123,3297,'§12 CONFIRMED/PLAUSIBLE per-round paragraphs'),(3313,3544,'§13 per-round reconciliation paragraphs')])):
    raw=open(ROOT+'/'+fn,'rb').read(); L=raw.decode('utf-8').split('\n')
    nr=[dict(lines='%d-%d'%(a,b),what=w,words=sum(len(l.split()) for l in L[a-1:b])) for a,b,w in rng]
    src[v]=dict(file=fn,md5=hashlib.md5(raw).hexdigest(),lines=raw.count(b'\n'),words=sum(len(l.split()) for l in L),narration_ranges=nr,
                narration_words=sum(x['words'] for x in nr))
src['V11']['inline_pass_markers']={'reconciliation round n':137,"round n's continuation":54,'SCC-':433,'SR':190,'SS-':135,'V11C-':82}
src['V12']['inline_pass_markers']={'reconciliation round n':160,"round n's continuation":49,'SCC-':404,'SS-':4,'V12C-':35}
assert src['V11']['md5'].startswith('0b37bab0') and src['V12']['md5'].startswith('0cada4c8'), 'source changed since inventory'
census=json.load(open(SP+'/census.json')); sb=json.load(open(SP+'/selfbare.json')); ids=json.load(open(SP+'/ids.json'))
ref_census=dict(section_refs=census,
  bare_own_only_refs={v:sb[v]['counts'] for v in sb},
  id_definitions=ids['defs'],
  id_resolution=('Every T-V11-n, T-V12-n, J-V11.n, J-V12.n, BCR-V11-n, BCR-V12-n, X-V11-n, X-V12-n, W-n, IN-V11-n, IN-V12-n, Q-V11-n, Q-V12-n, J-VI.n, Jnnn, '
    'file f item (200-585) and base T/D id cited in either volume resolves to a definition (0 dangling). Every BCR-V11-1..31 and BCR-V12-1..22 is carried by file f '
    '(docs/AMENDMENTS-2026-09-28f.md; 386 f items, 200-585). Bare BCR-n ids are defined by both V01 and V04, so bare citations are ambiguous (BREF).'),
  manual_review=('Volume-prefixed section refs all resolve (V11 1459, V12 931; V1-x form 66 and 19). Five refs the script left unresolved were read in context and resolve: '
    'V11 line 4929 V06 §3.9.6-§3.9.11 and §3.19.2-§3.19.5, line 5004 V09 §5.7, V12 line 3215 V11 §3.16; two continuation false positives (V11 lines 4864, 5127) are V11 §3.22 and §3.6.1. '
    'Bare § refs whose target exists only in the volume itself (V11 308, V12 71; after continuation resolution 197 and 30 stand bare) are reported as BREF; '
    'bare refs whose target exists in both the base and the volume (V11 491, V12 201) read as base by V12\'s stated convention and are ambiguous in V11, which states none.'),
  method='scratchpad coherence/v11v12/xref.py, census.py, selfbare.py, ids.py; headings and bold sub-numbers of ARCHITECTURE.md and every docs/volumes/Vnn-*.md')
g_routing=dict(note=('g items 102-110 are carried by V11 (rows, registry 78-85, §3.23, §3.24) and V12 (bars, register lines, no-op pins, switch-on) as their owners named. '
  'g items 111-113 (docs/AMENDMENTS-2026-09-28g.md, applied by every unit they name) are absent from both volumes: F-MISSING raised for V11 (111: oasis chance, grove and garden rows, water-pull weights, sun cell per climate; 113: event-to-epoch rows, burial thresholds) '
  'and for V12 (111: arid water-reach and oasis bars; 112: the game-master trial record; 113: the bars and the replay budget). 112 names no V11 part.'))
j122=dict(note=('docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md (J122) decided Q-V11-1 (keep, concealed by default in player views, shown as SettlementForge\'s own settings show them), '
  'Q-V12-1 (no), Q-V12-2 (sittings only at M1, M2b, M4, M5, batched, about an hour each) and Q-V12-3 (only where the owner\'s sitting passes them), and the combined build order. '
  'Neither volume records these answers: MISSING and XCONF findings list each place (V11 §11 and §3.11/§3.14 rows; V12 §0, §3.9.1, §3.10.6, §3.11 staged order, §6, §8.3, §11, BCR-V12-4, BCR-V12-6). '
  'J121 (hosting, accounts, languages follow SettlementForge): no V11 or V12 statement contradicts it; V11 row 87 locales is on the INDEX fix list (XCONF).'))
byv={}
for v in ('V11','V12'):
    its=[i for i in items if i['id'].startswith(v)]
    byv[v]=dict(items=len(its),terms=sum(1 for t in TERMS if t[1]==v),by_kind=dict(collections.Counter(i['kind'] for i in its)),
      findings=dict(collections.Counter(f['type'] for f in F if f['vol']==v)))
counts=dict(items=len(items),facts=len(items),terms=len(terms),by_volume=byv,restatements=len(restatements),
  **{k:len(v) for k,v in cats.items()},findings_total=len(F),findings_major=sum(1 for f in F if f['severity']=='major'))
cp=('CONFIRMED: every item, count, id census and section census was produced from the whole text of both volumes (read in full, md5 0b37bab0 and 0cada4c8) and by executed scripts; '
    'the cross-volume conflicts were checked against the named lines of the other volume or decision file. PLAUSIBLE: the two EDGE findings, V11-ICONF-4 (class-count scope) '
    'and the severity grading, which rest on reading rather than execution.')
out=dict(key='coherence/inventory-vol-V11-V12',unit='volumes V11 (content system: rule and content tables) and V12 (calibration, reconciliation and parity measurement)',
  scope='docs/volumes/V11-content.md and docs/volumes/V12-calibration.md, each read completely (every section, wiring table, decisions, BCRs, cross-volume notes, owner questions, integration notes, reconciliation and finalization records)',
  source=src,counts=counts,confirmed_vs_plausible=cp,reference_census=ref_census,items=items,terms=terms,restatements=restatements,
  **cats,g_items_routing=g_routing,j122_routing=j122)
json.dump(out,open(D+'/validation/coherence/inventory-vol-V11-V12.json','w'),ensure_ascii=False,indent=1)
json.dump(dict(counts=counts),open(SP+'/build-summary.json','w'),indent=1)
print(json.dumps({k:v for k,v in counts.items() if k!='by_volume'}))
