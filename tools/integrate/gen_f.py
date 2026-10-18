import re,json,glob,collections
import os; S=os.environ.get('INTEGRATE_SCRATCH', os.path.dirname(os.path.abspath(__file__)))
ROOT='/Users/cstokes/Desktop/Maps/'
order=json.load(open(S+'/arch-order.json'))
idx=json.load(open(S+'/bcr-index.json'))
recs={r['key']:r for r in json.load(open(S+'/bcr-recs.json'))}
vols={f.split('/')[-1][:3]:open(f).read() for f in glob.glob(ROOT+'docs/volumes/V*.md')}
VN={'V01':'V01','V02':'V02','V03':'V03','V04':'V04','V05':'V05','V06':'V06','V07':'V07','V08':'V08','V09':'V09','V10':'V10','V11':'V11','V12':'V12'}
def key_of(r): return r['id'] if r['id'].startswith('BCR-V') else r['vol']+':'+r['id']
def disp(k):
    if ':' in k: v,b=k.split(':'); return f"{v} {b}"
    return k
def needed(k,own):
    out={own}
    if ':' in k:
        v,b=k.split(':'); n=int(re.search(r'\d+$',b).group()); vv=int(v[1:])
        pat=re.compile(rf"(V0?{vv}['’]s BCR-{n}\b|V0?{vv} BCR-{n}\b|volume {vv}['’]s BCR-{n}\b|BCR-{n} \(V0?{vv}\))")
    else:
        pat=re.compile(re.escape(k)+r'(?![0-9])')
    for v,t in vols.items():
        if v!=own and pat.search(t): out.add(v)
    return sorted(out)
# ---- labels
BASE_V=set(['V09','V11','V12'])
def label(k,r):
    v=r['vol']; secs=[s.rstrip('*') for s in r['secs']]
    n=int(re.search(r'(\d+)$',r['id']).group(1)) if re.search(r'(\d+)$',r['id']) else 0
    t=r['title']
    if v=='V01': return ('BASE','M3a, item 110 (V01 §8.1)') if 39<=n<=44 else ('STAGED','M5, stage 2')
    if v=='V02':
        if n in (1,2): return ('BASE','M1, fields carried so stage 3 needs no migration')
        if n==28: return ('BASE','with item 109 (k)\'s crypt rule, J111')
        if n in (31,32,33,34,35,36,37,38,39,41,42): return ('BASE','M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)')
        return ('STAGED','M6, stage 3')
    if v=='V03': return ('STAGED','the plan rung, after M6b')
    if v=='V04': return ('BASE','M3a, item 110 (b)\'s record and span rule; the vault chambers M6-U') if n==45 else ('STAGED','M6-U, the underground layer')
    if v=='V05': return ('STAGED','M6-sky')
    if v=='V06':
        if n in (20,24,25): return ('BASE','M3a, item 110 (b)\'s generation and removal holds')
        return ('STAGED','M6-E, the evolution engine')
    if v=='V07':
        if n in (33,34,35): return ('BASE','M3a, item 110 (b)\'s rung gate and data key')
        return ('STAGED','the village product, V-M0 to V-M4')
    if v=='V08':
        if n==31: return ('BASE','M3a, item 110 (f)\'s removal holds')
        return ('STAGED','SettlementForge stage, SF0 to SF7')
    if v=='V09':
        if n in (20,21,22): return ('STAGED','M6-U, with the underground layer (AP6)')
        if n in (17,18): return ('BASE','§16 bookkeeping')
        return ('BASE','M1–M3b, the reference UI (AP1–AP4)')
    if v=='V10':
        if n in (5,7,8,9,11,14,16,19): return ('STAGED','M3c, the built-in clerk')
        return ('BASE','M3a, the oracle and the tool API (item 101)')
    if v=='V11':
        if n in (14,15): return ('STAGED','M6-U, the underground layer')
        if n==9: return ('NONE','a request to volume 8, not a base change')
        return ('BASE','the content milestones C1 to C8')
    if v=='V12':
        if n in (3,4,11,22): return ('STAGED','M-CAL, the corpus reconciliation')
        return ('BASE','M-1–M4, the calibration rig')
    return ('?','')
