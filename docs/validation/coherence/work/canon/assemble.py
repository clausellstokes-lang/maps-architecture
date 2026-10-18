"""coherence/canon step 9: assemble canon.json, agreement.json, edges.json (the markdown is rendered by render.py).
Deterministic over the work files; re-run after any ruling edit."""
import json, re, collections
W = 'docs/validation/coherence/work/canon'
D = 'docs/validation/coherence'
L = lambda n: json.load(open(W + '/' + n))
items = {r['id']: r for r in L('items_norm.json')}
byinv = L('byinv.json')
facts = L('facts.json')
fs = L('findings_all.json')
fitems = L('f_items.json')
gloss = L('glossary.json')
agree = L('agree_raw.json')
hands = L('handoffs.json')
edges = L('edges_raw.json')
combos = L('combos.json')
ids = L('ids.json')
wiring = json.load(open(D + '/wiring.json'))
exec(open(W + '/rulings_conflicts.py').read())
exec(open(W + '/rulings_other.py').read())
exec(open(W + '/manual.py').read())
BASE = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope']
VOLS = ['V%02d' % i for i in range(1, 13)]
WORDS = {'model': 42526, 'kernel': 23820, 'pipeline': 85919, 'determinism': 63117, 'rendering': 59158, 'scope': 98458,
         'V01': 93140, 'V02': 103630, 'V03': 82788, 'V04': 83966, 'V05': 81161, 'V06': 106357, 'V07': 104422, 'V08': 84356,
         'V09': 111610, 'V10': 84658, 'V11': 106185, 'V12': 76414}
NARR = {'V01': 12883, 'V02': 12697, 'V03': 12761, 'V04': 11812, 'V05': 8970, 'V06': 12767, 'V07': 14533, 'V08': 12989,
        'V09': 14114, 'V10': 13054, 'V11': 12624, 'V12': 8203}

def sec_unit(sec):
    s = (sec or '').strip()
    if s.startswith('§'):
        s = s[1:].strip()
    if s.startswith('II') or s.startswith('PART III'):
        return 'pipeline'
    if s.startswith('Staged'):
        return 'scope'
    m = re.match(r'^(\d+)', s)
    if not m:
        return 'scope'
    n = int(m.group(1))
    return {1: 'scope', 2: 'model', 3: 'kernel', 4: 'pipeline', 5: 'determinism', 6: 'determinism', 7: 'determinism', 8: 'rendering',
            9: 'rendering', 10: 'pipeline', 11: 'rendering', 12: 'rendering'}.get(n, 'scope')

# ---------------- f routing ----------------
f_route = []
bcr_to_f = {}
for it in fitems:
    prim = sec_unit(it['sec'])
    also = []
    for a in it['also_touches']:
        a = a.strip()
        if not a:
            continue
        u = sec_unit(a) if (a.startswith('§') or a.startswith('II') or a.startswith('PART')) else ('scope' if 'Judgment' in a else None)
        if u and u != prim and u not in also:
            also.append(u)
    # the consolidated items name further sections inside their text
    for m in re.finditer(r'(?:§\s?(\d+(?:\.\d+)*)|\b(II\.\d+(?:\.\d+)*)|\b(PART III)\b)', it['text']):
        s = '§' + m.group(1) if m.group(1) else (m.group(2) or m.group(3))
        u = sec_unit(s)
        if u != prim and u not in also and it['consolidated']:
            also.append(u)
    lead = it['text'][:70]
    rqs = re.search(r'\*Requests:\*\s*([^*]*)', it['text'])
    carried = set(re.findall(r'(?:BCR-V\d+-\d+|V0[14] BCR-\d+)', lead + ' ' + (rqs.group(1) if rqs else '')))
    it['carries'] = sorted(carried)
    for rq in it['carries']:
        bcr_to_f[rq] = it['item']
    f_route.append({'item': it['item'], 'section': it['section_heading'], 'unit': prim, 'also': also, 'scope': it['scope'],
                    'requests': it['carries'], 'mentions': [r for r in it['requests'] if r not in it['carries']], 'needed_by': it['needed_by'], 'consolidated': it['consolidated'],
                    'revised_in': it['revised_in'], 'line': it['line']})
