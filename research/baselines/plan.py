#!/usr/bin/env python3
"""research/baselines/plan.py -- M-1's capture plan and the seed families' research-side twin.

Lane m1/W-01 (docs/calibration/M-1-plan.md section 2, work item W-01; record docs/calibration/E01-capture-plan.md).
Research side only: nothing here enters plat/. Our own code; the hash below is MurmurHash3 x86_128 written from the
published public-domain algorithm, as docs/validation/bench/v12_h32_vectors.py writes it.

What it writes (V12 section 3.2.1, section 2.4, section 3.4.2):
  research/baselines/plan.json        every planned capture: reference, setting, index i, the seed by formula
                                      (seedOf(family, [i]) = reduce(H32(family + '/' + i))), the options, the slots;
                                      FTG as capture slots in capture order; Fantasy Manor's 41 buildings as recorded.
  research/baselines/metrics.m-1.json the metric registry's research-side twin: V12 section 3.4.2's ids, each at
                                      version 1.0.0, with input, scale, unit, output, per-seed reduction, sign, floor,
                                      tolerance, references and the M-1 work item that fills it (check C6 reads it).

Usage (from anywhere; Python 3.9, standard library only):
  python3 plan.py                       self-test, then write both files (refuses to write if any self-test fails)
  python3 plan.py --check               self-test, recompute both files, compare with the files on disk (exit 1 on diff)
  python3 plan.py --vectors LABEL ...   print 'verification 0x...' and '<label> <H32> PM <PM>' per label -- the exact
                                        line format of docs/validation/bench/v12_h32_vectors.py
  python3 plan.py --bind-ftg K=FOLDER   record FTG slot K's capture folder (a folder name under captures/ftg/), in order
  python3 plan.py --fail-ftg K=REASON   record FTG slot K as failed (reason: lower-case words joined by '-')
  python3 plan.py --catalogue-check     list V12 section 3.4.2's ids against the registry (exit 1 on any difference)

Regeneration keeps the FTG bindings already in plan.json; every other field is a pure function of this file, so a
rerun writes the same bytes.
"""
import hashlib
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
PLAN_PATH = os.path.join(HERE, 'plan.json')
METRICS_PATH = os.path.join(HERE, 'metrics.m-1.json')
V12_PATH = os.path.join(ROOT, 'docs', 'volumes', 'V12-calibration.md')
FTG_CAPTURES = os.path.join(ROOT, 'captures', 'ftg')

PLAN_DATE = '2026-10-03'          # fixed: the seeds are fixed by formula before anything is captured (V12 section 3.2.1)
METRICS_VERSION = '1.0.0'         # the registry twin's version; every metric starts at 1.0.0 (V12 section 3.4.3)
MINSTD_MOD = 2147483646           # parkMiller reduce: 1 + (H32 mod 2 147 483 646), the MINSTD state range 1 .. 2^31 - 2

# ---------------------------------------------------------------------------------------------------------------
# H32: MurmurHash3 x86_128, h1 of the digest, seed 0 (V12 section 2.4; ARCHITECTURE section 13.6 (2)).
# ---------------------------------------------------------------------------------------------------------------
M32 = 0xFFFFFFFF


def _rotl(x, r):
    return ((x << r) | (x >> (32 - r))) & M32


def _fmix(h):
    h ^= h >> 16
    h = (h * 0x85EBCA6B) & M32
    h ^= h >> 13
    h = (h * 0xC2B2AE35) & M32
    h ^= h >> 16
    return h


def mm3_x86_128(data, seed=0):
    n = len(data)
    nb = n // 16
    h1 = h2 = h3 = h4 = seed
    c1, c2, c3, c4 = 0x239B961B, 0xAB0E9789, 0x38B34AE5, 0xA1E38B93
    for i in range(nb):
        k1, k2, k3, k4 = [int.from_bytes(data[i * 16 + 4 * j:i * 16 + 4 * j + 4], 'little') for j in range(4)]
        k1 = (k1 * c1) & M32; k1 = _rotl(k1, 15); k1 = (k1 * c2) & M32; h1 ^= k1
        h1 = _rotl(h1, 19); h1 = (h1 + h2) & M32; h1 = (h1 * 5 + 0x561CCD1B) & M32
        k2 = (k2 * c2) & M32; k2 = _rotl(k2, 16); k2 = (k2 * c3) & M32; h2 ^= k2
        h2 = _rotl(h2, 17); h2 = (h2 + h3) & M32; h2 = (h2 * 5 + 0x0BCAA747) & M32
        k3 = (k3 * c3) & M32; k3 = _rotl(k3, 17); k3 = (k3 * c4) & M32; h3 ^= k3
        h3 = _rotl(h3, 15); h3 = (h3 + h4) & M32; h3 = (h3 * 5 + 0x96CD1C35) & M32
        k4 = (k4 * c4) & M32; k4 = _rotl(k4, 18); k4 = (k4 * c1) & M32; h4 ^= k4
        h4 = _rotl(h4, 13); h4 = (h4 + h1) & M32; h4 = (h4 * 5 + 0x32AC3B17) & M32
    tail = data[nb * 16:]
    t = len(tail)
    k1 = k2 = k3 = k4 = 0
    if t >= 13:
        for j in range(t - 1, 11, -1):
            k4 ^= tail[j] << (8 * (j - 12))
        k4 = (k4 * c4) & M32; k4 = _rotl(k4, 18); k4 = (k4 * c1) & M32; h4 ^= k4
    if t >= 9:
        for j in range(min(t, 12) - 1, 7, -1):
            k3 ^= tail[j] << (8 * (j - 8))
        k3 = (k3 * c3) & M32; k3 = _rotl(k3, 17); k3 = (k3 * c4) & M32; h3 ^= k3
    if t >= 5:
        for j in range(min(t, 8) - 1, 3, -1):
            k2 ^= tail[j] << (8 * (j - 4))
        k2 = (k2 * c2) & M32; k2 = _rotl(k2, 16); k2 = (k2 * c3) & M32; h2 ^= k2
    if t >= 1:
        for j in range(min(t, 4) - 1, -1, -1):
            k1 ^= tail[j] << (8 * j)
        k1 = (k1 * c1) & M32; k1 = _rotl(k1, 15); k1 = (k1 * c2) & M32; h1 ^= k1
    h1 ^= n; h2 ^= n; h3 ^= n; h4 ^= n
    h1 = (h1 + h2 + h3 + h4) & M32; h2 = (h2 + h1) & M32; h3 = (h3 + h1) & M32; h4 = (h4 + h1) & M32
    h1 = _fmix(h1); h2 = _fmix(h2); h3 = _fmix(h3); h4 = _fmix(h4)
    h1 = (h1 + h2 + h3 + h4) & M32; h2 = (h2 + h1) & M32; h3 = (h3 + h1) & M32; h4 = (h4 + h1) & M32
    return h1, h2, h3, h4


def H32(s):
    return mm3_x86_128(s.encode('utf-8'))[0]


def park_miller(v):
    return 1 + (v % MINSTD_MOD)


def seed_of(family, i, reduce):
    v = H32(family + '/' + str(i))
    return park_miller(v) if reduce == 'parkMiller' else v


def smhasher_verification():
    buf = b''
    for i in range(256):
        key = bytes(range(i))
        h = mm3_x86_128(key, 256 - i)
        buf += b''.join(x.to_bytes(4, 'little') for x in h)
    return mm3_x86_128(buf, 0)[0]


def vector_line(label):
    v = H32(label)
    return '%s %d PM %d' % (label, v, park_miller(v))


