#!/usr/bin/env python3
# builds docs/validation/coherence/inventory-vol-V07-V08.json from items.jsonl + findings.jsonl + the census
import json,re,os,glob,collections,hashlib
ROOT='/Users/cstokes/Desktop/Maps'; D=ROOT+'/docs'
W=D+'/validation/coherence/work/vol-V07-V08'
SP='/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/v0708'
items=[json.loads(l) for l in open(W+'/items.jsonl') if l.strip()]
F=[json.loads(l) for l in open(W+'/findings.jsonl') if l.strip()]
IDS={i['id'] for i in items}
assert len(IDS)==len(items)
for f in F:
    for x in f['items']: assert x in IDS,(x,f['type'],f['vol'])
SRC={'V07':('docs/volumes/V07-village.md','f2012dd2edfd30aee1ed4d1b0db25a76'),
     'V08':('docs/volumes/V08-settlementforge.md','60f15d4fb8bcc1d963eec98ae5ea9c2a')}
TXT={}
for v,(p,m) in SRC.items():
    b=open(ROOT+'/'+p,'rb').read(); assert hashlib.md5(b).hexdigest()==m,(v,'changed')
    TXT[v]=b.decode('utf-8').split('\n')
# ---- outside mentions of identifier keys (base sections, other volumes)
A=open(D+'/ARCHITECTURE.md',encoding='utf-8').read().split('\n')
heads=[(i,m.group(2)) for i,l in enumerate(A) for m in [re.match(r'^(#{2,3}) (.*)',l)] if m]
def secof(i):
    h=''
    for j,t in heads:
        if j<=i: h=t
        else: break
    t=h.split(' ')[0]
    return t if (t.startswith('§') or t.startswith('II') or t.startswith('PART')) else ('§'+t if t else '')
vols={os.path.basename(f)[:3]:open(f,encoding='utf-8').read() for f in sorted(glob.glob(D+'/volumes/V[0-9][0-9]-*.md'))}
ident=re.compile(r'^[A-Za-z_@][A-Za-z0-9_./@-]*$')
cache={}
def mentions(k):
    pat=re.compile(r'(?<![A-Za-z0-9_])'+re.escape(k)+r'(?![A-Za-z0-9_])')
    secs=collections.OrderedDict()
    for i,l in enumerate(A):
        if pat.search(l): secs[secof(i)]=1
    return list(secs)[:20],[v for v,t in vols.items() if pat.search(t)]
for it in items:
    ks=[k for k in it.get('keys',[]) if ident.match(k) and len(k)>=6 and re.search(r'[A-Z_.@]|[a-z][A-Z]',k)]
    if not ks: continue
    b=[];vv=[]
    for k in ks:
        if k not in cache: cache[k]=mentions(k)
        bb,v2=cache[k]; b+=[x for x in bb if x not in b]; vv+=[x for x in v2 if x not in vv]
    it['outside_mentions']={'keys':ks,'base_sections':b,'volumes':vv}
# ---- findings -> categories (ids renumbered in file order per volume and type)
CAT={'narr':'narration','term':'terminology','bref':'broken_references','restate':'restatement_findings','dup':'internal_duplications','iconf':'internal_conflicts','xconf':'cross_part_conflicts','defer':'deferral_wording','wgap':'wiring_gaps','eleg':'elegance_candidates','edge':'edges_observed'}
TAG={k:k.upper() for k in CAT}
cats={v:[] for v in CAT.values()}
cnt=collections.Counter()
for f in F:
    cnt[(f['vol'],f['type'])]+=1
    cats[CAT[f['type']]].append(dict(id='%s-%s-%d'%(f['vol'],TAG[f['type']],cnt[(f['vol'],f['type'])]),severity=f['severity'],items=f['items'],where=f['where'],claim=f['claim'],hint=f['hint']))
