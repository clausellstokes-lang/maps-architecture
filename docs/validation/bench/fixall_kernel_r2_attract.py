# fix-all round 2, kernel lane (fixall/draft-kernel-r2). Our own arithmetic; no reference code.
# Checks the revised §3.6 / §3.2 / §3.8 rules against the counter-examples the round-1 verifier raised.
#   A  GEO-3: edge attraction with the endpoint rule (exact foot within attractCm of an endpoint -> onto the endpoint)
#   B  the round-1 measurement (cut endpoints on Chaikin x2 spines) re-run under the revised rule (VK-17: committed here)
#   C  crossings next to an existing vertex that sits 25-26 cm from the crossed edge: plain rounding vs the
#      constrained rounding of §3.6 step 4
#   D  VK-10: the notched near-rectangle and the convexity gate of the exact OBB roof path
#   E  VK-8: area2 with bbox-relative terms, partial sums flushed at |partial| >= 2^52, against exact integers
# Run: python3 fixall_kernel_r2_attract.py
import random, math
MIN, ATT = 25.0, 26.0

def foot(v, a, b):
    ex, ey = b[0]-a[0], b[1]-a[1]; L2 = ex*ex+ey*ey
    t = ((v[0]-a[0])*ex + (v[1]-a[1])*ey) / L2
    return t, (a[0]+t*ex, a[1]+t*ey)

def attract_to_edge(v, a, b):
    """Revised step 2 for one edge a-b, v not within ATT of a or b. Returns (new position, kind, sub-edges)."""
    t, f = foot(v, a, b)
    if not (0.0 <= t <= 1.0) or math.dist(v, f) > ATT:
        return v, 'none', None
    if math.dist(f, a) <= ATT:
        return a, 'endpoint', None           # onto the endpoint: no split, no new sub-edge
    if math.dist(f, b) <= ATT:
        return b, 'endpoint', None
    q = (round(f[0]), round(f[1]))            # splitThrough at the lattice point nearest the exact foot
    return q, 'split', (math.dist(a, q), math.dist(q, b))

print('== A  GEO-3 edge attraction, revised rule ==')
A, B = (0, 0), (1000, 0)
p, kind, _ = attract_to_edge((20, 20), A, B)
print('fixture (20,20) vs edge (0,0)-(1000,0): dist to A %.2f (> 26, not vertex-attracted) -> %s at %s, displacement %.2f cm'
      % (math.dist((20, 20), A), kind, p, math.dist((20, 20), p)))
random.seed(7)
N = 400000; n_vertex = n_endpoint = n_split = short = 0; maxdisp = 0.0; minsub = 1e9
for _ in range(N):
    L = max(60.0, random.lognormvariate(math.log(790), 0.5))
    ang = random.uniform(0, 2*math.pi); ca, sa = math.cos(ang), math.sin(ang)
    a = (round(random.uniform(-5e5, 5e5)), round(random.uniform(-5e5, 5e5)))
    b = (round(a[0]+L*ca), round(a[1]+L*sa)); L = math.dist(a, b)
    s = random.uniform(-ATT, L+ATT); o = random.uniform(-ATT, ATT)
    ux, uy = (b[0]-a[0])/L, (b[1]-a[1])/L
    v = (round(a[0]+s*ux-o*uy), round(a[1]+s*uy+o*ux))   # a lattice point in the attraction band
    if math.dist(v, a) <= ATT or math.dist(v, b) <= ATT:
        n_vertex += 1; continue
    q, kind, subs = attract_to_edge(v, a, b)
    if kind == 'none': continue
    maxdisp = max(maxdisp, math.dist(v, q))
    if kind == 'endpoint': n_endpoint += 1
    else:
        n_split += 1; m = min(subs); minsub = min(minsub, m)
        if m < MIN: short += 1
print('band samples %d: vertex-attracted %d, moved onto an endpoint %d, split %d; sub-minEdge sub-edges %d; '
      'shortest sub-edge %.2f cm; largest displacement %.2f cm (bound sqrt(2)*26 = %.2f)'
      % (N, n_vertex, n_endpoint, n_split, short, minsub, maxdisp, math.sqrt(2)*ATT))

