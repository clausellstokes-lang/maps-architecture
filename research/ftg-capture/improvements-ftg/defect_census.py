"""Lane improvements/ftg (2026-09-25): defect census over the two decoded FTG settlement payloads.

Run from the project root:  python3 research/ftg-capture/improvements-ftg/defect_census.py
Decoding follows research/ftg-capture/critic2/zigzag_rederive.py (zig-zag sint32, 1 unit = 1 cm); stdlib only.
Measures what a weakness ledger needs and the earlier probes did not: sub-metre edges per edge type, coincident
nodes, footprint degeneracy (min area, OBB short side, aspect, non-convex, self-intersecting), missing entrances,
building/building overlap (sampled area on a 0.25 m grid), exact-duplicate footprints, buildings crossed by a
road centreline, building centroids inside water polygons, and district-ring coverage.
Road-type edges = types {0,1,2,6,7,10}; type 4 = suburb lot outlines, 14 = water outline, 3 = map border,
12 = piers (see ftg-payload-visual.md Critic-2 addenda).
"""
import sys, math, collections
sys.path.insert(0, 'tools')
from pb_raw import parse, varint

PAYLOADS = [
    ('Galeiaward 2026-09-21 (stage-2 roadLength 60)',
     'captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin'),
    ('Nevervalley 2026-09-25 (stage-2 roadLength 100)',
     'captures/ftg/2026-09-25T10-13-51/session/network/bodies/intercept-0054-b39aab95.bin'),
]
ROAD = {0, 1, 2, 6, 7, 10}

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
    vs = [zz(x) / 100.0 for x in pv(v)]
    P = [(vs[i], vs[i + 1]) for i in range(0, len(vs) - 1, 2)]
    return P[:-1] if len(P) > 1 and P[0] == P[-1] else P
def area(p):
    return sum(p[i][0] * p[(i + 1) % len(p)][1] - p[(i + 1) % len(p)][0] * p[i][1] for i in range(len(p))) / 2
def cross(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
def segx(a, b, c, d, eps=1e-6):
    d1, d2, d3, d4 = cross(a, b, c), cross(a, b, d), cross(c, d, a), cross(c, d, b)
    return ((d1 > eps and d2 < -eps) or (d1 < -eps and d2 > eps)) and ((d3 > eps and d4 < -eps) or (d3 < -eps and d4 > eps))
def inside(pt, poly):
    x, y = pt; c = False
    for i in range(len(poly)):
        x1, y1 = poly[i]; x2, y2 = poly[(i + 1) % len(poly)]
        if ((y1 > y) != (y2 > y)) and (x < (x2 - x1) * (y - y1) / (y2 - y1 + 1e-12) + x1): c = not c
    return c
def centroid(p):
    a = area(p); cx = cy = 0
    for i in range(len(p)):
        x1, y1 = p[i]; x2, y2 = p[(i + 1) % len(p)]; cr = x1 * y2 - x2 * y1; cx += (x1 + x2) * cr; cy += (y1 + y2) * cr
    return (cx / (6 * a), cy / (6 * a)) if abs(a) > 1e-9 else (sum(q[0] for q in p) / len(p), sum(q[1] for q in p) / len(p))
def hull(P):
    P = sorted(set(P))
    if len(P) < 3: return P
    lo, up = [], []
    for p in P:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], p) <= 0: lo.pop()
        lo.append(p)
    for p in reversed(P):
        while len(up) >= 2 and cross(up[-2], up[-1], p) <= 0: up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]
def obb(P):
    H = hull(P); best = None
    for i in range(len(H)):
        a, b = H[i], H[(i + 1) % len(H)]; L = math.dist(a, b)
        if L < 1e-9: continue
        ux, uy = (b[0] - a[0]) / L, (b[1] - a[1]) / L
        xs = [(q[0] - a[0]) * ux + (q[1] - a[1]) * uy for q in H]; ys = [-(q[0] - a[0]) * uy + (q[1] - a[1]) * ux for q in H]
        w, h = max(xs) - min(xs), max(ys) - min(ys)
        if best is None or w * h < best[0]: best = (w * h, min(w, h), max(w, h))
    return best
