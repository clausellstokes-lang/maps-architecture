import re,glob,os,collections
ROOT='/home/user/maps-architecture/docs'
def heads(text):
    hs=set()
    for l in text.split('\n'):
        m=re.match(r'^#{2,5} (§?)([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)',l)
        if m: hs.add(m.group(2))
        m=re.match(r'^#{2,5} (II\.\d+(?:\.\d+)*)',l)
        if m: hs.add(m.group(1))
        for m in re.finditer(r'^\*\*([0-9]+\.[0-9]+[a-z]?(?:\.[0-9]+)*)',l): hs.add(m.group(1))
    return hs
v11=open(ROOT+'/validation/coherence/new/volumes/V11-content.md',encoding='utf-8').read()
H={'V11':heads(v11)}
for f in glob.glob(ROOT+'/validation/coherence/new/volumes/V*.md'):
    k=os.path.basename(f)[:3]
    if k!='V11': H[k]=heads(open(f,encoding='utf-8').read())
for f in glob.glob(ROOT+'/volumes/V10-*.md'):
    H.setdefault('V10',heads(open(f,encoding='utf-8').read()))
base=''
for f in glob.glob(ROOT+'/validation/coherence/new/base/*/*.md'): base+=open(f,encoding='utf-8').read()+'\n'
HB=heads(base)
def ok(hs,ref):
    r=ref.rstrip('.')
    while r:
        if r in hs: return True
        if '.' not in r: return False
        r=r.rsplit('.',1)[0]
        # require at least top-level match only if original had depth <=2
    return False
bad=collections.Counter()
SEC=r'§((?:II\.)?[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)(?: \([0-9a-z]+\))*(?: step \d+)?'
chains=[]
for m in re.finditer(r'(?<![\w-])(V\d\d)\s'+SEC+r'((?:(?:, |, and | and |–| or )'+SEC+r')*)',v11):
    v=m.group(1); refs=[m.group(2)]+re.findall(SEC,m.group(3))
    chains.append((m.span(),v,refs))
covered=set()
for (a,b),v,refs in chains:
    for i in range(a,b): covered.add(i)
pairs=[(v,r) for _,v,refs in chains for r in refs]
for v,ref in pairs:
    hs=H.get(v)
    if hs is None: bad[(v,ref,'novol')]+=1; continue
    if ref not in hs:
        # accept parent if ref deeper than any heading (e.g. 3.5.1 (c) cited)
        par=ref.rsplit('.',1)[0] if ref.count('.')>=2 else None
        if not (par and par in hs): bad[(v,ref)]+=1
for m in re.finditer(r'(?<![\w§-])(?<!V\d\d )§((?:II\.)?[0-9]+(?:\.[0-9]+[a-z]?)*)',v11):
    if m.start() in covered: continue
    ref=m.group(1)
    if ref not in HB:
        par=ref.rsplit('.',1)[0] if '.' in ref else None
        if not (par and par in HB): bad[('base',ref)]+=1
for k,v in sorted(bad.items()): print(k,v)
print('total bad',sum(bad.values()))
