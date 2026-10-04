#!/usr/bin/env python3
"""research/baselines/measure_mfcg.py -- MFCG's M-1 numbers on MeasureInput files (M-1 work item W-07; V12 section 3.4.2).

Lane m1/W-07 (docs/calibration/M-1-plan.md section 2, row W-07; record docs/calibration/E07-mfcg-signature.md). Research
side only; our own code, standard library only (Python 3.9). The geo metrics read ONLY the MeasureInput files that
research/baselines/adapters/mfcg.py writes (research/baselines/inputs/MFCG/itch-12710731/*.metric.geojson.gz). Two
families read other captured files, as the plan's D28 row says: draw.* reads the canvas draw records
(captures/mfcg/<capture>/draw/gen-N.draw.json) and the SVG exports' outer scale; time.model reads the export logs'
console stage timings (the stage pattern is imported from the sweep folder's stats.py, unmodified, so no identifier is
restated here). No captured program bundle is ever opened.

Definitions (V12 section 3.4.2; centroids are area centroids everywhere, V12's default rule):
  bldg.r4.<r>        axis = the footprint's longest ring edge (the first in ring order on a tie); z = exp(4i axis); for
                     1 500 footprints sampled by the metric's stream (all if fewer), R4 = |mean z| over footprints whose
                     centroids lie within r of the sample's centroid (itself included), samples with >= 5 such; per seed
                     the median. Stream (declared, the M-1 twin of the testkit stream): random.Random(int(sha256(
                     '<metric>|<capture>')[:16], 16)).sample
  bldg.wallAlign     footprints whose centroid is inside the enclosure, by the distance from that centroid to the
                     nearest curtain segment (built stretches only, never a closure) in bands [0, 40), [40, 100),
                     [100, 200) m: the deviation between the axis and that segment's direction folded into [0, 45]; per
                     band the median and the share <= 15 degrees. Ties between segments broken by (distance, first
                     vertex, second vertex) lexicographically (declared; the red-team script's tuple order)
  walled.share       footprints with centroid inside the enclosure / all footprints
  ribbon.share       extramural footprints (centroid outside the enclosure) within 100 m (<=) of an arterial way /
                     extramural footprints; no extramural footprint -> notApplicable
  district.area      per district polygon hectares; per seed the median (min and max kept)
  plaza.area         the principal (largest) square's hectares
  castle.area        the castle polygons' hectares; castle.compact = 4 pi A / P^2 of the largest castle polygon
  wall.nodeSpacing   along each curtain stretch, the distance between consecutive nodes -- towers, gates and vertices
                     where the curtain turns >= 10 degrees (a closed stretch wraps; an open stretch's ends count only
                     when they are towers or gates); p50 over all spacings
  wall.towerSpacing  the same with towers only as nodes; p50
  quarter.count      district features;  gate.count  gates of class land
  market.secondary   market squares beyond the first;  market.adjacent  market-square pairs sharing an edge (>= 0.5 m
                     of common boundary within 0.5 m)
  wall.barrierShare  closure length / the enclosure's perimeter (descriptive extra; the shore split's product)
  gate law           section 4.2 S3 (4): N = floor(1 + 0.47 sqrt(walled ha) + 0.5); with a waterfront (barrier share >=
                     0.1) N = min(N, 2 + floor(0.75 (N - 2) + 0.5)); a requested gate count is taken as given
  draw.*             per draw record: the hairline t (the most frequent stroke width); the casing law (a ribbon core
                     width -- a non-dark stroke width other than t -- is cased when a dark stroke lies at core + 2t
                     within 0.002, uncased when no dark stroke lies in (core, core + 4t], else a violation; the law
                     holds on a record with >= 1 cased core and 0 violations; the darkest stroke style by Rec. 601
                     luma is the dark ink, found at run time); the
                     round-join and round-cap shares; walls after buildings (the first wall stroke after the last roof
                     fill; not measurable where the record's log is truncated); and at the matched scale (size 40) the
                     drawn widths of wall, tower, road core and pier = model width x the SVG's px per metre (outer
                     scale / 4, the export's 4 m unit)
  time.model         per export, the sum of the app's own per-stage console timings over all attempts (stats.py's
                     'gen ms'), descriptive

W-07b additions (lane m1/W-07b; the M-1 sweep captures/mfcg/exports-sweep-m1-2026-10-03, rows of plan D7, D8, D9, D24
and D35; R-23's cells; T-V12-6 in full). Computed by measure_extra(), read by the --plan mode only, so the W-07 fixture
run's output (docs/calibration/E07-mfcg-signature.json) keeps its bytes:
  fg.coverWalled     sum of the areas of footprints whose centroid is inside the enclosure / the enclosure's area (V12;
                     stats.py's 'cover in walls'; T-V12-6's gross cover; the row is W-08's, reported here as the clause)
  bldg.area          footprint areas (every building: footprints and prisms); per seed the median and p95 (type 7)
  water.step         per water polygon (the sea), vertices turning < 1 degree dropped, the arc spacing between consecutive
                     kept vertices; per seed the median over every spacing (measure_ftg.py's twin, like with like). The
                     river is an exported centreline, never an outline: its kept-vertex step is a research number only
  water.riverWidth   the median of the river features' widths (one width per course: the export's riverWidth)
  wall.ungated       arterial ways (part 0) crossing a curtain stretch at no gate: proper crossings (a way segment and a
                     curtain segment meeting at a point more than 0.01 m from all four ends) plus crossings at a curtain
                     vertex (way arms on both sides of the curtain there, measure_ftg.py's side rule) that is no gate;
                     a closure is no curtain, so a way over a shore closure never counts
  pop.perBuilding    the export carries no population figure, so the coded law (section 13.5's population row: six
                     persons per lot, the total rounded up to two significant figures; its buildings are its lots) on the
                     exported building count, divided by that count; populationSource 'law'
  wall.barrierShare and the gate law at the stress setting come from measure() as before.
  Per family (plan.json's MFCG families, the sample of the sweep's export-check.json): the usable seeds' per-seed
  values summarised by V12 section 3.5.1's estimator (type7 at n >= 10, minmax at 2-9, single at 1): measured values,
  never rows (R-47 (a): W-15 is the sole writer of rows.py); failed indices carried, retries measured and excluded.

Usage:
  python3 research/baselines/measure_mfcg.py [--json OUT] [--check] [--red]
    --check  run the W-07 checker column (and the T-V12-6 / T-V12-32 clauses this item can run); exit 1 on any FAIL
    --red    shift two expectations (the R4 gates4 60 m value by +0.03, the gates0 tower count by +1) to prove the
             checker goes red
  python3 research/baselines/measure_mfcg.py --plan [--json OUT] [--red]
    W-07b: the M-1 sweep's per-seed values and per-family summaries, and the W-07b checker column (T-V12-6 in full,
    the sweep's stats.md equal, every usable seed in every summary, the failed indices listed); exit 1 on any FAIL.
    --red shifts three expectations (a fixture cover by +0.001, one M-1 stats.md building count by +1, the TOWN usable
    count by +1) to prove the checker goes red
"""
import cmath
import gzip
import hashlib
import importlib.util
import json
import math
import os
import random
import re
import statistics
import subprocess
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
INPUTS = os.path.join(HERE, 'inputs', 'MFCG', 'itch-12710731')
EXPORTS = os.path.join(ROOT, 'captures', 'mfcg', 'exports-2026-09-25')
SWEEP = os.path.join(ROOT, 'captures', 'mfcg', 'exports-sweep-2026-09-25')
BENCH = os.path.join(ROOT, 'docs', 'validation', 'bench')
SCRIPT = 'research:baselines/measure_mfcg.py'
REFERENCE_BUILD = 'itch:12710731'
RADII = (60.0, 120.0, 250.0)
R4_N, R4_MIN = 1500, 5
BANDS = ((0.0, 40.0), (40.0, 100.0), (100.0, 200.0))
RIBBON_M = 100.0
TURN_NODE_DEG = 10.0
CASING_TOL = 0.002
FIXTURES = ['s555001-size40-gates0', 's555001-size40-gates1', 's555001-size40-gates4', 's555001-size40-gates9',
            's777001-size80-river-coast']
FIXTURE_FOLDERS = ('exports-2026-09-25', 'exports-sweep-2026-09-25')   # the W-07 run reads these MeasureInputs only
M1_FOLDER = 'exports-sweep-m1-2026-10-03'
M1_DIR = os.path.join(ROOT, 'captures', 'mfcg', M1_FOLDER)
PLAN_JSON = os.path.join(HERE, 'plan.json')
COVERS = ['0.657', '0.582', '0.621', '0.583', '0.569']     # T-V12-6: the five fixtures' gross cover, three decimals
WATER_TURN_DEG = 1.0
NEAR = 0.01
DRAW_CAPTURES = ['2026-09-21T05-03-24', '2026-09-21T05-06-58', '2026-09-21T11-25-32',
                 '2026-09-25T10-05-23', '2026-09-25T10-05-38', '2026-09-25T10-05-44']


# ---------------------------------------------------------------- helpers
def read_mi(path):
    with gzip.open(path, 'rb') as fh:
        return json.loads(fh.read().decode())


def open_ring(r):
    return r[:-1] if len(r) > 1 and r[0] == r[-1] else r


def sarea(r):
    n = len(r)
    return 0.5 * sum(r[i][0] * r[(i + 1) % n][1] - r[(i + 1) % n][0] * r[i][1] for i in range(n))


