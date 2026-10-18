# Critique receipt (our own code, seeded): power and size of the proposed rank rule for V12 §3.6.
# Per town: u = (#{S_k < S_obs} + U*(#{S_k == S_obs}+1)) / (K+1), U uniform (randomised ties), K = 20.
# Rule R: share of towns with u > 0.5 >= 0.70 AND median u >= 0.60, over 50 towns.
# Compared with V12's z rule (z>0 in >= 70 % and median z >= 0.2; sd 0 -> z = 0 or +-10).
import random, statistics as st
K=20
def zrule_u(obs, ks, rng):
    mu=sum(ks)/K; sd=st.pstdev(ks)
    z = (0.0 if obs==mu else (10.0 if obs>mu else -10.0)) if sd==0 else (obs-mu)/sd
    lt=sum(1 for s in ks if s<obs); eq=sum(1 for s in ks if s==obs)
    return z, (lt+rng.random()*(eq+1))/(K+1)
def verdicts(zs, us):
    n=len(zs)
    v12 = sum(1 for z in zs if z>0) >= 0.70*n and st.median(zs) >= 0.20
    rank = sum(1 for u in us if u>0.5) >= 0.70*n and st.median(us) >= 0.60
    return v12, rank
def disc_town(rng, E, q, m, pull):
    # members prefer indicator plots: each member lands on an indicator plot with prob q' = q + pull*(1-q), else uniform
    good=int(round(E*q)); plots=[1]*good+[0]*(E-good)
    obs=0
    for _ in range(m):
        obs += 1 if rng.random() < q + pull*(1-q) else 0
    obs/=m
    ks=[sum(rng.sample(plots,m))/m for _ in range(K)]
    return zrule_u(obs, ks, rng)
def cont_town(rng, delta):
    ks=[rng.gauss(0,1) for _ in range(K)]; obs=rng.gauss(delta,1)
    return zrule_u(obs, ks, rng)
rng=random.Random(28092026)
R=400
print("continuous statistic (normal), planted shift in sd: V12 z rule | rank rule R")
for d in (0.0,0.3,0.5,0.8,1.0):
    a=b=0
    for _ in range(R):
        zs=[];us=[]
        for t in range(50):
            z,u=cont_town(rng,d); zs.append(z); us.append(u)
        v,r=verdicts(zs,us); a+=v; b+=r
    print(f"  shift {d:.1f}: {a/R:.3f} | {b/R:.3f}")
print("discrete share statistic, E=200 eligible plots, q base share, m members, pull = share of members pulled onto indicator plots")
for (q,m) in [(0.3,1),(0.5,1),(0.85,1),(0.5,3),(0.85,2),(0.3,10)]:
    row=[]
    for pull in (0.0,0.3,0.5):
        a=b=0
        for _ in range(R):
            zs=[];us=[]
            for t in range(50):
                z,u=disc_town(rng,200,q,m,pull); zs.append(z); us.append(u)
            v,r=verdicts(zs,us); a+=v; b+=r
        row.append(f"pull {pull}: {a/R:.3f} | {b/R:.3f}")
    print(f"  q={q} m={m}: " + "; ".join(row))
