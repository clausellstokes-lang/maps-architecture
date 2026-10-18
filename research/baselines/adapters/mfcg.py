#!/usr/bin/env python3
"""research/baselines/adapters/mfcg.py -- MFCG JSON exports -> MeasureInput (V12 section 2.2), M-1 work item W-07.

Lane m1/W-07 (docs/calibration/M-1-plan.md section 2, row W-07; record docs/calibration/E07-mfcg-signature.md). Research
side only: nothing here enters plat/, and the files it writes are geometry, which never crosses (V12 section 3.3). Our
own code, standard library only (Python 3.9). It reads the GeoJSON exports (and the export log's canonical href for the
generation options); it never opens a captured program bundle.

Mapping (V12 section 3.2.2; the JSON export is already in metres, the sweep README's 'Units'):
  way        each exported road LineString, class 'arterial', widthM = its width
  building   each 'buildings' and 'prisms' polygon, class 'unknown' (V12: "each footprint and prism a building")
  enclosure  the city ring (the largest 'walls' ring by area, stats.py's rule; the sidecar records whether it is also
             the first ring, V12's wording) as a closed Polygon -- the ring stays the enclosure (J-V12.31)
  wall       the city ring's built stretches, class 'curtain': one closed LineString when nothing is split off, else one
             open LineString per maximal run of non-closure edges; every other ring a closed LineString of class
             'castle' plus a 'castle' Polygon
  closure    THE SHORE SPLIT (item 106): ring edges whose two vertices lie within 0.5 m of the sea polygon's boundary,
             grouped into maximal runs, class 'shore'
  gate       city-ring vertices within 0.01 m (both axes) of a road vertex, less the vertices shared with a castle ring
             (gates_towers.py's rule), class 'land'; a city-ring vertex within 0.5 m of a river centreline that is
             neither a land gate, nor castle-shared, nor inside a shore closure, class 'water'. A castle ring's
             road-touching vertices (its gate) are kept in the sidecar only, so every gate feature is a gate of the
             outermost curtain (declared)
  tower      the castle rings' non-gate vertices plus the city-ring vertices that are neither a gate, nor
             castle-shared, nor inside a shore closure (a vertex both of whose ring edges are closure edges), so the
             shore-end posts keep theirs
  district   each district polygon, opaque id, NO name (V12 section 2.2: no names cross into a MeasureInput)
  square     each 'squares' polygon, class 'market' (the exported square is the market's: one per city, and the
             coverage records build one market geometry per delivered city; record E07 section D24)
  green, field   the park and field polygons;  river  the centrelines with widthM = the file's riverWidth
  pier       the 'planks' segments with their width;  water  the sea polygons, class 'sea';  tree  the tree points
Header: source MFCG, build itch:12710731, scale metric, centre = the principal (largest) square's area centroid, else the
city ring's, else the footprints'; rung by the matched sizes (40 TOWN, 80 CITY, 130 METROPOLIS); water 'none' or
'coast+river' (or 'coast' / 'river'); options = the canonical href's numbers (size, seed and the 0/1 flags).
Degenerate geometry (V12 section 3.2.2): coincident consecutive vertices within 1 mm merge; zero-length segments and
zero-area polygons drop; rings close on write; a self-touching ring splits at the touch into its simple parts; every drop
and split counted in the sidecar's census.
A 'research' sidecar no metric reads: ring indices of every gate, tower, castle-shared and shore vertex, the castle gate,
the file's version values and sha256, the census.

Usage:
  python3 research/baselines/adapters/mfcg.py [EXPORT_DIR ...] [--out DIR]
    default: captures/mfcg/exports-2026-09-25 and captures/mfcg/exports-sweep-2026-09-25 (the 2026-09-25 fixtures)
    W-07b (lane m1/W-07b): python3 research/baselines/adapters/mfcg.py captures/mfcg/exports-sweep-m1-2026-10-03
      (the M-1 sweep's 35 exports, failed retries included; a J161 capture's options come from its j161/ log record)
"""
import gzip
import hashlib
import json
import math
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))

SCRIPT = 'research:baselines/adapters/mfcg.py'
REFERENCE_BUILD = 'itch:12710731'
BUILD_DIR = 'itch-12710731'
OUT_DEFAULT = os.path.join(ROOT, 'research', 'baselines', 'inputs', 'MFCG', BUILD_DIR)
DIRS_DEFAULT = [os.path.join(ROOT, 'captures', 'mfcg', 'exports-2026-09-25'),
                os.path.join(ROOT, 'captures', 'mfcg', 'exports-sweep-2026-09-25')]
