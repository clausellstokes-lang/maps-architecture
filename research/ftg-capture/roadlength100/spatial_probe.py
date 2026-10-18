"""Where do the type-0 / type-1 edge-length classes sit? (FTG layout payloads, zig-zag sint32, 1 unit = 1 cm)

  python3 research/ftg-capture/roadlength100/spatial_probe.py <label>=<layout.bin> [...]

For each length class: count, radius of the edge midpoint from the map origin (settlement centre), share whose midpoint
lies inside a district ring (field 10.5.1), share lying ON a ring outline (both endpoints within 1 m of the ring), and
share whose endpoints are both district-ring vertices. Also renders research/ftg-capture/roadlength100/classes_<label>.png
(type-0 edges coloured by length class, type-1 black, district rings red, wall towers black dots).
"""
import sys, math, collections, os
sys.path.insert(0, 'tools')
from pb_raw import parse, varint
from PIL import Image, ImageDraw

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
def ring_dist(p, ring): return min(seg_dist(p, ring[i], ring[(i + 1) % len(ring)]) for i in range(len(ring)))

CLASSES = [('15', 14.5, 15.5), ('25', 24.5, 25.5), ('30', 29.5, 30.5), ('50', 49.5, 51.5), ('60', 59.5, 61.5), ('100', 99.5, 101.5)]
COL = {'15': (255, 140, 0), '25': (0, 90, 255), '30': (230, 0, 0), '50': (0, 170, 0), '60': (170, 0, 170), '100': (120, 60, 0), 'other': (150, 150, 150)}
def cls(L):
    for n, lo, hi in CLASSES:
        if lo <= L <= hi: return n
    return 'other'
def q(v, f): s = sorted(v); return s[min(len(s) - 1, int(f * len(s)))] if s else float('nan')

def run(label, path):
    top = fields(open(path, 'rb').read())
    R = fields(one(top, 3)); nodes = {}; edges = []
    for _, v in R[2]:
        d = fields(v); pos = (0, 0)
        if 2 in d: pd = fields(one(d, 2)); pos = (zz(uv(pd, 1)), zz(uv(pd, 2)))
        nodes[uv(d, 1)] = pos
    for _, v in R[1]:
        d = fields(v); edges.append((uv(d, 2), uv(d, 3), uv(d, 4)))
    rings = []
    for _, v in top[10]:
        d = fields(v); sd = fields(one(d, 5)); P = pts(one(sd, 1))
        if len(P) > 1 and P[0] == P[-1]: P = P[:-1]
        rings.append((one(d, 2).decode(), P))
    ringverts = set(p for _, P in rings for p in P)
    towers = []
    for _, v in top[7]:
        d = fields(v); pd = fields(one(d, 2)); towers.append((uv(d, 1), (zz(uv(pd, 1)), zz(uv(pd, 2)))))
    towers.sort()
    B = []
    for _, v in top[8]:
        P = pts(one(fields(v), 2)); B.append((sum(p[0] for p in P) / len(P), sum(p[1] for p in P) / len(P)))
    com = (sum(p[0] for p in B) / len(B), sum(p[1] for p in B) / len(B))
    print(f'=== {label}: {one(top, 2, b"").decode()}  building CoM ({com[0] / 100:.0f}, {com[1] / 100:.0f}) m; district rings: ' +
          ', '.join(f'{n} ({len(P)} v)' for n, P in rings) + f'; towers {len(towers)}')
    stats = collections.defaultdict(lambda: collections.defaultdict(list))
    for a, b, t in edges:
        if t not in (0, 1): continue
        pa, pb = nodes[a], nodes[b]; L = math.dist(pa, pb) / 100; c = cls(L)
        mid = ((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2)
        s = stats[(t, c)]
        s['r'].append(math.hypot(*mid) / 100)
        s['in'].append(any(inside(mid, P) for _, P in rings))
        s['on'].append(any(ring_dist(pa, P) < 100 and ring_dist(pb, P) < 100 and ring_dist(mid, P) < 100 for _, P in rings))
        s['rv'].append(pa in ringverts and pb in ringverts)
    print('  type class     n   radius p10/p50/p90 (m)   midpoint inside a ring   on a ring outline   both ends ring vertices')
    for t in (0, 1):
        for c in [n for n, _, _ in CLASSES] + ['other']:
            s = stats.get((t, c))
            if not s: continue
            n = len(s['r'])
            print('  %4d %5s %5d   %5.0f / %5.0f / %5.0f        %5.1f%%                %5.1f%%              %5.1f%%' % (
                t, c, n, q(s['r'], .1), q(s['r'], .5), q(s['r'], .9), 100 * sum(s['in']) / n, 100 * sum(s['on']) / n, 100 * sum(s['rv']) / n))
    # render (core window chosen from the type-0 extent)
    E0 = [(nodes[a], nodes[b]) for a, b, t in edges if t == 0]
    xs = [p[0] for e in E0 for p in e]; ys = [p[1] for e in E0 for p in e]
    x0, x1, y0, y1 = q(xs, .01) - 10000, q(xs, .99) + 10000, q(ys, .01) - 10000, q(ys, .99) + 10000
    span = max(x1 - x0, y1 - y0); S = 1400; sc = S / span
    def T(p): return ((p[0] - x0) * sc, S - (p[1] - y0) * sc)
    im = Image.new('RGB', (S, S), (245, 243, 232)); dr = ImageDraw.Draw(im)
    for _, v in top[6]:
        P = [T(p) for p in pts(one(fields(v), 2))]
        if len(P) > 2: dr.polygon(P, fill=(190, 210, 230))
    for a, b, t in edges:
        if t == 4: dr.line([T(nodes[a]), T(nodes[b])], fill=(200, 200, 200), width=1)
    for a, b, t in edges:
        if t == 0:
            L = math.dist(nodes[a], nodes[b]) / 100; dr.line([T(nodes[a]), T(nodes[b])], fill=COL[cls(L)], width=3)
        elif t == 1: dr.line([T(nodes[a]), T(nodes[b])], fill=(0, 0, 0), width=4)
    for _, P in rings: dr.line([T(p) for p in P + [P[0]]], fill=(255, 0, 255), width=1)
    for _, p in towers:
        c = T(p); dr.ellipse([c[0] - 4, c[1] - 4, c[0] + 4, c[1] + 4], fill=(0, 0, 0))
    y = 10
    for k in ['25', '30', '50', '15', '100', '60', 'other']:
        dr.rectangle([10, y, 40, y + 12], fill=COL[k]); dr.text((48, y), f'type 0, {k} m' if k != 'other' else 'type 0, other', fill=(0, 0, 0)); y += 18
    dr.rectangle([10, y, 40, y + 12], fill=(0, 0, 0)); dr.text((48, y), 'type 1', fill=(0, 0, 0)); y += 18
    dr.line([10, y + 6, 40, y + 6], fill=(255, 0, 255), width=2); dr.text((48, y), 'district rings (field 10)', fill=(0, 0, 0)); y += 18
    bar = 100 * 100 * sc; dr.line([10, S - 20, 10 + bar, S - 20], fill=(0, 0, 0), width=3); dr.text((10, S - 38), '100 m', fill=(0, 0, 0))
    out = f'research/ftg-capture/roadlength100/classes_{label}.png'; im.save(out); print('  rendered', out, 'window x %.0f..%.0f y %.0f..%.0f m' % (x0 / 100, x1 / 100, y0 / 100, y1 / 100))

for arg in sys.argv[1:]:
    label, path = arg.split('=', 1); run(label, path); print()
