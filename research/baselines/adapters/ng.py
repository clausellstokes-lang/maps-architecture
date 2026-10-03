#!/usr/bin/env python3
"""research/baselines/adapters/ng.py -- NG vertex captures -> MeasureInput (V12 section 2.2), M-1 work item W-11.

Lane m1/W-11 (docs/calibration/M-1-plan.md section 2, row W-11; record docs/calibration/E11-ng-rows.md). Research side
only: nothing here enters plat/, and the files it writes are geometry, which never crosses (V12 section 3.3). Our own
code, standard library only (Python 3.9). It reads a draw-pass vertex record (draw/gen-N.paths.json) through
profiler/paths_stats.py's extraction, imported UNMODIFIED, so the geometry is exactly what README-vertices.md's tables
were computed from.

What it writes, per map, research/baselines/inputs/NG/itch-11441280/<capture>.gen-<N>.metric.geojson.gz:
  header    source NG, build itch:11441280, scale 'relative' (no metric scale is known; V12 section 2.2), centre = the
            area-weighted centroid of the footprints (NG has no wall ring; the plaza is not identified as such)
  way       every drawn road centreline (streets and closed ring / plaza roads), class 'street' (NG draws no road
            hierarchy: its width is a length law, profile-neighbourhood.md BG-1). A junction end -- a street end within
            3 x its own half-width of another road's centreline (bentcut_geometry's rule) -- is moved onto that
            centreline exactly as captures/neighbourhood/bentcut_parent_face.py does (extended along its last segment;
            the foot of the perpendicular when the extension misses or runs past 3 x the street's width), and the point
            it lands on is inserted as a vertex of the crossed road, so ways meet at shared vertices
  block     every bounded face of that planar graph (half-edge face walk, bentcut_parent_face's face rule: the outer
            face, faces of the outer face's orientation, zero-area faces and faces with a dangling edge are open); the
            hood outline is not drawn, so land at the hood edge belongs to no block
  plot      every building footprint (the w1 outline strokes on the buildings canvas: the lot after set-back, the
            closest thing to a lot NG draws; README-vertices.md 'Classes'); class 'unknown'
  building  the same footprints (NG's plots read as geo, V12 section 3.4.2; one polygon is both)
  research  a research-side sidecar no metric reads and the product's reader drops: the drawn polylines' draw index,
            raw width and pixel width, which vertices were inserted and the drawn end points (so the drawn polylines
            are recoverable exactly), the roof faces, the map's CTM scale, template, seed and census
Layer registration (found by this lane, 2026-10-03): NG paints the road layer and the footprint layer on separate
offscreen canvases, each sized to its own content, and composites them through WebGL, so the recorded pixel frames of
the two layers differ by an unrecorded integer offset (2-38 px on the 2026-09-25 captures; unregistered, road
centrelines cross 88-484 footprints in seven of the eight maps). register() locates both canvases in the generation's
screenshot (gen-N.png) and moves the footprints and roof faces into the road canvas's frame; the receipt is recorded
in the sidecar. Road-only and footprint-only measures are unaffected; every footprint-to-road relation needs it.
Units: canvas pixels of the road canvas (the input's own units). Model units (mu) = px / ctmScale. Metres are never measured;
a declared conversion of 0.35 m per mu (ARCHITECTURE section 4.6 step 5's inference) is applied only by measure_ng.py
and only under keys marked declared.
Degenerate geometry (V12 section 3.2.2): coincident vertices within 1 mm merge, zero-length segments and zero-area
polygons drop, each drop counted. On the 2026-09-25 captures the count is 0 (paths_stats.clean already drops
consecutive points within 0.02 px, coarser than 1 mm at any of these scales).

Usage:
  python3 research/baselines/adapters/ng.py [CAPTURE_DIR ...] [--out DIR]   (default: the four 2026-09-25 captures)
"""
import collections
import gzip
import json
import math
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'profiler'))
import paths_stats as ps  # noqa: E402

SCRIPT = 'research:baselines/adapters/ng.py'
REFERENCE_BUILD = 'itch:11441280'
BUILD_DIR = 'itch-11441280'
OUT_DEFAULT = os.path.join(ROOT, 'research', 'baselines', 'inputs', 'NG', BUILD_DIR)
CAPS_DEFAULT = ['2026-09-25T10-55-19', '2026-09-25T10-55-36', '2026-09-25T10-55-47', '2026-09-25T10-55-59']
JUNCTION_HW = ps.ARRIVE_HW          # a street end within this many own half-widths of a road is a junction end
SNAP_MAX_W = 3.0                    # the extension may run at most this many own widths, else the foot is used
M_PER_MU_DECLARED = 0.35
MM_DECLARED_MU = 0.001 / M_PER_MU_DECLARED   # 1 mm in mu under the declared conversion (degenerate-vertex merge)
SCHEMA = 'research.measure-input/1'