# ---- restatements: facts whose home is the base, file f or another volume, stated with their values here
RESTATE=[
('V07-0100','base registry (@plat/layout StrategyRegistry.products) via file f item 202 (BCR-V7-11)','the whole ProductDecl interface and its member semantics'),
('V07-0101','base §1.1 LadderRouter (D-33) via file f item 202','LadderRouter.route: village for [1, 1 500) once registered, the base clamp otherwise'),
('V07-0111','V11 §3.5.1 (the church-family tag)','the church-family member list (cathedral, great_temple, church, chapel, monastery, generic-worship, generic-monastic, v.parish_church, v.chapel) in epoch.rows.persistence'),
('V07-0168','base §10.2 BuildingClassRow via file f item 432 (BCR-V7-21)','the villageForm column, its type and compile rule'),
('V07-0254','V06 §3.5.2 (street candidate rate)','the street layer rate 0.08 in the desertion rule'),
('V07-0273','base §7.1 EditEvent via file f (BCR-V7-19)','the declareEnd and walk event forms with every field'),
('V07-0325','file f items 201-579 (BCR-V7-1 .. BCR-V7-38 consolidated; see bcr_to_file_f)','the full text of every BCR-V7 request in V07 §10 (items V07-0325 .. V07-0331)'),
('V08-0029','base §11.3 Vocabulary via file f (BCR-V8-1)','the nine new bridge message types and their fields'),
('V08-0030','base §11.3 / §14 via file f (BCR-V8-1, -2)','the extended doc.load, doc.save and status messages'),
('V08-0033','base §7.7 item 12 DossierBinding via file f (BCR-V8-8)','the binding additions (adapter, quarantined, carried keys, retention)'),
('V08-0038','base §14 @plat/port via file f (BCR-V8-4)','E_OTHER_SETTLEMENT and the 27 new PortNote kinds'),
('V08-0041','base §14 DossierDigest via file f (BCR-V8-5)','the digest and DossierInstitution additions'),
('V08-0157','file f items (BCR-V8-1 .. BCR-V8-32 consolidated; BCR-V8-9 and -28 into items 202 and 244)','the full text of every BCR-V8 request in V08 §10 (items V08-0157 .. V08-0162)'),
]
for a,_,_ in RESTATE: assert a in IDS,a
restatements=[dict(item=a,canonical_home=b,fact=c) for a,b,c in RESTATE]
# ---- defined terms (names each volume introduces; owner this volume unless stated)
TERMS=[
('V07','THORP, HAMLET, VILLAGE (village rungs, bands [1, 80), [80, 400), [400, 1 500))','V07-0094','V07 §2.1 (base PART III (5) restates them; f item 201 aligns its floor)'),
('V07','village product','V07-0001','V07'),('V07','township / territory frame','V07-0178','V07'),
('V07','density raster (village.density, bands empty/scattered/close/dense)','V07-0190','V07'),
('V07','tracker (tracker-steered network; road, track, approach)','V07-0196','V07'),
('V07','toft, croft, frontage run, back close','V07-0213','V07'),('V07','slot race','V07-0035','V07'),
('V07','palisade, palisade section, light stretch','V07-0193','V07'),('V07','neck (river-bend fencing)','V07-0003','V07'),
('V07','reached (village.reached face)','V07-0165','V07'),('V07','hand-off band (handoff.band, 5 %)','V07-0099','V07'),
('V07','PLaw (the anchor law)','V07-0104','V07'),('V07','VillageRungRow','V07-0103','V07'),('V07','VillageRuleCells','V07-0114','V07'),
('V07','reference cell ({ref: {table, row, cell}})','V07-0113','V07'),('V07','VillageRequest','V07-0022','V07'),('V07','VillagePlan','V07-0025','V07'),
('V07','VillageField (great field, furlong, meadow, commons)','V07-0224','V07'),('V07','VillageEnd (ends, declareEnd)','V07-0042','V07'),
('V07','EpochPlacement (place, remove)','V07-0102','V07'),('V07','village.records','V07-0088','V07'),('V07','village.pins','V07-0090','V07'),
('V07','v. namespace (25 village classes)','V07-0127','V07'),('V07','PresenceWhen (presence column)','V07-0142','V07'),
('V07','RaisedRead','V07-0166','V07'),('V07','named draw shapes u, B3, F4, S','V07-0175','V07'),('V07','settlement radius R_s','V07-0186','V07'),
('V07','VS1-VS8 village stages','V07-0169','V07'),('V07','F-V-* failure ladders (F-V-PAL, F-V-ANCHOR, F-V-GATE, F-V-FAIR, ...)','V07-0259','V07'),
('V07','VG parity preset','V07-0265','V07'),('V07','outlying farmsteads','V07-0040','V07'),('V07','model time law','V07-0285','V07'),
('V07','deserted village (desertion)','V07-0255','V07'),
('V08','Map tab','V08-0002','V08'),('V08','MapRecord','V08-0026','V08'),('V08','SnapshotBlock','V08-0027','V08'),('V08','PartyKnowledge','V08-0027','V08'),
('V08','PartyPictureSet (party pictures)','V08-0110','V08'),('V08','MapStore, MapHostConfig','V08-0031','V08'),('V08','MapHost, MapSession','V08-0032','V08'),
('V08','@plat/bridge-client (host client)','V08-0011','V08'),('V08','port leader','V08-0012','V08'),('V08','refresh queue','V08-0012','V08'),
('V08','lease','V08-0019','V08'),('V08','row sets (tables/dossier/)','V08-0014','V08'),('V08','digest steps','V08-0081','V08'),('V08','diff table','V08-0084','V08'),
('V08','AudienceWord','V08-0030','V08'),('V08','host mode','V08-0016','V08'),('V08','custom content (CustomLibraryEntry, CustomChainDigest)','V08-0072','V08'),
('V08','CustomChainRecord, CustomServiceRecord','V08-0073','V08'),('V08','AdapterManifest, AdapterRegistry','V08-0037','V08'),
('V08','quarantined (binding state)','V08-0033','base §7.7 item 12 (DossierBinding; BCR-V8-8)'),('V08','held reason','V08-0023','V08'),
('V08','standing notes','V08-0119','V08'),('V08','players\' view (party group, player tab)','V08-0111','V08'),
('V08','failure rows B1-B20','V08-0101','V08'),('V08','SF0-SF7 and VH (build stages)','V08-0142','V08'),
]
for v,t,i,o in TERMS: assert i in IDS,(t,i)
terms=[dict(volume=v,term=t,defined_at=i,owner=o) for v,t,i,o in TERMS]
# ---- reference census
def labels(p):
    S=set()
    for l in open(p,encoding='utf-8'):
        m=re.match(r'^#+\s+(?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b',l)
        if m: S.add(m.group(1))
        for m in re.finditer(r'\*\*(?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)+)\b',l): S.add(m.group(1))
    return S
