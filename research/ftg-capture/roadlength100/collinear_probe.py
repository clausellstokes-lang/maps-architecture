"""Is a configured road segment persisted as two collinear halves split at a JUNCTION? (FTG, zig-zag sint32, 1 unit = 1 cm)

critic2 tested straightness only at degree-2 nodes. A midpoint split where a branch attaches creates a degree>=3 node, so
here every node (any degree) is examined: for each pair of same-type edges meeting at a node, the deviation from straight
is measured; 'through pairs' (deviation < 20 deg) are binned as exact (< 0.05 deg) or bent, with the two edge lengths.

  python3 research/ftg-capture/roadlength100/collinear_probe.py <label>=<layout.bin> [...]
"""
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
def lc(L):
    for n, lo, hi in (('15', 14.5, 15.5), ('25', 24.5, 25.5), ('30', 29.5, 30.5), ('50', 49.5, 51.5), ('60', 59.5, 61.5), ('100', 99.5, 101.5)):
        if lo <= L <= hi: return n
    return 'oth'

def run(label, path):
    top = fields(open(path, 'rb').read())
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
    inc = collections.defaultdict(list)
    for a, b, t in E: inc[a].append((b, t)); inc[b].append((a, t))
    print(f'=== {label}: {one(top, 2, b"").decode()}')
    for t in (0, 1):
        for zone in ('in-ring', 'out-ring'):
            exact = collections.Counter(); bent = collections.Counter(); dev_hist = collections.Counter(); deg_exact = collections.Counter()
            for nd, lst in inc.items():
                p = N[nd]
                if (any(inside(p, P) for P in rings)) != (zone == 'in-ring'): continue
                same = [(m, tt) for m, tt in lst if tt == t]
                for i in range(len(same)):
                    for j in range(i + 1, len(same)):
                        p1, p2 = N[same[i][0]], N[same[j][0]]
                        v1 = (p1[0] - p[0], p1[1] - p[1]); v2 = (p2[0] - p[0], p2[1] - p[1])
                        l1, l2 = math.hypot(*v1) / 100, math.hypot(*v2) / 100
                        if l1 < 1e-6 or l2 < 1e-6: continue
                        d = abs(math.degrees(math.atan2(v2[1], v2[0]) - math.atan2(v1[1], v1[0]))) % 360
                        if d > 180: d = 360 - d
                        dev = 180 - d
                        if dev >= 20: continue
                        key = '+'.join(sorted((lc(l1), lc(l2)), key=lambda s: (s == 'oth', s)))
                        dev_hist[min(int(dev), 19)] += 1
                        if dev < 0.05: exact[key] += 1; deg_exact[len(lst)] += 1
                        else: bent[key] += 1
            ne, nb = sum(exact.values()), sum(bent.values())
            if ne + nb == 0: continue
            print(f'  type {t} {zone}: through-pairs {ne + nb}; exact-straight (<0.05 deg) {ne} ({100 * ne / (ne + nb):.0f}%) at node degrees {dict(sorted(deg_exact.items()))}')
            print(f'     exact pairs by length classes: {exact.most_common(6)}')
            print(f'     bent  pairs by length classes: {bent.most_common(6)}')
            print(f'     deviation histogram 0..19 deg: {[dev_hist.get(k, 0) for k in range(20)]}')

for arg in sys.argv[1:]:
    label, path = arg.split('=', 1); run(label, path); print()
