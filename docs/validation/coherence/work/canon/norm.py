"""coherence/canon step 1: normalise the twelve inventories into one item table and one findings table.
Outputs (work/canon/): items_norm.json, findings_all.json. Deterministic; re-runnable."""
import json, re, glob, os, collections
D = 'docs/validation/coherence'
W = D + '/work/canon'
BASE_UNITS = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope']
VOLS = ['V%02d' % i for i in range(1, 13)]
UNITS = BASE_UNITS + VOLS

def sec_unit(sec):
    """map a base section reference to its base part"""
    if not sec:
        return None
    s = sec.strip().lstrip('§').strip()
    if re.match(r'^(II\b|II\.|PART II\b|PART III\b)', sec.strip()) or s.startswith('II.') or s.startswith('PART II') or s.startswith('PART III'):
        return 'pipeline'
    m = re.match(r'^(\d+)', s)
    if m:
        n = int(m.group(1))
        return {0: 'scope', 1: 'scope', 2: 'model', 3: 'kernel', 4: 'pipeline', 5: 'determinism', 6: 'determinism', 7: 'determinism',
                8: 'rendering', 9: 'rendering', 10: 'pipeline', 11: 'rendering', 12: 'rendering', 13: 'scope', 14: 'scope', 15: 'scope',
                16: 'scope', 17: 'scope'}.get(n)
    low = sec.lower()
    if any(w in low for w in ['judgment', 'delegated', 'staged by', 'appendix', 'summary', 'one-page', 'title', 'd-']):
        return 'scope'
    return None

SEC_RE = re.compile(r'(?:§\s?(\d+(?:\.\d+)*[a-z]?)|\b(II\.\d+(?:\.\d+)*)|\b(PART III)\b|\b(PART II)\b)')

def first_sec(text):
    if not text:
        return None
    m = SEC_RE.search(text)
    if not m:
        m2 = re.search(r'\bbase[- ](\d+(?:\.\d+)*)', text)
        if m2:
            return '§' + m2.group(1)
        return None
    if m.group(1):
        return '§' + m.group(1)
    return m.group(2) or m.group(3) or m.group(4)

def owner_to_unit(owner, item_unit):
    """returns (unit, home_section or None, note)"""
    if owner is None:
        return item_unit, None, 'no owner'
    o = str(owner).strip()
    ol = o.lower()
    # volumes
    m = re.match(r'^(?:volume:)?\s*(V\d\d)\b', o)
    if m:
        return m.group(1), first_sec(o[m.end():]), ''
    for u in BASE_UNITS:
        if ol.startswith(u) or ol.startswith('base:' + u):
            return u, first_sec(o), ''
    if ol.startswith('owner') or ol.startswith('file g'):
        return 'owner', None, o
    if ol.startswith('validation-record'):
        return 'history', None, o
    if ol.startswith('base') or ol.startswith('§') or ol.startswith('ii.') or ol.startswith('part'):
        s = first_sec(o)
        u = sec_unit(s) if s else None
        if u:
            return u, s, ''
        return 'base?', None, o
    if ol.startswith('module') or ol.startswith('other') or ol.startswith('integrator'):
        return item_unit, None, o
    m = re.search(r'\b(V\d\d)\b', o)
    if m:
        return m.group(1), None, o
    return item_unit, None, o

ID_RE = re.compile(r"\b(T-V\d+-\d+[a-z]?|T\d+[a-z]?-\d+[a-z]?|T-[A-Z][A-Za-z0-9]*-?\d*|J-V[IS]?\d*[.\-]\d+|J-VI\.\d+|J-A\d+\.\d+|J-[A-Z][A-Za-z0-9]*\.?\d+(?:\.\d+)?|J\d{2,3}|D-\d+|BCR-V\d+-\d+|DR\d+|DR-V\d\.\d|DR-SKY|F-[A-Z][A-Z-]+|[EW]_[A-Z_]{3,}|X-V1[12]-\d+|XV-V9-\d+|CVR-V10-\d+|IN-V\d\d-\d+)\b")
BT_RE = re.compile(r'`([^`]{2,80})`')

