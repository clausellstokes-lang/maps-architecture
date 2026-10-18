# Alignment of MFCG lots to the curtain wall: for buildings whose centroid is inside the wall ring and within d metres of
# it, deviation (mod 90 deg, in [0,45]) between the building's longest-edge axis and the nearest wall segment's direction.
# Uniform random orientation => P(dev <= 15) = 1/3, median 22.5 deg.
import json, math, statistics as st
def ring(r): return r[:-1] if len(r)>1 and r[0]==r[-1] else r
def cen(r): return (sum(p[0] for p in r)/len(r), sum(p[1] for p in r)/len(r))
def pip(p,r):
    x,y=p; c=False
    for i in range(len(r)):
        x1,y1=r[i]; x2,y2=r[(i+1)%len(r)]
        if (y1>y)!=(y2>y) and x < (x2-x1)*(y-y1)/(y2-y1)+x1: c=not c
    return c
def dseg(p,a,b):
    ax,ay=a; bx,by=b; px,py=p; dx,dy=bx-ax,by-ay; L=dx*dx+dy*dy
    t=0 if L==0 else max(0,min(1,((px-ax)*dx+(py-ay)*dy)/L))
    return math.hypot(px-(ax+t*dx), py-(ay+t*dy))
def axis(r):
    best=(0,0)
    for i in range(len(r)):
        a,b=r[i],r[(i+1)%len(r)]; L=math.dist(a,b)
        if L>best[0]: best=(L,math.atan2(b[1]-a[1],b[0]-a[0]))
    return best[1]
def dev(a,b):
    d=abs((a-b)%(math.pi/2)); return math.degrees(min(d, math.pi/2-d))
for stem in ['s555001-size40-gates0','s555001-size40-gates4','s555001-size40-gates9','s777001-size80-river-coast']:
    d=json.load(open(stem+'.json')); F={f['id']:f for f in d['features']}
    B=[ring(p[0]) for p in F['buildings']['coordinates']]
    wall=ring(F['walls']['geometries'][0]['coordinates'][0]); W=[(wall[i],wall[(i+1)%len(wall)]) for i in range(len(wall))]
    for band in ((0,40),(40,100),(100,200)):
        devs=[]
        for r in B:
            c=cen(r)
            if not pip(c,wall): continue
            ds=[(dseg(c,a,b),a,b) for a,b in W]; dm,a,b=min(ds)
            if band[0]<=dm<band[1]:
                devs.append(dev(axis(r), math.atan2(b[1]-a[1],b[0]-a[0])))
        if devs:
            print(f"{stem} {band[0]}-{band[1]} m from wall: n={len(devs)} median dev {st.median(devs):.1f} deg; share <=15 deg {sum(1 for x in devs if x<=15)/len(devs)*100:.0f}% (random 33%)")
