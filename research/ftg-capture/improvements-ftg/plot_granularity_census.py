"""Lane improvements/ftg, Addendum 1 (2026-09-25): plot-granularity census over the two decoded FTG payloads.

Question (owner's PLOT GRANULARITY ruling): does FTG's plot and building grain respond to wealth?  Do richer
households get fewer, larger plots with bigger buildings and yards, poorer ones more, smaller plots with little or
no yard, and do alleys or back lanes appear between the roads?

Run from the project root:  python3 research/ftg-capture/improvements-ftg/plot_granularity_census.py
Decoding follows research/ftg-capture/critic2/zigzag_rederive.py and improvements-ftg/defect_census.py
(zig-zag sint32, 1 unit = 1 cm, +x east, +y north, settlement centre at the origin); stdlib only; our own code.
Sections: [A] residence footprints by class  [B] other footprints by category  [C] grain around each residence
[D] class clustering  [E] districts  [F] serialised lots by dominant class  [G] access and in-ring edge vocabulary
[H] lot shapes  [I] wire type 7 = the wall  [J] mansion template  [K] gap constancy  [L] class within zone
[M] shared walls by category  [N] streets at the wall  [O] which edge types cross buildings.
Wealth proxy: the residence label (field 8.5), ranked squat 0 < lower 1 < house share 2 = middle 2 < upper 3 < mansion 4,
following the lifestyle-banded residence pools in ftg-docs-params.md §3.4.  Non-residential buildings carry no
lifestyle on the wire, so they are reported by category (field 8.4) only.
"""
import sys, math, collections
sys.path.insert(0, 'tools')
from pb_raw import parse, varint

PAYLOADS = [
    ('Galeiaward 2026-09-21', 'captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin'),
    ('Nevervalley 2026-09-25', 'captures/ftg/2026-09-25T10-13-51/session/network/bodies/intercept-0054-b39aab95.bin'),
]
ROAD = {0, 1, 2, 6, 10}   # type 7 is the town wall (section [I] proves it), so it is not a road
RANK = {'abandoned squat': 0, 'lower class home': 1, 'house share': 2, 'large house share': 2,
        'middle class home': 2, 'upper class home': 3, 'mansion': 4}
CAT = {1: 'Residence', 2: 'Tavern', 3: 'Shop', 4: 'Religious', 5: 'Warehouse', 6: 'Farm', 7: 'Educational',
       8: 'Service', 9: 'Government', 10: 'Cultural', 11: 'Law enforcement', 12: 'Artisan', 13: 'Industrial',
       14: 'Market', 15: 'Inn', 16: 'Faction'}

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
def seg_dist(p, a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]; L2 = dx * dx + dy * dy
    if L2 == 0: return math.dist(p, a)
    t = max(0.0, min(1.0, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2))
    return math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
def poly_dist(P, Q):
    n, m = len(P), len(Q)
    if inside(P[0], Q) or inside(Q[0], P): return 0.0
    for i in range(n):
        for j in range(m):
            if segx(P[i], P[(i + 1) % n], Q[j], Q[(j + 1) % m]): return 0.0
    d = min(seg_dist(p, Q[j], Q[(j + 1) % m]) for p in P for j in range(m))
    return min(d, min(seg_dist(q, P[i], P[(i + 1) % n]) for q in Q for i in range(n)))
def q(v, f):
    s = sorted(v)
    return s[min(len(s) - 1, int(f * len(s)))] if s else float('nan')
def rankdata(v):
    order = sorted(range(len(v)), key=lambda i: v[i]); r = [0.0] * len(v); i = 0
    while i < len(v):
        j = i
        while j + 1 < len(v) and v[order[j + 1]] == v[order[i]]: j += 1
        for k in range(i, j + 1): r[order[k]] = (i + j) / 2.0
        i = j + 1
    return r
