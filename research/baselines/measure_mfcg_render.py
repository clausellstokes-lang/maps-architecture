#!/usr/bin/env python3
"""research/baselines/measure_mfcg_render.py -- MFCG street-edge recoverability on the plain sweep renders, streetwall
continuity on the cluster blocks and the gross cover inside the walls (M-1 work item W-08; V12 section 3.4.2's rows
fg.recoverability, fg.streetwall, fg.coverWalled; ARCHITECTURE section 8.5's metric; rulings R-07, R-22, R-47 (c)).

Lane m1/W-08 (docs/calibration/M-1-plan.md section 2, row W-08; record docs/calibration/E08-mfcg-renders.md). Research
side only; our own code, standard library plus PIL. It reads the sweep's plain SVG files (rasterised by
render_svg_offline.mjs in headless Chrome with the network disabled), the MeasureInput files adapters/mfcg.py wrote,
plan.json and the sweep's export-check.json and stats.json; it never opens a captured program bundle, touches no site and
writes nothing under plat/. It imports derived_graph.py (W-09's cluster blocks and derived street graph, the declared twin
of V12 section 3.4.1, version 1.0.0, R-22), measure_mfcg.py (the plan sample, the estimators, the cover) and
measure_ftg.py (geometry helpers), all unchanged.

The sample: the three plain families' usable seeds (capture/MFCG/40, 80 and 130/plain; 10 / 10 / 10, index 8 of size
130 failed no-export and replaced by R-13's index 10).

Renders (one headless Chrome session per variant, all 30 SVGs in each; the render log is
docs/calibration/E08-mfcg-renders.render-log.jsonl):
  R1  map only, MFCG's own scale       the kept rasters (captures/mfcg/renders-w08-2026-10-04/<stem>.png): the SVG at
                                       its own size, one SVG pixel = one CSS pixel at device pixel ratio 1 -- MFCG's
                                       default view, fitted to the sweep's 1 100-px window height, a city-band scale
                                       (1.06-3.36 m per px) -- with labels and furniture off (V12 section 3.9.2's panel
                                       convention): every group the SVG draws after its scaled map group (the grid, the
                                       scale bar, the compass, the labels and the title) is hidden
  R2  the same, a second browser       the determinism check's second render (scratch)
  R3  as exported                      furniture and labels on, labels in a fallback face (the SVG's web font is never
                                       fetched); a declared companion (scratch)
  R4  map only at a fixed scale        0.8157 px per m (ARCHITECTURE section 8.3's matched scale, MFCG size 40; E07)
                                       for every size, by the device pixel ratio; a declared companion (scratch)

fg.recoverability (section 8.5, on MFCG through V12 section 3.4.1's derived street graph, since MFCG exports no lanes):
  the corridors are the derived graph's edges (the skeleton of the street space inside the enclosure, W-09's graph); each
  edge is sampled every 2 raster px (n = ceil(L / 2 px) samples at the midpoints of n equal parts, each weighing L / n);
  a sample under the drawn body of a wall or a tower (within half the export's wall thickness of a curtain or castle
  wall line, or within the export's tower radius of a tower point) is not street and is left out (its length reported);
  at a sample, the corridor's half-width on each side is the distance along the normal to the first cell outside the
  street space on that side (W-09's 0.5 m raster); the sample is recoverable when on BOTH sides, scanning outward along
  the normal from the centre in 0.25-px steps up to (that side's half-width + 1 px), a road pixel is followed by a
  non-road pixel (a road / non-road transition). The value is the recoverable share of the sampled length. Companion
  (R1): both sides reaching the mean of the two half-widths + 1 px.
  Pixel classes as docs/validation/bench/mfcg_cover.py: a pixel is paper (road; the street voids are paper in MFCG's
  render) when its L1 distance to the paper colour is <= 45, else not road (mfcg_cover's water, tree and figure classes
  together). The paper colour is read from each SVG's own background, never written to any record (the export's palette
  differs from the screenshots' that mfcg_cover's constant came from).
fg.streetwall (V12; R-07's dense frontages: every intramural frontage of MFCG): over the intramural cluster blocks of
  W-09 (0.5 m raster, the 3 m closing, holes filled), the outline traced by marching squares (segments between the
  midpoints of cell-centre pairs that differ), each segment's midpoint inside the enclosure counted; walled when it lies
  within 0.5 m of a footprint edge; the value is the walled share of the outline's length. Companion: the same on block
  rasters at a 0.25 m step (the raster's own error against the 0.5 m tolerance).
fg.coverWalled (V12): measure_mfcg.measure_extra's value (footprints whose centroid lies inside the enclosure, their area
  over the enclosure's), against stats.py's gross_cover_inside_walls column. Beside it, for information: the not-road
  pixel share of R1 inside the enclosure.

Checks (the W-08 row): two renders of one SVG differ < 0.005 in the metric (R1 against R2, every seed); the cover
reproduces stats.py's column (stats.md's printed three decimals on every seed; unrounded, exactly on every seed whose
MeasureInput merged no vertex and within the 1 mm merge's own bound on the others); the render log shows 0 network requests (every session: the page's requests 0,
and in Chrome's own NetLog 0 URL requests to any host other than the loopback address, 0 named host resolutions, 0 TCP
connects and 0 bytes sent to any address other than loopback; every SVG's outside references left 0, none refused).
Lane checks: registration (on every R1 render >= 0.98 of the footprint interior points and >= 0.95 of the tower points
read figure, and the footprint mask overlaps the figure mask most within 1 px of no shift); the W-09 twin (the graph's length and faces equal E09's per-seed file); the sample; the paper colour
(each R1 render's modal colour equals the SVG background within L1 3); the map-only renders show no label.

Usage (project root):
  python3 research/baselines/measure_mfcg_render.py [--scratch DIR] [--no-render] [--only STEM,...] [--red] [--selftest]
    default: geometry (cached in DIR), the four render sessions, the measures, writing docs/calibration/
    E08-mfcg-renders.json and its render log; exit 1 on any FAIL. --no-render measures the renders already on disk and
    keeps the render log. --only runs a subset and writes into DIR only. --red reads the stored JSON and render log,
    plants one fault per check, each in its own copy, and every plant must turn its own check red (exit 1; writes
    nothing). --selftest runs the synthetic checks S1-S4.
"""
import collections
import gzip
import hashlib
import json
import math
import os
import re
import subprocess
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import derived_graph as DG   # noqa: E402  (W-09: Map, the graph, the block rasters; unchanged)
import measure_ftg as MF     # noqa: E402  (geometry helpers)
import measure_mfcg as MM    # noqa: E402  (plan_families, estimate, measure_extra)
from PIL import Image, ImageChops, ImageDraw   # noqa: E402