print('== B  round-1 measurement re-run (cut endpoints on Chaikin x2 spines) under the revised rule ==')
random.seed(12345)
def chaikin(pts):
    out = [pts[0]]
    for a, b in zip(pts, pts[1:]):
        out.append((0.75*a[0]+0.25*b[0], 0.75*a[1]+0.25*b[1])); out.append((0.25*a[0]+0.75*b[0], 0.25*a[1]+0.75*b[1]))
    out.append(pts[-1]); return out
def spine():
    x = y = 0.0; h = random.uniform(0, 2*math.pi); pts = [(x, y)]
    for _ in range(12):
        L = random.uniform(2500, 4000); h += random.gauss(0, math.radians(9))
        x += L*math.cos(h); y += L*math.sin(h); pts.append((x, y))
    return [(round(a), round(b)) for a, b in chaikin(chaikin(pts))]
M = 200000; att = 0; disp = []; minlen = 1e9; seglens = []
for i in range(M):
    s = spine(); lens = [math.dist(a, b) for a, b in zip(s, s[1:])]
    if i < 2000: seglens += lens
    tot = sum(lens); t = random.uniform(0.1*tot, 0.9*tot); k = 0
    while t > lens[k]: t -= lens[k]; k += 1
    a, b = s[k], s[k+1]; u = t/lens[k]; f = (a[0]+u*(b[0]-a[0]), a[1]+u*(b[1]-a[1]))
    if math.dist(f, a) <= ATT or math.dist(f, b) <= ATT:
        att += 1; disp.append(min(math.dist(f, a), math.dist(f, b)))
    else:
        q = (round(f[0]), round(f[1])); minlen = min(minlen, math.dist(a, q), math.dist(q, b))
seglens.sort(); disp.sort()
qq = lambda v, p: v[int(p*(len(v)-1))]
print('segments p50 %.1f m; endpoints attracted %.2f %%; displacement p50 %.1f cm, p90 %.1f cm, max %.1f cm; shortest resulting edge %.1f cm'
      % (qq(seglens, .5)/100, 100*att/M, qq(disp, .5), qq(disp, .9), disp[-1], minlen))

print('== C  crossing next to an existing vertex at 25-26 cm from the crossed edge ==')
random.seed(99)
K = 200000; plain_bad = cons_bad = 0; cons_dev = 0.0; plain_dev = 0.0; cons_move = 0.0
for _ in range(K):
    u = (round(random.uniform(-1e5, 1e5)), round(random.uniform(-1e5, 1e5)))
    d = random.uniform(25.0, 26.0); th = random.uniform(0, 2*math.pi)
    nx, ny = math.cos(th), math.sin(th)                  # unit normal of the existing edge, pointing away from u
    tx, ty = -ny, nx
    c = (u[0]+d*nx, u[1]+d*ny)                           # foot of u on the edge's line
    e0 = (round(c[0]-3000*tx), round(c[1]-3000*ty)); e1 = (round(c[0]+3000*tx), round(c[1]+3000*ty))
    ex, ey = e1[0]-e0[0], e1[1]-e0[1]; eL = math.hypot(ex, ey)
    dist_u = abs((u[0]-e0[0])*ey - (u[1]-e0[1])*ex)/eL
    if dist_u < 25.0: continue                            # the existing arrangement obeys clearance (>= minEdge)
    phi = th + random.uniform(-0.6, 0.6)                  # the new segment leaves u towards the edge
    w = (u[0]+400*math.cos(phi), u[1]+400*math.sin(phi))
    # exact crossing of u-w with e0-e1
    dx, dy = w[0]-u[0], w[1]-u[1]; den = dx*ey - dy*ex
    if abs(den) < 1e-9: continue
    s = ((e0[0]-u[0])*ey - (e0[1]-u[1])*ex)/den
    p = (u[0]+s*dx, u[1]+s*dy)
    line_dev = lambda q: abs((q[0]-e0[0])*ey - (q[1]-e0[1])*ex)/eL
    q = (round(p[0]), round(p[1]))
    plain_dev = max(plain_dev, line_dev(q))
    if math.dist(u, q) < MIN: plain_bad += 1
    # constrained rounding: the nearest lattice point to p among those >= minEdge from u (search the 5x5 neighbourhood)
    best = None
    for ix in range(math.floor(p[0])-2, math.floor(p[0])+3):
        for iy in range(math.floor(p[1])-2, math.floor(p[1])+3):
            if math.dist(u, (ix, iy)) >= MIN:
                key = (math.dist(p, (ix, iy)), iy, ix)
                if best is None or key < best[0]: best = (key, (ix, iy))
    q2 = best[1]; cons_dev = max(cons_dev, line_dev(q2)); cons_move = max(cons_move, math.dist(p, q2))
    if math.dist(u, q2) < MIN: cons_bad += 1
