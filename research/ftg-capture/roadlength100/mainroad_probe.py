"""Type-1 edges (main-road candidates) by radius: length, in/out of district rings; FTG zig-zag sint32, 1 unit = 1 cm.
  python3 research/ftg-capture/roadlength100/mainroad_probe.py <label>=<layout.bin> [...]"""
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
    rows = []
    for a, b, t in E:
        if t != 1: continue
        pa, pb = N[a], N[b]; mid = ((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2)
        rows.append((math.hypot(*mid) / 100, math.dist(pa, pb) / 100, any(inside(mid, P) for P in rings)))
    rows.sort()
    print(f'=== {label}: {one(top, 2, b"").decode()} — type-1 edges n={len(rows)}; per 100 m radius band: lengths (i = midpoint inside a district ring)')
    band = collections.defaultdict(list)
    for r, L, i in rows: band[int(r // 100)].append(('%.1f%s' % (L, 'i' if i else '')))
    for k in sorted(band):
        if k > 12: break
        print('  %4d-%4d m: %s' % (k * 100, k * 100 + 99, ' '.join(band[k])))
    far = [L for r, L, i in rows if r >= 1300]
    print('  >=1300 m: n=%d, lengths rounded: %s' % (len(far), collections.Counter(int(round(L)) for L in far).most_common(6)))
    print()