# The vectors this file must reproduce (W-01's checker; docs/validation/bench/v12_h32_vectors.out lines 7-9) and the
# SMHasher verification value (line 1). Written here so every run refuses to write a plan from a broken hash.
SMHASHER = 0xB3ECE62A
CHECK_VECTORS = [
    ('capture/MFCG/40/plain/0', 2003595628, 2003595629),
    ('capture/MFCG/80/river+coast/9', 1452355483, 1452355484),
    ('capture/NG/area/medium/0', 259196529, 259196530),
]


def self_test():
    problems = []
    got = smhasher_verification()
    if got != SMHASHER:
        problems.append('SMHasher verification %s != %s' % (hex(got), hex(SMHASHER)))
    for label, h32, pm in CHECK_VECTORS:
        v = H32(label)
        if v != h32 or park_miller(v) != pm:
            problems.append('vector %s: H32 %d PM %d, expected %d / %d' % (label, v, park_miller(v), h32, pm))
    return problems


# ---------------------------------------------------------------------------------------------------------------
# The plan (M-1-plan.md sections 2.1-2.3; V12 section 3.2.1's table).
# ---------------------------------------------------------------------------------------------------------------
MFCG_BUILD = '12710731'
MFCG_URL = 'https://html-classic.itch.zone/html/%s/bin/index.html' % MFCG_BUILD
# The 2026-09-25 sweep's query (captures/mfcg/exports-sweep-2026-09-25/sweep.sh and README, How the files were made),
# the seed substituted; the export key is appended per file ('&export=json' with --shot, then '&export=svg').
MFCG_QUERY = {
    'plain': 'size={size}&walls=1&citadel=1&plaza=1&temple=1&gates=-1&river=0&coast=0&seed={seed}',
    'river+coast': 'size={size}&walls=1&citadel=1&plaza=1&temple=1&gates=-1&river=1&coast=1&seed={seed}',
}
# What the app's canonical href must carry after each export (M-1-plan section 2.2; the sweep README's hrefAfter).
MFCG_HREF_EXPECT = {
    'plain': {'size': '{size}', 'seed': '{seed}', 'shantytown': '0', 'greens': '0', 'river': '0', 'coast': '0'},
    'river+coast': {'size': '{size}', 'seed': '{seed}', 'shantytown': '0', 'greens': '0', 'river': '1', 'coast': '1'},
}
MFCG_SETTINGS = [  # (size, options, n, matched rung, purpose)
    (40, 'plain', 10, 'TOWN', 'rows'),
    (80, 'plain', 10, 'CITY', 'rows'),
    (130, 'plain', 10, 'METROPOLIS', 'rows'),
    (80, 'river+coast', 5, 'CITY', 'stress (descriptive)'),
]

NG_BUILD = '11441280'
NG_TEMPLATES = ['area', 'street', 'square', 'ring']
NG_SIZES = [('medium', 5), ('small', 3), ('large', 3)]

FM_BUILD = '890'
FM_CAPTURE = '2026-09-25T11-25-38'
FM_N = 41

# FTG's six-day schedule (M-1-plan section 2.1; ARCHITECTURE section 13.6 (2)); FTG cannot be seeded.
FTG_NOMINAL = {'BIG_TOWN': 5600, 'BIG_CITY': 24500}
FTG_RUNG = {'BIG_TOWN': 'TOWN', 'BIG_CITY': 'CITY'}
FTG_SCHEDULE = [  # (day, size, water, the form's water options in our words)
    (1, 'BIG_TOWN', 'none', 'nearest none: no coast, rivers off'),
    (2, 'BIG_CITY', 'none', 'nearest none: no coast, rivers off'),
    (3, 'BIG_TOWN', 'coast+river', 'nearest coast+river: coastal, rivers on'),
    (4, 'BIG_CITY', 'coast+river', 'nearest coast+river: coastal, rivers on'),
    (5, 'BIG_TOWN', 'coast+river', 'nearest coast+river: coastal, rivers on (second)'),
    (6, 'BIG_CITY', 'coast+river', 'nearest coast+river: coastal, rivers on (second)'),
]
CAPTURE_RE = re.compile(r'^\d{4}-\d{2}-\d{2}T[\d-]{8}$')     # V12 section 3.3 C2's capture-folder pattern
REASON_RE = re.compile(r'^[a-z]+(-[a-z]+)*$')


