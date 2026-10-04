#!/usr/bin/env python3
"""research/baselines/measure_ftg_slots.py -- M-1 work item W-05b: FTG measured values per plan slot (vectors, no
dispersion; no rows -- R-40, R-47).

Lane m1/W-05b (docs/calibration/M-1-plan.md section 2, row W-05b; record docs/calibration/E05-ftg-metrics.md section 9).
Research side only; our own code, standard library (plus PIL through measure_ftg.py). It drives the two landed W-05
scripts -- adapters/ftg.py (payload -> MeasureInput, unchanged) and measure_ftg.py's metrics() (every FTG metric of D14,
D25, D26 and the R-10 signature vector: the metric half of its measure(), split out unchanged by this lane; the twin
half is tied to the two CITY fixtures) -- over the slots research/baselines/plan.json has bound, and adds what the
row asks beyond them:

  per slot     the MeasureInput file (kept for W-15 and M1's `plat measure`), every metric value, the signature vector,
               the server interval (time.model, R-21) and the client-side times with their contention flag (R-47 (e))
  per size     the samples W-15 forms into rows (R-34): the slots in plan order (`captures`), n and the estimator V12
               section 3.5.1 gives at that n, each metric's per-slot values; the water rows over the coast+river slots
               only; the recorded CITY family's usable capture (R-02) and its failed one in `failed` (R-04)
  beside them  the outline band's inputs (DC-11); the street-turning sample beside the declared exception, with the
               type7 band printed once a size holds ten slots (DC-35); the open and failed slots listed with status
  checks       W-05b's checker column: (1) each slot's MeasureInput equals a fresh run (bytes and JSON); (2) every
               sample's captures equal the plan's slots in order, grouped by what each request says (size, water);
               (3) the 2026-09-25 payload is in no sample (R-04); (4) E02's same-size values (its latest
               size-dependent table: section 10.3, then each first-of-size section under R-41) are reproduced from
               each capture's own PUT body, and every later capture of a size repeats its first
  a pass       reads the slots decided (bound or failed) when it starts, through slot K; a slot decided later has a
               higher number (plan.py binds in slot order) and belongs to the next pass (the checks report it)

No dispersion is formed here (R-40: W-15 forms both references' variety dispersions over the union of vectors). No band
is formed except the type7 turning band DC-35 asks W-05b to print. The record carries numbers, metric ids and our own
words only; request key names stay in this script, as in ftg_capture_post.py.

Usage (project root):
  python3 research/baselines/measure_ftg_slots.py [--write] [--through K] [--json OUT] [--md OUT]
      measure every bound slot (and the recorded CITY family's usable capture; --through K stops at slot K, to re-run a
      pass's snapshot), write OUT (default
      docs/calibration/E05-ftg-metrics.slots.json); --write writes a missing MeasureInput file (an existing one is never
      overwritten: it must equal the fresh run); --md writes E05 section 9's tables to OUT
  python3 research/baselines/measure_ftg_slots.py --check [--red] [--json IN]
      re-run the row's four checks from IN plus fresh adapter runs and the requests (no metric is re-measured);
      exit 1 unless all pass; --red plants one fault per check (each must then fail) and writes nothing
"""
import collections
import datetime
import gzip
import hashlib
import json
import math
import os
import re
import sys
import tempfile

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(HERE, 'adapters'))
sys.path.insert(0, HERE)
import ftg as A  # noqa: E402
import measure_ftg as M  # noqa: E402

SCRIPT = 'research:baselines/measure_ftg_slots.py'
PLAN = os.path.join(HERE, 'plan.json')
E02_MD = os.path.join(ROOT, 'docs', 'calibration', 'E02-ftg-captures.md')
E02_JSON = os.path.join(ROOT, 'docs', 'calibration', 'E02-ftg-captures.json')
JSON_DEFAULT = os.path.join(ROOT, 'docs', 'calibration', 'E05-ftg-metrics.slots.json')
EXCLUDED_CAPTURE = '2026-09-25T10-13-51'          # R-04: a declared non-default setting, never pooled
EXCLUDED_HASH = 'ba02af9ca044'
ROW_SIZES = ('BIG_TOWN', 'BIG_CITY', 'METROPOLIS', 'CITY')   # FtgSize members with rows (R-34); TOWN research-side
WATER_ROWS = ('water.step', 'water.riverWidth')               # read only coast+river slots (R-33, R-34)

