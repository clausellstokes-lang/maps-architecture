# PENDING FABLE REVIEW — receipt of amendments-c/verify-rendering-r2 (opus stand-in verifier). Our own code, stdlib only.
# Question: §8.4 (c) says a caster resolved at the floor cell (side <= t / 128) has "its shadow lengthened by at most that
# side", and §8.3's lighting rows bound the shadow's start "within max(1 px, §8.4 (c)'s floor cell there)". The repair's
# receipt (amendc_repair_rendering_r2_traversal.out (1)-(3)) tested only a sun on a grid axis (azimuth 0). The default
# fixed sun stands at 315° — a diagonal. A ray crossing a square cell diagonally runs up to sqrt(2) x its side inside it,
# so a cell whose far corner holds the caster moves the caster's effective start nearer by up to that chord.
# Method: the traversal law exactly as the repair's receipt implements it (floor law c: l(t) = max(0, floor(log2(4t/S))),
# a cell's lower bound (z + ta*m - hmax)/(ta*sigma), skip rule, window R), copied below; a square tower whose corner sits at
# every texel offset inside the floor cell; along every pixel-centre line parallel to the sun's azimuth that crosses the
# tower, the first pixel from the far end whose V < 0.5, under the exact law (every cell resolved to its texel) and under
# floor law c; the lengthening = (law c start - exact start) in ground distance, reported in px (texels) against the cell.
import math

SIG = math.tan(math.radians(0.27))

class Scene:
    def __init__(self, tau, rects, origin=(0.0, 0.0)):
        self.tau = tau; self.S = 512 * tau; self.rects = rects; self.ox, self.oy = origin
        self.Z = max([r[4] for r in rects] + [0.0]); self.memo = {}
    def hmax_box(self, x0, y0, x1, y1):
        best = 0.0
        for (rx0, ry0, rx1, ry1, h) in self.rects:
            if rx0 < x1 and rx1 > x0 and ry0 < y1 and ry1 > y0 and h > best: best = h
        return best
    def cell_box(self, L, i, j):
        s = self.tau * (1 << L)
        return (self.ox + i * s, self.oy + j * s, self.ox + (i + 1) * s, self.oy + (j + 1) * s)
    def cell_max(self, L, i, j):
        key = (L, i, j); v = self.memo.get(key)
        if v is None: v = self.hmax_box(*self.cell_box(L, i, j)); self.memo[key] = v
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

def visibility(sc, px, py, az_deg, m, kappa):
    z = sc.h_at(px, py); R = (sc.Z - z) / (m - SIG)
    if R <= 0: return 1.0
    dx, dy = math.cos(math.radians(az_deg)), math.sin(math.radians(az_deg)); best = [1.0]
    def visit(L, i, j):
        if best[0] <= 0: return
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
            for _, ci, cj in sorted(kids): visit(L - 1, ci, cj)
        else:
            best[0] = min(best[0], val)
    tiles = []; S = sc.S; ex, ey = px + dx * R, py + dy * R
    for i in range(math.floor((min(px, ex) - sc.ox) / S) - 1, math.floor((max(px, ex) - sc.ox) / S) + 2):
        for j in range(math.floor((min(py, ey) - sc.oy) / S) - 1, math.floor((max(py, ey) - sc.oy) / S) + 2):
            sp = seg_box(px, py, dx, dy, R, sc.cell_box(9, i, j))
            if sp is not None: tiles.append((sp[0], i, j))
    for _, i, j in sorted(tiles): visit(9, i, j)
    return max(0.0, min(1.0, best[0]))

