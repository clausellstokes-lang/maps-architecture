#!/usr/bin/env python3
"""research/baselines/measure_ng.py -- NG's M-1 numbers on MeasureInput files (M-1 work item W-11; V12 section 3.4.2).

Lane m1/W-11 (docs/calibration/M-1-plan.md section 2, row W-11; record docs/calibration/E11-ng-rows.md). Research side
only; our own code, standard library plus PIL (Python 3.9). Every measurement reads ONLY the MeasureInput files that
research/baselines/adapters/ng.py writes (research/baselines/inputs/NG/itch-11441280/*.metric.geojson.gz); the one
exception is time.model, which reads the analyser's stored CPU-profile totals (report.json) of the 2026-09-21 captures,
because the vertex captures carry no timing.

Two twins (the row's checker), each our own re-implementation run on the MeasureInput files:
  T1  profiler/paths_stats.py's four --md tables (README-vertices.md's 36 table rows: 4 headers + 32 map rows; with the
      4 separators 40 lines) -- rebuilt from the MeasureInput's ways (drawn polylines recovered from the research
      sidecar), plots and roof faces, compared byte for byte with the README.
  T2  captures/neighbourhood/plot_granularity_baseline.py's table under ITS OWN definitions (party wall = collinear
      overlap >= 2 px within 0.1 px, pooled length ratio; Moran's I with k = 8 nearest centroids), compared byte for
      byte with that script's live output (plan-check PC-15: the old definition reproduced, then V12's reported with
      the shift declared).

V12 section 3.4.2 metrics (relative input: every constant that V12 states in metres is converted by a DECLARED rule,
plan-check PC-03; mu = px / the map's CTM scale; m_declared = mu x 0.35, ARCHITECTURE section 4.6 step 5's inference):
  junction.angles, junction.share4   way graph = the ways' shared vertices; topological nodes (degree != 2) within
                                     2 m (declared) merge; arms = topological chains leaving the cluster; direction to
                                     the point 10 m (declared) along each arm; angles between angularly consecutive arms
  street.detour                      200 pairs (declared stream) of degree >= 3 clusters >= 100 m (declared) apart;
                                     graph distance / straight distance; per-seed median (all-pairs median reported too)
  street.cyclesPerKm2                E - V + C of the way graph per km2 (declared) of the built outline (declared: the
                                     convex hull of every footprint vertex); relative variant per 1 000 median footprints
  plot.minWidth                      per plot, the width of its minimum-width enclosing rectangle (rotating calipers)
  fg.streetwallGap100                declared operational definition (frontage_gaps below): inward rays every 5 % of the
                                     median short side along each built block's centreline outline, walled when a footprint
                                     lies within 1.0 x that side; gaps > 2 m (declared) per 100 m (declared)
  bldg.pairing                       share of footprints sharing >= 50 % of one of their edges with exactly one neighbour
                                     whose area is within +-25 % of theirs ('sharing' = within the party-wall tolerance)
  bldg.partyShare, bldg.attached     per footprint the share of its perimeter within 1 % of its OBB short side of another
                                     footprint's edge; median over footprints (one class, unknown); share with any
  plot.moran                         Moran's I of plot area, shared-edge adjacency (declared: shared length >= 10 % of
                                     the smaller footprint's short side), unit weights
  block.countTemplate, block.area    built blocks (bounded faces holding >= 1 footprint area centroid) per hood; their
  (as block.areaRel)                 areas / the median footprint area
  block.courtShare                   deep blocks (largest inscribed circle radius > 1.5 x the median footprint short
                                     side) holding an unbuilt component (block less footprints dilated by 5 % of that
                                     side) of area >= 0.5 x the median footprint area touching no block edge / deep blocks
  time.model                         the stored per-generation totals (regeneration: model + view; model alone); fixture
                                     values only -- no row without section 12.1's calibration ratio (plan-check PC-11)

Usage:
  python3 research/baselines/measure_ng.py [--inputs DIR] [--json OUT] [--md OUT] [--check]
"""
import collections
import gzip
import hashlib
import heapq
import json
import math
import os
import random
import subprocess
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
INPUTS = os.path.join(HERE, 'inputs', 'NG', 'itch-11441280')
NGDIR = os.path.join(ROOT, 'captures', 'neighbourhood')
README = os.path.join(NGDIR, 'README-vertices.md')
PGB = os.path.join(NGDIR, 'plot_granularity_baseline.py')
PROFILE_CAPS = ['2026-09-21T05-04-54', '2026-09-21T07-20-25']

SCRIPT = 'research:baselines/measure_ng.py'
REFERENCE_BUILD = 'itch:11441280'
M_PER_MU = 0.35                     # declared conversion only (plan-check PC-03)
MERGE_M, ARM_M, DETOUR_MIN_M, GAP_M, PER_M = 2.0, 10.0, 100.0, 2.0, 100.0
DETOUR_N = 200
PARTY_TOL_REL = 0.01                # of the footprint's own OBB short side (V12 bldg.partyShare, relative)
PAIR_EDGE_SHARE, PAIR_AREA_TOL = 0.5, 0.25
MORAN_ADJ_REL = 0.10                # declared: shared length >= this x the smaller footprint's short side
DEEP_REL, DILATE_REL, COURT_AREA_REL = 1.5, 0.05, 0.5
RASTER_REL = 0.5                    # raster cell = this x the dilation distance
FRONT_DEPTHS_REL = (0.75, 1.0, 1.25)  # frontage band depth from the centreline, x median short side; 1.0 is primary:
FRONT_PRIMARY = 1.0                  # beyond the front row's setback p90 (0.52-0.60 measured) and short of its back edge
                                     # (setback p50 + depth p50 = 1.7-1.8), so neither front-line jitter nor a second row decides it
FRONT_STEP_REL = 0.05               # ray spacing along the frontage, x median short side
T_COLLINEAR = 160.0                 # a degree-3 junction is a geometric T when its largest arm angle is >= this
PLOTMINW_EDGES_M = [0.25 * i for i in range(121)]
BLOCK_EDGES_M2 = [50.0 * 1000.0 ** (i / 24) for i in range(25)]
AREAREL_EDGES = [0.5 * 2.0 ** (i / 2) for i in range(17)]      # declared relative edges (catalogue edges are owed)


# ================================================================ reading
def read_mi(path):
    with gzip.open(path, 'rb') as fh:
        return json.loads(fh.read().decode())


def open_ring(r):
    return [tuple(p) for p in r[:-1]] if len(r) > 1 and r[0] == r[-1] else [tuple(p) for p in r]


def load(path):
    mi = read_mi(path)
    R = mi['research']
    F = collections.defaultdict(list)
    for f in mi['features']:
        F[f['kind']].append(f)
    ways = [[tuple(p) for p in f['geometry']['coordinates']] for f in F['way']]
    plots = [open_ring(f['geometry']['coordinates'][0]) for f in F['plot']]
    blds = [open_ring(f['geometry']['coordinates'][0]) for f in F['building']]
    blocks = [[open_ring(r) for r in f['geometry']['coordinates']] for f in F['block']]
    return {'path': path, 'mi': mi, 'R': R, 'sc': R['ctmScale'], 'ways': ways, 'plots': plots, 'buildings': blds,
            'blocks': blocks, 'key': f"{R['capture']}.gen-{R['gen']}"}


def drawn_polyline(coords, info):
    """the drawn polyline of a way: drop the closing repeat and the inserted landing points, restore the drawn ends"""
    c = list(coords)
    if info['closed']:
        c = c[:-1]
    ins = set(info['inserted'])
    p = [q for i, q in enumerate(c) if i not in ins]
    de = info['drawnEnds']
    if de[0] is not None:
        p[0] = tuple(de[0])
    if de[1] is not None:
        p[-1] = tuple(de[1])
    return p


# ================================================================ T1: paths_stats' tables, re-implemented
BEND_MIN, ARRIVE_HW = 1.0, 3.0
TURN_EDGES = [0, 1, 5, 15, 30, 60, 90, 180.0001]
INT_EDGES = [0, 60, 85, 89, 91, 95, 120, 170, 179, 181, 190, 360]


def ps_turn(a, b, c):
    t = math.degrees(math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(b[1] - a[1], b[0] - a[0]))
    return (t + 180) % 360 - 180


def ps_q(xs, p):
    if not xs:
        return float('nan')
    xs = sorted(xs)
    return xs[min(len(xs) - 1, max(0, round(p * (len(xs) - 1))))]


def ps_hist(xs, edges):
    h = [0] * (len(edges) - 1)
    for x in xs:
        for i in range(len(edges) - 1):
            if edges[i] <= x < edges[i + 1] or (i == len(edges) - 2 and x == edges[-1]):
                h[i] += 1
                break
    return h


def ps_spearman(a, b):
    if len(a) < 3:
        return float('nan')
    ra = {i: r for r, i in enumerate(sorted(range(len(a)), key=lambda i: a[i]))}
    rb = {i: r for r, i in enumerate(sorted(range(len(b)), key=lambda i: b[i]))}
    n = len(a)
    d2 = sum((ra[i] - rb[i]) ** 2 for i in range(n))
    return 1 - 6 * d2 / (n * (n * n - 1))


def seg_dist(p, a, b):
    ax, ay = b[0] - a[0], b[1] - a[1]
    L2 = ax * ax + ay * ay
    t = 0 if L2 == 0 else max(0, min(1, ((p[0] - a[0]) * ax + (p[1] - a[1]) * ay) / L2))
    return math.dist(p, (a[0] + t * ax, a[1] + t * ay))


def ps_acute(d1, d2):
    a = abs(math.degrees(math.atan2(d1[1], d1[0]) - math.atan2(d2[1], d2[0]))) % 180
    return min(a, 180 - a)


def t1_analyse(M):
    R = M['R']
    streets, rings = [], []
    for coords, info in zip(M['ways'], R['ways']):
        rec = {'n': info['n'], 'p': drawn_polyline(coords, info), 'closed': info['closed'], 'w': info['w'], 'wpx': info['wpx']}
        (streets if info['list'] == 'street' else rings).append(rec)
    lots = [{'p': p} for p in M['plots']]
    roofs = [{'p': [tuple(q) for q in r['p']]} for r in R['roofFaces']]
    roads_all = streets + rings
    for si, st in enumerate(streets):
        p = st['p']
        seg = [math.dist(p[i], p[i + 1]) for i in range(len(p) - 1)]
        cum = [0.0]
        for s_ in seg:
            cum.append(cum[-1] + s_)
        L = cum[-1]
        t = [ps_turn(p[i - 1], p[i], p[i + 1]) for i in range(1, len(p) - 1)]
        bends, cur = [], None
        for i, ti in enumerate(t, start=1):
            if abs(ti) >= BEND_MIN:
                if cur is None:
                    cur = {'sum': 0.0, 'w': 0.0, 'ws': 0.0, 'nv': 0}
                cur['sum'] += ti
                cur['w'] += abs(ti)
                cur['ws'] += abs(ti) * cum[i]
                cur['nv'] += 1
            elif cur is not None:
                bends.append(cur)
                cur = None
        if cur is not None:
            bends.append(cur)
        st.update(seg=seg, L=L, turns=t, bends=[{'angle': b['sum'], 'pos': b['ws'] / b['w'] / L if L else float('nan'), 'nv': b['nv']} for b in bends])
        st['arrive'] = []
        for end, prev in ((p[0], p[1]), (p[-1], p[-2])):
            best = (1e9, None, None)
            for oi, o in enumerate(roads_all):
                if oi == si:
                    continue
                op = o['p'] + ([o['p'][0]] if o['closed'] else [])
                for k in range(len(op) - 1):
                    d = seg_dist(end, op[k], op[k + 1])
                    if d < best[0]:
                        best = (d, (op[k + 1][0] - op[k][0], op[k + 1][1] - op[k][1]), o['wpx'])
            hit = best[1] is not None and best[0] <= ARRIVE_HW * st['wpx'] / 2
            st['arrive'].append({'d': best[0], 'angle': ps_acute((end[0] - prev[0], end[1] - prev[1]), best[1]) if hit else None,
                                 'rel': best[0] / (best[2] / 2) if hit and best[2] else None})
    for pg in lots + roofs:
        p = pg['p']
        n = len(p)
        area = sum(p[i][0] * p[(i + 1) % n][1] - p[(i + 1) % n][0] * p[i][1] for i in range(n)) / 2
        sgn = 1 if area >= 0 else -1
        pg['interior'] = [180 - sgn * ps_turn(p[i - 1], p[i], p[(i + 1) % n]) for i in range(n)]
        pg['edges'] = [math.dist(p[i], p[(i + 1) % n]) for i in range(n)]
    return {'file': R['file'], 'label': R['label'], 'streets': streets, 'rings': rings, 'lots': lots, 'roofs': roofs}


def t1_fmt(x, d=1):
    return 'nan' if x != x else f'{x:.{d}f}'


def t1_dist(xs, d=1):
    return f"n={len(xs)} p10 {t1_fmt(ps_q(xs, .1), d)} · p50 {t1_fmt(ps_q(xs, .5), d)} · p90 {t1_fmt(ps_q(xs, .9), d)} · max {t1_fmt(max(xs) if xs else float('nan'), d)}"


def t1_vcount(xs):
    c = collections.Counter(len(x['p']) for x in xs)
    return ' '.join(f'{k}:{v}' for k, v in sorted(c.items()))


def t1_summary(A):
    S = A['streets']
    turns = [abs(t) for s in S for t in s['turns']]
    segs = [x for s in S for x in s['seg']]
    bends = [b for s in S for b in s['bends']]
    nb = collections.Counter(min(len(s['bends']), 3) for s in S)
    arr = [a for s in S for a in s['arrive']]
    arrived = [a['angle'] for a in arr if a['angle'] is not None]
    widths = [s['wpx'] for s in S]
    lot_int = [a for pg in A['lots'] for a in pg['interior']]
    roof_int = [a for pg in A['roofs'] for a in pg['interior']]
    return {
        'streets': len(S), 'street_vertices': t1_vcount(S), 'ring_vertices': t1_vcount(A['rings']), 'rings': len(A['rings']),
        'turn_hist': ps_hist(turns, TURN_EDGES), 'turn_dist': t1_dist(turns), 'seg_dist': t1_dist(segs),
        'bends_per_street': {('3+' if k == 3 else str(k)): v for k, v in sorted(nb.items())},
        'bend_angle': t1_dist([abs(b['angle']) for b in bends]), 'bend_pos': t1_dist([b['pos'] for b in bends], 2),
        'bend_pos_hist': ps_hist([b['pos'] for b in bends], [0, .1, .3, .7, .9, 1.0001]),
        'bend_vertices': dict(sorted(collections.Counter(b['nv'] for b in bends).items())),
        'arrive_n': len(arr), 'arrive_within': len(arrived), 'arrive_dist': t1_dist(arrived),
        'arrive_offset': t1_dist([a['rel'] for a in arr if a['rel'] is not None], 2),
        'arrive_right': sum(1 for a in arrived if a >= 85), 'width_px': t1_dist(widths, 2),
        'rho_width_length': ps_spearman(widths, [s['L'] for s in S]), 'rho_width_order': ps_spearman(widths, [s['n'] for s in S]),
        'ring_width_px': sorted({round(r['wpx'], 2) for r in A['rings']}),
        'lots': len(A['lots']), 'lot_vertices': t1_vcount(A['lots']), 'lot_int_hist': ps_hist(lot_int, INT_EDGES),
        'lot_int_right': sum(1 for a in lot_int if 89 <= a < 91) / max(1, len(lot_int)),
        'lot_edges': t1_dist([e for pg in A['lots'] for e in pg['edges']]),
        'roofs': len(A['roofs']), 'roof_vertices': t1_vcount(A['roofs']), 'roof_int_hist': ps_hist(roof_int, INT_EDGES),
        'roof_edges': t1_dist([e for pg in A['roofs'] for e in pg['edges']]),
    }


