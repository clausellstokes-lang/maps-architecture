"""coherence/canon step 2: link every inventory item to its canonical fact; build the shared-subject index.
Inputs: work/canon/items_norm.json, findings_all.json. Outputs: work/canon/facts.json, byinv.json, subjects.json."""
import json, re, collections
W = 'docs/validation/coherence/work/canon'
items = json.load(open(W + '/items_norm.json'))
fs = json.load(open(W + '/findings_all.json'))
BASE = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope']
VOLS = ['V%02d' % i for i in range(1, 13)]
UNITS = BASE + VOLS
by_id = {r['id']: r for r in items}
STOP = set('the a an of and or to in on at by for with from is are be as its it this that each every one no not any their his her which who whose when where than then into over under per via only also both same own'.split())

def words(t):
    return set(w for w in re.findall(r'[a-z][a-z0-9_]{2,}', (t or '').lower()) if w not in STOP)

def secnorm(s):
    if not s:
        return ''
    s = str(s)
    m = re.search(r'(§\s?\d+(?:\.\d+)*|II\.\d+(?:\.\d+)*|PART III|PART II)', s)
    return m.group(1).replace(' ', '') if m else s

W_CACHE = {r['id']: words(r['statement']) for r in items}
# candidate pools: state items per unit
pool = collections.defaultdict(list)
for r in items:
    if r['action'] in ('state',):
        pool[r['unit']].append(r)

def best_match(r):
    u = r['owner_unit']
    if u not in pool:
        return None, 0.0
    hs = secnorm(r.get('home_sec'))
    cands = pool[u]
    if hs and u in BASE:
        c2 = [c for c in cands if secnorm(c.get('home_sec') or c.get('sec')).startswith(hs) or hs.startswith(secnorm(c.get('home_sec') or c.get('sec')) or '#')]
        if c2:
            cands = c2 + [c for c in pool[u] if c not in c2]
    wi = W_CACHE[r['id']]
    ii = set(r['idents'])
    best, bs = None, 0.0
    for c in cands:
        wc = W_CACHE[c['id']]
        if not wc:
            continue
        j = len(wi & wc) / max(1, len(wi | wc))
        io = len(ii & set(c['idents']))
        s = j * 10 + min(io, 4) * 1.5
        if s > bs:
            best, bs = c, s
    return best, bs

byinv = {}
facts = {}
for r in items:
    if r['action'] in ('state', 'index-row'):
        facts[r['id']] = {'id': r['id'], 'unit': r['unit'], 'kind': r['kind'], 'home': (r['unit'], r.get('home_sec') or r.get('sec')),
                          'statement': r['statement'], 'stated_at': [], 'idents': r['idents']}
        byinv[r['id']] = {'fact': r['id'], 'role': 'home' if r['action'] == 'state' else 'index-row', 'unit': r['unit'],
                          'home_unit': r['unit'], 'home_sec': r.get('home_sec') or r.get('sec')}
for r in items:
    if r['id'] in byinv:
        continue
    a = r['action']
    ent = {'unit': r['unit'], 'role': a, 'home_unit': r['owner_unit'], 'home_sec': r.get('home_sec')}
    if a in ('reference',):
        b, s = best_match(r)
        if b is not None and s >= 3.0:
            ent['fact'] = b['id']
            ent['match_score'] = round(s, 2)
            ent['home_sec'] = ent['home_sec'] or b.get('home_sec') or b.get('sec')
            facts[b['id']]['stated_at'].append({'inv': r['id'], 'unit': r['unit'], 'sec': r['sec']})
        elif b is not None and s >= 1.5:
            ent['fact'] = None
            ent['near_fact'] = b['id']
            ent['match_score'] = round(s, 2)
            if not ent['home_sec']:
                ent['home_sec'] = (b.get('home_sec') or b.get('sec'))
                ent['home_sec_from'] = 'nearest statement in the owning unit'
            facts[b['id']]['stated_at'].append({'inv': r['id'], 'unit': r['unit'], 'sec': r['sec'], 'near': True})
        else:
            ent['fact'] = None
            ent['match_score'] = round(s, 2)
    byinv[r['id']] = ent

