from lib import *
t = extract(761, 970)
R = [
("| a building's crypt over epochs (V03's `Basement.crypt`, laid by V02's crypt ladder) | §2.6's basement function at S11; the op that gives a building an always-crypt class (a plan's occupy step, a dossier re-designation, a REPLACEMENT) | V03's rank, rooms and stairs; V09; V10; V04's crypt join | V03's model data (the ring); the rank's trim re-derived inside each causing event | re-derived with its building's basement; the basement never re-drawn while it stands; a trim never shortens `Basement.ring` (V06 §3.18.3 (3)) | the event's record | V03's rule |", "| a building's crypt over epochs (V03's `Basement.crypt`, laid by V02's crypt ladder; its lifecycle row is V03 §3.7.2's) | at an epoch, the op that gives a building an always-crypt class (a plan's occupy step, a dossier re-designation, a REPLACEMENT) | V03 §3.7.2 | V03 §3.7.2 (the rank's trim re-derived inside each causing event) | V03 §3.7.2; a trim never shortens `Basement.ring` (V06 §3.18.3 (3)) | the event's record | V03 §3.7.2 |"),
# §2.7 -> pointer + the rules (item 254 declares the fields at §2.7)
("""```ts
// added to §2.7's Enceinte
pathway?: { since: number /* the week it was superseded or neglected */; cause: 'superseded'|'neglected'|'contracted';
  fate: 'road'|'absorb'|'keep' /* drawn once (V06 §3.7.2); 'keep' while threat ≥ walls.keepThreat */; eligibleWeek: number /* the drawn week from which the final conversion may fire */;
  source: 'engine'|'edit' /* 'edit': a hand setAttr fixed the fate or the week; the engine never redraws it */ }
underuseSince?: number /* the week the ring's intramural occupied-plot share first fell below contract.occupiedShareMax; cleared when it rises above it; written by the fortification phase only (V06 §3.7.4) */
```""",
"""Both fields are declared on §2.7's `Enceinte` (item 254); their rules are these. `pathway.since` is the week the ring was
superseded or neglected, `cause` `superseded` · `neglected` · `contracted`; `fate` (`road` · `absorb` · `keep`) is drawn once
(V06 §3.7.2), `keep` while threat ≥ `walls.keepThreat`; `eligibleWeek` is the drawn week from which the final conversion may
fire; `source` `edit` means a hand `setAttr` fixed the fate or the week, and the engine never redraws it. `underuseSince` is
the week the ring's intramural occupied-plot share first fell below V06 §2.2's `contract.occupiedShareMax`, cleared when it
rises above it, written by the fortification phase only (V06 §3.7.4)."""),
# §2.8
("type EvolveOp =   // joins ConversionOp's union (§4.11); each a lifecycle change with its cause, an undo record, a hand form through `convert` (§7.1)",
 "type EvolveOp =   // item 209: this volume's conversion kinds, in ConversionOp's union (§4.11; §7.1's convert carries them); each a lifecycle change with its cause, an undo record, a hand form through `convert` (§7.1)"),
("dismantled on by V06 §3.7.2 (2), its towers and gates following them — a tower or a gate carries no state of its own and is never a pool candidate (TU-01) */ }",
 "dismantled on by V06 §3.7.2 (2), its towers and gates following them — a tower or a gate carries no state of its own and is never a pool candidate */ }"),
("on a ring with no neglect to lift it is refused (\"this wall is in use\") */ }",
 "on a ring with no neglect to lift it is a no-op with its line (\"this wall is in use\"; nothing changes) — never a refusal (item 101 R2) */ }"),
("the village's fair field over hinterland faces turned `commons` (V07 §3.12 (a), in the `dossier` step's product placement or V07's siting step (m); TV-02) — one op for both, item 209 absorbing items 209, 431 (ST-25); the face and its owner kept */ }",
 "the village's fair field over hinterland faces turned `commons` (V07 §3.12 (a), in the `dossier` step's product placement or V07's siting step (m)), and a withered oasis garden (V06 §3.12.1) — one op for all (item 209, absorbing V07's request); the face and its owner kept */ }"),
("""// added to §2.4's way record
formerClass?: WayClass /* written by downgradeWay and by volume 5's landfall when it drops a covered way to `track` (V05 §3.16 (4); ST-13); cleared by upgradeWay, the landfall clearance (V06 §3.5.2) or any setAttr of class */
```""",
"""```

`Way.formerClass` is §2.4's (item 209): the class `downgradeWay` (or V05's landfall) lowered, which `upgradeWay` restores."""),
# §2.9
("""// added to §2.7's Use
strain?:""", """// on §2.7's Use (item 429; the field's one statement and its rules)
strain?:"""),
# §2.10 report additions
("""  landfall: { membersCleared: number""",
"""  springs: { weakened: number; failed: number; recovered: number; dried: number; gardensWithered: number; groveWithered: number } /* item 111 (b): V06 §3.12.1 */;
  replay?: { r: number; of: number /* this coarse epoch and the replay's count R */; events: number /* the history events mapped to it */;
    unmapped: string[] /* event types with no V11 row, reported and ignored (V06 §3.20.3) */; destroyed: boolean; refounded: boolean; buried: Id[] /* buried systems laid this epoch */ } /* present only on a replay epoch (V06 §3.20) */;
  landfall: { membersCleared: number"""),
("""interface WhyRow { row: string /* the RelationRule, family, coverage, supply-edge, link or signature-pair row (V11's ids), or a V6 table row for a circuit, or V11's raisedWays row for a raised way */;
  family: string /* 'link' for a supply-web link (item 105 (j)); 'reason', 'condition' or 'gate' for a raised way (V06 §3.19 (8)) */; share: number /* its share of the winning score, or the condition's value */;
  good?: string; other?: Id /* a link row: the good and the use at the link's other end */ }""",
"""type WhyRow = NonNullable<LifecycleEvent['detail']>['why'][number]   // §2.8's row (item 265): `row` — the RelationRule, family, coverage,
  // supply-edge, link or signature-pair row (V11's ids), a V06 table row for a circuit, or V11's raisedWays row for a raised way; `family` —
  // 'link' for a supply-web link (item 105 (j)), 'reason', 'condition' or 'gate' for a raised way (V06 §3.19 (8)), 'water' for a failing spring's pull (V06 §3.12.1);
  // `share` — its share of the winning score, or the condition's value; `good`, `other` — a link row's good and the use at its other end"""),
("  |'raisedWay'|'retainingSlump'|'deck'|'landfallCleared';",
 "  |'raisedWay'|'retainingSlump'|'deck'|'landfallCleared'\n  |'springFailed'|'springRecovered'|'springDried' /* item 111 (b) */|'destroyed'|'refounded'|'buried' /* item 113's replay */;"),
("""// item 265: added to §2.8's LifecycleEvent.detail — model data in the identity layer
why?: WhyRow[] /* ≤ uses.moveWhyRows (5): written by the use phase on its `open`, `relocate` and `close` events, by the growth phase on a circuit's creation event (the decision's conditions, V06 §3.7.1), and by the raisedWays step on a raised way's creation event (its reason, V06 §3.19 (8)) */
```""",
"""// LifecycleEvent.detail.why is §2.8's (item 265): ≤ uses.moveWhyRows (5) rows, written by the use phase on its `open`, `relocate` and
// `close` events, by the growth phase on a circuit's creation event (V06 §3.7.1), by the raisedWays step on a raised way's creation
// event (V06 §3.19 (8)) and by the terrainWater step on a spring's failing or recovering `setAttr` (V06 §3.12.1)
```"""),
("`UseMove` rows are read back from them (C6-14).", "`UseMove` rows are read back from them."),
# §2.11
("  epochs: { epoch: number; seq: number; week: number; from: number /* prevWeek */ }[];",
 "  epochs: { epoch: number; seq: number; week: number; from: number /* prevWeek */; replay?: true /* a coarse epoch of the history replay at generation (V06 §3.20): the creation prefix, read-only on the timeline */ }[];"),
# §2.12 rows
("cleared by V06 §3.7.5's renewed threat and by a hand no-stretch `repairWall` (TU-02) |", "cleared by V06 §3.7.5's renewed threat and by a hand no-stretch `repairWall` |"),
("| `Way.surface` — volume 1's field (V01 §2.7; base BCR-6, item 207), this volume one of its epoch writers (SCC-95) |",
 "| `Way.surface` — V01's field (V01 §2.7; item 207), this volume one of its epoch writers |"),
("re-derived at the next epoch (C6-25) |", "re-derived at the next epoch |"),
("""| an enceinte's condition by run (item 575's `Enceinte.condition`, a step knot profile along the trace, knot role `wall_state_knot`: `standing` · `breached` · `dismantled`; TT-04) | `breach` (V06 §3.7.3's neglect and a contracted ring's decay → `breached`), `dismantle` (V06 §3.7.2 (2) → `dismantled`), V05's landfall (→ `breached`, V05 §3.16 (4)) and `repairWall` (→ `standing`, V06 §3.7.5), each placing knots at its `StretchRef`'s ends by `splitThrough` (the whole trace when an op names no stretch) | V06 §3.7.5's repair (the `breached` runs, in chain order, of a pathway ring and of a ring in use), the pathway's clearing and end (§3.7.2 (3)), the no-stretch `repairWall`'s existence test (every run `standing` or not; TU-02), §3.7.2 (2)'s candidates (a stretch under a standing raised gate kept; TU-01), the towers and gates drawn by their run (TU-01), T-V6-6's wall struck share, the renderer's gap glyph and trace discs (§8.2's `decayed` row), §11.1's per-run LineStrings, the `enceinte` provider and the clerk | model data on the `Enceinte` record (knot rows in item 245's canonical form) | kept through a re-derivation, a cut or a join as item 575 states | the op's undo restores the former profile; `repairWall`'s undo restores the `breached` run and the record's former lifecycle | absent = `standing` throughout |""",
"""| an enceinte's condition by run (item 575's `Enceinte.condition`: §2.2 rule 5's stretch-state profile, values `standing` · `breached` · `dismantled`, knot role `wall_state_knot`) | `breach` (V06 §3.7.3's neglect and a contracted ring's decay → `breached`), `dismantle` (V06 §3.7.2 (2) → `dismantled`), V05's landfall (→ `breached`, V05 §3.16 (4)) and `repairWall` (→ `standing`, V06 §3.7.5), each over its `StretchRef` (the whole trace when it names none) | V06 §3.7.5's repair (the `breached` runs, in chain order, of a pathway ring and of a ring in use), the pathway's clearing and end (V06 §3.7.2 (3)), the no-stretch `repairWall`'s existence test (every run `standing` or not), V06 §3.7.2 (2)'s candidates (a stretch under a standing raised gate kept), the towers and gates drawn by their run, T-V6-6's wall struck share, the renderer's gap glyph and trace discs (§8.2's `decayed` row), §11.1's per-run LineStrings, the `enceinte` provider and the clerk | model data on the `Enceinte` record | §2.2 rule 5's carry | §2.2 rule 5's undo; `repairWall`'s undo also restores the record's former lifecycle | absent = `standing` throughout |"""),
("""| an `advance` request's epochs | T1's time card, the clerk, the CLI — appended one `epoch` event at a time in one `group` | the fold | log (the epochs, each with `EpochInputs.advance`; `stoppedAt` on a stopped group's last) | — | one step while the last is the latest live event: the checkpoint taken before the group's first epoch is restored and the group truncated in an unshared document; per-epoch undo records are kept for the group's latest epoch only (V06 §4.1) | the epochs replay like any (§7.5); nothing is re-expanded |""",
"""| an `advance` request's epochs | T1's time card, the clerk, the CLI — appended one `epoch` event at a time in one `group` | the fold | log (the epochs, each with `EpochInputs.advance`; `stoppedAt` on a stopped group's last) | — | one step while the last is the latest live event, by V06 §4.1's rule (in this session, after a reload, and in a shared document) | the epochs replay like any (§7.5); nothing is re-expanded |
| the history replay's coarse epochs (item 113) | §4.11's history-first generation: one `epoch` event per coarse epoch, flag `creation` (V06 §3.20) | the fold; the timeline bar's past range; the replay record | log (the creation prefix, each with `EpochInputs.replay`, V06 §2.14) | a regeneration of the document re-runs generation and its replay from the seed and the history | never an undo target (§7.4's creation rule) | the epochs replay like any (§7.5) |
| `HistoryRecord` (§2.7; item 113) | the replay's end (V06 §3.20.6): once per document | V10's story, the reader, §7.7's history rows, the timeline bar's past range, `chronicle.csv`, the GeoJSON document properties | model data in the digest (§2.7) | re-written by a regeneration's replay | with the creation (never an undo target) | absent: no replay ran |
| a spring's `flow` over epochs (`WaterBody.spring.flow`, §2.3; item 111) | the `terrainWater` step's spring row (V06 §3.12.1); a hand `setAttr` of `flow` (T2 `ground`) | the water pull and the prosperity water term (§4.2 S3 (6), §4.4, §4.5) at every later field evaluation; the spring row; V10's why | model data (§2.3) | kept (the field and the pull re-derive from it) | the writing event's undo | absent `spring`: no spring; S1 writes `flow` 1 |"""),
("the `delete` of a generated raised way, harbour-mouth chain, quay wall, retaining wall (key: its chain's lineage address) or deck plot (key: its deck host's id and its slot ordinal along the deck; ST-15)",
 "the `delete` of a generated raised way, harbour-mouth chain, quay wall, retaining wall (key: its chain's lineage address) or deck plot (key: its deck host's id and its slot ordinal along the deck)"),
("`drawWall { kind: 'retaining' }`, `drawFootprint` on the deck; SR3-08), deleting the re-add", "`drawWall { kind: 'retaining' }`, `drawFootprint` on the deck), deleting the re-add"),
("exports (item 447's `reason` word and `underuseSince`, V06 §5.3; ST-32) |", "exports (item 447's `reason` word and `underuseSince`, V06 §5.3) |"),
("""| a retaining stretch's condition (item 245's `state`, `decayed` · `ruined`; item 291's retaining member) | the pool's `breach` (slump) and `dismantle` (stone taken); V05's landfall (`decayed`); `repairRetaining` (→ `standing`, V06 §3.19.4 (6); TT-06) | the pool, the restoration rule (V06 §3.19.4 (6)), V04's foundations (a footing stands while the wall stands), the renderer's decayed and ruined rows, item 447's retaining `state` | model data on the `RetainingWall` record: its `state`, a step knot profile along the wall's chain (knot role `retaining_state_knot`, values `standing` · `decayed` · `ruined`; item 245 as amended by reconciliation round 2, TR-14), each writer placing knots at its `StretchRef`'s ends by `splitThrough` | kept: a re-derivation of a generated wall keeps its state profile keyed by the wall's lineage (its knots re-placed as item 245 states), until the restoration re-derives it intact (ST-10) | the op's undo; `repairRetaining`'s undo restores the former state | absent = standing |""",
"""| a retaining stretch's condition (item 245's `RetainingWall.state`: §2.2 rule 5's stretch-state profile, values `standing` · `decayed` · `ruined`, knot role `retaining_state_knot`; item 291's retaining member) | the pool's `breach` (slump → `decayed`) and `dismantle` (stone taken → `ruined`); V05's landfall (`decayed`); `repairRetaining` (→ `standing`, V06 §3.19.4 (6)), each over its `StretchRef` | the pool, the restoration rule (V06 §3.19.4 (6)), V04's foundations (a footing stands while the wall stands), the renderer's decayed and ruined rows, item 447's retaining `state` | model data on the `RetainingWall` record | §2.2 rule 5's carry: a re-derivation of a generated wall keeps its profile keyed by the wall's lineage, until the restoration re-derives it intact | §2.2 rule 5's undo; `repairRetaining`'s undo restores the former state | absent = standing |"""),
("| a deck's condition — its host's lifecycle existence (item 246's `Plot.deck.host`: a `Bridge` or a `pier` / `quay` way; ST-56) |",
 "| a deck's condition — its host's lifecycle existence (item 246's `Plot.deck.host`: a `Bridge` or a `pier` / `quay` way) |"),
("(V03's outside-ground row; item 263; T-V3-30; TU-06 (c)) | never |", "(V03's outside-ground row; item 263; T-V3-30) | never |"),
("the decline and hinterland steps (`rows`, ST-26) |", "the decline and hinterland steps (`rows`) |"),
# §2.13
("### 2.13 Item 110's epoch records — the reason key, the ledger and the suppression (C6-37–C6-40)",
 "### 2.13 Item 110's epoch records — the reason key, the ledger and the suppression"),
("type SpanRef = { raised: Id; from: number; to: number }   // the spans between two supports of a raised way, by support ordinal; a view resolved in its batch, never stored in a record (as §2.2's StretchRef)\n",
 "// SpanRef { raised; from; to } is §4.11's: the spans between two supports by support ordinal, a view resolved in its batch\n"),
("declared: Id[] /* raised ways whose lifecycle cause is an edit or a skeleton file (the dossier declares none, V06 §3.19.1 (2); ST-42) */;",
 "declared: Id[] /* raised ways whose lifecycle cause is an edit or a skeleton file (the dossier declares none, V06 §3.19.1 (2)) */;"),
("""// item 260: added to §2.8's LifecycleEvent.detail beside item 265's `why`
suppress?: { kind: 'raised'|'harbourChain'|'quayWall'|'retaining'|'deckPlot'; key: string /* the suppressed generator key's address */;
  reason?: RaisedReasonKey /* kind 'raised' */; enceinte?: Id; water?: Id /* harbourChain: the enceinte and the harbour basin whose mouth it closed; quayWall: the enceinte and the water body of its waterfront arc */;
  chain?: string /* retaining: the deleted wall's chain lineage address */; host?: Id; slot?: number /* deckPlot: the deck host's id (item 246) and the deleted plot's slot ordinal along the deck from its host's first end */ }
// ST-15, ST-59: islands and sky accesses keep volume 5's record form (SkyIsland.removed, .removedAccesses) under the same lift rule — item 260
```""",
"""// LifecycleEvent.detail.suppress and the one lift rule are §2.8's (item 260): `key` the suppressed generator key's address;
// `reason` (kind 'raised'); `enceinte`, `water` (a harbour chain: the basin whose mouth it closed; a quay wall: its waterfront arc's water);
// `chain` (retaining: the wall's chain lineage address); `host`, `slot` (deckPlot: the deck host's id and the plot's slot ordinal from the host's first end).
// Islands and sky accesses keep V05's record form (SkyIsland.removed, .removedAccesses) under the same lift rule — kept apart (E-02, §2.8)
```"""),
]
t = apply(t, R)
t = strip_narr_ids(t)
t = t.replace("(the waterfront rule, the levelling's walls and tier (5)'s deck faces); its counts read the standing raised ways' `reason` and lifecycle cause. It is exported by",
              "(the waterfront rule, the levelling's walls and tier (5)'s deck faces); its counts read the standing raised ways' `reason` and lifecycle cause. It is exported by")
