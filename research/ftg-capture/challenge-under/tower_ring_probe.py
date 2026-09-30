# Under-confidence lane probe (2026-09-25): are FTG wall towers exactly the district-ring vertices, consecutively,
# on BOTH captured payloads, and do they coincide with road-graph nodes? Reuses the critic's stdlib decoder (tools/pb_raw.py).
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
    T=[]
    for _,v in top[7]:
        d=fields(v); pd=fields(one(d,2)); T.append((uv(d,1),(zz(uv(pd,1)),zz(uv(pd,2)))))
    T.sort(); Tpos=dict(T)
    rings={}
    for _,v in top[10]:
        d=fields(v); P=[]
        if 5 in d: sd=fields(one(d,5)); P=pts(one(sd,1))
        if len(P)>1 and P[0]==P[-1]: P=P[:-1]
        rings[one(d,2).decode()]=P
    print('===',name,': towers',len(T),'; districts',len(rings))
    idx=collections.defaultdict(list)
    for n,P in rings.items():
        pos={p:i for i,p in enumerate(P)}
        for tid,tp in T:
            if tp in pos: idx[tid].append((n,pos[tp]))
    unmatched=[tid for tid,_ in T if tid not in idx]
    print(' towers that are an EXACT vertex of some district ring: %d/%d ; unmatched tower ids: %s'%(len(T)-len(unmatched),len(T),unmatched))
    for n,P in rings.items():
        hits=sorted((i,tid) for tid,lst in idx.items() for (rn,i) in lst if rn==n)
        if not hits: continue
        ids=[i for i,_ in hits]; m=len(P)
        gaps=[ids[k+1]-ids[k] for k in range(len(ids)-1)]
        consecutive = all(g==1 for g in gaps) or (sorted(gaps)[:-1]==[1]*(len(gaps)-1))  # allow one cyclic wrap gap
        seg=[math.dist(P[i],P[(i+1)%m])/100 for i in range(m)]
        run=[seg[i] for i in ids[:-1]] if all(g==1 for g in gaps) else []
        print('  ring %-16s verts=%d towers-on-ring=%d ring-indices=%s gaps=%s consecutive=%s'%(n,m,len(ids),ids,gaps,consecutive))
        print('    ring seg (all) m: median %.1f min %.1f max %.1f ; ring seg along tower stretch: %s'%(sorted(seg)[m//2],min(seg),max(seg),('median %.1f min %.1f max %.1f'%(sorted(run)[len(run)//2],min(run),max(run)) if run else 'n/a')))
    for tid in unmatched:
        tp=Tpos[tid]; best=min((math.dist(tp,p)/100,n,i) for n,P in rings.items() for i,p in enumerate(P))
        print('  unmatched tower id %d: nearest ring vertex %.2f m (%s #%d)'%(tid,best[0],best[1],best[2]))
    segs=[math.dist(T[i][1],T[i+1][1])/100 for i in range(len(T)-1)]
    print(' tower chain (by id) seg m: min %.1f med %.1f max %.1f n=%d ; first->last %.1f m'%(min(segs),sorted(segs)[len(segs)//2],max(segs),len(segs),math.dist(T[0][1],T[-1][1])/100))
    R=fields(one(top,3)); nodes={}
    for _,v in R[2]:
        d=fields(v); nid=uv(d,1); pos=(0,0)
        if 2 in d:
            pd=fields(one(d,2)); pos=(zz(uv(pd,1)),zz(uv(pd,2)))
        nodes[nid]=pos
    npos=collections.defaultdict(list)
    for nid,p in nodes.items(): npos[p].append(nid)
    inc=collections.defaultdict(list)
    for _,v in R[1]:
        d=fields(v); a,bb,t=uv(d,2),uv(d,3),uv(d,4); inc[a].append(t); inc[bb].append(t)
    on_node=[tid for tid,tp in T if tp in npos]
    tc=collections.Counter()
    for tid,tp in T:
        for nid in npos.get(tp,[]):
            for t in inc[nid]: tc[t]+=1
    print(' towers coincident with a road-graph node: %d/%d ; edge types incident to those nodes: %s'%(len(on_node),len(T),dict(tc)))
    # ring vertices that are graph nodes, per ring (is the ring itself a road-graph cycle?)
    for n,P in rings.items():
        k=sum(1 for p in P if p in npos); print('  ring %-16s vertices coincident with a road-graph node: %d/%d'%(n,k,len(P)))
