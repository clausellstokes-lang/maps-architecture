# fix-all round 4, kernel lane (fixall/draft-kernel-r4). Our own arithmetic; no reference code.
#   A  VK3-3 / K4-1: a same-level change of a coarser route (a promotion, a same-level split, a demotion) moves no vertex,
#      so the finer vertices already on that route can end up farther than the hot pixel from the new route edge;
#      demotion after a promotion restores the route exactly; which index box covers the finer vertices
#   B  VK3-4: two re-seats on one warped route placed in the two possible orders
#   C  VK3-9: removing a stretch of a width-profiled way (and of a profiled ring) with and without cut knots at its ends
# Run: python3 fixall_kernel_r4_checks.py
import random, math
MIN, ATT = 25.0, 26.0
HOT = math.sqrt(0.5)          # half a lattice diagonal, 0.7071 cm

def seg_dist(p, a, b):
    ex, ey = b[0]-a[0], b[1]-a[1]; L2 = ex*ex+ey*ey
    t = max(0.0, min(1.0, ((p[0]-a[0])*ex + (p[1]-a[1])*ey) / L2))
    return math.dist(p, (a[0]+t*ex, a[1]+t*ey))

def line_dist(p, a, b):
    ex, ey = b[0]-a[0], b[1]-a[1]
    return abs((p[0]-a[0])*ey - (p[1]-a[1])*ex) / math.hypot(ex, ey)

def rnd(p): return (math.floor(p[0] + 0.5), math.floor(p[1] + 0.5))

def lattice_edge(R, Lmin=500, Lmax=6000):
    th = R.uniform(0, 2*math.pi); L = R.uniform(Lmin, Lmax)
    c = (R.uniform(-1e5, 1e5), R.uniform(-1e5, 1e5))
    u = rnd((c[0]-L/2*math.cos(th), c[1]-L/2*math.sin(th))); w = rnd((c[0]+L/2*math.cos(th), c[1]+L/2*math.sin(th)))
    return u, w

def points_on(R, a, b, k, gap=30.0):
    """k finer vertices placed on the route a-b at the nearest lattice point to an exact point on it (each within the
    hot pixel of a-b), at least `gap` cm apart and from the ends"""
    L = math.dist(a, b); ts = []
    for _ in range(200):
        if len(ts) == k: break
        t = R.uniform(gap, L - gap)
        if all(abs(t - s) >= gap for s in ts): ts.append(t)
    ts.sort(); ex, ey = (b[0]-a[0])/L, (b[1]-a[1])/L
    return [rnd((a[0]+t*ex, a[1]+t*ey)) for t in ts]

def dev_after(route, finer):
    """largest distance of each finer vertex from the route edge that spans it (route: ordered vertices; finer: ordered
    vertices on the run, each assigned to the route edge by its position along the run)"""
    out = []
    order = sorted(route + finer, key=lambda p: math.dist(p, route[0]))
    rset = set(route); cur = 0
    for p in order:
        if p in rset: cur = route.index(p); continue
        a, b = route[cur], route[min(cur+1, len(route)-1)]
        out.append((p, a, b, seg_dist(p, a, b)))
    return out

def box_miss(a, b, p, pad=HOT):
    return not (min(a[0], b[0]) - pad <= p[0] <= max(a[0], b[0]) + pad and min(a[1], b[1]) - pad <= p[1] <= max(a[1], b[1]) + pad)

