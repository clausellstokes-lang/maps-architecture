# Interim preparation plan — so that connecting the SettlementForge dossier later is a registration, not a rewrite (lane sf/plan)

> Fable seat (the architect). This file is the Fable seat's own ruling, not a stand-in's: no PENDING FABLE REVIEW marker.
> It rests on six Opus surveys that are PENDING FABLE REVIEW (`research/sf/dossier-{model,generation,outputs,seam}.md`,
> `mapping.md`, `mapping-verify.md`); every SettlementForge fact below carries its source, and the verify lane's 18
> corrections are applied wherever they bite (§2.4–§2.7 name them by V-id). Nothing here reconciles the two designs,
> reorders the build (M-1, M0, M1 stay exactly as §16 lists them) or asks SettlementForge for anything.

## PROGRESS

| # | item | state |
|---|---|---|
| 1 | read in full: `docs/AMENDMENTS-2026-09-27c.md` §G item 20 (h) and items 63–72; `docs/OWNER-INSTRUCTIONS-2026-09-25.md` (whole, its last section binding); `docs/DEFINITION.md`; the four surveys, `mapping.md`, `mapping-verify.md`; `docs/ARCHITECTURE.md` §1, §7.7, §10, §11, §14, §16 plus §2.7–§2.9, §4.2 S0, §4.11's `EpochInputs` and *Dossier content across epochs*, §6.3, §7.1's `EditBase`/`DossierRef`, *Staged by the owner's roadmap*; `docs/AMENDMENTS-2026-09-25b.md` items 8–24; `docs/AMENDMENTS-2026-09-27e.md` item 101; `docs/PROGRESS.md` J60–J79; `docs/experiments/known-city-authoring.md` | done 19:2x |
| 2 | executed: read-only `git log -1 fp/integration-2026-09-23` in SettlementForge (tip still `5d699cc68`, 2026-09-24 16:33); `sf/plan/census-fixtures.py` over the 35 generated, 12 after-tick and 4 rebase dossiers in scratch (populations, our rung, counts, the world clock) → `sf/plan/census-fixtures.out` | done 19:26 |
| 3 | §1 what binds; §2 the dossier port (package, interface, halves, identity, tables, change feed, clock, derivation table, seam rules) | done |
| 4 | §3 rulings on the surveys' open questions | done |
| 5 | §4 the fixture set | done |
| 6 | §5 what the design gains now versus later, by milestone, priced; §6 owner decisions; §7 judgments; §8 the relayed edit-build experiment; §9 evidence | done |
| 7 | `docs/AMENDMENTS-2026-09-27d.md` (candidate amendments 73–88, not applied; 538 lines) | done 19:48 |
| 8 | `research/sf/SUMMARY.md` (plain language, for the owner; 156 lines) | done 19:53 |
| 9 | LANDED line in `docs/lane-events.log`; memory `sf-dossier-port-plan.md` written and indexed | done 19:55 |

Scratch: `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/sf/plan/`. No file inside `/Users/cstokes/Desktop/settlement-engine` was written, built or run; the only command against it was `git log -1` (read-only).

## 0. The outcome in plain words

1. **One doorway, one package.** Every dossier fact enters the map through one typed interface, `DossierPort`, in one
   package, `@plat/port`; SettlementForge's own field names are read in exactly one adapter folder inside it, versioned by
   SettlementForge product line, and are translated into a neutral `DossierDigest` of our own before anything else sees
   them. The rest of the module never learns a SettlementForge key.
