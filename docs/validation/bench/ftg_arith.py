# redteam:ftg — arithmetic behind findings FTG-1, FTG-12 and FTG-17 (our own code)
import math, random

print('== A. area budget: band-weighted plot area from ARCH §4.7 granularity-table midpoints')
bands = {  # frontage (m) range, depth (m) range — ARCH §4.7 default rows
    'poor': ((4, 6), (12, 20)), 'modest': ((6, 9), (18, 30)),
    'prosperous': ((9, 14), (25, 40)), 'rich': ((14, 25), (30, 60))}
mid = {k: ((f[0] + f[1]) / 2) * ((d[0] + d[1]) / 2) for k, (f, d) in bands.items()}
for k, v in mid.items(): print('  %-10s midpoint plot %6.0f m2' % (k, v))
print('  spread rich/poor = %.1fx' % (mid['rich'] / mid['poor']))
# FTG captured lifestyle weights (Average Lifestyle = Comfortable): SQUALID 1, POOR 1, MODEST 20, COMFORTABLE 40, WEALTHY 20, ARISTOCRATIC 10
w = {'poor': 2, 'modest': 20, 'prosperous': 40, 'rich': 30}; tw = sum(w.values())
ftg_mix = sum(mid[k] * w[k] / tw for k in mid)
equal = sum(mid.values()) / 4
print('  household-weighted mean plot (FTG Comfortable mix mapped poor/modest/prosperous/rich): %.0f m2' % ftg_mix)
print('  equal-quartile bands mean plot: %.0f m2' % equal)
print('  vs a single modest-class value (%.0f m2): x%.2f (FTG mix), x%.2f (equal quartiles)'
      % (mid['modest'], ftg_mix / mid['modest'], equal / mid['modest']))
print('  coverage double count if plotArea is plot area and coverage = 0.38: x%.2f' % (1 / 0.38))

print('== B. Chaikin x2 on FTG-like polylines (25-30 m steps, turns uniform in [-15, 15] deg)')
random.seed(7)
def chaikin(P):
    Q = [P[0]]
    for i in range(len(P) - 1):
        (x0, y0), (x1, y1) = P[i], P[i + 1]
        Q.append((0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1)); Q.append((0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1))
    Q.append(P[-1]); return Q
def turns(P):
    t = []
    for i in range(1, len(P) - 1):
        a = math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0]); b = math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0])
        d = abs(math.degrees(b - a)) % 360; t.append(min(d, 360 - d))
    return t
def seglen(P): return [math.dist(P[i], P[i + 1]) for i in range(len(P) - 1)]
T0, T2, L0, L2 = [], [], [], []
for _ in range(2000):
    h, P = 0.0, [(0.0, 0.0)]
    for _ in range(20):
        h += math.radians(random.uniform(-15, 15)); s = random.uniform(25, 30)
        P.append((P[-1][0] + s * math.cos(h), P[-1][1] + s * math.sin(h)))
    Q = chaikin(chaikin(P))
    T0 += turns(P); T2 += turns(Q)[2:-2]; L0 += seglen(P); L2 += seglen(Q)[2:-2]
q = lambda v, p: sorted(v)[int(p * (len(v) - 1))]
print('  raw:      segment p50 %.1f m; per-vertex turn p50 %.1f, p95 %.1f, max %.1f deg' % (q(L0, .5), q(T0, .5), q(T0, .95), max(T0)))
print('  chaikin2: segment p50 %.1f m; per-vertex turn p50 %.1f, p95 %.1f, max %.1f deg' % (q(L2, .5), q(T2, .5), q(T2, .95), max(T2)))
# curvature per 100 m is preserved; per-vertex turn is not
curv0 = sum(T0) / sum(L0) * 100; curv2 = sum(T2) / sum(L2) * 100
print('  mean absolute turning per 100 m: raw %.1f deg, chaikin2 %.1f deg' % (curv0, curv2))

print('== C. FTG junction mix (Galeiaward degree histogram, _critic-ftg §4 row 2)')
deg = {1: 83, 2: 2678, 3: 969, 4: 561, 5: 10, 6: 2}
j = deg[3] + deg[4] + deg[5] + deg[6]
print('  4-way share of junctions (deg>=3): %.1f%%; T share %.1f%%' % (100 * deg[4] / j, 100 * deg[3] / j))

print('== D. heading drift of a growth proposal (20 steps of 30 m = 600 m)')
def sim(model, sigma, n=20, runs=20000):
    ends = []
    for _ in range(runs):
        h = k = 0.0
        for _ in range(n):
            if model == 'iid': h += random.gauss(0, sigma)
            else: k += random.gauss(0, sigma); h += k      # curvature (rate-of-turn) random walk
        ends.append(abs(math.degrees(h)))
    return q(ends, .5), sum(1 for e in ends if e > 90) / runs
for sig in (2, 3, 6):
    s = math.radians(sig)
    m1, f1 = sim('iid', s); m2, f2 = sim('curv', s)
    print('  sigma %d deg/step: i.i.d. turns -> median |heading| %.0f deg, P(>90) %.2f; curvature walk -> median %.0f deg, P(>90) %.2f'
          % (sig, m1, f1, m2, f2))
