#!/usr/bin/env python3
"""research/baselines/fit_depth_rows.py -- the fit half of M-1 work item W-12 (lane m1/W-12-fit).

Plan: docs/calibration/M-1-plan.md section 2, row W-12 (revision 3); rulings R-19 and R-20 (M-1-rulings-1.md); record
docs/calibration/E12-depth-refit.md (a DRAFT fit section: every candidate value, its inputs and the alternatives a Fable
ruling must choose between -- this tool decides nothing). Research side only: our own code, standard library only
(Python 3.9). It never writes into plat/, never reads a captured program bundle and touches no website.

What it fits, each by the estimator its source states:
  1. the block-depth range [e_lo, e_hi] of ARCHITECTURE section 4.6 step 1 (the per-face stop law
     tau = e_lo * (e_hi / e_lo)^g, g = |(u1 + u2 + u3 + u4) / 2 - 1|) to the block minor extents of
       NG   W-11b's bounded built faces (docs/calibration/E11-ng-rows.plan.json, maps[].blockMinorExtent: the minimum-area
            rectangle's short side, declared metres at 0.35 m per model unit (R-01) and relative to the map's median
            footprint short side), per template and pooled, at medium (the candidates) and small / large (D3, size);
       MFCG W-09's intramural cluster blocks (docs/calibration/E09-mfcg-derived-graph.seeds.json, perSeed[stem]
            ['block.courtShare'].rows[].mrrShortM, metres), per size over the usable plain seeds and pooled;
     so that the fitted pair reproduces the input's p10 and p90 (the row's checker). Two readings of "reproduce" are
     fitted side by side, because the plan does not say which quantity of the law meets the reference's blocks:
       EA  the threshold reading -- tau's own p10 / p90 equal the blocks' (closed form from g's exact quantiles);
       EB  the recursion reading (J-A34.01's stated reason: under the per-face draw "the same numbers would give smaller
           blocks") -- the minor extents of the blocks that section 4.6's recursion leaves, simulated on rectangles with
           step 1's stop law and step 2's position law (f = (c + b) / 2, c = 1/2 on a rectangle, b the mean of three
           uniforms), have the blocks' p10 / p90; three start-face variants (V1 squares, V2 aspect log-uniform 1-4, V3
           smaller squares) show how much the idealisation moves the fit.
     The candidate design cells follow from e_lo = max(2 d_lo, r_lo), e_hi = max(2 d_hi, r_hi) (section 4.6 step 1).
  2. cut.flattenM against NG's bent-cut signature: the heights of NG's kept bends (triangle A - K - foot, K the
     fillet-free virtual corner, A and foot the cut's snapped ends) on W-04's 20 medium plan seeds, read through the
     unmodified bent-cut scripts via ng_faces_by_class.py (W-10b's construction and template rule).
  3. R-19's deep-interior shares: NG's pooled block.courtShare (type-7 median over the 20 medium hoods) sets the modest
     band's court cell; the other bands' court cells move by measured / 0.45, capped at 1; back_lane, through_alley and
     rear_plots are renormalised in their design proportions; MFCG's inner-plot removal (E09) sets the MFCG preset's
     court cell.

Usage:
  python3 research/baselines/fit_depth_rows.py [--json OUT] [--md OUT]   fit, check, write (default OUT: the E12 JSON);
                                                                          exit 1 when a check fails
  python3 research/baselines/fit_depth_rows.py --red                      planted faults that must turn checks red
"""
import sys

sys.dont_write_bytecode = True

import bisect  # noqa: E402
import collections  # noqa: E402
import hashlib  # noqa: E402
import json  # noqa: E402
import math  # noqa: E402
import os  # noqa: E402
import random  # noqa: E402
import re  # noqa: E402
import time  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CAL = os.path.join(ROOT, 'docs', 'calibration')
E11_PLAN = os.path.join(CAL, 'E11-ng-rows.plan.json')
E09_JSON = os.path.join(CAL, 'E09-mfcg-derived-graph.json')
E09_SEEDS = os.path.join(CAL, 'E09-mfcg-derived-graph.seeds.json')
E10_PLAN = os.path.join(CAL, 'E10-ng-bentcut-faces.plan.json')
DESIGN = os.path.join(ROOT, 'docs', 'ARCHITECTURE.md')
LANE_LOG = os.path.join(ROOT, 'docs', 'lane-events.log')
RESULTS = os.path.join(CAL, 'results')
CLEAN_ROOM = os.path.join(ROOT, 'plat', 'CLEAN-ROOM.md')      # a plat doc, read only (J1's evidence)
OUT_JSON = os.path.join(CAL, 'E12-depth-refit.json')
SCRIPT = 'research:baselines/fit_depth_rows.py'
LANE = 'm1/W-12-fit'
M_PER_MU = 0.35                     # R-01's declared scale (NG model unit)

# ---------------------------------------------------------------- the design cells this fit addresses (ARCHITECTURE.md)
# Each value is pinned to the design's own text by check D0 (whitespace-normalised substring, found at least once).
DESIGN_STRINGS = [
    ('depthRows.poor', '| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 |'),
    ('depthRows.modest', '| modest | 6–9 | 18–30 |'),
    ('depthRows.prosperous', '| prosperous | 9–14 | 25–40 |'),
    ('depthRows.rich', '| rich | 14–25 (joined) | 30–60 |'),
    ('floor.denseCore', '| dense core (walled) | stage 1 | 30–45 m (applied by S8) |'),
    ('floor.walledRings', '| walled rings | walled stages ≥ 2 | 45–70 m (S8) |'),
    ('floor.ribbon', 'plots directly on the arterial, depth band 30–50 m'),
    ('floor.suburb', '| a final regime outside the last enceinte | 40–60 m |'),
    ('rung.TOWN', '| 2 stages; walled core 0.90 of buildings, ribbon 0.10 | 1.10 / 1.10 / 0 |'),
    ('rung.CITY', '| 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | 1.00 / 1.00 / 0 |'),
    ('rung.METROPOLIS', '| 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | 0.90 / 0.95 / +1 |'),
    ('shares', 'Default shares — poor: court 0.35, back lane 0.25, through-alley 0.30, rear plots 0.10; modest: '
               '0.45 / 0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich: 0.75 / 0.10 / 0 / 0.15'),
    ('stopLaw', '`τ = e_lo · (e_hi / e_lo)^g`'),
    ('stopG', '`g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1|`'),
    ('blockRange', '`e_lo = max(2 · d_lo, r_lo)` and `e_hi = max(2 · d_hi, r_hi)`'),
    ('position', '`f = (c + b) / 2`'),
    ('flattenRule', 'has a height below `max(cut.flattenM, 0.02 × |A–foot|)`'),
    ('flattenM.base', '`cut.flattenM` = 0.7 m'),
    ('flattenM.MFCG', '`cut.flattenM` = 8 m'),
    ('deepRule', "`deep` when the block's local thickness exceeds twice its band's plot depth"),
]
DEPTH_ROWS = collections.OrderedDict([('poor', (12.0, 20.0)), ('modest', (18.0, 30.0)), ('prosperous', (25.0, 40.0)),
                                      ('rich', (30.0, 60.0))])
FLOORS = collections.OrderedDict([('denseCore', (30.0, 45.0)), ('walledRings', (45.0, 70.0)), ('ribbon', (30.0, 50.0)),
                                  ('suburb', (40.0, 60.0))])
RUNG_DEPTH = collections.OrderedDict([('TOWN', 1.10), ('CITY', 1.00), ('METROPOLIS', 0.95)])
SHARE_KEYS = ('court', 'back_lane', 'through_alley', 'rear_plots')
SHARES = collections.OrderedDict([('poor', (0.35, 0.25, 0.30, 0.10)), ('modest', (0.45, 0.30, 0.15, 0.10)),
                                  ('prosperous', (0.65, 0.15, 0.05, 0.15)), ('rich', (0.75, 0.10, 0.0, 0.15))])
MODEST_COURT_DESIGN = 0.45
FLATTEN_BASE_M, FLATTEN_MFCG_M, FLATTEN_REL = 0.7, 8.0, 0.02
MFCG_SIZE_RUNG = collections.OrderedDict([('capture/MFCG/40/plain', 'TOWN'), ('capture/MFCG/80/plain', 'CITY'),
                                          ('capture/MFCG/130/plain', 'METROPOLIS')])