VL={os.path.basename(p)[:3]:labels(p) for p in glob.glob(D+'/volumes/V[0-9][0-9]-*.md')}
VD={}
for p in glob.glob(D+'/volumes/V[0-9][0-9]-*.md'):
    t=open(p,encoding='utf-8').read()
    VD[os.path.basename(p)[:3]]=dict(T=set(re.findall(r'^\| (T-V[0-9]+-[0-9]+) ',t,re.M)),J=set(re.findall(r'^\| (J-V[0-9]+\.[0-9]+) ',t,re.M)),B=set(re.findall(r'^\*\*(BCR-V[0-9]+-[0-9]+)',t,re.M)))
census={}
for v in ('V07','V08'):
    R=json.load(open(f'{SP}/refs-{v}.json'))
    vr=collections.Counter(); bad=[]
    for i,tv,sec,st in R['volref']:
        L=VL.get(tv,set())
        if sec in L or any(h.startswith(sec+'.') for h in L): vr['resolve']+=1
        else: vr['unresolved']+=1; bad.append((i,tv,sec))
    def owner_of(x):
        n=int(re.match(r'[TJ]-V([0-9]+)',x).group(1)); return 'V%02d'%n
    tr=collections.Counter(); tbad=[]
    for i,x in R['testref']:
        o=owner_of(x)
        if o in VD and x in VD[o]['T']: tr['resolve']+=1
        else: tr['unresolved']+=1; tbad.append((i,x))
    jr=collections.Counter(); jbad=[]
    for i,x in R['jref']:
        o=owner_of(x)
        if o in VD and x in VD[o]['J']: jr['resolve']+=1
        else: jr['unresolved']+=1; jbad.append((i,x))
    fr=collections.Counter(x[2] for x in R['fitem'])
    own=VD[v]; n=int(v[1:])
    def seqcheck(S,pref,sep):
        nums=sorted(int(x.split(sep)[-1]) for x in S if x.startswith(pref))
        return dict(first=nums[0],last=nums[-1],count=len(nums),gaps=[k for k in range(1,nums[-1]+1) if k not in nums])
    census[v]=dict(volume_refs=dict(vr),volume_refs_unresolved=sorted(set(bad)),
        test_refs=dict(tr),test_refs_unresolved=tbad,decision_refs=dict(jr),decision_refs_unresolved=jbad,
        file_f_item_refs=dict(fr),critique_id_citations=len(R['critique']),critique_ids_distinct=len(set(x[1] for x in R['critique'])),
        own_ids=dict(tests=seqcheck(own['T'],'T-V%d-'%n,'-'),decisions=seqcheck(own['J'],'J-V%d.'%n,'.'),bcrs=seqcheck(own['B'],'BCR-V%d-'%n,'-')))
