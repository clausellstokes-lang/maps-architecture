#!/usr/bin/env python3
"""W-02 post-processing of one FTG capture (research-side; no site contact).

  python3 research/baselines/ftg_capture_post.py <stamp> --slot K [--signed-in] [--notes notes.md] [--check-only]

--signed-in marks a capture made in the owner's signed-in free account (J163, slots 1-5): the README names the settlement
as saved in the account, and the account list's population is recorded beside the nominal one (numbers only).

Reads captures/ftg/<stamp>/session/network/index.jsonl and the Fetch-intercepted bodies, and the slot K of
research/baselines/plan.json (size, water, nominal population). Writes into the capture folder:
  create-request.json   the PUT body, pretty-printed (the hash is taken over the exact bytes sent)
  request-diff.txt      leaf diff against the 2026-09-21 base request (research/ftg-capture/create-request.json)
  structure.md          tools/pb_raw.py's schema-less structure of the layout payload
  capture-facts.json    every number the README states, with the checks and their verdicts
  README.md             the capture README (plan section 2.1; ARCHITECTURE section 13.6 (2)); --notes appends a section
Exit status 0 only when every check of W-02's row passes (10 checks: calls, size key, water keys, the request diff
against the base and against slot 0 within the named size-dependent leaves (R-24), the same-size values, decode, border,
no resident field, pb_raw). --check-only writes nothing and prints the checks.

Decoding follows the recorded findings: payload coordinates are zig-zag sint32 in centimetres (memory note on FTG
payload decoding; research/findings/code-ftg-client.md section 2.1 gives the 27-field layout message, none of which is
a resident count). Field numbers used: 3 road graph (3.1 edges, 3.2 nodes), 5 settlement border, 6 water bodies,
7 wall towers, 8 buildings, 10 districts.
"""
import hashlib, json, os, subprocess, sys, datetime, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(ROOT, 'tools'))
from pb_raw import parse, varint  # noqa: E402

BASE_REQUEST = os.path.join(ROOT, 'research', 'ftg-capture', 'create-request.json')
PLAN = os.path.join(HERE, 'plan.json')
KNOWN_TOP_LEVEL = set(range(1, 28))            # the layout message's 27 fields (code-ftg-client.md section 2.1)
WATER_KEYS = {'none': (None, False), 'coast+river': ('COASTAL', True)}   # (coastType, rivers) per WaterSetting
HALF_WIDTH_M = {'BIG_TOWN': 2000.0, 'BIG_CITY': 2750.0}                   # size ladder width / 2 (presets.json)
# The size-dependent preset values, pinned by name (ruling R-24; no prefix rule). The client fills them from the chosen
# size; no simple-form control sets them. Measured on three sizes: the 2026-09-21 CITY base, day 1 (BIG_TOWN, slot 0) and
# slot 1 (BIG_CITY, signed in), whose form steps differed only in the size option (E02 section 10). Day 1 differed from
# the base in the first eleven; slot 1 adds the last five.
SIZE_DEPENDENT = (
    '.buildingsParameters.defaultInsideSettlementShopProbability',
    '.buildingsParameters.defaultOutsideSettlementShopProbability',
    '.factionsParameters.numberOfRandomFactions',
    '.layoutParameters.stages[0].horizontalBranchSegments',
    '.layoutParameters.stages[0].minDistrictArea',
    '.layoutParameters.stages[0].proportionOfBuildings',
    '.layoutParameters.stages[0].spokeStaySpokeProbability',
    '.layoutParameters.stages[0].verticalBranchSegments',
    '.layoutParameters.stages[1].minDistrictArea',
    '.layoutParameters.stages[1].proportionOfBuildings',
    '.layoutParameters.stages[1].roadLength',
    '.layoutParameters.stages[0].maxSpokesInStage',
    '.layoutParameters.stages[0].roadLength',
    '.layoutParameters.stages[1].horizontalBranchSegments',
    '.layoutParameters.stages[1].verticalBranchSegments',
    '.religionParameters.religionTargetPercentage',
)


def zz(n):
    return (n >> 1) ^ -(n & 1)


def packed(b):
    i, out = 0, []
    while i < len(b):
        x, i = varint(b, i)
        out.append(x)
    return out


def leaves(o, p=''):
    if isinstance(o, dict):
        for k in sorted(o):
            yield from leaves(o[k], '%s.%s' % (p, k))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from leaves(v, '%s[%d]' % (p, i))
        if not o:
            yield p, []
    else:
        yield p, o