print('== A  VK3-3 / K4-1: same-level route changes over finer vertices ==')
R = random.Random(2026)
N = 100000
prom_bad = prom_max = 0; split_bad = split_max = 0; gen2_bad = gen2_max = 0; restored = 0; ep_miss = run_miss = 0; cases = 0
for _ in range(N):
    u, w = lattice_edge(R)
    k = R.randint(2, 10)
    fin = points_on(R, u, w, k)
    if len(fin) < 2 or any(line_dist(p, u, w) > HOT + 1e-12 for p in fin): continue
    cases += 1
    before_route = [u, w]
    # promotion of one finer vertex v (candidate (b)): the route becomes u - v - w; nothing moves
    j = R.randrange(len(fin)); v = fin[j]; others = fin[:j] + fin[j+1:]
    d = dev_after([u, v, w], others)
    m = max(x[3] for x in d) if d else 0.0; prom_max = max(prom_max, m); prom_bad += m > HOT + 1e-12
    for p, a, b, _ in d:
        ep_miss += box_miss(a, b, p)
        run = [a, b] + [q for q, a2, b2, _ in d if (a2, b2) == (a, b)]
        bx = (min(q[0] for q in run) - HOT, max(q[0] for q in run) + HOT, min(q[1] for q in run) - HOT, max(q[1] for q in run) + HOT)
        run_miss += not (bx[0] <= p[0] <= bx[1] and bx[2] <= p[1] <= bx[3])
    # the reversal (the promoting chain removed): v passes the demotion test (within the hot pixel of u-w) and returns;
    # the route is u - w again, vertex for vertex
    if seg_dist(v, u, w) <= HOT + 1e-12 and [u, w] == before_route: restored += 1
    # second generation: finer vertices placed on u-v and v-w after the promotion, then v demoted
    new = points_on(R, u, v, R.randint(0, 3)) + points_on(R, v, w, R.randint(0, 3)) if min(math.dist(u, v), math.dist(v, w)) > 90 else []
    new = [p for p in new if all(math.dist(p, q) >= MIN for q in fin)]
    if new:
        d2 = dev_after([u, w], new); m2 = max(x[3] for x in d2); gen2_max = max(gen2_max, m2); gen2_bad += m2 > HOT + 1e-12
    # a same-level split x of u-w placed at the nearest lattice point to an exact point on it, >= minEdge from every finer vertex
    L = math.dist(u, w)
    for _ in range(20):
        t = R.uniform(MIN, L - MIN); x = rnd((u[0]+(w[0]-u[0])*t/L, u[1]+(w[1]-u[1])*t/L))
        if all(math.dist(x, q) >= MIN for q in fin) and math.dist(x, u) >= MIN and math.dist(x, w) >= MIN: break
    else:
        continue
    d3 = dev_after([u, x, w], fin); m3 = max(x_[3] for x_ in d3); split_max = max(split_max, m3); split_bad += m3 > HOT + 1e-12
print('%d random L2 route edges (5-60 m), 2-10 finer vertices on each, each placed within the hot pixel (%.4f cm):' % (cases, HOT))
print('  promotion of one finer vertex: in %d cases (%.2f %%) another finer vertex ends farther than the hot pixel from its '
      'new route edge; the largest distance %.3f cm' % (prom_bad, 100.0*prom_bad/cases, prom_max))
print('  a same-level split placed at the nearest lattice point: %d cases (%.2f %%) over the hot pixel; the largest %.3f cm'
      % (split_bad, 100.0*split_bad/cases, split_max))
print('  finer vertices placed after a promotion, then the promoted vertex demoted: %d cases over the hot pixel; the largest %.3f cm'
      % (gen2_bad, gen2_max))
print('  demotion after the promotion (the promoting chain removed): the route restored vertex for vertex in %d of %d' % (restored, cases))
print('  index boxes after a promotion: finer vertices outside (route-edge endpoints box + hot pixel) %d; outside (box of the '
      'run\'s vertices + hot pixel) %d' % (ep_miss, run_miss))
# the same, with each finer vertex at a qualifying lattice point that is not always the nearest one (the placement rule
# moves a point along its edge when the nearest breaks minEdge or clearance, section 3.6): rounding is then no longer
# monotone along the line, and the route-edge endpoints' box can miss a finer vertex that the box of the run's vertices holds
def points_on_any(R, a, b, k, gap=30.0):
    L = math.dist(a, b); ts = []
    for _ in range(200):
        if len(ts) == k: break
        t = R.uniform(gap, L - gap)
        if all(abs(t - s) >= gap for s in ts): ts.append(t)
    ts.sort(); ex, ey = (b[0]-a[0])/L, (b[1]-a[1])/L; out = []
    for t in ts:
        e = (a[0]+t*ex, a[1]+t*ey)
        cand = [(ix, iy) for ix in range(math.floor(e[0]) - 3, math.floor(e[0]) + 4) for iy in range(math.floor(e[1]) - 3, math.floor(e[1]) + 4)
                if line_dist((ix, iy), a, b) <= HOT and math.dist((ix, iy), e) <= 3.0]
        out.append(R.choice(cand) if cand else rnd(e))
    return out
R = random.Random(77); ep2 = run2 = tot2 = 0
for _ in range(100000):
    u, w = lattice_edge(R, 500, 3000)
    fin = [p for p in points_on_any(R, u, w, R.randint(2, 8)) if line_dist(p, u, w) <= HOT]
    if len(fin) < 2: continue
    j = R.randrange(len(fin)); v = fin[j]; d = dev_after([u, v, w], fin[:j] + fin[j+1:])
    for p, a, b, _ in d:
        tot2 += 1; ep2 += box_miss(a, b, p)
        run = [a, b] + [q for q, a2, b2, _ in d if (a2, b2) == (a, b)]
        run2 += not (min(q[0] for q in run) - HOT <= p[0] <= max(q[0] for q in run) + HOT and min(q[1] for q in run) - HOT <= p[1] <= max(q[1] for q in run) + HOT)
