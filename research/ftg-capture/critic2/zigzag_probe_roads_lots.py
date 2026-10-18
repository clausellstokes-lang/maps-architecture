import sys, math, collections, struct
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
    vs=[zz(x) for x in pv(v)]
    return [(vs[i],vs[i+1]) for i in range(0,len(vs)-1,2)]
def shoelace(p):
    a=0.0
    for i in range(len(p)):
        x1,y1=p[i]; x2,y2=p[(i+1)%len(p)]; a+=x1*y2-x2*y1
    return a/2
top=fields(b)
R=fields(one(top,3)); edges=[]; nodes={}
for _,v in R[1]:
    d=fields(v); edges.append((uv(d,1),uv(d,2),uv(d,3),uv(d,4)))
for _,v in R[2]:
    d=fields(v); nid=uv(d,1); pos=(0,0)
    if 2 in d: pd=fields(one(d,2)); pos=(zz(uv(pd,1)),zz(uv(pd,2)))
    nodes[nid]=pos
inc=collections.defaultdict(list)
for _,a,bb,t in edges: inc[a].append((bb,t)); inc[bb].append((a,t))
# 1) exact-straight deg-2 nodes and sum of lengths
print('1) deg-2 nodes: straight (<0.05 deg) fraction and paired-length sums, per type')
for t in (0,1,4,6,10,14):
    n=0; straight=0; sums=collections.Counter()
    for nd,lst in inc.items():
        if len(lst)!=2: continue
        (n1,t1),(n2,t2)=lst
        if t1!=t or t2!=t: continue
        p,p1,p2=nodes[nd],nodes[n1],nodes[n2]
        v1=(p1[0]-p[0],p1[1]-p[1]); v2=(p2[0]-p[0],p2[1]-p[1])
        if math.hypot(*v1)<1e-9 or math.hypot(*v2)<1e-9: continue
        d=abs(math.degrees(math.atan2(v2[1],v2[0])-math.atan2(v1[1],v1[0])))%360
        if d>180: d=360-d
        dev=180-d; n+=1
        if dev<0.05:
            straight+=1; sums[int(round((math.hypot(*v1)+math.hypot(*v2))/100))]+=1
    print('   type %2d deg2=%4d straight=%4d (%.0f%%)  paired-length modes: %s'%(t,n,straight,100*straight/max(1,n),sums.most_common(5)))
# 2) runs: chain same-type deg-2 straight nodes into runs, measure run lengths
print('2) collinear run lengths (chains through straight deg-2 nodes), per type')
for t in (0,4):
    # build adjacency for type t
    adj=collections.defaultdict(list)
    for _,a,bb,tt in edges:
        if tt==t: adj[a].append(bb); adj[bb].append(a)
    def straight_at(nd):
        if len(inc[nd])!=2: return False
        (n1,t1),(n2,t2)=inc[nd]
        if t1!=t or t2!=t: return False
        p,p1,p2=nodes[nd],nodes[n1],nodes[n2]
        v1=(p1[0]-p[0],p1[1]-p[1]); v2=(p2[0]-p[0],p2[1]-p[1])
        if math.hypot(*v1)<1e-9 or math.hypot(*v2)<1e-9: return False
        d=abs(math.degrees(math.atan2(v2[1],v2[0])-math.atan2(v1[1],v1[0])))%360
        if d>180: d=360-d
        return (180-d)<0.05
    seen=set(); runs=collections.Counter()
    for _,a,bb,tt in edges:
        if tt!=t: continue
        key=(min(a,bb),max(a,bb))
        if key in seen: continue
        # extend both ways through straight nodes
        L=math.dist(nodes[a],nodes[bb]); seen.add(key)
        for start,prev in ((a,bb),(bb,a)):
            cur,pr=start,prev
            while straight_at(cur):
                nxt=[m for m in adj[cur] if m!=pr]
                if not nxt: break
                nx=nxt[0]; k=(min(cur,nx),max(cur,nx))
                if k in seen: break
                seen.add(k); L+=math.dist(nodes[cur],nodes[nx]); pr,cur=cur,nx
        runs[int(round(L/100))]+=1
    print('   type %2d run-length modes (m): %s'%(t,runs.most_common(8)))
# 3) type 12 edges location
print('3) type-12 edges (endpoints, m):')
for _,a,bb,t in edges:
    if t==12: print('   (%.0f,%.0f)-(%.0f,%.0f) len %.1f'%(nodes[a][0]/100,nodes[a][1]/100,nodes[bb][0]/100,nodes[bb][1]/100,math.dist(nodes[a],nodes[bb])/100))
W=[]
for _,v in top[6]:
    d=fields(v); W.append((uv(d,1),pts(one(d,2))))
P=W[0][1]; print('   harbour water id=1 bbox x %.0f..%.0f y %.0f..%.0f'%(min(p[0] for p in P)/100,max(p[0] for p in P)/100,min(p[1] for p in P)/100,max(p[1] for p in P)/100))
# 4) buildings, entrances, alignment, containment
B=[]
for _,v in top[8]:
    d=fields(v); P=pts(one(d,2))
    if len(P)>1 and P[0]==P[-1]: P=P[:-1]
    ent=None
    if 6 in d: ed=fields(one(d,6)); ent=(zz(uv(ed,1)),zz(uv(ed,2)))
    B.append(dict(poly=P,ent=ent,label=one(d,5,b'').decode()))
