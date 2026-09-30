"""coherence/canon step 7: the edge catalogue (principle (11)).
For every mechanism (a subsection of a unit that holds mechanism items), the edge classes its text makes applicable, each with
its defined outcome, its failure rung and its test where the design text has them (evidence line quoted), else UNDEFINED or
UNTESTED; plus the cross-unit combinations. Inputs: the design text, items_norm.json, findings_all.json.
Output work/canon/edges_raw.json."""
import re, json, glob, collections
W = 'docs/validation/coherence/work/canon'
items = json.load(open(W + '/items_norm.json'))
fs = json.load(open(W + '/findings_all.json'))
BASE_SPLIT = [(1, 468, 'scope'), (469, 2451, 'model'), (2452, 3679, 'kernel'), (3680, 6793, 'pipeline'), (6794, 9514, 'determinism'),
              (9515, 11046, 'rendering'), (11047, 11434, 'rendering'), (11435, 11888, 'pipeline'), (11889, 12915, 'rendering'),
              (12916, 15185, 'scope'), (15186, 16267, 'pipeline'), (16268, 99999, 'scope')]
def base_unit(n):
    for a, b, u in BASE_SPLIT:
        if a <= n <= b:
            return u
    return 'scope'

# ---------- section index of the design text ----------
def sections(path, unitfn):
    lines = open(path, encoding='utf-8').read().split('\n')
    heads = []
    for n, l in enumerate(lines, start=1):
        m = re.match(r'^(#{2,5})\s+(.*)$', l)
        if m:
            heads.append((n, len(m.group(1)), m.group(2).strip()))
    out = []
    for i, (n, lvl, title) in enumerate(heads):
        end = len(lines)
        for n2, lvl2, _ in heads[i + 1:]:
            if lvl2 <= lvl:
                end = n2 - 1
                break
        # own text only up to the next heading of any level
        own_end = heads[i + 1][0] - 1 if i + 1 < len(heads) else len(lines)
        m = re.match(r'^(?:§\s?)?((?:\d+(?:\.\d+)*[a-z]?)|II\.\d+(?:\.\d+)*|PART [IV]+)\b', title)
        num = m.group(1) if m else None
        out.append({'line': n, 'end': end, 'own_end': own_end, 'level': lvl, 'title': title[:90], 'num': num,
                    'unit': unitfn(n), 'text': '\n'.join(lines[n - 1:end]), 'own': '\n'.join(lines[n - 1:own_end])})
    return out
SEC = {'base': sections('docs/ARCHITECTURE.md', base_unit)}
for f in sorted(glob.glob('docs/volumes/V*.md')):
    v = f.split('/')[-1][:3]
    SEC[v] = sections(f, lambda n, v=v: v)

def find_section(unit, sec):
    """sec like '§4.5', 'II.7.3', 'V04 §3.5.1' -> the deepest section record"""
    if not sec:
        return None
    key = 'base' if unit in ('model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope') else unit
    m = re.search(r'(II\.\d+(?:\.\d+)*|\d+(?:\.\d+)*[a-z]?)', sec.replace('§', ' '))
    if not m:
        return None
    num = m.group(1)
    best = None
    for s in SEC[key]:
        if s['num'] and (s['num'] == num):
            if key != 'base' or s['unit'] == unit or True:
                best = s
                break
    if best is None:  # fall back to the longest prefix
        parts = num.split('.')
        while len(parts) > 1 and best is None:
            parts = parts[:-1]
            p = '.'.join(parts)
            for s in SEC[key]:
                if s['num'] == p:
                    best = s
                    break
    return best

