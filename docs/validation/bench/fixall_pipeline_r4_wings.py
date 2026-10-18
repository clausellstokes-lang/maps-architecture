# fixall_pipeline_r4_wings.py — fix-all round 4, pipeline lane (NP3-1): does §2.6's wing-carrying rule keep a
# building's wings uniting exactly to its footprint face under a warp?  Our own code, stdlib Python 3 only.
#
# Model: integer-centimetre footprints built from rectangular wings (tiled L, T, cross and U houses, and a T whose stem
# overlaps its bar by 100 cm). The footprint's rings carry every wing vertex that lies on the wings' union boundary
# (rule 1 of §2.6). A smooth random displacement field (amplitude A, wavelength 20-80 m) moves every footprint vertex,
# rounded to the lattice. Carry: boundary vertices follow their footprint vertex by identity (rule 2 (a)); every other
# wing vertex (a hidden corner of an overlapping wing) takes its mean-value coordinates in the footprint ring before the
# move, applied after it, rounded (rule 2 (b)). Checks, all exact on integers:
#   tiles  - every carried ring simple and counter-clockwise, the sum of the wings' twice-areas equals the footprint's,
#            and every wing edge is either a footprint edge or shared with exactly one other wing in reverse
#            (together: the wings partition the footprint exactly, i.e. their union equals it);
#   overlap- the stem's two hidden corners lie strictly inside the carried bar and the footprint (so the union is still
#            the footprint: the stem's other vertices are footprint vertices).
# It also counts rects that fail the convex near-rectangle test after the carry (they become quads, rule 3).
# A trial whose moved footprint is not simple is skipped: the kernel's whole-step validation would halve that step.
import math, random

def area2(r):
    s = 0
    for i in range(len(r)):
        x1, y1 = r[i]; x2, y2 = r[(i + 1) % len(r)]
        s += x1 * y2 - x2 * y1
    return s

def orient(a, b, c):
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])

def seg_cross(a, b, c, d):
    d1, d2, d3, d4 = orient(c, d, a), orient(c, d, b), orient(a, b, c), orient(a, b, d)
    return ((d1 > 0) != (d2 > 0)) and ((d3 > 0) != (d4 > 0)) and d1 != 0 and d2 != 0 and d3 != 0 and d4 != 0

def simple(r):
    n = len(r)
    if len(set(r)) != n:
        return False
    for i in range(n):
        for j in range(i + 1, n):
            if abs(i - j) in (1, n - 1):
                continue
            if seg_cross(r[i], r[(i + 1) % n], r[j], r[(j + 1) % n]):
                return False
    # also reject a vertex lying on a non-adjacent edge
    for i in range(n):
        p = r[i]
        for j in range(n):
            if j == i or (j + 1) % n == i:
                continue
            a, b = r[j], r[(j + 1) % n]
            if orient(a, b, p) == 0 and min(a[0], b[0]) <= p[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= p[1] <= max(a[1], b[1]):
                return False
    return True

def inside_strict(r, p):
    # exact winding test on integers; False on the boundary
    n = len(r); w = 0
    for i in range(n):
        a, b = r[i], r[(i + 1) % n]
        o = orient(a, b, p)
        if o == 0 and min(a[0], b[0]) <= p[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= p[1] <= max(a[1], b[1]):
            return False
        if a[1] <= p[1] < b[1] and o > 0:
            w += 1
        elif b[1] <= p[1] < a[1] and o < 0:
            w -= 1
    return w != 0

def mvc(ring, x):
    # mean-value coordinates of a point strictly inside a polygon: + - * / and sqrt only
    n = len(ring); t = []
    for i in range(n):
        ax, ay = ring[i][0] - x[0], ring[i][1] - x[1]
        bx, by = ring[(i + 1) % n][0] - x[0], ring[(i + 1) % n][1] - x[1]
        la, lb = math.sqrt(ax * ax + ay * ay), math.sqrt(bx * bx + by * by)
        cr = ax * by - ay * bx; dt = ax * bx + ay * by
        t.append(cr / (la * lb + dt))   # tan(alpha/2) in the form that is finite whenever x is not on the edge itself
    w = []
    for i in range(n):
        vx, vy = ring[i][0] - x[0], ring[i][1] - x[1]
        w.append((t[i - 1] + t[i]) / math.sqrt(vx * vx + vy * vy))
    s = sum(w)
    return [wi / s for wi in w]

def apply(ring, lam):
    return (round(sum(l * p[0] for l, p in zip(lam, ring))), round(sum(l * p[1] for l, p in zip(lam, ring))))

def near_rect(r):
    # convex near-rectangle test of the roof paths (every turn >= 0, OBB corners matched within 30 cm, area >= 0.97 OBB)
    n = len(r)
    if any(orient(r[i], r[(i + 1) % n], r[(i + 2) % n]) < 0 for i in range(n)):
        return False
    best = None
    for i in range(n):
        a, b = r[i], r[(i + 1) % n]
        dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy)
        if L == 0:
            continue
        ux, uy = dx / L, dy / L
        us = [p[0] * ux + p[1] * uy for p in r]; vs = [-p[0] * uy + p[1] * ux for p in r]
        A = (max(us) - min(us)) * (max(vs) - min(vs))
        if best is None or A < best[0]:
            best = (A, ux, uy, min(us), max(us), min(vs), max(vs))
    A, ux, uy, u0, u1, v0, v1 = best
    corners = [(u * ux - v * uy, u * uy + v * ux) for u, v in ((u0, v0), (u1, v0), (u1, v1), (u0, v1))]
    ok = all(min(math.hypot(c[0] - p[0], c[1] - p[1]) for p in r) <= 30 for c in corners)
    return ok and abs(area2(r)) / 2 >= 0.97 * A

def seg_dist(a, b, p):
    dx, dy = b[0] - a[0], b[1] - a[1]
    L2 = dx * dx + dy * dy
    t = max(0.0, min(1.0, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2))
    return math.hypot(a[0] + t * dx - p[0], a[1] + t * dy - p[1])

def near_rect_corners(r, corner_idx, tol=2.0):
    # the round-4 rule: the four corners pass the convex near-rectangle test, and every other ring vertex lies within
    # tol cm of the segment between the two corners it lies between
    cs = [r[i] for i in corner_idx]
    if not near_rect(cs):
        return False
    for k in range(4):
        i0, i1 = corner_idx[k], corner_idx[(k + 1) % 4]
        j = (i0 + 1) % len(r)
        while j != i1:
            if seg_dist(r[i0], r[i1], r[j]) > tol:
                return False
            j = (j + 1) % len(r)
    return True

def rect(x0, y0, x1, y1):
    return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]