def build_plan(prior_slots):
    families = []
    collisions = {}

    def note(seed, label):
        collisions.setdefault(seed, []).append(label)

    for size, opts, n, rung, purpose in MFCG_SETTINGS:
        fam = 'capture/MFCG/%d/%s' % (size, opts)
        entries = []
        for i in range(n):
            s = seed_of(fam, i, 'parkMiller')
            note(s, fam + '/' + str(i))
            q = MFCG_QUERY[opts].format(size=size, seed=s)
            entries.append({
                'i': i,
                'label': fam + '/' + str(i),
                'seed': s,
                'name': 'size%d-%s-%d' % (size, opts.replace('+', ''), i),
                'query': q,
                'exports': [q + '&export=json', q + '&export=svg'],
                'hrefExpect': {k: v.format(size=size, seed=s) for k, v in MFCG_HREF_EXPECT[opts].items()},
            })
        families.append({
            'family': fam, 'reference': 'MFCG', 'reduce': 'parkMiller', 'priority': 3,
            'setting': {'mfcgSize': size, 'options': opts, 'rung': rung},
            'purpose': purpose, 'indices': [0, n], 'workItem': 'W-03', 'entries': entries,
        })
    for size, n in NG_SIZES:
        for t in NG_TEMPLATES:
            fam = 'capture/NG/%s/%s' % (t, size)
            entries = []
            for i in range(n):
                s = seed_of(fam, i, 'parkMiller')
                note(s, fam + '/' + str(i))
                entries.append({
                    'i': i,
                    'label': fam + '/' + str(i),
                    'seed': s,
                    'name': '%s-%s-%d' % (t, size, i),
                    'record': ['--target', 'neighbourhood', '--runs', '0', '--passes', 'draw', '--vertices',
                               '--seed', str(s), '--query', 'tags=%s,%s' % (t, size)],
                })
            families.append({
                'family': fam, 'reference': 'NG', 'reduce': 'parkMiller', 'priority': 3,
                'setting': {'template': t, 'size': size, 'scale': 'relative'},
                'purpose': 'rows' if size == 'medium' else 'size sweep (CONFIDENCE section 6 #2)',
                'indices': [0, n], 'workItem': 'W-04', 'entries': entries,
            })

    prior = {s.get('slot'): s for s in (prior_slots or [])}
    slots = []
    per_key = {}
    per_size = {}
    for k, (day, size, water, words) in enumerate(FTG_SCHEDULE):
        j = per_key.get((size, water), 0)
        per_key[(size, water)] = j + 1
        o = per_size.get(size, 0)
        per_size[size] = o + 1
        p = prior.get(k, {})
        slots.append({
            'slot': k,
            'day': day,
            'family': 'capture/FTG/%s' % size,
            'order': o,
            'label': 'capture/FTG/%s/%s/%d' % (size, water, j),
            'ftgSize': size,
            'rung': FTG_RUNG[size],
            'water': water,
            'waterOptions': words,
            'nominalPopulation': FTG_NOMINAL[size],
            'seed': None,
            'capture': p.get('capture'),
            'failed': p.get('failed'),
        })

    dupes = sorted([sorted(v) for v in collisions.values() if len(v) > 1])
    plan = {
        'schema': 'research.capture-plan/1',
        'lane': 'm1/W-01',
        'planDate': PLAN_DATE,
        'script': 'research:baselines/plan.py',
        'seedRule': {
            'formula': "seedOf(family, [i]) = reduce(H32(family + '/' + i)); H32 = MurmurHash3 x86_128 h1, seed 0, "
                       "of the UTF-8 label (V12 section 2.4)",
            'parkMiller': '1 + (H32 mod 2147483646), the MINSTD state range 1 .. 2147483646 (ARCHITECTURE '
                          'section 13.6 (2))',
            'collisionDomain': 'capture families are excluded from the collision domain (they seed a reference, '
                               'not us; V12 section 2.4), so no capture path ever gains /r1',
            'smhasherVerification': '0x%08x' % SMHASHER,
            'checkVectors': [{'label': l, 'h32': h, 'parkMiller': p} for l, h, p in CHECK_VECTORS],
            'checkVectorNote': 'capture/MFCG/80/river+coast/9 checks the formula at an index beyond the plan\'s five '
                               'stress seeds (i = 0..4); it is no plan entry',
        },
        'referenceBuilds': {
            'MFCG': {'build': 'itch:' + MFCG_BUILD, 'url': MFCG_URL, 'json': '0.11.5',
                     'rule': 're-resolved by profiler/lib/common.mjs resolveTargetUrl at capture time; a newer build '
                             'is a declared pin shift and the owner is told before the sweep (M-1-plan sections 5, 9)'},
            'NG': {'build': 'itch:' + NG_BUILD, 'version': '1.2.2', 'rule': 'the same re-resolution rule'},
            'FTG': {'build': 'ftg:<server date>+<sha256 of the create-request body, 12 hex>, per capture'},
            'FM': {'build': FM_BUILD, 'version': '1.0.0', 'itchUpload': '2851818'},
        },
        'mfcgExport': {
            'tool': 'profiler/export.mjs',
            'perSeed': 'one cold navigation per file: the JSON export with --shot, then the SVG export',
            'modelledOn': 'captures/mfcg/exports-sweep-2026-09-25/sweep.sh',
            'retryRule': 'an export whose console trace shows a second attempt (a different internal seed under the '
                         'same href) is recorded in the row\'s sample.failed with reason retry, never dropped (C7)',
        },
        'ngRecord': {
            'tool': 'profiler/record.mjs',
            'perSeed': 'one cold load per seed, no regeneration, so every generation is the plan\'s seed',
        },
        'families': families,
        'ftg': {
            'seedable': False,
            'why': 'the server draws its own seed; the plan lists capture slots in capture order (V12 section 3.2.1)',
            'slotRule': 'slot k is the k-th capture taken; a refused day slides the schedule; a slot never taken is '
                        'recorded failed with its reason, never faked (M-1-plan section 9; ARCHITECTURE 13.6 (12))',
            'populationSource': 'nominal unless the decoded payload holds a resident count (re-checked per capture)',
            'workItem': 'W-02',
            'slots': slots,
        },
        'fm': {
            'reference': 'FM', 'build': FM_BUILD, 'capture': FM_CAPTURE, 'n': FM_N,
            'sample': 'gen-0 (cold load) and gen-1 .. gen-40 (regenerations), all settled, as recorded; no new '
                      'capture (V02 section 7.4; captures/manor/README-frequencies.md)',
            'generations': ['gen-%d' % g for g in range(FM_N)],
            'rowsAt': 'M6c (V02); not an M-1 row',
        },
        'notInThisPlan': [
            'VG: V07 section 7 owns its recordings and rows; they cross at V-M4 (V12 section 3.4.4)',
            'the panel identifier files (fm-captures.json, dw-captures.json, vg-seeds.json; ftg-captures.json; '
            'ng-counts.json) are written for their panels at M1, M5, M6c and V-M4 (M-1-plan section 1, Not M-1\'s)',
        ],
        'counts': {
            'mfcgExports': sum(n for _, _, n, _, _ in MFCG_SETTINGS),
            'mfcgFiles': 2 * sum(n for _, _, n, _, _ in MFCG_SETTINGS),
            'ngGenerations': sum(n for _, n in NG_SIZES) * len(NG_TEMPLATES),
            'ftgSlots': len(FTG_SCHEDULE),
            'fmBuildings': FM_N,
            'seedCollisions': dupes,
        },
    }
    return plan


# ---------------------------------------------------------------------------------------------------------------
# metrics.m-1.json -- V12 section 3.4.2's catalogue as a registry twin.
# Every field below is STATED by the catalogue row, or comes from section 3.4.2's DEFAULT rules, or is INFERRED here
# from the row's words; 'basis' says which, and 'open' names the work item that must settle a field before its row.
# ---------------------------------------------------------------------------------------------------------------
def _log_edges(lo, hi, bins=24):
    return [round(lo * (hi / lo) ** (k / bins), 6) for k in range(bins + 1)]


EDGES = {
    'blocksM2': {'edges': _log_edges(50, 50000), 'underflow': True, 'overflow': True,
                 'rule': 'log-spaced, 24 bins, 50 - 50 000 m2, with underflow and overflow bins (default rule)'},
    'buildingsM2': {'edges': _log_edges(10, 2000), 'underflow': True, 'overflow': True,
                    'rule': 'log-spaced, 24 bins, 10 - 2 000 m2, with underflow and overflow bins (default rule)'},
    'plotsM2': {'edges': _log_edges(20, 5000), 'underflow': True, 'overflow': True,
                'rule': 'log-spaced, 24 bins, 20 - 5 000 m2, with underflow and overflow bins (default rule)'},
    'widthsM': {'edges': [round(0.25 * k, 2) for k in range(121)], 'underflow': False, 'overflow': True,
                'rule': '0.25 m bins to 30 m with an overflow bin (default rule)'},
    'stepDeg': {'edges': list(range(46)), 'underflow': False, 'overflow': True,
                'rule': '1 degree bins over 0 - 45 degrees plus overflow (stated by the row)'},
}

# absFloor shorthands (default rules): a number in the metric's unit, or a share of the reference's median.
AF_SHARE = {'value': 0.02, 'basis': 'default: shares, ratios and rank statistics'}
AF_ANGLE = {'value': 1, 'basis': 'default: angles 1 degree'}
AF_COUNT = {'value': 0.5, 'basis': 'default: counts'}
AF_BITS = {'value': 0.05, 'basis': 'default: entropies'}
AF_RANKCORR = {'value': 0.05, 'basis': "default: Moran's I and Spearman"}
AF_LEN = {'relToReferenceMedian': 0.02, 'basis': 'default: lengths 2 % of the reference median'}
AF_AREA = {'relToReferenceMedian': 0.05, 'basis': 'default: areas 5 % of the reference median'}
AF_DENS = {'relToReferenceMedian': 0.05, 'basis': 'default: densities 5 % of the reference median'}
AF_TIME = {'relToReferenceMedian': 0.05, 'basis': 'default: timings 5 %'}

TOL_EXACT = {'rel': 1e-9}                 # geo, model, trace, counts (default)
TOL_RENDER = {'abs': 0.01}                # render (default)
TWIN_TOL = {'rel': 0.005, 'orLastDigit': 1}   # T-V12-3's M-1 twin comparison (default)


def P(id, input, scale, unit, out, per_seed, af, refs, row, sign='positive', basis='default rules',
      sampling=None, open=None, field_units=None):
    """A parity metric: one a reference row can carry."""
    o = {'kind': out[0], 'unit': unit}
    if out[0] == 'distribution':
        o.update(EDGES[out[1]] if out[1] else {'edges': None})
    if out[0] == 'vector':
        o['fields'] = out[1]
        if field_units:
            o['fieldUnits'] = field_units
    if input == 'render':
        tol = TOL_RENDER
    elif input == 'timing':
        tol = None
    else:
        tol = TOL_EXACT
    d = {'id': id, 'version': METRICS_VERSION, 'input': input, 'scale': scale, 'unit': unit, 'output': o,
         'perSeed': per_seed, 'sign': sign, 'absFloor': af, 'tolerance': tol, 'twinTolerance': TWIN_TOL,
         'references': refs, 'row': row, 'parity': True, 'basis': basis}
    if sampling:
        d['sampling'] = sampling
    if open:
        d['open'] = open
    return d


