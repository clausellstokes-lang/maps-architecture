# Model of §3.6's placement rule on a ONE-LEVEL transient arena (§3.4): every split of a seed side a-b is placed at the
# lattice point nearest its exact position on the CURRENT sub-edge (the route at the edge's own level; in a one-level
# arena each sub-edge is its own route). We measure how far those vertices stand from the STRAIGHT input side a-b, which
# is what the re-cut's exact construction tests them against (a vertex within the 0.71 cm hot pixel of another ring's
# side splits it; one farther but closer than minEdge is refused). Deterministic: fixed seed. Stdlib only.
import math, random
random.seed(20260927)
HOT = 0.71
def perp(p, a, b):
    (ax, ay), (bx, by), (px, py) = a, b, p
    dx, dy = bx-ax, by-ay
    return abs(dx*(py-ay) - dy*(px-ax)) / math.hypot(dx, dy)
def proj_t(p, a, b):
    (ax, ay), (bx, by), (px, py) = a, b, p
    dx, dy = bx-ax, by-ay
    return ((px-ax)*dx + (py-ay)*dy) / (dx*dx+dy*dy)
def run(k, trials=20000, axis_aligned=False):
    over = 0; total = 0; worst = 0.0; sides_with_over = 0
    for _ in range(trials):
        L = random.uniform(600, 1500)
        th = 0.0 if axis_aligned else random.uniform(0, math.pi/2)
        a = (0, 0); b = (round(L*math.cos(th)), round(L*math.sin(th)))
        if a == b: continue
        poly = [a, b]   # current sub-edges along the side, ordered by t
        ts = sorted(random.uniform(0.05, 0.95) for _ in range(k))
        order = ts[:]; random.shuffle(order)   # cut order differs from position order
        placed = []
        any_over = False
        for t in order:
            # the exact position: the point of the current polyline at parameter t along a-b
            tp = [proj_t(p, a, b) for p in poly]
            i = max(j for j in range(len(poly)-1) if tp[j] <= t)
            p0, p1 = poly[i], poly[i+1]
            u = (t - tp[i]) / (tp[i+1] - tp[i])
            ex = (p0[0] + u*(p1[0]-p0[0]), p0[1] + u*(p1[1]-p0[1]))
            q = (round(ex[0]), round(ex[1]))
            poly.insert(i+1, q); placed.append(q)
        for n, q in enumerate(placed):
            d = perp(q, a, b); total += 1; worst = max(worst, d)
            if d > HOT: over += 1; any_over = True
        sides_with_over += any_over
    return total, over, worst, sides_with_over, trials
for k in (1, 2, 3, 4, 6):
    tot, over, worst, swo, tr = run(k)
    print(f"rotated sides, {k} splits: vertices {tot}, farther than 0.71 cm from the straight side {over} ({100*over/tot:.2f} %), worst {worst:.3f} cm; sides with >=1 such vertex {swo}/{tr} ({100*swo/tr:.1f} %)")
tot, over, worst, swo, tr = run(4, axis_aligned=True)
print(f"axis-aligned sides, 4 splits: vertices {tot}, farther than 0.71 cm {over}, worst {worst:.3f} cm")
# The T clip: the stem's two sides cross the bar's side a-b; the second crossing is placed on the sub-edge the first left.
over = 0; tr = 20000; worst = 0.0
for _ in range(tr):
    L = random.uniform(1000, 2000); w = random.uniform(300, 700)
    th = random.uniform(0, math.pi/2)
    a = (0, 0); b = (round(L*math.cos(th)), round(L*math.sin(th)))
    tc = random.uniform(0.3, 0.7); dt = w / L / 2
    t1, t2 = tc - dt, tc + dt
    if random.random() < 0.5: t1, t2 = t2, t1
    ex1 = (a[0] + t1*(b[0]-a[0]), a[1] + t1*(b[1]-a[1])); c1 = (round(ex1[0]), round(ex1[1]))
    # second crossing: on the sub-edge between c1 and the far endpoint
    far = b if t2 > t1 else a
    tpc1 = proj_t(c1, a, b); tpf = proj_t(far, a, b)
    u = (t2 - tpc1) / (tpf - tpc1)
    ex2 = (c1[0] + u*(far[0]-c1[0]), c1[1] + u*(far[1]-c1[1])); c2 = (round(ex2[0]), round(ex2[1]))
    d = perp(c2, a, b); worst = max(worst, d)
    if d > HOT: over += 1
print(f"T clip, second crossing on the bar's straight side: {over}/{tr} ({100*over/tr:.2f} %) farther than 0.71 cm, worst {worst:.3f} cm")
