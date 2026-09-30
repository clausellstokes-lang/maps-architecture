# Calibration of the null-model harness pass rule (V12 §3.6): sign share over n seeds plus a median-effect floor.
# Stdlib only; seeded. Per-seed effect z = (S_obs - mean_null)/sd_null with K null permutations; S ~ Normal.
import math, random, statistics as st
def binom_tail(n,k,p): return sum(math.comb(n,i)*p**i*(1-p)**(n-i) for i in range(k,n+1))
print('coverage of [min,max] for n iid draws, (n-1)/(n+1):', {n: round((n-1)/(n+1),3) for n in (3,5,8,10,20)})
n=50; k=35
print('sign rule 35/50 under no effect (exact):', round(binom_tail(n,k,0.5),5))
for p in (0.6,0.7,0.75,0.8,0.85,0.9):
    print(f' power of the sign clause at p(z>0)={p}:', round(binom_tail(n,k,p),4))
random.seed(12)
def sim(delta, reps=2000, n=50, K=20, floor=0.2, share=0.7):
    passes=0
    for _ in range(reps):
        zs=[]
        for s in range(n):
            null=[random.gauss(0,1) for _ in range(K)]
            obs=random.gauss(delta,1)
            m=st.mean(null); sd=st.pstdev(null) or 1e-9
            zs.append((obs-m)/sd)
        pos=sum(1 for z in zs if z>0)/n
        if pos>=share and st.median(zs)>=floor: passes+=1
    return passes/reps
for d in (0.0,0.3,0.5,0.8,1.0,1.2):
    print(f' joint rule pass rate, planted shift {d} sd (n=50, K=20, 2000 reps):', sim(d))
