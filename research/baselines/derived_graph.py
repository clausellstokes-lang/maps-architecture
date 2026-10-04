#!/usr/bin/env python3
"""research/baselines/derived_graph.py -- MFCG cluster blocks, the derived street graph, the court share and the
signature vectors (M-1 work item W-09; V12 sections 3.4.1 and 3.4.2; rulings R-10, R-19, R-22, R-40).

Lane m1/W-09 (docs/calibration/M-1-plan.md section 2, row W-09; record docs/calibration/E09-mfcg-derived-graph.md).
Research side only; our own code, standard library plus PIL (installed). It reads ONLY the MeasureInput files that
adapters/mfcg.py wrote (research/baselines/inputs/MFCG/itch-12710731/*.metric.geojson.gz), plan.json and the sweep's
export-check.json (through measure_mfcg.plan_families); it never opens a captured program bundle and touches no site.
It imports measure_ftg.py (the R-10 vector, cluster blocks), measure_ng.py (the minimum-area rectangle) and
measure_mfcg.py (the plan sample, V12 section 3.5.1's estimators) unchanged.

The declared twin of V12 section 3.4.1 (metricVersion 1.0.0 kept, R-22), every step on one raster grid of step RES:
  cluster blocks     footprints whose rings lie within 1.0 m join one cluster (measure_ftg.py's union-find, the same
                     ring distance, grid and order, so the clusters are the vector's own); per cluster the footprints are
                     filled on a raster aligned to the map grid and closed by a dilation then an erosion with a square
                     kernel of half-width 3 m (six 3 x 3 dilations then six 3 x 3 erosions -- cell for cell PIL's
                     MaxFilter(13) then MinFilter(13), --selftest S1); the BLOCK is that closed set with its holes
                     filled (the region its outline bounds; a run-length fill equal to PIL's floodfill, S2). A block is
                     intramural when the area-weighted centroid of its footprints lies inside the outermost enclosure
  the domain         the outermost enclosure (the city ring); on a water setting the sea polygons and the river
                     corridors (centreline, the export's width) are taken out (no street runs on water; the stress
                     family only, descriptive)
  street space S     the domain less every block, its 8-connected parts that reach the domain's edge
  the skeleton       S thinned to idempotence by the eight-direction sequential hit-or-miss thinning (the Golay L
                     elements, one PIL ImageMorph lookup table per direction, applied N, NE, E, SE, S, SW, W, NW; whole
                     raster for twelve passes, then only the tiles still changing -- the same cells, S3): a homotopic
                     skeleton centred in the street space, the raster medial axis of R-22
  the graph          on mixed adjacency (4-neighbours, and diagonal neighbours whose two common 4-neighbours are off
                     the skeleton): node cells are the cells whose degree is not 2 and the cells of a full 2 x 2 quad;
                     8-adjacent node cells form one node at their mean position; each chain of the other cells is one
                     edge between the node cells it links to (a self-loop when both links reach one node; an isolated
                     loop gets a node of its own)
  spurs              an edge with a degree-1 end shorter than SPUR (8 m, measured on the simplified line) is removed and
                     degree-2 nodes are dissolved (their two edges joined), repeated until no such edge is left
  merge              nodes within MERGE (2 m; single linkage) become one node at their mean position; an edge with
                     both ends in one merged node and no longer than 2 x MERGE is internal and removed (E11's junction
                     rule), any longer one stays as a self-loop; degree-2 nodes dissolved again; then every edge's
                     polyline (node, cell centres, node) is simplified once by Douglas-Peucker at RES
  the derived graph  the skeleton of the street space's parts that reach the domain's edge (the curtain, or the water
                     on a water setting: a river makes two banks); a part enclosed by blocks alone is a pocket of a few
                     cells, reported (count and area), not measured
Metrics (V12 section 3.4.2):
  sgd.tShare         degree-3 nodes with two arms within 20 degrees of straight / degree-3 nodes; an arm's direction is
                     node -> the point 10 m along its edge (the edge's far end when shorter); a self-loop gives two arms
  sgd.deadEnds       degree-1 nodes per km of the graph's length
  blockc.perHa       intramural blocks / the enclosure's area in hectares
  blockc.lotsPer     footprints per intramural block; per seed the median (type 7)
  block.courtShare   deep intramural blocks (largest inscribed circle radius > 1.5 x the seed's median footprint short
                     side, the minimum-area rectangle's, measure_ng.py's) holding an unbuilt interior component (the
                     block less every footprint dilated by 5 % of that side) of area >= 0.5 x the median footprint area
                     that touches no block edge / deep blocks -- E11 section 2's definition: the court raster is the
                     block raster subdivided k times (k the least integer giving a cell <= half the dilation distance),
                     components 4-adjacent, touching the edge 8-adjacent. The radius in cells is the Euclidean distance
                     from a cell centre to the nearest background cell centre, less half a cell: decided by the
                     chessboard and city-block erosion depths where they bracket it (d_inf <= d2 <= sqrt 2 d_inf,
                     d1 / sqrt 2 <= d2 <= d1), else by the exact transform on the window of the cells that can exceed
                     the threshold. MFCG's inner-plot removal (R-19). Each intramural block also carries its
                     minimum-area rectangle sides (W-12's block extents, metres)
  variety vector     R-10's eight components by measure_ftg.m_signature on MFCG's MeasureInput, its cluster blocks by
                     cluster_blocks_lut (measure_ftg's function with the LUT closing; the whole record equal to the
                     unmodified function's on eight maps, S4 and S5): the ways are the exported roads (all of class
                     arterial). Beside it (a companion, for W-15's ruling): components 2-5 over the street space's lanes
                     -- the derived graph's edges inside the enclosure and the exported roads outside it
Checks (the W-09 row): planarity (no two edges of the final graph cross); the face count (the skeleton's and the raw
graph's Euler numbers equal the street space's by Gray's bit quads, so the graph's faces E - V + C equal the street
space's holes, after the build, the pruning and the merge); the intramural blocks' area sum <= the enclosure's area
(and their overlap); the seed-to-seed CV of sgd.* and blockc.* per family (handed to W-14); one vector per usable plain
seed per size; the cluster twin; every usable seed in every summary.

Usage (project root):
  python3 research/baselines/derived_graph.py [--json OUT] [--seeds OUT] [--vectors OUT] [--red]
                                              [--step M] [--spur M] [--merge M] [--only STEM[,STEM...]] [--fixtures]
    default: the five 2026-09-25 fixtures, then every captured M-1 sweep seed (usable and retries; the summaries read
    the usable ones only), writing docs/calibration/E09-mfcg-derived-graph.json (summary and checks),
    E09-mfcg-derived-graph.seeds.json (the per-seed file W-13 and W-14 read) and E09-mfcg-derived-graph.vectors.json
    (the MFCG vectors per usable plain seed, the file W-15 reads); exit 1 on any FAIL
    --red      reads the stored per-seed file and plants four faults (a crossing in one fixture's graph, a face too
               many in another's, one vector dropped, one block-area sum pushed past its enclosure), so the checker
               must go red; writes nothing
    --from-seeds FILE   forms the summaries and the checks again from a stored per-seed file, with no measurement
               (writes only to --json when given)
    --step / --spur / --merge   the raster step and the two thresholds (W-14's sensitivity; R-22) -- with any of them,
               or with --only / --fixtures, the run writes only to the paths given explicitly (default: it prints one
               JSON line per map)
  python3 research/baselines/derived_graph.py --selftest [--json OUT]
    S0-S5: the Euler number on synthetic shapes; the LUT closing, the run-length fill and the tiled thinning equal
    their plain PIL forms cell for cell; cluster_blocks_lut and the vector equal measure_ftg's unmodified functions
"""
import collections
import gzip
import hashlib
import json
import math
import os
import re
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import measure_ftg as MF    # noqa: E402  (the R-10 vector, cluster blocks, geometry)
import measure_ng as MN     # noqa: E402  (obb_and_minwidth, q7)
import measure_mfcg as MM   # noqa: E402  (plan_families, estimate, pct)
from PIL import Image, ImageChops, ImageDraw, ImageMorph   # noqa: E402

SCRIPT = 'research:baselines/derived_graph.py'
VERSION = '1.0.0'           # metricVersion kept (R-22)
REFERENCE_BUILD = 'itch:12710731'
INPUTS = os.path.join(HERE, 'inputs', 'MFCG', 'itch-12710731')
OUT_JSON = os.path.join(ROOT, 'docs', 'calibration', 'E09-mfcg-derived-graph.json')
OUT_SEEDS = os.path.join(ROOT, 'docs', 'calibration', 'E09-mfcg-derived-graph.seeds.json')
OUT_VECTORS = os.path.join(ROOT, 'docs', 'calibration', 'E09-mfcg-derived-graph.vectors.json')
FIXTURES = ['exports-2026-09-25.s555001-size40-gates0', 'exports-2026-09-25.s555001-size40-gates1',
            'exports-2026-09-25.s555001-size40-gates4', 'exports-2026-09-25.s555001-size40-gates9',
            'exports-2026-09-25.s777001-size80-river-coast']
SWEEP_PREFIX = 'exports-sweep-m1-2026-10-03.'
RES = 0.5                   # m per raster cell (R-22)
GAP = 1.0                   # cluster gap (V12 3.4.1, metric)
CLOSE = 3.0                 # closing radius (V12 3.4.1, metric)
SPUR = 8.0                  # spur pruning (V12 3.4.1, metric)
MERGE = 2.0                 # node merge (V12 3.4.1)
ARM = 10.0                  # arm direction, 10 m along (junction.angles' rule)
STRAIGHT = 20.0             # sgd.tShare: two arms within 20 degrees of straight
DEEP_REL, DILATE_REL, COURT_AREA_REL, COURT_CELL_REL = 1.5, 0.05, 0.5, 0.5   # block.courtShare (E11 section 2)
CV_METRICS = ['sgd.tShare', 'sgd.deadEnds', 'blockc.perHa', 'blockc.lotsPer']
q7 = MF.q7

# ---------------------------------------------------------------- the thinning tables (Golay L, eight directions)
_GOLAY = ['000 .1. 111', '.00 110 .1.', '1.0 110 1.0', '.1. 110 .00',
          '111 .1. 000', '.1. 011 00.', '0.1 011 0.1', '00. 011 .1.']
THIN_OPS = [ImageMorph.MorphOp(patterns=['(%s)->0' % p]) for p in _GOLAY]


def _quad_op(fn):
    """a lookup table that marks a cell when its 2 x 2 quad (cell, east, south, south-east) satisfies fn(bits)"""
    lut = bytearray(512)
    for i in range(512):
        # bit k of i is the window cell k in row-major order (ImageMorph's order: bitpattern reversed)
        b = [(i >> k) & 1 for k in range(9)]
        lut[i] = 1 if fn(b[4], b[5], b[7], b[8]) else 0
    return ImageMorph.MorphOp(lut=lut)