S214 = """
### 2.14 The history replay's plan (item 113)

```ts
interface ReplayPlan {   // derived at generation from HistoryHint (§2.7) by §7.7's DR36–DR38 (V06 §3.20.2); never persisted — HistoryRecord (§2.7) keeps what it played
  start: 'peak'|'founding'; startYearsAgo: number; startPopulation: number; startRung: Rung /* the generation S0–S13a runs at (§4.11 item 2) */;
  peak?: { rung: Rung; population: number; yearsAgo?: number /* absent: undated (V06 §3.20.2 (2)) */; symbolic: boolean; evidence: string[] } /* DR36 */;
  epochYears: number /* V11's history.epochYears, bent upward so the count stays ≤ replay.maxEpochs (V06 §3.20.2 (3)) */;
  epochs: ReplayEpoch[] /* r = 1 … R, oldest first; the last ends at the present (toYearsAgo 0) */ }
interface ReplayEpoch { r: number; fromYearsAgo: number; toYearsAgo: number;
  week: number /* the creation week − round(toYearsAgo × 52): a signed week, before the creation week (V06 §3.20.2 (4)) */;
  populationTarget: number /* V06 §3.20.2 (5) */; effects: ReplayEffect[] /* the span's mapped events, oldest first, ties by event index (V06 §3.20.3) */ }
type ReplayEffect =   // one per mapped history event; `event` indexes HistoryHint.events
  | { kind: 'hazard'; hazard: string /* a HazardRow kind (V06 §2.4) */; week: number; params?: Record<string, number>; event: number }
  | { kind: 'condition'; archetype: string /* a ConditionOverlay archetype: plague, famine, drought … */; fromWeek: number; untilWeek: number; severity: number; event: number }
  | { kind: 'slice'; slice: Partial<CircumstanceSlice>; wealthStep?: number /* signed change of the wealth level, clamped to [0, 1] */; week: number; event: number }
  | { kind: 'request'; cls: string /* a roster class the row asks for (a citadel, hostels) */; count: number; week: number; event: number }
  | { kind: 'population'; factor: number /* × the epoch's target: a dip where populationHistory gives no point in the span */; event: number }
  | { kind: 'destroy'; week: number; cause: string /* the lifecycle's terminal death, a catastrophic event, a "Fall of" event (DR38) */; event?: number }
  | { kind: 'refound'; week: number; rung: Rung; culture?: string /* the history's culture row for the new settlement */; event?: number };
// on §4.11's EpochInputs, a replay epoch's provenance (this volume's field, beside item 343's): replay?: { r: number; of: number; effects: ReplayEffect[] }
```

The plan is a pure function of the history and the tables pinned in the recipe, so a load recomputes it equal; the epochs it
appends carry it in `EpochInputs.replay` (each its own epoch's effects), so a replay of the log never re-plans.
"""
t = t.rstrip('\n') + '\n' + S214
save('05-s2b.md', t)
print(words(t))