def O(id, input, scale, row, basis='ours only: no reference row; the product registry fills the remaining fields at M1'):
    """A metric of ours only (no reference): registered so C6 finds every catalogue id; no M-1 row reads it."""
    return {'id': id, 'version': METRICS_VERSION, 'input': input, 'scale': scale, 'references': [], 'row': row,
            'parity': False, 'basis': basis}


def F(pattern, input, scale, refs, row, members):
    """A family: its member ids are not listed by V12 section 3.4.2; 'members' says who fixes them."""
    return {'id': pattern, 'family': True, 'version': METRICS_VERSION, 'input': input, 'scale': scale,
            'references': refs, 'row': row, 'parity': bool(refs), 'members': members}


def R(ref, role=None):
    d = {'ref': ref}
    if role:
        d['role'] = role
    return d


REGISTRY = [
    P('street.turn100', 'geo', 'metric', 'deg', ('scalar',), 'median', AF_ANGLE, [R('FTG')], 'street turning',
      basis='stated; unit degrees per 100 m read as deg (inferred); perSeed the length-weighted median (stated)'),
    P('street.stepHist', 'geo', 'metric', 'deg', ('distribution', 'stepDeg'), 'sample', AF_ANGLE,
      [R('FTG', 'weakness')], 'street turning', basis='stated'),
    P('street.entropy50', 'geo', 'metric', 'bits', ('scalar',), 'value', AF_BITS, [R('FTG', 'weakness')],
      'street turning', basis='stated; one entropy per town (inferred)'),
    O('street.drift600', 'model', 'metric', 'growth drift'),
    P('junction.angles', 'geo', 'free', 'deg', ('vector', ['median', 'p5']), 'value', AF_ANGLE,
      [R('NG'), R('FTG')], 'junction arm angles', basis='stated (per seed median and p5)'),
    P('junction.share4', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG'), R('FTG')],
      'junction arm angles', basis='stated'),
    P('street.runs', 'geo', 'metric', 'm', ('vector', ['arterial', 'street', 'lane', 'alley', 'track']), 'median',
      AF_LEN, [R('FTG')], 'street runs by class',
      basis='stated (per seed median per class); fields are the profile\'s way classes a run can carry (inferred)'),
    P('bldg.r4.60', 'geo', 'metric', 'ratio', ('scalar',), 'median', AF_SHARE, [R('MFCG')], 'MFCG street signature',
      basis='stated; R4 is a resultant length in [0, 1], unit ratio (inferred)',
      sampling={'label': 'bldg.r4.60', 'n': 1500}),
    P('bldg.r4.120', 'geo', 'metric', 'ratio', ('scalar',), 'median', AF_SHARE, [R('MFCG')], 'MFCG street signature',
      basis='as bldg.r4.60', sampling={'label': 'bldg.r4.120', 'n': 1500}),
    P('bldg.r4.250', 'geo', 'metric', 'ratio', ('scalar',), 'median', AF_SHARE, [R('MFCG')], 'MFCG street signature',
      basis='as bldg.r4.60', sampling={'label': 'bldg.r4.250', 'n': 1500}),
    P('bldg.wallAlign', 'geo', 'metric', 'none',
      ('vector', ['b0_40.median', 'b0_40.share15', 'b40_100.median', 'b40_100.share15', 'b100_200.median',
                  'b100_200.share15']), 'value', AF_ANGLE, [R('MFCG')], 'MFCG street signature',
      basis='stated (per band the median and the share <= 15 degrees)',
      field_units={'median': 'deg', 'share15': 'share'},
      open='W-07: the vector mixes degrees and shares while MetricDef.output carries one unit; the band floor for '
           'the share fields is 0.02 (default) -- split or keep fieldUnits, ruled before the row'),
    P('sgd.tShare', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('sgd.deadEnds', 'geo', 'metric', 'perKm', ('scalar',), 'value', AF_DENS, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('blockc.perHa', 'geo', 'metric', 'perHa', ('scalar',), 'value', AF_DENS, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('blockc.lotsPer', 'geo', 'free', 'count', ('scalar',), 'median', AF_COUNT, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('block.area', 'geo', 'metric', 'm2', ('distribution', 'blocksM2'), 'sample', AF_AREA, [R('NG')], 'blocks',
      basis='stated (built blocks per district; distribution)',
      open='W-11: NG inputs are relative (V12 section 2.2), so NG rows read block.areaRel; block.area applies to '
           'metric sources'),
    P('block.areaRel', 'geo', 'free', 'ratio', ('distribution', None), 'sample', AF_AREA, [R('NG')], 'blocks',
      basis='stated as the relative variant of block.area (areas / the median footprint area)',
      open='W-11: V12 states no bin edges for the relative variant (edges null here); edges in median-footprint '
           'units are owed before the first row'),
    P('block.countTemplate', 'counts', 'free', 'count', ('scalar',), 'value', AF_COUNT, [R('NG')], 'blocks',
      basis='stated (built blocks per hood per template at medium)'),
    P('block.courtShare', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG'), R('MFCG')],
      'deep block interiors', basis='stated'),
    P('cut.sigma', 'trace', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('NG')], 'bent-cut signature',
      basis="section 4.6's recorded-frame measure; unit ratio (inferred: a relative offset)"),
    P('cut.cornerMid', 'trace', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG')], 'bent-cut signature',
      basis="section 4.6's measure; unit share (inferred)"),
    P('cut.arrival85', 'trace', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG')], 'bent-cut signature',
      basis="section 4.6's measure (arrivals >= 85 degrees); unit share (inferred)"),
    P('cut.fillet', 'trace', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG')], 'bent-cut signature',
      basis="section 4.6's measure (filleted corners); unit share (inferred)"),
    P('fg.recoverability', 'render', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('MFCG')],
      'figure-ground and streetwall', basis="stated (section 8.5's metric)"),
    P('fg.coverWalled', 'geo', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('MFCG', 'descriptive')],
      'figure-ground and streetwall', basis='stated'),
    P('fg.streetwall', 'geo', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('MFCG')],
      'figure-ground and streetwall', basis='stated'),
    P('bldg.area', 'geo', 'metric', 'm2', ('vector', ['median', 'p95']), 'value', AF_AREA,
      [R('FTG'), R('MFCG', 'descriptive')], 'plots and footprints', basis='stated (per seed median and p95)'),
    P('bldg.quadSide', 'geo', 'metric', 'm', ('scalar',), 'median', AF_LEN, [R('FTG')], 'plots and footprints',
      basis='stated'),
    P('bldg.worstCorner', 'geo', 'free', 'deg', ('scalar',), 'value', AF_ANGLE, [R('FTG')], 'plots and footprints',
      basis='stated (per seed p95 of the per-footprint largest corner deviation)'),
    O('plot.area', 'model', 'metric', 'plots and footprints'),
    P('bldg.partyShare', 'geo', 'free', 'share', ('scalar',), 'median', AF_SHARE,
      [R('NG'), R('FTG', 'descriptive')], 'party walls and attachment',
      basis='stated (per class median; a reference has one class, unknown)'),
    P('bldg.attached', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG'), R('FTG', 'descriptive')],
      'party walls and attachment', basis='stated'),
    P('plot.spearman', 'model', 'free', 'ratio', ('scalar',), 'value', AF_RANKCORR, [R('NG', 'weakness')],
      'plot-area gradient', sign='any', basis="stated; NG's plots read as geo (stated)"),
    P('plot.moran', 'model', 'free', 'ratio', ('scalar',), 'value', AF_RANKCORR, [R('NG', 'weakness')],
      'plot-area gradient', sign='any', basis="stated; NG's plots read as geo (stated)"),
    P('plot.cvDistrict', 'model', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('NG', 'weakness')],
      'plot-area gradient', basis="stated; NG's plots read as geo (stated)"),
    P('alley.gradient', 'model', 'free', 'ratio', ('scalar',), 'value', AF_RANKCORR, [R('FTG', 'weakness')],
      'alleys', sign='any', basis='stated (a Spearman)'),
    P('walled.share', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('MFCG')], 'walled share and ribbons',
      basis='stated'),
    P('ribbon.share', 'geo', 'metric', 'share', ('scalar',), 'share', AF_SHARE, [R('MFCG')],
      'walled share and ribbons', basis='stated'),
    P('district.area', 'geo', 'metric', 'ha', ('scalar',), 'median', AF_AREA, [R('MFCG')], 'MFCG anchors',
      basis='stated'),
    P('plaza.area', 'geo', 'metric', 'ha', ('scalar',), 'value', AF_AREA, [R('MFCG')], 'MFCG anchors',
      basis='stated'),
    P('castle.area', 'geo', 'metric', 'ha', ('scalar',), 'value', AF_AREA, [R('MFCG')], 'MFCG anchors',
      basis='stated'),
    P('castle.compact', 'geo', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('MFCG')], 'MFCG anchors',
      basis='stated'),
    P('wall.nodeSpacing', 'geo', 'metric', 'm', ('scalar',), 'value', AF_LEN, [R('MFCG')], 'MFCG anchors',
      basis='stated (p50)'),
    P('quarter.count', 'geo', 'free', 'count', ('scalar',), 'value', AF_COUNT, [R('MFCG')], 'MFCG anchors; labels',
      basis='stated (references: district features)'),
    P('outline.r90cv', 'geo', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('FTG')], 'outline anisotropy',
      basis='stated'),
    P('outline.roadRatio', 'geo', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('FTG')], 'outline anisotropy',
      basis='stated'),
    O('usemix.resOnly', 'model', 'free', 'block-level use mix'),
    O('usemix.entropy', 'model', 'free', 'block-level use mix'),
    O('usemix.liveIn', 'model', 'free', 'block-level use mix'),
    P('wall.towerSpacing', 'geo', 'metric', 'm', ('scalar',), 'value', AF_LEN, [R('FTG'), R('MFCG')],
      'towers and gates', basis='stated (p50)'),
    P('wall.ungated', 'geo', 'free', 'count', ('scalar',), 'value', AF_COUNT, [R('FTG'), R('MFCG')],
      'towers and gates', basis='stated'),
    P('gate.count', 'geo', 'free', 'count', ('scalar',), 'value', AF_COUNT, [R('FTG'), R('MFCG')], 'towers and gates',
      basis='stated'),
    P('water.step', 'geo', 'metric', 'm', ('scalar',), 'median', AF_LEN, [R('FTG'), R('MFCG', 'descriptive')],
      'water', basis='stated'),
    P('water.riverWidth', 'geo', 'metric', 'm', ('scalar',), 'median', AF_LEN, [R('FTG'), R('MFCG', 'descriptive')],
      'water', basis='stated'),
    P('tree.nnP1', 'geo', 'metric', 'm', ('scalar',), 'value', AF_LEN, [R('FTG', 'weakness')], 'tree scatter',
      basis='stated (the 1st percentile of nearest-neighbour distances, inferred from the id)'),
    P('tree.nnMedian', 'geo', 'metric', 'm', ('scalar',), 'median', AF_LEN, [R('FTG', 'weakness')], 'tree scatter',
      basis='stated'),
    P('tree.pcf', 'geo', 'metric', 'ratio', ('vector', ['r%d' % r for r in range(1, 21)]), 'value', AF_SHARE,
      [R('FTG', 'weakness')], 'tree scatter', basis='stated (the pair-correlation function at 1 .. 20 m)'),
    P('pop.perBuilding', 'geo', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('MFCG', 'weakness'), R('FTG')],
      'population and buildings', basis='stated'),
    P('time.model', 'timing', 'free', 'ms', ('scalar',), 'value', AF_TIME, [R('MFCG'), R('FTG'), R('NG')],
      'generation time', basis="stated (section 12's measure / the calibration score ratio); timing has no "
                               'same-input tolerance'),
    P('time.firstMap', 'timing', 'free', 'ms', ('scalar',), 'value', AF_TIME, [R('MFCG'), R('FTG'), R('NG')],
      "section 12's targets", basis='stated'),
    P('time.worst', 'timing', 'free', 'ms', ('scalar',), 'value', AF_TIME, [R('MFCG'), R('FTG'), R('NG')],
      'MFCG-worst configurations', basis='stated'),
] + [O('wait.' + w, 'timing', None, 'item 119 (f)') for w in
     ['generate', 'regenerate', 'openFromSF', 'dossierChange', 'advanceTime', 'historyReplay', 'export', 'migrate',
      'progressMs']] + [
    O('time.findSuggest', 'timing', None, "item 120 (k): section 12.5's overlay budget"),
    O('time.findGlow', 'timing', None, "item 120 (k): section 12.5's overlay budget"),
] + [O(x, 'model', None, 'the C rows of section 13.5') for x in
     ['delivery.tier', 'ladder.use', 'vacancy.share', 'quay.reach', 'residue.share', 'entrance.frontage',
      'hidden.share']] + [
    F('wealth.*', 'model', 'free', [R('FTG', 'descriptive')], 'the C rows of section 13.5',
      'W-05 fixes the member ids (one per lifestyle tier share) before its first row (M-1-plan D25)'),
    F('draw.*', 'render', None, [R('MFCG'), R('NG')], 'draw style',
      "W-07 fixes the member ids for MFCG's draw-style rows (section 8.3's census; M-1-plan D28); "
      'draw.contrast and draw.hairline below are members of ours'),
    F('label.*', 'model', None, [R('MFCG', 'weakness'), R('NG')], 'labels',
      "section 9.4's checks; no M-1 work item measures a label row (M-1-plan section 1 lists none)"),
    P('variety.dispersion', 'geo', 'free', 'z', ('scalar',), 'value', None, [R('MFCG'), R('FTG')],
      'between-seed variety', sign='any',
      basis='stated (mean pairwise distance of standardised signature vectors over the seeds); sign any by the '
            'default rule for unit z',
      open='W-09 (MFCG) and W-05 (FTG): V12 states no absFloor for a z distance; set before the first row'),
    P('market.secondary', 'geo', 'free', 'count', ('scalar',), 'value', AF_COUNT, [R('MFCG')], 'markets',
      basis='stated'),
    P('market.adjacent', 'geo', 'free', 'count', ('scalar',), 'value', AF_COUNT, [R('MFCG')], 'markets',
      basis='stated'),
] + [O('palette.' + x, 'render', None, 'section 13.4 palette bar (item 69 owner-set targets)') for x in
     ['paperLuma', 'paperWarmth', 'inkLuma', 'inkWarmth', 'plateChroma']] + [
    F('fm.*', 'counts', 'free', [R('FM')], 'V02 section 7.4',
      "V02's T-V2-31 rows (nine rows and the plan extent); crosses at M6c, not an M-1 row"),
    F('vg.*', 'geo', None, [R('VG')], 'V07 section 7', "V07 section 7's parity metrics; cross at V-M4"),
    F('siting.<spec>', 'model', None, [R('corpus')], 'T71-3; file g bars',
      "one per registered NullModelSpec (V12 section 3.6); the corpus at M-CAL"),
    F('bar.<barId>', 'model', 'free', [], "the register's entries", 'generated per registered owner bar (V12 2.1)'),
    F('frame.<table>.<column>', 'geo', None, [R('corpus')], "the register's corpus entries",
      'generated per calibratable column (V12 section 2.1); notApplicable before its corpus run'),
    P('wall.barrierShare', 'geo', 'free', 'share', ('scalar',), 'value', AF_SHARE,
      [R('MFCG', 'descriptive'), R('corpus')], "item 106's use of natural barriers", basis='stated'),
    O('wall.condition', 'model', 'metric', 'item 114 (g)'),
    O('grid.r4', 'geo', 'free', "item 109 (c)'s distinctness bar"),
    O('grid.axis', 'geo', 'free', "item 109 (c)'s distinctness bar"),
    O('ruin.blockArea', 'geo', 'metric', "item 109 (c)'s distinctness bar"),
    O('plan.rightAngle', 'geo', 'free', "item 109 (i)'s structure test"),
    O('plan.straight', 'geo', 'free', "item 109 (i)'s structure test"),
    F('void.*', 'model', None, [], "V12 section 2.7b's indicators", 'ours only; the product registry'),
    F('link.*', 'model', None, [], "V12 section 2.7b's indicators", 'ours only; the product registry'),
    O('ladder.members', 'model', None, "V12 section 2.7b's indicators"),
] + [O(x, 'model', s, 'item 109 (k) (2)') for x, s in
     [('crypt.present', 'free'), ('crypt.areaM2', 'metric'), ('crypt.rank', 'free'), ('crypt.joined', 'free')]] + [
    O(x, 'model', 'free', 'item 109 (k) (3)') for x in ['catacomb.count', 'catacomb.source', 'catacomb.rank']] + [
    O(x, 'model', s, 'item 109 (k) (4)-(6)') for x, s in
    [('catacomb.extentM2', 'metric'), ('catacomb.fill', 'free'), ('catacomb.blockedBy', None),
     ('catacomb.growthM2', 'metric')]] + [
    O(x, 'model', 'free', 'item 110 (b), (f)') for x in
    ['raised.count', 'raised.generatedBelowCity', 'raised.reasonMissing', 'raised.overCap']] + [
    O('raised.junctions', 'geo', 'free', 'item 110 (f)'),
    O('retaining.lengthM', 'model', 'metric', 'item 110 (a), (f)'),
    O('retaining.onFlatM', 'model', 'metric', 'item 110 (a), (f)'),
    O('deck.buildings', 'geo', 'free', 'item 110 (c), (d)'),
    O('tier.count', 'model', 'free', 'item 110 (c), (d)'),
    O('crossing.kinds', 'model', 'free', 'the ways.crossing register line'),
    O('water.needRatio', 'model', 'free', "the water and climate register lines; V11's T-V11-33"),
    O('water.kinds', 'model', 'free', 'item 111 (d)'),
    O('water.walkShare', 'model', 'free', 'item 111 (d)'),
    O('water.distByBand', 'model', 'metric', 'item 111 (d)'),
    O('ruin.survival', 'model', 'free', 'the under.ruin survival register line'),
    O('shade.gap', 'model', None, 'item 102 (g)'),
    O('bldg.grandeur', 'model', 'free', 'item 115 (f)'),
    O('view.limitStop', 'model', 'free', 'item 116 (e)'),
] + [O(x, i, s, 'item 117 (i)') for x, i, s in
     [('season.crownColours', 'render', 'free'), ('season.leafCover', 'render', 'free'),
      ('season.iceOrder', 'render', None), ('season.iceSnow', 'render', 'free'), ('time.reskin', 'timing', None)]] + [
    O(x, i, s, 'item 118 (h)') for x, i, s in
    [('festival.weeks', 'render', None), ('festival.kinds', 'model', 'free'), ('festival.stage', 'model', None),
     ('festival.blocked', 'model', 'free')]] + [
    O('find.' + x, 'model', 'free', 'item 120 (k)') for x in ['matches', 'leaks', 'held', 'pins', 'cues']] + [
    O('resolution.changes', 'timing', None, 'item 121 (h)'),
    O('resolution.p95', 'timing', None, 'item 121 (h)'),
    O('resolution.textPx', 'render', 'free', 'T121-5, T121-8'),
    O('resolution.ultra4k', 'timing', 'free', 'T121-5, T121-8'),
] + [O('crisis.' + x, 'model', 'free', 'item 122 (g)') for x in ['weeks', 'stable', 'scale', 'blocked', 'share']] + [
    O('time.crisisReskin', 'timing', None, "section 12.10's R12-37"),
    O('crisis.rasterShare', 'timing', 'free', "section 12.10's R12-37"),
] + [O('crisis.' + x, 'model', 'free', 'item 122 (h)-(i)') for x in ['areaPerHead', 'coalition', 'framing', 'ring']] + [
    O('damage.nested', 'model', 'free', 'item 123 (f)'),
    O('damage.breakLevel', 'model', 'free', 'item 123 (f)'),
] + [O('weather.' + x, i, None, 'item 124 (i)') for x, i in
     [('frameMs', 'timing'), ('snow', 'render'), ('aridRain', 'model'), ('cover', 'render'), ('luma', 'render'),
      ('replay', 'model')]] + [
    O('port.fallbacks', 'model', 'free', 'item 125 (e)'),
    O('layout.touch', 'render', 'free', 'item 126 (e)'),
    O('layout.belowMedium', 'render', 'free', 'item 126 (e)'),
    P('street.detour', 'geo', 'metric', 'ratio', ('scalar',), 'median', AF_SHARE, [R('NG')], 'detour index <M-1>',
      basis='stated (200 node pairs >= 100 m apart; per seed median); unit ratio (inferred)',
      sampling={'label': 'street.detour', 'n': 200},
      open='W-11: a metric-scale metric (pairs >= 100 m apart) on a relative-scale NG input is notApplicable by '
           'V12 section 3.5.6 unless a relative rule is stated'),
    P('street.cyclesPerKm2', 'geo', 'metric', None, ('scalar',), 'value', AF_DENS, [R('NG')],
      'cycles per km2 <M-1>', basis='stated',
      open='W-11: per km2 is not in MetricUnit (perHa and perKm are); and the metric needs metres while NG inputs '
           'are relative -- a unit and a relative rule are owed before the row'),
    P('plot.minWidth', 'geo', 'metric', 'm', ('distribution', 'widthsM'), 'sample', AF_LEN, [R('NG')],
      'plot minimum width <M-1>', basis="stated (NG's plots geo; ours model)",
      open='W-11: metres on a relative-scale NG input -- a relative variant (as block.areaRel) is owed'),
    P('fg.streetwallGap100', 'geo', 'metric', None, ('scalar',), 'value', AF_DENS, [R('NG')],
      'streetwall gap <M-1>', basis='stated (gaps > 2 m per 100 m of frontage)',
      open='W-11: no MetricUnit names a count per 100 m, and the metric needs metres while NG inputs are relative'),
    P('bldg.pairing', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG')],
      'adjacent-footprint pairing <M-1>', basis='stated'),
    O('draw.contrast', 'render', None, "the M1 exit's contrast matrix (our floors)"),
    O('draw.hairline', 'render', None, "the M1 exit's hairline fidelity (our floors)"),
    P('ftg.ringBlock', 'geo', 'metric', 'm2', ('distribution', 'blocksM2'), 'sample', AF_AREA,
      [R('FTG', 'descriptive')], 'FTG face recovery (descriptive)', basis='stated'),
]

