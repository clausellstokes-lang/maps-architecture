#!/usr/bin/env python3
"""research/baselines/ng_faces_by_class.py -- NG's bent-cut signature per parent-face class (M-1 work item W-10).

Lane m1/W-10 (docs/calibration/M-1-plan.md section 2, row W-10; record docs/calibration/E10-ng-bentcut-faces.md).
Research side only: nothing here enters plat/. Our own code, standard library only (Python 3.9). It reads the NG vertex
captures through the existing research scripts in captures/neighbourhood/, imported UNMODIFIED:
  bentcut_parent_face.py  rebuilds the planar road graph and the cut tree (parent face of every street cut);
  bentcut_geometry.py     per-street bends, virtual corner, ends and arrival angles (imported by the former);
  bentcut_predict.py      imported for its capture of every bounded simple parent (polygon E1 and fillet-free E3, the
                          OBB of E1, the cut's fillet-free course Q = [e0, (Pv), eN]); its main() is not run;
  bentcut_anchor.py       its likelihood helpers (the N(0.5, sigma) + eps * U(0, 1) fit of AN-2), reused unchanged.
The parent-face reconstruction's internal state (faces, half-edges, node sources) is read from bentcut_parent_face.
analyse's own frame at its return (a profile hook), so the cut tree is the same object those scripts tested; this file
then replays the reverse-order union to attach to every cut its parent face's boundary cycles and to every bounded leaf
face (a block) the cut that created it. Every simple parent polygon rebuilt here is checked equal, vertex for vertex, to
the one bentcut_predict captured (E1 and E3), or the run stops.

Face classes (our own declared definitions; a face may carry several flags; 'plain' = none of them):
  holed         the parent's boundary has an inner cycle (an island inside it): the annulus a band's first cut opens
                (bentcut_parent_face's three bounded 'slits') and any bounded parent with a hole cycle
  c_shaped      some contiguous chain of the fillet-free polygon E3 turns at least C_CONCAVE degrees net toward the
                outside (concave): the face wraps around something (a ring band's piece, the C a band's first cut leaves)
  triangular    E3 has exactly three corners, a corner being a vertex turning at least CORNER_DEG degrees (sides may
                be curved: the sector faces of a ring template)
  curved        a chain of >= 2 consecutive boundary vertices that are road-polyline vertices turning in
                [BEND_MIN, CURVE_MAX) degrees, outside any complete fillet arc on that boundary, turns more than
                RUN_TOL degrees in all (a side GEO-22's run rule cannot hold as one run: ring roads, the plaza loop,
                partial fillet arcs, the S-curve template street)
  round_joined  at least one complete fillet arc of a crossing street lies on the boundary as one of its corners
                (bentcut_parent_face's 'arcs replaced' count >= 1)
The exclusive partition used for the sum checks takes the first flag in PRECEDENCE.

Per-cut measures, the frame NG's signature was measured in (profile-neighbourhood.md BG-1, PF-1, AN-1):
  f      the drawn start e0 (snapped to the crossed centreline) as a fraction of the parent's E1 OBB major axis; on a
         holed parent the OBB of its outer cycle
  sigma  the maximum-likelihood N(0.5, sigma) with eps * U(0, 1) contamination over f (bentcut_anchor's grids)
  t      |e0 Pv| / (|e0 Pv| + |Pv eN|) for one-bend cuts; corner-at-mid = |t - 0.5| <= 0.10
  arrival  each junction end's acute angle to the crossed road (bentcut_geometry); share >= 85 degrees
  fillet   one-bend cuts whose bend is a multi-vertex arc (bentcut_parent_face 'arc')
  cut length  the fillet-free course length plen(Q) in model units (mu = canvas px / the map's CTM scale)
  block area  bounded leaf faces of the road graph, mu^2; relative = / the map's median footprint area (block.areaRel)
Metres are reported only as a declared conversion at M_PER_MU (ARCHITECTURE section 4.6 step 5's inference, 0.35 m per
model unit), never as a measured scale.

Usage:
  python3 ng_faces_by_class.py [CAPTURE_DIR ...] [--json OUT] [--faces OUT] [--md OUT]   (default: the four 2026-09-25
                                  captures; prints the report; writes the numbers JSON, the per-face JSON, the tables)
  python3 ng_faces_by_class.py --check    recompute and test the pooled numbers against the W-10 checker (exit 1 on any
                                          difference): 380 / 519 one-bend streets, 780 / 811 (96 %) arrivals >= 85
                                          degrees, 200 of 378 filleted one-bend cuts, sigma 0.066 plain / 0.098 ring
  python3 ng_faces_by_class.py --plan [--out-json F] [--out-faces F] [--out-candidate F] [--md F]
                                          W-10b (lane m1/W-10b): W-04's 20 `medium` plan seeds, read through W-11b's
                                          plan-seed index (the registered road frame), the rows' measured values, the
                                          research-side per-face file and the plan section 7b candidate (exit 1 on any
                                          failed check)
  python3 ng_faces_by_class.py --red      planted faults that must turn the checks red (exit 1 if one stays green)

Template roads (W-10b, R-09; replaces the limit W-10 documented). bentcut_parent_face.TEMPLATE_W named the template-street
widths of seeds 7171 / 7172 only, so on W-04's seeds it finds none. The rule here, measured on all 44 W-04 recordings and
the 8 fixture maps: the templates that lay streets down themselves (CA-2: `street` one main street, `square` three roads
framing the plaza, one of them the closed plaza loop when it is drawn closed) draw them FIRST, at one per-map width that
is not the length law's (the width class): the template roads are the maximal prefix of the draw order whose raw widths
equal the first-drawn road's (to 0.001 mu); `area` and `ring` lay none (their closed roads stay templates by shape, as
bentcut_parent_face already treats every closed road). The rule is handed to the unmodified script as a one-map
TEMPLATE_W, and the run stops unless the script's template set equals the rule's (no other street at that width). The
2026-09-25 numbers are its red test: on the fixtures the rule's sets equal TEMPLATE_W's on 8 / 8 maps and the 11 checks
still pass.
Duplicate edges (W-10b; E11 section 10.1's adapter defect, found by W-11b on square/medium/3): where two fallback snaps land
two streets on each other, the script's edge list holds one node pair twice and its half-edge walk merges the faces on
either side. A line trace on bentcut_parent_face.analyse collapses repeated node pairs after the edge list is built and
before the walk, as adapters/ng.py collapses them before its own; the file itself is not modified, and the count is
recorded. The edge kept carries the LATER-drawn of the two roads: the overlap is a short connector from where the later
street lands on the earlier one to the earlier street's fallback end (the later street's drawn start), off the earlier
road's line, so kept on the earlier road the script's collinear-insertion rule would drop the landing node as if the road
ran straight through it, and the parent polygon would lose a sliver (0.7 % of a face on square/medium/3, against its
leaves' sum). Where the overlap fuses two streets into one path (square/medium/3: street 22 ends on street 23's start,
23 starts on 22 just short of 22's end), the earlier street is a dead end once the later is removed: the replay drops the
zero-width spur it leaves in the merged face (the tested script's polygon never holds one), and plan mode records the
earlier street as DEGENERATE (its two sides one face at its removal, its parent without an inner cycle): it stays in the
face-free measures and in its ancestors' cut lists, and leaves the rebuilt-parent set (its face would repeat the later
street's).
"""
import collections
import json
import math
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
NGDIR = os.path.join(ROOT, 'captures', 'neighbourhood')
sys.path.insert(0, NGDIR)
import bentcut_predict as bp  # noqa: E402  (patches bentcut_parent_face's helpers to capture the bounded simple parents)
import bentcut_anchor as ba  # noqa: E402  (likelihood helpers only; its main() is not run)

pf, bg = bp.pf, bp.bg
ps = pf.ps

SCRIPT = 'research:baselines/ng_faces_by_class.py'
REFERENCE_BUILD = 'itch:11441280'          # NG 1.2.2, the build of every capture used (meta.json baseUrl)
M_PER_MU = 0.35                            # declared conversion only (ARCHITECTURE section 4.6 step 5's inference)
C_CONCAVE = 120.0                          # degrees; c_shaped: a contiguous boundary chain turns this far concave
CORNER_DEG = 45.0                          # degrees; a corner of E3 turns at least this (triangular: exactly 3)
RUN_TOL = 10.0                             # degrees; GEO-22's run rule; curved: a curve chain turns more than this
CURVE_MAX = 30.0                           # degrees; a curve vertex turns less than this (a corner turns more)
CORNER_GATE = 0.10                         # |t - 0.5| gate (PF-2 (b), section 13.5's bar)
SIGMA_MIN_N = 10                           # below this a class's sigma is not fitted; its f values are listed
ARRIVE_MIN = 85.0
CLASSES = ('holed', 'c_shaped', 'triangular', 'curved', 'round_joined')
PRECEDENCE = CLASSES + ('plain',)
PLAIN_TEMPLATES = ('area', 'street', 'square')
EXPECT = {'one_bend': (380, 519), 'arrive85': (780, 811), 'fillet': (200, 378),
          'sigma_plain': (0.066, 0.05), 'sigma_ring': (0.098, 0.0), 'sigma_all': (0.088, 0.02),
          'corner_mid_bounded': (99, 120), 'partition_fillet': (200, 378), 'partition_arrive85': (780, 811),
          'partition_cuts': (519, 519), 'area_identity_violations': (0, 0)}
# V12 section 3.4.2 default bins (metric registry, research/baselines/metrics.m-1.json): block.area log-spaced 24 bins
# over 50 - 50 000 m2 with underflow and overflow; run lengths 5 m bins to 400 m with overflow.
AREA_EDGES_M2 = [50.0 * 1000.0 ** (i / 24) for i in range(25)]
LEN_EDGES_M = [5.0 * i for i in range(81)]


# ---------------------------------------------------------------- capture of bentcut_parent_face.analyse's frame
def _edge_list_line():
    """the line of bentcut_parent_face.analyse that starts the half-edge arrays, i.e. the first line after its edge list
    is complete (located by its text, which must occur exactly once inside analyse)"""
    import dis
    src = open(pf.__file__).read().splitlines()
    lines = {ln for _, ln in dis.findlinestarts(pf.analyse.__code__)}
    hits = [i + 1 for i, s in enumerate(src) if i + 1 in lines and s.strip() == 'Hf, Ht, Hr = [], [], []']
    assert len(hits) == 1, f'bentcut_parent_face.analyse: the half-edge line found {len(hits)} times'
    return hits[0]


EDGE_LIST_LINE = _edge_list_line()


def analyse_with_state(fp, template, template_w=None):
    """run bentcut_parent_face.analyse unmodified; return (info, cuts, its locals at return, captured geoms, census).
    A line trace collapses repeated node pairs in its edge list before the face walk (W-10b); template_w, when given, is
    the map's template-road width set handed to the script as TEMPLATE_W for this one call."""
    state, fix = {}, {'duplicateEdgesCollapsed': 0}
    code = pf.analyse.__code__
    first = len(bp._cap['geoms'])

    def local(frame, event, arg):
        if event == 'line' and frame.f_lineno == EDGE_LIST_LINE:
            E, rank = frame.f_locals['edges'], frame.f_locals['rank']
            at, keep = {}, []
            for a, b, k in E:
                key = (min(a, b), max(a, b))
                if key in at:
                    # one edge kept, carrying the later-drawn of the two roads (see the module docstring)
                    fix['duplicateEdgesCollapsed'] += 1
                    i = at[key]
                    if rank[k] > rank[keep[i][2]]:
                        keep[i] = (keep[i][0], keep[i][1], k)
                    continue
                at[key] = len(keep)
                keep.append((a, b, k))
            E[:] = keep                       # the same list object the script goes on to read
            frame.f_trace_lines = False       # nothing else is traced line by line; the return event still comes
        elif event == 'return':
            state.update(frame.f_locals)
        return local

    def hook(frame, event, arg):
        return local if (event == 'call' and frame.f_code is code) else None
    old_w = pf.TEMPLATE_W
    if template_w is not None:
        pf.TEMPLATE_W = template_w
    old = sys.gettrace()
    sys.settrace(hook)
    try:
        info, cuts = pf.analyse(fp, template)
    finally:
        sys.settrace(old)
        pf.TEMPLATE_W = old_w
    return info, cuts, state, bp._cap['geoms'][first:], fix


def _drop_spurs(cyc, fix):
    out = list(cyc)
    while len(out) >= 2:
        n = len(out)
        i = next((i for i in range(n) if out[(i + 1) % n] == (out[i] ^ 1)), None)
        if i is None:
            break
        j = (i + 1) % n
        out = [h for k, h in enumerate(out) if k not in (i, j)]
        fix['spurEdgesDropped'] = fix.get('spurEdgesDropped', 0) + 1
    return out


# ---------------------------------------------------------------- template roads by draw order and width class (R-09)
TEMPLATE_ROADS = {'street': 1, 'square': 3}  # CA-2's k: the roads the template lays itself (square: with the plaza loop)


def template_rule(fp, template):
    """the map's template-road width set and the receipt (see the module docstring)"""
    A = ps.analyse(fp)
    S, R = A['streets'], A['rings']
    roads = S + R
    nS = len(S)
    order = sorted(range(len(roads)), key=lambda k: roads[k]['n'])
    rec = {'template': template, 'closedRoads': len(R)}
    if template not in TEMPLATE_ROADS:
        rec.update(widthMu=None, prefixRanks=[], openTemplateStreets=0, closedInPrefix=0, expectedRoads=0, agrees=True,
                   otherStreetsAtWidth=0)
        return (), set(range(nS, len(roads))), rec
    wT = round(roads[order[0]]['w'], 3)
    prefix = []
    for k in order:
        if round(roads[k]['w'], 3) != wT:
            break
        prefix.append(k)
    rank = {k: r for r, k in enumerate(order)}
    other = [k for k in range(nS) if k not in prefix and round(roads[k]['w'], 3) == wT]
    rec.update(widthMu=wT, prefixRanks=[rank[k] for k in prefix], openTemplateStreets=sum(k < nS for k in prefix),
               closedInPrefix=sum(k >= nS for k in prefix), expectedRoads=TEMPLATE_ROADS[template],
               agrees=len(prefix) == TEMPLATE_ROADS[template], otherStreetsAtWidth=len(other))
    want = {k for k in prefix if k < nS} | set(range(nS, len(roads)))
    return (wT,), want, rec


