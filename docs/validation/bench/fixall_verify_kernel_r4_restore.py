# Run: python3 fixall_verify_kernel_r4_restore.py   (stdlib only; our own arithmetic, no reference code)
# Verifier sim (fixall/verify-kernel-r4): split restoration's hot-pixel test after an interleaved same-level change.
# Kerb route P-Q (L2). V: a finer vertex placed within the hot pixel of P-Q, then promoted to L2 by a (b) promotion.
# Later a second same-level vertex W (another neighbour step's promotion, or a same-level split) lands on the run
# between P and V or V and Q, placed within the hot pixel of the current L2 sub-edge. Then the chain that promoted V
# is removed: V is restored only if it lies within the hot pixel of the segment between its nearest L<=2 vertices.
import random, math
HOT = math.sqrt(0.5)
def rnd(p): return (math.floor(p[0]+0.5), math.floor(p[1]+0.5))
def seg_dist(p,a,b):
    ex,ey=b[0]-a[0],b[1]-a[1]; L2=ex*ex+ey*ey
    t=max(0.0,min(1.0,((p[0]-a[0])*ex+(p[1]-a[1])*ey)/L2)); return math.dist(p,(a[0]+t*ex,a[1]+t*ey))
R=random.Random(4242); N=200000; fail=0; cases=0; mx=0.0
for _ in range(N):
    th=R.uniform(0,2*math.pi); L=R.uniform(500,6000); c=(R.uniform(-1e5,1e5),R.uniform(-1e5,1e5))
    P=rnd((c[0]-L/2*math.cos(th),c[1]-L/2*math.sin(th))); Q=rnd((c[0]+L/2*math.cos(th),c[1]+L/2*math.sin(th)))
    L=math.dist(P,Q); ex,ey=(Q[0]-P[0])/L,(Q[1]-P[1])/L
    tv=R.uniform(60,L-60); V=rnd((P[0]+tv*ex,P[1]+tv*ey))
    if seg_dist(V,P,Q)>HOT: continue
    # W on P-V or V-Q, nearest lattice point to an exact point on that sub-edge, >= 25 cm from its ends
    if R.random()<0.5: A,B=P,V
    else: A,B=V,Q
    l=math.dist(A,B)
    if l<60: continue
    tw=R.uniform(25,l-25); W=rnd((A[0]+(B[0]-A[0])*tw/l,A[1]+(B[1]-A[1])*tw/l))
    if seg_dist(W,A,B)>HOT or min(math.dist(W,A),math.dist(W,B))<25: continue
    cases+=1
    a,b=(W,Q) if A==P else (P,W)
    d=seg_dist(V,a,b); mx=max(mx,d); fail+= d>HOT+1e-12
print('cases %d; V refused restoration (beyond the hot pixel of its new neighbours\' segment) in %d (%.2f %%); largest %.3f cm'%(cases,fail,100.0*fail/cases,mx))