def t1_tables(As):
    out = []
    th = ' | '.join(f'{TURN_EDGES[i]}–{TURN_EDGES[i + 1]:g}°' for i in range(len(TURN_EDGES) - 1)).replace('180.0001', '180')
    out.append(' '.join(['| map | streets | vertices/street (n:count) | segment length px | turn at interior vertex |', th, '|']))
    out.append('|---' * (5 + len(TURN_EDGES) - 1) + '|')
    for A in As:
        s = A['summary']
        out.append(f"| {A['label']} (`{A['file']}`) | {s['streets']} | {s['street_vertices']} | {s['seg_dist']} | {s['turn_dist']} | "
                   + ' | '.join(map(str, s['turn_hist'])) + ' |')
    out.append('| map | bends per street (0/1/2/3+) | bend angle ° | bend position (0–1) | position hist <.1/.1–.3/.3–.7/.7–.9/>.9 | vertices per bend | junction ends / all ends | arrival angle ° | arrival ≥ 85° | end offset / target half-width | width px (street) | ρ(width, length) | ρ(width, draw order) | closed roads: n, width px, vertices |')
    out.append('|---' * 15 + '|')
    for A in As:
        s = A['summary']
        b = s['bends_per_street']
        out.append(f"| {A['label']} | {b.get('0', 0)}/{b.get('1', 0)}/{b.get('2', 0)}/{b.get('3+', 0)} | {s['bend_angle']} | {s['bend_pos']} | {'/'.join(map(str, s['bend_pos_hist']))} | "
                   f"{' '.join(f'{k}:{v}' for k, v in s['bend_vertices'].items())} | {s['arrive_within']}/{s['arrive_n']} | {s['arrive_dist']} | {s['arrive_right']} | {s['arrive_offset']} | {s['width_px']} | "
                   f"{t1_fmt(s['rho_width_length'], 2)} | {t1_fmt(s['rho_width_order'], 2)} | {s['rings']}, {s['ring_width_px']}, {s['ring_vertices'] or '–'} |")
    ih = ' | '.join(f'{INT_EDGES[i]}–{INT_EDGES[i + 1]}' for i in range(len(INT_EDGES) - 1))
    for key in ('lot', 'roof'):
        out.append(' '.join(['| map | polygons | distinct vertices (n:count) | edge length px |', ih, '|' + (' 89–91 share |' if key == 'lot' else '')]))
        out.append('|---' * (4 + len(INT_EDGES) - 1 + (1 if key == 'lot' else 0)) + '|')
        for A in As:
            s = A['summary']
            out.append(f"| {A['label']} | {s[key + 's']} | {s[key + '_vertices']} | {s[key + '_edges']} | " + ' | '.join(map(str, s[key + '_int_hist'])) + ' |'
                       + (f" {s['lot_int_right']:.1%} |" if key == 'lot' else ''))
    return out


def readme_rows():
    txt = open(README, encoding='utf-8').read()
    sec = txt.split('## Tables', 1)[1].split('## Fable review', 1)[0]
    return [l for l in sec.split('\n') if l.startswith('|')]


# ================================================================ T2: plot_granularity_baseline.py, its own definitions
def g_area(p):
    n = len(p)
    return abs(sum(p[i][0] * p[(i + 1) % n][1] - p[(i + 1) % n][0] * p[i][1] for i in range(n))) / 2


def g_centroid(p):
    n = len(p)
    a = cx = cy = 0.0
    for i in range(n):
        (x0, y0), (x1, y1) = p[i], p[(i + 1) % n]
        c = x0 * y1 - x1 * y0
        a += c
        cx += (x0 + x1) * c
        cy += (y0 + y1) * c
    if abs(a) < 1e-9:
        return (sum(x for x, _ in p) / n, sum(y for _, y in p) / n)
    return (cx / (3 * a), cy / (3 * a))


def g_ranks(xs):
    o = sorted(range(len(xs)), key=lambda i: xs[i])
    r = [0.0] * len(xs)
    i = 0
    while i < len(o):
        j = i
        while j + 1 < len(o) and xs[o[j + 1]] == xs[o[i]]:
            j += 1
        for k in range(i, j + 1):
            r[o[k]] = (i + j) / 2
        i = j + 1
    return r


def g_pearson(a, b):
    n = len(a)
    ma = sum(a) / n
    mb = sum(b) / n
    sa = math.sqrt(sum((x - ma) ** 2 for x in a))
    sb = math.sqrt(sum((y - mb) ** 2 for y in b))
    return sum((x - ma) * (y - mb) for x, y in zip(a, b)) / (sa * sb) if sa and sb else float('nan')


def q7(xs, p):
    """type-7 quantile (linear between order statistics; V12 section 3.5.1's convention)"""
    s = sorted(xs)
    if not s:
        return None
    k = (len(s) - 1) * p
    f, c = math.floor(k), math.ceil(k)
    return s[f] if f == c else s[f] + (s[c] - s[f]) * (k - f)


def g_moran_k8(vals, pts, k=8):
    n = len(vals)
    m = sum(vals) / n
    z = [v - m for v in vals]
    num = 0.0
    W = 0
    for i in range(n):
        for _, j in sorted((math.dist(pts[i], pts[j]), j) for j in range(n) if j != i)[:k]:
            num += z[i] * z[j]
            W += 1
    return (n / W) * (num / sum(v * v for v in z))


def g_exact_vertex_share(polys):
    seen = collections.defaultdict(set)
    for pi, p in enumerate(polys):
        for x, y in p:
            seen[(round(x, 6), round(y, 6))].add(pi)
    return sum(1 for pi, p in enumerate(polys) if any(len(seen[(round(x, 6), round(y, 6))]) > 1 for x, y in p)) / len(polys)


def g_overlap(a, b, c, d, tol):
    L = math.dist(a, b)
    if L < 1e-9:
        return 0.0
    ux, uy = (b[0] - a[0]) / L, (b[1] - a[1]) / L

    def off(q):
        return abs((q[0] - a[0]) * uy - (q[1] - a[1]) * ux)
    if off(c) > tol or off(d) > tol:
        return 0.0
    t1 = (c[0] - a[0]) * ux + (c[1] - a[1]) * uy
    t2 = (d[0] - a[0]) * ux + (d[1] - a[1]) * uy
    return max(0.0, min(L, max(t1, t2)) - max(0.0, min(t1, t2)))


def g_shared_walls(polys, tol=0.1, min_len=2.0, cell=20.0):
    segs = [(pi, p[i], p[(i + 1) % len(p)]) for pi, p in enumerate(polys) for i in range(len(p))]
    grid = collections.defaultdict(list)

    def cells(a, b):
        return [(gx, gy) for gx in range(math.floor(min(a[0], b[0]) / cell), math.floor(max(a[0], b[0]) / cell) + 1)
                for gy in range(math.floor(min(a[1], b[1]) / cell), math.floor(max(a[1], b[1]) / cell) + 1)]
    for si, (_, a, b) in enumerate(segs):
        for g in cells(a, b):
            grid[g].append(si)
    has, shared = set(), 0.0
    for pi, a, b in segs:
        cand = {sj for g in cells(a, b) for sj in grid[g]}
        best = max([g_overlap(a, b, segs[sj][1], segs[sj][2], tol) for sj in cand if segs[sj][0] != pi] or [0.0])
        if best >= min_len:
            has.add(pi)
            shared += best
    return len(has) / len(polys), shared / sum(math.dist(a, b) for _, a, b in segs)


def t2_row(M):
    R = M['R']
    polys = [p for p in M['plots'] if len(p) >= 3]
    polys = [p for p in polys if g_area(p) > 1.0]
    ar = [g_area(p) for p in polys]
    cs = [g_centroid(p) for p in polys]
    tot = sum(ar)
    cx = sum(c[0] * a for c, a in zip(cs, ar)) / tot
    cy = sum(c[1] * a for c, a in zip(cs, ar)) / tot
    dist = [math.dist(c, (cx, cy)) for c in cs]
    order = sorted(range(len(ar)), key=lambda i: dist[i])
    t = len(order) // 3
    ratio = q7([ar[i] for i in order[-t:]], .5) / q7([ar[i] for i in order[:t]], .5)
    mean = tot / len(ar)
    cv = math.sqrt(sum((a - mean) ** 2 for a in ar) / len(ar)) / mean
    sw, swl = g_shared_walls(polys)
    mor = g_moran_k8(ar, cs)
    ev = g_exact_vertex_share(polys)
    row = (f"| {R['capture']} · gen-{R['gen']} ({R['template']}) | {len(ar)} | {q7(ar, .1):.0f} / {q7(ar, .5):.0f} / {q7(ar, .9):.0f} | "
           f"{cv:.2f} | {g_pearson(g_ranks(dist), g_ranks(ar)):+.2f} | {ratio:.2f} | {mor:+.2f} | {sw * 100:.0f} % | {swl * 100:.0f} % | "
           f"{ev * 100:.0f} % |")
    return row, {'footprints': len(ar), 'sharedWallAny': sw, 'sharedWallLengthShare': swl, 'moranK8': mor, 'exactVertexShare': ev,
                 'areaCV': cv, 'spearmanDistArea': g_pearson(g_ranks(dist), g_ranks(ar)), 'outerInnerRatio': ratio}


# ================================================================ geometry (ours)
def sarea(P):
    n = len(P)
    return sum(P[i][0] * P[(i + 1) % n][1] - P[(i + 1) % n][0] * P[i][1] for i in range(n)) / 2


def area_centroid(P):
    A = sarea(P)
    cx = cy = 0.0
    n = len(P)
    for i in range(n):
        (x0, y0), (x1, y1) = P[i], P[(i + 1) % n]
        c = x0 * y1 - x1 * y0
        cx += (x0 + x1) * c
        cy += (y0 + y1) * c
    return (cx / (6 * A), cy / (6 * A))


def hull(pts):
    pts = sorted(set(pts))
    if len(pts) < 3:
        return pts

    def cr(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, up = [], []
    for p in pts:
        while len(lo) >= 2 and cr(lo[-2], lo[-1], p) <= 0:
            lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(up) >= 2 and cr(up[-2], up[-1], p) <= 0:
            up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]


def obb_and_minwidth(P):
    """(minimum-area rectangle's long and short sides; minimum width) by rotating calipers over the hull"""
    H = hull(P)
    best, minw = None, None
    for i in range(len(H)):
        a, b = H[i], H[(i + 1) % len(H)]
        d = math.dist(a, b)
        if d < 1e-9:
            continue
        u = ((b[0] - a[0]) / d, (b[1] - a[1]) / d)
        v = (-u[1], u[0])
        pu = [q[0] * u[0] + q[1] * u[1] for q in H]
        pv = [q[0] * v[0] + q[1] * v[1] for q in H]
        ext_u, ext_v = max(pu) - min(pu), max(pv) - min(pv)
        ar = ext_u * ext_v
        if best is None or ar < best[0]:
            best = (ar, ext_u, ext_v)
        if minw is None or ext_v < minw:
            minw = ext_v
    _, lu, lv = best
    return max(lu, lv), min(lu, lv), minw


def inside(P, x):
    c = False
    n = len(P)
    for i in range(n):
        (x0, y0), (x1, y1) = P[i], P[(i + 1) % n]
        if (y0 > x[1]) != (y1 > x[1]) and x[0] < x0 + (x[1] - y0) * (x1 - x0) / (y1 - y0):
            c = not c
    return c


def in_poly(rings, x):
    return inside(rings[0], x) and not any(inside(h, x) for h in rings[1:])


def capsule_interval(A, B, C, D, r):
    """parameter interval [t0, t1] in [0, 1] of segment AB lying within distance r of segment CD (exact), or None"""
    ux, uy = B[0] - A[0], B[1] - A[1]
    uu = ux * ux + uy * uy
    if uu == 0:
        return None
    lo, hi = math.inf, -math.inf

    def disc(P0):
        nonlocal lo, hi
        wx, wy = A[0] - P0[0], A[1] - P0[1]
        b = ux * wx + uy * wy
        c = wx * wx + wy * wy - r * r
        disc_ = b * b - uu * c
        if disc_ < 0:
            return
        s = math.sqrt(disc_)
        lo, hi = min(lo, (-b - s) / uu), max(hi, (-b + s) / uu)
    disc(C)
    disc(D)
    vx, vy = D[0] - C[0], D[1] - C[1]
    M = math.hypot(vx, vy)
    if M > 0:
        ex, ey = vx / M, vy / M
        nx, ny = -ey, ex
        a0, a1 = (A[0] - C[0]) * ex + (A[1] - C[1]) * ey, ux * ex + uy * ey       # along: a0 + a1 t in [0, M]
        h0, h1 = (A[0] - C[0]) * nx + (A[1] - C[1]) * ny, ux * nx + uy * ny       # across: h0 + h1 t in [-r, r]
        t0, t1 = -math.inf, math.inf
        ok = True
        for c0, c1, lo_, hi_ in ((a0, a1, 0.0, M), (h0, h1, -r, r)):
            if abs(c1) < 1e-15:
                if not (lo_ <= c0 <= hi_):
                    ok = False
                    break
            else:
                x0, x1 = (lo_ - c0) / c1, (hi_ - c0) / c1
                if x0 > x1:
                    x0, x1 = x1, x0
                t0, t1 = max(t0, x0), min(t1, x1)
        if ok and t0 <= t1:
            lo, hi = min(lo, t0), max(hi, t1)
    lo, hi = max(lo, 0.0), min(hi, 1.0)
    return (lo, hi) if lo < hi else None


def union_len(iv):
    tot, cur = 0.0, None
    for a, b in sorted(iv):
        if cur is None or a > cur[1]:
            if cur is not None:
                tot += cur[1] - cur[0]
            cur = [a, b]
        else:
            cur[1] = max(cur[1], b)
    if cur is not None:
        tot += cur[1] - cur[0]
    return tot