def insert_on_sides(ring, pts):
    # a ring with every point of pts that lies on one of its sides inserted in order (rule 1)
    out = []
    n = len(ring)
    for i in range(n):
        a, b = ring[i], ring[(i + 1) % n]
        out.append(a)
        on = [p for p in pts if p != a and p != b and orient(a, b, p) == 0
              and min(a[0], b[0]) <= p[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= p[1] <= max(a[1], b[1])]
        on.sort(key=lambda p: (p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2)
        out.extend(on)
    return out

# footprints: (name, outer ring ccw, wings (ccw rings), overlap corners {wing index: [hidden corner points]})
M = 100  # 1 m in cm
SHAPES = []
# L: long bar 12x5 m + stem 5x6 m on its left end, tiled
L_outer = [(0, 0), (12 * M, 0), (12 * M, 5 * M), (5 * M, 5 * M), (5 * M, 11 * M), (0, 11 * M)]
SHAPES.append(('L tiled', L_outer, [rect(0, 0, 12 * M, 5 * M), rect(0, 5 * M, 5 * M, 11 * M)], None))
# T: bar 14x5 on top, stem 5x7 below its middle, tiled
T_outer = [(5 * M, 0), (10 * M, 0), (10 * M, 7 * M), (15 * M, 7 * M), (15 * M, 12 * M), (1 * M, 12 * M), (1 * M, 7 * M), (5 * M, 7 * M)]
SHAPES.append(('T tiled', T_outer, [rect(1 * M, 7 * M, 15 * M, 12 * M), rect(5 * M, 0, 10 * M, 7 * M)], None))
# cross: vertical bar 5x16 + two arms 5x5, tiled
C_outer = [(5 * M, 0), (10 * M, 0), (10 * M, 6 * M), (15 * M, 6 * M), (15 * M, 11 * M), (10 * M, 11 * M), (10 * M, 16 * M), (5 * M, 16 * M),
           (5 * M, 11 * M), (0, 11 * M), (0, 6 * M), (5 * M, 6 * M)]
SHAPES.append(('cross tiled', C_outer, [rect(5 * M, 0, 10 * M, 16 * M), rect(10 * M, 6 * M, 15 * M, 11 * M), rect(0, 6 * M, 5 * M, 11 * M)], None))
# U: base 16x5 + two legs 5x8, tiled
U_outer = [(0, 0), (16 * M, 0), (16 * M, 13 * M), (11 * M, 13 * M), (11 * M, 5 * M), (5 * M, 5 * M), (5 * M, 13 * M), (0, 13 * M)]
SHAPES.append(('U tiled', U_outer, [rect(0, 0, 16 * M, 5 * M), rect(0, 5 * M, 5 * M, 13 * M), rect(11 * M, 5 * M, 16 * M, 13 * M)], None))
# T overlapping: stem runs 1 m into the bar; its two top corners are hidden inside the bar
SHAPES.append(('T overlap', T_outer, [rect(1 * M, 7 * M, 15 * M, 12 * M), rect(5 * M, 0, 10 * M, 8 * M)], {1: [(5 * M, 8 * M), (10 * M, 8 * M)]}))

def run(amplitude_cm, trials, rng):
    res = {}
    for name, outer, wings, hidden in SHAPES:
        allpts = set(outer)
        for w in wings:
            allpts |= set(w)
        # rule 1: footprint ring through every wing vertex on the union boundary; wings through every footprint and
        # other-wing vertex on their sides
        fp = insert_on_sides(outer, [p for p in allpts if p not in outer])
        W = [insert_on_sides(w, [p for p in allpts if p not in w]) for w in wings]
        hid = set(hidden[1]) if hidden else set()
        ok = fail = skipped = quads = quads2 = 0
        cidx = [[w2.index(c) for c in w] for w, w2 in zip(wings, W)]
        for _ in range(trials):
            ox, oy = rng.uniform(-50 * M, 50 * M), rng.uniform(-50 * M, 50 * M)
            lam = rng.uniform(20 * M, 80 * M); ph = [rng.uniform(0, 2 * math.pi) for _ in range(4)]
            ang = rng.uniform(0, 2 * math.pi)
            def field(p):
                x, y = p[0] + ox, p[1] + oy
                return (amplitude_cm * math.sin(2 * math.pi * x / lam + ph[0]) * math.cos(2 * math.pi * y / lam + ph[1]),
                        amplitude_cm * math.cos(2 * math.pi * x / lam + ph[2] + ang) * math.sin(2 * math.pi * y / lam + ph[3]))
            moved = {}
            for p in fp:
                d = field(p); moved[p] = (p[0] + round(d[0]), p[1] + round(d[1]))
            fp2 = [moved[p] for p in fp]
            if not simple(fp2) or area2(fp2) <= 0:
                skipped += 1
                continue
            W2 = []
            for w in W:
                r = []
                for p in w:
                    if p in moved:
                        r.append(moved[p])          # rule 2 (a): a boundary vertex follows its footprint vertex
                    else:
                        r.append(apply(fp2, mvc(fp, p)))   # rule 2 (b): a joint by mean-value coordinates
                W2.append(r)
            good = all(simple(r) and area2(r) > 0 for r in W2)
            if good and not hidden:
                if sum(area2(r) for r in W2) != area2(fp2):
                    good = False
                fedges = {(fp2[i], fp2[(i + 1) % len(fp2)]) for i in range(len(fp2))}
                cnt = {}
                for r in W2:
                    for i in range(len(r)):
                        e = (r[i], r[(i + 1) % len(r)])
                        cnt[e] = cnt.get(e, 0) + 1
                for e, c in cnt.items():
                    if e in fedges:
                        if c != 1: good = False
                    elif cnt.get((e[1], e[0]), 0) != 1 or c != 1:
                        good = False
                if sum(1 for e in fedges if e not in cnt) != 0:
                    good = False
            if good and hidden:
                for p in hidden[1]:
                    q = apply(fp2, mvc(fp, p))
                    if not (inside_strict(W2[0], q) and inside_strict(fp2, q)):
                        good = False
            if good:
                ok += 1
                # rects that no longer pass the convex near-rectangle test become quads (rule 3)
                quads += sum(1 for r in W2 if not near_rect(r))
                quads2 += sum(1 for r, ci in zip(W2, cidx) if not near_rect_corners(r, ci))
            else:
                fail += 1
        res[name] = (ok, fail, skipped, quads, quads2, ok * len(wings))
    return res

if __name__ == '__main__':
    rng = random.Random(20260926)
    print('fixall_pipeline_r4_wings: wing carry under a smooth warp (NP3-1); seed 20260926; trials per shape and amplitude: 4000')
    print('columns: shape | amplitude (cm) | exact (union = footprint, rings simple) | failed | skipped (moved footprint not simple: the whole-step validation halves) | carried wings | of them failing the raw-ring convex near-rectangle test | failing the corner test (four corners near-rectangle, other ring vertices within 2 cm of their side)')
    for A in (25, 100, 300, 800):
        r = run(A, 4000, rng)
        for name in r:
            ok, fail, sk, q, q2, nw = r[name]
            print(f'{name:12s} | {A:4d} | {ok:5d} | {fail:4d} | {sk:4d} | {nw:5d} | {q:5d} | {q2:5d}')