def centroid(p):
    a=shoelace(p); cx=cy=0
    for i in range(len(p)):
        x1,y1=p[i]; x2,y2=p[(i+1)%len(p)]; cr=x1*y2-x2*y1; cx+=(x1+x2)*cr; cy+=(y1+y2)*cr
    return (cx/(6*a),cy/(6*a)) if abs(a)>1e-9 else (sum(q[0] for q in p)/len(p),sum(q[1] for q in p)/len(p))
C=[centroid(x['poly']) for x in B]
CELL=5000; grid=collections.defaultdict(list); segs=[]
for _,a,bb,t in edges: segs.append((nodes[a],nodes[bb],t))
for i,(p,q,t) in enumerate(segs):
    x0,x1=sorted((p[0],q[0])); y0,y1=sorted((p[1],q[1]))
    for cx in range(x0//CELL,x1//CELL+1):
        for cy in range(y0//CELL,y1//CELL+1): grid[(cx,cy)].append(i)
def seg_dist(pt,a,b):
    ax,ay=a; bx,by=b; dx,dy=bx-ax,by-ay; L2=dx*dx+dy*dy
    if L2==0: return math.dist(pt,a),0.0
    t=max(0,min(1,((pt[0]-ax)*dx+(pt[1]-ay)*dy)/L2)); return math.hypot(pt[0]-(ax+t*dx),pt[1]-(ay+t*dy)),math.atan2(dy,dx)
def nearest(pt):
    cx,cy=int(pt[0])//CELL,int(pt[1])//CELL; best=(1e18,None,None)
    for r in range(0,7):
        for dx in range(-r,r+1):
            for dy in range(-r,r+1):
                if r>0 and max(abs(dx),abs(dy))!=r: continue
                for i in grid.get((cx+dx,cy+dy),()):
                    p,q,t=segs[i]; d,ang=seg_dist(pt,p,q)
                    if d<best[0]: best=(d,ang,t)
        if best[1] is not None and best[0]<=r*CELL: break
    return best
ent_road=[]; ent_edge=[]; setb=[]; vset=[]
for x,c in zip(B,C):
    d,ang,t=nearest(c); setb.append(d/100)
    vset.append(min(nearest(v)[0] for v in x['poly'])/100)
    if x['ent']:
        de,_,_=nearest(x['ent']); ent_road.append(de/100)
        P=x['poly']; ent_edge.append(min(seg_dist(x['ent'],P[i],P[(i+1)%len(P)])[0] for i in range(len(P)))/100)
def med(v): s=sorted(v); return s[len(s)//2]
def p(v,q): s=sorted(v); return s[int(q*len(s))]
print('4) centroid->road median %.2f m p95 %.1f; vertex->road median %.2f m, within 2 m: %.1f%%; entrance->road median %.2f p95 %.2f; entrance->outline median %.3f p95 %.3f'%(med(setb),p(setb,.95),med(vset),100*sum(1 for v in vset if v<=2)/len(vset),med(ent_road),p(ent_road,.95),med(ent_edge),p(ent_edge,.95)))
# lots containment by group
def inside(pt,poly):
    x,y=pt; c=False
    for i in range(len(poly)):
        x1,y1=poly[i]; x2,y2=poly[(i+1)%len(poly)]
        if ((y1>y)!=(y2>y)) and (x<(x2-x1)*(y-y1)/(y2-y1+1e-12)+x1): c=not c
    return c
print('5) building containment per lot group (zz):')
covered=set()
for _,v in top[9]:
    d=fields(v); g=uv(d,1); lots=[]
    for _,lv in d.get(2,[]):
        ld=fields(lv); P=pts(one(ld,2))
        if len(P)>1 and P[0]==P[-1]: P=P[:-1]
        lots.append((P,uv(ld,5)))
    n=0; ids=set()
    for i,c in enumerate(C):
        for P,t5 in lots:
            if len(P)>=3:
                bx=(min(q[0] for q in P),min(q[1] for q in P),max(q[0] for q in P),max(q[1] for q in P))
                if bx[0]<=c[0]<=bx[2] and bx[1]<=c[1]<=bx[3] and inside(c,P): n+=1; ids.add(i); break
    covered|=ids
    ar=sorted(abs(shoelace(P))/1e4 for P,_ in lots if len(P)>=3)
    small=[a for a in ar if a<20000]
    print('   group %2d lots=%4d buildings_in=%4d  9.2.5 set=%s  lots<2ha=%d (median %.0f m2)'%(g,len(lots),n,sorted(set(t for _,t in lots)),len(small),med(small) if small else 0))
print('   buildings inside ANY lot: %d / %d'%(len(covered),len(B)))
# 6) 14-instance groups: dist to nearest road & to plaza lots
D=fields(one(top,11))
for fn in (2,4,5):
    G=[]
    for _,v in D[fn]:
        d=fields(v); pd=fields(one(d,1)); G.append((zz(uv(pd,1)),zz(uv(pd,2))))
    dr=[nearest(g)[0]/100 for g in G]
    print('6) 11.%d dist to road: min %.1f med %.1f max %.1f m ; radius from origin med %.0f m'%(fn,min(dr),med(dr),max(dr),med([math.hypot(*g)/100 for g in G])))
# 7) towers vs district ring vertices
T=[]
for _,v in top[7]:
    d=fields(v); pd=fields(one(d,2)); T.append((uv(d,1),(zz(uv(pd,1)),zz(uv(pd,2)))))
T.sort()
for _,v in top[10]:
    d=fields(v); sd=fields(one(d,5)); P=set(pts(one(sd,1)))
    print('7) towers on district %-15s ring vertices: %d/17'%(one(d,2).decode(),sum(1 for _,p in T if p in P)))
print('   tower chain (m):',[(round(p[0]/100),round(p[1]/100)) for _,p in T])