def run(label, tau, H, alt, w_m, az):
    m = max(math.tan(math.radians(alt)), 1 / 8)
    t_half = H / (m - SIG / 2)
    Lc = floor_level(t_half, 512 * tau, 4); cell = 1 << Lc
    W = int(round(w_m / tau))
    dx, dy = math.cos(math.radians(az)), math.sin(math.radians(az))
    worst = (0.0, None); shortened = 0; lines = 0; worst_c = (0.0, None)
    for off in range(cell):                      # the tower's corner at every texel offset inside the floor cell (both axes)
        base = 4096 * cell                       # a multiple of every level's cell, in texels
        i0 = base + off; j0 = base + off
        rect = (i0 * tau, j0 * tau, (i0 + W) * tau, (j0 + W) * tau, H)
        sc_e = Scene(tau, [rect]); sc_c = Scene(tau, [rect])
        for k in range(-W + 1, W):               # pixel-centre lines parallel to the (diagonal) sun that cross the tower
            # a pixel centre on the line i - j = k, far down-sun: walk toward the sun one pixel diagonal at a time
            n0 = int((t_half + 4.0) / (tau * math.sqrt(2))) + 2
            ic, jc = i0 + (k if k > 0 else 0), j0 + (-k if k < 0 else 0)
            starts = {}
            for name, sc, kap in (('exact', sc_e, None), ('c', sc_c, 4)):
                s = None
                for q in range(n0, 0, -1):
                    px, py = (ic - q + 0.5) * tau, (jc - q + 0.5) * tau
                    if visibility(sc, px, py, az, m, kap) < 0.5: s = q; break
                starts[name] = s
            if starts['exact'] is None or starts['c'] is None: continue
            lines += 1
            d_px = (starts['c'] - starts['exact']) * math.sqrt(2)     # ground distance in texels along the diagonal
            if d_px < -1e-9: shortened += 1
            if d_px > worst[0]: worst = (d_px, (off, k))
            if abs(k) <= 2 and d_px > worst_c[0]: worst_c = (d_px, (off, k))
    print(f'  {label}: floor cell there {cell} px (level {Lc}); {lines} line-offset pairs; worst lengthening '
          f'{worst[0]:.2f} px (corner offset {worst[1][0] if worst[1] else "-"} px, line {worst[1][1] if worst[1] else "-"}) '
          f'= {worst[0] / cell:.2f} x the cell side; shortened on {shortened}; on the centre lines (|line| <= 2) worst '
          f'{worst_c[0]:.2f} px = {worst_c[0] / cell:.2f} x the cell side (corner offset {worst_c[1][0] if worst_c[1] else "-"} px)')
    return worst[0], cell

print('== the floor law under a diagonal sun (azimuth 45 deg in this frame = the fixed sun 315 deg mirrored); '
      'shadow start along pixel-centre diagonals, law c against the exact law')
res = []
res.append(run('1:500 DPR 2, fixed sun 45 deg altitude, 45 m tower 6 m wide', 33.9 / 512, 45.0, 45.0, 6.0, 45.0))
res.append(run('1:500 DPR 2, fixed sun 45 deg altitude, 20 m house 6 m wide', 33.9 / 512, 20.0, 45.0, 6.0, 45.0))
res.append(run('1:500 DPR 2, path sun 15 deg altitude, 45 m tower 6 m wide', 33.9 / 512, 45.0, 15.0, 6.0, 45.0))
print('== axis-aligned control (azimuth 0, the repair receipt\'s frame), same law and scan along pixel-centre rows')
def run_axis(label, tau, H, alt, w_m):
    m = max(math.tan(math.radians(alt)), 1 / 8); t_half = H / (m - SIG / 2)
    Lc = floor_level(t_half, 512 * tau, 4); cell = 1 << Lc; W = int(round(w_m / tau)); worst = 0.0
    for off in range(cell):
        i0 = 4096 * cell + off; j0 = 4096 * cell
        rect = (i0 * tau, j0 * tau, (i0 + W) * tau, (j0 + W) * tau, H)
        sc_e = Scene(tau, [rect]); sc_c = Scene(tau, [rect]); jrow = j0 + W // 2
        n0 = int((t_half + 3.0) / tau) + 2; st = {}
        for name, sc, kap in (('exact', sc_e, None), ('c', sc_c, 4)):
            for q in range(n0, 0, -1):
                if visibility(sc, (i0 - q + 0.5) * tau, (jrow + 0.5) * tau, 0.0, m, kap) < 0.5: st[name] = q; break
        worst = max(worst, st['c'] - st['exact'])
    print(f'  {label}: floor cell {cell} px; worst lengthening over every corner offset {worst:.2f} px = {worst / cell:.2f} x the cell side')
run_axis('1:500 DPR 2, fixed sun 45 deg altitude, 45 m tower 6 m wide', 33.9 / 512, 45.0, 45.0, 6.0)
run_axis('1:500 DPR 2, path sun 15 deg altitude, 45 m tower 6 m wide', 33.9 / 512, 45.0, 15.0, 6.0)
