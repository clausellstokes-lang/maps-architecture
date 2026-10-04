#!/usr/bin/env python3
"""research/baselines/spike_bootstrap.py -- spike S-V12-1: bootstrap the MFCG target bands (M-1 work item W-13).

Lane m1/W-13 (docs/calibration/M-1-plan.md section 2, row W-13; V12 section 8.3 (1); record
docs/calibration/E13-spike-bootstrap.md). Research side only; our own code, standard library only (Python 3.9). It reads
the measured per-seed values of the two records the row names -- E07 (docs/calibration/E07-mfcg-signature.plan.json,
written by measure_mfcg.py --plan, W-07b) and E09 (docs/calibration/E09-mfcg-derived-graph.json and its per-seed file
E09-mfcg-derived-graph.seeds.json, written by derived_graph.py, W-09) -- and the registry twin
research/baselines/metrics.m-1.json (each metric's sign, floor, kind and M-1 role). It opens no capture, touches no site,
writes nothing under plat/ and writes neither plan.json nor metrics.m-1.json. It imports measure_mfcg.py (V12 section
3.5.1's estimators, the E07 key paths) and derived_graph.py (the E09 key paths) unchanged.

What it does (V12 section 8.3 (1); the W-13 row):
  rows        every MFCG metric the registry gives role 'target' with work item W-07b or W-09 (E07's and E09's values),
              on the three plain families (TOWN 40, CITY 80, METROPOLIS 130; purpose 'rows'), one row per metric and,
              for a vector metric, per field (the N-25 row form); the stress family is descriptive and stays out. Two of
              them have a fixed band column in ARCHITECTURE section 13.5 (gate.count: main gates = N exact by the gate
              law; market.adjacent: adjacent markets 0), so no reference sample sets their band: they are bootstrapped
              like the others but kept out of the outcome's denominator (a declared reading, vetoable; the companion
              outcome counts them in). Every other MFCG target entry is listed with the reason it has no row here
  the band    the full sample's per-seed values -> V12 section 3.5.1's estimator (type7 at n >= 10) -> V12 section
              3.5.2's band: sign positive lo = min(0.9 a, 0.85 c), hi = max(1.1 b, 1.15 c), then lo <= c - floor and
              hi >= c + floor; sign any w = max(b - a, floor), lo = a - 0.1 w, hi = b + 0.1 w. The floor is the
              registry's absFloor: a value, or relToReferenceMedian x |c| (recomputed with c in every draw)
  candidates  four fixed values per row on its full-sample band's edges +- 5 %: lo - 5 %|lo|, lo + 5 %|lo|,
              hi - 5 %|hi|, hi + 5 %|hi| (an edge at exactly 0 takes 5 % of the band width instead, flagged). Their
              full-sample verdicts are fail / pass / pass / fail (checked). Companion reading: +- 5 % of the band's
              width at both edges
  draws       per family 1 000 draws of n = 10 seed indices with replacement from the usable seeds (one index vector
              per draw for every row of the family, so a draw resamples whole seeds); the stream is declared:
              random.Random(int(sha256('S-V12-1|<family>')[:16], 16)).randrange(n), ten calls per draw, draws in order
  a flip      a candidate's verdict under the draw's recomputed band differs from its full-sample verdict; a row
              flips in a draw when any of its four candidates flips
  outcome     (the row's pre-decided rule) a row is unstable when it flips in more than 5 % of the draws (> 50 of
              1 000); the outcome fires when more than 10 % of the target rows are unstable -> 20 seeds per size, an
              owner step (plan section 5 (3), not approved: the seat stops and reports)
  projection  (a model, not a measurement; for the owner's and the rulings seat's reading of the fallback) per row the
              mean flip rate a reference sample of m seeds would show under the same test, the population modelled
              as the ten values smoothed by a Gaussian kernel (Silverman's bandwidth): 40 reference samples of m, each
              bootstrapped 250 times, at m = 10 (the control against the measured rates), 20 (the fallback), 40 and
              100; its streams are seeded like the draws ('S-V12-1|<family>|projection|<row id>|<m>')

Checks: C1 (the row's checker) the resample is seeded and reproducible -- the whole bootstrap computed twice from fresh
streams is identical, and --verify FILE re-computes a stored record byte for byte in a separate process; C2 E07's and
E09's usable seeds agree per family, n = 10, no failed seed; C3 each row's full-sample estimator equals its record's
stored summary exactly; C4 every MFCG target entry at W-07b / W-09 is a row, the rest listed with a reason; C5 the four
candidates' full-sample verdicts are fail / pass / pass / fail; C6 every row's sample is complete (no missing value).

Usage (project root):
  python3 research/baselines/spike_bootstrap.py [--json OUT] [--verify FILE] [--red]
    default OUT docs/calibration/E13-spike-bootstrap.json; exit 1 on any FAIL
    --verify FILE  re-compute and compare with FILE byte for byte (C1's separate-process receipt); writes nothing
    --red          plants one fault per check (C1 an unseeded stream for TOWN in the second computation; C2 a usable
                   seed renamed in E09's sample; C3 METROPOLIS ribbon.share's first value moved by 1e-6; C4 the first
                   target row dropped; C5 TOWN walled.share's lo + 5 % verdict flipped; C6 CITY sgd.tShare's last value
                   removed) so every check must go red; writes nothing
"""
import hashlib
import json
import os
import platform
import random
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import measure_mfcg as MM    # noqa: E402  (estimate: V12 3.5.1; SCALARS, BAND_KEYS: E07's key paths)
import derived_graph as DG   # noqa: E402  (SUMMARY_METRICS: E09's key paths)