# ---------------------------------------------------------------- helpers (the same arithmetic as the tested scripts)
def unit(a, b):
    d = math.dist(a, b)
    return ((b[0] - a[0]) / d, (b[1] - a[1]) / d) if d else (0.0, 0.0)


def line_seg_x(p, d, a, b):
    """line p + s d against segment a + t (b - a): (s, t) or None when parallel"""
    e = (b[0] - a[0], b[1] - a[1])
    den = d[0] * e[1] - d[1] * e[0]
    if abs(den) < 1e-12:
        return None
    return ((a[0] - p[0]) * e[1] - (a[1] - p[1]) * e[0]) / den, ((a[0] - p[0]) * d[1] - (a[1] - p[1]) * d[0]) / den


def foot(p, a, b):
    ax, ay = b[0] - a[0], b[1] - a[1]
    L2 = ax * ax + ay * ay
    t = 0 if L2 == 0 else max(0.0, min(1.0, ((p[0] - a[0]) * ax + (p[1] - a[1]) * ay) / L2))
    return t, (a[0] + t * ax, a[1] + t * ay)


def sarea(P):
    n = len(P)
    return sum(P[i][0] * P[(i + 1) % n][1] - P[(i + 1) % n][0] * P[i][1] for i in range(n)) / 2


def centroid(P):
    A = sarea(P)
    cx = cy = 0.0
    n = len(P)
    for i in range(n):
        (x0, y0), (x1, y1) = P[i], P[(i + 1) % n]
        c = x0 * y1 - x1 * y0
        cx += (x0 + x1) * c
        cy += (y0 + y1) * c
    return (cx / (6 * A), cy / (6 * A))


def inside(P, x):
    c = False
    n = len(P)
    for i in range(n):
        (x0, y0), (x1, y1) = P[i], P[(i + 1) % n]
        if (y0 > x[1]) != (y1 > x[1]) and x[0] < x0 + (x[1] - y0) * (x1 - x0) / (y1 - y0):
            c = not c
    return c


def closed_ring(P):
    return [list(p) for p in P] + [list(P[0])]


# ---------------------------------------------------------------- layer registration (the screenshot is the truth)
REG_DARK_MAX = 70          # screenshot pixels darker than this (luma) can be footprint outline ink
REG_ROAD_TOL = 12          # per-channel tolerance around the road layer's stroke colour (paths_stats.ROAD)
REG_COARSE, REG_TOP, REG_WIN, REG_MARGIN = 4, 6, 6, 100


