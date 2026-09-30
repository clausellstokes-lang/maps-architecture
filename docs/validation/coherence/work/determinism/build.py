# Builds docs/validation/coherence/inventory-determinism.json and .md from the working store in this folder.
import re, json, collections, os
W = os.path.dirname(os.path.abspath(__file__)) + '/'
OUT = '/Users/cstokes/Desktop/Maps/docs/validation/coherence/'
rows = [l.rstrip('\n').split(' ¦ ') for l in open(W + 'items-all.txt') if l.strip()]
enrich = json.load(open(W + 'enrich.json'))
census = json.load(open(W + 'census.json'))
deep = json.load(open(W + 'deepref.json'))
fitems = json.load(open(W + 'f_items_unit.json'))

def P(i):
    return 'DETERMINISM-%04d' % int(i)

def split_list(s):
    s = s.strip()
    if not s or s == '—':
        return []
    return [x.strip() for x in re.split(r';\s+', s) if x.strip()]

def conv_ids(xs):
    out = []
    for x in xs:
        out.append(re.sub(r'(?<![\d§.])\b(0[0-9]{3})\b(?![.\d])', lambda m: P(m.group(1)), x))
    return out

def owner_part(o):
    o0 = o.split('/')[0].split('(')[0].strip()
    for k in ['determinism', 'pipeline', 'kernel', 'model', 'rendering', 'scope']:
        if o0.startswith(k):
            return k
    if re.match(r'V\d\d', o0):
        return 'volume'
    return o0

VOLNAME = {'V01': 'neighbourhoods', 'V02': 'buildings', 'V03': 'interiors', 'V04': 'underground', 'V05': 'sky',
           'V06': 'evolution', 'V07': 'village', 'V08': 'SettlementForge', 'V09': 'application', 'V10': 'clerk',
           'V11': 'content', 'V12': 'calibration'}

items = []
for r in rows:
    i, kind, where, owner, stmt, reads, used, note = r
    e = enrich.get(i, {})
    vols = sorted(set(re.findall(r'V(?:0[1-9]|1[0-2])', owner)))
    items.append({
        'id': P(i), 'kind': kind, 'sub': re.sub(r'^§?(\d+(?:\.\d+)?).*', r'§\1', where.split(';')[0].strip()),
        'statement': stmt, 'where': [w.strip() for w in where.split(';') if w.strip()],
        'owner': owner, 'owner_part': owner_part(owner),
        'subject_volumes': [v + ' ' + VOLNAME[v] for v in vols],
        'reads': conv_ids(split_list(reads)), 'used_by': conv_ids(split_list(used)),
        'note': note.strip(),
        'outside_mentions': {'keys': e.get('keys', []), 'base_sections': e.get('base_sections', []),
                             'volumes': e.get('volumes', [])},
    })