def request_diff(base, new):
    a, b = dict(leaves(base)), dict(leaves(new))
    keys = sorted(set(a) | set(b))
    diff = [(k, a.get(k, '<absent>'), b.get(k, '<absent>')) for k in keys if a.get(k, '<absent>') != b.get(k, '<absent>')]
    nonsem = [d for d in diff if d[0].startswith('.racePartners[') and d[0].endswith('.partnerId')]
    sem = [d for d in diff if d not in nonsem]
    return diff, sem, nonsem


def main(argv):
    stamp = argv[0]
    slot_k = int(argv[argv.index('--slot') + 1])
    notes = argv[argv.index('--notes') + 1] if '--notes' in argv else None
    check_only = '--check-only' in argv
    signed_in = '--signed-in' in argv          # J163: created in the owner's signed-in free account (slots 1-5)
    cap = os.path.join(ROOT, 'captures', 'ftg', stamp)
    net = os.path.join(cap, 'session', 'network')
    slot = json.load(open(PLAN))['ftg']['slots'][slot_k]
    rows = [json.loads(l) for l in open(os.path.join(net, 'index.jsonl'))]

    put = [r for r in rows if r.get('method') == 'PUT' and r.get('postData') and '/settlements' in r.get('url', '')]
    get = [r for r in rows if r.get('method') == 'GET' and '/layout' in r.get('url', '') and not r.get('intercepted')]
    lay = [r for r in rows if r.get('intercepted') and '/layout' in r.get('url', '') and r.get('bodyFile', '').endswith('.bin')]
    pid = [r for r in rows if r.get('intercepted') and r.get('method') == 'PUT']
    checks = []

    def check(name, ok, receipt, cid):
        checks.append({'id': cid, 'check': name, 'passed': bool(ok), 'receipt': receipt})

    check('one PUT with a body, one layout GET, one intercepted layout body',
          len(put) == 1 and len(get) == 1 and len(lay) == 1,
          'PUT rows %d, layout GET rows %d, intercepted layout bodies %d' % (len(put), len(get), len(lay)), 'calls')
    put, get, lay = put[0], get[0], lay[0]
    body = put['postData'].encode('utf-8')
    req = json.loads(put['postData'])
    request_hash = hashlib.sha256(body).hexdigest()[:12]
    sid = json.loads(open(os.path.join(net, 'bodies', pid[0]['bodyFile'])).read()) if pid else None
    # Signed in, the account's settlement list (GET .../prod/settlements, read after the create) lists a population per
    # settlement; the layout payload has none. Recorded beside the nominal value (numbers only; E02 section 9.1).
    listed = None
    for r in rows:
        if r.get('method') == 'GET' and r.get('url', '').split('?')[0].endswith('/prod/settlements') and r.get('bodyFile', '').endswith('.json'):
            try:
                hit = [e for e in json.load(open(os.path.join(net, 'bodies', r['bodyFile']))) if e.get('id') == sid]
            except (ValueError, AttributeError, TypeError):
                hit = []
            if hit:
                listed = hit[0].get('population')

    # request checks (W-02 checker: size key equals the slot's; water keys equal the slot's water option, PC-16)
    lp = req['landscapeParameters']
    want_coast, want_rivers = WATER_KEYS[slot['water']]
    check('request size key equals the slot', req['size'] == slot['ftgSize'],
          'size %s, slot %s' % (req['size'], slot['ftgSize']), 'sizeKey')
    check('request water keys equal the slot water option', lp['coastType'] == want_coast and lp['rivers'] is want_rivers,
          'coastType %r rivers %r; slot %s wants %r / %r' % (lp['coastType'], lp['rivers'], slot['water'], want_coast, want_rivers), 'waterKeys')
    diff, sem, nonsem = request_diff(json.load(open(BASE_REQUEST)), req)
    # Classes of difference against the 2026-09-21 CITY base. (a) the slot's own keys; (b) the raw resources the water
    # options imply; (c) the layout preset's size-dependent values, which the client fills when the size changes (no
    # simple-form control sets them; first seen on day 1, 2026-10-03 — PLAUSIBLE until a second size confirms it);
    # (d) client-random partner ids. Anything else is a form value that left the base: the check fails.
    slot_keys = {'.size', '.landscapeParameters.coastType', '.landscapeParameters.rivers'}
    water_implied = [d for d in sem if d[0].startswith('.landscapeParameters.availableRawResources')]
    size_implied = [d for d in sem if d[0] in SIZE_DEPENDENT]
    other = [d for d in sem if d[0] not in slot_keys and d not in water_implied and d not in size_implied]
    check('request differs from the 2026-09-21 base only in the slot keys, water-implied resources and the named size-dependent preset values',
          not other, '%d differing leaves: slot keys %d, water-implied %d, size-dependent preset %d (%s), partner ids %d, other %d%s' % (
              len(diff), len([d for d in sem if d[0] in slot_keys]), len(water_implied), len(size_implied),
              ', '.join(d[0].replace('.layoutParameters.', '') for d in size_implied), len(nonsem), len(other),
              (' (' + ', '.join(d[0] for d in other) + ')') if other else ''), 'requestDiff')

    # The same against slot 0 (day 1, the first capture; the same form steps but the size and the water): only the slot
    # keys, water-implied resources and named size-dependent values may differ. A later slot of a size already captured
    # must repeat that capture's size-dependent values exactly (they are a function of the size).
    plan_slots = json.load(open(PLAN))['ftg']['slots']
    req_of = lambda k: json.load(open(os.path.join(ROOT, 'captures', 'ftg', plan_slots[k]['capture'], 'create-request.json')))
    ref0 = req_of(0) if plan_slots[0].get('capture') and slot_k != 0 else req
    _, sem0, _ = request_diff(ref0, req)
    other0 = [d for d in sem0 if d[0] not in slot_keys and not d[0].startswith('.landscapeParameters.availableRawResources')
              and d[0] not in SIZE_DEPENDENT]
    check('request differs from slot 0 (day 1) only in the slot keys, water-implied resources and the named size-dependent values',
          not other0, 'against %s: %d semantic differences (%d size-dependent), other %d%s' % (
              plan_slots[0].get('capture') if slot_k != 0 else 'itself', len(sem0),
              len([d for d in sem0 if d[0] in SIZE_DEPENDENT]), len(other0),
              (' (' + ', '.join(d[0] for d in other0) + ')') if other0 else ''), 'vsSlot0')
    same = [k for k, s in enumerate(plan_slots) if k < slot_k and s.get('capture') and s['ftgSize'] == slot['ftgSize']]
    if same:
        ref, mine = dict(leaves(req_of(same[0]))), dict(leaves(req))
        moved = [k for k in SIZE_DEPENDENT if ref.get(k, '<absent>') != mine.get(k, '<absent>')]
        check('the named size-dependent values equal the first capture of this size', not moved,
              'against slot %d (%s): %d of %d equal%s' % (same[0], plan_slots[same[0]]['capture'], len(SIZE_DEPENDENT) - len(moved),
                                                          len(SIZE_DEPENDENT), (' (moved: ' + ', '.join(moved) + ')') if moved else ''), 'sameSize')
    else:
        check('the named size-dependent values equal the first capture of this size', True,
              'no earlier capture at %s: this capture sets the reference values' % slot['ftgSize'], 'sameSize')

    # payload decode (W-02 checker: pb_raw.py decodes it; field 3 edges and nodes, field 8 buildings present)
    blob = open(os.path.join(net, 'bodies', lay['bodyFile']), 'rb').read()
    top = parse(blob)
    counts = collections.Counter(fn for fn, _, _ in top)
    f3 = [v for fn, wt, v in top if fn == 3]
    sub3 = collections.Counter(fn for fn, _, _ in parse(f3[0])) if f3 else collections.Counter()
    edges, nodes, buildings = sub3.get(1, 0), sub3.get(2, 0), counts.get(8, 0)
    check('payload decodes: field 3 edges and nodes, field 8 buildings present', edges > 0 and nodes > 0 and buildings > 0,
          '%d bytes; top-level fields %s; 3.1 edges %d, 3.2 nodes %d, 8 buildings %d' % (
              len(blob), dict(sorted(counts.items())), edges, nodes, buildings), 'decode')
    f5 = [v for fn, wt, v in top if fn == 5]
    border = [zz(x) / 100.0 for x in packed(f5[0])] if f5 else []
    half = max(abs(x) for x in border) if border else None
    check('settlement border is the size ladder square (zig-zag cm)', half is not None and abs(half - HALF_WIDTH_M[slot['ftgSize']]) <= 0.02,
          'border %d points, max |coordinate| %.2f m, ladder half width %.0f m' % (len(border) // 2, half or -1, HALF_WIDTH_M[slot['ftgSize']]), 'border')
    unknown = sorted(set(counts) - KNOWN_TOP_LEVEL)
    check('no top-level field outside the known 27 (none of which is a resident count) -> populationSource nominal',
          not unknown, 'unknown top-level fields: %s' % unknown, 'noResidentField')
    run = subprocess.run([sys.executable, os.path.join(ROOT, 'tools', 'pb_raw.py'), os.path.join(net, 'bodies', lay['bodyFile'])]
                         + ([] if check_only else ['--out', os.path.join(cap, 'structure.md')]), capture_output=True, text=True)
    check('tools/pb_raw.py runs on the payload', run.returncode == 0,
          (run.stdout.strip().splitlines() or [''])[0][:160] if run.returncode == 0 else run.stderr[-300:], 'pbRaw')

    put_ts, get_ts = put['ts'], get['ts']
    server_date = (put.get('respHeaders') or {}).get('date')
    sdate = datetime.datetime.strptime(server_date, '%a, %d %b %Y %H:%M:%S GMT').strftime('%Y-%m-%d') if server_date else None
    facts = {
        'capture': stamp, 'slot': slot_k, 'label': slot['label'], 'family': slot['family'], 'ftgSize': slot['ftgSize'],
        'rung': slot['rung'], 'water': slot['water'],
        'population': slot['nominalPopulation'], 'populationSource': 'nominal' if not unknown else 'unchecked',
        'listedPopulation': listed, 'account': 'signed-in free account (J163)' if signed_in else 'guest (no account, J159)',
        'serverDate': sdate, 'putResponseDateHeader': server_date,
        'layoutResponseDateHeader': (get.get('respHeaders') or {}).get('date'),
        'putSentUtc': datetime.datetime.utcfromtimestamp(put_ts).isoformat(timespec='milliseconds') + 'Z',
        'serverTimeS': round(get_ts - put_ts, 3), 'serverTimeContended': True,
        'requestBytes': len(body), 'requestHash': request_hash, 'referenceBuild': 'ftg:%s+%s' % (sdate, request_hash),
        'settlementIdPrefix': (sid or '')[:8], 'payloadFile': 'session/network/bodies/' + lay['bodyFile'], 'payloadBytes': len(blob),
        'edges': edges, 'nodes': nodes, 'buildings': buildings, 'towers': counts.get(7, 0), 'waterBodies': counts.get(6, 0),
        'districts': counts.get(10, 0), 'borderHalfWidthM': half, 'topLevelFields': sorted(counts),
        'requestDiff': {'leaves': len(diff), 'semantic': [[d[0], d[1], d[2]] for d in sem], 'partnerIds': len(nonsem),
                        'slotKeys': len([d for d in sem if d[0] in slot_keys]), 'waterImplied': len(water_implied),
                        'sizeDependentPreset': len(size_implied), 'other': len(other)},
        'checks': checks,
    }
    ok = all(c['passed'] for c in checks)
    if check_only:
        print(json.dumps(facts, indent=1, default=str))
        return 0 if ok else 1

    open(os.path.join(cap, 'create-request.json'), 'w').write(json.dumps(req, indent=1, ensure_ascii=False) + '\n')
    lines = ['Diff: research/ftg-capture/create-request.json (2026-09-21 base) -> captures/ftg/%s/create-request.json' % stamp,
             'total differing leaves: %d' % len(diff), 'semantic differences (%d):' % len(sem)]
    cls = lambda d: ('slot key' if d[0] in slot_keys else 'water-implied' if d in water_implied
                     else 'size-dependent preset value' if d in size_implied else 'OTHER (a form value left the base)')
    lines += ['  %s: %r -> %r   [%s]' % (d + (cls(d),)) for d in sem]
    lines += ['non-semantic: %d x .racePartners[i].partnerId (client-generated random ids)' % len(nonsem)]
    open(os.path.join(cap, 'request-diff.txt'), 'w').write('\n'.join(lines) + '\n')
    # numbers and ids only: the check prose lives in README.md (captures/**/*.json is doc_checks.py's reference corpus)
    json.dump(dict(facts, checks=[{'id': c['id'], 'passed': c['passed']} for c in checks]),
              open(os.path.join(cap, 'capture-facts.json'), 'w'), indent=1, default=str)

    t = facts
    readme = [
        '# FTG capture %s — %s, `WaterSetting: %s` (M-1 W-02, slot %d)' % (stamp, t['ftgSize'], t['water'], slot_k), '',
        'Research-side capture folder (plan `docs/calibration/M-1-plan.md` section 2.1; record `docs/calibration/E02-ftg-captures.md`).',
        'Made with `profiler/session.mjs --target ftg --headful` and `profiler/drive.mjs`, step by step by',
        '`research/baselines/ftg_capture_checklist.md`; post-processed by `research/baselines/ftg_capture_post.py %s --slot %d%s`.' % (stamp, slot_k, ' --signed-in' if signed_in else ''), '',
        '## The three fields of ARCHITECTURE section 13.6 (2) and the plan\'s README fields', '',
        '| field | value |', '|---|---|',
        '| capture id (this folder) | `%s` |' % stamp,
        '| plan slot / label | %d / `%s` (family `%s`, rung %s) |' % (slot_k, t['label'], t['family'], t['rung']),
        '| size (request key) | `%s` |' % t['ftgSize'],
        '| `WaterSetting` | `%s` (request: coast type %r, rivers %r) |' % (t['water'], lp['coastType'], lp['rivers']),
        '| population | %d |' % t['population'],
    ] + (['| listed population | %d (the account\'s settlement list; not the payload; recorded beside the nominal value, E02 section 9.1) |' % listed]
         if listed is not None else []) + [
        '| `populationSource` | `%s` — the layout payload carries no resident count (its top-level fields %s are all within the known 27-field layout message, none a population) |' % (t['populationSource'], t['topLevelFields']),
        '| server date / time | %s; PUT answered `%s`, layout answered `%s` |' % (t['serverDate'], t['putResponseDateHeader'], t['layoutResponseDateHeader']),
        '| server time | %.3f s (PUT sent → layout GET sent, `index.jsonl` ts); recorded on a contended machine, feeds no time row |' % t['serverTimeS'],
        '| buildings | %d (payload field 8) |' % t['buildings'],
        '| request hash | `%s` (sha256 of the exact PUT body bytes, %d bytes, first 12 hex) |' % (t['requestHash'], t['requestBytes']),
        '| `referenceBuild` | `%s` |' % t['referenceBuild'], '',
        '## Other numbers from the payload', '',
        '| item | value |', '|---|---|',
        '| payload | `%s`, %d bytes (Fetch-intercepted, decoded body) |' % (t['payloadFile'], t['payloadBytes']),
        '| road graph | %d edges (3.1), %d nodes (3.2) |' % (edges, nodes),
        '| wall towers / water bodies / districts | %d / %d / %d |' % (t['towers'], t['waterBodies'], t['districts']),
        '| settlement border | square, max coordinate %.2f m (zig-zag sint32, cm) — the size ladder\'s half width |' % half,
        ('| settlement id | `%s…` (a new settlement saved in the owner\'s signed-in free account, J163) |' if signed_in else
         '| temporary-settlement id | `%s…` (the guest identity\'s id; the new settlement replaced the previous one under it) |') % t['settlementIdPrefix'], '',
        '## Request', '',
        '`create-request.json` is the PUT body pretty-printed. `request-diff.txt` compares it with the 2026-09-21 CITY base and',
        'classes each difference: %d slot keys, %d water-implied resource entries, %d size-dependent preset values (filled by the' % (
            len([d for d in sem if d[0] in slot_keys]), len(water_implied), len(size_implied)),
        'client from the size; no simple-form control sets them), %d other, and %d client-random partner ids.' % (len(other), len(nonsem)), '',
        '## Checks (`ftg_capture_post.py`; all must pass)', '',
        '| check | passed | receipt |', '|---|---|---|',
    ] + ['| %s | %s | %s |' % (c['check'], 'yes' if c['passed'] else '**no**', c['receipt'].replace('|', '/')) for c in checks]
    if notes:
        readme += ['', open(notes).read().rstrip()]
    open(os.path.join(cap, 'README.md'), 'w').write('\n'.join(readme) + '\n')
    print(json.dumps({k: v for k, v in facts.items() if k not in ('checks', 'requestDiff')}, default=str))
    for c in checks:
        print('%s  %s — %s' % ('PASS' if c['passed'] else 'FAIL', c['check'], c['receipt']))
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
