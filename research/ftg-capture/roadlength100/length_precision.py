"""Precise length statistics per edge class and zone, and exact-collinear runs through ANY node (junctions included).
FTG zig-zag sint32 payloads, 1 unit = 1 cm.   python3 research/ftg-capture/roadlength100/length_precision.py <label>=<bin> [...]"""
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
def q(v, f): s = sorted(v); return s[min(len(s) - 1, int(f * len(s)))]
WINDOWS = [(14, 16), (24, 26.5), (29, 31.5), (49, 51.5), (59, 62), (99, 101.5)]
for arg in sys.argv[1:]:
    label, path = arg.split('=', 1); top = fields(open(path, 'rb').read())
    R = fields(one(top, 3)); N = {}; E = []
    for _, v in R[2]:
        d = fields(v); pos = (0, 0)
        if 2 in d: pd = fields(one(d, 2)); pos = (zz(uv(pd, 1)), zz(uv(pd, 2)))
        N[uv(d, 1)] = pos
    for _, v in R[1]:
        d = fields(v); E.append((uv(d, 2), uv(d, 3), uv(d, 4)))
    rings = []
    for _, v in top[10]:
        P = pts(one(fields(one(fields(v), 5)), 1))
        if len(P) > 1 and P[0] == P[-1]: P = P[:-1]
        rings.append(P)
    zone = lambda p: 'in' if any(inside(p, P) for P in rings) else 'out'
    print(f'=== {label}: {one(top, 2, b"").decode()}')
    groups = collections.defaultdict(list)
    for a, b, t in E:
        pa, pb = N[a], N[b]; L = math.dist(pa, pb) / 100
        groups[(t, zone(((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2)))].append(L)
    print('  per (type, zone) and length window: n, min / p10 / p50 / p90 / max (m)')
    for (t, z) in sorted(groups):
        if t not in (0, 1, 4): continue
        for lo, hi in WINDOWS:
            v = [x for x in groups[(t, z)] if lo <= x <= hi]
            if len(v) >= 3:
                print('    type %d %-3s [%5.1f,%5.1f]  n=%4d   %.2f / %.2f / %.2f / %.2f / %.2f' % (t, z, lo, hi, len(v), min(v), q(v, .1), q(v, .5), q(v, .9), max(v)))
    # exact-collinear runs through any node (junctions included) for type 1 and type 0
    inc = collections.defaultdict(list)
    for i, (a, b, t) in enumerate(E): inc[a].append((i, b)); inc[b].append((i, a))
    def straight_next(node, came_from_edge, t):
        a, b, _ = E[came_from_edge]; prev = a if b == node else b
        p0, p = N[prev], N[node]; v1 = (p[0] - p0[0], p[1] - p0[1])
        for j, m in inc[node]:
            if j == came_from_edge or E[j][2] != t: continue
            v2 = (N[m][0] - p[0], N[m][1] - p[1])
            if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9: continue
            d = abs(math.degrees(math.atan2(v2[1], v2[0]) - math.atan2(v1[1], v1[0]))) % 360
            if d > 180: d = 360 - d
            if d < 0.05: return j, m
        return None
    for t in (1, 0):
        seen = set(); runs = collections.defaultdict(collections.Counter); nsplit = collections.defaultdict(collections.Counter)
        for i, (a, b, tt) in enumerate(E):
            if tt != t or i in seen: continue
            seen.add(i); L = math.dist(N[a], N[b]) / 100; k = 1
            for start, _ in ((a, b), (b, a)):
                cur_edge, node = i, start
                while True:
                    nx = straight_next(node, cur_edge, t)
                    if not nx or nx[0] in seen: break
                    j, m = nx; seen.add(j); L += math.dist(N[node], N[m]) / 100; k += 1; cur_edge, node = j, m
            z = zone(N[a])
            runs[z][round(L * 2) / 2] += 1
            if k > 1: nsplit[z][round(L * 2) / 2] += 1
        for z in ('in', 'out'):
            print('  type %d %-3s exact-collinear runs through any node: top lengths %s' % (t, z, runs[z].most_common(8)))
            print('               of which made of >=2 edges (split at junctions): %s' % nsplit[z].most_common(8))
    print()