print('  the same with finer vertices at any qualifying lattice point within 3 cm of the exact point (the placement rule\'s '
      'non-nearest choices): %d finer vertices after a promotion; outside the endpoints\' box + hot pixel %d; outside the '
      'run\'s box + hot pixel %d' % (tot2, ep2, run2))
# the demotion test refuses a promoted vertex a warp moved off the line
u, w, v = (0, 0), (2000, 0), (1000, 0); vw = (1000, 6)
print('  demotion test: promoted vertex on the line %.3f cm from u-w -> demoted; the same vertex after a warp moved it 6 cm '
      '-> %.3f cm, refused (it stays a vertex of the coarser route)' % (seg_dist(v, u, w), seg_dist(vw, u, w)))

print('== B  VK3-4: two re-seats on one warped route, placed in either order ==')
def ok2(q, a, b, other):
    return (line_dist(q, a, b) <= HOT + 1e-12 and math.dist(q, a) >= MIN and math.dist(q, b) >= MIN and math.dist(q, other) >= MIN)
def place2(p, a, b, other):
    for r in range(0, int(ATT) + 1):
        cand = [(ix, iy) for ix in range(math.floor(p[0]) - r, math.floor(p[0]) + r + 2)
                for iy in range(math.floor(p[1]) - r, math.floor(p[1]) + r + 2)]
        good = [q for q in cand if ok2(q, a, b, other) and math.dist(p, q) <= ATT]
        if good:
            return min(good, key=lambda q: (math.dist(p, q), q[1], q[0]))
    return None
R = random.Random(44)
T = 20000; differ = 0; valid_both = 0; tried = 0
for _ in range(T):
    th = R.uniform(0, 2*math.pi); L = R.uniform(1000, 4000)
    a = (0, 0); b = rnd((L*math.cos(th), L*math.sin(th))); Lr = math.dist(a, b); ex, ey = b[0]/Lr, b[1]/Lr
    s = R.uniform(200, Lr - 300); gap = R.uniform(25.0, 26.5)           # the two projections lie minEdge + 0-1.5 cm apart
    pA = (s*ex, s*ey); pB = ((s+gap)*ex, (s+gap)*ey)
    tA, tB = rnd(pA), rnd(pB)                                            # their rounded targets
    tried += 1
    A1 = place2(pA, a, b, tB); B1 = place2(pB, a, b, A1) if A1 else None      # A first, reading B at its rounded target
    B2 = place2(pB, a, b, tA); A2 = place2(pA, a, b, B2) if B2 else None      # B first
    if None in (A1, B1, A2, B2): continue
    valid_both += 1
    if (A1, B1) != (A2, B2): differ += 1
print('%d pairs of Steiner vertices re-seated onto one warped route, their projections 25.0-26.5 cm apart: both orders place '
      'both vertices validly in %d; the placed points differ between the two orders in %d (%.2f %%)'
      % (tried, valid_both, differ, 100.0*differ/max(1, valid_both)))

print('== C  VK3-9: removing a stretch of a profiled chain ==')
def arc(chain):
    s = [0.0]
    for i in range(1, len(chain)): s.append(s[-1] + math.dist(chain[i-1], chain[i]))
    return s
def sample(chain, knots):
    """knots: list of (vertex index, value), ascending; linear by arc length; constant beyond the end knots"""
    s = arc(chain); out = []
    for i in range(len(chain)):
        if i <= knots[0][0]: out.append(knots[0][1]); continue
        if i >= knots[-1][0]: out.append(knots[-1][1]); continue
        for (ia, va), (ib, vb) in zip(knots, knots[1:]):
            if ia <= i <= ib:
                out.append(va + (vb - va) * ((s[i] - s[ia]) / (s[ib] - s[ia]))); break
    return out
def rand_chain(R, n, closed=False):
    if closed:
        r = R.uniform(4000, 12000); pts = []
        for i in range(n):
            ang = 2*math.pi*i/n; rr = r*R.uniform(0.85, 1.15); pts.append(rnd((rr*math.cos(ang), rr*math.sin(ang))))
        return pts
    x, y, h = 0, 0, R.uniform(0, 6.283); chain = [(0, 0)]
    for _ in range(n - 1):
        h += R.uniform(-0.3, 0.3); L = R.uniform(400, 1500)
        x, y = round(x + L*math.cos(h)), round(y + L*math.sin(h)); chain.append((x, y))
    return chain
