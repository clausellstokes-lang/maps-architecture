import sys, math, collections
sys.path.insert(0,'tools')
from pb_raw import parse, varint
b=open('captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin','rb').read()
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
    vs=[zz(x) for x in pv(v)]; return [(vs[i],vs[i+1]) for i in range(0,len(vs)-1,2)]
top=fields(b)
R=fields(one(top,3)); edges=[]; nodes={}
for _,v in R[1]:
    d=fields(v); edges.append((uv(d,1),uv(d,2),uv(d,3),uv(d,4)))
for _,v in R[2]:
    d=fields(v); nid=uv(d,1); pos=(0,0)
    if 2 in d: pd=fields(one(d,2)); pos=(zz(uv(pd,1)),zz(uv(pd,2)))
    nodes[nid]=pos
W=[]
for _,v in top[6]:
    d=fields(v); W.append((uv(d,1),pts(one(d,2))))
def segint(a,b,c,d):
    def cr(o,p,q): return (p[0]-o[0])*(q[1]-o[1])-(p[1]-o[1])*(q[0]-o[0])
    return (cr(a,b,c)*cr(a,b,d)<0) and (cr(c,d,a)*cr(c,d,b)<0)
# bridges: road edges crossing a river polygon boundary (ids 2,3) at least twice, or edge with both ends outside and crossing
print('A) bridges = road edges that cross a river (id 2/3) boundary')
bridges=[]
for _,a,bb,t in edges:
    p,q=nodes[a],nodes[bb]
    for wid,P in W:
        if wid not in (2,3): continue
        n=0
        for i in range(len(P)-1):
            if segint(p,q,P[i],P[i+1]): n+=1
        if n>=2: bridges.append((t,p,q,wid,n))
print('   bridge edges:',len(bridges),'types',collections.Counter(x[0] for x in bridges))
mids=[((x[1][0]+x[2][0])/2,(x[1][1]+x[2][1])/2) for x in bridges]
for i,m in enumerate(mids):
    dn=min(math.dist(m,o) for j,o in enumerate(mids) if j!=i) if len(mids)>1 else 0
    print('   bridge %2d type %2d river %d mid (%.0f,%.0f) m len %.1f m nearest other bridge %.1f m'%(i,bridges[i][0],bridges[i][3],m[0]/100,m[1]/100,math.dist(bridges[i][1],bridges[i][2])/100,dn/100))
# B) polyline lengths between junction nodes (deg != 2), chaining through any deg-2 node, per type
inc=collections.defaultdict(list)
for _,a,bb,t in edges: inc[a].append((bb,t)); inc[bb].append((a,t))
print('B) junction-to-junction polyline length modes (chain through all deg-2 nodes), per type')
for t in (0,4,6,14):
    adj=collections.defaultdict(list)
    for _,a,bb,tt in edges:
        if tt==t: adj[a].append(bb); adj[bb].append(a)
    seen=set(); runs=collections.Counter(); nseg=collections.Counter()
    for _,a,bb,tt in edges:
        if tt!=t: continue
        key=(min(a,bb),max(a,bb))
        if key in seen: continue
        L=math.dist(nodes[a],nodes[bb]); seen.add(key); k=1
        for start,prev in ((a,bb),(bb,a)):
            cur,pr=start,prev
            while len(inc[cur])==2 and all(x[1]==t for x in inc[cur]):
                nxt=[m for m in adj[cur] if m!=pr]
                if not nxt: break
                nx=nxt[0]; kk=(min(cur,nx),max(cur,nx))
                if kk in seen: break
                seen.add(kk); L+=math.dist(nodes[cur],nodes[nx]); pr,cur=cur,nx; k+=1
        runs[int(round(L/100/5))*5]+=1; nseg[k]+=1
    print('   type %2d runs=%d length modes (5 m bins): %s ; segments-per-run: %s'%(t,sum(runs.values()),runs.most_common(6),sorted(nseg.items())[:8]))
# C) river width estimate
for wid,P in W:
    per=sum(math.dist(P[i],P[i+1]) for i in range(len(P)-1))/100
    a=0
    for i in range(len(P)):
        x1,y1=P[i]; x2,y2=P[(i+1)%len(P)]; a+=x1*y2-x2*y1
    a=abs(a)/2/1e4
    print('C) water id %d: perimeter %.0f m area %.0f m2 -> mean width if ribbon %.1f m'%(wid,per,a,a/(per/2)))
# D) group 8 flags
for _,v in top[9]:
    d=fields(v); g=uv(d,1)
    if g==8:
        f=collections.Counter((uv(fields(lv),4),uv(fields(lv),5)) for _,lv in d.get(2,[]))
        print('D) group 8 (9.2.4,9.2.5) flags:',dict(f))
