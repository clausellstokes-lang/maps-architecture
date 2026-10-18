# V02 — Stage 3: building composition at every scale, from a giant manor to a small hovel

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V2-buildings; covered by the whole-design retrovalidation (J84).

> PENDING FABLE REVIEW — revised by opus standing in for the Fable seat volumes/revise-V2; covered by the whole-design retrovalidation (J84).

> PENDING FABLE REVIEW — reconciliation round 1 written by opus standing in for the Fable seat volumes/reconcile-V02-r1; covered by the whole-design retrovalidation (J84).

> PENDING FABLE REVIEW — reconciliation round 2 written by opus standing in for the Fable seat volumes/reconcile-V02-r2; covered by the whole-design retrovalidation (J84).

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r3; covered by the whole-design retrovalidation (J84).

> **Revision of 2026-09-28** against `docs/volumes/critique/V02.md` (46 findings V2C-01 … V2C-46, with V2C-18 as switched at
> 20:58 for the owner's ~20:05 "switch it then, cathedral also gets crypts but cemetaries get catacombs", J111) and the
> 21:17 hand-off of `docs/volumes/critique/V03.md` (V3C-61: the crypt is `Basement.crypt`, item 238). The disposition
> table is appended to the critique file. Revision ledger (kill-safe, one line per section): 0 done · 1 done · 2 done ·
> 3 done · 4 done · 5 done · 6 done · 7 done · 8 done · 9 done · 10 done · 11 done · 12 done ·
> 13 done · critique disposition table done.

> References: `§n` (and `§n.m`) points to `docs/ARCHITECTURE.md`; `V02 §n` to this volume; `volume k` to the sibling volumes of
> `docs/volumes/`; `item n` to the owner's amendment items; `J-V2.n` to this volume's decisions (V02 §9).

> PROGRESS (lane volumes/V2-buildings; kill-safe ledger, one line per section)
> - 0 In plain words: done
> - 1 Scope, hooks consumed, out of scope (with 1b wiring table): done
> - 2 Data model: done
> - 3 Generation: done
> - 4 Editing: done
> - 5 Rendering, labels, exports: done
> - 6 Performance budgets: done
> - 7 Tests and acceptance bars: done
> - 8 Build plan: done
> - 9 Decisions: done
> - 10 Base change requests: done
> - 11 Owner questions: done
> - 12 CONFIRMED versus PLAUSIBLE: done
> - 13 Fix list: done (filled by the revision of 2026-09-28)
>
> ITEM 110 FOLD (2026-09-28, lane volumes/V2-buildings, resumed after the 23:10 start left the file unchanged; kill-safe
> ledger; the owner's ~23:30 "they go in" and ~23:40 raised-ways revision; V02's critique and revision had landed, so
> the fold adds new subsections marked "item 110 fold" and short in-place clauses marked the same; backup
> `scratchpad/volumes/v2-110/V02-pre-110.md`):
> - fold ledger: §0 done · §1a–§1d done · §2.6 done · in-place §2–§3 clauses done · §3.15–§3.17 done ·
>   §4.6 done · §5 done · §6.5 done · §7.7 done · §8.5 done · §9 done · §10 done · §11 done ·
>   §12 done · §13 done · verification: done (`doc_checks.py` C1 0, C2 0, C4 0, S1 0;
>   C3's new hits generic prose and number runs, S2's new hits V2-local pointers, as before the fold; every J, BCR, T and X
>   id cited is defined; every BCR base quotation found once) · FOLD LANDED

> PENDING FABLE REVIEW — item 110 fold written by opus standing in for the Fable seat volumes/V2-buildings; covered by the whole-design retrovalidation (J84).

> PENDING FABLE REVIEW — second revision written by opus standing in for the Fable seat volumes/revise-V2; covered by the whole-design retrovalidation (J84).

> **Second revision of 2026-09-29** (lane volumes/revise-V2, second round) against `docs/volumes/critique/V02.md` §11, the
> item-110 addendum (27 findings V2C-47 … V2C-73: 1 blocker, 12 majors, 14 minors). Changed text carries "(second
> revision)" or the finding id; the disposition table is appended to the critique file. Backup
> `scratchpad/volumes/revise-v2b/V02-pre-revision-110.md`; receipt `scratchpad/volumes/revise-v2b/stepped_receipt.py` → `.out`.
> SECOND-REVISION LEDGER (kill-safe, one line per section): 0 done · 1 done · 2 done · 3 done · 4 done ·
> 5 done · 6 done · 7 done · 8 done · 9 done · 10 done · 11 done · 12 done · 13 done ·
> critique disposition table done.


> **Reconciliation round 1 (2026-09-29, lane volumes/reconcile-V02-r1)** against the seam registers
> `docs/volumes/critique/seam-stage2-3-r0.md` (-03, -06 – -10, -28, -30 – -33, -35, -38, -40), `seam-time-r0.md`
> and `seam-content-calibration-r0.md` (-20 – -22, -28), with the V02 one-liners that other owners' seam
> issues name (-17, -18, -19, -20, -27, -29, -36). Changed text carries "reconciliation round 1" or the issue id;
> the dated note at the end of the file lists every change. Backup `scratchpad/volumes/rcV2/V02-pre-reconcile.md`.
> RECONCILE LEDGER (kill-safe): RC2.1 §0, §1b, §2 — done · RC2.2 §3 — done · RC2.3 §4 — done · RC2.4 §5, §6 — done
> RC2.5 §7 – §13 and IN-V02-2 — done · RC2.6 the dated note and checks — done
> RC2.7 continuation (2026-09-29 08:33, re-issued task: SCC-R0C-2 – -5 of `seam-content-calibration-r0.md` §6.1) — done

> **Reconciliation round 2 (2026-09-29, lane volumes/reconcile-V02-r2)** against `docs/volumes/critique/seam-stage2-3-r1.md`
> (-10 – -13), `seam-settlements-r1.md` and `seam-content-calibration-r1.md` (-40, -43, -50).
> Changed text carries "reconciliation round 2" or the issue id; the dated note at the end of the file lists every change.
> Backup `scratchpad/volumes/rcV2r2/V02-pre-r2.md`.
> RECONCILE-2 LEDGER (kill-safe): RC3.1 §1b, §2, §3 — done · RC3.2 §7, §8 — done · RC3.3 §9, §10, §13 (S23R1-13 applied in `_integrate.md` by
> reconcile-BASE-F-r2, verified) — done · RC3.4 the dated note and checks — done
> RC3.5 continuation (2026-09-29 09:16, -17, -23 of `seam-stage2-3-r1.md`'s continuation) — §1b, §3, §7, §8, §10 applied; §9, §13, the dated note and checks — done

> **Reconciliation round 3 (2026-09-29, lane volumes/reconcile-V02-r3)** against `docs/volumes/critique/seam-stage2-3-r2.md`
> (-03, -07, -08), `seam-settlements-r2.md` and `seam-content-calibration-r2.md` (SCC-52, -58, -59,
> -71). Changed text carries "reconciliation round 3" or the issue id; the dated note at the end of the file lists every
> change. Backup `scratchpad/volumes/rcV2r3/V02-pre-r3.md`.
> RECONCILE-3 LEDGER (kill-safe): RC4.1 S23R2-01 (item 370, -42, §1b, §3.15.2, §3.17 (a), J-V2.72, T-V2-51) — done ·
> RC4.2 S23R2-03 (item 371, §3.15.3, IN-V02-2, T-V2-44) — done · RC4.3 S23R2-07, -08, SR2-10 = SCC-71 (§3.7, §1b,
> §3.17 (a), X30, §13, §3.10.5, X13, J-V2.56) — done · RC4.4 SCC-52, -58, -59 (item 376, §3.2, §1b, §1c, §2.3,
> §3.10.8, §3.10.10) — done · RC4.5 §9, §12, §13, the dated note and checks — done
> RC4.6 continuation (2026-09-29 10:13, re-issued task: S23R2-11, -12, -14 of `seam-stage2-3-r2.md`'s continuation and
> SCC-R2C-7 of `seam-content-calibration-r2.md` §7.2) — edits done · §9, §12, §13, the dated note and checks done

> PENDING FABLE REVIEW — reconciliation round 4 written by opus standing in for the Fable seat volumes/reconcile-V02-r4; covered by the whole-design retrovalidation (J84).

> **Reconciliation round 4 (2026-09-29, lane volumes/reconcile-V02-r4)** against `docs/volumes/critique/seam-stage2-3-r3.md`
> and `seam-content-calibration-r3.md`. Changed text carries "reconciliation round 4" or the
> issue id; the dated note at the end of the file lists every change. Backup `scratchpad/volumes/rcV2r4/V02-pre-r4.md`.
> RECONCILE-4 LEDGER (kill-safe): RC5.1 S23R3-03 (item 371, §1c, §3.15.3, T-V2-44, J-V2.99) — done · RC5.2 SCC-74 (§3.10.10,
> §1b, X33) — done · RC5.3 SCC-85 (§2.3, §3.2, §3.10.9, §3.10.10, T-V2-37, J-V2.38) — done · RC5.4 §9, §12, §13, the dated
> note and checks — done
> RC5.5 continuation (2026-09-29 11:21, re-issued task: S23R3-14, -17 of `seam-stage2-3-r3.md`'s continuation; SCC-74 and
> SCC-85 re-checked, not redone) — edits done · §9, §12, §13, the dated note and checks done (`doc_checks.py --heads
> docs/ARCHITECTURE.md`: C1 0, C2 0, C4 0, S1 0 before and after; C3 720 → 725, the new runs ordinary phrasing, a
> section-number run and the note's PENDING line; S2 154 → 154, the same hits)

> PENDING FABLE REVIEW — reconciliation round 5 written by opus standing in for the Fable seat volumes/reconcile-V02-r5; covered by the whole-design retrovalidation (J84).

> **Reconciliation round 5 (2026-09-29, lane volumes/reconcile-V02-r5)** against `docs/volumes/critique/seam-stage2-3-r4.md`
>. Changed text carries "reconciliation round 5" or the issue id; the dated note at the end of the file lists every
> change. Backup `scratchpad/volumes/rcV2r5/V02-pre-r5.md` (md5 34f5b1f5…).
> RECONCILE-5 LEDGER (kill-safe): RC6.1 S23R4-02 (a)–(d) (V02 §1b's stack-helpers row, its new approach-strip row and the
> constants row; V02 §8.5's M3a-V2 cell and *Dependencies* sentence; V02 §12's two settled items) — done · RC6.2 §9, §13, the
> dated note — done · RC6.3 checks — done (`doc_checks.py --heads docs/ARCHITECTURE.md`: C1 0, C2 0, C4 0, S1 0 before and
> after; C3 725 → 734, the new runs section-number runs, one ordinary phrase and the PENDING lines; S2 154 → 154)

## 0 In plain words

**What this stage does.** The base (PART I of `docs/ARCHITECTURE.md`) gives every plot a building with a simple outline:
a rectangle, an L or T of rectangles, a row house clipped to its plot, or a church or keep from a small set of templates.
Stage 3 replaces that outline maker with a **composer** that builds each building the way Fantasy Manor builds a manor —
out of wings (long roofed ranges), blocks (square pavilions that stand a little proud of the wings), towers, a
courtyard, a porch, dormer windows in the roof and chimneys — and does it for **every** building on the map, not only
manors. A hovel gets one short, low range with a thatch-like roof and nothing else. A cottage may get a lean-to at the
back. A comfortable town house gets a back range behind its street front, dormers and a door hood. A rich merchant's
house on a wide plot may get a hall with a cross-wing at each end (the classic H-shaped plan), or three ranges around a
forecourt. A great manor on a joined plot may close four ranges round a courtyard, with a gate hall to walk through, a
corner tower or two and a stair turret. An inn becomes a galleried courtyard inn in a rich street and an L-shaped
alehouse in a poor one. Which of these a building gets is decided by its class (hovel, cottage, house, inn, manor …),
by how prosperous its spot is — smoothly, never by a switch — and by the plot it stands on.

**How it fits the plot.** The composer never ignores the plot. It turns the building to face its street, keeps the
whole building inside the part of the plot the site plan gives it (never over the street, never over a neighbour), puts
the main door on the street side (Fantasy Manor leaves about one building in seven without any door — ours never does),
and keeps towers from standing through the middle of a wing. Sizes are in metres: a hovel's range is about 4 m wide, a
manor's 7–9 m.

**What you see, and when.** At city zoom you see the building's plan shape as a dark mass, as today — but the masses
now show courtyards, cross-wings and round towers, so a rich quarter reads differently from a poor one even from far
away. Zoom in to a district and the roofs appear: ridges, hips, the valleys where wings meet, the cones of the towers,
lit by the moving sun. Click a neighbourhood (or set the view to derive detail as you look) and its buildings "open":
dormers, porches and chimneys arrive. Click one building and it is composed down to its rooms — the hall, the tower rooms, the gate
hall — and, with V03, its floor plan, which the plan panel lists; a double-click zooms in until the plan is
readable (V03). Once generated, a building's detail is kept; when
something changes it (a new owner, a new use, a fire, the passing years), it is marked with a small sign and redone the
next time you click it — and whatever did not change stays exactly as it was.

**When a building changes use.** A house that becomes an inn is not torn down and re-rolled: the house's range stays,
and the inn grows side ranges round a yard behind it; turn it back into a house and the added ranges go again, leaving
the original exactly as it was. A manor that falls on hard times keeps its shell, but its great hall is no longer held
fixed: the families move in and divide it, room by room (V03), and if it recovers, the hall comes back exactly as
it was. A brewer's shop that grows into a brewery keeps its shop front and gains a yard behind; a business split into a
workshop and a shop has two ordinary buildings, and merging them back is one undoable step.

**Editing.** Everything is editable with the building tool: drag a wing's ends or its width, add or remove a wing, a
tower or a back range, change a tower's shape, storeys or roof shapes, set a porch (or a hood at a side door), add or
remove dormers, switch the hall, the gate hall or the chapel on or off and move their ends. Asking the clerk "why is this
manor an H?" gets the rule, the wealth level and the other shapes it could have taken. Each change is one undoable
step that touches only that building and its plot, and the map repairs around it. **The tool never says a plain no**
(the owner's toolkit rule): a request it cannot carry out as asked is turned into the nearest thing it can do, and one
short line says what it did — "put the stairs inside" on a solid pyramid seals it instead, "remove the last wing" removes
the building, a tower added beside a stepped temple is built on the ground beside it. Only a fact SettlementForge sent
and a lock you set are ever refused.

**Every kind of building has its rules.** The shapes are written once per kind of building — row house, shop, workshop
yard, tannery, inn, guild hall, parish church, cathedral, covered market, farm, barracks and the rest, about thirty kinds —
each at four levels of wealth, so every one of the roughly two hundred town trades (and every village building, and
every custom building SettlementForge sends) gets a shape that fits its trade and its wealth. A few classes have their
own touches: the manor grows courtyards and towers, the longhouse runs down the slope with its byre at the bottom, the
watermill puts its wheel on the water, the windmill is a round tower with sails, the cathedral has twin west towers with
spires and often a tower over its crossing, a market hall stands on an open arcade, a kiln is round, and landmark halls
may carry a small cupola on the roof. Bigger and richer buildings, and custom landmarks, are laid larger; a building that
would not fit its size budget steps down from a courtyard to a U, an L or a single range rather than overflowing.

**Sun, crypts and digging.** Where a house has a free choice — which end its cross-wing goes, which way its yard opens — it
leans toward the sunny side (the owner's "more prosperous people would love more sun"), without ever turning away from
its street. Buildings' wings are what cast shade on the town at later epochs. The cathedral always has a crypt; on wet
ground where a crypt would flood, its choir is raised over a crypt that stays dry, as real cathedrals did. When a new
wing is built over a hidden cavern or ruin, its builders may break through into it. Catacombs are never made by a
building: they lie under cemeteries (V04).

**Stepped buildings, and buildings on bridges, piers and moles (item 110).** Some buildings are built as
a stack of tiers, each standing on the one below and set back from its edge: a stepped temple (solid tiers of rubble with
a great stair up the front and a small shrine on top), a terraced palace (storeys on each terrace, with flights of steps
running along the faces) and a tiered tower (storeys that shrink as they rise, each with a small skirt roof). Each tier
casts its own shadow, and each can be given more or fewer storeys; the whole stack can gain or lose tiers, change its
shape, its step, its skirt roofs, which tiers are solid, its stair (or have none, a sealed pyramid) or put a shrine on
top, one undoable step at a time. The size of a stepped temple comes from the precinct it stands in, and its first tier
takes the proportions its stairs need, so the stack fits; the great stair up the front is steep, as such stairs were, and
the summit stands a few metres back from the centre because every terrace in front holds a flight. When the ground under
a stack changes, the whole stack moves with it, and a stack under construction rises tier by tier. These shapes appear only where the region and era call for
them (a stepped temple in a culture that builds them), never in an ordinary European market town. The ruins of an older
civilisation underground may keep such a stepped monument too (V04 decays it). Houses and stalls may also stand on a
bridge, a pier, a quay platform or a mole: small and light — one or two storeys, no cellar — lined along the deck's way,
with a tower or a fort at a mole's head where the map places one. If the deck falls, what stands on it falls with it;
rebuild the deck and new buildings may rise there. A chapel whose crypt SettlementForge records is never put on a bridge:
it stands on the bank. A quay built on the bank is ordinary ground, cellars allowed where the ground is dry enough. When a viaduct or an
aqueduct is built over a street, every house standing where its piers or its arches come down gives way to it — the
spaces between the piers stay open.

**Arenas and terraces.** An arena is an oval: an arcaded outer wall of storeys and, inside it, solid
banks of seating stepping down to an open floor, entered through gate halls at the two ends of its long axis. A house
built against a terrace wall stands on its own terrace, never floating up toward the terrace above.

**Speed.** Building the shapes for a 50 000-person metropolis adds about three hundredths of a second to the first map
(about 3 % of its time). The roof detail of a neighbourhood arrives within about a tenth of a second of the click.

**What it does not do.** Materials only change colours and textures, never shapes (owner, 2026-09-26). Fantasy shapes
(octagonal and star-shaped courtyard manors, as Fantasy Manor makes them) exist, but by default they are rare and kept
for the classes where they make sense; a Fantasy Manor look-alike setting turns them up to Fantasy Manor's own mix.
Floor plans are V03's; neighbourhood close-ups V01's; how buildings change over decades V06's.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1a Scope

This volume builds **stage 3** to build depth: the `BuildingGenerator` registration that replaces the base's
`OutlineBuildingGenerator` (§2.6 "The stage-3 hook and its cost contract"). It settles:

1. **The massing** — stage 3's `outline()`: an eager, per-building step at S11 that composes the building's plan from
   a path of wings (ranges), blocks, towers, a back range and a court, fitted to the slot the site plan gives it,
   oriented by its frontage, in metres (V02 §3.2–§3.5 below). Its output is the base wings (`Building.wings`), so the
   footprint, the heights, the shadows, the 3-D export and the capacity all read it (model data, in the digest).
2. **The composition** — stage 3's `compose()`: the lazy `wings` and `rooms` rungs — dormer rows, the porch, the
   composed towers, the courts and the composer's principal rooms (hall, gate hall, tower rooms, chapel) — whose
   draws are keyed per wing so what is kept stays (V02 §3.6–§3.8).
3. **The roofscape** — one derived roof plan per building, resolving every joint between wings (mitre, valley, wall,
   gable, hip) and every tower, read by the drawing, the light pass and the 3-D exports (V02 §5.2).
4. **The diversity ladder** — per class and per prosperity band, as data tables (`composition.json`), from a hovel to a
   giant manor, interpolated along the prosperity value (item 19) (V02 §3.3, V02 §3.10).
5. **Mutation** — item 18 applied to wings: keep what fits, add, remove, by path growth from the kept ranges (V02 §3.9).
6. **Elaboration by click, editing, rendering, exports, budgets at METROPOLIS scale, tests, parity with Fantasy Manor,
   and the build plan.**
7. **The owner's rules of 2026-09-28 at the building** (file g; V02 §3.14): the building side of sunlight (item 102: the
   wings as epoch casters, the sunlit choice), custom institutions (item 104), split works-and-shop sites (item 105 (h)),
   the institution ladders (item 108), and digging down, crypts and the catacomb boundary (item 109 (j), (k) as revised,
   J111) — each only in its building part; g's base mechanisms are the coherence pass's.
8. **Item 110 at the building (V02 §3.15–§3.17):** (c) **stepped massing** — the `stepped` family of
   stacked tiers laid by one pure construction (`layTiers`), which ships with the base outline builder at M3a (item 110 (e)'s
   second fixture needs a stepped temple there) and which V04 also calls for a ruin's stepped monument; solid and
   storeyed tiers, stairs up the faces, a flat top, a shrine or a roofed top; one shadow per tier; the `tiers` edit; and
   (d) **buildings on moles, jetties, quay platforms and bridge decks** — the `@deck` rows, the deck budget, the deck's
   datum, no basement; plus the building side of (a) retaining walls, (b) raised ways (generated at CITY and METROPOLIS
   since the owner's ~23:40 revision, declared at TOWN, added or removed by the user) and (e) the second known-city fixture.
   **The second revision** (critique V2C-47 – V2C-73) splits the construction into a pure `layTiers` and an exported
   `massStepped` that the base outline builder and stage 3 share byte for byte, turns every structural refusal into a named
   bend (a sealed stair form `none`, ground wings beside a stack), adds one building-level datum pass (`rebaseStack`) on
   every re-basing path, a stack order under Works, pent band facets, a solid stack's entrance rule, the claim-sized band,
   and the non-fantasy `ovalCourt` family for the fixture's arena.


### 1b The wiring table — every new piece, what feeds it and what it feeds

| new piece | kind | fed by (producer, and the dossier or derivation row where a fact comes from one) | feeds (consumer) | base hook it plugs into |
|---|---|---|---|---|
| `ComposedBuildingGenerator.outline()` (the massing) | stage function | `BuildingInput` from S11 (slot hint, access, ctx, class, drift); `CompositionRow` at the manifested band (§2.5 `Plot.builtBand` → §4.11's floor rule); `ClimateTable` pitch; `massing` stream | `Building.wings`, `Building.massing`, S11's footprint insertion and first carry, `deriveEntrances` (entrance hint), `deriveBase`, the basement decision, the capacity function, the yard partition (court typing), shadows (§8.4 casters), 3-D exports | §2.6 `BuildingGenerator.outline`; §4.7 S11 |
| `BaseWing.role`, `BaseWing.key`, `Building.nextWingKey` | persisted fields | the massing; `setMassing`; the designation mutator's wing step | the composer (per-wing keyed draws), the mutator (match by role), the anchors (§6.3), the roofscape (joint priority), exports (role names), edits (`setAttr` paths by key), V01's `hatched` stack ties by wing key (V01 §5.1.3) | §2.6 `BaseWing` (item 216) |
| `Building.massing` (`MassingRef`) | persisted field | the massing; `setMassing` `family`; the mutator | the mutator (source family), `deriveEntrances` (entrance wing and side), the JSON export, the report, the clerk's reader | §2.6 `Building` (item 217) |
| `DriftBounds` (typed) | type | an assignment (§7.7) | the massing's family filter and size clamp; the mutator's adapt bounds | §2.6 `BuildingInput.drift`, §7.7 `Assignment.drift` (item 385) |
| `composition.json` rows (`CompositionRow`, `MassingFamilyRow`, `WingRoleRow`, `MassingGrowthRow`, `TowerShapeRow`, `PorchKindRow`, `DormerKindRow`) | tables | `@plat/tables`, the override layer, the `FM` preset, the corpus phase (§13.9) | the massing, the composer, the mutator, the roofscape, `facadeBays`, §8.10's decorative chimneys; V01's entrance reserve (`PorchKindRow`'s `widthM`, `depthM` and `outside`, shipped from M3a-V2; V01 §3.8.2 step 5 and V01 §3.8.3's digest) | §7.6; §10.2 `DesignationTemplateRow.composition` (item 426) |
| `ComposedBuildingGenerator.compose()` (the composer) | lazy stage function | the massing (base wings), the entrance set, the plot and yard parts, `CompositionRow`, `compose.*` streams | `Composition` (the `wings` and `rooms` rungs), the elaboration cache, the building-band drawing, the plan rung (fixed rings, dormer rows), exports with compositions | §2.6 `BuildingGenerator.compose`; §4.1 trigger policy; §2.8 record |
| `Wing.base`, `Wing.dormerRows` (`DormerRow`), `ComposedTower.base`, `Porch.kind`, `Composition.row`, `Composition.grammar` | lazy record fields (stored when edited) | the composer; `setComposition` | the roofscape and its paint programs, the plan rung (dormer rows fixed where edited), glTF / CityJSON / JSON exports, the carry (rooms only) | §2.6 `Composition` (item 218 – item 220) |
| V11's `HeightsRow` with item 427's `attic`, `parapetCm`, `towerStoreyCm` | table contract (V11's rows, V02's three columns) | V11 §3.6.4 (table `heights`, keyed by template family), which writes the three columns' values once; V02 §3.10.6 keeps only their reading rule | M11's eave, ridge, tower storeys and spires; `attic` gates dormers (V02 §3.7); `parapetCm` on flat roofs | §10.2 `DesignationTemplateRow.heights` (item 435, item 427) |
| the resolution chain; `composition.roleKeys`; `composition.classFamily`; the family, class-override, role and default rows; the arrangement law | stage logic and tables | `DesignationTemplateRow.composition`, `BuildingClassRow.templateFamily` (item 432), the compiled template's `arrangement` and `structures`, V07's `v.` village classes (V07 §2.4; V11 §2.9) | M1 (every slot's row), `MassingRef.row`, `Composition.row`, T-V2-33, the why provider; V03's A1 (3) and slot order, which read `composition.classFamily` for a `v.` key without a programme row (V03 §2.4; J-V3.111) | §4.7 S11; §10.2 |
| M3's budget test and M10's slot band | stage logic | V11's `footprintM2` (p10/p90 or the 0.7 / 1.45 ratios), the role table's `footprintShare`, `LadderStepRow.sizeFactor`, `buildingScale`, the significance shift | M4's family draw, M10's shrink and reverse lattice, the report's `overBudget` | §4.7 S11 |
| `CompositionRow.axis` (`fallLine`, `water`), `MassingRef.low` | table cell, persisted field | the row (V07's longhouse rule; the mill and landing rows; `needs.runningWater`, V02 §3.14.6); the terrain sampler; the water faces | M2's frame; V03's byre end (`low`); the why provider | §2.6 `BuildingInput.terrain` |
| the sunlit choice (`sunBias`) | stage logic, constant | §8.4 `Sun.latitudeDeg` (the latitude item 102's sampler reads); the constants row; the presets | M5's mirror coins; T-V2-37; the why provider | item 102 (d) |
| the building casters (base wings' prisms) | derived | the massing's wings and heights | item 102's epoch daylight raster (V06 §3.4, per wing — a cross-volume item); §8.4's shadows | §8.4 casters; §4.11 |
| attached structures (M8b; `BuildingInput.attached`) | stage logic, input field | V11's structures through `roleKeys` (`attach: 'main'`); S11's drawn counts (item 304) | the main building's wheel, church porch and west towers; the forced tower mill; the absorbed ranges' budget | §4.7 S11 (item 304) |
| `MassingRef.segments`, `MassingRef.cupola`, `BaseWing.arcade` | persisted fields | M5 / M13 (`segments`), M12 (`cupola`), M11 (`arcade`); every `setMassing` op and the mutator | the parity harness, the report, the why provider; the roofscape and exports (`cupola`); the drawing, exports and capacity (`arcade`) | §2.6 `Building`, `BaseWing` (item 216, item 217) |
| wing references by key; the canonical wing order | contract | every wing writer (massing, mutator, `setMassing`, migration) | the carry, the plan's re-cut, §6.3's re-match, the clip order; T-V2-34 | §2.6 (item 225) |
| the significance shift | stage logic | the use's σ (§4.5 (1): V11 §3.13's landmark ×2 and `economicWeight`, from V08's DR24) | every geometry cell and M10's budget of that building; T-V2-38 | §4.5 (1) |
| split and ladder composition (V02 §3.14.3–§3.14.4) | stage logic | `Use.branchOf` and V11's `split` families (item 105 (h)); `LadderStepRow` (item 108) | the two buildings of a split site; members and SIZE buildings; W3b's arrangement change; T-V2-39, T-V2-40 | §4.7 S11 designation mutator |
| the crypt seed wings, the raised crypt's lift, the dig floor, the W6 dig trigger | stage logic, persisted heights | `cryptSeedWings` (template parts, a stack's tier 0, the east-most range); V03's extent — the stair-entered reading (V03 §3.7.4), which gives the ground wings over the basement's ring the lift and the half raise act on; V11's `crypt` column through item 238; the terrain gate; V04's void systems; V11 §3.23.7's `DigRule` rows (the dig chance) | §2.6's basement function (`Basement.crypt`, `kind 'raised'`, item 226); V03's choir stairs; V04's access draw and (k) (5)'s obstacle test | §2.6 *Basements*; II.7.3; item 109 |
| `composition.room` op, `moveTower { shape }`, the secondary-porch op | edit kinds | T9's handles, the clerk, a skeleton file | the stored composition, the `rooms` rung, §7.3's orphan table | §7.1 (item 351) |
| the `WhyProvider` for `building` (`massing`, `wings/<key>`, `composition`) | interface implementer | the committed massing, M3's and M8's tests re-run without draws, the event log | V10's oracle and clerk; V09's "why?" panel; T-V2-43 | V10 §3.9 (item 270) |
| `fantasyShapes`' control row | control | the recipe | M3's family filter; V09's advanced panel; `@plat/docs` | §7.8 (item 402) |
| `@underground` rows, `BuildingInput.layer` | table rows, input field | S11's plot layer (II.7.3, II.7.5, item 109 (j) (4)) | M1's key suffix, M0 (f) | §2.6 `BuildingInput` (item 303) |
| naming slice `building.wingRole` | table (V11's naming tables) | V11 (a cross-volume item) | the wing hover label (V02 §5.4) | §10.4 |
| roof decorations `sails`, `smokeStack`, `stepStones`, `wallGrass` | §8.10 rows | the massing (sails, the class's `emits.smoke`); the `FM` look | the tile rasteriser | §8.10 |
| options `fantasyShapes` (a recipe parameter) and `massing.composed` (a table option, `extension` over both) | model options | the recipe and §7.8's control; the preset resolution (§7.6) | M3's family filter; V02 §3.1's switch to the base outline under `MFCG` / `FTG` | §7.8, §7.6 |
| the composer's room roles `hall`, `gatehall`, `chapel`, `towerRoom` | room rows | the `rooms` rung (V02 §3.8) | the plan rung's programme and its arches (V03); §8.5's room labels | §2.6 `Composition.rooms`, §10.2 `RoomProgramRow` |
| `RoofSpec.kind 'shed'` and `RoofSpec.high` | model field values | the massing (back ranges, lean-tos, outshots) | the roofscape, §8.2's roof programs, glTF and CityJSON roofs | §2.6 `RoofSpec` (item 222) |
| `roofscape(building)` | derived function (never stored) | base wings, heights, roofs, towers; the composition's dormer rows and porch where present | §8.6 roof construction `roofscape`, §8.4 surface layer and casters' roof faces, glTF / OBJ / CityJSON LoD2.2 roofs, B-ZOOM | §8.6 (item 406) |
| `facadeBays(wing, side, bayM)` (the signature V02 §2.4 declares) | derived function, implemented in `@plat/plots` and re-exported by `@plat/buildings` (item 505) | a wing's ring and the `bayM` column | dormer positions (V02 §3.7), the plan rung's windows (V03), lit windows when no plan exists (§8.4's `live.windows`), decorative chimneys (§8.10) | §2.6 plan step 6 "one per façade bay" (item 406) |
| `resolveEnds(building)` | derived function | base wings, heights, joints | the roofscape; the drawing of ridge ends | — (new, inside V02 §5.2) |
| the mutator's wing step (`mutateMassing`) | stage function | `MutationRecord` steps of §4.7 S11; `MassingGrowthRow`; `siteplan.mutate` stream | kept, adapted, added and subtracted wings; `MutationStep` of part kind `wing`; the composition's per-wing keep; Works stages (V06) | §4.7 S11 designation mutator step 1–7 |
| concerns `massing`, `compose.dormers`, `compose.porch`, `compose.rooms` | stream registry entries | §6.1's mixer | the massing and the composer | §6.1 registry (item 341) |
| anchors for base wings and composed parts | identity rows | §6.3's re-match | edits by key after a re-derivation; the mutator's keep | §6.3 anchor table (item 346) |
| events `setMassing`, `setComposition` | edit kinds | the canvas T9 `shape` handles, the clerk's tool API, a skeleton file | S11's operator on the plot (massing), the stored composition, `carryWings`, the capacity re-homing, the elaboration record | §7.1, §7.4 (item 351) |
| the `FM` building-scope parity preset | preset | `composition.json` cells' `presets.FM` entries, the measured-rate cells set by V12's `reference` run against Fantasy Manor (V12 §3.7.2 (3); reconciliation round 2, SCC-40); V11 §3.24.0's item-110 chance and offer cells' `presets.FM` entries, 0 | the free-frame parity harness (V02 §7.4), the owner's stage-3 panel, a user's "Fantasy Manor look" | §7.6 (item 376) |
| the register entries of `composition.json`'s calibratable cells | calibration register entries | the seat landing M3a-V2, M6a, M6b and M6c (V02 §8.3, §8.5), from this volume's defaults, tests and fallbacks (V02 §3.10, §6, §8.2) | `plat calibrate register --check` (T-V12-20) at each exit; V12's tuning, fallback and reference runs (V12 §3.7) | V12 §3.11; §13.9 |
| the `BenchBarDef` registrations of V02's eleven bars (T-V2-22, -28, -29, -30, -32, -36, -37, -42, -46, -47, -51) | bar registrations (`@plat/testkit/bars`) | the seats landing M3a-V2, M6a, M6b and M6c, each in the change that writes the register entry naming the bar (V02 §3.10.10's table; V02 §7's checks as their `run`) | `plat parity`'s `bar.` rows (V12 §1b); the register lint and the exit rule (V12 §3.11, T-V12-20), which confirm the entries of V02 §3.10.10's lines | V12 §2.1 (`BenchBarDef`, `bar.<barId>`); §13.8's CI tiers |
| F-MASSING, F-COMPOSE | failure classes | the massing's and the composer's checks | the generation report (massing), the view report (composition) | §5.2 (item 328) |
| paint programs `roofscape`, `dormer`, `porch`, `towerRoof` | style programs | the roofscape, the composition | the tile rasteriser; the SVG writer | §8.2 (item 406) |
| JSON `massing` and `composition` blocks; glTF composition meshes; CityJSON LoD2.2 roofscape | export content | the model and the elaboration cache (or a derive-on-export pass) | files | §11.1 (item 449) |
| `@plat/buildings` | package | `@plat/kernel`, `model`, `tables`, the `BuildingGenerator` interface in `@plat/plots` | the `StrategyRegistry.building` entry `composed` | §14 (item 505) |
| the free-frame parity harness `plat/bench/fm-parity/` | test instrument | the `FM` preset; `baselines.json` rows from `captures/manor/README-frequencies.md` | §13.5's Fantasy Manor rows; the owner's stage-3 panel; V12's `reference` run against Fantasy Manor, whose fixture it is (V12 §3.7.2 (3); SCC-40) | §13.5, §13.6 (item 522) |
| `layTiers` — the tier geometry, ST2–ST7 (pure since the second revision) | pure function, exported by `@plat/plots` | `TierInput` (V02 §2.6): a frame, the region, the scale, the row's `TierCells`, the storey heights, pitch, parapet and plinth, a `TierDraws` list, an optional anchor | a `TierLay` or a typed `TierFailure` → `massStepped` (ST8 and the attempts), the `tiers` op (V02 §4.6), the mutator's anchored lay (V02 §3.15.5), V04's ruin stage (X19) | §2.6 base outline builder (item 229) |
| `massStepped` — the stepped branch of the massing | exported function, `@plat/plots` | `BuildingInput`, the `CompositionRow`, the bands; `slotBand`; `drawTiers` on `massing` indices 8–9; the attempt streams `massing/attempt=a` | `Building.wings` and `Building.massing` (with `stack`) of a stepped building — from M3a through the base outline builder, from M6a through stage 3's M5; T-V2-46 compares its output | §2.6 base outline builder (item 229); §4.7 S11 |
| `slotBand` — M10's band as one exported formula | exported function, `@plat/plots` | the template's `footprintM2` (or, where the template is claim-sized or the row carries `claimShare`, `claimShare × area(H)`; on a deck the deck row), the role table's shares, `buildingScale`, `sizeFactor`, the significance shift (V02 §3.2 step 3), the drift's `areaPct` | M3's budget test, ST0, ST8, M10 | §4.7 S11 |
| `drawTiers` — ST1 as a function of two streams | exported function, `@plat/plots` | `TierCells` at the band and the storey heights; two `Rng`s (`massing` 8 and 9; `siteplan.mutate` for a mutation; V04's ruin stream) | the `TierDraws` list `layTiers` reads | §6.1 |
| `TierFailure` — `layTiers`' typed failure | type | `layTiers` (ST3's exhausted stair fallback, ST6's checks) | `massStepped`'s M14 loop; the `tiers` op's bend; the mutator's degrade; V04's ruin stage | — |
| `TierCells.heights`; `CompositionRow.claimShare` and the constants `claimLo`, `claimHi` | table cells | `composition.json` (`stepped-monument` 350 / 300 cm; the stepped and `arena` rows' shares; the constants row's 0.35, 0.6) | `layTiers`' storey heights for a ruin's shrine (V04 passes them); `slotBand` | §7.6 |
| the stack migration row | migration rule | the document loader | `MassingRef.stack` re-derived from the wings of a stepped building that lacks it; then the `tiers` op, the why facts, the JSON export | §7.5 |
| the stair form `none` and `MassingRef.stack.grade` | persisted values | the bends of V02 §4.6; a skeleton file line; `drawTiers` (the grade) | ST3, ST5, ST6, `stairChain`, `landingSide`, the entrance hint; the `tiers` op's re-lay (the grade); V03's `W_TIER_UNREACHED`; exports | §2.6 (item 217's `MassingRef`) |
| the bends `bend.tiers.stepped`, `bend.tiers.none`, `bend.tiers.axial`, `bend.tiers.internal`, `bend.tiers.count`, `bend.tiers.step`, `bend.stack.groundWing`, `bend.stack.roof`, `bend.stack.base`, `bend.deck.single`, `bend.building.remove`, `bend.row.plotLine`, `bend.wing.grow`, `bend.family.nearest`, `bend.room.passage`; `bend.deck.basement` (reconciliation round 1 with S23-17: a cellar requested on a deck over water goes to the nearest ground building of its plot group, else its block, else the nearest building on the ground — item 305 as reconciled, V03 §4.2) | edit results with their one-line words | V02 §4.2, §4.3, §4.6; V03 §4.2 (`bend.deck.basement`) | V09's words (X21, replacing V9C-59 (4)'s refusal list); V10's clerk (X22); the why provider | item 101 R2; §7.1 |
| `rebaseStack` — the building-level datum pass | derived function, exported by `@plat/plots`, built at M3a-V2 (V02 §2.6's derived-at-read heading) | the ground wings' `levelledGroundCm` samples (with item 231's wall-side reading) through its `ground` parameter, which each re-basing path builds from its document and the plot's arena key, the deck's surface, a kept user `baseCm` of a ground wing, the crypt lift | every stacked wing's `baseCm`, every stair's `ridgeCm` and `stairSteep`, `Building.heights` (the envelope, `floors`) → §8.4's casters and caster ceiling, V05's clearance (X20), V06's shade mask, the 3-D exports | §2.6 datum (item 370); §7.3 (a) 4; §7.4; the carry's rule (2) |
| the stack order under Works | derived rule in `heightsAt` | §4.11 step 8 (item 318): the stack's courses, `on`, `solid` | §8.4's casters at a stage, §11.1's 3-D export, V06's Works (X23) | §4.11 |
| the pent band facets | roofscape rule | a pent wing's ring and the ring of the wing standing on it | §8.4's surface layer and casters; glTF, OBJ and CityJSON roofs | §8.6 (item 406) |
| a solid stack's entrance and plan root | base rule | §2.6 *Entrances* rule 5 (item 230); ST7's hint | V03's plan root at the first landing door (X18); T-V2-45 | §2.6 |
| the sibling-disjointness check | invariant | ST6; item 333 in the carry check | the carry's halving; F-REDERIVE; T-V2-44 | §2.6 rule 4; §5.3 |
| chimney hosting on a stack | draw rule | V02 §3.7's decorative chimneys; the roofscape reading `Chimney.column` and `Chimney.levels` | §8.10's tile draw; V03's carried stacks | §8.10, §8.6 |
| the `tiers` op's fields `shape`, `lowerRoof`, `solid`, `shrineInsetShare`, `centre`, `radiusCm` | edit op fields | T9's tier controls (X21); the clerk (X22); a skeleton file | the stack's re-lay; undo; the why facts | §7.1 (item 351) |
| `terrace.wallBandCm` and the wall-side sample | base rule, constant | §2.6 datum (item 231) with item 110 (a)'s `RetainingWall` | every wing's `baseCm` near a retaining wall; the basement's walk-out (V03) | §2.6; item 110 (a) |
| `levelledGroundCm(doc, key, p)` — V05's levelled-ground reader (item 309), consumed here | base reader | S10 and S11's levelling (item 110 (a)'s platform datum of a levelled plot, block or ward), else S1's raster with the T2 terrain strokes | `deriveBase` and `rebaseStack`'s ground wings (item 370, item 231; V02 §3.15.2 (1)), and through them the dig floor (V02 §3.14.5 (a)); the basement gate's fall (§2.6's skirt facts) and the raised crypt's lowest sample (V02 §3.14.5 (d)); T-V2-51 (c) | §2.6 *Heights and the ground datum*, *Basements*; §4.7 S10–S11 (item 309) |
| `deckOk` per use (the crypt binding) | placement constraint | V11's `deckOk` (X16 extended); V04's crypt records | S10b's placement; T6's landward bend (V9C-58 (2)); the mutator's relocation (§10.3) | §4.7 S10b |
| family `ovalCourt` (`massOval`, exported by `@plat/plots`), the `arena` family row (an override row until reconciliation round 1 made it V11's `arena` family's), `caveaM` | family, function, table row and cell | `composition.json`; the base outline builder from M3a (item 229) and M5 from M6a call `massOval` | M3–M13; the roofscape; V03's plan of the outer ring; V12's fixture bars (X25); V11's arena plot (X27); V01's hood-pin sites (V01 §3.8.2 step 1: no pin on the arena floor, the `court` yard part of item 303's hole sentence from M3a) | §7.6; §4.7 S11 |
| `vaultClamp` and its constant `vaultClampCm` (second revision, V2C-67; `raised.clearCm` withdrawn by reconciliation round 1, S23-01: every building meeting a new raised way's piers or strip takes the fates, V02 §3.17 (b)) | clamp, constant | `composition.json`'s constants; V04's chamber ceiling (X29) | M11 on the underground layer | II.7.6 |
| `DeckContext.landmark` (item 110 fold; producer named in the second revision, V2C-66 (6)) | input field | the base's deck-plot record's `landmark` flag (X28, the coherence pass) | M1's chain; M10's budget choice | item 110 (d)'s deck plots |
| `BaseWing.on`, `BaseWing.solid` | persisted fields | `layTiers` through the massing (ST7), the `tiers` op, the mutator's stepped rows | `deriveBase`'s stacking (item 370), `storeyRange`, the capacity (item 371), the roofscape's occlusion and order, the casters, the carry check (item 333), exports, V03's plans of tiers (X18), V01's `hatched` stack order by `on` depth and tier shadows (V01 §5.1.3; X24) | §2.6 `BaseWing` (item 227) |
| the roles `tier`, `shrine`, `stair`; the family `stepped` | enum members | the massing | `WingRoleRow`, the roofscape, `building.wingRole` labels, exports, the why provider | §2.6 (item 216's `WingRole`; item 221's family union) |
| `MassingRef.stack` | persisted field | ST7, the `tiers` op, the mutator | the `tiers` op's re-lay, the why provider, the JSON export, the report | §2.6 `Building` (item 217's `MassingRef`) |
| `CompositionRow.tiers` (`TierCells`) and the rows `stepped-temple`, `terraced-palace`, `tiered-tower`, `stepped-monument` | table cells and rows | `composition.json` (own), reached by name from V11's specialisations (X17) and by V04 (X19) | `layTiers` (ST1–ST8), M3's stepped test, the load checks (V02 §3.15.4) | §7.6; §10.2 `DesignationTemplateRow.composition` (item 426) |
| `storeyRange`, `deckLevel`, `stairChain`, `landingSide` | derived functions, exported by `@plat/plots`, built at M3a-V2 with the item 110 fold | the wings with `on` and `solid` | the capacity and `Storey.wings` (item 371), `deriveBase` (item 370), V03's levels and landing doors (X18), V03's eager facts at M3a — `ground(b)` and `floorCm` (V03 §3.3), `basementDoor(b)` (`stairChain`: the stair wings and stair 0's approach, V03 §3.7.1) and `stackAccessDoor(b, a)` (`stairChain`: stair 0 and its approach strip, V03 §3.7.2 (1); seam S23R4-02) — and through them V01's entrance reserve, T-V2-44 – T-V2-45 | §2.6 capacity, `Storey` |
| stair 0's **approach strip** of a stepped stack | derived region, never stored: the stair reserve's width, `landingM` deep in front of stair 0's foot; under `internal`, `landingM` in front of the main entrance; none under `none` (stated once in V02 §4.6's ground-wing bullet) | `stairChain`'s stair 0 with its ring and `RoofSpec.high` (its foot the side opposite its head), the main entrance under `internal`, the constant `landingM` | V02 §4.6's ground-wing placement (`addRange`, `addTower`, `backRange`); V03's `basementDoor(b)` rule 2 and `stackAccessDoor(b, a)` (V03 §3.7.1, 3.7.2 (1)) | §2.6 `Building` (the stack's wings) |
| the stack's heights envelope | derived rule in M11 | the stacked wings' heights | `Building.heights` → §8.4's caster ceiling, V05's clearance (X20), exports | §2.6 Heights |
| `BuildingInput.deck` (`DeckContext`) | input field | S11, from the base's deck plot (item 110 (d)) | M1's `@deck` suffix, M10's deck band, M11's storey cap, `deriveBase`'s deck datum (item 370), the basement gate (item 305), the dig floor (V02 §3.14.5) | §2.6 `BuildingInput` (item 305); §4.7 S11 |
| the deck budget (read) | table contract | V11's table `deck` by deck kind × band (X16); until it lands the constants `deck.fallbackM2`, `deck.fallbackFloors` | M10 and M11 on a deck plot; the dry run's storey bend (V02 §4.6); the why provider | §10.2 (V11) |
| the `@deck` rows | table rows | `composition.json` | M1 and M5–M12 on a deck plot | §7.6 |
| `MassingOp` `tiers` | edit op | T9's tier controls (V09, X21), the clerk (V10, X22), a skeleton file | the stack's re-lay, undo, the why provider | §7.1 (item 351's union) |
| the paint program `stairFlight`; the roofscape's stack order | style program, draw rule | the roofscape | the tile rasteriser, the SVG writer | §8.2 (item 406's list), §8.6 (item 419) |
| export content `on`, `solid`, `stack`; CityJSON `BuildingPart` and `BuildingInstallation` | export content | the massing | files | §11.1 (item 449) |
| constants `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare`, `riserMaxCm`, `deck.fallbackM2`, `deck.fallbackFloors` (`treadM` withdrawn by reconciliation round 1); `ovalSides`, `ovalAxisRatio`, `ovalMajorFactor` | table cells | `composition.json`'s constants row | `layTiers`, `massStepped`, `massOval`, the roofscape, `stairTreads`, the exports, M10 and M11 on decks, and (`landingM`) stair 0's approach strip | §7.6 |
| `stairTreads(w)` — the one tread law of a stair wing (J-V2.90) | derived function, exported by `@plat/plots` | a stair wing's `ridgeCm` (its rise, kept true by `rebaseStack`), its ring and `RoofSpec.high` (its run); the constant `riserMaxCm` | `stairFlight`'s tread lines (V02 §5.6), the glTF, OBJ and CityJSON stair solids, the per-wing constructions' treads (item 419), V01's stair-flight hatch (V01 §5.1.2), V03's exterior flights (V03 §5.1) | §8.2 (item 406's `stairFlight`); §8.6 (item 419); §11.1 |
| `cryptSeedWings(b)` (J-V2.92) | derived function, exported by `@plat/plots` | `BaseWing.partName` (item 234), a stack's tier 0, the wings' roles, rings and ridges | §2.6's basement function (item 238's crypt ring; item 226's lift and half raise act on the wings over the basement's ring); V03's crypt placement (V03 §3.7.4 step 1); T-V2-36, T-V2-53 | §2.6 *Basements* (item 226, item 238) |
| the half cellar's raise (J-V2.91) | base rule, a datum term | §2.6's terrain gate choosing `half`; `cellar.depthCm`; the wings over the crypt's ring for a basement that is only a crypt (`cryptSeedWings` where V03 keeps a derived crypt under them, V03 §3.7.4) | `deriveBase` and `rebaseStack` (1) on every re-basing path → those wings' `Heights.baseCm`; the basement floor at the datum less half the depth; V02's dig floor (V02 §3.14.5 (a)); V03's storey datum and its half cellar's light windows (V03 §3.3, W2); T-V2-52 | §2.6 *Heights and the ground datum*, *Basements* (item 226) |
| `BaseWing.partName` (V03's item 234) | persisted field | the base outline builder's templates, passed through by M0 (d) and kept by every V02 wing writer (V02 §2.1) | M8 (e)'s crossing tower; `cryptSeedWings`; V03's A5 (e) room placement; the why provider | §2.6 `BaseWing` (item 234) |
| the family rows `burial-ground`, `fort`, `arena` and the role rows `charnelHouse`, `lychgate` (J-V2.88) | table rows | `composition.json`; V11 §3.6.1's 35 template families and their structure names | M1's chain for the classes `cemetery`, `fort` and `arena` and their structures; `roleKeys`; M8b's absorbed arena gates; T-V2-33 | §7.6; §10.2 |
| the stepped specialisation a bend to `stepped` writes (J-V2.94) | edit side effect | V02 §4.6 (1)'s bend and `setMassing { family: 'stepped' }`; V11 §3.24.3's rows for the use's culture and class | the use's `siting.declared` `use:` row cell `specialisation` (V11 §4.2) → `Use.specialisation` → V11's composition and heights replacement, V03's plan rows (`for.use`), V10's why | §7.6 (V11 §4.2's document-only table); §7.1 `EditBase.group` |


**The dossier facts that reach a building's shape** (item 20 (h): the dossier says what exists; its shape is the map's
construction). The fact tier of every record here is `derived` (§2.8's `factTier`), or `declared` where an edit set it;
each dossier fact that shapes the massing is traced to its field and derivation row:

| dossier fact (SettlementForge field) | derivation row | reaches the massing as | read by |
|---|---|---|---|
| an institution's kind and tier (`institutions[].kind`) | V08's kinds map → V11 §3.11 → the class; item 108's `LadderStepRow` | the class (and, for a ladder, the member class or the SIZE factor) | V02 §3.2 step 1; M10 |
| a custom institution's scene archetype (`custom.sceneProfileId`) | DR24 (2) → V11 §3.13.2's archetype row → the class | the class | V02 §3.2 step 1 |
| its `category` and `tags` | DR24 (3)–(4) → the siting profile | nothing in the massing except `emits.smoke` and `needs.runningWater` (V02 §3.14.6) | M2's axis; §8.10's stacks |
| its `landmarkLevel` | DR24 (7) → `landmark` → σ × 2 (V11 §3.13) | the significance shift | V02 §3.2 step 3; M10 |
| its `economicWeight` (the optional library field) | DR24 (5) → σ × 0.5 … 2 (V11 §3.13) | the significance shift | V02 §3.2 step 3; M10 |
| its `materialFamily` | the material row (V11 §3.19) | texture and colour only — never the massing | §8.2 |
| a split class's institution (its dossier record, with `activeChains` feeding the supply web) | S10b's split decision (item 105 (h); V11 §2.3's `split.threshold`) → `Use.branchOf` | the `split.works` / `split.shop` families | V02 §3.14.3 |
| a crypt record (V04's C4-05) and the cathedral's existence | V08's religious rows → V11's `crypt` column → item 238 | the crypt seed wings and the raised crypt's lift | V02 §3.14.5 |
| a crypt record bound to a use that could stand on a deck (a bridge chapel's crypt) — second revision, V2C-58 | C4-05's binding → V11's `deckOk` per use (X16) | never a deck plot: the use stands on land with its crypt | V02 §3.16 (6); S10b |
| households and bands (the dossier's population) | §7.7's derivation table → the prosperity field and the plots' bands | the manifested band (geometry) and the occupants' band (the composer's rooms) | V02 §3.2 step 3; V02 §3.8 |
| a worship, government or fortification institution whose culture builds in tiers — the dossier's culture only (`site.culture` → DR15's template-family row → V11's stepped specialisations): no religion field builds in tiers (a deity is a temple's dedication) and the era is the constant `c14` on dossier maps — item 110 fold | V11's specialisation rows `stepped_temple`, `terraced_palace`, `tiered_tower` with their chance and cap (X17), which name the composition key | the `stepped` family through `DesignationTemplateRow.composition` | V02 §3.2 step 2; V02 §3.15 |
| a building on a deck plot — no dossier fact names a deck (the dossier's 'Bridge' and 'Wharf' landmark strings name features whose deck plots are map-side, V08) — item 110 fold | the base's deck plots (item 110 (d)); V11's `deckOk` column (X16) | the `@deck` rows, the deck budget and datum | V02 §3.16 |


### 1c The base hooks consumed (by section)

| base section | what this volume uses | how |
|---|---|---|
| §2.6 `BuildingGenerator` (`outline` / `compose` / `plan`) | the three-call split, `BuildingInput`, `KernelResult` | the massing implements `outline()`; the composer implements `compose()`; `plan()` stays V03's |
| §2.6 `BaseWing`, `Building.wings`, the kinds `rect` / `quad` / `polygon`, `corners`, `ridgeAxis`, `spans` | the massing's output record | ranges and blocks are `rect` (butt joints) or `quad` (mitre joints); towers are `polygon`; a row keeps its `quad` |
| §2.6 the wing-carrying rule (`carryWings`, rules 1–5, J-P47–J-P49) | every wing and every stored composition point follows its footprint | unchanged; the massing establishes rule 1 at S11's first carry (the base's); the pairing tier (ii) covers every tiled massing, tier (iii) a massing with towers (V02 §3.5) |
| §2.6 Heights and `deriveBase`; Materials; Entrances (`deriveEntrances`); Basements; the stage-3 contract; the stage-3 intake | heights per wing, the ground datum, texture-only materials, the entrance set the porch and the gate hall anchor on, the union contract, the intake fallback | read as stated, with the base change requests of V02 §10 (towers in the union and per-class admission, item 223; the entrance hint, item 224) |
| §2.6 `Composition`, `Wing`, `ComposedTower`, `Porch`, `Room` | the lazy rungs' records | extended by V02 §10's requests (a composed wing and tower name their base wing; dormer rows; porch kinds) |
| §2.6 `PathShapeRow` (item 59) | Fantasy Manor's five layout families | kept as five rows of `MassingFamilyRow` (V02 §2.3) under our own ids, which supersedes it (item 221 with its table-migration row) |
| §2.6 *Basements* with item 238 (V03); II.7.3; item 109 (j), (k) | the basement decision, the crypt column, the dig draw | the crypt seed wings and the raised crypt's lift (item 226); the dig floor and the W6 trigger (V02 §3.14.5) |
| §4.5 (1) significance; §8.4 `Sun.latitudeDeg` | σ; the settlement's latitude | the significance shift (V02 §3.2 step 3); the sunlit choice (M5) |
| V10 §3.9 `WhyProvider` (item 270) | the oracle's per-kind explainer | V02 §4.5's provider for `building` |
| §7.8 the control registry | control rows | `fantasyShapes` (item 402) |
| §2.5 `SlotPlan.hint`, `BuildingSlot`, `ContextVector`, `PlotBound`, `YardPart`, `Passage`, `Plot.builtBand` / `fieldBand` | the region the massing may occupy, its frontage, its band | read at S11; the manifested band for geometry columns, the field band never (item 31) |
| §2.8 `ElaborationRecord`; §2.9 `ElaborationChunk` | the `wings` and `rooms` rungs' state and cache | the rungs' recorded inputs gain the composition slices (item 261) |
| §3.2–§3.4, §3.6–§3.8, §3.10 | lattice, `minEdge` 25 cm, `attractCm` 26 cm, `lir(ring, axes)`, `obb`, booleans on the arrangement, the near-rectangle test, the straight skeleton | the massing's snap and validation (V02 §3.5); the roofscape's facet construction (V02 §5.2) |
| §4.1 the laziness contract and the elaboration trigger policy | massing eager (S11), composition lazy | unchanged; the `rooms` rung derives with the plan only (V02 §3.8) |
| §4.7 S11 — designation template, arrangements, front-line jitter, first carry, households fill, designation mutator, informal clusters, class mix | the class, the band, the slot, the structures, the mutation steps | the massing is S11's `outline()` for every arrangement; the mutator's wing step is V02 §3.9 |
| §4.7 S10–S11's levelling (item 110 (a)) and its one reader `levelledGroundCm` (V05's item 309) | the platform datums of levelled plots, blocks and wards | every ground sample of the datum, the basement gate and the raised crypt (item 370, item 231) |
| §5.1–§5.3 | bounded ladders, no whole-map retry, the invariant suite | F-MASSING and F-COMPOSE (item 328), invariants (item 332) |
| §6.1 streams and the concern registry; §6.3 anchors | the composition's own concerns "appended when stage 3 registers them" | `massing`, `compose.dormers`, `compose.porch`, `compose.rooms` (item 341); wing anchors (item 346) |
| §7.1 events, the toolkit's T9 `shape`, `regenerate` with `rung`; §7.2–§7.5 | edits of massing and composition | two event kinds, `setMassing` and `setComposition` (V02 §4; item 351) |
| §7.6 tables, `extension`, per-preset values | the composition tables and the parity presets | `composition.json`; an `FM` building-scope preset (item 376) resolving `composition.json`'s and V11 §3.24.0's `presets.FM` cells |
| §8.1, §8.2 (`roofConstruction`, `states`, roof tint by band), §8.4 (surface layer, casters), §8.5 (bands, change markers), §8.6 (stage-3 LOD, roof construction), §8.10 (roof detail) | the drawing | construction `roofscape` (item 406); dormers, porches, tower roofs as paint programs (V02 §5) |
| §4.9 `ClimateTable` (`ClimateRow.roof`, typed by V11 §2.8) | the climate's roof form and pitch | M11's one pitch rule and M12's flat roofs (V02 §3.5) |
| §10.2 `DesignationTemplateRow`, `BuildingClassRow.templateFamily`, `HeightsRow` (V11's item 432, item 435) | the per-band template, its family and heights | the `composition` column on the row and each structure (item 426); the resolution chain reads `templateFamily`; three heights columns (item 427) |
| §11.1 exports | JSON, SVG, glTF, OBJ, CityJSON, GeoJSON, VTT | V02 §5.5 |
| §12.4, §12.5, §12.7, §12.8 | S11's row, first-map laws, the stage-3 bullet, the elaboration cache | V02 §6 |
| §13.2, §13.3, §13.5, §13.6 | bars, declared shifts, parity rows, the owner's panel | V02 §7 |
| §14, §15.1, §16, *Staged by the owner's roadmap* | packages, the parity matrix, the build plan, the staged row | `@plat/buildings` (item 505); Fantasy Manor rows (item 522); milestone M6 (item 524) |
| §2.6 the base outline builder, `deriveBase`, the capacity function, `Storey.wings`, Basements, `BuildingInput` | where the tier construction and the deck buildings plug in before stage 3; the stacked and deck datums; the storeys a stacked wing reaches; no cellar on a deck | item 227 – item 305, item 229 |
| §2.7 `Bridge.deckCm`; §4.8 the piers', moles' and quays' deck heights; item 110 (d)'s deck plots | the deck's surface and its plots | read through `DeckContext` (V02 §3.16) |
| §8.4 the casters (a prism from `baseCm`) and the caster ceiling; §8.6 the per-wing constructions | one shadow per tier; the stack's order in every construction | V02 §5.6; item 419 |
| item 110 (a)–(f) as revised ~23:40 (file g) | stepped massing, deck buildings, the building side of retaining walls, raised ways and the second fixture | V02 §3.15 – §3.17 |
| §2.6 *Heights and the ground datum*; §7.3 (a) 4; §7.4's warp and `moveVertex`; the wing-carrying rule's rule (2) | every path that re-bases a wing | one building-level pass `rebaseStack` for a building with a stacked wing (item 370 extended); the wall-side sample (item 231) |
| §4.11 step 8 `heightsAt` | a building's heights at a Works stage | a stack rises in stack order, solid wings in courses (item 318) |
| §2.6 *Entrances* rules 1 and 5 | the main entrance and the plan's root | a solid stack's entrance at its stair's foot, the plan rooted at the first landing door (item 230); a forecourt `U`'s door kept where it already lies free (item 228) |
| item 101 R2 (`docs/AMENDMENTS-2026-09-27e.md`) | "refuses only what item 20 forbids (dossier facts) and what a lock protects" | every structural limit of V02's edits is a named bend (V02 §4.2, §4.3, §4.6; J-V2.79) |
| §2.6 `interface Basement`, the terrain gate's §5.3 list and the plan rung's step 5; §5.3's basement row; §7.4's warp check; §10.2 `cellar`'s comments; §13.2's T29-4; J-A29.25 | the basement's place and its `external` access | read as *Basements* states them — inside the ground wings, `external` for a walk-out or where no ground wing is storeyed (item 371 (a)–(d)); step 3 and T28-3 are V03's item 578 |


### 1d Out of scope (and where it lives)

* **The plan rung** (`BuildingGenerator.plan`, room programmes, the interior ladder, stairs, F-PLAN) — V03. This
  volume hands it the composition (V02 §3.8) and the dormer rows it must honour (V02 §3.7).
* **Neighbourhood close-ups** and the neighbourhood click (II.4) — V01; this volume answers that click's request for
  the `wings` rung (V02 §3.11).
* **How mutations spread over epochs and show on the weekly clock** (Works, item 67; item 18 (c)) — V06; this volume
  supplies the recorded wing steps it reads (V02 §3.9).
* **The content of every other rule table** — V11; this volume owns `composition.json`'s schema and default rows.
* **The app's screens and the clerk** — volumes 9 and 10; this volume defines the events, the handles and the clerk's
  operations (V02 §4).
* **Castles and wall towers** (§4.8, §2.7's `Tower`) stay the base's; a `keep` class building uses the base's template
  (V02 §3.3's `template` family).
* **Underground buildings' vaults and islands' bases** — volumes 4 and 5; the massing gives an underground building a
  `single` range with a `flat` roof and nothing more (V02 §3.10.6's `@underground` rows). An island's rim as a cliff barrier
  and its rim-slab crypt vault are V05's.
* **Materials** are texture and colour only; `MaterialRow`'s rows are V11's (V11 §3.19); SettlementForge's
  `materialFamily` reaches the material row, never the massing (owner, 2026-09-26; T-V2-25).
* **The siting profile** (item 103) is S10b's and V11's: no profile column shapes the massing except `emits.smoke`
  and `needs.runningWater` (V02 §3.14.6).
* **The crypt's ring, its size and its rank** are §2.6's basement function with V11's `crypt` column, `cryptM2`
  and `rankShare` (item 238; V03); **catacombs** are V04's, under cemeteries or a CITY/METROPOLIS quarry
  ossuary — no V02 path makes, moves or shrinks one (V02 §3.14.5).
* **Item 110's other homes.** The `RetainingWall` record, its sources and its drawing (item 110 (a)); the
  raised ways, their arena parts, piers, ramps, stairs and vaults, and their generation at CITY and METROPOLIS or
  declaration at TOWN (item 110 (b) as revised ~23:40); the deck plots themselves — their faces, sizes and fall (item 110
  (d)'s base side); the second known-city fixture's skeleton and bars (item 110 (e); V12) — are the base's (applied
  by the coherence pass) and the named volumes'. Which classes build in tiers, with what chance and cap, and the deck budget
  row are V11's (X16, X17); the plans of tiers V03's (X18); a ruin's decay V04's (X19). V02 designs the
  building part only (V02 §3.15 – §3.17).


## 2 Data model

Units are the base's: world geometry in integer centimetres on the lattice (§2.1, §3.2), angles in centidegrees, table
cells in the unit their cell declares (metres for lengths, a share for fractions; §7.6's `{value, unit, provenance,
calibratable}`), converted to centimetres at read and snapped by the placement rule (§3.2). Every record below is
either **persisted** (model data: in the building's leaf digest and the snapshot, §6.2, §2.9), **lazy** (derived by a
rung, held in the elaboration cache outside both digests until an edit stores it, §2.8, §2.9) or **derived at read**
(a pure function, never stored). This volume adds no entity kind: every new record is a sub-record of `Building`
(the base's sub-record rule, its §2.4: its lifecycle is its building's, a lock on it is an attribute-level lock on its path).

### 2.1 The massing's records (persisted)

```ts
type WingRole =
  | 'main'      // the range the entrance hint names: the hall, the street range, the only range of a single-range building
  | 'range'     // another range of the path (a side range, the rear range of a courtyard)
  | 'cross'     // a cross-wing of a T or H plan: runs through the main range's end at a butt joint
  | 'block'     // a pavilion that splits the range it straddles (V02 §3.5 M7): always hipped, never a pyramid (item 59, ADOPTED; J-V2.3), often a storey taller
  | 'back'      // a rear range or outshot behind the main range (V02 §3.5 M9)
  | 'service'   // a lower range of the same building (a kitchen range, a stable range of an inn)
  | 'tower'     // a polygon wing with a cone or pyramid roof, attached at a corner, an end or the front, or standing on a block (V02 §3.5 M8); a church's west or crossing tower (M8 (e))
  | 'turret'    // a small tower in a re-entrant corner, a stair turret
  | 'gate'      // the front range of a closed ring: carries the gate hall (V02 §3.8)
  | 'part'      // a part of a base footprint template or of the base's axis-locked composer (institutions, §2.6)
  | 'shelter'   // a cluster structure: a tent, a shack or a lean-to shelter (§4.7 S11's cluster arrangement)
  | 'tier'      // item 110 fold: one stage of a stepped mass — tier 0 on the ground, tier k ≥ 1 standing on tier k − 1 (BaseWing.on; V02 §2.6, §3.15)
  | 'shrine'    // item 110 fold: the small roofed range standing on a stepped mass's top tier
  | 'stair';    // item 110 fold: a solid flight climbing a tier's face, from the ground (stair 0) or a terrace (stair k ≥ 1) to that tier's top

type MassingFamilyId =
  | 'single' | 'L' | 'T' | 'H' | 'U' | 'cross' | 'plotRing' | 'towerHouse'   // ours: the historical plan types (V02 §3.3)
  | 'regularCourt' | 'starCourt' | 'chordArc' | 'rectCourt' | 'gridWalk'   // our ids for Fantasy Manor's five layout families (item 59; renamed from the base's PathShapeRow ids by item 221's migration row, J-V2.47)
  | 'row'                                                           // a row arrangement's clipped quads passed through, with an optional back range
  | 'template' | 'axisLocked' | 'baseOutline'                      // the base outline builder's constructions (§2.6), kept for institutions, the MFCG / FTG presets and the last fallback
  | 'shelter' | 'drawn'                                             // a cluster structure; a hand-drawn footprint (§7.1 drawFootprint)
  | 'stepped'                                                       // item 110 fold: stacked tiers laid by massStepped / layTiers (V02 §3.15)
  | 'ovalCourt';                                                    // second revision: an elliptical two-ring court — an arcaded façade ring and a solid seating ring round an open floor (V02 §3.5 M5); not fantasy

// BaseWing (§2.6), as amended by item 216: two fields added
interface BaseWingStage3Fields {
  role: WingRole;   // persisted; written by the massing, the mutator's convert step and setMassing; read by the composer, the mutator's match, the roofscape's joint priority, the exports and the anchors
  key: number;      // persisted; a stable ordinal inside the building — written once when the wing is minted, never changed, never re-used after the wing is removed (Building.nextWingKey); the composer's per-wing draws, a composed wing's `base`, the mutator's keep and every edit path (`wings/<key>/…`) name the wing by it
  arcade?: true;    // persisted; its ground storey is an open arcade (a market hall): written by M11 from the row's `arcade` cell and by setAttr(wings/<key>/arcade); read by the drawing (dashed outline), the exports (open) and §2.6's capacity (no ground-storey rooms)
}
// Building (§2.6), as amended by item 217: two fields added
interface BuildingStage3Fields {
  nextWingKey: number;  // persisted; the next free wing key; written by the massing (= the wing count at S11) and by every wing-minting step; never decreases
  massing?: MassingRef; // persisted; absent only on a document from before stage 3's landing that has not been upgraded (V02 §2.5 below)
}
interface MassingRef {
  family: MassingFamilyId;   // the family the massing (or the last `setMassing` family op, or the mutator) laid
  row: string;               // the CompositionRow key the resolution chain reached (V02 §3.2 step 2): a template's `composition` value, `<class>/<band>`, `<family>/<band>`, `default.<arrangement>/<band>` (with `@underground` appended on the underground layer)
  grammar: string;           // the composition.json version it read — migration (V02 §2.5) and the report read it
  entrance: { wing: number /* a wing key */; side: number /* that wing's ring side */ } | null;  // the entrance hint: the footprint side the main entrance goes on (item 224's rule for deriveEntrances); null where the base rule alone decides (a row, a shelter, a drawn footprint)
  segments: number;          // the path's segment count after collinear merging (M5), before M7 splits a range into pieces: the unit Fantasy Manor's counts use (V02 §7.4); 1 for `single`, `row`, `towerHouse` and the base's constructions; written by M5, rewritten by every `setMassing` op and the mutator (the count of range-role wings after re-joining each block's pieces); read by the parity harness, the report and the why provider
  low?: { wing: number /* key */; end: 0 | 1 /* the ridge end: 0 the end on ring side 1, 1 the end on side 3 */ };   // axis 'fallLine' only (V02 §3.5 M5): the main range's downhill end — V03's byre end reads it (V07's longhouse); rewritten when that wing is reshaped, absent otherwise
  cupola?: { kind: 'dome' | 'tip' | 'pyramid'; wing: number /* key of the range whose ridge midpoint carries it */ };   // M12's roof ornament (V02 §3.5 M12): drawn and exported, never in Heights, never a caster; rewritten when its wing leaves (dropped) or is reshaped (kept at the new midpoint)
}
interface DriftBounds {       // typed here once (item 385); the base describes it at §7.7's Assignment and §2.6's BuildingInput
  areaPct: [number, number];         // the footprint area's allowed band around the row's target, in per cent (default [-15, 15])
  floors: [number, number];          // storeys relative to the row's draw (default [-1, 1])
  families?: MassingFamilyId[];      // the allowed layouts; absent: the row's. Before stage 3 registers (from M3a), only 'baseOutline', 'template', 'axisLocked', 'row', 'shelter' and 'stepped' (the base outline builder lays it through massStepped, item 229) are admitted; any other id is ignored and reported (`driftFamilyIgnored`), and read once stage 3 registers
  roofKinds?: RoofSpec['kind'][];    // the allowed roof kinds; absent: the row's
  classFamily?: string;              // §6.3's building class family the assignment keeps
}
```

**`BaseWing.partName` (V03's item 234).** A template part's name
(`nave`, `transept`, `crossing`, `chancel`, `apse`, `tower`, `cloister walk`, …), written by the base outline builder's
templates. V02 mints none: M0 (d) passes it through with the template's wings; every V02 wing writer — the mutator's
W-steps, every `setMassing` op and bend, the canonical re-keying, `rebaseStack` — keeps it on the wing that keeps its key
(a block's pieces re-joined by `removeWing` keep the `partName` of the piece whose key the joined wing keeps, the lowest);
a wing V02 adds carries none. It is read by M8 (e) (a crossing tower over the part `crossing`), by `cryptSeedWings`
(V02 §3.14.5 (c)) and by V03 (A5 (e)); its lifecycle row is V03's (V03 §2.5), summarised in V02 §2.5.

`RoofSpec` (§2.6) gains one kind and one field (item 222): `kind: … | 'shed'` — a single-pitch roof — and
`high?: number`, the wing's ring side along which a shed roof stands at its ridge height (the side against the host
wall); absent on every other kind. A shed wing's `ridgeCm` is its height at `high`, its `eaveCm` its height on the
opposite side. Written by the massing (M12) and by `setAttr(wings/<key>/roof)`.

**The canonical wing order (stated once; J-V2.48).** `Building.wings` is always ordered **towers and turrets first,
ascending by key, then every other wing ascending by key**. The massing mints keys in that order at generation (M13),
and every writer — the mutator (V02 §3.9), `setMassing` (V02 §4.2) and the migration row (V02 §2.5) — re-sorts by this rule
before it commits, so §2.6's clip order (towers first) and every derived order are functions of the keys alone. A tower
standing on a block (M8 (d)) is contained in its block; the clip order takes it after its container by §2.6's
containment rule, whatever its place in this order.

**Wings are named by key, never by position (item 225).** Under stage 3 the base's index-named wing fields —
`Entrance.wing`, `Porch` (through its wing), `Room.wing`, `StairCore.wing`, `StairCore.tower` (the key of the tower wing
whose round room holds the spiral; item 225 as reconciled, S23-09), `Chimney.wing`, `Storey.wings[]` and
`ProgramRoom.wing` — hold **base wing keys**. A tower's room names its tower wing's key (no `wings.length +` offset); a
composed wing is found by its `base` key (`Composition.wings` is looked up by `base`, never indexed by position). The
base's index reading stays for the base outline builder, whose keys equal its indices (item 216), so nothing changes
before stage 3. An edit or a mutation that adds or removes a wing therefore never re-points a stored door, room, stair
or chimney (T-V2-34).

### 2.2 The composition's records (lazy; stored only when edited)

```ts
// Wing (the composed wing, §2.6), as amended by item 218: a composed wing names its base wing and takes its ring,
// heights, roof and spans from it at read — the composition never re-shapes the massing (J-V2.2, J-V2.6)
interface ComposedWingFields {
  base: number;                 // the key of the base wing it composes; 1:1 with the building's base wings that are not towers or turrets
  dormerRows: DormerRow[];      // zero, one or two rows: one per eave side
  // footprint, heights, roof, spans: derived from the base wing named by `base` whenever `base` is set (never stored then)
  // dormers (the base's count): derived — the sum of the rows' counts (item 218)
  // porch: on the wing that carries the main entrance only, where that wing's role admits one (WingRoleRow.porch, V02 §3.7)
}
interface DormerRow {
  eave: 0 | 1;          // which of the wing's two eave sides: 0 the first eave side in ring order, 1 the second (V02 §2.4 below)
  count: number;        // ≥ 0; positions derived by dormerPositions (V02 §3.7), never stored
  widthCm: Cm;          // each dormer's width along the eave
  kind: DormerKind;
  edited?: true;        // set by setComposition: a fixed input to the plan rung's step 6 (V03), kept through a re-derivation of the wings rung while the wing's eave keeps its length within ± 10 %
}
type DormerKind = 'dormer' | 'wallGable' | 'hoist' | 'entranceGable';   // a roof dormer set back from the eave; a gablet that breaks the eave (the wall rises through it); a warehouse's loading dormer; the gable over the main entrance's bay (V02 §3.7)
type PorchKind = 'hood' | 'gabled' | 'twoStorey' | 'recessed' | 'halfRound';   // halfRound: a half-disc on the door's side under a half-cone roof — Fantasy Manor's commonest porch (V02 §3.7; weight 0 by default, calibrated under FM)
// Porch (§2.6), as amended by item 219: `kind` added; side and offset stay the main entrance's (the base's rule 3)
interface PorchStage3Fields { kind: PorchKind }
// ComposedTower (§2.6), as amended by item 220
interface ComposedTowerFields {
  base: number;   // the key of the massing's tower or turret wing; its ring IS that wing's ring, and centre (the ring's area centroid), radiusCm (the largest vertex distance from it, rounded up), heights and roof are read from that wing — never stored when `base` is set
}
// Composition (§2.6), as amended by item 220
interface CompositionStage3Fields {
  row: string;      // the CompositionRow key the composer read (the massing's MassingRef.row unless an edit changed the class since)
  grammar: string;  // the composition.json version
  secondaryPorch?: { entrance: number /* the Entrance ordinal (§2.6 Entrance.vertex's i) it stands at: a side, rear or yard entrance */; widthCm: Cm; depthCm: Cm };   // a hood only (V02 §3.7, J-V2.44); lazy, stored with the composition when an edit stores it; side and offset re-read from its entrance after every carry (the base's rule 3)
  // courts: derived at read — the holes of the building's footprint face, in ring order (V02 §3.6); never stored
}
```

A composition therefore stores, when an edit stores it, only its row and grammar, per composed wing its `base` and its
dormer rows, the porch, per composed tower its `base`, and the rooms and plan the base defines. Its world points are
only the rooms' and the plan's, which `carryWings` already carries (J-P48); the composed wings and towers follow the
base wings they name, so a stored composition adds no carried ring of its own (J-V2.6).

### 2.3 The composition tables (`composition.json`, `@plat/tables`)

One versioned table file, read through the override layer (§7.6); every cell `{value, unit, provenance, calibratable,
extension?, presets?}`. Every calibratable cell has its **calibration register entry** (V12 §3.11: its default, its confirming
measurement, its due milestone and its fallback as this volume states them), written by the seat landing the milestone that
ships the cell — M3a-V2, M6a, M6b or M6c (V02 §8.3, §8.5) — and `plat calibrate register --check` (T-V12-20) is green over
them at that exit; a `presets.FM` **measured-rate** entry (V02 §3.10.8's calibrated list) is set only by V12's `reference`
run, and the code-read `FM` entries (the rich rows' `families`, `sunBias` 0.5) carry their `ref:… (code)` provenance and
move by no run; `sunBias`'s parity-neutral
entries under the zeroing presets `MFCG`, `FTG` and `VG` (0.5, where the zeroing would give 0) are `own` with the note
`fixed: the parity neutral` (V11 §2.2's rule (a)) and move by no run either. Each column family's metric,
method, due milestone and fallback are V02 §3.10.10's line. Readers: S11 (the massing), the composer, the designation mutator, the roofscape, §8.10's roof
detail. Slice kinds: `row` (a `CompositionRow`, a `WingRoleRow`, a `MassingGrowthRow`), `weights` (a row's family
weights, porch weights, tower-shape weights), `bracket` (`TowerShapeRow.sides`). Default rows: V02 §3.10.

```ts
interface CompositionRow {           // one per (key, band of §4.5's band set), compiled from the four authored anchors (V02 §3.10.1); continuous cells interpolate along the prosperity value between band centres (§4.5), discrete cells switch at the cut (item 19)
  key: string;                       // `<prefix>/<band>`, the prefix a template-family key (V11 §3.6.1), a class id (an override row), a structure-role key (V02 §3.10.4), `default.<arrangement>` or `outbuilding`; `@underground` suffixed rows exist per prefix (V02 §3.10.6)
  prefix: string; band: string;
  alias?: string;                    // a row that reads another prefix's row at the same band (e.g. the `kiln` role reads `kiln-yard`); cells the alias row states override it
  families: { family: MassingFamilyId; weight: number }[];   // continuous weights (interpolated, then renormalised over the feasible set, V02 §3.5 M4); must satisfy the arrangement law (V02 §3.10.7)
  axis: 'frontage' | 'fallLine' | 'water';   // discrete (V02 §3.5 M2): how the main range is oriented; default 'frontage'
  wingWidthM: [number, number];      // continuous: the range's width, drawn uniformly in [lo, hi]
  rangeLenM: [number, number];       // continuous: a single range's length and an L / U / H arm's target length
  crossWing: { fwdM: [number, number]; backM: [number, number] };   // continuous: how far a cross-wing reaches in front of and behind the main range
  courtMinM: number;                 // continuous: the least court side a closed family may leave
  uOpenFront: number;                // continuous chance that a U plan opens toward the frontage (a forecourt) rather than the rear
  blocks: [number, number];          // continuous count range; the count is drawn uniformly on the integers inside it
  blockStoreyDelta: [number, number];
  towers: [number, number];          // continuous count range (corner, end and gate towers; a `towerHouse` family's own tower is laid by M5 and not counted here)
  towerShape: { round: number; square: number; octagon: number };   // continuous weights
  towerRadiusW: [number, number];    // continuous: a corner or end tower's radius as a share of the wing width
  towerStoreyDelta: [number, number];
  towerOnBlock: number;              // continuous weight of M8's candidate (d), a square tower standing on a block: 0 by default, calibrated under FM (V02 §3.10.8)
  towerFlat: number;                 // continuous chance that a square or octagonal tower takes a flat battlemented roof (parapet) instead of a pyramid
  westTowers: [number, number];      // discrete: west towers of a church-like template (M8 (e)): the cathedral 2 at the west corners, a church 0–1 at the west end
  crossingTower: number;             // continuous chance of a tower over a template's transept crossing (M8 (e))
  gateTower: number;                 // continuous chance that a closed or U plan's front range takes a gate tower when a tower is drawn (V02 §3.5 M8 (c))
  turret: number;                    // continuous chance of one stair turret in a re-entrant corner
  backRange: number;                 // continuous chance of a back range (rows, houses, cottages)
  backLenM: [number, number]; backWidthM: [number, number];
  hipShare: number;                  // continuous chance that a range's roof is hipped rather than gabled (blocks are always hipped; towers by shape: WingRoleRow)
  gableToStreetMaxFrontM: number;    // continuous: a single range turns its gable to the street where the frame's frontage is below this
  arcade: boolean;                   // discrete: the main range's ground storey is an open arcade (a market hall; V02 §3.5 M11, V02 §5.1)
  cupola: { chance: number; kinds: { dome: number; tip: number; pyramid: number } };   // continuous: a roof ornament at the main range's ridge midpoint (M12)
  dormer: { perTenM: number /* dormers per 10 m of usable eave */; widthM: [number, number]; kinds: Record<DormerKind, number> /* weights */; entranceGable: number /* chance */ };
  porch: Record<PorchKind | 'none', number>;   // continuous weights; V02 §3.7 filters them by the space in front of the door
  secondaryPorch: number;            // continuous chance of one hood at a side, rear or yard entrance (V02 §3.7); 0 by default, calibrated under FM
  rooms: { hall: boolean /* discrete */; hallLenShare: [number, number]; chapel: number /* chance */; gateHallM: [number, number] };   // read at the OCCUPANTS' band (V02 §3.2 step 3); hall and chapel emitted only by V02 §3.8's rule
  floors?: [number, number];         // a role row's own storey range, overriding the template's `floors` for that slot (a one-storey cloister gallery); absent: the template's
  hearths: [number, number];         // decorative chimneys before a plan exists (§8.10)
  coverageMax: number;               // continuous: the massing's footprint area as the most share of the slot hint's area (a ring leaves its court)
  claimShare?: [number, number];     // second revision (V2C-49 (3)): present → M10's band is claimShare × area(H), replacing the template's footprint (the stepped rows, the `arena` row); absent on a row whose template's footprintM2 is "the claim's" → the constants claimLo / claimHi (0.35, 0.6); read by slotBand (V02 §3.5 M10)
  caveaM?: [number, number];         // second revision: `ovalCourt` only — the seating ring's depth across, drawn uniformly (the `arena` row; V02 §3.5 M5)
}
interface MassingFamilyRow {         // supersedes the base's PathShapeRow (item 221): Fantasy Manor's five families keep their rows (P21) under our ids, ours are added
  family: MassingFamilyId;
  minFrameW: [number, number];       // the least frame (along the frontage, into the plot) in wing widths, for feasibility (V02 §3.5 M3)
  wings: [number, number];           // the range of ranges the family lays before blocks split them (towers and blocks apart); M13 checks the laid count against it
  closed: boolean;                   // a closed ring: the footprint has a hole, the court
  joints: 'butt' | 'mitre' | 'either';   // M13 checks every joint the family laid against it
  fantasy: boolean;                  // true for 'regularCourt', 'starCourt', 'chordArc': the owner's "fantasy as toggles" (D-7); their weight is scaled by the `fantasyShapes` option (V02 §3.10)
  sides?: number[]; sideWeights?: number[];   // 'regularCourt': the side counts and their weights; 'starCourt': the corner counts
  chords?: [number, number];                   // 'chordArc': the least and most chords
  gridCells?: number;                          // 'gridWalk': cells per side
  provenance: string;
}
interface WingRoleRow { role: WingRole; storeyDelta: [number, number]; roofKinds: { kind: RoofSpec['kind']; weight: number }[]; hipInset: number /* a hip roof's ridge-end inset as a share of the span (0.5: equal pitches); ranges 0.5, blocks 0.5 by default and 0.25 under FM (V02 §5.2 step 2) */; through: number /* priority at a butt joint: the higher runs through (V02 §3.5 M5) */; dormers: boolean; porch: boolean /* read by V02 §3.7: a porch only on a wing whose role admits one */ }
interface MassingGrowthRow {         // the mutator's family lattice (V02 §3.9): how a target family is laid around the kept ranges of a source family
  from: MassingFamilyId; to: MassingFamilyId;
  keep: 'all' | 'main' | 'mainAndOne' | 'none';   // which kept ranges seed the target's path
  anchor: 'front' | 'rear' | 'either';            // where the kept main range sits in the target path
}
interface TowerShapeRow { shape: 'round' | 'square' | 'octagon'; sides: { maxRadiusM: number; n: number }[] /* bracket: the polygon's side count by radius */; roof: 'cone' | 'pyramid'; pitch: number /* rise over radius */ }
interface PorchKindRow { kind: PorchKind; depthM: [number, number]; widthM: [number, number]; storeys: number; clearanceM: number /* kept free in front of it */; outside: boolean /* false: recessed inside the footprint */ }
interface DormerKindRow { kind: DormerKind; depthShare: number /* its up-slope depth as a share of the half span */; atEave: boolean; minPitch: number; gapM: number }   // the end margin is the constants row's endMarginM, read by facadeBays (one fact, one place)
interface RoleKeyRow {               // `composition.roleKeys` (V02 §3.10.4): normalises a template structure's name to a composition key
  family: string;                    // a V11 template-family key, or '*' for every family (a family-specific row wins)
  name: string;                      // the structure name as V11 §3.6.1 writes it ('stable', 'stables', 'nave and choir', 'wheel or sails', …)
  key: string | 'yardPart' | 'basement';   // a composition key prefix (a role row, a family row or a class row); 'yardPart': not a building (S11's yard partition owns it); 'basement': held in the cellar (the class's cellar row)
  attach: 'slot' | 'main';           // 'slot': S11 packs it as its own slot, which reads `key`'s row; 'main': S11 packs no slot — the main slot's massing lays it as part of the main building (item 304; V02 §3.5 M8b)
}
interface ClassFamilyRow { cls: string /* a V07 village class key `v.<id>` (V07 §2.4; V11 §2.9) */; key: string }   // `composition.classFamily` (V02 §3.10.5): the composition key prefix of each of V07's `v.` village classes, the one source of their keys (J-V7.82); `scope` withdrawn by reconciliation round 2 (J-V2.96)
// HeightsRow: V11's (V11 §2.8, table 'heights', keyed by template family), read unchanged, with the three columns item 427 adds — attic: boolean, parapetCm: Cm, towerStoreyCm?: Cm — whose values V11 §3.6.4 writes once; V02 §3.10.6 states only their reading rule. This volume declares no heights row of its own (J-V2.33).
interface CompositionConstantsRow { key: 'constants'; cells: Record<string, TableCell> /* the named constants of V02 §3.10.9's table, each a §7.6 cell */ }
interface CompositionTables { rows: CompositionRow[]; families: MassingFamilyRow[]; roles: WingRoleRow[]; growth: MassingGrowthRow[]; towers: TowerShapeRow[]; porches: PorchKindRow[]; dormers: DormerKindRow[]; roleKeys: RoleKeyRow[]; classFamily: ClassFamilyRow[]; constants: CompositionConstantsRow; version: string }   // composition.json
```

### 2.4 Derived at read (never stored)

```ts
type RoofEnd = 'gable' | 'hip' | 'party' | 'mitre' | 'valley' | 'wall' | 'open';   // V02 §5.2: resolved per wing end from the joints and heights
interface RoofFacet { wing: number /* wing key, or a tower's */; ring: PointCm[]; z: number[] /* cm above the building's lowest base, per vertex */; normal: [number, number, number]; part: 'roof' | 'dormer' | 'porch' | 'tower' | 'cupola' }
declare function roofscape(b: Building, c?: Composition): RoofFacet[];           // V02 §5.2: planar, non-overlapping, covering the footprint (and a porch outside it)
declare function resolveEnds(b: Building): Map<number /* wing key */, [RoofEnd, RoofEnd]>;
declare function facadeBays(w: BaseWing, side: number /* any ring side; an eave side is the ring side of eave 0 or 1 (below) */, bayM: number): { atCm: Cm; widthCm: Cm }[];   // V02 §3.7: every side since reconciliation round 1; integer centimetres only (its valley reaches computed by §6.5's arithmetic, never read from the float roofscape); implemented in @plat/plots beside massStepped, stairTreads and cryptSeedWings, re-exported by @plat/buildings (item 505)
declare function dormerPositions(w: BaseWing, row: DormerRow, obstacles: Polygon[]): { atCm: Cm }[];
declare function cryptSeedWings(b: Building): number[];   // V02 §3.14.5 (c): the wing keys whose ground storeys seed a crypt's ring; exported by @plat/plots beside massStepped; called by §2.6's basement function (item 238, item 226)
```

**Eave sides.** A wing's two eave sides are the ring sides parallel to its ridge: for `ridgeAxis 0` (the ridge joins
the midpoints of sides 1 and 3) sides 2 and 4, for `ridgeAxis 1` sides 1 and 3; `eave: 0` is the one that comes first in
ring order. A `polygon` wing has no eave sides (no dormers).

### 2.5 Identity and lifecycle of every state field

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `BaseWing.role` | the massing at S11; the mutator's add step; `setMassing` (`addRange`, `addTower`, `addBlock`, `backRange`) | composer, mutator, roofscape, exports, anchors | leaf digest | Regenerate (keep) re-derives the same; New random on the plot re-draws it with the plot's reroll (§6.1) | the event's undo record keeps the former wings | the base carries it from M1 (item 216): the base outline builder writes `main`, `range` or `part`; for a document without it, the **fallback migration row** below |
| `BaseWing.key`, `Building.nextWingKey` | as `role`; a new key is `nextWingKey`, which then advances | as `role`; edit paths | leaf digest | as `role` — generation keys 0 … n − 1 in wing order (V02 §3.5 M13) | restored with the wings; `nextWingKey` restored to its former value | as `role` |
| `Building.massing` | S11 (the massing); `setMassing` `family`; the mutator (`family` and `row` of the target) | mutator, `deriveEntrances`, exports, reader | leaf digest | as above | restored | an older document keeps its value; one from before stage 3 has none and reads as `baseOutline` until an `upgrade` re-derives S11 (§7.5; a declared shift, §13.3) |
| `MassingRef.segments`, `.low`, `.cupola` | M5 (`segments`, `low`), M12 (`cupola`); every `setMassing` op and the mutator rewrite them | the parity harness, the report, the why provider (`segments`); V03's byre end (`low`); the roofscape, the paint programs and the exports (`cupola`) | leaf digest | re-derived with the massing (the same draws) | restored with `Building.massing` | a `MassingRef` without them reads `segments` = the range-role wing count with each block's pieces re-joined, `low` absent, `cupola` absent until an `upgrade` re-derives S11 |
| the crypt lift (the ground-storey `baseCm` of the ground wings over the basement's ring, raised form; V02 §3.14.5) and **the half cellar's raise** (the ground wings over a `half` basement's ring, `cellar.depthCm ÷ 2`; a basement that is only a crypt, the wings over the crypt's ring — reconciliation round 1; item 226) | M11, when §2.6's basement function takes the crypt ladder's `raised` form; the basement step when the gate chooses `half` (the gate reading the datum without the raise) | `deriveBase`'s successors, the heights, the plan's floor levels (V03's choir stairs, V03 §3.3's datum), the dig floor, the roofscape, the casters | leaf digest (it is those wings' `Heights.baseCm`) | re-derived with the basement after a `setMassing`, a designation mutation or a terrain change; kept by `deriveBase` and `rebaseStack` (1) on every re-basing path while the basement stays `half` (T-V2-52) | restored with the wings | a document without it re-derives the basement on load for an `always`-crypt building (V03's migrate row, item 238); a document whose half basements lack the raise gains it at its next `upgrade` — the one-time shift of J-V2.91, reported |
| `BaseWing.partName` (V03's item 234) | the base outline builder's templates; passed through by M0 (d) | M8 (e), `cryptSeedWings`, V03 (A5 (e)), the why provider | leaf digest | kept on the wing that keeps its key by every V02 writer (V02 §2.1; a re-joined block keeps the lowest key's); absent on a wing V02 adds | restored with the wings | V03's row (V03 §2.5) |
| `RoofSpec.kind 'shed'`, `RoofSpec.high` | massing M12; `setAttr` | roofscape, exports | leaf digest | as above | restored | none before stage 3 |
| `BaseWing.arcade` | M11 (the row's `arcade`); `setAttr(wings/<key>/arcade)` | the drawing, the exports, the capacity function | leaf digest | re-derived with the massing | restored | absent before stage 3 (no arcade) |
| `Composition.secondaryPorch` | the composer (V02 §3.7); `setComposition` `porch` with `entrance` | roofscape, drawing, exports | lazy; stored with the composition | as the porch | restored | by the entrance ordinal; an entrance that no longer exists orphans it (§7.3 item 4), reported |
| `Composition.row`, `.grammar` | the composer | the elaboration record's slices; migration | lazy; stored with the composition when an edit stores it | a stale rung re-derives from committed state (V02 §3.11) | restored with the composition | a stored composition whose `grammar` is older keeps its stored fields; its unstored parts re-derive under the new grammar at the next click |
| `Wing.base` | the composer (1:1 with non-tower base wings) | roofscape, plan rung, exports | lazy / stored | re-derived; a stored one is re-matched by key when the wings change (V02 §3.9) | restored | a key that no longer exists orphans the composed wing (§7.3 item 4), reported |
| `Wing.dormerRows`, `DormerRow.edited` | the composer; `setComposition` `dormers` (sets `edited`) | roofscape, the plan rung, exports | lazy; stored (the first `setComposition` stores the composition, V02 §4) | an unedited row re-derives on the wing's own stream; an edited row is kept while its eave's length stays within ± 10 %, else orphaned and reported | the undo record keeps the former row | by the wing's key |
| `Porch.kind` | the composer; `setComposition` `porch` | roofscape, drawing, exports | lazy / stored | as dormer rows; side and offset re-read from the main entrance after every carry (the base's rule 3) | restored | — |
| `ComposedTower.base` | the composer (one per tower or turret wing) | plan rung (round wings), roofscape | lazy / stored | follows the tower wing | restored | by key |
| `Composition` as a whole | the `wings` rung (and `rooms` with the plan) | §8.6, the plan rung | the elaboration cache (non-canonical, §2.9); model data once stored | stale → re-derived at the next click (V02 §3.11) | an edit's undo restores the former composition, or removes it when that edit stored it (J-P48 (5)) | §7.5's orphan rule for stored parts |

**The fallback migration row** (a document whose buildings carry no stage-3 fields — from before item 216 reached M1):
each wing's `key` = its index in `Building.wings`; its `role` by the base outline builder's rule — `main` for the first
rectangle (the bar of an L or T) or a row quad, `range` for the other rectangles, `part` for a template or axis-locked
part; `nextWingKey` = the wing count; `massing` absent (read as `baseOutline` with `segments` 1 until an `upgrade`
re-derives S11, a declared shift, §13.3); footprints, heights and roofs unchanged; the canonical order (V02 §2.1) then
holds because the base builder lays no tower. The index-named fields of item 225 need no rewrite: key = index.

**Identity.** A base wing's address is its building's with its key — the sub-record address `('wing', building, key)` —
and it is matched after a re-derivation by the anchor rule of item 346 (role, then the ridge midpoint within 0.5 m in
the building's frame). A composed wing, its dormer rows and a composed tower are addressed through the base wing key
they name; the porch by the building; the composer's rooms by the base's `room:<building>/<level>/<i>` (§2.6, §6.3).
No record here stores a stream key or a seed (the base's §2.4).

### 2.6 Stacked tiers and deck buildings — the records (item 110 (c), (d); item 110 fold)

Item 110 adds no entity kind. A tier, a shrine and a stair are base wings — sub-records of their `Building` (the base's
sub-record rule) — whose new fields say what they stand on and whether they are solid; a building on a deck is an
ordinary building whose `BuildingInput` names its deck. Units as V02 §2.

```ts
// BaseWing (§2.6), as amended by item 227: two fields added
interface BaseWingStackFields {
  on?: number;    // persisted; the key of the wing this wing stands on — its floor is that wing's deck level (deckLevel below):
                  // tier k ≥ 1 names tier k − 1, the shrine the top tier, stair k ≥ 1 the tier on whose terrace its foot stands;
                  // absent: the wing stands on the ground (every wing of every family but `stepped`). Written by the massing
                  // (V02 §3.15 ST7), the `tiers` op (V02 §4.6) and the mutator's stepped rows (V02 §3.15.5); never re-pointed after
                  // minting except by those writers; read by deriveBase (item 370), storeyRange, the capacity (item 371), the
                  // roofscape's occlusion and order (V02 §5.6), the carry check (item 333), the exports and V03 (X18)
  solid?: true;   // persisted; a solid mass with no interior — a stepped pyramid's rubble tier, every stair: Heights.floors 0 and
                  // its eaveCm its top above its baseCm; no storey, room, dormer, porch or capacity. Written by the massing (ST4,
                  // ST5; the `ovalCourt` seating ring, M5), the `tiers` op and the mutator (cleared when `stepped → single` keeps a solid tier 0 as a storeyed range,
                  // V02 §3.15.5); read by storeyRange, the capacity, M11, the composer, V03 (no rooms), the exports
}
// MassingRef (V02 §2.1) gains one field (item 217's MassingRef)
interface MassingRefStackFields {
  stack?: {                                   // persisted; present exactly when MassingRef.family is 'stepped'
    shape: 'rect' | 'round' | 'octagon';      // the tiers' plan shape (ST1)
    stairs: 'axial' | 'flights' | 'internal' | 'none';   // the stair form laid — after ST3's fallback, so it may differ from the row's;
                                              // 'none' (second revision, V2C-47 (2)): a sealed stack, lawful only where tier 0 is solid,
                                              // never a row value, reached only by an edit's bend (V02 §4.6)
    lowerRoof: 'flat' | 'pent';               // every tier's roof but the top's, as laid (a tier's own roof may differ after a setAttr, V02 §4.6)
    top: 'flat' | 'shrine' | 'roofed';        // the top tier's form
    insetCm: Cm;                              // the drawn step d (ST1), which the `tiers` op re-uses
    grade: number;                            // second revision (V2C-49 (5)): the drawn stair grade (rise ÷ run), which the `tiers` op re-uses
    truncated: number;                        // tiers drawn but not laid for want of room (ST3), reported
  };
}
// CompositionRow (V02 §2.3) gains one cell group (composition.json; item 110 (c)'s "composition rows (V02)")
interface TierCells {                         // present exactly on a row whose families include 'stepped' (V02 §3.15.4's load check)
  count: [number, number];                    // continuous: tiers laid, the top one included (≥ 2); drawn uniformly on the integers
  shape: { rect: number; round: number; octagon: number };   // continuous weights
  aspect: [number, number];                   // continuous: the clamp of a rect tier 0's width along the frontage ÷ its depth — the laid aspect
                                              // is the drawn stack's own proportion clamped into this range (ST2; J-V2.86), never drawn
  insetM: [number, number];                   // continuous: the step — how far each tier stands in from the one below on every side
  solid: 'all' | 'lower' | 'none';            // discrete: every tier solid (a stepped pyramid, a ziggurat), tier 0 only (a platform
                                              // under storeyed tiers), or none (a terraced palace, a tiered tower)
  solidHeightM: [number, number];             // continuous: a solid tier 0's height; tier k's × taper^k
  tierFloors: [number, number];               // continuous: a storeyed tier 0's storeys; tier k's × taper^k, rounded stochastically, ≥ 1
  taper: number;                              // continuous: each tier's height as a share of the one below's
  lowerRoof: 'flat' | 'pent';                 // discrete: a walkable terrace (flat, with the family's parapetCm) or a pent skirt rising
                                              // to the tier above (a tiered tower's eaves)
  top: { flat: number; shrine: number; roofed: number };     // continuous weights: the top tier's form
  shrine: { floors: [number, number]; insetShare: [number, number]; roofs: { kind: RoofSpec['kind']; weight: number }[] };
  stairs: 'axial' | 'flights' | 'internal';   // discrete: one straight chain up the front, flights along the faces, or none outside
                                              // (the sealed form 'none' is never a row value — edits only, V02 §4.6)
  stairWidthM: [number, number];              // continuous
  stairGrade: [number, number];               // continuous range: a flight's rise ÷ run, drawn uniformly by ST1, its upper end
                                              // at most the constant stairGradeMax (1.3)
  heights?: { storeyGroundCm: Cm; storeyUpperCm: Cm };   // second revision (V2C-48 (4)): read only where no class's HeightsRow is
                                              // passed — a ruin's call (V04) — and only for a shrine's storeys; `stepped-monument` 350 / 300
}
// the construction's contract (V02 §3.15.1; split by the second revision, J-V2.80) — all four exported by @plat/plots
declare function massStepped(input: BuildingInput, row: CompositionRow, band: BandRead, k: Kernel): KernelResult<{ wings: BaseWing[]; massing: MassingRef }>;
  // the massing's stepped branch, every step that decides the bytes: V02 §3.4's frontage frame (steps 1–2), slotBand, ST0, drawTiers on
  // `massing` creation indices 8–9, layTiers, ST8, M14's attempts on `massing/attempt=a` (drawTiers re-run on them), then the single
  // fallback (ST8), then the base outline builder's rectangle. The base outline builder calls it from M3a (item 229), stage 3's M5 from
  // M6a; T-V2-46 compares its output. V04 never calls it (no budget, no attempts for a ruin)
declare function slotBand(input: BuildingInput, row: CompositionRow, band: BandRead): { lo: number; hi: number; cap: number };   // m²: M10's band and cap (V02 §3.5 M10), one formula for M3, ST0, ST8 and M10
declare function massOval(input: BuildingInput, row: CompositionRow, band: BandRead, k: Kernel): KernelResult<{ wings: BaseWing[]; massing: MassingRef }>;
  // second revision: the `ovalCourt` branch (V02 §3.5 M3, M5, M11–M13), exported beside massStepped so the base outline builder
  // (from M3a, the second fixture's arena) and stage 3's M5 (from M6a) lay the same bytes
declare function drawTiers(cells: TierCells, storeys: { groundCm: Cm; upperCm: Cm }, s8: Rng, s9: Rng): TierDraws;   // ST1: its two draw groups on the caller's two streams
declare function layTiers(input: TierInput): TierLay | TierFailure;          // ST2–ST7: pure — no draw, no budget, no stream
interface BandRead { band: string; value: number /* the manifested band and value, significance-shifted (V02 §3.2 step 3) */ }
interface TierInput {
  frame: { origin: PointCm; u: [number, number]; v: [number, number] };   // the frontage frame: u along the frontage, v inward, origin Rr's near front corner
  region: { W: Cm; D: Cm };                   // the fit rectangle Rr's width and depth
  scale: number;                              // ST8's size factor on tier 0 (1 at the first lay)
  cells: TierCells;                           // the row's cells at the building's band value (V02 §3.2 step 3)
  storeys: { groundCm: Cm; upperCm: Cm };     // the class's HeightsRow storeyCm (massStepped, the tiers op, the mutator) or TierCells.heights (V04)
  pitch: number; parapetCm: Cm; plinthCm: Cm; // M11's one pitch rule; the family's parapet; §2.6's plinth (a ruin passes 0 and 0)
  draws: TierDraws;                           // what drawTiers drew (or, for the `tiers` op, the values it resolved without a draw)
  anchor?: PointCm[];                         // anchored mode (V02 §3.9 W3, the `tiers` op): tier 0's ring is given — four corners (a kept range's
                                              // BaseWing.corners, V2C-64 (3)) or a regular ring — and not laid
  forms?: ('axial' | 'flights' | 'internal' | 'none')[];   // the stair forms to try in order; absent: the row's form, then ST3's fallback order
}
interface TierDraws {
  n: number; shape: 'rect' | 'round' | 'octagon'; insetCm: Cm; top: 'flat' | 'shrine' | 'roofed'; stairWidthCm: Cm;
  grade: number;                              // second revision: drawn in `stairGrade` (no aspect draw: ST2 derives it, J-V2.86)
  tiers: { heightCm: Cm; floors: number }[];  // per tier in order: floors 0 for a solid tier; heightCm without any parapet (ST4 adds it)
  shrine?: { floors: number; insetShare: number; roof: RoofSpec['kind'] };
}
interface LaidWing { ring: PointCm[]; kind: 'rect' | 'polygon'; role: 'tier' | 'shrine' | 'stair'; on: number | null /* index in the lay's order */; solid: boolean; floors: number; eaveCm: Cm; ridgeCm: Cm; roof: RoofSpec }
interface TierLay { wings: LaidWing[] /* ST7's order */; stairs: 'axial' | 'flights' | 'internal' | 'none' /* the form laid */; aspect: number /* the laid tier-0 aspect (a rect stack) */; truncated: number; entrance: { wing: number; side: number } | null /* ST7's hint, by index */ }
interface TierFailure { kind: 'noSecondTier' | 'check'; step: 'ST3' | 'ST6'; detail: string }   // second revision: ST3's forms exhausted, or an ST6 check failed
// BuildingInput (§2.6), as amended by item 305: one field added
interface DeckContext {                       // written by S11 from the plot's deck record (item 110 (d), the base's deck plots); absent on every other plot
  host: Id;                                   // the Bridge (§2.7) or the pier / quay way (§4.8) whose deck carries the plot
  kind: 'bridge' | 'pier' | 'mole' | 'quay';  // item 110 (d)'s hosts (a jetty is a pier); a raised way's deck carries no plot (J-V2.71)
  surfaceCm: Cm | null;                       // the deck's walking surface in terrain cm: Bridge.deckCm, or the pier's, mole's or quay's deck height
                                              // (§4.8) — read by the datum step (item 370). null exactly for a quay platform built on the bank
                                              // (fill behind a quay wall): that is ground — the terrain datum, the ordinary basement gate and a
                                              // dig floor — while `kind 'quay'` keeps the @deck rows and the deck budget (second revision, V2C-66 (1)).
                                              // A Bridge of kind 'ford' or 'draw', or with no deckCm yet, offers no deck plot (X28), so no
                                              // DeckContext names one
  landmark: boolean;                          // a placed landmark (a mole-head or mid-mole tower or fort): its class's own rows, no deck budget;
                                              // copied by S11 from the deck-plot record's `landmark` flag (X28, the coherence pass; V2C-66 (6))
}
// the deck budget V02 reads — V11's table `deck`, keyed by deck kind × band (X16); V02 declares no row of its own
interface DeckBudgetRead { footprintM2: [number, number]; maxFloors: number }
```

**Derived at read (never stored; exported by `@plat/plots`, built at M3a-V2):**

```ts
declare function deckLevel(w: BaseWing): Cm;   // w.baseCm + w.eaveCm, less the family's parapetCm when w's roof is flat: the floor a wing standing on w has
  // — exact because ST4 adds the parapet to every flat-roofed tier's eave, solid or storeyed, so
  // deckLevel(x) = x.baseCm + x's drawn heightCm for every tier
declare function rebaseStack(b: Building, ground: (p: PointCm) => Cm /* levelledGroundCm(doc, key, ·) on the building's document and arena key (V05's item 309; item 370, item 231), never the raster's TerrainSampler */): void;
  // second revision (J-V2.81): the building-level datum pass for a building with a wing standing on another — (1) the ground
  // wings by §2.6's terrain rule as item 370 words it (every sample by `ground`) (a deck's surface, a kept user base, item 231's wall-side sample, the crypt lift, the half
  // cellar's raise — item 226, reconciliation round 1, S23-10); (2) every wing with
  // `on`, in stack order (each after the wing it stands on), baseCm = deckLevel of its support; (3) every stair's ridgeCm re-set to its
  // true rise and `stairSteep` re-tested (V02 §3.15.2); (4) Building.heights by the envelope rule, `floors` included. Every path that
  // re-bases a wing of such a building calls it instead of the per-wing step (item 370), passing `ground` built from its own
  // document and the arena key the building's plot lies on
declare function storeyRange(b: Building, w: BaseWing): [number, number] | null;
  // the storey levels a wing reaches: null for a solid wing; [0, floors − 1] for a storeyed wing on the ground (the base's reading);
  // for a storeyed wing with `on`: [t, t + floors − 1], t = next(on), where next(x) = storeyRange(b, x)[1] + 1 for a storeyed x,
  // next(x.on) for a solid x with `on`, and 0 for a solid x on the ground — so a shrine on a solid pyramid is storey 0, and the
  // tier above a two-storey tier 0 starts at storey 2. Towers, turrets and every other wing: the base's reading, unchanged
declare function stairChain(b: Building): { stair: number; from: number | null; to: number; head: number }[];
  // per stair wing in key order: `from` the wing on whose terrace its foot stands (null: the ground), `to` the tier whose top it
  // reaches, `head` the ring side at its high end (RoofSpec.high); empty for the `internal` and `none` forms and for every other family
declare function landingSide(b: Building, w: BaseWing): number | null;
  // for a storeyed wing with `on`: the side of its ring nearest the head of the stair that arrives on the terrace it stands on
  // (for `axial`, its front side; for `flights`, the side the last flight's head abuts); null for the `internal` and `none`
  // forms — the side where V03 opens its landing door (X18) and, on a solid stack, roots the plan (item 230)
declare function stairTreads(w: BaseWing): { n: number; goingCm: Cm };
  // reconciliation round 1 (J-V2.90): the one tread law of a stair wing (role 'stair') — n = ⌈rise ÷ riserMaxCm⌉
  // equal risers (rise = w.ridgeCm, its true rise, which rebaseStack (3) keeps; riserMaxCm 20 cm), goingCm = ⌊run ÷ n⌋ (run = the plan
  // distance from the ring side opposite RoofSpec.high to the side `high`, the flight's climb), by §6.5's integer arithmetic; the k-th
  // riser's top at ⌊k × rise ÷ n⌋, the head tread taking the run's remainder (run − n × goingCm). Exported by @plat/plots (the M3a
  // per-wing constructions draw treads, item 419). Read by stairFlight (n − 1 tread lines, V02 §5.6), the glTF, OBJ and CityJSON stair
  // solids (V02 §5.6), V01's stair-flight hatch (V01 §5.1.2) and V03's exterior flights (V03 §5.1; its own goingCm stays for
  // interior stairs). A flight with rise 0 has n = 0 and no treads (a ramp)
```

**Identity and lifecycle.**

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `BaseWing.on` | ST7 (the massing); the `tiers` op; W6 (stepped → stepped) | as its declaration above | leaf digest | re-derived with the massing by the same draws; a `tiers` edit's result is a fixed input of later S11 runs (the base's pin of edited wings) | restored with the wings | absent on every document before the fold: every wing on the ground — byte-identical (T-V2-50) |
| `BaseWing.solid` | ST4 and ST5; the `tiers` op (its `solid` field); cleared by `stepped → single`; the `ovalCourt` seating ring (M5) | as above | leaf digest | as `on` | restored | absent before: every wing storeyed |
| `MassingRef.stack` (with `grade`, and `stairs 'none'`) | ST7 through `massStepped`; rewritten by every `tiers` op, bend and stepped mutation | the `tiers` op, the why provider, exports | leaf digest | as the massing; a `tiers` edit's stack is a fixed input of later S11 runs (the base's pin of edited wings) | restored with `Building.massing` | absent before (no `stepped` family existed); **the stack migration row** (second revision, V2C-48 (2)): a stepped building whose `MassingRef` lacks `stack` (or `stack.grade`) re-derives it at load from its wings — `shape` from tier 0's kind and vertex count (4 → rect, 8 → octagon, else round), `stairs` from the stair wings (`axial` when stair 0's ring is centred on tier 0's centre line, `flights` when it runs along tier 0's face, none with tier 0 storeyed → `internal`, none with tier 0 solid → `none`), `lowerRoof` from tier 1's roof (`flat` → flat, else pent), `top` from the top wing (a shrine → shrine, flat → flat, else roofed), `insetCm` the least ring offset of tier 1 in tier 0, `grade` stair 0's rise ÷ run (none: the row's central grade), `truncated` 0 — the one-time shift reported |
| the `tiers` op's fields (`count`, `insetCm`, `top`, `stairs`, `stairWidthCm`, and since the second revision `shape`, `lowerRoof`, `solid`, `shrineInsetShare`, `centre`, `radiusCm`) | the op; its bends (V02 §4.6) | the re-lay | the event log; the wings and the stack are model data | as V02 §4.4's `setMassing` row | the former wings and `MassingRef.stack` | by the building's address and wing keys |
| the Works heights of a stack | `heightsAt` in stack order (item 318) | §8.4, §11.1, V06 | derived, never stored | per stage | — | — |
| `ovalCourt` wings | the massing; `setMassing family` | as any wing | leaf digest | as the massing | as any wing | none (a new family; the `arena` row's grammar bump is a declared shift for arenas only) |
| `BuildingInput.deck` | S11, per call, from the plot | M1, M10, M11, the datum step, the basement gate, the dig floor | never stored — an input resolved at each call, as `layer` is | re-read at every S11 run on a deck plot | — | — |
| a stacked wing's `Heights.baseCm`, a stair's `ridgeCm`, the stack's envelope (`Building.heights`, `floors` included) | `rebaseStack` (item 370 as extended by the second revision) on every re-basing path — S11, a `setMassing` commit, a tier's height edit, §7.3 (a) 4's terrain operator, §7.4's warp and `moveVertex`, the carry's rule (2), the crypt lift, a deck's re-base | as every wing's; casters, exports, V03, V05 | leaf digest | re-derived by `rebaseStack`, never per wing; a `setAttr` of a stacked wing's `baseCm` bends to its support's height (V02 §4.6) | restored with the wings | none (no stacked wing before the fold) |
| a deck building's `Heights.baseCm` | the datum step from `DeckContext.surfaceCm` | as above | leaf digest | re-derived when the deck's height changes (the deck's re-base, item 370) | restored | none |

**Wing roles (the `WingRoleRow` defaults for the three new roles, V02 §3.10.9's list extended).** `tier`: storeys from
`TierCells` (no `storeyDelta`), through 6 (tier 0 runs through at stair 0's butt joint), dormers no, porch yes (a storeyed
tier 0's main door), hipInset .5, **roofKinds** `flat` 1, `hip` 1, `pyramid` 1, `cone` 1 (ST4 picks by the tier's place
and shape; W5's "first allowed kind" is `flat`); `shrine`: storeys from `TierCells.shrine`, through 0, dormers no, porch
no, roofKinds the kinds of `TierCells.shrine.roofs` (default `hip` 1, `pyramid` 1, `gable` 1); `stair`: floors 0, roofKinds
`shed` 1, through 0, dormers no, porch no.

## 3 Generation

### 3.1 Where stage 3 runs

| step | when | where | eager / lazy | output | stream |
|---|---|---|---|---|---|
| the **massing** (`outline()`) | S11, once per building, inside the block's batch (§4.7 S11), and inside every operator that re-derives S11 on a plot — Regenerate, New random, a designation mutation's add step (V02 §3.9), `build`, `fill`, a terrain or water operator's re-fit (§7.3) | the derivation pool (or the generation worker), `@plat/buildings` | **eager** — model data | `Building.wings` with roles and keys, `Building.massing`, `nextWingKey`; then S11's base steps (insertion and first carry, `deriveBase`, `deriveEntrances`, the basement decision, the yard partition, the households fill) | `massing` (V02 §3.12) |
| a **`setMassing` commit** (V02 §4.2) | the event's fold | where the event folds | eager | the edited wings as S11's fixed input, then S11's base steps as above | none for the geometric ops; the `family` op on `siteplan.mutate` (V02 §3.12) |
| the **composer** (`compose(…, 'wings')`) | the `wings` rung: a neighbourhood click (II.4), a building click when `wings` is absent or stale, a visible tile **at the neighbourhood band or finer** under `elaborate: 'view'` (§4.1; the district band draws the massing's roofscape, which needs no composition, and requests nothing — V02 §6.2), an export that asks for compositions (V02 §5.5) | the derivation pool | **lazy** — the elaboration cache until an edit stores it | `Composition` with composed wings, towers, dormer rows, the porch | `compose.dormers`, `compose.porch` |
| the **rooms** rung (`compose(…, 'rooms')`) | only as the plan rung's input, on the building click that derives the plan (J-V2.9) | the derivation pool | lazy | `Composition.rooms`: hall, gate hall, chapel, tower rooms | `compose.rooms` |
| the **roofscape** | every draw of a building at the district band and finer; the surface layer; 3-D exports | the tile worker (drawing), the generation worker (exports) | derived at read | `RoofFacet[]` | none (no draws) |
| the **wing step of the designation mutator** | every designation change (§4.7 S11 steps 1–7) | where the causing event folds | eager | the recorded wing steps | `siteplan.mutate` (the base's) |

**Registration.** `@plat/buildings` registers `ComposedBuildingGenerator` under the id `composed` in
`StrategyRegistry.building` (§14); from stage 3's landing the recipe's building strategy defaults to `composed` for new
documents, and a document keeps the strategy its recipe names (§7.5). The generator's `plan()` delegates to the
registered plan implementation (V03). **Under the `MFCG` and `FTG` parity presets the massing takes the family
`baseOutline` for every class** — the one option cell `massing.composed` (`extension: { over: 'both', mode: 'option' }`,
on by default) is off there — so the parity presets keep the base outline builder's footprints byte for byte (T-V2-26)
and §13.5's MFCG and FTG rows are unaffected.

### 3.2 The row a building reads, and its band

1. **Class.** S10b's class-mix draw (item 71) or the assignment's `shapeClass` gives the class; the slot's structure
   gives the slot role (§4.7 S11). A clandestine front's building reads the front's row (item 63 (4)); the concealed use
   adds nothing to the massing or the composition (its rooms and door are the plan's and the entrance set's). Four owner
   rules of 2026-09-28 decide which class a building composes as (V02 §3.14):
   * **split works-and-shop sites** (item 105 (h)): a building whose use has `branchOf` composes as the class's
     `split.shop` template family, the works building as its `split.works` family (V11 §2.3's `split`);
   * **ladders** (item 108): a COUNT, QUARTER or GUILD member is an ordinary building of the lesser class
     (`LadderStepRow.memberClass`); a GUILD's hall composes as the `hall` family; a SIZE building composes as the greater
     class with `sizeFactor` in M10;
   * **custom institutions** (item 104): the class DR24 resolved from the custom record's scene archetype, category,
     tags or fallback (V11 §3.13.2), composed like any class of that id;
   * **subsumption** (item 104 (h) (5), item 108): a subsuming kind's building takes the subsumed kinds' structures as
     extra slots (V02 §3.14.2).
2. **Row key — the resolution chain (stated once; J-V2.34).** The chain stops at the first key whose row exists and
   satisfies the arrangement law for the compiled template's `arrangement` at this band (V02 §3.10.7); a row that exists
   but breaks the law is skipped and reported at load (`arrangementSkip`, T-V2-33).
   * *The main slot* (the template's first required structure):
     1. `DesignationTemplateRow.composition` (item 426), when the template names one;
     2. `<class>/<band>` — a class override row (V02 §3.10.3);
     3. for a `v.` class (V07 §2.4): `composition.classFamily[<v. key>]` (V02 §3.10.5; reconciliation round 2, S23R1-06 —
        a town class at a village rung plays its `villageForm`'s `v.` class, V11 §3.22, and never reaches this step by
        its town id);
     4. `<templateFamily>/<band>` — `BuildingClassRow.templateFamily` (V11 §2.3; V11 must read "read by S11's composition
        resolution (V02)" instead of "not read by any stage": a cross-volume item, V02 §13);
     5. `default.<arrangement>/<band>` (V02 §3.10.6).
   * *Any other slot* `structures[i]`:
     1. `structures[i].composition` (item 426);
     2. `<key>/<band>` where `key` is `composition.roleKeys[(templateFamily, name)]`, else `[('*', name)]` (V02 §3.10.4) —
        a key naming a family or class row reads that row (an outbuilding `house` reads `dwelling-detached`);
     3. `outbuilding/<band>`.
   * A structure whose role key is `yardPart` or `basement` has no building and never reaches `outline()`; one whose
     `attach` is `main` is laid by the main slot's massing (M8b) and has no slot of its own (item 304).
   * **The underground layer.** When the plot lies on the underground layer — II.7.3's sewer-front plots, II.7.5's
     undercity, item 109 (j) (4)'s cavern and ruin dwellings — `@underground` is appended to the resolved key, and the
     `<prefix>@underground/<band>` row is read where it exists, else `default.underground/<band>`. The layer reaches
     `outline()` as `BuildingInput.layer` (item 303), written by S11 from the plot's layer.
   * **Decks (item 110 (d); item 110 fold).** When the plot lies on a deck (`BuildingInput.deck`, item 305) and is not a
     placed landmark, `@deck` is appended to the resolved key: the `<key>@deck/<band>` row is read where it exists, else
     `default.<arrangement>@deck/<band>` (V02 §3.16). A landmark reads its class's chain unchanged; a deck plot is never on
     the underground layer.
   The key reached is written to `MassingRef.row` and `Composition.row`, so the why provider and the report name it.
3. **Band.** Every geometry cell of the row (families, widths, lengths, blocks, towers, roofs, dormers, porch,
   hearths, coverage — item 31's geometry columns) is read at the plot's **manifested** band and value (§4.11's floor
   rule: `max(field band, geometryFloor)`); continuous cells interpolate between the band rows' centres along the value
   (§4.5's interpolation), discrete cells switch at the cut (item 19; J-A19.43). The district's band range (item 72,
   §4.5 (5)) clamps the value first. **The `rooms` cells are the exception: they are read at the occupants' band** — the
   plot's `fieldBand` and the current field value, as the programme is (J-A19.43) — because the composer's rooms are the
   interior's, which reads who is there (item 28 (f); V02 §3.8; J-V2.36).
   **Significance.** For every geometry cell and M10's budget, the value is shifted by `0.5 × bandWidth × log2(σ_use ÷
   σ_class)` before interpolation — `σ_use` the use's resolved significance (§4.5 (1): V11 §3.13's ×2 for a landmark and
   the `economicWeight` factor 0.5–2 included), `σ_class` the class row's — clamped to at most one band's width up and
   never below the plot's own value (a significance below the class's never shrinks a building). So a landmark custom
   guildhall composes one band richer than an unmarked one (T-V2-38; J-V2.43).
4. **Scale and drift.** Every length cell is multiplied by the district's `buildingScale` (§2.5); an assignment's
   `DriftBounds` (V02 §2.1) filters `families` and roof kinds and clamps the footprint target and the floors.
5. **Presets.** The document's preset resolves each cell by §7.6's order; the building-scope `FM` preset (item 376)
   resolves only the cells that carry a `presets.FM` entry — `composition.json`'s (V02 §3.10.8) and V11 §3.24.0's
   item-110 chance and offer cells (0) — and sets `fantasyShapes` on; it zeroes no `extension` cell and changes nothing
   else.

### 3.3 The massing families — the vocabulary of plans

| family | historical type (12th–15th-century Western Europe, the design's centre of gravity, D-7) | construction (V02 §3.5 M5) | joints | wings | closed | source |
|---|---|---|---|---|---|---|
| `single` | the one-range house: hovel, cottage, open-hall house, warehouse, chapel nave | one range along the frontage (eaves to the street), or across it with its gable to the street where the frontage is narrow | — | 1 | no | own |
| `L` | a range with a wing back into the plot (a street range with a kitchen or shop range behind) | front range through, one side range abutting it | butt | 2 | no | own |
| `T` | a hall with one cross-wing (a solar or service end) | the cross-wing runs through the hall's end, reaching forward and back | butt | 2 | no | own |
| `H` | a hall with two cross-wings (the late-medieval hall house of a gentleman or merchant) | two cross-wings through both ends | butt | 3 | no | own |
| `U` | three ranges round a yard, open to the rear (a street range with two back ranges) or to the front (a forecourt before the hall) | a through range and two abutting arms | butt | 3 | no | own |
| `cross` | a cross-shaped hall or institution (a main range crossed at its middle; NG's cross plans, C2) | a main range and one cross slab through its middle; `WingRoleRow.through` decides which runs through | butt | 2 (3 pieces) | no | own |
| `rectCourt` | the courtyard house, the courtyard inn, the college court | four ranges round a rectangular court; the front range is the `gate` range | butt | 4 | yes | Fantasy Manor's rectangle family (P21), fitted; our id |
| `plotRing` | the urban courtyard house that follows an irregular plot | four to eight ranges along the plot's boundary inset by half a wing width | mitre | 4–8 | yes | own — the realistic reading of Fantasy Manor's irregular closed plan |
| `gridWalk` | the accreted house: ranges added over time along a winding line | a self-avoiding walk on a grid fitted to the plot | butt | 1–8 | no | Fantasy Manor's grid-walk family (P21), fitted; our id |
| `towerHouse` | a tower house with an attached range; a tower mill; a bottle kiln; a polygonal chapter house | a square, round or octagonal tower mass at a front corner with an optional range (none where the row's `rangeLenM[1]` is 0) | butt / overlap | 1–2 (+ tower) | no | own |
| `regularCourt` | the regular polygonal court (chapter houses, fantasy manors) | a regular 4-, 5-, 6- or 8-gon ring, one side parallel to the frontage | mitre | 4–8 | yes | Fantasy Manor's regular family (P21) — `fantasy`; our id |
| `starCourt` | the irregular star-shaped court of fantasy manors | four to six corners at jittered radii inside their sectors | mitre | 4–6 | yes | Fantasy Manor's irregular closed family (P21) — `fantasy`; our id |
| `chordArc` | a curved range of equal chords | the first chords of a regular polygon, its convex side to the street | mitre | 2–7 | no | Fantasy Manor's open-chain family (P21) — `fantasy`; our id |
| `row` | a row house, a shopfront, a warehouse front | the row arrangement's clipped quads, unchanged, plus an optional back range | — | 1 (+ back) | no | the base (§4.7 S11) |
| `template`, `axisLocked`, `baseOutline` | churches, cathedrals, cloisters, castles; the parity presets; the last fallback | the base outline builder's constructions (§2.6), unchanged, plus M8 (e)'s west and crossing towers and M8b's attached structures | as built | as built | as built | the base |
| `shelter` | a tent, a shack, a lean-to | the cluster packer's structure, unchanged | — | 1 | no | the base (§4.7 S11, item 70) |
| `drawn` | a footprint drawn by hand | one wing: `rect` if the ring passes §3.8's near-rectangle test, else `polygon` with a `skeleton` roof | — | 1 | — | the base (§7.1) |
| `stepped` | the stepped temple, the ziggurat, the terraced palace, the tiered tower; an ancient ruin's stepped monument | `massStepped` / `layTiers` (V02 §3.15.1): tiers stacked by `on`, each inset from the one below, stairs up the faces, a flat, shrine or roofed top | tier 0 and stair 0 butt; the rest stacked | 2–9 tiers (+ stairs, shrine) | no | item 110 (c); own |
| `ovalCourt` | the amphitheatre: an arcaded outer wall of storeys round solid seating banks and an open floor, entered by gate passages at the ends of its long axis | two concentric rings of mitred `quad` slabs on an elliptical chord polygon (V02 §3.5 M5): an outer storeyed façade ring and an inner `solid` seating ring, sharing their vertices; the hole is the floor | mitre | 24–40 (two rings of 12–20) | yes | own (not fantasy: J-V2.84) |

**Our ids for the reference's families (J-V2.47).** `regularCourt`, `starCourt`, `chordArc`, `rectCourt` and `gridWalk`
are our own names; the base's item-59 `PathShapeRow` ids map to them through item 221's table-migration row, applied
before M6 ships any document, so no reference routine name survives in a table, an export or a document.

**Fantasy shapes are a toggle (J-V2.5).** The three `fantasy` families carry weights in the `manor`, `hall`, `tower` and
`mage_tower` rows, multiplied by the view-independent model option `fantasyShapes` (a recipe parameter with its
§7.8 control-registry row, item 402; **off by default**, the owner's "realism in the base, fantasy as toggles", D-7) —
off, they are never drawn; on, at their row weights; the `FM` preset sets it on with Fantasy Manor's equal weights.

### 3.4 Fitting to the plot — the frame and the region

The massing works inside the **slot hint** `H` (`SlotPlan.hint`, §2.5): the region S11's site plan gives the slot,
already behind the front-line recession (item 43) and the template's setbacks, inside the plot and clear of every
other slot. Nothing the massing makes leaves `H` (T-V2-1), so nothing leaves the plot or reaches a way.

1. **The frontage direction.** `f` is the unit direction of the longest access segment among those the slot's
   `entranceOn` names (the street for a front slot; the court or the path from the plot's gate for a set-back slot;
   the passage or court for a hidden plot's), ties by segment index; its length by `sqrt` only. `n`, the inward normal,
   is `f` turned a quarter turn toward `H`'s area centroid. The frame is (`u` along `f`, `v` along `n`), origin at the
   access segment's first end; coordinates are dot products (§6.5's `+ − × ÷ sqrt`).
2. **The fit rectangle.** `Rr = lir(H, (f, n))` (§3.4's largest inscribed rectangle on the given axes): width `W` along
   `u`, depth `D` along `v`, its **front** the side nearest the access segment. Rectilinear families are laid inside
   `Rr`; `plotRing` follows `H` itself (M5); the fantasy families fit in the ellipse inscribed in `Rr`.
3. **The wing width** `w` is drawn in the row's `wingWidthM` and clamped: `w ≤ D` (a single range across `u`), `w ≤ W`
   (across `v`), `w ≤ (min(W, D) − courtMinM) / 2` for a closed family; a family for which the clamped `w` falls below
   `max(0.8 × wingWidthM[0], 3 m)` is infeasible (M3).
4. **Orientation is the frontage's** (item 59, KEEP OURS), never a random angle; the fantasy families' phase puts one
   side parallel to the frontage and nearest it. Two realism laws of a row's `axis` cell replace the frontage direction
   for their classes (M2; J-V2.41): `fallLine` (a longhouse's range runs down the slope, its byre end downhill — V07's
   hard rule) and `water` (a watermill's or a landing's long side parallel to the water it works).
5. **Rows are already fitted.** A row arrangement's quads are `plot ∩ frontage band` (§4.7 S11) and arrive as
   `fixedWings`; only the back range is laid (M9), inside the **back region**: the plot ∩ the band behind the quad's rear
   chain, of depth `max(0, coverage × plotArea ÷ frontage − rowDepth)` (`coverage` the template's, `rowDepth` the quad's
   mean depth along `n`), clipped to `H` — so the template's coverage and its rear yard hold.

### 3.5 The massing — `outline()`, step by step

`outline(input, k)` is **the add step of V02 §3.9 from the empty design** (the base's "one path", §4.7 S11 step 7): a
generation run and a later mutation lay wings with the same functions. Inputs: `BuildingInput` (the slot hint, the
access segments, the context vector, the class, the drift, `fixedWings` for a row or a cluster structure, the terrain
sampler, the resolved row key and bands, the layer and the attached structures of item 303 and item 304). Output:
`KernelResult<{ wings: BaseWing[] }>` plus the `MassingRef` S11 writes with them. Constants are named in the row or in
the constants table (V02 §3.10.9); every draw is on the `massing` stream with the step's creation index (V02 §3.12).

* **M0 — pass-throughs.** (a) *Row:* `fixedWings` (one quad, or stepped quads on a slope) are returned unchanged with
  role `main` and keys in their order; M9 may add a back range; M11–M12 give heights and roofs; the entrance hint is
  `null` (the base's rule 1 puts the door on the flush front); `segments` 1. (b) *Shelter:* the cluster packer's structure
  arrives as one fixed wing (item 303): role `shelter`; roof `tent` for a tent (a `polygon` ring), `shed` for a lean-to
  with `high` on the side against its host wall, `gable` or `shed` for a shack by the row's weights. (c) *Drawn:* V02 §3.3's
  `drawn` row. (d) *Institutions:* a row whose drawn family is `template` or `axisLocked` runs the base's construction
  (§2.6) and labels its parts `part` (a template part that is a tower in the template's own rows takes `tower`); M8 (e)
  adds its west and crossing towers, M8b its attached structures (a church porch), M11–M12 as below. (e) *`baseOutline`:*
  the base's rectangle, L or T (§2.6), roles `main` and `range`. (f) *Underground:* an `@underground` row (V02 §3.2 step 2)
  lays `single` with a `flat` roof and nothing more; volumes 4 and 5 own the vaults around it.
* **M1 — the row.** V02 §3.2.
* **M2 — the frame.** By the row's `axis` (discrete; J-V2.41):
  - `frontage` (the default): V02 §3.4 steps 1–2 — `f`, `n`, `Rr`, `W`, `D`.
  - `fallLine`: the terrain sampler's gradient at `H`'s area centroid (central differences at ± `axisSampleM` 2 m, the
    base's sampler, §2.3) gives the slope `s` and the downhill unit direction `g`. Where `s > axisSlope` (3 %; own, V07's
    longhouse rule), the frame is `u = g`, `v = g` turned a quarter turn toward the access segment's side, `Rr =
    lir(H, (u, v))`, its front the `Rr` side nearest the access segment; the main range is laid **along `u`** (for
    `single` the "along" mode whatever the frontage), and its downhill end (the ridge end with the larger `u`) is written
    to `MassingRef.low`. Where `s ≤ axisSlope`, the `frontage` frame.
  - `water`: the nearest edge of a water face (§2.7's water bodies and carved channels, including a mill's leat) within
    `axisWaterM` (50 m; own) of `H`'s centroid gives `u` along that edge; `v` points away from the water; `Rr =
    lir(H, (u, v))`, its **water side** the `Rr` side nearest the edge; the main range's long side is laid on the water
    side. With no edge within reach, the `frontage` frame. In both non-frontage frames the entrance hint (M13) is the main
    range's long side nearer the access, kept by `entranceHintMinCos` like any hint (an access-less side is `null`, and the
    base's entrance rule decides).
* **M3 — feasibility.** For each family of the row with weight > 0 (after `fantasyShapes`, the drift's `families` and
  `massing.composed`), with `w₀ = max(0.8 × wingWidthM[0], 3 m)`:
  1. *Geometry:* `W ≥ minFrameW[0] × w₀` and `D ≥ minFrameW[1] × w₀`, and, for a closed family, `W − 2w₀ ≥ courtMinM` and
     `D − 2w₀ ≥ courtMinM`. The default `minFrameW` (in wing widths, along × into): `single` 1.2 × 1; `L` 2 × 2; `T` 2.4 × 2;
     `H` 3.4 × 2; `U` 3 × 2.2; `cross` 3 × 3; `rectCourt` 3 × 3; `plotRing` 3 × 3; `gridWalk` 2.6 × 2.6; `towerHouse` 1.2 ×
     1.2; `regularCourt`, `starCourt` 3.2 × 3.2; `chordArc` 2.6 × 1.6; `stepped` ST0's test instead (V02 §3.15.1);
     `ovalCourt` its own test: with `c₀ = caveaM[0]` and `c = courtMinM`, the least ellipse `b₀ = w₀ + c₀ +
     c/2`, `a₀ = 1.15 × b₀` (the least axis ratio), feasible when the longer side of `Rr` is at least `2a₀` and the shorter at
     least `2b₀`.
  2. *Budget (J-V2.35):* the family's **least footprint** `Amin` (closed form, at `w₀`, the row's least lengths and
     `courtMinM`; `f₀ = crossWing.fwdM[0]`, `b₀ = crossWing.backM[0]`, `c = courtMinM`, `gap₀ = max(walkGapM, 0.3w₀)`):
     `single` 1.2w₀²; `L` 3w₀²; `T` 2.4w₀² + w₀(f₀ + b₀); `H` 3.4w₀² + 2w₀(f₀ + b₀); `U` 5w₀²; `cross` 5w₀²;
     `rectCourt` S² − (S − 2w₀)² with S = max(2w₀ + c, 3w₀); `plotRing` (c + 2w₀)² − c²; `gridWalk` w₀(w₀ + gap₀);
     `towerHouse` 1.44w₀², plus w₀ × max(1.5w₀, rangeLenM[0]) where `rangeLenM[0] > 0`; `regularCourt` and `starCourt`
     2n·tan(π/n)·(c/2 + w₀/2)·w₀ with n the least side count of weight > 0; `chordArc` chords[0] × 1.5w₀²; `row`,
     `template`, `axisLocked`, `baseOutline`, `shelter`, `drawn` — no test; `stepped` ST0's `Amin` (V02 §3.15.1);
     `ovalCourt` `π(a₀b₀ − (a₀ − w₀ − c₀)(b₀ − w₀ − c₀))`. The family is **infeasible when `Amin > 1.1 ×
     hi`**, `hi` `slotBand`'s upper target for this slot (M10).
* **M4 — the family.** One draw (creation index 0) over the families feasible by both tests, weights renormalised;
  ties in weight keep the row's order. Where some families pass the geometry test but none the budget, the one with the
  least `Amin` is taken without a draw and reported (`overBudgetFamily`; M10 then shrinks it). No family passing the
  geometry test → M14's ladder from rung 2.
* **M5 — the path and the slabs**, in the frame, lengths in cm; `u₀` and `v₀` are `Rr`'s near corner and front; `w` is
  drawn (creation index 0, after the family) and clamped (V02 §3.4 step 3); every length cell is drawn uniformly in its
  range (creation index 1, in the order the family's paragraph names its draws). **The sunlit choice (item 102 (d);
  J-V2.38):** where a family draws a coin between two mirror options — the `L`'s arm end, the `T`'s cross-wing end, the
  `U`'s opening (front or rear, its base chance `uOpenFront`), the `towerHouse`'s corner — each option has an **open
  vector** `o` (the `L`: from the arm toward the front range's free end; the `T`: from the cross-wing toward the hall's free
  end; the `U`: `−v` for a forecourt, `+v` for a rear court; the `towerHouse`: from the tower toward its range's far end),
  and its weight is multiplied by `sunBias` when `o · sunDir > 0.25`, by `1 − sunBias` when `o · sunDir < −0.25`, and left
  as it is otherwise, then renormalised; `sunDir` is the plan direction of the noon sun — `(0, −1)` (south, `+y` north,
  §2.1) where the settlement's latitude (§8.4 `Sun.latitudeDeg`, the value item 102's sampler reads) is positive, `(0, +1)`
  where it is negative, none at 0. `sunBias` is 0.7 (own, `extension`) and 0.5 in the `MFCG`, `FTG`, `VG` and `FM` presets (reconciliation round 4,
  SCC-85: each zeroing preset carries its entry, since the zeroing's 0 would weight every sun-facing option by 0), where
  the coin is byte-identical to the unbiased one; orientation by the frontage (or the row's axis) is never changed.
  - `single`: if `W < gableToStreetMaxFrontM` and `D ≥ W`, the range runs **across** the frontage (gable to the street):
    length `L = clamp(rangeLenM, 1.2w, D)`, the slab `[u₀ + (W − w)/2, u₀ + (W + w)/2] × [v₀, v₀ + L]`; otherwise **along**
    it: `L = clamp(rangeLenM, 1.2w, W)`, the slab `[u₀ + (W − L)/2, u₀ + (W + L)/2] × [v₀, v₀ + w]`. Under the `fallLine`
    and `water` axes always along `u`.
  - `L`: front slab `[a, a + Lf] × [v₀, v₀ + w]` with `Lf = clamp(rangeLenM, 2w, W)`, `a = u₀ + (W − Lf)/2`; a coin (left
    or right end) and `Ls = clamp(rangeLenM, 2w, D)`; the side slab `[end − w, end] × [v₀ + w, v₀ + Ls]` (right) or
    `[a, a + w] × …` (left). The front slab runs through (role `main`), the side abuts it (role `range`).
  - `T`: `fwd`, `back` from `crossWing`; hall slab `[a, e] × [v₀ + fwd, v₀ + fwd + w]` (role `main`); cross slab
    `[e, e + w_c] × [v₀, v₀ + fwd + w + back]` (role `cross`, `w_c = w`), `e − a = Lh = clamp(rangeLenM, 1.4w, W − w)`,
    `a` centring the whole in `W`; a coin puts the cross-wing at the left or the right end. Needs `fwd + w + back ≤ D`,
    else `fwd` and `back` shrink proportionally to fit, and the family fails M3 when they reach 0.
  - `H`: as `T` with a cross slab at each end; the hall between them; `Lh + 2w ≤ W`.
  - `U`: a coin with `uOpenFront` decides the opening; `Lf = clamp(rangeLenM, 3w, W)`, `Ls = clamp(rangeLenM, 2w, D)`.
    *Open to the rear:* front slab `[a, a + Lf] × [v₀, v₀ + w]` (through, `main`), arms `[a, a + w]` and `[a + Lf − w, a +
    Lf]` × `[v₀ + w, v₀ + Ls]` (`range`). *Open to the front (a forecourt):* back slab `[a, a + Lf] × [v₀ + Ls − w, v₀ +
    Ls]` (through, `main`), arms from `v₀` to `v₀ + Ls − w`; the entrance hint then names the back range's side facing the
    frontage, across the forecourt.
  - `cross`: main slab `[a, a + Lm] × [c − w/2, c + w/2]` with `Lm = clamp(rangeLenM, 3w, W)`, `c = v₀ + Lc/2`; the cross
    slab `[a + (Lm − w)/2, a + (Lm + w)/2] × [v₀, v₀ + Lc]` with `Lc = clamp(rangeLenM, 3w, D)`. The main range runs
    through (role `main`); the cross slab is laid as two pieces abutting it on each side (role `cross`, keys consecutive),
    so the family lays three wings in two path segments.
  - `rectCourt`: `Lf = clamp(rangeLenM, max(2w + courtMinM, 3w), W)`, `Ld` likewise on `D`; path order front, rear, left,
    right, so the front and rear slabs run through and the two side slabs abut both; the court is the inner rectangle, at
    least `courtMinM` a side.
  - `plotRing`: `H` simplified toward at most 8 vertices at tolerance `w/4`, **removing only a vertex whose removal keeps
    the simplified ring inside `H`** (the new edge tested against `H`'s ring with `orient2d`, §3.2); each edge's line
    moved inward by `w/2`; consecutive moved lines intersected (2 × 2 solves) give the path `Q`. Rejected (a new attempt,
    M14, which **draws `w` afresh** on `massing/attempt=a`) unless `Q` is simple, every edge ≥ 1.5w, every interior angle
    ≥ `mitreMinDeg` (60°), and `Q` inset again by `w/2` leaves a court every side of which is ≥ `courtMinM`. One slab per
    edge with mitre joints; the edge nearest the access segment is the `gate` range.
  - `gridWalk`: a `g × g` grid (`g = gridCells`, 4) fitted to `Rr` with pitch `p = min(W, D)/g`, required `p ≥ w +
    max(walkGapM, 0.3w)` (else `g` drops by one, to 3, else infeasible); the walk starts on a random cell of the front
    row (the row nearest the frontage); at each step it stops with chance `min(1, walkStop × max(0, segments −
    walkFree))` (`walkStop` 0.12, `walkFree` 0; own — the walk may stop after its first segment and is certain to stop
    only at nine; the `FM` values calibrated at M6c against the reference's segment distribution, V02 §7.4), else tries the
    unvisited in-bounds neighbours in an order drawn once per step and takes the first; collinear steps merge. A walk
    that cannot move from its start cell yields `single`. One slab per segment; at each turn the earlier segment runs
    through.
  - `towerHouse`: a coin (left or right front corner) and the tower's shape by `towerShape`; a square tower is a `rect`
    slab of side `t = clamp(1.2w … 2w)` at that corner (role `tower`, roof `pyramid`); a round one a `polygon` ring of
    radius `t/2` there (role `tower`, roof `cone`); an octagonal one an 8-gon of circumradius `t/2`; where the row's
    `rangeLenM[1] > 0` an attached range (role `main`) of length `clamp(rangeLenM, 1.5w, W − t)` runs along `u` from the
    tower (square: abutting it, butt; round or octagonal: overlapping it by `0.35 × t/2`, as M8's attachment). With no
    range the tower is the whole building (a tower mill, a bottle kiln, a polygonal chapter house).
  - `regularCourt` (fantasy): side count by the row's `sides` weights; circumradius `R = (min(W, D) − w)/2 × U(0.8, 1)`;
    centre at `Rr`'s centre; vertices at `R` and angles `θ₀ + 2πk/n` by `dmath` (§6.5) with `θ₀` putting one side parallel
    to `f` and nearest the frontage; mitre joints.
  - `starCourt` (fantasy): corner count by weights; each corner's radius `R × U(0.55, 1)` and angle `θ₀ + (k + U(0.25,
    0.75)) × 2π/n`; mitre joints; rejected (M14 attempt) when an interior angle is below `mitreMinDeg`.
  - `chordArc` (fantasy): `k` chords by `chords`, the polygon order `m = U{k + 1 … 8}`; the first `k` chords of a regular
    `m`-gon, scaled so the chain's bounding box fits `Rr` less `w/2` on every side, its convex side toward the frontage;
    mitre joints; free ends square.
  - `stepped`: **`massStepped`** (V02 §3.15.1) — the one exported function the base
    outline builder also calls from M3a — which runs this frame, `slotBand`, ST0 (M3 for `stepped`), `drawTiers` on creation
    indices 8–9, `layTiers` (ST2–ST7), ST8 (M10 for `stepped`) and the stepped attempts (M14 for `stepped`, on
    `massing/attempt=a`) itself and returns the wings and the `MassingRef`. Its ST4 gives the wings' heights and roofs (M11
    and M12 are not run on them, and no cupola is drawn), ST6 and ST7 its checks, keys and hint (M13's); M7–M9 lay nothing
    (no block, tower, turret or back range). Of M8b's attached structures an `absorbed` one adds its budget share and lays
    nothing; any other is dropped and reported (`attachedDropped`).
  - `ovalCourt` (own) — **`massOval`**, exported by `@plat/plots` beside `massStepped` and called
    by the base outline builder from M3a (the second known-city fixture's arena, item 229) and by this step from M6a, so
    both builders lay the same bytes; it runs this frame, `slotBand`, M3's `ovalCourt` test, the construction below, M11's
    and M12's `ovalCourt` rules and M13's checks, falling to `rectCourt` (from M6a; the base's court-institution
    construction at M3a) when they fail: `w` drawn at creation index 0 as for every family (the façade's width);
    then at creation index 1, in this order, the major semi-axis factor `U(0.85, 1)`, the axis ratio `ρ = U(1.15, 1.4)` and
    the seating depth `c = U(caveaM)`. The major axis runs along the longer side of `Rr` (`L`; the shorter `S`), centred in
    `Rr`: `a = L/2 × factor`, `b = a ÷ ρ`; where `2b > S`, `b = S/2` and `a = min(L/2, b × ρ)`. The side count `n` by the
    constants' bracket `ovalSides` on the mean semi-axis `(a + b)/2`: 12 below 10 m, 16 below 20 m, 20 above (own). The
    **outer polygon** `P0`: `n` vertices at parametric angles `θᵢ = π/n + 2πi/n` on the ellipse (by `dmath`), so the chords
    `(n − 1, 0)` and `(n/2 − 1, n/2)` are centred on the major axis. **`P1`**: each edge line of `P0` moved inward by `w`,
    consecutive lines intersected (2 × 2 solves, as `plotRing`); **`P2`**: each edge line of `P1` moved inward by `c`, where
    `c` is first clamped to at most `b − w − courtMinM/2` (the floor keeps its least width) — a clamp below `caveaM[0]` is
    the M3 failure it was tested against, an M14 attempt. **Wings:** façade `i` = the quad `(P0ᵢ, P0ᵢ₊₁, P1ᵢ₊₁, P1ᵢ)` and
    seating `i` = the quad `(P1ᵢ, P1ᵢ₊₁, P2ᵢ₊₁, P2ᵢ)`, ring-ordered so sides 1 and 3 are the mitred ends and sides 2 and 4
    the eaves (M5's oblique-slab rule: the joints are the edge lines' intersections, every shared point one vertex, §2.6
    rule 1); the façade wings role `range`, storeyed, `arcade` where the row's `arcade` is on; the seating wings role
    `range` and **`solid`**; the hole inside `P2` is the court — the arena floor, typed `court` like any hole (item 303's hole sentence, built at M3a).
    **Gates:** the major-axis chord nearest the access is the **main gate** — its façade wing takes role `gate`, and its
    seating wing is laid **storeyed** (one floor, the gate passage through the seating to the floor) with role `gate`; the
    opposite major-axis chord's façade wing takes `main` and its seating wing is the second passage (`gate`, one floor).
    The entrance hint is M13's rule on the main gate's façade wing (its outer side). No block, tower, turret or back range
    (M7–M9 lay nothing). `segments` = `2n`.

  **Slabs from a path (oblique families).** For segment `i` from `pᵢ` to `pᵢ₊₁` with unit direction `dᵢ` and left normal
  `nᵢ`, the two long sides are the lines at `± w/2`; at a joint the corners are the intersections of the neighbouring
  segments' side lines (the mitre line runs through the path vertex); at a free end the corners are square. Segments
  whose interior angle is ≥ 178° merge first. The slab is a `quad` wing: ring order corner(start, left) → corner(start,
  right) → corner(end, right) → corner(end, left), so sides 1 and 3 are the ends (mitre or square) and sides 2 and 4 the
  eaves; `ridgeAxis 0` (the ridge joins the ends' midpoints — for a mitred end, the path vertex). **Rectilinear
  families** produce `rect` wings directly; at a butt joint the wing whose role has the higher `WingRoleRow.through`
  runs through (ties: the earlier in the path), the other ends on its side.

  **The `main` range of a closed family.** In `rectCourt`, `plotRing`, `regularCourt` and `starCourt` the range opposite
  the gate — the one whose midpoint has the largest component along `+v`, ties by length, then by path order — takes role
  `main` (`through` 2); the front range keeps `gate`. The hall, its court door and the chapel's end read it (V02 §3.8).

  **The segment count.** After collinear merging and before M7, `segments` = the path's segment count (`single`,
  `towerHouse` and the pass-throughs 1; `T` 2, `H` 3, `cross` 2; a closed ring its edge count); M13 writes it to
  `MassingRef.segments`.
* **M6 — (merged into M5).** The joints are part of each family's construction.
* **M7 — blocks.** For rectilinear families (and the `gate` range of a `plotRing`), `k` = an integer drawn in
  `blocks` (creation index 2). Candidates, each with a weight: the midpoint of a range ≥ 3w long (1, or 2 on the `main`
  or `gate` range); the free end of a range (1); the outer corner of a butt joint (1.5 on a closed family, 1 otherwise).
  Draw candidates by weight without replacement; for each, draw the block's length along its host `lb = w × U(1, 1.6)`
  and depth across it `db = w × U(1, 1.4)` (it stands proud of the host by `(db − w)/2` on each side). Accept when the
  block lies inside `H`, keeps 1 m from every accepted block and tower, and leaves each remaining piece of its host at
  least `max(w/2, 2 m)` long (a shorter piece is absorbed into the block by extending it to the host's end). Accepted,
  it **splits its host** into up to two pieces with the host's role (new keys, M13) — `rect` pieces of a `rect` host;
  of a `quad` host (a `plotRing` gate range), `quad` pieces, each keeping the host's mitred end and ending square on the
  block — and itself becomes a `rect` wing of role `block`, aligned with its host's eave (for a `quad` host, the eave
  side's direction at the block's centre); at a corner it replaces the corner square, both hosts ending on its sides. The
  pieces and the block tile the union, so the pairing (§2.6 rule 4 (ii)) holds; the vertices a piece's end puts on the
  block's side are the block's too (§2.6 rule 1), recorded in its `corners`. **A block's roof is always `hip`** (item 59,
  ADOPTED; J-V2.3), its ridge along the longer of `lb`, `db`, its ridge ends inset by `WingRoleRow.hipInset` × its span.
* **M8 — towers (the collision set holds the wings, item 59).** `k` drawn in `towers` (creation index 3); a tower's
  shape by `towerShape`. Candidate spots and weights: (a) every convex corner of the wings' union where two ranges meet,
  and each free corner of a range — weight 2 on `rectCourt`, `plotRing`, `U` and the fantasy closed families, 1
  otherwise; (b) the midpoint of each free end (weight 1); (c) the midpoint of the `gate` or `main` range's street side,
  only with chance `gateTower`; (d) **a tower on a block** — the centroid of each accepted block, weight `towerOnBlock`
  (0 by default; calibrated under `FM`, V02 §3.10.8), shape square. Radius `r = w × towerRadiusW`, drawn. For (a)–(c) the
  centre stands outward from the spot by `0.35 r` along the corner's bisector (a) or the side's outward normal (b, c), so
  the tower overlaps the corner it guards. Its ring: `TowerShapeRow`'s side count by radius (round: 12 below 2 m, 16
  below 4 m, 24 above; square 4, aligned with its host wing; octagon 8, one side parallel to its host), vertices by
  `dmath` and snapped. **Accepted only if** (i) the ring lies inside `H`; (ii) the share of its area inside the wings'
  union is in `[0.2, 0.6]` — attached, neither buried nor free-standing; (iii) its centre lies inside no wing deeper than
  `0.35 r` from that wing's boundary — no tower stands through a wing; (iv) it keeps `0.5 m` from every other tower and
  every block; (v) the seed contract (§2.6): every tower vertex lies at least `attractCm` from every wing side it does
  not cross, and every wing vertex at least `attractCm` from every tower side — else the centre moves once by `2 ×
  attractCm` outward and is re-tested. A candidate (d) replaces (ii)–(iv) by: a square of side `min(lb, db) × U(0.5, 0.8)`
  centred on the block, accepted when its ring lies inside the block's ring inset by `towerOnBlockInsetM` (0.3 m) and
  keeps 0.5 m from every other tower; it is **contained** in its block, so the clip order takes it after its container
  (§2.6's containment rule) and its room lies inside the block's piece; M11 raises it until its eave stands above the
  block's ridge. Candidates are tried in the drawn order until `k` are accepted or none remain (fewer accepted is
  reported, never retried). **Stair turret:** with chance `turret`, one turret of radius `U(1.2, 1.8) m` at a re-entrant
  corner of the union (the inner corner of an L, T, H, U or cross), accepted by the same tests with the share band
  `[0.25, 0.75]`; role `turret`. (e) **Template towers** (the `church`, `cathedral` and `cloister` rows, and any
  `template` row whose `westTowers[1] > 0` or `crossingTower > 0`): the **west end** is the free end of the template's
  nave part (`nave`, or the longest part) whose ridge end lies farthest toward world west (`−x`); the count of west
  towers is the attached `tower` or `towers` structure's drawn count where the template lists one (M8b), raised to the
  row's `westTowers[0]` (so a cathedral always has two), else a draw in `westTowers`.
  One west tower is a square of side `w_n × U(0.45, 0.6)` (`w_n` the nave's width) centred on the west end's midpoint and
  standing out by `0.35 ×` its side; two are squares of that side at the west end's two corners, each standing out
  diagonally by `0.35 ×` its side (the cathedral's twin towers). A crossing tower (chance `crossingTower`, where the
  template has a part `crossing`, item 234's names) is a square of the crossing's shorter side less `2 ×
  towerOnBlockInsetM`, contained in the crossing part and taken after it in the clip order. Template towers pass tests
  (i), (iv) and (v) (the west towers also (ii)); a failing one moves inward along its outward line by `attractCm` steps,
  at most 4, then is dropped and reported. Towers and turrets are `polygon` wings (a square tower a 4-vertex `polygon`,
  aligned), **first in the canonical wing order** (V02 §2.1; J-V2.4): §2.6's clip order then takes each tower's piece whole
  and each range less the towers it meets.
* **M8b — attached structures (item 304).** Each structure of the template whose `composition.roleKeys` row says
  `attach: 'main'` arrives in `BuildingInput.attached` with the count S11 drew for it, and is laid here as part of the
  main building:
  - `wheel` (a watermill's wheel housing): a `rect` wing of role `service`, one storey, width `U(2, 3) m`, length along the
    water side `min(the main range's water-side length − 1 m, 6 m)`, centred on that side, reaching from the main range's
    water-side wall to `H`'s boundary on the water side (at most `wheelReachM` 4 m); roof `shed`, `high` against the mill
    house. It needs the `water` axis frame; without a water edge in reach it is laid on the rear side and reported.
  - `sails` (a windmill): no wing — the main slot's family is forced to `towerHouse` with no range (the tower mill; the
    class override `windmill` sets the shape weights), and the sails are a §8.10 decoration (V02 §5.3).
  - `westTower` (a church's `tower`, a cathedral's `towers`): the count M8 (e) reads.
  - `churchPorch` (a church's `porch`): a `rect` wing of role `service`, one storey, width `U(3, 4.5) m`, depth `U(3, 5) m`,
    on the main entrance's side of the nave centred on the door, inside `H`; where it is laid, the entrance hint names its
    outer side and the composer lays no porch there (the door stands inside it, V02 §3.7).
    - `absorbed` (a court institution's `ranges`): no geometry — the count raises the main family's least range count
    (it is the court family's other ranges), and M10's budget for the main slot takes the absorbed structures' shares.
    **On an `ovalCourt`** (an arena's `gate`s; J-V2.88) an absorbed structure raises no
    range count: its budget share joins the main slot's, and the drawn gate count `g` (2–4, V11 §3.6.1) sets the passages —
    the first two are M5's major-axis gate passages; a third turns the seating wing of the minor-axis chord `(n/4 − 1, n/4)`
    or `(3n/4 − 1, 3n/4)` (each centred on the minor axis, `n` a multiple of 4) nearer the access into a one-floor `gate`
    passage by M5's rule, its façade wing keeping its role; a fourth, the other. `massOval` reads `g` from
    `BuildingInput.attached` (2 where absent), so the M3a builder lays the same bytes.
  An attached wing passes M13's checks like any wing; one that fails is dropped and reported, the building kept.
* **M9 — the back range.** With chance `backRange` (creation index 4): the host is the `main` range (for a row, the
  front quad). Its **rear side** is the host ring's side whose outward normal has the largest component along `+v` (away
  from the access), independent of the ridge (J-V2.40): for a row quad side 4 (the rear chain) — on a gable-fronted row as
  on an eaves-fronted one — and for a detached host the side farthest from the access segment. The attaching run is
  that side's longest straight run (for a chain, the longest sub-run whose direction varies by ≤ 5°). Width `wb =
  clamp(backWidthM, 3 m, run − 0.6 m)`; length `lb = clamp(backLenM, 2 m, reach − 1 m)`, `reach` the free depth of the back
  region behind the run (for a row, V02 §3.4 step 5's back region; otherwise `H`). For a row it stands flush against one
  party wall (a coin), for a detached house flush against the side nearer the plot's larger side yard; a `rect` wing of
  role `back`, abutting (butt) the host's rear side, its vertices on that side inserted into the host's ring. Floors: the
  host's less one (at least one); roof `shed` (high side against the host) when `wb ≤ 3.5 m`, else `gable` with the ridge
  along its length.
* **M10 — the size budget (J-V2.35).** `A` = the union's area (the sum of the tiled wings' areas, less the towers'
  overlaps, measured exactly by the kernel's boolean on the arrangement only when towers exist). The slot's target band:
  `[lo, hi] = [p10, p90] × footprintShare_i ÷ count_i × buildingScale × sizeFactor`, where `[p10, p90]` is the
  template's `footprintM2` read at the building's (significance-shifted, V02 §3.2 step 3) value; where the compiled row has
  `p10 = p50 = p90`, `[sizeBandLo × p50, sizeBandHi × p50]` (V11 §3.6.1's derivation ratios, mirrored as
  `sizeBandLo`/`sizeBandHi` = 0.7 and 1.45, fixed — reconciliation round 1, SCC-R0C-3; J-V2.35); `footprintShare_i` the structure's share (V11's role table; absent: the main slot 0.6 when other
  structures are drawn, else 1, and each other slot an equal part of the rest), plus the shares of the structures it
  absorbs (M8b); `count_i` the drawn count of that role; `sizeFactor` the SIZE ladder step's factor (V11
  `LadderStepRow.sizeFactor`, item 108), 1 otherwise. **Claim-sized** (second revision, V2C-49 (3); J-V2.87): where the
  row carries `claimShare`, or the template's `footprintM2` is "the claim's" (V11 §3.6.1's `cathedral`, `cloister` and
  `castle` families, the precinct institutions), `[lo, hi] = claimShare × area(H) × sizeFactor` — the row's `claimShare`,
  else the constants `claimLo`, `claimHi` (0.35, 0.6) — so the precinct the site plan gave the slot sizes the building (a
  stepped temple, a great temple, a palace's courts, an arena); on a deck plot the deck row's band (V02 §3.16 (3)). The band is narrowed by the drift's `areaPct`; the cap is
  `coverageMax × area(H)`. This whole band is one exported function, **`slotBand`** (`@plat/plots`; V02 §2.6), which M3, ST0,
  ST8 and M10 read, so the base outline builder and stage 3 compute it identically.
  1. If `A > 1.1 × min(hi, cap)`: every path length drawn in M5 is scaled by `√(min(hi, cap)/A)`, with each of M5's clamp
     lower bounds lowered to the family's M3 least (so the clamps no longer undo the scale), and M5–M9 re-run once with the
     same draws;
  2. still over: drop the blocks, then the towers;
  3. still over: fall along the **reverse lattice** — `rectCourt`, `plotRing`, `regularCourt`, `starCourt` → `U` → `L` →
     `single`; `H` → `T` → `single`; `cross` → `T` → `single`; `gridWalk`, `chordArc` → `L` → `single`; `towerHouse` → the
     tower alone; `stepped` → `single` (V02 §3.15.1 ST8); `ovalCourt` → `rectCourt` → `U` → `L` → `single` — re-running M5–M9 at each step on `massing/attempt=a`, continuing M14's attempt counter;
  4. at the end of the lattice, still over: accept and report (`overBudget`, by class).
  If `A < 0.9 × lo`: path lengths scale up by `min(√(lo/A), the largest factor that keeps the massing in Rr)` once; still
  under: accept and report (§4.7's `underSize` and JOIN are the mutator's, never the massing's).
* **M11 — heights.** The main floors `fm` = the template's `floors` interpolated along the value, rounded
  stochastically (draw creation index 5: `⌊x + u⌋`), clamped into the template's range and the drift's; each wing's
  floors = `fm` + a draw in its `WingRoleRow.storeyDelta` (a block `blockStoreyDelta`, a tower or turret
  `towerStoreyDelta` above the tallest wing it overlaps), at least 1; all the ranges of one closed or oblique path share
  `fm` (their mitred roofs meet). **Tower storeys:** a tower of a family whose `HeightsRow` carries `towerStoreys`
  (`church`, `chapel`, `cathedral`, `cloister`, `tower`, `castle` — V11 §3.6.4) takes its floors uniformly in that range
  (creation index 5, after `fm`), each of `towerStoreyCm` (item 427; else `storeyCm.upper`). The heights come from the
  building's **`HeightsRow` — V11's, keyed by template family** (V11 §2.8, §3.6.4; J-V2.33): `eaveCm = storeyCm.ground +
  (floors − 1) × storeyCm.upper` (+ `parapetCm` on a flat roof); `ridgeCm` by the roof: gable and hip `eave + pitch ×
  span/2` (`span` the wing's width across its ridge — for a quad the mean length of its two end sides), shed `eave + pitch
  × span` at its `high` side, pyramid and cone `eave + towerPitch × r` (a square's half side), tent `eave + pitch × r`, flat
  `eave`. **One pitch rule (J-V2.33):** a range's `pitch = HeightsRow.roofPitch × (ClimateRow.roof.pitch ÷ pitchRef)`,
  clamped to `[0.3, 1.8]`, where `ClimateRow` is the site's climate row (§4.9, V11 §2.8) and `pitchRef` the
  `temperate-deciduous` row's `roof.pitch` (so a temperate town keeps the family's pitch and a snowy one steepens it);
  towers `TowerShapeRow.pitch`, spires as M12 — never a material's (item 19). A tower's or turret's floors are raised
  further, if needed, until its eave stands at or above the highest point of every wing roof inside its ring (the roof
  plane's height at the overlap's vertices) — a tower on a block above its block's ridge — so a tower always covers what
  it overlaps in plan (V02 §5.2's occlusion rule). A wing that spans a passage keeps the base's two-floor minimum (§2.5
  `Passage`). A wing with the `arcade` flag (the row's `arcade`, on the main range) keeps its storeys; its ground storey is
  open (drawn dashed, exported open, outside the capacity's ground storey; V02 §5.1). **Under a vault** (second revision,
  V2C-67 (2)): on the underground layer, where V04's chamber record gives the host chamber's ceiling (an arch vault's
  soffit under a raised way, X29), the floors are clamped so the eave stays at least `vaultClampCm` (30 cm) below it,
  reported `vaultClamp`. **`ovalCourt`**: the façade ring shares `fm`; each seating wing is `solid`
  (floors 0) with `eaveCm = storeyCm.ground` (the podium round the floor) and `ridgeCm` = the façade's `eaveCm` (the top row
  of seats at the outer wall's top); a gate passage wing has floors 1, the same eave and ridge. `baseCm` is the base's `deriveBase`,
  which S11 calls after the massing (and which the crypt lift of V02 §3.14.5 then raises for the ground wings over the basement's ring — the crypt's seed wings for a derived crypt, seam S23R6-02; for a
  building with a wing standing on another, `rebaseStack`, item 370).
  **The building's `Heights`:** `towerCm` = the highest tower or turret ridge above `baseCm`, absent without one;
  `eaveCm` and `ridgeCm` = the maxima over the other wings. With a wing that stands on another (`BaseWing.on`), the
  stack's envelope of V02 §3.15.2 instead, `floors` included.
* **M12 — roofs.** Range roles: `hip` with chance `hipShare`, else `gable` (one draw per path for a closed or oblique
  path, one per wing otherwise; creation index 6); **where the site's `ClimateRow.roof.form` is `flat`** (an arid town),
  every range, block and back range takes `flat` with the family's `parapetCm` and carries no dormers (`hipShare` then
  applies to nothing); `block`: always `hip` (M7); towers `cone` (round) or `pyramid` (square, octagon), or — with chance
  `towerFlat` (square and octagonal only) — `flat` with the family's `parapetCm` (a battlemented top); **spires:** a tower
  of a family whose `HeightsRow` carries `spireFactor` takes a `cone` (round) or `pyramid` (square, octagonal) spire whose
  rise is `spireFactor × (eaveCm − baseCm)`, stored as the `RoofSpec.pitch` that gives that rise over its radius; `back`
  as M9; `shelter` as M0; `@underground` rows force `flat`. **The cupola** (the row's `cupola`; creation index 7): with
  its chance, a kind by its weights on the `main` range (the longest `main` or `gate` range where several), written to
  `MassingRef.cupola` — a small derived solid at that range's ridge midpoint (V02 §5.2), never in `Heights` and never a
  caster. **`ovalCourt`**: the façade wings `flat` with the family's `parapetCm`, no draw; the seating
  and gate-passage wings `shed` with `high` the side on `P1` (outward), their `RoofSpec.pitch` the rise over the span that
  M11's eave and ridge give. Ridge axis: along the path segment for a range; along the host for a block unless `db > lb`; for a row quad the
  base's rule, made a law of the frontage — `ridgeAxis 1` (gable to the street) with probability
  `smoothstep((gableToStreetMaxFrontM + 1.5 − frontage) / 3)` (own; its share is calibrated to NG's measured 36 % under the
  parity comparison, V02 §7.4).
* **M13 — snap and validate.** Every point snaps by §3.2's placement rule. A ring edge shorter than `minEdge` (25 cm)
  merges its end into its start. Every wing vertex within the hot pixel of another wing's side is inserted into that
  side (§2.6 rule 1). Checks, all exact on lattice points: every ring simple and counter-clockwise; every wing inside
  `H`; the non-tower wings **tile** (the pairing of §2.6 rule 4 (ii)) — in a `stepped` massing the ground wings only, every
  wing with `on` checked by V02 §3.15.1 ST6's containment instead; M8 (v) for the towers; each wing at least 4 m²
  and each side at least `minEdge`; **the laid range count before M7's splits lies in the family's
  `MassingFamilyRow.wings` and every joint is of its `joints` kind** (a structural check of the construction, J-V2.57;
  every family has its row, `stepped` and `ovalCourt` included — V02 §3.10.7's load check, second revision). For
  `ovalCourt`: `P0`, `P1` and `P2` simple and counter-clockwise, every edge at least `minEdge`, `P2`'s least width at least
  `courtMinM`. **Order and keys:**
  towers and turrets (acceptance order), then the ranges in path order (`gate`, else `main`, first), then blocks, then
  the back range, then M8b's attached wings; keys `0 … n − 1`; `nextWingKey = n` — the canonical order of V02 §2.1 by
  construction. `MassingRef.segments` is written from M5's count. **Entrance hint:** the `gate` wing where the family has
  one, else the `main` wing (a church porch's outer side where M8b laid one), and its eave side whose outward normal makes
  the largest positive component along `−v` (toward the access) — the back range's for a forecourt `U`, the square
  tower's front side for a `towerHouse` without a range — kept only if that component is at least `entranceHintMinCos`
  (cos 60°), else `null`. A check that fails is an M14 attempt.
* **M14 — the ladder (F-MASSING, item 328; per building, never whole-map).** Rung 0: attempts 0, 1 and 2 of the drawn
  family (the concern's cap 3), attempt `a` on `massing/attempt=a` (attempt 0 is the first lay); rung 1: each other
  feasible family by descending weight, one attempt each, **continuing the same attempt counter**; rung 2: `single` with
  `w` at `max(0.8 × wingWidthM[0], 3 m)`; rung 3: `baseOutline` — the base outline builder's rectangle in `H`, which the
  base guarantees (§2.6, F-SITEPLAN's ladder above it). Every rung past 0 is counted per class in the generation report;
  no building is refused, and no retry reaches beyond the building.

### 3.6 The composer — `compose()`, the `wings` rung

`compose(input, outline, 'wings', k)` is a pure function of the `wings` rung's recorded inputs (`wingsInputs`, V02 §3.11:
the base wings, the main entrance, the massing reference, the row's slices and the porch's neighbourhood on the plot)
and its own streams (§4.1's contract):

1. **Composed wings and towers, one to one.** One `Wing { base }` per base wing that is not a tower or turret, in key
   order; one `ComposedTower { base }` per tower or turret wing. Ring, heights, roof and spans are read from the base
   wing (V02 §2.2). So the stage-3 contract (as amended by item 223: the union of the composed wings and the composed
   towers' rings equals the outline's union; each composed wing reaches exactly its base wing's storeys) holds by
   construction.
2. **Courts:** the holes of the footprint face, read from its rings (§2.6), in ring order.
3. **Dormer rows** (V02 §3.7), on `compose.dormers`.
4. **The porch and the secondary porch** (V02 §3.7), on `compose.porch`.
5. **Validation (F-COMPOSE, item 328).** Each dormer inside its facet and clear of every valley, hip, tower and block
   (V02 §5.2's regions); each porch inside the plot, clear of every other building, **of the building's own other wings**
   (a stack's stair 0, an attached porch wing) and of every way; failures take V02 §3.13's ladder. Nothing the composer makes is model data until an edit stores it (V02 §4).

### 3.7 Façade bays, dormers, the entrance gable and the porch

**Façade bays (`facadeBays`, the one rhythm every reader shares; item 406).** For a wing and one of its ring sides — every
side since reconciliation round 1 (J-V2.93). **On an eave side** the **usable run** is the side's length less `endMarginM` (1.2 m; the constants row, the only place it lives) at each end,
less the projection onto the side of every tower ring, block and other wing that meets or overlaps it, each widened by
0.6 m, less the reach of each valley that ends on that side — **computed here, in integer centimetres, by §6.5's
arithmetic**: for a wing `X` whose ridge meets the roof of a wing `Y`, `e = ⌊(X.ridgeCm − Y.eaveCm) × Y.halfSpanCm ÷
Y.riseCm⌋` (`halfSpanCm` half of `Y`'s span, `riseCm = Y.ridgeCm − Y.eaveCm`), never read from the float64 roofscape
(J-V2.25), so the bays and the dormer positions are byte-identical on every host (T-V2-13). The run is cut into `nb =
max(1, ⌊run ÷ bayM⌋)` equal bays (`bayM` 3.6 m, own: the rhythm of a timber frame's bays and a masonry front's windows);
each bay is `{ atCm (its centre from the side's first vertex), widthCm }`. **On any other side** of a `rect` or `quad`
wing (a gable end, the free part of a side along a butt joint) the usable run is the side's length less `endMarginM` at
each end, less the projection onto the side of every tower ring, block and other wing that meets or overlaps it, each
widened by 0.6 m — no valley term — cut by the same law, except that a side whose run is not positive has no bay. **On a
`polygon` wing** (a tower or turret, whose sides are facets of one curved wall) the bays are laid round the ring's **free
perimeter** — its boundary less the parts inside, or within 0.6 m of, another wing's ring — each maximal free arc cut into
`max(1, ⌊arc ÷ bayM⌋)` equal bays by arc length (an arc shorter than `bayM ÷ 2` has none), and `facadeBays(w, side, bayM)`
returns the bays whose centres lie on that side (`atCm` along it from its first vertex). It is a pure function of the wing
ring, its neighbours, their heights and one table value — no draw — read by the dormer positions here (eave sides), by the
plan rung's windows on every side (V03's W2: "On every side of every wing, V02's `facadeBays(wing, side, bayM)`";
§2.6 step 6; reconciliation round 3, S23R2-07), by
the lit windows of §8.4 on every side when no plan exists, and by §8.10's decorative chimneys (eave sides; one at a bay
line nearest each end, `hearths` of them).

**Decorative chimneys on exposed roof only (second revision, V2C-55 (1)).** A decorative chimney stands at a bay line of a
host wing's eave, at the point up-slope by half the span. Its host is a storeyed wing whose roof there is exposed: never a
`solid` wing (a stair, a rubble tier, a seating bank), and never a point inside the ring of a wing standing on the host.
On a building with a wing standing on another, the `hearths` are placed on the **top storeyed wing** first (bay lines
nearest each end, alternating), then on the **exposed terrace band** of the storeyed wing below it (its bay lines whose
chimney point lies outside the ring of every wing standing on it), and so down the stack; a count left with no exposed
bay line is dropped and reported (`hearthsDropped`). Every other building keeps the rule above unchanged.

**Dormer rows.** A wing takes dormers only if its role allows (`WingRoleRow.dormers`: `main`, `range`, `cross`, `gate`,
`block`), its roof is `gable` or `hip` (so never under a climate's flat roofs, M12) with `pitch ≥ DormerKindRow.minPitch`
(0.7), and its `HeightsRow.attic` is true (item 427) or it has at least two floors. For each eave side (creation index `2 × key + eave` on `compose.dormers`; `nb` and the run are `facadeBays` of that eave's
ring side):
1. `n = clamp(round(perTenM × run/10 × U(0.75, 1.25)), 0, nb)`.
2. **The entrance gable.** On the eave side of the main entrance, with chance `dormer.entranceGable`: one dormer of kind
   `entranceGable`, width `U(2.4, 3.6) m` clamped to its bay, set in the bay containing the main entrance (counts in `n`).
3. **Kind** of the others by `dormer.kinds`. **A warehouse** (`warehouse` family) puts **exactly one `hoist` dormer** on
   each eave that faces an access edge (its outward normal's component toward the access ≥ `entranceHintMinCos`), in the
   bay nearest that eave's centre; the others by `dormer.kinds`.
4. **Width** `U(widthM)` clamped to `bay width − gapM` (0.4 m).
5. **Positions** (`dormerPositions`, no draw): the `n` bays chosen symmetrically about the run's centre — with `n = nb` all
   of them; otherwise the centre bay first when `nb` is odd, then outward in pairs; an odd remainder on an even `nb`
   goes to the bay on the side of the main entrance, else the first side in ring order. A dormer whose plan-view
   rectangle (its width × `depthShare × span/2` up the slope, set back 0.3 m from the eave for `dormer`, at the eave for
   `wallGable`, `entranceGable` and `hoist`) meets a valley region, a tower ring, the cupola or another dormer is dropped
   (the row's count falls by one, reported).

**Precedence against the plan (V03's dormers).** Before a plan exists, the rows above are the dormers. **Once the
plan rung has derived a plan**, an unedited `DormerRow`'s `count` is the plan's count of top-storey roofed rooms with
exterior demand under that eave (V03 W4), clamped to `nb`, its `kind` and `widthCm` kept and its positions by
`dormerPositions`; an **edited** row (`edited: true`) stays a fixed input that the plan honours (V02 §2.2). So the drawing
never shows a dormer the plan contradicts, and a user's dormer edit always wins.

Dormers never project past the eave line (J-V2.7): Fantasy Manor's projecting cross-gables would leave the footprint and
the plot, which the stage-3 contract and item 59's plot rule forbid; the projecting bay a real building has is a block
(M7), which the footprint shows.

**The porch.** Only on the wing carrying the main entrance, **and only where that wing's `WingRoleRow.porch` admits one**
(`main`, `gate`, `range`, `cross`, `block`; not `tower`, `turret`, `back`, `service` — so a `towerHouse` entered through
its tower, or a church entered through its porch wing (M8b), takes none); side and offset are the main entrance's (the
base's rule 3, re-read after every carry). With `d` = the free distance from the door point along the side's outward
normal to the first of the plot's boundary, another footprint of the plot, or a yard part of kind `footpath` or
`forecourt` edge that reaches a way — measured on the plot's own rings (so the rung reads only its building's plot, V2
§3.11):
* `recessed` is feasible where the host's depth is ≥ `3 m + depthM[0]`;
* `hood` where `d ≥ depthM[0] + clearanceM` (0.3 m);
* `gabled`, `halfRound` and `twoStorey` where `d ≥ depthM[0] + clearanceM`, the side is ≥ `widthM[0] + 0.6 m` long, and
  (for `twoStorey`) the host has ≥ 2 floors.
One draw (creation index 0 on `compose.porch`) over the row's `porch` weights restricted to the feasible kinds and
`none`; width `U(widthM)` clamped to **the free part of the side** — the part on the footprint's boundary that no other
wing of the building abuts (item 228's part; a stack's stair 0 or a church porch wing covers the rest) — less 0.6 m
; depth `U(depthM)` clamped to `d − clearanceM` (outside) or to
the host's depth less 3 m (recessed); a `halfRound` porch's depth is `width/2`, its width clamped so that `width/2 ≤ d −
clearanceM`. A flush row front (`d = 0`) therefore takes `recessed` or `none`, never a porch over the street. The porch's
plan ring (derived): the rectangle on the side at the entrance's offset, `width × depth`, outward (or inward for
`recessed`); for `halfRound`, the half-disc of radius `width/2` centred on the door point on the side's outer line, its
arc by `dmath` with the side count of `TowerShapeRow`'s round bracket at that radius, halved (at least 6 segments).
Its heights: one storey (`storeyCm.ground`) and a roof rise of `pitch × width/2` (`twoStorey`: two storeys; `halfRound`:
a half-cone to the wall at `TowerShapeRow`'s round pitch × `width/2`); it is drawn and lit at the bands where the
composition is drawn (V02 §5), and it adds nothing to the model's heights (V02 §5.2's note on shadows).

**The secondary porch (J-V2.44).** With chance `secondaryPorch` (creation index 1 on `compose.porch`), one `hood` at
the side, rear or yard entrance (§2.6 `Entrance.role` `side`, `rear` or `yard`) with the largest `d` among those where a
hood is feasible, ties by entrance ordinal; its size by `PorchKindRow.hood`. It is `0` in the default rows (one porch at
the main door, as historical houses mostly had) and calibrated under `FM`, where the reference puts up to three porches
on a building.

### 3.8 The `rooms` rung — the composer's principal rooms

Derived only as the plan rung's input — on the click that derives the plan, `compose(…, 'rooms')` after `wings` —
and never alone under `elaborate: 'view'` (J-V2.9), because nothing but the plan draws them. Each room is a `Room`
(§2.6) with its storey, its composed wing's **base key** (a tower's room its tower wing's key; item 225) and a role the
room programme rows name (V03 owns those rows; these four roles must exist in them). All rooms lie inside one seed
piece at their storey (the stage-3 contract): each avoids every tower ring (a room that would meet one is shortened away
from it, else omitted) and keeps `attractCm` from every side it does not share.

**The rung reads the occupants, not the shell (item 28 (f); J-V2.36).** Its `rooms` cells are read at the occupants'
band (V02 §3.2 step 3), and its recorded inputs include the occupants' band row and the household count (item 261), so a
band change or a re-division marks it stale and the plan's re-cut starts from the rooms the new band admits. The **hall
and the chapel are emitted only** where the interior-ladder row at the occupants' band gives the unit form `house` (one
household holds the building, §2.6's interior ladder), or where the class is an institution whose programme row names a
hall (an inn's common room, a guild or town hall's hall, a market hall's upper hall, a barracks' mess): a rich manor
whose occupants fall to the poor band has no hall ring, and its main range divides into the units the ladder asks
(T-V2-35); returning to the rich band restores the as-built rooms exactly (the canonical chain). **The gate hall and the
tower rooms are shell and circulation rooms and stay at every band.**

1. **Hall** (the row's `rooms.hall` under the rule above): in the `main` wing — for a closed family the range opposite the
   gate (M5) — from eave side to eave side, length `U(hallLenShare) ×` the wing's length along its ridge, clamped to
   `[1.4w, length − 2 m]` and then **to the programme's area**: its area is clamped into the class programme's `hall` row
   `[min, max]` × the interior-ladder row's `sizeFactor` at the occupants' band, by shortening its length, never its width (which runs eave to eave) —
   where the class's `RoomProgramRow` with a `hall` rule is loaded (V03's rows, from M6-P's P1); before those rows land
   (M6b) the hall is clamped by `[1.4w, length − 2 m]` alone and reported per building (`hallUnclamped`; reconciliation
   round 1, S23-38; J-V2.95). **Its low end** is the door it is entered by: the main entrance where that lies on the `main`
   wing — the hall's low end at `door offset − hallDoorBackM` (1.5 m; the entrance opens into the hall's low end, the
   cross-passage bay), clamped inside the wing; otherwise a **court door** on the `main` range's court side at the offset
   nearest the gate hall's axis (a derived opening the plan rung opens, listed with the gate hall's arches). The hall runs
   from its low end toward the range's farther end. Ground storey; role `hall`.
2. **Gate hall** (closed families): in the `gate` wing, from eave side to eave side, width `U(gateHallM)` centred on the
   main entrance's offset and shifted to keep `gateHallJointGapM` (0.5 m) from a joint; ground storey; role `gatehall`.
   The plan rung opens an arch at both ends — to the street and to the court (V03 reads the role's programme row) —
   so the court is reached through the building, as courtyard houses and inns were. **`ovalCourt`**: the
   gate hall is laid in the main gate's façade wing as above and continues through its gate-passage seating wing to the
   floor — two rooms of role `gatehall` sharing an arch on `P1` — and the opposite major-axis chord's passage wing holds a
   second `gatehall` room (its outer end a door into the façade's `main` wing, or an arch where an access edge faces it, by
   the base's entrance rules); each minor-axis seating wing M8b turned into a gate passage holds a `gatehall` room likewise,
   its outer end an arch through its façade wing; the plan of the façade ring is V03's.
3. **Chapel** (with chance `rooms.chapel`, under the rule above): in an open family, at the free end of the range whose
   ridge direction is nearest world east (`+x`); **in a closed ring**, at the east end of the range whose ridge is nearest
   east, from its joint toward the range's other end; from eave side to eave side, length `w × U(1, 1.5)`, ground storey
   (or first storey where the ground storey there is the hall); role `chapel`.
4. **Tower rooms:** per composed tower, one room per storey it reaches: its ring less the rings of the towers before it
   in the clip order that it overlaps (the base's rule); a tower on a block, its ring inside the block's piece; role
   `towerRoom`.
Room ids are the base's `room:<building>/<level>/<i>`, `i` in the order hall, gate hall, chapel, then the tower rooms by
tower key; the plan rung passes them as fixed rings (§3.4's transient arena) and places its stair cores against their
walls (the base's contract). **Every one of them is editable** by `setComposition` `room` (V02 §4.1): on or off, and its
extent along its host's ridge, bent to the nearest lawful extent by V02 §3.13 (3)'s rule; an edited room is a fixed input
of the rung (`edited`), kept through a re-derivation while its host keeps its key.

### 3.9 Mutation — the wing step of the designation mutator (item 18)

The base's mutator (§4.7 S11) matches parts by role, orders subtract → convert → adapt → add, draws on the plot's
`siteplan.mutate` stream, records `MutationStep`s and reverses exactly. For the wings of a kept (or adapted, or
converted) slot's building, its steps are:

* **W1 — the target family.** The target designation's composition row at the plot's manifested band (V02 §3.2). If the
  source family (`Building.massing.family`) has weight > 0 in the target row and is feasible on the building's current
  hint (S11's re-fit with the other kept parts fixed), it stays. Otherwise one draw on `siteplan.mutate` (V02 §3.12) over
  the target families **reachable** from the source by `MassingGrowthRow` and the anchored-lay table below, and feasible
  (M3's two tests), weighted by the target row. For `stepped` the feasibility is **anchored** (second revision, V2C-64
  (1)): the kept `main` range's shorter side at least `tierMinSideM + 2 × insetM[0]` (a second tier fits) and the least stair
  reserve of V02 §3.15.1 ST0 fitting inside `H` in front of it (none needed for `internal`); otherwise `stepped` leaves the
  reachable set, as the ± 15 % rule removes a pair.
* **W2 — the seeds.** The growth row's `keep` names the kept ranges: `all` (the target path contains every source
  range), `main` (the source's `main` range only), `mainAndOne` (main and the longest other range, ties by key), `none` (no
  range maps — only for a source whose `main` has no compatible role in the target by §4.7's compatibility table; the
  mutator then keeps what it can as other slots or subtracts it, never re-rolls the plot).
* **W3 — the anchored lay.** The target family's construction (M5) runs in **anchored mode**: its frame is fixed on the
  kept `main` range — `u` along its ridge, `v` away from its access-side eave, the front that eave — and the family's
  parameters are solved so that the kept ranges are exactly slabs of the target, by the table below (one row per
  reachable pair; J-V2.11). Added ranges that do not fit the hint shrink first, then are dropped (the target family
  degrading to the largest feasible sub-family by the growth table), and then the base's step 3 (a JOIN by S10 (7)'s
  orderings, or the template's `underSize`) decides — never a fresh roll.

  | source → target | kept | the anchored construction (lengths not named are drawn as in M5) |
  |---|---|---|
  | `single` → `L` | main | the kept range is the front slab (`Lf` = its length); the arm at the end W1's coin picks (the sunlit choice of M5 applies), `Ls` drawn, abutting |
  | `single` → `T` | main | a cross slab through the kept hall's end the coin picks; the hall **adapted** — shortened by `w_c` at that end |
  | `single` → `H` | main | cross slabs through both of the kept hall's ends; the hall shortened by `w_c` at each |
  | `single` → `U` | main | the kept range is the through front range (open to the rear); arms of length `Ls` at its two ends, running `+v` |
  | `single` → `cross` | main | the kept range is the main range (it runs through); the cross slab through its middle, `Lc` drawn, laid as two pieces |
  | `single` → `rectCourt` | main | the kept range is the `gate` range (`Lf` = its length); `Ld` drawn; the rear and the two side ranges added (the rear takes `main`, M5) |
  | `single` → `towerHouse` | main | the tower at the kept range's front corner nearer the plot's larger side yard (square abutting; round or octagonal overlapping by `0.35 × t/2`) |
  | `single` → `gridWalk` | main | the grid pitch `p` = the kept length ÷ `k`, `k = max(1, round(kept length ÷ p₀))`, `p₀` M5's pitch on the hint; the kept range is the first segment and the walk continues from its far end |
  | `single` → `plotRing`, `regularCourt`, `starCourt`, `chordArc` | main | reachable only when the kept length is within ± 15 % of the target's side at the current hint (the nearest edge of `Q` for `plotRing`; the regular side at M5's `R` for `regularCourt`; one chord for `chordArc`; the nearest corner-to-corner span for `starCourt`); the target is laid with that side on the kept range (its phase or its `Q` edge moved onto it); otherwise the pair is removed from W1's reachable set |
  | `L` → `U` | all | the second arm at the front range's other end, of the kept arm's length |
  | `L` → `rectCourt` | all | the front range is the `gate` range, the kept arm one side; the opposite side and the rear range close the court at the kept arm's length |
  | `L` → `T`, `H` | main | cross slab(s) through the kept front range's end(s), the range shortened by `w_c` at each; the kept arm subtracted |
  | `T` → `H` | all | the second cross slab through the hall's other end, the hall shortened by `w_c` there |
  | `U` → `rectCourt` | all | the closing range across the arms' far ends |
  | `rectCourt` → `U`; `U` → `L`; `H` → `T`; `L`, `T`, `cross` → `single`; any closed family → `U` or `L` | `mainAndOne`, or `main` where the target has one range | the ranges not kept are subtracted (the highest keys first among equals); a hall shortened by a subtracted cross-wing regains that length where `H` allows (adapt) |
  | `towerHouse` → `single` | main | the tower subtracted; a `towerHouse` with no range keeps the tower as a `part` and lays `single` beside it (`none`) |
  | `gridWalk` → `L`, `single` | `mainAndOne`, `main` | the first two segments, or the first, kept; the rest subtracted |
  | any closed or fantasy family → another | main | anchor either: reachable only within the ± 15 % side rule above |
  | `baseOutline` → any | main | the base builder's bar (its `main`) is the kept range, as `single`'s rows |
  | `row` → `row` | all | the quad kept; only the back range and the storeys change |
  | `template` ↔ any other | — | never reachable: a template building changes only by the compatibility table's keep, convert or subtract (§4.7) |
  | `single` → `stepped` (item 110 fold; the only source — every other family passes through `single`, as `MassingGrowthRow`'s defaults state; second revision, V2C-64 (2)) | main | the kept range's four corners are tier 0 (`layTiers`' anchored mode, W1's anchored test first); the stack, its stairs and top laid on it with the target row's cells and `drawTiers` on `siteplan.mutate`; V02 §3.15.5 |
  | `stepped` → `single` | main | tier 0 kept as the `main` range; every stacked wing and every stair subtracted (highest keys first); its roof and floors by W5 — a solid tier 0 becomes storeyed, its `solid` cleared (V02 §3.15.5); onward to any family by `single`'s rows |
  | `stepped` → `stepped` | all | the tiers up to the target's count kept; W4 subtracts the tiers above it (the shrine first); W6 adds tiers on top with the stack's step while ST3's side test passes, their stairs, and the shrine where the target's top is one (V02 §3.15.5) |

* **W3b — an arrangement change (item 108; J-V2.13 scoped).** A `row` building whose target template's arrangement is
  `compound` (a brewer's shopfront becoming a brewery's `works-noxious` yard) keeps its quad byte-identical as the
  compound's **frontage slot** — role `shop-house` or `house` by the target's structures — and the target's main structure
  is added as another slot by the base's compound packer behind it (a JOIN by S10 (7) where the budget asks); the reverse
  (compound → row) subtracts the added slots and restores the quad's role. J-V2.13's "a row building never changes
  family" holds for every change that keeps the `row` arrangement.
* **W4 — subtract.** Source wings with no role in the target, and towers or blocks above the target row's maximum
  (the highest keys first), are subtracted — unless locked or edited (the base's step 4: kept, reported).
* **W5 — adapt.** Kept wings' floors move into the target's floors band (one storey per step, the base's "a storey added
  within the floors band"), and on a deck plot are clamped to the deck's `maxFloors` as M11 clamps them at generation
  (second revision, V2C-66 (5)); a roof kind the target's `WingRoleRow` does not allow changes to its first allowed kind.
* **W6 — add.** Blocks, towers, a turret, a back range and the attached structures to the target row's counts, by
  M7–M9 and M8b on the new massing, with draws on `siteplan.mutate` keyed as V02 §3.12 states; added wings take keys from
  `nextWingKey`, and the canonical order (V02 §2.1) is restored before the commit. **Digging down (item 109 (j) (3) (i);
  J-V2.39):** an added wing whose ring newly lies over a sealed cavern, ruin chamber or gallery within reach of its dig
  floor (V02 §3.14.5) draws once for an access down, keyed (building lineage, `dig`, the void system's kind, the wing's
  key) on the `sewer` concern in V04's T2b stage — the draw and the access kind are V04's, its chance V11 §3.23.7's `DigRule` rows by class and depth
 ; growth by new
  foundations is the owner's "more digging".
* **W7 — record.** Each wing step is a `MutationStep` with part kind `wing` (its address `('wing', building, key)` and
  role), `storey` for a floors change, `roof` for a roof kind change, and one `slot` step of role `massing` carrying the
  `MassingRef` before and after (its `segments` rewritten). Kept wings keep their keys and bytes (T-V2-15); subtracted
  keys are never re-used.
* **W8 — the composition.** An unstored `wings` rung is marked stale and, at the next click, re-derives — the kept wings'
  dormer rows reappearing unchanged, because their draws are keyed by the wing's key (V02 §3.12). A stored composition is
  re-matched inside the event (the base's rule): composed wings of subtracted keys are dropped (fates), of kept keys
  kept (an edited dormer row kept while its eave's length stays within ± 10 %, else orphaned and listed in §7.3's orphan
  table with its two actions, V02 §4.4), and added keys composed on the spot by V02 §3.6–§3.7 on the committed massing.
* **W9 — reversal** is the base's: the inverse steps restore the former massing exactly while the building's leaf
  digest is the record's result; otherwise a forward mutation toward the former designation runs and is reported.
* **W10 — over time** the same steps are spread by the evolution engine and shown by Works (V06), one Works per
  added or subtracted wing; this volume only records them (V06 calls them through the mutator; no epoch participant of
  its own).

Generation is W6 from the empty design with no seeds — the massing of V02 §3.5 — so a generated building and a mutated one
are laid by one code path (the base's step 7). A `setMassing` `family` op (V02 §4) runs W1–W9 with the named family,
drawing as V02 §3.12 states. Split sites and their merge-back (item 105 (h)) and ladder steps (item 108) are designation
mutations of each plot and take these steps; V02 §3.14.3–§3.14.4 state what is special to them.

### 3.10 The default rows — the diversity ladder from hovel to giant manor

All values are **our own** (provenance `own`, architecture 2026-09-28, revised the same day), calibratable (§13.9),
general architectural history rather than corpus-witnessed, and keyed so that **every class of the compiled roster
resolves to a written row** (T-V2-33): one row per V11 template family (V11 §3.6.1's 35 families — the 32 first authored, `burial-ground`, `fort` and `arena`;
reconciliation round 1, SCC-12), class rows only as
overrides, one row per structure role, and full default rows per arrangement.

**3.10.1 Anchors (J-V2.30, revised).** Every row is authored at **V11's four anchors — poor, modest, prosperous,
rich** — the same anchors as the templates whose budgets it must meet; `squalid` reads the poor row and `comfortable`
the cell-wise interpolation of modest and prosperous at its band centre (V11 §3.6.1's derivation, one band-anchoring
rule for every template-like table). Continuous cells interpolate along the value; a discrete cell takes the richer
anchor's value from the band's upper half (J-A19.43's switch at the cut). A class the class mix never places at a band
still has its row (its nearest anchor's), because a designation change or an assignment can put it there. Notation
below: `p / m / pr / r` for the four anchors; one value where all four agree. **Porch weights** are written
`none / hood / gabled / twoStorey / recessed`; `halfRound` is 0 in every default row (J-V2.45) and set only by the `FM`
preset. Every cell a row leaves out takes the shared value of V02 §3.10.9.

**3.10.2 The template-family rows** (`<family>/<band>`; the main slot's step 4 of the chain):

| family (arrangement; main slot) | families `p / m / pr / r` | wing width m | range length m | blocks · towers (turret) | back · hip | dormers /10 m | porch `p · m · pr · r` | rooms · hearths | other cells |
|---|---|---|---|---|---|---|---|---|---|
| `dwelling-row` (row; house) | row 1 | the quad | — | 0 · 0 (0) | .1 / .35 / .6 / .85 (squalid 0) · .1 | .2 / .5 / 1.0 / 1.5 | .9/0/0/0/.1 · .75/.1/0/0/.15 · .5/.3/0/0/.2 · .3/.4/0/0/.3 | — · 1 / 1–2 / 2 / 2–3 | entrance gable 0 / .05 / .15 / .3 |
| `lodging-row` (row; house) | row 1 | the quad | — | 0 · 0 (0) | .3 / .4 / .5 / .5 · .1 | .5 / .8 / 1.0 / 1.2 | .8/.1/0/0/.1 · .7/.15/0/0/.15 · .6/.2/0/0/.2 · .5/.25/0/0/.25 | — · 1–2 / 2 / 2–3 / 3 | — |
| `shopfront` (row; shop-house) | row 1 | the quad | — | 0 · 0 (0) | .4 / .5 / .6 / .7 · .15 | .3 / .7 / 1.0 / 1.4 | .6/.3/0/0/.1 · .4/.4/0/0/.2 · .3/.5/0/0/.2 · .2/.5/0/0/.3 | — · 1 / 1–2 / 2 / 2–3 | entrance gable 0 / .05 / .1 / .2 |
| `workshop-row` (row; shop-house) | row 1 | the quad | — | 0 · 0 (0) | .5 / .5 / .6 / .6 (shed outshots) · .15 | 0 / .3 / .6 / .8 | .8/.2/0/0/0 · .6/.3/0/0/.1 · .5/.4/0/0/.1 · .4/.4/0/0/.2 | — · 1 / 1–2 / 2 / 2 | — |
| `tavern-row` (row; house) | row 1 | the quad | — | 0 · 0 (0) | .3 / .4 / .5 / .6 · .15 | .3 / .6 / 1.0 / 1.2 | .5/.3/0/0/.2 · .3/.4/0/0/.3 · .2/.4/0/0/.4 · .1/.4/0/0/.5 | hall (the common room) · 2 / 2 / 3 / 3–4 | — |
| `warehouse` (row; store) | row 1 | the quad | — | 0 · 0 (0) | 0 · .1 | .5 / .5 / .6 / .7 | 1/0/0/0/0 | — · 0 | dormer kinds hoist .6, dormer .4, one hoist per access eave (V02 §3.7) |
| `dwelling-detached` (detached; house) | single 1 / single .8, L .2 / single .6, L .3, T .1 / single .4, L .35, T .15, H .1 | 4.2–5.2 / 4.8–6 / 5.5–6.5 / 6–7 | 6–8 / 7–9 / 9–13 / 11–15 | 0 / 0 / 0–1 / 0–1 · 0 (0 / 0 / .05 / .15) | .3 / .4 / .5 / .6 · .4 / .35 / .4 / .45 | 0 / .3 / .8 / 1.2 | .9/.1/0/0/0 · .6/.3/0/0/.1 · .3/.3/.3/0/.1 · 0/.2/.5/.2/.1 | hall (V02 §3.8's rule) · 1 / 1–2 / 2–3 / 3–5 | — |
| `dwelling-compound` (compound; hall) | single .7, L .3 / single .5, L .35, T .15 / single .25, L .4, T .3, H .05 / L .35, T .35, H .15, U .15 | 5–6 / 5.5–6.5 / 6–7 / 6.5–7.5 | 8–11 / 9–13 / 11–15 / 13–17 | 0 / 0 / 0–1 / 0–1 · 0 (0 / .05 / .15 / .25) | .4 / .4 / .3 / .2 · .3 / .35 / .45 / .5 | .8 / 1.0 / 1.2 / 1.4 | .4/.5/0/0/.1 · .2/.5/.2/0/.1 · 0/.4/.5/.1/0 · 0/.1/.5/.4/0 | hall; chapel 0 / 0 / .05 / .15 · 2–4 / 3–5 / 4–6 / 5–8 | courtMinM 6 / 6 / 7 / 8; uOpenFront .6; cupola 0 / 0 / .05 / .1 |
| `hovel` (hovel; hut) | single 1 | 3.4–4 / 3.6–4.4 / 3.6–4.4 / 3.6–4.4 | 4–5 / 4.5–6 / 4.5–6 / 4.5–6 | 0 · 0 (0) | 0 / .1 / .1 / .1 · .5 | 0 | 1/0/0/0/0 | — · 1 | — |
| `cluster` (cluster) | shelter 1 | the cluster row's | — | 0 · 0 (0) | 0 · 0 | 0 | 1/0/0/0/0 | — · 0 (a shack .3 chance of one) | — |
| `workshop-yard` (compound; house) | single 1 / single .8, L .2 / single .7, L .3 / single .5, L .4, T .1 | 3.6–4.4 / 4.2–5 / 4.8–5.8 / 5.5–6.5 | 4.5–6 / 5.5–7.5 / 7–10 / 8–12 | 0 · 0 (0) | .5 / .5 / .45 / .4 · .2 | 0 / .2 / .4 / .6 | .9/.1/0/0/0 · .7/.3/0/0/0 · .4/.4/.2/0/0 · .2/.5/.3/0/0 | — · 1 / 1–2 / 2 / 2 | — |
| `works-noxious` (compound; works) | single 1 / single .8, L .2 / single .7, L .3 / single .6, L .4 | 5–6 / 5.5–6.5 / 6–7.5 / 7–8.5 | 6–8 / 7–10 / 10–14 / 12–16 | 0 · 0 (0) | 0 · .2 | 0 | .9/.1/0/0/0 | — · 1 / 1 / 2 / 2 | axis `water` where the class needs running water (V02 §3.14.6) |
| `yard` (compound; shed) | single 1 / single 1 / single .8, L .2 / single .7, L .3 | 4–5 / 4.5–5.5 / 5–6.5 / 5.5–7 | 7–9 / 9–12 / 11–15 / 13–17 | 0 · 0 (0) | 0 · .1 | 0 | 1/0/0/0/0 | — · 0 | — |
| `kiln-yard` (compound; kiln) | towerHouse 1 (no range) | 3–3.2 / 3.4–4 / 4–4.8 / 4.6–5.4 | 0 | 0 · 0 (0) | 0 · — | 0 | 1/0/0/0/0 | — · 0 | towerShape round .8, square .2 (a bottle kiln: the tower's cone) |
| `market-hall` (institution; hall) | single 1 / single 1 / single .85, L .15 / single .7, L .15, T .15 | 9–11 / 10–12 / 11–13 / 12–14 | 22–28 / 28–36 / 34–42 / 40–50 | 0 / 0 / 0–1 / 0–1 · 0 (0 / 0 / .1 / .2) | 0 · .5 | .3 / .5 / .6 / .8 | 1/0/0/0/0 (arcaded) | hall (the upper hall) · 0 / 0 / 1 / 1 | `arcade` on; cupola .1 / .2 / .35 / .5 |
| `hall` (institution; hall) | single .6, T .4 / single .5, T .35, H .15 / single .35, T .35, H .2, rectCourt .1 / single .2, T .3, H .3, rectCourt .1, cross .1 | 7–9 / 7.5–9.5 / 8–10 / 9–11 | 11–17 / 14–20 / 15–23 / 18–28 | 0–1 · 0 (.1 / .15 / .2 / .3) | .1 · .3 / .35 / .4 / .5 | .3 / .45 / .6 / .8 | 0/.2/.8/0/0 · 0/.1/.8/.1/0 · 0/0/.7/.3/0 · 0/0/.5/.5/0 | hall · 2 / 2–3 / 3 / 4 | cupola .1 / .15 / .25 / .4; with `fantasyShapes`: regularCourt .1 at r |
| `inn-compound` (compound; inn) | single .6, L .4 / single .4, L .45, U .15 / single .2, L .45, U .3, rectCourt .05 / L .4, U .45, rectCourt .15 | 5–6 / 5.5–6.5 / 6–7 / 6–7 | 8–11 / 10–13 / 12–16 / 13–17 | 0 / 0 / 0–1 / 0–1 · 0 (0) | .3 / .25 / .2 / .1 · .3 | .6 / .8 / 1.0 / 1.2 | .3/.3/.4/0/0 · .1/.3/.5/.1/0 · 0/.2/.6/.2/0 · 0/0/.5/.5/0 | hall (the common room); gate hall on `rectCourt` · 2 / 2–3 / 3 / 4–6 | — |
| `bath-house` (compound; bath hall) | single .7, L .3 / single .6, L .4 / single .6, L .25, T .15 / single .5, T .3, H .2 | 6–8 / 7–9 / 7.5–9.5 / 8–10 | 8–12 / 9–13 / 11–15 / 13–17 | 0 · 0 (0) | 0 · .4 | 0 | .8/.2/0/0/0 · .6/.2/.2/0/0 · .4/.2/.4/0/0 · .2/.2/.6/0/0 | — · 1 / 1 / 2 / 2 | cupola 0 / 0 / .1 / .25 (dome 1) |
| `church` (institution; nave) | template 1 | the template's | the template's | 0 · 0 (0) | 0 · the template's | 0 | the template's door; a church porch by M8b | — · 0–1 | westTowers 0–1 (the chance of one .3 / .6 / .85 / 1, where the template lists no `tower` structure); crossingTower 0 / 0 / .1 / .2; spires by `spireFactor` |
| `chapel` (institution; nave) | single .9, template .1 / single .8, template .2 / single .7, template .3 / single .5, template .5 | 5–6 / 5.5–6.5 / 5.5–7 / 6–8 | 8–12 / 9–14 / 10–16 / 12–20 | 0 · 0 (0) | 0 · .2 | 0 | .5/0/.5/0/0 | — · 0 | — |
| `cathedral` (institution; nave and choir) | template 1 | the template's | the template's | 0 · 0 (0) | 0 · the template's | 0 | the template's door | — · 0 | westTowers 2 (always, at the west corners); crossingTower .5 / .6 / .7 / .8; towerShape square 1; spires by `spireFactor` |
| `cloister` (institution; church) | template 1 | the template's | the template's | 0 · 0 (0) | 0 · the template's | 0 | the template's door | — · 0 | westTowers 0–1 (.5); crossingTower .2 |
| `court-institution` (institution; main range, its `ranges` absorbed) | single .2, L .4, U .4 / L .3, U .45, rectCourt .25 / rectCourt .45, U .35, plotRing .1, H .1 / rectCourt .45, plotRing .15, U .15, H .15, cross .1 | 6–7 / 6.5–7.5 / 7–8 / 7.5–8.5 | 12–18 / 15–21 / 18–26 / 22–32 | 0 / 0–1 / 0–1 / 1–2 · 0 (.1) / 0–1 (.2) / 0–1 (.3) / 0–2 (.4) | 0 · .4 / .45 / .5 / .55 | .5 / .7 / .9 / 1.1 | 0/.3/.7/0/0 · 0/.2/.7/.1/0 · 0/.1/.6/.3/0 · 0/0/.5/.5/0 | hall (by its programme); gate hall on closed families · 3 / 4 / 5–7 / 6–10 | gate tower 0 / .1 / .2 / .3; cupola 0 / .1 / .2 / .3; courtMinM 8 / 9 / 10 / 12 |
| `barracks` (compound; block) | single .7, L .3 / single .4, L .45, U .15 / single .3, L .45, U .2, rectCourt .05 / single .2, L .45, U .35 | 7–8 / 7–8.5 / 7.5–8.5 / 7.5–8.5 | 16–22 / 17–23 / 18–24 / 19–25 | 0 · 0 (.1 / .1 / .2 / .3) | 0 · .3 | .3 / .4 / .5 / .6 | .7/.3/0/0/0 | hall (the mess) · 2 / 3 / 4 / 5 | — |
| `watch-house` (detached; post) | single 1 | 4–5 / 4.5–5.5 / 5–6 / 5.5–6.5 | 5–6.5 / 5.5–7 / 6.5–8 / 7.5–9 | 0 · 0 (0) | 0 · .3 | 0 | .8/.2/0/0/0 | — · 1 | — (a towered post is the `watchtower` class, `tower` family) |
| `tower` (detached; tower) | towerHouse 1 | 3.5–4.2 / 4–4.6 / 3.6–4.4 / 4.2–4.8 (the tower's side 1.2–2 w) | 0 / 0 / 5–7 / 7–10 (the attached range) | 0 · 0 (.1 / .15 / .2 / .3) — M5 lays its tower | 0 · 0 | 0 / 0 / .3 / .5 (on the range) | .5/.5/0/0/0 | tower rooms · 1 / 1–2 / 2 / 3 | towerShape square .5, round .4, octagon .1; towerFlat .3; with `fantasyShapes`: regularCourt .1 at pr and r |
| `castle` (institution) | template 1 (the base's §4.2 S3 castle and bailey) | the template's | the template's | the template's | 0 · the template's | 0 | the template's | — · 0–2 | the palace override (V02 §3.10.3) |
| `farm` (compound; farmhouse) | single 1 / single .8, L .2 / single .7, L .3 / single .5, L .35, T .15 | 4.2–5 / 4.5–5.5 / 5–6 / 5.5–6.5 | 6–7.5 / 7–9 / 8.5–11.5 / 10–13 | 0 · 0 (0) | .3 · .5 | 0 / .2 / .4 / .6 | .8/.2/0/0/0 · .7/.2/.1/0/0 · .6/.2/.2/0/0 · .4/.3/.3/0/0 | — · 1 / 1–2 / 2 / 2–3 | — |
| `mill` (compound; mill house; `wheel or sails` attached) | single .9, L .1 | 5–6 / 5.5–6.5 / 6–7 / 6.5–7.5 | 7–9.5 / 8–11 / 9–12 / 10–13 | 0 · 0 (0) | .2 · .3 | .3 | .9/.1/0/0/0 | — · 1 | the class overrides `watermill` and `windmill` (V02 §3.10.3) |
| `extractive` (compound; works shed) | single 1 | 3–3.8 / 3.5–4.5 / 4–5 / 4.5–5.5 | 4–5.5 / 5–7 / 7–9 / 8.5–10.5 | 0 · 0 (0) | 0 · 0 | 0 | 1/0/0/0/0 | — · 0 | — |
| `landing-yard` (compound; sheds) | single 1 / single 1 / single .85, L .15 / single .75, L .25 | 4–5 / 4.5–6 / 5.5–6.5 / 6–7.5 | 6–7.5 / 8.5–10.5 / 11–14 / 14–18 | 0 · 0 (0) | 0 · .1 | 0 | 1/0/0/0/0 | — · 0 | axis `water` |
| `stable-yard` (compound; stable) | single .8, L .2 / single .7, L .3 / single .5, L .4, U .1 / single .3, L .45, U .25 | 5–6 / 5.5–6.5 / 6–7 / 6.5–7.5 | 7–10 / 9–12 / 11–14 / 13–16 | 0 · 0 (0) | 0 · .3 | .2 / .3 / .4 / .5 | .9/.1/0/0/0 · .8/.2/0/0/0 · .7/.3/0/0/0 · .6/.4/0/0/0 | — · 0 / 1 / 1 / 1 | dormer kinds hoist .4, dormer .6 |
| `burial-ground` (institution; no required structure — V02 §3.10.7's exemption; its mortuary chapel reads this row through `roleKeys`) | single 1 | 4–5 / 4.5–5.5 / 5–6 / 5–6.5 | 5–7 / 6–9 / 8–10 / 9–12 | 0 · 0 (0) | 0 · .2 | 0 | .5/0/.5/0/0 | — · 0 | the `cemetery` class's row; floors by V11 §3.6.4's `burial-ground` heights (one storey) |
| `fort` (compound; tower) | towerHouse 1 (no range) | 6–7 / 7–8 / 8.5–10 / 10.5–12 (the tower's side 1.2–2 w) | 0 | 0 · 0 (0) — M5 lays its tower | 0 · 0 | 0 | 1/0/0/0/0 | tower rooms · 1 / 1 / 2 / 2 | towerShape square .6, round .3, octagon .1; towerFlat .7 (a battlemented roof; the `tower` heights row's `parapetCm` 60, which `fort` reads, V11 §3.6.1); the second tower, the gate and the barracks range by `roleKeys` (V02 §3.10.4) |
| `arena` (institution; stands) — the amphitheatre (a family row since V11's 35) | `ovalCourt` 1 at every anchor | the façade 4–6 | — (claim-sized) | 0 · 0 (0) | 0 · 0 | 0 | 1/0/0/0/0 | none (gate halls only, V02 §3.8) · 0 | `caveaM` 8–12 / 10–14 / 12–18 / 14–22; floors 2 / 2–3 / 3 / 3–4; `arcade` off / off / on / on (every façade wing); `courtMinM` 16 / 20 / 24 / 28; `claimShare` .5–.8 (the arena fills its precinct; J-V2.87); `coverageMax` .85; cupola 0; its `gate`s absorbed (M8b); its plot V11 §3.6.1's `arena` row (plot p50 2 500 / 4 000 / 6 000 / 9 000 m², footprint "the claim's"; X27); heights V11's `hall` row |

**3.10.3 Class override rows** (`<class>/<band>`; step 2 of the chain). Each override row is an `alias` of the family named
beside it, and only the cells named override it — also where another class reads the row through `composition.classFamily`
(`v.manor_house` → `manor`):

| class (family) | overriding cells |
|---|---|
| `manor` (`dwelling-compound`) — the giant manor | families: single .7, L .3 (a fallen one) / single .45, L .35, T .2 / L .2, T .25, H .25, U .3 / rectCourt .35, plotRing .2, U .2, H .15, gridWalk .1 — with `fantasyShapes` on, regularCourt .2, starCourt .15, chordArc .15 added at pr and r; width 5–6 / 5–6 / 7–8 / 7.5–9; length 9–11 / 10–13 / 16–22 / 20–30; blocks 0 / 0 / 0–1 / 1–2; towers 0 (.05) / 0 (.15) / 0–1 (.3) / 1–3 (.5); gate tower 0 / .05 / .15 / .3; back .3 / .3 / .2 / .1; hip .35 / .4 / .5 / .55; dormers .8 / 1.0 / 1.2 / 1.4; porch .3/.7/0/0/0 · .1/.5/.4/0/0 · 0/.3/.6/.1/0 · 0/0/.4/.6/0; chapel 0 / .05 / .2 / .4; hearths 3–5 / 4–6 / 5–9 / 8–14; courtMinM 6 / 7 / 8 / 9; cupola 0 / 0 / .1 / .2; coverageMax .65. **Budget (J-V2.35):** V11 §3.6.1's `manor` override as adopted (J-V11.39) — prosperous footprint p50 420 m², rich p50 650 m² (p10 455, p90 943 by the 0.7 / 1.45 ratios), rich plot 3 000 m², the main slot's `footprintShare` ≥ 0.6 at prosperous and rich (the court's ranges hold the kitchen and lodgings); the rows' medians sit at 1.1–1.3 × those budgets (the table after this one) |
| `town_house` (`dwelling-compound`) — the burgess's urban compound | families: single .7, L .3 / single .5, L .35, T .15 / single .3, L .4, T .3 / L .35, T .3, U .2, H .15; towers 0 (0 / .1 / .2 / .25); back .6 / .7 / .8 / .9; hip .2; dormers 1.0 / 1.1 / 1.3 / 1.6; porch .4/.3/0/0/.3 · .3/.35/.05/0/.3 · .2/.4/.1/0/.3 · 0/.4/.3/.1/.2; hearths 2 / 2 / 2–3 / 3–4 |
| `house` (`dwelling-row` at p and m, `dwelling-detached` at pr and r — V11's per-band family) | at pr: single .5, L .35, T .15; at r: single .3, L .35, T .25, H .1; hall at r only (the `house` unit form) |
| `cottage` (`dwelling-detached`) | families single .8, L .2 / single .7, L .3 / single .6, L .4 / single .5, L .5; back .3 / .35 / .45 / .5; dormers 0 / 0 / .3 / .6; porch .9/.1/0/0/0 · .8/.15/0/0/.05 · .7/.2/0/0/.1 · .5/.3/.2/0/0; hearths 1 / 1 / 1–2 / 1–2 (an `L` at p is infeasible by M3's budget and falls away) |
| `watermill` (`mill`) | axis `water`; the attached `wheel` (M8b) |
| `windmill` (`mill`) | the attached `sails` force `towerHouse` with no range; towerShape round .6, square .4 (a tower mill, or a post mill's body); width 5–6.5 |
| `v.longhouse` (`dwelling-detached`; V07's village class, read by the chain's step 2 under its own `v.` key — reconciliation round 2) | families single 1; axis `fallLine` (V07's hard rule: the axis along the fall line where the slope exceeds 3 %, the byre end downhill in `MassingRef.low`); width 5–6 / 5.5–6.5 / 5.5–6.5 / 5.5–6.5; length 14–22 / 16–26 / 16–26 / 16–26; back 0; hip .3; dormers 0; porch .9/.1/0/0/0; hearths 1 |
| `palace` (`castle`) | at p and m template 1; at pr and r families rectCourt .4, plotRing .2, H .2, U .2; width 8–10; length 24–50; towers 1–4 (.5); gate tower .5; cupola .3; rooms hall, chapel .6, gate hall |
| `mage_tower` (`tower`) | towerShape round .6, octagon .3, square .1; towerFlat 0; cupola .3 (tip 1); with `fantasyShapes`: regularCourt .15 at pr and r |
| `watchtower` (`tower`) | range length 0; towerShape square .5, round .5; towerFlat .6 |

The classes `cemetery` and `arena` read their own template families' rows, `burial-ground` and `arena` (V02 §3.10.2): their
former override rows, aliases of `court-institution`, are withdrawn by reconciliation round 1, the `arena` row's
cells moved unchanged to its family row and its plot now V11 §3.6.1's `arena` row.

**The rows against the budgets.** Each row's median footprint — the family weights at their median width
and length, `crossWing` 2.25 m forward and 1.5 m back, a `towerHouse` tower of side 1.6 w by its shape weights, by M5's
constructions — against the template's p50 × the main
slot's share (V11 §3.6.1's p50; shares: 1 for a one-structure template, 0.9 where only small optional structures stand
beside the main, 0.6 where a second building is required or several are drawn — the `mainShareDefault`), computed by
the revision (receipt: `scratchpad/volumes/revise-v2/medians.py`, its output below). Every ratio lies in [0.91, 1.31], inside
`[sizeBandLo, sizeBandHi]` = [0.7, 1.45] of the p50, so M10 trims rather than rebuilds; the few rows near 1.3 are the rich courts the
owner asked for. The `manor` rows are measured against V11 §3.6.1's `manor` override.

| row | share | p: median / budget = ratio | m | pr | r |
|---|---|---|---|---|---|
| `dwelling-detached` | 0.9 | 33 / 32 = 1.04 | 52 / 45 = 1.16 | 84 / 72 = 1.17 | 123 / 99 = 1.24 |
| `house` (pr, r) | 0.9 | — | — | 89 / 72 = 1.24 | 129 / 99 = 1.31 |
| `cottage` | 0.9 | 40 / 32 = 1.26 | 56 / 45 = 1.26 | 83 / 72 = 1.15 | 106 / 99 = 1.07 |
| `dwelling-compound` | 0.6 | 64 / 54 = 1.18 | 89 / 72 = 1.24 | 128 / 108 = 1.19 | 197 / 156 = 1.26 |
| `town_house` | 0.6 | 64 / 54 = 1.18 | 89 / 72 = 1.24 | 121 / 108 = 1.12 | 201 / 156 = 1.29 |
| `manor` (V11's override) | 0.6 | 66 / 54 = 1.22 | 85 / 72 = 1.18 | 283 / 252 = 1.12 | 496 / 390 = 1.27 |
| `workshop-yard` | 0.6 | 21 / 18 = 1.17 | 37 / 30 = 1.22 | 57 / 48 = 1.18 | 85 / 72 = 1.18 |
| `works-noxious` | 0.6 | 38 / 36 = 1.07 | 62 / 54 = 1.16 | 98 / 84 = 1.16 | 137 / 120 = 1.14 |
| `yard` | 0.9 | 36 / 36 = 1.00 | 52 / 54 = 0.97 | 83 / 81 = 1.03 | 110 / 108 = 1.02 |
| `kiln-yard` | 0.6 | 20 / 18 = 1.13 | 29 / 27 = 1.08 | 41 / 42 = 0.98 | 53 / 54 = 0.98 |
| `market-hall` | 1.0 | 250 / 250 = 1.00 | 352 / 350 = 1.01 | 503 / 500 = 1.01 | 680 / 700 = 0.97 |
| `hall` | 0.85 | 150 / 128 = 1.17 | 212 / 187 = 1.13 | 305 / 272 = 1.12 | 438 / 382 = 1.14 |
| `inn-compound` | 0.6 | 68 / 60 = 1.13 | 103 / 90 = 1.15 | 165 / 132 = 1.25 | 219 / 180 = 1.21 |
| `bath-house` | 0.75 | 93 / 90 = 1.03 | 130 / 120 = 1.08 | 153 / 165 = 0.93 | 215 / 225 = 0.96 |
| `court-institution` | 0.9 | 176 / 180 = 0.97 | 308 / 270 = 1.14 | 457 / 405 = 1.13 | 559 / 540 = 1.04 |
| `barracks` | 0.6 | 168 / 180 = 0.94 | 230 / 210 = 1.10 | 278 / 240 = 1.16 | 310 / 270 = 1.15 |
| `watch-house` | 1.0 | 26 / 25 = 1.03 | 31 / 30 = 1.04 | 40 / 40 = 1.00 | 50 / 50 = 0.99 |
| `tower` | 0.85 | 34 / 34 = 0.99 | 42 / 42 = 0.99 | 60 / 60 = 1.01 | 84 / 85 = 0.99 |
| `farm` | 0.5 | 31 / 30 = 1.03 | 47 / 40 = 1.18 | 66 / 60 = 1.10 | 91 / 80 = 1.14 |
| `mill` | 0.8 | 50 / 48 = 1.04 | 62 / 64 = 0.97 | 74 / 80 = 0.93 | 87 / 96 = 0.91 |
| `extractive` | 0.8 | 16 / 16 = 1.01 | 24 / 24 = 1.00 | 36 / 36 = 1.00 | 48 / 48 = 0.99 |
| `landing-yard` | 0.5 | 30 / 30 = 1.01 | 50 / 50 = 1.00 | 81 / 80 = 1.01 | 124 / 120 = 1.03 |
| `stable-yard` | 0.8 | 56 / 48 = 1.16 | 76 / 72 = 1.06 | 112 / 104 = 1.08 | 163 / 144 = 1.13 |
| `hovel` | 1.0 | 17 / 16 = 1.04 | 21 / 20 = 1.05 | 21 / 20 = 1.05 | 21 / 20 = 1.05 |
| `fort` | 0.6 | 98 / 90 = 1.09 | 131 / 120 = 1.09 | 199 / 180 = 1.10 | 294 / 270 = 1.09 |
| `burial-ground` | 0.6 | 27 / 24 = 1.12 | 38 / 36 = 1.04 | 50 / 48 = 1.03 | 60 / 60 = 1.01 |

The `fort` and `burial-ground` rows are measured by the same arithmetic (receipt
`scratchpad/volumes/rcV2/medians_new.py` → `.out`; every ratio of the table stays in [0.91, 1.31]). The row families (`row`),
the templates (`church`, `chapel`'s template share, `cathedral`, `cloister`, `castle`), the claim-sized `arena` (its band
`claimShare × area(H)`, `slotBand`) and `cluster` are sized by their quads, templates, claims and cluster rows, not by these
medians.

**The stepped rows against their bands (second revision, V2C-49 (6)).** Receipt `scratchpad/volumes/revise-v2b/stepped_receipt.py`
→ `.out` (beside `medians.py`), which evaluates V02 §3.15.1's closed forms as revised: ST0's least stack at the least draws
and the steepest grade, the median stack (its tier-0 width × depth, its own proportion, the summit offset), the tiered
tower against its tower-family budget, and a Monte-Carlo of `tiersTruncated` (N = 4 000 per anchor) on precinct hints
sized for the row's 90th-percentile stack at `claimHi` (the T-V2-46 bar). The claim-sized rows are measured against
`claimShare × area(H)`, not a template number.

| row | anchor | ST0 least `Wmin × Dmin` (m) | median stack: tier 0 `W × D` (m), own aspect, summit offset | band | `tiersTruncated` on the p90 hint |
|---|---|---|---|---|---|
| `stepped-temple` | p / m / pr / r | 9.0 × 15.0 / 12.0 × 20.8 / 15.0 × 23.7 / 19.0 × 30.6 | 15.0 × 19.8, .76, 2.4 m / 19.0 × 26.3, .72, 3.6 m / 23.0 × 29.7, .77, 3.3 m / 30.5 × 39.3, .78, 4.4 m | `claimShare` .35–.6 × area(H) | 1.0 / 1.6 / 4.6 / 7.0 % |
| `terraced-palace` | p / m / pr / r | 9.0 × 11.3 / 9.0 × 11.3 / 19.0 × 21.8 / 23.0 × 26.3 | the top face must hold its flight (≥ `h ÷ g + landingM`), so its own aspect is 1.2–1.7 | `claimShare` .35–.6 × area(H) | 3.2 / 4.8 / 6.0 / 7.6 % |
| `stepped-monument` | p / m / pr / r | 9.0 × 17.4 / 12.0 × 22.3 / 15.0 × 27.0 / 18.0 × 31.5 | 16.5 × 23.6, .70, 3.5 m / 21.0 × 29.8, .71, 4.4 m / 25.5 × 35.6, .72, 5.1 m / 30.0 × 41.2, .73, 5.6 m | none (V04's plan cell; no ST8) | 5.1 / 6.3 / 7.3 / 7.5 % |
| `tiered-tower` | p / m / pr / r | 4.2 × 4.2 / 4.2 × 4.2 / 4.6 × 4.6 / 5.4 × 5.4 | 4.6 × 4.6 (21 m²) / 5.7 × 5.7 (32 m²) / 6.3 × 6.3 (40 m²) / 7.8 × 7.8 (61 m²) | the `tower` family's 34 / 42 / 60 / 85 m² (× 0.85) — every median stack fits | — (not claim-sized) |

**3.10.4 Structure roles** — the rows another slot reads (`<key>/<band>`) and `composition.roleKeys`, which maps each
structure name of V11 §3.6.1 to its key. The first required structure of a template is the main slot (the family chain) and needs no entry — a template with no
required structure (`burial-ground`) takes V02 §3.10.7's exemption; a later instance of the same name (a second `block`, `kiln` or `sheds`) reads the family-specific
entry. Role rows (a row states only what differs from `outbuilding`; `alias` reads another row):

| role key | families | wing width m | range length m `p / m / pr / r` | other cells |
|---|---|---|---|---|
| `shed` | single 1 | 3–4.5 | 4–8 | hip 0; hearths 0 |
| `kitchen` | single 1 | 4.5–6 | 6–10 | hip .3; hearths 1 |
| `stable` | single .8, L .2 at r (else single 1) | 5–6.5 | 8–16 / 10–18 / 12–20 / 14–24 | dormers .2 (hoist .5); hearths 0 |
| `store` | single 1 | 4.5–6 / 5–6.5 / 5–7 / 5.5–7.5 | 6–10 / 6–12 / 8–14 / 8–16 | hearths 0 |
| `staffDwelling` | alias `dwelling-detached` at its p and m cells at every band | — | — | — |
| `workshop` | single .8, L .2 | 5–6.5 / 5.5–7 / 5.5–7 / 6–7.5 | 7–12 / 8–14 / 8–14 / 9–16 | hearths 1 |
| `forge` | single 1 | 5–6.5 | 6–10 / 6–10 / 7–12 / 8–14 | porch (the open front) .5/0/0/0/.5; hearths 1 (+ the smoke stack of V02 §3.14.6) |
| `office` | single 1 | 4.5–6 | 5–9 | hearths 1 |
| `kiln` | alias `kiln-yard` | — | — | — |
| `annex` | single 1 | 5–7 | 6–12 | — |
| `brewhouse` | single .8, L .2 | 5–7 | 8–14 | hearths 1 |
| `furnace` | single 1 | 4–5 | 4–7 | hearths 1 |
| `chapterHouse` | towerHouse 1 (no range) | 7–9 | 0 | towerShape octagon .7, square .2, round .1 (a polygonal chapter house); floors the template's |
| `closeHouse` | alias `dwelling-detached` | — | — | — |
| `cloisterRing` | rectCourt 1 | 3–4 (a gallery) | 16–30 / 18–34 / 20–40 / 24–48 | floors 1–1; courtMinM 10 / 12 / 14 / 16; hip 0; dormers 0; hearths 0 |
| `range` | single 1 | 7–9 | 20–40 | hip .3; dormers .3; hearths 1–2 |
| `gatehouse` | single .7, towerHouse .3 | 6–8 | 8–12 | turret .2; its single range carries a gate hall at its middle (V02 §3.8) |
| `barn` | single .9, L .1 | 7–10 | 12–20 / 14–24 / 16–30 / 18–34 | hip .4; dormers 0; hearths 0 |
| `byre` | single 1 | 5–6.5 | 8–16 | hip .3; hearths 0 |
| `armoury` | single 1 | 6–8 | 10–16 | hearths 0 |
| `charnelHouse` | single 1 | 4–6 | 5–8 | floors 1–1; hip .3; dormers 0; porch 1/0/0/0/0; hearths 0 (a burial ground's charnel house; its bones are V04's) |
| `lychgate` (J-V2.88) | single 1 at p and m | 2.5–3.5 at p and m | 3–4.5 at p and m | at p and m a roofed gate: floors 1–1, hip 0, dormers 0, porch 1/0/0/0/0, hearths 0; at pr and r alias `gatehouse` (a burial ground's gatehouse) |
| `outbuilding` (the last step of every other slot's chain) | single 1 | 4.5–6 (a barn 7–10) | 6–20 | blocks 0; towers 0; back 0 (a barn .2); hip .3; dormers 0; porch 1/0/0/0/0; hearths 0 (a kitchen or brewhouse 1) |

`composition.roleKeys` (family `*` = any family; a family-specific row wins; `attach` `slot` unless named):

| family | V11 structure names | key |
|---|---|---|
| `*` | `shed`, `sheds` | `shed` |
| `*` | `kitchen` | `kitchen` |
| `*` | `stable`, `stables` | `stable` |
| `*` | `store`, `stores` | `store` |
| `*` | `dwelling (staff)`, `journeymen` | `staffDwelling` |
| `*` | `workshop` | `workshop` |
| `*` | `forge` | `forge` |
| `workshop-yard` | `forge or workshop` | `forge` where the class's profile `emits.fire` ≥ 1, else `workshop` |
| `*` | `house` | `dwelling-detached` (a family row) |
| `*` | `office` | `office` |
| `kiln-yard` | `kiln` (the second) | `kiln` |
| `*` | `annex` | `annex` |
| `*` | `brewhouse` | `brewhouse` |
| `*` | `furnace` | `furnace` |
| `cathedral` | `chapter house` · `close houses` · `cloister` | `chapterHouse` · `closeHouse` · `cloisterRing` |
| `cloister` | `cloister ring` · `ranges` · `gatehouse` · `barns` | `cloisterRing` · `range` · `gatehouse` · `barn` |
| `*` | `gatehouse` · `barn`, `barns` · `byre` · `armoury` | `gatehouse` · `barn` · `byre` · `armoury` |
| `barracks` | `block` (the second) | `barracks` (the family row) |
| `extractive` | `hut` | `hovel` (the family row) |
| `landing-yard` | `sheds` (the second and third) | `landing-yard` (the family row) |
| `court-institution` | `chapel` | `chapel` (the family row) |
| `court-institution` | `ranges` | `absorbed`, **attach `main`** (M8b) |
| `church` | `tower` · `porch` | `westTower` · `churchPorch`, **attach `main`** |
| `cathedral` | `towers` | `westTower`, **attach `main`** |
| `mill` | `wheel or sails` | `sails` for the `windmill` class, else `wheel`, **attach `main`** |
| `*` | `yard (open)`, `yard (parade)`, `yard`, `pits or vats (yard parts)`, `stacks (yard parts)`, `spoil (yard part)`, `slip or stage (yard part)` | `yardPart` (no building; S11's yard partition) |
| `tavern-row` | `cellar store` | `basement` (the class's cellar row holds it) |
| `burial-ground` | `mortuary chapel` · `charnel house` · `gatehouse or lychgate` | `burial-ground` (the family row) · `charnelHouse` · `lychgate` |
| `fort` | `tower` (the second) · `gate` · `range (barracks)` | `tower` (the family row) · `gatehouse` · `barracks` (the family row) |
| `arena` | `gate` | `absorbed`, **attach `main`** (M8b: the oval's gate passages) |

The `castle` family's parts are the base's §4.2 S3 construction and take no role rows.

**3.10.5 `composition.classFamily`** — the composition key of each of V07's village classes, keyed by its **`v.` key** as
V07 §2.4 keys it (V11 §2.9; J-V7.95); V07 keeps this table as the one source of the village classes' composition keys
(J-V7.82, as amended by V07's round 2: each `v.` row also names a V11 §3.6.1 `templateFamily` for its budget rows, read by
the chain's step 4 only where this table's step-3 row breaks the arrangement law; X13). It is read also by V03's
programme resolution (V03 A1 (3)) and its slot order, for a `v.` key without a programme row (V03 §2.4; J-V3.111), so a
change of a row's key changes that village building's rooms as well as its massing. A
`v.` key names a village-only class and is read wherever a building of that class stands, at any rung (a
standing building keeps its class across V07 §3.12's hand-offs). A town class never reads this table: at a village rung it
plays its `villageForm`'s `v.` class (V11 §3.22), which reads its row here, and a town class with no village form plays
itself through its `templateFamily` (the chain's step 4). Reconciliation round 2 (J-V2.96) re-keyed the
rows by the `v.` keys and withdrew the former `scope` column, which re-dressed the town classes of the same word:

| class (V07 §2.4) | key |
|---|---|
| `v.hovel` · `v.cottage` · `v.chapel` · `v.inn` · `v.watchtower` | `hovel` · `cottage` (the override) · `chapel` · `inn-compound` · `tower` |
| `v.longhouse` | `v.longhouse` (its own override row, V02 §3.10.3, which the chain's step 2 reads first) |
| `v.farmstead` · `v.yeoman_house` · `v.manor_house` · `v.parsonage` · `v.reeve_house` | `farm` · `dwelling-compound` · `manor` · `dwelling-compound` · `dwelling-compound` |
| `v.parish_church` · `v.tithe_barn` | `church` · `barn` |
| `v.watermill` · `v.windmill` | `watermill` · `windmill` (the overrides) |
| `v.smithy` · `v.potter` · `v.tannery` | `workshop-yard` · `kiln-yard` · `works-noxious` |
| `v.alehouse` · `v.shop` · `v.bakehouse` | `dwelling-detached` · `dwelling-detached` · `kitchen` |
| `v.landing` · `v.wood_yard` · `v.charcoal_pit` | `landing-yard` · `yard` · `hovel` |
| `v.pound` | `yardPart` — no building ("a walled pen", V07) |

**3.10.6 The default rows, the underground rows and the heights columns.** Every arrangement has a full default row
(`default.<arrangement>/<band>`), so no chain ends on an undefined cell:

| row | cells |
|---|---|
| `default.row` | families row 1; back .1 / .3 / .5 / .6; hip .1; dormers .2 / .4 / .8 / 1.0; porch .9/0/0/0/.1 · .7/.1/0/0/.2 · .5/.2/0/0/.3 · .4/.3/0/0/.3; hearths 1 / 1 / 2 / 2 |
| `default.detached`, `default.compound` | families single 1; wing width 5–6.5; range length 8–14; blocks 0; towers 0 (0); back .2; hip .3; dormers 0 / .3 / .6 / .8; porch .8/.2/0/0/0; hearths 1 |
| `default.institution` | as `default.compound`, with families single .8, T .2 at pr and r |
| `default.hovel`, `default.cluster` | alias `hovel`, `cluster` |
| `default.underground` (every `<prefix>@underground` row aliases it, with the prefix's wing width and range length) | families single 1; roof `flat` forced; blocks 0; towers 0; back 0; dormers 0; porch 1/0/0/0/0; hearths 0 |

**Heights (item 427; J-V2.33).** The storey heights, the roof pitch, `towerStoreys`, `spireFactor` and item 427's three
columns `attic`, `parapetCm` and `towerStoreyCm` are V11's `HeightsRow` (V11 §3.6.4, which writes the three columns' values
once; SCC-20), read unchanged. The reading rule is this volume's: `attic` true admits dormers on a one-storey wing (V02 §3.7);
`parapetCm` rises above a flat roof's eave (M11, M12) and is the parapet `deckLevel` subtracts; `towerStoreyCm`, where the
row gives it, is a church's or cathedral's tower storey, and where it is absent a tower's storeys are `storeyCm.upper`;
`fort` reads the `tower` row and `arena` the `hall` row (V11 §3.6.1).

**3.10.7 The arrangement law and the load checks (T-V2-33).** A row read under a `row` arrangement may carry only the
family `row`; under `compound`, `detached`, `hovel` or `institution` never `row`; under `cluster` or `tents` only
`shelter`. The chain skips a lawless row (V02 §3.2 step 2). At load the compiler of `composition.json` also checks:
every row's family weights non-negative with a positive sum at every band after `fantasyShapes` off; every `alias` acyclic
and naming an existing prefix; every structure name of every compiled template resolved by `roleKeys` or as its main
slot — **a template with no required structure** (`burial-ground`; J-V2.88) has no main slot
by name: each drawn structure is an ordinary slot reading its `roleKeys` key, the first drawn in the template's structure
order is the main building for S11's entrance and household rules (V11 §3.6.5: the mortuary chapel "main when present"), a
template that draws none has no building (open ground), and every one of its names must resolve by `roleKeys`; every class of the compiled roster (town, city, generic, custom archetype and `v.` village) resolved at every band to a
row above `default.*`, except the classes whose template has no building (`market`, `fair_ground`, `druid_grove`, `v.pound`);
every `v.` class of the compiled roster has exactly one `composition.classFamily` row, and every row's `cls` names a `v.` class
of the roster;
a failure is a table error naming the key (§7.6's refusal), never a silent default. The stepped and deck rows add V2
§3.15.4's and V02 §3.16's checks. **Every family a row names has its `MassingFamilyRow`** (second
revision, V2C-65 (3)), and a row naming `ovalCourt` carries `caveaM` and a positive `courtMinM`.

**3.10.8 The `FM` building-scope preset (item 376).** Cells of `composition.json` that carry a `presets.FM` entry
(V11 §3.24.0's item-110 chance and offer cells carry theirs, 0, so no generated stepped or deck building enters the
`FM` goldens; reconciliation round 3, SCC-52): the `manor`,
`dwelling-compound`, `hall` and `dwelling-detached` rich rows' `families` — the five Fantasy Manor families
(`regularCourt`, `starCourt`, `chordArc`, `rectCourt`, `gridWalk`) at weight 1 each and every other family 0, provenance
`ref:Fantasy Manor build 890 layout families (code)`, P21 (item 59); `fantasyShapes` on; `sunBias` 0.5; and,
**calibrated to Fantasy Manor's measured outputs, not copied from its code** — `blocks`, `towers`, `towerOnBlock`,
`towerShape` (the square share), `dormer.perTenM`, the porch weights with `halfRound`, `secondaryPorch`, `walkStop` and
`walkFree`, and the blocks' `WingRoleRow.hipInset` (0.25 until calibrated, pre-decided fallback 0.5) — each set at M6c by
**V12's `reference` run against Fantasy Manor** (`layer: { preset: 'FM' }`, V12 §3.7.1 (c), §3.7.2 (3)) on V12's `fm.*`
metrics, the free-frame harness (V02 §7.4) its fixture and each run holding at most four cells (V12 §3.7.2), so that the
measured rates of `captures/manor/README-frequencies.md` §3–§4 are reproduced (provenance `ref:Fantasy Manor build 890
element rates (measured)`, written into the cells' `presets.FM` entries with the defaults untouched, V12 §3.7.6); a run
rejected applies the register entry's pre-decided fallback (`fallback-applied`), else the entry is `not-achieved` and
reported to the owner (V12 §3.7.5, §3.11). No V02-private tuner exists. Our realism rules stay on under `FM` (item 59's KEEP OURS): wings in the collision set, a street-facing
main door, metric scale, the plot. **The `FM` building look** a user may choose (item 376; V09's style panel, a
cross-volume item) dresses the drawing only: roof hue weathered per building at `w` 0.15 (§8.2's `weathering`), cone
facets doubled for drawing only, and two §8.10 decoration rows active only in that look — a stepping-stone path from the
main door to the frame's access side and grass tufts at re-entrant corners (V02 §5.3).

**3.10.9 Shared cells, the small tables and the constants.** A cell no row names: `courtMinM` 6; `uOpenFront` .2;
`crossWing` fwd 1.5–3 m, back 0–3 m; `towerShape` round .7, square .25, octagon .05; `towerRadiusW` .35–.5;
`towerStoreyDelta` 1–2; `blockStoreyDelta` 0–1; `towerOnBlock` 0; `towerFlat` 0; `westTowers` 0–0; `crossingTower` 0;
`gableToStreetMaxFrontM` 6 / 6.5 / 7.5 / 8; `arcade` false; `cupola` 0 (kinds dome .4, tip .3, pyramid .3); `axis`
`frontage`; `dormer.widthM` 1.0–1.6; `dormer.kinds` dormer .7, wallGable .3; `dormer.entranceGable` 0 / .05 / .15 / .2;
`secondaryPorch` 0; `rooms.hall` false; `rooms.hallLenShare` .35–.55; `rooms.chapel` 0; `rooms.gateHallM` 3–4.5;
`coverageMax` .8 (closed families' rows .65); `claimShare` absent (the constants `claimLo`, `claimHi` for a claim-sized
template); `caveaM` absent. These carry the **diversity ladder**: the families widen from one range to
courts, towers appear only toward the rich rows, dormers, porches and back ranges thicken with the value, and each family
keeps its own ladder, so a poor smith's workshop-yard house is a single range with a shed outshot and a rich armourer's
an L round a work yard (item 19's example, reached through the template's specialisation and its composition key).

**`WingRoleRow` defaults.** `main`: storeys 0, through 2, dormers yes, porch yes, hipInset .5; `range`: 0, through 1,
dormers yes, porch yes; `cross`: 0–1, through 3, dormers yes, porch yes; `gate`: 0, through 2, dormers yes, porch yes;
`block`: the row's `blockStoreyDelta`, roof `hip` only (item 59), hipInset .5 (`FM` .25, calibrated), through 4, dormers
yes, porch yes; `back`: −1, through 0, dormers no, porch no; `service`: −1 to 0, through 0, dormers no, porch no; `tower`,
`turret`: the row's `towerStoreyDelta`, roof by shape, through 5 (a square tower's ring stays whole at a butt joint),
dormers no, porch no; `part`: the template's, dormers no, porch yes (a template's door); `shelter`: 0, dormers no, porch
no. Ranges read their gable or hip from `hipShare`. The roles `tier`, `shrine` and `stair`: V02 §2.6.

**`MassingFamilyRow` rows added by the item 110 fold and the second revision (V2C-65 (1), V2C-59).** `stepped`: `minFrameW`
[0, 0] (ST0's test instead), `wings` [2, 9] (the tiers), `closed` false, `joints` `butt` (tier 0 and stair 0; the stacked
wings are ST6's), `fantasy` false, provenance own. `ovalCourt`: `minFrameW` [0, 0] (its own M3 test), `wings` [24, 40] (two
rings of 12–20), `closed` true, `joints` `mitre`, `fantasy` false, provenance own.

**`MassingGrowthRow` defaults** (the mutator's lattice; V02 §3.9's table gives each pair's construction): from `single` to
any of `L`, `T`, `H`, `U`, `cross`, `rectCourt`, `towerHouse`, `gridWalk`: keep `main` (anchor: the front for `L`, `U` and `rectCourt`; the hall
for `T` and `H`; the main range for `cross`; either for `gridWalk`); `L → U | rectCourt`: `all`; `L → T | H`: `main`;
`T → H`: `all`; `U → rectCourt`: `all`; every reverse (`rectCourt → U`, `U → L`, `H → T`, `T → single`, `L → single`,
`cross → single`, …): `mainAndOne`, or `main` when the target has one range. Any pair into or out of `plotRing` or a
fantasy family — or `ovalCourt` (the kept range matched against one façade chord) — reads `keep: 'main'`, anchor `either`, under V02 §3.9's ± 15 % rule. `row → row`: `all`; a row building
keeps its family through every change that keeps the `row` arrangement (J-V2.13); V02 §3.9's W3b takes the rest.
**Item 110 fold:** `single → stepped` keep `main` (anchor front), `stepped → single` keep `main`, `stepped → stepped` keep
`all` (V02 §3.15.5); every other pair into or out of `stepped` passes through `single`.

**`TowerShapeRow`**: round — sides 12 below 2 m radius, 16 below 4 m, 24 above; roof `cone`, pitch (rise over radius)
1.5. Square — 4 sides, `pyramid`, 1.0. Octagon — 8 sides, `pyramid`, 1.2. **`PorchKindRow`** (depth × width m, storeys,
clearance 0.3 m): `hood` 0.4–0.8 × 1.2–2.0, 0 storeys (at 0.8 of the ground storey); `gabled` 1.5–3.0 × 2.0–3.5, 1;
`twoStorey` 2.5–4.0 × 2.5–4.0, 2; `recessed` 1.0–1.8 × 1.2–2.4, inside the footprint; `halfRound` depth = width ÷ 2 ×
2.0–3.5, 1 (a half-cone roof). **`DormerKindRow`** (depth share of the half span, at the eave, least pitch, gap):
`dormer` 0.45, no, 0.7, 0.4 m; `wallGable` 0.5, yes; `hoist` 0.4, yes; `entranceGable` 0.7, yes.

**Constants not in a row** (each a table cell of `composition.json`'s `constants` row; `own`; calibratable):

| constant | default | read by |
|---|---|---|
| `mitreMinDeg` | 60° | M5 (oblique paths) |
| `collinearMergeDeg` | 178° | M5 |
| `wMinM`, `wMinShare` | 3 m, 0.8 | V02 §3.4, M3 |
| `walkStop`, `walkFree`, `walkGapM` | 0.12, 0, 2 m (the gap `max(walkGapM, 0.3w)`) | M5 `gridWalk`, M3 |
| `plotRingMaxVertices`, `plotRingTolW`, `plotRingMinEdgeW` | 8, 0.25, 1.5 | M5 `plotRing` |
| `blockLenW`, `blockDepthW`, `blockMinPiece`, `blockGapM` | [1, 1.6], [1, 1.4], `max(w/2, 2 m)`, 1 m | M7 |
| `towerCentreOut`, `towerShare`, `turretShare`, `turretRadiusM`, `towerGapM`, `towerOnBlockInsetM`, `westTowerW` | 0.35 r, [0.2, 0.6], [0.25, 0.75], [1.2, 1.8] m, 0.5 m, 0.3 m, [0.45, 0.6] | M8 |
| `wheelWidthM`, `wheelReachM`, `churchPorchWidthM`, `churchPorchDepthM` | [2, 3] m, 4 m, [3, 4.5] m, [3, 5] m | M8b |
| `axisSlope`, `axisSampleM`, `axisWaterM` | 3 %, 2 m, 50 m | M2 |
| `sunBias` | 0.7 (`extension`; 0.5 in the `MFCG`, `FTG`, `VG` and `FM` presets — the `MFCG`, `FTG` and `VG` entries `own`, note `fixed: the parity neutral` (V11 §2.2's rule (a)); the `FM` entry code-read (V02 §3.10.10); reconciliation round 4, SCC-85) | M5's sunlit choice |
| `backMinWidthM`, `backShedMaxWidthM`, `backFarMarginM`, `backRunTolDeg` | 3 m, 3.5 m, 1 m, 5° | M9 |
| `sizeLo`, `sizeHi`, `mainShareDefault` | 0.9, 1.1, 0.6 | M3, M10 |
| `sizeBandLo`, `sizeBandHi` | 0.7, 1.45 (`own`, note `fixed: the mirror of V11 §3.6.1's derivation ratios, changed only in the change that changes those` — not calibratable, the one exception to this table's heading) | M10 |
| `pitchClamp` | [0.3, 1.8] | M11 |
| `entranceHintMinCos` | cos 60° | M2, M13, V02 §3.7 |
| `bayM`, `endMarginM`, `dormerSetbackM` | 3.6 m, 1.2 m, 0.3 m | V02 §3.7 |
| `hallDoorBackM`, `gateHallJointGapM` | 1.5 m, 0.5 m | V02 §3.8 |
| `dormerEaveTol` | ± 10 % | V02 §3.9 W8, V02 §2.5 |
| `domeRise` | 1.0 (rise ÷ the ring's mean radius) | V02 §5.2 |
| `viewBatchMs` | 16 ms of pool time | V02 §3.11, V02 §6.2 |
| `crypt.clearCm`, `crypt.freeboardCm` | 250 cm, 30 cm | V02 §3.14.5 (item 226) |
| `massing.composed` (option, `extension` over both) | on | V02 §3.1 |
| `fantasyShapes` (model option; §7.8 row, item 402) | off | V02 §3.3 |
| `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare` (item 110 fold; `stairGradeMax` 1.3 since the second revision, V2C-49 (5)) | 3 m, 1 m, 0.3 m, 1.3, 0.6 | V02 §3.15.1 |
| `claimLo`, `claimHi` (second revision, V2C-49 (3)) | 0.35, 0.6 | `slotBand` for a claim-sized template without a row `claimShare` |
| `ovalSides`, `ovalAxisRatio`, `ovalMajorFactor` | 12 below a 10 m mean semi-axis, 16 below 20 m, 20 above; [1.15, 1.4]; [0.85, 1] | V02 §3.5 M3, M5 |
| `terrace.wallBandCm` | 250 cm (one refined raster cell) | item 231's wall-side sample |
| `vaultClampCm` (`raised.clearCm` withdrawn by reconciliation round 1) | 30 cm | M11 |
| `riserMaxCm` (`treadM` withdrawn by reconciliation round 1) | 20 cm | `stairTreads` (V02 §2.6) |
| `deck.fallbackM2`, `deck.fallbackFloors` | [20, 60] m², 2 | V02 §3.16, until V11's `deck` row (X16) |

**3.10.10 The register lines of `composition.json` (J-V2.101).** Every calibratable cell
of this volume's tables takes its calibration register entry (V12 §3.11; V02 §2.3) from exactly one line below, written by
the seat landing the milestone that ships the cell; a line ending "and every other …" binds the rest of its family, as V12
§3.11's lines do. `bar.T-V2-<n>` is V12's bar-metric family (the verdict statistic of one registered owner bar;
SCC-56, X33); the other metrics are V12 §3.4.2's. "The panel rule" is V12 §3.11's: this volume states no second value
for these cells, so a group rated No leaves the entry `not-achieved`, reported to the owner as a table defect, and an
unrated group leaves it *provisional — not rated*.

**The bars' registrations** (J-V2.102). Each bar a line below names as `bar.T-V2-<n>` is
registered by the seat landing the milestone that writes that line's entry (V02 §2.3: the milestone that ships the cell),
in the same change, as a V12 `BenchBarDef` (V12 §2.1; X-V12-15) — `id` the bar id (`'T-V2-22'` …), `owner` `'V02'`,
`statistic` the bar's own quantity as the table states it, `stages` `['S11']` (the stage that reads `composition.json`, the
composer's draws keyed by its stage id, V02 §3.12 — so V12 §3.7.2 (4) admits exactly this volume's cells), `towns` the
bar's fixtures with their settings (their rungs and water as V02 §7.1 builds them; each setting's `preset` `'default'`, V12 §2.1's `PresetArm` — no parity
preset; SCC-R2C-7; `perSetting` the bar's
own count where it states one, else the fixture family's — B-CITY's per rung, §13.2, one for a hand-built fixture),
`tier` the bar's CI tier (V02 §7's two CI paragraphs), `run` the check V02 §7 states — unless a `StatBarSpec` or
`NullModelSpec` of V12's bar map already carries it as `id` or `ownerBar` (none does at this round). A bar V02 §7 runs in
two tiers on two fixture sets registers once per tier under the same `id` (V12 §2.1: `bar.<barId>` is then the vector of
both, passing only when each passes); a bar named by two lines registers once, with the earlier line. In T-V2-36, T-V2-42
and T-V2-46 — the bars whose clauses wait on a later landing — a clause whose subject the build does not yet produce reads
−1 (every value of theirs is a share, a ratio or 1 / 0, never negative) and is left out of the verdict, which is
`notApplicable` when no clause applies; the entry it confirms is not due before that landing (V12 §3.11's *Milestone exits*).

| bar | `statistic` — its clauses in the bar's order (`unit`) | `towns` | `tier` | registered by (the line) |
|---|---|---|---|---|
| T-V2-22 | V02 §6.1's four times, then V02 §6.2's four (`ms`) | B-CITY, every rung | `nightly` | the M6b seat (`viewBatchMs`) |
| T-V2-28 | the share of cluster structures and `@underground` buildings meeting the one-wing, one-roof rule (`share`) | B-MASS | `pr` | the M6a seat (the crypt line; its cells ship in M6a's `composition.json`) |
| T-V2-29 | the least within-class Spearman, the non-decreasing check (1 or 0), `hovel`'s `single` share, the rich manors' court-family share, the towers standing where no row allows one (`none`) | B-CITY, every rung | `nightly` | the M6a seat (the geometry rows) |
| T-V2-30 | the share of buildings inside `[0.9 × lo, 1.1 × hi]` (`share`) | B-MASS against the compiled V11 templates; B-CITY, every rung | `pr`; `nightly` — two registrations | the M6a seat (the geometry rows; the small tables' line reads the same bar) |
| T-V2-32 | the short-axis ridge share (`share`) | B-CITY-lite | `nightly` | the M6c seat (`gableToStreetMaxFrontM`) |
| T-V2-36 | each clause 1 or 0 (`none`); −1 until V04's access draw and the crypt derivation (M6-U) land (V02 §8.1, R8) | B-MASS's cathedrals on `dry`, `low`, `damp` and `flood` plots and its stepped great temples on `flood` | `nightly` | the M6a seat (the crypt line) |
| T-V2-37 | the south-facing share at `sunBias` 0.7, then at 0.5 (`share`) | B-MASS's flat northern site (latitude 50°, 200 slots) | `pr` | the M6a seat (`sunBias`; its cell ships with M5) |
| T-V2-42 | each landmark clause 1 or 0, then the arena's hull aspect, its court's share of the hull, its floor's `court` typing (1 or 0) and its closure (1 or 0) (`none`); the landmark clauses −1 before M6a's composed massing | B-MASS (its market hall, kiln yard, church with a transept, rich hall, cathedrals and arena sub-fixture) and B-PLAN; the second known-city fixture | `pr`; `milestone` — two registrations | the M3a-V2 seat (the arena line) |
| T-V2-46 | the `tiersTruncated` share per anchor, then each other clause 1 or 0 (`none`); the M6a byte-identity clause −1 before M6a | B-MASS's stepped sub-fixture with the receipt's precinct hints (200 per anchor); the second known-city fixture | `pr`; `milestone` — two registrations | the M3a-V2 seat (the stepped line) |
| T-V2-47 | the in-band share, then each other clause 1 or 0 (`none`) | B-MASS's deck sub-fixture; the second known-city fixture | `pr`; `milestone` — two registrations | the M3a-V2 seat (the `@deck` line) |
| T-V2-51 | clauses (a) – (c), each the share of buildings holding it (`share`) | the terrace-wall sub-fixture; the second known-city fixture's terraced wards | `pr`; `milestone` — two registrations | the M3a-V2 seat (`terrace.wallBandCm`) |

| cells — one entry each | method, due | metric | when it cannot confirm |
|---|---|---|---|
| the template-family, class-override, structure-role and default rows' geometry cells at the four anchors (V02 §3.10.2 – §3.10.6: `families` weights, `wingWidthM`, `rangeLenM`, `crossWing`, `courtMinM`, `uOpenFront`, `blocks`, `towers`, `towerShape`, `towerRadiusW`, the storey deltas, `towerFlat`, `westTowers`, `crossingTower`, `gateTower`, `turret`, `backRange`, `backLenM`, `backWidthM`, `hipShare`, `cupola`, `dormer`, `porch`, `secondaryPorch`, `rooms`, `floors`, `hearths`, `coverageMax`), the `@underground` rows, V02 §3.10.9's shared cells, and every other calibratable cell of those rows no line below names | `measure` at M6a (T-V2-29's ladder and T-V2-30's budget share on B-CITY, V02 §3.10.3's receipt re-run on the compiled V11 templates), then `panel` at M6 (V02 §7.5 (2), the ladder street), then `corpus` possibility at M-CAL (§13.9) | `bldg.area`, `bar.T-V2-29`, `bar.T-V2-30` | M10's band and shrink keep each building inside its budget whatever the row (V02 §3.5), and SP-V2-1's rich join step (V02 §8.2); otherwise the panel rule |
| `gableToStreetMaxFrontM` (M12's frontage law) | `measure` at M6c (T-V2-32, the NG ridge share, on B-CITY-lite) | `bar.T-V2-32` | none stated: a miss is `not-achieved`, reported; the NG draw-style sheet keeps its own fallback (X14) |
| the `FM` preset's measured-rate entries — `presets.FM` of `blocks`, `towers`, `towerOnBlock`, `towerShape` (the square share), `dormer.perTenM`, the porch weights with `halfRound`, `secondaryPorch`, `walkStop`, `walkFree` and the blocks' `WingRoleRow.hipInset` (V02 §3.10.8) | `reference` run against Fantasy Manor at M6c (`layer: { preset: 'FM' }`, V12 §3.7.2 (3); SP-V2-3), the free-frame harness its fixture | `fm.*` | `hipInset` 0.5 (`fallback-applied`); every other cell `not-achieved`, reported to the owner (V12 §3.7.5) |
| the code-read `FM` entries — the four rich rows' `families` (the five Fantasy Manor families at weight 1, P21) and `sunBias` 0.5 | no entry: their `ref:Fantasy Manor build 890 … (code)` provenance passes V12 §3.11's lint; no run moves them | — | — |
| the mirror constants — `sizeBandLo`, `sizeBandHi` | no entry: `own` with the note `fixed: the mirror of V11 §3.6.1's derivation ratios, changed only in the change that changes those` passes V12 §3.11's lint; no run moves them — a change to V11's ratios changes them in the same change | — | — |
| the parity-neutral entries — `sunBias` 0.5 under `MFCG`, `FTG` and `VG` | no entry: `own` with the note `fixed: the parity neutral` (V11 §2.2's rule (a)) passes V12 §3.11's lint; no run moves them (V12 §3.7.2 (3)) | — | — |
| the stepped rows' `tiers` cells (`count`, `shape`, `insetM`, `solid` and the heights, `taper`, `lowerRoof`, `top`, `stairs`, `stairWidthM`, `stairGrade`, `shrineInsetShare`), `claimShare`, `TierCells.heights`, and the constants `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare`, `riserMaxCm`, `claimLo`, `claimHi` | `measure` at M3a-V2 (T-V2-46's truncation share ≤ 10 % on the receipt's precinct hints; T-V2-44, T-V2-45), then `panel` at M4 (M4-110's stepped-temple item, V12 §3.11's stepped-tiers line) and at M6 (V02 §7.5 (3)) | `tier.count`, `bar.T-V2-46` | the per-building fallbacks V02 §3.15.1 lays (the stair fallback `axial → flights → internal`, ST8's single, each reported) and V02 §6.5's truncation above seven tiers; otherwise the panel rule |
| the `arena` row (`caveaM`, `courtMinM`, `claimShare`) and `ovalSides`, `ovalAxisRatio`, `ovalMajorFactor` | `measure` at M3a-V2 (T-V2-42's arena bar on B-MASS and the second known-city fixture), then `panel` at M6 (V02 §7.5 (3), the amphitheatre) | `bar.T-V2-42` | M3 removes `ovalCourt` where the least oval does not fit and M14 lays the fallback, reported (X27); otherwise the panel rule |
| the `@deck` rows and the stand-ins `deck.fallbackM2`, `deck.fallbackFloors` | `measure` at M3a-V2 (T-V2-47: ≥ 95 % inside the deck band), then `panel` at M4 (M4-110, V12 §3.11's `deck` line) | `deck.buildings`, `bar.T-V2-47` | the panel rule; the two stand-ins close `fixed: superseded by V11's deck row` when that row lands (V12 §3.11) |
| the small tables — `WingRoleRow` (`storeyDelta`, `hipInset` outside `FM`), `MassingFamilyRow` (`minFrameW`, `wings` of our own families; the five Fantasy Manor families' rows keep their `ref:` provenance, P21, and take no entry), `TowerShapeRow`, `PorchKindRow` (shipped at M3a-V2 for V01's entrance reserve, so its entries are written by the M3a-V2 seat and fall due at the measure this line names), `DormerKindRow` — and the massing constants of V02 §3.10.9 (`mitreMinDeg`, `collinearMergeDeg`, `wMinM`, `wMinShare`, `walkStop`, `walkFree`, `walkGapM`, the `plotRing…`, `block…`, `tower…`, `turret…`, `westTowerW`, M8b's four, `axisSlope`, `axisSampleM`, `axisWaterM`, the `back…` four, `sizeLo`, `sizeHi`, `mainShareDefault`, `pitchClamp`, `entranceHintMinCos`, `bayM`, `endMarginM`, `dormerSetbackM`, `hallDoorBackM`, `gateHallJointGapM`, `dormerEaveTol`, `domeRise`), and every other calibratable constant no line names | `measure` at M6a and M6b (SP-V2-1's feasibility share, ≥ 40 % of rich manor plots admitting a court; T-V2-3, T-V2-9 – T-V2-12, T-V2-30), then `panel` at M6 (V02 §7.5 (1)–(2)) | `bldg.area`, `bar.T-V2-30` | SP-V2-1's rich join step (V02 §8.2); otherwise the panel rule |
| `sunBias` (0.7, `extension`) | `panel` at M6 (V02 §7.5 (2); T-V2-37 checks only that the draw reads it), then `corpus` possibility at M-CAL | `bar.T-V2-37` | the panel rule |
| `crypt.clearCm`, `crypt.freeboardCm`, `vaultClampCm` | `measure` by T-V2-36 and T-V2-28 from the landing of V04's access draw, then `panel` at U5 (V4-U5, `realism`; its framing holds the cathedral's crypt, V12 §3.11's `under.catacomb` line) | `crypt.present`, `bar.T-V2-36`, `bar.T-V2-28` | the panel rule |
| `terrace.wallBandCm` | `measure` at M3a-V2 (T-V2-51 (a) – (c) on the terrace-wall sub-fixture and the second known-city fixture), then `panel` at M4 (M4-110's terrace item) | `bar.T-V2-51` | the panel rule |
| `viewBatchMs` | `measure` at M6b (V02 §6.2's measurement; T-V2-22) | `time.model`, `bar.T-V2-22` | V02 §6.2's fallbacks |
| the options `massing.composed` and `fantasyShapes` | no entry: each closes with the note `fixed: an option` (V02 §3.1; the owner's fantasy-as-toggles, D-7, J-V2.5) | — | — |
| the keys and laws — `composition.roleKeys`, `composition.classFamily`, `MassingGrowthRow`'s `keep` and `anchor`, `CompositionRow.axis` and `arcade`, the arrangement law | not calibratable (keys, enumerations and laws, as V12 §3.11 reads V11's `ColumnSpec`): no entry | — | — |

### 3.11 Elaboration by click, staleness and the canonical prior

* **City band.** The massing only (eager): every footprint with its wings and heights, as the base's first paint.
* **District band and finer, before any click.** The roofscape of the massing (V02 §5.2) — ridges, hips, valleys, tower
  cones and spires, the cupola — drawn lazily per tile from model data (§8.5's lazy list: "roof constructions and
  hatching"); no composition is needed for it, and the district band requests none.
* **A neighbourhood click** (II.4, V01), an **outline close-up** (V01, V01 §3.8.9: the buildings inside the
  outline, centre-out from the outline's centroid; S23-29), or a visible tile's request **at the neighbourhood band or finer** under
  `elaborate: 'view'`: the derivation pool runs `compose(…, 'wings')` for each building of the neighbourhood (or tile),
  **centre-out from the click point** (or the tile's centre), each result a cache chunk and its record `current`; the tile
  worker re-rasters the affected tiles as the chunks arrive (`DisplayDelta`, §8.9) — dormers, porches, entrance gables
  appear. A tile's request is sliced into batches of at most `viewBatchMs` (16 ms of pool time, §12.7's bound) when it
  holds more buildings than one batch composes; the tile draws the massing's roofscape until each batch lands (V02 §6.2).
* **A building click** from the neighbourhood band down: `wings` (if absent or stale), then `rooms`, then `plan` (V03),
  each recorded. At the city and district bands a click on a building is the district's click (V01, V01 §3.8.1: its
  close-up and the `wings` rung), which selects the building without deriving `rooms` or `plan`; a double-click reaches the
  plan at any band (V03 §4.5).
* **What makes the `wings` rung stale — `wingsInputs` (item 261; J-V2.52).** Its recorded inputs are exactly: a digest of
  the building's **base wings** (keys, roles, rings, heights, roofs), the **main entrance** (its wing key, side and offset)
  and any entrance a secondary porch stands at, `Building.massing`, the **slices of `composition.json`** it read, and —
  for the porch's space — the **plot's ring with the footprints of the plot's other buildings and the yard parts** that lie
  within `porch.depthM[1] + clearanceM` of the main entrance (and of the secondary porch's entrance). Nothing else: a
  relet, a household move, a use change, an access, a sub-location, a band drift, a Works stage or a material change
  leaves the rung `current` and draws no change marker (T-V2-21), because dormers and the porch read none of them. A dossier
  event of items 18, 22 or 31 reaches the rung only through those inputs.
* **What makes the `rooms` rung stale.** `wingsInputs`, plus the **occupants' band row and value**, the **household
  count** (V02 §3.8; item 261), the class's programme `hall` row, and its own slices — so a band change or a re-division
  re-derives the composer's rooms and the plan's re-cut starts from the rooms the new band admits.
* **The canonical prior.** An unstored composition has none to carry: its re-derivation is a pure function of the
  committed massing, and its draws are keyed per wing key (V02 §3.12), so every wing the change kept recomposes exactly as
  before — the least-disruption property item 18 asks of a mutation, obtained by construction. A stored composition is
  re-matched inside the changing event (V02 §3.9 W8) and is never stale (its state is `edited`).
* **Re-rolls.** `regenerate` with `rung: 'wings'` advances `#wings`: dormer counts, kinds and the porches re-draw; the
  massing, a model fact, is unchanged (T-V2-14). `rung: 'rooms'` advances `#rooms`: the hall's length, the chapel. New
  random on the building's plot or block re-derives its massing (S11) with the plot's reroll (§6.1).

### 3.12 Determinism

* **Concerns** (item 341; each with the next append-only u16 id, so no other key moves): `massing` — a geometry
  concern, non-rerollable by salt, attempt cap 3, readers S11 and every operator that re-derives S11 on a plot; keyed by
  the building's entity key (its lineage, minted by S11) with S11's stage id; creation indices 0 (family and width, the
  sunlit coins' base draws), 1 (the family's lengths, sides and walk), 2 (blocks), 3 (towers, the turret and the
  template towers), 4 (the back range and M8b's attached wings), 5 (floors, then the tower storeys), 6 (roofs, the
  towers' flat tops), 7 (the cupola), and — drawn only by the `stepped` family, through `drawTiers` — 8
  (the tiers' count, shape, step, top, stair width, stair grade and shrine; no aspect since the second revision, ST2
  deriving it) and 9 (the tiers' heights, in tier order) — so adding a block never shifts a tower's draw. `ovalCourt`
  draws its width at index 0 and its semi-axis factor, axis ratio and seating depth at index 1. `compose.dormers`, `compose.porch` —
  geometry concerns, non-rerollable by salt, attempt cap 0, keyed with `#wings` folded into the building's key (§6.1's
  rung rule); creation index `2 × key + eave` for a dormer row, 0 for the porch, 1 for the secondary porch.
  `compose.rooms` — keyed with `#wings` and `#rooms` folded; creation index 0 (hall), 1 (gate hall), 2 (chapel).
* **Draws in edits and mutations (stated once; J-V2.18).** The designation mutator draws on the base's `siteplan.mutate`:
  W1's family draw with creation index the causing event's `seq` and ordinal 0, and W6's draws with creation index the
  causing event's `seq` and the **new wing's key as ordinal** — one rule, which W6 cites. A `setMassing` `family` op is a
  designation mutation toward the named family and draws on `siteplan.mutate` exactly so (creation index its event's
  `seq`, the new wing's key as ordinal) — replayable, because the stream is a pure function of its key. **Every other
  `setMassing` op and every `setComposition` op draws nothing**: a value the op leaves out takes the row's central value
  (the midpoint of a range cell, the heaviest weight of a weighted one; a stochastically rounded count takes
  round-half-up of the central value). A wing W6 adds over a sealed void draws its access
  on V04's `sewer` key (V02 §3.9 W6), never on these streams. **The bends draw nothing**: each is a
  deterministic function of the op and the committed state, except that a bend to a `family` op (`tiers` on a building
  that is not stepped) draws on `siteplan.mutate` exactly as a `family` op does. A stepped mutation's `drawTiers` takes its
  two streams on `siteplan.mutate` with the causing event's `seq` and the ordinals `nextWingKey` (the group of index 8) and
  `nextWingKey + 1` (the heights).
* **Arithmetic.** The massing and the composer use `+ − × ÷` and `sqrt` only (§6.5), and `dmath`'s `cos` and `sin` for a
  regular polygon's vertices (the rings of `regularCourt`, of towers and of a half-round porch, §1.7's `dmath`); every
  result snaps by the placement rule; lengths drawn in metres are converted to integer centimetres before any
  construction; `facadeBays`' valley reaches are integer (V02 §3.7). The roofscape is view data and runs in float64 under
  the renderer's CPU reference (§6.5 (9)).
* **Order.** Candidates are enumerated in a fixed geometric order (the union's ring order from its lowest vertex, then
  ranges in path order) before any weighted draw; weighted draws use the one weighted-pick helper of §14's `Rng`.
* **Stability.** The same building state gives the same massing and composition on every host (T-V2-13); a New random of
  a finer rung never changes a coarser one (§6.1); the elaboration cache can be dropped at any time (§2.9).

### 3.13 Failure ladders

**F-MASSING** is V02 §3.5's M14 (rungs 0–3, per building, the base rectangle last), with M10's reverse-lattice steps
counting on the same attempt counter; a template tower or an attached wing that fails its tests is dropped and reported,
the building kept. For `stepped` the same ladder runs inside `massStepped` (V02 §3.15.1): a `TierFailure` from `layTiers` is
an attempt, then the single fallback, then the base rectangle. **F-COMPOSE** (per building, at the rung's derivation, reported to the view report and counted by
T-V2-18; never an error): (1) a dormer failing V02 §3.7's test is dropped; (2) a porch whose space fails takes the next
feasible kind, then `none` (a secondary porch: `none`); (3) a composer's room that the seed contract would refuse
(outside its piece, or a vertex within `attractCm` of a side it does not share) is shortened once by `2 × attractCm` away
from the offender, then omitted — V03's A2 (11) places that role itself; (4) any other
failure of the stage-3 contract — a bug by construction — returns the **identity composition**; a porch meeting one of
the building's own other wings takes (2)'s ladder, narrowed first to the free part of its side, (composed wings and
towers one to one, no dormer, no porch, no room), which satisfies the contract by V02 §3.6 step 1, and files the building
in the report.

### 3.14 The owner's rules of 2026-09-28 at the building (file g, items 102–109)

File g's base mechanisms are the coherence pass's (the prosperity driver, the siting profile, the supply web, the wall
closure, the ladder table); this section designs only their building part, citing g's item for the rest.

**3.14.1 Sunlight (item 102 (b), (d), (e)).** (a) **The casters.** A building's shade casters are its **base wings'
prisms**: each wing's ring from `baseCm` to its eave, and over its ring the roof's rise (a gable or hip as its ridge prism,
a tower's cone or spire only over its own ring). These are item 102's **epoch casters**: at an epoch (§4.11) the previous
epoch's buildings enter the daylight-share raster through them. **No stage-3 wing is a generation-time caster** — item
102 (b): buildings never feed the term they are sited by (a loop). The composition (dormers, porches, the cupola) never
casts in the model. Cross-volume: V06 §3.4 rasterises per wing, not one height per footprint (V02 §13). (b) **The rich
seek the sun** at the building scale: M5's sunlit choice (J-V2.38). (c) **Over time:** a wing added or raised at an epoch
changes the next epoch's casters only; V06 owns the drift.

**3.14.2 Custom institutions (item 104; V11 §3.13).** A custom institution composes as the class DR24 resolves (its
archetype, category, tags, library fields or the fallback — V08, V11 §3.13.2) through the ordinary chain; the dossier
facts that reach the massing are traced in V02 §1b's dossier table. (a) **Scale:** its `landmarkLevel` and `economicWeight`
act through the use's significance (V02 §3.2 step 3). (b) **The ruined landmark** (`ruined-landmark` → `generic-other`) is
massed by its class's row like any building, then takes the `ruined` existence at its site (roof `none`; §2.8's decline
states; V02 §5.1's drawing). (c) **Subsumption** (item 104 (h) (5); item 108 `source: 'subsumption'`): the subsuming kind's
template takes each subsumed kind's structures as extra slots (their names resolved by `roleKeys`, their shares added to
the compound's budget), so the compound is larger where they would have stood; nothing is merged into one wing.
(d) Custom supply chains (item 104 (h)) place members, never shapes: each member is a building of its class.

**3.14.3 Split works-and-shop sites (item 105 (h); J-V2.54).** A split class is one institution on two plots: the
building whose use carries `branchOf` composes by the class's `split.shop` template family, the works building by its
`split.works` family (V11 §2.3); each is an ordinary building of its plot — composed, mutated and undone by W1–W9. A
**merge-back** (the clerk's or the author's declaration, or V06's re-evaluation) is **two designation mutations inside
one event**: the works plot's toward the class's own (unsplit) template family — its shop structure added by W6 as a
frontage slot — and the shop plot's toward vacancy (the base's subtract steps); both are recorded in the one event's
`EditBase.mutations` and reversed together, so an undo restores both buildings byte for byte (T-V2-39).

**3.14.4 Ladders (item 108; J-V2.55).** COUNT, QUARTER and GUILD members are **ordinary buildings of the lesser class**
(`LadderStepRow.memberClass`), each composed by its own chain; a GUILD's hall composes as the `hall` family; a **SIZE**
building composes as the greater class's family with `sizeFactor` in M10's budget (and σ's rank in V02 §3.2 step 3), so
"city granaries" are one compound of several stores. An **upgrade** keeps the existing building as member #1: where the
greater class keeps the `row` arrangement, W1–W9; where it moves a `row` building to a `compound`, V02 §3.9's W3b (the quad
kept as the frontage slot). A **demotion** keeps the member nearest its demand and reverses the added slots; the as-built
bytes return (T-V2-40).

**3.14.5 Digging down, crypts and catacombs (item 109 (j), (k) as revised ~20:05, J111).** (a) **The dig floor.** V02 is
the producer of the dig floor V04's access draw reads: `baseCm − Basement.floors × cellar.depthCm` for a building with a basement (the raised crypt's floor for a `raised` one), else `baseCm` — `baseCm` includes a
`half` basement's raise, so a half cellar's floor is the datum less half the depth (item 226); a building on a deck plot has no dig floor and never draws, and a wing with `on`
never draws (its ground is its tier's) (V02 §3.16); a quay built on the bank (`DeckContext.surfaceCm` null)
is ground and has one (second revision, V2C-66 (1)). (b) **Who digs.** A building draws its access once
when it is built (the draw V04's; its chance V11 §3.23.7's `DigRule` rows); a wing the mutator **adds** over a sealed void draws once for that wing (V02 §3.9
W6); a **`setMassing` op draws nothing** — a user who wants a way down declares it (`addUndergroundAccess`, item 66); a
replacement building (a new lineage) draws as new (J-V2.39). (c) **Crypts.** The crypt is a model fact on the basement
(`Basement.crypt`, item 238, derived by §2.6's basement function from V11's `crypt` column); **V02 supplies the wings that seed its ring** —
`cryptSeedWings(b)`, stated here once (J-V2.92): for a building whose wings carry template
part names (`BaseWing.partName`, item 234), the wings named `chancel`, else those named `apse`, else those named
`crossing`; else, for a `stepped` building, its tier 0 (the `tier` wing with no `on`); else the one storeyed ground wing (no
`on`, not `solid`) of role `main`, `range` or `cross` whose ridge has the end with the largest world `x` (the end farthest
toward world east), ties by the lowest key; else none — an empty list, where V03 places the crypt under the third of
the region farthest from the main entrance (V03 §3.7.4 step 1). It returns wing keys, is exported by `@plat/plots` beside
`massStepped`, is called by §2.6's basement function (item 238's crypt ring; item 226's lift and half raise act on the wings over the basement's ring) and is read
by V03's crypt placement and T-V2-36, T-V2-53 — and V02 owns the **wet-ground lift** and the **half raise**. After every re-derivation of the basement (a `setMassing`
commit, V02 §4.2 step 3; a designation mutation; a terrain change) the crypt of an `always` class (the cathedral, the great
temple, a building a dossier crypt record binds to) is kept **with no condition**, and a `basement`-class church keeps its
drawn crypt while its class stays in the church family; a mutation out of that family drops it through the ordinary
re-derivation, its contents going to V03/V04's closure, never silently. (d) **The cathedral's crypt is never refused
(J-V2.46).** Its basement takes the first lawful form of a ladder with no refusal rung: a **full** crypt; a **half-sunk**
crypt where the full floor would lie below the water table or the plot is `low` — the wings over it raised by `cellar.depthCm ÷ 2` (item 226's half raise; a raised choir over a half-sunk crypt, its floor at the datum less half its
depth; S23-10); a **raised-choir crypt** (`Basement.kind
'raised'`, item 226) where even a half floor would lie below the water table, or on a `damp` or `flood` plot: the crypt's
floor at `max(lowest terrain sample under its ring, water table + crypt.freeboardCm)`, and the ground storey of the ground wings over the basement's ring lifted so that it clears the basement by `crypt.clearCm` (250 cm, own, calibrate-later; the seed wings over a crypt-only basement; every ground wing over the ground wings' whole inset that V03 gives a crypt no stair reaches, V03 §3.7.4) — written by the
basement step as those wings' `Heights.baseCm`, with steps at the crypt ring's edge (V03 plans the choir stairs over the
lift, V3C-61 (4)). **Inside a solid platform**: where the seed wing is a `solid` tier 0 whose
height is at least `crypt.clearCm + 100 cm`, the raised form places the crypt **inside** tier 0 — its floor at `max(lowest
terrain sample under its ring, water table + crypt.freeboardCm)`, its vault at least 100 cm under tier 0's top — with no
lift, so stair 0 and the stack keep their heights (as temple platforms held their chambers), any other ground wing over the basement's ring (a storeyed annex over a whole inset) lifted as above; the lift applies only to a
lower or storeyed tier 0, and then through `rebaseStack`, every wing standing on it following. On a sky island the rim-slab vault is V05's form of the same ladder. (e) **Size and rank are not
V02's.** V02 supplies the seed wings; the ring's growth to V11's `cryptM2` and the rank that makes the cathedral's the
largest are §2.6's basement function with V11's rows (item 238). (f) **Catacombs are never V02's.** No V02 path sources,
moves, re-sources or shrinks a catacomb (item 109 (k) (2), (4)): catacombs lie under cemeteries or a CITY/METROPOLIS
quarry ossuary (V04). V02's footprint and basement floor are an **obstacle input** to (k) (5)'s stagnation ("a
foundation in the way"); a V02 demolition or replacement lifts that block; a crypt joins a catacomb only by V04's
(3b) link, which V02 never makes.

**3.14.6 Which siting-profile columns shape a building (item 103).** None, save two: `emits.smoke` ≥ 2 adds one
decorative stack per level above 1 to the row's `hearths` (a forge, kiln, brewhouse or dyer's chimney; §8.10, drawn until a
plan exists), and `needs.runningWater` selects the `water` axis for the main slot (M2). Every other column is S10b's and
the solver's (V11 §2.3); materials stay texture and colour (V02 §1d).

### 3.15 Stepped massing — the `stepped` family (item 110 (c); item 110 fold; rewritten by the second revision)

Item 110 (c): "each tier a wing standing on the one below, inset by a table step, with its own height, stairs up its
faces and a flat roof or a shrine on the top tier … each tier casts its own shadow." A stepped building is reached **only
by name**: a class whose designation template's `composition` key is one of V02 §3.15.4's rows (V11's
specialisations, X17), a `setMassing { family: 'stepped' }` (or a `tiers` op bent to it, V02 §4.6) or a mutation toward
such a row; no default, family, override or role row lists `stepped` (the no-op pin, T-V2-50). **One exported function
decides the bytes (J-V2.80):** the massing's M5 calls `massStepped` for the family, and the base outline builder calls the
same `massStepped` from M3a (item 229) with the same row, band and streams, so a stepped building made before M6 keeps
its bytes when stage 3 registers (T-V2-46). `massStepped` owns the frame, the band, the draws, the attempts and the
fallbacks; `layTiers` owns only the geometry, pure, and is what the `tiers` op, the mutator's anchored lay and V04's
ruins call (V02 §3.15.5, §3.15.6).

**3.15.1 The construction, step by step.** Types: V02 §2.6. Lengths in centimetres on the lattice; V02 §3.12's arithmetic
(`+ − × ÷ sqrt`, `dmath` for a polygon's vertices); every point snapped by the placement rule.

`massStepped(input, row, band, k)` runs, in order:
1. the frontage frame — V02 §3.4 steps 1–2 (`f`, `n`, `Rr`, `W`, `D`);
2. `slotBand(input, row, band)` → `lo`, `hi`, `cap` (V02 §3.5 M10: a stepped row carries `claimShare`, so the band is
   `claimShare × area(H) × sizeFactor`);
3. **ST0**; infeasible → step 6 at once, reported `steppedInfeasible`;
4. for attempt `a` = 0, 1, 2 (the `massing` concern's cap 3): `drawTiers(cells, storeys, s8, s9)` — `s8`, `s9` the `massing`
   stream's creation indices 8 and 9 for `a` = 0, and `massing/attempt=a`'s indices 8 and 9 otherwise; `layTiers` at
   `scale` 1; **ST8**; a `TierLay` that ST8 accepts is converted to wings and the `MassingRef` (ST7's order and keys) and
   returned; a `TierFailure` is reported with its step and detail and the next attempt runs;
5. (the attempts exhausted) step 6;
6. **the single fallback** (ST8's construction below), then, if its checks fail, the base outline builder's rectangle in `H`
   (which the base guarantees) — the same rungs as M14's rungs 2 and 3.

`storeys` is the class's `HeightsRow.storeyCm` (`ground`, `upper`); `pitch`, `parapetCm` and `plinthCm` are M11's pitch rule,
the family's parapet (V02 §3.10.6) and §2.6's plinth.

* **ST0 — feasibility (M3 for `stepped`; second revision, V2C-49 (1)).** At the **least draws** — `n₀ = count[0]`,
  `d₀ = insetM[0]`, `sw₀ = stairWidthM[0]`, `ĝ = stairGrade[1]` (the steepest grade: the least run), and the least heights
  `h_k` (a solid tier `solidHeightM[0] × taper^k`, a storeyed tier `storeys.groundCm`) — with `r₀` the least stair reserve
  (axial `(h₀ + plinthCm) ÷ ĝ`, flights `sw₀ + stairClearM`, internal 0) and the least **front insets** `f_k`, k = 1 … n₀ − 1
  (axial `max(d₀, h_k ÷ ĝ + landingM)`, flights `max(d₀, sw₀ + stairClearM)`, internal `d₀`), and the least top width
  `t₀ = tierMinSideM` (flights: `max(tierMinSideM, h_{n₀−1} ÷ ĝ + landingM)`, the top face holding its flight):
  * **rect:** `Wmin = t₀ + 2(n₀ − 1)d₀`, `Dmin = r₀ + Σ f_k + (n₀ − 1)d₀ + tierMinSideM`; feasible when `W ≥ Wmin` and
    `D ≥ Dmin`; `Amin = Wmin × (Dmin − r₀) + sw₀ × r₀`;
  * **round or octagonal** (concentric rings, ST3): the least inradius `ρ = tierMinSideM/2 + Σ max(d₀, f_k)`; feasible when
    `min(W, D − r₀)/2 × cos(π/m) ≥ ρ`, `m` the ring's side count (8, or the round bracket at that radius);
    `Amin = m ρ² tan(π/m) + sw₀ × r₀`;
  * infeasible also when `Amin > 1.1 × hi` (M3's budget rule).
  **Anchored mode** (V2C-64 (1); the mutator, V02 §3.9 W1): feasible when the anchor's shorter side is at least
  `tierMinSideM + 2d₀` (a second tier fits) and the least reserve `r₀` of width `sw₀` fits inside `H` in front of the
  anchor's front side (no reserve for `internal`). The receipt of V02 §3.10.3 gives every row's `Wmin × Dmin`.
* **ST1 — draws (`drawTiers`).** On `s8`, in this order: `n` uniform on the integers of `count`; the shape by `shape`'s
  weights; `d = U(insetM)`; the top by `top`'s weights; `sw = U(stairWidthM)`; `g = U(stairGrade)`; where the top is
  `shrine`, its floors (uniform integer in `shrine.floors`), `U(shrine.insetShare)` and its roof kind by `shrine.roofs`.
  On `s9`, per tier k = 0 … n − 1 in order: a **solid** tier (every tier under `solid: 'all'`, tier 0 only under
  `'lower'`) `heightCm_k = U(solidHeightM) × taper^k` rounded to the centimetre, `floors_k = 0`; a **storeyed** tier
  `floors_k = max(1, ⌊U(tierFloors) × taper^k + u⌋)` (`u` a second uniform: stochastic rounding) and `heightCm_k =
  storeys.groundCm + (floors_k − 1) × storeys.upperCm` — each stacked tier's first storey a principal one (J-V2.85), and
  **never a parapet here** (ST4 adds it). No aspect is drawn (ST2 derives it; J-V2.86). All are drawn once; ST8's
  re-lays and the anchored mode re-use them, so a shrink never shifts a draw. V04 draws the same list on its ruin
  stream.
* **ST2 — tier 0 and the stair reserve.** The reserve `r` at the front (the `−v` side) of `Rr`: axial `(heightCm₀ +
  plinthCm) ÷ g` (stair 0's run), flights `sw + stairClearM`, internal and none 0. **The stack's own proportion (J-V2.86):**
  `W_need = t + 2(n − 1)d` and `D_need = Σ d_k + (n − 1)d + tierMinSideM` — ST0's closed form at the drawn `n`, `d`, heights,
  `g` and `sw`, with ST3's `d_k` and `t` as in ST0 — and the laid aspect `= clamp(W_need ÷ D_need, aspect)` (the row's cell is
  the clamp), so tier 0 takes the proportion its terraces and stairs need. Tier 0 lies in `[0, W] × [r, D]` of the frame:
  **rect** `W₀ = min(W, aspect × (D − r)) × scale`, `D₀ = min(D − r, W₀ ÷ aspect)`, centred on `u = W/2`, its front on `v =
  r`; **round** a regular ring with `TowerShapeRow`'s round side count by radius and circumradius `R₀ = min(W, D − r)/2 ×
  scale`, centred in the region, one side parallel to `u` and nearest the front; **octagon** an 8-gon of that
  circumradius, the same phase. Every tier of a round or octagonal stack keeps tier 0's side count (its rings are
  concentric offsets, vertex for vertex). **The D-front (second revision, V2C-62 (2)):** under `axial`, a round or
  octagonal ring's front chords lying within `(sw + 2 × stairClearM)/2` of the stack's centre line are replaced by one
  straight edge — the chord between the ring's two crossings of the lines `u = c ± (sw + 2 × stairClearM)/2` on its front
  half — so every stair stands full width against a straight face. *Anchored mode* (V02 §3.15.5, the `tiers` op): tier 0 is
  `anchor` as given — a kept range's four corners (`BaseWing.corners`; the extra vertices other wings put on its sides leave
  with the wings the mutation subtracts, V2C-64 (3)) or the `tiers` op's re-laid ring — and the reserve is sought in front
  of it inside the region; where it does not fit there, the stair form falls back (ST3), never the ring. Under `flights`,
  tier 0's front face must be at least `(heightCm₀ + plinthCm) ÷ g + landingM` long, else the stair fallback applies.
* **ST3 — the tiers above.** For k = 1 … n − 1, the front inset `d_k`: axial `max(d, heightCm_k ÷ g + landingM)` (the
  D-front makes the former sagitta term unnecessary), flights `max(d, sw + stairClearM)`, internal and none `d`. **Rect:**
  tier k's ring is tier k − 1's four corners moved inward by `d` on the back and the two sides and by `d_k` on the front.
  **Round or octagonal:** concentric, the inradius reduced by `max(d, d_k)` all round (so the rings stay regular), the same
  side count, then the D-front under `axial`. `on` = tier k − 1. The stack **ends** at tier k − 1 where tier k's shorter
  side (for a polygon, twice its inradius) would fall below `tierMinSideM` or, for flights, its front face below
  `heightCm_k ÷ g + landingM`; `truncated` counts the tiers not laid (reported `tiersTruncated`). **The stair fallback:**
  with fewer than two tiers laid, the lay re-runs from ST2 with the next form of `input.forms` — absent, the row's form,
  then `axial → flights → internal`, `internal` only where tier 0 is storeyed and a round or octagonal stack skipping
  `flights`; `none` only where `input.forms` names it (an edit's bend) and tier 0 is solid — and past the last form
  `layTiers` returns `TierFailure { kind: 'noSecondTier', step: 'ST3' }`. The form laid is `TierLay.stairs` (J-V2.74).
* **ST4 — roofs and heights.** Every tier but the top: `lowerRoof` **flat** — roof `flat` with the family's `parapetCm` (a
  walkable terrace), `ridgeCm = eaveCm` — or **pent** — roof `hip` (rect), `pyramid` (octagon) or `cone` (round) at pitch
  `p_k = min(pitch, pentShare × storeys.groundCm ÷ d)`, `ridgeCm = eaveCm + p_k × d`: the band between the tier's ring and
  the ring above, drawn by V02 §5.2 step 3's band facets (J-V2.75). **Pent needs equal insets** — the `internal` or `none`
  form, where every `d_k = d` (V2C-52 (2); the load check of V02 §3.15.4 and the `tiers` op's bend). The **top tier** —
  whichever tier the lay ended on, so a truncated stack's former pent tier takes the top's roof: `flat` and `shrine` — roof
  `flat` with `parapetCm`; `roofed` — `hip` (rect) at the one pitch rule's pitch, `pyramid` (octagon) or `cone` (round) at
  `TowerShapeRow`'s pitch, ridge by M11's formulas. Each tier: `eaveCm = heightCm_k`, **plus `parapetCm` on every
  flat-roofed tier, solid or storeyed** (so `deckLevel` subtracts it exactly where it was added), `Heights.floors =
  floors_k`, `solid` where `floors_k = 0`. **The shrine** (top `shrine`): the top tier's ring moved inward by `insetShare ×`
  its shorter side on every side (a rect in a rect stack, a regular ring of the stack's shape otherwise), laid only where its
  area is at least 4 m² and each side at least 2 m — else the top becomes `flat` (reported `shrineDropped`); `on` = the top
  tier; floors and roof as drawn; its storeys `storeys.groundCm`, then `storeys.upperCm`; role `shrine`.
* **ST5 — the stairs.** **Axial:** width `min(sw, the length of tier k's straight front edge)` (the D-front gives a round
  or octagonal stack a full-width edge); for k = 0 … n − 1, stair k is the rect of that width centred on the stack's
  centre line along `v`, reaching from tier k's front face toward the front by `run_k = rise_k ÷ g`, `rise_k = heightCm_k`
  for k ≥ 1 and `heightCm₀ + plinthCm` for k = 0 (re-read by `rebaseStack`, V02 §3.15.2); stair 0 on the ground in the
  reserve (no `on`), stair k ≥ 1 on tier k − 1's front terrace (`on` = tier k − 1), the rest of the front inset a landing
  before its foot. **Flights (V2C-62 (1)):** stair k is the rect of length `run_k` along `u` and width `sw` along `v`,
  against tier k's front face, on the ground in the reserve (k = 0) or on tier k − 1's front terrace (k ≥ 1, `on` = tier
  k − 1). Stair 0's foot is at the face's left end (seen from the front), climbing `+u`; for k ≥ 1 the foot is **the point
  of tier k's front face nearest stair k − 1's head**, moved along the face toward its farther end only as far as the
  flight needs to fit, and the flight climbs toward the end of the face with more room — so the walk along the terrace
  from one head to the next foot is the shortest the face allows. Every stair: role `stair`, `solid`, roof `shed` with
  `high` its ring side at the upper end (on tier k's face for axial; the end side at the top of the climb for flights),
  `eaveCm` 0, `ridgeCm = rise_k`. **Internal:** no stair wing; V03's cores climb inside the storeyed tiers (X18).
  **None** (a sealed stack, V02 §4.6): no stair wing and no way up; a storeyed shrine or tier on it is reached by nothing
  and V03 flags it `W_TIER_UNREACHED`.
* **ST6 — snap and validate (M13 for `stepped`).** Every ring snapped. **Every vertex of a stair that lies on a side of a
  tier's ring is inserted into that ring (§2.6 rule 1)** — stair 0's head vertices into tier 0's front side, stair k's head
  vertices into tier k's front side, a flight's back vertices into the face it stands against —
  so a stair and the tier it climbs share their contact exactly and a carry keeps it. The ground wings — tier 0 and stair 0
  — tile; every wing with `on` lies inside the ring of the wing it stands on (exact `orient2d`), its boundary at least
  `minEdge` from that ring's except a stair whose foot lies on the terrace's edge; **the wings standing on one wing are
  pairwise interior-disjoint** (exact; stair k abuts tier k on their shared vertices); each stair's `rise ÷ run ≤ g ×
  1.01`; `stairChain` connects the ground to the top tier's terrace for `axial` and `flights`; a regular ring stays regular
  except its D-front edge; every wing at least 4 m² and every side at least `minEdge`. A failed check returns `TierFailure {
  kind: 'check', step: 'ST6', detail }`.
* **ST7 — order, keys and the entrance hint.** Keys `0 … m − 1` in the order **tier 0, stair 0, tier 1, stair 1, …, tier
  n − 1, stair n − 1, then the shrine** (no stairs under `internal` or `none`; V2C-63 (5)) — no tower, so V02 §2.1's
  canonical order holds by construction; `nextWingKey = m`; `massStepped` writes `MassingRef.family 'stepped'`, `segments
  1`, `row`, `grammar`, `entrance` and `stack` (`shape`, `stairs`, `lowerRoof`, `top`, `insetCm`, `grade`, `truncated`).
  **The hint:** a solid tier 0 under `axial` or `flights` — stair 0's outer side (axial: the side at its foot; flights: its
  side facing `−v`), so the main entrance is the stair's foot and the plan roots at the first landing door (item 230); a
  storeyed tier 0 — tier 0's front side, the door on its free part (item 228); under `none` — tier 0's front side, an
  entrance that opens nothing (item 230).
* **ST8 — the size budget (M10 for `stepped`, inside `massStepped`).** `A` = the area of tier 0 ∪ stair 0 (the footprint),
  `A_t` tier 0's and `A_s` stair 0's. Over `1.1 × min(hi, cap)`: where `A_s ≥ min(hi, cap)`, the single fallback at once;
  otherwise `scale ← scale × √((min(hi, cap) − A_s) ÷ A_t)` and `layTiers` re-runs once with the same draws (tiers may
  truncate; only tier 0's size moves the footprint, so no tier is dropped for the budget); still over, or a `TierFailure`:
  the next attempt (step 4), and at the end the single fallback. Under `0.9 × lo`: `scale` grows once by the least of
  `√(lo ÷ A)` and the largest factor that keeps tier 0 and the reserve in `Rr`. **The single fallback** (no draw, so the
  M3a and M6 builders agree): `w = max(0.8 × wingWidthM[0], 3 m)`, `L = clamp(min(hi, cap) ÷ w, 1.2w, W)`, the slab
  `[u₀ + (W − L)/2, u₀ + (W + L)/2] × [v₀, v₀ + w]` (M5's `single` along the frontage), role `main`, roof `flat` with the
  family's parapet, floors the template's least; `MassingRef.family 'single'`, reported `steppedFallback`; failing M13's
  checks, the base outline builder's rectangle. A stepped row is never read on a deck (V02 §3.16's rows admit no `stepped`,
  and a `family: 'stepped'` there bends to `single`, V02 §4.6).

**3.15.2 The datum, the stairs' true rise and the envelope — `rebaseStack` (J-V2.81).** Every
path that re-bases a wing of a building with a wing standing on another calls `rebaseStack` (V02 §2.6; item 370 as
extended) for the whole building, never the per-wing step: S11's datum step, a `setMassing` commit, a tier's height edit,
§7.3 (a) 4's terrain operator (whenever any ground wing is on a changed sample, so an upper tier over no changed sample
follows its tier), §7.4's warp and `moveVertex`, the carry's rule (2), the crypt lift (V02 §3.14.5 (d)) and a deck's
re-base. Its four steps: (1) the ground wings by the terrain rule (item 370's `levelledGroundCm` samples with item 231's
wall-side move, so a levelling or re-levelling of the plot, block or ward re-bases through S11's datum step; reconciliation
round 3, S23R2-01) — a ground wing's user-edited `baseCm` (J-DET-24's kept
fate) is kept and carries the stack; (2) each wing with `on`, in stack order (each after the wing it stands on, whatever
the keys, since a `tiers` edit may put an older shrine on a newer tier), `baseCm = deckLevel` of its support; (3) each
stair's `ridgeCm` re-set to its true rise — stair 0 `deckLevel(tier 0) − stair0.baseCm`, stair k `deckLevel(tier k) −
deckLevel(tier k − 1)` — and where that exceeds `g × run × 1.1` (a slope under stair 0) it is kept and reported
(`stairSteep`); the run is never re-laid by the datum pass, so a terrain sample's rounding never moves a ring (J-V2.2's rule
that the massing owns every ring); (4) **the envelope:** `Building.heights.baseCm` is the least `baseCm` of its ground
wings, `eaveCm` and `ridgeCm` the maxima over its non-tower wings of `w.baseCm + w.eaveCm − baseCm` and `w.baseCm + w.ridgeCm
− baseCm` — the top of the stack, which §8.4's caster ceiling and V05's clearance read (X20) — and **`floors = 1 +
max storeyRange(w)[1]`** over its storeyed wings, 0 with none (V2C-61 (2)); every other building keeps M11's rule byte for
byte (J-V2.78).

**3.15.3 Storeys, rooms, the composer, chimneys and the shadows.** A tier reaches the storeys `storeyRange` gives (V2
§2.6): a solid tier none, a storeyed tier from the storey above the one it stands on — level 0 is the lowest storeyed level,
so the shrine of a solid pyramid is storey 0 (item 371 has the capacity, `Storey.level` and `Storey.wings` read it), and
each tier's first storey is a principal floor of `storeyCm.ground` (J-V2.85; V03's `floorCm` reads the tier's ground
and upper heights, X18). The composer (V02 §3.6) composes every tier, stair and shrine one to one like any wing;
`WingRoleRow`'s `tier`, `shrine` and `stair` admit no dormer (and a terrace or a pent skirt is neither `gable` nor `hip` on
a dormer role), so no dormer row; the porch only at a storeyed tier 0's main door, clamped to the free part of its side and
clear of stair 0 (V02 §3.7; `tier` admits one, `stair` none, so a solid stack's door, the stair's foot, takes none);
the `rooms` rung emits no hall, gate hall, chapel or tower room (a stepped massing has no `main`, `gate` or tower wing).
Decorative chimneys stand only on exposed roof (V02 §3.7), and the plan's chimneys are drawn at `Chimney.levels`'
top (V02 §5.2). V03 plans each storeyed tier and the shrine by the class's programme and opens a landing door on
`landingSide` (X18). **One shadow per tier:** every tier, stair and shrine is its own caster, its prism from its own
`baseCm` to its eave with its roof's rise over its ring (V02 §5.2's caster rule, which §8.4 reads per wing), so each tier
casts one shadow and the tiers' shadows nest (item 110 (f); T-V2-44). **Crypts and basements.** A stepped building's
basement lies under its ground wings — tier 0 — whatever storeys they reach (item 371); an `always`-crypt class built in
tiers (a great temple) seeds its crypt with tier 0 (V02 §3.14.5 (c)'s seed wings). On wet ground a **solid** tier 0 at
least `crypt.clearCm + 100 cm` high holds its raised crypt **inside the platform**, with no lift (V02 §3.14.5 (d), V2C-68; a storeyed annex over the ground wings' whole inset lifted, V03 §3.7.4);
a lower or storeyed tier 0 takes the lift through `rebaseStack`, every wing standing on it following. Where no wing
standing on no other wing is storeyed (V03's `ground(b)` absent, V03 §3.3: a solid tier 0 with no storeyed annex) the
basement's access is `external` (item 371, whose reconciliation-round-4 extension carries §13.2's T29-4, J-A29.25 and the
base's other readings of the basement's place and access; S23R3-03), its door at V03's
`basementDoor(b)` (V03 §3.7.1: the tomb door, or the wall's side where the stack stands against a retaining wall; the crypt
inside a platform entered by the same door at its own floor; reconciliation round 2, S23R1-10; seam S23R2-12); a storeyed ground wing beside a solid tier 0 (an annex, the arena's façade ring) joins
the basement by its core or the trapdoor fallback, never outside (V03's J-V3.88; reconciliation round 3,
S23R2-03).

**3.15.4 The rows.** Four rows of `composition.json` — our own (provenance `own`, the item 110 fold of 2026-09-28, revised
by the second revision of 2026-09-29; calibratable, §13.9), at V11's four anchors in V02 §3.10.1's notation (one value where
all four agree). Tier 0's size comes from `slotBand`: the temple and palace rows carry `claimShare` (their precinct sizes
them, J-V2.87), the tiered tower reads its class's `tower` family budget. They are reached only by name: V11's
specialisations write `DesignationTemplateRow.composition` (X17), V04 names `stepped-monument` (X19), and the
`family` op, a `tiers` bend or a mutation names `stepped`. V02 §3.10.3's receipt table measures each against its band.

| row (arrangement; main) | `count` | `shape` | `insetM` | `solid` · heights | `taper` · `lowerRoof` | `top` | `stairs` · `stairWidthM` · `stairGrade` | other cells |
|---|---|---|---|---|---|---|---|---|
| `stepped-temple` (institution; the temple) | 3–4 / 4–5 / 4–6 / 5–7 | rect 1 | 1.5–2.5 / 1.5–2.5 / 2–3 / 2–3.5 | all · solid 3–4 / 3.5–4.5 / 4–5 / 4.5–6 m | .9 · flat | flat .2, shrine .8 / shrine 1 / shrine 1 / shrine 1 | axial · 2.5–4 / 3–5 / 4–6 / 5–8 · 1.0–1.2 | aspect .65–.85 (the clamp of the derived aspect); `claimShare` .35–.6; shrine floors 1, insetShare .15–.25, roofs hip .4, pyramid .4, gable .2; families stepped 1; `wingWidthM` 5–7 (ST8's single fallback); porch 1/0/0/0/0; hearths 0 |
| `terraced-palace` (institution; the palace) | 2–3 / 2–3 / 3–4 / 3–5 | rect 1 | 3–5 / 3–6 / 4–7 / 5–8 | none · floors 1–2 / 1–2 / 2–2 / 2–3 | 1 · flat | flat .6, roofed .4 | flights · 2–3 / 2–3 / 2.5–4 / 3–5 · .6 | aspect 1.15–1.8; `claimShare` .35–.6; families stepped 1; `wingWidthM` 8–10; porch as `hall`'s (V02 §3.10.2); hearths 3 / 4 / 5–7 / 6–10 |
| `tiered-tower` (detached; the tower) | 3 / 3–4 / 3–5 / 4–6 | rect .4, octagon .4, round .2 | .3–.5 / .3–.6 / .4–.7 / .4–.8 | none · floors 1 | .92 · pent | roofed 1 | internal · — · — | aspect 1–1; families stepped 1; `wingWidthM` 4–5; porch .5/.5/0/0/0; hearths 1 / 1 / 2 / 2 (the `tower` family's budget: every median stack fits, V02 §3.10.3) |
| `stepped-monument` (V04's ruins, X19) | 3–5 / 4–6 / 5–7 / 6–8 | rect .85, round .15 | 1.5–3 | all · solid 3–5 m | .9 · flat | flat .5, shrine .5 | axial · 3–6 · .9 | aspect .6–.85; `heights` 350 / 300 cm (a ruin's shrine storeys, V2C-48 (4)); as `stepped-temple` otherwise |

**Load checks** (V02 §3.10.7's compiler, extended): a row whose families include `stepped` carries `tiers`, and a row with
`tiers` lists `stepped` at weight 1; `stairs: 'internal'` never with `solid` `all` or `lower`; `stairs: 'flights'` never
with a `round` or `octagon` weight above 0; **`lowerRoof: 'pent'` only with `stairs: 'internal'`** (equal insets; V2C-52
(2)); `count[0] ≥ 2`; `stairGrade[1] ≤ stairGradeMax`; the sealed form `none` never a row value; a stepped row never read
under the `row`, `cluster` or `tents` arrangement; and **no row of V02 §3.10.2 – §3.10.6 lists `stepped`** — the table half
of the no-op pin (T-V2-50).

**3.15.5 Mutation.** The rows added to V02 §3.9's table and to `MassingGrowthRow`'s defaults: **`single → stepped`** (the
only source, V2C-64 (2)) keeps the main range as tier 0 — W1's anchored test first (V02 §3.15.1 ST0), then `drawTiers` on
`siteplan.mutate` (V02 §3.12) and `layTiers` in anchored mode on the range's four corners; a `TierFailure` leaves the
target `single` (the kept range unchanged), reported `steppedDegraded` (W3's "degrading to the largest feasible
sub-family"); **`stepped → single`** keeps tier 0 as the `main` range and subtracts the rest, W5 giving its roof and floors (a
solid tier 0 becomes storeyed: `solid` cleared, `floors` the target's least, recorded as a `storey` step); **`stepped →
stepped`** keeps the tiers up to the target's count, subtracts the ones above it (the shrine first, then each removed
tier's stair with it) and adds tiers on top by W6 with `MassingRef.stack.insetCm` and `.grade` while ST3's side test
passes. Every other pair passes through `single`. The inverse steps restore the former stack exactly (W9).

**3.15.6 A ruin's stepped monument (V04).** V04's ruin stage calls `drawTiers` on its own ruin stream and
`layTiers` alone — never `massStepped`: no band, no ST8, no attempts — with the `stepped-monument` row at the band its
ancient-culture row names, in its plan cell's frame, `storeys` = `TierCells.heights` (350 / 300 cm), `plinthCm` 0,
`parapetCm` 0 and `scale` 1 (second revision, V2C-48 (4)). A `TierFailure` is V04's to handle (its plan cell re-laid
smaller, or the monument a mound by its persistence order). It then decays the result by its persistence order (a stepped
mass decaying toward a mound is V04's and V11's; X19). The monument is V04's record, not a `Building`; V02
supplies the one tier construction, so a ruin's tiers and a living temple's nest by the same rule.

### 3.16 Buildings on moles, jetties, quay platforms and bridge decks (item 110 (d); item 110 fold)

1. **Which buildings.** Every building S11 raises on a deck plot the base offers (item 110 (d): frontage plots along the
   deck's way on a mole, a pier or jetty, a quay platform or a bridge deck, and the placed landmarks at a mole's head or
   mid-mole). S11 passes `BuildingInput.deck` (item 305). A raised way's deck carries none (J-V2.71). **No deck plot on a
   ford, a drawbridge or an unbuilt deck** (second revision, V2C-66 (2)): a `Bridge` of kind `ford` or `draw`, or one whose
   `deckCm` is not yet set (§2.7: optional until S7 builds the bridge), offers none (X28, the coherence pass's deck-plot
   rule). **A quay built on the bank is ground** (V2C-66 (1)): its `DeckContext.surfaceCm` is null, its buildings take
   `deriveBase`'s terrain datum (plinth and skirt included), the ordinary basement gate (whose `damp` and `flood` rows refuse
   most cellars there anyway) and a dig floor; it keeps `kind 'quay'` for the `@deck` rows and the deck budget. Points (5)
   and (6) below therefore apply to moles, piers, jetties, bridge decks and quays built out over water.
2. **The row.** A non-landmark deck building reads `<key>@deck/<band>`, else `default.<arrangement>@deck/<band>` (V02 §3.2
   step 2). A landmark reads its class's chain unchanged — a mole-head or mid-mole tower the `tower` family (`towerHouse`),
   a fort its class's template — with its template's budget and floors (J-V2.69). S11 copies `DeckContext.landmark` from
   the deck-plot record's `landmark` flag (a mole's head and mid-mole slots, and a bridge's mid-span slot where the
   coherence pass adopts one; X28 — the producer, V2C-66 (6)). **The lighthouse islet is land** (V2C-66 (3)): item 110 (e)
   reaches it by a causeway, so its tower is an ordinary `tower` building with the ground's datum and basement gate, never a
   deck building.
3. **The budget and the storeys.** For a non-landmark deck building M10's band is the deck budget's `footprintM2` at the
   plot's band and deck kind (V11's `deck` row, X16; until it lands `deck.fallbackM2`, [20, 60] m²) ×
   `footprintShare_i ÷ count_i × buildingScale` — **per slot**, so a compound's slots share the plot's budget (second
   revision, V2C-66 (4)) — **replacing** the template's `[p10, p90]` (in `slotBand`), under the usual cap `coverageMax ×
   area(H)`; M11 clamps every wing's floors to at most `maxFloors` (fallback `deck.fallbackFloors`, 2) — the owner's
   "small, light" (J-V2.67) — and the mutator's W5 clamps a kept wing's floors the same way (V02 §3.9).
4. **Fitting.** M2's frontage frame on the deck's way (the plot's access segment). `H` lies inside the deck plot and so
   inside the deck's width (item 110 (f)); a row arrangement's quads pass through (M0 (a)).
5. **The datum.** Every wing's `baseCm` is `DeckContext.surfaceCm`, with no plinth and no skirt (item 370) — on a quay
   built on the bank (`surfaceCm` null) the terrain datum instead, (1); a change of the
   deck's height (§4.8's re-base after a terrain stroke, an edit of the bridge) re-bases the deck's buildings in the same
   step — their plots are in the deck's effective scope (item 370).
6. **No basement, no crypt, no dig.** The basement decision gives none on a deck plot built over water (item 305);
   there is no dig floor (V02 §3.14.5 (a)). **No crypt-bound use ever stands on a deck** (second revision, V2C-58; J-V2.68
   amended): S10b never places on a deck plot a use whose class's `crypt` column is `always`, **or a use to which a dossier
   crypt record binds** (V04's C4-05) — V11's `deckOk` is read **per use**, false for either (X16 extended); a
   hand placement (T6) of such a use on a deck plot bends to the nearest land plot at the deck's landward end, named (the
   bend of V9C-58 (2)); a designation mutation that would bring such a use onto a deck building relocates the use to the
   nearest land building by the base's relocation (§10.3). So the no-refusal crypt ladder never meets a deck, and a bridge
   chapel whose crypt the dossier records stands on the bank with its crypt.
7. **Lifecycle.** V02 adds nothing to the deck's fate: removing or ruining a deck ruins what stands on it by the base's
   least-disruption rule (item 110 (d)), each building taking its fate as a record, its massing untouched; rebuilding the
   deck re-offers the plots, and S11 raises new buildings on them (new lineages, massings drawn afresh).
8. **The `@deck` rows** (own; four anchors; each an `alias` of the row named, only the cells named overriding):

| row | alias of | overriding cells |
|---|---|---|
| `default.row@deck` | `default.row` | back 0; blocks 0; towers 0; turret 0; dormers 0 / 0 / .3 / .5; porch 1/0/0/0/0 · .9/.1/0/0/0 · .8/.2/0/0/0 · .7/.3/0/0/0; hearths 1 |
| `default.detached@deck`, `default.compound@deck`, `default.institution@deck` | `default.detached` | families single 1 / single 1 / single .85, L .15 / single .75, L .25; wing width 3.5–4.5 / 4–5 / 4–5.5 / 4.5–6; range length 4–6 / 5–7 / 6–8 / 6–9; back 0; blocks 0; towers 0; turret 0; dormers 0; porch 1/0/0/0/0 · .9/.1/0/0/0 · .8/.2/0/0/0 · .7/.3/0/0/0; hearths 0 / 1 / 1 / 1 |
| `chapel@deck` (a bridge chapel) | `chapel` | families single 1; wing width 4.5–5.5; range length 6–9; porch .6/0/.4/0/0; cupola 0 / 0 / .1 / .2 (tip 1); hearths 0 |
| `watch-house@deck` (a toll house) | `watch-house` | wing width 3.5–4.5; range length 4–6; back 0; hearths 1 |

**Load checks:** every `@deck` row's families lie in {`single`, `L`, `row`} under the arrangement law, and its `blocks`,
`towers`, `turret` and `backRange` are 0 and its `cupola.chance` at most .2 (a deck carries small, light buildings).

### 3.17 The rest of item 110 at the building — retaining walls, raised ways, the second fixture

* **(a) Retaining walls.** The massing reads only `H` and the datum. S10 and S11 level the plot and raise its
  `RetainingWall`s (item 110 (a)); the site plan keeps `H` on one level of the plot and off the wall, so no wing crosses
  or stands on a wall, and a building backing onto one stands off it by the template's rear setback, **which may be 0** (a
  row built against the terrace wall — the ordinary terraced street; second revision, V2C-57). **The datum reads its own
  terrace** (item 370, item 231): S10 and S11's levelling is a platform datum, never a
  write to the raster (V05's item 309), so every datum sample is `levelledGroundCm(doc, key, p)` — the levelled
  plot's, block's or ward's platform, else the unlevelled raster — and a wing-vertex sample within `terrace.wallBandCm`
  (250 cm, one refined raster cell) of a `RetainingWall` chain is replaced by the sample at the point moved along the
  wall's normal, toward the side that holds the wing's centroid, until it lies `terrace.wallBandCm` from the wall's line —
  so `levelledGroundCm` reads the wing's own terrace, never the platform across the wall, and a house is neither lifted
  toward the terrace above nor sunk toward the one below (T-V2-51). A walk-out basement where the plot's low edge is a
  wall is V03's item 242 (a) (§2.6's basement rule reading the step there; its door on that side; reconciliation
  round 3, S23R2-07). V02 adds no wall rule (J-V2.72).
* **(b) Raised ways** — viaducts, elevated roads and aqueducts, **generated at CITY and METROPOLIS** where a ravine or
  valley, a link between high wards or a water need calls for one, declared at TOWN, and added or removed by the user, a
  removal holding through regeneration (item 110 (b) as revised ~23:40). V02 composes nothing on a raised part (J-V2.71);
  its piers and the strip under its deck are obstacles the base's plots avoid (S10, S11, V01), so no `H` meets them;
  an aqueduct's terminal basin, cistern or fountain house is its class's building (V11's `conduit_house`). Nothing
  in V02 depends on whether a raised way was generated or declared: when the user removes one, the ground it frees is
  re-plotted by the base's locality and its new buildings are ordinary massings; **when the user adds one, or an epoch raises one (V06), every building whose
  footprint meets a pier or the under-deck strip (V01's V01 §3.17.3 (2): the strip is a hole in the faces it crosses)
  takes the base's least-disruption fates, its plot removed by V01's V01 §3.17.4 add path** — the same set on every
  path, so a way founded at an epoch (V06 §3.19 (7), its households displaced with cause `clearance`) and the same way
  regenerated at its address stand over the same open ground (reconciliation round 1, S23-01, ST-08; J-V2.89: the second
  revision's exception for buildings below the deck's underside less `raised.clearCm` is withdrawn, because item 110 (b)
  keeps the spaces between the piers open or vaulted). The least soffit over a crossed way is V11's
  `raisedWays.structure.clearanceCm`, which V01 reads; V02 keeps no clearance of its own. A building inside an arch vault under a raised way (V04's `archVault` chamber;
  the `@underground` rows) is clamped under the vault's soffit by M11's `vaultClamp` (V2C-67 (2); X29).
* **(e) The second known-city fixture** (an original skeleton, at M3a). V02's building bars T-V2-44 – T-V2-47 and T-V2-51
  run on its stepped temple, its mole with a mid-mole tower and a fort at its mouth, its jetties' deck buildings, its
  terraced wards and **its arena, an `ovalCourt`** (the `arena` family row, V02 §3.10.2, laid by `massOval` from M3a; T-V2-42) — its lighthouse islet's tower is
  an ordinary land building (V02 §3.16 (2)); the fixture's own bars are V12's (X25). Because the fixture stands at M3a, the tier construction
  and the deck buildings ship with the base outline builder there (V02 §8.5; item 229).

## 4 Editing

### 4.1 The declarations — two event kinds under T9 `shape` (item 351)

Item 101's rule is kept: no thirteenth tool. The building tool T9 `shape` (L3) gains parameters, each an existing
event or one of two new event kinds; a new building is still T6 `place` / `build`, whose S11 run is the massing.

```ts
| { t: 'setMassing'; building: Id; op: MassingOp }
| { t: 'setComposition'; building: Id; op: CompositionOp }
type MassingOp =
  | { op: 'family'; family: MassingFamilyId }                                                   // re-lay the building as another family: V02 §3.9 W1–W9 with that family, the current wings the seeds; draws on siteplan.mutate (V02 §3.12)
  | { op: 'addRange'; from: PointsForm /* two points: the range's centre line (item 101 (i)) */; widthCm?: Cm; floors?: number; role?: 'range' | 'cross' | 'service' }
  | { op: 'reshapeRange'; wing: number /* key */; ends?: [PointCm, PointCm]; widthCm?: Cm }    // the centre-line and width handles
  | { op: 'addTower'; from: PointsForm /* one point: the centre */; radiusCm?: Cm; shape?: 'round' | 'square' | 'octagon'; turret?: boolean; floors?: number }
  | { op: 'moveTower'; wing: number; at: PointCm; radiusCm?: Cm; shape?: 'round' | 'square' | 'octagon' }   // shape: the ring re-made at the same centre and radius
  | { op: 'addBlock'; wing: number /* the host range */; at: PointCm /* on its ridge */; lengthCm?: Cm; depthCm?: Cm }
  | { op: 'backRange'; on: boolean; lengthCm?: Cm; widthCm?: Cm; side?: 'left' | 'right' }
  | { op: 'removeWing'; wing: number };
type CompositionOp =
  | { op: 'dormers'; wing: number; eave: 0 | 1; count: number; widthCm?: Cm; kind?: DormerKind }
  | { op: 'porch'; kind: PorchKind | 'none'; widthCm?: Cm; depthCm?: Cm; entrance?: number /* an Entrance ordinal: set → the secondary porch at that side, rear or yard entrance (a hood or none) */ }
  | { op: 'room'; role: 'hall' | 'gatehall' | 'chapel'; on: boolean; fromCm?: Cm; toCm?: Cm /* the extent along its host's ridge, from the host's ridge start */ };   // V02 §3.8's rooms: on or off, and their extent
```

Storeys and roofs of one wing are `setAttr` on the paths `wings/<key>/heights/floors` and `wings/<key>/roof`
(`kind`, `pitch`, `high`) — the base's `setAttr` of heights and roof, addressed by key (item 351). A lock on
`wings/<key>` (an attribute-level lock, §7.2) holds that wing against every mutation, re-derivation and edit of another
wing. Re-rolls are the base's `regenerate` with `rung: 'wings'` or `'rooms'`; the massing's re-roll is New random on the
building's plot. **Draws (J-V2.18, as V02 §3.12 states once):** the geometric ops draw nothing — a default an op leaves
out is the row's deterministic central value (the midpoint of a range cell, the heaviest weight of a weighted one); the
`family` op draws on the mutation's stream `siteplan.mutate`, a pure function of its key, so a replay is exact either
way.

### 4.2 What each `setMassing` does — dry run, commit, locality, undo

1. **The new wing set, as values.** `family`: V02 §3.9's steps, recorded as `MutationStep`s in `EditBase.mutations`; a
   `family` op into or out of `stepped` also writes the use's stepped specialisation in the same undo group (V02 §4.6 (1);
   SCC-28).
   `addRange`: the points form's two points (snapped; the authoring boundary's resampling and snap, §7.1) are the centre
   line; width as given or the row's middle width; an end within `w` of another range's long side ends on that side (a
   butt joint, the new range abutting); an end within `w/2` of another range's free end, turned by more than 2°,
   mitres with it; role `range` unless given; floors as given or the `main` wing's; roof by the role's default kind.
   `reshapeRange`: the ends and width move; every range abutting it is re-trimmed to its new side; a block on it is
   re-split (V02 §3.5 M7). `addTower`: the one point is the centre; radius and shape as given or the row's middle; floors
   one above the tallest wing it meets. `moveTower`: the same tests at the new centre, and a new `shape` re-makes the ring
   at the same centre and radius (the room and stair of a stored plan re-cut by the plan rung). `addBlock`: V02 §3.5 M7 on
   the host at the given point. `backRange`: V02 §3.5 M9 on or off with the given sizes and side. `removeWing`: the wing
   leaves (its key is never re-used); a removed block's host pieces re-join into one wing that keeps the lowest of their
   keys; **removing the `main` wing passes the role to the longest remaining range** (ties by key). **Bends, never
   refusals (item 101 R2; second revision, V2C-47 (7), J-V2.79)**, each named in one line with its closest alternatives:
   `removeWing` of the building's last wing bends to T6's `remove` of the building, one undoable event (`bend.building.remove`:
   "Removed the building with its last wing"); `reshapeRange` on a row quad — whose party walls are the plot's (J-V2.13) —
   bends, for its ends' moves along the frontage, to the plot edit that moves that party-wall line: the plot's `moveVertex`
   on the line's frontage vertex, the neighbour's quad re-clipped by S11, both in one event (`bend.row.plotLine`; a lock on
   the neighbour's quad or plot is refused with the lock named, R2's second class), and for its width (the quad's depth into
   the plot) re-cuts the quad's rear chain at the new depth inside the plot and the back region, the quad then an edited,
   pinned wing; `removeWing` on a row quad that is not the building's last wing removes it — a gap in the row, the
   neighbours' party-wall ends reclassed as gables by the roofscape (V02 §5.2 step 1), the remaining wing taking `main`; a
   `family` op whose family is unreachable or infeasible on the building bends to the reachable, feasible family nearest it
   — the fewest growth-lattice steps, ties by the target row's weight — naming the least plot the asked family needs and
   offering `join` (`bend.family.nearest`). Every writer re-sorts the wings into the canonical order (V02 §2.1) and rewrites
   `MassingRef.segments` before the dry run's checks.
2. **The dry run** (on the overlay, §7.1): the region the edit may use is the plot less the footprints of the plot's
   other buildings, each buffered by `attractCm` — so a hand may build to the plot line, never over a neighbour, a
   passage's other side or a way. The checks are V02 §3.5 M13's (tiling apart from towers, containment in that region, the
   ring rules, `minEdge`) and M8 (ii)–(v) for any tower; M10's budget is not applied to a hand edit (the capacity follows
   the shell). A failing op is **bent to the nearest lawful one**, named in one line (item 101 R2): a range crossing the
   region's boundary is clipped to it; a tower that would stand through a wing moves outward along the line from the
   wing's nearest boundary point by the least distance that passes (iii); a range overlapping another is trimmed to a
   butt joint; a wing below 4 m² or with a side below `minEdge` is grown about its centre line to the least lawful size —
   its width first to 2 m, then its length until 4 m² — inside the region (`bend.wing.grow`); an op
   reaching beyond the plot is clipped to it (the first bend) and its line offers `join` with the neighbour (T9's `join`,
   §7.1) as the way to more land. An op on a locked wing, or one that would move a locked wing, is refused with the lock
   named — with a dossier fact (item 20), the only refusals (item 101 R2). **The dry run also lists**, from V03's `plan`
   query, every stored-plan room, edited opening and furnished room the op would orphan (V03 §3.11, 4.3), each with §7.3's
   orphan actions.
3. **The commit** runs S11's operator on the plot with the building's new wings as fixed (the path `moveFootprint`
   already takes, §2.6 rule 5): the footprint face re-inserted with the plot's other buildings fixed, `deriveBase`, the
   entrance set re-derived (an edited entrance kept, §7.2; the massing's entrance hint re-read), the basement re-derived
   unless edited — **keeping the crypt** of an `always` class with no condition, and a `basement`-class church's while its
   class stays in the church family, the cathedral's by the no-refusal ladder and its wet-ground lift (V02 §3.14.5) — the
   yard partition re-fitted (a new hole typed `court`, item 303), the capacity function re-read and
   any excess re-homed by §4.7's overflow pass, the first carry — and, for a stored composition, its re-match by key
   (V02 §3.9 W8), and a **stored plan is re-cut inside the event** by V03's 3.11 around its edited parts. An
   unstored `wings` rung is marked stale.
4. **Locality (§7.3 item 1).** The effective scope is the plot (its faces and buildings), the passage a wing spans
   (the base's rule) and the buildings receiving re-homed households; T-V2-19 checks that nothing else changes.
5. **Undo** keeps the former wings, `Building.massing`, `nextWingKey`, the stored composition and everything S11's
   re-fit changed (§7.4's S11 rows); undo restores them exactly, a re-homed household's former building included.

### 4.3 What each `setComposition` does

The first `setComposition` on a building **stores its composition** — the current derived composition, with the op
applied — as `Building.composition` (the base's rule for the first composition or plan edit, §2.6), its record `edited`.
`dormers`: the count is clamped to the eave's bays (`facadeBays`) and named if clamped; the row is marked `edited`
(a fixed input to the plan rung's dormers, V03). `porch`: a kind whose space fails (V02 §3.7) is bent to the nearest
feasible kind, named; with `entrance` it sets or removes the secondary porch there (a hood; any other kind is bent to a
hood, named). `room`: turns the hall, the gate hall or the chapel on or off and sets its extent along its host's ridge,
bent to the nearest lawful extent by V02 §3.13 (3)'s rule and named; the room is marked `edited` (a fixed ring for the plan
rung) and kept through a re-derivation of the `rooms` rung while its host keeps its key; a stored plan is re-cut inside the
event by V03's 3.11, the dry run listing the stored-plan rooms, edited openings and furnished rooms the op would orphan
(V03 §3.11, 4.3); turning a room on where no host
admits it **bends** (item 101 R2): a gate hall without a `gate` range becomes a **gate passage**
through the wing carrying the main entrance — from eave side to eave side at the entrance's offset, the row's central
`gateHallM` wide, its two ends arches to the street and to the yard behind (`bend.room.passage`); a hall or chapel goes to
the `main` wing, else the largest storeyed wing (a chapel at its east end by V02 §3.8's rule); on a building whose wings are
all solid, the op first turns the tiers above tier 0 storeyed (the `tiers` op's `solid: 'lower'`, V02 §4.6) and then places
the room in the lowest of them, both named. The effective scope is the building. Undo restores the former composition, or removes the stored
one when this event stored it (J-P48 (5)); the rooms and plan points the stored composition holds are carried by
`carryWings` (the base's rule); its composed wings and towers follow their base wings by key (V02 §2.2).

### 4.4 The lifecycle rows (for §7.4's table; item 351)

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate |
|---|---|---|---|---|---|---|
| `setMassing` | T9 `shape` handles and family picker at the building band; the clerk's `shape` call; a skeleton file line | `Building.wings` (roles, keys), `Building.massing`, `nextWingKey` | log; the wings are model data | the edited wings are a fixed input to every later S11 run on the plot (§7.2: implicitly pinned), carried by `carryWings` under warps; a designation mutation keeps an edited wing (the base's step 4) | the undo record: the former wings and massing reference, and S11's re-fit | by the building's address and each wing's key (item 346's anchor); an op naming a key that no longer exists is orphaned and reported; a `family` op whose family a later grammar retires maps through the grammar's migration row |
| `setComposition` | T9 `shape` at the building band; the clerk | the stored composition's dormer rows, porch, secondary porch and edited rooms | log; the first one stores the composition | a fixed input to the `wings` rung (dormers, porches) and the `rooms` rung (an edited room), re-matched by key when the wings change (V02 §3.9 W8); an edited dormer row a fixed input to the plan rung | the former composition, or none | by the building's address and the wing key (a secondary porch by its entrance ordinal) |

**Orphans (§7.3's orphan table; J-P48).** An edited dormer row whose eave changed length by more than ± 10 % (V02 §3.9 W8),
an edited room whose host key left, and a secondary porch whose entrance left are listed in §7.3's orphan table with two
actions: **re-attach** (a dormer row to the same eave of the same key, its count clamped to the new bays; a room to its
role's lawful host by V02 §3.8, its extent clamped; a porch to the nearest side, rear or yard entrance) and **discard**
(the derived value returns). Nothing orphaned is dropped silently.

**Controls (§7.8; item 402).** `fantasyShapes` is a registered control: output metric "the share of fantasy families
among composed buildings", consuming stage S11, locality class *re-derive from S11* (the fate report first, §7.1),
continuity *discrete* (off / on), documentation anchor V02 §3.3; it sits in the advanced panel. The `FM` building look
(V02 §3.10.8) is a style choice listed for V09's style panel (a cross-volume item, V02 §13); it changes no model byte.

### 4.5 The canvas, the clerk and the skeleton file

* **Canvas handles** (V09 draws them; this is their contract): at the building band, each range shows its two
  centre-line end handles and one width handle (drag → `reshapeRange`), each tower its centre and radius handles
  (→ `moveTower`) and a shape chip (→ `moveTower { shape }`), each wing a storey stepper and a roof-kind chip (→
  `setAttr`), each eave a dormer stepper (→ `setComposition dormers`), the main entrance a porch chip and every side, rear
  or yard entrance a hood toggle (→ `setComposition porch`), and — at the building band with the plan shown — the hall,
  gate hall and chapel an on/off chip and two extent handles along their host's ridge (→ `setComposition room`); a
  **family strip** shows the
  feasible families of the building's row, each as a ghost made by a dry run of `setMassing family`, one tap committing
  it. Every drag previews its dry run live inside the plot (the base's interaction contract, §14) and commits one event on
  release.
* **The clerk** (V10) calls the same operations through the tool API (§11.2): "make the manor an H" is
  `setMassing { family: 'H' }`; "a round tower on the north-east corner" is `addTower` with that corner's point;
  "two dormers on the street side" is `setComposition dormers` on the `main` wing's street eave. It reads a building's
  massing (family, wings with roles, storeys, roof kinds, towers) and composition (dormer rows, porch, rooms) through the
  reader, under §9.2's knowledge rules — the mass of every building is public (J-A30.83), and nothing in this volume is
  concealed (a front's concealed rooms are the plan's, V03).
* **"Why is it this shape?" — the `WhyProvider` (V10 §3.9; J-V2.51).** `@plat/buildings` registers a provider
  for the kind `building` at the paths `massing`, `wings/<key>` and `composition`. It fills V10's `WhyAnswer` without
  a new field: **`facts`** — `massing/family`, `massing/row` (the key the chain reached), the manifested band and value,
  the drift bounds, `fantasyShapes`, `massing/segments`, `massing/axis` with `MassingRef.low`, each wing's role, floors and
  roof, and the **alternatives** as fact rows — `massing/alternatives/<family>` = its renormalised weight among M3's
  feasible families (or `infeasible: <the failed test>`), `wings/<key>/rejected/<i>` = the M8 test (i)–(v) a rejected
  tower candidate failed, `composition/porch/d` and `composition/porch/feasible`, `composition/dormers/<key>/<eave>/dropped`
  = the obstacle of a dropped dormer — each with `tier: 'derived'` and `row` the `composition.json` slice; **`cause`** —
  S11's massing (`step: 'S11'`, `rule: 'V02 §3.5'`, `chance: 'massing'` with its creation index), the `setMassing` event
  (`seq`), or the mutation's W1 draw or kept seeds (W2; `chance: 'siteplan.mutate'`); the sunlit choice names `sunBias` and
  the options' factors. The alternatives are **recomputed** by re-running M3 and the M5/M8 tests on the committed state
  without advancing any stream (a pure function), so the answer on an untouched building equals the massing's recorded
  draws (T-V2-43). "Why no crypt / why this crypt" is V03's and V04's provider (item 238's `Basement.crypt`).
* **A skeleton file** carries these events as ordered declarations like any other (§11.1): a building declared with
  `build` then shaped by `setMassing` lines is re-created exactly by the creation prefix's fold (§4.1's read-ahead reads
  no stage-3 declaration ahead; the massing runs when its plot's S11 runs, and the declared ops apply at their log
  positions).

### 4.6 Editing stacks and deck buildings (rewritten by the second revision)

```ts
// MassingOp (V02 §4.1) gains one member (six fields added by the second revision)
  | { op: 'tiers'; count?: number; insetCm?: Cm; top?: 'flat' | 'shrine' | 'roofed'; stairs?: 'axial' | 'flights' | 'internal' | 'none';
      stairWidthCm?: Cm; shape?: 'rect' | 'round' | 'octagon'; lowerRoof?: 'flat' | 'pent'; solid?: 'all' | 'lower' | 'none';
      shrineInsetShare?: number; centre?: PointCm; radiusCm?: Cm }
    // re-lay a stepped building's stack on its tier 0 (layTiers' anchored mode); on any other building it first bends to family 'stepped'
```

**No refusal but a lock or a dossier fact (item 101 R2; J-V2.79).** Every limit of a stack, a deck or a row below is a
**bend** to the nearest lawful declaration, named in one gentle line with its closest alternatives; the bend's words are
V09's (X21) and the clerk's (X22) under the ids of V02 §1b (`bend.tiers.*`, `bend.stack.*`, `bend.deck.single`, …).
The bends draw nothing (V02 §3.12) and each is one undoable event; undo restores the building's leaf digest exactly.

1. **The `tiers` op.** On a building that is **not stepped** it bends to `setMassing { op: 'family', family: 'stepped' }`
   followed in the same event by the op's values (`bend.tiers.stepped`: "Made it a stepped building first") — V02 §3.15.5's
   anchored `single → stepped` on the building's `main` range, through `single` by the growth rows, drawing on
   `siteplan.mutate` as a `family` op does; where W1's anchored test fails, `bend.family.nearest` (V02 §4.2) applies.
   **The stepped specialisation (J-V2.94).** This bend, and a `setMassing { family:
   'stepped' }` op, write in the same undo group (§7.1's `EditBase.group`) an `editTable` row op on the use's
   `siting.declared` `use:` row (V11 §4.2), setting its cell `specialisation` to the id of V11 §3.24.3's row for the
   use's culture and class where one exists, else `stepped_temple` for a class of the worship family, `terraced_palace`
   for `palace`, `tiered_tower` for `tower_house`, `mage_tower` or `watchtower`, and no cell for any other class (its own
   plan rows stay) — so `Use.specialisation`, the heights row where the specialisation names one (`stepped-shrine`) and V03's plan rows follow the
   hand-made stack, held and exempt from the chance and the cap (V11 §3.24.3). A `family` op from `stepped` to another
   family on a use holding a stepped specialisation writes `specialisation: 'none'` the same way. Undo removes the row op
   with the event; a skeleton file replays both lines.
   **On a stepped building** the `tiers` op re-runs `layTiers` in anchored mode on tier 0 with `MassingRef.stack` and the op's values, with no
   draw: a value the op leaves out keeps the stored one (the count: the tiers now standing; the step `stack.insetCm`; the
   grade `stack.grade`; the top; the stair form; the stair width: the current stairs'; the shape, the skirt, the solid mode
   and the shrine's inset as laid). **A new tier** takes the row's central values: `floors = max(1, round-half-up(central(
   tierFloors) × taper^k))`, or height `central(solidHeightM) × taper^k` to the centimetre (V2C-63 (4)). **Keys (V2C-63
   (2)–(3)):** a kept tier keeps its key, and its ring and heights exactly where the step, the shape and the stair form are
   unchanged (else its ring is re-inset, its key and heights kept); a stair keeps its key across a change of stair form
   while its tier stands (its ring re-laid), and is removed with its tier or under `internal` or `none`; tiers above the new
   count are removed with their stairs and every wing standing on them (keys retired); new tiers and stairs take keys from
   `nextWingKey`; the shrine comes and goes with `top`.
   **The fields and their bends:**
   * `count` above what fits is bent to the most that fits; `insetCm` that leaves no second tier to the largest lawful step
     (`bend.tiers.count`, `bend.tiers.step`).
   * `stairs`: `flights` on a round or octagonal stack bends to `axial` (`bend.tiers.axial`); **`internal` over a solid tier
     0** bends to `none` where every tier is solid, else to `axial` (the first form of J-V2.74's order; `bend.tiers.none`,
     `bend.tiers.axial`); `none` over a storeyed tier 0 bends to `internal` (`bend.tiers.internal`); where the reserve of the
     asked form does not fit in front of tier 0 inside the plot, the forms are tried in J-V2.74's order, and where none fits
     the current form is kept, named with the depth the asked form needs.
   * **`none` — the sealed stack** (V2C-47 (2)): lawful wherever tier 0 is solid; ST3 uses `d` on every side, ST5 lays no
     stair, ST6 skips the chain check, `stairChain` is empty and `landingSide` null; a storeyed tier or shrine on it is
     reached by nothing (V03's `W_TIER_UNREACHED`), which the line names.
   * `shape` re-lays tier 0 as the named shape inscribed in its current ring's bounding rectangle in the building's frame
     (a round or octagonal ring at that rectangle's inradius, a rect at the rectangle itself), the stack re-inset.
   * `centre` and `radiusCm` (a round or octagonal tier 0): tier 0 re-laid as the regular ring of that centre and
     circumradius, clipped by the least move to the plot region (V02 §4.2 step 2), the stack re-inset.
   * `lowerRoof: 'pent'` bends to `flat` where the stair form is not `internal` or `none` (equal insets, V2C-52;
     `bend.stack.roof`); a stair form turned `axial` or `flights` on a pent stack turns its lower roofs `flat` in the same
     event, named.
   * `solid`: `'all'`, `'lower'` or `'none'`; a tier turning storeyed takes the row's central floors (round-half-up), one
     turning solid keeps its `eaveCm` (less any parapet) as its height; a stair form made unlawful by it bends by the rules
     above (`internal` over a solid tier 0; `none` over a storeyed one).
   * `shrineInsetShare` re-lays the shrine (ST4's tests; a shrine that no longer fits drops the top to `flat`, named).
2. **A tier's height.** `setAttr(wings/<key>/heights/floors)` on a storeyed tier or the shrine, `setAttr(wings/<key>/
   heights/eaveCm)` on a solid tier (item 351's paths). Inside the same event `rebaseStack` re-bases every wing standing on
   it, directly or through the chain, and each stair whose rise changed is re-laid (ST5, its width kept): where the terrace
   no longer holds the run at the stack's grade, the grade steepens up to `stairGradeMax`; beyond that the height is bent to
   the most the terrace allows, named ("the stair up this tier needs room on the terrace below"). **`setAttr(wings/<key>/
   heights/baseCm)` on a wing with `on`** (V2C-50 (3)) bends to the same change in the height of the wing it stands on —
   a solid support's `eaveCm` by the difference, a storeyed support's floors by `round-half-up(difference ÷ storeyCm.upper)`
   (a zero result a no-op, named) — then the rules above (`bend.stack.base`); a user's `baseCm` on a ground wing is kept
   (J-DET-24) and carries the stack through `rebaseStack`. From M3a to M6c the base's `setAttr` of a wing's heights (the
   wing's index, which equals its key) does the same through the base outline builder (item 229).
3. **Roofs on a stack (V2C-56 (2)).** `setAttr(wings/<key>/roof)` bends, named (`bend.stack.roof`): on a lower tier to
   `flat` or to its shape's pent kind (`hip` rect, `pyramid` octagon, `cone` round), the pent kind only under `internal` or
   `none` (else `flat`); on the top tier among `flat`, `hip` (rect), `pyramid` (octagon) and `cone` (round) — another kind
   bends to its shape's kind; on a stair to `shed`; on the shrine among the kinds of `TierCells.shrine.roofs`, else the first.
   `MassingRef.stack.lowerRoof` stays the laid default that a later `tiers` re-lay applies.
4. **The other `setMassing` ops on a stepped building (V2C-47 (4)–(5), V2C-63 (1)–(2)).**
   * `reshapeRange` on tier 0 re-insets the whole stack from its new ring (keys kept; a tier that no longer fits removed with
     its stair and everything on it, named).
   * `removeWing` on **tier k ≥ 1** removes it, its stair (the stair whose `to` is tier k), every wing standing on it and
     every higher tier with its stair (named). `removeWing` on **tier 0** removes the stack — tier 0, every stair and every
     wing standing on it; any ground wings added beside it stay (the longest takes `main`, the family becomes `single`,
     `stack` is cleared), and with none left it bends to T6's `remove` of the building (`bend.building.remove`).
   * `removeWing` on **a stair** bends to `tiers { stairs: 'internal' }` where tier 0 is storeyed ("Removed the stairs; the
     tiers are now reached from inside"), else to `tiers { stairs: 'none' }` ("… the pyramid is sealed") —
     `bend.tiers.internal`, `bend.tiers.none`.
   * `addRange`, `addTower` and `backRange` are admitted as **ground wings** (no `on`; `bend.stack.groundWing` names the
     placement): each is laid by V02 §4.2's rules outside tier 0's ring, every stair's ring and stair 0's **approach strip**
     — the reserve's width, `landingM` deep in front of stair 0's foot (under `internal`, `landingM` in front of the main
     entrance; under `none`, no strip) — moved away from them by the least distance; a range ending within `w` of tier 0's
     side abuts it (a butt joint, rule 1's shared vertices), a back range takes tier 0 as its host (M9's rear side), and a
     tower passes M8's tests (ii)–(v) with tier 0 as its host wing and its ring clear of every wing standing on tier 0,
     every stair and the strip, its eave raised above tier 0's roof in its ring (M11). **`addBlock`** (a block splits a
     range, and a tier is not a range) bends to `addRange` of the block's size at the given point on the ground beside tier
     0. M13's pairing then covers tier 0, stair 0 and the added wings; ST6's nesting is unchanged.
   * `family` runs V02 §3.15.5's rows.
5. **Deck buildings.** Every op works as on any building, inside the deck plot (V02 §4.2 step 2's region, which lies inside
   the deck's width); **a floors value above the deck's `maxFloors` is bent to it, named** ("a deck carries at most n
   storeys") — for `setAttr` of floors and `addRange`'s `floors` alike (J-V2.70); M10's budget is not applied to a hand edit
   (V02 §4.2), so the plot alone bounds the footprint; **a `family: 'stepped'` op on a deck building bends to `single`**, the
   deck's lawful family nearest a stepped mass (`bend.deck.single`: "A bridge carries small, light buildings" — the deck's
   kind named). A hand placement of a crypt-bound use on a deck plot bends to the landward land plot (V02 §3.16 (6)).
6. **Locality, undo, lifecycle.** As V02 §4.2 (4)–(5): the effective scope is the plot (a `bend.row.plotLine` adds the
   neighbour's plot, both in one event); a stack's re-base and re-lay stay inside the building. The undo record keeps the
   former wings, `nextWingKey` and `MassingRef.stack`. The `setMassing` row of V02 §4.4 covers the `tiers` op and its
   bends unchanged (create, read, persist, regenerate, undo, migrate), and a skeleton file carries `tiers` lines like any
   other `setMassing` line (a bent line replays to the same bend).
7. **The clerk, the canvas and "why".** "Give the temple five tiers" is `tiers { count: 5 }`; "a shrine on top" `tiers {
   top: 'shrine' }`; "stairs along the faces" `tiers { stairs: 'flights' }`; "seal it" `tiers { stairs: 'none' }`; "make it
   round" `tiers { shape: 'round' }`; "skirt roofs on every tier" `tiers { lowerRoof: 'pent' }`; "one more storey on the
   second terrace" `setAttr(wings/<key>/heights/floors)` (V10, X22). V09 draws, at the building band, a tier
   stepper, a step handle on tier 1's front face, stair-form, top-form, shape, skirt and solid chips, a shrine-inset handle,
   the centre and radius handles on a round or octagonal tier 0, and a storey or height stepper per tier (X21). The
   `WhyProvider` (V02 §4.5) adds the facts `massing/stack/*` (shape, the row's stair form and the one laid, lowerRoof, top,
   insetCm, grade, truncated, the drawn count, the derived aspect), `wings/<key>/on`, `wings/<key>/solid`,
   `massing/stairSteep` and each bend taken (`massing/bend/<id>`), and for a deck building `massing/deck` (the deck kind, its
   host, the budget band and `maxFloors`, and whether the fallback constants were read), each with its `composition.json`
   or V11 slice — no new `WhyAnswer` field.

## 5 Rendering, labels, exports

### 5.1 What each band draws (§8.5's bands, with stage 3)

| band | stage 3 draws | from |
|---|---|---|
| **city** | the massing as masses — the base's closing per block (§8.5 (2)): a courtyard building's court stays open when it is wider than the closing's 1.5 px (a court is a yard part, `ground` at this band); towers and cross-wings show in the mass's silhouette; no roof lines | model (eager) |
| **district** | footprints with outlines and entrance ticks (the base's), and the **roofscape of the massing** (V02 §5.2): ridges, hips, valleys, walls, tower roofs and spires, the cupola — drawn by the style's construction; an `arcade` wing's ground-storey outline dashed; no dormers or porches | model, drawn lazily per tile |
| **neighbourhood** | the district band's, plus — where the building's `wings` rung is current or stored — dormers, the entrance gable, the porch, and §8.10's decorative chimneys at the façade-bay lines (`hearths` of them; none once the plan rung exists, the base's J-A28.85); the change marker on a stale building (§8.5) | model + the elaboration cache |
| **building** | the neighbourhood band's at full detail, and the plan storey by storey (V03); the other storeys' wing outlines faded beneath (the base's) | model + cache |

Under a Works (item 67) a building draws its wings at their stage heights and the `states` rows (§8.2): `wallsRising`
draws no roofscape facet, `roofFramed` draws the roofscape's lines through §8.2's `frame` program without fill, a
`decayed` or `ruined` building (roof kind `none`) draws no facet — its walls by §8.2's `states` rows (a ruined landmark,
V02 §3.14.2, included). **A stack under Works** takes its stage heights from item 318's
`heightsAt` — the stack rising in stack order, a solid wing by courses of `storeyCm.upper`, no wing drawn or cast before its
support reaches its eave, each stair rising with the tier whose top it reaches, a demolition lowering in reverse (V02 §5.6);
the same order reaches V06's Works (X23). A building whose roof kind is `none` takes no dormer, porch or cupola drawing. Condition (`worn`,
`neglected`) and material stay texture and colour on the same facets (item 19).

### 5.2 The roofscape — one roof plan per building (item 406)

`roofscape(building, composition?)` returns planar, pairwise non-overlapping facets that together cover the footprint
(and a porch outside it). It is derived at read in the tile worker (drawing, float64, the renderer's CPU reference) and
in the generation worker (exports); it stores nothing and draws nothing from any stream.

1. **Ends (`resolveEnds`).** Each wing with a ridge has two **ends** — the ring sides its ridge meets (sides 1 and 3 for
   `ridgeAxis 0`, 2 and 4 for 1). Each end is classed, in this order: `open` if a tower ring covers it; `party` if it lies
   on a party-wall edge of the plot (a row quad's side); `mitre` if it is shared vertex for vertex with another wing's
   end; if it lies along another wing `Y`'s side (a butt joint): `wall` when `Y.eaveCm ≥ X.ridgeCm − 10`, `gable` when
   `X.ridgeCm > Y.ridgeCm + 10` (the end wall rises above `Y`'s roof), else `valley`; a free end is `hip` on a `hip`
   roof and `gable` on every other kind. A block's side partly shared with a piece's end is classed on the shared part.
2. **Ridge lines.** The base's ridge (for a `rect`, the midpoints of its ends; for a `quad`, the arc-length midpoints of
   the chains its `ridgeAxis` names, §2.6), with each end adjusted: `hip` pulls the ridge end inward along the ridge by
   `WingRoleRow.hipInset × span` (0.5 — the plan hip at equal pitches — for ranges; a block's `FM` entry — V02 §3.10.8's measured-rate cell, 0.25 until calibrated (reconciliation round 1,
   SCC-R0C-4) — keeps a ridge half its short side long, never a pyramid; the hip facets' own pitch then follows from the inset and the rise),
   collapsing to the centre only when the wing is no longer than `2 × hipInset × span`;
   `valley` extends it into `Y` by `e = (X.ridgeCm − Y.eaveCm) ÷ Y.slope`, the plan distance at which `X`'s ridge meets
   `Y`'s near roof plane (`slope` = the roof's rise per centimetre across); `gable`, `party`, `mitre`, `wall` and `open`
   leave it at the end's midpoint (a mitre end's midpoint is the path vertex).
3. **Facets per wing.** `gable` / `hip` roofs: the two long facets from each eave to the ridge, a hip triangle at each
   `hip` end; a `valley` end's facets continue into `Y` up to the **valley lines** — the plan projections of the lines
   where `X`'s facet planes meet `Y`'s near facet plane, clipped to `Y`'s footprint (where `X`'s eave is below `Y`'s, the
   valley starts inside `Y` on the line where `X`'s facet reaches `Y`'s eave height). `shed`: one facet from the low eave
   to the `high` side. `pyramid` and `cone`: one triangle per ring edge to the apex over the ring's centroid. **Pent band
   facets** (J-V2.75): for a wing `x` with a pent roof and the wing `y` standing on it — their
   rings concentric with equal insets and the same vertex count (ST3, ST4) — the facets are the band between the two rings:
   for each side `i` of `x`'s ring one planar facet from that side at `x.eaveCm` to the matching side `i` of `y`'s ring at
   `x.ridgeCm` (two parallel edges, so the facet is planar), neighbouring facets sharing the edge from `x`'s vertex to `y`'s
   matching vertex as their hip line; a round or octagonal ring is treated per edge (a cone's band); nothing is built inside
   `y`'s ring. So `ridgeCm = eaveCm + p × d` is exactly the height at which the skirt meets the wall of the tier above, and
   the casters and the glTF and CityJSON roofs read the same facets. A pent-kind roof on a wing with nothing standing on it
   (a truncated stack's former lower tier) is laid as the top's roof instead (ST4). `tent`: as a
   cone at its pitch; a spire is a `cone` or `pyramid` at its spire pitch. `flat`: one facet at eave height, with an inner
   parapet line where `parapetCm > 0`. `dome` (a template part's roof): four latitude bands of planar quads over the ring's
   area centroid (triangles at the apex), rise = the ring's mean radius × `domeRise` (1.0; own), each band's ring the base
   ring scaled toward the centroid by `cos` of its latitude (15°, 37.5°, 60°, 82.5° by `dmath`). `plain` (the F-SKELETON
   downgrade): one flat facet at eave height with no lines. `none` (the decline's roofless state): no facet — the wing is
   excluded from the tiling check below and drawn by §8.2's `states` rows. `skeleton` (a drawn footprint, a template
   polygon): the base's validated straight-skeleton faces (§3.8), with its plain-roof downgrade. **The cupola** (M12): a
   small solid at its range's ridge midpoint — a square plan of side `0.3 ×` the range's width, a drum of `0.25 ×` that side,
   and a `dome` (as above), a `tip` (a cone of rise 2 × its half side) or a `pyramid` — standing on the ridge; its facets are
   extra (`part: 'cupola'`), painted over the roof, never in `Heights`. Every facet vertex carries its height `z` (cm above
   the building's lowest `baseCm`), so each facet has an exact plane and normal.
   **Chimneys** (the roofscape draws both kinds, §8.6, §8.10). A decorative chimney (no plan) at
   its host point of V02 §3.7, on its host's facet. A **plan chimney** (§2.6's `Chimney`, with a plan) is drawn on the roof
   or terrace facet over `Chimney.column` of the wing that holds storey `Chimney.levels[1]` and whose ring contains the
   column — so a lower tier's stack carried up through the tiers above (V03, V3C-68 (2)) rises from the top of the
   stack, never from a roof the tier above covers; a chimney whose column lies inside the ring of a wing standing on that
   wing (a stored plan not yet re-cut) is not drawn and is reported (`chimneyCovered`) until the plan re-derives its levels
   (V03).
4. **Occlusion, so facets never overlap.** Each valley region (the part of `X`'s extended facets inside `Y`) is removed
   from `Y`'s facets; each tower ring is removed from every other facet (a tower always covers what it overlaps — V02 §3.5
   M11 guarantees its eave is above every roof it meets); each ring of a wing that stands on another is removed from the facets of the wing it stands on (V02 §5.6); a dormer's plan rectangle is removed from its host facet and
   replaced by the dormer's own facets (a `dormer` or `wallGable`: two facets from its front edge to a short ridge
   perpendicular to the host's, `depthShare` up the slope; a `hoist`: the same with a flat front; the `entranceGable`:
   two facets whose ridge runs to the host's ridge); the porches, outside the footprint, add their own facets (a hood: one
   thin facet; `gabled`, `twoStorey`: two facets with a ridge square to the wall; `halfRound`: the half-cone's triangles,
   one per arc segment, to the apex on the wall line; `recessed`: none — a notch line in the eave). The result tiles
   footprint ∪ porches, less the wings roofed `none` (T-V2-9); the cupola's facets lie over it and are excluded from the
   tiling.
5. **Lines.** Ridges, hips (the hip facets' shared edges and a mitre on its convex side), valleys (valley lines and a
   mitre on its concave side), eaves (the footprint outline, the base's), a `wall` end's line, tower seams (every other
   ring vertex's edge to the apex for a cone with 16 or more sides, every edge for a pyramid).
6. **Order.** Within a building: porch facets, then wing facets, then dormer facets, then tower facets, then all lines —
   the same painter's order the reference uses (porch under the eave, the tall parts last), which with non-overlapping
   facets only decides the order of anti-aliased edges. Wing facets go in stack order — a wing's before those of every
   wing standing on it.

The **surface layer** of §8.4 (a) takes its roofs from these facets (the "roof construction" it names), so the light
pass lights the true roof planes and the tower cones. **The shadow casters are the base wings' prisms** (V02 §3.14.1):
each wing's ring from `baseCm` to its eave, and its roof's rise over its ring (a tower's cone or spire only over its own
ring) — model heights, so **no shadow of the model's masses depends on a click** (J-V2.22); they are also item 102's epoch
casters, and never a generation-time caster. **The surface-layer shading of the porches, the dormers and the cupola**
(rungs 1–2 and the roof ornament) appears with their drawing — view only, in no digest and no caster.

### 5.3 Style rows and paint programs

`StyleSheet.roofConstruction` gains `'roofscape'` (item 406), the default construction of every shipped family from
stage 3's landing; the older constructions remain for the parity presets (under `MFCG` and `FTG` the massing is the
base's, and their sheets keep their constructions). Paint programs added to §8.2's list:

* `roofscape(tone: 'twoTone' | 'mono' | 'facet')` — fills every facet in the `roof` role: `twoTone` by `faceLight` per
  facet (`lit`), `mono` one tone with the light pass's shading (`ink`, whose light is value-only, §8.4), `facet` the
  per-facet diffuse-and-specular shading of the reference look (the `FM` preset's building band; the base's §8.4 (h),
  P24); then the lines of V02 §5.2 step 5 in `ink` at ½ the building outline weight of the band (ridges and seams), ⅓ (hips
  and valleys).
* `dormer` and `porch` — their facets through the same tone rule, outlined at ½ the outline weight; `towerRoof` — a
  cone's facets with the seam lines of step 5, a pyramid's with its hips, a spire's the same at its pitch; the cupola
  through `towerRoof` at ½ weight.
* **Roof decorations (§8.10 rows, view data, keyed by the render key):** `sails` — a windmill's four sails on its tower's
  roof, turned to the settlement's prevailing wind where the site states one, else to `+y`; `smokeStack` — V02 §3.14.6's
  added decorative stacks; and, **only in the `FM` building look**, `stepStones` (a stone path from the main door to the
  frame's access side, stones 0.5–0.8 m at 1 m pitch) and `wallGrass` (grass tufts at re-entrant corners); with the `FM`
  look's per-building roof hue (`weathering` on hue at `w` 0.15, §8.2) and cone facets doubled for drawing only.
* **V01's NG draw-style bars** (the `hatched` family's two tapers per wing, §13.5): from M6a the NG parity sheet keeps
  `fakeGablePerWing`; at M6b the NG bars are re-measured on `roofscape` and the sheet switches to it when they pass, else
  keeps `fakeGablePerWing`, reported — the one sentence V01's V1-7 and X14 share.
* `hatch(ridge | eave, pitch, taper)` already in §8.2: the `hatched` family's hatch program is V01's (V01 §5.1.2), run
  per roofscape facet; the `FM` look hatches parallel to the eave at a fixed paper pitch (0.9 px at 1×, our value).
* The `lit` family's roof tint by band (§8.2, item 19) and the material's `pattern` (texture) apply per facet, never
  changing a facet (J-A19.42).
* The **contrast matrix** is unchanged: the roof role's pairs are the building role's (§8.2).

### 5.4 Labels

Stage 3 adds **no** `LabelTable` row and no S13b candidate: a building keeps the base's labels (a landmark's point label
at its footprint, an address). The room labels are the base's (§8.5, from the plan rung). Hovering a wing at the
district band and finer names it — its role in our own words from the naming slice **`building.wingRole`** (one entry per
`WingRole`, authored in V11's naming tables, V02 §13's cross-volume item: "the main range", "the gate range", "a
cross-wing", "a pavilion", "a rear range", "a service range", "a tower", "a stair turret", "a part", "a shelter"; the role
id is the fallback) and the building's name — through the reader (§11.2), under the building's `knownTo` (§9.2); nothing
here is concealed. An `ovalCourt`'s solid ranges hover as "the seating" and its `gate` passage wings as "a gate passage"
(two entries X6 adds to the slice, keyed by the family and the wing's `solid` flag).

### 5.5 Exports (item 449)

| format | stage 3 adds |
|---|---|
| **JSON schema** | per building a `massing` block (family, row, grammar, entrance hint, `segments`, `low`, `cupola`; each wing's key, role, kind, ring, heights, roof, `arcade`) and, where the `wings` rung is current or stored, a `composition` block with its state (as the base's `plan` block): row, grammar, composed wings (`base`, dormer rows with their derived positions), towers (`base`), the porch and the secondary porch with their derived rings, the courts (derived rings), the rooms; round-trips (T-V2-24) |
| **SVG** | at the district band and finer, §11.1's grouping: the roofscape's facets in the semantics `sem.building.roof` (wing facets), `sem.building.roof.dormer`, `sem.building.roof.porch`, `sem.building.roof.tower` and `sem.building.roof.cupola` (by `RoofFacet.part`), and V02 §5.2 step 5's lines in `sem.building.roofline`, each group one compound `<path>` per (semantic, district), the groups in V02 §5.2 step 6's order; the `<metadata>` map carries each facet's subpath range to its wing address `wing:<building>/<key>` (a porch's to its building, a cupola's to its range's wing) — no per-building group and no `data-wing` attribute, so §12.7's element budgets hold; at the city band nothing new (masses) |
| **glTF 2.0 / OBJ** | roofs from the roofscape facets (replacing per-wing roof meshes), towers as ring prisms with cone, pyramid or spire facets, the cupola as a small mesh; an `arcade` wing's ground storey exported open (its piers as four corner prisms, its walls from the first storey); with compositions: dormers and porches as small meshes; `extras` carry each wing's key and role. The export option `compositions`, one of `'asDrawn'`, `'derive'` or `'none'` — `asDrawn` (the default): the compositions whose rung is current or stored; `derive`: `compose()` run for every building of the export scope first, in the derivation pool, under V02 §6's export budget; `none`: the massing only |
| **CityJSON 2.0** | LoD2.2 `RoofSurface` per roofscape facet, `WallSurface` from the wing prisms, dormers and porches as their own surfaces when compositions are exported; semantics attributes `plat:role` and `plat:key` in the `Plat` extension (the base's `plat.ext.json`) |
| **GeoJSON** | an optional `wings` layer (strict and metric variants): one Polygon per base wing with `key`, `role`, `floors`, `eaveCm`, `ridgeCm`, `roof`, `building`; the base's building features carry `onDeck`, `deck` and a stepped building's `tiers` (file f item 447), and the `wings` layer repeats none of them |
| **VTT** | unchanged at the ground scene (footprint walls, the base's); a tower's ring is part of the footprint's walls; the storey scenes are the plan's (V03) |

### 5.6 Stacks, stairs and deck buildings on the map

* **Bands.** City band: the footprint (tier 0 ∪ stair 0, and any ground wings added beside it) as a mass like any
  other. District band and finer: the roofscape with the stack's occlusion and order (V02 §5.2 steps 4 and 6) — terraces as
  flat facets with their parapet lines, pent skirts as their band facets meeting the wall of the tier above (V02 §5.2 step
  3), the top's roof or the shrine's, each stair's shed facet painted by `stairFlight`; a sealed stack (`none`) draws no
  stair; chimneys only on exposed roof (V02 §3.7, §5.2). An `ovalCourt` draws its façade ring's flat roofs with their
  parapet lines and its seating ring's shed facets falling toward the floor, which is drawn as a court (a yard part). Neighbourhood and building bands: V02 §5.1's, the plan per storeyed tier
  (V03).
* **`stairFlight`** (a paint program added to §8.2's list with item 406's): the stair's facet filled by the roofscape's
  tone rule (its slope lit by `faceLight` like any facet), with tread lines across the flight, perpendicular to its climb, by `stairTreads` (V02 §2.6): `n − 1` lines at
  `goingCm` intervals from the foot, in `ink` at ⅓ of the building outline weight, stopping short of each side by a tenth of
  the flight's width; below 2 px of plan per tread the lines are omitted and the shaded facet reads as a ramp.
* **The surface layer and the shadows.** Each wing's facets enter §8.4's surface layer at their true heights (a terrace at
  its deck level, a stair's slope), so the light pass lights every terrace and step face; the casters are the wings'
  prisms from their own `baseCm` (V02 §3.15.3), kept current on every re-basing path by `rebaseStack` (V02 §3.15.2), so each
  tier's shadow falls on the terrace or the ground below it; under a Works, the stage heights of item 318.
* **The per-wing constructions** (the parity presets' sheets, and the base outline builder's drawing from M3a until the
  roofscape lands at M6a): a wing that stands on another is drawn after it, its ring clipping the lower wing's roof, and a
  stair's shed with its treads (item 419).
* **Labels.** No new `LabelTable` row. Hovering names the roles from `building.wingRole` (X6, extended by "a tier", "the
  shrine", "a stair"). A deck building keeps the base's labels.
* **Exports** (V02 §5.5's rows, extended): **JSON** — each wing's `on` and `solid`, the massing block's `stack`, and for a
  deck building a derived `deck` block (`kind`, `host`) read from its plot at export; **glTF / OBJ** — each wing extruded
  from its own `baseCm` (a tier stands on the tier below at its deck level), a solid tier as a closed prism, each stair as
  a stepped solid of `stairTreads`' `n` risers (the k-th top at `⌊k × rise ÷ n⌋`) and treads of `goingCm`, the head tread
  taking the remainder; **CityJSON 2.0** — tier 0 is the `Building`, each tier
  above and the shrine a `BuildingPart` with LoD2.2 surfaces (a terrace a `RoofSurface`, the walls `WallSurface`s from the
  part's own base), each stair a `BuildingInstallation` (an outer stair, stepped by `stairTreads`) with `plat:role 'stair'` (J-V2.77); **GeoJSON**'s
  `wings` layer — `on`, `solid` and `baseCm` per wing; **VTT** — the ground scene's walls from the footprint (the base's),
  a stair's outer sides not walls. A deck building exports as any building, its `baseCm` the deck's.

## 6 Performance budgets

Every number here is **PLAUSIBLE** (an estimate from operation counts on §12.1's reference machine) until the
measurements named below; each has its pre-decided fallback. The building counts are §1.1's (TOWN 1 200–1 500, CITY
4 500–6 000, METROPOLIS 12 000–15 000 at the rung targets; about 30 000–36 000 at the 120 000 cap, by §1.1's law of
the population). The mix is the base's assumed core mix (§2.6's cost note): about 55 % row quads, 25 % single ranges,
18 % tiled multi-wing massings, 2 % with towers.

### 6.1 The massing (eager, on the first map's path)

| building kind | massing cost per building (median; PLAUSIBLE) | basis |
|---|---|---|
| row (pass-through, heights, roof, a back range where drawn) | 1–3 µs | one frame, one rect, M11–M13 on ≤ 2 wings |
| single range | 3–6 µs | frame, `lir`, one slab, snap and checks |
| tiled families (`L`, `T`, `H`, `U`, `cross`, `rectCourt`, `gridWalk`), blocks included | 15–40 µs | ≤ 8 slabs, the pairing check (§2.6 rule 4 (ii)), ≤ 4 block trials |
| `plotRing` and the fantasy families | 30–60 µs | simplification, line offsets, mitres, angle checks |
| with towers or a turret | + 20–60 µs | per trial: a ring (≤ 24 vertices), its overlap share by the kernel's boolean on the arrangement, the seed-contract distances |
| an F-MASSING attempt | × (1 + attempts) | ≤ 3 attempts of the drawn family, then one per other family |

**Bars (the stage-3 intake, item 223):** town-wide median ≤ **10 µs** per building (the base's admission bound; the
estimate is ≈ 3 µs, rows dominating); for the composed classes (every building whose family is not `row`, `single`,
`shelter` or `baseOutline`) median ≤ **60 µs** and p99 ≤ **250 µs**; mean over all buildings ≤ **12 µs**. S11's §12.4 row
is re-declared by the measured difference (the estimate: mean + 6 µs per building).

| rung (target) | added massing CPU | added first-map wall time (3 pool workers) | share of §12.5's first map |
|---|---|---|---|
| TOWN (5 000; 1 200–1 500 buildings) | ≈ 9 ms | ≈ 3 ms (≈ 9 ms single-threaded) | ≈ 2–6 % of 124–145 ms |
| CITY (20 000; 4 500–6 000) | ≈ 36 ms | ≈ 12 ms | ≈ 3 % of 0.33–0.42 s |
| METROPOLIS (50 000; 12 000–15 000) | ≈ 90 ms | ≈ 30 ms | ≈ 3 % of 0.86–1.05 s |
| the 120 000 cap (≈ 30 000–36 000) | ≈ 216 ms | ≈ 72 ms | ≈ 3 % of ≈ 2.3 s |

**Measurement** (M6a; V02 §7's T-V2-22): the massing timed per class on B-CITY's TOWN, CITY and METROPOLIS seeds, 20 runs,
and the first-map time re-measured. **Pre-decided fallbacks, in order, each a declared shift (§13.3):** (a) M8's
candidate trials capped at 6 per building and M14's rung 0 at one attempt for the composed classes; (b) towers and
turrets off in the massing (the families kept; the rows' tower cells read 0), re-measured; (c) the base's own intake
fallback (§2.6): the base outline builder makes the outline and `compose()` works inside it (the composer then adds
only dormer rows and the porch) — reported as "stage-3 massing withdrawn at this rung" for the owner's veto (D-18).

### 6.2 The composer, the rooms rung and the roofscape (lazy)

| work | budget | estimate | when |
|---|---|---|---|
| `compose(…, 'wings')` per building | median ≤ **0.2 ms**, p95 ≤ 0.6 ms (inside the base's ≤ 1 ms bound, §12.7) | 20–150 µs: `facadeBays` per eave against the wings it meets, ≤ 2 rows per wing, one porch ray on the plot's rings, ≤ 10 draws | a neighbourhood click, a building click, a `view` tile request |
| `facadeBays` on every side (the lit windows before a plan), `stairTreads`, `cryptSeedWings` | ≤ 10 µs per wing for every side; ≤ 2 µs per call for the other two | a side's run against ≤ 16 meeting rings in integer arithmetic; one ceiling and one floor division; one pass over ≤ 16 wings | §8.4's lit windows at a night view; the drawing and exports of stairs; §2.6's basement function |
| a neighbourhood click (≈ 300–600 buildings; §12.6's district ceiling 450) | the base's 16 ms of pool time per tile, amortised; the whole neighbourhood within ≤ 120 ms of pool time, streamed centre-out | ≈ 45 ms of pool time (450 × 0.1 ms) | II.4's click |
| `compose(…, 'rooms')` per building | ≤ 0.3 ms median | ≤ 4 rectangles and one ring difference per tower storey | with the plan, on the building click |
| `roofscape` per building | ≤ 25 µs median, ≤ 150 µs p99 (a large manor) | end classes O(wings²) with wings ≤ 16, facets, float64 occlusion clips | the tile worker, per building per (leaf digest, composition hash, construction) — memoised as the base's derived-roof cache (§8.1 item 5) |
| a district-band tile's roofscape | ≤ 8 ms of tile-worker raster time for ≤ 400 buildings | 400 × 20 µs | inside §8.8's per-tile raster budget |
| `compose()` under `elaborate: 'view'` per tile (§12.7's 16 ms of pool time per tile, amortised) | only tiles **at the neighbourhood band and finer** request the `wings` rung (the district band draws the massing's roofscape and requests nothing); p95 buildings per neighbourhood-band tile at the METROPOLIS core ≤ 60 → ≈ 12 ms at 0.2 ms each | ≤ 60 × 0.2 ms ≈ 12 ms (PLAUSIBLE; measured at M6b on B-CITY METROPOLIS) | a pan under `view` |

**Measurement** (M6b): on B-CITY METROPOLIS, compose per building by class, 50 neighbourhood clicks, 200 district-band
tiles, and the buildings per neighbourhood-band tile at the core (p95). **Fallbacks:** a tile's `view` request over 16 ms is
sliced into batches of at most `viewBatchMs` (16 ms of pool time) streamed centre-out, the tile drawing the massing's
roofscape until each batch lands, reported (J-V2.53); a compose median over 0.2 ms: the porch's space test runs on the plot's ring only (the other
footprints ignored, the porch then clipped at draw); still over the base's 1 ms: the dormer rows drop to one per wing
(the street eave), reported. A roofscape over budget per tile: the valley extensions are drawn without the occlusion
clip (the abutting wing's valley triangles overpainted in order), a declared view shift.

### 6.3 Memory

* **Model:** per building ≈ 36 B for roles, keys, `nextWingKey` and `MassingRef` (with `segments`, `low` and `cupola`), and ≈ 50 B for the extra wings the
  composed massings carry (about 1.8 wings per building instead of about 1.3) — ≈ 1.2 MB at the METROPOLIS target,
  counted in §12.8's model line and re-declared at the intake.
* **The elaboration cache:** a `wings`-rung chunk ≤ **1 KB** per building at p99 (the base's line, §12.8) — its composed
  wings and towers are key references (2 B each), dormer rows 8 B each, the porch 12 B; the `rooms` rung's rings are
  counted in the plan's ≤ 4 KB per storey line (a tower room's ring is encoded as its tower's index and storey, derived
  at decode). Measured at M6b on B-PLAN's fixtures and B-CITY; fallback: the base's (the cap halves).
* **The roofscape memo:** ≤ 2 KB per building in the tile worker's session memo, LRU-capped at 8 MB per worker,
  evicting to recomputation.

### 6.4 Edits and exports

* `setMassing` dry run and commit: ≤ 2 ms per edit (one plot's S11 re-fit, the checks, the carry); `setComposition` ≤ 1 ms;
  the mutator's wing step ≤ 150 µs per building plus S11's re-fit — inside §12.6's per-edit laws, which count them.
* **Exports at METROPOLIS:** glTF / OBJ / CityJSON with `compositions: 'asDrawn'` ≤ 10 s in the generation worker (roofs
  ≈ 8–60 triangles per building, ≈ 0.4 M triangles); with `'derive'` ≤ 12 s (compose for 15 000 buildings ≈ 1.5 s of
  pool time); a district-band SVG ≤ 1.5 KB per building. **Measured** at M6b; **fallback:** `derive` streams district
  by district with the dialog's progress; if still over, METROPOLIS exports default to `asDrawn` and label `derive`
  "slow", reported.

### 6.5 Stacks and deck buildings

| work | budget | estimate (PLAUSIBLE) |
|---|---|---|
| the massing of a `stepped` building (`massStepped`: ST0–ST8, at most three attempts) | ≤ 120 µs p99, inside the composed classes' ≤ 250 µs p99 (V02 §6.1) | ≤ 9 tiers × (an inset, a stair, the containment and the sibling-disjointness tests) ≈ 20–60 µs, plus §2.6 rule 4 (iii)'s union check over ≤ 20 wings ≈ 20–40 µs; a second or third attempt only on a `TierFailure` |
| the massing of an `ovalCourt` (`massOval`) | ≤ 150 µs p99 | two line-offset passes over ≤ 20 edges (as `plotRing`), ≤ 40 quads, the pairing check ≈ 40–90 µs; at most one or two arenas per city |
| `rebaseStack` on a terrain stroke, a warp step or a crypt lift | ≤ 20 µs per stepped building | O(wings) samples and one pass in stack order; counted inside §12.6's per-stroke law with the base's per-entity re-basing |
| how many | stepped buildings are landmarks: ≤ 0.1 % of buildings at every rung (V11's caps, X17), so V02 §6.1's town-wide median and mean do not move | — |
| a deck building's massing | a single range's (V02 §6.1: 3–6 µs) | — |
| the roofscape of a stepped building | ≤ 60 µs | facets on ≤ 20 wings with the stacked occlusion |
| a `tiers` edit or a tier's height edit | ≤ 2 ms (V02 §6.4's `setMassing` line) | one anchored `layTiers`, the re-base and the re-lay |
| the carry check of a stepped building inside a warp (item 333) | ≤ 40 µs per building per halving, counted like V02 §8.4 R5's towered buildings | the union and the containment tests |

**Measurement** at M6a on B-MASS's stepped and deck sub-fixtures (T-V2-22's harness), and at M3a for the base outline
builder's lay. **Fallbacks, in order:** ST6's containment tests run on the rings' bounding boxes first and the exact test
only on an overlap (a pure speed-up, no output change); then tiers above seven truncated at ST3 (a declared shift, §13.3).

## 7 Tests and acceptance bars

Families as in §13 (C conformance, P parity with a measured reference number, O an outcome the references do not
reach); every bar names its fixture and its CI tier (§13.8). The test ids are T-V2-n; §13.2 carries one pointer row
to this section (item 522).

### 7.1 Fixtures

* **B-MASS** (new, in `plat/bench/`): 60 synthetic plots — rectangles from 8 × 12 m to 60 × 80 m at aspects 0.3–3,
  irregular quadrilaterals, wedges and corner plots, L-shaped plots, curved and bent frontages, narrow row frontages of
  4–6 m, slopes of 0–15 %, a plot carrying a passage — each with its slot hint from S11, crossed with every template
  family, class override and structure role of V02 §3.10 at the four anchors (≈ 6 000 buildings), under the default
  preset, `fantasyShapes` on and off, and the `FM` preset, **against the compiled V11 templates** (V11 C1–C3b). Named
  sub-fixtures: **gable-fronted rows with back ranges** (row quads of 4–6 m frontage, `ridgeAxis 1`); an **arid town**
  (`ClimateRow.roof.form` `flat`); **cathedrals** on `dry`, `low`, `damp` and `flood` plots; a **longhouse (`v.longhouse`) on a 6 %
  slope**; a **watermill** on a plot abutting a river; a **flat northern site** (latitude 50°) of 200 identical L, T, U and
  `towerHouse` slots; a **landmark custom** `mercantile-guildhall` and the same class unmarked; a **butcher split** into a
  slaughterhouse and a stall; **`brewer → brewery`** and **`town granary → city granaries`**; a **market hall**, a **kiln
  yard**, a **church with a transept** and a **rich hall** of family `cross`.
* **B-PLAN** (the base's 24 fixture buildings, §13.2) with, from stage 3's landing, each fixture's composition (and its
  stored form) — the plan rung's intake runs on them (V03).
* **B-CITY-lite** and **B-CITY** (§13.2) at every rung; **B-EDIT** sequences (§13.2) with the two new event kinds added
  to the generator's alphabet.
* **The free-frame harness** (`plat/bench/fm-parity/`): a square slot hint of side `6w` (w = 8 m) with one access side,
  no neighbours, the building's class `manor` at the `rich` row under the `FM` preset — the Fantasy Manor comparison
  setting (the reference has no plot, §3.3 of `research/findings/manor.md`, CONFIRMED).

### 7.2 Conformance (C) — hard bars, 100 % unless stated

* **T-V2-1 containment** — every wing inside its slot hint and its plot, never over a way corridor or another slot, the
  gable-fronted rows' back ranges included (each behind its quad's rear chain, never across a party wall) (B-MASS,
  B-CITY every rung; PR tier on B-MASS, nightly on B-CITY).
* **T-V2-2 the stage-3 contract** — the union of the composed wings and the composed towers' rings equals the footprint
  face (integer equality); each composed wing reaches exactly its base wing's storeys; the non-tower ground wings tile (the
  pairing holds; a wing with `on` by T-V2-44 — item 110 fold) (B-MASS, B-PLAN).
* **T-V2-3 towers** — each tower's overlap share in `[0.2, 0.6]` (a turret's in `[0.25, 0.75]`); no centre deeper than
  `0.35 r` in a wing; no tower–tower or tower–block overlap. A tower standing on its block (M8 (d)) or over a template's
  crossing (M8 (e)) is exempt from the share and depth tests and lies inside its container's ring inset by
  `towerOnBlockInsetM`. Every tower's eave at or above every roof inside its ring.
* **T-V2-4 the main door** — exactly one main entrance per building, on a side facing its access edge (the base's
  §5.3 row), on every composed family. (Fantasy Manor: 37 of 41 measured buildings have an entrance,
  `captures/manor/README-frequencies.md` §4 — ours is "beyond", O.)
* **T-V2-5 the seed contract** — every tower vertex and wing side at least `attractCm` apart except at shared joints; the
  plan rung's transient arena accepts every stage-3 composition of B-PLAN and of every clicked B-CITY-lite building with
  0 `E_DEGENERATE` naming a composer's ring.
* **T-V2-6 keys and roles** — keys unique within a building and never re-used across a 10³-event B-EDIT sequence;
  `nextWingKey` never decreases; every wing has a role; the wings always in the canonical order (V02 §2.1); a document
  without stage-3 fields loads by the fallback migration row (V02 §2.5) with keys = indices and the base builder's roles.
* **T-V2-7 heights** — floors ≥ 1 (a `solid` wing 0, T-V2-44); the mitre-joined ranges of one path share floors; a spanning wing ≥ 2 floors; eave and
  ridge equal M11's formulas to the centimetre from V11's `HeightsRow` (`storeyCm.ground`, `storeyCm.upper`) and the one
  pitch rule (`roofPitch × ClimateRow.roof.pitch ÷ pitchRef`, clamped); a `shed` roof has `high`; `Heights.towerCm` the
  highest tower ridge above `baseCm` and absent without a tower. **Arid fixture:** every range, block and back range
  `flat` with its family's parapet, no dormer. **Cathedral fixture:** two west towers of `towerStoreys` 5–8 storeys at
  `towerStoreyCm` 600, each with a spire of rise `spireFactor × (eaveCm − baseCm)`; a church's single west tower 3–5 × 450.
* **T-V2-8 courts** — every footprint hole is a yard part of kind `court`; each court is entered through a door or the
  gate hall's arch at the plan rung (B-PLAN's closed-family fixtures).
* **T-V2-9 the roofscape tiles** — facets pairwise disjoint in their interiors; their union equals footprint ∪ porch rings,
  less the wings roofed `none`, to 0.5 % of the area; every facet planar to 1 cm; `dome` (a template part's), `plain` (the
  F-SKELETON downgrade) and `none` (a ruined building) each exercised; the cupola's facets excluded from the union (B-MASS,
  all constructions).
* **T-V2-10 joints** — every end classed by V02 §5.2's order; every valley's lines meet at the ridge extension within 1 cm; no
  facet crosses a tower ring.
* **T-V2-11 dormers** — inside their host facets, clear of valleys, hips and towers; count ≤ the eave's bays; positions
  symmetric by V02 §3.7; an edited row unchanged by a re-derivation while its eave's length stays within ± 10 %.
* **T-V2-12 the porch** — inside the plot, clear of ways, other footprints **and the building's own other wings**, at the
  main entrance's side and offset, its width within the free part of that side less 0.6 m; a flush front's porch only
  `recessed` or none; also run on the terraced-palace fixture (a storeyed tier 0 with `flights`, stair 0 at its face's left
  end; second revision, V2C-69).
* **T-V2-13 determinism** — the same building state gives byte-identical massing and composition on Node 24, Chromium,
  Firefox and WebKit and with a pool of 0–3 workers; the derived-complete digest over click orders (§6.5 (9)) holds with
  stage 3 registered.
* **T-V2-14 rung isolation** — `regenerate` with `rung: 'wings'` changes dormer rows and the porch only (the building's
  leaf digest unchanged); `'rooms'` changes the composer's rooms only.
* **T-V2-15 mutation keeps what fits** — house → inn, inn → house, single → H, `rectCourt` → `L`, workshop → smithy, and a
  front's change (item 63): every kept wing byte-identical (its leaf digest), its dormer rows identical after the next
  click; the inverse restores the building's leaf digest exactly (item 18 (e); extends T18-1 – T18-4).
* **T-V2-16 the growth lattice** — every ordered pair of families of `MassingGrowthRow` on 50 B-MASS plots gives a valid
  massing or a reported fallback, never an exception; for every reachable pair of V02 §3.9's table the kept `main` wing is
  byte-identical after the lay (its leaf digest), and a pair outside the ± 15 % side rule is never drawn.
* **T-V2-17 the F-MASSING ladder** — fixtures that force each rung 0–3 (a 3.5 m wide hint reaches rung 3) take it, and the
  report counts it.
* **T-V2-18 F-COMPOSE** — the identity composition satisfies the contract on every fixture; on B-CITY the identity rate is
  ≤ 0.1 % of composed buildings (a higher rate is a composer bug, filed).
* **T-V2-19 edit locality** — every `setMassing` op on 200 B-MASS buildings, `moveTower { shape }` included: nothing
  outside the plot changes except the re-homed households' buildings and a spanned passage (the oracle, §7.3 item 7);
  each bent op names its bend; **no op is refused but by a lock** (item 101 R2; second revision, V2C-47 (7)): removing the
  last wing removes the building in one event; a row quad's reshape along the frontage moves the party-wall line (the
  neighbour's quad re-clipped, both in one event), its depth re-cuts the rear chain; removing a row quad that is not the
  last wing leaves a gap with the neighbours' ends reclassed as gables; a wing below 4 m² is grown; an op beyond the plot is
  clipped with `join` offered; an unreachable `family` bends to the nearest reachable one; a gate hall with no `gate` range
  becomes a gate passage; undo and redo exact, restoring the building's (and the neighbour's) leaf digest.
* **T-V2-20 stored compositions** — the first `setComposition` stores the composition; §2.6's carry test (warps and vertex
  moves) passes with stored compositions of every family, towers included, and with the `room` and secondary-`porch` ops
  applied; an edited room survives a `rooms` re-derivation while its host keeps its key; undo removes what the first
  event stored; an orphaned dormer row, room or porch appears in §7.3's orphan table with re-attach and discard.
* **T-V2-21 staleness** — a massing change marks `wings` stale and the change marker appears; the next click re-derives;
  unchanged wings keep their dormer rows; a stored composition is re-matched inside the event, never stale; **a relet, a
  use change, an access, a Works stage and a material change each leave the `wings` rung `current` and draw no marker**;
  an occupants' band change marks the `rooms` rung stale and not `wings`.
* **T-V2-25 materials** — a material `setAttr` leaves every massing and composition byte unchanged (item 19; extends
  T19-3).
* **T-V2-26 the parity presets** — under `MFCG` and `FTG` every footprint is byte-identical to a build with
  `massing.composed` off (extends T23-1).
* **T-V2-27 capacity** — fewer than 1 % of residential buildings have their households clamped below the template's
  `households.built` by the massing's area and storeys (§2.6's capacity), reported by class otherwise.
* **T-V2-28 shelters and the underground** — every cluster structure is one wing with its kind's roof; every underground
  building (its row key suffixed `@underground`) a single range with a `flat` roof.
* **T-V2-33 totality of the composition key** (PR tier, on the compiled roster — V11 C1–C3b's 35 template families, reconciliation round 2, SCC-50; the
  `burial-ground` exemption of V02 §3.10.7 included, SCC-12): every class of the compiled
  roster (the town and city classes, the `generic-<family>` classes, the custom archetypes' classes and V07's `v.` village
  classes, V07 §2.4, S23R1-06) at every band, and every structure name of every compiled template, resolves by V02 §3.2's chain to a row
  above `default.*` (except the no-building classes of V02 §3.10.7), and every resolved row satisfies the arrangement law;
  the load checks of V02 §3.10.7 pass; `arrangementSkip` is 0 on the shipped tables.
* **T-V2-34 wings by key** — on B-PLAN buildings with a stored plan, add and remove a range, a tower and a block in every
  order: every stored entrance, room, stair core and chimney keeps its wing (item 225), the wings stay in the canonical
  order, and undo restores the building's bytes.
* **T-V2-35 rooms follow the occupants** (at M6b, the composer's clauses) — a rich-band manor whose occupants' band is set
  to `poor` has no hall and no chapel ring, and returning to `rich` restores the as-built rooms exactly (the canonical
  chain); the gate hall and the tower rooms stay at every band; before V03's programme rows are loaded every hall lies
  in `[1.4w, length − 2 m]` and is reported `hallUnclamped`. **From M6-P's P1** (the programme rows loaded) every hall's area
  lies in its programme's `hall` row × the ladder's `sizeFactor`. The clause that the poor manor's plan houses at least
  three units in its main range is V03's (T-V3-25's manor clause).
* **T-V2-36 crypts** (with V04's access draw landed, V02 §8.1) — cathedral fixtures on `damp` and `flood` plots each
  carry a crypt in the `raised` form, their seed wings' ground storey lifted by `crypt.clearCm`, and on `low` a half-sunk
  one with its seed wings raised by `cellar.depthCm ÷ 2` (item 226's half raise); after `setMassing` removes the east range, the crypt persists under the remaining wings (re-seeded by §2.6's rule);
  a church mutated to a warehouse loses its crypt through the closure, reported; **a stepped great temple on a `flood`
  plot** (solid tier 0 of at least `crypt.clearCm + 100 cm`) holds its raised crypt inside tier 0 with no lift, stair 0's
  grade unchanged, and one with a low tier 0 takes the lift with every stacked wing following through `rebaseStack`
 ; no V02 path sources, moves or shrinks a catacomb (no V02 writer touches a catacomb record); a wing W6 adds over a sealed void draws once on its V04 key, and a `setMassing` op draws none; a stepped great temple with a storeyed ground annex on a `flood` plot takes the ground wings' whole inset in the `raised` form (V03 §3.7.4): the annex's ground storey clears it by `crypt.clearCm`, tier 0 inside or lifted as above, the annex's core reaching the basement; an author's crypt ring under a nave on a `low` plot raises the nave.
* **T-V2-37 the sunlit choice** — on the flat northern fixture (latitude 50°): the `L`'s arm, the `T`'s cross-wing, the
  `U`'s opening and the `towerHouse`'s corner take the option whose open vector faces south in 70 % ± 5 of 200 slots at
  `sunBias` 0.7, and 50 % ± 5 at 0.5 (the no-op pin: byte-identical draws to the unbiased coin); orientation by the
  frontage unchanged in every case; and the compiled `sunBias` resolves to 0.5 under each of `MFCG`, `FTG`, `VG` and
  `FM` — never the zeroing's 0.
* **T-V2-38 custom scale** — the landmark custom `mercantile-guildhall` composes at least one band richer (its row cells
  and M10's budget at a value ≥ one band width above) than the same class unmarked; a significance below the class's
  never shrinks a building; a `ruined-landmark` building is massed by its class's row and drawn roofless.
* **T-V2-39 split sites** — the butcher split composes the stall by `split.shop` and the slaughterhouse by `split.works`;
  a merge-back is one event whose undo restores both buildings byte for byte.
* **T-V2-40 ladders** — `brewer → brewery` keeps the brewer's quad byte-identical as the compound's frontage slot;
  `town granary → city granaries` yields one compound with at least three store buildings; the demotion restores the
  as-built bytes; COUNT members are buildings of the lesser class.
* **T-V2-41 orientation laws** — the longhouse on a 6 % slope lies within 10° of the fall line with `MassingRef.low` on
  its downhill end; the watermill's wheel wing lies on its water side, its outer side within 0.5 m of the plot's water
  edge; below `axisSlope`, or with no water in reach, the frontage frame.
* **T-V2-42 landmark and institution forms** — the cathedral has two west towers at its west corners and, where its
  template has a crossing, a crossing tower contained in it with probability per its row; the market hall's main range
  carries `arcade` (drawn dashed, exported open, outside the capacity's ground storey); the kiln yard's kiln is a round
  one-storey `towerHouse` with a cone; the rich hall's `cross` plan lays three wings with the main running through; a
  cupola sits at its range's ridge midpoint, never in `Heights`. **The arena** (second revision, V2C-59; B-MASS's arena
  sub-fixture and the second known-city fixture's arena): a closed `ovalCourt` of two rings sharing their vertices, the
  aspect of its hull's minimal bounding rectangle in [1.15, 1.4], its inner ring `solid` except the two gate passages at the
  major-axis ends, its court (the floor) one `court` yard part from M3a (item 303's hole sentence) and at least `courtMinM` across its least width and at least 10 % of the hull's area
  (the historical amphitheatres' 13–20 %; J-V2.84), the façade `arcade` where the row sets it; `massOval` from M3a and M5
  from M6a byte-identical (T-V2-46's rule).
* **T-V2-43 why** — on untouched B-MASS buildings the `WhyProvider`'s family, row, alternatives and rejected tower
  candidates equal the massing's recorded draws and tests (recomputed without advancing any stream: the stream positions
  before and after are equal).

### 7.3 Outcomes (O) and statistics

* **T-V2-29 the diversity ladder** (B-CITY, every rung): within each class, Spearman(manifested value, footprint area) ≥
  0.7; the share of multi-wing families non-decreasing from the `poor` to the `rich` row for `house`, `inn`, `hall` and
  `manor`; `hovel` 100 % `single`; rich-row manors ≥ 60 % in {`rectCourt`, `plotRing`, `U`, `H`}; towers only where a
  row allows them. Reported with the owner's panel (V02 §7.5).
* **T-V2-30 the size budget** — each slot's footprint area within `[0.9 × lo, 1.1 × hi]` of M10's slot band for ≥ 95 % of
  buildings; the rest reported by class and cause (plot too small, coverage cap, `overBudget` at the lattice's end). Runs
  **in the PR tier on B-MASS against the compiled V11 templates** (so a table conflict shows before M6a), and nightly on
  B-CITY.
* **T-V2-4's "beyond"** — 100 % of buildings with a street-facing main door against Fantasy Manor's measured 90 % (37 / 41).

### 7.4 Parity (P) — Fantasy Manor, NG, and the presets

**T-V2-31 — against Fantasy Manor** (the free-frame harness, `FM` preset, N = 2 000 buildings, nightly; N = 20 000 at
the milestone). Targets are the measured counts of `captures/manor/README-frequencies.md` §3–§4 (41 buildings from build
890 — CONFIRMED counts), committed as numbers only in `baselines.json` (§13.5) with `referenceBuild` 890:

| metric | Fantasy Manor measured | bar |
|---|---|---|
| family shares (`regularCourt`, `starCourt`, `chordArc`, `rectCourt`, `gridWalk`) | 8 / 7 / 8 / 9 / 9 of 41 — consistent with equal odds (χ² 0.34, df 4) | χ² against equal shares, p ≥ 0.05 |
| **path segments** per building (`MassingRef.segments`: one wing per segment in the reference; our M7 pieces never counted) | 1 ×1, 2 ×1, 3 ×6, 4 ×12, 5 ×11, 6 ×7, 8 ×3 | two-sample KS D ≤ 0.25 (the reference sample is small); `gridWalk` segments reach 1 and 8 |
| blocks per building | 0 ×16, 1 ×20, 2 ×3, 3 ×2 (mean 0.78) | mean within ± 25 % |
| towers per building | 0 ×15, 1 ×22, 2 ×3, 3 ×1 (mean 0.76; ≥ 1 in 63 %) | mean within ± 25 %; the ≥ 1 share within ± 15 points |
| **square towers** (on blocks) among typed towers | 9 / 29 | the share within ± 15 points (candidate (d)'s `towerOnBlock` calibrated) |
| dormer elements per **segment** | 1.61 | within ± 25 % |
| porch elements per building | 0 ×17, 1 ×14, 2 ×9, 3 ×1 | the share with a porch (24 / 41 = 59 %) within ± 15 points; buildings with two or more porches (10 / 41) **reported**, not gating (our secondary porch is a hood at a side, rear or yard door; J-V2.44) |
| **half-round porches** among typed porches | 19 / 31 | the share within ± 15 points |
| buildings with an entrance | 37 / 41 | ours 100 % — "beyond" (T-V2-4) |

The `FM` preset's calibrated cells (V02 §3.10.8) are set at M6c by V12's `reference` run against Fantasy Manor
(`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics, the free-frame harness its fixture, released as one
declared shift (V12 §3.7.6), and then held by these bars. Wing width is ours (metric; item 59), so a comparison of plan extents is in
wing widths: our mean plan extent in wing widths within ± 20 % of the reference's measured mean, **which spike SP-V2-4
measures** (V02 §8.2: at least 40 generations with a draw pass) and commits as a numbers-only row of `baselines.json`; if
the spike cannot run, the extent bar is **reported, not gating** (pre-decided).

**T-V2-32 — against NG** (stage 2's `hatched` comparison, B-CITY-lite): the share of row and single-range wings whose ridge runs on
the short axis within 36 % ± 8 points (the base's NG measure, §2.6), by M12's frontage law.

**MFCG and FTG:** T-V2-26 — the presets draw the base's footprints, so §13.5's MFCG and FTG rows are untouched.

### 7.5 The owner's stage-3 panel (item 499)

Stage 3's gate follows §13.6's written, blind protocol: (1) **twenty pairs against Fantasy Manor** — ten of our
manor-class buildings under the `FM` preset in the free frame, ten of the reference's captured buildings, rendered at
the building band in each one's own look, shown in random pairs; (2) **the ladder street** — for three B-CITY seeds, one
street at each of the six band rows at the neighbourhood band, the owner answering "does this read from a giant manor to
a small hovel?" per seed; (3) **the item-110 buildings** — the second known-city fixture's
stepped temple, a terraced palace, a tiered tower, the arena and the bridge's deck row, at the building and neighbourhood
bands, the owner answering "does this read as a stepped temple, a terraced palace, a pagoda, an amphitheatre and a bridge
street?"; the stepped temple's summit offset (J-V2.61; 2.4–4.4 m at the median by V02 §3.10.3's receipt) is shown and named
with it. M6 claims "stage 3 at parity" only by a rated pass or the owner's acceptance recorded in the
`D5Record`; unrated, M6 closes *provisional — not rated* and the panel is offered with every release until rated (the
base's rule, §13.6 (7)).

### 7.6 Cost, memory and exports

* **T-V2-22 cost** — V02 §6.1's bars (town-wide median ≤ 10 µs, composed classes ≤ 60 µs median and ≤ 250 µs p99, mean ≤
  12 µs) on B-CITY at every rung, and V02 §6.2's (compose ≤ 0.2 ms median, a neighbourhood ≤ 120 ms of pool time, the
  roofscape ≤ 25 µs median and ≤ 8 ms per district-band tile) — nightly; milestone at METROPOLIS.
* **T-V2-23 memory** — V02 §6.3's lines (a `wings` chunk ≤ 1 KB at p99; the model's added bytes within the re-declared line).
* **T-V2-24 exports** — the JSON `massing` and `composition` blocks validate against the schema and round-trip; glTF and
  CityJSON validators green; their roofs equal the roofscape's facets (vertex for vertex after the exporter's rounding);
  an export with `derive` equals, byte for byte, one made with `asDrawn` after every building was clicked.

**CI tiers (§13.8).** PR: T-V2-1 – T-V2-21, T-V2-25 – T-V2-28, T-V2-30 (B-MASS against the compiled V11 templates),
T-V2-33 – T-V2-35 and T-V2-37 – T-V2-43 on B-MASS and B-PLAN (≈ 60 s). Nightly: B-CITY bars (T-V2-22, T-V2-29, T-V2-30,
T-V2-32), T-V2-36 once V04's access draw has landed, the harness at N = 2 000 (T-V2-31), B-EDIT at 10⁴ with the new
kinds. Milestone: METROPOLIS runs, exports, the harness at N = 20 000, the owner's panel.

### 7.7 Stacks and deck buildings

**Fixtures** (B-MASS sub-fixtures added): a **stepped temple** (the `stepped-temple` row at each anchor on its receipt's
precinct hints — sized for the row's 90th-percentile stack at `claimHi`, V02 §3.10.3 — and on an 18 × 22 m hint, on flat
ground and on a 6 % slope); a **terraced palace** (`terraced-palace` on its receipt hints and a 60 × 45 m hint); a **tiered
tower** (`tiered-tower`, with octagonal and round draws, on its `tower` budget); a **stepped monument** laid by `layTiers`
alone (V04's call, a fixed draw list, `TierCells.heights`); a **bridge** with frontage deck plots on both sides, a
**ford** and a **drawbridge** (no deck plot); a **timber pier**; a **stone mole** with a mid-mole tower and a fort at its
head (landmarks); a **bank quay** (ground); and — added by the second revision — a **sealed stack** (stair form `none`) in
two forms, the stepped temple sealed with its storeyed shrine (`tiers { stairs: 'none' }`) and sealed with every wing solid
(`tiers { stairs: 'none', top: 'flat', solid: 'all' }`), a **stepped temple with a storeyed ground annex** (a range added beside tier 0), a **stepped great temple** on a `flood`
plot, a **bridge chapel whose dossier binds a crypt**, an **arena** (the `arena` row on a precinct hint of 60 × 50 m and on
a hint too small for it), a **terrace-wall sub-fixture** (a 3 m `RetainingWall` on a plot's rear line with a row house
built against it, and a house at the wall's top edge), and B-EDIT's **warp fixtures** (1–8 m) run over each stepped
fixture; and the **second known-city fixture** at M3a (item 110 (e)).

* **T-V2-44 tiers nest and cast one shadow each** (item 110 (f)) — every wing with `on` lies inside the ring of the wing it
  stands on, inset by at least the drawn step less 1 cm on every side (the front by the stair's run and landing under
  `axial`); **the wings standing on one wing are pairwise interior-disjoint** and each stair shares its contact vertices
  with the tier it climbs; its `baseCm` equals `deckLevel` of that wing to the centimetre, and **`deckLevel(x) =
  x.baseCm + x`'s drawn height for every tier** (the parapet added and subtracted in one place); a stepped
  building's casters are its wings, one prism per tier from its own `baseCm`; the roofscape tiles the footprint with the
  stacked occlusion (T-V2-9's bar on the stepped fixtures, **the tiered-tower fixture included**); **every pent facet
  meets the wall of the tier above at `ridgeCm` within 1 cm**; round and octagonal stacks concentric within 1 cm
  apart from a D-front edge; solid tiers have `floors` 0 and no storey (`storeyRange` null); the capacity of the terraced
  palace equals §2.6's formula over its storeyed tiers only; **no chimney, decorative or planned, is drawn inside the ring
  of a wing standing on its host**. **On every re-basing path** — a terrain stroke under tier 0's edge
  only, a warp of 1–8 m over the building, and a crypt lift — after each: every stacked wing's `baseCm` equals `deckLevel`
  of its support to the centimetre, every stair's rise equals its terrace-to-terrace difference, and `Building.heights`
  equals the envelope (`floors = 1 + max storeyRange[1]`); after each warp step no two wings standing on one wing overlap
  and T-V2-9's tiling holds. **Under Works** (item 318): on a stepped temple and a terraced palace, at every stage
  no wing is drawn or cast above a support that has not reached its eave, and no height is undefined (a solid wing by
  courses). **Basement access** (item 371): on the stepped temple with a storeyed ground
  annex, given a requested basement, `Basement.access` ≠ `external` (the annex's core or the trapdoor fallback joins it,
  V03's J-V3.88); on the all-solid stepped temple with a requested basement it is `external`, its door at
  `basementDoor(b)` (V03 §3.7.1); **and T29-4 holds on both temples** — each basement inside its ground wings and joined by one of §2.6's
  three ways, the all-solid temple's by the outside stair of its `external` access (item 371 as reconciliation round 4
  extends it; S23R3-03).
* **T-V2-45 the stairs and the entrance** — every stair's rise ÷ run ≤ its drawn grade × 1.01 (a `stairSteep` report where
  the datum made it steeper, never a moved ring); `stairChain` connects the ground to the top tier's terrace for every
  `axial` and `flights` stack, and each flight's foot lies at the point of its face nearest the last head that lets it fit
 ; each flight lies inside the terrace it stands on; a round or octagonal axial stack's stairs keep their full
  width against a straight D-front edge; the fallback `axial → flights → internal` is taken where a fixture's hint forces
  it, and `internal` never over a solid tier 0; **a solid stack's main entrance lies at stair 0's foot and faces the
  frontage, and the plan rung's root is the landing door `landingSide` names; a sealed stack's entrance opens nothing, and
  its plan has no level at or above the ground where every wing is solid — a storeyed tier or shrine on it planned and
  flagged `W_TIER_UNREACHED` (V03's T-V3-28)** (item 230; V2C-53; seam S23R2-11; seam S23R3-14, on both sealed
  fixtures of V02 §7.7); a storeyed tier 0's door lies on the free part of its front side.
* **T-V2-46 stepped buildings from M3a to M6** — the stepped fixtures laid by the base outline builder (M3a) and by the
  stage-3 massing (M6a) are byte-identical in their wings and `MassingRef`, **both being `massStepped`'s output** (and the
  arena both `massOval`'s; V2C-48, V2C-59); a stepped building made at M3a carries `MassingRef.stack`, and a document whose
  stepped building lacks it loads by the stack migration row with the shift reported; `DriftBounds.families` naming
  `stepped` is read at M3a; `tiersTruncated` and `shrineDropped` reported where a fixture forces them, and **`tiersTruncated`
  on at most 10 % of the stepped buildings laid on the receipt's precinct hints at each anchor** (N = 200 per anchor;
  receipt estimate 1.0–7.6 %, V02 §3.10.3; V2C-49 (6)); on a hint that passes ST0 exactly at the least draws, the lay at the
  least draws lays `count[0]` tiers with none truncated (ST0 agrees with ST2–ST3); ST8's shrink and its single fallback
  reached on a hint too small, reported.
* **T-V2-47 deck buildings** — every deck-plot building inside its plot and so inside the deck's width; its footprint
  within the deck budget's band for ≥ 95 % (the rest reported by cause), the band per slot (V2C-66 (4)); its floors ≤
  `maxFloors` (100 %, after a mutation too); no basement; no dig draw; every wing's `baseCm` the deck's surface; the
  mole-head fort and the mid-mole tower read their classes' rows with their templates' budgets; **the ford and the
  drawbridge carry no deck plot; the bank quay's buildings take the terrain datum and the ordinary basement gate; the
  lighthouse islet's tower is a land building; on the bridge-chapel fixture whose dossier binds a crypt, the chapel stands
  on land with its crypt and the deck holds no crypt-bound use**; removing the deck gives its buildings the
  base's fates, and rebuilding it raises new lineages on the re-offered plots.
* **T-V2-48 editing stacks** — `tiers` ops (count up and down, step, top, stair form, and the fields `shape`, `lowerRoof`,
  `solid`, `shrineInsetShare`, `centre`, `radiusCm`) on the stepped fixtures: kept tiers keep their keys and bytes where their
  step is unchanged; a stair keeps its key across a form change; new keys only from `nextWingKey`; new tiers at the row's
  central values (round-half-up); **each of V02 §4.6's bends taken and named, never refused**: `tiers` on a single
  → stepped first; `internal` over a solid base → `none` (all solid) or `axial`; removing a stair → `internal` or `none`; a
  range, a tower and a back range beside a stack laid as ground wings outside tier 0, the stairs and the approach strip; a
  block → a range; `family: 'stepped'` on a deck → `single`; removing tier 0 → the stack removed (the building removed
  with no ground wing left); a count above what fits; pent under `axial` → flat; a roof `setAttr` on each tier kind; a
  stacked wing's `baseCm` → its support's height; a tier's height edit re-bases the wings above and re-lays the stairs;
  floors above `maxFloors` on a deck bent; undo and redo exact, restoring the building's leaf digest after each.
* **T-V2-49 mutation** — `single → stepped` keeps the main range byte-identical as tier 0 (its four corners the anchor);
  a range too narrow for a second tier never draws `stepped` (W1's anchored test); `stepped → single` keeps tier 0 as the
  range (`solid` cleared, its floors the target's); `stepped → stepped` from four tiers to six and back; each inverse
  restores the building's leaf digest exactly.
* **T-V2-50 the no-op pin** (item 110 (f)) — under V12 §2.13's `item110.stepped` and `item110.deck` overlays (V11 §3.24.0's
  off forms: every `roster.specialisations` chance 0, every `deck.offer` 0 and every `deck.landmarks` claimant chance 0, so
  B-MASS's mole fort and mid-mole tower are not placed; reconciliation round 2, SCC-43), on the suites B-MASS and B-CITY
  minus B-MASS's arena sub-fixture, whose `ovalCourt` is its own declared shift (T-V2-46), every massing at every rung is
  byte-identical to the composer before the fold: creation indices 8 and 9 never drawn, no `@deck` row read, no wing with `on` or `solid`, `MassingRef.stack` absent;
  the load check finds `stepped` in no row of V02 §3.10.2 – §3.10.6. **Its one reported difference**: a forecourt
  `U`'s main door whose drawn position lay under an arm is moved to the nearest free point of the back range's side
  (item 228's keep-or-move rule); every other door is byte-identical.
* **T-V2-51 the wall-side datum** (second revision, V2C-57; item 231; (c) reconciliation round 3, S23R2-01) — on the
  terrace-wall sub-fixture and on the second known-city fixture's terraced wards: (a) every building's `baseCm` lies within
  `plinthCm + 10 cm` of its own terrace's level (`levelledGroundCm` at its centroid's side of every wall within
  `terrace.wallBandCm`); (b) the row house built against the wall has rear setback 0 and does not float toward the terrace
  above, and the house at the wall's top edge does not sink toward the terrace below; (c) on a levelled plot every ground
  wing's `baseCm − plinthCm` equals the maximum of `levelledGroundCm` over its samples (its vertices and centroid, after
  item 231's move) within 1 cm — for a wing with no kept user `baseCm`, no half-cellar raise and no crypt lift (T-V2-52 and
  T-V2-36 hold those).
* **T-V2-52 the half cellar's raise** (item 226; J-V2.91) — on B-MASS's basement
  sub-fixtures (a `low` plot, a plot whose full cellar would meet the water table, a church whose basement is only its
  crypt): every building with a `half` basement has the ground wings over its ring (a crypt-only basement: the wings over the crypt's ring) at `cellar.depthCm ÷ 2` above the terrain datum, its basement floor at the datum less half the depth and above the
  water table by the gate's test, after S11, a terrain edit, a warp, a vertex move and `rebaseStack` alike; a full
  basement's wings stand at the datum; the dig floor reads the raised `baseCm` (V02 §3.14.5 (a)); a basement turned from
  `half` to `full` by a re-derivation lowers the wings to the datum in the same event.
* **T-V2-53 one tread law, one crypt seed, bays on every side, the raised strip** (reconciliation round 1; S23-07, S23-31,
  S23-30, S23-01) — (a) on B-MASS's stepped sub-fixtures every stair wing's drawn tread lines (`stairFlight`), glTF risers
  and CityJSON steps all count `stairTreads(w).n`, and the treads' goings sum to the flight's run; (b) `cryptSeedWings`
  returns the `chancel` part on a template cathedral, tier 0 on a stepped great temple, the east-most range on a ranged
  church (ties by key) and an empty list on a building with none; (c) `facadeBays` on every side of every B-MASS wing
  returns bays inside the side, none on a side whose run is not positive, and round a round tower's free perimeter at
  least one bay per free arc of `bayM ÷ 2` or more; (d) a raised way added by T4 over a street of low houses, and the same
  way founded at an epoch, leave no building meeting its piers or strip, and the way regenerated at its address places
  none there.

**CI tiers for these:** T-V2-44 – T-V2-53 in the PR tier on B-MASS's stepped, deck, arena, terrace-wall and basement
sub-fixtures
(≈ + 9 s), T-V2-44's warp and Works cases included; T-V2-46's M3a half, T-V2-47 and T-V2-51 on the second known-city
fixture in M3a's milestone tier; T-V2-50 nightly on B-CITY at every rung.

## 8 Build plan

### 8.1 Where stage 3 sits in §16's order

Stage 3 is built as **milestone M6**, after M5 (stage 2), in three parts (item 524). It depends on: M2b (roofs,
the `lit` family, compound site plans, the designation templates and the generation fill); M3a (the designation mutator
with its record and inverse, assignments, the dry run and bending, the handle-based API); M3b (the glTF, OBJ and CityJSON
exporters); M4 (Works and the evolution hooks the mutation steps feed); M5 (the neighbourhood click of II.4 that raises
the `wings` rung — **decoupled**: without M5 the rung is raised by a building click and by `elaborate: 'view'`, so M6
does not wait on M5's gate); **V11's compiled templates (V11 C1–C3b; C3b's `fort` and `arena` families at M3a — reconciliation round 2)** — the template families, the class
roster with `templateFamily`, the `HeightsRow` with item 427's columns and the role table — **before M6a** (the chain and
T-V2-33 read them); **V04's access draw** (its T2b stage) before T-V2-36's dig and crypt parts; the crypt
derivation (M6-U: file f items 238, 226 and 436) before T-V2-36's crypt part. V03's plan rung starts after **M6b** (it reads the `rooms`
rung and the dormer rows) — unless the owner answers V03's Q1 yes, in which case its P0–P3 run on base wings after
M4 and take the composer's rooms and dormer rows when M6b lands (V03 §8), this volume's `facadeBays`, `endMarginM`
and `bayM` then built first as its own item — `facadeBays` is built in `@plat/plots` (item 505), at M6b or, under
V03's Q1, first; V06 reads the recorded wing steps from **M6a**.

### 8.2 Spikes first

| spike | when | what it measures | pass | if it fails (pre-decided) |
|---|---|---|---|---|
| **SP-V2-1 massing cost and fit** (≈ 1 pw) | before M6a | M3–M13 for `single`, `L`, `T`, `H`, `U`, `rectCourt` and towers on the real plots of M5's B-CITY METROPOLIS seeds: µs per class, the share of rich-row manor plots on which a court family is feasible, F-MASSING's rung distribution | town median ≤ 10 µs, composed classes ≤ 60 µs median; ≥ 40 % of rich manor plots admit a court family; rung 3 ≤ 1 % | V02 §6.1's fallbacks (a)–(c), chosen before M6a; a feasibility shortfall raises the manor rows' join demand (S10 (7)'s `joinMaxDelta` for the rich band, §1.1's granularity) by one step, re-measured |
| **SP-V2-2 roofscape robustness** (≈ 0.5 pw) | inside M6a | 10⁵ fuzzed massings (every family, stepped rows, warped quads, hand-added ranges at odd angles) through `resolveEnds` and `roofscape` | T-V2-9 and T-V2-10 at 100 % | a joint class that fails draws its valley without the occlusion clip (V02 §6.2's fallback), and a wing whose facets fail takes the base's per-wing construction, both reported per building |
| **SP-V2-3 the Fantasy Manor calibration** (≈ 0.5 pw) | inside M6c | V12's `reference` run against Fantasy Manor (`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics against V02 §7.4's measured targets, the free-frame harness at N = 20 000 its fixture | every V02 §7.4 bar; the run `accepted` (V12 §3.7.5) | V12 §3.7's outcome: the register entry's pre-decided fallback (`fallback-applied`; `hipInset` 0.5, V02 §3.10.8), else the entry `not-achieved`, reported to the owner (V12 §3.7.5, §3.11) |
| **SP-V2-4 the reference's plan extent** (research seat, ≈ 0.25 pw) | before M6c | one capture of at least 40 Fantasy Manor generations with a draw pass, tabulating each plan's extent in wing widths (and confirming the block ridge inset, V02 §3.10.8) | a numbers-only `baselines.json` row | the extent bar of V02 §7.4 is reported, not gating; `hipInset` for blocks keeps its fallback 0.5 under `FM` |

### 8.3 Milestones

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M6a — the massing** | `@plat/buildings` with `composition.json` (schema, loaders, default rows of V02 §3.10, provenance cells, the preset resolution); M0–M14; the S11 integration (the registration, the manifested-band row read, the entrance hint, court typing (its hole sentence already built at M3a-V2, V02 §8.5, now also typing the composed families' courts), the structures' composition keys, the cluster structures as fixed wings — item 303); `BaseWing.role` and `key` (if the base has not carried them from M1: + 0.5 pw with a migration row); `MassingRef`; F-MASSING; the `massing` concern; the mutator's wing step W1–W10 with `MassingGrowthRow`; `resolveEnds` and `roofscape` for the massing, the `roofscape` construction in `ink`, `lit` and `hatched` at the district band; the golden shift; **the revision's additions (V02 §3):** the resolution chain with the family, class-override, role and default rows at four anchors, `roleKeys`, `classFamily` and the load checks; V11's `HeightsRow` with the one pitch rule, the climate's flat roofs, tower storeys and spires; M3's budget test and M10's slot band and reverse-lattice shrink; M5's closed-family `main`, `cross`, the sunlit choice and the `fallLine` and `water` axes; M8's tower on a block and the template towers; M8b's attached structures (item 304); the canonical order and the wing keys of item 225; `segments`, `low`, `cupola`; the significance shift, split and ladder composition; the crypt seed wings (`cryptSeedWings`, exported by `@plat/plots`: built here, or with the crypt derivation at M6-U where that lands first — S23-20) and the raised crypt's lift (item 226) | T-V2-1 – T-V2-7, T-V2-9, T-V2-10, T-V2-13, T-V2-15 – T-V2-17, T-V2-22 (massing), T-V2-25 – T-V2-30, T-V2-33, T-V2-34, T-V2-37 – T-V2-42 on B-MASS and B-CITY; the first map re-measured at every rung within V02 §6.1's lines; **every seed's footprints move — one declared shift (§13.3) with its diff report**, output version bumped; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 6.5–9 pw |
| **M6b — the composer, the rooms rung, rendering and exports** | `compose()` at `wings` and `rooms`; `facadeBays` on every side, built in `@plat/plots` (item 505), at M6b or, under V03's Q1, first (V02 §8.1), dormer rows, the entrance gable, the porch; the composer's rooms; F-COMPOSE; the `compose.*` concerns; the elaboration integration (building click, `view`, and II.4's click where M5 has landed); the paint programs `roofscape`, `dormer`, `porch`, `towerRoof` in every shipped family and the surface layer's roofs; the exports of V02 §5.5 with the `compositions` option; the cache line; the stage-3 intake (§2.6's test with stored compositions of every family; B-PLAN's compositions); the revision's additions: `wingsInputs` and the rooms rung at the occupants' band with the programme's hall clamp and the court door; the half-round and secondary porches; the warehouse hoist rule and the plan precedence of dormer rows; integer valley reaches; `dome`, `plain`, `none`, spires and the cupola in the roofscape; the roof decorations and the `FM` look's dressing; the `WhyProvider`; the view trigger at the neighbourhood band with its sliced batches | T-V2-8, T-V2-11, T-V2-12, T-V2-14, T-V2-18, T-V2-20 (carry part), T-V2-21, T-V2-23, T-V2-24, T-V2-22 (compose, roofscape), T-V2-35 (its composer clauses), T-V2-43; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 5–7.5 pw |
| **M6c — editing, parity and the gate** | `setMassing` and `setComposition` with their dry runs, bending, lifecycle rows and migration rows; the `setAttr` paths by key; T9's handles and family strip (with V09) and the clerk's operations (with V10); the `FM` preset and the free-frame harness, the fixture of V12's `reference` run against Fantasy Manor (`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics; the owner's stage-3 panel; the revision's additions: the `room` op, `moveTower { shape }`, the secondary-porch op, the bends of V02 §4.2 (refusals until the second revision turned them into bends), the orphan actions, the `fantasyShapes` control row (item 402); the new parity bars (segments, square towers, half-round porches) with SP-V2-4's extent row; T-V2-36 once V04's access draw has landed | T-V2-19, T-V2-20, T-V2-31 (the V02 §7.4 parity bars), T-V2-32 (the NG ridge share); B-EDIT at 10⁴ with the new kinds; the panel offered (V02 §7.5); T-V2-36; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 3.5–6 pw |

**Effort: 15–22.5 pw for M6a–M6c plus 2.25 pw of spikes — 17.25–24.75 expert person-weeks** (PLAUSIBLE; the
revision of 2026-09-28 added 3.25–4.75 pw for the family and role rows, the budget test, the attached structures, the
sunlit choice, the crypt lift, the rooms at the occupants' band, the why provider and SP-V2-4; builder-tier seats for the
build, verify and measure work, the architecture rulings on Fable seats, per the owner's staffing). item 524 adds the
line to §16's effort table, one of its staged lines; §16's totals are computed once by the coherence pass (file f item 568;
S23-19), never stated here.
**The item 110 fold** adds 3.25–4.75 pw and **the second revision** 1.75–2.5 pw more (V02 §8.5): **22.25–32 pw for the volume**, item 525 carrying the line to §16.
**Reconciliation round 1** adds 0.25–0.5 pw inside M6a–M6c and M3a-V2 (the `fort` and `burial-ground` family rows, the
`arena` row's move, the `charnelHouse` and `lychgate` rows, the oval's minor-axis gates, `cryptSeedWings`, `stairTreads`,
`facadeBays` on every side, the stepped-specialisation write, the hall's fallback, T-V2-52 – T-V2-53): **22.5–32.5 pw for
the volume**, M6 18.25–27.5 pw (PLAUSIBLE), item 525 restated.

### 8.4 Risks

| risk | likelihood / impact | mitigation, and the pre-decided answer |
|---|---|---|
| **R1** the massing's cost at METROPOLIS | medium / medium — on the first map's path | SP-V2-1 first; V02 §6.1's fallbacks (a)–(c) |
| **R2** real plots too irregular for the rectilinear families, so rich quarters read as single ranges | medium / high — the owner's "giant manor" | `lir` fitting, `plotRing`, the class mix's JOIN for large classes (item 71 (c)); SP-V2-1's feasibility share; fallback: the rich join step |
| **R3** roofscape joint cases after hand edits and warps (oblique butt joints, carried quads) | medium / low — drawing only | SP-V2-2's fuzz; per-joint and per-wing downgrades |
| **R4** the golden shift at landing touches every document | certain / low | a declared shift with its diff (§13.3); saved documents keep their output version until the user upgrades (§7.5) |
| **R5** towered buildings make a warp's validation costlier (the union check, §2.6 rule 4 (iii)) | low / medium | measured at M6c on a 150 m brush over a rich quarter; fallback: towered buildings are validated last in the step and a failure halves the step at most once more before the step is refused (reported) |
| **R6** the owner's eye does not accept the look | medium / medium | every shape and rate is a table row; the panel (V02 §7.5) before any "at parity" claim |
| **R7** V11's compiled templates arrive without the manor override, the role table's shares or item 427's columns | medium / medium — rich courts would read small | M3's budget test removes the court families that cannot fit (rich manors then `U` and `H`, T-V2-29 still met); the main-slot share defaults to 0.6; `attic` defaults to true for a family V11 leaves out and `parapetCm` to 0; all reported by T-V2-33 and T-V2-30 in the PR tier |
| **R8** V04's access draw or the crypt derivation (M6-U) lands after M6c | medium / low | T-V2-36 runs from the landing that brings them (nightly), not before; V02's parts (the seed wings, the lift, the W6 trigger key) are exercised by T-V2-7's cathedral fixture and T-V2-34 meanwhile |

### 8.5 Stacks and deck buildings in the build

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M3a-V2** — with item 110's base milestone and its second known-city fixture (§16 M3a; item 229) | **since the second revision:** `massStepped`, `slotBand`, `drawTiers` and a pure `layTiers` (ST2–ST7 with its typed failure) in `@plat/plots`, exported, and `massOval` (the fixture's arena); `MassingRef` with `stack` for stepped buildings and the stack migration row; the stack helpers `deckLevel`, `storeyRange`, `stairChain` and `landingSide`, exported by `@plat/plots` (read by `massStepped`, `rebaseStack`, the capacity and V03's eager `ground(b)`, `floorCm`, `basementDoor(b)` and `stackAccessDoor(b, a)`, V03 §3.3, 3.7.1 and 3.7.2 (1); seams S23R2-14, S23R4-02); `stepped` in the M3a drift list; `rebaseStack` on every re-basing path (item 370 extended) and the wall-side sample (item 231); item 318's stack order in `heightsAt`; item 230's solid-stack entrance; the fold's items: the base outline builder's stepped construction and its deck buildings (a rectangle or row quad inside the deck budget, the storey cap, the deck datum); item 426's `composition?` on the designation template and its structures (written by V11's specialisation replacement, item 259) and item 224's hint clause of *Entrances* rule 1 with item 228's free part; `BaseWing.on` and `solid` (item 227); the datum step's stacking and deck datum (item 370); `storeyRange` in the capacity and `Storey.wings` (item 371); `BuildingInput.deck` and no cellar on a deck (item 305); the carry check (item 333); the per-wing constructions' stack order and treads by `stairTreads` (item 419); item 303's typing of every inner ring of a footprint face as a `court` `YardPart` (the arena's floor); `composition.json` shipped with the `tiers` cells, the four stepped rows, the `@deck` rows, the `PorchKindRow`s (data only: V01's entrance reserve reads their `widthM`, `depthM` and `outside` from M5, V01 §3.8.2 step 5; the porch itself is composed from M6b) and the constants they read (the rest at M6a); a tier's height through the base's `setAttr` | T-V2-44, T-V2-45, T-V2-46 (its M3a half), T-V2-47 and T-V2-51 on B-MASS's sub-fixtures and the second fixture; T-V2-42's arena part on the fixture; T-V2-50 on B-CITY; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 1.25–1.75 pw, **+ 0.75–1 pw** (second revision: the split and migration, the datum pass, the Works order, `massOval`) |
| **M6a**, added | the `stepped` family in the massing (M5 calling `massStepped`), the stepped mutation rows with the anchored test, the `@deck` suffix, band (per slot) and storey cap in M1, M10 and M11, the roofscape's stacked occlusion and order;  **second revision:** the pent band facets, chimney hosting on exposed roof, `ovalCourt` in M5 (`massOval`) with the `arena` row, the claim-sized band in `slotBand`, `vaultClamp` | T-V2-42 (arena), T-V2-46 (its M6 half), T-V2-49, T-V2-50 | + 1–1.5 pw, **+ 0.5–0.75 pw** |
| **M6b**, added | `stairFlight`; the exports of V02 §5.6 (`BuildingPart`, `BuildingInstallation`, stepped glTF stairs, JSON `on`, `solid`, `stack`, `deck`) | T-V2-24 on the stepped fixtures | + 0.5–0.75 pw |
| **M6c**, added | the `tiers` op, V02 §4.6's bends, the why facts, T9's tier controls with V09; **second revision:** every refusal of V02 §4.2, §4.3 and §4.6 as a named bend, the sealed form `none`, the `tiers` op's six new fields and the roof and base `setAttr` bends | T-V2-19, T-V2-48 | + 0.5–0.75 pw, **+ 0.5–0.75 pw** |

**Effort.** The fold adds 3.25–4.75 pw — 1.25–1.75 at M3a and 2–3 inside M6 — and the second revision 1.75–2.5 pw more —
0.75–1 at M3a and 1–1.5 inside M6 — so V02 totals **22.25–32 expert person-weeks** (PLAUSIBLE) — **22.5–32.5** with reconciliation round 1's 0.25–0.5 pw
(V02 §8.3) — M6 itself 18–27 pw (18.25–27.5 with it)
plus 2.25 pw of spikes and M3a's part 2–2.75 pw (item 525 restated). **Dependencies:** M3a-V2 needs the
base's deck plots (item 110 (d)'s base side, applied by the coherence pass), V11's `deck` row (X16; the fallback
constants otherwise) and its specialisations (X17; without them only the fixture's declared class and the `family` op
reach `stepped`); V03's plans of tiers (X18) follow M6b as its plan rung does, while V03's eager facts at M3a (`ground(b)`,
`floorCm`, `basementDoor(b)`, `stackAccessDoor(b, a)`; V03's PE) read the stack helpers M3a-V2 exports and land after them in the same milestone
(seams S23R2-14). **Risks:** **R9** stepped stacks
truncated on their precincts (medium / low) — critique V2C-49's receipt showed the fold's ST0 passing hints 24–36 m deep
that then truncated at every anchor of both axial rows, the tiered tower fitting 2–3 of its 4–6 tiers and the claim-sized
budgets undefined; mitigated by the second revision's ST0 with the front terraces, the derived tier-0 aspect, the steeper
temple stair, the claim-sized band and the tiered tower's refitted row (V2C-49 (1)–(6)), whose receipt estimates 1.0–7.6 %
truncation on precinct hints sized for the 90th-percentile stack (V02 §3.10.3) under T-V2-46's 10 % bar; the stair fallback,
then ST8's single fallback, reported by class; **R10** V11's
deck row late (medium / low) — the fallback constants; **R11** the M3a builder and the stage-3 massing diverging (low /
medium) — one exported `layTiers` and T-V2-46's byte-identity bar. No spike: the construction is closed-form and its checks
exact.

## 9 Decisions

Each row is final unless the owner or the Fable retrovalidation vetoes it; each is "chose X over Y because Z".

| id | decision |
|---|---|
| J-V2.1 | Chose to make stage 3's **massing the eager `outline()` at S11** (model data: the footprint, heights, shadows and capacity read it) over keeping the base outline and composing only lazily, because the owner's buildings must show their composed plan — courts, cross-wings, towers — at every zoom with one footprint hash across LOD (O17 (i)), and the massing costs ≈ 3 % of the first map (V02 §6.1). |
| J-V2.2 | Chose to let the **massing own every height and ring**, the composer never re-shaping a wing or changing a covered storey, over using the base contract's allowance for taller composed sections, because shadows, the 3-D export and the capacity must never depend on a click (§6.2: a click changes no digest). |
| J-V2.3 | Chose **tiled ranges and blocks** (butt joints at right angles, mitres otherwise; a block splits the range it straddles) over Fantasy Manor's overlapping blocks, because tiling keeps §2.6's cheap pairing tier and an exact capacity; **towers overlap** (tier (iii)) because a round ring cannot tile a rectangle without non-rectangular wings. *Amended by the revision:* item 59's ADOPTED block/tower distinction holds — **a block's roof is always a hip, never a pyramid** (its ridge ends inset by `WingRoleRow.hipInset` × span — under `FM` the measured-rate entry of V02 §3.10.8), and **the square pyramids are towers standing on blocks** (M8's candidate (d), contained in its block, weight 0 by default and calibrated under `FM`). |
| J-V2.4 | Chose to put **towers and turrets first in wing order** over path order, so §2.6's clip order takes each tower whole (a round room per storey) and each range less its towers, and no seed piece has a hole. |
| J-V2.5 | Chose to keep Fantasy Manor's **regular, star and arc families behind the `fantasyShapes` model toggle, off by default**, over its equal weights as the default, because the owner adopted "realism in the base, fantasy as toggles" (D-7); the `FM` preset turns them on at the reference's weights. |
| J-V2.6 | Chose **composed wings and towers that name their base wing by key and store no ring** over storing composed rings, because one geometry source removes a class of carry bugs (the write that survives one path and ghosts another) and makes a mutation's re-match trivial. |
| J-V2.7 | Chose **dormers and gables that never project past the eave** — a projecting bay is a block, which the footprint shows — over Fantasy Manor's projecting cross-gables, because a projection would leave the footprint (the stage-3 contract) and possibly the plot (item 59). |
| J-V2.8 | Chose **orientation by the frontage and fitting in the frontage-aligned largest inscribed rectangle of the slot hint** (`plotRing` following the hint itself) over a random rotation or a free fit in the plot's OBB, because item 59 keeps our plot rule and a building must never leave its plot. |
| J-V2.9 | Chose to derive the **`rooms` rung only with the plan** over deriving it under `view`, because nothing but the plan draws it and its cost would be wasted on a pan. |
| J-V2.10 | Chose **per-wing keyed composition draws** (creation index from the wing's key) over per-building draws, so every wing a mutation keeps recomposes byte for byte without storing the composition — item 18's "keep what fits" by construction. |
| J-V2.11 | Chose to **lay a mutation's target family around the kept ranges** (the growth lattice, anchored mode) over re-running the family and matching after, because item 18 (a) wants "the old house still recognisable inside the new workshop". |
| J-V2.12 | Chose to **draw a mutation's target family** on `siteplan.mutate` over the reachable, feasible families over taking the heaviest, for variety across a town; the stream keeps it deterministic and reversible. |
| J-V2.13 | Chose to **keep a row building's quads** through every designation change that keeps the `row` arrangement (only its back range and storeys change) over re-laying rows, because the quad is the plot's (shared party walls) and item 31's geometry floor protects built stock. *Scoped by the revision:* a change to a `compound` arrangement keeps the quad byte-identical as the compound's frontage slot and adds the target's main structure behind it (V02 §3.9 W3b). |
| J-V2.14 | Chose a **back range by band** for rows, houses and cottages over leaving rows unarticulated, because rear ranges on burgage plots are the historical norm, the yard behind stays (the coverage cap), and it carries item 19's "scale in structure" to the commonest building. |
| J-V2.15 | Chose **porch kinds filtered by the free space in front of the door** — a flush front takes a recessed porch or none — over Fantasy Manor's porch lottery, because no porch may stand over a street. |
| J-V2.16 | Chose **a closed ring with a gate hall** (the court a footprint hole, reached through the front range) over an open ring spanned above, which would need an in-plot passage face, because item 30's passages are block-level and courtyard houses and inns were entered through a gate hall. |
| J-V2.17 | Chose **two event kinds with op unions** (`setMassing`, `setComposition`) over one event kind per operation, keeping item 101's small vocabulary and one dry-run path per kind. |
| J-V2.18 | Chose **geometric edits that draw nothing** — an omitted value takes the row's central value — over drawn defaults, so the tool behaves predictably; the `setMassing` `family` op is a designation mutation and **draws on `siteplan.mutate`** exactly as one (V02 §3.12), replayable because that stream is a pure function of its key (revised). |
| J-V2.19 | Chose to **switch the composed massing off under the `MFCG` and `FTG` presets** (the base outline) over composing under them, so §13.5's parity rows stay on the references' behaviour (item 23). |
| J-V2.20 | Chose a **building-scope `FM` preset whose element rates are calibrated to Fantasy Manor's measured outputs**, not copied from its code, over a constant table taken from the code reading, because §17.1's clean room admits the code only for understanding, while emulation-first (item 23) still wants the reference's behaviour reproducible. |
| J-V2.21 | Chose **one planar, non-overlapping roof plan per building** (the roofscape) drawn and exported by one function over independent per-wing roofs painted in order, because valleys, walls and towers come out right, the light pass gets exact normals, and the exports agree with the picture. |
| J-V2.22 | Chose to keep the **shadow casters on the model's wing prisms** over casting from composition parts, so **no shadow of the model's masses depends on a click**; the surface-layer shading of a porch, the dormers and the cupola appears with their drawing — view only, no digest (reworded). |
| J-V2.23 | Chose to **repair the size budget by scaling and dropping parts**, never by asking for land, over a JOIN inside the massing, because land is S10's and the mutator's and the massing must stay a per-slot pure function. |
| J-V2.24 | Chose a **second admission bound for the composed classes** (≤ 60 µs median, ≤ 250 µs p99) beside the base's town-wide 10 µs median, over one 10 µs bound per class, because the composed classes are a few per cent of buildings and inherently heavier, while the town-wide median and the mean bound the first map. |
| J-V2.25 | Chose **one façade-bay rhythm** (`facadeBays`) for dormers, the plan's windows, lit windows before a plan and decorative chimneys over separate spacing rules, so the picture stays consistent when the plan arrives. |
| J-V2.26 | Chose to **raise a tower's eave above every roof it overlaps** over a per-pixel height sort, so plan occlusion is a subtraction and every tower reads as rising through the roofs, as towers do. |
| J-V2.27 | Chose a **separate `@plat/buildings` package** between `plots` and `labels` over folding the composer into `@plat/plots`, keeping S11 small and the interface (in `plots`) apart from its implementation. |
| J-V2.28 | Chose a new roof kind **`shed`** over drawing lean-tos and outshots as gables, for realism on the commonest additions and on lean-to shelters (item 70). |
| J-V2.29 | Chose **tower ring side counts by radius** (12 / 16 / 24) over one count, so a small turret keeps its sides above `minEdge` and a great tower looks round. |
| J-V2.30 | Chose **V11's four anchor bands (poor, modest, prosperous, rich) with V11's derivation for squalid and comfortable** for every row of `composition.json` over V02's former three anchors with midpoints, so **one band-anchoring rule serves every template-like table** and the massing bends where the size budget bends (revised, V2C-01 (c)). |
| J-V2.31 | Chose to **measure the porch's space on the building's own plot** over the neighbourhood around it, so the rung stays a function of its building and plot (§4.1's contract). |
| J-V2.32 | Chose **M6 after M5 in three parts, the massing first** (with the roofscape) over the composer first, because the massing is on the first map and is what every view shows; the plan rung (V03) waits on M6b. *Amended by reconciliation round 1:* — unless the owner answers V03's Q1 yes, in which case its P0–P3 run on base wings after M4 and take the composer's rooms and dormer rows when M6b lands (V03 §8), this volume's `facadeBays` moving forward with them. |
| J-V2.33 | Chose **V11's family-keyed `HeightsRow`**, with V02 supplying three columns (`attic`, `parapetCm`, `towerStoreyCm`, item 427), and **one pitch rule** (`roofPitch × ClimateRow.roof.pitch ÷ pitchRef`, clamped) over V02's own class-keyed heights row and a climate-only pitch, because one content owner and one key avoid a second source of truth, and the climate still steepens or flattens every family's roof. |
| J-V2.34 | Chose **one resolution chain** — the template's key, a class override, a village class map, the template family, a full default per arrangement; for other slots the slot's key, the role key, `outbuilding` — with **rows per V11 template family and per structure role**, class rows only as overrides, and an **arrangement law checked at load**, over rows per class, because the roster has ~180 classes plus generic, custom and village ones while their shapes follow V11 §3.6.1's template families (35), and a row that contradicts its arrangement must never be read. |
| J-V2.35 | Chose a **slot-level size band** (`[p10, p90] × footprintShare ÷ count × buildingScale × sizeFactor`, the p10/p90 ratios **V11 §3.6.1's derivation ratios, mirrored as `sizeBandLo`/`sizeBandHi` (0.7 / 1.45, fixed)**, rather than the critique's 0.75 / 1.35), an **M3 least-footprint budget test** and an **M10 shrink that lowers the clamps and then falls down the reverse lattice**, over scaling alone, because the clamps undid the scale and T-V2-29 and T-V2-30 could not both pass; and filed a **manor override with V11** (prosperous 420 m², rich 650 m², plot 3 000 m², main share ≥ 0.6) for the owner's "giant manor … bigger courts", with M3's test as the fallback by mechanism until V11 adopts it. *Reconciliation round 1:* V11 §3.6.1 adopted the override (J-V11.39), so the fallback is history. |
| J-V2.36 | Chose to read **the composer's rooms at the occupants' band**, emit the hall and chapel only for the `house` unit form or a programme hall, and clamp the hall to its programme row, over rooms fixed at the built band, because item 28 (f) keeps the shell and lets the interior follow who lives there. |
| J-V2.37 | Chose **the range opposite the gate as a closed ring's `main`**, the hall entered by a court door where the main door opens into the gate hall, over leaving closed families without a `main`, because courtyard houses and inns had their hall across the court from the gate. |
| J-V2.38 | Chose a **sunlit bias on the mirror coins** (`sunBias` 0.7; 0.5 in the parity presets `MFCG`, `FTG`, `VG` and `FM`, each with its own entry — reconciliation round 4) over fair coins, because item 102 (d)'s "the rich seek the sun" reaches the building's garden and court side, and historical houses turned their courts to the south; the frontage orientation is never changed, and the bias is not scaled by band (passive orientation was common at every band). |
| J-V2.39 | Chose that **only a wing the mutator adds** over a sealed void draws for an access (keyed by its wing), that a `setMassing` op draws none (the user declares `addUndergroundAccess`), and that a replacement draws as new, over drawing on every massing change, because growth by new foundations is the owner's "more digging" while a hand edit must stay predictable. |
| J-V2.40 | Chose **the rear side by the outward normal away from the access**, independent of the ridge, over "the eave side farther from access", because the ridge is decided later and a gable-fronted row's eave sides are its party walls. |
| J-V2.41 | Chose **two orientation laws beside the frontage** (`fallLine` for the longhouse, `water` for mills and landings) over frontage-only orientation, because V07's longhouse rule is hard and a mill's wheel must stand on its water (realism tiebreaker). |
| J-V2.42 | Chose **attached structures** (a wheel, sails, a church's west tower and porch, a court institution's ranges) laid by the main slot's massing over separate slots, because they are parts of one building historically and a separate slot could not touch its host (item 304). |
| J-V2.43 | Chose to **shift the geometry value by the use's significance** (half a band per doubling, at most one band up, never down) over ignoring it, because a landmark or a weighty custom institution must read larger (item 104) while a weak one never shrinks built stock. |
| J-V2.44 | Chose **one main porch plus an optional secondary hood** (0 by default, calibrated under `FM`; buildings with two or more porches reported against the reference's 10 / 41) over the reference's up-to-three porches at any door, because historical houses mostly had one porch at the main door; recorded as a departure. |
| J-V2.45 | Chose to add the **half-round porch at weight 0 in the default rows** over a default weight, because it is Fantasy Manor's commonest porch but rare in the realism base; the `FM` preset calibrates it. |
| J-V2.46 | Chose a **raised-choir crypt** (the crypt's floor above the water table, the chancel lifted by `crypt.clearCm`) over exempting the cathedral from the water table (a crypt that floods) or a refusal (a cathedral with no crypt), because the owner's "the cathedral always has a crypt" is unconditional and a raised choir over a crypt is the historical answer on wet ground (J111). |
| J-V2.47 | Chose **our own ids** (`regularCourt`, `starCourt`, `chordArc`, `rectCourt`, `gridWalk`) with a table-migration row over the reference's layout routine names, because §17.1's clean room forbids transferring its identifiers. |
| J-V2.48 | Chose **a canonical wing order (towers first, then by key) and wing references by key** (item 225) over index references, because V02's edits add and remove wings and an index would silently re-point a stored door or room. |
| J-V2.49 | Chose **the cupola as a massing draw recorded on `MassingRef`**, drawn from the district band and never in `Heights`, over a composition-rung ornament, because landmarks need their silhouettes before any click (NG C2) while shadows and capacity must not change. |
| J-V2.50 | Chose to express **the cross plan, the kiln, the chapter house and the tower on a block** with the existing constructions (`cross` as a main range with a two-piece cross slab; kilns and chapter houses as rangeless `towerHouse`s; the block tower as a contained square) over new wing kinds, keeping one geometry vocabulary. |
| J-V2.51 | Chose to answer "why this shape" through **V10's existing `WhyAnswer` fields** (alternatives as fact rows, recomputed without advancing a stream) over a new typed field, so no volume-10 change is needed. |
| J-V2.52 | Chose a **narrow `wingsInputs` digest** (the base wings, the main entrance, the massing reference, the slices, the porch's neighbourhood) over the building's whole leaf digest, because dormers and porches read nothing else and a relet must not mark a town stale at every epoch. *Amended by reconciliation round 1:* item 261 now writes the per-rung lists into §2.8's `inputs` comment, its `stale` sentence and §4.1's list as well as the `slices` comment, so an implementer holding the base alone stales `wings` only on `wingsInputs`. |
| J-V2.53 | Chose to **request the `wings` rung under `view` only at the neighbourhood band and finer**, with a pre-decided slicing into 16 ms batches, over requesting it at the district band, because the district band draws the massing's roofscape and §12.7 bounds a tile at 16 ms. |
| J-V2.54 | Chose to compose a **split site as two ordinary buildings** by the class's `split.works` and `split.shop` families, a merge-back as two mutations in one event, over a special two-plot building, so every lifecycle path reaches both by the ordinary machinery (item 105 (h)). |
| J-V2.55 | Chose **ladder members as ordinary buildings of the lesser class** and a SIZE step as the greater class with `sizeFactor`, the upgrade keeping member #1 (W3b where the arrangement changes), over a ladder-specific massing, because item 108 asks for real buildings that scale with the population. |
| J-V2.56 | Chose a **V02 table (`composition.classFamily`) for V07's village classes** over waiting for a `templateFamily` column on V07's rows, so every village class resolves now; a later column on V07's rows supersedes it (a cross-volume item). *Reconciliation round 2:* the table is the one source of the composition keys, keyed by the `v.` keys (J-V2.96). *Reconciliation round 3:* the column was taken by V07 for the budget rows only (J-V7.82 as amended by V07's round 2; J-V7.101): every `v.` row names a V11 §3.6.1 `templateFamily`, read at the chain's step 4 after step 3; `composition.classFamily` stays the one source of the village classes' composition keys and is read first, so no later column supersedes it. |
| J-V2.57 | Chose to **keep `MassingFamilyRow.wings` and `.joints` as M13 checks** over deleting them, because a structural check on each family's construction catches a construction bug at the building, where M14's ladder repairs it. |
| J-V2.58 | *Item 110 fold.* Chose to **fold item 110's building parts into this volume in its own lane** (new subsections, marked, and short marked clauses) over leaving them to `volumes/_integrate`, because V02's critique and revision had landed before item 110 existed, this seat holds the composer's context, and the other volumes' notes (V03, V05, V09, V10, V11) wait on V02's tier record and deck row before they can fold their parts. |
| J-V2.59 | Chose **stacked wings — a tier is a base wing standing on another (`BaseWing.on`), its `baseCm` the lower wing's deck level** — over a separate tier record or a composition-only stack, because heights, casters, capacity, the carry, the exports and the edit paths then serve tiers unchanged, and "each tier casts its own shadow" holds by construction (one prism per wing). |
| J-V2.60 | Chose **solid wings** (`solid`, floors 0, the height in `eaveCm`) over storeyed tiers only, because a stepped pyramid is rubble fill without rooms and a stair is a solid; the capacity and the plan must not count either. |
| J-V2.61 | Chose **stairs as solid `shed`-roofed wings laid on the terrace below**, the stair side's inset deepened to hold the run, over stairs cut into the upper tier or projecting through the step, because every tier then stays a simple nested ring and every stair is contained in what it stands on; both the stepped pyramid's great axial stair and the terraced palace's flights along the faces are reached. *Amended by the second revision (V2C-49 (5)):* **the cost of this construction is recorded** — with each front terrace holding a whole flight, the summit stands `(Σ f_k − (n − 1)d) ÷ 2` behind tier 0's centre, 2.4 / 3.6 / 3.3 / 4.4 m on the stepped temple's median stacks at its steeper grade 1.0–1.2 (6.4 m at the fold's grade .9; receipt, V02 §3.10.3) — accepted as the price of nested rings and contained stairs, the steeper stair (as the stepped temples of the Americas were climbed) bringing it down, and shown to the owner's panel (V02 §7.5 (3)), which may veto it toward stairs cut into the tiers. |
| J-V2.62 | Chose to keep **the tier geometry cells in `composition.json`** (V02) and **which classes build in tiers, with their chance and cap, in V11's class rows** (X17), over V11 holding the geometry, because item 110 (c) splits them so ("composition rows (V02) and class rows (V11)") and one fact must live in one place. |
| J-V2.63 | Chose that **a stepped row is reached only by name** (V11's region and era specialisations, a declared class, the `family` op) and that no default Western row lists `stepped`, over a small default share, because the design's centre of gravity is Western (D-7), item 23 forbids a hard-coded universal, and item 110 (f)'s no-op pin must hold. |
| J-V2.64 | Chose to **ship the tier construction at M3a in `@plat/plots` as a base outline-builder construction**, the same exported `layTiers` that V02's massing and V04's ruins call, over waiting for M6, because item 110 is "built with the editing and authoring milestones" and its second known-city fixture at M3a has a stepped temple; one function keeps the M3a and M6 results byte-identical (T-V2-46). |
| J-V2.65 | Chose **a tier's storeys and height through the base's `setAttr` of heights from M3a, and the `tiers` op from M6c**, over a new event kind at M3a, keeping item 101's vocabulary and M3a small. |
| J-V2.66 | Chose to **derive a wing's storeys (`storeyRange`) from `on` and the floors beneath, never storing a level offset**, over a stored `levelFrom`, because a derived value cannot disagree with the stack after an edit (the write that survives one path and ghosts another). |
| J-V2.67 | Chose that **a deck building's footprint band is the deck row's, replacing the template's, with its storeys capped**, over the template's band clamped, because item 110 (d) asks for a "small, light" deck budget whatever the class's usual size. |
| J-V2.68 | Chose **no basement, crypt or dig on any deck, a mole included**, over a masonry-mole exception, because the deck is not ground; an `always`-crypt class is never a deck class (V11's load check), so the no-refusal crypt ladder never meets a deck. *Amended by the second revision (V2C-58, V2C-66 (1)):* the gate reads **the use, not only the class** — a use to which a dossier crypt record binds is never placed on a deck either (`deckOk` per use; a hand placement bends landward; a mutation relocates the use), because the dossier is the sole immutable truth (items 20, 22) and a bridge chapel may carry a recorded crypt; and **a quay built on the bank is ground**, not a deck (the terrain datum, the ordinary basement gate, a dig floor), so "the deck is not ground" covers moles, piers, bridge decks and quays built out over water. |
| J-V2.69 | Chose that **placed landmarks on a deck (a mole-head or mid-mole tower or fort, the lighthouse islet's tower) read their classes' own rows** with their templates' budgets and floors, over the deck budget, because item 110 (d) names them "placed landmarks" apart from the frontage plots' small buildings. |
| J-V2.70 | Chose to **bend a hand edit's storeys to the deck's `maxFloors`** while leaving the footprint to the plot, over applying M10 to hand edits or leaving storeys free, because the storey cap is the deck's load (a structural fact) and the plot already bounds the rest. |
| J-V2.71 | Chose that **no building stands on a raised way's deck**, over admitting one, because item 110 (d)'s hosts are a mole, a pier, a quay platform and a bridge deck; a later owner rule may add raised decks, and `DeckContext.kind` would take one more value. |
| J-V2.72 | Chose to **add no building-side retaining-wall rule** — the massing reads only `H` and the levelled datum — over a wall setback or a wall-hugging range in the massing, because S10 and S11's levelling and the site plan own where a wall runs (item 110 (a)). *Amended by the second revision:* the rear setback may be 0 (a row built against the terrace wall), and **the datum reads the building's own terrace** — a sample within `terrace.wallBandCm` of a wall is taken on the centroid's side (item 231) — because a sample on or across the wall's line would read the platform across the wall, floating the house toward the terrace above or sinking it toward the one below; the massing itself still adds no wall rule. *Reconciliation round 3:* every datum sample is `levelledGroundCm` (V05's item 309; item 370), the levelling a platform datum never written to the raster, so the move keeps that one reader on the wing's own terrace — the terrace V01's `stepProfile` reads on each side of the wall. |
| J-V2.73 | ~~Chose to refuse towers, blocks, back ranges and added ranges on a stepped building~~ — **superseded by the second revision (J-V2.79):** a range, a tower and a back range are admitted as **ground wings** beside the stack — outside tier 0, every stair and stair 0's approach strip — and a block bends to a range, because the nesting and the stair chain read only the wings with `on`, so ground wings break neither, and item 101 R2 lets a tool refuse only a dossier fact or a lock. |
| J-V2.74 | Chose the **stair fallback `axial → flights → internal`** (internal only over a storeyed tier 0), then the family's lattice, over refusing the stepped family where the plot is shallow, so a stepped class keeps its tiers on most real plots and every fallback is reported. |
| J-V2.75 | Chose **pent skirts as ordinary `hip`, `pyramid` or `cone` roofs clipped where the tier above rises** over a new roof kind, keeping one roof vocabulary; the skirt's pitch is capped so it meets the tier above within its ground storey. *Amended by the second revision:* a pent roof is built as **band facets** between its ring and the ring above (V02 §5.2 step 3), not as a hip to the midline or a pyramid to one apex, so `ridgeCm = eaveCm + p × d` is the height at which the skirt meets the upper wall; and **pent only with equal insets** (`internal` or `none`), since an axial or flights front inset leaves no single `d`. |
| J-V2.76 | ~~Chose to refuse removing a stair~~ — **superseded by the second revision (J-V2.79):** removing a stair **bends** to `tiers { stairs: 'internal' }` over a storeyed tier 0 and to the sealed form `tiers { stairs: 'none' }` over a solid one, named, because item 101 R2 admits no structural refusal and a sealed stack (the early stepped royal tombs) is a lawful building whose unreached tiers V03 flags. |
| J-V2.79 | *Second revision.* Chose **a named bend for every structural limit of V02's edits** — the sealed stair form `none`; ground wings beside a stack; a block beside it as a range; `tiers` on a non-stepped building as `family: 'stepped'` first; `internal` over a solid base as `none` (all solid) or `axial`; `single` for `family: 'stepped'` on a deck; the building's removal for its last wing (and for tier 0 with nothing beside it); the party-wall line's move for a row quad's reshape and a gap for its removal; a too-small wing grown; an op beyond the plot clipped with `join` offered; an unreachable family as the nearest reachable one; a gate hall with no gate range as a gate passage — over refusals with offers, because item 101 R2 lets a tool refuse only what item 20 forbids and what a lock protects. **Variations from the critique:** `none` is lawful wherever tier 0 is solid, not only where every tier is (the critique's own unreached shrine on a sealed stack is the same case, and it gives removing a stair a lawful bend on a platform under storeyed tiers); and removing a row quad that is not the last wing leaves a gap rather than moving a plot line (the nearest form of a removal is a removal). |
| J-V2.80 | *Second revision.* Chose to **split the stepped construction into a pure `layTiers` (the geometry, ST2–ST7, with a typed failure) and an exported `massStepped` (frame, `slotBand`, ST0, `drawTiers` on `massing` 8–9, ST8, the attempts and the fallbacks)** over one function with a partial contract, so the M3a builder and stage 3 share every step that decides the bytes (T-V2-46 compares one function) while the `tiers` op, the mutator and V04 take only the geometry; `MassingRef` with `stack` reaches M3a with it (item 229), with a stack migration row, and `stepped` joins the M3a drift list. |
| J-V2.81 | *Second revision.* Chose **one building-level datum pass, `rebaseStack`, that every re-basing path calls** for a building with a stacked wing — S11, a commit, a tier edit, the terrain operator, a warp or vertex move, the carry, the crypt lift, a deck's re-base — over per-wing re-basing in call order, because a stacked wing's datum is another wing's height and a per-entity pass leaves it stale (the write that survives one path and ghosts another); a stacked wing's `baseCm` is not user-editable (it bends to its support's height). |
| J-V2.82 | *Second revision.* Chose to **raise a stack under Works in stack order, a solid wing by courses of `storeyCm.upper`**, over one fraction for every wing, because a tier cannot rise before the tier it stands on and a solid wing has no storeys to count (item 318). |
| J-V2.83 | *Second revision.* Chose **the stair's foot as a solid stack's main entrance, with the plan rooted at the first landing door** (and no plan above the ground for a building with no storeyed wing, its basement and access heads still planned; a sealed stack with a storeyed shrine keeps the shrine's plan, unreached — seam S23R3-14), over a main door on the shrine, because *Entrances* rule 1 puts the main entrance on the footprint and a solid stack has no storey there (item 230; V3C-66 (3) withdrawn). |
| J-V2.84 | *Second revision.* Chose **an elliptical two-ring `ovalCourt` family** — an arcaded façade ring and a solid seating ring round an open floor, gate passages at the major-axis ends — over the court-institution's rectangles or the fantasy `regularCourt`, because the amphitheatre is a historical form the owner's second fixture names and the fold's solid wings already carry seating; shipped as `massOval` in `@plat/plots` from M3a (the fixture stands there), with an `arena` row that fills its precinct (`claimShare` .5–.8) and a volume-11 plot override (X27). **Variation from the critique:** the floor's bar is at least 10 % of the hull, not 35 % — the historical amphitheatres' arenas are about 13–20 % of their hulls (the largest ≈ 13.5 %), so 35 % would forbid the real form. |
| J-V2.85 | *Second revision.* Chose **each stacked storeyed tier's first storey a principal floor of `storeyCm.ground`**, its others `storeyCm.upper`, over one storey height per wing, because each tier is its own building level with its own ground floor (as terraced palaces' terraces were entered at a principal floor); V03's `floorCm` reads the tier's two heights (X18), and `Building.heights.floors` counts the stack's levels (`1 + max storeyRange[1]`). |
| J-V2.86 | *Second revision (V2C-49 (2)).* Chose to **derive a rect tier 0's aspect from the drawn stack's own needs** (ST0's closed form at the drawn count, step, heights, grade and stair width), clamped to the row's aspect cell, over drawing an aspect independently (the critique's .68–.78 draw), because an independent draw mismatches the draw it must hold: the receipt's Monte-Carlo gives 14–27 % truncation with drawn aspects and 1.0–7.6 % with the derived one on the same hints (V02 §3.10.3); the aspect draw is removed from ST1. |
| J-V2.87 | *Second revision (V2C-49 (3), V2C-59).* Chose **a claim-sized band — `claimShare × area(H)` — read by `slotBand` wherever the row carries `claimShare` or the template's footprint is "the claim's"**, with the shared default `claimLo`, `claimHi` 0.35, 0.6, over a `stepped`-only constant, because the palace override's courts, the great temple and the arena have the same gap (no template number) and one rule fills it: the precinct the site plan gave the slot sizes the building. |
| J-V2.77 | Chose to **export a stair as a CityJSON `BuildingInstallation` and a stepped glTF solid**, and each upper tier as a `BuildingPart`, over folding them into one solid, because the standard has those types for outer stairs and building parts, so viewers and GIS tools read them rightly. |
| J-V2.78 | Chose to **compute the building's heights as the stack's envelope only when a wing stands on another** over changing M11's rule for every building, so every other building keeps its bytes (the no-op pin) while §8.4's caster ceiling and V05's clearance see the top of a stack. |
| J-V2.88 | *Reconciliation round 1.* Chose **family rows for V11's three new template families** — `burial-ground` (the mortuary chapel's small single range, reached through `roleKeys`, over SCC-12's mapping to the `chapel` family row, whose templates at .1–.5 would give a one-cell mortuary chapel a nave-sized plan), `fort` (a battlemented keep sized to the fort budget; its second tower the `tower` row, its gate the `gatehouse`, its barracks range `barracks`) and `arena` (the second revision's `ovalCourt` row moved unchanged from a `court-institution` alias to its own family, its `gate`s absorbed as M5's passages — the major-axis pair, then the minor-axis chords for a third and fourth) — with a `charnelHouse` role row, a `lychgate` role row that is a roofed gate at the poor and modest bands and a gatehouse at the prosperous and rich, and the exemption that a template with no required structure has every drawn structure read its role key, the first drawn being the main building, over mapping the lychgate to the `gatehouse` row at every band or giving the first drawn structure the family chain, because each structure then keeps its own historical size and the compile check stays total. |
| J-V2.89 | *Reconciliation round 1.* Chose to **clear every building whose footprint meets a new raised way's piers or under-deck strip, on every path**, over the second revision's exception for buildings below the deck's underside less `raised.clearCm`, because item 110 (b) keeps the spaces between the piers open or vaulted, V01 makes the strip a hole, and a way founded at an epoch must leave the same ground as the same way regenerated at its address; the soffit clearance over a crossed way stays V11's `raisedWays.structure.clearanceCm`, and `raised.clearCm` is withdrawn. |
| J-V2.90 | *Reconciliation round 1.* Chose **one tread law, `stairTreads`** — `⌈rise ÷ riserMaxCm⌉` equal risers, the run divided among them in whole centimetres — read by the map, the exports, V01's hatch and V03's exterior flights, over a fixed plan pitch (`treadM`) or V03's interior going, because the flight's rise, run and grade are this volume's and the picture, the plan and the 3-D solid must show one set of treads. |
| J-V2.91 | *Reconciliation round 1.* Chose to **raise the ground wings over a `half` basement by half the cellar depth** (a basement that is only a crypt: the wings over the crypt's ring), carried by `deriveBase` on every re-basing path while the basement stays half and read by the gate without the raise, over sinking the half cellar's floor a full depth below the datum (below the water table the gate chose the half form to avoid) or keeping the gate's half-depth floor with no raise (a cellar storey about 1.1 m high the plan cannot furnish), because a raised ground floor over a half-sunk cellar is the historical form (PLAUSIBLE, general knowledge) and it reconciles the base's two sentences on the half cellar's floor; where the base's basement rule has shipped before this request is applied, it is a declared one-time shift (§13.3). |
| J-V2.92 | *Reconciliation round 1.* Chose the **crypt seed order** template parts (`chancel`, else `apse`, else `crossing`) → a stack's tier 0 → the east-most storeyed range (ties by key) → none, in **one exported function** (`cryptSeedWings`), over leaving the seed to each reader, because the base's basement function, V03's crypt placement and the tests must read one set of wings; a church's chancel is its crypt's historical place and a stepped temple's chamber lies in its platform (V02 §3.14.5 (d)). |
| J-V2.93 | *Reconciliation round 1.* Chose **`facadeBays` on every ring side** — eave sides as before, other sides without the valley term and with no bay where the run is not positive, a tower's bays round its free perimeter — over V03's per-side restatement without the deductions for meeting towers and wings, because one rhythm must serve the plan's windows, the lit windows and the dormers on every face, and a round tower's short facets would otherwise hold a window each or none. |
| J-V2.94 | *Reconciliation round 1.* Chose to **write the use's stepped specialisation into `siting.declared`** in the same undo group as a bend or `family` op to `stepped` (and `none` on the way back), over leaving it to a separate declaration, because the specialisation, the heights row and V03's plan rows must follow a hand-made stack, and V11 holds a user's specialisation on the use through that table only. |
| J-V2.95 | *Reconciliation round 1.* Chose to **clamp the hall by its wing alone before V03's programme rows are loaded**, reported (`hallUnclamped`), and to move T-V2-35's plan-units clause to V03 (T-V3-25) and its hall-area clause to M6-P's P1, over holding M6b's exit on the plan rung, because M6b precedes the plan rung and its exit must be executable at M6b. |
| J-V2.96 | *Reconciliation round 2.* Chose to **key `composition.classFamily` by V07's `v.` keys with no scope column**, over keeping the town ids with a `village` scope, because a `v.` key and the town key of the same word are two classes (V11 §2.9; J-V7.95), a town class at a village rung plays its `villageForm`'s `v.` class (V11 §3.22) and so never needs a village dressing of its own, and V07 keeps this table as the one source of the village classes' composition keys (J-V7.82); the `v.longhouse` override row takes the class's own key, and a load check pairs every `v.` class with exactly one row. |
| J-V2.97 | *Reconciliation round 2.* Chose **V12's `reference` run against Fantasy Manor** (`layer: { preset: 'FM' }`) on V12's `fm.*` metrics to set the `FM` preset's measured-rate cells, with the free-frame harness as its fixture and V12's outcomes (`fallback-applied`, `not-achieved`) as the failure branch, over a V02 harness calibration run with its own fallback, because V12 §3.7.2 (3) admits a `presets.FM` entry only by such a run and its scope guard (T-V12-9) must see every tuner; and chose **a register entry for every calibratable `composition.json` cell written at the exit that ships it**, over entries at M6c alone, so no milestone lands a provisional number without one (T-V12-20). |
| J-V2.98 | *Reconciliation round 3.* Chose to **take every ground sample of the datum through V05's `levelledGroundCm`** (item 370, item 231) — the vertex and centroid samples, the basement gate's fall and the raised crypt's lowest sample — over sampling the terrain raster, because item 309 makes a levelled plot, block or ward a platform datum never written to the raster, so the raster keeps the unlevelled slope and a house seated on it would float above or sink below the step V01's `stepProfile` draws from the same datums; the wall-band move is kept so that a vertex on or beside the wall's line reads its own platform. |
| J-V2.99 | *Reconciliation round 3.* Chose to **write V03's condition into item 371's own text** — `Basement.access` `external` only where no ground wing is storeyed, its door at V03's `basementDoor(b)` (a retaining wall's side first, else the tomb door) — and to amend the base's `basementAccess` comment with it, over keeping "under a solid ground wing" with a superseding note, because the base-change applier copies the request's words, a mixed ground floor (an arena's façade ring, a stepped temple's annex) must be joined by its core (J-V3.88), and V01's entrance reserve reads the same access. *Reconciliation round 4:* the widening now also carries the two base texts that still read `external` as a walk-out — §13.2's T29-4 (a 100 % bar the all-solid temple would fail) and J-A29.25 (its access clause, and its door clause pointed at step 3) — plus, by the same sweep, the plan rung's step-5 root clause and the base's six "ground storey" readings of the basement's place (item 371 (a)–(d)); step 3 and T28-3 are left to V03's item 578, so each base sentence has one request; the condition is worded by V03's `ground(b)`, never "storey 0". |
| J-V2.100 | *Reconciliation round 3.* Chose **the `FM` preset's scope as the cells that carry a `presets.FM` entry — `composition.json`'s and V11 §3.24.0's item-110 chance and offer cells (0)** — over `composition.json` alone, because V11's T-V11-21 and V12's goldens guard (§3.4.4, §3.7.6, J-V12.54) rely on `FM` resolving the stepped and deck families off; `FM` still zeroes no `extension` cell, so our realism rules stay on under it (item 59's KEEP OURS). |
| J-V2.101 | *Reconciliation round 3.* Chose **one register line per column family** (V02 §3.10.10) — its metric (`bldg.area`, `fm.*`, `tier.count`, `deck.buildings`, `crypt.present`, `time.model`, and `bar.T-V2-<n>` from V12's bar family, X33), method, due milestone and the fallback this volume already states, else V12 §3.11's panel rule — over per-cell prose, so each landing seat writes lint-green entries without inventing a metric; the code-read `FM` entries, the options and the keys take no entry (their `ref:` provenance, a `fixed:` note, not calibratable), and only the measured-rate `FM` entries move, by V12's `reference` run. |
| J-V2.102 | *Reconciliation round 4.* Chose to **register V02's eleven bars in one table in V02 §3.10.10** — per bar its statistic in clause order, its towns, its CI tier and the seat (the milestone that writes the line's entry), `stages` `['S11']` for all, one registration per CI tier where V02 §7 runs a bar in two, and, in T-V2-36, T-V2-42 and T-V2-46, a clause whose subject is not yet built reading −1 and left out of the verdict — over V12's generic sentence alone, because the seat would otherwise choose towns and tiers bar by bar, and the M3a-V2 and M6a entries name bars (T-V2-42, T-V2-46, T-V2-36) whose other clauses wait on M6a or on V04's access draw, so a whole-bar verdict could never confirm them on time. |
| J-V2.103 | *Reconciliation round 1, continuation.* Chose (a) to keep `sizeBandLo`/`sizeBandHi` in `composition.json`'s constants as **fixed mirrors** of V11 §3.6.1's derivation ratios (`own`, a `fixed:` note, no register entry — the one constant of V02 §3.10.9's table that is not calibratable) over dropping them and reading V11's compiler constants, because M10 applies the ratios at run time to a compiled row whose authored p10 = p50 = p90 while V11 holds them only in its compiler, and a mirror marked fixed can neither drift by a calibration nor leave M10 without a value; and (b) to bring **item 426 and item 224 to M3a whole** with item 229 — both `composition?` fields, the `heights` comment and the hint clause — over splitting each request into an M3a part and an M6 part, because no part changes a base behaviour before a writer or a hint exists (V11's C3b replacement and the base outline builder's stepped and oval constructions are the first, both at M3a), so the earlier landing costs nothing and each request stays one text. |
| J-V2.104 | *Reconciliation round 2, continuation (the seam round's J-S23R1.8 and J-S23R1.9).* Chose (a) to **ship the `PorchKindRow`s with M3a-V2's `composition.json`** (data only; the porch itself is composed from M6b) over V01 holding porch sizes of its own until M6a, because the rows are five authored data rows with no build effort, a second copy of their sizes in V01's constants would state this volume's facts twice, and a reserve sized from the real rows from M5 leaves the hood pins where they are when the composer's porches appear at M6b (J-V1.75's order-independence); and (b) to **build item 303's hole sentence alone at M3a**, with item 229, over the whole request at M3a or leaving the arena floor to its template's yard row until M6, because `massOval`'s arena is laid from M3a and three bars (T-V2-42, T-V1-26, T-V1-54) read its floor as a `court` before M6, while the request's other sentences have no reader before M6 by the seam round's reading. A base template's hole whose kind the yard rows set otherwise before M3a is retyped once at M3a, a declared shift (§13.3), over keeping template-typed holes, because two typings of one kind of place would split every reader of the court. |
| J-V2.105 | *Reconciliation round 3, continuation (the seam round's J-S23R2.10).* Chose (a) to **carry S23R2-11's and S23R2-12's words into X18's hand-off and into item 371 (c)'s step-5 root clause** as well as the texts the two issues name, over leaving those two same-shape texts, because X18 is what V03 builds from and (c) is base text the applier copies — a storey-less stack against a retaining wall would otherwise root its basement at a tomb door the plan never opens, and a storey-less temple's crypt would read as unplanned; (b) to **home the whole derived-at-read block of V02 §2.6 in `@plat/plots` at M3a-V2** — `rebaseStack` and `stairTreads` with the four stack helpers — over naming only the four, because `rebaseStack` runs on the base's re-basing paths from M3a and `@plat/buildings` depends on `@plat/plots`, so no function of the block can live above V03's eager readers (`ground(b)`, `floorCm`, `basementDoor(b)`); (c) to write every bar registration's `preset` as `'default'` (V12 §2.1's `PresetArm`) over leaving the field to the registering seat, because none of V02's eleven bars generates its towns under a parity preset — T-V2-37's preset clause reads the compiled cell, not a town, and the `FM` measurements are V12's `reference` run, not a bar. |
| J-V2.106 | *Reconciliation round 4, continuation (the seam round's J-S23R3.11).* Chose (a) to word item 230's storey-less clause by **what the stack carries, not by its stair form** — "a sealed stack whose every wing is solid" among the buildings with no plan above the ground, and a sealed stack carrying a storeyed tier or shrine keeping that wing's plan, reached by nothing and flagged by V03 — over classing every sealed stack as storey-less, because the stair form says how a stack is reached, not whether it has storeys, and a sealed temple with its shrine is the common sealed stack (the second revision's bend seals a shrine-topped temple, V02 §4.6); (b) to give V02 §7.7's sealed stack fixture **two forms** (sealed with its storeyed shrine; sealed with every wing solid) over the one fixture the second revision named, because T-V2-45's sealed clause now has two branches and a one-form fixture would leave one of them without a subject; (c) to type `rebaseStack`'s ground reader as **a plain function of a point, `ground: (p: PointCm) => Cm`, that each caller builds from `levelledGroundCm(doc, key, ·)`**, over passing the document and the arena key into `rebaseStack`, because the pass reads only heights at points, every calling path (S11's datum step, the edit operators, the carry, the crypt lift, a deck's re-base) already holds its document and the plot's arena key, and the base's raster `TerrainSampler` is the reader item 370 removed from the datum; and (d) to keep item 230's first clause (the stair's foot as the entrance of a building with no storeyed ground wing) as written, the sealed clause after it naming the sealed form's entrance, because ST7's hint already places that entrance exactly and the general-then-particular order is how the clause read for the all-solid sealed stack before. |
| J-V2.107 | *Reconciliation round 5 (the seam round's J-S23R4.5).* Chose (a) to **give stair 0's approach strip its own V02 §1b row while keeping its one statement in V02 §4.6's ground-wing bullet**, the row's kind cell pointing there, over moving the definition into V02 §3.15.1's construction, because V03's two door functions cite the strip "as V02 §4.6 bounds it", no step of the construction lays or stores it (ST2 – ST7 place the reserve and the stairs; the strip only bounds what may stand in front of stair 0), and a moved statement would break a landed citation for no change of mechanism; (b) by the same-shape sweep, to **name the strip among `landingM`'s consumers** in the constants row and to **settle round 3's continuation PLAUSIBLE item** on V03's storey-less plan together with round 4's — both now true at source (V03 md5 735035b5…) — over leaving a settled item marked PLAUSIBLE, with each item's round text kept and its verdict added after it, marked "formerly PLAUSIBLE". |
| J-V2.108 | *Finalization.* Chose to **key the raised lift and the crypt-only half raise on the ground wings over the basement's ring**, over the crypt's seed wings, because V03 derives basements under other wings — the ground wings' whole inset of a crypt no stair reaches (V03 §3.7.4), an author's crypt ring on a building without a basement (V03 §4.2) and the far-third seed where `cryptSeedWings(b)` returns none — and under the seed-wing key each of those put storey −1 into an unraised or unlifted storey 0. A derived crypt stays under its seed wings on the `half` and `raised` rungs (V03 §3.7.4 step 2), so J-V2.91's raised choir over a half-sunk crypt is unchanged; a solid tier 0 holding the crypt inside it keeps its height. No declared shift: the crypt parts are M6-U's, unbuilt. |


## 10 Base change requests

Each request names the base section's exact heading, quotes the current text once, and gives the new text or the
mechanism. This volume is written as if every request were applied. None changes a base behaviour before stage 3
registers, except item 216 and item 217, which ask the base to carry two small fields from M1 so that stage 3 needs no
migration, and item 226, which applies with item 109 (k)'s crypt rule (J111) whether or not stage 3 has registered
(the crypt's seed wings are `cryptSeedWings`, exported by `@plat/plots` with or without stage 3, V02 §3.14.5 (c); its
half-cellar raise, (a) and (b) of its round-1 extension, lands with §2.6's basement gate; reconciliation round 2, S23R1-11).
Also excepted: the item 110 fold's requests, which land from M3a with item 110's base milestone where V02 §8.5's M3a-V2 row
lists them (item 227 – item 419, item 228 – item 231), item 229 bringing with it the parts of item 217, item 222,
item 426, item 224 and item 303 (its hole sentence) that M3a's stepped, oval and deck
buildings read.

**item 216 — wing roles and keys, from M1.** `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`. Current (the last line of `BaseWing`): "`  heights: Heights; roof: RoofSpec }`".
New: "`  heights: Heights; roof: RoofSpec; role: WingRole /* its part in the building's plan: main, range, cross, block,
back, service, tower, turret, gate, part, shelter — V02 §2.1; the base outline builder writes main (a rectangle, the
bar of an L or T), range (their other rectangle) or part (a template or axis-locked part) */; key: number /* a stable
ordinal in the building: written once when the wing is minted, never changed, never re-used after a removal
(Building.nextWingKey); edit paths and stage 3's per-wing streams name the wing by it */; arcade?: true /* stage 3: the
ground storey is an open arcade (V02 §2.1); the capacity function gives it no ground-storey rooms */ }`", with `type WingRole` declared
beside it as V02 §2.1 states it.

**item 217 — the building's massing reference and next key.** Same heading. Current: "`  composition?: Composition /*
stage 3: lazily generated rung by rung`". New: insert before it "`  nextWingKey: number /* the next free wing key (item 216)
*/; massing?: MassingRef /* stage 3 (V02 §2.1): the family, the composition row and grammar the massing read, and
the entrance hint; absent before stage 3 */;`".

**item 218 — a composed wing names its base wing.** Same heading. Current: "`interface Wing { footprint: Polygon /* the
wing's ground ring */; heights: Heights; roof: RoofSpec; dormers?: number`". New: "`interface Wing { base?: number /* the
key of the base wing it composes (V02 §2.2); when set, footprint, heights, roof and spans are that wing's, read at
read and never stored */; footprint: Polygon /* the wing's ground ring */; heights: Heights; roof: RoofSpec; dormerRows?:
DormerRow[] /* V02 §2.2 */; dormers?: number /* with dormerRows: derived, their counts' sum`" — the rest of the
comment unchanged.

**item 219 — porch kinds.** Same heading. Current: "`interface Porch { side: number /* the side of its wing's footprint
ring that it stands on, by ring index */;`". New: insert after it "` kind?: 'hood'|'gabled'|'twoStorey'|'recessed'|'halfRound' /*
V02 §2.2 and V02 §3.7; absent: gabled */;`".

**item 220 — composed towers name their tower wing; composition row and grammar.** Same heading. Current: "`interface
ComposedTower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }`". New: "`interface ComposedTower { base?:
number /* the key of the massing's tower or turret wing (V02 §2.2): its ring is that wing's ring, and centre (the
ring's area centroid), radiusCm, heights and roof are read from it — never stored, never carried on their own */; centre:
Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }`". And in `interface Composition`, after "`lod:
('outline'|'wings'|'rooms'|'plan')[]`" insert "`; row?: string; grammar?: string /* the composition.json row and version
(V02 §2.2) */`", with one sentence after the carry paragraph: "Under stage 3, `Composition.courts` is derived at
read from the footprint face's holes, and a composed wing or tower that names its base wing carries nothing of its own;
a stored composition's carried points are then its rooms' and its plan's."

**item 221 — the path-shape rows become the massing family rows.** Same heading. Current: "`interface PathShapeRow {   //
item 59: stage 3's path-shape rows`". New: the interface is replaced by "`type PathShapeRow = MassingFamilyRow   // volume
2 §2.3: the massing family rows; item 59's five families keep their rows and their provenance (P21) under our own ids —
regularCourt, starCourt, chordArc, rectCourt, gridWalk — by the table-migration row below`"; the item-59 paragraph above it
stands, its family names read through that row. **The table-migration row** (§7.6's keyed row operations), applied before
M6 ships any document: the base's five item-59 family ids, in the order of `PathShapeRow.family`'s union, map one to
one onto `regularCourt`, `starCourt`, `chordArc`, `rectCourt` and `gridWalk`; the `family` union itself is re-typed as
`MassingFamilyId` (V02 §2.1); a document or table naming an old id is rewritten on load.

**item 222 — the `shed` roof.** Same heading. Current: "`type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|
'dome'|'skeleton'|'tent'|'plain'`". New: "`type RoofSpec = { kind: 'gable'|'hip'|'shed' /* one pitch; V02 §2.1 */|
'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain'`", and the field "`high?: number /* shed only: the ring side at
ridge height */`" added after `pitch?`.

**item 385 — `DriftBounds` typed.** `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the
ASSIGN hook)`. Current: "`drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read
against §4.7 S11's designation template (item 19) */`". New: the same, its comment ending "`… (item 19); typed in V02
§2.1 */`".

**item 426 — the composition key on the template; the heights row named (from M3a, with item 229).** `### 10.2 Roster (data-driven, replaceable;
sequential and prefix-stable; our values)`. Current: "`programme: string /* item 28: the key of a RoomProgramRow (below),
which the plan rung of §2.6 reads */;`". New: insert after it "`composition?: string /* stage 3: the key of the
CompositionRow (V02 §2.3) the massing and the composer read for the main slot; absent: V02 §3.2's resolution
chain (the class override, the template family, the arrangement's default) */;`"; in the `structures` entries add
"`composition?: string /* the slot's own composition row; absent: V02 §3.2's role chain */`". Current: "`floors:
[number, number]; heights: string /* the class heights row */`" → "`… heights: string /* the template family's HeightsRow
(V11 §2.8, with V02's item 427 columns) */`".

**item 341 — stage 3's concerns.** `### 6.1 RNG and stream design`. Current: "`the composition's own concerns (stage 3's,
appended to the registry below when stage 3 registers them) read`". New: "`the composition's own concerns (stage 3's:
compose.dormers, compose.porch and compose.rooms, V02 §3.12) read`"; and after the list the paragraph **Appended by
the amendments of 2026-09-27** closes, one sentence: "**Appended by stage 3 (V02 §3.12), each with the next
append-only u16 id:** `massing` (a geometry concern, non-rerollable, attempt cap 3; read by S11's `outline()` and every
operator that re-derives S11 on a plot; keyed by the building's lineage), `compose.dormers` and `compose.porch` (geometry
concerns, attempt cap 0, keyed with `#wings`), `compose.rooms` (attempt cap 0, keyed with `#wings` and `#rooms`)."

**item 346 — wing anchors.** `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability,
stated)`. Current: "`| room of a stored plan (§2.6) | centroid within its wing, per storey | 0.5 m in the wing's frame |`".
New: a row inserted before it: "`| base wing (§2.6; V02) | (its building's address, its key); after a re-derivation,
by role, then its ridge midpoint in the building's frame | 0.5 m | wing role |`".

**item 351 — the two event kinds, the key paths, and their lifecycle rows.** `### 7.1 Edits are ordered events on
addresses; the named actions; the edit targets; dry-run validation`. Current: "`  | { t: 'setRoomUnit'; building: Id;
storey: number; room: Id; unit?: Id }`". New: after that member, "`  | { t: 'setMassing'; building: Id; op: MassingOp }   //
stage 3 (V02 §4.1)`" and "`  | { t: 'setComposition'; building: Id; op: CompositionOp }   // stage 3 (V02 §4.1);
the first one stores the composition`", with `MassingOp` and `CompositionOp` declared in V02 §4.1. In the edit-target
table's buildings row, current "`` `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), ``" →
"`` `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), `setMassing` and `setComposition`
(stage 3), `setAttr` on `wings/<key>/heights` and `wings/<key>/roof`, ``". `### 7.4 Lifecycle of every edit kind (create ·
read · persist · regenerate · undo · migrate) — G-P8`: two rows added after the row that begins "`| regenerate with
`rung` (item 28) |`", as V02 §4.4 states them.

**item 261 — the rungs' recorded inputs.** `### 2.8 Identity, lifecycle, provenance, the entity registry`. Current:
"`slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows;`".
New: "`slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows,
and for the wings and rooms rungs the composition.json rows (V02). Under stage 3 the wings rung's inputs are exactly
wingsInputs (V02 §3.11): the base wings (keys, roles, rings, heights, roofs), the main entrance (wing key, side,
offset) and a secondary porch's entrance, Building.massing, these slices, and the plot's ring with the footprints and yard
parts of its other buildings within the porch's reach — never the whole leaf digest; the rooms rung adds the occupants'
band row and value, the household count and the programme's hall row;`".

**Extended by reconciliation round 1 (J-V2.52 amended).** The same heading; the per-rung rule is written into the record's other two statements of its inputs and into §4.1's, so the base alone stales each rung only on its own list. Current (the `inputs` comment, whole): "`inputs: Hash64 /* the digest of the rung's recorded inputs — for a building: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans), the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6), the occupants' band (Plot.fieldBand) and value (the value at §7.2's τ), the accesses that open in its basement (item 64), its running Works' stage at the drawn week (item 67 (j)) and the households housed in address order (item 28 (f)), and the slices below */;`". New: "`inputs: Hash64 /* the digest of the rung's recorded inputs, per rung. For a building's plan rung — and every rung of a building before stage 3 registers —: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans), the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6), the occupants' band (Plot.fieldBand) and value (the value at §7.2's τ), the accesses that open in its basement (item 64), its running Works' stage at the drawn week (item 67 (j)) and the households housed in address order (item 28 (f)), and the slices below. Under stage 3, the wings rung's: exactly V02's wingsInputs (§3.11 there) and its slices; the rooms rung's: wingsInputs, the occupants' band and value, the household count, the class programme's hall row and its slices */;`". Same paragraph, current: "`stale`: an input changed — a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a concealed use, an access into its basement, its Works' stage, a slice, a dossier event of items 18, 22 or 31 —". New: "`stale`: an input **of that rung** changed (the per-rung lists of `inputs`) — for the plan rung (and every rung before stage 3) a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a concealed use, an access into its basement, its Works' stage, a slice, a dossier event of items 18, 22 or 31; for the wings and rooms rungs only what their lists name —". `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker`, current: "a batch that changes one of its recorded inputs — a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a table slice it cites, or a dossier event of items 18, 22 or 31 (§2.8's `ElaborationRecord.inputs`) —". New: "a batch that changes one of the rung's recorded inputs (§2.8's per-rung lists of `ElaborationRecord.inputs`) — for the plan rung a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a table slice it cites, or a dossier event of items 18, 22 or 31; for the wings and rooms rungs only what their lists name —". V03's item 235, -19 and -28 add their inputs to the plan rung's list and are applied after this request. Test: T-V2-21.

**item 376 — the `FM` building-scope preset.** `### 7.6 The override layer and editable tables (G-P12; owner amendment
5)`. Current: "`` `presets?: { MFCG?: CellValue; FTG?: CellValue }` ``". New: "`` `presets?: { MFCG?: CellValue; FTG?:
CellValue; FM?: CellValue }` ``", and after the per-preset paragraph one sentence: "A third, **building-scope** parity
preset, `FM`, resolves only the cells that carry a `presets.FM` entry — `composition.json`'s (V02 §3.10.8) and volume
11 §3.24.0's item-110 chance and offer cells (0) — and sets the `fantasyShapes` option on; it zeroes no `extension` cell and
changes nothing else; it is the stage-3 parity harness's setting (§13.5) and a user may choose it as a building look;
`extension.over` gains `'FM'`." (Reconciliation round 3, SCC-52: V11's `roster.specialisations`, `deck.offer` and
`deck.landmarks` chances resolve to 0 under `FM`, so no generated stepped or deck building enters the `FM` goldens at a
switch-on bump — V11's T-V11-21, V12 §3.4.4, §3.7.6 and J-V12.54; one text with file f item 376's note,
SCC-53.) Current "`` `extension: { over:
'MFCG'|'FTG'|'both'|'none'; mode: 'chance'|'weight'|'option' }` ``" → "`… over: 'MFCG'|'FTG'|'FM'|'both'|'none'; …`".

**item 406 — the roofscape construction, the façade bays and the paint programs.** `### 8.2 Style sheets as data: roles,
contrast, symbolisation, paint programs, layer order, presets (G-R2)`. Current: "`  roofConstruction:
'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing';`". New: "`  roofConstruction:
'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing'|'roofscape' /* V02 §5.2: every shipped family's default once
stage 3 registers */;`". Current: "`` `crown(library)`; `halo(role rule)` (§9.4); ``" → insert before it "`` `roofscape(tone)`,
`dormer`, `porch`, `towerRoof` (V02 §5.3); ``". `### 8.6 Stage-2 render tier and stage-3 LOD`. Current: "`Roof
construction (§8.2) runs per stored wing (VIS-10) by its `BaseWing.kind` (§2.6):`". New: prepend the sentence "With stage 3
registered, the `roofscape` construction (V02 §5.2) draws each building's roof plan from all its wings at once —
ends, valleys, walls and towers resolved, the facets planar and non-overlapping — and the light pass's surface layer takes
its roofs from it; the per-wing constructions below stay for the parity presets' sheets and as the per-wing downgrade."
`### 2.6 …` (plan step 6). Current: "`windows follow each room's exterior demand, one per façade bay of its exterior
wall`". New: "`… one per façade bay of its exterior wall (the bays of V02's facadeBays)`".

**Extended by reconciliation round 1.** `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)`, the presets table's `hatched` row, district cell. Current: "two-tone roofs by `fakeGablePerWing`". New: "two-tone roofs by `fakeGablePerWing`; by `roofscape` once stage 3 registers (V02 §5.3)". `## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)`, *Render tier*. Current: "two-tone roofs over the stored wings". New: "two-tone roofs over the stored wings (over the roofscape's facets once stage 3 registers, V02 §5.2)". File f item 406 carries these clauses and is applied after item 405 (V01's BCR-14 edits the same row's neighbourhood cell).

**item 328 — F-MASSING and F-COMPOSE.** `### 5.2 Failure classes: detection, ladder, test`. Current (the row's start):
"`| F-PLAN† the room programme does not fit its wings [§2.6] |`". New: two rows after that row — "`| F-MASSING† the massing
cannot lay its drawn family [V02 §3.5] | S11's outline() and every operator that re-derives S11 on a plot | a family
infeasible on the frame, a check of M13 failing, an oblique path below mitreMinDeg | M14: attempts 1–2 of the family → each
other feasible family → single at the least width → baseOutline (the base rectangle); per building, reported by class |
T-V2-17 |`" and "`| F-COMPOSE† a composition part fails its test [V02 §3.13] | compose() at the wings and rooms rungs |
a dormer off its facet, a porch without space, a composer's room the seed contract refuses, the stage-3 contract failing |
drop the dormer → the next porch kind, then none → shorten the room, then omit it → the identity composition;
reported to the view report | T-V2-18 |`".

**item 332 — invariants.** `### 5.3 The invariant suite, by scope (SCL-1)`. Current: "`| no footprint overlap |
batch-local | touched footprints against the spatial index |`". New: after it, "`| stage 3: every wing inside its plot;
the non-tower wings of a building tile; every tower attached (overlap share in its band; a tower on a block contained in it) and not through a wing; every
footprint hole a court yard part | batch-local | the touched buildings' wings (V02 §3.5 M13) |`" and "`| stage 3: the
union of a stored composition's wings and towers equals its footprint | batch-local | the touched buildings with a stored
composition |`".

**item 505 — the package.** `## §14 Package and module layout, key interfaces, dependency rules, extension points`.
Current: "`@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the
base; the interface lives in @plat/layout]`". New, a line after it: "`@plat/buildings stage 3: the massing (outline), the
composer (compose), composition.json's loaders, the roofscape and facadeBays   [built after stage 2; the BuildingGenerator
interface lives in @plat/plots]`". Current: "`layout ← plots ← labels ← render`" → "`layout ← plots ← buildings ← labels ←
render`", and after "`` `hood` depends on `layout` / `plots` only through their interfaces; ``" add "`` `buildings`
implements `plots`' `BuildingGenerator` and is imported by `render` and `export` for its pure `roofscape` and
`facadeBays` only; ``". **Reconciliation round 2:** that line stays as quoted (item 505 quotes it), and one
sentence follows it in §14: "`facadeBays` and its two constants' reader (`bayM`, `endMarginM`) are implemented in
`@plat/plots` beside `massStepped`, `stairTreads` and `cryptSeedWings`, in every build order, and re-exported by
`@plat/buildings`; `render` and `export` may import it from either."

**item 522 — parity rows and the test pointer.** `### 15.1 Parity matrix — every capability row of
`docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked`. Mechanism: a new section at
the matrix's end, "**Fantasy Manor (build 890) — STAGE-3**", with rows: F1 plan path of wings from five layout families →
V02 §3.3 (STAGE-3); F2 wing slabs with mitred joints and two-facet roofs → V02 §3.5 M5, V02 §5.2 (STAGE-3); F3 hip blocks →
V02 §3.5 M7, as tiling blocks (STAGE-3, beyond: never through a wing); F4 dormer rows and projecting gables → V02 §3.7, projections
as blocks (STAGE-3); F5 porches and a door fallback → V02 §3.7 and the base's entrance rule (beyond: always a street-facing
door); F6 round and square towers → V02 §3.5 M8 (beyond: the collision set holds the wings); F7 facet shading, hatching and a
swept shadow → V02 §5.3 and §8.4 (h) (STAGE-3); F8 no plot, no scale, no seed → V02's plot fitting, metric scale and
streams (beyond). `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`: after the bullet
that begins "`* *The plan rung and elaboration (item 28; §2.6 beside §2.8's record, §2.9's cache and §4.1's policy) — the
B-PLAN fixtures.*`", one bullet: "*Stage 3 (V02 §7)* — T-V2-1 – T-V2-53 and the B-MASS fixtures, in the tiers V02 §7.6 and §7.7 name — the bars of
V02 §7.7 whose subject a BASE item lands before M6 run from that item's milestone (T-V2-44 – T-V2-47, T-V2-50, T-V2-51
at M3a; T-V2-52 at M2b)." `### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file`: the Fantasy Manor
rows of V02 §7.4, with `referenceBuild` 890, added after the row that begins "`| entrances and basements |`".

**item 524 — the milestone, the effort and the staged row.** `## §16 Build plan — calibration and spikes first, then a
viewable town, then editing, then parity, then stage 2`. Mechanism: a row after the row that begins "`| **M5 — stage 2:
neighbourhood composition** |`": "`| **M6 — stage 3: building composition** (V02 §8) | M6a the massing, M6b the
composer, rooms rung, rendering and exports, M6c editing, parity and the gate | V02 §8.3's exits; the stage-3 panel
(V02 §7.5) | 15–22.5 pw + 2.25 pw of spikes |`"; a line in the effort table, "stage 3 (V02) | 17.25–24.75 | V02
§8.3"; and the gating sentence, current "`M5 (the stage-2 gate) claim their D-5 verdict only by a rated pass of`" →
"`M5 (the stage-2 gate) and M6 (the stage-3 gate) claim their D-5 verdict only by a rated pass of`". `# Staged by the
owner's roadmap (this document defers nothing)`: current
"`| stage 3 — manor-style building compositions (after stage 2) |`" → its hooks cell gains, at its end, "; designed to build depth in `docs/volumes/V02-buildings.md` (milestone M6,
§16)".

**item 449 — exports.** `### 11.1 Formats`. Current: "`| **JSON schema** | published, versioned (generated from the
`zod` types); entities by id with containment; a `plan` block per building`" → after "a `plan` block per building …"'s
sentence, add "a `massing` block per building and a `composition` block with its state where the `wings` rung is
current or stored (V02 §5.5);". Current (the 3-D row): "`with roof meshes to ridge height, per wing,`" → "`with
roof meshes from the building's roofscape (V02 §5.2) — per wing where stage 3 is not registered —,`", and the export
option `compositions: 'asDrawn' | 'derive' | 'none'` stated there. Current (the CityJSON row): "`` `Building` (LoD1.2 solid
from base to eave; LoD2.2 roof surfaces; ``" → "`` `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces — the
roofscape's facets, with dormers and porches when compositions are exported; ``". The GeoJSON row gains the optional
`wings` layer of V02 §5.5.

**Extended by reconciliation round 1.** The SVG row. Current: "inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each;". New: the same, followed by "with stage 3 registered, at the district band and finer the roofscape's facets in the semantics `sem.building.roof`, `sem.building.roof.dormer`, `sem.building.roof.porch`, `sem.building.roof.tower` and `sem.building.roof.cupola` and its lines in `sem.building.roofline` (V02 §5.5), the map naming each facet's subpath range by its wing address `wing:<building>/<key>`;". Test: T-V2-24 with §11.1's layer-id check.

**item 223 — the stage-3 contract and the admission bounds.** `### 2.6 …`. Current: "`the composed wings equals the
outline's union exactly (integer equality after snapping)`" → "`the composed wings and of the composed towers' ground
rings equals the outline's union exactly (integer equality after snapping)`", with, at the paragraph's end, "Stage 3's
composer composes each wing at exactly its base wing's storeys (V02 §3.6)." Current: "`If it exceeds §12.7's 10 µs
median, `outline()` runs the generator's own massing step`" → "`If the town-wide median exceeds §12.7's 10 µs, or the
composed classes' median exceeds 60 µs or their p99 250 µs (V02 §6.1), the fallbacks of V02 §6.1 (a)–(b) apply
first; if those still miss, `outline()` runs the generator's own massing step`". `### 12.7 Labels, trees, exports
(SCL-8, SCL-10, SCL-14)`. Current: "`a stage-3 generator's `outline()` is admitted at ≤ 10 µs per`" (with its next line) →
"a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median over the town, ≤ 60 µs median and ≤ 250 µs
p99 over its composed classes, and ≤ 12 µs mean (V02 §6.1), and its registration re-declares S11's row of §12.4 by
the measured difference (§2.6, §3.7);".

**item 224 — the entrance hint (from M3a, with item 229).** `### 2.6 …` (Entrances, rule 1). Current: "`Exactly one entrance has role `main`. It
stands on the footprint side that`". New: "`Exactly one entrance has role `main`. Where the building's massing names an
entrance hint (`Building.massing.entrance`, V02 §2.1) it stands on the side that hint names, which faces the plot's
frontage access edge by construction; otherwise it stands on the footprint side that`". The clause applies wherever
`Building.massing.entrance` is set — before M6 only a stepped or oval building's, laid by the base outline builder's
constructions (item 229) — and item 228 and item 230 read it from the same milestone.

**item 303 — S11 and the massing (its hole sentence from M3a, with item 229).** `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11
Site plans and footprints — the plot model`. Current: "`from `outline()` itself — rectangles and L / T compositions as
`rect` wings with per-wing ridge axes (VIS-10), footprint`". New: "`from the registered generator's `outline()` — with
stage 3, V02's massing (§3.5 there), whose baseOutline, template and axisLocked families are the base builder's —
rectangles and L / T compositions as `rect` wings with per-wing ridge axes (VIS-10), footprint`"; three sentences added at
the paragraph's end: "The cluster packer hands each structure to `outline()` as one fixed wing. S11's yard partition
types every hole of a footprint face as a yard part of kind `court`. S11 passes the slot's composition row key and the
plot's field and manifested bands, its layer and the attached structures (item 304) in `BuildingInput`." `### 2.6 …`:
current "`interface BuildingInput { lot: Polygon; access: Segment[];`" → "`interface BuildingInput { lot: Polygon; access:
Segment[]; compositionRow?: string /* stage 3: the slot's CompositionRow key (V02 §3.2) */; bands?: { field: { band:
string; value: number }; manifested: { band: string; value: number } } /* as ClassRules.pick receives them */; layer?:
'surface' | 'underground' /* the plot's layer: II.7.3's sewer-front plots, II.7.5's undercity and item 109 (j) (4)'s cavern
and ruin dwellings are 'underground' (V02 §3.2 step 2's @underground rows); absent: surface */; attached?: { key:
string; count: number }[] /* stage 3: the template's attach-main structures and their drawn counts (item 304) */;`".

*Build note (J-V2.104).* The sentence "S11's yard partition types every hole of a
footprint face as a yard part of kind `court`" is built at **M3a**, with item 229: the base outline builder lays
`massOval`'s arena from M3a and falls to its court-institution construction there, and bars read the arena's floor as a
`court` before M6. The rest of this request is built at M6. From M3a every hole of a footprint face is one `court` yard
part, whatever the designation template's yard rows name (their shares type the plot's other yard parts). A hole in a
base footprint template, such as the ring cloister, whose kind those rows set otherwise before M3a is retyped `court`
once at M3a. That is a declared shift (§13.3) with its diff report. Readers of the typed court from M3a: this volume's
T-V2-42 (the arena's floor); V01's hood-pin sites (V01 §3.8.2 step 1: no pin on an `ovalCourt` floor), with T-V1-26 and
T-V1-54 at M5; and V03's court openings (V03 §3.6 O1 (b)) at M6-P.

**item 499 — the owner's stage-3 panel.** `### 13.6 The owner's side-by-side protocol (D-5)`. Mechanism: one numbered item
added: "Stage 3's gate (M6): twenty pairs against Fantasy Manor and the ladder street, as V02 §7.5 states them,
under this protocol's blind rules and its rule for an unrated panel."

**item 427 — three heights columns on the family-keyed heights row.** `### 10.2 Roster
(data-driven, replaceable; sequential and prefix-stable; our values)`, as V11's item 435 adds `HeightsRow` there.
Current (V11 §2.8's text): "`  key: string; storeyCm: { ground: number; upper: number } /* integer cm */; roofPitch:
number /* ratio */; towerStoreys?: [number, number] /* keeps, church and mage towers */; spireFactor?: number /* spire height
÷ tower height */ }`". New: "`  key: string; storeyCm: { ground: number; upper: number } /* integer cm */; roofPitch: number
/* ratio; the range pitch is roofPitch × ClimateRow.roof.pitch ÷ the temperate-deciduous row's, clamped to [0.3, 1.8]
(V02 §3.5 M11) */; towerStoreys?: [number, number] /* keeps, church and mage towers */; towerStoreyCm?: number /* a
tower storey's height; absent: storeyCm.upper */; spireFactor?: number /* spire height ÷ tower height */; attic: boolean /*
the roof holds a storey of rooms: dormers allowed (V02 §3.7) */; parapetCm: number /* a flat roof's parapet; 0: none
*/ }`", with V02 §3.10.6's values per family. V02 declares no heights row of its own.

**Absorbed (2026-09-29).** This request is absorbed by V11's item 435 (file f item 435, **BASE (M0 (b), V11 C0)**): V11 §2.8's `HeightsRow` already carries `attic`, `parapetCm` and `towerStoreyCm`, so the "current text" quoted above no longer exists in V11 and nothing of this request is applied separately; file f item 427's STAGED (M6) label is withdrawn. The three columns keep this request's id as their name ("item 427's columns") wherever this volume cites them; the pitch rule of its `roofPitch` comment stays V02's M11 (V02 §3.5), never a base comment.

**item 225 — wings named by key under stage 3.** `### 2.6 Buildings, heights and ground datum,
wings, materials, sub-locations, the stage-3 interface`. Current (in `interface Room`): "`wing: number /* index into
Composition.wings; a tower's round room names its ComposedTower by wings.length + the tower's index; the passage room
names the wing that spans it */`". New: "`wing: number /* the key of its base wing (BaseWing.key; item 216), which under
the base outline builder equals the wing's index; a tower's round room names its tower wing's key; the passage room names
the wing that spans it; Composition.wings is looked up by its base key, never by position */`"; and one sentence after the
stage-3 contract paragraph: "Every other wing reference of this section — `Entrance.wing`, a porch through its wing,
`StairCore.wing`, `Chimney.wing`, each entry of `Storey.wings` and `ProgramRoom.wing` — likewise holds a base wing's key,
and every writer keeps `Building.wings` in V02 §2.1's canonical order (towers and turrets by key, then the other wings
by key); the base's keys equal its indices, so nothing changes before stage 3."

**Extended by reconciliation round 1.** Same heading. Current (in `interface StairCore`): "`tower?: number /* index into Composition.towers: a spiral in a round wing */`". New: "`tower?: number /* the key of the tower wing (BaseWing.key) whose round room holds this spiral — the wing its ComposedTower names by base (V02 §2.2); Composition.towers is looked up by that base key, never by position; a composed tower with no base (before stage 3) is named by its index, as before */`"; and the sentence this request adds after the stage-3 contract paragraph names `StairCore.tower` beside `StairCore.wing`. Test: T-V2-34 (a tower removed before the spiral's tower keeps the spiral's tower).

**item 226 — the raised crypt (the revision, V2C-18 (b3); J111).** `### 2.6 …`. Current: "`kind: 'full'|'half'|'walkout'|'crawl'
/* crawl: item 66's requested form — a void under a raised ground storey, reached by a hatch (Basements, below) */`". New:
"`kind: 'full'|'half'|'walkout'|'crawl'|'raised' /* crawl: item 66's requested form — a void under a raised ground storey,
reached by a hatch (Basements, below); raised: the no-refusal crypt ladder's wet-ground form (V02 §3.14.5) — a crypt
storey whose floor lies at max(the lowest terrain sample under its ring, the water table + crypt.freeboardCm), under the ground wings over its ring lifted so their ground storey clears it by crypt.clearCm — for a basement that is only a crypt the wings over the crypt's ring (its seed wings, under which volume V03 §3.7.4 keeps a derived raised crypt), for the ground wings' whole inset that volume V03 §3.7.4 gives a crypt no stair reaches every ground wing over it; a solid tier 0 that holds the crypt inside it keeps its height */`". In the paragraph *Basements*, with
V03's item 238 (the `crypt` column and `Basement.crypt`): the `always`-crypt ladder is "a full crypt; a half-sunk
crypt where the full floor would lie below the water table or the plot is `low`; a `raised` crypt where even a half floor
would lie below it or the plot is `damp` or `flood` — never a refusal", and the lift is written by the basement step as the `Heights.baseCm` of the ground wings over the basement's ring (V02 §3.14.5), with steps at the crypt ring's edge. `### 5.3 The invariant suite, by
scope (SCL-1)`. Current: "`a basement other than a crawl space never under the flood band or below the water table
(§2.6's terrain gate, item 29)`". New: "`a basement other than a crawl space or a raised crypt never under the flood band or
below the water table (§2.6's terrain gate, item 29; a raised crypt's floor lies above the water table by
crypt.freeboardCm, V02 §3.14.5)`". Where V03's item 238 already carries this text verbatim (its pre-decided
fallback), this request is that one.

**Extended by reconciliation round 1 (J-V2.91, J-V2.92).** Same heading. (a) *Heights and the ground datum*, current: "— over a requested crawl space, also half the class's cellar depth (Basements, below) —". New: "— over a requested crawl space, and over the ring of a `half` basement, also half the class's cellar depth (Basements, below); the terrain gate reads the datum without this raise —" (applied after item 370 and item 231, which rewrite the sentence before it). (b) *Basements*, current: "its floor `baseCm` less the depth per storey)". New: "its floor `baseCm` less the depth per storey — a `half` basement raises the ground wings standing over its ring by `cellar.depthCm ÷ 2` above the datum `deriveBase` gives without the raise, as the crawl form raises its storey, written by the basement step as those wings' `Heights.baseCm` (through the building datum pass for a building with a wing standing on another, whose ground-wing pass lists the raise) and kept by every later re-basing path while the basement stays `half`, so its floor lies at the datum less half the depth, the floor the gate tests; a basement that is only a crypt raises the wings over the crypt's ring — its seed wings where volume V03 §3.7.4 keeps a derived half-sunk crypt under them, a raised choir over it)". (c) *Basements*, with V03's item 238: the crypt's seed wings are V02's `cryptSeedWings(b)` (V02 §3.14.5 (c), exported by `@plat/plots`), which the crypt ring reads (volume V03 §3.7.4), the lift and the half raise then acting on the wings over the basement's ring. **Milestone:** (a) and (b) are BASE with §2.6's basement gate and are applied before the milestone that builds it (file f
item 226's M6-U label covers the crypt parts (c) and the raised form only). **Declared shift:** applied before the base
milestone that builds §2.6's basement gate, no document shifts; applied after it, every building with a half basement stands `cellar.depthCm ÷ 2` higher from the milestone that lands it — one declared shift (§13.3) with its diff report. Test: T-V2-52; T-V2-36's half-sunk crypt.

**item 304 — attached structures.** `### 4.7 S9 Corridors · S10a Block allocation · S10
Plots · S10b Placement · S11 Site plans and footprints — the plot model`. Current (the arrangement table's compound row):
"`placed by a small greedy packer on the plot's OBB grid around a court`". New: "`placed by a small greedy packer on the
plot's OBB grid around a court — except a structure whose composition role key is attach-main (V02 §3.10.4: a mill's
wheel or sails, a church's tower and porch, a court institution's ranges), which takes no slot of its own and is handed to
the main slot's outline() with its drawn count (BuildingInput.attached), whose massing lays it as part of the main
building (V02 §3.5 M8b)`". The structure counts are drawn as today; only the packing changes.

**item 402 — the `fantasyShapes` control.** `### 7.8 Controls: monotone, continuous, documented;
the control-surface budget (O16 f, R15)`. Current: "`* **Monotone and continuous, stated statistically.**`". New: insert
before it the bullet "* **Stage 3's model control (V02 §4.4).** `fantasyShapes` (off / on): output metric the share of
fantasy families among composed buildings; consuming stage S11; locality *re-derive from S11* (the fate report first);
discrete; documentation anchor V02 §3.3; in the advanced panel, outside the basic panel's count."

**item 227 — stacked and solid wings (item 110 (c); item 110 fold).** `### 2.6 Buildings, heights and ground datum,
wings, materials, sub-locations, the stage-3 interface`. Current (the last line of `BaseWing`, as item 216 quotes it):
"`  heights: Heights; roof: RoofSpec }`". New: item 216's new text with, before its closing brace, "`; on?: number /* the
key of the wing this wing stands on — its floor is that wing's deck level (V02 §2.6): a stepped building's upper
tiers, its shrine and its upper stairs; absent: the wing stands on the ground */; solid?: true /* a solid mass with no
interior: floors 0, its eave its top; no storey, room or capacity (V02 §2.6) */`", and `WingRole` gains `tier`,
`shrine` and `stair` (V02 §2.1).

**item 370 — the datum of a stacked wing and of a deck building (item 110 (c), (d); item 110 fold).** Same heading,
paragraph *Heights and the ground datum*. Current: "a wing's `baseCm` from the terrain sampler (bilinear on the refined
2.5 m raster at the wing's vertices and centroid) is `max(samples) + plinthCm`". New: "a wing that stands on another
(`BaseWing.on`, V02 §2.6) has `baseCm` = that wing's deck level — its `baseCm + eaveCm`, less its family's
`parapetCm` under a flat roof — with no plinth and no skirt, computed after the wing it stands on (in stack order, which a key order need not be); a wing
of a building whose plot lies on a deck built over water (item 110 (d); `BuildingInput.deck` with `surfaceCm` set — a quay
built on the bank is ground, V02 §3.16 (1)) has `baseCm` = the deck's surface height
(`Bridge.deckCm`, or the pier's, mole's or quay's deck height, §4.8), with no plinth and no skirt, and the buildings on a
deck are re-based in the step that re-bases the deck, their plots in its effective scope; every other wing's `baseCm`
is `max(samples) + plinthCm`, the samples taken by `levelledGroundCm(doc, key, p)` (V05's item 309: the platform
datum of the levelled plot, block or ward holding `p` on the arena `key` its plot lies on, else the unlevelled raster
there, bilinear) at the wing's vertices and centroid; every other ground sample this paragraph and *Basements* read — the
fall under the footprint (the skirt facts the basement gate reads) and the lowest sample under a raised crypt's ring — is
the same reader's" (reconciliation round 3, S23R2-01: levelling is a platform datum never written to the raster, so the
datum reads it through item 309's one reader and a terraced house stands on its own platform, the step V01's
`stepProfile` draws; applied after item 309's ground part, file f item 309). Current (in `interface Building`): "`heights: Heights /* the building's max over its wings */`". New: "`heights:
Heights /* the building's max over its wings; with a wing standing on another, the stack's envelope measured from its
least ground wing's baseCm, floors = 1 + the highest storey level any wing reaches (V02 §3.15.2) */`".
**Extended by the second revision (J-V2.81) — one building-level datum pass.** Same paragraph, after the
new text above: "For a building with a wing that stands on another, the datum is computed by **one building-level pass,
`rebaseStack`** (V02 §2.6, §3.15.2): its ground wings by the rule above, then each wing standing on another in stack
order from the deck level of its support, then each stair's rise re-set to its terrace-to-terrace difference, then the
building's heights by the envelope; every path that re-bases any wing of such a building calls this pass for the whole
building, never the per-wing step." `### 7.3 …` (a) 4, current: "every entity on a changed sample is re-based by §2.6's
per-entity datum step (the function S11 and S7 call)". New: "… (the function S11 and S7 call), and a building with a wing
standing on another (V02) is re-based whole by §2.6's building datum pass when any of its ground wings is on a changed
sample". `### 7.4 …`, current: "Every entity whose footprint, trace, deck or pier the move carried is re-based by §2.6's
datum step on the ground it now stands on". New: "… by §2.6's datum step on the ground it now stands on (a building with a
wing standing on another by the building datum pass, whole)". `### 2.6 …`, the wing-carrying rule's rule (2), current:
"each composed wing and tower is then re-based by `deriveBase` on the ground it now stands on, as the base wings are
(§7.4)." New: "… as the base wings are (§7.4); a building with a wing standing on another is re-based by the building datum
pass after the carry." And in *Heights and the ground datum*: "a user's edit of the `baseCm` of a wing standing on another
is applied as the same change to the height of the wing it stands on (V02 §4.6); a user-edited `baseCm` of a ground
wing is kept (J-DET-24) and carries the wings standing on it".

**item 371 — the storeys a wing reaches (item 110 (c); item 110 fold).** Same heading, the interior ladder's *One
capacity function*. Current: "`A(s)` the exact integer twice-area (`area2`, §3.2 (6)) of the union of the extents of the
building's base wings (`Building.wings`, with their `spans`) that reach storey `s`". New: the same, followed by "— a wing
reaches the storeys V02's `storeyRange` gives: a solid wing (`BaseWing.solid`) none, a wing standing on another
from the storey above the one it stands on, every other wing `[0, floors − 1]` —". Current: "at the ground the footprint
face's `area2`". New: "at the ground the footprint face's `area2` where every ground wing reaches storey 0, else (a
stepped building, V02 §3.15) the `area2` of the union of the extents that reach it". Current (in `interface
Storey`): "`wings: number[] /* the wings whose floors — or the basement ring — reach this level */`". New: "`wings:
number[] /* the wings whose floors — or the basement ring — reach this level, by V02's storeyRange (a solid wing
none; a stacked wing from the storey above the one it stands on) */`". **Extended by the second revision:** in
`interface Storey`, current "`level: number /* −k … −1 the basement's storeys, 0 the ground, 1 … n above */`". New: "`level:
number /* −k … −1 the basement's storeys; 0 the lowest storeyed level — the ground, except on a stack whose ground wings
are solid (V02's storeyRange: a solid pyramid's shrine is level 0); 1 … n above */`". Paragraph *Basements*, current: "The basement lies
inside the ground storey's wings and smaller than their union". New: "The basement lies inside the ground wings (those
standing on no other wing, `BaseWing.on` absent — for a stepped building its tier 0, whatever storeys they reach) and
smaller than their union"; and, in the same paragraph, the sentence "`Basement.access`, derived with it: `external` for a
walk-out, else the class's programme row's `basementAccess`" reads "… `external` for a walk-out, or where no wing standing on no other wing is storeyed (volume V03 §3.3's
`ground(b)` absent; V02's `storeyRange` gives each such wing no storey) — its door then at V03's
`basementDoor(b)` (V03 §3.7.1: a retaining wall's side first, else the tomb door), else the class's programme row's
`basementAccess`" (the condition's words as reconciliation round 4 gives them, S23R3-03: V03's `ground(b)`, never
"storey 0", which names the lowest storeyed level; the door's words as seam S23R2-12 gives them, since `basementDoor(b)`'s
rule 1 takes a retaining wall's side before the tomb door for every `external` basement, a storey-less stack's included), and `### 10.2
…`'s `basementAccess` comment "never external, which only a walk-out's fall derives" reads "never external, which only a
walk-out's fall or a building with no storeyed ground wing (§2.6) derives" (reconciliation round 3, S23R2-03: V03's
J-V3.88 condition — a storeyed ground wing beside a solid one, an arena's façade ring or a stepped temple's annex, joins
the basement by its core or the trapdoor fallback, never outside; V02 §3.15.3).

**Extended by reconciliation round 4 (J-V2.99).** The widened `external` reaches every base text that still
reads it as a walk-out, and every text that places or checks the basement by "the ground storey" — which, on a stack whose
ground wings are all solid, names no storey (`Storey.level` 0 is then the shrine's floor, above). §2.6's plan rung step 3
(where the outside door opens) and §13.2's T28-3 are V03's item 578, not this request's. (a) `### 13.2
Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`, T29-4. Current: "the stair core, a trapdoor
or, for a walk-out, an outside stair". New: "the stair core, a trapdoor or, for an `external` access (a walk-out, or a
building with no storeyed ground wing), an outside stair". (b) `# Judgment calls ("chose X over Y because Z"; each
vetoable)`, J-A29.25. Current: "`external` for a walk-out, else the programme row's `basementAccess` at `builtBand`". New:
"`external` for a walk-out or where no ground wing is storeyed (§2.6 *Basements*; its door volume V03 §3.7.1's), else the
programme row's `basementAccess` at `builtBand`". In the same row, current: "a walk-out's outside stair a door in the
lowest of the basement ring's sides at least two wing-local modules long". New: "an `external` basement's outside stair a
door at the point §2.6's plan rung step 3 gives (volume V03 §3.7.1)". (c) `### 2.6 …`, the plan rung's step 5
(*Circulation and openings*). Current: "a walk-out basement's outside door, where step 3 opens one (`external`), the root
of the basement's storeys". New: "an `external` basement's outside door (a walk-out's, or that of a building with
no storeyed ground wing — both at volume V03 §3.7.1's `basementDoor(b)`), where step 3 opens one, the root of the basement's
storeys" (seam S23R2-12, the same-shape sweep: `basementDoor(b)` places a storey-less building's door at a retaining wall's
side before the tomb door). (d) The basement's place, read as
*Basements* now states it — inside the ground wings, those standing on no other wing, whatever storeys they reach. `### 2.6
…`, `interface Basement`, current: "ring: Polygon /* inside the ground storey's wings and smaller than their union"; new:
"ring: Polygon /* inside the ground wings (those standing on no other wing; Basements, below) and smaller than their
union". `### 2.6 …`, the terrain gate's list of §5.3's rows, current: "every basement inside its ground-storey footprint and
smaller than it"; new: "every basement inside the footprint of its ground wings and smaller than it". `### 5.3 The
invariant suite, by scope (SCL-1)`, current: "a basement lies inside and is smaller than its ground storey's wings"; new:
"a basement lies inside and is smaller than its ground wings (those standing on no other wing, §2.6 *Basements*)". `### 7.4
Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`, current: "The check requires
the basement's ring within the wings of its ground storey"; new: "The check requires the basement's ring within its ground
wings (§2.6 *Basements*)". `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`, the
`cellar` comments, current: "a full cellar's floor below the ground storey's baseCm"; new: "a full cellar's floor below
the baseCm of the ground wing above it (§2.6 *Basements*)"; and current: "the basement ring's inset inside the
ground-storey wings"; new: "the basement ring's inset inside the ground wings (§2.6 *Basements*)". On a building none of
whose ground wings is solid, the ground wings are the ground storey's, so every text in (d) reads as before and no
document shifts. Every current text above is found once in `docs/ARCHITECTURE.md` (md5 01fea21f…). Test: V02's
T-V2-44 (*Basement access*, T29-4 on both temples).

**item 305 — the deck input; no cellar on a deck (item 110 (d); item 110 fold).** Same heading. Current: "`interface
BuildingInput { lot: Polygon; access: Segment[];`" (as item 303 amends it). New: item 303's text with, after its
`attached?` field, "`deck?: DeckContext /* item 110 (d): the plot's deck — its host, kind and surface height, and whether
the building is a placed landmark (V02 §2.6); absent off a deck */;`". Paragraph *Basements*, current: "Against it:
**no cellar** where the plot's `terrainClass` is `damp` or `flood`". New: "Against it: **no cellar** on a deck plot built
over water (item 110 (d); V02 §3.16 — a quay built on the bank, `DeckContext.surfaceCm` null, is ground and takes this
gate like any plot), nor where the plot's `terrainClass` is `damp` or `flood`"; and in *A requested basement*, after "(4)
otherwise a refusal naming the gate each form failed", "— on a deck plot over water every form fails at once and the
request bends (item 101 R2) to the same request on the nearest building on the ground of its plot group, else of its block,
else the nearest building on the ground (V03 §4.2), named (`bend.deck.basement`, V02 §1b's bend list)" (second
revision, V2C-66 (1); reconciled with S23-17: a bend, not the ladder's refusal rung; file f item 305; its third rung, V03's,
added by reconciliation round 2, S23R1-14, so a deck block with no ground building — a bridge's shop row — has a target). `### 4.7 …`: item 303's sentence "S11 passes the slot's composition row key and the plot's field and manifested
bands, its layer and the attached structures (item 304) in `BuildingInput`" gains ", and on a deck plot its
`DeckContext`".

**item 333 — stacked wings in the invariants and the carry check (item 110 (c); item 110 fold).** `### 5.3 The
invariant suite, by scope (SCL-1)`: item 332's row "stage 3: every wing inside its plot; the non-tower wings of a
building tile; …" reads "… the ground wings that are not towers tile, and every wing that stands on another lies inside
that wing's ring, the wings standing on one wing pairwise disjoint (V02 §3.15.1 ST6); …". `### 2.6 …`, the wing-carrying rule's rule 4: current "The basement ring is
checked in the same pass — simple, counter-clockwise and inside the footprint face (exact `orient2d` tests):". New:
"Every ring of a wing that stands on another (`BaseWing.on`, V02) is checked in the same pass inside the ring of the
wing it stands on (exact `orient2d` tests), and the wings standing on one wing are pairwise interior-disjoint (exact
`orient2d` tests; second revision, V2C-54); a failure halves a warp's or a `moveVertex`'s step, and after any other batch
the building is re-derived by S11 (F-REDERIVE, reported). The basement ring is checked in the same pass — simple,
counter-clockwise and inside the footprint face (exact `orient2d` tests):".

**item 419 — the stack order in the per-wing constructions (item 110 (c); item 110 fold).** `### 8.6 Stage-2 render
tier and stage-3 LOD`. Current: "Roof construction (§8.2) runs per stored wing (VIS-10) by its `BaseWing.kind` (§2.6):".
New: after item 406's prepended sentence, one more: "A wing that stands on another (`BaseWing.on`) is drawn after it,
its ring clipping the lower wing's roof, and a solid stair's `shed` facet carries tread lines by V02's `stairTreads` (V02 §2.6, §5.6; reconciliation
round 1, S23-07); the
per-wing constructions draw a building's wings in that stack order."

**item 525 — the effort with the item 110 fold.** `## §16 Build plan —
calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`. Mechanism: in item 524's M6
row, "15–22.5 pw + 2.25 pw of spikes" reads "18.25–27.5 pw + 2.25 pw of spikes"; its effort line reads "stage 3 (V02,
with the item 110 fold, its second revision and reconciliation round 1) | 22.5–32.5 | V02 §8.3, §8.5" (restated by
reconciliation round 1: + 0.25–0.5 pw inside M6, V02 §8.3); and §16's M3a row gains "V02's item-110
building part — `massStepped` and the tier construction, `massOval`, stacked and solid wings, the building datum pass and
deck buildings in the base outline builder (V02 §8.5): 2–2.75 pw".

**item 228 — the main door on the part of its side the footprint keeps.** `### 2.6 …`, *Entrances* rule
1 as item 224 amends it: "Where the building's massing names an entrance hint (`Building.massing.entrance`, V02
§2.1) it stands on the side that hint names" reads "… it stands on the part of the side that hint names which lies on
the footprint's boundary — a wing abutting that side (a stair, a church porch) covers the rest (V02 §3.15.1 ST7) —;
`deriveEntrances` keeps its drawn position where it already lies on that free part and moves a covered one to the nearest
free point, with no second draw" (second revision, V2C-72: so every door not under an abutting wing keeps its bytes, and a
forecourt `U`'s covered door is T-V2-50's one reported difference).

**item 229 — the base outline builder's stepped and deck constructions, from M3a (item 110 (c), (d), (e); item 110
fold).** `### 2.6 …`, *The base outline builder*. Current: "and — for institution classes (keep, temple, church, manor,
hall, farmstead) — two further constructions behind the same `outline()`:". New: "and — for institution classes (keep,
temple, church, manor, hall, farmstead) — two further constructions behind the same `outline()`, and from M3a (item 110)
two more: the **stacked-tier construction** `layTiers` (V02 §3.15.1, exported by `@plat/plots`) for a class whose
designation template's `composition` names a `stepped` row of `composition.json`, drawing on the building's `massing`
concern with creation indices 8–9 so that stage 3's massing reproduces it byte for byte, and on a deck plot a rectangle
(or the row's quad) inside V02 §3.16's deck budget with its storey cap and the deck's datum; `composition.json` ships
at M3a with those rows and constants (V02 §8.5), and the `massing` concern of item 341 is appended to the registry
then, with the next append-only u16 id:" — which brings item 222's `shed` roof kind and item 227's fields to M3a with
it (item 216's `role` and `key` are there from M1). **Restated by the second revision (J-V2.80, J-V2.84):**
the stacked-tier construction the base outline builder calls is **`massStepped`** (V02 §3.15.1: the frame, `slotBand`,
ST0, `drawTiers` on the `massing` concern's creation indices 8–9, the pure `layTiers`, ST8, the attempts and the fallbacks),
the one function stage 3's massing also calls, with **`stairTreads`** (V02 §2.6; the per-wing constructions' treads,
item 419; reconciliation round 1, S23-07), and beside it **`massOval`** for a class whose composition row names
`ovalCourt` (the second fixture's arena); the request also brings **item 217's `MassingRef`** for a stepped or oval
building — its `family`, `row`, `grammar`, `entrance`, `segments` and `stack` — with V02 §2.6's stack migration row,
and `DriftBounds.families`' M3a list admits `stepped`. *Reconciliation round 1:* the request also brings
**item 426's `composition?`** on the designation template and its structures (written by V11's specialisation
replacement, item 259; read by `massStepped`'s and `massOval`'s gates through V02 §3.2's chain) and **item 224's
hint clause** of *Entrances* rule 1, which item 228 and item 230 amend and keep for M3a's stepped and oval buildings. *Reconciliation round 2:* the request also brings
**item 303's hole sentence** (S11's yard partition types every hole of a footprint face as a `court` yard part, the
`massOval` arena's floor among them), the rest of item 303 staying at M6 (its build note).

**item 318 — a stack's heights under Works (J-V2.82).** `### 4.11 …`, step 8 *What reads the
stage*. Current: "WALLS RISING raises the eave storey by storey (the eave × the storeys reached ÷ the floors)". New: the same,
followed by: "— for a building with a solid wing or a wing standing on another (V02 §3.15) **in stack order**: the
building's courses are counted along each chain from the ground (a storeyed wing's floors; a solid wing
`⌈eaveCm ÷ storeyCm.upper⌉` courses, never a division by its zero floors); the courses reached advance by this step's rule
over the tallest chain's count; a wing's height at the stage is its `eaveCm ×` the courses it has reached `÷` its courses,
measured from its stored `baseCm`, and a wing is neither drawn nor cast until the wing it stands on has reached its eave; a
stair rises with the tier whose top it reaches (its rise × that tier's reached share); the shrine and a roofed top take
their roofs from ROOF FRAMED as any roof does, and a flat terrace has no roof stage; a demolition lowers in reverse stack
order". §8.4's casters at a stage and §11.1's 3-D export read these heights; V06's Works (X23) raise tiers this way.

**item 230 — a solid stack's entrance and the plan's root (J-V2.83).** `### 2.6 …`, *Entrances*
rule 5. Current: "5. **The plan opens a door at every entrance** and roots its circulation at the main one;". New: the same,
followed by: "— except a building with no storeyed wing standing on the ground (a solid stack, V02 §3.15): its main
entrance is the foot of its stair chain (rule 1 unchanged, the stair's outer side on the footprint and facing the
frontage); the plan opens no door there and roots its circulation at the landing door of the first storeyed wing the chain
reaches (V02's `landingSide`); a building with no storeyed wing at all (a solid monument, a sealed stack whose every
wing is solid) has no plan above the ground — no level at or above it and no room there; its basement storeys and the heads
of its hosted accesses are planned as V03 §3.1 states — and its main entrance opens nothing; a sealed stack (V02's
stair form `none`) that carries a storeyed tier or shrine keeps that wing's plan, reached by nothing (volume V03 §3.3 S6
(e), `W_TIER_UNREACHED`), and its main entrance, on tier 0's front side, opens nothing;" (seam S23R2-11; seam S23R3-14:
a sealed temple with its shrine is the common sealed stack, and V03 plans the shrine and flags it). §5.3's entrance row is unchanged (exactly one main entrance, facing its street).

**item 231 — the wall-side datum sample (second revision, V2C-57; J-V2.72 amended; reconciliation round 3,
S23R2-01).** `### 2.6 …`, *Heights and the ground datum*, applied with item 110 (a)'s coherence pass. Current (as
item 370 rewrites the sentence, its last clause): "every other wing's `baseCm` is `max(samples) + plinthCm`, the samples
taken by `levelledGroundCm(doc, key, p)` … at the wing's vertices and centroid". New, after "at the wing's vertices and
centroid": "— a sample point within `terrace.wallBandCm` (250 cm, one refined raster cell; V02 §3.10.9) of a
`RetainingWall` chain (item 110 (a)) is replaced by the point moved along the wall's normal, toward the side that holds the
wing's centroid, until it lies `terrace.wallBandCm` from the wall's line, so `levelledGroundCm` reads the wing's own
terrace, never the platform across the wall". Test: V02's T-V2-51. (Reconciliation round 3, S23R2-01: the samples are
item 370's `levelledGroundCm` samples; a vertex on or beside the wall's line would otherwise read the neighbouring
platform, or, off every platform, the raster's slope across the step.)

## 11 Owner questions

Only one question in this volume is the owner's by the rule (money, licence, a new capability across the SettlementForge
boundary, product order); every other choice is a vetoable decision of V02 §9.

**Q-V2-1 — Should SettlementForge be able to prescribe a building's shape?** Today the dossier says that an institution
exists and what it is (item 20); its building's plan — a courtyard, an H, towers — is the map's own construction (item
20 (h)), and a map user can already fix a layout with an assignment's drift bounds (`DriftBounds.families`, V02 §2.1) or
reshape it with the building tool (V02 §4). Letting SettlementForge send a shape (for example "a manor with two towers round
a courtyard") would be a new capability across the SettlementForge boundary: a new typed slice in the dossier port and a
dossier-owned shape the map could no longer change. **Recommendation: not now.** Keep shapes map-side; the port reads no
shape field; if SettlementForge later describes buildings, add one optional typed slice mapped onto
`DriftBounds.families` and the tower count, with the dossier-owned refusal for map edits of it (§7.7 item 11). Nothing in
this volume waits on the answer.

The revision of 2026-09-28 raised no new owner question: the critique's 46 findings are design repairs inside this
volume, its base change requests and cross-volume items; the owner's rules they apply (items 102–109, J111) are already
ruled.

**The item 110 fold raised no owner question.** Item 110 is ruled (the owner's ~23:30 "they go in" and the ~23:40
raised-ways revision); its choices here are the vetoable decisions J-V2.58 – J-V2.78.

**The second revision raised no owner question.** Its 27 findings apply rules the owner has already made — item 101 R2
("refuses only what item 20 forbids … and what a lock protects"), items 20 and 22 (the dossier's crypt binding), item 110
(c)–(e) and the realism tiebreaker — and its choices are the vetoable decisions J-V2.79 – J-V2.87. The one choice the owner
sees directly, the stepped temple's summit standing 2.4–4.4 m behind the centre (J-V2.61), is put to his panel (V02 §7.5 (3))
rather than asked in advance, because the construction is reversible toward stairs cut into the tiers if he vetoes it.

**Reconciliation round 1 raised no owner question.** Its 21 seam issues and the V02 one-liners of other owners' issues are
design repairs between volumes; its choices are the vetoable decisions J-V2.88 – J-V2.95 (and the amendments to J-V2.32 and
J-V2.52).

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (an executed measurement or a quotation verified at source):
* Every base fact this volume builds on, read whole in `docs/ARCHITECTURE.md` as it stood on 2026-09-28 after
  `amendments-c/closing LANDED` and `handfix-c/apply LANDED` (docs/lane-events.log): §2.5–§2.9, §3.4, §4.1, §4.7 S11 with
  its mutator, clusters, class mix and concealed institutions, §5.2, §6.1, §6.3, §7.1–§7.6, §8.2, §8.4–§8.6, §8.10, §10.2,
  §11.1, §12.7–§12.8, §13.2, §14, §16 and the staged table.
* Fantasy Manor's five layout families at equal odds, one polyline and one wing width as its whole input, no plot, no
  metric scale, no entrance guarantee — item 59's evidence gate (Fable, 2026-09-27: CONFIRMED on a re-executed replay) and
  `research/findings/manor.md` §2, §3.1 (Fable B14, CORRECTED where stated).
* The measured element counts used as parity targets (V02 §7.4): 41 buildings of build 890 —
  `captures/manor/README-frequencies.md` §3–§4 (Fable B15: CONFIRMED by re-running its classifier).
* The restated reference model's cost (≈ 0.08 ms per building warm) that gives V02 §6.2's `compose()` bound its headroom —
  §12.7, released by Fable's evidence gate as a restatement measurement.
* NG's short-axis ridge share (≈ 36 %) as the base cites it (§2.6).

**PLAUSIBLE** (reasoning from that evidence, until measured):
* Every mechanism, constant and default row of this volume — the families' mapping to historical plan types, the wing
  widths, lengths, rates and chances of V02 §3.10, the bay rhythm, the porch sizes, the tower rules — is our own design,
  PLAUSIBLE until SP-V2-1 (cost and fit on real plots), SP-V2-2 (roofscape robustness), SP-V2-3 (the Fantasy Manor
  calibration), M6's exits and the owner's panel measure it. The historical readings (open-hall and H-plan houses, rear
  ranges on burgage plots, galleried courtyard inns, gate halls) are general architectural history, not sourced in this
  repository's research.
* Every budget and estimate of V02 §6 (operation counts on the reference machine) and the effort of V02 §8 (17.25–24.75 pw
  before the item 110 fold, 20.5–29.5 pw with it).
* That the default rows produce the owner's "giant manor to small hovel" ladder to his eye — the panel of V02 §7.5 decides.

**The revision of 2026-09-28 (against `docs/volumes/critique/V02.md`).**
*CONFIRMED (executed in this revision):*
* V11's 32 template families and their arrangements, main slots and structure names, read at V11 §3.6.1; every class's
  family counted from V11's class tables (165 table rows: shopfront 25, hall 18, workshop-row 14, court-institution 13, …;
  three classes with no building family — `market`, `fair_ground`, `druid_grove`); V11 §2.8's `HeightsRow` and
  `TemplateFamilyRow` fields and §3.6.4's heights, including the tower-storey heights its typed row lacks; V11 §3.13's
  generic classes carry a template family; V07 §2.4's 25 village classes and their arrangements.
* Item 109 (j) and (k) as revised ~20:05 (J111), read in `docs/AMENDMENTS-2026-09-28g.md`; critique-V3's V3C-61 hand-off
  (the crypt as `Basement.crypt`, item 238) and critique-V4's C4-52 dig draw, read at source.
* Every BCR "current" quotation of V02 §10 found once in `docs/ARCHITECTURE.md` after whitespace normalisation (42
  quotations; item 216's twice-occurring line is disambiguated by its "last line of `BaseWing`"; item 427's quotation is
  V11's text, found once there).
* `doc_checks.py` on this volume: C1 0 and C2 0 (no reference identifier or colour); C4 and S1 findings reworded to 0;
  the S2 hits are `V02 §n` and `V11 §n` pointers into the volumes (the reference convention of this file's header), the
  same pattern as the landed volume's 18.
* Every `J-V2.n` cited is defined (J-V2.1 – J-V2.57), every `T-V2-n` cited is defined (T-V2-1 – T-V2-43), and every
  `BCR-V2-n` cited exists (item 216 – item 402).

*PLAUSIBLE (reasoning, until measured):*
* The least-footprint formulas of M3 and the manor override's sizes (a rich `rectCourt` at `w₀` 6 m holds ≈ 360 m², at
  7.5 m ≈ 495 m²) — measured by T-V2-30 on B-MASS against the compiled V11 templates in the PR tier.
* Every new default: the family, override and role rows at four anchors, `sunBias` 0.7, `crypt.clearCm` 250 cm, `crypt.freeboardCm` 30 cm, `walkStop` 0.12, `domeRise` 1.0, `axisSlope` 3 %, the cupola
  and west-tower chances — own, calibratable, each with its stated fallback (`sizeBandLo`/`sizeBandHi` 0.7 / 1.45 are not among
  them: fixed mirrors of V11 §3.6.1's derivation ratios; reconciliation round 1, SCC-R0C-3).
* The METROPOLIS core's ≤ 60 buildings per neighbourhood-band tile (V02 §6.2), measured at M6b.
* The historical readings behind the new rules (courts turned to the south, raised choirs over crypts on wet ground,
  longhouses down the slope, mill wheels on the race, polygonal chapter houses, bottle kilns) — general architectural
  history, not corpus-witnessed.

**The item 110 fold of 2026-09-28.**
*CONFIRMED (read or executed in this fold):*
* Item 110 (a)–(f), with (b)'s sources as revised ~23:40 ("i think raised ways for cities is fair for the genertor to
  generate adn then a user can decide to add or remove"), read at source: `docs/AMENDMENTS-2026-09-28g.md` item 110.
* The base facts the fold builds on, read at source in `docs/ARCHITECTURE.md`: §2.6's heights above `baseCm`,
  `deriveBase`'s plinth and skirt, the wing-carrying rule's tiers (ii) and (iii) and rule 4's check, the clip order, the
  capacity's storey extents, `Storey.wings`, the basement gate and the requested basement, `BuildingInput`, the base
  outline builder's constructions; §2.7's `Bridge.deckCm`; §4.8's piers', moles' and quays' deck heights; §8.4's casters
  from `baseCm`. V11's `toll_house` (watch-house family), bridge `chapel` and `watchtower` (tower family) rows.
* Every "current" quotation of item 227 – item 229 found in `docs/ARCHITECTURE.md` once after whitespace normalisation
  (item 227's line twice, disambiguated as item 216's "last line of `BaseWing`"), and the V02-internal quotations of
  item 305, -35, -37 and -38 found in this volume's item 332, -20, -23 and -24 (receipt:
  `scratchpad/volumes/v2-110/quote-check.txt`).
* The other lanes' item-110 notes of 23:09 – 23:30 in `docs/lane-events.log` (V01, V03, V04, V05, V06, V07, V08, V09, V10,
  V11, V12): the tier record, the deck row and the building parts they wait on are answered here (V02 §2.6, §3.15, §3.16)
  and their volumes' parts listed as X16 – X26.

*PLAUSIBLE (reasoning, until measured):*
* Every tier cell, `@deck` row and constant of the fold (own, calibratable, each with its fallback), the budgets of V2
  §6.5 and the effort of V02 §8.5 (3.25–4.75 pw).
* That stepped temples, terraced palaces and tiered towers read rightly to the owner's eye — the owner's panel (V02 §7.5)
  and the second known-city fixture decide. The historical readings (a stepped pyramid's axial stair and shrine, a
  terraced palace's flights along its faces, a pagoda's pent skirts, bridge houses of one or two storeys) are general
  architectural history, not corpus-witnessed.

**The second revision of 2026-09-29 (against `docs/volumes/critique/V02.md` §11).**
*CONFIRMED (read or executed in this revision):*
* Item 101 R2's wording, read at source (`docs/AMENDMENTS-2026-09-27e.md`): "refuses only what item 20 forbids (dossier
  facts) and what a lock protects"; every refusal of V02 §4.2, §4.3 and §4.6 enumerated by a grep of this file (the five the
  critique named, its two, and four more) and turned into a named bend.
* Every new "current" quotation of this revision found once in `docs/ARCHITECTURE.md` (md5 01fea21f…) after whitespace
  normalisation: §7.3 (a) 4's per-entity re-basing, §7.4's carried re-basing, the carry's rule (2), `Storey.level`'s
  comment, §4.11 step 8's `heightsAt` sentence, *Entrances* rule 5 and the datum sentence item 231 extends.
* The stepped rows' arithmetic, executed: `scratchpad/volumes/revise-v2b/stepped_receipt.py` → `.out` — ST0's least
  `Wmin × Dmin` per row and anchor, the median stacks (their own aspects .70–.78 for the axial rows, 1.2–1.7 for the palace;
  the temple's summit offset 2.4 / 3.6 / 3.3 / 4.4 m at grade 1.1), the tiered tower's median stacks inside the `tower`
  budget at every anchor (21 / 32 / 40 / 61 m² against 34 / 42 / 60 / 85), and the Monte-Carlo `tiersTruncated` (N = 4 000
  per anchor) on precinct hints sized for the 90th-percentile stack: 14–27 % with drawn aspects, 1.0–7.6 % with the derived
  aspect and the final cells (V02 §3.10.3). This is the closed-form model of ST0–ST3 and ST8 in a script, not the built
  code.
* `doc_checks.py` on this volume after the revision: C1 0, C2 0, C4 0, S1 0 (as before); C3's 75 new three-grams are
  generic prose and number runs (none a reference identifier or grammar), S2's new hits V2-local `§3.1x` pointers, the
  same patterns as before the revision (receipts `scratchpad/volumes/revise-v2b/doc_checks_before.out`, `…_after.out`).
* Every `J-V2.n` cited is defined (J-V2.1 – J-V2.87), every `T-V2-n` (T-V2-1 – T-V2-51), every `BCR-V2-n` (item 216 –
  item 231) and every `Xn` (X1 – X29).
* V03's second round (in progress, md5 43daab08…) designs against the numbers this revision keeps (item 230,
  item 231, J-V2.85, the form `none`, `ovalCourt`, `Chimney.levels`' top), read at its lines 162–192.
* V11's `arena` (σ 10; since V11's 35 template families its own family `arena`, footprint 1 500 – 6 000 m² at p50
  and plot "the claim's" until SCC-11 lands — V11 §3.6.1 read at source 2026-09-29), `great_temple` (`cathedral`), the
  `burial-ground` and `fort` families with their structures and role shares (V11 §3.6.1, §3.6.5), the three heights columns
  written in V11 §3.6.4, the `manor` override 420 / 650 m² (J-V11.39), the `DigRule` rows (V11 §3.23.7) and the stepped
  specialisations with the `siting.declared` `use:` cell `specialisation` (V11 §3.24.3, §4.2), read at source.
* Reconciliation round 1's base quotations — §2.8's `inputs` comment and `stale` sentence, §4.1's stale list, §8.2's
  `hatched` district cell, II.4's *Render tier*, §11.1's SVG grouping sentence, `StairCore.tower`, the crawl clause of
  *Heights and the ground datum* and *Basements*' floor clause — each read in `docs/ARCHITECTURE.md` (md5 01fea21f…) and
  found once; the `fort` and `burial-ground` medians executed (`scratchpad/volumes/rcV2/medians_new.py` → `.out`: 1.01 – 1.12).

*PLAUSIBLE (reasoning, until measured):*
* That the Monte-Carlo's truncation rates carry over to the built `massStepped` (T-V2-46 measures them at M6a on B-MASS's
  receipt hints); that `rebaseStack` keeps every stacked datum exact on the warp and terrain paths (T-V2-44's three cases);
  that the pent band facets meet the upper walls within 1 cm (T-V2-44); that the D-front edge reads rightly on round
  temples (the owner's panel).
* Every value this revision adds — `claimLo`/`claimHi` 0.35/0.6, the `arena` row (`caveaM`, `courtMinM`, `claimShare`
  .5–.8), `ovalSides`, the axis ratio 1.15–1.4, `terrace.wallBandCm` 250 cm, `vaultClampCm` 30 cm (`raised.clearCm` withdrawn by reconciliation round 1),
  the temple grade 1.0–1.2 and `stairGradeMax` 1.3, the refitted tiered tower, the aspect clamps, the effort (+1.75–2.5 pw)
  — own, calibratable, each with its test.
* The historical readings: sealed step pyramids without an outer stair, steep stairs on the stepped temples of the Americas,
  chambers built into temple platforms, bridge chapels with crypts, amphitheatres' arenas at about 13–20 % of their hulls
  and hulls of 1 400 – 11 000 m² — general architectural history, not corpus-witnessed.

*Reconciliation round 4.* **CONFIRMED** by executed script: every current text item 371's
round-4 extension quotes (T29-4, J-A29.25's two clauses, step 5's root clause, the six "ground storey" readings of the
basement's place) occurs exactly once in `docs/ARCHITECTURE.md` (md5 01fea21f…, after whitespace normalisation), and no other
volume's request or file f / g item quotes any of them; that V12 §2.1's `BenchBarDef` carries `id`, `owner`, `statistic`,
`stages`, `towns`, `tier` and `run`, that several registrations of one `id` form one vector verdict, and that no V12
`StatBarSpec` or `NullModelSpec` carries a V02 bar; that V11 §2.2 zeroes an `extension` number to 0 under `MFCG`, `FTG` and
`VG` absent an entry. **PLAUSIBLE**: that no document shifts from item 371 (d) — true by the reading (on a building none of
whose ground wings is solid the ground wings are the ground storey's), not executed; and that a mirror-coin family draws at
a village rung under `VG` at all (the zeroing turns `massing.composed` off there unless an entry turns it on), so SCC-85's
entry may be latent — it is written either way.

*Reconciliation round 4, continuation.* **CONFIRMED** by reading at source and by executed script:
V03 plans a storeyed wing on a sealed stack and flags it `W_TIER_UNREACHED` (V03 §3.3 S6 (e); T-V3-28's sealed-stack
fixture); the `tiers` op carries `stairs`, `top` and `solid` (V02 §4.6), so both sealed fixtures of V02 §7.7 are edits of the
stepped temple; V05's reader is `levelledGroundCm(doc, key: PlatKey, p: PointCm): Cm` (item 309), the base's
`TerrainSampler` is the raster's bilinear reader (§2.3) and `PointCm` its one point shape; no other volume and no file f or g
item quotes `rebaseStack`'s declaration or item 230's changed clause; item 230's current quotation is unchanged and found
once in `docs/ARCHITECTURE.md` (md5 01fea21f…). **CONFIRMED**, formerly PLAUSIBLE (reconciliation round 5, seam S23R4-02 (d); by
reading at source, V03 md5 735035b5…): V03's S6 reads "a sealed stack whose every wing is solid — one carrying a storeyed
tier or shrine is planned and flagged by (e)" (second brief), item 230's wording.

*Reconciliation round 3, continuation.* **CONFIRMED** by reading at source and
by executed script: V03's `basementDoor(b)` takes rule 1, a retaining wall's side, before rule 2, the tomb door, for
every `external` basement, `ground(b)` or not (V03 §3.7.1); V03 reads `storeyRange`, `deckLevel` and `stairChain` in
its eager facts (V03 §3.3, 3.7.1, its §1b rows) and `@plat/buildings` depends on `@plat/plots` (V02 §1b); V12 §2.1's
`PresetArm` is `'default' | PresetId`; item 371's and item 230's current quotations are unchanged and found once in
`docs/ARCHITECTURE.md` (md5 01fea21f…). **CONFIRMED**, formerly PLAUSIBLE (reconciliation round 5, the same-shape sweep of seam
S23R4-02 (d); by reading at source, V03 md5 735035b5…): V03's S6 gives a building with no storeyed wing "no level at or
above the ground and no room there", and its §3.1 step 2 plans such a building's basement storeys alone, entered at
`basementDoor(b)`, gives its hosted accesses 3.7.2 (1)'s outside-door heads and stops with an empty plan where it has
neither — what item 230's clause cites.

## 13 Fix list

**Nothing of this volume's own is left for later.** The revision of 2026-09-28 fixed all 46 findings of
`docs/volumes/critique/V02.md` in this file (the disposition table is appended to the critique), and **the second
revision of 2026-09-29 fixed all 27 findings of its §11 addendum** (V2C-47 – V2C-73; four with recorded variations —
V2C-47's `none` lawful over any solid tier 0 and a row quad's removal as a gap, J-V2.79; V2C-49's aspect derived rather
than drawn, J-V2.86; V2C-59's floor bar at 10 % of the hull, J-V2.84; its disposition table is appended to the critique). The values it adds are
own defaults with their calibration points and pre-decided fallbacks (V02 §3.10, §6, §8.2), which is the design's normal
state, not a deferral.

**Reconciliation round 1 (2026-09-29) fixed all 21 seam issues routed to this volume** (S23-01, -03, -06 – -10, -28,
-30 – -33, -35, -38, -40; ST-08; SCC-12, -20 – -22, -28; one with a recorded variation — SCC-12's mortuary chapel reads the
small `burial-ground` row, not the `chapel` family row, and the lychgate is its own banded row, J-V2.88) and wrote the V02
one-liners that S23-02, -18, -27, -29 and -36 name; nothing of its own is left. **Outside this file, for other lanes:** the
integration file's J-VI.5 and hand-off H3 (`docs/volumes/_integrate.md`) carried the withdrawn low-building clause of
V02 §3.17 (b) — amended in round 2 by volumes/reconcile-BASE-F-r2 with TR-24 (S23R1-13, verified by this volume's round 2;
V06's IN-V06-2 is ST-09's); file f items 226, 234, 238, 305, 406, 447 and the
consolidated §16 item are the BASE-F lane's (-19, -20) — and item 226 should split its label so item 226's
half raise ((a), (b) of its round-1 extension) lands with the base's basement gate, not at M6-U; V03's W2, 3.7.4 and 5.1 cite `facadeBays(wing, side, bayM)`,
`cryptSeedWings` and `stairTreads` — applied by V03's reconciliation round 2 (V03 RC2.1–RC2.3; reconciliation round 3,
S23R2-07); V01's V01 §5.1.2 cites `stairTreads`.

**Reconciliation round 2 (2026-09-29) fixed all 10 seam issues routed to this volume** (S23R1-06, -10, -11, -12, -13 of
`seam-stage2-3-r1.md`; SR1-05 of `seam-settlements-r1.md`; SCC-39, -40, -43, -50 of `seam-content-calibration-r1.md`),
none with a variation; S23R1-13's edit to `docs/volumes/_integrate.md` (J-VI.5, H3 and a dated note after its §2.2 table) was
made by volumes/reconcile-BASE-F-r2 together with its TR-24 and verified here; nothing of its own is left.
**Outside this file, for other lanes:** SCC-49's V02 half (item 427 marked absorbed by file f item 435) is the base-change
lane's (volumes/reconcile-BASE-F-r2), which wrote it here (the *Absorbed* paragraph after item 427), with S23R1-14's third
bend rung in item 305 and in V02 §1b's bend list.
**Round 2's continuation (2026-09-29, re-issued task) fixed the three seam issues added since** (S23R1-16, -17 and -23
of `seam-stage2-3-r1.md`'s continuation), none with a variation; nothing of its own is left. **Outside this file, for
other lanes:** S23R1-15, the reserve's side (V01 §3.8.2 step 5's source, V01 §3.8.3's digest, W6, T-V1-26's milestones), is
V01's (volumes/reconcile-V01-r2's continuation); S23R1-18, file f item 303's label (BASE at M3a for the hole
sentence, STAGED at M6 for the rest) and V01 in eight *Needed by* cells, is the base-change lane's
(volumes/reconcile-BASE-F-r2's continuation).

**Reconciliation round 3 (2026-09-29) fixed all 9 seam issues routed to this volume** (S23R2-01, -03, -07, -08 of
`seam-stage2-3-r2.md`; SR2-10 of `seam-settlements-r2.md`; SCC-52, -58, -59, -71 of `seam-content-calibration-r2.md`),
none with a variation (SR2-10 and SCC-71 one text); nothing of its own is left. **Outside this file** (each logged in
`docs/lane-events.log`): file f item 309 is applied before items 370 and 231 and item 376's note carries item 376's new
scope sentence word for word (volumes/reconcile-BASE-F-r3, verified here); item 371 needs no note
now that item 371 reads as it does; V03's item 242 quote of V02 §3.17 (a)'s walk-out sentence was brought to this
round's words by this lane after V03's round 3 landed (one exact-string edit, logged), and V03's round 3 cites
item 371 for the tomb door; V12's `bar.<barId>` family is V12's (X33).
**Round 3's continuation (2026-09-29, re-issued task) fixed the four seam issues added since** (S23R2-11, -12 and -14 of
`seam-stage2-3-r2.md`'s continuation; SCC-R2C-7 of `seam-content-calibration-r2.md` §7.2), none with a variation and three
widened by the same-shape sweep (X18 for S23R2-11 and -12, item 371 (c)'s step-5 root clause for S23R2-12, `rebaseStack`'s
§1b row for S23R2-14; J-V2.105); nothing of its own is left. **Outside this file** (each logged in `docs/lane-events.log`;
no edit made there): S23R2-10, the storey-less plan that item 230's new clause cites, and S23R2-15 are V03's
(volumes/reconcile-V03-r3's second brief), told that item 578's step-3 text still names the tomb door for a building with
no storeyed ground wing and the wall's side "for a walk-out at a wall", which S23R2-12's reading would widen to every
`external` basement; S23R2-13 is V01's; `docs/volumes/_integrate.md`'s hand-off H10 and V03's record of it quote
the old pointer as history.

**Reconciliation round 4 (2026-09-29) fixed all 3 seam issues routed to this volume** (S23R3-03 of `seam-stage2-3-r3.md`;
SCC-74 and SCC-85 of `seam-content-calibration-r3.md`), S23R3-03 with one recorded variation (J-A29.25's added clause
cites "§2.6 *Basements*", the rule's home once applied, where the issue's text cites the request id) and one widening (the
same-shape sweep: J-A29.25's door clause, step 5's root clause and the six "ground storey" readings of the basement's place,
item 371 (b)–(d)); nothing of its own is left. **Outside this file** (each logged in `docs/lane-events.log`): §2.6's step 3
and §13.2's T28-3 are V03's new item 578 (volumes/reconcile-V03-r4), told the split; file f item 371 cites
item 371 by id and so carries the widened text, and volumes/reconcile-BASE-F-r4 was told that the request now also touches
§5.3, §7.4, §10.2, §13.2 and J-A29.25, for the item's *Also touches* field.
**Round 4's continuation (2026-09-29, re-issued task) fixed the two seam issues added since** (S23R3-14 and S23R3-17 of
`seam-stage2-3-r3.md`'s continuation), each with its required text and each widened by the same-shape sweep (V02 §7.7's
sealed fixture in two forms for S23R3-14; `rebaseStack`'s §1b row and its callers' clause for S23R3-17; J-V2.106); SCC-74
and SCC-85 were re-checked in the live text, not redone; nothing of its own is left. **Outside this file** (logged in
`docs/lane-events.log`; no edit made there): S23R3-15 (b), V03's S6 list of storey-less buildings, is
volumes/reconcile-V03-r4's, told this volume's wording ("a sealed stack whose every wing is solid").
**Reconciliation round 5 (2026-09-29) fixed the 1 seam issue routed to this volume** (S23R4-02 of `seam-stage2-3-r4.md`,
minor) with its required text, widened by the same-shape sweep (the constants row names the approach strip among
`landingM`'s consumers; round 3's continuation PLAUSIBLE item on V03's storey-less plan is settled with round 4's;
J-V2.107); nothing of its own is left. **Outside this file:** nothing owed — V03's `stackAccessDoor(b, a)` and its §1b
row already name V02's `stairChain` and the approach strip (V03 §3.7.2 (1), its §1b); the round's other issues are volume
3's (-03, -06), V01's and file f's.

**Cross-volume items** (each owned by another volume's revision; V02 is written as if each were applied, and names its
fallback where one is needed):

| # | volume | item | V02's fallback until it lands |
|---|---|---|---|
| X1 | 11 | `BuildingClassRow.templateFamily`'s note "not read by any stage" becomes "read by S11's composition resolution (V02 §3.2) and the tables editor" (also V11C-11 (4)) | none needed — V02 reads the column |
| X2 | 11 | the compiler emits `footprintM2` p10 and p90 by V11 §3.6.1's derivation ratios (0.7 and 1.45 × p50, V11C-11 (1)), mirrored as V02's fixed `sizeBandLo`/`sizeBandHi` | V02 derives them itself (M10) |
| X3 | 11 | the `manor` template override: prosperous p50 420 m², rich p50 650 m², rich plot 3 000 m², main-slot share ≥ 0.6 at prosperous and rich (V02 §3.10.3; J-V2.35); V11C-11 (5) proposes 320 / 550 m² — revise-V11 reconciles, V02's rows are measured against 420 / 650. **Landed:** V11 §3.6.1 adopted 420 / 650 (J-V11.39) | none needed |
| X4 | 11 | the role table's `footprintShare` per structure (V11C-11 (2)) | `mainShareDefault` 0.6, the rest equal |
| X5 | 11 | item 427's `attic`, `parapetCm` and `towerStoreyCm` columns in V11 §2.8 and §3.6.4. **Landed:** V11 §3.6.4 writes their values once; V02 §3.10.6 keeps only the reading rule | none needed (the fallback line is dropped) |
| X6 | 11 | the naming slice `building.wingRole` (V02 §5.4) with our own word per `WingRole` — the item 110 fold adds "a tier", "the shrine", "a stair", and the second revision "the seating" and "a gate passage" for an `ovalCourt`'s solid and passage wings | the role id |
| X7 | 11 | the `crypt` column (`always`, `basement`, `never`), `cryptM2`, `rankShare` that §2.6's crypt derivation reads | T-V2-36's crypt part waits (V02 §8.4 R8) |
| X8 | 6 | V06 §3.4 rasterises the epoch casters **per wing** (each wing's prism and roof rise, V02 §3.14.1), not one height per footprint; V06's line on W10 reads "called through the mutator" | none needed at generation (no building casts) |
| X9 | 8 | V08's attribution: `MaterialRow`'s rows are V11's, and `materialFamily` reaches the material row only (V02 §1d) | none needed |
| X10 | 9 | the `FM` building look in the style panel; tool rows for `setComposition room`, the secondary porch and `moveTower { shape }`; the `fantasyShapes` control in the advanced panel (V02 §4.4–§4.5) | the ops exist through the clerk and the skeleton file |
| X11 | 3 | the plan reads wings by key (item 225); unedited dormer rows follow the plan's roofed rooms and edited rows stay fixed (V02 §3.7); the choir stairs over the raised crypt's lift (V3C-61 (4)); the room role `gatehall` in V03's role table | none — V02 states its side |
| X12 | 4 | the dig draw's key carries the wing key for a wing the mutator adds (V02 §3.9 W6) in C4-52 / C4-58's key list; (k) (5)'s obstacle test reads V02's footprint and basement floor (V02 §3.14.5 (f)) | none — the draw is V04's |
| X13 | 7 | a `templateFamily` column on V07's village class rows (J-V2.56). **Taken by V07 for the budget rows only** (J-V7.82 as amended by V07's reconciliation round 2; J-V7.101): every `v.` row names a V11 §3.6.1 `templateFamily`, from which its budget rows compile, read at the chain's step 4 after step 3; `composition.classFamily`, keyed by V07's `v.` keys, stays the one source of the village classes' composition keys and is read first | landed; none needed — V02's chain reads step 3 before step 4 |
| X14 | 1 | V01's NG draw-style bars: from M6a the NG parity sheet keeps `fakeGablePerWing`; at M6b the NG bars are re-measured on `roofscape` and the sheet switches to it when they pass, else keeps `fakeGablePerWing`, reported (V02 §5.3; the one sentence of S23-02); the `hatched` hatch program is V01's V01 §5.1.2, run per roofscape facet | the NG parity sheet keeps `fakeGablePerWing` |
| X15 | 5 | the island rim-slab crypt vault as the island form of the `always`-crypt ladder (V02 §3.14.5 (d); C5-02 (3b)) | none — V05's form |
| X16 | 11 | *Item 110 fold.* The `deck` table (`DeckBudgetRead`: `footprintM2`, `maxFloors`, and the plot fields the base's deck plots read) keyed by deck kind × band, and a `deckOk` class column that never admits an `always`-crypt class (V02 §3.16); **second revision:** `deckOk` is read **per use** — false also for a use to which a dossier crypt record binds, so S10b never places it on a deck, and V09's T6 bend (V9C-58 (2)) sends a hand placement landward | `deck.fallbackM2` [20, 60] m² and `deck.fallbackFloors` 2; without `deckOk`, every class the base places on a deck plot composes by its `@deck` row |
| X17 | 11 | *Item 110 fold.* The specialisations `stepped_temple` (temple and great temple, by the region and era rows), `terraced_palace` (palace) and `tiered_tower` (tower), each naming its composition key (`stepped-temple`, `terraced-palace`, `tiered-tower`) in `DesignationTemplateRow.composition`, with their chance and cap rows (≤ 0.1 % of buildings); no tier geometry cell in V11 (J-V2.62) | only a declared class (the second fixture's) and the `family` op reach `stepped` |
| X18 | 3 | *Item 110 fold.* Plans of tiers: levels by `storeyRange`, no rooms in a `solid` wing, a landing door on `landingSide` for every storeyed wing standing on another, the shrine one room by its programme, a solid entrance wing's circulation rooted at the stair chain's head; no basement on a deck; the walk-out door where a retaining wall is the plot's low edge. **Second revision:** item 230's root (a solid stack's main entrance at the stair's foot, the plan rooted at the first landing door, no plan above the ground without a storeyed wing, its basement storeys and access heads still planned) — V3C-66 (3)'s "main door on the shrine" withdrawn; `W_TIER_UNREACHED` for a storeyed wing on a sealed (`none`) stack; `floorCm` from each tier's ground and upper storey heights (J-V2.85, V3C-65 (2)); `Storey.level` 0 the lowest storeyed level (item 371); chimneys carried up through the tiers above with `Chimney.levels` reaching the top wing (V3C-68 (2)), which V02's roofscape draws (V02 §5.2); the crypt inside a solid tier 0 entered at its own floor by the door at `basementDoor(b)` (V03 §3.7.1); the arena's façade ring planned, the seating ring not; the bank quay's cellar by the ordinary gate | none — V02 states its side |
| X19 | 4 | *Item 110 fold.* A ruin's stepped monument laid by `layTiers` with the `stepped-monument` row at its ancient-culture band, on its ruin stream, decayed by its persistence order; the vaults under raised ways are V04's own (item 110 (b)) | none — V02 supplies the function and the row |
| X20 | 5 | *Item 110 fold.* The caster ceiling reads the stack's envelope (V02 §3.15.2); an island palace or temple may take a stepped row; its crypt is the rim-slab crypt vault under the building's lowest massing tier, inside underside tier 0 (the rim slab) (J-VI.7) | none |
| X21 | 9 | *Item 110 fold.* T9's tier controls (tier stepper, step handle, stair-form and top-form chips, a per-tier storey or height stepper) emitting `setMassing { op: 'tiers' }` and `setAttr`; the deck-plot badge reading V11's row; "plots on a bridge deck stay staged" deleted. **Second revision:** the shape, skirt and solid chips, a shrine-inset handle, the centre and radius handles on a round or octagonal tier 0, the `none` choice on the stair-form chip; the words of every bend id of V02 §1b; **V9C-59 (4)–(5) and J-V9.67 (widening V09's refusal list by "a rule of a building's structure or of nature") are withdrawn** — item 101 R2 admits no such refusal, and V02 bends each case instead | the ops exist through the clerk and the skeleton file |
| X22 | 10 | *Item 110 fold.* The clerk's tier calls and V02 §4.6 (7)'s why facts; **second revision:** the new `tiers` fields, the bends (the clerk says the bend's line and its alternatives, never "cannot"), and the facts `massing/bend/<id>`, `stack.grade` and the derived aspect | the events |
| X23 | 6 | *Item 110 fold.* Tiers added or removed over epochs by V02 §3.15.5's rows; deck buildings falling with their deck at an epoch by the base's fate rule; a solid monument never re-roofed; **second revision:** a stack's Works in stack order, solid wings by courses (item 318); an epoch's raised way clearing **every** building meeting its supports or strip by V06 §3.19 (7), households displaced with cause `clearance` (V02 §3.17 (b) as reconciled, ST-08; the low-building exception and `raised.clearCm` withdrawn); `rebaseStack` on an epoch's terrain change (C6-51's caster top current) | none — the rows exist |
| X24 | 1 | *Item 110 fold.* The `hatched` family draws a stack in its order (a wing before the wings standing on it) and hatches `stairFlight`'s treads across the flight, counted and spaced by `stairTreads` (V02 §2.6; S23-07: V01 §5.1.2 reads it) | the per-wing constructions' stack order and treads (item 419) |
| X25 | 12 | *Item 110 fold.* The second known-city fixture's building bars are T-V2-44 – T-V2-47 (V02 §7.7); its golden and its own bars are V12's; **second revision:** T-V2-51 on its terraced wards and T-V2-42's arena bar (a closed `ovalCourt`, hull aspect 1.15–1.4, floor ≥ 10 % of the hull, seating solid); the fixture declares its arena's precinct (60 × 50 m or larger) and its temple's precinct (V02 §3.10.3's receipt hints) | none |
| X26 | 7 | *Item 110 fold.* **A village class takes tiers only through V11's region and era specialisations, applied to the `v.` class that plays the row's class, under V07's `rules.tiers.capPerSettlement` (V11 §3.24.3); none by default** (V2C-70: the fold's flat ban was a hard-coded universal, item 23); a village's piers and bridges take deck buildings by the `@deck` rows and V07's deck cell at village rungs | the town's `@deck` rows (V11 §3.24.3's village reading has landed, SS-31) |
| X27 | 11 | *Second revision.* An `arena` template override: plot p50 2 500 / 4 000 / 6 000 / 9 000 m² (own; the historical amphitheatres' 1 400 – 11 000 m² hulls), footprint "the claim's" (so `slotBand` reads the `arena` row's `claimShare` .5–.8), main share 1; and the two naming entries "the seating" and "a gate passage" in `building.wingRole` (X6) | the arena's declared plot (a fixture's), else — until SCC-11 lands V11's `arena` plot row — the claim V11's row gives, where M3 removes `ovalCourt` if it cannot hold the least oval and M14 lays the fallback, reported. **Reconciliation round 1:** the `arena` class now reads V11's own `arena` family and V02's `arena` family row (V02 §3.10.2), which answers X-V11-9 |
| X28 | base (the coherence pass, item 110 (d)) | *Second revision (V2C-66 (2), (6)).* The deck-plot record carries `landmark: boolean` (a mole's head and mid-mole slots, and a bridge's mid-span slot where V9C-58 (7) is adopted), which S11 copies to `DeckContext.landmark`; a `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no deck plot; a quay platform built on the bank is flagged ground (`DeckContext.surfaceCm` null) | S11 reads `landmark` false and `surfaceCm` from the host; a ford's or drawbridge's plots are not offered by V02's reading |
| X29 | 4 | *Second revision (V2C-67 (2), V2C-48 (4)).* The chamber record gives its ceiling (an arch vault's soffit), which M11's `vaultClamp` reads for a building on the underground layer; the ruin stage calls `drawTiers` and `layTiers` alone with `TierCells.heights`, `plinthCm` 0, `parapetCm` 0, `scale` 1, and handles a `TierFailure` | no clamp (the `@underground` rows' one flat storey) |
| X30 | 3 | *Reconciliation round 1 (-31, -07, -38).* W2 reads "On every side of every wing, V02's `facadeBays(wing, side, bayM)`" (a tower's bays round its free perimeter, V02 §3.7); 3.7.4 step 1 reads "under `cryptSeedWings(b)` (V02 §3.14.5 (c)); where it is empty, the far third of the region from the main entrance"; 5.1's exterior flights by `stairTreads` (its `goingCm` for interior stairs); T-V3-25 carries the poor manor's three-units clause; the half cellar's floor at the datum less half the depth (V03 §3.3 unchanged) | applied by V03's reconciliation round 2 (V03 RC2.1–RC2.3) |
| X31 | 1 | *Reconciliation round 1.* V01 §5.1.2's stair-flight hatch reads `stairTreads`; V01 §3.17.3 (2) and V01 §3.17.4 stand as written — V02's add path now clears the same set | none |
| X32 | 11 | *Reconciliation round 1.* X-V11-9 is answered by V02's `arena` family row; SCC-11's `arena` plot row (plot p50 2 500 / 4 000 / 6 000 / 9 000 m², footprint "the claim's", `gate` structures absorbed) is what V02 reads; the role table's `gate`, `charnel house`, `mortuary chapel` and `lychgate` shares feed M10 as written (V11 §3.6.5) | X27's fallback |
| X33 | 12 | *Reconciliation round 3 (with V12's SCC-56); round 4.* The metric family `bar.<barId>` — the verdict statistic of one registered owner bar — which V02 §3.10.10's lines name as `bar.T-V2-<n>`: **landed** (V12 §2.1, J-V12.65); V02 owes the registrations of V02 §3.10.10 (its `BenchBarDef` table, each written by the seat landing its line's milestone, X-V12-15) | none (J-V12.64's fallback was declined by J-V12.65) |

**Reconciliation round 1 — the base-change lane's edits in this volume** (volumes/reconcile-BASE-F-r1, 2026-09-29; issues
routed to that lane alone). S23-17: item 305's *A requested basement* clause bends to the nearest ground building
(`bend.deck.basement`; file f item 305). S23-20: §8.1's dependency and R8 read "the crypt derivation (M6-U)" (file f items 238,
226, 436). S23-19: §8.3 states no §16 total (file f item 568).

**Reconciliation round 2 — the base-change lane's edits in this volume** (volumes/reconcile-BASE-F-r2, 2026-09-29; opus
standing in for the Fable seat, PENDING FABLE REVIEW). S23R1-14: item 305's *A requested basement* clause and V02 §1b's
`bend.deck.basement` row gain V03's third rung ("else the nearest building on the ground"), one text with file f item
305. SCC-49: item 427 is marked absorbed by V11's item 435 (file f items 427, 435). File f also reads, for this
volume: item 226 labels item 226's half-cellar raise ((a), (b) of its round-1 extension) **BASE (M2b, with §2.6's basement
gate)** and its crypt parts **BASE design, built at M6-U**, as V02 §13 asked. This volume's S23R1-13 was applied
in `docs/volumes/_integrate.md` together with TR-24, one text for J-VI.5 and H3 (X23 as reconciled).


## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V02-1 (J-VI.7).** §13's X20 now reads "its crypt is the rim-slab crypt vault under the building's lowest massing
  tier, inside underside tier 0 (the rim slab)" (edited in place).
* **IN-V02-2 (J-VI.17 H10; V03's second-round hand-offs).** (a) item 371's external-access condition — `external` where no ground wing is storeyed (every wing standing on no
  other wing is solid), the door at V03's `basementDoor(b)` (V03 §3.7.1: a retaining wall's side first, else the tomb
  door) — is applied in item 371 and V02 §3.15.3; every pointer of this volume to the
  solid stack's door reads "its door at V03's `basementDoor(b)` (V03 §3.7.1: the tomb door, or the wall's side where
  the stack stands against a retaining wall)". (b) V02 §3.17 (a)'s walk-out sentence points at item 242 (a) (the walk-out at a
  retaining wall), which carries the rule (edited in place by reconciliation round 3).
  (c) Every `setMassing` op's dry run — the `tiers` op's among them — and `setComposition room`'s list, among their
  fates, the stored-plan rooms, edited openings and furnished rooms the op would orphan (V03 §3.11, 4.2–4.3), read through
  V03's plan query, and a stored plan is re-cut inside the event (V02 §4.2 steps 2–3, §4.3; widened by reconciliation
  round 1, S23-40).
* **IN-V02-3 (J-VI.17 H11; CVR-V10-8).** The entity registry carries the path `deck/landmarks/<head|mid>` on a deck's
  host (a mole, pier, quay platform or bridge), naming its landmark plots (`DeckContext.landmark`), and `massing/stack` is
  readable with each tier's wing key in tier order; both are read-only paths for V10's providers and V09's
  panels.
* **IN-V02-4 (J-VI.4, J-VI.5).** This volume's second-revision rule — no structural refusal, a bend for every case (V2
  §1b's bend ids; V2C-47) — is the rule every volume now follows (item 101 R2), and its tier contract (`drawTiers`,
  `layTiers`, `TierFailure`, `massStepped`, `TierCells.heights`, the `none` stair form, `MassingRef.stack.grade`,
  `rebaseStack`, the stack order in `heightsAt`, `vaultClamp`) is adopted by volumes 4, 6, 9 and 10 as stated here.
* **IN-V02-5 (file f).** X28's deck-plot fields (`landmark: boolean`; no deck plot on a `ford`, a `draw` bridge or a
  bridge without `deckCm`; a quay platform on the bank flagged ground) are carried by file f with item 110 (d)'s record.


## Reconciliation round 1 (volumes/reconcile-V02-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r1; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against the 21 seam issues routed to it by `docs/volumes/critique/seam-stage2-3-r0.md`,
`seam-time-r0.md` and `seam-content-calibration-r0.md` (1 blocker, 10 majors, 10 minors). All 21 are **FIXED**; none was
found invalid and none is left on the fix list. Each changed passage carries "reconciliation round 1" or the issue id.

| issue | severity | what changed (where) |
|---|---|---|
| S23-01 = ST-08 | blocker / major | V02 §3.17 (b): every building meeting a new raised way's piers or strip takes the fates on every path (V01 V01 §3.17.3 (2), V01 §3.17.4; V06 §3.19 (7)); `raised.clearCm` withdrawn from V02 §1b, V02 §3.10.9, V02 §12 and X23; V02 §0 one sentence; J-V2.89; T-V2-53 (d) |
| S23-03 | minor | item 406 extended: the base's §8.2 `hatched` district cell and II.4's *Render tier* (file f item 406 after item 405) |
| S23-06 | major | item 261 extended: the base's §2.8 `inputs` comment and `stale` sentence and its §4.1 list made per rung; J-V2.52 amended |
| S23-07 | major | `stairTreads(w)` declared in V02 §2.6 (exported by `@plat/plots`); `treadM` withdrawn; V02 §5.6's `stairFlight`, glTF and CityJSON stairs, item 419, item 229, M3a-V2, X24, V02 §1b and V02 §6.2; J-V2.90; T-V2-53 (a) |
| S23-08 | major | V02 §5.5's SVG row follows the base's §11.1 grouping (`sem.building.roof…`, `sem.building.roofline`, the metadata map to `wing:<building>/<key>`); item 449 extended |
| S23-09 | major | item 225 extended: `StairCore.tower` by tower-wing key; V02 §2.1's key list names it |
| S23-10 | major | item 226 extended: the half cellar's raise (datum term in *Heights and the ground datum*, the basement step, `rebaseStack` (1)), `cryptSeedWings` for a crypt-only half basement; V02 §2.5 row, V02 §3.14.5 (a) and (d), V02 §1b; declared one-time shift; J-V2.91; T-V2-52, T-V2-36 |
| S23-28 | minor | V02 §0's click words |
| S23-30 | minor | `facadeBays(wing, side)` on every side (V02 §2.4, V02 §3.7; a tower's bays round its free perimeter); J-V2.93; T-V2-53 (c); V02 §6.2 |
| S23-31 | major | `cryptSeedWings(b)` declared (V02 §2.4) and stated once (V02 §3.14.5 (c)); item 226 (c); V02 §1b; M6a; J-V2.92; T-V2-53 (b) |
| S23-32 | minor | V02 §5.5's GeoJSON cell points at file f item 447 |
| S23-33 | minor | `BaseWing.partName` named in V02 §2.1's notes, V02 §2.5 and V02 §1b |
| S23-35 | minor | V02 §8.1 and J-V2.32: the Q1 exception |
| S23-38 | major | T-V2-35 split (composer clauses at M6b, hall area from M6-P's P1, units clause to V03); V02 §3.8's hall fallback (`hallUnclamped`); M6b's exit; J-V2.95 |
| S23-40 | minor | V02 §4.2 steps 2–3 and V02 §4.3: the dry run lists orphaned plan parts and a stored plan is re-cut inside the event; IN-V02-2 (c) widened |
| SCC-12 | major | 35 families; family rows `burial-ground`, `fort`, `arena` (the `arena` row moved from an override); role rows `charnelHouse`, `lychgate`; `roleKeys` rows; V02 §3.10.7's exemption; M8b's absorbed arena gates (minor-axis passages); V02 §3.8 (2); medians receipt `scratchpad/volumes/rcV2/medians_new.py`; J-V2.88 — a recorded variation: the mortuary chapel reads `burial-ground`, the lychgate its own banded row |
| SCC-20 | minor | V02 §3.10.6 cites V11 §3.6.4 for the three columns and keeps the reading rule; V02 §2.3's comment; V02 §1b; X5 landed |
| SCC-21 | minor | the `manor` budget note and the `arena` plot's "until" clauses dropped (V11 §3.6.1); J-V2.35 amended; X3 landed; X27 |
| SCC-22 | minor | V02 §3.9 W6 and V02 §3.14.5 (b): the draw V04's, the chance V11 §3.23.7's `DigRule` rows; V02 §1b |
| SCC-28 | minor | V02 §4.6 (1) and V02 §4.2: a bend or `family` op to `stepped` writes the use's `siting.declared` `specialisation` in the same undo group (`none` on the way back); V02 §1b; J-V2.94 |

**The V02 one-liners of other owners' seam issues, written here** because only this lane edits this file: S23-02 (V02 §5.3's
hatch bullet and the NG sentence; X14), S23-18 (V02 §3.11's building click by band), S23-27 (F-COMPOSE (3) points at
V03's A2 (11)), S23-29 (V02 §3.11's outline close-up trigger), S23-36 (V02 §8.1 and the M6b row: `facadeBays` may move
forward); S23-17's bend id `bend.deck.basement` registered in V02 §1b's bend list. The V02 halves of S23-17, S23-19 and S23-20
(item 305's bend, §8.1's crypt-derivation clause, §8.3's §16 total, R8) are the reconcile-BASE-F-r1 lane's and were left
to it; both lanes' markers were re-verified after every write.

**New:** decisions J-V2.88 – J-V2.95; tests T-V2-52 – T-V2-53; cross-volume items X30 – X32. **Effort:** + 0.25–0.5 pw
(22.5–32.5 pw for the volume; item 525 restated). **Declared shift:** J-V2.91's half-cellar raise, only where the base's
basement rule has shipped before item 226 is applied. **Checks:** every new base quotation of item 261, -15, -21, -27 and
-28 found once in `docs/ARCHITECTURE.md` (md5 01fea21f…) by script; every J-V2, T-V2 and BCR-V2 id cited is defined;
`doc_checks.py` (receipt `scratchpad/volumes/rcV2/dc_final2.txt`, against `dc_before.txt` on the pre-round backup) C1 0,
C2 0, C4 0, S1 0; C3 620 unreviewed against 579 before — the 41 new 3-grams read: ordinary phrasing, table digit runs and
the base's own `StairCore` comment quoted in item 225; S2 100 against 86 — the new pointers are volume-local, written
"V02 §…", "volume n §…" or "§3.11 there". **CONFIRMED** by reading and by
executed script (the quotations, the ids, the medians); **PLAUSIBLE** the new values (own, calibratable) and J-V2.91's
historical reading.

### Continuation (2026-09-29, re-issued task)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r1; covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane with four more issues than the 21 above: SCC-R0C-2 – SCC-R0C-5, raised at 08:28 by
`seam-content-calibration-r0.md`'s continuation (§6.1) after this round had landed. The 21 are history and were not
redone; the four are **FIXED** here (none invalid, none on the fix list). SCC-R0C-1 is BASE-F's and was applied by reconcile-BASE-F-r1's continuation
(file f items 426 and 224 relabelled BASE (M3a), LANDED 08:40); V02's headings now say what that relabel says. Backup
`scratchpad/volumes/rcV2r1c/V02-pre-r1c.md` (md5 cdea0309…).

| issue | severity | what changed (where) |
|---|---|---|
| SCC-R0C-2 | minor | item 426's and item 224's headings gain "(from M3a, with item 229)"; item 224 says where its clause applies before M6 (a stepped or oval building's hint) and that item 228 and item 230 read it from the same milestone; item 229's list brings item 426's `composition?` (written by item 259's replacement) and item 224's hint clause; V02 §8.5's M3a-V2 content cell names both with item 228's free part; V02 §10's opening paragraph lists the item 110 fold's M3a requests among its exceptions (same-shape sweep); J-V2.103 (b) |
| SCC-R0C-3 | minor | V02 §3.10.9: `sizeBandLo`, `sizeBandHi` split into their own row, 0.7, 1.45 with `own` and the note `fixed: the mirror of V11 §3.6.1's derivation ratios, changed only in the change that changes those`, not calibratable; V02 §3.10.10: dropped from the small-tables line and given a no-entry row beside the parity-neutral one; M10's clause (V02 §3.5), J-V2.35 and X2 read "V11 §3.6.1's derivation ratios, mirrored as `sizeBandLo`/`sizeBandHi`"; V02 §12's defaults bullet no longer calls them calibratable; J-V2.103 (a) |
| SCC-R0C-4 | minor | J-V2.3 reads "inset by `WingRoleRow.hipInset` × span — under `FM` the measured-rate entry of V02 §3.10.8"; J-V2.34 reads "V11 §3.6.1's template families (35)"; V02 §5.2's ridge-line step says the same of a block's `FM` inset (same-shape sweep) |
| SCC-R0C-5 | minor | item 522's §13.2 bullet names T-V2-1 – T-V2-53 in the tiers V02 §7.6 and §7.7 name, the §7.7 bars whose subject a BASE item lands before M6 running from that item's milestone (T-V2-44 – T-V2-47, T-V2-50, T-V2-51 at M3a; T-V2-52 at M2b); file f item 522 cites the request by id, so it needs no text change |

**New:** J-V2.103. **Effort:** unchanged (item 426 and item 224 are two fields, a comment and a clause, moved inside
M3a-V2's 2–2.75 pw). **Declared shift:** none. **Checks:** every J-V2, T-V2, BCR-V2 and X id cited is defined (J-V2.1 –
J-V2.103, T-V2-1 – T-V2-53, item 216 – item 231, X1 – X33) by script; `doc_checks.py --heads docs/ARCHITECTURE.md`
(receipts `scratchpad/volumes/rcV2r1c/dc_before_h.txt`, `dc_after_h.txt`) C1 0, C2 0, C4 0, S1 0 before and after; C3
671 → 670 unreviewed; S2 151 → 152, the one new pointer "V12 §3.11's lint", volume-qualified. **CONFIRMED** by reading at
source: each finding's quoted V02 text before the edit, V11 §3.6.1's derivation rule ([0.7, 1, 1.45] × p50), V12 §3.11's
lint admitting a `fixed:` note, T-V2-44 – T-V2-53's tiers in V02 §7.7, and that `docs/AMENDMENTS-2026-09-28f.md` quotes no
"T-V2-43" while its item 522 cites item 522 by id, and T-V2-52's M2b start (file f's labelling rule: item 226's half-cellar raise
BASE at M2b). **PLAUSIBLE:** nothing new beyond the values the round already called own.

## Reconciliation round 2 (volumes/reconcile-V02-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r2; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against the 10 seam issues routed to it by `docs/volumes/critique/seam-stage2-3-r1.md`,
`seam-settlements-r1.md` and `seam-content-calibration-r1.md` (0 blockers, 5 majors, 5 minors). All 10 are **FIXED**; none
was found invalid, none is left on the fix list, none carries a variation. Each changed passage carries "reconciliation
round 2" or the issue id.

| issue | severity | what changed (where) |
|---|---|---|
| S23R1-06 | major | V02 §3.10.5 keyed by V07's `v.` keys (all 25 of V07 §2.4's rows, matched by script), the `scope` column withdrawn, the lead rewritten (a town class at a village rung plays its `villageForm`'s `v.` class, V11 §3.22); `ClassFamilyRow` drops `scope` (V02 §2.3); the chain's step 3 reads `composition.classFamily[<v. key>]` for a `v.` class (V02 §3.2); §3.10.3's override row keyed `v.longhouse` and its lead "(`v.manor_house` → `manor`)"; V02 §3.10.7's load checks name `v.` classes and `v.pound` and add the pairing check (every `v.` class exactly one row, every row a `v.` class); V02 §1b's feeder and T-V2-33 name V07's `v.` village classes; B-MASS's longhouse is `v.longhouse`; X13 records V07's decline (J-V7.82), its fallback cell unchanged; J-V2.56 amended; J-V2.96 |
| SR1-05 | major | the same change (one text for both registers): every row keyed by its `v.` key, the scope column dropped, the rows for `v.alehouse`, `v.bakehouse`, `v.pound`, `v.shop`, `v.landing`, `v.wood_yard` and `v.charcoal_pit` present under their `v.` keys; "(`v.manor_house` → `manor`)" |
| SCC-39 | major | V02 §2.3: every calibratable `composition.json` cell has its register entry (V12 §3.11) written by the seat landing its milestone; V02 §1b: a wiring row for the entries (producer the landing seat; consumers `plat calibrate register --check`, T-V12-20, and V12's runs); the exits of M6a, M6b and M6c (V02 §8.3) and M3a-V2 (V02 §8.5) add "`plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat"; J-V2.97 |
| SCC-40 | major | the `FM` preset's measured-rate cells are set by V12's `reference` run against Fantasy Manor (`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics, the free-frame harness its fixture, with V12 §3.7's outcomes as the failure branch — in V02 §3.10.8, the paragraph after T-V2-31's table (V02 §7.4), SP-V2-3 (V02 §8.2) and the M6c row (V02 §8.3); V02 §1b's `FM` preset and harness rows name the run; no V02-private tuner remains; J-V2.97 |
| S23R1-10 | minor | V02 §3.15.3: the solid stack's basement door is placed by V03's tomb-door rule (V03 §3.7.1), the crypt inside a platform entered by the same door at its own floor; X18's clause reads the same (IN-V02-2 (a)) |
| S23R1-11 | minor | V02 §10's lead: the crypt's seed wings are `cryptSeedWings`, exported by `@plat/plots` with or without stage 3; the half-cellar raise lands with §2.6's basement gate |
| S23R1-12 | minor | item 505 keeps its quoted line and adds the §14 sentence placing `facadeBays` and its two constants' reader in `@plat/plots` in every build order, re-exported by `@plat/buildings`; V02 §8.1, the M6b row, V02 §1b's row and V02 §2.4's declaration read "built in `@plat/plots` (item 505), at M6b or, under V03's Q1, first" |
| S23R1-13 | minor | `docs/volumes/_integrate.md` J-VI.5's V06 consequence, H3 and a dated note after its §2.2 table: applied by volumes/reconcile-BASE-F-r2 together with its TR-24 (lane-events 04:41) before this lane's write, in the text the issue asks; **verified here** (both clauses read that every building meeting a new raised way's supports or strip is cleared, and `raised.clearCm` survives there only in the dated note's history of its withdrawal); V02 §13's outside-lanes sentence updated |
| SCC-43 | minor | T-V2-50 states its off state as V12 §2.13's `item110.stepped` and `item110.deck` overlays (V11 §3.24.0's off forms, `deck.landmarks` included — B-MASS's mole fort and mid-mole tower not placed) on B-MASS and B-CITY minus B-MASS's arena sub-fixture, whose `ovalCourt` is its own declared shift (T-V2-46) |
| SCC-50 | minor | T-V2-33, B-MASS and V02 §8.1 read "V11 C1–C3b" (35 template families, `fort` and `arena` at M3a); X26 reads "under V07's `rules.tiers.capPerSettlement` (V11 §3.24.3)", applied to the `v.` class playing the row's class, its fallback cell noting V11's landed village reading |

**The other lanes' edits in this file this round** (volumes/reconcile-BASE-F-r2, 04:41, before this lane's write, which was
made on top of them; its three markers re-verified after every write of this lane): S23R1-14's third bend rung in
item 305's *A requested basement* clause and in V02 §1b's bend-list row for `bend.deck.basement`; SCC-49's *Absorbed*
paragraph after item 427 (absorbed by item 435, file f item 435).

**New:** decisions J-V2.96 – J-V2.97. **Effort:** unchanged (the register entries are the landing seats' duty under V12
§3.11, and V12's run replaces the harness's own calibration inside SP-V2-3's 0.5 pw); 22.5–32.5 pw for the volume.
**Declared shift:** none. **Checks:** the 25 `v.` keys of V02 §3.10.5 equal V07 §2.4's class rows (script); every J-V2,
T-V2 and BCR-V2 id cited is defined (script; J-V2.1 – J-V2.97); every cross-volume section cited exists (V03 §3.7.1's tomb
door, V07 §2.4 and J-V7.82 / J-V7.95, V11 §2.9, §3.22, §3.24.0, §3.24.3, V12 §2.13, §3.7.1 – §3.7.6, §3.11, T-V12-9,
T-V12-20); `doc_checks.py` with the base's headings (receipts `scratchpad/volumes/rcV2r2/dc_before_h.txt` on the pre-round
backup and `dc_after_h.txt`): C1 0, C2 0, C4 0, S1 0; C3 621 unreviewed before and after; S2 101 → 114, the 13 new hits all
volume-qualified pointers the checker reads as base ones ("V12 §3.11" ×9, "V11 §3.22" ×3, "V12 §2.13" ×1). **CONFIRMED**
by reading and by executed script (the key sets, the ids, the checks); **PLAUSIBLE** only that V12's runs, at four cells
each, reach every V02 §7.4 bar (SP-V2-3 decides it, with V12's fallback).

### Continuation (2026-09-29, re-issued task)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r2; covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane with eight issues. Five of them are the 04:50
landing's and were re-checked in the live text, not redone. The other three were raised at 09:14 by
`seam-stage2-3-r1.md`'s continuation, after that landing, and all three are **FIXED** here: S23R1-16 and S23R1-17
(majors) and S23R1-23 (minor). None was found invalid and none is on the fix list. Backup
`scratchpad/volumes/rcV2r2c/V02-pre-r2c.md` (md5 8c08b116…).

| issue | severity | what changed (where) |
|---|---|---|
| S23R1-16 | major | V02 §8.5's M3a-V2 content cell ships the `PorchKindRow`s with M3a's `composition.json` (data only: V01's entrance reserve reads `widthM`, `depthM` and `outside` from M5, V01 §3.8.2 step 5; the porch itself is composed from M6b); V02 §1b's `composition.json` row names the reserve as a consumer (V01 §3.8.2 step 5 and V01 §3.8.3's digest); V02 §3.10.10's small-tables register line says the M3a-V2 seat writes the porch rows' entries (SCC-39's rule: the seat that ships a cell writes its entry); J-V2.104 (a) |
| S23R1-17 | major | item 303's heading gains "(its hole sentence from M3a, with item 229)", and a build note says the hole sentence is built at M3a and the rest at M6, names the readers (T-V2-42; V01's hood-pin sites, T-V1-26 and T-V1-54 at M5; V03's court openings at M6-P) and declares the one-time retyping of a base template's hole at M3a (§13.3); item 229's list and V02 §10's opening name item 303's hole sentence among the parts M3a brings (same-shape sweep); V02 §3.5's arena floor cites "item 303's hole sentence, built at M3a"; V02 §8.5's M3a-V2 cell adds item 303's typing of every inner ring of a footprint face as a `court` `YardPart` (worded so to clear doc_checks' C4 list check); V02 §8.3's M6a cell says court typing is already built at M3a-V2; T-V2-42 gains the clause "its floor one `court` yard part from M3a", and its V02 §3.10.10 registration gains that statistic; J-V2.104 (b) |
| S23R1-23 | minor | V02 §1b's consumer cells: `BaseWing.role`/`key` add V01's `hatched` stack ties (V01 §5.1.3); `BaseWing.on`/`solid` add V01's `hatched` stack order and tier shadows (V01 §5.1.3; X24); family `ovalCourt` adds V01's hood-pin sites (V01 §3.8.2 step 1: no pin on the arena floor) |

**New:** decision J-V2.104. **Effort:** unchanged (five authored data rows moved to an earlier milestone, and one sentence of
S11's yard partition moved inside M3a-V2's 2–2.75 pw). **Declared shift:** a hole in a base footprint template whose kind
the yard rows set otherwise before M3a is retyped `court` once at M3a (item 303's build note, §13.3); massings are
unchanged, so T-V2-50 is unaffected. **Checks:** the five earlier issues' fixes found in the live text (the `v.` keys of
V02 §3.10.5, the register check at the four exits, V12's `reference` run for `FM`, T-V2-50's overlays, V11 C1–C3b and
`capPerSettlement`); every J-V2, T-V2, BCR-V2 and X id cited is defined (script: J-V2.1 – J-V2.104, T-V2-1 – T-V2-53,
item 216 – item 231, X1 – X33); the V01 and V03 places cited exist (V01 §3.8.2 steps 1 and 5, V01 §3.8.3,
V01 §5.1.3, T-V1-26, T-V1-54, J-V1.75, V03 §3.6 O1 (b)); the other lanes' markers are unchanged in count; `doc_checks.py
--heads docs/ARCHITECTURE.md` (receipts `scratchpad/volumes/rcV2r2c/dc_before_h.txt` on the backup and `dc_after3_h.txt`):
C1 0, C2 0, C4 0, S1 0 before and after (a first draft's C4 hit on the M3a-V2 row, a generic place-word list, was cleared by
rewording); C3 710 → 711 unreviewed, the one new hit this note's own PENDING line; S2 154 → 154. **CONFIRMED** by reading
at source and by executed script; **PLAUSIBLE** only that no base template's hole was typed other than `court` before M3a
(the diff report of the declared shift settles it).

## Reconciliation round 3 (volumes/reconcile-V02-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r3; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against the 9 seam issues routed to it by `docs/volumes/critique/seam-stage2-3-r2.md`,
`seam-settlements-r2.md` and `seam-content-calibration-r2.md` (0 blockers, 3 majors, 6 minors). All 9 are **FIXED**; none
was found invalid, none is left on the fix list, none carries a variation (SR2-10 and SCC-71 name one stale record and
take one text). Each changed passage carries "reconciliation round 3" or the issue id.

| issue | severity | what changed (where) |
|---|---|---|
| S23R2-01 | major | item 370's datum clause: every ground wing's samples are `levelledGroundCm(doc, key, p)` (V05's item 309) at its vertices and centroid, and every other ground sample of the datum and *Basements* (the fall under the footprint, the raised crypt's lowest sample) is the same reader's, applied after file f item 309's ground part; item 231's current quote and added text ("so `levelledGroundCm` reads the wing's own terrace, never the platform across the wall"); V02 §3.15.2 step (1); V02 §3.17 (a); J-V2.72's amendment; V02 §1b's new `levelledGroundCm` row (producer S10–S11's levelling; consumers `deriveBase`, `rebaseStack`'s ground wings, the dig floor, the basement gate's fall, the raised crypt's sample) and the `rebaseStack` row; V02 §1c's new §4.7 S10–S11 row; T-V2-51 lettered (a)–(c) with (c) `baseCm − plinthCm` = the maximum of `levelledGroundCm` over the wing's samples within 1 cm; J-V2.98 |
| S23R2-03 | major | item 371's last clause: `Basement.access` `external` for a walk-out or where no ground wing reaches storey 0 (every wing standing on no other wing solid, by `storeyRange`), its door by V03's tomb-door rule (V03 §3.7.1), with the base's §10.2 `basementAccess` comment amended to match (both quotations found once in `docs/ARCHITECTURE.md`); V02 §3.15.3's sentence (a storeyed annex or façade ring joins by its core or the trapdoor fallback, never outside); IN-V02-2 (a) records the text as applied, quoting no critique; T-V2-44's *Basement access* clause on the stepped temple with a storeyed ground annex and on the all-solid temple; J-V2.99 |
| SCC-52 | major | item 376's scope sentence: `FM` resolves only the cells carrying a `presets.FM` entry — `composition.json`'s and V11 §3.24.0's item-110 chance and offer cells (0) — sets `fantasyShapes` on, zeroes no `extension` cell and changes nothing else (word for word file f item 376's note, checked after whitespace normalisation); V02 §3.2 step 5; V02 §1b's `FM` row; V02 §1c; V02 §3.10.8's lead; J-V2.100 |
| S23R2-07 | minor | (a) V02 §3.17 (a)'s walk-out sentence points at V03's item 242 (a); IN-V02-2 (b) notes the edit; (b) V02 §3.7 quotes W2 as it stands ("On every side of every wing, V02's `facadeBays(wing, side, bayM)`") and states the three-argument signature V02 §2.4 declares, as V02 §1b's row now does; (c) X30's quote and fallback cell and V02 §13's round-1 sentence read "applied by V03's reconciliation round 2 (V03 RC2.1–RC2.3)" |
| S23R2-08 | minor | V02 §1b's resolution-chain row adds V03's A1 (3) and slot order as readers of `composition.classFamily` for a `v.` key without a programme row (V03 §2.4; J-V3.111); V02 §3.10.5's lead says so and that a key change changes that village building's rooms as well as its massing |
| SR2-10 = SCC-71 | minor | X13 and J-V2.56: the `templateFamily` column was taken by V07 for the budget rows only (J-V7.82 as amended; J-V7.101), read at the chain's step 4 after step 3; `composition.classFamily` stays the one source of the village classes' composition keys, read first; V02 §3.10.5's lead cites the amended J-V7.82 |
| SCC-58 | minor | new V02 §3.10.10: one register line per column family of `composition.json` — cells, method and due milestone, metric (`bldg.area`, `fm.*`, `tier.count`, `deck.buildings`, `crypt.present`, `time.model`, `bar.T-V2-<n>`) and the fallback this volume states, else V12 §3.11's panel rule; the code-read `FM` entries, the two options and the keys and laws take no entry; V02 §2.3 points at it; X33 (V12's `bar.<barId>` family, with its pre-decided fallback); J-V2.101 |
| SCC-59 | minor | V02 §2.3: only a `presets.FM` **measured-rate** entry is set by V12's `reference` run; the code-read `FM` entries (the rich rows' `families`, `sunBias` 0.5) keep their `ref:… (code)` provenance and move by no run |

**The other lanes' files this round.** `docs/volumes/V03-interiors.md`: item 242's quote of V02 §3.17 (a)'s walk-out
sentence brought to this round's words (one exact-string edit after V03's round 3 landed at 06:01; md5 884a2a8b… →
69209c71…; backup `scratchpad/volumes/rcV2r3/V03-before-rcV2r3.md`; logged). File f: item 376's note and item
309's ordering note were written by volumes/reconcile-BASE-F-r3 before this lane's check and match this
volume's item 376 and item 370 texts; item 371 needs no note.

**New:** decisions J-V2.98 – J-V2.101; cross-volume item X33; V02 §3.10.10; T-V2-51 (c) and T-V2-44's *Basement access*
clause. **Effort:** unchanged (the reader swap in `deriveBase` and `rebaseStack` and the register lines are inside M3a-V2's
and the landing seats' existing lines); 22.5–32.5 pw for the volume. **Declared shift:** none — `levelledGroundCm` lands
with item 110 (a)'s levelling at M3a (file f item 309 before items 370 and 231), so no shipped document ever sampled a
levelled plot's raster; with the `terrace` switch off (V11 §3.24.0) no platform exists, the reader returns the raster
and every datum is byte-identical (T-V2-50 unchanged). **Checks** (receipts under `scratchpad/volumes/rcV2r3/`): every
edit an exact-string replacement with its anchor asserted unique (`apply.py`, `b0.py` – `b5.py`); every `J-V2`, `T-V2`,
`BCR-V2` and `X` id cited is defined (J-V2.1 – J-V2.101, T-V2-1 – T-V2-53, item 216 – item 231, X1 – X33); item 371's two
new base quotations found once in `docs/ARCHITECTURE.md` (md5 01fea21f…); item 376's sentence equals file f item 376's
after whitespace normalisation; every cross-volume anchor cited exists (V05's item 309, V03 §3.7.1, J-V3.88, A1 (3), 2.4,
J-V3.111, RC2.1–RC2.3, V07's J-V7.82 and J-V7.101, V11 §3.24.0 and T-V11-21, V12 §3.4.2, §3.4.4, §3.7.5, §3.7.6, §3.11,
J-V12.54, J-V12.64, the panels M4-110 and V4-U5); `doc_checks.py` with the base's headings on the pre-round backup and
after, on today's corpus (`dc_before_h.txt`, `dc_after_h.txt`): C1 0, C2 0, C4 0, S1 0 before and after; C3 626 → 642
unreviewed, the 16 new 3-grams ordinary phrasing, section-number runs and the reference build's citation label
already used in V02 §3.10.8; S2 125 → 138, the new hits volume-qualified pointers the checker reads as base ones ("V12 §3.11",
"V02 §3.17") and the round-3 ledger's V2-local shorthand. (The pre-round file scores C3 626 and S2 125 today against round 2's 621
and 114: corpus and heading drift between the runs, the file unchanged.) **CONFIRMED** by reading and executed script
(the anchors, ids, quotations, text identity, cross-references, checks); **PLAUSIBLE** only that the five Fantasy Manor
families' `MassingFamilyRow`s carry `ref:` provenance (read from V02 §2.3's comment, not a compiled row) and that T-V2-51
(c)'s 1 cm holds on the built sampler (by construction: the samples and the maximum are the same reader's).

### Continuation (2026-09-29, re-issued task)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r3; covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane with nine issues. Five of them are the 06:08
landing's and were re-checked in the live text, not redone: X13 and J-V2.56 as V07 amended J-V7.82; item 376's
scope sentence and V02 §3.2 step 5; V02 §3.10.10's lines per column family; V02 §2.3's measured-rate rule. The other four
were raised after that landing — S23R2-11, S23R2-12 and S23R2-14 at 10:06 by `seam-stage2-3-r2.md`'s continuation,
SCC-R2C-7 at 10:10 by `seam-content-calibration-r2.md`'s — and all four (minors) are **FIXED** here. None was found
invalid and none is on the fix list. Backup `scratchpad/volumes/rcV2r3c/V02-pre-r3c.md` (md5 bd45a3b4…).

| issue | severity | what changed (where) |
|---|---|---|
| S23R2-11 | minor | item 230's New text: a building with no storeyed wing at all "has no plan above the ground — no level at or above it and no room there; its basement storeys and the heads of its hosted accesses are planned as V03 §3.1 states — and its main entrance opens nothing"; J-V2.83's parenthesis; T-V2-45's clause ("its plan has no level at or above the ground"); same-shape sweep: X18's "no plan without a storeyed wing" |
| S23R2-12 | minor | item 371's *Basements* door clause: "its door then at V03's `basementDoor(b)` (V03 §3.7.1: a retaining wall's side first, else the tomb door)", with the reason in its parenthesis; V02 §3.15.3; IN-V02-2 (a)'s two quotations; J-V2.99; T-V2-44 ("its door at `basementDoor(b)`"); same-shape sweep: item 371 (c)'s step-5 root clause ("a walk-out's, or that of a building with no storeyed ground wing — both at volume V03 §3.7.1's `basementDoor(b)`") and X18's crypt clause |
| S23R2-14 | minor | V02 §1b's stack-helpers row: kind "derived functions, exported by `@plat/plots`, built at M3a-V2 with the item 110 fold"; consumers add V03's eager facts at M3a (`ground(b)` and `floorCm`, V03 §3.3; `basementDoor(b)` through `stairChain`, V03 §3.7.1) and through them V01's entrance reserve; V02 §2.6's derived-at-read heading; V02 §8.5's M3a-V2 cell names the four helpers, and its *Dependencies* sentence has V03's eager facts land after them in M3a; same-shape sweep: `rebaseStack`'s §1b row names its package. No estimate moves |
| SCC-R2C-7 | minor | V02 §3.10.10's registration paragraph: each setting's `preset` `'default'`, V12 §2.1's `PresetArm` (none of V02's eleven bars generates its towns under a parity preset; J-V2.105 (c)) |

**New:** decision J-V2.105. **Effort:** unchanged (the four helpers were already inside M3a-V2's work). **Declared
shift:** none — base wording, homes and a registration field; no generated output changes (the door is V03's
function as that volume states it). **Checks** (receipts under `scratchpad/volumes/rcV2r3c/`): every edit an exact-string
replacement with its anchor asserted unique (`e0.py` – `e3.py`); every `J-V2`, `T-V2` and `BCR-V2` id cited is defined
(`ids.py`: J-V2.1 – J-V2.105, T-V2-1 – T-V2-53, item 216 – item 231; X1 – X33); the markers counted (seam S23R2-11 in
four texts, S23R2-12 in seven, S23R2-14 in six); item 371's and item 230's current quotations unchanged and found once in
`docs/ARCHITECTURE.md` (md5 01fea21f…); the cross-volume anchors cited exist (V03 §3.1, 3.3, 3.7.1 and its §1b rows, V12
§2.1's `PresetArm`, the seam round's J-S23R2.10); `doc_checks.py --heads docs/ARCHITECTURE.md` on the backup and after
(`dc_before_h.txt`, `dc_after_h.txt`): C1 0, C2 0, C4 0, S1 0 before and after; C3 711 → 718 hits (673 → 680
unreviewed), the new 3-grams ordinary phrasing ("of a building with no", "for a building with no"), section-number runs of
the new pointers and this note's PENDING line, three older hits gone with the replaced wording; S2 154 → 154, the same hits. **CONFIRMED** by reading at source and by executed script;
**PLAUSIBLE** only as V02 §12's continuation paragraph says (V03's wording of S23R2-10, live in its own lane).

## Reconciliation round 4 (volumes/reconcile-V02-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r4; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against the 3 seam issues routed to it by `docs/volumes/critique/seam-stage2-3-r3.md`
and `seam-content-calibration-r3.md` (0 blockers, 2 majors, 1 minor). All 3 are **FIXED**; none was found invalid, none is
left on the fix list. S23R3-03 carries one recorded variation and one widening (below). Each changed passage carries
"reconciliation round 4" or the issue id.

| issue | severity | what changed (where) |
|---|---|---|
| S23R3-03 | major | item 371's *Basements* condition in V03's term: `external` "for a walk-out, or where no wing standing on no other wing is storeyed (volume V03 §3.3's `ground(b)` absent; V02's `storeyRange` gives each such wing no storey)" — never "storey 0"; a new *Extended by reconciliation round 4* paragraph: (a) §13.2's T29-4 → "for an `external` access (a walk-out, or a building with no storeyed ground wing), an outside stair"; (b) J-A29.25's access clause gains "or where no ground wing is storeyed (§2.6 *Basements*; its door volume V03 §3.7.1's)" and its restated door clause points at step 3's point; (c) the plan rung's step-5 root clause names an `external` basement's outside door, the tomb door included; (d) the six base texts placing or checking the basement by "the ground storey" (`Basement.ring`'s comment, the terrain gate's §5.3 list, §5.3's row, §7.4's warp check, §10.2's two `cellar` comments) read the ground wings of *Basements*; step 3 and T28-3 left to V03's item 578; V02 §1c's new row; V02 §3.15.3's condition in the same words; T-V2-44's *Basement access* clause adds "T29-4 holds on both temples"; J-V2.99's round-4 note |
| SCC-74 | major | V02 §3.10.10 gains *The bars' registrations*: each `bar.T-V2-<n>` a line names is registered as a V12 `BenchBarDef` by the seat landing the milestone that writes the line's entry, in the same change — `owner` `'V02'`, `stages` `['S11']`, towns, tier and statistic per bar in an eleven-row table (T-V2-22, -28, -29, -30, -32, -36, -37, -42, -46, -47, -51), one registration per CI tier where a bar runs in two, a clause not yet built reading −1 and left out of the verdict in T-V2-36, -42 and -46; V02 §1b's registrations row; X33 reads "landed (V12 §2.1, J-V12.65); V02 owes the registrations of V02 §3.10.10", fallback "none"; J-V2.102 |
| SCC-85 | minor | `sunBias` 0.5 in the `MFCG`, `FTG`, `VG` and `FM` presets (V02 §3.2, §3.10.9's row), the `MFCG`, `FTG` and `VG` entries `own` with the note `fixed: the parity neutral` (V11 §2.2's rule (a)), the `FM` entry code-read; V02 §2.3 and a new V02 §3.10.10 no-entry row say so; T-V2-37 checks the compiled value 0.5 under each of the four presets; J-V2.38 names them |

**Variation (S23R3-03 (ii)).** The issue's added clause for J-A29.25 cites "item 371"; the request writes "§2.6
*Basements*" instead, because the base cites the home of a rule, never a request id (the base holds none), and J-A29.25's
own last cell is §2.6. **Widening (the same-shape sweep, J-V2.99).** A scan of every "walk-out" and "ground storey" in
`docs/ARCHITECTURE.md` found, beside the two texts the issue names, J-A29.25's door clause, the plan rung's step-5 root
clause and six basement-place texts that a solid stack's basement would fail or read as its shrine; all are in item 371 (b)
– (d), each current text found once. Step 3 and T28-3, found by the same scan, are S23R3-01's and were left to V03.

**The other lanes' files this round.** None edited. Logged for volumes/reconcile-V03-r4 (running): the split — step 3 and
T28-3 in its item 578, J-A29.25, step 5's root clause and the "ground storey" texts in item 371. Logged for
volumes/reconcile-BASE-F-r4 (running): item 371 needs no text (it cites item 371 by id), its *Also touches* may name §5.3,
§7.4, §10.2, §13.2 and J-A29.25.

**New:** decision J-V2.102; V02 §3.10.10's registration paragraph, its table and its parity-neutral row; V02 §1b's
registrations row; V02 §1c's basement row. **Effort:** unchanged (the eleven registrations sit inside the landing seats'
existing test code; the base edits are the coherence pass's). **Declared shift:** none — item 371 (d) reads as before on
every building none of whose ground wings is solid, and stepped buildings arrive with M3a; `sunBias`'s `VG` entry equals the
value `VG` would need for the unbiased coin. **Checks** (receipts under `scratchpad/volumes/rcV2r4/`): every edit an
exact-string replacement with its anchor asserted unique (`ed.py`, `e0.py` – `e6.py`); every `J-V2`, `T-V2`, `BCR-V2` and
`X` id cited is defined (J-V2.1 – J-V2.102, T-V2-1 – T-V2-53, item 216 – item 231, X1 – X33; `ids.py`); the twelve base
quotations of item 371 (the round-3 two and this round's ten) found once in `docs/ARCHITECTURE.md` (md5 01fea21f…) after
whitespace normalisation, and none quoted by another volume or by file f or g; `doc_checks.py` with the base's headings on
the pre-round backup and after, on today's corpus (`dc_before_h.txt`, `dc_after_h.txt`): C1 0, C2 0, C4 0, S1 0 before and
after; C3 648 → 671 unreviewed (this note included), the 23 new runs ordinary phrasing, section-number runs, base names
the request quotes (`ring: Polygon`, "the plan rung's step") and the PENDING lines; S2 145 → 151, the new hits
volume-qualified pointers the checker reads as base ones ("V12 §3.11", "V02 §3.12"). (The pre-round file scores C3 648 and S2 145 today against round 3's
642 and 138: corpus and heading drift between the runs, the file unchanged.) **CONFIRMED** by reading and executed script
(the anchors, ids, quotations, V12's `BenchBarDef` fields and bar map, V11 §2.2's zeroing, the checks); **PLAUSIBLE** only
the no-shift reading of (d) and whether a mirror-coin family draws under `VG` at all (V02 §12).

### Continuation (2026-09-29, re-issued task)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r4; covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane with four issues. Two of them (major; minor) are the 07:21 landing's and
were re-checked in the live text, not redone: V02 §3.10.10's *The bars' registrations* with its eleven-row table, V02 §1b's
registrations row and X33 "landed", fallback "none"; `sunBias` 0.5 under `MFCG`, `FTG`, `VG` and `FM` (V02 §3.2, §3.10.9's
row, the §3.10.10 no-entry row, T-V2-37, J-V2.38). The other two were raised after that landing, at 11:10 by
`seam-stage2-3-r3.md`'s continuation, and both (minors) are **FIXED** here. None was found invalid and none is on the fix
list. Backup `scratchpad/volumes/rcV2r4c/V02-pre-r4c.md` (md5 0c432111…).

| issue | severity | what changed (where) |
|---|---|---|
| S23R3-14 | minor | item 230's New text: "a building with no storeyed wing at all (a solid monument, a sealed stack whose every wing is solid) has no plan above the ground — …; a sealed stack (V02's stair form `none`) that carries a storeyed tier or shrine keeps that wing's plan, reached by nothing (volume V03 §3.3 S6 (e), `W_TIER_UNREACHED`), and its main entrance, on tier 0's front side, opens nothing;"; T-V2-45's clause: "its plan has no level at or above the ground where every wing is solid — a storeyed tier or shrine on it planned and flagged `W_TIER_UNREACHED` (V03's T-V3-28)"; J-V2.83's parenthesis names the sealed shrine; same-shape sweep: V02 §7.7's sealed stack fixture in two forms (`tiers { stairs: 'none' }` on the stepped temple, and with `top: 'flat', solid: 'all'`), so both branches of T-V2-45's clause have a subject; X18, ST7's hint, V02 §4.6's `none` and ST5 already read so and are unchanged |
| S23R3-17 | minor | V02 §2.6's declaration: `rebaseStack(b: Building, ground: (p: PointCm) => Cm /* levelledGroundCm(doc, key, ·) on the building's document and arena key (V05's item 309; item 370, item 231), never the raster's TerrainSampler */): void`; step (1) of its comment "by §2.6's terrain rule as item 370 words it (every sample by `ground`)"; same-shape sweep: its comment's closing clause (each re-basing path passes `ground` built from its own document and the plot's arena key) and V02 §1b's `rebaseStack` row (the samples through its `ground` parameter); V02 §3.15.2 already reads so and is unchanged; the base's `BuildingInput.terrain` stays the raster sampler for the fall line (V02 §3.5 M2), which is natural relief, not a datum |

**New:** decision J-V2.106. **Effort:** unchanged (a wording and a typed parameter already stated in the comment; the second
sealed fixture is one more edit on an existing fixture). **Declared shift:** none — no generated output changes (V03
already plans the sealed shrine by its own S6 (e), and `rebaseStack`'s samples were already `levelledGroundCm` by item 370).
**Checks** (receipts under `scratchpad/volumes/rcV2r4c/`): every edit an exact-string replacement with its anchor asserted
unique (`e0.py` – `e4.py`); every `J-V2`, `T-V2`, `BCR-V2` and `X` id cited is defined (`ids.py`); item 230's current
quotation unchanged and found once in `docs/ARCHITECTURE.md` (md5 01fea21f…); no other volume and no file f or g item quotes
the changed texts; the cross-volume anchors cited exist (V03 §3.3 S6 (e), T-V3-28, V05's item 309 signature, the base's
`PointCm` and `TerrainSampler`); `doc_checks.py --heads docs/ARCHITECTURE.md` on the backup and after (`dc_before_h.txt`,
`dc_after_h.txt`) as the ledger's RC5.5 line records. **CONFIRMED** by reading at source and by executed script;
**PLAUSIBLE** only as V02 §12's continuation paragraph says (V03's wording of S23R3-15 (b), live in its own lane).

## Reconciliation round 5 (volumes/reconcile-V02-r5, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V02-r5; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against the 1 seam issue routed to it by `docs/volumes/critique/seam-stage2-3-r4.md`
(0 blockers, 0 majors, 1 minor). It is **FIXED**; none was found invalid, none is left on the fix list. Each changed passage
carries "reconciliation round 5" or the issue id. Backup `scratchpad/volumes/rcV2r5/V02-pre-r5.md` (md5 34f5b1f5…).

| issue | severity | what changed (where) |
|---|---|---|
| S23R4-02 | minor | (a) V02 §1b's stack-helpers row: V03's eager readers now read "`basementDoor(b)` (…, V03 §3.7.1) and `stackAccessDoor(b, a)` (`stairChain`: stair 0 and its approach strip, V03 §3.7.2 (1); seam S23R4-02)"; (b) a new V02 §1b row, stair 0's **approach strip** of a stepped stack — a derived region, never stored, its one statement kept in V02 §4.6's ground-wing bullet (the stair reserve's width, `landingM` deep in front of stair 0's foot; under `internal`, `landingM` in front of the main entrance; none under `none`); fed by `stairChain`'s stair 0 with its ring and `RoofSpec.high`, the main entrance under `internal` and `landingM`; feeding V02 §4.6's ground-wing placement (`addRange`, `addTower`, `backRange`) and V03's `basementDoor(b)` rule 2 and `stackAccessDoor(b, a)`; hook §2.6 `Building`; (c) V02 §8.5's M3a-V2 cell ("… `ground(b)`, `floorCm`, `basementDoor(b)` and `stackAccessDoor(b, a)`, V03 §3.3, 3.7.1 and 3.7.2 (1); seams S23R2-14, S23R4-02)") and its *Dependencies* sentence ("(`ground(b)`, `floorCm`, `basementDoor(b)`, `stackAccessDoor(b, a)`; V03's PE)", seams S23R2-14, S23R4-02); (d) V02 §12's round-4 continuation PLAUSIBLE item is CONFIRMED, quoting V03's S6 ("a sealed stack whose every wing is solid — one carrying a storeyed tier or shrine is planned and flagged by (e)"); same-shape sweep: V02 §1b's constants row names the approach strip among `landingM`'s consumers, and V02 §12's round-3 continuation PLAUSIBLE item (V03's storey-less plan) is CONFIRMED at source (V03 §3.3 S6 and §3.1 step 2) |

**Variations (recorded, J-V2.107).** Row (b)'s first cell adds "of a stepped stack" (the strip exists only where
`stairChain` or the `internal` form gives it a foot), its kind cell adds "stated once in V02 §4.6's ground-wing bullet" (the
single-source pointer), and its fed-by cell adds "(its foot the side opposite its head)", the reading `stairChain`'s `head`
and `stairTreads`' run already give (V02 §2.6). The §12 items keep their round's text and add the settled verdict after it,
marked "formerly PLAUSIBLE". The seam's required text is otherwise applied word for word.

**The other lanes' files this round.** None edited, nothing owed: V03's `stackAccessDoor(b, a)` (3.7.2 (1)) and its
§1b row already name V02's `stairChain` and the approach strip "as V02 §4.6 bounds it", so the wire now has both ends.

**New:** decision J-V2.107; V02 §1b's approach-strip row. **Effort:** unchanged (wiring rows and records; `stackAccessDoor`
is priced inside V03's PE, J-V3.120). **Declared shift:** none — no mechanism, constant or output changes.
**Checks** (receipts under `scratchpad/volumes/rcV2r5/`): every edit an exact-string replacement with its anchor asserted
unique (`apply.py`, `apply2.py`); every `J-V2`, `T-V2`, `BCR-V2` and `X` id cited is defined (J-V2.1 – J-V2.107, T-V2-1 –
T-V2-53, item 216 – item 231, X1 – X33; `ids.py` → `ids.out`); no other file under `docs/` outside the critiques quotes the
changed V02 texts; the cross-volume anchors cited exist in V03 (md5 735035b5…: 3.7.1's rule 2 reading stair 0's
approach, 3.7.2 (1)'s `stackAccessDoor(b, a)` reading `stairChain` and the strip "as V02 §4.6 bounds it", its §1b row, S6's
sealed-stack and storey-less wording, §3.1 step 2); the diff against the backup (`diff.txt`) touches only this round's
lines; `doc_checks.py --heads docs/ARCHITECTURE.md` on the backup and after (`dc_before_h.txt`, `dc_after_h.txt`): C1 0,
C2 0, C4 0, S1 0 before and after; C3 725 → 734 unreviewed, the nine new runs section-number runs ("3.7.2 (1)"), one ordinary
phrase and the PENDING lines; S2 154 → 154. **CONFIRMED** by reading at source and by executed script (the anchors, ids,
V03's texts, the checks); nothing in this round rests on reasoning alone.

## Finalization (volumes/_finalize, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

After six reconciliation rounds the finalization fixed, in place, the one round-6 issue this volume owns: **S23R6-02** (major, seam-stage2-3-r6). The raised form's lift and the crypt-only half raise now act on **the ground wings over the basement's ring**, not on the crypt's seed wings: item 226's `kind` comment, its *Basements* sentence and its round-1 extension (a)–(c); V02 §3.14.5 (c) and (d), including the *Inside a solid platform* sentence; §3.15.3's wet-ground sentence; §1b's crypt-seed and half-raise rows (the lift row now names V03's extent, the stair-entered reading, as an input); the heights table's lift row; J-V2.91's and T-V2-52's parentheses; and T-V2-36, which gains the stepped great temple with a storeyed annex on a `flood` plot and an author's crypt ring under a nave on a `low` plot. New decision **J-V2.108**. No declared shift: the crypt parts are M6-U's, unbuilt. File f item 226 carries item 226 by reference; its note now quotes the new clause. **CONFIRMED** by execution: every edit an exact-match replacement with its match count asserted (the phrase in §1b's `cryptSeedWings(b)` row and §3.14.5 (c) replaced in both places). **PLAUSIBLE:** that no other sentence keys the lift on the seed wings (checked by grep for "seed wings": one more lift sentence, S11's `baseCm` note, was aligned in the same pass; the remaining uses name the seed itself or a derived crypt, which stays under its seed wings by V03 §3.7.4 step 2).
