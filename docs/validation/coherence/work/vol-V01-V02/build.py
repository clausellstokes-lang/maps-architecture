import json,re,os,glob,collections,hashlib
ROOT='/Users/cstokes/Desktop/Maps'; D=ROOT+'/docs'
W=D+'/validation/coherence/work/vol-V01-V02'
SP='/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/v0102'
items=[json.loads(l) for l in open(W+'/items.jsonl') if l.strip()]
F=[json.loads(l) for l in open(W+'/findings.jsonl') if l.strip()]
# ---- outside mentions (wiring census by identifier keys)
A=open(D+'/ARCHITECTURE.md',encoding='utf-8').read().split('\n')
heads=[]
for i,l in enumerate(A):
    m=re.match(r'^(#{2,3}) (.*)',l)
    if m: heads.append((i,m.group(2)))
def secof(i):
    h=''
    for j,t in heads:
        if j<=i: h=t
        else: break
    t=h.split(' ')[0]
    return t if (t.startswith('§') or t.startswith('II')) else ('§'+t if t else '')
vols={os.path.basename(f)[:3]:open(f,encoding='utf-8').read() for f in sorted(glob.glob(D+'/volumes/V[0-9][0-9]-*.md'))}
ident=re.compile(r'^[A-Za-z_][A-Za-z0-9_.]*$')
cache={}
def mentions(k):
    pat=re.compile(r'(?<![A-Za-z0-9_])'+re.escape(k)+r'(?![A-Za-z0-9_])')
    secs=collections.OrderedDict()
    for i,l in enumerate(A):
        if pat.search(l): secs[secof(i)]=1
    return list(secs)[:20],[v for v,t in vols.items() if pat.search(t)]
for it in items:
    ks=[k for k in it.get('keys',[]) if ident.match(k) and len(k)>=6 and re.search(r'[A-Z_.]|[a-z][A-Z]',k)]
    if not ks: continue
    b=[];v=[]
    for k in ks:
        if k not in cache: cache[k]=mentions(k)
        bb,vv=cache[k]; b+=[x for x in bb if x not in b]; v+=[x for x in vv if x not in v]
    it['outside_mentions']={'keys':ks,'base_sections':b,'volumes':v}
# ---- findings -> categories
CAT={'narr':'narration','term':'terminology','handoff':'handoffs_to_canon','bref':'broken_references','restate':'restatement_findings','dup':'internal_duplications','iconf':'internal_conflicts','xconf':'cross_part_conflicts','defer':'deferral_wording','wgap':'wiring_gaps','eleg':'elegance_candidates','missing':'missing_parts','ambig':'ambiguous_text'}
TAG={'narr':'NARR','term':'TERM','handoff':'HANDOFF','bref':'BREF','restate':'RESTATE','dup':'DUP','iconf':'ICONF','xconf':'XCONF','defer':'DEFER','wgap':'WGAP','eleg':'ELEG','missing':'MISSING','ambig':'AMBIG'}
cats={v:[] for v in CAT.values()}
cnt=collections.Counter()
for f in F:
    cnt[(f['vol'],f['type'])]+=1
    rec=dict(id='%s-%s-%d'%(f['vol'],TAG[f['type']],cnt[(f['vol'],f['type'])]),severity=f['severity'],items=f['items'],where=f['where'],claim=f['claim'],hint=f['hint'])
    cats[CAT[f['type']]].append(rec)