# ---- additional defined terms found in the second full read (0597-0628) ----
TERMS = [
 ('§7.3 item 1; §7.1 EditScope; §5.3', 'EFFECTIVE SCOPE: the coarsest faces covering an edit\'s scope at its level (union of chained operators\' scopes; the touched set for a designation change, dossier event, positive placement or relocation), shown before commit and stored resolved as EditScope. Names used: "effective scope", "effective-scope faces", "resolved EditScope". Hazard: "scope" also names the invariant scopes of §5.3 and the batch scope of §5.1 (5).', 'DETERMINISM-0628'),
 ('§7.3 item 1 (NF-P6); §7.3 (b) 4; §7.3 item 7 (ii); §7.3 staged-layers row', 'SEAM EXCEPTION: the neighbour-side vertices, corridor records, half-corridor strips, junction wedges, rings through those vertices and Seam records a district-scoped re-derivation may touch outside its scope; empty for the underground and island arenas. Names used: "the seam exception".', ''),
 ('§7.3 item 2; §7.3 (b) 8; §7.3 table S8-S11 row', 'TREE SCOPING: discarding every unprotected finer entity under the effective scope and re-running the refinement stages there ("sound by over-invalidation"; the primary mechanism). Names used: "tree scoping", "tree scope".', ''),
 ('§7.1 EditFate; §7.3 item 4; §7.2', 'EDIT FATE: kept / carried / orphaned / discarded (plus the listing "kept (declared)"); the list is the fate report. Names used: "fate", "fate report", "fate list", "edit-fate report", "fates".', ''),
 ('§7.1 The named actions; §7.3; §7.4', 'NAMED ACTIONS: Regenerate (keep settings), New random, Adjust, Re-derive from stage k (Sk), Same kind new seed (Enter\'s successor), Surprise me; a designation change is neither a regeneration nor a re-roll. Names used: "Regenerate (keep settings)", "faithful Regenerate", "New random", "reroll", "Re-derive from Sk", "Enter".', ''),
 ('§7.2; §7.3 item 4; §7.7 precedence', 'PROTECTION CLASSES: locked (entity or attribute paths), pinned, edited (implicit pin), assigned (held within drift bounds), dossier-backed (existence held), positively placed (placeAt pin), declared (held by its declaring event), a closure\'s created piece. Names used: "protected entity", "fixed input", "held", "kept".', ''),
 ('§5.1 (7); §5.4 requested; §5.3 requested-feature row', 'DELIVERY TIER: a requested feature is delivered full (tier <= 3), degraded (tiers 4-5) or omitted (tier 6). Names used: "full", "degraded", "omitted", "delivery tier".', ''),
 ('§5.1 (5); §5.2 F-WORK; §6.2', 'WORK LIMIT: an output-changing limit stated as an operation count law over the batch scope (WorkLimitLaw), never a time limit; its hit is E_WORK_LIMIT handled as F-WORK. Names used: "work limit", "operation count", "work-limit coefficients", "work_cut", "workLimitHits". Hazard: "work" also names item 67\'s Works records.', ''),
 ('§6.5 (9); §5.2 F-SITING; §5.3 CI-only row; §4.1', 'DERIVED-COMPLETE DIGEST: the digest of every district\'s lazily derived stages computed in random orders and pool sizes, required identical (the laziness contract\'s test). Names used: "derived-complete digest".', ''),
 ('§6.2; §6.5 (9); §7.3 item 7 (i)', 'MODEL DIGEST vs RECORDS DIGEST: the Merkle root over the eager model versus the second Merkle tree over persisted derivation and naming records (recordsDigest); goldens, locality checks and bridge convergence read the model digest alone; replay = session and truncation identity compare both.', ''),
 ('§7.4 Independence; §7.4 Independence through the input layer', 'INDEPENDENCE: the undo precondition that every later live event\'s touched set and effective-scope faces are disjoint from the target\'s (dilated one ring), extended to input-layer dependence (tables, adjust, town-wide naming reroll). Names used: "independence check", "dependent events".', ''),
 ('§7.4 Truncation; §6.5 (9) truncation identity', 'TRUNCATION: dropping an immediately undone pair from an unshared document\'s log while holding the target on the redo stack; truncation identity is its test. Names used: "truncation", "truncated log", "truncation identity".', ''),
 ('§7.4 Sessions; §7.1 EditBase.session', 'SESSION (authoring): an authoring identity per document and author holding undo and redo stacks, never read by the fold. Hazard: "session" also means the running app session (§6.5 (9) session-history independence: maps generated earlier in that session) and the live state compared by "replay = session".', ''),
 ('§7.4 Checkpoints; §6.2 (iii)', 'CHECKPOINT: a copy-on-write snapshot taken when accumulated replay cost passes 80 ms, before every epoch, rebase and upgrade, and at h0 for an off-edit-path load recomputation. Names used: "checkpoint", "h0".', ''),
 ('§7.3 item 4; §7.5; §7.6 Overrides', 'ORPHAN: an edit or override left without a target (no successor, a vanished table row, an unmapped entity), kept in the log and listed in the orphan table, never silently re-bound. Names used: "orphan", "orphaned", "orphan table".', ''),
 ('§6.4 Retention; §7.4 rebase row; §7.5; §2.9 steps 2-4', 'REBASE / FROZEN VIEW / RETENTION WINDOW: a rebase makes a state the document\'s base (reasons keptSnapshot, drawnConstraintsRebuilt, frozenImport); a document outside the N-1/N-2 window opens as a frozen view. Names used: "rebase", "rebased base", "kept snapshot", "frozen view", "frozenImport", "the window", "N-1, N-2".', ''),
 ('§7.6 Emulation first; §7.6 Per-preset values', 'PARITY PRESET / EXTENSION CELL: the MFCG and FTG presets zero every extension cell\'s chance or weight and switch its option off, resolving a cell by its own presets entry first. Hazard: "preset" also names the style preset (§7.8), the era-and-region preset (§7.7) and editPreset (§7.1).', ''),
 ('§7.6 Tables have keyed rows; §6.3 case (4); §2.8 SliceRef', 'SLICE / NAMING SLICE: the recorded unit of table dependence (row, weights, bracket, thresholds, match); a naming slice is one field of a culture or ancestry row. Names used: "slice", "naming slice", "slice kinds", "slice hash".', ''),
 ('§7.7 item 10; DerivationRow', 'DERIVATION TABLE (rows DR1-DR25): the index of map-fact families with their dossier inputs, rule home, chance concern and bar. Hazard: distinct from the derivation RECORD (§2.8) and the derivation UNIT (§6.3).', ''),
 ('§7.7 item 13; ReceiptRow', 'RECEIPT TABLE (rows F1-F22): per change kind, the receipt fields in precedence order and the response. Hazard: the F-row ids (F1 ... F22) sit beside the failure-class ids (F-NUM, F-CUT ...) in the same section family.', ''),
 ('§7.7 item 12; §6.3 Dossier bindings', 'BINDING KEY / KEY LAW / DOSSIER BINDING / CARRIED FACTS: the dossier-side identity of an element (settlement:, inst:cat:, inst:uid:, inst:name:, power:, npc:, cond:, res:, quarter:, government) bound to a map address in Document.dossier; carried facts are the "previous dossier" the port diffs against.', ''),
 ('§7.7 item 13; §7.1 EditBase.dossierChange; §5.4 ReportEntry.change', 'CHANGE ENVELOPE: the DossierChange a dossier change carries on every event it generates (changeId, source, week, cause, element, op, reason, receipts).', ''),
 ('§7.7 item 16; Assignment.claim', 'NAMING CLAIM / NAMED-FEATURE CLAIM: a quarter entering the map as a neighbourhood assignment that names and biases, never zones; a landmark string the roster demands as a feature-granularity claim.', ''),
 ('§7.7 items 3, 4; §7.1 rejectSite, placeAt; Rejection', 'REJECTION / LAPSE / POSITIVE PLACEMENT: a map "delete" of a dossier-backed element recorded as a site exclusion that lapses on growth, decline or a dossier event over its block; placeAt pins an element or designation to a plot. Names used: "rejection", "lapse", "lift", "positive placement".', ''),
 ('§7.7 item 5; §7.1 DisruptionReport; DisruptionBudgetRow', 'DISRUPTION: the cost of a placement (moved uses, joins, subtracted parts, vacated plots) against a request kind\'s budget row; a dossier event over budget still lands and is reported. Names used: "disruption", "disruption budget", "disruption report", "over budget", "disruption set".', ''),
 ('§7.7 Precedence; §7.2; §5.2 F-EDIT, F-SITING', 'PRECEDENCE ORDER: lock > dossier existence > assignment > user-drawn geometry > rule tables > defaults — the one order for every meeting of protections and inputs.', ''),
 ('§7.3 (b) 1-4; §5.2 F-REDERIVE', 'CHANGED REACH / FOOTPRINT / KEPT WAY / SUCCESSOR SITE / DETOUR BOUND: the water operator\'s vocabulary — where new shores differ from old; the union of L1 cells an edit clears; a way re-routed through a deck (arterial, sole connection, or one that crossed on a deck); the new site nearest an old deck; re-routed length <= 1.4 x the old.', ''),
 ('§7.1 twelve tools; §7.8', 'TOOLKIT LAYERS L0-L4: intent, ground and bones, programme, fabric, finish (the author may stop at any layer). HAZARD: the same labels L0-L4 name the arena refinement levels (§2.2) used in the same sections ("one L1 batch", "L0 batch", "fromLevel", §7.3).', ''),
 ('§7.7 Forms catalogue', 'FORM / FORMS CATALOGUE: a row { id, constraints, growthProgramme, signature } naming a settlement archetype; Intent.form names one.', ''),
 ('§5.1; §5.2; §5.3 epoch rows; §6.1 attempt; §7.3; §7.8', 'LADDER (naming hazard): the failure ladder (§5), the size ladder (§1.1, "rung" TOWN/CITY/METROPOLIS), the interior ladder (§2.6, item 28 (f)), the survivors\' ladder (§4.11, rungs 1-3 in §5.3\'s epoch rows) and the label rungs (F-LABEL, §9.4) all appear in this unit with "rung" for their steps (see DETERMINISM-0025).', ''),
 ('§5.3 scopes; §5.1 (5) batch scope; §7.3 item 1; §7.1 EditScope', 'SCOPE (naming hazard): invariant scope (batch-local ... CI-only), batch scope (the count a work-limit law reads), edit scope (EditScope) and effective scope are four meanings of one word in this unit.', ''),
 ('§7.7 preamble; §7.7 items 1-16; §7.1; §7.8', '"ITEM n" (naming hazard): "§7.7 item n" is the dossier contract\'s item; bare "item n" elsewhere is the owner\'s amendment item; inside §7.7 bare items 12-16 mean contract items while amendment items 12-16 exist with other meanings (see DIC-05).', ''),
]
base_n = 596
for k, (where, stmt, _x) in enumerate(TERMS, start=1):
    n = base_n + k
    items.append({'id': P(n), 'kind': 'term', 'sub': where.split(';')[0].split(' ')[0], 'statement': stmt,
                  'where': [w.strip() for w in where.split(';')], 'owner': 'determinism', 'owner_part': 'determinism',
                  'subject_volumes': [], 'reads': [], 'used_by': ['every reader of this unit; the glossary (principle (2))'],
                  'note': 'added in the second full read', 'outside_mentions': {'keys': [], 'base_sections': [], 'volumes': []}})

N_ITEMS = len(items)
n_terms = sum(1 for x in items if x['kind'] == 'term')
by_kind = collections.Counter(x['kind'] for x in items)
by_owner = collections.Counter(x['owner_part'] for x in items)
vol_subj = collections.Counter(v for x in items for v in x['subject_volumes'])

