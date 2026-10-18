#!/usr/bin/env python3
"""research/baselines/spike_derived_graph.py -- spike S-V12-2: the derived street graph's stability (M-1 work item W-14).

Lane m1/W-14 (docs/calibration/M-1-plan.md section 2, row W-14; V12 section 8.3 (2); rulings R-22, R-47 (g); record
docs/calibration/E14-spike-derived-graph.md). Research side only; our own code, standard library plus PIL through
derived_graph.py. It reads the two files W-09 wrote (docs/calibration/E09-mfcg-derived-graph.json and its per-seed file
E09-mfcg-derived-graph.seeds.json) and, for the sensitivity runs, the five 2026-09-25 fixtures' MeasureInput files
through derived_graph.measure_seed (unchanged; the same code path as its --fixtures --step / --spur switches). It opens
no capture bundle, touches no site, writes nothing under plat/ and writes neither plan.json nor metrics.m-1.json.

What it does (the W-14 row; V12 section 8.3 (2); R-22):
  the CV      the seed-to-seed CV of sgd.tShare, sgd.deadEnds, blockc.perHa and blockc.lotsPer per family over the
              usable seeds, recomputed from the per-seed file with derived_graph.cv_of (the sample SD / mean, E09 D13;
              the population form beside it) and compared with E09's stored summaries (the row's checker:
              "reproducible from E09's per-seed file")
  the rule    (pre-decided, V12 section 8.3 (2); plan section 8 (3)) a metric whose seed-to-seed CV exceeds 0.3 becomes
              descriptive by the <M-1> rule, in C-0116's form, else it stays target; applied per row (metric x plain
              family), on the sample CV; the population CV, the any-family reading and block.courtShare (D5 / D32, not a
              D11 metric) are reported beside as companions that must not change the verdict; the stress family
              (capture/MFCG/80/river+coast) is descriptive by the plan whatever its CV and is reported, not ruled
  sensitivity (R-22's bias PROXY for M0-c-07a's note: no product skeleton exists research-side, so this is not the
              raster-against-skeleton bias; T-V12-3 at M1 decides) the five fixtures measured again at the base
              parameters (step 0.5 m, spur 8 m, merge 2 m), at step 0.25 m, at spur 6 m and at spur 10 m; per metric,
              per fixture and per variant the change against the base (absolute and relative), summarised by the
              largest and the median absolute relative change over the five fixtures, read against T-V12-3's
              tolerance (0.5 % relative or one unit of the last printed digit, whichever is larger) and against the
              seed-to-seed sample SD of the plain family at the fixture's size (context only)

Checks: C1 (the row's checker) the CVs recomputed from E09's per-seed file equal E09's stored summaries exactly, with n
= the usable seeds; C2 every row's status follows from its CV by the rule, and no companion reading changes a verdict;
C3 the base variant equals E09's stored fixture records field for field (the same code, the same parameters: a
determinism receipt); C4 blockc.perHa and blockc.lotsPer are identical under every variant (the block count and the
footprints per block come from the union-find and the centroid test, not from the raster); C5 every variant's graph on
every fixture is planar and keeps E09's face-count identity at every stage; C6 the sample read from E09 is the plan's
(the usable seeds per family, no failed seed among them); C7 the sensitivity table is complete (4 variants x 5 fixtures,
parameters as declared) and --verify re-forms a stored record byte for byte without measuring.

Usage (project root):
  python3 research/baselines/spike_derived_graph.py [--json OUT] [--cache DIR] [--verify FILE] [--red]
                                                    [--measure VARIANT[,VARIANT...]]
    default OUT docs/calibration/E14-spike-derived-graph.json; exit 1 on any FAIL
    --cache DIR    one JSON file per (variant, fixture) record; a run measures only what the cache lacks (save-as-you-go:
                   a killed run loses at most one map); default research/baselines/scratch is NOT used -- pass the
                   lane's scratch directory
    --measure V    measure the named variants' five fixtures into the cache and stop (no record written); for the
                   background runs
    --verify FILE  re-form the record from FILE's stored measurements and the E09 files, without measuring, and compare
                   with FILE byte for byte (C7's separate-process receipt); writes nothing
    --red          plants one fault per check (C1 one per-seed value moved by 1e-6; C2 one row's status flipped; C3 the
                   base's sgd.deadEnds on one fixture moved; C4 blockc.perHa changed under one variant; C5 a crossing
                   planted on one variant's fixture; C6 a failed seed added to one family's usable list; C7 one
                   variant's fixture record dropped) so every check must go red; writes nothing
"""
import collections
import copy
import hashlib
import json
import os
import platform
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import derived_graph as DG   # noqa: E402  (measure_seed, cv_of, FIXTURES, CV_METRICS, strip_rows, write_json)

