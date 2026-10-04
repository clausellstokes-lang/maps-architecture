#!/usr/bin/env python3
"""research/baselines/plan.py -- M-1's capture plan and the seed families' research-side twin.

Lane m1/W-01 (docs/calibration/M-1-plan.md section 2, work item W-01; record docs/calibration/E01-capture-plan.md),
amended by lane m1/W-01b (item W-01b; record E01 section 9): the recorded CITY family's block (R-02), one MFCG load per
seed (R-16), --extend (R-13), the catalogue's split and new ids (DC-17, DC-21), block.areaRel's edges and the declared
scale (R-01), the units perKm2 / per100m (DC-02), the draw and wealth members (R-12, R-23, E05 section 5), the item table
of plan revision 3, and variety.dispersion's floor and its forming item W-15 (R-10, R-40).
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
  python3 plan.py --extend FAMILY N     extend a formula family (MFCG or NG) to N indices by the seed formula (R-13: the
                                        next index replaces no seed; the failed one stays recorded); kept in plan.json
  python3 plan.py --catalogue-check     list V12 section 3.4.2's ids against the registry, and the members V12 names for
                                        a family against the registered members (exit 1 on any difference)

Regeneration keeps the FTG bindings and the formula extensions already in plan.json; every other field is a pure
function of this file, so a rerun writes the same bytes.

FTG slots (M-1-plan sections 2.1 and 2.1b; rulings R-33 .. R-36 of M-1-rulings-2.md, J164): the slot list is the
concatenation of two declared programmes, FTG_SCHEDULE (programme 1: the six slots of J159 / J163) and
FTG_PREMIUM_SCHEDULE (programme 2: the 22 premium-month slots of J164). FTG cannot be seeded, so an FTG family's
extension is this declared schedule block, never a CLI flag that mutates plan.json (that would break regeneration);
slot numbers are positions in the concatenated list and are filled in capture order (bind refuses a slot while an
earlier one is open). compute() refuses to write a plan whose first six labels differ from FTG_FIRST_LABELS or whose
labels repeat, so an extension can only append; and it refuses any change to a RECORDED slot (bound to a capture or
recorded failed, in either programme) of its label, size, water, programme or day against the prior plan.json, or
its removal, so a schedule edit can never relabel, re-date or move a capture (lanes m1/plan-fix-3 and
m1/plan-guard-2, after the closing check of plan revision 3 and its own check). Striking
or reordering rows after the last recorded slot stays allowed (the owner's veto of R-33: the TOWN pair first).
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

# FTG's slots (M-1-plan sections 2.1 and 2.1b; ARCHITECTURE section 13.6 (2)); FTG cannot be seeded.
# Nominal populations and widths are FTG's own size ladder (research/ftg-capture/presets.json, roughPopulation / width);
# the rung is ARCHITECTURE section 1.1's population band of that nominal value (CITY, 9 500 people, lies in TOWN's
# [1 500, 10 000), as section 13.5's generation-time row reads it; section 12.9).
FTG_NOMINAL = {'BIG_TOWN': 5600, 'BIG_CITY': 24500, 'METROPOLIS': 49500, 'CITY': 9500, 'TOWN': 3625}
FTG_HALF_WIDTH_M = {'BIG_TOWN': 2000.0, 'BIG_CITY': 2750.0, 'METROPOLIS': 3000.0, 'CITY': 2500.0, 'TOWN': 1750.0}
FTG_RUNG = {'BIG_TOWN': 'TOWN', 'BIG_CITY': 'CITY', 'METROPOLIS': 'METROPOLIS', 'CITY': 'TOWN', 'TOWN': 'TOWN'}
FTG_PREMIUM_ONLY = ('METROPOLIS',)      # the size option the site enables for premium accounts only (E02 section 9.2)
WATER_WORDS = {'none': 'nearest none: no coast, rivers off', 'coast+river': 'nearest coast+river: coastal, rivers on'}
ORDINAL = ['', ' (second)', ' (third)', ' (fourth)', ' (fifth)', ' (sixth)', ' (seventh)', ' (eighth)', ' (ninth)',
           ' (tenth)']
# Programme 1 (J159, then J163 for slots 1-5: the owner's signed-in account): (day, size, water). Fixed; never reordered.
FTG_SCHEDULE = [
    (1, 'BIG_TOWN', 'none'),
    (2, 'BIG_CITY', 'none'),
    (3, 'BIG_TOWN', 'coast+river'),
    (4, 'BIG_CITY', 'coast+river'),
    (5, 'BIG_TOWN', 'coast+river'),
    (6, 'BIG_CITY', 'coast+river'),
]
# Programme 2 (J164, 2026-10-03: one premium month; M-1-rulings-2.md R-33): (size, water), in recording order -- the
# METROPOLIS towns first (the owner's chief motive; its first three are the panel's none, coast+river, coast+river),
# then BIG_TOWN and BIG_CITY alternating so a stopped run leaves the two matched sizes balanced (each reaches 10 slots:
# 4 none, 6 coast+river), then the two other sizes the size ladder gains from (CITY: the timed preset's recorded family
# reaches three usable; TOWN: FTG's form default, a fourth point of the size-dependent-value table).
FTG_PREMIUM_SCHEDULE = [
    ('METROPOLIS', 'none'),
    ('METROPOLIS', 'coast+river'),
    ('METROPOLIS', 'coast+river'),
    ('METROPOLIS', 'coast+river'),
    ('BIG_TOWN', 'none'),
    ('BIG_CITY', 'none'),
    ('BIG_TOWN', 'coast+river'),
    ('BIG_CITY', 'coast+river'),
    ('BIG_TOWN', 'none'),
    ('BIG_CITY', 'none'),
    ('BIG_TOWN', 'coast+river'),
    ('BIG_CITY', 'coast+river'),
    ('BIG_TOWN', 'none'),
    ('BIG_CITY', 'none'),
    ('BIG_TOWN', 'coast+river'),
    ('BIG_CITY', 'coast+river'),
    ('BIG_TOWN', 'coast+river'),
    ('BIG_CITY', 'coast+river'),
    ('CITY', 'none'),
    ('CITY', 'coast+river'),
    ('TOWN', 'none'),
    ('TOWN', 'coast+river'),
]
# The recorded CITY family (R-02, R-04; its block in plan.json is ftg.recordedCity, lane m1/W-01b): both captures were
# coastal with rivers on, so the planned CITY slots continue the family's per-water index after them (coast+river/2) and
# the family order after 2. Each row: (capture folder, water, failed reason or None).
FTG_RECORDED_CITY = [('2026-09-21T05-23-58', 'coast+river', None), ('2026-09-25T10-13-51', 'coast+river', 'setting')]
FTG_RECORDED_RULE = ('as recorded (R-02; the Fantasy Manor sample is the precedent, V12 section 3.2.1): the two CITY '
                     'captures made before the plan hold the family\'s first two indices; the 2026-09-25 one is a declared '
                     'non-default setting, kept in sample.failed with reason setting and pooled in no row (R-04); the '
                     'planned CITY slots continue the per-water index and the family order after them, so with slots 24 '
                     'and 25 the family reaches three usable, minmax (R-33, R-34)')
# The first six labels, fixed: compute() refuses to write a plan that changes or reorders them (R-36); every recorded
# slot, these six included, is also held against the prior plan.json in label, size, water, programme and day
# (compute(); m1/plan-fix-3, m1/plan-guard-2), so even a swap of two equal-key rows is refused.
FTG_FIRST_LABELS = ('capture/FTG/BIG_TOWN/none/0', 'capture/FTG/BIG_CITY/none/0', 'capture/FTG/BIG_TOWN/coast+river/0',
                    'capture/FTG/BIG_CITY/coast+river/0', 'capture/FTG/BIG_TOWN/coast+river/1',
                    'capture/FTG/BIG_CITY/coast+river/1')
# The slot fields a recorded slot keeps against the prior plan.json (compute(); m1/plan-fix-3 froze the first three,
# m1/plan-guard-2 added programme and day). The others (family, order, rung, waterOptions, nominalPopulation,
# premiumOnly) follow from these and the fixed tables, because recorded slots form a prefix (bind fills in order).
FTG_RECORDED_FROZEN = ('label', 'ftgSize', 'water', 'programme', 'day')
CAPTURE_RE = re.compile(r'^\d{4}-\d{2}-\d{2}T[\d-]{8}$')     # V12 section 3.3 C2's capture-folder pattern
# R-13's formula extension (lane m1/W-01b): --extend persists a family's new n in plan.json like an FTG binding.
EXTEND_RULE = ("R-13 (M-1-rulings-1.md): a formula family whose usable count falls below its declared n extends by the "
               "next formula index until n usable -- never a hand-chosen seed; the failed index stays in the row's "
               "sample.failed; every added index is a load under an owner's approval; set by plan.py --extend and kept "
               "by every regeneration")
EXTENSION_NOTES = {
    'capture/MFCG/130/plain': "index 8 froze twice (no-export, 2 loads: W-03 and m1/W-03-complete's retry); index 10 is "
                              "J161's third load, W-03b (R-13, R-39)",
}
REASON_RE = re.compile(r'^[a-z]+(-[a-z]+)*$')


def _extension(fam, n, n_eff):
    """The extension record of a formula family extended past its declared n (R-13), or None."""
    if n_eff <= n:
        return None
    e = {'declaredN': n, 'n': n_eff, 'added': list(range(n, n_eff)), 'by': 'plan.py --extend', 'rule': EXTEND_RULE}
    if fam in EXTENSION_NOTES:
        e['note'] = EXTENSION_NOTES[fam]
    return e


def build_plan(prior_slots, prior_ext=None):
    families = []
    collisions = {}
    prior_ext = prior_ext or {}

    def note(seed, label):
        collisions.setdefault(seed, []).append(label)

    for size, opts, n, rung, purpose in MFCG_SETTINGS:
        fam = 'capture/MFCG/%d/%s' % (size, opts)
        n_eff = max(n, prior_ext.get(fam, n))
        entries = []
        for i in range(n_eff):
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
        f = {
            'family': fam, 'reference': 'MFCG', 'reduce': 'parkMiller', 'priority': 3,
            'setting': {'mfcgSize': size, 'options': opts, 'rung': rung},
            'purpose': purpose, 'indices': [0, n_eff], 'workItem': 'W-03', 'entries': entries,
        }
        x = _extension(fam, n, n_eff)
        if x:
            f['extension'] = x
        families.append(f)
    for size, n in NG_SIZES:
        for t in NG_TEMPLATES:
            fam = 'capture/NG/%s/%s' % (t, size)
            n_eff = max(n, prior_ext.get(fam, n))
            entries = []
            for i in range(n_eff):
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
            f = {
                'family': fam, 'reference': 'NG', 'reduce': 'parkMiller', 'priority': 3,
                'setting': {'template': t, 'size': size, 'scale': 'relative'},
                'purpose': 'rows' if size == 'medium' else 'size sweep (CONFIDENCE section 6 #2)',
                'indices': [0, n_eff], 'workItem': 'W-04', 'entries': entries,
            }
            x = _extension(fam, n, n_eff)
            if x:
                f['extension'] = x
            families.append(f)

    prior = {s.get('slot'): s for s in (prior_slots or [])}
    slots = []
    per_key = {}
    per_size = {}
    for _, water, _ in FTG_RECORDED_CITY:      # the recorded pair holds CITY's first two indices (R-02)
        per_key[('CITY', water)] = per_key.get(('CITY', water), 0) + 1
        per_size['CITY'] = per_size.get('CITY', 0) + 1
    rows = [(1, day, size, water) for day, size, water in FTG_SCHEDULE] + \
           [(2, None, size, water) for size, water in FTG_PREMIUM_SCHEDULE]
    for k, (programme, day, size, water) in enumerate(rows):
        j = per_key.get((size, water), 0)
        per_key[(size, water)] = j + 1
        o = per_size.get(size, 0)
        per_size[size] = o + 1
        p = prior.get(k, {})
        slots.append({
            'slot': k,
            'programme': programme,
            'day': day,
            'family': 'capture/FTG/%s' % size,
            'order': o,
            'label': 'capture/FTG/%s/%s/%d' % (size, water, j),
            'ftgSize': size,
            'rung': FTG_RUNG.get(size),                 # None for an unknown size: compute() refuses the plan
            'water': water,
            'waterOptions': WATER_WORDS[water] + ORDINAL[j],
            'nominalPopulation': FTG_NOMINAL.get(size),
            'premiumOnly': size in FTG_PREMIUM_ONLY,
            'seed': None,
            'capture': p.get('capture'),
            'failed': p.get('failed'),
        })
    per_size_totals = {}
    for s in slots:
        per_size_totals.setdefault(s['ftgSize'], {'slots': 0, 'none': 0, 'coast+river': 0})
        per_size_totals[s['ftgSize']]['slots'] += 1
        per_size_totals[s['ftgSize']][s['water']] += 1

    dupes = sorted([sorted(v) for v in collisions.values() if len(v) > 1])
    plan = {
        'schema': 'research.capture-plan/1',
        'lane': 'm1/W-01',
        'planDate': PLAN_DATE,
        'script': 'research:baselines/plan.py',
        'amendments': [
            {'lane': 'm1/W-01b', 'date': '2026-10-03', 'item': 'W-01b (M-1-plan section 2; record E01 section 9)',
             'what': "the recorded CITY family's block (ftg.recordedCity; R-02, R-04); mfcgExport: one load per seed "
                     "(R-16); --extend, kept in a family's extension block (R-13); ftg.slotRule and programme 2's "
                     "procedure (section I) restated"},
            {'lane': 'm1/plan-guard-2', 'date': '2026-10-03',
             'item': "m1/plan-fix-3-check's finding (record M-1-plan-fix-3.md, section Guard round 2)",
             'what': "the recorded-slot guard also keeps a recorded slot's programme and day; ftg.slotRule "
                     "restated"},
        ],
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
            'tool': 'research/baselines/mfcg_sweep_m1.mjs (W-03, J159); research/baselines/mfcg_j161_m1.mjs (J161: '
                    'm1/W-03-complete and W-03b); both modelled on profiler/export.mjs',
            'perSeed': "one load per seed (R-16): the JSON by the URL export key on load (the entry's exports[0]), the "
                       "SVG by the app's own export window in the same page (E03); exports[1], the SVG key of the "
                       "2026-09-25 sweep's one-load-per-file method, is kept for reference and never loaded",
            'loads': "J159: 35, one per declared seed (W-03); J161: 3 -- seed 0's cold re-export and the retry of "
                     "capture/MFCG/130/plain/8 (m1/W-03-complete) and R-13's extension to index 10 (W-03b); any "
                     "further load is a new owner's approval (M-1-plan section 5)",
            'modelledOn': 'captures/mfcg/exports-sweep-2026-09-25/sweep.sh',
            'retryRule': 'an export whose console trace shows a second attempt (a different internal seed under the '
                         'same href) is recorded in the row\'s sample.failed with reason retry, never dropped (C7)',
            'extendRule': EXTEND_RULE,
        },
        'ngRecord': {
            'tool': 'profiler/record.mjs',
            'perSeed': 'one cold load per seed, no regeneration, so every generation is the plan\'s seed',
        },
        'families': families,
        'ftg': {
            'seedable': False,
            'why': 'the server draws its own seed; the plan lists capture slots in capture order (V12 section 3.2.1)',
            'slotRule': 'slot k is the k-th capture taken, slots filled in slot order (bind refuses a slot while an '
                        'earlier one is open); a slot never taken is recorded failed with its reason, never faked '
                        '(M-1-plan section 9; ARCHITECTURE 13.6 (12)); the list is the concatenation of the two '
                        'declared programmes below, and an extension can only append (R-36: the first six labels '
                        'and the uniqueness of every label are checked before any write); a recorded slot (bound or '
                        'failed) keeps its label, size, water, programme and day against the prior plan.json and is '
                        'never removed, so a schedule edit cannot relabel, re-date, move or drop a capture '
                        '(m1/plan-fix-3, m1/plan-guard-2); rows after the last recorded slot may be struck or '
                        'reordered (the owner\'s veto of R-33)',
            'programmes': [
                {'programme': 1, 'slots': [0, len(FTG_SCHEDULE)], 'rulings': 'J159 (slot 0, guest, one per day); '
                 'J163 (slots 1-5, the owner\'s signed-in account, one sitting)', 'plan': 'M-1-plan section 2.1'},
                {'programme': 2, 'slots': [len(FTG_SCHEDULE), len(rows)], 'rulings': 'J164 (one premium month; '
                 'M-1-rulings-2.md R-33 .. R-36)', 'plan': 'M-1-plan section 2.1b',
                 'order': 'by slot number: METROPOLIS first, then BIG_TOWN and BIG_CITY alternating, then CITY and TOWN',
                 'premiumOnlySizes': list(FTG_PREMIUM_ONLY),
                 'procedure': 'research/baselines/ftg_capture_checklist.md section I (programme 2\'s procedure, '
                              'written by m1/plan-fix-3 from M-1-plan section 2.1b: section H with the premium '
                              'differences)'},
            ],
            'perSize': per_size_totals,
            'recordedCity': [{'family': 'capture/FTG/CITY', 'order': i, 'capture': c, 'water': w,
                              'label': 'capture/FTG/CITY/%s/%d' % (w, i), 'ftgSize': 'CITY', 'rung': FTG_RUNG['CITY'],
                              'nominalPopulation': FTG_NOMINAL['CITY'], 'status': 'failed' if fr else 'usable',
                              'failed': fr}
                             for i, (c, w, fr) in enumerate(FTG_RECORDED_CITY)],
            'recordedRule': FTG_RECORDED_RULE,
            'halfWidthM': FTG_HALF_WIDTH_M,
            'populationSource': 'nominal unless the decoded payload holds a resident count (re-checked per capture); '
                                'the account list\'s per-settlement population is recorded beside it, never used (R-37)',
            'workItem': 'W-02 (programme 1), W-02b (programme 2)',
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
            'mfcgExports': sum(len(f['entries']) for f in families if f['reference'] == 'MFCG'),
            'mfcgFiles': 2 * sum(len(f['entries']) for f in families if f['reference'] == 'MFCG'),
            'ngGenerations': sum(len(f['entries']) for f in families if f['reference'] == 'NG'),
            'formulaExtensions': {f['family']: f['extension']['n'] for f in families if 'extension' in f},
            'ftgSlots': len(slots),
            'ftgProgramme1': len(FTG_SCHEDULE),
            'ftgProgramme2': len(FTG_PREMIUM_SCHEDULE),
            'fmBuildings': FM_N,
            'seedCollisions': dupes,
        },
    }
    return plan


# ---------------------------------------------------------------------------------------------------------------
# metrics.m-1.json -- V12 section 3.4.2's catalogue as a registry twin.
# Every field below is STATED by the catalogue row, or comes from section 3.4.2's DEFAULT rules, or is INFERRED here
# from the row's words, or is RULED by an M-1 ruling (R-nn, M-1-rulings-1.md / -2.md); 'basis' says which. 'open' names
# the work item that must settle a field before its row (none is open since lane m1/W-01b).
# ---------------------------------------------------------------------------------------------------------------
def _log_edges(lo, hi, bins=24):
    return [round(lo * (hi / lo) ** (k / bins), 6) for k in range(bins + 1)]


EDGES = {
    'blocksM2': {'edges': _log_edges(50, 50000), 'underflow': True, 'overflow': True,
                 'rule': 'log-spaced, 24 bins, 50 - 50 000 m2, with underflow and overflow bins (default rule)'},
    'blocksRel': {'edges': _log_edges(0.5, 500), 'underflow': True, 'overflow': True,
                  'rule': 'log-spaced, 24 bins, 0.5 - 500 median footprint areas, with underflow and overflow bins '
                          '(R-01: the default area rule on the relative range)'},
    'buildingsM2': {'edges': _log_edges(10, 2000), 'underflow': True, 'overflow': True,
                    'rule': 'log-spaced, 24 bins, 10 - 2 000 m2, with underflow and overflow bins (default rule)'},
    'plotsM2': {'edges': _log_edges(20, 5000), 'underflow': True, 'overflow': True,
                'rule': 'log-spaced, 24 bins, 20 - 5 000 m2, with underflow and overflow bins (default rule)'},
    'widthsM': {'edges': [round(0.25 * k, 2) for k in range(121)], 'underflow': False, 'overflow': True,
                'rule': '0.25 m bins to 30 m with an overflow bin (default rule)'},
    'stepDeg': {'edges': list(range(46)), 'underflow': False, 'overflow': True,
                'rule': '1 degree bins over 0 - 45 degrees plus overflow (stated by the row)'},
    'runLengthsM': {'edges': [5 * k for k in range(81)], 'underflow': False, 'overflow': True,
                    'rule': '5 m bins to 400 m with an overflow bin (default rule: run lengths)'},
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
# V12 section 2.1's MetricUnit, in its order (perKm2 and per100m by DC-02); every parity metric's unit is one of these.
UNITS = ['m', 'm2', 'ha', 'deg', 'share', 'count', 'perHa', 'perKm', 'perKm2', 'per100m', 'ratio', 'bits', 'ms', 's',
         'luma', 'rb', 'chroma', 'z', 'none']


def P(id, input, scale, unit, out, per_seed, af, refs, row, sign='positive', basis='default rules',
      sampling=None, open=None, field_units=None, member_of=None):
    """A parity metric: one a reference row can carry (member_of: the catalogue family whose member it is)."""
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
    if member_of:
        d['memberOf'] = member_of
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
    P('bldg.wallAlign.median', 'geo', 'metric', 'deg', ('vector', ['b0_40', 'b40_100', 'b100_200']), 'value',
      AF_ANGLE, [R('MFCG')], 'MFCG street signature',
      basis='stated (DC-17; R-12 F4: the split of bldg.wallAlign): per band 0-40, 40-100, 100-200 m from the outermost '
            'curtain, the median of the building-axis to nearest-curtain-segment angle folded into [0, 45] degrees'),
    P('bldg.wallAlign.share15', 'geo', 'metric', 'share', ('vector', ['b0_40', 'b40_100', 'b100_200']), 'value',
      AF_SHARE, [R('MFCG')], 'MFCG street signature',
      basis='stated (DC-17; R-12 F4: the split of bldg.wallAlign): per band the share of those angles <= 15 degrees'),
    P('sgd.tShare', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('sgd.deadEnds', 'geo', 'metric', 'perKm', ('scalar',), 'value', AF_DENS, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('blockc.perHa', 'geo', 'metric', 'perHa', ('scalar',), 'value', AF_DENS, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('blockc.lotsPer', 'geo', 'free', 'count', ('scalar',), 'median', AF_COUNT, [R('MFCG')], 'MFCG street signature',
      basis='stated'),
    P('block.area', 'geo', 'metric', 'm2', ('distribution', 'blocksM2'), 'sample', AF_AREA, [R('NG')], 'blocks',
      basis='stated (built blocks per district; distribution); NG reads it in declared metres (scale declared, 0.35 m '
            'per model unit, R-01; V12 section 2.2): the target row M0-b-05b reads'),
    P('block.areaRel', 'geo', 'free', 'ratio', ('distribution', 'blocksRel'), 'sample', AF_AREA,
      [R('NG', 'descriptive')], 'blocks',
      basis='stated as the relative variant of block.area (areas / the median footprint area); edges and the '
            'descriptive role ruled by R-01 (the companion of block.area)'),
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
    P('cut.length', 'trace', 'metric', 'm', ('distribution', 'runLengthsM'), 'sample', AF_LEN, [R('NG')],
      'bent-cut signature (cut lengths per face <M-1>)',
      basis="stated (DC-21; R-15): per cut on S8's cut log the length of its fillet-free course between the snapped "
            "ends; NG in declared metres (0.35 m per model unit, R-01; V12 section 2.2)"),
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
      'registered below (memberOf wealth.*): wealth.tier1 .. wealth.tier6, fixed by W-05 (E05 section 5, W05-D13; '
      'M-1-plan D25)'),
] + [P('wealth.tier%d' % k, 'model', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('FTG', 'descriptive')],
       'the C rows of section 13.5',
       basis='E05 section 5 (W05-D13): the share of households requested in lifestyle tier %d, the tiers lowest '
             'first; the tier-pair output shares a note' % k, member_of='wealth.*') for k in range(1, 7)] + [
    F('draw.*', 'render', None, [R('MFCG'), R('NG')], 'draw style',
      "registered below (memberOf draw.*), the members V12 section 3.4.2 names (DC-18): MFCG's five (section 8.3's "
      "census; R-12 F4, E07 section 7; M-1-plan D28) and NG's four (R-23, E20; M-1-plan D34); draw.order has no "
      'numeric member; draw.contrast and draw.hairline below are ids of ours'),
    P('draw.casingLaw', 'render', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('MFCG')], 'draw style',
      basis="stated member (DC-18; E07 section 7): the share of cased ribbons whose dark casing lies at core + 2t "
            "(within 0.002), t the record's hairline; unit share (inferred)", member_of='draw.*'),
    P('draw.roundJoins', 'render', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('MFCG')], 'draw style',
      basis='stated member (DC-18; E07 section 7): round joins / joins', member_of='draw.*'),
    P('draw.roundCaps', 'render', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('MFCG', 'descriptive')],
      'draw style', basis='stated member, descriptive (DC-18; E07 section 7): round caps / caps', member_of='draw.*'),
    P('draw.widthPx', 'render', 'free', 'none', ('vector', ['wall', 'tower', 'roadCore', 'pier']), 'value', AF_LEN,
      [R('MFCG')], 'draw style',
      basis='stated member, a vector (DC-18; E07 section 7): model width x px per metre at the matched scale; the '
            "values are pixels and MetricUnit names no pixel unit, so the unit is none (inferred)", member_of='draw.*'),
    P('draw.wallsAfterBuildings', 'render', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('MFCG')],
      'draw style',
      basis='stated member (DC-18; E07 section 7): 1 where the first wall stroke follows the last roof fill, else 0; '
            'a share over the records (inferred)', member_of='draw.*'),
    P('draw.capSquare', 'render', 'free', 'share', ('scalar',), 'value', AF_SHARE, [R('NG')], 'draw style',
      basis='stated member (DC-18; R-23; E20 section 2): square-capped strokes / street-style strokes',
      member_of='draw.*'),
    P('draw.hatchPerWing', 'render', 'free', 'count', ('scalar',), 'value', AF_COUNT, [R('NG')], 'draw style',
      basis="stated member (DC-18; R-23; E20 section 2): per two-fill wing the 3-segment ink fills in its roof unit, "
            "the map's value the mean; unit count (inferred)", member_of='draw.*'),
    P('draw.shadowQuadsPerWing', 'render', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('NG')], 'draw style',
      basis='stated member (DC-18; R-23; E20 section 2): 5-segment shadow fills / roof units; unit ratio (inferred)',
      member_of='draw.*'),
    P('draw.roofLumaRatio', 'render', 'free', 'ratio', ('scalar',), 'value', AF_SHARE, [R('NG', 'descriptive')],
      'draw style',
      basis="stated member, descriptive (DC-18; R-23; E20 section 2): per two-fill wing the second fill's luma / the "
            "first's, the map's value the median; a ratio, no colour value", member_of='draw.*'),
    F('label.*', 'model', None, [R('MFCG', 'weakness'), R('NG')], 'labels',
      "section 9.4's checks; no M-1 work item measures a label row (M-1-plan section 1 lists none)"),
    P('variety.dispersion', 'geo', 'free', 'z', ('scalar',), 'value',
      {'value': 0.1, 'basis': 'stated: V12 section 3.4.2 (absFloor 0.1 z; R-10, W05-D18)'}, [R('MFCG'), R('FTG')],
      'between-seed variety', sign='any',
      basis="stated (DC-07 from R-10): section 7.7's eight-component signature vector per town, each component "
            "standardised by the rung's pooled deviation over both references' vectors; the mean pairwise Euclidean "
            'distance over the seeds, one value per rung with seeds = n and no per-seed estimator; sign any by the '
            'default rule for unit z'),
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
      basis='stated (200 node pairs >= 100 m apart; per seed median); unit ratio (inferred); NG reads it in declared '
            'metres (0.35 m per model unit, R-01; V12 section 2.2), so the 100 m pair minimum applies',
      sampling={'label': 'street.detour', 'n': 200}),
    P('street.cyclesPerKm2', 'geo', 'metric', 'perKm2', ('scalar',), 'value', AF_DENS, [R('NG')],
      'cycles per km2 <M-1>',
      basis='stated (unit perKm2, DC-02); the built outline for NG is the convex hull of every drawn road and '
            'footprint vertex, declared (outlineKind 1; R-08); NG in declared metres (R-01)'),
    P('plot.minWidth', 'geo', 'metric', 'm', ('distribution', 'widthsM'), 'sample', AF_LEN, [R('NG')],
      'plot minimum width <M-1>', basis="stated (NG's plots geo; ours model); NG in declared metres (R-01)"),
    P('fg.streetwallGap100', 'geo', 'metric', 'per100m', ('scalar',), 'value', AF_DENS, [R('NG')],
      'streetwall gap <M-1>',
      basis='stated (DC-05 from R-07: rays every 5 % of the median footprint short side, walled within 1.0 x that '
            'side; a gap is an unwalled run longer than 2 m; gaps per 100 m of frontage, unit per100m by DC-02, the '
            'gap length per 100 m reported beside); NG in declared metres (R-01)'),
    P('bldg.pairing', 'geo', 'free', 'share', ('scalar',), 'share', AF_SHARE, [R('NG')],
      'adjacent-footprint pairing <M-1>', basis='stated'),
    O('draw.contrast', 'render', None, "the M1 exit's contrast matrix (our floors)"),
    O('draw.hairline', 'render', None, "the M1 exit's hairline fidelity (our floors)"),
    P('ftg.ringBlock', 'geo', 'metric', 'm2', ('distribution', 'blocksM2'), 'sample', AF_AREA,
      [R('FTG', 'descriptive')], 'FTG face recovery (descriptive)', basis='stated'),
]

# Which M-1 deliverable and work item fills which (metric, reference) -- M-1-plan.md section 1 (revision 3), as the plan
# states it (lane m1/W-01b; the plan's section 2 work items: 'b' passes run on the plan seeds and slots, R-03).
# role: the role the plan's ledger states for that row; None where the ledger leaves it to section 13.5 (W-15's rows).
# workItem: the item that measures the values; W-15 alone forms rows (R-47) and both variety dispersions (R-40).
M1 = [
    ('ftg.ringBlock', 'FTG', 'D1', 'W-06', 'descriptive'),
    ('bldg.pairing', 'NG', 'D2', 'W-11b', 'target'),
    ('street.detour', 'NG', 'D4', 'W-11b', 'target'),
    ('junction.share4', 'NG', 'D4', 'W-11b', 'target'),
    ('street.cyclesPerKm2', 'NG', 'D4', 'W-11b', 'target'),
    ('plot.minWidth', 'NG', 'D4', 'W-11b', 'target'),
    ('fg.streetwallGap100', 'NG', 'D4', 'W-11b', 'target'),
    ('block.courtShare', 'NG', 'D5', 'W-11b', 'target'),
    ('block.courtShare', 'MFCG', 'D5', 'W-09', 'target'),
    ('bldg.r4.60', 'MFCG', 'D7', 'W-07b', 'target'),
    ('bldg.r4.120', 'MFCG', 'D7', 'W-07b', 'target'),
    ('bldg.r4.250', 'MFCG', 'D7', 'W-07b', 'target'),
    ('bldg.wallAlign.median', 'MFCG', 'D7', 'W-07b', 'target'),
    ('bldg.wallAlign.share15', 'MFCG', 'D7', 'W-07b', 'target'),
    ('walled.share', 'MFCG', 'D8', 'W-07b', 'target'),
    ('ribbon.share', 'MFCG', 'D8', 'W-07b', 'target'),
    ('district.area', 'MFCG', 'D9', 'W-07b', 'target'),
    ('plaza.area', 'MFCG', 'D9', 'W-07b', 'target'),
    ('castle.area', 'MFCG', 'D9', 'W-07b', 'target'),
    ('castle.compact', 'MFCG', 'D9', 'W-07b', 'target'),
    ('wall.nodeSpacing', 'MFCG', 'D9', 'W-07b', 'target'),
    ('quarter.count', 'MFCG', 'D9', 'W-07b', 'target'),
    ('gate.count', 'MFCG', 'D9', 'W-07b', 'target'),
    ('wall.towerSpacing', 'MFCG', 'D9', 'W-07b', 'target'),
    ('fg.streetwall', 'MFCG', 'D10', 'W-08', 'target'),
    ('blockc.lotsPer', 'MFCG', 'D11', 'W-09', 'target'),
    ('sgd.tShare', 'MFCG', 'D11', 'W-09', 'target'),
    ('sgd.deadEnds', 'MFCG', 'D11', 'W-09', 'target'),
    ('blockc.perHa', 'MFCG', 'D11', 'W-09', 'target'),
    ('fg.recoverability', 'MFCG', 'D12', 'W-08', 'target'),
    ('fg.coverWalled', 'MFCG', 'D12', 'W-08', 'descriptive'),
    ('time.model', 'FTG', 'D13', 'W-02b', 'weakness'),
    ('street.turn100', 'FTG', 'D14', 'W-05b', 'target'),
    ('street.stepHist', 'FTG', 'D14', 'W-05b', 'weakness'),
    ('street.entropy50', 'FTG', 'D14', 'W-05b', 'weakness'),
    ('outline.r90cv', 'FTG', 'D14', 'W-05b', 'target'),
    ('outline.roadRatio', 'FTG', 'D14', 'W-05b', 'target'),
    ('block.countTemplate', 'NG', 'D15', 'W-11b', 'target'),
    ('block.area', 'NG', 'D15', 'W-11b', 'target'),
    ('block.areaRel', 'NG', 'D15', 'W-11b', 'descriptive'),
    ('variety.dispersion', 'MFCG', 'D16', 'W-15', 'target'),
    ('variety.dispersion', 'FTG', 'D16', 'W-15', 'target'),
    ('cut.sigma', 'NG', 'D23', 'W-10b', 'target'),
    ('cut.cornerMid', 'NG', 'D23', 'W-10b', 'target'),
    ('cut.arrival85', 'NG', 'D23', 'W-10b', 'target'),
    ('cut.fillet', 'NG', 'D23', 'W-10b', 'target'),
    ('market.secondary', 'MFCG', 'D24', 'W-07b', 'target'),
    ('market.adjacent', 'MFCG', 'D24', 'W-07b', 'target'),
] + [('wealth.tier%d' % k, 'FTG', 'D25', 'W-05b', 'descriptive') for k in range(1, 7)] + [
    (m, 'FTG', 'D26', 'W-05b', None) for m in
    ['junction.angles', 'junction.share4', 'street.runs', 'bldg.area', 'bldg.quadSide', 'bldg.worstCorner',
     'bldg.partyShare', 'bldg.attached', 'wall.towerSpacing', 'wall.ungated', 'gate.count', 'water.step',
     'water.riverWidth', 'tree.nnP1', 'tree.nnMedian', 'tree.pcf', 'pop.perBuilding', 'time.model']] + [
    (m, 'NG', 'D27', 'W-11b', None) for m in
    ['junction.angles', 'bldg.partyShare', 'bldg.attached', 'plot.moran', 'plot.cvDistrict']] + [
    ('time.model', 'NG', 'D27', 'W-11b', 'descriptive'),
    ('draw.casingLaw', 'MFCG', 'D28', 'W-07', 'target'),
    ('draw.roundJoins', 'MFCG', 'D28', 'W-07', 'target'),
    ('draw.roundCaps', 'MFCG', 'D28', 'W-07', 'descriptive'),
    ('draw.widthPx', 'MFCG', 'D28', 'W-07', 'target'),
    ('draw.wallsAfterBuildings', 'MFCG', 'D28', 'W-07', 'target'),
    ('time.model', 'MFCG', 'D28', 'W-07', 'descriptive'),
    ('cut.length', 'NG', 'D30', 'W-10b', 'target'),
    ('draw.capSquare', 'NG', 'D34', 'W-22', 'target'),
    ('draw.hatchPerWing', 'NG', 'D34', 'W-22', 'target'),
    ('draw.shadowQuadsPerWing', 'NG', 'D34', 'W-22', 'target'),
    ('draw.roofLumaRatio', 'NG', 'D34', 'W-22', 'descriptive'),
    ('bldg.area', 'MFCG', 'D35', 'W-07b', 'descriptive'),
    ('water.step', 'MFCG', 'D35', 'W-07b', 'descriptive'),
    ('water.riverWidth', 'MFCG', 'D35', 'W-07b', 'descriptive'),
    ('pop.perBuilding', 'MFCG', 'D35', 'W-07b', 'weakness'),
    ('wall.ungated', 'MFCG', 'D35', 'W-07b', 'descriptive'),
    ('wall.barrierShare', 'MFCG', 'D35', 'W-07b', 'descriptive'),
    ('gate.count', 'MFCG', 'D35', 'W-07b', 'descriptive'),
] + [(m, ref, 'R-44', 'W-15', 'descriptive') for m in ('time.firstMap', 'time.worst') for ref in ('MFCG', 'FTG', 'NG')]
# Notes per (metric, reference, deliverable): a string (the note) or a dict with 'note' and 'inputs' (the items whose
# values the work item reads).
_TIME_NOTE = ("descriptive in C-0116's form (values.n 0, sample.failed reason contended or unmeasured) unless W-21 runs "
              "(R-21, R-44)")
_DISP_NOTE = ("a floor (ours >= the larger reference dispersion), formed at W-15 from both references' signature vectors "
              "(R-10; one per usable MFCG seed and FTG slot, written by the measuring items without a dispersion) with "
              "the rung's pooled deviations over their union (MFCG 10 with FTG 10 at TOWN and CITY, MFCG 10 with FTG 4 "
              "at METROPOLIS; R-40); one value per rung, seeds = n; absFloor 0.1 z")
_CV_NOTE = 'descriptive instead if its seed-to-seed CV > 0.3 (S-V12-2, W-14)'
_STRESS = 'the stress family capture/MFCG/80/river+coast (R-23)'
_CUT_NOTE = 'the pooled, ring, plain and per-template rows; the five face-class rows descriptive (R-09)'
M1_NOTES = {
    ('bldg.pairing', 'NG', 'D2'): 'reading B (R-05); reading A and the mutual-pair share in the note',
    ('junction.share4', 'NG', 'D4'): 'nodes within 2 m (declared) merged (R-06); the raw degree-4 count in the note',
    ('block.countTemplate', 'NG', 'D15'): 'bounded faces per hood at medium (R-08); the share of footprints in no face '
                                          'in the note',
    ('block.area', 'NG', 'D15'): "declared metres (0.35 m per model unit, R-01) on the catalogue's log bins: the row "
                                 'M0-b-05b reads',
    ('block.areaRel', 'NG', 'D15'): 'the descriptive companion of block.area (R-01): 24 log bins over 0.5 - 500 median '
                                    'footprint areas',
    ('ribbon.share', 'MFCG', 'D8'): 'the band per size (R-12 F2)',
    ('blockc.lotsPer', 'MFCG', 'D11'): _CV_NOTE,
    ('sgd.tShare', 'MFCG', 'D11'): _CV_NOTE,
    ('sgd.deadEnds', 'MFCG', 'D11'): _CV_NOTE,
    ('blockc.perHa', 'MFCG', 'D11'): _CV_NOTE,
    ('time.model', 'FTG', 'D13'): {'note': 'the server interval, PUT sent to layout GET sent (R-21), on the slots of '
                                           'programme 1 (W-02) and programme 2 (W-02b) at BIG_TOWN, BIG_CITY, '
                                           'METROPOLIS and CITY', 'inputs': ['W-02']},
    ('street.turn100', 'FTG', 'D14'): 'organic presets only; the declared exception band (0.5 - 1.5 x FTG), the '
                                      'ten-slot type7 band printed beside it for the design pass (DC-35, R-34)',
    ('outline.r90cv', 'FTG', 'D14'): 'the band recomputed by the band rule at n = 10 (DC-11, R-34)',
    ('outline.roadRatio', 'FTG', 'D14'): 'the band recomputed by the band rule at n = 10 (DC-11, R-34)',
    ('variety.dispersion', 'MFCG', 'D16'): _DISP_NOTE,
    ('variety.dispersion', 'FTG', 'D16'): _DISP_NOTE + '; the per-water-setting FTG values reported beside it as a note '
                                                       '(R-40)',
    ('cut.sigma', 'NG', 'D23'): _CUT_NOTE,
    ('cut.cornerMid', 'NG', 'D23'): _CUT_NOTE,
    ('cut.arrival85', 'NG', 'D23'): _CUT_NOTE,
    ('cut.fillet', 'NG', 'D23'): _CUT_NOTE,
    ('market.secondary', 'MFCG', 'D24'): 'reference value 0: every export holds one square and every recorded '
                                         'generation builds one market geometry (R-12 D24; E07 section 6)',
    ('market.adjacent', 'MFCG', 'D24'): 'reference value 0: every export holds one square and every recorded '
                                        'generation builds one market geometry (R-12 D24; E07 section 6)',
    ('water.step', 'FTG', 'D26'): "against section 13.5's fixed bound 'outline step <= 25 m': the reference value "
                                  'sharpened, the band column kept (R-48); the six coast+river slots per matched size, '
                                  'minmax',
    ('water.riverWidth', 'FTG', 'D26'): 'the band rule per class over the six coast+river slots per matched size, '
                                        'minmax (R-34, R-48)',
    ('time.model', 'NG', 'D27'): _TIME_NOTE,
    ('time.model', 'MFCG', 'D28'): _TIME_NOTE,
    ('cut.length', 'NG', 'D30'): 'spreadKS.p90 over the per-template subsets (R-15)',
    ('bldg.area', 'MFCG', 'D35'): 'R-23',
    ('water.step', 'MFCG', 'D35'): _STRESS,
    ('water.riverWidth', 'MFCG', 'D35'): _STRESS,
    ('pop.perBuilding', 'MFCG', 'D35'): "from the export's population figure where it carries one, else the coded "
                                        'six-per-lot law as the note (R-23)',
    ('wall.ungated', 'MFCG', 'D35'): _STRESS,
    ('wall.barrierShare', 'MFCG', 'D35'): _STRESS,
    ('gate.count', 'MFCG', 'D35'): 'at the stress setting: the waterfront law; ' + _STRESS,
    ('time.firstMap', 'MFCG', 'R-44'): _TIME_NOTE,
    ('time.firstMap', 'FTG', 'R-44'): _TIME_NOTE,
    ('time.firstMap', 'NG', 'R-44'): _TIME_NOTE,
    ('time.worst', 'MFCG', 'R-44'): _TIME_NOTE + "; the row's note carries the stress seeds' attempt counts",
    ('time.worst', 'FTG', 'R-44'): _TIME_NOTE,
    ('time.worst', 'NG', 'R-44'): _TIME_NOTE,
}
for _m in ('draw.casingLaw', 'draw.roundJoins', 'draw.roundCaps', 'draw.widthPx', 'draw.wallsAfterBuildings'):
    M1_NOTES[(_m, 'MFCG', 'D28')] = 'parity preset ink'
for _k in range(1, 7):
    M1_NOTES[('wealth.tier%d' % _k, 'FTG', 'D25')] = 'member ids fixed by W-05 (E05 section 5); the per-slot values W-05b'
# (metric, reference) pairs the catalogue names that get no M-1 row, each with its stated reason (R-23; M-1-plan
# section 1, "No row, stated"). Any other pair without an M1 entry is listed in m1Uncovered.
M1_NO_ROW = {
    ('label.*', 'MFCG'): "R-23: a qualitative weakness; ours gates on section 13.7's own bar",
    ('label.*', 'NG'): 'R-23: NG draws no label',
    ('alley.gradient', 'FTG'): "R-23: a model metric; FTG's alley length is 0 by its class set (E05)",
    ('plot.spearman', 'NG'): 'R-23: NG has no prosperity',
}
# Tokens a family row of V12 section 3.4.2 names that are not members (catalogue_members' comparison skips them).
NOT_MEMBERS = {'draw.order': "V12 section 3.4.2: no numeric member (section 8.3's order parity compares our order "
                             'with our own slot table)'}


def build_metrics():
    reg = [dict(m) for m in REGISTRY]
    by_id = {m['id']: m for m in reg}
    problems = []
    used_notes = set()
    for metric, ref, dl, work, role in M1:
        m = by_id.get(metric)
        if m is None:
            problems.append('M1 mapping names unknown metric %s' % metric)
            continue
        if m.get('family'):
            problems.append('M1 mapping names the family %s: map its registered members' % metric)
        if ref not in [r['ref'] for r in m.get('references', [])]:
            problems.append('M1 mapping %s/%s: reference not in the catalogue row' % (metric, ref))
        e = {'reference': ref, 'deliverable': dl, 'workItem': work}
        if role:
            e['role'] = role
        extra = M1_NOTES.get((metric, ref, dl))
        if extra is not None:
            used_notes.add((metric, ref, dl))
            if isinstance(extra, str):
                extra = {'note': extra}
            if extra.get('inputs'):
                e['inputs'] = extra['inputs']
            if extra.get('note'):
                e['note'] = extra['note']
        m.setdefault('m1', []).append(e)
    for k in sorted(set(M1_NOTES) - used_notes):
        problems.append('M1 note for %s/%s/%s has no M1 entry' % k)
    # The members of each family (registered as ids of their own with memberOf).
    for m in reg:
        fam = m.get('memberOf')
        if fam is None:
            continue
        f = by_id.get(fam)
        if f is None or not f.get('family'):
            problems.append('%s is a member of %s, which is no registered family' % (m['id'], fam))
            continue
        if not m['id'].startswith(fam[:-1]):
            problems.append('%s does not carry its family prefix %s' % (m['id'], fam[:-1]))
        f.setdefault('memberIds', []).append(m['id'])
    # Units: every parity metric names one of MetricUnit's (V12 section 2.1; C5's rule).
    for m in reg:
        if m.get('parity') and not m.get('family'):
            for u in [m.get('unit'), m.get('output', {}).get('unit')]:
                if u not in UNITS:
                    problems.append('%s: unit %s is not a MetricUnit' % (m['id'], u))
    # (metric, reference) pairs the catalogue names and no M-1 work item fills (VG, FM and corpus are not M-1's): a
    # family counts as filled through any of its members; a pair with a stated no-row goes to m1NoRow with its reason.
    no_row, uncovered = [], []
    for m in reg:
        members = [by_id[x] for x in m.get('memberIds', [])]
        for r in m.get('references', []):
            if r['ref'] in ('VG', 'FM', 'corpus'):
                continue
            if any(e['reference'] == r['ref'] for x in [m] + members for e in x.get('m1', [])):
                continue
            if (m['id'], r['ref']) in M1_NO_ROW:
                no_row.append({'metric': m['id'], 'reference': r['ref'], 'catalogueRole': r.get('role'),
                               'reason': M1_NO_ROW[(m['id'], r['ref'])]})
            else:
                uncovered.append({'metric': m['id'], 'reference': r['ref'], 'catalogueRole': r.get('role')})
    for k in M1_NO_ROW:
        if not any(x['metric'] == k[0] and x['reference'] == k[1] for x in no_row):
            problems.append('stated no-row %s/%s is filled or names no catalogue reference' % k)
    ids = [m['id'] for m in reg]
    dup = sorted(set(i for i in ids if ids.count(i) > 1))
    if dup:
        problems.append('duplicate ids: %s' % dup)
    doc = {
        'schema': 'research.metrics-twin/1',
        'metricsVersion': METRICS_VERSION,
        'lane': 'm1/W-01',
        'amendedBy': 'm1/W-01b (M-1-plan section 2 item W-01b; record E01 section 9)',
        'planDate': PLAN_DATE,
        'script': 'research:baselines/plan.py',
        'source': "V12 section 3.4.2's catalogue and default rules; section 2.1's MetricDef fields; the M-1 rulings "
                  'named in each basis (M-1-rulings-1.md, M-1-rulings-2.md); the item table of M-1-plan section 1',
        'units': UNITS,
        'defaultTolerance': {'geo': TOL_EXACT, 'model': TOL_EXACT, 'trace': TOL_EXACT, 'counts': TOL_EXACT,
                             'render': TOL_RENDER, 'm1Twin': TWIN_TOL},
        'centroids': 'area centroids for polygons, the point itself for points (default rule)',
        'metrics': reg,
        'm1NoRow': no_row,
        'm1Uncovered': uncovered,
        'counts': {
            'ids': len([m for m in reg if not m.get('family')]),
            'families': len([m for m in reg if m.get('family')]),
            'members': len([m for m in reg if m.get('memberOf')]),
            'parity': len([m for m in reg if m.get('parity')]),
            'oursOnly': len([m for m in reg if not m.get('parity')]),
            'withM1Rows': len([m for m in reg if m.get('m1')]),
            'open': len([m for m in reg if m.get('open')]),
            'm1NoRow': len(no_row),
            'm1Uncovered': len(uncovered),
        },
    }
    return doc, problems


# ---------------------------------------------------------------------------------------------------------------
# Catalogue check: V12 section 3.4.2's first-column ids (expanded) against the registry.
# ---------------------------------------------------------------------------------------------------------------
def _catalogue_rows():
    lines = open(V12_PATH, encoding='utf-8').read().split('\n')
    start = next(i for i, l in enumerate(lines) if l.startswith('| metric id | input | scale | definition |'))
    for l in lines[start + 2:]:
        if not l.startswith('|'):
            break
        yield re.split(r'(?<!\\)\|', l.strip().strip('|'))


def catalogue_members():
    """For each family id of the catalogue's first column (x.*), the member ids its definition cell names."""
    out = {}
    for cells in _catalogue_rows():
        for fam in [t for t in re.findall(r'`([^`]+)`', cells[0]) if t.endswith('.*')]:
            pre = fam[:-1]
            names = [t for t in re.findall(r'`([^`]+)`', cells[3]) if t.startswith(pre) and
                     re.match(r'^[a-z]+\.[A-Za-z0-9]+$', t) and t not in NOT_MEMBERS]
            out[fam] = sorted(set(names))
    return out


