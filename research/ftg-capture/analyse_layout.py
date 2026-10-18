#!/usr/bin/env python3
"""Statistical analysis of FTG's protobuf settlement layout ("Galeiaward", CITY ~10k).

Reads the raw body captured at
  captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin
and reconstructs the geometry from the schema-less field tree documented in
research/ftg-capture/layout-structure.md.

UNITS: the settlement was requested with blankSettlementWidth=3500 (metres) and
coordinates saturate at 500000 -> 1 unit = 1 cm, full extent = 5000 m square.

  python3 research/ftg-capture/analyse_layout.py [path.bin] > stats.txt
"""
import sys, os, math, struct, collections, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(ROOT, "tools"))
from pb_raw import parse, varint  # noqa: E402

CM_PER_M = 100.0


# ---------------------------------------------------------------- decoding ---
def pv(b):
    """unpack a packed varint payload"""
    i, out = 0, []
    while i < len(b):
        x, i = varint(b, i)
        out.append(x)
    return out


def pts(b):
    v = pv(b)
    return [(v[i], v[i + 1]) for i in range(0, len(v) - 1, 2)]


def fields(b):
    """field-number -> list of payloads (raw)"""
    d = collections.defaultdict(list)
    for fn, wt, v in parse(b):
        d[fn].append((wt, v))
    return d


def one(d, fn, default=None):
    if fn in d:
        return d[fn][0][1]
    return default


def uv(d, fn, default=0):
    """single varint field, honouring proto3 default omission"""
    if fn in d:
        return d[fn][0][1]
    return default


def f32(b):
    return struct.unpack("<f", b)[0]


# ---------------------------------------------------------------- helpers ---
def shoelace(p):
    a = 0.0
    n = len(p)
    for i in range(n):
        x1, y1 = p[i]
        x2, y2 = p[(i + 1) % n]
        a += x1 * y2 - x2 * y1
    return a / 2.0


def perim(p):
    n = len(p)
    return sum(math.dist(p[i], p[(i + 1) % n]) for i in range(n))


def centroid(p):
    a = shoelace(p)
    if abs(a) < 1e-9:
        return (sum(x for x, _ in p) / len(p), sum(y for _, y in p) / len(p))
    cx = cy = 0.0
    n = len(p)
    for i in range(n):
        x1, y1 = p[i]
        x2, y2 = p[(i + 1) % n]
        cr = x1 * y2 - x2 * y1
        cx += (x1 + x2) * cr
        cy += (y1 + y2) * cr
    return (cx / (6 * a), cy / (6 * a))


def convex_hull(p):
    p = sorted(set(p))
    if len(p) < 3:
        return p

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    lo = []
    for q in p:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], q) <= 0:
            lo.pop()
        lo.append(q)
    up = []
    for q in reversed(p):
        while len(up) >= 2 and cross(up[-2], up[-1], q) <= 0:
            up.pop()
        up.append(q)
    return lo[:-1] + up[:-1]


def min_area_rect(p):
    """rotating-calipers style OBB over the convex hull -> (area, w, h, angle)"""
    h = convex_hull(p)
    if len(h) < 3:
        return (0.0, 0.0, 0.0, 0.0)
    best = None
    n = len(h)
    for i in range(n):
        x1, y1 = h[i]
        x2, y2 = h[(i + 1) % n]
        ex, ey = x2 - x1, y2 - y1
        L = math.hypot(ex, ey)
        if L < 1e-9:
            continue
        ux, uy = ex / L, ey / L
        us = [q[0] * ux + q[1] * uy for q in h]
        vs = [-q[0] * uy + q[1] * ux for q in h]
        w = max(us) - min(us)
        ht = max(vs) - min(vs)
        a = w * ht
        if best is None or a < best[0]:
            best = (a, max(w, ht), min(w, ht), math.atan2(uy, ux) if w >= ht else math.atan2(ux, -uy))
    return best or (0.0, 0.0, 0.0, 0.0)


