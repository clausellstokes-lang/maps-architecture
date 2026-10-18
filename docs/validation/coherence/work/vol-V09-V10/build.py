import json,re,os,glob,collections,hashlib
ROOT='/Users/cstokes/Desktop/Maps'; D=ROOT+'/docs'
W=D+'/validation/coherence/work/vol-V09-V10'
SP='/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/v09v10'
items=[json.loads(l) for l in open(W+'/items.jsonl') if l.strip()]
F=[json.loads(l) for l in open(W+'/findings.jsonl') if l.strip()]
IDS={i['id'] for i in items}
assert len(IDS)==len(items)
for f in F:
    for i in f['items']: assert i in IDS,(f,i)
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
CAT={'narr':'narration','term':'terminology','handoff':'handoffs_to_canon','bref':'broken_references','restate':'restatement_findings',
     'dup':'internal_duplications','iconf':'internal_conflicts','xconf':'cross_part_conflicts','xagree':'cross_part_conflicts',
     'defer':'deferral_wording','wgap':'wiring_gaps','eleg':'elegance_candidates','gmiss':'missing_parts',
     'j121':'standing_rule_conflicts','j122':'standing_rule_conflicts','edge':'undefined_edges'}
TAG={'narr':'NARR','term':'TERM','handoff':'HANDOFF','bref':'BREF','restate':'RESTATE','dup':'DUP','iconf':'ICONF','xconf':'XCONF',
     'xagree':'XAGREE','defer':'DEFER','wgap':'WGAP','eleg':'ELEG','gmiss':'MISSING','j121':'J121','j122':'J122','edge':'EDGE'}
cats={v:[] for v in dict.fromkeys(CAT.values())}
cnt=collections.Counter()
for f in F:
    cnt[(f['vol'],f['type'])]+=1
    rec=dict(id='%s-%s-%d'%(f['vol'],TAG[f['type']],cnt[(f['vol'],f['type'])]),severity=f['severity'],items=f['items'],where=f['where'],claim=f['claim'],hint=f['hint'])
    if f['type']=='gmiss': rec['finding_class']='F-MISSING'
    cats[CAT[f['type']]].append(rec)