XC = [
 dict(id='DXC-01', severity='minor', items=['DETERMINISM-0027'], other='§3.1 KernelError (kernel unit; = KXC-01)',
      claim='§5.2 F-NUM lists E_OUT_OF_RANGE among the detections of an optional chain\'s precision failure (re-propose, then reject the chain), while §3.1 classes E_OUT_OF_RANGE as a caller bug reported with its stream key and never stored; the two units classify one code two ways.',
      ruling_hint='§3.1 is the code\'s home: F-NUM drops E_OUT_OF_RANGE from its detection column, or §3.1 states that an optional chain\'s out-of-range point is handled by F-NUM.'),
 dict(id='DXC-02', severity='minor', items=['DETERMINISM-0046'], other='§3.8 skeleton validator (kernel unit; = KXC-04)',
      claim='F-SKELETON\'s detection restates §3.8\'s validator as three checks (non-planar, non-monotone faces, inconsistent heights) and omits the fourth (connected, exactly h independent cycles for h holes).',
      ruling_hint='F-SKELETON cites "§3.8\'s post-conditions" instead of restating them.'),
 dict(id='DXC-03', severity='minor', items=['DETERMINISM-0111', 'DETERMINISM-0112'], other='§3.1 Warning type (kernel unit; = KXC-05)',
      claim='§5.4 kernel.warnings enumerates 8 of the 12 Warning codes (W_PLACED, W_PROMOTED, W_STEINER, W_DOWNGRADE absent; W_DOWNGRADE presumably counted as kernel.downgrades).',
      ruling_hint='kernel.warnings reads "every Warning code of §3.1"; kernel.downgrades is stated to count W_DOWNGRADE.'),
 dict(id='DXC-04', severity='major', items=['DETERMINISM-0348', 'DETERMINISM-0349', 'DETERMINISM-0431', 'DETERMINISM-0432', 'DETERMINISM-0433', 'DETERMINISM-0434', 'DETERMINISM-0435', 'DETERMINISM-0429', 'DETERMINISM-0430', 'DETERMINISM-0438', 'DETERMINISM-0439'],
      other='V09 §4.3 "The tool binding table — every edit kind and where a user reaches it" (T-V9-12); V10 §3.5 tool encoders; f items 368 (BCR-V10-20: delete joins T10), 570, 353, 272 and the other §7.1 f items (582, 348-368, 571)',
      claim='Principle (7) requires every edit kind to have its tool. §7.1\'s twelve-tools table maps 40 of the 70 EditEvent kinds (31 by name, the eight plan events and adjust by description); 30 have no row: unlock, unpin, moveVertex (named only as a handle drag), drawBoundary (named only in the points-form prose), swapUse, setAttrMany, instance, delete, merge, rejectSite, unassign, drawPassage, drawTunnel, drawChamber, addLink, addUndergroundAccess, placeAccess, convert (every ConversionOp), startWorks, cancelWorks, placeLight, rerollLayer, editTable, editPreset, closeup, epoch, rebase, upgrade, undo and redo (script count over the union and the table). V09 §4.3 maps every kind to a home tool, with homes the base does not state (delete -> T10, startWorks/cancelWorks -> T9, placeLight and rerollLayer of style concerns -> T12, rerollLayer(naming) -> T11, drawTunnel/addLink -> T4, drawChamber/placeAccess/addUndergroundAccess/relet/use conversions -> T6, sealing/ladder/decline conversions -> T9). §7.4\'s create column cites tools §7.1 does not define: "the Works tools (§7.1)", "the light tool (§7.1)", "building tools (§7.1)", "the underground tools", "a building\'s context action (§7.1)", "context actions".',
      ruling_hint='One canonical home for the event -> tool binding (the base, since "the tool API and these events are the base\'s", or V09 §4.3 with §7.1 pointing to it); the table covers every EditEvent kind (history kinds marked with their producer); §7.4\'s create cells cite that home by tool id.'),
 dict(id='DXC-05', severity='minor', items=['DETERMINISM-0500', 'DETERMINISM-0019', 'DETERMINISM-0194'],
      other='V11 §2.1 "The table registry"; §14 @plat/tables list; §4.2 S1 (5) (crossing.searchBandM, pipeline unit)',
      claim='Two registries of the editable tables: §7.6\'s prose enumeration and V11 §2.1\'s table registry (one row per table). Neither lists reroll.maxAdvance ("a table value, default 3", §5.1 (6)) or crossing.searchBandM ("default 120 m", §4.2 S1 (5), restated in §6.3\'s anchor table), which the text calls table values.',
      ruling_hint='One home for the registry (principle (1)); the other points to it; both table values get a named table and row, or are declared constants.'),
 dict(id='DXC-06', severity='major', items=['DETERMINISM-0040', 'DETERMINISM-0030', 'DETERMINISM-0058'],
      other='§3.2 (2) class floors; §4.7 plot tables (= KXC-02, major on the kernel side)',
      claim='§5.2 F-PLOT states the minimum plot wedge angle 12 deg and F-CORRIDOR/§5.3\'s class-floor row check "the class minimum width and area" and "min width / area / angle per class"; the floors\' named constants (minPlotWidth 2.5 m, minInteriorAnglePlot 12 deg, minCorridor per class) exist only in §3.2 (2), which says they come from the stage tables, and no table carries them (minCorridor has no value anywhere).',
      ruling_hint='One home for the class floors (a §4.7 table row with every value), read by §3.10\'s and §5.3\'s class-floor checks and cited by F-PLOT and F-CORRIDOR without values.'),
]

