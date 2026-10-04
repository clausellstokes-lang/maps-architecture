#!/usr/bin/env python3
"""research/baselines/measure_ftg_faces.py -- M-1 work item W-06: FTG face recovery (CONFIDENCE section 6 #5; D1).

Lane m1/W-06 (pass 1) and m1/W-06-final (the last pass, after FTG programme 2's close; E06 section 13)
(docs/calibration/M-1-plan.md section 2, row W-06; record docs/calibration/E06-ftg-faces.md). Research side
only; our own code, standard library. Lineage: research/ftg-capture/analyse_layout.py (the stats script CONFIDENCE #5
asks to extend: its hull and minimum-area rectangle helpers are re-written here) and the two challenge probes
(research/ftg-capture/challenge-under/{tower_ring_probe,wall_edge_probe}.py, reproduced as the twin). analyse_layout.py
decodes coordinates as unsigned varints, which doubles every length (_critic-ftg.md F1), so this tool reads the payload
only through W-05's landed adapter (adapters/ftg.py: zig-zag centimetres) and measures on its MeasureInput.

What it measures, per payload (the CITY fixtures, labelled; then every plan slot bound when the pass starts):
  ftg.ringBlock  inside each district ring, the planar face walk over the ring outline and the ways inside it (the
                 MeasureInput's way features: FTG's road types 0, 1, 2, 10, 13; never the invisible, fence, pier or
                 water-outline edges, which the adapter drops). Every face's area (m2) is one value; holes left by a
                 way network that does not touch the ring are subtracted from the face that holds it. The registry's
                 24 log bins (metrics.m-1.json) are filled per payload and pooled per FTG size in plan order.
  land share     the plotShare bound (ARCHITECTURE section 4.5): by exact scanline integration (0.5 m rows), the share
                 of each ring's land (ring less water) outside every drawn way and wall band -- band widths by edge type
                 from research/findings/code-ftg-client.md section 2.5.2 (main road 5 m, road 2.5 m, small road, dirt
                 road and trail 1.25 m, stone wall 6 m), round-joined, so a band is the set within half its width of the
                 centreline. Beside it: the same less the paved patches (texture 8, squares), and the footprint cover
                 (a floor: plots hold the footprints)
  dividing roads the cut between two sibling faces: a way chain whose two ends are stems of T junctions (the two other
                 arms within 20 degrees of straight) with a bounded face on each side; the parent is the two faces
                 merged; the cut's angle to the parent's OBB long axis, its offset from the middle of that axis, its
                 angle to the parent's longest straight side (corners at turns of 20 degrees or more), whether it ends
                 on that side, and the area balance of the two faces
  towers         every wall vertex (the MeasureInput's curtain chains) against the towers: towers on wall vertices,
                 the tower share by turn angle, by chain end and by way arms meeting the vertex; the spacing along the
                 wall; the untowered runs; a greedy spacing rule's agreement (a description, not a claim of FTG's rule)
  markets        the market-category footprints (category 14) per payload: count, area, ring, face, the distance
                 between them and whether they share or neighbour a face (R-23: a note, no row)

Checks (the row's checker column; --check re-runs them, --red plants one fault per check):
  (1) faces close: every half-edge walk closes, each ring subgraph is planar (no crossing, no contact off a node, no
      way crossing the ring outline), one outer cycle per connected component, and Euler V - E + F = C holds per ring
  (2) the face areas sum to the ring area within 1 % (exact shoelace on the district polygon, independent of the walk)
  (3) the last pass postdates the FTG programme's close (R-47): programme 2 has no open slot in plan.json, or E02
      records its stop; and this pass read through the last decided slot
  plus (4) the twin: the challenge probes' tower numbers and the critic's four ring areas reproduce on the fixtures;
  (5) every sample's captures equal the plan's slots in order and the 2026-09-25 payload (R-04) is in no sample;
  (6) the scanline integrates each ring's area to within 0.1 % of its shoelace area.
A pass reads the slots decided (bound or failed) when it starts, through slot K (plan.py binds in slot order); a slot
decided later belongs to the next pass. No row is formed here (R-47 (a)): W-15 forms the descriptive row.

Usage (project root):
  python3 research/baselines/measure_ftg_faces.py [--through K] [--json OUT] [--md OUT]   measure and write (default
      docs/calibration/E06-ftg-faces.json; --md writes E06's tables); exit 1 unless checks (1), (2), (4)-(6) pass
      (check (3) is reported)
  python3 research/baselines/measure_ftg_faces.py --check [--json IN]   re-measure the pass recorded in IN (its slots)
      and require the fresh document to equal IN byte for byte, then re-run the checks
  python3 research/baselines/measure_ftg_faces.py --red                 plant one fault per check; each must fail
"""
import collections
import json
import math
import os
import random
import sys
import tempfile

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(HERE, 'adapters'))
sys.path.insert(0, HERE)
import ftg as A  # noqa: E402
import measure_ftg_slots as S  # noqa: E402

SCRIPT = 'research:baselines/measure_ftg_faces.py'
LANE = 'm1/W-06-final'      # the last pass (E06 section 13); pass 1 ran under m1/W-06
EARLIER_PASS = {'lane': 'm1/W-06', 'throughSlot': 11, 'jsonSha256': '7726227ba90bdbb65ae10c2472f96d32764b3095a571836d3afcc8fe69a68a58',
                'record': 'E06 sections 1-12 (pass 1, kept as written)'}
JSON_DEFAULT = os.path.join(ROOT, 'docs', 'calibration', 'E06-ftg-faces.json')
REGISTRY = os.path.join(HERE, 'metrics.m-1.json')
E02_JSON = os.path.join(ROOT, 'docs', 'calibration', 'E02-ftg-captures.json')
FIXTURES = [('2026-09-21T05-23-58', 'capture/FTG/CITY/coast+river/0', 'the recorded CITY family, usable (R-02)'),
            ('2026-09-25T10-13-51', 'capture/FTG/CITY/coast+river/1',
             'the recorded CITY family, failed: setting -- a non-default setting, a fixture only, in no sample (R-04)')]
EXCLUDED_CAPTURE = '2026-09-25T10-13-51'
# drawn band half widths (m) by MeasureInput class: code-ftg-client.md section 2.5.2 (numbers only)
HALF_WIDTH_M = {'arterial': 2.5, 'street': 1.25, 'lane': 1.25, 'track': 0.625}
WALL_HALF_WIDTH_M = 3.0
ROW_CM = 50                 # scanline row spacing
STEM_DEG = 20.0             # a T stem: the two through arms within this of straight
CORNER_DEG = 20.0           # a corner of a parent face: a turn of at least this
MARKET_CATEGORY = 14        # field 8.4's market category (code-ftg-client.md section 2.1's enum order)
PAVED_TEXTURE = 8           # field 9's road paving texture (code-ftg-client.md section 0 item 3)
AREA_TOL = 0.01             # check (2)
TILE_POINTS = 80            # check (1): seeded points per ring, each in exactly one face
SCAN_TOL = 0.001            # check (6)
# the twin's recorded values (research/ftg-capture/challenge-under/*.out.txt; _critic-ftg.md section 4 row 16)
TWIN = {
    '2026-09-21T05-23-58': {'towers': 17, 'onWall': 17, 'wallNodes': 26, 'untowered': 9,
                            'spacing': {'n': 16, 'min': 18.9, 'med': 39.3, 'max': 72.8},
                            'ringHa': [9.6, 8.0, 10.1, 4.9]},
    '2026-09-25T10-13-51': {'towers': 29, 'onWall': 29, 'wallNodes': 46, 'untowered': 17,
                            'spacing': {'n': 27, 'min': 4.4, 'med': 35.6, 'max': 59.7}},
}


# ---------------------------------------------------------------- small helpers
def q7(v, p):
    s = sorted(v)
    if not s:
        return None
    h = (len(s) - 1) * p
    lo = int(math.floor(h))
    hi = min(lo + 1, len(s) - 1)
    return s[lo] + (h - lo) * (s[hi] - s[lo])


def r(x, nd=3):
    return None if x is None else round(x, nd)


def summ(v, nd=2):
    if not v:
        return {'n': 0}
    return {'n': len(v), 'p10': r(q7(v, .1), nd), 'p50': r(q7(v, .5), nd), 'p90': r(q7(v, .9), nd),
            'min': r(min(v), nd), 'max': r(max(v), nd)}


def cmkey(c):
    return (int(round(c[0] * 100)), int(round(c[1] * 100)))


def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])


def area2(P):
    n = len(P)
    return sum(P[i][0] * P[(i + 1) % n][1] - P[(i + 1) % n][0] * P[i][1] for i in range(n))


def turn_deg(a, v, b):
    h1 = math.atan2(v[1] - a[1], v[0] - a[0])
    h2 = math.atan2(b[1] - v[1], b[0] - v[0])
    d = math.degrees(h2 - h1)
    while d > 180:
        d -= 360
    while d < -180:
        d += 360
    return abs(d)


def fold90(dx1, dy1, dx2, dy2):
    """the angle between two undirected lines, 0..90 degrees"""
    a = abs(math.degrees(math.atan2(dy1, dx1) - math.atan2(dy2, dx2))) % 180
    return min(a, 180 - a)


def hull(P):
    P = sorted(set(P))
    if len(P) < 3:
        return P
    lo, up = [], []
    for p in P:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], p) <= 0:
            lo.pop()
        lo.append(p)
    for p in reversed(P):
        while len(up) >= 2 and cross(up[-2], up[-1], p) <= 0:
            up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]


def obb(P):
    """minimum-area rectangle over the hull: (long, short, ux, uy, umin, umax) with u the long axis (cm units)"""
    H = hull(P)
    best = None
    for i in range(len(H)):
        a, b = H[i], H[(i + 1) % len(H)]
        L = math.hypot(b[0] - a[0], b[1] - a[1])
        if L == 0:
            continue
        ux, uy = (b[0] - a[0]) / L, (b[1] - a[1]) / L
        us = [q[0] * ux + q[1] * uy for q in H]
        vs = [-q[0] * uy + q[1] * ux for q in H]
        w, h = max(us) - min(us), max(vs) - min(vs)
        if best is None or w * h < best[0]:
            if w >= h:
                best = (w * h, w, h, ux, uy, min(us), max(us))
            else:
                best = (w * h, h, w, -uy, ux, min(vs), max(vs))
    return best[1:] if best else None


