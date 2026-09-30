import json,re,sys,os,glob,hashlib,collections
sys.path.insert(0,os.path.dirname(__file__))
from findings import *
ROOT='/Users/cstokes/Desktop/Maps'
W=f'{ROOT}/docs/validation/coherence/work/kernel'
items=[json.loads(l) for l in open(f'{W}/items.jsonl') if l.strip()]
km=json.load(open(f'{W}/keymap.json'))
def res(r):
    if not r.startswith('@'): return r
    k=r.split()[0]; rest=r[len(k):].strip()
    v=km.get(k,k)
    return v+((' ('+rest+')') if rest else '')
for it in items:
    if it['id'] in WARN_FIX:
        it['reads']=WARN_FIX[it['id']]['reads']; it['used_by']=WARN_FIX[it['id']]['used_by']; it.pop('provisional_producer',None)
    it['reads']=[x for x in (res(r) for r in it['reads']) if x!=it['id']]; it['used_by']=[x for x in (res(r) for r in it['used_by']) if x!=it['id']]
    if isinstance(it.get('summary_of'),list): it['summary_of']=[res(r) for r in it['summary_of']]
# outside mentions for identifier-like keys
A=open(f'{ROOT}/docs/ARCHITECTURE.md',encoding='utf-8').read().split('\n')
heads=[]
for i,l in enumerate(A):
    m=re.match(r'^(#{2,3}) (.*)',l)
    if m: heads.append((i,m.group(2)[:40]))
def secof(i):
    h=None
    for j,t in heads:
        if j<=i: h=t
        else: break
    t=(h or '').split(' ')[0]
    return t if (t.startswith('§') or t.startswith('II') or not t) else '§'+t
vols={}
for f in sorted(glob.glob(f'{ROOT}/docs/volumes/V[0-9][0-9]-*.md')):
    vols[os.path.basename(f)[:3]]=open(f,encoding='utf-8').read()
S3a,S3b=2451,3679
ident=re.compile(r'^[A-Za-z_][A-Za-z0-9_.]*$')
skip={'kernel','transaction','lattice','overlay','arena','region','footprint','band','kerb','chunk','block','frame','route','run','level','scope','release','resolve','hull','buffer','orient','signature','skeleton','simplify','warp','batch','partition','grid','antenna','sliver','residue','chamber','oracle','accelerator','spine','roof','regions','knot','profile','stretch','slide','cut','Frame'}
def mentions(k):
    pat=re.compile(r'(?<![A-Za-z0-9_])'+re.escape(k)+r'(?![A-Za-z0-9_])')
    secs=collections.OrderedDict()
    for i,l in enumerate(A):
        if S3a<=i<S3b: continue
        if pat.search(l): secs[secof(i)]=1
    vv=[v for v,t in vols.items() if pat.search(t)]
    return list(secs)[:25],vv
cache={}
for it in items:
    ks=[k for k in it.get('keys',[]) if ident.match(k) and k not in skip and (re.search(r'[A-Z_]',k) or len(k)>=8)]
    base=[];vv=[]
    for k in ks:
        if k not in cache: cache[k]=mentions(k)
        b,v=cache[k]
        base+= [x for x in b if x not in base]; vv+=[x for x in v if x not in vv]
    if ks: it['outside_mentions']={'keys':ks,'base_sections':base,'volumes':vv}
