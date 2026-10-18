"""coherence/canon step 4: the glossary (one term per concept) and the retired synonyms with their occurrences.
Output work/canon/glossary.json."""
import json, glob, re, collections
D = 'docs/validation/coherence'
FILES = {'base': 'docs/ARCHITECTURE.md', 'INDEX': 'docs/volumes/INDEX.md'}
for f in sorted(glob.glob('docs/volumes/V*.md')):
    FILES[f.split('/')[-1][:3]] = f
TEXT = {k: open(v, encoding='utf-8').read().split('\n') for k, v in FILES.items()}
BASE_SPLIT = [(1, 468, 'scope'), (469, 2451, 'model'), (2452, 3679, 'kernel'), (3680, 6793, 'pipeline'), (6794, 9514, 'determinism'),
              (9515, 11046, 'rendering'), (11047, 11434, 'rendering'), (11435, 11888, 'pipeline'), (11889, 12915, 'rendering'),
              (12916, 15185, 'scope'), (15186, 16267, 'pipeline'), (16268, 99999, 'scope')]
def base_unit(n):
    for a, b, u in BASE_SPLIT:
        if a <= n <= b:
            return u
    return 'scope'

def occurrences(pattern, flags=0, skip_code=False):
    rx = re.compile(pattern, flags)
    out = collections.Counter()
    lines = collections.defaultdict(list)
    for k, ls in TEXT.items():
        for n, l in enumerate(ls, start=1):
            c = len(rx.findall(l))
            if c:
                u = base_unit(n) if k == 'base' else k
                out[u] += c
                if len(lines[u]) < 6:
                    lines[u].append(n)
    return dict(out), {u: v for u, v in lines.items()}

