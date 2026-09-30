# redteam:ftg — does FTG's built outline extend along its main roads? (our own analysis; reads the captured
# protobuf payloads as data via the project's tools/pb_raw.py; no reference code involved)
import sys, math, collections
sys.path.insert(0, 'tools')
from pb_raw import parse, varint

def zz(u): return (u >> 1) ^ -(u & 1)
def pv(v):
    i, vs = 0, []
    while i < len(v):
        x, i = varint(v, i); vs.append(x)
    return vs
def fields(v):
    d = collections.defaultdict(list)
    for fn, wt, x in parse(v): d[fn].append((wt, x))
    return d
def one(d, fn, default=None): return d[fn][0][1] if fn in d else default
def uv(d, fn, default=0): return d[fn][0][1] if fn in d else default
def pts(v):
    vs = [zz(x) for x in pv(v)]
    return [(vs[i] / 100.0, vs[i + 1] / 100.0) for i in range(0, len(vs) - 1, 2)]  # metres

def inside(p, P):
    x, y = p; c = False
    for i in range(len(P)):
        x1, y1 = P[i]; x2, y2 = P[(i + 1) % len(P)]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
    return c

def decode(path):
    top = fields(open(path, 'rb').read())
    R = fields(one(top, 3)); nodes = {}; edges = []
    for _, v in R[2]:
        d = fields(v); pos = (0.0, 0.0)
        if 2 in d:
            pd = fields(one(d, 2)); pos = (zz(uv(pd, 1)) / 100.0, zz(uv(pd, 2)) / 100.0)
        nodes[uv(d, 1)] = pos
    for _, v in R[1]:
        d = fields(v); edges.append((uv(d, 2), uv(d, 3), uv(d, 4)))
    C = []
    for _, v in top[8]:
        d = fields(v); P = pts(one(d, 2))
        if len(P) > 1 and P[0] == P[-1]: P = P[:-1]
        C.append((sum(p[0] for p in P) / len(P), sum(p[1] for p in P) / len(P)))
    W = [pts(one(fields(v), 2)) for _, v in top[6]]
    return nodes, edges, C, W

def analyse(name, path, nsec=16):
    nodes, edges, C, W = decode(path)
    # centre: building centre of mass of the core (two trims)
    cx, cy = 0.0, 0.0
    for rcut in (1e9, 1200.0, 900.0):
        S = [p for p in C if math.dist(p, (cx, cy)) <= rcut]
        cx = sum(p[0] for p in S) / len(S); cy = sum(p[1] for p in S) / len(S)
    sec = lambda p: int(((math.degrees(math.atan2(p[1] - cy, p[0] - cx)) % 360) / (360 / nsec)))
    rs = collections.defaultdict(list)
    for p in C: rs[sec(p)].append(math.dist(p, (cx, cy)))
    # water fraction per sector: sample rings 300..1200 m
    wf = {}
    for s in range(nsec):
        tot = wat = 0
        for rr in range(300, 1201, 100):
            for k in range(5):
                a = math.radians((s + (k + 0.5) / 5) * 360 / nsec)
                q = (cx + rr * math.cos(a), cy + rr * math.sin(a)); tot += 1
                if any(inside(q, P) for P in W): wat += 1
        wf[s] = wat / tot
    # main roads (type 1) crossing the 400..1500 m annulus, by sector (edge midpoints)
    mr = collections.Counter()
    for a, b, t in edges:
        if t != 1: continue
        m = ((nodes[a][0] + nodes[b][0]) / 2, (nodes[a][1] + nodes[b][1]) / 2)
        if 400 <= math.dist(m, (cx, cy)) <= 1500: mr[sec(m)] += 1
    print('==', name, 'buildings', len(C), 'centre (%.0f, %.0f) m' % (cx, cy))
    rows = []
    for s in range(nsec):
        r = sorted(rs[s]); r90 = r[int(0.9 * (len(r) - 1))] if r else 0
        rows.append((s, len(r), r90, wf[s], mr[s]))
        print('  sector %2d (%5.1f-%5.1f deg) bldg %4d  r90 %6.0f m  water %.2f  mainroad-edges(400-1500m) %3d'
              % (s, s * 360 / nsec, (s + 1) * 360 / nsec, len(r), r90, wf[s], mr[s]))
    land = [x for x in rows if x[3] < 0.2 and x[1] >= 20]
    wr = [x[2] for x in land if x[4] > 0]; nr = [x[2] for x in land if x[4] == 0]
    mean = lambda v: sum(v) / len(v) if v else float('nan')
    allr = [x[2] for x in land]
    sd = (sum((v - mean(allr)) ** 2 for v in allr) / len(allr)) ** 0.5 if allr else float('nan')
    print('  land sectors (water<0.2, >=20 bldgs): %d; r90 with main road: n=%d mean %.0f m; without: n=%d mean %.0f m; ratio %.2f; CV(r90) over land sectors %.2f'
          % (len(land), len(wr), mean(wr), len(nr), mean(nr), mean(wr) / mean(nr) if nr and wr else float('nan'), sd / mean(allr)))

if __name__ == '__main__':
    analyse('galeiaward-rl60', 'captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin')
    analyse('nevervalley-rl100', 'captures/ftg/2026-09-25T10-13-51/session/network/bodies/intercept-0054-b39aab95.bin')