CLASSES = {
    'E1-none': ("no input / nothing to act on", r"\b(each|every|all|per|list|set|any)\b",
                r"\b(no |none|empty|nothing|zero|without (?:a|an|any)|absent|there is no|if no|where no|when no)\b"),
    'E2-one': ("exactly one item", r"\b(each|every|pairs?|between|neighbou?rs?|two|order|rank|sort)\b",
               r"\b(one |single|a lone|only one|exactly one|at least one|lone)\b"),
    'E3-cap': ("the maximum and its caps", r"\b(cap|caps|at most|max|maximum|limit|budget|METROPOLIS|count|up to)\b",
               r"\b(cap(?:ped)?|at most|maximum|limit|clamp(?:ed)?|budget|over (?:budget|its cap)|exceed)"),
    'E4-degenerate': ("degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)", r"\b(polygon|ring|face|chain|edge|vertex|vertices|outline|footprint|segment|line|corridor|arc|span|strip|deck)\b",
                      r"(degenerate|zero-length|zero-area|collinear|coincident|self-(?:touch|intersect)|sliver|E_DEGENERATE|too (?:short|small|narrow|thin)|min(?:imum)? (?:width|edge|area|length)|minEdge|not simple)"),
    'E5-data': ("missing, empty or contradictory data (the dossier included)", r"\b(dossier|record|DR\d|digest|table|row|cell|input|reads?)\b",
                r"(missing|absent|unknown|contradict|conflict|no dossier|without a dossier|standalone|unmapped|orphan|default|else\b|otherwise)"),
    'E6-rungs': ("every rung from THORP to the METROPOLIS cap", r"\b(rung|TOWN|CITY|METROPOLIS|THORP|HAMLET|VILLAGE|band|population)\b",
                 r"(every rung|each rung|all rungs|THORP|HAMLET|VILLAGE|below TOWN|village rungs?|at TOWN|at CITY|at METROPOLIS|per rung|RungProfile)"),
    'E7-toggles': ("every toggle and preset (parity presets, every layer on and off)", r"\b(toggle|preset|parity|layer|switch|option|off|Features\.|fantasy)\b",
                   r"(preset|parity|MFCG|FTG|\bVG\b|\bNG\b|\bFM\b|toggle|switched off|when off|is off|\boff\b|disabled|no-op pin)"),
    'E8-lifecycle': ("save, load, undo, redo, regenerate and migrate", r"\b(edit|record|stored|persist|document|epoch|event|lifecycle|state|held|pin|lock)\b",
                     r"(undo|redo|migrat|regenerat|re-deriv|re-derived|reload|on load|save|persist|lifecycle|§7\.4|replay)"),
}
RUNG_RX = re.compile(r"(F-[A-Z][A-Z-]+[A-Z]|fallback|ladder|rung \d|leave(?:s)? out|omitted|reported|substitut|simpler|retr(?:y|ies)|bend|bent|repair)", re.I)
TEST_RX = re.compile(r"\b(T-V\d+-\d+[a-z]?|T\d+[a-z]?-\d+[a-z]?|T-[A-Z][A-Za-z0-9-]+)\b")
MECH_KINDS = {'mechanism', 'algorithm', 'step', 'rule', 'fallback', 'failure-class', 'failure-ladder', 'invariant', 'lifecycle',
              'lifecycle-row', 'edit-kind', 'dispatch', 'edit', 'record', 'hooktable'}
GEN_TITLE = re.compile(r'(generation|stage|S\d|pipeline|kernel|geometry|placement|plot|district|wall|way|underground|sky|island|village|epoch|evolution|plan|building|room|stair|crypt|catacomb|cavern|ruin|sewer|access|raised|retaining|deck|terrace|light|shadow|label|export|render|edit|undo|lifecycle|port|dossier|clerk|tool|table|compiler|calibration|harness|panel|bench)', re.I)

def sentence_with(text, rx):
    t = re.sub(r'```.*?```', ' ', text, flags=re.S)          # code blocks are declarations, not outcome statements
    t = re.sub(r'^#.*$', ' ', t, flags=re.M)
    sents = re.split(r'(?<=[.;:!?])\s+(?=[A-Z*`(\u201c"])|\n\s*[-*|]\s|\n\n', t)
    for s0 in sents:
        if re.search(rx, s0, re.I):
            return re.sub(r'\s+', ' ', s0).strip()[:220]
    return None

# ---------- mechanisms: subsections of the mechanism chapters (and §4's stage blocks) ----------
MECH_CH_BASE = re.compile(r'^(2|3|4|5|6|7|8|9|10|11|II)(\.|$)')
MECH_CH_VOL = re.compile(r'^(2|3|4|5)\.\d')
def stage_blocks(sec):
    """split a base §4 section's own text at bold stage leads (**S7b …**, **S10 …**)"""
    out = []
    lines = sec['own'].split('\n')
    cur, title, start = [], None, sec['line']
    for k, l in enumerate(lines):
        m = re.match(r'^\*\*(S\d+[a-z]?|II\.\d[^*]{0,40}|[A-Z][^*]{2,60}?)[ .:(*]', l)
        if m and re.match(r'^S\d', m.group(1)):
            if cur and title:
                out.append((title, start, '\n'.join(cur)))
            cur, title, start = [l], l.strip('* ')[:80], sec['line'] + k
        else:
            cur.append(l)
    if cur and title:
        out.append((title, start, '\n'.join(cur)))
    return out
mech_blocks = []
for key, secs in SEC.items():
    for s in secs:
        if not s['num']:
            continue
        if key == 'base':
            if s['level'] < 3:
                continue
            if not (MECH_CH_BASE.match(s['num']) or s['num'].startswith('13.')):
                continue
        else:
            if not MECH_CH_VOL.match(s['num']):
                continue
        own = s['own']
        if len(own) < 300:
            continue
        blocks = stage_blocks(s) if key == 'base' and s['num'].startswith('4.') else []
        if blocks:
            for t, ln, txt in blocks:
                mech_blocks.append((s['unit'], s['num'], t, ln, txt))
        else:
            mech_blocks.append((s['unit'], s['num'], s['title'], s['line'], own))

