# Rationale moved out of §5–§7 (determinism part) — verbatim inline passages

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

The consistency rewrite removed every inline "Chose … because …" passage from §5, §6 and §7 of `docs/ARCHITECTURE.md` and left a
"(J-x)" pointer at the rule it justifies. The canon moves the Judgment-call rows (J-DET-1 … J-DET-51, and the new
J-DET-53 and J-DET-54) to `docs/ARCHITECTURE-RATIONALE.md` (scope rewriter). The inline passages below are sometimes longer
than their J row, so they are kept here **verbatim** (text of `docs/ARCHITECTURE.md` as of 2026-09-26, before the
consistency pass) for the scope rewriter or the assembler to fold into `docs/ARCHITECTURE-RATIONALE.md` under the J row
named; nothing in them is normative. Each entry names the section it came from, its inventory id and its J row.

## R01 — §5.1 → J-DET-3 (+ J-DET-25)

Inventory: DETERMINISM-017. Heading of origin: `### 5.1 Principles and the seven tiers (G-P7)`.

> *Chose operation counts over wall-clock watchdogs because a watchdog makes a throttled background tab, a slow laptop or a busy CI runner produce a different town from the same seed; the millisecond budgets of §12 stay as reporting targets and cost tests. Chose laws over the scope's population-derived counts over fixed counts per rung because a fixed count sized for a rung's target fires systematically near the top of its band — coarser output inside one rung and a break in §7.8's monotone population control — and is slack near its bottom.*

## R02 — §5.3 → J-DET-39

Inventory: DETERMINISM-126. Heading of origin: `### 5.3 The invariant suite, by scope (SCL-1)`.

> *Chose to make the NF-P5 exemption a declaration each edit's dry run computes — the enceintes whose strips its chain rebuilds or removes — with a registry test for every operator that can write a strip, over an enumerated list of exempt edit kinds, because a list drifts behind the operators (round 3's omitted the carve and limited the water operator to re-traced runs), and an implementation that encodes it refuses valid canals and river moves as violations (VD3-6).*

## R03 — §6.1 → J-DET-53 (new row, canon)

Inventory: DETERMINISM-169. Heading of origin: `### 6.1 RNG and stream design`.

> *Chose a transparent successor (seed + 1) over deriving the next seed from the generator's stream state because seed + 1 survives any change of draw order and is readable in the link. The references derive their successor from the stream state, which is reproducible within one build (VG's Enter chain replays per build, `coverage-audit-vg.md` VN-007; MFCG's successor is its deterministic stream state) but moves whenever a build changes its draw order; MFCG's Enter also drops explicit parameters and takes size and flags from a non-seeded source — PLAT does neither.*

## R04 — §6.2 → J-DET-49

Inventory: DETERMINISM-198. Heading of origin: `### 6.2 What a seed determines, and the model digest`.

> *Chose a separate records digest over folding the records into the model digest, because the records are what Regenerate (keep settings) and case (4) read, not content the user sees — folding them in would turn a release that only re-encodes a record into a declared output shift — and over leaving them unchecked, because a wrong stored record silently changes what a later faithful regeneration or corpus selection does, in a rebased document for good.*

## R05 — §6.2 → J-DET-45

Inventory: DETERMINISM-207. Heading of origin: `### 6.2 What a seed determines, and the model digest`.

> *Chose to gate the keep, saves and digest reads on the off-path recomputation over holding edits until it ends, because edits waiting is what this fallback exists to avoid, while a keep or a save made on an unchecked copy is what the check exists to prevent.*

## R06 — §6.2 → J-DET-40

Inventory: DETERMINISM-207. Heading of origin: `### 6.2 What a seed determines, and the model digest`.

> *Chose, as the fallback, an off-edit-path recomputation on a checkpoint over storing per-chunk digest nodes in the snapshot and re-hashing a chunk's leaves when an edit first touches it, because the digest tree is organised by layer and containment while chunks are organised by partition — the network layer's node alone spans every chunk that holds a way — so per-chunk nodes would require restructuring the tree by chunk, which §2.9's chunking fallback (block groups) would then change, whereas the checkpoint form changes neither the tree nor the file and still proves the working state before verification can succeed.*

## R07 — §6.3 → J-DET-1

Inventory: DETERMINISM-214. Heading of origin: `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`.

