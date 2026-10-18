# PENDING FABLE REVIEW — receipt of amendments-c/repair-rendering-r3 (opus stand-in). Our own code, stdlib only.
# Checks the ring blocks the repair writes into §8.8 / §8.4 (c) for VRC2-01 (the rings grew with the square of the relief)
# and the 16-bit full-precision figures of VRC2-03.
#
# The structure. Tile positions are world-aligned (§8.8); a position's ring index r is its Chebyshev distance, in
# positions, from the visible set (r = 0 visible). Ring 1 is held per position from level 0 (its heights rastered).
# Every other position within the window is held by a BLOCK: the world-aligned square of 2^m x 2^m positions whose
# indices agree after a shift by m (the block of order m), taken as the largest order whose every position lies in
# ring 2^m + 1 or beyond; a block is held from the level the floor gives its nearest position, l_B = max(m + 2,
# floor(log2(4 (r_min - 1)))), r_min the smallest ring index among its positions — at most 128 x 128 cells — its levels
# continuing above level 9 (a cell there spanning 2^(l - 9) tile sides) up to one cell per block.
# The law (§8.4 (c)): a cell met by the ray over [ta, tb] is resolved at level 0 or at the floor l(ta) = max(0,
# floor(log2(4 ta / S))), otherwise divided; a cell whose bound cannot lower the running minimum is skipped.
# Claims tested here:
#  (1) soundness: every cell the law resolves lies at or above the base level of the structure that holds it (a block's
#      m + 2), and never above its top; so the law's value is the same as over a world pyramid with no partition —
#      the partition decides where a cell is read, never which cell is read;
#  (2) counts and memory of the held set per view, bounded by the document whatever the window;
#  (3) the per-export-tile window; (4) the alternatives the repair rejected; (5) the canvas-need worked cases (Q, Q_f);
#  (6) the build-time model.
import math, random

SIG = math.tan(math.radians(0.27))
M1500 = 0.1323            # metres per CSS px at the 1:500 stop (§8.8's B-ZOOM finest stop)
MB = 1048576.0

# ---------------------------------------------------------------- the partition
def ring_index(tx, ty, V):
    x0, y0, a, b = V
    dx = max(0, x0 - tx, tx - (x0 + a - 1)); dy = max(0, y0 - ty, ty - (y0 + b - 1))
    return max(dx, dy)

def block_minr(m, u, v, V):
    x0, y0, a, b = V
    bx0, bx1 = u << m, ((u + 1) << m) - 1
    by0, by1 = v << m, ((v + 1) << m) - 1
    dx = max(0, x0 - bx1, bx0 - (x0 + a - 1)); dy = max(0, y0 - by1, by0 - (y0 + b - 1))
    return max(dx, dy)

def qualifies(m, u, v, V):
    return block_minr(m, u, v, V) >= (1 << m) + 1

def max_order(tx, ty, V):
    m = 0
    while qualifies(m + 1, tx >> (m + 1), ty >> (m + 1), V):
        m += 1
    return m

def structure_of(L, i, j, V):
    """(kind, key, base, top) of the held structure that contains cell (L, i, j), or None when no single one does"""
    if L <= 9:
        tx, ty = i >> (9 - L), j >> (9 - L)
        r = ring_index(tx, ty, V)
        if r <= 1:
            return ('tile', (tx, ty), 0, 9)
        M = max_order(tx, ty, V)
        return ('block', (M, tx >> M, ty >> M), block_level(M, tx >> M, ty >> M, V), M + 9)
    tx, ty = i << (L - 9), j << (L - 9)
    if ring_index(tx, ty, V) <= 1:
        return None
    M = max_order(tx, ty, V)
    if M >= L - 9:
        return ('block', (M, tx >> M, ty >> M), block_level(M, tx >> M, ty >> M, V), M + 9)
    return None

def block_level(m, u, v, V):
    r = block_minr(m, u, v, V)
    return max(m + 2, math.floor(math.log2(4 * (r - 1))))

def block_cells(m, u, v, V):
    side = 1 << (m + 9 - block_level(m, u, v, V))
    return side * side * 4 / 3

