#!/usr/bin/env python3
"""research/baselines/adapters/ftg.py -- FTG layout payloads -> MeasureInput (V12 section 2.2), M-1 work item W-05.

Lane m1/W-05 (docs/calibration/M-1-plan.md section 2, row W-05; record docs/calibration/E05-ftg-metrics.md). Research
side only: nothing here enters plat/, and the files it writes are geometry, which never crosses (V12 section 3.3). Our
own code, standard library only (Python 3.9). It reads the Fetch-intercepted layout payload of one capture folder and
the PUT body recorded in that session's network index (never a captured program bundle).

Decoding follows the recorded findings: zig-zag sint32 coordinates in centimetres, +x east, +y north, the settlement
centre near the origin (research/findings/_critic-ftg.md section 4; memory note on FTG payload decoding); the layout
message's field numbers and the edge-type numbers are research/findings/code-ftg-client.md section 2 items 2-3 and its
field table (numbers only are used here).

What it writes, per capture, research/baselines/inputs/FTG/<build dir>/<capture>.metric.geojson.gz:
  header    source FTG, build 'ftg:<server date>+<sha256 of the exact PUT body, 12 hex>', scale 'metric' (metres),
            centre = the area-weighted centroid of all footprints (V12 section 2.2's last fallback: FTG exports no
            square and its wall is an open chain, not a ring), population = the size preset's nominal population
            (the payload holds no resident count), water from the request's coast and river keys, numeric options
  way       road edges chained into maximal same-class runs through nodes of way-degree 2 (FTG stores no way
            entity; its runs between junctions are its ways). Classes (V12 section 3.2.2): edge type 1 (main road)
            -> arterial; type 0 (road) whose midpoint lies inside a district ring -> street (the district stages),
            outside every ring -> lane (the suburb stage; roadlength100 README); types 2, 10, 13 (dirt road, small
            road, trail) -> track (decision W05-D1, recorded in E05: the plan names three classes only)
  wall      wall-type edges (5, 7, 8, 9; only 7 occurs) chained into built stretches, class 'curtain' (open chains)
  tower     the wall towers (field 7), points
  building  every footprint (field 8), class 'unknown' (V12: references have one class)
  water     the water bodies (field 6): class 'sea' when the polygon reaches the map border and its ribbon width
            2A/P is >= 200 m, 'river' when it reaches the border and 2A/P < 200 m, else 'lake' (a basin)
  pier      pier-type edges (11, 12) chained, LineStrings
  tree      the instances of the three templated tree kinds (decorations 11.9-11.11), points
  field     ground-cover polygons of texture ids 0, 1, 3, 11, 12, 13 (PLAUSIBLE: the six farm textures of the code
            reading, identified by their count and size signature; no W-05 metric reads them)
  district  the district rings (10.5.1), polygons, no names
  research  a sidecar no metric reads and the product reader drops: raw counts, the degenerate-geometry counts, each
            way's raw edge type, each building's category number and lifestyle tier pair (numbers only), the
            request's six lifestyle weights, the server timings, provenance
Dropped edge types: 3 (map border), 4 (invisible lot edges), 6 (field fences), 14 (water outline; water comes from
field 6). MeasureInput carries no name or label text (V12 section 2.2): district names, building labels and asset keys
stay in the payload.
Degenerate geometry (V12 section 3.2.2): coincident vertices within 1 mm merge (coordinates are whole centimetres, so
this is exact equality), zero-length edges and zero-area polygons drop, rings close on read; each drop is counted.

Usage:
  python3 research/baselines/adapters/ftg.py [CAPTURE_STAMP ...] [--out DIR]   (default: the two CITY captures)
"""
import collections
import datetime
import gzip
import hashlib
import json
import math
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'tools'))
from pb_raw import parse, varint  # noqa: E402

SCRIPT = 'research:baselines/adapters/ftg.py'
SCHEMA = 'research.measure-input/1'
OUT_ROOT = os.path.join(ROOT, 'research', 'baselines', 'inputs', 'FTG')
CAPS_DEFAULT = ['2026-09-21T05-23-58', '2026-09-25T10-13-51']
# a capture whose settlement was created (PUT) in an earlier session folder of the same guest identity: the
# 2026-09-21 payload is the 05:24 re-load of the settlement the 05:17 PUT created (same settlement id, no PUT between)
PUT_SESSION = {'2026-09-21T05-23-58': '2026-09-21T05-08-07'}
PRESETS = os.path.join(ROOT, 'research', 'ftg-capture', 'presets.json')

