#!/usr/bin/env python3
"""Summarise a vertex record (gen-N.paths.json, from `node record.mjs … --passes draw --vertices`) of watabou's
Neighbourhood per colour class, as identified in research/findings/profile-neighbourhood.md §4:

  roads      stroke #a69e92 (the roads layer)          → polylines; split into ring roads (closed) and streets
  lots       stroke #222222 on the buildings canvas     → building footprint outlines (the lot after set-back)
  buildings  every other fill on the buildings canvas   → roof faces (the #222222 3-vertex fills are hatching)

The buildings canvas is the one with the most #222222 3-vertex fills (hatch triangles). All lengths are canvas pixels
(the record's coordinates); a stroke's pixel width is its raw lineWidth × √|det CTM|. Only the stdlib is used.

  python3 paths_stats.py <gen-N.paths.json | capture dir> …           text report per file
  python3 paths_stats.py … --md                                       markdown tables, one row per file
  python3 paths_stats.py … --json out.json                            every per-street / per-polygon number
Definitions: turn = deflection at an interior polyline vertex (0° straight, 90° right-angle turn); interior angle =
polygon corner angle (90° square corner, 180° collinear); a bend = a run of consecutive street vertices with
|turn| ≥ 1° (a filleted arc counts once), its angle the summed signed turn; bend position = arc-length fraction of the
bend's turn-weighted centre; arrival = acute angle between a street's end segment and the nearest other road segment,
for ends within ARRIVE_HW × the street's own pixel half-width of another road's centreline (farther ends are
"free", e.g. spurs at the hood edge; in all eight 2026-09-25 NG maps end distances fall in 1–5 px or beyond 10 px, never
between). Streets stop about one half-width of the crossed road short of its centreline, so `end offset / target half-width`
is reported too.
"""
import argparse, collections, glob, json, math, os, sys

ROAD, INK, STONE = '#a69e92', '#222222', '#bfbfbf'
BEND_MIN, ARRIVE_HW = 1.0, 3.0


def pts(v):
    return [(v[i], v[i + 1]) for i in range(0, len(v), 2)]


def clean(p):
    """drop consecutive duplicates; return (points, closed-by-repetition)"""
    out = [p[0]]
    for q in p[1:]:
        if math.dist(q, out[-1]) > 0.02:
            out.append(q)
    closed = len(out) > 3 and math.dist(out[0], out[-1]) <= 0.05
    return (out[:-1] if closed else out), closed


def turn(a, b, c):
    t = math.degrees(math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(b[1] - a[1], b[0] - a[0]))
    return (t + 180) % 360 - 180


def q(xs, p):
    if not xs:
        return float('nan')
    xs = sorted(xs)
    return xs[min(len(xs) - 1, max(0, round(p * (len(xs) - 1))))]


def hist(xs, edges):
    h = [0] * (len(edges) - 1)
    for x in xs:
        for i in range(len(edges) - 1):
            if edges[i] <= x < edges[i + 1] or (i == len(edges) - 2 and x == edges[-1]):
                h[i] += 1
                break
    return h


def spearman(a, b):
    if len(a) < 3:
        return float('nan')
    ra = {i: r for r, i in enumerate(sorted(range(len(a)), key=lambda i: a[i]))}
    rb = {i: r for r, i in enumerate(sorted(range(len(b)), key=lambda i: b[i]))}
    n = len(a); d2 = sum((ra[i] - rb[i]) ** 2 for i in range(n))
    return 1 - 6 * d2 / (n * (n * n - 1))


def seg_dist(p, a, b):
    ax, ay = b[0] - a[0], b[1] - a[1]; L2 = ax * ax + ay * ay
    t = 0 if L2 == 0 else max(0, min(1, ((p[0] - a[0]) * ax + (p[1] - a[1]) * ay) / L2))
    return math.dist(p, (a[0] + t * ax, a[1] + t * ay))


def acute(d1, d2):
    a = abs(math.degrees(math.atan2(d1[1], d1[0]) - math.atan2(d2[1], d2[0]))) % 180
    return min(a, 180 - a)


def load(fp):
    j = json.load(open(fp))
    P = j['paths']
    for r in P:
        if 'same' in r and 's' not in r:
            r['s'] = P[r['same']].get('s')
    return j, P