SCHEMA = 'research.measure-input/1'
MERGE_M = 0.001        # 1 mm: coincident vertices merge
NEAR_M = 0.01          # road-vertex coincidence on the ring (gates_towers.py / stats.py rule, per axis)
SHORE_M = 0.5          # a ring vertex on the sea boundary (V12 section 3.2.2)
RIVER_M = 0.5          # a ring vertex on a river centreline (declared: the shore split's tolerance)
RUNGS = {40: 'TOWN', 80: 'CITY', 130: 'METROPOLIS'}


# ---------------------------------------------------------------- geometry helpers
def sarea(r):
    n = len(r)
    return 0.5 * sum(r[i][0] * r[(i + 1) % n][1] - r[(i + 1) % n][0] * r[i][1] for i in range(n))


def centroid(r):
    n = len(r); a = cx = cy = 0.0
    for i in range(n):
        x0, y0 = r[i]; x1, y1 = r[(i + 1) % n]; c = x0 * y1 - x1 * y0
        a += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c
    if abs(a) < 1e-12:
        return [sum(p[0] for p in r) / n, sum(p[1] for p in r) / n]
    return [cx / (3 * a), cy / (3 * a)]


def dseg(p, a, b):
    ax, ay = a; bx, by = b; px, py = p; dx, dy = bx - ax, by - ay; L = dx * dx + dy * dy
    t = 0.0 if L == 0 else max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / L))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def open_ring(r):
    r = [list(map(float, p)) for p in r]
    return r[:-1] if len(r) > 1 and r[0] == r[-1] else r


def closed(r):
    return [list(p) for p in r] + [list(r[0])]


def clean_ring(raw, census):
    """V12 3.2.2's rule on one ring: merge, drop zero-area, split self-touches. Returns a list of simple rings (open)."""
    r = open_ring(raw)
    out = []
    for p in r:
        if out and math.dist(out[-1], p) <= MERGE_M:
            census['mergedVertices'] += 1
            continue
        out.append(p)
    while len(out) > 1 and math.dist(out[0], out[-1]) <= MERGE_M:
        out.pop(); census['mergedVertices'] += 1
    # split at a self-touch: a later vertex within 1 mm of an earlier, non-adjacent one
    parts, stack = [], []
    for p in out:
        hit = next((k for k in range(len(stack) - 1, -1, -1) if math.dist(stack[k], p) <= MERGE_M), None)
        if hit is None:
            stack.append(p)
        elif len(stack) - hit >= 3:
            parts.append(stack[hit:]); del stack[hit + 1:]; census['selfTouchSplits'] += 1
        else:   # a back-and-forth spike (zero area): its tip drops
            census['spikesDropped'] += len(stack) - hit - 1; del stack[hit + 1:]
    parts.append(stack)
    keep = []
    for q in parts:
        if len(q) < 3 or abs(sarea(q)) < 1e-9:
            census['droppedPolygons'] += 1
        else:
            keep.append(q)
    return keep


def clean_line(raw, census):
    out = []
    for p in raw:
        p = list(map(float, p))
        if out and math.dist(out[-1], p) <= MERGE_M:
            census['mergedVertices'] += 1
            continue
        out.append(p)
    if len(out) < 2:
        census['droppedLines'] += 1
        return None
    return out


# ---------------------------------------------------------------- the export log (canonical href)
def query_options(href):
    q = (href or '').split('?', 1)[-1]
    opts = {}
    for kv in q.split('&'):
        if '=' in kv:
            k, v = kv.split('=', 1)
            try:
                opts[k] = int(v)
            except ValueError:
                try:
                    opts[k] = float(v)
                except ValueError:
                    pass   # never a string option (V12 2.2: numbers and flags only)
    return opts