# publication steps (the "rounding" the row's checker reads): e and d in metres at 0.1 m, relative units at 0.01
STEP = {'m': 0.1, 'rel': 0.01}
# EB's simulation settings
R_MAX, R_GRID = 32.0, 161
EB_VARIANTS = collections.OrderedDict([
    ('V1', {'aspect': (1.0, 1.0), 'start': (8.0, 16.0), 'n': 400000,
            'what': 'squares, side log-uniform over [8, 16] x e_hi (primary)'}),
    ('V2', {'aspect': (1.0, 4.0), 'start': (8.0, 16.0), 'n': 200000,
            'what': 'rectangles, aspect log-uniform over [1, 4], minor side log-uniform over [8, 16] x e_hi'}),
    ('V3', {'aspect': (1.0, 1.0), 'start': (2.0, 4.0), 'n': 200000,
            'what': 'squares, side log-uniform over [2, 4] x e_hi (smaller start faces)'}),
])
VERIFY_N, VERIFY_BATCHES = 400000, 20
BOOT_B = 1000


def sha256(path):
    return hashlib.sha256(open(path, 'rb').read()).hexdigest()


def seed_of(label):
    return int(hashlib.sha256(label.encode()).hexdigest()[:16], 16)


def q7(xs, p, presorted=False):
    """V12 section 3.5.1's type-7 quantile"""
    s = xs if presorted else sorted(xs)
    h = (len(s) - 1) * p
    i = int(math.floor(h))
    if i + 1 >= len(s):
        return float(s[-1])
    return s[i] + (h - i) * (s[i + 1] - s[i])


def rnd(x, step):
    """round half to even at the publication step (e.g. 0.1 m), returned as a clean float"""
    d = max(0, -int(math.floor(math.log10(step) + 1e-9)))
    return float(round(round(x / step) * step, d))


# ---------------------------------------------------------------- the stop law's g, exactly
def irwin_hall_cdf(s, n=4):
    if s <= 0:
        return 0.0
    if s >= n:
        return 1.0
    return sum((-1) ** k * math.comb(n, k) * (s - k) ** n for k in range(int(math.floor(s)) + 1)) / math.factorial(n)


def g_cdf(x):
    """g = |S/2 - 1|, S the sum of four uniforms (symmetric about 2): P(g <= x) = 2 F_S(2 + 2x) - 1"""
    return 0.0 if x <= 0 else (1.0 if x >= 1 else 2.0 * irwin_hall_cdf(2.0 + 2.0 * x) - 1.0)


def g_quantile(p):
    lo, hi = 0.0, 1.0
    for _ in range(200):
        m = (lo + hi) / 2
        if g_cdf(m) < p:
            lo = m
        else:
            hi = m
    return (lo + hi) / 2


G10, G50, G90 = g_quantile(0.10), g_quantile(0.50), g_quantile(0.90)


def g_mean(n=200000):
    return sum(1.0 - g_cdf((i + 0.5) / n) for i in range(n)) / n


# ---------------------------------------------------------------- EA: the threshold reading (closed form)
def fit_ea(p10, p90):
    lr = (math.log(p90) - math.log(p10)) / (G90 - G10)
    r = math.exp(lr)
    e_lo = p10 / r ** G10
    return e_lo, e_lo * r


def q_ea(e_lo, e_hi, gp):
    return e_lo * (e_hi / e_lo) ** gp


# ---------------------------------------------------------------- EB: the recursion reading (simulated)
def simulate(r, seed, nblocks, aspect=(1.0, 1.0), start=(8.0, 16.0)):
    """minor extents (units of e_lo) of the blocks section 4.6's recursion leaves on rectangular start faces: step 1's
    per-face threshold tau = r^g, step 2's position f = (1/2 + b) / 2 along the major axis (c = 1/2 on a rectangle),
    a straight cut across it; every face redraws its own tau"""
    rng = random.Random(seed)
    R = rng.random
    lr = math.log(r)
    out = []
    ap = out.append
    slo, shi = math.log(start[0]), math.log(start[1])
    alo, ahi = math.log(aspect[0]), math.log(aspect[1])
    exp = math.exp
    while len(out) < nblocks:
        s = exp(slo + (shi - slo) * R()) * r
        a = exp(alo + (ahi - alo) * R()) if ahi > alo else 1.0
        stack = [(s, s * a)]
        pop, push = stack.pop, stack.append
        while stack:
            w, l = pop()
            g = abs((R() + R() + R() + R()) * 0.5 - 1.0)
            if w < exp(g * lr):
                ap(w)
                continue
            f = (0.5 + (R() + R() + R()) / 3.0) * 0.5
            c = f * l
            push((c, w) if c < w else (w, c))
            c = l - c
            push((c, w) if c < w else (w, c))
    return out


POLY_DEG = 6


def polyfit(xs, ys, deg):
    """least squares in the scaled variable t = 2 (x - x0) / (x1 - x0) - 1 (normal equations, Gaussian elimination
    with partial pivoting); returns (coefficients, x0, x1)"""
    x0, x1 = xs[0], xs[-1]
    ts = [2 * (x - x0) / (x1 - x0) - 1 for x in xs]
    n = deg + 1
    A = [[sum(t ** (i + j) for t in ts) for j in range(n)] + [sum(y * t ** i for t, y in zip(ts, ys))] for i in range(n)]
    for c in range(n):
        piv = max(range(c, n), key=lambda r_: abs(A[r_][c]))
        A[c], A[piv] = A[piv], A[c]
        for r_ in range(n):
            if r_ != c:
                f = A[r_][c] / A[c][c]
                A[r_] = [a - f * b for a, b in zip(A[r_], A[c])]
    return [A[i][n] / A[i][i] for i in range(n)], x0, x1


def polyval(P, x):
    co, x0, x1 = P
    t = 2 * (x - x0) / (x1 - x0) - 1
    v = 0.0
    for c in reversed(co):
        v = v * t + c
    return v


def eb_table(variant):
    """the recursion's output p10 and p90 (units of e_lo) on a grid of r = e_hi / e_lo in [1, R_MAX], each grid point
    its own seeded simulation; smoothed by a degree-POLY_DEG least-squares polynomial in ln r (the raw points and the
    residuals are kept for the record)"""
    cfg = EB_VARIANTS[variant]
    rs = [math.exp(math.log(R_MAX) * k / (R_GRID - 1)) for k in range(R_GRID)]
    raw = []
    for k, r in enumerate(rs):
        o = sorted(simulate(r, seed_of(f'W-12 EB table {variant} {k}'), cfg['n'], cfg['aspect'], cfg['start']))
        raw.append((q7(o, .1, True), q7(o, .5, True), q7(o, .9, True)))
    xs = [math.log(r) for r in rs]
    P10 = polyfit(xs, [a for a, _, _ in raw], POLY_DEG)
    P90 = polyfit(xs, [b for _, _, b in raw], POLY_DEG)
    res10 = [a - polyval(P10, x) for (a, _, _), x in zip(raw, xs)]
    res90 = [b - polyval(P90, x) for (_, _, b), x in zip(raw, xs)]
    fine = [math.log(R_MAX) * k / 4000 for k in range(4001)]
    ratio_f = [polyval(P90, x) / polyval(P10, x) for x in fine]
    q10_f = [polyval(P10, x) for x in fine]
    q90_f = [polyval(P90, x) for x in fine]
    mono = all(b > a for a, b in zip(q10_f, q10_f[1:])) and all(b > a for a, b in zip(q90_f, q90_f[1:]))
    # the spread p90 / p10 is flat near r = 1 (it cannot identify r there): the inversion runs on its running maximum from
    # its minimum on, so a target spread takes the smallest r that reaches it
    k0 = min(range(len(ratio_f)), key=lambda k: ratio_f[k])
    env, m = [], -1.0
    for v in ratio_f[k0:]:
        m = max(m, v)
        env.append(m)
    flat_to = next((k for k in range(len(env)) if env[k] >= ratio_f[0] + 0.01), len(env) - 1)
    ratio_raw = [b / a for a, _, b in raw]

    def rms(v):
        return math.sqrt(sum(x * x for x in v) / len(v))
    return {'variant': variant, 'r': rs, 'q10raw': [x[0] for x in raw], 'q50raw': [x[1] for x in raw],
            'q90raw': [x[2] for x in raw], 'P10': P10, 'P90': P90, 'monotone': mono,
            'envX': fine[k0:], 'env': env, 'rAtMinRatio': math.exp(fine[k0]),
            'rWhereSpreadFirstExceedsItsR1ValueBy001': math.exp(fine[k0 + flat_to]),
            'rawRatioViolations': sum(1 for i in range(1, len(ratio_raw)) if ratio_raw[i] < ratio_raw[i - 1]),
            'residualRms': [rms(res10), rms(res90)], 'residualMax': [max(map(abs, res10)), max(map(abs, res90))],
            'ratioAtR1': ratio_f[0], 'minRatio': env[0], 'maxRatio': env[-1]}