def pct(vals, qs=(0, 1, 5, 10, 25, 50, 75, 90, 95, 99, 100)):
    if not vals:
        return {}
    s = sorted(vals)
    out = {}
    for q in qs:
        idx = min(len(s) - 1, max(0, int(round(q / 100.0 * (len(s) - 1)))))
        out[q] = s[idx]
    return out


def show(name, vals, unit="", scale=1.0, qs=(0, 1, 5, 25, 50, 75, 95, 99, 100)):
    if not vals:
        print("%-42s  (none)" % name)
        return
    p = pct([v * scale for v in vals], qs)
    mean = sum(vals) * scale / len(vals)
    print("%-42s n=%-6d mean=%9.2f%s  " % (name, len(vals), mean, unit)
          + " ".join("p%d=%.2f" % (q, p[q]) for q in qs))


def hist(name, vals, lo, hi, step, scale=1.0, unit=""):
    print("  histogram %s (%s):" % (name, unit))
    b = collections.Counter()
    for v in vals:
        x = v * scale
        if x < lo:
            b["<%g" % lo] += 1
        elif x >= hi:
            b[">=%g" % hi] += 1
        else:
            k = lo + math.floor((x - lo) / step) * step
            b["%g-%g" % (k, k + step)] += 1
    tot = len(vals) or 1

    def key(k):
        if k.startswith("<"):
            return (-1e18,)
        if k.startswith(">"):
            return (1e18,)
        return (float(k.split("-")[0]),)

    for k in sorted(b, key=key):
        n = b[k]
        print("    %-14s %6d  %5.1f%%  %s" % (k, n, 100.0 * n / tot, "#" * int(60.0 * n / tot)))


# ---------------------------------------------------------------- load ------
path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    ROOT, "captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin")
blob = open(path, "rb").read()
top = fields(blob)
print("# FTG layout statistics  --  %s  (%d bytes)" % (os.path.basename(path), len(blob)))
print("# settlement name: %r" % one(top, 2).decode())
print("# id varint (field 1): %d  (== -%d as signed 64)" % (top[1][0][1], (1 << 64) - top[1][0][1]))
print()

# ------------------------------------------------------- field 3: roads -----
roads = fields(one(top, 3))
edges = []
for _, v in roads[1]:
    d = fields(v)
    edges.append((uv(d, 1), uv(d, 2), uv(d, 3), uv(d, 4)))  # id, a, b, type
nodes = {}
adj = {}
for _, v in roads[2]:
    d = fields(v)
    nid = uv(d, 1)
    pos = (0, 0)
    if 2 in d:
        pd = fields(d[2][0][1])
        pos = (uv(pd, 1), uv(pd, 2))
    nodes[nid] = pos
    adj[nid] = pv(one(d, 3, b"")) if 3 in d else []
print("== ROAD GRAPH ==")
print("edges=%d  nodes=%d" % (len(edges), len(nodes)))

xs = [p[0] for p in nodes.values()]
ys = [p[1] for p in nodes.values()]
print("node bbox: x %d..%d (%.1f m)  y %d..%d (%.1f m)"
      % (min(xs), max(xs), (max(xs) - min(xs)) / CM_PER_M, min(ys), max(ys), (max(ys) - min(ys)) / CM_PER_M))

# degree from the edge list and from the adjacency list (cross-check)
deg_e = collections.Counter()
for _, a, b, _t in edges:
    deg_e[a] += 1
    deg_e[b] += 1
deg_a = {n: len(v) for n, v in adj.items()}
print("sum(adjacency)/2 = %.1f   (edge count %d)" % (sum(deg_a.values()) / 2.0, len(edges)))
mismatch = sum(1 for n in nodes if deg_a.get(n, 0) != deg_e.get(n, 0))
print("nodes whose adjacency length != edge-incidence count: %d" % mismatch)
print("degree histogram (from edge incidence):")
for k in sorted(deg_e):
    if k <= 12:
        print("   deg %-2d  %6d  %5.1f%%" % (k, sum(1 for n in nodes if deg_e.get(n, 0) == k),
                                             100.0 * sum(1 for n in nodes if deg_e.get(n, 0) == k) / len(nodes)))
