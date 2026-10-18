# Critique receipt (our own code): V12 §3.6's per-town z and 'sign' rule (z>0 in >=70% of 50 towns AND median z >= 0.2,
# K=20 permutations) applied to a DISCRETE share statistic under the NULL (members placed uniformly among eligible sites).
# Each town: E eligible plots, a fraction q of which satisfy the indicator (e.g. 'within 150 m of the market',
# 'downstream'); m members drawn without replacement; S = share of members satisfying it.
# Compared with a rank rule: u = (#{S_k < S_obs} + U*(#{S_k == S_obs}+1)) / (K+1), U uniform (randomised ties),
# sign clause u > 0.5 in >= 70% of towns, i.e. the exchangeable permutation p-value.
import random, statistics as st
def town(rng, E, q, m, K=20):
    good = int(round(E*q)); plots=[1]*good+[0]*(E-good)
    obs = sum(rng.sample(plots, m))/m
    ks = [sum(rng.sample(plots, m))/m for _ in range(K)]
    mu = sum(ks)/K; sd = st.pstdev(ks)
    if sd == 0: z = 0.0 if obs == mu else (10.0 if obs > mu else -10.0)
    else: z = (obs-mu)/sd
    lt = sum(1 for s in ks if s < obs); eq = sum(1 for s in ks if s == obs)
    u = (lt + rng.random()*(eq+1))/(K+1)
    return z, u
def bar(rng, E, q, m, towns=50):
    zs=[]; us=[]
    for _ in range(towns):
        z,u = town(rng,E,q,m); zs.append(z); us.append(u)
    v12 = (sum(1 for z in zs if z>0) >= 0.70*towns) and (st.median(zs) >= 0.20)
    rank = (sum(1 for u in us if u>0.5) >= 0.70*towns)
    return v12, rank
rng = random.Random(20260928)
print("NULL (no pull). pass rates over 400 bars of 50 towns each")
print(f"{'E':>4} {'q':>5} {'m':>3}  {'V12 sign rule':>14} {'rank rule':>10}")
for (E,q,m) in [(200,0.5,1),(200,0.7,1),(200,0.85,1),(200,0.85,2),(200,0.9,3),(200,0.6,3),(200,0.3,1),(200,0.5,10),(200,0.8,5)]:
    a=b=0; R=400
    for _ in range(R):
        v,r = bar(rng,E,q,m); a+=v; b+=r
    print(f"{E:>4} {q:>5} {m:>3}  {a/R:>14.3f} {b/R:>10.3f}")
