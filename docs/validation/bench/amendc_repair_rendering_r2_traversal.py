# PENDING FABLE REVIEW — receipt of amendments-c/repair-rendering-r2 (opus stand-in). Our own code, stdlib only.
# Checks the global light's visibility law the repair writes into §8.4 (c) and the budgets it writes into §8.8 / §12.8:
#   the window R in world distance (VRC1-01), the traversal of a max-height pyramid with its resolution floor
#   (VRC1-02), the ring memory (VRC1-01) and the per-export-tile window (VRC1-12).
# Model: a 2-D height field of axis-aligned prisms on flat ground (height 0), texel-aligned; world-aligned tiles of
# 512 texels (§8.8); a max pyramid per tile, levels 0 (the texel) … 9 (the tile). Visibility of the global light:
#   f(t) = (z + t*m - h) / (t * sigma), V = clamp(min over resolved cells of the cell's lower bound, 0, 1)
# where a cell met by the ray over [ta, tb] with greatest height hm has the lower bound (z + ta*m - hm) / (ta*sigma)
# when hm > z (else it cannot shade), a cell is refined while its level exceeds the floor l(ta), and a cell whose bound
# cannot lower the running minimum is skipped (which never changes the minimum: a parent's bound is <= its children's).
#   floor law "c": l(t) = max(0, floor(log2(4 t / S)))  — a resolved cell's side <= max(1 texel, t / 128)
#   exact:         l(t) = 0                              — every cell resolved to its texel
# The window: R = (Z - z) / (m - sigma), Z the highest surface in the scene, m = max(tan alt, 1/8) (K05's 8 x height
# cap): beyond R the ray clears every surface by at least t * sigma, so V = 1 there and the penumbra is never cut.
import math, random

SIG = math.tan(math.radians(0.27))

class Scene:
    def __init__(self, tau, rects, origin=(0.0, 0.0)):
        self.tau = tau; self.S = 512 * tau; self.rects = rects; self.ox, self.oy = origin
        self.Z = max([r[4] for r in rects] + [0.0])
        self.B = 8.0; self.buckets = {}
        for k, (x0, y0, x1, y1, h) in enumerate(rects):
            for bi in range(math.floor(x0 / self.B), math.floor((x1 - 1e-9) / self.B) + 1):
                for bj in range(math.floor(y0 / self.B), math.floor((y1 - 1e-9) / self.B) + 1):
                    self.buckets.setdefault((bi, bj), []).append(k)
        self.memo = {}
    def hmax_box(self, x0, y0, x1, y1):
        best = 0.0; seen = set()
        for bi in range(math.floor(x0 / self.B), math.floor((x1 - 1e-9) / self.B) + 1):
            for bj in range(math.floor(y0 / self.B), math.floor((y1 - 1e-9) / self.B) + 1):
                for k in self.buckets.get((bi, bj), ()):
                    if k in seen: continue
                    seen.add(k); rx0, ry0, rx1, ry1, h = self.rects[k]
                    if rx0 < x1 and rx1 > x0 and ry0 < y1 and ry1 > y0 and h > best: best = h
        return best
    def cell_box(self, L, i, j):
        s = self.tau * (1 << L)
        return (self.ox + i * s, self.oy + j * s, self.ox + (i + 1) * s, self.oy + (j + 1) * s)
    def cell_max(self, L, i, j):
        key = (L, i, j)
        v = self.memo.get(key)
        if v is None:
            v = self.hmax_box(*self.cell_box(L, i, j)); self.memo[key] = v
        return v
    def h_at(self, x, y):
        for (x0, y0, x1, y1, h) in self.rects:
            if x0 <= x < x1 and y0 <= y < y1: return h
        return 0.0

