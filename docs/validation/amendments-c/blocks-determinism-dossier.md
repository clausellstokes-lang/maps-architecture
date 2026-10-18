=== REPLACE ### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) ===
### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

Three input layers above the parameter vector, all persisted in the recipe:

1. **Intent** (outcome targets): form archetype, size as population / area / buildings with a tolerance, water setting
   and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient direction, era and region
   preset, defence level, density. **Expansion** (intent → ≈ 200 internal parameters) is a pure function held in data:
   each intent field maps to internal parameters by `{param, fn: 'const'|'linear'|'smoothstep'|'table', args}` rows
   (tables interpolate linearly), evaluated in a fixed order. **Rows are continuous**: no rounding and no comparison
   inside a continuous control — a discrete outcome is a probability drawn per entity or a discrete control that
   declares itself (§7.8). Example — `wealthLevel ∈ [0, 1]` → `field.characterOffset = lerp(−0.3, +0.3)`,
   `granularity.joinMaxBonus = 2 · wealthLevel` (fractional: its fractional part is the probability that a candidate
   plot takes one more join, drawn from the `plot.join` stream), `greenery.parkPer1000 = lerp(0.1, 0.8)`;
   item 71's class mix reads `wealthLevel` itself — no expansion row — moving every band row's weights toward the
   larger classes in a rich town and the smaller in a poor one, the cuts staying the town's own (§4.7 S10b; J-A71.42);
   `planned ∈ [0, 1]` → `growth.headingSigma = lerp(20, 5)` degrees per 100 m of street, `growth.crossroadProb = lerp(0.02,
   0.15)`, `avenues.probability = smoothstep(0.3, 0.7, planned)` per eligible tier-1 way. Every internal parameter is
   documented (unit, range, effect, provenance, consuming stage) and reachable in the advanced panel (O10 a); the
   registry test proves 100 %. **Surprise me** draws every intent field from its declared range and weights on the
   `intent.surprise` stream of a fresh seed and writes the drawn intent into the recipe, so the town's link reproduces
   it. For a dossier-bound map the port's creation half fills the intent from the dossier by the derivation table
   (item 10 below; `wealthLevel` from the dossier's prosperity word); the filled values are map facts (item 9) and stay
   editable.
2. **Character and circumstances** (items 72 and 76–79): the per-district **intent** — `DistrictIntent` (wealth,
   density, age, function mix, planned / organic, greenery, fortification, building scale), supplied automatically per
   district and overridable — is the input that shapes a district's generation; a district's **character** is item
   72's derived profile (`CharacterVector`, §2.5), read from what was built and naming the district (§4.5), never an
   input. The **circumstances** are one `CircumstanceSlice` (below) per entry of a **timeline** dated in weeks — §4.11's
   week, which for a dossier-bound map is the host's campaign week (item 76) — that *schedules* epoch events: an epoch
   happens only as an `epoch` event in the log (§7.1, hook 8), proposed by the app at a timeline entry or by the port at
   §4.11's cadence, and the timeline's first entry is the creation slice S0 reads (§4.2). The season is read from the
   week through §4.11's calendar row and never stored; an epoch's population target and terrain events ride its
   `EpochInputs` (§4.11); a government's kind names its lordship (§10.2). The slice carries the activity scalars —
   market, harbour and main-street activity, default 1 — that the prosperity field's kernels read under decline
   (§4.11), and the recipe's feature set holds `layers.islands`, II.6's model setting (§7.8).
   **The typed slices** (items 77–79) are read by item 72's dials and terms (§4.5) and by S2 and S3 (§4.2); each is
   recipe data at creation and epoch data afterwards; the port fills them from a dossier, and standalone the blueprint
   and our own rows fill them by the same rules, so every reader sees the same fields with or without a dossier
   (J-A77.71).
   - *Trade* (`trade`, `entrepot`; item 77). **Partners**, in order: the dossier's named neighbours and the partners its
     trade links name, each keyed by its binding key (item 12); with none, one derived partner per through route of the
     settlement's access row (`source: 'derived'`); standalone, one per external bearing the blueprint requests, else
     per through route of its access intent. **Weight**: a partner's listed trade links (a named neighbour with none
     counts one), zero for a `hostile` relationship or a suppressed economy — a rival's or a cold-war partner's listed
     links are kept, as SettlementForge keeps them — normalised to Σ = 1, derived partners sharing equally. **Mode**:
     where the site has navigable water, the partners in weight order take `sea` (a harbour) or `river` (docks on a
     river) until their weights cover the water fraction of all toll and duty income — the income rows the port marks
     water (port duties, river tolls) over all it marks water or road (gate and road tolls) — and the rest `road`; with
     no such income the water fraction is the site's default (one half for a harbour town, one quarter for a river town;
     our own values, calibratable); without navigable water every partner is `road`. **Bearing**: the realm block's true
     bearing when the host sends one (`source: 'realm'`); else a draw on `gate.pick` keyed by the partner's key (§6.1),
     uniform over the arc the site admits for its mode — open water for `sea`, the river's upstream and downstream
     reaches for `river`, the land arc for `road` — so a partner's bearing never moves when unrelated facts change. The
     bearings are S3 (4)'s requested external bearings (§4.2) and carry the gate trade weights; `TradeFlow` — the
     per-gate and harbour weights and the dominant bearing — is derived from the slice, `entrepot` and the road-and-gate
     geometry at §4.3. **North first**: when true bearings arrive for a map drawn on derived ones, the port first turns
     the geo anchor's `bearingDeg` (§11.1) to fit the derived gates to them — no geometry moves — and moves gates or
     roads only for the residual, as a dossier event under item 5's least-disruption budget (J-A77.72).
   - *Economy* (`economy`; item 78). Shares over the sectors of §10.2's `RosterTables.sectors`, Σ = 1: with a dossier,
     its income sources mapped to sectors by the port's revenue rows (a revenue with no sector — rents — drops out and
     the rest renormalise; J-A78.71); standalone, the blueprint's economy setting, by default an even mix, which amplifies
     no class (J-A78.72).
     Read by item 72's economy dial (§4.5) at creation and at each epoch past its hysteresis (§4.11) and by S2's
     town-level character (§4.2 S2, §10.2); the shares are read, never modelled (D-10, D-32).
   - *Powers* (`powers`; item 79). One standing per power: with a dossier, `standing` = its power ÷ the settlement's
     total, its kind by the port's category-and-name rows (military and arcane powers included, §2.7), `governing` and
     `secret` from the dossier; standalone, the governing power the `government` row names and the established religion
     (§10.2's rows), 0.6 and 0.4 (our own defaults, calibratable). `appliedStanding` starts at `standing` and moves only
     past the dials' hysteresis at an epoch (§4.11). The base reads standings, never materialised factions — `Faction`
     stays the module's (§10.1); an `arcane` standing is honoured whenever a dossier states it and, standalone, arises
     only under a `magic` circumstance above `none` (D-3).
   The **undercity** setting (item 65; `auto` by default) is `require` when the dossier lists a subterranean
   district-scale record — placed as a `neighbourhood` assignment that II.7.5's existence test must host — and `forbid`
   when the blueprint or the host's circumstances rule one out; `disorder` (0–1, default 0) is the lawlessness
   II.7.5's size law reads, which the port will fill from the dossier's crime facts through §10.2's crime row, staged —
   the same row that will scale §4.6's hidden share (item 88).
3. **Constraints**: pins and **assignments**:

```ts
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'|'feature';
  target?: Id /* one building / plot, one district, or — granularity 'feature' — the way, bridge, quay or pin a named-feature claim names (item 16 below) */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  criteria?: PlacementCriteria /* a building or neighbourhood assignment's own soft rows: a naming claim's location phrase (item 16) */;
  claim?: { kind: 'name'; bias: { identity: string /* a quarter identity row (§10.2) */; weight: number }[] } /* a naming claim (item 16): it names and biases, never zones */;
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read against §4.7 S11's designation template (item 19) */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */;
  existence: 'map'|'dossier' /* dossier: the element exists on every map the module returns (item 20) */; dossier?: DossierRef /* §7.1: its `element` is the binding key (item 12) */;
  state: 'active'|'ruined'|'removed' /* item 80: written only by dossier events through item 14's rows; a map assignment stays 'active' */;
  memberState?: Record<Id /* a placed member */, 'ruined'|'removed'> /* a dispersed assignment's members a collective record's state reached (item 14); an absent member is active */;
  use?: Id /* the Use record the assignment names (§2.7); the assignment moves with it (item 17 (d)) */; pinned: boolean /* stays where it is under epochs and re-applications; the town adapts around it */;
  knownTo?: 'public'|'local'|'secret' /* item 30 (d): a dossier fact when the dossier sets it (item 9); §9.2's label policy reads it */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a dossier fact when the dossier sets it; resolved and placed by §4.7's concealment rule */;
  front?: string /* item 63: a front the dossier names — its class or its name; absent: §4.7's cover table picks it */ }
type PlacementCriteria = RelationRule[];   // per-assignment overrides of the class's relation rows (§10.2, §4.7 S10b): nearM → a `near` row, minSpacingM → an `avoid` row on the assignment's own members, frontageClass → a `frontage` row, districts / districtKinds / prosperityBands → `band`-class filters
// PlacementSolver, PlacementRequest and PlacementResult are §4.7 S10b's — the one solver every placement path calls (item 16)
interface Rejection { element: Id; site: Id; seq: number /* the rejectSite event */; held: { epoch: number; populationTarget: number /* the target in force when the rejection was made: the last folded epoch's EpochInputs.populationTarget, else the population the recipe resolves to at S2 (§4.2) */ }; lapsedAt?: number /* the seq of the epoch or dossier event that lapsed it */ }   // model data, in the digest (§2.8 lists it); the solver reads it as PlacementRequest.rejected while lapsedAt is unset
interface DisruptionBudgetRow { kind: 'dossier'|'positive'|'relocation'|'assignment'; weights: { displacedUse: number; join: number; subtractedPart: number; vacated: number }; budget: number; displacementDepth: number }   // a rule table (§7.6); defaults displacedUse 1, join 2, subtractedPart 0.5, vacated 1, budget 6, displacementDepth 1 — our own values, calibratable
// — layer 2's records (items 72, 76–79); declared here once and read at their homes
interface DistrictIntent { district?: Id /* absent: the town-wide default */; wealth?: number; density?: number; age?: number; functionMix?: Record<string, number> /* Σ = 1 */;
  planned?: number; greenery?: number; fortification?: number; buildingScale?: number }   // each 0–1; an absent field is derived; the input a district is generated from, never item 72's derived CharacterVector (§2.5)
interface CircumstanceSlice {
  era: string /* the era and region preset (§10.2); its row carries the public-lighting density (item 68) */; biome: string /* §4.9's climate rows */;
  government: Government['kind'] /* its row forces the seats (§10.2) */; threat: number /* 0–1: the defence level's source at creation (item 10, DR2); the evolution engine's over epochs */;
  disorder: number /* 0–1, default 0 (item 65) */; undercity: 'auto'|'require'|'forbid' /* item 65 */; magic: 'none'|'low'|'high' /* item 68; 'none' by default under D-3 */;
  landscape: { fertileLand: boolean; mines: boolean; quarries: boolean; fishing: boolean; logging: boolean } /* the S0 landscape toggles (§4.2) */;
  activity: { market: number; harbour: number; mainStreet: number } /* default 1 each: the prosperity kernels under decline (§4.11) */;
  trade: TradePartner[]; entrepot: boolean; economy: EconomyShares; powers: PowerStanding[] /* items 77–79 */ }
interface CircumstanceTimeline { entries: { week: number /* §4.11's week */; populationTarget?: number; slice: CircumstanceSlice; events?: EpochInputs['events'] }[] }   // Recipe.circumstances (§2.9): entries in week order, the first the creation slice; applied only through `epoch` events (§7.1)
interface TradePartner { key: string /* the partner's binding key, or a standalone name */; mode: 'road'|'river'|'sea'; weight: number /* Σ = 1 over the partners; 0 for a hostile one */;
  bearingCdeg: Cdeg; relationship?: string /* the dossier's word for the neighbour relation */; source: 'dossier'|'derived'|'realm' }
type Sector = string;   // a row key of §10.2's RosterTables.sectors — trade, taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion, military, magic, crime
type EconomyShares = Record<Sector, number>;   // Σ = 1 (item 78)
interface PowerStanding { key: string /* the power's binding key, or a standalone name */; kind: Faction['kind']; standing: number /* Σ = 1 over the settlement's powers */; governing: boolean; secret: boolean;
  appliedStanding: number /* the value item 72's dials last applied: moves only past their hysteresis at an epoch (§4.11) */ }
// — the dossier contract's records (items 10, 12–14 below; the port that fills them is §14's)
interface DerivationRow { row: string /* DR1 … */; family: string; covers: string[] /* the §2.8 registry kinds and attribute paths the row derives */; inputs: string[] /* digest fields, in the order read */;
  rule: string /* the section whose rule derives it */; chance: string /* a §6.1 concern, or 'none' */; bar: string /* the coherence bar it holds (item 11) */ }   // tables/dossier/derivation, provenance own
interface DossierBinding { line: string /* the SettlementForge line (item 73) */;
  rows: { dossierKey: string /* the binding key */; entity: Id /* the address that carries Identity.dossier (§2.8, §6.3) */; kind: string; since: { seq: number }; rebound?: { from: string; seq: number; receipt: string }[] }[];
  factHash: Hash128 /* of `carried` */; absorbed: { seq: number; week: number | null; factHash: Hash128; changeIds: string[] }[] /* every absorbed state, newest last (item 5's convergence report) */ }
type CarriedFacts = Record<string /* binding key */, unknown /* the dossier fact's fields as the port's digest holds them */>;   // the "previous dossier" item 1's diff runs against
interface DossierChange { changeId: string /* the host's event, outcome or decree id; else a Hash128 of (element, op, week) */;
  source: 'event'|'pulse'|'decree'|'regeneration'|'edit'|'diff'; week: number | null /* §4.11's dating rungs; null: applied finished, without transition stages */;
  cause?: { kind: string; ref?: string; author?: string /* the host's author word */ };
  element: { kind: 'settlement'|'institution'|'power'|'notable'|'resource'|'condition'|'trade'|'quarter'|'government'|'deity'; key: string /* the binding key */ };
  op: 'add'|'remove'|'state'|'attr'|'tier'|'population'|'prosperity'|'power'|'rename'|'reopen'; before?: unknown; after?: unknown; fate?: string;
  reason?: string /* the host's reason, shown beside the map's rule in the disruption report */; receipts: string[] /* the receipt fields found (item 13) */ }   // EditBase.dossierChange (§7.1)
interface ReceiptRow { row: string /* F1 … F22 */; element: DossierChange['element']['kind']; op: DossierChange['op'];
  receipts: string[] /* the receipt fields in precedence order: the first present decides cause, fate and week */;
  response: 'assign'|'unassign'|'setAttr'|'status'|'rebind'|'epoch'|'converge'|'none'; dating: 'receipt'|'arrival' }   // tables/dossier/receipts, provenance own, the SettlementForge line in its header
interface StatusRow { status: string; fates?: string[] /* keyed first (item 14) */; response: 'open'|'wear'|'dial'|'smaller'|'removed'|'ruined'|'none' }   // tables/dossier/status
```

**Precedence: lock > dossier existence > assignment > user-drawn geometry > rule tables > defaults** — the one order for
every meeting of protections and inputs (§7.2, §5.2 F-EDIT); S10–S11 apply it to assignments. A targeted assignment on a
locked entity (or a locked attribute path) is an F-EDIT conflict returned as an action — unlock, choose another target,
or keep the lock; the dispersed solver never places a member on a locked entity. A host that must override a lock sends
an unlock first, and the log records it (J-DET-11). **Dossier existence** — with every dossier-owned value (item 11) —
sits below the lock and above every assignment, drawn shape and rule: a dossier-backed element is never removed by
anything on the map and never placed on a locked entity — it takes the best unlocked site the hard rows allow and, when
no site passes them, its first closest option — the fewest hard rows failed, then the best score, in §4.7 S10b's order
— with the rows it fails reported (§5.2 F-SITING), never omitted (J-A20.71).

**One path — placement, then mutation (items 16, 18).** A blueprint's assignments and edits, every element of a dossier
a new document starts from — the port's creation half (§14, item 73) builds that blueprint and this prefix through the
derivation table (item 10), the recipe's seed derived one way from the dossier's (§14, item 85) —
and the declarations of a skeleton file imported as a new document (§11.1, item 101), become `assign` and edit events at
log positions 0…k, the `assign` events flagged `creation` (the prefix the base derivation's S2 reads ahead as fixed
rows, §7.4, J-A22.74: the dossier's elements are counted in S2's demand as well, so their land is claimed eagerly at S7b
and S10 (3) places them claims-first — J-A22.72; a skeleton's drawn declarations are read ahead by the stages that make
what they declare, §4.1);
every `assign` event — from the blueprint, the dialog, the host bridge or the host door (§11.4) — is placed by §4.7 S10b's
one solver for its scope (claims-first at positions 0…k, the least-disruption order after the city is built) and applied
to each placed plot by §4.7 S11's designation mutator, so an assignment gives the same town whichever way it arrived and
never re-rolls what stood there. **Re-solving:** when a member of a dispersed assignment is superseded without a
successor, only that member is re-placed, with every mapped placement as a fixed point (the minimum spacing is measured
from them); nothing still mapped moves. **Epochs (item 17 (d); J-A17.71):** an assignment is a stable identity that moves
with its use under §4.11's use step unless `pinned`, in which case it stays and the town adapts around it; members are
added only by an event that changes the count or the criteria and are then placed with the existing members fixed; every
move, closing and reopening is reported (§5.4's `changes`, §11.3).

**The dossier contract (items 20 and 22; owner: "the map does not edit the dossier … This module only takes input from
SettlementForge and returns back the map").**
1. *One way.* SettlementForge → map module → map. The dossier enters through the host door of §11.4 as dossier events —
   `assign`, `unassign` and `setAttr` events with `author: 'host'`, `EditBase.dossier` and `EditBase.dossierChange` set
   (§7.1) — in the host's order; the module never writes to, patches or proposes a change to the dossier, and the bridge
   has no message that does (§11.3). Map edits live in the map's own document (§2.9), which the host may store as an
   opaque artifact; nothing in it flows back. **The port produces the events** (§14, item 73). SettlementForge sends
   whole dossiers and no change list, so the port DIFFS the incoming dossier against the dossier facts the map already
   carries by their binding keys (`Document.dossier.carried`, item 12) — no host-side history is needed — writes one
   `DossierChange` per changed element (item 13), dates it by §4.11's dating rungs (item 76) and emits its events.
   **The map never asks** (item 20 (h) (iv); the owner: "it is one directional"): a gap in the dossier is the map's to
   fill by the derivation table (item 10), never a request — no message, report or field asks the host for a fact, and
   the doors (§11.4) and the port declare OPTIONAL inputs they use when present (`HostContext`, §14), never a required
   one beyond what the dossier holds today (J-A20.79). **What the port never reads** (item 86; J-A86.71): a host's own
   map-side layers (`urbanFabric`, `mapEdits`, `fogSessions`, every `worldState.spatialLedgers.*` sub-ledger, the
   spatial substrate included), its derived reads (the district profile, the map profile, the causal state, the system
   state, capacities, daily life, threat profiles, the spine), its generation log (`simulationTrace`), `aiOverlays`,
   `generationCoherenceReceipt`, its generation sliders (`config.priority*`), its NPC social groups, and prose beyond a
   description seed the clerk may read (item 101); the campaign's frozen `spatialDigest` is the one campaign fact the
   optional realm block may carry (§14). The adapter reports every key it dropped (`ignored_key`, §14). The reasons: a
   host's own map memory would make its map program the base, against the owner's rule that what we build stays the
   base; the sliders' effect already sits in the institutions and the income shares, so reading them would count it
   twice; and SettlementForge's own district names — in its news — are never matched to our districts (owner, J80 Q6;
   J-A86.72).
2. *Existence.* Everything the dossier specifies — buildings, institutions, assignments, named features — is a
   dossier-backed assignment (`existence: 'dossier'`) and exists on every map the module returns, live or — when the
   dossier lists it ruined — present as its ruin (item 14): F-SITING never drops it, `delete` never removes it, and only
   a dossier event removes, adds or re-designates it; a removal (`state: 'removed'`, item 14) leaves the plot vacant
   through `closeUse` (§4.11) for item 17's rules to re-use. The dossier's population is a dossier fact as well — a
   count, which the households that fill it honour: they are map facts (item 9), derived and housed through the roster's
   demand (§10.2). A map event — one a user, or a host's map edit, appends without `EditBase.dossier` — that would
   close, remove or re-designate a dossier-backed element is refused as F-EDIT (§5.2), with the actions `rejectSite`
   (move it) and `placeAt` (designate the plot for something else, the element re-placed): an `unassign`; a `setAttr` of
   its use or class; a `convert` `closeUse` of its use or `mutate` of its plot to another designation; a conversion that
   empties or removes the building that houses it (`vacate`, `abandon`, `decay`, `ruin`, `robStone`, `clear`,
   `demolish`); a plot `join` or `split` whose fate would demolish that building. A map `delete` of it is recorded as
   `rejectSite` (item 3), and a `relocateUse` or `swapUse` moves it and is not refused (J-A20.75). An `epoch` is bound
   by the same rule without being refused by it: no step of an epoch closes a dossier-backed use or leaves one without
   its building — §4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a
   step would close it or empty or remove that building — so every dossier-backed element is live and placed — or
   present as its listed ruin (item 14) — after every epoch (§5.3's row). Elements the generator added on its own —
   filler houses, trees, lanes — may be deleted on the map with local repair, and whatever the dossier needs of them
   (housing for its population, a demanded class) is re-provided elsewhere by the same solver (J-A20.72).
3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1): the site is
   excluded (`Rejection`, above; `PlacementRequest.rejected`), the solver re-places the element by the least-disruption
   order (§4.7 S10b) and the surroundings repair locally (§7.3), from the same seed. The rejection is not permanent
   (owner: "it is not permanent because if a settlement grows or declines that might be appropriate to put something
   there"): it holds while the settlement stays in the state it was made in and **lapses** — the site eligible again
   under the ordinary rules, the element staying where it is — at the first `epoch` event folded after it whose
   `populationTarget` differs from `held.populationTarget` by more than the roster tolerance (§4.11; item 76; J-A76.43, J-A76.71)
   — the settlement has grown or declined, not drifted — or at the first dossier event folded after it whose effective
   scope holds the site's block; the lapsing event writes `lapsedAt` into the record inside its own touched set, so no
   event is logged for the lapse, and an undo of a lapsing epoch that carried no dossier event restores the hold (a
   dossier event, or an epoch that carried one, is no undo target: §7.4; J-A20.74, with J-A20.41). A user lifts a
   rejection with `rejectSite` and `op: 'lift'`.
4. *Positive placement* (owner: "maybe you want a specific place to be something"). `placeAt` pins a dossier-backed
   element, an assignment member or a designation the generator controls to a chosen plot: the solver honours it when
   the hard rows allow — joining plots and mutating the buildings by §4.7 S10 (7) and S11, relocating whatever was there
   by the least-disruption order — and otherwise returns F-EDIT with the blocking rows and the closest acceptable sites
   (§5.2). It never creates or deletes dossier content, persists until the user lifts it or the dossier removes the
   element, and draws on `siting` keyed by the plot and the event (§6.1), so it follows the same determinism.
5. *Re-application.* A dossier change after the first map is a mutation of the CURRENT map, never a reshuffle: the
   solver's least-disruption order (vacant or under-used plots first, then a use that can move within the same district,
   one displacement level, then a join only when the new use needs the land — §4.7 S10b) finds the site, S11's mutator
   adapts the buildings, a removal vacates; households the dossier adds fill standing shells first by `relet`, up to
   §2.6's capacity, before any new plot (item 28 (f), §4.11), their plans re-cut as §7.3 states. Positive placements and
   the map's other edits are honoured first, as pins and protected entities (§7.2), and the dossier event is applied
   around them; an edit it can no longer honour is reported and orphaned, never dropped silently (J-A20.73). Its
   **disruption** — every moved use, joined or vacated plot and mutated building, each with the rule that caused it — is
   computed in the dry run against the request kind's `DisruptionBudgetRow`, stored in the event (`EditBase.disruption`,
   §7.1) and shown as its fate report (§7.3 item 4); the budget bounds the search — the first rung of the order that
   fits is taken — and the effective scope (§7.3 item 1), never the dossier's authority: an event no rung fits within
   budget still lands at the least-disruptive site and is reported over budget (J-A22.73). Everything not in the
   disruption set keeps its exact geometry and identity (the oracle, §7.3 item 7 (vii)).
   **A host's undo (item 87).** A host that restores an earlier dossier state sends it as a dossier change like any
   other; the port diffs it (item 1), and because §4.7 S10b's least-disruption order takes vacant plots first and
   §4.11 prefers a building's `formerUses`, an element the host removed and then restored returns to its own vacated
   building and an element added and then withdrawn leaves the plot it took — the map converges to its earlier state
   wherever nothing else changed; the residue is reported, and the report names the earlier absorbed state the dossier
   now equals (`state_matches_absorbed`, by the binding's `absorbed` hashes, item 12). No rewind of dossier events
   exists: a dossier event stays no undo target (§7.4; J-A87.71).
6. *Continuity.* The map is a function of the seed, the ordered history of dossier events and the map's own edits
   (§6.2): the same history replays to the same map exactly; two histories reaching one dossier may give different,
   equally valid maps — continuity over path-independence, because the owner asked that the seed "respect the previous
   layout prior to the addition or subtraction" (J-A22.71). A brand-new map from an existing dossier has every element
   present from the start (One path, above). Inside the evolution stage the same rules apply. A dossier change the host
   sends with an epoch rides in that epoch's `EpochInputs.dossier` (§4.11) and is applied at §4.11's step (e), after the
   use step and the ladder and before siting (J-A22.42); one sent between epochs folds at its own log position and
   mutates the map the last epoch left (item 22 (e)). The events an epoch carries take their `seq` from `nextSeq` when
   the `epoch` event is appended — the epoch's own first, then the carried events' in the host's order — so their draws
   and minted addresses are keyed as a standalone event's are (§6.1, §6.3); they fold only inside the epoch and are
   never undo targets, and neither is the epoch that carries them (§7.4) (J-A22.76).
   The port groups a host's changes into these events and epochs by §4.11's cadence (item 76): an element change folds
   at its own week as a standalone dossier event, in the host's order; a population change or a typed-slice change
   rides the epoch the cadence schedules, in its `EpochInputs`.
7. *Knowledge.* A dossier may designate an institution hidden or secret and, for a clandestine one, its concealment and
   its front (item 63): `Assignment.knownTo`, `concealment` and `front` are then dossier facts; the solver prefers
   hidden plots through the class's relation rows (§4.6, §4.7 S10b; item 30), places a front and the function it hides
   as one item by §4.7's concealment rule, and §9.2's label policy reads them. A raid or a discovery is a dossier event,
   applied as a least-disruption mutation — the front may close, the hidden function relocate, a passage be sealed
   (items 17, 22, 30) — and a map delete relocates by `rejectSite` (item 3). A map `setAttr` of a value the dossier set
   — `knownTo`, `concealment`, `front` — is refused as dossier-owned (item 11; J-A20.77, superseding the override
   clauses of J-A30.71 and J-A30.72); the drawing's display stays the user's — a label's display text and its visibility
   (§9.1), and what each viewer sees by the viewer's knowledge key (§11.3). Where the dossier sets no such value it is a
   map fact, edited as §7.1 lists.
8. *What is staged.* The port's creation half is the base's (M1, exercised by the frozen dossier fixtures of §13.2 —
   items 83, 84 — never by a live host), its absorb half lands with this contract at M3a, and its wiring to a live host
   bridge is the owner's SettlementForge stage (§11.4, §14, *Staged by the owner's roadmap*; item 73); no door opens the
   other way — the host's simulator never reads the map's geometry (J86, §11.4). The records and rows the port will fill
   when a host supplies them are declared schema-complete and empty in the base: `ConditionOverlay`, `DepositSite`,
   `HistoryHint`, `PowerRelation` and the dossier-backed `Person` (§2.7), and the impairment, hinterland, crime,
   custom-weight and legitimacy rows (§10.2) (item 88). Everything else in this contract — the events, records,
   precedence, rejection, positive placement, budget, continuity and items 9–16 below — is the base's, exercised today
   through the dialog, the API and the fixtures.

**The derivation rule and the port's contract** (item 20 (h), 2026-09-27; items 74–87; owner: "whatever the dossier
doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of
immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things
from the dossier and in accordance with our rules").

9. *Two tiers of fact* (item 20 (h) (i)). Every fact the map holds is either a **dossier fact** — a record or value the
   dossier supplies, carried by the map under its binding key (item 12), immutable on the map and changed only by a
   dossier event (item 1) — or a **map fact** — everything else: positions and geometry, plots, buildings and their
   classes, the households that fill the dossier's population, lot assignments, prosperity values, the settlement-level
   trade direction and the partners' derived bearings, a collective record's count inside its range, the names the
   dossier does not give, each district's character. Map facts belong to the map — generated,
   regenerated, edited and replaced freely, subject only to items 10 and 11. The dossier facts, by kind: the
   settlement's name, tier word and population; each dossier-backed element's existence, state (item 14), name, kind and
   membership and, where the dossier gives them, its `knownTo`, concealment and front; a collective record's count
   range; each quarter's name (item 16); the typed slices' dossier-sourced values — partners, relationships and listed
   links, income shares, power standings, the government; the conditions. Each record states per field which tier
   holds it — §2.8's tier marker, read by §7's edit rules (item 11), §9.2's reader, §11's exports and the API through
   which any clerk reads (§11.2). An author's declarations (item 101) are map facts the marker labels declared: held
   against generation and re-rolls until the author changes them (§7.2), and never above a dossier fact — a declaration
   that would contradict one is refused as dossier-owned, with the closest acceptable alternatives (item 20 (g))
   (J-A20.76).
10. *Derive before invent — the derivation table* (item 20 (h) (ii)). A map fact the dossier does not supply is derived
   from what it does supply, by the design's rules, before any recourse to chance. The table is an INDEX: one row per
   map-fact family — the dossier inputs it reads (the port's `DossierDigest` fields, §14), the section whose rule
   derives it (stated there, never here), where seeded chance enters (a concern of §6.1, or none) and the coherence bar
   it never contradicts (item 11). A row's inputs are read in the order written — a host's optional input when present
   (`HostContext`, §14), then the dossier's, then the blueprint's own — and when none is present the rule's default
   applies; a missing input never becomes a request (item 1). Standalone, the blueprint and our own roster are the
   inputs of every row — the same rows, so connecting a dossier changes inputs, not rules; the tests run the rows from
   M1 on the frozen dossier fixtures and on blueprints alike (§13.2, items 83, 84). The rows are data (`DerivationRow`,
   above; `tables/dossier/derivation`, provenance `own`), each naming the §2.8 registry kinds and attribute paths it
   `covers`; §13.2's totality test proves that every map-fact family of the registry is covered by a row and that every
   row's chance names a registered concern or none (item 20 (h), with item 83's vocabulary test; J-A20.78).

| row | map fact | dossier inputs, in the order read | rule (its home) | chance (§6.1) | the bar it holds |
|---|---|---|---|---|---|
| DR1 | the site: relief, coast and its side, river course and inflow, lake, marsh | the realm cell's terrain, river and coast (optional); `site.terrain`, `site.access`, the water deposits, `site.culture` | S0's site request (`tables/dossier/site`); S1 (§4.2) | `blueprint.features`; S1's `terrain.*` and `water.*` | a coastal dossier has a coast, a riverside one a river, a port one a harbour basin |
| DR2 | walls, enceintes and gates | the realm gates (optional); `walls.records`, `walls.citadel`, `walls.flagged`, `site.access`, the population, `site.threat` | the access row's gate counts; S0's walls and castle toggles; S3's gate law (§4.2); the wall furniture (§4.8) | `gate.pick` | walls exactly when the dossier lists a wall institution; the gate count inside the access row; a citadel record gives a citadel |
| DR3 | trade partners, their weights, modes and bearings | the realm partners (optional); `economy.partners`, `economy.tradeLinks`, the toll and duty income rows, `site.access` | layer 2's trade fill (above), read by S3 as requested bearings (§4.2) | `gate.pick` (keyed by the partner's key) | a `hostile` partner carries no trade; a rival's listed links are kept; a bearing never moves on an unrelated change |
| DR4 | trade flow: per-gate and harbour weights, the dominant bearing | DR3's slice; `entrepot` | `TradeFlow` (§4.3) | none | weights sum to one; a harbour town's harbour carries the sea share; a derived partner is marked `derived` |
| DR5 | districts: count, kinds, boundaries, identities | the population; quarter claims (item 16); district-scale records; `site.culture` (the forms weights); power seats (DR11) | S6's typing and grower, item 72's identities (§4.5) | `district.seed`, `district.type` | every quarter name on at most one district, and on exactly one unless reported waiting (item 16); each district-scale record on a neighbourhood of its own; no district named for a social class |
| DR6 | the prosperity field and each plot's band | `wealth.label` (to `intent.wealthLevel` by `tables/dossier/wealth`); the economy and power slices; quarter hints | the field with item 72's dials (§4.5) | `field.chance` | the population-weighted mean band within one band of the wealth row's band |
| DR7 | households: count, sizes, bands | the population; `wealth.label`; the rung; the housing record's range; the economy slice | S2's roster (§4.2, §10.2) | `roster` (its ordinal draws) | the members sum to the population within the roster tolerance; the residential building count inside the housing record's range; every household housed |
| DR8 | the class mix inside a neighbourhood | DR6's field; `intent.wealthLevel` | S10b's class mix (§4.7, item 71) | `siting` | the larger classes' share monotone in the value within a band row |
| DR9 | institution instances: a collective record's count, each instance's class and band | `institutions[].kind`, `.count`, `.districtScale`; the population; `wealth.label` | S2's per-capita rows clamped into the record's range (§4.2); DR24's class; its distribution (§4.5 (3)); S11's templates (§4.7) | `roster` (its ordinal draws) | the count inside the record's range; a singular record placed once |
| DR10 | positions: where each element stands | class, `tags`, `facets`, `forbidden`, the landmarks naming it, chains and dependencies, the power association, `knownTo` | S10b's one solver, claims-first from the creation prefix (§4.7; One path) | `siting` (keyed by the assignment and member); `alloc.district` (a dispersed class's controlled random share per district, §4.5) | every dossier-backed element placed (item 2); a hard row never broken silently |
| DR11 | power seats and turf | `powers[]` (standing, governing, controlled); `government` | item 72's significance (§4.5) | none (ties by address) | the governing power's seat is the government's seat institution |
| DR12 | a district's political alignment | DR10's lots; the class-to-power rows (§10.2) with `Institution.powers` overrides; the power slice | item 72 (§4.5) | none | shares sum to one per district; a shared building counts once |
| DR13 | a district's economic role | DR10's lots; the class-to-sector column (§10.2); the economy slice | item 72 (§4.5) | none | a building serving two sectors counts once, partitioned |
| DR14 | the names the dossier does not give | the dossier's names (protected); `site.culture` | §10.4 with item 72's dominant components | `naming`, `naming.quarter` | no generated name repeats a dossier name within its kind |
| DR15 | buildings: class, footprint, storeys, heights, materials, entrances, basements | the use's class and the plot's band (DR6, DR10); `site.culture` (a template-family row) | S11's designation templates (§4.7, item 19); §2.6 | `siteplan`, `siteplan.entrance`, `heights`, `material` | a material never changes a shape |
| DR16 | hidden plots, passages, fronts | `facets`; criminal categories; covert impairments; `disorder` | the hidden share (§4.6); the concealment rule (§4.7, item 63) | `siting` (the front pick) | a clandestine record's public views show only its front |
| DR17 | the underground: sewers, accesses, the undercity | the population; sanitation records; subterranean kinds; `disorder`; `undercity` | II.7's feature law; II.7.5 | `blueprint.features`, `sewer` | the underground mode only with a navigable run; a required undercity exists |
| DR18 | informal clusters and camps | DR6's field; the rung; migration and famine conditions; slum claims | the cluster rows (§4.7, item 70); the shanty staging (§4.5) | `siteplan` | never on a standing plot floored at the middle band or above |
| DR19 | the hinterland: land uses, their bearings and sizes | the realm cell's resources (optional); `site.deposits`, `economy.foodImportPct`, `site.isolation`, `site.terrain` | S12a and §4.9 | `hinterland.outside` (a deposit's bearing keyed by its key) | every listed deposit has its land use |
| DR20 | the knowledge of places | `facets`; covert impairments | item 30's defaults (§4.6); item 63 (§4.7) | none | a covert fact never reaches a public view |
| DR21 | transition timing | the change's week (§4.11's rungs); the calendar row's season; conditions | the `Works` (§4.11, item 67) | `works` (a Works' duration inside its row's range, keyed by the target's lineage and the start week) | the stage shown at week w depends only on the record and w |
| DR22 | persons beyond the notables | the households (DR7) | `derivePerson` (§10.3) | `people` | a person derives from its key alone |
| DR23 | the rung and the frame | the population | §1.1's size ladders; §3.2 (9)'s frame rule | none | the rung is the population's; a dossier below the floor is refused (item 15) |
| DR24 | a record's class | its name, `kind`, `category`, `tags`; a demotion or upgrade receipt | the class rule (item 12) | none | a kind without a class row takes its category's generic class, reported, never refused |
| DR25 | a collective record's state over its members | the record's state and severity band | the distribution rule (item 14) | `siting` (keyed by the assignment, the event's `seq` as creation index) | the affected share equals the severity band's share |

11. *Coherence* (item 20 (h) (iii)). The derivation obeys four rules, proved by §13.2's coherence bars (item 20 (h)) on
   the design's own dossier events and by the port's bars on the frozen dossier fixtures (item 83), and checked at run
   time by §5.3's coherence rows: (a) no derived fact contradicts a dossier fact — counts, kinds, existence and state,
   membership, the realm-level trade facts (each table row's bar); (b) a dossier change re-derives exactly the dependent
   map facts — the rows whose inputs it changed — inside its disruption set, by item 5's least-disruption mutation,
   never a re-roll; (c) the derivation reads nothing beyond three inputs — the seed, the ordered dossier history and the
   map's edits (item 6), so the same inputs reproduce the same map; (d) nothing derived flows back (item 1). The rules
   bind the DERIVATION — generation, re-derivation and every dossier event; a user's edit of a map fact (a prosperity
   stroke, a moved building, a renamed lane) belongs to the user and stands, since it alters no dossier fact. An edit
   that WOULD alter one — a rename of a dossier-named element or quarter, a change of its kind or class (item 2), a
   `setAttr` of a value the dossier set (`knownTo`, `concealment`, `front`, `state`), a collective record's count set
   outside its range, an `adjust` of a dossier-bound map's population or of a slice value the dossier supplied — is
   refused as F-EDIT with the reason `dossier-owned` (§5.2), as item 2 refuses a removal, the map-side alternative
   offered where one exists (the label's display text, §9.1; a count inside the range) (J-A20.77).
12. *The binding — identity without dossier ids* (item 20 (h) (v), made concrete by item 74). SettlementForge keys most
   of its records by NAME and gives most institutions no id at birth, so the map binds its own stable addresses (§6.3) to
   the dossier's keys in the document's `dossier` block (§2.9: a `DossierBinding` and the `CarriedFacts`, above), which
   the port writes at creation and at every absorb. The KEY LAW, stated here and applied by the port's adapter (§14) —
   the only code that reads SettlementForge's fields (J-A74.72):

| element | binding key | re-binding receipts |
|---|---|---|
| the settlement | `settlement:<id>` — the dossier's own id, stable across reloads, same-seed regeneration and section rerolls; a new id is a new dossier and a new map | `rename-settlement` renames the title label only |
| an institution | `inst:cat:<catalogId>`, else `inst:uid:<localUid>`, else `inst:name:<slug(name)>` — SettlementForge's own anchor precedence; `#k` appended for a collective record's k-th member; two records of one key told apart by their order in the dossier, reported `duplicate_key` | `demotedFrom` with the fate `demoted_by_disaster`, `promotedFrom` with `upgraded_by_reconstruction`: the row is kept and the record re-classed by its new name |
| a power | `power:id:<faction.id>` when the dossier authored one, else `power:<slug(name)>` | `rename-faction` |
| a notable | `npc:<id>` | a successor's `replacedNpc` links the successor's row to the one it replaces |
| a condition; a resource; a quarter; the government | `cond:<id>`; `res:<key>`; `quarter:<slug(name)>`; `government` | none |

   `slug` is the line's own name normalisation, applied by the adapter, so a name key agrees with the catalogue key the
   line writes at birth. **Class is read apart from identity** (row DR24): a record's class comes from its current NAME
   when a demotion or upgrade receipt is present — its kept catalogue key then names the old kind — else from its
   catalogue kind, else from its name, category and tags, the fallback every record without a catalogue key needs; a
   kind with no class row takes its category's generic class and is reported (`unmapped_kind`), never refused (at M1 the
   rows cover M1's classes). **Re-binding** happens only on a receipt of the table: a name change without one is a
   removal plus an addition, reported (`rename_without_receipt`), because a guessed identity is how silent mis-bindings
   begin (J-A74.73). A power's controlled-institution list is resolved to binding keys through the stable part the line
   itself stores — the slug of the institution's own id, else of its name — against the current roster, never through
   the catalogue key. `DossierRef.element` is the binding key and `DossierRef.version` the SettlementForge line (§7.1);
   `Identity.dossier` carries the ref on the entity the element is (§2.8; J-A20.22); a re-binding re-points a binding
   row and never re-keys a map address (§6.3). The model digest does not cover the block, because the model already
   carries each entity's current key in `Identity.dossier`, and `carried` holds dossier facts the map does not draw (a
   notable's role), whose change must not change the map's digest; `binding` is rebuilt from the log's dossier events at
   load and must equal the stored rows (§5.3), and `factHash` is the hash of `carried` (J-A74.71).
13. *The change envelope and the receipt table* (item 75). Every event a dossier change generates carries its
   `DossierChange` (above) in `EditBase.dossierChange` (§7.1), so the disruption report, `LifecycleEvent.cause` and
   §5.4's `changes` say why — the host's reason beside the map's rule (item 22 (b)). SettlementForge records a change
   only through scattered receipts — stamps on the record, capped history lists, decrees, a news feed — so the port reads
   them through the RECEIPT TABLE (`ReceiptRow`, above; `tables/dossier/receipts`): per change kind, the receipt fields
   in precedence order — the first present decides the cause, the fate and the week, by §4.11's dating rungs — and the
   response. The design states the ten rows the survey's verification corrected and F22, the undo row item 87 answers (J-A75.71); the others — F6 reopened, F7
   population, F9 prosperity, F10 power standings, F11 government, F12 conditions, F13 resources, F16 the deity, F17
   notables, F19 a confirmed table event, F21 a reroll — are data rows of the same type, their completeness §13.2's
   vocabulary totality test (item 83). A change no rung dates is applied finished, without
   transition stages, and reported (`unreceipted_change`).

| row | change | receipts read, the first present deciding | response |
|---|---|---|---|
| F1 | an institution added | a new binding key; `createdByEventId` or an `add-institution` decree; `_worldPulseTierAdded`, `_worldPulseEconomyBuilt` or `_worldPulseFounded` with their outcome ids and `foundedAt`; the fate `founded_by_flourishing`, which writes nothing else and is dated by arrival alone | an `assign` with `existence: 'dossier'`, placed by S10b's `dossier` request (§4.7); an addition under a key the map carries as removed or ruined is a REOPEN (row F6, item 14); a missing `foundedAt` never reads as "stood since the founding" |
| F2 | an institution removed | `worldPulseFate` and `_worldPulseInactive` FIRST — the closure fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered`, `abolished`, `disbanded`, `captured_by_local_powers`, `abandoned_with_the_settlement` under status `remnant` — then status `removed` with `removedByEventId`, or a `remove-institution` decree | item 14's `removed`: `unassign`, `closeUse`, the plot vacant |
| F3 | reduced or converted | the fates `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant`; `demotedFrom` or `promotedFrom` | a `setAttr` of the designation in place (item 18's mutation); a demotion or upgrade is also row F15's re-binding, the record re-classed by its new name |
| F4 | impaired or restored | the visible `impairments[]` (the state `impaired` derived from them) | the physical types — capacity, infrastructure, access, supply — one `condition` step per severity band; the non-physical — legitimacy, influence, wealth, staffing, corruption — the power slice's dial only |
| F5 | ruined | status `ruined` with `destroyed_by_disaster`, `remnantReason` and the calamity's targets (never `destroyedByEventId`, which is the settlement's) | item 14's `ruined`: present as its ruin |
| F8 | the tier moved | a `tierHistory[]` entry, or a bare `tier` change with none (a calamity, a resettlement, a preset that applies proposals at once) | the rung re-read at the next epoch's target (§4.11); the tier word re-titles the map (item 15) |
| F14 | trade | `_cutRoutes`, `_userRoutes`, a route link, `tradeLinks`, a partner's relationship — a rival's or a cold-war partner's listed links kept, only `hostile` or a suppressed economy carrying none | the trade slice at the next epoch |
| F15 | a rename | `rename-settlement`, `rename-faction`, `rename-npc`; for an institution only `demotedFrom` or `promotedFrom` | item 12's re-binding; without a receipt a removal plus an addition, reported |
| F18 | a decree | `decrees[]` applied with `tickRef`; the week's `decreeCauses[]` | the decree's own change rows; a decree whose verb binds no world effect expects no change |
| F20 | the settlement ended or born | `destroyedByEventId` on the settlement root; `lifecyclePatch`; `memberBirths` | an END is an epoch that ruins every building by the decline hooks (§4.11); a resettlement of the same site is the SAME map regrowing on its old plan by item 8's regrowth-first order (owner, J80 Q4; J-A75.72); a member birth is a new dossier and a new map |
| F22 | the host undid a change | the incoming dossier's fact hash equals an earlier absorbed state's | item 5's forward convergence, reported `state_matches_absorbed` |

14. *A listed element's state* (item 80). SettlementForge never deletes a record — a removed, ruined or closed
   institution stays listed with its status — so an assignment carries `state`, written only by dossier events through
   these rows (`StatusRow`, above; `tables/dossier/status`), keyed on the fate word and the inactive flag BEFORE the
   status, so that a bankrupt shop is never kept open as a smaller designation:

| the dossier's state (fate first) | the map's response |
|---|---|
| absent or `active` | open |
| `impaired` (derived from the visible impairments) | open; the physical types wear the building one `condition` step per severity band, the non-physical reach the power slice's dial only |
| `remnant` with `privatized`, `downsized`, `reduced_to_watch_post` or `survives_as_remnant` | a smaller designation in place (item 18's mutation) |
| `remnant` with a closure fate (row F2's list), or `removed` | `removed`: `unassign`, `closeUse`, the plot vacant (item 2) |
| `ruined`, `destroyed`, `destroyed_by_disaster`, `ruined_by_decree` | `ruined`: PRESENT as its ruin — its use closed, its building `ruined` (§2.8's existence), counted present by §5.3's dossier row |
| `vacant` (an empty seat, not an empty building) | no physical change |

   A listed ruin stays on the map as its ruin, so a dossier that lists a ruin is never contradicted by a map that shows
   the element open or gone (J-A80.71); an epoch keeps it as it stands — the decline ladder never robs, clears or
   rebuilds its building (§4.11's exemptions) until a dossier event changes its state. A reopen — an element returning
   to `active` — re-opens its use in its own former building first (S10b's `dossier` request ranks it first, §4.7),
   repaired by a `Works` where item 67's clock runs (§4.11) and at once otherwise. A collective record's state is
   distributed over its placed members: the affected share is the severity band's share (all members when the state
   carries no severity), the members chosen on `siting` keyed by the assignment, the dossier event's `seq` its creation
   index (§6.1), and recorded in `memberState`; the record's `state` stays `active` while any member is (J-A80.72).
15. *Population, rung and tier word* (item 81; owner, J80 Q3). A dossier whose population lies below 1 500 is refused by
   the port (`E_RUNG_UNAVAILABLE`, naming the village product, PART III) while no village product is registered: §1.1's
   clamp to a 1 500-person TOWN applies only to a blueprint request that carries no dossier, because a dossier's
   population is a dossier fact and a clamped town would contradict it (J-A81.71). Above the floor the population
   chooses the rung (§1.1) at creation and at each epoch's target (§4.11); the dossier's own tier WORD is a dossier fact
   and the map's title word (§9.5) — a "city" of 5 001 people is drawn on the TOWN rung and still titled a city
   (J-A81.72). A bare tier change with no history entry fires row F8 like any tier receipt (item 13).
16. *Quarters and landmarks — naming claims* (item 82; owner, J80 Q5 and Q6). SettlementForge picks its quarters by a
   name test at generation and never refreshes them, so a quarter enters the map as a NAMING CLAIM, never a zoning
   (J-A82.71): a `neighbourhood` assignment with `claim` set, carrying the quarter's `name`, a kind bias from the
   quarter rows (`tables/dossier/quarters`: Market toward a market identity; Religious toward temple; Noxious Trades
   toward craft with the noxious rows; Waterfront toward docks or riverbank by its phrase; Government toward the seat's
   district; Mages' toward an arcane identity; Artisan toward craft; Shadows toward a low band and a larger hidden
   share; Wealthy and Common Residential toward band biases; Roadside Shrine a shrine claim with a soft edge row; the
   village quarters — Alehouse & Common, Fishing Landing, Woodcutters' Ground — one row apiece), and its location phrase
   as SOFT rows in `criteria`: "Downstream/downwind" → `downstream` and `downwind`; the high-ground phrases →
   `highGround`; "Central" and "Village centre" → `nearCentre`; the water phrases → `nearWater`; "Between market and
   residential" → `nearMarket`; "At the forest edge" → toward the wood land use; "Isolated area (safety concerns)" →
   `far` from the centre; "Old town or slums" → the oldest stage and a low band; "At the settlement edge" → the edge;
   "Spread throughout" → no district; "Eastern district (traditional)" → a soft east row at low weight, a placeholder
   dropped on the owner's word (J80 Q5; J-A82.72). At creation S6's typing reads the claim's bias and rows as soft
   terms (§4.5), so a matching district arises wherever the site allows one; the district whose emergent identity (item
   72, §4.5) best matches the claim carries the name — protected as an assigned name (§10.4) and kept past item 72's
   hysteresis; when no district matches above the claim floor (0.5 of a perfect match; our own value, calibratable) the name waits, reported, and is
   matched again at each epoch — never forced onto a poor match (J-A82.73). An ABSENT quarter is never a fact, and
   SettlementForge's own district names — in its news — are never matched (J80 Q6). A landmark string the roster already
   demands becomes a NAMED-FEATURE claim (granularity `feature`: the way, bridge, quay or pin it names — a notice post
   among the pin kinds, §2.7; `tables/dossier/landmarks`); nothing is created for a string alone.

A whole-neighbourhood assignment sets the district's intent (layer 2) and its class mix — overriding the class-mix
table's weights inside the assigned district (§4.7 S10b, item 71) — while every building stays individually diversified
by the class rules within the drift bounds — drift bounds read against §4.7 S11's designation template (item 19) and
passed to `BuildingGenerator.compose`; a district-defining dossier institution is such an assignment with `existence:
'dossier'`, one district per instance (item 72, §4.5); assignments are events (persist, undo, migrate) and take
precedence over class rules (O10 e). Stable addresses for districts, neighbourhoods, plots and buildings that survive
regeneration and edits are §6.3's.

**Forms catalogue (should-have; the schema is the must-have hook).** A form is a row `{ id, constraints,
growthProgramme, signature }`: constraints (site request, wall rings, plaza position, planned flag, gate count band), a
growth programme (stage regimes and branch tables, §4.4), and a morphometric signature (radial share of arterials,
orthogonality index, street-density profile, block-area CV, enclosed share). Initial rows: `organic`, `bastide-grid`,
`linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`, `hill-acropolis`, `bridge-town`,
`port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3), `confluence`, `twin-town`,
`polycentric` (two or three nuclei, §4.2 S3) and `citadel-and-port` (item 101: a walled upper town on high ground over a
walled lower port — two nuclei of §4.2 S3, the upper on a hill site primitive with its own enceinte, the lower on the
quay front with its own, one arterial joining them); forms compose by growth stage (an organic core with a planned
extension). O10 (g)'s classifier runs on the signature vector.

=== J-ROWS ===
| J-A20.76 | item 20 (h) (i): every fact is a dossier fact — supplied by the dossier, carried under its binding key, immutable on the map and changed only by a dossier event — or a map fact, the map's own construction; the dossier's population is a count whose households are map facts; an author's declarations are map facts held as declared, never above a dossier fact | §7.7 |
| J-A20.77 | item 20 (h) (iii): the coherence rules bind the derivation (generation, re-derivation, dossier events), never a user's edit of a map fact; a map edit that would alter a dossier fact — a dossier name or kind, a dossier-set `knownTo`, concealment, front or state, a count outside its range, the population or a dossier-sourced slice value — is refused F-EDIT `dossier-owned`, the display (label text, visibility, the viewer's key) staying the user's; supersedes the override clauses of J-A30.71 and J-A30.72 | §7.7 with §7.1 and §5.2 |
| J-A20.78 | item 20 (h) (ii): the derivation table is an index of data rows (DR1–DR25) — inputs in read order, the home of the rule, the chance entry (a §6.1 concern or none), the bar — whose missing inputs fall to the next input and the rule's default, never to a request; the same rows standalone, tested from M1 on the dossier fixtures and on blueprints; its totality is a §13.2 test | §13.2, §7.7 |
| J-A20.79 | item 20 (h) (iv): the map never asks — no message, report or field requests a fact from the host; the doors and the port take only optional inputs beyond what the dossier holds today | §7.7, §11.4, §14 |
| J-A74.71 | the `Document.dossier` block — binding rows, carried facts, their hash and the absorbed states — never hashed into the model digest, the binding rebuilt from the log's dossier events and checked at load; supersedes the c-route's in-digest `DossierBinding` recommendation | §7.7 (the document's block: §2.9; the digest: §6.2) |
| J-A74.72 | the key law stated once at §7.7 (the dossier contract) and applied by the port's adapter, the only code that reads SettlementForge's fields | §7.7, §14 |
| J-A74.73 | a collective record's members keyed `#k`; two records of one key told apart by dossier order and reported; class read apart from identity (the new name after a demotion or upgrade); re-binding only on a receipt, a name change without one a removal plus an addition, reported | §7.7 |
| J-A75.71 | the receipt table as one row type with a fate-first dispatch, the design stating the ten corrected rows and F22 (item 87's undo row) and the rest data rows proved complete by the totality test; an undated change applied finished and reported | §7.7 |
| J-A75.72 | owner Q4 at row F20: a settlement ruined and resettled on its site stays one map regrowing on its old plan; a member birth is a new map | §7.7 |
| J-A76.71 | a rejection lapses at an epoch only when its population target moved past §4.11's roster tolerance (the one number J-A76.43 fixes) from the held target — grown or declined, not drifted; refines J-A20.74's condition | §7.7 |
| J-A77.71 | `CircumstanceSlice` (with `CircumstanceTimeline` dated in weeks and `DistrictIntent`) declared once in §7.7, its trade, economy and power slices typed and filled by the same rules with or without a dossier; supersedes the c-route's note that §2 declares the slices | §7.7 |
| J-A77.72 | the trade fill: partners from the dossier's neighbours and link partners, else one per through route; weights from listed links, a hostile partner zero and a rival kept; modes by the water fraction of toll and duty income; a bearing without realm data drawn on `gate.pick` by the partner's key; north first when true bearings arrive | §7.7 |
| J-A78.71 | the sector set stated once as §10.2's rows and the slice keyed by it; income sources mapped to sectors by the port's revenue rows, rents dropping out | §7.7, §10.2 |
| J-A78.72 | a standalone economy slice defaults to an even mix, which amplifies no class | §7.7 |
| J-A80.71 | a dossier-listed ruin stays on the map as its ruin, counted present and kept by every epoch until a dossier event changes it, over removing it | §7.7, §5.3 |
| J-A80.72 | a collective record's state spread over its placed members by the severity band's share, the members drawn on `siting` and recorded in `memberState` | §7.7, §6.1 |
| J-A81.71 | owner Q3: a dossier below 1 500 people is refused by the port naming the village product; §1.1's clamp serves only requests without a dossier | §7.7, §1.1 |
| J-A81.72 | the dossier's tier word titles the map while the rung follows the population | §7.7, §9.5 |
| J-A82.71 | a dossier quarter is a naming claim carried by the best-matching emergent district identity and its phrase a set of soft rows, never a zoning | §7.7 |
| J-A82.72 | owner Q5 and Q6: the "Eastern district (traditional)" east row a low-weight placeholder dropped on the owner's word; SettlementForge's own district names never matched | §7.7 |
| J-A82.73 | a claim no district matches above the claim floor (0.5) waits, reported, and is matched again at each epoch, never forced | §7.7 |
| J-A86.71 | the ignore-list is a rule of the dossier contract's "One way" (§7.7 item 1), §11.4 pointing to it, the adapter reporting every dropped key | §7.7, §11.4 |
| J-A86.72 | owner Q6's other face: a host's own district reads and news names are never inputs, so our districts never follow its classes | §7.7 |
| J-A87.71 | a host's undo is a forward dossier change that converges through the solver's own order, reported `state_matches_absorbed`; no rewind of dossier events | §7.7 |

=== RATIONALE-A ===
| J-A20.76 | (h) Chose to classify every fact the map holds as either a dossier fact — a record or value the dossier supplies, carried under its binding key, immutable on the map and changed only by a dossier event — or a map fact, the map's own construction, with the dossier's population read as a count whose households are map facts and an author's declarations (item 101) as map facts held as declared but never above a dossier fact, over treating the dossier's roster as if it enumerated households or letting a declaration override the dossier, because the owner's words are "only the dossier is the source of immutable truth while the rest can be constructed at whim" and the dossier carries a count, not households; the protection of that count (never taking a household off the manifest) stays as the way the map honours it (§7.7). |
| J-A20.77 | (h) Chose to bind the coherence rules to the derivation — generation, re-derivation and every dossier event — and to refuse, as F-EDIT `dossier-owned`, only the map edits that would alter a dossier fact (a dossier name or kind, a dossier-set `knownTo`, concealment, front or state, a collective count outside its range, the population or a dossier-sourced slice value), keeping the display — a label's text and visibility, and each viewer's knowledge key — the user's, over letting a map override of a dossier-set `knownTo` stand until the next dossier event (the override clauses of J-A30.71 and J-A30.72, superseded) or refusing every edit that makes a map look unlike its dossier, because an overridden dossier value is the map editing the dossier's truth in all but name, while a prosperity stroke or a moved building alters no dossier fact and the owner wants everything else editable (§7.7, §7.1, §5.2). |
| J-A20.78 | (h) Chose to state the derivation table as an index of data rows (DR1–DR25) — each naming its dossier inputs in read order, the section whose rule derives the fact, where seeded chance enters (a registered §6.1 concern or none) and the coherence bar it holds — with a missing input falling to the next input and then the rule's default, the same rows run standalone on the blueprint and tested from M1 on the frozen dossier fixtures, over restating each rule in the table or asking the host for a missing input, because a restated rule would be a second source that drifts, a request would break "it is one directional", and running the same rows with or without a dossier makes connecting SettlementForge later a change of inputs, not of rules (§7.7, §13.2). |
| J-A20.79 | (h) Chose that no message, report or field of the module ever asks the host for a fact, and that the doors and the port accept beyond what the dossier holds today only optional inputs used when present (`HostContext`), over declaring required fields the dossier lacks (a stable id, a location, a class), because the owner ruled that a gap in the dossier is the map's to fill and the flow one directional (§7.7, §11.4, §14). |
| J-A74.71 | Chose to keep the document's `dossier` block — the binding rows, the carried facts, their hash and the absorbed states — outside the model digest, the binding rows rebuilt from the log's dossier events and checked against the stored ones at load, over the c-route's recommendation of an in-digest `DossierBinding` record, because the model already carries each entity's current key in `Identity.dossier` (so the rows would be a second copy of it) and the carried facts include dossier facts the map never draws, such as a notable's role, whose change must not change the map's digest (§7.7, §2.9, §6.2). |
| J-A74.72 | Chose to state the key law once in §7.7, with the dossier contract whose identity rule it is, and to have the port's adapter apply it as the only code that reads SettlementForge's fields, over stating it in §14 beside the port, because the law is a rule of the contract (which entity a dossier record is) while §14 declares the package and its interfaces, and one statement at the contract keeps every reader pointing to the same place (§7.7, §14). |
| J-A74.73 | Chose to key a collective record's members `#k`, to tell two records of one key apart by their order in the dossier and report `duplicate_key`, to read a record's class apart from its identity (from its new name after a demotion or an upgrade, whose kept catalogue key names the old kind) and to re-bind only on a receipt of the key-law table, a name change without one being a removal plus an addition, reported, over fuzzy-matching a renamed record by kind and position, because SettlementForge's own anchor precedence is the stablest key its records have, its catalogue key survives the two renames the line performs while naming the wrong kind afterwards, and a guessed identity is how silent mis-bindings begin (the survey plan's J-P3 and mapping J-M4; §7.7). |
| J-A75.71 | Chose to state in the design the receipt table's row type, its fate-first dispatch, the ten rows the survey's verification corrected (F1–F5, F8, F14, F15, F18, F20) and F22, the row item 87's undo answers, with the remaining change kinds as data rows of the same type proved complete by §13.2's vocabulary totality test and an undated change applied finished and reported `unreceipted_change`, over writing all twenty-two rows into the design, because the corrected rows are where a wrong reading would silently mis-apply a change (a bankrupt shop kept open, a rival's trade zeroed) while the rest are routine field lists best kept and tested as data (§7.7). |
| J-A75.72 | Chose, as the owner ruled (J80 Q4), that a settlement which dies and is resettled on its own site stays ONE map — ruin stages by the decline hooks, then an epoch of regrowth on the old plan by item 8's regrowth-first order — while a member birth is a new dossier and a new map, over opening a new map for a resettlement, because the resettled town stands on the old one's streets and plots and the map's continuity rule keeps them (§7.7). |
| J-A76.71 | Chose to lapse a placement rejection at an epoch only when the epoch's population target differs from the held target by more than §4.11's roster tolerance, the same number that triggers a population epoch (J-A76.43 fixes it for both readers), over lapsing on any difference (J-A20.74's first test), because SettlementForge's population drifts almost every week (town-1: 2 130 → 2 132 → 2 156 → 2 175 over a year, the survey's census), so any-difference would lapse nearly every rejection at every yearly epoch, while the owner's words are "if a settlement grows or declines" (the survey plan's J-P6; §7.7). |
| J-A77.71 | Chose to declare `CircumstanceSlice` once in §7.7 — with `CircumstanceTimeline`, dated in §4.11's weeks, and the per-district input `DistrictIntent` — its trade, economy and power slices typed and filled by the same rules from a dossier or from the blueprint, over the c-route's note that §2 declares the slices or typing each slice where its first reader sits, because the circumstances are an input layer of §7.7 and a type is declared once in its mechanism section, and one fill rule with two input sources is what makes a later connection change inputs rather than readers (§7.7). |
| J-A77.72 | Chose the trade fill — partners from the dossier's named neighbours and the partners its trade links name, else one per through route of the access row; weights from listed links with a hostile partner (or a suppressed economy) at zero and a rival's or cold-war partner's links kept; modes by the water fraction of toll and duty income; a missing bearing drawn on `gate.pick` keyed by the partner's key; and, when true bearings arrive, north turned first and gates moved only for the residual — over fixed compass bearings per partner or zeroing every unfriendly partner, because the dossier names partners but holds no bearing, SettlementForge itself keeps a rival's trade (verified, V31), a partner-keyed draw never moves when unrelated facts change, and turning north moves no geometry at all (§7.7). |
| J-A78.71 | Chose to state the sector set once, as §10.2's `RosterTables.sectors` rows, with the economy slice keyed by it, and to map the dossier's revenue categories to sectors by the port's rows with rents dropping out, over a second sector list in §7.7 or reading revenue categories as sectors, because the dossier's income sources are revenue categories rather than production sectors (verified, V18, V35) and one list keeps the dial and the class table in step (§7.7, §10.2). |
| J-A78.72 | Chose an even mix as the standalone economy slice's default, over a mercantile or agrarian default, because an even mix amplifies no class under item 72's economy dial, so a map without a dossier or an economy setting reads its buildings from the roster alone (§7.7). |
| J-A80.71 | Chose to keep a dossier-listed ruin on the map as its ruin — its use closed, its building `ruined`, counted present, kept by every epoch until a dossier event changes its state — over removing it from the map, because SettlementForge never deletes a record and a map that shows the element gone would contradict the dossier that lists it (item 20 (h) (iii); §7.7, §5.3). |
| J-A80.72 | Chose to spread a collective record's state over its placed members by the severity band's share (all members when no severity is given), the members drawn on `siting` keyed by the assignment with the dossier event's `seq` and recorded in `memberState`, over applying the state to every member or to none, because a collective record stands for several buildings and its severity says how many are touched (the survey plan's J-P12; §7.7, §6.1). |
| J-A81.71 | Chose, as the owner ruled (J80 Q3), to refuse a dossier whose population lies below 1 500 with `E_RUNG_UNAVAILABLE` naming the village product, keeping §1.1's clamp to a 1 500-person town for requests that carry no dossier, over drawing a clamped town, because a dossier's population is a dossier fact and a town drawn at three times the dossier's people would be a false map (§7.7, §1.1). |
| J-A81.72 | Chose to title a dossier-bound map with the dossier's own tier word while the rung follows the population by our bands, over renaming a SettlementForge "city" of 5 001 people a town, because the word is a dossier fact the host's players read while the rung only decides how the map is drawn (§7.7, §9.5). |
| J-A82.71 | Chose to bring a dossier quarter onto the map as a naming claim — its name carried by the district whose emergent identity best matches, its location phrase a set of soft rows — over zoning a district of that kind, because SettlementForge picks its quarters by a name test at generation and never refreshes them, while item 72 makes a district's identity emergent and moving (§7.7). |
| J-A82.72 | Chose, as the owner ruled (J80 Q5, Q6), to read "Eastern district (traditional)" as a placeholder — a soft east row at low weight, dropped on the owner's word — and never to match SettlementForge's own district names, over honouring the east phrase as a rule or naming our districts after the host's news, because the phrase stands on every religious quarter alike and the host's districts come from its own map program, which is not our base (§7.7). |
| J-A82.73 | Chose that a claim no district matches above the claim floor (0.5 of a perfect match) waits, reported, and is matched again at each epoch, over forcing the name onto the best of poor matches, because a name forced onto the wrong district is a visible falsehood while a waiting name is honest and resolves as the town grows (§7.7). |
| J-A86.71 | Chose to state what the port never reads as a rule of the dossier contract's "One way" (§7.7 item 1), §11.4 pointing to it and the adapter reporting every key it drops, over listing it at §11.4 alone, because it is the contract's statement that map facts derive from dossier facts and never from another map's memory, and the report makes a dropped key visible rather than silently lost (§7.7, §11.4). |
| J-A86.72 | Chose, as Q6's other face (J80), never to take a host's own district reads or its news's district names as inputs, over matching our districts to them, because following the host's district classes would make its map program our base, against the owner's standing rule that what we build stays the base (§7.7). |
| J-A87.71 | Chose to treat a host's undo as a forward dossier change that the port diffs like any other and that converges through the solver's own least-disruption order and `formerUses` preference, the residue reported and `state_matches_absorbed` naming the earlier state, over rewinding the log's dossier events to the matching state, because §7.4's rule that a dossier event is never an undo target stays intact and the solver's existing order already returns elements to their former plots (the survey plan's J-P5; §7.7). |
=== END ===
