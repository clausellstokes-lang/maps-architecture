#!/usr/bin/env python3
"""rows.py — forms M-1's `baselines.json` rows from the measuring items' records (V12 section 3.2.4; plan item W-15).

Lane m1/W-15 is the sole writer of rows.py, bands.py and cross_check.py (M-1-rulings-2.md R-47 (a)). Our own code,
standard library only. It reads the E records' JSON (the measured values W-05b, W-06, W-07b, W-08, W-09, W-10b, W-11b,
W-14 and W-22 wrote), `plan.json` and `metrics.m-1.json`; it never opens a capture, a capture bundle or `plat/`.

Each row carries section 13.5's provenance (`referenceBuild`, `capture`, `script`, `date`), the `sample` block, the
role, the estimator and, for a distribution, `spreadKS`; **no row carries an absFloor or a sign field** (N-05: the floor
stays in metrics.m-1.json). Numbers are rounded to four decimals, so no number holds six consecutive digits where the
unit allows it (R-46, N-03). Ids end in /<subset> or /<subset>/<field> (N-25).

Round 3 (lane m1/round3-apply, M-1-rulings-3.md; record E15 section 13) continues W-15 with these tools: the rows of
the registry id water.channelWidth (E15 F2; the measuring records keep the key their tools wrote) and R-51's eight MFCG
draw rows (the recorded draw family capture/MFCG/draw/recorded; draw.widthPx on capture/MFCG/40/plain) are APPENDED
after the 478 rows of the first candidate, in a fixed order; R-50's stability marker joins the note of every target row
S-V12-1 flags (the 49 of E13 and fg.recoverability at size 130 from W-13's addendum; FTG's type 7 band-rule rows by the
same test on their own stream, R-50 (4)), with the intervals in E15's bands[id].stability.

Run (project root):
  python3 research/baselines/rows.py --write     # the candidate, E15's JSON
  python3 research/baselines/rows.py --check     # recompute in memory; the written files must be byte-equal
  python3 research/baselines/rows.py --red       # five planted input faults, each caught by its receipt
"""
import gzip
import hashlib
import json
import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
CAL = os.path.join(ROOT, 'docs', 'calibration')
sys.path.insert(0, HERE)
import bands as B  # noqa: E402

DATE = '2026-10-04'
PROVENANCE = 'M-1 2026-10-04'
CANDIDATE = os.path.join(HERE, 'candidates', 'baselines.json')
E15_JSON = os.path.join(CAL, 'E15-baselines.json')

INPUTS = {
    'plan': 'research/baselines/plan.json',
    'registry': 'research/baselines/metrics.m-1.json',
    'e05': 'docs/calibration/E05-ftg-metrics.slots.json',
    'e06': 'docs/calibration/E06-ftg-faces.json',
    'e07': 'docs/calibration/E07-mfcg-signature.plan.json',
    'e07fix': 'docs/calibration/E07-mfcg-signature.json',
    'e07widths': 'docs/calibration/E07-mfcg-signature.widths.json',
    'e08': 'docs/calibration/E08-mfcg-renders.json',
    'e09': 'docs/calibration/E09-mfcg-derived-graph.json',
    'e09seeds': 'docs/calibration/E09-mfcg-derived-graph.seeds.json',
    'e09vec': 'docs/calibration/E09-mfcg-derived-graph.vectors.json',
    'e10': 'docs/calibration/E10-ng-bentcut-faces.plan.json',
    'e11': 'docs/calibration/E11-ng-rows.plan.json',
    'e13': 'docs/calibration/E13-spike-bootstrap.json',
    'e14': 'docs/calibration/E14-spike-derived-graph.json',
    'e20': 'docs/calibration/E20-ng-draw-census.json',
}

SCRIPT = {
    'FTG': 'research:baselines/measure_ftg_slots.py',
    'FTGfaces': 'research:baselines/measure_ftg_faces.py',
    'MFCG': 'research:baselines/measure_mfcg.py',
    'MFCGrender': 'research:baselines/measure_mfcg_render.py',
    'MFCGgraph': 'research:baselines/derived_graph.py',
    'NG': 'research:baselines/measure_ng.py',
    'NGcut': 'research:baselines/ng_faces_by_class.py',
    'NGdraw': 'research:baselines/ng_draw_census.py',
    'dispersion': 'research:baselines/bands.py',
}
CAPTURE_ROOT = {
    'MFCGdraw': 'research:captures/mfcg',
    'FTG': 'research:captures/ftg',
    'MFCG': 'research:captures/mfcg/exports-sweep-m1-2026-10-03',
    'NG': 'research:captures/neighbourhood/ng-programme-m1-2026-10-03',
}
BUILD = {'MFCG': 'itch:12710731', 'NG': 'itch:11441280'}
DECLARED_NOTE = 'declared 0.35 m per model unit (own)'

FTG_SIZES = [('BIG_TOWN', 'TOWN', 5600), ('BIG_CITY', 'CITY', 24500), ('METROPOLIS', 'METROPOLIS', 49500)]
FTG_CITY = ('CITY', 'TOWN', 9500)
MFCG_FAMS = [('capture/MFCG/40/plain', 'TOWN', 40, 'size40-plain-'), ('capture/MFCG/80/plain', 'CITY', 80, 'size80-plain-'),
             ('capture/MFCG/130/plain', 'METROPOLIS', 130, 'size130-plain-')]
MFCG_STRESS = ('capture/MFCG/80/river+coast', 'CITY', 80, 'size80-rivercoast-')
NG_TEMPLATES = ['area', 'street', 'square', 'ring']
NG_SIZES = ['medium', 'small', 'large']
NG_CLASS = {'holed': 'holed', 'c_shaped': 'cShaped', 'triangular': 'triangular', 'curved': 'curved',
            'round_joined': 'roundJoined'}


# ---------------------------------------------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------------------------------------------

def rnd(x):
    """four decimals (R-46's digit rule); integers stay integers; -0.0 reads 0"""
    if x is None or isinstance(x, bool) or isinstance(x, int):
        return x
    y = round(float(x), 4)
    return 0.0 if y == 0 else y


def sha_file(rel):
    with open(os.path.join(ROOT, rel), 'rb') as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def load(rel):
    with open(os.path.join(ROOT, rel)) as fh:
        return json.load(fh)


def canon(o):
    return json.dumps(o, indent=1, ensure_ascii=False) + '\n'


class Ctx:
    def __init__(self):
        self.src = {k: load(v) for k, v in INPUTS.items()}
        self.inputs = {k: {'path': v, 'sha256': sha_file(v)} for k, v in INPUTS.items()}
        reg = self.src['registry']
        self.reg = {m['id']: m for m in reg['metrics']}
        self.metricsVersion = reg['metricsVersion']
        plan = self.src['plan']
        self.ftg_slots = plan['ftg']['slots']
        self.ftg_rec = plan['ftg']['recordedCity']
        self.families = {f['family']: f for f in plan['families']}
        self.rows = []
        self.bands = []
        self.held = []
        self.heldRows = []
        self.appended = []      # round 3: rows of the metrics formerly held, appended after the first candidate's
        self.vals = {}          # FTG scalar rows: the per-slot values and their members (R-50 (4)'s draws)
        self.round3 = {}
        self.drops = self._drops()
        self.noRow = []
        self.receipts = []

    def _drops(self):
        """V12 section 3.2.2: per capture label, the degenerate drops its adapter counted (merges are not drops)"""
        out = {}
        for stem, p in self.src['e07']['perSeed'].items():
            c = p['research']['census']
            n = c.get('droppedPolygons', 0) + c.get('droppedLines', 0) + c.get('spikesDropped', 0)
            fam = next((f for f, f7 in self.src['e07']['families'].items() if stem in f7['captured']), None)
            if fam and n:
                out[f"{fam}/{stem.rsplit('-', 1)[1]}"] = n
        for p in self.src['e05']['perSlot']:
            n = sum(v for k, v in (p.get('droppedDegenerate') or {}).items() if k != 'mergedVertices')
            if n:
                out[p['label']] = n
        idx = load('research/baselines/inputs/NG/itch-11441280/plan-seeds/index.json')
        self.inputs['ngIndex'] = {'path': 'research/baselines/inputs/NG/itch-11441280/plan-seeds/index.json',
                                  'sha256': sha_file('research/baselines/inputs/NG/itch-11441280/plan-seeds/index.json')}
        for e in idx['maps']:
            d = e['census'].get('dropped') or {}
            n = d.get('zeroAreaPolygons', 0) + d.get('zeroLengthWaySegments', 0)
            if n:
                out[e['label']] = n
        return out

    # the registry
    def unit(self, metric):
        m = self.reg[metric]
        return m.get('unit') or (m.get('output') or {}).get('unit')

    def scale(self, metric):
        return self.reg[metric]['scale']

    def sign(self, metric):
        return self.reg[metric].get('sign', 'positive')

    def floor(self, metric):
        return self.reg[metric].get('absFloor')


NOTE_CHARS = set('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,;:()-/%±≤≥×')


def note_ok(s):
    """C3: at most 200 characters of letters, digits, spaces and .,;:()-/%±≤≥× (fail loudly, never truncate)"""
    bad = sorted(set(ch for ch in s if ch not in NOTE_CHARS))
    if len(s) > 200 or bad:
        raise ValueError(f'note fails C3 ({len(s)} characters; {bad}): {s}')
    return s


# ---------------------------------------------------------------------------------------------------------------
# the row and its band
# ---------------------------------------------------------------------------------------------------------------

def scalar_values(est, n_seeds, p50=None):
    if est is None:
        return {'n': 0, 'seeds': n_seeds}, 'single'
    c = est['c'] if p50 is None else p50
    return ({'p10': rnd(est['a']), 'p50': rnd(c), 'p90': rnd(est['b']), 'n': est['n'], 'seeds': n_seeds},
            est['estimator'])


def add_row(ctx, *, rid, metric, reference, build, capture, script, matched, role, values, estimator, sample,
            note=None, spread=None, kind, band=None, extra=None):
    row = {'id': rid, 'metric': metric, 'unit': ctx.unit(metric), 'reference': reference, 'referenceBuild': build,
           'capture': capture, 'script': script, 'date': DATE}
    if matched:
        row['matched'] = matched
    row['role'] = role
    row['values'] = values
    row['metricVersion'] = ctx.reg[metric]['version']
    row['sample'] = sample
    row['estimator'] = estimator
    if spread is not None:
        row['spreadKS'] = {'p90': rnd(spread['p90']), 'pairs': spread['pairs']}
    row['scale'] = ctx.scale(metric)
    # drops count where the row reads the cleaned MeasureInput (V12 3.2.2); the draw census reads draw records
    dropped = drops_of(ctx, sample) if values.get('n') and not metric.startswith('draw.') else 0
    if dropped:
        note = (note + '; ' if note else '') + f'dropped: {dropped}'
    if note:
        row['note'] = note_ok(note)
    if metric in HELD_METRICS:
        ctx.heldRows.append({'row': row, 'reason': HELD_METRICS[metric]})
    elif metric in APPENDED_R3 and reference == 'MFCG' or metric == 'water.channelWidth':
        ctx.appended.append(row)
    else:
        ctx.rows.append(row)
    b = {'id': rid, 'metric': metric, 'reference': reference, 'role': role, 'kind': kind, 'provenance': PROVENANCE}
    if band:
        b.update(band)
    if extra:
        b.update(extra)
    ctx.bands.append(b)
    return row


HELD_METRICS = {}      # none since round 3: the channel-width rows and D28's rows are formed and appended (E15 section 13)
# Round 3 (lane m1/round3-apply): the metrics whose rows were held at W-15's landing; their rows follow the first
# candidate's 478 in the order formed (FTG channel width by size, MFCG's stress channel width, the four recorded draw
# rows, the four draw.widthPx fields), so the earlier rows keep their places (only R-50's notes change among them).
APPENDED_R3 = {'water.channelWidth', 'draw.casingLaw', 'draw.roundJoins', 'draw.roundCaps', 'draw.widthPx',
               'draw.wallsAfterBuildings'}
# The measuring records keep the key their tools wrote before the registry rename (E05 and E07 are W-05b's and
# W-07b's, unchanged); the row carries the registry id (E15 F2; design/m1-corrections-2; m1/round3-apply).
SOURCE_KEY = {'water.channelWidth': 'water.riverWidth'}


def _r(fb):
    return None if fb is None else dict(fb, lo=rnd(fb['lo']), hi=rnd(fb['hi']))


def sample_labels(ctx, sample):
    """the plan labels of a sample's members that are not in failed"""
    failed = {f['index'] for f in sample.get('failed') or []}
    if 'captures' in sample:
        return [c for i, c in enumerate(sample['captures']) if i not in failed]
    lo, hi = sample.get('indices') or [0, 0]
    return [f"{sample['family']}/{i}" for i in range(lo, hi) if i not in failed]


def drops_of(ctx, sample):
    return sum(ctx.drops.get(lab, 0) for lab in sample_labels(ctx, sample))