def seg_box(px, py, dx, dy, R, box):
    x0, y0, x1, y1 = box; ta, tb = 0.0, R
    for p, d, lo, hi in ((px, dx, x0, x1), (py, dy, y0, y1)):
        if abs(d) < 1e-15:
            if p < lo or p >= hi: return None
        else:
            a, b = (lo - p) / d, (hi - p) / d
            if a > b: a, b = b, a
            ta, tb = max(ta, a), min(tb, b)
            if ta >= tb: return None
    return ta, tb

def floor_level(t, S, kappa):
    if kappa is None: return 0
    x = kappa * t / S
    return max(0, math.floor(math.log2(x))) if x >= 1 else 0

def visibility(sc, px, py, az_deg, m, kappa=4, count=None):
    z = sc.h_at(px, py)
    R = (sc.Z - z) / (m - SIG)          # the window: beyond it the ray clears the highest surface by t * sigma (V = 1)
    if R <= 0: return 1.0
    dx, dy = math.cos(math.radians(az_deg)), math.sin(math.radians(az_deg))
    best = [1.0]
    def visit(L, i, j):
        if best[0] <= 0: return
        if count is not None: count[0] += 1
        span = seg_box(px, py, dx, dy, R, sc.cell_box(L, i, j))
        if span is None: return
        ta, tb = span; hm = sc.cell_max(L, i, j)
        if hm <= z: return
        val = -math.inf if ta <= 0 else (z + ta * m - hm) / (ta * SIG)
        if val >= best[0]: return
        if L > 0 and L > floor_level(ta, sc.S, kappa):
            kids = []
            for a in (0, 1):
                for b in (0, 1):
                    ci, cj = 2 * i + a, 2 * j + b
                    sp = seg_box(px, py, dx, dy, R, sc.cell_box(L - 1, ci, cj))
                    if sp is not None: kids.append((sp[0], ci, cj))
            for _, ci, cj in sorted(kids):
                visit(L - 1, ci, cj)
        else:
            best[0] = min(best[0], val)
    # the tiles (level 9) the segment crosses, front to back
    tiles = []; S = sc.S
    ex, ey = px + dx * R, py + dy * R
    for i in range(math.floor((min(px, ex) - sc.ox) / S) - 1, math.floor((max(px, ex) - sc.ox) / S) + 2):
        for j in range(math.floor((min(py, ey) - sc.oy) / S) - 1, math.floor((max(py, ey) - sc.oy) / S) + 2):
            sp = seg_box(px, py, dx, dy, R, sc.cell_box(9, i, j))
            if sp is not None: tiles.append((sp[0], i, j))
    for _, i, j in sorted(tiles):
        visit(9, i, j)
    return max(0.0, min(1.0, best[0]))

def shadow_start(sc, x_from, x_to, y, az, m, kappa, step):
    """scanning from x_from toward x_to (toward the caster), the first ground pixel whose V < 0.5"""
    n = int(round((x_to - x_from) / step))
    for k in range(n):
        x = x_from + (k + 0.5) * step
        if visibility(sc, x, y, az, m, kappa) < 0.5: return x
    return None

def visibility_interval(sc, px, py, az_deg, m, N=32):
    """the verifier's VRC1-02 text in 2-D: N samples at t_k = T((k + 1/2)/N)^2 over the same window, each reading the
    greatest height of the pyramid cells of the finest level whose side is >= its interval [T(k/N)^2, T((k+1)/N)^2]
    that the interval's segment crosses, the ray taken at the interval's near end (half a texel out for k = 0)"""
    z = sc.h_at(px, py); T = (sc.Z - z) / (m - SIG)
    if T <= 0: return 1.0
    dx, dy = math.cos(math.radians(az_deg)), math.sin(math.radians(az_deg)); best = 1.0
    for k in range(N):
        ua, ub = T * (k / N) ** 2, T * ((k + 1) / N) ** 2
        L = 0
        while sc.tau * (1 << L) < (ub - ua) and L < 9: L += 1
        s = sc.tau * (1 << L); hm = 0.0
        ax, ay, bx, by = px + dx * ua, py + dy * ua, px + dx * ub, py + dy * ub
        for i in range(math.floor((min(ax, bx) - sc.ox) / s), math.floor((max(ax, bx) - sc.ox) / s) + 1):
            for j in range(math.floor((min(ay, by) - sc.oy) / s), math.floor((max(ay, by) - sc.oy) / s) + 1):
                sp = seg_box(px, py, dx, dy, T, sc.cell_box(L, i, j))
                if sp is not None and sp[1] > ua and sp[0] < ub: hm = max(hm, sc.cell_max(L, i, j))
        if hm <= z: continue
        ua_eff = max(ua, sc.tau / 2)
        tk = T * ((k + 0.5) / N) ** 2
        best = min(best, (z + ua_eff * m - hm) / (tk * SIG))
    return max(0.0, min(1.0, best))