Q1_OP = _quad_op(lambda a, b, c, d: a + b + c + d == 1)
Q3_OP = _quad_op(lambda a, b, c, d: a + b + c + d == 3)
QD_OP = _quad_op(lambda a, b, c, d: (a + b + c + d == 2) and a == d)


def euler8(img):
    """Gray's bit-quad Euler number of the 8-connected foreground (components less 4-connected holes)"""
    q1 = Q1_OP.apply(img)[1].histogram()[255]
    q3 = Q3_OP.apply(img)[1].histogram()[255]
    qd = QD_OP.apply(img)[1].histogram()[255]
    v = q1 - q3 - 2 * qd
    assert v % 4 == 0, v
    return v // 4


def thin_whole(img):
    """sequential eight-direction thinning to idempotence over the whole raster; returns (skeleton, passes)"""
    passes = 0
    while True:
        changed = 0
        for op in THIN_OPS:
            n, img = op.apply(img)
            changed += n
        passes += 1
        if changed == 0:
            return img, passes


def thin(img, tile=64, whole_passes=12):
    """the same thinning, cell for cell: whole-raster passes first, then only the tiles that changed in the last pass
    and their eight neighbours (a change travels at most one cell per direction step, eight per pass, so a tile two
    tiles away from every change cannot change); each direction step is computed for every active tile from the state
    before the step, then pasted; returns (skeleton, passes)"""
    W, H = img.size
    passes = 0
    before = img
    while passes < whole_passes:
        before = img
        changed = 0
        for op in THIN_OPS:
            n, img = op.apply(img)
            changed += n
        passes += 1
        if changed == 0:
            return img, passes
    nx, ny = (W + tile - 1) // tile, (H + tile - 1) // tile

    def grow(ts):
        out = set()
        for tx, ty in ts:
            for dx in (-1, 0, 1):
                for dy in (-1, 0, 1):
                    if 0 <= tx + dx < nx and 0 <= ty + dy < ny:
                        out.add((tx + dx, ty + dy))
        return out
    diff = ImageChops.difference(before, img)
    active = grow({(tx, ty) for tx in range(nx) for ty in range(ny)
                   if diff.crop((tx * tile, ty * tile, min(W, tx * tile + tile), min(H, ty * tile + tile))).getbbox()})
    while active:
        changed_tiles = set()
        for op in THIN_OPS:
            updates = []
            for tx, ty in sorted(active):
                x0, y0 = tx * tile, ty * tile
                x1, y1 = min(W, x0 + tile), min(H, y0 + tile)
                cx0, cy0, cx1, cy1 = max(0, x0 - 2), max(0, y0 - 2), min(W, x1 + 2), min(H, y1 + 2)
                crop = img.crop((cx0, cy0, cx1, cy1))
                n, res = op.apply(crop)
                if n == 0:
                    continue
                inner = res.crop((x0 - cx0, y0 - cy0, x1 - cx0, y1 - cy0))
                if ImageChops.difference(inner, img.crop((x0, y0, x1, y1))).getbbox():
                    updates.append(((x0, y0), inner))
                    changed_tiles.add((tx, ty))
            for pos, inner in updates:
                img.paste(inner, pos)
        passes += 1
        active = grow(changed_tiles) if changed_tiles else set()
    return img, passes


DIL8 = ImageMorph.MorphOp(op_name='dilation8')     # 3 x 3 maximum (the outermost cells are written 0)
ERO8 = ImageMorph.MorphOp(op_name='erosion8')      # 3 x 3 minimum
ERO4 = ImageMorph.MorphOp(op_name='erosion4')      # the minimum over the cell and its four 4-neighbours


def erosion_depth(img, op, cap):
    """min(cap, the number of non-empty states under repeated erosion): the largest distance, in that erosion's metric,
    from a foreground cell to the nearest background cell (a cell next to the background counts 1); the raster is
    cropped to its foreground's box with a two-cell background margin between erosions (cells outside the box are
    background, so the erosion is unchanged)"""
    k = 0
    while True:
        bb = img.getbbox()
        if bb is None or k >= cap:
            return k
        k += 1
        img = op.apply(img.crop((bb[0] - 2, bb[1] - 2, bb[2] + 2, bb[3] + 2)))[1]


def max_edt_candidates(img, tau, hi):
    """the largest squared Euclidean distance (cell centre to the nearest background cell centre) over the cells that
    could exceed tau: chessboard depth > tau / sqrt 2 and city-block depth > tau; computed exactly on the
    window of those cells grown by hi + 1 (a candidate's nearest background cell lies within hi of it); returns the
    squared distance (0 when no candidate)"""
    e8 = img
    for _ in range(int(math.floor(tau / math.sqrt(2)))):
        e8 = ERO8.apply(e8)[1]
    e4 = img
    for _ in range(int(math.floor(tau))):
        e4 = ERO4.apply(e4)[1]
    cand = ImageChops.multiply(e8, e4)
    bb = cand.getbbox()
    if bb is None:
        return 0.0
    g = int(math.ceil(hi)) + 1
    W, H = img.size
    x0, y0 = max(0, bb[0] - g), max(0, bb[1] - g)
    x1, y1 = min(W, bb[2] + g), min(H, bb[3] + g)
    win = img.crop((x0, y0, x1, y1))
    cw = cand.crop((x0, y0, x1, y1)).tobytes()
    return max_edt(win.tobytes(), x1 - x0, y1 - y0, only=cw)


def close_square(img, h):
    """closing by the square of half-width h cells: h 3 x 3 dilations then h 3 x 3 erosions -- the same cells as PIL's
    MaxFilter(2h + 1) then MinFilter(2h + 1) on a raster whose border is background (--selftest S1)"""
    for _ in range(h):
        img = DIL8.apply(img)[1]
    for _ in range(h):
        img = ERO8.apply(img)[1]
    return img


_NONZERO_RUN = re.compile(b'[^\x00]+')
_ZERO_RUN = re.compile(b'\x00+')


def row_runs(buf, W, H, zero=False):
    """per row, the maximal runs of non-zero (or zero) cells: a list per row of (x0, x1)"""
    rx = _ZERO_RUN if zero else _NONZERO_RUN
    return [[(m.start() - y * W, m.end() - y * W) for m in rx.finditer(buf, y * W, (y + 1) * W)] for y in range(H)]


def label_runs(rows, diag=False):
    """union-find over runs; runs of consecutive rows join when they share a column (4-adjacency) or, with diag, also
    when they touch at a corner (8-adjacency); returns (run list [(y, x0, x1)], root per run)"""
    runs, par = [], []
    prev = []                       # (x0, x1, run id) of the previous row
    slack = 1 if diag else 0

    def find(i):
        while par[i] != i:
            par[i] = par[par[i]]
            i = par[i]
        return i
    for y, rr in enumerate(rows):
        cur = []
        j = 0
        for x0, x1 in rr:
            rid = len(runs)
            runs.append((y, x0, x1))
            par.append(rid)
            while j < len(prev) and prev[j][1] + slack <= x0:
                j += 1
            k = j
            while k < len(prev) and prev[k][0] < x1 + slack:
                ra, rb = find(rid), find(prev[k][2])
                if ra != rb:
                    par[ra] = rb
                k += 1
            cur.append((x0, x1, rid))
        prev = cur
    return runs, [find(i) for i in range(len(runs))]


def fill_holes(img):
    """the background cells not 4-connected to the raster's border become foreground"""
    W, H = img.size
    buf = img.tobytes()
    runs, root = label_runs(row_runs(buf, W, H, zero=True))
    outside = set(root[i] for i, (y, x0, x1) in enumerate(runs) if y == 0 or y == H - 1 or x0 == 0 or x1 == W)
    out = bytearray(buf)
    for i, (y, x0, x1) in enumerate(runs):
        if root[i] not in outside:
            out[y * W + x0:y * W + x1] = b'\xff' * (x1 - x0)
    return Image.frombytes('L', (W, H), bytes(out))


# ---------------------------------------------------------------- small geometry
def ring_open(coords):
    return MF.ring_open(coords)


def area(P):
    return abs(MF.sarea(P))


def poly_len(c):
    return sum(math.hypot(c[i + 1][0] - c[i][0], c[i + 1][1] - c[i][1]) for i in range(len(c) - 1))


def dp_simplify(pts, tol):
    """Douglas-Peucker, iterative; keeps the end points"""
    n = len(pts)
    if n <= 2:
        return list(pts)
    keep = [False] * n
    keep[0] = keep[-1] = True
    stack = [(0, n - 1)]
    while stack:
        i, j = stack.pop()
        best, bi = -1.0, -1
        for k in range(i + 1, j):
            d = MF.seg_dist(pts[k], pts[i], pts[j])
            if d > best:
                best, bi = d, k
        if best > tol:
            keep[bi] = True
            stack.append((i, bi))
            stack.append((bi, j))
    return [p for p, k in zip(pts, keep) if k]


def point_along(poly, s):
    """the point at arc length s along poly (its end when shorter)"""
    acc = 0.0
    for i in range(len(poly) - 1):
        a, b = poly[i], poly[i + 1]
        L = math.hypot(b[0] - a[0], b[1] - a[1])
        if L > 0 and acc + L >= s:
            t = (s - acc) / L
            return (a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]))
        acc += L
    return poly[-1]


# ---------------------------------------------------------------- exact Euclidean distance transform (block rasters)
def _dt1(f, n):
    """Felzenszwalb and Huttenlocher's 1D squared distance transform of the sampled function f (finite values)"""
    d = [0.0] * n
    v = [0] * n
    z = [0.0] * (n + 1)
    k = 0
    z[0] = -1e30
    z[1] = 1e30
    for q in range(1, n):
        fq = f[q] + q * q
        while True:
            p = v[k]
            s = (fq - (f[p] + p * p)) / (2 * (q - p))
            if s <= z[k]:
                k -= 1
            else:
                break
        k += 1
        v[k] = q
        z[k] = s
        z[k + 1] = 1e30
    k = 0
    for q in range(n):
        while z[k + 1] < q:
            k += 1
        p = v[k]
        d[q] = (q - p) * (q - p) + f[p]
    return d


def max_edt(mask_bytes, W, H, only=None):
    """the maximum over foreground cells (or over the cells non-zero in only) of the squared Euclidean distance to the
    nearest background cell centre"""
    BIG = float(4 * (W * W + H * H) + 1)
    cols = []
    for x in range(W):
        cols.append(_dt1([BIG if mask_bytes[y * W + x] else 0.0 for y in range(H)], H))
    best = 0.0
    for y in range(H):
        row = (only if only is not None else mask_bytes)[y * W:(y + 1) * W]
        if not any(row):
            continue
        d = _dt1([cols[x][y] for x in range(W)], W)
        m = max(d[x] for x in range(W) if row[x])
        if m > best:
            best = m
    return best


