#!/usr/bin/env python3
"""coh_repair_rendering_r2_resolution — §8.8's canvas need under g item 121 (the ultra tier, the 4K ceiling, the split
composition's text layer at the device ratio D) and item 124 (rung 3's coverage plane), on §8.8's formulae:
P(d) = a·b, a = ceil(W·d/512)+1, b = ceil(H·d/512)+1 (W, H in CSS px); unlit 3P+7; lit 4.25P+7+Q; full precision 6.5P+7+2Q;
Q = P/12 + (2(a+b)+4)/3 + B(d), B = 3.75 / 4.25 / 4.75 / 5.5 MB at d = 1 / 1.5 / 2 / 3; the text layer T = P(D) when d < D.
Fitting order (item 121 (e)): full precision -> standard surface; d down the ladder to 1; the vector rung; d 0.75, 0.5."""
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
def ladder(d0,mode):
    """Auto's ladder from the top (item 121 (e)), cumulative: full precision -> the standard surface; the tile DPR down to 1;
    the light pass (the vector rung) at 1; then 0.75 and 0.5. A view that starts unlit runs the DPR steps alone."""
    hi=[d for d in LAD if 1<=d<=d0] or [1]
    lo=[d for d in LAD if d<1 and d<=d0]
    if mode=='unlit' or d0<1: return [(d,'unlit') for d in LAD if d<=d0]
    seq=[(d0,'full')] if mode=='full' else []
    seq+= [(d,'lit') for d in hi]+[(hi[-1],'unlit')]+[(d,'unlit') for d in lo]
    return seq
def fit(W,H,D,tier,mode):
    top=min(D,CAP[tier],ceil4k(W,H)); d0=max([s for s in LAD if s<=top+1e-9])
    # the text layer at D; where nothing fits, it steps down the ladder too (the last resort), the tile ladder rerun each time
    for Dt in [x for x in LAD if x<=D] or [D]:
        for d,m in ladder(min(d0,Dt),mode):
            t,n,T=need(W,H,d,Dt,m)
            if t<=CEIL[tier]+1e-9: return d,m,t,n,T,Dt
    return None
cases=[('the reference viewport',1440,900,2),('the low-end device',1366,768,1),('the low-end device',1920,1080,1),
       ('a native-4K view',1920,1080,2),('a native-4K view at DPR 1',3840,2160,1),('a 5K screen',2560,1440,2),('an 8K screen',3840,2160,2),
       ('a DPR-2 laptop on the low tier',1440,900,2)]
for name,W,H,D in cases:
    print(f'== {name}: {W} x {H} CSS px at D = {D}; P at D = {P(W,H,D)}; the 4K ceiling d <= {ceil4k(W,H)}')
    for tier in ('low','mid','high','ultra'):
        for mode in ('unlit','lit','full'):
            r=fit(W,H,D,tier,mode)
            if r is None: print(f'   {tier:5s} {mode:5s}: nothing fits'); continue
            d,m,t,n,T,Dt=r
            tl=f' (text layer at {Dt})' if Dt<D else ''
            print(f'   {tier:5s} {mode:5s}: d = {d}, drawn {m:5s}, P = {P(W,H,d):3d}, need {n:7.2f} + text {T:3d} = {t:7.2f} MB{tl}')
print('\nnative 4K at d = D (P = 54): unlit %.2f, lit %.2f, full precision %.2f MB' % (need(1920,1080,2,2,'unlit')[0],need(1920,1080,2,2,'lit')[0],need(1920,1080,2,2,'full')[0]))