def analyse(fp):
    j, P = load(fp)
    hatch = collections.Counter(r['c'] for r in P if r['op'] == 'fill' and r['k'] == INK and r.get('nv') == 3)
    bc = hatch.most_common(1)[0][0] if hatch else None
    census = collections.Counter()
    streets, rings, lots, roofs = [], [], [], []
    for r in P:
        subs = [s for s in (r.get('s') or []) if len(s['v']) >= 4]          # ≥ 2 vertices (drops OpenFL's lone pen point)
        if r['op'] == 'stroke' and r['k'] == ROAD:
            census['road strokes'] += 1
            if not subs:
                census['road strokes, empty (terminators)'] += 1
            for s in subs:
                p, closed = clean(pts(s['v']))
                sc = math.sqrt(abs(r['m'][0] * r['m'][3] - r['m'][1] * r['m'][2]))
                (rings if (closed or s['z']) and len(p) >= 10 else streets).append(
                    {'n': r['n'], 'p': p, 'closed': closed or bool(s['z']), 'w': r['w'], 'wpx': r['w'] * sc})
        elif r['c'] == bc and r['op'] == 'stroke' and r['k'] == INK and r.get('w') == 1:
            census['outline strokes (w1, buildings canvas)'] += 1
            for s in subs:
                p, closed = clean(pts(s['v']))
                if (closed or s['z']) and len(p) >= 3:
                    lots.append({'n': r['n'], 'p': p})
                else:
                    census['outline open subpaths (not a footprint)'] += 1
        elif r['c'] == bc and r['op'] == 'fill' and r['k'] not in (INK, STONE):
            census['roof-face fills'] += 1
            for s in subs:
                p, closed = clean(pts(s['v']))
                if len(p) >= 3:
                    roofs.append({'n': r['n'], 'p': p})
        elif r['c'] == bc and r['op'] == 'fill' and r['k'] == INK:
            census['hatch fills (#222222)'] += 1
        else:
            census['other (shadows, greens, stone, trees, …)'] += 1
    roads_all = streets + rings
    # --- streets: turns, segments, bends, arrival angles, widths
    for st in streets:
        p = st['p']; seg = [math.dist(p[i], p[i + 1]) for i in range(len(p) - 1)]
        cum = [0.0]
        for s_ in seg:
            cum.append(cum[-1] + s_)
        L = cum[-1]; t = [turn(p[i - 1], p[i], p[i + 1]) for i in range(1, len(p) - 1)]
        bends, cur = [], None
        for i, ti in enumerate(t, start=1):
            if abs(ti) >= BEND_MIN:
                if cur is None:
                    cur = {'sum': 0.0, 'w': 0.0, 'ws': 0.0, 'nv': 0}
                cur['sum'] += ti; cur['w'] += abs(ti); cur['ws'] += abs(ti) * cum[i]; cur['nv'] += 1
            elif cur is not None:
                bends.append(cur); cur = None
        if cur is not None:
            bends.append(cur)
        st.update(seg=seg, L=L, turns=t, bends=[{'angle': b['sum'], 'pos': b['ws'] / b['w'] / L if L else float('nan'), 'nv': b['nv']} for b in bends])
        st['arrive'] = []
        for end, prev in ((p[0], p[1]), (p[-1], p[-2])):
            best = (1e9, None, None)
            for o in roads_all:
                if o is st:
                    continue
                op = o['p'] + ([o['p'][0]] if o['closed'] else [])
                for k in range(len(op) - 1):
                    d = seg_dist(end, op[k], op[k + 1])
                    if d < best[0]:
                        best = (d, (op[k + 1][0] - op[k][0], op[k + 1][1] - op[k][1]), o['wpx'])
            hit = best[1] is not None and best[0] <= ARRIVE_HW * st['wpx'] / 2
            st['arrive'].append({'d': best[0], 'angle': acute((end[0] - prev[0], end[1] - prev[1]), best[1]) if hit else None,
                                 'rel': best[0] / (best[2] / 2) if hit and best[2] else None})
    # --- polygons: interior angles, edges
    for pg in lots + roofs:
        p = pg['p']; n = len(p)
        area = sum(p[i][0] * p[(i + 1) % n][1] - p[(i + 1) % n][0] * p[i][1] for i in range(n)) / 2
        sgn = 1 if area >= 0 else -1
        pg['interior'] = [180 - sgn * turn(p[i - 1], p[i], p[(i + 1) % n]) for i in range(n)]
        pg['edges'] = [math.dist(p[i], p[(i + 1) % n]) for i in range(n)]
    return {'file': fp, 'census': dict(census), 'streets': streets, 'rings': rings, 'lots': lots, 'roofs': roofs}