class SegGrid:
    def __init__(self, cell):
        self.cell = cell
        self.g = collections.defaultdict(list)

    def cells(self, a, b, pad=0.0):
        c = self.cell
        return [(gx, gy) for gx in range(math.floor((min(a[0], b[0]) - pad) / c), math.floor((max(a[0], b[0]) + pad) / c) + 1)
                for gy in range(math.floor((min(a[1], b[1]) - pad) / c), math.floor((max(a[1], b[1]) + pad) / c) + 1)]

    def add(self, item, a, b):
        for k in self.cells(a, b):
            self.g[k].append(item)

    def query(self, a, b, pad=0.0):
        out = set()
        for k in self.cells(a, b, pad):
            out.update(self.g.get(k, ()))
        return out


def polylabel(rings, precision):
    """largest inscribed circle of a polygon with holes (grid refinement with a priority queue): (point, radius)"""
    outer = rings[0]
    xs = [p[0] for p in outer]
    ys = [p[1] for p in outer]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    size = min(maxx - minx, maxy - miny)
    if size <= 0:
        return (minx, miny), 0.0
    edges = [(r[i], r[(i + 1) % len(r)]) for r in rings for i in range(len(r))]

    def sd(x, y):
        d = min(seg_dist((x, y), a, b) for a, b in edges)
        return d if in_poly(rings, (x, y)) else -d
    h = size / 2
    heap = []
    cnt = 0
    x = minx
    while x < maxx:
        y = miny
        while y < maxy:
            d = sd(x + h, y + h)
            heapq.heappush(heap, (-(d + h * math.sqrt(2)), cnt, x + h, y + h, h, d))
            cnt += 1
            y += size
        x += size
    c = area_centroid(outer)
    best = (sd(*c), c)
    while heap:
        negmax, _, cx, cy, ch, d = heapq.heappop(heap)
        if d > best[0]:
            best = (d, (cx, cy))
        if -negmax - best[0] <= precision:
            continue
        ch /= 2
        for dx in (-ch, ch):
            for dy in (-ch, ch):
                nd = sd(cx + dx, cy + dy)
                heapq.heappush(heap, (-(nd + ch * math.sqrt(2)), cnt, cx + dx, cy + dy, ch, nd))
                cnt += 1
    return best[1], best[0]


# ================================================================ the way graph
def way_graph(M, eps_px):
    """nodes = way vertices merged within eps (1 mm declared); edges = consecutive vertices"""
    cell = max(eps_px, 1e-9) * 4
    grid = collections.defaultdict(list)
    nodes = []

    def node(q):
        gx, gy = math.floor(q[0] / cell), math.floor(q[1] / cell)
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for i in grid.get((gx + dx, gy + dy), ()):
                    if math.dist(nodes[i], q) <= eps_px:
                        return i
        nodes.append(q)
        grid[(gx, gy)].append(len(nodes) - 1)
        return len(nodes) - 1
    adj = collections.defaultdict(dict)
    nedges = 0
    for coords in M['ways']:
        ids = [node(q) for q in coords]
        for a, b in zip(ids, ids[1:]):
            if a == b or b in adj[a]:
                continue
            L = math.dist(nodes[a], nodes[b])
            adj[a][b] = L
            adj[b][a] = L
            nedges += 1
    used = [i for i in range(len(nodes)) if adj[i]]
    par = {i: i for i in used}

    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x
    for a in used:
        for b in adj[a]:
            ra, rb = find(a), find(b)
            if ra != rb:
                par[ra] = rb
    comps = len({find(i) for i in used})
    return nodes, adj, nedges, len(used), comps


def chains(nodes, adj):
    """topological chains between nodes of degree != 2: list of (start, end, length, polyline)"""
    topo = {i for i in adj if len(adj[i]) != 2 and adj[i]}
    seen = set()
    out = []
    for s in sorted(topo):
        for nb in sorted(adj[s]):
            if (s, nb) in seen:
                continue
            path = [s, nb]
            L = adj[s][nb]
            seen.add((s, nb))
            prev, cur = s, nb
            while cur not in topo:
                nxt = [x for x in adj[cur] if x != prev][0]
                L += adj[cur][nxt]
                path.append(nxt)
                prev, cur = cur, nxt
            seen.add((cur, prev))
            out.append((s, cur, L, path))
    return topo, out


def point_along(nodes, path, dist):
    acc = 0.0
    for a, b in zip(path, path[1:]):
        seg = math.dist(nodes[a], nodes[b])
        if acc + seg >= dist:
            t = (dist - acc) / seg if seg else 0.0
            return (nodes[a][0] + t * (nodes[b][0] - nodes[a][0]), nodes[a][1] + t * (nodes[b][1] - nodes[a][1]))
        acc += seg
    return nodes[path[-1]]


def junctions(M, nodes, adj, merge_px, arm_px):
    topo, ch = chains(nodes, adj)
    tl = sorted(topo)
    par = {i: i for i in tl}

    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x
    cell = merge_px
    grid = collections.defaultdict(list)
    for i in tl:
        grid[(math.floor(nodes[i][0] / cell), math.floor(nodes[i][1] / cell))].append(i)
    for i in tl:
        gx, gy = math.floor(nodes[i][0] / cell), math.floor(nodes[i][1] / cell)
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for j in grid.get((gx + dx, gy + dy), ()):
                    if j > i and math.dist(nodes[i], nodes[j]) <= merge_px:
                        ri, rj = find(i), find(j)
                        if ri != rj:
                            par[ri] = rj
    members = collections.defaultdict(list)
    for i in tl:
        members[find(i)].append(i)
    centre = {c: (sum(nodes[i][0] for i in m) / len(m), sum(nodes[i][1] for i in m) / len(m)) for c, m in members.items()}
    arms = collections.defaultdict(list)
    internal = 0
    for s, e, L, path in ch:
        cs, ce = find(s), find(e)
        if cs == ce and L <= 2 * merge_px:
            internal += 1
            continue
        arms[cs].append(path)
        arms[ce].append(list(reversed(path)))
    landing = {tuple(q) for _, _, q in M['R']['snaps']}
    clusters = []
    for c, m in members.items():
        a = arms.get(c, [])
        deg = len(a)
        cc = centre[c]
        bear = sorted(math.atan2(p[1] - cc[1], p[0] - cc[0]) for p in (point_along(nodes, path, arm_px) for path in a))
        ang = [math.degrees((bear[(i + 1) % deg] - bear[i]) % (2 * math.pi)) for i in range(deg)] if deg >= 2 else []
        clusters.append({'deg': deg, 'centre': cc, 'members': m, 'angles': ang,
                         'landing': any(tuple(nodes[i]) in landing for i in m)})
    return clusters, ch, internal


def dijkstra(src_set, graph):
    dist = {s: 0.0 for s in src_set}
    pq = [(0.0, s) for s in src_set]
    heapq.heapify(pq)
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist.get(u, math.inf):
            continue
        for v, w in graph[u]:
            nd = d + w
            if nd < dist.get(v, math.inf):
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist


# ================================================================ per-map V12 measurement
def mu(M, px):
    return px / M['sc']


def measure_map(M):
    R, sc = M['R'], M['sc']
    px_per_m = sc / M_PER_MU                     # declared
    plots = M['plots']
    blds = M['buildings']
    n = len(blds)
    areas = [abs(sarea(p)) for p in blds]
    oms = [obb_and_minwidth(p) for p in blds]
    short = [o[1] for o in oms]
    med_area, med_short = q7(areas, .5), q7(short, .5)
    med_area_psq, med_short_psq = ps_q(areas, .5), ps_q(short, .5)   # paths_stats' nearest-rank median, as E10 used
    out = {'map': R['file'], 'capture': R['capture'], 'gen': R['gen'], 'template': R['template'], 'seed': R['seed'],
           'ctmScale': sc, 'footprints': n, 'medianFootprintAreaMu2': med_area / sc / sc, 'medianFootprintShortMu': med_short / sc,
           'e10Median': {'areaMu2': med_area_psq / sc / sc, 'shortMu': med_short_psq / sc}}
    # ---- party walls, pairing, adjacency (capsule intervals per footprint edge)
    grid = SegGrid(max(med_short, 1.0))
    segs = []
    for pi, p in enumerate(blds):
        for i in range(len(p)):
            a, b = p[i], p[(i + 1) % len(p)]
            grid.add(len(segs), a, b)
            segs.append((pi, a, b))
    share_any = []
    party_share = []
    pooled_cov = pooled_per = 0.0
    shared_with = [collections.defaultdict(float) for _ in range(n)]
    edge_cover = [[] for _ in range(n)]           # per footprint, per edge: {j: covered fraction}
    for pi, p in enumerate(blds):
        tol = PARTY_TOL_REL * short[pi]
        per = 0.0
        cov = 0.0
        ecs = []
        for i in range(len(p)):
            a, b = p[i], p[(i + 1) % len(p)]
            L = math.dist(a, b)
            per += L
            byj = collections.defaultdict(list)
            for sj in grid.query(a, b, tol):
                pj, c, d = segs[sj]
                if pj == pi:
                    continue
                iv = capsule_interval(a, b, c, d, tol)
                if iv:
                    byj[pj].append(iv)
            allv = [iv for ivs in byj.values() for iv in ivs]
            cov += union_len(allv) * L
            ec = {}
            for pj, ivs in byj.items():
                f = union_len(ivs)
                ec[pj] = f
                shared_with[pi][pj] += f * L
            ecs.append(ec)
        edge_cover[pi] = ecs
        pooled_cov += cov
        pooled_per += per
        party_share.append(cov / per if per else 0.0)
        share_any.append(cov > 0)
    # attached with the adjacency minimum (corner-only contacts excluded), for the sensitivity line
    adj = collections.defaultdict(set)
    for i in range(n):
        for j, L in shared_with[i].items():
            if L >= MORAN_ADJ_REL * min(short[i], short[j]):
                adj[i].add(j)
                adj[j].add(i)
    out['bldg.partyShare'] = {'median': q7(party_share, .5), 'p10': q7(party_share, .1), 'p90': q7(party_share, .9),
                              'pooledLengthShare': pooled_cov / pooled_per}
    out['bldg.attached'] = {'share': sum(share_any) / n, 'shareAdjacencyMinimum': sum(1 for i in range(n) if adj[i]) / n}
    # pairing (two readings)
    paired_b, paired_a, partner = 0, 0, {}
    for i in range(n):
        nb = set()
        for ec in edge_cover[i]:
            for j, f in ec.items():
                if f >= PAIR_EDGE_SHARE:
                    nb.add(j)
        similar = [j for j in nb if abs(areas[j] - areas[i]) <= PAIR_AREA_TOL * areas[i]]
        if len(similar) == 1:
            paired_b += 1
            partner[i] = similar[0]
        if len(nb) == 1 and similar:
            paired_a += 1
    mutual = sum(1 for i, j in partner.items() if partner.get(j) == i)
    out['bldg.pairing'] = {'share': paired_b / n, 'readingA_share': paired_a / n, 'mutualShare': mutual / n,
                           'definition': 'reading B (primary): exactly one neighbour that both shares >= 50 % of one of the '
                                         "footprint's edges and has an area within +-25 %; reading A: exactly one neighbour "
                                         'shares >= 50 % of an edge, and its area is within +-25 %'}
    # Moran's I on shared-edge adjacency, unit weights
    mean = sum(areas) / n
    z = [a - mean for a in areas]
    W = sum(len(adj[i]) for i in range(n))
    num = sum(z[i] * z[j] for i in range(n) for j in adj[i])
    out['plot.moran'] = {'value': (n / W) * (num / sum(v * v for v in z)) if W else None, 'links': W // 2,
                         'isolated': sum(1 for i in range(n) if not adj[i])}
    # bent vertices on party walls vs elsewhere (CONFIDENCE section 6 #10: do lot cuts bend?)
    bent = collections.Counter()
    for pi, p in enumerate(blds):
        sg = 1 if sarea(p) >= 0 else -1
        tol = PARTY_TOL_REL * short[pi]
        for i in range(len(p)):
            ang = 180 - sg * ps_turn(p[i - 1], p[i], p[(i + 1) % len(p)])
            cls = 'collinear179_181' if 179 <= ang < 181 else ('reflex181_190' if 181 <= ang < 190 else ('convex170_179' if 170 <= ang < 179 else None))
            if cls is None:
                continue
            onwall = any(segs[sj][0] != pi and seg_dist(p[i], segs[sj][1], segs[sj][2]) <= tol for sj in grid.query(p[i], p[i], tol))
            bent[(cls, 'partyWall' if onwall else 'free')] += 1
    out['bentVertices'] = {f'{a}.{b}': v for (a, b), v in sorted(bent.items())}
    # plot minimum width
    mw = [o[2] for o in oms]
    mw_mu = [x / sc for x in mw]
    out['plot.minWidth'] = {'mu': qs(mw_mu), 'rel': qs([x / med_short for x in mw]),
                            'm_declared': qs([x * M_PER_MU for x in mw_mu]),
                            'hist_m_declared': hist([x * M_PER_MU for x in mw_mu], PLOTMINW_EDGES_M, under=False),
                            'values_rel': sorted(round(x / med_short, 4) for x in mw)}
    # ---- the way graph and junctions
    eps = 0.001 * px_per_m
    nodes, gadj, E, V, C = way_graph(M, eps)
    out['wayGraph'] = {'nodes': V, 'edges': E, 'components': C, 'cyclesEminusVplusC': E - V + C}
    clusters, ch, internal = junctions(M, nodes, gadj, MERGE_M * px_per_m, ARM_M * px_per_m)
    J = [c for c in clusters if c['deg'] >= 3]
    angs = [a for c in J for a in c['angles']]
    deg = collections.Counter(min(c['deg'], 5) for c in clusters)
    out['junction.angles'] = {'median': q7(angs, .5), 'p5': q7(angs, .05), 'n': len(angs)}
    out['junction.share4'] = {'share': sum(c['deg'] == 4 for c in J) / len(J) if J else None, 'deg4': sum(c['deg'] == 4 for c in J), 'deg3plus': len(J)}
    # raw degrees before the 2 m merge
    raw = collections.Counter(min(len(gadj[i]), 5) for i in gadj if gadj[i])
    j3 = [c for c in J if c['deg'] == 3]
    out['junctionCensus'] = {
        'mergedDegree': {str(k): deg.get(k, 0) for k in (1, 3, 4, 5)}, 'rawDegree': {str(k): raw.get(k, 0) for k in (1, 3, 4, 5)},
        'internalConnectorsMerged': internal,
        'deg3EndOn': sum(c['landing'] for c in j3), 'deg3': len(j3),
        'deg3GeometricT': sum(max(c['angles']) >= T_COLLINEAR for c in j3),
        'deg4FromTwoEndOn': sum(1 for c in J if c['deg'] == 4 and sum(tuple(nodes[i]) in {tuple(q) for _, _, q in R['snaps']} for i in c['members']) >= 2)}
    # ---- detour
    cid = {}
    for k, c in enumerate(clusters):
        for i in c['members']:
            cid[i] = k
    graph = collections.defaultdict(list)
    for s, e, L, path in ch:
        a, b = cid[s], cid[e]
        if a != b:
            graph[a].append((b, L))
            graph[b].append((a, L))
    jidx = [k for k, c in enumerate(clusters) if c['deg'] >= 3]
    thr = DETOUR_MIN_M * px_per_m
    pairs, ratios_all, unreachable, every = [], {}, 0, []
    dist_from = {k: dijkstra({k}, graph) for k in jidx}
    for x in range(len(jidx)):
        for y in range(x + 1, len(jidx)):
            a, b = jidx[x], jidx[y]
            sd_ = math.dist(clusters[a]['centre'], clusters[b]['centre'])
            gd = dist_from[a].get(b)
            if gd is not None and sd_ > 0:
                every.append((sd_, gd / sd_))
            if sd_ < thr:
                continue
            if gd is None:
                unreachable += 1
                continue
            pairs.append((a, b))
            ratios_all[(a, b)] = gd / sd_
    seed = int(hashlib.sha256(f"street.detour|{R['capture']}|gen-{R['gen']}".encode()).hexdigest()[:16], 16)
    rng = random.Random(seed)
    sample = rng.sample(pairs, min(DETOUR_N, len(pairs))) if pairs else []
    rs = [ratios_all[p] for p in sample]
    ra = list(ratios_all.values())
    out['street.detour'] = {'median': q7(rs, .5), 'n': len(rs), 'eligiblePairs': len(pairs), 'unreachablePairs': unreachable,
                            'allPairsMedian': q7(ra, .5), 'allPairsP90': q7(ra, .9),
                            'sensitivity': {f'min{int(m)}m_allPairsMedian': q7([r for sd_, r in every if sd_ >= m * px_per_m], .5)
                                            for m in (50.0, 200.0)}}
    # ---- cycles per area of the built outline
    H = hull([q for p in blds for q in p])
    hull_px2 = abs(sarea(H))
    hull_mu2 = hull_px2 / sc / sc
    cyc = E - V + C
    out['street.cyclesPerKm2'] = {'value_declared': cyc / (hull_mu2 * M_PER_MU ** 2 / 1e6), 'cycles': cyc, 'hullMu2': hull_mu2,
                                  'perThousandMedianFootprints': cyc / (hull_px2 / (1000 * med_area))}
    # ---- cross-layer measures (footprints against the road graph): at the registered offset, and +-1 px around it
    cl = cross_layer(M, blds, med_area, med_short, px_per_m, detail=True)
    out.update({k: v for k, v in cl.items() if k != 'crossedFootprints' and not k.startswith('_')})
    M['_crossLayer'] = {k: v for k, v in cl.items() if k.startswith('_')}   # W-11b's plan mode reads these; never serialised
    out['registration'] = {'shift': M['R']['registration']['shiftFootprintsToRoadFrame'],
                           'footprintsCrossedByCentreline': cl['crossedFootprints']}
    sens = {}
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        moved = [[(x + dx, y + dy) for x, y in p] for p in blds]
        c2 = cross_layer(M, moved, med_area, med_short, px_per_m, detail=False)
        sens[f'{dx:+d},{dy:+d}'] = {'built': c2['block.countTemplate']['built'], 'courtShare': c2['block.courtShare']['share'],
                                   'gapsDeclared': c2['fg.streetwallGap100']['value_declared'], 'crossed': c2['crossedFootprints']}
    out['registrationSensitivity1px'] = sens
    return out