RETIRED = [
    # (id, concept, canonical term, retired pattern (regex), retired label, basis, units that replace)
    ('G-lot', 'the parcel a building stands on', 'plot (field BuildingInput.plot)', r"\blot(?:s)?\b(?! of)|\blot-(?:driven|derived)|BuildingInput\.lot", "lot, lot-driven, lot-derived, BuildingInput.lot", "§2.5's own rule; MC-01", None),
    ('G-refview', 'the 1 440 × 900 CSS px, DPR 2, P = 35 view the budgets are stated for', 'reference viewport', r"reference view\b(?!port)", "reference view", "RTD-01", None),
    ('G-firstmap', 'the time and view of the first drawn map', 'first map', r"first paint", "first paint", "RTD-02", None),
    ('G-shadows', "the light ladder's rung-3 shadow mechanism", 'projected shadows (`shadowPass`)', r"projected-shadow pass|projected pass|projected-shadow union|the shadow pass", "projected-shadow pass, projected pass, projected-shadow union, the shadow pass", "RTD-03", None),
    ('G-vectorrung', "the light ladder's rung 3", 'the vector rung', r"the vector pass", "the vector pass", "RTD-03", None),
    ('G-slab', 'the occluder record set of the light pass', 'the slab list (a record: a slab)', r"occluder slabs|slab casters", "occluder slabs, slab casters", "RTD-04", None),
    ('G-cite', "a pointer to a volume's section", "Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y", r"(?<![-A-Za-z])V[1-9](?:\s§|-\d)", "V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 …", "principle (1); V01/V02/V04/V05/V06/V07/V09/V10/V11-TERM", None),
    ('G-stairway', "a way whose slopeP95 exceeds V11's ways.crossing rampMaxGrade", 'stair-stepped way (the template row keeps `stepped`)', r"stepped way", "stepped (for the way state)", "V01-TERM-2", None),
    ('G-standalone', "a document whose Recipe.product is 'hood'", 'standalone neighbourhood document', r"standalone hoods?\b|lone neighbourhood document|standalone neighbourhood(?! document)", "standalone hood(s), lone neighbourhood document, standalone neighbourhood", "V01-TERM-3", None),
    ('G-unitinput', "the derived view V01's unit runner reads for an island", 'SkyUnitInput (the island\'s unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover)', r"SkyHandover|hand-over", "SkyHandover, hand-over (the unit-run view)", "V05-TERM-2", None),
    ('G-hollow', 'a way retireWay or effaceWay left abandoned or decayed', 'hollow way (the ops keep their names)', r"retired way", "retired way", "V06-TERM-2", None),
    ('G-strike', "the per-district decline draw", 'strike pool (defined once in V06 §3.5.2)', r"decline pool|decline lottery|the lottery", "decline pool, decline lottery, the lottery", "V06-TERM-2", None),
    ('G-dwell', "V07's dwelling count", 'N (N_b, N_v = N − N_o); D(x) is item 102\'s daylight share everywhere', r"D_v|D_o|D_b\b", "D, D_b, D_v, D_o for dwellings", "V07-TERM-2; g item 102's symbol", None),
    ('G-DR', 'the derivation rows the volumes added', 'DR26–DR35 (ID-DR)', r"DR-V\d\.\d|DR-SKY", "DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8", "J-VI.13; file f item 383", None),
    ('G-M6U', "the underground layer's milestone", 'M6-U ("M6" is volume 2\'s stage 3)', r"\bM6\b(?!-|[a-c]\b)(?=[^.]{0,80}(?:underground|\bU\d|V04|Below))", "M6 (for the underground)", "J-VI.22 (R-d)", None),
    ('G-panelgroup', "the six item-110 items inside the M4 sitting", "the M4 panel's M4-110 group", r"panel \(M4-110\)|M4-110's panel|panel M4-110", "panel M4-110", "V12-TERM-1", None),
    ('G-newrandom', "the scoped regenerate with new randomness (§7.1)", "New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer", r"scoped re-roll|Rebuild … as generated", "scoped re-roll, Try again (in prose), Rebuild … as generated", "V09-TERM-4", None),
    ('G-suppress', "a removal of generated content that holds through regeneration", "suppression (file f item 260)", r"kept removed|the removal holds|Removals that hold", "kept removed, the removal holds, Removals that hold (in design prose)", "V09-TERM-4; J-VI.14", None),
    ('G-rederive', "the whole-town re-derivation from a stage", "Re-derive (§7.1)", r"Rebuild from \{stage\}", "Rebuild from {stage}", "V09-TERM-4", None),
    ('G-reason', "the raised way's reason word", "drop · link · water (J-VI.2)", r"waterNeed", "waterNeed", "J-VI.2", None),
    ('G-bend', "an infeasible declaration turned to the nearest lawful one", "bend (bend.* keys); refuse.* only for a dossier fact or a lock", r"refuse\.(?:raised|aqueduct|retaining|stack)\.", "refuse.raised.*, refuse.aqueduct.*, refuse.retaining.*, refuse.stack.*", "J-VI.4", None),
    ('G-unexcavated', "the per-viewer switch for unexcavated voids", "the view key `showUnexcavated`", r"LayerSpec\.showUnexcavated", "LayerSpec.showUnexcavated", "J-VI.19", None),
    ('G-fallbackclass', "a custom kind's class", "item 104 (a)'s resolution (V11 §3.13)", r"fallbackClass", "fallbackClass", "J-VI.20", None),
    ('G-digest', "the dossier's deposits and terrain fields", "site.deposits; site.terrain", r"nearbyResources\[\]|site\.terrainType", "nearbyResources[], site.terrainType", "J-VI.25", None),
    ('G-clerkhandle', "the handle createClerk(mount) returns", "ClerkHandle", r"ClerkHarness", "ClerkHarness", "E-33", None),
    ('G-offline', "the clerk being unreachable", "refuse.clerk.offline", r"error\.clerkOffline", "error.clerkOffline", "E-32", None),
    ('G-postop', "a whole-tile post operation after the light", "wash (tint), edgeFade (vignette); the role `lights` → `glow`", r"\btint\(|role `lights`", "tint(colour, strength) as a post op, the role lights", "E-16", None),
    ('G-portpath', "the village product's registration", "ProductDecl in StrategyRegistry.products (file f item 202)", r"PortRungPath|registerRungPath|its own port path", "PortRungPath, registerRungPath, its own port path", "file f item 202", None),
    ('G-JT', "the Jonckheere–Terpstra trend test", "JT", r"\bJ-T\b", "J-T", "ID-JT", None),
    ('G-forkat', "the history's forward path", "Open a copy from here (a forkAt)", r"Change from here", "Change from here", "J-VI.12", None),
    ('G-floorvault', "a church on wet ground without an always crypt", "no crypt; ledger slabs in the chancel floor (V03 §3.7.4)", r"floor vaults? \(wet ground\)|floor-vault", "floor vaults (wet ground)", "V10-XAGREE-4", None),
    ('G-geojson', "item 110's GeoJSON kinds", "raisedSupport (per support), retaining (per run)", r"raisedSupports|kind `retainingWall`", "raisedSupports MultiPolygon, retainingWall kind", "J-VI.18", None),
    ('G-reservedparch', "`parchment`", "a shipping ink-family variant (RIC-01)", r"reserved `parchment`", "the reserved parchment", "RIC-01", None),
    ('G-binaryangle', "the 16-bit binary angle", "(removed; centidegrees are the one angle unit)", r"binary angle", "16-bit binary angle", "E-15", None),
    ('G-rosterassign', "the roster line's claim on a plot", "rosterAssignment (defined; MC-08)", r"(?!)", "—", "MC-08", None),
]