# ---- merges and notes
merged={}   # member -> item key
items=[]    # (sectionKey, title, body, members, label)
def add(sec,title,body,members,lab):
    items.append(dict(sec=sec,title=title,body=body,members=members,label=lab))
    for m in members: merged[m]=title
add('§14','The package list: four new packages after `@plat/hood`',
 "V01 BCR-1 replaces the `@plat/hood` line and extends `@plat/tables` and `@plat/model`; after it, in this order, BCR-V2-18's `@plat/buildings` line (with its dependency-rule changes), V04 BCR-12's `@plat/under` line and BCR-V7-10's `@plat/village` line. All four quote the same current line; they add, none removes another's. Texts: V01 §10, V02 §10, V04 §10, V07 §10.",
 ['V01:BCR-1','BCR-V2-18','V04:BCR-12','BCR-V7-10'],('STAGED','each with its own stage (M5, M6 for stage 3, M6-U for the underground, the village product)'))
add('II.7.4','`AccessPoint.kind` gains `sinkhole`, `collapsed_shaft`, `ruin_entrance` (g item 109 (j) (3) (ii))',
 "A duplicate pair: V04 BCR-29 and V01 BCR-37 request the same three kinds; applied once, with V01's comment clause appended (\"each a `HoodPlace` of kind `opening` on the surface, volume 1 V1-3.7.1\").",
 ['V04:BCR-29','V01:BCR-37'],('STAGED','M6-U, the underground layer'))
add('4.11','The phase-based evolution strategy, with the product override',
 "BCR-V6-1 (a) as written, with BCR-V7-18 absorbed into it (volume 6's X4): a step's phase is the override `ProductDecl.phases` of the product whose ladder holds the epoch's target declares, else the strategy's. BCR-V6-1 (b) (the package) as written.",
 ['BCR-V6-1','BCR-V7-18'],('STAGED','M6-E'))
add('7.1','A quarter\'s target size in its points form, and the badge\'s plus and minus',
 "One text (C10-21 (3)): BCR-V10-12's `sizeM2` comment and *Points in, shape out* sentence (identical to BCR-V9-16 (a)), applied once; BCR-V9-16's `### 9.5` part (plus and minus step the declaration's size by (band max − band min) ÷ 8) applied as written.",
 ['BCR-V10-12','BCR-V9-16'],('BASE','M3a'))
add('10.2','`PortRows.customKinds`: the fallback class retired',
 "**Conflict resolved (J-VI.20):** BCR-V11-26 retires `fallbackClass` (a custom kind's class is item 104 (a)'s resolution, V11 §3.13); BCR-V8-29 kept the row type with it. Applied: BCR-V8-29's row type **without** `fallbackClass`, with its comment (\"the rows in force are this table's, empty in the base, overlaid at read time by one row per carried custom institution …\"); V08's `customKinds` write no class (X-V11-1).",
 ['BCR-V11-26','BCR-V8-29'],('BASE','the content milestones; the read-time overlay with the SettlementForge stage'))
add('8.4','`LayerSpec` gains `showCircuit` and `underView`; `showUnexcavated` is a view key',
 "BCR-V9-25's `showCircuit` and V04 BCR-10's `underView` are added to `LayerSpec`. **Conflict resolved (J-VI.19):** V04 BCR-10 also put `showUnexcavated` on `LayerSpec`; volume 9 made it a per-viewer view key (BCR-V9-20; J-V9.38; XV-V9-3). Applied: the view key of BCR-V9-20 only; V04 BCR-10's `LayerSpec.showUnexcavated` is dropped and V04 reads the view key (IN-V04-11). V04 BCR-10's §8.2 roles and §14 keymap parts apply as written.",
 ['BCR-V9-25','V04:BCR-10'],('BASE (showCircuit, M3a) / STAGED (underView, M6-U)',''))