def eb_at(T, r):
    """the smoothed q10, q90 at r"""
    x = math.log(r)
    return polyval(T['P10'], x), polyval(T['P90'], x)


def fit_eb(T, p10, p90):
    rho = p90 / p10
    if rho < T['minRatio']:
        return None, f'infeasible: the input spread p90 / p10 = {rho:.3f} is below the law\'s narrowest output ' \
                     f'spread {T["minRatio"]:.3f} (its minimum, near r = {T["rAtMinRatio"]:.2f}; r = 1 is one fixed threshold)'
    if rho > T['maxRatio']:
        return None, f'beyond the grid: p90 / p10 = {rho:.3f} > {T["maxRatio"]:.3f} at r = {R_MAX}'
    env, xs = T['env'], T['envX']
    i = bisect.bisect_left(env, rho)
    i = max(1, min(i, len(env) - 1))
    t = (rho - env[i - 1]) / (env[i] - env[i - 1]) if env[i] > env[i - 1] else 1.0
    lo = hi = xs[i - 1] + t * (xs[i] - xs[i - 1])
    r = math.exp((lo + hi) / 2)
    q10, _ = eb_at(T, r)
    e_lo = p10 / q10
    return (e_lo, e_lo * r), None


def eb_quantiles(T, e_lo, e_hi):
    q10, q90 = eb_at(T, e_hi / e_lo)
    return e_lo * q10, e_lo * q90


def verify_eb(variant, e_lo, e_hi, label):
    cfg = EB_VARIANTS[variant]
    r = e_hi / e_lo
    o = simulate(r, seed_of(f'W-12 EB verify {variant} {label}'), VERIFY_N, cfg['aspect'], cfg['start'])
    o = [x * e_lo for x in o]
    s = sorted(o)
    q10, q90 = q7(s, .1, True), q7(s, .9, True)
    nb = len(o) // VERIFY_BATCHES
    b10, b90 = [], []
    for k in range(VERIFY_BATCHES):
        bs = sorted(o[k * nb:(k + 1) * nb])
        b10.append(q7(bs, .1, True))
        b90.append(q7(bs, .9, True))

    def se(xs):
        m = sum(xs) / len(xs)
        return math.sqrt(sum((x - m) ** 2 for x in xs) / (len(xs) - 1)) / math.sqrt(len(xs))
    return q10, q90, se(b10), se(b90), len(o)


# ---------------------------------------------------------------- inputs
def load_ng():
    d = json.load(open(E11_PLAN))
    fams = collections.OrderedDict()
    for m in d['maps']:
        lab = m['plan']['label']
        fam = m['plan']['family']
        fams.setdefault(fam, []).append({
            'label': lab, 'capture': m['capture'], 'm': list(m['blockMinorExtent']['values_m_declared']),
            'rel': list(m['blockMinorExtent']['values_rel']), 'medShortMu': m['medianFootprintShortMu'],
            'court': m['block.courtShare']})
    return d, fams


def load_mfcg():
    j = json.load(open(E09_JSON))
    s = json.load(open(E09_SEEDS))
    fams = collections.OrderedDict()
    for fam in j['sample']:
        if fam['options'] != 'plain':
            continue
        hoods = []
        for stem in fam['usable']:
            rec = s['perSeed'][stem]
            rows = rec['block.courtShare']['rows']
            hoods.append({'label': f"{fam['family']}/{stem.rsplit('-', 1)[1]}", 'stem': stem,
                          'm': [r['mrrShortM'] for r in rows],
                          'm2': [r['mrrShortM'] for r in rows if r['footprints'] >= 2],
                          'deep': sum(1 for r in rows if r['deep']), 'courtDeep': sum(1 for r in rows if r['deep'] and r['court']),
                          'value': rec['block.courtShare']['value'], 'blocksRecorded': rec['blockc.perHa']['blocks'],
                          'rows': len(rows), 'courtRecorded': (rec['block.courtShare']['deep'], rec['block.courtShare']['courtDeep'])})
        fams[fam['family']] = hoods
    return j, s, fams


def build_sets(ng, mfcg):
    """every fitted input set: id, reference, unit, role, hoods (each a list of block minor extents)"""
    sets = []
    for fam, hoods in ng.items():
        size = fam.rsplit('/', 1)[1]
        role = 'candidate' if fam == 'capture/NG/area/medium' else ('companion' if size == 'medium' else 'size (D3)')
        units = ('m', 'rel') if size == 'medium' else ('m',)
        for u in units:
            sets.append({'id': f'{fam} [{u}]', 'ref': 'NG', 'family': fam, 'unit': u, 'role': role,
                         'hoods': [h[u] for h in hoods], 'hoodLabels': [h['label'] for h in hoods]})
    for size in ('medium', 'small', 'large'):
        fs = [f for f in ng if f.endswith('/' + size)]
        units = ('m', 'rel') if size == 'medium' else ('m',)
        for u in units:
            sets.append({'id': f'NG/{size}/pooled [{u}]', 'ref': 'NG', 'family': f'NG/{size}/pooled', 'unit': u,
                         'role': 'candidate' if size == 'medium' else 'size (D3)',
                         'hoods': [h[u] for f in fs for h in ng[f]], 'hoodLabels': [h['label'] for f in fs for h in ng[f]]})
    for fam, hoods in mfcg.items():
        sets.append({'id': f'{fam} [m]', 'ref': 'MFCG', 'family': fam, 'unit': 'm', 'role': 'candidate',
                     'rung': MFCG_SIZE_RUNG[fam], 'hoods': [h['m'] for h in hoods], 'hoodLabels': [h['label'] for h in hoods]})
        sets.append({'id': f'{fam} (blocks of >= 2 footprints) [m]', 'ref': 'MFCG', 'family': fam, 'unit': 'm',
                     'role': 'companion', 'rung': MFCG_SIZE_RUNG[fam], 'hoods': [h['m2'] for h in hoods],
                     'hoodLabels': [h['label'] for h in hoods]})
    allh = [h for f in mfcg for h in mfcg[f]]
    sets.append({'id': 'MFCG/plain/pooled [m]', 'ref': 'MFCG', 'family': 'MFCG/plain/pooled', 'unit': 'm',
                 'role': 'candidate', 'hoods': [h['m'] for h in allh], 'hoodLabels': [h['label'] for h in allh]})
    return sets


def stats(vals):
    s = sorted(vals)
    return {'n': len(s), 'p10': q7(s, .1, True), 'p50': q7(s, .5, True), 'p90': q7(s, .9, True), 'min': s[0], 'max': s[-1]}


# ---------------------------------------------------------------- the deep-interior shares (R-19)
def lr_round(vals, step):
    """largest-remainder rounding to multiples of step summing exactly to round(sum / step) * step"""
    units = [v / step for v in vals]
    fl = [math.floor(u + 1e-9) for u in units]
    want = int(round(sum(units)))
    rem = sorted(range(len(vals)), key=lambda i: (-(units[i] - fl[i]), i))
    for i in rem[:want - sum(fl)]:
        fl[i] += 1
    return fl


def share_rows(court_modest):
    k = court_modest / MODEST_COURT_DESIGN
    out = collections.OrderedDict()
    for band, row in SHARES.items():
        c = min(1.0, row[0] * k) if band != 'modest' else court_modest
        rest = row[1:]
        rs = sum(rest)
        scale = (1.0 - c) / rs if rs > 0 else 0.0
        vals = [c] + [x * scale for x in rest]
        out[band] = vals
    return k, out