def scalar_band_entry(ctx, metric, field, kind, values, reference_value=None):
    """the band E15 prints for a scalar row, by its kind"""
    if values.get('n', 0) == 0 or 'p50' not in values:
        return {'band': None}
    a, b, c = values['p10'], values['p90'], values['p50']
    if kind == 'band rule' or kind == 'floor':
        fspec = ctx.floor(metric)
        bb = B.scalar_band(a, b, c, ctx.sign(metric), fspec)
        out = {'band': {'lo': rnd(bb['lo']), 'hi': rnd(bb['hi']), 'loTerm': bb['loTerm'], 'hiTerm': bb['hiTerm'],
                        'floor': rnd(bb['floor'])}}
        if kind == 'floor':
            out['band']['rule'] = 'ours >= the larger reference dispersion at the matched rung (a floor)'
        return out
    if kind == 'fixed':
        fb = B.fixed_band(metric, field, c)
        if fb:
            fb = dict(fb, lo=rnd(fb['lo']), hi=rnd(fb['hi']))
        return {'band': fb}
    if kind == 'declared exception':
        de = B.declared_exception(metric, c)
        bb = B.scalar_band(a, b, c, ctx.sign(metric), ctx.floor(metric))
        return {'band': {'lo': rnd(de['lo']), 'hi': rnd(de['hi']), 'text': de['text']},
                'besideSpread': {'p10': a, 'p90': b, 'note': 'the sample spread printed beside the exception (DC-35)'},
                'besideBandRule': {'lo': rnd(bb['lo']), 'hi': rnd(bb['hi'])}}
    if kind == 'weakness':
        return {'band': {'text': B.WEAKNESS_CLAUSES.get(metric, 'one-sided, as section 13.5 states')}}
    return {'band': None}


# ---------------------------------------------------------------------------------------------------------------
# FTG (W-05b, W-06; R-34, R-48)
# ---------------------------------------------------------------------------------------------------------------

FTG_KIND = {
    'street.runs': 'band rule', 'outline.r90cv': 'band rule', 'outline.roadRatio': 'band rule',
    'wall.towerSpacing': 'band rule', 'water.channelWidth': 'band rule',
    'junction.angles': 'fixed', 'junction.share4': 'fixed', 'bldg.area': 'fixed', 'bldg.quadSide': 'fixed',
    'bldg.worstCorner': 'fixed', 'gate.count': 'fixed', 'water.step': 'fixed',
    'street.turn100': 'declared exception',
    'street.stepHist': 'weakness', 'street.entropy50': 'weakness', 'wall.ungated': 'weakness', 'tree.nnP1': 'weakness',
    'tree.nnMedian': 'weakness', 'tree.pcf': 'weakness', 'time.model': 'weakness',
    'bldg.partyShare': 'descriptive', 'bldg.attached': 'descriptive', 'pop.perBuilding': 'descriptive',
    'ftg.ringBlock': 'descriptive',
}
for _i in range(1, 7):
    FTG_KIND[f'wealth.tier{_i}'] = 'descriptive'
ROLE_OF_KIND = {'band rule': 'target', 'fixed': 'target', 'declared exception': 'target', 'floor': 'target',
                'weakness': 'weakness', 'descriptive': 'descriptive'}
WATER_ROWS = {'water.step', 'water.channelWidth'}
WALL_ROWS = {'wall.towerSpacing', 'wall.ungated', 'gate.count'}

FTG_NOTES = {
    'street.turn100': 'organic presets only; the declared exception 0.5-1.5 × FTG stands (DC-35); the type 7 band is printed beside it in E15',
    'street.stepHist': 'the cliff clause reads the bins above 15 deg; 1 deg bins over 0-45 deg plus overflow',
    'junction.angles': 'target for the ringed and american presets; a weakness for the organic presets (section 13.5)',
    'junction.share4': 'among way nodes after the 2 m merge; target for the ringed and american presets, a weakness for organic',
    'street.runs': 'junction-to-junction run medians per class; target for the extramural ribbon and suburb regimes; FTG draws no alley class',
    'bldg.area': 'every footprint; the band is the ordinary-house band of section 13.5 (R-34)',
    'wall.towerSpacing': 'the walled payloads only (W05b-D11)',
    'wall.ungated': 'arterial ways crossing the curtain at no gate; the walled payloads only (W05b-D11)',
    'gate.count': 'the payload carries no gate object; the walled payloads only (W05b-D11)',
    'water.step': 'median outline vertex spacing after the 1 deg drop; coasts come at 15-16 m or 50 m steps; the band is the fixed 25 m bound (R-48)',
    'water.channelWidth': 'the coast and river slots only (R-33, R-48); the band rule per class (river)',
    'tree.pcf': 'the pair-correlation function at 1 m steps, Stoyan estimator',
    'pop.perBuilding': 'nominal population over buildings: the payload holds no resident count (R-37)',
    'time.model': 'server time PUT sent to layout GET sent; no host ratio applies (R-21); the client side was contended',
    'ftg.ringBlock': 'faces of the planarized way arrangement inside each ring: crossings without a node made nodes, faces at least half water left out (W06-D2, W06-D3)',
    'bldg.partyShare': 'per footprint the share of perimeter within 0.3 m of another; per seed the median',
}


def ftg_sample(ctx, family, metric):
    """every plan slot of the family in order (R-33, C7); a slot that gives no value is listed in failed with its reason"""
    if family == 'capture/FTG/CITY':
        members = [{'label': r['label'], 'order': r['order'], 'capture': r['capture'], 'failed': r['failed'],
                    'water': r['water'], 'build': None} for r in ctx.ftg_rec]
        members += [{'label': s['label'], 'order': s['order'], 'capture': s['capture'], 'failed': s['failed'],
                     'water': s['water'], 'build': None} for s in ctx.ftg_slots if s['family'] == family]
    else:
        members = [{'label': s['label'], 'order': s['order'], 'capture': s['capture'], 'failed': s['failed'],
                    'water': s['water'], 'build': None} for s in ctx.ftg_slots if s['family'] == family]
    members.sort(key=lambda m: m['order'])
    return members


def ftg_perslot(ctx):
    out = {}
    for p in ctx.src['e05']['perSlot']:
        out[p['label']] = p
    return out


def ftg_value(p, metric, field):
    m = p['metrics'].get(SOURCE_KEY.get(metric, metric))
    if m is None:
        return None
    if metric == 'junction.angles':
        return m.get(field)
    if metric == 'street.runs':
        return (m.get(field) or {}).get('median')
    if metric == 'bldg.area':
        return m.get(field)
    if metric == 'tree.pcf':
        i = int(field[1:]) - 1
        v = m.get('value')
        return None if v is None else v[i]
    return m.get('value')


def ftg_rows(ctx):
    e05 = ctx.src['e05']
    per = ftg_perslot(ctx)
    noWall = {}
    for size in ['BIG_TOWN', 'BIG_CITY', 'METROPOLIS', 'CITY']:
        noWall[size] = {w['label'] for w in e05['samples'][size]['wallRows'].get('noWall') or []}
    # the programme build: one string for every FTG row, the FTG pin (R-34's pooled rows; E15 D3)
    used = []
    for size, _, _ in FTG_SIZES + [FTG_CITY]:
        for m in ftg_sample(ctx, f'capture/FTG/{size}', 'x'):
            if m['failed'] is None and m['label'] in per:
                used.append(per[m['label']]['referenceBuild'])
    digest = hashlib.sha256('\n'.join(used).encode()).hexdigest()[:12]
    build = f'ftg:m1+{digest}'
    ctx.ftg_build = {'build': build, 'captures': len(used), 'perCaptureBuilds': used,
                     'rule': 'ftg:m1+ the first 12 hex digits of sha256 over the newline-joined per-capture builds of '
                             'every capture a row reads, in plan order (BIG_TOWN, BIG_CITY, METROPOLIS, CITY)'}
    metrics = ['street.turn100', 'street.stepHist', 'street.entropy50', 'junction.angles', 'junction.share4',
               'street.runs', 'bldg.area', 'bldg.quadSide', 'bldg.worstCorner', 'bldg.partyShare', 'bldg.attached',
               'wall.towerSpacing', 'wall.ungated', 'gate.count', 'water.step', 'water.channelWidth', 'tree.nnP1',
               'tree.nnMedian', 'tree.pcf', 'pop.perBuilding', 'time.model', 'outline.r90cv', 'outline.roadRatio'] + \
              [f'wealth.tier{i}' for i in range(1, 7)]
    for size, rung, pop in FTG_SIZES + [FTG_CITY]:
        fam = f'capture/FTG/{size}'
        members = ftg_sample(ctx, fam, 'x')
        matched = {'rung': rung, 'ftgSize': size, 'population': pop}
        for metric in metrics:
            kind = FTG_KIND[metric]
            if size == 'CITY':
                kind = 'weakness' if metric == 'time.model' else 'descriptive'
            role = ROLE_OF_KIND[kind]
            out = ctx.reg[metric].get('output') or {}
            fields = out.get('fields') if out.get('kind') == 'vector' else [None]
            if metric == 'street.runs':
                fields = ['arterial', 'street', 'lane', 'track']
            for field in fields:
                vals, failed, used = [], [], []
                for m in members:
                    if m['failed'] is not None:
                        failed.append({'index': m['order'], 'reason': m['failed']})
                        continue
                    p = per[m['label']]
                    if metric in WATER_ROWS and m['water'] != 'coast+river':
                        failed.append({'index': m['order'], 'reason': 'water-none'})
                        continue
                    if metric in WALL_ROWS and m['label'] in noWall[size]:
                        failed.append({'index': m['order'], 'reason': 'no-wall'})
                        continue
                    if metric == 'street.stepHist':
                        v = p['metrics']['street.stepHist']['counts']
                    else:
                        v = ftg_value(p, metric, field)
                    if v is None:
                        failed.append({'index': m['order'], 'reason': 'no-river' if metric == 'water.channelWidth' else 'no-value'})
                        continue
                    vals.append(v)
                    used.append(m['label'])
                sample = {'family': fam, 'indices': [0, len(members)], 'captures': [m['label'] for m in members]}
                if failed:
                    sample['failed'] = sorted(failed, key=lambda f: f['index'])
                sub = 'all' if field is None else f'all/{field}'
                rid = f'ftg/{size}/{metric}/{sub}'
                note = FTG_NOTES.get(metric)
                if metric == 'street.stepHist':
                    edges = ctx.reg[metric]['output']['edges']
                    hist = [sum(c[i] for c in vals) for i in range(len(vals[0]))]
                    spread = B.spread_ks(vals)
                    values = {'bins': [rnd(e) for e in edges], 'histogram': hist, 'n': sum(hist), 'seeds': len(vals)}
                    est = 'single' if len(vals) == 1 else B.estimator_for(len(vals))
                    shares = [sum(c[16:]) / sum(c) for c in vals]
                    add_row(ctx, rid=rid, metric=metric, reference='FTG', build=build, capture=CAPTURE_ROOT['FTG'],
                            script=SCRIPT['FTG'], matched=matched, role=role, values=values, estimator=est,
                            sample=sample, note=note, spread=spread, kind=kind,
                            band={'band': {'text': B.WEAKNESS_CLAUSES['street.stepHist']} if kind == 'weakness' else None,
                                  'ksMax': rnd(1.25 * spread['p90']) if spread else None},
                            extra={'shareAbove15': B.estimate(shares) and {k: rnd(v) if not isinstance(v, str) else v for k, v in B.estimate(shares).items()}})
                    continue
                est = B.estimate(vals)
                values, estimator = scalar_values(est, len(vals))
                band = scalar_band_entry(ctx, metric, field, kind, values)
                add_row(ctx, rid=rid, metric=metric, reference='FTG', build=build, capture=CAPTURE_ROOT['FTG'],
                        script=SCRIPT['FTG'], matched=matched, role=role, values=values, estimator=estimator,
                        sample=sample, note=note, kind=kind, band=band)
                ctx.vals[rid] = {'members': used, 'vals': vals, 'size': size, 'kind': kind, 'metric': metric}
                # receipt: the values equal E05's samples (the measured record) where E05 tables them
                src = SOURCE_KEY.get(metric, metric)
                key = src if field is None else f'{src}.{field}'
                tab = e05['samples'][size]['values'].get(key)
                if tab is not None:
                    ctx.receipts.append(('E05', rid, [rnd(x) for x in tab['values']] == [rnd(x) for x in vals]))
        # ftg.ringBlock (W-06 last pass; descriptive)
        ftg_ringblock(ctx, size, rung, pop, fam, members, build)
    ctx.noRow.append({'metric': 'street.runs', 'field': 'alley', 'reference': 'FTG',
                      'reason': "FTG's way classes hold no alley (E05); the field has no value on any payload"})
    ctx.noRow.append({'metric': '*', 'reference': 'FTG', 'family': 'capture/FTG/TOWN',
                      'reason': 'R-34: FtgSize has no TOWN member; slots 26 and 27 are research-side numbers in E05 section 9'})


def ftg_ringblock(ctx, size, rung, pop, fam, members, build):
    e06 = ctx.src['e06']
    pc = {p['label']: p for p in e06['perCapture']}
    edges = ctx.reg['ftg.ringBlock']['output']['edges']
    hists, failed = [], []
    for m in members:
        if m['failed'] is not None:
            failed.append({'index': m['order'], 'reason': m['failed']})
            continue
        h = pc[m['label']]['histogram']
        hists.append([h['underflow']] + h['counts'] + [h['overflow']])
    pooled = [sum(h[i] for h in hists) for i in range(len(hists[0]))]
    spread = B.spread_ks(hists)
    sample = {'family': fam, 'indices': [0, len(members)], 'captures': [m['label'] for m in members]}
    if failed:
        sample['failed'] = failed
    values = {'bins': [rnd(e) for e in edges], 'histogram': pooled, 'n': sum(pooled), 'seeds': len(hists)}
    tab = e06['samples'][size]['histogram']
    ctx.receipts.append(('E06', f'ftg/{size}/ftg.ringBlock/all',
                         pooled == [tab['underflow']] + tab['counts'] + [tab['overflow']]))
    add_row(ctx, rid=f'ftg/{size}/ftg.ringBlock/all', metric='ftg.ringBlock', reference='FTG', build=build,
            capture=CAPTURE_ROOT['FTG'], script=SCRIPT['FTGfaces'], matched={'rung': rung, 'ftgSize': size, 'population': pop},
            role='descriptive', values=values, estimator=B.estimator_for(len(hists)), sample=sample,
            note=FTG_NOTES['ftg.ringBlock'] + '; the histogram has an underflow and an overflow bin',
            spread=spread, kind='descriptive', band={'band': None})


