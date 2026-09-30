# usage: python3 fixall_verify_scope_o9c_rank.py <K>   (the .out holds K = 50 and K = 99)
# Calibrated alternative for O9 (c): the rank of each regenerated statistic among K from-scratch generations is
# exactly uniform on {0..K} for a perfect regenerator (exchangeability). Campaign test: chi-square on a 10-bin rank
# histogram per statistic, Holm over the 4 statistics, fail at family-wise p < 0.01.
import random, math
random.seed(7)
def gammq(a,x):  # regularized upper incomplete gamma Q(a,x)
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
def campaign(K,n,ranks_fn):
    ps=[]
    for s in range(4):
        bins=[0]*10
        for _ in range(n):
            r=ranks_fn(s)             # rank in 0..K
            bins[min(9, r*10//(K+1))]+=1
        widths=[0]*10
        for r in range(K+1): widths[min(9, r*10//(K+1))]+=1
        ps.append(chi2_p(bins, widths))
    ps.sort()
    for i,p in enumerate(ps):          # Holm at 0.01
        if p < 0.01/(4-i): return True
        else: break
    return False
import sys
K,n=int(sys.argv[1]),400
# H0: perfect regenerator -> exact uniform ranks
fails=sum(campaign(K,n,lambda s: random.randint(0,K)) for _ in range(2000))
print(f"H0 perfect regenerator, K={K}, n={n}: false campaign failures {fails}/2000 = {fails/2000:.4f} (target <= 0.01)")
# H1: 'too snug' regenerator: regenerated statistic has 0.6x the from-scratch spread (FTG's failure)
def snug_rank(s):
    x=random.gauss(0,0.6); return sum(1 for _ in range(K) if random.gauss(0,1)<x)
fails=sum(campaign(K,n,snug_rank) for _ in range(100))
print(f"H1 too-snug regenerator (0.6x spread), K={K}, n={n}: campaigns failed {fails}/100 (power)")
