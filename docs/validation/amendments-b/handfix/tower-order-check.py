#!/usr/bin/env python3
# tower-order-check.py — lane handfix-b/repair-model-r1, Fable continuation (2026-09-27): the executed check behind
# J-A28.26 as amended (the composed towers' clip order, §2.6's stage-3 contract). Stdlib only; run: python3 tower-order-check.py [cases] [seed].
# Exit 0 = every case passed H1–H4 (see the docstring). Results at 3000 cases: seeds 1 and 2, 0 failures (repair-model-r1-report.md, Fable continuation).
"""Randomised raster check of §2.6's composed-tower clip order as repair-r1-model wrote it (handfix-b, Fable continuation).

Model (one storey, on an integer raster): wings are axis-aligned rectangles (half-open pixel sets, so tiled wings share no
pixel); towers are disks. Wing order is given; a wing whose pixel set lies wholly inside another's is taken after that
container (identical sets keep wing order). Towers join per the r1 text:
  - a tower wholly inside a wing's set and overlapping no wing taken before the FIRST such wing (its container) is taken
    directly after that container, towers sharing a container in towers order;
  - every other tower is taken before all the wings, in towers order;
  - no tower's set lies wholly inside another tower's (compositions that violate it are rejected by the generator here).
Seed clip: each ring's piece = its set minus the union of every set before it in the clip order.
Checks per case:
  H1  no piece has a hole (a removed component inside the ring that does not touch the ring's boundary);
  H2  each tower's round room (its set less the earlier towers in the clip order it overlaps) has no hole;
  H3  each tower's round room lies inside ONE seed piece (its own piece when it precedes the wings, its container's when
      it follows it) — the fixed-ring guarantee (§3.4's transientArena);
  H4  the clip order is a permutation of all rings (one order).
Also counts, for information, how often the round room is disconnected (allowed by the text: the seed clip too may cut a
ring in two) and how often the old rule (#15 alone: a tower before every wing it overlaps without lying wholly inside it,
after its container otherwise) admits no order (the VHM-04 / VKH-01 cycle).
"""
import random, sys
from collections import deque

W = H = 96

def rect(x0, y0, x1, y1):
    return frozenset((x, y) for x in range(x0, x1) for y in range(y0, y1))