SCRIPT = 'research:baselines/spike_bootstrap.py'
CAL = os.path.join(ROOT, 'docs', 'calibration')
E07 = os.path.join(CAL, 'E07-mfcg-signature.plan.json')
E09 = os.path.join(CAL, 'E09-mfcg-derived-graph.json')
E09S = os.path.join(CAL, 'E09-mfcg-derived-graph.seeds.json')
REG = os.path.join(HERE, 'metrics.m-1.json')
OUT = os.path.join(CAL, 'E13-spike-bootstrap.json')
DRAWS = 1000
EDGE_REL = 0.05            # candidates at each edge +- 5 %
UNSTABLE_DRAWS = 0.05      # a row is unstable when it flips in more than 5 % of draws
FIRE_ROWS = 0.10           # the outcome fires when more than 10 % of target rows are unstable
PLAIN = ['capture/MFCG/40/plain', 'capture/MFCG/80/plain', 'capture/MFCG/130/plain']
ROW_ITEMS = {'W-07b': 'E07', 'W-09': 'E09'}
FIXED_BAND = {   # ARCHITECTURE section 13.5's band column (our design text), not the band rule
    'gate.count': "section 13.5 towers and gates: main gates = N exact, N by section 4.2 S3 (4)'s law",
    'market.adjacent': 'section 13.5 markets: adjacent markets 0',
}
EXCLUDED_REASON = {
    'W-07': "D28's draw-style members: measured on the draw records of the recorded generations (E07 section 7), not "
            "per seed on the plan's usable seeds per size, so there is no per-size sample to resample",
    'W-08': "W-08's rows (record E08, not landed when this ran): outside this row's inputs (E07, E09)",
    'W-15': 'one value per rung formed at W-15 from the vectors over MFCG and FTG (R-40); a target as a floor, not a '
            'band from per-seed statistics',
}
PROJ_K, PROJ_D, PROJ_M = 40, 250, (10, 20, 40, 100)   # the projection: reference samples per size, draws per sample, sizes
CAND = ('loOut', 'loIn', 'hiIn', 'hiOut')
CAND_FULL = {'loOut': False, 'loIn': True, 'hiIn': True, 'hiOut': False}