# ---------------------------------------------------------------------------------------------------------------
# MFCG (W-07b, W-08, W-09, W-14)
# ---------------------------------------------------------------------------------------------------------------

MFCG_KIND = {
    'bldg.r4.60': 'band rule', 'bldg.r4.120': 'band rule', 'bldg.r4.250': 'band rule',
    'bldg.wallAlign.median': 'band rule', 'bldg.wallAlign.share15': 'band rule',
    'sgd.tShare': 'band rule', 'sgd.deadEnds': 'band rule', 'blockc.perHa': 'band rule', 'blockc.lotsPer': 'band rule',
    'block.courtShare': 'band rule', 'walled.share': 'band rule', 'ribbon.share': 'band rule',
    'district.area': 'band rule', 'plaza.area': 'band rule', 'castle.area': 'band rule', 'castle.compact': 'band rule',
    'wall.nodeSpacing': 'band rule', 'quarter.count': 'band rule', 'wall.towerSpacing': 'band rule',
    'market.secondary': 'band rule', 'gate.count': 'fixed', 'market.adjacent': 'fixed',
    'fg.recoverability': 'fixed', 'fg.streetwall': 'fixed', 'fg.coverWalled': 'descriptive', 'bldg.area': 'descriptive',
    'pop.perBuilding': 'weakness',
}
MFCG_NOTES = {
    'bldg.r4.60': 'longest-edge axis, 1500 sampled buildings, area centroids',
    'bldg.wallAlign.median': 'buildings inside the curtain in bands 0-40, 40-100, 100-200 m from it',
    'bldg.wallAlign.share15': 'buildings inside the curtain in bands 0-40, 40-100, 100-200 m from it',
    'sgd.tShare': 'on the derived street graph, the raster twin at a half-metre step with 8 m spurs and a 2 m merge (R-22); CV ≤ 0.3, target (S-V12-2)',
    'sgd.deadEnds': 'on the derived street graph, the raster twin at a half-metre step with 8 m spurs and a 2 m merge (R-22); CV ≤ 0.3, target (S-V12-2)',
    'blockc.perHa': 'cluster blocks inside the curtain per walled ha (1 m gap, 3 m close); CV ≤ 0.3, target (S-V12-2)',
    'blockc.lotsPer': 'footprints per cluster block, per seed the median; CV ≤ 0.3, target (S-V12-2)',
    'block.courtShare': 'deep cluster blocks inside the curtain holding an unbuilt interior part (the inner-plot removal; R-19)',
    'ribbon.share': 'the extramural share near an arterial (100 m); the band per size (R-12 F2)',
    'district.area': 'per seed the median district area',
    'gate.count': 'land gates of the outermost curtain; our law sets the main gates exactly',
    'market.secondary': 'reference value 0: one square in every export (R-12)',
    'market.adjacent': 'reference value 0: one square in every export (R-12)',
    'fg.recoverability': 'city-band recoverability at the default view of MFCG (R1), labels off; metres per pixel 1.20 / 2.09 / 3.23 at sizes 40 / 80 / 130',
    'fg.streetwall': 'the walled share of cluster-block outline on every intramural frontage; the half-metre raster twin (R-22) reads about 0.026 under a quarter-metre one',
    'fg.coverWalled': 'footprint area inside the curtain over the curtain area; single seeds 0.561-0.653',
    'bldg.area': 'every building, footprints and prisms: lots drawn as buildings by MFCG, never a house-size anchor',
    'pop.perBuilding': 'the export carries no population: the coded population law of section 13.5 (six per lot) over the exported buildings',
}


def mfcg_sample(ctx, fam, stems_measured):
    f7 = ctx.src['e07']['families'][fam]
    lo, hi = f7['indices']
    failed = [{'index': int(x['label'].rsplit('/', 1)[1]), 'reason': x['reason']} for x in f7['failed']]
    s = {'family': fam, 'indices': [lo, hi]}
    if failed:
        s['failed'] = sorted(failed, key=lambda f: f['index'])
    return s, f7['usable']


def mfcg_value(ctx, stem, metric, field):
    e07 = ctx.src['e07']['perSeed'][stem]
    if metric in ('sgd.tShare', 'sgd.deadEnds', 'blockc.perHa', 'blockc.lotsPer', 'block.courtShare'):
        return ctx.src['e09seeds']['perSeed'][stem][metric]['value']
    if metric in ('fg.recoverability', 'fg.streetwall', 'fg.coverWalled'):
        p = ctx.src['e08']['perSeed'][stem]
        if metric == 'fg.recoverability':
            return p['R1']['fg.recoverability']['value']
        if metric == 'fg.coverWalled':
            return p['fg.coverWalled'].get('valueUnrounded', p['fg.coverWalled']['value'])
        return p['fg.streetwall']['value']
    if metric in ('bldg.wallAlign.median', 'bldg.wallAlign.share15'):
        k = 'median' if metric.endswith('median') else 'share15'
        return e07['bldg.wallAlign'][field][k]
    if metric == 'bldg.area':
        return e07['bldg.area'][field]
    v = e07[metric]
    if isinstance(v, dict):
        if metric in ('district.area', 'bldg.r4.60', 'bldg.r4.120', 'bldg.r4.250'):
            return v['median']
        if metric in ('wall.nodeSpacing', 'wall.towerSpacing'):
            return v['p50']
        return v['value']
    return v


def mfcg_rows(ctx):
    e07 = ctx.src['e07']
    metrics = ['bldg.r4.60', 'bldg.r4.120', 'bldg.r4.250', 'bldg.wallAlign.median', 'bldg.wallAlign.share15',
               'sgd.tShare', 'sgd.deadEnds', 'blockc.perHa', 'blockc.lotsPer', 'block.courtShare', 'fg.recoverability',
               'fg.streetwall', 'fg.coverWalled', 'walled.share', 'ribbon.share', 'district.area', 'plaza.area',
               'castle.area', 'castle.compact', 'wall.nodeSpacing', 'quarter.count', 'gate.count', 'wall.towerSpacing',
               'market.secondary', 'market.adjacent', 'bldg.area', 'pop.perBuilding']
    e14 = {(v['metric'], v['family']): v['status'] for v in ctx.src['e14']['verdicts']}
    for fam, rung, size, pre in MFCG_FAMS:
        sample, usable = mfcg_sample(ctx, fam, None)
        matched = {'rung': rung, 'mfcgSize': size}
        for metric in metrics:
            kind = MFCG_KIND[metric]
            if metric.startswith(('sgd.', 'blockc.')) and e14.get((metric, fam)) == 'descriptive':
                kind = 'descriptive'
            role = ROLE_OF_KIND[kind]
            out = ctx.reg[metric].get('output') or {}
            fields = out.get('fields') if out.get('kind') == 'vector' else [None]
            for field in fields:
                vals = [mfcg_value(ctx, s, metric, field) for s in usable]
                est = B.estimate(vals)
                values, estimator = scalar_values(est, len(vals))
                sub = 'all' if field is None else f'all/{field}'
                rid = f'mfcg/{size}/plain/{metric}/{sub}'
                script = SCRIPT['MFCG']
                if metric.startswith(('sgd.', 'blockc.', 'block.')):
                    script = SCRIPT['MFCGgraph']
                elif metric.startswith('fg.'):
                    script = SCRIPT['MFCGrender']
                band = scalar_band_entry(ctx, metric, field, kind, values)
                add_row(ctx, rid=rid, metric=metric, reference='MFCG', build=BUILD['MFCG'], capture=CAPTURE_ROOT['MFCG'],
                        script=script, matched=matched, role=role, values=values, estimator=estimator,
                        sample=sample, note=MFCG_NOTES.get(metric) or MFCG_NOTES.get(metric.rsplit('.', 1)[0] + '.60'),
                        kind=kind, band=band)
                # receipts against the measuring items' own summaries
                src = None
                if metric.startswith(('sgd.', 'blockc.', 'block.')):
                    src = ctx.src['e09']['summaries'][fam]['summary'].get(metric)
                elif metric.startswith('fg.'):
                    src = ctx.src['e08']['summaries'][fam].get(metric)
                else:
                    sm = e07['summaries'][fam]
                    src = sm.get(metric + ('.p95' if field == 'p95' else '')) if metric == 'bldg.area' else sm.get(metric)
                    if isinstance(src, dict) and field and field in src:
                        src = src[field]
                if isinstance(src, dict) and 'c' in src:
                    ok = all(abs(rnd(src[k]) - values[p]) < 1.5e-4 for k, p in (('a', 'p10'), ('b', 'p90'), ('c', 'p50')))
                    ctx.receipts.append(('E07/E08/E09 summary', rid, ok))
    # the stress family: R-23's cells only (descriptive)
    fam, rung, size, pre = MFCG_STRESS
    sample, usable = mfcg_sample(ctx, fam, None)
    for metric in ['water.step', 'water.channelWidth', 'wall.ungated', 'wall.barrierShare', 'gate.count']:
        vals = []
        for s in usable:
            v = e07['perSeed'][s][SOURCE_KEY.get(metric, metric)]
            vals.append(v['value'] if isinstance(v, dict) else v)
        est = B.estimate(vals)
        values, estimator = scalar_values(est, len(vals))
        note = {'water.step': 'the sea polygon only, vertices turning under 1 deg dropped (as on FTG); the river is a centreline',
                'water.channelWidth': 'one width per course, as exported',
                'wall.ungated': 'proper crossings and crossings at a non-gate curtain vertex',
                'wall.barrierShare': 'shore closure length over the enclosure perimeter',
                'gate.count': 'the waterfront law at the stress setting (R-23); land gates'}[metric]
        add_row(ctx, rid=f'mfcg/{size}/river+coast/{metric}/all', metric=metric, reference='MFCG', build=BUILD['MFCG'],
                capture=CAPTURE_ROOT['MFCG'], script=SCRIPT['MFCG'], matched={'rung': rung, 'mfcgSize': size},
                role='descriptive', values=values, estimator=estimator, sample=sample,
                note='the stress family (river and coast on); ' + note, kind='descriptive', band={'band': None})
    ctx.noRow.append({'metric': 'every other stress-family value', 'reference': 'MFCG', 'family': 'capture/MFCG/80/river+coast',
                      'reason': "R-23 names the stress cells that take rows; the family's other values stay in E07 and E09 (the stress variant is descriptive)"})
    # D28: R-51 (M-1-rulings-3.md): the recorded draw family for four members, the formula route for draw.widthPx
    mfcg_draw_rows(ctx)


DRAW_NOTE = 'the twelve draw recordings of the recorded draw family (R-51); draw style is size-invariant (sizes 24-80, water on and off)'
DRAW_ROWS = [   # (metric, role, kind, the reason a member gives no value or None, its test) -- notes within C3
    ('draw.casingLaw', 'target', 'fixed', 'uncased', 'cased ribbons with the casing at core plus 2 hairlines'),
    ('draw.roundJoins', 'target', 'fixed', None, 'round joins over joins'),
    ('draw.roundCaps', 'descriptive', 'descriptive', None, 'round caps over caps'),
    ('draw.wallsAfterBuildings', 'target', 'fixed', 'truncated-log', 'first wall stroke after the last roof fill'),
]


