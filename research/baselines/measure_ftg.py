#!/usr/bin/env python3
"""research/baselines/measure_ftg.py -- FTG payload metrics by V12 section 3.4.2 (M-1 work item W-05: D14, D25, D26 and
FTG's share of D16).

Lane m1/W-05 (docs/calibration/M-1-plan.md section 2, row W-05; record docs/calibration/E05-ftg-metrics.md). Research
side only; our own code, standard library plus PIL (installed). Two parts:

  TWIN     re-derives, through adapters/ftg.py's decoder, the numbers the existing scripts printed (roadlength100's
           length_precision.out.txt compared line for line; the payload counts; _critic-ftg.md section 4 rows 1, 2,
           7-12, 18-20; the wall probe's tower spacing; the plot census's wall crossings and shared-wall shares;
           ftg_anisotropy.out's outline numbers; the server times), each against its recorded value.
  METRICS  every FTG metric of the row on the MeasureInput file adapters/ftg.py wrote (the file is what M1's
           `plat measure` will re-run, T-V12-3): street.turn100, street.stepHist, street.entropy50, junction.angles,
           junction.share4, street.runs, bldg.area, bldg.quadSide, bldg.worstCorner, bldg.partyShare, bldg.attached,
           wall.towerSpacing, wall.ungated, gate.count, water.step, water.riverWidth, tree.nnP1, tree.nnMedian,
           tree.pcf, pop.perBuilding, time.model, outline.r90cv, outline.roadRatio, wealth.tier1..6 and the variety
           signature vector (operational definitions proposed in E05 section 6).

Usage (project root):
  python3 research/baselines/measure_ftg.py [--check] [--red] [--json OUT] [CAPTURE_STAMP ...]
    default captures: the two CITY payloads (2026-09-21T05-23-58, 2026-09-25T10-13-51)
    --check  exit 1 unless every twin check passes; --red flips one expectation (the checker must then fail)
    --json   write the numbers (default docs/calibration/E05-ftg-metrics.json)
Writes nothing else. Prints the report on stdout.
"""
import bisect
import collections
import json
import math
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(HERE, 'adapters'))
import ftg as A  # noqa: E402

SCRIPT = 'research:baselines/measure_ftg.py'
JSON_DEFAULT = os.path.join(ROOT, 'docs', 'calibration', 'E05-ftg-metrics.json')
LP_OUT = os.path.join(ROOT, 'research', 'ftg-capture', 'roadlength100', 'length_precision.out.txt')
LABEL = {'2026-09-21T05-23-58': 'galeiaward-rl60', '2026-09-25T10-13-51': 'nevervalley-rl100'}   # the scripts' labels
STEP_M = 10.0          # V12: curves resampled at 10 m arc steps
WIN_STEPS = 5          # 50 m windows
JUNCTION_MERGE_M = 2.0
ARM_M = 10.0
PARTY_M = 0.3
CLUSTER_GAP_M = 1.0
CLOSE_M = 3.0
RASTER_M = 0.5
PCF_C = 0.15           # Stoyan and Stoyan's bandwidth constant: h = c / sqrt(lambda)


# ---------------------------------------------------------------- small statistics
def q7(v, p):
    """Hyndman and Fan type 7"""
    s = sorted(v)
    if not s:
        return None
    h = (len(s) - 1) * p
    lo = int(math.floor(h))
    hi = min(lo + 1, len(s) - 1)
    return s[lo] + (h - lo) * (s[hi] - s[lo])


def wmedian(pairs):
    """lower weighted median of (value, weight)"""
    pairs = sorted(pairs)
    tot = sum(w for _, w in pairs)
    acc = 0.0
    for v, w in pairs:
        acc += w
        if acc >= tot / 2.0:
            return v
    return None


def wrap180(d):
    d = (d + 180.0) % 360.0 - 180.0
    return d


def r3(x, n=4):
    return None if x is None else round(x, n)


# ---------------------------------------------------------------- geometry
def dist(a, b):
    return math.hypot(a[0] - b[0], a[1] - b[1])


def seg_dist(p, a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]
    L2 = dx * dx + dy * dy
    if L2 == 0:
        return dist(p, a)
    t = max(0.0, min(1.0, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2))
    return math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))


def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])


def proper_x(a, b, c, d, eps=1e-9):
    d1, d2, d3, d4 = cross(a, b, c), cross(a, b, d), cross(c, d, a), cross(c, d, b)
    return ((d1 > eps and d2 < -eps) or (d1 < -eps and d2 > eps)) and ((d3 > eps and d4 < -eps) or (d3 < -eps and d4 > eps))


def inside_eps(pt, poly):
    """the scripts' even-odd test (with their 1e-12 guard)"""
    x, y = pt
    c = False
    for i in range(len(poly)):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % len(poly)]
        if ((y1 > y) != (y2 > y)) and (x < (x2 - x1) * (y - y1) / (y2 - y1 + 1e-12) + x1):
            c = not c
    return c


def inside(pt, poly):
    x, y = pt
    c = False
    n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            c = not c
    return c


def sarea(p):
    return A.sarea(p)


def ring_open(coords):
    c = [tuple(x) for x in coords]
    return c[:-1] if len(c) > 1 and c[0] == c[-1] else c


def strip_close(P):
    return P[:-1] if len(P) > 1 and P[0] == P[-1] else P


def polyline_len(c):
    return sum(dist(c[i], c[i + 1]) for i in range(len(c) - 1))


def resample(c, step=STEP_M):
    """points at arc length 0, step, 2 step, ... and the end point (when the remainder exceeds 1e-6 m)"""
    out = [tuple(c[0])]
    acc = 0.0           # arc length at c[i]
    nxt = step
    for i in range(len(c) - 1):
        a, b = c[i], c[i + 1]
        L = dist(a, b)
        while L > 0 and nxt <= acc + L + 1e-9:
            t = (nxt - acc) / L
            out.append((a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])))
            nxt += step
        acc += L
    if acc - (nxt - step) > 1e-6:
        out.append(tuple(c[-1]))
    return out, acc


def headings(pts):
    return [math.degrees(math.atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0])) for i in range(len(pts) - 1)]


class Grid:
    def __init__(self, cell):
        self.cell = cell
        self.g = collections.defaultdict(list)

    def add_box(self, k, x0, y0, x1, y1):
        c = self.cell
        for gx in range(int(math.floor(x0 / c)), int(math.floor(x1 / c)) + 1):
            for gy in range(int(math.floor(y0 / c)), int(math.floor(y1 / c)) + 1):
                self.g[(gx, gy)].append(k)

    def query_box(self, x0, y0, x1, y1):
        c = self.cell
        seen = set()
        for gx in range(int(math.floor(x0 / c)), int(math.floor(x1 / c)) + 1):
            for gy in range(int(math.floor(y0 / c)), int(math.floor(y1 / c)) + 1):
                for k in self.g.get((gx, gy), ()):
                    if k not in seen:
                        seen.add(k)
                        yield k


def bbox(P):
    return (min(p[0] for p in P), min(p[1] for p in P), max(p[0] for p in P), max(p[1] for p in P))