2. **The port has two halves that land at different milestones, and no host wiring until the SettlementForge stage.**
   The CREATION half (a dossier → a blueprint plus the log's creation prefix) is built at M1 and used by tests only, so a
   real dossier fixture generates a town from the first viewable build; the ABSORB half (a new dossier → dated dossier
   events and epochs) lands at M3a with the dossier contract it feeds; wiring the port to a live host bridge is the
   roadmap's SettlementForge stage, as §16 already says. Nothing in M-1, M0 or M1's own content moves.
3. **Identity is ours; the dossier's names are bound to it.** Our records keep §6.3's stable addresses; a binding table in
   the map document maps each dossier key (SettlementForge's own anchor precedence, plus a member ordinal for collective
   records) to our address, and re-binds on the rename receipts SettlementForge actually emits. Where it emits none, a
   name change is a removal plus an addition, reported.
4. **Item 72's three dossier-driven terms get typed homes the design already names.** The blueprint's circumstances
   already list `economy`, `trade` and government; the plan types `economy` as sector shares, `trade` as a partner list
   with bearings, and adds `powers` as standings — recipe data at creation, epoch data afterwards — so the dials, the
   character vector and the trade-flow term read data, not SettlementForge.
5. **The clock is settled:** our week is SettlementForge's `calendar.elapsedWeeks`, an integer, no conversion; discrete
   changes fold at their week; an epoch folds at each 52-week boundary or when the population moved past the roster's
   5 % tolerance; and a map rejection lapses only when the population target moved past that same tolerance — not on a
   drift of a few people, which the verify lane showed would otherwise lapse every rejection yearly.
6. **Every gap resolves to DERIVE.** The 24 derivation rows of the mapping (R1–R24) become §7.7's derivation table; the
   port declares optional inputs (the campaign week, a realm block with bearings, display names, an audience table) and
   never a required one. SettlementForge is asked for nothing.
7. **Twelve real dossiers become fixtures** (nine at our rungs, three that must be refused as village-tier), with
   before/after pairs for events and simulator years, labelled with branch, commit, seed and config, copied into
   `plat/tests/fixtures/dossier/` by the apply step — later, not now.
8. **Six decisions are the owner's** (§6); everything else is decided here and recorded vetoably (§7).

## 1. What binds this plan

- **Item 20 (h)** (`docs/AMENDMENTS-2026-09-27c.md` §G; owner, 2026-09-27 evening, verbatim: "whatever the dossier doesn't
  provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of immutable
  truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things from the
  dossier and in accordance with our rules."). Its five parts — two tiers of fact; derive before invent with a §7.7
  derivation table; coherence bars; the map never asks the dossier to change and the port declares OPTIONAL fields only;
  identity without dossier ids through a binding table — are the frame of every section below. This plan builds on them
  and repeats none of them; where a candidate amendment touches the same home it says which part it extends.
- **The last section of `docs/OWNER-INSTRUCTIONS-2026-09-25.md`** (the same words, filed as J77): every gap in the
  mapping resolves to DERIVE, never ASK.
- **Items 20 and 22** (`docs/AMENDMENTS-2026-09-25b.md`): one-way flow, dossier-backed existence, rejection not deletion,
  least-disruption mutation, continuity over path-independence. **Item 21 (d):** the module stays a separate program
  talking through a data protocol.
- **The owner's priority** ("while still prioritizing the current layer of planning and implementation") and the standing
  rule that what we build stays the base until reconciliation: SettlementForge's own map programs and map designs were
  not read by any lane, and this plan takes nothing from them.
- **The verify lane's corrections bind** (`mapping-verify.md` §0, V3, V5, V10, V30, V31, V35, V46, V47, V54, V57–V62,
  V69–V72). Each is applied at the place it bites and named there.
- **Baseline.** Every SettlementForge fact describes branch `fp/integration-2026-09-23` @ `5d699cc68` (2026-09-24 16:33),
  the tip re-read read-only for this plan on 2026-09-27 19:26 and unchanged. The on-disk working tree is an older product
  (sf/model BASELINE; sf/outputs §7.1: the same seed yields a different settlement) and is never a fixture source.

## 2. The dossier port

### 2.1 Where it lives — one package (§14)

`@plat/port` is a new package in §14's list, placed `… ← edit ← export ← port ← api ← app` in the dependency chain: it
depends on `model` (records, `Document`, `DossierRef`), `tables` (the vocabulary rows of §2.5), `edit` (the `EditEvent`
types it emits) and `content` (the roster's class ids for T10), and is imported only by `api` (the host door's
implementation) and the reference app's host glue. SettlementForge's own shapes are read in exactly one place,
`@plat/port/adapters/sf/<line>/` — one adapter folder per SettlementForge product line (the first:
`fp-integration-2026-09-23`), each a pure function from SettlementForge's JSON to the neutral `DossierDigest` below.
Nothing outside the adapter folder names a SettlementForge key; a lint enforces it (the same allowlist machinery as
§6.5 (3)'s, scanning for the adapter's key list). This is s C-15's candidate, chosen over placing the port inside
`@plat/api` (SettlementForge shapes beside the generic bridge) or `@plat/edit` (editing must not know a host). The host's
own code never crosses (C-14): for SettlementForge, host content arrives as data through door 2 (dossier events) and
door 3 (tables); door 4's `ContentProvider` serves in-page embedders only.

### 2.2 The interface (types, our own)

```ts
// @plat/port — the one door for dossier facts: door 1's blueprint at creation, door 2's events afterwards (§11.4)
interface DossierPort {
  readonly adapter: { id: 'sf'; line: string /* 'fp/integration-2026-09-23' */; version: string };
  digest(raw: unknown, host?: HostContext): PortResult<DossierDigest>;            // normalise: the adapter's ONLY job; refuses an unknown shape
  creation(d: DossierDigest, host?: HostContext): PortResult<{ blueprint: Blueprint; prefix: EditEvent[] /* the `assign` events at log positions 0…k, creation: true, EditBase.dossier set (§7.7 One path) */;
                                                              binding: DossierBinding; carried: CarriedFacts }>;
  absorb(doc: Document, d: DossierDigest, host?: HostContext): PortResult<{ changes: DossierChange[]; events: EditEvent[] /* dossier events at their weeks, in SettlementForge's order (decrees first) */;
                                                              epochs: EpochInputs[] /* §2.7's cadence */; binding: DossierBinding; carried: CarriedFacts; report: PortReport }>;
}
type PortResult<T> = { status: 'ok'; value: T; notes: PortNote[] }
  | { status: 'refused'; code: 'E_RUNG_UNAVAILABLE' /* below 1 500 people, no village product registered (§3 R24) */ | 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED'; message: string; notes: PortNote[] };
type PortNote = { kind: 'unmapped_kind' | 'unmapped_word' | 'ignored_key' | 'unreceipted_change' | 'rename_without_receipt' | 'duplicate_key' | 'state_matches_absorbed' | 'realm_block_used'; detail: string };

interface HostContext {                    // every field OPTIONAL — used when present, never required (item 20 (h) (iv))
  week?: number;                           // the campaign's calendar.elapsedWeeks at delivery: the last dating rung (V70); absent → unreceipted changes apply finished (J-M10)
  realm?: RealmBlock;                      // s C-9 (a): partner bearings and weights, the cell's terrain, river and coast, the km scale, realm gates — replaces derived bearings (§2.8 R3)
  audience?: { role: 'owner'|'editor'|'viewer'; knowledge?: 'public'|'local'|'secret' };   // s C-12's table, applied by the host glue to doc.load and view.set
  displayNames?: Record<string, string>;   // s C-8 (b): dossier key → text, applied inside ONE export and never stored
  line?: string;                           // the SettlementForge line the host says it runs; the port picks the adapter, or refuses E_LINE_UNSUPPORTED
}
interface RealmBlock { partners?: { key: string /* the partner's dossier key */; bearingCdeg: Cdeg; distanceKm?: number; weight?: number }[];
  cell?: { terrain?: string; river?: boolean; coast?: { sideCdeg: Cdeg } }; kmScale?: number; gates?: { toward: string; bearingCdeg: Cdeg }[] }
```

```ts
// the neutral digest — ours; the adapter fills it; nothing downstream reads SettlementForge's JSON
interface DossierDigest {
  settlement: { key: string /* the dossier's own id, e.g. s_a37904e104ba189e (J-M12) */; name: string; tierWord: string; population: number;
                seed: Seed /* H32("plat:sf-seed" ‖ _seed): one-way, never SettlementForge's seed itself (s C-8 (a)) */; line: string; versions: Record<string, string> };
  site: { terrain: string; access: string; threat: string; magic: string; culture: string /* the profile key */;
          deposits: { key: string; state: 'available'|'depleted'|'removed'|'discovered'; custom?: boolean }[]; isolation?: { status: string; paths: string[] } };
  walls: { records: string[] /* binding keys of the wall institutions */; citadel: boolean; flagged: boolean /* compound.inst.hasWalls */ };
  wealth: { label: string /* the seven-step word */ };
  economy: { incomeSources: { source: string; percentage: number }[]; exports: string[]; imports: string[]; transit: string[]; entrepot: boolean;
             foodImportPct?: number; foodChains: Record<string, boolean>; chains: { key: string; processors: string[]; status: string }[];
             dependencies: { institution: string; resource: string; severity: number }[];
             tradeLinks: { good: string; goodId: string; flow: 'import'|'export'; partner: string }[];
             partners: { key: string; name: string; relationship: string }[] };
  government: { name: string; governingPower?: string; previous: { label: string; cause: string; week?: number }[] };
  powers: { key: string; name: string; category: string; standing: number /* power ÷ Σ power */; governing: boolean;
            controlled: string[] /* resolved by the port to binding keys through stablePart(id ‖ name) — never by catalogId (V30) */;
            relations: { with: string; kind: string }[] }[];
  institutions: DossierInstitution[];
  quarters: { name: string; phrase: string; landmarks: string[] }[];
  notables: { key: string; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }[];
  conditions: { key: string; archetype: string; severity: number; status: string; sinceWeek?: number; untilWeek?: number }[];
  stressors: string[];                                              // the three stored shapes (null, object, array) normalised (o§3.2)
  religion?: { deityKey?: string; deityName?: string };
  history: { ageYears: number; events: { type: string; yearsAgo: number; severity: string; name: string; week?: number }[] };
  receipts: DossierReceipts;                                        // the dated lists, decrees and decree causes, per binding key (§2.6)
  custom: { definitions: { key: string; category: string; name: string }[] };
  ignored: string[];                                                // the top-level keys the adapter dropped (§2.6's ignore-list), for the report
}
interface DossierInstitution {
  key: string;                       // the binding key (§2.4)
  name: string; kindLabel: string;   // the name without its numeric count range; the twelve non-numeric qualifiers stay in the label (V15)
  kind?: string;                     // the catalogue kind key when present (absent on 11.9 % of birth records and on every simulator-built one, V3)
  category: string; tags: string[];  // case-folded category (a stray lower-case `economic` exists, k row 31)
  count?: [number, number];          // the parsed numeric range, e.g. Taverns (5-20) → [5, 20]
  districtScale: boolean;            // row 30's district-scale kinds (T9)
  facets: { clandestine?: boolean; subterranean?: boolean }; forbidden: string[];
  state: 'active'|'impaired'|'remnant'|'ruined'|'removed'|'destroyed'|'vacant'; fate?: string; inactive: boolean;   // state by V59's precedence: fate and _worldPulseInactive first, then status; impaired from visible impairments (V16)
  impairments: { type: string; severity: number; cause?: string; covert?: boolean }[];
  knownTo?: 'public'|'local'|'secret'; founded?: { week: number };
  renamedFrom?: { name: string; receipt: 'demoted_by_disaster' | 'upgraded_by_reconstruction' };   // the only institution renames the line emits (V5, V62)
  custom?: { uid: string }; receipts: string[]; order: number;      // array position: item 20 (h) (v)'s tie-break for two records of one key
}
```

```ts
// what the map document keeps for the port: canonical, outside the model digest (like hostContent), rebuildable from the log's dossier events
interface DossierBinding { line: string;
  rows: { dossierKey: string; entity: Id /* our §6.3 address */; kind: string; since: { seq: number }; rebound?: { from: string; seq: number; receipt: string }[] }[];
  factHash: Hash128 /* digest of the carried facts after the last absorbed change (s C-3) */;
  absorbed: { seq: number; week: number | null; factHash: Hash128; changeIds: string[] }[] }
type CarriedFacts = Record<string /* dossierKey */, unknown /* the dossier fact's fields as the digest holds them */>;   // the "previous dossier" the diff runs against (s C-3)
interface DossierChange {                  // sf/generation §8.3's envelope as our own type, with the verify corrections
  changeId: string;                        // SettlementForge's event id, outcome id or decree id; else H128(element, op, week)
  source: 'event'|'pulse'|'decree'|'regeneration'|'edit'|'diff';
  week: number | null;                     // §2.7's dating rungs; null for a draft or an unreceipted change with no host week
  cause?: { kind: string; ref?: string; author?: 'dm'|'world'|'party'|'guard'|'surveyor'|'clerk' };
  element: { kind: 'settlement'|'institution'|'power'|'notable'|'resource'|'condition'|'trade'|'quarter'|'government'|'deity'; key: string };
  op: 'add'|'remove'|'state'|'attr'|'tier'|'population'|'prosperity'|'power'|'rename'|'reopen';
  before?: unknown; after?: unknown; fate?: string; reason?: string; receipts: string[] }
interface PortReport { changes: number; events: number; epochs: number; unreceipted: number; renamesRebound: number; renamesAsRemoveAdd: number; ignoredKeys: string[]; stateMatchesAbsorbed?: number /* §3 Q-3: the index of an earlier absorbed state whose factHash the incoming dossier equals */ }
```

`EditBase.dossier` (§7.1's `DossierRef {element, version?}`) is filled by the port with `element` = the binding key and
`version` = the SettlementForge line (J-P9). `Identity.dossier` (§2.8) carries the same ref on the Use, the Institution
record, or the named feature (unchanged). The optional `EditBase.dossierChange` (mapping G-D14) carries the
`DossierChange` that generated the event so the disruption report can say why (candidate amendment 75).

### 2.3 The two halves, and when each lands

| half | what it does | lands | used by |
|---|---|---|---|
| **digest + creation** | `digest` normalises one dossier (§2.4's keys, §2.5's tables, the ignore-list); `creation` builds the `Blueprint` (population → `size`; T12 → `intent.wealthLevel`; T3 → gate and arterial intent and `toggles.harbour`; the walls bucket → `toggles.walls` and castle or citadel; T4 → the defence level; T2 → the site request; T14 → `circumstances.government`; T13 → `circumstances.economy`; §2.8's partner list → `circumstances.trade`; T15 → `circumstances.powers`; the culture key → the era and region preset and the forms weights) and the creation prefix: one `assign` per institution record with `existence: 'dossier'`, `creation: true`, `EditBase.dossier`, granularity by T9, `dispersed.count` inside the record's range by S2's rows (R9), `knownTo`/`concealment` from the facets (row 33), `PlacementCriteria` from tags, `forbiddenResources`, chains and landmark hints (rows 21, 32, 34, 46–47) | **M1** — test-side only: the B-DOSSIER-lite bench (§4) generates from the fixtures; no host wiring | `generate(blueprint)` through §11.4's door 1, exactly as a blueprint from the dialog |
| **absorb** | the diff of the incoming digest against `CarriedFacts` by binding key (s C-3), one `DossierChange` per changed element; dating by §2.7's rungs; the receipts of §2.6; emission of `assign` / `unassign` / `setAttr` events with `author: 'host'` at their weeks and of `EpochInputs` at §2.7's cadence; re-binding on receipts (§2.4); the report | **M3a** — with §7.7's dossier contract (dossier-backed existence, rejection, positive placement, the disruption budget), which §16 already places at M3a; tests on the fixture pairs of §4 | `doc.apply` (§11.3) with `author: 'host'`, and `EpochInputs.dossier` for changes that ride an epoch (§4.11) |
| **host wiring** | the bridge client that receives SettlementForge's whole dossiers and calls `absorb`; the audience table; the realm block; per-export display names | **the SettlementForge stage** (§16 *Staged by the owner*), unchanged | SettlementForge's host glue |

JUDGMENT J-P1 (vetoable): the creation half is built at M1 and used by tests only, although item 20 (h)'s scope sentence
reads "(iv)–(v) STAGED HOOK (the port and the binding table are the SettlementForge stage's)". A dossier fixture that
generates a town at M1 is the one executable proof that the later connection is a registration, and it costs about one
person-week (§5); the HOST wiring stays staged, so the roadmap's line is kept. Say "veto" to move the creation half to M3a.

### 2.4 Identity — the binding table's key law (item 20 (h) (v) made concrete)

| element | dossier key | why this precedence | re-binding receipt | source |
|---|---|---|---|---|
| settlement | `settlement:<id>` (`s_` + 16 hex, a hash of `_seed`: stable across reload, same-seed regeneration and section rerolls) | the dossier's own statement of "the same settlement"; the save UUID is the host's storage key only (J-M12) | `rename-settlement` renames the title label only | V1 CONFIRMED |
| institution | `inst:cat:<catalogId>` → `inst:uid:<localUid>` → `inst:name:<slug(name)>`, plus `#k` (1…n) for a collective record's members; two records of one key told apart by array order (`order`), reported `duplicate_key` | SettlementForge's own anchor precedence (s C-7; V4); `catalogId` survives the two in-place renames the line performs (demotion and reconstruction upgrade), so it is the better identity key even though it names the OLD kind after them | `demotedFrom` + `worldPulseFate: 'demoted_by_disaster'`; `promotedFrom` + `'upgraded_by_reconstruction'` (V5, V62) — the record keeps its binding row; its CLASS is re-read from the new name (below). No `rename-institution` edit exists on the line (V5) | V3, V4, V5, V62 |
| power | `power:id:<faction.id>` when authored, else `power:<slug(faction)>` | the name is SettlementForge's key; an authored id is honoured first (m§1) | `rename-faction` (wired, 18 sites) re-binds; a coup that renames without a receipt is a removal plus an addition, reported (J-M4) | V24, V69 |
| notable | `npc:<id>` (`npc_<n>`, `npc.<power>_<role>_<i>`, `npc.successor_<n>`) | ids survive reload and edits, not a reroll (renumbered) | a successor's `replacedNpc` (the ousted NAME) links the rows (G-D5, staged) | V6 |
| condition | `cond:<id>` (`condition.<archetype>.<suffix>`) | stable once stored | — | V66 |
| resource | `res:<key>` | catalogue keys | — | V29 |
| quarter | `quarter:<slug(name)>` | a naming claim (J-M1), one per name | — | V10 |
| government | `government` (one per settlement) | its `governingName` is a value, not an identity | — | V24 |

**Class lookup (T10) is separate from identity.** A record's class comes from its current NAME when `renamedFrom` is set
(the kept `catalogId` is the greater or lesser kind's — V5, V62), else from `kind` (`catalogId`), else from the name,
category and tags — the fallback that 11.9 % of birth records and every simulator-built record need (V3, V57). At M1 the
T10 rows cover only the kinds M1's own classes exist for; every other kind falls to its category's generic class and is
REPORTED (`unmapped_kind`), never refused — item 20 (h) (ii)'s fallback rule (J-P11). `controlledInstitutions` entries
are resolved to binding keys through `stablePart(id ‖ name)` against the current roster, never through `catalogId`, and
only the first twelve roster positions can ever be captured (V30, V54). Collective records: n is a map fact derived
inside [lo, hi] (R9); a status on the record is distributed over its members by a rule row (the affected share equals the
severity band; the members chosen on the record's stream) — J-P12.

### 2.5 The vocabulary tables — `@plat/tables`, provenance `own`, the left column SettlementForge's words

The mapping's T1–T16 become sixteen row sets under `tables/dossier/` (`tiers`, `site`, `access`, `threat`, `deposits`,
`quarters`, `landmarks`, `distribution`, `kinds`, `status`, `wealth`, `sectors`, `government`, `powers`, `conditions`,
plus `calendar`), every cell `{value, unit, provenance, calibratable}` as §1.7 requires. The corrections applied:

| table | correction applied (V-id) |
|---|---|
| T1 tiers | unchanged: the population chooses the rung (§1.1); below 1 500 → `E_RUNG_UNAVAILABLE` (§3, owner Q3) |
| T3 access | the prose is never read; `port` has two prose strings on the line (V12); walls come with gates in the sample only — key on the walls bucket, not on equality (V19) |
| T6/T7 quarters | rows added for `Roadside Shrine` ("At the settlement edge": a shrine claim and a soft edge row) and for Waterfront District's second phrase ("Along the river" / "Along the coast" by value) (V10); "Eastern district (traditional)" a soft east row at low weight pending owner Q5 |
| T8 landmarks | six rows added: `Alehouse`, `Net mending post`, `Beaching ground`, `Timber stacks`, `Tool shed`, `Charcoal pit` (V37); nothing created for a string the roster does not demand (J-M2) |
| T10 kinds | name, category and tags fallback for records without `catalogId` (V3); class from the new name after a demotion or upgrade (V5, V62); M1 covers M1's classes only (J-P11) |
| T11 status | keyed on `worldPulseFate` and `_worldPulseInactive` FIRST, `status` only when no fate is present (V59); `captured_by_local_powers` is a CLOSURE of a criminal house after demotion, never a power change (V60); `ruined_by_decree` declared for a coming op (V59 (c)); the closed vocabulary of 18 fates is `worldPulseFates.js:56-75` |
| T13 sectors | unchanged (V18: percentages sum to 100 in 155 of 155); Property Rents neutral, finance its own sector (J-M6) |
| T14 government | unchanged (V24) |
| T15 powers | unchanged (V24); military and arcane kinds added to `Faction.kind` (amendment 79) |
| T16 conditions | rows added for `wartime` and `slave_revolt` (V27) |
| calendar | one row set `sf445`: 52 weeks, 13-week seasons spring first, month ends [4, 8, 13, 17, 21, 26, 30, 34, 39, 43, 47, 52] (V7) |

**Totality test (M1):** every enumeration value that occurs in the fixture set (§4) has a row or the declared fallback;
the port's `unmapped_word` notes over the fixtures are zero for T1–T7, T11–T16 and equal to the M1 class gap for T10, listed.

### 2.6 The change feed — diff against carried facts, receipts, the ignore-list

SettlementForge emits no change stream and no revision counter; a change arrives as a whole new dossier, and after a
multi-week advance only the end state (V52, V56). So the port DIFFS: the incoming digest against `CarriedFacts` by binding
key (s C-3 — the map's own carried facts are the "previous dossier"; no SettlementForge history is needed), one
`DossierChange` per changed element, then the receipts give cause, fate and week. The subscription table is the
mapping's F1–F22 with these corrections:

| change | receipts the port reads (corrected) |
|---|---|
| F1 institution ADDED | a new binding key; `createdByEventId`; decree `add-institution`; `_worldPulseTierAdded` + `requiredForTier` + `createdByWorldPulseOutcomeId`; `_worldPulseEconomyBuilt` + `builtReason` + `foundedAt`; `_worldPulseFounded` + `foundedByWorldPulseOutcomeId` + `foundedAt`; `founded_by_flourishing` (the upswing founding writes NOTHING else — dated by arrival only); an ADD of an existing name is a REOPEN (F6); every added record binds by `name:` (V57). A missing `foundedAt` never means "stood since the founding" (V58) |
| F2 institution REMOVED | `status: 'removed'` + `removedByEventId`; decree `remove-institution`; the closure fates with `status: 'remnant'` and `_worldPulseInactive: true`: `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered`, `abolished`, `disbanded`, `abandoned_with_the_settlement` (V59) → `unassign` → `closeUse` → the plot vacant |
| F3 REDUCED or CONVERTED | `remnant` with `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant` → `setAttr` of the designation (item 18); `captured_by_local_powers` → F2 (V60); `demotedFrom` / `promotedFrom` → F15 plus an F3 re-designation from the new name (V5, V62) |
| F4 IMPAIRED / RESTORED | `impairments[]` (visible ones; `impaired` derived, V16); physical types → `condition`; the five non-physical types → the institution dial only (J-M3) |
| F5 RUINED | `status: 'ruined'` + `destroyed_by_disaster` + `remnantReason` + `calamityHistory[].targets` — `destroyedByEventId` dropped: it belongs to the settlement root (V61) |
| F6 REOPENED / RECONSTRUCTED | `reopenedByWorldPulseOutcomeId`, status `active`; an ADD of an existing name; the reconstruction UPGRADE is a rename in place (`promotedFrom`) (V62) |
| F7 POPULATION | `populationHistory[] {tick, …}` (the last 12: an advance longer than about a season loses its interior, so the tolerance test runs at arrival — V63) |
| F8 TIER | `tierHistory[]` (no week: the outcome id's suffix), `dm_shift_tier:…`; AND a bare `tier` change with no history entry — a calamity lowers the tier directly, a resettlement forces `thorp`, presets that lift proposal gating auto-apply (V47, V64) |
| F10 POWER | `power`, `rawPower`, `controlledInstitutions` (by `stablePart`, V30) — read into `circumstances.powers` at the next epoch, past the hysteresis |
| F11 GOVERNMENT | `governingName`, `previousGovernments[] {label, cause, tick}` (V65) |
| F12 CONDITION | `activeConditions[]` by stable id (V66) |
| F14 TRADE | `_cutRoutes`, `_userRoutes` and a `neighbourNetwork` link (CREATE_ROUTE), `tradeLinks`, a neighbour's live `relationshipType` — a RIVAL or cold-war partner keeps whatever links the dossier lists; only `hostile` (and a suppressed economy) carries none (V31) |
| F15 RENAME | `rename-settlement`, `rename-faction`, `rename-npc`; institutions only through `demotedFrom` / `promotedFrom` (V69); no receipt → remove + add, reported |
| F18 DECREE | `settlement.decrees[]` (`status: 'applied'`, `tickRef`) and `pulseRecord.decreeCauses[]`; a decree cause may carry no world effect yet (an unbound verb), so no diff is expected for every decree (V67) |
| F20 SETTLEMENT END / BIRTH | `destroyedByEventId` on the root (V61); `lifecyclePatch`; `memberBirths` → a new dossier is a new map |
| F21 REROLL | same `id`, much new content → dossier changes by least disruption, reported over budget (J-M11) |
| F22 SF UNDO | the incoming `factHash` equals an earlier absorbed state's → §3 Q-3's ruling (no rewind; forward convergence; `state_matches_absorbed` reported) |

**The ignore-list (a rule in §11.4, candidate amendment 86).** Never inputs: SettlementForge's own map-side layers
(`urbanFabric`, `mapEdits`, `fogSessions`, every `worldState.spatialLedgers.*` sub-ledger including the spatial
substrate), its derived reads (district profile, map profile, causal state, the four-dimension system state, capacities,
daily life, threat profiles, the spine), `simulationTrace`, `aiOverlays`, `generationCoherenceReceipt`, the
`config.priority*` sliders (J-M5: their effect already sits in the institutions and income shares), the NPC social-group
layer (J-M8), prose fields (kept only as description seeds for the clerk). NOT ignored: the campaign's frozen
`spatialDigest` — the one campaign fact the optional realm block may carry.

### 2.7 The clock — the week, the season, the cadence, the lapse

- **Unit.** One SettlementForge tick is one week; `worldState.tick` and `calendar.elapsedWeeks` start at 0 and move
  together (V7; the census: tick 1 / 13 / 52 = `elapsedWeeks` 1 / 13 / 52). Our `week` is that integer, no conversion.
  Never `elapsedMonths` (a derived legacy field) and never `history.age` (a second, frozen clock — V7's precision note,
  which G-D9's stage-count hint must respect).
- **Season.** The `calendar.sf445` row set (§2.5): item 67 (b)'s season row reads SettlementForge's season for a
  campaign week, never a calendar of ours (g§8.4).
- **Dating rungs**, in order: (1) an explicit tick on the receipt (`foundedAt.tick`; `institutionHistory[].tick` for
  lifecycle entries — tier-fate and entrepôt `built` entries carry none, V68; `populationHistory[].tick`;
  `activeConditions[].triggeredAt.tick`; campaign-era `historicalEvents[].tick`; `decrees[].tickRef`;
  `calamityHistory[].tick`; `previousGovernments[].tick`; a news entry's `tick`; the provenance ledger's tick under the
  lit presets); (2) the week suffix of the outcome id (`candidate.tier.demotion.save1.32`); (3) `HostContext.week`
  (optional — the clock is campaign state, outside the dossier, V70); (4) `null`: the change applies finished, without
  stages, as a draft's does (J-M10).
- **Cadence (J-M9, adopted).** Discrete changes (F1–F6, F11–F13, F15–F17) fold as standalone dossier events at their
  week, in SettlementForge's order (decrees first); an `epoch` folds at each 52-week boundary crossed, or sooner when the
  dossier's population has moved from the last epoch's `populationTarget` by more than the roster tolerance (± 5 %),
  carrying `populationTarget`, the circumstances F9, F10 and F14 feed, T16's epoch event kinds and that week's dossier
  events in `EpochInputs.dossier`, with `years` = weeks since the last epoch ÷ 52. A SettlementForge catch-up of up to
  26 weeks (V8) arrives as one batch: the same rule, gaps allowed.
- **The lapse of a rejection (V72; candidate amendment 76).** §7.7 item 3 lapses a rejection "at the first `epoch` event
  folded after it whose `populationTarget` differs from `held.populationTarget`". SettlementForge's population drifts
  almost every week (town-1: 2 130 → 2 132 → 2 156 → 2 175 over a year, sf/outputs), so under the cadence above nearly
  every yearly epoch would lapse every rejection. JUDGMENT J-P6: the lapse fires when |`populationTarget` −
  `held.populationTarget`| exceeds the same ± 5 % roster tolerance that triggers a population epoch — the owner's "grows or
  declines", not a drift of a few people. Chosen over rounding the target to the roster's Δ = 10 grid, which still lapses
  on a 2 % drift. Vetoable.

### 2.8 The derivation table (item 20 (h) (ii)) — every gap resolves to DERIVE

The mapping's R1–R24 are adopted as §7.7's derivation table rows, each with its dossier inputs, rule, chance entry,
coherence bar and optional input, with these adjustments: R3 — a rival or cold-war partner carries its listed trade (V31);
a partner's bearing from two realm placements' `x, y` needs no pack centroids (V71); R6 — reads the typed
`circumstances.economy`, `trade` and `powers` (amendments 77–79); R9 — the fallback class for kinds without a row (§2.4);
R21 — the dating rungs of §2.7; R24 — the refusal (owner Q3). Two rows are added: **R25 the class lookup itself** (a map
fact derived from name, kind, category and tags — never a request for a kind list) and **R26 the instance distribution of a
collective record's state** (J-P12). Every row names where seeded chance enters and the bar it never contradicts; the
§13.2 determinism test that the table is total (20 (h)'s own) covers R1–R26. Nothing is asked of SettlementForge: the
optional inputs of `HostContext` and `RealmBlock` are the only "when present" fields.

### 2.9 The seam's security and projection rules (s C-1, C-8, C-11, C-12; candidate amendment 85)

- **Seed:** `Recipe.seed` = H32("plat:sf-seed" ‖ `_seed`), one-way; `_seed` and `_config` are secret on every
  SettlementForge public surface (s C-8), so no `.plat` ever carries them.
- **Display names:** `HostContext.displayNames` applies inside one export and is never stored (our SVG bakes names as
  outlines; SettlementForge veils flagged words on public pages).
- **Inert exports:** a §11.1 bar — every text node, attribute and metadata string XML-escaped; the SVG writer emits no
  script, event attribute, `foreignObject` or external reference; CI runs hostile names through every exporter.
- **Bridge replies** carry the request's `seq` (`re`); the transport checks the source window as well as the origin and
  queues host messages sent before `ready`; the SettlementForge configuration is an iframe on the module's own origin.
- **Audience:** DM → `owner` (key `secret`); co-DM → `editor`; player → `viewer` (key `public`, raised place by place);
  anonymous and gallery → pictures only under `public`; a DM-full share → pictures under `secret`, never the document.
- **Storage note for the host (not a dossier field):** keep the `.plat` beside the dossier under its own key,
  fingerprinted by `logHead`, never inside `settlement.data` (about ten times the dossier's size; SettlementForge's
  public filter) — s C-6.

## 3. Rulings on the surveys' open questions

The surveys left 27 questions. The owner's are §6 (six). The rest are ruled here (Fable seat; vetoable, §7):

| question | ruling |
|---|---|
| s Q-1 — which seam does the product adopt (planning in SettlementForge's engine, or at the dossier)? | Already answered by the owner's rules for our side: item 20 (h) puts the seam at the dossier and forbids asking for artifacts; a plan from SettlementForge, if one ever exists, enters as optional hints. Whether the product adopts this module is the owner's reconciliation call, which the standing rule already parks — no decision needed now |
| s Q-3 / mapping 4.10 / g Q7 — an SettlementForge undo against our forward-only dossier history | **No rewind mechanism.** An undo arrives as ordinary forward dossier changes (the diff). §4.7 S10b's least-disruption order tries vacant plots first and §4.11 (5) prefers a building's `formerUses`, so an element SettlementForge removed and then un-removed returns to its own vacated building, and an element added and then un-added leaves a plot that was vacant before; the map converges to its earlier state wherever nothing else changed, and the residue is reported with `state_matches_absorbed` (the earlier absorbed state's index by `factHash`). §7.4's rule that a dossier event is never an undo target stays untouched — J-P5 |
| g Q1 / mapping 4.11 — a draft reroll | the same `id` with new content is processed as dossier changes by least disruption, reported over budget (J-M11, adopted) |
| g Q2 — instance counts for collective records | ours, derived inside the range (R9); an explicit count is an optional input if one ever exists |
| g Q3 — a status on a collective record | distributed over the members by a rule row (J-P12) |
| g Q5 — DM events on a canon settlement with no clock | applied finished, no stages (J-M10, adopted) |
| g Q6 — interior weeks of a multi-week advance | receipt-based reconstruction (§2.7's rungs); never a request |
| g Q8 / Q11 — which simulator preset item 67's calibration assumes | the lit Realistic Regional preset (growth-side change beside decline; new realms receive it — g§6.6); the plain default is the degenerate case, calibrated as "few scaffolds, some ruins" — J-P8 |
| g Q9 / m Q1 / mapping Q1 — which SettlementForge line | owner Q1 (§6); the adapter is versioned by line, so the answer costs a folder, not a rewrite |
| g Q10 / mapping 4.14 — SettlementForge's news naming its own districts | owner Q6 (§6), recommendation: accept the mismatch |
| m Q2 — which settlement key | the dossier's `id` (J-M12, adopted) |
| m Q3 — instance ids | the binding table (§2.4); never a request |
| m Q4 — households | derived (R7); their total is the dossier fact |
| m Q5 — faction → institution links | the class-to-power table by default; `controlledInstitutions` overrides past a hysteresis at an epoch; the declared `controls/funds/staffs/protectsInstitutionIds` optional when present |
| m Q6 / s Q-4 — trade direction | derived (R3, R4); the optional realm block replaces derived bearings, north fitted first |
| o Q2 / mapping Q3 — "Eastern district (traditional)" | owner Q5 |
| o Q3 — `spatialLayout` versus institutions and `urbanFabric` over time | the institutions and conditions are the inputs; `spatialLayout` is a naming claim only; `urbanFabric` is ignored (§2.6) |
| o Q4 — `controlledInstitutions` as item 72's political term | yes, as the dossier-overridable override, resolved by `stablePart` (V30); a shared kind is partitioned by relative standing (item 72 (d5)) |
| o Q5 — accept the hand-made `sampleDossier.json` shape? | no: the adapter refuses it (`E_UNKNOWN_SHAPE`); it is a teaching file, not a generated dossier (o§1.1) |
| mapping Q2 — village-tier dossiers before PART III | owner Q3 |
| mapping Q6 / g Q4 — a settlement that dies and is resettled | owner Q4 |

## 4. The fixture set

**Source and provenance.** All files below were generated by the sf/outputs, sf/generation and sf/verify lanes from a
read-only export of branch `fp/integration-2026-09-23` @ `5d699cc68` (byte-identical to the commit, 2 320 of 2 320
files — `mapping-verify.md` treecheck), by `generateSettlementPipeline(config, neighbour, { seed, customContent })` and
`simulateCampaignWorldInterval(…)`, into the session scratchpad; no SettlementForge file was written (five before/after
`find -newer` checks across the lanes). Generation is byte-deterministic across processes and sessions (o§0, V1). The
counts below are this lane's own census (`sf/plan/census-fixtures.out`), CONFIRMED.

**Home (J-P4):** `plat/tests/fixtures/dossier/` in the product repository — the only place §17.1 (3) lets a fixture path
resolve to, and outside `research/` and `captures/`, whose JSON the doc checks read as corpus (memory
`doc-checks-corpus-drift`; sf/outputs §8 (1)). The apply step copies them LATER, not now, with a `manifest.json` whose
row per file holds: `file, sfLine, commit, generatorVersion, seed, config, generatedBy (lane, date), kind
(birth | after-events | after-ticks | world-state), pairsWith, population, tierWord, ourRung, notes`. The seeds are the
lanes' synthetic seeds (`sfout-*`, `plat-sf-probe-1`, the three product sample seeds), so no user secret is stored; the
manifest still marks `_seed` and `_config` as never to be published (s C-8). The working-tree dossiers
(`outputs/r2/disk/*`) are excluded: an older product line.

### 4.1 Birth dossiers (M1's B-DOSSIER-lite input; nine at our rungs, three refusal cases)

| scratch file (`scratchpad/sf/outputs/r2/gen/`) | name, tier word | population → our rung | why it is in the set | size |
|---|---|---|---|---|
| `town-1.json` (seed `sfout-town-1`) | Berghafen, town | 2 130 → TOWN | the primary M1 fixture: riverside, `river` access, walled with a port flag, 59 institutions (7 without `catalogId`), Prosperous, 5 quarters; the surveys' worked examples (o§5.1) | 214 690 B |
| `town-2.json` | Novaorum, town | 3 174 → TOWN | coastal `port`, unwalled with a harbour, latin | 192 327 B |
| `town-3.json` | Glenford, town | 2 492 → TOWN | hills, `crossroads` (3–4 gates), Moderate | 212 491 B |
| `sample-mossgate.json` (seed `mossgate-004`) | Mossgate, town | 4 155 → TOWN | SettlementForge's own product sample card, coastal port, 60 institutions | 212 116 B |
| `town-nb-1.json` | Novasaltus, town | 4 921 → TOWN | the only dossier with partner-level `tradeLinks` (4 links, partner Pianopagus) — R3/R4's named-partner case | 320 866 B |
| `town-cc-1.json` | Großmark, town | 4 196 → TOWN | custom content: `Aurora Provisioners` with `localUid` — the `uid:` binding key; 42 top-level keys | 209 794 B |
| `city-1.json` | Pianopagus, city | 23 178 → CITY | coastal port, 49 institutions, 9 powers, 8 quarters; the after-tick pairs below | 267 206 B |
| `sample-blackcrag.json` (seed `blackcrag-016`) | Black Crag, city | 18 911 → CITY | mountain `crossroads`, product sample card | 237 380 B |
| `metropolis-2.json` | Ventovicus, metropolis | 47 734 → METROPOLIS | coastal port, 61 institutions (the largest roster), 7 quarters | 289 242 B |
| `culture-latin.json` | Collevilla, town | 1 287 → **refused** (`E_RUNG_UNAVAILABLE`) | a SettlementForge "town" under our 1 500 floor (T1) | 202 410 B |
| `sample-cnocby.json` (seed `cnocby-033a`) | Cnocby, village | 767 → **refused** | the product's village sample | 112 884 B |
| `village-1.json` | Lipopol, village | 782 → **refused** | pairs with the after-tick files below (the refusal must hold after ticks too) | 127 906 B |

Also copied for the totality test only (§2.5), not generated from: the 12 culture towns (11 profile keys; `mediterranean`
→ `latin`), `metropolis-1` (95 679, plains crossroads) and `metropolis-3` (45 824, riverside) — the enumeration values of
T2–T5, T13–T15 over the widest spread.

### 4.2 Pairs for the absorb half (M3a)

| pair | files | what it exercises |
|---|---|---|
| seven events on one town | `scratchpad/sf/gen-rebase/br-dossier-town-probe1.json` (Rundhausen, 4 694, before) → `b2-events-final-dossier.json` (after ADD, DAMAGE, REMOVE, SHIFT_TIER, PLAGUE, CHANGE_RULING_POWER, IMPAIR: tier word city, 5 001 people → still our TOWN, 74 records — 15 tier-added with ids and no `catalogId` —, 34 with a status); the per-event record `b2-out-events.json` | F1–F4, F8 (a DM tier shift, `dm_shift_tier:` with no week), F11; conflict 4.4 (a "city" of 5 001 on the TOWN rung); `name:`-bound additions (V57) |
| one week, one season, one year (birth default) | `scratchpad/sf/outputs/r2/tick/default-one_{week,season,year}--{town-1,city-1}.json` with the matching `--worldState.json` (tick 1 / 13 / 52; `calendar` at each) | the diff over whole-object updates; `populationHistory` dating; impairments in place (city-1: 28 of 49 after a year); `controlledInstitutions` (town-1: 1–2 powers hold lists); the clock (V7) |
| a lit year | `rr-one_year--{town-1,city-1}.json` (+ `worldState`) | ruins in place (city-1: 3 `ruined | destroyed_by_disaster`, population 23 178 → 17 827, prosperity Comfortable → Prosperous; town-1 Prosperous → Wealthy); `urbanFabric`, `npcLadder`, `traditions` on the ignore-list; 45–47 top-level keys |
| a year under the plain defaults on the probe town | `gen-rebase/b2-default-final-town.json` and `b2-lit-final-town.json` (Rundhausen 4 034 / 4 031, 23 with a status, 2 remnant or removed) | the closure fates (V59), `remnant` with `_worldPulseInactive` |
| the refusal after ticks | `default-one_year--village-1.json`, `rr-one_year--village-1.json` (782 people, unchanged) | `E_RUNG_UNAVAILABLE` holds on absorb |

### 4.3 What the M1 tests do with them (the B-DOSSIER-lite bench; candidate amendments 83–84)

For each of the nine at-rung fixtures × 5 seeds (our seed derived from `_seed`, then four `rerollLayer` salts): `digest` →
`creation` → `generate`, and the bars: (a) every dossier record placed — 0 tier-6 omissions (§7.7 item 2 already, now on
real input); (b) population within ± 5 % (§16's M1 bar); (c) the residential building count inside the housing record's
range (R7); (d) n inside every collective record's range (R9); (e) walls exactly when the walls bucket is non-empty, gate
count inside T3's row (R2); (f) every quarter name on exactly one district (R5); (g) the population-weighted mean
household band within one band of T12's mapped band (G-D4); (h) the digest identical on Node x86 and arm64 and in the
nightly five-engine run (the fixture round trip: the same fixture and seed give the same `model.digest`); (i) the three
refusal fixtures refused with `E_RUNG_UNAVAILABLE` naming the village product; (j) the totality test of §2.5. The
absorb bars run at M3a on §4.2's pairs: every `DossierChange` dated by a rung of §2.7 or reported `unreceipted_change`;
every removed element's plot vacant, every ruined one present as its ruin; the seven-event pair's disruption within
budget or reported over it; the SF-undo case (`before` fed after `after`) converging with `state_matches_absorbed`.

## 5. What the design gains now, what waits — by milestone, priced

The build order of §16 is unchanged: M-1 (calibration), M0 (spikes) and M1 (the viewable town) come first with their
content as listed. Additions are small and named with the §16 line that absorbs them, so the milestone rows stay equal
to the total (§16's rule for a pass that adds build work). Item 72's own mechanisms — the dials, the character vector,
the quarter identities — are pass c's to apply and price; this plan prices only the port-shaped pieces.

| milestone | piece (candidate amendment) | line that absorbs it | added |
|---|---|---|---|
| **M-1, M0** | nothing | — | 0 |
| **M1** | `@plat/port` package with the `DossierDigest`, one SF adapter (line `fp/integration-2026-09-23`) and the creation half (73); the binding table's shape and key law in the document (74); the `tables/dossier/*` row sets — T1–T5, T9, T11's shape, T12, T14, T15's enumeration, the calendar row — with T10 for M1's classes only (75's tables part, J-P11); the typed circumstance slices `economy`, `trade`, `powers` as recipe fields (77–79's types); `Institution.powers?[]` and `Assignment.state` as schema (79, 80); the one-way seed and the inert-export bar (85); the ignore-list rule (86); the fixture set, its manifest and B-DOSSIER-lite with the creation bars and the totality test (83, 84); the refusal below 1 500 in the port (81) | O11 exports and interop (+1: the host-input contract made concrete); the verification rig (+0.5–1: fixtures and bench) | +1.5 / +2 pw |
| **M2b** | T10's full rows with "the rest of the base content"; the economy dial and the trade weights reading the typed slices as field drivers (77, 78: the slices exist from M1; the DRIVERS are pass c's item 72 (d4) and the trade-flow term — priced there); the power standings read by the dials (79: the same) | the content line (+0.5) | +0.5 / +0.5 pw |
| **M3a** | the absorb half: the diff against carried facts, `DossierChange` and `EditBase.dossierChange`, the dating rungs, the receipt tables, re-binding on receipts, the epoch cadence, the SF-undo convergence report (75, 87); `Assignment.state`'s behaviour with §7.7's dossier contract (80); named-feature assignment targets and the `notice` pin (82); bridge reply correlation, the source check and the SF configuration line (85); the absorb bars on §4.2's pairs (83) | O10's dossier contract (+1.5), O11 (+1), the rig (+0.5) | +2 / +3 pw |
| **M4** | the lapse threshold (76) inside the existing "lapse of a rejection at an epoch" hook; the rung profile read at each epoch's `populationTarget` with the frame grown (81) | the unpriced-mechanisms line (+0.5) | +0.5 / +0.5 pw |
| **staged — the SettlementForge stage** (unpriced, as §16 leaves the roadmap's stages) | the host wiring of the port to `doc.apply` and `generate`; `HostContext`'s realm block, display names and audience table in use; `PowerRelation`, the legitimacy scalar, `ConditionOverlay`, `DepositSite`, `HistoryHint`, the dossier-backed `Person` (88); the village product's port path | — | — |

Total added to the base: **+4.5 / +6 pw**, carried by the milestone rows M1 +1.5 / +2, M2b +0.5 / +0.5, M3a +2 / +3,
M4 +0.5 / +0.5 (PLAUSIBLE estimates, as every §16 figure is).

**What waits for reconciliation, deliberately (documented, not deferred):** the choice of SettlementForge line (owner Q1);
the realm block's supplier and shape on SettlementForge's side; whether SettlementForge's own plan artifact, if it ever
exists, is read as optional hints (s E-4); door 1 (owner Q2); the village product's own port path (PART III); any
mapping of SettlementForge's district classes onto ours (never, unless owner Q6 is answered the other way).

## 6. Decisions for the owner (only the true owner decisions; each with a recommendation)

1. **Which SettlementForge line the port binds to first.** `fp/integration-2026-09-23` @ `5d699cc68` (the newest product
   line, 922 commits ahead of the deployed `master`) is what every survey and fixture describes; `master` and the on-disk
   working tree differ materially (the same seed yields a different settlement). Recommendation: name the product line
   that will ship; the adapter is versioned by line, so a later line is a new adapter folder, not a rewrite, and the
   fixtures are re-cut from it by the same scripts.
2. **Door 1 — may SettlementForge's simulator read our map's geometry** (its stripped substrate placed fires and sieges
   by district)? (a) never — the one-way boundary untouched; (b) a canonical-only export built from the seed and the
   dossier history alone, so no user map edit can steer a fire or a siege (a new export option); (c) an export that
   includes user edits — "the stone shapes events", at the cost of map edits reaching later dossier states.
   Recommendation: (b) if door 1 is wanted at all, else (a). A new capability across the boundary — owner-gated.
3. **A dossier below 1 500 people before the village product exists** (75 of 155 generated dossiers; SettlementForge's
   thorps, hamlets, villages and its smallest towns). Recommendation: the port refuses it with a message naming the
   staged village product — drawing a 1 500-person TOWN would contradict the dossier's population, a dossier fact
   (item 20 (h) (iii)). The standalone clamp of §1.1 stays for requests that carry no dossier.
4. **A settlement that dies and is resettled on its site** (SettlementForge's lifecycle mover; F20). Recommendation: one
   map — the ruin stages, then an epoch of regrowth on the old plan (item 8's regrowth-first order) — rather than a new map.
5. **"Eastern district (traditional)"** — the one compass statement in any structured field, on every Religious Quarter
   of every culture (154 of 154). Recommendation: treat it as a SettlementForge placeholder (a soft east row at low
   weight, dropped on the owner's word); if it is a rule to honour, the row becomes a hard east preference.
6. **SettlementForge's news may name districts of its own layout that our map does not have** (its simulator places
   damage by its own district reads). Recommendation: accept the mismatch and never name our districts to match its news;
   the alternative — our districts following SettlementForge's district classes — would make its map program the base,
   against the standing rule.

Not an owner question after all: the seam (s Q-1) — item 20 (h) answers it for our side; the SettlementForge undo (ruled
in §3); the preset for item 67's calibration (ruled, J-P8).

## 7. Judgment calls (vetoable; say "veto J-P<n>" to flip one)

| id | chose | over | because |
|---|---|---|---|
| J-P1 | the port's creation half at M1, test-side, the host wiring staged | the whole port at the SettlementForge stage (20 (h)'s scope sentence read literally) | a dossier fixture generating a town at M1 is the one executable proof that connection is a registration; about one person-week; the roadmap's staged line is kept |
| J-P2 | SettlementForge's shapes confined to `@plat/port/adapters/sf/<line>/`, translated to a neutral `DossierDigest`, enforced by lint | reading SettlementForge fields in the port core or in `@plat/api` | a second SettlementForge line or a schema change then costs one folder; the module never learns a host key |
| J-P3 | identity from `cat:` → `uid:` → `name:` (SettlementForge's own precedence), CLASS from the current name when a demotion or upgrade receipt is present | re-ordering the precedence, or re-classing from the kept `catalogId` | `catalogId` survives the line's two in-place renames (identity holds) while naming the wrong kind afterwards (V5, V62) |
| J-P4 | fixtures at `plat/tests/fixtures/dossier/` | `tests/fixtures/dossier/` at the Maps root, as the brief's wording suggests | §17.1 (3): no fixture path may resolve outside `plat/`; `research/` and `captures/` JSON is read by the doc checks as corpus |
| J-P5 | an SettlementForge undo is a forward change that converges through vacant-first placement and `formerUses` | a rewind mechanism over the dossier events after a matching absorbed state (s C-4's candidate) | §7.4's ruled text stays intact; the solver already returns elements to their vacated buildings; the residue is reported |
| J-P6 | the lapse threshold = the roster tolerance (± 5 %), the same number as the population epoch trigger | rounding `populationTarget` to the Δ = 10 grid | rounding still lapses every rejection yearly on a 2 % drift (V72) |
| J-P7 | a sub-floor dossier is refused by the port (owner Q3 to confirm); the standalone clamp stays for blueprint requests | drawing a 1 500-person TOWN for a 767-person dossier | the dossier's population is immutable on the map (20 (h) (iii)); a clamped town would be a false map |
| J-P8 | item 67 calibrated against the lit Realistic Regional preset; the plain default the degenerate case | the plain default as the reference | new realms receive the lit preset (g§6.6); the plain default shows almost no construction (g§6.4) |
| J-P9 | `EditBase.dossier.element` = the binding key (`inst:cat:underground_network#1`), `version` = the SettlementForge line | the settlement id, or SettlementForge's own record | one string identifies the element on every event and export; the line disambiguates adapters |
| J-P10 | the binding table and carried facts as a canonical `Document.dossier` block outside the model digest, rebuildable from the log's dossier events | inside the model (in the digest) or session-only | like `hostContent`: needed for replay-free diffs, verifiable against the fold, never a model input |
| J-P11 | T10 at M1 covers M1's classes; unknown kinds fall to the category's generic class and are reported, never refused | refusing a dossier with an unmapped kind, or writing all ≈ 280 rows at M1 | item 20 (h) (ii)'s fallback rule; the full rows belong with "the rest of the base content" at M2b |
| J-P12 | a status on a collective record is distributed over its members by a rule row (the affected share by severity band, members chosen on the record's stream) | impairing every member, or the first only | a "Taverns (5-20)" impaired at 0.4 is some taverns closed, not all |
| J-P13 | item 72's dossier inputs as three TYPED circumstance slices (`economy: EconomyShares`, `trade: TradePartner[]`, `powers: PowerStandings`) in the recipe and in `EpochInputs.circumstances` | materialising `Faction` entities in the base for every dossier power (mapping G-D1 (b)) | the dials and the character vector read standings, not entities; `Faction` stays "base schema, materialised by the module" (§10.1); the recipe already names `economy` and `trade` as circumstances (§4.2 S0, §7.7 item 2; V35) |
| J-P14 | the mapping lane's J-M1–J-M12 adopted as they stand, with V-corrections where they bite (J-M4's receipt list gains `demotedFrom`/`promotedFrom`; J-M7's refusal goes to owner Q3; J-M9 gains J-P6's threshold) | re-deciding them | each was reasoned on the surveys' evidence and none was rejected by the verifier |

## 8. The relayed edit-build experiment (the owner's request that triggered this run)

The owner's request relayed with this run — "as a bit of an experiment once you get to the edit build, what tools and
builds would you need to build the following for edits. And see if you should build it." (the Baldur's Gate map) — was
answered by the Fable manager as J78 (`docs/experiments/known-city-authoring.md`: build it as M3a's acceptance fixture from
an ORIGINAL skeleton, no image converter, bridge-deck plots staged) and as OWNER RULE item 101 (`docs/AMENDMENTS-2026-09-27e.md`:
twelve tools in five layers, one vocabulary on three surfaces, the skeleton file as the log's creation prefix). This plan
adds no build item for it and changes nothing in either. Where it meets the port: the creation prefix is SHARED — the
dossier's `assign` events carry dossier facts; a skeleton's drawn walls, ways and boundaries are declarations that rank
below dossier existence and below assignments in §7.7's precedence line (lock > dossier existence > assignment >
user-drawn geometry > rule tables > defaults), and item 101 (c) T7 already says that with a dossier connected "the roster
IS the dossier's and the author may only place". So a known city's skeleton may shape WHERE a dossier's institutions land
(its `placeAt`s are positive placements, honoured when the hard rows allow) and never adds or removes a dossier element
(mapping §5.4, adopted). The clerk of item 101 (d) and the table ledger's clerk on SettlementForge's side never meet in
the module: table events arrive as ordinary canon events (F19).

## 9. Evidence

**CONFIRMED (read on disk or executed by this seat):** every design fact cited from `docs/ARCHITECTURE.md` (§1, §2.7–§2.9,
§4.2 S0, §4.11, §6.3, §7.1, §7.7, §10, §11, §14, §16, the staged list) and from the owner items (20, 20 (h), 21, 22,
63–72, 101); the SettlementForge branch tip (`git log -1`, read-only, 19:26: `5d699cc68`, 2026-09-24 16:33); the fixture
census of §4 (`sf/plan/census-fixtures.out`: names, tier words, populations, our rung by §1.1's bands, institution counts,
records without `catalogId`, statuses, ruins, powers with `controlledInstitutions`, quarters, trade links, site keys,
prosperity, walls and port flags, seeds, ids, sizes, top-level key counts; the world clocks at ticks 1, 13 and 52).
**CONFIRMED by the surveys and re-derived by the verifier (relayed):** every SettlementForge fact carrying a V-id or a
survey section. **PLAUSIBLE:** every proposal — the port's types and halves, the tables' right-hand sides, the milestone
placement and the person-week estimates, the derivation rows' rules, the rulings of §3 and the judgments of §7. The
experiments that would settle the load-bearing ones: (1) J-P1 and §4.3 — at M1, generate from `town-1` and assert the
ten bars; (2) J-P5 — feed `br-dossier-town-probe1` after `b2-events-final-dossier` through `absorb` and measure the
residue against the birth map's digest; (3) J-P6 — fold sf/outputs' default year through the cadence with one rejection
recorded at week 0 and read `lapsedAt` (the verifier's own experiment for V72); (4) J-P12 — impair `Taverns (5-20)` at
0.4 in a scratch copy and check the member share.

**Not done here, stated plainly.** No SettlementForge file beyond `git log -1` was touched; no SettlementForge map program
or map design was read; the surveys' PENDING FABLE REVIEW rows (B-sf/*) are not closed by this file — the plan seat
adopted their facts with the verifier's corrections and ruled on their proposals; a separate Fable review of the six files
remains as J76 schedules it.

## 10. Owner decisions ruled (2026-09-28)

The owner delegated §6.1 and §6.2 ("for the following, i leave to your judgement"). Ruled as J86 in docs/PROGRESS.md (Opus 5.5 manager — pending Fable review): §6.1 — bind first to `fp/integration-2026-09-23` @ `5d699cc68`; §6.2 — door 1 stays closed (option (a)); option (b) remains possible later only on the owner's word. §6.3–§6.6 were ruled earlier as J80.