add('11.1','GeoJSON: closures (item 106) and item 110\'s entities — one text for both variants',
 "**Conflict resolved (J-VI.18):** BCR-V9-31 (a) and BCR-V12-17 name the same entities differently. Applied in this order: BCR-V12-15 (a) and (b) (closing edges as LineStrings of kind `closure` carrying the barrier kind of J-VI.3's six, the enclosure Polygon, gate kinds; the metric variant's properties); then one item-110 clause for both GeoJSON variants: every way carries `part` (0 the ground); a raised way's LineString adds `raisedKind` (`viaduct` · `elevated` · `aqueduct`), `source` (`generated` · `declared` · `carried`), `reason` (`drop` · `link` · `water`, absent when declared; J-VI.2), `deckMinCm` and `deckMaxCm`; each support a Polygon of kind `raisedSupport` (`way`, `key`, `state`); each span a Polygon of kind `span` (`use`); an aqueduct's channel is its way's LineString (class `aqueduct`); a retaining wall a LineString of kind `retaining` (`highSide` of the vertex order, `stepMinCm`, `stepMaxCm`, `material`, `state`); stairs and ramps as `stair` and `ramp` flags on the way segments they occupy; a plot or building on a deck `onDeck` (its deck kind) and `deck` (the host's id); a stepped building `tiers` (the count). BCR-V9-31 (b) (SVG, PNG) and (c) (VTT) and its CityJSON and glTF clauses apply as written.",
 ['BCR-V12-15','BCR-V12-17','BCR-V9-31'],('BASE','M3a (item 110) and M2b (item 106)'))
add('II.7.6','The Vaults bullet: the cistern sentence',
 "V04 BCR-45's Vaults sentence supersedes V04 BCR-20's cistern sentence (V04 BCR-46's note); BCR-20's squares clause and its `II.6` `SewerStrategy` part apply as written.",
 ['V04:BCR-20'],('STAGED','M6-U'))
add('2.7','**The raised-way record** (g item 110 (b), homed by the coherence pass) — one record for all volumes',
 "**Consolidated (J-VI.2, J-VI.15, J-VI.21).** A raised way is a `Way` (§2.4) on a ground arena part ≥ 1 whose `Way` record gains `raised?: RaisedWayRecord`, declared in §2.7: `{ kind: 'viaduct'|'elevated'|'aqueduct'; source: 'generated'|'declared'|'carried'; reason?: RaisedReasonKey /* generated and carried ways; volume 6 §2.13; the reason WORD shown by readers and exports is derived: viaduct → 'drop', elevated → 'link', aqueduct → 'water' */; foundedRung?: Rung /* volume 6 §3.19.1 */; underuseSince?: number /* volume 6 */; supports: { key: number; ring: Polygon; state?: 'ruined'|'cleared' }[]; spans: { a: number; b: number; use: 'open'|'vault'; reason: 'way'|'water'|'flood'|'tall'|'low'|'slope'|'chance'|'cap'|'land'|'user'; soffitCm: Cm /* derived */; held?: true; state?: 'ruined'|'cleared' }[]; terminal?: { kind: 'basin'|'cistern'|'fountain'; at: PointCm; building?: Id }; feeds?: Id[]; waterUse?: Id }`. Sources of the fields: V04 BCR-45 (supports, spans and **the span rule**, terminal, feeds, `raised.deckDepthCm` 150 and `raised.supportFoundationCm` 400), BCR-V6-25 (b) (reason key, `underuseSince`, the span and support `state`), BCR-V8-28 (`waterUse`), J-VI.2 (`source`, the derived word), J-VI.9 (`terminal.kind` `cistern` only under a conduit house the roster or dossier holds). Lifecycle: generated ways re-derive with their reason key; declared ways are held; a removal of a generated way is a suppression (the suppression item); undo is the log's; migration: absent `raised` is a ground way. The **II.7.6 Vaults** sentence is V04 BCR-45's.",
 ['V04:BCR-45','BCR-V8-28'],('BASE','M3a (the record and span rule); the arch-vault chambers M6-U'))