def centroid(r):
    n = len(r); a = cx = cy = 0.0
    for i in range(n):
        x0, y0 = r[i]; x1, y1 = r[(i + 1) % n]; c = x0 * y1 - x1 * y0
        a += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c
    if abs(a) < 1e-12:
        return (sum(p[0] for p in r) / n, sum(p[1] for p in r) / n)
    return (cx / (3 * a), cy / (3 * a))


def perim(r, closed=True):
    n = len(r)
    return sum(math.dist(r[i], r[(i + 1) % n]) for i in range(n if closed else n - 1))


def pip(pt, r):
    x, y = pt; ins = False; n = len(r); j = n - 1
    for i in range(n):
        xi, yi = r[i]; xj, yj = r[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            ins = not ins
        j = i
    return ins


def dseg(p, a, b):
    ax, ay = a; bx, by = b; px, py = p; dx, dy = bx - ax, by - ay; L = dx * dx + dy * dy
    t = 0.0 if L == 0 else max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / L))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def axis(r):
    best = (0.0, 0.0)
    for i in range(len(r)):
        a, b = r[i], r[(i + 1) % len(r)]; L = math.dist(a, b)
        if L > best[0]:
            best = (L, math.atan2(b[1] - a[1], b[0] - a[0]))
    return best[1]


def fold45(a, b):
    d = abs((a - b) % (math.pi / 2))
    return math.degrees(min(d, math.pi / 2 - d))


def pct(xs, q):
    """type 7 percentile (linear between order statistics)"""
    s = sorted(xs); n = len(s)
    if n == 0:
        return None
    h = (n - 1) * q; lo = math.floor(h); hi = min(lo + 1, n - 1)
    return s[lo] + (h - lo) * (s[hi] - s[lo])


def half_up(x):
    return math.floor(x + 0.5)


def stream(metric, capture):
    return random.Random(int(hashlib.sha256(f'{metric}|{capture}'.encode()).hexdigest()[:16], 16))