print("   deg 0   %6d" % sum(1 for n in nodes if deg_e.get(n, 0) == 0))

tc = collections.Counter(t for _, _, _, t in edges)
print("\nedge type frequencies (field 3.1.4; 0 = proto3 default/omitted):")
for t, n in sorted(tc.items()):
    print("   type %-3d %6d  %5.2f%%" % (t, n, 100.0 * n / len(edges)))

# lengths, per type
elen = []
elen_by_t = collections.defaultdict(list)
for _, a, b, t in edges:
    if a in nodes and b in nodes:
        L = math.dist(nodes[a], nodes[b])
        elen.append(L)
        elen_by_t[t].append(L)
print()
show("edge length (all)", elen, " m", 1 / CM_PER_M)
for t in sorted(elen_by_t):
    show("  edge length type %d" % t, elen_by_t[t], " m", 1 / CM_PER_M)
print()
hist("edge length", elen, 0, 100, 5, 1 / CM_PER_M, "m")

# turn angles at degree-2 nodes
inc = collections.defaultdict(list)
for i, (_, a, b, t) in enumerate(edges):
    inc[a].append((b, t))
    inc[b].append((a, t))
turn = []
turn_same = []
turn_diff = []
for n, lst in inc.items():
    if len(lst) != 2:
        continue
    (n1, t1), (n2, t2) = lst
    if n1 not in nodes or n2 not in nodes or n not in nodes:
        continue
    p, p1, p2 = nodes[n], nodes[n1], nodes[n2]
    v1 = (p1[0] - p[0], p1[1] - p[1])
    v2 = (p2[0] - p[0], p2[1] - p[1])
    if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9:
        continue
    a1 = math.atan2(v1[1], v1[0])
    a2 = math.atan2(v2[1], v2[0])
    d = abs(math.degrees(a2 - a1)) % 360
    if d > 180:
        d = 360 - d
    dev = 180.0 - d  # 0 = perfectly straight through
    turn.append(dev)
    (turn_same if t1 == t2 else turn_diff).append(dev)
print()
show("deg-2 turn deviation from straight", turn, " deg")
show("  ... same edge type both sides", turn_same, " deg")
show("  ... different edge type", turn_diff, " deg")
hist("deg-2 turn deviation", turn, 0, 45, 2.5, 1.0, "deg")

# intersection angles at degree>=3
ixa = []
for n, lst in inc.items():
    if len(lst) < 3 or n not in nodes:
        continue
    p = nodes[n]
    angs = []
    for m, _t in lst:
        if m in nodes:
            angs.append(math.degrees(math.atan2(nodes[m][1] - p[1], nodes[m][0] - p[0])) % 360)
    angs.sort()
    for i in range(len(angs)):
        d = (angs[(i + 1) % len(angs)] - angs[i]) % 360
        ixa.append(d)
print()
show("angle between adjacent arms at deg>=3", ixa, " deg")
hist("junction arm angle", ixa, 0, 200, 10, 1.0, "deg")