add('4.3','**The raised ways\' generation**: slot, stream, ledger, rung gate, data key and read-only outcome (g item 110 (b))',
 "**Consolidated.** (1) The slot: every generated raised part is committed before S7b (1) — a viaduct inside S4's route solve priced against the detour, an elevated road and an aqueduct at S6's end — reading the ground arena only and, for the aqueduct's need, S2's whole population (V01 BCR-39 (a)–(c); BCR-V5-29 (a) is the same slot, applied once). (2) The derivation unit and stream: volume 6's `RaisedReasonKey`, one uniform per key on the raised-way stream (epoch component 0), the kind order aqueduct, viaduct, elevated, and the `RaisedWayLedger` against volume 11's caps, suppressed keys skipped (BCR-V6-25 (a), (c), (d)). (3) The rung gate: the router prices a span only when the routed rung is CITY or METROPOLIS (BCR-V7-33, provenance owner). (4) `raised` as a stage-graph data key (BCR-V7-35). (5) Endpoints bind to reservations, ground-arena entities only, water from ground sources, `skyAccessObstacles` read after SKY, no way into the sky (BCR-V5-29 (b)–(f), **as J-VI.4 (d) bends it**). (6) `raisedOutcome(model, subject)`, read-only (BCR-V10-21). Raised ways and retaining walls are casters of item 102's daylight driver (BCR-V6-25 (d)).",
 ['V01:BCR-39','BCR-V6-25','BCR-V7-33','BCR-V7-35','BCR-V5-29','BCR-V10-21'],('BASE','M3a; (5)\'s sky clauses with M6-sky'))
add('2.7','**The `RetainingWall` record** (g item 110 (a)) — one record for all volumes',
 "**Consolidated.** `RetainingWall { id; chain: ChainRef /* on the ground layer, or on a sky island's arena (BCR-V5-27) */; highSide: 'left'|'right' /* resolved at the dry run when drawn without it (BCR-V9-26 (a)); generated: the side D holds (V01 BCR-42) */; closed: boolean /* a platform, high side inside (BCR-V9-26 (a)) */; material: string /* volume 11's MaterialRow key (BCR-V11-30) */; buttresses?: …; towers?: … /* decorative, a table row */; source: 'generated'|'declared'; state?: 'decayed'|'ruined' /* BCR-V6-26's DeclineOp */ }`; the step profile is a **derived view** `stepProfile(wall)` never stored (V01 BCR-43). Never an `Enceinte`; no gate, no circuit, no barrier closure. Lifecycle as item 110 (a) states.",
 ['V01:BCR-43','BCR-V5-27'],('BASE','M3a; the island form M6-sky'))
add('2.7','**Deck plots** (g item 110 (d)) — the record\'s fields',
 "**Consolidated (volume 2's X28, BCR-V9-30).** A deck plot is a `Plot` whose record gains `deck?: { host: Id; kind: 'bridge'|'pier'|'mole'|'quay'; surfaceCm: Cm | null /* null: a quay platform built on the bank, ground */; landmark: boolean /* a mole's head or mid-mole slot, or a bridge's mid-span slot */ }`; S11 copies it to volume 2's `DeckContext`. A `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no deck plot. The landmark slots are a mole's head and midpoint and, on a bridge whose deck span is at least volume 11's `deck.landmarks/bridgeMid/minSpanM` (40 m), one mid-span slot, offered to a tower or fort class only; registry path `deck/landmarks/<head|mid>` (IN-V02-3). Budget and admission are volume 11's `deck` rows and `deckOk` column.",
 ['BCR-V9-30'],('BASE','M3a'))
add('2.8','**Removals that hold**: one suppression mechanism for re-adding generators',
 "BCR-V6-24 as written, its `suppress.kind` widened (J-VI.14) to `'raised'|'harbourChain'|'quayWall'|'island'|'skyAccess'`: an island's slot and a generated access's ordinal (volume 5's `removedSlots`, `removedAccesses`) are suppressions of the same mechanism; a cap increase opens only new keys; lifted only by the delete's undo or the user's re-add serving the same key (volume 8's X8, C5-51). BCR-V8-31 (§7.7 item 3: generated content no dossier record binds is deleted as any generated content, and the deletion holds through regeneration, every absorb and every epoch) applies beside it.",
 ['BCR-V6-24','BCR-V8-31'],('BASE','M3a (raised, harbour chain, quay wall); islands and accesses M6-sky'))
add('7.7','**Derivation-row numbers** (J-VI.13)',
 "The rows the volumes add after DR25 are numbered: DR26 = V01's DR-V1.1 (V01 BCR-29); DR27 = V05's DR-SKY (BCR-V5-12); DR28 = V06's DR-V6.1 = V08's DR-V8.6, one row (BCR-V6-12, BCR-V8-30); DR29–DR33 = DR-V8.1–DR-V8.5; DR34 = DR-V8.7; DR35 = DR-V8.8 (BCR-V8-11, BCR-V8-30 and V08 §2.6a–§2.6b). The volumes' working names stay as aliases. Each row's text is its volume's BCR (listed under §7.7 below); this item fixes only the numbers.",
 [],('BASE (numbers)',''))