SCRIPT = 'research:baselines/spike_derived_graph.py'
CAL = os.path.join(ROOT, 'docs', 'calibration')
E09 = os.path.join(CAL, 'E09-mfcg-derived-graph.json')
E09S = os.path.join(CAL, 'E09-mfcg-derived-graph.seeds.json')
OUT = os.path.join(CAL, 'E14-spike-derived-graph.json')
RECORD = 'docs/calibration/E14-spike-derived-graph.md'
CV_LIMIT = 0.3                           # V12 section 8.3 (2): CV > 0.3 -> descriptive
METRICS = list(DG.CV_METRICS)            # sgd.tShare, sgd.deadEnds, blockc.perHa, blockc.lotsPer (D11)
COMPANION = 'block.courtShare'           # D5 / D32: reported beside, outside the rule
FIXTURES = list(DG.FIXTURES)
VARIANTS = collections.OrderedDict([     # name -> (raster step m, spur m, merge m)
    ('base', (DG.RES, DG.SPUR, DG.MERGE)),
    ('step025', (0.25, DG.SPUR, DG.MERGE)),
    ('spur6', (DG.RES, 6.0, DG.MERGE)),
    ('spur10', (DG.RES, 10.0, DG.MERGE)),
])
# T-V12-3's tolerance: 0.5 % relative or one unit of the last printed digit, whichever is larger (V12 section 3.4.2's
# metric list); the printed unit is E09 section 5's (three decimals for the share, two for the per-km and per-ha
# counts, one for the footprints per block)
TOL_REL = 0.005
TOL_UNIT = {'sgd.tShare': 0.001, 'sgd.deadEnds': 0.01, 'blockc.perHa': 0.01, 'blockc.lotsPer': 0.1}
FAMILY_AT_SIZE = {40: 'capture/MFCG/40/plain', 80: 'capture/MFCG/80/plain', 130: 'capture/MFCG/130/plain'}
# the keys on which the base variant must equal E09's stored fixture record (E09 keeps clusterTwin, which the
# vector-free measurement here does not form; the court rows are stripped on both sides)
EQUAL_KEYS = ['stem', 'buildings', 'enclosureHa', 'medianFootprint', 'clusters', 'blockc.perHa', 'blockc.lotsPer',
              'waterTakenOut', 'blockAreas', 'streetSpace', 'raster', 'graphRaw', 'topology', 'graphParts', 'crossings',
              'sgd.tShare', 'sgd.deadEnds', 'graph', 'block.courtShare', 'measureInputSha256', 'header']


def sha(path):
    with open(path, 'rb') as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def q7(xs, p):
    return DG.q7(xs, p)


# ---------------------------------------------------------------- the E09 inputs
def load_e09():
    e = json.load(open(E09), object_pairs_hook=collections.OrderedDict)
    s = json.load(open(E09S), object_pairs_hook=collections.OrderedDict)
    return e, s


def sample_of(e09):
    """family -> {rung, size, options, purpose, usable, failedStems, failed}"""
    out = collections.OrderedDict()
    for f in e09['sample']:
        out[f['family']] = f
    return out