def mfcg_draw_rows(ctx):
    """R-51 (3): four rows on capture/MFCG/draw/recorded, read from E07's draw census per recording (E07 section 7);
    R-51 (4): draw.widthPx per field on capture/MFCG/40/plain from measure_mfcg.py --plan-widths (E07's widths file)."""
    blk = ctx.src['plan']['mfcgRecordedDraw']
    recs = blk['records']
    fam = blk['family']
    draw = ctx.src['e07fix']['draw']
    labels = [r['label'] for r in recs]
    census = []
    for r in recs:
        d = draw[r['record']]
        cased = d['coresTotal'] - len(d['coresUncased'])
        # the plan's flags agree with the census they were read from (a receipt per recording)
        ctx.receipts.append(('E07 draw', f"{fam}/{r['order']}", (cased > 0) == r['casedRibbon']
                             and (d['logDropped'] == 0) == r['logComplete']
                             and (d['wallsAfterBuildings'] is None) == (not r['logComplete'])))
        census.append({
            'draw.casingLaw': None if cased == 0 else d['coresPaired'] / cased,
            'draw.roundJoins': d['roundJoins'] / d['joins'],
            'draw.roundCaps': d['roundCaps'] / d['caps'],
            'draw.wallsAfterBuildings': None if d['wallsAfterBuildings'] is None else (1.0 if d['wallsAfterBuildings'] else 0.0),
        })
    pooled = {'draw.roundJoins': sum(draw[r['record']]['roundJoins'] for r in recs) / sum(draw[r['record']]['joins'] for r in recs),
              'draw.roundCaps': sum(draw[r['record']]['roundCaps'] for r in recs) / sum(draw[r['record']]['caps'] for r in recs)}
    # E07 section 7's figures (the record's own text): pooled joins 0.99998 and caps 0.99905, 11 of 11 cased, 8 of 8 logs
    ctx.receipts.append(('E07 draw', 'pooled joins and caps', round(pooled['draw.roundJoins'], 5) == 0.99998
                         and round(pooled['draw.roundCaps'], 5) == 0.99905))
    out = {}
    for metric, role, kind, reason, test in DRAW_ROWS:
        vals, failed = [], []
        for r, c in zip(recs, census):
            if c[metric] is None:
                failed.append({'index': r['order'], 'reason': reason})
            else:
                vals.append(c[metric])
        est = B.estimate(vals)
        values, estimator = scalar_values(est, len(vals))
        sample = {'family': fam, 'indices': [0, len(recs)], 'captures': labels}
        if failed:
            sample['failed'] = failed
        note = DRAW_NOTE + '; ' + test
        if metric in pooled:
            note += f'; pooled {pooled[metric]:.5f}'
        if failed:
            note += f"; {len(failed)} failed: {reason}"
        rid = f'mfcg/draw/recorded/{metric}/all'
        band = scalar_band_entry(ctx, metric, None, kind, values) if kind != 'descriptive' else {'band': None}
        add_row(ctx, rid=rid, metric=metric, reference='MFCG', build=BUILD['MFCG'], capture=CAPTURE_ROOT['MFCGdraw'],
                script=SCRIPT['MFCG'], matched=None, role=role, values=values, estimator=estimator, sample=sample,
                note=note, kind=kind, band=band, extra={'perRecording': [rnd(c[metric]) if c[metric] is not None else None
                                                                         for c in census]})
        out[metric] = {'n': len(vals), 'failed': [f['index'] for f in failed]}
    # draw.widthPx on the plan's size-40 plain family (R-51 (4)): per seed, each model width x that export's px per metre
    wj = ctx.src['e07widths']
    famw = 'capture/MFCG/40/plain'
    fw = wj['families'][famw]
    sample, usable = mfcg_sample(ctx, famw, None)
    if usable != fw['usable']:
        raise ValueError('the widths file and E07 disagree on the size-40 usable seeds')
    pxm = B.estimate([fw['perSeed'][st]['pxPerM'] for st in usable])
    for field in ('wall', 'tower', 'roadCore', 'pier'):
        vals = [fw['perSeed'][st][field] for st in usable]
        est = B.estimate(vals)
        values, estimator = scalar_values(est, len(vals))
        mw = wj['modelWidthsM'][field]
        note = (f"model width {mw:g} m × the px per metre of each export (its outer scale / 4); px per metre "
                f"{rnd(pxm['a'])}-{rnd(pxm['b'])} over the ten seeds (R-51)")
        if field == 'pier':
            note += '; a plain export draws no plank: the 4.8 m default'
        rid = f'mfcg/40/plain/draw.widthPx/all/{field}'
        add_row(ctx, rid=rid, metric='draw.widthPx', reference='MFCG', build=BUILD['MFCG'], capture=CAPTURE_ROOT['MFCG'],
                script=SCRIPT['MFCG'], matched={'rung': 'TOWN', 'mfcgSize': 40}, role='target', values=values,
                estimator=estimator, sample=sample, note=note, kind='fixed',
                band={'band': _r(B.fixed_band('draw.widthPx', field, values['p50']))})
        sm = fw['summaries'][field]
        ctx.receipts.append(('E07 widths', rid, all(abs(rnd(sm[k]) - values[q]) < 1.5e-4
                                                    for k, q in (('a', 'p10'), ('b', 'p90'), ('c', 'p50')))))
    ctx.round3['drawRows'] = out


# ---------------------------------------------------------------------------------------------------------------
# NG (W-10b, W-11b, W-22)
# ---------------------------------------------------------------------------------------------------------------

NG_KIND = {
    'bldg.pairing': 'band rule', 'street.detour': 'band rule', 'street.cyclesPerKm2': 'band rule',
    'fg.streetwallGap100': 'band rule', 'block.courtShare': 'band rule', 'block.countTemplate': 'band rule',
    'bldg.partyShare': 'band rule', 'junction.angles': 'fixed', 'junction.share4': 'fixed', 'bldg.attached': 'fixed',
    'plot.moran': 'weakness', 'plot.cvDistrict': 'weakness',
    'block.area': 'band rule', 'plot.minWidth': 'band rule', 'block.areaRel': 'descriptive',
}
NG_NOTES = {
    'bldg.pairing': 'reading B (R-05): exactly one neighbour sharing half an edge with area within 25 %; reading A and the mutual share in E11',
    'junction.share4': 'nodes within 2 m merged (R-06); NG draws no raw degree-4 node',
    'street.cyclesPerKm2': 'independent cycles per km2 of the convex hull of drawn roads and footprints (R-08)',
    'fg.streetwallGap100': 'rays every 5 % of the median short side, walled within 1.0 × it; gaps over 2 m per 100 m (R-07)',
    'block.courtShare': 'deep bounded blocks holding an unbuilt interior part (E11 section 2)',
    'block.countTemplate': 'bounded built faces per hood (R-08); 13-82 % of footprints lie in no face',
    'bldg.partyShare': 'per footprint the perimeter share within 1 % of its short side of another footprint',
    'bldg.attached': 'the share of footprints with any party wall',
    'plot.moran': 'Moran I of plot area on shared-edge adjacency',
    'plot.cvDistrict': 'the hood as the district: the footprint-area CV (R-23)',
    'block.area': 'built blocks; the histogram has an underflow and an overflow bin',
    'block.areaRel': 'built block areas over the median footprint area; the descriptive companion of block.area (R-01)',
    'plot.minWidth': 'per plot the minimum-width rectangle; 0.25 m bins to 30 m plus overflow',
}
NG_DECLARED = {'street.detour', 'street.cyclesPerKm2', 'fg.streetwallGap100', 'block.area', 'plot.minWidth', 'cut.length',
               'junction.angles', 'junction.share4'}


def ng_union_sample(families, labels):
    return {'family': 'capture/NG', 'captures': labels}


def ng_template_sample(tpl):
    return {'family': f'capture/NG/{tpl}/medium', 'indices': [0, 5]}


def ng_rows(ctx):
    e11 = ctx.src['e11']
    pooled = e11['mediumPooled']
    labels_all = pooled['sample']['labels']
    groups_all = [lab.split('/')[2] for lab in labels_all]
    maps = {m['plan']['label']: m for m in e11['maps']}
    scal = ['bldg.pairing', 'street.detour', 'junction.share4', 'street.cyclesPerKm2', 'fg.streetwallGap100',
            'block.courtShare', 'block.countTemplate', 'junction.angles', 'bldg.partyShare', 'bldg.attached',
            'plot.moran', 'plot.cvDistrict']
    subsets = [('all', None)] + [(f'template-{t}', t) for t in NG_TEMPLATES]
    for metric in scal:
        kind = NG_KIND[metric]
        role = ROLE_OF_KIND[kind]
        fields = ['median', 'p5'] if metric == 'junction.angles' else [None]
        for sub, tpl in subsets:
            if metric == 'block.countTemplate' and tpl is None:
                continue
            blk = pooled if tpl is None else e11['medium'][tpl]
            for field in fields:
                key = metric if field is None else f'{metric}.{field}'
                vals = blk['scalars'][key]['perSeed']
                est = B.estimate(vals)
                values, estimator = scalar_values(est, len(vals))
                sample = ng_union_sample(None, labels_all) if tpl is None else ng_template_sample(tpl)
                rid = f'ng/medium/{metric}/{sub}' + ('' if field is None else f'/{field}')
                note = NG_NOTES.get(metric)
                if metric in NG_DECLARED:
                    note = DECLARED_NOTE + ('; ' + note if note else '')
                band = scalar_band_entry(ctx, metric, field, kind, values)
                add_row(ctx, rid=rid, metric=metric, reference='NG', build=BUILD['NG'], capture=CAPTURE_ROOT['NG'],
                        script=SCRIPT['NG'], matched=None, role=role, values=values, estimator=estimator, sample=sample,
                        note=note, kind=kind, band=band)
                se = blk['scalars'][key]['estimate']
                ctx.receipts.append(('E11 estimate', rid, all(abs(rnd(se[k]) - values[q]) < 1.5e-4
                                                              for k, q in (('a', 'p10'), ('b', 'p90'), ('c', 'p50')))))
    # distributions: block.area, block.areaRel, plot.minWidth (per-template subsets; 'all' over within-template pairs)
    dkeys = {'block.area': ('hist_m2_declared', None), 'block.areaRel': ('hist', None), 'plot.minWidth': ('hist_m_declared', None)}
    for metric, (hk, _) in dkeys.items():
        kind = NG_KIND[metric]
        role = ROLE_OF_KIND[kind]
        edges = ctx.reg[metric]['output']['edges']
        for sub, tpl in subsets:
            labs = labels_all if tpl is None else [x for x in labels_all if x.split('/')[2] == tpl]
            hists = []
            for lab in labs:
                h = maps[lab][metric][hk]
                hists.append(([h['underflow']] if 'underflow' in h else []) + h['bins'] + ([h['overflow']] if 'overflow' in h else []))
            pooled_h = [sum(h[i] for h in hists) for i in range(len(hists[0]))]
            groups = [x.split('/')[2] for x in labs]
            spread = B.spread_ks(hists, groups=groups if tpl is None else None)
            spread_all = B.spread_ks(hists) if tpl is None else None
            values = {'bins': [rnd(e) for e in edges], 'histogram': pooled_h, 'n': sum(pooled_h), 'seeds': len(hists)}
            sample = ng_union_sample(None, labels_all) if tpl is None else ng_template_sample(tpl)
            note = NG_NOTES[metric]
            if metric in NG_DECLARED:
                note = DECLARED_NOTE + '; ' + note
            if tpl is None:
                note += '; spreadKS over within-template pairs'
            if spread and spread['p90'] >= 0.999:
                note += '; spreadKS 1.0: cannot fail (thin)'
            rid = f'ng/medium/{metric}/{sub}'
            add_row(ctx, rid=rid, metric=metric, reference='NG', build=BUILD['NG'], capture=CAPTURE_ROOT['NG'],
                    script=SCRIPT['NG'], matched=None, role=role, values=values, estimator=B.estimator_for(len(hists)),
                    sample=sample, note=note, spread=spread, kind=kind,
                    band={'band': B.distribution_band(spread) if kind == 'band rule' else None},
                    extra={'spreadAllPairs': spread_all and {'p90': rnd(spread_all['p90']), 'pairs': spread_all['pairs']}})
            # receipt: the pooled histogram equals W-11b's
            src = pooled['distributions'][metric]['pooledHist'] if tpl is None else e11['medium'][tpl]['distributions'][metric].get('pooledHist')
            if src:
                theirs = ([src['underflow']] if 'underflow' in src else []) + src['bins'] + ([src['overflow']] if 'overflow' in src else [])
                ctx.receipts.append(('E11 pooledHist', rid, pooled_h == theirs))
    ng_cut_rows(ctx, labels_all, groups_all)
    ng_draw_rows(ctx)


CUT_SUBSETS = [('all', 'pooled'), ('plain', 'plain'), ('ring', 'ring')] + [(f'template-{t}', f'template:{t}') for t in NG_TEMPLATES]