# The per-slot scalar each sample carries, with R-34's bucket (informational: W-15 forms the rows; R-48 moved
# water.step to the fixed bound). (row key, metric id, key path inside the metric's value, bucket)
SCALARS = [
    ('street.turn100', 'street.turn100', 'value', 'target, declared exception (DC-35)'),
    ('street.stepHist.shareAbove15', 'street.stepHist', 'shareAbove15', 'weakness'),
    ('street.entropy50', 'street.entropy50', 'value', 'weakness'),
    ('junction.angles.median', 'junction.angles', 'median', 'fixed band (R-34)'),
    ('junction.angles.p5', 'junction.angles', 'p5', 'fixed band (R-34)'),
    ('junction.angles.share80to100', 'junction.angles', 'share80to100', 'fixed band (R-34)'),
    ('junction.share4', 'junction.share4', 'value', 'fixed band (R-34)'),
    ('street.runs.arterial', 'street.runs', 'arterial.median', 'band rule'),
    ('street.runs.street', 'street.runs', 'street.median', 'band rule'),
    ('street.runs.lane', 'street.runs', 'lane.median', 'band rule'),
    ('street.runs.track', 'street.runs', 'track.median', 'band rule'),
    ('bldg.area.median', 'bldg.area', 'median', 'fixed band (R-34)'),
    ('bldg.area.p95', 'bldg.area', 'p95', 'fixed band (R-34)'),
    ('bldg.quadSide', 'bldg.quadSide', 'value', 'fixed band (R-34)'),
    ('bldg.worstCorner', 'bldg.worstCorner', 'value', 'fixed band (R-34)'),
    ('bldg.partyShare', 'bldg.partyShare', 'value', 'descriptive'),
    ('bldg.attached', 'bldg.attached', 'value', 'descriptive'),
    ('wall.towerSpacing', 'wall.towerSpacing', 'value', 'band rule'),
    ('wall.ungated', 'wall.ungated', 'value', 'weakness'),
    ('gate.count', 'gate.count', 'value', 'fixed band (R-34)'),
    ('water.step', 'water.step', 'value', 'fixed bound <= 25 m (R-48)'),
    ('water.riverWidth', 'water.riverWidth', 'value', 'band rule per class (R-48)'),
    ('tree.nnP1', 'tree.nnP1', 'value', 'weakness'),
    ('tree.nnMedian', 'tree.nnMedian', 'value', 'weakness'),
    ('pop.perBuilding', 'pop.perBuilding', 'value', 'descriptive'),
    ('time.model', 'time.model', 'value', 'weakness (server interval, R-21)'),
    ('outline.r90cv', 'outline.r90cv', 'value', 'band rule (DC-11)'),
    ('outline.roadRatio', 'outline.roadRatio', 'value', 'band rule (DC-11)'),
] + [('wealth.tier%d' % k, 'wealth.tier%d' % k, 'value', 'descriptive') for k in range(1, 7)]

# E02 section 10.3's size-dependent table: our row words -> the request leaf (research-side script only) and the
# factor from the request value to the table's unit
E02_ROWS = {
    'stage 1: branch segments, first direction': (('layoutParameters', 'stages', 0, 'horizontalBranchSegments'), 1),
    'stage 1: branch segments, second direction': (('layoutParameters', 'stages', 0, 'verticalBranchSegments'), 1),
    'stage 1: minimum district area (ha)': (('layoutParameters', 'stages', 0, 'minDistrictArea'), 1e-4),
    'stage 1: building share': (('layoutParameters', 'stages', 0, 'proportionOfBuildings'), 1),
    'stage 1: spoke probability': (('layoutParameters', 'stages', 0, 'spokeStaySpokeProbability'), 1),
    'stage 1: most spokes': (('layoutParameters', 'stages', 0, 'maxSpokesInStage'), 1),
    'stage 1: main-road step (m)': (('layoutParameters', 'stages', 0, 'roadLength'), 1),
    'stage 2: branch segments, first direction': (('layoutParameters', 'stages', 1, 'horizontalBranchSegments'), 1),
    'stage 2: branch segments, second direction': (('layoutParameters', 'stages', 1, 'verticalBranchSegments'), 1),
    'stage 2: minimum district area (ha)': (('layoutParameters', 'stages', 1, 'minDistrictArea'), 1e-4),
    'stage 2: building share': (('layoutParameters', 'stages', 1, 'proportionOfBuildings'), 1),
    'stage 2: main-road step (m)': (('layoutParameters', 'stages', 1, 'roadLength'), 1),
    'stage 2: most spokes': (('layoutParameters', 'stages', 1, 'maxSpokesInStage'), 1),     # joined at slot 6 (R-41)
    'random-faction count': (('factionsParameters', 'numberOfRandomFactions'), 1),
    'shop probability, inside the settlement': (('buildingsParameters', 'defaultInsideSettlementShopProbability'), 1),
    'shop probability, outside the settlement': (('buildingsParameters', 'defaultOutsideSettlementShopProbability'), 1),
    'religious-workers share': (('religionParameters', 'religionTargetPercentage'), 1),
}
# E02's size-dependent tables (section 10.3, then each first-of-size section under R-41, e.g. 17.3): a header row
# '| value | <FtgSize> (...) | ... | in the class since |'. The LAST such table is the current class; its size columns are
# read from the header (the first word of each cell naming an FtgSize), so a column or a row R-41 adds is read without a
# code change, and a row the tool cannot map to a request leaf fails check 4
E02_HEADER = re.compile(r'^\s*\| value \| (TOWN|CITY|BIG_TOWN|BIG_CITY|METROPOLIS) \(.*\| in the class since \|\s*$')
FTG_SIZES = ('TOWN', 'CITY', 'BIG_TOWN', 'BIG_CITY', 'METROPOLIS')


def q7(v, p):
    return M.q7(v, p)


def estimator(n):
    """V12 section 3.5.1's estimator at n seeds"""
    return 'type7' if n >= 10 else 'minmax' if n >= 2 else 'single' if n == 1 else 'none'


def sha(path_or_bytes):
    if isinstance(path_or_bytes, bytes):
        return hashlib.sha256(path_or_bytes).hexdigest()
    return hashlib.sha256(open(path_or_bytes, 'rb').read()).hexdigest()


def rel(p):
    return os.path.relpath(p, ROOT)


def dig(o, path):
    for k in path:
        o = o[k]
    return o


def get_scalar(met, mid, keypath):
    v = met.get(mid)
    for k in keypath.split('.'):
        if v is None:
            return None
        v = v.get(k) if isinstance(v, dict) else None
    return v