def mfcg_preset_rows(court):
    """the MFCG preset's row under two remainder alternatives (R-19 names the court cell only)"""
    m = SHARES['modest']
    rs = sum(m[1:])
    return collections.OrderedDict([
        ('Ra', [court] + [x * (1.0 - court) / rs for x in m[1:]]),     # modest's other three, design proportions
        ('Rb', [court, 0.0, 0.0, 1.0 - court]),                        # the remainder all rear plots (no lanes)
    ])


# ---------------------------------------------------------------- cut.flattenM against the bent-cut signature
def flatten_measure():
    sys.path.insert(0, HERE)
    import ng_faces_by_class as nfc   # imports the bent-cut scripts unmodified (bytecode off)
    idx, ents = nfc.plan_entries()
    out, census = [], collections.Counter()
    for e in ents:
        fp = os.path.join(nfc.ROOT, e['capture'], 'draw', 'gen-0.paths.json')
        tw, want, _ = nfc.template_rule(fp, e['template'])
        info, cuts, L, geoms, fix = nfc.analyse_with_state(fp, e['template'], tw)
        assert L['templ'] == want, f"{e['label']}: template set differs from W-10b's rule"
        nodes, end_node, M, sc, templ, nS = L['nodes'], L['end_node'], L['M'], L['sc'], L['templ'], L['nS']
        for si in range(nS):
            if si in templ:
                continue
            rec = M['streets'][si]
            census['cuts'] += 1
            census['bends%d' % rec['nb'] if rec['nb'] < 2 else 'bends2+'] += 1
            if rec['nb'] != 1 or 'pv' not in rec.get('bend', {}):
                continue
            p = L['S'][si]['p']
            ends = []
            for k in (0, 1):
                if (si, k) in end_node:
                    ends.append(nodes[end_node[(si, k)]])
                    census['endsSnapped'] += 1
                else:
                    ends.append(p[0] if k == 0 else p[-1])
                    census['endsDrawn'] += 1
            a, b = ends
            pv = rec['bend']['pv']
            chord = math.dist(a, b)
            h = abs((pv[0] - a[0]) * (b[1] - a[1]) - (pv[1] - a[1]) * (b[0] - a[0])) / chord
            out.append({'label': e['label'], 'street': si, 'hMu': h / sc, 'chordMu': chord / sc,
                        'bothSnapped': all((si, k) in end_node for k in (0, 1)), 'filleted': rec['bend']['nvb'] > 1,
                        'angleDeg': abs(rec['bend']['angle'])})
    return out, census


def flatten_summary(bends, census):
    hm = sorted(b['hMu'] * M_PER_MU for b in bends)
    hmu = sorted(b['hMu'] for b in bends)
    rel = sorted(b['hMu'] / b['chordMu'] for b in bends)
    snapped = sorted(b['hMu'] for b in bends if b['bothSnapped'])
    n_cuts, n_one = census['cuts'], len(bends)
    hist = [sum(1 for x in hmu if 0.25 * i <= x < 0.25 * (i + 1)) for i in range(24)]
    lowest = sorted(bends, key=lambda b: b['hMu'])[:6]

    def flattened(x_m, rel_f):
        return sum(1 for b in bends if b['hMu'] * M_PER_MU < max(x_m, rel_f * b['chordMu'] * M_PER_MU))
    grid = []
    for x in (0.5, math.floor(hm[0] * 100) / 100, FLATTEN_BASE_M, 0.8, 1.0, 1.5):
        for rf in (FLATTEN_REL, math.floor(rel[0] * 1000) / 1000, 0.0):
            f = flattened(x, rf)
            grid.append({'flattenM': x, 'relFactor': rf, 'keptBendsFlattened': f,
                         'oneBendShareAfter': (n_one - f) / n_cuts})
    return {
        'cuts': n_cuts, 'oneBend': n_one, 'oneBendShare': n_one / n_cuts, 'census': dict(census),
        'hMu': {'min': hmu[0], 'p01': q7(hmu, .01, True), 'p05': q7(hmu, .05, True), 'p10': q7(hmu, .10, True),
                'p50': q7(hmu, .5, True)},
        'hM': {'min': hm[0], 'p01': q7(hm, .01, True), 'p05': q7(hm, .05, True), 'p10': q7(hm, .10, True),
               'p50': q7(hm, .5, True)},
        'bothSnapped': {'n': len(snapped), 'minMu': snapped[0]},
        'belowTwoMu': sum(1 for x in hmu if x < 2.0),
        'histMu0to6by025': hist,
        'relHeight': {'min': rel[0], 'belowDesignFactor': sum(1 for x in rel if x < FLATTEN_REL)},
        'lowest': [{k: (round(v, 4) if isinstance(v, float) else v) for k, v in b.items()} for b in lowest],
        'grid': grid,
        'candidates': {
            'FM-1 keep 0.7 m (two model units at the declared scale)': FLATTEN_BASE_M,
            'FM-2 the largest value that flattens none of NG\'s kept bends (the lowest kept height, down to 0.01 m)':
                math.floor(hm[0] * 100) / 100,
            'FM-3 no M-1 value: calibrate at M0 on the S8 harness (V12 section 3.7.1 (c); J-A37.01)': None},
        'relTermCandidates': {
            'RT-1 keep 0.02 x |A-foot|': FLATTEN_REL,
            'RT-2 the largest factor that flattens none of NG\'s kept bends (down to 0.001)': math.floor(rel[0] * 1000) / 1000},
    }


# ---------------------------------------------------------------- J-A34.01's evidence: nothing signed yet
def nothing_signed():
    log = open(LANE_LOG).read().splitlines()
    landed = [ln for ln in log if re.search(r'\bm1/W-(15|20)\S*\s+LANDED', ln)]
    res = sorted(f for f in os.listdir(RESULTS) if re.match(r'W-(15|20)', f))
    tools = [f for f in ('rows.py', 'bands.py', 'cross_check.py') if os.path.exists(os.path.join(HERE, f))]
    cr = open(CLEAN_ROOM).read().splitlines() if os.path.exists(CLEAN_ROOM) else []
    m1rows = [ln[:80] for ln in cr if re.match(r'\|\s*L-\d+\s*\|\s*m1/', ln)]
    ok = not landed and not res and not tools and not m1rows
    return ok, {'W15orW20LandedLines': landed, 'W15orW20ResultFiles': res, 'bandWriterScripts': tools,
                'm1SeatRowsInCleanRoomLedger': m1rows}


# ---------------------------------------------------------------- the run
_TABLES = {}