F_CONFLICTS = [
 {'items': [413], 'ruling': "J-VI.19 (applied in the item): showUnexcavated is a view key; V04 BCR-10's LayerSpec field dropped.", 'basis': 'J-VI.19'},
 {'items': [425], 'ruling': "J-VI.20 (applied): no fallbackClass.", 'basis': 'J-VI.20'},
 {'items': [447, 448], 'ruling': "V01-XCONF-2: applied together — BCR-V9-31 (c)'s retaining clause takes V01 BCR-40's threshold (150 cm, broken over stairs and ramps); supports join as cliffs.", 'basis': 'the specific rule qualifies the general'},
 {'items': [452], 'ruling': "V04-ICONF-3: applied with BCR-16's text corrected to V04 §5.5 (portals only in wall lines).", 'basis': 'the export home'},
 {'items': [277], 'ruling': "V09-XCONF-1: applied with BCR-V9-3's text corrected (the underground's band is the view key depthBand).", 'basis': "V09 §2.4's type; J-VI.19"},
 {'items': [343], 'ruling': "V06-ICONF-3: BCR-V6-9's advance field gains stoppedAt?.", 'basis': 'V06 §2.3, §2.12'},
 {'items': [244], 'ruling': "V07-XCONF-2 / J-C4: the span rule's step (2) gains the hinterland-face condition (reason `country`); SCC-114: the support step's cell names are V11's (raisedWays.structure.slideMaxFactor; retaining.settings.stateSnapCm in item 245).", 'basis': 'realism tiebreaker; V11 owns values (R-c)'},
 {'items': [202, 317, 322], 'ruling': "SCOPE-C01: item 202 governs the small-dossier refusal (only while no village product is registered), consistent with the owner's J80; items 322 and 317 apply in the order the notes give.", 'basis': 'f item > base restatement; J80 intact'},
 {'items': [474, 524, 532, 568], 'ruling': "No request's total is applied; §16's two totals are computed once by item 568 (J-RF1.6), placing the staged rows in J122's order (SCOPE-C04).", 'basis': 'J122; item 568'},
 {'items': [582], 'ruling': "Owner item 101 R2 (via J-VI.30): the three base refusals become bends; F-EDIT keeps only a dossier fact's conflict. Consistent with the owner rule.", 'basis': 'owner item 101 R2'},
]
# every f item checked against the owner's rules: none contradicts one (J-VI.4's rule R-a is applied inside the items)
F_NOT_ITEMS = [
 {'request': 'BCR-V9-4', 'volume': 'V09', 'ruling': 'withdrawn by V09 (J-V9.36): the block is removed from V09 §10'},
 {'request': 'BCR-V9-6', 'volume': 'V09', 'ruling': 'withdrawn by V09 (J-V9.33): the block is removed from V09 §10'},
 {'request': 'BCR-V5-23', 'volume': 'V05', 'ruling': "a request to V06 (EpochOps.demandTaken), carried by V06 (X10): V05 cites V06 §2.1 and drops the block"},
 {'request': 'BCR-V5-28', 'volume': 'V05', 'ruling': "a request to V06 (the participant table), carried by V06's participants table: V05 cites it and drops the block"},
 {'request': 'BCR-V11-9', 'volume': 'V11', 'ruling': "a request to V08 (kinds pseudo-classes, goodWords), carried by V08 (X-V11-1): V11 cites V08 §2.6 and drops the block"},
 {'request': 'V04 BCR-34', 'volume': 'V04', 'ruling': "carried in BCR-V4-14's DR17 cell: the block becomes a pointer to file f item 386"},
 {'request': 'V04 BCR-44', 'volume': 'V04', 'ruling': "carried in BCR-V4-3's Tunnel line: the block becomes a pointer to file f item 247"},
]
F_OWNER_CHECK = "Every f item was read whole (docs/AMENDMENTS-2026-09-28f.md, items 200–585 with the notes of reconciliation rounds 1–6 and the finalization). None contradicts an owner rule: rule R-a (item 101 R2 over every 'refused', J-VI.4) and J-VI.30 are already applied inside the items; the conflicts between f items and volume text are ruled above; J122's order changes no item's content and places the staged rows (item 568)."

# ---------------- g routing ----------------
g_route = []
for n, parts in sorted(G_BASE.items()):
    g_route.append({'item': n, 'class': 'as an f item (the volumes carry their parts, integrated)', 'parts': parts})
for n, parts in sorted(G_PARTS.items()):
    g_route.append({'item': n, 'class': 'new design at build depth in every named unit; F-MISSING if absent', 'parts': parts})

# ---------------- wiring gaps ----------------
W_EXTRA = {'W-EDIT-01': ['determinism', 'V09', 'V10'], 'DWG-03': ['determinism', 'V11'], 'KWG-06': ['kernel', 'V11'],
           'W-FLD-04': ['model'], 'KWG-09': ['kernel', 'model'], 'W-DOS-09': ['determinism', 'V06', 'V08'], 'W-PKG-01': ['V10', 'scope'],
           'V05-WGAP-2a': ['V09', 'V05'], 'V05-WGAP-2b': ['V10', 'V05'], 'V06-WGAP-1a': ['V09', 'V06'], 'V06-WGAP-1b': ['V10', 'V06'],
           'W-DOS-01a': ['determinism', 'V08'], 'W-DOS-01b': ['V08', 'determinism'], 'W-DOS-02': ['V08', 'V06', 'determinism'],
           'W-IF-01': ['V04', 'V10'], 'W-IF-02': ['V07', 'V10'], 'W-IF-03': ['V10', 'V01'], 'W-IF-04': ['V09', 'V12'], 'W-IF-05': ['V10', 'V12'],
           'W-HOOK-02': ['model', 'V02', 'V03', 'V04', 'V05', 'V08'], 'W-HOOK-01': ['scope'], 'RWG-07': ['pipeline', 'rendering']}
W_RULING = {'KWG-09': "REMOVE with ruling E-15 (the 16-bit binary angle has no consumer; centidegrees is the one angle unit).",
            'W-FLD-04': "CLOSED by MC-08 (rosterAssignment's producer S10b and readers named).",
            'W-EDIT-01': "CLOSED by DXC-04 / E-04 (one binding table at §7.1).",
            'DWG-03': "CLOSED by W-SET-01 (the base settings row).", 'KWG-06': "CLOSED by W-SET-01.",
            'W-DOS-09': "CLOSED by g item 113's §7.7 part (the history derivation rows DR36 onward, ID-DR)."}