# ---------------------------------------------------------------- geometry helpers (ours)
def turn_at(P, i):
    n = len(P)
    return ps.turn(P[i - 1], P[i], P[(i + 1) % n])


def runs_geo22(P):
    """number of runs: maximal chains whose edges stay within RUN_TOL degrees of the run's first edge direction"""
    n = len(P)
    if n < 3:
        return n
    head = [math.degrees(math.atan2(P[(i + 1) % n][1] - P[i][1], P[(i + 1) % n][0] - P[i][0])) for i in range(n)]
    start = max(range(n), key=lambda i: abs(turn_at(P, i)))
    breaks, h0 = 1, head[start]
    for k in range(1, n):
        i = (start + k) % n
        d = (head[i] - h0 + 180.0) % 360.0 - 180.0
        if abs(d) > RUN_TOL:
            breaks += 1
            h0 = head[i]
    return breaks


def corners(P, thr):
    """vertices of P turning at least thr degrees (either sign)"""
    return sum(abs(turn_at(P, i)) >= thr for i in range(len(P)))


def max_concave_turn(P):
    """largest net turning toward the outside (concave) over any contiguous chain of vertices, degrees"""
    n = len(P)
    if n < 3:
        return 0.0
    sgn = 1.0 if pf.sarea(P) > 0 else -1.0
    t = [-sgn * turn_at(P, i) for i in range(n)]          # concave turns positive
    best = cur = 0.0
    for x in t + t:                                       # circular maximum subarray (chains shorter than 2n)
        cur = max(0.0, cur + x)
        best = max(best, cur)
    return min(best, 360.0)


def solidity(P):
    h = pf.hull([tuple(p) for p in P])
    ah = abs(pf.sarea(h)) if len(h) >= 3 else 0.0
    return abs(pf.sarea(P)) / ah if ah else float('nan')


def obb_short_side(P):
    o = bp._obb0(P)
    return o['Lmin']


def q(xs, p):
    xs = [x for x in xs if x is not None]
    return ps.q(xs, p) if xs else None


def hist(xs, edges, under=True, over=True):
    h = [0] * (len(edges) - 1)
    u = o = 0
    for x in xs:
        if x < edges[0]:
            u += 1
        elif x >= edges[-1]:
            o += 1
        else:
            for i in range(len(edges) - 1):
                if edges[i] <= x < edges[i + 1]:
                    h[i] += 1
                    break
    out = {'bins': h}
    if under:
        out['underflow'] = u
    if over:
        out['overflow'] = o
    return out


def fit_sigma(xs):
    """bentcut_anchor's 'N(0.5,s)' candidate: s on 0.020..0.248 step 0.002, eps on its grid; best LL"""
    if len(xs) < 2:
        return None
    eps_grid = [0.0, 0.01, 0.02, 0.03, 0.05, 0.075, 0.1, 0.15, 0.2, 0.3, 0.4]
    best = None
    for s in range(20, 250, 2):
        d = ba.Nrm(0.5, s / 1000)
        for e in eps_grid:
            v = ba.ll(xs, d, e)
            if best is None or v > best[2]:
                best = (s / 1000, e, v)
    k = 1 + (1 if best[1] > 0 else 0)
    return {'sigma': best[0], 'eps': best[1], 'LL': round(best[2], 3), 'AIC': round(2 * k - 2 * best[2], 1), 'n': len(xs)}


def r6(x):
    return None if x is None else round(x, 6)


# ---------------------------------------------------------------- per map
FIXTURE_TEMPLATE_W = (7.75, 8.639)         # bentcut_parent_face.TEMPLATE_W as W-10 ran it (seeds 7171 / 7172)


def analyse_map(fp, template, seed):
    tw, want, trec = template_rule(fp, template)
    info, cuts, L, geoms, fix = analyse_with_state(fp, template, tw)
    assert L['templ'] == want, f'{fp}: the script\'s template set differs from the rule\'s'
    trec['equalsFixtureList'] = want == {k for k in range(len(L['roads'])) if k >= L['nS']
                                         or round(L['roads'][k]['w'], 3) in FIXTURE_TEMPLATE_W}
    nodes, ninfo, Hf, Ht, Hr = L['nodes'], L['ninfo'], L['Hf'], L['Ht'], L['Hr']
    faces, face, fa, openf, nxt = L['faces'], L['face'], L['fa'], L['openf'], L['nxt']
    S, nS, M, sc, rank, templ, end_node, arcs = L['S'], L['nS'], L['M'], L['sc'], L['rank'], L['templ'], L['end_node'], L['arcs']
    roads = L['roads']
    A = L['A']
    F = len(faces)
    # footprints (building outlines) for the relative unit
    fp_area = sorted(abs(pf.sarea(lot['p'])) / sc / sc for lot in A['lots'] if len(lot['p']) >= 3)
    fp_short = sorted(obb_short_side(lot['p']) / sc for lot in A['lots'] if len(lot['p']) >= 3)
    med_fp_area, med_fp_short = q(fp_area, .5), q(fp_short, .5)
    # replay of the reverse-order union (bentcut_parent_face lines 255-286, same order and same root rule)
    par = list(range(F))

    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x
    hs_of = collections.defaultdict(list)
    for h in range(0, len(Hf), 2):
        hs_of[Hr[h]].append(h)
    members = {f: [f] for f in range(F)}
    subcuts = {f: [] for f in range(F)}
    creator = {}
    order = sorted([k for k in range(nS) if k not in templ], key=lambda k: -rank[k])
    assert [c['si'] for c in cuts] == order, 'cut order differs from bentcut_parent_face'
    gi = 0
    rows = []
    for ci, (c, si) in enumerate(zip(cuts, order)):
        hs = hs_of[si]
        Lr = {find(face[h]) for h in hs}
        Rr = {find(face[h ^ 1]) for h in hs}
        allr = Lr | Rr
        for r in allr:
            if members[r] == [r] and r not in creator:
                creator[r] = ci
        root = min(allr)
        mem, sub = [], []
        for r in sorted(allr):
            mem += members[r]
            sub += subcuts[r]
        for r in allr:
            if r != root:
                par[r] = root
        members[root] = mem
        subcuts[root] = sub + [ci]
        rec = M['streets'][si]
        row = {'ci': ci, 'si': si, 'n': c['n'], 'rank': c['rank'], 'kind': c['kind'], 'nb': c['nb'], 'open': c['open'],
               'slit_bounded': bool(c['slit'] and not c['open']), 'simple': c.get('simple'),
               'arc': c.get('arc'), 'Lm_drawn': rec['Lm'], 'w': rec['w']}
        row['arrive'] = [e['arrive'] for e in rec['ends'] if e['junction']]
        if c['open']:
            if (si, 0) in end_node and (si, 1) in end_node:     # W-10b: an open cut's course between two snapped ends
                e0j, eNj = nodes[end_node[(si, 0)]], nodes[end_node[(si, 1)]]
                Qj = [e0j, rec['bend']['pv'], eNj] if (rec['nb'] == 1 and 'pv' in rec.get('bend', {})) \
                    else [e0j] + S[si]['p'][1:-1] + [eNj]
                row['len_mu_jj'] = pf.plen(Qj) / sc
            rows.append(row)
            continue
        # boundary cycles of the parent (after the union), following face-boundary next pointers
        inside = lambda h: find(face[h]) == root   # noqa: E731
        # a road still present at this cut (a template road, or a cut made earlier) with the parent on both sides is a
        # slit inside it (the C a band's first cut leaves): both its sides are boundary, as in the generator's polygon
        present = lambda k: k in templ or rank[k] < rank[si]   # noqa: E731
        bh = [h for h in range(len(Hf)) if inside(h) and (not inside(h ^ 1) or present(Hr[h]))]
        bset, used, cycles = set(bh), set(), []
        for h0 in bh:
            if h0 in used:
                continue
            cyc, h = [], h0
            while h not in used:
                used.add(h)
                cyc.append(h)
                g = nxt(h)
                while g not in bset:
                    g = nxt(g ^ 1)
                h = g
            cycles.append(cyc)
        # W-10b: a zero-width spur (a half-edge followed at once by its twin) is dropped; it arises only where the
        # duplicate-edge collapse leaves a road's overlapped end inside the merged face (square/medium/3), carries no area,
        # and the tested script's own polygon never holds one (a slit is never followed at once by its twin)
        cycles = [c for c in (_drop_spurs(cyc, fix) for cyc in cycles) if c]
        polys = []
        for cyc in cycles:
            keep = [(Hf[cyc[i]], Hr[cyc[i]]) for i in range(len(cyc))
                    if not (ninfo[Hf[cyc[i]]][0] == 'j' and Hr[cyc[i - 1]] == Hr[cyc[i]])]
            polys.append(keep)
        areas = [pf.sarea([nodes[nd] for nd, _ in kp]) for kp in polys]
        outer_i = max(range(len(polys)), key=lambda i: abs(areas[i]))
        holes = [i for i in range(len(polys)) if i != outer_i and (areas[i] > 0) != (areas[outer_i] > 0)]
        keep = polys[outer_i]
        P1 = [nodes[nd] for nd, _ in keep]
        # E3 (bentcut_parent_face lines 306-317, same rule)
        runpos = collections.defaultdict(list)
        for i, (nd, _) in enumerate(keep):
            inf = ninfo[nd]
            if inf[0] == 'v' and inf[1] in arcs and arcs[inf[1]][0] <= inf[2] <= arcs[inf[1]][1]:
                runpos[inf[1]].append(i)
        repl, skip, arcverts = {}, set(), set()
        for k, idx in runpos.items():
            i0, i1, pv = arcs[k]
            ss = set(idx)
            if len(idx) == i1 - i0 + 1 and sum((i - 1) % len(keep) not in ss for i in idx) == 1:
                first = next(i for i in idx if (i - 1) % len(keep) not in ss)
                repl[first] = pv
                skip |= ss - {first}
                arcverts |= ss
        P3 = [repl.get(i, nodes[nd]) for i, (nd, _) in enumerate(keep) if i not in skip]
        if c.get('simple'):
            G = geoms[gi]
            gi += 1
            assert len(cycles) == 1 and not holes, 'simple parent with several cycles'
            assert G['P1'] == P1 and G['P3'] == P3, f'parent polygon differs from bentcut_predict at cut {si}'
            O, Q = G['O'], G['Q']
        else:
            O = bp._obb0(P1)
            e0, eN = nodes[end_node[(si, 0)]], nodes[end_node[(si, 1)]] if (si, 1) in end_node else None
            Q = None
            if eN is not None and (si, 0) in end_node:
                Q = [e0, rec['bend']['pv'], eN] if (rec['nb'] == 1 and 'pv' in rec.get('bend', {})) else [e0] + S[si]['p'][1:-1] + [eN]
        # curve vertices: road-polyline vertices on the outer cycle turning in [BEND_MIN, CURVE_MAX), not in a complete arc
        n1 = len(keep)
        curve_v = [ninfo[keep[i][0]][0] == 'v' and i not in arcverts and ps.BEND_MIN <= abs(turn_at(P1, i)) < CURVE_MAX
                   for i in range(n1)]
        curved = any(curve_v[i] and curve_v[(i + 1) % n1] for i in range(n1))
        chains = []
        if all(curve_v):
            chains.append(list(range(n1)))
        elif any(curve_v):
            s0 = next(i for i in range(n1) if not curve_v[i])
            cur = []
            for k in range(1, n1 + 1):
                i = (s0 + k) % n1
                if curve_v[i]:
                    cur.append(i)
                elif cur:
                    chains.append(cur)
                    cur = []
            if cur:
                chains.append(cur)

        def src(i):
            k = ninfo[keep[i][0]][1]
            return 'ring' if k >= nS else ('arc' if k in arcs else ('multibend' if M['streets'][k]['nb'] >= 2 else 'street'))
        row['curve_chains'] = [{'nv': len(ch), 'turn': sum(abs(turn_at(P1, i)) for i in ch),
                                'len_mu': sum(math.dist(P1[i], P1[(i + 1) % n1]) for i in ch[:-1]) / sc,
                                'src': sorted({src(i) for i in ch})} for ch in chains]
        sol = solidity(P3)
        nruns = runs_geo22(P3)
        row['corners'] = {str(t): corners(P3, t) for t in (30, 45, 60)}
        row['concave_turn'] = max_concave_turn(P3)
        row['max_curve_turn'] = max([ch['turn'] for ch in row['curve_chains'] if ch['nv'] >= 2] or [0.0])
        flags = {'holed': bool(holes) or row['slit_bounded'], 'c_shaped': row['concave_turn'] >= C_CONCAVE,
                 'triangular': corners(P3, CORNER_DEG) == 3, 'curved': row['max_curve_turn'] > RUN_TOL,
                 'round_joined': len(repl) >= 1}
        primary = next((k for k in CLASSES if flags[k]), 'plain')
        row.update(flags=flags, primary=primary, n_cycles=len(cycles), n_holes=len(holes), solidity=sol, runs=nruns,
                   arcs_replaced=len(repl), area_mu2=abs(areas[outer_i]) / sc / sc - sum(abs(areas[i]) for i in holes) / sc / sc,
                   aspect=O['Lmaj'] / O['Lmin'], members=list(mem), subcuts=list(sub))
        row['P1_mu'] = [[round(x / sc, 3), round(y / sc, 3)] for x, y in P1]
        row['holes_mu'] = [[[round(nodes[nd][0] / sc, 3), round(nodes[nd][1] / sc, 3)] for nd, _ in polys[i]] for i in holes]
        row['P1_px'] = [tuple(p) for p in P1]                                   # W-10b: the cm writer's input
        row['holes_px'] = [[tuple(nodes[nd]) for nd, _ in polys[i]] for i in holes]
        row['area_px2'] = abs(areas[outer_i]) - sum(abs(areas[i]) for i in holes)
        if Q is not None:
            e0 = Q[0]
            row['f'] = 0.5 + ((e0[0] - O['c'][0]) * O['u'][0] + (e0[1] - O['c'][1]) * O['u'][1]) / O['Lmaj']
            row['len_mu'] = pf.plen(Q) / sc
            if len(Q) == 3:
                a1, a2 = math.dist(Q[0], Q[1]), math.dist(Q[1], Q[2])
                row['t'] = a1 / (a1 + a2) if a1 + a2 else None
                if c.get('simple'):
                    assert abs(row['t'] - c['t']) < 1e-12, 't differs from bentcut_parent_face'
        rows.append(row)
    assert gi == len(geoms), 'not every captured parent was matched'
    # bounded leaf faces = blocks; the cut that created each (None: never split by a non-template cut)
    blocks = []
    for f in range(F):
        if openf[f]:
            continue
        blocks.append({'face': f, 'area_mu2': abs(fa[f]) / sc / sc, 'creator_ci': creator.get(f)})
    streets = [{'nb': s['nb'], 'arrive': [e['arrive'] for e in s['ends'] if e['junction']], 'template': k in templ}
               for k, s in enumerate(M['streets'])]
    # W-10b: the leaf faces in the order of the union's final member lists; every rebuilt parent's leaves are one
    # contiguous run of it (each union concatenates whole lists), which the cm writer's cumulative rounding needs
    leaf_order = [f for r in sorted({find(x) for x in range(F)}) for f in members[r]]
    return {'map': info['map'], 'template': template, 'seed': seed, 'scale': sc, 'med_fp_area_mu2': med_fp_area,
            'med_fp_short_mu': med_fp_short, 'n_footprints': len(fp_area), 'faces': F, 'open_faces': sum(openf),
            'cuts': rows, 'blocks': blocks, 'streets': streets, 'pf_cuts': cuts, 'fa': list(fa),
            'openf': list(openf), 'leaf_order': leaf_order, 'templateRule': trec, 'graphFix': fix, 'pf_info': info,
            'nodes_px': [tuple(p) for p in nodes]}


