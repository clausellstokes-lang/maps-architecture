# Our own arithmetic (no reference code): vertex attraction on Chaikin x2 smoothed spines.
# Spine: control steps 25-40 m with heading changes ~N(0, 9 deg); Chaikin x2; lattice 1 cm.
# A cut endpoint lands uniformly along the spine. Rule: within ATTR of an existing vertex -> snap to it;
# else split the edge at the nearest lattice point to the exact foot (splitThrough; <= 0.71 cm off).
import random, math
random.seed(12345)
ATTR=26.0; MINEDGE=25.0
def chaikin(pts):
    out=[pts[0]]
    for a,b in zip(pts,pts[1:]):
        out.append((0.75*a[0]+0.25*b[0],0.75*a[1]+0.25*b[1]))
        out.append((0.25*a[0]+0.75*b[0],0.25*a[1]+0.75*b[1]))
    out.append(pts[-1]); return out
def spine():
    x=y=0.0; h=random.uniform(0,2*math.pi); pts=[(x,y)]
    for _ in range(12):
        L=random.uniform(2500,4000); h+=random.gauss(0,math.radians(9))
        x+=L*math.cos(h); y+=L*math.sin(h); pts.append((x,y))
    p=chaikin(chaikin(pts))
    return [(round(a),round(b)) for a,b in p]
N=200000; attracted=0; disp=[]; minlen=1e9; seglens=[]; offedge=[]
for i in range(N):
    s=spine()
    lens=[math.dist(a,b) for a,b in zip(s,s[1:])]
    if i<2000: seglens+=lens
    tot=sum(lens); t=random.uniform(0.1*tot,0.9*tot)
    k=0
    while t>lens[k]: t-=lens[k]; k+=1
    a,b=s[k],s[k+1]; u=t/lens[k]
    fx,fy=a[0]+u*(b[0]-a[0]),a[1]+u*(b[1]-a[1])
    da=math.dist((fx,fy),a); db=math.dist((fx,fy),b)
    if min(da,db)<=ATTR:
        attracted+=1; disp.append(min(da,db)); newlen=min(lens[k], lens[k])  # edge unchanged
        pieces=[lens[k]]
    else:
        px,py=round(fx),round(fy)
        # distance of lattice point from the exact segment line
        ex,ey=b[0]-a[0],b[1]-a[1]; d=abs((px-a[0])*ey-(py-a[1])*ex)/math.hypot(ex,ey)
        offedge.append(d)
        pieces=[math.dist(a,(px,py)),math.dist((px,py),b)]
    minlen=min(minlen,min(pieces))
seglens.sort(); disp.sort(); offedge.sort()
q=lambda v,p: v[int(p*(len(v)-1))]
print('segments p50 %.1f m'%(q(seglens,0.5)/100))
print('attracted share %.4f'%(attracted/N))
print('attraction displacement p50 %.1f cm p90 %.1f cm max %.1f cm'%(q(disp,.5),q(disp,.9),disp[-1]))
print('splitThrough off-edge p50 %.2f p90 %.2f max %.2f cm'%(q(offedge,.5),q(offedge,.9),offedge[-1]))
print('min resulting edge length %.1f cm (minEdge %.0f)'%(minlen,MINEDGE))