wiring_route = []
for d in wiring['defects']:
    units = W_EXTRA.get(d['id'], [d['unit']])
    if d['unit'] not in units:
        units = [d['unit']] + units
    wiring_route.append({'id': d['id'], 'class': d['cls'], 'severity': d['sev'], 'units': units, 'piece': d['piece'],
                         'link': d['link'], 'ruling': W_RULING.get(d['id'], 'WIRE: write the named link at its home (the link column), both ends')})
wiring_route.append({'id': 'W-SET-01', 'class': 'dangling', 'severity': 'minor', 'units': ['V11', 'determinism', 'pipeline', 'kernel'],
                     'piece': 'values the base calls table values with no table row: reroll.maxAdvance (3, §5.1 (6)), crossing.searchBandM (120 m, §4.2 S1 (5), §6.3), the dynamic grid cell sizes (§3.3; KWG-06)',
                     'link': "V11 §3.1 registers one base settings row holding the three cells with their values and readers (§5.1, §4.2 S1, §6.3, §3.3); the base cites the cells by name and states no value (DXC-05, S2)", 'ruling': 'canon (DXC-05)'})

# ---------------- conflicts ----------------
conflicts = []
for f in fs:
    if f['list'] in ('internal_conflicts', 'cross_part_conflicts', 'conflicts', 'cross_volume_conflicts', 'standing_rule_conflicts'):
        raw = f['raw']
        st = []
        for k in ('claim', 'statement', 'what', 'statement_a', 'statement_b', 'other'):
            if raw.get(k):
                st.append(f"{k}: {raw[k]}")
        conflicts.append({'id': f['fid'], 'inventory': f['unit_inv'], 'kind': f['list'], 'severity': f.get('severity') or raw.get('verdict'),
                          'where': raw.get('where') or raw.get('at'), 'items': f['items'], 'statements': st,
                          'proposed': raw.get('required') or raw.get('ruling_hint') or raw.get('hint') or raw.get('resolution') or raw.get('notes'),
                          **R[f['fid']]})
