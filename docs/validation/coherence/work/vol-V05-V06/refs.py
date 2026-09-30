#!/usr/bin/env python3
# reference census for a volume: python3 refs.py V05  (writes refs-V05.json in this dir)
import re,sys,json,os,collections
D='/Users/cstokes/Desktop/Maps/docs'; W=os.path.dirname(os.path.abspath(__file__))
VOLS={'01':'V01-neighbourhoods.md','02':'V02-buildings.md','03':'V03-interiors.md','04':'V04-underground.md','05':'V05-sky.md','06':'V06-evolution.md','07':'V07-village.md','08':'V08-settlementforge.md','09':'V09-application.md','10':'V10-clerk.md','11':'V11-content.md','12':'V12-calibration.md'}
def secs(path, base=False):
    S=set()
    for l in open(path):
        m=re.match(r'^#{1,6}\s+(§?[0-9IV]+[A-Za-z]?(?:\.[0-9]+[a-z]?)*)\b',l) or re.match(r'^\*\*(§?[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b',l)
        if m:
            t=m.group(1).lstrip('§'); S.add(t)
    return S
BASE=secs(f'{D}/ARCHITECTURE.md',True)
VS={k:secs(f'{D}/volumes/{v}') for k,v in VOLS.items()}
def txt(p): return open(p).read()
ALLTXT={k:txt(f'{D}/volumes/{v}') for k,v in VOLS.items()}
RAT=txt(f'{D}/ARCHITECTURE-RATIONALE.md'); ARCH=txt(f'{D}/ARCHITECTURE.md')
INTEG=txt(f'{D}/volumes/_integrate.md')
AMF=txt(f'{D}/AMENDMENTS-2026-09-28f.md'); AMG=txt(f'{D}/AMENDMENTS-2026-09-28g.md')
AMALL=''.join(txt(f'{D}/{f}') for f in os.listdir(D) if f.startswith('AMENDMENTS'))
OWN=''.join(txt(f'{D}/{f}') for f in os.listdir(D) if f.startswith('OWNER'))
def secok(S,s):
    # accept exact or parent (e.g. 3.19 when 3.19 exists), or first component
    if s in S: return True
    return False
vol=sys.argv[1][1:]; T=ALLTXT[vol]
lines=T.split('\n')
res=collections.OrderedDict(); bad=[]
def add(kind,key,ok,ln,ctx):
    k=(kind,key)
    if k not in res: res[k]={'kind':kind,'ref':key,'ok':ok,'lines':[]}
    if len(res[k]['lines'])<6: res[k]['lines'].append(ln)
    if not ok and len(res[k]['lines'])==1: bad.append((kind,key,ln,ctx[:160]))
