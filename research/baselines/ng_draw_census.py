#!/usr/bin/env python3
"""research/baselines/ng_draw_census.py -- NG's draw census on the canvas draw records (M-1 work item W-22; D34; R-23).

Lane m1/W-22 (docs/calibration/M-1-plan.md section 2, row W-22; record docs/calibration/E20-ng-draw-census.md). Research
side only; our own code, standard library only (Python 3.9). It reads the draw records that profiler/record.mjs wrote
(captures/neighbourhood/<capture>/draw/gen-N.draw.json, and the vertex layer gen-N.paths.json beside it where one exists).
No captured program bundle is opened. It writes numbers, counts and our own words only: no colour value, style key,
canvas key or label text of any record reaches its output (the --check scan proves it on the output and the record).

Roles are found at run time from each record, never from a stored colour:
  ink            the darkest stroke style by Rec. 601 luma (measure_mfcg.py's rule)
  buildings      the canvas (size key) holding the most ink fills of 3 path segments
  shadow style   the non-ink style with the most 5-segment fills; the shadow canvas holds the most of those
  street style   the stroke style other than ink and shadow with the most distinct line widths
The paint sequence is the draw record's ordered log. Where the log hit the recorder's cap (logDropped > 0) the sequence is
completed from gen-N.paths.json, whose records past the cap (field i = -1) are the same paint calls in the same order with
the same style key and canvas size; their segment count is the vertex count (checked equal on every logged polygon path).

Definitions (declared; the M-1 twin of section 8.3's census, superseded by the product's census at M1 by J-V12.1):
  roof unit      on the buildings canvas, a maximal run of consecutive non-ink fills together with the ink strokes and
                 ink triangles that follow it before the next run: one unit per wing roof, whatever its kind
  wing           a roof unit (every wing draws one roof and casts one prism shadow)
  gable/hip wing a roof unit of exactly two fills: the footprint in the roof tone, then the shaded half
  draw.hatchPerWing        per gable/hip wing, the ink fills of 3 segments in its unit (hatch tapers AND the two heavier
                           ridge tapers, section 8.3's count); the map's value is the mean; median, p10, p90 (type 7), the
                           share in [15, 20] and n are kept
  draw.shadowQuadsPerWing  5-segment fills in the shadow style on the shadow canvas / wings
  draw.capSquare           square-capped strokes / strokes in the street style (the recorder counts the cap per stroke)
  draw.roofLumaRatio       per gable/hip wing, luma(second fill) / luma(first fill); the map's value is the median (mean,
                           p10, p90 and the share below 1 kept); descriptive -- a ratio of the reference palette's tones
  ridge tapers (receipt)   per gable/hip wing, its triangles whose shortest side is >= 1.3 x the map's modal hatch-taper
                           base (paths.json geometry, canvas px): the heavier tapers laid along the ridge
Sensitivity columns (not the metric): the profile's own wing rule (non-ink fills on the buildings canvas / 2) for both
ratios, and quads per gable/hip wing.

The row's first check, as R-49 restated it (docs/calibration/M-1-rulings-2.md section 9, lane m1/rulings-2b, 2026-10-03):
  (1a) provenance -- on the figures' own records (profile-neighbourhood.md section 5.4, 2026-09-21T05-04-54) the census
       counts the table's triangles and quads exactly on all four generations, and gen-0 over that table's 296 wings
       rounds to section 13.5's 17.4 and 2.33 (the figures' own denominator);
  (1b) the twin fixtures -- the 2026-09-25 records reproduce E20 section 4's fixture values (pooled, the census's
       definition) to four decimals: a regression pin on the tool (R-03: fixtures check the tool and enter no row).
  The reference value is the pooled plan-seed value over the 44 under the definitions above (R-49 (1)); W-15 forms the row.
  Before R-49 the check read "the 2026-09-25 draw records reproduce 17.4 and 2.33 within the count's rounding" and failed
  on the hatch figure (17.5072; E20 F1): the figures are one 2026-09-21 map's, and no wing rule reproduces both there.

Usage:
  python3 research/baselines/ng_draw_census.py [--json OUT] [--check] [--red]
    --check  the W-22 checker column and this lane's receipts; exit 1 on any FAIL
    --red    shift the provenance expectation by one triangle, the fixture pin by 0.0001 and plant a style key in the
             scanned text: all three must FAIL
"""
import collections
import hashlib
import json
import math
import os
import re
import statistics
import sys
import tempfile

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
NGDIR = os.path.join(ROOT, 'captures', 'neighbourhood')
INDEX = os.path.join(NGDIR, 'ng-programme-m1-2026-10-03', 'index.json')
RECORD_MD = os.path.join(ROOT, 'docs', 'calibration', 'E20-ng-draw-census.md')
SCRIPT = 'research:baselines/ng_draw_census.py'
REFERENCE_BUILD = 'itch:11441280'
FIXTURE_CAPS = ['2026-09-25T10-55-19', '2026-09-25T10-55-36', '2026-09-25T10-55-47', '2026-09-25T10-55-59']
SOURCE_CAP = '2026-09-21T05-04-54'          # research/findings/profile-neighbourhood.md section 5.4's four draw runs
# that table, our own findings text: (wings, hatch triangles, shadow quads) per generation; ratios 17.4/17.2/18.9/17.1 and
# 2.33/2.33/2.43/2.31; its wing count is stated as "non-dark fills / 2"
SOURCE_TABLE = {'gen-0': (296, 5150, 690), 'gen-1': (658, 11330, 1533), 'gen-2': (315, 5959, 765), 'gen-3': (492, 8446, 1136)}
SOURCE_RATIOS = {'gen-0': (17.4, 2.33), 'gen-1': (17.2, 2.33), 'gen-2': (18.9, 2.43), 'gen-3': (17.1, 2.31)}
TARGET_HATCH, TARGET_QUADS = 17.4, 2.33     # section 13.5's figures (one and two decimals): gen-0's ratios over the table's 296 wings
FIXTURE_PIN = (17.5072, 2.3295)             # E20 section 4: the 2026-09-25 twin fixtures' pooled values, the census's definition (R-49 (1b))
HEAVY_REL = 1.3
BAND = (15, 20)
SHADOW_BLOB_MIN = 17
COLOUR_RE = re.compile(r'#[0-9A-Fa-f]{3,8}\b|\brgba?\(|\bhsla?\(')


