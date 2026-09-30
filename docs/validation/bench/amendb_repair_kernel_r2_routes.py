# Companion to amendb_verify_kernel_r1_drift.py (lane amendments-b/repair-kernel-r2, 2026-09-27). Models §3.6's
# placement rule on a ONE-LEVEL transient arena under §3.4's "input sides are the arena's routes": every split of a seed
# side a-b is placed at the lattice point nearest its exact position on the CURRENT sub-edge among the points that
# (i) lie within 0.71 cm of the STRAIGHT input side a-b (its route) and (ii) lie at least minEdge from the current
# sub-edge's endpoints; the search runs outward, never beyond attractCm. Same sides, split counts and seed as the drift
# model. It measures: vertices beyond the hot pixel of the straight side (the re-cut's split test), search failures
# (the rule's fallback onto an endpoint), the largest move from the exact position, the largest distance from the
# sub-edge the vertex splits (how far that sub-edge bends), and the shortest sub-edge. Then a re-cut: a random half of
# the vertices are a kept room's corners; each must lie within the hot pixel of the straight side for the exact
# construction to split the side there. Deterministic: fixed seed. Stdlib only.
import math, random
random.seed(20260927)
HOT, MIN_EDGE, ATTRACT = 0.71, 25.0, 26.0
def perp(p, a, b):
    (ax, ay), (bx, by), (px, py) = a, b, p
    dx, dy = bx-ax, by-ay
    return abs(dx*(py-ay) - dy*(px-ax)) / math.hypot(dx, dy)
def seg_dist(p, a, b):
    (ax, ay), (bx, by), (px, py) = a, b, p
    dx, dy = bx-ax, by-ay
    t = max(0.0, min(1.0, ((px-ax)*dx + (py-ay)*dy) / (dx*dx+dy*dy)))
    return math.hypot(px-(ax+t*dx), py-(ay+t*dy))
def proj_t(p, a, b):
    (ax, ay), (bx, by), (px, py) = a, b, p
    dx, dy = bx-ax, by-ay
    return ((px-ax)*dx + (py-ay)*dy) / (dx*dx+dy*dy)
R = int(math.ceil(ATTRACT))
OFFS = sorted(((dx, dy) for dx in range(-R, R+1) for dy in range(-R, R+1) if dx*dx+dy*dy <= ATTRACT*ATTRACT),
              key=lambda o: o[0]*o[0]+o[1]*o[1])
def place(ex, a, b, p0, p1):
    cx, cy = round(ex[0]), round(ex[1])
    best = None
    for dx, dy in OFFS:   # outward from the nearest lattice point; ties by distance to the exact point, then y, then x
        q = (cx+dx, cy+dy)
        if perp(q, a, b) > HOT: continue
        if math.dist(q, p0) < MIN_EDGE or math.dist(q, p1) < MIN_EDGE: continue
        key = (math.dist(q, ex), q[1], q[0])
        if best is None or key < best[0]: best = (key, q)
    return None if best is None else best[1]
def run(k, trials=20000, axis_aligned=False):
    total = over = fails = 0; worst = move = bend = 0.0; shortest = 1e9; kept = kept_over = 0
    for _ in range(trials):
        L = random.uniform(600, 1500)
        th = 0.0 if axis_aligned else random.uniform(0, math.pi/2)
        a = (0, 0); b = (round(L*math.cos(th)), round(L*math.sin(th)))
        while True:   # cut positions at least 40 cm apart along the side and from its ends (a planner's module)
            ts = sorted(random.uniform(0.05, 0.95) for _ in range(k))
            if all((ts[i+1]-ts[i])*L >= 40 for i in range(k-1)) and ts[0]*L >= 40 and (1-ts[-1])*L >= 40: break
        order = ts[:]; random.shuffle(order)
        poly = [a, b]; placed = []
        for t in order:
            tp = [proj_t(p, a, b) for p in poly]
            i = max(j for j in range(len(poly)-1) if tp[j] <= t)
            p0, p1 = poly[i], poly[i+1]
            u = (t - tp[i]) / (tp[i+1] - tp[i])
            ex = (p0[0] + u*(p1[0]-p0[0]), p0[1] + u*(p1[1]-p0[1]))
            q = place(ex, a, b, p0, p1)
            if q is None: fails += 1; continue
            move = max(move, math.dist(q, ex)); bend = max(bend, seg_dist(q, p0, p1))
            poly.insert(i+1, q); placed.append(q)
        for q in placed:
            d = perp(q, a, b); total += 1; worst = max(worst, d); over += d > HOT
            if random.random() < 0.5:
                kept += 1; kept_over += d > HOT
        shortest = min(shortest, min(math.dist(poly[j], poly[j+1]) for j in range(len(poly)-1)))
    return total, over, worst, fails, move, bend, shortest, kept, kept_over
for k in (1, 2, 3, 4, 6):
    tot, over, worst, fails, move, bend, shortest, kept, kept_over = run(k)
    print(f"rotated sides, {k} splits, routes rule: vertices {tot}, beyond 0.71 cm of the straight side {over}, worst {worst:.3f} cm; "
          f"search failures {fails}; largest move from the exact point {move:.3f} cm; largest distance from the split sub-edge {bend:.3f} cm; "
          f"shortest sub-edge {shortest:.2f} cm; re-cut: kept corners {kept}, not splittable {kept_over}")
tot, over, worst, fails, move, bend, shortest, kept, kept_over = run(4, axis_aligned=True)
print(f"axis-aligned sides, 4 splits, routes rule: vertices {tot}, beyond 0.71 cm {over}, worst {worst:.3f} cm; search failures {fails}; "
      f"kept corners {kept}, not splittable {kept_over}")