IC = [
 dict(id='DIC-01', severity='minor', items=['DETERMINISM-0054', 'DETERMINISM-0122', 'DETERMINISM-0111', 'DETERMINISM-0063', 'DETERMINISM-0102', 'DETERMINISM-0106'],
      where=['§5.3 preamble and rows', '§5.4 GenerationReport'],
      claim='§5.3 defines five invariant scopes (batch-local, stage-end, save, load, CI-only) and assigns load to four rows (the stored binding equals the fold; the neighbourhood character recomputation; the decoded snapshot\'s roots and chunk hashes; the replayed roots), but GenerationReport.stages[].invariants[].scope is \'batch\'|\'stage\'|\'save\'|\'ci\' — a load-scope failure has no scope value to be reported under.',
      required='Add \'load\' to the report\'s scope enumeration (the verification replay on load rebuilds the report, §5.4).'),
 dict(id='DIC-02', severity='minor', items=['DETERMINISM-0016', 'DETERMINISM-0023', 'DETERMINISM-0028', 'DETERMINISM-0140', 'DETERMINISM-0148', 'DETERMINISM-0150', 'DETERMINISM-0151'],
      where=['§5.1 tier table', '§5.2 F-CUT', '§6.1 attempt component and registry'],
      claim='"Attempt cap" has two readings: the tier table says "<= 3 attempts per reroll", F-CUT runs attempts 0-2 (k x 36 deg, 2 turns) and style.random draws "attempt 0-2" — the cap as a count of attempts; yet many concerns declare "attempt cap 0" (use.relocate, plan.program/roles/furnish, reserve.market, cut.interior, cut.stop, works, pin.light, render.stampTiles), which under the count reading means no draw at all, so there the cap must be the highest attempt index — under which "cap 3" is four tries.',
      required='Define the cap once (e.g. "the highest attempt index; attempts run 0 ... cap") and restate the geometric ladders\' value in that sense (2 for three attempts, or 3 for four).'),
 dict(id='DIC-03', severity='minor', items=['DETERMINISM-0049', 'DETERMINISM-0050', 'DETERMINISM-0111', 'DETERMINISM-0114'],
      where=['§5.2 F-WORK, F-BUDGET-TIME and every ladder column', '§5.4 GenerationReport, Telemetry'],
      claim='F-WORK says "report work_cut with the count" and F-BUDGET-TIME "telemetry records time_over", but the report\'s fields are kernel.workLimitHits and stages[].work, and Telemetry.timeOver is a StageId list; ladderUses.cause is a free string and no registry lists the cause codes the ladders write (work_cut, time_over, W_CUT_SLID, "not built", "no crossing", "no alternative within the ladder", unserved, ...).',
      required='One cause-code enumeration (§5.4) naming each code, its class and its field; the F-rows use those names.'),
 dict(id='DIC-04', severity='minor', items=['DETERMINISM-0572', 'DETERMINISM-0151', 'DETERMINISM-0563'],
      where=['§7.7 item 10', '§7.7 DR21'],
      claim='Item 10 says the derivation table is an INDEX whose rule is "stated there, never here", yet DR21\'s chance cell restates §6.1\'s works keying (start offset in the epoch\'s span first, duration second; keyed by the target\'s lineage with the epoch\'s week and epoch component; a dated change\'s duration alone).',
      required='DR21\'s chance cell reads "works (§6.1)".'),
 dict(id='DIC-05', severity='minor', items=['DETERMINISM-0510', 'DETERMINISM-0511', 'DETERMINISM-0246', 'DETERMINISM-0529', 'DETERMINISM-0573', 'DETERMINISM-0588'],
      where=['§7.7 preamble and items 1-16', '§7.1 RosterLine', '§7.8 layer controls'],
      claim='The "§7.7 item n" convention names the dossier contract\'s items, but inside §7.7 bare "item 12", "item 13", "item 14" and "item 16" mean contract items (Assignment.state "through item 14\'s rows", DR25 "item 14", "item 16 below") while the owner\'s amendment items 12 (underground neighbourhoods), 13, 14 (existence by tier), 15 and 16 (relation templates) exist and are cited bare elsewhere in the unit (§7.1 RosterLine "item 16\'s relation templates"; §7.8 "items 13, 14, 15").',
      required='Inside §7.7 cite the contract\'s own items as "§7.7 item n" (or rename them, e.g. "clause n"), keeping bare "item n" for the owner\'s items.'),
 dict(id='DIC-06', severity='minor', items=['DETERMINISM-0349', 'DETERMINISM-0593'],
      where=['§7.1 twelve tools', '§7.8 T1 intend', '§13.2 test ids'],
      claim='The tool ids T1-T12 share the T-prefix namespace with test ids (T8-1 ... T8-3, T12-1, T19-4, T65 fixtures, T73-8): "T8" and "T12" read as either a tool or an item\'s test group (§16 also cites "item 101\'s T2-T8" for tools). Principle (4) requires ids unique across the set.',
      required='Always cite tools with their names (T8 `fill`) or give tools a distinct prefix.'),
 dict(id='DIC-07', severity='minor', items=['DETERMINISM-0349', 'DETERMINISM-0624'],
      where=['§7.1 twelve tools (layers L0-L4)', '§7.3 (b) L0/L1 batches; §2.2 levels'],
      claim='The toolkit\'s commitment layers are labelled L0-L4 (intent ... finish), the same labels as the arena refinement levels L0-L4 used in the same sections (a warp\'s fromLevel 0|1, "one L1 batch", "one L0 batch").',
      required='Rename the toolkit layers (e.g. A0-A4, or by word only).'),
 dict(id='DIC-08', severity='minor', items=['DETERMINISM-0435'], where=['§7.4 delete/merge/split/join/convert row'],
      claim='The migrate cell reads "same" with no referent (the previous row\'s "replays; a footprint whose host plot is unmapped re-creates a plot around it" does not fit merges, splits or conversions).',
      required='State the row\'s migrate behaviour (e.g. "replays at its log position; an unmapped target is orphaned and reported").'),
 dict(id='DIC-09', severity='minor', items=['DETERMINISM-0289'], where=['§7.1 EditEvent moveStairCore'],
      claim='moveStairCore.bay is typed Polygon; every other event geometry is PolygonCm (the unit-carrying type of §2.1).', required='Type it PolygonCm.'),
 dict(id='DIC-10', severity='minor', items=['DETERMINISM-0125', 'DETERMINISM-0591'], where=['§5.4 prose', '§7.8 proxy thumbnails'],
      claim='Text defects: "what moved, wasjoined or vacated" (§5.4); "a proxy is  bit-identical" (§7.8, double space).', required='Fix the words.'),
 dict(id='DIC-11', severity='minor', items=['DETERMINISM-0586'], where=['§7.7 Forms catalogue'],
      claim='"(should-have; the schema is the must-have hook)" leaves whether the thirteen listed forms ship open — priority wording that reads as a deferral under principle (6); every form row is otherwise stated.',
      required='State the catalogue as built (its milestone) or cite the ruling that stages it.'),
 dict(id='DIC-12', severity='minor', items=['DETERMINISM-0150', 'DETERMINISM-0151', 'DETERMINISM-0152', 'DETERMINISM-0199', 'DETERMINISM-0362', 'DETERMINISM-0468', 'DETERMINISM-0492', 'DETERMINISM-0493', 'DETERMINISM-0500', 'DETERMINISM-0578'],
      where=['§6.1 registry', '§6.3 JOIN and SPLIT', '§7.2 field brushes', '§7.4 Independence', '§7.5 schema transforms', '§7.6 tables', '§7.7 item 13'],
      claim='Narration of how the text evolved (principle (5)): "Appended by the amendments of 2026-09-25 (items ...)", "Appended with them", "Appended by the amendments of 2026-09-27 ...", "Retired by the same amendments", "Readers the amendments of 2026-09-27 and 2026-09-28 add" (§6.1); "(J-DET-2, amended so)" (§6.3); "the static base behaves exactly as it did before item 31" (§7.2); "(Fable review 2026-09-27; J-Fdet-1)" in a heading (§7.4); "The schema transforms the amendments of 2026-09-25 add" and "... of 2026-09-27 and 2026-09-28 add" (§7.5); "the rows the amendments of ... add" (§7.6); "the ten rows the survey\'s verification corrected" (§7.7 item 13).',
      required='Remove the narration (the validation records keep it); keep the ids.'),
]

