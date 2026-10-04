#!/usr/bin/env python3
"""cross_check.py — the research-side twin of `plat baselines check` (V12 section 3.3, C1 - C10), run on every
numbers-only candidate before it crosses into plat/ (plan item W-15; the crossing is W-20's).

Lane m1/W-15 is the sole writer of this file, rows.py and bands.py (M-1-rulings-2.md R-47 (a)). Our own code; it imports
make_denylist.py's scanner (the research twin of M0's scanner, W-16b) for C3's scan and C10, and nothing else.

Three file kinds:
  baselines  plat.baselines/2 (V12 section 2.3, ARCHITECTURE section 13.5's Baseline): C1 - C10
  ng-faces   plat.ng-faces/1 (M-1-plan section 7b; attachment B of M0-handoff-M1.md, N-21): C1, C2, C4, C5, C10 and the
             ring, link and area checks of section 7b
  denylist   plat.denylist/1 (section 7c; attachment C, N-22, N-23): C1, C4, C10 over the header's strings
Readings fixed by the session's hand-offs and the rulings: C2's id, metric and supersedes pattern admits upper case and
matches case-sensitively (N-24, DC-37); C4 reads a colour only inside a JSON string value, as a run of exactly six hex
digits bounded by non-hex characters or the string's ends (N-22, R-17), never inside a number or a 16-hex digest; no row
carries an absFloor or a sign field (N-05); C6 reads research/baselines/metrics.m-1.json (R-45).

Run (project root):
  python3 research/baselines/cross_check.py research/baselines/candidates/baselines.json [--previous <file>] [--committed]
  python3 research/baselines/cross_check.py research/baselines/candidates/ng-faces.json --kind ng-faces
  python3 research/baselines/cross_check.py research/baselines/denylist/denylist.json --kind denylist
  python3 research/baselines/cross_check.py --fixtures      # T-V12-1, T-V12-28 (research side), T-V12-30, N-22, N-24
Exit 0 when every check passes, 1 when the file is refused, 2 on a usage error.
"""
import copy
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)

REGISTRY = os.path.join(HERE, 'metrics.m-1.json')
PLAN = os.path.join(HERE, 'plan.json')

ID_RE = re.compile(r'^[A-Za-z0-9.:/@+_-]{1,120}$')           # N-24: upper case admitted, matched case-sensitively
LABEL_RE = ID_RE
BUILD_RE = re.compile(r'^[A-Za-z0-9._:+-]{1,64}$')
DATE_RE = re.compile(r'^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$')
STAMP_RE = re.compile(r'^\d{4}-\d{2}-\d{2}T[\d-]{8}$')
RESEARCH_RE = re.compile(r'^research:[a-z0-9_./-]{1,160}$')
VERSION_RE = re.compile(r'^\d+\.\d+\.\d+$')
REASON_RE = re.compile(r'^[a-z][a-z0-9-]{0,39}$')
SINCE_RE = re.compile(r'^[A-Za-z0-9.-]{1,24}$')
NOTE_RE = re.compile(r'^[A-Za-z0-9 .,;:()\-/%±≤≥×]{0,200}$')
COLOUR_IN_STRING = re.compile(r'(?:^|[^0-9a-fA-F])(?:#|0x)?([0-9a-fA-F]{6})(?:$|[^0-9a-fA-F])')
CORPUS_FRAME_RE = re.compile(r'^corpus:frame:[a-z0-9_-]{1,64}$')
CORPUS_MAP_RE = re.compile(r'^corpus:map:[0-9a-f]{16}$')

REFERENCES = {'MFCG', 'FTG', 'NG', 'VG', 'FM'}
ROLES = {'target', 'weakness', 'descriptive'}
ESTIMATORS = {'single', 'minmax', 'type7'}
SCALES = {'metric', 'free'}
EVIDENCE = {'record', 'surveyed', 'drawn'}
RUNGS = {'TOWN', 'CITY', 'METROPOLIS', 'THORP', 'HAMLET', 'VILLAGE'}
FTG_SIZES = {'BIG_TOWN', 'BIG_CITY', 'CITY', 'METROPOLIS'}
PRESET_KEYS = set()   # our D-2 preset keys: a corpus string must be one of them (none cross at M-1)

ROW_REQUIRED = ['id', 'metric', 'unit', 'reference', 'referenceBuild', 'capture', 'script', 'date', 'role', 'values',
                'metricVersion', 'sample', 'estimator', 'scale']
ROW_OPTIONAL = ['matched', 'supersedes', 'spreadKS', 'note', 'evidence', 'frameN']
FORBIDDEN_ROW_KEYS = {'absFloor', 'sign', 'floor', 'band', 'signIndefinite'}   # N-05
CHECK_IDS = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']


class Report:
    def __init__(self, kind, path):
        self.kind, self.path = kind, path
        self.problems = {c: [] for c in CHECK_IDS}
        self.run = set()
        self.info = {}

    def bad(self, check, where, msg):
        self.problems[check].append(f'{where}: {msg}')

    def ran(self, *checks):
        self.run.update(checks)

    def ok(self):
        return not any(self.problems[c] for c in self.run)

    def summary(self):
        return {'kind': self.kind, 'path': self.path,
                'checks': [{'id': c, 'pass': not self.problems[c], 'problems': len(self.problems[c]),
                            'first': self.problems[c][:5]} for c in CHECK_IDS if c in self.run],
                'info': self.info, 'refused': not self.ok()}


# ---------------------------------------------------------------------------------------------------------------
# shared readers
# ---------------------------------------------------------------------------------------------------------------

def load_registry(path=REGISTRY):
    reg = json.load(open(path))
    return reg, {m['id']: m for m in reg['metrics']}


def load_plan(path=PLAN):
    plan = json.load(open(path))
    fams = {}
    for f in plan['families']:
        lo, hi = f['indices']
        fams[f['family']] = {'n': hi, 'labels': [e['label'] for e in f['entries']], 'kind': 'formula'}
    ftg = {}
    for r in plan['ftg']['recordedCity']:
        ftg.setdefault(r['family'], []).append((r['order'], r['label']))
    for s in plan['ftg']['slots']:
        ftg.setdefault(s['family'], []).append((s['order'], s['label']))
    for fam, lst in ftg.items():
        lst.sort()
        fams[fam] = {'n': len(lst), 'labels': [lab for _, lab in lst], 'kind': 'ftg'}
    return plan, fams


def strings_of(x, path=''):
    if isinstance(x, str):
        yield path, x
    elif isinstance(x, dict):
        for k, v in x.items():
            yield from strings_of(v, f'{path}.{k}' if path else k)
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from strings_of(v, f'{path}[{i}]')


def numbers_of(x, path=''):
    if isinstance(x, bool):
        return
    if isinstance(x, (int, float)):
        yield path, x
    elif isinstance(x, dict):
        for k, v in x.items():
            yield from numbers_of(v, f'{path}.{k}' if path else k)
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from numbers_of(v, f'{path}[{i}]')