SCRIPT = 'research:baselines/measure_mfcg_render.py'
HELPER = os.path.join(HERE, 'render_svg_offline.mjs')
VERSION = '1.0.0'
REFERENCE_BUILD = 'itch:12710731'
SWEEP = os.path.join(ROOT, 'captures', 'mfcg', 'exports-sweep-m1-2026-10-03')
SWEEP_PREFIX = 'exports-sweep-m1-2026-10-03.'
RENDER_DIR = os.path.join(ROOT, 'captures', 'mfcg', 'renders-w08-2026-10-04')
OUT_JSON = os.path.join(ROOT, 'docs', 'calibration', 'E08-mfcg-renders.json')
OUT_LOG = os.path.join(ROOT, 'docs', 'calibration', 'E08-mfcg-renders.render-log.jsonl')
E09_SEEDS = os.path.join(ROOT, 'docs', 'calibration', 'E09-mfcg-derived-graph.seeds.json')
DEFAULT_SCRATCH = '/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/35f80c37-a71f-4b8a-aa2a-ae5f9064cf55/scratchpad/m1w2/w08'
PLAIN = ['capture/MFCG/40/plain', 'capture/MFCG/80/plain', 'capture/MFCG/130/plain']

STEP_PX = 2.0           # section 8.5: sampled every 2 px along corridor centrelines
TOL_PX = 1.0            # section 8.5: within (half-width + 1 px)
SCAN_PX = 0.25          # the scan's step along the normal
PAPER_L1 = 45           # mfcg_cover.py's paper class
NORMAL_STEP_M = 0.25    # the half-width walk on W-09's 0.5 m street-space raster
NORMAL_CAP_M = 400.0
WALL_M = 0.5            # fg.streetwall: within 0.5 m (metric) of a footprint edge
FIXED_PX_PER_M = 0.8157  # R4: ARCHITECTURE 8.3's matched scale (MFCG size 40, 0.816 px/m; E07: 3.263 / 4 m)
UNIT_M = 4.0            # the SVG's map unit is 4 m (the JSON writes it x 4; stats.py, E03)
DETERMINISM_TOL = 0.005
REG_MIN = 0.98
TOWER_MIN = 0.95
VARIANTS = collections.OrderedDict([
    ('R1', {'mode': 'map', 'scale': 'native', 'session': 'R1-map-native', 'kept': True}),
    ('R2', {'mode': 'map', 'scale': 'native', 'session': 'R2-map-native-repeat', 'kept': False}),
    ('R3', {'mode': 'exported', 'scale': 'native', 'session': 'R3-as-exported-native', 'kept': False}),
    ('R4', {'mode': 'map', 'scale': 'fixed', 'session': 'R4-map-fixed-0.8157', 'kept': False}),
])


# ---------------------------------------------------------------- small helpers
def file_sha(path):
    with open(path, 'rb') as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def read_mi(stem):
    with gzip.open(DG.mi_path(SWEEP_PREFIX + stem), 'rb') as fh:
        return json.loads(fh.read().decode())


def svg_frame(stem):
    """the SVG's size, its map group's transform and its paper colour (kept in memory only)"""
    with open(os.path.join(SWEEP, stem + '.svg'), encoding='utf8') as fh:
        head = fh.read(4000)
    w = float(re.search(r'<svg\b[^>]*\bwidth="([\d.]+)"', head).group(1))
    h = float(re.search(r'<svg\b[^>]*\bheight="([\d.]+)"', head).group(1))
    m = re.search(r'<g transform="translate\(([-\d.]+) ([-\d.]+)\) scale\(([-\d.]+) ([-\d.]+)\)">', head)
    tx, ty, sx, sy = (float(v) for v in m.groups())
    assert sx == sy
    bg = re.search(r'<rect x="0" y="0" width="[\d.]+" height="[\d.]+" fill="#([0-9A-Fa-f]{6})"', head).group(1)
    paper = tuple(int(bg[i:i + 2], 16) for i in (0, 2, 4))
    return {'width': w, 'height': h, 'tx': tx, 'ty': ty, 's': sx, 'paper': paper, 'mPerPxNative': UNIT_M / sx}


def dpr_of(frame, scale):
    return 1.0 if scale == 'native' else FIXED_PX_PER_M * UNIT_M / frame['s']


def px_per_m(frame, f):
    return f * frame['s'] / UNIT_M


def to_px(frame, f, x, y):
    return (f * (frame['tx'] + frame['s'] * x / UNIT_M), f * (frame['ty'] - frame['s'] * y / UNIT_M))


def round_floats(o, nd=6):
    return DG.round_floats(o, nd)


# ---------------------------------------------------------------- the geometry phase (W-09's map, run once per seed)
class MapW08(DG.Map):
    """W-09's Map with the court test skipped (W-08 reads the graph and the blocks only)"""
    def courts(self, intra, med_area, med_short):
        return {'value': None, 'skipped': 'W-08 does not read the court test'}


_CAPTURED = {}
_ORIG_THIN = DG.thin


def _thin_capture(img, *a, **k):
    _CAPTURED['S'] = img
    return _ORIG_THIN(img, *a, **k)


def edge_buckets(B, cell=2.0, reach=WALL_M):
    """footprint edges bucketed into square cells, each edge in every cell its reach-expanded box meets"""
    buckets = collections.defaultdict(list)
    for P in B:
        n = len(P)
        for i in range(n):
            a, b = P[i], P[(i + 1) % n]
            x0, x1 = min(a[0], b[0]) - reach, max(a[0], b[0]) + reach
            y0, y1 = min(a[1], b[1]) - reach, max(a[1], b[1]) + reach
            for ci in range(int(math.floor(x0 / cell)), int(math.floor(x1 / cell)) + 1):
                for cj in range(int(math.floor(y0 / cell)), int(math.floor(y1 / cell)) + 1):
                    buckets[(ci, cj)].append((a, b))
    return buckets


def line_buckets(lines, cell, reach):
    """the segments of open polylines bucketed like edge_buckets"""
    buckets = collections.defaultdict(list)
    for ln in lines:
        for a, b in zip(ln, ln[1:]):
            x0, x1 = min(a[0], b[0]) - reach, max(a[0], b[0]) + reach
            y0, y1 = min(a[1], b[1]) - reach, max(a[1], b[1]) + reach
            for ci in range(int(math.floor(x0 / cell)), int(math.floor(x1 / cell)) + 1):
                for cj in range(int(math.floor(y0 / cell)), int(math.floor(y1 / cell)) + 1):
                    buckets[(ci, cj)].append((a, b))
    return buckets


def near_edge(p, buckets, cell=2.0, reach=WALL_M):
    for a, b in buckets.get((int(math.floor(p[0] / cell)), int(math.floor(p[1] / cell))), ()):
        if MF.seg_dist(p, a, b) <= reach:
            return True
    return False


# marching squares: corner order a (i, j), b (i+1, j), c (i+1, j+1), d (i, j+1) (image y down); edge midpoints
_MID = {'t': (0.5, 0.0), 'r': (1.0, 0.5), 'b': (0.5, 1.0), 'l': (0.0, 0.5)}
_SEGS = {1: [('l', 't')], 2: [('t', 'r')], 3: [('l', 'r')], 4: [('r', 'b')], 5: [('l', 't'), ('r', 'b')], 6: [('t', 'b')],
         7: [('l', 'b')], 8: [('b', 'l')], 9: [('t', 'b')], 10: [('t', 'r'), ('b', 'l')], 11: [('r', 'b')], 12: [('r', 'l')],
         13: [('t', 'r')], 14: [('l', 't')]}