chain=re.compile(r'\b(V0\d|V\d{1,2})\)?\s+(§[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*(?:\s*(?:,|–|-|and|to|or)\s*§[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)*)')
v1lab=re.compile(r'(?<![\w-])V(\d{1,2})-(\d+(?:\.\d+)+|\d+(?=[^\d.-]))')
for i,l in enumerate(lines,1):
    spans=[]
    for m in chain.finditer(l):
        pre=m.group(1); n=pre[1:].zfill(2)
        std = (pre==f'V0{n[-1]}' and len(pre)==3) if n!='10' and n!='11' and n!='12' else pre in ('V10','V11','V12')
        own = (n==vol)
        for s in re.findall(r'§([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)',m.group(2)):
            ok = secok(VS.get(n,set()),s)
            add('own' if own else 'vol', f'{pre} §{s}', ok, i, l)
            if not own and not std: add('style', f'{pre} (non-V0n prefix)', False, i, l)
        spans.append(m.span())
    rest=l
    for a,b in reversed(spans): rest=rest[:a]+' '*(b-a)+rest[b:]
    for m in v1lab.finditer(rest):
        n=m.group(1).zfill(2); s=m.group(2)
        add('vol', f'V{m.group(1)}-{s}', secok(VS.get(n,set()),s), i, l)
    rest2=v1lab.sub(lambda m:' '*len(m.group(0)),rest)
    for m in re.finditer(r'(?<![\w-])§([0-9]+(?:\.[0-9]+)*)',rest2):
        s=m.group(1)
        if secok(BASE,s): add('base', f'§{s}', True, i, l)
        elif secok(VS[vol],s): add('ownbare', f'§{s}', False, i, l)
        else: add('base', f'§{s}', False, i, l)
    for m in re.finditer(r'\bII\.(\d+(?:\.\d+)?)',l):
        s='II.'+m.group(1); add('base', s, s in BASE, i, l)
    for m in re.finditer(r'\bJ-V(\d+)\.(\d+)\b',l):
        n=m.group(1).zfill(2); key=f'J-V{m.group(1)}.{m.group(2)}'
        src=ALLTXT.get(n,'')
        ok=bool(re.search(r'\|\s*'+re.escape(key)+r'\s*\|',src)) or bool(re.search(r'\*\*'+re.escape(key)+r'\b',src))
        add('J', key, ok, i, l)
    for m in re.finditer(r'\bJ-VI\.(\d+)\b',l):
        key=f'J-VI.{m.group(1)}'; add('J', key, key in INTEG or key in RAT or key in ARCH, i, l)
    for m in re.finditer(r'\bJ-([AP]\d*\.?\d+)\b',l):
        key=f'J-{m.group(1)}'; add('J', key, key in RAT or key in ARCH, i, l)
    for m in re.finditer(r'\bJ(\d{2,3})\b',l):
        key=f'J{m.group(1)}'; add('J', key, key in RAT or key in ARCH or key in OWN or key in AMALL, i, l)
    for m in re.finditer(r'\bD-(\d+)\b',l):
        key=f'D-{m.group(1)}'; add('D', key, key in ARCH, i, l)
    for m in re.finditer(r'\bT-V(\d+)-(\d+)\b',l):
        n=m.group(1).zfill(2); key=f'T-V{m.group(1)}-{m.group(2)}'
        add('T', key, bool(re.search(r'\*\*'+re.escape(key)+r'\b',ALLTXT.get(n,''))) or (key+' ') in ALLTXT.get(n,'') , i, l)
    for m in re.finditer(r'(?<![\w-])T(\d+)-(\d+)\b',l):
        key=f'T{m.group(1)}-{m.group(2)}'; add('T', key, key in ARCH, i, l)
    for m in re.finditer(r'\bBCR-V(\d+)-(\d+)\b',l):
        n=m.group(1).zfill(2); key=f'BCR-V{m.group(1)}-{m.group(2)}'
        add('BCR', key, ('**'+key) in ALLTXT.get(n,''), i, l)
    for m in re.finditer(r'\b(?:V0?(\d)(?:\'s)? |volume (\d+)\'s )BCR-(\d+)\b',l):
        n=(m.group(1) or m.group(2)).zfill(2); key=f'V{n} BCR-{m.group(3)}'
        add('BCR', key, ('BCR-'+m.group(3)) in ALLTXT.get(n,''), i, l)
    for m in re.finditer(r'file f item (\d+)|\bf items? (\d+)',l):
        k=m.group(1) or m.group(2); add('fitem', k, ('**'+k+'.**') in AMF, i, l)
    for m in re.finditer(r'\bitem (\d{3})\b',l):
        k=m.group(1)
        if int(k)>=200: add('fitem', k, ('**'+k+'.**') in AMF, i, l)
        else: add('gitem', k, ('**'+k+'.**') in AMG or ('**'+k+' ') in AMG or ('\n'+k+'.') in AMG or ('item '+k) in AMG, i, l)
    for m in re.finditer(r'`?((?:docs|research|scratchpad)/[\w./-]+\.(?:md|out|json|txt|py))',l):
        p=m.group(1); full='/Users/cstokes/Desktop/Maps/'+p
        add('file', p, os.path.exists(full), i, l)
out={'volume':'V'+vol,'counts':collections.Counter(r['kind'] for r in res.values()),'unresolved':[r for r in res.values() if not r['ok']],'all':list(res.values())}
json.dump(out,open(f'{W}/refs-V{vol}.json','w'),indent=1,ensure_ascii=False)
print('distinct',dict(out['counts'])); print('unresolved',len(out['unresolved']))
for r in out['unresolved']: print(' ',r['kind'],r['ref'],r['lines'][:4])
