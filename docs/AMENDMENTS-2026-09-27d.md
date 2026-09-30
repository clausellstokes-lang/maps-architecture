# Amendments d — candidate amendments from the dossier survey's plan seat (2026-09-27 evening)

> Written by the Fable seat (lane sf/plan; `research/sf/PLAN.md` is the plan these items serve). **Not applied.** Numbering
> continues from `docs/AMENDMENTS-2026-09-27c.md` (last item 72) and stops below 101, where `docs/AMENDMENTS-2026-09-27e.md`
> begins. Every item builds on OWNER RULE item 20 (h) (`docs/AMENDMENTS-2026-09-27c.md` §G) and names which of its parts
> (i)–(v) it extends; none repeats or contradicts it, and none asks SettlementForge for anything (20 (h) (iv)).

**How to apply.** After pass c has applied items 20 (h) and 32–72, with
`Workflow({ scriptPath: ".../workflows/12-amendments-c.js", args: { amendmentsFile: "docs/AMENDMENTS-2026-09-27d.md", items: "73-88" } })`,
before item 101's short pass and before the freeze. Gates: (1) every item states its evidence — the SettlementForge facts
are CONFIRMED by the surveys and re-derived by `research/sf/mapping-verify.md` where a V-id is given; the proposals are
PLAUSIBLE, the program's own; (2) SettlementForge field names and values are quoted freely (the owner's own project); no
SettlementForge code is excerpted, and nothing from SettlementForge's map programs or map designs enters (none was read);
(3) the doc checks run as for every pass; (4) build work each item adds is priced in `research/sf/PLAN.md` §5 and must be
carried into §16's rows as that section states (+4.5 / +6 pw over M1, M2b, M3a and M4; the roadmap's SettlementForge
stage stays unpriced).

**Legend per item:** **Section** (the design homes) · **Design says** · **Dossier fact** (CONFIRMED, with its source) ·
**What changes** (the editor change) · **Why** · **Scope** (BASE = stage 1; STAGED HOOK = a roadmap stage, hook text now) ·
**Milestone** · **Evidence**. "The port" is `@plat/port` of item 73; "the plan" is `research/sf/PLAN.md`; `s`, `g`, `m`,
`o` cite `research/sf/dossier-{seam,generation,model,outputs}.md`; V-ids cite `research/sf/mapping-verify.md`; mapping
rows, T-tables, R-rows, G-D gaps, F-rows and J-M calls cite `research/sf/mapping.md`.

---

## A. The port — package, identity, change feed, clock (items 73–76)