def idents(text):
    out = set()
    if not text:
        return out
    for m in ID_RE.finditer(text):
        out.add(m.group(1))
    for m in BT_RE.finditer(text):
        t = m.group(1).strip()
        # keep identifier-like tokens only
        mm = re.match(r"^([A-Za-z_@][A-Za-z0-9_.@/<>:\-]*)", t)
        if mm and len(mm.group(1)) >= 3:
            out.add(mm.group(1).rstrip('.:'))
    for m in re.finditer(r'\b([A-Z][a-z]+(?:[A-Z][a-z0-9]+)+)\b', text):  # CamelCase types
        out.add(m.group(1))
    return out

NARR_KINDS = {'narration', 'history', 'evidence', 'status', 'marker'}

def norm_items():
    rows = []
    def add(unit, it, sec, owner, home_hint=None, extra=None):
        ou, hs, note = owner_to_unit(owner, unit)
        if ou == 'base?' and home_hint:
            s = first_sec(home_hint)
            if s and sec_unit(s):
                ou, hs = sec_unit(s), s
        st0 = it.get('statement', '') or ''
        if ou == 'base?':
            s0 = first_sec(str(owner)) or first_sec(st0)
            if s0 and sec_unit(s0):
                ou, hs = sec_unit(s0), s0
        if hs is None and ou == unit:
            hs = sec
        if hs is None and home_hint:
            hs = first_sec(home_hint) or home_hint[:40]
        st = it.get('statement', '')
        r = {'id': it['id'], 'unit': unit, 'kind': it.get('kind'), 'sec': sec, 'statement': st,
             'owner_raw': owner, 'owner_unit': ou, 'home_sec': hs, 'owner_note': note,
             'idents': sorted(idents(st) | set(it.get('keys') or []) | set([it.get('key')] if it.get('key') else []))}
        if extra:
            r.update(extra)
        rows.append(r)
    for f in sorted(glob.glob(D + '/inventory-*.json')):
        d = json.load(open(f))
        name = os.path.basename(f)
        if name == 'inventory-determinism.json':
            for it in d['items']:
                add('determinism', it, it.get('sub'), it.get('owner'))
        elif name == 'inventory-kernel.json':
            for it in d['items']:
                own = it.get('owner')
                add('kernel', it, '§' + str(it.get('sub')) if it.get('sub') and not str(it.get('sub')).startswith('§') else it.get('sub'), own,
                    extra={'restates_note': it.get('restates')})
        elif name == 'inventory-model.json':
            for it in d['items']:
                sec = first_sec(' '.join(it.get('where') or [])) or '§2'
                own = it.get('owner_unit')
                add('model', it, sec, own + (' ' + str(it.get('owner')) if own != 'model' else ''),
                    extra={'form': it.get('form'), 'restatement_flag': it.get('restatement')})
        elif name == 'inventory-pipeline.json':
            for it in d['items']:
                sec = first_sec(' '.join(it.get('stated_in') or []))
                own = it.get('subject_owner')
                add('pipeline', it, sec, own, extra={'restated_in_unit': it.get('restated_in_unit'),
                                                      'decision_ids': it.get('decision_and_provenance_ids')})
        elif name == 'inventory-rendering.json':
            for it in d['items']:
                add('rendering', it, it.get('sub'), it.get('owner'), extra={'restates_note': it.get('restates')})
        elif name == 'inventory-scope.json':
            for it in d['items']:
                sec = it.get('section')
                if sec and not sec.startswith('§') and re.match(r'^\d', sec):
                    sec = '§' + sec
                own = it.get('owner')
                add('scope', it, sec, own, home_hint=it.get('home'),
                    extra={'home_raw': it.get('home'), 'stated_also_at': it.get('stated_also_at'), 'notes': it.get('notes')})
        else:
            for it in d['items']:
                unit = it['id'][:3]
                sec = str(it.get('sec', ''))
                add(unit, it, unit + ' §' + sec if sec else unit, it.get('owner'))
    # classify action
    for r in rows:
        k = (r['kind'] or '').lower()
        ou = r['owner_unit']
        if k in NARR_KINDS or ou == 'history':
            r['action'] = 'history-out'
        elif k in ('term', 'defined-term'):
            r['action'] = 'glossary'
        elif k == 'bcr':
            r['action'] = 'bcr-pointer'
        elif k in ('question', 'owner-question'):
            r['action'] = 'answer-J121-J122'
        elif k in ('handoff', 'xreq', 'xv-request', 'cvr', 'fix-list'):
            r['action'] = 'handoff'
        elif k == 'restatement':
            r['action'] = 'reference'
        elif r['unit'] == 'scope' and k == 'decision':
            r['action'] = 'index-row'
        elif r['unit'] == 'scope' and k in ('mapping', 'test', 'acceptance-bar', 'milestone', 'budget'):
            r['action'] = 'state'
        elif r['unit'] in VOLS and k in ('hook', 'wiring', 'summary', 'scope', 'scope-out', 'trace', 'plan', 'hooktable', 'hooks', 'dossier', 'dossier-fact') and ou != r['unit']:
            r['action'] = 'index-row'
        elif ou == 'owner':
            r['action'] = 'reference-owner-rule'
        elif ou == r['unit']:
            r['action'] = 'state'
        elif ou in UNITS or ou == 'base?':
            r['action'] = 'reference'
        else:
            r['action'] = 'state'
            r['owner_note'] = (r.get('owner_note') or '') + ' [owner unresolved; stated here]'
        # the model inventory's explicit restatement flag, the pipeline's restated_in_unit: in-unit duplicates
        if r.get('restatement_flag') and r['action'] == 'state':
            r['action'] = 'state'
    return rows