# ---------------------------------------------------------------- aggregation
def summarise(cuts, blocks_by_creator, mapinfo, values=True):
    """the trace rows and distributions for one set of bounded cuts"""
    f = [c['f'] for c in cuts if c.get('f') is not None]
    bent = [c for c in cuts if c.get('t') is not None]
    one = [c for c in cuts if c['arc'] is not None]
    arr = [a for c in cuts for a in c['arrive']]
    lens = [c['len_mu'] for c in cuts if c.get('len_mu') is not None]
    lens_rel = [c['len_mu'] / mapinfo[c['mapkey']]['med_fp_short_mu'] for c in cuts if c.get('len_mu') is not None]
    bl = [b for c in cuts for b in blocks_by_creator.get((c['mapkey'], c['ci']), [])]
    ba_mu = [b['area_mu2'] for b in bl]
    ba_rel = [b['area_mu2'] / mapinfo[b['mapkey']]['med_fp_area_mu2'] for b in bl]
    out = {
        'n_cuts': len(cuts), 'bends_0_1_2': [sum(c['nb'] == k for c in cuts) for k in (0, 1, 2)],
        'cut.sigma': fit_sigma(f) if len(f) >= SIGMA_MIN_N else None,
        'f_values': sorted(r6(x) for x in f) if len(f) < SIGMA_MIN_N else None,
        'f': {'n': len(f), 'sd': r6(_sd(f)), 'absdev_p50': r6(q([abs(x - .5) for x in f], .5)),
              'absdev_p90': r6(q([abs(x - .5) for x in f], .9)), 'in_040_060': sum(.4 <= x <= .6 for x in f)},
        'cut.cornerMid': {'k': sum(abs(c['t'] - .5) <= CORNER_GATE for c in bent), 'n': len(bent),
                          'within_005': sum(abs(c['t'] - .5) <= .05 for c in bent)},
        'cut.arrival85': {'k': sum(a >= ARRIVE_MIN for a in arr), 'n': len(arr), 'p10': r6(q(arr, .1)), 'p50': r6(q(arr, .5))},
        'cut.fillet': {'k': sum(bool(c['arc']) for c in one), 'n': len(one)},
        'cutLength': {'n': len(lens), 'mu': _qs(lens), 'rel_fp_short': _qs(lens_rel),
                      'm_declared': _qs([x * M_PER_MU for x in lens]),
                      'hist_m_declared': hist([x * M_PER_MU for x in lens], LEN_EDGES_M, under=False),
                      'values_mu': sorted(round(x, 3) for x in lens) if values else None},
        'blockArea': {'n': len(ba_mu), 'mu2': _qs(ba_mu), 'areaRel': _qs(ba_rel),
                      'm2_declared': _qs([x * M_PER_MU ** 2 for x in ba_mu]),
                      'hist_m2_declared': hist([x * M_PER_MU ** 2 for x in ba_mu], AREA_EDGES_M2),
                      'values_rel': sorted(round(x, 4) for x in ba_rel) if values else None},
    }
    for key in ('cut.cornerMid', 'cut.arrival85', 'cut.fillet'):
        d = out[key]
        d['share'] = r6(d['k'] / d['n']) if d['n'] else None
    return out


def _sd(xs):
    if len(xs) < 2:
        return None
    m = sum(xs) / len(xs)
    return math.sqrt(sum((x - m) ** 2 for x in xs) / (len(xs) - 1))


def _qs(xs):
    return {'p10': r6(q(xs, .1)), 'p50': r6(q(xs, .5)), 'p90': r6(q(xs, .9)), 'min': r6(min(xs)) if xs else None,
            'max': r6(max(xs)) if xs else None}


def run(caps):
    maps = []
    for cap in caps:
        tmpl = template_of(cap)
        for g in (0, 1):
            fp = os.path.join(cap, 'draw', f'gen-{g}.paths.json')
            if not os.path.exists(fp):
                continue
            maps.append(analyse_map(fp, tmpl, seed_of(cap, g)))
    mapinfo = {m['map']: m for m in maps}
    allcuts, blocks_by_creator, allblocks = [], collections.defaultdict(list), []
    for m in maps:
        for c in m['cuts']:
            c['mapkey'], c['template'], c['seed'] = m['map'], m['template'], m['seed']
            allcuts.append(c)
        for b in m['blocks']:
            b['mapkey'] = m['map']
            allblocks.append(b)
            if b['creator_ci'] is not None:
                blocks_by_creator[(m['map'], b['creator_ci'])].append(b)
    bounded = [c for c in allcuts if not c['open']]
    # pooled checker numbers
    streets = [s for m in maps for s in m['streets']]
    one_bend = (sum(s['nb'] == 1 for s in streets), len(streets))
    arr = [a for s in streets for a in s['arrive']]
    arrive85 = (sum(a >= ARRIVE_MIN for a in arr), len(arr))
    onecuts = [c for m in maps for c in m['pf_cuts'] if 'arc' in c]
    fillet = (sum(bool(c['arc']) for c in onecuts), len(onecuts))
    simple = [c for c in bounded if c['simple']]
    sig = {k: fit_sigma([c['f'] for c in simple if sel(c)]) for k, sel in
           (('plain', lambda c: c['template'] in PLAIN_TEMPLATES), ('ring', lambda c: c['template'] == 'ring'), ('all', lambda c: True))}
    bent_simple = [c for c in simple if c.get('t') is not None]
    corner_mid = (sum(abs(c['t'] - .5) <= CORNER_GATE for c in bent_simple), len(bent_simple))
    # the exclusive partition (primary classes + open cuts + template streets) must sum to the pooled counts
    part = [c for c in bounded] + [c for c in allcuts if c['open']]
    p_fillet = (sum(bool(c['arc']) for c in part if c['arc'] is not None), sum(c['arc'] is not None for c in part))
    t_arr = [a for s in streets if s['template'] for a in s['arrive']]
    p_arr = [a for c in part for a in c['arrive']] + t_arr
    pooled_extra = {'partition_fillet': p_fillet, 'partition_arrive85': (sum(a >= ARRIVE_MIN for a in p_arr), len(p_arr)),
                    'partition_cuts': (len(part) + sum(s['template'] for s in streets), len(streets))}
    pooled = {'one_bend': one_bend, 'arrive85': arrive85, 'fillet': fillet,
              'sigma_plain': (sig['plain']['sigma'], sig['plain']['eps']), 'sigma_ring': (sig['ring']['sigma'], sig['ring']['eps']),
              'sigma_all': (sig['all']['sigma'], sig['all']['eps']), 'corner_mid_bounded': corner_mid}
    pooled.update(pooled_extra)
    census = {'streets': len(streets), 'template_streets': sum(s['template'] for s in streets), 'cuts': len(allcuts),
              'open': sum(c['open'] for c in allcuts), 'bounded': len(bounded), 'bounded_simple': len(simple),
              'bounded_slit': sum(c['slit_bounded'] for c in bounded),
              'bounded_other_nonsimple': sum((not c['simple']) and not c['slit_bounded'] for c in bounded),
              'blocks': len(allblocks), 'blocks_created_by_bounded_parent': sum(len(blocks_by_creator[(c['mapkey'], c['ci'])]) for c in bounded),
              'blocks_created_by_open_parent': sum(len(blocks_by_creator[(c['mapkey'], c['ci'])]) for c in allcuts if c['open']),
              'blocks_never_cut': sum(b['creator_ci'] is None for b in allblocks)}
    # the parent's area equals the sum of its leaf faces' areas (each bounded cut; holes subtracted)
    bad = 0
    for c in bounded:
        leaf = sum(abs(maps[[m['map'] for m in maps].index(c['mapkey'])]['fa'][f]) for f in c['members'])
        leaf /= mapinfo[c['mapkey']]['scale'] ** 2
        bad += abs(leaf - c['area_mu2']) > 1e-6 * c['area_mu2']
    pooled['area_identity_violations'] = (bad, 0)
    census['sensitivity'] = {
        'c_shaped_concave_ge': {str(t): sum(c['concave_turn'] >= t for c in bounded) for t in (90, 120, 135, 180)},
        'triangular_corner_deg': {t: sum(c['corners'][t] == 3 for c in bounded) for t in ('30', '45', '60')},
        'curved_chain_turn_gt': {str(t): sum(c['max_curve_turn'] > t for c in bounded) for t in (5, 10, 20)},
        'corner_count_45': dict(sorted(collections.Counter(c['corners']['45'] for c in bounded).items()))}
    census['flags'] = {k: sum(c['flags'][k] for c in bounded) for k in CLASSES}
    census['flags']['plain'] = sum(not any(c['flags'].values()) for c in bounded)
    census['primary'] = {k: sum(c['primary'] == k for c in bounded) for k in PRECEDENCE}
    # per class (flags, overlapping), the exclusive partition, the template subsets
    sets = collections.OrderedDict()
    for k in CLASSES:
        sets[f'flag:{k}'] = [c for c in bounded if c['flags'][k]]
    sets['flag:plain'] = [c for c in bounded if not any(c['flags'].values())]
    for k in PRECEDENCE:
        sets[f'primary:{k}'] = [c for c in bounded if c['primary'] == k]
    sets['open:no-parent-polygon'] = [c for c in allcuts if c['open']]
    sets['pooled:bounded'] = bounded
    sets['pooled:all-cuts'] = allcuts
    rows = collections.OrderedDict()
    for name, cs in sets.items():
        rows[name] = {'all': summarise(cs, blocks_by_creator, mapinfo)}
        for sub, sel in (('ring', lambda c: c['template'] == 'ring'), ('plain', lambda c: c['template'] in PLAIN_TEMPLATES)):
            rows[name][sub] = summarise([c for c in cs if sel(c)], blocks_by_creator, mapinfo)
        for t in ('ring', 'area', 'street', 'square'):
            rows[name]['template:' + t] = summarise([c for c in cs if c['template'] == t], blocks_by_creator, mapinfo, values=False)
    return maps, mapinfo, bounded, pooled, census, rows


def template_of(cap):
    try:
        m = json.load(open(os.path.join(cap, 'meta.json')))
        return m['args']['query'].split('tags=')[1].split(',')[0]
    except Exception:
        return pf.TEMPLATE_OF[os.path.basename(cap.rstrip('/'))]


def seed_of(cap, g):
    m = json.load(open(os.path.join(cap, 'meta.json')))
    href = next(x['href'] for x in m['passes']['draw'] if x['name'] == f'gen-{g}')
    return int(href.split('seed=')[1].split('&')[0])


def check(pooled):
    lines, ok = [], True
    for k, exp in EXPECT.items():
        got = tuple(pooled[k])
        good = all(abs(a - b) < 1e-9 for a, b in zip(got, exp))
        ok &= good
        lines.append(f"{'PASS' if good else 'FAIL'} {k}: got {got} expected {exp}")
    k, n = pooled['arrive85']
    lines.append(f"     arrive85 share {k / n:.4f} (the row's 96 %)")
    return ok, lines


def faces_doc(maps, bounded, mapinfo):
    """per bounded parent: classes, outer ring and holes in mu, the cut's measures, its subtree's blocks and cuts"""
    by_map = collections.defaultdict(dict)
    for c in bounded:
        by_map[c['mapkey']][c['ci']] = c
    out = []
    for m in maps:
        cmap = {c['ci']: c for c in m['cuts']}
        fmap = {b['face']: b for b in m['blocks']}
        for c in m['cuts']:
            if c['open']:
                continue
            out.append({
                'map': m['map'], 'template': m['template'], 'seed': m['seed'], 'cut': c['si'], 'drawRank': c['rank'],
                'flags': c['flags'], 'primary': c['primary'], 'solidity': r6(c['solidity']), 'runs': c['runs'],
                'corners45': c['corners']['45'], 'concaveTurnDeg': r6(c['concave_turn']), 'maxCurveTurnDeg': r6(c['max_curve_turn']),
                'completeArcs': c['arcs_replaced'], 'cycles': c['n_cycles'],
                'areaMu2': r6(c['area_mu2']), 'aspect': r6(c['aspect']), 'ringMu': c['P1_mu'], 'holesMu': c['holes_mu'],
                'cutMeasures': {'f': r6(c.get('f')), 't': r6(c.get('t')), 'arrival': [r6(a) for a in c['arrive']],
                                'fillet': c['arc'], 'bends': c['nb'], 'lengthMu': r6(c.get('len_mu'))},
                'subtree': {
                    'blockAreasMu2': sorted(r6(fmap[f]['area_mu2']) for f in c['members'] if f in fmap),
                    'cuts': [{'cut': cmap[k]['si'], 't': r6(cmap[k].get('t')), 'arrival': [r6(a) for a in cmap[k]['arrive']],
                              'fillet': cmap[k]['arc'], 'bends': cmap[k]['nb'], 'lengthMu': r6(cmap[k].get('len_mu'))}
                             for k in c['subcuts'] + [c['ci']]]},
            })
    return out


