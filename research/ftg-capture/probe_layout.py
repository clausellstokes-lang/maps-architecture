#!/usr/bin/env python3
"""Follow-up probes for the FTG layout blob: resolve the ambiguous fields
(7 = ?, 9.1 group semantics, 10.5 = district ring or label curve, 11.2/11.4/11.5),
and re-do the road/building measurements with the closed-ring artefact removed.

  python3 research/ftg-capture/probe_layout.py
"""
import sys, os, math, struct, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(ROOT, "tools"))
from pb_raw import parse, varint  # noqa: E402
sys.path.insert(0, HERE)
from analyse_layout import (fields, one, uv, pv, pts, f32, shoelace, centroid,  # noqa: E402
                            min_area_rect, show, hist, CM_PER_M, seg_dist)
import analyse_layout as A  # noqa: E402

top = A.top
B = A.B
nodes, edges, segs = A.nodes, A.edges, A.segs
print("\n\n############ PROBE 2 ############\n")


def dedup_ring(P):
    if len(P) > 1 and P[0] == P[-1]:
        return P[:-1]
    return P


def bbox(P):
    return (min(p[0] for p in P), min(p[1] for p in P), max(p[0] for p in P), max(p[1] for p in P))


def inside(pt, poly):
    x, y = pt
    c = False
    n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        if ((y1 > y) != (y2 > y)) and (x < (x2 - x1) * (y - y1) / (y2 - y1 + 1e-12) + x1):
            c = not c
    return c


# ---- 1. are building polygons stored as CLOSED rings? -----------------------
closed = sum(1 for b in B if len(b["poly"]) > 1 and b["poly"][0] == b["poly"][-1])
print("1) buildings whose first vertex == last vertex: %d / %d" % (closed, len(B)))
vc = collections.Counter(len(dedup_ring(b["poly"])) for b in B)
print("   TRUE vertex-count histogram: %s" % dict(sorted(vc.items())))
quad = [b for b in B if len(dedup_ring(b["poly"])) == 4]
worst = []
for b in quad:
    P = dedup_ring(b["poly"])
    w = 0.0
    for i in range(4):
        a0, a1, a2 = P[i - 1], P[i], P[(i + 1) % 4]
        v1 = (a0[0] - a1[0], a0[1] - a1[1])
        v2 = (a2[0] - a1[0], a2[1] - a1[1])
        if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9:
            continue
        cs = max(-1.0, min(1.0, (v1[0] * v2[0] + v1[1] * v2[1]) / (math.hypot(*v1) * math.hypot(*v2))))
        w = max(w, abs(math.degrees(math.acos(cs)) - 90.0))
    worst.append(w)
show("   quad worst-corner dev from 90deg", worst, " deg")
hist("quad corner dev", worst, 0, 20, 1, 1.0, "deg")

# side lengths of the pure quads
sides = []
for b in quad:
    P = dedup_ring(b["poly"])
    for i in range(4):
        sides.append(math.dist(P[i], P[(i + 1) % 4]))
show("   quad side length", sides, " m", 1 / CM_PER_M)
hist("quad side length", sides, 0, 40, 1, 1 / CM_PER_M, "m")

# ---- 2. settlement footprint --------------------------------------------
C = [centroid(b["poly"]) for b in B]
bx = bbox(C)
print("\n2) building-centroid bbox: x %.1f..%.1f m  y %.1f..%.1f m  -> %.0f x %.0f m"
      % (bx[0] / CM_PER_M, bx[2] / CM_PER_M, bx[1] / CM_PER_M, bx[3] / CM_PER_M,
         (bx[2] - bx[0]) / CM_PER_M, (bx[3] - bx[1]) / CM_PER_M))