# Which M-1 deliverable and work item fills which (metric, reference) -- M-1-plan.md section 1, as the plan states it.
# role: the role the plan's ledger states for that row; None where the ledger leaves it to section 13.5 (rows.py).
M1 = [
    ('ftg.ringBlock', 'FTG', 'D1', 'W-06', 'descriptive'),
    ('bldg.pairing', 'NG', 'D2', 'W-11', 'target'),
    ('street.detour', 'NG', 'D4', 'W-11', 'target'),
    ('junction.share4', 'NG', 'D4', 'W-11', 'target'),
    ('street.cyclesPerKm2', 'NG', 'D4', 'W-11', 'target'),
    ('plot.minWidth', 'NG', 'D4', 'W-11', 'target'),
    ('fg.streetwallGap100', 'NG', 'D4', 'W-11', 'target'),
    ('block.courtShare', 'NG', 'D5', 'W-11', 'target'),
    ('block.courtShare', 'MFCG', 'D5', 'W-09', 'target'),
    ('bldg.r4.60', 'MFCG', 'D7', 'W-07', 'target'),
    ('bldg.r4.120', 'MFCG', 'D7', 'W-07', 'target'),
    ('bldg.r4.250', 'MFCG', 'D7', 'W-07', 'target'),
    ('bldg.wallAlign', 'MFCG', 'D7', 'W-07', 'target'),
    ('walled.share', 'MFCG', 'D8', 'W-07', 'target'),
    ('ribbon.share', 'MFCG', 'D8', 'W-07', 'target'),
    ('district.area', 'MFCG', 'D9', 'W-07', 'target'),
    ('plaza.area', 'MFCG', 'D9', 'W-07', 'target'),
    ('castle.area', 'MFCG', 'D9', 'W-07', 'target'),
    ('castle.compact', 'MFCG', 'D9', 'W-07', 'target'),
    ('wall.nodeSpacing', 'MFCG', 'D9', 'W-07', 'target'),
    ('quarter.count', 'MFCG', 'D9', 'W-07', 'target'),
    ('gate.count', 'MFCG', 'D9', 'W-07', 'target'),
    ('wall.towerSpacing', 'MFCG', 'D9', 'W-07', 'target'),
    ('fg.streetwall', 'MFCG', 'D10', 'W-08', 'target'),
    ('blockc.lotsPer', 'MFCG', 'D11', 'W-09', 'target'),
    ('sgd.tShare', 'MFCG', 'D11', 'W-09', 'target'),
    ('sgd.deadEnds', 'MFCG', 'D11', 'W-09', 'target'),
    ('blockc.perHa', 'MFCG', 'D11', 'W-09', 'target'),
    ('fg.recoverability', 'MFCG', 'D12', 'W-08', 'target'),
    ('fg.coverWalled', 'MFCG', 'D12', 'W-08', 'descriptive'),
    ('time.model', 'FTG', 'D13', 'W-02', 'weakness'),
    ('street.turn100', 'FTG', 'D14', 'W-05', 'target'),
    ('street.stepHist', 'FTG', 'D14', 'W-05', 'weakness'),
    ('street.entropy50', 'FTG', 'D14', 'W-05', 'weakness'),
    ('outline.r90cv', 'FTG', 'D14', 'W-05', 'target'),
    ('outline.roadRatio', 'FTG', 'D14', 'W-05', 'target'),
    ('block.countTemplate', 'NG', 'D15', 'W-11', 'target'),
    ('block.area', 'NG', 'D15', 'W-11', 'target'),
    ('variety.dispersion', 'MFCG', 'D16', 'W-09', 'target'),
    ('variety.dispersion', 'FTG', 'D16', 'W-05', 'target'),
    ('cut.sigma', 'NG', 'D23', 'W-10', 'target'),
    ('cut.cornerMid', 'NG', 'D23', 'W-10', 'target'),
    ('cut.arrival85', 'NG', 'D23', 'W-10', 'target'),
    ('cut.fillet', 'NG', 'D23', 'W-10', 'target'),
    ('market.secondary', 'MFCG', 'D24', 'W-07', 'target'),
    ('market.adjacent', 'MFCG', 'D24', 'W-07', 'target'),
    ('wealth.*', 'FTG', 'D25', 'W-05', 'descriptive'),
] + [(m, 'FTG', 'D26', 'W-05', None) for m in
     ['junction.angles', 'junction.share4', 'street.runs', 'bldg.area', 'bldg.quadSide', 'bldg.worstCorner',
      'bldg.partyShare', 'bldg.attached', 'wall.towerSpacing', 'wall.ungated', 'gate.count', 'water.step',
      'water.riverWidth', 'tree.nnP1', 'tree.nnMedian', 'tree.pcf', 'pop.perBuilding', 'time.model']] + [
    (m, 'NG', 'D27', 'W-11', None) for m in
    ['junction.angles', 'bldg.partyShare', 'bldg.attached', 'plot.moran', 'time.model']] + [
    ('draw.*', 'MFCG', 'D28', 'W-07', 'target'),
    ('time.model', 'MFCG', 'D28', 'W-07', 'descriptive'),
]
M1_ROLE_NOTES = {
    ('street.turn100', 'FTG'): 'organic presets only; the declared exception band (0.5 - 1.5 x FTG)',
    ('blockc.lotsPer', 'MFCG'): 'descriptive instead if its seed-to-seed CV > 0.3 (S-V12-2, W-14)',
    ('sgd.tShare', 'MFCG'): 'descriptive instead if its seed-to-seed CV > 0.3 (S-V12-2, W-14)',
    ('sgd.deadEnds', 'MFCG'): 'descriptive instead if its seed-to-seed CV > 0.3 (S-V12-2, W-14)',
    ('blockc.perHa', 'MFCG'): 'descriptive instead if its seed-to-seed CV > 0.3 (S-V12-2, W-14)',
    ('market.secondary', 'MFCG'): 'descriptive with a known-defects entry if the export holds one square (section 8)',
    ('market.adjacent', 'MFCG'): 'descriptive with a known-defects entry if the export holds one square (section 8)',
    ('variety.dispersion', 'FTG'): 'a floor; estimator minmax at n = 3 (section 8 (5))',
    ('variety.dispersion', 'MFCG'): 'a floor',
    ('block.area', 'NG'): 'NG inputs are relative: the row reads block.areaRel (open on that entry)',
    ('draw.*', 'MFCG'): 'ink',
}


