# Critique receipt (our own code, seeded): a pooled exact-null test for SHARE statistics (V12 §3.6 alternative).
# Per town the null count of members on indicator plots is hypergeometric (m draws from E plots, G of them indicator).
# Pooled z = (sum obs - sum m*G/E) / sqrt(sum m*(G/E)*(1-G/E)*(E-m)/(E-1)); pass at z >= 2.326 (one-sided 0.01).
import random, math
def town(rng,E,q,m,pull):
    G=int(round(E*q)); obs=sum(1 for _ in range(m) if rng.random() < q+pull*(1-q))
    p=G/E; mu=m*p; var=m*p*(1-p)*(E-m)/(E-1); return obs,mu,var
def bar(rng,E,q,m,pull,towns=50):
    o=mu=v=0.0
    for _ in range(towns):
        a,b,c=town(rng,E,q,m,pull); o+=a; mu+=b; v+=c
    return (o-mu)/math.sqrt(v) >= 2.326 if v>0 else False
rng=random.Random(2809)
R=2000
for (q,m) in [(0.3,1),(0.5,1),(0.85,1),(0.5,3),(0.85,2),(0.3,10)]:
    out=[]
    for pull in (0.0,0.3,0.5):
        out.append(f"pull {pull}: {sum(bar(rng,200,q,m,pull) for _ in range(R))/R:.3f}")
    print(f"q={q} m={m}: "+"; ".join(out))
