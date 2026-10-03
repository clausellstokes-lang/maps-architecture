#!/usr/bin/env python3
"""W-03's checker: re-verifies the MFCG sweep from the files on disk (research-side; numbers only).

  python3 research/baselines/check_w03.py <capture folder> [--plan research/baselines/plan.json] [--build 12710731]

Checks (each prints PASS/FAIL with counts; exit 0 only when every check passes):
  C1 loads      loads.jsonl: at most 35 navigations, each plan seed loaded at most once, every URL on the pinned build
                with the plan's JSON export query; every recorded load is one document request (no second navigation)
  C2 files      every ok seed has <name>.json and <name>.svg whose sha1 equals the logged download sha1 and the in-page Blob
                (sameAsDownload), JSON by the URL key and SVG by the window; JSON and SVG name the same city
  C3 href       the canonical href after the export carries the plan's seed and options (hrefExpect, every key)
  C4 reexport   the same-load JSON re-export (downloads denied) is byte-identical to the URL-export JSON
  C5 version    every JSON's values feature says generator mfcg, version as the pin; unit ratio 4.0 (stats.json)
  C6 sample     per family: n planned, captured, failed (retry: a second generation attempt or another internal seed;
                no-export: no JSON) -- every slot accounted for, none dropped; a slot's J161 loads count with its J159 load
  C7 j161       <folder>/j161/ (owner J161, lane m1/W-03-complete): at most 2 navigations in its own ledger, plan names, each
                loaded at most once, on the pinned build with the plan's JSON export query, one document each, a record
                for every load, no download completed (downloads denied; files are the in-page Blob bytes), and every
                written file hashing to its logged sha1
  C8 cold       the row's re-export of seed 0: the J161 cold load of size40-plain-0 gave JSON and SVG byte-identical to the
                stored files (compared again here, byte for byte), with the plan href, one attempt and no download
Writes <folder>/export-check.json (the name keeps it out of stats.py's stems).
"""
import hashlib, json, os, sys
from urllib.parse import urlparse, parse_qs

d = sys.argv[1]
argv = sys.argv[2:]
plan_path = argv[argv.index('--plan') + 1] if '--plan' in argv else os.path.join(os.path.dirname(__file__), 'plan.json')
build = argv[argv.index('--build') + 1] if '--build' in argv else '12710731'
pin_version = '0.11.5'
plan = json.load(open(plan_path))
entries = [dict(e, family=f['family']) for f in plan['families'] if f['family'].startswith('capture/MFCG/') for e in f['entries']]
by_name = {e['name']: e for e in entries}
rl = lambda p: [json.loads(l) for l in open(os.path.join(d, p)) if l.strip()]
loads, log = rl('loads.jsonl'), rl('export-log.jsonl')
recs = {}
for r in log:
    if 'note' in r: continue
    recs.setdefault(r['name'], []).append(r)
# J161 (owner, 2026-10-03): its own ledger and log under <folder>/j161/ (research/baselines/mfcg_j161_m1.mjs)
jd = os.path.join(d, 'j161')
j_loads = rl('j161/loads.jsonl') if os.path.exists(os.path.join(jd, 'loads.jsonl')) else []
j_log = rl('j161/export-log.jsonl') if os.path.exists(os.path.join(jd, 'export-log.jsonl')) else []
j_recs, j_notes = {}, {}
for r in j_log:
    (j_notes if 'note' in r else j_recs).setdefault(r['name'], []).append(r)
j159_ok = lambda n: any(x.get('ok') for x in recs.get(n, []))
sha1 = lambda p: hashlib.sha1(open(p, 'rb').read()).hexdigest()
out = {'folder': d, 'build': build, 'checks': {}}
def check(cid, ok, **kw):
    out['checks'][cid] = dict(passed=bool(ok), **kw); print(f"{cid} {'PASS' if ok else 'FAIL'} {json.dumps(kw)[:400]}")

# C1
names = [l['name'] for l in loads]
bad_url = [l['name'] for l in loads if not (f"/html/{build}/" in l['url'] and l['url'].endswith(by_name[l['name']]['exports'][0]))]
multi_doc = [n for n, rs in recs.items() for r in rs if 'network' in r and len(r['network']['documents']) != 1]
check('C1-loads', len(loads) <= 35 and len(set(names)) == len(names) and not bad_url and not multi_doc,
      loads=len(loads), distinctSeeds=len(set(names)), badUrl=bad_url, recordsWithOtherThanOneDocument=multi_doc,
      recordsWithNetwork=sum(1 for rs in recs.values() for r in rs if 'network' in r))
