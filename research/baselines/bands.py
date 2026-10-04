#!/usr/bin/env python3
"""bands.py — the band arithmetic of M-1's rows (V12 section 3.5.1 - 3.5.4), the dispersion step (R-10, R-40) and
the fixed-band, declared-exception and weakness forms the design states in ARCHITECTURE section 13.5.

Lane m1/W-15 is the sole writer of this file, rows.py and cross_check.py (M-1-rulings-2.md R-47 (a)). Our own code,
standard library only. It holds numbers, metric ids and our own words; no reference word list, grammar, palette or
identifier. Nothing here is read by plat/: the parity CLI forms its bands from each row's stored values (C-0092); this
module forms the same bands research-side for E15's table, the flip list and the design seat's hand-off.

Functions are pure. `--selftest` runs the known-answer tests and the equalities with the earlier tools' estimators
(measure_mfcg.estimate, measure_ng.estimate) and with W-13's bands (spike_bootstrap.band) on E13's 78 rows.
"""
import hashlib
import json
import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


# ---------------------------------------------------------------------------------------------------------------
# V12 section 3.5.1: estimators
# ---------------------------------------------------------------------------------------------------------------

def q7(xs, p):
    """Hyndman and Fan's type 7 quantile: linear between order statistics (V12 section 3.5.1)."""
    s = sorted(xs)
    if not s:
        return None
    k = (len(s) - 1) * p
    f, c = math.floor(k), math.ceil(k)
    return s[f] if f == c else s[f] + (s[c] - s[f]) * (k - f)


def estimator_for(n):
    if n <= 0:
        return None
    if n == 1:
        return 'single'
    return 'minmax' if n < 10 else 'type7'


def estimate(xs):
    """V12 section 3.5.1 on per-seed statistics: single at n = 1, minmax at 2-9, type7 (p10 / p90) at n >= 10; the
    centre c is the median. Returns {estimator, n, a, b, c} or None for an empty sample."""
    v = [x for x in xs if x is not None]
    n = len(v)
    if n == 0:
        return None
    if n == 1:
        return {'estimator': 'single', 'n': 1, 'a': v[0], 'b': v[0], 'c': v[0]}
    if n < 10:
        return {'estimator': 'minmax', 'n': n, 'a': min(v), 'b': max(v), 'c': q7(v, 0.5)}
    return {'estimator': 'type7', 'n': n, 'a': q7(v, 0.1), 'b': q7(v, 0.9), 'c': q7(v, 0.5)}


# ---------------------------------------------------------------------------------------------------------------
# V12 section 3.5.2: scalar target bands (the floor is read from metrics.m-1.json, never from a row: N-05)
# ---------------------------------------------------------------------------------------------------------------

def floor_of(spec, c):
    """The registry's absFloor: a stated value, or a share of the reference's median (V12 section 3.4.2's defaults)."""
    if spec is None:
        return 0.0
    if spec.get('value') is not None:
        return float(spec['value'])
    return float(spec['relToReferenceMedian']) * abs(c)


def scalar_band(a, b, c, sign, floor_spec):
    """V12 section 3.5.2. positive: lo = min(a x 0.9, c x 0.85), hi = max(b x 1.1, c x 1.15), then lo <= c - floor and
    hi >= c + floor; any: w = max(b - a, floor), lo = a - 0.1 w, hi = b + 0.1 w. Returns lo, hi, the floor and the term
    that set each edge (the same arithmetic as spike_bootstrap.band, W-13)."""
    f = floor_of(floor_spec, c)
    if sign == 'any':
        w = max(b - a, f)
        return {'lo': a - 0.1 * w, 'hi': b + 0.1 * w, 'floor': f, 'loTerm': 'a - 0.1 w', 'hiTerm': 'b + 0.1 w'}
    los = [(a * 0.9, 'p10 x 0.9'), (c * 0.85, 'c x 0.85'), (c - f, 'c - floor')]
    his = [(b * 1.1, 'p90 x 1.1'), (c * 1.15, 'c x 1.15'), (c + f, 'c + floor')]
    lo = min(v for v, _ in los)
    hi = max(v for v, _ in his)
    return {'lo': lo, 'hi': hi, 'floor': f,
            'loTerm': [t for v, t in los if v == lo][0], 'hiTerm': [t for v, t in his if v == hi][0]}


