"""Which edge type do building entrances (field 8.6) face, inside vs outside the district rings? FTG zig-zag sint32, 1 unit = 1 cm.
  python3 research/ftg-capture/roadlength100/entrance_probe.py <label>=<bin> [...]"""
import sys, math, collections
sys.path.insert(0, 'tools')
from pb_raw import parse, varint
def zz(u): return (u >> 1) ^ -(u & 1)
def pv(v):
    i, vs = 0, []
    while i < len(v):
        x, i = varint(v, i); vs.append(x)
    return vs
def fields(v):
    d = collections.defaultdict(list)
    for fn, wt, x in parse(v): d[fn].append((wt, x))
    return d
def one(d, fn, default=None): return d[fn][0][1] if fn in d else default
def uv(d, fn, default=0): return d[fn][0][1] if fn in d else default
def pts(v):
    vs = [zz(x) for x in pv(v)]; return [(vs[i], vs[i + 1]) for i in range(0, len(vs) - 1, 2)]
def inside(pt, poly):
    x, y = pt; c = False
    for i in range(len(poly)):
        x1, y1 = poly[i]; x2, y2 = poly[(i + 1) % len(poly)]
        if ((y1 > y) != (y2 > y)) and (x < (x2 - x1) * (y - y1) / (y2 - y1 + 1e-12) + x1): c = not c
    return c
def seg_dist(p, a, b):
    ax, ay = a; bx, by = b; dx, dy = bx - ax, by - ay; L2 = dx * dx + dy * dy
    if L2 == 0: return math.dist(p, a)
    t = max(0, min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / L2)); return math.hypot(p[0] - (ax + t * dx), p[1] - (ay + t * dy))
for arg in sys.argv[1:]:
    label, path = arg.split('=', 1); top = fields(open(path, 'rb').read())
    R = fields(one(top, 3)); N = {}; E = []
    for _, v in R[2]:
        d = fields(v); pos = (0, 0)
        if 2 in d: pd = fields(one(d, 2)); pos = (zz(uv(pd, 1)), zz(uv(pd, 2)))
        N[uv(d, 1)] = pos
    for _, v in R[1]:
        d = fields(v); E.append((N[uv(d, 2)], N[uv(d, 3)], uv(d, 4)))
    rings = []
    for _, v in top[10]:
        P = pts(one(fields(one(fields(v), 5)), 1))
        if len(P) > 1 and P[0] == P[-1]: P = P[:-1]
        rings.append(P)
    CELL = 5000; grid = collections.defaultdict(list)
    for i, (p, q_, t) in enumerate(E):
        for cx in range(min(p[0], q_[0]) // CELL, max(p[0], q_[0]) // CELL + 1):
            for cy in range(min(p[1], q_[1]) // CELL, max(p[1], q_[1]) // CELL + 1): grid[(cx, cy)].append(i)
    def nearest(pt):
        cx, cy = int(pt[0]) // CELL, int(pt[1]) // CELL; best = (1e18, None)
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for i in grid.get((cx + dx, cy + dy), ()):
                    d = seg_dist(pt, E[i][0], E[i][1])
                    if d < best[0]: best = (d, E[i][2])
        return best
    tab = collections.defaultdict(collections.Counter); dists = collections.defaultdict(list)
    for _, v in top[8]:
        d = fields(v)
        if 6 not in d: continue
        ed = fields(one(d, 6)); ent = (zz(uv(ed, 1)), zz(uv(ed, 2)))
        z = 'in-ring' if any(inside(ent, P) for P in rings) else 'out-ring'
        dd, t = nearest(ent)
        if t is None: continue
        tab[z][t] += 1; dists[(z, t)].append(dd / 100)
    print(f'=== {label}: {one(top, 2, b"").decode()} — nearest edge type to each building entrance')
    for z in ('in-ring', 'out-ring'):
        n = sum(tab[z].values())
        print('  %-8s n=%4d  %s' % (z, n, ', '.join('type %d: %d (%.0f%%, median %.2f m)' % (t, c, 100 * c / n, sorted(dists[(z, t)])[len(dists[(z, t)]) // 2]) for t, c in tab[z].most_common(5))))