# ---------------------------------------------------------------- the CV, recomputed from the per-seed file
def recompute_cv(e09, seeds):
    sample = sample_of(e09)
    per = seeds['perSeed']
    out = collections.OrderedDict()
    for lab, fam in sample.items():
        stored = e09['summaries'][lab]['summary']
        row = collections.OrderedDict()
        for m in METRICS + [COMPANION]:
            vals = [(st, (per[st].get(m) or {}).get('value')) for st in fam['usable']]
            xs = [v for _, v in vals if v is not None]
            cv = DG.cv_of(xs)
            st_cv = stored[m]['cv']
            row[m] = collections.OrderedDict([
                ('n', len(xs)), ('usable', len(fam['usable'])),
                ('values', collections.OrderedDict((st, v) for st, v in vals)),
                ('recomputed', cv), ('stored', st_cv),
                ('equal', cv == st_cv and cv is not None and cv['n'] == len(fam['usable'])),
            ])
        out[lab] = collections.OrderedDict([('family', lab), ('rung', fam['rung']), ('size', fam['size']),
                                            ('options', fam['options']), ('purpose', fam['purpose']),
                                            ('n', len(fam['usable'])), ('metrics', row)])
    return out


# ---------------------------------------------------------------- the rule
def apply_rule(cvs):
    """one row per D11 metric x family: the status by the pre-decided rule on the sample CV, the companions beside"""
    rows = []
    for lab, fam in cvs.items():
        plain = fam['options'] == 'plain' and fam['purpose'] == 'rows'
        for m in METRICS:
            c = fam['metrics'][m]['recomputed']
            cv, cvp = c['cv'], c['cvPop']
            fires = cv > CV_LIMIT
            if plain:
                status = 'descriptive' if fires else 'target'
                reason = (f"seed-to-seed CV {cv:.4f} {'>' if fires else '<='} {CV_LIMIT} over {c['n']} usable seeds "
                          f"(sample SD / mean, E09 D13): the pre-decided rule "
                          f"{'fires: descriptive by the <M-1> rule in C-0116 form' if fires else 'does not fire: the row stays target'}")
            else:
                status = 'descriptive (by the plan)'
                reason = (f"the stress family is descriptive by the plan whatever its CV (plan section 3, R-23); its CV "
                          f"{cv:.4f} over {c['n']} seeds is reported, not ruled (the rule would "
                          f"{'fire' if fires else 'not fire'} on it)")
            rows.append(collections.OrderedDict([
                ('metric', m), ('family', lab), ('rung', fam['rung']), ('size', fam['size']), ('n', c['n']),
                ('mean', c['mean']), ('sd', c['sd']), ('cv', cv), ('cvPop', cvp),
                ('status', status), ('ruled', plain), ('fires', fires), ('firesPop', cvp > CV_LIMIT),
                ('reason', reason)]))
    # companion readings: none of them may change a ruled verdict
    ruled = [r for r in rows if r['ruled']]
    anyfam = collections.OrderedDict()
    for m in METRICS:
        mx = max(r['cv'] for r in ruled if r['metric'] == m)
        anyfam[m] = {'maxCv': mx, 'fires': mx > CV_LIMIT}
    comp = collections.OrderedDict()
    for lab, fam in cvs.items():
        c = fam['metrics'][COMPANION]['recomputed']
        comp[lab] = {'cv': c['cv'], 'cvPop': c['cvPop'], 'n': c['n'], 'fires': c['cv'] > CV_LIMIT}
    disagree = [f"{r['metric']}/{r['rung']}" for r in ruled if r['fires'] != r['firesPop']]
    companions = collections.OrderedDict([
        ('populationCv', {'reading': 'the population SD / mean (n, not n - 1)', 'verdictsDiffer': disagree}),
        ('anyFamily', {'reading': 'a metric is descriptive at every rung when any plain family exceeds the limit',
                       'perMetric': anyfam, 'verdictsDiffer': [m for m, v in anyfam.items() if v['fires']]}),
        ('courtShare', {'reading': f'{COMPANION} (D5 / D32, a target per class; not a D11 metric) read under the same rule',
                        'perFamily': comp,
                        'wouldFire': [lab for lab, v in comp.items() if v['fires'] and cvs[lab]['options'] == 'plain']}),
    ])
    return rows, companions