def outline_segments(img):
    """marching-squares segments of a binary raster (0 / 255) between the midpoints of differing cell-centre pairs:
    [(i, j, (u0, v0), (u1, v1))] in window coordinates, window (i, j) spanning the centres of cells i..i+1, j..j+1"""
    W, H = img.size
    sh_r = ImageChops.offset(img, -1, 0)
    sh_d = ImageChops.offset(img, 0, -1)
    sh_rd = ImageChops.offset(img, -1, -1)
    mx = ImageChops.lighter(ImageChops.lighter(img, sh_r), ImageChops.lighter(sh_d, sh_rd))
    mn = ImageChops.darker(ImageChops.darker(img, sh_r), ImageChops.darker(sh_d, sh_rd))
    diff = ImageChops.subtract(mx, mn).tobytes()
    data = img.tobytes()
    out = []
    for m in re.finditer(b'[^\x00]', diff):
        k = m.start()
        i, j = k % W, k // W
        if i >= W - 1 or j >= H - 1:
            continue
        a = data[k] > 0
        b = data[k + 1] > 0
        c = data[k + W + 1] > 0
        d = data[k + W] > 0
        case = a * 1 + b * 2 + c * 4 + d * 8
        for e0, e1 in _SEGS.get(case, ()):
            out.append((i, j, _MID[e0], _MID[e1]))
    return out


def streetwall_of(blocks_imgs, res, buckets, enc_mask, enc_frame):
    """walled share of the intramural blocks' outline length inside the enclosure"""
    OX, OY, W, H, eres = enc_frame
    tot = walled = 0.0
    outside = 0.0
    for img, lox, loy in blocks_imgs:
        for i, j, (u0, v0), (u1, v1) in outline_segments(img):
            x0, y0 = lox + (i + 0.5 + u0) * res, loy - (j + 0.5 + v0) * res
            x1, y1 = lox + (i + 0.5 + u1) * res, loy - (j + 0.5 + v1) * res
            L = math.hypot(x1 - x0, y1 - y0)
            mx, my = (x0 + x1) / 2, (y0 + y1) / 2
            ci, cj = int((mx - OX) / eres), int((OY - my) / eres)
            if not (0 <= ci < W and 0 <= cj < H and enc_mask[cj * W + ci]):
                outside += L
                continue
            tot += L
            if near_edge((mx, my), buckets):
                walled += L
    return {'value': walled / tot if tot else None, 'frontageKm': tot / 1000.0, 'walledKm': walled / 1000.0,
            'outsideEnclosureKm': outside / 1000.0}


def intramural_blocks(m):
    """the intramural block rasters of a Map whose clusters and grid are set (run()'s rule: the area-weighted centroid
    of the cluster's footprints inside the enclosure)"""
    out = []
    for root, ids in m.groups.items():
        sa = sx = sy = 0.0
        for i in ids:
            a_ = DG.area(m.B[i])
            c_ = MF.A.centroid(m.B[i])
            sa += a_
            sx += a_ * c_[0]
            sy += a_ * c_[1]
        cen = (sx / sa, sy / sa) if sa > 0 else MF.A.centroid(m.B[ids[0]])
        if MF.inside(cen, m.enclosure) and not any(MF.inside(cen, h) for h in m.enc_holes):
            blk = m.block_raster(ids)
            out.append((blk['img'], blk['lox'], blk['loy']))
    return out


def enclosure_mask(m):
    img = Image.new('L', (m.W, m.H), 0)
    dr = ImageDraw.Draw(img)
    dr.polygon([m.px(p) for p in m.enclosure], fill=255)
    for h in m.enc_holes:
        dr.polygon([m.px(p) for p in h], fill=0)
    return img.tobytes(), (m.OX, m.OY, m.W, m.H, m.res)


def sample_graph(G, step_m):
    """samples every step_m along each live edge: (x, y, ux, uy, weight)"""
    out = []
    for eid in sorted(G.edges):
        poly = G.edges[eid][2]
        L = DG.poly_len(poly)
        if L <= 0:
            continue
        n = max(1, int(math.ceil(L / step_m)))
        cum = [0.0]
        for i in range(len(poly) - 1):
            cum.append(cum[-1] + math.hypot(poly[i + 1][0] - poly[i][0], poly[i + 1][1] - poly[i][1]))
        seg = 0
        for k in range(n):
            s = (k + 0.5) * L / n
            while seg < len(poly) - 2 and cum[seg + 1] < s:
                seg += 1
            while seg < len(poly) - 2 and cum[seg + 1] - cum[seg] <= 0:
                seg += 1
            a, b = poly[seg], poly[seg + 1]
            sl = cum[seg + 1] - cum[seg]
            t = (s - cum[seg]) / sl if sl > 0 else 0.0
            ux, uy = ((b[0] - a[0]) / sl, (b[1] - a[1]) / sl) if sl > 0 else (1.0, 0.0)
            out.append((a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]), ux, uy, L / n))
    return out


def half_widths(samples, S, m):
    """per sample the distances along both normals to the first cell outside the street space (W-09's raster)"""
    W, H = S.size
    buf = S.tobytes()
    res = m.res
    out = []
    off_start = 0
    for x, y, ux, uy, w in samples:
        nx, ny = -uy, ux
        ds = []
        for sgn in (1, -1):
            t = 0.0
            d = None
            while t <= NORMAL_CAP_M:
                px_ = x + sgn * t * nx
                py_ = y + sgn * t * ny
                i = int(math.floor((px_ - m.OX) / res))
                j = int(math.floor((m.OY - py_) / res))
                if not (0 <= i < W and 0 <= j < H) or buf[j * W + i] == 0:
                    d = max(0.0, t - NORMAL_STEP_M / 2) if t > 0 else 0.0
                    break
                t += NORMAL_STEP_M
            ds.append(NORMAL_CAP_M if d is None else d)
        if ds[0] == 0.0 and ds[1] == 0.0:
            off_start += 1
        out.append((x, y, ux, uy, w, ds[0], ds[1]))
    return out, off_start


def geometry_key():
    """the cache key of the geometry phase: the source of every function it runs, its constants and the imported
    modules' file hashes (a change to the measuring or checking code keeps the cache; any change here refreshes it)"""
    import inspect
    parts = [inspect.getsource(o) for o in (MapW08, _thin_capture, edge_buckets, line_buckets, near_edge, outline_segments,
                                            streetwall_of, intramural_blocks, enclosure_mask, sample_graph, half_widths,
                                            geometry, svg_frame)]
    parts.append(repr((STEP_PX, FIXED_PX_PER_M, NORMAL_STEP_M, NORMAL_CAP_M, WALL_M, UNIT_M, _MID, _SEGS)))
    parts += [file_sha(DG.__file__), file_sha(MF.__file__), file_sha(MM.__file__)]
    return hashlib.sha256('\n'.join(parts).encode()).hexdigest()


