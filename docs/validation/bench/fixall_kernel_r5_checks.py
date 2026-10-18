# fix-all round 5, kernel lane (fixall/draft-kernel-r5). Our own arithmetic; no reference code.
#   A  VK4-3 / VK4-2: a finer vertex V on a route P-Q, promoted onto it; then k = 0..4 later same-level vertices (splits or
#      promotions: each placed by nearest-point rounding within the hot pixel of the route sub-edge it lands on, at least
#      minEdge from that sub-edge's ends); then the chain that promoted V is removed.
#      (i)  the round-4 restoration test (V within the hot pixel of the segment between its current nearest route
#           vertices) - how often it refuses;
#      (ii) V's distance from the route edge that spans it once it is restored (the standing drift K4-1 admits), and
#           whether V lies inside that route edge's run box (the bounding box of the run's vertices, padded by the hot
#           pixel) - the box the index gives the joined item (Section 3.3);
#      (a former column (iii), 'route restored', was dropped in the consistency pass (VK5-3, 2026-09-26): it compared
#      route[:j] + route[j+1:] with [q for q in route if q != V], two lists equal by construction, so it measured
#      nothing; that a demoted vertex leaves the coarser route holds by the definition of a route, and Section 2.2 now
#      says so instead of citing this column. Columns (i) and (ii) and table B are unchanged: the dropped comparison drew
#      no random numbers.)
#   B  VK4-2: the standing drift of every finer vertex on a run after k successive same-level route changes (the figure
#      Section 3.1's planar-subdivision row quotes).
# Run: python3 fixall_kernel_r5_checks.py
import random, math
MIN = 25.0
HOT = math.sqrt(0.5)

def seg_dist(p, a, b):
    ex, ey = b[0]-a[0], b[1]-a[1]; L2 = ex*ex+ey*ey
    t = max(0.0, min(1.0, ((p[0]-a[0])*ex + (p[1]-a[1])*ey) / L2))
    return math.dist(p, (a[0]+t*ex, a[1]+t*ey))

def rnd(p): return (math.floor(p[0] + 0.5), math.floor(p[1] + 0.5))

def lattice_edge(R, Lmin=500, Lmax=6000):
    th = R.uniform(0, 2*math.pi); L = R.uniform(Lmin, Lmax)
    c = (R.uniform(-1e5, 1e5), R.uniform(-1e5, 1e5))
    return (rnd((c[0]-L/2*math.cos(th), c[1]-L/2*math.sin(th))), rnd((c[0]+L/2*math.cos(th), c[1]+L/2*math.sin(th))))

def place_on(R, a, b):
    """nearest lattice point to an exact point of a-b at least MIN from both ends; None if it is not within the hot
    pixel of a-b or not MIN from the ends (the placement rule would pick another point; we skip those cases)"""
    L = math.dist(a, b)
    if L < 2*MIN + 10: return None
    t = R.uniform(MIN, L - MIN)
    p = rnd((a[0] + (b[0]-a[0])*t/L, a[1] + (b[1]-a[1])*t/L))
    if seg_dist(p, a, b) > HOT + 1e-12 or min(math.dist(p, a), math.dist(p, b)) < MIN: return None
    return p

def along(p, a, b):
    ex, ey = b[0]-a[0], b[1]-a[1]
    return ((p[0]-a[0])*ex + (p[1]-a[1])*ey) / math.hypot(ex, ey)

def run_box_has(run, p):
    return (min(q[0] for q in run) - HOT <= p[0] <= max(q[0] for q in run) + HOT and
            min(q[1] for q in run) - HOT <= p[1] <= max(q[1] for q in run) + HOT)

print('== A  VK4-3: split restoration after k later same-level vertices on the promoted vertex\'s route ==')
print('   (column (iii) "route restored" dropped in the consistency pass, VK5-3: it compared two lists equal by construction)')
print('   k   cases   round-4 test refuses   largest drift of V from its restored route edge   V outside the run box')
for k in range(0, 5):
    R = random.Random(5050 + k)
    cases = refuse = outside = 0; mx = 0.0
    while cases < 100000:
        P, Q = lattice_edge(R)
        V = place_on(R, P, Q)
        if V is None: continue
        route = [P, V, Q]                                # V promoted onto the route (nothing moves)
        ok = True
        for _ in range(k):                               # later same-level vertices anywhere on the route
            i = R.randrange(len(route) - 1)
            W = place_on(R, route[i], route[i+1])
            if W is None or any(math.dist(W, q) < MIN for q in route): ok = False; break
            route = route[:i+1] + [W] + route[i+1:]
        if not ok: continue
        cases += 1
        j = route.index(V); a, b = route[j-1], route[j+1]
        refuse += seg_dist(V, a, b) > HOT + 1e-12        # the round-4 clause (dropped in round 5)
        d = seg_dist(V, a, b); mx = max(mx, d)
        outside += not run_box_has([a, b, V], V)         # the joined item's box: the run's vertices a..V..b, padded
    print('  %2d  %6d   %6d (%.2f %%)            %.3f cm                                        %d'
          % (k, cases, refuse, 100.0*refuse/cases, mx, outside))

print()
print('== B  VK4-2: standing drift of finer vertices after k successive same-level changes of their route ==')
print('   k   cases   finer vertices beyond the hot pixel   largest distance from the spanning route edge')
for k in range(1, 5):
    R = random.Random(7070 + k)
    cases = beyond = 0; mx = 0.0; nf = 0
    while cases < 50000:
        P, Q = lattice_edge(R)
        fin = []
        for _ in range(R.randint(2, 8)):                 # finer vertices, each placed on the route as it then was
            p = place_on(R, P, Q)
            if p is not None and all(math.dist(p, q) >= MIN for q in fin + [P, Q]): fin.append(p)
        if len(fin) < 2: continue
        route = [P, Q]; ok = True
        for _ in range(k):                               # k same-level changes: a split of a route sub-edge, or a promotion of a finer vertex
            if R.random() < 0.5 and len(fin) > 0:
                v = fin.pop(R.randrange(len(fin)))
                i = max(i for i in range(len(route) - 1) if along(route[i], P, Q) <= along(v, P, Q))
                route = route[:i+1] + [v] + route[i+1:]
            else:
                i = R.randrange(len(route) - 1)
                W = place_on(R, route[i], route[i+1])
                if W is None or any(math.dist(W, q) < MIN for q in route + fin): ok = False; break
                route = route[:i+1] + [W] + route[i+1:]
        if not ok or not fin: continue
        cases += 1
        for p in fin:
            s = along(p, P, Q)
            i = max(i for i in range(len(route) - 1) if along(route[i], P, Q) <= s)
            d = seg_dist(p, route[i], route[i+1]); nf += 1
            beyond += d > HOT + 1e-12; mx = max(mx, d)
    print('  %2d  %6d   %6d of %6d (%.2f %%)                %.3f cm' % (k, cases, beyond, nf, 100.0*beyond/nf, mx))