def ng_cut_rows(ctx, labels_all, groups_all):
    e10 = ctx.src['e10']
    for sub, key in CUT_SUBSETS:
        r = e10['rows'][key]
        labs = r['sample']['labels']
        sample = ng_union_sample(None, labs) if len(r['sample']['families']) > 1 else \
            {'family': r['sample']['families'][0], 'indices': [0, 5]}
        n_seeds = len(labs)
        # sigma: the pooled maximum-likelihood fit over simple parents (section 13.5's measure, E10 9.4); per-seed spread
        sg = r['cut.sigma']
        pf = sg['pooledFit']
        per = [x for x in sg['perSeed'] if x is not None]
        est = B.estimate(per)
        ref = pf['simpleParents']['sigma']
        values = {'p10': rnd(ref), 'p50': rnd(ref), 'p90': rnd(ref), 'n': pf['nFSimple'], 'seeds': n_seeds}
        note = (f"one pooled fit over {pf['nFSimple']} simple-parent cuts in the recorded frame, the measure section 13.5 "
                f"quotes (rebuilt parents {rnd(pf['rebuiltParents']['sigma'])}); a fixed band, no per-seed estimator")
        add_row(ctx, rid=f'ng/medium/cut.sigma/{sub}', metric='cut.sigma', reference='NG', build=BUILD['NG'],
                capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGcut'], matched=None, role='target', values=values,
                estimator='single', sample=sample, note=note, kind='fixed',
                band={'band': _r(B.fixed_band('cut.sigma', None, ref))},
                extra={'perSeedSpread': est and {'estimator': est['estimator'], 'n': est['n'], 'p10': rnd(est['a']),
                                                 'p50': rnd(est['c']), 'p90': rnd(est['b']),
                                                 'rule': 'seeds with 10 or more bounded cuts'},
                       'rebuiltParents': rnd(pf['rebuiltParents']['sigma'])})
        # cornerMid, arrival85 (all cuts), fillet (all cuts)
        for metric, path, nm in (('cut.cornerMid', None, 'one-bend bounded cuts'),
                                 ('cut.arrival85', 'allCuts', 'junction ends of every street'),
                                 ('cut.fillet', 'allCuts', 'one-bend cuts of every street')):
            blk = r[metric]
            if path is None:
                pooled = blk['pooled']
                per = blk['perSeed']
                comp = None
            else:
                pooled = blk['pooled'][path]
                per = blk[path]['perSeed']
                comp = blk['pooled']['bounded']
            per = [x for x in per if x is not None]
            est = B.estimate(per)
            ref = pooled['share']
            values = {'p10': rnd(ref), 'p50': rnd(ref), 'p90': rnd(ref), 'n': pooled['n'], 'seeds': n_seeds}
            note = f"one pooled share, {pooled['k']} of {pooled['n']} {nm}; a fixed band, no per-seed estimator"
            if comp:
                note += f"; bounded cuts {comp['k']} of {comp['n']}"
            add_row(ctx, rid=f'ng/medium/{metric}/{sub}', metric=metric, reference='NG', build=BUILD['NG'],
                    capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGcut'], matched=None, role='target', values=values,
                    estimator='single', sample=sample, note=note, kind='fixed',
                    band={'band': _r(B.fixed_band(metric, None, ref))},
                    extra={'perSeedSpread': est and {'estimator': est['estimator'], 'n': est['n'], 'p10': rnd(est['a']),
                                                     'p50': rnd(est['c']), 'p90': rnd(est['b'])}})
        # cut.length: a distribution on the registry's bins; 'all' spreads over the within-template pairs
        cl = r['cut.length']
        hists = [None if h is None else h['bins'] + [h.get('overflow', 0)] for h in cl['perSeedHist']]
        pooled_h = cl['pooled']['hist']['bins'] + [cl['pooled']['hist'].get('overflow', 0)]
        groups = [lab.split('/')[2] for lab in labs]
        spread = B.spread_ks(hists, groups=groups if sub in ('all', 'plain') else None)
        spread_all = B.spread_ks(hists)
        edges = ctx.reg['cut.length']['output']['edges']
        values = {'bins': [rnd(e) for e in edges], 'histogram': pooled_h, 'n': sum(pooled_h),
                  'seeds': sum(1 for h in hists if h and sum(h))}
        nocut = [{'index': i, 'reason': 'no-cut'} for i, h in enumerate(hists) if not (h and sum(h))]
        cl_sample = dict(sample)
        if nocut:
            cl_sample['failed'] = nocut
        note = DECLARED_NOTE + '; bounded cuts, the fillet-free course; an overflow bin'
        if sub in ('all', 'plain'):
            note += '; spreadKS over within-template pairs'
        if spread and spread['p90'] >= 0.999:
            note += '; spreadKS 1.0: cannot fail (thin)'
        add_row(ctx, rid=f'ng/medium/cut.length/{sub}', metric='cut.length', reference='NG', build=BUILD['NG'],
                capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGcut'], matched=None, role='target', values=values,
                estimator=B.estimator_for(values['seeds']), sample=cl_sample, note=note, spread=spread, kind='band rule',
                band={'band': B.distribution_band(spread)},
                extra={'spreadAllPairs': spread_all and {'p90': rnd(spread_all['p90']), 'pairs': spread_all['pairs']},
                       'spreadW10b': {'p90': rnd(cl['spreadKS']['binned']['p90']), 'pairs': cl['spreadKS']['pairs']}})
    # the five face classes (descriptive companions, R-09)
    for flag, name in NG_CLASS.items():
        c = e10['classes'][f'flag:{flag}']
        s = c['subsets']['all']
        sample = ng_union_sample(None, labels_all)
        bent = c['boundedBentCuts']
        thin = bent < 10
        for metric, blk in (('cut.sigma', s['cut.sigma']), ('cut.cornerMid', s['cut.cornerMid']),
                            ('cut.arrival85', s['cut.arrival85']), ('cut.fillet', s['cut.fillet'])):
            if metric == 'cut.sigma':
                if blk is None:
                    values = {'n': 0, 'seeds': 20}
                    smp = dict(sample)
                    smp['failed'] = [{'index': i, 'reason': 'thin-class'} for i in range(len(sample['captures']))]
                    note = f'no fit: {bent} bounded bent cuts, under the 10 the fit needs (R-09); a known-defects entry for M1'
                else:
                    values = {'p10': rnd(blk['sigma']), 'p50': rnd(blk['sigma']), 'p90': rnd(blk['sigma']), 'n': blk['n'], 'seeds': 20}
                    smp = sample
                    note = f"the pooled fit over the {blk['n']} bounded cuts of the class (contamination {rnd(blk['eps'])}); no per-seed estimate"
            else:
                values = {'p10': rnd(blk['share']), 'p50': rnd(blk['share']), 'p90': rnd(blk['share']), 'n': blk['n'], 'seeds': 20}
                smp = sample
                note = f"the pooled share {blk['k']} of {blk['n']} over the class; no per-seed estimate"
            if thin and metric != 'cut.sigma':
                note += f'; thin: {bent} bounded bent cuts (R-09)'
            add_row(ctx, rid=f'ng/medium/{metric}/class-{name}', metric=metric, reference='NG', build=BUILD['NG'],
                    capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGcut'], matched=None, role='descriptive', values=values,
                    estimator='single', sample=smp, note=note, kind='descriptive', band={'band': None})


def ng_draw_rows(ctx):
    e20 = ctx.src['e20']
    maps = e20['plan']['maps']
    fam_order = [f'capture/NG/{t}/{s}' for s in NG_SIZES for t in NG_TEMPLATES]
    maps = sorted(maps, key=lambda m: (fam_order.index(m['label'].rsplit('/', 1)[0]), m['index']))
    labels = [m['label'] for m in maps]
    sample = {'family': 'capture/NG', 'captures': labels}
    allp = e20['plan']['all']
    # hatch: per map the mean per gable/hip wing; p50 the pooled value over the 44 (R-49); fixed band 15-20
    per = [m['draw.hatchPerWing']['mean'] for m in maps]
    est = B.estimate(per)
    ref = allp['draw.hatchPerWing']['mean']
    values = {'p10': rnd(ref), 'p50': rnd(ref), 'p90': rnd(ref), 'n': allp['gableHipWings'], 'seeds': len(maps)}
    add_row(ctx, rid='ng/plan/draw.hatchPerWing/all', metric='draw.hatchPerWing', reference='NG', build=BUILD['NG'],
            capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGdraw'], matched=None, role='target', values=values,
            estimator='single', sample=sample,
            note='one pooled value per gable or hip wing over the 44 plan seeds, the two ridge tapers included (R-49); a fixed band; map means 15.76-21.10',
            kind='fixed', band={'band': B.fixed_band('draw.hatchPerWing', None, ref)},
            extra={'perSeedSpread': {'estimator': est['estimator'], 'n': est['n'], 'p10': rnd(est['a']), 'p50': rnd(est['c']),
                                     'p90': rnd(est['b']), 'rule': 'per-map means'}})
    # quads: per map value; p50 the pooled value (R-49); the band rule
    per = [m['draw.shadowQuadsPerWing'] for m in maps]
    est = B.estimate(per)
    ref = allp['draw.shadowQuadsPerWing']['pooled']
    values = {'p10': rnd(est['a']), 'p50': rnd(ref), 'p90': rnd(est['b']), 'n': est['n'], 'seeds': len(maps)}
    add_row(ctx, rid='ng/plan/draw.shadowQuadsPerWing/all', metric='draw.shadowQuadsPerWing', reference='NG',
            build=BUILD['NG'], capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGdraw'], matched=None, role='target',
            values=values, estimator=est['estimator'], sample=sample,
            note='p50 the pooled value over every wing of the 44 plan seeds, one prism shadow per wing (R-49); p10 and p90 over the per-map values',
            kind='band rule', band=scalar_band_entry(ctx, 'draw.shadowQuadsPerWing', None, 'band rule', values))
    # square caps: the open-street law with the template split (E20 F3)
    for sub, tpl in [('all', None)] + [(f'template-{t}', t) for t in NG_TEMPLATES]:
        mm = [m for m in maps if tpl is None or m['template'] == tpl]
        per = [m['draw.capSquare'] for m in mm]
        est = B.estimate(per)
        sq = sum(m['capsSquare'] for m in mm)
        tot = sum(m['capsSquare'] + m['capsRound'] + m.get('capsOther', 0) for m in mm)
        smp = sample if tpl is None else {'family': 'capture/NG', 'captures': [m['label'] for m in mm]}
        values = {'p10': rnd(est['a']), 'p50': rnd(est['c']), 'p90': rnd(est['b']), 'n': est['n'], 'seeds': len(mm)}
        note = 'square-capped street strokes per map; every open street is square-capped'
        if tpl in (None, 'square'):
            note += ', the filled street of the square template adds three round-capped strokes per map (E20 F3)'
        add_row(ctx, rid=f'ng/plan/draw.capSquare/{sub}', metric='draw.capSquare', reference='NG', build=BUILD['NG'],
                capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGdraw'], matched=None, role='target', values=values,
                estimator=est['estimator'], sample=smp, note=note, kind='fixed',
                band={'band': B.fixed_band('draw.capSquare', None, est['c'])}, extra={'pooledShare': rnd(sq / tot) if tot else None})
    # roof luma ratio: descriptive (a ratio, no colour value)
    per = [m['draw.roofLumaRatio']['median'] for m in maps]
    est = B.estimate(per)
    values, estimator = scalar_values(est, len(maps))
    add_row(ctx, rid='ng/plan/draw.roofLumaRatio/all', metric='draw.roofLumaRatio', reference='NG', build=BUILD['NG'],
            capture=CAPTURE_ROOT['NG'], script=SCRIPT['NGdraw'], matched=None, role='descriptive', values=values,
            estimator=estimator, sample=sample, note='per map the median shaded-to-lit roof luma ratio; a ratio only, no tone value',
            kind='descriptive', band={'band': None})


# ---------------------------------------------------------------------------------------------------------------
# the time rows (R-21, R-44): every time cell M-1 cannot measure is one descriptive row in C-0116's form
# ---------------------------------------------------------------------------------------------------------------

def time_rows(ctx):
    # MFCG: time.model and time.firstMap per plain family; time.worst on the stress family
    for fam, rung, size, pre in MFCG_FAMS:
        sample, usable = mfcg_sample(ctx, fam, None)
        f7 = ctx.src['e07']['families'][fam]
        lo, hi = f7['indices']
        prev = {f['index']: f['reason'] for f in sample.get('failed', [])}
        for metric, reason, note in (('time.model', 'contended', 'the export runs of 2026-10-03 shared the machine with build seats; no idle-window timing ran (W-21 not approved)'),
                                     ('time.firstMap', 'unmeasured', 'no first-map timing ran on MFCG at M-1 (W-21 not approved)')):
            smp = {'family': fam, 'indices': [lo, hi],
                   'failed': [{'index': i, 'reason': prev.get(i, reason)} for i in range(lo, hi)]}
            add_row(ctx, rid=f'mfcg/{size}/plain/{metric}/all', metric=metric, reference='MFCG', build=BUILD['MFCG'],
                    capture=CAPTURE_ROOT['MFCG'], script=SCRIPT['MFCG'], matched={'rung': rung, 'mfcgSize': size},
                    role='descriptive', values={'n': 0, 'seeds': hi - lo}, estimator='single', sample=smp,
                    note='no value (R-21, R-44): ' + note, kind='descriptive', band={'band': None})
    fam, rung, size, pre = MFCG_STRESS
    f7 = ctx.src['e07']['families'][fam]
    lo, hi = f7['indices']
    prev = {int(x['label'].rsplit('/', 1)[1]): x['reason'] for x in f7['failed']}
    att = ctx.src['e07']['timeWorstNote']['stressAttempts']
    words = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five'}
    attempts = ', '.join(f'seed {i} {words.get(att[f"{pre}{i}"], att[f"{pre}{i}"])}' for i in range(lo, hi))
    add_row(ctx, rid=f'mfcg/{size}/river+coast/time.worst/all', metric='time.worst', reference='MFCG', build=BUILD['MFCG'],
            capture=CAPTURE_ROOT['MFCG'], script=SCRIPT['MFCG'], matched={'rung': rung, 'mfcgSize': size},
            role='descriptive', values={'n': 0, 'seeds': hi - lo}, estimator='single',
            sample={'family': fam, 'indices': [lo, hi], 'failed': [{'index': i, 'reason': prev.get(i, 'contended')} for i in range(lo, hi)]},
            note=f'no value (R-44): contended runs; generation attempts per stress seed: {attempts}; seeds 1 and 4 are retries',
            kind='descriptive', band={'band': None})
    # NG: time.model, time.firstMap, time.worst over the 20 medium seeds
    labels = ctx.src['e11']['mediumPooled']['sample']['labels']
    for metric, reason, note in (('time.model', 'contended', 'the 2026-10-03 recordings shared the machine with build seats (R-21, R-44)'),
                                 ('time.firstMap', 'unmeasured', 'no first-map timing ran on NG at M-1 (R-44)'),
                                 ('time.worst', 'unmeasured', 'no worst-configuration timing ran on NG at M-1 (R-44)')):
        smp = {'family': 'capture/NG', 'captures': labels,
               'failed': [{'index': i, 'reason': reason} for i in range(len(labels))]}
        add_row(ctx, rid=f'ng/medium/{metric}/all', metric=metric, reference='NG', build=BUILD['NG'], capture=CAPTURE_ROOT['NG'],
                script=SCRIPT['NG'], matched=None, role='descriptive', values={'n': 0, 'seeds': len(labels)},
                estimator='single', sample=smp, note='no value: ' + note, kind='descriptive', band={'band': None})
    # FTG: time.firstMap (client scene times contended) and time.worst (unmeasured), per size
    for size, rung, pop in FTG_SIZES + [FTG_CITY]:
        fam = f'capture/FTG/{size}'
        members = ftg_sample(ctx, fam, 'x')
        for metric, reason, note in (('time.firstMap', 'contended', 'every client scene time was contended and no capture holds a CPU profile (R-47 (e)); an E19 entry'),
                                     ('time.worst', 'unmeasured', 'no worst-configuration timing exists for FTG at M-1 (R-44)')):
            failed = [{'index': m['order'], 'reason': m['failed'] or reason} for m in members]
            smp = {'family': fam, 'indices': [0, len(members)], 'captures': [m['label'] for m in members], 'failed': failed}
            add_row(ctx, rid=f'ftg/{size}/{metric}/all', metric=metric, reference='FTG', build=ctx.ftg_build['build'],
                    capture=CAPTURE_ROOT['FTG'], script=SCRIPT['FTG'], matched={'rung': rung, 'ftgSize': size, 'population': pop},
                    role='descriptive', values={'n': 0, 'seeds': len(members)}, estimator='single', sample=smp,
                    note='no value: ' + note, kind='descriptive', band={'band': None})