def cross_layer(M, blds, med_area, med_short, px_per_m, detail):
    n = len(blds)
    sc = M['sc']
    out = {}
    # footprints crossed by a road centreline (0 when the layers are registered)
    wsegs = [(a, b) for coords in M['ways'] for a, b in zip(coords, coords[1:])]
    wg = SegGrid(max(med_short, 1.0))
    for i, (a, b) in enumerate(wsegs):
        wg.add(i, a, b)
    crossed = 0
    for p in blds:
        hit = False
        for i in range(len(p)):
            a, b = p[i], p[(i + 1) % len(p)]
            if any(seg_seg(a, b, *wsegs[sj]) for sj in wg.query(a, b)):
                hit = True
                break
        crossed += hit
    out['crossedFootprints'] = crossed
    blocks = M['blocks']
    out['_owner'] = None                      # filled below; '_' keys never reach the per-map record (measure_map drops them)
    cents = [area_centroid(p) for p in blds]
    owner = [None] * n
    bb = []
    for bi, rings in enumerate(blocks):
        xs = [p[0] for p in rings[0]]
        ys = [p[1] for p in rings[0]]
        bb.append((min(xs), min(ys), max(xs), max(ys)))
    for i, c in enumerate(cents):
        for bi, rings in enumerate(blocks):
            x0, y0, x1, y1 = bb[bi]
            if x0 <= c[0] <= x1 and y0 <= c[1] <= y1 and in_poly(rings, c):
                owner[i] = bi
                break
    cnt = collections.Counter(o for o in owner if o is not None)
    barea = [abs(sarea(r[0])) - sum(abs(sarea(h)) for h in r[1:]) for r in blocks]
    built = [bi for bi in range(len(blocks)) if cnt[bi] > 0]
    out['_owner'] = owner
    out['_built'] = built
    out['_barea'] = barea
    ba_rel = [barea[bi] / med_area for bi in built]
    ba_mu2 = [barea[bi] / sc / sc for bi in built]
    out['block.countTemplate'] = {'built': len(built), 'bounded': len(blocks), 'footprintsInNoBlock': sum(o is None for o in owner),
                                  'footprintsInBlocks': sum(o is not None for o in owner),
                                  'unbuiltBlocksAreaRel': sorted(round(barea[bi] / med_area, 3) for bi in range(len(blocks)) if not cnt[bi])}
    if detail:
        out['block.areaRel'] = {'n': len(ba_rel), 'q': qs(ba_rel), 'hist': hist(ba_rel, AREAREL_EDGES),
                                'values': sorted(round(x, 4) for x in ba_rel)}
        out['block.area'] = {'mu2': qs(ba_mu2), 'm2_declared': qs([x * M_PER_MU ** 2 for x in ba_mu2]),
                             'hist_m2_declared': hist([x * M_PER_MU ** 2 for x in ba_mu2], BLOCK_EDGES_M2)}
    if detail:
        # descriptive, unregistered measures for W-12's depth re-fit and CONFIDENCE section 6 #10 (relative units)
        ext = []
        for bi in built:
            lmaj, lmin, _ = obb_and_minwidth(blocks[bi][0])
            ext.append(lmin / med_short)
        out['blockMinorExtentRel'] = {'q': qs(ext), 'values': sorted(round(x, 4) for x in ext),
                                      'definition': 'built blocks: minimum-area rectangle short side of the drawn-centreline face / the median footprint short side'}
        fw, fd, sb, fw_front, fd_front = [], [], [], [], []
        for i, p in enumerate(blds):
            bi = owner[i]
            if bi is None:
                continue
            ring = blocks[bi][0]
            best = None
            for k in range(len(ring)):
                a, b = ring[k], ring[(k + 1) % len(ring)]
                dmin = min(seg_dist(q, a, b) for q in p)
                if best is None or dmin < best[0]:
                    best = (dmin, a, b)
            dmin, a, b = best
            L = math.dist(a, b)
            if L == 0:
                continue
            ux, uy = (b[0] - a[0]) / L, (b[1] - a[1]) / L
            pu = [q[0] * ux + q[1] * uy for q in p]
            pv = [-q[0] * uy + q[1] * ux for q in p]
            w, dp = (max(pu) - min(pu)) / med_short, (max(pv) - min(pv)) / med_short
            fw.append(w)
            fd.append(dp)
            sb.append(dmin / med_short)
            if dmin <= FRONT_PRIMARY * med_short:
                fw_front.append(w)
                fd_front.append(dp)
        out['footprintFrontage'] = {'widthRel': qs(fw), 'depthRel': qs(fd), 'setbackFromCentrelineRel': qs(sb),
                                    'frontRow': {'n': len(fw_front), 'widthRel': qs(fw_front), 'depthRel': qs(fd_front)},
                                    'definition': 'per footprint in a block: extents along and across its nearest block-boundary edge '
                                                  '(drawn centreline), and its least distance to that edge; / the median footprint short side; '
                                                  'front row = least distance <= %.2f x that side' % FRONT_PRIMARY}
    out['block.courtShare'] = court_share(M, blocks, built, blds, med_short, med_area, cnt)
    if not detail:
        out['block.courtShare'].pop('blocks')
    out['fg.streetwallGap100'] = frontage_gaps(M, blocks, built, blds, med_short, px_per_m)
    return out


def qs(xs):
    if not xs:
        return {'n': 0}
    return {'n': len(xs), 'p10': q7(xs, .1), 'p50': q7(xs, .5), 'p90': q7(xs, .9), 'min': min(xs), 'max': max(xs)}


def hist(xs, edges, under=True, over=True):
    h = [0] * (len(edges) - 1)
    u = o = 0
    for x in xs:
        if x < edges[0]:
            u += 1
        elif x >= edges[-1]:
            o += 1
        else:
            lo, hi = 0, len(edges) - 1
            while hi - lo > 1:
                mid = (lo + hi) // 2
                if x >= edges[mid]:
                    lo = mid
                else:
                    hi = mid
            h[lo] += 1
    d = {'edges': [round(e, 6) for e in edges], 'bins': h}
    if under:
        d['underflow'] = u
    if over:
        d['overflow'] = o
    return d


# ---------------------------------------------------------------- courts (raster, PIL)
def court_share(M, blocks, built, blds, med_short, med_area, cnt):
    from PIL import Image, ImageDraw, ImageFilter
    d = DILATE_REL * med_short
    res = RASTER_REL * d
    min_area = COURT_AREA_REL * med_area
    fbb = []
    for p in blds:
        xs = [q[0] for q in p]
        ys = [q[1] for q in p]
        fbb.append((min(xs), min(ys), max(xs), max(ys)))
    rows = []
    for bi in built:
        rings = blocks[bi]
        _, rad = polylabel(rings, 0.01 * med_short)
        deep = rad > DEEP_REL * med_short
        xs = [q[0] for q in rings[0]]
        ys = [q[1] for q in rings[0]]
        x0, y0, x1, y1 = min(xs), min(ys), max(xs), max(ys)
        ox, oy = x0 - 2 * res, y0 - 2 * res
        Wd, Ht = int(math.ceil((x1 - x0) / res)) + 5, int(math.ceil((y1 - y0) / res)) + 5

        def tr(q):
            return ((q[0] - ox) / res, (q[1] - oy) / res)
        bimg = Image.new('L', (Wd, Ht), 0)
        bd = ImageDraw.Draw(bimg)
        bd.polygon([tr(q) for q in rings[0]], fill=1)
        for h in rings[1:]:
            bd.polygon([tr(q) for q in h], fill=0)
        fimg = Image.new('L', (Wd, Ht), 0)
        fd = ImageDraw.Draw(fimg)
        lw = max(1, int(round(2 * d / res)))
        rr = d / res
        for fi, (a0, b0, a1, b1) in enumerate(fbb):
            if a1 < x0 - d or a0 > x1 + d or b1 < y0 - d or b0 > y1 + d:
                continue
            pts = [tr(q) for q in blds[fi]]
            fd.polygon(pts, fill=1)
            fd.line(pts + [pts[0]], fill=1, width=lw, joint='curve')
            for (x, y) in pts:
                fd.ellipse([x - rr, y - rr, x + rr, y + rr], fill=1)
        B = bimg.tobytes()
        Fb = fimg.tobytes()
        U = bytearray(b & (1 - f) for b, f in zip(B, Fb))
        outside = bimg.point(lambda v: 1 if v == 0 else 0).filter(ImageFilter.MaxFilter(3)).tobytes()
        stack = [i for i in range(len(U)) if U[i] and outside[i]]
        for i in stack:
            U[i] = 0
        while stack:
            i = stack.pop()
            for j in (i - 1, i + 1, i - Wd, i + Wd):
                if U[j]:
                    U[j] = 0
                    stack.append(j)
        comps = []
        i = U.find(1)
        while i != -1:
            U[i] = 0
            st_, size = [i], 0
            while st_:
                k = st_.pop()
                size += 1
                for j in (k - 1, k + 1, k - Wd, k + Wd):
                    if U[j]:
                        U[j] = 0
                        st_.append(j)
            comps.append(size * res * res)
            i = U.find(1, i)
        courts = [a for a in comps if a >= min_area]
        rows.append({'block': bi, 'footprints': cnt[bi], 'inscribedRadiusRel': rad / med_short, 'deep': deep,
                     'enclosedComponentsRel': sorted(round(a / med_area, 4) for a in comps),
                     'court': bool(courts)})
    deep = [r for r in rows if r['deep']]
    return {'share': sum(r['court'] for r in deep) / len(deep) if deep else None, 'deep': len(deep),
            'courtDeep': sum(r['court'] for r in deep), 'courtShallow': sum(r['court'] for r in rows if not r['deep']),
            'built': len(rows), 'raster': {'cellRelShort': RASTER_REL * DILATE_REL, 'connectivity': '4 for components, 8 for touching the edge'},
            'blocks': rows}


# ---------------------------------------------------------------- frontage gaps (declared operational definition)
def frontage_gaps(M, blocks, built, blds, med_short, px_per_m):
    """For every built block, the frontage is its outer boundary (the drawn-centreline face). Rays are cast inward,
    perpendicular to the boundary, every FRONT_STEP_REL x the median short side; a ray is walled when it meets a footprint
    within a band of depth D from the centreline (D = FRONT_PRIMARY x the median short side; 0.75 and 1.25 reported). A gap
    is a maximal run of unwalled rays (cyclic along the boundary); gaps longer than 2 m (declared) are counted per 100 m
    (declared) of frontage; gap length per 100 m (IMPROVEMENTS' original wording) is reported beside it."""
    step = FRONT_STEP_REL * med_short
    grid = SegGrid(max(med_short, 1.0))
    fsegs = []
    for p in blds:
        for i in range(len(p)):
            a, b = p[i], p[(i + 1) % len(p)]
            grid.add(len(fsegs), a, b)
            fsegs.append((a, b))
    res = {}
    for depth_rel in FRONT_DEPTHS_REL:
        D = depth_rel * med_short
        total_len, gaps = 0.0, []
        for bi in built:
            P = blocks[bi][0]
            sg = 1.0 if sarea(P) > 0 else -1.0
            hits = []
            for i in range(len(P)):
                a, b = P[i], P[(i + 1) % len(P)]
                L = math.dist(a, b)
                if L == 0:
                    continue
                ux, uy = (b[0] - a[0]) / L, (b[1] - a[1]) / L
                nx, ny = -uy * sg, ux * sg               # inward normal (left of travel on a positive ring)
                m_ = max(1, int(math.ceil(L / step)))
                for s in range(m_):
                    t = (s + 0.5) * L / m_
                    S0 = (a[0] + ux * t, a[1] + uy * t)
                    S1 = (S0[0] + nx * D, S0[1] + ny * D)
                    hit = False
                    for sj in grid.query(S0, S1):
                        c, d = fsegs[sj]
                        if seg_seg(S0, S1, c, d):
                            hit = True
                            break
                    hits.append((hit, L / m_))
                total_len += L
            if not hits:
                continue
            if all(h for h, _ in hits):
                continue
            if not any(h for h, _ in hits):
                gaps.append(sum(w for _, w in hits))
                continue
            s0 = next(i for i, (h, _) in enumerate(hits) if h)
            run = 0.0
            for k in range(1, len(hits) + 1):
                h, w = hits[(s0 + k) % len(hits)]
                if h:
                    if run > 0:
                        gaps.append(run)
                    run = 0.0
                else:
                    run += w
            if run > 0:
                gaps.append(run)
        gap_thr = GAP_M * px_per_m
        per = PER_M * px_per_m
        res[str(depth_rel)] = {'gapsOver2mPer100m_declared': sum(g > gap_thr for g in gaps) / (total_len / per) if total_len else None,
                               'gapLengthPer100m_declared_m': (sum(gaps) / px_per_m) / (total_len / per) if total_len else None,
                               'frontageMu': total_len / M['sc'], 'gaps': len(gaps), 'gapsOver2m': sum(g > gap_thr for g in gaps),
                               'gapLengthMu': qs([g / M['sc'] for g in gaps])}
    prim = res[str(FRONT_PRIMARY)]
    return {'value_declared': prim['gapsOver2mPer100m_declared'], 'gapLengthPer100m_declared_m': prim['gapLengthPer100m_declared_m'],
            'byBandDepthRelShort': res}