ref_census=dict(by_volume=census,
 method=("Every 'V0n §x' / 'Vn §x' / 'volume n §x' reference, every T-Vn-m and J-Vn.m id, every 'file f item n' and every critique or seam id "
         "(SS-, ST-, SR-, TR-, TT-..TX-, SCC-, VnC-, Cn-) in both volumes was extracted by script (work/vol-V07-V08/refs.py) and resolved: volume refs against each volume's numbered headings and bold sub-labels "
         "(exact label, no parent fallback), tests and decisions against the '| id |' definition rows of the volume the id names, f items against the '**n.**' items of docs/AMENDMENTS-2026-09-28f.md; own-id completeness by script (build.py)."),
 manual_review=("Bare '§x.y' references were read in context, not scripted: V07's pointer convention makes bare §2.x/§3.x its own and other bare § the base (finding V07-TERM-1). "
   "Checked by hand at their destinations: V04 §2.2 blockedBy carries 'rung' (V07 dependency (1) stale, V07-DEFER-1); V06 §3.19.2 exists (dependency (6) stale); V11 §3.16.1 is walls.barriers (IN-V07-4); V11 §3.19.2 exists and is the era default V08 cites (V08-XCONF-9 is about its inputs, not the link); "
   "V02 §3.10.10 exists (V07 §8's register form); base PART III (5) still reads THORP 20-80 while V07 §2.1 fixes [1, 80) with J-V7.1 recording the choice: BCR-V7-1 / file f item 201 (STAGED, applied to the design by the pass) carries the new wording, so this is not filed; "
   "J80 Q5's east-district placeholder is the base's (§7.7 item 16, J-A82.72) and V07 §3.11 matches it; 'T14'/'T16' in V07 §3.11 are research/sf/mapping.md's tables (V07-TERM-4). "
   "Scratchpad receipt paths ('scratchpad/volumes/...') in both volumes' narration exist only in a session scratchpad and go with the narration (NARR findings)."))
# ---- narration ranges (whole blocks of production history; inventory only)
NR={'V07':[('3-50','banner and revision lines'),('52-158','PROGRESS and lane ledgers'),('160-172','reading record'),('3953-4142','§12 per-lane reading records'),('4184-4520','integration notes, reconciliation rounds 1-6, finalization')],
    'V08':[('3-20','banner and revision lines'),('22-78','PROGRESS and revision/reconciliation ledgers'),('3199-3394','§12 per-lane reading records'),('3489-3864','reconciliation rounds 1-6 with continuations, finalization')]}
src={}
for v,(p,m) in SRC.items():
    L=TXT[v]; words=sum(len(l.split()) for l in L); rs=[]; nw=0
    for rg,what in NR[v]:
        a,b=map(int,rg.split('-')); w=sum(len(l.split()) for l in L[a-1:b]); rs.append(dict(lines=rg,words=w,what=what)); nw+=w
    src[v]=dict(file=p,md5=m,lines=len(L)-(1 if L[-1]=='' else 0),words=words,narration_ranges=rs,narration_words=nw,narration_share=round(nw/words,3))
byv={}
for v in ('V07','V08'):
    its=[i for i in items if i['id'].startswith(v)]
    byv[v]=dict(items=len(its),terms=sum(1 for t in terms if t['volume']==v),by_kind=dict(collections.Counter(i['kind'] for i in its)),
               owned_elsewhere=sum(1 for i in its if i['owner']!=v))