# ---------------------------------------------------------------------------------------------------------------
# the dispersion step (R-10, R-40)
# ---------------------------------------------------------------------------------------------------------------

def dispersion_rows(ctx):
    vec = ctx.src['e09vec']['families']
    sig = ctx.src['e05']['signatureVectors']
    out = {}
    for (fam, rung, size, pre), (fsize, frung, pop) in zip(MFCG_FAMS, FTG_SIZES):
        mv = [v['vector'][:1] + v['companionLanes'][1:5] + v['vector'][5:] for v in vec[fam]]
        mv_r10 = [v['vector'] for v in vec[fam]]
        fmembers = ftg_sample(ctx, f'capture/FTG/{fsize}', 'x')
        bylab = {s['label']: s for s in sig}
        fv = [bylab[m['label']]['vector'] for m in fmembers]
        fw = [bylab[m['label']]['water'] for m in fmembers]
        d = B.dispersion_step(mv, fv)
        d_r10 = B.dispersion_step(mv_r10, fv)
        d_pop = B.dispersion_step(mv, fv, ddof=0)
        # per-water FTG companions (R-40: reported beside as a note), standardised by the same deviations
        dev = d['pooledDeviation']
        wsplit = {}
        for w in ('none', 'coast+river'):
            sub = [v for v, ww in zip(fv, fw) if ww == w]
            val, _ = B.mean_pairwise_distance(sub, dev)
            wsplit[w] = {'n': len(sub), 'dispersion': rnd(val)}
        out[rung] = {'MFCG': rnd(d['MFCG']), 'FTG': rnd(d['FTG']), 'nMFCG': d['nMFCG'], 'nFTG': d['nFTG'],
                     'pooledDeviation': [rnd(x) for x in dev], 'componentsKept': d['componentsKept'],
                     'r10Form': {'MFCG': rnd(d_r10['MFCG']), 'FTG': rnd(d_r10['FTG'])},
                     'ddof0': {'MFCG': rnd(d_pop['MFCG']), 'FTG': rnd(d_pop['FTG'])},
                     'ftgPerWater': wsplit}
        for ref, fam_ref, n, labels in (('MFCG', fam, d['nMFCG'], None), ('FTG', f'capture/FTG/{fsize}', d['nFTG'], [m['label'] for m in fmembers])):
            val = rnd(d[ref])
            values = {'p10': val, 'p50': val, 'p90': val, 'n': n, 'seeds': n}
            if ref == 'MFCG':
                sample, _ = mfcg_sample(ctx, fam, None)
                matched = {'rung': rung, 'mfcgSize': size}
                build, cap = BUILD['MFCG'], CAPTURE_ROOT['MFCG']
                note = (f"mean pairwise distance in z; components by the SD over MFCG {d['nMFCG']} and FTG {d['nFTG']} vectors at the "
                        "rung (R-10, R-40); MFCG way densities over the derived lanes (V12 3.4.1)")
            else:
                sample = {'family': fam_ref, 'indices': [0, len(labels)], 'captures': labels}
                matched = {'rung': frung, 'ftgSize': fsize, 'population': pop}
                build, cap = ctx.ftg_build['build'], CAPTURE_ROOT['FTG']
                note = (f"mean pairwise distance in z; components by the SD over MFCG {d['nMFCG']} and FTG {d['nFTG']} vectors "
                        f"(R-10, R-40); none {wsplit['none']['dispersion']}, coast and river {wsplit['coast+river']['dispersion']}")
            add_row(ctx, rid=f'{ref.lower()}/{rung}/variety.dispersion/all', metric='variety.dispersion', reference=ref,
                    build=build, capture=cap, script=SCRIPT['dispersion'], matched=matched, role='target', values=values,
                    estimator='single', sample=sample, note=note, kind='floor',
                    band={'band': {'rule': 'ours ≥ the larger reference dispersion at the matched rung (a floor)',
                                   'largerReference': rnd(max(d['MFCG'], d['FTG']))}})
    ctx.dispersion = out


# ---------------------------------------------------------------------------------------------------------------
# W-13's bootstrap over W-08's two target rows (the wave-2 verifier's note; E15 section 6)
# ---------------------------------------------------------------------------------------------------------------

def bb_terms(ctx, metric, e):
    bb = B.scalar_band(e['a'], e['b'], e['c'], ctx.sign(metric), ctx.floor(metric))
    return bb['loTerm'], bb['hiTerm']


def w13_addendum(ctx):
    """S-V12-1's test (W-13, V12 section 8.3 (1)) on fg.recoverability and fg.streetwall, which landed after W-13
    ran: the same seeded draws per family (spike_bootstrap.stream), 1 000 resamples, candidates at the edge +- 5 %, a row
    unstable when it flips in more than 5 % of draws. The bands are section 13.5's one-sided forms (recoverability
    >= MFCG - 0.03, streetwall >= MFCG), whose edge rests on the median; the band rule's form is run beside."""
    import spike_bootstrap as SB
    out = []
    for fam, rung, size, pre in MFCG_FAMS:
        usable = ctx.src['e07']['families'][fam]['usable']
        n = len(usable)
        rng = SB.stream(fam)
        draws = [[rng.randrange(n) for _ in range(n)] for _ in range(SB.DRAWS)]
        for metric, off in (('fg.recoverability', -0.03), ('fg.streetwall', 0.0)):
            xs = [mfcg_value(ctx, s, metric, None) for s in usable]
            full = B.estimate(xs)
            for form in ('section 13.5 one-sided', 'band rule (companion)'):
                def edges(e):
                    if form.startswith('section'):
                        return {'lo': e['c'] + off, 'hi': math.inf}
                    bb = B.scalar_band(e['a'], e['b'], e['c'], ctx.sign(metric), ctx.floor(metric))
                    return {'lo': bb['lo'], 'hi': bb['hi']}
                fb = edges(full)
                cands = {'loOut': fb['lo'] - SB.EDGE_REL * abs(fb['lo']), 'loIn': fb['lo'] + SB.EDGE_REL * abs(fb['lo'])}
                if math.isfinite(fb['hi']):
                    cands.update({'hiIn': fb['hi'] - SB.EDGE_REL * abs(fb['hi']), 'hiOut': fb['hi'] + SB.EDGE_REL * abs(fb['hi'])})
                verdict = {k: fb['lo'] <= v <= fb['hi'] for k, v in cands.items()}
                flips = {k: 0 for k in cands}
                row_flips = 0
                los, his = [], []
                for idx in draws:
                    e = B.estimate([xs[i] for i in idx])
                    bb = edges(e)
                    los.append(bb['lo'])
                    his.append(bb['hi'])
                    anyf = False
                    for k, v in cands.items():
                        if (bb['lo'] <= v <= bb['hi']) != verdict[k]:
                            flips[k] += 1
                            anyf = True
                    row_flips += anyf
                out.append({'metric': metric, 'family': fam, 'rung': rung, 'form': form, 'n': n,
                            'band': {'lo': rnd(fb['lo']), 'hi': None if not math.isfinite(fb['hi']) else rnd(fb['hi'])},
                            'flips': flips, 'rowFlips': row_flips, 'rowRate': rnd(row_flips / SB.DRAWS),
                            'unstable': row_flips > SB.UNSTABLE_DRAWS * SB.DRAWS,
                            'loDraws': [SB.pick(los, q) for q in (0.025, 0.5, 0.975)],
                            'hiDraws': [SB.pick(his, q) for q in (0.025, 0.5, 0.975)] if math.isfinite(fb['hi']) else None,
                            'edgeTerms': {'lo': 'MFCG median ' + ('- 0.03' if off else '+ 0') if form.startswith('section') else bb_terms(ctx, metric, full)[0],
                                          'hi': None if form.startswith('section') else bb_terms(ctx, metric, full)[1]},
                            'drawsSha256': hashlib.sha256(json.dumps(draws).encode()).hexdigest()})
    # the outcome with these rows added to W-13's denominator (the stated form)
    e13 = ctx.src['e13']
    base_unstable = sum(1 for r in e13['rows'] if r.get('inDenominator') and r.get('unstable'))
    base_n = sum(1 for r in e13['rows'] if r.get('inDenominator'))
    stated = [r for r in out if r['form'].startswith('section')]
    add_unstable = sum(1 for r in stated if r['unstable'])
    ctx.w13 = {'rows': out, 'drawsEqualW13': None,
               'outcome': {'w13': [base_unstable, base_n], 'withFg': [base_unstable + add_unstable, base_n + len(stated)],
                           'share': rnd((base_unstable + add_unstable) / (base_n + len(stated))),
                           'fires': (base_unstable + add_unstable) / (base_n + len(stated)) > SB.FIRE_ROWS}}
    # the draws are W-13's: compare the first three with E13's per-family record
    fam_first = {f: v.get('firstDraws') for f, v in (e13.get('families') or {}).items()}
    if fam_first:
        ok = True
        for fam, rung, size, pre in MFCG_FAMS:
            rng = SB.stream(fam)
            n = len(ctx.src['e07']['families'][fam]['usable'])
            first = [[rng.randrange(n) for _ in range(n)] for _ in range(3)]
            ok = ok and fam_first.get(fam) == first
        ctx.w13['drawsEqualW13'] = ok


# ---------------------------------------------------------------------------------------------------------------
# R-50 (M-1-rulings-3.md): S-V12-1's stability marker on every flagged target row (lane m1/round3-apply)
# ---------------------------------------------------------------------------------------------------------------

def g3(x):
    """three significant figures, plain digits (R-50's marker form)"""
    t = format(x, '.3g')
    if 'e' in t:
        raise ValueError(f'marker figure {x} needs an exponent')
    return t


def marker_text(rate, lo, hi):
    t = f'S-V12-1 edge noise {rate:.2f}: lo {g3(lo[0])}-{g3(lo[2])}'
    return t + (f', hi {g3(hi[0])}-{g3(hi[2])}' if hi else ' (one-sided)')


def ftg_spike(ctx):
    """R-50 (4): S-V12-1's test, unchanged, on FTG's band-rule target rows with estimator type7: per size one stream
    spike_bootstrap.stream('capture/FTG/<size>') (the label S-V12-1|capture/FTG/<size>), 1 000 draws of the ten slots with
    replacement shared by the size's rows, candidates at each edge +- 5 %, a row flagged when it flips in more than 5 %
    of the draws. Rows with estimator minmax or single are outside the test (R-50 (4))."""
    import spike_bootstrap as SB
    bands = {b['id']: b for b in ctx.bands}
    out = []
    for size in ('BIG_TOWN', 'BIG_CITY', 'METROPOLIS', 'CITY'):
        sel = [r for r in ctx.rows if r['reference'] == 'FTG' and (r.get('matched') or {}).get('ftgSize') == size
               and r['role'] == 'target' and bands[r['id']]['kind'] == 'band rule' and r['estimator'] == 'type7']
        if not sel:
            continue
        mem = {tuple(ctx.vals[r['id']]['members']) for r in sel}
        if len(mem) != 1:
            raise ValueError(f'FTG {size}: the type7 band-rule rows read different slots; one draw set cannot serve them')
        n = len(next(iter(mem)))
        fam = f'capture/FTG/{size}'
        rng = SB.stream(fam)
        draws = [[rng.randrange(n) for _ in range(n)] for _ in range(SB.DRAWS)]
        dsha = hashlib.sha256(json.dumps(draws).encode()).hexdigest()
        for r in sel:
            xs = ctx.vals[r['id']]['vals']
            fspec = {k: v for k, v in (ctx.floor(r['metric']) or {}).items() if k != 'basis'}
            sign = ctx.sign(r['metric'])
            full = SB.MM.estimate(xs)
            b = SB.band(full, sign, fspec)
            cand, zero = SB.candidates(b['lo'], b['hi'], 'edge')
            verdict = {k: SB.inside(cand[k], b) for k in SB.CAND}
            if verdict != SB.CAND_FULL:
                raise ValueError(f"{r['id']}: the candidates' full-sample verdicts are not fail / pass / pass / fail")
            flips = {k: 0 for k in SB.CAND}
            row_flips = 0
            los, his = [], []
            for idx in draws:
                bd = SB.band(SB.MM.estimate([xs[i] for i in idx]), sign, fspec)
                los.append(bd['lo'])
                his.append(bd['hi'])
                anyf = False
                for k in SB.CAND:
                    if SB.inside(cand[k], bd) != verdict[k]:
                        flips[k] += 1
                        anyf = True
                row_flips += anyf
            out.append({'id': r['id'], 'family': fam, 'n': n, 'band': {'lo': rnd(b['lo']), 'hi': rnd(b['hi'])},
                        'edgeTerms': {'lo': b['loTerm'], 'hi': b['hiTerm']}, 'flips': flips, 'rowFlips': row_flips,
                        'rowRate': row_flips / SB.DRAWS, 'unstable': row_flips > SB.UNSTABLE_DRAWS * SB.DRAWS,
                        'zeroEdgeFallback': zero,
                        'loDraws': [SB.pick(los, q) for q in (0.025, 0.5, 0.975)],
                        'hiDraws': [SB.pick(his, q) for q in (0.025, 0.5, 0.975)], 'drawsSha256': dsha,
                        'stream': f'S-V12-1|{fam}'})
    return out


