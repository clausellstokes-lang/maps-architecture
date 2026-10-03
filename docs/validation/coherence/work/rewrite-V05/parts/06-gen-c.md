
### 3.15 Over time — the island laws an epoch applies (`IslandEpochStep`; §4.11, item 320)

`IslandEpochStep.apply(doc, epoch) → ConversionOp[]` (`@plat/sky`) is called by the evolution engine (V06) at each epoch
after S6's re-evaluation of the field and before S7b's delta allocation, so the households it releases or takes enter
that allocation. `@plat/sky` registers it in §4.12's `StrategyRegistry` as V06's `EpochParticipant` `sky.islands`, step
`afterField`, order 0, stage `SKY` (V06 §2.1, §3.2): its `run(ctx)` calls `apply(ctx.doc, ctx.epoch)` with `years` =
`ctx.years` and `rung` = `ctx.rung`, draws on `island.place` as below (never on `ctx.stream`, so a history with or
without the engine's other participants draws the same island values), and returns the conversions as `EpochOps.ops` in
island slot order. `@plat/sky` registers a second participant, **`sky.clearance`**, at step `afterGrowth`, order 50 —
after V06's `hood.fabric` (order 40), so every raised part, retaining wall, building and massing tier the epoch committed
is read — stage `SKY`, which runs step 7 below (V06 §3.2's participant table).
**Households move through V06's typed channels** (V06 §2.1, §3.8.1): every household the step releases — a wane's
leavers, a settle's remainder, a fall's covered homes when the fall happens in an epoch — enters V06's displaced pool
with cause `island` (placed first at the `siting` step, their addresses kept, each placement a `relocate`); every
household a refloat or a raise takes up from the epoch's delta demand is reserved by `EpochOps.demandTaken: { band:
string; count: number }[]`, which `siting` subtracts from the delta demand before it houses the rest; existing households
relocated up are `relocate` ops in `EpochOps.ops`. So ground plus sky households equal the epoch's target after
`siting` (T-V5-21 (g)). `years` is the epoch's span (§4.11 (5)); every rate below is per year, applied over it. For each
island that is not fallen or removed:

1. **Evaluate.** The rung row of the epoch's rung — the fold's (`ctx.rung`, V06 §3.1 (3); §4.11 *The rung at an epoch*,
   item 322), which inside the hand-off band is the previous product's own rung, not the target's: `none` makes the
   target area 0. Otherwise `S_town` from the re-evaluated field's island-free value (§4.5, item 296: the supply law
   never reads the islands' own shade), the node term from the deposits as they stand at the epoch (V05 §3.3), `S_carried`
   from the island's households' bands under the new cuts (an institution island's requirement band), and the targets
   `A_t` and `E_t` by V05 §3.3. `supply` is rewritten.
   1b. **The institution has left** (J-V5.53; item 20 (h): a dossier removal is truth). If the island's reason is
   `institution` and its institution is gone — removed by a dossier event at an absorb (the institution leaves at once:
   its building vacated, its uses closed, §7.7), its custom kind deactivated (item 104 (e)), or closed with no successor
   for a whole epoch — the island re-reasons now, in order: (i) the next eligible instance of one of the row's `tags` or
   its archetype (V05 §3.4 (2)) relocates up into the vacant claim (a `relocate`; its ground site handed over by V05
   §3.5's rule); else (ii) the island becomes a prosperity island where `h_carried(v(rich))` > 0 and the rich band's
   demand admits it — the claim's building re-let as a mansion (a `relet` to the `rich` band's residential class), rich
   households taken up by the delta (`demandTaken`) and by relocation within the churn cap as a refloat takes them, the
   claim's face keeping its `sky-*` kind until a re-derivation re-types it `sky-island`; else (iii) `A_t` = 0 and the
   island wanes by step 2. `reason` and `institution` are rewritten by the conversion; the report and the clerk name the
   cause. **Against a lock** (the dossier outranks a lock, §7.7; the edge V05 §3.23 names): the dossier's removal of the
   institution acts at once whatever the lock — its building vacated, its uses closed — and a lock on the island (or on
   its `state` path) holds `reason`, `institution`'s claim and the island's state: the island stays an institution island
   with its claim empty, the fate "<island> is held without its <institution>" listed and the clerk naming the lock; the
   re-reasoning of (i)–(iii) waits, and runs at the first epoch after the unlock (T-V5-14).
2. **Floating.** If `A_t = 0`: `waneIsland` (floating → waning), `dwellUntilWeek` = the week + a draw in
   `dwellYears.waning` × 52 on `island.place` (the island's lineage and the epoch component, index `dwell`). Otherwise, if
   |`A_t` − `areaHa`| > `hysteresis` × `areaHa`: `resizeIsland` toward `A_t` by at most `growthPerYear · areaHa · years`
   either way (magic accretes and erodes slowly), and its altitude toward `E_t` by at most `altitudeRateMPerYear · years`
   metres, never below V05 §3.9 (4)'s floor.
3. **Waning.** Each epoch the altitude falls linearly from its value at the wane's start to V05 §3.9 (4)'s floor (with
   `E_min`) by the dwell's end, and the area toward half its value at the start, both by `resizeIsland`; the households
   leave in reverse ordinal order (the suffix, as §4.11's step (c) empties buildings), ⌈H · years ÷ dwell⌉ each epoch, each
   a `relet` down or a `vacate` on the island and the household entering the displaced pool with cause `island`, where
   the regrowth-first siting houses it on the ground; the island's vacant buildings then step down the base's building
   ladder. If `A_t > 0` again: `refloatIsland` (waning → floating), the dwell cleared. When the dwell ends:
   `settleIsland` — the altitude at the floor, every remaining household into the displaced pool, the magical lights at
   0, `dwellUntilWeek` = the week + a draw in `dwellYears.settled`.
4. **Settled.** If `A_t > 0` (and the rung admits islands): `refloatIsland` (settled → floating) — regrowth-first: its
   vacant stock is reoccupied before any ground plot, by the rich bands' delta demand first (reserved by `demandTaken`)
   and then by relocating existing rich households up, within the epoch's churn cap (§4.11) — its altitude climbing at the
   rate. When the dwell ends: `fallIsland` (V05 §3.16).
5. **Empty slots.** A slot holding a live, unfallen island is never redrawn — while it is supplied it stays. An empty
   slot re-opens with probability `(1 − (1 − redrawPerYear)^years) · chance[k] · h_town` (II.6 (4); J-A67.40), drawn on
   `island.place` with the epoch component, only if every lower slot is filled. **A slot a `removed` record holds is not
   empty** (V05 §3.2 (6)): it is never re-opened by an epoch, draws nothing and counts as filled for the slots above it;
   only item 260's lift rule releases it (V05 §3.2 (6)). A slot that opens refloats a settled island first
   (regrowth-first; the settled island with the highest `h_carried` for its households, ties by slot, then address) and
   otherwise `raiseIsland`: S7b's delta fill for the sky (V05 §3.5, taking the rich bands' delta demand first, reserved by
   `demandTaken`, and then relocating existing rich households up within the churn cap), then V05 §3.6–§3.14 on the new
   island, its districts laid by the unit run inside the epoch's commit (V01 §3.10.3 (6) (a)); it has no `shadeBasis`
   until the next epoch's S6 (below; V05 §2.1).
6. **A rung crossing downward** makes every island's target 0: they wane, settle and fall over their dwells, never in one
   epoch (T8-6).
7. **Clearance after growth** (`sky.clearance`; J-V5.68). After the epoch's growth, every live island (not fallen, not
   removed) is re-checked by SKY-F's clearance rule (V05 §3.9 (5)) against the casters the epoch committed under its
   projected solid: the raised parts of V06's raised-way pass and of a new stage's S4 (their deck tops with parapet or
   channel wall, their raised-way piers), the retaining walls' high-side tops and the levelled platforms, and the
   buildings — a stepped one at its stack envelope's top, and a building whose Works starts later in the epoch's weeks at
   its planned finished height, since it is committed now (V06 §3.2's `works` step). It reads V06's `EpochScope.built`,
   `.raised` and `.levelled`. Where one stands above `groundRefCm`, the participant returns one op `{ op: 'reclearIsland';
   island; groundRefCm; altitudeCm; elevationRaisedCm }` (V05 §4.2) that raises `groundRefCm` to it **keeping
   `elevationCm`** and, only where V05 §3.9 (4)'s floor then fails, raises `elevationCm` to the floor
   (`elevationRaisedCm` > 0, a listed fate: "raised clear of the aqueduct" naming the caster). It **never writes
   `shadeBasis`**: the island's strip keeps the basis the epoch's S6 wrote at its start, and the next epoch reads the
   island as it then stands (item 102 (e)'s lag, J-V5.27). A locked island, or a lock on its `altitudeCm` path, holds its
   `elevationCm`: `groundRefCm` and `altitudeCm` are still rewritten, and where the floor then fails the island stays where
   it hangs, the conflict listed (`clearance held by your lock`) and the island exempt from §5.3's clearance invariant as a
   held island is from the supply invariant (T-V5-31 (f)). The step draws nothing, so the same history clears the same
   islands (T-V5-31 (b)).

A locked island, or a locked `state`, `areaHa` or `altitudeCm` path, is held by these steps (§7.2) — the report lists it
as `held against its supply` when its supply is 0 (J-V5.10).

**The shade over time** (item 102 (e)). Each epoch's S6 re-evaluation is a shade evaluation (V05 §3.19 (6)): it writes
every live island's `shadeBasis` from the island as it stands when the epoch begins — before this step changes it — and
re-reads every strip from those bases, so a resize, a sinking, a raise, a fall or an author's edit since the last
evaluation moves the field one epoch later, and the uses beneath follow by the engine's normal lag (V06 schedules the
drift; §4.11's ladder moves the survivors). The basis is persisted, so a save and a load between two epochs change
nothing (T-V5-21 (h)). A fallen island casts nothing from the epoch after its fall; a settled island casts from its floor
altitude, so its strip draws in toward its footprint. An island that step 5 raises (after this epoch's S6) has no
`shadeBasis` until the next epoch's S6 writes one: it casts and receives no strip meanwhile, and a save and a load in
between compute none for it (V05 §2.1, §2.6; J-V5.72); V06's building mask on its lattice likewise starts at the next
field phase (V06 §3.4 (8)).

### 3.16 The fall and the landfall (`fallIsland`)

One `convert` event, as a declared sequence of batches (§4.11), whatever its author (the engine or a hand):

1. **Footprint.** The island's projected land face in world coordinates (`anchor` + the local ring).
2. **Covered set** (J-V5.11). Every ground entity of which at least `landfall.coverShare` of its face or band lies inside
   the footprint, of every kind the table in (4) lists — every L3 plot and every hinterland `LandUse` face; every
   reservation (plaza, market, precinct, park, castle bailey, a ground landing yard); every way (its corridor band); every
   wall stretch (its band), gate (a `Gate` of any kind, by its footprint) and tower; every bridge or pier deck; every
   raised part's span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint); every
   `RetainingWall` stretch (its band), generated or drawn; and every deck plot (its face on a bridge, pier, mole or quay
   deck) — less every locked or pinned entity and the plots that hold one (kept content, as §3.3's fixed obstacles; the
   ruin laps around them).
3. **Relocation first.** Every use in a covered building or reservation is relocated by §4.11's rule for a step that
   empties a building (a dossier-backed use by the solver's `dossier` request; *Dossier content across epochs*), every
   household by §4.7's overflow pass inside the event — in an epoch, into V06's displaced pool with cause `island` (V05
   §3.15) — the households of the deck plots that (4) brings down included, before their deck falls.
4. **The ground — one row per covered kind** (J-V5.11, J-V5.64, J-V5.73, J-V5.76, J-V5.79). No edge of the ground's
   streets and plots is added or removed — the tombstoned deck plots' lines excepted, which go with them — so the plan
   survives under the rubble, ready for regrowth. Each change is a listed fate; every row is undone by the event's undo
   record (§7.4's convert row; (8)).

   | covered kind | outcome | drawn by | lifted by |
   |---|---|---|---|
   | building | demolished (cause `convert:fallIsland`) | — | regrowth on its plot |
   | L3 plot (a deck plot's excepted, below) | its use vacant with the `ruin` treatment | §8.2's `fallen` row over the member (item 408) | V06's landfall clearance (V06 §3.5.2) |
   | reservation | left vacant under the rubble with the same treatment | the `fallen` row | V06 §3.5.2 |
   | hinterland `LandUse` | kind `quarry`, owner `commons`, `source` the landfall decoration (item 253): a surface rubble working that sources no underground quarry system, no mine–cavern breach and no dig-down draw (item 2; V04's quarry rules read only a `quarry` without a `source`) | the quarry row | the quarry face's `retypeLand` (V06 §3.5.2) |
   | wall stretch, gate (any kind: `main`, `postern`, `water`, `gatehouse`, `castle`, §2.7), tower | `breached` written into the enceinte's `condition` (§2.2 rule 5's stretch-state profile, item 575) over the stretch's covered length, extended to take in the chord along the trace of every covered tower's and gate's footprint, so every covered tower's vertex and every covered gate's junction lies inside a `breached` run; a tower or gate covered while its stretch is not has `breached` written over its footprint's chord alone; a run already `dismantled` kept (§4.11's wall ladder only steps down). A `Tower` or a `Gate` carries no state of its own: it draws by its run's `condition` and stands again with it | §8.2's `decayed` row (the gap glyph over each `breached` run) | V06's `repairWall` (V06 §2.8, §3.7.5) |
   | bridge, pier, mole or quay-platform deck | `ruined`: the deck falls; under a bridge the river stays one L0 face and the way's crossing is closed | its host's `ruined` row | V06's `repairRaised` (item 246) |
   | way | surface `rubble`; its routing class drops to `track`, the class it had written to `Way.formerClass` in the `fallIsland` batch — a way that already carries a `formerClass` (a lane V06 downgraded) keeps it, so the clearance gives back the class it had before its decline | its surface row | the first epoch whose clearance (§4.11's salvage demand; V06's landfall candidate) reaches it restores the class from `formerClass` (V06 §3.5.2, which clears it), or a hand `setAttr` of `class` (which clears it too, V06 §2.8) |
   | raised span, raised-way pier | `ruined`; a span whose pier is ruined becomes `ruined` with it (arches fall with their piers, whatever their own cover); a raised way with a ruined span has its crossing closed — it has no junctions with the ways beneath, so the ways' `track` row does not apply to it, and the ways beneath are touched only where the footprint covers them; an aqueduct ruined so loses its terminal's supply, listed as a fate ("the fountain in <square> runs dry"); the vaults beneath a span follow its state by V04's rule (this volume writes nothing underground, item 2) | its state row (§8.2's `raisedWay` program) | `repairRaised`; the aqueduct's supply re-read by V06's raised-way pass at its first `raisedWays` step after the fall — the same epoch for an epoch's fall, the ruined parts standing in that epoch's lifecycle (`EpochScope.raised`, V06 §3.19.2 (4)), the next epoch for a hand `convert` |
   | retaining wall, generated or drawn | `decayed` over its covered length — item 245's state, the `breach` op's result (V06 §3.19.4 (3)); keyed by the wall's lineage address, so a later re-derivation of a generated wall keeps it `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6)), a drawn wall restored by hand; never re-derived intact under the rubble | §8.2's `retaining` state row | `repairRetaining` (V06 §2.8) |
   | deck plot (on a covered bridge, pier, mole or quay deck) | falls with its deck by item 110 (d)'s least disruption: its households relocated first ((3)), its building demolished (cause `convert:fallIsland`), the plot **tombstoned with the deck**, as V06 does for a struck deck (V06 §3.19.5 (3)) — never a vacant plot left on a ruined deck | — | a repaired deck re-offers its faces and the buildings raised on them are new lineages (V06 §3.19.5 (1), (4); V02 §3.16 (7)) |
   | another island's ground landing yard or access foot | the landing yard is a covered reservation (its use relocated by (3)); the access is **re-landed** in the same event — its foot moved to the nearest admissible point outside the footprint by V05 §3.10 (4)'s rule, a new yard claimed there, as a move re-lands it (V05 §4.2) — else, with no admissible point within twice its row's run, dropped by F-SKY-ACCESS's last rung (closed, reported; an island left with no access is reported `unreachable`) | its access marks at the new foot | the event's undo |