> *Chose lineage-hash tokens over a per-kind high-water counter because a counter depends on the order in which lazily derived districts and parallel workers mint, while a token computed from the lineage is the same whatever order districts are derived in.*

## R08 — §6.3 → J-DET-2

Inventory: DETERMINISM-222. Heading of origin: `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`.

> *Chose to hand only the address to a successor, and to keep the lineage only for survivors, over carrying the lineage in both cases because New random must actually re-roll its scope, while references — a name, a lock, an assignment — must follow the building the user means.*

## R09 — §6.3 → J-DET-37 (+ J-DET-41)

Inventory: DETERMINISM-233. Heading of origin: `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`.

> *Chose to hand the generated name on with the address over re-drawing a successor's name from its fresh lineage, because a name, like a lock, belongs to the thing the user means: re-drawing would rename a re-sited bridge or a re-cut street the user never asked to rename, while New random re-rolls geometry and names are re-rolled on request. Chose to re-draw exactly the unedited names whose recorded naming slices changed, over keeping every carried name through a naming-input edit and over re-drawing every name in the town, because choosing a street-name list or editing a naming rule must change the names that list or rule produced — otherwise the feature does nothing to the town on screen — and must leave every other name alone.*

## R10 — §6.4 → J-DET-50 (+ J-DET-17, J-DET-35)

Inventory: DETERMINISM-271. Heading of origin: `### 6.4 Permalinks, version axes, retention and goldens`.

> *Chose to refuse such links over emitting them with the pack named by id and hash, because a link opened where the pack is missing could only fail or show another town, and the owner's rule is that a shared link never shows a different town; and chose to read the pack set rather than the base recipe, because a link that carries the log (`&l=`) replays every `adjust` in it. Chose to refuse a link for every rebased base, over an exception for a rebase whose state its recipe could regenerate, because a link has no way to name a starting state, and a replay from the seed is exactly what a rebase declares its town cannot be (VD4-8).*

## R11 — §6.5 → J-DET-28

Inventory: DETERMINISM-304. Heading of origin: `### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)`.

> *Chose to require byte identity of the accelerator only over requiring it of both, because the fallback engine computes different integers by construction and would otherwise be unshippable, while the property that matters — one engine, one digest on every host — holds for it through the cross-host test.*

## R12 — §7.1 → J-DET-15

Inventory: DETERMINISM-356 (+ DETERMINISM-357, moved to §11.1). Heading of origin: `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`.

> *Chose a view rotation over rotating model coordinates because wind, sun, aspect and slope all read model north and a vertex rotation would re-snap the whole arena; picture exports (SVG, PNG, VTT) use the view's rotation while GeoJSON keeps model coordinates and records the rotation.*

## R13 — §7.1 → J-DET-14

Inventory: DETERMINISM-361. Heading of origin: `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`.

> *Chose snapping to whole cells over invisible `district_bound` edges because every edge of a district's seam must be typed street, water, wall, reservation boundary (`reserve`), field, cliff or frame (II.1) for stage 2's `SeamContract` (§4.12), and an invisible line through a block would leave a seam with no street to share.*

## R14 — §7.2 → J-DET-6

Inventory: DETERMINISM-387. Heading of origin: `### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes`.

> *Chose one ordered fold over hoisting drawn features before their stage because hoisting makes every reload regenerate a different town around them than the one the user edited.*

## R15 — §7.2 → J-DET-24

Inventory: DETERMINISM-396. Heading of origin: `### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes`.

> *Chose `locked` as the default over letting every terrain stroke move water because the brush is mostly used to shape ground, and moving a river re-routes roads and bridges — a larger edit the user should choose knowingly.*

## R16 — §7.3 → J-DET-29

Inventory: DETERMINISM-404. Heading of origin: `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`.

> *Chose a one-sided re-run attracted onto the other side's vertices over re-deriving both sides of every shared edge a scope touches, because the band on each side is a function of the shared edge alone, so the one-sided re-run reproduces it while keeping the neighbour's plots untouched, and the two-sided form stays available as the fallback.*

## R17 — §7.3 → J-DET-24

Inventory: DETERMINISM-424. Heading of origin: `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`.

> *Chose exact re-basing of every entity whose samples changed over a tolerance, because the step costs microseconds per entity and a tolerance would let the model depart from §2.6's datum rule by that tolerance.*

## R18 — §7.3 → J-DET-23

Inventory: DETERMINISM-452. Heading of origin: `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`.