# ---------------------------------------------------------------- the plan's slots
def plan_slots():
    plan = json.load(open(PLAN))
    f = plan['ftg']
    slots = []
    for s in f['slots']:
        status = 'failed' if s.get('failed') else 'bound' if s.get('capture') else 'open'
        slots.append(dict(slot=s['slot'], programme=s.get('programme'), label=s['label'], ftgSize=s['ftgSize'],
                          rung=s['rung'], water=s['water'], nominalPopulation=s.get('nominalPopulation'),
                          capture=s.get('capture'), failed=s.get('failed'), status=status, recorded=False))
    recorded = []
    for r in f.get('recordedCity', []):
        recorded.append(dict(slot=None, programme=None, label=r['label'], ftgSize=r['ftgSize'], rung=r['rung'],
                             water=r['water'], nominalPopulation=r.get('nominalPopulation'), capture=r['capture'],
                             failed=r.get('failed'), status='bound' if r.get('status') == 'usable' else 'failed',
                             recorded=True, order=r.get('order')))
    return slots, recorded, sha(PLAN)


def measured_list(slots, recorded):
    """the captures to measure, in plan order: the bound slots by slot number, then the recorded family's usable ones"""
    return [s for s in slots if s['status'] == 'bound'] + [r for r in recorded if r['status'] == 'bound']


# ---------------------------------------------------------------- the MeasureInput, fresh against stored
def fresh_vs_stored(stamp, write_missing=False):
    mi, D, prov = A.adapt(stamp)
    path = A.out_path(mi, stamp)
    with tempfile.TemporaryDirectory() as td:
        tmp = os.path.join(td, 'fresh.metric.geojson.gz')
        A.write(mi, tmp)
        fresh = sha(tmp)
    wrote = False
    if not os.path.exists(path) and write_missing:
        A.write(mi, path)
        wrote = True
    stored = sha(path) if os.path.exists(path) else None
    same_json = None
    if stored:
        same_json = json.dumps(A.read(path), sort_keys=True) == json.dumps(json.loads(json.dumps(mi)), sort_keys=True)
    if wrote:
        print('wrote %s' % rel(path), file=sys.stderr)    # run state stays out of the record, so reruns are byte-identical
    return dict(measureInput=rel(path), storedSha256=stored, freshSha256=fresh, bytesEqual=stored == fresh,
                jsonEqual=same_json, gzBytes=os.path.getsize(path) if stored else None), mi, prov