def disk(cx, cy, r):
    r2 = r * r
    return frozenset((x, y) for x in range(max(0, int(cx - r) - 1), min(W, int(cx + r) + 2))
                     for y in range(max(0, int(cy - r) - 1), min(H, int(cy + r) + 2))
                     if (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r2)

def components(cells):
    cells = set(cells)
    comps = []
    while cells:
        s = cells.pop()
        comp = {s}
        dq = deque([s])
        while dq:
            x, y = dq.popleft()
            for n in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if n in cells:
                    cells.remove(n)
                    comp.add(n)
                    dq.append(n)
        comps.append(comp)
    return comps

def boundary_touching(ring, comp):
    """Does the removed component touch the ring's boundary (a pixel of the ring with a 4-neighbour outside the ring)?"""
    for (x, y) in comp:
        for n in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if n not in ring:
                return True
    return False

def has_hole(ring, removed):
    """A hole: a component of ring∩removed that does not touch the ring's boundary."""
    inside = ring & removed
    for comp in components(inside):
        if not boundary_touching(ring, comp):
            return True
    return False

def wing_order(wings):
    """Wing order with a contained wing after its container (identical sets keep wing order)."""
    n = len(wings)
    order = list(range(n))
    # stable topological adjustment: repeatedly move a wing after any wing that wholly contains it (strictly).
    changed = True
    guard = 0
    while changed and guard < 100:
        changed = False
        guard += 1
        for i in range(n):
            for j in range(n):
                if i != j and wings[i] < wings[j]:  # i strictly inside j → i after j
                    pi, pj = order.index(i), order.index(j)
                    if pi < pj:
                        order.pop(pi)
                        order.insert(order.index(j) + 1, i)
                        changed = True
    return order

def r1_order(wings, towers):
    worder = wing_order(wings)
    free, after = [], {k: [] for k in range(len(wings))}
    for t in range(len(towers)):
        ts = towers[t]
        container = None
        for k in worder:
            if ts <= wings[k]:
                container = k
                break
        if container is None:
            free.append(t); continue
        before = worder[:worder.index(container)]
        if any(ts & wings[k] for k in before):
            free.append(t)  # VHM-04's case: taken before the wings too
        else:
            after[container].append(t)
    order = [('T', t) for t in free]
    for k in worder:
        order.append(('W', k))
        order.extend(('T', t) for t in after[k])
    return order

def old_rule_has_order(wings, towers):
    """#15 alone: T before every wing it overlaps without lying wholly inside; T after a wing that wholly contains it;
    wings in wing order (contained after container). Return False when the constraints are cyclic."""
    worder = wing_order(wings)
    nodes = [('W', k) for k in range(len(wings))] + [('T', t) for t in range(len(towers))]
    edges = set()
    for a, b in zip(worder, worder[1:]):
        edges.add((('W', a), ('W', b)))
    for t, ts in enumerate(towers):
        for k, ws in enumerate(wings):
            if ts <= ws:
                edges.add((('W', k), ('T', t)))
            elif ts & ws:
                edges.add((('T', t), ('W', k)))
        for u, us in enumerate(towers):
            if u != t and (ts & us):
                edges.add((('T', t), ('T', u)))  # each must precede the other → cycle whenever two towers engage
    # cycle detection
    indeg = {v: 0 for v in nodes}
    for a, b in edges:
        indeg[b] += 1
    q = deque(v for v in nodes if indeg[v] == 0)
    seen = 0
    while q:
        v = q.popleft(); seen += 1
        for a, b in edges:
            if a == v:
                indeg[b] -= 1
                if indeg[b] == 0:
                    q.append(b)
    return seen == len(nodes)

def gen_case(rng):
    nw = rng.randint(1, 4)
    wings = []
    for i in range(nw):
        if i and rng.random() < 0.35:  # a wing nested inside an earlier one
            x0, y0, x1, y1 = bounds[rng.randrange(len(bounds))]
            if x1 - x0 > 8 and y1 - y0 > 8:
                a = rng.randint(x0 + 1, x1 - 5); b = rng.randint(y0 + 1, y1 - 5)
                c = rng.randint(a + 3, x1 - 1); d = rng.randint(b + 3, y1 - 1)
                wings.append(rect(a, b, c, d)); bounds.append((a, b, c, d)); continue
        w = rng.randint(14, 44); h = rng.randint(12, 40)
        x0 = rng.randint(4, W - w - 4); y0 = rng.randint(4, H - h - 4)
        if i and rng.random() < 0.5:  # tile against an earlier wing's side, sharing the joint
            px0, py0, px1, py1 = bounds[rng.randrange(len(bounds))]
            side = rng.randrange(4)
            if side == 0: x0 = px1; y0 = rng.randint(max(4, py0 - h + 4), min(H - h - 4, py1 - 4))
            elif side == 1: x0 = px0 - w; y0 = rng.randint(max(4, py0 - h + 4), min(H - h - 4, py1 - 4))
            elif side == 2: y0 = py1; x0 = rng.randint(max(4, px0 - w + 4), min(W - w - 4, px1 - 4))
            else: y0 = py0 - h; x0 = rng.randint(max(4, px0 - w + 4), min(W - w - 4, px1 - 4))
            x0 = max(0, min(W - w, x0)); y0 = max(0, min(H - h, y0))
        wings.append(rect(x0, y0, x0 + w, y0 + h)); bounds.append((x0, y0, x0 + w, y0 + h))
    towers = []
    tries = 0
    while len(towers) < rng.randint(1, 3) and tries < 40:
        tries += 1
        r = rng.uniform(3, 9)
        # bias towers onto wing corners, joints and interiors
        if rng.random() < 0.7 and bounds:
            bx0, by0, bx1, by1 = bounds[rng.randrange(len(bounds))]
            cx = rng.choice([bx0, bx1, rng.uniform(bx0, bx1)]) + rng.uniform(-3, 3)
            cy = rng.choice([by0, by1, rng.uniform(by0, by1)]) + rng.uniform(-3, 3)
        else:
            cx = rng.uniform(8, W - 8); cy = rng.uniform(8, H - 8)
        d = disk(cx, cy, r)
        if not d or any(d <= u or u <= d for u in towers):  # no tower wholly inside another (the composition rule)
            continue
        if rng.random() < 0.5 and towers and not any(d & u for u in towers):
            # try to engage an earlier tower (a stair turret)
            u = towers[rng.randrange(len(towers))]
            ux = sum(x for x, _ in u) / len(u); uy = sum(y for _, y in u) / len(u)
            ur = (len(u) / 3.14159) ** 0.5
            ang = rng.uniform(0, 6.283)
            cx = ux + (ur + r * 0.4) * __import__('math').cos(ang); cy = uy + (ur + r * 0.4) * __import__('math').sin(ang)
            d2 = disk(cx, cy, r)
            if d2 and not any(d2 <= v or v <= d2 for v in towers):
                d = d2
        towers.append(d)
    return wings, towers

def run(n, seed):
    rng = random.Random(seed)
    global bounds
    stats = dict(cases=0, h1=0, h2=0, h3=0, h4=0, disconnected_rooms=0, old_rule_no_order=0, engaged=0, vhm04=0, contained=0, free=0)
    fails = []
    for c in range(n):
        bounds = []
        wings, towers = gen_case(rng)
        order = r1_order(wings, towers)
        stats['cases'] += 1
        # H4: one order, a permutation
        if sorted(order) != sorted([('W', k) for k in range(len(wings))] + [('T', t) for t in range(len(towers))]):
            stats['h4'] += 1; fails.append(('H4', c)); continue
        sets = {('W', k): wings[k] for k in range(len(wings))}
        sets.update({('T', t): towers[t] for t in range(len(towers))})
        pieces = {}
        removed = frozenset()
        tower_seen = []
        for node in order:
            ring = sets[node]
            if has_hole(ring, removed):
                stats['h1'] += 1; fails.append(('H1', c, node))
            pieces[node] = ring - removed
            removed = removed | ring
        # towers: round rooms
        earlier_towers = []
        pos = {node: i for i, node in enumerate(order)}
        for node in order:
            if node[0] != 'T':
                continue
            ring = sets[node]
            earlier = [sets[u] for u in order[:pos[node]] if u[0] == 'T' and (sets[u] & ring)]
            room = ring
            for e in earlier:
                room = room - e
            if earlier:
                stats['engaged'] += 1
            if has_hole(ring, frozenset().union(*earlier) if earlier else frozenset()):
                stats['h2'] += 1; fails.append(('H2', c, node))
            if len(components(room)) > 1:
                stats['disconnected_rooms'] += 1
            # which seed piece holds the room?
            first_wing_pos = min(pos[u] for u in order if u[0] == 'W')
            if pos[node] < first_wing_pos:
                stats['free'] += 1
                host = pieces[node]
            else:
                stats['contained'] += 1
                # the container: the wing directly before it in the order (possibly through sibling towers)
                i = pos[node] - 1
                while order[i][0] != 'W':
                    i -= 1
                host = pieces[order[i]]
            if not room <= host:
                stats['h3'] += 1; fails.append(('H3', c, node))
            # a VHM-04 configuration: a free tower wholly inside some wing
            if pos[node] < first_wing_pos and any(ring <= w for w in wings):
                stats['vhm04'] += 1
        if not old_rule_has_order(wings, towers):
            stats['old_rule_no_order'] += 1
    return stats, fails

if __name__ == '__main__':
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    seed = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    stats, fails = run(n, seed)
    print('STATS', stats)
    print('FAILS', fails[:20], '... total', len(fails))
    sys.exit(1 if fails else 0)