bcrmap={'V07':{'note':'BCR-V7-n -> file f item, from the f file\'s own headers (grep of "BCR-V7-n" in docs/AMENDMENTS-2026-09-28f.md item heads)'},'V08':{}}
fh=open(D+'/AMENDMENTS-2026-09-28f.md',encoding='utf-8').read()
itemtxt={}
for m in re.finditer(r'^\*\*([0-9]{3})\.\*\*(.*?)(?=^\*\*[0-9]{3}\.\*\*|\Z)',fh,re.M|re.S): itemtxt[int(m.group(1))]=m.group(2)
bmap={}
for v,n,last in (('V07',7,38),('V08',8,32)):
    for k in range(1,last+1):
        b='BCR-V%d-%d'%(n,k); pat=re.compile(re.escape(b)+r'(?![0-9])')
        bmap[b]=[i for i,t in sorted(itemtxt.items()) if pat.search(t)][:8]
g_routing=("J121/J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md) decide every owner question these volumes pose: V07 Q1 '(a) yes, and its tracker spike (V-M0) right after M0'; "
 "V08 Q1 (web origin) and Q2 (plans, save limits, backups) follow SettlementForge (J121); V08 Q3 'yes, from M-SF'; Q4 'after M-CAL: yes'; Q5 'pictures and player views now; a live shared map as a later item after M-SF'; "
 "V10 Q2 (assistant) 'SettlementForge's, driving our tool API (J121)'; other interface languages follow SettlementForge (J121). Neither volume marks any of them answered (V07-XCONF-1; V08-XCONF-1, -2 and -4 to -8). "
 "g items 109 and 110 are carried at village rungs by V07 §3.16, §3.5a, §3.8a, §3.10a and at the port by V08 §2.6b; g items 111-113 name V07 and V08 among their homes (111: V07, V08; 113: V08, V07) and are applied by the coherence pass, not by these volumes.")
counts=dict(items=len(items),facts=len(items)-sum(1 for i in items if i['kind']=='term'),terms=len(terms),by_volume=byv,restatements=len(restatements),
 restatement_findings=len(cats['restatement_findings']),internal_duplications=len(cats['internal_duplications']),internal_conflicts=len(cats['internal_conflicts']),
 cross_part_conflicts=len(cats['cross_part_conflicts']),broken_references=len(cats['broken_references']),wiring_gaps=len(cats['wiring_gaps']),
 elegance_candidates=len(cats['elegance_candidates']),deferral_wording=len(cats['deferral_wording']),narration=len(cats['narration']),terminology=len(cats['terminology']),
 edges_observed=len(cats['edges_observed']),findings_total=len(F),findings_major=sum(1 for f in F if f['severity']=='major'),
 findings_by_volume=dict(collections.Counter(f['vol'] for f in F)))
out=dict(key='coherence/inventory-vol-V07-V08',unit='volumes V07 (the village product) and V08 (the SettlementForge stage)',
 scope='docs/volumes/V07-village.md and docs/volumes/V08-settlementforge.md, each read completely (every section, the wiring tables, the BCRs, the integration notes, the reconciliation rounds and the finalization records)',
 source=src,counts=counts,reference_census=ref_census,items=items,defined_terms=terms,restatements=restatements,
 internal_duplications=cats['internal_duplications'],internal_conflicts=cats['internal_conflicts'],cross_part_conflicts=cats['cross_part_conflicts'],
 broken_references=cats['broken_references'],wiring_gaps=cats['wiring_gaps'],elegance_candidates=cats['elegance_candidates'],edges_observed=cats['edges_observed'],
 deferral_wording=cats['deferral_wording'],narration=cats['narration'],terminology=cats['terminology'],restatement_findings=cats['restatement_findings'],
 owner_decisions_and_g_items=g_routing,bcr_to_file_f=bmap)
json.dump(out,open(D+'/validation/coherence/inventory-vol-V07-V08.json','w'),ensure_ascii=False,indent=1)
json.dump(dict(counts=counts,census=census),open(SP+'/build-summary.json','w'),indent=1,ensure_ascii=False)
print(json.dumps(dict((k,counts[k]) for k in counts if k!='by_volume'),ensure_ascii=False))
for v in census: print(v,json.dumps({k:census[v][k] for k in ('volume_refs','test_refs','decision_refs','file_f_item_refs','critique_id_citations','own_ids')},ensure_ascii=False)[:900])
print('unresolved', {v:(census[v]['volume_refs_unresolved'][:10],census[v]['test_refs_unresolved'][:10],census[v]['decision_refs_unresolved'][:10]) for v in census})
print('bcr unmapped', [b for b,l in bmap.items() if not l])
