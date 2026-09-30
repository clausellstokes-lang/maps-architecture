# Is wire edge type 7 the wall polyline (stored in the road graph), running along district-ring vertices between towers?
import sys, math, collections
sys.path.insert(0,'tools')
from pb_raw import parse, varint
def zz(u): return (u>>1) ^ -(u&1)
def pv(v):
    i,vs=0,[]
    while i<len(v):
        x,i=varint(v,i); vs.append(x)
    return vs
def fields(v):
    d=collections.defaultdict(list)
    for fn,wt,x in parse(v): d[fn].append((wt,x))
    return d
def one(d,fn,default=None): return d[fn][0][1] if fn in d else default
def uv(d,fn,default=0): return d[fn][0][1] if fn in d else default
def pts(v):
    vs=[zz(x) for x in pv(v)]
    return [(vs[i],vs[i+1]) for i in range(0,len(vs)-1,2)]
for arg in sys.argv[1:]:
    name,path=arg.split('=',1)
    b=open(path,'rb').read(); top=fields(b)
    R=fields(one(top,3)); nodes={}
    for _,v in R[2]:
        d=fields(v); nid=uv(d,1); pos=(0,0)
        if 2 in d:
            pd=fields(one(d,2)); pos=(zz(uv(pd,1)),zz(uv(pd,2)))
        nodes[nid]=pos
    edges=[]
    for _,v in R[1]:
        d=fields(v); edges.append((uv(d,1),uv(d,2),uv(d,3),uv(d,4)))
    T=set()
    for _,v in top[7]:
        d=fields(v); pd=fields(one(d,2)); T.add((zz(uv(pd,1)),zz(uv(pd,2))))
    rings={}
    for _,v in top[10]:
        d=fields(v); P=[]
        if 5 in d: sd=fields(one(d,5)); P=pts(one(sd,1))
        if len(P)>1 and P[0]==P[-1]: P=P[:-1]
        rings[one(d,2).decode()]=P
    ringpos={n:{p:i for i,p in enumerate(P)} for n,P in rings.items()}
    print('===',name)
    for t in sorted(set(e[3] for e in edges)):
        E=[e for e in edges if e[3]==t]
        if t not in (2,7,10): continue
        L=[math.dist(nodes[a],nodes[bb])/100 for _,a,bb,_ in E]
        onring=0; consec=0; touch_tower=0; ringnames=collections.Counter()
        for _,a,bb,_ in E:
            pa,pb=nodes[a],nodes[bb]
            hit=[n for n in rings if pa in ringpos[n] and pb in ringpos[n]]
            if hit:
                onring+=1; ringnames[hit[0]]+=1
                n=hit[0]; m=len(rings[n]); ia,ib=ringpos[n][pa],ringpos[n][pb]
                if (ia-ib)%m in (1,m-1): consec+=1
            if pa in T or pb in T: touch_tower+=1
        print(' type %2d: n=%d total %.0f m median %.1f m ; both endpoints on ONE district ring: %d ; adjacent ring vertices: %d ; edges touching a tower: %d ; rings: %s'%(t,len(E),sum(L),sorted(L)[len(L)//2],onring,consec,touch_tower,dict(ringnames)))
    # tower-chain path length along type-7 edges vs straight chain
    E7=[e for e in edges if e[3]==7]
    adj=collections.defaultdict(list)
    for _,a,bb,_ in E7: adj[a].append(bb); adj[bb].append(a)
    deg=collections.Counter(len(v) for v in adj.values())
    print(' type-7 subgraph: nodes %d, degree hist %s (open chains have exactly two degree-1 ends each)'%(len(adj),dict(sorted(deg.items()))))
    # towers that are type-7 nodes
    tn=sum(1 for nid in adj if nodes[nid] in T)
    print(' towers among type-7 nodes: %d/%d towers ; type-7 nodes that are NOT towers: %d'%(tn,len(T),len(adj)-tn))
    # min distance along chain between consecutive towers (walk each chain)
    ends=[n for n,v in adj.items() if len(v)==1]
    seen=set(); spac=[]
    for s in ends:
        if s in seen: continue
        prev=None; cur=s; acc=0.0; last_t = cur if nodes[cur] in T else None
        if last_t is None: acc=0.0
        while True:
            seen.add(cur)
            nxt=[m for m in adj[cur] if m!=prev]
            if not nxt: break
            m=nxt[0]; acc+=math.dist(nodes[cur],nodes[m])/100
            if nodes[m] in T:
                if last_t is not None: spac.append(acc)
                last_t=m; acc=0.0
            prev,cur=cur,m
    if spac: print(' tower spacing measured ALONG the wall polyline: n=%d min %.1f med %.1f max %.1f m'%(len(spac),min(spac),sorted(spac)[len(spac)//2],max(spac)))