def seg_seg(p1, p2, p3, p4):
    def orient(a, b, c):
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
    d1, d2 = orient(p3, p4, p1), orient(p3, p4, p2)
    d3, d4 = orient(p1, p2, p3), orient(p1, p2, p4)
    return ((d1 > 0) != (d2 > 0)) and ((d3 > 0) != (d4 > 0))


# ================================================================ time.model fixtures (stored profile totals)
REGEN_SUFFIX, MODEL_SUFFIX = '.MapScene.reset', '.Hood.create'     # the analyser's labels (research-side only)


def profile_times():
    rows = []
    for cap in PROFILE_CAPS:
        rj = json.load(open(os.path.join(NGDIR, cap, 'report.json')))
        meta = json.load(open(os.path.join(NGDIR, cap, 'meta.json')))
        p = rj['passes']['profile']
        hoods = [x.split('Hood.hx:42: ')[1] for x in p['console'] if 'Hood.hx:42: ' in x]
        gens = sorted((k for k in p if k.endswith('.cpuprofile')), key=lambda k: int(k.split('-')[1].split('.')[0]))
        for gi, g in enumerate(gens):
            tt = p[g]['topTotal']
            regen = next((t['totalMs'] for t in tt if t['label'].endswith(REGEN_SUFFIX)), None)
            model = next((t['totalMs'] for t in tt if t['label'].endswith(MODEL_SUFFIX)), None)
            seed, tags = hoods[gi].split(': ', 1) if gi < len(hoods) else (None, None)
            tg = [t.strip() for t in tags.split(',')] if tags else []
            tmpl = next((t for t in tg if t in ('area', 'street', 'square', 'ring')), None)
            size = next((t for t in tg if t in ('small', 'medium', 'large')), None)
            rows.append({'capture': cap, 'gen': gi, 'template': tmpl, 'size': size, 'seed': int(seed) if seed else None,
                         'how': 'cold load' if gi == 0 else 'regeneration', 'regenerationMs': regen, 'modelMs': model,
                         'host': f"{meta['host']['cpu']} x{meta['host']['cpus']}, {meta['host']['platform']}/{meta['host']['arch']}",
                         'busyMs': p[g]['busyMs']})
    return rows


# ================================================================ aggregation, checks, outputs
def run(inputs):
    files = sorted(f for f in os.listdir(inputs) if f.endswith('.metric.geojson.gz'))
    Ms = [load(os.path.join(inputs, f)) for f in files]
    return Ms


def main():
    args = sys.argv[1:]
    if '--plan' in args or '--red' in args:
        return main_plan(args)
    opt = {}
    for key in ('--inputs', '--json', '--md'):
        if key in args:
            i = args.index(key)
            opt[key] = args[i + 1]
            del args[i:i + 2]
    do_check = '--check' in args
    inputs = opt.get('--inputs', INPUTS)
    Ms = run(inputs)
    # ---- T1
    As = []
    for M in Ms:
        A = t1_analyse(M)
        A['summary'] = t1_summary(A)
        As.append(A)
    t1 = t1_tables(As)
    want = readme_rows()
    t1_ok = t1 == want
    t1_rows = sum(1 for l in want if not l.startswith('|---'))
    t1_diff = [i for i, (a, b) in enumerate(zip(t1, want)) if a != b]
    print(f"T1 paths_stats tables from MeasureInput vs README-vertices.md: {'PASS' if t1_ok else 'FAIL'} "
          f"({len(t1)} lines vs {len(want)}; {t1_rows} non-separator rows; differing lines {t1_diff[:5]})")
    # ---- T2
    t2_rows, t2_vals = [], {}
    for M in Ms:
        r, v = t2_row(M)
        t2_rows.append(r)
        t2_vals[M['key']] = v
    live = subprocess.run([sys.executable, '-B', PGB], capture_output=True, text=True, cwd=ROOT).stdout.split('\n')
    live_rows = [l for l in live if l.startswith('| 2026')]
    t2_ok = t2_rows == live_rows
    print(f"T2 plot_granularity_baseline.py rows (old definitions) from MeasureInput vs the script's live output: "
          f"{'PASS' if t2_ok else 'FAIL'} ({len(t2_rows)} vs {len(live_rows)} rows)")
    # ---- V12 metrics per map
    per = []
    for M in Ms:
        m = measure_map(M)
        m['legacy'] = t2_vals[M['key']]
        per.append(m)
        print(f"  {M['key']} {m['template']} {m['seed']}: party median {m['bldg.partyShare']['median']:.3f} attached "
              f"{m['bldg.attached']['share']:.3f} pairing {m['bldg.pairing']['share']:.3f} moran {m['plot.moran']['value']:+.3f} "
              f"jangles {m['junction.angles']['median']:.1f}/{m['junction.angles']['p5']:.1f} share4 {m['junction.share4']['share']:.3f} "
              f"detour {m['street.detour']['median']:.3f} cycles {m['street.cyclesPerKm2']['cycles']} "
              f"({m['street.cyclesPerKm2']['value_declared']:.0f}/km2 decl) built {m['block.countTemplate']['built']} "
              f"court {m['block.courtShare']['courtDeep']}/{m['block.courtShare']['deep']} gaps {m['fg.streetwallGap100']['value_declared']:.2f}")
    # ---- internal checks
    checks = []
    for M, m in zip(Ms, per):
        c = M['R']['census']
        euler = m['wayGraph']['cyclesEminusVplusC'] == c['faces'] - c['components']
        checks.append((f"{M['key']} Euler: E - V + C = faces - components", euler, f"{m['wayGraph']['cyclesEminusVplusC']} vs {c['faces'] - c['components']}"))
        checks.append((f"{M['key']} way graph equals the adapter's (nodes, edges, components)",
                       (m['wayGraph']['nodes'], m['wayGraph']['edges'], m['wayGraph']['components']) == (c['nodes'], c['edges'], c['components']),
                       f"{(m['wayGraph']['nodes'], m['wayGraph']['edges'], m['wayGraph']['components'])} vs {(c['nodes'], c['edges'], c['components'])}"))
        checks.append((f"{M['key']} layers registered: footprints crossed by a road centreline <= 2", m['registration']['footprintsCrossedByCentreline'] <= 2,
                       f"{m['registration']['footprintsCrossedByCentreline']} crossed at shift {m['registration']['shift']}"))
        fa = m['block.countTemplate']
        checks.append((f"{M['key']} every footprint centroid lies in at most one block; footprints counted once",
                       fa['footprintsInBlocks'] + fa['footprintsInNoBlock'] == m['footprints'], f"{fa}"))
    e10 = {m_['map']: m_ for m_ in json.load(open(os.path.join(ROOT, 'docs', 'calibration', 'E10-ng-bentcut-faces.json')))['maps']}
    for M, m in zip(Ms, per):
        ref = e10.get(m['map'])
        ok = ref is not None and abs(m['e10Median']['shortMu'] - ref['medianFootprintShortMu']) <= 1e-6 * ref['medianFootprintShortMu'] + 1e-6 \
            and abs(m['e10Median']['areaMu2'] - ref['medianFootprintAreaMu2']) <= 1e-6 * ref['medianFootprintAreaMu2'] + 1e-6 \
            and m['footprints'] == ref['footprints']
        checks.append((f"{M['key']} footprint OBB and area medians equal E10's (same rule, nearest-rank median)", ok,
                       f"{m['e10Median']} vs {(ref or {}).get('medianFootprintShortMu')}, {(ref or {}).get('medianFootprintAreaMu2')}"))
    times_ = profile_times()
    want_t = [(52.2, 31.6), (38.8, 19.4), (47.1, 21.2), (10.4, 6.0), (96.0, 55.0), (77.7, 43.5)]
    got_t = [(t['regenerationMs'], t['modelMs']) for t in times_]
    checks.append(('stored profile totals reproduce profile-neighbourhood.md 5.2 and the ring table (regeneration / model ms)',
                   got_t == want_t, f'{got_t}'))
    ok_int = all(x[1] for x in checks)
    print(f"internal checks: {sum(x[1] for x in checks)}/{len(checks)} pass")
    for name, ok, note in checks:
        if not ok:
            print('  FAIL', name, note)
    times = times_
    doc = build_doc(Ms, per, times, t1_ok, t1_rows, len(t1), t2_ok, t2_rows, live_rows, checks)
    if '--json' in opt:
        with open(opt['--json'], 'w') as fh:
            json.dump(doc, fh, indent=1)
            fh.write('\n')
    if '--md' in opt:
        with open(opt['--md'], 'w') as fh:
            fh.write(md_tables(doc) + '\n')
    allok = t1_ok and t2_ok and ok_int
    print('CHECKER', 'PASS' if allok else 'FAIL')
    if do_check and not allok:
        sys.exit(1)


def build_doc(Ms, per, times, t1_ok, t1_rows, t1_lines, t2_ok, t2_rows, live_rows, checks):
    by_t = collections.defaultdict(list)
    for m in per:
        by_t[m['template']].append(m)

    def pick(m, path):
        x = m
        for k in path:
            x = x[k]
        return x
    series = {'bldg.pairing': ('bldg.pairing', 'share'), 'bldg.partyShare': ('bldg.partyShare', 'median'),
              'bldg.attached': ('bldg.attached', 'share'), 'plot.moran': ('plot.moran', 'value'),
              'junction.angles.median': ('junction.angles', 'median'), 'junction.angles.p5': ('junction.angles', 'p5'),
              'junction.share4': ('junction.share4', 'share'), 'street.detour': ('street.detour', 'median'),
              'street.detour.allPairs': ('street.detour', 'allPairsMedian'),
              'street.cyclesPerKm2.declared': ('street.cyclesPerKm2', 'value_declared'),
              'street.cycles.perThousandMedianFootprints': ('street.cyclesPerKm2', 'perThousandMedianFootprints'),
              'block.countTemplate': ('block.countTemplate', 'built'), 'block.courtShare': ('block.courtShare', 'share'),
              'fg.streetwallGap100.declared': ('fg.streetwallGap100', 'value_declared'),
              'plot.minWidth.p50.rel': ('plot.minWidth', 'rel', 'p50'), 'block.areaRel.p50': ('block.areaRel', 'q', 'p50')}
    perseed = {name: {f"{m['template']}/{m['seed']}": pick(m, path) for m in per} for name, path in series.items()}
    stability = {}
    for t, ms in by_t.items():
        if len(ms) == 2:
            a, b = ms
            stab = {}
            for name in ('street.detour', 'street.detour.allPairs', 'street.cyclesPerKm2.declared', 'street.cycles.perThousandMedianFootprints'):
                va, vb = pick(a, series[name]), pick(b, series[name])
                stab[name] = {'7171': va, '7172': vb, 'relDiff': abs(va - vb) / ((va + vb) / 2) if va is not None and vb is not None else None}
            stability[t] = stab
    return {
        'schema': 'm1.E11/1', 'lane': 'm1/W-11', 'script': SCRIPT, 'adapter': 'research:baselines/adapters/ng.py',
        'referenceBuild': REFERENCE_BUILD, 'inputs': [os.path.relpath(M['path'], ROOT) for M in Ms],
        'scaleRule': {'scale': 'relative', 'mu': 'canvas px / the map CTM scale', 'mPerMuDeclared': M_PER_MU,
                      'metreConstantsConverted': {'junction merge': MERGE_M, 'arm length': ARM_M, 'detour minimum': DETOUR_MIN_M,
                                                  'streetwall gap': GAP_M, 'per frontage': PER_M, 'degenerate vertex merge': 0.001},
                      'note': 'declared conversion (plan-check PC-03): every key holding metres or km2 is suffixed declared'},
        'declared': {
            'quantiles': 'type 7 (linear between order statistics) unless a legacy twin mirrors another rule',
            'medianFootprint': 'type-7 median of footprint areas and minimum-area-rectangle short sides, per map',
            'block': 'a bounded face of the drawn-centreline way graph (street corridors not inset); built = holds >= 1 footprint area centroid',
            'builtOutline': 'the convex hull of every footprint vertex (V12 names no rule for a source without walls)',
            'partyTolRelOwnShort': PARTY_TOL_REL, 'pairing': {'edgeShare': PAIR_EDGE_SHARE, 'areaTol': PAIR_AREA_TOL, 'primaryReading': 'B'},
            'moranAdjacencyMinRelShort': MORAN_ADJ_REL, 'attachedPrimary': 'any shared length > 0 (V12 literal); adjacency minimum reported',
            'court': {'deepRadiusRelShort': DEEP_REL, 'dilateRelShort': DILATE_REL, 'minAreaRelMedianArea': COURT_AREA_REL,
                      'rasterCellRelDilation': RASTER_REL, 'radius': 'polylabel on the face polygon, precision 1 % of the short side'},
            'frontage': {'bandDepthRelShort': FRONT_PRIMARY, 'sensitivity': list(FRONT_DEPTHS_REL), 'rayStepRelShort': FRONT_STEP_REL},
            'junction': {'mergeM': MERGE_M, 'armM': ARM_M, 'geometricTDeg': T_COLLINEAR,
                         'internalConnector': 'a chain with both ends in one merged cluster and length <= 2 x the merge distance'},
            'detour': {'pairs': DETOUR_N, 'minM': DETOUR_MIN_M, 'stream': "random.Random(first 64 bits of sha256('street.detour|<capture>|gen-<g>')).sample (Python 3.9)"},
            'registration': 'footprints moved into the road canvas frame by the adapter (screenshot registration); cross-layer measures repeated at +-1 px'},
        'sample': {'kind': 'recorded seeds 7171 and 7172 per template at medium (twin fixtures; plan-check PC-04: rows need '
                           "W-04's plan seeds or a recorded-sample ruling)", 'maps': len(per)},
        'twins': {'T1_pathsStatsTables': {'pass': t1_ok, 'nonSeparatorRows': t1_rows, 'lines': t1_lines},
                  'T2_plotGranularity': {'pass': t2_ok, 'rows': len(t2_rows), 'rowsTwin': t2_rows, 'rowsLive': live_rows}},
        'internalChecks': [{'check': c[0], 'pass': c[1], 'receipt': c[2]} for c in checks],
        'perSeed': perseed, 'stabilityAcrossSeeds': stability, 'maps': per, 'timeFixtures': times,
    }