def md_tables(pooled, census, rows):
    W = []
    W.append('| set | n cuts | bends 0/1/2 | cut.sigma (eps) | sd f | cut.cornerMid | cut.arrival85 | cut.fillet | cut length mu p10 · p50 · p90 | blocks | block areaRel p10 · p50 · p90 |')
    W.append('|---|---|---|---|---|---|---|---|---|---|---|')
    for name, rr in rows.items():
        for sub in ('all', 'ring', 'plain'):
            s = rr[sub]
            if not s['n_cuts']:
                continue
            sg = s['cut.sigma']
            W.append(f"| {name} {sub} | {s['n_cuts']} | {'/'.join(map(str, s['bends_0_1_2']))} | "
                     f"{_sig(sg)} | "
                     f"{_f(s['f']['sd'], 3)} | {_ks(s['cut.cornerMid'])} | {_ks(s['cut.arrival85'])} | {_ks(s['cut.fillet'])} | "
                     f"{_q3(s['cutLength']['mu'], 0)} | {s['blockArea']['n']} | {_q3(s['blockArea']['areaRel'], 1)} |")
    return '\n'.join(W)


def _sig(sg):
    return '-' if not sg else f"{sg['sigma']:.3f} ({sg['eps']})"


def _f(x, d):
    return '-' if x is None else f'{x:.{d}f}'


def _ks(d):
    return f"{d['k']}/{d['n']}" + (f" ({100 * d['k'] / d['n']:.0f} %)" if d['n'] else '')


def _q3(d, nd):
    return '-' if d['p50'] is None else f"{d['p10']:.{nd}f} · {d['p50']:.{nd}f} · {d['p90']:.{nd}f}"


# ================================================================ W-10b: the plan seeds (lane m1/W-10b)
# M-1-plan.md section 2 row W-10b; R-01 (declared 0.35 m per model unit), R-03 (rows from W-04's formula seeds), R-09
# (template roads generalised; the five face classes descriptive, < 10 bounded bent cuts a known-defects entry), R-14
# (plan section 7b, the faces of the ng-faces.json candidate), R-15 (cut.length), R-47 (a) (measured values; W-15 forms the
# rows); the closing check's N-02 (referenceBuild on every face and hood record) and N-03 (cm2 integers).
import gzip  # noqa: E402
import hashlib  # noqa: E402
import re  # noqa: E402

import measure_ng as mng  # noqa: E402  (our own: q7, the V12 estimators, spreadKS, the C2 patterns, the segment test)

PLAN_LANE = 'm1/W-10b'
PLAN_SEEDS = os.path.join(ROOT, 'research', 'baselines', 'inputs', 'NG', 'itch-11441280', 'plan-seeds')
PLAN_INDEX = os.path.join(PLAN_SEEDS, 'index.json')
HOODS_FILE = os.path.join(ROOT, 'research', 'baselines', 'candidates', 'ng-faces.hoods.json')
METRICS_FILE = os.path.join(ROOT, 'research', 'baselines', 'metrics.m-1.json')
OUT_PLAN_JSON = os.path.join(ROOT, 'docs', 'calibration', 'E10-ng-bentcut-faces.plan.json')
E11_PLAN = os.path.join(ROOT, 'docs', 'calibration', 'E11-ng-rows.plan.json')
OUT_PLAN_FACES = os.path.join(ROOT, 'docs', 'calibration', 'E10-ng-bentcut-faces.plan.faces.json')
OUT_CANDIDATE = os.path.join(ROOT, 'research', 'baselines', 'candidates', 'ng-faces.json')
CM_PER_MU = M_PER_MU * 100.0               # 35 cm per model unit, declared (R-01)
TEMPLATES = ('area', 'street', 'square', 'ring')
CLASS_KEYS = {'holed': 'holed', 'c_shaped': 'cShaped', 'triangular': 'triangular', 'curved': 'curved',
              'round_joined': 'roundJoined'}
FACE_FIELDS = ('id', 'referenceBuild', 'hood', 'template', 'classes', 'ringCm', 'holesCm', 'blockAreasCm2', 'cuts')
CUT_FIELDS = ('lengthCm', 'cornerT', 'arrivalCdeg', 'fillet', 'bends')
HOOD_FIELDS = ('id', 'referenceBuild', 'template', 'seedLabel', 'capture', 'outlineCm')
CANDIDATE_HEAD = {'schema': 'plat.ng-faces/1', 'referenceBuild': REFERENCE_BUILD, 'metricsVersion': '1.0.0',
                  'scaleDeclared': {'mPerModelUnit': M_PER_MU}, 'outlineKind': 1}
# section 13.5's recorded numbers (the 2026-09-25 captures; E10 section 2) that the formula values are compared with
RECORDED = {'cut.sigma plain (simple parents)': 0.066, 'cut.sigma ring (simple parents)': 0.098,
            'cut.sigma all (simple parents)': 0.088, 'cut.sigma ring (rebuilt parents)': 0.100,
            'cut.cornerMid (simple parents)': 99 / 120, 'cut.arrival85 (all streets)': 780 / 811,
            'cut.fillet (one-bend cuts)': 200 / 378, 'one-bend share (all streets)': 380 / 519}
HEX6 = re.compile(r'(?<![0-9a-fA-F])[0-9a-fA-F]{6}(?![0-9a-fA-F])')   # a hex-delimited six-digit run (N-03's reading)
HEX6_LITERAL = re.compile(r'[0-9a-fA-F]{6}')                            # V12 C4's literal words, reported only


def sha256(path):
    return hashlib.sha256(open(path, 'rb').read()).hexdigest()


def plan_entries():
    idx = json.load(open(PLAN_INDEX))
    ents = [e for e in idx['maps'] if e['size'] == 'medium']
    by_t = collections.defaultdict(list)
    for e in ents:
        by_t[e['template']].append(e['i'])
    assert sorted(by_t) == sorted(TEMPLATES) and all(by_t[t] == list(range(5)) for t in TEMPLATES), \
        'the plan-seed index does not hold five medium seeds per template in index order'
    return idx, ents


def _grid(points, cell):
    g = collections.defaultdict(list)
    for p in points:
        g[(math.floor(p[0] / cell), math.floor(p[1] / cell))].append(p)
    return g


def _near(g, cell, p, tol):
    gx, gy = math.floor(p[0] / cell), math.floor(p[1] / cell)
    return any(math.dist(p, q) <= tol for dx in (-1, 0, 1) for dy in (-1, 0, 1) for q in g.get((gx + dx, gy + dy), ()))


def frame_check(m, e):
    """the faces are W-11b's blocks in the registered road frame: the MeasureInput file is the indexed one (sha256), every
    rebuilt parent's ring vertex is a vertex of one of its ways (within 1e-6 px), and the bounded faces' areas equal its
    block polygons' (outer less islands), sorted, within 1e-9 relative"""
    path = os.path.join(PLAN_SEEDS, e['file'])
    ok_sha = sha256(path) == e['sha256']
    with gzip.open(path, 'rb') as fh:
        mi = json.loads(fh.read().decode())
    ways = [tuple(q) for f in mi['features'] if f['kind'] == 'way' for q in f['geometry']['coordinates']]
    g = _grid(ways, 1.0)
    pts = [p for c in m['cuts'] if not c['open'] for p in c['P1_px'] + [q for h in c['holes_px'] for q in h]]
    missing = sum(not _near(g, 1.0, p, 1e-6) for p in pts)
    blk = sorted(abs(mng.sarea([tuple(q) for q in f['geometry']['coordinates'][0][:-1]]))
                 - sum(abs(mng.sarea([tuple(q) for q in h[:-1]])) for h in f['geometry']['coordinates'][1:])
                 for f in mi['features'] if f['kind'] == 'block')
    mine = sorted(abs(m['fa'][f]) for f in range(m['faces']) if not m['openf'][f])
    same_n = len(blk) == len(mine)
    worst = max((abs(a - b) / max(a, 1e-12) for a, b in zip(blk, mine)), default=0.0) if same_n else None
    c = e['census']
    census_ok = (m['faces'], m['open_faces'], m['faces'] - m['open_faces']) == (c['faces'], c['openFaces'], c['blocks'])
    # W-11b's built rule on its own block rings (>= 1 footprint area centroid inside, islands excluded), each block
    # matched to the bounded face of equal area (unique within 1e-9 relative)
    rings = [[[tuple(q) for q in r[:-1]] for r in f['geometry']['coordinates']] for f in mi['features'] if f['kind'] == 'block']
    cents = [mng.area_centroid([tuple(q) for q in f['geometry']['coordinates'][0][:-1]]) for f in mi['features'] if f['kind'] == 'building']
    built_blk = set()
    for bi, rr in enumerate(rings):
        xs, ys = [p[0] for p in rr[0]], [p[1] for p in rr[0]]
        if any(min(xs) <= q[0] <= max(xs) and min(ys) <= q[1] <= max(ys) and mng.in_poly(rr, q) for q in cents):
            built_blk.add(bi)
    ar = [abs(mng.sarea(rr[0])) - sum(abs(mng.sarea(h)) for h in rr[1:]) for rr in rings]
    built_faces, unmatched = set(), 0
    for f in range(m['faces']):
        if m['openf'][f]:
            continue
        hit = [bi for bi, a in enumerate(ar) if abs(a - abs(m['fa'][f])) <= 1e-9 * a]
        if len(hit) != 1:
            unmatched += 1
        elif hit[0] in built_blk:
            built_faces.add(f)
    m['built_faces'] = built_faces
    return {'inputSha256Matches': ok_sha, 'ringVertices': len(pts), 'ringVerticesNotOnAWay': missing,
            'blocks': len(blk), 'boundedFaces': len(mine), 'blockAreasWorstRel': worst,
            'censusEqualsAdapter': census_ok, 'adapterCensus': {'faces': c['faces'], 'openFaces': c['openFaces'], 'blocks': c['blocks']},
            'builtFaces': len(built_faces), 'facesNotMatchedOneToOne': unmatched,
            'pass': ok_sha and missing == 0 and same_n and worst is not None and worst <= 1e-9 and census_ok and unmatched == 0}


def ring_cm(P, k):
    out = []
    for x, y in P:
        q = [int(round(x * k)), int(round(y * k))]
        if not out or q != out[-1]:
            out.append(q)
    while len(out) > 1 and out[0] == out[-1]:
        out.pop()
    return out


def ring_simple(P):
    """P open (not closed): at least 3 distinct vertices, none repeated, no two non-adjacent edges meeting"""
    n = len(P)
    if n < 3 or len({tuple(q) for q in P}) != n:
        return False
    E = [(P[i], P[(i + 1) % n]) for i in range(n)]
    for i in range(n):
        for j in range(i + 1, n):
            if j == i + 1 or (i == 0 and j == n - 1):
                continue
            if mng._segx(E[i][0], E[i][1], E[j][0], E[j][1]):
                return False
    return True


def oriented(P, positive):
    a = mng.sarea([tuple(q) for q in P])
    return P if (a > 0) == positive else P[::-1]


def closed(P):
    return [list(q) for q in P] + [list(P[0])]


def perimeter(P):
    n = len(P)
    return sum(math.dist(P[i], P[(i + 1) % n]) for i in range(n))


def in_poly(P, x):
    c = False
    n = len(P)
    for i in range(n):
        (x0, y0), (x1, y1) = P[i], P[(i + 1) % n]
        if (y0 > x[1]) != (y1 > x[1]) and x[0] < x0 + (x[1] - y0) * (x1 - x0) / (y1 - y0):
            c = not c
    return c


def seg_dist(p, a, b):
    return ps.seg_dist(p, a, b)


def cut_record(c):
    t = c.get('t')
    return {'lengthCm': int(round(c['len_mu'] * CM_PER_MU)),
            'cornerT': int(round(t * 1000)) if (c['nb'] == 1 and t is not None) else -1,
            'arrivalCdeg': int(round(min(c['arrive']) * 100)) if c['arrive'] else -1,
            'fillet': 1 if c['arc'] else 0, 'bends': int(c['nb'])}