print('%d crossings: plain nearest-lattice rounding leaves %d sub-minEdge edges (max off-line %.3f cm); '
      'constrained rounding leaves %d (max off-line %.3f cm, max distance from the exact crossing %.3f cm)' % (K, plain_bad, plain_dev, cons_bad, cons_dev, cons_move))

print('== D  VK-10 notched near-rectangle ==')
ring = [(0, 0), (100, 0), (100, 200), (400, 200), (400, 0), (2000, 0), (2000, 1000), (0, 1000)]   # cm: 20 x 10 m, notch x 1-4 m, depth 2 m
def area2(r): return sum(r[i][0]*r[(i+1) % len(r)][1] - r[(i+1) % len(r)][0]*r[i][1] for i in range(len(r)))
def orient(a, b, c): return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])
def inside(pt, r):
    x, y = pt; c = False
    for i in range(len(r)):
        (x1, y1), (x2, y2) = r[i], r[(i+1) % len(r)]
        if (y1 > y) != (y2 > y) and x < x1 + (y-y1)*(x2-x1)/(y2-y1): c = not c
    return c
convex = all(orient(ring[i], ring[(i+1) % len(ring)], ring[(i+2) % len(ring)]) >= 0 for i in range(len(ring)))
print('area ratio to OBB %.3f; four OBB corners present; convex: %s; hip (0,0)->(500,500) passes (150,150), inside footprint: %s'
      % (area2(ring)/2/(2000*1000), convex, inside((150, 150), ring)))

print('== E  VK-8 exact area2 ==')
random.seed(3)
def area2_flush(r, flush_every=None):
    xs = [p[0] for p in r]; ys = [p[1] for p in r]; x0, y0 = min(xs), min(ys)
    acc = 0.0; big = 0; n = len(r); cnt = 0
    for i in range(n):
        ax, ay = float(r[i][0]-x0), float(r[i][1]-y0); bx, by = float(r[(i+1) % n][0]-x0), float(r[(i+1) % n][1]-y0)
        term = ax*by - bx*ay                               # |term| < 2^48 for bbox-relative coordinates < 2^24
        if flush_every is None:
            if abs(acc) >= 2.0**52: big += int(acc); acc = 0.0
        else:
            cnt += 1
            if cnt > flush_every: big += int(acc); acc = 0.0; cnt = 1
        acc += term
    return big + int(acc)
R = 2**23 - 1; bad_new = bad_old = 0; rings = 300
for _ in range(rings):
    n = random.choice([50, 500, 5000])
    r = [(random.randint(-R, R), random.randint(-R, R)) for _ in range(n)]
    exact = area2(r)
    if area2_flush(r) != exact: bad_new += 1
    if area2_flush(r, 1024) != exact: bad_old += 1
print('%d random rings over the full range |x|,|y| < 2^23: flush-at-2^52 mismatches %d; fixed 1 024-term flush mismatches %d'
      % (rings, bad_new, bad_old))
# adversarial: a star ring {n/k} of radius 2^23 - 2 centred on the origin, every shoelace term of one sign (a ring snap can produce)
bad_new = bad_old = 0
for n in (2048, 4096, 8191):
    r = [(round((2**23-2)*math.cos(i*1.0)), round((2**23-2)*math.sin(i*1.0))) for i in range(n)]
    exact = area2(r)
    bad_new += area2_flush(r) != exact; bad_old += area2_flush(r, 1024) != exact
print('3 star rings (1 radian steps, radius 2^23 - 2): flush-at-2^52 mismatches %d; fixed 1 024-term flush mismatches %d' % (bad_new, bad_old))