def stability_markers(ctx):
    """R-50 (2), (4), (5): the marker joins the note ('; '), the stability block goes to the row's band entry; no role,
    value, band, estimator or sample changes"""
    rows = {r['id']: r for r in ctx.rows}
    bands = {b['id']: b for b in ctx.bands}
    e13 = ctx.src['e13']
    famsha = {f: v['drawsSha256'] for f, v in e13['families'].items()}
    marks = []
    for r in e13['rows']:
        if not (r.get('inDenominator') and r.get('unstable')):
            continue
        rid = f"mfcg/{r['size']}/plain/{r['metric']}/all" + (f"/{r['field']}" if r.get('field') else '')
        marks.append({'id': rid, 'rate': r['rowRate'], 'lo': r['loDraws'], 'hi': r['hiDraws'],
                      'terms': {'lo': r['band']['loTerm'], 'hi': r['band']['hiTerm']},
                      'drawsSha256': famsha[r['family']],
                      'source': 'E13 rows[] (W-13): rowRate, loDraws / hiDraws (the 2.5 / 50 / 97.5 percentiles of the edge over 1 000 draws)'})
    for w in ctx.w13['rows']:
        if w['form'].startswith('section') and w['unstable']:
            rid = f"mfcg/{w['family'].split('/')[2]}/plain/{w['metric']}/all"
            marks.append({'id': rid, 'rate': w['rowRate'], 'lo': w['loDraws'], 'hi': w['hiDraws'],
                          'terms': w['edgeTerms'], 'drawsSha256': w['drawsSha256'],
                          'source': "E15 w13Addendum (W-15's re-run of W-13's draws on section 13.5's one-sided form)"})
    spike = ftg_spike(ctx)
    for f in spike:
        if f['unstable']:
            marks.append({'id': f['id'], 'rate': f['rowRate'], 'lo': f['loDraws'], 'hi': f['hiDraws'], 'terms': f['edgeTerms'],
                          'drawsSha256': f['drawsSha256'],
                          'source': f"R-50 (4): S-V12-1's test on the FTG type 7 sample, stream {f['stream']}"})
    done = []
    for m in marks:
        r = rows[m['id']]
        if r['role'] != 'target':
            raise ValueError(f"{m['id']}: a marker on a {r['role']} row")
        mk = marker_text(m['rate'], m['lo'], m['hi'])
        r['note'] = note_ok((r['note'] + '; ' if r.get('note') else '') + mk)
        bands[m['id']]['stability'] = {
            'flipShare': rnd(m['rate']), 'loInterval': [rnd(m['lo'][0]), rnd(m['lo'][2])],
            'hiInterval': [rnd(m['hi'][0]), rnd(m['hi'][2])] if m['hi'] else None, 'edgeTerms': m['terms'],
            'drawsSha256': m['drawsSha256'], 'source': m['source'], 'marker': mk,
            'rule': 'R-50 (M-1-rulings-3.md): S-V12-1 flags the row (flips in more than 5 % of 1 000 draws); role, values and band unchanged'}
        done.append({'id': m['id'], 'marker': mk, 'noteLength': len(r['note'])})
    ctx.round3['stability'] = {'marked': done, 'mfcg': sum(1 for d in done if d['id'].startswith('mfcg/')),
                               'ftg': sum(1 for d in done if d['id'].startswith('ftg/')),
                               'ftgSpike': [dict(f, rowRate=rnd(f['rowRate']), loDraws=[rnd(x) for x in f['loDraws']],
                                                 hiDraws=[rnd(x) for x in f['hiDraws']]) for f in spike]}


# ---------------------------------------------------------------------------------------------------------------
# the design seat's hand-off: every recomputed band or reference value a design cell quotes (section, old, new), and
# the passing-to-failing list for the shift record (section 13.5's band rule paragraph)
# ---------------------------------------------------------------------------------------------------------------

S135 = 'ARCHITECTURE 13.5'
SIZES3 = [('BIG_TOWN', '40'), ('BIG_CITY', '80'), ('METROPOLIS', '130')]


def _ftg(metric, sub='all', sizes=('BIG_TOWN', 'BIG_CITY', 'METROPOLIS')):
    return [f'ftg/{z}/{metric}/{sub}' for z in sizes]


def _mfcg(metric, sub='all'):
    return [f'mfcg/{z}/plain/{metric}/{sub}' for _, z in SIZES3]


DESIGN_CELLS = [
    # (section, the cell, the old figure, row ids, old band: ('rule', a, b) | ('single', v) | ('fixedRel', ref) | None)
    (S135 + ' street turning (FTG weakness)', 'share of 10 m steps above 15 deg', 'about 1 % (1.03 % / 0.82 %, the two CITY captures)', _ftg('street.stepHist'), None),
    (S135 + ' street turning (FTG target clause)', 'median turning per 100 m, organic presets', '<M-1>; the declared exception 0.5-1.5 x FTG', _ftg('street.turn100'), None),
    (S135 + ' junction arm angles (FTG)', 'junction median; 4-way share among ways', 'median 90.02 deg; 4-way share 0.28 / 0.30', _ftg('junction.angles', 'all/median') + _ftg('junction.share4'), None),
    (S135 + ' junction arm angles (NG)', '4-way share under the 2 m merge', '0-5 %', ['ng/medium/junction.share4/all'], None),
    (S135 + ' street runs by class (FTG)', 'class medians', 'main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m (formula figures)', _ftg('street.runs', 'all/arterial') + _ftg('street.runs', 'all/street') + _ftg('street.runs', 'all/lane') + _ftg('street.runs', 'all/track'), None),
    (S135 + ' MFCG street signature', 'R4 within 60 m', '0.84-0.97 (all sizes)', _mfcg('bldg.r4.60'), ('rule', 0.84, 0.97)),
    (S135 + ' MFCG street signature', 'R4 within 120 m', '0.58-0.88 (all sizes)', _mfcg('bldg.r4.120'), ('rule', 0.58, 0.88)),
    (S135 + ' MFCG street signature', 'R4 within 250 m', '0.32-0.68 (all sizes)', _mfcg('bldg.r4.250'), ('rule', 0.32, 0.68)),
    (S135 + ' MFCG street signature', 'wall alignment within 40 m: median deviation', '3.5-4.5 deg', _mfcg('bldg.wallAlign.median', 'all/b0_40'), ('rule', 3.5, 4.5)),
    (S135 + ' MFCG street signature', 'wall alignment within 40 m: share within 15 deg', '84-92 %', _mfcg('bldg.wallAlign.share15', 'all/b0_40'), ('rule', 0.84, 0.92)),
    (S135 + ' MFCG street signature', 'wall alignment 40-100 m: share within 15 deg', '56-70 %', _mfcg('bldg.wallAlign.share15', 'all/b40_100'), ('rule', 0.56, 0.70)),
    (S135 + ' MFCG street signature', 'wall alignment 100-200 m: share within 15 deg', '38-58 %', _mfcg('bldg.wallAlign.share15', 'all/b100_200'), ('rule', 0.38, 0.58)),
    (S135 + ' MFCG street signature', 'T / Y share; intramural dead ends; blocks per ha; lots per block', '<M-1>', _mfcg('sgd.tShare') + _mfcg('sgd.deadEnds') + _mfcg('blockc.perHa') + _mfcg('blockc.lotsPer'), None),
    (S135 + ' blocks (NG)', 'block counts per template at medium; block areas', '<M-1>', [f'ng/medium/block.countTemplate/template-{t}' for t in NG_TEMPLATES] + ['ng/medium/block.area/all'], None),
    (S135 + ' deep block interiors', 'court share of deep blocks', '<M-1> (NG and MFCG)', ['ng/medium/block.courtShare/all'] + _mfcg('block.courtShare'), None),
    (S135 + ' bent-cut signature', 'sigma, plain faces', '0.066', ['ng/medium/cut.sigma/plain'], ('fixedRel', 0.066)),
    (S135 + ' bent-cut signature', 'sigma, ring faces', '0.098 (0.100 with the annulus and C-shaped cuts)', ['ng/medium/cut.sigma/ring'], ('fixedRel', 0.098)),
    (S135 + ' bent-cut signature', 'one bend at mid-course; corner within 0.10 of mid-course', '380 / 519 one-bend streets; about 82 % near the middle (DC-38)', ['ng/medium/cut.cornerMid/all'], None),
    (S135 + ' bent-cut signature', 'arrivals at 85 deg or more', '96 %', ['ng/medium/cut.arrival85/all'], None),
    (S135 + ' bent-cut signature', 'filleted one-bend cuts', '53 % (200 / 378)', ['ng/medium/cut.fillet/all'], ('fixedRel', 200 / 378)),
    (S135 + ' bent-cut signature', 'cut lengths per face', '<M-1>', ['ng/medium/cut.length/all'] + [f'ng/medium/cut.length/template-{t}' for t in NG_TEMPLATES], None),
    (S135 + ' figure-ground and streetwall', 'recoverability', '<M-1>', _mfcg('fg.recoverability'), None),
    (S135 + ' figure-ground and streetwall', 'gross cover inside the walls (descriptive)', '0.60-0.64 at sizes 40-130', _mfcg('fg.coverWalled'), None),
    (S135 + ' figure-ground and streetwall', 'streetwall continuity on dense frontages', '<M-1>', _mfcg('fg.streetwall'), None),
    (S135 + ' plots and footprints (FTG)', 'footprint median; p95; quad side; worst-corner p95', 'median 103 m2, p95 154 m2, quad side 10.3 m, worst corner 22.9 deg', _ftg('bldg.area', 'all/median') + _ftg('bldg.area', 'all/p95') + _ftg('bldg.quadSide') + _ftg('bldg.worstCorner'), None),
    (S135 + ' plots and footprints (MFCG, descriptive)', 'footprint median', '225-289 m2 at sizes 40-250', _mfcg('bldg.area', 'all/median'), None),
    (S135 + ' party walls and attachment (NG)', 'per-footprint party-wall share', '0.42-0.46', ['ng/medium/bldg.partyShare/all'], ('rule', 0.42, 0.46)),
    (S135 + ' party walls and attachment (NG)', 'attached share', '0.98-1.00', ['ng/medium/bldg.attached/all'], None),
    (S135 + ' party walls and attachment (FTG, descriptive)', 'party walls; attached', 'residences 0-5 %, industry 96-98 % (per footprint category)', _ftg('bldg.partyShare') + _ftg('bldg.attached'), None),
    (S135 + ' plot-area gradient (NG weakness)', "Moran I on shared-edge adjacency", '-0.18 to +0.05', ['ng/medium/plot.moran/all'], None),
    (S135 + ' walled share and ribbons', 'walled share', '0.87-0.92 at sizes 40-250', _mfcg('walled.share'), ('rule', 0.87, 0.92)),
    (S135 + ' walled share and ribbons', 'ribbon share, size 40', '0.85 (one seed)', [_mfcg('ribbon.share')[0]], ('single', 0.85)),
    (S135 + ' walled share and ribbons', 'ribbon share, size 80', '0.58 (one seed)', [_mfcg('ribbon.share')[1]], ('single', 0.58)),
    (S135 + ' walled share and ribbons', 'ribbon share, size 130', '0.49 (one seed)', [_mfcg('ribbon.share')[2]], ('single', 0.49)),
    (S135 + ' MFCG anchors', 'district areas (the row: per seed the median)', '2.4-17.6 ha on the size-40 gate fixtures (per district); median 19.0 ha at plain size 80 (one seed)', _mfcg('district.area'), None),
    (S135 + ' MFCG anchors', 'wall vertex spacing p50, size 40', '88 m (one seed)', [_mfcg('wall.nodeSpacing')[0]], ('single', 88.0)),
    (S135 + ' MFCG anchors', 'castle area', '0.5-3.2 ha (8.7 at size 130, one seed)', _mfcg('castle.area')[:2], ('rule', 0.5, 3.2)),
    (S135 + ' MFCG anchors', 'castle area, size 130', '8.7 ha (one seed)', [_mfcg('castle.area')[2]], ('single', 8.7)),
    (S135 + ' MFCG anchors', 'plaza area', '0.32-0.58 ha', _mfcg('plaza.area'), ('rule', 0.32, 0.58)),
    (S135 + ' MFCG anchors', 'districts, size 40', '9 (one seed)', [_mfcg('quarter.count')[0]], ('single', 9.0)),
    (S135 + ' MFCG anchors', 'districts, size 80', '12 (one seed)', [_mfcg('quarter.count')[1]], ('single', 12.0)),
    (S135 + ' MFCG anchors', 'districts, size 130', '18 (one seed)', [_mfcg('quarter.count')[2]], ('single', 18.0)),
    (S135 + ' outline anisotropy (FTG)', 'land-sector r90 CV', '0.365 / 0.333 (the two CITY captures)', _ftg('outline.r90cv'), ('rule', 0.333, 0.365)),
    (S135 + ' outline anisotropy (FTG)', 'road / non-road r90 ratio', '1.160 / 1.214 (the two CITY captures)', _ftg('outline.roadRatio'), ('rule', 1.160, 1.214)),
    (S135 + ' towers and gates (FTG)', 'tower spacing median', '39 m (38.65 / 35.59 m by type 7)', _ftg('wall.towerSpacing'), ('rule', 35.59, 38.65)),
    (S135 + ' towers and gates (FTG weakness)', 'arterial crossings at no gate', '3 and 1', _ftg('wall.ungated'), None),
    (S135 + ' towers and gates (MFCG)', 'main gates', '5 / 8 / 12 at sizes 40 / 80 / 130', _mfcg('gate.count'), None),
    (S135 + ' water (FTG)', 'outline step', '50 m resampling on one payload; the second capture pooled 15.7 m', _ftg('water.step'), None),
    (S135 + ' water (FTG)', 'river widths (the channel-width rows, round 3)', "44.0 / 46.1 / 29.8 m, M-1's rows held until the registry carried the renamed id (31 m / 48 m on the two CITY captures)", _ftg('water.channelWidth') + ['ftg/CITY/water.channelWidth/all'], None),
    (S135 + ' water (MFCG, descriptive)', "exported river width, the stress family (round 3)", '84 m at size 80 over three stress seeds (M-1)', ['mfcg/80/river+coast/water.channelWidth/all'], None),
    (S135 + ' draw style (MFCG ink; R-51, DC-40)', 'casing law, round joins, walls after buildings; round caps (descriptive)', 'casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order', [f'mfcg/draw/recorded/{m}/all' for m in ('draw.casingLaw', 'draw.roundJoins', 'draw.wallsAfterBuildings', 'draw.roundCaps')], None),
    (S135 + ' draw style (MFCG ink; R-51, DC-40)', 'wall width at size 40', "6.2 px at size 40's scale (the four-gate fixture, 0.8157 px per m)", ['mfcg/40/plain/draw.widthPx/all/wall'], ('fixedRel', 6.2)),
    (S135 + ' draw style (MFCG ink; R-51, DC-40)', 'tower width at size 40', "12.4 px at size 40's scale (the four-gate fixture)", ['mfcg/40/plain/draw.widthPx/all/tower'], ('fixedRel', 12.4)),
    (S135 + ' draw style (MFCG ink; R-51, DC-40)', 'road-core width at size 40', "6.5 px at size 40's scale (the four-gate fixture)", ['mfcg/40/plain/draw.widthPx/all/roadCore'], ('fixedRel', 6.5)),
    (S135 + ' draw style (MFCG ink; R-51, DC-40)', 'pier width at size 40 (section 8.3 quotes 3.9)', "3.9 px at size 40's scale (the four-gate fixture)", ['mfcg/40/plain/draw.widthPx/all/pier'], ('fixedRel', 3.9)),
    (S135 + ' tree scatter (FTG weakness)', 'nearest-neighbour median; p1', 'median 10.6 m (10.59 / 10.57 m); minimum 0.14 m', _ftg('tree.nnMedian') + _ftg('tree.nnP1'), None),
    (S135 + ' population and buildings', 'persons per building', 'FTG 3.4 (descriptive); MFCG six per lot (weakness)', _ftg('pop.perBuilding') + _mfcg('pop.perBuilding'), None),
    (S135 + ' generation time (FTG weakness)', 'server time at the timed CITY preset', '2.9-3.2 s PUT to OPTIONS; 3.7-4.3 s PUT to layout GET (the row)', ['ftg/CITY/time.model/all'] + _ftg('time.model'), None),
    (S135 + ' draw style (NG hatched)', 'hatch triangles and shadow quads per wing', '18.07 (map means 15.76-21.10) and 2.29 (1.97-2.54) over the 44 plan seeds (DC-36 applied)', ['ng/plan/draw.hatchPerWing/all', 'ng/plan/draw.shadowQuadsPerWing/all'], None),
    (S135 + ' between-seed variety', 'dispersion per rung, MFCG and FTG', '<M-1>', [f'{r}/{g}/variety.dispersion/all' for g in ('TOWN', 'CITY', 'METROPOLIS') for r in ('mfcg', 'ftg')], None),
    (S135 + ' markets (MFCG)', 'secondary markets; adjacent pairs', '0 and 0 in every export (E07)', _mfcg('market.secondary') + _mfcg('market.adjacent'), None),
    (S135 + ' wealth bands (FTG, descriptive)', 'six-tier lifestyle distribution', '<M-1>', [f'ftg/BIG_TOWN/wealth.tier{i}/all' for i in range(1, 7)], None),
    ('ARCHITECTURE 4.7 granularity table, prosperous band anchor', 'MFCG plots per block', 'about 18.6 plots per block (a profiler count of partition leaves, E09 F1)', _mfcg('blockc.lotsPer'), None),
]