# ================================================================ TWIN (the existing scripts' numbers)
def twin_length_precision(label, D):
    """roadlength100/length_precision.py's computation on adapters/ftg.decode's output; returns its printed lines
    except the '===' header line (which carries the settlement name)"""
    N = D['nodes']
    E = [(a, b, t) for (_, a, b, t) in D['edges']]
    rings = [strip_close(dd['rings'][0][0]) for dd in D['districts']]

    def zone(p):
        return 'in' if any(inside_eps(p, P) for P in rings) else 'out'

    def q(v, f):
        s = sorted(v)
        return s[min(len(s) - 1, int(f * len(s)))]
    WINDOWS = [(14, 16), (24, 26.5), (29, 31.5), (49, 51.5), (59, 62), (99, 101.5)]
    out = ['  per (type, zone) and length window: n, min / p10 / p50 / p90 / max (m)']
    groups = collections.defaultdict(list)
    for a, b, t in E:
        pa, pb = N[a], N[b]
        L = math.dist(pa, pb) / 100
        groups[(t, zone(((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2)))].append(L)
    for (t, z) in sorted(groups):
        if t not in (0, 1, 4):
            continue
        for lo, hi in WINDOWS:
            v = [x for x in groups[(t, z)] if lo <= x <= hi]
            if len(v) >= 3:
                out.append('    type %d %-3s [%5.1f,%5.1f]  n=%4d   %.2f / %.2f / %.2f / %.2f / %.2f' % (
                    t, z, lo, hi, len(v), min(v), q(v, .1), q(v, .5), q(v, .9), max(v)))
    inc = collections.defaultdict(list)
    for i, (a, b, t) in enumerate(E):
        inc[a].append((i, b))
        inc[b].append((i, a))

    def straight_next(node, came_from_edge, t):
        a, b, _ = E[came_from_edge]
        prev = a if b == node else b
        p0, p = N[prev], N[node]
        v1 = (p[0] - p0[0], p[1] - p0[1])
        for j, mm in inc[node]:
            if j == came_from_edge or E[j][2] != t:
                continue
            v2 = (N[mm][0] - p[0], N[mm][1] - p[1])
            if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9:
                continue
            d = abs(math.degrees(math.atan2(v2[1], v2[0]) - math.atan2(v1[1], v1[0]))) % 360
            if d > 180:
                d = 360 - d
            if d < 0.05:
                return j, mm
        return None
    runs_top = {}
    for t in (1, 0):
        seen = set()
        runs = collections.defaultdict(collections.Counter)
        nsplit = collections.defaultdict(collections.Counter)
        for i, (a, b, tt) in enumerate(E):
            if tt != t or i in seen:
                continue
            seen.add(i)
            L = math.dist(N[a], N[b]) / 100
            k = 1
            for start, _ in ((a, b), (b, a)):
                cur_edge, node = i, start
                while True:
                    nx = straight_next(node, cur_edge, t)
                    if not nx or nx[0] in seen:
                        break
                    j, mm = nx
                    seen.add(j)
                    L += math.dist(N[node], N[mm]) / 100
                    k += 1
                    cur_edge, node = j, mm
            z = zone(N[a])
            runs[z][round(L * 2) / 2] += 1
            if k > 1:
                nsplit[z][round(L * 2) / 2] += 1
        for z in ('in', 'out'):
            out.append('  type %d %-3s exact-collinear runs through any node: top lengths %s' % (t, z, runs[z].most_common(8)))
            out.append('               of which made of >=2 edges (split at junctions): %s' % nsplit[z].most_common(8))
            runs_top[(t, z)] = runs[z].most_common(1)[0] if runs[z] else None
    windows = {}
    for (t, z) in groups:
        for lo, hi in WINDOWS:
            v = [x for x in groups[(t, z)] if lo <= x <= hi]
            if len(v) >= 3:
                windows[(t, z, lo)] = (len(v), q(v, .5))
    return out, runs_top, windows


def stored_length_precision():
    """the stored output, split per payload label, without the '===' header lines and the trailing blank lines"""
    blocks, cur = {}, None
    for line in open(LP_OUT).read().split('\n'):
        if line.startswith('=== '):
            cur = line[4:].split(':')[0]
            blocks[cur] = []
            continue
        if cur is not None and line != '':
            blocks[cur].append(line)
    return blocks


def twin_critic_rows(D):
    """_critic-ftg.md section 4 rows 2, 7, 8, 9 (zigzag_rederive.py's computation, every edge type)"""
    N = D['nodes']
    E = D['edges']
    deg = collections.Counter()
    for _, a, b, _t in E:
        deg[a] += 1
        deg[b] += 1
    dh = collections.Counter(deg.get(n, 0) for n in N)
    inc = collections.defaultdict(list)
    for _, a, b, t in E:
        inc[a].append((b, t))
        inc[b].append((a, t))
    per = collections.defaultdict(list)
    for n, lst in inc.items():
        if len(lst) != 2:
            continue
        (n1, t1), (n2, t2) = lst
        p, p1, p2 = N[n], N[n1], N[n2]
        v1 = (p1[0] - p[0], p1[1] - p[1])
        v2 = (p2[0] - p[0], p2[1] - p[1])
        if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9:
            continue
        d = abs(math.degrees(math.atan2(v2[1], v2[0]) - math.atan2(v1[1], v1[0]))) % 360
        if d > 180:
            d = 360 - d
        if t1 == t2:
            per[t1].append(180 - d)
    v0 = [x for x in per[0] if x < 45]
    c0 = collections.Counter(int(x) for x in v0)
    ixa = []
    for n, lst in inc.items():
        if len(lst) < 3:
            continue
        p = N[n]
        angs = sorted(math.degrees(math.atan2(N[mm][1] - p[1], N[mm][0] - p[0])) % 360 for mm, _ in lst)
        for i in range(len(angs)):
            ixa.append((angs[(i + 1) % len(angs)] - angs[i]) % 360)
    s = sorted(ixa)
    dirs = collections.Counter()
    for _, a, b, t in E:
        dx = N[b][0] - N[a][0]
        dy = N[b][1] - N[a][1]
        if dx or dy:
            dirs[int(math.degrees(math.atan2(dy, dx)) % 180) // 10 * 10] += 1
    hb = [round(100 * dirs[k] / len(E), 1) for k in sorted(dirs)]
    j = sum(dh[k] for k in dh if k >= 3)
    return {
        'degreeHist': {str(k): dh[k] for k in sorted(dh)},
        'fourWayShareAllEdges': round(100.0 * dh.get(4, 0) / j, 1) if j else None,
        'turnType0Bins12to18': {str(k): c0.get(k, 0) for k in range(12, 19)},
        'turnType0Under45': len(v0), 'turnType0AtLeast45': len(per[0]) - len(v0),
        'turnType0MaxUnder45': round(max(v0), 2) if v0 else None,
        'junctionArmP50': round(s[len(s) // 2], 2), 'junctionArmN': len(s),
        'junctionArm80to100Pct': round(100 * sum(1 for x in ixa if 80 <= x <= 100) / len(ixa), 1),
        'headingBinsPct': hb, 'headingMaxBinPct': max(hb),
    }


def twin_buildings(D):
    """_critic-ftg.md section 4 rows 10-12 (zigzag_rederive.py's indexing)"""
    B = [strip_close(b['poly']) for b in D['buildings']]
    areas = sorted(abs(A.sarea(P)) / 1e4 for P in B)
    sides, worst = [], []
    for P in B:
        if len(P) != 4:
            continue
        for i in range(4):
            sides.append(math.dist(P[i], P[(i + 1) % 4]) / 100)
        w = 0
        for i in range(4):
            a0, a1, a2 = P[i - 1], P[i], P[(i + 1) % 4]
            v1 = (a0[0] - a1[0], a0[1] - a1[1])
            v2 = (a2[0] - a1[0], a2[1] - a1[1])
            cs = max(-1, min(1, (v1[0] * v2[0] + v1[1] * v2[1]) / (math.hypot(*v1) * math.hypot(*v2))))
            w = max(w, abs(math.degrees(math.acos(cs)) - 90))
        worst.append(w)
    s = sorted(sides)
    w = sorted(worst)
    return {'areaMean': round(sum(areas) / len(areas), 1), 'areaMedian': round(areas[len(areas) // 2], 1),
            'areaP95': round(areas[int(.95 * len(areas))]), 'areaMax': round(areas[-1]),
            'quadSideMedian': round(s[len(s) // 2], 2), 'worstCornerMedian': round(w[len(w) // 2], 2),
            'worstCornerP95': round(w[int(.95 * len(w))], 1), 'worstCornerP99': round(w[int(.99 * len(w))], 1),
            'vertexHist': {str(k): v for k, v in sorted(collections.Counter(len(P) for P in B).items())}}


def twin_water_trees(D):
    """rows 18-20: water outline step and ribbon widths (zigzag_rederive / zigzag_probe_runs_rivers), tree spacing"""
    rows = []
    for wid, P in D['water']:
        seg = sorted(math.dist(P[i], P[i + 1]) / 100 for i in range(len(P) - 1))
        per = sum(math.dist(P[i], P[i + 1]) for i in range(len(P) - 1)) / 100
        a = abs(A.sarea(P)) / 1e4
        rows.append({'id': wid, 'points': len(P), 'segMedian': round(seg[len(seg) // 2], 1),
                     'areaM2': round(a), 'ribbonWidth': round(a / (per / 2), 1)})
    P = D['trees_twin']
    gr = collections.defaultdict(list)
    Cc = 2000
    for i, p in enumerate(P):
        gr[(p[0] // Cc, p[1] // Cc)].append(i)
    nn = []
    for i, p in enumerate(P):
        best = 1e18
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for j in gr.get((p[0] // Cc + dx, p[1] // Cc + dy), ()):
                    if j != i:
                        best = min(best, math.dist(p, P[j]))
        if best < 1e17:
            nn.append(best / 100)
    s = sorted(nn)
    return rows, {'instances': len(P), 'nnMin': round(s[0], 2), 'nnMedian': round(s[len(s) // 2], 2),
                  'nnMean': round(sum(s) / len(s), 2)}


def twin_wall(D):
    """challenge-under/wall_edge_probe.py (tower spacing along the type-7 polyline) and the plot census's section [N]
    (street arms per wall node; crossings without a shared node)"""
    N = D['nodes']
    T = set(tw['pos'] for tw in D['towers'])
    E7 = [(a, b) for (_, a, b, t) in D['edges'] if t == 7]
    adj = collections.defaultdict(list)
    for a, b in E7:
        adj[a].append(b)
        adj[b].append(a)
    tn = sum(1 for nid in adj if N[nid] in T)
    ends = [n for n, v in adj.items() if len(v) == 1]
    seen = set()
    spac = []
    for s0 in ends:
        if s0 in seen:
            continue
        prev = None
        cur = s0
        acc = 0.0
        last_t = cur if N[cur] in T else None
        while True:
            seen.add(cur)
            nxt = [mm for mm in adj[cur] if mm != prev]
            if not nxt:
                break
            mm = nxt[0]
            acc += math.dist(N[cur], N[mm]) / 100
            if N[mm] in T:
                if last_t is not None:
                    spac.append(acc)
                last_t = mm
                acc = 0.0
            prev, cur = cur, mm
    inc = collections.defaultdict(list)
    for (_, a, c, t) in D['edges']:
        inc[a].append(t)
        inc[c].append(t)
    wn = {u for (_, a, c, t) in D['edges'] if t == 7 for u in (a, c)}
    arms = collections.Counter(sum(1 for t in inc[u] if t in (0, 1, 2, 10)) for u in wn)
    W = [(N[a], N[c]) for (_, a, c, t) in D['edges'] if t == 7]
    S = [(N[a], N[c]) for (_, a, c, t) in D['edges'] if t in (0, 1, 2, 10)]
    improper = sum(1 for w in W for sg in S if proper_x(w[0], w[1], sg[0], sg[1], eps=1e-4 * 1e4))
    s = sorted(spac)
    return {'towersOnWallNodes': tn, 'towers': len(T), 'wallNodes': len(wn), 'wallEdges': len(E7),
            'towerSpacingN': len(s), 'towerSpacingMin': round(s[0], 1) if s else None,
            'towerSpacingMed': round(s[len(s) // 2], 1) if s else None, 'towerSpacingMax': round(s[-1], 1) if s else None,
            'streetArmsPerWallNode': {str(k): v for k, v in sorted(arms.items())},
            'passingNodes': sum(v for k, v in arms.items() if k >= 2), 'crossingsWithoutSharedNode': improper}


def twin_outline(D, nsec=16):
    """docs/validation/bench/ftg_anisotropy.py's computation"""
    N = {k: (v[0] / 100.0, v[1] / 100.0) for k, v in D['nodes'].items()}
    C = []
    for b in D['buildings']:
        P = [(x / 100.0, y / 100.0) for x, y in b['poly']]
        P = strip_close(P)
        C.append((sum(p[0] for p in P) / len(P), sum(p[1] for p in P) / len(P)))
    W = [[(x / 100.0, y / 100.0) for x, y in P] for _, P in D['water']]

    def ins(p, P):
        x, y = p
        c = False
        for i in range(len(P)):
            x1, y1 = P[i]
            x2, y2 = P[(i + 1) % len(P)]
            if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
                c = not c
        return c
    cx, cy = 0.0, 0.0
    for rcut in (1e9, 1200.0, 900.0):
        S = [p for p in C if math.dist(p, (cx, cy)) <= rcut]
        cx = sum(p[0] for p in S) / len(S)
        cy = sum(p[1] for p in S) / len(S)

    def sec(p):
        return int(((math.degrees(math.atan2(p[1] - cy, p[0] - cx)) % 360) / (360 / nsec)))
    rs = collections.defaultdict(list)
    for p in C:
        rs[sec(p)].append(math.dist(p, (cx, cy)))
    wf = {}
    for s in range(nsec):
        tot = wat = 0
        for rr in range(300, 1201, 100):
            for k in range(5):
                a = math.radians((s + (k + 0.5) / 5) * 360 / nsec)
                qq = (cx + rr * math.cos(a), cy + rr * math.sin(a))
                tot += 1
                if any(ins(qq, P) for P in W):
                    wat += 1
        wf[s] = wat / tot
    mr = collections.Counter()
    for (_, a, b, t) in D['edges']:
        if t != 1:
            continue
        mm = ((N[a][0] + N[b][0]) / 2, (N[a][1] + N[b][1]) / 2)
        if 400 <= math.dist(mm, (cx, cy)) <= 1500:
            mr[sec(mm)] += 1
    rows = []
    for s in range(nsec):
        r = sorted(rs[s])
        r90 = r[int(0.9 * (len(r) - 1))] if r else 0
        rows.append((s, len(r), r90, wf[s], mr[s]))
    land = [x for x in rows if x[3] < 0.2 and x[1] >= 20]
    wr = [x[2] for x in land if x[4] > 0]
    nr = [x[2] for x in land if x[4] == 0]

    def mean(v):
        return sum(v) / len(v) if v else float('nan')
    allr = [x[2] for x in land]
    sd = (sum((v - mean(allr)) ** 2 for v in allr) / len(allr)) ** 0.5
    return {'centre': [round(cx), round(cy)], 'landSectors': len(land), 'ratio': round(mean(wr) / mean(nr), 2),
            'cv': round(sd / mean(allr), 2)}


def twin_party_census(D):
    """the plot census's section [M]: shared wall = >= 2 m of boundary within 0.15 m of a non-duplicate neighbour
    (sampled every 0.5 m), by category inside the district rings; its arithmetic, re-typed"""
    B = []
    for b in D['buildings']:
        P = strip_close([(x / 100.0, y / 100.0) for x, y in b['poly']])
        B.append(dict(P=P, C=A.centroid(P), cat=b['cat']))
    rings = [strip_close([(x / 100.0, y / 100.0) for x, y in dd['rings'][0][0]]) for dd in D['districts']]
    for x in B:
        x['dist'] = next((k for k, P in enumerate(rings) if inside_eps(x['C'], P)), None)
    cs = 20.0
    G = collections.defaultdict(list)
    for i, x in enumerate(B):
        G[(int(math.floor(x['C'][0] / cs)), int(math.floor(x['C'][1] / cs)))].append(i)

    def near(i, r):
        cx, cy = int(math.floor(B[i]['C'][0] / cs)), int(math.floor(B[i]['C'][1] / cs))
        k = int(math.ceil(r / cs))
        out = []
        for gx in range(cx - k, cx + k + 1):
            for gy in range(cy - k, cy + k + 1):
                for j in G.get((gx, gy), ()):
                    if j != i and math.dist(B[i]['C'], B[j]['C']) <= r:
                        out.append(j)
        return out
    key = collections.defaultdict(list)
    for i, x in enumerate(B):
        key[tuple(sorted(x['P']))].append(i)
    twin = {}
    for g in key.values():
        for i in g:
            twin[i] = set(g) - {i}

    def poly_dist(P, Q):
        n, mq = len(P), len(Q)
        if inside_eps(P[0], Q) or inside_eps(Q[0], P):
            return 0.0
        for i in range(n):
            for j in range(mq):
                if proper_x(P[i], P[(i + 1) % n], Q[j], Q[(j + 1) % mq], eps=1e-6):
                    return 0.0
        d = min(seg_dist(p, Q[j], Q[(j + 1) % mq]) for p in P for j in range(mq))
        return min(d, min(seg_dist(qq, P[i], P[(i + 1) % n]) for qq in Q for i in range(n)))

    def shared_wall(P, Q, tol=0.15, minlen=2.0):
        tot = 0.0
        for a_i in range(len(P)):
            a, b = P[a_i], P[(a_i + 1) % len(P)]
            L = math.dist(a, b)
            n = max(1, int(L / 0.5))
            hit = sum(1 for k in range(n) if min(seg_dist((a[0] + (b[0] - a[0]) * (k + .5) / n, a[1] + (b[1] - a[1]) * (k + .5) / n),
                                                          Q[j], Q[(j + 1) % len(Q)]) for j in range(len(Q))) <= tol)
            tot += L * hit / n
        return tot >= minlen
    for i, x in enumerate(B):
        nb = [j for j in near(i, 45.0) if j not in twin[i]]
        x['wall'] = any(shared_wall(x['P'], B[j]['P']) for j in nb if poly_dist(x['P'], B[j]['P']) <= 0.2)
    out = {}
    for cat in (1, 13):
        S = [x for x in B if x['dist'] is not None and x['cat'] == cat]
        out[str(cat)] = {'n': len(S), 'sharedWallPct': round(100 * sum(1 for x in S if x['wall']) / len(S)) if S else None}
    S = [x for x in B if x['dist'] is None and x['cat'] == 1]
    out['1-outside'] = {'n': len(S), 'sharedWallPct': round(100 * sum(1 for x in S if x['wall']) / len(S)) if S else None}
    return out


# ================================================================ METRICS (V12 section 3.4.2 on the MeasureInput)
def feats(mi, kind):
    return [f for f in mi['features'] if f['kind'] == kind]


def way_steps(mi, classes=None):
    """per way: (class, length, resampled points, chord headings)"""
    out = []
    for f in feats(mi, 'way'):
        cls = f['props'].get('class')
        if cls == 'alley' or (classes and cls not in classes):
            continue
        c = [tuple(x) for x in f['geometry']['coordinates']]
        pts, L = resample(c)
        out.append((cls, L, pts, headings(pts)))
    return out


def m_turning(mi):
    W = way_steps(mi)
    per_way, steps, raw_steps = [], [], []
    for cls, L, pts, h in W:
        d = [abs(wrap180(h[i + 1] - h[i])) for i in range(len(h) - 1)]
        steps.extend(d)
        per_way.append((cls, L, sum(d) * 100.0 / L if L > 0 else 0.0))
    # raw-vertex turning on the same ways (no resampling): isolates the resampling change
    for f in feats(mi, 'way'):
        c = [tuple(x) for x in f['geometry']['coordinates']]
        h = headings(c)
        raw_steps.extend(abs(wrap180(h[i + 1] - h[i])) for i in range(len(h) - 1))
    long_ways = [(v, L) for cls, L, v in per_way if L >= 50.0]
    by_cls = {}
    for k in sorted({c for c, _, _ in per_way}):
        pw = [(v, L) for cls, L, v in per_way if cls == k and L >= 50.0]
        by_cls[k] = {'value': r3(wmedian(pw), 3) if pw else None, 'ways': len(pw)}
    bins = [0] * 46
    for d in steps:
        bins[min(int(d), 45)] += 1
    raw_bins = [0] * 46
    for d in raw_steps:
        raw_bins[min(int(d), 45)] += 1
    n = len(steps)
    # entropy: non-overlapping 50 m windows of five full 10 m chords
    ebins = [0] * 18
    over90 = 0
    for cls, L, pts, h in W:
        full = len(h) if dist(pts[-1], pts[-2]) >= STEP_M - 1e-6 else len(h) - 1
        j = 0
        while j + WIN_STEPS - 1 < full:
            v = abs(wrap180(h[j + WIN_STEPS - 1] - h[j]))
            if v >= 90:
                over90 += 1
            ebins[min(int(v // 5), 17)] += 1
            j += WIN_STEPS
    tw = sum(ebins)
    H = -sum((c / tw) * math.log2(c / tw) for c in ebins if c) if tw else None
    # row 9's counterpart: the length-weighted heading spectrum (mod 180, 10 degree bins) of the resampled chords
    spec = [0.0] * 18
    for cls, L, pts, h in W:
        for i in range(len(h)):
            spec[int((h[i] % 180.0) // 10) % 18] += dist(pts[i], pts[i + 1])
    st = sum(spec)
    return {
        'street.turn100': {'value': r3(wmedian(long_ways), 3), 'ways': len(long_ways), 'unit': 'deg per 100 m',
                           'byClass': by_cls,
                           'withoutTracks': r3(wmedian([(v, L) for cls, L, v in per_way if L >= 50.0 and cls != 'track']), 3),
                           'wayLengthP50': r3(q7([L for _, L, _ in per_way], .5), 2)},
        'street.stepHist': {'edges': list(range(46)), 'counts': bins, 'n': n,
                            'shareAbove15': r3(sum(bins[15:]) / n, 4) if n else None,
                            'shareAtLeast45': r3(bins[45] / n, 4) if n else None,
                            'emptyBinsAbove15': [k for k in range(15, 45) if bins[k] == 0],
                            'rawVertexCounts': raw_bins, 'rawVertexN': len(raw_steps)},
        'street.entropy50': {'value': r3(H, 4), 'windows': tw, 'binCounts': ebins, 'over90': over90, 'unit': 'bits',
                             'maxBits': round(math.log2(18), 4)},
        'headingSpectrum10': {'sharesPct': [round(100 * s / st, 1) for s in spec], 'maxBinPct': round(100 * max(spec) / st, 1),
                              'note': 'not a registered metric: the 10 m chords counterpart of _critic-ftg row 9'},
    }


def way_graph(mi, classes=None):
    """nodes keyed by coordinate; undirected adjacency with the way polyline segments"""
    adj = collections.defaultdict(list)
    for f in feats(mi, 'way'):
        if classes and f['props'].get('class') not in classes:
            continue
        c = [tuple(x) for x in f['geometry']['coordinates']]
        for i in range(len(c) - 1):
            if c[i] == c[i + 1]:
                continue
            adj[c[i]].append(c[i + 1])
            adj[c[i + 1]].append(c[i])
    return adj


def m_junctions(mi):
    adj = way_graph(mi)
    nodes = list(adj)
    # merge nodes within 2 m (union-find, single linkage)
    par = {v: v for v in nodes}

    def find(v):
        while par[v] != v:
            par[v] = par[par[v]]
            v = par[v]
        return v
    g = Grid(JUNCTION_MERGE_M)
    for k, v in enumerate(nodes):
        g.add_box(k, v[0], v[1], v[0], v[1])
    for k, v in enumerate(nodes):
        for j in g.query_box(v[0] - JUNCTION_MERGE_M, v[1] - JUNCTION_MERGE_M, v[0] + JUNCTION_MERGE_M, v[1] + JUNCTION_MERGE_M):
            if j > k and dist(v, nodes[j]) <= JUNCTION_MERGE_M:
                a, b = find(v), find(nodes[j])
                if a != b:
                    par[a] = b
    members = collections.defaultdict(list)
    for v in nodes:
        members[find(v)].append(v)
    cl = {v: find(v) for v in nodes}
    centre = {r: (sum(p[0] for p in ms) / len(ms), sum(p[1] for p in ms) / len(ms)) for r, ms in members.items()}
    # arms: segments leaving a cluster
    arms_of = collections.defaultdict(list)
    for r, ms in members.items():
        for v in ms:
            for w in adj[v]:
                if cl[w] != r:
                    arms_of[r].append((v, w))
    deg = {r: len(a) for r, a in arms_of.items()}

    def arm_point(r, v, w):
        """walk from v through w along the way graph until 10 m of arc from v or a cluster of degree != 2"""
        acc = dist(v, w)
        prev, cur = v, w
        while acc < ARM_M:
            rc = cl[cur]
            if deg.get(rc, 0) != 2 or len(members[rc]) != 1 or len(adj[cur]) != 2:
                return cur
            nxt = adj[cur][0] if adj[cur][1] == prev else adj[cur][1]
            L = dist(cur, nxt)
            if acc + L >= ARM_M:
                t = (ARM_M - acc) / L
                return (cur[0] + t * (nxt[0] - cur[0]), cur[1] + t * (nxt[1] - cur[1]))
            acc += L
            prev, cur = cur, nxt
        # the first segment alone reaches 10 m
        t = ARM_M / dist(v, w)
        return (v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1]))
    angles = []
    dh = collections.Counter()
    for r, arms in arms_of.items():
        d = len(arms)
        dh[d] += 1
        if d < 3:
            continue
        c = centre[r]
        bs = []
        for v, w in arms:
            if dist(v, w) >= ARM_M:
                t = ARM_M / dist(v, w)
                p = (v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1]))
            else:
                p = arm_point(r, v, w)
            bs.append(math.degrees(math.atan2(p[1] - c[1], p[0] - c[0])) % 360)
        bs.sort()
        for i in range(d):
            angles.append((bs[(i + 1) % d] - bs[i]) % 360)
    j3 = sum(v for k, v in dh.items() if k >= 3)
    return {
        'junction.angles': {'median': r3(q7(angles, .5), 2), 'p5': r3(q7(angles, .05), 2), 'n': len(angles),
                            'share80to100': r3(sum(1 for a in angles if 80 <= a <= 100) / len(angles), 4) if angles else None,
                            'unit': 'deg'},
        'junction.share4': {'value': r3(dh.get(4, 0) / j3, 4) if j3 else None, 'junctions': j3,
                            'degreeHist': {str(k): v for k, v in sorted(dh.items())},
                            'mergedClusters': sum(1 for ms in members.values() if len(ms) > 1)},
    }


def m_runs(mi):
    L = collections.defaultdict(list)
    for f in feats(mi, 'way'):
        L[f['props']['class']].append(polyline_len(f['geometry']['coordinates']))
    out = {}
    for k in ('arterial', 'street', 'lane', 'alley', 'track'):
        v = L.get(k, [])
        out[k] = {'median': r3(q7(v, .5), 2), 'n': len(v)} if v else {'median': None, 'n': 0}
    return {'street.runs': dict(out, unit='m')}


def footprints(mi):
    return [ring_open(f['geometry']['coordinates'][0]) for f in feats(mi, 'building')]


def m_buildings(mi):
    B = footprints(mi)
    areas = [abs(sarea(P)) for P in B]
    sides, worst = [], []
    for P in B:
        if len(P) != 4:
            continue
        sides.extend(dist(P[i], P[(i + 1) % 4]) for i in range(4))
        w = 0.0
        for i in range(4):
            a0, a1, a2 = P[i - 1], P[i], P[(i + 1) % 4]
            v1 = (a0[0] - a1[0], a0[1] - a1[1])
            v2 = (a2[0] - a1[0], a2[1] - a1[1])
            cs = max(-1.0, min(1.0, (v1[0] * v2[0] + v1[1] * v2[1]) / (math.hypot(*v1) * math.hypot(*v2))))
            w = max(w, abs(math.degrees(math.acos(cs)) - 90.0))
        worst.append(w)
    return {
        'bldg.area': {'median': r3(q7(areas, .5), 2), 'p95': r3(q7(areas, .95), 2), 'n': len(areas), 'unit': 'm2'},
        'bldg.quadSide': {'value': r3(q7(sides, .5), 3), 'quads': len(worst), 'unit': 'm'},
        'bldg.worstCorner': {'value': r3(q7(worst, .95), 3), 'quads': len(worst), 'unit': 'deg'},
    }


def capsule_interval(a, b, c, d, r):
    """the parameter interval t in [0, 1] of segment a-b lying within r of segment c-d (a convex capsule meets a
    line in one interval: the hull of its slab and two end-disc intervals)"""
    vx, vy = b[0] - a[0], b[1] - a[1]
    ivs = []
    for cc in (c, d):
        fx, fy = a[0] - cc[0], a[1] - cc[1]
        A2 = vx * vx + vy * vy
        B2 = 2 * (fx * vx + fy * vy)
        C2 = fx * fx + fy * fy - r * r
        disc = B2 * B2 - 4 * A2 * C2
        if A2 > 0 and disc >= 0:
            s = math.sqrt(disc)
            ivs.append(((-B2 - s) / (2 * A2), (-B2 + s) / (2 * A2)))
    ux, uy = d[0] - c[0], d[1] - c[1]
    Lc = math.hypot(ux, uy)
    if Lc > 0:
        ux, uy = ux / Lc, uy / Lc
        nx, ny = -uy, ux
        lo, hi = -math.inf, math.inf
        for (k0, k1, lo_b, hi_b) in (((a[0] - c[0]) * nx + (a[1] - c[1]) * ny, vx * nx + vy * ny, -r, r),
                                     ((a[0] - c[0]) * ux + (a[1] - c[1]) * uy, vx * ux + vy * uy, 0.0, Lc)):
            if abs(k1) < 1e-15:
                if not (lo_b <= k0 <= hi_b):
                    lo, hi = 1.0, 0.0
                continue
            t1, t2 = (lo_b - k0) / k1, (hi_b - k0) / k1
            lo, hi = max(lo, min(t1, t2)), min(hi, max(t1, t2))
        if lo <= hi:
            ivs.append((lo, hi))
    if not ivs:
        return None
    lo = max(0.0, min(i[0] for i in ivs))
    hi = min(1.0, max(i[1] for i in ivs))
    return (lo, hi) if hi > lo else None


def m_party(mi, cats=None, rings=None):
    B = footprints(mi)
    boxes = [bbox(P) for P in B]
    g = Grid(25.0)
    for k, bb in enumerate(boxes):
        g.add_box(k, *bb)
    shares = []
    for i, P in enumerate(B):
        x0, y0, x1, y1 = boxes[i]
        nb = [j for j in g.query_box(x0 - PARTY_M, y0 - PARTY_M, x1 + PARTY_M, y1 + PARTY_M) if j != i
              and boxes[j][0] <= x1 + PARTY_M and boxes[j][2] >= x0 - PARTY_M and boxes[j][1] <= y1 + PARTY_M and boxes[j][3] >= y0 - PARTY_M]
        per = 0.0
        cov = 0.0
        n = len(P)
        for e in range(n):
            a, b = P[e], P[(e + 1) % n]
            L = dist(a, b)
            per += L
            ivs = []
            for j in nb:
                Q = B[j]
                for f in range(len(Q)):
                    iv = capsule_interval(a, b, Q[f], Q[(f + 1) % len(Q)], PARTY_M)
                    if iv:
                        ivs.append(iv)
            if ivs:
                ivs.sort()
                tot, cl, ch = 0.0, ivs[0][0], ivs[0][1]
                for lo, hi in ivs[1:]:
                    if lo > ch:
                        tot += ch - cl
                        cl, ch = lo, hi
                    else:
                        ch = max(ch, hi)
                tot += ch - cl
                cov += tot * L
        shares.append(cov / per if per > 0 else 0.0)
    out = {'bldg.partyShare': {'value': r3(q7(shares, .5), 4), 'mean': r3(sum(shares) / len(shares), 4), 'n': len(shares),
                               'unit': 'share'},
           'bldg.attached': {'value': r3(sum(1 for s in shares if s > 0) / len(shares), 4), 'n': len(shares), 'unit': 'share'}}
    if cats is not None and rings is not None:
        # descriptive split (numbers only): residential and industrial categories inside the district rings
        cent = [A.centroid(P) for P in B]
        inr = [any(inside(c, R) for R in rings) for c in cent]
        dup = collections.Counter(tuple(sorted(P)) for P in B)
        by = {}
        for cat in (1, 13):
            S = [shares[i] for i in range(len(B)) if cats[i] == cat and inr[i]]
            Sd = [shares[i] for i in range(len(B)) if cats[i] == cat and inr[i] and dup[tuple(sorted(B[i]))] == 1]
            by['category%d-inRings' % cat] = {'n': len(S), 'partyShareMedian': r3(q7(S, .5), 4),
                                               'attached': r3(sum(1 for s in S if s > 0) / len(S), 4) if S else None,
                                               'attachedWithoutExactDuplicates': r3(sum(1 for s in Sd if s > 0) / len(Sd), 4) if Sd else None}
        S = [shares[i] for i in range(len(B)) if cats[i] == 1 and not inr[i]]
        by['category1-outsideRings'] = {'n': len(S), 'partyShareMedian': r3(q7(S, .5), 4),
                                        'attached': r3(sum(1 for s in S if s > 0) / len(S), 4) if S else None}
        out['bldg.partyShare']['byCategory'] = by
        out['bldg.partyShare']['exactDuplicateRecords'] = sum(v for v in dup.values() if v > 1)
    return out, shares


def wall_lines(mi):
    return [[tuple(x) for x in f['geometry']['coordinates']] for f in feats(mi, 'wall')]


def m_walls(mi):
    walls = wall_lines(mi)
    towers = [tuple(f['geometry']['coordinates']) for f in feats(mi, 'tower')]
    spac = []
    on = 0
    for c in walls:
        arc = [0.0]
        for i in range(len(c) - 1):
            arc.append(arc[-1] + dist(c[i], c[i + 1]))
        pos = sorted(arc[i] for i, v in enumerate(c) if any(dist(v, t) <= 0.01 for t in towers))
        on += len(pos)
        spac.extend(pos[k + 1] - pos[k] for k in range(len(pos) - 1))
    # crossings: way arms on both sides of the wall at an interior wall vertex, or a proper segment intersection
    adj = way_graph(mi)
    cls_at = collections.defaultdict(set)
    for f in feats(mi, 'way'):
        c = [tuple(x) for x in f['geometry']['coordinates']]
        for i in range(len(c) - 1):
            cls_at[(c[i], c[i + 1])].add(f['props']['class'])
            cls_at[(c[i + 1], c[i])].add(f['props']['class'])
    cross_nodes = collections.Counter()
    for c in walls:
        for i in range(1, len(c) - 1):
            v = c[i]
            if v not in adj:
                continue
            w1 = math.degrees(math.atan2(c[i - 1][1] - v[1], c[i - 1][0] - v[0])) % 360
            w2 = math.degrees(math.atan2(c[i + 1][1] - v[1], c[i + 1][0] - v[0])) % 360
            span = (w2 - w1) % 360
            sides = collections.defaultdict(set)
            for w in adj[v]:
                a = (math.degrees(math.atan2(w[1] - v[1], w[0] - v[0])) - w1) % 360
                if a < 1e-9 or abs(a - span) < 1e-9:
                    continue
                side = 0 if a < span else 1
                for k in cls_at[(v, w)]:
                    sides[k].add(side)
                sides['any'].add(side)
            for k, s in sides.items():
                if len(s) == 2:
                    cross_nodes[k] += 1
    proper = 0
    segs = [(tuple(f['geometry']['coordinates'][i]), tuple(f['geometry']['coordinates'][i + 1]), f['props']['class'])
            for f in feats(mi, 'way') for i in range(len(f['geometry']['coordinates']) - 1)]
    for c in walls:
        for i in range(len(c) - 1):
            for a, b, k in segs:
                if proper_x(c[i], c[i + 1], a, b, eps=1e-9):
                    proper += 1
    return {
        'wall.towerSpacing': {'value': r3(q7(spac, .5), 3), 'n': len(spac), 'towersOnCurtain': on, 'towers': len(towers),
                              'stretches': len(walls), 'unit': 'm'},
        'wall.ungated': {'value': cross_nodes.get('arterial', 0), 'unit': 'count',
                         'crossingNodesByClass': {k: v for k, v in sorted(cross_nodes.items())},
                         'properIntersections': proper, 'gates': 0},
        'gate.count': {'value': 0, 'unit': 'count', 'note': 'the payload carries no gate object'},
    }


def m_water(mi):
    spac = []
    widths = []
    bh = abs(mi['research']['census']['borderHalfWidthM'] or 0)
    for f in feats(mi, 'water'):
        R = ring_open(f['geometry']['coordinates'][0])
        n = len(R)
        keep = []
        for i in range(n):
            a, v, b = R[i - 1], R[i], R[(i + 1) % n]
            h1 = math.atan2(v[1] - a[1], v[0] - a[0])
            h2 = math.atan2(b[1] - v[1], b[0] - v[0])
            if abs(wrap180(math.degrees(h2 - h1))) >= 1.0:
                keep.append(i)
        arc = [0.0]
        for i in range(n):
            arc.append(arc[-1] + dist(R[i], R[(i + 1) % n]))
        for k in range(len(keep)):
            i, j = keep[k], keep[(k + 1) % len(keep)]
            spac.append((arc[j] - arc[i]) % arc[-1] if len(keep) > 1 else arc[-1])
        if f['props'].get('class') != 'river':
            continue
        orient = 1.0 if sarea(R) > 0 else -1.0     # counter-clockwise: the interior lies to the left
        for i in range(n):
            a, b = R[i], R[(i + 1) % n]
            if bh and ((abs(abs(a[0]) - bh) < 0.01 and abs(abs(b[0]) - bh) < 0.01) or (abs(abs(a[1]) - bh) < 0.01 and abs(abs(b[1]) - bh) < 0.01)):
                continue                           # a cut at the map border is a cross-section, not a bank
            L = dist(a, b)
            if L == 0:
                continue
            ux, uy = (b[0] - a[0]) / L, (b[1] - a[1]) / L
            nx, ny = -uy * orient, ux * orient
            s = STEP_M / 2
            while s < L:
                p = (a[0] + ux * s, a[1] + uy * s)
                best = None
                for j in range(n):
                    if j == i:
                        continue
                    c, d = R[j], R[(j + 1) % n]
                    ex, ey = d[0] - c[0], d[1] - c[1]
                    den = nx * ey - ny * ex
                    if abs(den) < 1e-12:
                        continue
                    t = ((c[0] - p[0]) * ey - (c[1] - p[1]) * ex) / den
                    u = ((c[0] - p[0]) * ny - (c[1] - p[1]) * nx) / den
                    if t > 1e-6 and -1e-9 <= u <= 1 + 1e-9 and (best is None or t < best):
                        best = t
                if best is not None:
                    widths.append(best)
                s += STEP_M
    return {'water.step': {'value': r3(q7(spac, .5), 3), 'n': len(spac), 'unit': 'm'},
            'water.riverWidth': {'value': r3(q7(widths, .5), 3), 'samples': len(widths), 'p25': r3(q7(widths, .25), 2),
                                 'p75': r3(q7(widths, .75), 2), 'unit': 'm'}}


def m_trees(mi):
    P = [tuple(f['geometry']['coordinates']) for f in feats(mi, 'tree')]
    n = len(P)
    if n < 2:
        return {'tree.nnP1': {'value': None}, 'tree.nnMedian': {'value': None}, 'tree.pcf': {'value': None}}
    g = Grid(25.0)
    for k, p in enumerate(P):
        g.add_box(k, p[0], p[1], p[0], p[1])
    nn = []
    for i, p in enumerate(P):
        r = 25.0
        while True:
            best = None
            for j in g.query_box(p[0] - r, p[1] - r, p[0] + r, p[1] + r):
                if j != i:
                    d = dist(p, P[j])
                    if best is None or d < best:
                        best = d
            if best is not None and best <= r:
                break
            r *= 2
        nn.append(best)
    # pair correlation, Stoyan and Stoyan's kernel estimator: Epanechnikov kernel, h = c / sqrt(lambda), translation
    # edge correction, the window = the settlement border square
    half = mi['research']['census']['borderHalfWidthM']
    side = 2 * half
    area = side * side
    lam = n / area
    h = PCF_C / math.sqrt(lam)
    rmax = 20.0 + h
    acc = [0.0] * 20
    for i, p in enumerate(P):
        for j in g.query_box(p[0] - rmax, p[1] - rmax, p[0] + rmax, p[1] + rmax):
            if j == i:
                continue
            dx, dy = P[j][0] - p[0], P[j][1] - p[1]
            d = math.hypot(dx, dy)
            if d > rmax:
                continue
            wt = 1.0 / ((side - abs(dx)) * (side - abs(dy)))
            for k in range(20):
                r = k + 1.0
                t = r - d
                if -h < t < h:
                    acc[k] += 0.75 / h * (1 - (t / h) ** 2) * wt
    lam2 = n * (n - 1) / (area * area)
    pcf = [acc[k] / (2 * math.pi * (k + 1.0) * lam2) for k in range(20)]
    return {'tree.nnP1': {'value': r3(q7(nn, .01), 3), 'unit': 'm', 'n': n, 'min': r3(min(nn), 3)},
            'tree.nnMedian': {'value': r3(q7(nn, .5), 3), 'unit': 'm', 'n': n},
            'tree.pcf': {'fields': ['r%d' % (k + 1) for k in range(20)], 'value': [r3(v, 3) for v in pcf], 'unit': 'ratio',
                         'bandwidthM': r3(h, 3), 'c': PCF_C, 'windowM': side, 'intensityPerHa': r3(lam * 1e4, 3)}}


def building_centroids(mi):
    return [A.centroid(P) for P in footprints(mi)]


def m_outline(mi):
    cx, cy = mi['header']['centre']
    C = building_centroids(mi)
    rs = collections.defaultdict(list)
    for p in C:
        b = math.degrees(math.atan2(p[1] - cy, p[0] - cx)) % 360
        rs[int(b // 10) % 36].append(math.hypot(p[0] - cx, p[1] - cy))
    r90 = {s: q7(v, .9) for s, v in rs.items() if len(v) >= 5}
    vals = list(r90.values())
    mu = sum(vals) / len(vals)
    sd = (sum((v - mu) ** 2 for v in vals) / len(vals)) ** 0.5
    # arterials leaving the built area: sign changes of (distance - its sector's r90) along the 10 m resampled
    # arterials (a sector with < 5 buildings counts r90 0)
    exits = []
    for cls, L, pts, h in way_steps(mi, classes={'arterial'}):
        def f(p):
            b = math.degrees(math.atan2(p[1] - cy, p[0] - cx)) % 360
            return math.hypot(p[0] - cx, p[1] - cy) - r90.get(int(b // 10) % 36, 0.0)
        for i in range(len(pts) - 1):
            if (f(pts[i]) > 0) != (f(pts[i + 1]) > 0):
                mid = ((pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2)
                exits.append(math.degrees(math.atan2(mid[1] - cy, mid[0] - cx)) % 360)
    road = {s for s in r90 if any(abs(wrap180(s * 10 + 5 - e)) <= 5 for e in exits)}
    rv = [r90[s] for s in road]
    nv = [r90[s] for s in r90 if s not in road]
    ratio = (sum(rv) / len(rv)) / (sum(nv) / len(nv)) if rv and nv else None
    return {'outline.r90cv': {'value': r3(sd / mu, 4), 'sectors': len(vals), 'unit': 'ratio'},
            'outline.roadRatio': {'value': r3(ratio, 4), 'roadSectors': len(road), 'otherSectors': len(nv),
                                  'arterialExits': len(exits), 'unit': 'ratio'}}, r90


# ---------------------------------------------------------------- variety: the signature vector (proposal, E05 s6)
def cluster_blocks(mi):
    """V12 section 3.4.1 cluster blocks: footprints within 1.0 m join one cluster; the outline is the union closed by
    a 3 m dilation then erosion, here on a 0.5 m raster with a square 13-pixel kernel (PIL); returns the areas (m2)
    and the clusters' footprint counts"""
    from PIL import Image, ImageDraw, ImageFilter
    B = footprints(mi)
    boxes = [bbox(P) for P in B]
    g = Grid(25.0)
    for k, bb in enumerate(boxes):
        g.add_box(k, *bb)
    par = list(range(len(B)))

    def find(i):
        while par[i] != i:
            par[i] = par[par[i]]
            i = par[i]
        return i

    def ring_dist(P, Q):
        n, mq = len(P), len(Q)
        for i in range(n):
            for j in range(mq):
                if proper_x(P[i], P[(i + 1) % n], Q[j], Q[(j + 1) % mq]):
                    return 0.0
        if inside(P[0], Q) or inside(Q[0], P):
            return 0.0
        d = min(seg_dist(p, Q[j], Q[(j + 1) % mq]) for p in P for j in range(mq))
        return min(d, min(seg_dist(qq, P[i], P[(i + 1) % n]) for qq in Q for i in range(n)))
    gap = CLUSTER_GAP_M
    for i, P in enumerate(B):
        x0, y0, x1, y1 = boxes[i]
        for j in g.query_box(x0 - gap, y0 - gap, x1 + gap, y1 + gap):
            if j <= i:
                continue
            bj = boxes[j]
            if bj[0] > x1 + gap or bj[2] < x0 - gap or bj[1] > y1 + gap or bj[3] < y0 - gap:
                continue
            if find(i) != find(j) and ring_dist(P, B[j]) <= gap:
                par[find(i)] = find(j)
    groups = collections.defaultdict(list)
    for i in range(len(B)):
        groups[find(i)].append(i)
    k = int(round(CLOSE_M / RASTER_M)) * 2 + 1
    pad = CLOSE_M + 2.0
    out = []
    for r, ids in groups.items():
        x0 = min(boxes[i][0] for i in ids) - pad
        y0 = min(boxes[i][1] for i in ids) - pad
        x1 = max(boxes[i][2] for i in ids) + pad
        y1 = max(boxes[i][3] for i in ids) + pad
        W = int(math.ceil((x1 - x0) / RASTER_M))
        H = int(math.ceil((y1 - y0) / RASTER_M))
        im = Image.new('L', (W, H), 0)
        dr = ImageDraw.Draw(im)
        for i in ids:
            dr.polygon([((p[0] - x0) / RASTER_M, (y1 - p[1]) / RASTER_M) for p in B[i]], fill=255)
        im = im.filter(ImageFilter.MaxFilter(k)).filter(ImageFilter.MinFilter(k))
        out.append((im.histogram()[255] * RASTER_M * RASTER_M, len(ids), r))
    return out, B


def m_signature(mi, outline_cv):
    cx, cy = mi['header']['centre']
    C = building_centroids(mi)
    dists = [math.hypot(p[0] - cx, p[1] - cy) for p in C]
    R = q7(dists, .9)
    # 1 radial share of arterials; 2 orthogonality; 3 street-density profile (10 m chords' midpoints within R)
    rad_num = rad_den = 0.0
    zr = zi = zl = 0.0
    ann = [0.0, 0.0, 0.0]
    for cls, L, pts, h in way_steps(mi):
        for i in range(len(pts) - 1):
            a, b = pts[i], pts[i + 1]
            ln = dist(a, b)
            mid = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
            rr = math.hypot(mid[0] - cx, mid[1] - cy)
            if rr > R or ln == 0:
                continue
            th = math.atan2(b[1] - a[1], b[0] - a[0])
            zr += ln * math.cos(4 * th)
            zi += ln * math.sin(4 * th)
            zl += ln
            ann[min(2, int(3 * rr / R))] += ln
            if cls == 'arterial' and rr > 0:
                radial = math.atan2(mid[1] - cy, mid[0] - cx)
                dev = abs(wrap180(math.degrees(th - radial)))
                dev = min(dev, 180 - dev)
                rad_den += ln
                if dev <= 30.0:
                    rad_num += ln
    areas_ann = [math.pi * R * R * ((k + 1) ** 2 - k ** 2) / 9.0 for k in range(3)]
    dens = [ann[k] / 1000.0 / (areas_ann[k] / 1e6) for k in range(3)]
    blocks, B = cluster_blocks(mi)
    inR = []
    for area_m2, nfp, root in blocks:
        cxy = A.centroid(B[root])
        if math.hypot(cxy[0] - cx, cxy[1] - cy) <= R:
            inR.append(area_m2)
    mu = sum(inR) / len(inR)
    cv = (sum((v - mu) ** 2 for v in inR) / len(inR)) ** 0.5 / mu
    enclosures = feats(mi, 'enclosure')
    enclosed = 0.0
    if enclosures:
        rings = [ring_open(f['geometry']['coordinates'][0]) for f in enclosures]
        enclosed = sum(1 for p in C if any(inside(p, r) for r in rings)) / len(C)
    sizes = collections.Counter(n for _, n, _ in blocks)
    return {
        'components': ['radialShare', 'orthogonality', 'densityInner', 'densityMiddle', 'densityOuter', 'blockAreaCV',
                       'enclosedShare', 'outlineR90cv'],
        'vector': [r3(rad_num / rad_den if rad_den else None, 4), r3(math.hypot(zr, zi) / zl, 4), r3(dens[0], 3),
                   r3(dens[1], 3), r3(dens[2], 3), r3(cv, 4), r3(enclosed, 4), outline_cv],
        'builtRadiusM': r3(R, 1),
        'clusterBlocks': {'n': len(blocks), 'withinR': len(inR), 'singletons': sizes.get(1, 0),
                          'largestFootprintCount': max(sizes) if sizes else 0, 'areaMedian': r3(q7(inR, .5), 1)},
        'note': 'FTG has no enclosure (its wall is an open chain): enclosedShare 0 by definition',
    }


# ---------------------------------------------------------------- per capture
def measure(stamp):
    mi_mem, D, prov = A.adapt(stamp)
    path = A.out_path(mi_mem, stamp)
    mi = A.read(path)
    same_file = json.dumps(mi, sort_keys=True) == json.dumps(json.loads(json.dumps(mi_mem)), sort_keys=True)
    D['trees_twin'] = [p for p in D['trees']]      # the critic measured the instances of 11.9 (all trees in both)
    label = LABEL.get(stamp, stamp)
    res = {'capture': stamp, 'referenceBuild': mi['header']['build'], 'measureInput': os.path.relpath(path, ROOT),
           'measureInputEqualsAdapterRun': same_file, 'header': mi['header']}
    lp_lines, runs_top, windows = twin_length_precision(label, D)
    stored = stored_length_precision().get(label)
    res['twin'] = {
        'lengthPrecision': {'lines': len(lp_lines), 'storedLines': len(stored) if stored else None,
                            'identical': stored == lp_lines if stored is not None else None,
                            'firstDifference': next(([i, a, b] for i, (a, b) in enumerate(zip(lp_lines, stored)) if a != b), None) if stored else None,
                            'runsTop': {'%d-%s' % k: v for k, v in runs_top.items()},
                            'windowMedians': {'%d-%s-%g' % k: [v[0], v[1]] for k, v in sorted(windows.items())}},
        'counts': {k: mi['research']['census'][k] for k in ('edges', 'nodes', 'buildings', 'towers', 'districts', 'waterBodies', 'trees')},
        'critic': twin_critic_rows(D),
        'buildings': twin_buildings(D),
        'wall': twin_wall(D),
        'outline16': twin_outline(D),
        'serverTimeS': mi['research']['serverTimeS'],
        'popPerBuildingNominal': round(mi['header']['population'] / len(D['buildings']), 2),
    }
    cliff = collections.defaultdict(lambda: [0, 0])
    for f, t in zip(feats(mi, 'way'), mi['research']['wayRawType']):
        h = headings([tuple(x) for x in f['geometry']['coordinates']])
        for i in range(len(h) - 1):
            d = abs(wrap180(h[i + 1] - h[i]))
            if 15 <= d < 17:
                cliff[str(t)][int(d) - 15] += 1
    res['twin']['rawWayVertexBins15and16ByEdgeType'] = dict(sorted(cliff.items()))
    wrows, tnn = twin_water_trees(D)
    res['twin']['water'] = wrows
    res['twin']['trees'] = tnn
    res['twin']['partyCensus'] = twin_party_census(D)
    met = {}
    met.update(m_turning(mi))
    met.update(m_junctions(mi))
    met.update(m_runs(mi))
    met.update(m_buildings(mi))
    rings = [ring_open(f['geometry']['coordinates'][0]) for f in feats(mi, 'district')]
    party, _ = m_party(mi, cats=mi['research']['buildingCategory'], rings=rings)
    met.update(party)
    met.update(m_walls(mi))
    met.update(m_water(mi))
    met.update(m_trees(mi))
    nb = len(feats(mi, 'building'))
    met['pop.perBuilding'] = {'value': r3(mi['header']['population'] / nb, 4), 'population': mi['header']['population'],
                              'populationSource': mi['research']['populationSource'], 'buildings': nb, 'unit': 'ratio'}
    st = mi['research']['serverTimeS']
    met['time.model'] = {'value': round(st['putToLayoutGet'] * 1000) if st['putToLayoutGet'] is not None else None, 'unit': 'ms',
                         'definition': 'PUT sent to layout GET sent (index.jsonl ts), as W-02 records it; the server is remote, so no score ratio applies',
                         'putToLayoutOptionsMs': round(st['putToLayoutOptions'] * 1000) if st['putToLayoutOptions'] is not None else None}
    o, r90 = m_outline(mi)
    met.update(o)
    w = mi['research']['lifestyleWeights']
    tw = sum(w)
    pairs = collections.Counter(mi['research']['buildingTierPair'])
    nres = sum(v for k, v in pairs.items() if k != 0)
    for i, x in enumerate(w):
        met['wealth.tier%d' % (i + 1)] = {'value': r3(x / tw, 4), 'unit': 'share', 'source': 'request weight (input)'}
    met['wealth.outputTierPairs'] = {'residences': nres, 'unmapped': pairs.get(-1, 0),
                                     'shares': [r3(pairs.get(k, 0) / nres, 4) for k in (1, 2, 3)],
                                     'requestPairShares': [r3((w[0] + w[1]) / tw, 4), r3((w[2] + w[3]) / tw, 4), r3((w[4] + w[5]) / tw, 4)],
                                     'note': 'residence buildings per tier pair 1-2 / 3-4 / 5-6 (a building count, not households)'}
    met['variety.signature'] = m_signature(mi, met['outline.r90cv']['value'])
    res['metrics'] = met
    return res


# ---------------------------------------------------------------- the checks of W-05's row
def checks_for(results, red=False):
    by = {r['capture']: r for r in results}
    G = by.get('2026-09-21T05-23-58')
    N = by.get('2026-09-25T10-13-51')
    C = []
    ext = {}

    def ck(cid, name, ok, receipt):
        C.append({'id': cid, 'check': name, 'passed': bool(ok), 'receipt': receipt})
    if G and N:
        for r in (G, N):
            lp = r['twin']['lengthPrecision']
            ck('lp-%s' % r['capture'][:10], 'length_precision.out.txt reproduced line for line (%s)' % r['capture'],
               lp['identical'], '%d of %d lines identical; first difference %s' % (lp['lines'], lp['storedLines'], lp['firstDifference']))
        want = 50.0 if red else 50.5
        g = G['twin']['lengthPrecision']
        n = N['twin']['lengthPrecision']
        got = [g['runsTop']['1-in'][0], g['windowMedians']['0-in-29'][1], n['windowMedians']['0-in-49'][1],
               g['windowMedians']['0-out-29'][1], n['windowMedians']['0-out-29'][1], g['windowMedians']['0-out-14'][1],
               g['windowMedians']['4-out-14'][1], n['windowMedians']['4-out-14'][1], n['runsTop']['1-in'][0]]
        exp = [want, 30.25, 50.25, 30.00, 30.00, 14.70, 14.70, 14.70, 50.5]
        ck('runs', 'runs 50.5 / 30.25 / 50.25 / 30.00 / 14.70 m', all(abs(a - b) < 0.005 for a, b in zip(got, exp)),
           'got %s against %s (stage-1 main runs G and N, stage-2 street p50 G / N, suburb street p50 G / N, suburb piece and lot outline p50)' % (got, exp))
        ck('counts', '2798 and 2813 buildings; 17 / 29 towers',
           G['twin']['counts']['buildings'] == 2798 and N['twin']['counts']['buildings'] == 2813
           and G['twin']['counts']['towers'] == 17 and N['twin']['counts']['towers'] == 29,
           'buildings %d / %d, towers %d / %d (MeasureInput: %d / %d buildings, %d / %d towers)' % (
               G['twin']['counts']['buildings'], N['twin']['counts']['buildings'], G['twin']['counts']['towers'],
               N['twin']['counts']['towers'], G['metrics']['bldg.area']['n'], N['metrics']['bldg.area']['n'],
               G['metrics']['wall.towerSpacing']['towers'], N['metrics']['wall.towerSpacing']['towers']))
        cr = G['twin']['critic']
        ok7 = cr['turnType0Bins12to18'] == {'12': 28, '13': 19, '14': 16, '15': 0, '16': 0, '17': 1, '18': 0}
        ok8 = cr['junctionArmP50'] == 90.02 and cr['junctionArmN'] == 5213 and cr['junctionArm80to100Pct'] == 58.2
        ok9 = cr['headingMaxBinPct'] == 7.8
        ck('critic-7-9', '_critic-ftg section 4 rows 7-9 reproduced (the 2026-09-21 capture, raw edges)', ok7 and ok8 and ok9,
           'row 7 type-0 bins 12..18 %s; row 8 p50 %.2f n %d, 80-100 %.1f %%; row 9 max heading bin %.1f %%' % (
               cr['turnType0Bins12to18'], cr['junctionArmP50'], cr['junctionArmN'], cr['junctionArm80to100Pct'], cr['headingMaxBinPct']))
        tg, tn = G['metrics'], N['metrics']
        sh = [m['street.stepHist'] for m in (tg, tn)]
        en = [m['street.entropy50'] for m in (tg, tn)]
        ja = [m['junction.angles'] for m in (tg, tn)]
        hs = [m['headingSpectrum10'] for m in (tg, tn)]
        # Agreement within the declared change, criteria fixed before the first V12 value was seen (E05 section 3):
        # (i) row 7 on the V12 way set: the raw way vertices keep the 15-degree cliff (bins 15 and 16 empty);
        # (ii) row 8 under V12's junction definition (2 m merge, arms 10 m along): median within the 1-degree angle
        #      floor of 90.02; (iii) row 9 on the resampled chords: the heading spectrum stays flat (largest 10-degree
        #      bin under twice the uniform 5.6 %); (iv) turn100 and entropy50 exist on both payloads (new numbers, no
        #      prior value). The resampled step mass above 15 degrees is the declared change and is reported, not gated.
        crit = []
        for s, j, h, mm in zip(sh, ja, hs, (tg, tn)):
            crit.append([s['rawVertexCounts'][15] == 0 and s['rawVertexCounts'][16] == 0,
                         j['median'] is not None and abs(j['median'] - 90.02) <= 1.0,
                         h['maxBinPct'] < 11.1,
                         mm['street.turn100']['value'] is not None and mm['street.entropy50']['value'] is not None])
        # The row's check is scoped to the payload rows 7-9 were measured on (the 2026-09-21 capture: zigzag_rederive.py
        # reads that payload only). The same criteria on the 2026-09-25 capture are a pre-registered extension beyond the row; their result
        # is kept in E05's 'preRegistered' block and reported, whatever it is.
        ck('turning-entropy', 'turning per 100 m and heading entropy agree with rows 7-9 within the declared 10 m resampling change',
           all(crit[0]),
           'on rows 7-9\'s payload (the 2026-09-21 capture): (i) raw way-vertex bins 15/16 %d/%d; (ii) junction median %.2f; (iii) max heading bin %.1f %%; '
           '(iv) turn100 %.3f deg per 100 m, entropy50 %.3f bits; declared change: resampled steps above 15 deg %.4f. '
           'Extension to the 2026-09-25 capture (not a row check): (i) %d/%d [%s], (ii) %.2f, (iii) %.1f %%, (iv) %.3f / %.3f' % (
               sh[0]['rawVertexCounts'][15], sh[0]['rawVertexCounts'][16], ja[0]['median'], hs[0]['maxBinPct'],
               tg['street.turn100']['value'], en[0]['value'], sh[0]['shareAbove15'],
               sh[1]['rawVertexCounts'][15], sh[1]['rawVertexCounts'][16], 'pass' if crit[1][0] else 'FAIL by data',
               ja[1]['median'], hs[1]['maxBinPct'], tn['street.turn100']['value'], en[1]['value']))
        results_ext = {'criteria': ['(i) raw way-vertex bins 15 and 16 empty', '(ii) junction.angles median within 1 deg of 90.02',
                                    '(iii) resampled heading spectrum max 10-degree bin < 11.1 %', '(iv) turn100 and entropy50 exist'],
                       'capture2026-09-21': crit[0], 'capture2026-09-25': crit[1],
                       'capture2026-09-25Bins15and16ByEdgeType': N['twin']['rawWayVertexBins15and16ByEdgeType'],
                       'capture2026-09-25CriticMethodType0Bins12to18': N['twin']['critic']['turnType0Bins12to18']}
        ext['turningEntropy'] = results_ext
        ck('measureinput', 'the stored MeasureInput equals a fresh adapter run', G['measureInputEqualsAdapterRun'] and N['measureInputEqualsAdapterRun'],
           'G %s, N %s' % (G['measureInputEqualsAdapterRun'], N['measureInputEqualsAdapterRun']))
    return C, ext


def main():
    args = sys.argv[1:]
    check = '--check' in args
    red = '--red' in args
    out = JSON_DEFAULT
    if '--json' in args:
        i = args.index('--json')
        out = args[i + 1]
        del args[i:i + 2]
    caps = [a for a in args if not a.startswith('--')] or A.CAPS_DEFAULT
    results = [measure(s) for s in caps]
    C, ext = checks_for(results, red=red)
    doc = {'schema': 'm1.e05/1', 'script': SCRIPT, 'adapter': A.SCRIPT, 'lane': 'm1/W-05', 'captures': results, 'checks': C,
           'preRegistered': ext}
    if not red:
        with open(out, 'w') as fh:
            json.dump(doc, fh, indent=1, sort_keys=False)
            fh.write('\n')
    for r in results:
        m = r['metrics']
        print('== %s %s' % (r['capture'], r['referenceBuild']))
        for k in sorted(m):
            v = m[k]
            if k == 'street.stepHist':
                print('  %-22s n %d, share > 15 deg %.4f, share >= 45 deg %.4f, empty bins above 15: %s' % (
                    k, v['n'], v['shareAbove15'], v['shareAtLeast45'], v['emptyBinsAbove15']))
            elif k == 'tree.pcf':
                print('  %-22s h %.2f m: %s' % (k, v['bandwidthM'], v['value']))
            else:
                print('  %-22s %s' % (k, json.dumps(v)[:300]))
    for c in C:
        print('%s  %s — %s' % ('PASS' if c['passed'] else 'FAIL', c['check'], c['receipt']))
    ok = all(c['passed'] for c in C)
    if check and not ok:
        sys.exit(1)


if __name__ == '__main__':
    main()
