import math, random, statistics as st
def sim(sig100, lc=60.0, Lr=150.0, ds=30.0, L=600.0, n=4000, seed=1, goal=True):
    rnd=random.Random(seed)
    rho=math.exp(-ds/lc)
    s=math.radians(sig100)/100.0   # stationary sd of curvature, rad per m  (so sd of turn per 100 m ~ sig100 at short scale)
    nets=[]; turns=[]
    steps=int(L/ds)
    for _ in range(n):
        th=0.0; k=rnd.gauss(0,s)
        for i in range(steps):
            kg = ((0.0-th)/Lr) if goal else 0.0
            k = rho*k + (1-rho)*kg + s*math.sqrt(1-rho*rho)*rnd.gauss(0,1)
            dth = k*ds
            th += dth
            turns.append(abs(math.degrees(dth)))
        nets.append(abs(math.degrees(th)))
    nets.sort(); turns.sort()
    q=lambda a,p:a[int(p*(len(a)-1))]
    return q(nets,.5),q(nets,.9),sum(1 for x in nets if x>90)/len(nets),q(turns,.5),q(turns,.95),q(turns,.99),max(turns)
print("sig100 lc Lr | net600 p50 p90 >90% | per-step turn p50 p95 p99 max")
for sig in (2,4,6,9,12):
    for lc,Lr in ((60,150),(90,200),(45,120)):
        r=sim(sig,lc,Lr)
        print(f"{sig:>3} {lc:>3} {Lr:>3} | {r[0]:6.1f} {r[1]:6.1f} {r[2]*100:5.1f}% | {r[3]:5.2f} {r[4]:5.2f} {r[5]:5.2f} {r[6]:5.1f}")
print("no goal reversion, lc 60:")
for sig in (2,4,6,9):
    r=sim(sig,60,150,goal=False)
    print(f"{sig:>3} | {r[0]:6.1f} {r[1]:6.1f} {r[2]*100:5.1f}% | {r[3]:5.2f} {r[4]:5.2f} {r[5]:5.2f} {r[6]:5.1f}")
print("--- wider sigma ---")
for sig in (15,20,30,40):
    for lc,Lr in ((60,150),(90,250),(120,300)):
        r=sim(sig,lc,Lr)
        print(f"{sig:>3} {lc:>3} {Lr:>3} | {r[0]:6.1f} {r[1]:6.1f} {r[2]*100:5.1f}% | {r[3]:5.2f} {r[4]:5.2f} {r[5]:5.2f} {r[6]:5.1f}")
