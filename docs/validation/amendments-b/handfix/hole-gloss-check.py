#!/usr/bin/env python3
# hole-gloss-check.py — lane handfix-b/repair-kernel-r2, Fable continuation (2026-09-27): the executed check behind
# VHM1-04's gloss in §3.4 ("A piece left with a hole — earlier rings lying inside a later one without reaching its sides —
# is refused … a composed tower wholly inside a wing before that container only where an earlier wing the tower overlaps
# carries its cut to the container's sides"). Stdlib only; run: python3 hole-gloss-check.py [cases] [seed].
# Exit 0 = every case passed G1–G4 (see the docstring). Reuses tower-order-check.py's raster model (same folder).
# Results at 2000 cases: seeds 1 and 2, 0 failures; 9 011 + 9 081 rings, 1 875 + 1 837 L-shaped wings, 233 + 255 holes under
# random orders, 59 + 74 free towers inside a wing, 22 + 12 towers after their container inside a later wing, and 81 + 86
# cases the old gloss would have refused without a hole (repair-kernel-r2-report.md, Fable continuation).
"""Randomised raster check of §3.4's holed-piece gloss (handfix-b, VHM1-04), on tower-order-check.py's model widened.

Model (one storey, integer raster): wings are axis-aligned rectangles OR L-shapes (two overlapping rectangles, so every
wing is one connected ring, no longer convex); towers are disks; the clip order is repair-r1-model's (tower-order-check.py's
r1_order); the seed clip takes each ring's piece as its cells less the union U of the rings before it.
Per case, per ring R:
  GLOSS(R, U)  the gloss's condition, component-wise: some connected part of R ∩ U has no cell with a 4-neighbour outside R
               (tower-order-check.py's has_hole);
  TOPO(R, U)   the piece R − U has a hole in the plain topological sense: a cell not in the piece, inside R's bounding box
               widened by one, that a 4-connected flood of non-piece cells from that box's rim never reaches.
Checks:
  G1  GLOSS == TOPO for every ring under a RANDOM permutation of the rings (holes then occur often, so both directions of the
      equivalence are exercised) and under the r1 clip order;
  G2  under the r1 clip order no piece has a hole (TOPO false for every ring): the refusal is reached only by a caller's bug;
  G3  the gloss's tower clause: every tower taken before a wing A whose extent wholly contains it overlaps some wing B taken
      before A whose part inside A, the connected part holding the tower's overlap, reaches A's sides; counted separately for
      a tower free of every wing (before all of them) and for a tower taken after its first container and inside a later wing;
  G4  the OLD gloss ("an earlier ring wholly inside a later one") is wrong exactly where the new one is right: every case of
      G3 has an earlier ring wholly inside a later one and no hole; the count is reported.
"""
import importlib.util, os, random, sys
from collections import deque

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('toc', os.path.join(HERE, 'tower-order-check.py'))
toc = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(toc)
W, H = toc.W, toc.H
rect, disk, components, has_hole, r1_order = toc.rect, toc.disk, toc.components, toc.has_hole, toc.r1_order


def topo_hole(ring, removed):
    """Does the piece ring − removed have a hole? Flood the non-piece cells from the rim of ring's bounding box + 1."""
    piece = ring - removed
    xs = [x for x, _ in ring]; ys = [y for _, y in ring]
    x0, x1, y0, y1 = min(xs) - 1, max(xs) + 1, min(ys) - 1, max(ys) + 1
    seen = set()
    dq = deque()
    for x in range(x0, x1 + 1):
        for y in (y0, y1):
            if (x, y) not in piece:
                seen.add((x, y)); dq.append((x, y))
    for y in range(y0, y1 + 1):
        for x in (x0, x1):
            if (x, y) not in piece and (x, y) not in seen:
                seen.add((x, y)); dq.append((x, y))
    while dq:
        x, y = dq.popleft()
        for n in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if x0 <= n[0] <= x1 and y0 <= n[1] <= y1 and n not in piece and n not in seen:
                seen.add(n); dq.append(n)
    total_nonpiece = (x1 - x0 + 1) * (y1 - y0 + 1) - len(piece)
    return len(seen) != total_nonpiece