def overlap_area(P, Q, step=0.25):
    bx = (max(min(p[0] for p in P), min(q[0] for q in Q)), max(min(p[1] for p in P), min(q[1] for q in Q)),
          min(max(p[0] for p in P), max(q[0] for q in Q)), min(max(p[1] for p in P), max(q[1] for q in Q)))
    if bx[0] >= bx[2] or bx[1] >= bx[3]: return 0.0
    n = 0; x = bx[0] + step / 2
    while x < bx[2]:
        y = bx[1] + step / 2
        while y < bx[3]:
            if inside((x, y), P) and inside((x, y), Q): n += 1
            y += step
        x += step
    return n * step * step
def grid_index(boxes, cs=50.0):
    G = collections.defaultdict(list)
    for i, bb in enumerate(boxes):
        for gx in range(int(bb[0] // cs), int(bb[2] // cs) + 1):
            for gy in range(int(bb[1] // cs), int(bb[3] // cs) + 1): G[(gx, gy)].append(i)
    return G

def run(label, path):
    top = fields(open(path, 'rb').read())
    print('=====', label, '|', path)
    R = fields(one(top, 3)); edges, nodes = [], {}
    for _, v in R[1]:
        d = fields(v); edges.append((uv(d, 2), uv(d, 3), uv(d, 4)))
    for _, v in R[2]:
        d = fields(v); pos = (0.0, 0.0)
        if 2 in d:
            pd = fields(one(d, 2)); pos = (zz(uv(pd, 1)) / 100.0, zz(uv(pd, 2)) / 100.0)
        nodes[uv(d, 1)] = pos
    lens = collections.defaultdict(list)
    for a, c, t in edges: lens[t].append(math.dist(nodes[a], nodes[c]))
    road = sorted(l for t in ROAD for l in lens.get(t, []))
    print('[edges] total %d; road-type %d; shortest road edge %.3f m; road edges <0.5 m %d, <1 m %d, <5 m %d'
          % (len(edges), len(road), road[0], sum(l < 0.5 for l in road), sum(l < 1 for l in road), sum(l < 5 for l in road)))
    for t in sorted(lens):
        s = sorted(lens[t]); print('   type %2d n=%4d shortest %.3f m  <1 m %d  <5 m %d' % (t, len(s), s[0], sum(l < 1 for l in s), sum(l < 5 for l in s)))
    pos = collections.Counter((round(p[0], 2), round(p[1], 2)) for p in nodes.values())
    print('[nodes] %d; distinct ids sharing one position (1 cm): %d' % (len(nodes), sum(1 for k, v in pos.items() if v > 1)))
    B = []
    for _, v in top[8]:
        d = fields(v)
        B.append(dict(id=uv(d, 1), P=pts(one(d, 2)), ent=(6 in d), name=one(d, 3, b'').decode('utf8', 'replace'),
                      label=one(d, 5, b'').decode('utf8', 'replace')))
    A = [abs(area(x['P'])) for x in B]
    ob = [obb(x['P']) for x in B]
    nonconvex = selfx = 0; selfx_labels = []
    for x in B:
        P = x['P']; n = len(P)
        sg = [cross(P[i - 1], P[i], P[(i + 1) % n]) for i in range(n)]
        if n > 3 and any(v > 1e-6 for v in sg) and any(v < -1e-6 for v in sg): nonconvex += 1
        if any(segx(P[i], P[(i + 1) % n], P[j], P[(j + 1) % n]) for i in range(n) for j in range(i + 2, n) if not (i == 0 and j == n - 1)):
            selfx += 1; selfx_labels.append(x['label'])
    print('[buildings] %d; smallest footprint %.1f m2; OBB short side min %.2f m; aspect >3: %d, >5: %d; non-convex %d; self-intersecting (hourglass) %d %s; no entrance point %d (%.1f %%)'
          % (len(B), min(A), min(o[1] for o in ob if o), sum(1 for o in ob if o and o[2] / o[1] > 3), sum(1 for o in ob if o and o[2] / o[1] > 5),
             nonconvex, selfx, selfx_labels, sum(not x['ent'] for x in B), 100 * sum(not x['ent'] for x in B) / len(B)))
    print('   no-entrance labels:', collections.Counter(x['label'] for x in B if not x['ent']).most_common(6))
    BB = [(min(q[0] for q in x['P']), min(q[1] for q in x['P']), max(q[0] for q in x['P']), max(q[1] for q in x['P'])) for x in B]
    G = grid_index(BB); pairs = set()
    for ids in G.values():
        for ii in range(len(ids)):
            for jj in range(ii + 1, len(ids)):
                i, j = ids[ii], ids[jj]; a, c = BB[i], BB[j]
                if a[0] < c[2] and c[0] < a[2] and a[1] < c[3] and c[1] < a[3]: pairs.add((min(i, j), max(i, j)))
    ov = [(overlap_area(B[i]['P'], B[j]['P']), i, j) for i, j in pairs]
    ov = [o for o in ov if o[0] > 0]
    print('[overlaps] building pairs with any sampled overlap %d; >=1 m2 %d; >=10 m2 %d; >=50 m2 %d; largest %.1f m2'
          % (len(ov), sum(o[0] >= 1 for o in ov), sum(o[0] >= 10 for o in ov), sum(o[0] >= 50 for o in ov), max([o[0] for o in ov] or [0])))
    key = collections.defaultdict(list)
    for i, x in enumerate(B): key[tuple(sorted(x['P']))].append(i)
    dups = [g for g in key.values() if len(g) > 1]
    D = []
    for _, v in top[10]:
        d = fields(v); P = []
        if 5 in d: P = pts(one(fields(one(d, 5)), 1))
        D.append((one(d, 2, b'').decode('utf8', 'replace'), P))
    print('[duplicates] exact-duplicate footprints (identical vertex sets): %d groups, %d records' % (len(dups), sum(len(g) for g in dups)))
    if dups:
        print('   labels:', collections.Counter(tuple(sorted(B[i]['label'] for i in g)) for g in dups).most_common(4))
        print('   districts containing them:', collections.Counter(tuple(n for n, P in D if P and inside(centroid(B[g[0]]['P']), P)) for g in dups).most_common(3))
        print('   pairs with an entrance point on either record: %d; pairs with different names: %d'
              % (sum(1 for g in dups if any(B[i]['ent'] for i in g)), sum(1 for g in dups if len({B[i]['name'] for i in g}) > 1)))
    RE = [(nodes[a], nodes[c], t) for a, c, t in edges if t in ROAD]
    RG = grid_index([(min(p[0], q[0]), min(p[1], q[1]), max(p[0], q[0]), max(p[1], q[1])) for p, q, t in RE])
    crossed = set()
    for i, x in enumerate(B):
        P = x['P']; bb = BB[i]; cand = set()
        for gx in range(int(bb[0] // 50), int(bb[2] // 50) + 1):
            for gy in range(int(bb[1] // 50), int(bb[3] // 50) + 1): cand.update(RG.get((gx, gy), ()))
        if any(segx(P[m], P[(m + 1) % len(P)], RE[k][0], RE[k][1], eps=1e-4) for k in cand for m in range(len(P))): crossed.add(i)
    print('[roads x buildings] buildings whose outline is properly crossed by a road centreline: %d' % len(crossed))
    W = [(uv(fields(v), 1), pts(one(fields(v), 2))) for _, v in top[6]]
    wc = collections.Counter(wid for x in B for wid, P in W if inside(centroid(x['P']), P))
    print('[water] building centroids inside a water polygon (river polygons include bank strips, see _critic-ftg §6.5): %s' % dict(wc))
    ind = sum(1 for x in B if any(P and inside(centroid(x['P']), P) for n, P in D))
    print('[districts] %d rings %s; buildings inside any ring %d / %d (%.0f %%)' % (len(D), [n for n, _ in D], ind, len(B), 100 * ind / len(B)))

for label, path in PAYLOADS: run(label, path)
