"""Edge-length modes by edge type for FTG layout payloads (zig-zag sint32 coordinates, 1 unit = 1 cm).

Adapted from critic2/zigzag_rederive.py + critic2/zigzag_probe_roads_lots.py (same decoding), but takes the payload
paths on the command line so two captures can be compared side by side:

  python3 research/ftg-capture/roadlength100/edge_modes.py <label>=<layout.bin> [<label>=<layout.bin> ...]

Run from the project root (imports tools/pb_raw.py). Decodes only the payload; no captured JavaScript is used.
"""
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

TARGETS = (10, 15, 20, 25, 30, 50, 60, 100)

def load(path):
    b = open(path, 'rb').read(); top = fields(b)
    R = fields(one(top, 3)); edges = []; nodes = {}
    for _, v in R[1]:
        d = fields(v); edges.append((uv(d, 1), uv(d, 2), uv(d, 3), uv(d, 4)))
    for _, v in R[2]:
        d = fields(v); nid = uv(d, 1); pos = (0, 0)
        if 2 in d:
            pd = fields(one(d, 2)); pos = (zz(uv(pd, 1)), zz(uv(pd, 2)))
        nodes[nid] = pos
    dist = [one(fields(v), 2, b'').decode() for _, v in top[10]]
    lots = sum(len(fields(v).get(2, [])) for _, v in top[9])
    return dict(path=path, bytes=len(b), name=one(top, 2, b'').decode(), edges=edges, nodes=nodes,
                n_build=len(top[8]), n_tower=len(top[7]), n_water=len(top[6]), n_lotgroups=len(top[9]), n_lots=lots, districts=dist)

def length(S, e): return math.dist(S['nodes'][e[1]], S['nodes'][e[2]]) / 100

def summary(label, S):
    E, N = S['edges'], S['nodes']
    print(f'=== {label}: {S["name"]}  ({S["path"]}, {S["bytes"]} bytes)')
    xs = [p[0] for p in N.values()]; ys = [p[1] for p in N.values()]
    deg = collections.Counter()
    for _, a, b, _t in E: deg[a] += 1; deg[b] += 1
    tot = sum(length(S, e) for e in E)
    print(f'edges {len(E)}  nodes {len(N)}  buildings {S["n_build"]}  towers {S["n_tower"]}  water polys {S["n_water"]}  '
          f'lot groups {S["n_lotgroups"]} / lots {S["n_lots"]}  districts {S["districts"]}')
    print('node bbox m: x %.1f..%.1f y %.1f..%.1f ; total road length %.1f km' % (min(xs) / 100, max(xs) / 100, min(ys) / 100, max(ys) / 100, tot / 1000))
    print('degree hist', dict(sorted(collections.Counter(deg.get(n, 0) for n in N).items())))
    L = collections.defaultdict(list)
    for e in E: L[e[3]].append(length(S, e))
    print('per type: n, total km, median, top modes (1 m bins, value x count, mean of bin), counts within +-0.5 m of targets', TARGETS)
    for t in sorted(L):
        v = sorted(L[t]); c = collections.Counter(int(round(x)) for x in v)
        modes = []
        for m, k in c.most_common(6):
            inb = [x for x in v if abs(x - m) <= 0.5]
            modes.append('%d x%d (%.2f)' % (m, k, sum(inb) / len(inb)))
        tg = ' '.join('%d:%d' % (T, sum(1 for x in v if abs(x - T) <= 0.5)) for T in TARGETS)
        print('  type %2d n=%5d  %6.1f km  median %6.1f m  modes: %s' % (t, len(v), sum(v) / 1000, v[len(v) // 2], ', '.join(modes)))
        print('          targets: %s' % tg)
    return L

def straightness(S):
    E, N = S['edges'], S['nodes']
    inc = collections.defaultdict(list)
    for _, a, b, t in E: inc[a].append((b, t)); inc[b].append((a, t))
    def straight_at(nd, t):
        if len(inc[nd]) != 2: return None
        (n1, t1), (n2, t2) = inc[nd]
        if t1 != t or t2 != t: return None
        p, p1, p2 = N[nd], N[n1], N[n2]
        v1 = (p1[0] - p[0], p1[1] - p[1]); v2 = (p2[0] - p[0], p2[1] - p[1])
        if math.hypot(*v1) < 1e-9 or math.hypot(*v2) < 1e-9: return None
        d = abs(math.degrees(math.atan2(v2[1], v2[0]) - math.atan2(v1[1], v1[0]))) % 360
        if d > 180: d = 360 - d
        return (180 - d) < 0.05
    print('deg-2 straightness (<0.05 deg) and collinear run-length modes (chains through straight deg-2 nodes):')
    for t in sorted(set(e[3] for e in E)):
        flags = [straight_at(nd, t) for nd in inc]; flags = [f for f in flags if f is not None]
        adj = collections.defaultdict(list)
        for _, a, b, tt in E:
            if tt == t: adj[a].append(b); adj[b].append(a)
        seen = set(); runs = collections.Counter()
        for _, a, b, tt in E:
            if tt != t: continue
            key = (min(a, b), max(a, b))
            if key in seen: continue
            Lr = math.dist(N[a], N[b]); seen.add(key)
            for start, prev in ((a, b), (b, a)):
                cur, pr = start, prev
                while straight_at(cur, t):
                    nxt = [m for m in adj[cur] if m != pr]
                    if not nxt: break
                    nx = nxt[0]; k = (min(cur, nx), max(cur, nx))
                    if k in seen: break
                    seen.add(k); Lr += math.dist(N[cur], N[nx]); pr, cur = cur, nx
            runs[int(round(Lr / 100))] += 1
        if flags or t in (0, 1, 4):
            print('  type %2d deg2=%4d straight=%4d (%.0f%%)  run-length modes (m): %s' % (t, len(flags), sum(flags), 100 * sum(flags) / max(1, len(flags)), runs.most_common(6)))

def junction_spacing(S, t):
    """Distance along same-type runs between junctions (deg>=3 or deg 1) — the 'branch after N segments' signature."""
    E, N = S['edges'], S['nodes']
    adj = collections.defaultdict(list); deg = collections.Counter()
    for _, a, b, tt in E:
        deg[a] += 1; deg[b] += 1
        if tt == t: adj[a].append(b); adj[b].append(a)
    seen = set(); spans = collections.Counter(); segs = collections.Counter()
    for a in list(adj):
        if deg[a] == 2: continue
        for b in adj[a]:
            if (a, b) in seen: continue
            pr, cur, Ls, k = a, b, math.dist(N[a], N[b]), 1; seen.add((a, b)); seen.add((b, a))
            while deg[cur] == 2 and len(adj[cur]) == 2:
                nx = adj[cur][0] if adj[cur][1] == pr else adj[cur][1]
                if (cur, nx) in seen: break
                seen.add((cur, nx)); seen.add((nx, cur)); Ls += math.dist(N[cur], N[nx]); k += 1; pr, cur = cur, nx
            spans[int(round(Ls / 100))] += 1; segs[k] += 1
    print('  type %d junction-to-junction spans (m): %s ; edges per span: %s' % (t, spans.most_common(8), sorted(segs.items())[:8]))

if __name__ == '__main__':
    runs = []
    for arg in sys.argv[1:]:
        label, path = arg.split('=', 1); S = load(path); runs.append((label, S))
        summary(label, S); straightness(S)
        for t in (0, 4): junction_spacing(S, t)
        print()
