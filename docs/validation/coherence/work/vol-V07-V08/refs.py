#!/usr/bin/env python3
# cross-reference census for one volume: volume refs, base refs, f/g items, ids
import re,sys,json,os,glob,collections
ROOT='/Users/cstokes/Desktop/Maps/docs'
vol=sys.argv[1]  # e.g. V07
path=glob.glob(f'{ROOT}/volumes/{vol}-*.md')[0]
txt=open(path).read().split('\n')
def heads(p):
    S=set()
    for l in open(p):
        m=re.match(r'^#+\s+(?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b',l)
        if m: S.add(m.group(1))
        m=re.match(r'^#+\s+(II\.[0-9]+(?:\.[0-9]+)*)',l)
        if m: S.add(m.group(1))
    return S
VH={}
for p in glob.glob(f'{ROOT}/volumes/V[0-9][0-9]-*.md'):
    v=os.path.basename(p)[:3]; VH[v]=heads(p)
BH=heads(f'{ROOT}/ARCHITECTURE.md')
# f items and g items
fi=set(int(m) for m in re.findall(r'^\*\*([0-9]{3})\.\*\*',open(f'{ROOT}/AMENDMENTS-2026-09-28f.md').read(),re.M))
gtxt=open(f'{ROOT}/AMENDMENTS-2026-09-28g.md').read()
gi=set(int(m) for m in re.findall(r'^(?:#+\s*)?\*{0,2}(?:Item\s+)?([0-9]{3})[\.\s—]',gtxt,re.M))
out=collections.defaultdict(list)
def norm_vol(s):
    s=s.replace('volume ','V').replace('Volume ','V')
    m=re.match(r'V0?([0-9]{1,2})',s); return 'V%02d'%int(m.group(1))
volref=re.compile(r'\b(?:V0?([1-9]|1[0-2])|[Vv]olume ([1-9]|1[0-2]))(?:\'s)? §\s?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)')
for i,l in enumerate(txt,1):
    for m in volref.finditer(l):
        v='V%02d'%int(m.group(1) or m.group(2)); sec=m.group(3).rstrip('.')
        ok = sec in VH.get(v,set()) or any(h.startswith(sec+'.') for h in VH.get(v,set()))
        # allow a parent match (e.g. §3.19.2 when only §3.19 is a heading)
        par=sec
        while not ok and '.' in par:
            par=par.rsplit('.',1)[0]; ok = par in VH.get(v,set())
        out['volref'].append((i,v,sec,'ok' if ok else ('parent-only' if False else 'UNRESOLVED')))
    for m in re.finditer(r'file f(?:\'s)? items? ([0-9]{3})',l):
        n=int(m.group(1)); out['fitem'].append((i,n,'ok' if n in fi else 'UNRESOLVED'))
    for m in re.finditer(r'\bT-V[0-9]{1,2}-[0-9]+\b',l): out['testref'].append((i,m.group(0)))
    for m in re.finditer(r'\bJ-V[0-9]{1,2}\.[0-9]+\b',l): out['jref'].append((i,m.group(0)))
    for m in re.finditer(r'\b(?:SS|ST|SR[0-9]|TR|TT|TU|TV|TW|TX|SCC|V[0-9]{1,2}C|C[0-9]{1,2}|I110R|SCC-R[0-9]C)-[0-9A-Za-z]+',l): out['critique'].append((i,m.group(0)))
json.dump(out,open(f'/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/v0708/refs-{vol}.json','w'))
vr=[x for x in out['volref'] if x[3]!='ok']
print('volume refs',len(out['volref']),'unresolved',len(vr))
for x in vr[:60]: print('  UNRES',x)
fr=[x for x in out['fitem'] if x[2]!='ok']
print('f item refs',len(out['fitem']),'unresolved',fr[:20])
print('critique-id citations',len(out['critique']),'distinct',len(set(x[1] for x in out['critique'])))
print('f items known',min(fi),max(fi),len(fi))