TURN_EDGES = [0, 1, 5, 15, 30, 60, 90, 180.0001]
INT_EDGES = [0, 60, 85, 89, 91, 95, 120, 170, 179, 181, 190, 360]
fmt = lambda x, d=1: 'nan' if x != x else f'{x:.{d}f}'


def dist_str(xs, d=1):
    return f"n={len(xs)} p10 {fmt(q(xs, .1), d)} · p50 {fmt(q(xs, .5), d)} · p90 {fmt(q(xs, .9), d)} · max {fmt(max(xs) if xs else float('nan'), d)}"


def vcount(ps):
    c = collections.Counter(len(x['p']) for x in ps)
    return ' '.join(f'{k}:{v}' for k, v in sorted(c.items()))


def summary(A):
    S = A['streets']; turns = [abs(t) for s in S for t in s['turns']]; segs = [x for s in S for x in s['seg']]
    bends = [b for s in S for b in s['bends']]; nb = collections.Counter(min(len(s['bends']), 3) for s in S)
    arr = [a for s in S for a in s['arrive']]; arrived = [a['angle'] for a in arr if a['angle'] is not None]
    widths = [s['wpx'] for s in S]
    lot_int = [a for pg in A['lots'] for a in pg['interior']]; roof_int = [a for pg in A['roofs'] for a in pg['interior']]
    return {
        'streets': len(S), 'rings': len(A['rings']), 'street_vertices': vcount(S), 'ring_vertices': vcount(A['rings']),
        'turn_hist': hist(turns, TURN_EDGES), 'turn_dist': dist_str(turns), 'seg_dist': dist_str(segs),
        'bends_per_street': {('3+' if k == 3 else str(k)): v for k, v in sorted(nb.items())},
        'bend_angle': dist_str([abs(b['angle']) for b in bends]), 'bend_pos': dist_str([b['pos'] for b in bends], 2),
        'bend_pos_hist': hist([b['pos'] for b in bends], [0, .1, .3, .7, .9, 1.0001]),
        'bend_vertices': dict(sorted(collections.Counter(b['nv'] for b in bends).items())),
        'arrive_n': len(arr), 'arrive_within': len(arrived), 'arrive_dist': dist_str(arrived),
        'arrive_offset': dist_str([a['rel'] for a in arr if a['rel'] is not None], 2),
        'arrive_right': sum(1 for a in arrived if a >= 85), 'arrive_hist': hist(arrived, [0, 30, 60, 80, 85, 89, 90.0001]),
        'width_px': dist_str(widths, 2), 'width_model': dist_str([s['w'] for s in S], 3),
        'rho_width_length': spearman(widths, [s['L'] for s in S]), 'rho_width_order': spearman(widths, [s['n'] for s in S]),
        'ring_width_px': sorted({round(r['wpx'], 2) for r in A['rings']}),
        'lots': len(A['lots']), 'lot_vertices': vcount(A['lots']), 'lot_int_hist': hist(lot_int, INT_EDGES),
        'lot_int_right': sum(1 for a in lot_int if 89 <= a < 91) / max(1, len(lot_int)), 'lot_edges': dist_str([e for pg in A['lots'] for e in pg['edges']]),
        'roofs': len(A['roofs']), 'roof_vertices': vcount(A['roofs']), 'roof_int_hist': hist(roof_int, INT_EDGES),
        'roof_edges': dist_str([e for pg in A['roofs'] for e in pg['edges']]),
    }