# restatement entries (cross-part: a fact whose home is the base or another volume, stated with its value here)
RESTATE=[
('V01-0073','V03 3.7.1, 3.7.2; V02 §2.3','glosses of stackAccessDoor, basementDoor, the church class and PorchKindRow columns and ship milestone in the §1.2 hooks table'),
('V01-0214','base §4.5 (S6 character anchors)','character.anchorSigma value 5 in the landmarkSigma row'),
('V01-0280','V11 ways.crossing (rampMaxGrade)','lane, alley and cul-de-sac 12 %, path 15 %'),
('V01-0352','V11 terrace row; V11 ways.crossing','terrace.slopeMin 0.15, terrace.stepMinCm 60 cm, rampMaxGrade 12 % / 15 % in the §3.14 constants rows that say "read, never restated"'),
('V01-0374','V11 raisedWays.structure','clearanceCm cart classes 450 cm, foot classes 250 cm'),
('V01-0277','II.1 (BCR-30 (b))','barrier-closure seam typing (shore to water, cliff and gorge to cliff, marsh to marsh, enceinte to wall, sheer never), also stated in V1-3.11 (4)'),
('V02-0083','base §2.2 LatticeSpec / §3.2','minEdge 25 cm, attractCm 26 cm in the §1c hooks row'),
('V02-0168','base §2.2 LatticeSpec','minEdge (25 cm) in M13'),
('V02-0281','base §1.1; §12.5','buildings per rung (TOWN 1 200-1 500, CITY 4 500-6 000, METROPOLIS 12 000-15 000, 30 000-36 000 at the 120 000 cap), rung populations, first-map times'),
('V02-0292','V11 §3.6.4 HeightsRow','towerStoreys 5-8 at towerStoreyCm 600; a church west tower 3-5 x 450 in T-V2-7'),
('V02-0276','V01 §7 (NG parity sheet sentence; IN-V01-3)','the NG parity-sheet sentence (fakeGablePerWing from M6a, roofscape at M6b when the bars pass), stated again in V2 §5.3 and X14'),
]
restatements=[dict(item=a,canonical_home=b,fact=c) for a,b,c in RESTATE]
# ---- reference census
R=json.load(open(SP+'/refs.json'))['refs']
bv={}
for r in R:
    k='%s:%s'%(r['kind'],{True:'ok',False:'unresolved',None:'external'}[r['resolves']])
    bv.setdefault('V%02d'%r['vol'],collections.Counter())[k]+=1
ref_census=dict(by_volume={k:dict(v) for k,v in bv.items()},
 method=("Every §x.y and II.x reference, V0n §x / Vn §x / volume n §x / V1-x.y / V0n x.y volume reference, BCR-n / BCR-Vn-m, J-Vn.m, T-Vn-m, Jnnn (docs/PROGRESS.md), J-VI.n (_integrate.md), other J-ids, IN-V0n-m, seam and critique ids (S23…, SCC…, ST-, SR…, VnC-, Cn-, SS-, CVR-, X-Vn-), file f items, g items and file paths in both volumes was extracted by script "
         "(scratchpad refs.py) and resolved: base refs against ARCHITECTURE.md's headings, volume refs against each volume's numbered headings and bold sub-numbers, own ids against their definition rows, other ids by presence in the target file, f items 200-585 and g items 102-113 against the item lists, paths on disk."),
 manual_review=("165 section refs failed the mechanical qualifier: every one was read in context and resolves — 131 are own-volume or other-volume pointers whose qualifier sits earlier in the sentence or on the previous line (e.g. 'V2' at a line end, 'V04 §3.3's P7 … §3.7a's T8', 'V05 §3.20 (1)'), 30 sit in V02's header ledgers as own shorthand, 1 is a pattern placeholder ('§3.1x'), 1 cites the critique's §11.6; "
                "the 4 'f item' hits are 'of item 109/102/106/110' (g items, resolved); 'BCR-14' in V02 is V01's BCR-14 by its sentence; 'plat/bench/fm-parity/' is a planned code path, not a document; 26 'scratchpad/volumes/…' paths exist only in a session scratchpad (finding V02-BREF-1). "
                "Own ids: J-V1.1-101, T-V1-1-54, BCR-1-46, J-V2.1-108, T-V2-1-53, BCR-V2-01-42 each defined exactly once with no gap; every cited own id is defined; X1-X33 all present. Deep qualifiers (rule n, step n, (n)) were checked where a finding depends on them (V1-4.6 vs V1-4.5)."))
narr=json.load(open(SP+'/narr.json'))
src={'V01':dict(file='docs/volumes/V01-neighbourhoods.md',md5='85b488b31b264b447837e4ff228d618c',**narr['V01']),
     'V02':dict(file='docs/volumes/V02-buildings.md',md5='1373d1881dac3fbc44e71a33a870d483',**narr['V02'])}