# ---- restatements: facts whose home is the base or another volume (or one home inside the pair), stated with values here
RESTATE=[
('V09-0052','V09 §4.5 T12 (J-V9.115); also V10 §4.1 T12 row (V10-0490)','New decoration as one group of rerollLayer style.jitter then style.crowns at salt + 1, spelled out in the §1b hooks cell'),
('V09-0074','base §2.9 Load steps 2-3; base §6.4 retention','the three load outcomes (upgrade offer, frozen view, open its recipe) restated in the §1b hooks cell'),
('V09-0068','V10 §2.6 members; V08 §3.1 bridge messages','ClerkSlot / ClerkMount / ClerkHandle members restated in the §1b hooks cell'),
('V09-0151','V06 §2.2 (history store)','AppPrefs.history defaults 256 desktop, 96 low-end tier, frames 8 (V06 in turn cites V09: circular)'),
('V09-0701','V06 §2.2','the same history-store defaults a second time in Settings, History'),
('V09-0184','base §1.2; §12.5 TOWN row','first-map law about 124-145 ms at the default TOWN'),
('V09-0188','base §7.8; §12.5','all six within 1 s at TOWN; the model law about 2.3 s at METROPOLIS top'),
('V09-0744','base §12.5','the first-map law 124-145 ms again in the §6.1 T1 budget row'),
('V09-0516','V10 §3.9a (info.under.*, info.catacomb.*, info.crypt.* rows)','quoted panel lines in V9 §4.17 and §4.20.6, with a precedence rule for when they drift'),
('V09-0570','V04 §5.2 unexcavated style','dashed kerbs at 40 % alpha, no fill, no light, only its system label'),
('V09-0586','V04 DigRule / V11 table (rule R-c)','DigRule.maxM 20 m'),
('V09-0621','V11 terrace table (R-c)','terrace.stepMinCm 60 cm, terrace.slopeMin 0.15'),
('V09-0622','V11 terrace table (XV-V9-13 met there)','terrace.retainingReachM 15 m (also V09-0623 flatDepthM 12 m, V09-0624 coverShare 0.8): two homes'),
('V09-0627','V11 aqueduct table (R-c)','aqueduct.sourceReachKm 10 km, aqueduct.gradient [0.0003, 0.003]'),
('V09-0625','base dry run (§7.1 item-110 text, BCR-V9-27 PreviewResult) or V11','the step sampling every 2 m, plus or minus 3 m, and the effects cap 50 (V09-0629) homed in the application volume'),
('V09-0633','V10 §2.10 content.encoders (V10-0186)','terrace brush radius 25 m: V09 cites V10 for the default while V10 calibrates it against V09 (circular)'),
('V09-0296','V09 §2.6 (V09-0130)','the family-multiplier ladder Ignore 0, Less 0.5, Normal 1, More 2, Much more 3 stated twice in V09'),
('V10-0198','V09 §2.6','the same ladder glossed a third time in V10 §2.12 ShapeInput.siting.weights'),
('V10-0490','V09 §4.5 T12','New decoration group restated in the V10 §4.1 T12 encoder row'),
('V10-0238','V07 §2.1 rung table','thorp 40, hamlet 200, village 700 typical populations in the default lexicon'),
('V10-0348','V04 CatacombRule rankCap / V11 table (R-c)','the catacomb rank cap 0.9 in the clerk catacomb row'),
]
for a,_,_ in RESTATE: assert a in IDS,a
restatements=[dict(item=a,canonical_home=b,fact=c) for a,b,c in RESTATE]
# ---- equivalence list (one concept, several names or texts)
EQUIV=[
('ClerkHandle','ClerkHarness (type alias, no member)','V10-ELEG-2'),
('refuse.clerk.offline (V10 §3.16)','error.clerkOffline (V09 §4.9)','V10-ELEG-1'),
('scoped re-roll','Try again; New random (base §7.1 newRandom); re-roll; Rebuild as generated','V09-TERM-4'),
('suppressing removal (file f item 260)','detail.suppress; the removal holds; kept removed; Removals that hold','V09-TERM-4'),
('Re-derive','Rebuild from {stage}','V09-TERM-4'),
('family-multiplier ladder (V09 §2.6)','V09 §4.7 What it cares about; V10 §2.12 weights comment','V09-DUP-1'),
('size words (V10 §3.3 lexicon)','V09 §4.5 T1 size chips (different populations)','V10-XAGREE-3'),
('WhyFamily (V11 eight + score terms)','V01 SUNLIGHT / EMITS / SENSITIVE','V10-XAGREE-2'),
('bend.* ids of V02 §1b','V09 §4.9 bend catalogue keys (only count and step shared)','V09-XAGREE-3'),
('M6-U / M6-sky (INDEX; rule R-d)','M6 (T-V9-33..38); V05 P4 (AP7)','V09-TERM-2, V09-TERM-3'),
('clerk (internal)','assistant (user-facing; ruled by J-V10.86)','ruled, not a defect'),
]
# ---- reference census
xref=json.load(open(SP+'/xref.json')); idc=json.load(open(SP+'/idcensus.json')); bare=json.load(open(SP+'/bare2.json'))
ref_census=dict(
 section_references={'V09':xref['9']['resolved'],'V10':xref['10']['resolved']},
 id_references={'V09':idc['9']['ok'],'V10':idc['10']['ok']},
 bare_section_sign_classes={'V09':bare['9']['counts'],'V10':bare['10']['counts']},
 own_ids={'V09':'J-V9.1-125, T-V9-1-70, BCR-V9-1-36, XV-V9-1-31 each defined once, no gap','V10':'J-V10.1-110, T-V10-1-44, BCR-V10-1-23, CVR-V10-1-20 each defined once, no gap'},
 method=("Script (scratchpad census.py) extracted every qualified volume section reference (V0n §x, Vn §x, volume n §x, V1-x.y) and every unqualified § and II.x reference in both volumes and resolved it against the target file's numbered headings (exact or parent); "
         "a second script (bare2.py) classed every unqualified § by context: qualified start, range end, list continuation after a volume citation, or bare, and whether it names a base section. "
         "Ids (J-Vn.m, J-VI.n, T-Vn-m, BCR-Vn-m, XV-, CVR-, IN-, f items, base J/D ids) were resolved by presence of their definition in the named file."),
 result=("All qualified section references and all ids resolve (0 unresolved). The unqualified-§ convention does not hold: V09 has 131 list continuations after a volume citation (125 naming an existing base section, so resolving to the wrong target under the stated convention) and 23 bare references naming no base section; "
         "V10 has 71 such continuations resolving to a base section and 45 bare references naming none (findings V09-BREF-3, V10-BREF-2). The 1 099 (V09) and 807 (V10) bare references that do name a base section are taken as base references (PLAUSIBLE: an own-volume section with the same number cannot be told apart mechanically)."))