def map_faces(m, hood, next_id):
    """plan section 7b face records for one map: (records, exclusions, per-face exact-area receipts)"""
    k = CM_PER_MU / m['scale']                                  # cm per road-canvas px (= the hoods' cmPerPx)
    k2 = k * k
    # integer leaf areas by cumulative rounding along the union's final order (each parent's leaves are contiguous in it)
    acc, prev, leaf_int, leaf_exact = 0.0, 0, {}, {}
    for f in m['leaf_order']:
        if m['openf'][f]:
            continue
        a = abs(m['fa'][f]) * k2
        acc += a
        cur = int(round(acc))
        leaf_int[f], leaf_exact[f] = cur - prev, a
        prev = cur
    cmap = {c['ci']: c for c in m['cuts']}
    recs, excl, receipts = [], [], []
    for c in sorted((c for c in m['cuts'] if not c['open']), key=lambda c: c['rank']):
        if c.get('degenerate'):
            excl.append({'map': m['map'], 'cut': c['si'], 'primary': c['primary'],
                         'reason': 'degenerate: its two sides were one face at its removal and its parent has no inner cycle '
                                   '(the duplicate-edge overlap fused it with a later street); its face would repeat that '
                                   'street\'s'})
            continue
        ring = ring_cm(c['P1_px'], k)
        holes = [ring_cm(h, k) for h in c['holes_px']]
        why = None
        if not ring_simple(ring):
            why = 'outer ring not simple at integer cm (a slit: the boundary runs along both sides of a cut)' \
                if c['n_cycles'] == 1 and not c['simple'] else 'outer ring not simple at integer cm'
        elif not all(ring_simple(h) for h in holes):
            why = 'a hole ring not simple at integer cm'
        mem = c['members']
        assert all(not m['openf'][f] for f in mem), 'a rebuilt parent holds an open leaf'
        exact = c['area_px2'] * k2
        leaf_sum_exact = sum(leaf_exact[f] for f in mem)
        ints = sorted(leaf_int[f] for f in mem)
        cuts = sorted([c['ci']] + list(c['subcuts']), key=lambda ci: cmap[ci]['rank'])
        assert cuts[0] == c['ci'], 'a sub-cut precedes its parent cut'
        rc = {'map': m['map'], 'cut': c['si'], 'rank': c['rank'], 'exactAreaCm2': exact, 'leafSumExactCm2': leaf_sum_exact,
              'leafSumIntCm2': sum(ints), 'leaves': len(mem), 'excluded': why}
        receipts.append(rc)
        if why:
            excl.append({'map': m['map'], 'cut': c['si'], 'reason': why, 'primary': c['primary']})
            continue
        ring = oriented(ring, True)
        holes = [oriented(h, False) for h in holes]
        rec = {'id': next_id + len(recs), 'referenceBuild': REFERENCE_BUILD, 'hood': hood['id'], 'template': hood['template'],
               'classes': {CLASS_KEYS[kk]: int(bool(c['flags'][kk])) for kk in CLASSES},
               'ringCm': closed(ring), 'holesCm': [closed(h) for h in holes], 'blockAreasCm2': ints,
               'cuts': [cut_record(cmap[ci]) for ci in cuts]}
        rc['id'] = rec['id']
        rc['ringAreaCm2'] = abs(mng.sarea([tuple(q) for q in ring])) - sum(abs(mng.sarea([tuple(q) for q in h])) for h in holes)
        rc['roundingBoundCm2'] = (math.sqrt(2) / 2) * (perimeter(ring) + sum(perimeter(h) for h in holes)) + 1.0
        recs.append(rec)
    return recs, excl, receipts


def check_candidate(doc, hoods_src, receipts):
    """plan section 7b's research-side checks on the assembled candidate (each a (name, pass, detail))"""
    out = []
    head_ok = all(doc.get(kk) == v for kk, v in CANDIDATE_HEAD.items()) and set(doc) == set(CANDIDATE_HEAD) | {'hoods', 'faces'}
    out.append(('header: schema, referenceBuild at the top, metricsVersion, scaleDeclared, outlineKind; no other key', head_ok,
                {kk: doc.get(kk) for kk in CANDIDATE_HEAD}))
    hoods, faces = doc['hoods'], doc['faces']
    hood_ok, hood_detail = mng.check_hoods({'hoods': hoods, 'researchSidecar': hoods_src['researchSidecar']})
    same_hoods = hoods == hoods_src['hoods']
    out.append(('hoods: W-11b\'s 20 records unchanged and its section 7b checks re-run (integer cm, closed simple rings, '
                'C2, referenceBuild on each)', hood_ok and same_hoods, hood_detail))
    bad = collections.Counter()
    ex = []

    def flag(kind, msg):
        bad[kind] += 1
        if len(ex) < 8:
            ex.append(msg)
    hood_by_id = {h['id']: h for h in hoods}
    if [f['id'] for f in faces] != list(range(len(faces))):
        flag('ids', 'face ids not 0..n-1')
    for f in faces:
        fid = f.get('id')
        if tuple(f) != FACE_FIELDS:
            flag('fields', f'face {fid}: fields {list(f)}')
            continue
        if f['referenceBuild'] != REFERENCE_BUILD or not re.match(mng.C2_BUILD, f['referenceBuild']):
            flag('referenceBuild', f'face {fid}: referenceBuild')
        h = hood_by_id.get(f['hood'])
        if h is None or f['template'] != h['template'] or f['template'] not in TEMPLATES:
            flag('hood', f'face {fid}: hood or template')
        if set(f['classes']) != set(CLASS_KEYS.values()) or any(v not in (0, 1) or isinstance(v, bool) for v in f['classes'].values()):
            flag('classes', f'face {fid}: classes')
        rings = [f['ringCm']] + list(f['holesCm'])
        for r in rings:
            if not all(isinstance(v, int) and not isinstance(v, bool) for q in r for v in q) or not all(len(q) == 2 for q in r):
                flag('integer', f'face {fid}: a non-integer coordinate')
                break
            if len(r) < 4 or r[0] != r[-1] or not ring_simple(r[:-1]):
                flag('ring', f'face {fid}: a ring not closed or not simple')
                break
        else:
            outer = [tuple(q) for q in f['ringCm'][:-1]]
            if mng.sarea(outer) <= 0 or any(mng.sarea([tuple(q) for q in hh[:-1]]) >= 0 for hh in f['holesCm']):
                flag('orientation', f'face {fid}: orientation')
            if any(not in_poly(outer, tuple(hh[0])) for hh in f['holesCm']):
                flag('hole', f'face {fid}: a hole outside its ring')
            if h is not None:
                ho = [tuple(q) for q in h['outlineCm'][:-1]]
                n_out = sum(not in_poly(ho, q) and min(seg_dist(q, ho[i], ho[(i + 1) % len(ho)]) for i in range(len(ho))) > 2.0
                            for q in outer)
                if n_out:
                    flag('hood containment', f'face {fid}: {n_out} ring vertices outside its hood outline')
        if not f['blockAreasCm2'] or not all(isinstance(v, int) and not isinstance(v, bool) and v > 0 for v in f['blockAreasCm2']):
            flag('blocks', f'face {fid}: block areas')
        if not f['cuts']:
            flag('cuts', f'face {fid}: no cut')
        for cr in f['cuts']:
            if tuple(cr) != CUT_FIELDS or not all(isinstance(v, int) and not isinstance(v, bool) for v in cr.values()):
                flag('cut fields', f'face {fid}: a cut record')
                continue
            if not (cr['lengthCm'] > 0 and (cr['cornerT'] == -1 or 0 <= cr['cornerT'] <= 1000) and 0 <= cr['arrivalCdeg'] <= 9000
                    and cr['fillet'] in (0, 1) and cr['bends'] >= 0 and (cr['bends'] == 1 or cr['cornerT'] == -1)
                    and (cr['fillet'] == 0 or cr['bends'] == 1)):
                flag('cut values', f'face {fid}: cut values {cr}')
    out.append(('faces: integer ids 0..n-1; the section 7b fields exactly; referenceBuild on every face (N-02); hood and template '
                'consistent; class flags 0/1; every coordinate an integer; rings closed and simple, outer positive and holes '
                'negative, holes inside; every ring vertex inside its hood outline (2 cm slack); block areas positive integers; '
                'cut records exact with values in range (cornerT -1 whenever bends != 1; fillet only on one-bend cuts)',
                not bad, {'faces': len(faces), 'failures': dict(bad), 'examples': ex}))
    # numbers: every number an integer except the declared scale
    nonint = []

    def walk(x, path):
        if isinstance(x, bool):
            nonint.append(path)
        elif isinstance(x, float):
            if path != '$.scaleDeclared.mPerModelUnit':
                nonint.append(path)
        elif isinstance(x, dict):
            for kk, v in x.items():
                walk(v, f'{path}.{kk}')
        elif isinstance(x, list):
            for i, v in enumerate(x):
                walk(v, f'{path}[{i}]')
    walk(doc, '$')
    out.append(('every number an integer (the header\'s declared 0.35 m per model unit apart); no boolean', not nonint,
                {'nonIntegers': nonint[:5], 'count': len(nonint)}))
    # strings: V12 section 3.3 C2's patterns, the schema's enumerations and constants; no six-hex run in a string (N-03)
    strs = []

    def walk_s(x, path):
        if isinstance(x, str):
            strs.append((path, x))
        elif isinstance(x, dict):
            for kk, v in x.items():
                walk_s(v, f'{path}.{kk}')
        elif isinstance(x, list):
            for i, v in enumerate(x):
                walk_s(v, f'{path}[{i}]')
    walk_s(doc, '$')
    bad_s = []
    for path, s in strs:
        leaf = re.sub(r'\[\d+\]', '[]', path).split('.')[-1]
        ok = ((leaf == 'schema' and s == CANDIDATE_HEAD['schema'])
              or (leaf == 'metricsVersion' and re.match(r'^\d+\.\d+\.\d+$', s))
              or (leaf == 'referenceBuild' and re.match(mng.C2_BUILD, s) and s == REFERENCE_BUILD)
              or (leaf == 'template' and s in TEMPLATES)
              or (leaf == 'seedLabel' and re.match(mng.C2_LABEL, s))
              or (leaf == 'capture' and re.match(mng.C2_CAPTURE, s)))
        if not ok or HEX6.search(s):
            bad_s.append((path, s))
    kinds = collections.Counter(re.sub(r'\[\d+\]', '[]', p) for p, _ in strs)
    literal = collections.Counter(re.sub(r'\[\d+\]', '[]', p) for p, s in strs if HEX6_LITERAL.search(s))
    out.append(('every string matches V12 section 3.3 C2\'s pattern for its field (seedLabel, capture, referenceBuild) or the '
                'schema\'s enumeration / constant (template, schema, metricsVersion); no hex-delimited six-digit run in any '
                'string (N-03\'s reading; the literal "anywhere" reading is reported beside it)',
                not bad_s, {'strings': len(strs), 'byField': dict(sorted(kinds.items())), 'bad': bad_s[:5],
                            'literalReadingHitsByField': dict(sorted(literal.items()))}))
    # areas, read from the FILE's integers: each face's block areas sum to its exact area (the geometry it was written
    # from, by its receipt) within one cm2 and hold its leaf count; its integer rings' own area lies within their
    # coordinate-rounding bound of that sum; and every rebuilt parent's exact area equals its exact leaves'
    by_id = {r['id']: r for r in receipts if r.get('id') is not None}
    e1 = max((abs(r['exactAreaCm2'] - r['leafSumExactCm2']) for r in receipts), default=0.0)
    e2, e3, e3r, over, nleaf, missing = [], [], [], 0, 0, 0
    for f in faces:
        r = by_id.get(f.get('id'))
        ba = f.get('blockAreasCm2') or []
        if r is None or not all(isinstance(v, (int, float)) for v in ba):
            missing += 1
            continue
        tot = sum(ba)
        nleaf += len(ba) != r['leaves']
        e2.append(abs(tot - r['exactAreaCm2']))
        try:
            ring = [tuple(q) for q in f['ringCm'][:-1]]
            holes = [[tuple(q) for q in hh[:-1]] for hh in f['holesCm']]
            a = abs(mng.sarea(ring)) - sum(abs(mng.sarea(hh)) for hh in holes)
            bound = (math.sqrt(2) / 2) * (perimeter(ring) + sum(perimeter(hh) for hh in holes)) + 1.0
        except (TypeError, ValueError, KeyError, IndexError, ZeroDivisionError):
            missing += 1
            continue
        e3.append(abs(a - tot))
        e3r.append(abs(a - tot) / r['exactAreaCm2'])
        over += abs(a - tot) > bound
    out.append(('every face\'s area equals its leaves\' sum within one cm2: the exact face area against the exact leaves '
                '(every rebuilt parent), and the file\'s integer block areas (cumulative rounding along the union order) '
                'against the exact face area, with each face\'s leaf count; the integer rings\' own area within their '
                'coordinate-rounding bound of the file\'s sum',
                e1 <= 1.0 and max(e2, default=0.0) <= 1.0 and over == 0 and nleaf == 0 and missing == 0 and len(by_id) == len(faces),
                {'faces': len(faces), 'parents': len(receipts), 'maxExactVsExactLeavesCm2': e1,
                 'maxExactVsFileLeavesCm2': max(e2, default=0.0), 'leafCountMismatches': nleaf, 'unreadable': missing,
                 'ringVsFileLeaves': {'maxCm2': max(e3, default=0.0), 'maxRel': max(e3r, default=0.0),
                                      'p50Rel': mng.q7(e3r, .5), 'overBound': over}}))
    return out


def _leaf_census(maps, receipts):
    """the distinct leaf faces the candidate's faces hold, and how many of them W-11b's rule calls unbuilt"""
    inc = {(r['map'], r['cut']) for r in receipts if r['excluded'] is None}
    leaves, unbuilt = set(), set()
    for m in maps:
        for c in m['cuts']:
            if (m['map'], c['si']) in inc:
                for f in c['members']:
                    leaves.add((m['map'], f))
                    if f not in m['built_faces']:
                        unbuilt.add((m['map'], f))
    return {'distinct': len(leaves), 'unbuilt': len(unbuilt),
            'note': 'blockAreasCm2 holds every bounded leaf (the area identity needs them all); W-11b\'s block.area row holds '
                    'built blocks only (>= 1 footprint area centroid)'}


def rebuilt(c):
    """a cut with a rebuilt parent that is its own (plan mode: a degenerate dead-end cut excluded)"""
    return not c['open'] and not c.get('degenerate')


def subset_maps(maps, name):
    if name == 'pooled':
        return maps
    if name == 'ring':
        return [m for m in maps if m['template'] == 'ring']
    if name == 'plain':
        return [m for m in maps if m['template'] in PLAIN_TEMPLATES]
    return [m for m in maps if m['template'] == name.split(':')[1]]


def _share(k, n):
    return {'k': k, 'n': n, 'share': (k / n) if n else None}