def colour_check(rep, doc):
    """C4 (V12's numbering; M0's C3): a colour only inside a string value (N-22); keys are strings too"""
    n = 0
    for p, s in strings_of(doc):
        n += 1
        if COLOUR_IN_STRING.search(s):
            rep.bad('C4', p, 'a six-hex-digit run in a string')
    def keys(x, path=''):
        if isinstance(x, dict):
            for k, v in x.items():
                if COLOUR_IN_STRING.search(k):
                    rep.bad('C4', path or '.', f'a six-hex-digit run in the key {k!r}')
                keys(v, f'{path}.{k}' if path else k)
        elif isinstance(x, list):
            for v in x:
                keys(v, path)
    keys(doc)
    rep.ran('C4')
    rep.info['stringsRead'] = n


_SCANNERS = {}


def scanners():
    if not _SCANNERS:
        import make_denylist as MD
        for name in ('research', 'm0'):
            try:
                _SCANNERS[name] = MD.DenyList(name)
            except MD.Refusal as e:
                _SCANNERS[name] = e
    return _SCANNERS


def scan_text(text):
    hits = []
    for name, dl in scanners().items():
        if isinstance(dl, Exception):
            hits.append((name, 'REFUSED', str(dl)))
            continue
        for h in dl.scan_text(text):
            hits.append((name, h[0], h[2]))
    return hits


def text_of_strings(doc):
    """the file's words: every string value and every distinct key, one per line (a JSON number holds no word)"""
    keys = []
    def walk(x):
        if isinstance(x, dict):
            for k, v in x.items():
                keys.append(k)
                walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
    walk(doc)
    return '\n'.join([s for _, s in strings_of(doc)] + sorted(set(keys)))


def scan_check(rep, text, label='file', doc=None):
    """C10: the clean-room scanner, both lists (the research list and M0's list), 0 hits. On a JSON file it reads the
    string values and keys (the reading N-22 fixed for colours, carried to the scan: E15 hand-off N-26); the whole
    text's hits are counted beside it, split into runs of digits only and the rest."""
    scan_on = text_of_strings(doc) if doc is not None else text
    hits = scan_text(scan_on)
    for name, cls, line in hits:
        rep.bad('C10', f'{label} string line {line}', f'{name} list: a {cls} hit')
    rep.ran('C10')
    rep.info['scanHits'] = len(hits)
    rep.info['scanLists'] = sorted(k for k, v in scanners().items() if not isinstance(v, Exception))
    if doc is not None:
        whole = []
        for name, dl in scanners().items():
            if not isinstance(dl, Exception):
                whole += [(name, h[0], h[1]) for h in dl.scan_text(text)]
        def numeric(t):
            ws = t.split()
            return all(w.isdigit() for w in ws) or (all(w.isdigit() for w in ws[:-1]) and ws[-1] in ('n', 'seeds', 'p10', 'p50', 'p90', 'pairs'))
        digits = [h for h in whole if h[1] == 'TRI' and numeric(h[2])]
        rep.info['wholeTextHits'] = {'total': len(whole), 'numberRuns': len(digits),
                                     'other': sorted({f'{n} {c} {t}' for n, c, t in whole if (n, c, t) not in set(digits)})[:20]}


# ---------------------------------------------------------------------------------------------------------------
# the baselines kind
# ---------------------------------------------------------------------------------------------------------------

def tail_of(row, reg):
    """the trailing id segments N-25 defines: /<subset> or /<subset>/<field>"""
    parts = row['id'].split('/')
    m = reg.get(row.get('metric'), {})
    fields = (m.get('output') or {}).get('fields') or []
    if len(parts) >= 2 and parts[-1] in fields:
        return '/'.join(parts[-2:])
    return parts[-1]


SUBSET_RE = re.compile(r'^(all|plain|ring|template-(area|street|square|ring)|class-(holed|cShaped|triangular|curved|roundJoined))$')