def md_tables(doc):
    L = []
    L.append('| template / seed | footprints | partyShare (median) | attached | pairing (B / A / mutual) | Moran (shared edge) | junction angles median / p5 | share4 | detour (200 / all) | cycles | cycles per km² (decl.) | built blocks | court (deep) | gaps > 2 m per 100 m (decl.) |')
    L.append('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|')
    for m in doc['maps']:
        L.append(f"| {m['template']} / {m['seed']} | {m['footprints']} | {m['bldg.partyShare']['median']:.3f} | {m['bldg.attached']['share']:.3f} | "
                 f"{m['bldg.pairing']['share']:.3f} / {m['bldg.pairing']['readingA_share']:.3f} / {m['bldg.pairing']['mutualShare']:.3f} | "
                 f"{m['plot.moran']['value']:+.3f} | {m['junction.angles']['median']:.1f} / {m['junction.angles']['p5']:.1f} | "
                 f"{m['junction.share4']['share']:.3f} | {m['street.detour']['median']:.3f} / {m['street.detour']['allPairsMedian']:.3f} | "
                 f"{m['street.cyclesPerKm2']['cycles']} | {m['street.cyclesPerKm2']['value_declared']:.1f} | {m['block.countTemplate']['built']} | "
                 f"{m['block.courtShare']['courtDeep']}/{m['block.courtShare']['deep']} | {m['fg.streetwallGap100']['value_declared']:.2f} |")
    return '\n'.join(L)


# ================================================================ W-11b: measured values on the plan seeds
# Lane m1/W-11b (M-1-plan.md section 2 row W-11b; record E11 section 10). The fixture mode above is unchanged (its JSON
# reproduces byte for byte); this mode runs the same per-map measurement (measure_map) on W-04's 44 plan-seed recordings,
# adapted by `adapters/ng.py --plan`, with the rulings applied:
#   R-01  declared 0.35 m per model unit (keys holding metres or km2 are suffixed declared; the input header says declared)
#   R-05  bldg.pairing reading B (reading A and the mutual share beside)
#   R-06  junction.share4 with nodes merged within 2 m (declared); the raw degree-4 count beside
#   R-07  fg.streetwallGap100's ray definition (band 1.0 x the median short side; 0.75 and 1.25 beside)
#   R-08  block.countTemplate counts bounded built faces (the share of footprints in no face beside); the built outline
#         (street.cyclesPerKm2) and the hood outline are the convex hull of every drawn road and footprint vertex
#         (outlineKind 1); E11's footprint-only hull beside
#   R-23  plot.cvDistrict: the hood is the district; CV = population standard deviation / mean of plot area, >= 30 plots
#   R-01  block.areaRel's edges: 24 log-spaced bins over 0.5-500 median footprint areas, underflow and overflow
#   R-47 (d) spreadKS.p90 per template subset for each distribution: V12 section 3.5.3's p90 (type 7) of the seed-pair KS
#         distances, KS on the binned CDFs at the catalogue edges (V12 section 3.4.2); the raw-ECDF KS beside
# Measured values only (R-47 (a)); W-15 forms the rows. Outputs: docs/calibration/E11-ng-rows.plan.json and the hood
# outlines for plan section 7b, research/baselines/candidates/ng-faces.hoods.json.
#   python3 research/baselines/measure_ng.py --plan [--inputs DIR] [--json OUT] [--hoods OUT] [--jobs N] [--check]
#   python3 research/baselines/measure_ng.py --red [--inputs DIR]      the checks' red tests (exit 0 when every one is red)
PLAN_INPUTS = os.path.join(INPUTS, 'plan-seeds')
PLAN_JSON = os.path.join(ROOT, 'research', 'baselines', 'plan.json')
PROGRAMME_INDEX = os.path.join(NGDIR, 'ng-programme-m1-2026-10-03', 'index.json')
PATHS_STATS_MD = os.path.join(NGDIR, 'ng-programme-m1-2026-10-03', 'paths-stats.md')
OUT_PLAN_JSON = os.path.join(ROOT, 'docs', 'calibration', 'E11-ng-rows.plan.json')
OUT_HOODS = os.path.join(HERE, 'candidates', 'ng-faces.hoods.json')
AREAREL_EDGES_R01 = [0.5 * 1000.0 ** (i / 24) for i in range(25)]
PLAN_LANE = 'm1/W-11b'
SIZE_N = {'medium': 5, 'small': 3, 'large': 3}
TEMPLATES = ('area', 'street', 'square', 'ring')
C2_LABEL = r'^[A-Za-z0-9.:/@+_-]{1,120}$'
C2_CAPTURE = r'^\d{4}-\d{2}-\d{2}T[\d-]{8}$'
C2_BUILD = r'^[A-Za-z0-9._:+-]{1,64}$'


def measure_map_plan(M):
    """measure_map unchanged, then the W-11b additions and replacements on the same map"""
    m = measure_map(M)
    R, sc = M['R'], M['sc']
    cl = M['_crossLayer']
    blds, plots = M['buildings'], M['plots']
    oms = [obb_and_minwidth(p) for p in blds]
    areas = [abs(sarea(p)) for p in blds]
    med_area, med_short = q7(areas, .5), q7([o[1] for o in oms], .5)
    m_per_px = M_PER_MU / sc
    # R-23: plot.cvDistrict, the hood as the district
    pa = [abs(sarea(p)) for p in plots]
    mean = sum(pa) / len(pa)
    sd = math.sqrt(sum((a - mean) ** 2 for a in pa) / len(pa))
    m['plot.cvDistrict'] = {'value': sd / mean, 'plots': len(pa), 'applicable': len(pa) >= 30,
                            'definition': 'the hood is the district (R-23): population standard deviation / mean of plot '
                                          '(footprint) area; applicable at >= 30 plots'}
    # R-08: the built outline and the hood outline, the convex hull of every drawn road and footprint vertex
    road_pts = [tuple(q) for coords in M['ways'] for q in coords]
    road_pts += [tuple(e) for w in R['ways'] for e in w['drawnEnds'] if e is not None]
    H = hull(road_pts + [q for p in blds for q in p])
    hull_px2 = abs(sarea(H))
    cyc = m['wayGraph']['cyclesEminusVplusC']
    old = m.pop('street.cyclesPerKm2')
    m['street.cyclesPerKm2'] = {'value_declared': cyc / (hull_px2 * m_per_px ** 2 / 1e6), 'cycles': cyc, 'outlineKind': 1,
                                'outline': 'convex hull of every drawn road and footprint vertex (R-08)',
                                'hullMu2': hull_px2 / sc / sc, 'hullM2_declared': hull_px2 * m_per_px ** 2,
                                'perThousandMedianFootprints': cyc / (hull_px2 / (1000 * med_area)),
                                'footprintHull': old}
    k = m_per_px * 100.0
    ring = []
    for x, y in H:
        q = [int(round(x * k)), int(round(y * k))]
        if not ring or q != ring[-1]:
            ring.append(q)
    if len(ring) > 1 and ring[0] == ring[-1]:
        ring.pop()
    m['hoodOutline'] = {'outlineCm': ring + [ring[0]], 'cmPerPx': k, 'vertices': len(ring),
                        'areaM2_declared': hull_px2 * m_per_px ** 2, 'areaM2_fromCm': abs(sarea([tuple(q) for q in ring])) / 1e4,
                        'rule': 'convex hull (R-08, outlineKind 1) in the registered road frame; cm = px / ctmScale x 0.35 x 100, '
                                'rounded half to even; ring closed (first vertex repeated)'}
    # R-01: block.areaRel on the ruled edges (replaces the fixture mode's declared edges); exact values beside the bins
    built, barea = cl['_built'], cl['_barea']
    ba_rel = [barea[bi] / med_area for bi in built]
    m['block.areaRel'] = {'n': len(ba_rel), 'q': qs(ba_rel), 'hist': hist(ba_rel, AREAREL_EDGES_R01),
                          'edgesRule': 'R-01: 24 log-spaced bins over 0.5-500 median footprint areas, underflow and overflow',
                          'values': sorted(round(x, 4) for x in ba_rel)}
    m['block.area']['values_m2_declared'] = sorted(round(barea[bi] * m_per_px ** 2, 2) for bi in built)
    m['plot.minWidth']['values_m_declared'] = sorted(round(o[2] * m_per_px, 4) for o in oms)
    # D3 for W-12: built blocks' minor extent, relative and declared metres (the fixture mode's relative key replaced)
    ext = [obb_and_minwidth(M['blocks'][bi][0])[1] for bi in built]
    m.pop('blockMinorExtentRel', None)
    m['blockMinorExtent'] = {'rel': qs([e / med_short for e in ext]), 'm_declared': qs([e * m_per_px for e in ext]),
                             'values_rel': sorted(round(e / med_short, 4) for e in ext),
                             'values_m_declared': sorted(round(e * m_per_px, 3) for e in ext),
                             'definition': 'built blocks (bounded faces holding >= 1 footprint area centroid): the minimum-area '
                                           'rectangle short side of the drawn-centreline face; relative = / the median footprint '
                                           'short side; declared metres at 0.35 m per model unit'}
    owner = cl['_owner']
    m['block.countTemplate']['footprintsInNoBlockShare'] = sum(o is None for o in owner) / len(owner)
    return m


def _plan_worker(path):
    M = load(path)
    m = measure_map_plan(M)
    A = t1_analyse(M)
    A['summary'] = t1_summary(A)
    _, legacy = t2_row(M)
    m['legacy'] = legacy
    R = M['R']
    ident = {k: R.get(k) for k in ('planFamily', 'planIndex', 'planLabel', 'capture', 'gen', 'template', 'size', 'seed', 'file')}
    ident.update({'header': M['mi']['header'], 'ctmScale': M['sc'], 'census': R['census'],
                  'registration': {k: R['registration'][k] for k in ('shiftFootprintsToRoadFrame',)},
                  'fpHit': R['registration']['footprintCanvas']['hit'], 'fpHit1px': R['registration']['footprintCanvas']['bestNeighbour1px'],
                  'roadHit': R['registration']['roadCanvas']['hit'], 'roadHit1px': R['registration']['roadCanvas']['bestNeighbour1px'],
                  'input': os.path.relpath(path, ROOT),
                  'inputSha256': hashlib.sha256(open(path, 'rb').read()).hexdigest()})
    return ident, m, {'label': A['label'], 'file': A['file'], 'summary': A['summary']}


def plan_ng_entries():
    """plan.json's NG entries in plan order, with the programme index's folder for each"""
    plan = json.load(open(PLAN_JSON))
    loads = json.load(open(PROGRAMME_INDEX))['loads']
    fams, ents = [], []
    for f in plan['families']:
        if f['reference'] != 'NG':
            continue
        fams.append({'family': f['family'], 'template': f['setting']['template'], 'size': f['setting']['size'],
                     'indices': f['indices'], 'scale': f['setting'].get('scale')})
        for e in f['entries']:
            ents.append({'family': f['family'], 'i': e['i'], 'label': e['label'], 'seed': e['seed'],
                         'template': f['setting']['template'], 'size': f['setting']['size'],
                         'capture': os.path.basename(loads[e['label']]['folder']) if e['label'] in loads else None})
    return fams, ents


# ---------------------------------------------------------------- the checks (each also run red by --red)
def check_identity(ents, idents):
    """every measured map is the plan entry in its place: label, seed, folder, header (R-01's declared scale, seedLabel)"""
    bad = []
    if [e['label'] for e in ents] != [d['planLabel'] for d in idents]:
        bad.append('order or labels differ from plan.json')
    for e, d in zip(ents, idents):
        h = d['header']
        if (d['planLabel'], d['seed'], d['capture'], d['template'], d['size'], d['planIndex'], d['planFamily']) != \
                (e['label'], e['seed'], e['capture'], e['template'], e['size'], e['i'], e['family']):
            bad.append(f"{e['label']}: identity")
        if h.get('scale') != 'declared' or h.get('unitM') != M_PER_MU / d['ctmScale'] or h.get('seedLabel') != e['label'] \
                or h.get('build') != REFERENCE_BUILD:
            bad.append(f"{e['label']}: header {h}")
    return not bad, (f'{len(idents)} maps in plan order; label, seed, folder, template, size, index and header (declared, '
                     f'unitM = 0.35 / ctmScale, seedLabel) equal' if not bad else '; '.join(bad[:5]))


def check_samples(fams, idents):
    """every family's measured indices are exactly [0, n) with n = 5 at medium and 3 at small / large; nothing failed"""
    bad, rows = [], []
    for f in fams:
        got = sorted(d['planIndex'] for d in idents if d['planFamily'] == f['family'])
        n = SIZE_N[f['size']]
        ok = f['indices'] == [0, n] and got == list(range(n))
        rows.append(f"{f['family']} {got}")
        if not ok:
            bad.append(f"{f['family']}: plan {f['indices']}, measured {got}")
    return not bad, ('every family [0, n): medium [0, 5) x 4, small and large [0, 3) x 4; failed none' if not bad else '; '.join(bad))


def check_registration(maps):
    worst = max(m['registration']['footprintsCrossedByCentreline'] for m in maps)
    nb = max(v['crossed'] for m in maps for v in m['registrationSensitivity1px'].values())
    bad = [m['map'] for m in maps if m['registration']['footprintsCrossedByCentreline'] > 2]
    return not bad, (f"footprints crossed by a centreline at the registered offset: max {worst} over {len(maps)} maps; "
                     f"at the +-1 px neighbours max {nb}" + (f'; over 2: {bad}' if bad else ''))


def parse_paths_stats_md(path):
    tables, cur = [], None
    for line in open(path, encoding='utf-8').read().split('\n'):
        if line.startswith('| map |'):
            cur = {'header': line, 'rows': {}}
            tables.append(cur)
        elif line.startswith('|---') or not line.startswith('|'):
            continue
        elif cur is not None:
            cur['rows'][line.split(' | ')[0]] = line
    return tables


