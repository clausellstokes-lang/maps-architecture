# fix-all round 3, kernel lane (fixall/draft-kernel-r3). Our own arithmetic; no reference code.
#   A  VK2-6: re-seating a Steiner vertex (or sliding a vertex) onto a route beside a vertex 25.0-25.7 cm from it:
#      plain nearest-point rounding against the placement rule's (i)-(iii); the verifier's 25.3 cm fixture
#   B  VK2-8: splitting a width-profiled chain between two knots: the old re-key (each part keeps only its own knots)
#      against cut knots carrying the sampled value; a re-join that drops the cut knots
#   C  VK2-4: canonical face keys read on the full ring against the level-n route, before and after an L4 vertex
# Run: python3 fixall_kernel_r3_checks.py
import random, math
MIN, ATT, HOT = 25.0, 26.0, 0.71

def seg_dist(p, a, b):
    ex, ey = b[0]-a[0], b[1]-a[1]; L2 = ex*ex+ey*ey
    t = max(0.0, min(1.0, ((p[0]-a[0])*ex + (p[1]-a[1])*ey) / L2))
    return math.dist(p, (a[0]+t*ex, a[1]+t*ey))

def line_dist(p, a, b):
    ex, ey = b[0]-a[0], b[1]-a[1]
    return abs((p[0]-a[0])*ey - (p[1]-a[1])*ex) / math.hypot(ex, ey)

def ok(q, a, b, u):
    """placement rule (i)-(iii) for a vertex q on the route a-b beside the vertex u"""
    return (line_dist(q, a, b) <= HOT and math.dist(q, a) >= MIN and math.dist(q, b) >= MIN
            and math.dist(q, u) >= MIN and seg_dist(u, a, q) >= MIN and seg_dist(u, q, b) >= MIN)

def place(p, a, b, u):
    """nearest qualifying lattice point to p, searched outward (never beyond attractCm); ties y then x"""
    for r in range(0, int(ATT) + 1):
        cand = [(ix, iy) for ix in range(math.floor(p[0]) - r, math.floor(p[0]) + r + 2)
                for iy in range(math.floor(p[1]) - r, math.floor(p[1]) + r + 2)]
        good = [q for q in cand if ok(q, a, b, u)]
        if good:
            return min(good, key=lambda q: (math.dist(p, q), q[1], q[0]))
    return None

print('== A  VK2-6 re-seat / slide beside a vertex 25.0-25.7 cm from the route ==')
random.seed(2026)
K = 200000; plain_bad = rule_bad = none = 0; move = 0.0; off = 0.0
for _ in range(K):
    th = random.uniform(0, 2*math.pi); tx, ty = math.cos(th), math.sin(th); nx, ny = -ty, tx
    c = (random.uniform(-1e5, 1e5), random.uniform(-1e5, 1e5))
    a = (round(c[0]-2000*tx), round(c[1]-2000*ty)); b = (round(c[0]+2000*tx), round(c[1]+2000*ty))
    # u: a lattice vertex standing 25.0-25.7 cm from the (moved or fixed) route, near its middle
    ex, ey = b[0]-a[0], b[1]-a[1]; L = math.hypot(ex, ey); ux_, uy_ = ex/L, ey/L
    s0 = random.uniform(0.4, 0.6)*L; d = random.uniform(25.0, 25.7)
    u = (round(a[0]+s0*ux_ - d*uy_), round(a[1]+s0*uy_ + d*ux_))
    if seg_dist(u, a, b) < MIN or seg_dist(u, a, b) > 25.7: continue   # the arrangement before the step obeys clearance
    # p: the exact projection of the re-seated (or sliding) vertex, within a few cm of u's foot
    sp = s0 + random.uniform(-3.0, 3.0)
    p = (a[0]+sp*ux_, a[1]+sp*uy_)
    q = (round(p[0]), round(p[1]))
    if not ok(q, a, b, u): plain_bad += 1
    q2 = place(p, a, b, u)
    if q2 is None: none += 1; continue
    if not ok(q2, a, b, u): rule_bad += 1
    move = max(move, math.dist(p, q2)); off = max(off, line_dist(q2, a, b))
print('%d re-seats: plain nearest-point rounding breaks minEdge or clearance in %d (%.2f %%); the placement rule in %d, '
      'no qualifying point in %d; largest move from the exact projection %.3f cm; largest distance from the route %.3f cm'
      % (K, plain_bad, 100.0*plain_bad/K, rule_bad, none, move, off))
# the verifier's fixture: a warp moves a kerb so that it runs (0,0)-(1000,9); a vertex stands 25.35 cm from it; a Steiner
# vertex on the kerb is re-seated at the projection of its field target, which falls at that vertex's foot
a, b, u = (0, 0), (1000, 9), (517, 30)
du = line_dist(u, a, b); ex, ey = b; L = math.hypot(ex, ey); t = (u[0]*ex + u[1]*ey) / L; p = (t*ex/L, t*ey/L)
q = (round(p[0]), round(p[1])); q2 = place(p, a, b, u)
print('fixture: route (0,0)-(1000,9), vertex (517,30) at %.2f cm; exact projection (%.2f, %.2f): plain rounding -> %s '
      '(vertex-to-sub-edge %.3f cm, %s); placement rule -> %s (%.3f cm, %s; moved %.2f cm)'
      % (du, p[0], p[1], q, min(seg_dist(u, a, q), seg_dist(u, q, b)), 'rejected' if not ok(q, a, b, u) else 'accepted',
         q2, min(seg_dist(u, a, q2), seg_dist(u, q2, b)), 'accepted' if ok(q2, a, b, u) else 'rejected', math.dist(p, q2)))