def geometry(stem, frame, cache_dir, refresh=False):
    """W-09's map on the seed (thinning and graph), the samples at both raster steps, the streetwall, the cover, the
    registration points; cached as JSON in the scratch folder"""
    mi_file = DG.mi_path(SWEEP_PREFIX + stem)
    key = file_sha(mi_file)[:16] + '-' + geometry_key()[:16]
    path = os.path.join(cache_dir, 'geom', f'{stem}.{key}.json.gz')
    if os.path.exists(path) and not refresh:
        with gzip.open(path, 'rb') as fh:
            return json.loads(fh.read().decode())
    mi = read_mi(stem)
    DG.thin = _thin_capture
    try:
        m = MapW08(stem, mi)
        out = m.run()
    finally:
        DG.thin = _ORIG_THIN
    S = _CAPTURED.pop('S')
    G = m.graph_main
    steps = {'native': STEP_PX * frame['mPerPxNative'], 'fixed': STEP_PX / FIXED_PX_PER_M}
    vals = (mi.get('research') or {}).get('values') or {}
    wall_half = float(vals['wallThickness']) / 2.0
    tower_r = float(vals['towerRadius'])
    walls = [f['geometry']['coordinates'] for f in mi['features'] if f['kind'] == 'wall']
    towers = [tuple(f['geometry']['coordinates']) for f in mi['features'] if f['kind'] == 'tower']
    wb = line_buckets(walls, cell=4.0, reach=wall_half)
    samples = {}
    off = {}
    excluded = {}
    for k, st in steps.items():
        kept, ex_w = [], 0.0
        for s in sample_graph(G, st):
            p = (s[0], s[1])
            if near_edge(p, wb, cell=4.0, reach=wall_half - 1e-9) or any(math.hypot(p[0] - q[0], p[1] - q[1]) < tower_r for q in towers):
                ex_w += s[4]
                continue
            kept.append(s)
        sm, o = half_widths(kept, S, m)
        samples[k] = [[round(v, 4) for v in s] for s in sm]
        off[k] = o
        excluded[k] = ex_w / 1000.0
    # streetwall on W-09's blocks (0.5 m) and on 0.25 m block rasters
    buckets = edge_buckets(m.B)
    enc_mask, enc_frame = enclosure_mask(m)
    blocks05 = [(b['img'], b['lox'], b['loy']) for b in m.blocks if b['intramural']]
    sw05 = streetwall_of(blocks05, m.res, buckets, enc_mask, enc_frame)
    m25 = DG.Map(stem, mi, res=0.25)
    m25.groups, m25.boxes = m.groups, m.boxes          # the same partition (W-09's union-find)
    m25.setup_grid()
    enc25, encf25 = enclosure_mask(m25)
    blocks25 = intramural_blocks(m25)
    sw25 = streetwall_of(blocks25, 0.25, buckets, enc25, encf25)
    cover = MM.measure_extra(mi)['fg.coverWalled']
    # registration points: footprint points well inside their footprint (native scale)
    mpp = frame['mPerPxNative']
    fpts = []
    for P in m.B:
        c = MF.A.centroid(P)
        if MF.inside(c, P):
            n = len(P)
            d = min(MF.seg_dist(c, P[i], P[(i + 1) % n]) for i in range(n))
            if d >= 2.0 * mpp:
                fpts.append([round(c[0], 3), round(c[1], 3)])
    rec = {'stem': stem, 'measureInputSha256': file_sha(mi_file), 'buildings': len(m.B),
           'enclosure': [[round(p[0], 3), round(p[1], 3)] for p in m.enclosure],
           'graph': {'lengthKm': out['graph']['lengthKm'], 'faces': out['graph']['faces'], 'nodes': out['graph']['nodes'],
                     'edges': out['graph']['edges']},
           'blocksIntramural': out['blockc.perHa']['blocks'], 'blocksIntramural025': len(blocks25),
           'stepsM': steps, 'samples': samples, 'samplesOffStreetSpace': off, 'underWallsKm': excluded,
           'wallHalfM': wall_half, 'towerRadiusM': tower_r, 'wallLines': len(walls), 'towers': len(towers),
           'fg.streetwall': sw05, 'fg.streetwall.step025': sw25, 'fg.coverWalled': cover, 'footprintPoints': fpts}
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with gzip.open(path, 'wb') as fh:
        fh.write(json.dumps(rec).encode())
    return rec


# ---------------------------------------------------------------- the render sessions
def render_session(variant, stems, frames, out_dirs, log_path, scratch):
    v = VARIANTS[variant]
    jobs = []
    for st in stems:
        f = dpr_of(frames[st], v['scale'])
        jobs.append({'id': st, 'svg': os.path.join(SWEEP, st + '.svg'), 'out': os.path.join(out_dirs[variant], st + '.png'),
                     'mode': v['mode'], 'dpr': f})
    jf = os.path.join(scratch, f'jobs-{variant}.json')
    with open(jf, 'w') as fh:
        json.dump(jobs, fh)
    cmd = ['nice', '-n', '10', 'node', HELPER, '--jobs', jf, '--log', log_path, '--session', v['session'],
           '--profile', os.path.join(scratch, f'profile-{variant}'), '--netlog', os.path.join(scratch, f'netlog-{variant}.json')]
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit(f'render session {variant} failed: {r.stderr[-2000:]}')
    return r.stdout.strip().splitlines()[-1]


# ---------------------------------------------------------------- measuring one raster
class Raster:
    def __init__(self, path, paper):
        im = Image.open(path).convert('RGB')
        self.W, self.H = im.size
        self.buf = im.tobytes()
        self.paper = paper
        self.im = im

    def road(self, X, Y):
        if not (0 <= X < self.W and 0 <= Y < self.H):
            return None
        o = (Y * self.W + X) * 3
        b = self.buf
        p = self.paper
        return abs(b[o] - p[0]) + abs(b[o + 1] - p[1]) + abs(b[o + 2] - p[2]) <= PAPER_L1


def recoverability(r, frame, f, samples, window='side'):
    """window 'side': each side's scan reaches that side's distance to the street space's edge + 1 px (the corridor's
    half-width on that side); 'mean': both sides reach the mean of the two + 1 px (a declared companion)"""
    ppm = px_per_m(frame, f)
    tot = rec_w = 0.0
    n = n_rec = centre_off = one_side = both_sides = 0
    for x, y, ux, uy, w, dl, dr in samples:
        X0, Y0 = to_px(frame, f, x, y)
        Nx, Ny = -uy, -ux                # the metric normal (-uy, ux) -- the side of dl -- in raster coordinates (y down)
        oks = []
        for sgn, d in ((1, dl), (-1, dr)):
            win = (0.5 * (dl + dr) if window == 'mean' else d) * ppm + TOL_PX
            t = 0.0
            seen = ok = False
            while t <= win + 1e-9:
                c = r.road(int(math.floor(X0 + sgn * t * Nx)), int(math.floor(Y0 + sgn * t * Ny)))
                if c is None:
                    break
                if c:
                    seen = True
                elif seen:
                    ok = True
                    break
                t += SCAN_PX
            oks.append(ok)
        c0 = r.road(int(math.floor(X0)), int(math.floor(Y0)))
        n += 1
        tot += w
        if all(oks):
            n_rec += 1
            rec_w += w
        else:
            if not c0:
                centre_off += 1
            elif oks[0] or oks[1]:
                one_side += 1
            else:
                both_sides += 1
    return {'value': rec_w / tot if tot else None, 'samples': n, 'recoverable': n_rec, 'lengthKm': tot / 1000.0,
            'failCentreNotRoad': centre_off, 'failOneSide': one_side, 'failBothSides': both_sides, 'pxPerM': ppm}