src={}
for v,fn,md5 in (('V09','docs/volumes/V09-application.md','14f78dd6c587fcb50f8351b004426570'),('V10','docs/volumes/V10-clerk.md','0b58e0fcb80dd24d011fc0b4badc9e6c')):
    b=open(ROOT+'/'+fn,'rb').read()
    assert hashlib.md5(b).hexdigest()==md5,(v,'changed during lane')
    src[v]=dict(file=fn,md5=md5,lines=b.decode().count('\n'),words=len(b.decode().split()))
NARR={'V09':[('3-84','banners, revision notes, PROGRESS and revision ledgers'),('4292-4474','§12 review-round narration after the two core paragraphs'),('4476-4919','§13 fix list, integration notes, reconciliation rounds 1-6 with continuations, finalization')],
      'V10':[('3-114','banners, revision notes, PROGRESS / REVISION / RECONCILIATION ledgers'),('3446-3606','§12 CONFIRMED list narrating review rounds'),('3638-4047','§13 fix list, integration notes, reconciliation rounds 1-6 with second briefs, finalization')]}
for v,fn in (('V09','docs/volumes/V09-application.md'),('V10','docs/volumes/V10-clerk.md')):
    L=open(ROOT+'/'+fn).read().split('\n'); rr=[]
    for r,what in NARR[v]:
        a,b=map(int,r.split('-')); w=len(' '.join(L[a-1:b]).split()); rr.append(dict(lines=r,words=w,what=what))
    src[v]['narration_ranges']=rr; src[v]['narration_words']=sum(x['words'] for x in rr); src[v]['narration_share']=round(src[v]['narration_words']/src[v]['words'],3)
terms=[it for it in items if it['kind']=='term']
byv={}
for v in ('V09','V10'):
    its=[i for i in items if i['id'].startswith(v)]
    byv[v]=dict(items=len(its),terms=sum(1 for i in its if i['kind']=='term'),by_kind=dict(sorted(collections.Counter(i['kind'] for i in its).items())))