add('5.4','Two generator report codes (volume 8, X10; J-VI.15)',
 "§5.4's report vocabulary gains `aqueduct_no_source` (an aqueduct reason met with no higher source within reach, V08 §2.6b (1) (b)) and `toll_bridge_dry` (a dossier toll bridge on a site with no water to cross, V08 §2.6b (3)), each a `MsgRef` key with its arguments.",
 [],('STAGED','SettlementForge stage'))
notes={
 'BCR-V3-26':"Its rule-5 text is dropped: BCR-V2-41 carries rule 5 (V03's own condition; group with BCR-V2-41). Its `Entrance.storey` field and rule-4 change apply.",
 'BCR-V2-41':"Applied before BCR-V3-26; carries rule 5 for both volumes.",
 'V04:BCR-2':"Applied before BCR-V6-5 (b), which then inserts `formerClass` into the `Way` line without `flowToward`.",
 'BCR-V6-5':"Its (b) inserts into the `Way` line as V04 BCR-2 leaves it. `repairRaised` among its `EvolveOp`s is BASE at M3a with item 110 (b) (volume 6's X13).",
 'BCR-V9-21':"Merged with V04 BCR-8's `from?: PointsForm`: `drawChamber { system: Id | { newKind: 'ruin'|'cavern'|'catacomb' }; polygon; floorCm?; from? }`.",
 'V04:BCR-8':"Its `drawChamber` gains BCR-V9-21's `system` union; its `depthOffsetCm` \"refused past the cover limit\" reads \"bent to the cover limit\" (J-VI.4).",
 'BCR-V9-22':"Applied after V04 BCR-24 (both extend §7.3 item 9 (d)); its last resort reads, by J-VI.4, \"else a public opening of kind `collapsed_shaft` at the nearest public ground above the cluster, cause `edit`\" instead of F-EDIT.",
 'V04:BCR-24':"Applied before BCR-V9-22 in §7.3 item 9 (d).",
 'BCR-V7-29':"Applied after BCR-V5-3 (the village order has no SKY step).",
 'BCR-V5-15':"Applied after BCR-V5-5 (same Fields sentence).",
 'BCR-V9-2':"BCR-V6-11 (b) edits the same T1 cell; both apply (T1's gesture: the walls chip and the time card).",
 'BCR-V6-11':"See BCR-V9-2 for the shared T1 cell.",
 'BCR-V8-9':"BCR-V7-17 rides on it (applied after).",
 'BCR-V7-17':"Applied after BCR-V8-9.",
 'BCR-V9-26':"`drawWay` carries both `raised?: true` (this BCR) and BCR-V7-19's `walk?`; its retaining form is the `RetainingWall` record's producer; its uphill-aqueduct last resort is the bend to a well (J-VI.4 (h)); its island strokes bend per J-VI.4 (d)–(e).",
 'BCR-V7-19':"`drawWay` also carries BCR-V9-26's `raised?`.",
 'BCR-V12-1':"Its `reference` union (with `VG`, `FM`) is the one text; BCR-V7-23's baseline additions apply beside it.",
 'BCR-V7-23':"Its `reference` union is BCR-V12-1's.",
 'BCR-V10-5':"`generate`'s options: `scratch?` (this BCR) with BCR-V8-2's `docId?` and `prefix?`, one signature.",
 'BCR-V8-2':"`generate`'s options also carry BCR-V10-5's `scratch?`.",
 'BCR-V9-5':"Applied after BCR-V10-1 (the `why` member as BCR-V10-1 extends it); the `members` query stays withdrawn.",
 'BCR-V9-11':"Its `arcs.barrier` takes J-VI.3's six kinds; applied before BCR-V9-12 and BCR-V9-27 (same `PreviewResult`).",
 'BCR-V9-12':"Applied after BCR-V9-11, before BCR-V9-27.",
 'BCR-V9-27':"Applied last of the three `PreviewResult` changes.",
 'BCR-V10-3':"Applied before BCR-V9-19 (same registry paragraph).",
 'BCR-V9-19':"Applied after BCR-V10-3.",
 'BCR-V12-20':"`d5` becomes the array; BCR-V9-24's `ux?` follows it.",
 'BCR-V9-24':"Its `ux?` follows BCR-V12-20's `d5` array.",
 'BCR-V2-14':"With BCR-V7-13: `extension.over: 'MFCG'|'FTG'|'VG'|'FM'|'both'|'none'`; `presets` gains `VG?` and `FM?`.",
 'BCR-V7-13':"See BCR-V2-14 (one union with `FM`).",
 'BCR-V2-15':"Applied before BCR-V2-36 (§8.6's sentence order).",
 'BCR-V2-24':"Applied before BCR-V2-34 (`BuildingInput`).",
 'BCR-V2-32':"Applied before BCR-V2-42 (the datum sentence).",
 'BCR-V2-11':"With BCR-V3-29 on the same §6.3 table (a new row before the room row; the room row amended).",
 'BCR-V01:BCR-5':"",
 'V01:BCR-5':"Co-applies with BCR-V7-14 (the `District.fabric` comment and `fabricParams.depthRatio`).",
 'V04:BCR-4':"Co-applies with V01 BCR-41 on the `District` record (`core?` and `terrace?`).",
 'V01:BCR-29':"Its DR-V1.1 is numbered DR26.",
 'BCR-V5-12':"Its DR-SKY is numbered DR27.",
 'BCR-V6-12':"Its DR-V6.1 is numbered DR28 (one row with DR-V8.6).",
 'BCR-V8-30':"Its DR-V8.x rows are numbered DR28–DR35.",
 'BCR-V5-10':"Edited in place for J-VI.4: the T4 stroke to a rim is bent, never refused.",
 'BCR-V10-20':"`delete` in T10: its dry run of a generated re-addable entity names the suppression (BCR-V6-24).",
 'V01:BCR-42':"The district-edge source of `RetainingWall`s (the record item).",
 'BCR-V2-42':"Reads the `RetainingWall` record's chain.",
 'BCR-V6-26':"Its `DeclineOp` members write the raised-way, retaining-wall and deck `state` fields of the consolidated records.",
}
nonbase={'V04:BCR-34':"carried in V04 BCR-14's DR17 cell; a pointer, no text of its own",
 'V04:BCR-44':"carried in V04 BCR-3's `Tunnel` line",
 'BCR-V5-23':"a request to volume 6 (§2.1 `EpochOps.demandTaken`), carried there (V06 X10)",
 'BCR-V5-28':"a request to volume 6 (the participant table), carried by IN-V06-3",
 'BCR-V11-9':"a request to volume 8 (`kinds` pseudo-classes, `goodWords`), carried by X-V11-1",
 'BCR-V9-4':"withdrawn by volume 9 (J-V9.36)",'BCR-V9-6':"withdrawn by volume 9 (J-V9.33)"}