# the canon's own conflicts (J122 and the build plan, beyond the inventories)
CANON_CONF = [
 {'id': 'CANON-C01', 'statements': ["INDEX §3/§4 and V07 §8: the village V-M0–V-M1 start after M2b and M3a's tools.", "J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): the village right after M4, parallel with M5; the tracker spike V-M0 right after M0."],
  'verdict': 'FIX', 'ruling': "J122 governs: V-M0 right after M0 (on M0's kernel, tables and its own fixtures); V-M1…V-M4 after M4, parallel with M5; INDEX §3/§4, §16 and V07 §8 carry it (V07-XCONF-1).", 'basis': 'owner delegation J122 > INDEX and volume', 'units': ['scope', 'V07']},
 {'id': 'CANON-C02', 'statements': ["V06 §13: epochs on a lone neighbourhood document 'deliberately deferred … the gate lifting when a later amendment gives a hood document an S4–S5 route'.", "Principle (6) and the owner's no-defer rule."],
  'verdict': 'FIX', 'ruling': "Stated as a decided rule: a standalone neighbourhood document has no clock; advancing time on it bends to 'a neighbourhood alone has no history yet — open it in its town to advance time' (V09 message row and V10 bend row, V06-WGAP-1a/1b); T-V6-23 tests the bend. No deferral wording.", 'basis': 'principle (6); item 101 R2', 'units': ['V06', 'V09', 'V10']},
 {'id': 'CANON-C03', 'statements': ["INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.", "J121/J122 answered every one."],
  'verdict': 'FIX', 'ruling': "INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.", 'basis': 'J121, J122', 'units': ['scope'] + VOLS},
 {'id': 'CANON-C04', 'statements': ["INDEX §7: 'The fix list — deliberately left for the next amendment'.", "The owner's no-defer rule; THE BAR IS ZERO."],
  'verdict': 'FIX', 'ruling': "Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.", 'basis': 'owner no-defer rule', 'units': ['scope', 'V01', 'V04', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']},
]
for c in CANON_CONF:
    c.update({'inventory': 'canon', 'kind': 'canon', 'severity': 'major', 'where': None, 'items': [], 'proposed': None})
    conflicts.append(c)

# ---------------- open findings routing ----------------
def finding_units(f):
    fid = f['fid']
    m = re.match(r'^(V\d\d)-', fid)
    if m:
        return [m.group(1)]
    us = []
    for i in f['items'] or []:
        if isinstance(i, str) and i in items and items[i]['unit'] not in us:
            us.append(items[i]['unit'])
    if us:
        return us
    base = f['unit_inv']
    if base in BASE:
        return [base]
    m = re.search(r'(V\d\d)', fid + ' ' + str(f.get('where')))
    return [m.group(1)] if m else ['scope']
EL_IDS = set()
for e in EL:
    for m in re.finditer(r'\b([A-Z]+[0-9]*-[A-Z]*-?\d+|[A-Z]{2,4}-\d+)\b', e['subject']):
        EL_IDS.add(m.group(1))
open_findings = []
wid = {d['id'] for d in wiring['defects']}
for f in fs:
    raw = f['raw']
    lst = f['list']
    if lst in ('internal_conflicts', 'cross_part_conflicts', 'conflicts', 'cross_volume_conflicts', 'standing_rule_conflicts'):
        closure = 'conflict ruling ' + f['fid']
    elif lst == 'elegance_candidates' or f['fid'] in EL_IDS:
        closure = 'elegance ruling (E-list)'
    elif lst in ('wiring_gaps', 'wiring_findings', 'wiring_observations'):
        closure = 'wiring routing (' + (f['fid'] if f['fid'] in wid else 'accounted in wiring.md') + ')'
    elif lst in ('terminology', 'term_defects', 'equivalences'):
        closure = 'glossary (retired synonyms) / ID rulings'
    elif lst == 'id_hygiene':
        closure = 'ID rulings'
    elif lst in ('edges_observed', 'edge_gaps', 'undefined_edges'):
        closure = 'edge catalogue (EI-' + f['fid'] + ')'
    else:
        closure = 'FIX at the unit'
    req = raw.get('required') or raw.get('hint') or raw.get('ruling_hint') or raw.get('resolution') or raw.get('link') or raw.get('guard') or ''
    where = raw.get('where') or raw.get('at') or ''
    if not req:
        if lst in ('restatements', 'restatement_clusters', 'internal_duplications', 'restatement_findings'):
            home = raw.get('canonical_home') or raw.get('home') or 'its first statement'
            req = f"state it once at {home}; every other place cites it" + (f" (places: {where})" if where else '')
        elif lst == 'narration':
            req = 'remove the narration (the validation records keep it)' + (f" — {where}" if where else '')
        elif lst == 'deferral_wording':
            req = 'state the decided outcome; no deferral wording'
        elif lst in ('broken_references', 'broken_reference_findings'):
            req = f"correct the pointer {raw.get('ref', '')} at {where}: {raw.get('status', '')}"
        elif lst == 'cohesion_observations':
            req = 'see Cohesion checks (scope)'
        elif lst == 'handoffs_to_canon':
            req = 'closed by the canon (the ruling it asks for is here: ID-DR, f item routing or the named conflict)'
    open_findings.append({'id': f['fid'], 'list': lst, 'severity': f.get('severity'), 'units': finding_units(f), 'text': str(f['text'])[:500],
                          'required': str(req)[:500], 'closure': closure})
for sid, seam, unit, ruling in SEAM_OPEN:
    open_findings.append({'id': sid, 'list': 'seam-r6-open (INDEX §7 fix list)', 'severity': 'minor', 'units': [unit],
                          'text': f'docs/volumes/critique/{seam}.md {sid}', 'required': ruling, 'closure': 'FIX at the unit'})
for h in hands:
    if h['id'].startswith('IN-'):
        open_findings.append({'id': f"{h['volume']}:{h['id']}", 'list': 'integration-note', 'severity': 'minor', 'units': [h['volume']],
                              'text': h['text'][:300], 'required': 'fold the note into the body at its home, then drop the note (S9, ID-WX)', 'closure': 'FIX at the unit'})
F_MISSING_V11_LIST = []
# ---------------- hand-offs ----------------
handoffs = []
for h in hands:
    if h['id'].startswith('IN-'):
        continue
    dest = [d for d in h['dest'] if d in VOLS or d in ('base', 'file f', 'BASE-F')] or ['(named in the row)']
    route = []
    for d in dest:
        if d in ('base', 'file f', 'BASE-F'):
            route.append('base (the f item or base section the row names)')
        else:
            route.append(d)
    handoffs.append({'id': f"{h['volume']}:{h['id']}", 'from': h['volume'], 'to': route, 'stated': h['status'],
                     'action': 'close at the destination (write it there, cite the requester) and mark it closed in the requester' if h['status'] != 'closed-stated' else 'confirm closed at the destination; the requester keeps one closed line or drops the row',
                     'line': h['line'], 'text': h['text'][:400]})
# ---------------- per unit ----------------
units = {}
for u in BASE + VOLS:
    units[u] = {'words': WORDS[u], 'state': [], 'reference': [], 'bcr_pointer': [], 'history_out': [], 'glossary_items': [],
                'index_rows': [], 'handoff_items': [], 'owner_questions': [], 'conflicts': [], 'f_items': [], 'f_items_concerning': [],
                'g_parts': [], 'wiring': [], 'elegance': [], 'id_rulings': [], 'terms': [], 'cohesion': [], 'open_findings': [],
                'handoffs_to_close': [], 'agreement_disagreements': [], 'edges_undefined': 0, 'edges_untested': 0, 'combos_owned_undefined': 0}
for k, v in byinv.items():
    it = items.get(k)
    if not it:
        continue
    u = it['unit']
    role = v['role']
    if role == 'home':
        units[u]['state'].append(k)
    elif role == 'index-row':
        units[u]['index_rows'].append(k)
    elif role in ('reference', 'reference-owner-rule'):
        units[u]['reference'].append({'id': k, 'home_unit': v.get('home_unit'), 'home_sec': v.get('home_sec'), 'fact': v.get('fact') or v.get('near_fact'),
                                       'match': 'fact' if v.get('fact') else ('near' if v.get('near_fact') else 'section')})
    elif role == 'bcr-pointer':
        keys = it['idents'] + re.findall(r'BCR-(?:V\d+-)?\d+', it['statement'][:80])
        fi = None
        for kk in keys:
            kk2 = kk if kk.startswith('BCR-V') else (f"{u} {kk}" if kk.startswith('BCR-') else kk)
            if kk2 in bcr_to_f:
                fi = bcr_to_f[kk2]
                break
        units[u]['bcr_pointer'].append({'id': k, 'bcr': next((kk for kk in keys if kk.startswith('BCR')), None), 'f_item': fi})
    elif role == 'history-out':
        units[u]['history_out'].append(k)
    elif role == 'glossary':
        units[u]['glossary_items'].append(k)
    elif role == 'handoff':
        units[u]['handoff_items'].append(k)
    elif role == 'answer-J121-J122':
        units[u]['owner_questions'].append(k)
for fr in f_route:
    for rq in fr['requests']:
        m = re.match(r'^BCR-V(\d+)-(\d+)$', rq)
        m2 = re.match(r'^(V0[14]) BCR-(\d+)$', rq)
        if m:
            v = 'V%02d' % int(m.group(1)); newid = rq
        elif m2:
            v = m2.group(1); newid = f"BCR-V{int(v[1:])}-{m2.group(2)}"
        else:
            continue
        units[v].setdefault('requests_in_f', []).append({'request': rq, 'id_after': newid, 'f_item': fr['item'], 'base_section': fr['section']})
for c in conflicts:
    for u in c['units']:
        if u in units:
            units[u]['conflicts'].append(c['id'])
for fr in f_route:
    units[fr['unit']]['f_items'].append({'item': fr['item'], 'role': 'applies (its section)', 'section': fr['section']})
    for a in fr['also']:
        units[a]['f_items'].append({'item': fr['item'], 'role': 'applies its part (also touches)', 'section': fr['section']})
    for v in fr['needed_by']:
        if v in units:
            units[v]['f_items_concerning'].append(fr['item'])
for g in g_route:
    for u, part in g['parts'].items():
        units[u]['g_parts'].append({'item': g['item'], 'class': g['class'], 'part': part})
for w in wiring_route:
    for u in w['units']:
        if u in units:
            units[u]['wiring'].append(w['id'])
for e in EL:
    for u in e['units']:
        if u in units:
            units[u]['elegance'].append(e['id'])
for i in IDH:
    for u in i['units']:
        if u in units:
            units[u]['id_rulings'].append(i['id'])
for g in gloss['retired']:
    for u, n in g['occurrences'].items():
        if u in units and n:
            units[u]['terms'].append({'id': g['id'], 'retired': g['retired'], 'term': g['term'], 'count': n, 'lines': g['first_lines'].get(u, [])})
for u in units:
    units[u]['cohesion'] = COHESION['scope'] if u == 'scope' else (COHESION['volume'] if u in VOLS else [])
for of in open_findings:
    for u in of['units']:
        if u in units:
            units[u]['open_findings'].append(of['id'])
for h in handoffs:
    for d in h['to']:
        if d in units and h['id'] not in units[d]['handoffs_to_close']:
            units[d]['handoffs_to_close'].append(h['id'])
        elif d.startswith('base') and h['id'] not in units['scope']['handoffs_to_close']:
            units['scope']['handoffs_to_close'].append(h['id'])
for q in OWNER_Q:
    units[q[0]]['owner_questions_answered'] = units[q[0]].get('owner_questions_answered', []) + [{'q': q[1], 'subject': q[2], 'answer': q[3]}]
# shrink band
for u in units:
    w = WORDS[u]
    units[u]['shrink'] = {'words_before': w, 'goal_band_words_after': [round(w * 0.60), round(w * 0.75)],
                          'narration_ranges_words': NARR.get(u), 'restatement_items': len(units[u]['reference']),
                          'bcr_blocks_to_pointers': len(units[u]['bcr_pointer'])}

# ---------------- agreement ----------------
pairs = []
for key, rows in sorted(agree['pairs'].items()):
    a, b = key.split('|')
    dis = [r for r in rows if r['verdict'] == 'disagree']
    vc = [r for r in rows if r['verdict'] == 'value-check']
    for r in vc:
        r['verdict'] = 'agree'
        r['note'] = 'value check read by the canon: the numbers beside the name are clause or list numbers, not values'
    pairs.append({'pair': [a, b], 'shared_subjects': len(rows), 'disagree': len(dis), 'subjects': rows})
    for r in dis:
        for u in (a, b):
            units[u]['agreement_disagreements'].append({'subject': r['subject'], 'with': b if u == a else a, 'rulings': r['conflicts']})
AGREE_CONTRACTS = [
 ('the context vector', ['model', 'pipeline', 'V01', 'V02', 'V03', 'V05', 'V07'], 'model §2.5 (ContextVector)', "One object: V01's DistrictContext and BlockContext are views over ContextVector (§2.5), SitePlanStrategy.plan and GranularityLaw.bands read it, RungProfile's granularity and greenery scales index it; arena gains 'sky' (f item 213); dist gains market and harbour at village rungs (f item 576)."),
 ('the evolution rules', ['pipeline', 'determinism', 'V06', 'V01', 'V02', 'V03', 'V04', 'V05', 'V07'], '§4.11 (the hook, grow-by-stage, the decline table) and V06 (the engine)', "One phase interface (f item 317 with item 202's call points), one ProductEpochContext/EpochContext (TX-02), one decline table (§4.11) extended by BCR-V6-26 (f item 291); every volume's lifecycle rows name the epoch op that changes their records."),
 ('the dossier rules', ['determinism', 'V08', 'V11', 'V04', 'V06', 'V07', 'V01', 'V05'], '§7.7 (the contract, DR1–DR35 and item 113\'s rows) and V08 (the port)', "Dossier facts immutable on the map (items 20, 20 (h), 22); every dossier field consumed or on §7.7 item 1's ignore-list (W-DOS-01a/b); every derived fact traced to a DR row (DR26–DR35 numbered, ID-DR); every change kind reaching its dependents (wiring's change table; W-DOS-02, W-DOS-08)."),
 ('the editing rules', ['determinism', 'V09', 'V10', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07'], '§7 (events, the binding table, locality, lifecycle, bends)', "One binding table (E-04), one dry-run outcome table (E-07; refusals only for a dossier fact or a lock), §7.4's lifecycle row for every edit kind the volumes add."),
 ('the build plan', ['scope'] + VOLS, '§16 and INDEX §3/§4', "J122's combined order; each volume's §8 slot and price agree with §16 and INDEX; item 568 computes the totals once."),
 ('the test ids and bars', ['scope'] + VOLS, '§13 and each volume §7', "Test ids unique (ID census); every base hook bar names the volume test that takes it over (W-05, CO-06); every no-op pin a NoOpPin on V12's engine (E-20)."),
]
agreement = {'pairs': pairs, 'contracts': [{'subject': s, 'units': us, 'home': h, 'rule': r} for s, us, h, r in AGREE_CONTRACTS],
             'handoffs': handoffs}

# ---------------- edges ----------------
EDGE_GENERAL = {
 'E4-degenerate': "General rule (to be stated once at §5.1 by the determinism editor if absent): every stage commits geometry through kernel transactions; a degenerate result is refused by the kernel (§3.1: E_DEGENERATE, E_BELOW_MIN_EDGE, E_NON_SIMPLE …) and handled by the stage's failure class (§5.2, or the volume's own F-class) on its ladder, never a whole-map retry. A mechanism with no local statement is DEFINED by that rule once its stage's failure class is named in its text.",
}
e_out = []
for e in edges['edges']:
    e2 = dict(e)
    if e2['class'] == 'E4-degenerate' and e2['status'] == 'UNDEFINED':
        e2['status'] = 'UNDEFINED'
        e2['note'] = 'name the stage\'s failure class (general rule E-GEN-1) or state the local case'
    e_out.append(e2)
    if e2['status'] == 'UNDEFINED':
        units[e2['unit']]['edges_undefined'] += 1
    elif e2['status'] == 'UNTESTED':
        units[e2['unit']]['edges_untested'] += 1
NAMED = [('a settlement that grows over a sealed void', 'V06', 'V04', r'(?:sealed|unknown|unexcavated)[^.]{0,160}(?:grow|built over|new house|epoch)|(?:grow|built over|new house|epoch)[^.]{0,160}(?:sealed|unexcavated)'),
         ('a catacomb growing into a sewer', 'V04', 'pipeline', r'catacomb[^.]{0,140}(?:grow|reach|meet|breach|join|cut)[^.]{0,100}sewer|sewer[^.]{0,140}(?:grow|reach|meet|breach|join|cut)[^.]{0,100}catacomb'),
         ("a raised way under an island's shade", 'V05', 'model', r'(?:raised way|viaduct|aqueduct|elevated road)[^.]{0,160}(?:shade|shadow)[^.]{0,60}island|island[^.]{0,80}(?:shade|shadow)[^.]{0,160}(?:raised way|viaduct|aqueduct|elevated road)'),
         ('a raised way over a harbour mouth', 'pipeline', 'model', r'(?:raised way|viaduct|elevated road|aqueduct)[^.]{0,160}(?:harbour|mole|quay)|(?:harbour mouth|harbour chain)[^.]{0,160}(?:raised|viaduct|elevated)'),
         ('a deck plot on a bridge over a moat', 'pipeline', 'model', r'(?:deck plot|deck)[^.]{0,160}moat|moat[^.]{0,160}(?:deck plot|bridge deck|deck)'),
         ('a retaining wall on a cliff edge', 'model', 'pipeline', r'retaining[^.]{0,160}cliff|cliff[^.]{0,160}retaining'),
         ('a dossier removing what an edit pinned', 'V08', 'determinism', r'(?:dossier|absorb)[^.]{0,160}(?:removes?|closes?|drops?)[^.]{0,120}(?:pinned|a pin|locked|a lock)|(?:pinned|a pin|locked|a lock)[^.]{0,160}(?:dossier|absorb)[^.]{0,80}(?:removes?|closes?)'),
         ('an epoch undone after a save', 'V06', 'determinism', r'(?:epoch)[^.]{0,160}(?:undo|undone)|(?:undo|undone)[^.]{0,120}epoch')]
import glob as _g
TEXTS = {'base': open('docs/ARCHITECTURE.md', encoding='utf-8').read()}
for f in sorted(_g.glob('docs/volumes/V*.md')):
    TEXTS[f.split('/')[-1][:3]] = open(f, encoding='utf-8').read()
# the owner-named combinations: status set by the canon's reading of the text (quoted place), not by the scan
NAMED_READ = [
 ('a settlement that grows over a sealed void', ['V06', 'V04'], 'V06', 'DEFINED (to confirm: outcome, rung, test)',
  "V06 §3.11.6 and §3.5.2 (passages sealed by decline and reopened by regrowth); V04 §0/§3.5.7 (a house built over a void may dig down into it; a new sewer or a growing catacomb may cut through it); g item 113 (d)–(e) (sewers reopen; LOST until refound)"),
 ('a catacomb growing into a sewer', ['V04', 'pipeline'], 'V04', 'DEFINED (to confirm: the typed opening, rung, test)',
  "V04 §0 l.195: 'A catacomb may break into a sewer, a quarry into a cave; each meeting is a typed opening' — V04 §3.5.1's growth and U-LINK's breach link state the mechanism; II.7.6 carries the base's link kinds"),
 ("a raised way under an island's shade", ['V05', 'model', 'pipeline'], 'V05', 'DEFINED (to confirm)',
  "V05 §1b / §3.15 (7): sky.clearance and reclearIsland read every caster an epoch commits under an island (EpochScope.raised); file f item 290: raised ways and retaining walls are casters of item 102's daylight driver; the island's groundRefCm counts the caster ceiling"),
 ('a raised way over a harbour mouth', ['pipeline', 'model', 'V04'], 'pipeline', 'UNDEFINED',
  "no text states whether a generated raised way may cross a harbour mouth, its chain (item 106) or a mole; the owner (the raised-way generation, §4.3 with file f items 244 and 290) states the outcome (the route solver's cost row or an exclusion), its rung and a test"),
 ('a deck plot on a bridge over a moat', ['pipeline', 'model'], 'pipeline', 'DEFINED (to confirm realism)',
  "file f item 246: a Bridge of kind ford or draw, or with no deckCm, offers no deck plot — a drawbridge over a moat carries none; a fixed moat bridge with a deck offers them by the deck rows (V11 deck, deckOk); the pipeline editor confirms or narrows it for gate bridges (realism tiebreaker)"),
 ('a retaining wall on a cliff edge', ['model', 'pipeline'], 'pipeline', 'UNDEFINED',
  "no text states the outcome where S10/S11's levelling or a district edge would raise a retaining wall along a cliff line (a closure barrier of kind cliff, item 106): the pipeline editor states it (the cliff face holds the ground; no wall is raised on a cliff edge, or the wall stops at it), with its test"),
 ('a dossier removing what an edit pinned', ['V08', 'determinism'], 'determinism', 'DEFINED (to confirm)',
  "§7.7's precedence (the dossier is the sole immutable truth, items 20, 22) and its dossier contract items 1–5: a dossier event removes the institution; the user's pin on its place yields (the pin is reported as orphaned, §7.4); V08 §3.6 applies the removal"),
 ('an epoch undone after a save', ['V06', 'determinism'], 'V06', 'DEFINED (to confirm)',
  "V06 §0 ('survives saving and reloading), undo while it is the latest thing that happened, or branch from') and V06 §4's undo of an epoch as one event; §7.4's epoch row"),
]
named = [{'id': 'CN-' + re.sub(r'[^a-z]+', '-', a.lower()).strip('-'), 'combination': a, 'units': b, 'owner': c, 'status': d, 'evidence': {'where': 'canon reading', 'quote': e}} for a, b, c, d, e in NAMED_READ]
for c in combos:
    if c['status'] == 'UNDEFINED':
        units[c['owner']]['combos_owned_undefined'] += 1
for n in named:
    if n['status'] == 'UNDEFINED':
        units[n['owner']]['combos_owned_undefined'] += 1
edges_json = {'method': "Mechanisms are the subsections of each unit's mechanism chapters (base §2–§11, PART II, PART III, with §4's stage blocks split at their bold stage leads; a volume's §2–§5 subsections). An edge class applies where the mechanism's text uses its vocabulary three times or more; the edge is DEFINED where a sentence of the mechanism's own text states the case (quoted as evidence), UNTESTED where it is defined but no test id appears in the text or cites the section, UNDEFINED otherwise. Inventory-reported edges (edges_observed, edge_gaps, undefined_edges, undefined-edge conflicts) are listed as UNDEFINED entries EI-…. Combinations: every pair of features from different units that can meet on one map (rungs intersect; layers meet directly, through accesses, basements, foundations, shade or landfall; or a time, dossier, edit, view, export, clerk, content or preset feature over a physical one); DEFINED where one sentence of either unit (or the outcome's owner) names both, else UNDEFINED, routed to the owner (the later-built unit for two physical features; the time, dossier, edit, view, export, clerk, content or preset unit otherwise). The evidence is a scan: a verifier confirms each quoted sentence states the outcome, its failure rung and its test.",
              'general_rules': EDGE_GENERAL, 'mechanisms': edges['mechanisms'], 'edges': e_out, 'combinations': combos, 'named_combinations': named}

# ---------------- facts summary ----------------
multi = [f for f in facts if f['stated_at']]
cross = [f for f in multi if any(p['unit'] != f['unit'] for p in f['stated_at'])]
canon = {
 'meta': {'title': 'Canon of the whole architecture set (base + twelve volumes)', 'lane': 'coherence/canon', 'date': '2026-09-29',
          'banner': 'PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/canon; covered by the whole-design retrovalidation (J84).',
          'inputs': ['docs/validation/coherence/inventory-*.json (12)', 'docs/validation/coherence/wiring.json', 'docs/volumes/INDEX.md', 'docs/AMENDMENTS-2026-09-28f.md (whole)',
                     'docs/AMENDMENTS-2026-09-28g.md', 'docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md', 'docs/volumes/_integrate.md (J-VI.1–J-VI.30)',
                     'docs/volumes/critique/seam-*-r6.md', 'docs/validation/consistency/canon.md (home rules R1–R13)', 'the design text (base md5 01fea21f; volumes as landed)'],
          'scripts': 'docs/validation/coherence/work/canon/{norm,link,ids,glossary,agree,handoffs,edges,combos,assemble,render}.py; rulings in rulings_conflicts.py, rulings_other.py, manual.py',
          'precedence': "owner rules (OWNER-INSTRUCTIONS, the OWNER RULE items, DEFINITION.md; the owner's rulings J121 and delegation J122) > an f item or a J-VI decision that deliberately changes the base > the base's canonical home > a volume's restatement",
          'section_units': SEC_UNIT},
 'counts': {},
 'home_rules_earlier': 'docs/validation/consistency/canon.md R1–R13 (kept; cited by the set rules)',
 'home_rules': [{'id': a, 'rule': b} for a, b in HOME_RULES],
 'facts': facts,
 'by_inventory_id': byinv,
 'glossary': gloss,
 'conflicts': conflicts,
 'f_routing': {'items': f_route, 'conflicts_ruled': F_CONFLICTS, 'owner_rule_check': F_OWNER_CHECK, 'not_items': F_NOT_ITEMS,
               'census': 'every request heading in the twelve ## 10 sections (407) is carried by an f item (400) or is one of the seven not-items below (script: work/canon/assemble.py census)'},
 'g_routing': g_route,
 'id_hygiene': IDH,
 'id_census': {'defined_ids': len(ids['defs']), 'apparent_duplicates': len(ids['dups']), 'true_collisions': ['ID-BCR (V01/V04 bare BCR-n)', 'volume-local W/X/H rows (ID-WX)']},
 'wiring_gaps': wiring_route,
 'elegance': EL,
 'open_findings': open_findings,
 'owner_questions': [{'unit': a, 'question': b, 'subject': c, 'answer': d} for a, b, c, d in OWNER_Q],
 'canon_decisions': [{'id': a, 'decision': b, 'basis': c} for a, b, c in CANON_DECISIONS],
 'cohesion': COHESION,
 'units': units,
}
canon['counts'] = {
 'inventory_items': len(items), 'facts': len(facts), 'facts_multi_stated': len(multi), 'facts_multi_stated_across_units': len(cross),
 'references': sum(1 for v in byinv.values() if v['role'] in ('reference', 'reference-owner-rule')),
 'references_linked_to_a_fact': sum(1 for v in byinv.values() if v['role'] in ('reference', 'reference-owner-rule') and v.get('fact')), 'references_near_fact': sum(1 for v in byinv.values() if v.get('near_fact')),
 'bcr_pointers': sum(1 for v in byinv.values() if v['role'] == 'bcr-pointer'), 'history_out': sum(1 for v in byinv.values() if v['role'] == 'history-out'),
 'terms_defined': len(gloss['terms']), 'terms_retired': len(gloss['retired']),
 'conflicts': len(conflicts), 'conflicts_by_verdict': dict(collections.Counter(c['verdict'] for c in conflicts)),
 'f_items_routed': len(f_route), 'g_items_routed': len(g_route), 'id_rulings': len(IDH), 'id_collisions': 2,
 'wiring_gaps_routed': len(wiring_route), 'elegance_unify': sum(1 for e in EL if e['verdict'] == 'UNIFY'), 'elegance_keep_apart': sum(1 for e in EL if e['verdict'] == 'KEEP APART'),
 'open_findings_routed': len(open_findings), 'handoffs': len(handoffs), 'handoffs_not_stated_closed': sum(1 for h in handoffs if h['stated'] != 'closed-stated'),
 'owner_questions_answered': len(OWNER_Q), 'agreement_pairs': len(pairs), 'shared_subjects': sum(p['shared_subjects'] for p in pairs),
 'disagreements': sum(p['disagree'] for p in pairs), 'mechanisms': len(edges['mechanisms']), 'edge_cases': len(e_out),
 'edges_undefined': sum(1 for e in e_out if e['status'] == 'UNDEFINED'), 'edges_untested': sum(1 for e in e_out if e['status'] == 'UNTESTED'),
 'combinations': len(combos) + len(named), 'combinations_undefined': sum(1 for c in combos if c['status'] == 'UNDEFINED') + sum(1 for n in named if n['status'] == 'UNDEFINED'),
 'words_before_total': sum(WORDS.values()), 'words_before_base': sum(WORDS[u] for u in BASE), 'words_before_volumes': sum(WORDS[u] for u in VOLS),
}
json.dump(canon, open(D + '/canon.json', 'w'), ensure_ascii=False, indent=1)
json.dump(agreement, open(D + '/agreement.json', 'w'), ensure_ascii=False, indent=1)
json.dump(edges_json, open(D + '/edges.json', 'w'), ensure_ascii=False, indent=1)
print(json.dumps(canon['counts'], indent=0))