def run(red=None):
    """red: None, or one planted fault ('design', 'input', 'ehiEA', 'ehiEB', 'share'); a red run reuses the EB tables,
    verifies EB on the first two sets only and skips the bootstrap and the flatten measurement"""
    t0 = time.time()
    checks = []
    fast = red is not None

    def check(cid, what, ok, detail):
        checks.append({'id': cid, 'check': what, 'passed': bool(ok), 'detail': detail})

    # D0 the design cells, pinned to the design's text
    text = re.sub(r'\s+', ' ', open(DESIGN).read())
    if red == 'design':
        text = text.replace('| modest | 6–9 | 18–30 |', '| modest | 6–9 | 18–31 |')
    found = {k: text.count(re.sub(r'\s+', ' ', s)) for k, s in DESIGN_STRINGS}
    check('D0', 'every design cell this fit reads is the design\'s own text (ARCHITECTURE.md, whitespace-normalised)',
          all(v >= 1 for v in found.values()), found)

    # S1 / S2 the stop law's g
    gm = g_mean()
    check('S1', 'g = |(u1+u2+u3+u4)/2 - 1| has mean 7/30 (section 4.6 step 1) by the exact CDF',
          abs(gm - 7.0 / 30.0) < 1e-9, {'mean': gm, 'sevenThirtieths': 7.0 / 30.0})
    rng = random.Random(seed_of('W-12 g check'))
    gs = sorted(abs((rng.random() + rng.random() + rng.random() + rng.random()) / 2 - 1) for _ in range(200000))
    emp = [q7(gs, p, True) for p in (.1, .5, .9)]
    check('S2', 'the exact quantiles of g agree with 200 000 seeded draws within 0.005',
          all(abs(a - b) < 0.005 for a, b in zip(emp, (G10, G50, G90))),
          {'exact': [G10, G50, G90], 'drawn': emp})

    # inputs
    e11, ng = load_ng()
    e09j, e09s, mfcg = load_mfcg()
    if red == 'input':
        h0 = ng['capture/NG/area/medium'][0]
        h0['m'] = [x * 1.02 for x in h0['m']]
    sweep = e11['sizeSweepD3']
    bad = []
    for fam, hoods in ng.items():
        for u, key in (('m', 'm_declared'), ('rel', 'rel')):
            st = stats([x for h in hoods for x in h[u]])
            ref = sweep[fam]['pooled'][key]
            for k in ('p10', 'p50', 'p90'):
                if abs(st[k] - ref[k]) > 1e-3:
                    bad.append((fam, u, k, st[k], ref[k]))
            if st['n'] != ref['n']:
                bad.append((fam, u, 'n', st['n'], ref['n']))
    check('I1', 'NG: the block minor extents re-pooled from E11\'s per-map values reproduce sizeSweepD3\'s pooled n, p10, '
                'p50, p90 for all 12 families in both units (E11 section 10.5)', not bad, {'mismatches': bad})
    cs = e11['mediumPooled']['scalars']['block.courtShare']
    med20 = q7(cs['perSeed'], .5)
    cnt = (sum(cs['companions']['courtDeep']), sum(cs['companions']['deep']))
    check('I2', 'NG: R-19\'s court input -- the type-7 median of the 20 medium hoods\' block.courtShare equals E11\'s '
                'estimate, the pooled counts equal 276 / 597',
          abs(med20 - cs['estimate']['c']) < 1e-12 and cnt == (cs['countPooled']['courtDeep'], cs['countPooled']['deep']),
          {'median20': med20, 'estimate': cs['estimate']['c'], 'counts': cnt})
    badm = []
    for fam, hoods in mfcg.items():
        for h in hoods:
            if h['rows'] != h['blocksRecorded'] or (h['deep'], h['courtDeep']) != tuple(h['courtRecorded']):
                badm.append(h['stem'])
        cp = e09j['courtPooled'][fam]
        if (sum(h['deep'] for h in hoods), sum(h['courtDeep'] for h in hoods)) != (cp['deep'], cp['courtDeep']):
            badm.append(fam)
        if abs(q7([h['value'] for h in hoods], .5) - cp['median']) > 1e-6:
            badm.append(fam + ' median')
    allm = [h for f in mfcg for h in mfcg[f]]
    cpa = e09j['courtPooled']['plain (all three sizes)']
    if abs(q7([h['value'] for h in allm], .5) - cpa['median']) > 1e-6 or len(allm) != cpa['n']:
        badm.append('plain pooled')
    check('I3', 'MFCG: each usable plain seed\'s intramural block rows number blockc.perHa\'s blocks and re-count its deep '
                'and court blocks; the per-family and pooled court counts and medians equal E09\'s courtPooled',
          not badm and sum(len(v) for v in mfcg.values()) == 30, {'mismatches': badm, 'seeds': sum(len(v) for v in mfcg.values())})

    # the fit sets
    sets = build_sets(ng, mfcg)
    tables = {}
    for v in EB_VARIANTS:
        if v not in _TABLES:
            _TABLES[v] = eb_table(v)
        tables[v] = _TABLES[v]
    check('T1', 'EB\'s tables: the smoothed p10 and p90 rise strictly with r over [1, 32] (4 001 points); the spread '
                'p90 / p10 is inverted on its running maximum from its minimum (it is flat near r = 1); the smooth\'s '
                'residuals and the flat stretch are reported',
          all(tables[v]['monotone'] for v in tables),
          {v: {'ratioAtR1': tables[v]['ratioAtR1'], 'minRatio': tables[v]['minRatio'], 'rAtMinRatio': tables[v]['rAtMinRatio'],
               'rWhereSpreadFirstExceedsItsR1ValueBy001': tables[v]['rWhereSpreadFirstExceedsItsR1ValueBy001'],
               'maxRatio': tables[v]['maxRatio'], 'monotone': tables[v]['monotone'],
               'residualRms': tables[v]['residualRms'], 'residualMax': tables[v]['residualMax'],
               'rawRatioViolations': tables[v]['rawRatioViolations']} for v in tables})

    fits_ok_ea, fits_ok_eb, n_ea, n_eb, infeasible = True, True, 0, 0, []
    worst_ea, worst_eb = 0.0, 0.0
    for si_, S in enumerate(sets):
        allv = [x for h in S['hoods'] for x in h]
        st = stats(allv)
        S['stats'] = st
        S['hoodCount'] = len(S['hoods'])
        step = STEP[S['unit']]
        half = step / 2
        # EA
        e_lo, e_hi = fit_ea(st['p10'], st['p90'])
        el, eh = rnd(e_lo, step), rnd(e_hi, step)
        if red == 'ehiEA' and si_ == 0:
            eh += 1.0
        r10, r90 = q_ea(el, eh, G10), q_ea(el, eh, G90)
        env10 = (1 - G10) * r10 / el * half + G10 * r10 / eh * half
        env90 = (1 - G90) * r90 / el * half + G90 * r90 / eh * half
        d10, d90 = r10 - st['p10'], r90 - st['p90']
        ok = abs(d10) <= env10 + 1e-12 and abs(d90) <= env90 + 1e-12
        n_ea += 1
        fits_ok_ea &= ok
        worst_ea = max(worst_ea, abs(d10) / env10, abs(d90) / env90)
        S['EA'] = {'eLo': el, 'eHi': eh, 'eLoExact': e_lo, 'eHiExact': e_hi, 'r': eh / el,
                   'reproduced': {'p10': r10, 'p90': r90, 'dev10': d10, 'dev90': d90, 'tol10': env10, 'tol90': env90,
                                  'pass': ok}}
        # EB, three variants
        S['EB'] = {}
        for v, T in tables.items():
            fit, why = fit_eb(T, st['p10'], st['p90'])
            if fit is None:
                S['EB'][v] = {'fit': None, 'reason': why}
                infeasible.append((S['id'], v))
                continue
            el, eh = rnd(fit[0], step), rnd(fit[1], step)
            if fast and si_ > 1:
                S['EB'][v] = {'eLo': el, 'eHi': eh, 'eLoExact': fit[0], 'eHiExact': fit[1], 'r': eh / el,
                              'reproduced': {'skipped': 'red run'}}
                continue
            if red == 'ehiEB' and si_ == 0:
                eh += 2.0
            v10, v90, se10, se90, nb = verify_eb(v, el, eh, S['id'])
            # rounding envelope from the table: moving each published end by half a step
            b10, b90 = eb_quantiles(T, el, eh)
            l10, l90 = eb_quantiles(T, el + half, eh)
            h10, h90 = eb_quantiles(T, el, eh + half)
            env10 = abs(l10 - b10) + abs(h10 - b10) + 3 * se10
            env90 = abs(l90 - b90) + abs(h90 - b90) + 3 * se90
            d10, d90 = v10 - st['p10'], v90 - st['p90']
            ok = abs(d10) <= env10 and abs(d90) <= env90
            n_eb += 1
            fits_ok_eb &= ok
            worst_eb = max(worst_eb, abs(d10) / env10, abs(d90) / env90)
            S['EB'][v] = {'eLo': el, 'eHi': eh, 'eLoExact': fit[0], 'eHiExact': fit[1], 'r': eh / el,
                          'reproduced': {'p10': v10, 'p90': v90, 'dev10': d10, 'dev90': d90, 'tol10': env10,
                                         'tol90': env90, 'mcSe10': se10, 'mcSe90': se90, 'blocks': nb, 'pass': ok}}
    check('F1', 'EA: every fitted [e_lo, e_hi], at its published step (0.1 m; 0.01 relative), reproduces its input\'s '
                'p10 and p90 within that rounding (the quantile change from half a step at each end), closed form',
          fits_ok_ea, {'fitted': n_ea, 'worstDeviationOverTolerance': worst_ea})
    check('F2', 'EB: every fitted [e_lo, e_hi], at its published step, reproduces its input\'s p10 and p90 in an '
                'independent seeded simulation of 400 000 blocks within the rounding envelope plus three Monte Carlo '
                'standard errors (20 batch quantiles)',
          fits_ok_eb, {'fitted': n_eb, 'worstDeviationOverTolerance': worst_eb, 'infeasible': infeasible})

    # bootstrap by hood (seeds), the candidate and companion sets only
    for S in sets:
        if S['role'] == 'size (D3)' or fast:
            continue
        rng = random.Random(seed_of('W-12 boot ' + S['id']))
        H = S['hoods']
        ea_lo, ea_hi, eb_lo, eb_hi, eb_inf = [], [], [], [], 0
        for _ in range(BOOT_B):
            pick = [H[rng.randrange(len(H))] for _ in H]
            vals = sorted(x for h in pick for x in h)
            if len(vals) < 2:
                continue
            p10, p90 = q7(vals, .1, True), q7(vals, .9, True)
            a, b = fit_ea(p10, p90)
            ea_lo.append(a)
            ea_hi.append(b)
            f, _ = fit_eb(tables['V1'], p10, p90)
            if f is None:
                eb_inf += 1
            else:
                eb_lo.append(f[0])
                eb_hi.append(f[1])

        def iv(xs):
            return [q7(xs, .05), q7(xs, .95)] if xs else None
        S['bootstrap'] = {'B': BOOT_B, 'unit': 'hood (NG) or seed (MFCG)', 'EA': {'eLo90': iv(ea_lo), 'eHi90': iv(ea_hi)},
                          'EB.V1': {'eLo90': iv(eb_lo), 'eHi90': iv(eb_hi), 'infeasibleDraws': eb_inf}}

    by_id = {S['id']: S for S in sets}

    # candidate design cells
    cand = collections.OrderedDict()
    for nid in ('NG/medium/pooled [m]', 'capture/NG/area/medium [m]'):
        S = by_id[nid]
        for est in ('EA', 'EB.V1', 'EB.V2', 'EB.V3'):
            f = S['EA'] if est == 'EA' else S['EB'][est.split('.')[1]]
            if f.get('eLo') is None:
                continue
            d_lo, d_hi = f['eLo'] / 2, f['eHi'] / 2
            k_lo, k_hi = d_lo / DEPTH_ROWS['modest'][0], d_hi / DEPTH_ROWS['modest'][1]
            cand[f'depthRows from {nid} by {est}'] = {
                'source': nid, 'estimator': est, 'blockRange': [f['eLo'], f['eHi']],
                'modest': [rnd(d_lo, .1), rnd(d_hi, .1)],
                'ratioLoHi': [k_lo, k_hi],
                'otherBandsByRatio': {b: [rnd(lo * k_lo, .1), rnd(hi * k_hi, .1)] for b, (lo, hi) in DEPTH_ROWS.items()
                                      if b != 'modest'},
                'basis': 'CITY depth factor 1.00; floor not binding (e = 2 d)'}
    for est in ('EA', 'EB.V1', 'EB.V2', 'EB.V3'):
        row = {}
        for fam, rung in MFCG_SIZE_RUNG.items():
            S = by_id[f'{fam} [m]']
            f = S['EA'] if est == 'EA' else S['EB'][est.split('.')[1]]
            row[rung] = [f['eLo'], f['eHi']] if f.get('eLo') is not None else None
        P = by_id['MFCG/plain/pooled [m]']
        fp = P['EA'] if est == 'EA' else P['EB'][est.split('.')[1]]
        cand[f'denseCore floor from MFCG by {est}'] = {
            'perRung': row, 'pooled': [fp['eLo'], fp['eHi']] if fp.get('eLo') is not None else None,
            'ratioToDesignCITY': ([row['CITY'][0] / FLOORS['denseCore'][0], row['CITY'][1] / FLOORS['denseCore'][1]]
                                  if row['CITY'] else None),
            'basis': 'the floor binding (e = r); not scaled by the rung depth factor'}

    # size dependence (an observation: D3 and the MFCG sizes; the rung depth factors are not in W-12's row)
    p50 = {S['family']: S['stats']['p50'] for S in sets if S['unit'] == 'm' and 'footprints' not in S['id']}
    size_dep = {
        'NG pooled p50 small / medium / large (m)': [p50['NG/small/pooled'], p50['NG/medium/pooled'], p50['NG/large/pooled']],
        'NG ratio to medium': [p50['NG/small/pooled'] / p50['NG/medium/pooled'], 1.0, p50['NG/large/pooled'] / p50['NG/medium/pooled']],
        'MFCG p50 TOWN / CITY / METROPOLIS (m)': [p50[f] for f in MFCG_SIZE_RUNG],
        'MFCG ratio to CITY': [p50[f] / p50['capture/MFCG/80/plain'] for f in MFCG_SIZE_RUNG],
        'design depth factor TOWN / CITY / METROPOLIS': list(RUNG_DEPTH.values())}

    # resulting block ranges at CITY in the dense core, per band, under the design and two all-one-estimator combinations
    def ranges(depth, floor):
        return {b: [max(2 * lo, floor[0]), max(2 * hi, floor[1])] for b, (lo, hi) in depth.items()}
    combos = collections.OrderedDict()
    combos['design now'] = ranges(DEPTH_ROWS, FLOORS['denseCore'])
    for est in ('EA', 'EB.V1'):
        c = cand[f'depthRows from NG/medium/pooled [m] by {est}']
        depth = collections.OrderedDict((b, tuple(c['modest']) if b == 'modest' else tuple(c['otherBandsByRatio'][b]))
                                        for b in DEPTH_ROWS)
        fl = cand[f'denseCore floor from MFCG by {est}']['perRung']['CITY']
        combos[f'{est}: NG pooled modest, other bands by ratio, MFCG CITY floor'] = ranges(depth, fl)
        combos[f'{est}: NG pooled modest, other bands unchanged, design floor'] = ranges(
            collections.OrderedDict((b, tuple(c['modest']) if b == 'modest' else v) for b, v in DEPTH_ROWS.items()),
            FLOORS['denseCore'])

    # the design's present block ranges run forward through both readings (what the current rows produce, CITY)
    design_fwd = collections.OrderedDict()
    for reg in ('denseCore', 'walledRings'):
        design_fwd[reg] = collections.OrderedDict()
        for band, (e_lo_, e_hi_) in ranges(DEPTH_ROWS, FLOORS[reg]).items():
            design_fwd[reg][band] = {'e': [e_lo_, e_hi_],
                                     'EA': [q_ea(e_lo_, e_hi_, G10), q_ea(e_lo_, e_hi_, G90)],
                                     'EB.V1': list(eb_quantiles(tables['V1'], e_lo_, e_hi_))}

    # shares (R-19)
    court_ng = med20
    if red == 'share':
        court_ng = 0.45664
    k, rows = share_rows(court_ng)
    if red == 'share':
        rows['prosperous'] = rows['prosperous'][:3] + [0.0]
    pub2 = {b: [x / 100 for x in lr_round(v, 0.01)] for b, v in rows.items()}
    pub3 = {b: [x / 1000 for x in lr_round(v, 0.001)] for b, v in rows.items()}
    alt_count = share_rows(cs['countPooled']['share'])[1]
    area5 = q7(cs['perSeed'][:5], .5)
    alt_area = share_rows(area5)[1]
    # the design-deep proxy: blocks whose inscribed radius exceeds the modest band's mid plot depth d-bar (CITY, 24 m)
    dbar = sum(DEPTH_ROWS['modest']) / 2
    proxy_h, proxy_c, proxy_d = [], 0, 0
    for fam in [f for f in ng if f.endswith('/medium')]:
        for h in ng[fam]:
            mpu = h['medShortMu'] * M_PER_MU
            dd = [b for b in h['court']['blocks'] if b['inscribedRadiusRel'] * mpu > dbar]
            c_ = sum(1 for b in dd if b['court'])
            proxy_d += len(dd)
            proxy_c += c_
            if dd:
                proxy_h.append(c_ / len(dd))
    mfcg_med = q7([h['value'] for h in allm], .5)
    mfcg_cells = {'CS-M1 type-7 median over the 30 usable plain seeds': mfcg_med,
                  'CS-M2 pooled count ratio over the 30 seeds': cpa['countRatio'],
                  'CS-M3 per rung (type-7 median over each size\'s 10 seeds)':
                      {MFCG_SIZE_RUNG[f]: e09j['courtPooled'][f]['median'] for f in MFCG_SIZE_RUNG}}
    mfcg_rows = mfcg_preset_rows(mfcg_med)
    share_bad = []
    for name, rr in [('R-19', rows), ('count ratio', alt_count), ('area only', alt_area), ('MFCG preset', mfcg_rows)]:
        for b, v in rr.items():
            if abs(sum(v) - 1.0) > 1e-12 or min(v) < 0 or v[0] > 1.0:
                share_bad.append((name, b, sum(v)))
    for name, P in (('2 decimals', pub2), ('3 decimals', pub3)):
        for b, v in P.items():
            if round(sum(v), 9) != 1.0:
                share_bad.append((name, b, sum(v)))
    check('C1', 'the shares of every band sum to 1: R-19\'s four rows (unrounded within 1e-12, and their two-decimal and '
                'three-decimal published forms exactly), the two alternative NG estimators\' rows, the MFCG preset\'s rows '
                'under both remainder alternatives; every share in [0, 1], every court cell capped at 1',
          not share_bad, {'violations': share_bad})

    # flatten (skipped in a red run)
    fl = None
    if not fast:
        bends, census = flatten_measure()
        fl = flatten_summary(bends, census)
        e10 = json.load(open(E10_PLAN))['rows']['pooled']['counts']
        check('I4', 'flatten inputs: the non-template cuts and their straight / one-bend counts on the 20 medium seeds '
                    'equal W-10b\'s (E10 section 9: 1 107 cuts, 372 straight, 731 one-bend)',
              census['cuts'] == e10['allCuts'] and census['bends0'] == e10['bends012']['allCuts'][0]
              and census['bends1'] == e10['bends012']['allCuts'][1] and fl['oneBend'] == census['bends1'],
              {'ours': dict(census), 'E10': e10})

    ok, ev = nothing_signed()
    check('J1', 'no block band is signed before W-12 lands (J-A34.01): no m1/W-15 or m1/W-20 LANDED line, no W-15 / W-20 '
                'result file, no rows.py / bands.py / cross_check.py, no M-1 seat row in plat/CLEAN-ROOM.md\'s ledger',
          ok, ev)

    out = {
        'schema': 'm1.depth-refit.fit/1', 'lane': LANE, 'workItem': 'W-12 (the fit half; the ruling is a Fable seat\'s)',
        'status': 'DRAFT: candidates only, nothing ruled or signed', 'script': SCRIPT,
        'scriptSha256': sha256(os.path.abspath(__file__)),
        'inputs': {os.path.relpath(p, ROOT): sha256(p) for p in (E11_PLAN, E09_JSON, E09_SEEDS, E10_PLAN, DESIGN)},
        'declaredScale': {'mPerModelUnit': M_PER_MU, 'note': 'NG metres are declared (R-01); MFCG exports metres'},
        'design': {'depthRows': DEPTH_ROWS, 'regimeFloors': FLOORS, 'rungDepthFactor': RUNG_DEPTH,
                   'shares': {b: dict(zip(SHARE_KEYS, v)) for b, v in SHARES.items()},
                   'flattenM': {'base': FLATTEN_BASE_M, 'MFCG': FLATTEN_MFCG_M, 'relFactor': FLATTEN_REL}},
        'stopLaw': {'g10': G10, 'g50': G50, 'g90': G90, 'gMean': gm},
        'ebSettings': {'rGrid': [1.0, R_MAX, R_GRID], 'variants': EB_VARIANTS, 'verifyBlocks': VERIFY_N,
                       'verifyBatches': VERIFY_BATCHES, 'polyDegree': POLY_DEG,
                       'tables': {v: {'r': T['r'], 'q10raw': T['q10raw'], 'q50raw': T['q50raw'], 'q90raw': T['q90raw'],
                                      'poly10': T['P10'], 'poly90': T['P90'], 'residualRms': T['residualRms'],
                                      'residualMax': T['residualMax'], 'ratioAtR1': T['ratioAtR1'],
                                      'minRatio': T['minRatio'], 'rAtMinRatio': T['rAtMinRatio'],
                                      'maxRatio': T['maxRatio']} for v, T in tables.items()}},
        'sets': [{k: v for k, v in S.items() if k != 'hoods'} for S in sets],
        'candidates': cand, 'sizeDependence': size_dep, 'blockRangesCITYdenseCore': combos,
        'designNowForwardCITY': design_fwd,
        'shares': {
            'ngCourtInput': {'estimator': 'type7 median over the 20 medium hoods (R-19)', 'value': med20,
                             'countRatio': cs['countPooled']['share'], 'areaTemplateMedian5': area5,
                             'designDeepProxy': {'rule': f'inscribed radius > the modest band\'s d-bar {dbar} m (CITY)',
                                                 'pooledCountRatio': proxy_c / proxy_d if proxy_d else None,
                                                 'courtDeep': [proxy_c, proxy_d],
                                                 'hoodMedian': q7(proxy_h, .5) if proxy_h else None,
                                                 'hoods': len(proxy_h)}},
            'ratio': k,
            'R19': {b: dict(zip(SHARE_KEYS, v)) for b, v in rows.items()},
            'R19published2': {b: dict(zip(SHARE_KEYS, v)) for b, v in pub2.items()},
            'R19published3': {b: dict(zip(SHARE_KEYS, v)) for b, v in pub3.items()},
            'altCountRatio': {b: dict(zip(SHARE_KEYS, v)) for b, v in alt_count.items()},
            'altAreaTemplate': {b: dict(zip(SHARE_KEYS, v)) for b, v in alt_area.items()},
            'mfcgCourtCell': mfcg_cells,
            'mfcgPresetRows': {k_: dict(zip(SHARE_KEYS, v)) for k_, v in mfcg_rows.items()}},
        'flatten': fl,
        'checks': checks,
    }
    print(f'run: {time.time() - t0:.1f} s', file=sys.stderr)
    return out