def figure_mask(r):
    """the raster's not-road pixels as an 'L' image (255 = figure, mfcg_cover's classes other than paper)"""
    buf, p = r.buf, r.paper
    out = bytearray(r.W * r.H)
    for k in range(r.W * r.H):
        o = 3 * k
        if abs(buf[o] - p[0]) + abs(buf[o + 1] - p[1]) + abs(buf[o + 2] - p[2]) > PAPER_L1:
            out[k] = 255
    return Image.frombytes('L', (r.W, r.H), bytes(out))


def registration(r, frame, f, g, samples, fig_mask, buildings, towers):
    """(a) footprint interior points (>= 2 px inside) read figure; (b) tower centres read figure; (c) the shift of the
    footprint mask that overlaps the figure mask most, over -2..2 px in each axis; beside them, for information, the
    paper share at derived-axis points with >= 3 px of street space on both sides (raised roofs and landmark symbols
    reach into the streets, so it is no registration test)"""
    fig = tot = 0
    for x, y in g['footprintPoints']:
        X, Y = to_px(frame, f, x, y)
        c = r.road(int(math.floor(X)), int(math.floor(Y)))
        if c is not None:
            tot += 1
            fig += (not c)
    tw_fig = sum(1 for x, y in towers if r.road(*(int(math.floor(v)) for v in to_px(frame, f, x, y))) is False)
    mask = Image.new('L', (r.W, r.H), 0)
    dr = ImageDraw.Draw(mask)
    for P in buildings:
        dr.polygon([to_px(frame, f, q[0], q[1]) for q in P], fill=255)
    best = None
    scores = {}
    for dy in range(-2, 3):
        for dx in range(-2, 3):
            s = ImageChops.multiply(ImageChops.offset(mask, dx, dy), fig_mask).histogram()[255]
            scores[(dx, dy)] = s
            if best is None or s > best[0]:
                best = (s, dx, dy)
    ppm = px_per_m(frame, f)
    road = tot_s = 0
    for x, y, ux, uy, w, dl, dr_ in samples:
        if min(dl, dr_) * ppm >= 3.0:
            X, Y = to_px(frame, f, x, y)
            c = r.road(int(math.floor(X)), int(math.floor(Y)))
            if c is not None:
                tot_s += 1
                road += bool(c)
    return {'figureUnderFootprints': fig / tot if tot else None, 'footprintPoints': tot,
            'towerCentresFigure': tw_fig, 'towers': len(towers), 'bestShiftPx': [best[1], best[2]],
            'overlapAtZero': scores[(0, 0)], 'overlapBest': best[0], 'footprintMaskPx': mask.histogram()[255],
            'paperAtWideAxisPoints': road / tot_s if tot_s else None, 'wideAxisPoints': tot_s}


def raster_cover(fig_mask, frame, f, enclosure):
    mask = Image.new('L', fig_mask.size, 0)
    ImageDraw.Draw(mask).polygon([to_px(frame, f, p[0], p[1]) for p in enclosure], fill=255)
    inside = mask.histogram()[255]
    fig = ImageChops.multiply(mask, fig_mask).histogram()[255]
    return fig / inside if inside else None


def modal_l1(r):
    cols = r.im.getcolors(1 << 24)
    top = max(cols)[1]
    return sum(abs(a - b) for a, b in zip(top, r.paper))


# ---------------------------------------------------------------- sample, summaries, checks
def plain_sample():
    fams = MM.plan_families()
    out = collections.OrderedDict()
    for lab in PLAIN:
        f = fams[lab]
        out[lab] = {'size': f['size'], 'rung': f['rung'], 'indices': f['indices'], 'usable': f['usable'],
                    'failed': f['failed'], 'failedStems': f['failedStems']}
    return out


def summarise(per, sample):
    rows = collections.OrderedDict()
    metrics = [('fg.recoverability', lambda p: p['R1']['fg.recoverability']['value']),
               ('fg.streetwall', lambda p: p['fg.streetwall']['value']),
               ('fg.coverWalled', lambda p: p['fg.coverWalled']['value']),
               ('fg.recoverability.R2', lambda p: p['R2']['fg.recoverability']['value']),
               ('fg.recoverability.asExported', lambda p: p['R3']['fg.recoverability']['value']),
               ('fg.recoverability.fixed08157', lambda p: p['R4']['fg.recoverability']['value']),
               ('fg.recoverability.meanWindow', lambda p: p['R1']['fg.recoverability.meanWindow']['value']),
               ('render.underWallsKm', lambda p: p['underWallsKm']['native']),
               ('render.sampledKm', lambda p: p['R1']['fg.recoverability']['lengthKm']),
               ('fg.streetwall.step025', lambda p: p['fg.streetwall.step025']['value']),
               ('render.mPerPx', lambda p: p['frame']['mPerPxNative']),
               ('render.coverPixels', lambda p: p['R1']['coverPixels'])]
    for lab, s in sample.items():
        stems = [st for st in s['usable'] if st in per]
        fam = collections.OrderedDict()
        for mid, get in metrics:
            xs = [get(per[st]) for st in stems]
            xs = [x for x in xs if x is not None]
            e = MM.estimate(xs) or {'estimator': None, 'n': 0}
            e['seeds'] = stems
            fam[mid] = e
        rows[lab] = fam
    return rows


def stats_cover():
    with open(os.path.join(SWEEP, 'stats.json')) as fh:
        rows = json.load(fh)
    return {r['file']: r.get('gross_cover_inside_walls') for r in rows}


def read_log(path):
    if not os.path.exists(path):
        return []
    with open(path) as fh:
        return [json.loads(x) for x in fh if x.strip()]