# C2
ok_names = [n for n in names if any(r.get('ok') for r in recs.get(n, []))]
problems = []; files = 0; denied = 0
for n in ok_names:
    r = [x for x in recs[n] if x.get('ok')][-1]
    dls = [x for x in r['downloads'] if x.get('file')]; denied += sum(1 for x in r['downloads'] if x['state'] == 'canceled')
    trig = {os.path.splitext(x['file'])[1]: x['trigger'] for x in dls}
    if trig != {'.json': 'url', '.svg': 'ui'}: problems.append((n, 'triggers', trig))
    for x in dls:
        files += 1
        if sha1(os.path.join(d, x['file'])) != x['sha1']: problems.append((n, 'sha1 on disk', x['file']))
        if not any(b.get('sha1') == x['sha1'] and b.get('sameAsDownload') for b in r['blobs']): problems.append((n, 'blob', x['file']))
    stems = {os.path.splitext(x['suggestedFilename'])[0] for x in dls}
    if len(stems) != 1: problems.append((n, 'city names differ', sorted(stems)))
check('C2-files', not problems, okSeeds=len(ok_names), filesDownloaded=files, deniedInPageReexports=denied, problems=problems[:10])
# C3
href_bad = [n for n in ok_names if not [x for x in recs[n] if x.get('ok')][-1]['hrefOk']]
for n in ok_names:
    r = [x for x in recs[n] if x.get('ok')][-1]; q = {k: v[0] for k, v in parse_qs(urlparse(r['hrefAfter']).query).items()}
    if any(q.get(k) != v for k, v in by_name[n]['hrefExpect'].items()): href_bad.append(n)
check('C3-href', not href_bad, checked=len(ok_names), keys=sorted(entries[0]['hrefExpect']), bad=sorted(set(href_bad)))
# C4
rx = {n: [x for x in recs[n] if x.get('ok')][-1].get('reexport') for n in ok_names}
rx_done = {n: v for n, v in rx.items() if v and 'byteIdentical' in v}
check('C4-reexport', bool(rx_done) and all(v['byteIdentical'] for v in rx_done.values()),
      seedsWithReexport=len(rx_done), byteIdentical=sum(1 for v in rx_done.values() if v['byteIdentical']),
      size40plain0='no in-page re-export (calibration load)' if not rx.get('size40-plain-0') else rx['size40-plain-0'],
      size40plain0J161=[x.get('reexport') for x in j_recs.get('size40-plain-0', []) if x.get('ok')])
# C5
stats = {s['file']: s for s in json.load(open(os.path.join(d, 'stats.json')))}
vers = {}; unit_bad = []
for n in ok_names:
    F = {f['id']: f for f in json.load(open(os.path.join(d, n + '.json')))['features']}
    v = F['values'].get('properties', F['values']); vers[(v.get('generator'), v.get('version'))] = vers.get((v.get('generator'), v.get('version')), 0) + 1
    if stats.get(n, {}).get('unit_ratio') != 4.0: unit_bad.append(n)
check('C5-version', list(vers) == [('mfcg', pin_version)] and not unit_bad, versions={f'{a} {b}': c for (a, b), c in vers.items()}, unitRatioNot4=unit_bad)
# C6
fam = {}
for e in entries:
    f = fam.setdefault(e['family'], {'n': 0, 'captured': [], 'failed': []}); f['n'] += 1
    rs = recs.get(e['name'], []); okr = [x for x in rs if x.get('ok')]
    jrs = [] if okr else j_recs.get(e['name'], [])        # a J161 load of an exported seed is the cold re-export, not a capture
    okr = okr or [x for x in jrs if x.get('ok')]
    if okr:
        r = okr[-1]; f['captured'].append(e['name'])
        if r['retry']:
            f['failed'].append({'label': e['label'], 'reason': 'retry', 'attempts': r['attempts'], 'internalSeeds': r['internalSeeds'], 'filesKept': True})
    elif rs or jrs:
        detail = [f"J159 load {x.get('loadN', '?')}: {x.get('failure')}" for x in rs]
        for x in jrs:
            live = [n.get('liveness') for n in j_notes.get(e['name'], []) if n.get('note') == 'liveness']
            detail.append(f"J161 load {x.get('loadN')}: {x.get('failure')}; generation marker seen: {x.get('markerSeen')}; attempts {x.get('attempts')}; "
                          + (live[-1] if live else 'no liveness note'))
        f['failed'].append({'label': e['label'], 'reason': 'no-export', 'loads': len(rs) + len(jrs), 'detail': detail, 'filesKept': False})
    else:
        f['failed'].append({'label': e['label'], 'reason': 'not-loaded', 'filesKept': False})