def measure_cuts(bounded, allcuts, mapinfo):
    """the five metrics on one set of cuts: bounded = cuts with a rebuilt parent; allcuts = every non-template street"""
    f = [c['f'] for c in bounded if c.get('f') is not None]
    fs = [c['f'] for c in bounded if c.get('simple') and c.get('f') is not None]
    bent = [c for c in bounded if c.get('t') is not None]
    lens = [c['len_mu'] * M_PER_MU for c in bounded if c.get('len_mu') is not None]
    lens_jj = lens + [c['len_mu_jj'] * M_PER_MU for c in allcuts if c['open'] and c.get('len_mu_jj') is not None]
    arr_b = [a for c in bounded for a in c['arrive']]
    arr_a = [a for c in allcuts for a in c['arrive']]
    one_b = [c for c in bounded if c['arc'] is not None]
    one_a = [c for c in allcuts if c['arc'] is not None]
    return {
        'nCuts': {'bounded': len(bounded), 'allCuts': len(allcuts)},
        'bends012': {'bounded': [sum(c['nb'] == x for c in bounded) for x in (0, 1, 2)],
                     'allCuts': [sum(c['nb'] == x for c in allcuts) for x in (0, 1, 2)]},
        'cut.sigma': {'rebuiltParents': fit_sigma(f) if len(f) >= SIGMA_MIN_N else None,
                      'simpleParents': fit_sigma(fs) if len(fs) >= SIGMA_MIN_N else None,
                      'nF': len(f), 'nFSimple': len(fs),
                      'fValues': sorted(r6(x) for x in f) if len(f) < SIGMA_MIN_N else None},
        'cut.cornerMid': dict(_share(sum(abs(c['t'] - .5) <= CORNER_GATE for c in bent), len(bent)),
                              oneBendOnly=_share(sum(abs(c['t'] - .5) <= CORNER_GATE for c in bent if c['nb'] == 1),
                                                 sum(c['nb'] == 1 for c in bent))),
        'cut.arrival85': {'allCuts': _share(sum(a >= ARRIVE_MIN for a in arr_a), len(arr_a)),
                          'bounded': _share(sum(a >= ARRIVE_MIN for a in arr_b), len(arr_b))},
        'cut.fillet': {'allCuts': _share(sum(bool(c['arc']) for c in one_a), len(one_a)),
                       'bounded': _share(sum(bool(c['arc']) for c in one_b), len(one_b))},
        'cut.length': {'n': len(lens), 'm_declared': {kk: (mng.q7(lens, p) if lens else None) for kk, p in
                                                      (('p10', .1), ('p50', .5), ('p90', .9))},
                       'min': min(lens) if lens else None, 'max': max(lens) if lens else None,
                       'hist': dict(hist(lens, LEN_EDGES_M, under=False), edges='5 m bins 0-400 m declared, overflow'),
                       'values': sorted(round(x, 4) for x in lens)},
        'cut.length.allJJ': {'n': len(lens_jj), 'm_declared': {kk: (mng.q7(lens_jj, p) if lens_jj else None) for kk, p in
                                                               (('p10', .1), ('p50', .5), ('p90', .9))},
                             'hist': dict(hist(lens_jj, LEN_EDGES_M, under=False), edges='5 m bins 0-400 m declared, overflow'),
                             'values': sorted(round(x, 4) for x in lens_jj)},
    }


def _spread(dists):
    use = [d for d in dists if d['n']]
    sp = mng.spread_ks([d['hist'] for d in use], [d['values'] for d in use])
    sp['seedsWithCuts'] = len(use)
    return sp


def plan_rows(maps):
    """measured values per subset (pooled, ring, plain, per template), per seed in plan order, with V12's estimators"""
    rows = collections.OrderedDict()
    for name in ('pooled', 'ring', 'plain') + tuple('template:' + t for t in TEMPLATES):
        ms = subset_maps(maps, name)
        per = []
        for m in ms:
            b = [c for c in m['cuts'] if rebuilt(c)]
            per.append(measure_cuts(b, m['cuts'], None))
        allb = [c for m in ms for c in m['cuts'] if rebuilt(c)]
        alla = [c for m in ms for c in m['cuts']]
        pooled = measure_cuts(allb, alla, None)
        sample = {'labels': [m['entry']['label'] for m in ms], 'captures': [os.path.basename(m['entry']['capture']) for m in ms],
                  'families': sorted({m['entry']['family'] for m in ms}, key=lambda s: TEMPLATES.index(s.split('/')[2])),
                  'indicesPerFamily': [0, 5], 'usable': len(ms), 'failed': []}

        def ps_share(path):
            vals = []
            for p in per:
                x = p
                for kk in path:
                    x = x[kk]
                vals.append(x['share'])
            return {'perSeed': vals, 'estimate': mng.estimate(vals)}
        sig_seed = [(p['cut.sigma']['rebuiltParents'] or {}).get('sigma') for p in per]
        hs = [p['cut.length']['hist'] for p in per]
        rs = [p['cut.length']['values'] for p in per]
        usable = [i for i, h in enumerate(hs) if sum(h['bins']) + h['overflow'] > 0]
        spread = mng.spread_ks([hs[i] for i in usable], [rs[i] for i in usable])
        spread['seedsWithCuts'] = len(usable)
        rows[name] = {
            'sample': sample,
            'cut.sigma': {'role': 'target', 'pooledFit': pooled['cut.sigma'],
                          'perSeed': sig_seed, 'perSeedN': [p['cut.sigma']['nF'] for p in per],
                          'perSeedEstimate': mng.estimate(sig_seed),
                          'note': 'pooled maximum-likelihood fit over the subset (the recorded-frame measure section 13.5 '
                                  'quotes); per seed only where a seed has >= 10 bounded cuts'},
            'cut.cornerMid': {'role': 'target', 'pooled': pooled['cut.cornerMid'], **ps_share(('cut.cornerMid',))},
            'cut.arrival85': {'role': 'target', 'pooled': pooled['cut.arrival85'],
                              'allCuts': ps_share(('cut.arrival85', 'allCuts')), 'bounded': ps_share(('cut.arrival85', 'bounded'))},
            'cut.fillet': {'role': 'target', 'pooled': pooled['cut.fillet'],
                           'allCuts': ps_share(('cut.fillet', 'allCuts')), 'bounded': ps_share(('cut.fillet', 'bounded'))},
            'cut.length': {'role': 'target', 'unit': 'm (declared 0.35 m per model unit, R-01)',
                           'pooled': {kk: v for kk, v in pooled['cut.length'].items() if kk != 'values'},
                           'perSeed': [{kk: p['cut.length'][kk] for kk in ('n', 'm_declared', 'min', 'max')} for p in per],
                           'perSeedMedian': mng.estimate([p['cut.length']['m_declared']['p50'] for p in per]),
                           'perSeedHist': hs, 'spreadKS': spread},
            'cut.length.allJJ': {'role': 'companion (every cut with two snapped ends, open parents included)',
                                 'pooled': {kk: v for kk, v in pooled['cut.length.allJJ'].items() if kk != 'values'},
                                 'perSeedN': [p['cut.length.allJJ']['n'] for p in per],
                                 'spreadKS': _spread([p['cut.length.allJJ'] for p in per])},
            'counts': {'bounded': pooled['nCuts']['bounded'], 'allCuts': pooled['nCuts']['allCuts'],
                       'bends012': pooled['bends012']},
        }
    return rows


def class_rows(maps):
    """the five face classes (flags, overlapping) and the exclusive partition: descriptive (R-09)"""
    out = collections.OrderedDict()
    mapinfo = {m['map']: m for m in maps}
    blocks_by_creator = collections.defaultdict(list)
    for m in maps:
        for b in m['blocks']:
            b['mapkey'] = m['map']
            if b['creator_ci'] is not None:
                blocks_by_creator[(m['map'], b['creator_ci'])].append(b)
    bounded = [c for m in maps for c in m['cuts'] if rebuilt(c)]
    sets = collections.OrderedDict()
    for kk in CLASSES:
        sets['flag:' + kk] = [c for c in bounded if c['flags'][kk]]
    sets['flag:plain'] = [c for c in bounded if not any(c['flags'].values())]
    for kk in PRECEDENCE:
        sets['primary:' + kk] = [c for c in bounded if c['primary'] == kk]
    for name, cs in sets.items():
        rr = collections.OrderedDict()
        for sub in ('all', 'ring', 'plain') + tuple('template:' + t for t in TEMPLATES):
            sel = cs if sub == 'all' else [c for c in cs if (c['template'] == 'ring' if sub == 'ring' else
                                                             c['template'] in PLAIN_TEMPLATES if sub == 'plain' else
                                                             c['template'] == sub.split(':')[1])]
            s = summarise(sel, blocks_by_creator, mapinfo, values=False)
            bent = s['cut.cornerMid']['n']
            rr[sub] = {'nCuts': s['n_cuts'], 'bends012': s['bends_0_1_2'], 'cut.sigma': s['cut.sigma'], 'fValues': s['f_values'],
                       'cut.cornerMid': s['cut.cornerMid'], 'cut.arrival85': s['cut.arrival85'], 'cut.fillet': s['cut.fillet'],
                       'cutLengthM': {kk: (None if v is None else round(v * M_PER_MU, 3)) for kk, v in s['cutLength']['mu'].items()},
                       'blocks': s['blockArea']['n'], 'blockAreaRel': s['blockArea']['areaRel'],
                       'blockAreaM2': s['blockArea']['m2_declared'], 'boundedBentCuts': bent}
        n_bent = rr['all']['boundedBentCuts']
        out[name] = {'role': 'descriptive', 'subsets': rr, 'boundedBentCuts': n_bent,
                     'knownDefectsEntry': (n_bent < 10) if name.startswith('flag:') and name != 'flag:plain' else None}
    return out