def build_metrics():
    reg = [dict(m) for m in REGISTRY]
    by_id = {m['id']: m for m in reg}
    problems = []
    for metric, ref, dl, work, role in M1:
        m = by_id.get(metric)
        if m is None:
            problems.append('M1 mapping names unknown metric %s' % metric)
            continue
        if ref not in [r['ref'] for r in m.get('references', [])]:
            problems.append('M1 mapping %s/%s: reference not in the catalogue row' % (metric, ref))
        e = {'reference': ref, 'deliverable': dl, 'workItem': work}
        if role:
            e['role'] = role
        note = M1_ROLE_NOTES.get((metric, ref))
        if note:
            e['note'] = note
        m.setdefault('m1', []).append(e)
    # (metric, reference) pairs the catalogue names and no M-1 work item fills (VG, FM and corpus are not M-1's).
    uncovered = []
    for m in reg:
        for r in m.get('references', []):
            if r['ref'] in ('VG', 'FM', 'corpus'):
                continue
            if not any(e['reference'] == r['ref'] for e in m.get('m1', [])):
                uncovered.append({'metric': m['id'], 'reference': r['ref'], 'catalogueRole': r.get('role')})
    ids = [m['id'] for m in reg]
    dup = sorted(set(i for i in ids if ids.count(i) > 1))
    if dup:
        problems.append('duplicate ids: %s' % dup)
    doc = {
        'schema': 'research.metrics-twin/1',
        'metricsVersion': METRICS_VERSION,
        'lane': 'm1/W-01',
        'planDate': PLAN_DATE,
        'script': 'research:baselines/plan.py',
        'source': "V12 section 3.4.2's catalogue and default rules; section 2.1's MetricDef fields",
        'units': ['m', 'm2', 'ha', 'deg', 'share', 'count', 'perHa', 'perKm', 'ratio', 'bits', 'ms', 's', 'luma',
                  'rb', 'chroma', 'z', 'none'],
        'defaultTolerance': {'geo': TOL_EXACT, 'model': TOL_EXACT, 'trace': TOL_EXACT, 'counts': TOL_EXACT,
                             'render': TOL_RENDER, 'm1Twin': TWIN_TOL},
        'centroids': 'area centroids for polygons, the point itself for points (default rule)',
        'metrics': reg,
        'm1Uncovered': uncovered,
        'counts': {
            'ids': len([m for m in reg if not m.get('family')]),
            'families': len([m for m in reg if m.get('family')]),
            'parity': len([m for m in reg if m.get('parity')]),
            'oursOnly': len([m for m in reg if not m.get('parity')]),
            'withM1Rows': len([m for m in reg if m.get('m1')]),
            'open': len([m for m in reg if m.get('open')]),
            'm1Uncovered': len(uncovered),
        },
    }
    return doc, problems


