#!/usr/bin/env python3
# cross-reference census for V03 and V04: resolves base §, volume §, J/T/BCR ids and amendment items
import re,json,glob,os,collections,sys
R='/Users/cstokes/Desktop/Maps/docs'
OUT='/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/v0304'
base=open(f'{R}/ARCHITECTURE.md',encoding='utf-8').read()
rat=open(f'{R}/ARCHITECTURE-RATIONALE.md',encoding='utf-8').read()
bh=set()
for m in re.finditer(r'(?m)^#{2,4} (?:§)?((?:II\.)?\d+(?:\.\d+)*)\b',base): bh.add(m.group(1))
for m in re.finditer(r'(?m)^#{2,4} (II\.\d+(?:\.\d+)*)',base): bh.add(m.group(1))
vols={}
for f in sorted(glob.glob(f'{R}/volumes/V[0-9][0-9]-*.md')):
    k=int(os.path.basename(f)[1:3]); t=open(f,encoding='utf-8').read()
    hs=set()
    for m in re.finditer(r'(?m)^#{2,5} (\d+[a-z]?(?:\.\d+[a-z]?)*)\b',t): hs.add(m.group(1))
    # also bolded sub-numbered paragraphs like **3.7.1 ** or **3.5.0a
    for m in re.finditer(r'\*\*(\d+(?:\.\d+)+[a-z]?)\b',t): hs.add(m.group(1))
    vols[k]=dict(text=t,heads=hs)
integ=open(f'{R}/volumes/_integrate.md',encoding='utf-8').read() if os.path.exists(f'{R}/volumes/_integrate.md') else ''
famd=open(f'{R}/AMENDMENTS-2026-09-28f.md',encoding='utf-8').read(); gamd=open(f'{R}/AMENDMENTS-2026-09-28g.md',encoding='utf-8').read()
fitems=set(int(x) for x in re.findall(r'(?m)^\*\*(\d{3})\.\*\*',famd))
gitems=set(int(x) for x in re.findall(r'(?m)^(1\d\d)\. \*\*',gamd))
allamd=''.join(open(f,encoding='utf-8').read() for f in glob.glob(f'{R}/AMENDMENTS-*.md'))
amitems=set(int(x) for x in re.findall(r'(?m)^\*{0,2}(\d{1,3})\.\*{0,2} ',allamd))
defs=json.load(open(f'{OUT}/defs.json')) if os.path.exists(f'{OUT}/defs.json') else None
def resolve_sec(heads,num):
    num=num.rstrip('.')
    parts=num.split('.')
    for i in range(len(parts),0,-1):
        p='.'.join(parts[:i])
        if p in heads: return p, i==len(parts)
    return None,False