# ---------------------------------------------------------------------------------------------------------------
# V12 section 3.5.3: distribution bands
# ---------------------------------------------------------------------------------------------------------------

def cdf(counts):
    n = sum(counts)
    acc, out = 0, []
    for x in counts:
        acc += x
        out.append(acc / n if n else 0.0)
    return out


def ks_binned(c1, c2):
    """Two-sample KS distance on the binned CDFs at the registry's edges (underflow and overflow included as bins)."""
    if not sum(c1) or not sum(c2):
        return None
    return max(abs(x - y) for x, y in zip(cdf(c1), cdf(c2)))


def spread_ks(hists, groups=None):
    """V12 section 3.5.3: the p90 (type 7) of the two-sample KS distances over seed pairs (n = 2: the one value).
    hists: per-seed bin counts (None for a seed without elements, which enters no pair). groups: an optional group key
    per seed; when given, only pairs inside one group count (the per-template subsets, attachment A of
    M0-handoff-M1.md: 'spreadKS.p90 over the per-template subsets')."""
    idx = [i for i, h in enumerate(hists) if h is not None and sum(h) > 0]
    pairs = [(i, j) for k, i in enumerate(idx) for j in idx[k + 1:]
             if groups is None or groups[i] == groups[j]]
    d = [ks_binned(hists[i], hists[j]) for i, j in pairs]
    if not d:
        return None
    return {'p90': d[0] if len(d) == 1 else q7(d, 0.9), 'pairs': len(d)}


KS_C001 = 1.628


def ks_single_ceiling(n1, n2):
    """V12 section 3.5.3 at n = 1: the two-sample KS critical value c(0.01) x sqrt((n1 + n2) / (n1 n2))."""
    return KS_C001 * math.sqrt((n1 + n2) / (n1 * n2))


def distribution_band(spread):
    """Ours passes when its median single-seed KS distance to the reference seeds is <= 1.25 x the spread's p90."""
    if spread is None:
        return None
    return {'ksMax': 1.25 * spread['p90']}


# ---------------------------------------------------------------------------------------------------------------
# ARCHITECTURE section 13.5's other band forms. The band columns are the design's; these are their machine forms for
# E15's table and the flip list (reference value r = the row's p50). 'kind' is the form; 'text' quotes the column in
# our words; lo / hi are the numeric edges where the column states them.
# ---------------------------------------------------------------------------------------------------------------