def check_baselines(doc, *, previous=None, committed=False, frames=None, registry=None, plan=None, scan=True, text=None):
    rep = Report('baselines', None)
    reg_doc, reg = registry or load_registry()
    _, fams = plan or load_plan()
    units = set(reg_doc['units'])
    rep.ran(*CHECK_IDS)
    # C1: the schema
    if not isinstance(doc, dict):
        rep.bad('C1', '.', 'not an object')
        return rep
    if list(doc.keys()) != ['schema', 'metricsVersion', 'pins', 'rows', 'crossings']:
        rep.bad('C1', '.', f'members {list(doc.keys())}')
    if doc.get('schema') != 'plat.baselines/2':
        rep.bad('C1', 'schema', repr(doc.get('schema')))
    rows = doc.get('rows')
    if not isinstance(rows, list):
        rep.bad('C1', 'rows', 'not a list')
        return rep
    if not rows:
        rep.bad('C1', 'rows', 'nothing to cross (an empty candidate)')
    if committed and previous is None:
        rep.bad('C9', '--previous', 'a candidate for a committed file is checked without --previous')
    if not isinstance(doc.get('crossings'), list):
        rep.bad('C1', 'crossings', 'not a list')
    for i, p in enumerate(doc.get('pins') or []):
        if set(p) != {'reference', 'build', 'since'}:
            rep.bad('C1', f'pins[{i}]', f'members {sorted(p)}')
        if p.get('reference') not in REFERENCES:
            rep.bad('C1', f'pins[{i}].reference', repr(p.get('reference')))
    for i, r in enumerate(rows):
        where = f"rows[{i}] {r.get('id', '?')}"
        if not isinstance(r, dict):
            rep.bad('C1', where, 'not an object')
            continue
        for k in ROW_REQUIRED:
            if k not in r:
                rep.bad('C1', where, f'no {k}')
        for k in r:
            if k in FORBIDDEN_ROW_KEYS:
                rep.bad('C1', where, f'carries {k} (N-05: the floor and sign stay in the registry)')
            elif k not in ROW_REQUIRED and k not in ROW_OPTIONAL:
                rep.bad('C1', where, f'unknown member {k}')
        ref = r.get('reference')
        if not (ref in REFERENCES or (isinstance(ref, str) and ref.startswith('corpus:'))):
            rep.bad('C1', where, f'reference {ref!r}')
        if r.get('role') not in ROLES:
            rep.bad('C1', where, f"role {r.get('role')!r}")
        if r.get('estimator') not in ESTIMATORS:
            rep.bad('C1', where, f"estimator {r.get('estimator')!r}")
        if r.get('scale') not in SCALES:
            rep.bad('C1', where, f"scale {r.get('scale')!r}")
        if 'evidence' in r and r['evidence'] not in EVIDENCE:
            rep.bad('C1', where, f"evidence {r['evidence']!r}")
        m = r.get('matched')
        if m is not None:
            if not isinstance(m, dict) or not set(m) <= {'rung', 'mfcgSize', 'ftgSize', 'population'} or m.get('rung') not in RUNGS:
                rep.bad('C1', where, f'matched {m!r}')
            elif 'ftgSize' in m and m['ftgSize'] not in FTG_SIZES:
                rep.bad('C1', where, f"ftgSize {m['ftgSize']!r}")
        v = r.get('values')
        if not isinstance(v, dict):
            rep.bad('C1', where, 'values not an object')
        else:
            keys = set(v)
            if 'bins' in keys or 'histogram' in keys:
                if keys != {'bins', 'histogram', 'n', 'seeds'}:
                    rep.bad('C1', where, f'distribution values {sorted(keys)}')
            elif not keys <= {'p10', 'p50', 'p90', 'n', 'seeds'} or not {'n', 'seeds'} <= keys:
                rep.bad('C1', where, f'scalar values {sorted(keys)}')
        s = r.get('sample')
        if not isinstance(s, dict) or 'family' not in s or not set(s) <= {'family', 'indices', 'captures', 'failed'}:
            rep.bad('C1', where, f'sample {s!r}'[:120])
        if 'spreadKS' in r and (not isinstance(r['spreadKS'], dict) or set(r['spreadKS']) != {'p90', 'pairs'}):
            rep.bad('C1', where, 'spreadKS form')
    # C2: strings by pattern; any other string field refused
    for i, r in enumerate(rows):
        if not isinstance(r, dict):
            continue
        where = f"rows[{i}] {r.get('id', '?')}"
        for path, s in strings_of(r):
            top = path.split('.')[0].split('[')[0]
            if path in ('id', 'metric', 'supersedes'):
                if not ID_RE.match(s):
                    rep.bad('C2', where, f'{path} {s!r}')
            elif path == 'sample.family' or re.fullmatch(r'sample\.captures\[\d+\]', path):
                if not LABEL_RE.match(s):
                    rep.bad('C2', where, f'{path} {s!r}')
            elif path == 'referenceBuild':
                if not BUILD_RE.match(s):
                    rep.bad('C2', where, f'{path} {s!r}')
            elif path == 'date':
                if not DATE_RE.match(s):
                    rep.bad('C2', where, f'{path} {s!r}')
            elif path == 'capture':
                if not (STAMP_RE.match(s) or RESEARCH_RE.match(s)):
                    rep.bad('C2', where, f'capture {s!r}')
            elif path == 'script':
                if not RESEARCH_RE.match(s):
                    rep.bad('C2', where, f'script {s!r}')
            elif path == 'metricVersion':
                if not VERSION_RE.match(s):
                    rep.bad('C2', where, f'{path} {s!r}')
            elif re.fullmatch(r'sample\.failed\[\d+\]\.reason', path):
                if not REASON_RE.match(s):
                    rep.bad('C2', where, f'{path} {s!r}')
            elif path in ('unit', 'reference', 'role', 'estimator', 'scale', 'evidence', 'matched.rung', 'matched.ftgSize'):
                pass   # enumerations, C1
            elif path == 'note':
                pass   # C3
            else:
                rep.bad('C2', where, f'a string in a field that holds none: {path}')
    for p, s in strings_of({'schema': doc.get('schema'), 'metricsVersion': doc.get('metricsVersion')}):
        if p == 'metricsVersion' and not VERSION_RE.match(s or ''):
            rep.bad('C2', p, repr(s))
    for i, pn in enumerate(doc.get('pins') or []):
        if not BUILD_RE.match(str(pn.get('build', ''))):
            rep.bad('C2', f'pins[{i}].build', repr(pn.get('build')))
        if not SINCE_RE.match(str(pn.get('since', ''))):
            rep.bad('C2', f'pins[{i}].since', repr(pn.get('since')))
    # C3: notes
    for i, r in enumerate(rows):
        if isinstance(r, dict) and 'note' in r:
            n = r['note']
            where = f"rows[{i}] {r.get('id', '?')}"
            if not isinstance(n, str) or len(n) > 200:
                rep.bad('C3', where, f'note of {len(n) if isinstance(n, str) else "?"} characters')
            elif not NOTE_RE.match(n):
                bad = sorted(set(ch for ch in n if not re.match(r'[A-Za-z0-9 .,;:()\-/%±≤≥×]', ch)))
                rep.bad('C3', where, f'note characters {bad}')
            elif scan:
                for name, cls, _ in scan_text(n):
                    rep.bad('C3', where, f'note: a {cls} hit ({name} list)')
    # C4: colours in string values only
    colour_check(rep, doc)
    # C5: numbers and units (and the values' own consistency)
    for p, x in numbers_of(doc):
        if isinstance(x, float) and not math.isfinite(x):
            rep.bad('C5', p, 'not finite')
    digit_runs = 0
    for i, r in enumerate(rows):
        if not isinstance(r, dict):
            continue
        where = f"rows[{i}] {r.get('id', '?')}"
        if r.get('unit') not in units:
            rep.bad('C5', where, f"unit {r.get('unit')!r}")
        v = r.get('values') or {}
        for k in ('n', 'seeds'):
            if not (isinstance(v.get(k), int) and not isinstance(v.get(k), bool) and v.get(k) >= 0):
                rep.bad('C5', where, f'values.{k} {v.get(k)!r}')
        if 'p50' in v:
            p10, p50, p90 = v.get('p10', v['p50']), v['p50'], v.get('p90', v['p50'])
            if not (p10 <= p50 <= p90):
                rep.bad('C5', where, f'p10 {p10} p50 {p50} p90 {p90} out of order')
        if 'bins' in v:
            b, h = v['bins'], v['histogram']
            if any(b[j] >= b[j + 1] for j in range(len(b) - 1)):
                rep.bad('C5', where, 'bins not increasing')
            if not (len(b) - 1 <= len(h) <= len(b) + 1) or any((not isinstance(c, int)) or c < 0 for c in h):
                rep.bad('C5', where, f'histogram of {len(h)} for {len(b)} edges')
            if sum(h) != v.get('n'):
                rep.bad('C5', where, f'histogram sums to {sum(h)}, n {v.get("n")}')
        if 'spreadKS' in r:
            sk = r['spreadKS']
            if not (0 <= sk.get('p90', -1) <= 1 and isinstance(sk.get('pairs'), int) and sk['pairs'] >= 1):
                rep.bad('C5', where, f'spreadKS {sk}')
        for p, x in numbers_of(r):
            if re.search(r'\d{6}', repr(x)):
                digit_runs += 1
    rep.info['numbersWithSixDigitRuns'] = digit_runs
    # C6: every metric in the registry at the row's version, with its unit and scale
    for i, r in enumerate(rows):
        if not isinstance(r, dict):
            continue
        where = f"rows[{i}] {r.get('id', '?')}"
        m = reg.get(r.get('metric'))
        if m is None:
            rep.bad('C6', where, f"metric {r.get('metric')!r} not in the registry (ids match case-sensitively, N-24)")
            continue
        if m.get('version') != r.get('metricVersion'):
            rep.bad('C6', where, f"metricVersion {r.get('metricVersion')} against the registry's {m.get('version')}")
        unit = m.get('unit') or (m.get('output') or {}).get('unit')
        if unit != r.get('unit'):
            rep.bad('C6', where, f"unit {r.get('unit')!r} against the registry's {unit!r}")
        if m.get('scale') != r.get('scale'):
            rep.bad('C6', where, f"scale {r.get('scale')!r} against the registry's {m.get('scale')!r}")
        if 'bins' in (r.get('values') or {}) and (m.get('output') or {}).get('kind') != 'distribution':
            rep.bad('C6', where, 'distribution values for a non-distribution metric')
        if not SUBSET_RE.match(tail_of(r, reg).split('/')[0]):
            rep.bad('C6', where, f'trailing segments {tail_of(r, reg)!r} name no N-25 subset')
    # C7: samples
    for i, r in enumerate(rows):
        if not isinstance(r, dict) or not isinstance(r.get('sample'), dict):
            continue
        where = f"rows[{i}] {r.get('id', '?')}"
        s = r['sample']
        fam = s.get('family')
        v = r.get('values') or {}
        if isinstance(r.get('reference'), str) and r['reference'].startswith('corpus:'):
            continue   # C8's
        if not isinstance(fam, str) or not fam.startswith('capture/'):
            rep.bad('C7', where, f'family {fam!r} is not a capture family')
            continue
        members = None
        if fam in fams:
            info = fams[fam]
            idx = s.get('indices')
            if idx is not None and (idx[0] != 0 or idx[1] != info['n']):
                rep.bad('C7', where, f"indices {idx} against the plan's [0, {info['n']})")
            if info['kind'] == 'ftg' or 'captures' in s:
                if s.get('captures') != info['labels']:
                    rep.bad('C7', where, "captures differ from the plan's slots in order" if info['kind'] == 'ftg'
                            else "captures differ from the plan's labels")
            if info['kind'] == 'ftg' and 'captures' not in s:
                rep.bad('C7', where, 'an FTG row without its captures')
            members = info['n']
        else:
            under = sorted(f for f in fams if f.startswith(fam + '/'))
            caps = s.get('captures')
            if len(under) < 2 or not caps:
                rep.bad('C7', where, f'family {fam!r} is not registered')
                continue
            seen = {}
            for c in caps:
                parent = c.rsplit('/', 1)[0]
                if parent not in under:
                    rep.bad('C7', where, f'capture {c} is in no registered family under {fam}')
                    break
                seen.setdefault(parent, []).append(c)
            for parent, labs in seen.items():
                if labs != fams[parent]['labels'][:len(labs)] or len(labs) != fams[parent]['n']:
                    rep.bad('C7', where, f'{parent}: captures are not its plan labels [0, n) in order')
            order = [c.rsplit('/', 1)[0] for c in caps]
            if order != sorted(order, key=lambda p: under.index(p) if False else list(dict.fromkeys(order)).index(p)):
                rep.bad('C7', where, 'members interleaved')
            members = len(caps)
        failed = s.get('failed') or []
        fidx = [f.get('index') for f in failed]
        if len(fidx) != len(set(fidx)) or any((not isinstance(x, int)) or x < 0 or x >= members for x in fidx):
            rep.bad('C7', where, f'failed indices {fidx} outside [0, {members})')
        contributing = members - len(set(fidx))
        if v.get('n', 0) == 0:
            if contributing != 0:
                rep.bad('C7', where, f'values.n 0 with {contributing} sample members unlisted in failed (a silent gap)')
        elif v.get('seeds') != contributing:
            rep.bad('C7', where, f"values.seeds {v.get('seeds')} against {contributing} members not in failed (an unlisted gap)")
    # C8: corpus rows
    for i, r in enumerate(rows):
        if not isinstance(r, dict):
            continue
        ref = r.get('reference')
        where = f"rows[{i}] {r.get('id', '?')}"
        if isinstance(ref, str) and ref.startswith('corpus:'):
            if not (CORPUS_FRAME_RE.match(ref) or CORPUS_MAP_RE.match(ref)):
                rep.bad('C8', where, f'corpus id {ref!r} (a frame id or a salted 16-hex map id)')
            if 'evidence' not in r:
                rep.bad('C8', where, 'no evidence')
            if r.get('role') == 'target' and not (ref.startswith('corpus:frame:') and (r.get('frameN') or 0) >= 20
                                                  and r.get('evidence') == 'surveyed'):
                rep.bad('C8', where, 'a corpus target row needs a frame row with frameN >= 20 and surveyed evidence')
            if ref.startswith('corpus:frame:'):
                fid = ref.split(':', 2)[2]
                fr = (frames or {}).get(fid)
                if fr is None or not (fr.get('crossedAt', '9999') < r.get('date', '')):
                    rep.bad('C8', where, f'frame {fid}: no frames.json crossing earlier than the row')
            for p, s in strings_of(r):
                if p.startswith('sample.') and not s.startswith('capture/') and s not in PRESET_KEYS and not p.endswith('reason'):
                    rep.bad('C8', where, f'a corpus string other than a preset key at {p}')
        elif 'evidence' in r or 'frameN' in r:
            rep.bad('C8', where, 'evidence or frameN on a reference row')
    # C9: append-only against the previous file; one live row per key
    if previous is not None:
        prev_rows = {r['id']: r for r in previous.get('rows', [])}
        cur = {r['id']: r for r in rows if isinstance(r, dict) and 'id' in r}
        for rid, pr in prev_rows.items():
            if rid not in cur:
                rep.bad('C9', rid, 'removed (append-only)')
            elif cur[rid] != pr:
                rep.bad('C9', rid, 'changed (append-only)')
    superseded = {r.get('supersedes') for r in rows if isinstance(r, dict) and r.get('supersedes')}
    ids = [r.get('id') for r in rows if isinstance(r, dict)]
    if len(ids) != len(set(ids)):
        rep.bad('C9', '.', 'repeated row ids')
    live = {}
    for i, r in enumerate(rows):
        if not isinstance(r, dict) or r.get('id') in superseded:
            continue
        m = r.get('matched') or {}
        fam = (r.get('sample') or {}).get('family', '')
        setting = fam.split('/')[3] if fam.count('/') >= 3 else ''
        key = (r.get('reference'), r.get('referenceBuild'), r.get('metric'), m.get('rung'), m.get('ftgSize'),
               m.get('mfcgSize'), setting, tail_of(r, reg))
        if key in live:
            rep.bad('C9', f"rows[{i}] {r.get('id')}", f'a second live row for {key} with no supersedes link (first {live[key]})')
        else:
            live[key] = r.get('id')
    # C10: the scanner over the whole file
    if scan:
        scan_check(rep, text if text is not None else json.dumps(doc, indent=1, ensure_ascii=False), doc=doc)
    rep.info['rows'] = len(rows)
    return rep


