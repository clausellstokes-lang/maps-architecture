# Verifier check of §3.6 step 2 as written: a chain vertex within attractCm (26) of an existing
# vertex moves onto it; otherwise, within attractCm of an existing edge, it moves onto that edge
# at the lattice point nearest the foot (splitThrough). Question: can the resulting sub-edge from
# the split point to the edge's endpoint be shorter than minEdge (25)?
import random, math
random.seed(7)
MIN, ATT = 25, 26
# 1) the constructive counterexample
A=(0,0); B=(1000,0); v=(20,20)
dA=math.dist(v,A); foot=(round(v[0]),0)
print("counterexample: v=(20,20) dist to A=%.2f (>26, not vertex-attracted); dist to edge=20 (<=26); split at %s; sub-edge A-split=%.1f cm < 25" % (dA, foot, math.dist(A,foot)))
# 2) Monte Carlo: polyline with Chaikin-like segment lengths (lognormal, median 790 cm), chain vertices
#    dropped uniformly within the 26 cm band around the polyline (the ones that step 2 attracts to an edge or vertex)
N=200000; short=0; attracted_edge=0; attracted_vertex=0
for _ in range(N):
    L = max(60, random.lognormvariate(math.log(790), 0.5))
    # vertex at x=0 and x=L on a straight segment; uniform point in the band [−26, L+26] x [−26, 26]
    x = random.uniform(-26, L+26); y = random.uniform(-26, 26)
    dA = math.hypot(x, y); dB = math.hypot(x-L, y)
    if dA <= ATT or dB <= ATT: attracted_vertex += 1; continue
    if 0 <= x <= L and abs(y) <= ATT:
        attracted_edge += 1
        fx = round(x)
        if fx < MIN or L - fx < MIN: short += 1
print("band samples %d: to vertex %d, to edge %d, sub-minEdge sub-edge after split %d (%.3f%% of edge attractions)" % (N, attracted_vertex, attracted_edge, short, 100*short/attracted_edge))