# ---- per-BCR items
seen=set()
bykey={}
for r in idx:
    k=key_of(r)
    if k in bykey: continue  # V11 amendment duplicates
    bykey[k]=r
for k,r in bykey.items():
    if k in merged or k in nonbase or k=='BCR-V11' : continue
    if not r['secs']: continue
    sec=r['secs'][0].rstrip('*')
    lab=label(k,r)
    title=re.sub(r'^\*\*|\*\*$','',r['title']).strip()
    title=re.sub(r'^BCR-[A-Za-z0-9.\-]+\s*[—–-]\s*','',title).strip().rstrip('.')
    V01T=json.load(open(S+'/v01titles.json'))
    if k in V01T: title=V01T[k]
    elif title.startswith('`#') or title.startswith('#'): title='change to '+title.strip('`').split(' ',1)[1][:90]
    add(sec,title,None,[k],lab)
# ---- sort and number
def pos(sec):
    return order.get(sec,[10**9,''])[0]
items.sort(key=lambda it:(pos(it['sec']), 0 if it['body'] else 1))
out=[]
out.append("# Amendments f — the design volumes' base change requests, consolidated (2026-09-29)\n")
out.append("> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).\n")
out.append("""Numbered from **200** (file g's owner rules occupy 102 onward). **NOT APPLIED** — the coherence, cohesion and wiring pass
(`workflows/18-coherence.js`) applies these items to `docs/ARCHITECTURE.md` (md5 01fea21f… when this file was written) as
it applies file g's; it applies file g first, since several items below add to what g homes (item 110's records, item
102's daylight term, items 103–109's rows). Source: every `## 10` section of `docs/volumes/V01`–`V12` as landed by their
second-round revisions and corrected by the integration lane (`docs/volumes/_integrate.md`, decisions J-VI.n; the
volumes' "Integration notes" sections).

**How to read an item.** *Single source*: the requesting volume's BCR holds the exact heading, the current text quoted
once and the new text or mechanism; an item names it and does not copy it (V01 and V04 number their requests `BCR-n`
and are cited "V01 BCR-n", "V04 BCR-n"). An item that consolidates several requests, or resolves a conflict between
them, states the merged change in full. File g's base mechanisms are cited by item, never restated. **Needed by** lists
the requesting volume and every volume whose text cites the request. **BASE** means the change is built within the
base's milestones (M-1 to M4b, §16), with the milestone named; **STAGED** means it is applied to the design now and
built with the named staged milestone (the owner's roadmap). Order: base-section order of the design; within one
section, consolidated items first, then the requests in the order listed, which is the application order wherever two
touch one sentence (the notes say so).

**Four rules bind every item** (the integrator's rulings, `_integrate.md` §2.2): **(R-a) item 101 R2** (J-VI.4) — where a
request's new text says an infeasible declaration is "refused" for any reason but a dossier fact or a lock, the pass
writes the bend J-VI.4 names ("bent to the nearest lawful …", the request's offer becoming the bend or its first
alternative); **(R-b) one vocabulary** — the raised way's reason words `drop`/`link`/`water` (J-VI.2) and the six
closure-arc barrier kinds `shore`/`cliff`/`gorge`/`marsh`/`sheer`/`enceinte` (J-VI.3) wherever a request spells them
otherwise; **(R-c) volume 11 owns values** — where a request restates a value volume 11's tables hold (the catacomb
growth cap, J-VI.6; the deck landmark span, J-VI.8), the table's cell is cited and the restated number dropped.
**(R-d) milestone ids** (J-VI.22) — "M6" is volume 2's stage 3 (M6a–M6c); the underground layer's milestone is **M6-U**
(volume 4's §16 row, V04 BCR-13), beside M6-sky and M6-E.

*Not items* (listed so nothing is re-found): """+"; ".join(f"{disp(k)} — {v}" for k,v in nonbase.items())+""". The clean-room scan's
recommendation (widening `doc_checks.py`'s C1 corpus, `_integrate.md` §4) is RV-pc-2 (a)'s, routed by the retrovalidation
with its exact text; it is not repeated here.

---
""")
n=200; numbering={}
cursec=None
for it in items:
    sec=it['sec']
    if sec!=cursec:
        cursec=sec
        out.append(f"\n### {order[sec][1].lstrip('#').strip()}\n")
    lab=it['label']
    labs=lab[0]+(f" ({lab[1]})" if lab[1] else '')
    if it['body']:
        need=sorted(set(v for m in it['members'] for v in needed(m, bykey[m]['vol'] if m in bykey else m[:3])) ) if it['members'] else []
        mem=", ".join(disp(m) for m in it['members'])
        out.append(f"**{n}.** {it['title']}. {it['body']} *Requests:* {mem or '— (integration)'}. *Needed by:* {', '.join(need) if need else 'the volumes named'}. **{labs}.**\n")
    else:
        m=it['members'][0]; r=bykey[m]
        need=needed(m,r['vol'])
        others=[s.rstrip('*') for s in r['secs'][1:]]
        also=f" Also touches: {', '.join('§'+s if not s.startswith('§') and not s.startswith('II') else s for s in others)}." if others else ''
        note=notes.get(m,'')
        out.append(f"**{n}.** {disp(m)} ({r['vol']} §10, l. {r['line']}) — {it['title']}.{also}{(' *Note:* '+note) if note else ''} *Needed by:* {', '.join(need)}. **{labs}.**\n")
    for m in it['members']: numbering[m]=n
    numbering.setdefault('__title__'+it['title'][:40],n)
    n+=1
open(ROOT+'docs/AMENDMENTS-2026-09-28f.md','w').write('\n'.join(out))
json.dump(numbering,open(S+'/f-numbering.json','w'),indent=0)
print('items',n-200,'last',n-1)