# ---------------------------------------------------------------------------------------------------------------
# the ng-faces kind (section 7b; attachment B)
# ---------------------------------------------------------------------------------------------------------------

NGF_TOP = ['schema', 'referenceBuild', 'metricsVersion', 'scaleDeclared', 'outlineKind', 'hoods', 'faces']
NGF_HOOD = {'id', 'referenceBuild', 'template', 'seedLabel', 'capture', 'outlineCm'}
NGF_FACE = {'id', 'referenceBuild', 'hood', 'template', 'classes', 'ringCm', 'holesCm', 'blockAreasCm2', 'cuts'}
NGF_CLASSES = {'holed', 'cShaped', 'triangular', 'curved', 'roundJoined'}
NGF_CUT = {'lengthCm', 'cornerT', 'arrivalCdeg', 'fillet', 'bends'}
TEMPLATES = {'area', 'street', 'square', 'ring'}


def is_int(x):
    return isinstance(x, int) and not isinstance(x, bool)


def shoelace2(ring):
    return sum(ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1] for i in range(len(ring) - 1))


def _segs_cross(p1, p2, p3, p4):
    def orient(a, b, c):
        v = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
        return (v > 0) - (v < 0)
    def on(a, b, c):
        return min(a[0], b[0]) <= c[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= c[1] <= max(a[1], b[1])
    o1, o2, o3, o4 = orient(p1, p2, p3), orient(p1, p2, p4), orient(p3, p4, p1), orient(p3, p4, p2)
    if o1 != o2 and o3 != o4:
        return True
    return (o1 == 0 and on(p1, p2, p3)) or (o2 == 0 and on(p1, p2, p4)) or (o3 == 0 and on(p3, p4, p1)) or (o4 == 0 and on(p3, p4, p2))


def ring_simple(ring):
    """closed ring: no two non-adjacent edges touch, no repeated vertex (grid-bucketed)"""
    pts = ring[:-1]
    if len(set(map(tuple, pts))) != len(pts):
        return False
    n = len(pts)
    edges = [(pts[i], pts[(i + 1) % n]) for i in range(n)]
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    span = max(max(xs) - min(xs), max(ys) - min(ys), 1)
    cell = max(span / max(1, int(math.sqrt(n))), 1)
    grid = {}
    for k, (a, b) in enumerate(edges):
        for gx in range(int(min(a[0], b[0]) // cell), int(max(a[0], b[0]) // cell) + 1):
            for gy in range(int(min(a[1], b[1]) // cell), int(max(a[1], b[1]) // cell) + 1):
                grid.setdefault((gx, gy), []).append(k)
    seen = set()
    for lst in grid.values():
        for ii in range(len(lst)):
            for jj in range(ii + 1, len(lst)):
                i, j = lst[ii], lst[jj]
                if (i, j) in seen or abs(i - j) == 1 or abs(i - j) == n - 1:
                    continue
                seen.add((i, j))
                if _segs_cross(edges[i][0], edges[i][1], edges[j][0], edges[j][1]):
                    return False
    return True


def check_ring(rep, where, ring, sign):
    if not isinstance(ring, list) or len(ring) < 4 or not all(isinstance(p, list) and len(p) == 2 and all(is_int(c) for c in p) for p in ring):
        rep.bad('C1', where, 'a ring of integer [x, y] pairs with at least four vertices')
        return None
    if ring[0] != ring[-1]:
        rep.bad('C1', where, 'ring not closed')
        return None
    a2 = shoelace2(ring)
    if (a2 > 0) != (sign > 0) or a2 == 0:
        rep.bad('C1', where, f"orientation: shoelace {'positive' if a2 > 0 else 'negative'}")
    if not ring_simple(ring):
        rep.bad('C1', where, 'ring not simple')
    return a2 / 2.0


def check_ngfaces(doc, *, scan=True, text=None):
    rep = Report('ng-faces', None)
    rep.ran('C1', 'C2', 'C4', 'C5', 'C10')
    if list(doc.keys()) != NGF_TOP:
        rep.bad('C1', '.', f'members {list(doc.keys())} (exactly {NGF_TOP})')
    if doc.get('schema') != 'plat.ng-faces/1':
        rep.bad('C1', 'schema', repr(doc.get('schema')))
    if doc.get('outlineKind') != 1:
        rep.bad('C1', 'outlineKind', repr(doc.get('outlineKind')))
    sd = doc.get('scaleDeclared')
    if not (isinstance(sd, dict) and set(sd) == {'mPerModelUnit'} and isinstance(sd['mPerModelUnit'], (int, float))):
        rep.bad('C1', 'scaleDeclared', repr(sd))
    build = doc.get('referenceBuild')
    if not (isinstance(build, str) and BUILD_RE.match(build)):
        rep.bad('C2', 'referenceBuild', repr(build))
    if not (isinstance(doc.get('metricsVersion'), str) and VERSION_RE.match(doc['metricsVersion'])):
        rep.bad('C2', 'metricsVersion', repr(doc.get('metricsVersion')))
    hoods = {}
    for i, h in enumerate(doc.get('hoods') or []):
        where = f'hoods[{i}]'
        if set(h) != NGF_HOOD:
            rep.bad('C1', where, f'fields {sorted(h)}')
            continue
        if not is_int(h['id']) or h['id'] in hoods:
            rep.bad('C1', where, f"id {h['id']!r}")
        hoods[h['id']] = h
        if h['referenceBuild'] != build:
            rep.bad('C1', where, 'referenceBuild differs from the top record (or is missing)')
        if h['template'] not in TEMPLATES:
            rep.bad('C2', where, f"template {h['template']!r}")
        if not (isinstance(h['seedLabel'], str) and LABEL_RE.match(h['seedLabel'])):
            rep.bad('C2', where, f"seedLabel {h['seedLabel']!r}")
        if not (isinstance(h['capture'], str) and (STAMP_RE.match(h['capture']) or RESEARCH_RE.match(h['capture']))):
            rep.bad('C2', where, f"capture {h['capture']!r}")
        check_ring(rep, where + '.outlineCm', h['outlineCm'], +1)
    face_ids = set()
    worst = 0.0
    for i, f in enumerate(doc.get('faces') or []):
        where = f'faces[{i}]'
        if set(f) != NGF_FACE:
            rep.bad('C1', where, f'fields {sorted(f)}')
            continue
        if not is_int(f['id']) or f['id'] in face_ids:
            rep.bad('C1', where, f"id {f['id']!r}")
        face_ids.add(f['id'])
        if f['referenceBuild'] != build:
            rep.bad('C1', where, 'referenceBuild differs from the top record (or is missing)')
        if f['hood'] not in hoods:
            rep.bad('C1', where, f"hood {f['hood']!r} names no hood")
        elif f['template'] != hoods[f['hood']]['template']:
            rep.bad('C1', where, "template differs from its hood's")
        if f['template'] not in TEMPLATES:
            rep.bad('C2', where, f"template {f['template']!r}")
        cl = f['classes']
        if not (isinstance(cl, dict) and set(cl) == NGF_CLASSES and all(v in (0, 1) and is_int(v) for v in cl.values())):
            rep.bad('C1', where, f'classes {cl!r}')
        a = check_ring(rep, where + '.ringCm', f['ringCm'], +1)
        holes = 0.0
        for j, hr in enumerate(f['holesCm']):
            ha = check_ring(rep, where + f'.holesCm[{j}]', hr, -1)
            holes += ha or 0.0
        bl = f['blockAreasCm2']
        if not (isinstance(bl, list) and bl and all(is_int(x) and x > 0 for x in bl)):
            rep.bad('C1', where, 'blockAreasCm2 must be non-empty positive integers')
        elif a is not None:
            net = a + holes
            dev = abs(net - sum(bl)) / max(net, 1)
            worst = max(worst, dev)
            if dev > 1e-3:
                rep.bad('C1', where, f'leaves sum {sum(bl)} against the ring area {net:.0f} (relative {dev:.2e})')
        for k, c in enumerate(f['cuts']):
            w2 = where + f'.cuts[{k}]'
            if set(c) != NGF_CUT or not all(is_int(c[x]) for x in NGF_CUT):
                rep.bad('C1', w2, f'cut fields {c!r}'[:120])
                continue
            if c['lengthCm'] <= 0 or c['bends'] < 0 or not (0 <= c['arrivalCdeg'] <= 9000) or c['fillet'] not in (0, 1):
                rep.bad('C1', w2, 'a cut field out of range')
            if c['bends'] == 1:
                if not 0 <= c['cornerT'] <= 1000:
                    rep.bad('C1', w2, 'cornerT outside 0-1000 on a one-bend cut')
            else:
                if c['cornerT'] != -1 or c['fillet'] != 0:
                    rep.bad('C1', w2, 'cornerT not -1 or fillet set on a cut that is not one-bend')
    for p, x in numbers_of(doc):
        if p == 'scaleDeclared.mPerModelUnit':
            continue
        if not is_int(x):
            rep.bad('C5', p, 'a number that is not an integer')
    allowed = re.compile(r'^(schema|referenceBuild|metricsVersion|hoods\[\d+\]\.(referenceBuild|template|seedLabel|capture)|'
                         r'faces\[\d+\]\.(referenceBuild|template))$')
    for p, s in strings_of(doc):
        if not allowed.match(p):
            rep.bad('C2', p, 'a string in a field that holds none')
    colour_check(rep, doc)
    if scan:
        scan_check(rep, text if text is not None else json.dumps(doc), doc=doc)
    rep.info.update({'hoods': len(hoods), 'faces': len(face_ids), 'largestLeafAreaDeviation': worst})
    return rep


# ---------------------------------------------------------------------------------------------------------------
# the denylist kind (section 7c; attachment C)
# ---------------------------------------------------------------------------------------------------------------

def check_denylist(doc, raw, *, scan=True):
    import make_denylist as MD
    rep = Report('denylist', None)
    rep.ran('C1', 'C4', 'C10')
    v = MD.validate_m0(doc, raw)
    for p in v['problems']:
        rep.bad('C1', 'denylist', p)
    colour_check(rep, doc)
    if scan:
        header = {k: doc[k] for k in ('schema', 'normalisationVersion', 'digestHexDigits', 'date', 'corpusCut', 'counts') if k in doc}
        scan_check(rep, json.dumps(header, indent=1), 'header')
    rep.info.update({'strings': v['strings'], 'asciiOnly': v['ascii_only'], 'bytes': v['bytes']})
    return rep


def check_answers(doc):
    """a panel file's answers (V12 section 3.3's list): no note crosses as text (T-V12-1); the rest of the kind is M1's"""
    rep = Report('answers', None)
    rep.ran('C3')
    for p, s in strings_of(doc):
        if p.split('.')[-1].split('[')[0] == 'note':
            rep.bad('C3', p, 'a note carried as text in a panel file')
    return rep


# ---------------------------------------------------------------------------------------------------------------
# the T-V12 fixtures (R-26): each refused naming its check; the passes pass
# ---------------------------------------------------------------------------------------------------------------

def _first_rows(cand, k=3):
    d = copy.deepcopy(cand)
    d['rows'] = d['rows'][:k]
    return d


def fixtures(cand_path):
    cand = json.load(open(cand_path))
    regp = load_registry()
    planp = load_plan()
    out = []

    def expect(name, rep, check, refused=True):
        got = bool(rep.problems.get(check)) if refused else rep.ok()
        out.append({'fixture': name, 'expect': f'refused by {check}' if refused else 'passes', 'ok': got,
                    'named': [c for c in CHECK_IDS if rep.problems.get(c)]})

    def cb(doc, **kw):
        return check_baselines(doc, registry=regp, plan=planp, scan=kw.pop('scan', False), **kw)

    base = _first_rows(cand, 3)
    # T-V12-1
    d = copy.deepcopy(base); d['rows'][0]['capture'] = 'Somewhere Market Town'
    expect('T-V12-1 a place-name string in capture', cb(d), 'C2')
    d = copy.deepcopy(base); d['rows'][0]['note'] = 'x' * 201
    expect('T-V12-1 a 201-character note', cb(d), 'C3')
    d = copy.deepcopy(base); d['rows'][0]['note'] = 'tone a1b2c3 here'
    expect('T-V12-1 a six-hex-digit sequence', cb(d), 'C4')
    d = copy.deepcopy(base); del d['rows'][0]['referenceBuild']
    expect('T-V12-1 a row without referenceBuild', cb(d), 'C1')
    mf = next(r for r in cand['rows'] if r['sample'].get('family') == 'capture/MFCG/40/plain')
    d = copy.deepcopy(base); d['rows'] = [copy.deepcopy(mf)]; d['rows'][0]['sample']['indices'] = [3, 10]
    expect('T-V12-1 sample.indices starting at 3', cb(d), 'C7')
    prev = copy.deepcopy(base); d = copy.deepcopy(base); d['rows'] = d['rows'][1:]
    expect('T-V12-1 a removed row', cb(d, previous=prev), 'C9')
    d = copy.deepcopy(base); twin = copy.deepcopy(d['rows'][0]); twin['id'] = 'twin/' + twin['id']
    d['rows'].append(twin)
    expect('T-V12-1 two live rows for one setting with no supersedes', cb(d), 'C9')
    corpus = copy.deepcopy(mf)
    corpus.update({'id': 'corpus/x/' + mf['metric'] + '/all', 'reference': 'corpus:map:Lowtown', 'evidence': 'record'})
    d = copy.deepcopy(base); d['rows'] = [corpus]
    expect('T-V12-1 an unsalted corpus id', cb(d), 'C8')
    c2 = copy.deepcopy(corpus); c2.update({'reference': 'corpus:frame:f1', 'role': 'target', 'frameN': 12, 'evidence': 'surveyed'})
    d = copy.deepcopy(base); d['rows'] = [c2]
    expect('T-V12-1 a corpus target row with frameN 12', cb(d, frames={'f1': {'crossedAt': '2026-01-01'}}), 'C8')
    c3 = copy.deepcopy(corpus); c3['reference'] = 'corpus:map:0123456789abcdef'; c3['sample']['captures'] = ['Old Quarter']
    d = copy.deepcopy(base); d['rows'] = [c3]
    expect('T-V12-1 a corpus string other than a preset key', cb(d), 'C8')
    c4 = copy.deepcopy(corpus); c4.update({'reference': 'corpus:frame:f2', 'role': 'descriptive', 'evidence': 'surveyed', 'frameN': 30})
    d = copy.deepcopy(base); d['rows'] = [c4]
    expect("T-V12-1 a frame row whose frame's frames.json crossing is not earlier",
           cb(d, frames={'f2': {'crossedAt': '2099-01-01'}}), 'C8')
    expect('T-V12-1 an answers.json note carried as text', check_answers({'answers': [{'pair': 1, 'note': 'left looks older'}]}), 'C3')
    d = copy.deepcopy(base); d['rows'] = []
    expect('T-V12-1 an empty candidate', cb(d), 'C1')
    expect("T-V12-1 a committed file's candidate checked without --previous", cb(copy.deepcopy(base), committed=True), 'C9')
    d = copy.deepcopy(base); d['rows'] = [copy.deepcopy(mf)]; d['rows'][0]['sample']['family'] = 'capture/MFCG/40/plain'
    expect('T-V12-1 an upper-case sample.family (capture/MFCG/40/plain) passes C2', cb(d), 'C2', refused=False)
    d = copy.deepcopy(base); d['rows'] = [copy.deepcopy(mf)]
    expect('T-V12-1 a one-row file passes', cb(d), 'C1', refused=False)
    # N-24, N-22, N-05
    d = copy.deepcopy(base); d['rows'] = [copy.deepcopy(next(r for r in cand['rows'] if r['metric'] == 'block.countTemplate'))]
    expect('N-24 block.countTemplate passes C2 and C6', cb(d), 'C6', refused=False)
    d['rows'][0]['metric'] = 'block.counttemplate'
    expect('N-24 block.counttemplate pairs with no registry entry', cb(d), 'C6')
    r22 = Report('n22', None); colour_check(r22, {'s': 'abc 0a0b0c def'})
    out.append({'fixture': 'N-22 a string holding a six-hex run fails', 'expect': 'refused by C4', 'ok': bool(r22.problems['C4']), 'named': ['C4']})
    r22 = Report('n22', None)
    colour_check(r22, {'d': 'ftg:2026-10-04+aa8ba6c213b6', 'salt': '0' * 64, 'big': 123456789, 'six': 66.676072,
                       'digest': '42fd4a8c529fdb40'})
    out.append({'fixture': 'N-22 a 16-hex digest, a 64-hex salt, a nine-digit integer and a six-decimal number pass',
                'expect': 'passes', 'ok': not r22.problems['C4'], 'named': ['C4'] if r22.problems['C4'] else []})
    d = copy.deepcopy(base); d['rows'][0]['absFloor'] = 0.02
    expect('N-05 a row carrying an absFloor', cb(d), 'C1')
    d = copy.deepcopy(base); d['rows'][0]['sign'] = 'any'
    expect('N-05 a row carrying a sign field', cb(d), 'C1')
    # T-V12-30
    m130 = next(r for r in cand['rows'] if r['sample'].get('family') == 'capture/MFCG/130/plain' and r['values'].get('n'))
    d = copy.deepcopy(base); d['rows'] = [copy.deepcopy(m130)]
    expect('T-V12-30 a row with a failed plan index listed passes C7', cb(d), 'C7', refused=False)
    d['rows'][0]['sample'].pop('failed')
    expect('T-V12-30 an unlisted gap is refused', cb(d), 'C7')
    d = copy.deepcopy(base); d['rows'] = [copy.deepcopy(mf)]
    d['rows'][0]['sample']['failed'] = [{'index': 9, 'reason': 'empty'}]
    d['rows'][0]['values']['seeds'] -= 1
    expect('T-V12-30 a capture left with no building, a failed index with reason empty, passes C7', cb(d), 'C7', refused=False)
    ftg_pop = next(r for r in cand['rows'] if r['metric'] == 'pop.perBuilding' and r['reference'] == 'FTG')
    out.append({'fixture': 'T-V12-30 an FTG capture without residents takes the nominal population, marked',
                'expect': 'the row carries the nominal population and says so', 'named': [],
                'ok': ftg_pop['matched'].get('population') == 5600 and 'nominal' in ftg_pop.get('note', '')})
    import adapters.mfcg as AM
    census = dict(mergedVertices=0, selfTouchSplits=0, spikesDropped=0, droppedPolygons=0, droppedLines=0)
    ring = [[0, 0], [0, 0], [10, 0], [5, 5], [10, 10], [0, 10], [5, 5], [0, 0]]        # a coincident pair and a touch at (5, 5)
    parts = AM.clean_ring(ring, census)
    zero = AM.clean_ring([[0, 0], [10, 0], [20, 0], [0, 0]], census)                 # zero area: drops
    line = AM.clean_line([[3, 3], [3, 3]], census)                                     # a zero-length segment: drops
    ok = census['mergedVertices'] >= 1 and census['selfTouchSplits'] >= 1 and census['droppedPolygons'] >= 1 and \
        census['droppedLines'] >= 1 and len(parts) >= 2 and not zero and not line
    out.append({'fixture': "T-V12-30 coincident vertices, a zero-length segment, a zero-area footprint and a self-touching "
                           "ring cleaned by V12 3.2.2's rule with the drops counted", 'expect': 'cleaned and counted',
                'ok': ok, 'named': [], 'census': census})
    empty = AM.clean_ring([[0, 0], [1, 0], [2, 0], [0, 0]], dict(census))
    out.append({'fixture': 'T-V12-30 a capture left with no building', 'expect': 'no ring survives, so the index is failed with reason empty',
                'ok': empty == [] and REASON_RE.match('empty') is not None, 'named': []})
    # N-21 (attachment B): the ng-faces kind refuses, naming the record and the field
    ngp = os.path.join(HERE, 'candidates', 'ng-faces.json')
    if os.path.exists(ngp):
        ng = json.load(open(ngp))
        small = {k: v for k, v in ng.items()}
        small['hoods'] = ng['hoods'][:2]
        keep = {h['id'] for h in small['hoods']}
        small['faces'] = [f for f in ng['faces'] if f['hood'] in keep][:6]
        def cn(doc):
            return check_ngfaces(doc, scan=False)
        out.append({'fixture': 'N-21 a two-hood excerpt of the candidate passes', 'expect': 'passes', 'ok': cn(small).ok(), 'named': []})
        planted = []
        d = copy.deepcopy(small); del d['faces'][0]['referenceBuild']; planted.append(('a face without referenceBuild', d, 'C1'))
        d = copy.deepcopy(small); del d['hoods'][0]['referenceBuild']; planted.append(('a hood without referenceBuild', d, 'C1'))
        d = copy.deepcopy(small); d['faces'][0]['ringCm'][1][0] += 0.5; planted.append(('a decimal coordinate', d, 'C5'))
        d = copy.deepcopy(small); d['extra'] = 1; planted.append(('an unknown member', d, 'C1'))
        d = copy.deepcopy(small); d['hoods'][0]['seedLabel'] = 'Old Town Hood'; planted.append(('a seedLabel outside its pattern', d, 'C2'))
        d = copy.deepcopy(small); r = d['faces'][0]['ringCm']; r[1], r[2] = r[2], r[1]; planted.append(('a self-crossing ring', d, 'C1'))
        d = copy.deepcopy(small); d['faces'][0]['blockAreasCm2'][0] += 10 ** 6; planted.append(('block areas off their face by 100 m2', d, 'C1'))
        d = copy.deepcopy(small); d['faces'][0]['cuts'][0]['cornerT'] = 1200; planted.append(('a cut field out of range', d, 'C1'))
        d = copy.deepcopy(small); d['hoods'][0]['capture'] = 'tone 0a0b0c'; planted.append(('a six-hex run in a string', d, 'C4'))
        for name, doc, chk in planted:
            rp = cn(doc)
            out.append({'fixture': 'N-21 ' + name, 'expect': f'refused by {chk}', 'ok': bool(rp.problems[chk]),
                        'named': [c for c in CHECK_IDS if rp.problems.get(c)]})
    # N-22 (attachment C): the denylist kind
    import make_denylist as MD
    hexd = lambda i: format(i, '016x')
    dl = {'schema': 'plat.denylist/1', 'normalisationVersion': 1, 'digestHexDigits': 16, 'date': '2026-10-04T06:00:00Z',
          'corpusCut': '2026-10-04T05:56:16Z', 'salt': '0' * 64, 'counts': {'tokens': 2}, 'tokens': [hexd(1), hexd(2)],
          'trigrams': [], 'colours': [], 'files': [], 'lists': [{'id': 1, 'words': [hexd(3)]}], 'spell': []}
    out.append({'fixture': 'N-22 a synthetic deny-list passes the kind', 'expect': 'passes',
                'ok': check_denylist(dl, json.dumps(dl).encode(), scan=False).ok(), 'named': []})
    d = copy.deepcopy(dl); d['tokens'] = [hexd(2), hexd(1)]
    rp = check_denylist(d, json.dumps(d).encode(), scan=False)
    out.append({'fixture': 'N-22 an unsorted digest array', 'expect': 'refused by C1', 'ok': bool(rp.problems['C1']), 'named': ['C1'] if rp.problems['C1'] else []})
    d = copy.deepcopy(dl); d['tokens'] = [hexd(1)[:15]]
    rp = check_denylist(d, json.dumps(d).encode(), scan=False)
    out.append({'fixture': 'N-22 a 15-digit digest', 'expect': 'refused by C1', 'ok': bool(rp.problems['C1']), 'named': ['C1'] if rp.problems['C1'] else []})
    return out


def tv12_28(paths):
    """T-V12-28's research-side part: the scanner over every file W-15 would cross, 0 hits; no MeasureInput (a
    features array of geometry) and no captures/ path inside a crossing file. The plat/ path scan is the checker seat's
    (W-20), which reads plat/."""
    res = []
    for p in paths:
        text = open(p, encoding='utf-8').read()
        hits = scan_text(text)
        doc = json.loads(text)
        has_features = any(k == 'features' for k, _ in _keys(doc))
        cap_paths = [s for _, s in strings_of(doc) if s.startswith('captures/') or '/captures/' in s.replace('research:captures/', '')]
        res.append({'file': os.path.relpath(p, ROOT), 'scanHits': len(hits), 'hits': hits[:5],
                    'measureInput': has_features, 'capturePaths': len(cap_paths),
                    'ok': not hits and not has_features and not cap_paths})
    return res


def _keys(x, path=''):
    if isinstance(x, dict):
        for k, v in x.items():
            yield k, path
            yield from _keys(v, path + '.' + k)
    elif isinstance(x, list):
        for v in x[:50]:
            yield from _keys(v, path)


def main(argv):
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('file', nargs='?')
    ap.add_argument('--kind', choices=('baselines', 'ng-faces', 'denylist'), default='baselines')
    ap.add_argument('--previous')
    ap.add_argument('--committed', action='store_true', help='the file has a committed version (then --previous is required)')
    ap.add_argument('--fixtures', action='store_true')
    ap.add_argument('--candidate', default=os.path.join(HERE, 'candidates', 'baselines.json'))
    ap.add_argument('--tv12-28', nargs='*')
    ap.add_argument('--json')
    a = ap.parse_args(argv)
    if a.fixtures:
        res = fixtures(a.candidate)
        for r in res:
            print(('PASS ' if r['ok'] else 'FAIL ') + r['fixture'] + f"  [{r['expect']}; named {r['named']}]")
        bad = [r for r in res if not r['ok']]
        print(f'{len(res) - len(bad)} / {len(res)} fixtures behave')
        if a.json:
            json.dump(res, open(a.json, 'w'), indent=1)
        return 1 if bad else 0
    if a.tv12_28 is not None:
        res = tv12_28(a.tv12_28)
        for r in res:
            print(('PASS ' if r['ok'] else 'FAIL ') + json.dumps(r))
        if a.json:
            json.dump(res, open(a.json, 'w'), indent=1)
        return 0 if all(r['ok'] for r in res) else 1
    if not a.file:
        ap.print_usage()
        return 2
    raw = open(a.file, 'rb').read()
    text = raw.decode('utf-8')
    doc = json.loads(text)
    if a.kind == 'baselines':
        prev = json.load(open(a.previous)) if a.previous else None
        rep = check_baselines(doc, previous=prev, committed=a.committed, text=text)
    elif a.kind == 'ng-faces':
        rep = check_ngfaces(doc, text=text)
    else:
        rep = check_denylist(doc, raw)
    rep.path = os.path.relpath(os.path.abspath(a.file), ROOT)
    s = rep.summary()
    for c in s['checks']:
        print(('PASS ' if c['pass'] else 'FAIL ') + c['id'] + (f"  {c['problems']} problems; first: {c['first']}" if not c['pass'] else ''))
    print('info', json.dumps(s['info'], ensure_ascii=False))
    print('REFUSED' if s['refused'] else 'ACCEPTED', rep.path)
    if a.json:
        json.dump(s, open(a.json, 'w'), indent=1, ensure_ascii=False)
    return 1 if s['refused'] else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