# internal duplications from the inventories: second and later items point at the first
dup_links = 0
for f in fs:
    if f['list'] in ('internal_duplications', 'restatement_clusters') and f['items']:
        its = [i for i in f['items'] if isinstance(i, str) and i in by_id]
        if len(its) >= 2:
            first = its[0]
            if first in facts:
                for o in its[1:]:
                    if o in facts and o != first:
                        facts[first]['stated_at'].append({'inv': o, 'unit': by_id[o]['unit'], 'sec': by_id[o]['sec'], 'via': f['fid']})
                        byinv[o]['dup_of'] = first
                        dup_links += 1

# shared-subject index
DEF_KINDS = {'record', 'type', 'interface', 'table', 'field', 'constant', 'number', 'test', 'decision', 'failure-class', 'edit-kind',
             'term', 'defined-term', 'error-code', 'warning-code', 'table-def', 'event-form', 'tool', 'key-family', 'hooktable', 'lifecycle',
             'mechanism', 'algorithm', 'rule', 'bar', 'acceptance-bar', 'budget'}
def id_owner(tok):
    m = re.match(r'^T-V(\d+)-', tok)
    if m: return 'V%02d' % int(m.group(1))
    m = re.match(r'^J-V(\d+)\.', tok)
    if m: return 'V%02d' % int(m.group(1))
    m = re.match(r'^BCR-V(\d+)-', tok)
    if m: return 'V%02d' % int(m.group(1))
    m = re.match(r'^(?:X-V|XV-V|CVR-V|IN-V)(\d+)', tok)
    if m: return 'V%02d' % int(m.group(1))
    if re.match(r'^J-A\d', tok) or re.match(r'^D-\d', tok) or re.match(r'^T\d+[a-z]?-\d', tok): return 'scope'
    if re.match(r'^DR\d+$', tok) or re.match(r'^F-[A-Z]', tok): return 'determinism'
    return None
mentions = collections.defaultdict(lambda: collections.defaultdict(list))
for r in items:
    for t in r['idents']:
        if len(t) < 3 or t.isdigit():
            continue
        mentions[t][r['unit']].append(r['id'])
subjects = {}
for t, per in mentions.items():
    if len(per) < 2:
        continue
    owner = id_owner(t)
    defs = []
    if owner is None:
        pat = re.compile(r'(?:\b(?:interface|type|record|enum)\s+`?' + re.escape(t) + r'\b|^`?' + re.escape(t) + r'`?\s*(?:[{:=(]|—|-|is\b|gains\b))')
        for u, ids in per.items():
            for i in ids:
                r = by_id[i]
                if r['action'] == 'state' and ((r['kind'] or '') in DEF_KINDS) and pat.search(r['statement'] or ''):
                    defs.append(u)
                    break
        c = collections.Counter(defs)
        owner = c.most_common(1)[0][0] if c else None
        if owner is None:
            # the unit whose state items mention it most, preferring base parts for shared mechanisms
            c2 = collections.Counter({u: sum(1 for i in ids if by_id[i]['action'] == 'state') for u, ids in per.items()})
            owner = c2.most_common(1)[0][0] if c2 else None
            how = 'most-stated'
        else:
            how = 'defined' if len(set(defs)) == 1 else 'defined-in-several:' + ','.join(sorted(set(defs)))
    else:
        how = 'id-prefix'
    subjects[t] = {'units': {u: ids for u, ids in per.items()}, 'home_unit': owner, 'how': how}

json.dump(list(facts.values()), open(W + '/facts.json', 'w'), ensure_ascii=False, indent=0)
json.dump(byinv, open(W + '/byinv.json', 'w'), ensure_ascii=False, indent=0)
json.dump(subjects, open(W + '/subjects.json', 'w'), ensure_ascii=False)
ms = sum(1 for f in facts.values() if f['stated_at'])
xs = sum(1 for f in facts.values() if any(p['unit'] != f['unit'] for p in f['stated_at']))
unl = sum(1 for k, v in byinv.items() if v['role'] == 'reference' and not v.get('fact'))
print('facts', len(facts), 'multi-stated', ms, 'cross-unit', xs, 'dup links', dup_links, 'references unlinked', unl,
      'linked', sum(1 for v in byinv.values() if v['role'] == 'reference' and v.get('fact')))
print('subjects', len(subjects), collections.Counter(v['how'].split(':')[0] for v in subjects.values()))
multi_def = [t for t, v in subjects.items() if v['how'].startswith('defined-in-several')]
print('defined in several units', len(multi_def), multi_def[:40])