FIXED_BANDS = {
    # metric: (field or None, kind, text, lo, hi, relative_to_reference)
    ('water.step', None): ('fixed', 'outline step <= 25 m (section 13.5 water row; R-48)', None, 25.0, False),
    ('draw.hatchPerWing', None): ('fixed', '15-20 triangles per wing (section 13.5 draw style, hatched; R-49)', 15.0, 20.0, False),
    ('bldg.area', 'median'): ('fixed', 'ordinary houses median 60-160 m2 (section 13.5 plots and footprints; R-34)', 60.0, 160.0, False),
    ('bldg.area', 'p95'): ('fixed', 'ordinary houses p95 < 400 m2 (section 13.5 plots and footprints; R-34)', None, 400.0, False),
    ('bldg.quadSide', None): ('fixed', 'no numeric band: the row states ordinary-house medians and a sheared minority kept (R-34)', None, None, False),
    ('bldg.worstCorner', None): ('fixed', 'no numeric band: a sheared minority kept (section 13.5 plots and footprints; R-34)', None, None, False),
    ('junction.angles', 'median'): ('fixed', 'median 85-95 deg (section 13.5 junction row)', 85.0, 95.0, False),
    ('junction.angles', 'p5'): ('fixed', 'p5 >= 30 deg (section 13.5 junction row)', 30.0, None, False),
    ('junction.share4', None): ('fixed', '4-way share organic 0-15 %, ringed 20-45 %, american 40-80 % (section 13.5 junction row)', None, None, False),
    ('gate.count', None): ('fixed', 'main gates = N exact by our law (section 13.5 towers and gates)', None, None, False),
    ('cut.sigma', None): ('fixed', 'sigma within +-0.02 of the reference (section 13.5 bent-cut signature)', -0.02, 0.02, True),
    ('cut.cornerMid', None): ('fixed', 'corner within 0.10 of mid-course on >= 80 % (section 13.5 bent-cut signature)', 0.80, None, False),
    ('cut.arrival85', None): ('fixed', 'arrivals >= 85 deg on >= 95 % (section 13.5 bent-cut signature)', 0.95, None, False),
    ('cut.fillet', None): ('fixed', 'fillet share within +-0.05 of the reference on identical shapes (section 13.5 bent-cut signature)', -0.05, 0.05, True),
    ('fg.recoverability', None): ('fixed', 'recoverability >= MFCG - 0.03 (section 13.5 figure-ground)', -0.03, None, True),
    ('fg.streetwall', None): ('fixed', "streetwall >= MFCG's on dense frontages (section 13.5 figure-ground)", 0.0, None, True),
    ('market.adjacent', None): ('fixed', 'adjacent markets 0 (section 13.5 markets)', None, 0.0, False),
    ('draw.capSquare', None): ('fixed', 'square caps on open streets: a law of the hatched preset (section 13.5 draw style; E20 F3)', None, None, False),
    ('bldg.attached', None): ('fixed', 'attached >= 90 % in dense / poor (section 13.5 party walls)', 0.90, None, False),
}

DECLARED_EXCEPTIONS = {
    'street.turn100': ('declared exception', 'organic presets median turning within 0.5-1.5 x FTG (section 13.5 street turning; DC-35)', 0.5, 1.5),
}

WEAKNESS_CLAUSES = {
    'street.stepHist': 'no cliff: no empty bin above 15 deg while the bin below it holds > 1 % (section 13.5 street turning)',
    'street.entropy50': "heading entropy >= FTG's (section 13.5 street turning)",
    'wall.ungated': 'ungated crossings 0 on ground part 0 (section 13.5 towers and gates)',
    'tree.nnP1': "NN p1 >= section 13.7's canopy threshold (section 13.5 tree scatter)",
    'tree.nnMedian': 'reported beside the p1 clause (section 13.5 tree scatter)',
    'tree.pcf': 'pair-correlation per class reported (section 13.5 tree scatter)',
    'time.model': 'section 12.3 / 12.5 budgets; the ratios of section 12.9 (section 13.5 generation time)',
    'plot.moran': 'Moran I >= 0.8 and > 0 follows from our rules (section 13.5 plot-area gradient)',
    'plot.cvDistrict': 'within-district CV >= 0.25 (section 13.5 plot-area gradient; section 13.7)',
    'pop.perBuilding': 'requested population within +-5 % on >= 95 % of seeds; the ratio reported (section 13.5 population)',
}


def fixed_band(metric, field, ref):
    """The fixed band of a fixed-band row, with numeric edges made absolute where the column is relative to the
    reference value r."""
    spec = FIXED_BANDS.get((metric, field)) or FIXED_BANDS.get((metric, None))
    if spec is None:
        return None
    kind, text, lo, hi, rel = spec
    if rel and ref is not None:
        lo = None if lo is None else ref + lo
        hi = None if hi is None else ref + hi
    return {'kind': kind, 'text': text, 'lo': lo, 'hi': hi}


def declared_exception(metric, ref):
    spec = DECLARED_EXCEPTIONS.get(metric)
    if spec is None or ref is None:
        return None
    kind, text, flo, fhi = spec
    return {'kind': kind, 'text': text, 'lo': flo * ref, 'hi': fhi * ref}


# ---------------------------------------------------------------------------------------------------------------
# The dispersion step (R-10, R-40; V12 section 3.4.2 variety.dispersion)
# ---------------------------------------------------------------------------------------------------------------