# ---------------------------------------------------------------- the scene and the law
class Scene:
    def __init__(self, tau, rects):
        self.tau = tau; self.S = 512 * tau; self.rects = rects
        self.Z = max([r[4] for r in rects] + [0.0]); self.memo = {}
    def cell_box(self, L, i, j):
        s = self.tau * (1 << L)
        return (i * s, j * s, (i + 1) * s, (j + 1) * s)
    def cell_max(self, L, i, j):
        key = (L, i, j); v = self.memo.get(key)
        if v is None:
            x0, y0, x1, y1 = self.cell_box(L, i, j); v = 0.0
            for (rx0, ry0, rx1, ry1, h) in self.rects:
                if rx0 < x1 and rx1 > x0 and ry0 < y1 and ry1 > y0 and h > v: v = h
            self.memo[key] = v
        return v
    def h_at(self, x, y):
        v = 0.0
        for (x0, y0, x1, y1, h) in self.rects:
            if x0 <= x < x1 and y0 <= y < y1 and h > v: v = h
        return v

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

def floor_level(t, S):
    x = 4 * t / S
    return max(0, math.floor(math.log2(x))) if x >= 1 else 0

ROOT = 20
def visibility(sc, px, py, az_deg, m, V=None, stats=None):
    """V is None: the law over a world pyramid with no partition (every level held everywhere);
    V a view: the law over the held structures of that view (first ring per position, blocks beyond)"""
    z = sc.h_at(px, py)
    R = (sc.Z - z) / (m - SIG)
    if R <= 0: return 1.0
    dx, dy = math.cos(math.radians(az_deg)), math.sin(math.radians(az_deg))
    best = [1.0]
    def visit(L, i, j):
        if best[0] <= 0: return
        span = seg_box(px, py, dx, dy, R, sc.cell_box(L, i, j))
        if span is None: return
        ta, tb = span
        st = None
        if V is not None:
            st = structure_of(L, i, j, V)
            if st is None:                         # above the held structures: divide, reading no bound
                kids = []
                for a in (0, 1):
                    for b in (0, 1):
                        sp = seg_box(px, py, dx, dy, R, sc.cell_box(L - 1, 2 * i + a, 2 * j + b))
                        if sp is not None: kids.append((sp[0], 2 * i + a, 2 * j + b))
                for _, ci, cj in sorted(kids): visit(L - 1, ci, cj)
                return
        hm = sc.cell_max(L, i, j)
        if hm <= z: return
        val = -math.inf if ta <= 0 else (z + ta * m - hm) / (ta * SIG)
        if val >= best[0]: return
        fl = floor_level(ta, sc.S)
        if L > 0 and L > fl:
            if st is not None and L <= st[2]:      # the law asks for a level the structure does not hold
                stats['violations'] += 1
                best[0] = min(best[0], val); return
            kids = []
            for a in (0, 1):
                for b in (0, 1):
                    sp = seg_box(px, py, dx, dy, R, sc.cell_box(L - 1, 2 * i + a, 2 * j + b))
                    if sp is not None: kids.append((sp[0], 2 * i + a, 2 * j + b))
            for _, ci, cj in sorted(kids): visit(L - 1, ci, cj)
        else:
            if stats is not None:
                stats['resolved'] += 1
                if st is not None:
                    if st[0] == 'block':
                        stats['block_resolved'] += 1
                        stats['orders'].add(st[1][0]); stats['maxlevel'] = max(stats['maxlevel'], L)
                    if L < st[2] or L > st[3]: stats['violations'] += 1
            best[0] = min(best[0], val)
    s = sc.tau * (1 << ROOT)
    ex, ey = px + dx * R, py + dy * R
    roots = []
    for i in range(math.floor(min(px, ex) / s) - 1, math.floor(max(px, ex) / s) + 2):
        for j in range(math.floor(min(py, ey) / s) - 1, math.floor(max(py, ey) / s) + 2):
            sp = seg_box(px, py, dx, dy, R, sc.cell_box(ROOT, i, j))
            if sp is not None: roots.append((sp[0], i, j))
    for _, i, j in sorted(roots): visit(ROOT, i, j)
    return max(0.0, min(1.0, best[0]))