# edge-type numbers (code-ftg-client.md section 2 item 2)
ARTERIAL_TYPES = {1}
ROAD_TYPE = 0
TRACK_TYPES = {2, 10, 13}
WAY_TYPES = ARTERIAL_TYPES | {ROAD_TYPE} | TRACK_TYPES
WALL_TYPES = {5, 7, 8, 9}
PIER_TYPES = {11, 12}
DROPPED_TYPES = {3, 4, 6, 14}
TREE_SUBFIELDS = (9, 10, 11)                 # decorations: the three templated tree kinds
FIELD_TEXTURES = (0, 1, 3, 11, 12, 13)       # PLAUSIBLE (see the docstring)
RESIDENCE_CATEGORY = 1                       # field 8.4
SEA_MIN_RIBBON_M = 200.0


# ---------------------------------------------------------------- decoding
def zz(u):
    return (u >> 1) ^ -(u & 1)


def packed(b):
    i, out = 0, []
    while i < len(b):
        x, i = varint(b, i)
        out.append(x)
    return out


def fields(b):
    d = collections.defaultdict(list)
    for fn, wt, v in parse(b):
        d[fn].append((wt, v))
    return d


def one(d, fn, default=None):
    return d[fn][0][1] if fn in d else default


def uv(d, fn, default=0):
    return d[fn][0][1] if fn in d else default


def pts_cm(b):
    v = [zz(x) for x in packed(b)]
    return [(v[i], v[i + 1]) for i in range(0, len(v) - 1, 2)]


def point_cm(b):
    d = fields(b)
    return (zz(uv(d, 1)), zz(uv(d, 2)))


def decode(path):
    """the payload as numbers in centimetres (ints); strings kept only where a later step needs them in memory"""
    blob = open(path, 'rb').read()
    top = fields(blob)
    R = fields(one(top, 3))
    nodes, adjacency = {}, {}
    for _, v in R[2]:
        d = fields(v)
        nid = uv(d, 1)
        nodes[nid] = point_cm(one(d, 2)) if 2 in d else (0, 0)
        adjacency[nid] = packed(one(d, 3, b'')) if 3 in d else []
    edges = []
    for _, v in R[1]:
        d = fields(v)
        edges.append((uv(d, 1), uv(d, 2), uv(d, 3), uv(d, 4)))
    border = pts_cm(one(top, 5, b''))
    water = []
    for _, v in top[6]:
        d = fields(v)
        water.append((uv(d, 1), pts_cm(one(d, 2, b''))))
    towers = []
    for _, v in top[7]:
        d = fields(v)
        towers.append(dict(id=uv(d, 1), pos=point_cm(one(d, 2)), type=uv(d, 4)))
    buildings = []
    for _, v in top[8]:
        d = fields(v)
        buildings.append(dict(id=uv(d, 1), poly=pts_cm(one(d, 2, b'')), cat=uv(d, 4),
                              label=one(d, 5, b'').decode('utf8', 'replace'),
                              ent=point_cm(one(d, 6)) if 6 in d else None, rooms=uv(d, 9)))
    textures = []
    for _, v in top[9]:
        d = fields(v)
        polys = [pts_cm(one(fields(lv), 2, b'')) for _, lv in d.get(2, [])]
        textures.append((uv(d, 1), polys))
    districts = []
    for _, v in top[10]:
        d = fields(v)
        rings = []
        for _, lv in d.get(5, []):
            ld = fields(lv)
            rings.append([pts_cm(b) for wt, b in ld.get(1, []) if wt == 2])
        districts.append(dict(id=uv(d, 1), rings=rings))
    trees, decor_counts = [], {}
    dec = fields(one(top, 11, b''))
    for fn in sorted(dec):
        n = 0
        for _, v in dec[fn]:
            d = fields(v)
            if any(wt == 5 for wt, _ in d.get(2, [])):        # a standalone point decoration
                n += 1
                continue
            for wt, iv in d.get(2, []):
                if wt != 2:
                    continue
                idd = fields(iv)
                if 2 in idd:
                    n += 1
                    if fn in TREE_SUBFIELDS:
                        trees.append(point_cm(one(idd, 2)))
        decor_counts[fn] = n
    return dict(path=path, bytes=len(blob), top=sorted(top), nodes=nodes, adjacency=adjacency, edges=edges,
                border=border, water=water, towers=towers, buildings=buildings, textures=textures,
                districts=districts, trees=trees, decorCounts=decor_counts)