print('== (1) VRC1-01: the tile-line cut. Sun toward +x (azimuth 0), shadow toward -x; ground pixels at texel centres on the')
print('   caster\'s centre line; the V = 0.5 point of the exact law is at t = h / (m - sigma/2) from the caster\'s near face.')
cases = [('1:500, DPR 2, fixed sun 45 deg, 45 m tower', 33.9 / 512, 45.0, 45.0, 6.0),
         ('1:500, DPR 1, path sun 15 deg, 30 m tower', 67.7 / 512, 30.0, 15.0, 6.0),
         ('1:500, DPR 2, path sun 15 deg, 45 m tower', 33.9 / 512, 45.0, 15.0, 6.0),
         ('1:500, DPR 2, fixed sun 45 deg, 20 m house (control)', 33.9 / 512, 20.0, 45.0, 6.0)]
for label, tau, H, alt, w in cases:
    m = max(math.tan(math.radians(alt)), 1 / 8)
    x0 = 70.0 if alt >= 45 else 200.0
    x0 = round(x0 / tau) * tau; w = round(w / tau) * tau
    rect = (x0, 30.0, x0 + w, 30.0 + w, H)
    yc = 30.0 + (math.floor(w / tau / 2) + 0.5) * tau
    t_half = H / (m - SIG / 2)
    print(f'   {label}: texel {tau*100:.2f} cm, tile side {512*tau:.1f} m; V = 0.5 at {t_half:.2f} m from the near face')
    for off in (0.0, 0.25, 0.5, 0.75):
        sc = Scene(tau, [rect], origin=(-off * 512 * tau, 0.0))
        lo = x0 - t_half - 3.0
        xs_exact = shadow_start(sc, lo, x0, yc, 0.0, m, None, tau)
        sc2 = Scene(tau, [rect], origin=(-off * 512 * tau, 0.0))
        xs_c = shadow_start(sc2, lo, x0, yc, 0.0, m, 4, tau)
        ex = x0 - xs_exact; ec = x0 - xs_c
        cell = max(1.0, 2 ** floor_level(t_half, 512 * tau, 4)) * tau
        tl = [(x0 - k * 512 * tau - (-off * 512 * tau)) for k in range(0, 1)]
        print(f'     tile grid offset {off:.2f} S: shadow starts {ex:.3f} m from the face under the exact law '
              f'({(ex - t_half)/tau:+.1f} px from V = 0.5), {ec:.3f} m under floor law c ({(ec - ex)/tau:+.1f} px from exact; '
              f'the law\'s cell there {cell/tau:.0f} px)')