print('== (1) soundness and partition independence. 1:500 stop, tile DPR 2 (texel 6.62 cm, tile side S = 33.87 m); the')
print('   reference view (7 x 5 positions). A terraced hill sunward of the view (the mountainous fixture\'s shape) and towers')
print('   of 45, 30 and 20 m in rings 1-3; ground pixels on a 9 x 7 grid over the view, plus pixels along the hill\'s')
print('   terminator; V by the law over the held structures against V over a world pyramid with no partition.')
tau = M1500 / 2; S = 512 * tau
random.seed(20260928)
def run_case(label, rects, V, az, alt, pix):
    sc1 = Scene(tau, rects); sc2 = Scene(tau, rects)
    m = max(math.tan(math.radians(alt)), 1 / 8)
    st = {'violations': 0, 'resolved': 0, 'block_resolved': 0, 'orders': set(), 'maxlevel': 0}
    diff = 0; shaded = 0
    for (x, y) in pix:
        v1 = visibility(sc1, x, y, az, m, None)
        v2 = visibility(sc2, x, y, az, m, V, st)
        if abs(v1 - v2) > 1e-12: diff += 1
        if v2 < 0.5: shaded += 1
    print(f'   {label}: {len(pix)} pixels, {shaded} in shadow; cells resolved {st["resolved"]}, of them in blocks '
          f'{st["block_resolved"]} (orders {sorted(st["orders"])}, levels up to {st["maxlevel"]}); cells outside their '
          f'structure\'s levels {st["violations"]}; pixels whose V differs from the unpartitioned law {diff}')
    return diff, st['violations']

V = (1000, 1000, 7, 5)              # view positions [1000, 1007) x [1000, 1005)
vx0, vy0 = 1000 * S, 1000 * S; vx1, vy1 = 1007 * S, 1005 * S
def grid_pix(nx=9, ny=7):
    return [(vx0 + (k + 0.5) * (vx1 - vx0) / nx + 0.013, vy0 + (l + 0.5) * (vy1 - vy0) / ny + 0.017)
            for k in range(nx) for l in range(ny)]
towers = [(vx1 + 20.0, vy0 + 40.0, vx1 + 26.0, vy0 + 46.0, 45.0),      # ring 1
          (vx1 + 50.0, vy0 + 90.0, vx1 + 56.0, vy0 + 96.0, 30.0),      # ring 2
          (vx1 + 90.0, vy0 + 60.0, vx1 + 96.0, vy0 + 66.0, 20.0)]      # ring 3
def hill(cx, cy, top, side, steps=5):
    out = []
    for k in range(steps):
        h = top * (k + 1) / steps; half = side / 2 * (steps - k) / steps
        out.append((cx - half, cy - half, cx + half, cy + half, h))
    return out
bad = 0
for top, alt in ((300.0, 15.0), (1000.0, 15.0), (3000.0, 15.0), (3000.0, 7.0)):
    m = max(math.tan(math.radians(alt)), 1 / 8)
    t_half = top / (m - SIG / 2)                    # the top terrace's shadow reaches V = 0.5 this far from its face
    side = max(600.0, top * 1.5)
    cxv = (vx0 + vx1) / 2; cyv = (vy0 + vy1) / 2
    for az in (0.0, 45.0):
        dxs, dys = math.cos(math.radians(az)), math.sin(math.radians(az))
        # the hill's top terrace placed sunward so that its V = 0.5 point crosses the view's centre
        near = t_half + side / 2 / 5
        hx, hy = cxv + dxs * near, cyv + dys * near
        rects = towers + hill(hx, hy, top, side)
        pix = grid_pix()
        # pixels across the terminator along the sun's line through the view centre
        pix += [(cxv - dxs * u + 0.011, cyv - dys * u + 0.007) for u in [(-60 + 6 * k) for k in range(21)]]
        d, vi = run_case(f'hill {top:.0f} m, sun {alt:.0f} deg at azimuth {az:.0f}', rects, V, az, alt, pix)
        bad += d + vi
print(f'   total: {bad} differing pixels or out-of-level cells (0 = the partition changes no value)')