def file_sha(path):
    with open(path, 'rb') as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def canon(o):
    return json.dumps(o, indent=1, sort_keys=True) + '\n'


def stream(family):
    return random.Random(int(hashlib.sha256(f'S-V12-1|{family}'.encode()).hexdigest()[:16], 16))


def floor_of(spec, c):
    if 'value' in spec:
        return spec['value']
    return spec['relToReferenceMedian'] * abs(c)


def band(e, sign, fspec):
    """V12 section 3.5.2 on an estimate {a, b, c}; returns lo, hi and which term set each edge"""
    a, b, c = e['a'], e['b'], e['c']
    f = floor_of(fspec, c)
    if sign == 'any':
        w = max(b - a, f)
        return {'lo': a - 0.1 * w, 'hi': b + 0.1 * w, 'floor': f, 'loTerm': 'a - 0.1 w', 'hiTerm': 'b + 0.1 w'}
    los = [(a * 0.9, 'p10 x 0.9'), (c * 0.85, 'c x 0.85'), (c - f, 'c - floor')]
    his = [(b * 1.1, 'p90 x 1.1'), (c * 1.15, 'c x 1.15'), (c + f, 'c + floor')]
    lo = min(v for v, _ in los)
    hi = max(v for v, _ in his)
    return {'lo': lo, 'hi': hi, 'floor': f,
            'loTerm': [t for v, t in los if v == lo][0], 'hiTerm': [t for v, t in his if v == hi][0]}


def candidates(lo, hi, rule):
    out, flagged = {}, False
    for edge, (cout, cin), sgn in ((lo, ('loOut', 'loIn'), -1), (hi, ('hiOut', 'hiIn'), 1)):
        if rule == 'edge':
            d = EDGE_REL * abs(edge)
            if edge == 0:
                d, flagged = EDGE_REL * (hi - lo), True
        else:
            d = EDGE_REL * (hi - lo)
        out[cout] = edge + sgn * d
        out[cin] = edge - sgn * d
    return out, flagged


def inside(v, b):
    return b['lo'] <= v <= b['hi']


def pick(xs, q):
    return MM.pct(xs, q)


def project(xs, sign, fspec, m, rng):
    """a model, not a measurement: the mean row-flip rate a reference sample of m seeds would show under this test,
    with the population modelled as the ten values smoothed by a Gaussian kernel (Silverman's bandwidth); PROJ_K
    reference samples of m, each bootstrapped PROJ_D times with the same band, candidates and flip rule"""
    n = len(xs)
    mu = sum(xs) / n
    h = 1.06 * (sum((x - mu) ** 2 for x in xs) / (n - 1)) ** 0.5 * n ** -0.2
    rates = []
    for _ in range(PROJ_K):
        S = [xs[rng.randrange(n)] + (rng.gauss(0.0, h) if h > 0 else 0.0) for _ in range(m)]
        b = band(MM.estimate(S), sign, fspec)
        cand, _ = candidates(b['lo'], b['hi'], 'edge')
        full = {k: inside(cand[k], b) for k in CAND}
        flips = 0
        for _ in range(PROJ_D):
            bd = band(MM.estimate([S[rng.randrange(m)] for _ in range(m)]), sign, fspec)
            flips += any(inside(cand[k], bd) != full[k] for k in CAND)
        rates.append(flips / PROJ_D)
    return sum(rates) / len(rates)


# ---------------------------------------------------------------- the inputs
def load_inputs(red):
    e07 = json.load(open(E07))
    e09 = json.load(open(E09))
    e09s = json.load(open(E09S))['perSeed']
    reg = json.load(open(REG))
    s09 = {f['family']: f for f in e09['sample']}
    if red:
        s09 = json.loads(json.dumps(s09))
        s09[PLAIN[0]]['usable'][0] = s09[PLAIN[0]]['usable'][0] + '-renamed'
    return e07, e09, e09s, reg, s09


