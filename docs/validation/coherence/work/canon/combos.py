"""coherence/canon step 8: cross-unit combinations (principle (11)) — every pair of features from different units that can
meet on one map, at their limits; DEFINED where a paragraph of the design names both (quoted), else UNDEFINED; routed to the
unit that owns the outcome. Output work/canon/combos.json."""
import re, json, glob, itertools, collections
RUNGS = ['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS']
ALL = set(RUNGS)
TC = {'TOWN', 'CITY', 'METROPOLIS'}
CM = {'CITY', 'METROPOLIS'}
VIL = {'THORP', 'HAMLET', 'VILLAGE'}
# id, unit, kind (phys/time/dossier/edit/view/export/preset/content/clerk/calib), layer, rungs, keywords
F = [
 ('cliff', 'pipeline', 'phys', 'ground', ALL, r"\bcliffs?\b|\bsheer\b|\bgorge\b"),
 ('steep', 'pipeline', 'phys', 'ground', ALL, r"\bsteep(?:est)? (?:ground|slope|site)\b|\bslope(?:P95| above| over)\b"),
 ('river', 'pipeline', 'phys', 'ground', ALL, r"\brivers?\b|\bbrook\b|\bstream\b"),
 ('coast', 'pipeline', 'phys', 'ground', ALL, r"\bcoast\b|\bshore\b|\bsea\b|\blake\b"),
 ('harbour', 'pipeline', 'phys', 'ground', TC, r"\bharbour\b|\bmole\b|\bquay\b|\bpier\b|\bjett(?:y|ies)\b|harbour mouth"),
 ('wall', 'pipeline', 'phys', 'ground', ALL, r"\bwalls?\b|\benceinte\b|\bpalisade\b|\bgates?\b"),
 ('moat', 'pipeline', 'phys', 'ground', TC, r"\bmoat\b|\bditch\b"),
 ('bridge', 'pipeline', 'phys', 'ground', ALL, r"\bbridges?\b|\bford\b"),
 ('raised', 'model', 'phys', 'ground+', CM | {'TOWN'}, r"\braised way\b|\bviaduct\b|\baqueduct\b|\belevated road\b|\bpiers?\b.*\bspan\b"),
 ('retaining', 'model', 'phys', 'ground', ALL, r"\bretaining\b|\bterrace wall\b|RetainingWall"),
 ('deckplot', 'model', 'phys', 'ground', TC | {'VILLAGE'}, r"\bdeck plots?\b|\bdeck buildings?\b|DeckContext|\bon (?:a|the) deck\b"),
 ('square', 'pipeline', 'phys', 'ground', ALL, r"\bsquares?\b|\bplaza\b|\bmarket place\b"),
 ('hinterland', 'pipeline', 'phys', 'ground', ALL, r"\bhinterland\b|\bfields?\b|\bmeadow\b|\bpasture\b"),
 ('oasis', 'pipeline', 'phys', 'ground', ALL, r"\boasis\b|\boases\b|\bspring\b(?! flag)"),
 ('frame', 'kernel', 'phys', 'any', ALL, r"\bframe growth\b|\bframe's edge\b|\bframe edge\b|\bbeyond the frame\b"),
 ('hood', 'V01', 'phys', 'ground', TC, r"\bneighbourhood template\b|\bfabric strateg|\bclose-up\b|\bhood pins?\b"),
 ('terraced-ward', 'V01', 'phys', 'ground', TC, r"\bterraced wards?\b|terraceState|\bterraced district"),
 ('composed', 'V02', 'phys', 'ground', ALL, r"\bcomposed (?:wings?|buildings?)\b|\bmassing\b|\bcomposition row"),
 ('tiers', 'V02', 'phys', 'ground', TC, r"\btiers?\b|\bstepped\b|\bstack\b"),
 ('crypt', 'V02', 'phys', 'under', ALL, r"\bcrypts?\b"),
 ('plan', 'V03', 'phys', 'ground', ALL, r"\bfloor plans?\b|\bstored plans?\b|\bthe plan rung\b|\bbasements?\b"),
 ('sewer', 'V04', 'phys', 'under', TC, r"\bsewers?\b|\bculverts?\b|\boutfall\b"),
 ('cavern', 'V04', 'phys', 'under', ALL, r"\bcaverns?\b|\bcaves?\b|\bfissures?\b|\bmines?\b"),
 ('ruin', 'V04', 'phys', 'under', ALL, r"\bruins?\b|\bburied\b"),
 ('catacomb', 'V04', 'phys', 'under', TC, r"\bcatacombs?\b|\bossuar(?:y|ies)\b"),
 ('undercity', 'V04', 'phys', 'under', TC, r"\bundercity\b"),
 ('void', 'V04', 'phys', 'under', ALL, r"\bvoids?\b|\bsealed\b|\bLOST\b|\bunexcavated\b"),
 ('access', 'V04', 'phys', 'under', ALL, r"\baccess points?\b|\bpublic openings?\b|\bshafts?\b|\bways? down\b"),
 ('vault', 'V04', 'phys', 'ground', CM | {'TOWN'} | VIL, r"\barch vaults?\b|\bvaulted spans?\b"),
 ('island', 'V05', 'phys', 'sky', CM, r"\bislands?\b|\bsky\b"),
 ('shade', 'V05', 'phys', 'sky', CM, r"\bisland(?:'s)? shade\b|\bshade strip\b|\bshadeBasis\b|\bunder-hang\b"),
 ('skyaccess', 'V05', 'phys', 'sky', CM, r"\bhoist\b|\brope\b|\bsky access\b|\blanding\b"),
 ('landfall', 'V05', 'phys', 'sky', CM, r"\blandfall\b|\bsink(?:s|ing)?\b|\bfall(?:en)? island"),
 ('epoch', 'V06', 'time', 'any', ALL, r"\bepochs?\b|\bover epochs\b"),
 ('history', 'V06', 'time', 'any', ALL, r"\bhistory replay\b|\bthe replay\b|\bpeakTier\b|\bhigh-water\b|\brefound"),
 ('works', 'V06', 'time', 'any', ALL, r"\bWorks\b|\bbeing built\b|\bdemolish"),
 ('village', 'V07', 'phys', 'ground', VIL, r"\bvillage\b|\bthorp\b|\bhamlet\b|\btofts?\b"),
 ('dossier', 'V08', 'dossier', 'any', ALL, r"\bdossier (?:event|fact|record|removes|change)s?\b|\babsorb\b"),
 ('custom', 'V08', 'dossier', 'any', ALL, r"\bcustom (?:institution|kind|content|chain)s?\b"),
 ('players', 'V08', 'view', 'any', ALL, r"\bplayers?\b|\bparty view\b|\bknowledge tier\b|\bconcealed\b"),
 ('edit', 'determinism', 'edit', 'any', ALL, r"\b(?:an|the|a user's|user) edits?\b|\bdeclared\b|\bdrawn by (?:the|a) user\b"),
 ('lock', 'determinism', 'edit', 'any', ALL, r"\blocked\b|\bpinned\b|\ba lock\b|\ba pin\b"),
 ('undo', 'determinism', 'edit', 'any', ALL, r"\bundo\b|\bredo\b"),
 ('saveload', 'determinism', 'edit', 'any', ALL, r"\bsaved?\b|\bon load\b|\bmigrat\w*|\breload\w*"),
 ('regen', 'determinism', 'edit', 'any', ALL, r"\bregenerat\w*|\bre-deriv\w*|\bNew random\b"),
 ('light', 'rendering', 'view', 'any', ALL, r"\bcast shadows?\b|\bthe light pass\b|\bby night\b|\blight sources?\b"),
 ('labels', 'rendering', 'view', 'any', ALL, r"\blabell?ed\b|\blabels?\b"),
 ('export', 'rendering', 'export', 'any', ALL, r"\bexports?\b|\bGeoJSON\b|\bVTT\b|\bglTF\b|\bCityJSON\b"),
 ('tools', 'V09', 'edit', 'any', ALL, r"\bT(?:[1-9]|1[0-2]) `\w+`|\bthe \w+ tool\b"),
 ('layers', 'V09', 'view', 'any', ALL, r"\blayer (?:off|on|toggle)\b|\btoggled?\b|\bdepth band\b|\bshowUnexcavated\b"),
 ('clerk', 'V10', 'clerk', 'any', ALL, r"\bthe clerk\b|\bassistant\b"),
 ('tables', 'V11', 'content', 'any', ALL, r"\bat (?:its|the) (?:range|band) ends?\b|\bcell at (?:0|its maximum)\b|\bweight 0\b|\bchance 0\b"),
 ('presets', 'V12', 'preset', 'any', ALL, r"\bparity presets?\b|\bunder `?(?:MFCG|FTG|VG|NG|FM)`?\b|\bno-op pin\b"),
]
NONPHYS_OWNER = {'time': 'V06', 'dossier': 'V08', 'edit': 'determinism', 'view': 'rendering', 'export': 'rendering', 'clerk': 'V10', 'content': 'V11', 'preset': 'V12'}
ORDER = ['kernel', 'model', 'pipeline', 'determinism', 'rendering', 'scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V07', 'V06', 'V08', 'V09', 'V10', 'V11', 'V12']