for f in fam.values(): f['usable'] = len(f['captured']) - sum(1 for x in f['failed'] if x['reason'] == 'retry')
accounted = all(f['n'] == len(f['captured']) + sum(1 for x in f['failed'] if x['reason'] != 'retry') for f in fam.values())
check('C6-sample', accounted, families={k: {'n': v['n'], 'captured': len(v['captured']), 'usable': v['usable'], 'failed': [(x['label'].rsplit('/', 1)[-1], x['reason']) for x in v['failed']]} for k, v in fam.items()})
# C7
jn = [l['name'] for l in j_loads]; jprob = []
for l in j_loads:
    if l['name'] not in by_name: jprob.append((l['name'], 'not a plan name')); continue
    if not (f"/html/{build}/" in l['url'] and l['url'].endswith(by_name[l['name']]['exports'][0])): jprob.append((l['name'], 'url'))
    if l['name'] not in j_recs: jprob.append((l['name'], 'no record'))
for n, rs in j_recs.items():
    for r in rs:
        if len(r['network']['documents']) != 1: jprob.append((n, 'documents', len(r['network']['documents'])))
        done = [x for x in (r.get('downloadEvents') or r.get('downloads') or []) if x.get('state') == 'completed']
        if done: jprob.append((n, 'download completed', len(done)))
        for x in r.get('files', []):
            p = os.path.join(jd if j159_ok(n) else d, x['file'])
            if not os.path.exists(p) or sha1(p) != x['sha1']: jprob.append((n, 'file sha1', x['file']))
check('C7-j161', len(j_loads) <= 2 and len(set(jn)) == len(jn) and not jprob, loads=len(j_loads), names=jn, problems=jprob[:10],
      records={n: [('ok' if r.get('ok') else 'failed') for r in rs] for n, rs in j_recs.items()})
# C8
cold = [x for x in j_recs.get('size40-plain-0', []) if x.get('ok')]
c8 = {'run': bool(cold)}
if cold:
    r = cold[-1]
    for ext in ('.json', '.svg', '.png'):
        a, b = os.path.join(jd, 'size40-plain-0' + ext), os.path.join(d, 'size40-plain-0' + ext)
        c8[ext] = os.path.exists(a) and os.path.exists(b) and open(a, 'rb').read() == open(b, 'rb').read()
    c8['logged'] = [(x['ext'], x['compare']['byteIdentical']) for x in r['files']]
    c8.update(hrefOk=r['hrefOk'], attempts=r['attempts'], retry=r['retry'], downloadsCompleted=sum(1 for x in r.get('downloadEvents', []) if x.get('state') == 'completed'), sameLoadReexport=(r.get('reexport') or {}).get('byteIdentical'))
check('C8-cold', bool(cold) and c8['.json'] and c8['.svg'] and all(v for _, v in c8['logged']) and c8['hrefOk'] and not c8['retry']
      and c8['downloadsCompleted'] == 0, **c8)
hosts = {}
for rs in recs.values():
    for r in rs:
        for h, c in (r.get('network') or {}).get('hosts', {}).items(): hosts[h] = hosts.get(h, 0) + c
j_hosts = {}
for rs in j_recs.values():
    for r in rs:
        for h, c in (r.get('network') or {}).get('hosts', {}).items(): j_hosts[h] = j_hosts.get(h, 0) + c
out['hostsContacted'] = hosts; out['hostsContactedJ161'] = j_hosts; out['sample'] = fam
json.dump(out, open(os.path.join(d, 'export-check.json'), 'w'), indent=1)
print('hosts', hosts, 'J161', j_hosts)
sys.exit(0 if all(c['passed'] for c in out['checks'].values()) else 1)