WG = [
 dict(id='DWG-01', severity='major', kind='undefined outcome / dangling output', items=['DETERMINISM-0027', 'DETERMINISM-0043', 'DETERMINISM-0109', 'DETERMINISM-0111'],
      claim='Three ladders end in "a bug that aborts the batch (or rung) with its stream key": F-NUM on a mandatory chain\'s E_OUT_OF_RANGE, F-PLAN\'s refusal of a seed, passage or composer ring, and F-PLAN\'s tier 6 when the capacity-bounded household count cannot be cut. §5.3 defines a hard invariant\'s abort (the batch rolls back, its ladder continues), but a bug abort has no stated outcome — whether the stage continues, what the building or chain becomes, what the user sees — and the stream key it "reports" has no field: GenerationReport records stream keys only for ladder uses.',
      link='§5.4 gains a bug/abort list (class, entity, stream key, stage) and §5.1 states the outcome of a bug abort (e.g. the batch rolls back and its entity takes the class\'s last rung, reported), with a test in §13.1.'),
 dict(id='DWG-02', severity='minor', kind='undefined type', items=['DETERMINISM-0111'],
      claim='Type Diff (GenerationReport.requestedVsBuilt: Diff[]; §14\'s migrate returns { doc, diff: Diff }) is defined nowhere in the base or the twelve volumes (grep).',
      link='Define Diff once (its fields: requested value, built value, reason) at §5.4, and name §7.5\'s diff shape (entities changed, orphans, changed confirmations, statistics deltas) as the same or a separate type.'),
 dict(id='DWG-03', severity='minor', kind='table value without a table', items=['DETERMINISM-0019', 'DETERMINISM-0017', 'DETERMINISM-0190', 'DETERMINISM-0417', 'DETERMINISM-0194'],
      claim='reroll.maxAdvance ("a table value, default 3"; read by §5.1 (6), §6.3 case (3) and §7.3 item 10) and crossing.searchBandM ("default 120 m"; §4.2 S1 (5), §6.3\'s bridge anchor radius) are called table values, but no table in §7.6\'s list, §14\'s @plat/tables or V11\'s registry carries them.',
      link='Name each value\'s table and row (and its range for the tables editor), or declare it a constant.'),
 dict(id='DWG-04', severity='minor', kind='field without semantics', items=['DETERMINISM-0111'],
      claim='GenerationReport.stages[].attempts: number has no producer rule and no reader; nothing says what it counts (tier-3 retries, all ladder uses, kernel attempts).',
      link='State what it counts and who reads it (the report panel, §13.2\'s cost tests), or drop it (ladderUses already records every retry).'),
 dict(id='DWG-05', severity='minor', kind='registry path without its row (PLAUSIBLE)', items=['DETERMINISM-0194', 'DETERMINISM-0184'],
      claim='§2.8\'s entity registry declares an anchor encoding, hysteresis radius and class family per type "(§6.3)", and §6.3 says every re-derived entity is matched by its anchor; §6.3\'s anchor table has no row for several re-derivable kinds the unit names — yard parts (S11 units, §6.3\'s derivation units), a block\'s Frontage record (only its split rule is stated), Corridor records, the Castle, decorations and institutions — so their succession on re-derivation is undefined.',
      link='Add their anchor rows (or state that they are re-derived without succession, their references carried by a named rule).'),
 dict(id='DWG-06', severity='minor', kind='routing (F-MISSING at assembly)', items=['DETERMINISM-0349', 'DETERMINISM-0563'],
      claim='g items reaching the program after the volumes pass name this unit as a home and have no text in it yet: item 111 (§7.1: T2\'s spring flag) and item 113 (§7.7: the history replay at generation and the derivation rows for history). Item 112 names no §5-§7 home. In addition 83 f items are routed to this unit\'s subsections and are not yet applied (the volumes were designed as if they were): §5.2 5, §5.3 5, §5.4 3, §6.1 5, §6.3 3, §7.1 24, §7.3 4, §7.4 3, §7.6 9, §7.7 19, §7.8 3.',
      link='The Assemble seat applies f items 327-404, 570, 571, 581, 582, 584 and g items 111 and 113 at these homes.'),
]

BR = [
 dict(id='DBR-01', ref='§4.5 (5), §4.5 (6), §4.5 (3)', at='§5.2 F-SITING (band-range re-homing); §7.7 items 13-14 (impaired dial term); DR9 (distributions)',
      status='§4.5 holds two numbered lists with the same numbers (S7b\'s 1-7: sky pseudo-districts (5), underground pseudo-district (6), district claims (3); and item 72\'s character list: band range (5), three dials (6), three distributions (3)); the references resolve to the character list by content only, while S7b\'s items are cited as "S7b (n)".'),
 dict(id='DBR-02', ref='"the Works tools (§7.1)", "the light tool (§7.1)", "building tools (§7.1)", "the underground tools", "a building\'s context action (§7.1)"', at='§7.4 create column',
      status='no such named tools in §7.1 (its toolkit has twelve tools, none of these names); they resolve to V09 §4.3\'s rows (T9, T12, T6, T4) — see DXC-04.'),
]

RESTATE = [
 ('DETERMINISM-0005', '§4.2 S1-S3', 'tier-0 feasibility: river descent, stage budgets from demand, precincts reserved'),
 ('DETERMINISM-0029', '§4.6 step 8 (a)', 'F-CUT constants: frame turns of 36 deg x 2, substitution only <= 2 x the band\'s upper block area, <= 6 kernel calls, residue soft band <= 5 %'),
 ('DETERMINISM-0038', '§4.8', 'castle repair constants: compactness 0.75, 5 % bloat steps, <= 20 passes of 20 %, stop below 0.001 gain'),
 ('DETERMINISM-0040', '§4.7 / §3.2 (2)', 'minimum plot wedge angle 12 deg (DXC-06)'),
 ('DETERMINISM-0046', '§3.8', 'the skeleton validator\'s checks (DXC-02)'),
 ('DETERMINISM-0112', '§3.1', 'the Warning code list (DXC-03)'),
 ('DETERMINISM-0221', '§3.2', 'topology on integer centimetres with exact predicates (§6.5 (1))'),
 ('DETERMINISM-0378', '§4.7 S10 step (0)', 'margin band width 2 m'),
 ('DETERMINISM-0486', '§2.9', 'the 2 MB cap on pack data and host content'),
 ('DETERMINISM-0506', '§4.6 step 5; §4.7 S11', 'per-preset values: cut.flattenM 8 m (MFCG), jitter 4.8 m / 2 m (MFCG), FTG 0'),
 ('DETERMINISM-0194', '§4.2 S1 (5)', 'crossing.searchBandM default 120 m (bridge anchor radius)'),
 ('DETERMINISM-0121', '§1.1 / §12.2', 'the 1 500-person TOWN floor and 120 000 metropolis cap (also stated in §7.7 item 15)'),
 ('DETERMINISM-0582', '§1.1 / §12.2', 'the same floor and cap in §7.7 item 15'),
 ('DETERMINISM-0037', '§4.2 S3 (7)', 'F-WALL: N = 0 adds no main gate; a sealed circuit\'s harbour gate'),
 ('DETERMINISM-0041', '§4.5 (5); J-A72.50', 'F-SITING: a household no district\'s range admits is housed at the nearest range'),
 ('DETERMINISM-0074', 'II.7.5', 'undercity bound per rung: TOWN rarely 1, CITY 1-2, METROPOLIS <= 3'),
 ('DETERMINISM-0085', '§2.6 rule 4', 'the tiered wing test cost, about 0.06-2.7 us a building'),
 ('DETERMINISM-0390', '§2.3 / §12.4', 'whole-grid drainage re-run about 16-17 ms at CITY'),
 ('DETERMINISM-0152', '§4.11; §4.5; II.2; II.3; II.7', 'the extra readers of existing concerns (their keying stated here as well as at the readers\' homes)'),
 ('DETERMINISM-0572', '§6.1', 'DR21\'s works keying (DIC-04)'),
 ('DETERMINISM-0506', '§7.6 own / §13.5', 'the parity rows\' resolution order is stated here and relied on by §13.5 (T23-1) — home here, listed for the matrix'),
 ('DETERMINISM-0082', '§4.8 harbour furniture', 'the harbour-work definition (a pier, mole or breakwater arm rooted on one shore) used by the deck invariant'),
]