print('== (2) VRC1-02: striping. A 6 m x 6 m tower 30 m tall under a 15 deg path sun, 1:500 DPR 1; ground pixels along the')
print('   shadow axis at 0.1 m; runs of V < 0.5 (1 = one unbroken shadow).')
tau = 67.7 / 512; m = math.tan(math.radians(15))
for w in (6.0, 12.0, 2.0):
    x0 = round(100.0 / tau) * tau; ww = round(w / tau) * tau
    sc = Scene(tau, [(x0, 20.0, x0 + ww, 20.0 + ww, 30.0)])
    yc = 20.0 + (math.floor(ww / tau / 2) + 0.5) * tau
    L = 30.0 / m
    runs = 0; prev = None; lit_inside = 0; n = 0
    x = x0 - L + 0.3
    while x < x0 - 0.05:
        s = visibility(sc, x, yc, 0.0, m, 4) < 0.5
        if s != prev: runs += 1; prev = s
        if not s: lit_inside += 1
        n += 1; x += 0.1
    print(f'   caster {w:.0f} m wide: {runs} run(s); {lit_inside} of {n} samples inside the similar-triangles shadow read lit')

print('== (3) lateral flare at the far end of a long shadow (the 45 m tower, 15 deg path sun, 1:500 DPR 2): the width of')
print('   V < 0.5 across the shadow at distance t from the tower: the exact law, floor law c, and the interval-max variant')
print('   (the verifier\'s VRC1-02 text: N = 32 samples, each the greatest height over its interval from the pyramid).')
tau = 33.9 / 512; m = math.tan(math.radians(15))
x0 = round(200.0 / tau) * tau; w = round(6.0 / tau) * tau
sc = Scene(tau, [(x0, 30.0, x0 + w, 30.0 + w, 45.0)])
for t in (20.0, 60.0, 120.0, 160.0):
    wid = {}
    for kappa in (None, 4, 'iv'):
        cnt = 0; y = 30.0 - 12.0 + tau / 2
        while y < 30.0 + w + 12.0:
            v = visibility_interval(sc, x0 - t, y, 0.0, m) if kappa == 'iv' else visibility(sc, x0 - t, y, 0.0, m, kappa)
            if v < 0.5: cnt += 1
            y += tau
        wid[kappa] = cnt * tau
    cell = max(1, 2 ** floor_level(t, 512 * tau, 4))
    print(f'   t = {t:5.1f} m: exact {wid[None]:.3f} m; law c {wid[4]:.3f} m (flare {(wid[4]-wid[None])/tau/2:+.1f} px per side; the cell there {cell} px, t/128 = {t/128/tau:.0f} px); '
          f'interval-max variant {wid["iv"]:.3f} m (flare {(wid["iv"]-wid[None])/tau/2:+.1f} px per side)')

print('== (4) cost: cells visited per pixel and source, and pixels whose V differs from the exact law, on a seeded town')
rng = random.Random(20260928)
def town(tau):
    rects = []
    for bx in range(0, 240, 40):
        for by in range(0, 240, 40):
            x = bx + 4.0
            while x < bx + 36:
                w = rng.uniform(6, 12); d = rng.uniform(8, 12); h = rng.uniform(6, 14)
                rects.append((round(x / tau) * tau, round((by + 4) / tau) * tau, round((x + w) / tau) * tau, round((by + 4 + d) / tau) * tau, h))
                x += w
            x = bx + 4.0
            while x < bx + 36:
                w = rng.uniform(6, 12); d = rng.uniform(8, 12); h = rng.uniform(6, 14)
                rects.append((round(x / tau) * tau, round((by + 36 - d) / tau) * tau, round((x + w) / tau) * tau, round((by + 36) / tau) * tau, h))
                x += w
    for (tx, ty, th) in ((64, 64, 45.0), (150, 120, 30.0), (100, 190, 38.0)):
        rects.append((round(tx / tau) * tau, round(ty / tau) * tau, round((tx + 8) / tau) * tau, round((ty + 8) / tau) * tau, th))
    return rects