def _fmt(x):
    return '-' if x is None else (f'{x:g}' if isinstance(x, (int, float)) else str(x))


def _new_text(row, band):
    v = row['values']
    if 'bins' in v:
        sk = row.get('spreadKS')
        t = f"n {v['n']} over {v['seeds']} seeds" + (f"; spreadKS p90 {_fmt(sk['p90'])} ({sk['pairs']} pairs)" if sk else '')
    elif v.get('n', 0) == 0:
        t = 'no value (values.n 0)'
    else:
        t = f"{_fmt(v['p50'])} [{_fmt(v['p10'])}, {_fmt(v['p90'])}] {row['estimator']} n {v['seeds']}"
    b = (band or {}).get('band')
    if isinstance(b, dict):
        if b.get('lo') is not None or b.get('hi') is not None:
            t += f"; band {_fmt(b.get('lo'))} to {_fmt(b.get('hi'))}"
        if b.get('ksMax') is not None:
            t += f"; KS ceiling {_fmt(rnd(b['ksMax']))}"
        if b.get('text') and b.get('lo') is None and b.get('hi') is None:
            t += f"; {b['text']}"
    return t


def design_handoff(ctx):
    rows = {r['id']: r for r in ctx.rows}
    held = {h['row']['id']: h['row'] for h in ctx.heldRows}
    bands = {b['id']: b for b in ctx.bands}
    out, flips, missing = [], [], []
    for section, cell, old, ids, oldspec in DESIGN_CELLS:
        news = []
        for rid in ids:
            r = rows.get(rid) or held.get(rid)
            if r is None:
                missing.append(rid)
                continue
            news.append({'row': rid, 'new': _new_text(r, bands.get(rid)) + (' (held, E15 F2)' if rid in held else '')})
            if oldspec and rid in rows:
                metric = r['metric']
                field = rid.split('/')[-1] if rid.count('/') >= 4 and rid.split('/')[-2] == 'all' else None
                nb = (bands.get(rid) or {}).get('band')
                if oldspec[0] == 'rule':
                    a, b2 = oldspec[1], oldspec[2]
                    ob = B.scalar_band(a, b2, (a + b2) / 2, ctx.sign(metric), ctx.floor(metric))
                    how = 'the band rule on the quoted range, its centre taken at the midpoint (the cell gives no median)'
                elif oldspec[0] == 'single':
                    ob = B.scalar_band(oldspec[1], oldspec[1], oldspec[1], ctx.sign(metric), ctx.floor(metric))
                    how = "the band rule's single-value form on the quoted one-seed figure"
                else:
                    ob = B.fixed_band(metric, field, oldspec[1])
                    how = "the fixed band around the old reference value"
                lost = B.lost_intervals(ob, nb)
                rec = {'row': rid, 'section': section, 'cell': cell, 'oldBand': {'lo': rnd(ob['lo']), 'hi': rnd(ob['hi'])},
                       'newBand': {'lo': nb.get('lo'), 'hi': nb.get('hi')} if isinstance(nb, dict) else None,
                       'oldFormedBy': how, 'passingToFailing': [[rnd(x) if x is not None else None for x in iv] for iv in lost]}
                flips.append(rec)
        out.append({'section': section, 'cell': cell, 'old': old, 'new': news})
    ctx.handoff = out
    ctx.flips = flips
    ctx.handoffMissing = missing


# ---------------------------------------------------------------------------------------------------------------
# assembly
# ---------------------------------------------------------------------------------------------------------------

def build(ctx):
    ftg_rows(ctx)
    mfcg_rows(ctx)
    ng_rows(ctx)
    time_rows(ctx)
    dispersion_rows(ctx)
    ctx.round3['appended'] = [r['id'] for r in ctx.appended]
    ctx.rows.extend(ctx.appended)       # round 3: after the first candidate's rows
    w13_addendum(ctx)
    stability_markers(ctx)
    design_handoff(ctx)
    pins = [{'reference': 'FTG', 'build': ctx.ftg_build['build'], 'since': 'M-1'},
            {'reference': 'MFCG', 'build': BUILD['MFCG'], 'since': 'M-1'},
            {'reference': 'NG', 'build': BUILD['NG'], 'since': 'M-1'}]
    candidate = {'schema': 'plat.baselines/2', 'metricsVersion': ctx.metricsVersion, 'pins': pins,
                 'rows': ctx.rows, 'crossings': []}
    return candidate


def e15_json(ctx, candidate):
    from collections import Counter
    roles = Counter(r['role'] for r in ctx.rows)
    refs = Counter(r['reference'] for r in ctx.rows)
    return {'schema': 'm1.e15/1', 'record': 'docs/calibration/E15-baselines.md', 'workItem': 'W-15', 'lane': 'm1/W-15',
            'continuedBy': {'lane': 'm1/round3-apply', 'rulings': 'docs/calibration/M-1-rulings-3.md (R-50, R-51)',
                            'record': 'E15 section 13'},
            'date': DATE, 'provenance': PROVENANCE, 'scripts': ['research:baselines/rows.py', 'research:baselines/bands.py',
                                                                 'research:baselines/cross_check.py'],
            'inputs': ctx.inputs, 'candidate': {'path': 'research/baselines/candidates/baselines.json',
                                                'rows': len(ctx.rows), 'byRole': dict(roles), 'byReference': dict(refs)},
            'ftgBuild': ctx.ftg_build, 'dispersion': ctx.dispersion, 'w13Addendum': ctx.w13,
            'designHandoff': ctx.handoff, 'handoffMissingRows': ctx.handoffMissing, 'flips': ctx.flips, 'bands': ctx.bands,
            'heldRows': ctx.held + [{'deliverable': 'D26 / D35', 'metrics': [h['row']['metric']], 'reason': h['reason'],
                                     'row': h['row']} for h in ctx.heldRows], 'noRow': ctx.noRow,
            'round3': dict(ctx.round3, renamed={'id': 'water.channelWidth', 'readsSourceKeyOf': 'E05 and E07 (the key their tools wrote)',
                                                'by': 'E15 F2; design/m1-corrections-2 (V12 3.4.2); the registry at m1/round3-apply'},
                           resolvedHeld=[{'deliverable': 'D26 / D35', 'rows': 5, 'how': 'the registry id water.channelWidth (F2)'},
                                         {'deliverable': 'D28', 'rows': 8, 'how': "R-51: the recorded draw family (four rows) and draw.widthPx on capture/MFCG/40/plain (four fields)"}]),
            'receipts': {'total': len(ctx.receipts), 'failed': [r[:2] for r in ctx.receipts if not r[2]],
                         'byKind': dict(Counter(r[0] for r in ctx.receipts))}}


def run(write):
    ctx = Ctx()
    cand = build(ctx)
    e15 = e15_json(ctx, cand)
    texts = {CANDIDATE: canon(cand), E15_JSON: canon(e15)}
    if write:
        os.makedirs(os.path.dirname(CANDIDATE), exist_ok=True)
        for p, t in texts.items():
            with open(p, 'w') as fh:
                fh.write(t)
        print(f"wrote {len(ctx.rows)} rows; receipts {len(ctx.receipts)}, failed {len(e15['receipts']['failed'])}")
        for p, t in texts.items():
            print(os.path.relpath(p, ROOT), hashlib.sha256(t.encode()).hexdigest()[:16])
        return 0
    ok = True
    for p, t in texts.items():
        same = os.path.exists(p) and open(p).read() == t
        print(('SAME ' if same else 'DIFFERS ') + os.path.relpath(p, ROOT))
        ok = ok and same
    return 0 if ok else 1


def red():
    """five planted faults, each in memory on one input: the receipt that reads that input must fail and the
    candidate must differ from the written one; nothing is written"""
    written = open(CANDIDATE).read() if os.path.exists(CANDIDATE) else None
    plants = [
        ('E05: slot 0 street.turn100 + 1', lambda c: c.src['e05']['perSlot'][0]['metrics']['street.turn100'].__setitem__(
            'value', c.src['e05']['perSlot'][0]['metrics']['street.turn100']['value'] + 1), 'E05'),
        ('E07: size40-plain-0 bldg.r4.60 + 0.1', lambda c: c.src['e07']['perSeed']['size40-plain-0']['bldg.r4.60'].__setitem__(
            'median', c.src['e07']['perSeed']['size40-plain-0']['bldg.r4.60']['median'] + 0.1), 'E07/E08/E09 summary'),
        ('E11: the first pooled street.detour + 0.5', lambda c: c.src['e11']['mediumPooled']['scalars']['street.detour']['perSeed'].__setitem__(
            0, c.src['e11']['mediumPooled']['scalars']['street.detour']['perSeed'][0] + 0.5), 'E11 estimate'),
        ('E07 draw: the first recording loses a round join', lambda c: c.src['e07fix']['draw']['2026-09-21T05-03-24/gen-0'].__setitem__(
            'roundJoins', c.src['e07fix']['draw']['2026-09-21T05-03-24/gen-0']['roundJoins'] - 400), 'E07 draw'),
        ('E07 widths: size40-plain-0 wall + 0.5', lambda c: c.src['e07widths']['families']['capture/MFCG/40/plain']['perSeed']['size40-plain-0'].__setitem__(
            'wall', c.src['e07widths']['families']['capture/MFCG/40/plain']['perSeed']['size40-plain-0']['wall'] + 0.5), 'E07 widths'),
    ]
    bad = 0
    for name, plant, kind in plants:
        ctx = Ctx()
        plant(ctx)
        cand = build(ctx)
        failed = [r for r in ctx.receipts if not r[2] and r[0] == kind]
        differs = canon(cand) != written
        ok = bool(failed) and differs
        bad += not ok
        print(('RED ' if ok else 'MISSED ') + name + f'  ({len(failed)} {kind} receipts fail; candidate differs: {differs})')
    return 0 if bad == 0 else 1


if __name__ == '__main__':
    if '--red' in sys.argv:
        sys.exit(red())
    if '--write' in sys.argv:
        sys.exit(run(True))
    if '--check' in sys.argv:
        sys.exit(run(False))
    print(__doc__)