R = random.Random(9)
T = 20000; naive_max = cut_max = 0.0
for _ in range(T):
    n = R.randint(16, 60); chain = rand_chain(R, n)
    kidx = sorted(R.sample(range(n), R.randint(2, 5))); knots = [(i, R.randint(300, 1200)) for i in kidx]
    i = R.randint(1, n - 6); j = R.randint(i + 2, n - 2)           # the stretch between two vertices (two junctions)
    full = sample(chain, knots)
    A, B = chain[:i+1], chain[j:]
    kA = [(ix, v) for ix, v in knots if ix <= i]; kB = [(ix - j, v) for ix, v in knots if ix >= j]
    # naive: each remaining part keeps the knots on it (a part with none takes the value of the nearest knot beyond it)
    def fallback(part_knots, idx_end, nearest):
        return part_knots if part_knots else [(idx_end, nearest)]
    nearA = min(knots, key=lambda kv: abs(kv[0] - i))[1]; nearB = min(knots, key=lambda kv: abs(kv[0] - j))[1]
    nA = sample(A, fallback(kA, 0, nearA)); nB = sample(B, fallback(kB, 0, nearB))
    naive = nA + nB; ref = full[:i+1] + full[j:]
    naive_max = max(naive_max, max(abs(p - q) for p, q in zip(naive, ref)))
    # cut knots at the stretch's two ends carrying the sampled values there (rule 5)
    cA = sorted(set(kA + [(i, full[i])])) if not any(ix == i for ix, _ in kA) else kA
    cB = sorted(set([(0, full[j])] + kB)) if not any(ix == 0 for ix, _ in kB) else kB
    cut = sample(A, cA) + sample(B, cB)
    cut_max = max(cut_max, max(abs(p - q) for p, q in zip(cut, ref)))
print('%d random ways (16-60 vertices), 2-5 width knots, a stretch between two interior vertices removed:' % T)
print('  the remaining parts keeping only their own knots: largest change of a sampled width %.1f cm' % naive_max)
print('  a cut knot at each end of the removed stretch carrying the sampled value: largest change %.2e cm' % cut_max)
# a profiled ring (a wall trace's base profile, linear, cyclic) opened by removing the stretch between two anchors
def sample_ring(ring, knots):
    n = len(ring); s = arc(ring + [ring[0]]); per = s[-1]; out = []
    ks = sorted(knots)
    for i in range(n):
        # the knot before i and the knot after i, cyclically
        prev = max([k for k in ks if k[0] <= i], default=ks[-1]); nxt = min([k for k in ks if k[0] > i], default=ks[0])
        if prev[0] == i: out.append(prev[1]); continue
        s0 = s[prev[0]]; s1 = s[nxt[0]] if nxt[0] > prev[0] else s[nxt[0]] + per; si = s[i] if s[i] >= s0 else s[i] + per
        out.append(prev[1] + (nxt[1] - prev[1]) * (si - s0) / (s1 - s0))
    return out
R = random.Random(10)
T = 5000; rnaive = rcut = 0.0
for _ in range(T):
    n = R.randint(20, 60); ring = rand_chain(R, n, closed=True)
    kidx = sorted(R.sample(range(n), R.randint(3, 8))); knots = [(i, R.randint(0, 3000)) for i in kidx]
    full = sample_ring(ring, knots)
    i = R.randint(0, n - 1); span = R.randint(2, n // 3); j = (i + span) % n       # remove the stretch i -> j in the ring's direction
    order = [(j + t) % n for t in range(n - span + 1)]                            # the open part j ... i
    part = [ring[q] for q in order]; ref = [full[q] for q in order]
    pk = [(order.index(q), v) for q, v in knots if q in order]
    naive = sample(part, sorted(pk)) if pk else [ref[0]] * len(part)
    ck = dict(pk); ck.setdefault(0, full[j]); ck.setdefault(len(order) - 1, full[i])
    cut = sample(part, sorted(ck.items()))
    rnaive = max(rnaive, max(abs(p - q) for p, q in zip(naive, ref))); rcut = max(rcut, max(abs(p - q) for p, q in zip(cut, ref)))
print('%d random profiled rings (20-60 vertices, 3-8 base knots) opened by removing the stretch between two anchors:' % T)
print('  the open remainder keeping only its own knots: largest change %.1f cm; with a cut knot at each end: %.2e cm' % (rnaive, rcut))