def _hexrgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def _search(layer, screen):
    """integer origin (x, y) of a layer canvas in the screenshot maximising the layer mask's hits on the screen mask:
    a coarse pass at 1/REG_COARSE resolution over every origin keeping the canvas within REG_MARGIN px of the screen,
    then the full-resolution neighbourhood (+-REG_WIN) of the REG_TOP coarse peaks"""
    from PIL import Image, ImageChops
    f = REG_COARSE
    W, H = layer.size
    SW, SH = screen.size
    ls = layer.resize((max(1, W // f), max(1, H // f)), Image.BOX).point(lambda v: 255 if v > 0 else 0).convert('1')
    ss = screen.resize((SW // f, SH // f), Image.BOX).point(lambda v: 255 if v > 0 else 0).convert('1')
    lw, lh = ls.size
    coarse = []
    for oy in range(-REG_MARGIN // f, (SH - H + REG_MARGIN) // f + 1):
        for ox in range(-REG_MARGIN // f, (SW - W + REG_MARGIN) // f + 1):
            coarse.append((ImageChops.logical_and(ss.crop((ox, oy, ox + lw, oy + lh)), ls).histogram()[255], ox, oy))
    coarse.sort(reverse=True)
    lay1, scr1 = layer.convert('1'), screen.convert('1')
    tot = lay1.histogram()[255]
    fine = {}
    for _, ox, oy in coarse[:REG_TOP]:
        for dy in range(-REG_WIN, REG_WIN + 1):
            for dx in range(-REG_WIN, REG_WIN + 1):
                X, Y = ox * f + dx, oy * f + dy
                if (X, Y) not in fine:
                    fine[(X, Y)] = ImageChops.logical_and(scr1.crop((X, Y, X + W, Y + H)), lay1).histogram()[255]
    (bx, by), bs = max(fine.items(), key=lambda kv: (kv[1], -abs(kv[0][0]), -abs(kv[0][1])))
    nb1 = max(v for (x, y), v in fine.items() if max(abs(x - bx), abs(y - by)) == 1)
    far = max((v for (x, y), v in fine.items() if max(abs(x - bx), abs(y - by)) > 2), default=0)
    return {'origin': [bx, by], 'hit': bs / tot, 'bestNeighbour1px': nb1 / tot, 'bestBeyond2px': far / tot, 'maskPx': tot}


def register(fp, A, P, bc):
    """The road layer and the footprint layer are painted on separate offscreen canvases, each sized to its own content
    and composited later (NG composites through WebGL, so no placement is recorded): their pixel frames differ by an
    integer offset (measured 2-38 px on the 2026-09-25 captures). Each canvas is located in the generation's own
    screenshot (gen-N.png): footprint outlines against dark ink, road corridors (centrelines at their drawn widths)
    against road-coloured pixels. Footprints are then moved into the road canvas's frame by the difference."""
    from PIL import Image, ImageDraw, ImageChops
    png = fp.replace('.paths.json', '.png')
    scr = Image.open(png).convert('RGB')
    dark = scr.convert('L').point(lambda v: 255 if v < REG_DARK_MAX else 0)
    diff = ImageChops.difference(scr, Image.new('RGB', scr.size, _hexrgb(ps.ROAD)))
    chans = [c.point(lambda v: 255 if v <= REG_ROAD_TOL else 0) for c in diff.split()]
    road = ImageChops.multiply(ImageChops.multiply(chans[0], chans[1]), chans[2])
    cvb = next(r['cv'] for r in P if r['c'] == bc)
    rrec = next(r for r in P if r['op'] == 'stroke' and r['k'] == ps.ROAD)
    Wb, Hb = map(int, cvb.split('x'))
    Wr, Hr = map(int, rrec['cv'].split('x'))
    lb = Image.new('L', (Wb, Hb), 0)
    d = ImageDraw.Draw(lb)
    for l in A['lots']:
        d.line([tuple(q) for q in l['p']] + [tuple(l['p'][0])], fill=255, width=1)
    lr = Image.new('L', (Wr, Hr), 0)
    d = ImageDraw.Draw(lr)
    for s in A['streets'] + A['rings']:
        pts = [tuple(q) for q in s['p']] + ([tuple(s['p'][0])] if s['closed'] else [])
        d.line(pts, fill=255, width=max(1, int(round(s['wpx']))), joint='curve')
    ob, orr = _search(lb, dark), _search(lr, road)
    shift = [ob['origin'][0] - orr['origin'][0], ob['origin'][1] - orr['origin'][1]]
    return {'method': 'screenshot', 'screenshot': os.path.relpath(png, ROOT), 'footprintCanvas': {'id': bc, 'size': cvb, **ob},
            'roadCanvas': {'id': rrec['c'], 'size': rrec['cv'], **orr}, 'shiftFootprintsToRoadFrame': shift,
            'params': {'darkLumaMax': REG_DARK_MAX, 'roadChannelTol': REG_ROAD_TOL, 'coarse': REG_COARSE, 'top': REG_TOP,
                       'window': REG_WIN, 'margin': REG_MARGIN}}


# ---------------------------------------------------------------- capture metadata
def meta_of(cap, g):
    m = json.load(open(os.path.join(cap, 'meta.json')))
    href = next(x['href'] for x in m['passes']['draw'] if x['name'] == f'gen-{g}')
    seed = int(href.split('seed=')[1].split('&')[0])
    tags = m['args']['query'].split('tags=')[1].split(',')
    build = m['baseUrl'].split('/html/')[1].split('/')[0]
    return {'template': tags[0], 'size': tags[1] if len(tags) > 1 else None, 'seed': seed, 'href': href,
            'build': 'itch:' + build, 'started': m['started']}


# ---------------------------------------------------------------- the adapter
def adapt(fp, cap_name, g, info):
    A = ps.analyse(fp)
    S, R = A['streets'], A['rings']
    roads = S + R
    nS = len(S)
    j, P = ps.load(fp)
    sc = None
    for r in P:
        if r['op'] == 'stroke' and r['k'] == ps.ROAD:
            sc = math.sqrt(abs(r['m'][0] * r['m'][3] - r['m'][1] * r['m'][2]))
            break
    # ---- junction ends and their landing points (bentcut_geometry.nearest + bentcut_parent_face's snap, own code)
    ins = collections.defaultdict(list)      # (road k, segment j) -> [(t, (x, y), (street, end))]
    snap = {}                                # (street, end) -> (x, y)
    fallback = 0
    for si in range(nS):
        p = S[si]['p']
        for ei, (end, prev) in enumerate(((p[0], p[1]), (p[-1], p[-2]))):
            best_d = None
            for k, o in enumerate(roads):
                if k == si:
                    continue
                op = o['p'] + ([o['p'][0]] if o['closed'] else [])
                for s in range(len(op) - 1):
                    d = ps.seg_dist(end, op[s], op[s + 1])
                    if best_d is None or d < best_d[0]:
                        best_d = (d, k)
            if best_d is None or not best_d[0] <= JUNCTION_HW * S[si]['wpx'] / 2:
                continue
            k = best_d[1]
            tp = roads[k]['p'] + ([roads[k]['p'][0]] if roads[k]['closed'] else [])
            dvec = unit(prev, end)
            best = None
            for jj in range(len(tp) - 1):
                x = line_seg_x(end, dvec, tp[jj], tp[jj + 1])
                if x and -1e-9 <= x[1] <= 1 + 1e-9 and (best is None or abs(x[0]) < abs(best[0])):
                    best = (x[0], x[1], jj)
            if best is None or abs(best[0]) > SNAP_MAX_W * S[si]['wpx']:
                fallback += 1
                bj = min(range(len(tp) - 1), key=lambda jj: ps.seg_dist(end, tp[jj], tp[jj + 1]))
                t, q = foot(end, tp[bj], tp[bj + 1])
            else:
                s_, t, bj = best
                q = (end[0] + s_ * dvec[0], end[1] + s_ * dvec[1])
            ins[(k, bj)].append((t, q, (si, ei)))
            snap[(si, ei)] = q
    # ---- way polylines through every graph node (vertices, inserted landing points; snapped ends)
    ways = []
    for k, r in enumerate(roads):
        p = r['p']
        n = len(p)
        nseg = n - 1 + (1 if r['closed'] else 0)
        pts = list(p)                        # bentcut_parent_face replaces the end vertices' node ids by the landing nodes
        if (k, 0) in snap:
            pts[0] = snap[(k, 0)]
        if (k, 1) in snap:
            pts[-1] = snap[(k, 1)]
        coords, inserted = [], []
        for jj in range(nseg):
            coords.append(pts[jj])
            for t, q, _ in sorted(ins.get((k, jj), []), key=lambda z: z[0]):
                inserted.append(len(coords))
                coords.append(q)
        coords.append(pts[0] if r['closed'] else pts[-1])
        drawn_ends = [list(p[0]) if (k, 0) in snap else None, list(p[-1]) if (k, 1) in snap else None]
        ways.append({'k': k, 'coords': coords, 'inserted': inserted, 'drawnEnds': drawn_ends, 'closed': r['closed'],
                     'list': 'street' if k < nS else 'ring', 'n': r['n'], 'w': r['w'], 'wpx': r['wpx']})
    # ---- planar graph and faces (bentcut_parent_face's construction and face rule)
    nodes, nid = [], {}

    def node(q):
        key = (q[0], q[1])
        if key not in nid:
            nid[key] = len(nodes)
            nodes.append(key)
        return nid[key]
    edges = []
    zero_len = 0
    for w in ways:
        ids = [node(q) for q in w['coords']]
        for a, b in zip(ids, ids[1:]):
            if a != b and math.dist(nodes[a], nodes[b]) > 1e-6:
                edges.append((a, b, w['k']))
            else:
                zero_len += 1
    Hf, Ht, Hr = [], [], []
    for a, b, k in edges:
        Hf += [a, b]
        Ht += [b, a]
        Hr += [k, k]
    out = collections.defaultdict(list)
    for h in range(len(Hf)):
        out[Hf[h]].append(h)
    pos = {}
    for u_, hs in out.items():
        hs.sort(key=lambda h: math.atan2(nodes[Ht[h]][1] - nodes[Hf[h]][1], nodes[Ht[h]][0] - nodes[Hf[h]][0]))
        for i, h in enumerate(hs):
            pos[h] = i

    def nxt(h):
        o = out[Ht[h]]
        return o[(pos[h ^ 1] - 1) % len(o)]
    face = [-1] * len(Hf)
    faces = []
    for h0 in range(len(Hf)):
        if face[h0] != -1:
            continue
        cyc, h = [], h0
        while face[h] == -1:
            face[h] = len(faces)
            cyc.append(h)
            h = nxt(h)
        faces.append(cyc)
    fa = [sarea([nodes[Hf[h]] for h in cyc]) for cyc in faces]
    outer = max(range(len(faces)), key=lambda f: abs(fa[f]))
    so = fa[outer] > 0
    openf, dangling_interior = [], 0
    for f, cyc in enumerate(faces):
        dang = any(cyc[(i + 1) % len(cyc)] == (h ^ 1) for i, h in enumerate(cyc))
        interior_orient = f != outer and (fa[f] > 0) != so and fa[f] != 0
        dangling_interior += bool(interior_orient and dang)
        openf.append(f == outer or (fa[f] > 0) == so or fa[f] == 0 or dang)
    # islands: outer-orientation cycles other than the outer face that sit inside a bounded face
    bounded = [f for f in range(len(faces)) if not openf[f]]
    rings = {f: [nodes[Hf[h]] for h in faces[f]] for f in range(len(faces))}
    holes = collections.defaultdict(list)
    for f in range(len(faces)):
        if f == outer or (fa[f] > 0) != so or fa[f] == 0:
            continue
        probe = rings[f][0]
        host = [b for b in bounded if inside(rings[b], probe) and abs(fa[b]) > abs(fa[f])]
        if host:
            holes[min(host, key=lambda b: abs(fa[b]))].append(f)
    # components (for the census; Euler: bounded-orientation faces = E - V + C)
    par = list(range(len(nodes)))

    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x
    used = set()
    for a, b, _ in edges:
        used.add(a)
        used.add(b)
        ra, rb = find(a), find(b)
        if ra != rb:
            par[ra] = rb
    comps = len({find(x) for x in used})
    # ---- footprints and roofs, moved into the road canvas's frame (layer registration)
    hatch = collections.Counter(r['c'] for r in P if r['op'] == 'fill' and r['k'] == ps.INK and r.get('nv') == 3)
    bc = hatch.most_common(1)[0][0]
    reg = register(fp, A, P, bc)
    sx, sy = reg['shiftFootprintsToRoadFrame']
    lots = [[(x + sx, y + sy) for x, y in l['p']] for l in A['lots']]
    roofs = [{'n': r['n'], 'p': [(x + sx, y + sy) for x, y in r['p']]} for r in A['roofs']]
    dropped = {'zeroAreaPolygons': sum(1 for p in lots if abs(sarea(p)) == 0.0),
               'mergedVertices': sum(1 for p in lots for i in range(len(p))
                                     if math.dist(p[i], p[(i + 1) % len(p)]) / sc <= MM_DECLARED_MU),
               'zeroLengthWaySegments': zero_len}
    ar = [abs(sarea(p)) for p in lots]
    cs = [centroid(p) for p in lots]
    tot = sum(ar)
    centre = [sum(c[0] * a for c, a in zip(cs, ar)) / tot, sum(c[1] * a for c, a in zip(cs, ar)) / tot]
    # ---- the MeasureInput
    feats = []
    for w in ways:
        feats.append({'kind': 'way', 'id': f"w{w['k']}", 'geometry': {'type': 'LineString', 'coordinates': [list(q) for q in w['coords']]},
                      'props': {'class': 'street'}})
    for bi, f in enumerate(bounded):
        poly = [closed_ring(rings[f])] + [closed_ring(rings[hf]) for hf in holes.get(f, [])]
        feats.append({'kind': 'block', 'id': f'k{bi}', 'geometry': {'type': 'Polygon', 'coordinates': poly}, 'props': {}})
    for li, p in enumerate(lots):
        feats.append({'kind': 'plot', 'id': f'p{li}', 'geometry': {'type': 'Polygon', 'coordinates': [closed_ring(p)]},
                      'props': {'class': 'unknown'}})
    for li, p in enumerate(lots):
        feats.append({'kind': 'building', 'id': f'b{li}', 'geometry': {'type': 'Polygon', 'coordinates': [closed_ring(p)]},
                      'props': {'class': 'unknown'}})
    census = {'streets': nS, 'closedRoads': len(R), 'junctionEnds': len(snap), 'fallbackSnaps': fallback,
              'nodes': len(used), 'edges': len(edges), 'components': comps, 'faces': len(faces),
              'openFaces': sum(openf), 'blocks': len(bounded), 'blocksWithIslands': len(holes),
              'boundedOrientationFacesWithDanglingEdge': dangling_interior, 'footprints': len(lots),
              'roofFaces': len(A['roofs']), 'dropped': dropped}
    mi = {
        'schema': SCHEMA,
        'header': {'source': 'NG', 'build': info['build'], 'scale': 'relative', 'centre': centre},
        'features': feats,
        'research': {
            'script': SCRIPT, 'capture': cap_name, 'gen': g, 'file': os.path.relpath(fp, ROOT), 'label': ps.label(fp),
            'template': info['template'], 'size': info['size'], 'seed': info['seed'], 'recorded': info['started'],
            'ctmScale': sc, 'units': 'canvas px; mu = px / ctmScale; metres only as declared 0.35 m per mu',
            'note': 'research-side sidecar; read by no metric, dropped by the product reader; never crosses',
            'ways': [{'id': f"w{w['k']}", 'list': w['list'], 'n': w['n'], 'w': w['w'], 'wpx': w['wpx'], 'closed': w['closed'],
                      'inserted': w['inserted'], 'drawnEnds': w['drawnEnds']} for w in ways],
            'lotDrawIndex': [l['n'] for l in A['lots']],
            'roofFaces': [{'n': r['n'], 'p': [list(q) for q in r['p']]} for r in roofs],
            'registration': reg,
            'census': census,
            'snaps': [[si, ei, list(q)] for (si, ei), q in sorted(snap.items())],
        },
    }
    return mi


def out_name(cap_name, g):
    return f'{cap_name}.gen-{g}.metric.geojson.gz'


def write(mi, path):
    raw = json.dumps(mi, separators=(',', ':'), sort_keys=False).encode()
    # mtime 0 so the gzip bytes are reproducible
    with open(path, 'wb') as fh:
        with gzip.GzipFile(filename='', mode='wb', fileobj=fh, mtime=0) as gz:
            gz.write(raw)
    return len(raw)


def read(path):
    with gzip.open(path, 'rb') as fh:
        return json.loads(fh.read().decode())


def main():
    args = sys.argv[1:]
    out = OUT_DEFAULT
    if '--out' in args:
        i = args.index('--out')
        out = args[i + 1]
        del args[i:i + 2]
    caps = args or [os.path.join(ROOT, 'captures', 'neighbourhood', c) for c in CAPS_DEFAULT]
    os.makedirs(out, exist_ok=True)
    for cap in caps:
        cap_name = os.path.basename(cap.rstrip('/'))
        for g in (0, 1):
            fp = os.path.join(cap, 'draw', f'gen-{g}.paths.json')
            if not os.path.exists(fp):
                continue
            info = meta_of(cap, g)
            mi = adapt(fp, cap_name, g, info)
            path = os.path.join(out, out_name(cap_name, g))
            nraw = write(mi, path)
            c = mi['research']['census']
            rg = mi['research']['registration']
            print(f"{cap_name} gen-{g} registration shift {rg['shiftFootprintsToRoadFrame']} (footprint hit {rg['footprintCanvas']['hit']:.3f}, "
                  f"1 px {rg['footprintCanvas']['bestNeighbour1px']:.3f}; road hit {rg['roadCanvas']['hit']:.3f}, 1 px {rg['roadCanvas']['bestNeighbour1px']:.3f})")
            print(f"{cap_name} gen-{g} {info['template']} seed {info['seed']}: ways {c['streets']}+{c['closedRoads']} junction ends "
                  f"{c['junctionEnds']} (fallback {c['fallbackSnaps']}) nodes {c['nodes']} edges {c['edges']} components "
                  f"{c['components']} faces {c['faces']} open {c['openFaces']} blocks {c['blocks']} islands {c['blocksWithIslands']} "
                  f"footprints {c['footprints']} dropped {c['dropped']} -> {os.path.relpath(path, ROOT)} "
                  f"({nraw} B raw, {os.path.getsize(path)} B gz)")


if __name__ == '__main__':
    main()