73. **THE DOSSIER PORT — one package, one interface, an adapter boundary (extends item 20 (h) (iv)).**
    *Section:* §14 (the package list, the dependency chain, the extension points), §11.4 (host inputs: doors 1 and 2),
    §7.7 item 8 (what is staged).
    *Design says:* §14 lists no port; §11.4 door 2 says a dossier change "arrives as such events with `author: 'host'` and
    `EditBase.dossier` set" and names no producer of those events; §7.7 item 8 says "the mapping of SettlementForge's own
    data onto the host door is the owner's later stage"; item 20 (h) (iv) names "the dossier port (§14)" as the home of
    the optional-field declarations — a home §14 does not yet have.
    *Dossier fact:* a change reaches any consumer as a whole new dossier — no change stream, no revision counter, only
    the end state after a multi-week advance (V52, V56); the dossier is one JSON object of 41 top-level keys whose records
    are keyed by NAME (V2; o§3.2); SettlementForge's own carve-out plan expects a separate program with its own package
    identity, exchanging versioned data only, its fixtures serialised rather than its engine a dev-dependency
    (s E-1, E-3, E-9).
    *What changes:* (a) §14 gains `@plat/port` — "the one door for dossier facts: door 1's blueprint at creation, door 2's
    events afterwards; SettlementForge's shapes are read in exactly one adapter folder, `adapters/sf/<line>/`, one per
    SettlementForge product line, each a pure function to the neutral `DossierDigest`; a lint of §6.5 (3)'s kind rejects
    any SettlementForge key outside it" — placed `… ← edit ← export ← port ← api ← app` in the dependency rule, depending
    on `model`, `tables`, `edit` and `content`, imported only by `api` and the reference app's host glue; (b) the types
    `DossierPort` (`digest`, `creation`, `absorb`), `PortResult` (`ok` | `refused` with `E_RUNG_UNAVAILABLE`,
    `E_UNKNOWN_SHAPE`, `E_LINE_UNSUPPORTED`), `PortNote`, `HostContext` (every field optional: `week`, `realm`, `audience`,
    `displayNames`, `line`), `RealmBlock` and `DossierDigest` exactly as the plan's §2.2 writes them; (c) §11.4 gains
    "for a dossier, door 1's blueprint and the log's creation prefix, and door 2's events and epochs, are produced by
    `@plat/port`; the host passes the whole dossier and, when it has them, the optional fields of `HostContext`, and
    nothing else"; (d) §7.7 item 8 is reworded: "the port's creation half is the base's (M1, exercised by the fixture bench
    of item 83, never by a live host), its absorb half lands with this contract at M3a, and its wiring to a live host
    bridge is the owner's SettlementForge stage".
    *Why:* item 20 (h) (iv) needs a concrete home; one package with a lint-enforced adapter boundary is what makes a later
    connection a registration — a new adapter folder for a new SettlementForge line — instead of a rewrite, and keeps
    every other package ignorant of a host's field names (item 21 (d): a data protocol only).
    *Scope:* BASE for the package, the types and the creation half; STAGED HOOK for the host wiring. *Milestone:* M1
    (package, digest, creation half, test-side), M3a (absorb), the SettlementForge stage (wiring).
    *Evidence:* CONFIRMED — §14's list read (no port); V2, V52, V56; s C-15 and E-1/E-3/E-9. PLAUSIBLE — the interface's
    shape (the plan's J-P1, J-P2).

74. **THE BINDING TABLE'S KEY LAW, ITS HOME AND ITS RE-BINDING RECEIPTS (makes item 20 (h) (v) concrete).**
    *Section:* §2.9 (`Document`), §2.8 (`Identity.dossier`), §7.1 (`DossierRef`), §14 (the port), §6.3.
    *Design says:* item 20 (h) (v) proposes that "the map binds its own stable record id to that dossier key in a binding
    table kept in the map document; a dossier rename arrives as a dossier change and re-binds; … two dossier records of one
    name are disambiguated by the dossier's own ordering and reported" — no key law, no table shape, no receipt list;
    `DossierRef = { element: string; version?: string }` "the dossier's identifier for the element", unspecified.
    *Dossier fact:* no institution record carries an `id` at birth (0 of 5 846) and SettlementForge's own code calls the
    name "its join key" (V2); every present `catalogId` equals the slug of its record's name at birth, but 695 of 5 846
    records (11.9 %, in 129 of 155 dossiers — every `cascade` record, most `coherence_repair`, all `faction_boost`) have
    no `catalogId`, and none of the six ways the simulator or an event adds an institution writes one (V3, V57);
    SettlementForge's legacy anchor precedence is `cat:<catalogId>` → `uid:<localUid>` → `name:<slug>` (V4); the only
    institution renames the line performs are a calamity DEMOTION (`demotedFrom`, `worldPulseFate: 'demoted_by_disaster'`,
    id re-minted, the OLD kind's `catalogId` kept) and a reconstruction UPGRADE (`promotedFrom`,
    `'upgraded_by_reconstruction'`, likewise) — the institution rename writer is built but has no caller and no
    `rename-institution` edit exists (V5, V62, V69); powers, NPCs and the settlement rename through `rename-faction`,
    `rename-npc`, `rename-settlement` (V69); `controlledInstitutions` holds `stablePart(id ‖ name)`, never `catalogId`,
    and only the first twelve roster positions can be captured (V30, V54); the settlement `id` survives reload, same-seed
    regeneration and section rerolls (V1); NPC ids `npc_<n>` are renumbered by a reroll and a successor takes a new id with
    `replacedNpc` holding the old NAME (V6); no two records of one dossier share a `catalogId` or a name (V3).
    *What changes:* (a) §2.9's `Document` gains a canonical block `dossier?: { binding: DossierBinding; carried:
    CarriedFacts }` — outside the model digest, like `hostContent`, rebuildable from the log's dossier events, written by
    the port at creation and at each absorb (the plan's §2.2 types); (b) §14's port carries the KEY LAW: settlement
    `settlement:<id>`; institution `inst:cat:<catalogId>` → `inst:uid:<localUid>` → `inst:name:<slug(name)>` with `#k`
    for a collective record's k-th member and the record's array position as the tie-break for two records of one key
    (reported); power `power:id:<faction.id>` when authored else `power:<slug(faction)>`; notable `npc:<id>`; condition
    `cond:<id>`; resource `res:<key>`; quarter `quarter:<slug>`; (c) CLASS is looked up separately from identity: from the
    current NAME when `demotedFrom` or `promotedFrom` is present, else from `catalogId`, else from name, category and tags
    — and at M1 only for the kinds M1's classes cover, every other kind falling to its category's generic class and
    REPORTED, never refused (item 20 (h) (ii)'s fallback); (d) RE-BINDING receipts: `rename-settlement`, `rename-faction`,
    `rename-npc`, `demotedFrom`, `promotedFrom`, a successor's `replacedNpc`; a name change with no receipt is a removal
    plus an addition, reported (J-M4); (e) `controlledInstitutions` entries are resolved through `stablePart(id ‖ name)`
    against the current roster; (f) `DossierRef.element` is the binding key and `DossierRef.version` the SettlementForge
    line (the plan's J-P9), so §7.1's comment reads "the binding key of item 74; the module reads it, never writes it".
    *Why:* item 20 (h) (v) is testable only with a law; SettlementForge's own precedence is the stablest key its records
    have, and its `catalogId` survives the two in-place renames the line performs while naming the wrong kind afterwards —
    so identity and class must be read apart (the plan's J-P3).
    *Scope:* BASE (the block, the law and the class rule from M1; re-binding on receipts at M3a). *Milestone:* M1, M3a.
    *Evidence:* CONFIRMED — V1–V6, V30, V54, V57, V62, V69. PLAUSIBLE — the law's ordering and the member rule.

75. **THE CHANGE ENVELOPE, ITS DATING AND THE RECEIPT TABLES (extends item 20 (h) (i) and item 22 (b)).**
    *Section:* §7.1 (`EditBase`), §7.7 item 1, §11.4 door 2, §13.2, `@plat/tables` (`tables/dossier/receipts`).
    *Design says:* `EditBase.dossier` is `DossierRef {element, version?}` — no week, no cause, no fate (V39); §7.7 item 1
    takes dossier events "in the host's order" and item 22 (b)'s disruption report says "why" — with no field to hold a
    host's reason.
    *Dossier fact:* the receipts are partial and scattered — a canon-only event log, capped history lists (`populationHistory`
    12, `tierHistory` 12, `institutionHistory` 24), entity stamps, `decrees[]` with `tickRef` and the week's
    `decreeCauses[]`, a campaign news feed — and several carry no week (g§7; V63, V64, V67, V68); the creation paths and
    their stamps are six, one of which (the upswing founding) writes only `name, category, status, worldPulseFate` (V57);
    a missing `foundedAt` does not mean "stood since the founding" (V58); closures are `status: 'remnant'` with
    `_worldPulseInactive: true` and a fate word from a closed vocabulary of eighteen (V59); `captured_by_local_powers` is a
    closure of a criminal house after a demotion, naming no power (V60); `destroyedByEventId` is written on the settlement
    root only (V61); a rival or cold-war neighbour trades — only `hostile` or a suppressed economy carries no links (V31);
    a calamity lowers `tier` with no `tierHistory` entry (V47, V64).
    *What changes:* (a) `EditBase.dossierChange?: DossierChange` — `{ changeId, source: 'event'|'pulse'|'decree'|
    'regeneration'|'edit'|'diff', week: number | null, cause?, element: { kind, key }, op, before?, after?, fate?, reason?,
    receipts[] }` (the plan's §2.2) — set by the port on every event a dossier change generates, so the disruption report
    and `LifecycleEvent.cause` can say why; (b) §7.7 item 1 gains: "the port produces these events by DIFFING the incoming
    dossier against the dossier facts the map already carries by their binding keys (the `carried` block of item 74) — no
    host-side history is needed — and dates each change by item 76's rungs"; (c) the receipt tables as data rows, one per
    change kind, holding the corrected receipt fields and the response: F1 with `_worldPulseTierAdded`,
    `_worldPulseFounded`, `foundedByWorldPulseOutcomeId`, `founded_by_flourishing` (dated by arrival only) and "an ADD of an
    existing name is a REOPEN"; F2 keyed on `worldPulseFate` and `_worldPulseInactive` before `status`, with `abolished`,
    `disbanded` and `abandoned_with_the_settlement` added; F3 with `demotedFrom` / `promotedFrom` as a rename plus a
    re-designation from the new name; F4 with `impaired` derived from the visible impairments; F5 without
    `destroyedByEventId`; F8 firing on a bare `tier` change; F14 keeping a rival's listed trade; F15's institution receipts
    limited to the two stamps; F18 expecting no diff for a decree whose verb is unbound (V67); F20 with
    `destroyedByEventId` on the root and `memberBirths` as a new map; (d) a `PortNote` `unreceipted_change` for a change no
    rung dates, counted in the report.
    *Why:* item 22 (b) wants the report to say why, item 67 wants the week, and item 20 (h) (iv) forbids asking
    SettlementForge for a change list — so the envelope and the receipt tables are the map's own way of recovering both.
    *Scope:* BASE. *Milestone:* M3a (with §7.7's dossier contract).
    *Evidence:* CONFIRMED — V31, V39, V47, V57–V64, V67, V68; g§7. PLAUSIBLE — the envelope's fields.

76. **THE CLOCK CONTRACT AND THE LAPSE THRESHOLD (extends item 20 (h) (iii) and item 22 (e); refines §7.7 item 3's program
    interpretation).**
    *Section:* §4.11 (`EpochInputs`, the epoch cadence), §7.7 items 3 and 6, §10.3 (the module's hour clock), §13.2,
    `@plat/tables` (`tables/dossier/calendar`), item 67 (b) at its §4.11 home.
    *Design says:* epochs carry `years`; no weekly model clock exists (the word "week" occurs only in person-week estimates
    and one undo note — V47); the `@plat/sim` calendar counts hours as a view key (§10.3); a rejection lapses "at the
    first `epoch` event folded after it whose `populationTarget` differs from `held.populationTarget`" (§7.7 item 3;
    J-A20.74); item 67 (being applied by pass c) assumes a weekly simulator clock and `Works` durations in weeks.
    *Dossier fact:* one tick is one week; `worldState.tick` and `calendar.elapsedWeeks` start at 0 and move together over
    a 52-week 4-4-5 year with 13-week seasons, spring first (V7; the plan's census: tick 1 / 13 / 52 = `elapsedWeeks`
    1 / 13 / 52); `elapsedMonths` is a derived legacy field and `history.age` a second, frozen clock never to be compared
    with the calendar (V7); a catch-up may run any whole number of weeks up to 26 (V8); the clock lives in campaign state,
    outside the dossier (V70); a settlement's population drifts almost every week — town-1: 2 130 → 2 132 → 2 156 → 2 175
    over a year (sf/outputs tick files), so under a yearly epoch nearly every map rejection would lapse once a year (V72).
    *What changes:* (a) the WEEK: our `week` is SettlementForge's `calendar.elapsedWeeks`, an integer, no conversion; never
    `elapsedMonths`, never `history.age`; `EpochInputs` gains `week?: number` and dossier events carry theirs in
    `dossierChange.week`; the DATING RUNGS in order — an explicit tick on the receipt (`foundedAt.tick`; lifecycle
    `institutionHistory[].tick`; `populationHistory[].tick`; `activeConditions[].triggeredAt.tick`; campaign-era
    `historicalEvents[].tick`; `decrees[].tickRef`; `calamityHistory[].tick`; `previousGovernments[].tick`; a news tick;
    the provenance ledger's tick), then the outcome id's week suffix, then `HostContext.week` (optional), then `null` —
    the change applies finished, without stages, as a draft's does (J-M10); (b) the SEASON: a row set `calendar.sf445`
    (52 weeks; seasons of 13 from spring; month ends 4, 8, 13, 17, 21, 26, 30, 34, 39, 43, 47, 52) that item 67 (b)'s
    season row reads for a campaign week — never a calendar of ours; (c) the CADENCE (J-M9): discrete changes fold as
    standalone dossier events at their week in SettlementForge's order (decrees first); an `epoch` folds at each 52-week
    boundary crossed, or sooner when the dossier's population has moved from the last epoch's `populationTarget` by more
    than the roster tolerance (± 5 %), carrying `populationTarget`, the circumstances of items 77–79, T16's event kinds
    and that week's dossier events in `EpochInputs.dossier`, `years` = weeks since the last epoch ÷ 52 (a fraction
    allowed); a catch-up batch obeys the same rule, gaps allowed; (d) the LAPSE: §7.7 item 3 reads "whose
    `populationTarget` differs from `held.populationTarget` by more than the roster tolerance (± 5 %) — the settlement has
    grown or declined, not drifted", the same number as the population trigger of (c).
    *Why:* item 67's unit and SettlementForge's agree, so nothing converts; an epoch per tick would run growth fifty-two
    times a year for a drift of a few people and an epoch per advance would tie the map's history to how often a DM
    presses "advance" (J-M9's rejected alternatives); without (d) every rejection lapses yearly (V72) — the owner's words
    were "if a settlement grows or declines" (the plan's J-P6).
    *Scope:* BASE. *Milestone:* M3a (the week, the rungs, the cadence), M4 (the lapse, inside §16's existing "lapse of a
    rejection at an epoch" hook).
    *Evidence:* CONFIRMED — V7, V8, V47, V70; V72's inputs (the drift) executed by sf/outputs and re-run byte-identical by
    the verifier. PLAUSIBLE — the threshold and the cadence.

## B. Item 72's dossier-driven terms — typed homes the design already names (items 77–79)

77. **`circumstances.trade` TYPED AS THE PARTNER LIST; `TradeFlow` AS A DERIVED RECORD (extends item 20 (h) (ii); gives
    item 72 (a)(3) its inputs).**
    *Section:* §7.7 item 2 (the circumstance list names `trade`), §4.2 S0 (the blueprint's circumstances), §4.2 S3
    (destinations: external bearings), §4.3 (arterials), §4.5 (the field's drivers), §2.4 (`Way.from / to`: "external
    bearing"), §4.11 (`CircumstanceSlice`), §2.9 (`Document.derived`).
    *Design says:* circumstances list `trade` by name, untyped; `Way.from / to` may name an "external bearing"; no partner,
    direction or gate-weight record exists (V44).
    *Dossier fact:* exports, imports and transit are label lists with no partner and no direction (m§7); partner-level
    `tradeLinks {good, goodId, direction: import | export, partner (a NAME)}` exist only when the settlement was generated
    with an imported neighbour (4 links in 1 of 155 — V26) and `direction` is the flow, not a compass direction; a rival
    or cold-war partner keeps its links, only `hostile` carries none (V31); no bearing between settlements exists anywhere
    in SettlementForge — its realm digest holds cell ids, its war layer fakes an approach direction with a stable hash — while
    two realm placements' `x, y` give a placed partner's bearing without pack centroids (s C-9; V71).
    *What changes:* (a) `CircumstanceSlice.trade: TradePartner[]` with `TradePartner { key: string /* the partner's dossier
    key, or a standalone name */; mode: 'road'|'river'|'sea'; weight: number; bearingCdeg: Cdeg; relationship?: string;
    source: 'dossier'|'derived'|'realm' }` — recipe data at creation, epoch data afterwards; (b) S3 reads the partners'
    bearings as its external destinations, each bearing drawn on the partner's own key stream so it never moves when
    unrelated facts change (s C-9 (b); R3); the goods lists map to modes through `ResourceRow`s (row 44); tolls and port
    duties (item 78's shares) split road from water; `isEntrepot` raises the harbour or the busiest gate; (c) a derived
    record `TradeFlow { gates: { gate: Id; weight: number }[]; harbour?: number; dominantBearingCdeg: Cdeg }` in
    `Document.derived`, recomputed at creation and at each epoch from the slice and the road-and-gate geometry (R4), read
    by item 72's trade-flow term and §4.5's drivers; (d) when the optional realm block carries true bearings, the port
    first turns the map's north (the geo anchor's `bearingDeg`, §11.1) to fit the derived gates to them — no geometry
    changes — and moves gates or roads only for the residual, by least disruption (s C-9 (c)); (e) standalone, the
    blueprint's external bearings and the intent's trade setting fill the slice, so the rows are the same with or without
    a dossier.
    *Why:* item 72 (a)(3) needs "the direction the settlement's trade mostly flows from"; the dossier holds none, and item
    20 (h) (ii) says to derive it "from the realm-level partners and routes, the terrain and the road-and-gate geometry" —
    this gives that derivation a typed home the design already names, and a place for real bearings when they arrive.
    *Scope:* BASE (the slice, the bearings as S3 destinations, the record); STAGED HOOK (the realm block's supply).
    *Milestone:* M1 (slice; bearings as destinations), M2b (weights and drivers), M3a (the port's partner fill), the
    SettlementForge stage (the realm block).
    *Evidence:* CONFIRMED — V26, V31, V44, V71; §7.7 item 2's list read. PLAUSIBLE — the shapes and the north-first rule.

78. **`circumstances.economy` TYPED AS SECTOR SHARES; THE SECTORS AND CLASS-TO-SECTOR TABLES (extends item 20 (h) (ii);
    gives item 72 (d4) its input; corrects mapping G-D3 by V35).**
    *Section:* §4.2 S0, §7.7 item 2, §4.11 (`CircumstanceSlice`), §10.2 (`RosterTables`, `BuildingClassRow`),
    `@plat/tables` (`tables/dossier/sectors`).
    *Design says:* "circumstances (era, government, biome, economy, landscape toggles …)" — `economy` named, untyped; no
    economic sector list anywhere (every "sector" in the design is geometric — V35).
    *Dossier fact:* `economicState.incomeSources[] {source, percentage, …}` — 30 distinct sources over 155 dossiers,
    percentages summing to 100 in 155 of 155 (V18); they are REVENUE categories (Market Taxes, Property Rents, Court Fees
    & Fines, Agricultural Rents, Guild Fees …), not production sectors (mapping 4.13); no other sector statement exists.
    *What changes:* (a) `CircumstanceSlice.economy: EconomyShares` = `Record<Sector, number>` summing to 1, the default an
    even mix (neutral — no class amplified); (b) `RosterTables.sectors: SectorRow[]` (T13's left column: trade, taxes and
    tolls, crafts, agriculture, extraction, fishing, finance, religion, military, magic, crime) and the port's revenue →
    sector rows (T13's right column: Market Taxes, Entrepôt Trade, International Commerce and Port Duties → trade; Gate
    Tolls, Toll Revenue, River Tolls and Court Fees & Fines → taxes and tolls; … ; Property Rents → none, J-M6); (c)
    `BuildingClassRow.sectors: { sector: string; weight: number }[]` with weights summing to one — item 72 (d4)'s
    class-and-infrastructure-to-sector table and (d5)'s partition in one column; (d) item 72 (d4)'s dial reads
    `circumstances.economy` and the column, at creation and at each epoch with hysteresis.
    *Why:* item 72 (d4) reads "the share each sector contributes to the settlement's economy"; V35 found the slot already
    exists untyped, so it is typed rather than doubled (one field, not two); a revenue category is not a sector, so the
    port maps each to the sector whose classes produce it, as the owner's own examples do (trade → markets; taxes and tolls
    → infrastructure).
    *Scope:* BASE. *Milestone:* M1 (the type and the tables), M2b (the dial — pass c's item 72 (d4), priced there), M3a
    (the port's T13 fill).
    *Evidence:* CONFIRMED — V18, V35. PLAUSIBLE — T13's rows.

79. **`circumstances.powers` AS STANDINGS; `Faction.kind` GAINS MILITARY AND ARCANE; `Institution.powers?[]` FOR THE
    PARTITION (extends item 20 (h) (ii); gives item 72 (d″) and (d5) their inputs; corrects mapping G-D1 (b)).**
    *Section:* §2.7 (`Faction`, `Institution`), §7.7 item 2, §4.11 (`CircumstanceSlice`), §10.1–§10.2 (the class-to-power
    rows pass c adds), `@plat/tables` (`tables/dossier/powers`).
    *Design says:* `Faction.kind` ∈ guild, religion, lordship, company, criminal, council — no military or arcane kind
    (V32); `Faction` is "base schema from M1, materialised by the module" (V33); `Institution.faction?: Id` holds one power
    (V34); nothing remembers the standing a dial last applied.
    *Dossier fact:* power factions are name-keyed records with a share-like `power` and eight categories — economy 295,
    military 146, noble 124, religious 116, government 114, criminal 53, other 47, magic 46 over 155 dossiers — 2–10 per
    settlement (V24); the only faction-to-institution links ever observed are the simulator's `controlledInstitutions`,
    absent at generation, by `stablePart`, volatile week to week and shareable between two powers (V30, V34); the declared
    `controls / funds / staffs / protectsInstitutionIds` lists are never generated (V21).
    *What changes:* (a) `CircumstanceSlice.powers: PowerStanding[]` with `PowerStanding { key: string; kind:
    Faction['kind']; standing: number /* Σ = 1 over the settlement's powers */; governing: boolean; appliedStanding: number
    /* the value the dials last applied — moves only past a hysteresis at an epoch */ }` — recipe data at creation
    (standalone: the design's own government and religion rows), epoch data afterwards; (b) `Faction.kind` gains
    `'military' | 'arcane'`; T15's rows map SettlementForge's category and name to a kind (economy → `guild` for craft names,
    `company` for merchant and trade names; noble → `lordship`; government → `council` or `lordship`; `other` → `council`
    for crisis blocs, `company` for hunters; `Unknown Faction (hidden)` → `secret`); (c) `Institution.powers?: { power:
    string /* a standing's key */; weight: number }[]`, weights summing to one — absent, the class-to-power table's row of
    item 72 (d″)(1) applies; present, it is the dossier's override, written from `controlledInstitutions` past the
    hysteresis and partitioned by relative standing when two powers hold one kind (item 72 (d5)); the declared link lists
    are optional inputs weighted 1.0 / 0.6 / 0.5 / 0.4 when ever present; `Institution.faction?: Id` stays for the module's
    materialised `Faction`; (d) item 72 (d″)'s two dials and (a)(2)'s political term read the slice and the column.
    *Why:* the dials and the character vector need STANDINGS at epochs, not entities; typing the slice keeps `Faction` the
    module's (§10.1 stands — the plan's J-P13 over G-D1 (b)'s materialisation); (d5)'s partition needs a per-instance
    multi-power field; military and arcane powers are a third of SettlementForge's and have no kind.
    *Scope:* BASE (the slice, the kinds, the column); STAGED HOOK for `PowerRelation` and legitimacy (item 88).
    *Milestone:* M1 (schema and tables), M2b (read by the dials — pass c's), M3a (the port's override).
    *Evidence:* CONFIRMED — V21, V24, V30, V32–V34. PLAUSIBLE — the shapes and T15's rows.

## C. Records, rules and bars the port needs (items 80–84)

80. **`Assignment.state` FOR LISTED-BUT-RUINED; THE STATUS RESPONSE TABLE (extends item 20 (h) (iii); refines §7.7 item 2).**
    *Section:* §7.7 (`Assignment`), §5.3 (the dossier row), §2.7 (`Use`), §4.11 (the repair path), `@plat/tables`
    (`tables/dossier/status`).
    *Design says:* `Assignment` has `existence` and no state; `Use` is only opened or closed (V41); §7.7 item 2: only a
    dossier event removes a dossier-backed element, and a removal leaves the plot vacant through `closeUse`.
    *Dossier fact:* removal is soft — a removed, ruined or remnant institution STAYS in the list with a status; the record
    count never shrank in any run and can only grow (V48); five typed statuses plus the simulator's `remnant` and `ruined`
    (V16); closures write `remnant` + `_worldPulseInactive: true` with one of eighteen fate words (V59); a calamity writes
    `status: 'ruined'`, `worldPulseFate: 'destroyed_by_disaster'`, `remnantReason` (V61); `vacant` is an empty SEAT, not
    an empty building (V16); `captured_by_local_powers` is a closure (V60).
    *What changes:* (a) `Assignment.state: 'active' | 'ruined' | 'removed'` (default `active`); a `ruined` element is
    PRESENT as its ruin — its use closed, its building `ruined` (§2.8's existence), §5.3's dossier row counting it present
    — and a reopen returns it to the same building first (a repair `Works` when item 67 lands); `removed` is today's path
    (`unassign` → `closeUse` → vacant); (b) the status table as rows: absent or `active` → open; `impaired` (derived from
    visible impairments) → physical types (capacity, infrastructure, access, supply_starved) one `condition` step per
    severity band, non-physical types (legitimacy, influence, wealth, staffing, corruption) → item 79's dial only (J-M3);
    `remnant` with `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant` → a smaller designation in place
    (item 18); `remnant` with `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered`,
    `abolished`, `disbanded`, `captured_by_local_powers`, `abandoned_with_the_settlement`, or `removed` → `removed`;
    `ruined`, `destroyed`, `destroyed_by_disaster` → `ruined`; `vacant` → no physical change; `ruined_by_decree` reserved.
    *Why:* item 20 (h) (iii) — a dossier that lists a ruin must not be contradicted by a map that shows the element open or
    gone; keyed on `status` alone the table would keep a bankrupt shop open as a "smaller designation" (V59).
    *Scope:* BASE. *Milestone:* M1 (the schema), M3a (the behaviour with §7.7's contract).
    *Evidence:* CONFIRMED — V16, V41, V48, V59–V61.

81. **THE RUNG FOLLOWS THE POPULATION AT EPOCHS; A SUB-FLOOR DOSSIER IS REFUSED BY THE PORT (extends item 20 (h) (iii);
    refines §1.1's request rule for dossiers; fills mapping G-D15).**
    *Section:* §1.1 (the ladders; "Requests at the ends of the ladder"), §4.11 (epochs), §11.4 (door 1 through the port),
    §9 (the title word), PART III.
    *Design says:* the population chooses the rung at creation; a request below 1 500 is routed to the village product
    and, while none is registered, "the base builds a 1 500-person TOWN and `requestedVsBuilt` reports the clamp"; no rule
    states what a crossing of 10 000 or 30 000 people does at an epoch (V40).
    *Dossier fact:* SettlementForge's tiers have their own bands (town 901–5 000, city 5 001–25 000, metropolis 25 001–
    100 000 — m§2), so 4 of 24 of its cities are our TOWNs, 2 of 23 metropolises our CITYs, 5 of 38 towns fall under our
    floor and all 70 thorps, hamlets and villages need the village product (T1; the plan's census: Collevilla 1 287 and
    Tyrberg 1 358 are SettlementForge "towns"; Cnocby 767; Lipopol 782); the tier moves under the simulator — by
    proposal, but also directly by a calamity, by a resettlement and under presets that lift proposal gating (V47).
    *What changes:* (a) §1.1 gains: "a DOSSIER whose population lies below 1 500 is refused by the port
    (`E_RUNG_UNAVAILABLE`, naming the village product) while no village product is registered; the clamp above applies to
    blueprint requests that carry no dossier — a dossier's population is a dossier fact and a clamped town would contradict
    it"; the SettlementForge tier WORD is the title's word (a dossier fact: a "city" of 5 001 people is drawn on the TOWN
    rung and still called a city); (b) §4.11 gains: "at each epoch the rung profile is read at `EpochInputs.populationTarget`;
    a crossing of one of §1.1's bands changes the rung's row — the frame grown by §3.2 (9), the budgets by the building
    count — and the standing fabric survives exactly as it survives a growth stage (§6.3)"; (c) F8 (item 75) fires on a
    bare `tier` change as well as on `tierHistory`.
    *Why:* G-D15 is a confirmed absence (V40); J-M7; the refusal is owner Q3 of the plan to confirm.
    *Scope:* BASE. *Milestone:* M1 (the refusal in the port), M4 (the rung at an epoch, with the incremental path).
    *Evidence:* CONFIRMED — V40, V47, the census (T1). PLAUSIBLE — the refusal as the right answer (owner Q3).

82. **NAMING CLAIMS AND NAMED-FEATURE TARGETS (extends item 20 (h) (i); refines §7.7's `Assignment.target`; fills mapping
    G-D8; corrects T6–T8 by V10 and V37).**
    *Section:* §7.7 (`Assignment`), §2.7 (`Pin.kind`), §2.8 (`Identity.dossier` on a named feature), §4.5 (typing),
    §10.4 (naming), `@plat/tables` (`tables/dossier/quarters`, `tables/dossier/landmarks`).
    *Design says:* `Assignment.target?: Id /* one building / plot or one district */` (V37); `Identity.dossier` foresees
    "a named feature: a bridge, a well, a gate"; `Pin.kind` has no notice post; districts are feature-named, never a social
    class (J-P1 of the design).
    *Dossier fact:* `spatialLayout.quarters[]` holds 0–8 names from a fixed set of 14 (13 seen in 155 dossiers — Roadside
    Shrine never), each switched on by a case-sensitive substring test over the institution NAMES, each carrying one fixed
    location phrase except the Waterfront District's two (coast or river); "Eastern district (traditional)" on 154 of 154
    Religious Quarters is the only compass statement in any structured field (V10); a Market Quarter appears in 38 of 38
    towns and 0 of 24 cities because the test misses cities' market names (V11); the list is written once at generation and
    never touched by the simulator (V55); `landmarks[]` are institution names or one of 26 fixed strings (V37).
    *What changes:* (a) a quarter enters the map as a NAMING CLAIM — a `neighbourhood` assignment carrying `name` and a kind
    BIAS from T6 (Market → market; Religious → temple; Noxious Trades → craft with the noxious rows; Waterfront → docks or
    riverbank by phrase; Government → the seat's district; Mages' → an arcane identity row; Artisan → craft; Shadows → a
    low-band and hidden-share bias; Wealthy / Common Residential → band biases; Roadside Shrine → a shrine claim with a soft
    edge row; Alehouse & Common, Fishing Landing, Woodcutters' Ground → village-product rows), never a zoning; the district
    whose emergent identity of item 72 best matches carries the name (J-M1) and keeps it past item 72 (c)'s hysteresis; an
    ABSENT quarter is never a fact; (b) T7's phrases as soft relation rows ("Downstream/downwind" → `downstream` +
    `downwind`; the two high-ground phrases → `highGround`; "Central" and "Village centre" → `nearCentre`; the three water
    phrases → `nearWater`; "Between market and residential" → `nearMarket`; "At the forest edge" → toward the wood land use;
    "Isolated area (safety concerns)" → `far` from the centre; "Old town or slums" → the oldest stage and a low band;
    "Spread throughout" → no district; "At the settlement edge" → the edge; "Eastern district (traditional)" → a soft east
    row at low weight, pending owner Q5); (c) `Assignment.target` may also be a way, a bridge, a quay or a pin — a
    NAMED-FEATURE claim for a landmark string the roster already demands (T8 with the six added strings `Alehouse`, `Net
    mending post`, `Beaching ground`, `Timber stacks`, `Tool shed`, `Charcoal pit`); nothing is created for a string alone
    (J-M2); (d) `Pin.kind` gains `'notice'`.
    *Why:* item 72 makes a neighbourhood's identity emergent and moving; SettlementForge's quarter list is a generation-time
    name test never refreshed, so reading it as districts would freeze item 72 and import its artefacts; item 20 (h) (i)
    makes the NAME the dossier fact, not the zoning.
    *Scope:* BASE. *Milestone:* M3a (the target kinds and the pin kind with assignments; the port's use).
    *Evidence:* CONFIRMED — V10, V11, V37, V55.

83. **THE PORT'S COHERENCE BARS AND THE B-DOSSIER BENCH (makes item 20 (h) (iii) executable).**
    *Section:* §13.2 (bars), §13.8 (CI tiers), §16 (the M1 and M3a exit rows).
    *Design says:* item 20 (h) (iii)'s bars are stated as principles — "no derived fact contradicts a dossier fact", the
    derivation table is total — and §16's M1 exit row names no dossier input.
    *Dossier fact:* the fixture set of item 84 has measurable properties: population, the housing record's range, every
    collective record's range, the walls bucket, the access key, the quarter names, the prosperity label (the plan's
    census, CONFIRMED).
    *What changes:* (a) §13.2 gains the creation bars, run on B-DOSSIER-lite (the nine at-rung fixtures × 5 seeds in the
    PR tier; the culture towns nightly): T73-1 every dossier record placed — 0 tier-6 omissions; T73-2 population within
    ± 5 %; T73-3 the residential building count inside the housing record's range; T73-4 every collective count inside its
    record's range; T73-5 walls exactly when the walls bucket is non-empty and the gate count inside T3's row; T73-6 every
    quarter name on exactly one district; T73-7 the population-weighted mean household band within one band of T12's
    mapped band; T73-8 the same fixture and seed give the same `model.digest` on Node x86 and arm64 and in the nightly
    five-engine run; T73-9 the three refusal fixtures refused with `E_RUNG_UNAVAILABLE`; T73-10 the totality test — every
    enumeration value of the fixtures has a table row or the declared fallback, the M1 class gap listed; (b) the absorb bars
    at M3a on item 84's pairs: T75-1 every `DossierChange` dated by a rung of item 76 or reported unreceipted; T75-2 every
    removed element's plot vacant and every ruined one present as its ruin; T75-3 the seven-event pair's disruption within
    its budget or reported over it; T75-4 the undo case (the before-dossier fed after the after-dossier) converging with
    `state_matches_absorbed` and its residue reported; T75-5 a rename with a receipt re-bound, one without reported as
    removal plus addition; (c) §16's M1 exit row gains "B-DOSSIER-lite green (T73-1 – T73-10)" and M3a's "T75-1 – T75-5".
    *Why:* a bar on real dossiers is the one executable proof that connection later is a registration; item 20 (h) (iii)
    is otherwise a principle.
    *Scope:* BASE. *Milestone:* M1, M3a.
    *Evidence:* CONFIRMED — the fixture properties. PLAUSIBLE — the bench's cost (priced in the plan's §5).

84. **THE FROZEN DOSSIER FIXTURE SET (extends item 20 (h) (iv): what the port is tested against).**
    *Section:* §13.2, §14 (`@plat/testkit`), §17.1 (3) (the path rule).
    *Design says:* `@plat/testkit` holds B-FUZZ generators, goldens, the D-5 seed list and the two committed capture
    files; no dossier fixture; "no import, fixture or script path may resolve outside `plat/`" (§17.1 (3)).
    *Dossier fact:* SettlementForge stores no full generated dossier in its tests — it pins generation by hash and builds
    every settlement at test time or as a minimal synthetic object (o§2); generation is byte-deterministic across processes
    and sessions (o§0, V1); the surveys generated 155 dossiers, 12 after-tick members and the rebase probes from a
    read-only export byte-identical to `5d699cc68` (V treecheck), writing nothing into SettlementForge.
    *What changes:* `plat/tests/fixtures/dossier/` with a `manifest.json` (per file: `file, sfLine, commit,
    generatorVersion, seed, config, generatedBy, kind: birth | after-events | after-ticks | world-state, pairsWith,
    population, tierWord, ourRung, notes`) holding: the nine at-rung births (town-1 Berghafen 2 130; town-2 Novaorum 3 174;
    town-3 Glenford 2 492; sample-mossgate 4 155; town-nb-1 Novasaltus 4 921 with the only `tradeLinks`; town-cc-1 Großmark
    4 196 with a `localUid` record; city-1 Pianopagus 23 178; sample-blackcrag 18 911; metropolis-2 Ventovicus 47 734), the
    three refusal births (culture-latin Collevilla 1 287; sample-cnocby 767; village-1 Lipopol 782), the totality-only files
    (the twelve culture towns, metropolis-1, metropolis-3), and the pairs (the probe town before and after seven events with
    its per-event record; town-1 and city-1 after one week, one season and one year under the birth default and after a lit
    year, each with its `worldState`; the probe town after a plain and a lit year; village-1 after the years). Rules: cut
    from the branch runs only (never the on-disk working tree, an older product); never under `research/` or `captures/`
    (the doc checks read their JSON as corpus); the lanes' synthetic seeds are stored but `_seed` and `_config` are marked
    never to be published (s C-8); re-cut by the same scripts when the owner names another SettlementForge line (owner Q1).
    *Why:* s E-9 — tests without the engine; the fixtures are the content input the M1 tests use where a dossier fits
    (the brief's item 2), and the only dossiers that exist frozen anywhere.
    *Scope:* BASE. *Milestone:* M1 (copied by the apply step — later, not now).
    *Evidence:* CONFIRMED — the plan's census (`sf/plan/census-fixtures.out`), o§2, V1.

## D. The seam's rules (items 85–88)

85. **THE SEAM'S PROJECTION AND SECURITY RULES: THE ONE-WAY SEED, PER-EXPORT DISPLAY NAMES, THE INERT-EXPORT BAR, BRIDGE
    CORRELATION (extends item 20 (d) and item 30's knowledge rules).**
    *Section:* §2.9 (`Recipe.seed` from a dossier), §11.1 (SVG; the knowledge paragraph), §11.3 (transport, replies,
    roles), §13.2 (the bar).
    *Design says:* §11.3's transport checks the incoming ORIGIN, its replies are unnamed and host messages before `ready`
    are unstated (s C-1); §11 says nothing about escaping text or active content in exports (s C-11); no per-export display
    names exist and our SVG bakes label text as glyph outlines (s C-8 (b)); how a dossier's seed becomes ours is unstated
    (s C-8 (a)).
    *Dossier fact:* SettlementForge's public projection fails closed — `_seed` and `_config` are SECRET on every shared or
    gallery surface, flagged words render veiled on public pages, a recursive key denylist covers tokens such as `seed`,
    `secret`, `dm`, `hook` (s C-8); its one embedded map program runs in an iframe on its own origin with request-id
    correlation on every reply, a source-window check and a queue before `ready` (s C-1); its plan ships the module's SVG
    "as data" and guards against stored scripting on snapshot import (s C-11).
    *What changes:* (a) `Recipe.seed` for a dossier = H32("plat:sf-seed" ‖ `_seed`), one-way — the same determinism,
    nothing reversible, no `.plat` carrying SettlementForge's seed; (b) `HostContext.displayNames` (dossier key → text)
    applies inside ONE export request and is never stored; (c) a §11.1 bar: every text node, attribute and metadata string
    XML-escaped; the SVG writer emits no script, event attribute, `foreignObject` or external reference; CI runs hostile
    names through every exporter and asserts inert, well-formed output; (d) §11.3: every reply (`query.result`,
    `export.ready` / `export.refused`, `doc.applied` / `doc.rejected`) carries the request's `seq` as `re`; the transport
    checks the message's source window as well as its origin; host messages sent before `ready` are queued and delivered in
    order; (e) §11.3 names "an iframe on the module's own origin" as the SettlementForge configuration, worker and service
    remaining for other hosts; (f) an audience → role and key table in the port's host glue (DM → `owner`, key `secret`;
    co-DM → `editor`; player → `viewer`, key `public`, raised place by place; anonymous and gallery → pictures only under
    `public`; a DM-full share → pictures under `secret`, never the document).
    *Why:* the module will be embedded beside a paying product's session and its exports shipped as data; SettlementForge's
    seed posture must not be undone by our file format (item 20 (d): the map's document may be stored by the host), and a
    name from a dossier or another user's edit must never become active content.
    *Scope:* BASE. *Milestone:* M1 ((a), (c) — the seed is the port's first act; the bar is cheap and general), M3a ((b),
    (d), (e), (f) with the bridge).
    *Evidence:* CONFIRMED — s C-1, C-8, C-11 (read in the code and docs the seam lane cites). PLAUSIBLE — the candidates.

86. **WHAT THE PORT NEVER READS — THE IGNORE-LIST AS A RULE (extends item 20 (h) (ii) and the standing rule that what we
    build stays the base).**
    *Section:* §11.4 (host inputs), §7.7 item 1.
    *Design says:* nothing lists what a host's data the module must ignore.
    *Dossier fact:* under the lit preset the dossier gains `urbanFabric` — SettlementForge's own town map's "memory"
    (district-class prominence stocks, scars, rebirths) — and `npcLadder`, `traditions` (g§6.6); every new save is stamped
    `mapEdits: { layoutLawVersion: 2 }`, load-bearing for SettlementForge's substrate and interior footprint, with old saves'
    `mapEdits` and `fogSessions` kept inert (s§3); the campaign holds `spatialLedgers.*` including a spatial substrate
    derived from SettlementForge's own layout (s§3 item 6); SettlementForge's derived reads — the district profile, the
    map profile, the causal state, the four-dimension system state, capacities, daily life, threat profiles, the spine —
    are computed on read and never stored (m§0); `simulationTrace` is about a quarter of every dossier's bytes (V28); the
    `config.priority*` sliders are generation inputs whose effect already sits in the institutions and the income shares
    (J-M5); the NPC social-group layer need not agree with a notable's own affiliation (o§5.2; J-M8).
    *What changes:* §11.4 gains: "the port never reads, and the module never takes as an input, a host's own map-side
    layers (`urbanFabric`, `mapEdits`, `fogSessions`, every `worldState.spatialLedgers.*` sub-ledger including the spatial
    substrate), its derived reads, its generation log (`simulationTrace`), `aiOverlays`, `generationCoherenceReceipt`, its
    generation sliders, its NPC social groups, or prose beyond a description seed for the clerk; the campaign's frozen
    `spatialDigest` is the one campaign fact the optional realm block of item 73 may carry"; the adapter reports every key
    it dropped (`ignored`).
    *Why:* item 20 (h) (ii) derives map facts from dossier facts, never from another map's memory; reading SettlementForge's
    own layout memory would make its map program the base, against the owner's standing rule; the sliders would count their
    effect twice.
    *Scope:* BASE. *Milestone:* M1.
    *Evidence:* CONFIRMED — g§6.6, s§3, V21, V28, o§5.2.

87. **A HOST'S UNDO IS A FORWARD CHANGE (extends item 20 (h) (iii) and §7.7 item 5; §7.4 unchanged).**
    *Section:* §7.7 item 5 (re-application), §11.4 (the port's report); §7.4 is NOT edited.
    *Design says:* a dossier event, and an epoch that carried one, is never an undo, redo or revert target (§7.4;
    J-A20.74); nothing says what a host's own undo does to the map.
    *Dossier fact:* SettlementForge restores earlier dossier states EXACTLY — `undoLastEvent` from the event log's
    snapshot, `undoLastPulse` from a pre-advance snapshot, session-only, ten deep (V49).
    *What changes:* §7.7 item 5 gains one sentence: "a host that restores an earlier dossier state sends it as a dossier
    change like any other; the port diffs it, and because §4.7 S10b's least-disruption order takes vacant plots first and
    §4.11 (5) prefers a building's `formerUses`, an element the host removed and then restored returns to its own vacated
    building and an element added and then withdrawn leaves the plot it took — the map converges to its earlier state
    wherever nothing else changed; the residue is reported, and the report names the earlier absorbed state the dossier
    now equals (`state_matches_absorbed`, item 74's `factHash`); no rewind of dossier events exists".
    *Why:* the plan's J-P5 — chosen over s C-4's rewind candidate because §7.4's ruled text stays intact and the solver's
    existing order already returns elements to their former plots; what it does not return is exactly what the disruption
    report should show.
    *Scope:* BASE. *Milestone:* M3a.
    *Evidence:* CONFIRMED — V49. PLAUSIBLE — the convergence (the plan's §9 names the experiment).

88. **THE STAGED RECORDS AND ROWS THE PORT WILL FILL, DECLARED SCHEMA-COMPLETE AND EMPTY (extends item 20 (h) (iv): every
    optional input has a home).**
    *Section:* §2.7 (records), §10.2 (rows), §4.6 (the hidden share), §4.9 (the hinterland), §4.11, items 63–67 at their
    homes.
    *Design says:* the staged layers already use "schema-complete, empty in the base" (`SkyIsland`, `Tunnel`); no record
    holds a condition between epochs (V43), a deposit with a state (V38), pre-creation history (mapping G-D9), a relation
    between two powers (G-D1 (c)) or a dossier-named person (G-D5); `Building.condition` is wear only (V36).
    *Dossier fact:* conditions carry a stable id, a severity, a status and a week (V66); 96 of 155 dossiers list a depleted
    deposit AT BIRTH (V38); `history` carries `age`, a founding and typed historical events (mapping row 69);
    `factionRelationships[]` pair types (V24); notables carry a name, role, category, power and workplace institution by
    name, structural seats an importance and linked names, successors a new id (V6); custom content declares
    `CRITICALITY`, `ECONOMIC_WEIGHT`, `DEFENSE_ROLES`, `POWER_AUTHORITIES` (V42).
    *What changes:* §2.7 declares, schema-complete and empty in the base: `ConditionOverlay { key; archetype; severity;
    sinceWeek; untilWeek? }` (read by the renderer, item 67 (i)'s share of works and the clerk — no geometry);
    `DepositSite { key; family; state: 'available'|'depleted'|'removed'|'discovered'; bearingCdeg; landUse }` anchoring a
    hinterland land use, a state change converting it (a depleted deposit at creation drawn worked out); `HistoryHint {
    ageYears; scars: { type; yearsAgo; severity }[] }` as an S0 input for the stage count and generation-time scars —
    `ageYears` never advanced by SettlementForge weeks (V7); `PowerRelation { a; b; kind; strength }` read by §4.5's typing
    as a soft adjacency row and by item 72 (a)(2); the dossier-backed `Person` — a pinned `Person` carrying
    `Identity.dossier`, housed by rule in its institution's or power seat's district, with a `Posting` at its named
    institution and a `Membership` in its named power, a successor re-bound through `replacedNpc`. §10.2 declares the rows:
    an impairment-type table (physical → condition; non-physical → item 79's dial; J-M3); a hinterland row reading
    `importPct` and the food-chain booleans (less own farmland when food is imported; G-D11); a crime term on §4.6's hidden
    share and item 64 (b)'s access rate (G-D12); a fallback row reading the custom-content weights for custom kinds (G-D17);
    a legitimacy scalar on the government record read by the dial table (G-D1 (d)).
    *Why:* item 20 (h) (iv) has the port list, for every map fact, its derivation and its dossier inputs; these are the
    inputs with no home yet; declaring them empty now, as the staged layers are, makes filling them a registration.
    *Scope:* STAGED HOOK. *Milestone:* the schema at M3a (where it costs nothing beside the absorb half); the behaviour at
    the SettlementForge stage and with item 67's transitions and the evolution engine.
    *Evidence:* CONFIRMED — V6, V7, V24, V36, V38, V42, V43, V66. PLAUSIBLE — the shapes.

---

## Ruling summary

| item | design section | what changes, in one line | scope | milestone | evidence |
|---|---|---|---|---|---|
| 73 | §14, §11.4, §7.7 item 8 | `@plat/port`: one package, `DossierPort` + `DossierDigest`, adapters per SettlementForge line, lint-enforced boundary | BASE; host wiring STAGED | M1 / M3a / SF stage | CONFIRMED facts; PLAUSIBLE shape |
| 74 | §2.9, §2.8, §7.1, §14 | `Document.dossier` block; the binding key law; class read apart from identity; re-binding receipts | BASE | M1 / M3a | CONFIRMED V1–V6, V30, V54, V57, V62, V69 |
| 75 | §7.1, §7.7 item 1, §11.4, tables | `EditBase.dossierChange`; the diff against carried facts; corrected receipt tables | BASE | M3a | CONFIRMED V31, V39, V47, V57–V64, V67, V68 |
| 76 | §4.11, §7.7 items 3 and 6, §10.3, tables | the week; the dating rungs; the `sf445` season row; the epoch cadence; the 5 % lapse threshold | BASE | M3a / M4 | CONFIRMED V7, V8, V47, V70, V72's inputs |
| 77 | §7.7 item 2, §4.2 S0/S3, §4.3, §4.5, §2.4, §2.9 | `circumstances.trade: TradePartner[]`; derived `TradeFlow`; realm block fits north first | BASE; realm block STAGED | M1 / M2b / M3a | CONFIRMED V26, V31, V44, V71 |
| 78 | §4.2 S0, §7.7 item 2, §10.2, tables | `circumstances.economy: EconomyShares`; the sectors and class-to-sector tables | BASE | M1 / M2b / M3a | CONFIRMED V18, V35 |
| 79 | §2.7, §7.7 item 2, §4.11, §10.1–§10.2, tables | `circumstances.powers: PowerStanding[]`; `Faction.kind` += military, arcane; `Institution.powers?[]` | BASE; relations STAGED | M1 / M2b / M3a | CONFIRMED V21, V24, V30, V32–V34 |
| 80 | §7.7, §5.3, §2.7, §4.11, tables | `Assignment.state`; the status response table keyed on fates first | BASE | M1 / M3a | CONFIRMED V16, V41, V48, V59–V61 |
| 81 | §1.1, §4.11, §11.4, §9, PART III | a sub-floor dossier refused (owner Q3); the rung read at each epoch's target; the tier word is the title | BASE | M1 / M4 | CONFIRMED V40, V47, census |
| 82 | §7.7, §2.7, §2.8, §4.5, §10.4, tables | quarters as naming claims; named-feature targets; `Pin.kind` `notice`; T6–T8 corrected | BASE | M3a | CONFIRMED V10, V11, V37, V55 |
| 83 | §13.2, §13.8, §16 | the creation bars T73-1 – T73-10 on B-DOSSIER-lite; the absorb bars T75-1 – T75-5 | BASE | M1 / M3a | CONFIRMED properties; PLAUSIBLE cost |
| 84 | §13.2, §14, §17.1 (3) | the frozen fixture set with its manifest under `plat/tests/fixtures/dossier/` | BASE | M1 | CONFIRMED census, o§2, V1 |
| 85 | §2.9, §11.1, §11.3, §13.2 | one-way seed; per-export display names; the inert-export bar; reply correlation, source check, before-ready queue; the SF configuration; the audience table | BASE | M1 / M3a | CONFIRMED s C-1, C-8, C-11 |
| 86 | §11.4, §7.7 item 1 | the ignore-list as a rule; the digest as the one campaign fact | BASE | M1 | CONFIRMED g§6.6, s§3, V21, V28 |
| 87 | §7.7 item 5, §11.4 (§7.4 untouched) | a host's undo is a forward change that converges; `state_matches_absorbed` | BASE | M3a | CONFIRMED V49; PLAUSIBLE convergence |
| 88 | §2.7, §10.2, §4.6, §4.9, §4.11 | `ConditionOverlay`, `DepositSite`, `HistoryHint`, `PowerRelation`, the dossier-backed `Person`; the impairment, hinterland, crime, custom-weight and legitimacy rows | STAGED HOOK | M3a schema; SF stage | CONFIRMED V6, V7, V24, V36, V38, V42, V43, V66 |

**Counts.** 16 items: 14 BASE (two of them with a STAGED part — 73's host wiring, 77's realm block, 79's relations), 1
BASE-with-owner-confirmation (81, owner Q3), 1 STAGED HOOK (88). Every item extends a part of item 20 (h); none asks
SettlementForge to add or change anything; the build order of §16 is unchanged and the additions are priced in the plan's
§5 (+4.5 / +6 pw across M1, M2b, M3a and M4).

**Owner decisions these items wait on** (the plan's §6): Q1 the SettlementForge line (item 73's first adapter); Q2 door 1
(no item — a new capability across the boundary); Q3 the refusal below 1 500 (item 81); Q4 resettlement (F20, no item);
Q5 "Eastern district (traditional)" (item 82's soft row); Q6 SettlementForge's own district names in its news (no item —
accepting the mismatch is the default).

**Owner decisions Q1 and Q2 — RULED under delegation (owner, 2026-09-28 ~00:05: "for the following, i leave to your judgement"; J86 in docs/PROGRESS.md, Opus 5.5 manager — pending Fable review).** Q1: item 73's first adapter is `fp-integration-2026-09-23` pinned at `5d699cc68`; item 84's fixtures are cut from it; a later shipping line adds one adapter folder and re-cuts the fixtures by the same scripts. Q2: door 1 stays CLOSED — option (a); no item in this file builds a geometry export for SettlementForge's simulator; option (b) (canonical-only, no user edits) remains possible later, without redesign, only on the owner's explicit word. The pass that applies this file writes both rulings as judgment rows at their homes (§11.4, §14).