def catalogue_ids():
    ids = []
    for cells in _catalogue_rows():
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
    """The catalogue's ids against the registry's own ids (a family's registered members are compared separately)."""
    cat = catalogue_ids()
    reg = [m['id'] for m in REGISTRY if not m.get('memberOf')]
    return cat, sorted(set(cat) - set(reg)), sorted(set(reg) - set(cat))


def members_diff():
    """Per family the catalogue names members for: (named, registered) where they differ."""
    reg = {}
    for m in REGISTRY:
        if m.get('memberOf'):
            reg.setdefault(m['memberOf'], []).append(m['id'])
    out = {}
    for fam, named in catalogue_members().items():
        if named and sorted(named) != sorted(reg.get(fam, [])):
            out[fam] = (named, sorted(reg.get(fam, [])))
    return out


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


def load_prior_extensions():
    """{family: n} for every formula family plan.json records as extended (R-13; set by --extend)."""
    if not os.path.exists(PLAN_PATH):
        return {}
    fams = json.load(open(PLAN_PATH, encoding='utf-8')).get('families', [])
    return {f['family']: f['extension']['n'] for f in fams if f.get('extension')}


def formula_families():
    d = {'capture/MFCG/%d/%s' % (size, opts): n for size, opts, n, _, _ in MFCG_SETTINGS}
    d.update({'capture/NG/%s/%s' % (t, size): n for size, n in NG_SIZES for t in NG_TEMPLATES})
    return d


