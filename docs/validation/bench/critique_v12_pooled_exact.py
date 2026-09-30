# Critique receipt (our own code, seeded): the pooled EXACT test for share statistics proposed in critique V12C-01.
# Per town the null count of members on indicator plots is hypergeometric (m draws from E plots, G indicator);
# the pooled null pmf is the convolution of the towns' pmfs; the bar passes when P(pooled count >= observed) <= 0.01.
import random, math
def hyper_pmf(E,G,m):
    tot=math.comb(E,m); return [math.comb(G,k)*math.comb(E-G,m-k)/tot for k in range(m+1)]
def conv(a,b):
    out=[0.0]*(len(a)+len(b)-1)
    for i,x in enumerate(a):
        if x==0: continue
        for j,y in enumerate(b): out[i+j]+=x*y
    return out
def bar(rng,E,q,m,pull,towns=50):
    G=int(round(E*q)); pmf=[1.0]; obs=0
    for _ in range(towns):
        pmf=conv(pmf,hyper_pmf(E,G,m))
        obs+=sum(1 for _ in range(m) if rng.random() < q+pull*(1-q))
    return sum(pmf[obs:]) <= 0.01
rng=random.Random(280928)
R=1000
for (q,m) in [(0.3,1),(0.5,1),(0.85,1),(0.5,3),(0.85,2),(0.3,10)]:
    print(f"q={q} m={m}: "+"; ".join(f"pull {p}: {sum(bar(rng,200,q,m,p) for _ in range(R))/R:.3f}" for p in (0.0,0.3,0.5)))
