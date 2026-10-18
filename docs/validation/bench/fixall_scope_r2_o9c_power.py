# usage: python3 fixall_scope_r2_o9c_power.py      (lane fixall/draft-scope-r2, 2026-09-25; stdlib only, seeded)
# Extends fixall_verify_scope_o9c_rank.py (the calibrated O9 (c) rank test) with the cases the round-2 text relies on:
#  (1) calibration when a statistic is DISCRETE (attached share on a small block has many exact ties), with ties among
#      the K+1 values broken by a uniform draw from the campaign's own stream -> rank stays exactly uniform;
#  (2) what happens if ties are NOT randomised (ties counted as 'below' = lowest rank) -> miscalibration;
#  (3) power against three wrong regenerators: too snug (0.8x spread), too loose (1.5x), biased (+0.25 sd).
# Campaign: n = 400 regenerated scopes; per scope K = 50 from-scratch generations; per statistic a 10-bin rank
# histogram with expected counts proportional to the ranks each bin holds; chi-square; Holm over 4 statistics at 0.01.
import random, math
random.seed(20260925)
def gammq(a,x):
    if x<a+1:
        s=1.0/a; t=s; ap=a
        for _ in range(500):
            ap+=1; t*=x/ap; s+=t
            if t<s*1e-15: break
        return 1.0-s*math.exp(-x+a*math.log(x)-math.lgamma(a))
    b=x+1-a; c=1e300; d=1/b; h=d
    for i in range(1,500):
        an=-i*(i-a); b+=2; d=an*d+b; d=1/d if abs(d)>1e-300 else 1e300; c=b+an/c; h*=d*c
        if abs(d*c-1)<1e-15: break
    return math.exp(-x+a*math.log(x)-math.lgamma(a))*h
def chi2_p(counts, widths):
    n=sum(counts); tot=sum(widths); x=sum((c-n*w/tot)**2/(n*w/tot) for c,w in zip(counts,widths))
    return gammq((len(counts)-1)/2, x/2)
def rank_of(x, refs, randomise):
    below=sum(1 for r in refs if r<x); ties=sum(1 for r in refs if r==x)
    return below + (random.randint(0,ties) if randomise else 0)
def campaign(K,n,draw_pair,randomise=True):
    widths=[0]*10
    for r in range(K+1): widths[min(9, r*10//(K+1))]+=1
    ps=[]
    for s in range(4):
        bins=[0]*10
        for _ in range(n):
            x,refs=draw_pair(s,K)
            r=rank_of(x,refs,randomise)
            bins[min(9, r*10//(K+1))]+=1
        ps.append(chi2_p(bins,widths))
    return min(ps) < 0.01/4          # Holm's first step decides whether the family rejects at all
def cont(scale=1.0, shift=0.0):
    return lambda s,K: (random.gauss(shift,scale), [random.gauss(0,1) for _ in range(K)])
def discrete(s,K):                    # attached share of a 6-plot block: k/6 with k ~ Binomial(6, 0.7) -> heavy ties
    f=lambda: sum(1 for _ in range(6) if random.random()<0.7)/6
    return f(), [f() for _ in range(K)]
K,n=50,400
R=[]
f=sum(campaign(K,n,discrete,True) for _ in range(1000));  R.append(f"H0 perfect, discrete statistic, ties randomised:     false failures {f}/1000 = {f/1000:.4f}")
f=sum(campaign(K,n,discrete,False) for _ in range(200));  R.append(f"H0 perfect, discrete statistic, ties NOT randomised: false failures {f}/200 = {f/200:.3f}")
f=sum(campaign(K,n,cont(),True) for _ in range(1000));    R.append(f"H0 perfect, continuous statistic:                    false failures {f}/1000 = {f/1000:.4f}")
for lab,dp in [("too snug 0.8x spread",cont(0.8)),("too loose 1.5x spread",cont(1.5)),("biased +0.25 sd",cont(1.0,0.25)),("too snug 0.6x (FTG)",cont(0.6))]:
    f=sum(campaign(K,n,dp,True) for _ in range(200)); R.append(f"H1 {lab:22s}: campaigns failed {f}/200 = {f/200:.3f}")
print(f"K={K} from-scratch generations per scope, n={n} regenerated scopes per campaign, 10 bins, Holm over 4 at 0.01")
print("\n".join(R))
