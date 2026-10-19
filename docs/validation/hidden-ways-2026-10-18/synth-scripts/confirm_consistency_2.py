# confirm-consistency-2: files w and x as applied, read-only (python3 -I)
import json, re, hashlib, subprocess
R='/home/user/maps-architecture/'; D=R+'docs/'; HW=D+'validation/hidden-ways-2026-10-18/'
P={'V13':D+'volumes/V13-world.md','V14':D+'volumes/V14-sites.md','HRQ':D+'HOST-REQUIREMENTS-2026-10-18.md',
   'INDEX':D+'volumes/INDEX.md','SUMMARY':D+'volumes/SUMMARY.md','FULL':D+'ARCHITECTURE-FULL.md'}
T={k:open(v).read() for k,v in P.items()}; L={k:v.split('\n') for k,v in T.items()}
md5={k:hashlib.md5(open(v,'rb').read()).hexdigest()[:8] for k,v in P.items()}
fw=json.load(open(HW+'draft-w.fragments.json')); fx=json.load(open(HW+'draft-x.fragments.json'))
news=' '.join(f['new'] for f in fw+fx)
n=[0]; fails=[]
def ok(c,msg):
    n[0]+=1
    if not c: fails.append(msg)
def cnt(k,rx): r=re.compile(rx); return [i+1 for i,l in enumerate(L[k]) if r.search(l)]
def once(kind,k,rx,want=1):
    h=cnt(k,rx); ok(len(h)==want, f'{kind}: {len(h)} defs in {k} at {h[:6]} want {want}'); return h
# 1 ids
ids=0
ts=set(re.findall(r'T-V13-(\d+)',news))
for a,b in re.findall(r'T-V13-(\d+) ?[–-] ?(?:T-V13-)?(\d+)',news): ts|={str(x) for x in range(int(a),int(b)+1)}
for t in sorted(ts,key=int): once('T-V13-'+t,'V13',r'^\| T-V13-%s \|'%t); ids+=1
js=set(re.findall(r'J-V13\.(\d+)',news))
for a,b in re.findall(r'J-V13\.(\d+) ?[–-] ?(?:J-V13\.)?(\d+)',news): js|={str(x) for x in range(int(a),int(b)+1)}
for j in sorted(js,key=int): once('J-V13.'+j,'V13',r'^\| J-V13\.%s \|'%j); ids+=1
for h in sorted(set(re.findall(r'\bH(\d+)\b',news)),key=int): once('H'+h,'V13',r'^\| H%s \|'%h); ids+=1
once('H32(HRQ)','HRQ',r'^\| H32 \|',2); ids+=1
for w in sorted(set(re.findall(r'W_(?:TROD|ROUTE_JUNCTION)_[A-Z_]+',news))): once(w,'V13',r'^\| [^|]*`%s`'%w); ids+=1
once('WORLD-18','V13',r'`WORLD-18` W7 \(13\)'); ids+=1
for b in sorted(set(re.findall(r'BCR-V13-(\d+)',news)),key=int): once('BCR-V13-'+b,'V13',r'^\*\*BCR-V13-%s —'%b); ids+=1
for b in sorted(set(re.findall(r'BCR-V14-(\d+)',news)),key=int): once('BCR-V14-'+b,'V14',r'^\| \*\*BCR-V14-%s\*\*'%b); ids+=1
# whole-volume duplicate scan
for k,rx in [('V13',r'^\| (T-V13-\d+) \|'),('V13',r'^\| (J-V13\.\d+) \|'),('V13',r'^\| (H\d+) \|'),('V13',r'^\*\*(BCR-V13-\d+) —'),('V14',r'^\| \*\*(BCR-V14-\d+)\*\*')]:
    c={}
    for l in L[k]:
        m=re.search(rx,l)
        if m: c[m.group(1)]=c.get(m.group(1),0)+1
    d=[x for x,v in c.items() if v>1]; ok(not d, f'duplicates {rx}: {d}'); ids+=1
print('ids', ids)
# 2 items
AW=open(D+'AMENDMENTS-2026-10-18w.md').read(); AX=open(D+'AMENDMENTS-2026-10-18x.md').read(); DX=open(HW+'draft-x.md').read()
for i in range(955,976): ok(len(re.findall(r'^\*\*%d\.\*\*'%i,AW,re.M))==1, f'item {i} not once in w')
for i in range(976,983):
    ok(len(re.findall(r'^\*\*%d\.\*\*'%i,AX,re.M))==1, f'item {i} not once in x')
    ok(len(re.findall(r'^\*\*%d\.\*\*'%i,DX,re.M))==1, f'item {i} not once in draft-x')
ok(not re.search(r'^\*\*(9[0-5]\d|98[3-9]|99\d)\.\*\*',AX,re.M), 'x has an item outside 976-982')
ix=AX[AX.index('## The items'):]; dx=DX[DX.index('## The items'):]
ok(ix==dx, 'x items != draft-x items'); print('items equal bytes', len(ix), ix==dx)
for i in set(re.findall(r'\bitems? (\d{3})\b',' '.join(f['new'] for f in fx))):
    i=int(i); fs=[f for f in __import__('glob').glob(D+'AMENDMENTS-*.md') if re.search(r'^\*\*%d\.\*\*'%i,open(f).read(),re.M)]
    ok(len(fs)==1, f'item {i} defined in {len(fs)} amendments files'); print('cited item',i,[f.split('/')[-1] for f in fs])
# 3 x fragments as they stand
for f in fx:
    k={'V13-world.md':'V13','HOST-REQUIREMENTS-2026-10-18.md':'HRQ','INDEX.md':'INDEX','SUMMARY.md':'SUMMARY'}[f['file'].split('/')[-1]]
    ok(T[k].count(f['new'])==1, f"{f['id']} new count {T[k].count(f['new'])}")
    oc=T[k].count(f['old']); inn=f['new'].count(f['old'])
    ok(oc==inn*T[k].count(f['new']) , f"{f['id']} old left outside new ({oc})")
    if k in ('V13','INDEX'): ok(T['FULL'].count(f['new'])==1, f"{f['id']} new not once in bundle (bundle sources: base, INDEX, V01-V14)")
# 4 § refs in x new texts on V13
heads=[l for l in L['V13'] if re.match(r'^#+ |^\*\*\d',l)]
for f in fx:
    if 'V13' not in f['file']: continue
    for s in set(re.findall(r'§(\d+(?:\.\d+)*)',f['new'])):
        hit=[h for h in heads if re.match(r'^#+ %s\b|^\*\*%s\b'%(re.escape(s),re.escape(s)),h)]
        ok(bool(hit) or s=='16', f"{f['id']} §{s} unresolved"); print('§',s,f['id'],len(hit))
print('checked',n[0],'failures',len(fails))
for x in fails: print('FAIL',x)
print(md5)