> *Chose to re-lay every kept way through its sited deck and every crossed wall run through its water gate before the water is inserted, over digging the channel first and repairing the crossings afterwards, because a coarse insertion may meet finer geometry only where the same edit prepared it (§3.3): digging first either fails at every street the river crosses or, clearing them, removes the very crossings the kept arterials need. Chose decks at the sites `siteCrossings` picks, with the kept ways routed to them, over the carve's decks at each way's existing crossing, because a river's crossings are chosen by its narrowest reaches exactly as at generation, so a moved river's bridges stand where a regenerated river's would. Chose to have the L1 batch declare and clear the chain's whole footprint (VK3-1), over clearing only the cells whose L1 edges it changes, because a pond drawn inside a block, a bank widened into its riverside blocks or a meander moved inside one hinterland cell changes no L1 edge there, so the L0 batch would meet their kerbs, plot lines and field bounds away from any prepared vertex and every such edit would fall back to a town-wide re-derivation.*

## R19 — §7.4 → J-DET-34

Inventory: DETERMINISM-498. Heading of origin: `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`.

> *Chose a session per document and author, stored with an unshared document and assigned by the host for a shared one, over a session per app start, because undo must survive a reload, and a fresh session per start would leave the previous start's events undoable only through an owner's explicit `undo(h, of)`.*

## R20 — §7.4 → J-DET-16

Inventory: DETERMINISM-513. Heading of origin: `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`.

> *Chose undo and redo as logged events with per-session stacks and a conservative independence check over removing the last event from the log, because a host-stored log only grows and every client must fold the same events; removal survives only as the unshared-document truncation, which leaves the model digest unchanged.*

## R21 — §7.4 → J-DET-31

Inventory: DETERMINISM-523. Heading of origin: `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`.

> *Chose to carry point records by mean-value coordinates in their host face over leaving them at their world positions or re-placing every one by its rule, because a fountain, a shrine or a tree the user moved stands on the ground the user dragged, and re-placing would move generated furniture that the warp did not need to move; stamps stay world-anchored because they are a fill pattern, not objects.*

## R22 — §7.5 → J-DET-18

Inventory: DETERMINISM-539. Heading of origin: `### 7.5 Migration and upgrade (G-P9)`.

> *Chose the replay under the retained version over storing the pre-upgrade model outside the undo cap, because a METROPOLIS model alone exceeds the 8 MB document budget (§2.9) while the replay reproduces it exactly from inputs the document already holds.*

## R23 — §7.5 → J-DET-44 (first half) + J-DET-54 (second half, new row, canon)

Inventory: DETERMINISM-543. Heading of origin: `### 7.5 Migration and upgrade (G-P9)`.

> *Chose to check a rebased base under `from` and record its root under `to` in the upgrade event, over comparing a root recomputed under `to` with the one recorded under `from`, because a root is a function of the model packages that computed it — a changed field driver or leaf encoding moves it — so only roots made by the same version can be compared, and the upgrade is the one moment both versions' packages are loaded (VD4-1). Chose to copy a pack the new version stops shipping into the document at the upgrade, over keeping every published version's shipped packs in the browser library, because the upgrade is the last moment the browser is sure to hold `from`'s copy, and the document then carries what it needs wherever it is opened (VD4-9).*

## R24 — §7.6 → J-DET-48

Inventory: DETERMINISM-556. Heading of origin: `### 7.6 The override layer and editable tables (G-P12; owner amendment 5)`.

> *Chose field slices for these rows over whole-row slices, because a culture or ancestry row names several corpora — streets, districts, people — and a whole-row slice re-draws every name drawn through the row when one list is replaced, rewriting their naming records and, where a scoped uniqueness pass resolves differently, their text, against §6.3's rule that a list change leaves every other name alone.*

## R25 — §7.7 → J-DET-11

Inventory: DETERMINISM-574. Heading of origin: `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)`.

> *Chose the lock above the assignment because the owner's hook asks for precedence over the generator's own class rules, not over the user's locks; a host that must override a lock sends an unlock first, and the log records it.*

## R26 — §7.8 → J-DET-27

Inventory: DETERMINISM-584. Heading of origin: `### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)`.

> *Chose a smoothstep over the failing interval, then a declared discrete control, over widening ε until the control passes, because a widened ε hides the jump the user sees, while the smoothstep removes a jump that the expansion row itself makes and the discrete declaration tells the user the truth about the rest.*