def spearman(x, y):
    rx, ry = rankdata(x), rankdata(y); n = len(x)
    mx, my = sum(rx) / n, sum(ry) / n
    num = sum((a - mx) * (b - my) for a, b in zip(rx, ry))
    den = math.sqrt(sum((a - mx) ** 2 for a in rx) * sum((b - my) ** 2 for b in ry))
    return num / den if den else float('nan')

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
    B = []
    for _, v in top[8]:
        d = fields(v); P = pts(one(d, 2)); ent = None
        if 6 in d:
            ed = fields(one(d, 6)); ent = (zz(uv(ed, 1)) / 100.0, zz(uv(ed, 2)) / 100.0)
        B.append(dict(P=P, A=abs(area(P)), C=centroid(P), ent=ent, cat=uv(d, 4), rooms=uv(d, 9),
                      label=one(d, 5, b'').decode('utf8', 'replace')))
    # districts (10.2 name, 10.5 ring, 10.6 prose)
    D = []
    for _, v in top[10]:
        d = fields(v); P = pts(one(fields(one(d, 5)), 1)) if 5 in d else []
        D.append(dict(name=one(d, 2, b'').decode('utf8', 'replace'), P=P, prose=one(d, 6, b'').decode('utf8', 'replace')))
    for x in B:
        x['dist'] = next((k for k, dd in enumerate(D) if dd['P'] and inside(x['C'], dd['P'])), None)
    # ---- A. residence footprints by class
    res = [x for x in B if x['label'] in RANK]
    print('[A] residence footprint by class (m2: n, p10 / p50 / p90; OBB short x long p50; sub-location count modes)')
    for lab in sorted({x['label'] for x in res}, key=lambda s: (RANK[s], s)):
        S = [x for x in res if x['label'] == lab]; ob = [obb(x['P']) for x in S]
        print('   %-18s rank %d  n=%4d  area %6.1f / %6.1f / %6.1f   OBB %.1f x %.1f m   rooms %s'
              % (lab, RANK[lab], len(S), q([x['A'] for x in S], .1), q([x['A'] for x in S], .5), q([x['A'] for x in S], .9),
                 q([o[1] for o in ob if o], .5), q([o[2] for o in ob if o], .5), collections.Counter(x['rooms'] for x in S).most_common(3)))
    print('   Spearman(wealth rank, footprint area) over %d residences = %.3f' % (len(res), spearman([RANK[x['label']] for x in res], [x['A'] for x in res])))
    # ---- B. non-residential footprints by category
    print('[B] non-residential footprint by category (m2: n, p50, p90, max)')
    bycat = collections.defaultdict(list)
    for x in B:
        if x['label'] not in RANK: bycat[CAT.get(x['cat'], str(x['cat']))].append(x['A'])
    for c, v in sorted(bycat.items(), key=lambda kv: -len(kv[1])):
        print('   %-16s n=%4d  p50 %7.1f  p90 %7.1f  max %7.1f' % (c, len(v), q(v, .5), q(v, .9), max(v)))
    # ---- C. neighbourhood grain per building: nearest-footprint gap, touching share, local coverage, radius
    cs = 20.0; G = collections.defaultdict(list)
    for i, x in enumerate(B): G[(int(math.floor(x['C'][0] / cs)), int(math.floor(x['C'][1] / cs)))].append(i)
    def near(i, r):
        cx, cy = int(math.floor(B[i]['C'][0] / cs)), int(math.floor(B[i]['C'][1] / cs)); k = int(math.ceil(r / cs))
        out = []
        for gx in range(cx - k, cx + k + 1):
            for gy in range(cy - k, cy + k + 1):
                for j in G.get((gx, gy), ()):
                    if j != i and math.dist(B[i]['C'], B[j]['C']) <= r: out.append(j)
        return out
    R_COV = 25.0; disc = math.pi * R_COV ** 2
    key = collections.defaultdict(list)
    for i, x in enumerate(B): key[tuple(sorted(x['P']))].append(i)
    twin = {}
    for g in key.values():
        for i in g: twin[i] = set(g) - {i}
    def shared_wall(P, Q, tol=0.15, minlen=2.0):
        # length of P's boundary lying within tol of Q's boundary along a collinear edge (sampled every 0.5 m)
        tot = 0.0
        for a_i in range(len(P)):
            a, b = P[a_i], P[(a_i + 1) % len(P)]; L = math.dist(a, b); n = max(1, int(L / 0.5))
            hit = sum(1 for k in range(n) if min(seg_dist((a[0] + (b[0] - a[0]) * (k + .5) / n, a[1] + (b[1] - a[1]) * (k + .5) / n), Q[j], Q[(j + 1) % len(Q)]) for j in range(len(Q))) <= tol)
            tot += L * hit / n
        return tot >= minlen
    for i, x in enumerate(B):
        nb = [j for j in near(i, 45.0) if j not in twin[i]]
        x['wall'] = any(shared_wall(x['P'], B[j]['P']) for j in nb if poly_dist(x['P'], B[j]['P']) <= 0.2)
        gaps = [poly_dist(x['P'], B[j]['P']) for j in nb]
        x['gap'] = min(gaps) if gaps else None
        x['touch'] = sum(1 for g in gaps if g <= 0.3)
        x['cov'] = (x['A'] + sum(B[j]['A'] for j in nb if math.dist(x['C'], B[j]['C']) <= R_COV)) / disc  # nb excludes exact twins
        x['n30'] = sum(1 for j in nb if math.dist(x['C'], B[j]['C']) <= 30.0)
        x['rad'] = math.hypot(*x['C'])
    print('[C] grain around each residence, by class (exact-duplicate footprints counted once): nearest-footprint gap m (p10/p50/p90; n with none within 45 m); '
          'share touching a neighbour (gap <= 0.3 m); share with a shared wall (>= 2 m of boundary within 0.15 m of a neighbour); '
          'local coverage in a %.0f m disc (p50); neighbours within 30 m (p50); radius from the origin m (p50)' % R_COV)
    for lab in sorted({x['label'] for x in res}, key=lambda s: (RANK[s], s)):
        S = [x for x in res if x['label'] == lab]; g = [x['gap'] for x in S if x['gap'] is not None]
        print('   %-18s n=%4d  gap %5.2f / %5.2f / %6.2f (none %3d)  touching %5.1f %%  shared wall %5.1f %%  coverage %4.2f  n30 %4.1f  radius %6.0f'
              % (lab, len(S), q(g, .1), q(g, .5), q(g, .9), len(S) - len(g), 100 * sum(1 for x in S if x['touch']) / len(S),
                 100 * sum(1 for x in S if x['wall']) / len(S),
                 q([x['cov'] for x in S], .5), q([x['n30'] for x in S], .5), q([x['rad'] for x in S], .5)))
    rk = [RANK[x['label']] for x in res]
    gg = [(RANK[x['label']], x['gap']) for x in res if x['gap'] is not None]
    print('   Spearman(wealth rank, gap) = %.3f; (wealth rank, local coverage) = %.3f; (wealth rank, neighbours within 30 m) = %.3f; (wealth rank, radius) = %.3f'
          % (spearman([a for a, _ in gg], [b for _, b in gg]), spearman(rk, [x['cov'] for x in res]),
             spearman(rk, [x['n30'] for x in res]), spearman(rk, [x['rad'] for x in res])))
    # ---- D. class clustering: same-class share among the 6 nearest residences vs the class's global share
    print('[D] class clustering: share of the 6 nearest residences with the same label, vs that label\'s global share')
    RC = [x['C'] for x in res]; RG = collections.defaultdict(list)
    for i, c in enumerate(RC): RG[(int(math.floor(c[0] / 40)), int(math.floor(c[1] / 40)))].append(i)
    tot = collections.Counter(x['label'] for x in res)
    same = collections.defaultdict(list)
    for i, x in enumerate(res):
        cx, cy = int(math.floor(RC[i][0] / 40)), int(math.floor(RC[i][1] / 40)); cand = []
        k = 1
        while len(cand) < 7 and k < 60:
            cand = [j for gx in range(cx - k, cx + k + 1) for gy in range(cy - k, cy + k + 1) for j in RG.get((gx, gy), ()) if j != i]
            k += 1
        nn = sorted(cand, key=lambda j: math.dist(RC[i], RC[j]))[:6]
        same[x['label']].append(sum(1 for j in nn if res[j]['label'] == x['label']) / max(1, len(nn)))
    for lab in sorted(tot, key=lambda s: (RANK[s], s)):
        print('   %-18s n=%4d  same-class neighbour share %.2f  vs global share %.2f  (enrichment x%.1f)'
              % (lab, tot[lab], sum(same[lab]) / len(same[lab]), tot[lab] / len(res), (sum(same[lab]) / len(same[lab])) / (tot[lab] / len(res))))
    # ---- E. districts: prose, area, buildings per ha, residence mix
    print('[E] districts: prose; ring area ha; buildings; buildings/ha; residence mix')
    for k, dd in enumerate(D):
        a = abs(area(dd['P'])) / 1e4 if dd['P'] else 0; S = [x for x in B if x['dist'] == k]
        mix = collections.Counter(x['label'] for x in S if x['label'] in RANK)
        print('   %-15s %-95s %5.1f ha  %4d bldg  %5.1f /ha  %s' % (dd['name'], '"' + dd['prose'] + '"', a, len(S), len(S) / a if a else 0, dict(mix.most_common())))
    S = [x for x in B if x['dist'] is None]
    print('   %-15s %-95s %5s     %4d bldg          %s' % ('(no district)', '', '', len(S), dict(collections.Counter(x['label'] for x in S if x['label'] in RANK).most_common())))
    # ---- F. serialised lots: area, buildings per lot, lot area per building, coverage, by dominant residence class
    print('[F] serialised in-town lots (< 2 ha, render class 0 or 1): per dominant residence class of the buildings inside')
    lots = []
    for _, v in top[9]:
        d = fields(v); g = uv(d, 1)
        for _, lv in d.get(2, []):
            ld = fields(lv); P = pts(one(ld, 2))
            if len(P) >= 3 and abs(area(P)) < 2e4 and uv(ld, 5) in (0, 1): lots.append((g, uv(ld, 5), P))
    LG = collections.defaultdict(list)
    for li, (g, rc, P) in enumerate(lots):
        bb = (min(p[0] for p in P), min(p[1] for p in P), max(p[0] for p in P), max(p[1] for p in P))
        for gx in range(int(math.floor(bb[0] / 50)), int(math.floor(bb[2] / 50)) + 1):
            for gy in range(int(math.floor(bb[1] / 50)), int(math.floor(bb[3] / 50)) + 1): LG[(gx, gy)].append(li)
    inlot = collections.defaultdict(list)
    for i, x in enumerate(B):
        for li in LG.get((int(math.floor(x['C'][0] / 50)), int(math.floor(x['C'][1] / 50))), ()):
            if inside(x['C'], lots[li][2]): inlot[li].append(i); break
    rows = collections.defaultdict(list); empty = 0; zone = collections.Counter()
    for li, (g, rc, P) in enumerate(lots):
        ids = inlot.get(li, []); A = abs(area(P))
        inring = any(dd['P'] and inside(centroid(P), dd['P']) for dd in D); zone['in rings' if inring else 'outside rings'] += 1
        if not ids: empty += 1; continue
        labs = collections.Counter(B[i]['label'] for i in ids if B[i]['label'] in RANK)
        dom = labs.most_common(1)[0][0] if labs and sum(labs.values()) * 2 > len(ids) else 'non-residential/mixed'
        rows[dom].append((A, len(ids), A / len(ids), sum(B[i]['A'] for i in ids) / A))
    print('   lots %d (%s); empty %d (%.1f %%); buildings inside a serialised lot %d / %d'
          % (len(lots), dict(zone), empty, 100 * empty / max(1, len(lots)), sum(len(v) for v in inlot.values()), len(B)))
    for dom in sorted(rows, key=lambda s: (RANK.get(s, 9), s)):
        v = rows[dom]
        print('   %-22s lots %4d  lot area p50 %6.0f m2  buildings/lot p50 %2d (p90 %2d)  lot area per building p50 %5.0f m2  coverage p50 %.2f'
              % (dom, len(v), q([r[0] for r in v], .5), q([r[1] for r in v], .5), q([r[1] for r in v], .9), q([r[2] for r in v], .5), q([r[3] for r in v], .5)))
    # ---- G. access: entrance to nearest road-type edge, by class; and the edge vocabulary inside rings
    RE = [(nodes[a], nodes[c], t) for a, c, t in edges if t in ROAD]
    EG = collections.defaultdict(list)
    for k, (p, r, t) in enumerate(RE):
        for gx in range(int(math.floor(min(p[0], r[0]) / 25)), int(math.floor(max(p[0], r[0]) / 25)) + 1):
            for gy in range(int(math.floor(min(p[1], r[1]) / 25)), int(math.floor(max(p[1], r[1]) / 25)) + 1): EG[(gx, gy)].append(k)
    def road_d(pt):
        cx, cy = int(math.floor(pt[0] / 25)), int(math.floor(pt[1] / 25)); best = 1e9
        for k in range(0, 8):
            for gx in range(cx - k, cx + k + 1):
                for gy in range(cy - k, cy + k + 1):
                    if max(abs(gx - cx), abs(gy - cy)) != k: continue
                    for e in EG.get((gx, gy), ()): best = min(best, seg_dist(pt, RE[e][0], RE[e][1]))
            if best <= k * 25: break
        return best
    print('[G] access: entrance -> nearest road-type edge (types %s), by class: p50 / p95 m; entrances > 10 m from any road; no entrance' % sorted(ROAD))
    for lab in sorted({x['label'] for x in res}, key=lambda s: (RANK[s], s)):
        S = [x for x in res if x['label'] == lab]; e = [road_d(x['ent']) for x in S if x['ent']]
        print('   %-18s n=%4d  %5.2f / %5.2f   >10 m: %3d   no entrance: %3d' % (lab, len(S), q(e, .5), q(e, .95), sum(1 for d in e if d > 10), sum(1 for x in S if not x['ent'])))
    L = collections.defaultdict(float)
    for a, c, t in edges:
        mid = ((nodes[a][0] + nodes[c][0]) / 2, (nodes[a][1] + nodes[c][1]) / 2)
        z = 'in' if any(dd['P'] and inside(mid, dd['P']) for dd in D) else 'out'
        L[(t, z)] += math.dist(nodes[a], nodes[c])
    ring_ha = sum(abs(area(dd['P'])) for dd in D if dd['P']) / 1e4
    print('   edge length inside district rings (%.1f ha), by wire type: %s' % (ring_ha, ', '.join('type %d %.2f km (%.0f m/ha)' % (t, L[(t, 'in')] / 1000, L[(t, 'in')] / ring_ha) for t in sorted({t for t, z in L if z == 'in'}))))

    # ---- H. in-town lot shapes: is lot size a constant?
    print('[H] in-town serialised lots: area quantiles, share within +-10 %% of 441 m2, OBB p50, by zone')
    for zname in ('outside rings', 'in rings'):
        Z = [P for (g, rc, P) in lots if (any(dd['P'] and inside(centroid(P), dd['P']) for dd in D)) == (zname == 'in rings')]
        if not Z: continue
        A = [abs(area(P)) for P in Z]; ob = [obb(P) for P in Z]
        print('   %-13s n=%4d  area p10 %6.0f p50 %6.0f p90 %6.0f m2; within 397-485 m2: %5.1f %%; OBB p50 %.1f x %.1f m'
              % (zname, len(Z), q(A, .1), q(A, .5), q(A, .9), 100 * sum(1 for a in A if 397 <= a <= 485) / len(A),
                 q([o[1] for o in ob if o], .5), q([o[2] for o in ob if o], .5)))
    # ---- I. what is wire type 7?
    E7 = [(nodes[a], nodes[c]) for a, c, t in edges if t == 7]
    plaza = [P for (g, rc, P) in lots if rc == 1]
    def near_poly_edge(pt, polys, tol=0.6):
        return any(seg_dist(pt, P[j], P[(j + 1) % len(P)]) <= tol for P in polys for j in range(len(P)))
    lab7 = collections.Counter(); onplaza = 0; inring = 0; bdist = []
    for a, c in E7:
        m = ((a[0] + c[0]) / 2, (a[1] + c[1]) / 2)
        inring += any(dd['P'] and inside(m, dd['P']) for dd in D)
        onplaza += near_poly_edge(m, plaza)
        j = min(range(len(B)), key=lambda k: math.dist(m, B[k]['C'])); lab7[B[j]['label']] += 1
        bdist.append(min(seg_dist(m, B[j]['P'][k], B[j]['P'][(k + 1) % len(B[j]['P'])]) for k in range(len(B[j]['P']))))
    TW = []
    for _, v in top[7]:
        d = fields(v); pd = fields(one(d, 2)); TW.append((zz(uv(pd, 1)) / 100.0, zz(uv(pd, 2)) / 100.0))
    n7 = {p for e in E7 for p in e}
    on7 = sum(1 for t in TW if any(math.dist(t, p) < 0.05 for p in n7))
    print('[I] wire type 7: %d edges, %.2f km; midpoints inside rings %d; on a plaza-lot edge (<= 0.6 m) %d; nearest-building label %s; midpoint -> nearest footprint p50 %.1f m; '
          'wall towers (field 7) lying exactly on a type-7 node: %d of %d  => type 7 is the WALL line'
          % (len(E7), sum(math.dist(a, c) for a, c in E7) / 1000, inring, onplaza, lab7.most_common(5), q(bdist, .5), on7, len(TW)))
    # ---- J. mansion template
    for x in B:
        if x['label'] == 'mansion':
            P = x['P']; el = sorted(round(math.dist(P[i], P[(i + 1) % len(P)]), 2) for i in range(len(P)))
            print('[J] mansion: %d vertices, area %.1f m2, OBB %s, sorted edge lengths %s' % (len(P), x['A'], tuple(round(v, 1) for v in obb(P)), el))
    # ---- K. how constant is the gap?
    allg = [x['gap'] for x in B if x['gap'] is not None]
    print('[K] nearest-footprint gap over all %d buildings: within 1.45-1.55 m %.1f %%; 0 m %.1f %%; > 3 m %.1f %%'
          % (len(allg), 100 * sum(1 for g in allg if 1.45 <= g <= 1.55) / len(allg), 100 * sum(1 for g in allg if g <= 0.01) / len(allg), 100 * sum(1 for g in allg if g > 3) / len(allg)))

    # ---- L. does class matter WITHIN a zone?  footprint, neighbours within 30 m and local coverage by (zone, class)
    print('[L] by zone and class (exact duplicates counted once): n; footprint p50 m2; neighbours within 30 m p50; local coverage p50')
    for zname, zf in (('in a district ring', lambda x: x['dist'] is not None), ('outside rings', lambda x: x['dist'] is None)):
        for lab in sorted({x['label'] for x in res}, key=lambda s: (RANK[s], s)):
            S = [x for x in res if x['label'] == lab and zf(x)]
            if len(S) < 5: continue
            print('   %-18s %-18s n=%4d  footprint %6.1f  n30 %4.1f  coverage %4.2f' % (zname, lab, len(S), q([x['A'] for x in S], .5), q([x['n30'] for x in S], .5), q([x['cov'] for x in S], .5)))
    # the request's per-district configs: which keys exist at all

    # ---- M. which buildings touch (party walls)?  shared-wall share by category and zone, over ALL buildings
    print('[M] shared wall (>= 2 m of boundary within 0.15 m of a non-duplicate neighbour), all buildings, by category x zone: n, share')
    for zname, zf in (('in a district ring', lambda x: x['dist'] is not None), ('outside rings', lambda x: x['dist'] is None)):
        rows = collections.defaultdict(list)
        for x in B:
            if zf(x): rows[CAT.get(x['cat'], str(x['cat']))].append(x['wall'])
        print('   %-18s %s' % (zname, ', '.join('%s %d (%.0f %%)' % (c, len(v), 100 * sum(v) / len(v)) for c, v in sorted(rows.items(), key=lambda kv: -len(kv[1])) if len(v) >= 5)))

    # ---- N. the wall line (type 7) in the street graph: where streets meet or pass it
    inc = collections.defaultdict(list)
    for a, c, t in edges: inc[a].append(t); inc[c].append(t)
    wn = {u for a, c, t in edges if t == 7 for u in (a, c)}
    arms = collections.Counter(sum(1 for t in inc[u] if t in (0, 1, 2, 10)) for u in wn)
    W = [(nodes[a], nodes[c]) for a, c, t in edges if t == 7]; S = [(nodes[a], nodes[c]) for a, c, t in edges if t in (0, 1, 2, 10)]
    improper = sum(1 for w in W for sgm in S if segx(w[0], w[1], sgm[0], sgm[1], eps=1e-4))
    print('[N] wall line: %d nodes; street arms per wall node %s (2+ arms = a street passes the wall there, with no gate object on the wire); street/wall crossings without a shared node: %d'
          % (len(wn), dict(sorted(arms.items())), improper))

    # ---- O. which edge types cross building outlines (checks that the wall, type 7, crosses none)
    hit = collections.defaultdict(list)
    for t in (0, 1, 2, 6, 7, 10):
        E = [(nodes[a], nodes[c]) for a, c, tt in edges if tt == t]
        for x in B:
            P = x['P']; bb = (min(p[0] for p in P), min(p[1] for p in P), max(p[0] for p in P), max(p[1] for p in P))
            for a, c in E:
                if max(a[0], c[0]) < bb[0] or min(a[0], c[0]) > bb[2] or max(a[1], c[1]) < bb[1] or min(a[1], c[1]) > bb[3]: continue
                if any(segx(P[m], P[(m + 1) % len(P)], a, c, eps=1e-4) for m in range(len(P))): hit[t].append(x['label']); break
    print('[O] building outlines properly crossed, by edge type: %s' % {t: v for t, v in sorted(hit.items())})

for label, path in PAYLOADS: run(label, path)