g_routing=dict(
 carried=("g items 101-110 are carried as the owners named them: V09 is the application home (items 101 (d)/(e) tools and toolkit, 102-105 siting and supply screens, 106 history and restore, 108 skeleton, 109 underground panels §4.17, 110 raised ways §4.20, plus 107 labels), V10 the clerk home (101 (d) built-in clerk, 102/105/109/110 explanations, 108 transcripts). Mention counts by script: item 110 V09 102 / V10 65; 109 28 / 14; 106 34 / 4; 105 21 / 18."),
 new_items=("g items 111-113 (2026-09-29, after the volumes pass) name V09 and V10 among their homes and neither volume mentions them (0 hits each): 111 (oasis, water pull; V09 the T2 spring flag tool, V10 the explanations), 112 (colour-blind variants and a game-master trial; V09 the view settings and the trial), 113 (history-first generation, symbolic peak, LOST voids; V09 the history option, V10 the story). Filed as F-MISSING: V09-MISSING-1..3, V10-MISSING-1..2; LOST voids also V09-WGAP-1."),
 owner_decisions=("J121 (follows SettlementForge: hosting, accounts, key/relay, assistant, model tier, languages, licence, public name) and J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: V09 Q1-Q3, V10 Q1-Q5 answered) are not reflected: both §11 lists still ask the questions, V09 §0/§4.11 and V10 §0/§1.3/§3.17/§3.20 fix the provider, key and relay path as the volumes' own design, V10 Q5 gives US$800-1 200 against the decided 790-1 190, and V09 §7.3 routes recruitment to the owner (findings V09-J121-1..5, V09-J122-1, V10-J121-1..3)."))
counts=dict(items=len(items),facts=len(items)-len(terms),terms=len(terms),by_volume=byv,
 restatements=len(restatements),restatement_findings=len(cats['restatement_findings']),internal_duplications=len(cats['internal_duplications']),internal_conflicts=len(cats['internal_conflicts']),
 cross_part_conflicts=len(cats['cross_part_conflicts']),broken_references=len(cats['broken_references']),
 broken_reference_instances=dict(V09=dict(unqualified_section_signs=154,unqualified_request_ids_BCR34_BCR14_rows=7,critique_id_as_design_reference_V1C09=2),V10=dict(unqualified_section_signs=116,nonexistent_clerk_json=1)),
 wiring_gaps=len(cats['wiring_gaps']),missing_parts=len(cats['missing_parts']),elegance_candidates=len(cats['elegance_candidates']),deferral_wording=len(cats['deferral_wording']),
 narration=len(cats['narration']),terminology=len(cats['terminology']),handoffs_to_canon=len(cats['handoffs_to_canon']),standing_rule_conflicts=len(cats['standing_rule_conflicts']),undefined_edges=len(cats['undefined_edges']),
 findings_total=len(F),findings_major=sum(1 for f in F if f['severity']=='major'))
out=dict(key='coherence/inventory-vol-V09-V10',unit='volumes V09 (the application: editor, toolkit, shell) and V10 (the clerk: built-in assistant, oracle, host clerk seam)',
 scope='docs/volumes/V09-application.md and docs/volumes/V10-clerk.md, each read completely (every section, decisions, BCRs, XV/CVR requests, owner questions, CONFIRMED/PLAUSIBLE, fix list, integration notes, reconciliation rounds 1-6 with continuations, finalization)',
 source=src,counts=counts,reference_census=ref_census,items=items,terms=[dict(id=t['id'],term=t['statement']) for t in terms],
 restatements=restatements,equivalences=[dict(concept=a,other_names=b,finding=c) for a,b,c in EQUIV],
 **{k:v for k,v in cats.items()},
 g_items_routing=g_routing,
 bcr_to_file_f=json.load(open(SP+'/fmap.json')),
 shrink_estimate=dict(status='PLAUSIBLE',note=("Narration ranges alone are %d of %d words in V09 (%.1f %%) and %d of %d in V10 (%.1f %%). With the inline seam/critique ids, withdrawn decision texts, restated base and sibling values, the quoted catalogue lines and the §1b hooks cells that repeat §2-§4, the goal of 25-40 %% looks reachable without losing a normative item; not measured here."%(
   src['V09']['narration_words'],src['V09']['words'],100*src['V09']['narration_share'],src['V10']['narration_words'],src['V10']['words'],100*src['V10']['narration_share']))))
json.dump(out,open(D+'/validation/coherence/inventory-vol-V09-V10.json','w'),ensure_ascii=False,indent=1)
print(json.dumps(counts,ensure_ascii=False))