for v in ('V01','V02'):
    assert hashlib.md5(open(ROOT+'/'+src[v]['file'],'rb').read()).hexdigest()==src[v]['md5']
terms=[it for it in items if it['kind']=='term']
byv={}
for v in ('V01','V02'):
    its=[i for i in items if i['id'].startswith(v)]
    byv[v]=dict(items=len(its),terms=sum(1 for i in its if i['kind']=='term'),by_kind=dict(collections.Counter(i['kind'] for i in its)))
g_routing=dict(note=("g items 102-110 are carried by the two volumes as their owners named (V01 §1.2 g-item rows and V1-3.17 item 110 parts; V02 §3.14, §3.15-§3.17). g items 111-113 (added 2026-09-29, applied by the coherence pass) name neither V01 nor V02 among their homes: 111 names V07, V08, V11, V06, V05, V09, V10, V12; 112 names base §8, §9, §13, V09, V12; 113 names V06, V08, V04, V07, V11, V09, V10, V12. "
  "Touch points for the lane applying them (not findings here): 112 (a)'s second cue applies to every style family that encodes meaning in colour, which includes V01's hatched family and V02's FM look if they carry any colour-coded category; 113 (a) (3)'s 'roofless and ruined buildings' and 'a church too big' read V02's massing and V06's decay rows. J121/J122: Q-V1-1 ('yes') and Q-V2-1 ('not now') are decided in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md but not marked answered (findings V01-MISSING-1, V02-MISSING-1); V03 Q1 ('yes') still conditions V02 §8.1 and J-V2.32 (V02-DEFER-1, -2)."))
counts=dict(items=len(items),facts=len(items)-len(terms),terms=len(terms),by_volume=byv,
 restatements=len(restatements),restatement_findings=len(cats['restatement_findings']),internal_duplications=len(cats['internal_duplications']),internal_conflicts=len(cats['internal_conflicts']),
 cross_part_conflicts=len(cats['cross_part_conflicts']),broken_references=len(cats['broken_references']),wiring_gaps=len(cats['wiring_gaps']),missing_parts=len(cats['missing_parts']),
 elegance_candidates=len(cats['elegance_candidates']),deferral_wording=len(cats['deferral_wording']),narration=len(cats['narration']),terminology=len(cats['terminology']),ambiguous_text=len(cats['ambiguous_text']),handoffs_to_canon=len(cats['handoffs_to_canon']),
 findings_total=len(F),findings_major=sum(1 for f in F if f['severity']=='major'))
out=dict(key='coherence/inventory-vol-V01-V02',unit='volumes V01 (neighbourhoods, stage 2) and V02 (buildings, stage 3)',
 scope='docs/volumes/V01-neighbourhoods.md and docs/volumes/V02-buildings.md, each read completely (every section, the BCRs, the integration notes, the reconciliation and finalization records)',
 source=src,counts=counts,reference_census=ref_census,items=items,restatements=restatements,
 internal_duplications=cats['internal_duplications'],internal_conflicts=cats['internal_conflicts'],cross_part_conflicts=cats['cross_part_conflicts'],
 broken_references=cats['broken_references'],wiring_gaps=cats['wiring_gaps'],missing_parts=cats['missing_parts'],elegance_candidates=cats['elegance_candidates'],
 edges_observed=[],deferral_wording=cats['deferral_wording'],narration=cats['narration'],terminology=cats['terminology'],ambiguous_text=cats['ambiguous_text'],
 handoffs_to_canon=cats['handoffs_to_canon'],restatement_findings=cats['restatement_findings'],g_items_routing=g_routing,
 bcr_to_file_f=json.load(open(W+'/bcrmap.json')) if os.path.exists(W+'/bcrmap.json') else None)
json.dump(out,open(D+'/validation/coherence/inventory-vol-V01-V02.json','w'),ensure_ascii=False,indent=1)
json.dump(dict(counts=counts,cats={k:len(v) for k,v in cats.items()}),open(SP+'/build-summary.json','w'),indent=1)
print(json.dumps(counts,ensure_ascii=False)[:1500])