def touches(ring, cells):
    return any(n not in ring for (x, y) in cells for n in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))


def component_of(cells, seed_cells):
    """The connected part of `cells` that holds `seed_cells` (they lie in one part when the caller says so)."""
    for comp in components(cells):
        if comp & seed_cells:
            return comp
    return set()


def gen_case(rng):
    """Wings as rectangles or L-shapes (nested, tiled, overlapping), towers as disks on corners, joints and interiors."""
    nw = rng.randint(1, 4)
    wings, boxes = [], []
    for i in range(nw):
        if i and rng.random() < 0.3:  # a wing nested inside an earlier one
            x0, y0, x1, y1 = boxes[rng.randrange(len(boxes))]
            if x1 - x0 > 8 and y1 - y0 > 8:
                a = rng.randint(x0 + 1, x1 - 5); b = rng.randint(y0 + 1, y1 - 5)
                c = rng.randint(a + 3, x1 - 1); d = rng.randint(b + 3, y1 - 1)
                wings.append(rect(a, b, c, d)); boxes.append((a, b, c, d)); continue
        w = rng.randint(14, 40); h = rng.randint(12, 36)
        x0 = rng.randint(4, W - w - 4); y0 = rng.randint(4, H - h - 4)
        if i and rng.random() < 0.5 and boxes:  # tile against an earlier wing's box side
            px0, py0, px1, py1 = boxes[rng.randrange(len(boxes))]
            side = rng.randrange(4)
            if side == 0: x0 = px1; y0 = rng.randint(max(4, py0 - h + 4), min(H - h - 4, py1 - 4))
            elif side == 1: x0 = px0 - w; y0 = rng.randint(max(4, py0 - h + 4), min(H - h - 4, py1 - 4))
            elif side == 2: y0 = py1; x0 = rng.randint(max(4, px0 - w + 4), min(W - w - 4, px1 - 4))
            else: y0 = py0 - h; x0 = rng.randint(max(4, px0 - w + 4), min(W - w - 4, px1 - 4))
            x0 = max(1, min(W - w - 1, x0)); y0 = max(1, min(H - h - 1, y0))
        ring = rect(x0, y0, x0 + w, y0 + h)
        if rng.random() < 0.45:  # an L: a second rectangle overlapping the first by a strip, on one of four sides
            ov = rng.randint(2, 4)
            w2 = rng.randint(8, 24); h2 = rng.randint(8, 22)
            side = rng.randrange(4)
            if side == 0:   bx0, by0 = x0 + w - ov, rng.randint(y0, y0 + h - 3); bx1, by1 = bx0 + w2, by0 + h2
            elif side == 1: bx1, by0 = x0 + ov, rng.randint(y0, y0 + h - 3); bx0, by1 = bx1 - w2, by0 + h2
            elif side == 2: bx0, by0 = rng.randint(x0, x0 + w - 3), y0 + h - ov; bx1, by1 = bx0 + w2, by0 + h2
            else:           bx0, by1 = rng.randint(x0, x0 + w - 3), y0 + ov; bx1, by0 = bx0 + w2, by1 - h2
            bx0, bx1 = max(1, bx0), min(W - 1, bx1); by0, by1 = max(1, by0), min(H - 1, by1)
            if bx1 - bx0 >= 3 and by1 - by0 >= 3:
                ring = ring | rect(bx0, by0, bx1, by1)
        xs = [x for x, _ in ring]; ys = [y for _, y in ring]
        wings.append(ring); boxes.append((min(xs), min(ys), max(xs) + 1, max(ys) + 1))
    towers, tries = [], 0
    want = rng.randint(1, 3)
    while len(towers) < want and tries < 40:
        tries += 1
        r = rng.uniform(3, 9)
        if rng.random() < 0.75 and boxes:
            bx0, by0, bx1, by1 = boxes[rng.randrange(len(boxes))]
            cx = rng.choice([bx0, bx1, rng.uniform(bx0, bx1)]) + rng.uniform(-3, 3)
            cy = rng.choice([by0, by1, rng.uniform(by0, by1)]) + rng.uniform(-3, 3)
        else:
            cx = rng.uniform(8, W - 8); cy = rng.uniform(8, H - 8)
        d = disk(cx, cy, r)
        if not d or any(d <= u or u <= d for u in towers):  # no tower wholly inside another (the composition rule)
            continue
        towers.append(d)
    return wings, towers


