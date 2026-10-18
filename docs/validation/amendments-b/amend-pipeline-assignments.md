# amend-pipeline-assignments — lane amendments-b/amend-pipeline-assignments (PIPELINE part; seat pipeline-assignments)

STATUS: COMPLETE (2026-09-26). Seat: Claude Fable 5.1, architect-editor of the pipeline part (§4, §10, PART II incl. II.6,
PART III) for the rule family **assignments**. Items: HOME 16, 17, 18, 19; REFERENCING none. Output:
`docs/validation/amendments-b/blocks-pipeline-assignments.md` — 11 blocks: REPLACE §4.7, REPLACE §10.1, REPLACE §10.2,
APPEND TO SECTION §4.2, §4.11, §4.12, §10.3 and PART III, J-ROWS (13 rows), RATIONALE-A (13 rows), END. The REPLACE blocks
were generated from the live document (`docs/ARCHITECTURE.md`, sha256 `7a4e19db…`) by `scratchpad/pa/gen.py`: every
untouched passage is sliced verbatim by line range with an asserted anchor, and the §10.1 change is two asserted single
substitutions, so the assembler's diff is exactly the change stated below; the whole block set was applied to copies with
a test applier written to the BLOCK PROTOCOL and checked (§5).

**Read whole:** items 8–31 of `docs/AMENDMENTS-2026-09-25b.md` (the owner's words of 16–19 first; 20, 22, 23, 26–31 for
the seams); `route.md` — how-to, summary and load tables, items 16–19, rule families, cross-cutting duties, the stale-text
table and the CONFIRMED / PLAUSIBLE record; `route.json` objects 16–19; `docs/OWNER-INSTRUCTIONS-2026-09-25.md`;
`docs/ARCHITECTURE.md` — the title block and one-page summary, §0, §1, §2.5–§2.8, §4 whole (§4.1, §4.2, §4.5, §4.6, §4.7,
§4.9, §4.10–§4.12), §5.2, §6.1, §6.3, §7.1, §7.3, §7.4, §7.6–§7.8, §10 whole, §12.4, §13.2, §13.5, §14, §15.2, §16, PART II
whole, PART III, the Delegated decisions, the Judgment-calls index and the Staged list; the first sixty lines of Part A of
`docs/ARCHITECTURE-RATIONALE.md` (its entry format); the canon's home rules R1–R13; `workflows/09-amendments-b.js` (the
block protocol and the assembler's application order); the kernel seat's `blocks-kernel.md` and `amend-kernel.md` (block
and id conventions: `J-A<item>.<part digit><ordinal>`, here `.4n` for the pipeline). Clean room: no reference code,
grammar, palette, word list or content table enters any block; every example row is our own; nothing from `partitioned/`.