# ---------------------------------------------------------------- geometry helpers
def sarea(p):
    n = len(p)
    return sum(p[i][0] * p[(i + 1) % n][1] - p[(i + 1) % n][0] * p[i][1] for i in range(n)) / 2.0


def centroid(p):
    a = sarea(p)
    if abs(a) < 1e-12:
        return (sum(q[0] for q in p) / len(p), sum(q[1] for q in p) / len(p))
    cx = cy = 0.0
    n = len(p)
    for i in range(n):
        x1, y1 = p[i]
        x2, y2 = p[(i + 1) % n]
        cr = x1 * y2 - x2 * y1
        cx += (x1 + x2) * cr
        cy += (y1 + y2) * cr
    return (cx / (6 * a), cy / (6 * a))


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


def open_ring(p):
    """strip the closing duplicate and merge consecutive coincident vertices; returns (ring, merged count)"""
    q, merged = [], 0
    for v in p:
        if q and v == q[-1]:
            merged += 1
            continue
        q.append(v)
    while len(q) > 1 and q[0] == q[-1]:
        q.pop()
    return q, merged


def m(p):
    return [p[0] / 100.0, p[1] / 100.0]


def closed_m(ring):
    return [m(v) for v in ring] + [m(ring[0])]


# ---------------------------------------------------------------- provenance from the network index
def session_rows(stamp):
    p = os.path.join(ROOT, 'captures', 'ftg', stamp, 'session', 'network', 'index.jsonl')
    return [json.loads(l) for l in open(p)]


def provenance(stamp):
    rows = session_rows(stamp)
    lay = [r for r in rows if r.get('intercepted') and '/layout' in r.get('url', '') and str(r.get('bodyFile', '')).endswith('.bin')]
    if len(lay) != 1:
        raise SystemExit('%s: %d intercepted layout bodies (want 1)' % (stamp, len(lay)))
    put_stamp = PUT_SESSION.get(stamp, stamp)
    prow = session_rows(put_stamp)
    put = [r for r in prow if r.get('method') == 'PUT' and r.get('postData') and '/settlements' in r.get('url', '')]
    if len(put) != 1:
        raise SystemExit('%s: %d PUT rows with a body (want 1)' % (put_stamp, len(put)))
    put = put[0]
    opt = [r for r in prow if r.get('method') == 'OPTIONS' and '/layout' in r.get('url', '') and r.get('ts', 0) > put['ts']]
    get = [r for r in prow if r.get('method') == 'GET' and '/layout' in r.get('url', '') and not r.get('intercepted')
           and r.get('ts', 0) > put['ts']]
    body = put['postData'].encode('utf-8')
    req = json.loads(put['postData'])
    rhash = hashlib.sha256(body).hexdigest()[:12]
    date_hdr = (put.get('respHeaders') or {}).get('date')
    sdate = datetime.datetime.strptime(date_hdr, '%a, %d %b %Y %H:%M:%S GMT').strftime('%Y-%m-%d')
    return dict(payload=os.path.join(ROOT, 'captures', 'ftg', stamp, 'session', 'network', 'bodies', lay[0]['bodyFile']),
                putSession=put_stamp, request=req, requestBytes=len(body), requestHash=rhash, serverDate=sdate,
                referenceBuild='ftg:%s+%s' % (sdate, rhash),
                putToOptionsS=round(min(r['ts'] for r in opt) - put['ts'], 3) if opt else None,
                putToGetS=round(min(r['ts'] for r in get) - put['ts'], 3) if get else None)


def lifestyle(req):
    """the request's six lifestyle weights in request order (lowest first) and each residence building type's tier set"""
    dist = req['lifestyleDistribution']
    order = list(dist.keys())
    weights = [dist[k] for k in order]
    tiers_of = collections.defaultdict(set)
    for entry in req['buildingsParameters']['dependencyGraph']['RESIDENTIAL']['coreDistribution']:
        tiers = {order.index(t) for t in entry['applicableLifestyles']}
        for item in entry['distribution']:
            if item['proportion'] > 0:
                tiers_of[item['specificBuildingType']] |= tiers
    return order, weights, tiers_of