def norm_findings():
    out = []
    def put(unit, lst_name, f, i):
        if isinstance(f, str):
            f = {'claim': f}
        fid = f.get('id') or ('%s-%s-%03d' % (unit.upper(), lst_name.upper().replace('_', ''), i + 1))
        text = f.get('claim') or f.get('statement') or f.get('what') or f.get('finding') or f.get('fact') or f.get('edge') or f.get('defect') or f.get('observation') or f.get('candidate') or f.get('topic') or f.get('text') or f.get('problem') or f.get('concept') or f.get('status') or json.dumps(f, ensure_ascii=False)[:600]
        out.append({'fid': fid, 'unit_inv': unit, 'list': lst_name, 'severity': f.get('severity') or f.get('sev'),
                    'items': f.get('items') or ([f['item']] if f.get('item') else []), 'where': f.get('where') or f.get('at'),
                    'text': text, 'raw': f})
    lists = ['restatements', 'restatement_clusters', 'restatement_findings', 'internal_duplications', 'internal_conflicts',
             'cross_part_conflicts', 'cross_volume_conflicts', 'conflicts', 'standing_rule_conflicts', 'elegance_candidates',
             'edges_observed', 'edge_gaps', 'undefined_edges', 'wiring_gaps', 'wiring_findings', 'wiring_observations',
             'missing_parts', 'terminology', 'term_defects', 'deferral_wording', 'narration', 'broken_references',
             'broken_reference_findings', 'handoffs_to_canon', 'equivalences', 'id_hygiene', 'cohesion_observations',
             'ambiguous_text']
    for f in sorted(glob.glob(D + '/inventory-*.json')):
        d = json.load(open(f))
        unit = os.path.basename(f)[len('inventory-'):-len('.json')]
        for ln in lists:
            v = d.get(ln)
            if isinstance(v, dict):
                continue
            if ln == 'broken_references' and d.get('broken_reference_findings'):
                for i, x in enumerate(v or []):
                    if isinstance(x, dict) and x.get('id'):
                        x = dict(x); x['id'] = x['id'] + '.r%02d' % (i + 1)
                    put(unit, ln, x, i)
                continue
            for i, x in enumerate(v or []):
                put(unit, ln, x, i)
    return out

if __name__ == '__main__':
    items = norm_items()
    json.dump(items, open(W + '/items_norm.json', 'w'), ensure_ascii=False, indent=0)
    fs = norm_findings()
    json.dump(fs, open(W + '/findings_all.json', 'w'), ensure_ascii=False, indent=0)
    c = collections.Counter((r['unit'], r['action']) for r in items)
    print(len(items), 'items;', len(fs), 'findings')
    for u in UNITS:
        print(u, {a: c[(u, a)] for a in ['state', 'reference', 'reference-owner-rule', 'bcr-pointer', 'glossary', 'history-out', 'handoff', 'answer-J121-J122'] if c[(u, a)]})
    print(collections.Counter(r['owner_unit'] for r in items))
    print(collections.Counter(f['list'] for f in fs))
    ids = collections.Counter(f['fid'] for f in fs)
    print('dup finding ids', [k for k, v in ids.items() if v > 1][:30])