def extend(prior_ext, family, n_text):
    """--extend FAMILY N: a formula family's next indices by the seed formula (R-13); an extension only appends."""
    if family.startswith('capture/FTG/'):
        sys.exit('an FTG family extends by a declared schedule block (FTG_PREMIUM_SCHEDULE; R-35), never by --extend')
    declared = formula_families()
    if family not in declared:
        sys.exit('no formula family %s (one of: %s)' % (family, ', '.join(sorted(declared))))
    if not re.match(r'^[1-9][0-9]*$', n_text):
        sys.exit('N must be a whole number above the family\'s current n')
    n = int(n_text)
    cur = prior_ext.get(family, declared[family])
    if n <= cur:
        sys.exit('an extension only appends: N must exceed the family\'s current n (%d); a seed is never dropped' % cur)
    out = dict(prior_ext)
    out[family] = n
    return out


def compute(prior_slots, prior_ext=None):
    plan = build_plan(prior_slots, prior_ext)
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
    # R-36: an FTG extension can only append -- the first six labels are fixed and every label is unique.
    ftg_labels = [s['label'] for s in plan['ftg']['slots']]
    if tuple(ftg_labels[:len(FTG_FIRST_LABELS)]) != FTG_FIRST_LABELS:
        problems.append('FTG slots 0..%d changed or reordered: %s' % (len(FTG_FIRST_LABELS) - 1, ftg_labels[:len(FTG_FIRST_LABELS)]))
    if len(set(ftg_labels)) != len(ftg_labels):
        problems.append('FTG labels repeat: %s' % sorted(l for l in set(ftg_labels) if ftg_labels.count(l) > 1))
    for size in set(s for _, s, _ in FTG_SCHEDULE) | set(s for s, _ in FTG_PREMIUM_SCHEDULE):
        if size not in FTG_NOMINAL or size not in FTG_RUNG or size not in FTG_HALF_WIDTH_M:
            problems.append('FTG size %s lacks a nominal population, a rung or a half width' % size)
    # A recorded slot is frozen (m1/plan-fix-3; m1/plan-guard-2): bound or failed, in any programme, it keeps every
    # field of FTG_RECORDED_FROZEN -- label, size, water, programme and day -- against the prior plan.json (the
    # bindings this run carries), so an edit of a schedule row at or before the last recorded slot can never relabel,
    # re-date, move between programmes or drop a capture (a swap of two equal-key rows moves no label but swaps two
    # days). Unrecorded rows may still be struck or reordered.
    new_slots = {s['slot']: s for s in plan['ftg']['slots']}
    for p in prior_slots or []:
        if not (p.get('capture') or p.get('failed')):
            continue
        n = new_slots.get(p.get('slot'))
        if n is None:
            problems.append('recorded FTG slot %s (%s) is no longer in the schedule' % (p.get('slot'), p.get('label')))
            continue
        moved = ['%s %s -> %s' % (key, p.get(key), n.get(key)) for key in FTG_RECORDED_FROZEN
                 if n.get(key) != p.get(key)]
        if moved:
            problems.append('recorded FTG slot %d (%s) changed: %s; a recorded slot is never relabelled or moved' %
                            (n['slot'], p.get('capture') or 'failed: ' + str(p.get('failed')), '; '.join(moved)))
    # A formula extension (R-13) is kept: every family plan.json records as extended still is, at no smaller n.
    got = {f['family']: f['indices'][1] for f in plan['families']}
    for fam, n in sorted((prior_ext or {}).items()):
        if got.get(fam, -1) < n:
            problems.append('formula extension of %s to n = %d is lost (now %s); an extension only appends' %
                            (fam, n, got.get(fam)))
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
        mem = members_diff()
        print('catalogue ids %d (with block.areaRel from the scale column); registry ids %d (and %d family members)' %
              (len(cat), len([m for m in REGISTRY if not m.get('memberOf')]),
               len([m for m in REGISTRY if m.get('memberOf')])))
        print('missing from registry: %s' % missing)
        print('in registry, not in catalogue: %s' % extra)
        for fam, named in sorted(catalogue_members().items()):
            if named:
                print('members %s: the catalogue names %d, %s' % (fam, len(named), 'registered alike' if fam not in mem
                      else 'registered %s' % mem[fam][1]))
        return 1 if (missing or extra or mem) else 0
    problems = self_test()
    if problems:
        print('SELF-TEST FAILED, nothing written:\n  ' + '\n  '.join(problems))
        return 2
    prior = load_prior_slots()
    prior_ext = load_prior_extensions()
    if argv[:1] in (['--bind-ftg'], ['--fail-ftg']):
        if len(argv) != 2:
            sys.exit('usage: plan.py --bind-ftg K=FOLDER | --fail-ftg K=REASON')
        prior = bind(argv[1], argv[0] == '--fail-ftg')
    if argv[:1] == ['--extend']:
        if len(argv) != 3:
            sys.exit('usage: plan.py --extend FAMILY N')
        if not os.path.exists(PLAN_PATH):
            sys.exit('no plan.json yet: run plan.py first')
        prior_ext = extend(prior_ext, argv[1], argv[2])
    elif argv[:1] not in ([], ['--check'], ['--bind-ftg'], ['--fail-ftg']):
        sys.exit('unknown option %s (see the usage at the top of plan.py)' % argv[0])
    plan, metrics, problems = compute(prior, prior_ext)
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
    print('plan: MFCG %d exports (%d files), NG %d generations, FTG %d slots (programme 1: %d, programme 2: %d), '
          'FM %d buildings, seed collisions %d; formula extensions %s' %
          (c['mfcgExports'], c['mfcgFiles'], c['ngGenerations'], c['ftgSlots'], c['ftgProgramme1'], c['ftgProgramme2'],
           c['fmBuildings'], len(c['seedCollisions']), c['formulaExtensions'] or 'none'))
    mc = metrics['counts']
    print('metrics: %d ids (%d of them family members) + %d families; parity %d, ours only %d; with M-1 rows %d; '
          'open %d; stated no-rows %d; uncovered pairs %d' %
          (mc['ids'], mc['members'], mc['families'], mc['parity'], mc['oursOnly'], mc['withM1Rows'], mc['open'],
           mc['m1NoRow'], mc['m1Uncovered']))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