def sd(xs, ddof=1):
    n = len(xs)
    if n - ddof <= 0:
        return 0.0
    m = sum(xs) / n
    return math.sqrt(sum((x - m) ** 2 for x in xs) / (n - ddof))


def pooled_deviations(vectors, ddof=1):
    """Per component, the standard deviation over the union of both references' vectors at the rung (R-10)."""
    k = len(vectors[0])
    return [sd([v[i] for v in vectors], ddof) for i in range(k)]


def mean_pairwise_distance(vectors, dev):
    """The mean pairwise Euclidean distance of the vectors standardised by dev; a component whose pooled deviation is
    0 is left out (it cannot vary)."""
    keep = [i for i, d in enumerate(dev) if d > 0]
    z = [[v[i] / dev[i] for i in keep] for v in vectors]
    pairs = [(i, j) for i in range(len(z)) for j in range(i + 1, len(z))]
    if not pairs:
        return None, keep
    tot = sum(math.sqrt(sum((a - b) ** 2 for a, b in zip(z[i], z[j]))) for i, j in pairs)
    return tot / len(pairs), keep


def dispersion_step(mfcg_vectors, ftg_vectors, ddof=1):
    """Both references' variety.dispersion at one rung (R-40): standardise every component by the deviation over
    MFCG's vectors united with FTG's, then the mean pairwise distance within each reference."""
    dev = pooled_deviations(mfcg_vectors + ftg_vectors, ddof)
    dm, keep = mean_pairwise_distance(mfcg_vectors, dev)
    df, _ = mean_pairwise_distance(ftg_vectors, dev)
    return {'pooledDeviation': dev, 'componentsKept': keep, 'MFCG': dm, 'FTG': df,
            'nMFCG': len(mfcg_vectors), 'nFTG': len(ftg_vectors), 'ddof': ddof}


# ---------------------------------------------------------------------------------------------------------------
# Passing-to-failing: where a recomputed band no longer covers what the old one did (for the shift record)
# ---------------------------------------------------------------------------------------------------------------

def lost_intervals(old, new):
    """The values that passed the old band [lo, hi] and fail the new one: old minus new, as up to two intervals.
    An open edge is None."""
    if old is None or new is None:
        return []
    olo, ohi = old.get('lo'), old.get('hi')
    nlo, nhi = new.get('lo'), new.get('hi')
    out = []
    ninf = -math.inf
    pinf = math.inf
    olo_ = ninf if olo is None else olo
    ohi_ = pinf if ohi is None else ohi
    nlo_ = ninf if nlo is None else nlo
    nhi_ = pinf if nhi is None else nhi
    if olo_ < nlo_ and olo_ < ohi_:
        out.append([None if olo_ == ninf else olo_, min(nlo_, ohi_)])
    if ohi_ > nhi_ and ohi_ > olo_:
        out.append([max(nhi_, olo_), None if ohi_ == pinf else ohi_])
    return [iv for iv in out if iv[0] is None or iv[1] is None or iv[1] > iv[0]]


# ---------------------------------------------------------------------------------------------------------------
# Self-test
# ---------------------------------------------------------------------------------------------------------------

