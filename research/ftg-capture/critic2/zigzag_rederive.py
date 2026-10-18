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
MODE=sys.argv[1] if len(sys.argv)>1 else 'zz'
dec=(lambda u:zz(u)) if MODE=='zz' else (lambda u:u)
def pts(v):
    vs=[dec(x) for x in pv(v)]
    return [(vs[i],vs[i+1]) for i in range(0,len(vs)-1,2)]
def shoelace(p):
    a=0.0
    for i in range(len(p)):
        x1,y1=p[i]; x2,y2=p[(i+1)%len(p)]; a+=x1*y2-x2*y1
    return a/2
top=fields(b)
print('MODE',MODE)
# roads
R=fields(one(top,3))
edges=[]
for _,v in R[1]:
    d=fields(v); edges.append((uv(d,1),uv(d,2),uv(d,3),uv(d,4)))
nodes={}
for _,v in R[2]:
    d=fields(v); nid=uv(d,1); pos=(0,0)
    if 2 in d:
        pd=fields(one(d,2)); pos=(dec(uv(pd,1)),dec(uv(pd,2)))
    nodes[nid]=pos
print('edges',len(edges),'nodes',len(nodes))
xs=[p[0] for p in nodes.values()]; ys=[p[1] for p in nodes.values()]
print('node bbox m: x %.1f..%.1f y %.1f..%.1f'%(min(xs)/100,max(xs)/100,min(ys)/100,max(ys)/100))
deg=collections.Counter()
for _,a,bb,_t in edges: deg[a]+=1; deg[bb]+=1
dh=collections.Counter(deg.get(n,0) for n in nodes)
print('degree hist',dict(sorted(dh.items())))
L=collections.defaultdict(list); tot=0
for _,a,bb,t in edges:
    l=math.dist(nodes[a],nodes[bb])/100; L[t].append(l); tot+=l