# ---------------------------------------------------------------------------------------------------------------
# Catalogue check: V12 section 3.4.2's first-column ids (expanded) against the registry.
# ---------------------------------------------------------------------------------------------------------------
def catalogue_ids():
    lines = open(V12_PATH, encoding='utf-8').read().split('\n')
    start = next(i for i, l in enumerate(lines) if l.startswith('| metric id | input | scale | definition |'))
    ids = []
    for l in lines[start + 2:]:
        if not l.startswith('|'):
            break
        cells = re.split(r'(?<!\\)\|', l.strip().strip('|'))
        prev = None
        for tok in re.findall(r'`([^`]+)`', cells[0]):
            if tok.startswith('.'):
                full = prev.rsplit('.', 1)[0] + tok
            else:
                full = tok
                prev = tok
            ids.append(full)
        ids += [t for t in re.findall(r'`([^`]+)`', cells[2]) if re.match(r'^[a-z]+\.[A-Za-z0-9.]+$', t)]
    return ids


def catalogue_diff():
    cat = catalogue_ids()
    reg = [m['id'] for m in REGISTRY]
    return cat, sorted(set(cat) - set(reg)), sorted(set(reg) - set(cat))


# ---------------------------------------------------------------------------------------------------------------
def dumps(obj):
    return json.dumps(obj, indent=1, ensure_ascii=False) + '\n'