def href_options(d, stem):
    """The canonical href's options from the folder's export log; a J161 capture (downloads denied, files from the
    in-page Blob: W-03-complete, W-03b) has its record in <folder>/j161/export-log.jsonl instead (lane m1/W-07b), which
    is read only when the folder's own log holds no record for the stem. Returns (options or None, source or None)."""
    log = os.path.join(d, 'export-log.jsonl')
    opts = None
    if os.path.exists(log):
        for line in open(log):
            r = json.loads(line)
            if r.get('name') != stem or not r.get('downloads'):
                continue
            if str(r['downloads'][0].get('suggestedFilename', '')).endswith('.json'):
                opts = query_options(r.get('hrefAfter', ''))
    if opts is not None:
        return opts, None
    j161 = os.path.join(d, 'j161', 'export-log.jsonl')
    if os.path.exists(j161):
        for line in open(j161):
            r = json.loads(line)
            if r.get('name') == stem and r.get('jsonOk') and r.get('hrefAfter'):
                opts = query_options(r['hrefAfter'])
        if opts is not None:
            return opts, 'j161/export-log.jsonl'
    return None, None


# ---------------------------------------------------------------- the adapter
def adapt(d, stem):
    path = os.path.join(d, stem + '.json')
    raw = open(path, 'rb').read()
    J = json.loads(raw.decode())
    F = {f['id']: f for f in J['features']}
    vals = F['values'].get('properties', F['values'])
    census = dict(mergedVertices=0, selfTouchSplits=0, spikesDropped=0, droppedPolygons=0, droppedLines=0)
    feats = []

    def add(kind, fid, gtype, coords, **props):
        feats.append({'kind': kind, 'id': fid, 'geometry': {'type': gtype, 'coordinates': coords},
                      'props': {k: v for k, v in props.items() if v is not None}})

    # ways
    roads = []
    for i, g in enumerate(F['roads']['geometries']):
        ln = clean_line(g['coordinates'], census)
        if ln:
            roads.append(ln)
            add('way', f'w{i}', 'LineString', ln, **{'class': 'arterial', 'widthM': g.get('width')})
    road_vertices = [tuple(v) for ln in roads for v in ln]

    # buildings (footprints and prisms)
    nb = 0
    for key, pre in (('buildings', 'b'), ('prisms', 'p')):
        for i, poly in enumerate(F[key]['coordinates']):
            for j, rr in enumerate(clean_ring(poly[0], census)):
                add('building', f'{pre}{i}' + (f'.{j}' if j else ''), 'Polygon', [closed(rr)], **{'class': 'unknown'})
                nb += 1

    # walls: the city ring (largest by area) and the castle ring(s)
    rings_raw = [open_ring(g['coordinates'][0]) for g in F['walls']['geometries']]
    order = sorted(range(len(rings_raw)), key=lambda k: abs(sarea(rings_raw[k])), reverse=True)
    research = {'folder': os.path.basename(d.rstrip('/')), 'stem': stem,
                'jsonSha256': hashlib.sha256(raw).hexdigest(), 'jsonBytes': len(raw),
                'version': vals.get('version'), 'values': {k: vals.get(k) for k in ('roadWidth', 'towerRadius', 'wallThickness', 'riverWidth')},
                'wallRings': len(rings_raw), 'cityRingIsFirst': (order[0] == 0) if order else None}
    city = None; castles = []
    if rings_raw:
        cr = clean_ring(rings_raw[order[0]], census)
        city = cr[0] if cr else None
        for k in order[1:]:
            castles.extend(clean_ring(rings_raw[k], census))

    near = lambda a, b: abs(a[0] - b[0]) < NEAR_M and abs(a[1] - b[1]) < NEAR_M
    # sea polygons and rivers
    seas = []
    if 'water' in F:
        for i, poly in enumerate(F['water']['coordinates']):
            for j, rr in enumerate(clean_ring(poly[0], census)):
                seas.append(rr)
                add('water', f's{i}' + (f'.{j}' if j else ''), 'Polygon', [closed(rr)], **{'class': 'sea'})
    rivers = []
    rw = vals.get('riverWidth')
    for i, g in enumerate(F['rivers']['geometries']):
        ln = clean_line(g['coordinates'], census)
        if ln:
            rivers.append(ln)
            add('river', f'r{i}', 'LineString', ln, widthM=rw if rw is not None else g.get('width'))

    gates_land, gates_water, shared, shore_v, closure_edges, towers_city = [], [], [], [], [], []
    castle_gates, towers_castle = [], []
    if city:
        n = len(city)
        shared = [i for i, v in enumerate(city) if any(near(v, c) for cr_ in castles for c in cr_)]
        gates_land = [i for i, v in enumerate(city) if i not in shared and any(near(v, r) for r in road_vertices)]
        # the shore split
        if seas:
            sea_segs = [(s[k], s[(k + 1) % len(s)]) for s in seas for k in range(len(s))]
            shore_v = [i for i, v in enumerate(city) if min(dseg(v, a, b) for a, b in sea_segs) <= SHORE_M]
        sv = set(shore_v)
        closure_edges = [i for i in range(n) if i in sv and (i + 1) % n in sv]   # edge i = (i, i+1)
        ce = set(closure_edges)
        interior = {i for i in range(n) if i in ce and (i - 1) % n in ce}
        if rivers:
            riv_segs = [(ln[k], ln[k + 1]) for ln in rivers for k in range(len(ln) - 1)]
            gates_water = [i for i, v in enumerate(city)
                           if i not in shared and i not in gates_land and i not in interior
                           and min(dseg(v, a, b) for a, b in riv_segs) <= RIVER_M]
        gset = set(gates_land) | set(gates_water)
        towers_city = [i for i in range(n) if i not in gset and i not in shared and i not in interior]
        # enclosure, curtain stretches, closures
        add('enclosure', 'e0', 'Polygon', [closed(city)])
        if not ce:
            add('wall', 'c0', 'LineString', closed(city), **{'class': 'curtain'})
        elif len(ce) == n:
            add('closure', 'z0', 'LineString', closed(city), **{'class': 'shore'})
        else:
            # runs of equal kind, starting just after a kind change
            start = next(i for i in range(n) if (i in ce) != (((i - 1) % n) in ce))
            runs, cur = [], [start]
            for k in range(1, n + 1):
                e = (start + k) % n
                prev = (start + k - 1) % n
                if k < n and (e in ce) == (prev in ce):
                    cur.append(e)
                else:
                    runs.append(cur); cur = [e]
            ci = si = 0
            for run in runs:
                pts = [city[run[0]]] + [city[(e + 1) % n] for e in run]
                if run[0] in ce:
                    add('closure', f'z{si}', 'LineString', pts, **{'class': 'shore'}); si += 1
                else:
                    add('wall', f'c{ci}', 'LineString', pts, **{'class': 'curtain'}); ci += 1
        for i in gates_land:
            add('gate', f'g{i}', 'Point', list(city[i]), **{'class': 'land'})
        for i in gates_water:
            add('gate', f'g{i}', 'Point', list(city[i]), **{'class': 'water'})
        for i in towers_city:
            add('tower', f't{i}', 'Point', list(city[i]))
    for k, cr_ in enumerate(castles):
        cg = [i for i, v in enumerate(cr_) if any(near(v, r) for r in road_vertices)]
        castle_gates.append(cg)
        tc = [i for i in range(len(cr_)) if i not in cg]
        towers_castle.append(tc)
        add('wall', f'k{k}', 'LineString', closed(cr_), **{'class': 'castle'})
        add('castle', f'k{k}', 'Polygon', [closed(cr_)])
        for i in tc:
            add('tower', f'k{k}t{i}', 'Point', list(cr_[i]))

    # districts (no names), squares, greens, fields, piers, trees
    for i, g in enumerate(F['districts']['geometries']):
        for j, rr in enumerate(clean_ring(g['coordinates'][0], census)):
            add('district', f'd{i}' + (f'.{j}' if j else ''), 'Polygon', [closed(rr)])
    squares = []
    for i, poly in enumerate(F['squares']['coordinates']):
        for j, rr in enumerate(clean_ring(poly[0], census)):
            squares.append(rr)
            add('square', f'q{i}' + (f'.{j}' if j else ''), 'Polygon', [closed(rr)], **{'class': 'market'})
    for key, kind, pre in (('greens', 'green', 'n'), ('fields', 'field', 'f')):
        for i, poly in enumerate(F[key]['coordinates']):
            for j, rr in enumerate(clean_ring(poly[0], census)):
                add(kind, f'{pre}{i}' + (f'.{j}' if j else ''), 'Polygon', [closed(rr)])
    for i, g in enumerate(F['planks']['geometries']):
        ln = clean_line(g['coordinates'], census)
        if ln:
            add('pier', f'k{i}', 'LineString', ln, widthM=g.get('width'))
    for i, p in enumerate(F['trees']['coordinates']):
        add('tree', f'x{i}', 'Point', list(map(float, p)))

    # header
    opts, opts_from = href_options(d, stem)
    opts = opts or {}
    if squares:
        centre = centroid(max(squares, key=lambda q: abs(sarea(q))))
    elif city:
        centre = centroid(city)
    else:
        bs = [f for f in feats if f['kind'] == 'building']
        cs = [centroid(open_ring(f['geometry']['coordinates'][0])) for f in bs]
        centre = [sum(c[0] for c in cs) / len(cs), sum(c[1] for c in cs) / len(cs)] if cs else [0.0, 0.0]
    coast, river = opts.get('coast', 0), opts.get('river', 0)
    water = 'coast+river' if coast and river else 'coast' if coast else 'river' if river else 'none'
    header = {'source': 'MFCG', 'build': REFERENCE_BUILD, 'scale': 'metric', 'centre': [round(centre[0], 6), round(centre[1], 6)],
              'water': water, 'options': opts}
    if opts.get('size') in RUNGS:
        header['rung'] = RUNGS[opts['size']]
    research.update({
        'cityRing': [list(p) for p in city] if city else None,
        'castleRings': [[list(p) for p in c] for c in castles],
        'castleShared': shared, 'gatesLand': gates_land, 'gatesWater': gates_water, 'castleGates': castle_gates,
        'shoreVertices': shore_v, 'closureEdges': closure_edges, 'towersCity': towers_city, 'towersCastle': towers_castle,
        'census': dict(census, buildings=nb, ways=len(roads), districts=len(F['districts']['geometries']),
                       squares=len(squares), seaPolygons=len(seas), rivers=len(rivers),
                       planks=len(F['planks']['geometries']), trees=len(F['trees']['coordinates'])),
        'script': SCRIPT,
    })
    if opts_from:   # only the J161 captures carry it, so every earlier MeasureInput keeps its bytes
        research['optionsFrom'] = opts_from
    return {'schema': SCHEMA, 'header': header, 'features': feats, 'research': research}