# ---------------------------------------------------------------- the sensitivity runs (cached per map)
def cache_path(cache, variant, stem):
    return os.path.join(cache, f'{variant}.{stem}.json')


def measure(variant, stem, cache, log):
    res, spur, merge = VARIANTS[variant]
    p = cache_path(cache, variant, stem)
    dg_sha = DG.module_sha('derived_graph.py')
    if os.path.exists(p):
        c = json.load(open(p), object_pairs_hook=collections.OrderedDict)
        if c.get('derivedGraphSha256') == dg_sha and c.get('parameters') == {'rasterStepM': res, 'spurM': spur, 'mergeM': merge}:
            log(f'cached  {variant} {stem}')
            return c['record']
    log(f'measure {variant} {stem} (step {res} m, spur {spur} m, merge {merge} m)')
    out = DG.measure_seed(stem, res, spur, merge, with_vector=False)
    rec = DG.strip_rows(out)
    os.makedirs(cache, exist_ok=True)
    DG.write_json(p, collections.OrderedDict([
        ('schema', 'm1.e14.cache/1'), ('variant', variant), ('stem', stem),
        ('parameters', {'rasterStepM': res, 'spurM': spur, 'mergeM': merge}),
        ('derivedGraphSha256', dg_sha), ('record', rec)]))
    log(f'done    {variant} {stem}: tShare {rec["sgd.tShare"]["value"]} deadEnds {rec["sgd.deadEnds"]["value"]} '
        f'perHa {rec["blockc.perHa"]["value"]} lotsPer {rec["blockc.lotsPer"]["value"]} faces {rec["graph"]["faces"]} '
        f'km {rec["graph"]["lengthKm"]} crossings {rec["crossings"]}')
    return rec


def measure_variants(names, cache, log):
    out = collections.OrderedDict()
    for v in names:
        out[v] = collections.OrderedDict((st, measure(v, st, cache, log)) for st in FIXTURES)
    return out


# ---------------------------------------------------------------- the sensitivity table
def value_of(rec, m):
    return rec[m]['value']


def sensitivity(variants, cvs):
    base = variants['base']
    table = collections.OrderedDict()
    summary = collections.OrderedDict()
    for v in VARIANTS:
        if v == 'base':
            continue
        res, spur, merge = VARIANTS[v]
        per = collections.OrderedDict()
        for st in FIXTURES:
            b, o = base[st], variants[v][st]
            row = collections.OrderedDict()
            for m in METRICS:
                x0, x1 = value_of(b, m), value_of(o, m)
                d = x1 - x0
                rel = d / x0 if x0 else None
                row[m] = collections.OrderedDict([('base', x0), ('value', x1), ('abs', d), ('rel', rel)])
            row['graph'] = collections.OrderedDict([
                ('base', {k: b['graph'][k] for k in ('nodes', 'edges', 'faces', 'lengthKm')}),
                ('value', {k: o['graph'][k] for k in ('nodes', 'edges', 'faces', 'lengthKm')}),
                ('degree1', [b['sgd.deadEnds']['degree1'], o['sgd.deadEnds']['degree1']]),
                ('degree3', [b['sgd.tShare']['degree3'], o['sgd.tShare']['degree3']]),
                ('tNodes', [b['sgd.tShare']['tNodes'], o['sgd.tShare']['tNodes']]),
                ('thinningPasses', [b['raster']['thinningPasses'], o['raster']['thinningPasses']]),
                ('rasterCells', [b['raster']['width'] * b['raster']['height'], o['raster']['width'] * o['raster']['height']]),
                ('courtShare', [b[COMPANION]['value'], o[COMPANION]['value']])])
            per[st] = row
        table[v] = collections.OrderedDict([('parameters', {'rasterStepM': res, 'spurM': spur, 'mergeM': merge}),
                                            ('perFixture', per)])
        sm = collections.OrderedDict()
        for m in METRICS:
            rels = [per[st][m]['rel'] for st in FIXTURES if per[st][m]['rel'] is not None]
            abss = [per[st][m]['abs'] for st in FIXTURES]
            arel = [abs(r) for r in rels]
            aabs = [abs(a) for a in abss]
            # T-V12-3's tolerance per fixture: max(0.5 % of the base, one printed unit)
            within = []
            sd_units = []
            for st in FIXTURES:
                x0 = per[st][m]['base']
                tol = max(TOL_REL * abs(x0), TOL_UNIT[m])
                within.append(abs(per[st][m]['abs']) <= tol)
                fam = FAMILY_AT_SIZE[base[st]['header']['size']]
                sd = cvs[fam]['metrics'][m]['recomputed']['sd']
                sd_units.append(abs(per[st][m]['abs']) / sd if sd else None)
            sm[m] = collections.OrderedDict([
                ('maxAbsRel', max(arel) if arel else None), ('medianAbsRel', q7(arel, .5) if arel else None),
                ('maxAbs', max(aabs)), ('signedRel', rels),
                ('withinT3Tolerance', sum(within)), ('fixtures', len(FIXTURES)),
                ('maxSdUnits', max(u for u in sd_units if u is not None) if any(u is not None for u in sd_units) else None),
                ('invariant', all(a == 0 for a in abss))])
        summary[v] = sm
    return table, summary