DUPS = [
 ('dossier population floor 1 500 and cap 120 000 with E_RUNG_UNAVAILABLE', ['§5.4 last paragraph', '§7.7 item 15'], ['DETERMINISM-0121', 'DETERMINISM-0582']),
 ('the dossier-owned refusal and its list of dossier-owned values', ['§5.2 F-EDIT', '§7.1 setAttr(knownTo) paragraph', '§7.1 institutions row', '§7.1 dry-run paragraph', '§7.4 setAttr row', '§7.7 items 7 and 11'], ['DETERMINISM-0051', 'DETERMINISM-0124', 'DETERMINISM-0324', 'DETERMINISM-0338', 'DETERMINISM-0347', 'DETERMINISM-0424', 'DETERMINISM-0558', 'DETERMINISM-0574']),
 ('creation events, dossier events and epochs carrying one are no undo, redo or revert targets', ['§5.2 F-EDIT', '§7.4 Replay semantics', '§7.4 Targets', '§7.4 Independence', '§7.4 rejectSite row', '§7.7 items 3, 5, 6'], ['DETERMINISM-0051', 'DETERMINISM-0420', 'DETERMINISM-0438', 'DETERMINISM-0464', 'DETERMINISM-0467', 'DETERMINISM-0556']),
 ('the creation prefix and its read-ahead by S2 and the declaring stages', ['§6.2', '§7.1 EditBase.creation', '§7.4 Replay semantics', '§7.7 One path'], ['DETERMINISM-0158', 'DETERMINISM-0159', 'DETERMINISM-0419']),
 ('continuity over path independence (histories, not states)', ['§6.2', '§7.7 item 6'], ['DETERMINISM-0177', 'DETERMINISM-0557']),
 ('rung reroll counters stored absolutely in regenerate events; the elaboration cache outside both digests', ['§6.1 stage-3 rungs', '§6.2 elaboration cache', '§7.4 regenerate-with-rung row'], []),
 ('workers merge in lineage order', ['§6.2 (no worker timing)', '§6.3 Workers', '§6.5 (6)'], ['DETERMINISM-0203', 'DETERMINISM-0228']),
 ('host tables arrive as logged events with provenance host', ['§6.2', '§6.5 (8)', '§7.6 Host tables'], ['DETERMINISM-0160', 'DETERMINISM-0230', 'DETERMINISM-0509']),
 ('Surprise me draws the intent on intent.surprise of a fresh seed', ['§7.1 named actions', '§7.7 layer 1'], ['DETERMINISM-0317', 'DETERMINISM-0516']),
 ('every re-roll is scoped; an unscoped new town only in the empty state', ['§7.1 New random', '§7.3 item 10'], ['DETERMINISM-0314', 'DETERMINISM-0417']),
 ('dossier existence below the lock; closest option, never omitted', ['§5.2 F-SITING', '§7.7 Precedence'], ['DETERMINISM-0041', 'DETERMINISM-0542']),
 ('an upgrade\'s undo record is its from version', ['§7.4 upgrade row', '§7.5 (2) undo'], ['DETERMINISM-0457', 'DETERMINISM-0488']),
 ('sugar events expand by their recorded sugar.json version', ['§7.1 sugar bullet', '§7.4 sugar row', '§7.5 Sugar events'], ['DETERMINISM-0431', 'DETERMINISM-0494']),
 ('dossier-backed existence is held on every map', ['§5.3 dossier row', '§7.2 Protection', '§7.7 item 2'], ['DETERMINISM-0357']),
 ('declared means held', ['§7.2', '§5.3 declared row'], []),
 ('a dossier event\'s disruption computed at dry run and stored in the event', ['§7.1 dry-run paragraph', '§7.7 item 5'], ['DETERMINISM-0347']),
 ('slug normalisation and class read apart from identity', ['§6.3 / §6.1 keying', '§7.7 item 12'], ['DETERMINISM-0577']),
 ('case (4) renames listed, confirmed and stored in the event', ['§6.3 names', '§7.3 item 4', '§7.4 table preamble'], ['DETERMINISM-0422']),
 ('the terrain operator re-bases what stands on changed ground', ['§7.2 terrain brush', '§7.3 (a) 4'], []),
 ('the reroll.maxAdvance advance rule', ['§5.1 (6)', '§6.3 case (3)', '§7.3 item 10'], ['DETERMINISM-0017', 'DETERMINISM-0190', 'DETERMINISM-0417']),
]

EL = [
 ('DEL-01', 'The concern registry (§6.1) is a table in disguise: about 70 concerns across six prose paragraphs with per-concern attributes (geometry or not, rerollable, attempt cap, readers, keying, extra readers, retired). One table (id, kind, rerollable, cap, keyed by, readers, home) keeps every value and removes the narration of DIC-12. Nuance to keep: each concern\'s keying sentence as its cell; the retired ids reserved.'),
 ('DEL-02', 'F-EDIT\'s detection and action columns (§5.2) are a catalogue of about 25 refusal causes restated from §7.1, §7.3, §7.4, §7.5 and §7.7; a refusal-reason table (reason, detection, offered action, home) would be the one home the dry run, the lifecycle rows and the dossier contract cite. Nuance: each case\'s offered alternative differs and stays its own row.'),
 ('DEL-03', 'Rename { id, from, to } (§7.1) and ReportEntry\'s rename variant { id, from, to } (§5.4) are one shape; DisruptionReport.moved { use, from, to | null } and ReportEntry\'s relocate { use, from?, to? } are one family. Nuance: nullability of to differs (a vacate has no destination).'),
 ('DEL-04', 'The dossier-owned refusal is stated six times (DUPS) — one home (§7.7 item 11) with the others citing it.'),
 ('DEL-05', 'The "no undo target" rule for creation events, dossier events and epochs carrying one is stated in seven places — one home (§7.4 Replay semantics).'),
 ('DEL-06', 'One event -> tool binding table (DXC-04) instead of §7.1\'s partial table, §7.4\'s create-column tool names and V09 §4.3\'s table.'),
 ('DEL-07', 'The world-point records under a warp (§7.4, seven kinds in one long sentence with per-kind host rules, clearance and re-seat/orphan behaviour) as one table (record, host face, clearance, re-seat, orphan rule). Nuance: the door light\'s ring-edge fraction rule and Works\' rings never re-seated.'),
 ('DEL-08', 'The schema transforms of §7.5 (two long paragraphs) as one table (record or field, older-document default, first-load derivation, source item). Nuance: "none is invented" cases stay rows.'),
 ('DEL-09', 'The §7.6 table enumeration (prose, about 60 tables) as a pointer to one registry (DXC-05) with readers, slice kinds and extension/presets columns.'),
 ('DEL-10', '§5.3 rows that restate their rules\' homes (epoch rows, Works, underground U1-U3, basement accesses, concealed institutions, clusters) could state only the check and scope and cite the rule\'s home. Nuance: the scope and the check columns are §5.3\'s own and stay.'),
]