# ---------------------------------------------------------------- markdown tables for the record (written to --md)
def f1(x):
    return '–' if x is None else f'{x:.1f}'


def md(out):
    L = []
    W = L.append
    W('### Inputs and fits (p10 · p50 · p90 of the block minor extents; fitted [e_lo, e_hi] at the publication step)')
    W('')
    W('| set | role | unit | hoods / seeds | blocks | p10 · p50 · p90 | EA [e_lo, e_hi] | EB-V1 [e_lo, e_hi] | EB-V2 | EB-V3 | '
      'bootstrap 90 % (EA e_lo; e_hi) | bootstrap 90 % (EB-V1 e_lo; e_hi) |')
    W('|---|---|---|---|---|---|---|---|---|---|---|---|')
    for S in out['sets']:
        st = S['stats']
        u = S['unit']
        dg = 2 if u == 'rel' else 1

        def pair(f):
            if f.get('eLo') is None:
                return 'no fit'
            return f"[{f['eLo']:.{dg}f}, {f['eHi']:.{dg}f}]"
        bs = S.get('bootstrap')

        def b(est):
            if not bs or not bs[est]['eLo90']:
                return '–'
            x = bs[est]
            extra = f"; {x['infeasibleDraws']} / {bs['B']} draws no fit" if x.get('infeasibleDraws') else ''
            return (f"{x['eLo90'][0]:.{dg}f}–{x['eLo90'][1]:.{dg}f}; {x['eHi90'][0]:.{dg}f}–{x['eHi90'][1]:.{dg}f}"
                    + extra)
        W(f"| {S['id']} | {S['role']} | {u} | {S['hoodCount']} | {st['n']} | {st['p10']:.{dg}f} · {st['p50']:.{dg}f} · "
          f"{st['p90']:.{dg}f} | {pair(S['EA'])} | {pair(S['EB']['V1'])} | {pair(S['EB']['V2'])} | {pair(S['EB']['V3'])} | "
          f"{b('EA')} | {b('EB.V1')} |")
    W('')
    W('### Reproduction (the row\'s checker): the published pair\'s p10 / p90 against the input\'s')
    W('')
    W('| set | estimator | input p10 / p90 | reproduced p10 / p90 | deviation | tolerance | pass |')
    W('|---|---|---|---|---|---|---|')
    for S in out['sets']:
        st = S['stats']
        dg = 3 if S['unit'] == 'rel' else 2
        for est, f in [('EA', S['EA'])] + [(f'EB-{v}', S['EB'][v]) for v in ('V1', 'V2', 'V3')]:
            if f.get('eLo') is None:
                W(f"| {S['id']} | {est} | {st['p10']:.{dg}f} / {st['p90']:.{dg}f} | no fit | – | – | {f['reason']} |")
                continue
            r = f['reproduced']
            W(f"| {S['id']} | {est} | {st['p10']:.{dg}f} / {st['p90']:.{dg}f} | {r['p10']:.{dg}f} / {r['p90']:.{dg}f} | "
              f"{r['dev10']:+.{dg}f} / {r['dev90']:+.{dg}f} | ±{r['tol10']:.{dg}f} / ±{r['tol90']:.{dg}f} | "
              f"{'PASS' if r['pass'] else 'FAIL'} |")
    W('')
    W('### Candidate depth rows (modest from NG; e = 2 d at the CITY depth factor 1.00, the floor not binding)')
    W('')
    W('| source | estimator | block range [e_lo, e_hi] m | modest [d_lo, d_hi] m | poor by ratio | prosperous by ratio | '
      'rich by ratio |')
    W('|---|---|---|---|---|---|---|')
    for k, c in out['candidates'].items():
        if not k.startswith('depthRows'):
            continue
        ob = c['otherBandsByRatio']
        W(f"| {c['source']} | {c['estimator']} | [{f1(c['blockRange'][0])}, {f1(c['blockRange'][1])}] | "
          f"[{f1(c['modest'][0])}, {f1(c['modest'][1])}] | [{f1(ob['poor'][0])}, {f1(ob['poor'][1])}] | "
          f"[{f1(ob['prosperous'][0])}, {f1(ob['prosperous'][1])}] | [{f1(ob['rich'][0])}, {f1(ob['rich'][1])}] |")
    W('')
    W('### Candidate dense-core floors (from MFCG\'s intramural cluster blocks; e = r, the floor binding)')
    W('')
    W('| estimator | TOWN (size 40) | CITY (size 80) | METROPOLIS (size 130) | pooled (30 seeds) |')
    W('|---|---|---|---|---|')
    for k, c in out['candidates'].items():
        if not k.startswith('denseCore'):
            continue
        pr = c['perRung']
        cell = lambda v: '–' if v is None else f'[{f1(v[0])}, {f1(v[1])}]'   # noqa: E731
        W(f"| {k.split(' by ')[1]} | {cell(pr['TOWN'])} | {cell(pr['CITY'])} | {cell(pr['METROPOLIS'])} | "
          f"{cell(c['pooled'])} |")
    W('')
    W('### The block range per band at CITY in the dense core (e_lo = max(2 d_lo, r_lo), e_hi = max(2 d_hi, r_hi))')
    W('')
    W('| combination | poor | modest | prosperous | rich |')
    W('|---|---|---|---|---|')
    for k, v in out['blockRangesCITYdenseCore'].items():
        W(f"| {k} | " + ' | '.join(f'[{f1(v[b][0])}, {f1(v[b][1])}]' for b in ('poor', 'modest', 'prosperous', 'rich'))
          + ' |')
    W('')
    W('### What the design\'s present ranges produce (CITY; block minor-extent p10 / p90 in m under each reading)')
    W('')
    W('| regime | band | block range [e_lo, e_hi] | EA p10 / p90 | EB-V1 p10 / p90 |')
    W('|---|---|---|---|---|')
    for reg, bands in out['designNowForwardCITY'].items():
        for band, v in bands.items():
            W(f"| {reg} | {band} | [{f1(v['e'][0])}, {f1(v['e'][1])}] | {f1(v['EA'][0])} / {f1(v['EA'][1])} | "
              f"{f1(v['EB.V1'][0])} / {f1(v['EB.V1'][1])} |")
    W('')
    sd = out['sizeDependence']
    W('### Size dependence (an observation)')
    W('')
    W('| quantity | values |')
    W('|---|---|')
    for k, v in sd.items():
        W(f"| {k} | {' / '.join(f'{x:.3f}' if isinstance(x, float) else str(x) for x in v)} |")
    fl = out.get('flatten')
    if fl:
        W('')
        W('### cut.flattenM: the heights of NG\'s kept bends (20 medium seeds)')
        W('')
        W(f"Cuts {fl['cuts']}, one-bend {fl['oneBend']} (share {fl['oneBendShare']:.4f}); heights in model units: min "
          f"{fl['hMu']['min']:.3f}, p1 {fl['hMu']['p01']:.3f}, p5 {fl['hMu']['p05']:.3f}, p10 {fl['hMu']['p10']:.3f}, "
          f"p50 {fl['hMu']['p50']:.3f}; declared metres: min {fl['hM']['min']:.3f}, p1 {fl['hM']['p01']:.3f}, p5 "
          f"{fl['hM']['p05']:.3f}, p10 {fl['hM']['p10']:.3f}, p50 {fl['hM']['p50']:.3f}. Below two model units: "
          f"{fl['belowTwoMu']}. Height / chord: min {fl['relHeight']['min']:.4f}; below 0.02: "
          f"{fl['relHeight']['belowDesignFactor']}. Histogram of heights 0-6 mu by 0.25 mu: {fl['histMu0to6by025']}.")
        W('')
        W('| flattenM (m) | relative factor | NG kept bends the rule would flatten | one-bend share after |')
        W('|---|---|---|---|')
        for g in fl['grid']:
            W(f"| {g['flattenM']:.2f} | {g['relFactor']:.3f} | {g['keptBendsFlattened']} | {g['oneBendShareAfter']:.4f} |")
        W('')
        W('| lowest kept bends | street | height mu | chord mu | both ends snapped | filleted | angle deg |')
        W('|---|---|---|---|---|---|---|')
        for b_ in fl['lowest']:
            W(f"| {b_['label']} | {b_['street']} | {b_['hMu']:.4f} | {b_['chordMu']:.2f} | {b_['bothSnapped']} | "
              f"{b_['filleted']} | {b_['angleDeg']:.2f} |")
    sh = out['shares']
    W('')
    W('### The deep-interior shares (court / back_lane / through_alley / rear_plots)')
    W('')
    W('| band | design | R-19 fit (unrounded) | two decimals (largest remainder) | three decimals | alt: count ratio | '
      'alt: area template |')
    W('|---|---|---|---|---|---|---|')
    fmt = lambda d, n: ' / '.join(f'{d[k]:.{n}f}' for k in SHARE_KEYS)   # noqa: E731
    for b_ in SHARES:
        W(f"| {b_} | {fmt(out['design']['shares'][b_], 2)} | {fmt(sh['R19'][b_], 4)} | {fmt(sh['R19published2'][b_], 2)} | "
          f"{fmt(sh['R19published3'][b_], 3)} | {fmt(sh['altCountRatio'][b_], 4)} | {fmt(sh['altAreaTemplate'][b_], 4)} |")
    W('')
    W('| MFCG preset row | court / back_lane / through_alley / rear_plots |')
    W('|---|---|')
    for k, v in sh['mfcgPresetRows'].items():
        W(f'| {k} | {fmt(v, 4)} |')
    return '\n'.join(L) + '\n'