# ---------------------------------------------------------------- the checks
def checks_for(cvs, rows, companions, variants, e09, sample):
    C = []

    def add(cid, check, ok, receipt):
        C.append({'id': cid, 'check': check, 'passed': bool(ok), 'receipt': receipt})
    # C1 the row's checker
    bad = [(lab, m) for lab, fam in cvs.items() for m in METRICS if not fam['metrics'][m]['equal']]
    tot = len(cvs) * len(METRICS)
    add('C1', "the row's checker: the seed-to-seed CV of sgd.* and blockc.* per family, recomputed from E09's per-seed "
        "file over the usable seeds, equals E09's stored summary exactly (n, mean, sd, cv, sdPop, cvPop), n = the usable seeds",
        not bad, f"{tot - len(bad)} of {tot} CVs equal" + (f"; differ {bad}" if bad else ''))
    # C2 the rule
    bad = []
    for r in rows:
        want = ('descriptive' if r['cv'] > CV_LIMIT else 'target') if r['ruled'] else 'descriptive (by the plan)'
        if r['status'] != want or r['fires'] != (r['cv'] > CV_LIMIT):
            bad.append(f"{r['metric']}/{r['rung']}")
    comp_bad = (companions['populationCv']['verdictsDiffer'] + companions['anyFamily']['verdictsDiffer']
                + companions['courtShare']['wouldFire'])
    nd = sum(1 for r in rows if r['ruled'] and r['status'] == 'descriptive')
    nr = sum(1 for r in rows if r['ruled'])
    add('C2', f"every row's status follows from its sample CV by the pre-decided rule (CV > {CV_LIMIT} -> descriptive), "
        "and no companion reading (population CV, any-family, block.courtShare) changes a ruled verdict",
        not bad and not comp_bad,
        f"{nr} ruled rows ({nd} descriptive, {nr - nd} target); {len(rows) - nr} stress rows descriptive by the plan"
        + (f"; inconsistent {bad}" if bad else '') + (f"; a companion would change {comp_bad}" if comp_bad else ''))
    # C3 the base equals E09's fixtures
    bad = []
    for st in FIXTURES:
        a = variants['base'].get(st) or {}
        b = DG.strip_rows(e09['fixtures'][st])
        for k in EQUAL_KEYS:
            if a.get(k) != b.get(k):
                bad.append((st, k))
    add('C3', "the base variant (step 0.5 m, spur 8 m, merge 2 m) equals E09's stored fixture records field for field "
        f"on {len(EQUAL_KEYS)} keys (the same code at the same parameters: a determinism receipt)",
        not bad, f"{len(FIXTURES) - len(set(s for s, _ in bad))} of {len(FIXTURES)} fixtures equal" + (f"; differ {bad}" if bad else ''))
    # C4 blockc.* invariant
    bad = []
    for v in VARIANTS:
        for st in FIXTURES:
            for m in ('blockc.perHa', 'blockc.lotsPer'):
                if variants[v].get(st, {}).get(m) != variants['base'].get(st, {}).get(m):
                    bad.append((v, st, m))
    add('C4', 'blockc.perHa and blockc.lotsPer are identical under every variant (the block count and the footprints per '
        'block come from the union-find and the centroid test, not from the raster, so their sensitivity is exactly 0)',
        not bad, f"{len(VARIANTS) * len(FIXTURES) * 2 - len(bad)} of {len(VARIANTS) * len(FIXTURES) * 2} values equal"
        + (f"; differ {bad}" if bad else ''))
    # C5 planarity and the face count on every variant
    bad = []
    n = 0
    for v in VARIANTS:
        res, spur, merge = VARIANTS[v]
        for st in FIXTURES:
            o = variants[v].get(st)
            if o is None:
                continue
            n += 1
            t = o['topology']
            ok = (o['crossings'] == 0 and t['facesRaw'] == t['holesStreetSpace'] == t['facesPruned']
                  and t['facesMerged'] == t['facesPruned'] - t['mergeCollapsedFaces']
                  and t['mergeInternalLongestM'] <= 2 * merge and t['chainAnomalies'] == 0
                  and t['eulerSkeleton'] == t['eulerStreetSpace'] == t['eulerGraphRaw'])
            if not ok:
                bad.append((v, st))
    add('C5', "every variant's derived graph on every fixture is planar (0 proper crossings) and keeps E09's face-count "
        "identity at every stage (Euler numbers equal; raw faces = street-space holes = pruned faces; merged faces = "
        "pruned less the collapsed; internal edges <= 2 x merge; 0 chain anomalies)",
        not bad and n == len(VARIANTS) * len(FIXTURES),
        f"{n - len(bad)} of {n} variant-fixture graphs hold" + (f"; fail {bad}" if bad else ''))
    # C6 the sample
    bad = []
    for lab, fam in sample.items():
        if any(st in fam['failedStems'] for st in fam['usable']):
            bad.append((lab, 'a failed seed among the usable'))
        if fam['options'] == 'plain' and len(fam['usable']) != 10:
            bad.append((lab, f"usable {len(fam['usable'])}"))
        if cvs[lab]['n'] != len(fam['usable']):
            bad.append((lab, 'n'))
    fl = '; '.join(f"{x['label']} {x['reason']}" for fam in sample.values() for x in fam['failed'])
    add('C6', "the sample read from E09 is the plan's: 10 usable seeds per plain family, the stress family's 3, no failed "
        "seed among them, the failed indices listed",
        not bad, ' / '.join(str(len(f['usable'])) for f in sample.values()) + f" usable; failed: {fl}"
        + (f"; wrong {bad}" if bad else ''))
    # C7 completeness
    missing = [(v, st) for v in VARIANTS for st in FIXTURES if st not in variants.get(v, {})]
    wrong = []
    for v, (res, spur, merge) in VARIANTS.items():
        for st, o in variants.get(v, {}).items():
            if o['raster']['stepM'] != res:
                wrong.append((v, st, 'step'))
    add('C7', f"the sensitivity table is complete: {len(VARIANTS)} variants x {len(FIXTURES)} fixtures, each record at "
        "its declared raster step (the spur and merge thresholds are the call's; --verify re-forms the record byte for "
        "byte from the stored measurements)",
        not missing and not wrong, f"{len(VARIANTS) * len(FIXTURES) - len(missing)} of {len(VARIANTS) * len(FIXTURES)} records"
        + (f"; missing {missing}" if missing else '') + (f"; wrong {wrong}" if wrong else ''))
    return C


