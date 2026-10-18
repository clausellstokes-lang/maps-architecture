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
def inside(pt,poly):
    x,y=pt; c=False
    for i in range(len(poly)):
        x1,y1=poly[i]; x2,y2=poly[(i+1)%len(poly)]
        if ((y1>y)!=(y2>y)) and (x<(x2-x1)*(y-y1)/(y2-y1+1e-12)+x1): c=not c
    return c
top=fields(b)
R=fields(one(top,3)); edges=[]; nodes={}
for _,v in R[1]:
    d=fields(v); edges.append((uv(d,1),uv(d,2),uv(d,3),uv(d,4)))
for _,v in R[2]:
    d=fields(v); nid=uv(d,1); pos=(0,0)
    if 2 in d: pd=fields(one(d,2)); pos=(zz(uv(pd,1)),zz(uv(pd,2)))
    nodes[nid]=pos
W={}
for _,v in top[6]:
    d=fields(v); W[uv(d,1)]=pts(one(d,2))
br=[]
for _,a,bb,t in edges:
    p,q=nodes[a],nodes[bb]; m=((p[0]+q[0])/2,(p[1]+q[1])/2)
    for wid in (2,3):
        if inside(m,W[wid]): br.append((t,p,q,wid)); break
print('edges whose midpoint lies inside a river polygon:',len(br),'by type',collections.Counter(x[0] for x in br))
# cluster into bridges: group edges whose midpoints are within 25 m of each other
mids=[((x[1][0]+x[2][0])/2,(x[1][1]+x[2][1])/2) for x in br]
groups=[]
for i,m in enumerate(mids):
    for g in groups:
        if any(math.dist(m,mids[j])<2500 for j in g): g.append(i); break
    else: groups.append([i])
cent=[(sum(mids[j][0] for j in g)/len(g),sum(mids[j][1] for j in g)/len(g)) for g in groups]
print('bridge clusters:',len(groups))
for k,(g,c) in enumerate(zip(groups,cent)):
    dn=min(math.dist(c,o) for j,o in enumerate(cent) if j!=k)/100 if len(cent)>1 else 0
    print('  bridge %d at (%.0f,%.0f) m edges=%d types=%s span=%.1f m nearest other bridge %.0f m'%(k,c[0]/100,c[1]/100,len(g),sorted(set(br[j][0] for j in g)),sum(math.dist(br[j][1],br[j][2]) for j in g)/100,dn))
# also edges with an endpoint exactly on the river polygon boundary? count nodes inside river polys
nin=sum(1 for n,p in nodes.items() if inside(p,W[2]) or inside(p,W[3]))
print('road nodes inside river polygons:',nin)