def can_meet(a, b):
    if a[1] == b[1]:
        return False
    if not (a[4] & b[4]):
        return False
    ka, kb = a[2], b[2]
    if ka == 'phys' and kb == 'phys':
        la, lb = a[3], b[3]
        if la == 'any' or lb == 'any':
            return True
        if la == lb:
            return True
        # ground and under meet through accesses, basements, foundations; ground and sky meet through shade, accesses, landfall
        if {la, lb} in ({'ground', 'under'}, {'ground+', 'under'}, {'ground', 'ground+'}, {'ground', 'sky'}, {'ground+', 'sky'}):
            return True
        return False
    if ka != 'phys' and kb != 'phys':
        # non-physical pairs that meet: edit x time, dossier x edit, dossier x time, clerk x edit, preset x time, view x dossier
        pair = {ka, kb}
        return pair in ({'edit', 'time'}, {'dossier', 'edit'}, {'dossier', 'time'}, {'clerk', 'edit'}, {'preset', 'time'},
                        {'view', 'dossier'}, {'export', 'dossier'}, {'content', 'dossier'}, {'preset', 'content'}, {'export', 'time'},
                        {'view', 'time'}, {'clerk', 'dossier'})
    return True

def owner(a, b):
    ka, kb = a[2], b[2]
    if ka != 'phys' and kb == 'phys':
        return a[1] if a[1] in ('V06', 'V08', 'V09', 'V10', 'V11', 'V12') else (b[1] if b[1].startswith('V') and ka in ('edit',) else a[1])
    if kb != 'phys' and ka == 'phys':
        return owner(b, a)
    ia, ib = ORDER.index(a[1]), ORDER.index(b[1])
    return a[1] if ia > ib else b[1]

