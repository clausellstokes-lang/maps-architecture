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
def seg_dist(pt,a,b):
    ax,ay=a; bx,by=b; dx,dy=bx-ax,by-ay; L2=dx*dx+dy*dy
    if L2==0: return math.dist(pt,a)
    t=max(0,min(1,((pt[0]-ax)*dx+(pt[1]-ay)*dy)/L2)); return math.hypot(pt[0]-(ax+t*dx),pt[1]-(ay+t*dy))
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
# water boundary segments for distance
wsegs=[(W[k][i],W[k][i+1],k) for k in W for i in range(len(W[k])-1)]
# suburb lots (group 18) edges set for matching
lot_edges=set()
for _,v in top[9]:
    d=fields(v); g=uv(d,1)
    if g not in (18,2,8): continue
    for _,lv in d.get(2,[]):
        P=pts(one(fields(lv),2))
        for i in range(len(P)-1): lot_edges.add((P[i],P[i+1])); lot_edges.add((P[i+1],P[i]))
print('type-14 edge classification (n=%d):'%sum(1 for e in edges if e[3]==14))
cls=collections.Counter(); onwater=0
for _,a,bb,t in edges:
    if t!=14: continue
    p,q=nodes[a],nodes[bb]; m=((p[0]+q[0])/2,(p[1]+q[1])/2)
    inriver=inside(m,W[2]) or inside(m,W[3])
    dsea=min(seg_dist(m,s[0],s[1]) for s in wsegs if s[2]==4)
    dharb=min(seg_dist(m,s[0],s[1]) for s in wsegs if s[2]==1)
    onlot=(p,q) in lot_edges
    # distance of endpoints to water boundary vertices
    dv=min(min(math.dist(p,w),math.dist(q,w)) for k in W for w in W[k])
    if inriver: cls['inside river polygon']+=1
    elif dsea<300: cls['within 3 m of sea boundary']+=1
    elif dharb<300: cls['within 3 m of harbour boundary']+=1
    elif onlot: cls['coincides with a lot edge']+=1
    else: cls['other']+=1
    if dv<100: onwater+=1
print('  ',dict(cls),'; endpoints within 1 m of a water vertex:',onwater)
# for type 14 edges inside rivers: are the endpoints exactly water polygon vertices?
ex=0; n=0
for _,a,bb,t in edges:
    if t!=14: continue
    p,q=nodes[a],nodes[bb]; m=((p[0]+q[0])/2,(p[1]+q[1])/2)
    if inside(m,W[2]) or inside(m,W[3]):
        n+=1
        allv=set(W[2])|set(W[3])
        if p in allv and q in allv: ex+=1
print('   type-14 inside river: %d; both endpoints are exact river-polygon vertices: %d'%(n,ex))
print('type-3 edges:')
for _,a,bb,t in edges:
    if t==3:
        p,q=nodes[a],nodes[bb]; print('   (%.0f,%.0f)-(%.0f,%.0f) len %.0f m'%(p[0]/100,p[1]/100,q[0]/100,q[1]/100,math.dist(p,q)/100))
# 'other' type-14 edges: where? bbox and nearest building distance
B=[]
for _,v in top[8]:
    d=fields(v); P=pts(one(d,2)); B.append(P)
cent=[(sum(p[0] for p in P)/len(P),sum(p[1] for p in P)/len(P)) for P in B]
oth=[]
for _,a,bb,t in edges:
    if t!=14: continue
    p,q=nodes[a],nodes[bb]; m=((p[0]+q[0])/2,(p[1]+q[1])/2)
    if inside(m,W[2]) or inside(m,W[3]): continue
    dsea=min(seg_dist(m,s[0],s[1]) for s in wsegs if s[2]==4)
    if dsea<300: continue
    db=min(math.dist(m,c) for c in cent)/100
    oth.append((m,db,math.dist(p,q)/100))
if oth:
    print('   other type-14: n=%d nearest-building median %.0f m; bbox x %.0f..%.0f y %.0f..%.0f; length median %.0f m'%(len(oth),sorted(o[1] for o in oth)[len(oth)//2],min(o[0][0] for o in oth)/100,max(o[0][0] for o in oth)/100,min(o[0][1] for o in oth)/100,max(o[0][1] for o in oth)/100,sorted(o[2] for o in oth)[len(oth)//2]))
# type 6: distance to nearest building and typical location
t6=[]
for _,a,bb,t in edges:
    if t!=6: continue
    p,q=nodes[a],nodes[bb]; m=((p[0]+q[0])/2,(p[1]+q[1])/2); t6.append(min(math.dist(m,c) for c in cent)/100)
print('type-6 nearest-building distance: median %.0f m p10 %.0f p90 %.0f'%(sorted(t6)[len(t6)//2],sorted(t6)[len(t6)//10],sorted(t6)[9*len(t6)//10]))