def luma_of(key):
    k = key.split('@')[0]
    if not re.fullmatch(r'#[0-9A-Fa-f]{6}', k):
        return None
    r, g, b = int(k[1:3], 16), int(k[3:5], 16), int(k[5:7], 16)
    return 0.299 * r + 0.587 * g + 0.114 * b


def channels_of(key):
    k = key.split('@')[0]
    return int(k[1:3], 16), int(k[3:5], 16), int(k[5:7], 16)


def q7(xs, p):
    s = sorted(xs)
    if not s:
        return None
    h = (len(s) - 1) * p
    lo = math.floor(h)
    return s[lo] + (h - lo) * (s[min(lo + 1, len(s) - 1)] - s[lo])


def grp(n):
    """An integer with a space every three digits (no run of six digits in a receipt string)."""
    return f'{n:,}'.replace(',', ' ')


def r4(x):
    return None if x is None else round(x + 0.0, 4)


# ------------------------------------------------------------------ reading
def load_sequence(draw_path):
    """The paint sequence: [(op, canvas, style, segs, width, pathRecord or None)], the record, completion facts."""
    d = json.load(open(draw_path))
    rec = d['rec']
    log = rec['log']
    ppath = draw_path.replace('.draw.json', '.paths.json')
    paths = json.load(open(ppath))['paths'] if os.path.exists(ppath) else None
    byi = {}
    tail = []
    segcheck = {'polygonPaths': 0, 'segsEqualVertices': 0, 'mismatches': {}}
    if paths is not None:
        for r in paths:
            if r.get('i', -1) >= 0:
                byi[r['i']] = r
            else:
                tail.append(r)

        def vert(r):
            rr = paths[r['same']] if 'same' in r else r
            return rr
        for i, r in byi.items():
            rr = vert(r)
            e = log[i]
            if e[1] in ('fill', 'stroke') and not any(s.get('x') for s in rr.get('s', [])) and 'skip' not in rr:
                segcheck['polygonPaths'] += 1
                segcheck['segsEqualVertices'] += (e[4] == rr.get('nv'))
                if e[4] != rr.get('nv'):
                    key = f"{e[4]}->{rr.get('nv')}"
                    segcheck['mismatches'][key] = segcheck['mismatches'].get(key, 0) + 1
    seq = []
    for i, e in enumerate(log):
        if e[1] not in ('fill', 'stroke', 'fillRect', 'strokeRect'):
            continue
        seq.append((e[1], e[2], e[3], e[4], e[5] if len(e) > 5 else None, byi.get(i)))
    completed = 0
    for r in tail:
        rr = paths[r['same']] if 'same' in r else r
        curved = any(s.get('x') for s in rr.get('s', []))
        segs = None if curved or 'skip' in rr else rr.get('nv')
        seq.append((r['op'], r['cv'], r['k'], segs, r.get('w'), r))
        completed += 1
    facts = {'logEntries': len(log), 'logDropped': rec['logDropped'], 'completedFromPaths': completed,
             'paintsInLog': len(seq) - completed,
             'pathsFile': paths is not None, 'paints': (len(paths) if paths is not None else None), **segcheck}
    return rec, seq, paths, facts


