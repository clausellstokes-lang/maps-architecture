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
Limit (documented, not a bug to re-find): bentcut_parent_face.TEMPLATE_W names the template-street widths of seeds
7171 / 7172 only; before W-04's seeds run, the template-road detection must be generalised there or here.
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
def analyse_with_state(fp, template):
    """run bentcut_parent_face.analyse unmodified; return (info, cuts, its locals at return, captured geoms)"""
    state = {}
    code = pf.analyse.__code__
    first = len(bp._cap['geoms'])

    def hook(frame, event, arg):
        if event == 'return' and frame.f_code is code:
            state.update(frame.f_locals)
    old = sys.getprofile()
    sys.setprofile(hook)
    try:
        info, cuts = pf.analyse(fp, template)
    finally:
        sys.setprofile(old)
    return info, cuts, state, bp._cap['geoms'][first:]


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
def analyse_map(fp, template, seed):
    info, cuts, L, geoms = analyse_with_state(fp, template)
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
    return {'map': info['map'], 'template': template, 'seed': seed, 'scale': sc, 'med_fp_area_mu2': med_fp_area,
            'med_fp_short_mu': med_fp_short, 'n_footprints': len(fp_area), 'faces': F, 'open_faces': sum(openf),
            'cuts': rows, 'blocks': blocks, 'streets': streets, 'pf_cuts': cuts, 'fa': list(fa)}


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


def main():
    args = sys.argv[1:]
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
    if do_check and not ok:
        sys.exit(1)


if __name__ == '__main__':
    main()