# ---------------------------------------------------------------- the record
def proxy_note(summary, rows):
    """the sentence for M0-c-07a's note (R-22; notes section 4: say 'proxy')"""
    parts = []
    for v, sm in summary.items():
        res, spur, merge = VARIANTS[v]
        lab = f"step {res} m" if res != DG.RES else f"spur {spur:g} m"
        parts.append(f"{lab}: " + ', '.join(
            f"{m} {'invariant' if sm[m]['invariant'] else 'largest change ' + format(100 * sm[m]['maxAbsRel'], '.1f') + ' % (median ' + format(100 * sm[m]['medianAbsRel'], '.1f') + ' %), within T-V12-3 tolerance on ' + str(sm[m]['withinT3Tolerance']) + ' of ' + str(sm[m]['fixtures']) + ' fixtures'}"
            for m in METRICS))
    return ('PROXY, not the raster-against-skeleton bias (no product skeleton exists research-side; T-V12-3 at M1 '
            'decides, R-22): on the five 2026-09-25 fixtures, against the declared twin (step 0.5 m, spur 8 m, merge 2 m), '
            + '; '.join(parts) + '.')


def build(cvs_src, variants, red=False):
    e09, seeds = cvs_src
    sample = sample_of(e09)
    cvs = recompute_cv(e09, seeds)
    rows, companions = apply_rule(cvs)
    table, summary = sensitivity(variants, cvs)
    if red:
        e09, seeds, sample, cvs, rows, companions, variants = red_variant(e09, seeds, sample, cvs, rows, companions, variants)
    checks = checks_for(cvs, rows, companions, variants, e09, sample)
    head = collections.OrderedDict([
        ('record', RECORD), ('workItem', 'W-14'), ('lane', 'm1/W-14'), ('spike', 'S-V12-2'),
        ('script', SCRIPT), ('scriptSha256', sha(os.path.join(HERE, 'spike_derived_graph.py'))[:12]),
        ('uses', {'derived_graph.py': DG.module_sha('derived_graph.py'),
                  'measure_ftg.py': DG.module_sha('measure_ftg.py'), 'measure_ng.py': DG.module_sha('measure_ng.py'),
                  'measure_mfcg.py': DG.module_sha('measure_mfcg.py')}),
        ('python', platform.python_version()),
        ('inputs', {'E09-mfcg-derived-graph.json': sha(E09)[:12], 'E09-mfcg-derived-graph.seeds.json': sha(E09S)[:12],
                    'e09ScriptSha256': e09['scriptSha256'], 'e09Plan': e09['plan']}),
        ('metricVersion', DG.VERSION), ('referenceBuild', DG.REFERENCE_BUILD),
        ('rule', {'spike': 'S-V12-2 (V12 section 8.3 (2); plan section 8 (3); the W-14 row)',
                  'text': f'a metric whose seed-to-seed CV exceeds {CV_LIMIT} becomes descriptive by the <M-1> rule '
                          '(a descriptive row in C-0116 form, an E19 entry); applied per row (metric x plain family) on '
                          'the sample CV (sample SD / mean, E09 D13)',
                  'limit': CV_LIMIT, 'metrics': METRICS, 'companion': COMPANION,
                  'values': 'measured values and verdicts, not rows (R-47 (a)): W-15 forms the rows'}),
        ('parameters', collections.OrderedDict((v, {'rasterStepM': p[0], 'spurM': p[1], 'mergeM': p[2]}) for v, p in VARIANTS.items())),
        ('tolerance', {'rel': TOL_REL, 'unit': TOL_UNIT, 'text': 'T-V12-3: 0.5 % relative or one unit of the last printed digit (E09 section 5), whichever is larger'}),
        ('fixtures', FIXTURES),
    ])
    rec = collections.OrderedDict(head)
    rec['schema'] = 'm1.e14/1'
    rec['sample'] = [{k: v for k, v in f.items()} for f in sample.values()]
    rec['cv'] = cvs
    rec['verdicts'] = rows
    rec['companions'] = companions
    rec['sensitivity'] = collections.OrderedDict([('summary', summary), ('table', table)])
    rec['proxyNote'] = proxy_note(summary, rows)
    rec['variants'] = variants
    rec['checks'] = checks
    rec['checksFailed'] = sum(1 for c in checks if not c['passed'])
    return rec