# paragraphs of the whole set
PARAS = []
def paras(path, unit_of_line):
    lines = open(path, encoding='utf-8').read().split('\n')
    buf, start, sec = [], 1, ''
    for n, l in enumerate(lines + [''], start=1):
        h = re.match(r'^#{2,5}\s+(.*)', l)
        if h:
            sec = h.group(1)[:50]
        if l.strip() == '' or h:
            if buf:
                PARAS.append({'unit': unit_of_line(start), 'line': start, 'sec': sec, 'text': ' '.join(buf)})
            buf, start = [], n + 1
        else:
            buf.append(l)
BASE_SPLIT = [(1, 468, 'scope'), (469, 2451, 'model'), (2452, 3679, 'kernel'), (3680, 6793, 'pipeline'), (6794, 9514, 'determinism'),
              (9515, 11046, 'rendering'), (11047, 11434, 'rendering'), (11435, 11888, 'pipeline'), (11889, 12915, 'rendering'),
              (12916, 15185, 'scope'), (15186, 16267, 'pipeline'), (16268, 99999, 'scope')]
def bu(n):
    for a, b, u in BASE_SPLIT:
        if a <= n <= b:
            return u
    return 'scope'
paras('docs/ARCHITECTURE.md', bu)
for f in sorted(glob.glob('docs/volumes/V*.md')):
    v = f.split('/')[-1][:3]
    paras(f, lambda n, v=v: v)
# drop narration paragraphs (reconciliation and integration records, fix lists) from the evidence
PARAS = [p for p in PARAS if not re.search(r'Reconciliation round|Integration notes|Finalization|CONFIRMED versus|Fix list|PROGRESS|PENDING FABLE', p['sec'])]
RX = {f[0]: re.compile(f[5], re.I) for f in F}
hits = {f[0]: set(i for i, p in enumerate(PARAS) if RX[f[0]].search(p['text'])) for f in F}
FEAT = {f[0]: f for f in F}
combos = []
for a, b in itertools.combinations(F, 2):
    if not can_meet(a, b):
        continue
    common = sorted(hits[a[0]] & hits[b[0]])
    own = owner(a, b)
    rel = {a[1], b[1], own}
    pref = []
    quote = None
    for i in common:
        p = PARAS[i]
        if p['unit'] not in rel:
            continue
        for sent in re.split(r'(?<=[.;])\s+', p['text']):
            if RX[a[0]].search(sent) and RX[b[0]].search(sent):
                pref.append(i); quote = sent
                break
        if pref:
            break
    ev = None
    if pref:
        p = PARAS[pref[0]]
        ev = {'unit': p['unit'], 'line': p['line'], 'section': p['sec'], 'quote': quote[:260]}
    rungs = sorted(a[4] & b[4], key=RUNGS.index)
    status = 'DEFINED' if pref and len(pref) >= 1 else 'UNDEFINED'
    combos.append({'id': f"C-{a[0]}-{b[0]}", 'a': {'feature': a[0], 'unit': a[1]}, 'b': {'feature': b[0], 'unit': b[1]},
                   'rungs': rungs, 'owner': own, 'status': status, 'evidence': ev})
json.dump(combos, open('docs/validation/coherence/work/canon/combos.json', 'w'), ensure_ascii=False, indent=0)
print(len(combos), 'combinations;', collections.Counter(c['status'] for c in combos))
print(collections.Counter(c['owner'] for c in combos if c['status'] == 'UNDEFINED').most_common())
for c in combos:
    if c['status'] == 'UNDEFINED':
        print(c['id'], c['owner'], c['rungs'])