def select_rows(reg, red):
    """registry MFCG target entries -> (rows to bootstrap, excluded entries)"""
    rows, excluded = [], []
    for m in reg['metrics']:
        for e in m.get('m1', []):
            if e.get('reference') != 'MFCG' or e.get('role') != 'target':
                continue
            wi = e.get('workItem')
            if wi not in ROW_ITEMS:
                excluded.append({'metric': m['id'], 'workItem': wi, 'deliverable': e.get('deliverable'),
                                 'reason': EXCLUDED_REASON.get(wi, 'no per-seed values in E07 or E09')})
                continue
            fields = m['output'].get('fields') if m['output']['kind'] == 'vector' else [None]
            for fld in fields:
                rows.append({'metric': m['id'], 'field': fld, 'source': ROW_ITEMS[wi], 'workItem': wi,
                             'deliverable': e.get('deliverable'), 'kind': m['output']['kind'], 'unit': m['unit'],
                             'sign': m['sign'], 'absFloor': {k: v for k, v in m['absFloor'].items() if k != 'basis'},
                             'bandColumn': FIXED_BAND.get(m['id'], 'the band rule (V12 3.5.2)'),
                             'inDenominator': m['id'] not in FIXED_BAND})
    if red:
        rows = rows[1:]
    return rows, excluded


E07_KEY = {m: k for m, k in MM.SCALARS}
E09_KEY = {m: k for m, k in DG.SUMMARY_METRICS}


def per_seed(row, stem, e07, e09s):
    if row['source'] == 'E07':
        p = e07['perSeed'][stem]
        if row['field'] is not None:
            sub = {'bldg.wallAlign.median': 'median', 'bldg.wallAlign.share15': 'share15'}[row['metric']]
            return p['bldg.wallAlign'][row['field']][sub]
        return (p.get(row['metric']) or {}).get(E07_KEY[row['metric']])
    return (e09s[stem].get(row['metric']) or {}).get(E09_KEY[row['metric']])


def stored_summary(row, lab, e07, e09):
    if row['source'] == 'E07':
        s = e07['summaries'][lab][row['metric']]
        return s[row['field']] if row['field'] is not None else s
    return e09['summaries'][lab]['summary'][row['metric']]


# ---------------------------------------------------------------- the bootstrap
def bootstrap(table, fams, unseeded_family=None):
    """table: {family: [(row index, xs)]}; returns the per-family draw digests and the per-row flip counts"""
    fam_out, row_out = {}, {}
    for lab in PLAIN:
        n = len(fams[lab])
        rng = random.SystemRandom() if lab == unseeded_family else stream(lab)
        draws = [[rng.randrange(n) for _ in range(n)] for _ in range(DRAWS)]
        fam_out[lab] = {'n': n, 'draws': DRAWS, 'drawsSha256': hashlib.sha256(json.dumps(draws).encode()).hexdigest(),
                        'firstDraws': draws[:3]}
        for ri, xs, sign, fspec, full, cand, candw in table[lab]:
            cnt = {k: 0 for k in CAND}
            cntw = {k: 0 for k in CAND}
            row_flips = row_flips_w = 0
            los, his = [], []
            for idx in draws:
                e = MM.estimate([xs[i] for i in idx])
                b = band(e, sign, fspec)
                los.append(b['lo']); his.append(b['hi'])
                any_f = any_w = False
                for k in CAND:
                    if inside(cand[k], b) != full[k]:
                        cnt[k] += 1; any_f = True
                    if inside(candw[k], b) != full[k]:
                        cntw[k] += 1; any_w = True
                row_flips += any_f; row_flips_w += any_w
            row_out[ri] = {'flips': cnt, 'rowFlips': row_flips, 'flipsWidth': cntw, 'rowFlipsWidth': row_flips_w,
                           'loDraws': [pick(los, q) for q in (0.025, 0.5, 0.975)],
                           'hiDraws': [pick(his, q) for q in (0.025, 0.5, 0.975)]}
    return fam_out, row_out