def out_name(folder, stem):
    return f'{folder}.{stem}.metric.geojson.gz'


def write(mi, path):
    raw = json.dumps(mi, separators=(',', ':'), sort_keys=False).encode()
    with open(path, 'wb') as fh:
        with gzip.GzipFile(filename='', mode='wb', fileobj=fh, mtime=0) as gz:   # mtime 0: reproducible bytes
            gz.write(raw)
    return len(raw)


def read(path):
    with gzip.open(path, 'rb') as fh:
        return json.loads(fh.read().decode())


def stems_of(d):
    import re
    st = [f[:-5] for f in os.listdir(d) if f.endswith('.json') and not f.startswith(('stats', 'export', 'probe'))]
    return sorted(st, key=lambda x: [int(t) if t.isdigit() else t for t in re.split(r'(\d+)', x)])


def main():
    args = sys.argv[1:]
    out = OUT_DEFAULT
    if '--out' in args:
        i = args.index('--out'); out = args[i + 1]; del args[i:i + 2]
    dirs = args or DIRS_DEFAULT
    os.makedirs(out, exist_ok=True)
    for d in dirs:
        folder = os.path.basename(d.rstrip('/'))
        for stem in stems_of(d):
            mi = adapt(d, stem)
            p = os.path.join(out, out_name(folder, stem))
            nraw = write(mi, p)
            r = mi['research']; c = r['census']
            print(f"{folder}/{stem}: buildings {c['buildings']} ways {c['ways']} districts {c['districts']} squares {c['squares']} "
                  f"ring {len(r['cityRing']) if r['cityRing'] else 0} shared {len(r['castleShared'])} gates land {len(r['gatesLand'])} "
                  f"water {len(r['gatesWater'])} shore vertices {len(r['shoreVertices'])} closure edges {len(r['closureEdges'])} "
                  f"towers {len(r['towersCity'])}+{sum(len(t) for t in r['towersCastle'])} castle gates {[len(g) for g in r['castleGates']]} "
                  f"city-first {r['cityRingIsFirst']} merged {c['mergedVertices']} splits {c['selfTouchSplits']} dropped "
                  f"{c['droppedPolygons']}/{c['droppedLines']} -> {os.path.relpath(p, ROOT)} ({nraw} B raw, {os.path.getsize(p)} B gz)")


if __name__ == '__main__':
    main()