# ---------------------------------------------------------------- the geo metrics on one MeasureInput
def measure(mi, capture):
    fs = mi['features']
    by = {}
    for f in fs:
        by.setdefault(f['kind'], []).append(f)
    B = [open_ring(f['geometry']['coordinates'][0]) for f in by.get('building', [])]
    C = [centroid(r) for r in B]
    AX = [axis(r) for r in B]
    Z = [cmath.exp(4j * a) for a in AX]
    out = {'capture': capture, 'buildings': len(B), 'rung': mi['header'].get('rung'), 'water': mi['header'].get('water'),
           'options': mi['header'].get('options', {})}

    # R4
    cell = 100.0; G = {}
    for i, (x, y) in enumerate(C):
        G.setdefault((int(x // cell), int(y // cell)), []).append(i)
    for rad in RADII:
        mid = f'bldg.r4.{int(rad)}'
        samp = list(range(len(B))) if len(B) <= R4_N else stream(mid, capture).sample(range(len(B)), R4_N)
        vals = []
        for i in samp:
            x, y = C[i]; acc = 0j; k = 0
            for gx in range(int((x - rad) // cell), int((x + rad) // cell) + 1):
                for gy in range(int((y - rad) // cell), int((y + rad) // cell) + 1):
                    for j in G.get((gx, gy), ()):
                        if math.dist(C[j], (x, y)) <= rad:
                            acc += Z[j]; k += 1
            if k >= R4_MIN:
                vals.append(abs(acc) / k)
        out[mid] = {'median': statistics.median(vals) if vals else None, 'p25': pct(vals, 0.25), 'p75': pct(vals, 0.75),
                    'samples': len(vals)}

    # enclosure, curtain, closures
    enc = [open_ring(f['geometry']['coordinates'][0]) for f in by.get('enclosure', [])]
    enc = enc[0] if enc else None
    curt = [f['geometry']['coordinates'] for f in by.get('wall', []) if f['props'].get('class') == 'curtain']
    clos = [f['geometry']['coordinates'] for f in by.get('closure', [])]
    segs = [(tuple(s[k]), tuple(s[k + 1])) for s in curt for k in range(len(s) - 1)]
    inside = [pip(c, enc) for c in C] if enc else [False] * len(C)

    # wall alignment
    def wall_align(sg):
        bands = {b: [] for b in BANDS}
        for i, c in enumerate(C):
            if not inside[i]:
                continue
            dm, a, b = min((dseg(c, a, b), a, b) for a, b in sg)
            for lo, hi in BANDS:
                if lo <= dm < hi:
                    bands[(lo, hi)].append(fold45(AX[i], math.atan2(b[1] - a[1], b[0] - a[0])))
        wa = {}
        for (lo, hi), devs in bands.items():
            key = f'b{int(lo)}_{int(hi)}'
            wa[key] = {'n': len(devs), 'median': statistics.median(devs) if devs else None,
                       'share15': (sum(1 for x in devs if x <= 15) / len(devs)) if devs else None}
        return wa
    out['bldg.wallAlign'] = wall_align(segs) if enc and segs else 'notApplicable'
    if enc and clos:
        # research-only variant (no row): the whole enclosure ring as the curtain, the red-team script's rule, to isolate
        # what the shore split moves (record E07, finding F1)
        out['bldg.wallAlign.ringVariant'] = wall_align([(tuple(enc[k]), tuple(enc[(k + 1) % len(enc)])) for k in range(len(enc))])

    # walled and ribbon shares
    if enc:
        nin = sum(inside)
        out['walled.share'] = {'value': nin / len(B) if B else None, 'inside': nin, 'n': len(B)}
        ways = [f['geometry']['coordinates'] for f in by.get('way', []) if f['props'].get('class') == 'arterial']
        wsegs = [(w[k], w[k + 1]) for w in ways for k in range(len(w) - 1)]
        SG = {}; sc = 100.0
        for si, (a, b) in enumerate(wsegs):
            for gx in range(int(min(a[0], b[0]) // sc), int(max(a[0], b[0]) // sc) + 1):
                for gy in range(int(min(a[1], b[1]) // sc), int(max(a[1], b[1]) // sc) + 1):
                    SG.setdefault((gx, gy), []).append(si)
        ext = [i for i in range(len(B)) if not inside[i]]
        hit = 0
        for i in ext:
            x, y = C[i]; ok = False
            for gx in range(int((x - RIBBON_M) // sc), int((x + RIBBON_M) // sc) + 1):
                for gy in range(int((y - RIBBON_M) // sc), int((y + RIBBON_M) // sc) + 1):
                    for si in SG.get((gx, gy), ()):
                        if dseg((x, y), *wsegs[si]) <= RIBBON_M:
                            ok = True; break
                    if ok: break
                if ok: break
            hit += ok
        out['ribbon.share'] = ({'value': hit / len(ext), 'within': hit, 'extramural': len(ext)} if ext
                               else 'notApplicable')
        out['walledHa'] = abs(sarea(enc)) / 1e4
    else:
        out['walled.share'] = out['ribbon.share'] = 'notApplicable'

    # anchors
    da = [abs(sarea(open_ring(f['geometry']['coordinates'][0]))) / 1e4 for f in by.get('district', [])]
    out['district.area'] = {'median': statistics.median(da) if da else None, 'min': min(da, default=None),
                            'max': max(da, default=None), 'n': len(da)}
    sq = [open_ring(f['geometry']['coordinates'][0]) for f in by.get('square', [])]
    out['plaza.area'] = {'value': max(abs(sarea(q)) for q in sq) / 1e4} if sq else 'notApplicable'
    cs = [open_ring(f['geometry']['coordinates'][0]) for f in by.get('castle', [])]
    if cs:
        big = max(cs, key=lambda r: abs(sarea(r)))
        out['castle.area'] = {'value': sum(abs(sarea(r)) for r in cs) / 1e4, 'polygons': len(cs)}
        out['castle.compact'] = {'value': 4 * math.pi * abs(sarea(big)) / perim(big) ** 2}
    else:
        out['castle.area'] = out['castle.compact'] = 'notApplicable'
    out['quarter.count'] = {'value': len(da)}
    gates = by.get('gate', [])
    out['gate.count'] = {'value': sum(1 for g in gates if g['props'].get('class') == 'land'),
                         'water': sum(1 for g in gates if g['props'].get('class') == 'water')}
    towers = {tuple(f['geometry']['coordinates']) for f in by.get('tower', [])}
    gate_pts = {tuple(g['geometry']['coordinates']) for g in gates}
    out['towers'] = {'value': len(towers), 'city': len(mi['research']['towersCity']),
                     'castle': sum(len(t) for t in mi['research']['towersCastle'])}
    out['shoreVertices'] = len(mi['research']['shoreVertices'])

    def spacings(nodes_of):
        sp = []
        for s in curt:
            closed_ = len(s) > 2 and s[0] == s[-1]
            pts = s[:-1] if closed_ else s
            m = len(pts)
            cum = [0.0]
            for k in range(1, len(s)):
                cum.append(cum[-1] + math.dist(s[k - 1], s[k]))
            total = cum[-1]
            idx = [k for k in range(m) if nodes_of(pts, k, closed_)]
            for a, b in zip(idx, idx[1:]):
                sp.append(cum[b] - cum[a])
            if closed_ and idx:
                sp.append(total - cum[idx[-1]] + cum[idx[0]])
        return sp

    def turn_deg(pts, k, closed_):
        m = len(pts)
        if not closed_ and (k == 0 or k == m - 1):
            return 0.0
        a, b, c = pts[(k - 1) % m], pts[k], pts[(k + 1) % m]
        h1 = math.atan2(b[1] - a[1], b[0] - a[0]); h2 = math.atan2(c[1] - b[1], c[0] - b[0])
        d = abs((h2 - h1 + math.pi) % (2 * math.pi) - math.pi)
        return math.degrees(d)

    if curt:
        ns = spacings(lambda p, k, c: tuple(p[k]) in towers or tuple(p[k]) in gate_pts or turn_deg(p, k, c) >= TURN_NODE_DEG)
        ts = spacings(lambda p, k, c: tuple(p[k]) in towers)
        out['wall.nodeSpacing'] = {'p50': pct(ns, 0.5), 'n': len(ns)}
        out['wall.towerSpacing'] = {'p50': pct(ts, 0.5), 'n': len(ts)}
    else:
        out['wall.nodeSpacing'] = out['wall.towerSpacing'] = 'notApplicable'
    out['wallRingVertices'] = len(mi['research']['cityRing'] or [])
    out['wallVertexSpacingP50'] = (pct([math.dist(r[i], r[(i + 1) % len(r)]) for r in [enc]
                                        for i in range(len(r))], 0.5) if enc else None)

    # markets
    def shared_len(p, q):
        tot = 0.0
        for i in range(len(p)):
            a, b = p[i], p[(i + 1) % len(p)]
            L = math.dist(a, b)
            if L == 0:
                continue
            k = max(1, int(L / 0.25))
            on = sum(1 for s in range(k) if min(dseg((a[0] + (b[0] - a[0]) * (s + 0.5) / k, a[1] + (b[1] - a[1]) * (s + 0.5) / k),
                                                      q[j], q[(j + 1) % len(q)]) for j in range(len(q))) <= 0.5)
            tot += L * on / k
        return tot
    mk = [open_ring(f['geometry']['coordinates'][0]) for f in by.get('square', []) if f['props'].get('class') == 'market']
    adj = sum(1 for i in range(len(mk)) for j in range(i + 1, len(mk)) if shared_len(mk[i], mk[j]) >= 0.5)
    out['market.secondary'] = {'value': max(0, len(mk) - 1), 'squares': len(mk)}
    out['market.adjacent'] = {'value': adj}

    # barrier share and the gate law
    if enc:
        cl = sum(perim(c, closed=False) for c in clos)
        out['wall.barrierShare'] = {'value': cl / perim(enc)}
        n_land = half_up(1 + 0.47 * math.sqrt(out['walledHa']))
        law = n_land
        if out['wall.barrierShare']['value'] >= 0.1:
            law = min(n_land, 2 + half_up(0.75 * (n_land - 2)))
        req = out['options'].get('gates', -1)
        expect = req if req is not None and req >= 0 else law
        out['gateLaw'] = {'requested': req if req is not None and req >= 0 else None, 'landLaw': n_land, 'law': law,
                          'expected': expect, 'measured': out['gate.count']['value'],
                          'hit': expect == out['gate.count']['value'], 'waterfront': out['wall.barrierShare']['value'] >= 0.1}
    return out


# ---------------------------------------------------------------- D28: draw census
def luma(h):
    h = h.lstrip('#')
    if len(h) != 6:
        return None
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0.299 * r + 0.587 * g + 0.114 * b


def draw_census(path, wall_w=7.6 / 4):
    rec = json.load(open(path))['rec']
    lw = {float(k): v for k, v in rec['lineWidths'].items()}
    t = max(lw.items(), key=lambda kv: kv[1])[0]
    styles = [s for s in rec['strokeStyles'] if luma(s) is not None]
    dark = min(styles, key=luma)
    strokes = [e for e in rec['log'] if e[1] == 'stroke']
    dark_w = sorted({round(float(e[5]), 3) for e in strokes if e[3] == dark})
    core_w = sorted({round(float(e[5]), 3) for e in strokes if e[3] != dark and abs(float(e[5]) - t) > 0.0005})
    paired = [c for c in core_w if any(abs(w - c - 2 * t) <= CASING_TOL for w in dark_w)]
    uncased = [c for c in core_w if c not in paired and not any(c < w <= c + 4 * t for w in dark_w)]
    violations = [c for c in core_w if c not in paired and c not in uncased]
    unpaired_dark = [w for w in dark_w if w > t + 0.0005 and not any(abs(w - c - 2 * t) <= CASING_TOL for c in core_w)]
    in_log = {round(float(e[5]), 3) for e in strokes}
    unlogged = sorted(w for w in lw if round(w, 3) not in in_log)
    joins = rec['lineJoins']; caps = rec['lineCaps']
    # walls after buildings: the first wall stroke after the last roof fill (the most frequent non-dark fill style)
    fills = [(k, e) for k, e in enumerate(rec['log']) if e[1] == 'fill']
    nd = {}
    for _, e in fills:
        if e[3] != dark:
            nd[e[3]] = nd.get(e[3], 0) + 1
    roof = max(nd.items(), key=lambda kv: kv[1])[0] if nd else None
    last_roof = max((k for k, e in fills if e[3] == roof), default=None)
    first_wall = min((k for k, e in enumerate(rec['log']) if e[1] == 'stroke' and e[3] == dark and abs(float(e[5]) - wall_w) < 0.0005),
                     default=None)
    wab = None if rec['logDropped'] or first_wall is None or last_roof is None else first_wall > last_roof
    return {'t': t, 'cores': core_w, 'coresPaired': len(paired), 'coresTotal': len(core_w), 'coresUncased': uncased,
            'casingViolations': violations, 'casingLaw': (not violations and bool(paired)) if core_w else None,
            'unpairedDarkWidths': unpaired_dark, 'widthsNotInLog': unlogged, 'logDropped': rec['logDropped'],
            'roundJoins': joins.get('round', 0), 'joins': sum(joins.values()), 'roundCaps': caps.get('round', 0), 'caps': sum(caps.values()),
            'wallsAfterBuildings': wab}


def svg_scale(path):
    head = open(path, encoding='utf8').read(20000)
    m = re.search(r'<g transform="translate\(([-\d.]+)[ ,]([-\d.]+)\) scale\(([-\d.]+)', head)
    return float(m.group(3)) if m else None


def matched_widths(stem):
    J = json.load(open(os.path.join(EXPORTS, stem + '.json')))
    F = {f['id']: f for f in J['features']}
    v = F['values'].get('properties', F['values'])
    s = svg_scale(os.path.join(EXPORTS, stem + '.svg'))
    pxm = s / 4.0
    pw = sorted({g.get('width') for g in F['planks']['geometries']}) or [4.8]
    return {'svgScale': s, 'pxPerM': pxm, 'wall': v['wallThickness'] * pxm, 'tower': 2 * v['towerRadius'] * pxm,
            'roadCore': v['roadWidth'] * pxm, 'pier': pw[0] * pxm}


# ---------------------------------------------------------------- D24 cross-check: the coverage call counts
def market_coverage():
    """Per recorded generation, how many markets the app created and how many market geometries it built (the
    coverage pass's call counts; record E07 section D24). Numbers only leave this function."""
    res = {}
    for cap in DRAW_CAPTURES:
        cd = os.path.join(ROOT, 'captures', 'mfcg', cap, 'coverage')
        for g in sorted(x for x in os.listdir(cd) if x.endswith('.calls.json')):
            calls = {e['label']: e['calls'] for e in json.load(open(os.path.join(cd, g)))}
            made = sum(v for k, v in calls.items() if k.endswith('wards.Market.new'))
            built = sum(v for k, v in calls.items() if k.endswith('wards.Market.createGeometry'))
            res[f'{cap}/{g[:-11]}'] = {'marketWardsCreated': made, 'marketGeometriesBuilt': built}
    return res


# ---------------------------------------------------------------- time.model
def stage_ms(d):
    spec = importlib.util.spec_from_file_location('mfcg_sweep_stats', os.path.join(SWEEP, 'stats.py'))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    res = {}
    for line in open(os.path.join(d, 'export-log.jsonl')):
        r = json.loads(line)
        if not r.get('downloads') or not str(r['downloads'][0].get('suggestedFilename', '')).endswith('.json'):
            continue
        st = 0; att = 0
        for c in r['console']:
            if '-->> seed' in c['text']:
                att += 1
            m = mod.STAGE.search(c['text'])
            if m:
                st += int(m.group(2))
        res[r['name']] = {'genMs': st, 'attempts': att}
    return res


# ---------------------------------------------------------------- the held outputs, parsed
def held_orient():
    v = {}
    for line in open(os.path.join(BENCH, 'mfcg_orient.out')):
        m = re.match(r'(\S+) r=(\d+) m: median R4=([\d.]+)', line)
        if m:
            v[(m.group(1), int(m.group(2)))] = float(m.group(3))
    return v


def held_wallalign():
    v = {}
    for line in open(os.path.join(BENCH, 'mfcg_wallalign.out')):
        m = re.match(r'(\S+) (\d+)-(\d+) m from wall: n=(\d+) median dev ([\d.]+) deg; share <=15 deg (\d+)%', line)
        if m:
            v[(m.group(1), int(m.group(2)))] = (int(m.group(4)), float(m.group(5)), int(m.group(6)))
    return v


def held_ribbon():
    v = {}
    for line in open(os.path.join(BENCH, 'mfcg_ribbon.out')):
        m = re.match(r'(\S+): extramural (\d+)/(\d+) .* 100 m (\d+)%', line)
        if m:
            v[m.group(1)] = (int(m.group(2)), int(m.group(3)), int(m.group(4)))
    return v


def held_statsmd(d=SWEEP, prefix='| size-'):
    rows = {}
    lines = open(os.path.join(d, 'stats.md')).read().splitlines()
    hdr = None
    for ln in lines:
        if ln.startswith('| file |'):
            hdr = [h.strip() for h in ln.strip('|').split('|')]
        elif hdr and ln.startswith(prefix):
            cells = [c.strip() for c in ln.strip('|').split('|')]
            rows[cells[0]] = dict(zip(hdr, cells))
    return rows


def held_castles(d=SWEEP, pattern=r"- `(size-[^`]+)` \S+: .*castle ([\d.]+) ha"):
    """the castle hectares of stats.md's per-file lines (numbers only leave this function)"""
    v = {}
    for ln in open(os.path.join(d, 'stats.md')):
        m = re.match(pattern, ln)
        if m:
            v[m.group(1)] = m.group(2)
    return v


def rerun_held(script, cwd):
    p = subprocess.run([sys.executable, '-B', os.path.join(BENCH, script)], cwd=cwd, capture_output=True, text=True)
    return p.stdout


# ---------------------------------------------------------------- W-07b: R-23's cells and T-V12-6's cover on one MeasureInput
def law_population(lots):
    """section 13.5's population row: six persons per lot, the total rounded up to two significant figures"""
    p = 6 * lots
    if p <= 0:
        return 0
    e = 10 ** max(0, len(str(p)) - 2)
    return -(-p // e) * e


def kept_spacings(pts, closed_):
    """arc spacings between consecutive vertices turning >= 1 degree (an open line's two ends always kept)"""
    n = len(pts)
    if n < 2:
        return []
    keep = []
    for i in range(n):
        if not closed_ and (i == 0 or i == n - 1):
            keep.append(i); continue
        a, v, b = pts[i - 1], pts[i], pts[(i + 1) % n]
        h1 = math.atan2(v[1] - a[1], v[0] - a[0]); h2 = math.atan2(b[1] - v[1], b[0] - v[0])
        if abs((math.degrees(h2 - h1) + 180.0) % 360.0 - 180.0) >= WATER_TURN_DEG:
            keep.append(i)
    arc = [0.0]
    for i in range(n if closed_ else n - 1):
        arc.append(arc[-1] + math.dist(pts[i], pts[(i + 1) % n]))
    if closed_:
        return [((arc[keep[(k + 1) % len(keep)]] - arc[keep[k]]) % arc[-1]) if len(keep) > 1 else arc[-1]
                for k in range(len(keep))]
    return [arc[keep[k + 1]] - arc[keep[k]] for k in range(len(keep) - 1)]


def seg_x(p, q, a, b):
    rx, ry = q[0] - p[0], q[1] - p[1]; sx, sy = b[0] - a[0], b[1] - a[1]
    den = rx * sy - ry * sx
    if abs(den) < 1e-12:
        return None
    t = ((a[0] - p[0]) * sy - (a[1] - p[1]) * sx) / den
    u = ((a[0] - p[0]) * ry - (a[1] - p[1]) * rx) / den
    if -1e-9 <= t <= 1 + 1e-9 and -1e-9 <= u <= 1 + 1e-9:
        return (p[0] + t * rx, p[1] + t * ry)
    return None


def wall_ungated(curt, ways, gates):
    if not curt:
        return 'notApplicable'
    csegs = [(s[k], s[k + 1]) for s in curt for k in range(len(s) - 1)]
    cell = 100.0; G = {}
    for ci, (a, b) in enumerate(csegs):
        for gx in range(int(min(a[0], b[0]) // cell), int(max(a[0], b[0]) // cell) + 1):
            for gy in range(int(min(a[1], b[1]) // cell), int(max(a[1], b[1]) // cell) + 1):
                G.setdefault((gx, gy), []).append(ci)
    proper = []
    for w in ways:
        for k in range(len(w) - 1):
            p, q = w[k], w[k + 1]
            cand = set()
            for gx in range(int(min(p[0], q[0]) // cell), int(max(p[0], q[0]) // cell) + 1):
                for gy in range(int(min(p[1], q[1]) // cell), int(max(p[1], q[1]) // cell) + 1):
                    cand.update(G.get((gx, gy), ()))
            for ci in sorted(cand):
                a, b = csegs[ci]
                x = seg_x(p, q, a, b)
                if x is None or min(math.dist(x, p), math.dist(x, q), math.dist(x, a), math.dist(x, b)) <= NEAR:
                    continue
                if not any(math.dist(x, y) <= NEAR for y in proper):
                    proper.append(x)
    VG = {}
    for wi, w in enumerate(ways):
        for k, x in enumerate(w):
            VG.setdefault((int(x[0] // cell), int(x[1] // cell)), []).append((wi, k))
    gated = ungated = 0
    for s in curt:
        closed_ = len(s) > 2 and s[0] == s[-1]
        pts = s[:-1] if closed_ else s
        m = len(pts)
        for i in range(m):
            if not closed_ and (i == 0 or i == m - 1):
                continue                      # an open stretch's end has no two sides (measure_ftg.py: interior vertices)
            v = pts[i]
            arms = []
            for gx in (int(v[0] // cell) - 1, int(v[0] // cell), int(v[0] // cell) + 1):
                for gy in (int(v[1] // cell) - 1, int(v[1] // cell), int(v[1] // cell) + 1):
                    for wi, k in VG.get((gx, gy), ()):
                        x = ways[wi][k]
                        if abs(x[0] - v[0]) < NEAR and abs(x[1] - v[1]) < NEAR:
                            if k > 0:
                                arms.append(ways[wi][k - 1])
                            if k < len(ways[wi]) - 1:
                                arms.append(ways[wi][k + 1])
            if not arms:
                continue
            a, b = pts[(i - 1) % m], pts[(i + 1) % m]
            w1 = math.degrees(math.atan2(a[1] - v[1], a[0] - v[0])) % 360
            w2 = math.degrees(math.atan2(b[1] - v[1], b[0] - v[0])) % 360
            span = (w2 - w1) % 360
            sides = set()
            for x in arms:
                ang = (math.degrees(math.atan2(x[1] - v[1], x[0] - v[0])) - w1) % 360
                if ang < 1e-9 or abs(ang - span) < 1e-9:
                    continue
                sides.add(0 if ang < span else 1)
            if len(sides) == 2:
                if any(abs(g[0] - v[0]) < NEAR and abs(g[1] - v[1]) < NEAR for g in gates):
                    gated += 1
                else:
                    ungated += 1
    return {'value': len(proper) + ungated, 'properCrossings': len(proper), 'vertexCrossingsAtNoGate': ungated,
            'gatedCrossings': gated}


def measure_extra(mi):
    fs = mi['features']
    by = {}
    for f in fs:
        by.setdefault(f['kind'], []).append(f)
    B = [open_ring(f['geometry']['coordinates'][0]) for f in by.get('building', [])]
    A = [abs(sarea(r)) for r in B]
    C = [centroid(r) for r in B]
    out = {}
    enc = [open_ring(f['geometry']['coordinates'][0]) for f in by.get('enclosure', [])]
    enc = enc[0] if enc else None
    if enc:
        inside = [pip(c, enc) for c in C]
        out['fg.coverWalled'] = {'value': sum(a for a, i in zip(A, inside) if i) / abs(sarea(enc)), 'inside': sum(inside)}
    else:
        out['fg.coverWalled'] = 'notApplicable'
    out['bldg.area'] = {'median': pct(A, 0.5), 'p95': pct(A, 0.95), 'n': len(A)} if A else 'notApplicable'
    sp = []
    for f in by.get('water', []):
        sp.extend(kept_spacings(open_ring(f['geometry']['coordinates'][0]), True))
    out['water.step'] = {'value': pct(sp, 0.5), 'n': len(sp), 'polygons': len(by.get('water', []))} if sp else 'notApplicable'
    riv = by.get('river', [])
    if riv:
        ws = [f['props'].get('widthM') for f in riv if f['props'].get('widthM') is not None]
        rs = [x for f in riv for x in kept_spacings(f['geometry']['coordinates'], False)]
        out['water.riverWidth'] = {'value': pct(ws, 0.5) if ws else None, 'courses': len(riv),
                                   'centrelineStepResearch': pct(rs, 0.5)}
    else:
        out['water.riverWidth'] = 'notApplicable'
    curt = [f['geometry']['coordinates'] for f in by.get('wall', []) if f['props'].get('class') == 'curtain']
    ways = [f['geometry']['coordinates'] for f in by.get('way', [])
            if f['props'].get('class') == 'arterial' and f['props'].get('part', 0) == 0]
    gates = [tuple(g['geometry']['coordinates']) for g in by.get('gate', [])]
    out['wall.ungated'] = wall_ungated(curt, ways, gates)
    pop = law_population(len(B))
    out['pop.perBuilding'] = {'value': pop / len(B), 'population': pop, 'lots': len(B), 'populationSource': 'law'} if B \
        else 'notApplicable'
    return out


# ---------------------------------------------------------------- W-07b: the families, the summaries and the checker column
SCALARS = [   # (metric id, the per-seed statistic's path in measure() / measure_extra()'s output)
    ('bldg.r4.60', 'median'), ('bldg.r4.120', 'median'), ('bldg.r4.250', 'median'),
    ('walled.share', 'value'), ('ribbon.share', 'value'),
    ('district.area', 'median'), ('plaza.area', 'value'), ('castle.area', 'value'), ('castle.compact', 'value'),
    ('wall.nodeSpacing', 'p50'), ('quarter.count', 'value'), ('gate.count', 'value'), ('wall.towerSpacing', 'p50'),
    ('market.secondary', 'value'), ('market.adjacent', 'value'),
    ('bldg.area', 'median'), ('bldg.area', 'p95'), ('pop.perBuilding', 'value'),
    ('water.step', 'value'), ('water.riverWidth', 'value'), ('wall.ungated', 'value'), ('wall.barrierShare', 'value'),
    ('fg.coverWalled', 'value'),
]
BAND_KEYS = ('b0_40', 'b40_100', 'b100_200')
SERVES = {   # plan section 1: which deliverable each summary serves, and from which family (R-12, R-23, V12 3.4.4)
    'plain': {'D7': ['bldg.r4.60', 'bldg.r4.120', 'bldg.r4.250', 'bldg.wallAlign.median', 'bldg.wallAlign.share15'],
              'D8': ['walled.share', 'ribbon.share'],
              'D9': ['district.area', 'plaza.area', 'castle.area', 'castle.compact', 'wall.nodeSpacing', 'quarter.count',
                     'gate.count', 'wall.towerSpacing'],
              'D24': ['market.secondary', 'market.adjacent'],
              'D35': ['bldg.area', 'bldg.area.p95', 'pop.perBuilding'],
              'W-08 (reported here as T-V12-6 clause only)': ['fg.coverWalled']},
    'river+coast': {'D35': ['water.step', 'water.riverWidth', 'wall.ungated', 'wall.barrierShare', 'gate.count'],
                    'descriptive (the stress variant; F1 / DC-14 for wall alignment)': ['every other summary']},
}


def estimate(xs):
    """V12 section 3.5.1: single at n = 1, minmax at 2-9, type7 (p10 / p90) at n >= 10; the centre is the median"""
    n = len(xs)
    if n == 0:
        return None
    if n == 1:
        return {'estimator': 'single', 'n': 1, 'a': xs[0], 'b': xs[0], 'c': xs[0]}
    if n < 10:
        return {'estimator': 'minmax', 'n': n, 'a': min(xs), 'b': max(xs), 'c': pct(xs, 0.5)}
    return {'estimator': 'type7', 'n': n, 'a': pct(xs, 0.1), 'b': pct(xs, 0.9), 'c': pct(xs, 0.5)}


def stat_of(p, metric, key):
    v = p.get(metric)
    if not isinstance(v, dict):
        return None
    return v.get(key)


def summarise(per, stems):
    rows = {}
    for metric, key in SCALARS:
        mid = metric + ('.p95' if key == 'p95' else '')
        vals = [(s, stat_of(per[s], metric, key)) for s in stems]
        xs = [v for _, v in vals if v is not None]
        e = estimate(xs) or {'estimator': None, 'n': 0}
        e['seeds'] = [s for s, v in vals if v is not None]
        e['notApplicable'] = [s for s, v in vals if v is None]
        rows[mid] = e
    for metric, key in (('bldg.wallAlign.median', 'median'), ('bldg.wallAlign.share15', 'share15')):
        comp = {}
        for b in BAND_KEYS:
            vals = [(s, per[s]['bldg.wallAlign'][b][key] if isinstance(per[s].get('bldg.wallAlign'), dict) else None)
                    for s in stems]
            xs = [v for _, v in vals if v is not None]
            e = estimate(xs) or {'estimator': None, 'n': 0}
            e['seeds'] = [s for s, v in vals if v is not None]
            e['notApplicable'] = [s for s, v in vals if v is None]
            comp[b] = e
        rows[metric] = comp
    return rows


def plan_families():
    """plan.json's MFCG families and the sweep's export-check.json sample -> label, stems, usable, failed"""
    plan = json.load(open(PLAN_JSON))
    chk = json.load(open(os.path.join(M1_DIR, 'export-check.json')))['sample']
    fams = {}
    for f in plan['families']:
        if f.get('reference') != 'MFCG':
            continue
        lab = f['family']; size = f['setting']['mfcgSize']; opt = f['setting']['options']
        stem_of = lambda i: f"size{size}-{'plain' if opt == 'plain' else 'rivercoast'}-{i}"
        lo, hi = f['indices']
        s = chk[lab]
        failed = s['failed']
        failed_stems = {stem_of(int(x['label'].rsplit('/', 1)[1])) for x in failed}
        usable = [stem_of(i) for i in range(lo, hi) if stem_of(i) in s['captured'] and stem_of(i) not in failed_stems]
        fams[lab] = {'family': lab, 'size': size, 'options': opt, 'rung': f['setting']['rung'], 'purpose': f['purpose'],
                     'indices': [lo, hi], 'declaredN': (f.get('extension') or {}).get('declaredN', hi - lo),
                     'captured': s['captured'], 'usable': usable, 'usableCount': s['usable'],
                     'failed': [{k: v for k, v in x.items() if k in ('label', 'reason', 'loads', 'attempts', 'filesKept')}
                                for x in failed],
                     'failedStems': sorted(failed_stems)}
    return fams


def attempts_m1():
    att = {}
    for line in open(os.path.join(M1_DIR, 'export-log.jsonl')):
        r = json.loads(line)
        if r.get('jsonOk') or r.get('downloads'):
            att[r['name']] = r.get('attempts')
    j = os.path.join(M1_DIR, 'j161', 'export-log.jsonl')
    for line in open(j):
        r = json.loads(line)
        if r.get('jsonOk') and r.get('name') not in att:
            att[r['name']] = r.get('attempts')
    return att


def main_plan(out_json, red):
    files = sorted(f for f in os.listdir(INPUTS) if f.endswith('.metric.geojson.gz'))
    per, fxper = {}, {}
    for f in files:
        cap = f[:-len('.metric.geojson.gz')]
        folder, stem = cap.split('.', 1)
        mi = read_mi(os.path.join(INPUTS, f))
        m = measure(mi, f'{folder}/{stem}')
        m.update(measure_extra(mi))
        m['research'] = {'census': mi['research']['census'], 'optionsFrom': mi['research'].get('optionsFrom', 'export-log.jsonl')}
        if folder == M1_FOLDER:
            per[stem] = m
        elif folder in FIXTURE_FOLDERS:
            fxper[f'{folder}/{stem}'] = m
    fams = plan_families()
    att = attempts_m1()
    rows, gate_law = {}, {}
    for lab, fm in fams.items():
        rows[lab] = summarise(per, fm['usable'])
        gl = [(s, per[s]['gateLaw']) for s in fm['usable']]
        gate_law[lab] = {'hits': sum(1 for _, g in gl if g['hit']), 'n': len(gl),
                         'perSeed': {s: {k: g[k] for k in ('landLaw', 'law', 'measured', 'hit', 'waterfront')} for s, g in gl},
                         'waterGates': {s: per[s]['gate.count']['water'] for s in fm['usable']}}
        excluded = [s for s in fm['failedStems'] if s in per]
        fm['measuredButExcluded'] = excluded
    stress = fams['capture/MFCG/80/river+coast']
    time_worst = {'note': 'MFCG time.worst is a descriptive row with values.n 0 (R-44); its note carries the stress seeds\' '
                          'generation attempts (the export logs\' attempt counts; the retries are sample.failed, reason retry)',
                  'stressAttempts': {s: att.get(s) for s in stress['captured']},
                  'stressCities': len(stress['captured']),
                  'stressAttemptsTotal': sum(att.get(s) or 0 for s in stress['captured']),
                  'plainAttempts': {lab: sorted({att.get(s) for s in fm['usable']}, key=lambda x: (x is None, x or 0)) for lab, fm in fams.items() if fm['options'] == 'plain'}}

    # ------------------------------------------------ printing (compact)
    print('== W-07b: per-family summaries (V12 3.5.1 estimators over the usable seeds; measured values, not rows)')
    def fmt(e, d=3):
        if not e or e.get('c') is None:
            return 'n/a'
        return f"{e['c']:.{d}f} [{e['a']:.{d}f}, {e['b']:.{d}f}] {e['estimator']} n {e['n']}" + (f" na {len(e['notApplicable'])}" if e['notApplicable'] else '')
    for lab, fm in fams.items():
        r = rows[lab]
        print(f"-- {lab} ({fm['rung']}, {fm['purpose']}): usable {len(fm['usable'])} of indices {fm['indices']}; failed "
              + ', '.join(f"{x['label'].rsplit('/', 1)[1]} {x['reason']}" for x in fm['failed']) if fm['failed'] else
              f"-- {lab} ({fm['rung']}, {fm['purpose']}): usable {len(fm['usable'])} of indices {fm['indices']}; failed none")
        for mid in [m + ('.p95' if k == 'p95' else '') for m, k in SCALARS]:
            print(f"   {mid}: {fmt(r[mid], 4)}")
        for mid in ('bldg.wallAlign.median', 'bldg.wallAlign.share15'):
            print(f"   {mid}: " + ' | '.join(f"{b} {fmt(r[mid][b], 3)}" for b in BAND_KEYS))
        g = gate_law[lab]
        print(f"   gate law hits {g['hits']}/{g['n']}: " + '; '.join(f"{s.rsplit('-', 1)[1]} {v['measured']} vs {v['law']}{' wf' if v['waterfront'] else ''}"
                                                          for s, v in g['perSeed'].items()))
    print('time.worst note: stress attempts ' + str(time_worst['stressAttempts']) + f"; plain {time_worst['plainAttempts']}")

    result = {'schema': 'research.e07-plan/1', 'script': SCRIPT, 'lane': 'm1/W-07b', 'referenceBuild': REFERENCE_BUILD,
              'inputs': os.path.relpath(INPUTS, ROOT), 'sweep': os.path.relpath(M1_DIR, ROOT),
              'families': fams, 'perSeed': per, 'summaries': rows, 'serves': SERVES, 'gateLaw': gate_law,
              'timeWorstNote': time_worst,
              'fixturesExtra': {k: {m: v[m] for m in ('fg.coverWalled', 'bldg.area', 'buildings', 'walled.share')} for k, v in fxper.items()},
              'checks': []}

    # ------------------------------------------------ the W-07b checker column
    fails = 0
    def ck(name, ok, detail):
        nonlocal fails
        fails += (not ok)
        result['checks'].append({'check': name, 'passed': bool(ok), 'detail': detail})
        print(f"{'PASS' if ok else 'FAIL'} {name}: {detail}")
    fx = lambda s: fxper[f'exports-2026-09-25/{s}']
    # T-V12-6 (1) the five fixture covers to three decimals, printed (R-24)
    got = [f"{fx(s)['fg.coverWalled']['value']:.3f}" for s in FIXTURES]
    want = list(COVERS)
    if red:
        want[0] = '0.658'
    ck('T-V12-6 gross cover of the five fixtures to three decimals 0.657 / 0.582 / 0.621 / 0.583 / 0.569', got == want,
       ' / '.join(f"{fx(s)['fg.coverWalled']['value']:.5f} -> {g}" for s, g in zip(FIXTURES, got)))
    # (2) walled shares two decimals, (3) gates exact, (4) towers on the dry cities
    got = [fx(s)['walled.share']['value'] for s in FIXTURES]
    ck('T-V12-6 walled 0.98 / 0.97 / 0.92 / 0.82 / 0.30 to two decimals', [f'{v:.2f}' for v in got] == ['0.98', '0.97', '0.92', '0.82', '0.30'],
       ' / '.join(f'{v:.4f}' for v in got))
    got = [fx(s)['gate.count']['value'] for s in FIXTURES]
    ck('T-V12-6 city gates 0 / 1 / 4 / 9 / 7 exactly', got == [0, 1, 4, 9, 7], str(got))
    got = [fx(s)['towers']['value'] for s in FIXTURES[:4]]
    ck('T-V12-6 towers 33 / 32 / 29 / 24 on the dry cities', got == [33, 32, 29, 24], str(got))
    # (5) R4 within 0.02 of every per-city value of mfcg_orient.out
    ho = held_orient()
    allr4 = [(s, r, fx(s)[f'bldg.r4.{r}']['median'], v) for (s, r), v in sorted(ho.items())]
    ck('T-V12-6 R4 medians within 0.02 of every per-city value of mfcg_orient.out', all(abs(a - b) <= 0.02 for _, _, a, b in allr4),
       f'{len(allr4)} values, largest gap {max(abs(a - b) for _, _, a, b in allr4):.4f}; '
       + '; '.join(f'{s[8:]} r{r} {a:.3f} vs {b:.2f}' for s, r, a, b in allr4))
    # (6) wall alignment on the dry cities within one point of mfcg_wallalign.out. The held file holds three of the four
    #     dry fixtures (gates 0, 4 and 9: nine values); the gates-1 city has no held value, so it is printed, not compared
    #     (record E07 section 9, finding F5)
    hw = held_wallalign()
    dry = []
    for (s, lo), (n, med, sh) in sorted(hw.items()):
        if 'river' in s:
            continue
        w = fx(s)['bldg.wallAlign'][{0: 'b0_40', 40: 'b40_100', 100: 'b100_200'}[lo]]
        dry.append((s, lo, w['share15'] * 100, sh))
    held_dry = sorted({s for s, _, _, _ in dry})
    unheld = [s for s in FIXTURES[:4] if s not in held_dry]
    result['wallAlignUnheld'] = {s: {b: fx(s)['bldg.wallAlign'][b] for b in BAND_KEYS} for s in unheld}
    ck('T-V12-6 wall-alignment shares within one point of mfcg_wallalign.out on every dry city it holds (gates 0 / 4 / 9)',
       len(dry) == 9 and held_dry == ['s555001-size40-gates0', 's555001-size40-gates4', 's555001-size40-gates9']
       and all(abs(a - b) <= 1 for _, _, a, b in dry),
       f'{len(dry)} values, largest gap {max(abs(a - b) for _, _, a, b in dry):.2f} point; '
       + '; '.join(f'{s[8:]} {lo} {a:.1f} vs {b}' for s, lo, a, b in dry)
       + '; not held, printed only: ' + '; '.join(f"{s[8:]} " + ' / '.join(f"{fx(s)['bldg.wallAlign'][b]['share15'] * 100:.1f}%" for b in BAND_KEYS) for s in unheld))
    # (7) T-V12-6's sweep clause on the 2026-09-25 sweep: buildings, walled share, cover, median footprint, gates, districts,
    #     plaza and castle areas of every size exactly as its stats.md (and walled ha and the dry towers, as W-07 checked)
    sm = held_statsmd(); hc = held_castles(); bad = []; cells = 0
    sweep_caps = sorted([c for c in fxper if c.startswith('exports-sweep-2026-09-25/')],
                        key=lambda c: [int(t) if t.isdigit() else t for t in re.split(r'(\d+)', c)])
    for cap in sweep_caps:
        n = cap.split('/')[1]; p = fxper[cap]; r = sm[n]
        pairs = [('buildings', f"{p['buildings']:,}", r['buildings']), ('walled share', f"{p['walled.share']['value']:.2f}", r['walled share']),
                 ('cover in walls', f"{p['fg.coverWalled']['value']:.3f}", r['cover in walls']),
                 ('median m²', f"{p['bldg.area']['median']:.1f}", r['median m²']),
                 ('walled ha', f"{p['walledHa']:.2f}", r['walled ha']), ('gates', str(p['gate.count']['value']), r['gates']),
                 ('districts', str(p['quarter.count']['value']), r['districts']), ('plaza ha', f"{p['plaza.area']['value']:.3f}", r['plaza ha']),
                 ('castle ha', f"{p['castle.area']['value']:.3f}", hc[n])]
        if 'river' not in n:
            pairs.append(('towers', str(p['towers']['value']), r['towers']))
        cells += len(pairs)
        bad += [f'{n} {k} {a} vs {b}' for k, a, b in pairs if a != b]
    ck("T-V12-6 the 2026-09-25 sweep's stats.md: buildings, walled share, cover, median footprint, gates, districts, plaza and "
       "castle areas (and walled ha, dry towers) of every size exactly", not bad and len(sweep_caps) == 13,
       f'{len(sweep_caps)} sizes, {cells} cells, ' + ('all equal' if not bad else '; '.join(bad)))
    # (8) the M-1 sweep's stats.md equal for every captured file (the W-07b row's "the sweep's stats.md equal")
    sm1 = held_statsmd(M1_DIR, '| size'); hc1 = held_castles(M1_DIR, r"- `(size[^`]+)` .*?castle ([\d.]+) ha")
    bad, declared, cells = [], [], 0
    for stem in sorted(per, key=lambda x: [int(t) if t.isdigit() else t for t in re.split(r'(\d+)', x)]):
        p = per[stem]; r = sm1[stem]
        dropped = p['research']['census']['droppedPolygons']
        nb = p['buildings'] + dropped + (1 if (red and stem == 'size40-plain-0') else 0)
        if dropped:
            declared.append(f"{stem}: {dropped} zero-area footprint dropped by V12 3.2.2's degenerate rule (ours {p['buildings']:,}, stats.md {r['buildings']})")
        pairs = [('buildings', f"{nb:,}", r['buildings']), ('walled share', f"{p['walled.share']['value']:.2f}", r['walled share']),
                 ('walled ha', f"{p['walledHa']:.2f}", r['walled ha']), ('cover in walls', f"{p['fg.coverWalled']['value']:.3f}", r['cover in walls']),
                 ('median m²', f"{p['bldg.area']['median']:.1f}", r['median m²']), ('gates', str(p['gate.count']['value']), r['gates']),
                 ('districts', str(p['quarter.count']['value']), r['districts']), ('plaza ha', f"{p['plaza.area']['value']:.3f}", r['plaza ha']),
                 ('castle ha', f"{p['castle.area']['value']:.3f}", hc1[stem])]
        if 'rivercoast' not in stem:
            pairs.append(('towers', str(p['towers']['value']), r['towers']))
        if r.get('attempts') not in (None, '–'):
            pairs.append(('attempts', str(att.get(stem)), r['attempts']))
        cells += len(pairs)
        bad += [f'{stem} {k} {a} vs {b}' for k, a, b in pairs if a != b]
    ck("the M-1 sweep's stats.md: buildings, walled share and ha, cover, median footprint, gates, dry towers, districts, plaza "
       "and castle ha, attempts, for every captured file", not bad and len(per) == len(sm1) == 35,
       f'{len(per)} files, {cells} cells, ' + ('all equal' if not bad else '; '.join(bad))
       + ('; declared: ' + '; '.join(declared) if declared else ''))
    result['statsDeclared'] = declared
    # (9) every usable seed in every summary, the sample's counts, and no failed seed in any summary
    want_usable = {'capture/MFCG/40/plain': 10 + (1 if red else 0), 'capture/MFCG/80/plain': 10, 'capture/MFCG/130/plain': 10,
                   'capture/MFCG/80/river+coast': 3}
    bad = []
    for lab, fm in fams.items():
        U = set(fm['usable'])
        if len(U) != want_usable[lab] or len(U) != fm['usableCount']:
            bad.append(f"{lab} usable {len(U)} (export-check {fm['usableCount']}, expected {want_usable[lab]})")
        if not all(s in per for s in U):
            bad.append(f"{lab} usable seed without a MeasureInput: {sorted(U - set(per))}")
        for mid, e in rows[lab].items():
            for ee in (e.values() if mid.startswith('bldg.wallAlign') else [e]):
                if set(ee['seeds']) | set(ee['notApplicable']) != U or len(ee['seeds']) + len(ee['notApplicable']) != len(U):
                    bad.append(f'{lab} {mid} seeds differ from the usable list')
                if set(ee['seeds']) & set(fm['failedStems']):
                    bad.append(f'{lab} {mid} holds a failed seed')
    na = {lab: sorted({f"{mid}: {len(e['notApplicable'])}" for mid, e in rows[lab].items()
                       if not mid.startswith('bldg.wallAlign') and e['notApplicable']}) for lab in fams}
    ck('every usable seed in every summary (10 / 10 / 10 / 3), no failed seed in any', not bad,
       'all ' + str(sum(len(r) for r in rows.values())) + ' summaries over ' + ' / '.join(str(len(fm['usable'])) for fm in fams.values())
       + ' usable seeds; notApplicable by design: ' + json.dumps(na) if not bad else '; '.join(bad))
    # (10) the failed indices listed, equal to the sweep's export-check and to plan.json's index ranges
    listed = {lab: [(x['label'], x['reason']) for x in fm['failed']] for lab, fm in fams.items()}
    want_failed = {'capture/MFCG/40/plain': [], 'capture/MFCG/80/plain': [],
                   'capture/MFCG/130/plain': [('capture/MFCG/130/plain/8', 'no-export')],
                   'capture/MFCG/80/river+coast': [('capture/MFCG/80/river+coast/1', 'retry'), ('capture/MFCG/80/river+coast/4', 'retry')]}
    cover = all(len(fm['usable']) + len(fm['failed']) == fm['indices'][1] - fm['indices'][0] for fm in fams.values())
    ck('the failed indices listed: 130/plain/8 no-export (2 loads); 80/river+coast/1 and /4 retry (measured, excluded)',
       listed == want_failed and cover,
       json.dumps(listed) + f'; usable + failed = every plan index: {cover}; measured but excluded: '
       + json.dumps({lab: fm['measuredButExcluded'] for lab, fm in fams.items() if fm['measuredButExcluded']}))
    # (11) the gate law's hits on the usable seeds, reported
    ck("the gate law's hits on the usable seeds, reported", True,
       '; '.join(f"{lab.split('/', 2)[2]} {g['hits']}/{g['n']}" for lab, g in gate_law.items()))
    # (12) D24 on the sweep: one square per usable file, secondary 0 and adjacent 0 (reference 0)
    sq = [(s, per[s]['market.secondary']['squares'], per[s]['market.secondary']['value'], per[s]['market.adjacent']['value'])
          for fm in fams.values() for s in fm['usable']]
    ck('D24 on the usable seeds: one square each, market.secondary 0 and market.adjacent 0', all(a == 1 and b == 0 and c == 0 for _, a, b, c in sq),
       f'{len(sq)} seeds; squares {sorted({a for _, a, _, _ in sq})}, secondary {sorted({b for _, _, b, _ in sq})}, adjacent {sorted({c for _, _, _, c in sq})}')
    # (13) receipts: the held red-team scripts still print their .out files
    for script, cwd in (('mfcg_orient.py', EXPORTS), ('mfcg_wallalign.py', EXPORTS), ('mfcg_ribbon.py', EXPORTS)):
        live = rerun_held(script, cwd)
        held = open(os.path.join(BENCH, script[:-3] + '.out')).read()
        ck(f'{script} re-run live equals its .out', live == held, f'{len(live.splitlines())} lines, identical={live == held}')
    print(f"{'ALL PASS' if not fails else f'{fails} FAIL'}")
    result['checksFailed'] = fails
    if out_json:
        with open(out_json, 'w') as fh:
            json.dump(result, fh, indent=1, sort_keys=True)
            fh.write('\n')
    return 1 if fails else 0


# ---------------------------------------------------------------- main
def main():
    args = sys.argv[1:]
    out_json = None
    if '--json' in args:
        i = args.index('--json'); out_json = args[i + 1]; del args[i:i + 2]
    check = '--check' in args; red = '--red' in args

    if '--plan' in args:
        return main_plan(out_json, red)
    files = sorted(f for f in os.listdir(INPUTS) if f.endswith('.metric.geojson.gz') and f.split('.', 1)[0] in FIXTURE_FOLDERS)
    per = {}
    for f in files:
        cap = f[:-len('.metric.geojson.gz')]
        folder, stem = cap.split('.', 1)
        per[f'{folder}/{stem}'] = measure(read_mi(os.path.join(INPUTS, f)), f'{folder}/{stem}')

    draws = {}
    for cap in DRAW_CAPTURES:
        dd = os.path.join(ROOT, 'captures', 'mfcg', cap, 'draw')
        for g in sorted(x for x in os.listdir(dd) if x.endswith('.draw.json')):
            draws[f'{cap}/{g[:-10]}'] = draw_census(os.path.join(dd, g))
    widths = {s: matched_widths(s) for s in FIXTURES[:4]}
    timing = stage_ms(SWEEP)
    timing_fx = stage_ms(EXPORTS)
    markets_cov = market_coverage()

    result = {'schema': 'research.e07/1', 'script': SCRIPT, 'referenceBuild': REFERENCE_BUILD,
              'inputs': os.path.relpath(INPUTS, ROOT), 'perSeed': per, 'draw': draws, 'matchedWidthsPx': widths,
              'timeModel': {'sweep-2026-09-25': timing, 'exports-2026-09-25': timing_fx}, 'marketCoverage': markets_cov}

    # ------------------------------------------------ printing (compact)
    def g(cap, key, sub=None):
        v = per[cap].get(key)
        if isinstance(v, dict):
            return v.get(sub) if sub else v
        return v
    print('== fixtures (exports-2026-09-25)')
    for s in FIXTURES:
        cap = f'exports-2026-09-25/{s}'; p = per[cap]
        wa = p['bldg.wallAlign']
        print(f"{s}: n {p['buildings']} R4 " + ' / '.join(f"{p[f'bldg.r4.{int(r)}']['median']:.4f}" for r in RADII)
              + f" | wallAlign " + ' / '.join(f"{wa[k]['share15'] * 100:.2f}% (med {wa[k]['median']:.2f}, n {wa[k]['n']})" for k in ('b0_40', 'b40_100', 'b100_200'))
              + f" | walled {p['walled.share']['value']:.4f} | ribbon {('%.4f' % p['ribbon.share']['value']) if isinstance(p['ribbon.share'], dict) else p['ribbon.share']}"
              + f" | gates {p['gate.count']['value']} (+{p['gate.count']['water']} water) towers {p['towers']['value']} shore {p['shoreVertices']}"
              + f" | districts {p['quarter.count']['value']} district ha med {p['district.area']['median']:.2f} [{p['district.area']['min']:.2f}, {p['district.area']['max']:.2f}]"
              + f" plaza {p['plaza.area']['value']:.4f} castle {p['castle.area']['value']:.4f} compact {p['castle.compact']['value']:.4f}"
              + f" node {p['wall.nodeSpacing']['p50']:.2f} tower {p['wall.towerSpacing']['p50']:.2f} barrier {p['wall.barrierShare']['value']:.4f}"
              + f" markets {p['market.secondary']['squares']} sec {p['market.secondary']['value']} adj {p['market.adjacent']['value']}")
    print('== sweep (exports-sweep-2026-09-25)')
    sweep_caps = sorted([c for c in per if c.startswith('exports-sweep-2026-09-25/')],
                        key=lambda c: [int(t) if t.isdigit() else t for t in re.split(r'(\d+)', c)])
    for cap in sweep_caps:
        p = per[cap]; gl = p.get('gateLaw', {})
        rb = p['ribbon.share']
        print(f"{cap.split('/')[1]}: n {p['buildings']} walled {p['walled.share']['value']:.4f} ({p['walledHa']:.2f} ha) ribbon "
              + (f"{rb['value']:.4f}" if isinstance(rb, dict) else rb)
              + f" R4 " + ' / '.join(f"{p[f'bldg.r4.{int(r)}']['median']:.3f}" for r in RADII)
              + f" gates {p['gate.count']['value']} law {gl.get('law')} ({'hit' if gl.get('hit') else 'MISS'}{', waterfront' if gl.get('waterfront') else ''})"
              + f" districts {p['quarter.count']['value']} med {p['district.area']['median']:.2f} [{p['district.area']['min']:.2f}, {p['district.area']['max']:.2f}] ha"
              + f" plaza {p['plaza.area']['value']:.3f} castle {p['castle.area']['value']:.3f} compact {p['castle.compact']['value']:.3f}"
              + f" node {p['wall.nodeSpacing']['p50']:.1f} vertex {p['wallVertexSpacingP50']:.1f} tower {p['wall.towerSpacing']['p50']:.1f}"
              + f" gen {timing.get(cap.split('/')[1], {}).get('genMs')} ms ({timing.get(cap.split('/')[1], {}).get('attempts')} att)")
    print('== draw census')
    for k, v in draws.items():
        print(f"{k}: t {v['t']} cores {v['coresPaired']}/{v['coresTotal']} uncased {v['coresUncased']} violations {v['casingViolations']} casingLaw {v['casingLaw']} unpaired-dark {v['unpairedDarkWidths']} "
              f"not-in-log {v['widthsNotInLog']} round joins {v['roundJoins']}/{v['joins']} caps {v['roundCaps']}/{v['caps']} "
              f"walls-after-buildings {v['wallsAfterBuildings']} (log dropped {v['logDropped']})")
    print('market coverage: ' + '; '.join(f"{k} {v['marketWardsCreated']}/{v['marketGeometriesBuilt']}" for k, v in markets_cov.items()))
    for s, w in widths.items():
        print(f"{s}: svg scale {w['svgScale']} px/m {w['pxPerM']:.4f} wall {w['wall']:.2f} tower {w['tower']:.2f} road core {w['roadCore']:.2f} pier {w['pier']:.2f} px")

    def dump():
        if out_json:
            with open(out_json, 'w') as fh:
                json.dump(result, fh, indent=1, sort_keys=True)
                fh.write('\n')

    if not check:
        dump()
        return 0
    result['checks'] = []

    # ------------------------------------------------ the checker column (W-07) and the runnable T-V12-6 / T-V12-32 clauses
    fails = 0
    def ck(name, ok, detail):
        nonlocal fails
        fails += (not ok)
        result['checks'].append({'check': name, 'passed': bool(ok), 'detail': detail})
        print(f"{'PASS' if ok else 'FAIL'} {name}: {detail}")
    fx = lambda s: per[f'exports-2026-09-25/{s}']
    # (1) R4 gates4 within 0.02 of 0.84 / 0.58 / 0.32
    want = [0.84 + (0.03 if red else 0), 0.58, 0.32]
    got = [fx('s555001-size40-gates4')[f'bldg.r4.{int(r)}']['median'] for r in RADII]
    ck('R4 gates4 60/120/250 within 0.02 of 0.84/0.58/0.32', all(abs(a - b) <= 0.02 for a, b in zip(got, want)),
       ' / '.join(f'{a:.4f} (diff {a - b:+.4f})' for a, b in zip(got, want)))
    ho = held_orient()
    allr4 = [(s, r, fx(s)[f'bldg.r4.{r}']['median'], v) for (s, r), v in sorted(ho.items())]
    ck('R4 every city of mfcg_orient.out within 0.02 (T-V12-6)', all(abs(a - b) <= 0.02 for _, _, a, b in allr4),
       '; '.join(f'{s[8:]} r{r} {a:.3f} vs {b:.2f}' for s, r, a, b in allr4))
    # (2) wall alignment gates0 87 / 70 / 58 % (T-V12-6: within one point)
    wa = fx('s555001-size40-gates0')['bldg.wallAlign']
    got = [wa[k]['share15'] * 100 for k in ('b0_40', 'b40_100', 'b100_200')]
    ck('wall alignment gates0 87/70/58 % within one point', all(abs(a - b) <= 1 for a, b in zip(got, [87, 70, 58])),
       ' / '.join(f'{a:.2f}%' for a in got))
    hw = held_wallalign()
    rows = []
    for (s, lo), (n, med, sh) in sorted(hw.items()):
        w = fx(s)['bldg.wallAlign'][{0: 'b0_40', 40: 'b40_100', 100: 'b100_200'}[lo]]
        rows.append((s, lo, w['share15'] * 100, sh, w['n'], n))
    dry = [r for r in rows if 'river' not in r[0]]
    ck('wall alignment every dry city and band of mfcg_wallalign.out within one point (T-V12-6)',
       all(abs(a - b) <= 1 for _, _, a, b, _, _ in dry), '; '.join(f'{s[8:]} {lo} {a:.1f} vs {b} (n {n1} vs {n2})' for s, lo, a, b, n1, n2 in dry))
    cz = fx('s777001-size80-river-coast'); rv = cz['bldg.wallAlign.ringVariant']
    coast = [(lo, cz['bldg.wallAlign'][k]['share15'] * 100, rv[k]['share15'] * 100, sh, cz['bldg.wallAlign'][k]['n'], rv[k]['n'], n)
             for (s, lo), (n, med, sh) in sorted(hw.items()) if 'river' in s for k in [{0: 'b0_40', 40: 'b40_100', 100: 'b100_200'}[lo]]]
    result['findingCoastalWallAlign'] = [{'bandLoM': lo, 'shoreSplitShare15': a, 'ringVariantShare15': b, 'held': h,
                                          'nSplit': na, 'nRing': nb, 'nHeld': nh} for lo, a, b, h, na, nb, nh in coast]
    print('FINDING (reported, not a W-07 row check) coastal city wall alignment: through the shore split (curtain = built stretches, '
          'V12 3.4.2) vs the whole ring (the red-team rule) vs mfcg_wallalign.out: '
          + '; '.join(f'{lo} m {a:.1f}% (n {na}) / {b:.1f}% (n {nb}) / {h}% (n {nh})' for lo, a, b, h, na, nb, nh in coast)
          + f"; ring variant within one point: {all(abs(b - h) <= 1 for _, _, b, h, _, _, _ in coast)}; split within one point: "
          + f"{all(abs(a - h) <= 1 for _, a, _, h, _, _, _ in coast)}")
    # (3) walled shares to two decimals
    got = [fx(s)['walled.share']['value'] for s in FIXTURES]
    ck('walled 0.98/0.97/0.92/0.82/0.30 to two decimals', [f'{v:.2f}' for v in got] == ['0.98', '0.97', '0.92', '0.82', '0.30'],
       ' / '.join(f'{v:.4f}' for v in got))
    # (4) gates exact
    got = [fx(s)['gate.count']['value'] for s in FIXTURES]
    ck('gates 0/1/4/9/7 exact', got == [0, 1, 4, 9, 7], str(got))
    # (5) towers on the dry cities
    got = [fx(s)['towers']['value'] for s in FIXTURES[:4]]
    want = [33 + (1 if red else 0), 32, 29, 24]
    ck('towers 33/32/29/24 exact (dry cities)', got == want, str(got))
    c = fx('s777001-size80-river-coast')
    ck('coastal city: 24 shore vertices and 20 towers (T-V12-32)', c['shoreVertices'] == 24 and c['towers']['value'] == 20,
       f"shore vertices {c['shoreVertices']}, towers {c['towers']['value']} ({c['towers']['city']} city + {c['towers']['castle']} castle), water gates {c['gate.count']['water']}")
    hr = held_ribbon()
    print('REPORT ribbon (not a row check; area centroids and prisms vs the red-team vertex means): ' + '; '.join(
        f"{k[8:]} {fx(k)['ribbon.share']['within']}/{fx(k)['ribbon.share']['extramural']} = {fx(k)['ribbon.share']['value'] * 100:.1f}% vs {v[0]} extramural, {v[2]}%"
        for k, v in sorted(hr.items())))
    # (6) the gate law's hits on the sweep, reported
    hits = [(cap.split('/')[1], per[cap]['gateLaw']) for cap in sweep_caps]
    plain = [(n, gl) for n, gl in hits if 'river' not in n]
    fit = [(n, gl) for n, gl in plain if int(n.split('-')[1]) in (10, 15, 24, 40, 60, 80, 120, 130, 200, 250)]
    ck('gate law hits on the 2026-09-25 sweep reported', True,
       f"plain {sum(gl['hit'] for _, gl in plain)}/{len(plain)}; the fit's sizes 10-250 {sum(gl['hit'] for _, gl in fit)}/{len(fit)}; "
       + '; '.join(f"{n} {gl['measured']} vs {gl['law']}" for n, gl in hits))
    sqs = [p['market.secondary']['squares'] for p in per.values()]
    ck('D24 markets: one square in every exported file and one market geometry built in every recorded generation',
       all(q == 1 for q in sqs) and all(v['marketGeometriesBuilt'] == 1 for v in markets_cov.values()),
       f"squares per file {sorted(set(sqs))} over {len(sqs)} files; market geometries built per generation "
       f"{sorted({v['marketGeometriesBuilt'] for v in markets_cov.values()})} over {len(markets_cov)} generations "
       f"(markets created {sorted({v['marketWardsCreated'] for v in markets_cov.values()})}); secondary 0, adjacent 0 everywhere")
    # (7) receipts: the held scripts still print their .out files
    for script, cwd in (('mfcg_orient.py', EXPORTS), ('mfcg_wallalign.py', EXPORTS), ('mfcg_ribbon.py', EXPORTS)):
        live = rerun_held(script, cwd)
        held = open(os.path.join(BENCH, script[:-3] + '.out')).read()
        ck(f'{script} re-run live equals its .out', live == held, f'{len(live.splitlines())} lines, identical={live == held}')
    # (8) the sweep's stats.md values for this item's metrics (T-V12-6's sweep clause, the metrics W-07 owns)
    sm = held_statsmd(); hc = held_castles(); bad = []
    for cap in sweep_caps:
        n = cap.split('/')[1]; p = per[cap]; r = sm[n]
        pairs = [('buildings', f"{p['buildings']:,}", r['buildings']), ('walled share', f"{p['walled.share']['value']:.2f}", r['walled share']),
                 ('walled ha', f"{p['walledHa']:.2f}", r['walled ha']), ('gates', str(p['gate.count']['value']), r['gates']),
                 ('districts', str(p['quarter.count']['value']), r['districts']), ('plaza ha', f"{p['plaza.area']['value']:.3f}", r['plaza ha']),
                 ('gen ms', str(timing[n]['genMs']), r['gen ms'])]
        pairs.append(('castle ha', f"{p['castle.area']['value']:.3f}", hc[n]))
        if 'river' not in n:
            pairs.append(('towers', str(p['towers']['value']), r['towers']))
        bad += [f'{n} {k} {a} vs {b}' for k, a, b in pairs if a != b]
    ck('sweep stats.md: buildings, walled share and ha, gates, towers (dry), districts, plaza and castle ha, gen ms exact', not bad,
       'all equal' if not bad else '; '.join(bad))
    print(f"{'ALL PASS' if not fails else f'{fails} FAIL'}")
    result['checksFailed'] = fails
    dump()
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
