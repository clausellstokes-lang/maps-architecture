# Round-1 → round-2 collection: the workflow's grouping by owner (normUnit), plus
# (1) identical (owner, id) pairs merged (reported_by joined), (2) every owner-item part the canon routes
# for items 120 (units whose round-1 repair predated it), 121, 122, 122 (h)-(i), 123, 124, 125 added where no
# verifier raised it, (3) orchestrator notes attached to named issues.
import json, glob, os, re, sys
R = sys.argv[1] if len(sys.argv) > 1 else '1'
D = '/home/user/maps-architecture/docs/validation/coherence/results'
CANON = '/home/user/maps-architecture/docs/validation/coherence/canon.md'
UNITS = ['model','kernel','pipeline','determinism','rendering','scope'] + [f'V{i:02d}' for i in range(1,13)]
def norm(o):
    t = str(o or '').strip()
    if t in UNITS: return t
    low = t.lower()
    for b in UNITS[:6]:
        if low.startswith(b): return b
    m = re.search(r'V\s*0?(\d{1,2})', t.upper())
    if m and 1 <= int(m.group(1)) <= 12: return f'V{int(m.group(1)):02d}'
    return 'scope'
by = {u: {} for u in UNITS}; raw = 0
for f in sorted(glob.glob(f'{D}/coherence_verify-*-r{R}[st].json')):
    r = json.load(open(f)); rep = r.get('key', os.path.basename(f)).replace('coherence/', '')
    for i in r.get('issues', []) or []:
        if not i: continue
        raw += 1
        i = dict(i); u = norm(i.get('owner')); i['owner'] = u
        k = i.get('id') or f'anon-{raw}'
        if k in by[u]:
            by[u][k]['reported_by'] += ', ' + rep
            # keep the fuller required change as an addendum
            if i.get('required_change') and i['required_change'] not in by[u][k].get('required_change',''):
                by[u][k].setdefault('also_reported', []).append({'by': rep, 'claim': i.get('claim'), 'required_change': i.get('required_change'), 'severity': i.get('severity')})
            sev_rank = {'blocker':0,'major':1,'minor':2}
            if sev_rank.get(i.get('severity'),3) < sev_rank.get(by[u][k].get('severity'),3): by[u][k]['severity'] = i['severity']
        else:
            i['reported_by'] = rep; by[u][k] = i
# (2) owner-item parts from the canon's routing bullets
canon = open(CANON).read()
sections = re.findall(r'### g item ([0-9]+(?: \(h\)–\(i\))?) — (?:every unit named writes its part|routing completed[^\n]*)\n((?:\* .*\n?)+)', canon)
added = []
PRE120 = {'model','rendering','scope','V09','determinism','pipeline','V06'}
for item, body in sections:
    tag = 'G' + item.replace(' (h)–(i)', 'h')
    num = item.split()[0]
    if num not in ('120','121','122','123','124','125'): continue
    for line in body.strip().split('\n'):
        for m in re.finditer(r'\*\*([A-Za-z0-9, ]+):\*\* (.*?)(?=; \*\*[A-Za-z0-9, ]+:\*\*|$)', line):
            for u in [x.strip() for x in m.group(1).split(',')]:
                if u not in UNITS: continue
                if num == '120' and u not in PRE120: continue
                k = f'{tag}-{u}'
                if k in by[u]: continue
                by[u][k] = {'id': k, 'severity': 'major', 'kind': 'F-MISSING', 'owner': u, 'reported_by': 'orchestrator (canon routing)',
                  'claim': f"File g item {item}'s part for {u} is not yet written: the canon routes to {u} \"{m.group(2).strip()}\" (canon.md, the dated ruling for item {item}). No round-1 repair carried it (its brief predated the filing), and no round-1 verifier raised it (the base verifiers' briefs predated items 122 (h)–(i) and 125).",
                  'required_change': f"Write {u}'s part of file g item {item} at build depth as the canon ruling names it — \"{m.group(2).strip()}\" — as new design (an addition, never a change of another decision), reading the item's text in docs/AMENDMENTS-2026-09-28g.md whole, with its wiring, lifecycle, edge, test and decision rows where the unit keeps them."}
                added.append(k)
# (3) orchestrator notes
NOTES = {('V05','VV56-r1-05'): "ORCHESTRATOR NOTE (owner rule first, principle (3)): item 124 (c) — the owner's words \"a desert or arid land rarely gets rain, and definetly no snow\" — rules that an arid row draws NO snow, falling or lying, on the ground or an island, a viewer's `snow` included (G124-rendering's §8.2 hard rule). Fix the disagreement in that direction: V05 §3.23 and T-V5-34 (d) keep 'an arid row draws no ice and no snow on an island', and §8.2's 'a viewer's value stands' yields to item 124 (c) on an arid row (rendering's part)."}
for (u,k), note in NOTES.items():
    if k in by[u]: by[u][k]['orchestrator_note'] = note
out = f'{os.path.dirname(os.path.abspath(__file__))}/repair-in-r{int(R)+1}'
os.makedirs(out, exist_ok=True)
tot = 0; sev = {}
for u, d in by.items():
    l = list(d.values())
    if l: json.dump(l, open(f'{out}/{u}.json', 'w'), indent=1)
    tot += len(l)
    for i in l: sev[i.get('severity')] = sev.get(i.get('severity'),0)+1
print('files', len(glob.glob(f'{D}/coherence_verify-*-r{R}[st].json')), 'raw', raw, 'merged', tot, sev)
print({u: len(d) for u, d in by.items() if d})
print('added', len(added), added)