def run_plan(fixture_first=True):
    t0 = __import__('time').time()
    idx, ents = plan_entries()
    hoods_src = json.load(open(HOODS_FILE))
    hood_by_cap = {h['capture']: h for h in hoods_src['hoods']}
    metrics = json.load(open(METRICS_FILE))
    floors = {x['id']: x['absFloor']['value'] for x in metrics['metrics']
              if x['id'].startswith('cut.') and 'value' in x.get('absFloor', {})}
    reg_len = next((x for x in metrics['metrics'] if x['id'] == 'cut.length'), None)
    checks = []
    fixture = None
    if fixture_first:
        fmaps, _, _, fpooled, _, _ = run([os.path.join(NGDIR, c) for c in bg.CAPS])
        ok, lines = check(fpooled)
        agree = sum(m['templateRule']['equalsFixtureList'] for m in fmaps)
        coll = sum(m['graphFix']['duplicateEdgesCollapsed'] for m in fmaps)
        fixture = {'checkerLines': lines, 'passed': ok, 'templateRuleEqualsFixtureList': [agree, len(fmaps)],
                   'duplicateEdgesCollapsed': coll}
        checks.append(('the fixture run still prints 11 / 11 (the 2026-09-25 numbers as the generalised rule\'s red test: the '
                       'rule\'s template sets equal W-10\'s TEMPLATE_W sets on every fixture map; no edge collapsed)',
                       ok and agree == len(fmaps) and coll == 0,
                       {'pass': sum(x.startswith('PASS') for x in lines), 'of': len(EXPECT), 'ruleEqualsList': [agree, len(fmaps)],
                        'collapsed': coll}))
    out_reg = (reg_len or {}).get('output', {})
    checks.append(('cut.length\'s bins are the registry\'s (metrics.m-1.json: 5 m edges 0-400 m, no underflow, overflow)',
                   reg_len is not None and out_reg.get('edges') == [int(x) for x in LEN_EDGES_M] and out_reg.get('underflow') is False
                   and out_reg.get('overflow') is True and out_reg.get('unit') == 'm',
                   {'registered': reg_len is not None, 'version': (reg_len or {}).get('version'), 'perSeed': (reg_len or {}).get('perSeed'),
                    'absFloor': (reg_len or {}).get('absFloor')}))
    maps = []
    for e in ents:
        cap = os.path.join(ROOT, e['capture'])
        fp = os.path.join(cap, 'draw', 'gen-0.paths.json')
        assert template_of(cap) == e['template'] and seed_of(cap, 0) == e['seed'], f"{e['label']}: meta.json disagrees"
        m = analyse_map(fp, e['template'], e['seed'])
        m['entry'] = e
        m['frame'] = frame_check(m, e)
        m['hood'] = hood_by_cap[os.path.basename(e['capture'])]
        assert m['hood']['seedLabel'] == e['label'] and m['hood']['template'] == e['template'], f"{e['label']}: hood mismatch"
        assert sorted(m['leaf_order']) == list(range(m['faces'])), 'the union order does not hold every face once'
        for c in m['cuts']:
            c['mapkey'], c['template'], c['seed'] = m['map'], m['template'], m['seed']
            c['degenerate'] = (not c['open']) and c['slit_bounded'] and c['n_holes'] == 0
        maps.append(m)
        print(f"{e['label']}: {sum(rebuilt(c) for c in m['cuts'])} rebuilt parents of {len(m['cuts'])} cuts; template roads "
              f"{m['templateRule']['prefixRanks']}; collapsed {m['graphFix']['duplicateEdgesCollapsed']}; frame "
              f"{'PASS' if m['frame']['pass'] else 'FAIL'} ({__import__('time').time() - t0:.0f} s)", flush=True)
    # ---- checks on the maps
    e11 = json.load(open(E11_PLAN))
    e11_built = {lab: v for t in TEMPLATES for lab, v in zip(e11['medium'][t]['sample']['labels'],
                                                         e11['medium'][t]['scalars']['block.countTemplate']['perSeed'])}
    built_diff = {m['entry']['label']: [len(m['built_faces']), e11_built.get(m['entry']['label'])] for m in maps
                  if len(m['built_faces']) != e11_built.get(m['entry']['label'])}
    checks.append(('built blocks (W-11b\'s rule: >= 1 footprint area centroid) re-derived on the faces equal E11 section 10\'s '
                   'per-seed counts on every map', not built_diff,
                   {'built': sum(len(m['built_faces']) for m in maps), 'differ': built_diff}))
    tr = [m['templateRule'] for m in maps]
    checks.append(('template roads by draw order and width class (R-09): street 1 and square 3 roads on every map, area and '
                   'ring none; no other street at the template width; the script\'s template set equals the rule\'s',
                   all(t['agrees'] and t['otherStreetsAtWidth'] == 0 for t in tr),
                   {'perTemplate': {t: [x['prefixRanks'] for x in tr if x['template'] == t] for t in TEMPLATES},
                    'equalsFixtureList': sum(x['equalsFixtureList'] for x in tr)}))
    checks.append(('the face graph equals W-11b\'s adapter on every map (faces, open faces, blocks), after the duplicate-edge '
                   'collapse; the registered frame: every ring vertex on a MeasureInput way, bounded face areas = its blocks',
                   all(m['frame']['pass'] for m in maps),
                   {'collapsed': {m['entry']['label']: m['graphFix']['duplicateEdgesCollapsed'] for m in maps
                                  if m['graphFix']['duplicateEdgesCollapsed']},
                    'worstBlockAreaRel': max(m['frame']['blockAreasWorstRel'] or 0 for m in maps),
                    'ringVerticesNotOnAWay': sum(m['frame']['ringVerticesNotOnAWay'] for m in maps)}))
    viol, nparents = [], 0
    for m in maps:
        k2 = (CM_PER_MU / m['scale']) ** 2
        for c in m['cuts']:
            if c['open']:
                continue
            nparents += 1
            leaf = sum(abs(m['fa'][f]) for f in c['members'])
            d_rel = abs(leaf - c['area_px2']) / c['area_px2']
            d_cm2 = abs(leaf - c['area_px2']) * k2
            if d_rel > 1e-6 or d_cm2 > 1.0:
                viol.append({'map': m['entry']['label'], 'cut': c['si'], 'rel': d_rel, 'cm2': d_cm2})
    checks.append(('each parent\'s area equals its leaves\' sum on every map (holes subtracted; 1e-6 relative and 1 cm2 '
                   'declared)', not viol, {'parents': nparents, 'maps': len(maps), 'violations': viol[:5]}))
    # ---- the candidate faces
    faces, excl, receipts = [], [], []
    for m in maps:
        recs, ex, rc = map_faces(m, m['hood'], len(faces))
        faces += recs
        for x in ex:
            x['label'] = m['entry']['label']
        excl += ex
        for x in rc:
            x['label'] = m['entry']['label']
        receipts += rc
    cand = dict(CANDIDATE_HEAD)
    cand['hoods'] = hoods_src['hoods']
    cand['faces'] = faces
    cchecks = check_candidate(cand, hoods_src, receipts)
    checks += cchecks
    # ---- rows
    rows = plan_rows(maps)
    classes = class_rows(maps)
    # census
    bounded = [c for m in maps for c in m['cuts'] if rebuilt(c)]
    allc = [c for m in maps for c in m['cuts']]
    streets = [s for m in maps for s in m['streets']]
    t_off = sum(1 for c in bounded if c.get('t') is not None and c['nb'] != 1)
    census = {'maps': len(maps), 'streets': len(streets), 'templateStreets': sum(s['template'] for s in streets),
              'cuts': len(allc), 'open': sum(c['open'] for c in allc), 'bounded': len(bounded),
              'boundedSimple': sum(bool(c['simple']) for c in bounded),
              'boundedSlit': sum(c['slit_bounded'] for c in bounded),
              'boundedOtherNonSimple': sum((not c['simple']) and not c['slit_bounded'] for c in bounded),
              'boundedDegenerate': [{'label': m['entry']['label'], 'cut': c['si'], 'rank': c['rank']} for m in maps
                                    for c in m['cuts'] if c.get('degenerate')],
              'spurEdgesDropped': {m['entry']['label']: m['graphFix']['spurEdgesDropped'] for m in maps
                                   if m['graphFix'].get('spurEdgesDropped')},
              'boundedWithTNotOneBend': t_off,
              'blocks': sum(len(m['blocks']) for m in maps),
              'flags': {kk: sum(c['flags'][kk] for c in bounded) for kk in CLASSES},
              'primary': {kk: sum(c['primary'] == kk for c in bounded) for kk in PRECEDENCE},
              'perTemplate': {t: {'maps': sum(m['template'] == t for m in maps),
                                  'cuts': sum(len(m['cuts']) for m in maps if m['template'] == t),
                                  'bounded': sum(1 for m in maps if m['template'] == t for c in m['cuts'] if rebuilt(c))}
                              for t in TEMPLATES},
              'candidateFaces': len(faces), 'excluded': excl,
              'candidateLeaves': _leaf_census(maps, receipts),
              'allStreets': {'oneBend': [sum(s['nb'] == 1 for s in streets), len(streets)],
                             'arrive85': [sum(a >= ARRIVE_MIN for s in streets for a in s['arrive']),
                                          sum(len(s['arrive']) for s in streets)]}}
    # ---- formula against recorded (section 13.5 via E10), departures beyond the floor
    p, rg, pl = rows['pooled'], rows['ring'], rows['plain']
    simple_bent = [c for c in bounded if c.get('simple') and c.get('t') is not None]
    one_cuts = [c for c in allc if c['arc'] is not None]

    def sg(s, key):
        x = s['cut.sigma']['pooledFit'][key]
        return None if x is None else x['sigma']
    formula = {'cut.sigma plain (simple parents)': sg(pl, 'simpleParents'), 'cut.sigma ring (simple parents)': sg(rg, 'simpleParents'),
               'cut.sigma all (simple parents)': sg(p, 'simpleParents'), 'cut.sigma ring (rebuilt parents)': sg(rg, 'rebuiltParents'),
               'cut.cornerMid (simple parents)': (sum(abs(c['t'] - .5) <= CORNER_GATE for c in simple_bent) / len(simple_bent)) if simple_bent else None,
               'cut.arrival85 (all streets)': census['allStreets']['arrive85'][0] / census['allStreets']['arrive85'][1],
               'cut.fillet (one-bend cuts)': sum(bool(c['arc']) for c in one_cuts) / len(one_cuts) if one_cuts else None,
               'one-bend share (all streets)': census['allStreets']['oneBend'][0] / census['allStreets']['oneBend'][1]}
    comp = []
    for kk, rec in RECORDED.items():
        mid = kk.split(' ')[0]
        fl = floors.get(mid, 0.02)
        got = formula[kk]
        comp.append({'quantity': kk, 'recorded': round(rec, 6), 'formula': None if got is None else round(got, 6),
                     'difference': None if got is None else round(got - rec, 6), 'floor': fl,
                     'beyondFloor': None if got is None else abs(got - rec) > fl})
    checks.append(('the formula sigma against section 13.5\'s 0.066 / 0.098 compared (and the other recorded numbers); every '
                   'departure beyond the floor listed for DC-26\'s successor', all(x['formula'] is not None for x in comp[:2]),
                   {'departures': [x['quantity'] for x in comp if x['beyondFloor']]}))
    return {'maps': maps, 'rows': rows, 'classes': classes, 'census': census, 'comparison': comp, 'checks': checks,
            'candidate': cand, 'receipts': receipts, 'fixture': fixture, 'floors': floors,
            'inputs': {'planSeedIndex': [os.path.relpath(PLAN_INDEX, ROOT), sha256(PLAN_INDEX)],
                       'hoods': [os.path.relpath(HOODS_FILE, ROOT), sha256(HOODS_FILE)],
                       'registry': [os.path.relpath(METRICS_FILE, ROOT), sha256(METRICS_FILE)],
                       'scripts': {os.path.relpath(x, ROOT): sha256(x) for x in
                                   (pf.__file__, bp.__file__, ba.__file__, bg.__file__, ps.__file__, mng.__file__)}}}


def plan_faces_doc(maps):
    """the research-side per-face records (model units, as wave 1's file), every rebuilt parent including excluded ones"""
    recs = faces_doc(maps, [c for m in maps for c in m['cuts'] if not c['open']], None)
    lab = {m['map']: m['entry']['label'] for m in maps}
    deg = {(m['map'], c['si']) for m in maps for c in m['cuts'] if c.get('degenerate')}
    for r in recs:
        r['label'] = lab[r['map']]
        r['degenerate'] = (r['map'], r['cut']) in deg
    return recs


def write_plan(R, out_json, out_faces, out_cand, md):
    maps = R['maps']
    doc = collections.OrderedDict()
    doc['schema'] = 'm1.E10.plan/1'
    doc['lane'] = PLAN_LANE
    doc['script'] = SCRIPT
    doc['referenceBuild'] = REFERENCE_BUILD
    doc['inputs'] = R['inputs']
    doc['status'] = 'measured values (R-47 (a)): W-15 forms the rows; nothing here is a row'
    doc['scaleRule'] = {'scale': 'declared', 'mPerModelUnit': M_PER_MU, 'rule': 'R-01',
                        'rowNote': 'declared 0.35 m per model unit (own)'}
    doc['rulingsApplied'] = {
        'R-01': 'cut.length in declared metres (and the candidate in cm / cm2) at 0.35 m per model unit',
        'R-03': 'every value from W-04\'s 20 medium plan seeds; the 2026-09-25 captures only as the fixture check',
        'R-09': 'template roads by draw order and width class (the tool\'s docstring); the pooled, ring, plain and per-template '
                'sets are the target values, the five face classes descriptive, a class with < 10 bounded bent cuts a '
                'known-defects entry',
        'R-14': 'plan section 7b faces[] with referenceBuild on every face (N-02), hood ids from W-11b\'s file',
        'R-15': 'cut.length = the fillet-free course between the snapped ends, 5 m bins to 400 m plus overflow, '
                'spreadKS.p90 per template subset',
        'R-47 (a)': 'measured values; each block carries its sample'}
    doc['definitions'] = {
        'cutSets': {'bounded': 'cuts whose parent face is rebuilt (bounded; the faces the candidate carries)',
                    'allCuts': 'every non-template street (open parents included): the face-free measures'},
        'cut.sigma': 'f = the drawn start e0 snapped to the crossed centreline as a fraction of the parent\'s E1 OBB major axis '
                     '(the outer cycle on a holed parent); N(0.5, sigma) + eps U(0, 1) by maximum likelihood on '
                     'bentcut_anchor\'s grids; not fitted below 10 cuts. rebuiltParents = every bounded cut; simpleParents = '
                     'the simple-parent set section 13.5\'s 0.066 / 0.098 were measured on',
        'cut.cornerMid': '|t - 0.5| <= 0.10 with t = |e0 Pv| / (|e0 Pv| + |Pv eN|) on bounded cuts with a three-point course',
        'cut.arrival85': 'junction ends arriving at >= 85 degrees to the crossed road (bentcut_geometry)',
        'cut.fillet': 'one-bend cuts whose bend is a multi-vertex arc',
        'cut.length': 'the fillet-free course length between the snapped ends, declared metres; bounded cuts',
        'quantiles': 'type 7 (V12 section 3.5.1); estimators minmax at 2-9 seeds, type7 at >= 10 (W-15 re-forms them)',
        'spreadKS': 'V12 section 3.5.3: p90 of the seed-pair KS distances; binned on the 5 m edges (primary) and raw ECDF',
        'candidate': {'frame': 'the registered road frame of adapters/ng.py --plan (W-11b): cm = road-canvas px / ctmScale x '
                               '35, rounded half to even, consecutive repeats dropped; rings closed (first vertex repeated); '
                               'outer rings positive shoelace area, holes negative (the hoods\' orientation)',
                      'ringCm': 'E1: the parent face as drawn (fillet arcs as chords; a junction node whose two boundary edges '
                                'lie on one road dropped), outer cycle; holesCm its inner cycles',
                      'blockAreasCm2': 'the bounded leaf faces inside the face (every block its cuts created), integer cm2 by '
                                       'cumulative rounding along the union\'s final order, sorted ascending; their sum is '
                                       'the face\'s exact area within 1 cm2',
                      'cuts': 'the face\'s own cut first, then every cut inside it in drawing (creation) order',
                      'lengthCm': 'cut.length in cm', 'cornerT': 't in thousandths for a one-bend cut, -1 otherwise',
                      'arrivalCdeg': 'the smaller of the cut\'s two junction-end arrival angles, centidegrees',
                      'fillet': '1 when the one bend is drawn as an arc', 'bends': 'the drawn bend count',
                      'excluded': 'a rebuilt parent whose ring is not simple at integer cm (the slit a band\'s first cut '
                                  'leaves) is kept research-side only; its cuts are in its parent annulus\'s record'}}
    doc['fixture'] = R['fixture']
    doc['checks'] = [{'check': n, 'passed': bool(ok), 'detail': d} for n, ok, d in R['checks']]
    doc['census'] = R['census']
    doc['templateRoads'] = [{'label': m['entry']['label'], **m['templateRule']} for m in maps]
    doc['rows'] = R['rows']
    doc['classes'] = R['classes']
    doc['comparisonWithRecorded'] = R['comparison']
    doc['maps'] = [{'label': m['entry']['label'], 'family': m['entry']['family'], 'i': m['entry']['i'], 'seed': m['seed'],
                    'template': m['template'], 'capture': os.path.basename(m['entry']['capture']), 'hood': m['hood']['id'],
                    'ctmScale': r6(m['scale']), 'cmPerPx': r6(CM_PER_MU / m['scale']),
                    'medianFootprintAreaMu2': r6(m['med_fp_area_mu2']), 'medianFootprintShortMu': r6(m['med_fp_short_mu']),
                    'faces': m['faces'], 'openFaces': m['open_faces'], 'blocks': len(m['blocks']),
                    'cuts': len(m['cuts']), 'bounded': sum(rebuilt(c) for c in m['cuts']),
                    'degenerate': sum(bool(c.get('degenerate')) for c in m['cuts']),
                    'spurEdgesDropped': m['graphFix'].get('spurEdgesDropped', 0),
                    'duplicateEdgesCollapsed': m['graphFix']['duplicateEdgesCollapsed'],
                    'fallbackSnaps': m['pf_info']['fallback_snaps'], 'frame': m['frame']} for m in maps]
    doc['areaReceipts'] = [{kk: (r6(v) if isinstance(v, float) else v) for kk, v in r.items()} for r in R['receipts']]
    with open(out_json, 'w') as fh:
        json.dump(doc, fh, indent=1)
        fh.write('\n')
    with open(out_faces, 'w') as fh:
        json.dump({'schema': 'm1.ng-faces-by-class.plan/1', 'lane': PLAN_LANE, 'script': SCRIPT, 'referenceBuild': REFERENCE_BUILD,
                   'units': 'mu (canvas px / the map CTM scale); declared metres = mu x 0.35 (R-01)',
                   'note': 'research-side per-face records of every rebuilt parent on the 20 medium plan seeds; the crossing '
                           'form is research/baselines/candidates/ng-faces.json',
                   'faces': plan_faces_doc(maps)}, fh, separators=(',', ':'))
        fh.write('\n')
    with open(out_cand, 'w') as fh:
        fh.write('{' + ',\n'.join(json.dumps(kk) + ':' + json.dumps(v, separators=(',', ':'))
                                  for kk, v in R['candidate'].items() if kk not in ('hoods', 'faces')))
        for kk in ('hoods', 'faces'):
            fh.write(',\n' + json.dumps(kk) + ':[\n' + ',\n'.join(json.dumps(x, separators=(',', ':')) for x in R['candidate'][kk]) + '\n]')
        fh.write('}\n')
    if md:
        with open(md, 'w') as fh:
            fh.write(plan_md(R) + '\n')


