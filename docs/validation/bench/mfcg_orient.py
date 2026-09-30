# Local orientation coherence of MFCG lots-as-buildings (reference output; our own analysis).
# For each building: axis angle of its longest edge, taken mod 90 deg (a quad grid has two perpendicular axes),
# encoded as exp(4i*theta). Coherence R4 = |mean| over buildings whose centroids lie within radius r of a building.
# R4 = 1: one grid orientation; R4 ~ 1/sqrt(n): random orientations. Also reports a shuffled-angle control.
import json, math, cmath, random, statistics as st
def ring(r): return r[:-1] if len(r)>1 and r[0]==r[-1] else r
def cen(r): return (sum(p[0] for p in r)/len(r), sum(p[1] for p in r)/len(r))
random.seed(1)
for stem in ['s555001-size40-gates4','s555001-size40-gates9','s777001-size80-river-coast']:
    d=json.load(open(stem+'.json')); F={f['id']:f for f in d['features']}
    B=[ring(p[0]) for p in F['buildings']['coordinates']]
    C=[cen(r) for r in B]; Z=[]
    for r in B:
        best=(0,0)
        for i in range(len(r)):
            a,b=r[i],r[(i+1)%len(r)]; L=math.dist(a,b)
            if L>best[0]: best=(L,math.atan2(b[1]-a[1],b[0]-a[0]))
        Z.append(cmath.exp(4j*best[1]))
    # grid index
    cell=100.0; G={}
    for i,(x,y) in enumerate(C): G.setdefault((int(x//cell),int(y//cell)),[]).append(i)
    sample=random.sample(range(len(B)), min(1500,len(B)))
    Zs=Z[:]; random.shuffle(Zs)
    for rad in (60.0,120.0,250.0):
        vals=[]; ctrl=[]; ns=[]
        for i in sample:
            x,y=C[i]; idx=[]
            for gx in range(int((x-rad)//cell), int((x+rad)//cell)+1):
                for gy in range(int((y-rad)//cell), int((y+rad)//cell)+1):
                    for j in G.get((gx,gy),[]):
                        if math.dist(C[j],(x,y))<=rad: idx.append(j)
            if len(idx)<5: continue
            vals.append(abs(sum(Z[j] for j in idx))/len(idx)); ctrl.append(abs(sum(Zs[j] for j in idx))/len(idx)); ns.append(len(idx))
        print(f"{stem} r={rad:.0f} m: median R4={st.median(vals):.2f} (p25 {sorted(vals)[len(vals)//4]:.2f}, p75 {sorted(vals)[3*len(vals)//4]:.2f}); shuffled control {st.median(ctrl):.2f}; median n={st.median(ns):.0f}")