**Seat-sharing decisions.** §4.7 (home of 16, 18 and 19) and §10.1–§10.2 (touched by my items alone at REPLACE depth)
are REPLACED; §4.11 (home of 17, but also of items 8, 25 and 31 in three other seats), §4.2 (item 24's home), §4.12, §10.3
and PART III get ADDITIVE blocks only. The assembler applies block files in name order, so this file runs before every
other pipeline seat's: my REPLACE blocks cannot be lost, but an APPEND of mine is overwritten if a later file REPLACEs the
same heading — the §4.11 append holds item 17's home mechanism, so the block file's header and §4 below ask the assembler
to re-apply this file's APPEND blocks after any later REPLACE of §4.2, §4.11, §4.12, §10.3 or PART III.

## 1 Per item — where it landed, the mechanism in plain words, the rulings

### Item 16 — Assignments obey spatial and supply-chain rules (HOME; state was PARTIAL)

**Landed:** §4.7 S10b (the one placement solver — the whole paragraph, its bullets and the `PlacementItem` /
`PlacementRequest` / `PlacementResult` / `PlacementSolver` interfaces); §4.7 S10a (the block score is the same rule score
at block granularity); §4.7 S10 (3) (claims-first covers only claims that exist at generation; later ones go through the
solver and the mutator); §10.2 (`RelationRule`, `SupplyEdge`, `DistrictKindRow`, the class row's `relations`, `produces`
and `supply` columns, `RosterTables.districtKinds` and `resources`, and the paragraph of default rows); §4.2 (APPEND: S2's
need propagation); §10.1 (the base must-haves and the D-32 split); §4.12 (APPEND: the solver as a registry strategy);
PART III (APPEND: reuse).

**Mechanism, in plain words.** Every class of building — and every kind of neighbourhood — carries a small table of
relation rules written as data: what it must or would rather be near or far from (another trade, the water, a gate, the
market, the harbour), which way the wind and the river should run relative to it, what street it wants to face, how big a
plot it needs, and which prosperity band and exposure it belongs in. Each rule is marked HARD (a plot that fails it is
never used) or SOFT (a weight added to a score). Each class also lists what it makes and what it needs — a brewery needs
malt within so many metres by street, a warehouse needs imports by sea — and those needs are scored as distances along the
named mode of travel. One solver reads all of this in every situation that puts a use on a plot: the town's own
generation, the hinterland's farms and mills, an assignment made later by a user or by SettlementForge, a dossier change,
a positive placement and a use that moves across epochs. It keeps the plots that pass every hard rule, ranks them by the
soft score and the supply distances, and — after the city is built — prefers the least disruptive site: an empty plot,
then an under-used one, then one whose present use can move nearby, then a join of two plots. When nothing satisfies
the hard rules it never bends one quietly: it reports which rules blocked the item and offers the closest plots with the
rules each would break. The demand stage already asks for the suppliers a chain needs (a brewery brings a maltings and a
farm into the town's list), so a missing supplier is a siting shortfall, never a missing building. The default rows
reproduce what MFCG and FTG do where they have a rule (noxious trades downstream and outside, mills on water, inns at the
gates, landmarks first); the rows the references lack are soft tendencies whose weights one table cell scales to zero in
the parity presets.

**Rulings:** J-A16.41 (one solver; §7.7's separate solver retired; J-DET-11 and the precedence order unchanged);
J-A16.42 (block-granularity supply distances inside the pool, exact way-graph distances only after the city is built);
J-A16.43 (a hard row is never relaxed silently; F-SITING's rungs restated; post-build infeasibility is an F-EDIT action);
J-A16.44 (D-32 split: supply edges are base placement data, prices and stock stay in the module); J-A16.45 (need
propagation as a prefix-stable `perOther` floor). Decisions touched and how: D-32 (split, ruled), D-10 (unchanged: the
solver and the edges are placement, not simulation), J-DET-11 (kept), J-13 (unchanged: the tables live here as data), O7
(b) and O10 (e) (extended — the bars are cross notes to scope). Item 16 (d), the corpus calibration, is §13.9's hook
(scope); the rows are `§7.6` tables with provenance, as the design already requires.

### Item 17 — Assignments and uses move as the city grows and declines (HOME; state was PARTIAL)

**Landed:** §4.11 (APPEND: "Uses across epochs" — the `Use` record's role, the hand path built now, the staged use
step's five rules, and the `UseConversionOp` kinds that join `ConversionOp`); §10.3 (APPEND: households and postings
follow); §10.2 (`UseRuleRow`: catchment, inertia, closing and starving rows); §10.1 (the `Use` record among the base
must-haves); §4.7 S10b (relocation as a solver request kind); PART III (APPEND).

**Mechanism, in plain words.** A use — the shop, the smithy, the inn — becomes its own thing with its own permanent
address, separate from the building that happens to house it. A building points at its current use or at none (vacant)
and remembers what it used to be. So a shop can close here and open over there while the house stays, empty, re-let or
converted. The base builds the hand-operated version now: open a use, close a use, move a use (one recorded event that
closes here and opens there), and the building the use moves into is mutated to suit it (item 18) — each undoable and
reported to a host. The evolution engine, staged later, runs the same events at every epoch by rule: it re-scores every
use's plot and the best alternative nearby with the same solver and the same rules as generation, but a use only moves
when the alternative is clearly better (an inertia threshold and a chance draw), only closes when its customers have
thinned out or its suppliers have been out of reach for several epochs, and only as many uses move per district and epoch
as the churn cap allows; new demand opens where the score is best, so shops drift toward where people now live and inns
toward the busiest gate — by distribution, never by a fixed order. A host assignment moves with its use unless it is
pinned, in which case it stays and the town adapts around it. The same seed and the same timeline give the same history.

**Rulings:** J-A17.41 (use ≠ building; relocation as a recorded pair with inertia and a churn cap; pinned stays; §7.7's
"epochs keep placed members" superseded — a cross note); J-A17.42 (the hand path built now, the epoch re-score staged).
Decisions touched: D-25 (the vocabulary gains use relocation and mutation — a cross note to scope), J-P22 (kept: a pin is
an explicit edit; `Assignment.pinned` is set by the assignment or by a positive placement), J-DET-11 (kept), D-10 and D-32
(postings stay the module's; §10.3's append re-matches only the two workplaces), §7.1's `swapUse` (kept as two
relocations).

### Item 18 — A plot's buildings MUTATE to match a new designation (HOME; state was ABSENT and contradicted)

**Landed:** §4.7 S11 ("The designation mutator": the seven rules and the `Designation` / `MutationStep` /
`MutationRecord` / `DesignationMutator` types); §4.7 S10b (a placed plot's buildings then mutate); §4.7 S10 (3) and (7)
(a post-build designation goes through the solver and the mutator; a join is asked for the template's size budget); §4.11
(APPEND: the epoch-spread form and the `mutate` conversion kind); §4.12 (APPEND: the mutator as a registry strategy).

**Mechanism, in plain words.** When a plot's purpose changes — a user or SettlementForge assigns it, a use moves in, a
dossier re-designates it — the buildings are never thrown away and rolled again. The mutator lines up what stands there
(each building part by its role: the house, the yard, the stable, the storefront, the storeys, the doors) against what the
new purpose's template wants at this plot's prosperity, and writes down a list of steps: keep what still fits, adapt what
can be adapted (a storey added, a wing extended, a shopfront cut in), convert what can become something else (a stable
into a store), take away what has no place, and add what is missing (a forge and a yard for a smith, stables and a court
for an inn). Additions pack around what was kept, from the plot's own random stream, so the old house stays recognisable
inside the new workshop; nothing outside the plot changes unless the new purpose needs more land, in which case the solver
asks for a join with a neighbour by the same rules. Locked parts are never removed and user edits are kept. The list of
steps is recorded with the event that caused it, so undoing the change — or setting the purpose back while nothing else
has changed — restores the earlier design exactly; a host or user change happens at once, and the evolution engine will
spread the same steps over epochs (occupy, then adapt, then extend, then rebuild only what cannot be adapted).
Generation itself is the same operator run from an empty plot, so there is one code path.

**Rulings:** J-A18.41 (one mutator; generation is the mutation from the empty design; `rebuild` kept for rung-3
replacement; Regenerate and New random stay re-derivations; §7.7's claims-first re-derivation for assignments superseded
— a cross note); J-A18.42 (reversal by the recorded inverse only while the design is unchanged, else a reported forward
mutation); J-A18.43 (draws from the plot's own `siteplan.mutate` stream; added parts minted from the event's `seq`).
Decisions touched: §7.7's "One path" (superseded, cross note), J-DET-10 (kept: edited attributes are kept by rule 4),
§7.1's named actions (kept distinct), §4.11's `rebuild` (kept, narrowed to whole replacement), O10 (e) drift bounds (now
bound the mutator's adapt and add steps), J-P48 (kept: a stored composition's rings are parts the match step handles).

### Item 19 — Every designation scales with prosperity (HOME; state was PARTIAL)

**Landed:** §4.7 S11 (the designation template paragraph: what the rows hold, interpolation, discrete columns, which
band each column reads, "every path reads this one table", the emulation baseline and the materials rule as a pointer);
§10.2 (`DesignationTemplateRow` and the class row's `template` column, replacing the class row's `footprintM2`, `floors`,
`heights`, `coverageByBand` and `siteplan` columns); §4.7 S10 (2), (3) and (7) (the size budget the joins read; the
manifested band); §4.7 S11's arrangement table (unchanged rows, now the rows the template chooses among).

**Mechanism, in plain words.** Every kind of building has one template with a row per prosperity band — how much land
and floor it takes, how many storeys, which structures it has (a main house, a workshop, a yard, stables, a court,
journeymen's rooms), how it sits on the plot, what its street front looks like (a lean-to stall, a shopfront, an arcade),
what its yard and garden hold, and which variant it is in that band: a farrier in a lean-to forge, a general smithy with
a yard, a master armourer with a storefront and a court. Between the rows every continuous value is interpolated along
the plot's prosperity value, so two smiths a few streets apart differ by degree; only the genuinely discrete choices (the
variant, the arrangement, the kind of front) switch at a band cut. Every path that makes or changes a building reads this
one table — generation, an assignment, a use that moves, a mutation — so a smith that moves into a richer street grows
toward the richer row. Materials are deliberately not in the template: a material only changes texture and colour, never
shape, exactly as in FTG. The default rows reproduce the references' banding (FTG's lifestyle-banded pools, MFCG's ward
sizes); the interpolation is our extension.

**Rulings:** J-A19.41 (one template per class folding the site-plan table and the class row's size columns; discrete
columns switch at the cut); J-A19.42 (no material column; shape from the template and prosperity alone); J-A19.43
(geometry columns read the manifested band, the specialisation and programme the field band — item 31's floor honoured).
Decisions touched: D-2 (unchanged: the regional material table is §2.6's, a preset row), COV-FTG-F20 and AM-6 (kept),
J28 (honoured: the FTG material default's single home is §2.6 — the model seat's), the owner's material rule (stated at
S11 as a pointer to §2.6).

## 2 Satisfied already, or not applicable to this part

* **Item 16 (d), corpus calibration** — the hook exists (§13.9, `CalibrationRun`, provenance per cell); scope's rows
  name the templates (cross note); nothing to build in the pipeline.
* **Item 17 (e), determinism** — satisfied by the design's stream rules once the `use.relocate` concern is registered
  (cross note to §6.1); address order and the epoch stream make the history a function of seed and timeline.
* **Item 19 (b), continuous interpolation** — the rule existed at §4.5 and §4.7 (interpolation between band rows along
  the value); this pass makes it the template's rule and names the discrete exceptions.
* **Item 19's materials rule** — its single home is §2.6 (the model seat): S11 points there and carries no material
  column; the stale `MaterialRow` default keyed by band is the model seat's to rewrite.
* **PART II (II.1–II.6)** — no block. II.3's pins and dispatch and II.5's base list read S11's records unchanged; the
  underground layer's plots (item 12 (e), the sewers seat) can call the same solver with an `exposure` or layer row, which
  needs no change here (a one-line note to that seat below).
* **§4.10** — no change: S13a's names may read `formerUses` (stated at §4.11's append), S15 is unchanged.
* **Route referencing duties that belong to other parts** are cross notes (§4), not blocks.

## 3 Rulings recorded (J-ROWS and RATIONALE-A blocks)

| id | the choice (index row) | full entry |
|---|---|---|
| J-A16.41 | one placement solver for every path; §7.7's solver retired | RATIONALE-A |
| J-A16.42 | supply distances at block granularity in the pool; exact distances only post-build | RATIONALE-A |
| J-A16.43 | hard rows never relaxed silently; closest options always reported | RATIONALE-A |
| J-A16.44 | D-32 split: supply edges base, prices and stock module | RATIONALE-A |
| J-A16.45 | S2 need propagation as a prefix-stable `perOther` floor | RATIONALE-A |
| J-A17.41 | use ≠ building; relocation as a recorded pair with inertia; pinned stays | RATIONALE-A |
| J-A17.42 | hand path now, epoch re-score staged | RATIONALE-A |
| J-A18.41 | one mutator; generation = mutation from the empty design; `rebuild` narrowed | RATIONALE-A |
| J-A18.42 | inverse only while the design is the record's result | RATIONALE-A |
| J-A18.43 | `siteplan.mutate` stream; added parts minted from the event | RATIONALE-A |
| J-A19.41 | one designation template per class, band rows interpolated | RATIONALE-A |
| J-A19.42 | no material column | RATIONALE-A |
| J-A19.43 | geometry reads the manifested band, specialisation the field band | RATIONALE-A |

Id convention: `J-A<item>.<part digit><ordinal>` as the kernel seat used (`.3n`); the pipeline's are `.4n`. The reference
resolver's J-id grammar rejects the dotted ids (the kernel seat's flag); the assembler widens it by one character.

## 4 CROSS-PART NOTES (what another part's or seat's editor must add; the verifiers check both sides)

**Same part — pipeline-evolution-islands (item 8's home §4.11).** (a) If your file REPLACEs §4.11, carry this file's
APPEND block for §4.11 verbatim (block header `=== APPEND TO SECTION ### 4.11 … ===`): it is item 17's home mechanism and
item 18 (c)'s epoch-spread form, and your file applies after mine. (b) `ConversionOp` gains the four kinds of my
`UseConversionOp` block (`openUse`, `closeUse`, `relocateUse`, `mutate`); `rebuild` stays as the whole replacement of
rung 3, never a designation change (J-A18.41). (c) The churn cap of the survivors' ladder carries one row per kind — fabric
transformation and use relocation — so item 17's cap is a row of your table, not a second table. (d) The use step runs
after the roster's delta demand and before siting in the epoch order you write. (e) The decline hooks' first state
(vacant) is what `closeUse` leaves; a vacated plot merges into a garden or field by S10 (7)'s operator, which §4.7 now
states with a pointer to §4.11's `plotToGarden` and `amalgamate`.

**Same part — pipeline-emulation-hidden (items 23–27, 30).** (a) §4.2: if you REPLACE it, carry my APPEND ("S2 need
propagation") into S2's paragraph; do not add it again. (b) §4.5: the band set's default cuts are named at §4.7 S10 (2)
and S11 as "§4.5's band set (item 27)" — please keep a named band set there; S7b's affinity rows and S6's typing scorer
may read `RosterTables.districtKinds[].relations` (§10.2) — one pointer line in §4.5 if you touch it. (c) §4.6: §4.7 S10
(2) and (9) point to your hidden-share row and your passage choice; the passage face's model home is §2.5 (item 30 (g)). (d)
§4.9: S12a's outside-class seeding scores are stated at §4.7 S10b as "the outside classes' relation rows (§4.9)" and the
hinterland's food, fuel and timber rows as "the outside classes' `produces` and supply edges (§10.2)" — one pointer line
each in §4.9 (item 26). (e) §4.2 S3 / markets (item 24): S10b's default rows keep "inns and the market hall at tier-1
junctions or gates" and say the market squares themselves are S3's and S7b's; the `nearMarket` and `avoid` row kinds are
there for your secondary-market rule if you want it as data. (f) Item 23: `RelationRule.extension` and
`placement.extensionWeight` (§4.7 S10b) are the mechanism by which the references' rules are the default and ours a
scaled tendency — cite it from §7.6's provenance-marker principle if useful.

**Same part — pipeline-prosperity-change-dossier-plan (items 20, 22, 28, 29, 31).** (a) §4.7 is REPLACED by this file;
item 31's rung-3 orderings are integrated at S10 (7) in the item's own words ("a join takes vacant or same-owner
neighbours first, then a rear plot into its front plot …; a split takes the widest frontage first, then the deepest
yard") with the incremental form, churn cap and floor pointed to §4.11 — do not APPEND them again; point your ladder at
"§4.7 S10 (7)". (b) The manifested band (`max(field band, geometryFloor)`) is read at S10 (2) for every geometry row and at
S11 for the template's geometry columns, the field band for occupancy, condition, labels, specialisation and programme
(J-A19.43) — state the floor rule itself once in §4.11 and `builtBand` / `geometryFloor` on the plot record (§2.5, model). (c)
Item 29: S11's entrance sentence now reads "the building's entrance set by §2.6's rules — the main entrance … side, rear
and yard doors and the basement decision as §2.6 states (item 29) — re-derived whenever the designation mutates"; no
APPEND to §4.7 is needed for 29 unless §2.6's rules need more from S11. (d) Items 20 and 22: the solver's request kinds
`dossier` and `positive`, the `rejected` exclusion, the pinned assignment and the least-disruption order (vacant → under-used
→ movable use, one displacement level → join) are stated at §4.7 S10b; §7.7 should hold the dossier contract (rejection
record, lapse at an epoch, positive placement, re-application) and point to §4.7 S10b for the search order, and §4.11's
epoch clause (22 (e)) to the use step. (e) Item 28: the template's `programme` column and `specialisation` are the
room-programme inputs; the mutator marks the plan rung's cache stale (rule 4) — your §2.6 / §2.9 elaboration cache should
name a designation mutation as an input change. (f) Item 31's replaceability column: add it to `BuildingClassRow` by an
APPEND to §10.2 (this file REPLACEs §10.2 and does not define it), e.g. "`BuildingClassRow` also carries `replaceability`
(item 31)".

**Same part — pipeline-sewers (items 12, 14).** Underground frontage plots and their occupants (item 12 (e)) can be placed
by the same solver with a layer or `exposure` row; nothing in §4.7 assumes the ground arena beyond the distance rasters,
which the underground stage computes on its own arena.

**Model (§2).** (a) §2.7: declare `Use { id: Id /* the address; moves with the use */; cls: string; specialisation?:
string; plot: Id; buildings: Id[]; assignment?: Id; owner?: Id; pinned: boolean; opened: { epoch; seq }; closed?: { epoch;
seq }; lifecycle: Lifecycle }`; §2.6: `Building.use?: Id /* the current Use, §2.7; absent = vacant */` and
`Building.formerUses: Id[]`; `Plot.use: PlotUse` stays the land-use class. (b) §2.5: `BuildingSlot` gains `frontage?:
'none'|'lean_to'|'stall'|'shopfront'|'arcade'` (the template's frontage treatment, persisted with the slot); confirm the
context vector needs no new field — the relation rows read `upwind`, `upstream`, `terrainClass`, `dist.*`, `roadClass`,
`areaM2`, `shape`, `frontageM`, `prosperityBand` and the plot's `exposure` / `knownTo` (item 30); class distances come
from the rasters; `dist.market` is the nearest of N markets (item 24). (c) §2.6: `ClassRules.pick` reads §4.7 S11's
designation template and returns the specialisation as well; the Materials paragraph is the material rule's single home
(FTG's default model, the optional regional shift, "texture and colour only, never footprint, wings, storeys, heights or
roof form") — S11 points there; the stale `MaterialRow` default keyed by band is yours. (d) §2.8: `LifecycleEvent.kind`
gains `'open'|'close'|'relocate'|'mutate'` (or the use lifecycle you prefer) with `detail.from` / `to` for a relocation and a
`mutation?: MutationRecord` reference; the entity registry gains `Use` (lineage unit: the creating event or the epoch's use
step; anchor: the plot address and role) and the mutation record's persistence path (with the event); `DerivationRecord`
of a plot may cite the template and compatibility slices the mutator read (they are `SliceRef`s already). (e) §2.5's
pointer "S11's site-plan tables (§4.7)" stays valid — the designation template holds those columns — retitle to "S11's
designation templates (§4.7)" if you touch the sentence.

**Determinism (§5–§7).** (a) §7.7: remove the `PlacementSolver` interface (its home is §4.7 S10b) and keep
`PlacementCriteria` as per-assignment overrides of the class's relation rows (each criterion one `RelationRule`:
`nearM` → `near`, `minSpacingM` → an `avoid` row on the assignment's own members, `frontageClass` → `frontage`, `avoid` →
`avoid`, `districts` / `districtKinds` / `prosperityBands` → `band`-class filters); `Assignment` gains `pinned: boolean`
(item 17 (d), item 20 (g)) and `use?: Id`; replace "One path … claims-first re-derivation" by: every `assign` event runs
§4.7 S10b's solver for its scope and §4.7 S11's mutator on each placed plot (claims-first stays for claims present at
generation, §4.7 S10 (3)); replace "Epochs keep placed members …" by: members move with their use unless pinned (§4.11's
use step), every change reported; the precedence line and J-DET-11 are unchanged. (b) §7.1: the edit-target rows for
blocks / plots and buildings gain `convert (openUse, closeUse, relocateUse, mutate)`; `EditBase` gains an optional
`mutations?: MutationRecord[]` like `renames` (J-DET-47's pattern) so the record is persisted with the event. (c) §7.3: a
designation change (`setAttr` use or class, `assign` / `unassign`, a relocation, a dossier re-designation) runs §4.7 S11's
mutator on the plot and any joined neighbour — its effective scope is those plots' faces — instead of tree scoping; a
relocation and a join are local operators with fates; the oracle's byte identity outside the scope applies. (d) §7.4: the
`assign / unassign` row's regenerate column becomes "§4.7 S10b places, §4.7 S11 mutates; undo = the inverse mutation from
the undo record (§4.7 S11 rule 5)"; the structural-ops row gains `mutate`, `openUse`, `closeUse`, `relocateUse` with the same
undo. (e) §6.1: register two concerns, `siteplan.mutate` (a geometry concern, non-rerollable, attempt cap 3, read by S11's
mutator) and `use.relocate` (non-rerollable, attempt cap 0, read by §4.11's use step), append-only. (f) §6.3: a use's
address moves with the use (anchor: its plot's address and its role); a building keeps its own; the added parts of a
mutation are user-created entities minted from the causing event's `seq` and ordinal (already the rule — cite it). (g)
§5.2: the F-SITING row's ladder becomes "reconcile inside the district's allocation (JOIN at block granularity → a whole
block → the district edge) → the item's soft rows to weight 0 → reduce the manifest, lowest-priority classes first, never a
dossier-backed item (item 20), reporting each unplaced item's blocking hard rows and closest options" with a † pointer to
§4.7 S10b; the F-EDIT row gains "a post-build placement request that no plot satisfies (the closest options as actions,
§4.7 S10b)".

**Rendering (§8, §9, §11, §12).** (a) §12.4: S10b's row is re-declared for relation and supply scoring — one more
distance transform per producing class present in the town (≈ 10–30 classes at CITY, ≈ 4–10 ms once, PLAUSIBLE) and a
per-candidate score of ≤ r relation rows at O(1) raster reads each; §12.6: a post-build placement of one item ≤ 30 ms
including one multi-source Dijkstra per provider class over the L1 way graph (PLAUSIBLE; M3a measures it). (b) §8.2 / §8.5:
the slot's frontage treatment (stall, shopfront, arcade) is a district-LOD glyph row like the treatment stroke; materials
map to colour and texture roles only (a pointer to §2.6). (c) §11.3: use openings, closings and relocations and mutation
records are reported through `subscribe` / the report events, one line.

**Scope (§13–§17, D-rows, the staged list).** (a) §13.2 / §13.5 tests and bars: hard relation rows satisfied 100 % on
every placed item, every unplaced item reported with its blocking rows and ≥ 1 closest option; soft-row satisfaction
≥ 95 % reported per city (O7 (b) extended: noxious downstream or extramural, water trades on water, market hall at a
tier-1 junction or gate, inns at gates); hard supply edges within `maxDistanceM` on ≥ 90 % of items at generation, the
rest reported; the one-solver contract test — S10b's placement of a class and an `assign` of the same class from the same
state give the same plots; the detour-factor measurement (block-raster distance vs the way-graph Dijkstra within the
factor's band on B-CITY at M1, fallback a per-rung refit); item 17: a hand relocation keeps the use's address, the building
persists vacant with `formerUses`, undo restores; a pinned assignment never moves under an epoch; the churn row holds; the
same seed and timeline replay to one digest; item 18: kept parts byte-identical (leaf digests), nothing outside the plot
and its joined neighbour changes (the oracle), locks never subtracted, A → B → A byte-identical when nothing else changed,
the same change from the same state gives the same record on every host, and S11 = mutation from the empty design
reproduces generation byte-identically; item 19: every roster class has a template with every band row (registry test),
size budget monotone along prosperity (Spearman ≥ 0.9 over B-CITY), continuity between adjacent prosperity samples by
§7.8's rule on the template's continuous columns, a `setAttr` material change leaves the geometry subtree of the digest
unchanged. (b) §13.9: the corpus phase re-signs the relation, supply, template and compatibility tables. (c) §14: S10b
placement moves from `@plat/content` to `@plat/plots` beside the solver (content ← layout ← plots keeps the dependency
rule); `@plat/plots` reads "the one placement solver (§4.7 S10b) and the designation mutator (§4.7 S11)"; the extension
points list already names the `PlacementSolver` — add the `DesignationMutator`. (d) §15.2: O7 (b) and O10 (e) rows point to
the bars above; hooks row 3 ("assignment input + solver §7.7") → "§7.7 + §4.7 S10b". (e) §16 pricing: the O10 line
absorbs the solver with its data and the mutator (≈ +3 pw: 4–6 → 7–9), the O17 + O18 + O19 line the designation
templates and the compatibility table (≈ +1 pw), the `Use` record and hand relocation ≈ 0.5–1 pw on the O9 line;
milestones: templates and the solver at generation in M2b, assignments, mutation and relocation in M3a, the epoch step's
hooks in M4; keep the milestone rows equal to the total. (f) D-25's vocabulary gains use relocation and mutation; D-32
records J-A16.44's split; the staged list's evolution row names item 17's use step. (g) The landing table beside §0.2: rows
16–19 with homes §4.7 S10b, §4.11, §4.7 S11, §4.7 S11 and the clause maps of §1 above.

**Assembler.** (a) Apply order: this file's APPEND blocks for §4.2, §4.11, §4.12, §10.3 and PART III must survive a later
file's REPLACE of the same heading — re-apply them after it (or apply every REPLACE before any APPEND per heading). (b)
The dotted `J-A` ids need the resolver's one-character widening (the kernel seat's flag). (c) The document checks raise
C3 corpus-n-gram hits inside this seat's new prose that are generic five-word phrases (see §5); review them as false
positives per the allow-row rule.

## 5 Verification (executed on copies; the live documents are untouched)

* **Generation:** `scratchpad/pa/gen.py` asserts the live document's sha256 (`7a4e19db…`), every heading line named by a
  block, and the first and last line of every verbatim slice of §4.7 (S9; S10 (0); the granularity table; S10 (4)–(6); S10
  (10) to the capacity check; the arrangement table; the treatments paragraph; the row-footprints-and-first-carry
  paragraph; Scale and Heights; the furniture pins), and two single substitutions in §10.1 (each asserted to occur once);
  the §10.2 code block is replaced whole and its prose kept verbatim.
* **Application on copies** (`scratchpad/pa/apply_test.py`, written to the BLOCK PROTOCOL): 10 blocks applied, 0
  skipped; §4.7 147 → 292 lines, §10.1 21 → 24, §10.2 37 → 78; APPENDs +12 (§4.2), +39 (§4.11), +3 (§4.12), +5 (§10.3),
  +4 (PART III); J-ROWS +13 rows after J-I19 and before "# Staged by the owner's roadmap"; RATIONALE-A +13 rows at the end
  of Part A before "## Part B"; code fences balanced (82); headings 140 → 140 identical; the banner line unchanged; 9 669 →
  9 941 lines; 1 121 342 → 1 153 409 bytes (rationale 279 900 → 289 268).
* **References:** `assemble-r0-refs.py` on the applied copy: 15 broken = the same 2 external entries as the unchanged
  copy (RFC section numbers) + the 13 new dotted `J-A` ids the resolver's grammar rejects; 0 broken `§` references
  introduced.
* **Document checks** (`doc_checks.py --sections "4.2,4.7,4.11,4.12,10.1,10.2,10.3,PART III,Judgment calls"`, three
  runs, each on one corpus load). *Baseline, the unchanged copy:* C1 5 hits / 0 unreviewed, C2 0 / 0, C3 86 / 16, C4 1 / 0,
  S1 0, S2 0 — exit 1 on the untouched document already, from the corpus-growth C3 false positives the lane log records
  (the `captures/dwellings/` findings written this evening). *First run on the applied copy:* C3 96 / 26, C4 2 / 1: the
  C4 hit was this seat's example resource-id list at §10.2 (a five-token list matching a corpus list in any order) — cut
  to four ids; eight generic five-word phrases of the new prose reworded. *Final run on the regenerated copy:* C1 5 / 0,
  C2 0 / 0, C3 92 / 22, C4 1 / 0, S1 0 / 0, S2 0 / 0 — exit 1, the baseline's 16 unreviewed C3 hits plus **6 new ones**,
  every one a five-word n-gram of plain English or of the owner's own words, none a reference's text: "to it and to the
  other", "blocks of the town so", "with the number of the class's", "of the plan rung is" (§4.7, from l. 3395),
  "separate from the buildings that" (§4.11's append — the owner's words of item 17 (a)) and "7 6 1 6 3" (the digits of
  "§4.7, §6.1, §6.3" in the J-A18.43 index row). Rewording generic phrases spawns other generic matches (four of the six
  are rewordings of earlier hits), so these six are left for the assembler's reviewed allow rows (§17.1 (2)'s rule: a
  reviewed row only for a false positive).
* **Seams:** the bold span "(4) **Per-frontage regions / (GEO-24; J-P13):**" that crosses a line break is reproduced as
  in the live text (0 stray `**`); the (6) → (7) → (10) joins and the Heights → Entrances join checked by grep.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read on disk):** the owner's words of items 16–19 and their drafted consequences; the route's
homes, referencing lists, decisions touched and stale-text rows for 16–19; every quotation of the live document above
(sha256 `7a4e19db…`, 9 668 lines, 140 headings); the assembler's application order (name order, blocks in file order) from
`workflows/09-amendments-b.js`; the application results, heading and fence counts, reference-resolver and document-check
numbers of §5.

**PLAUSIBLE (design judgment):** every mechanism, default value and budget above — the detour factor 1.3, the
displacement depth 1, the propagation depth 3, the example rows' distances, the cost estimates (≈ 4–10 ms once for the
provider rasters at CITY; ≤ 30 ms per post-build placement) and the pricing suggestions — until M1 measures them; the
choice of §4.7 S10b and S11 over §7.7 and §7.3 as the homes of the solver and the mutator (the route's own PLAUSIBLE
routing, followed); that the other pipeline seats will REPLACE §4.11 (their in-progress reports do not yet say).

## 7 Addendum (2026-09-27) — item 28 (f), the interior ladder, seen from the assignments family

**Context.** The owner's message of 2026-09-27 (~00:50) is recorded as item 28 (f) and routed (`route.md`, "#### Item 28 (f)",
01:04) to the model part (§2.6), the pipeline referenced through the prosperity-change seat; this seat was re-run after that
update with HOME 16–19 unchanged and REFERENCING none, and the route states "Pipeline §4.7 S11 (landed) — nothing new". The
blocks file is unchanged (10 blocks, as landed). This section is a cross-part note; it changes no block.

**What (f) already finds in this seat's landed blocks** (CONFIRMED by re-reading `blocks-pipeline-assignments.md`):
1. The band split (f) relies on is stated at §4.7 S11: "Geometry columns read the plot's manifested band (S10 (2)); the
   specialisation and the programme read the field band, so a poor smith in a once-rich shell is a poor smith in a big
   house (item 31)" — J-A19.43. The interior sits on the field side by the landed rule; (f) needs only the citation.
2. The re-cut operator is §4.7 S11's designation mutator (rules 1–7: match; order and draws; land; protection; record and
   reversal; timing; one path). Applied to rooms: rule 1's match keeps a room whose ring fits a role of the new programme,
   rule 5's record restores the earlier plan exactly when the households are re-united, rule 6's timing spreads the re-cut
   over epochs. The model seat can cite them rather than restate them.
3. "Several households in one building" is already the path: §10.3's APPEND says a household re-homed by item 31's
   re-letting takes the same path as a live-in household, and S10b places households on residential plots of their band
   ± drift with no one-household-per-building assumption (§1.4's discard). No block text contradicts (f).

**Thoughts for the model seat** (vetoable; not blocks):
* (a) The CAPACITY reading of the owner's last sentence is the one this family supports: the designation template is keyed
  by the band a shell was built for, so "the more rooms for more families the richer a building" is `households.max` read
  at the plot's `builtBand` row — a property of the shell, rising with the built band — while the count actually housed
  follows the occupants' band. The other reading contradicts the message's first clause.
* (b) ONE capacity function, stated once at §2.6 (the route's (c)) and called by every path: min(the template row's
  `households.max` at `builtBand`, the shell capacity = the wings' area × `Heights.floors`, less the circulation share,
  ÷ the smallest unit form's minimum area). S10b's generation-time fill (`households.built`), item 31's `relet` and
  F-PLAN's never-omit rule must all read that one function, or the solver and the plan disagree on how many households a
  shell holds — the assignments family's own principle (one solver, one table). S10b needs at most a pointer
  ("households per building: §2.6's capacity"): a verify → repair one-liner, not a block; not added now, the lane is landed.
* (c) The occupants' band for the ladder is the plot's field band (route ruling 2): S10b places households on plots of
  their band ± drift and the field band is what item 31's rung 1 moves; `Household.wealth` (§2.7) would let one
  building's households disagree with each other about their interior.
* (d) Emulation-first holds: with no epoch and no `relet` every building houses `households.built` and the static baseline
  is unchanged; the ladder's rows are §7.6 tables — defaults, not laws (item 23).

**CONFIRMED:** the quotations of the landed blocks above (re-read 2026-09-27); the route's item 28 (f) section; J48
(`docs/PROGRESS.md` l. 104). **PLAUSIBLE:** the capacity formula and the reading recommendation — design judgment for the
model seat to rule and record as J-A28 rows.