# ---------------------------------------------------------------- client-side times (R-47 (e))
def client_times(stamp, prov):
    """t0 = the PUT sent (network index); the layout GET sent (time.model); the layout body at the client (the
    Fetch-interceptor's body file, written as the response reached the browser); the first map shot (the seat's
    after-create shot, logged when its file was written; its README says it shows the map). The scene-build moment
    of section 12.9 (read from CPU-profile script bursts) is not recoverable: these captures carry no CPU profile."""
    cap = os.path.join(ROOT, 'captures', 'ftg', stamp)
    if prov['putSession'] != stamp:
        return {'available': False, 'reason': 'the payload is a re-load in a later session (PUT in %s); the create '
                'session holds no interceptor record of this load' % prov['putSession']}
    rows = A.session_rows(stamp)
    put = [r for r in rows if r.get('method') == 'PUT' and r.get('postData') and '/settlements' in r.get('url', '')][0]
    get = [r for r in rows if r.get('method') == 'GET' and '/layout' in r.get('url', '') and not r.get('intercepted')
           and r.get('ts', 0) > put['ts']]
    lay = [r for r in rows if r.get('intercepted') and '/layout' in r.get('url', '') and str(r.get('bodyFile', '')).endswith('.bin')]
    t0 = put['ts']
    body = os.path.join(cap, 'session', 'network', 'bodies', lay[0]['bodyFile'])
    at_client = os.stat(body).st_mtime - t0
    shot = None
    steps = os.path.join(cap, 'steps', 'steps.jsonl')
    if os.path.exists(steps):
        for line in open(steps):
            d = json.loads(line)
            if d.get('cmd') == 'shot' and d.get('rest') and d['rest'][0] == 'after-create':
                t = datetime.datetime.strptime(d['t'], '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=datetime.timezone.utc).timestamp()
                shot = t - t0
                break
    facts_p = os.path.join(cap, 'capture-facts.json')
    facts = json.load(open(facts_p)) if os.path.exists(facts_p) else {}
    get_s = min(r['ts'] for r in get) - t0 if get else None
    order_ok = get_s is not None and 0 < get_s < at_client and (shot is None or at_client < shot)
    return {'available': True, 't0': 'PUT sent (index.jsonl ts; the create click precedes it by an unlogged client delay)',
            'layoutGetSentS': round(get_s, 3) if get_s is not None else None,
            'layoutAtClientS': round(at_client, 3),
            'firstMapShotS': round(shot, 3) if shot is not None else None,
            'sceneBuildS': None,
            'sceneBuildReason': 'not recoverable: no CPU profile was recorded (E02); section 12.9 read 6.4-7.0 s from CPU-profile script bursts',
            'payloadEncodedBytes': next((r.get('encodedBytes') for r in get), None),
            'orderPutGetClientShot': order_ok,
            'contended': facts.get('serverTimeContended'),
            'contentionSource': 'capture-facts.json serverTimeContended (M0 build seats shared the machine, E02)'}


# ---------------------------------------------------------------- E02's size-dependent values
def e02_table():
    """E02 section 10.3's table: {row words: {FtgSize: value}}; the size columns are the header cells whose first word
    is an FtgSize"""
    lines = open(E02_MD).read().split('\n')
    start = max(i for i, ln in enumerate(lines) if E02_HEADER.match(ln))     # the latest table is the current class
    out, cols, on = {}, None, False
    for ln in lines[start:]:
        ln = ln.replace('**', '')
        if E02_HEADER.match(ln):
            on = True
            head = [c.strip() for c in ln.strip().strip('|').split('|')]
            cols = [(i, h.split()[0]) for i, h in enumerate(head) if i > 0 and h.split() and h.split()[0] in FTG_SIZES]
            continue
        if on:
            s = ln.strip()
            if s.startswith('|---'):
                continue
            if not s.startswith('|'):
                if out:
                    break
                continue
            cells = [c.strip() for c in s.strip('|').split('|')]
            out[cells[0]] = {size: float(cells[i]) for i, size in cols}
    return out


def request_size_values(req):
    return {k: round(float(dig(req, path)) * f, 6) for k, (path, f) in E02_ROWS.items()}


# ---------------------------------------------------------------- water outlines, per body (a note beside water.step)
def water_outline_detail(mi):
    """per water body: its class, vertex count, the raw vertex-spacing median, the vertices left after water.step's
    one-pass drop of vertices turning < 1 degree (W05-D8) and the body's own step after that drop. Not a registered
    metric: it shows what the pooled water.step mixes (E05 section 9.3)."""
    out = []
    for f in M.feats(mi, 'water'):
        R = M.ring_open(f['geometry']['coordinates'][0])
        n = len(R)
        raw = [M.dist(R[i], R[(i + 1) % n]) for i in range(n)]
        kept = 0
        for i in range(n):
            a, v, b = R[i - 1], R[i], R[(i + 1) % n]
            h1 = math.atan2(v[1] - a[1], v[0] - a[0])
            h2 = math.atan2(b[1] - v[1], b[0] - v[0])
            if abs(M.wrap180(math.degrees(h2 - h1))) >= 1.0:
                kept += 1
        one = dict(mi, features=[f])
        out.append({'class': f['props'].get('class'), 'vertices': n, 'rawStepMedianM': round(q7(raw, .5), 2),
                    'keptAfter1deg': kept, 'stepAfterDropM': M.m_water(one)['water.step']['value']})
    return out


# ---------------------------------------------------------------- measure
def measure_all(write_missing, through_limit=None):
    slots, recorded, plan_hash = plan_slots()
    if through_limit is not None:            # re-run a pass's snapshot: later slots read as open (W05b-D9)
        slots = [dict(s, status='open', capture=None, failed=None) if s['slot'] > through_limit else s for s in slots]
    todo = measured_list(slots, recorded)
    through = max([s['slot'] for s in slots if s['status'] != 'open'] or [-1])
    per = []
    for s in todo:
        stamp = s['capture']
        fv, mi, prov = fresh_vs_stored(stamp, write_missing)
        if not fv['storedSha256']:
            raise SystemExit('%s: no MeasureInput file (run with --write)' % stamp)
        # the metrics are measured on the STORED file (what W-15 and M1 re-run), through measure_ftg.metrics() -- the
        # metric half of measure_ftg.measure(); its twin half is tied to the two CITY fixtures and is not run here
        stored = A.read(A.out_path(mi, stamp))
        met = M.metrics(stored)
        req = prov['request']
        census = stored['research']['census']
        entry = dict(
            slot=s['slot'], programme=s['programme'], label=s['label'], capture=stamp, recorded=s['recorded'],
            planSize=s['ftgSize'], planWater=s['water'], rung=s['rung'],
            requestSize=stored['research']['ftgSize'], requestWater=stored['header']['water'],
            referenceBuild=stored['header']['build'], population=stored['header']['population'],
            populationSource=stored['research']['populationSource'],
            counts={k: census[k] for k in ('edges', 'nodes', 'buildings', 'towers', 'districts', 'waterBodies', 'trees')},
            waterClasses=census['waterClasses'], borderHalfWidthM=census['borderHalfWidthM'],
            droppedDegenerate=census['dropped'],
            measureInput=fv,
            serverTimeS=stored['research']['serverTimeS'], clientTimes=client_times(stamp, prov),
            sizeValues=request_size_values(req),
            waterOutlines=water_outline_detail(stored),
            metrics=met)
        per.append(entry)
        print('measured %s %s %s %s' % (s['label'], stamp, entry['referenceBuild'], 'MI ok' if fv['bytesEqual'] else 'MI DIFFERS'),
              file=sys.stderr)
    return slots, recorded, plan_hash, per, through


def samples_of(per, slots, recorded):
    """per FtgSize: the slots in plan order (grouped by what each request says) and each scalar's values"""
    out = {}
    for size in ROW_SIZES + ('TOWN',):
        mine = [p for p in per if p['requestSize'] == size]
        mine.sort(key=lambda p: (p['recorded'], p['slot'] if p['slot'] is not None else 0))
        # the recorded family's members come first in the family's order (R-02, R-33): CITY/coast+river/0 is order 0
        if size == 'CITY':
            mine.sort(key=lambda p: (0 if p['recorded'] else 1, p['slot'] if p['slot'] is not None else 0))
        water = [p for p in mine if p['requestWater'] == 'coast+river']
        planned = [s for s in slots if s['ftgSize'] == size]
        rec = [r for r in recorded if r['ftgSize'] == size]
        failed = [dict(label=r['label'], capture=r['capture'], reason=r['failed']) for r in rec if r['status'] == 'failed']
        failed += [dict(label=s['label'], capture=s['capture'], reason=s['failed']) for s in planned if s['status'] == 'failed']
        vals = {}
        for key, mid, kp, bucket in SCALARS:
            src = water if key in WATER_ROWS else mine
            vals[key] = {'values': [get_scalar(p['metrics'], mid, kp) for p in src], 'bucket': bucket,
                         'over': 'coast+river' if key in WATER_ROWS else 'all'}
        vals['tree.pcf'] = {'values': [p['metrics']['tree.pcf']['value'] for p in mine], 'bucket': 'weakness',
                            'over': 'all', 'fields': 'r1..r20 (m)'}
        out[size] = {
            'rung': (planned or rec or [{'rung': None}])[0]['rung'],
            'rows': size in ROW_SIZES,
            'captures': [p['label'] for p in mine], 'stamps': [p['capture'] for p in mine],
            'slots': [p['slot'] for p in mine],
            'referenceBuilds': [p['referenceBuild'] for p in mine],
            'n': len(mine), 'estimatorAtN': estimator(len(mine)),
            'waterRows': {'captures': [p['label'] for p in water], 'stamps': [p['capture'] for p in water],
                          'n': len(water), 'estimatorAtN': estimator(len(water))},
            'plannedSlots': len(planned) + len(rec), 'openSlots': [s['slot'] for s in planned if s['status'] == 'open'],
            'failed': failed, 'values': vals,
        }
    return out


def turning_beside_exception(samples):
    """DC-35: the street-turning sample per matched size beside the declared exception 0.5-1.5 x FTG's median; the
    type7 [p10, p90] band printed only at n >= 10"""
    out = {}
    for size in ('BIG_TOWN', 'BIG_CITY', 'METROPOLIS'):
        v = [x for x in samples[size]['values']['street.turn100']['values'] if x is not None]
        if not v:
            out[size] = {'n': 0, 'note': 'no slot bound yet'}
            continue
        med = q7(v, .5)
        out[size] = {'n': len(v), 'values': v, 'median': round(med, 3),
                     'declaredException': [round(0.5 * med, 3), round(1.5 * med, 3)],
                     'sampleRange': [min(v), max(v)],
                     'type7Band': [round(q7(v, .1), 3), round(q7(v, .9), 3)] if len(v) >= 10 else None,
                     'note': 'type7 band printed at n >= 10 (V12 section 3.5.1); n = %d now' % len(v) if len(v) < 10 else
                     'type7 band over the ten slots'}
    return out


def vectors_of(per):
    return [dict(slot=p['slot'], label=p['label'], capture=p['capture'], ftgSize=p['requestSize'], rung=p['rung'],
                 water=p['requestWater'], referenceBuild=p['referenceBuild'],
                 components=p['metrics']['variety.signature']['components'],
                 vector=p['metrics']['variety.signature']['vector'],
                 builtRadiusM=p['metrics']['variety.signature']['builtRadiusM']) for p in per]


# ---------------------------------------------------------------- the row's four checks
def run_checks(doc, red=False):
    """doc: the slots JSON (or the in-memory equivalent). Re-derives everything a check needs from the plan, fresh
    adapter runs and the requests; reads the measured values only for the sample membership."""
    C = []

    def ck(cid, name, ok, receipt):
        C.append({'id': cid, 'check': name, 'passed': bool(ok), 'receipt': receipt})
    slots, recorded, plan_hash = plan_slots()
    # The pass's snapshot: the slots decided (bound or failed) when it started, through slot K. Slots bind in slot
    # order (plan.py refuses an out-of-order bind), so a slot decided after the pass started has a number above K: it
    # belongs to the next pass and is reported, never counted against this one. Every slot up to K must still read as
    # the pass read it.
    K = doc.get('pass', {}).get('throughSlot', -1)
    later = [s['slot'] for s in slots if s['status'] != 'open' and s['slot'] > K]
    then = {x['slot']: x for x in doc.get('slotStatus', [])}
    changed = [s['slot'] for s in slots if s['slot'] <= K and (then.get(s['slot'], {}).get('capture') != s['capture']
                                                                or then.get(s['slot'], {}).get('failed') != s['failed'])]
    slots = [dict(s, status='open') if s['slot'] > K else s for s in slots]
    todo = measured_list(slots, recorded)
    per = {p['capture']: p for p in doc['perSlot']}
    # (1) each slot's MeasureInput equals a fresh run
    bad, rec1 = [], []
    for s in todo:
        fv, mi, prov = fresh_vs_stored(s['capture'])
        stored = fv['storedSha256']
        if red and s is todo[0]:
            stored = (stored or '')[:-1] + ('0' if (stored or 'x')[-1] != '0' else '1')   # planted: a stored byte differs
        ok = stored is not None and stored == fv['freshSha256'] and fv['jsonEqual'] and \
            per.get(s['capture'], {}).get('measureInput', {}).get('storedSha256') == fv['storedSha256']
        rec1.append('%s %s' % (s['capture'], (stored or 'missing')[:12]))
        if not ok:
            bad.append(s['capture'])
    ck('measureInput', "each slot's MeasureInput equals a fresh run (sha256 of the stored gzip = a fresh adapter write; "
       "JSON equal; the record's hash = the file's)", not bad and len(todo) == len(per),
       '%d of %d equal (%s)%s' % (len(todo) - len(bad), len(todo), ', '.join(rec1),
                                  '; differ: %s' % ', '.join(bad) if bad else ''))
    # (2) every sample's captures equal the plan's slots in order (grouped by what each request says)
    probs, rec2 = [], []
    facts_build = {}
    for p in doc['perSlot']:
        fp = os.path.join(ROOT, 'captures', 'ftg', p['capture'], 'capture-facts.json')
        facts_build[p['capture']] = json.load(open(fp)).get('referenceBuild') if os.path.exists(fp) else None
    e02 = json.load(open(E02_JSON))
    e02_build = {d['capture']: d.get('referenceBuild') for d in e02.get('days', [])}
    # the recorded CITY captures predate capture-facts.json: their builds are the ones W-05 fixed (E05 section 1)
    e05 = json.load(open(os.path.join(ROOT, 'docs', 'calibration', 'E05-ftg-metrics.json')))
    for c in e05.get('captures', []):
        facts_build.setdefault(c['capture'], c.get('referenceBuild'))
        if facts_build[c['capture']] is None:
            facts_build[c['capture']] = c.get('referenceBuild')
    for size, smp in doc['samples'].items():
        want = [s['label'] for s in slots if s['ftgSize'] == size and s['status'] == 'bound']
        want_rec = [r['label'] for r in sorted([r for r in recorded if r['ftgSize'] == size and r['status'] == 'bound'],
                                                key=lambda r: r.get('order', 0))]
        want = want_rec + want
        want_w = [lab for lab in want if '/coast+river/' in lab]
        got = list(smp['captures'])
        got_w = list(smp['waterRows']['captures'])
        if red and size == 'BIG_TOWN' and len(got) >= 2:
            got[0], got[1] = got[1], got[0]                     # planted: two slots out of order
        # the request's own size and water must agree with the plan's label for every member
        for lab, stamp in zip(smp['captures'], smp['stamps']):
            p = per[stamp]
            if p['requestSize'] != p['planSize'] or p['requestWater'] != p['planWater'] or p['label'] != lab:
                probs.append('%s request %s/%s against plan %s/%s' % (stamp, p['requestSize'], p['requestWater'],
                                                                    p['planSize'], p['planWater']))
            fb = facts_build.get(stamp)
            if fb != p['referenceBuild'] or (stamp in e02_build and e02_build[stamp] != p['referenceBuild']):
                probs.append('%s referenceBuild %s against capture-facts %s / E02 %s' % (stamp, p['referenceBuild'], fb,
                                                                                        e02_build.get(stamp)))
        if got != want:
            probs.append('%s captures %s, plan %s' % (size, got, want))
        if got_w != want_w:
            probs.append('%s water-row captures %s, plan %s' % (size, got_w, want_w))
        rec2.append('%s %d (%s)' % (size, len(got), ', '.join(g.split('/')[-2] + '/' + g.split('/')[-1] for g in got) or 'none'))
    if changed:
        probs.append('slots %s changed in plan.json since the pass read them' % changed)
    ck('captures', "every value's captures equal the plan's slots in order (per size, the water rows over the "
       "coast+river slots; each request's size and water = the plan's; each referenceBuild = capture-facts and E02)",
       not probs, '; '.join(rec2) + ('; problems: ' + '; '.join(probs) if probs else '; plan.json sha256 %s' % plan_hash[:12])
       + '; the pass reads slots 0-%d; decided since, for the next pass: %s' % (K, later or 'none'))
    # (3) the 2026-09-25 payload is in no sample
    hits = []
    smp_all = doc['samples']
    if red:
        smp_all = json.loads(json.dumps(smp_all))
        smp_all['CITY']['stamps'].append(EXCLUDED_CAPTURE)             # planted: the excluded payload pooled
    for size, smp in smp_all.items():
        for st in smp['stamps'] + smp['waterRows']['stamps']:
            if st == EXCLUDED_CAPTURE:
                hits.append('%s sample' % size)
        for b in smp['referenceBuilds']:
            if EXCLUDED_HASH in b:
                hits.append('%s build' % size)
    for v in doc['signatureVectors']:
        if v['capture'] == EXCLUDED_CAPTURE or EXCLUDED_HASH in v['referenceBuild']:
            hits.append('vector')
    for p in doc['perSlot']:
        if p['capture'] == EXCLUDED_CAPTURE:
            hits.append('perSlot')
    fl = [f for f in doc['samples']['CITY']['failed'] if f['capture'] == EXCLUDED_CAPTURE]
    ck('r04', 'the 2026-09-25 payload is in no sample, value or vector (R-04); it stands in CITY failed with reason setting',
       not hits and len(fl) == 1 and fl[0]['reason'] == 'setting',
       'hits %s; CITY failed %s' % (hits or 0, [(f['label'].split('/', 2)[2], f['reason']) for f in doc['samples']['CITY']['failed']]))
    # (4) E02's same-size values reproduced from the requests: against E02 section 10.3's column for the size where
    # the table has one, and (the post script's same-size rule) every later capture of a size against its first
    table = e02_table()
    miss = [k for k in E02_ROWS if k not in table]
    unmapped = [k for k in table if k not in E02_ROWS]
    if red:
        k0 = sorted(table)[0]
        table[k0] = dict(table[k0], BIG_TOWN=table[k0]['BIG_TOWN'] + 1)      # planted: one table value moved
    moved, rec4, first = [], [], {}
    for s in todo:
        prov = A.provenance(s['capture'])
        got = request_size_values(prov['request'])
        size = s['ftgSize']
        has_col = all(size in table.get(k, {}) for k in E02_ROWS if k in table)
        mv = [k for k in E02_ROWS if k in table and size in table[k] and abs(got[k] - table[k][size]) > 1e-9]
        ref = first.setdefault(size, (s['capture'], got))
        mv_first = [k for k in E02_ROWS if abs(got[k] - ref[1][k]) > 1e-9]
        rec4.append('%s %s %s%s' % (s['capture'], size,
                                    ('E02 %d/%d' % (len(E02_ROWS) - len(mv), len(E02_ROWS))) if has_col else 'no E02 column yet',
                                    (', = first of size %d/%d' % (len(E02_ROWS) - len(mv_first), len(E02_ROWS)))
                                    if ref[0] != s['capture'] else ''))
        moved += ['%s: %s %s against E02 %s' % (s['capture'], k, got[k], table[k][size]) for k in mv]
        moved += ['%s: %s %s against the first %s capture %s' % (s['capture'], k, got[k], size, ref[0]) for k in mv_first]
        if per.get(s['capture'], {}).get('sizeValues') != got:
            moved.append('%s: the record\'s sizeValues differ from the request' % s['capture'])
    ck('e02SameSize', "E02's same-size values (its latest size-dependent table, %d rows) reproduced from each capture's own "
       "PUT body, and every later capture of a size equal to its first" % len(E02_ROWS),
       not miss and not unmapped and not moved,
       'table rows %d (missing %s, unmapped %s); %s%s' % (len(table), miss or 0, unmapped or 0, '; '.join(rec4),
                                                          ('; moved: ' + '; '.join(moved)) if moved else ''))
    return C


# ---------------------------------------------------------------- the record's tables
def fmt(v, nd=3):
    if v is None:
        return '—'
    if isinstance(v, bool):
        return 'yes' if v else 'no'
    if isinstance(v, int):
        return '{:,}'.format(v).replace(',', ' ')
    if abs(v) >= 1000:
        return '{:,.0f}'.format(v).replace(',', ' ')
    return ('%.' + str(nd) + 'f') % v


def md_tables(doc):
    L = []
    per = doc['perSlot']
    cols = [p for p in per]
    head = '| metric (unit) | ' + ' | '.join(('slot %d' % p['slot']) if p['slot'] is not None else 'CITY rec. 0' for p in cols) + ' |'
    L.append(head)
    L.append('|---|' + '---|' * len(cols))
    L.append('| size / water | ' + ' | '.join('%s / %s' % (p['requestSize'], p['requestWater']) for p in cols) + ' |')
    L.append('| buildings / towers | ' + ' | '.join('%s / %s' % (fmt(p['counts']['buildings']), p['counts']['towers']) for p in cols) + ' |')
    rows = [('street.turn100 (° / 100 m)', 'street.turn100', 'value', 3),
            ('street.stepHist share > 15°', 'street.stepHist', 'shareAbove15', 4),
            ('street.entropy50 (bits)', 'street.entropy50', 'value', 3),
            ('junction.angles median (°)', 'junction.angles', 'median', 2),
            ('junction.angles p5 (°)', 'junction.angles', 'p5', 2),
            ('junction.share4', 'junction.share4', 'value', 3),
            ('street.runs arterial (m)', 'street.runs', 'arterial.median', 1),
            ('street.runs street (m)', 'street.runs', 'street.median', 1),
            ('street.runs lane (m)', 'street.runs', 'lane.median', 1),
            ('street.runs track (m)', 'street.runs', 'track.median', 1),
            ('bldg.area median (m²)', 'bldg.area', 'median', 1),
            ('bldg.area p95 (m²)', 'bldg.area', 'p95', 1),
            ('bldg.quadSide (m)', 'bldg.quadSide', 'value', 2),
            ('bldg.worstCorner p95 (°)', 'bldg.worstCorner', 'value', 2),
            ('bldg.partyShare', 'bldg.partyShare', 'value', 3),
            ('bldg.attached', 'bldg.attached', 'value', 3),
            ('wall.towerSpacing (m)', 'wall.towerSpacing', 'value', 2),
            ('wall.ungated (arterial)', 'wall.ungated', 'value', 0),
            ('gate.count', 'gate.count', 'value', 0),
            ('water.step (m)', 'water.step', 'value', 2),
            ('water.riverWidth (m)', 'water.riverWidth', 'value', 2),
            ('tree.nnP1 (m)', 'tree.nnP1', 'value', 3),
            ('tree.nnMedian (m)', 'tree.nnMedian', 'value', 2),
            ('pop.perBuilding', 'pop.perBuilding', 'value', 3),
            ('time.model (ms, server)', 'time.model', 'value', 0),
            ('outline.r90cv', 'outline.r90cv', 'value', 3),
            ('outline.roadRatio', 'outline.roadRatio', 'value', 3)]
    for lab, mid, kp, nd in rows:
        cells = []
        for p in cols:
            v = get_scalar(p['metrics'], mid, kp)
            cells.append(fmt(v, nd) if not isinstance(v, int) or isinstance(v, bool) else fmt(v))
        L.append('| %s | %s |' % (lab, ' | '.join(cells)))
    L.append('| wealth.tier1 … tier6 | ' + ' | '.join(
        '/'.join('%.3f' % p['metrics']['wealth.tier%d' % k]['value'] for k in range(1, 7)) for p in cols) + ' |')
    out = ['\n'.join(L)]
    # signature vectors
    V = ['| slot | size / water | radial | orthog. | dens. in / mid / out (km/km²) | block CV | encl. | r90 CV | R (m) |',
         '|---|---|---|---|---|---|---|---|---|']
    for v in doc['signatureVectors']:
        x = v['vector']
        V.append('| %s | %s / %s | %.4f | %.4f | %.2f / %.2f / %.2f | %.4f | %g | %.4f | %.1f |' % (
            v['slot'] if v['slot'] is not None else 'CITY rec. 0', v['ftgSize'], v['water'], x[0], x[1], x[2], x[3], x[4],
            x[5], x[6], x[7], v['builtRadiusM']))
    out.append('\n'.join(V))
    # times
    T = ['| slot | server: PUT → layout GET sent (s) | layout at the client (s) | first map shot (s) | scene build | contended |',
         '|---|---|---|---|---|---|']
    for p in per:
        ct = p['clientTimes']
        if not ct.get('available'):
            T.append('| %s | %.3f | — | — | recorded 6.4–7.0 s for the two CITY captures (CPU profile) | not recorded |' % (
                'CITY rec. 0', p['serverTimeS']['putToLayoutGet']))
            continue
        T.append('| %d | %.3f | %.3f | %.3f | not recoverable (no CPU profile) | %s |' % (
            p['slot'], ct['layoutGetSentS'], ct['layoutAtClientS'], ct['firstMapShotS'], 'yes' if ct['contended'] else 'no'))
    out.append('\n'.join(T))
    # samples
    S = ['| FTG size (rung) | n now / planned | estimator at n | slots in order | water-row slots (n) | open slots | failed |',
         '|---|---|---|---|---|---|---|']
    for size, smp in doc['samples'].items():
        S.append('| %s (%s) | %d / %d | %s | %s | %s (%d) | %s | %s |' % (
            size, smp['rung'], smp['n'], smp['plannedSlots'], smp['estimatorAtN'] if smp['rows'] else 'no row (R-34)',
            ', '.join(('rec. 0' if s is None else str(s)) for s in smp['slots']) or '—',
            ', '.join(c.split('/')[-2] + '/' + c.split('/')[-1] for c in smp['waterRows']['captures']) or '—',
            smp['waterRows']['n'], ', '.join(str(s) for s in smp['openSlots']) or '—',
            ', '.join('%s (%s)' % (f['label'].split('/', 2)[2], f['reason']) for f in smp['failed']) or '—'))
    out.append('\n'.join(S))
    # turning beside the exception
    U = ['| FTG size | n | per-slot turn100 | median | declared exception 0.5–1.5 × | sample range | type7 [p10, p90] |',
         '|---|---|---|---|---|---|---|']
    for size, t in doc['turningBesideException'].items():
        if not t.get('n'):
            U.append('| %s | 0 | — | — | — | — | not formed |' % size)
            continue
        U.append('| %s | %d | %s | %.3f | %.3f–%.3f | %.3f–%.3f | %s |' % (
            size, t['n'], ' / '.join('%.3f' % x for x in t['values']), t['median'], t['declaredException'][0],
            t['declaredException'][1], t['sampleRange'][0], t['sampleRange'][1],
            ('%.3f–%.3f' % tuple(t['type7Band'])) if t['type7Band'] else 'not formed (n < 10)'))
    out.append('\n'.join(U))
    # water outlines per body (the note beside water.step)
    Wt = ['| slot | water.step pooled (m) | per body: class, vertices, raw step (m), vertices kept after the 1° drop, step after the drop (m) |',
          '|---|---|---|']
    for p in per:
        if not p['waterOutlines']:
            continue
        Wt.append('| %s | %s | %s |' % (
            p['slot'] if p['slot'] is not None else 'CITY rec. 0', fmt(p['metrics']['water.step']['value'], 2),
            '; '.join('%s %d, %.1f, %d, %s' % (w['class'], w['vertices'], w['rawStepMedianM'], w['keptAfter1deg'],
                                               fmt(w['stepAfterDropM'], 1)) for w in p['waterOutlines'])))
    out.append('\n'.join(Wt))
    return '\n\n'.join(out) + '\n'


def main():
    args = sys.argv[1:]

    def opt(name, default=None):
        if name in args:
            i = args.index(name)
            v = args[i + 1]
            del args[i:i + 2]
            return v
        return default
    out = opt('--json', JSON_DEFAULT)
    md = opt('--md')
    if '--check' in args:
        doc = json.load(open(out))
        red = '--red' in args
        C = run_checks(doc, red=red)
        for c in C:
            print('%s  %s — %s' % ('PASS' if c['passed'] else 'FAIL', c['check'], c['receipt']))
        print('%s: %d of %d checks pass' % ('RED' if red else 'CHECK', sum(c['passed'] for c in C), len(C)))
        sys.exit(0 if all(c['passed'] for c in C) else 1)
    lim = opt('--through')
    slots, recorded, plan_hash, per, through = measure_all('--write' in args, int(lim) if lim is not None else None)
    samples = samples_of(per, slots, recorded)
    doc = {
        'schema': 'm1.e05.slots/1', 'record': 'E05 section 9', 'workItem': 'W-05b', 'lane': 'm1/W-05b',
        'script': SCRIPT, 'uses': [A.SCRIPT, M.SCRIPT], 'plan': {'file': rel(PLAN), 'sha256': plan_hash},
        'pass': {'throughSlot': through, 'rule': 'the slots decided (bound or failed) when the pass started; a slot decided '
                 'later has a higher number (plan.py binds in slot order) and belongs to the next pass'},
        'rule': 'vectors only, no dispersion (R-40); measured values, not rows (R-47 (a)); W-15 forms rows, bands and both dispersions',
        'slotStatus': [{k: s[k] for k in ('slot', 'label', 'ftgSize', 'water', 'status', 'capture', 'failed')} for s in slots],
        'recordedCity': [{k: r[k] for k in ('label', 'capture', 'status', 'failed')} for r in recorded],
        'perSlot': per,
        'samples': samples,
        'signatureVectors': vectors_of(per),
        'turningBesideException': turning_beside_exception(samples),
        'outlineBandInputs': {size: {'outline.r90cv': samples[size]['values']['outline.r90cv']['values'],
                                     'outline.roadRatio': samples[size]['values']['outline.roadRatio']['values'],
                                     'captures': samples[size]['captures']} for size in ('BIG_TOWN', 'BIG_CITY', 'METROPOLIS')},
        'serverTimes': {size: {'time.model.ms': samples[size]['values']['time.model']['values'],
                               'captures': samples[size]['captures'],
                               'note': 'server interval PUT sent -> layout GET sent; admissible, no host ratio (R-21); '
                                       'the captures shared the machine with M0 build seats (contended client side)'}
                        for size in ROW_SIZES},
    }
    doc['checks'] = run_checks(doc)
    with open(out, 'w') as fh:
        json.dump(doc, fh, indent=1, sort_keys=False)
        fh.write('\n')
    if md:
        with open(md, 'w') as fh:
            fh.write(md_tables(doc))
    for c in doc['checks']:
        print('%s  %s — %s' % ('PASS' if c['passed'] else 'FAIL', c['check'], c['receipt']))
    print('wrote %s (%d slots measured)' % (rel(out), len(per)))
    sys.exit(0 if all(c['passed'] for c in doc['checks']) else 1)


if __name__ == '__main__':
    main()