res=collections.defaultdict(list)
for vk,label in ((3,'V03'),(4,'V04')):
    t=vols[vk]['text']; lines=t.split('\n')
    for ln,l in enumerate(lines,1):
        # volume refs
        for m in re.finditer(r'\b(?:(?<![-\w])V0?(\d{1,2}) §|(?<![-\w])V(\d{1,2})-(?=\d+\.)|volume (\d{1,2}) §|volume V0?(\d{1,2}) §)(\d+[a-z]?(?:\.\d+[a-z]?)*)',l):
            tv=int(next(g for g in m.groups()[:4] if g)); num=m.group(5)
            if tv not in vols: res[label].append(dict(kind='vol',ref=m.group(0),line=ln,status='no such volume')); continue
            p,full=resolve_sec(vols[tv]['heads'],num)
            st='ok' if full else ('prefix '+p if p else 'UNRESOLVED')
            res[label].append(dict(kind='vol',ref=m.group(0),line=ln,status=st))
        # base refs: § not preceded by a volume marker
        for m in re.finditer(r'(?<![V\d] )(?<!V\d )(?<!volume \d )(?<!V\d\d )§\s?(\d+(?:\.\d+)*)',l):
            pre=l[max(0,m.start()-12):m.start()]
            if re.search(r'(V0?\d{1,2}|volume \d{1,2}|volume V0?\d{1,2}) $',pre): continue
            num=m.group(1)
            p,full=resolve_sec(bh,num)
            st='ok' if full else ('prefix '+p if p else 'UNRESOLVED')
            res[label].append(dict(kind='base',ref='§'+num,line=ln,status=st))
        for m in re.finditer(r'\bII\.(\d+(?:\.\d+)*)',l):
            num='II.'+m.group(1); p,full=resolve_sec(bh,num)
            res[label].append(dict(kind='base',ref=num,line=ln,status='ok' if full else ('prefix '+p if p else 'UNRESOLVED')))
        # file f items
        for m in re.finditer(r'file f(?:\'s)? items? ((?:\d{3}(?:,? (?:and )?)?)+)',l):
            for n in re.findall(r'\d{3}',m.group(1)):
                res[label].append(dict(kind='fitem',ref='f '+n,line=ln,status='ok' if int(n) in fitems else 'UNRESOLVED'))
        # g items
        for m in re.finditer(r'\bg item (\d{2,3})',l):
            n=int(m.group(1)); res[label].append(dict(kind='gitem',ref='g '+str(n),line=ln,status='ok' if n in gitems or n in amitems else 'UNRESOLVED'))
        # ids
        for m in re.finditer(r'\bJ-V(\d{1,2})\.(\d+)',l):
            v,n=int(m.group(1)),m.group(2)
            ok = v in vols and re.search(r'(?m)^\| J-V'+str(v)+r'\.'+n+r' \|',vols[v]['text']) is not None
            if not ok and v in vols: ok = ('J-V%d.%s |'%(v,n)) in vols[v]['text'] or re.search(r'\*\*J-V%d\.%s\b'%(v,n),vols[v]['text']) is not None
            res[label].append(dict(kind='J',ref=m.group(0),line=ln,status='ok' if ok else 'UNRESOLVED'))
        for m in re.finditer(r'\bJ-VI\.(\d+)',l):
            ok=re.search(r'J-VI\.'+m.group(1)+r'\b',integ) is not None
            res[label].append(dict(kind='J',ref=m.group(0),line=ln,status='ok' if ok else 'UNRESOLVED'))
        for m in re.finditer(r'\bJ-(A\d+\.\d+|P\d+)',l):
            ok=re.search(re.escape(m.group(0))+r'\b',rat) is not None or re.search(re.escape(m.group(0))+r'\b',base) is not None
            res[label].append(dict(kind='J',ref=m.group(0),line=ln,status='ok' if ok else 'UNRESOLVED'))
        for m in re.finditer(r'\bT-V(\d{1,2})-(\d+)',l):
            v,n=int(m.group(1)),m.group(2)
            ok = v in vols and re.search(r'(?m)^\| T-V%d-%s \|'%(v,n),vols[v]['text']) is not None
            if not ok and v in vols: ok=re.search(r'\bT-V%d-%s\b[^\n]{0,3}\|'%(v,n),vols[v]['text']) is not None or re.search(r'\*\*T-V%d-%s\b'%(v,n),vols[v]['text']) is not None
            res[label].append(dict(kind='T',ref=m.group(0),line=ln,status='ok' if ok else 'UNRESOLVED'))
        for m in re.finditer(r'\bT(\d{2,3})-(\d+)\b',l):
            ok=re.search(r'\(T%s-%s\)|\bT%s-%s\b'%(m.group(1),m.group(2),m.group(1),m.group(2)),base) is not None
            res[label].append(dict(kind='Tbase',ref=m.group(0),line=ln,status='ok' if ok else 'UNRESOLVED'))
        for m in re.finditer(r'\bBCR-V(\d{1,2})-(\d+)',l):
            v,n=int(m.group(1)),m.group(2)
            ok = v in vols and re.search(r'\*\*BCR-V%d-%s\b'%(v,n),vols[v]['text']) is not None
            if not ok and v in vols: ok = re.search(r'(?m)^\|? ?\*?\*?BCR-V%d-%s\b'%(v,n),vols[v]['text']) is not None or re.search(r'\bBCR-V%d-%s\b'%(v,n),famd) is not None
            res[label].append(dict(kind='BCR',ref=m.group(0),line=ln,status='ok' if ok else 'UNRESOLVED'))
json.dump(res,open(f'{OUT}/refs.json','w'),indent=0)
for label in res:
    c=collections.Counter((r['kind'],r['status'].split(' ')[0]) for r in res[label])
    print(label,sorted(c.items()))
    un=collections.OrderedDict()
    for r in res[label]:
        if r['status']!='ok': un.setdefault((r['kind'],r['ref'],r['status']),[]).append(r['line'])
    for (k,ref,st),ls in un.items(): print('  ',k,ref,st,ls[:6])