5. **The landfall record.** One ground `Decoration` of kind `fallen_island` whose `members` (`DecorationMember[]`, §2.7,
   item 252) are the covered plots, land uses, reservations, ways and retaining walls, each by its `Id`, and the covered
   raised spans and raised-way piers, each by its raised way and item 244's support keys (`{ raised, span: [a, b] }`,
   `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate — `source` the
   island's address and `name` the grammar's fallen form of its name. Each member leaves the list in the batch of the op
   that ends its cover (V06's member-leaving `setAttr`, V06 §3.5.2; J-V6.108; V05 §2.6). §8.2's `fallen` row draws its
   rubble over the members' faces and bands — a raised member's the span's deck band in plan or the support's `ring`;
   the walls with their towers and gates by their runs' `condition`, the bridges, raised parts and retaining walls by
   their own state rows ((4)'s *drawn by*). Parts of the footprint over water leave nothing on the ground and are reported
   ("sank in <water body>"); a footprint wholly over water lays a decoration with no member, its fate the one line.
6. **The salvage ledger** is credited with `stone` = the covered land area × `stoneM3PerM2` m³, `from` the island
   (§2.7's `MaterialLedger`), so later building within the haul radius draws on it and §4.11's salvage demand weighs
   clearance near it.
7. **The sky.** Every entity of the island's arena — its own retaining walls, its bridges' deck plots and its
   `LightSource` records included — and its accesses become tombstones (cause `convert:fallIsland`); each ground landing's
   use closes (`closeUse`), the landing house left vacant to step down the ladder; the island record stays live at its
   address with `state: 'fallen'` and `landfall` set, its slot freed.
8. **Undo** restores all of it from the event's undo record (§7.4's convert row) — each covered way's `class`, surface
   and prior `formerClass` (absent again where the fall wrote the first), each covered enceinte's `condition` profile and
   `lifecycle` and each covered retaining wall's `state` as they stood before the fall (absent again where the fall wrote
   the first), and every re-landed access at its former foot.

### 3.17 Failure ladders — never a whole-map retry

The sky's classes are rows of §5.2's staged table (item 331), which cites this table for their detection and ladders; the
sky invariants are §5.3's (item 331).

| class | where | detection | ladder (in order) | test |
|---|---|---|---|---|
| F-SKY-FILL | S7b (5) | the fill cannot reach `minAreaHa`; an institution's row does not fit | take the next eligible band → try the next reason candidate (V05 §3.4) → close the slot, rows returned to the demand, reported | T-V5-4 |
| F-OUTLINE (base) | S7b (5) | the island's outline is not simple | §5.2's rungs | §13.2's outline property test |
| F-SKY-PLACE | S7b (5) | no candidate passes V05 §3.7 (2) (inside the frame, clear of the other islands, reachable) | halve `gapM` → admit `core` at weight 0.3 → shrink `A` by 20 % and redraw the outline, at most twice → close the slot, rows returned, reported (the reachability test is never relaxed: an island placed by rule always has an admissible access site) | T-V5-5 |
| F-SKY-TERRAIN | SKY | the river's descent stalls or cannot reach the rim | double the tilt → carve a straight bed along the axis to the rim → no river, reported | T-V5-7 |
| F-SKY-ACCESS | SKY, SKY-F, a landfall over another island's landing (V05 §3.16 (4)) | no admitted kind at a top; no land foot (a foot or yard meeting a deck face, a raised-way pier or a raised deck's plan within `deckGapM` counts as none); a slanted access under `lineClearM` over a raised deck or raised-way pier; a landing attach unreached by a walkable part-0 way (on the island, or on the ground after S8); a foot under a landfall | the next direction step of `accessSiting.turnStepCdeg` either way, up to ± `turnMaxCdeg` → the other kinds of the row set → a foot at the nearest admissible land point within twice the row's run → the attach repair lane on its arena (V05 §3.12) → the access dropped, reported (an island keeps at least one where any rung passes; one with none is reported `unreachable` — never an island placed by rule, V05 §3.7 (2)) | T-V5-8, T-V5-14 |
| F-SKY-UNIT | the unit run | households the unit run cannot house — all of them where it returns no district (V01 §3.10.3 (2)) | V01's F-UNIT ladder first; the rest re-placed on the ground by §4.7's overflow pass as a relocation, reported | T-V5-9 |
| F-SKY-CLEAR | SKY-F; each epoch's `sky.clearance` (V05 §3.15 (7)); a ground edit beneath (V05 §4.3) | a caster placed after SKY (a ridge, a tower, a crown; a raised part's deck, parapet, channel wall or raised-way pier; a retaining wall's high-side top; a levelled platform; a stepped building's highest massing tier) stands above `groundRefCm` under the solid | raise `groundRefCm` to it keeping `elevationCm`, and raise `elevationCm` only where V05 §3.9 (4)'s floor then fails (a listed fate) — a locked island or `altitudeCm` path held, the conflict listed, exempt from the invariant; `shadeBasis` untouched, so the strip keeps its basis to the next evaluation, across saves and loads, reported `shade basis behind: clearance` → at P0, V05 §3.9 (5)'s allowance fallback | T-V5-10, T-V5-21 (h), T-V5-31 (f) |
| F-SKY-CRYPT | SKY (the institution claim), every re-claim, SKY-F's re-test at the levelled datum | no claim site of an `always`-crypt instance passes the crypt test (V05 §3.10 (5)) | the best site by score with the half-sunk crypt (V02's basement ladder: full → half → raised), a listed fate → never a missing crypt | T-V5-26 |
| F-SKY-SHADE | field pass 2, an epoch, SKY's last step, Update shade now | a strip's window passes the receiver raster's frame and margin; a sample's shadow is capped (V05 §3.19 (2)) | clip the window to the raster (beyond it there is no field to shade), reported as the clipped share → nothing further: a strip never fails and never stalls the field | T-V5-19 |
| F-SKY-LANDFALL | `fallIsland` | covered content is locked or pinned; a covered use has no alternative site | kept as content the ruin laps around; the use stays in its building, which then stands in the rubble, reported | T-V5-14 |
| F-SKY-HANDOVER | S7b (5) | an institution going up holds an S3 reservation and no hand-over tag is demanded on the ground | the row's `else` (`park`, re-typed with owner `commons`) → never an ownerless reservation | T-V5-4 |

### 3.18 Determinism — every draw on an existing concern (no new concern; J-V5.12)

| concern | key | creation index | what it draws |
|---|---|---|---|
| `island.place` | the town's lineage | `slot:k`, `reason:k` | the slot openings; the reason |
| `island.place` | the island's lineage (with the epoch component at an epoch) | `template`, `bearing`, `outline`, `place`, `relief`, `river`, `underside.kind`, `underside.depth`, `underside.apex`, `access:k`, `dwell` | the shape, its bearing, its displacement, the placement draw, the own relief class, the river draw, the underside, the access kinds, the dwell spans |
| `terrain.noise` | the island's `Terrain` | per §6.1 | its fBm |
| `water.river` | the island's `Terrain` | per §6.1 | the river's meander knots |
| `field.chance` | the island | per §6.1 | its ε |
| `naming` | the island; the landfall decoration | per §6.3 | names |

`island.place`'s creation indices are §6.1's (item 476). **A removed slot draws nothing** (V05 §3.2 (6)): its `slot:k`
and `reason:k` indices are skipped, and every other slot's creation indices are unchanged, so removing an island never
moves another island's draws. `sky.clearance`, `skyAccessObstacles` and the removed-ordinal skip at re-siting draw
nothing either. The strips (V05 §3.19) and the route distance (V05 §3.20) draw nothing: they are pure functions of
committed state (the strips of the persisted `shadeBasis`, never the live island), §4.5's sampler and `dmath` (§6.5),
the strips reading the tiers without their roughness. The island's prosperity gradient (V05 §3.11) draws only its ε on
`field.chance`. **Every choice by score or order breaks its ties the same way** (J-V5.12): among islands by slot, then
address; among sites and lattice cells by lattice y, then x; among districts by address. The tiers' roughness uses
`dmath` noise keyed by the island's render key — view data outside every digest (§6.2) and the same on every engine
(§6.5). The part number is minted once and recorded in the address (V05 §2.1); `raiseIsland` keys the island by the
town's lineage, the slot and the epoch (J-A8.61), so the same history raises the same island. §6.1's distinctness test
runs a sky-island fixture; §13.3's goldens gain the two sky fixtures of T-V5-15.
