
### 3.18 Edges — every mechanism at its limits (principle (11))

Every mechanism of V02 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home.

**(a) Degenerate geometry.** Every geometry stage 3 commits — the massing, a mutation's lay, a `setMassing` commit, a
stack's lay — passes M13's snap and validation (V02 §3.5: an edge below `minEdge` merged, every ring simple and
counter-clockwise, every wing at least 4 m² with every side at least `minEdge`) and commits through S11's kernel
transaction, so a zero-length, zero-area, self-touching, collinear or coincident ring is never committed: at generation
it is an M14 attempt and ends at worst at rung 3, the base rectangle the base guarantees (V02 §3.13); in an edit it is
bent to the least lawful size (`bend.wing.grow`, V02 §4.2 step 2). A degenerate slot hint (zero area, or narrower than
every family's least lengths) reaches rung 3 at once, and below it the base's F-SITEPLAN ladder (§2.6). The composer's
products (dormer rows, porches, rooms) that would be degenerate are dropped or shortened by F-COMPOSE's rungs (V02
§3.13); the view's derivations (the roofscape, `stairFlight`, the exports) skip a zero-area facet or a zero-length line
and never fail a tile or an export. Tests: T-V2-9, T-V2-17, T-V2-56.

**(b) Rungs.** Stage 3 runs at every rung; only its inputs differ:

| rung | stage 3 |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | V07's `v.` classes compose by `composition.classFamily` (V02 §3.10.5); a town class plays its `villageForm`'s `v.` class (V02 §3.2); no stepped building unless V11's region and era specialisation applies to the `v.` class under V07's `rules.tiers.capPerSettlement` (X26); deck buildings on a village bridge by V02 §3.16; no raised way (the base's rung gate) |
| TOWN | stage 3 whole; raised ways only as declared (V02 §3.17 (b)); stepped buildings at V11's caps (≤ 0.1 % of buildings, V02 §6.5) |
| CITY, METROPOLIS | stage 3 whole; generated raised ways; V02 §6.1's rung rows |
| the population cap | V02 §6.1's cap row; nothing else changes |
| any rung, the `VG` preset | `sunBias` 0.5 (V02 §3.10.9's preset entries); the rest as the rung's row |

Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55.

**(c) Toggles and presets.**

| toggle or preset | stage 3 |
|---|---|
| `MFCG`, `FTG` | `massing.composed` off: every class's family `baseOutline`, the base outline builder's footprints byte for byte (V02 §3.1; T-V2-26); `sunBias` 0.5 |
| `NG` | the `hatched` family's constructions; the NG parity sheet's roof construction by V01 §7's rule (X14); T-V2-32 |
| `FM` | the `FM` building look and its calibrated cells (V02 §3.10.8); T-V2-31 |
| `massing.composed` off (an edit of the option) | as under `MFCG` and `FTG`: every class's family `baseOutline` (V02 §3.1) |
| `fantasyShapes` off (the default) / on | the three fantasy families never drawn / drawn at their row weights (V02 §3.3; V02 §4.4's control) |
| item 110's rows off (the `item110.stepped` and `item110.deck` overlays) | byte-identical to the composer without them (T-V2-50) |
| `elaborate: 'view'` off | the `wings` rung only on a click (V02 §3.11) |
| the export option `compositions` | V02 §5.5 |

Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55.

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's cells are V02 §2.5's and every event's §7.4's
row (V02 §4.4); the elaboration cache and every derived view (V02 §2.4, the roofscape) are recomputed on load, undo, redo
and regenerate and never stored, so none goes stale in a save; a document without stage-3 fields loads by the fallback
migration row (T-V2-6), one without `MassingRef.stack` by the stack migration row (T-V2-46). Tests: T-V2-6, T-V2-19,
T-V2-20, T-V2-24, T-V2-34, T-V2-48.

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory
data (E5), and degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| the stored composition (V02 §2.2) | a stored composition naming a wing key that left; an edited room whose host left; a secondary porch whose entrance left | listed in §7.3's orphan table with re-attach and discard (V02 §4.4), never dropped silently | leave out and report | T-V2-20 |
| the stored composition (V02 §2.2) | a stored composition whose `composition.json` slices a later table version changed | kept as stored (`edited` is never stale, V02 §3.11); its unedited parts re-derive only when the massing changes | — | T-V2-21 |
| the derived functions (V02 §2.4) | a side whose usable run is not positive; a `polygon` wing's free arc shorter than `bayM ÷ 2`; a wing with no ridge (`flat`, `none`) | no bay on that side or arc; no eave sides and so no dormer; `cryptSeedWings` on a building with none returns an empty list (V02 §3.14.5) | — | T-V2-53 |
| the row a building reads (V02 §3.2) | a class, family or structure with no row; a row breaking the arrangement law; V11's templates without the manor override, the role shares or item 427's columns | the chain's next key, ending at `default.<arrangement>/<band>`; the row skipped and reported at load (`arrangementSkip`); R7's defaults (V02 §8.4) | substitute | T-V2-33 |
| fitting (V02 §3.4) | the slot's `entranceOn` names no access segment; a zero-length access segment; `lir` of a sliver `H` | the plot's longest access segment gives `f`, and with none the massing takes rung 3, reported; a zero-length segment is never the longest; a clamped `w` below the least makes every family infeasible (M3), so rung 2, then rung 3 | substitute | T-V2-17, T-V2-56 |
| the massing (V02 §3.5) | a plot with no slot; a template that draws no structure | no `outline()` call; no building (open ground, V02 §3.10.7) | — | T-V2-56 |
| the massing (V02 §3.5) | one slot, one wing | the drawn family lays one range, or rung 2's `single` | simpler shape | T-V2-17 |
| the massing (V02 §3.5) | a hint below the family's least footprint `Amin`; a band above the plot's capacity | M3's budget test removes the family; M10's reverse-lattice shrink, then `overBudget` reported (T-V2-30) | simpler shape | T-V2-30 |
| the massing (V02 §3.5) | the most the rows draw (wings, blocks, towers, tiers) | every loop runs over a finite list — M7's and M8's candidates tried in drawn order until `k` are accepted or none remain — and at most three attempts of a family (M14), so no lay hangs; a lay the plot cannot hold is the next attempt | retry that piece | T-V2-17, T-V2-22 |
| the composer (V02 §3.6, V02 §3.7) | a building whose every eave has no bay; no main entrance side with room for a porch | no dormer; the porch ladder ends at `none` (F-COMPOSE (2)) | leave out and report | T-V2-12, T-V2-18 |
| the rooms rung (V02 §3.8) | a host shorter than the hall's least length; no host admitting a room | the room shortened once, then omitted, V03 placing that role (F-COMPOSE (3)) | leave out and report | T-V2-35 |
| the mutation (V02 §3.9) | a kept wing outside every target's ± 15 % side rule; a mutation toward the building's own family | the target unreachable, the next reachable family drawn; a mutation to its own family re-lays nothing (every wing kept) | substitute | T-V2-16 |
| elaboration (V02 §3.11) | a click on a building whose `wings` rung failed; a tile holding more buildings than one batch composes | the identity composition, reported (F-COMPOSE (4)); the batches of `viewBatchMs`, the massing's roofscape drawn meanwhile | substitute | T-V2-18, T-V2-22 |
| determinism (V02 §3.12) | two candidates at equal weight or distance; a row cell absent from `composition.json` | ties by the lowest key, then the fixed geometric enumeration order; an absent cell is resolved by V02 §3.2's chain before any draw, so no draw reads a missing range | — | T-V2-13, T-V2-33 |
| the owner's rules (V02 §3.14) | a split site whose works plot is lost; a ladder demotion with one member | the merge-back's two mutations in one event; the demotion keeps the member nearest its demand, the as-built bytes returning | — | T-V2-39, T-V2-40 |
| stepped massing (V02 §3.15) | a hint too small for a second tier; a draw of more tiers than fit | ST8's shrink, then the single fallback, reported (`tiersTruncated`, `shrineDropped`) | simpler shape | T-V2-46 |
| deck buildings (V02 §3.16) | a deck plot narrower than every family's least lengths; a deck whose `deckCm` is unset | F-MASSING to the base rectangle inside the plot; no deck plot at all (V02 §3.16 (1)) | simpler shape | T-V2-47 |
| item 110's rest (V02 §3.17) | a wall of zero height inside `terrace.wallBandCm`; a building meeting a raised way's pier strip | the wall-side sample equals the terrain's (nothing moves); the add path clears the building (V02 §3.17 (b)) | — | T-V2-51, T-V2-53 |
| the ops (V02 §4.1, V02 §4.2) | an op with no optional field; `addRange` whose two points coincide; a canvas drag to a zero-width range | every omitted value the row's central value (V02 §3.12); the zero-length centre line grows along the plot's frontage direction `f` (V02 §3.4) by `bend.wing.grow`'s rule, as a zero width grows to 2 m | repair locally | T-V2-19, T-V2-56 |
| `setComposition` (V02 §4.3) | `dormers` with count 0; `porch` with an `entrance` ordinal naming no current entrance | the eave's row stored with no dormer (`edited`); the op bends to the nearest side, rear or yard entrance (V02 §4.4's re-attach rule), and with none is a no-op, named | repair locally | T-V2-20, T-V2-56 |
| the skeleton file (V02 §4.5) | a `setMassing` line naming a key that no longer exists | orphaned and reported (§7.4's migrate cell) | leave out and report | T-V2-34 |
| editing stacks (V02 §4.6) | `centre` outside the plot; `radiusCm` giving tier 0 below 4 m² or a side below `minEdge` | the least move into the plot region; the ring grown to the least lawful size (`bend.wing.grow`), the stack re-inset | repair locally | T-V2-48 |
| drawing (V02 §5.1–§5.3, §5.6) | a map with no building; a one-wing building; a sheet that omits one of V02 §5.3's cells | nothing drawn by stage 3; that wing's facets alone; the shipped default cell | — | T-V2-9, T-V2-56 |
| exports (V02 §5.5) | a scope with no building; a zero-area facet | no stage-3 entry; the facet skipped in every format | leave out | T-V2-24 |

**(f) Combinations** — where another unit's feature meets a V02 mechanism at its limits:

| combination | outcome | test |
|---|---|---|
| a cliff and a composed building | the massing stays inside `H` (V02 §3.4), which the base's plot model keeps off the cliff face; each wing's datum is `deriveBase` over its own samples (plinth and skirt, §2.6); a wing against a retaining wall at the cliff's foot takes the wall-side sample (item 231) | T-V2-1, T-V2-51 |
| steep ground and a composed building | above `axisSlope` a `fallLine` class lies along the fall line (V02 §3.4); every wing's datum per `deriveBase` | T-V2-41 |
| steep ground and tiers | tier 0's datum per `deriveBase`, the stack re-based by `rebaseStack`; a stair whose run the slope lengthens steepens up to `stairGradeMax`, reported `stairSteep` (V02 §3.15) | T-V2-44, T-V2-45 |
| steep ground and a crypt | the crypt's floor at `max(lowest terrain sample under its ring, water table + crypt.freeboardCm)` (V02 §3.14.5 (d)) | T-V2-36 |
| a river, a coast, a moat or an oasis and a crypt | the water table decides the ladder's form — full, half-sunk or raised (V02 §3.14.5 (d)); the crypt is never refused | T-V2-36 |
| a coast or an oasis and a composed building | a `water`-axis class reads the nearest water face — an oasis's spring pool included (item 111) — within `axisWaterM` (V02 §3.4) | T-V2-41, T-V2-57 |
| a harbour and a composed building | deck plots on moles, piers, jetties and quay platforms by V02 §3.16; a bank quay's plots ground | T-V2-47 |
| a bridge (over a river or a moat) and a composed building | a deck plot's building by V02 §3.16 (deck datum, `maxFloors`, no basement); a ford or a drawbridge carries no deck plot | T-V2-47 |
| a moat, a square or the map frame and a composed building, tiers or a crypt | none crosses the plot, so `H` excludes them, and a basement or crypt lies under its building inside the plot; a porch stays inside the plot, clear of ways (T-V2-12); the base's margin band keeps plots off the frame | T-V2-1, T-V2-12, T-V2-36 |
| a raised way and a composed building, tiers or a crypt | the add path clears every building meeting its piers or strip (V02 §3.17 (b)); a cleared building's basement and crypt leave through V03 and V04's closure, never silently (V02 §3.14.5 (c)); a use a dossier crypt record binds is relocated by the base's relocation (§10.3), its crypt re-derived at its new building by the no-refusal ladder; a building inside an arch vault is clamped by `vaultClamp` (M11) | T-V2-53, T-V2-57 |
| a stage-2 neighbourhood (V01) and a composed building | the neighbourhood click raises the `wings` rung centre-out (V02 §3.11); V01's entrance reserve reads the `PorchKindRow`s (V02 §8.5) | T-V2-21 |
| a terraced ward (V01) and a composed building or a crypt | every building's datum within `plinthCm + 10 cm` of its own terrace's level (T-V2-51); a basement's and a crypt's floors read the levelled ground as their terrain samples | T-V2-51, T-V2-57 |
| a lock and a composed building | a lock on `wings/<key>` holds that wing against every mutation, re-derivation and edit of another wing (V02 §4.1); an op on it is refused with the lock named (item 101 R2) | T-V2-19 |
| a crypt and undo | undo of a `setMassing` or a mutation restores the former basement and crypt with every wing, byte for byte (V02 §4.2 step 5) | T-V2-36 |
| a settlement growing over a sealed void | a wing W6 adds over a sealed void draws its access once on V04's `sewer` key (V02 §3.9 W6); no `setMassing` op draws | T-V2-36 |
| a dossier removing what an edit pinned | the dossier fact wins (item 20): the building goes by its fate, and the `setMassing` and `setComposition` edits on it are orphaned and listed in §7.3's orphan table | T-V2-57 |
| an epoch undone after a save | the epoch's recorded wing steps (`EditBase.mutations`) reverse exactly on the loaded document as before the save | T-V2-15, T-V2-57 |
