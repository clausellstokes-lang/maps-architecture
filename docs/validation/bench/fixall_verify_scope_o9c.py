# Does O9 (c) as written (architecture §7.3 item 7 (iv) / §15.2 O9 (c)) pass a PERFECT regenerator?
# Perfect regenerator: the regenerated scope's statistics are an independent draw from the same distribution
# as the K from-scratch generations. Criterion: each of 4 statistics must lie inside the central 95 % band of the
# K reference generations; campaign fails if pass rate < 0.95 at p < 0.01 (one-sided exact binomial).
import random, math
random.seed(12345)
def pct(sorted_xs, q):  # linear interpolation (numpy default, type 7)
    n=len(sorted_xs); h=(n-1)*q; lo=math.floor(h); hi=min(lo+1,n-1)
    return sorted_xs[lo]+(h-lo)*(sorted_xs[hi]-sorted_xs[lo])
def binom_cdf(k,n,p):
    s=0.0
    for i in range(k+1):
        s+=math.comb(n,i)*p**i*(1-p)**(n-i)
    return s
def one_check(K, nstat, rho):
    # nstat correlated gaussian statistics (equicorrelated rho)
    def draw():
        z0=random.gauss(0,1)
        return [math.sqrt(rho)*z0+math.sqrt(1-rho)*random.gauss(0,1) for _ in range(nstat)]
    ref=[draw() for _ in range(K)]
    new=draw()
    ok=True
    for s in range(nstat):
        xs=sorted(r[s] for r in ref)
        lo,hi=pct(xs,0.025),pct(xs,0.975)
        if not (lo<=new[s]<=hi): ok=False
    return ok
for K in (50,100):
  for nstat,rho in ((1,0.0),(4,0.0),(4,0.5)):
    trials=20000
    p=sum(one_check(K,nstat,rho) for _ in range(trials))/trials
    # campaign of n regenerations: probability the campaign FAILS (binomial p<0.01 below 0.95)
    res=[]
    for n in (100,400,1000):
        # critical k: largest k with P(X<=k | 0.95) < 0.01
        kc=-1
        for k in range(n+1):
            if binom_cdf(k,n,0.95)<0.01: kc=k
            else: break
        # P(campaign fails) = P(X<=kc | p)
        pf=binom_cdf(kc,n,p) if kc>=0 else 0.0
        res.append(f"n={n}: kcrit={kc}, P(fail)={pf:.3f}")
    print(f"K={K} stats={nstat} rho={rho}: per-regeneration pass rate of a perfect regenerator = {p:.3f}; "+"; ".join(res))