def build(red=False, unseeded=False):
    e07, e09, e09s, reg, s09 = load_inputs(red)
    fams = {lab: e07['families'][lab]['usable'] for lab in PLAIN}
    rows, excluded = select_rows(reg, red)
    checks = []

    def ck(cid, name, ok, receipt):
        checks.append({'id': cid, 'check': name, 'passed': bool(ok), 'receipt': receipt})

    # C2 the two records' samples agree
    bad = []
    for lab in PLAIN:
        u7, u9 = e07['families'][lab]['usable'], s09[lab]['usable']
        f7 = set(e07['families'][lab]['failedStems']); f9 = set(s09[lab]['failedStems'])
        if u7 != u9:
            bad.append(f'{lab}: E07 usable != E09 usable')
        if len(u7) != 10:
            bad.append(f'{lab}: n {len(u7)} != 10')
        if set(u7) & (f7 | f9):
            bad.append(f'{lab}: a failed seed among the usable')
    ck('C2', "E07's and E09's usable seeds agree per family; n = 10; no failed seed among them", not bad,
       '; '.join(bad) if bad else ' / '.join(f"{lab.split('/')[2]} n {len(fams[lab])} (failed carried: "
                                            f"{', '.join(e07['families'][lab]['failedStems']) or 'none'})" for lab in PLAIN))

    out_rows, table = [], {lab: [] for lab in PLAIN}
    miss, sum_bad, cand_bad, flagged_any = [], [], [], []
    for lab in PLAIN:
        rung = e07['families'][lab]['rung']; size = e07['families'][lab]['size']
        for r in rows:
            xs = [per_seed(r, s, e07, e09s) for s in fams[lab]]
            if red and lab == PLAIN[1] and r['metric'] == 'sgd.tShare':
                xs = xs[:-1] + [None]
            if red and lab == PLAIN[2] and r['metric'] == 'ribbon.share':
                xs = [xs[0] + 1e-6] + xs[1:]
            rid = f"{r['metric']}/{rung}" + (f"/{r['field']}" if r['field'] else '')
            if any(v is None for v in xs):
                miss.append(rid)
                continue
            e = MM.estimate(xs)
            st = stored_summary(r, lab, e07, e09)
            if not (st['estimator'] == e['estimator'] and st['n'] == e['n'] and st['a'] == e['a'] and st['b'] == e['b']
                    and st['c'] == e['c'] and st['seeds'] == fams[lab]):
                sum_bad.append(rid)
            b = band(e, r['sign'], r['absFloor'])
            cand, flagged = candidates(b['lo'], b['hi'], 'edge')
            candw, _ = candidates(b['lo'], b['hi'], 'width')
            full = {k: inside(cand[k], b) for k in CAND}
            if red and lab == PLAIN[0] and r['metric'] == 'walled.share':
                full['loIn'] = not full['loIn']
            fullw = {k: inside(candw[k], b) for k in CAND}
            if full != CAND_FULL or fullw != CAND_FULL:
                cand_bad.append(rid)
            if flagged:
                flagged_any.append(rid)
            ri = len(out_rows)
            out_rows.append(dict(r, id=rid, family=lab, rung=rung, size=size, seeds=fams[lab], perSeed=xs,
                                 estimate={k: e[k] for k in ('estimator', 'n', 'a', 'b', 'c')}, band=b,
                                 candidates=cand, candidatesWidth=candw, zeroEdgeFallback=flagged))
            table[lab].append((ri, xs, r['sign'], r['absFloor'], CAND_FULL, cand, candw))
    ck('C6', "every row's sample is complete (a value for each usable seed)", not miss,
       f'{len(out_rows)} rows complete' if not miss else 'missing values: ' + ', '.join(miss))
    ck('C3', "each row's full-sample estimator equals its record's stored summary (estimator, n, a, b, c, seeds) "
             'exactly', not sum_bad,
       f'{len(out_rows)} of {len(out_rows)} equal (E07 summaries, E09 summaries)' if not sum_bad else
       'unequal: ' + ', '.join(sum_bad))
    want = 0
    regd = json.load(open(REG))
    for m in regd['metrics']:
        for e in m.get('m1', []):
            if e.get('reference') == 'MFCG' and e.get('role') == 'target' and e.get('workItem') in ROW_ITEMS:
                want += len(m['output'].get('fields') or [None]) if m['output']['kind'] == 'vector' else 1
    have = len(rows)
    ck('C4', 'every MFCG target entry at W-07b / W-09 is a row on each plain family; the other MFCG target entries '
             'listed with their reason', have == want and len(out_rows) + len(miss) == want * len(PLAIN),
       f'{have} of {want} metric rows (fields counted) x {len(PLAIN)} families = {len(out_rows) + len(miss)}; '
       f'excluded {len(excluded)}: ' + ', '.join(f"{x['metric']} ({x['workItem']})" for x in excluded))
    ck('C5', 'on the full-sample band the candidates read fail / pass / pass / fail (lo - 5 %, lo + 5 %, hi - 5 %, '
             'hi + 5 %; and the width companion)', not cand_bad,
       f'{len(out_rows)} rows; zero-edge fallback used on ' + (', '.join(flagged_any) or 'none')
       if not cand_bad else 'wrong side: ' + ', '.join(cand_bad))

    fam_out, row_out = bootstrap(table, fams)
    for ri, ro in row_out.items():
        r = out_rows[ri]
        r['flips'] = ro['flips']; r['rowFlips'] = ro['rowFlips']; r['rowRate'] = ro['rowFlips'] / DRAWS
        r['unstable'] = ro['rowFlips'] > UNSTABLE_DRAWS * DRAWS
        r['flipsWidth'] = ro['flipsWidth']; r['rowFlipsWidth'] = ro['rowFlipsWidth']
        r['unstableWidth'] = ro['rowFlipsWidth'] > UNSTABLE_DRAWS * DRAWS
        r['loDraws'] = ro['loDraws']; r['hiDraws'] = ro['hiDraws']
        r['projection'] = {f'm{m}': project(r['perSeed'], r['sign'], r['absFloor'], m,
                                            stream(f"{r['family']}|projection|{r['id']}|{m}")) for m in PROJ_M}
        for m in PROJ_M:
            r[f'unstableProjected{m}'] = r['projection'][f'm{m}'] > UNSTABLE_DRAWS

    def outcome(sel, key):
        tgt = [r for r in out_rows if sel(r)]
        uns = [r['id'] for r in tgt if r[key]]
        share = len(uns) / len(tgt) if tgt else 0.0
        per = {}
        for lab in PLAIN:
            t = [r for r in tgt if r['family'] == lab]
            u = [r for r in t if r[key]]
            per[e07['families'][lab]['rung']] = {'rows': len(t), 'unstable': len(u),
                                                 'share': len(u) / len(t) if t else 0.0}
        return {'targetRows': len(tgt), 'unstableRows': len(uns), 'share': share, 'fires': share > FIRE_ROWS,
                'unstable': uns, 'perRung': per}
    core = {
        'schema': 'research.e13-spike-bootstrap/1', 'record': 'E13', 'workItem': 'W-13', 'lane': 'm1/W-13',
        'spike': 'S-V12-1 (V12 section 8.3 (1))', 'script': SCRIPT, 'scriptSha256': file_sha(os.path.abspath(__file__)),
        'uses': {n: file_sha(os.path.join(HERE, n)) for n in ('measure_mfcg.py', 'derived_graph.py')},
        'inputs': {os.path.relpath(p, ROOT): file_sha(p) for p in (E07, E09, E09S, REG)},
        'python': platform.python_version(),
        'parameters': {'draws': DRAWS, 'drawSize': 'n = the usable count (10)', 'edgeRel': EDGE_REL,
                       'unstableWhenFlipsInMoreThan': UNSTABLE_DRAWS, 'firesWhenUnstableRowsMoreThan': FIRE_ROWS,
                       'stream': "random.Random(int(sha256('S-V12-1|<family>')[:16], 16)).randrange(n), n calls per "
                                 'draw, draws in order',
                       'estimator': 'V12 3.5.1 (measure_mfcg.estimate): type7 p10 / p90 and the median at n >= 10',
                       'band': 'V12 3.5.2 (sign positive): lo = min(0.9 a, 0.85 c, c - floor), hi = max(1.1 b, '
                               '1.15 c, c + floor); the floor the registry absFloor (relToReferenceMedian x |c| per draw)',
                       'candidates': 'lo - 5 %|lo|, lo + 5 %|lo|, hi - 5 %|hi|, hi + 5 %|hi| (an edge at 0: 5 % of the '
                                     'band width); companion: +- 5 % of the band width at both edges',
                       'rowFlip': 'a row flips in a draw when any of its four candidates changes verdict'},
        'rule': ('the pre-decided outcome (W-13 row; V12 8.3 (1)): above 10 % of target rows flipping in over 5 % of '
                 'draws -> MFCG goes to 20 seeds per size, an owner step (plan section 5 (3), not approved; the seat '
                 'stops and reports); FTG rows stay as section 13.5 classes them'),
        'families': fam_out,
        'rows': out_rows,
        'excluded': excluded,
        'outcome': outcome(lambda r: r['inDenominator'], 'unstable'),
        'outcomeCompanions': {
            'allTargetRowsIncludingFixedBand': outcome(lambda r: True, 'unstable'),
            'widthCandidates': outcome(lambda r: r['inDenominator'], 'unstableWidth'),
        },
        'projection': {
            'what': ('a model, not a measurement (PLAUSIBLE): per row the mean flip rate a reference sample of m seeds '
                     'would show under this test, the population modelled as the ten measured values smoothed by a '
                     "Gaussian kernel (Silverman's bandwidth 1.06 sd n^-1/5); %d reference samples of m per row, each "
                     'bootstrapped %d times; m = 10 is the control against the measured outcome, m = 20 the '
                     'fallback, m = 40 and 100 the scale'
                     % (PROJ_K, PROJ_D)),
            'stream': "random.Random(int(sha256('S-V12-1|<family>|projection|<row id>|<m>')[:16], 16))",
            **{f'm{m}': outcome(lambda r: r['inDenominator'], f'unstableProjected{m}') for m in PROJ_M},
        },
    }
    return core, checks