def write_atomic(path, text):
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write(text)
    os.replace(tmp, path)


def load_prior_slots():
    if not os.path.exists(PLAN_PATH):
        return []
    return json.load(open(PLAN_PATH, encoding='utf-8')).get('ftg', {}).get('slots', [])


def compute(prior_slots):
    plan = build_plan(prior_slots)
    metrics, problems = build_metrics()
    cat, missing, extra = catalogue_diff()
    if missing or extra:
        problems.append('catalogue mismatch: missing %s extra %s' % (missing, extra))
    for fam in plan['families']:
        for e in fam['entries']:
            if not 1 <= e['seed'] <= MINSTD_MOD:
                problems.append('seed out of the MINSTD range: %s' % e['label'])
    labels = {e['label']: e['seed'] for f in plan['families'] for e in f['entries']}
    for label, _, pm in CHECK_VECTORS:
        if label in labels and labels[label] != pm:
            problems.append('plan entry %s seed %d != vector %d' % (label, labels[label], pm))
    return plan, metrics, problems


def bind(arg, failed):
    k, _, v = arg.partition('=')
    k = int(k)
    slots = load_prior_slots()
    if not slots:
        sys.exit('no plan.json yet: run plan.py first')
    if not 0 <= k < len(slots):
        sys.exit('slot %d out of range 0..%d' % (k, len(slots) - 1))
    for s in slots[:k]:
        if not (s.get('capture') or s.get('failed')):
            sys.exit('slot %d is still open: FTG slots are filled in capture order' % s['slot'])
    if slots[k].get('capture') or slots[k].get('failed'):
        sys.exit('slot %d is already recorded (%s); a recorded slot is never rewritten' %
                 (k, slots[k].get('capture') or slots[k].get('failed')))
    if failed:
        if not REASON_RE.match(v):
            sys.exit('reason must be lower-case words joined by -')
        slots[k]['failed'] = v
    else:
        if not CAPTURE_RE.match(v):
            sys.exit('capture must be a folder name like 2026-10-03T09-15-00')
        if not os.path.isdir(os.path.join(FTG_CAPTURES, v)):
            sys.exit('no such folder: captures/ftg/%s' % v)
        if any(s.get('capture') == v for s in slots):
            sys.exit('capture %s is already bound to another slot' % v)
        slots[k]['capture'] = v
    return slots


def main(argv):
    if argv[:1] == ['--vectors']:
        print('verification', hex(smhasher_verification()))
        for s in argv[1:]:
            print(vector_line(s))
        return 0
    if argv[:1] == ['--catalogue-check']:
        cat, missing, extra = catalogue_diff()
        print('catalogue ids %d (with block.areaRel from the scale column); registry ids %d' %
              (len(cat), len(REGISTRY)))
        print('missing from registry: %s' % missing)
        print('in registry, not in catalogue: %s' % extra)
        return 1 if (missing or extra) else 0
    problems = self_test()
    if problems:
        print('SELF-TEST FAILED, nothing written:\n  ' + '\n  '.join(problems))
        return 2
    prior = load_prior_slots()
    if argv[:1] in (['--bind-ftg'], ['--fail-ftg']):
        if len(argv) != 2:
            sys.exit('usage: plan.py --bind-ftg K=FOLDER | --fail-ftg K=REASON')
        prior = bind(argv[1], argv[0] == '--fail-ftg')
    plan, metrics, problems = compute(prior)
    if problems:
        print('PLAN CHECK FAILED, nothing written:\n  ' + '\n  '.join(problems))
        return 2
    texts = {PLAN_PATH: dumps(plan), METRICS_PATH: dumps(metrics)}
    if argv[:1] == ['--check']:
        bad = 0
        for p, t in texts.items():
            disk = open(p, encoding='utf-8').read() if os.path.exists(p) else None
            ok = disk == t
            bad += not ok
            print('%s %s (%d bytes, sha256 %s)' % ('SAME' if ok else 'DIFFERS', os.path.relpath(p, ROOT), len(t.encode()),
                                                   hashlib.sha256(t.encode()).hexdigest()[:16]))
        return 1 if bad else 0
    for p, t in texts.items():
        write_atomic(p, t)
        print('wrote %s (%d bytes, sha256 %s)' % (os.path.relpath(p, ROOT), len(t.encode()),
                                                  hashlib.sha256(t.encode()).hexdigest()[:16]))
    c = plan['counts']
    print('plan: MFCG %d exports (%d files), NG %d generations, FTG %d slots, FM %d buildings, seed collisions %d' %
          (c['mfcgExports'], c['mfcgFiles'], c['ngGenerations'], c['ftgSlots'], c['fmBuildings'],
           len(c['seedCollisions'])))
    mc = metrics['counts']
    print('metrics: %d ids + %d families; parity %d, ours only %d; with M-1 rows %d; open %d; uncovered pairs %d' %
          (mc['ids'], mc['families'], mc['parity'], mc['oursOnly'], mc['withM1Rows'], mc['open'], mc['m1Uncovered']))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