def checks_for(per, sample, log, e09, red=False):
    res = []

    def add(cid, check, ok, receipt):
        res.append({'id': cid, 'check': check, 'result': 'PASS' if ok else 'FAIL', 'receipt': receipt})
    stems = [st for s in sample.values() for st in s['usable']]
    # K1 determinism
    diffs = {st: abs(per[st]['R1']['fg.recoverability']['value'] - per[st]['R2']['fg.recoverability']['value']) for st in stems}
    same_png = sum(per[st]['R1']['pngSha256'] == per[st]['R2']['pngSha256'] for st in stems)
    worst = max(diffs, key=diffs.get)
    add('K1', 'two renders of one SVG differ < 0.005 in the metric (R1 against R2, a second browser session, every seed)',
        all(d < DETERMINISM_TOL for d in diffs.values()) and len(diffs) == len(stems),
        f'{sum(d < DETERMINISM_TOL for d in diffs.values())} of {len(stems)} seeds; largest |difference| {diffs[worst]:.6f} '
        f'({worst}); PNGs byte-identical on {same_png} of {len(stems)}')
    # K2 cover against stats.py
    sc = stats_cover()
    printed = sum(f"{per[st]['fg.coverWalled']['valueUnrounded']:.3f}" == f'{sc[st]:.3f}' for st in stems)
    rel = {st: abs(per[st]['fg.coverWalled']['valueUnrounded'] - sc[st]) / sc[st] for st in stems}
    exact = [st for st in stems if per[st]['coverMerge']['mergedVertices'] == 0]
    merged = [st for st in stems if st not in exact]
    ok_exact = all(rel[st] == 0.0 for st in exact)
    ok_merged = all(rel[st] <= per[st]['coverMerge']['boundRel'] for st in merged)
    wr = max(rel, key=rel.get)
    add('K2', "the cover reproduces stats.py's column (gross_cover_inside_walls): stats.md's printed three decimals on every "
              "seed; unrounded, exactly equal on every seed whose MeasureInput merged no vertex, and within the merge's own "
              "bound (merges x 1 mm x the largest footprint perimeter / the covered area) on the others",
        printed == len(stems) and ok_exact and ok_merged,
        f'printed equal {printed} of {len(stems)}; exact on {sum(rel[st] == 0.0 for st in exact)} of {len(exact)} unmerged seeds; '
        f'{sum(rel[st] <= per[st]["coverMerge"]["boundRel"] for st in merged)} of {len(merged)} merged seeds within the bound; '
        f'largest relative difference {rel[wr]:.2e} ({wr}, {per[wr]["coverMerge"]["mergedVertices"]} merged vertices, '
        f'bound {per[wr]["coverMerge"]["boundRel"]:.1e})')
    # K3 the render log
    bad = []
    sessions = {v['session'] for v in VARIANTS.values()}
    seen = set()
    for line in log:
        seen.add(line['session'])
        nl = line['netlog']
        for k in ('urlRequestsNetwork', 'hostResolutionsNamed', 'tcpConnectsOutside', 'bytesSentOutside'):
            if nl.get(k) != 0:
                bad.append(f"{line['session']} {k}={nl.get(k)}")
        if line['pageRequests'] != 0:
            bad.append(f"{line['session']} pageRequests={line['pageRequests']}")
        if line['refused']:
            bad.append(f"{line['session']} refused={line['refused']}")
        if not nl.get('closed', False):
            bad.append(f"{line['session']} netlog not closed")
        for r in line['results']:
            if r.get('outsideRefsLeft'):
                bad.append(f"{line['session']} {r['id']} outside refs left")
            if r.get('pageRequests', 0):
                bad.append(f"{line['session']} {r['id']} page requests")
        ids = sorted(r['id'] for r in line['results'])
        if ids != sorted(stems):
            bad.append(f"{line['session']} jobs != sample")
    if seen != sessions or len(log) != len(sessions):
        bad.append(f'sessions {sorted(seen)} != {sorted(sessions)}')
    tot = {k: sum(l['netlog'].get(k, 0) for l in log) for k in ('urlRequestsNetwork', 'hostResolutionsNamed', 'tcpConnectsOutside',
                                                                 'bytesSentOutside', 'urlRequestsLoopback', 'udpConnects')}
    add('K3', 'the render log shows 0 network requests: per session the page requests 0, and in the browser NetLog 0 URL requests '
              'to any host but loopback, 0 named host resolutions, 0 TCP connects and 0 bytes to any address but loopback; '
              'every outside reference removed, none refused',
        not bad, f"{len(log)} sessions, {sum(l['jobs'] for l in log)} renders; page requests {sum(l['pageRequests'] for l in log)}; "
                 f"network URL requests {tot['urlRequestsNetwork']}, named resolutions {tot['hostResolutionsNamed']}, "
                 f"outside TCP connects {tot['tcpConnectsOutside']}, bytes sent outside {tot['bytesSentOutside']}; "
                 f"(the browser's own services: {tot['urlRequestsLoopback']} requests to the closed loopback port, "
                 f"{tot['udpConnects']} UDP route probes with no datagram); outside references removed "
                 f"{sum(r.get('removedImports', 0) for l in log for r in l['results'])}" + (f'; FAULTS {bad[:5]}' if bad else ''))
    # L1 registration
    regs = {st: per[st]['R1']['registration'] for st in stems}

    def reg_ok(g_):
        return ((g_['figureUnderFootprints'] or 0) >= REG_MIN and g_['towerCentresFigure'] >= TOWER_MIN * g_['towers']
                and abs(g_['bestShiftPx'][0]) <= 1 and abs(g_['bestShiftPx'][1]) <= 1)
    okr = [st for st in stems if reg_ok(regs[st])]
    lo_f = min(regs[st]['figureUnderFootprints'] or 0 for st in stems)
    shifts = collections.Counter(tuple(regs[st]['bestShiftPx']) for st in stems)
    add('L1', 'registration on every R1 render: >= 0.98 of the footprint interior points read figure, >= 0.95 of the '
              "adapter's tower points read figure (its tower rule is derived, not MFCG's drawn list), and the footprint "
              'mask overlaps the figure mask most at a shift within 1 px of none',
        len(okr) == len(stems),
        f'{len(okr)} of {len(stems)}; lowest figure share {lo_f:.4f}; towers {sum(regs[st]["towerCentresFigure"] for st in stems)} '
        f'of {sum(regs[st]["towers"] for st in stems)}; best shifts {dict((str(list(k)), v) for k, v in shifts.items())}')
    # L2 the W-09 twin
    tw = []
    for st in stems:
        e = e09.get(st, {}).get('graph', {})
        g = per[st]['graph']
        tw.append(st if (round(g['lengthKm'], 6) == e.get('lengthKm') and g['faces'] == e.get('faces')) else None)
    add('L2', "the W-09 twin: the derived graph's length and faces equal E09's per-seed file on every seed",
        all(tw), f'{sum(1 for t in tw if t)} of {len(stems)} equal' + ('' if all(tw) else f'; unequal {[s for s, t in zip(stems, tw) if not t]}'))
    # L3 the sample
    fam_ok = all(len([st for st in s['usable'] if st in per]) == 10 for s in sample.values())
    add('L3', 'the sample: the three plain families\' usable seeds, 10 / 10 / 10, every one measured; the failed index listed',
        fam_ok and all(st in per for st in stems),
        ' / '.join(f"{lab.split('/')[2]}: {len([st for st in s['usable'] if st in per])}" for lab, s in sample.items())
        + '; failed ' + ', '.join(f"{x['label']} {x['reason']}" for s in sample.values() for x in s['failed']))
    # L4 paper colour
    pm = {st: per[st]['R1']['modalL1'] for st in stems}
    add('L4', "each R1 render's modal colour is the SVG's paper (L1 <= 3)", all(v <= 3 for v in pm.values()),
        f'largest L1 {max(pm.values())}')
    # L5 no label in the map-only renders
    shown = {st: per[st]['R1'].get('textsShown', 0) + per[st]['R2'].get('textsShown', 0) + per[st]['R4'].get('textsShown', 0) for st in stems}
    add('L5', 'the map-only renders (R1, R2, R4) show no label', all(v == 0 for v in shown.values()),
        f'labels shown {sum(shown.values())}')
    return res