print('total road length km %.1f'%(tot/1000))
for t in sorted(L):
    c=collections.Counter(int(round(x)) for x in L[t]); s=sorted(L[t])
    print('  type %2d n=%5d median=%.1f m modes(1m bins): %s'%(t,len(L[t]),s[len(s)//2],c.most_common(6)))
# deg-2 turn angles per type
inc=collections.defaultdict(list)
for _,a,bb,t in edges: inc[a].append((bb,t)); inc[bb].append((a,t))
per=collections.defaultdict(list)
for n,lst in inc.items():
    if len(lst)!=2: continue
    (n1,t1),(n2,t2)=lst; p,p1,p2=nodes[n],nodes[n1],nodes[n2]
    v1=(p1[0]-p[0],p1[1]-p[1]); v2=(p2[0]-p[0],p2[1]-p[1])
    if math.hypot(*v1)<1e-9 or math.hypot(*v2)<1e-9: continue
    d=abs(math.degrees(math.atan2(v2[1],v2[0])-math.atan2(v1[1],v1[0])))%360
    if d>180: d=360-d
    if t1==t2: per[t1].append(180-d)
for t in sorted(per):
    v=[x for x in per[t] if x<45]; c=collections.Counter(int(x) for x in v)
    print('  turn type %2d n<45=%4d  max<45=%.2f  bins 12..18: %s  >=45: %d'%(t,len(v),max(v) if v else 0,{k:c.get(k,0) for k in range(12,19)},len(per[t])-len(v)))
# junction arm angles
ixa=[]
for n,lst in inc.items():
    if len(lst)<3: continue
    p=nodes[n]; angs=sorted(math.degrees(math.atan2(nodes[m][1]-p[1],nodes[m][0]-p[0]))%360 for m,_ in lst)
    for i in range(len(angs)): ixa.append((angs[(i+1)%len(angs)]-angs[i])%360)
s=sorted(ixa); print('junction arm angle p50 %.2f (n=%d); 80-100 band %.1f%%'%(s[len(s)//2],len(s),100*sum(1 for x in ixa if 80<=x<=100)/len(ixa)))
# headings
dirs=collections.Counter()
for _,a,bb,t in edges:
    dx=nodes[bb][0]-nodes[a][0]; dy=nodes[bb][1]-nodes[a][1]
    if dx or dy: dirs[int(math.degrees(math.atan2(dy,dx))%180)//10*10]+=1
print('heading bins %:',[round(100*dirs[k]/len(edges),1) for k in sorted(dirs)])
# buildings
B=[]
for _,v in top[8]:
    d=fields(v); P=pts(one(d,2)); 
    if len(P)>1 and P[0]==P[-1]: P=P[:-1]
    ent=None
    if 6 in d:
        ed=fields(one(d,6)); ent=(dec(uv(ed,1)),dec(uv(ed,2)))
    B.append(dict(poly=P,cat=uv(d,4),label=one(d,5,b'').decode(),ent=ent,f8=uv(d,8),f9=uv(d,9)))
print('buildings',len(B),'vertex hist',dict(sorted(collections.Counter(len(x['poly']) for x in B).items())))
areas=sorted(abs(shoelace(x['poly']))/1e4 for x in B)
print('footprint m2: mean %.1f median %.1f p5 %.0f p95 %.0f max %.0f total %.0f'%(sum(areas)/len(areas),areas[len(areas)//2],areas[int(.05*len(areas))],areas[int(.95*len(areas))],areas[-1],sum(areas)))
# quad sides
sides=[]; worst=[]
for x in B:
    P=x['poly']
    if len(P)!=4: continue
    for i in range(4): sides.append(math.dist(P[i],P[(i+1)%4])/100)
    w=0
    for i in range(4):
        a0,a1,a2=P[i-1],P[i],P[(i+1)%4]; v1=(a0[0]-a1[0],a0[1]-a1[1]); v2=(a2[0]-a1[0],a2[1]-a1[1])
        cs=max(-1,min(1,(v1[0]*v2[0]+v1[1]*v2[1])/(math.hypot(*v1)*math.hypot(*v2))))
        w=max(w,abs(math.degrees(math.acos(cs))-90))
    worst.append(w)
s=sorted(sides); print('quad side m: median %.2f p5 %.1f p95 %.1f'%(s[len(s)//2],s[int(.05*len(s))],s[int(.95*len(s))]))
s=sorted(worst); print('quad worst corner dev: median %.2f p95 %.1f p99 %.1f'%(s[len(s)//2],s[int(.95*len(s))],s[int(.99*len(s))]))
# shared vertices
vc=collections.Counter(p for x in B for p in set(x['poly']))
share=sum(1 for x in B if any(vc[p]>1 for p in set(x['poly'])))
print('buildings sharing an exact vertex with another: %d (%.1f%%)'%(share,100*share/len(B)))
# centroid extents
def centroid(p):
    a=shoelace(p); cx=cy=0
    for i in range(len(p)):
        x1,y1=p[i]; x2,y2=p[(i+1)%len(p)]; cr=x1*y2-x2*y1; cx+=(x1+x2)*cr; cy+=(y1+y2)*cr
    return (cx/(6*a),cy/(6*a)) if abs(a)>1e-9 else (sum(q[0] for q in p)/len(p),sum(q[1] for q in p)/len(p))
C=[centroid(x['poly']) for x in B]
cx=sum(p[0] for p in C)/len(C); cy=sum(p[1] for p in C)/len(C)
r=sorted(math.dist(p,(cx,cy)) for p in C)
print('centroid bbox m x %.0f..%.0f y %.0f..%.0f ; CoM (%.0f,%.0f) m; radius p50 %.0f p90 %.0f p99 %.0f max %.0f'%(min(p[0] for p in C)/100,max(p[0] for p in C)/100,min(p[1] for p in C)/100,max(p[1] for p in C)/100,cx/100,cy/100,r[len(r)//2]/100,r[int(.9*len(r))]/100,r[int(.99*len(r))]/100,r[-1]/100))
# special
for x in B:
    if x['label'] in ('temple','market square','theatre'):
        P=x['poly']; print('  %-14s verts=%d area=%.0f m2 bbox %.0fx%.0f m'%(x['label'],len(P),abs(shoelace(P))/1e4,(max(q[0] for q in P)-min(q[0] for q in P))/100,(max(q[1] for q in P)-min(q[1] for q in P))/100))
# districts
print('districts:')
for _,v in top[10]:
    d=fields(v); P=[]
    if 5 in d: sd=fields(one(d,5)); P=pts(one(sd,1))
    if len(P)>1 and P[0]==P[-1]: P=P[:-1]
    ad=fields(one(d,4)) if 4 in d else {}
    seg=[math.dist(P[i],P[(i+1)%len(P)])/100 for i in range(len(P))]
    # simplicity check: count self-intersections O(n^2)
    def inter(a,b,c,d):
        def cr(o,p,q): return (p[0]-o[0])*(q[1]-o[1])-(p[1]-o[1])*(q[0]-o[0])
        return (cr(a,b,c)*cr(a,b,d)<0) and (cr(c,d,a)*cr(c,d,b)<0)
    n=len(P); si=0
    for i in range(n):
        for j in range(i+2,n):
            if i==0 and j==n-1: continue
            if inter(P[i],P[(i+1)%n],P[j],P[(j+1)%n]): si+=1
    nin=0
    def inside(pt,poly):
        x,y=pt; c=False
        for i in range(len(poly)):
            x1,y1=poly[i]; x2,y2=poly[(i+1)%len(poly)]
            if ((y1>y)!=(y2>y)) and (x<(x2-x1)*(y-y1)/(y2-y1+1e-12)+x1): c=not c
        return c
    nin=sum(1 for c in C if inside(c,P))
    print('  %-15s verts=%d area=%.1f ha perim=%.0f m minseg=%.2f selfX=%d anchor=(%.0f,%.0f) m buildings_in=%d'%(one(d,2).decode(),len(P),abs(shoelace(P))/1e8,sum(seg),min(seg),si,dec(uv(ad,1))/100,dec(uv(ad,2))/100,nin))
# water
print('water:')
for _,v in top[6]:
    d=fields(v); P=pts(one(d,2)); seg=sorted(math.dist(P[i],P[i+1])/100 for i in range(len(P)-1))
    print('  id=%d pts=%d bbox x %.0f..%.0f y %.0f..%.0f m area=%.0f m2 seg median %.1f m'%(uv(d,1),len(P),min(p[0] for p in P)/100,max(p[0] for p in P)/100,min(p[1] for p in P)/100,max(p[1] for p in P)/100,abs(shoelace(P))/1e4,seg[len(seg)//2]))
# wall towers
T=[]
for _,v in top[7]:
    d=fields(v); pd=fields(one(d,2)); T.append((uv(d,1),(dec(uv(pd,1)),dec(uv(pd,2)))))
T.sort(); segs=[math.dist(T[i][1],T[i+1][1])/100 for i in range(len(T)-1)]
print('towers',len(T),'chain seg m min %.1f med %.1f max %.1f ; first->last %.1f m'%(min(segs),sorted(segs)[len(segs)//2],max(segs),math.dist(T[0][1],T[-1][1])/100))
# trees
D=fields(one(top,11))
for fn in sorted(D):
    for _,v in D[fn]:
        d=fields(v)
        if any(wt==5 for wt,_ in d.get(2,[])):
            pd=fields(one(d,1)); print('  11.%d standalone at (%.0f,%.0f) m'%(fn,dec(uv(pd,1))/100,dec(uv(pd,2))/100)) if fn==2 and False else None
        else:
            inst=[]; polys=[]
            for wt,iv in d.get(2,[]):
                if wt!=2: continue
                idd=fields(iv); pd=fields(one(idd,2)); inst.append((uv(idd,1),(dec(uv(pd,1)),dec(uv(pd,2)))))
            for wt,pp in d.get(3,[]):
                if wt!=2: continue
                pd2=fields(pp); polys.append((pts(one(pd2,1)), struct.unpack('<f',one(pd2,2))[0] if 2 in pd2 else None))
            if inst:
                vh=collections.Counter(i[0] for i in inst)
                P=[i[1] for i in inst]
                # NN via grid
                gr=collections.defaultdict(list); Cc=2000
                for i,p in enumerate(P): gr[(p[0]//Cc,p[1]//Cc)].append(i)
                nn=[]
                for i,p in enumerate(P):
                    best=1e18
                    for dx in (-1,0,1):
                        for dy in (-1,0,1):
                            for j in gr.get((p[0]//Cc+dx,p[1]//Cc+dy),()):
                                if j!=i: best=min(best,math.dist(p,P[j]))
                    if best<1e17: nn.append(best/100)
                s=sorted(nn)
                print('  11.%d instances=%d variants=%s NN m: min %.2f median %.2f mean %.2f p5 %.1f; bbox x %.0f..%.0f y %.0f..%.0f'%(fn,len(inst),dict(sorted(vh.items())),s[0],s[len(s)//2],sum(s)/len(s),s[int(.05*len(s))],min(p[0] for p in P)/100,max(p[0] for p in P)/100,min(p[1] for p in P)/100,max(p[1] for p in P)/100))
            for P,f in polys:
                print('    11.%d poly verts=%d area=%.2f km2 f32=%s'%(fn,len(P),abs(shoelace(P))/1e10,f))
# standalone 14s
for fn in (2,4,5):
    G=[]
    for _,v in D[fn]:
        d=fields(v); pd=fields(one(d,1)); G.append((dec(uv(pd,1))/100,dec(uv(pd,2))/100))
    print('  11.%d n=%d bbox x %.0f..%.0f y %.0f..%.0f'%(fn,len(G),min(g[0] for g in G),max(g[0] for g in G),min(g[1] for g in G),max(g[1] for g in G)))
# lots
print('lots:')
for _,v in top[9]:
    d=fields(v); g=uv(d,1); lots=[]
    for _,lv in d.get(2,[]):
        ld=fields(lv); P=pts(one(ld,2)); 
        if len(P)>1 and P[0]==P[-1]: P=P[:-1]
        lots.append(P)
    ar=sorted(abs(shoelace(P))/1e4 for P in lots if len(P)>=3)
    print('  group %2d lots=%4d median area %.0f m2 total %.1f ha max %.0f m2'%(g,len(lots),ar[len(ar)//2],sum(ar)/1e4,ar[-1]))
    if g==18:
        el=[math.dist(P[i],P[(i+1)%len(P)])/100 for P in lots for i in range(len(P))]
        c=collections.Counter(int(round(x)) for x in el); print('    block edge modes:',c.most_common(6),'median %.1f'%sorted(el)[len(el)//2])
        # buildings per block
        def inside(pt,poly):
            x,y=pt; c=False
            for i in range(len(poly)):
                x1,y1=poly[i]; x2,y2=poly[(i+1)%len(poly)]
                if ((y1>y)!=(y2>y)) and (x<(x2-x1)*(y-y1)/(y2-y1+1e-12)+x1): c=not c
            return c
        cnt=[]
        for P in lots:
            if len(P)<3: continue
            bx=(min(q[0] for q in P),min(q[1] for q in P),max(q[0] for q in P),max(q[1] for q in P))
            n=sum(1 for c in C if bx[0]<=c[0]<=bx[2] and bx[1]<=c[1]<=bx[3] and inside(c,P))
            cnt.append((n,abs(shoelace(P))/1e4))
        occ=[c for c in cnt if c[0]>0]
        print('    blocks with 0 buildings %d/%d ; mean buildings/block %.2f ; occupied mean area %.0f m2 ; m2 per building %.0f ; buildings inside blocks %d'%(sum(1 for c in cnt if c[0]==0),len(cnt),sum(c[0] for c in cnt)/len(cnt),sum(c[1] for c in occ)/len(occ),sum(c[1] for c in occ)/sum(c[0] for c in occ),sum(c[0] for c in cnt)))
# calendar 22.5
cal=fields(one(top,22)); print('22.5 raw',pv(one(cal,5)),'zz',[zz(x) for x in pv(one(cal,5))],'22.2',uv(cal,2),'22.1',one(cal,1))
