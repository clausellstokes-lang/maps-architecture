# Extramural "ribbon" share: fraction of buildings outside the city wall whose centroid lies within d metres of an
# exported road polyline (MFCG exports the N gate roads + castle street; JSON units are metres).
import json, math
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
for stem in ['s555001-size40-gates1','s555001-size40-gates4','s555001-size40-gates9','s777001-size80-river-coast']:
    d=json.load(open(stem+'.json')); F={f['id']:f for f in d['features']}
    B=[ring(p[0]) for p in F['buildings']['coordinates']]; C=[cen(r) for r in B]
    wall=ring(F['walls']['geometries'][0]['coordinates'][0])
    roads=[g['coordinates'] for g in F['roads']['geometries']]
    segs=[(r[i],r[i+1]) for r in roads for i in range(len(r)-1)]
    out=[c for c in C if not pip(c,wall)]
    if not out: print(stem,'no extramural buildings'); continue
    dist=[min(dseg(c,a,b) for a,b in segs) for c in out]
    s=sorted(dist)
    frac=lambda t: sum(1 for x in dist if x<=t)/len(dist)
    print(f"{stem}: extramural {len(out)}/{len(C)} ({len(out)/len(C)*100:.0f}%); within 50 m of a gate road {frac(50)*100:.0f}%, 100 m {frac(100)*100:.0f}%, 200 m {frac(200)*100:.0f}%; median distance {s[len(s)//2]:.0f} m")