def _selftest():
    sys.path.insert(0, HERE)
    results = []

    def check(name, ok, detail=''):
        results.append({'check': name, 'passed': bool(ok), 'detail': detail})

    # known answers
    check('q7 KAT', q7([1, 2, 3, 4], 0.1) == 1.3 and q7([1, 2, 3, 4], 0.5) == 2.5 and q7([5], 0.9) == 5,
          'type 7 on [1..4]: p10 1.3, p50 2.5')
    check('estimator by n', [estimator_for(n) for n in (1, 2, 9, 10, 44)] == ['single', 'minmax', 'minmax', 'type7', 'type7'])
    b = scalar_band(10.0, 20.0, 15.0, 'positive', {'value': 0.5})
    check('positive band KAT', abs(b['lo'] - 9.0) < 1e-12 and abs(b['hi'] - 22.0) < 1e-12, json.dumps(b))
    b = scalar_band(-0.1, 0.2, 0.0, 'any', {'value': 0.05})
    check('any band KAT', abs(b['lo'] + 0.13) < 1e-12 and abs(b['hi'] - 0.23) < 1e-12, json.dumps(b))
    b = scalar_band(0.0, 0.0, 0.0, 'positive', {'value': 0.5})
    check('zero-spread band keeps the floor', b['lo'] == -0.5 and b['hi'] == 0.5, json.dumps(b))
    s = spread_ks([[1, 0], [0, 1], [1, 1]])
    check('spread KAT', s['pairs'] == 3 and abs(s['p90'] - 0.9) < 1e-12, json.dumps(s) + ' (distances 1, 0.5, 0.5)')
    s = spread_ks([[1, 0], [0, 1], [1, 1]], groups=['x', 'y', 'x'])
    check('within-group pairs', s['pairs'] == 1 and abs(s['p90'] - 0.5) < 1e-12, json.dumps(s))
    check('lost intervals', lost_intervals({'lo': 1, 'hi': 5}, {'lo': 2, 'hi': 4}) == [[1, 2], [4, 5]]
          and lost_intervals({'lo': 1, 'hi': 5}, {'lo': 0, 'hi': 9}) == [])
    d = dispersion_step([[0, 0], [1, 1]], [[0, 0], [2, 2]])
    check('dispersion KAT', d['MFCG'] is not None and d['FTG'] > d['MFCG'], json.dumps({k: d[k] for k in ('MFCG', 'FTG')}))

    # equality with the earlier tools' estimators (prior art kept, not forked)
    import random
    import measure_mfcg as MM
    import measure_ng as MN
    rng = random.Random(15)
    bad = 0
    for _ in range(500):
        n = rng.randint(1, 25)
        xs = [rng.uniform(-5, 50) for _ in range(n)]
        e = estimate(xs)
        em = MM.estimate(xs)
        en = MN.estimate(xs)
        for o in (em, en):
            if o['estimator'] != e['estimator'] or any(abs(o[k] - e[k]) > 1e-12 for k in 'abc'):
                bad += 1
    check('estimate = measure_mfcg.estimate = measure_ng.estimate on 500 random samples', bad == 0, f'{bad} differ')

    # W-13's bands (spike_bootstrap.band) on E13's rows
    e13 = json.load(open(os.path.join(ROOT, 'docs/calibration/E13-spike-bootstrap.json')))
    reg = {m['id']: m for m in json.load(open(os.path.join(HERE, 'metrics.m-1.json')))['metrics']}
    n_rows, diffs = 0, 0
    for r in e13['rows']:
        est = r.get('estimate') or {}
        if not all(k in est for k in 'abc'):
            continue
        mid = r['metric']
        base = reg.get(mid)
        if base is None:
            continue
        fspec = base.get('absFloor')
        if r.get('field') and isinstance(fspec, dict) and 'byField' in fspec:
            fspec = fspec['byField'][r['field']]
        mine = scalar_band(est['a'], est['b'], est['c'], base.get('sign', 'positive'), fspec)
        theirs = r.get('band') or {}
        n_rows += 1
        if abs(mine['lo'] - theirs.get('lo', math.nan)) > 1e-9 or abs(mine['hi'] - theirs.get('hi', math.nan)) > 1e-9:
            diffs += 1
    check("scalar_band = W-13's band on E13's rows", n_rows >= 72 and diffs == 0, f'{n_rows} rows, {diffs} differ')
    return results


if __name__ == '__main__':
    if '--selftest' in sys.argv:
        res = _selftest()
        for r in res:
            print(('PASS ' if r['passed'] else 'FAIL ') + r['check'] + ('  ' + r['detail'] if r['detail'] else ''))
        bad = [r for r in res if not r['passed']]
        print(f'{len(res) - len(bad)} / {len(res)} PASS')
        sys.exit(1 if bad else 0)
    print(__doc__)