cx = sum(p[0] for p in C) / len(C)
cy = sum(p[1] for p in C) / len(C)
print("   centre of mass: (%.1f, %.1f) m" % (cx / CM_PER_M, cy / CM_PER_M))
r = sorted(math.dist(p, (cx, cy)) for p in C)
print("   radius from CoM: p50=%.0f m p90=%.0f m p99=%.0f m max=%.0f m"
      % (r[len(r) // 2] / CM_PER_M, r[int(.9 * len(r))] / CM_PER_M,
         r[int(.99 * len(r))] / CM_PER_M, r[-1] / CM_PER_M))
# road node bbox excluding the long "outer" types
inner = [nodes[a] for _, a, b, t in edges if t not in (3,) and a in nodes]
inner += [nodes[b] for _, a, b, t in edges if t not in (3,) and b in nodes]
ib = bbox(inner)
print("   road-node bbox excluding type-3 edges: x %.0f..%.0f  y %.0f..%.0f m"
      % (ib[0] / CM_PER_M, ib[2] / CM_PER_M, ib[1] / CM_PER_M, ib[3] / CM_PER_M))

# ---- 3. field 7: polyline? wall? ----------------------------------------
print("\n3) field 7 as an ordered polyline (by id):")
f7 = sorted(A.f7)
P7 = [r[1] for r in f7]
for i in range(len(P7) - 1):
    print("   %2d->%2d  %7.1f m   heading %6.1f deg" % (
        f7[i][0], f7[i + 1][0], math.dist(P7[i], P7[i + 1]) / CM_PER_M,
        math.degrees(math.atan2(P7[i + 1][1] - P7[i][1], P7[i + 1][0] - P7[i][0])) % 360))

# ---- 4. districts: ring or label curve? ---------------------------------
print("\n4) districts")
dists = []
for _, v in top[10]:
    d = fields(v)
    P = []
    if 5 in d:
        sd = fields(d[5][0][1])
        P = pts(one(sd, 1, b""))
    ad = fields(one(d, 4, b"")) if 4 in d else {}
    dists.append(dict(id=uv(d, 1), name=one(d, 2, b"").decode(), poly=P,
                      anchor=(uv(ad, 1), uv(ad, 2))))
for dd in dists:
    P = dd["poly"]
    bb = bbox(P)
    n_in = sum(1 for p in C if inside(p, P))
    n_in_bb = sum(1 for p in C if bb[0] <= p[0] <= bb[2] and bb[1] <= p[1] <= bb[3])
    print("   %-16s verts=%-4d bbox x %.0f..%.0f y %.0f..%.0f m | closed-ring? first==last: %s"
          % (dd["name"], len(P), bb[0] / CM_PER_M, bb[2] / CM_PER_M, bb[1] / CM_PER_M, bb[3] / CM_PER_M,
             P[0] == P[-1]))
    print("      buildings with centroid INSIDE the ring: %d ; inside its bbox: %d ; |ring area|=%.2f ha"
          % (n_in, n_in_bb, abs(shoelace(P)) / 1e4 / CM_PER_M ** 2))
    print("      anchor inside ring: %s ; anchor=(%.0f,%.0f) m"
          % (inside(dd["anchor"], P), dd["anchor"][0] / CM_PER_M, dd["anchor"][1] / CM_PER_M))
# is field7 a subset of a district ring?
for dd in dists:
    s = set(dd["poly"])
    hit = sum(1 for p in P7 if p in s)
    if hit:
        print("   field-7 points that are also vertices of district %r: %d/%d" % (dd["name"], hit, len(P7)))

# ---- 5. lot groups: what are they? --------------------------------------
print("\n5) lot groups (field 9) -- geometry + what falls inside")
groups = []
for gi, (_, v) in enumerate(top[9]):
    d = fields(v)
    lots = []
    for _, lv in d.get(2, []):
        ld = fields(lv)
        lots.append(dict(id=uv(ld, 1), poly=pts(one(ld, 2, b"")), t3=uv(ld, 3),
                         t4=uv(ld, 4), t5=uv(ld, 5)))
    groups.append((uv(d, 1), lots))
trees = [i[1] for i in A.groups[9]["inst"]]
for gtype, lots in groups:
    tot = sum(abs(shoelace(l["poly"])) for l in lots if len(l["poly"]) >= 3) / CM_PER_M ** 2
    P = [p for l in lots for p in l["poly"]]
    bb = bbox(P)
    # sample-based containment (cost control): test every building, 400 trees
    nb = 0
    for c in C:
        for l in lots:
            if len(l["poly"]) >= 3 and inside(c, l["poly"]):
                nb += 1
                break
    nt = 0
    sample = trees[::10]
    for t in sample:
        for l in lots:
            if len(l["poly"]) >= 3 and inside(t, l["poly"]):
                nt += 1
                break
    closed_n = sum(1 for l in lots if len(l["poly"]) > 1 and l["poly"][0] == l["poly"][-1])
    print("   type %-3d lots=%-4d total=%9.1f ha  bbox %.0f..%.0f x %.0f..%.0f m  closedRings=%d/%d"
          % (gtype, len(lots), tot / 1e4, bb[0] / CM_PER_M, bb[2] / CM_PER_M,
             bb[1] / CM_PER_M, bb[3] / CM_PER_M, closed_n, len(lots)))
    print("        buildings inside: %d (%.1f%%)   trees inside (of %d sampled): %d (%.1f%%)"
          % (nb, 100.0 * nb / len(C), len(sample), nt, 100.0 * nt / len(sample)))

# ---- 6. 11.2/11.4/11.5 triples ------------------------------------------
print("\n6) decoration groups 11.2 / 11.4 / 11.5 (14 each)")
g2 = [i[1] for i in A.groups[2]["inst"]]
g4 = [i[1] for i in A.groups[4]["inst"]]
g5 = [i[1] for i in A.groups[5]["inst"]]
for i in range(14):
    d24 = math.dist(g2[i], g4[i]) / CM_PER_M
    d25 = math.dist(g2[i], g5[i]) / CM_PER_M
    n2 = A.nearest_seg(g2[i])
    print("   [%2d] 11.2=(%6.0f,%6.0f)  11.4=(%6.0f,%6.0f) d=%7.1f m  11.5=(%6.0f,%6.0f) d=%7.1f m"
          "  | 11.2 dist to nearest road=%.1f m (type %s)"
          % (i, g2[i][0] / CM_PER_M, g2[i][1] / CM_PER_M, g4[i][0] / CM_PER_M, g4[i][1] / CM_PER_M, d24,
             g5[i][0] / CM_PER_M, g5[i][1] / CM_PER_M, d25, n2[0] / CM_PER_M, n2[2]))
for nm, G in (("11.2", g2), ("11.4", g4), ("11.5", g5)):
    dmin = []
    for p in G:
        dmin.append(min(math.dist(p, q) for q in G if q != p))
    print("   %s pairwise nearest: min=%.0f m med=%.0f m max=%.0f m"
          % (nm, min(dmin) / CM_PER_M, sorted(dmin)[7] / CM_PER_M, max(dmin) / CM_PER_M))
    # distance to nearest water polyline (field 6)
    w = []
    for _, v in top[6]:
        dd = fields(v)
        w.append(pts(one(dd, 2, b"")))
    best = []
    for p in G:
        b2 = 1e18
        for poly in w:
            for i in range(len(poly) - 1):
                b2 = min(b2, seg_dist(p, poly[i], poly[i + 1])[0])
        best.append(b2 / CM_PER_M)
    print("        distance to nearest field-6 water polyline: min=%.1f med=%.1f max=%.1f m"
          % (min(best), sorted(best)[len(best) // 2], max(best)))

# ---- 7. road lengths: fine modes per type -------------------------------
print("\n7) road segment length -- fine modes (1 m bins) per edge type")
for t in sorted(set(e[3] for e in edges)):
    L = [math.dist(nodes[a], nodes[b]) / CM_PER_M for _, a, b, tt in edges if tt == t]
    c = collections.Counter(int(round(x)) for x in L)
    print("   type %-3d n=%-5d modes: %s" % (t, len(L),
                                             ", ".join("%dm x%d" % (k, v) for k, v in c.most_common(8))))

# ---- 8. turn angles restricted to <45 deg, per type ---------------------
print("\n8) deg-2 turn deviation restricted to <45 deg, per edge type")
inc = collections.defaultdict(list)
for i, (_, a, b, t) in enumerate(edges):
    inc[a].append((b, t))
    inc[b].append((a, t))
per = collections.defaultdict(list)
for n, lst in inc.items():
    if len(lst) != 2:
        continue
    (n1, t1), (n2, t2) = lst
    p, p1, p2 = nodes[n], nodes[n1], nodes[n2]
    v1 = (p1[0] - p[0], p1[1] - p[1])
    v2 = (p2[0] - p[0], p2[1] - p[1])
    if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9:
        continue
    d = abs(math.degrees(math.atan2(v2[1], v2[0]) - math.atan2(v1[1], v1[0]))) % 360
    if d > 180:
        d = 360 - d
    dev = 180.0 - d
    if t1 == t2:
        per[t1].append(dev)
for t in sorted(per):
    v = [x for x in per[t] if x < 45]
    allv = per[t]
    if not v:
        continue
    s = sorted(v)
    print("   type %-3d deg2 n=%-5d  <45deg n=%-5d  max=%.2f  p50=%.2f p90=%.2f p99=%.2f  |  >=45deg: %d (%.0f%%)"
          % (t, len(allv), len(v), max(v), s[len(s) // 2], s[int(.9 * len(s))], s[int(.99 * len(s))],
             len(allv) - len(v), 100.0 * (len(allv) - len(v)) / len(allv)))
    c = collections.Counter(min(44, int(x)) for x in v)
    print("        1-deg bins 10..20: %s" % {k: c.get(k, 0) for k in range(10, 21)})

# ---- 9. building frontage: alignment measured at the ENTRANCE -----------
print("\n9) building orientation vs the road its ENTRANCE faces")
al, front_d, ent_face = [], [], []
for b in B:
    if not b.get("ent") or "obb" not in b:
        continue
    d, ang, t = A.nearest_seg(b["ent"])
    if ang is None:
        continue
    oa = math.degrees(b["obb"][2]) % 180
    ra = math.degrees(ang) % 180
    diff = abs(oa - ra) % 180
    diff = min(diff, 180 - diff)
    al.append(diff)
    front_d.append(d)
    c = centroid(b["poly"])
    fa = math.degrees(math.atan2(b["ent"][1] - c[1], b["ent"][0] - c[0])) % 180
    e = abs(fa - ra) % 180
    ent_face.append(min(e, 180 - e))
show("   |OBB axis - entrance's road axis|", al, " deg")
hist("entrance-road alignment", al, 0, 90, 5, 1.0, "deg")
show("   |centroid->entrance dir - road dir|", ent_face, " deg")
hist("frontage direction vs road", ent_face, 0, 90, 5, 1.0, "deg")

# ---- 10. trees: inside forest polygons vs scattered ---------------------
print("\n10) trees inside the two forest polygons (11.9.3) vs outside")
fp = A.groups[9]["polys"]
tin, tout = [], []
for t in trees:
    if any(len(P) >= 3 and inside(t, P) for P in fp):
        tin.append(t)
    else:
        tout.append(t)
print("   inside forest polys: %d   outside: %d" % (len(tin), len(tout)))


def nn(P, cell=2000):
    gr = collections.defaultdict(list)
    for i, p in enumerate(P):
        gr[(p[0] // cell, p[1] // cell)].append(i)
    out = []
    for i, p in enumerate(P):
        best = 1e18
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for j in gr.get((p[0] // cell + dx, p[1] // cell + dy), ()):
                    if j != i:
                        best = min(best, math.dist(p, P[j]))
        if best < 1e17:
            out.append(best)
    return out


show("   forest tree NN spacing", nn(tin), " m", 1 / CM_PER_M)
hist("forest tree NN", nn(tin), 0, 30, 1, 1 / CM_PER_M, "m")
show("   scattered tree NN spacing", nn(tout), " m", 1 / CM_PER_M)
# are trees on a lattice?
gx = collections.Counter(p[0] % 1000 // 100 for p in trees)
print("   tree x mod 10 m, 1 m bins: %s" % dict(sorted(gx.items())))
print("   distinct tree x values: %d of %d instances" % (len(set(p[0] for p in trees)), len(trees)))

# ---- 11. blocks (9.1=18) vs buildings -----------------------------------
print("\n11) block lots (field 9 group with type 18) vs the buildings inside them")
blocks = None
for gtype, lots in groups:
    if gtype == 18:
        blocks = lots
if blocks:
    cnt = []
    for l in blocks:
        P = l["poly"]
        if len(P) < 3:
            continue
        bb = bbox(P)
        n = 0
        for c in C:
            if bb[0] <= c[0] <= bb[2] and bb[1] <= c[1] <= bb[3] and inside(c, P):
                n += 1
        cnt.append((n, abs(shoelace(P)) / CM_PER_M ** 2))
    show("   buildings per block lot", [c[0] for c in cnt])
    print("   blocks with 0 buildings: %d / %d" % (sum(1 for c in cnt if c[0] == 0), len(cnt)))
    cov = [sum(abs(shoelace(b["poly"])) for b in B) for _ in (0,)]
    occ = [c for c in cnt if c[0] > 0]
    if occ:
        print("   occupied blocks: n=%d  mean area=%.0f m2  mean buildings=%.2f  -> %.0f m2/building"
              % (len(occ), sum(c[1] for c in occ) / len(occ),
                 sum(c[0] for c in occ) / len(occ),
                 sum(c[1] for c in occ) / max(1, sum(c[0] for c in occ))))