RESTATE=[
('KERNEL-0013','§4.9','wood-edge thinning rule'),('KERNEL-0059','§12.2 / §1.1','population cap 120 000 and 153.6 km² cap area'),
('KERNEL-0079','§1.1 ladder table','rung frame areas TOWN 4 / CITY 25 / METROPOLIS 64 km²'),('KERNEL-0081','§2.2 rule 1','margin and border chains'),
('KERNEL-0061','§2.2 LatticeSpec','minEdge 25 cm value (LatticeSpec.minEdgeCm)'),('KERNEL-0062','§2.2 LatticeSpec','attractCm 26 cm value'),('KERNEL-0063','§2.2 LatticeSpec','minFaceAngle 500 cdeg value'),
('KERNEL-0090','§2.3 (terrain resolution paragraph)','raster extension by whole cells keeping cellCm (stated in both)'),('KERNEL-0093','§2.3','raster cell sizes (TOWN 5 m; METROPOLIS 10 m)'),
('KERNEL-0123','§12.4 S10 (0) row','step (0) rebuild about 2.3 ms for about 9 000 items'),('KERNEL-0125','§12.4 merge row / §12.8','copy <= about 15 MB, about 1.5 ms each'),('KERNEL-0132','§12.4 merge row','8 ms merge of about 200 000 records'),
('KERNEL-0129','§2.7 / §4.9','avenue and street-tree rows are Greenery.along records in half-corridor strips'),('KERNEL-0265','§11','GeoJSON area ring omits antennae'),
('KERNEL-0302','§8.1 (5)','roof cache key (entity, content revision, roof construction)'),('KERNEL-0309','§2.6 BaseWing.ridgeAxis','ridgeAxis definition for rect and quad'),
('KERNEL-0207','§2.6 stage-3 contract','the list of fixed rings (stair bay, chimney stack, passage room, composer rooms)'),('KERNEL-0221','§2.6 re-cut rule','the rings a re-cut fixes'),
('KERNEL-0346','§2.6 plan rung steps 4 and 6','storey extents the seed rings tile'),('KERNEL-0350','§2.5 Passage / §4.7 S10 (9)','passage face construction'),('KERNEL-0351','§2.5 Passage.sealed / §4.6','sealed passage bit'),
('KERNEL-0268','§7.2','every finer face under a locked or pinned entity is a fixed input'),('KERNEL-0167','§7.4 / §2.6','partial list of records recordCheck covers (§7.4 adds composition rings, plan points, tower centres, basement ring)'),
('KERNEL-0275','§7.4 / §2.6 rule 4','held point records and the building check restated in the whole-step validation'),
('KERNEL-0225','§4.6 / §5.2 F-CUT','bent-cut recursion bound and ladder restated in the §3.5 table'),('KERNEL-0231','§4.6 step 8','bent-cut declared ladder restated in the §3.5 table'),
('KERNEL-0298','§4 stage list','the stages that read booleans, buffers, insets or bands (S1, S3, S8, S9, S10 (0), S11, S12b) listed in the fallback'),
]
restatements=[dict(item=a,canonical_home=b,fact=c) for a,b,c in RESTATE]
INTERNAL_DUP=['regularFit degenerate contract: §3.1 row, E_DEGENERATE comment, §3.4','OBB/hull GEO-7 contract: §3.1 row and E_DEGENERATE comment','absorbSliver semantics: §3.4 comment and §3.6','E_KEPT/kept content: §3.3, §3.6 attraction obstacles, §3.7 kerb','moves keep nothing: §3.3 KernelTx comment, §3.3 kept content, §3.6','placement bound: §3.3 route box, §3.6, §3.10 row','max(256, 1/4 static size): §3.3 pool step 1 and rebuild moment (2)','the doors (insertChain only door): §3.4 and §2.2 rule 4','§3.5 table restating §3.1-§3.10','transient-arena batch fields: §3.3 and §3.4']
terms=[it for it in items if it['kind']=='term']
kinds=collections.Counter(it['kind'] for it in items)
src=dict(file='docs/ARCHITECTURE.md',lines='2452-3679',md5=hashlib.md5(open(f'{ROOT}/docs/ARCHITECTURE.md','rb').read()).hexdigest(),words=23820,kb=141.7)
refcensus=json.load(open('/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/kernel/refs.json')) if os.path.exists('/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/kernel/refs.json') else {'refs':[]}
rc=collections.Counter(r['kind'] for r in refcensus['refs'])
out=dict(key='coherence/inventory-kernel',unit='kernel',scope='base part §3 geometry kernel (top-level heading "## §3 Geometry kernel")',source=src,
 counts=dict(items=len(items),facts=len(items)-len(terms),by_kind=dict(kinds),terms=len(terms),restatements_cross_part=len(restatements),internal_duplications=len(INTERNAL_DUP),internal_conflicts=len(INTERNAL_CONFLICTS),cross_part_conflicts=len(CROSS_CONFLICTS),broken_references=len(BROKEN_REFS),wiring_gaps=len(WIRING_GAPS)),
 reference_census=dict(distinct_by_kind=dict(rc),method='every §x.y, II.x, J-, D-, item, finding id, bench id, milestone, ladder and file reference in §3 extracted by script; section-level: all resolve; deep qualifiers (rule n, step n, (n), S10 (n), batch (n), rows, named tests) checked against the target text; J ids all present in ARCHITECTURE-RATIONALE.md and the Judgment-calls index; items 9, 12, 18, 28 (f), 30 (e), 31, 45, 65, 81 (b) present in the amendments files; every cited bench/validation/research file exists'),
 items=items,restatements=restatements,internal_duplications=INTERNAL_DUP,internal_conflicts=INTERNAL_CONFLICTS,cross_part_conflicts=CROSS_CONFLICTS,broken_references=BROKEN_REFS,wiring_gaps=WIRING_GAPS,elegance_candidates=ELEGANCE,edges_observed=EDGES_OBSERVED)
json.dump(out,open(f'{ROOT}/docs/validation/coherence/inventory-kernel.json','w'),ensure_ascii=False,indent=1)
print(json.dumps(out['counts'],indent=0))