def pip(x, y, v):
    n = len(v) // 2
    ins = False
    j = n - 1
    for i in range(n):
        xi, yi, xj, yj = v[2 * i], v[2 * i + 1], v[2 * j], v[2 * j + 1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            ins = not ins
        j = i
    return ins


def tri_shortest_side(paths, r):
    rr = paths[r['same']] if 'same' in r else r
    v = rr['s'][0]['v']
    pts = [(v[0], v[1]), (v[2], v[3]), (v[4], v[5])]
    return min(math.dist(pts[a], pts[(a + 1) % 3]) for a in range(3))


# ------------------------------------------------------------------ the census of one record
def census(draw_path):
    rec, seq, paths, facts = load_sequence(draw_path)
    styled = [s for s in rec['strokeStyles'] if luma_of(s) is not None]
    ink = min(styled, key=luma_of)
    fills = [x for x in seq if x[0] == 'fill']
    strokes = [x for x in seq if x[0] == 'stroke']
    bcount = collections.Counter(x[1] for x in fills if x[2] == ink and x[3] == 3)
    B = bcount.most_common(1)[0][0]
    f5 = collections.Counter(x[2] for x in fills if x[2] != ink and x[3] == 5)
    shadow = f5.most_common(1)[0][0]
    S = collections.Counter(x[1] for x in fills if x[2] == shadow and x[3] == 5).most_common(1)[0][0]
    widths = collections.defaultdict(set)
    for x in strokes:
        if x[2] not in (ink, shadow):
            widths[x[2]].add(x[4])
    street = max(sorted(widths), key=lambda k: len(widths[k])) if widths else None

    # roof units on the buildings canvas
    units = []
    prev_fill = False
    other_ink_fills = 0
    for x in seq:
        if x[1] != B:
            continue
        is_roof = x[0] == 'fill' and x[2] != ink
        if is_roof and not prev_fill:
            units.append({'fills': [], 'fills_rec': [], 'tri': [], 'strokes': 0})
        prev_fill = is_roof
        if is_roof:
            if units:
                units[-1]['fills'].append(x[2])
                units[-1]['fills_rec'].append(x[5])
            continue
        if x[0] == 'fill' and x[2] == ink:
            if x[3] == 3:
                if units:
                    units[-1]['tri'].append(x[5])
            else:
                other_ink_fills += 1
        elif x[0] == 'stroke' and x[2] == ink and units:
            units[-1]['strokes'] += 1
    tri_total = sum(1 for x in fills if x[1] == B and x[2] == ink and x[3] == 3)
    tri_before_first = tri_total - sum(len(u['tri']) for u in units)
    roof_fills = sum(1 for x in fills if x[1] == B and x[2] != ink)
    kinds = collections.Counter(len(u['fills']) for u in units)
    gh = [u for u in units if len(u['fills']) == 2]
    per = [len(u['tri']) for u in gh]
    quads = sum(1 for x in fills if x[1] == S and x[2] == shadow and x[3] == 5)
    blobs = sum(1 for x in fills if x[1] == S and x[2] == shadow and x[3] is not None and x[3] >= SHADOW_BLOB_MIN)
    shadow_other = sum(1 for x in fills if x[1] == S and x[2] == shadow) - quads - blobs

    # roof tone ratios (descriptive): second fill over first, per gable/hip wing
    lr, ch = [], []
    for u in gh:
        a, b = u['fills']
        la, lb = luma_of(a), luma_of(b)
        if la and lb is not None:
            lr.append(lb / la)
            ca, cb = channels_of(a), channels_of(b)
            if all(ca):
                ch.append(tuple(cb[k] / ca[k] for k in range(3)))

    # ridge tapers (receipt): heavy-base triangles per gable/hip wing
    tapers = None
    if paths is not None:
        bases_all = [round(tri_shortest_side(paths, t), 2) for u in gh for t in u['tri'] if t is not None]
        if bases_all:
            mode = collections.Counter(bases_all).most_common(1)[0][0]
            heavy = []
            for u in gh:
                if any(t is None for t in u['tri']):
                    continue
                heavy.append(sum(1 for t in u['tri'] if tri_shortest_side(paths, t) >= HEAVY_REL * mode))
            hc = collections.Counter(heavy)
            tapers = {'wings': len(heavy), 'exactlyTwo': hc.get(2, 0), 'shareExactlyTwo': r4(hc.get(2, 0) / len(heavy)) if heavy else None,
                      'heavyPerWing': {str(k): v for k, v in sorted(hc.items())}}

    # attribution receipt: each gable/hip wing's triangles lie on its own footprint (centroid inside the first fill)
    attrib = None
    if paths is not None:
        inside = total = 0
        for u in gh:
            f = u['fills_rec'][0] if u.get('fills_rec') else None
            if f is None or any(t is None for t in u['tri']):
                continue
            fr = paths[f['same']] if 'same' in f else f
            rings = [sv['v'] for sv in fr.get('s', [])]
            for t in u['tri']:
                tr = paths[t['same']] if 'same' in t else t
                v = tr['s'][0]['v']
                total += 1
                inside += any(pip((v[0] + v[2] + v[4]) / 3, (v[1] + v[3] + v[5]) / 3, rg) for rg in rings)
        attrib = {'triangles': total, 'insideOwnWing': inside, 'share': r4(inside / total) if total else None}

    caps = rec['lineCaps']
    street_strokes = sum(1 for x in strokes if x[2] == street)
    street_fills = sum(1 for x in fills if x[2] == street)
    sq = caps.get('square', 0)
    wings = len(units)
    out = {
        'facts': facts,
        'wings': wings, 'gableHipWings': len(gh), 'roofKinds': {str(k): v for k, v in sorted(kinds.items())},
        'roofFills': roof_fills, 'triangles': tri_total, 'trianglesInGableHip': sum(per),
        'trianglesBeforeFirstRoof': tri_before_first, 'otherInkFillsOnBuildings': other_ink_fills,
        'shadowQuads': quads, 'shadowBlobs': blobs, 'shadowOther': shadow_other,
        'streetStrokes': street_strokes, 'streetFills': street_fills, 'capsSquare': sq,
        'capsRound': caps.get('round', 0), 'capsOther': sum(v for k, v in caps.items() if k not in ('square', 'round')),
        'strokesTotal': rec['canvas2d'].get('stroke', 0) + rec['canvas2d'].get('strokeRect', 0),
        'draw.hatchPerWing': {'mean': r4(statistics.mean(per)) if per else None, 'median': q7(per, 0.5),
                              'p10': r4(q7(per, 0.1)), 'p90': r4(q7(per, 0.9)),
                              'shareIn15to20': r4(sum(1 for v in per if BAND[0] <= v <= BAND[1]) / len(per)) if per else None,
                              'n': len(per)},
        'draw.shadowQuadsPerWing': r4(quads / wings) if wings else None,
        'draw.capSquare': r4(sq / street_strokes) if street_strokes else None,
        'draw.roofLumaRatio': {'median': r4(q7(lr, 0.5)), 'mean': r4(statistics.mean(lr)) if lr else None,
                               'p10': r4(q7(lr, 0.1)), 'p90': r4(q7(lr, 0.9)),
                               'shareBelow1': r4(sum(1 for v in lr if v < 1) / len(lr)) if lr else None, 'n': len(lr)},
        'ridgeTapers': tapers, 'attribution': attrib,
        'sensitivity': {
            'profileRuleWings': roof_fills / 2,
            'hatchPerProfileWing': r4(tri_total / (roof_fills / 2)) if roof_fills else None,
            'quadsPerProfileWing': r4(quads / (roof_fills / 2)) if roof_fills else None,
            'quadsPerGableHipWing': r4(quads / len(gh)) if gh else None,
        },
        '_lr': lr, '_ch': ch, '_per': per,
        '_scan': {'styles': set(rec['fillStyles']) | set(rec['strokeStyles']),
                  'texts': {t[0] for t in rec.get('texts', []) if t and isinstance(t[0], str)},
                  'canvases': set(rec['canvases'])},
    }
    return out


# ------------------------------------------------------------------ pooling
def pooled(maps):
    gh = sum(m['gableHipWings'] for m in maps)
    w = sum(m['wings'] for m in maps)
    tri = sum(m['trianglesInGableHip'] for m in maps)
    q = sum(m['shadowQuads'] for m in maps)
    st = sum(m['streetStrokes'] for m in maps)
    sq = sum(m['capsSquare'] for m in maps)
    lr = [v for m in maps for v in m['_lr']]
    per = [v for m in maps for v in m['_per']]
    rf = sum(m['roofFills'] for m in maps)
    tt = sum(m['triangles'] for m in maps)
    return {'maps': len(maps), 'wings': w, 'gableHipWings': gh,
            'draw.hatchPerWing': {'mean': r4(tri / gh) if gh else None, 'median': q7(per, 0.5),
                                  'p10': r4(q7(per, 0.1)), 'p90': r4(q7(per, 0.9)),
                                  'mapsMeanOutside15to20': sum(1 for m in maps if not BAND[0] <= m['draw.hatchPerWing']['mean'] <= BAND[1]),
                                  'mapsMeanOutside17to19': sum(1 for m in maps if not 17 <= m['draw.hatchPerWing']['mean'] <= 19),
                                  'shareIn15to20': r4(sum(1 for v in per if BAND[0] <= v <= BAND[1]) / len(per)) if per else None,
                                  'mapMin': r4(min(m['draw.hatchPerWing']['mean'] for m in maps)),
                                  'mapMax': r4(max(m['draw.hatchPerWing']['mean'] for m in maps))},
            'draw.shadowQuadsPerWing': {'pooled': r4(q / w) if w else None,
                                        'mapMin': r4(min(m['draw.shadowQuadsPerWing'] for m in maps)),
                                        'mapMax': r4(max(m['draw.shadowQuadsPerWing'] for m in maps))},
            'draw.capSquare': {'pooled': r4(sq / st) if st else None,
                               'mapsAt1': sum(1 for m in maps if m['draw.capSquare'] == 1.0),
                               'mapMin': r4(min(m['draw.capSquare'] for m in maps))},
            'draw.roofLumaRatio': {'median': r4(q7(lr, 0.5)), 'mean': r4(statistics.mean(lr)), 'p10': r4(q7(lr, 0.1)),
                                   'p90': r4(q7(lr, 0.9)), 'n': len(lr)},
            'sensitivity': {'hatchPerProfileWing': r4(tt / (rf / 2)) if rf else None,
                            'quadsPerProfileWing': r4(q / (rf / 2)) if rf else None,
                            'quadsPerGableHipWing': r4(q / gh) if gh else None}}


def public(m):
    return {k: v for k, v in m.items() if not k.startswith('_')}


# ------------------------------------------------------------------ main
def main():
    args = sys.argv[1:]
    out_json = None
    if '--json' in args:
        i = args.index('--json'); out_json = args[i + 1]; del args[i:i + 2]
    red = '--red' in args
    check = '--check' in args or red          # --red runs the checks (and writes nothing)

    idx = json.load(open(INDEX))
    plan = []
    for label, ld in idx['loads'].items():
        folder = os.path.join(ROOT, ld['folder'])
        parts = label.split('/')
        m = census(os.path.join(folder, 'draw', 'gen-0.draw.json'))
        m.update({'label': label, 'capture': os.path.basename(folder), 'template': parts[2], 'size': parts[3],
                  'index': int(parts[4])})
        plan.append(m)
    fixtures = []
    for cap in FIXTURE_CAPS:
        dd = os.path.join(NGDIR, cap, 'draw')
        for g in sorted(x for x in os.listdir(dd) if x.endswith('.draw.json')):
            m = census(os.path.join(dd, g))
            meta = json.load(open(os.path.join(NGDIR, cap, 'meta.json')))
            m.update({'capture': cap, 'gen': g[:-10], 'tags': meta['args'].get('query', '').replace('tags=', '')})
            fixtures.append(m)
    source = []
    dd = os.path.join(NGDIR, SOURCE_CAP, 'draw')
    for g in sorted(x for x in os.listdir(dd) if x.endswith('.draw.json')):
        m = census(os.path.join(dd, g))
        m.update({'capture': SOURCE_CAP, 'gen': g[:-10]})
        source.append(m)

    groups = collections.OrderedDict()
    for size in ('medium', 'small', 'large'):
        for t in ('area', 'street', 'square', 'ring'):
            groups[f'{t}/{size}'] = pooled([m for m in plan if m['template'] == t and m['size'] == size])
    by_size = {s: pooled([m for m in plan if m['size'] == s]) for s in ('small', 'medium', 'large')}
    all_ch = [c for m in plan for c in m['_ch']]
    src_ch = [c for m in source if m['gen'] == 'gen-1' for c in m['_ch']]
    result = {
        'schema': 'm1.E20/1', 'lane': 'm1/W-22', 'script': SCRIPT, 'referenceBuild': REFERENCE_BUILD,
        'status': 'measured values for W-15 (R-47 (a)): rows are formed at W-15, not here',
        'inputs': {'plan': os.path.relpath(INDEX, ROOT), 'fixtures': FIXTURE_CAPS, 'source': SOURCE_CAP},
        'declared': {
            'roles': 'found at run time per record: ink = darkest stroke style (Rec. 601 luma); buildings canvas = most ink '
                     '3-segment fills; shadow style = non-ink style with most 5-segment fills; street style = stroke style '
                     'with most distinct widths',
            'wing': 'one roof unit on the buildings canvas (a run of consecutive non-ink fills plus the ink strokes and '
                    'triangles after it); gable/hip wing = a unit of exactly two fills',
            'hatchPerWing': 'per gable/hip wing, its 3-segment ink fills (hatch tapers and the two ridge tapers); map value '
                            'the mean; pooled = sum / sum',
            'shadowQuadsPerWing': '5-segment shadow-style fills on the shadow canvas / wings',
            'capSquare': 'square-capped strokes / street-style strokes',
            'roofLumaRatio': 'per gable/hip wing luma(second fill) / luma(first fill); map value the median; descriptive',
            'quantiles': 'type 7', 'digits': 'ratios at four decimals (rulings-2 R-47 (k))', 'band': list(BAND),
            'heavyTaper': f'shortest side >= {HEAVY_REL} x the map modal hatch-taper base (paths.json, canvas px)',
            'role': {'draw.capSquare': 'target', 'draw.hatchPerWing': 'target', 'draw.shadowQuadsPerWing': 'target',
                     'draw.roofLumaRatio': 'descriptive'}},
        'plan': {'maps': [public(m) for m in plan], 'groups': groups, 'bySize': by_size,
                 'medium': by_size['medium'], 'all': pooled(plan),
                 'roofChannelRatios': {'mean': [r4(statistics.mean(c[k] for c in all_ch)) for k in range(3)],
                                       'median': [r4(q7([c[k] for c in all_ch], 0.5)) for k in range(3)], 'n': len(all_ch),
                                       'note': 'descriptive receipt only, not a row: the three per-channel ratios of the '
                                               'shaded to the lit roof tone'}},
        'fixtures2026_09_25': {'records': [public(m) for m in fixtures], 'pooled': pooled(fixtures),
                               'pooledGen0': pooled([m for m in fixtures if m['gen'] == 'gen-0'])},
        'source2026_09_21': {'records': [public(m) for m in source], 'pooled': pooled(source),
                             'gen1ChannelRatioMeans': [r4(statistics.mean(c[k] for c in src_ch)) for k in range(3)]},
    }

    # ------------------------------------------------ printing (compact)
    def line(m, tag):
        h = m['draw.hatchPerWing']; s = m['sensitivity']
        return (f"{tag}: wings {m['wings']} (gable/hip {m['gableHipWings']}, kinds {m['roofKinds']}) tri {m['triangles']} "
                f"hatch/wing {h['mean']} (med {h['median']}, 15-20 {h['shareIn15to20']}) quads {m['shadowQuads']} "
                f"q/wing {m['draw.shadowQuadsPerWing']} cap {m['draw.capSquare']} ({m['capsSquare']}/{m['streetStrokes']}, "
                f"street fills {m['streetFills']}) luma {m['draw.roofLumaRatio']['median']} | profile rule "
                f"{s['hatchPerProfileWing']} / {s['quadsPerProfileWing']} | tapers "
                f"{(m['ridgeTapers'] or {}).get('shareExactlyTwo')} | log +{m['facts']['completedFromPaths']}")
    print('== source', SOURCE_CAP)
    for m in source:
        print(line(m, m['gen']))
    print('== fixtures 2026-09-25')
    for m in fixtures:
        print(line(m, f"{m['capture']}/{m['gen']} {m['tags']}"))
    print('== plan (W-04, gen-0)')
    for m in plan:
        print(line(m, m['label']))
    for k, g in list(groups.items()) + [('ALL', result['plan']['all'])] + [('fixtures', result['fixtures2026_09_25']['pooled'])]:
        print(f"{k}: maps {g['maps']} wings {g['wings']} hatch {g['draw.hatchPerWing']} quads {g['draw.shadowQuadsPerWing']} "
              f"cap {g['draw.capSquare']} luma {g['draw.roofLumaRatio']['median']} sens {g['sensitivity']}")

    def dump():
        if out_json:
            with open(out_json, 'w') as fh:
                json.dump(result, fh, indent=1, sort_keys=True)
                fh.write('\n')

    if not check:
        dump()
        return 0

    checks = []
    fails = 0

    def ck(name, ok, receipt, row=False):
        nonlocal fails
        fails += (not ok)
        checks.append({'check': name, 'passed': bool(ok), 'receipt': receipt, 'rowChecker': row})
        print(f"{'PASS' if ok else 'FAIL'} {name}: {receipt}")

    # (1) the row's first check as R-49 restates it (module docstring): (1a) provenance on the figures' own records
    # (profile section 5.4): counts exact on all four generations; the figure's record (gen-0) gives 17.4 and 2.33 over
    # that table's 296 wings. (1b) the 2026-09-25 twin fixtures reproduce E20's pooled values to four decimals (a pin).
    bad = []
    for m in source:
        w, t, qq = SOURCE_TABLE[m['gen']]
        if red and m['gen'] == 'gen-0':
            t += 1
        if m['triangles'] != t or m['shadowQuads'] != qq:
            bad.append(f"{m['gen']} tri {m['triangles']} vs {t}, quads {m['shadowQuads']} vs {qq}")
    w0, t0, q0 = SOURCE_TABLE['gen-0']
    g0 = [m for m in source if m['gen'] == 'gen-0'][0]
    if round(g0['triangles'] / w0, 1) != TARGET_HATCH or round(g0['shadowQuads'] / w0, 2) != TARGET_QUADS:
        bad.append(f"gen-0 with the table's {w0} wings: {g0['triangles'] / w0:.4f} / {g0['shadowQuads'] / w0:.4f}")
    slips = [f"{g} {t}/{w} = {t / w:.4f} printed {SOURCE_RATIOS[g][0]}" for g, (w, t, qq) in SOURCE_TABLE.items()
             if round(t / w, 1) != SOURCE_RATIOS[g][0]]
    slips += [f"{g} {qq}/{w} = {qq / w:.4f} printed {SOURCE_RATIOS[g][1]}" for g, (w, t, qq) in SOURCE_TABLE.items()
              if round(qq / w, 2) != SOURCE_RATIOS[g][1]]
    result['sourceTableSlips'] = slips
    ck('row (1a): on the figures\' own records (2026-09-21T05-04-54, profile section 5.4) the census counts the table\'s '
       'triangles and quads exactly on all four generations, and gen-0 over that table\'s 296 wings rounds to section 13.5\'s '
       '17.4 and 2.33 (R-49)', not bad,
       ('triangles ' + ' / '.join(grp(m['triangles']) for m in source) + ' and quads '
        + ' / '.join(grp(m['shadowQuads']) for m in source) + ' equal the table; gen-0 '
        + f"{g0['triangles'] / w0:.4f} and {g0['shadowQuads'] / w0:.4f} over 296 wings; census wings "
        + ' / '.join(str(m['wings']) for m in source) + ' (gable/hip ' + ' / '.join(str(m['gableHipWings']) for m in source)
        + ') against the table\'s 296 / 658 / 315 / 492, census ratios '
        + ' / '.join(f"{m['draw.hatchPerWing']['mean']}, {m['draw.shadowQuadsPerWing']}" for m in source)
        + f"; the table's own printed ratios that its counts do not round to: {slips or 'none'}")
       if not bad else '; '.join(bad), row=True)
    fx = result['fixtures2026_09_25']['pooled']
    h, q = fx['draw.hatchPerWing']['mean'], fx['draw.shadowQuadsPerWing']['pooled']
    pin_h, pin_q = FIXTURE_PIN
    if red:
        pin_h = round(pin_h + 0.0001, 4)
    ck('row (1b): the 2026-09-25 twin fixtures reproduce E20 section 4\'s fixture values '
       f'{FIXTURE_PIN[0]} and {FIXTURE_PIN[1]} to four decimals (R-49; the figures came from the 2026-09-21 record, not these; '
       'the reference value is the pooled plan-seed value over the 44, W-15\'s row)',
       round(h, 4) == pin_h and round(q, 4) == pin_q,
       f"pooled over the {fx['maps']} records {h} and {q} against the pin {pin_h} and {pin_q} (maps "
       f"{fx['draw.hatchPerWing']['mapMin']}-{fx['draw.hatchPerWing']['mapMax']} and {fx['draw.shadowQuadsPerWing']['mapMin']}-"
       f"{fx['draw.shadowQuadsPerWing']['mapMax']}; gen-0 only {result['fixtures2026_09_25']['pooledGen0']['draw.hatchPerWing']['mean']} and "
       f"{result['fixtures2026_09_25']['pooledGen0']['draw.shadowQuadsPerWing']['pooled']}; the profile's wing rule "
       f"{fx['sensitivity']['hatchPerProfileWing']} and {fx['sensitivity']['quadsPerProfileWing']}; the 44 plan seeds "
       f"{result['plan']['all']['draw.hatchPerWing']['mean']} and {result['plan']['all']['draw.shadowQuadsPerWing']['pooled']})", row=True)
    # (2) the 44 recordings measured, in plan order, the truncated log completed
    labels = list(idx['loads'])
    trunc = [m for m in plan if m['facts']['logDropped']]
    mism = collections.Counter()
    for m in plan:
        mism.update(m['facts']['mismatches'])
    # the census reads only the 3- and 5-segment classes; a rect() path is one segment and four vertices (pin squares)
    read_classes = [k for k in mism if set(k.split('->')) & {'3', '5'}]
    comp_ok = all(m['facts']['pathsFile'] for m in plan) and not read_classes
    paint_ok = all(m['facts']['paintsInLog'] + m['facts']['completedFromPaths'] == m['facts']['paints']
                   and m['facts']['completedFromPaths'] <= m['facts']['logDropped'] for m in plan)
    ck('all 44 W-04 recordings measured in plan order; segments = vertices on every logged polygon path; every paint of the '
       'vertex layer in the sequence (the truncated log completed)',
       len(plan) == 44 and [m['label'] for m in plan] == labels and comp_ok and paint_ok,
       f"{len(plan)} maps; polygon paths checked {grp(sum(m['facts']['polygonPaths'] for m in plan))}, equal "
       f"{grp(sum(m['facts']['segsEqualVertices'] for m in plan))}, the rest {dict(mism)} (segments -> vertices; none in the 3- or "
       f"5-segment classes the census reads); truncated logs "
       + ', '.join(f"{m['label']} (dropped {m['facts']['logDropped']}, completed {grp(m['facts']['completedFromPaths'])} paints from paths.json, "
                   f"paints {grp(m['facts']['paints'])})" for m in trunc))
    # (3) the count includes the two ridge tapers
    tw = [m['ridgeTapers'] for m in plan + fixtures if m['ridgeTapers']]
    n_w = sum(t['wings'] for t in tw); n2 = sum(t['exactlyTwo'] for t in tw)
    ck('the count includes the two ridge tapers: gable/hip wings carrying exactly two heavy-base triangles', n_w and n2 / n_w >= 0.99,
       f"{grp(n2)} of {grp(n_w)} wings ({n2 / n_w:.4f}) over {len(tw)} records with a vertex layer; worst record "
       f"{min(t['shareExactlyTwo'] for t in tw)}")
    # (3b) the sequence attribution against the geometry
    at = [m['attribution'] for m in plan + fixtures if m['attribution']]
    a_in = sum(a['insideOwnWing'] for a in at); a_n = sum(a['triangles'] for a in at)
    ck('attribution: the triangles the census gives a gable/hip wing lie on that wing (centroid inside its footprint fill)',
       a_n and a_in / a_n >= 0.99, f"{grp(a_in)} of {grp(a_n)} ({a_in / a_n:.4f}) over {len(at)} records; worst record "
       f"{min(a['share'] for a in at)}")
    # (4) the cap law as counts
    cap_bad = [m['label'] for m in plan if m['capsSquare'] > m['streetStrokes']
               or (m['streetStrokes'] - m['capsSquare'] > 0 and m['streetFills'] == 0)]
    ck('caps: square caps never exceed the street strokes, and round-capped street strokes occur only on maps with a filled street',
       not cap_bad, f"capSquare 1 on {sum(1 for m in plan if m['draw.capSquare'] == 1.0)} of 44 maps; below 1 on "
       + ', '.join(f"{m['label']} ({m['capsSquare']}/{m['streetStrokes']}, street fills {m['streetFills']})"
                   for m in plan if m['draw.capSquare'] != 1.0) + (f"; violations {cap_bad}" if cap_bad else ''))
    # (5) the row: no colour value in the record (this JSON, the markdown record), with a planted control
    scan_styles = set().union(*[m['_scan']['styles'] for m in plan + fixtures + source])
    scan_texts = set().union(*[m['_scan']['texts'] for m in plan + fixtures + source])
    scan_canv = set().union(*[m['_scan']['canvases'] for m in plan + fixtures + source])
    result['checks'] = checks                 # the receipts so far are scanned with the rest of the output
    body = json.dumps(result, sort_keys=True)
    texts = {'json': body}
    if os.path.exists(RECORD_MD):
        texts['md'] = open(RECORD_MD, encoding='utf8').read()

    def scan(t):
        hits = [s for s in scan_styles if s in t] + COLOUR_RE.findall(t)
        hits += [s for s in scan_texts if len(s) >= 4 and s in t]
        hits += [s for s in scan_canv if 'x' in s and len(s) >= 5 and re.search(r'(?<![\w.])' + re.escape(s) + r'(?![\w.])', t)]
        return hits
    hits = {k: scan(v) for k, v in texts.items()}
    planted = (texts.get('md', '') + '\n' + sorted(s for s in scan_styles if luma_of(s) is not None)[0]
               if red else texts.get('md', ''))
    with tempfile.TemporaryDirectory() as td:
        p = os.path.join(td, 'plant.md')
        open(p, 'w').write(texts.get('md', '') + '\nplanted ' + sorted(s for s in scan_styles if luma_of(s) is not None)[0] + '\n')
        control = scan(open(p).read())
    if red:
        hits['md'] = scan(planted)
    ck('row (2): no colour value in the record (no recorded style key, no colour literal, no label text, no canvas key in '
       'E20-ng-draw-census.md or its JSON); a planted style key is caught', all(not v for v in hits.values()) and 'md' in texts and bool(control),
       f"scanned {', '.join(texts)} against {len(scan_styles)} recorded style keys, {len(scan_texts)} label texts and "
       f"{len(scan_canv)} canvas keys: hits {sum(len(v) for v in hits.values())}; planted control caught {len(control)}", row=True)

    result['checks'] = checks
    result['checksFailed'] = fails
    result['rowChecksFailed'] = sum(1 for c in checks if c['rowChecker'] and not c['passed'])
    print(f"{'ALL PASS' if not fails else f'{fails} FAIL'} (row checks failed: {result['rowChecksFailed']})")
    if not red:
        dump()
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
