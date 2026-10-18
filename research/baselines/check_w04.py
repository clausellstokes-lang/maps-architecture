#!/usr/bin/env python3
"""M-1 W-04 checker: the NG recording programme (research-side; numbers only, no reference content printed).

Reads the programme folder written by research/baselines/ng_programme_m1.mjs (index.json, loads.jsonl, disk.log) and
research/baselines/plan.json, then every capture folder the index names. Checks, each PASS or FAIL:

  C1 row: each meta.json keeps the requested tags and seed: args.seed / args.query / runs 0 / passes draw / vertices on;
     exactly one generation (gen-0, cold load); the final href's tags and seed equal the plan entry's; and the
     generator's own per-generation console line (exactly one per load) names the same seed and the two tags.
  C2 row: paths.json caps untouched: counts.skippedLong == 0 and counts.droppedTotal == 0 (also nonFinite, path2d and
     errors == 0, and meta.json's copy of the counts equals the file's).
  C3 row: profiler/paths_stats.py --md runs on every folder: one invocation over all folders exits 0 and every one of its
     four tables has one row per folder; its markdown goes to <programme>/paths-stats.md, its --json to scratch.
  C4 J159: at most --cap loads (start lines), distinct plan labels, every start has an end; each folder's network index
     holds exactly one top-level document request for the build's index.html (one load); no download.
  C5 every load settled with the generation marker seen (settled true, markerTimedOut false); gen-0.png and
     gen-0.draw.json present (W-11 registers the road and footprint layers on the screenshot).
  C6 build: every baseUrl and href is the checked build (index.json's build).
  C7 coverage: every plan entry of the W-04 families has a captured folder (44 of 44).

  python3 research/baselines/check_w04.py <programme dir> [--plan research/baselines/plan.json] [--cap 44]
          [--stats-json <out.json>] [--summary <out.json>] [--no-stats]
Exit 0 when every check passes, 1 otherwise. --summary writes the per-load numbers E04 uses.
"""
import argparse, json, os, re, subprocess, sys
from urllib.parse import urlparse, parse_qs

MAPS = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
GEN_LINE = re.compile(r'\.hx:\d+: (\d+): ([a-z]+), ([a-z]+)\s*$')   # the build's per-generation line: <seed>: <tags>
GEN_ANY = re.compile(r'\.hx:\d+: \d+:')


