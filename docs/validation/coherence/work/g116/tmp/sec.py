import re,sys
P=re.compile(r'material|timber|stone|brick|rubble|ashlar|thatch|slate|\btiles?\b|tiled|wattle|\bcob\b|adobe|quarr|clay|kiln|sawmill|lumber|trade|import',re.I)
f=sys.argv[1]
lines=open(f).read().split('\n')
cur=None;counts={}
order=[]
for i,l in enumerate(lines,1):
    if l.startswith('#'):
        cur=(i,l.strip()[:110])
    if P.search(l) and not l.startswith('#'):
        if cur not in counts: counts[cur]=0; order.append(cur)
        counts[cur]+=1
    elif P.search(l) and l.startswith('#'):
        if cur not in counts: counts[cur]=0; order.append(cur)
        counts[cur]+=1
for c in order:
    print(c[0] if c else 0, counts[c], c[1] if c else '')