EDGES = [
 'A bug abort (F-NUM mandatory chain, F-PLAN ring refusal, F-PLAN count): outcome after the abort undefined (DWG-01).',
 'reroll.maxAdvance exhausted while building the three variations of §7.3 item 10: how many variations are shown (fewer than three? duplicates?) is not stated.',
 'New random on a scope entity (or a rung counter) already at the user cap 32 767: the next reroll is not stated (rerolls from 32 768 are reserved for faithfulness references).',
 'A warp session applied with no strokes (Apply on an empty session): whether an empty warp event is committed is not stated.',
 'drawBoundary whose polygon covers no L1 cell by at least 50 %: outcome (refused, bent to the nearest cell, empty district) not stated.',
 'setAttrMany whose query resolves to zero ids; roster with zero lines; group with zero quarters; fill or regenerate on an EditScope ring covering no face: outcomes not stated.',
 'A request kind with no DisruptionBudgetRow, or a budget of 0: outcome not stated.',
 'A dossier event that changes a value a user edit had already overridden as a map fact (e.g. a later dossier knownTo on a place whose knownTo the user set while it was a map fact): whether the user\'s value is superseded and listed as a fate is not stated.',
 'An undo section record larger than the 20 MB cap by itself: whether it is kept, dropped with a rebuild-by-replay, or withdrawn is not stated (the cap is stated for the section).',
]

counts = {
 'items': N_ITEMS, 'facts': N_ITEMS - n_terms, 'terms': n_terms, 'by_kind': dict(by_kind),
 'by_owner_part': dict(by_owner), 'subject_volumes': dict(vol_subj),
 'restatements_cross_part': len(RESTATE), 'internal_duplications': len(DUPS), 'internal_conflicts': len(IC),
 'cross_part_conflicts': len(XC), 'broken_references': len(BR), 'wiring_gaps': len(WG),
 'elegance_candidates': len(EL), 'edges_observed': len(EDGES),
 'findings_by_severity': dict(collections.Counter([x['severity'] for x in XC + IC + WG])),
}
ref_census = {
 'method': 'every §x.y, II.x, J-, D-, item, test id, bench id, finding code and file reference in §5-§7 extracted by script (census.json); 70 distinct qualified references (rule n, step n, (n), Sk (n)) checked against their target text (deepref.json) and the semantic targets spot-read; J-, D- and owner-decision ids looked up in ARCHITECTURE-RATIONALE.md; G-* codes in docs/design/judging.md; test ids in §13',
 'section_refs_total': census.get('section_refs_total'), 'section_refs_distinct': census.get('section_refs_distinct'),
 'section_refs_unresolved': 0, 'part_ii_unresolved': 0, 'qualified_refs_checked': len(deep),
 'qualified_refs_unresolved': 0, 'qualified_refs_ambiguous': 1,
 'decision_ids_total': census.get('decision_ids_total'), 'decision_ids_distinct': census.get('decision_ids_distinct'),
 'decision_ids_outside_tables': ['J80 (owner decisions, RATIONALE)', 'J86 (owner decisions, RATIONALE)'],
 'test_ids_cited': ['T19-4', 'T65', 'T73-8', 'T66-5', 'T23-1 (all defined in §13.2 / §13.5)'],
 'tool_ids_colliding_with_tests': ['T8 (fill) vs T8-1..T8-3', 'T12 (dress) vs T12-1'],
 'bench_ids': [b[0] for b in census.get('benchmarks', [])],
 'volume_refs_in_unit': 0,
 'note_volume_refs': 'the unit cites no volume by id (V01-V12); every volume subject is reached through PART II, II.6-II.7, "staged" rows or item numbers; the f items route the volumes\' hooks into it',
 'design_paths_not_yet_on_disk': ['plat/tools/stamptiles/', 'tables/dossier/* (derivation, site, wealth, receipts, status, quarters, landmarks)'],
 'error_codes_checked': ['E_REBASE_AT (§14, line 14439)', 'E_RUNG_UNAVAILABLE (§14 port)'],
}
routing = {'f_items_by_subsection': {k: [i for i, _ in v] for k, v in fitems.items()},
           'f_items_total': sum(len(v) for v in fitems.values()),
           'g_items_naming_this_unit_from_111': ['111 (§7.1: T2\'s spring flag)', '113 (§7.7: history replay at generation; derivation rows for history)'],
           'g_items_naming_this_unit_before_111': ['102 (§6, §7.6)', '103 (§7.6)', '104 (§7.7)', '105 (§7.7)', '106 (§5.2 F-WALL, §7.7 DR2)', '108 (§7.7 DR9)', '109 (§7.7 DR1)', '110 (§5.3 deck invariant, §6, §7.1 T3/T4)']}
words = {'unit': 63117, '§5': 11083, '§6': 12912, '§7': 39122}

doc = {
 'key': 'coherence/inventory-determinism', 'unit': 'determinism',
 'scope': 'base part §5 failure handling, §6 determinism, §7 editing (top-level headings "## §5 ", "## §6 ", "## §7 ")',
 'source': {'file': 'docs/ARCHITECTURE.md', 'lines': '6794-9514 (§5 6794-7030, §6 7031-7794, §7 7795-9514)', 'md5': '01fea21f4b353adc62f7a1fe4719595e', 'words': words},
 'counts': counts, 'reference_census': ref_census, 'routing': routing,
 'items': items,
 'restatements': [{'item': a, 'canonical_home': b, 'fact': c} for a, b, c in RESTATE],
 'internal_duplications': [{'fact': a, 'places': b, 'items': c} for a, b, c in DUPS],
 'internal_conflicts': IC, 'cross_part_conflicts': XC, 'broken_references': BR, 'wiring_gaps': WG,
 'elegance_candidates': [{'id': a, 'what': b} for a, b in EL], 'edges_observed': EDGES,
 'evidence': 'CONFIRMED by grep or script: DXC-04 (V09 §4.3 table read), DXC-05 (V11 §2.1 heading; grep for reroll.maxAdvance and crossing.searchBandM), DIC-01, DIC-06 (T8-n and T12-1 in §13.2), DWG-02 (Diff defined nowhere), DWG-03, DWG-06 (f and g files parsed), DBR-01 (both §4.5 lists read). The other DIC and DWG items are readings of the unit (PLAUSIBLE until the canon rules); DWG-05 is PLAUSIBLE (the registry\'s per-kind anchor paths were not enumerated). Nothing here is a ruling.',
}
json.dump(doc, open(OUT + 'inventory-determinism.json', 'w'), indent=1, ensure_ascii=False)

# ---------------- markdown ----------------
def esc(s):
    return str(s).replace('|', '\\|').replace('\n', ' ')