# ---------------------------------------------------------------- the map
class Map:
    def __init__(self, stem, mi, res=RES, spur=SPUR, merge=MERGE):
        self.stem, self.mi, self.res, self.spur, self.merge = stem, mi, res, spur, merge
        self.B = [ring_open(f['geometry']['coordinates'][0]) for f in mi['features'] if f['kind'] == 'building']
        enc = [f for f in mi['features'] if f['kind'] == 'enclosure']
        self.enclosure = ring_open(enc[0]['geometry']['coordinates'][0]) if enc else None
        self.enc_holes = [ring_open(h) for h in enc[0]['geometry']['coordinates'][1:]] if enc else []

    # ---- clusters: measure_ftg's union-find, unchanged in effect
    def clusters(self):
        B = self.B
        boxes = [MF.bbox(P) for P in B]
        g = MF.Grid(25.0)
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
                    if MF.proper_x(P[i], P[(i + 1) % n], Q[j], Q[(j + 1) % mq]):
                        return 0.0
            if MF.inside(P[0], Q) or MF.inside(Q[0], P):
                return 0.0
            d = min(MF.seg_dist(p, Q[j], Q[(j + 1) % mq]) for p in P for j in range(mq))
            return min(d, min(MF.seg_dist(qq, P[i], P[(i + 1) % n]) for qq in Q for i in range(n)))
        for i, P in enumerate(B):
            x0, y0, x1, y1 = boxes[i]
            for j in g.query_box(x0 - GAP, y0 - GAP, x1 + GAP, y1 + GAP):
                if j <= i:
                    continue
                bj = boxes[j]
                if bj[0] > x1 + GAP or bj[2] < x0 - GAP or bj[1] > y1 + GAP or bj[3] < y0 - GAP:
                    continue
                if find(i) != find(j) and ring_dist(P, B[j]) <= GAP:
                    par[find(i)] = find(j)
        groups = collections.OrderedDict()
        for i in range(len(B)):
            groups.setdefault(find(i), []).append(i)
        self.boxes = boxes
        self.groups = groups
        return groups

    # ---- the grid
    def setup_grid(self):
        res = self.res
        xs = [p[0] for p in self.enclosure]
        ys = [p[1] for p in self.enclosure]
        pad = 8
        self.OX = res * math.floor(min(xs) / res) - pad * res
        self.OY = res * math.ceil(max(ys) / res) + pad * res
        self.W = int(math.ceil((max(xs) - self.OX) / res)) + pad
        self.H = int(math.ceil((self.OY - min(ys)) / res)) + pad

    def px(self, p, ox=None, oy=None):
        ox = self.OX if ox is None else ox
        oy = self.OY if oy is None else oy
        return ((p[0] - ox) / self.res, (oy - p[1]) / self.res)

    def centre_of(self, i, j):
        return (self.OX + (i + 0.5) * self.res, self.OY - (j + 0.5) * self.res)

    # ---- one block raster (aligned to the grid)
    def block_raster(self, ids):
        res = self.res
        pad = CLOSE + 2.0
        x0 = min(self.boxes[i][0] for i in ids) - pad
        y0 = min(self.boxes[i][1] for i in ids) - pad
        x1 = max(self.boxes[i][2] for i in ids) + pad
        y1 = max(self.boxes[i][3] for i in ids) + pad
        a = int(math.floor((x0 - self.OX) / res))
        b = int(math.floor((self.OY - y1) / res))
        a1 = int(math.ceil((x1 - self.OX) / res))
        b1 = int(math.ceil((self.OY - y0) / res))
        W, H = a1 - a, b1 - b
        lox, loy = self.OX + a * res, self.OY - b * res
        im = Image.new('L', (W, H), 0)
        dr = ImageDraw.Draw(im)
        for i in ids:
            dr.polygon([self.px(p, lox, loy) for p in self.B[i]], fill=255)
        closed = close_square(im, int(round(CLOSE / res)))
        closed_area = closed.histogram()[255] * res * res
        filled = fill_holes(closed)
        return {'a': a, 'b': b, 'W': W, 'H': H, 'lox': lox, 'loy': loy, 'img': filled,
                'area': filled.histogram()[255] * res * res, 'closedArea': closed_area}

    # ---- everything
    def run(self):
        out = {'stem': self.stem, 'buildings': len(self.B)}
        if self.enclosure is None:
            out['notApplicable'] = 'no enclosure'
            return out
        res = self.res
        groups = self.clusters()
        self.setup_grid()
        encA = area(self.enclosure) - sum(area(h) for h in self.enc_holes)
        out['enclosureHa'] = encA / 1e4
        # footprint medians (all footprints of the seed): area and minimum-area rectangle short side
        areas = [area(P) for P in self.B]
        shorts = [MN.obb_and_minwidth(P)[1] for P in self.B]
        med_area, med_short = q7(areas, .5), q7(shorts, .5)
        out['medianFootprint'] = {'areaM2': med_area, 'shortSideM': med_short}
        # blocks
        ex0, ey0 = self.OX, self.OY - self.H * res
        ex1, ey1 = self.OX + self.W * res, self.OY
        blocks = []
        sizes_all = []
        for root, ids in groups.items():
            sizes_all.append(len(ids))
            bx0 = min(self.boxes[i][0] for i in ids)
            by0 = min(self.boxes[i][1] for i in ids)
            bx1 = max(self.boxes[i][2] for i in ids)
            by1 = max(self.boxes[i][3] for i in ids)
            if bx1 < ex0 or bx0 > ex1 or by1 < ey0 or by0 > ey1:
                continue
            sa = sx = sy = 0.0
            for i in ids:
                a_ = area(self.B[i])
                c_ = MF.A.centroid(self.B[i])
                sa += a_
                sx += a_ * c_[0]
                sy += a_ * c_[1]
            cen = (sx / sa, sy / sa) if sa > 0 else MF.A.centroid(self.B[ids[0]])
            intra = MF.inside(cen, self.enclosure) and not any(MF.inside(cen, h) for h in self.enc_holes)
            blk = self.block_raster(ids)
            blk.update({'root': root, 'ids': ids, 'centroid': cen, 'intramural': intra})
            blocks.append(blk)
        self.blocks = blocks
        sizes = collections.Counter(sizes_all)
        out['clusters'] = {'n': len(groups), 'singletons': sizes.get(1, 0), 'largestFootprintCount': max(sizes) if sizes else 0}
        intra = [b for b in blocks if b['intramural']]
        out['blockc.perHa'] = {'value': len(intra) / out['enclosureHa'], 'blocks': len(intra), 'walledHa': out['enclosureHa']}
        lots = [len(b['ids']) for b in intra]
        out['blockc.lotsPer'] = {'value': q7(lots, .5), 'mean': sum(lots) / len(lots) if lots else None,
                                 'p90': q7(lots, .9), 'max': max(lots) if lots else None,
                                 'singletonShare': sum(1 for v in lots if v == 1) / len(lots) if lots else None}
        # the global rasters: domain, blocks, street space
        D = Image.new('L', (self.W, self.H), 0)
        dd = ImageDraw.Draw(D)
        dd.polygon([self.px(p) for p in self.enclosure], fill=255)
        for h in self.enc_holes:
            dd.polygon([self.px(p) for p in h], fill=0)
        water = {'sea': 0, 'river': 0}
        for f in self.mi['features']:
            if f['kind'] == 'water' and f['geometry']['type'] == 'Polygon':
                dd.polygon([self.px(p) for p in ring_open(f['geometry']['coordinates'][0])], fill=0)
                water['sea'] += 1
            elif f['kind'] == 'river' and f['geometry']['type'] == 'LineString':
                w = (f.get('props') or {}).get('widthM') or 0
                if w:
                    dd.line([self.px(p) for p in f['geometry']['coordinates']], fill=0,
                            width=max(1, int(round(w / res))), joint='curve')
                    water['river'] += 1
        out['waterTakenOut'] = water
        K = Image.new('L', (self.W, self.H), 0)
        overlap_px = 0
        for blk in blocks:
            if blk['a'] < 0 or blk['b'] < 0 or blk['a'] + blk['W'] > self.W or blk['b'] + blk['H'] > self.H:
                # crop to the grid (an extramural cluster reaching past the domain's frame)
                box = (max(0, -blk['a']), max(0, -blk['b']), min(blk['W'], self.W - blk['a']), min(blk['H'], self.H - blk['b']))
                if box[2] <= box[0] or box[3] <= box[1]:
                    continue
                sub = blk['img'].crop(box)
                pos = (blk['a'] + box[0], blk['b'] + box[1])
            else:
                sub = blk['img']
                pos = (blk['a'], blk['b'])
            if blk['intramural']:
                region = K.crop((pos[0], pos[1], pos[0] + sub.size[0], pos[1] + sub.size[1]))
                overlap_px += ImageChops.multiply(region, sub).histogram()[255]
            K.paste(255, (pos[0], pos[1], pos[0] + sub.size[0], pos[1] + sub.size[1]), sub)
        intra_area = sum(b['area'] for b in intra)
        out['blockAreas'] = {'intramuralSumM2': intra_area, 'enclosureM2': encA, 'ratio': intra_area / encA,
                             'intramuralOverlapM2': overlap_px * res * res,
                             'intramuralClosedSumM2': sum(b['closedArea'] for b in intra)}
        S0 = ImageChops.subtract(D, K)
        # the street space proper: the 8-connected parts of S0 that reach the domain's edge (the curtain, or the water
        # on a water setting); a part enclosed by blocks alone is a pocket -- reported, not measured
        W_, H_ = S0.size
        edge = ImageChops.multiply(S0, DIL8.apply(ImageChops.invert(D))[1]).tobytes()
        sbuf = S0.tobytes()
        runs, root = label_runs(row_runs(sbuf, W_, H_), diag=True)
        reach = set()
        area_of = collections.Counter()
        for i, (y, x0, x1) in enumerate(runs):
            area_of[root[i]] += x1 - x0
            if root[i] not in reach and _NONZERO_RUN.search(edge, y * W_ + x0, y * W_ + x1):
                reach.add(root[i])
        keep = bytearray(sbuf)
        for i, (y, x0, x1) in enumerate(runs):
            if root[i] not in reach:
                keep[y * W_ + x0:y * W_ + x1] = bytes(x1 - x0)
        S = Image.frombytes('L', (W_, H_), bytes(keep))
        pockets = [area_of[r] * res * res for r in area_of if r not in reach]
        out['streetSpace'] = {'areaM2': S.histogram()[255] * res * res, 'parts': len(reach),
                              'domainM2': D.histogram()[255] * res * res,
                              'pockets': len(pockets), 'pocketAreaM2': sum(pockets),
                              'largestPocketM2': max(pockets, default=0.0)}
        chi_S = euler8(S)
        skel, passes = thin(S)
        chi_skel = euler8(skel)
        out['raster'] = {'stepM': res, 'width': self.W, 'height': self.H, 'thinningPasses': passes,
                         'eulerStreetSpace': chi_S, 'eulerSkeleton': chi_skel}
        G = self.graph(skel)
        out['graphRaw'] = G.summary()
        # the raw graph keeps its isolated nodes (a pocket thinned to one cell is a component of one node)
        isolated = len(G.nodes) - len(G.incidence())
        v_raw, e_raw = len(G.nodes), len(G.edges)
        c_raw = len(G.components()) + isolated
        chi_raw = v_raw - e_raw
        faces_raw = e_raw - v_raw + c_raw
        holes_S = c_raw - chi_S
        G.prune(self.spur)
        faces_pruned = G.faces()
        G.merge_nodes(self.merge)
        G.prune(self.spur)          # the final graph keeps no spur shorter than SPUR (the merge moves ends by <= MERGE)
        G.simplify()
        faces_merged = G.faces()
        out['topology'] = {'eulerStreetSpace': chi_S, 'eulerSkeleton': chi_skel, 'eulerGraphRaw': chi_raw,
                           'componentsRaw': c_raw, 'isolatedNodes': isolated, 'holesStreetSpace': holes_S,
                           'nodeClusterHoleLoops': G.hole_loops,
                           'facesRaw': faces_raw, 'facesPruned': faces_pruned, 'facesMerged': faces_merged,
                           'mergeCollapsedFaces': G.collapsed, 'mergeInternalLongestM': G.collapsed_max_edge,
                           'mergedGroups': G.merged_groups, 'internalEdgesRemoved': G.internal_removed,
                           'chainAnomalies': G.anomalies}
        sub = G
        self.graph_main = sub
        comps = sub.components()
        out['graphParts'] = len(comps)
        out['crossings'] = sub.crossings()
        L = sub.length()
        deg = sub.degrees()
        dcount = collections.Counter(deg.values())
        t3, n3 = sub.t_share()
        out['sgd.tShare'] = {'value': t3 / n3 if n3 else None, 'tNodes': t3, 'degree3': n3}
        out['sgd.deadEnds'] = {'value': dcount.get(1, 0) / (L / 1000.0) if L else None, 'degree1': dcount.get(1, 0),
                               'lengthKm': L / 1000.0}
        out['graph'] = {'nodes': len(sub.nodes), 'edges': len(sub.edges), 'degrees': {str(k): v for k, v in sorted(dcount.items())},
                        'faces': sub.faces(), 'lengthKm': L / 1000.0}
        out['block.courtShare'] = self.courts(intra, med_area, med_short)
        return out

    def graph(self, skel):
        """skeleton cells -> graph, on mixed (m-) adjacency: 4-neighbours, and diagonal neighbours whose two common
        4-neighbours are both off the skeleton (so no path bypasses a junction cell and no cell triangle forms a face);
        a cell of a fully set 2 x 2 quad is a node cell; node cells are the cells whose m-degree is not 2"""
        W, H = skel.size
        data = skel.tobytes()
        pix = [m.start() for m in re.finditer(b'[^\x00]', data)]
        P = set(pix)
        four = (-W, 1, W, -1)
        diag = ((-W + 1, -W, 1), (W + 1, W, 1), (W - 1, W, -1), (-W - 1, -W, -1))   # (diagonal, its two 4-cells)
        mnb = {}
        for i in pix:
            nb = [i + o for o in four if (i + o) in P]
            for o, c1, c2 in diag:
                j = i + o
                if j in P and (i + c1) not in P and (i + c2) not in P:
                    nb.append(j)
            mnb[i] = nb
        node_px = set(i for i in pix if len(mnb[i]) != 2)
        for i in pix:
            if (i + 1) in P and (i + W) in P and (i + W + 1) in P:
                node_px.update((i, i + 1, i + W, i + W + 1))
        offs8 = (-W, -W + 1, 1, W + 1, W, W - 1, -1, -W - 1)
        node_of = {}
        nodes = []
        clusters = []
        for i in sorted(node_px):
            if i in node_of:
                continue
            nid = len(nodes)
            comp = [i]
            node_of[i] = nid
            st = [i]
            while st:
                k = st.pop()
                for o in offs8:
                    j = k + o
                    if j in node_px and j not in node_of:
                        node_of[j] = nid
                        comp.append(j)
                        st.append(j)
            xs = [self.centre_of(j % W, j // W) for j in comp]
            nodes.append((sum(p[0] for p in xs) / len(xs), sum(p[1] for p in xs) / len(xs)))
            clusters.append(comp)
        G = Graph(nodes)
        # a node cluster that encloses background (a ring of node cells round a street-space hole of a few cells)
        # keeps that hole as a self-loop of zero length at its node, so the graph keeps the skeleton's topology
        hole_loops = 0
        for nid, comp in enumerate(clusters):
            if len(comp) < 4:
                continue
            xs_ = [j % W for j in comp]
            ys_ = [j // W for j in comp]
            x0_, y0_ = min(xs_) - 2, min(ys_) - 2
            ci = Image.new('L', (max(xs_) - x0_ + 3, max(ys_) - y0_ + 3), 0)
            for j in comp:
                ci.putpixel((j % W - x0_, j // W - y0_), 255)
            h = 1 - euler8(ci)
            for _ in range(h):
                G.add_edge(nid, nid, [nodes[nid], nodes[nid]])
                hole_loops += 1
        G.hole_loops = hole_loops
        seen = set()
        anomalies = 0
        for i in pix:
            if i in node_px or i in seen:
                continue
            comp = []
            st = [i]
            seen.add(i)
            while st:
                k = st.pop()
                comp.append(k)
                for j in mnb[k]:
                    if j not in node_px and j not in seen:
                        seen.add(j)
                        st.append(j)
            links = sorted((k, j) for k in comp for j in mnb[k] if j in node_px)   # m-links into node cells
            if not links:
                nid = len(G.nodes)
                G.nodes.append(self.centre_of(comp[0] % W, comp[0] // W))
                order = self._walk(comp[0], set(comp), mnb, node_px)
                poly = [G.nodes[nid]] + [self.centre_of(j % W, j // W) for j in order] + [G.nodes[nid]]
                G.add_edge(nid, nid, poly)
                continue
            if len(links) == 1:
                # a path with one end on a node and the other on nothing: its far cell becomes a node (an anomaly)
                anomalies += 1
                k0, j0 = links[0]
                order = self._walk(k0, set(comp), mnb, node_px)
                nid = len(G.nodes)
                G.nodes.append(self.centre_of(order[-1] % W, order[-1] // W))
                G.add_edge(node_of[j0], nid, [G.nodes[node_of[j0]]] + [self.centre_of(j % W, j // W) for j in order])
                continue
            if len(links) > 2:
                anomalies += 1
            (k0, j0), (k1, j1) = links[0], links[-1]
            u, v = node_of[j0], node_of[j1]
            order = self._walk(k0, set(comp), mnb, node_px, stop=k1)
            poly = [G.nodes[u]] + [self.centre_of(j % W, j // W) for j in order] + [G.nodes[v]]
            G.add_edge(u, v, poly)
        G.anomalies = anomalies
        G.tol = self.res
        return G

    @staticmethod
    def _walk(start, cset, mnb, node_px, stop=None):
        """the chain's cells in order from start (to stop when given): breadth-first parents, then the path"""
        par = {start: None}
        order = [start]
        q = collections.deque([start])
        while q:
            k = q.popleft()
            for j in mnb[k]:
                if j in cset and j not in par:
                    par[j] = k
                    order.append(j)
                    q.append(j)
        end = stop if stop is not None and stop in par else order[-1]
        path = []
        k = end
        while k is not None:
            path.append(k)
            k = par[k]
        path.reverse()
        return path

    # ---- courts (E11 section 2's definition on the cluster blocks)
    def courts(self, intra, med_area, med_short):
        res = self.res
        d = DILATE_REL * med_short
        k = max(1, int(math.ceil(res / (COURT_CELL_REL * d))))
        rc = res / k
        min_area = COURT_AREA_REL * med_area
        T = DEEP_REL * med_short
        tau = T / res + 0.5                     # cell-centre distance a deep block must exceed
        fbb = self.boxes
        fgrid = MF.Grid(25.0)
        for fi, bb in enumerate(fbb):
            fgrid.add_box(fi, *bb)
        rows = []
        exact_runs = 0
        for blk in intra:
            img = blk['img']
            W, H = img.size
            # the largest inscribed circle, decided by brackets first (C): per cell the Euclidean distance d2 lies in
            # [max(dinf, d1 / sqrt 2), min(sqrt 2 dinf, d1)], dinf the chessboard and d1 the city-block distance to the
            # nearest background cell (a cell survives k square erosions iff dinf >= k + 1, k cross erosions iff
            # d1 >= k + 1); the exact transform only when neither bracket decides
            cap8 = int(math.floor(tau)) + 1
            dinf = erosion_depth(img, ERO8, cap8)           # = min(chessboard depth, cap8)
            d1 = None
            if math.sqrt(2) * dinf <= tau:
                r_cells, deep, how = None, False, 'bracket'
            elif dinf >= cap8:
                r_cells, deep, how = None, True, 'bracket'
            else:
                cap4 = int(math.floor(math.sqrt(2) * tau)) + 1
                d1 = erosion_depth(img, ERO4, cap4)
                if d1 <= tau:
                    r_cells, deep, how = None, False, 'bracket'
                elif d1 >= cap4:
                    r_cells, deep, how = None, True, 'bracket'
                else:
                    exact_runs += 1
                    m2 = max_edt_candidates(img, tau, min(math.sqrt(2) * dinf, d1))
                    if m2 == 0.0:
                        r_cells, deep, how = None, False, 'exact (no cell can exceed)'
                    else:
                        r_cells = math.sqrt(m2)
                        deep, how = r_cells > tau, 'exact'
            rad = (r_cells - 0.5) * res if r_cells is not None else None
            # the court raster: the block subdivided k times
            B = img.resize((W * k, H * k), Image.NEAREST) if k > 1 else img
            Wc, Hc = B.size
            lox, loy = blk['lox'], blk['loy']
            F = Image.new('L', (Wc, Hc), 0)
            fd = ImageDraw.Draw(F)
            lw = max(1, int(round(2 * d / rc)))
            rr = d / rc
            bx0, by1 = lox, loy
            bx1, by0 = lox + W * res, loy - H * res
            for fi in sorted(fgrid.query_box(bx0 - d, by0 - d, bx1 + d, by1 + d)):
                a0, b0, a1, b1 = fbb[fi]
                if a1 < bx0 - d or a0 > bx1 + d or b1 < by0 - d or b0 > by1 + d:
                    continue
                pts = [((q[0] - lox) / rc, (loy - q[1]) / rc) for q in self.B[fi]]
                fd.polygon(pts, fill=255)
                fd.line(pts + [pts[0]], fill=255, width=lw, joint='curve')
                for (x, y) in pts:
                    fd.ellipse([x - rr, y - rr, x + rr, y + rr], fill=255)
            U = ImageChops.subtract(B, F)
            outside = DIL8.apply(ImageChops.invert(B))[1]
            seeds = ImageChops.multiply(U, outside).tobytes()
            runs, root = label_runs(row_runs(U.tobytes(), Wc, Hc))
            edge_roots = set()
            size = collections.Counter()
            for i, (y, x0, x1) in enumerate(runs):
                size[root[i]] += x1 - x0
                if _NONZERO_RUN.search(seeds, y * Wc + x0, y * Wc + x1):
                    edge_roots.add(root[i])
            comps = [size[r] * rc * rc for r in size if r not in edge_roots]
            courts = [a for a in comps if a >= min_area]
            lo_m, sh_m = block_extent(img, res)
            rows.append({'footprints': len(blk['ids']), 'areaM2': round(blk['area'], 2),
                         'mrrLongM': round(lo_m, 3) if lo_m else None, 'mrrShortM': round(sh_m, 3) if sh_m else None,
                         'centroid': [round(blk['centroid'][0], 2), round(blk['centroid'][1], 2)],
                         'inscribedRadiusM': round(rad, 3) if rad is not None else None,
                         'chessboardCells': dinf, 'cityBlockCells': d1, 'deep': deep, 'decidedBy': how,
                         'interiorComponents': len(comps), 'largestInteriorM2': round(max(comps), 2) if comps else 0.0,
                         'court': bool(courts)})
        deep_rows = [r for r in rows if r['deep']]
        return {'value': sum(r['court'] for r in deep_rows) / len(deep_rows) if deep_rows else None,
                'deep': len(deep_rows), 'courtDeep': sum(r['court'] for r in deep_rows),
                'courtShallow': sum(r['court'] for r in rows if not r['deep']), 'blocks': len(rows),
                'thresholds': {'deepRadiusM': T, 'dilateM': d, 'courtCellM': rc, 'subdivision': k, 'minCourtM2': min_area},
                'exactTransforms': exact_runs, 'rows': rows}


# ---------------------------------------------------------------- the graph
class Graph:
    def __init__(self, nodes):
        self.nodes = list(nodes)            # id -> (x, y)
        self.edges = {}                     # id -> [u, v, poly]
        self.next_e = 0
        self.alive = None
        self.anomalies = 0
        self.tol = RES
        self.ncomponents_pruned = None
        self.hole_loops = 0
        self.collapsed = 0
        self.collapsed_max_edge = 0.0
        self.merged_groups = 0
        self.internal_removed = 0

    def add_edge(self, u, v, poly):
        self.edges[self.next_e] = [u, v, poly]
        self.next_e += 1

    def simplify(self):
        for e in self.edges.values():
            e[2] = dp_simplify(e[2], self.tol)

    def incidence(self):
        inc = collections.defaultdict(list)     # node -> [(edge, end)]  end 0 = u side, 1 = v side
        for eid, (u, v, _) in self.edges.items():
            inc[u].append((eid, 0))
            inc[v].append((eid, 1))
        return inc

    def live_nodes(self):
        inc = self.incidence()
        return inc

    def summary(self):
        inc = self.incidence()
        dc = collections.Counter(len(v) for v in inc.values())
        return {'nodes': len(inc), 'edges': len(self.edges), 'degrees': {str(k): v for k, v in sorted(dc.items())},
                'anomalies': self.anomalies}

    def _compact(self):
        inc = self.incidence()
        keep = sorted(inc)
        remap = {o: n for n, o in enumerate(keep)}
        self.nodes = [self.nodes[o] for o in keep]
        self.edges = {eid: [remap[u], remap[v], p] for eid, (u, v, p) in self.edges.items()}

    def _dissolve(self):
        """join the two edges of every degree-2 node (an isolated loop keeps its node), with a work list"""
        inc = self.incidence()
        work = sorted(n for n, e in inc.items() if len(e) == 2)
        while work:
            n = work.pop()
            ends = inc.get(n)
            if not ends or len(ends) != 2:
                continue
            (e1, s1), (e2, s2) = ends
            if e1 == e2:
                continue
            u1, v1, p1 = self.edges[e1]
            u2, v2, p2 = self.edges[e2]
            a = v1 if s1 == 0 else u1
            b = v2 if s2 == 0 else u2
            pa = list(reversed(p1)) if s1 == 0 else list(p1)     # a -> n
            pb = list(p2) if s2 == 0 else list(reversed(p2))     # n -> b
            del self.edges[e1]
            del self.edges[e2]
            del inc[n]
            inc[a] = [(e, s) for e, s in inc[a] if e != e1 and e != e2]
            if b != a:
                inc[b] = [(e, s) for e, s in inc[b] if e != e1 and e != e2]
            eid = self.next_e
            self.add_edge(a, b, pa + pb[1:])
            inc[a].append((eid, 0))
            inc[b].append((eid, 1))
            for x in (a, b):
                if len(inc[x]) == 2:
                    work.append(x)
        self._compact()

    def prune(self, spur):
        self._compact()
        self._dissolve()
        while True:
            inc = self.incidence()
            gone = []
            for n, ends in inc.items():
                if len(ends) == 1:
                    eid = ends[0][0]
                    if poly_len(dp_simplify(self.edges[eid][2], self.tol)) < spur:
                        gone.append(eid)
            if not gone:
                break
            for eid in set(gone):
                del self.edges[eid]
            self._compact()
            self._dissolve()
        self.ncomponents_pruned = len(self.components())

    def merge_nodes(self, merge):
        n = len(self.nodes)
        par = list(range(n))

        def find(i):
            while par[i] != i:
                par[i] = par[par[i]]
                i = par[i]
            return i
        cell = merge
        grid = collections.defaultdict(list)
        for i, (x, y) in enumerate(self.nodes):
            grid[(math.floor(x / cell), math.floor(y / cell))].append(i)
        for i, (x, y) in enumerate(self.nodes):
            gx, gy = math.floor(x / cell), math.floor(y / cell)
            for dx in (-1, 0, 1):
                for dy in (-1, 0, 1):
                    for j in grid.get((gx + dx, gy + dy), ()):
                        if j > i and math.hypot(self.nodes[j][0] - x, self.nodes[j][1] - y) <= merge:
                            par[find(i)] = find(j)
        groups = collections.OrderedDict()
        for i in range(n):
            groups.setdefault(find(i), []).append(i)
        self.merged_groups = sum(1 for g in groups.values() if len(g) > 1)
        new_id = {}
        nodes = []
        for r, mem in groups.items():
            nid = len(nodes)
            nodes.append((sum(self.nodes[m][0] for m in mem) / len(mem), sum(self.nodes[m][1] for m in mem) / len(mem)))
            for m in mem:
                new_id[m] = nid
        # an edge with both ends in one merged node and no longer than 2 x merge is internal and removed (a self-loop
        # that short too: it bounds a face of a few cells); the faces it bounded collapse, counted as the cycle rank
        # of the removed edges (|E| - |V| + components over the nodes they touch)
        internal = 0
        removed = []
        edges = {}
        for eid, (u, v, p) in self.edges.items():
            nu, nv = new_id[u], new_id[v]
            if nu == nv and poly_len(dp_simplify(p, self.tol)) <= 2 * merge:
                internal += 1
                removed.append((u, v, poly_len(dp_simplify(p, self.tol))))
                continue
            p = list(p)
            p[0] = nodes[nu]
            p[-1] = nodes[nv]
            edges[eid] = [nu, nv, p]
        rp = {}

        def rf(x):
            rp.setdefault(x, x)
            while rp[x] != x:
                rp[x] = rp[rp[x]]
                x = rp[x]
            return x
        for u, v, _ in removed:
            a, b = rf(u), rf(v)
            if a != b:
                rp[a] = b
        touched = {x for u, v, _ in removed for x in (u, v)}
        self.collapsed = len(removed) - len(touched) + len({rf(x) for x in touched})
        self.collapsed_max_edge = max((L for _, _, L in removed), default=0.0)
        self.nodes, self.edges = nodes, edges
        self.internal_removed = internal
        self._compact()
        self._dissolve()

    def components(self):
        inc = self.incidence()
        seen = {}
        comps = []
        for n in inc:
            if n in seen:
                continue
            cid = len(comps)
            st = [n]
            seen[n] = cid
            mem = []
            while st:
                k = st.pop()
                mem.append(k)
                for eid, s in inc[k]:
                    u, v, _ = self.edges[eid]
                    o = v if s == 0 else u
                    if o not in seen:
                        seen[o] = cid
                        st.append(o)
            comps.append(mem)
        return comps

    def faces(self):
        inc = self.incidence()
        return len(self.edges) - len(inc) + len(self.components())

    def length(self):
        return sum(poly_len(p) for _, _, p in self.edges.values())

    def degrees(self):
        return {n: len(e) for n, e in self.incidence().items()}

    def t_share(self):
        inc = self.incidence()
        t = n3 = 0
        for n, ends in inc.items():
            if len(ends) != 3:
                continue
            n3 += 1
            c = self.nodes[n]
            dirs = []
            for eid, s in ends:
                p = self.edges[eid][2]
                q = p if s == 0 else list(reversed(p))
                tip = point_along(q, ARM)
                dirs.append(math.atan2(tip[1] - c[1], tip[0] - c[0]))
            ok = False
            for i in range(3):
                for j in range(i + 1, 3):
                    ang = abs(math.degrees(dirs[i] - dirs[j])) % 360
                    ang = min(ang, 360 - ang)
                    if ang >= 180 - STRAIGHT:
                        ok = True
            t += ok
        return t, n3

    def crossings(self):
        """proper crossings between segments of different edges, or non-adjacent segments of one edge"""
        segs = []
        for eid, (u, v, p) in self.edges.items():
            for i in range(len(p) - 1):
                segs.append((eid, i, p[i], p[i + 1], len(p) - 1))
        g = MF.Grid(10.0)
        for k, (_, _, a, b, _) in enumerate(segs):
            g.add_box(k, min(a[0], b[0]), min(a[1], b[1]), max(a[0], b[0]), max(a[1], b[1]))
        n = 0
        for k, (e1, i1, a, b, _) in enumerate(segs):
            for j in g.query_box(min(a[0], b[0]), min(a[1], b[1]), max(a[0], b[0]), max(a[1], b[1])):
                if j <= k:
                    continue
                e2, i2, c, d, _ = segs[j]
                if e1 == e2 and abs(i1 - i2) <= 1:
                    continue
                if MF.proper_x(a, b, c, d, eps=1e-9):
                    n += 1
        return n

    def chords_inside(self, R, cx, cy, inside_fn):
        """10 m chords of every edge (measure_ftg.resample) whose midpoint lies inside the enclosure"""
        out = []
        for _, _, p in self.edges.values():
            pts, _ = MF.resample(p)
            for i in range(len(pts) - 1):
                a, b = pts[i], pts[i + 1]
                mid = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
                if inside_fn(mid):
                    out.append((a, b, mid))
        return out


# ---------------------------------------------------------------- measure_ftg's cluster blocks with the LUT closing
def cluster_blocks_lut(mi, groups=None):
    """measure_ftg.cluster_blocks, line for line, with its two rank filters (MaxFilter(13) then MinFilter(13)) replaced by
    close_square (the same cells on its padded rasters); with groups (Map.clusters' partition, the same union-find in
    the same order) the union-find is not run twice. Equality with the original is --selftest's S4 and S5."""
    B = MF.footprints(mi)
    boxes = [MF.bbox(P) for P in B]
    if groups is None:
        g = MF.Grid(25.0)
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
                    if MF.proper_x(P[i], P[(i + 1) % n], Q[j], Q[(j + 1) % mq]):
                        return 0.0
            if MF.inside(P[0], Q) or MF.inside(Q[0], P):
                return 0.0
            d = min(MF.seg_dist(p, Q[j], Q[(j + 1) % mq]) for p in P for j in range(mq))
            return min(d, min(MF.seg_dist(qq, P[i], P[(i + 1) % n]) for qq in Q for i in range(n)))
        gap = MF.CLUSTER_GAP_M
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
    h = int(round(MF.CLOSE_M / MF.RASTER_M))
    pad = MF.CLOSE_M + 2.0
    rm = MF.RASTER_M
    out = []
    for r, ids in groups.items():
        x0 = min(boxes[i][0] for i in ids) - pad
        y0 = min(boxes[i][1] for i in ids) - pad
        x1 = max(boxes[i][2] for i in ids) + pad
        y1 = max(boxes[i][3] for i in ids) + pad
        W = int(math.ceil((x1 - x0) / rm))
        H = int(math.ceil((y1 - y0) / rm))
        im = Image.new('L', (W, H), 0)
        dr = ImageDraw.Draw(im)
        for i in ids:
            dr.polygon([((p[0] - x0) / rm, (y1 - p[1]) / rm) for p in B[i]], fill=255)
        im = close_square(im, h)
        out.append((im.histogram()[255] * rm * rm, len(ids), r))
    return out, B


# ---------------------------------------------------------------- the R-10 vector (shared implementation) and the companion
def vectors(mi, m):
    """the R-10 vector by measure_ftg.m_signature on this MeasureInput, and the lane companion of components 2-5"""
    oc = MF.m_outline(mi)[0]['outline.r90cv']['value']
    orig = MF.cluster_blocks
    MF.cluster_blocks = lambda mi_: cluster_blocks_lut(mi_, groups=m.groups)
    try:
        sig = MF.m_signature(mi, oc)
    finally:
        MF.cluster_blocks = orig
    sig['note'] = ('MFCG: the ways are the exported roads (class arterial, V12 3.2.2); the enclosure is the city ring '
                   '(enclosedShare = buildings whose centroid lies inside it)')
    # companion: components 2-5 over the street space's lanes -- the derived graph's chords inside the enclosure and
    # the exported roads' chords outside it (component 1 reads arterials and stays; 6-8 stay)
    cx, cy = mi['header']['centre']
    C = MF.building_centroids(mi)
    R = q7([math.hypot(p[0] - cx, p[1] - cy) for p in C], .9)
    enc = m.enclosure

    def inside_enc(p):
        return MF.inside(p, enc) and not any(MF.inside(p, h) for h in m.enc_holes)
    chords = []
    for cls, L, pts, h in MF.way_steps(mi):
        for i in range(len(pts) - 1):
            a, b = pts[i], pts[i + 1]
            mid = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
            if not inside_enc(mid):
                chords.append((a, b, mid))
    chords += m.graph_main.chords_inside(R, cx, cy, inside_enc)
    zr = zi = zl = 0.0
    ann = [0.0, 0.0, 0.0]
    for a, b, mid in chords:
        ln = math.hypot(b[0] - a[0], b[1] - a[1])
        rr = math.hypot(mid[0] - cx, mid[1] - cy)
        if rr > R or ln == 0:
            continue
        th = math.atan2(b[1] - a[1], b[0] - a[0])
        zr += ln * math.cos(4 * th)
        zi += ln * math.sin(4 * th)
        zl += ln
        ann[min(2, int(3 * rr / R))] += ln
    areas_ann = [math.pi * R * R * ((k + 1) ** 2 - k ** 2) / 9.0 for k in range(3)]
    dens = [ann[k] / 1000.0 / (areas_ann[k] / 1e6) for k in range(3)]
    v = list(sig['vector'])
    comp = [v[0], MF.r3(math.hypot(zr, zi) / zl, 4), MF.r3(dens[0], 3), MF.r3(dens[1], 3), MF.r3(dens[2], 3)] + v[5:]
    return sig, {'components': sig['components'], 'vector': comp,
                 'note': 'components 2-5 over the derived graph inside the enclosure and the exported roads outside it; '
                         '1 and 6-8 as the R-10 vector (a companion for W-15, not the R-10 vector)'}


# ---------------------------------------------------------------- one seed
def mi_path(stem):
    return os.path.join(INPUTS, stem + '.metric.geojson.gz')


def file_sha(path):
    with open(path, 'rb') as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def round_floats(o, nd=6):
    if isinstance(o, float):
        return round(o, nd)
    if isinstance(o, dict):
        return {k: round_floats(v, nd) for k, v in o.items()}
    if isinstance(o, list):
        return [round_floats(v, nd) for v in o]
    return o


def measure_seed(stem, res=RES, spur=SPUR, merge=MERGE, with_vector=True):
    path = mi_path(stem)
    with gzip.open(path, 'rb') as fh:
        mi = json.loads(fh.read().decode())
    m = Map(stem, mi, res, spur, merge)
    out = m.run()
    out['measureInputSha256'] = file_sha(path)
    out['header'] = {k: mi['header'].get(k) for k in ('source', 'build', 'rung', 'water')}
    out['header']['size'] = (mi['header'].get('options') or {}).get('size')
    if with_vector and 'notApplicable' not in out:
        sig, comp = vectors(mi, m)
        out['vector'] = sig
        out['vectorCompanion'] = comp
        cb = sig['clusterBlocks']
        mine = out['clusters']
        out['clusterTwin'] = {'measureFtg': {k: cb[k] for k in ('n', 'singletons', 'largestFootprintCount')},
                              'here': mine,
                              'equal': all(cb[k] == mine[k] for k in ('n', 'singletons', 'largestFootprintCount'))}
    return round_floats(out)


# ---------------------------------------------------------------- block extents (W-12's input: metres, per size)
def block_extent(img, res):
    """the minimum-area rectangle of the block's cells (their corner points' hull; measure_ng.obb_and_minwidth):
    (long side, short side) in metres"""
    W, H = img.size
    pts = []
    for y, rr in enumerate(row_runs(img.tobytes(), W, H)):
        if rr:
            x0, x1 = rr[0][0], rr[-1][1]
            pts += [(x0, y), (x0, y + 1), (x1, y), (x1, y + 1)]
    if len(pts) < 3:
        return None, None
    lo, sh, _ = MN.obb_and_minwidth(pts)
    return lo * res, sh * res


# ---------------------------------------------------------------- the plan's sample and the summaries
def sweep_sample():
    """plan.json's MFCG families with the sweep's export-check.json sample (measure_mfcg.plan_families)"""
    fams = MM.plan_families()
    out = collections.OrderedDict()
    for lab, f in fams.items():
        idx = {}
        for i in range(f['indices'][0], f['indices'][1]):
            st = f"size{f['size']}-{'plain' if f['options'] == 'plain' else 'rivercoast'}-{i}"
            idx[st] = i
        out[lab] = {'family': lab, 'size': f['size'], 'options': f['options'], 'rung': f['rung'],
                    'purpose': f['purpose'], 'indices': f['indices'], 'declaredN': f['declaredN'],
                    'captured': f['captured'], 'usable': f['usable'], 'failed': f['failed'],
                    'failedStems': f['failedStems'], 'indexOf': idx}
    return out


def cv_of(xs):
    n = len(xs)
    if n < 2:
        return None
    mu = sum(xs) / n
    sd = (sum((x - mu) ** 2 for x in xs) / (n - 1)) ** 0.5
    sdp = (sum((x - mu) ** 2 for x in xs) / n) ** 0.5
    return {'n': n, 'mean': mu, 'sd': sd, 'cv': sd / mu if mu else None, 'sdPop': sdp, 'cvPop': sdp / mu if mu else None}


SUMMARY_METRICS = [('sgd.tShare', 'value'), ('sgd.deadEnds', 'value'), ('blockc.perHa', 'value'),
                   ('blockc.lotsPer', 'value'), ('block.courtShare', 'value')]
AUX_METRICS = [('graph', 'lengthKm'), ('graph', 'faces'), ('blockc.perHa', 'blocks'), ('blockc.lotsPer', 'mean'),
               ('block.courtShare', 'deep'), ('block.courtShare', 'courtDeep')]


def summarise(per, stems):
    rows = collections.OrderedDict()
    for metric, key in SUMMARY_METRICS + AUX_METRICS:
        vals = [(s, (per[s].get(metric) or {}).get(key)) for s in stems]
        xs = [v for _, v in vals if v is not None]
        e = MM.estimate(xs) or {'estimator': None, 'n': 0}
        e = dict(e)
        e['seeds'] = [s for s, v in vals if v is not None]
        e['notApplicable'] = [s for s, v in vals if v is None]
        e['cv'] = cv_of(xs) if (metric, key) in SUMMARY_METRICS else None
        rows[metric if key == 'value' else metric + '.' + key] = e
    return rows


# ---------------------------------------------------------------- the run
def strip_rows(o):
    """the per-seed record without the court test's per-block rows (kept in the seeds file under blocks)"""
    o = dict(o)
    c = dict(o['block.courtShare'])
    c.pop('rows', None)
    o['block.courtShare'] = c
    return o


def measure_all(stems, res, spur, merge, log):
    per = collections.OrderedDict()
    for st in stems:
        log(f'measure {st}')
        per[st] = measure_seed(st, res, spur, merge)
    return per


def checks_for(fixtures, per, sample, vectors_by_size, summaries, red=False):
    C = []

    def add(cid, check, ok, receipt):
        C.append({'id': cid, 'check': check, 'passed': bool(ok), 'receipt': receipt})
    allmaps = list(fixtures.items()) + list(per.items())
    # C1 planarity
    bad = [s for s, o in allmaps if o.get('crossings') != 0]
    add('planarity', 'no two edges of the derived graph cross (every fixture and every captured sweep file)', not bad,
        f"{len(allmaps) - len(bad)} of {len(allmaps)} maps with 0 proper crossings" + (f"; crossings on {bad}" if bad else ''))
    # C2 face count
    bad = []
    for s, o in allmaps:
        t = o['topology']
        if not (t['facesRaw'] == t['holesStreetSpace'] == t['facesPruned']
                and t['facesMerged'] == t['facesPruned'] - t['mergeCollapsedFaces']
                and t['mergeInternalLongestM'] <= 2 * MERGE and t['chainAnomalies'] == 0
                and t['eulerSkeleton'] == t['eulerStreetSpace'] == t['eulerGraphRaw']):
            bad.append(s)
    tot_faces = sum(o['topology']['facesMerged'] for _, o in allmaps)
    coll = sum(o['topology']['mergeCollapsedFaces'] for _, o in allmaps)
    collm = [s for s, o in allmaps if o['topology']['mergeCollapsedFaces']]
    loops = sum(o['topology']['nodeClusterHoleLoops'] for _, o in allmaps)
    longest = max(o['topology']['mergeInternalLongestM'] for _, o in allmaps)
    add('faceCount', "face count: the skeleton's and the raw graph's Euler numbers equal the street space's (Gray's "
        "bit quads), so the raw graph's faces E - V + C equal the street space's holes; the spur pruning keeps them; "
        "the node merge only collapses faces bounded by edges of <= 2 x MERGE inside one merged node (the final faces = "
        "the pruned faces less those, so no merge makes a face); 0 chain anomalies", not bad,
        f"{len(allmaps) - len(bad)} of {len(allmaps)} maps hold at every stage ({tot_faces} final faces in all); "
        f"the merge collapsed {coll} faces of a few cells on {len(collm)} maps (longest internal edge removed "
        f"{longest:.2f} m)"
        f"; {loops} node-cluster hole loops kept at extraction" + (f"; fails on {bad}" if bad else ''))
    # C3 areas
    bad = [s for s, o in allmaps if not o['blockAreas']['intramuralSumM2'] <= o['blockAreas']['enclosureM2']]
    worst = max(o['blockAreas']['ratio'] for _, o in allmaps)
    ov = sum(o['blockAreas']['intramuralOverlapM2'] for _, o in allmaps)
    add('areaSum', "the intramural cluster blocks' area sum <= the walled (enclosure) area", not bad,
        f"{len(allmaps) - len(bad)} of {len(allmaps)} maps; largest ratio {worst:.4f}; intramural block overlap "
        f"{ov:.2f} m2 in all" + (f"; exceeds on {bad}" if bad else ''))
    # C4 the CV handed to W-14
    missing = []
    for lab, fam in summaries.items():
        for m in CV_METRICS:
            cv = fam['summary'][m]['cv']
            if cv is None or cv['n'] != len(sample[lab]['usable']):
                missing.append((lab, m))
    add('cvHandedToW14', 'the seed-to-seed CV of sgd.tShare, sgd.deadEnds, blockc.perHa and blockc.lotsPer per family '
        '(n = the usable seeds), in the summary file and the per-seed file for W-14', not missing,
        f"{len(summaries) * len(CV_METRICS) - len(missing)} of {len(summaries) * len(CV_METRICS)} CVs present over the "
        f"usable seeds" + (f"; missing {missing}" if missing else ''))
    # C5 one vector per usable plain seed per size
    bad = []
    for lab, fam in sample.items():
        if fam['options'] != 'plain':
            continue
        got = [v['capture'] for v in vectors_by_size.get(lab, [])]
        if sorted(got) != sorted(fam['usable']) or len(got) != len(set(got)):
            bad.append(lab)
        if any(st in got for st in fam['failedStems']):
            bad.append(lab + ' (a failed seed)')
    counts = {lab: len(vectors_by_size.get(lab, [])) for lab, fam in sample.items() if fam['options'] == 'plain'}
    add('vectors', 'one R-10 vector per usable plain seed per size, none for a failed seed (vectors only, no dispersion: '
        'R-40)', not bad, f"{counts}" + (f"; wrong on {bad}" if bad else ''))
    # C6 the cluster twin
    bad = [s for s, o in allmaps if not (o.get('clusterTwin') or {}).get('equal')]
    add('clusterTwin', "the clusters equal measure_ftg.py's own (count, singletons, largest cluster) on every map, so "
        "the vector's block-area CV reads the same clusters", not bad,
        f"{len(allmaps) - len(bad)} of {len(allmaps)} maps equal" + (f"; differs on {bad}" if bad else ''))
    # C7 the sample
    bad = []
    for lab, fam in summaries.items():
        for m, e in fam['summary'].items():
            if sorted(e['seeds'] + e['notApplicable']) != sorted(sample[lab]['usable']):
                bad.append((lab, m))
            if any(st in sample[lab]['failedStems'] for st in e['seeds']):
                bad.append((lab, m, 'failed seed'))
    nsum = sum(len(f['summary']) for f in summaries.values())
    fl = '; '.join(f"{x['label']} {x['reason']}" for fam in sample.values() for x in fam['failed'])
    add('sample', 'every usable seed in every summary, no failed seed in any; the failed indices listed', not bad,
        f"{nsum} summaries over " + ' / '.join(str(len(f['usable'])) for f in sample.values()) + f" usable seeds; failed: {fl}"
        + (f"; wrong {bad}" if bad else ''))
    return C


def red_variant(fixtures, per, vectors_by_size):
    """four planted faults: a crossing in one fixture, a face too many in another, a vector dropped, a block-area sum
    past its enclosure"""
    import copy
    fx = copy.deepcopy(fixtures)
    pr = copy.deepcopy(per)
    vb = copy.deepcopy(vectors_by_size)
    k0 = next(iter(fx))
    fx[k0]['crossings'] = 1
    k1 = list(fx)[-1]
    fx[k1]['topology']['facesMerged'] += 1
    lab = next(iter(vb))
    vb[lab] = vb[lab][1:]
    s0 = next(iter(pr))
    pr[s0]['blockAreas']['intramuralSumM2'] = pr[s0]['blockAreas']['enclosureM2'] * 1.01
    return fx, pr, vb


def module_sha(name):
    return file_sha(os.path.join(HERE, name))[:12]


# ---------------------------------------------------------------- --selftest: the speed-ups equal the plain forms
SELFTEST_MAPS = FIXTURES + [SWEEP_PREFIX + 'size40-plain-0', SWEEP_PREFIX + 'size80-plain-0',
                            SWEEP_PREFIX + 'size130-plain-0']


def selftest(log):
    from PIL import ImageFilter as IF
    R = []

    def add(cid, check, ok, receipt):
        R.append({'id': cid, 'check': check, 'passed': bool(ok), 'receipt': receipt})
        log(('PASS ' if ok else 'FAIL ') + cid + ': ' + receipt)
    # S0 the Euler number and the graph on synthetic shapes
    shapes = []
    for name, rects, holes, want in (('disk', [(5, 5, 30, 30)], [], 1), ('ring', [(5, 5, 40, 40)], [(15, 15, 30, 30)], 0),
                                     ('two', [(5, 5, 15, 15), (25, 5, 35, 15)], [], 2),
                                     ('two holes', [(5, 5, 50, 30)], [(10, 10, 20, 20), (30, 10, 40, 20)], -1)):
        im = Image.new('L', (64, 56), 0)        # every shape at least four cells from the border
        dr = ImageDraw.Draw(im)
        for r in rects:
            dr.rectangle(r, fill=255)
        for r in holes:
            dr.rectangle(r, fill=0)
        sk, _ = thin(im)
        shapes.append((name, euler8(im), euler8(sk), want))
    add('S0', "Gray's bit-quad Euler number on four synthetic shapes, before and after the thinning",
        all(a == w and b == w for _, a, b, w in shapes), '; '.join(f'{n} {a}/{b} (want {w})' for n, a, b, w in shapes))
    # S1-S3 on every cluster raster and the street space of the selftest maps
    nclose = nfill = bad_close = bad_fill = 0
    thin_eq = []
    s4 = []
    s5 = []
    for stem in SELFTEST_MAPS:
        with gzip.open(mi_path(stem), 'rb') as fh:
            mi = json.loads(fh.read().decode())
        m = Map(stem, mi)
        m.clusters()
        m.setup_grid()
        if stem in FIXTURES[:2]:
            for root, ids in m.groups.items():
                res = m.res
                pad = CLOSE + 2.0
                x0 = min(m.boxes[i][0] for i in ids) - pad
                y1 = max(m.boxes[i][3] for i in ids) + pad
                x1 = max(m.boxes[i][2] for i in ids) + pad
                y0 = min(m.boxes[i][1] for i in ids) - pad
                W, H = int(math.ceil((x1 - x0) / res)), int(math.ceil((y1 - y0) / res))
                im = Image.new('L', (W, H), 0)
                dr = ImageDraw.Draw(im)
                for i in ids:
                    dr.polygon([m.px(p, x0, y1) for p in m.B[i]], fill=255)
                a = im.filter(IF.MaxFilter(13)).filter(IF.MinFilter(13))
                b = close_square(im, 6)
                nclose += 1
                bad_close += bool(ImageChops.difference(a, b).getbbox())
                f = a.copy()
                ImageDraw.floodfill(f, (0, 0), 128, thresh=0)
                f = f.point(lambda v: 0 if v == 128 else 255)
                nfill += 1
                bad_fill += bool(ImageChops.difference(f, fill_holes(b)).getbbox())
            out = m.run()
            # the street space again, thinned both ways
            D = Image.new('L', (m.W, m.H), 0)
            ImageDraw.Draw(D).polygon([m.px(p) for p in m.enclosure], fill=255)
            K = Image.new('L', (m.W, m.H), 0)
            for blk in m.blocks:
                K.paste(255, (blk['a'], blk['b'], blk['a'] + blk['W'], blk['b'] + blk['H']), blk['img'])
            S = ImageChops.subtract(D, K)
            t1, p1 = thin(S)
            t2, p2 = thin_whole(S)
            thin_eq.append((stem, not ImageChops.difference(t1, t2).getbbox() and p1 == p2, p1, p2))
        orig = MF.cluster_blocks(mi)
        fast = cluster_blocks_lut(mi)
        fast_g = cluster_blocks_lut(mi, groups=m.groups)
        s4.append((stem, orig[0] == fast[0] == fast_g[0], len(orig[0])))
        oc = MF.m_outline(mi)[0]['outline.r90cv']['value']
        v0 = MF.m_signature(mi, oc)
        keep = MF.cluster_blocks
        MF.cluster_blocks = lambda mi_: cluster_blocks_lut(mi_, groups=m.groups)
        try:
            v1 = MF.m_signature(mi, oc)
        finally:
            MF.cluster_blocks = keep
        s5.append((stem, v0 == v1, v1['vector']))
    add('S1', 'the LUT closing equals PIL MaxFilter(13) then MinFilter(13), cell for cell, on every cluster raster of two '
        'fixtures', nclose and not bad_close, f'{nclose - bad_close} of {nclose} rasters identical')
    add('S2', 'the run-length hole fill equals PIL floodfill from the corner, cell for cell, on the same rasters',
        nfill and not bad_fill, f'{nfill - bad_fill} of {nfill} rasters identical')
    add('S3', 'the tiled thinning equals the whole-raster thinning, cell for cell and pass count, on two fixtures',
        all(ok for _, ok, _, _ in thin_eq), '; '.join(f'{s.split(".")[-1]} {"equal" if ok else "DIFFER"} ({a}/{b} passes)'
                                                       for s, ok, a, b in thin_eq))
    add('S4', "cluster_blocks_lut equals measure_ftg.cluster_blocks (areas, counts, roots), with its own union-find and "
        "with Map.clusters' partition, on " + str(len(SELFTEST_MAPS)) + ' maps', all(ok for _, ok, _ in s4),
        '; '.join(f'{s.split(".")[-1]} {"equal" if ok else "DIFFER"} ({n} clusters)' for s, ok, n in s4))
    add('S5', 'measure_ftg.m_signature with the LUT cluster blocks equals it unmodified (the whole returned record)',
        all(ok for _, ok, _ in s5), '; '.join(f'{s.split(".")[-1]} {"equal" if ok else "DIFFER"}' for s, ok, _ in s5))
    return R


def main():
    args = sys.argv[1:]

    def opt(name, default=None, conv=str):
        if name in args:
            i = args.index(name)
            return conv(args[i + 1])
        return default
    red = '--red' in args
    if '--selftest' in args:
        R = selftest(lambda msg: print(msg, flush=True))
        ok = all(r['passed'] for r in R)
        print('SELFTEST ALL PASS' if ok else 'SELFTEST SOME FAIL')
        path = opt('--json')
        if path:
            write_json(path, {'schema': 'm1.e09.selftest/1', 'script': SCRIPT, 'scriptSha256': module_sha('derived_graph.py'),
                              'maps': SELFTEST_MAPS, 'checks': R})
        return 0 if ok else 1
    res = opt('--step', RES, float)
    spur = opt('--spur', SPUR, float)
    merge = opt('--merge', MERGE, float)
    only = opt('--only')
    fixtures_only = '--fixtures' in args
    custom = res != RES or spur != SPUR or merge != MERGE or only or fixtures_only
    out_json = opt('--json', None if custom else OUT_JSON)
    out_seeds = opt('--seeds', None if custom else OUT_SEEDS)
    out_vec = opt('--vectors', None if custom else OUT_VECTORS)
    if red:
        out_json = out_seeds = out_vec = None
    known = {'--red', '--fixtures', '--step', '--spur', '--merge', '--only', '--json', '--seeds', '--vectors', '--selftest',
             '--from-seeds'}
    for i, a in enumerate(args):
        if a.startswith('--') and a not in known:
            print(f'unknown option {a}', file=sys.stderr)
            return 2

    def log(msg):
        print(msg, flush=True)
    sample = sweep_sample()
    fx_stems = FIXTURES if not only else [s for s in FIXTURES if s in only.split(',')]
    if only:
        sw = [s for s in only.split(',') if s.startswith(SWEEP_PREFIX)]
    elif fixtures_only:
        sw = []
    else:
        sw = []
        for lab, fam in sample.items():
            sw += [SWEEP_PREFIX + st for st in sorted(fam['captured'], key=lambda x: fam['indexOf'].get(x, 99))]
    from_seeds = opt('--from-seeds', OUT_SEEDS if red else None)
    if from_seeds:
        # the checks and summaries again from a stored per-seed file (no measurement): --red's input, and the
        # reproduction W-13 and W-14 rely on
        stored = json.load(open(from_seeds), object_pairs_hook=collections.OrderedDict)
        fixtures, per = stored['fixtures'], stored['perSeed']
        out_json = opt('--json')
        out_seeds = out_vec = None
        if red:
            out_json = None
    else:
        fixtures = measure_all(fx_stems, res, spur, merge, log)
        per_full = measure_all(sw, res, spur, merge, log)
        per = collections.OrderedDict((s[len(SWEEP_PREFIX):], o) for s, o in per_full.items())
    if custom and not (out_json or out_seeds):
        # W-14's sensitivity runs: print the per-map values and stop
        for s, o in list(fixtures.items()) + list(per.items()):
            print(json.dumps({'stem': s, 'stepM': res, 'spurM': spur, 'mergeM': merge,
                              'sgd.tShare': o['sgd.tShare'], 'sgd.deadEnds': o['sgd.deadEnds'],
                              'blockc.perHa': o['blockc.perHa']['value'], 'blockc.lotsPer': o['blockc.lotsPer']['value'],
                              'graph': o['graph'], 'crossings': o['crossings'],
                              'faces': o['topology']}, sort_keys=True))
        return 0
    summaries = collections.OrderedDict()
    vectors_by_size = collections.OrderedDict()
    for lab, fam in sample.items():
        stems = [s for s in fam['usable'] if s in per]
        summaries[lab] = {'family': lab, 'rung': fam['rung'], 'size': fam['size'], 'options': fam['options'],
                          'purpose': fam['purpose'], 'n': len(stems), 'summary': summarise(per, stems)}
        if fam['options'] == 'plain':
            vl = []
            for st in stems:
                o = per[st]
                vl.append({'label': f"{lab}/{fam['indexOf'][st]}", 'capture': st, 'rung': fam['rung'], 'size': fam['size'],
                           'water': 'none', 'referenceBuild': REFERENCE_BUILD,
                           'measureInputSha256': o['measureInputSha256'],
                           'components': o['vector']['components'], 'vector': o['vector']['vector'],
                           'builtRadiusM': o['vector']['builtRadiusM'],
                           'companionLanes': o['vectorCompanion']['vector']})
            vectors_by_size[lab] = vl
    # D32 / R-19: the inner-plot removal pooled
    pooled = collections.OrderedDict()
    allplain = []
    for lab, fam in sample.items():
        stems = [s for s in fam['usable'] if s in per]
        cd = sum(per[s]['block.courtShare']['courtDeep'] for s in stems)
        dp = sum(per[s]['block.courtShare']['deep'] for s in stems)
        shares = [per[s]['block.courtShare']['value'] for s in stems if per[s]['block.courtShare']['value'] is not None]
        pooled[lab] = {'countRatio': cd / dp if dp else None, 'courtDeep': cd, 'deep': dp, 'median': q7(shares, .5),
                       'n': len(shares)}
        if fam['options'] == 'plain':
            allplain += stems
    cd = sum(per[s]['block.courtShare']['courtDeep'] for s in allplain)
    dp = sum(per[s]['block.courtShare']['deep'] for s in allplain)
    shares = [per[s]['block.courtShare']['value'] for s in allplain if per[s]['block.courtShare']['value'] is not None]
    pooled['plain (all three sizes)'] = {'countRatio': cd / dp if dp else None, 'courtDeep': cd, 'deep': dp,
                                         'median': q7(shares, .5), 'n': len(shares)}
    fx_c, per_c, vb_c = (fixtures, per, vectors_by_size)
    if red:
        fx_c, per_c, vb_c = red_variant(fixtures, per, vectors_by_size)
    checks = checks_for(fx_c, per_c, sample, vb_c, summaries)
    for c in checks:
        print(('PASS ' if c['passed'] else 'FAIL ') + c['id'] + ': ' + c['receipt'])
    ok = all(c['passed'] for c in checks)
    print('ALL PASS' if ok else 'SOME FAIL')
    plan_path = os.path.join(HERE, 'plan.json')
    head = {'record': 'docs/calibration/E09-mfcg-derived-graph.md', 'workItem': 'W-09', 'lane': 'm1/W-09',
            'script': SCRIPT, 'metricVersion': VERSION, 'referenceBuild': REFERENCE_BUILD,
            'uses': {n: module_sha(n) for n in ('measure_ftg.py', 'measure_ng.py', 'measure_mfcg.py', 'adapters/ftg.py')},
            'scriptSha256': module_sha('derived_graph.py'),
            'plan': {'file': 'research/baselines/plan.json', 'sha256': file_sha(plan_path)[:12]},
            'parameters': {'rasterStepM': res, 'clusterGapM': GAP, 'closeM': CLOSE, 'spurM': spur, 'mergeM': merge,
                           'armM': ARM, 'straightDeg': STRAIGHT, 'deepRelShort': DEEP_REL, 'dilateRelShort': DILATE_REL,
                           'courtAreaRelMedian': COURT_AREA_REL, 'courtCellRelDilation': COURT_CELL_REL},
            'rule': 'measured values, not rows (R-47 (a)): W-15 forms the rows, the bands and both dispersions (R-40)'}
    if out_json:
        summ = dict(head)
        summ.update({'schema': 'm1.e09/1',
                     'sample': [{k: v for k, v in f.items() if k != 'indexOf'} for f in sample.values()],
                     'fixtures': {s: strip_rows({k: v for k, v in o.items() if k not in ('vector', 'vectorCompanion')})
                                  for s, o in fixtures.items()},
                     'summaries': summaries, 'courtPooled': pooled,
                     'vectorsFile': 'docs/calibration/E09-mfcg-derived-graph.vectors.json',
                     'seedsFile': 'docs/calibration/E09-mfcg-derived-graph.seeds.json',
                     'checks': checks})
        write_json(out_json, summ)
    if out_seeds:
        seeds = dict(head)
        seeds.update({'schema': 'm1.e09.seeds/1', 'readers': ['W-13', 'W-14', 'W-12', 'W-08'],
                      'perSeed': collections.OrderedDict((s, o) for s, o in per.items()),
                      'fixtures': fixtures})
        write_json(out_seeds, seeds, compact=True)
    if out_vec:
        vec = dict(head)
        vec.update({'schema': 'm1.e09.vectors/1', 'reader': 'W-15 (the dispersion step, R-40)',
                    'definition': 'R-10 (M-1-rulings-1.md) by measure_ftg.m_signature, unchanged; MFCG ways are the '
                                  'exported roads, all of class arterial; companionLanes: components 2-5 over the '
                                  'derived graph inside the enclosure and the exported roads outside (not the R-10 '
                                  'vector; for the W-15 ruling)',
                    'families': vectors_by_size})
        write_json(out_vec, vec)
    return 0 if ok else 1


def write_json(path, obj, compact=False):
    tmp = path + '.tmp'
    with open(tmp, 'w') as fh:
        if compact:
            json.dump(obj, fh, separators=(',', ':'))
        else:
            json.dump(obj, fh, indent=1, sort_keys=False)
        fh.write('\n')
    os.replace(tmp, path)


if __name__ == '__main__':
    sys.exit(main())