def run(red, verify):
    core, checks = build(red=red)
    core2, _ = build(red=False)
    if red:   # C1's plant: the second computation draws from an unseeded stream for one family
        e07, e09, e09s, reg, s09 = load_inputs(False)
        fams = {lab: e07['families'][lab]['usable'] for lab in PLAIN}
        rows = [r for r in core2['rows']]
        table = {lab: [(i, r['perSeed'], r['sign'], r['absFloor'], CAND_FULL, r['candidates'], r['candidatesWidth'])
                       for i, r in enumerate(rows) if r['family'] == lab] for lab in PLAIN}
        fo, _ = bootstrap(table, fams, unseeded_family=PLAIN[0])
        core2 = dict(core2, families=fo)
    h1 = hashlib.sha256(canon(core).encode()).hexdigest()
    h2 = hashlib.sha256(canon(core2).encode()).hexdigest() if not red else \
        hashlib.sha256(canon(dict(core, families=core2['families'])).encode()).hexdigest()
    checks.insert(0, {'id': 'C1', 'check': 'the resample is seeded and reproducible (the W-13 row): two computations '
                                         'from fresh streams are identical',
                      'passed': h1 == h2,
                      'receipt': f'core sha256 {h1[:16]} / {h2[:16]}; draws sha256 per family '
                                 + ' / '.join(f"{lab.split('/')[2]} {core['families'][lab]['drawsSha256'][:12]}"
                                              for lab in PLAIN)})
    checks.sort(key=lambda c: c['id'])
    result = dict(core, checks=checks, checksFailed=sum(1 for c in checks if not c['passed']), coreSha256=h1)
    text = canon(result)
    if verify:
        stored = open(verify).read()
        same = stored == text
        print(f"{'PASS' if same else 'FAIL'} C1 separate-process reproduction: {verify} "
              f"{'byte-identical' if same else 'DIFFERS'} (sha256 {hashlib.sha256(text.encode()).hexdigest()[:16]} / "
              f"{hashlib.sha256(stored.encode()).hexdigest()[:16]})")
        if not same:
            return result, text, 1
    return result, text, result['checksFailed']