test_cites = collections.defaultdict(set)
for r in items:
    if (r['kind'] or '') in ('test', 'acceptance-bar', 'bar'):
        ids = TEST_RX.findall(r['statement'] or '')
        for m in re.finditer(r'(?:(V\d\d) )?§\s?(\d+(?:\.\d+)*)', r['statement'] or ''):
            u = m.group(1) or (r['unit'] if r['unit'].startswith('V') else 'base')
            for t in ids[:3] or [r['id']]:
                test_cites[(u, m.group(2))].add(t)

CLASSES['E1-none'] = (CLASSES['E1-none'][0], CLASSES['E1-none'][1], r"(\bno \w+ (?:exists|is|draws|lays|gets|takes|runs|stands|remains|holds)|\bnothing\b|\bempty\b|\bnone\b|\bzero\b|\babsent\b|\bif (?:there is )?no\b|\bwhere no\b|\bwhen no\b|\bwithout any\b)")
# the lifecycle table of each unit (a volume's §2 lifecycle section; the base's §7.4) covers its records' E8 edges
LIFE = {}
for key, secs in SEC.items():
    for s_ in secs:
        if s_['num'] and re.search(r'lifecycle', s_['title'], re.I) and (key != 'base' or s_['num'].startswith('7.4')):
            u_ = s_['unit']
            if u_ not in LIFE:
                LIFE[u_] = ((u_ + ' §' + s_['num']) if key != 'base' else '§' + s_['num'], set(TEST_RX.findall(s_['text'])))
if 'determinism' in LIFE:
    for b in ('model', 'kernel', 'pipeline', 'rendering'):
        LIFE.setdefault(b, LIFE['determinism'])
edges, mechs = [], []
for unit, num, title, line, text in mech_blocks:
    mid = f"M-{unit}-{line}"
    sect = (unit + ' §' + num) if unit.startswith('V') else (('§' + num) if not num.startswith('II') else num)
    tests_here = set(TEST_RX.findall(text)) | test_cites.get((unit if unit.startswith('V') else 'base', num), set())
    mechs.append({'id': mid, 'unit': unit, 'section': sect, 'title': title, 'line': line, 'words': len(text.split())})
    record_sec = bool(re.match(r'^2(\.|$)', num))
    for cid, (desc, appl, outc) in CLASSES.items():
        if record_sec and cid not in ('E5-data', 'E8-lifecycle'):
            continue
        hits = len(re.findall(appl, text, re.I))
        if hits < 3:
            continue
        ev = sentence_with(text, outc)
        rung = sentence_with(text, RUNG_RX.pattern)
        tests_use = tests_here
        if cid == 'E8-lifecycle' and record_sec and unit in LIFE:
            ev = f"covered by the unit's lifecycle table {LIFE[unit][0]} (confirm this section's records have their rows)"
            tests_use = tests_here | LIFE[unit][1]
        status = 'DEFINED' if ev else 'UNDEFINED'
        if status == 'DEFINED' and not tests_use:
            status = 'UNTESTED'
        edges.append({'id': f"{mid}-{cid}", 'mechanism': mid, 'unit': unit, 'section': sect, 'title': title, 'class': cid, 'edge': desc,
                      'status': status, 'outcome_evidence': ev, 'rung_evidence': rung, 'tests': sorted(tests_use)[:8], 'source': 'scan'})

# inventory-reported edges (read by the inventory lanes): explicit entries, UNDEFINED unless the finding says otherwise
for f in fs:
    if f['list'] in ('edges_observed', 'edge_gaps', 'undefined_edges') or (f['list'] == 'conflicts' and 'undefined-edge' in str(f['raw'].get('kind', ''))):
        its = [i for i in (f['items'] or []) if isinstance(i, str)]
        unit = None
        for i in its:
            for r in items:
                if r['id'] == i:
                    unit = r['unit']
                    break
            if unit:
                break
        if unit is None:
            unit = {'determinism': 'determinism', 'kernel': 'kernel', 'model': 'model', 'pipeline': 'pipeline', 'rendering': 'rendering', 'scope': 'scope'}.get(f['unit_inv'], f['fid'][:3] if f['fid'][:1] == 'V' else f['unit_inv'])
        edges.append({'id': 'EI-' + f['fid'], 'mechanism': None, 'unit': unit, 'section': str(f['where'])[:120], 'title': '',
                      'class': 'inventory', 'edge': str(f['text'])[:600], 'status': 'UNDEFINED', 'outcome_evidence': None,
                      'rung_evidence': None, 'tests': [], 'source': f['fid'], 'severity': f.get('severity')})
json.dump({'mechanisms': mechs, 'edges': edges}, open(W + '/edges_raw.json', 'w'), ensure_ascii=False)
c = collections.Counter((e['unit'], e['status']) for e in edges)
print(len(mechs), 'mechanisms;', len(edges), 'edges')
print(collections.Counter(e['status'] for e in edges))
print(collections.Counter((e['class'], e['status']) for e in edges if e['source'] == 'scan').most_common(30))