def red_variant(e09, seeds, sample, cvs, rows, companions, variants):
    """one planted fault per check; the inputs are copied, nothing is written"""
    e09, seeds, sample = copy.deepcopy(e09), copy.deepcopy(seeds), copy.deepcopy(sample)
    cvs, rows, companions, variants = copy.deepcopy(cvs), copy.deepcopy(rows), copy.deepcopy(companions), copy.deepcopy(variants)
    # C1: one per-seed value moved by 1e-6 -> recompute from the moved file
    lab0 = next(iter(sample))
    st0 = sample[lab0]['usable'][0]
    seeds['perSeed'][st0]['sgd.tShare']['value'] += 1e-6
    cvs = recompute_cv(e09, seeds)
    # C2: one ruled row's status flipped
    r = next(r for r in rows if r['ruled'])
    r['status'] = 'descriptive' if r['status'] == 'target' else 'target'
    # C3: the base's sgd.deadEnds on one fixture moved
    variants['base'][FIXTURES[0]]['sgd.deadEnds']['value'] += 0.01
    # C4: blockc.perHa changed under one variant
    variants['spur6'][FIXTURES[1]]['blockc.perHa']['value'] += 0.01
    # C5: a crossing planted
    variants['step025'][FIXTURES[2]]['crossings'] = 1
    # C6: a failed seed added to a family's usable list
    labf = next(lb for lb, f in sample.items() if f['failedStems'])
    sample[labf]['usable'].append(sample[labf]['failedStems'][0])
    # C7: one variant's fixture record dropped
    del variants['spur10'][FIXTURES[4]]
    return e09, seeds, sample, cvs, rows, companions, variants