def report(result):
    o = result['outcome']
    print('== S-V12-1 (W-13): 1 000 draws of ten seeds per size; flips at each band edge +- 5 %')
    for lab in PLAIN:
        print(f"-- {lab}: n {result['families'][lab]['n']}, draws sha256 {result['families'][lab]['drawsSha256'][:16]}")
    print(f"{'row':44s} {'c':>10s} {'lo':>10s} {'hi':>10s}  loOut  loIn  hiIn hiOut   row%            "
          f"proj (a model) at m = {' / '.join(str(m) for m in PROJ_M)}")
    for r in result['rows']:
        f = r['flips']
        print(f"{r['id']:44s} {r['estimate']['c']:10.4g} {r['band']['lo']:10.4g} {r['band']['hi']:10.4g} "
              + ' '.join(f"{f[k] / 10:5.1f}" for k in CAND) + f"  {r['rowRate'] * 100:5.1f}"
              + (' UNSTABLE' if r['unstable'] else '         ') + '  proj ' + ' '.join(
                  f"{r['projection'][f'm{m}'] * 100:5.1f}" for m in PROJ_M) + ('' if r['inDenominator'] else ' (fixed band)'))
    print(f"OUTCOME: {o['unstableRows']} of {o['targetRows']} band-rule target rows unstable ({o['share'] * 100:.1f} %; "
          f"rule > 10 %): {'FIRES -> 20 seeds per size, owner step (plan 5 (3))' if o['fires'] else 'does not fire'}")
    for k, c in list(result['outcomeCompanions'].items()) + [(f'projection m = {m} (a model)', result['projection'][f'm{m}'])
                                                              for m in PROJ_M]:
        print(f"  companion {k}: {c['unstableRows']} of {c['targetRows']} ({c['share'] * 100:.1f} %) "
              f"{'fires' if c['fires'] else 'does not fire'}")
    for c in result['checks']:
        print(f"{'PASS' if c['passed'] else 'FAIL'} {c['id']} {c['check']}: {c['receipt']}")
    print('ALL PASS' if not result['checksFailed'] else f"{result['checksFailed']} FAIL")


def main():
    args = sys.argv[1:]
    red = '--red' in args
    out = args[args.index('--json') + 1] if '--json' in args else OUT
    verify = args[args.index('--verify') + 1] if '--verify' in args else None
    result, text, rc = run(red, verify)
    report(result)
    if not red and not verify:
        tmp = out + '.tmp'
        with open(tmp, 'w') as fh:
            fh.write(text)
        os.replace(tmp, out)
        print(f'wrote {os.path.relpath(out, ROOT)} sha256 {hashlib.sha256(text.encode()).hexdigest()}')
    return 1 if rc else 0


if __name__ == '__main__':
    sys.exit(main())