for label, tau in (('1:500 DPR 2', 33.9 / 512), ('1:500 DPR 1', 67.7 / 512)):
    rects = town(tau)
    for sun, az, alt in (('fixed sun 315 / 45', 135.0, 45.0), ('path sun 15 deg', 200.0, 15.0)):
        m = max(math.tan(math.radians(alt)), 1 / 8)
        scc = Scene(tau, rects); sce = Scene(tau, rects)
        vis_c, vis_e, differ = [], [], 0
        prng = random.Random(7)
        for _ in range(1500):
            px = (math.floor(prng.uniform(40, 200) / tau) + 0.5) * tau; py = (math.floor(prng.uniform(40, 200) / tau) + 0.5) * tau
            c1 = [0]; c2 = [0]
            v1 = visibility(scc, px, py, az, m, 4, c1); v2 = visibility(sce, px, py, az, m, None, c2)
            vis_c.append(c1[0]); vis_e.append(c2[0])
            if abs(v1 - v2) > 0.01: differ += 1
        for name, v in (('law c', vis_c), ('exact', vis_e)):
            v.sort()
            print(f'   {label}, {sun}, {name}: cells visited median {v[len(v)//2]}, p90 {v[int(len(v)*0.9)]}, p99 {v[int(len(v)*0.99)]}, max {v[-1]}')
        print(f'   {label}, {sun}: pixels whose V differs from the exact law by > 0.01: {differ} of 1500')

print('== (5) memory: the ring tiles\' heights with their pyramid (⅓ MB per full-resolution tile, 4^-L at level L; ring j >= 2')
print('   held from level floor(log2(4 (j - 1))), the finest any visible pixel resolves there by law c); a first ring and every ring out to k')
def lvl(j):
    return 0 if j == 1 else math.floor(math.log2(4 * (j - 1)))
def rings(a, b, k):
    tot = 0.0; first = 0.0
    for j in range(1, k + 1):
        n = (a + 2 * j) * (b + 2 * j) - (a + 2 * j - 2) * (b + 2 * j - 2)
        c = n / 3 * 4 ** (-lvl(j)); tot += c
        if j == 1: first = c
    return first, tot
for (name, W, Hh, d, full) in (('reference view DPR 2', 1440, 900, 2, False), ('reference view DPR 1.5', 1440, 900, 1.5, False),
                               ('reference view DPR 1.5, full precision', 1440, 900, 1.5, True), ('reference view DPR 1, full precision', 1440, 900, 1, True),
                               ('low-end 1 366 x 768 DPR 1', 1366, 768, 1, False), ('low-end 1 920 x 1 080 DPR 1', 1920, 1080, 1, False)):
    a = math.ceil(W * d / 512) + 1; b = math.ceil(Hh * d / 512) + 1; P = a * b
    first, tot = rings(a, b, 64)
    base = (6.5 if full else 4.25) * P + 7
    bound = (2 * (a + b) + 4) / 3 + 3
    print(f'   {name}: P = {P} (a {a}, b {b}); first ring {first:.2f} MB, all rings to k = 64 {tot:.2f} MB '
          f'(bound (2(a + b) + 4)/3 + 3 = {bound:.2f}); visible pyramids P/12 = {P/12:.2f} MB; '
          f'need {base:.1f} + {P/12:.2f} + {bound:.2f} = {base + P/12 + bound:.1f} MB')
print('   the export tile\'s window (one 512^2 export tile, float32: 12 B per pixel for its own surface and 4 B per cell for')
print('   its pyramid and its rings\' heights with theirs; ring j >= 2 from the level law c gives it):')
MB = 1048576.0
own = 512 * 512 * 12 / MB; own_pyr = 512 * 512 * 4 / 3 / MB
ring1 = 0.0; further = 0.0
for j in range(1, 65):
    n = (1 + 2 * j) ** 2 - (2 * j - 1) ** 2
    c = n * (512 * 512 * 4 / MB) * (4 / 3) * 4 ** (-lvl(j))
    if j == 1: ring1 = c
    else: further += c
print(f'     own surface {own:.2f} MB + own pyramid {own_pyr:.2f} MB + first ring {ring1:.2f} MB + every further ring {further:.2f} MB = {own + own_pyr + ring1 + further:.2f} MB, whatever the window')