def jl(p):
    return [json.loads(l) for l in open(p) if l.strip()] if os.path.exists(p) else []


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('programme'); ap.add_argument('--plan', default=os.path.join(MAPS, 'research/baselines/plan.json'))
    ap.add_argument('--cap', type=int, default=44); ap.add_argument('--stats-json'); ap.add_argument('--summary')
    ap.add_argument('--no-stats', action='store_true')
    a = ap.parse_args()
    P = a.programme
    idx = json.load(open(os.path.join(P, 'index.json')))
    loads = jl(os.path.join(P, 'loads.jsonl'))
    plan = json.load(open(a.plan))
    ents = [dict(e, template=f['setting']['template'], size=f['setting']['size'])
            for f in plan['families'] if f.get('reference') == 'NG' and f.get('workItem') == 'W-04' for e in f['entries']]
    build = str(idx['build'])
    fails = {k: [] for k in ('C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7')}
    summary = []

    # C4: the load ledger
    starts = [r for r in loads if r['phase'] == 'start']; ends = {r['label']: r for r in loads if r['phase'] == 'end'}
    labels = [r['label'] for r in starts]
    planned = {e['label']: e for e in ents}
    if len(starts) > a.cap: fails['C4'].append(f'{len(starts)} loads > cap {a.cap}')
    if len(set(labels)) != len(labels): fails['C4'].append('a label was loaded twice')
    for r in starts:
        if r['label'] not in planned: fails['C4'].append(f"{r['label']}: not a plan entry")
        elif int(r['seed']) != int(planned[r['label']]['seed']): fails['C4'].append(f"{r['label']}: ledger seed differs from the plan")
        if r['label'] not in ends: fails['C4'].append(f"{r['label']}: start without end")

    folders = []
    for e in ents:
        rec = idx['loads'].get(e['label'])
        if not rec or not rec.get('folder'):
            fails['C7'].append(f"{e['label']}: no capture folder"); continue
        d = rec['folder'] if os.path.isabs(rec['folder']) else os.path.join(MAPS, rec['folder'])
        folders.append(d)
        tags = f"{e['template']},{e['size']}"; seed = str(e['seed']); L = e['label']
        try:
            m = json.load(open(os.path.join(d, 'meta.json')))
        except Exception as x:
            fails['C1'].append(f'{L}: meta.json unreadable ({type(x).__name__})'); continue
        ar = m.get('args', {})
        if str(ar.get('seed')) != seed: fails['C1'].append(f'{L}: args.seed {ar.get("seed")} != {seed}')
        if ar.get('query') != f'tags={tags}': fails['C1'].append(f'{L}: args.query {ar.get("query")!r}')
        if str(ar.get('runs')) != '0' or ar.get('passes') != 'draw' or ar.get('vertices') is not True:
            fails['C1'].append(f'{L}: runs/passes/vertices {ar.get("runs")}/{ar.get("passes")}/{ar.get("vertices")}')
        gens = (m.get('passes') or {}).get('draw') or []
        if len(m.get('passes') or {}) != 1 or len(gens) != 1 or gens[0].get('name') != 'gen-0' or gens[0].get('how') != 'cold-load':
            fails['C1'].append(f'{L}: not exactly one cold-load generation'); continue
        g = gens[0]
        q = parse_qs(urlparse(g.get('href', '')).query)
        if q.get('tags') != [tags] or q.get('seed') != [seed]: fails['C1'].append(f'{L}: href tags/seed {q.get("tags")}/{q.get("seed")}')
        con = jl(os.path.join(d, 'draw', 'console.jsonl'))
        gl = [c['text'] for c in con if c.get('type') == 'log' and GEN_ANY.search(c.get('text', ''))]
        mm = [GEN_LINE.search(t) for t in gl]
        if len(gl) != 1 or not mm[0] or mm[0].group(1) != seed or f'{mm[0].group(2)},{mm[0].group(3)}' != tags:
            fails['C1'].append(f'{L}: generator line count {len(gl)}, seed/tags ' + (f'{mm[0].group(1)}/{mm[0].group(2)},{mm[0].group(3)}' if gl and mm[0] else 'none'))
        # C2
        pj = os.path.join(d, 'draw', 'gen-0.paths.json')
        try:
            pf = json.load(open(pj)); c = pf['counts']
        except Exception as x:
            fails['C2'].append(f'{L}: paths.json unreadable ({type(x).__name__})'); continue
        for k in ('skippedLong', 'droppedTotal', 'nonFinite', 'path2d', 'errors'):
            if c.get(k) != 0: fails['C2'].append(f'{L}: {k} = {c.get(k)}')
        if g.get('paths') != c: fails['C2'].append(f'{L}: meta counts differ from the file')
        # C5
        if g.get('settled') is not True or g.get('markerTimedOut') is not False: fails['C5'].append(f'{L}: settled {g.get("settled")} markerTimedOut {g.get("markerTimedOut")}')
        for f in ('gen-0.png', 'gen-0.draw.json', 'gen-0.idle.json'):
            if not os.path.exists(os.path.join(d, 'draw', f)): fails['C5'].append(f'{L}: {f} missing')
        # C6
        if f'/html/{build}/' not in m.get('baseUrl', '') or f'/html/{build}/' not in g.get('href', ''): fails['C6'].append(f'{L}: build differs')
        # C4 per folder: exactly one document load, no download
        net = jl(os.path.join(d, 'draw', 'network', 'index.jsonl'))
        docs = [r for r in net if r.get('type') == 'Document']
        if len(docs) != 1 or f'/html/{build}/' not in docs[0].get('url', '') or 'index.html' not in docs[0].get('url', ''):
            fails['C4'].append(f'{L}: {len(docs)} document requests')
        hosts = sorted({urlparse(r['url']).hostname for r in net if r.get('url')})
        dl = [r for r in net if (r.get('respHeaders') or {}).get('content-disposition', '').startswith('attachment')]
        if dl: fails['C4'].append(f'{L}: {len(dl)} attachment responses')
        size = sum(os.path.getsize(os.path.join(r_, f)) for r_, _, fs in os.walk(d) for f in fs)
        summary.append({'label': L, 'name': e['name'], 'template': e['template'], 'size': e['size'], 'seed': int(seed),
                        'folder': os.path.relpath(d, MAPS), 'records': c['records'], 'vertices': c['vertices'], 'paints': c['paints'],
                        'pathsBytes': os.path.getsize(pj), 'folderBytes': size, 'requests': len(net), 'hosts': hosts,
                        'wallMs': g.get('wallMs'), 'readyAtMs': g.get('readyAtMs'), 'canvases': g.get('canvases')})

    # C3: paths_stats.py --md over every folder, one invocation
    if not a.no_stats and folders:
        sj = a.stats_json or os.path.join(P, '.paths-stats.tmp.json')
        cmd = [sys.executable, os.path.join(MAPS, 'profiler', 'paths_stats.py'), *folders, '--md', '--json', sj]
        r = subprocess.run(cmd, capture_output=True, text=True)
        open(os.path.join(P, 'paths-stats.md'), 'w').write(r.stdout)
        if r.returncode != 0: fails['C3'].append(f'paths_stats exit {r.returncode}: {r.stderr.strip().splitlines()[-1:]}')
        else:
            blocks = re.split(r'\n#### ', '\n' + r.stdout)[1:]
            for b in blocks:
                rows = [l for l in b.splitlines() if l.startswith('| ') and not l.startswith('| map ')]
                if len(rows) != len(folders): fails['C3'].append(f'table "{b.splitlines()[0][:40]}": {len(rows)} rows for {len(folders)} folders')
            if len(blocks) != 4: fails['C3'].append(f'{len(blocks)} tables, expected 4')
            st = json.load(open(sj))
            by = {os.path.dirname(os.path.dirname(os.path.abspath(x['file']))): x['summary'] for x in st}
            for s_ in summary:
                x = by.get(os.path.join(MAPS, s_['folder']))
                if x is None: fails['C3'].append(f"{s_['label']}: no paths_stats result"); continue
                bp = x['bends_per_street']
                s_.update({'streets': x['streets'], 'closedRoads': x['rings'], 'footprints': x['lots'], 'roofFaces': x['roofs'],
                           'streetsBends01': [bp.get('0', 0), bp.get('1', 0)], 'streetsBends2plus': bp.get('2', 0) + bp.get('3+', 0),
                           'junctionEnds': x['arrive_within'], 'allEnds': x['arrive_n'], 'arrivals85': x['arrive_right'],
                           'footprintRightCornerShare': round(x['lot_int_right'], 4)})
            if not a.stats_json: os.remove(sj)

    allpass = not any(fails.values())
    for k in sorted(fails):
        print(f"{k} {'PASS' if not fails[k] else 'FAIL'}" + ('' if not fails[k] else f" ({len(fails[k])}): " + '; '.join(fails[k][:6])))
    print(f'loads {len(starts)} / cap {a.cap}; plan entries {len(ents)}; folders {len(folders)}; build {build}')
    if a.summary:
        json.dump({'schema': 'research.w04-summary/1', 'build': build, 'checks': {k: (not v) for k, v in fails.items()},
                   'failures': fails, 'loads': len(starts), 'perLoad': summary}, open(a.summary, 'w'), indent=1)
    sys.exit(0 if allpass else 1)


if __name__ == '__main__':
    main()