# ---------------------------------------------------------------- (2) counts and memory of the held set
def held(V, k, doc):
    """first-ring positions and blocks per order held for view V and a window of k rings, clipped to the document
    doc = (tx0, ty0, tx1, ty1) inclusive tile range"""
    x0, y0, a, b = V; dx0, dy0, dx1, dy1 = doc
    first = 0
    for tx in range(x0 - 1, x0 + a + 1):
        for ty in range(y0 - 1, y0 + b + 1):
            if ring_index(tx, ty, V) == 1 and dx0 <= tx <= dx1 and dy0 <= ty <= dy1: first += 1
    per = {}
    m = 0
    while True:
        if (1 << m) > 2 * max(dx1 - dx0 + 1, dy1 - dy0 + 1) + 2 * (a + b): break
        reach = (1 << (m + 2)) + (1 << (m + 1)) + 2
        lo_u = (x0 - reach) >> m; hi_u = (x0 + a + reach) >> m
        lo_v = (y0 - reach) >> m; hi_v = (y0 + b + reach) >> m
        cnt = 0
        for u in range(lo_u, hi_u + 1):
            if (u << m) > dx1 or (((u + 1) << m) - 1) < dx0: continue
            for v in range(lo_v, hi_v + 1):
                if (v << m) > dy1 or (((v + 1) << m) - 1) < dy0: continue
                if not qualifies(m, u, v, V): continue
                if qualifies(m + 1, u >> 1, v >> 1, V): continue
                if block_minr(m, u, v, V) > k: continue
                cnt += 1; CELLS[0] += block_cells(m, u, v, V); CELLS[1] += 128 * 128 * 4 / 3
        if cnt: per[m] = cnt
        m += 1
    return first, per

CELLS = [0.0, 0.0]

def views(d):
    out = []
    for W, H in ((1440, 900), (1366, 768), (1920, 1080)):
        a = math.ceil(W * d / 512) + 1; b = math.ceil(H * d / 512) + 1
        out.append((f'{W} x {H} at DPR {d}', a, b))
    return out

FRAMES = [('TOWN (2.0 km + 30 % margins)', 2000 * 1.6, 2000 * 1.6),
          ('CITY (5.0 km + margins)', 5000 * 1.6, 5000 * 1.6),
          ('METROPOLIS target (8.0 km + margins)', 8000 * 1.6, 8000 * 1.6),
          ('the cap, square (12.4 km + margins)', 12400 * 1.6, 12400 * 1.6),
          ('the cap, aspect 2 (17.53 x 8.76 km + margins)', 17530 * 1.6, 8760 * 1.6)]