def text_of(rec):
    return json.dumps(rec, indent=1, sort_keys=False) + '\n'


def main():
    args = sys.argv[1:]

    def opt(name, default=None):
        return args[args.index(name) + 1] if name in args else default
    known = {'--json', '--cache', '--verify', '--red', '--measure'}
    for a in args:
        if a.startswith('--') and a not in known:
            print(f'unknown option {a}', file=sys.stderr)
            return 2
    red = '--red' in args
    verify = opt('--verify')
    cache = opt('--cache')
    out = opt('--json', OUT)

    def log(msg):
        print(msg, flush=True)
    if opt('--measure'):
        if not cache:
            print('--measure needs --cache DIR', file=sys.stderr)
            return 2
        names = opt('--measure').split(',')
        for v in names:
            if v not in VARIANTS:
                print(f'unknown variant {v}; known {list(VARIANTS)}', file=sys.stderr)
                return 2
        measure_variants(names, cache, log)
        log('MEASURED ' + ','.join(names))
        return 0
    e09, seeds = load_e09()
    if verify:
        stored = json.load(open(verify), object_pairs_hook=collections.OrderedDict)
        variants = stored['variants']
    else:
        if not cache:
            print('a record run needs --cache DIR (the lane scratch directory)', file=sys.stderr)
            return 2
        variants = measure_variants(list(VARIANTS), cache, log)
    rec = build((e09, seeds), variants, red=red)
    for c in rec['checks']:
        log(('PASS ' if c['passed'] else 'FAIL ') + c['id'] + ': ' + c['receipt'])
    log('ALL PASS' if not rec['checksFailed'] else f"{rec['checksFailed']} FAIL")
    if verify:
        mine = text_of(rec)
        theirs = open(verify).read()
        same = mine == theirs
        log(f"VERIFY {'byte-identical' if same else 'DIFFERS'}: sha256 {hashlib.sha256(mine.encode()).hexdigest()[:8]} "
            f"(recomputed) vs {hashlib.sha256(theirs.encode()).hexdigest()[:8]} (stored)")
        return 0 if same and not rec['checksFailed'] else 1
    if red:
        return 0 if rec['checksFailed'] else 1
    tmp = out + '.tmp'
    with open(tmp, 'w') as fh:
        fh.write(text_of(rec))
    os.replace(tmp, out)
    log(f'wrote {out} (sha256 {sha(out)[:8]})')
    return 0 if not rec['checksFailed'] else 1


if __name__ == '__main__':
    sys.exit(main())