def run(n, seed):
    rng = random.Random(seed)
    st = dict(cases=0, rings=0, l_wings=0, g1_random_checks=0, g1_random_holes=0, g1_fail=0, g2_fail=0,
              g3_free_inside=0, g3_after_container_inside_later=0, g3_fail=0, g4_old_gloss_wrong=0)
    fails = []
    for c in range(n):
        wings, towers = gen_case(rng)
        st['cases'] += 1
        st['l_wings'] += sum(1 for w in wings if len(components(w)) == 1 and _is_l(w))
        sets = {('W', k): wings[k] for k in range(len(wings))}
        sets.update({('T', t): towers[t] for t in range(len(towers))})
        nodes = list(sets)
        st['rings'] += len(nodes)
        # G1 under a random permutation
        perm = nodes[:]; rng.shuffle(perm)
        removed = frozenset()
        for node in perm:
            ring = sets[node]
            g, t = has_hole(ring, removed), topo_hole(ring, removed)
            st['g1_random_checks'] += 1
            st['g1_random_holes'] += t
            if g != t:
                st['g1_fail'] += 1; fails.append(('G1-random', c, node, g, t))
            removed |= ring
        # r1 clip order: G1 again, G2, G3, G4
        order = r1_order(wings, towers)
        pos = {node: i for i, node in enumerate(order)}
        removed = frozenset()
        for node in order:
            ring = sets[node]
            g, t = has_hole(ring, removed), topo_hole(ring, removed)
            if g != t:
                st['g1_fail'] += 1; fails.append(('G1-r1', c, node, g, t))
            if t:
                st['g2_fail'] += 1; fails.append(('G2', c, node))
            removed |= ring
        first_wing_pos = min((pos[u] for u in order if u[0] == 'W'), default=None)
        if first_wing_pos is None:
            continue
        for node in order:
            if node[0] != 'T':
                continue
            T = sets[node]
            for wn in order:
                if wn[0] != 'W' or pos[wn] < pos[node] or not (T <= sets[wn]):
                    continue
                # a tower taken before a wing A that wholly contains it
                A = sets[wn]
                if pos[node] < first_wing_pos:
                    st['g3_free_inside'] += 1
                else:
                    st['g3_after_container_inside_later'] += 1
                earlier_wings = [u for u in order[:pos[wn]] if u[0] == 'W' and (sets[u] & T)]
                ok = False
                for u in earlier_wings:
                    B = sets[u]
                    part = component_of(B & A, B & T)
                    if part and touches(A, part):
                        ok = True; break
                if not ok:
                    st['g3_fail'] += 1; fails.append(('G3', c, node, wn))
                # G4: the old gloss names this case (an earlier ring wholly inside a later one); the piece has no hole
                U = frozenset().union(*(sets[u] for u in order[:pos[wn]]))
                if not topo_hole(A, U):
                    st['g4_old_gloss_wrong'] += 1
    return st, fails


def _is_l(w):
    xs = [x for x, _ in w]; ys = [y for _, y in w]
    return len(w) != (max(xs) - min(xs) + 1) * (max(ys) - min(ys) + 1)


if __name__ == '__main__':
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 2000
    seed = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    st, fails = run(n, seed)
    print('STATS', st)
    print('FAILS', fails[:20], '... total', len(fails))
    sys.exit(1 if fails else 0)