print('== (2) the held set at the 1:500 stop with the window reaching the whole frame (the worst case: a low sun over')
print('   relief at least the frame\'s extent), 64 placements each: 24 near the frame\'s centre, 24 anywhere, 16 at a corner;')
print('   memory at 1 B per cell (the view), 2 B (the full-precision surface, VRC2-03); first ring 1/3 MB (2/3 MB) each,')
print('   a block at most 128^2 cells with its levels above (21 845 cells = 1/48 MB at 1 B), from its nearest position\'s level')
worst_B = {}
for d in (1, 1.5, 2, 3):
    tau_d = M1500 / d; S_d = 512 * tau_d
    for vlabel, a, b in views(d):
        rowmax = None
        for flabel, fw, fh in FRAMES:
            ntx = math.ceil(fw / S_d); nty = math.ceil(fh / S_d)
            doc = (0, 0, ntx - 1, nty - 1)
            kmax = max(ntx, nty)
            worst = (0, 0, {}, 0.0)
            rnd = random.Random(7)
            placements = []
            for _ in range(24):
                placements.append((ntx // 2 - a // 2 + rnd.randrange(64), nty // 2 - b // 2 + rnd.randrange(64)))
            for _ in range(24):
                placements.append((rnd.randrange(ntx), rnd.randrange(nty)))
            for _ in range(16):
                placements.append((rnd.randrange(16), rnd.randrange(16)))
            for (px0, py0) in placements:
                Vv = (px0, py0, a, b)
                CELLS[0] = CELLS[1] = 0.0
                first, per = held(Vv, kmax, doc)
                nb = sum(per.values()); mem = CELLS[0] / MB
                if mem > worst[3] or (mem == worst[3] and nb > worst[1]): worst = (first, nb, per, mem, CELLS[1] / MB)
            first, nb, per, mem, mem128 = worst
            print(f'   {vlabel:22s} {flabel:46s}: first ring {first:3d}, blocks {nb:4d} over orders 0-{max(per) if per else 0:2d} '
                  f'(largest per order {max(per.values()) if per else 0}); held {first + nb:4d}; '
                  f'first ring {first/3:5.2f} MB + blocks {mem:5.2f} MB (2 B: {2*first/3:5.2f} + {2*mem:5.2f} MB; '
                  f'every block from its order\'s level m + 2: {mem128:5.2f} MB)')
            key = (d, a, b)
            worst_B[key] = max(worst_B.get(key, 0.0), mem)

# a per-order bound independent of the document: the most blocks any order holds over the placements and frames above
print('   the blocks of all orders together at 1 B, the largest over every frame and alignment above:')
for key in sorted(worst_B):
    print(f'     DPR {key[0]}, view {key[1]} x {key[2]} positions: blocks <= {worst_B[key]:.2f} MB (2 B: {2*worst_B[key]:.2f} MB)')

# ---------------------------------------------------------------- (3) the export tile's window
print('== (3) a lit export tile\'s window (one 512^2 export tile; the CPU reference in float32: its surface 12 B per pixel,')
print('   4 B per pyramid cell): its own surface 3 MB and pyramid 1/3 MB, its first ring (8 positions, 1 MB of heights and')
print('   1/3 MB of pyramid each), and its blocks (4 B per cell in float32), for 300-dpi export tiles at the 1:500 scale')
print('   (S = 21.67 m) and at the whole-frame A2 scale, the window reaching the whole frame, 64 placements:')
exp_worst = 0.0
for flabel, fw, fh in FRAMES:
    for scale_label, S_e in (('1:500', 512 * 0.0254 / 300 * 500),
                             ('the frame on A2 (long side 0.594 m)', 512 * 0.0254 / 300 * (max(fw, fh) / 0.594))):
        ntx = math.ceil(fw / S_e); nty = math.ceil(fh / S_e)
        doc = (0, 0, ntx - 1, nty - 1)
        rnd = random.Random(11); worst = (0, {}, 0.0)
        for _ in range(64):
            Vv = (rnd.randrange(ntx), rnd.randrange(nty), 1, 1)
            CELLS[0] = CELLS[1] = 0.0
            first, per = held(Vv, max(ntx, nty), doc)
            if CELLS[0] > worst[2]: worst = (first, per, CELLS[0])
        first, per, cells = worst; nb = sum(per.values())
        win = 3.0 + 1 / 3 + first * (1 + 1 / 3) + 4 * cells / MB
        exp_worst = max(exp_worst, win)
        print(f'   {flabel:46s} at {scale_label:36s}: S {S_e:7.1f} m, first ring {first}, blocks {nb:3d} '
              f'(orders 0-{max(per) if per else 0}); window {win:5.2f} MB (own 3.33 + first ring {first*4/3:5.2f} + blocks {4*cells/MB:5.2f})')
print(f'   the largest export-tile window above: {exp_worst:.2f} MB')

# ---------------------------------------------------------------- (4) the alternatives
print('== (4) the alternatives, at the 1:500 stop')
print('   (a) the r2 text: every ring position held out to R (the verifier\'s rings receipt reproduces it: 5 440 positions for')
print('       300 m of relief under a 15 deg sun at DPR 2, 53 788 for 1 000 m).')
for d in (2, 3):
    a = math.ceil(1440 * d / 512) + 1; b = math.ceil(900 * d / 512) + 1
    n16 = (a + 32) * (b + 32) - a * b
    print(f'   (b) positions held one by one out to ring j0 = 16, reference view at DPR {d}: {n16} positions, each a raster job and')
    print(f'       a transfer (the held set of (2) instead: see its "held" column),')
    tau_d = M1500 / d; cell6 = 64 * tau_d
    for flabel, fw, fh in FRAMES:
        cells = math.ceil(fw / cell6) * math.ceil(fh / cell6)
        print(f'       and a whole-frame far field from level 6 ({cell6:.2f} m cells) over {flabel}: {cells/1e6:6.2f} M cells, '
              f'{cells*4/3/MB:6.2f} MB at 1 B, {cells*8/3/MB:6.2f} MB at 2 B')
print('   (c) a cap on R at N tile sides: a caster beyond N·S never shades the view, while the same caster shades it at a')
print('       coarser stop whose tiles are larger, so a shadow\'s presence would change with the zoom stop (J-A68.84).')

# ---------------------------------------------------------------- (5) the canvas need
print('== (5) the canvas need with the light pass: Q = P/12 + (2(a + b) + 4)/3 + B at 1 B; Q_f = P/6 + 2(2(a + b) + 4)/3 + 2B')
print('   at the full-precision surface (16-bit pyramids, first-ring heights and blocks); B by the tile DPR, rounded up from')
print('   (2)\'s largest: 3.75 MB at DPR 1, 4.25 at 1.5, 4.75 at 2, 5.5 at 3. Base needs are §8.8\'s (4.25P + 7 MB; 6.5P + 7 MB at')
print('   full precision); the export-time canvases add 15 MB, or drop the coarser-stop set (P MB) first (§12.8).')
BQ = {1: 3.75, 1.5: 4.25, 2: 4.75, 3: 5.5}
for key in sorted(worst_B):
    assert worst_B[key] <= BQ[key[0]], (key, worst_B[key])
print('   (each B above is >= the largest (2) found at its DPR: checked)')
for label, a, b, d, fp, ceil in (('reference view 1 440 x 900, DPR 2 (high tier)', 7, 5, 2, False, 192),
                                 ('reference view, DPR 1.5 (mid tier)', 6, 4, 1.5, False, 128),
                                 ('low-end 1 366 x 768, DPR 1 (low tier)', 4, 3, 1, False, 72),
                                 ('low-end 1 920 x 1 080, DPR 1 (low tier)', 5, 4, 1, False, 72),
                                 ('reference view, DPR 2, full precision (high tier)', 7, 5, 2, True, 192),
                                 ('reference view, DPR 1.5, full precision (high tier)', 6, 4, 1.5, True, 192),
                                 ('reference view, DPR 1.5, full precision (mid tier)', 6, 4, 1.5, True, 128),
                                 ('reference view, DPR 1, full precision (mid tier)', 4, 3, 1, True, 128),
                                 ('low-end 1 366 x 768, DPR 1, full precision (low tier)', 4, 3, 1, True, 72)):
    P = a * b; B = BQ[d]
    if fp:
        base = 6.5 * P + 7; Q = P / 6 + 2 * (2 * (a + b) + 4) / 3 + 2 * B
    else:
        base = 4.25 * P + 7; Q = P / 12 + (2 * (a + b) + 4) / 3 + B
    need = base + Q
    ex = need + 15; exd = need - P + 15
    fits = 'fits' if need <= ceil else 'over'
    print(f'   {label:52s}: P = {P:2d} (a {a}, b {b}); base {base:6.2f} + Q {Q:5.2f} = {need:6.2f} MB, {fits} {ceil}; '
          f'with an export {ex:6.2f}, its coarser-stop set dropped {exd:6.2f}')

# ---------------------------------------------------------------- (6) build time
print('== (6) the build-time model of the blocks over a whole frame at the finest stop (PLAUSIBLE until M2b): each block')
print('   reads the city band\'s marks that meet it (each mark of the frame met by the blocks of one partition about once:')
print('   ~1 us each), the terrain field\'s samples meeting it (~2 ns each) and writes its 21 845 cells (~0.05 ms per block);')
print('   marks ~11.5 per building (§8.1 item 6: ~60 000 marks for ~5 200 buildings); terrain cells 5 / 8 / 10 m (§2.3).')
for flabel, fw, fh, bld, cell in (('TOWN target', 3200, 3200, 1350, 5.0), ('CITY target', 8000, 8000, 5250, 8.0),
                                  ('METROPOLIS target', 12800, 12800, 13500, 10.0), ('the cap', 19840, 19840, 35000, 10.0)):
    marks = 11.5 * bld; samples = (fw / cell) * (fh / cell)
    t = marks * 1e-3 + samples * 2e-6 + 450 * 0.05
    print(f'   {flabel:18s}: ~{marks:8.0f} marks, ~{samples/1e6:4.2f} M samples, <= 450 blocks (2): ~{t:6.1f} ms')
