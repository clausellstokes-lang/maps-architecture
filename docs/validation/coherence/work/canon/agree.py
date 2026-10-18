"""coherence/canon step 5: the agreement matrix — every pair of units that meet, every subject they share, the verdict.
Inputs: items_norm.json, subjects.json, findings_all.json, rulings_conflicts.py. Output work/canon/agree_raw.json."""
import json, re, collections, itertools
W = 'docs/validation/coherence/work/canon'
items = {r['id']: r for r in json.load(open(W + '/items_norm.json'))}
subjects = json.load(open(W + '/subjects.json'))
fs = json.load(open(W + '/findings_all.json'))
exec(open(W + '/rulings_conflicts.py').read())
UNITS = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + ['V%02d' % i for i in range(1, 13)]
NUM = re.compile(r'(-?\d+(?:[.,]\d+)?)\s*(%|cm|m²|m2|m|km|ha|pw|ms|s|px|°|weeks?|years?)?')

def values_near(stmt, tok):
    out = set()
    for m in re.finditer(re.escape(tok), stmt):
        seg = stmt[m.end(): m.end() + 48]
        seg = seg.split(';')[0].split(')')[0]
        mm = re.match(r"^[`'\"]?\s*(?:=|:|is|of|at|to|default|defaults to|\()?\s*(-?\d+(?:[.,]\d+)?)\s*(%|cm|m²|m2|m|km|ha|pw|ms|s|px|°)?", seg)
        if mm:
            out.add((mm.group(1).replace(',', ''), mm.group(2) or ''))
    return out

# conflict findings → the subjects (identifiers) and units they involve
conf_subj = collections.defaultdict(list)
for f in fs:
    if f['list'] in ('internal_conflicts', 'cross_part_conflicts', 'conflicts', 'cross_volume_conflicts', 'standing_rule_conflicts'):
        txt = json.dumps(f['raw'], ensure_ascii=False)
        its = [i for i in (f['items'] or []) if isinstance(i, str) and i in items]
        us = sorted(set(items[i]['unit'] for i in its) | set(R.get(f['fid'], {}).get('units', [])))
        body = ' '.join(str(f['raw'].get(k, '')) for k in ('claim', 'statement', 'statement_a', 'statement_b', 'what', 'other'))
        toks = set(re.findall(r'`([^`]{3,60})`', body)) | set(re.findall(r'\b([A-Z][a-z]+(?:[A-Z][a-z0-9]+)+)\b', body)) | set(re.findall(r'\b((?:T-V\d+-\d+|J-V\d+\.\d+|BCR-V\d+-\d+|DR\d+|F-[A-Z-]+|[EW]_[A-Z_]+))\b', body))
        for t in toks:
            if t in subjects and len(t) >= 4:
                conf_subj[t].append({'fid': f['fid'], 'units': us})

pairs = collections.defaultdict(list)
mismatch = []
for t, s in subjects.items():
    us = sorted(u for u in s['units'] if u in UNITS)
    if len(us) < 2:
        continue
    vals = {}
    for u in us:
        v = set()
        for i in s['units'][u][:40]:
            v |= values_near(items[i]['statement'], t)
        vals[u] = v
    for a, b in itertools.combinations(us, 2):
        verdict, ruling = 'agree', None
        cs = [c for c in conf_subj.get(t, []) if a in c['units'] and b in c['units']]
        if cs:
            verdict = 'disagree'
            ruling = [c['fid'] for c in cs]
        elif vals[a] and vals[b] and not (vals[a] & vals[b]):
            verdict = 'value-check'
            mismatch.append({'subject': t, 'a': a, 'b': b, 'va': sorted(vals[a]), 'vb': sorted(vals[b]),
                             'ia': s['units'][a][:3], 'ib': s['units'][b][:3]})
        pairs[(a, b)].append({'subject': t, 'home': s['home_unit'], 'how': s['how'], 'a_items': s['units'][a][:6],
                              'b_items': s['units'][b][:6], 'verdict': verdict, 'conflicts': ruling})
out = {'pairs': {f'{a}|{b}': v for (a, b), v in pairs.items()}, 'value_checks': mismatch}
json.dump(out, open(W + '/agree_raw.json', 'w'), ensure_ascii=False)
print('pairs that meet', len(pairs), 'shared subject rows', sum(len(v) for v in pairs.values()))
print('verdicts', collections.Counter(x['verdict'] for v in pairs.values() for x in v))
print('value checks', len(mismatch))