print('== B  VK2-8 split of a width profile between two knots ==')
def arc(chain):
    s = [0.0]
    for i in range(1, len(chain)): s.append(s[-1] + math.dist(chain[i-1], chain[i]))
    return s
def sample(chain, knots, start=0.0):
    """knots: list of (vertex index, value); linear by arc length; constant beyond the end knots"""
    s = arc(chain); s = [start + v for v in s] if start else s
    out = []
    for i in range(len(chain)):
        if i <= knots[0][0]: out.append(knots[0][1]); continue
        if i >= knots[-1][0]: out.append(knots[-1][1]); continue
        for (ia, va), (ib, vb) in zip(knots, knots[1:]):
            if ia <= i <= ib:
                out.append(va + (vb - va) * ((s[i] - s[ia]) / (s[ib] - s[ia]))); break
    return out
random.seed(8)
T = 20000; old_max = 0.0; new_max = 0.0; exact_new = 0; total_new = 0; rejoin_exact = 0
for _ in range(T):
    n = random.randint(12, 60); x, y, h = 0, 0, random.uniform(0, 6.283); chain = [(0, 0)]
    for _ in range(n - 1):
        h += random.uniform(-0.3, 0.3); L = random.uniform(400, 1500)
        x, y = round(x + L*math.cos(h)), round(y + L*math.sin(h)); chain.append((x, y))
    ka = random.randint(0, n//3); kb = random.randint(ka + 3, n - 1)
    knots = [(ka, random.randint(300, 1200)), (kb, random.randint(300, 1200))]
    j = random.randint(ka + 1, kb - 1)                       # the split vertex, strictly between the knots
    full = sample(chain, knots)
    A, B = chain[:j+1], chain[j:]
    # old: each part keeps only the knots on it -> constant from the last knot to the split point and beyond
    oldA = sample(A, [knots[0]]); oldB = sample(B, [(kb - j, knots[1][1])])
    old = oldA + oldB[1:]
    old_max = max(old_max, max(abs(p - q) for p, q in zip(old, full)))
    # new: a cut knot at j on each part carrying the sampled value there (the exact double)
    vj = full[j]
    newA = sample(A, [knots[0], (j, vj)]); newB = sample(B, [(0, vj), (kb - j, knots[1][1])])
    new = newA + newB[1:]
    dmax = max(abs(p - q) for p, q in zip(new, full)); new_max = max(new_max, dmax)
    exact_new += sum(1 for p, q in zip(new, full) if p == q); total_new += len(full)
    # re-join: the two cut knots at j carry one value; drop it when it equals the interpolation of its neighbours
    s = arc(chain); interp = knots[0][1] + (knots[1][1] - knots[0][1]) * ((s[j] - s[ka]) / (s[kb] - s[ka]))
    joined_knots = knots if abs(vj - interp) <= 1e-9 else [knots[0], (j, vj), knots[1]]
    if sample(chain, joined_knots) == full: rejoin_exact += 1
print('%d random ways (12-60 vertices, 4-15 m segments), two width knots 3-12 m, split strictly between them:' % T)
print('  old re-key (each part keeps its own knots): largest change of a sampled width %.1f cm' % old_max)
print('  cut knots with the sampled value: largest change %.2e cm; %.2f %% of samples bit-identical; '
      're-join restores the original profile bit for bit in %d of %d' % (new_max, 100.0*exact_new/total_new, rejoin_exact, T))

print('== C  VK2-4 canonical face keys: full ring vs the level-n route ==')
O, P1, Q, R = (0, 0), (1000, 400), (600, 900), (0, 900)
F1 = [O, P1, Q]; F2 = [O, Q, R]                            # two L3 faces sharing their lowest-leftmost vertex O
def key_full(ring):
    i = min(range(len(ring)), key=lambda k: (ring[k][1], ring[k][0]))
    nxt = ring[(i+1) % len(ring)]; return ((ring[i][1], ring[i][0]), (nxt[1], nxt[0]))
before = sorted([('F1', key_full(F1)), ('F2', key_full(F2))], key=lambda t: t[1])
S = (20, 30)                                                  # an L4 vertex S11 places on the shared edge O-Q (on the segment, 36 cm from O)
F1_full = [O, P1, Q, S]; F2_full = [O, S, Q, R]              # F1 walks Q -> S -> O, F2 walks O -> S -> Q
after_full = sorted([('F1', key_full(F1_full)), ('F2', key_full(F2_full))], key=lambda t: t[1])
lvl = {O: 3, P1: 3, Q: 3, R: 3, S: 4}
route = lambda ring, n: [v for v in ring if lvl[v] <= n]
after_route = sorted([('F1', key_full(route(F1_full, 3))), ('F2', key_full(route(F2_full, 3)))], key=lambda t: t[1])
print('L3 order before L4: %s; after L4, keyed on the full ring: %s; keyed on the L3 route: %s'
      % ([f for f, _ in before], [f for f, _ in after_full], [f for f, _ in after_route]))