def main():
    args = sys.argv[1:]
    if '--red' in args:
        bad = 0
        # each planted fault must turn exactly its own check red and leave the others green
        for fault, want in (('design', 'D0'), ('input', 'I1'), ('ehiEA', 'F1'), ('ehiEB', 'F2'), ('share', 'C1'),
                            (None, None)):
            o = run(red=fault) if fault else run(red='control')
            failed = sorted(c['id'] for c in o['checks'] if not c['passed'])
            ok = failed == ([want] if want else [])
            bad += 0 if ok else 1
            print(f"red {fault or 'control (no fault)'}: failed {failed} -> {'as expected' if ok else 'UNEXPECTED'}")
        print(f"{6 - bad} / 6 red runs as expected")
        sys.exit(1 if bad else 0)
    out_json = args[args.index('--json') + 1] if '--json' in args else OUT_JSON
    out_md = args[args.index('--md') + 1] if '--md' in args else None
    out = run()
    with open(out_json, 'w') as fh:
        json.dump(out, fh, indent=1, sort_keys=False, default=lambda o: dict(o))
        fh.write('\n')
    if out_md:
        open(out_md, 'w').write(md(out))
    for c in out['checks']:
        print(f"{'PASS' if c['passed'] else 'FAIL'} {c['id']} {c['check'][:110]}")
    n_fail = sum(not c['passed'] for c in out['checks'])
    print(f"{len(out['checks']) - n_fail} / {len(out['checks'])} checks PASS; wrote {out_json}")
    sys.exit(1 if n_fail else 0)


if __name__ == '__main__':
    main()