# ---------------------------------------------------------------- selftest (synthetic)
def selftest():
    out = []

    def add(cid, ok, receipt):
        out.append({'id': cid, 'result': 'PASS' if ok else 'FAIL', 'receipt': receipt})
    # S1 marching squares: a 20 x 10 cell rectangle's outline length ~ its perimeter (cell centres; 2 * (19 + 9))
    img = Image.new('L', (30, 20), 0)
    ImageDraw.Draw(img).rectangle([5, 5, 24, 14], fill=255)
    segs = outline_segments(img)
    L = sum(math.hypot(b[0] - a[0], b[1] - a[1]) for _, _, a, b in segs)
    want = 2 * 19 + 2 * 9 + 4 * math.sqrt(0.5)      # straight runs between the corner centres, four chamfers
    add('S1', abs(L - want) < 1e-9, f'outline {L:.4f} cells for a 20 x 10 block (expected {want:.4f})')
    # S2 streetwall: one square footprint -> 1.0; two footprints bridged by the closing -> < 1, bridged length ~ 2 x gap
    res = 0.5
    sq = [(0.0, 0.0), (10.0, 0.0), (10.0, 10.0), (0.0, 10.0)]
    sq2 = [(14.0, 0.0), (24.0, 0.0), (24.0, 10.0), (14.0, 10.0)]

    def block(polys):
        lox, loy = -6.0, 16.0
        W, H = int(36 / res), int(32 / res)
        im = Image.new('L', (W, H), 0)
        dr = ImageDraw.Draw(im)
        for P in polys:
            dr.polygon([((x - lox) / res, (loy - y) / res) for x, y in P], fill=255)
        im = DG.fill_holes(DG.close_square(im, int(round(3.0 / res))))
        return im, lox, loy
    enc = Image.new('L', (200, 200), 255).tobytes()
    ef = (-50.0, 50.0, 200, 200, 0.5)
    one = streetwall_of([block([sq])], res, edge_buckets([sq]), enc, ef)
    two = streetwall_of([block([sq, sq2])], res, edge_buckets([sq, sq2]), enc, ef)
    add('S2', one['value'] > 0.99 and 0.75 < two['value'] < 0.95,
        f"one footprint {one['value']:.4f}; two footprints 4 m apart bridged {two['value']:.4f} "
        f"(frontage {two['frontageKm'] * 1000:.1f} m, walled {two['walledKm'] * 1000:.1f} m)")
    # S3 recoverability on a synthetic raster: a horizontal paper street 6 px wide between figure bands -> 1.0; one band
    # removed (paper beyond) -> 0.0; the street closed (no paper) -> 0.0
    paper = (200, 190, 180)
    frame = {'tx': 0.0, 'ty': 50.0, 's': UNIT_M, 'paper': paper}     # 1 px per m, y up -> raster y = 50 - y

    def raster(top, bottom, open_=True):
        im = Image.new('RGB', (100, 100), paper)
        dr = ImageDraw.Draw(im)
        if top:
            dr.rectangle([0, 30, 99, 46], fill=(90, 90, 90))
        if bottom:
            dr.rectangle([0, 53, 99, 70], fill=(90, 90, 90))
        if not open_:
            dr.rectangle([0, 47, 99, 52], fill=(90, 90, 90))
        r = Raster.__new__(Raster)
        r.W, r.H, r.buf, r.paper, r.im = 100, 100, im.tobytes(), paper, im
        return r
    smp = [(float(x) + 0.5, 0.5, 1.0, 0.0, 1.0, 3.0, 3.0) for x in range(10, 90, 2)]   # centreline y = 0.5 m -> row 49.5
    a = recoverability(raster(True, True), frame, 1.0, smp)['value']
    b = recoverability(raster(True, False), frame, 1.0, smp)['value']
    c = recoverability(raster(True, True, False), frame, 1.0, smp)['value']
    add('S3', a == 1.0 and b == 0.0 and c == 0.0, f'both edges {a}; one edge {b}; closed {c}')
    # S4 the furniture rule: every SVG's text lies after the map group (checked on the sample's SVGs by position)
    bad = []
    for lab, s in plain_sample().items():
        for st in s['usable']:
            with open(os.path.join(SWEEP, st + '.svg'), encoding='utf8') as fh:
                t = fh.read()
            g = re.search(r'<g transform="translate\([-\d.]+ [-\d.]+\) scale\([-\d.]+ [-\d.]+\)">', t).start()
            first_after = t.find('stroke-width="0.267"')
            if t[:first_after].count('<text') or first_after < g:
                bad.append(st)
    add('S4', not bad, f'labels and the grid lie after the map group on {30 - len(bad)} of 30 SVGs')
    return out