def plan_md(R):
    W = []
    W.append('| subset | seeds | bounded / all cuts | cut.sigma rebuilt (eps) | cut.sigma simple (eps) | cut.cornerMid | '
             'cut.arrival85 all · bounded | cut.fillet all · bounded | cut.length m p10 · p50 · p90 | spreadKS.p90 binned · raw |')
    W.append('|---|---|---|---|---|---|---|---|---|---|')
    for name, r in R['rows'].items():
        sg = r['cut.sigma']['pooledFit']
        cl = r['cut.length']['pooled']
        sk = r['cut.length']['spreadKS']
        a, f = r['cut.arrival85']['pooled'], r['cut.fillet']['pooled']
        W.append(f"| {name} | {r['sample']['usable']} | {r['counts']['bounded']} / {r['counts']['allCuts']} | "
                 f"{_sig(sg['rebuiltParents'])} | {_sig(sg['simpleParents'])} | {_ks(r['cut.cornerMid']['pooled'])} | "
                 f"{_ks(a['allCuts'])} · {_ks(a['bounded'])} | {_ks(f['allCuts'])} · {_ks(f['bounded'])} | "
                 f"{_q3(cl['m_declared'], 0)} | {_f(sk['binned']['p90'], 3)} · {_f(sk['rawEcdf']['p90'], 3)} |")
    W.append('')
    W.append('| class | subset | cuts | bends 0/1/2 | cut.sigma (eps) or f | cut.cornerMid | cut.arrival85 | cut.fillet | '
             'cut length m p10 · p50 · p90 | blocks | block areaRel p10 · p50 · p90 |')
    W.append('|---|---|---|---|---|---|---|---|---|---|---|')
    for name, c in R['classes'].items():
        for sub in ('all', 'ring', 'plain'):
            s = c['subsets'][sub]
            if not s['nCuts']:
                continue
            fv = _sig(s['cut.sigma']) if s['cut.sigma'] else ('f ' + ', '.join(f'{x:.3f}' for x in s['fValues']) if s['fValues'] else '-')
            W.append(f"| {name} | {sub} | {s['nCuts']} | {'/'.join(map(str, s['bends012']))} | {fv} | {_ks(s['cut.cornerMid'])} | "
                     f"{_ks(s['cut.arrival85'])} | {_ks(s['cut.fillet'])} | {_q3(s['cutLengthM'], 0)} | {s['blocks']} | "
                     f"{_q3(s['blockAreaRel'], 1)} |")
    W.append('')
    W.append('| quantity | recorded (fixtures) | formula seeds | difference | floor | beyond |')
    W.append('|---|---|---|---|---|---|')
    for x in R['comparison']:
        W.append(f"| {x['quantity']} | {x['recorded']:.3f} | {_f(x['formula'], 3)} | {_f(x['difference'], 3)} | {x['floor']} | "
                 f"{x['beyondFloor']} |")
    return '\n'.join(W)


def red_tests():
    """planted faults that must turn W-10b's checks red, and controls that must stay green"""
    results = []
    # (1) the generalised template rule's red test on the fixtures: a wrong rule must break the 11 checks
    caps = [os.path.join(NGDIR, c) for c in bg.CAPS]
    global TEMPLATE_ROADS
    keep = dict(TEMPLATE_ROADS)
    for label, planted in (('area treated as laying its first-drawn street', dict(keep, area=1)),
                           ('square treated as laying none', {kk: v for kk, v in keep.items() if kk != 'square'}),
                           ('street treated as laying none', {kk: v for kk, v in keep.items() if kk != 'street'})):
        TEMPLATE_ROADS = planted
        try:
            fm, _, _, fp_, _, _ = run(caps)
        finally:
            TEMPLATE_ROADS = keep
        ok, lines = check(fp_)
        agree = sum(m['templateRule']['equalsFixtureList'] for m in fm)
        results.append((f'fixture: {label}', not (ok and agree == len(fm)),
                        {'checksFailing': sum(x.startswith('FAIL') for x in lines), 'ruleEqualsList': [agree, len(fm)]}))
    fm, _, _, fp_, _, _ = run(caps)
    ok, lines = check(fp_)
    agree = sum(m['templateRule']['equalsFixtureList'] for m in fm)
    results.append(('fixture control: the rule as built', ok and agree == len(fm),
                    {'checksPassing': sum(x.startswith('PASS') for x in lines), 'ruleEqualsList': [agree, len(fm)]}))
    # (2) the candidate checker: planted faults on a copy of the written candidate
    cand = json.load(open(OUT_CANDIDATE))
    hoods_src = json.load(open(HOODS_FILE))
    plan = json.load(open(OUT_PLAN_JSON))
    receipts = [dict(r) for r in plan['areaReceipts']]

    def red(label, mutate, rc=None, expect_fail=True):
        doc = json.loads(json.dumps(cand))
        mutate(doc)
        res = check_candidate(doc, hoods_src, rc if rc is not None else receipts)
        failed = [n for n, ok_, _ in res if not ok_]
        results.append((label, bool(failed) == expect_fail, failed[:1]))
    red('a face without referenceBuild', lambda d: d['faces'][0].pop('referenceBuild'))
    red('a non-integer ring coordinate', lambda d: d['faces'][1]['ringCm'][1].__setitem__(0, d['faces'][1]['ringCm'][1][0] + 0.5))
    red('a self-crossing ring (two vertices swapped)', lambda d: d['faces'][2]['ringCm'].__setitem__(
        slice(1, 3), [d['faces'][2]['ringCm'][2], d['faces'][2]['ringCm'][1]]))
    red('a seedLabel outside C2', lambda d: d['hoods'][0].__setitem__('seedLabel', 'capture/NG/area/medium/0 copy'))
    red('a free string in a face', lambda d: d['faces'][3].__setitem__('template', 'plaza'))
    red('a six-hex run in a string', lambda d: d['hoods'][1].__setitem__('capture', 'abcdef'))
    red('a hex-delimited six-digit run inside a C2-valid seedLabel', lambda d: d['hoods'][3].__setitem__(
        'seedLabel', 'capture/NG/area/medium/c0ffee'))
    red('a block area dropped', lambda d: d['faces'][4]['blockAreasCm2'].pop())
    red('a block area changed by 2 cm2', lambda d: d['faces'][7]['blockAreasCm2'].__setitem__(0, d['faces'][7]['blockAreasCm2'][0] + 2))
    red('a missing cut field', lambda d: d['faces'][5]['cuts'][0].pop('arrivalCdeg'))
    red('a float in a block area', lambda d: d['faces'][6]['blockAreasCm2'].__setitem__(0, 1.5))
    red('a hood without referenceBuild', lambda d: d['hoods'][2].pop('referenceBuild'))
    red('no referenceBuild at the top', lambda d: d.pop('referenceBuild'))
    bad_rc = [dict(r) for r in receipts]
    i0 = next(i for i, r in enumerate(bad_rc) if r.get('id') is not None)
    bad_rc[i0]['exactAreaCm2'] += 2
    red('a face whose exact area is 2 cm2 off its leaves', lambda d: None, rc=bad_rc)
    red('control: the candidate as written', lambda d: None, expect_fail=False)
    return results


def main_plan(args):
    opt = {'--out-json': OUT_PLAN_JSON, '--out-faces': OUT_PLAN_FACES, '--out-candidate': OUT_CANDIDATE, '--md': None}
    for key in list(opt):
        if key in args:
            opt[key] = args[args.index(key) + 1]
    R = run_plan()
    write_plan(R, opt['--out-json'], opt['--out-faces'], opt['--out-candidate'], opt['--md'])
    print('\n## W-10b checks')
    for n, ok, d in R['checks']:
        print(f"{'PASS' if ok else 'FAIL'} {n}")
        print(f"     {json.dumps(d)[:600]}")
    print('\n' + plan_md(R))
    ok = all(ok for _, ok, _ in R['checks'])
    print(f"\nW-10b {'CHECKER PASS' if ok else 'CHECKER FAIL'}: {sum(o for _, o, _ in R['checks'])} / {len(R['checks'])}")
    if not ok:
        sys.exit(1)


def main():
    args = sys.argv[1:]
    if '--plan' in args:
        main_plan(args)
        return
    if '--red' in args:
        res = red_tests()
        for label, good, d in res:
            print(f"{'OK  ' if good else 'BAD '} {label}: {d}")
        n_bad = sum(not g for _, g, _ in res)
        print(f"red tests: {len(res) - n_bad} / {len(res)} as expected")
        if n_bad:
            sys.exit(1)
        return
    opt = {}
    for key in ('--json', '--faces', '--md'):
        if key in args:
            i = args.index(key)
            opt[key] = args[i + 1]
            del args[i:i + 2]
    do_check = '--check' in args
    args = [a for a in args if a != '--check']
    caps = args or [os.path.join(NGDIR, c) for c in bg.CAPS]
    maps, mapinfo, bounded, pooled, census, rows = run(caps)
    ok, lines = check(pooled)
    print('# NG bent cut per parent-face class (W-10)\n')
    print('## Checker (pooled numbers)')
    print('\n'.join(lines))
    # W-10b: the generalised template rule against W-10's TEMPLATE_W on these maps (printed only; the JSON is unchanged)
    agree = sum(m['templateRule']['equalsFixtureList'] for m in maps)
    coll = sum(m['graphFix']['duplicateEdgesCollapsed'] for m in maps)
    rule_ok = agree == len(maps)
    print(f"{'PASS' if rule_ok else 'DIFF'} template roads by draw order and width class = W-10's TEMPLATE_W sets on "
          f"{agree} / {len(maps)} maps; duplicate edges collapsed {coll}")
    print('\n## Census')
    print(json.dumps(census))
    tables = md_tables(pooled, census, rows)
    print('\n## Per class (flags overlap; primary = exclusive by precedence ' + ' > '.join(PRECEDENCE) + ')\n')
    print(tables)
    if '--json' in opt:
        doc = {'schema': 'm1.E10/1', 'lane': 'm1/W-10', 'script': SCRIPT, 'referenceBuild': REFERENCE_BUILD,
               'captures': [os.path.relpath(c, ROOT) for c in caps],
               'maps': [{'map': m['map'], 'template': m['template'], 'seed': m['seed'], 'ctmScale': r6(m['scale']),
                         'medianFootprintAreaMu2': r6(m['med_fp_area_mu2']), 'medianFootprintShortMu': r6(m['med_fp_short_mu']),
                         'footprints': m['n_footprints'], 'faces': m['faces'], 'openFaces': m['open_faces']} for m in maps],
               'definitions': {'C_CONCAVE_deg': C_CONCAVE, 'CORNER_deg': CORNER_DEG, 'RUN_TOL_deg': RUN_TOL, 'CURVE_MAX_deg': CURVE_MAX,
                               'BEND_MIN_deg': ps.BEND_MIN, 'CORNER_GATE': CORNER_GATE, 'ARRIVE_MIN_deg': ARRIVE_MIN,
                               'M_PER_MU_declared': M_PER_MU, 'precedence': list(PRECEDENCE)},
               'pooled': {k: list(v) for k, v in pooled.items()}, 'expected': {k: list(v) for k, v in EXPECT.items()},
               'checkerPassed': ok, 'checkerLines': lines, 'census': census,
               'frames': {
                   'cut.sigma': 'f = the drawn start e0, snapped to the crossed centreline, as a fraction of the parent face E1 OBB '
                                'major axis (outer cycle on a holed parent); sigma of N(0.5, sigma) + eps * U(0, 1) by maximum '
                                'likelihood on bentcut_anchor grids; not fitted below n = %d' % SIGMA_MIN_N,
                   'cut.cornerMid': 'one-bend cuts with |t - 0.5| <= 0.10, t = |e0 Pv| / (|e0 Pv| + |Pv eN|) between the snapped ends',
                   'cut.arrival85': 'junction ends of the cut arriving at >= 85 degrees to the crossed road (bentcut_geometry)',
                   'cut.fillet': 'one-bend cuts whose bend is drawn as a multi-vertex arc',
                   'cutLength': 'UNREGISTERED measure (no V12 catalogue id; plan-check PC-02): fillet-free course length between '
                                'the snapped ends, mu; rel_fp_short = / the map median footprint OBB short side',
                   'blockArea': 'bounded leaf faces created by the set\'s cuts (the immediate children that stopped), mu2; '
                                'areaRel = / the map median footprint area (block.areaRel); m2_declared at 0.35 m per mu (inference)'},
               'rows': rows}
        with open(opt['--json'], 'w') as fh:
            json.dump(doc, fh, indent=1, sort_keys=False)
            fh.write('\n')
    if '--faces' in opt:
        with open(opt['--faces'], 'w') as fh:
            json.dump({'schema': 'm1.ng-faces-by-class/1', 'lane': 'm1/W-10', 'script': SCRIPT, 'referenceBuild': REFERENCE_BUILD,
                       'units': 'mu (canvas px / the map CTM scale); declared metres = mu x 0.35 (inference, ARCHITECTURE 4.6 step 5)',
                       'note': 'research-side per-face records; not the crossing file ng-faces.json (its crossing awaits a ruling, plan-check PC-01)',
                       'faces': faces_doc(maps, bounded, mapinfo)}, fh, separators=(',', ':'))
            fh.write('\n')
    if '--md' in opt:
        with open(opt['--md'], 'w') as fh:
            fh.write('\n'.join(lines) + '\n\n' + tables + '\n')
    if do_check and not (ok and (rule_ok or args)):
        sys.exit(1)


if __name__ == '__main__':
    main()