gloss = {'retired': [], 'terms': []}
for gid, concept, term, pat, label, basis, _ in RETIRED:
    occ, lines = occurrences(pat)
    gloss['retired'].append({'id': gid, 'concept': concept, 'term': term, 'retired': label, 'pattern': pat, 'basis': basis,
                             'occurrences': occ, 'first_lines': lines, 'total': sum(occ.values())})
# defined terms from the inventories
def add(term, definition, home, unit, other=None, src=None):
    gloss['terms'].append({'term': term, 'definition': definition, 'home': home, 'unit': unit, 'other_names': other, 'source': src})
for f in sorted(glob.glob(D + '/inventory-*.json')):
    d = json.load(open(f))
    for it in d['items']:
        if it['kind'] in ('term', 'defined-term'):
            st = it['statement']
            m = re.match(r"^(?:Defined term\s+)?([^:—=]{2,70}?)\s*(?::|—| = | – )\s*(.*)$", st)
            t, defi = (m.group(1).strip(), m.group(2)) if m else ((it.get('names') or [st[:40]])[0], st)
            unit = it['id'][:3] if it['id'][:1] == 'V' and it['id'][1:3].isdigit() else it['id'].split('-')[0].lower()
            add(t, defi[:300], it.get('sub') or it.get('sec') or it.get('section') or '', unit, it.get('names'), it['id'])
    for t in d.get('terms', []) or []:
        if isinstance(t, dict):
            add(t.get('concept') or t.get('term'), (t.get('definition') or '')[:300], t.get('where') or t.get('home') or t.get('defined_at') or '',
                t.get('owner') or t.get('volume') or '', t.get('names') or t.get('synonyms_or_hazards'), t.get('id'))
    for t in d.get('glossary', []) or []:
        add(t.get('term'), t.get('concept'), t.get('where'), 'scope', t.get('other_names'), 'scope-glossary')
    for t in d.get('defined_terms', []) or []:
        add(t.get('term'), '', t.get('owner'), t.get('volume'), None, t.get('defined_at'))
json.dump(gloss, open(D + '/work/canon/glossary.json', 'w'), ensure_ascii=False, indent=0)
print(len(gloss['terms']), 'terms;', len(gloss['retired']), 'retired synonyms')
for g in gloss['retired']:
    print(g['id'], g['total'], dict(sorted(g['occurrences'].items(), key=lambda x: -x[1])[:8]))