# road direction spectrum (is there a dominant grid?)
dirs = collections.Counter()
for _, a, b, t in edges:
    if a in nodes and b in nodes:
        dx = nodes[b][0] - nodes[a][0]
        dy = nodes[b][1] - nodes[a][1]
        if dx or dy:
            dirs[int(math.degrees(math.atan2(dy, dx)) % 180) // 10 * 10] += 1
print("\nroad heading histogram (mod 180 deg, 10-deg bins):")
for k in sorted(dirs):
    print("   %3d-%3d  %6d  %5.1f%%  %s" % (k, k + 10, dirs[k], 100.0 * dirs[k] / len(elen),
                                            "#" * int(200.0 * dirs[k] / len(elen))))

# ------------------------------------------------ field 5/6: water & extent -
print("\n== FIELD 5 (map extent?) ==")
print("  raw:", pv(one(top, 5)))
print("\n== FIELD 6 (4 polylines: water bodies / coast / river) ==")
for _, v in top[6]:
    d = fields(v)
    P = pts(one(d, 2, b""))
    a = abs(shoelace(P)) / (CM_PER_M ** 2)
    seg = [math.dist(P[i], P[i + 1]) / CM_PER_M for i in range(len(P) - 1)]
    print("  id=%d pts=%d  bbox x %d..%d y %d..%d  closed-area=%.0f m2  seg len mean=%.1f m med=%.1f m"
          % (uv(d, 1), len(P), min(p[0] for p in P), max(p[0] for p in P),
             min(p[1] for p in P), max(p[1] for p in P), a,
             (sum(seg) / len(seg)) if seg else 0, sorted(seg)[len(seg) // 2] if seg else 0))
    print("     touches extent(>=499000 or <=1000): %s"
          % sum(1 for p in P if p[0] >= 499000 or p[1] >= 499000 or p[0] <= 1000 or p[1] <= 1000))

# ------------------------------------------------------- field 7: markers ---
print("\n== FIELD 7 (17 point objects: id, pos, scale, kind) ==")
f7 = []
for _, v in top[7]:
    d = fields(v)
    pd = fields(one(d, 2, b""))
    f7.append((uv(d, 1), (uv(pd, 1), uv(pd, 2)), f32(one(d, 3)) if 3 in d else None, uv(d, 4)))
for r in sorted(f7):
    print("   id=%-3d pos=(%7d,%7d) = (%7.1f,%7.1f) m  scale=%s kind=%d"
          % (r[0], r[1][0], r[1][1], r[1][0] / CM_PER_M, r[1][1] / CM_PER_M, r[2], r[3]))

# ------------------------------------------------------ field 8: buildings --
print("\n== BUILDINGS (field 8) ==")
B = []
for _, v in top[8]:
    d = fields(v)
    P = pts(one(d, 2, b""))
    ent = None
    if 6 in d:
        ed = fields(d[6][0][1])
        ent = (uv(ed, 1), uv(ed, 2))
    B.append(dict(id=uv(d, 1), poly=P,
                  name=one(d, 3, b"").decode("utf8", "replace"),
                  cat=uv(d, 4), label=one(d, 5, b"").decode("utf8", "replace"),
                  ent=ent, f7=uv(d, 7), f8=uv(d, 8), f9=uv(d, 9), f10=uv(d, 10)))
print("count=%d" % len(B))
vc = collections.Counter(len(b["poly"]) for b in B)
print("vertex-count histogram:", dict(sorted(vc.items())))
areas = [abs(shoelace(b["poly"])) for b in B if len(b["poly"]) >= 3]
show("building footprint area", areas, " m2", 1 / CM_PER_M ** 2)
hist("building area", areas, 0, 600, 50, 1 / CM_PER_M ** 2, "m2")

# rectangularity + aspect + orientation
rect, aspect, longs, shorts, orient = [], [], [], [], []
for b in B:
    P = b["poly"]
    if len(P) < 3:
        continue
    a = abs(shoelace(P))
    ra, w, h, ang = min_area_rect(P)
    if ra > 0:
        rect.append(a / ra)
        b["obb"] = (w, h, ang)
        longs.append(w)
        shorts.append(h)
        if h > 0:
            aspect.append(w / h)
        orient.append(math.degrees(ang) % 180)
show("rectangularity (area / min-area-rect)", rect)
hist("rectangularity", rect, 0.5, 1.02, 0.02)
show("OBB long side", longs, " m", 1 / CM_PER_M)
show("OBB short side", shorts, " m", 1 / CM_PER_M)
show("OBB aspect long/short", aspect)

# 4-gon right-angle check
ortho = []
for b in B:
    P = b["poly"]
    if len(P) != 4:
        continue
    worst = 0.0
    for i in range(4):
        a0 = P[i - 1]
        a1 = P[i]
        a2 = P[(i + 1) % 4]
        v1 = (a0[0] - a1[0], a0[1] - a1[1])
        v2 = (a2[0] - a1[0], a2[1] - a1[1])
        if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9:
            continue
        cosang = (v1[0] * v2[0] + v1[1] * v2[1]) / (math.hypot(*v1) * math.hypot(*v2))
        cosang = max(-1.0, min(1.0, cosang))
        worst = max(worst, abs(math.degrees(math.acos(cosang)) - 90.0))
    ortho.append(worst)
show("quad: worst corner dev from 90deg", ortho, " deg")

print("\nbuilding category enum (8.4) x label (8.5) -- label set per category:")
cat_lab = collections.defaultdict(collections.Counter)
for b in B:
    cat_lab[b["cat"]][b["label"]] += 1
for c in sorted(cat_lab):
    labs = cat_lab[c]
    tot = sum(labs.values())
    top5 = ", ".join("%s(%d)" % (k, v) for k, v in labs.most_common(8))
    print("   cat %-3d n=%-5d distinct=%-4d  %s" % (c, tot, len(labs), top5[:150]))

print("\nfield 8.7 (rare):", collections.Counter(b["f7"] for b in B))
print("field 8.8 histogram:", dict(sorted(collections.Counter(b["f8"] for b in B).items())))
print("field 8.9 histogram:", dict(sorted(collections.Counter(b["f9"] for b in B).items())))
print("field 8.10 histogram:", dict(sorted(collections.Counter(b["f10"] for b in B).items())))
print("\n8.9 vs footprint area (mean m2 per 8.9 value):")
g = collections.defaultdict(list)
for b in B:
    if len(b["poly"]) >= 3:
        g[b["f9"]].append(abs(shoelace(b["poly"])) / CM_PER_M ** 2)
for k in sorted(g):
    print("   8.9=%-3d n=%-5d mean area=%7.1f m2  median=%7.1f" % (k, len(g[k]), sum(g[k]) / len(g[k]),
                                                                   sorted(g[k])[len(g[k]) // 2]))
print("\n8.8 vs category 8.4 crosstab (rows 8.8):")
ct = collections.defaultdict(collections.Counter)
for b in B:
    ct[b["f8"]][b["cat"]] += 1
for k in sorted(ct):
    print("   8.8=%-3d %s" % (k, dict(sorted(ct[k].items()))))

# ------------------------------------------- spatial index over road edges --
CELL = 5000  # 50 m cells
grid = collections.defaultdict(list)
segs = []
for _, a, b, t in edges:
    if a in nodes and b in nodes:
        segs.append((nodes[a], nodes[b], t))
for i, (p, q, t) in enumerate(segs):
    x0, x1 = sorted((p[0], q[0]))
    y0, y1 = sorted((p[1], q[1]))
    for cx in range(x0 // CELL, x1 // CELL + 1):
        for cy in range(y0 // CELL, y1 // CELL + 1):
            grid[(cx, cy)].append(i)


def seg_dist(pt, a, b):
    ax, ay = a
    bx, by = b
    dx, dy = bx - ax, by - ay
    L2 = dx * dx + dy * dy
    if L2 == 0:
        return math.dist(pt, a), 0.0
    t = ((pt[0] - ax) * dx + (pt[1] - ay) * dy) / L2
    t = max(0.0, min(1.0, t))
    return math.hypot(pt[0] - (ax + t * dx), pt[1] - (ay + t * dy)), math.atan2(dy, dx)


def nearest_seg(pt, maxr=6):
    cx, cy = int(pt[0]) // CELL, int(pt[1]) // CELL
    best = (1e18, None, None)
    for r in range(0, maxr + 1):
        found = False
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                if r > 0 and max(abs(dx), abs(dy)) != r:
                    continue
                for i in grid.get((cx + dx, cy + dy), ()):
                    p, q, t = segs[i]
                    d, ang = seg_dist(pt, p, q)
                    if d < best[0]:
                        best = (d, ang, t)
                        found = True
        if best[1] is not None and best[0] <= r * CELL:
            break
        if r >= maxr:
            break
        _ = found
    return best


print("\n== BUILDING <-> ROAD RELATION ==")
setback_c, setback_v, align, ent_d, ent_edge = [], [], [], [], []
near_type = collections.Counter()
for b in B:
    P = b["poly"]
    if len(P) < 3:
        continue
    c = centroid(P)
    d, ang, t = nearest_seg(c)
    if ang is None:
        continue
    setback_c.append(d)
    near_type[t] += 1
    dv = min(nearest_seg(v)[0] for v in P)
    setback_v.append(dv)
    if "obb" in b:
        oa = math.degrees(b["obb"][2]) % 180
        ra = math.degrees(ang) % 180
        diff = abs(oa - ra) % 180
        diff = min(diff, 180 - diff)
        diff = min(diff, abs(90 - diff))  # fold: aligned OR perpendicular both count as "axis aligned"
        align.append(min(abs(oa - ra) % 180, 180 - (abs(oa - ra) % 180)))
    if b["ent"]:
        de, _a2, _t2 = nearest_seg(b["ent"])
        ent_d.append(de)
        # distance from entrance to the building outline
        db = min(seg_dist(b["ent"], P[i], P[(i + 1) % len(P)])[0] for i in range(len(P)))
        ent_edge.append(db)
show("centroid -> nearest road distance", setback_c, " m", 1 / CM_PER_M)
hist("centroid setback", setback_c, 0, 40, 2.5, 1 / CM_PER_M, "m")
show("nearest polygon vertex -> road", setback_v, " m", 1 / CM_PER_M)
hist("vertex setback", setback_v, 0, 30, 2, 1 / CM_PER_M, "m")
show("|OBB heading - nearest road heading|", align, " deg")
hist("building-road misalignment", align, 0, 90, 5, 1.0, "deg")
show("entrance -> nearest road distance", ent_d, " m", 1 / CM_PER_M)
hist("entrance to road", ent_d, 0, 30, 2, 1 / CM_PER_M, "m")
show("entrance -> own polygon outline", ent_edge, " m", 1 / CM_PER_M)
print("nearest-road edge type for building centroids:", dict(sorted(near_type.items())))

# ------------------------------------------------------- field 9: lots ------
print("\n== FIELD 9 (lot / land-use groups) ==")
allots = []
for gi, (_, v) in enumerate(top[9]):
    d = fields(v)
    gtype = uv(d, 1)
    lots = []
    for _, lv in d.get(2, []):
        ld = fields(lv)
        P = pts(one(ld, 2, b""))
        lots.append(dict(id=uv(ld, 1), poly=P, t3=uv(ld, 3), t4=uv(ld, 4), t5=uv(ld, 5)))
    ar = [abs(shoelace(l["poly"])) / CM_PER_M ** 2 for l in lots if len(l["poly"]) >= 3]
    print("  group %-2d field9.1=%-3d lots=%-5d  sub-type(9.2.3) set=%s  9.2.4=%s 9.2.5=%s"
          % (gi, gtype, len(lots),
             dict(sorted(collections.Counter(l["t3"] for l in lots).items())),
             dict(sorted(collections.Counter(l["t4"] for l in lots).items())),
             dict(sorted(collections.Counter(l["t5"] for l in lots).items()))))
    if ar:
        print("      area m2: n=%d mean=%.0f med=%.0f min=%.0f max=%.0f ; verts med=%d max=%d"
              % (len(ar), sum(ar) / len(ar), sorted(ar)[len(ar) // 2], min(ar), max(ar),
                 sorted(len(l["poly"]) for l in lots)[len(lots) // 2],
                 max(len(l["poly"]) for l in lots)))
    allots.extend(lots)
la = [abs(shoelace(l["poly"])) for l in allots if len(l["poly"]) >= 3]
show("lot area (all groups)", la, " m2", 1 / CM_PER_M ** 2)
hist("lot area", la, 0, 5000, 250, 1 / CM_PER_M ** 2, "m2")
show("lot vertex count", [len(l["poly"]) for l in allots])
hist("lot vertex count", [len(l["poly"]) for l in allots], 0, 40, 2)

# lot vs building packing
tot_b = sum(areas) / CM_PER_M ** 2
tot_l = sum(la) / CM_PER_M ** 2
print("total building footprint = %.0f m2 ; total lot area = %.0f m2 ; ratio = %.3f"
      % (tot_b, tot_l, tot_b / tot_l if tot_l else 0))

# ------------------------------------------------------ field 10: districts -
print("\n== FIELD 10 (districts) ==")
for _, v in top[10]:
    d = fields(v)
    P = []
    if 5 in d:
        sd = fields(d[5][0][1])
        P = pts(one(sd, 1, b""))
    a = abs(shoelace(P)) / CM_PER_M ** 2 if len(P) >= 3 else 0
    ad = fields(one(d, 4, b"")) if 4 in d else {}
    print("  id=%d name=%r alt=%r verts=%d area=%.0f m2 (%.2f ha) anchor=(%.1f,%.1f) m"
          % (uv(d, 1), one(d, 2, b"").decode(), one(d, 3, b"").decode() if 3 in d else None,
             len(P), a, a / 1e4, uv(ad, 1) / CM_PER_M, uv(ad, 2) / CM_PER_M))
    print("     desc=%r" % one(d, 6, b"").decode()[:400])
    if len(P) >= 3:
        seg = [math.dist(P[i], P[(i + 1) % len(P)]) / CM_PER_M for i in range(len(P))]
        print("     boundary seg len mean=%.1f m med=%.1f m min=%.1f max=%.1f ; perimeter=%.0f m ; compactness 4piA/P^2=%.3f"
              % (sum(seg) / len(seg), sorted(seg)[len(seg) // 2], min(seg), max(seg),
                 sum(seg), 4 * math.pi * a / (sum(seg) ** 2)))

# ---------------------------------------------------- field 11: decorations -
print("\n== FIELD 11 (decorations) ==")
dec = fields(one(top, 11))
groups = {}
for fn in sorted(dec):
    for _, v in dec[fn]:
        d = fields(v)
        names, inst, polys = [], [], []
        shapeB = any(wt == 5 for wt, _ in d.get(2, []))
        if shapeB:
            # {1:{1:x,2:y}, 2:f32 scale}  -- one standalone decoration
            pd = fields(d[1][0][1])
            inst.append((None, (uv(pd, 1), uv(pd, 2)), f32(d[2][0][1])))
        else:
            names = [s.decode("utf8", "replace") for wt, s in d.get(1, []) if wt == 2]
            for wt, iv in d.get(2, []):
                if wt != 2:
                    continue
                idd = fields(iv)
                if 2 in idd:
                    pd = fields(idd[2][0][1])
                    inst.append((uv(idd, 1), (uv(pd, 1), uv(pd, 2)),
                                 f32(idd[3][0][1]) if 3 in idd else None))
            for wt, pvv in d.get(3, []):
                if wt != 2:
                    continue
                pd2 = fields(pvv)
                polys.append(pts(one(pd2, 1, b"")))
        groups.setdefault(fn, dict(names=[], inst=[], polys=[]))
        groups[fn]["names"].extend(names)
        groups[fn]["inst"].extend(inst)
        groups[fn]["polys"].extend(polys)
for fn, g in sorted(groups.items()):
    print("  11.%-2d  assets=%s  instances=%d  polys=%d" % (fn, g["names"], len(g["inst"]), len(g["polys"])))
    if g["inst"]:
        vi = collections.Counter(i[0] for i in g["inst"])
        sc = [i[2] for i in g["inst"] if i[2] is not None]
        X = [i[1][0] for i in g["inst"]]
        Y = [i[1][1] for i in g["inst"]]
        print("     variant histogram: %s" % dict(sorted(vi.items(), key=lambda kv: (kv[0] is None, kv[0]))))
        print("     scale set: %s" % sorted(set(round(s, 4) for s in sc))[:12])
        print("     bbox: x %.1f..%.1f m  y %.1f..%.1f m"
              % (min(X) / CM_PER_M, max(X) / CM_PER_M, min(Y) / CM_PER_M, max(Y) / CM_PER_M))
    for P in g["polys"]:
        if len(P) >= 3:
            print("     poly verts=%d area=%.0f m2" % (len(P), abs(shoelace(P)) / CM_PER_M ** 2))

# tree spacing (nearest-neighbour) for the big group
for fn, g in sorted(groups.items()):
    if len(g["inst"]) < 50:
        continue
    P = [i[1] for i in g["inst"]]
    C = 2000
    gr = collections.defaultdict(list)
    for i, p in enumerate(P):
        gr[(p[0] // C, p[1] // C)].append(i)
    nn = []
    for i, p in enumerate(P):
        best = 1e18
        cx, cy = p[0] // C, p[1] // C
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for j in gr.get((cx + dx, cy + dy), ()):
                    if j != i:
                        dd = math.dist(p, P[j])
                        if dd < best:
                            best = dd
        if best < 1e17:
            nn.append(best)
    show("11.%d nearest-neighbour spacing" % fn, nn, " m", 1 / CM_PER_M)
    hist("11.%d NN spacing" % fn, nn, 0, 40, 2, 1 / CM_PER_M, "m")

# ------------------------------------------------- remaining scalar fields --
print("\n== NON-GEOMETRIC FIELDS (summary) ==")
for fn in sorted(top):
    if fn in (1, 2, 3, 5, 6, 7, 8, 9, 10, 11):
        continue
    print("  field %d: %d occurrence(s)" % (fn, len(top[fn])))
print("\n-- field 13 (races) --")
for _, v in top[13]:
    d = fields(v)
    ages = fields(one(d, 4, b"")) if 4 in d else {}
    fh = fields(one(d, 5, b"")) if 5 in d else {}
    mh = fields(one(d, 6, b"")) if 6 in d else {}
    print("   id=%d %-10s prop=%s ages(school/youngAdult/settled/elderly/max)=%s/%s/%s/%s/%s "
          "femaleH(baby/child/adult)=%s/%s/%s maleH=%s/%s/%s gen=%s"
          % (uv(d, 1), one(d, 3, b"").decode(), f32(d[2][0][1]) if 2 in d else None,
             uv(ages, 1), uv(ages, 2), uv(ages, 3), uv(ages, 4), uv(ages, 5),
             uv(fh, 1), uv(fh, 2), uv(fh, 3), uv(mh, 1), uv(mh, 2), uv(mh, 3),
             one(d, 7, b"").decode()))
print("\n-- field 10 district names/field 18 factions --")
for _, v in top[18]:
    d = fields(v)
    roles = [one(fields(rv), 2, b"").decode() for _, rv in d.get(5, [])]
    print("   id=%d %-24r %-20r roles=%s" % (uv(d, 1), one(d, 2, b"").decode(),
                                             one(d, 3, b"").decode(), roles))
print("\n-- field 22 calendar / 23 / 20 / 19 --")
for fn in (19, 20, 22, 23):
    if fn not in top:
        continue
    d = fields(one(top, fn))
    out = {}
    for k in sorted(d):
        vals = []
        for wt, v in d[k]:
            if wt == 0:
                vals.append(v)
            else:
                s = v.decode("utf8", "replace") if all(32 <= c < 127 for c in v) else pv(v)
                vals.append(s)
        out[k] = vals
    print("   field %d: %s" % (fn, out))