# ---------------------------------------------------------------- main
def main():
    argv = sys.argv[1:]

    def opt(name, default=None):
        if name in argv:
            i = argv.index(name)
            return argv[i + 1]
        return default
    scratch = opt('--scratch', DEFAULT_SCRATCH)
    os.makedirs(scratch, exist_ok=True)
    if '--selftest' in argv:
        res = selftest()
        for r in res:
            print(r['id'], r['result'], r['receipt'])
        sys.exit(0 if all(r['result'] == 'PASS' for r in res) else 1)
    sample = plain_sample()
    with open(E09_SEEDS) as fh:
        e09 = json.load(fh)['perSeed']
    if '--red' in argv:
        import copy
        with open(OUT_JSON) as fh:
            stored = json.load(fh)
        log0 = read_log(OUT_LOG)
        base = checks_for(stored['perSeed'], sample, log0, e09)
        st0 = sample['capture/MFCG/40/plain']['usable'][0]
        st1 = sample['capture/MFCG/80/plain']['usable'][1]
        st2 = sample['capture/MFCG/130/plain']['usable'][2]

        def plant_k1(per, log, smp):
            per[st0]['R2']['fg.recoverability']['value'] = per[st0]['R1']['fg.recoverability']['value'] + 0.0051

        def plant_k2(per, log, smp):
            per[st0]['fg.coverWalled']['valueUnrounded'] *= 1 + 1e-12

        def plant_k3(per, log, smp):
            log[1]['netlog']['urlRequestsNetwork'] = 1

        def plant_l1(per, log, smp):
            per[st2]['R1']['registration']['bestShiftPx'] = [0, 2]

        def plant_l2(per, log, smp):
            per[st0]['graph']['faces'] += 1

        def plant_l3(per, log, smp):
            smp['capture/MFCG/130/plain']['usable'] = smp['capture/MFCG/130/plain']['usable'][:-1]

        def plant_l4(per, log, smp):
            per[st1]['R1']['modalL1'] = 9

        def plant_l5(per, log, smp):
            per[st2]['R2']['textsShown'] = 3
        plants = [('K1', plant_k1), ('K2', plant_k2), ('K3', plant_k3), ('L1', plant_l1), ('L2', plant_l2), ('L3', plant_l3),
                  ('L4', plant_l4), ('L5', plant_l5)]
        print('base:', ' '.join(f"{c['id']} {c['result']}" for c in base))
        caught = 0
        for cid, fn in plants:
            per, log, smp = copy.deepcopy(stored['perSeed']), copy.deepcopy(log0), copy.deepcopy(sample)
            fn(per, log, smp)
            res = {c['id']: c['result'] for c in checks_for(per, smp, log, e09, red=True)}
            others = [k for k, v in res.items() if k != cid and v == 'FAIL']
            ok = res.get(cid) == 'FAIL'
            caught += ok
            print(f"plant {cid}: {cid} {res.get(cid)}" + (f'; also FAIL {others}' if others else ''))
        print(f'red: {caught} of {len(plants)} plants turned their check red')
        sys.exit(1 if caught else 0)
    only = opt('--only')
    stems = [st for s in sample.values() for st in s['usable']]
    if only:
        stems = [st for st in stems if st in only.split(',')]
    test = bool(only)
    frames = {st: svg_frame(st) for st in stems}
    log_path = os.path.join(scratch, 'render-log.test.jsonl') if test else OUT_LOG
    out_dirs = {k: (os.path.join(scratch, 'test-' + k) if test else (RENDER_DIR if v['kept'] else os.path.join(scratch, k)))
                for k, v in VARIANTS.items()}

    def say(msg):
        print(msg, flush=True)
    # geometry
    geo = {}
    for st in stems:
        geo[st] = geometry(st, frames[st], scratch)
        say(f"geometry {st}: graph {geo[st]['graph']['lengthKm']:.3f} km, samples {len(geo[st]['samples']['native'])} / "
            f"{len(geo[st]['samples']['fixed'])}, streetwall {geo[st]['fg.streetwall']['value']:.4f} "
            f"({geo[st]['fg.streetwall.step025']['value']:.4f} at 0.25 m), cover {geo[st]['fg.coverWalled']['value']:.4f}")
    if '--geometry-only' in argv:
        return
    # renders
    if '--no-render' not in argv:
        if os.path.exists(log_path):
            os.remove(log_path)
        for k in VARIANTS:
            os.makedirs(out_dirs[k], exist_ok=True)
            say(f'render {k}: ' + render_session(k, stems, frames, out_dirs, log_path, scratch))
    log = read_log(log_path)
    by_session = {l['session']: {r['id']: r for r in l['results']} for l in log}
    # measures
    per = collections.OrderedDict()
    bld, twr, cbound = {}, {}, {}
    for st in stems:
        mi_ = read_mi(st)
        bld[st] = [f['geometry']['coordinates'][0] for f in mi_['features'] if f['kind'] == 'building']
        twr[st] = [f['geometry']['coordinates'] for f in mi_['features'] if f['kind'] == 'tower']
        merged = ((mi_.get('research') or {}).get('census') or {}).get('mergedVertices', 0)
        perim = max(DG.poly_len(P) for P in bld[st])
        covered = geo[st]['fg.coverWalled']['value'] * DG.area(geo[st]['enclosure'])
        # the adapter merges coincident vertices within 1 mm (V12 section 3.2.2): each merge moves one vertex by <= 1 mm,
        # which changes one footprint's area by at most 1 mm x its perimeter
        cbound[st] = {'mergedVertices': merged, 'boundRel': merged * 0.001 * perim / covered if covered else None}
    for st in stems:
        fr = frames[st]
        g = geo[st]
        p = {'frame': {k: fr[k] for k in ('width', 'height', 's', 'mPerPxNative')}, 'graph': g['graph'],
             'measureInputSha256': g['measureInputSha256'], 'buildings': g['buildings'], 'stepsM': g['stepsM'],
             'samplesOffStreetSpace': g['samplesOffStreetSpace'],
             'fg.streetwall': g['fg.streetwall'], 'fg.streetwall.step025': g['fg.streetwall.step025'],
             'fg.coverWalled': g['fg.coverWalled'], 'underWallsKm': g['underWallsKm'], 'wallHalfM': g['wallHalfM'],
             'towerRadiusM': g['towerRadiusM'], 'blocksIntramural': g['blocksIntramural'],
             'blocksIntramural025': g['blocksIntramural025']}
        for k, v in VARIANTS.items():
            f = dpr_of(fr, v['scale'])
            path = os.path.join(out_dirs[k], st + '.png')
            r = Raster(path, fr['paper'])
            smp = g['samples'][v['scale']]
            rr = {'fg.recoverability': recoverability(r, fr, f, smp), 'dpr': f, 'raster': [r.W, r.H],
                  'pngSha256': file_sha(path)}
            lrec = by_session.get(v['session'], {}).get(st, {})
            rr['textsShown'] = (lrec.get('drawn') or {}).get('textsShown')
            if k == 'R1':
                fm = figure_mask(r)
                rr['fg.recoverability.meanWindow'] = recoverability(r, fr, f, smp, window='mean')
                rr['registration'] = registration(r, fr, f, g, smp, fm, bld[st], twr[st])
                rr['coverPixels'] = raster_cover(fm, fr, f, g['enclosure'])
                rr['modalL1'] = modal_l1(r)
                rr['png'] = os.path.relpath(path, ROOT)
            p[k] = rr
        per[st] = round_floats(p)
        per[st]['fg.coverWalled']['valueUnrounded'] = g['fg.coverWalled']['value']
        per[st]['coverMerge'] = cbound[st]
        say(f"measured {st}: R1 {p['R1']['fg.recoverability']['value']:.4f} R2 {p['R2']['fg.recoverability']['value']:.4f} "
            f"R3 {p['R3']['fg.recoverability']['value']:.4f} R4 {p['R4']['fg.recoverability']['value']:.4f}")
    if test:
        json.dump(per, open(os.path.join(scratch, 'test-per.json'), 'w'), indent=1)
        return
    summaries = summarise(per, sample)
    checks = checks_for(per, sample, log, e09)
    head = {'record': 'docs/calibration/E08-mfcg-renders.md', 'workItem': 'W-08', 'lane': 'm1/W-08', 'script': SCRIPT,
            'helper': 'research:baselines/render_svg_offline.mjs', 'metricVersion': VERSION, 'referenceBuild': REFERENCE_BUILD,
            'scriptSha256': file_sha(os.path.abspath(__file__)), 'helperSha256': file_sha(HELPER), 'geometryKey': geometry_key(),
            'uses': {'derived_graph.py': file_sha(DG.__file__), 'measure_mfcg.py': file_sha(MM.__file__),
                     'measure_ftg.py': file_sha(MF.__file__)},
            'parameters': {'stepPx': STEP_PX, 'tolerancePx': TOL_PX, 'scanPx': SCAN_PX, 'paperL1': PAPER_L1,
                           'normalStepM': NORMAL_STEP_M, 'streetwallM': WALL_M, 'fixedPxPerM': FIXED_PX_PER_M,
                           'unitM': UNIT_M, 'determinismTolerance': DETERMINISM_TOL, 'registrationMin': REG_MIN, 'towerMin': TOWER_MIN},
            'inputs': {'statsJsonSha256': file_sha(os.path.join(SWEEP, 'stats.json')), 'e09SeedsSha256': file_sha(E09_SEEDS),
                       'planJsonSha256': file_sha(MM.PLAN_JSON), 'exportCheckSha256': file_sha(os.path.join(SWEEP, 'export-check.json')),
                       'renderLogSha256': file_sha(log_path)},
            'variants': VARIANTS, 'rasters': os.path.relpath(RENDER_DIR, ROOT), 'renderLog': os.path.relpath(OUT_LOG, ROOT),
            'sample': sample}
    out = {**head, 'summaries': round_floats(summaries), 'checks': checks, 'perSeed': per}
    with open(OUT_JSON, 'w') as fh:
        json.dump(out, fh, indent=1)
        fh.write('\n')
    for c in checks:
        say(f"{c['id']} {c['result']} {c['receipt']}")
    n_fail = sum(c['result'] == 'FAIL' for c in checks)
    say(f'checks: {len(checks) - n_fail} PASS, {n_fail} FAIL')
    sys.exit(1 if n_fail else 0)


if __name__ == '__main__':
    main()