def check_t1_plan(t1_slim, path=PATHS_STATS_MD):
    """paths_stats' four tables rebuilt from the plan-seed MeasureInput files equal W-04's paths-stats.md, map by map"""
    lines = t1_tables(t1_slim)
    mine, cur = [], None
    for line in lines:
        if line.startswith('| map |'):
            cur = {'header': line, 'rows': {}}
            mine.append(cur)
        elif not line.startswith('|---'):
            cur['rows'][line.split(' | ')[0]] = line
    want = parse_paths_stats_md(path)
    bad = []
    if len(mine) != len(want):
        bad.append(f'{len(mine)} tables vs {len(want)}')
    for ti, (a, b) in enumerate(zip(mine, want)):
        if a['header'] != b['header']:
            bad.append(f'table {ti} header')
        for key, row in a['rows'].items():
            if b['rows'].get(key) != row:
                bad.append(f'table {ti} row {key[:60]}')
    n = sum(len(t['rows']) for t in mine)
    return not bad, (f'{n} rows ({len(t1_slim)} maps x {len(mine)} tables) and {len(mine)} headers byte-identical to '
                     f'{os.path.relpath(path, ROOT)}' if not bad else '; '.join(bad[:5]))


def _segx(p1, p2, p3, p4):
    def o(a, b, c):
        v = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
        return (v > 0) - (v < 0)

    def on(a, b, c):
        return min(a[0], b[0]) <= c[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= c[1] <= max(a[1], b[1])
    d1, d2, d3, d4 = o(p3, p4, p1), o(p3, p4, p2), o(p1, p2, p3), o(p1, p2, p4)
    if d1 != d2 and d3 != d4:
        return True
    return any(d == 0 and on(*s) for d, s in ((d1, (p3, p4, p1)), (d2, (p3, p4, p2)), (d3, (p1, p2, p3)), (d4, (p1, p2, p4))))


def check_hoods(doc):
    """plan section 7b's research-side checks on the hood records: integer ids and cm, closed simple rings, the strings'
    patterns (V12 section 3.3 C2), referenceBuild on every hood (N-02), the cm ring's area equal to the hull's"""
    import re
    bad = []
    hoods = doc['hoods']
    if [h['id'] for h in hoods] != list(range(len(hoods))):
        bad.append('ids not 0..n-1')
    for h, sc_ in zip(hoods, doc['researchSidecar']):
        r = h['outlineCm']
        if not all(isinstance(v, int) and not isinstance(v, bool) for q in r for v in q) or not all(len(q) == 2 for q in r):
            bad.append(f"hood {h['id']}: a non-integer coordinate")
            continue
        if len(r) < 4 or r[0] != r[-1]:
            bad.append(f"hood {h['id']}: ring not closed")
            continue
        P = r[:-1]
        n = len(P)
        if len({tuple(q) for q in P}) != n:
            bad.append(f"hood {h['id']}: repeated vertex")
        E = [(P[i], P[(i + 1) % n]) for i in range(n)]
        for i in range(n):
            for j in range(i + 1, n):
                if j == i + 1 or (i == 0 and j == n - 1):
                    continue
                if _segx(E[i][0], E[i][1], E[j][0], E[j][1]):
                    bad.append(f"hood {h['id']}: edges {i} and {j} cross")
        a_cm = abs(sarea([tuple(q) for q in P])) / 1e4
        if abs(a_cm - sc_['areaM2Declared']) > 1e-3 * sc_['areaM2Declared']:
            bad.append(f"hood {h['id']}: cm area {a_cm:.1f} vs {sc_['areaM2Declared']:.1f} m2")
        if h.get('referenceBuild') != REFERENCE_BUILD or not re.match(C2_BUILD, h['referenceBuild']):
            bad.append(f"hood {h['id']}: referenceBuild")
        if not re.match(C2_LABEL, h['seedLabel']) or not re.match(C2_CAPTURE, h['capture']):
            bad.append(f"hood {h['id']}: a string outside C2's patterns")
        if h['template'] not in TEMPLATES or set(h) != {'id', 'referenceBuild', 'template', 'seedLabel', 'capture', 'outlineCm'}:
            bad.append(f"hood {h['id']}: template or fields")
    return not bad, (f'{len(hoods)} hoods: integer ids 0..{len(hoods) - 1}, integer cm, closed simple rings, '
                     f'cm area = hull area within 0.1 %, C2 patterns, referenceBuild on each' if not bad else '; '.join(bad[:5]))


# ---------------------------------------------------------------- aggregation
def _pick(m, path):
    x = m
    for k in path:
        if x is None:
            return None
        x = x.get(k) if isinstance(x, dict) else None
    return x


def estimate(vals):
    """V12 section 3.5.1's estimators over per-seed statistics (W-15 re-forms the rows; this is the measured summary)"""
    v = [x for x in vals if x is not None]
    n = len(v)
    if n == 0:
        return {'n': 0}
    if n == 1:
        return {'n': 1, 'estimator': 'single', 'a': v[0], 'b': v[0], 'c': v[0]}
    if n < 10:
        return {'n': n, 'estimator': 'minmax', 'a': min(v), 'b': max(v), 'c': q7(v, .5)}
    return {'n': n, 'estimator': 'type7', 'a': q7(v, .1), 'b': q7(v, .9), 'c': q7(v, .5)}


def ks_binned(h1, h2):
    def cdf(h):
        c = ([h['underflow']] if 'underflow' in h else []) + h['bins'] + ([h['overflow']] if 'overflow' in h else [])
        n = sum(c)
        acc, out = 0, []
        for x in c:
            acc += x
            out.append(acc / n)
        return out
    return max(abs(a - b) for a, b in zip(cdf(h1), cdf(h2)))


def ks_raw(x, y):
    x, y = sorted(x), sorted(y)
    i = j = 0
    d = 0.0
    while i < len(x) and j < len(y):
        v = min(x[i], y[j])
        while i < len(x) and x[i] == v:
            i += 1
        while j < len(y) and y[j] == v:
            j += 1
        d = max(d, abs(i / len(x) - j / len(y)))
    return d


def spread_ks(hists, raws):
    pairs = [(i, j) for i in range(len(hists)) for j in range(i + 1, len(hists))]
    kb = [ks_binned(hists[i], hists[j]) for i, j in pairs]
    kr = [ks_raw(raws[i], raws[j]) for i, j in pairs]
    return {'pairs': len(pairs), 'binned': {'p90': q7(kb, .9) if kb else None, 'values': kb},
            'rawEcdf': {'p90': q7(kr, .9) if kr else None, 'values': kr},
            'rule': 'V12 section 3.5.3: p90 (type 7) of the two-sample KS distances over the n(n-1)/2 seed pairs (n = 2: the '
                    'one value); binned = on the CDFs at the catalogue edges (V12 section 3.4.2), underflow and overflow included'}


SCALAR_SPEC = [
    # metric id, per-seed statistic, companions (name, path), deliverable
    ('bldg.pairing', ('bldg.pairing', 'share'), [('readingA', ('bldg.pairing', 'readingA_share')), ('mutual', ('bldg.pairing', 'mutualShare'))], 'D2'),
    ('street.detour', ('street.detour', 'median'), [('allPairsMedian', ('street.detour', 'allPairsMedian')), ('pairs', ('street.detour', 'n')),
                                                    ('eligiblePairs', ('street.detour', 'eligiblePairs'))], 'D4'),
    ('junction.share4', ('junction.share4', 'share'), [('mergedDeg4', ('junction.share4', 'deg4')), ('deg3plus', ('junction.share4', 'deg3plus')),
                                                       ('rawDeg4', ('junctionCensus', 'rawDegree', '4')),
                                                       ('deg4FromTwoEndOn', ('junctionCensus', 'deg4FromTwoEndOn'))], 'D4'),
    ('street.cyclesPerKm2', ('street.cyclesPerKm2', 'value_declared'), [('cycles', ('street.cyclesPerKm2', 'cycles')),
                                                                        ('hullM2_declared', ('street.cyclesPerKm2', 'hullM2_declared')),
                                                                        ('footprintHull', ('street.cyclesPerKm2', 'footprintHull', 'value_declared'))], 'D4'),
    ('fg.streetwallGap100', ('fg.streetwallGap100', 'value_declared'), [('gapLengthPer100m_m', ('fg.streetwallGap100', 'gapLengthPer100m_declared_m')),
                                                                        ('band0.75', ('fg.streetwallGap100', 'byBandDepthRelShort', '0.75', 'gapsOver2mPer100m_declared')),
                                                                        ('band1.25', ('fg.streetwallGap100', 'byBandDepthRelShort', '1.25', 'gapsOver2mPer100m_declared'))], 'D4'),
    ('block.courtShare', ('block.courtShare', 'share'), [('courtDeep', ('block.courtShare', 'courtDeep')), ('deep', ('block.courtShare', 'deep')),
                                                         ('courtShallow', ('block.courtShare', 'courtShallow'))], 'D5'),
    ('block.countTemplate', ('block.countTemplate', 'built'), [('bounded', ('block.countTemplate', 'bounded')),
                                                               ('footprintsInNoBlockShare', ('block.countTemplate', 'footprintsInNoBlockShare'))], 'D15'),
    ('junction.angles.median', ('junction.angles', 'median'), [('arms', ('junction.angles', 'n'))], 'D27'),
    ('junction.angles.p5', ('junction.angles', 'p5'), [], 'D27'),
    ('bldg.partyShare', ('bldg.partyShare', 'median'), [('pooledLengthShare', ('bldg.partyShare', 'pooledLengthShare')),
                                                        ('legacySharedWallLengthShare', ('legacy', 'sharedWallLengthShare'))], 'D27'),
    ('bldg.attached', ('bldg.attached', 'share'), [('adjacencyMinimum', ('bldg.attached', 'shareAdjacencyMinimum')),
                                                   ('legacySharedWallAny', ('legacy', 'sharedWallAny'))], 'D27'),
    ('plot.moran', ('plot.moran', 'value'), [('legacyK8', ('legacy', 'moranK8'))], 'D27'),
    ('plot.cvDistrict', ('plot.cvDistrict', 'value'), [('plots', ('plot.cvDistrict', 'plots')), ('legacyAreaCV', ('legacy', 'areaCV'))], 'D27/D35'),
]
DIST_SPEC = [
    # metric id, binned histogram path, raw values path, per-seed quantile path, deliverable, role
    ('block.area', ('block.area', 'hist_m2_declared'), ('block.area', 'values_m2_declared'), ('block.area', 'm2_declared'), 'D15', 'target'),
    ('block.areaRel', ('block.areaRel', 'hist'), ('block.areaRel', 'values'), ('block.areaRel', 'q'), 'D15', 'descriptive'),
    ('plot.minWidth', ('plot.minWidth', 'hist_m_declared'), ('plot.minWidth', 'values_m_declared'), ('plot.minWidth', 'm_declared'), 'D4', 'target'),
]


def sum_hist(hs):
    out = {'edges': hs[0]['edges'], 'bins': [sum(h['bins'][i] for h in hs) for i in range(len(hs[0]['bins']))]}
    for k in ('underflow', 'overflow'):
        if k in hs[0]:
            out[k] = sum(h[k] for h in hs)
    return out


def aggregate(group, label, fams_in):
    """one sample (a family, or the pooled medium families): per-seed values in plan order and the summaries"""
    sample = {'families': fams_in, 'labels': [d['planLabel'] for d, _ in group], 'captures': [d['capture'] for d, _ in group],
              'indices': sorted({d['planIndex'] for d, _ in group}), 'usable': len(group), 'failed': []}
    if len(fams_in) == 1:
        sample['family'] = fams_in[0]
        sample['indices'] = [0, len(group)]
    out = {'sample': sample, 'scalars': {}, 'distributions': {}}
    for mid, path, comps, dl in SCALAR_SPEC:
        vals = [_pick(m, path) for _, m in group]
        out['scalars'][mid] = {'deliverable': dl, 'perSeed': vals, 'estimate': estimate(vals),
                               'companions': {name: [_pick(m, p) for _, m in group] for name, p in comps}}
    cd = [_pick(m, ('block.courtShare', 'courtDeep')) for _, m in group]
    dp = [_pick(m, ('block.courtShare', 'deep')) for _, m in group]
    out['scalars']['block.courtShare']['countPooled'] = {'courtDeep': sum(cd), 'deep': sum(dp), 'share': sum(cd) / sum(dp) if sum(dp) else None}
    for mid, hp, rp, qp, dl, role in DIST_SPEC:
        hs = [_pick(m, hp) for _, m in group]
        rs = [_pick(m, rp) for _, m in group]
        out['distributions'][mid] = {'deliverable': dl, 'role': role, 'perSeed': [_pick(m, qp) for _, m in group],
                                     'perSeedMedian': estimate([_pick(m, qp + ('p50',)) for _, m in group]),
                                     'pooledHist': sum_hist(hs), 'spreadKS': spread_ks(hs, rs)}
    return out


def minor_extent(group):
    rel = [x for _, m in group for x in m['blockMinorExtent']['values_rel']]
    mm = [x for _, m in group for x in m['blockMinorExtent']['values_m_declared']]
    return {'sample': {'labels': [d['planLabel'] for d, _ in group], 'captures': [d['capture'] for d, _ in group],
                       'indices': [0, len(group)], 'usable': len(group), 'failed': []},
            'perSeed': [{'rel': m['blockMinorExtent']['rel'], 'm_declared': m['blockMinorExtent']['m_declared'],
                         'medianFootprintShortMu': m['medianFootprintShortMu'], 'footprints': m['footprints'],
                         'built': m['block.countTemplate']['built']} for _, m in group],
            'pooled': {'rel': qs(rel), 'm_declared': qs(mm)},
            'blockAreaM2Declared': qs([x for _, m in group for x in m['block.area']['values_m2_declared']]),
            'footprintFrontage': [m['footprintFrontage'] for _, m in group]}


def _f(x, n=3):
    return '-' if x is None else f'{x:.{n}f}'


def main_plan(args):
    import concurrent.futures
    opt = {}
    for key in ('--inputs', '--json', '--hoods', '--jobs'):
        if key in args:
            i = args.index(key)
            opt[key] = args[i + 1]
            del args[i:i + 2]
    inputs = opt.get('--inputs', PLAN_INPUTS)
    if '--red' in args:
        return red_tests(inputs)
    jobs = int(opt.get('--jobs', 2))
    fams, ents = plan_ng_entries()
    idx = json.load(open(os.path.join(inputs, 'index.json')))
    paths = [os.path.join(inputs, e['file']) for e in idx['maps']]
    res = []
    with concurrent.futures.ProcessPoolExecutor(max_workers=jobs) as ex:
        for k, r in enumerate(ex.map(_plan_worker, paths)):
            d, m, _ = r
            res.append(r)
            print(f"[{k + 1}/{len(paths)}] {d['planLabel']} {d['capture']}: crossed {m['registration']['footprintsCrossedByCentreline']} "
                  f"pairing {_f(m['bldg.pairing']['share'])} share4 {_f(m['junction.share4']['share'])} detour {_f(m['street.detour']['median'])} "
                  f"cyc/km2 {_f(m['street.cyclesPerKm2']['value_declared'], 1)} built {m['block.countTemplate']['built']} "
                  f"court {m['block.courtShare']['courtDeep']}/{m['block.courtShare']['deep']} gaps {_f(m['fg.streetwallGap100']['value_declared'], 2)} "
                  f"cv {_f(m['plot.cvDistrict']['value'])}", flush=True)
    idents = [r[0] for r in res]
    maps = [r[1] for r in res]
    t1_slim = [r[2] for r in res]
    # ---- checks
    checks = []
    checks.append(('identity: each map is its plan entry (label, seed, folder, header with the declared scale)',) + check_identity(ents, idents))
    checks.append(("samples: every family's indices [0, n) (medium [0, 5), small / large [0, 3)); failed none",) + check_samples(fams, idents))
    checks.append(('registration: footprints crossed by a road centreline <= 2 on every map (+-1 px neighbours reported)',) + check_registration(maps))
    for d, m in zip(idents, maps):
        c = d['census']
        ok = m['wayGraph']['cyclesEminusVplusC'] == c['faces'] - c['components'] and \
            (m['wayGraph']['nodes'], m['wayGraph']['edges'], m['wayGraph']['components']) == (c['nodes'], c['edges'], c['components'])
        fa = m['block.countTemplate']
        ok2 = fa['footprintsInBlocks'] + fa['footprintsInNoBlock'] == m['footprints']
        if not (ok and ok2):
            checks.append((f"{d['planLabel']} graph / Euler / footprints once", False, f"{m['wayGraph']} vs {c}; {fa}"))
    checks.append(("graph: Euler E - V + C = faces - components, the way graph equals the adapter's, footprints counted once (every map)",
                   not any(not c[1] for c in checks[3:]), f'{len(maps)} / {len(maps)}'))
    checks.append(("T1 on the plan seeds: paths_stats' tables from the MeasureInput files equal W-04's paths-stats.md",) + check_t1_plan(t1_slim))
    sha_ok = all(d['inputSha256'] == e['sha256'] for d, e in zip(idents, idx['maps']))
    checks.append(('inputs: each MeasureInput file equals its sha256 in the adapter index', sha_ok, f"{len(idents)} files"))
    # ---- hood outlines (plan section 7b hoods[], R-08)
    med = [(d, m) for d, m in zip(idents, maps) if d['size'] == 'medium']
    hoods = {'schema': 'research.ng-faces-hoods/1', 'lane': PLAN_LANE, 'script': SCRIPT,
             'for': "plan section 7b's hoods[] of plat.ng-faces/1; W-10b adds faces[] (its hood ids are these) and W-15 / W-20 assemble the file",
             'referenceBuild': REFERENCE_BUILD, 'scaleDeclared': {'mPerModelUnit': M_PER_MU}, 'outlineKind': 1,
             'frame': 'the registered road frame of adapters/ng.py --plan: cm = road-canvas px / ctmScale x 0.35 x 100, rounded half '
                      'to even; rings closed (first vertex repeated); hull of every drawn road and footprint vertex (R-08)',
             'hoods': [], 'researchSidecar': []}
    for hid, (d, m) in enumerate(med):
        hoods['hoods'].append({'id': hid, 'referenceBuild': REFERENCE_BUILD, 'template': d['template'], 'seedLabel': d['planLabel'],
                               'capture': d['capture'], 'outlineCm': m['hoodOutline']['outlineCm']})
        hoods['researchSidecar'].append({'id': hid, 'input': d['input'], 'inputSha256': d['inputSha256'], 'ctmScale': d['ctmScale'],
                                         'cmPerPx': m['hoodOutline']['cmPerPx'], 'areaM2Declared': m['hoodOutline']['areaM2_declared'],
                                         'vertices': m['hoodOutline']['vertices']})
    checks.append(("hoods: plan section 7b's research-side checks on the 20 hood outlines",) + check_hoods(hoods))
    # ---- aggregation
    by_fam = collections.OrderedDict()
    for d, m in zip(idents, maps):
        by_fam.setdefault(d['planFamily'], []).append((d, m))
    medium = collections.OrderedDict()
    for t in TEMPLATES:
        fam = f'capture/NG/{t}/medium'
        medium[t] = aggregate(by_fam[fam], t, [fam])
    pooled = aggregate([x for t in TEMPLATES for x in by_fam[f'capture/NG/{t}/medium']], 'pooled', [f'capture/NG/{t}/medium' for t in TEMPLATES])
    pooled['scalars']['block.courtShare']['r19Median20'] = q7([v for v in pooled['scalars']['block.courtShare']['perSeed'] if v is not None], .5)
    sweep = collections.OrderedDict()
    for f in fams:
        sweep[f['family']] = minor_extent(by_fam[f['family']])
    reg = [{'label': d['planLabel'], 'capture': d['capture'], 'shift': d['registration']['shiftFootprintsToRoadFrame'],
            'footprintHit': d['fpHit'], 'footprintHit1px': d['fpHit1px'], 'roadHit': d['roadHit'], 'roadHit1px': d['roadHit1px'],
            'crossed': m['registration']['footprintsCrossedByCentreline'],
            'neighbours1px': m['registrationSensitivity1px'],
            'builtEqualAtNeighbours': all(v['built'] == m['block.countTemplate']['built'] for v in m['registrationSensitivity1px'].values()),
            'courtShareMaxDelta': max((abs(v['courtShare'] - m['block.courtShare']['share'])
                                       if v['courtShare'] is not None and m['block.courtShare']['share'] is not None else 0.0)
                                      for v in m['registrationSensitivity1px'].values()),
            'gapsMaxDelta': max((abs(v['gapsDeclared'] - m['fg.streetwallGap100']['value_declared'])
                                 if v['gapsDeclared'] is not None and m['fg.streetwallGap100']['value_declared'] is not None else 0.0)
                                for v in m['registrationSensitivity1px'].values()),
            'nullAtNeighbours': sorted({k for k, v in m['registrationSensitivity1px'].items()
                                        if (v['gapsDeclared'] is None) != (m['fg.streetwallGap100']['value_declared'] is None)
                                        or (v['courtShare'] is None) != (m['block.courtShare']['share'] is None)})}
           for d, m in zip(idents, maps)]
    allok = all(c[1] for c in checks)
    for name, ok, note in checks:
        print(('PASS ' if ok else 'FAIL ') + name + ' -- ' + note)
    doc = {
        'schema': 'm1.E11b/1', 'lane': PLAN_LANE, 'script': SCRIPT, 'adapter': 'research:baselines/adapters/ng.py --plan',
        'referenceBuild': REFERENCE_BUILD, 'inputs': os.path.relpath(inputs, ROOT), 'inputsIndexSha256':
            hashlib.sha256(open(os.path.join(inputs, 'index.json'), 'rb').read()).hexdigest(),
        'status': 'measured values for W-15 (R-47 (a)): rows are formed at W-15, not here',
        'scaleRule': {'scale': 'declared', 'mPerModelUnit': M_PER_MU, 'rule': 'R-01; the input header scale declared with unitM (DC-01)',
                      'rowNote': 'declared 0.35 m per model unit (own)'},
        'rulingsApplied': {'R-01': 'declared scale; block.areaRel edges 0.5 x 1000^(i/24), i = 0..24, underflow and overflow',
                           'R-05': 'bldg.pairing reading B; A and the mutual share as companions',
                           'R-06': 'junction.share4 merged within 2 m (declared); the raw degree-4 count as a companion',
                           'R-07': 'fg.streetwallGap100 rays every 5 % of the median short side, walled within 1.0 x it; bands 0.75 and 1.25 beside',
                           'R-08': 'bounded built faces; the built outline and the hood outline = convex hull of every drawn road and footprint vertex; E11 footprint-only hull beside',
                           'R-23': 'plot.cvDistrict = the hood footprint-area CV (population sd / mean; >= 30 plots)',
                           'R-03': 'every value on the formula seeds; the 2026-09-25 captures are fixtures only (E11-ng-rows.json)',
                           'R-19': 'block.courtShare pooled: the type-7 median over the 20 medium hoods (r19Median20) and the count ratio',
                           'R-44': 'time.model (NG) descriptive in C-0116 form: values.n 0, reason contended (W-04 per-generation wall times '
                                   'were taken while M0 build seats shared the machine, E04 section 4 (5)); no value here',
                           'R-47 (d)': 'spreadKS.p90 per template subset on block.area (and block.areaRel, plot.minWidth)'},
        'declared': {'catalogueEdges': {'block.area': 'm2 declared, 50 x 1000^(i/24), i = 0..24, underflow and overflow (V12 section 3.4.2)',
                                        'plot.minWidth': 'm declared, 0.25 m bins to 30 m with overflow (V12 section 3.4.2)'},
                     'hoodOutline': hoods['frame'], 'cvDistrict': 'population standard deviation (ddof 0), as the legacy script',
                     'quantiles': 'type 7', 'estimators': 'V12 section 3.5.1 (minmax at 2-9 seeds, type7 at >= 10); W-15 re-forms them'},
        'timeModel': {'metric': 'time.model', 'reference': 'NG', 'role': 'descriptive', 'values': {'n': 0}, 'sampleFailedReason': 'contended',
                      'note': 'R-21 / R-44: descriptive unless W-21 (owner-gated) runs; the 2026-09-21 profile totals stay fixture values (E11 section 7)'},
        'checks': [{'check': c[0], 'pass': c[1], 'receipt': c[2]} for c in checks],
        'medium': medium, 'mediumPooled': pooled, 'sizeSweepD3': sweep, 'registration': reg,
        'maps': [dict(m, plan={'label': d['planLabel'], 'family': d['planFamily'], 'index': d['planIndex'], 'input': d['input'],
                               'inputSha256': d['inputSha256']}) for d, m in zip(idents, maps)],
    }
    out = opt.get('--json', OUT_PLAN_JSON)
    with open(out, 'w') as fh:
        json.dump(doc, fh, indent=1)
        fh.write('\n')
    hout = opt.get('--hoods', OUT_HOODS)
    os.makedirs(os.path.dirname(hout), exist_ok=True)
    with open(hout, 'w') as fh:
        json.dump(hoods, fh, indent=1)
        fh.write('\n')
    print('CHECKER', 'PASS' if allok else 'FAIL')
    if '--check' in args and not allok:
        sys.exit(1)


def red_tests(inputs):
    """each plan-mode check fed a planted fault must fail"""
    import copy
    fams, ents = plan_ng_entries()
    idx = json.load(open(os.path.join(inputs, 'index.json')))
    e0 = idx['maps'][0]
    M = load(os.path.join(inputs, e0['file']))
    results = []
    # (1) registration: footprints moved 20 px (an unregistered input) -> crossed > 2
    blds = M['buildings']
    areas = [abs(sarea(p)) for p in blds]
    med_area, med_short = q7(areas, .5), q7([obb_and_minwidth(p)[1] for p in blds], .5)
    px_per_m = M['sc'] / M_PER_MU
    moved = [[(x + 20, y) for x, y in p] for p in blds]
    c_ok = cross_layer(M, blds, med_area, med_short, px_per_m, detail=False)['crossedFootprints']
    c_bad = cross_layer(M, moved, med_area, med_short, px_per_m, detail=False)['crossedFootprints']
    fake = [{'map': 'red', 'registration': {'footprintsCrossedByCentreline': c_bad}, 'registrationSensitivity1px': {'0,0': {'crossed': c_bad}}}]
    results.append(('registration check red on a 20 px shift', not check_registration(fake)[0], f'crossed {c_ok} registered, {c_bad} shifted'))
    # (2) samples: one medium index missing -> red
    idents = [{'planFamily': e['family'], 'planIndex': e['i']} for e in ents if not (e['family'] == 'capture/NG/area/medium' and e['i'] == 4)]
    results.append(('sample check red on a missing index 4', not check_samples(fams, idents)[0], check_samples(fams, idents)[1][:120]))
    # (3) identity: a wrong seedLabel in the header -> red
    d = {'planLabel': e0['label'], 'seed': e0['seed'], 'capture': os.path.basename(e0['capture']), 'template': e0['template'],
         'size': e0['size'], 'planIndex': e0['i'], 'planFamily': e0['family'], 'ctmScale': M['sc'],
         'header': dict(M['mi']['header'], seedLabel='capture/NG/area/medium/1')}
    results.append(('identity check red on a wrong seedLabel', not check_identity(ents[:1], [d])[0], check_identity(ents[:1], [d])[1][:120]))
    d_ok = dict(d, header=M['mi']['header'])
    results.append(('identity check green on the true header (control)', check_identity(ents[:1], [d_ok])[0], ''))
    # (4) T1: one footprint vertex moved 0.5 px -> the lot row differs from paths-stats.md
    A = t1_analyse(M)
    A['summary'] = t1_summary(A)
    ok_true = check_t1_plan([{'label': A['label'], 'file': A['file'], 'summary': A['summary']}])
    M2 = dict(M, plots=copy.deepcopy(M['plots']))
    p0 = M2['plots'][0]
    p0[0] = (p0[0][0] + 0.5, p0[0][1])
    A2 = t1_analyse(M2)
    A2['summary'] = t1_summary(A2)
    ok_bad = check_t1_plan([{'label': A2['label'], 'file': A2['file'], 'summary': A2['summary']}])
    results.append(('T1 check green on the true map (control)', ok_true[0], ok_true[1][:120]))
    results.append(('T1 check red on a footprint vertex moved 0.5 px', not ok_bad[0], ok_bad[1][:160]))
    # (5) hoods: a self-crossing ring and a float coordinate -> red
    ring = [[0, 0], [1000, 0], [1000, 1000], [0, 1000], [0, 0]]
    good = {'hoods': [{'id': 0, 'referenceBuild': REFERENCE_BUILD, 'template': 'area', 'seedLabel': 'capture/NG/area/medium/0',
                       'capture': '2026-10-03T19-05-32', 'outlineCm': ring}], 'researchSidecar': [{'areaM2Declared': 100.0}]}
    bow = copy.deepcopy(good)
    bow['hoods'][0]['outlineCm'] = [[0, 0], [1000, 1000], [1000, 0], [0, 1000], [0, 0]]
    bow['researchSidecar'][0]['areaM2Declared'] = 0.0
    flt = copy.deepcopy(good)
    flt['hoods'][0]['outlineCm'][1] = [1000.5, 0]
    nob = copy.deepcopy(good)
    del nob['hoods'][0]['referenceBuild']
    results.append(('hood check green on a square (control)', check_hoods(good)[0], check_hoods(good)[1][:100]))
    results.append(('hood check red on a self-crossing ring', not check_hoods(bow)[0], check_hoods(bow)[1][:100]))
    results.append(('hood check red on a non-integer coordinate', not check_hoods(flt)[0], check_hoods(flt)[1][:100]))
    results.append(('hood check red without referenceBuild (N-02)', not check_hoods(nob)[0], check_hoods(nob)[1][:100]))
    for name, ok, note in results:
        print(('PASS ' if ok else 'FAIL ') + name + (' -- ' + note if note else ''))
    allok = all(r[1] for r in results)
    print('RED TESTS', 'PASS' if allok else 'FAIL')
    sys.exit(0 if allok else 1)


if __name__ == '__main__':
    main()
