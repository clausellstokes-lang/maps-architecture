import re,glob,collections,sys
vols={}
for f in sorted(glob.glob('docs/volumes/V*.md')):
    n=int(f.split('/')[-1][1:3]); vols[n]=open(f,encoding='utf-8').read().split('\n')
keys={}
for n,L in vols.items():
    k=set()
    for l in L:
        m=re.match(r'#{2,6} (?:§)?(\d+[a-z]?(?:\.\d+[a-z]?)*)\b',l)
        if m: k.add(m.group(1))
        m=re.match(r'\s*(?:[-*] )?\*\*(?:§)?(\d+[a-z]?(?:\.\d+[a-z]?)+)[ .*]',l)
        if m: k.add(m.group(1))
    # add prefixes
    for x in list(k):
        parts=x.split('.')
        for i in range(1,len(parts)): k.add('.'.join(parts[:i]))
    keys[n]=k
rx=re.compile(r"\b(?:V0?(\d{1,2})|[Vv]olume (\d{1,2}))(?:'s)?,? §(\d+[a-z]?(?:\.\d+[a-z]?)*)")
bad=collections.defaultdict(list)
for n,L in vols.items():
    for i,l in enumerate(L):
        for m in rx.finditer(l):
            t=int(m.group(1) or m.group(2)); s=m.group(3).rstrip('.')
            if t<1 or t>12: continue
            if s not in keys[t]:
                bad[(n,t,s)].append(i+1)
F=open('docs/AMENDMENTS-2026-09-28f.md',encoding='utf-8').read().split('\n')
for i,l in enumerate(F):
    for m in rx.finditer(l):
        t=int(m.group(1) or m.group(2)); s=m.group(3).rstrip('.')
        if 1<=t<=12 and s not in keys[t]: bad[('f',t,s)].append(i+1)
for (a,t,s),ls in sorted(bad.items(),key=lambda x:(str(x[0][0]),x[0][1],x[0][2])):
    print(f"{a}\tV{t:02d}\t§{s}\t{len(ls)}\t{ls[:6]}")