# ---------------------------------------------------------------- point against ring (exact, doubled coordinates)
def on_seg2(p, a, b):
    if cross(a, b, p) != 0:
        return False
    return min(a[0], b[0]) <= p[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= p[1] <= max(a[1], b[1])


def inside_f(p, P):
    x, y = p
    c = False
    n = len(P)
    for i in range(n):
        x1, y1 = P[i]
        x2, y2 = P[(i + 1) % n]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            c = not c
    return c


class Ring:
    def __init__(self, ring, holes):
        self.R = ring
        self.holes = holes
        self.loops = [ring] + holes
        self.R2 = [[(2 * x, 2 * y) for x, y in L] for L in self.loops]
        xs = [p[0] for p in ring]
        ys = [p[1] for p in ring]
        self.bbox = (min(xs), min(ys), max(xs), max(ys))
        self.vset = set(p for L in self.loops for p in L)

    def state2(self, p2):
        """'on' the outline, 'in' or 'out'; p2 in doubled coordinates"""
        for L in self.R2:
            n = len(L)
            for i in range(n):
                if on_seg2(p2, L[i], L[(i + 1) % n]):
                    return 'on'
        if not inside_f(p2, self.R2[0]):
            return 'out'
        for H in self.R2[1:]:
            if inside_f(p2, H):
                return 'out'
        return 'in'


# ---------------------------------------------------------------- the MeasureInput as a graph
def way_edges(mi):
    """{(p, q) sorted cm keys: class} and the duplicate count"""
    E, dup = {}, 0
    for f in mi['features']:
        if f['kind'] != 'way':
            continue
        cls = f['props']['class']
        P = [cmkey(c) for c in f['geometry']['coordinates']]
        for a, b in zip(P, P[1:]):
            if a == b:
                continue
            k = (a, b) if a < b else (b, a)
            if k in E:
                dup += 1
            E.setdefault(k, cls)
    return E, dup


def wall_chains(mi):
    out = []
    for f in mi['features']:
        if f['kind'] == 'wall':
            out.append([cmkey(c) for c in f['geometry']['coordinates']])
    return out


def districts(mi):
    out = []
    for f in mi['features']:
        if f['kind'] != 'district':
            continue
        loops = []
        for L in f['geometry']['coordinates']:
            P = [cmkey(c) for c in L]
            if len(P) > 1 and P[0] == P[-1]:
                P = P[:-1]
            loops.append(P)
        R = loops[0]
        if area2(R) < 0:
            R = R[::-1]
        holes = [H if area2(H) < 0 else H[::-1] for H in loops[1:]]
        out.append((f['id'], R, holes))
    return out


# ---------------------------------------------------------------- planarity on a ring subgraph
def crossings(edges, cell=4000):
    grid = collections.defaultdict(list)
    for i, (a, b) in enumerate(edges):
        for cx in range(min(a[0], b[0]) // cell, max(a[0], b[0]) // cell + 1):
            for cy in range(min(a[1], b[1]) // cell, max(a[1], b[1]) // cell + 1):
                grid[(cx, cy)].append(i)
    bad = set()
    for lst in grid.values():
        for x in range(len(lst)):
            for y in range(x + 1, len(lst)):
                i, j = lst[x], lst[y]
                if (i, j) in bad:
                    continue
                a, b = edges[i]
                c, d = edges[j]
                shared = {a, b} & {c, d}
                d1, d2, d3, d4 = cross(a, b, c), cross(a, b, d), cross(c, d, a), cross(c, d, b)
                if ((d1 > 0 > d2) or (d1 < 0 < d2)) and ((d3 > 0 > d4) or (d3 < 0 < d4)):
                    bad.add((i, j))
                    continue
                # contact off a node: an endpoint of one on the interior of the other, or a collinear overlap
                for p, (s, t) in ((c, (a, b)), (d, (a, b)), (a, (c, d)), (b, (c, d))):
                    if p in shared or p in (s, t):
                        continue
                    if on_seg2(p, s, t):
                        bad.add((i, j))
                        break
    return sorted(bad)


# ---------------------------------------------------------------- the face walk inside one ring
def planarize(R0, W, near, cell=4000):
    """FTG's graph is not planar at its bridges: a main road crosses the water outline, and a street along the bank,
    with no node (E06 W06-D2). Every proper crossing among the ways near the ring and the ring outline is made a node:
    the crossing point, rounded to the centimetre, splits both edges (and becomes an outline vertex when one of them is
    the outline). Returns the outline with its inserted vertices, the local way edges, and the counts (way x outline,
    way x way)."""
    n = len(R0)
    segs = [(k, 'way') for k in near] + [(i, 'outline') for i in range(n)]

    def ends(sg):
        return sg[0] if sg[1] == 'way' else (R0[sg[0]], R0[(sg[0] + 1) % n])
    grid = collections.defaultdict(list)
    for z, sg in enumerate(segs):
        a, b = ends(sg)
        for cx in range(min(a[0], b[0]) // cell, max(a[0], b[0]) // cell + 1):
            for cy in range(min(a[1], b[1]) // cell, max(a[1], b[1]) // cell + 1):
                grid[(cx, cy)].append(z)
    pts = collections.defaultdict(list)
    seen = set()
    counts = collections.Counter()
    for lst in grid.values():
        for x in range(len(lst)):
            for y in range(x + 1, len(lst)):
                i, j = lst[x], lst[y]
                if (i, j) in seen or (segs[i][1] == 'outline' and segs[j][1] == 'outline'):
                    continue
                seen.add((i, j))
                a, b = ends(segs[i])
                c, d = ends(segs[j])
                d1, d2, d3, d4 = cross(c, d, a), cross(c, d, b), cross(a, b, c), cross(a, b, d)
                if ((d1 > 0 > d2) or (d1 < 0 < d2)) and ((d3 > 0 > d4) or (d3 < 0 < d4)):
                    t = d1 / (d1 - d2)
                    p = (int(round(a[0] + t * (b[0] - a[0]))), int(round(a[1] + t * (b[1] - a[1]))))
                    pts[i].append(p)
                    pts[j].append(p)
                    counts['way x ' + ('outline' if 'outline' in (segs[i][1], segs[j][1]) else 'way')] += 1
    Wl = {k: W[k] for k in near}
    R1 = []
    for z, sg in enumerate(segs):
        a, b = ends(sg)
        dx, dy = b[0] - a[0], b[1] - a[1]
        mids = sorted(set(q for q in pts.get(z, []) if q != a and q != b),
                      key=lambda q: (q[0] - a[0]) * dx + (q[1] - a[1]) * dy)
        if sg[1] == 'outline':
            R1 += [a] + mids
        elif mids:
            cls = Wl.pop(sg[0])
            seq = [a] + mids + [b]
            for u, v in zip(seq, seq[1:]):
                if u != v:
                    Wl[(u, v) if u < v else (v, u)] = cls
    return R1, Wl, counts


def ring_faces(R, W, plant=None):
    """R: Ring; W: {edge key: class}. Returns the faces and the checks' numbers for this ring."""
    x0, y0, x1, y1 = R.bbox
    near = [k for k in W if not (max(k[0][0], k[1][0]) < x0 or min(k[0][0], k[1][0]) > x1 or
                                 max(k[0][1], k[1][1]) < y0 or min(k[0][1], k[1][1]) > y1)]
    ring_cm2 = (area2(R.R) + sum(area2(H) for H in R.holes)) / 2.0     # the district polygon (holes clockwise)
    R1, W, pcounts = planarize(R.R, W, near)
    if len(R1) != len(R.R):
        R = Ring(R1, R.holes)
    near = sorted(W)
    st = {}

    def state(p):
        if p not in st:
            st[p] = R.state2((2 * p[0], 2 * p[1]))
        return st[p]
    inside_edges, outline_way, cross_out = [], [], []
    for k in near:
        a, b = k
        sa, sb = state(a), state(b)
        if 'out' in (sa, sb):
            if 'in' in (sa, sb):
                cross_out.append(k)
            continue
        if sa == 'on' and sb == 'on':
            sm = R.state2((a[0] + b[0], a[1] + b[1]))
            if sm == 'in':
                inside_edges.append(k)
            elif sm == 'on':
                outline_way.append(k)
            continue
        inside_edges.append(k)
    # split the outline at every way node lying on a segment's interior
    on_nodes = set(p for k in inside_edges + outline_way for p in k if st.get(p) == 'on') - R.vset
    pieces = []
    split = 0
    for L in R.loops:
        n = len(L)
        for i in range(n):
            a, b = L[i], L[(i + 1) % n]
            mids = [p for p in on_nodes if p != a and p != b and on_seg2(p, a, b)]
            if mids:
                split += len(mids)
                dx, dy = b[0] - a[0], b[1] - a[1]
                mids.sort(key=lambda p: (p[0] - a[0]) * dx + (p[1] - a[1]) * dy)
            seq = [a] + mids + [b]
            for u, v in zip(seq, seq[1:]):
                pieces.append((u, v) if u < v else (v, u))
    E = {}
    for k in pieces:
        E[k] = W.get(k, 'outline')
    for k in inside_edges:
        E.setdefault(k, W[k])
    if plant == 'chord':                 # red: one chord across the ring between two far outline vertices, no node
        a, b = R.R[0], R.R[len(R.R) // 2]
        E[(a, b) if a < b else (b, a)] = 'street'
    if plant == 'drop':                  # red: one outline piece removed
        del E[pieces[0]]
    keys = sorted(E)
    bad = crossings(keys)
    adj = collections.defaultdict(list)
    for a, b in keys:
        adj[a].append(b)
        adj[b].append(a)
    for v in adj:
        adj[v].sort(key=lambda w: math.atan2(w[1] - v[1], w[0] - v[0]))
    idx = {(v, w): i for v in adj for i, w in enumerate(adj[v])}
    seen, cycles, open_walks = set(), [], 0
    cap = 2 * len(keys) + 2
    for v in sorted(adj):
        for w in adj[v]:
            if (v, w) in seen:
                continue
            cyc, h, steps = [], (v, w), 0
            while h not in seen:
                seen.add(h)
                cyc.append(h[0])
                u, x = h
                L = adj[x]
                h = (x, L[(idx[(x, u)] - 1) % len(L)])
                steps += 1
                if steps > cap:
                    break
            if h != (v, w):
                open_walks += 1
            cycles.append(cyc)
    # components
    parent = {v: v for v in adj}

    def find(v):
        while parent[v] != v:
            parent[v] = parent[parent[v]]
            v = parent[v]
        return v
    for a, b in keys:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
    comps = collections.defaultdict(list)
    for v in adj:
        comps[find(v)].append(v)
    C = len(comps)
    A2 = [area2(c) for c in cycles]
    pos = [i for i, a in enumerate(A2) if a > 0]
    nonpos = [i for i, a in enumerate(A2) if a <= 0]
    comp_of_cycle = [find(c[0]) for c in cycles]
    ring_comp = find(R.R[0]) if R.R[0] in parent else None
    # holes: a component that does not touch the outline sits inside the smallest bounded face of another component
    hole_of = collections.defaultdict(int)
    hole_cycles = collections.defaultdict(list)
    floating = 0
    for root, vs in comps.items():
        if root == ring_comp:
            continue
        outer = [i for i in nonpos if comp_of_cycle[i] == root]
        if not outer:
            continue
        floating += 1
        probe = min(vs)
        best = None
        for i in pos:
            if comp_of_cycle[i] == root:
                continue
            if inside_f(probe, cycles[i]) and (best is None or A2[i] < A2[best]):
                best = i
        if best is not None:
            hole_of[best] += -A2[outer[0]]
            hole_cycles[best].append(outer[0])
    net = {i: (A2[i] - hole_of.get(i, 0)) / 2.0 for i in pos}          # cm2
    outer_ring = [A2[i] for i in nonpos if comp_of_cycle[i] == ring_comp]
    euler = len(adj) - len(keys) + len(pos) == C
    face_of = {}
    for i, c in enumerate(cycles):
        for j in range(len(c)):
            face_of[(c[j], c[(j + 1) % len(c)])] = i
    return dict(E=E, keys=keys, adj=adj, cycles=cycles, A2=A2, pos=pos, net=net, face_of=face_of, ring=R,
                holes=hole_cycles,
                checks=dict(V=len(adj), Ecount=len(keys), F=len(pos), C=C, euler=euler, outerCycles=len(nonpos),
                            openWalks=open_walks, crossings=len(bad), outlineCrossings=len(cross_out), planarized=dict(sorted(pcounts.items())),
                            outerIsRing=bool(outer_ring) and outer_ring[0] == -area2(R.R),
                            splitNodes=split, floating=floating,
                            wayEdgesInside=len(inside_edges), wayEdgesOnOutline=len(outline_way),
                            ringAreaM2=ring_cm2 / 1e4, faceSumM2=sum(net.values()) / 1e4))


# ---------------------------------------------------------------- dividing roads
def cuts(F, R):
    adj, face_of, cycles, net, E = F['adj'], F['face_of'], F['cycles'], F['net'], F['E']
    deg = {v: len(adj[v]) for v in adj}
    out, checked, rejected = [], 0, collections.Counter()
    done = set()
    for s in sorted(adj):
        if deg[s] == 2:
            continue
        for n1 in adj[s]:
            k0 = (s, n1) if s < n1 else (n1, s)
            if E.get(k0) == 'outline' or (s, n1) in done:
                continue
            ch = [s, n1]
            ok = True
            while deg[ch[-1]] == 2:
                nxt = [w for w in adj[ch[-1]] if w != ch[-2]]
                if not nxt or nxt[0] == ch[0]:
                    ok = False
                    break
                k = (ch[-1], nxt[0]) if ch[-1] < nxt[0] else (nxt[0], ch[-1])
                if E.get(k) == 'outline':
                    ok = False
                    break
                ch.append(nxt[0])
            t = ch[-1]
            done.add((s, n1))
            done.add((t, ch[-2]))
            if not ok:
                rejected['loop or outline'] += 1
                continue
            checked += 1
            fl, fr = face_of.get((s, n1)), face_of.get((n1, s))
            if fl is None or fr is None or fl == fr or fl not in net or fr not in net:
                rejected['same face or unbounded side'] += 1
                continue

            def stem(v, w):
                if deg[v] != 3:
                    return False
                o = [x for x in adj[v] if x != w]
                return turn_deg(o[0], v, o[1]) < STEM_DEG
            if not (stem(s, n1) and stem(t, ch[-2])):
                rejected['an end is not a T stem'] += 1
                continue
            cl, cr = cycles[fl], cycles[fr]
            m = len(ch) - 1
            try:
                i = next(j for j in range(len(cl)) if cl[j] == s and cl[(j + 1) % len(cl)] == n1)
                jr = next(j for j in range(len(cr)) if cr[j] == t and cr[(j + 1) % len(cr)] == ch[-2])
            except StopIteration:
                rejected['run not found'] += 1
                continue
            lrem = [cl[(i + m + q) % len(cl)] for q in range(len(cl) - m + 1)]      # t .. s
            rrem = [cr[(jr + m + q) % len(cr)] for q in range(len(cr) - m + 1)]     # s .. t
            if lrem[0] != t or lrem[-1] != s or rrem[0] != s or rrem[-1] != t:
                rejected['run not contiguous'] += 1
                continue
            P = lrem + rrem[1:-1]
            if len(set(P)) != len(P):
                rejected['parent not simple'] += 1
                continue
            if area2(P) != F['A2'][fl] + F['A2'][fr]:
                rejected['parent area differs from the two faces'] += 1
                continue
            o = obb(P)
            if not o:
                continue
            long_, short_, ux, uy, umin, umax = o
            dx, dy = t[0] - s[0], t[1] - s[1]
            ang_axis = fold90(dx, dy, ux, uy)
            ps = s[0] * ux + s[1] * uy
            pt = t[0] * ux + t[1] * uy
            off = abs(((ps + pt) / 2 - umin) / (umax - umin) - 0.5) if umax > umin else None
            n = len(P)
            corners = [q for q in range(n) if turn_deg(P[q - 1], P[q], P[(q + 1) % n]) >= CORNER_DEG]
            if len(corners) >= 2:
                sides = []
                for z in range(len(corners)):
                    a, b = corners[z], corners[(z + 1) % len(corners)]
                    run = [P[(a + q) % n] for q in range(((b - a) % n) + 1)]
                    sides.append((math.dist(P[a], P[b]), run))
                chord, run = max(sides, key=lambda x: x[0])
                ang_side = fold90(dx, dy, run[-1][0] - run[0][0], run[-1][1] - run[0][1])
                on_side = s in run or t in run
            else:
                ang_side, on_side = None, None
            al, ar = net[fl], net[fr]
            out.append(dict(faces=(fl, fr), angAxis=ang_axis, offset=off, angSide=ang_side, onLongest=on_side,
                            balance=min(al, ar) / max(al, ar), aspect=long_ / short_ if short_ else None,
                            lenM=math.dist(s, t) / 100.0, parentM2=(al + ar) / 1e4))
    return out, checked, rejected


# ---------------------------------------------------------------- scanline land share
def iv_union(iv):
    iv = sorted(iv)
    out = []
    for a, b in iv:
        if b <= a:
            continue
        if out and a <= out[-1][1]:
            if b > out[-1][1]:
                out[-1][1] = b
        else:
            out.append([a, b])
    return out


def iv_inter(A_, B):
    out, i, j = [], 0, 0
    while i < len(A_) and j < len(B):
        a, b = max(A_[i][0], B[j][0]), min(A_[i][1], B[j][1])
        if a < b:
            out.append([a, b])
        if A_[i][1] < B[j][1]:
            i += 1
        else:
            j += 1
    return out


def iv_sub(A_, B):
    out = []
    for a, b in A_:
        cur = a
        for c, d in B:
            if d <= cur or c >= b:
                continue
            if c > cur:
                out.append([cur, c])
            cur = max(cur, d)
            if cur >= b:
                break
        if cur < b:
            out.append([cur, b])
    return out


def iv_len(iv):
    return sum(b - a for a, b in iv)


def poly_rows(polys, ymin, nrows):
    """{row: {poly index: [crossing x]}} for row centres ymin + (k + 0.5) * ROW_CM"""
    rows = collections.defaultdict(lambda: collections.defaultdict(list))
    for pi, P in enumerate(polys):
        n = len(P)
        for i in range(n):
            (xa, ya), (xb, yb) = P[i], P[(i + 1) % n]
            if ya == yb:
                continue
            lo, hi = min(ya, yb), max(ya, yb)
            k0 = max(0, int(math.ceil((lo - ymin) / ROW_CM - 0.5)))
            k1 = min(nrows - 1, int(math.floor((hi - ymin) / ROW_CM - 0.5)))
            for k in range(k0, k1 + 1):
                y = ymin + (k + 0.5) * ROW_CM
                if lo <= y < hi:
                    rows[k][pi].append(xa + (y - ya) * (xb - xa) / (yb - ya))
    return rows


def row_intervals(rowd):
    out = []
    for xs in rowd.values():
        xs.sort()
        out += [[xs[i], xs[i + 1]] for i in range(0, len(xs) - 1, 2)]
    return iv_union(out)


def capsule_x(a, b, rr, y):
    """the x interval of {p : dist(p, segment ab) <= rr} on the line at height y, or None"""
    lo, hi = [], []
    for (px, py) in (a, b):
        dy = y - py
        if abs(dy) <= rr:
            h = math.sqrt(rr * rr - dy * dy)
            lo.append(px - h)
            hi.append(px + h)
    dx, dyy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dyy)
    if L > 0:
        ux, uy = dx / L, dyy / L
        # 0 <= (x - ax) ux + (y - ay) uy <= L  and  |-(x - ax) uy + (y - ay) ux| <= rr
        cons = [(ux, (y - a[1]) * uy, 0.0, L), (-uy, (y - a[1]) * ux, -rr, rr)]
        xl, xh = -1e18, 1e18
        good = True
        for c, k, mn, mx in cons:
            if abs(c) < 1e-12:
                if not (mn <= k <= mx):
                    good = False
                continue
            t1, t2 = (mn - k) / c + a[0], (mx - k) / c + a[0]
            xl, xh = max(xl, min(t1, t2)), min(xh, max(t1, t2))
        if good and xl <= xh:
            lo.append(xl)
            hi.append(xh)
    if not lo:
        return None
    return [min(lo), max(hi)]


def land_share(R, bands, water, paved, footprints, faces=()):
    """exact x lengths on rows ROW_CM apart, integrated; all in cm and cm2. faces: [(face id, polygon)]; per face the
    scanned area, its water and its land outside the bands"""
    x0, y0, x1, y1 = R.bbox
    nrows = int(math.ceil((y1 - y0) / ROW_CM))
    ring_rows = poly_rows(R.loops, y0, nrows)
    sel = lambda P: [p for p in P if not (max(q[0] for q in p) < x0 or min(q[0] for q in p) > x1 or
                                         max(q[1] for q in p) < y0 or min(q[1] for q in p) > y1)]
    water_rows = poly_rows(sel(water), y0, nrows)
    paved_rows = poly_rows(sel(paved), y0, nrows)
    fp_rows = poly_rows(sel(footprints), y0, nrows)
    face_rows = poly_rows([P for _, P in faces], y0, nrows)
    per_face = collections.defaultdict(lambda: [0.0, 0.0, 0.0])
    band_rows = collections.defaultdict(list)
    for a, b, rr in bands:
        lo, hi = min(a[1], b[1]) - rr, max(a[1], b[1]) + rr
        if hi < y0 or lo > y1 or max(a[0], b[0]) + rr < x0 or min(a[0], b[0]) - rr > x1:
            continue
        k0 = max(0, int(math.ceil((lo - y0) / ROW_CM - 0.5)))
        k1 = min(nrows - 1, int(math.floor((hi - y0) / ROW_CM - 0.5)))
        for k in range(k0, k1 + 1):
            band_rows[k].append((a, b, rr))
    tot = dict(ring=0.0, land=0.0, net=0.0, net2=0.0, fp=0.0, water=0.0)
    for k in range(nrows):
        y = y0 + (k + 0.5) * ROW_CM
        rk = ring_rows.get(k)
        if not rk or 0 not in rk:
            continue
        xs = sorted(rk[0])
        outer = iv_union([[xs[i], xs[i + 1]] for i in range(0, len(xs) - 1, 2)])
        hole_iv = []
        for pi, hx in rk.items():
            if pi == 0:
                continue
            hx = sorted(hx)
            hole_iv += [[hx[i], hx[i + 1]] for i in range(0, len(hx) - 1, 2)]
        R_iv = iv_sub(outer, iv_union(hole_iv))
        W_iv = row_intervals(water_rows[k]) if k in water_rows else []
        land = iv_sub(R_iv, W_iv)
        B = iv_union([iv for iv in (capsule_x(a, b, rr, y) for a, b, rr in band_rows.get(k, [])) if iv])
        net = iv_sub(land, B)
        Pv = row_intervals(paved_rows[k]) if k in paved_rows else []
        net2 = iv_sub(net, Pv)
        Fp = row_intervals(fp_rows[k]) if k in fp_rows else []
        tot['ring'] += iv_len(R_iv)
        tot['water'] += iv_len(iv_inter(R_iv, W_iv))
        tot['land'] += iv_len(land)
        tot['net'] += iv_len(net)
        tot['net2'] += iv_len(net2)
        tot['fp'] += iv_len(iv_inter(land, Fp))
        for fi, fx in face_rows.get(k, {}).items():
            fx = sorted(fx)
            fiv = iv_union([[fx[i], fx[i + 1]] for i in range(0, len(fx) - 1, 2)])
            acc = per_face[faces[fi][0]]
            acc[0] += iv_len(fiv)
            acc[1] += iv_len(iv_inter(fiv, W_iv))
            acc[2] += iv_len(iv_inter(fiv, net))
    out = {k: v * ROW_CM for k, v in tot.items()}
    out['faces'] = {fid: [x * ROW_CM for x in v] for fid, v in per_face.items()}
    return out


# ---------------------------------------------------------------- towers against wall vertices
def towers(mi, W):
    chains = wall_chains(mi)
    T = [cmkey(f['geometry']['coordinates']) for f in mi['features'] if f['kind'] == 'tower']
    Tset = set(T)
    arms = collections.Counter()
    for a, b in W:
        arms[a] += 1
        arms[b] += 1
    verts, spacing, runs, all_nodes = [], [], [], set()
    for ch in chains:
        closed = len(ch) > 2 and ch[0] == ch[-1]
        V = ch[:-1] if closed else ch
        all_nodes.update(V)
        n = len(V)
        cum = [0.0]
        for i in range(1, len(ch)):
            cum.append(cum[-1] + math.dist(ch[i - 1], ch[i]) / 100.0)
        total = cum[-1]
        for i, v in enumerate(V):
            end = (not closed) and (i == 0 or i == n - 1)
            tr = None
            if closed or 0 < i < n - 1:
                tr = turn_deg(V[i - 1], v, V[(i + 1) % n])
            verts.append(dict(tower=v in Tset, end=end, turn=tr, arms=arms.get(v, 0), s=cum[i]))
        tix = [i for i, v in enumerate(V) if v in Tset]
        for z in range(len(tix) - 1):
            spacing.append(cum[tix[z + 1]] - cum[tix[z]])
            runs.append(tix[z + 1] - tix[z] - 1)
        if closed and len(tix) >= 2:
            spacing.append(total - cum[tix[-1]] + cum[tix[0]])
            runs.append(n - tix[-1] - 1 + tix[0])
    on_wall = sum(1 for t in T if t in all_nodes)
    bins = [(0, 2), (2, 5), (5, 10), (10, 20), (20, 45), (45, 181)]
    by_turn = []
    for lo, hi in bins:
        sel_ = [v for v in verts if v['turn'] is not None and lo <= v['turn'] < hi]
        by_turn.append({'turnDeg': [lo, min(hi, 180)], 'n': len(sel_), 'towers': sum(v['tower'] for v in sel_)})
    by_arms = []
    for a in (0, 1, 2):
        sel_ = [v for v in verts if (v['arms'] == a if a < 2 else v['arms'] >= 2)]
        by_arms.append({'wayArms': a if a < 2 else '2+', 'n': len(sel_), 'towers': sum(v['tower'] for v in sel_)})
    ends = [v for v in verts if v['end']]
    # the joint table: a corner (turn >= 2 degrees; a chain end counts as a corner) against a way meeting the vertex
    cross_tab = []
    for corner in (False, True):
        for met in (False, True):
            sel_ = [v for v in verts if ((v['turn'] is None) or v['turn'] >= 2) == corner and (v['arms'] > 0) == met]
            cross_tab.append({'corner': corner, 'wayMeets': met, 'n': len(sel_), 'towers': sum(v['tower'] for v in sel_)})
    rule = sum(v['tower'] == (v['arms'] == 0) for v in verts)
    rule2 = sum(v['tower'] == ((v['arms'] == 0) or (v['turn'] is None) or v['turn'] >= 2) for v in verts)
    # a greedy spacing rule, from either end of each chain: a tower at the first vertex, then wherever the distance
    # along the wall since the last tower reaches D; agreement = the share of wall vertices classified as recorded
    seqs = []
    for ch in chains:
        closed = len(ch) > 2 and ch[0] == ch[-1]
        V = ch[:-1] if closed else ch
        truth = [v in Tset for v in V]
        for seq, tr_ in ((V, truth), (V[::-1], truth[::-1])):
            cum = [0.0]
            for i in range(1, len(seq)):
                cum.append(cum[-1] + math.dist(seq[i - 1], seq[i]) / 100.0)
            seqs.append((len(seqs) // 2, cum, tr_))
    best = None
    for D in range(5, 101):
        per_chain = collections.defaultdict(int)
        for ci, cum, tr_ in seqs:
            last, agree = None, 0
            for i in range(len(cum)):
                pred = last is None or cum[i] - cum[last] >= D
                if pred:
                    last = i
                agree += pred == tr_[i]
            per_chain[ci] = max(per_chain[ci], agree)
        tot_ = len(verts)
        ok = sum(per_chain.values())
        if tot_ and (best is None or ok / tot_ > best[1]):
            best = (D, ok / tot_)
    return dict(towers=len(T), onWallVertex=on_wall, wallVertices=len(verts), wallNodes=len(all_nodes),
                untoweredVertices=sum(1 for v in verts if not v['tower']), chains=len(chains),
                closedChains=sum(1 for ch in chains if len(ch) > 2 and ch[0] == ch[-1]),
                chainEnds={'n': len(ends), 'towers': sum(v['tower'] for v in ends)},
                byTurn=by_turn, byWayArms=by_arms, cornerByWayMeets=cross_tab,
                ruleNoWayMeets={'agreement': r(rule / len(verts), 4) if verts else None,
                                'words': 'a tower exactly where no way meets the wall vertex'},
                ruleNoWayOrCorner={'agreement': r(rule2 / len(verts), 4) if verts else None,
                                   'words': 'a tower where no way meets the vertex or the wall turns 2 degrees or more there'},
                spacingM=summ(spacing, 2), spacingRaw=[round(x, 2) for x in spacing],
                untoweredRun={str(k): v for k, v in sorted(collections.Counter(runs).items())},
                greedySpacing={'bestDM': best[0] if best else None, 'agreement': r(best[1], 4) if best else None,
                               'baselineAgreement': r(max(sum(v['tower'] for v in verts), sum(not v['tower'] for v in verts)) /
                                                      len(verts), 4) if verts else None,
                               'note': 'a description of the spacing, not a claim about the reference rule; the baseline '
                                       'labels every vertex with the commoner class'})


# ---------------------------------------------------------------- one payload
def measure(stamp, label, plant=None):
    mi, D, prov = A.adapt(stamp)
    stored_path = A.out_path(mi, stamp)
    stored = None
    if os.path.exists(stored_path):
        with tempfile.TemporaryDirectory() as td:
            tmp = os.path.join(td, 'fresh.gz')
            A.write(mi, tmp)
            stored = S.sha(tmp) == S.sha(stored_path)
    W, dup = way_edges(mi)
    bands = [(a, b, HALF_WIDTH_M[c] * 100) for (a, b), c in W.items()]
    for ch in wall_chains(mi):
        for a, b in zip(ch, ch[1:]):
            if a != b:
                bands.append((a, b, WALL_HALF_WIDTH_M * 100))
    water = []
    for f in mi['features']:
        if f['kind'] == 'water':
            P = [cmkey(c) for c in f['geometry']['coordinates'][0]]
            water.append(P[:-1] if P[0] == P[-1] else P)
    paved = []
    for tex, polys in D['textures']:
        if tex == PAVED_TEXTURE:
            for P in polys:
                q, _ = A.open_ring(P)
                if len(q) >= 3:
                    paved.append(q)
    bpolys = []
    for f in mi['features']:
        if f['kind'] == 'building':
            P = [cmkey(c) for c in f['geometry']['coordinates'][0]]
            bpolys.append(P[:-1] if P[0] == P[-1] else P)
    cats = mi['research']['buildingCategory']
    rings, faces_m2, all_cuts, ring_checks, water_faces, net_all = [], [], [], [], [], []
    face_index = []          # (ring number, cycle id, polygon, area m2) for the market note
    adjacent = set()         # ((ring, face), (ring, face)) sharing an edge
    for ri, (did, R0, holes) in enumerate(districts(mi)):
        R = Ring(R0, holes)
        F = ring_faces(R, W, plant=plant if ri == 0 else None)
        c = F['checks']
        flist = [(i, F['cycles'][i]) for i in F['pos']]
        ls = land_share(R, bands, water, paved, bpolys, faces=flist)
        # a face at least half water (a harbour basin or a river reach the district outline encloses) is a water
        # face, not a block: listed, kept out of ftg.ringBlock (W06-D3)
        wet = set()
        for i, _ in flist:
            sc, wa, ne = ls['faces'].get(i, [0.0, 0.0, 0.0])
            if sc > 0 and wa / sc >= 0.5:
                wet.add(i)
                water_faces.append(dict(ring=ri, areaM2=r(F['net'][i] / 1e4, 1), waterShare=r(wa / sc, 4)))
        areas = sorted(F['net'][i] / 1e4 for i in F['pos'] if i not in wet)
        faces_m2 += areas
        net_land = sorted(ls['faces'][i][2] / 1e4 for i in F['pos'] if i not in wet and i in ls['faces'])
        net_all += net_land
        cu, checked, rejected = cuts(F, R)
        kept = [x for x in cu if not (set(x['faces']) & wet)]
        if len(kept) != len(cu):
            rejected['a side is a water face'] += len(cu) - len(kept)
        all_cuts += kept
        touch = 0
        for i, cyc in flist:
            if any(F['E'].get((cyc[j], cyc[(j + 1) % len(cyc)]) if cyc[j] < cyc[(j + 1) % len(cyc)] else
                              (cyc[(j + 1) % len(cyc)], cyc[j])) == 'outline' for j in range(len(cyc))):
                touch += 1
            face_index.append((ri, i, cyc, F['net'][i] / 1e4))
        for (u, v), i in F['face_of'].items():
            j = F['face_of'].get((v, u))
            if j is not None and j != i and i in F['net'] and j in F['net']:
                adjacent.add(((ri, min(i, j)), (ri, max(i, j))))
        # tiling: seeded points inside the district polygon each lie in exactly one face (a hole cut out of its face)
        rng = random.Random('%s:%d' % (stamp, ri))
        bx0, by0, bx1, by1 = R.bbox
        tiled = tried = 0
        while tried < TILE_POINTS:
            q = (rng.uniform(bx0, bx1), rng.uniform(by0, by1))
            if not inside_f(q, R0):
                continue
            tried += 1
            k = sum(1 for i in F['pos'] if inside_f(q, F['cycles'][i]) and
                    not any(inside_f(q, F['cycles'][h]) for h in F['holes'].get(i, [])))
            tiled += k == 1
        # a district polygon with a hole is not handled (none occurs; a hole would fail here, never pass silently)
        ok_close = c['openWalks'] == 0 and c['crossings'] == 0 and c['outlineCrossings'] == 0 and c['euler'] and \
            c['outerCycles'] == c['C'] and c['outerIsRing'] and not holes and tiled == tried
        rel = abs(c['faceSumM2'] - c['ringAreaM2']) / c['ringAreaM2']
        scan_rel = abs(ls['ring'] / 1e4 - c['ringAreaM2']) / c['ringAreaM2']
        ring_checks.append(dict(ring=ri, close=ok_close, areaRel=rel, scanRel=scan_rel, tiled=[tiled, tried]))
        rings.append(dict(
            ring=ri, district=did, outlineVertices=len(R0), holes=len(holes), areaM2=r(c['ringAreaM2'], 2),
            faces=len(F['pos']), waterFaces=len(wet), blocks=len(areas), facesTouchingNonWayOutline=touch,
            blockAreaM2=summ(areas, 1), blockLandNetOfBandsM2=summ(net_land, 1),
            walk={k: c[k] for k in ('V', 'Ecount', 'F', 'C', 'euler', 'outerCycles', 'openWalks', 'crossings',
                                     'outlineCrossings', 'planarized', 'outerIsRing', 'splitNodes',
                                     'floating', 'wayEdgesInside', 'wayEdgesOnOutline')},
            faceSumM2=r(c['faceSumM2'], 2), faceSumRel=r(rel, 6),
            land={'ringM2': r(ls['ring'] / 1e4, 1), 'waterM2': r(ls['water'] / 1e4, 1), 'landM2': r(ls['land'] / 1e4, 1),
                  'netOfBandsM2': r(ls['net'] / 1e4, 1), 'netOfBandsAndPavedM2': r(ls['net2'] / 1e4, 1),
                  'footprintM2': r(ls['fp'] / 1e4, 1),
                  'shareNetOfBands': r(ls['net'] / ls['land'], 4) if ls['land'] else None,
                  'shareNetOfBandsAndPaved': r(ls['net2'] / ls['land'], 4) if ls['land'] else None,
                  'footprintCover': r(ls['fp'] / ls['land'], 4) if ls['land'] else None,
                  'scanRingRel': r(scan_rel, 6)},
            cutsChecked=checked, cutsRejected=dict(sorted(rejected.items())), cuts=len(kept)))
    tot = {k: sum(x['land'][k] for x in rings) for k in ('landM2', 'netOfBandsM2', 'netOfBandsAndPavedM2', 'footprintM2')}
    # markets
    markets = []
    bi = 0
    for f in mi['features']:
        if f['kind'] != 'building':
            continue
        if cats[bi] == MARKET_CATEGORY:
            P = bpolys[bi]
            cxy = A.centroid(P)
            ring_of = face_of = None
            for (ri, ci, cyc, am2) in face_index:
                if inside_f(cxy, cyc):
                    if face_of is None or am2 < face_of[2]:
                        ring_of, face_of = ri, (ri, ci, am2)
            am = abs(area2(P)) / 2e4
            markets.append(dict(areaM2=r(am, 1), centre=cxy, ring=ring_of,
                                face=[face_of[0], face_of[1]] if face_of else None,
                                faceM2=r(face_of[2], 1) if face_of else None,
                                squareShareOfFace=r(am / face_of[2], 4) if face_of else None))
        bi += 1
    pairs = []
    for i in range(len(markets)):
        for j in range(i + 1, len(markets)):
            a, b = markets[i], markets[j]
            same = a['face'] is not None and a['face'] == b['face']
            adj_ = a['face'] is not None and b['face'] is not None and \
                (tuple(min(a['face'], b['face'])), tuple(max(a['face'], b['face']))) in adjacent
            pairs.append(dict(pair=[i, j], distanceM=r(math.dist(a['centre'], b['centre']) / 100.0, 1), sameFace=same,
                              neighbourFaces=adj_))
    for mk in markets:
        del mk['centre']
    edges_reg = registry_edges()
    hist = histogram(faces_m2, edges_reg)
    return dict(
        capture=stamp, label=label, referenceBuild=mi['header']['build'], ftgSize=mi['research']['ftgSize'],
        water=mi['header']['water'], measureInputStoredEqualsFresh=stored,
        wayEdges=len(W), wayEdgeDuplicates=dup, districtRings=len(rings),
        blocks=len(faces_m2), blockAreaM2=summ(faces_m2, 1), histogram=hist,
        blockLandNetOfBandsM2=summ(net_all, 1),
        waterFaces=water_faces,
        blockAreasM2=[round(x, 2) for x in faces_m2],
        rings=rings, ringChecks=ring_checks,
        land={'landM2': r(tot['landM2'], 1), 'netOfBandsM2': r(tot['netOfBandsM2'], 1),
              'netOfBandsAndPavedM2': r(tot['netOfBandsAndPavedM2'], 1), 'footprintM2': r(tot['footprintM2'], 1),
              'plotShareBound': r(tot['netOfBandsM2'] / tot['landM2'], 4) if tot['landM2'] else None,
              'plotShareBoundLessPaved': r(tot['netOfBandsAndPavedM2'] / tot['landM2'], 4) if tot['landM2'] else None,
              'footprintCover': r(tot['footprintM2'] / tot['landM2'], 4) if tot['landM2'] else None},
        cuts={'n': len(all_cuts),
              'angleToLongAxisDeg': summ([c['angAxis'] for c in all_cuts], 1),
              'shareAngleToLongAxisAtLeast75': r(sum(c['angAxis'] >= 75 for c in all_cuts) / len(all_cuts), 4) if all_cuts else None,
              'offsetFromMiddle': summ([c['offset'] for c in all_cuts if c['offset'] is not None], 3),
              'shareOffsetAtMost0p1': r(sum(c['offset'] <= 0.1 for c in all_cuts if c['offset'] is not None) / len(all_cuts), 4) if all_cuts else None,
              'angleToLongestSideDeg': summ([c['angSide'] for c in all_cuts if c['angSide'] is not None], 1),
              'shareAngleToLongestSideAtLeast75': r(sum(c['angSide'] >= 75 for c in all_cuts if c['angSide'] is not None) /
                                                    max(1, sum(c['angSide'] is not None for c in all_cuts)), 4) if all_cuts else None,
              'shareEndingOnLongestSide': r(sum(bool(c['onLongest']) for c in all_cuts if c['onLongest'] is not None) /
                                            max(1, sum(c['onLongest'] is not None for c in all_cuts)), 4) if all_cuts else None,
              'shareWithin15OfAnObbAxis': r(sum(c['angAxis'] < 15 or c['angAxis'] > 75 for c in all_cuts) / len(all_cuts), 4) if all_cuts else None,
              'shareAlongLongAxisUnder15': r(sum(c['angAxis'] < 15 for c in all_cuts) / len(all_cuts), 4) if all_cuts else None,
              'parentAspectWhereAcross': summ([c['aspect'] for c in all_cuts if c['angAxis'] > 75 and c['aspect']], 2),
              'parentAspectWhereAlong': summ([c['aspect'] for c in all_cuts if c['angAxis'] < 15 and c['aspect']], 2),
              'areaBalance': summ([c['balance'] for c in all_cuts], 3),
              'parentAspect': summ([c['aspect'] for c in all_cuts if c['aspect']], 2),
              'cutLengthM': summ([c['lenM'] for c in all_cuts], 1),
              'parentAreaM2': summ([c['parentM2'] for c in all_cuts], 1)},
        cutsRaw={'angAxis': [r(c['angAxis'], 2) for c in all_cuts], 'offset': [r(c['offset'], 4) for c in all_cuts],
                 'angSide': [r(c['angSide'], 2) for c in all_cuts], 'onLongest': [c['onLongest'] for c in all_cuts],
                 'balance': [r(c['balance'], 4) for c in all_cuts], 'aspect': [r(c['aspect'], 3) for c in all_cuts]},
        towers=towers(mi, W),
        markets={'n': len(markets), 'squares': markets, 'pairs': pairs})


def pooled_cuts(caps):
    ang = [x for p in caps for x in p['cutsRaw']['angAxis']]
    if not ang:
        return {'n': 0}
    off = [x for p in caps for x in p['cutsRaw']['offset'] if x is not None]
    side = [x for p in caps for x in p['cutsRaw']['angSide'] if x is not None]
    onl = [x for p in caps for x in p['cutsRaw']['onLongest'] if x is not None]
    asp = [(a, x) for p in caps for a, x in zip(p['cutsRaw']['angAxis'], p['cutsRaw']['aspect']) if x]
    n = len(ang)
    return {'n': n, 'shareAcrossLongAxisAtLeast75': r(sum(a >= 75 for a in ang) / n, 4),
            'shareAlongLongAxisUnder15': r(sum(a < 15 for a in ang) / n, 4),
            'shareWithin15OfAnObbAxis': r(sum(a < 15 or a > 75 for a in ang) / n, 4),
            'offsetFromMiddle': summ(off, 3), 'areaBalance': summ([x for p in caps for x in p['cutsRaw']['balance']], 3),
            'angleToLongestSideDeg': summ(side, 1),
            'shareAngleToLongestSideAtLeast75': r(sum(a >= 75 for a in side) / len(side), 4) if side else None,
            'shareEndingOnLongestSide': r(sum(onl) / len(onl), 4) if onl else None,
            'parentAspectWhereAcross': summ([x for a, x in asp if a > 75], 2),
            'parentAspectWhereAlong': summ([x for a, x in asp if a < 15], 2)}


def registry_edges():
    reg = json.load(open(REGISTRY))
    items = reg['metrics'] if isinstance(reg, dict) and 'metrics' in reg else reg
    for m in items:
        if isinstance(m, dict) and m.get('id') == 'ftg.ringBlock':
            return m['output']['edges']
    raise SystemExit('ftg.ringBlock not in %s' % REGISTRY)


def histogram(vals, edges):
    counts = [0] * (len(edges) - 1)
    under = over = 0
    for v in vals:
        if v < edges[0]:
            under += 1
        elif v >= edges[-1]:
            over += 1
        else:
            k = max(i for i in range(len(edges) - 1) if edges[i] <= v)
            counts[k] += 1
    return {'edgesFrom': 'metrics.m-1.json ftg.ringBlock output.edges (24 log bins, 50-50 000 m2)',
            'underflow': under, 'counts': counts, 'overflow': over}


# ---------------------------------------------------------------- the pass
def plan_list(through=None):
    slots, recorded, plan_hash = S.plan_slots()
    if through is not None:
        slots = [dict(s, status='open', capture=None, failed=None) if s['slot'] > through else s for s in slots]
    K = max([s['slot'] for s in slots if s['status'] != 'open'] or [-1])
    return slots, recorded, plan_hash, K


def programme_closed(slots_live):
    """programme 2 is closed when no slot of it is open in plan.json, or when E02's JSON records its stop (a stopped
    programme leaves its remaining slots open as the shortfall, M-1-plan section 2.1b (6); W06-D3)"""
    p2 = [s for s in slots_live if s['programme'] == 2]
    open_ = [s['slot'] for s in p2 if s['status'] == 'open']
    e02 = json.load(open(E02_JSON))
    p = (e02.get('slotsByProgramme') or {}).get('2') or {}
    stopped = bool(p.get('stopped') or p.get('closed') or p.get('stop'))
    return (not open_) or stopped, open_, stopped


def last_pass_ok(closed, K, last_decided):
    return bool(closed) and K == last_decided


def build(through=None, plant=None):
    slots, recorded, plan_hash, K = plan_list(through)
    todo = []
    for stamp, label, note in FIXTURES:
        todo.append(dict(stamp=stamp, label=label, slot=None, kind='fixture', note=note))
    for s in slots:
        if s['status'] == 'bound':
            todo.append(dict(stamp=s['capture'], label=s['label'], slot=s['slot'], kind='slot', note=None))
    per = []
    for t in todo:
        m = measure(t['stamp'], t['label'], plant=plant if t is todo[0] else None)
        m['slot'] = t['slot']
        m['kind'] = t['kind']
        m['note'] = t['note']
        per.append(m)
        print('measured %s %s blocks %d' % (t['label'], t['stamp'], m['blocks']), file=sys.stderr)
    # samples per FTG size, in plan order: the recorded family's usable member first (R-02), then the slots
    samples = {}
    edges = registry_edges()
    for size in S.ROW_SIZES + ('TOWN',):
        mine = []
        for rr in sorted([x for x in recorded if x['ftgSize'] == size and x['status'] == 'bound'], key=lambda x: x.get('order', 0)):
            mine += [p for p in per if p['capture'] == rr['capture']]
        mine += sorted([p for p in per if p['kind'] == 'slot' and p['ftgSize'] == size], key=lambda p: p['slot'])
        pooled = [v for p in mine for v in p['blockAreasM2']]
        samples[size] = {
            'rows': size in S.ROW_SIZES, 'captures': [p['label'] for p in mine], 'stamps': [p['capture'] for p in mine],
            'n': len(mine), 'estimatorAtN': S.estimator(len(mine)),
            'blocks': len(pooled), 'blockAreaM2': summ(pooled, 1), 'histogram': histogram(pooled, edges),
            'perCaptureMedianM2': [p['blockAreaM2'].get('p50') for p in mine],
            'plotShareBound': [p['land']['plotShareBound'] for p in mine],
            'plotShareBoundLessPaved': [p['land']['plotShareBoundLessPaved'] for p in mine],
            'footprintCover': [p['land']['footprintCover'] for p in mine],
            'cutsPooled': pooled_cuts(mine),
            'towerSpacingPooledM': summ([x for p in mine for x in p['towers']['spacingRaw']], 2),
            'marketsPerCapture': [p['markets']['n'] for p in mine]}
    doc = {
        'schema': 'm1.e06/1', 'record': 'docs/calibration/E06-ftg-faces.md', 'workItem': 'W-06', 'lane': LANE,
        'earlierPass': EARLIER_PASS,
        'script': SCRIPT, 'uses': [A.SCRIPT], 'metric': 'ftg.ringBlock (descriptive; R-34)',
        'plan': {'file': 'research/baselines/plan.json', 'sha256': plan_hash},
        'pass': {'throughSlot': K, 'rule': 'the slots decided (bound or failed) when the pass started; a later slot '
                 'belongs to the next pass'},
        'definitions': {
            'faces': 'planar face walk inside each district ring over the ring outline and the MeasureInput way edges '
                     'inside it (midpoint inside, ends inside or on the outline); outline split at way nodes on it; '
                     'face area = cycle area less the outer cycles of way components that do not touch the outline',
            'bands': 'half widths (m) %s, wall %s; round-joined (distance to the centreline)' % (
                json.dumps(HALF_WIDTH_M, sort_keys=True), WALL_HALF_WIDTH_M),
            'scanline': 'row spacing %d cm, exact x lengths per row' % ROW_CM,
            'stem': 'T stem: degree 3, the two other arms turn < %g degrees' % STEM_DEG,
            'corner': 'a parent corner turns >= %g degrees' % CORNER_DEG},
        'slotStatus': [{k: s[k] for k in ('slot', 'label', 'ftgSize', 'water', 'status', 'capture', 'failed')} for s in slots],
        'perCapture': per, 'samples': samples}
    return doc


def run_checks(doc, red=False):
    C = []

    def ck(cid, name, ok, receipt):
        C.append({'id': cid, 'check': name, 'passed': bool(ok), 'receipt': receipt})
    per = doc['perCapture']
    rc = [(p['capture'], x) for p in per for x in p['ringChecks']]
    bad = ['%s ring %d' % (c, x['ring']) for c, x in rc if not x['close']]
    nr = len(rc)
    eul = sum(1 for p in per for g in p['rings'] if g['walk']['euler'])
    tl = [sum(x['tiled'][0] for _, x in rc), sum(x['tiled'][1] for _, x in rc)]
    ck('facesClose', 'faces close: every walk closes, each ring subgraph planar after the declared planarization (0 '
       'crossings, 0 off-node contacts, 0 ways crossing the outline), one outer cycle per component, Euler V - E + F = C '
       'per ring subgraph, and seeded points of each ring lie in exactly one face',
       not bad and nr > 0, '%d of %d rings on %d payloads (Euler %d / %d; faces %d; tiling %d / %d points)%s' % (
           nr - len(bad), nr, len(per), eul, nr, sum(sum(g['faces'] for g in p['rings']) for p in per), tl[0], tl[1],
           '; fail: ' + ', '.join(bad) if bad else ''))
    worst = max((x['areaRel'], c, x['ring']) for c, x in rc)
    over = ['%s ring %d %.4f' % (c, x['ring'], x['areaRel']) for c, x in rc if x['areaRel'] > AREA_TOL]
    ck('areaSum', 'the face areas sum to the ring area within 1 % (district polygon shoelace)', not over,
       'worst %.2e (%s ring %d) over %d rings%s' % (worst[0], worst[1], worst[2], nr, '; over: ' + ', '.join(over) if over else ''))
    slots_live, _, _, _ = plan_list(None)
    closed, open_, stopped = programme_closed(slots_live)
    K = doc['pass']['throughSlot']
    last_decided = max([s['slot'] for s in slots_live if s['status'] != 'open'] or [-1])
    ck('lastPass', 'the last pass postdates the FTG programme close (R-47): programme 2 has no open slot (or E02 records '
       'its stop) and this pass read through the last decided slot', last_pass_ok(closed, K, last_decided),
       'programme 2 %s; open slots %s; E02 stop record %s; this pass read through slot %d, last decided slot now %d' % (
           'closed' if closed else 'OPEN', (('%d-%d' % (open_[0], open_[-1])) if open_ else 'none'), stopped, K, last_decided))
    tw = []
    for p in per:
        want = TWIN.get(p['capture'])
        if not want:
            continue
        t = p['towers']
        got = dict(towers=t['towers'], onWall=t['onWallVertex'], wallNodes=t['wallNodes'], untowered=t['untoweredVertices'])
        sp = t['spacingRaw']
        med = sorted(sp)[len(sp) // 2] if sp else None
        f1 = lambda x: float('%.1f' % x)     # the probes print %.1f
        gs = {'n': len(sp), 'min': f1(min(sp)), 'med': f1(med), 'max': f1(max(sp))} if sp else {}
        if red and p['capture'] == FIXTURES[0][0]:
            gs = dict(gs, med=gs['med'] + 0.1)
        for k in ('towers', 'onWall', 'wallNodes', 'untowered'):
            if got[k] != want[k]:
                tw.append('%s %s %s against %s' % (p['capture'], k, got[k], want[k]))
        for k in ('n', 'min', 'med', 'max'):
            if gs.get(k) != want['spacing'][k]:
                tw.append('%s spacing %s %s against %s' % (p['capture'], k, gs.get(k), want['spacing'][k]))
        if 'ringHa' in want:
            ha = [round(g['areaM2'] / 1e4, 1) for g in p['rings']]
            if ha != want['ringHa']:
                tw.append('%s ring ha %s against %s' % (p['capture'], ha, want['ringHa']))
    ck('twin', "the twin: the challenge probes' tower numbers (17 / 29 towers, all on wall vertices; 26 / 46 wall nodes, "
       "9 / 17 untowered; along-wall spacing n 16 / 27, min 18.9 / 4.4, median 39.3 / 35.6, max 72.8 / 59.7 m) and the "
       "critic's ring areas 9.6 / 8.0 / 10.1 / 4.9 ha reproduce on the fixtures", not tw,
       '0 differences' if not tw else '; '.join(tw))
    slots_snap = [dict(s) for s in doc['slotStatus']]
    probs = []
    recorded = S.plan_slots()[1]
    for size, smp in doc['samples'].items():
        want = [rr['label'] for rr in sorted([x for x in recorded if x['ftgSize'] == size and x['status'] == 'bound'],
                                             key=lambda x: x.get('order', 0))]
        want += [s['label'] for s in slots_snap if s['ftgSize'] == size and s['status'] == 'bound']
        got = list(smp['captures'])
        if red and size == 'BIG_TOWN' and len(got) >= 2:
            got[0], got[1] = got[1], got[0]
        if got != want:
            probs.append('%s %s against %s' % (size, got, want))
        if EXCLUDED_CAPTURE in smp['stamps']:
            probs.append('%s holds the 2026-09-25 payload' % size)
    for p in per:
        if p['kind'] == 'slot' and (p['label'].split('/')[2] != p['ftgSize'] or p['label'].split('/')[3] != p['water']):
            probs.append('%s request %s/%s against its label' % (p['capture'], p['ftgSize'], p['water']))
    ck('samples', "every sample's captures equal the plan's slots in order (the recorded CITY member first, R-02); the "
       "2026-09-25 payload in no sample (R-04); each slot's request size and water equal its label", not probs,
       '; '.join('%s %d' % (k, v['n']) for k, v in doc['samples'].items()) + ('; problems: ' + '; '.join(probs) if probs else ''))
    sw = max((x['scanRel'], c, x['ring']) for c, x in rc)
    sbad = ['%s ring %d %.5f' % (c, x['ring'], x['scanRel']) for c, x in rc if x['scanRel'] > SCAN_TOL]
    ck('scanline', 'the scanline integrates each ring to within 0.1 % of its shoelace area', not sbad,
       'worst %.2e (%s ring %d)%s' % (sw[0], sw[1], sw[2], '; over: ' + ', '.join(sbad) if sbad else ''))
    return C


def fmt(v, nd=0):
    if v is None:
        return '—'
    if isinstance(v, bool):
        return 'yes' if v else 'no'
    if isinstance(v, int):
        return '{:,}'.format(v).replace(',', ' ')
    if nd == 0 and abs(v) >= 1000:
        return '{:,.0f}'.format(v).replace(',', ' ')
    return ('%.' + str(nd) + 'f') % v


def short(p):
    if p['kind'] == 'fixture':
        return 'CITY rec. %s%s' % (p['label'].split('/')[-1], ' (R-04)' if p['capture'] == EXCLUDED_CAPTURE else '')
    return 'slot %d' % p['slot']


def md_tables(doc):
    per = doc['perCapture']
    out = []
    L = ['| payload | size / water | rings | faces (water) | blocks | block m² p10 / p50 / p90 | block land net of bands m² p50 | '
         'crossings made nodes (way × outline / way × way) | plotShare bound | less paved | footprint cover |',
         '|---|---|---|---|---|---|---|---|---|---|---|']
    for p in per:
        pl = collections.Counter()
        for g in p['rings']:
            pl.update(g['walk']['planarized'])
        b = p['blockAreaM2']
        L.append('| %s%s | %s / %s | %d | %d (%d) | %s | %s / %s / %s | %s | %d / %d | %s | %s | %s |' % (
            short(p), '', p['ftgSize'], p['water'], p['districtRings'],
            sum(g['faces'] for g in p['rings']), len(p['waterFaces']), fmt(p['blocks']), fmt(b['p10']), fmt(b['p50']),
            fmt(b['p90']), fmt(p['blockLandNetOfBandsM2'].get('p50')), pl.get('way x outline', 0), pl.get('way x way', 0),
            fmt(p['land']['plotShareBound'], 3), fmt(p['land']['plotShareBoundLessPaved'], 3), fmt(p['land']['footprintCover'], 3)))
    out.append('\n'.join(L))
    S_ = ['| FTG size | n | estimator at n | captures in order | blocks | block m² p10 / p50 / p90 | per-capture median m² | '
          'plotShare bound (range) | less paved (range) | footprint cover (range) |', '|---|---|---|---|---|---|---|---|---|---|']
    for size, smp in doc['samples'].items():
        b = smp['blockAreaM2']
        rng = lambda v: ('%.3f–%.3f' % (min(v), max(v))) if v else '—'
        S_.append('| %s | %d | %s | %s | %s | %s / %s / %s | %s | %s | %s | %s |' % (
            size, smp['n'], smp['estimatorAtN'] if smp['rows'] else 'no row (R-34)',
            ', '.join(c.split('/', 2)[2] for c in smp['captures']) or '—', fmt(smp['blocks']), fmt(b.get('p10')),
            fmt(b.get('p50')), fmt(b.get('p90')), ' / '.join(fmt(x) for x in smp['perCaptureMedianM2']) or '—',
            rng(smp['plotShareBound']), rng(smp['plotShareBoundLessPaved']), rng(smp['footprintCover'])))
    out.append('\n'.join(S_))
    H = ['| FTG size | underflow | ' + ' | '.join('%s' % fmt(e) for e in registry_edges()[:-1]) + ' | overflow |',
         '|---|---|' + '---|' * (len(registry_edges()) - 1) + '---|']
    for size, smp in doc['samples'].items():
        h = smp['histogram']
        H.append('| %s | %d | %s | %d |' % (size, h['underflow'], ' | '.join(str(c) for c in h['counts']), h['overflow']))
    out.append('\n'.join(H))
    C_ = ['| FTG size | cuts | across the long axis (≥ 75°) | along it (< 15°) | within 15° of an OBB axis | aspect p50 across / along | '
          'offset from the middle p50 (p90) | area balance p50 | to the longest side p50 (share ≥ 75°) | ends on the longest side |',
          '|---|---|---|---|---|---|---|---|---|---|']
    groups = [(size, smp['cutsPooled']) for size, smp in doc['samples'].items()]
    groups.append(('fixture R-04 (labelled)', pooled_cuts([p for p in per if p['capture'] == EXCLUDED_CAPTURE])))
    for name, c in groups:
        if not c.get('n'):
            C_.append('| %s | 0 | — | — | — | — | — | — | — | — |' % name)
            continue
        C_.append('| %s | %d | %s | %s | %s | %s / %s | %s (%s) | %s | %s° (%s) | %s |' % (
            name, c['n'], fmt(c['shareAcrossLongAxisAtLeast75'], 3), fmt(c['shareAlongLongAxisUnder15'], 3),
            fmt(c['shareWithin15OfAnObbAxis'], 3), fmt(c['parentAspectWhereAcross'].get('p50'), 2),
            fmt(c['parentAspectWhereAlong'].get('p50'), 2), fmt(c['offsetFromMiddle'].get('p50'), 3),
            fmt(c['offsetFromMiddle'].get('p90'), 3), fmt(c['areaBalance'].get('p50'), 3),
            fmt(c['angleToLongestSideDeg'].get('p50'), 1), fmt(c['shareAngleToLongestSideAtLeast75'], 3),
            fmt(c['shareEndingOnLongestSide'], 3)))
    out.append('\n'.join(C_))
    T = ['| payload | towers on wall vertices | wall vertices | chains (closed) | chain ends towered | towered by turn 0–2 / 2–5 / 5–10 / 10–20 / 20–45 / ≥ 45° | '
         'towered by way arms 0 / 1 / 2+ | spacing m p10 / p50 / p90 (min–max) | untowered run 0 / 1 / 2 / 3+ | greedy D m, agreement (baseline) |',
         '|---|---|---|---|---|---|---|---|---|---|']
    for p in per:
        t = p['towers']
        bt = ' / '.join('%d/%d' % (x['towers'], x['n']) for x in t['byTurn'])
        ba = ' / '.join('%d/%d' % (x['towers'], x['n']) for x in t['byWayArms'])
        sp = t['spacingM']
        ur = t['untoweredRun']
        run = '%s / %s / %s / %s' % (ur.get('0', 0), ur.get('1', 0), ur.get('2', 0),
                                     sum(v for k, v in ur.items() if int(k) >= 3))
        g = t['greedySpacing']
        T.append('| %s | %d / %d | %d | %d (%d) | %d / %d | %s | %s | %s / %s / %s (%s–%s) | %s | %s, %s (%s) |' % (
            short(p), t['onWallVertex'], t['towers'], t['wallVertices'], t['chains'], t['closedChains'],
            t['chainEnds']['towers'], t['chainEnds']['n'], bt, ba, fmt(sp.get('p10'), 1), fmt(sp.get('p50'), 1),
            fmt(sp.get('p90'), 1), fmt(sp.get('min'), 1), fmt(sp.get('max'), 1), run, fmt(g['bestDM']),
            fmt(g['agreement'], 3), fmt(g['baselineAgreement'], 3)))
    out.append('\n'.join(T))
    X = ['| group | straight, no way meets | straight, a way meets | corner (≥ 2°) or chain end, no way meets | corner, a way meets | rule "no way meets" | rule "no way meets, or a corner" |',
         '|---|---|---|---|---|---|---|']
    groups = [(size, [p for p in per if p['capture'] in smp['stamps']]) for size, smp in doc['samples'].items()]
    groups.append(('fixture R-04 (labelled)', [p for p in per if p['capture'] == EXCLUDED_CAPTURE]))
    for name, caps in groups:
        if not caps:
            continue
        cells = []
        for z in range(4):
            n = sum(p['towers']['cornerByWayMeets'][z]['n'] for p in caps)
            t = sum(p['towers']['cornerByWayMeets'][z]['towers'] for p in caps)
            cells.append('%d / %d' % (t, n))
        # a payload without a wall (W-06-final: slot 12) has no wall vertex and no agreement; it adds nothing here
        walled = [p for p in caps if p['towers']['wallVertices']]
        nv = sum(p['towers']['wallVertices'] for p in walled)
        if not nv:
            X.append('| %s | %s | %s | %s | %s | — | — |' % (name, cells[0], cells[1], cells[2], cells[3]))
            continue
        a1 = sum(p['towers']['ruleNoWayMeets']['agreement'] * p['towers']['wallVertices'] for p in walled) / nv
        a2 = sum(p['towers']['ruleNoWayOrCorner']['agreement'] * p['towers']['wallVertices'] for p in walled) / nv
        X.append('| %s | %s | %s | %s | %s | %.3f | %.3f |' % (name, cells[0], cells[1], cells[2], cells[3], a1, a2))
    out.append('\n'.join(X))
    M_ = ['| payload | market squares | footprint m² | ring | footprint / its face | distance apart m | same face | neighbouring faces |',
          '|---|---|---|---|---|---|---|---|']
    for p in per:
        m = p['markets']
        sq = m['squares']
        pr = m['pairs']
        M_.append('| %s | %d | %s | %s | %s | %s | %s | %s |' % (
            short(p), m['n'], ' / '.join(fmt(x['areaM2']) for x in sq) or '—', ' / '.join(str(x['ring']) for x in sq) or '—',
            ' / '.join(fmt(x['squareShareOfFace'], 3) for x in sq) or '—', ' / '.join(fmt(x['distanceM']) for x in pr) or '—',
            ' / '.join(fmt(x['sameFace']) for x in pr) or '—', ' / '.join(fmt(x['neighbourFaces']) for x in pr) or '—'))
    out.append('\n'.join(M_))
    return '\n\n'.join(out) + '\n'


def dump(doc):
    return json.dumps(doc, indent=1, sort_keys=False) + '\n'


def main():
    args = sys.argv[1:]

    def opt(name, default=None):
        if name in args:
            i = args.index(name)
            v = args[i + 1]
            del args[i:i + 2]
            return v
        return default
    out = opt('--json', JSON_DEFAULT)
    lim = opt('--through')
    if '--red' in args:
        # each planted fault must make its check fail: a chord with no node (1), an outline piece dropped (2), the
        # pass's closure claimed (3), a twin value moved (4), two BIG_TOWN slots swapped (5), a ring's scan cut short (6)
        base = json.load(open(out))
        K = base['pass']['throughSlot']
        fails = {}
        d1 = build(K, plant='chord')
        fails['facesClose'] = not next(c for c in run_checks(d1) if c['id'] == 'facesClose')['passed']
        d2 = build(K, plant='drop')
        fails['areaSum'] = not next(c for c in run_checks(d2) if c['id'] == 'areaSum')['passed']
        Cr = run_checks(base, red=True)
        for cid in ('twin', 'samples'):
            fails[cid] = not next(c for c in Cr if c['id'] == cid)['passed']
        # the closure test on synthetic states (the live state is open, so a plant there would prove nothing): a
        # closed programme read through slot 26 of 27 must fail, an open one must fail, and the green control must pass
        synthetic = (not last_pass_ok(True, 26, 27)) and (not last_pass_ok(False, 9, 9)) and last_pass_ok(True, 27, 27)
        # and on the live state, through run_checks: the recorded pass read one slot short of the last decided slot
        # must fail (W-06-final; once the programme is closed the recorded pass itself is the green control)
        d3 = json.loads(json.dumps(base))
        d3['pass']['throughSlot'] = K - 1
        live = not next(c for c in run_checks(d3) if c['id'] == 'lastPass')['passed']
        green = next(c for c in run_checks(base) if c['id'] == 'lastPass')['passed']
        print('lastPass: synthetic states %s; live plant (read through slot %d) caught %s; live green control (the '
              'recorded pass) passes %s' % ('caught' if synthetic else 'MISSED', K - 1, live, green))
        fails['lastPass'] = synthetic and live
        d6 = json.loads(json.dumps(base))
        d6['perCapture'][0]['ringChecks'][0]['scanRel'] = 0.01
        fails['scanline'] = not next(c for c in run_checks(d6) if c['id'] == 'scanline')['passed']
        for k, v in fails.items():
            print('%s  planted fault for %s' % ('CAUGHT' if v else 'MISSED', k))
        print('RED: %d of %d planted faults caught' % (sum(fails.values()), len(fails)))
        sys.exit(0 if all(fails.values()) else 1)
    if '--check' in args:
        base_txt = open(out).read()
        base = json.loads(base_txt)
        K = base['pass']['throughSlot']
        doc = build(K)
        doc['checks'] = run_checks(doc)
        same_body = dump({k: v for k, v in doc.items() if k not in ('checks', 'plan')}) == \
            dump({k: v for k, v in base.items() if k not in ('checks', 'plan')})
        for c in doc['checks']:
            print('%s  %s — %s' % ('PASS' if c['passed'] else 'FAIL', c['check'], c['receipt']))
        print('fresh run equals %s (all but the checks and the live plan hash): %s' % (os.path.relpath(out, ROOT), same_body))
        ok = same_body and all(c['passed'] for c in doc['checks'] if c['id'] != 'lastPass')
        print('CHECK: %d of %d checks pass; the record reproduces: %s' % (
            sum(c['passed'] for c in doc['checks']), len(doc['checks']), same_body))
        sys.exit(0 if ok else 1)
    md = opt('--md')
    doc = build(int(lim) if lim is not None else None)
    doc['checks'] = run_checks(doc)
    with open(out, 'w') as fh:
        fh.write(dump(doc))
    if md:
        with open(md, 'w') as fh:
            fh.write(md_tables(doc))
    for c in doc['checks']:
        print('%s  %s — %s' % ('PASS' if c['passed'] else 'FAIL', c['check'], c['receipt']))
    print('wrote %s (%d payloads)' % (os.path.relpath(out, ROOT), len(doc['perCapture'])))
    sys.exit(0 if all(c['passed'] for c in doc['checks'] if c['id'] != 'lastPass') else 1)


if __name__ == '__main__':
    main()