def tier_pair(label, cat, tiers_of):
    """0 not a residence; 1, 2, 3 the tier pairs (1-2, 3-4, 5-6); -1 a residence whose type spans pairs or is unknown"""
    if cat != RESIDENCE_CATEGORY:
        return 0
    t = tiers_of.get(label.strip().upper().replace(' ', '_'))
    if not t:
        return -1
    pairs = {i // 2 + 1 for i in t}
    return pairs.pop() if len(pairs) == 1 else -1


# ---------------------------------------------------------------- chains
def chains(edge_list, key_of):
    """maximal chains of edges with one key through nodes of degree 2 in the graph of edge_list.
    edge_list: [(a, b, ...)], key_of(i) -> chain key. Returns [(key, [node ids], closed)] in a deterministic order."""
    inc = collections.defaultdict(list)
    for i, e in enumerate(edge_list):
        inc[e[0]].append(i)
        inc[e[1]].append(i)
    used = [False] * len(edge_list)

    def step(node, came):
        if len(inc[node]) != 2:
            return None
        j = inc[node][0] if inc[node][1] == came else inc[node][1]
        if j == came or used[j] or key_of(j) != key_of(came):
            return None
        return j

    out = []
    for i, e in enumerate(edge_list):
        if used[i]:
            continue
        used[i] = True
        k = key_of(i)
        seq = [e[0], e[1]]
        closed = False
        # forward from e[1]
        cur_e, node = i, e[1]
        while True:
            j = step(node, cur_e)
            if j is None:
                break
            used[j] = True
            a, b = edge_list[j][0], edge_list[j][1]
            nxt = b if a == node else a
            seq.append(nxt)
            cur_e, node = j, nxt
            if node == seq[0]:
                closed = True
                break
        if not closed:
            cur_e, node = i, e[0]
            back = []
            while True:
                j = step(node, cur_e)
                if j is None:
                    break
                used[j] = True
                a, b = edge_list[j][0], edge_list[j][1]
                nxt = b if a == node else a
                back.append(nxt)
                cur_e, node = j, nxt
            seq = list(reversed(back)) + seq
        out.append((k, seq, closed))
    return out


# ---------------------------------------------------------------- the adapter
def adapt(stamp):
    prov = provenance(stamp)
    D = decode(prov['payload'])
    req = prov['request']
    N = D['nodes']
    dropped = collections.Counter()
    # districts (outer ring of each layout; holes kept as further rings)
    district_polys = []
    for dd in D['districts']:
        for rings in dd['rings']:
            rr = []
            for r in rings:
                q, mg = open_ring(r)
                dropped['mergedVertices'] += mg
                if len(q) >= 3 and abs(sarea(q)) > 0:
                    rr.append(q)
                else:
                    dropped['zeroAreaPolygons'] += 1
            if rr:
                district_polys.append(rr)
    outer_rings = [rr[0] for rr in district_polys]

    def in_ring(pt):
        return any(inside(pt, r) for r in outer_rings)

    # ways
    way_edges = []
    for (eid, a, b, t) in D['edges']:
        if t not in WAY_TYPES:
            continue
        if N[a] == N[b]:
            dropped['zeroLengthEdges'] += 1
            continue
        if t in ARTERIAL_TYPES:
            cls = 'arterial'
        elif t == ROAD_TYPE:
            mid = ((N[a][0] + N[b][0]) / 2.0, (N[a][1] + N[b][1]) / 2.0)
            cls = 'street' if in_ring(mid) else 'lane'
        else:
            cls = 'track'
        way_edges.append((a, b, cls, t))
    way_chains = chains(way_edges, lambda i: (way_edges[i][2], way_edges[i][3]))
    wall_edges = [(a, b, t) for (eid, a, b, t) in D['edges'] if t in WALL_TYPES and N[a] != N[b]]
    wall_chains = chains(wall_edges, lambda i: wall_edges[i][2])
    pier_edges = [(a, b, t) for (eid, a, b, t) in D['edges'] if t in PIER_TYPES and N[a] != N[b]]
    pier_chains = chains(pier_edges, lambda i: pier_edges[i][2])

    feats, way_types = [], []
    for k, ((cls, t), seq, closed) in enumerate(way_chains):
        feats.append({'kind': 'way', 'id': 'w%d' % k, 'geometry': {'type': 'LineString', 'coordinates': [m(N[n]) for n in seq]},
                      'props': {'class': cls}})
        way_types.append(t)
    for k, (t, seq, closed) in enumerate(wall_chains):
        feats.append({'kind': 'wall', 'id': 'c%d' % k, 'geometry': {'type': 'LineString', 'coordinates': [m(N[n]) for n in seq]},
                      'props': {'class': 'curtain'}})
    for k, tw in enumerate(D['towers']):
        feats.append({'kind': 'tower', 'id': 't%d' % k, 'geometry': {'type': 'Point', 'coordinates': m(tw['pos'])}, 'props': {}})
    # buildings
    order, weights, tiers_of = lifestyle(req)
    cats, pairs = [], []
    area_sum, cx, cy = 0.0, 0.0, 0.0
    nb = 0
    for bd in D['buildings']:
        q, mg = open_ring(bd['poly'])
        dropped['mergedVertices'] += mg
        if len(q) < 3 or abs(sarea(q)) == 0:
            dropped['zeroAreaPolygons'] += 1
            continue
        feats.append({'kind': 'building', 'id': 'b%d' % nb, 'geometry': {'type': 'Polygon', 'coordinates': [closed_m(q)]},
                      'props': {'class': 'unknown'}})
        nb += 1
        cats.append(bd['cat'])
        pairs.append(tier_pair(bd['label'], bd['cat'], tiers_of))
        a = abs(sarea(q))
        c = centroid(q)
        area_sum += a
        cx += c[0] * a
        cy += c[1] * a
    centre = [cx / area_sum / 100.0, cy / area_sum / 100.0]
    # water
    half = max(max(abs(x), abs(y)) for x, y in D['border']) if D['border'] else None
    water_classes = []
    for k, (wid, P) in enumerate(D['water']):
        q, mg = open_ring(P)
        dropped['mergedVertices'] += mg
        if len(q) < 3 or abs(sarea(q)) == 0:
            dropped['zeroAreaPolygons'] += 1
            continue
        per = sum(math.dist(q[i], q[(i + 1) % len(q)]) for i in range(len(q)))
        ribbon = 2 * abs(sarea(q)) / per / 100.0
        on_border = half is not None and any(abs(abs(x) - half) <= 100 or abs(abs(y) - half) <= 100 for x, y in q)
        cls = ('sea' if ribbon >= SEA_MIN_RIBBON_M else 'river') if on_border else 'lake'
        water_classes.append(cls)
        feats.append({'kind': 'water', 'id': 'h%d' % k, 'geometry': {'type': 'Polygon', 'coordinates': [closed_m(q)]},
                      'props': {'class': cls}})
    for k, (t, seq, closed) in enumerate(pier_chains):
        feats.append({'kind': 'pier', 'id': 'p%d' % k, 'geometry': {'type': 'LineString', 'coordinates': [m(N[n]) for n in seq]},
                      'props': {}})
    for k, p in enumerate(D['trees']):
        feats.append({'kind': 'tree', 'id': 'r%d' % k, 'geometry': {'type': 'Point', 'coordinates': m(p)}, 'props': {}})
    nf = 0
    for tex, polys in D['textures']:
        if tex not in FIELD_TEXTURES:
            continue
        for P in polys:
            q, mg = open_ring(P)
            dropped['mergedVertices'] += mg
            if len(q) < 3 or abs(sarea(q)) == 0:
                dropped['zeroAreaPolygons'] += 1
                continue
            feats.append({'kind': 'field', 'id': 'f%d' % nf, 'geometry': {'type': 'Polygon', 'coordinates': [closed_m(q)]},
                          'props': {}})
            nf += 1
    for k, rr in enumerate(district_polys):
        feats.append({'kind': 'district', 'id': 'd%d' % k, 'geometry': {'type': 'Polygon', 'coordinates': [closed_m(r) for r in rr]},
                      'props': {}})

    lp = req.get('landscapeParameters', {})
    coastal = lp.get('coastType') is not None
    rivers = bool(lp.get('rivers'))
    water = 'coast+river' if coastal and rivers else 'coast' if coastal else 'river' if rivers else 'none'
    sizes = {s['size']: s for s in json.load(open(PRESETS))['sizes']}
    size = req.get('size')
    stages = (req.get('layoutParameters') or {}).get('stages') or []
    options = {'coastal': coastal, 'rivers': rivers, 'mapWidthM': sizes[size]['width'] if size in sizes else -1}
    for i, st in enumerate(stages):
        if isinstance(st, dict) and isinstance(st.get('roadLength'), (int, float)):
            options['stage%dRoadLengthM' % (i + 1)] = st['roadLength']
    type_counts = collections.Counter(t for (_, _, _, t) in D['edges'])
    census = {
        'payloadBytes': D['bytes'], 'topLevelFields': D['top'], 'edges': len(D['edges']), 'nodes': len(N),
        'edgesByType': {str(t): n for t, n in sorted(type_counts.items())}, 'buildings': len(D['buildings']),
        'towers': len(D['towers']), 'waterBodies': len(D['water']), 'districts': len(D['districts']),
        'trees': len(D['trees']), 'decorationsBySubfield': {str(k): v for k, v in sorted(D['decorCounts'].items())},
        'textureGroups': [[t, len(p)] for t, p in D['textures']], 'borderHalfWidthM': half / 100.0 if half else None,
        'ways': len(way_chains), 'wayEdges': len(way_edges), 'wallStretches': len(wall_chains), 'wallEdges': len(wall_edges),
        'piers': len(pier_chains), 'fields': nf, 'waterClasses': water_classes,
        'droppedEdgeTypes': {str(t): type_counts.get(t, 0) for t in sorted(DROPPED_TYPES)},
        'dropped': dict(sorted(dropped.items())),
    }
    mi = {
        'schema': SCHEMA,
        'header': {'source': 'FTG', 'build': prov['referenceBuild'], 'scale': 'metric', 'centre': centre,
                   'population': sizes[size]['roughPopulation'] if size in sizes else None, 'water': water,
                   'options': options},
        'features': feats,
        'research': {
            'script': SCRIPT, 'capture': stamp, 'putSession': prov['putSession'],
            'payload': os.path.relpath(prov['payload'], ROOT), 'ftgSize': size, 'populationSource': 'nominal',
            'requestBytes': prov['requestBytes'], 'requestHash': prov['requestHash'], 'serverDate': prov['serverDate'],
            'serverTimeS': {'putToLayoutGet': prov['putToGetS'], 'putToLayoutOptions': prov['putToOptionsS']},
            'units': 'metres (payload centimetres / 100)',
            'note': 'research-side sidecar; read by no metric, dropped by the product reader; never crosses',
            'wayRawType': way_types,
            'buildingCategory': cats,
            'buildingTierPair': pairs,
            'lifestyleWeights': weights,
            'lifestyleOrder': 'request order, lowest first (the residential pools step up in the same order)',
            'census': census,
        },
    }
    return mi, D, prov


def build_dir(build):
    return build.replace(':', '-').replace('+', '_')


def out_path(mi, stamp, out_root=OUT_ROOT):
    return os.path.join(out_root, build_dir(mi['header']['build']), '%s.metric.geojson.gz' % stamp)


def write(mi, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    raw = json.dumps(mi, separators=(',', ':'), sort_keys=False).encode()
    with open(path, 'wb') as fh:
        with gzip.GzipFile(filename='', mode='wb', fileobj=fh, mtime=0) as gz:
            gz.write(raw)
    return len(raw)


def read(path):
    with gzip.open(path, 'rb') as fh:
        return json.loads(fh.read().decode())


def main():
    args = sys.argv[1:]
    out = OUT_ROOT
    if '--out' in args:
        i = args.index('--out')
        out = args[i + 1]
        del args[i:i + 2]
    for stamp in (args or CAPS_DEFAULT):
        mi, D, prov = adapt(stamp)
        path = out_path(mi, stamp, out)
        nraw = write(mi, path)
        c = mi['research']['census']
        print('%s %s: edges %d nodes %d buildings %d towers %d water %s trees %d -> ways %d (edges %d) walls %d piers %d '
              'fields %d districts %d; dropped %s -> %s (%d B raw, %d B gz)' % (
                  stamp, mi['header']['build'], c['edges'], c['nodes'], c['buildings'], c['towers'], c['waterClasses'],
                  c['trees'], c['ways'], c['wayEdges'], c['wallStretches'], c['piers'], c['fields'], c['districts'],
                  c['dropped'], os.path.relpath(path, ROOT), nraw, os.path.getsize(path)))


if __name__ == '__main__':
    main()
