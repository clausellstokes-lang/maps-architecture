#!/usr/bin/env python3
"""coh_repair_rendering_r3_resolution — §8.8's canvas need re-run under VRC2T-05 (repair round 3): a tier whose GPU pass
misses §13.4's tolerance (§8.4 (g)) holds full precision and never draws the standard surface, whose lit frame lies outside
the tolerance there; Auto's ladder and the fitting order pass over that step as over one that frees nothing. Formulae as
round 2's receipt (coh_repair_rendering_r2_resolution.py, unchanged):
P(d) = a·b, a = ceil(W·d/512)+1, b = ceil(H·d/512)+1 (W, H in CSS px); unlit (rung 3) 3P+7; lit (standard surface) 4.25P+7+Q;
full precision 6.5P+7+2Q; Q = P/12 + (2(a+b)+4)/3 + B(d), B = 3.75 / 4.25 / 4.75 / 5.5 MB at d = 1 / 1.5 / 2 / 3;
the split composition's text layer T = P(D) when d < D. Tier ceilings low 72, mid 128, high 192, ultra 512 MB; DPR caps
1 / 2 / 3 / 3; the 4K ceiling d <= sqrt(3840*2160/(W*H)) on the ladder 3, 2, 1.5, 1, 0.75, 0.5.
Fitting order (item 121 (e), §8.4 (g)): the weather effects (not modelled: off here); lighting detail (a standard-surface
tier: rung 1 -> rung 2, which frees no canvas; a full-precision tier: the same, the standard surface passed over); the tile
DPR's steps to 1; the light pass (rung 3, at DPR 1); the steps below 1; where nothing fits beside the text layer at D, the
text layer steps down the ladder and the order is rerun."""
import math
LAD=[3,2,1.5,1,0.75,0.5]; B={1:3.75,1.5:4.25,2:4.75,3:5.5}
CEIL={'low':72,'mid':128,'high':192,'ultra':512}; CAP={'low':1,'mid':2,'high':3,'ultra':3}
def ab(W,H,d): return math.ceil(W*d/512)+1, math.ceil(H*d/512)+1
def P(W,H,d): a,b=ab(W,H,d); return a*b
def Q(W,H,d): a,b=ab(W,H,d); return a*b/12+(2*(a+b)+4)/3+B[d]
def need(W,H,d,D,mode):
    p=P(W,H,d); T=P(W,H,D) if d<D else 0
    if mode=='unlit': n=3*p+7
    elif mode=='lit': n=4.25*p+7+Q(W,H,d)
    else: n=6.5*p+7+2*Q(W,H,d)
    return n+T, n, T
def ceil4k(W,H):
    m=math.sqrt(3840*2160/(W*H)); return max([s for s in LAD if s<=m+1e-9] or [0.5])
def ladder(d0,surface):
    """The fitting order for a tier lit on `surface` ('lit' = the standard surface, 'full' = full precision): the lit
    steps at each DPR down to 1 on that surface only (a full-precision tier never takes 'lit'), then rung 3 at 1, then
    the steps below 1 unlit."""
    hi=[d for d in LAD if 1<=d<=d0] or [1]
    lo=[d for d in LAD if d<1 and d<=d0]
    if d0<1: return [(d,'unlit') for d in LAD if d<=d0]
    return [(d,surface) for d in hi]+[(hi[-1],'unlit')]+[(d,'unlit') for d in lo]
def fit(W,H,D,tier,surface):
    top=min(D,CAP[tier],ceil4k(W,H)); d0=max([s for s in LAD if s<=top+1e-9])
    for Dt in [x for x in LAD if x<=D] or [D]:
        for d,m in ladder(min(d0,Dt),surface):
            t,n,T=need(W,H,d,Dt,m)
            if t<=CEIL[tier]+1e-9: return d,m,t,n,T,Dt
    return None
cases=[('the reference viewport',1440,900,2),('the low-end device',1366,768,1),('the low-end device',1920,1080,1),
       ('a native-4K view',1920,1080,2),('a 5K screen',2560,1440,2),('an 8K screen',3840,2160,2)]
print('(1) every case, on a tier that passes the tolerance (standard surface) and on one that misses it (full precision)')
for name,W,H,D in cases:
    print(f'== {name}: {W} x {H} CSS px at D = {D}; P at D = {P(W,H,D)}; the 4K ceiling d <= {ceil4k(W,H)}')
    for tier in ('low','mid','high','ultra'):
        for surface in ('lit','full'):
            r=fit(W,H,D,tier,surface)
            label='standard' if surface=='lit' else 'full    '
            if r is None: print(f'   {tier:5s} {label}: nothing fits'); continue
            d,m,t,n,T,Dt=r
            tl=f' (text layer at {Dt})' if Dt<D else ''
            drawn={'lit':'lit, standard surface','full':'lit, full precision','unlit':'rung 3 (vector)'}[m]
            print(f'   {tier:5s} {label}: d = {d}, {drawn:22s}, P = {P(W,H,d):3d}, need {n:7.2f} + text {T:3d} = {t:7.2f} MB{tl}')
print('\n(2) the full-precision steps of the reference viewport (1 440 x 900 at D = 2) and the low-end device (1 366 x 768 at D = 1)')
for W,H,D in ((1440,900,2),(1366,768,1)):
    for d in (2,1.5,1):
        if d>D: continue
        t,n,T=need(W,H,d,D,'full')
        print(f'   {W} x {H}, d = {d}: full precision {n:.2f} + text {T} = {t:.2f} MB; rung 3 at d = 1: {need(W,H,1,D,"unlit")[0]:.2f} MB')
print('\n(3) no fitted frame on a full-precision tier is drawn on the standard surface:',
      all((fit(W,H,D,tier,'full') or (0,'full'))[1]!='lit' for _,W,H,D in cases for tier in CEIL))
print('native 4K at d = D (P = 54): unlit %.2f, lit %.2f, full precision %.2f MB' % (need(1920,1080,2,2,'unlit')[0],need(1920,1080,2,2,'lit')[0],need(1920,1080,2,2,'full')[0]))