def label(fp):
    d = os.path.dirname(os.path.dirname(os.path.abspath(fp)))
    try:
        m = json.load(open(os.path.join(d, 'meta.json')))
        g = os.path.basename(fp).split('.')[0]
        href = next(x['href'] for x in m['passes']['draw'] if x['name'] == g)
        from urllib.parse import urlparse, parse_qs
        qs = parse_qs(urlparse(href).query)
        return f"{qs.get('tags', ['?'])[0]} seed {qs.get('seed', ['?'])[0]}"
    except Exception:
        return os.path.basename(fp)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('inputs', nargs='+'); ap.add_argument('--md', action='store_true'); ap.add_argument('--json')
    a = ap.parse_args()
    files = []
    for x in a.inputs:
        files += sorted(glob.glob(os.path.join(x, '**', '*.paths.json'), recursive=True)) if os.path.isdir(x) else [x]
    res = []
    for fp in files:
        A = analyse(fp); A['summary'] = summary(A); A['label'] = label(fp); res.append(A)
    if a.json:
        json.dump([{k: v for k, v in A.items()} for A in res], open(a.json, 'w'), default=lambda o: None)
    if a.md:
        L = lambda A: f"{A['label']} (`{os.path.relpath(A['file'])}`)"
        th = ' | '.join(f'{TURN_EDGES[i]}–{TURN_EDGES[i + 1]:g}°' for i in range(len(TURN_EDGES) - 1)).replace('180.0001', '180')
        print('#### Roads — streets (ring roads separately)\n')
        print('| map | streets | vertices/street (n:count) | segment length px | turn at interior vertex |', th, '|')
        print('|---' * (5 + len(TURN_EDGES) - 1) + '|')
        for A in res:
            s = A['summary']
            print(f"| {L(A)} | {s['streets']} | {s['street_vertices']} | {s['seg_dist']} | {s['turn_dist']} | " + ' | '.join(map(str, s['turn_hist'])) + ' |')
        print('\n#### Streets — bends, arrival angles, widths\n')
        print('| map | bends per street (0/1/2/3+) | bend angle ° | bend position (0–1) | position hist <.1/.1–.3/.3–.7/.7–.9/>.9 | vertices per bend | junction ends / all ends | arrival angle ° | arrival ≥ 85° | end offset / target half-width | width px (street) | ρ(width, length) | ρ(width, draw order) | closed roads: n, width px, vertices |')
        print('|---' * 15 + '|')
        for A in res:
            s = A['summary']; b = s['bends_per_street']
            print(f"| {A['label']} | {b.get('0', 0)}/{b.get('1', 0)}/{b.get('2', 0)}/{b.get('3+', 0)} | {s['bend_angle']} | {s['bend_pos']} | {'/'.join(map(str, s['bend_pos_hist']))} | "
                  f"{' '.join(f'{k}:{v}' for k, v in s['bend_vertices'].items())} | {s['arrive_within']}/{s['arrive_n']} | {s['arrive_dist']} | {s['arrive_right']} | {s['arrive_offset']} | {s['width_px']} | "
                  f"{fmt(s['rho_width_length'], 2)} | {fmt(s['rho_width_order'], 2)} | {s['rings']}, {s['ring_width_px']}, {s['ring_vertices'] or '–'} |")
        ih = ' | '.join(f'{INT_EDGES[i]}–{INT_EDGES[i + 1]}' for i in range(len(INT_EDGES) - 1))
        for cls, key in (('Lots (building footprint outlines)', 'lot'), ('Buildings (roof faces)', 'roof')):
            print(f'\n#### {cls} — interior angles °\n')
            print(f'| map | polygons | distinct vertices (n:count) | edge length px |', ih, '|' + (' 89–91 share |' if key == 'lot' else ''))
            print('|---' * (4 + len(INT_EDGES) - 1 + (1 if key == 'lot' else 0)) + '|')
            for A in res:
                s = A['summary']
                print(f"| {A['label']} | {s[key + 's']} | {s[key + '_vertices']} | {s[key + '_edges']} | " + ' | '.join(map(str, s[key + '_int_hist'])) + ' |'
                      + (f" {s['lot_int_right']:.1%} |" if key == 'lot' else ''))
        return
    for A in res:
        s = A['summary']
        print(f"== {A['label']}  {A['file']}")
        print('census:', json.dumps(A['census']))
        for k, v in s.items():
            print(f'  {k}: {v}')


if __name__ == '__main__':
    main()