M = []
M.append('# Inventory — base part §5 failure handling, §6 determinism, §7 editing (coherence/inventory-determinism)\n')
M.append('PROGRESS')
M.append('- source: docs/ARCHITECTURE.md lines 6794-9514 (md5 01fea21f), 63 117 words (§5 11 083, §6 12 912, §7 39 122) — read whole twice: the item pass (items 0001-0596) and a second full read for conflicts, wiring, restatements and edges (added terms 0597-0628)')
M.append('- working store: docs/validation/coherence/work/determinism/ (items-all.txt, findings.txt, census.json, deepref.json, enrich.json, f_items_unit.json, build.py); this file and inventory-determinism.json are generated by build.py')
for s in ['§5 failure handling (5.1-5.4)', '§6 determinism (6.1-6.5)', '§7 editing (7.1-7.8)', 'defined terms', 'reference census (script) and qualified-reference check', 'outside-mention wiring enrichment (identifier keys over the base outside §5-§7 and V01-V12)', 'f and g routing lists', 'internal and cross-part conflicts, wiring gaps, restatements, duplications, elegance, edges', 'generate .json and .md']:
    M.append('- [x] ' + s)
M.append('\n## Outcome\n')
M.append('%d inventory ids (DETERMINISM-0001 … DETERMINISM-%04d): %d normative items plus %d defined terms. By kind: %s.' % (N_ITEMS, N_ITEMS, N_ITEMS - n_terms, n_terms, ', '.join('%s %d' % kv for kv in by_kind.most_common())))
M.append('')
M.append('Ownership (the `owner` field): %s. Volume subjects the unit carries (hooks, staged rows, records the volumes build on): %s. The unit cites no volume by id; every volume subject is reached through PART II, II.6-II.7, "staged" rows or amendment items, and 83 unapplied f items route the volumes\' hooks into it (routing below).' % (', '.join('%s %d' % kv for kv in by_owner.most_common()), ', '.join('%s %d' % kv for kv in vol_subj.most_common())))
M.append('')
M.append('Findings: %d cross-part conflicts (2 major), %d internal conflicts or ambiguities, %d wiring gaps (1 major), %d references that do not resolve cleanly (0 unresolved at section level; 70 qualified references checked), %d cross-part restatements, %d duplications inside the unit, %d elegance candidates, %d edges observed without a stated outcome.' % (len(XC), len(IC), len(WG), len(BR), len(RESTATE), len(DUPS), len(EL), len(EDGES)))
M.append('')
M.append('Wiring convention: `reads` = what the item depends on or is produced by; `used by` = what reads, calls, renders, exports or tests it. In-unit ends are inventory ids; outside ends are section and name. `outside_mentions` (JSON only) lists the base sections outside §5-§7 and the volumes whose text names the item\'s identifier-like keys (script), for the wiring graph: %d items have keys, %d are named in at least one volume.' % (sum(1 for x in items if x['outside_mentions']['keys']), sum(1 for x in items if x['outside_mentions']['volumes'])))
M.append('\n## Findings for the canon\n')
M.append('Evidence: ' + doc['evidence'] + '\n')
M.append('### Cross-part conflicts\n')
M.append('| id | sev | items | other unit | claim | ruling hint |\n|---|---|---|---|---|---|')
for x in XC:
    M.append('| %s | %s | %s | %s | %s | %s |' % (x['id'], x['severity'], ', '.join(x['items']), esc(x['other']), esc(x['claim']), esc(x['ruling_hint'])))
M.append('\n### Internal conflicts and ambiguities\n')
M.append('| id | sev | items | where | claim | required |\n|---|---|---|---|---|---|')
for x in IC:
    M.append('| %s | %s | %s | %s | %s | %s |' % (x['id'], x['severity'], ', '.join(x['items']), esc('; '.join(x['where'])), esc(x['claim']), esc(x['required'])))
M.append('\n### Wiring gaps\n')
M.append('| id | sev | kind | items | claim | missing link |\n|---|---|---|---|---|---|')
for x in WG:
    M.append('| %s | %s | %s | %s | %s | %s |' % (x['id'], x['severity'], x['kind'], ', '.join(x['items']), esc(x['claim']), esc(x['link'])))
M.append('\n### References that do not resolve cleanly\n')
M.append('| id | reference | at | status |\n|---|---|---|---|')
for x in BR:
    M.append('| %s | %s | %s | %s |' % (x['id'], esc(x['ref']), esc(x['at']), esc(x['status'])))
M.append('\nReference census: ' + ref_census['method'] + '. Section references: %s in %s distinct targets, all resolve; PART II references all resolve; decision ids: %s in %s distinct, all present (J80 and J86 are owner-decision ids in the rationale, not table rows); test ids T19-4, T65, T73-8, T66-5, T23-1 are §13\'s; E_REBASE_AT and E_RUNG_UNAVAILABLE are §14\'s; G-* codes are docs/design/judging.md\'s; the unit cites no volume by id. Design paths not yet on disk (plat/tools/stamptiles/, tables/dossier/*) are code paths of the build, not broken references.' % (ref_census['section_refs_total'], ref_census['section_refs_distinct'], ref_census['decision_ids_total'], ref_census['decision_ids_distinct']))
M.append('\n### Restatements (fact owned elsewhere, stated in §5-§7 with its value)\n')
M.append('| item | canonical home | fact |\n|---|---|---|')
for a, b, c in RESTATE:
    M.append('| %s | %s | %s |' % (a, esc(b), esc(c)))
M.append('\n### Duplications inside the unit\n')
M.append('| fact | stated at | items |\n|---|---|---|')
for a, b, c in DUPS:
    M.append('| %s | %s | %s |' % (esc(a), esc('; '.join(b)), ', '.join(c)))
M.append('\n### Elegance candidates (for the canon to rule; not findings)\n')
for a, b in EL:
    M.append('- %s: %s' % (a, b))
M.append('\n### Edges observed without a stated outcome (input to the edge catalogue)\n')
for e in EDGES:
    M.append('- ' + e)
M.append('\n### Routing — amendments that name this unit as a home (not yet applied)\n')
M.append('- f items by subsection (%d): %s' % (routing['f_items_total'], '; '.join('%s: %s' % (k, ' '.join(v)) for k, v in routing['f_items_by_subsection'].items())))
M.append('- g items from 111 (applied by every unit they name, F-MISSING if absent): ' + '; '.join(routing['g_items_naming_this_unit_from_111']))
M.append('- g items before 111 naming this unit (applied as f items): ' + '; '.join(routing['g_items_naming_this_unit_before_111']))
M.append('\n## Defined terms\n')
M.append('| id | where | concept, names used and hazard |\n|---|---|---|')
for x in items:
    if x['kind'] == 'term':
        M.append('| %s | %s | %s |' % (x['id'], esc('; '.join(x['where'])), esc(x['statement'] + ((' — ' + x['note']) if x['note'] and x['note'] != 'added in the second full read' else ''))))
M.append('\n## Inventory\n')
M.append('| id | kind | where | owner | statement | reads | used by | note |\n|---|---|---|---|---|---|---|---|')
for x in items:
    if x['kind'] == 'term':
        continue
    M.append('| %s | %s | %s | %s | %s | %s | %s | %s |' % (x['id'], x['kind'], esc('; '.join(x['where'])), esc(x['owner']), esc(x['statement']), esc('; '.join(x['reads'])), esc('; '.join(x['used_by'])), esc(x['note'])))
open(OUT + 'inventory-determinism.md', 'w').write('\n'.join(M) + '\n')
print('items', N_ITEMS, 'terms', n_terms, 'facts', N_ITEMS - n_terms, 'XC', len(XC), 'IC', len(IC), 'WG', len(WG), 'BR', len(BR), 'RS', len(RESTATE), 'DUP', len(DUPS))
