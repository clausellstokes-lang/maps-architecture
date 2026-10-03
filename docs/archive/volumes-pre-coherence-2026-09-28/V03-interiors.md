# V03 — Interiors: floor plans, rooms, households and furnishing (the plan rung, Dwellings-class)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V3-interiors; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r6; covered by the whole-design retrovalidation (J84).

**PROGRESS** (one line per section; planned | done). First draft (volumes/V3-interiors, 17:00): every section done.
Revision against docs/volumes/critique/V03.md (volumes/revise-V3, 2026-09-28; 64 findings V3C-01 … V3C-64):
- 0 In plain words — done (J111 wording applied at the 22:15 resume; item 110's paragraph in the second round)
- 1 Scope, base hooks consumed, out of scope — done
- 1b Wiring table — done
- 2 Data model — done (J111: `Basement.crypt`, origins, `column`, glyphs, `AccessHostRow.cause`, crypt rows removed; item 110 in the second round)
- 3 Generation — done (A1 resolution, A2 lists, A5 reorder, A6 shared access, anchors, cut machine, per-piece patterns, openings, windows on façade bays, heads, crypt, no-abort ladder, creation indices, re-cuts, buildings below ground)
- 4 Editing — done (bends, new attribute paths, basement consequences, carries, New random per rung, click and switcher, panel ways down, room numbers, why provider)
- 5 Rendering, labels, exports — done (detail ladder, porch, wall shade, heads, crypt, labels, all-storeys sheet, exports, 5.4 concealment at a public key)
- 6 Performance budgets — done (view cap, chain row, cathedral, rank pass)
- 7 Tests and acceptance bars — done (T-V3-1 – T-V3-26, new fixtures, the translated A/B fixture, parity row (d′); T-V3-27 – T-V3-34 and parity (e) in the second round)
- 8 Build plan — done (P0–P6, 17–23 pw, reconciled with the parity matrix; 18.75–25.5 pw after the second round; 18.5–25.25 after reconciliation round 1, S23-20; the PE row, 0.75–1 of it, built within M2b and M3a after reconciliation round 4, S23R3-05)
- 9 Decisions — done (J-V3.1 – J-V3.79; J-V3.80 – J-V3.100 in the second round)
- 10 Base change requests — done (BCR-V3-1 – BCR-V3-24; BCR-V3-25 – BCR-V3-29 in the second round; every quotation checked against the base, scratchpad receipt)
- 11 Owner questions — done (one, product order, unchanged)
- 12 CONFIRMED versus PLAUSIBLE — done
- 13 Fix list — done (nothing deferred; cross-volume hand-offs listed)
- critique disposition table (appended to critique/V03.md) — done (64 FIXED, 0 INVALID, 0 FIX-LIST)

Second round (volumes/revise-V3, 2026-09-29), against critique/V03.md §12 — the item-110 addendum V3C-65 … V3C-84 (1
blocker, 11 majors, 8 minors), read with critique/V02.md §11 (V2C-47, -53, -55, -57, -59, -61, -66, -67, -68) and
critique/V04.md §8 (C4-110-1, -8, C4-64), whose V03-facing parts this round designs against:
- R-110.0 ledger and plain words (§0) — done
- R-110.1 scope, hooks and wiring (§1, §1b) — done
- R-110.2 data model (§2.1–§2.5: `Entrance.storey`, the level reading, terraces, exposure, rows, lifecycle) — done
- R-110.3 generation (§3.1, §3.2, §3.3 datums, S5–S6, H2–H4, §3.4, §3.4a terraces, §3.6 O1 (d), O2 roots, W2, W4, §3.7, §3.9, §3.11, §3.12 (9)–(10)) — done
- R-110.4 editing (§4) — done
- R-110.5 rendering and exports (§5) — done
- R-110.6 budgets (§6) — done
- R-110.7 tests (§7: T-V3-27 … T-V3-34, extensions, parity (e)) — done
- R-110.8 build plan (§8) — done
- R-110.9 decisions (§9: J-V3.80 …) — done (J-V3.80 – J-V3.100)
- R-110.10 base change requests (§10: BCR-V3-25 … BCR-V3-29, BCR-V3-14 and -20 extended; quotations checked) — done
- R-110.11 owner questions, CONFIRMED/PLAUSIBLE, fix list and hand-offs (§11–§13) — done
- R-110.12 disposition table appended to critique/V03.md — done (20 FIXED, 0 INVALID, 0 FIX-LIST; §13 of the critique)

Reconciliation round 1 (volumes/reconcile-V03-r1, 2026-09-29), against critique/seam-stage2-3-r0.md (S23-11 … S23-16,
S23-18, S23-26, S23-27, S23-34, S23-36, S23-37, S23-39) and critique/seam-time-r0.md (ST-39):
- RC1.1 identity and lifecycle (§2.1 crypt comment, §2.2 cores, chimneys and room ids, §2.5 partName row) — done
- RC1.2 generation (§3.1 inputs, §3.2 A2 (4), (9) and (11), §3.3 half-basement datum, §3.4a terraces, §3.7.4–3.7.5 crypt trim and capped bays, W2) — done
- RC1.3 editing (§4.2 furniture bend and deck bend, §4.5 click by band and the rooms rung, §4.6 derivation order, `deckNoCellar`) — done
- RC1.4 tests, build plan, BCRs (T-V3-11, -13, -23 (h), -25, -30, -31; P1, P3, §8's M6-P; §11 Q1; BCR-V3-13, -15, -19, -28; new BCR-V3-30 (§16) and -31 (§14); §1b; §9 J-V3.101 – J-V3.110; §12) — done
- RC1.5 fix list hand-offs (§13) and the dated reconciliation note — done (appended at the file's end)

Reconciliation round 2 (volumes/reconcile-V03-r2, 2026-09-29), against the round-1 seam issues S23R1-01, -02, -03, -07,
-09 and SR1-06:
- RC2.1 the crypt seed by volume 2's `cryptSeedWings(b)` (3.7.4 step 1, BCR-V3-20, §1, §1b, §2.5, T-V3-23 (i); S23R1-01) — done
- RC2.2 windows on volume 2's `facadeBays` on every side (W2, 3.12 (9), §1, §1b, T-V3-5, J-V3.41; S23R1-02) — done
- RC2.3 exterior flights by volume 2's `stairTreads` (5.1, 5.3 JSON and glTF, §1, §1b; S23R1-03) — done
- RC2.4 village rows by their `v.` keys and the `composition.classFamily` fallback (2.4, 2.3, A1, A2 (4), §1b, T-V3-1, J-V3.111 – J-V3.112; S23R1-07, SR1-06) — done
- RC2.5 citations to landed texts (3.3, BCR-V3-15, -19, -30, §8, §12, §13; S23R1-09) — done
- RC2.6 §12, §13 and the dated reconciliation note — done (appended at the file's end)
- RC2.7 second brief (re-issued task, 2026-09-29 ~09:20): S23R1-24, `Basement.crypt`'s volume 1 reader named as T-V1-47 (§1b, §2.5, 3.7.4, J-V3.45); SR1-06 verified landed, not redone; §12, §13 and a dated note — done (appended at the file's end)

Reconciliation round 3 (volumes/reconcile-V03-r3, 2026-09-29), against the round-2 seam issues S23R2-04, -05 and -06:
- RC3.1 citations to volume 2's landed BCR-V2-33, -41 and -42 and its landed names (§1, 3.3's level reading, S6's root, 3.6 W2, 3.7.1's tomb door, 3.7.2 (0), H4, 2.4's arena row, §7's fixtures, §10's preamble, BCR-V3-25, -26, -27, §12, §13; S23R2-04, S23R2-05) — done
- RC3.2 W2's ground through volume 5's `levelledGroundCm` (3.6 W2, §1, §1b, §2.5's outside-ground row, §6, T-V3-30, BCR-V3-28, J-V3.113; S23R2-06) — done
- RC3.3 §12, §13 and the dated reconciliation note — done (appended at the file's end)

Reconciliation round 4 (volumes/reconcile-V03-r4, 2026-09-29), against the round-3 seam issues S23R3-01, -05 (majors),
-07 and -08 (minors):
- RC4.1 the basement's outside door as one function `basementDoor(b)` (3.7.1, 3.7.4, 3.7.6, 3.7.7, 3.9, §1, §1b, §2.5, 4.6, §6, T-V3-30, new BCR-V3-32, BCR-V3-27's text, J-V3.114 – J-V3.115; S23R3-01) — done
- RC4.2 the plan rung's eager facts built at their inputs' milestones (§8's PE row, P1, *Where in §16's order*, BCR-V3-30, §2.5's `Entrance.storey` migrate cell, T-V3-34, J-V3.116; S23R3-05) — done
- RC4.3 access heads in their derived reading (3.7.2 (7), 5.1, 5.3, T-V3-13; S23R3-07) — done
- RC4.4 §12's and §13's round-3 records (S23R3-08), this round's CONFIRMED/PLAUSIBLE and hand-offs, the dated note — done (appended at the file's end)

Reconciliation round 3, second brief (volumes/reconcile-V03-r3, 2026-09-29 ~10:15), against S23R2-10 (major) and S23R2-15
(minor) of critique/seam-stage2-3-r2.md's continuation and SCC-R2C-17 (minor) of critique/seam-content-calibration-r2.md's
continuation (the first brief's S23R2-04, -05 and -06 are history, RC3.1 – RC3.3):
- RC3.4 a building with no storeyed wing keeps its basement storeys and its heads; `AccessHead.storey` null with `door` (3.1 step 2, S6, 3.4a, A5 (b), A2 (10), O2, 3.7.2 (1), (4)–(7), 3.9, 2.1, 2.5, 4.5, 5.1, 5.3, §0, §1b, T-V3-22, T-V3-23 (e), T-V3-29, J-V3.91, J-V3.117, J-V3.119; S23R2-10) — done
- RC3.5 the level reading, `PlanGeometryRow` and `basementDoor(b)` wired to every reader (§1b; S23R2-15) — done
- RC3.6 the register lines of `roomProgram.json` and the bar T-V3-35 (2.4, §7, §8's exits, §1b, J-V3.118; SCC-R2C-17) — done
- RC3.7 §12, §13 and the dated note — done (appended at the file's end)

Reconciliation round 4, second brief (volumes/reconcile-V03-r4, 2026-09-29 ~11:25), against S23R3-09, -11, -12 (majors),
-15 and -16 (minors) of critique/seam-stage2-3-r3.md's continuation and SCC-R3C-8 (minor) of
critique/seam-content-calibration-r3.md's continuation (the first brief's S23R3-01, -05, -07 and -08 are history,
RC4.1 – RC4.4):
- RC4.5 the stack-hosted access's door as one function `stackAccessDoor(b, a)` (3.7.2 (1), 2.1, 2.5, §1b, 3.9, 5.1, §6, T-V3-22, §8's PE and P2, J-V3.117, J-V3.120; S23R3-09) — done
- RC4.6 the walk-out's outside door roots the basement's storeys (O2, 3.7.1, §1b, T-V3-30, J-V3.121; S23R3-11) — done
- RC4.7 T28-1 on the storey-less plan (BCR-V3-14, A5 (b), 2.3's `owed.tier`, §7, T-V3-23 (e), T-V3-29, J-V3.122; S23R3-12) — done
- RC4.8 wording and signature (BCR-V3-26 and S6, S23R3-15; `basementDoor(doc, key, b)` with §1b's rows, S23R3-16) — done
- RC4.9 the capacity's cells on PE's register line (2.4, A3, §8's PE and P6, new BCR-V3-33, J-V3.118, J-V3.123; SCC-R3C-8) — done
- RC4.10 §12, §13 and the dated note — done (appended at the file's end)

Reconciliation round 5 (volumes/reconcile-V03-r5, 2026-09-29), against S23R4-01, -03 (majors) and -06 (minor) of
critique/seam-stage2-3-r4.md and SCC-91 (major) of critique/seam-content-calibration-r4.md:
- RC5.1 the main entrance over an `external` basement stays on the ground storey (2.1, 3.6's *Entrance storeys* and O1 (e), §1b, 2.5, 4.6, §0, T-V3-30, BCR-V3-26, J-V3.124; S23R4-01) — done
- RC5.2 the basement's outside door off a church's crypt vault, the one crypt join of a storey-less building and the capped bays' arch as a forced edge (3.1 step 2, S6, 3.7.1, O2, 3.7.6, 3.9, §1b, 2.5, §6, §8's PE, 4.6, §0, T-V3-23 (e), (h), (j), BCR-V3-32, J-V3.125 – J-V3.126; S23R4-03) — done
- RC5.3 a storey-less stack's main entrance cited, not restated (S6, 2.1, BCR-V3-26, T-V3-28; S23R4-06) — done
- RC5.4 the `room` role's area on its column's register entry (2.4's first line and PE's row, the class-row note, A3, §8's PE, P1 and P6, BCR-V3-33's note, J-V3.118, J-V3.123; SCC-91) — done
- RC5.5 §12, §13 and the dated note — done (appended at the file's end)

Reconciliation round 6 (volumes/reconcile-V03-r6, 2026-09-29), against S23R5-01 (major), S23R5-02 and -03 (minors) of
critique/seam-stage2-3-r5.md and SCC-106 (minor) of critique/seam-content-calibration-r5.md:
- RC6.1 the stair-entered crypt, the whole basement of a crypt no stair reaches beside a storeyed wing, O2's crypt join keyed on it (3.7.4, O2, 3.7.6, 3.9, 3.1 step 2, S6, §1b, 2.1, 2.5, 4.2, §0, §7's fixture, T-V3-23 (j), §8's P2, BCR-V3-20, J-V3.126, new J-V3.127; S23R5-01) — done
- RC6.2 the vault closed to the rest of the basement under crypt stairs (O2, 3.7.5, the capped bays' citations, T-V3-23 (j), J-V3.126; S23R5-02) — done
- RC6.3 the entrance storeys re-derived on the basement's access, kind or floors, and the storey step's place in the draw order (3.6, 2.5, §1b, BCR-V3-26, T-V3-30, J-V3.124; S23R5-03) — done
- RC6.4 the `area` column's restatement should M6-P land after M-CAL's record (2.4's first register line, §8's P1 exit, J-V3.123; SCC-106) — done
- RC6.5 §12, §13 and the dated note — done (appended at the file's end)

## 0 In plain words

Click a building to select it and the plan panel lists its rooms (zoomed right out, at the whole town or one district,
that click first opens the district's detail and the panel, and the rooms follow with "Show plan"); double-click it (or
press "Show plan") and the map zooms
in until its floor plan is readable, one storey at a time: the rooms, the walls, the doors, the windows, the stairs, the
fireplaces with their chimneys, simple furniture shapes and a name in every room. The plan always fits the building you
already see — its outer walls are exactly the house's walls, its windows sit in the same rhythm as the façade and the
dormers on the roof, its stairs line up from the cellar to the attic, its chimneys come out of the roof where the
fireplaces are, and its front door is the door drawn on the street, under its porch.

The plan is written for the people who live there, not for the size of the house. The program first decides what the
building must hold — a smithy's forge, an inn's common room and guest rooms, a church's nave and chancel and its crypt
where it has one, and one home for every household living in it — and only then draws walls to fit. What a building
holds grows with the wealth of the quarter: a poor smith works a lean-to forge, a master smith has a shop front, a
counting room and a dormitory for his journeymen. A rich family's town house has a hall, parlours, chambers and small
staff rooms in the attic; when the quarter grows poor, the same house is re-cut inside into lodgings or one-room
apartments off a corridor, each family reached from the front door through a shared stair hall — never through a
neighbour's rooms — and nobody is ever left out. A building with several structures (an inn with its stable block, a
farm with its barn and byre) gives each structure the rooms that belong to it, and a brewer whose brewhouse and taphouse
stand apart gets a brewhouse in one and a taproom in the other.

Ways down live in the plan too. A cellar stair to the sewer, a stair down from a cemetery's chapel into the catacomb
under its burial ground and, where a church stands beside that ground, a door or stair from its crypt into the catacomb,
a shaft someone dug into a cave or an ancient ruin under the house, a well that broke through into a hidden chamber —
each is drawn where it is, and the panel says what it reaches and how it came to be ("dug when the house was built"). A
secret way down sits in its own hidden back room, so the ordinary cellar stays ordinary. The cathedral always has a
crypt, the largest in the town — on wet ground a crypt under a raised choir, entered from the nave, with stairs up to the
choir on either side; other churches have one where their row and their ground allow. Homes built underground — along
the sewers, in a cavern or inside an old ruin — have no windows and no chimneys through the rock; they burn lamps and
vent their smoke to an air shaft, or burn a brazier.

Stepped and hillside buildings are planned as they stand. A terraced palace or a tiered tower is a stack of tiers, each
standing on the one below: the plan gives each tier its own storeys at their true heights, carries one stair up through
as many tiers as it fits, and opens a door where the outside stairs arrive, so every room can be walked to. The flat roof
each setback leaves is a terrace you can step out onto, drawn with its parapet and exported as floor in the game scene.
A chimney from a lower tier keeps rising through the tiers above until it reaches open air. A stepped temple is solid
masonry with one small sanctuary on top: the plan draws that one room, reached by the great stair, and a crypt beneath is
entered by a door at the platform's foot; a temple whose steps end in a bare platform, with no sanctuary, has no room
above the ground at all, and its plan is the crypt beneath with that door (where the platform also holds a cellar, the door leads through it into
the crypt); where a storeyed annex stands beside the platform, the crypt is reached from the annex instead — down its
stairs into the cellar beneath it and through one door into the crypt, or straight down where the annex stands over it; on wet ground, where the crypt is raised, the annex stands raised over its cellar as a choir does over a raised crypt. A way down under a solid monument that has no
cellar shows as a small door in its foot. On a hillside of terraces a house backed against a retaining wall has no
windows or doors into the earth, a house at the terrace's edge gets a cellar that opens onto the street below, and a house between two streets may have
its back door one floor up. A house whose street runs along its downhill side keeps its front door on the ground floor,
up a flight of outside steps, with the cellar door under or beside them. A church on a slope with a cellar beside its
crypt may open that cellar to the outside, never the crypt: the crypt is reached only by the stairs down from inside the
church. Houses and shops on a bridge, a pier or a mole have no
cellar or well over the water, and fall with their deck. A workshop built into an arch under a viaduct has its door and
windows in the arch's infill, facing the street beneath. The aqueduct's end house holds its water tank, and the arena is
planned as a ring of passages and stairs round its open floor.

When things change — the simulator moves a family in, the dossier turns a house into a shop — the plan is marked
"changed" and waits until you look again; then it changes as little as it can, never re-rolled from scratch.

Everything in the plan can be edited: rename a room or number the rooms for a game key, add a room the building should
have ("a library upstairs") and let the plan find where it goes, move a wall, split or merge rooms, move a door or a
window, move the stairs or a fireplace, move, resize or add furniture, turn a room's light off, give a room to a different
household. When an edit cannot be done exactly, it is done the nearest way that works and says so in one line. Every edit
can be undone, and none reaches outside the building — except a cellar edit that opens or seals a way underground, which
says so before it happens. Each storey exports as a virtual-tabletop scene with its walls, doors, windows and lights.

## 1 Scope, the base hooks consumed, and what is out of scope

**Scope.** This volume builds the plan rung — `BuildingGenerator.plan` (§2.6) — to build depth: the resolution of every
building's room programme (by class id, template family, structure slot, split half, band, era and specialisation) and
its default rows; the role table and its companion tables; storey allocation, the fill of an over-large shell, the vacant
programme and the shared access that keeps each household off its neighbours' rooms; the stair core, the hearths and
stacks and every other anchor; the partition of each storey on the transient arena by the seven layout patterns; doors,
unit entries, loops and concealed openings; windows on volume 2's façade bays and dormers from its dormer rows;
furnishing; basements; the crypt as a model fact on the basement (`Basement.crypt`: the cathedral's always and the
settlement's largest, the other churches' by their class row and ground — item 109 (k) (2) as revised ~20:05, J111), its
plan, its stairs from the nave and the choir stairs over a raised crypt; the head of every way down a building hosts
(item 64, item 66, II.7.3, II.7.5, II.7.6, item 109 (j) (3), (3b)); the plans of buildings below ground (item 109 (e),
(j) (4); II.7.3; II.7.5); the plans of item 110's buildings — stepped tiers (the level reading, the storey heights, cores
carried up a stack, landing doors, terrace exits, walkable roof terraces, stacks carried through the tiers above),
walls against retaining walls (exposure on every storey, entrance storeys, the walk-out at a terrace edge), buildings on
decks (no head and no well over water, the basement edit's answer, the fall with the deck) and buildings in arch vaults
under raised ways (grade faces), the aqueduct's cistern and the arena (item 110 (a)–(e) as revised ~23:40); the
plan report; click-to-elaborate with stale-until-clicked as the viewer experiences it; the plan edits with their tools,
bends and undo; the room explainer for the clerk; the plan draw at the building band with its detail ladder, room
labels, numbers and lights; the plan block, SVG, raster and per-storey VTT scenes; budgets, bars, the build plan. The
base already states the records (§2.6's `Plan`, `Storey`, `Room`, `Wall`, `Opening`, `WindowRec`, `StairCore`,
`Chimney`, `InteriorLadderRow`), the rung's seven steps (§2.6 *The plan rung*), the interior ladder and the one capacity
function (§2.6), the elaboration record and cache (§2.8, §2.9) and every hook named below; this volume cites them and
never restates them.

**Base hooks consumed (by section).**
| hook | where | what this volume does with it |
|---|---|---|
| the plan rung's steps 1–7, the stage-3 contract's fourth rung, the clip order | §2.6 | implements each step (§3 below) |
| the interior ladder, the canonical chain, the re-cut rule, the unit-door rule, the capacity | §2.6 | consumes; §3.2 adds unit-to-storey packing, the shared access (A6) and the no-abort ladder; BCR-V3-11, BCR-V3-12 |
| entrances (rules 1–5), `Entrance.faces`, `Basement`, `Basement.access`, *Basements* (the class probability and the terrain gate), the requested basement, the plan rung's step 3 `external` door | §2.6 | anchors (§3.3), the basement storey, the crypt and the heads (§3.7); BCR-V3-20 (the crypt column, `Basement.crypt` and the principal crypt), BCR-V3-21 (`tunnel`), BCR-V3-32 (step 3's door at `basementDoor(b)`, 3.7.1) |
| footprint templates, `BaseWing`, the wing-carrying rule, J-P48, `CarriedShapes` | §2.6 | template part names (BCR-V3-13); carried furniture (BCR-V3-2) |
| `ElaborationRecord`, the elaboration cache, `elaborate`, `storey` view keys | §2.8, §2.9 | the click UX (§4.5), the plan report in the chunk (§2.3); the `roomNumbers` view key (BCR-V3-6) |
| the explainer registry (as BCR-V10-3 amends it) | §2.8 | the room provider (§4.6), resolved by address prefix (BCR-V3-22) |
| `transientArena`, `readBack`, `tileRings`, the input-side rule, the re-cut as the same call | §3.4 | the partition machine (§3.5) |
| `ratio()` and the division rule | §3.2 (8) | `slice`'s ratio (§3.10) |
| the `spine` reader | §3.8 | room label spine, light and free-furniture point (§5.1) |
| the seed-tiling row | §3.10 | T-V3-4 |
| the trigger policy | §4.1 | §4.5 |
| `WorkLimitLaw`, `workLimits.json` | §4.12 | the storey's work limit (§3.4; BCR-V3-23) |
| the generation fill, `Building.households` clamped to the capacity, `Building.dwelling`, `BuildingSlot.role`, `BuildingSlot.unhoused` | §4.7 S10b, S11 | the household count, the live-in unit and the slot the programme reads |
| concealed institutions, their entrances and rooms | §4.7, item 63 | the concealed sub-graph (§3.5, §3.6), the public merge (§5.4) |
| `relet`, the Works stages, `heightsAt` | §4.11 | re-cut triggers; the plan in progress (§5.1) |
| F-PLAN tiers 0–6, F-EDIT | §5.2 | §3.9 maps every step's failure to a tier; edits bend before F-EDIT (§4.2) |
| the plan rows of the invariant suite | §5.3 | checked by §7's bars; BCR-V3-11 |
| `plan.program`, `plan.layout`, `plan.roles`, `plan.furnish`; the rung counters | §6.1 | the only streams this volume draws, with creation indices (§3.10) |
| room addresses by anchor | §6.3 | re-match on re-cut and carry |
| the plan events, `setRoomUnit`, `regenerate` with `rung`, `instance`, `setAttr`, `convert` `relet`, the authoring toolkit | §7.1 | §4; extensions by BCR-V3-3, -4, -15, -16, -24 |
| edited attributes, the stored-plan re-cut inside the changing event, lifecycle rows | §7.2, §7.3, §7.4 | §4.3 |
| `roomProgram.json`, editable tables | §7.6, §14 | the default rows and tables (§2.4; BCR-V3-1) |
| the dossier derivation table (items 2, 10, 11, DR9, DR24) | §7.7 | the dossier trace (§1b) |
| the building band, change markers, `ink` / `lit` / `hatched` plan rows, room labels and lights, chimneys, paint programs | §8.2, §8.5, §8.6 | §5; the `furniture` role and the `planWallShade` program (BCR-V3-6) |
| the pyramid and its stops | §8.8 | the building-band stops to 1:125 (BCR-V3-6) |
| the path sun and its sampler (item 102 (a), (d)) | §8.4 | the sun tie-break (§3.5) |
| room label cap range 5–9 px | §9.4 | §5.1 |
| `RoomProgramRow`, `RoomRuleRow`, `DesignationTemplateRow.programme`, `.structures`, `households`, `BuildingClassRow.liveIn` | §10.2 | the resolution keys and rows (§2.4; BCR-V3-1) |
| households, `Household.building`, `Use.specialisation` | §10.3, §2.7 | units; the specialisation key (A1) |
| the JSON `plan` block, the `.dd2vtt` per-storey profile, Foundry walls, CityJSON, glTF | §11.1 | §5.3; BCR-V3-7, BCR-V3-18 |
| the `query` union and the oracle rules | §11.2 | `plan`, `planReport` (BCR-V3-5) and `why` on rooms (§4.6) |
| plan row (5 / 20 ms), cache line (4 KB per storey), the chain count | §12.7, §12.8 | §6 |
| B-PLAN, T28-1 – T28-19, T63-3, T12-1, the plan soft bands | §13.2, §13.7 | §7; BCR-V3-9, BCR-V3-14 |
| the input scheme, `keymap.json`, the interaction contract R1–R19 (R2's bend), WCAG 2.2 AA | §14 | §4.2's bends, §4.5's click and switcher |
| underground neighbourhoods and their dwellings, basement accesses, `AccessPoint`, the undercity and its lifelines, the systems and the access edit | II.7.3, II.7.4, II.7.5, II.7.6 | every hosted access's head (3.7.2); buildings below ground (3.12); `ContextVector.arena` |
| concealed rooms and doors (item 63) | §2.6, §4.7 | §3.5, §3.6, §5.4 |
| `RetainingWall` (item 110 (a); §2.7 as item 110's coherence pass adds it) and the levelled ground, read only through its one reader `levelledGroundCm(doc, key, p)` (S10, S11; volume 5's BCR-V5-30: a levelled platform's datum, else the raster) | §2.7, §4.7 | W2's exposure on every storey and the entrance storeys (3.6), the walk-out at a wall (BCR-V3-27 (a)) and its door (`basementDoor(b)` rule 1, 3.7.1), the outside digest (BCR-V3-28) |
| raised ways, their spans and the vaults between piers (item 110 (b); II.7.6; volume 4's `archVault` chambers, critique/V04.md C4-110-1) | §2.7, II.7.6 | 3.12 (9)'s grade faces; the aqueduct's inlet mark (5.1) |
| deck plots (item 110 (d)) and the deck gate (volume 2's BCR-V2-34) | §2.6, §4.7 S11 | 3.7.2 (0), 4.2's deck bend (`bend.deck.basement`, S23-17), 5.1's fall |
| *Entrances* rules 1, 4 and 5 (as volume 2's BCR-V2-38 and BCR-V2-41 amend them; BCR-V2-41 from V2C-53) | §2.6 | `Entrance.storey` (BCR-V3-26), O2's roots (3.6) |
| the anchor table's row for a room of a stored plan | §6.3 | the wing-relative re-match of a stacked wing (BCR-V3-29) |

**Other volumes and file g items read (cited, never restated).** Volume 1: a `RetainingWall`'s step, `stepProfile(wall)` (its
BCR-43; V1-3.11 (7)), read by `basementDoor(b)`'s rule 1 (3.7.1). Volume 2: `facadeBays` on every side (V2 §3.7; J-V2.93), `dormerPositions` and the
constants `bayM`, `endMarginM` (V2 §3.7, BCR-V2-15), `stairTreads` for the exterior flights (V2 §2.6; J-V2.90),
`composition.classFamily` for a `v.` key without a programme row (V2 §3.10.5; SR1-05), `DormerRow` (V2 §2.2, BCR-V2-03), `BaseWing.role`, `WingRole` and
`BaseWing.key` (BCR-V2-01), wings named by key (BCR-V2-27), `MassingRef.low` (V2 §2.1), the composer's rooms, their roles
`hall`, `gatehall`, `chapel`, `towerRoom`, their ids and the hall's court door (V2 §3.8), F-COMPOSE (3)'s omitted rooms and
`CompositionRow.rooms.gateHallM` (V2 §3.13, §2.2), each wing's `RoofSpec.kind` as V2 §4.6 (3) edits it, `Porch.kind` (BCR-V2-04), the crypt seed
wings `cryptSeedWings(b)` (V2 §2.4, §3.14.5 (c), exported by `@plat/plots`; J-V2.92), the wet-ground lift and
`Basement.kind 'raised'` (V2 §3.14.5, BCR-V2-28). Volume 4: the access records' kinds,
sources and `AccessPoint.cause` (BCR-29, BCR-30, V4 §2.2) as written by U-NET, U-FRONT, U-SYS (the catacomb's entrance,
V4 §3.5.1 (9)), U-ACCESS (the crypt join, V4 §3.5.7 (c); the dig from above, (d); the well through a chamber, (f)),
U-LINK (L1's air shaft through a building, L5's institution access, V4 §3.7) and U-DIG (V4 §3.8); the excavation
reading (V4 §3.5.7 (g)); the ruin chambers' column points (V4 §3.5.0a); its underground light rows (V4 §3.9). Volume 5:
the island cathedral's rim-slab crypt vault (V5 §3.10 (5)). Volume 7: the village classes by their `v.` keys (V7 §2.4; V11 §2.9). Volume 10:
`WhyProvider`, `WhyAnswer` (V10 §2.13, §3.9; BCR-V10-3). Volume 11: `BuildingClassRow.templateFamily`, `.staff`, `.split`
(V11 §2.3, BCR-V11-1), the `crypt` column, `cryptM2` and `crypt.rankShare` (BCR-V11-13 as critique/V11.md V11C-02 types
them), the template families and their structures (V11 §3.6.1), the specialisations by band (V11 §3.6.2), the class
ladder (V11 §3.5), the ladder step types (V11 §3.12), the scene archetypes and the custom-content resolver (V11 §3.13).
File g: item 102 (the sun), item 104 (h) (5) (a custom service inside its provider), item 105 (h) (split works and shop,
`Use.branchOf`), item 108 (a) (ladder buildings), item 109 (e), (g), (j) (1)–(5) with (3b), (k) (2) and (6) as revised
~20:05 (J111), item 110 (a)–(f) as revised ~23:40.

**Item 110's inputs (the second round).** Volume 2's item-110 fold as landed: `BaseWing.on` and `.solid` (BCR-V2-31), the
roles `tier`, `shrine` and `stair`, `storeyRange`, `deckLevel`, `stairChain` and `landingSide` (V2 §2.6), `MassingRef.stack`
(`lowerRoof`, `top`, `stairs`), the datum of stacked and deck wings (BCR-V2-32), the storeys a wing reaches and the basement
inside the ground wings (volume 2's BCR-V2-33 (the access external where no ground wing is storeyed); provenance V3C-82), `DeckContext` and
the deck gate (BCR-V2-34), plans of tiers and the crypt seeded with tier 0 (V2 §3.15.3), deck buildings (V2 §3.16), the
rest of item 110 at the building (V2 §3.17) and the X18 row to this volume. Landed in volume 2 by its second revision
and read there (critique/V02.md §11 as provenance): V2C-47 (2)'s sealed stair form `none`, V2C-53's solid-stack entrance and
plan root (BCR-V2-41), V2C-55's plan chimneys drawn at `Chimney.levels`' top, V2C-57's wall-side datum (BCR-V2-42), V2C-59's
`ovalCourt` arena, V2C-61's `Storey.level` and J-V2.85 (a stacked tier's first storey is a principal floor), V2C-66 (1)'s
bank quay, V2C-67 (2)'s vault ceiling and V2C-68's crypt inside a solid tier 0. Volume 4, from critique/V04.md §8 as
routed: C4-110-1's `archVault` chambers with their one door, C4-110-8's `Chamber.monument` (a chamber's record, not a
building), C4-64 (1)–(5). Volume 11: `HeightsRow.storeyCm` (V11 §2.8) through the designation template's `heights` key,
and the classes `conduit_house` and `arena` (V11 §3.5). Where a routed finding lands with other names, this volume
follows the landed names (§13).

**Out of scope, each with its owner.** The composer that makes `Composition.wings`, `towers`, `courts`, dormer rows and
`Composition.rooms` (volume 2); this volume reads a composition and, where none is stored or composed, the base wings
(§2.6's clip order treats both). The household records, their people and schedules (§10.3, `@plat/sim`). The
underground elements an access reaches, the rules that create, gate, draw and seal accesses (item 64's lottery, item
109 (j) (3)'s dig draw and public openings, (3b)'s breaches, the catacomb's burial-face source, growth and entrance,
and the crypt join's draw) and the underground buildings' outlines and heights (volume 4, II.7); this volume draws the
head of every access a building hosts and plans the rooms of underground buildings. The crypt's growth target and rank
share (volume 11's rows), the crypt's seed wings (`cryptSeedWings(b)`, V2 §3.14.5 (c)) and the wet-ground lift (volume 2) and the island's rim-slab vault
(volume 5) are theirs; this volume states the crypt's derivation in the basement function (BCR-V3-20) and plans it.
The tier construction, the stair wings, the pent skirts and the roofscape's terraces, parapets and stacks (volume 2);
retaining walls, raised ways and their spans, and deck plots (the base, by item 110's coherence pass); arch vault
chambers and a ruin's stepped monument (volume 4) — this volume reads them and plans the rooms inside.
The epoch engine that schedules re-lets and excavations (§4.11, volume 6). Elevation
drawings: the 3-D export reads heights, not plans (§11.1), and this volume adds no elevation view (J-V3.19).

## 1b Wiring table

Every piece this volume adds, what feeds it and what it feeds, and the base hook it plugs into. "Base" entries are cited,
not restated. A piece with no consumer or no producer would be a defect (the owner's wiring rule, 2026-09-28); none is
left.

**Tables** (all in `roomProgram.json`, §14, through BCR-V3-1; each edited by `editTable`, §7.6; each cell with provenance)

| piece (§ here) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `RoomRoleRow` (2.4) | defaults here; `editTable` | A2–A5 (3.2), the cutters (`minWidthCm`, `aspectMax`, 3.5), O2–O3 (`door`, `maxDoors`), W1 (`exterior`), H1 (`hearth`), `Room.lit`, F1–F3 (`furnish`), labels (display text, §10.4), the `bias` tie-break (3.5) | `roomProgram.json` (§14) |
| extended `RoomProgramRow` / `RoomRuleRow` cells (`family`, `slot`, `half`, `shared`, `unitHearth`, `unitOneRoom`, `fill`, `staffSleepIn`, `perRoom`, `notBasement`, optional override cells) (2.4) | defaults here; `editTable` | A1 (resolution), A2 (lists), A5 (fill, storey rules) | §10.2 `RoomProgramRow`, `RoomRuleRow` (BCR-V3-1) |
| the class, family, slot, class-id and village rows; the vacant programme (2.4) | defaults here (volume 11's families and classes, volume 7's village classes by their `v.` keys, as keys); for a `v.` key without a row, volume 2's `composition.classFamily` (V2 §3.10.5) | A1 | §10.2 |
| `PatternRow` (2.4) | defaults here | the per-piece pattern choice (3.5) | §2.6 step 4 |
| `EntranceAnchorRow` (2.4) | defaults here | A2 (8) (3.2) | §2.6 step 3 |
| `WingAffinityRow` (2.4) | defaults here | A5 (e) | §2.6 step 3, volume 2's `WingRole` |
| `SubLocationRoleRow` (2.4) | defaults here | A2 (5) | §2.6 `SubLocation` |
| `AccessHostRow` (2.4) | defaults here | the head's host room (3.7.2 (6)) | II.7.4 `AccessPoint` |
| `FurnitureRow` catalogue (2.4) | defaults here | F1–F4 (3.8), the draw (5.1), SVG, JSON, `instance` edits (4.2) | §2.6 step 6 |
| `PlanGeometryRow` (2.4) | defaults here | anchors (3.3), cutters (3.5), openings (3.6), heads and crypt (3.7), F2, the view rules (4.5, 5.1), A3's unit floor, all from P1; the capacity's `R(s)` (`stair.ladder`, `stair.landingCm`, from M2b; BCR-V3-12), `Entrance.storey` (`datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`) and `basementDoor(b)` with W2's outside sample (`moduleCm`, `door.mainCm`), from M3a (§8's PE; file f item 233's note, seam S23R2-09) (seam S23R2-15) | `roomProgram.json` |
| the plan stage's `WorkLimitLaw` row (2.4) | `workLimits.json` | the storey's `transientArena` work limit (3.4) | §4.12 (BCR-V3-23) |
| the register lines of `roomProgram.json` and T-V3-35's `BenchBarDef` (2.4, §7; SCC-R2C-17) | this volume's lines; the seats landing PE (M2b, M3a), P1 and P2 write the entries, the P1 seat registers the bar | V12's register lint and milestone exits (V12 §3.11, T-V12-20), `plat parity`'s `bar.` rows (V12 §2.1), V3-P6's exit (§8) | V12 §3.11 (`register.json`) |
| item 110's rows (2.4): the role `cistern`; the class-id rows `stepped_temple`, `terraced_palace`, `tiered_tower` (under `'*'`), `conduit_house`, `arena`; the cells `seatingExits` and storey `belowTop`; the affinity qualifiers `tier:top`, `tier:entrance`; `PlanGeometryRow.exposureAllStoreys` | defaults here; `editTable` | A1–A5 (3.2), S6 (d) (3.3), W2 and `Entrance.storey` (3.6) | `roomProgram.json` (BCR-V3-1) |

**Records and fields**

| piece (§ here) | producer | consumers | base hook |
|---|---|---|---|
| `Storey.furniture`, `FurnitureItem`, `Room.nextFurniture` (2.1) | F1–F4 (3.8) on `plan.furnish`; `instance` on a room (4.2) | the draw (5.1), JSON, SVG, VTT image, the carry check (4.3), T-V3-8 | `Storey` (BCR-V3-2) |
| `Room.name` (2.1) | `setAttr plan/rooms/<id>/name` via T11 `name` (4.2) | the label (5.1), the panel (4.5), JSON, Foundry journal, the room why (4.6) | `Room` (BCR-V3-2) |
| edited `Room.lit` (2.1) | `setAttr plan/rooms/<id>/lit` (4.2) | the draw's lights, VTT and Foundry lights | `Room.lit` (§2.6) |
| `Opening.hinge`, `.swing` (2.1) | O3 (3.6); `setOpening` (BCR-V3-24) | door leaf draw, VTT bounds, F2 | `Opening` (BCR-V3-2) |
| `Opening.point` (2.1) | the crawl hatch, a hatch head (3.7) | draw, VTT, Foundry | `Opening` (BCR-V3-17) |
| `Opening.steps` (2.1) | O1 (c) (3.6) | draw, F2, glTF | `Opening` (BCR-V3-2) |
| `WindowRec.kind` (2.1) | W2 (3.6); `setWindow` (BCR-V3-24) | draw, SVG, VTT, glTF | `WindowRec` (BCR-V3-2) |
| `Chimney.air` (2.1) | 3.7.2 (4), 3.12 (3) | the stack draw (§8.6), VTT, the room why | `Chimney` (BCR-V3-2) |
| `ProgramRoom.origin`, `.subLocation`, `.anchor.access` (2.1) | A2, A6 (3.2), 3.7.2 | A5, the cutters, P5, the report, the room why | `ProgramRoom` (BCR-V3-19, BCR-V3-2) |
| `AccessHead`, `Plan.heads` (2.1) | 3.7.2 from `BuildingInput.accesses` | the anchors (fixed rings), the draw, JSON `accesses`, VTT portal, Foundry note, the panel (4.5), the room why (4.6), T-V3-22 — a head of `storey` null (3.7.2 (1)'s outside door on a solid stack without a basement; its `door`, filled from `stackAccessDoor(b, a)`, seam S23R3-09) the outline draw, the JSON, the panel and the why only (seam S23R2-10) | §2.6 step 3 (BCR-V3-19) |
| `Building.declaredRooms` (2.1) | `setAttr declaredRooms` via T9 `shape` (4.2) | A2 (7), `ElaborationRecord.inputs` | `Building` (BCR-V3-15) |
| `Entrance.faces` `tunnel` (2.1) | the underground entrance derivation (volume 4 for sewer-front, undercity, cavern and ruin buildings) | 3.12 (4), VTT portals | `Entrance` (BCR-V3-21) |
| `Basement.crypt` (2.1) | the basement function (3.7.4), from volume 11's `crypt` column, `cryptM2`, `crypt.rankShare`, volume 2's `cryptSeedWings(b)` (V2 §3.14.5 (c), which reads the template part names) and lift, a dossier crypt record | A2 (9), the crypt plan (3.7.5), the crypt and choir stairs (3.7.6), the stair-entered reading (3.7.4; seam S23R5-01), volume 4's crypt join (V4 §3.5.7 (c)), volume 10's why, volume 1's T-V1-47 (its check that no crypt has a place or a pin; V1-3.7.1's opening pass selects by `AccessPoint` fields and reads no crypt field; S23R1-24), the rank, T-V3-23 | §2.6 *Basements* (BCR-V3-20) |
| `PlanReport` (2.3) | A1 and every step's failure handling (3.9) | the panel (4.5), the clerk's `planReport` and the room why (4.6), JSON `report`, §13.7's soft bands, T28-1's reporting clause | the elaboration chunk (BCR-V3-8) |
| `Entrance.storey` (2.1) | §2.6's `deriveEntrances` (BCR-V3-26) at S11 from M3a (§8's PE), reading the storey heights (3.3), the outside ground (3.6 W2), the basement's levels and, for the main entrance, `Basement.access` (after the basement decision; seams S23R4-01, S23R5-03) | E1, O2's roots, A2 (8), A6, W2's door gate, the switcher's first storey, the VTT scene's elevation, JSON | `Entrance` (BCR-V3-26) |
| `StairCore.levels` spanning a stack; the landing doors, terrace exits and terrace doors (`Opening`s of 3.3 S6, 3.6 O1 (d)) | S5–S6 | O2's roots, T28-2 (BCR-V3-14), the draw, VTT portals, Foundry, the room why (causes `landingDoor`, `terraceExit`, `terraceDoor`) | `StairCore`, `Opening` (§2.6) |
| `Chimney.levels` carried through the tiers above (2.1) | H3 (3.3) | T-V3-4, volume 2's roofscape drawing the stack over `column` at `levels[1]` (V2 §5.2; V2C-55), VTT, JSON | `Chimney` (§2.6) |
| `BaseWing.partName` (BCR-V3-13; lifecycle 2.5, S23-15) | the base outline builder from its template part (S11), passed through by volume 2's M0 (d) and kept by its wing writers | A5 (e)'s `part:` affinities, the crypt's seed through volume 2's `cryptSeedWings` (3.7.4), volume 2's M8 (e), the room why (4.6), the JSON wing record, T-V3-13 | `BaseWing` (BCR-V3-13) |

**Derived pieces** (never stored; each computed at the call and consumed)

| piece (§ here) | computed from | read by |
|---|---|---|
| the level reading `s₀(w)` and `ground(b)` (3.3) | volume 2's `storeyRange`, `BaseWing.on`, `.solid` | the seeds (3.4), the datums, S2, S5, S6, A5 (e), 3.7, the switcher (4.5), T-V3-27; `Entrance.storey` (BCR-V3-26), `basementDoor(b)` (3.7.1), `stackAccessDoor(b, a)`'s domain (3.7.2 (1)), volume 1's entrance reserve and close-up digest (V1-3.8.2 step 5, V1-3.8.3), the base's *Basements* condition (volume 2's BCR-V2-33; V2 §3.15.3) (seam S23R2-15) |
| storey heights and `floorCm` (3.3) | volume 2's `deckLevel`, `Heights`, volume 11's `HeightsRow.storeyCm` | O1 (c), W2, `Entrance.storey`, the crypt stairs, the exports' elevations, T-V3-18, T-V3-27 |
| the roof terraces `T(x)` (3.4a) | the wings' `on`, each wing's own `RoofSpec.kind` as laid or edited (`MassingRef.stack.top` only for the shrine; S23-12), `deckLevel`, the family's `parapetCm` | S6 and O1 (d)'s doors, W4, the draw (5.1), VTT, Foundry, JSON `terraces`, the switcher, T-V3-29 |
| the outside ground of each exterior wall (3.6 W2) | `levelledGroundCm(doc, key, p)` (volume 5's BCR-V5-30: the levelled platform's datum, else the raster), `RetainingWall`s (`levelledGroundCm` on the chain's far side), a deck's surface, a lower wing's roof | W2's window and door gates, `Entrance.storey`, the walk-out (BCR-V3-27 (a)), the outside digest (BCR-V3-28), T-V3-30 |
| `basementDoor(b)` — an `external` basement's outside door (3.7.1; S23R3-01), on `(doc, key)` (seam S23R3-16) | `Basement.ring`, `.access`, from M6-U the crypt's vault (`Basement.crypt.ring` with its capped bays; file f item 238; absent before, every door point a midpoint; seam S23R4-03), the `Entrance` records, the wings (`ground(b)`, the stair wings, stair 0's approach), `RetainingWall`s with volume 1's `stepProfile(wall)` (BCR-43), `levelledGroundCm` (BCR-V5-30), the cells `moduleCm`, `door.mainCm`, `cellar.insetCm`, `cellar.depthCm` | the plan rung's step 3 door (BCR-V3-32) on storey −1 (3.7.1), the crawl hatch (3.7.7), the crypt's entry where the crypt is not stair-entered (3.7.6; seam S23R5-01), O2's basement root (seam S23R3-11), volume 1's entrance reserve (V1-3.8.2 step 5) and close-up digest (V1-3.8.3; seam S23R2-15), the why causes `walkOut` and `tombDoor` (4.6), T28-3, T-V3-30 |
| `stackAccessDoor(b, a)` — a stack-hosted access's outside door (3.7.2 (1); seam S23R3-09) | the wings (`on`, `solid`, `role`, their rings), volume 2's `stairChain` (stair 0 and its approach strip, V2 §4.6), `AccessPoint.ground.at`, the cell `moduleCm`; `ground(b)` and `Building.basement` for its domain | `AccessHead.door` (3.7.2 (1)), 3.9's row, 5.1, 5.3, volume 1's entrance reserve and close-up digest (V1-3.8.2 step 5, V1-3.8.3), T-V3-22 |
| the grade faces of a host chamber (3.12 (9)) | volume 4's `archVault` chambers (critique/V04.md C4-110-1) and their grade-face marks | W1–W3 on those faces, the frontage's `faces`, the face flue, T-V3-32 |
| the deck predicate `onDeck(b)` (3.7.2 (0)) | the deck gate of volume 2's BCR-V2-34 | 3.7.2 (0), 4.2's deck bend, 5.1's fall, T-V3-31 |
| the crypt's capped bays (3.7.4 (3); ST-39) | the crypt's step-2 ring (3.7.4 steps 1–2), `Basement.crypt.ring`, `Basement.ring` | A2 (9)'s `undercroft`, the seed pieces of storey −1 (3.4, 3.7.5), the column grid, the draw, volume 6's capped vaults (V6 §3.18.3 (3), T-V6-55), T-V3-23 (h); with the crypt's ring, `basementDoor(b)`'s vault (3.7.1; seam S23R4-03) |
| the stair-entered reading of a crypt (3.7.4; seam S23R5-01) | `ground(b)`, the storeyed ground-standing wings' rings (3.3's level reading), the crypt's vault (its step-2 ring, or `Basement.crypt.ring` where `edited` is set) | the basement function's extent for an `always` class and for an author's crypt ring (3.7.4, at S11 from M6-U; BCR-V3-20), O2's crypt join and closed vault, 3.7.5's undercroft join, 3.7.6's entry, 3.9's two crypt rows, 4.2's crypt-ring edit, T-V3-23 (j) |
| the inlet mark (5.1) | an aqueduct-class raised way ending within `access.snapCm` of a cistern | the draw, JSON `inlet` |

**Stage outputs** (each consumed; all inside `BuildingGenerator.plan`, §2.6)

| output (§ here) | fed by | feeds |
|---|---|---|
| A1's resolved row and `programmeSource` (3.2) | the template's `programme` key, `Building.class`, `BuildingSlot.role`, `Use.specialisation`, `Use.branchOf`, the band, the era, V11's `templateFamily` and `split`, volume 2's `composition.classFamily` (a `v.` key without a row) | A2, the report (`programmeSource.via`), the room why |
| A2's lists (3.2) | the resolved row, the ladder row, `Building.households`, `.dwelling`, `.subLocations`, `.concealed`, `.declaredRooms`, `Basement.crypt` and its capped bays, `BuildingInput.accesses`, V11's `staff`, `Composition.rooms` from volume 2's `rooms` rung and the composed wings' roles (A2 (11)) | A3–A5, P5 (`Room.program`, `Room.subLocation`) |
| A5's allocation and A6's stair hall (3.2) | A2–A4, the anchors, `WingAffinityRow`, `RoomRuleRow.adjacency`, the ladder's `staff.placement` | the cutters' targets per piece (3.5) |
| stair cores, stacks, entrance points, composer rooms, heads, crypt ring, columns, crypt stairs, choir flights (3.3, 3.7) | wings (by key, BCR-V2-27), entrances, the basement, the composition's rooms, the accesses, `PlanGeometryRow` | `transientArena` fixed rings (§3.4), O2's graph, the draw |
| S6's joins of stacked wings — landing doors, terrace exits, terrace doors, seating exits (3.3) | `stairChain`, `landingSide`, the cores, the terraces | O2's stack roots, T28-2, the draw, VTT portals, the report's anchors |
| the cut pieces (3.5) | seed pieces, fixed rings, targets, `plan.layout` | `readBack` → `Room.ring`, `Wall` (§3.4) |
| the door graph (3.6) | pieces with roles, adjacency cells, `maxDoors`, entrances, `floorCm`, the crypt and its capped bays (O2's forced arch, the vault closed under crypt stairs, the crypt join of a crypt that is not stair-entered, 3.7.4; seams S23R4-03, S23R5-01, S23R5-02) | `Opening` records, `Plan.units[].entry`, T28-2, the interior-ladder row of §5.3 |
| windows (3.6 W1–W3) | volume 2's `facadeBays` on every side, the room's `exterior` | `WindowRec`s, §8.4's lit windows once a plan exists |
| dormer counts (3.6 W4) | top-storey roofed rooms with exterior demand | volume 2's unedited `DormerRow.count` (its positions `dormerPositions`); `Wing.dormers` without a composition |
| furniture (3.8) | rooms, openings, `FurnitureRow`, `plan.furnish` | the draw, exports |

**Interfaces**

| interface | implementer | caller |
|---|---|---|
| `BuildingGenerator.plan` (§2.6) | this volume's rung (`@plat/buildings`, BCR-V3-31) | the elaboration cache on a click, `elaborate: 'view'`, the clerk's `plan` query — each after `wings` and `rooms` (4.5, 4.6) — and a stored plan's re-cut (§7.3) |
| `compose(…, 'rooms')` — the `rooms` rung (V02 §3.8) | volume 2 | this volume's click, `view` and `plan` query, before `plan` (4.5, 4.6; S23-34) |
| `WhyProvider` for kind `room` and for path `plan` of kind `building` (4.6) | this volume | volume 10's oracle and clerk (`query why`), volume 9's why panel |
| `query` kinds `plan`, `planReport` (4.6) | this volume | the embedding API (§11.2), the clerk (BCR-V3-5) |
| `basementDoor(b)` (3.7.1; pure, of eager records, on `(doc, key)`; seam S23R3-16) | this volume's rule, implemented in `@plat/plots` beside `facadeBays` and re-exported by `@plat/buildings`, built at M3a (§8's PE; file f item 578), its crypt clause at M6-U with the crypt derivation (file f item 238; seam S23R4-03) | the plan rung's step 3 (BCR-V3-32), volume 1's entrance reserve (V1-3.8.2 step 5) and close-up digest (V1-3.8.3; seam S23R2-15), T28-3, T-V3-30 |
| `stackAccessDoor(b, a)` (3.7.2 (1); pure, of eager records; seam S23R3-09) | this volume's rule, implemented in `@plat/plots` beside `basementDoor(b)` and re-exported by `@plat/buildings`, built at M3a (§8's PE) | 3.7.2 (1), volume 1's entrance reserve and close-up digest (V1-3.8.2 step 5, V1-3.8.3), T-V3-22 |
| `ground(b)` and the level reading (3.3; pure, of eager records) | this volume's rule, implemented in `@plat/plots`, built at M3a (§8's PE) | the plan rung, `Entrance.storey` (BCR-V3-26), `basementDoor(b)` (3.7.1), `stackAccessDoor(b, a)` (3.7.2 (1)), volume 1's entrance reserve and digest (V1-3.8.2 step 5, V1-3.8.3), the base's *Basements* (volume 2's BCR-V2-33) (seam S23R2-15) |

**Edit kinds** (each with its tool, lifecycle row and undo; 4.1–4.3)

| edit | tool | lifecycle row | undo |
|---|---|---|---|
| `setHearth` | T9 `shape` | §7.4's plan-event row (BCR-V3-3) | the storeys its stack crosses |
| `moveStairCore` with `kind` | T9 `shape` | the plan-event row | the storeys the core serves |
| `instance` on a room (add, move, remove, restyle incl. `wCm`, `dCm`) | T9 `shape` | the plan-event row (BCR-V3-4, BCR-V3-16) | the former storey |
| `setOpening` `hinge` / `swing`; `setWindow` `kind` | T9 `shape` | the plan-event row (BCR-V3-24) | the former storey |
| `setAttr` `declaredRooms` | T9 `shape` | §7.4's `setAttr` row (an edited attribute) | the former value, and the plan it re-cut |
| `setAttr` `plan/rooms/<id>/name` | T11 `name` | the plan-event row | inverse |
| `setAttr` `plan/rooms/<id>/lit`, `plan/pattern/<level>` | T9 `shape` | the plan-event row | inverse; the former storey |
| `setAttr(basement)` incl. `basement/crypt/ring` | T9 `shape` | §7.4's `setAttr` row with 4.2's consequences | one step: basement, accesses, plan |
| `regenerate` with `rung` on an edited plan | T10 `hold` | 4.3's per-rung rule | the former plan |
| `convert` `relet` | T6 `place` (BCR-V3-16) | §7.4's `convert` row | §7.4 |
| volume 2's `setMassing { op: 'tiers' }` (T9's tier controls) and the stepped mutations | T9 `shape` (volume 2's) | the plan's wing-relative re-match (4.3; BCR-V3-29); the dry run lists a removed tier's rooms | volume 2's undo, the plan restored with it |
| `setOpening` onto a terrace (4.2) | T9 `shape` | the plan-event row | the former storey |
| `setAttr(basement)` on `basement/crypt/ring` of a building without a basement (a crypt-only basement, or the ground wings' whole inset where the ring would not be stair-entered, 4.2) | T9 `shape`; volume 9's `drawChamber` bend | §7.4's `setAttr` row | one step: basement, crypt and plan |
| a `RetainingWall` drawn, moved or removed (T3 `wall` `retaining`, T2 `ground`; the base's) | the base's tools | the neighbouring plans marked stale, stored ones re-cut (4.3; BCR-V3-28) | the log's |

**Entity kinds** (plan parts are values of the plan, never registry entities, J-V3.12): every room, wall, opening, window,
core, stack, head, column and furniture item is drawn (5.1), labelled where it is a room (5.1), exported (5.2–5.3) and
persisted with a stored plan (§2.6) or re-derived from the cache (§2.9). Item 110's derived surfaces — roof terraces
(3.4a), the exterior flights drawn on a plan (their treads by volume 2's `stairTreads`), the stoop and the inlet mark — are drawn (5.1) and exported (5.3), named
only through the switcher's "Roof terrace" (4.5), and never persisted: each is re-derived at read from the wings, the
openings and the raised ways.

**View state and chrome**: the `roomNumbers` view key (4.5; BCR-V3-6), the storey switcher and the plan panel (4.5), the
keymap rows `plan.storeyUp` / `plan.storeyDown` (4.5; `keymap.json`, §14).

**Dossier facts this volume reads, each traced to its field and derivation row.**
* **Households.** The households a building houses fill the dossier's population where one is bound —
  `Building.households`, written by §4.7's fill from the derivation table's population row (§7.7 item 10; item 20 (h)).
* **Institutions and their use.** A dossier-listed institution's use and `concealment` reach the programme through
  `Building.use` and `Building.concealed` (§7.7 items 2, 11). Its class is volume 11's class id by volume 8's row map
  (V11 §3.11); A1 resolves it (3.2).
* **Custom institutions.** A custom institution (item 104) reaches its programme through volume 11's resolver
  (`custom.sceneProfileId` → the archetype's class, V11 §3.13.2; else its category, tags and keywords → a `generic-<family>`
  class) → that class's designation template → A1 rule (1); a custom service "provided by" an institution arrives as a
  `SubLocation` of its provider's building with its SettlementForge tags (item 104 (h) (5)), which A2 (5) hosts.
* **Institution ladders.** A GUILD or SIZE record (item 108 (a)) is one building of its greater tier's template → its
  class id → A1; a COUNT record's members are separate buildings, each through its own class (V11 §3.12).
* **Churches and crypts.** A church's existence, class and size come from the dossier's religious institutions (volume
  8's rows: the cathedral records → V11 `cathedral`; parish churches → `church`; item 108's collective members, one
  building each). The chain runs V11's `crypt` column → BCR-V3-20 → `Basement.crypt` → A2 (9). A dossier crypt record binds
  to its church building (volume 4's dossier row set, V4 §2.3a), which makes that building `always` (3.7.4).
* **Accesses.** An access's `knownTo` (item 64 (c), II.7.4) decides what a viewer's key sees of its head (3.7.3, 5.4).
* **Stepped forms (item 110 (c)).** A worship, government or fortification institution whose culture and era build in
  tiers: the dossier's culture fact (volume 8; the trace names the culture only, critique/V02.md V2C-71) → volume 11's
  specialisation (`stepped_temple`, `terraced_palace`, `tiered_tower`; V2's X17) → `Use.specialisation` → A1 rule (1)'s
  `'*'` row (2.4). No dossier fact names a retaining wall, a raised way's span or a deck (item 110; V2 §1b's trace): they
  reach the plan as map facts only.

No plan fact is a dossier field: every room, wall and door is `map` tier by `factTier` (§2.8), an edited one `declared`
(item 101). A dossier change reaches a plan only through those records' changes, which mark it stale or re-cut a stored
one (§2.8, §7.3).

## 2 Data model

### 2.1 Record additions (typed; applied by BCR-V3-2 and the BCRs named)

```ts
// on §2.6's Storey — furniture is part of the plan value: derived with the plan, stored only with a stored plan
interface Storey { /* §2.6's fields */ furniture: FurnitureItem[] /* in room order, then by ordinal */ }
interface FurnitureItem {
  id: Id                 /* furn:<room id>/<ordinal> — ordinal ≥ 0, stable within its room: a generated item takes the next ordinal in
                            placement order (3.8 F3); an `instance` add takes Room.nextFurniture; never re-used after a remove */;
  room: Id; glyph: string /* a FurnitureRow key (2.4) */;
  at: PointCm            /* the item's centre, world integer cm; a carried point (BCR-V3-2 adds it to CarriedShapes and J-P48) */;
  rotCdeg: number        /* integer centidegrees 0 … 35 999, counter-clockwise from world +x: an against, corner or row item's is its wall's
                            direction (3.8 F3, through dmath, §6.5 (2)); a free item's its room's OBB long axis */;
  wCm: Cm; dCm: Cm       /* the row's size at this item, inside the row's range, snapped to 10 cm */;
  wall?: Id              /* the wall it stands against (placement 'against' or 'corner') */;
  edited?: true          /* set by an `instance` add, move or restyle on it (4.2); New random on plan.furnish keeps it (4.3) */ }
interface Room { /* §2.6's fields */
  nextFurniture: number  /* next free furniture ordinal; written by F3 and by `instance` add */;
  name?: string          /* the author's name for the room (setAttr plan/rooms/<id>/name, 4.2): the label shows it, the role unchanged */ }
interface Opening { /* §2.6's fields */
  hinge?: 0 | 1          /* doors only: the leaf hangs at the end of `wall` nearer a (0) or b (1) — derived by O3 (3.6), editable (setOpening, BCR-V3-24) */;
  swing?: Id             /* doors only: the room the leaf opens into — derived by O3, editable */;
  point?: PointCm        /* BCR-V3-17: a floor opening's centre — a trapdoor, a hatch, an access head's opening (3.7); `wall` then names
                            the host room's nearest wall, for ordering only */;
  steps?: number         /* 1 … PlanGeometryRow.datum.maxSteps: the treads of a short flight inside the lower room, where the two rooms'
                            floors differ (3.6 O1 (c)); absent: level */ }
interface WindowRec { /* §2.6's fields */ kind: 'window' | 'slit' | 'light' /* light: a basement wall's small window above ground (3.6 W2) */ }
interface Chimney { /* §2.6's fields */ air?: Id[] /* the AccessPoints of role 'air' this stack also vents (3.7.2 (4)); a stack with air and
                            no hearth is a hearthless air stack */
  /* levels (§2.6's field) now runs from the lowest hearth to the highest level of any storeyed wing whose extent contains
     `column` (3.3 H3), so a lower tier's stack continues through the tiers above to open air; `wing` stays the hearth's wing */ }
interface ProgramRoom { /* §2.6's fields */
  origin: 'ladder'|'staff'|'sleepIn'|'programme'|'subLocation'|'concealed'|'declared'|'fill'|'vacant'|'access'|'sharedAccess'|'entrance'
          |'crypt'|'composer' /* which list of A2 made it (3.2); `rule` indexes that list's row (for 'crypt': 0 the crypt, 1 its
                         capped bays' undercroft, A2 (9); for 'composer': the composer room's index in Composition.rooms, −1 for
                         the room A2 (11) places for an omitted one) */;
  subLocation?: Id       /* the SubLocation it hosts (A2 (5)); P5 copies it to Room.subLocation */;
  anchor?: /* §2.6's members */ | { access: Id } /* BCR-V3-19: the room holding that access's head (3.7) */ }
interface AccessHead {   // BCR-V3-19: one per AccessPoint the building hosts; on Plan.heads
  access: Id; kind: AccessPoint['kind'];
  storey: number | null  /* the head's storey (3.7.2 (1)); null exactly for 3.7.2 (1)'s outside door on a building with neither a
                            basement nor ground(b) (3.3), which lies on no storey (seam S23R2-10) */;
  room?: Id              /* the host room (3.7.2 (6)); absent exactly when storey is null */;
  door?: { wing: number /* BaseWing.key of the ground-standing wing */; side: number /* the index of that wing's ring side */;
           at: PointCm /* the door's centre on that side */ } /* present exactly when storey is null; filled by 3.7.2 (1) from
                            stackAccessDoor(b, a)'s wing, side and at (seam S23R3-09) */;
  ring?: Polygon         /* the head's fixed ring — a stair or ladder bay, a shaft square or a well disc; absent for a hatch (an Opening
                            with `point`), a door (an Opening on the wall, or `door` when storey is null) and an air access (it rides a Chimney) */;
  through: number[]      /* the storeys a well's or shaft's through-ring crosses below its head (3.7.2 (3)); [] for every other head */;
  opening?: Id           /* the Opening that enters the head from its host room; absent when storey is null */;
  distCm: Cm             /* from AccessPoint.ground.at to the head's centre (3.7.2 (5)); reported */ }
interface Plan { /* §2.6's fields */ heads: AccessHead[] /* in access-id order */ }
// on §2.6's Building (BCR-V3-15)
interface Building { /* §2.6's fields */ declaredRooms?: { role: RoomRole; count: number; storey?: number }[] /* item 101's declaration:
                            rooms this building must hold; setAttr path `declaredRooms` (4.2); read by A2 (7) as hard rooms */ }
// on §2.6's Entrance (BCR-V3-21)
// faces gains 'tunnel' — an underground building's frontage door onto its tunnel run, gallery or undercity walkway (3.12)
// on §2.6's Entrance (BCR-V3-26; item 110 (a), (c))
interface Entrance { /* §2.6's fields */
  storey: number | null  /* derived with the entrance by §2.6's deriveEntrances, never set alone, after the basement decision
                            (3.6): the level (basement levels included — for the main entrance only where Basement.access is not
                            'external', whose core stops at the ground storey, §2.6 step 3; seam S23R4-01) whose floor at the
                            entrance's wing meets the outside ground at its vertex (3.6 W2's sample) within datum.maxSteps ×
                            riserCm, the nearest such floor where two meet; the main entrance 0 where none meets (opened with a
                            stoop, 3.6 O1 (e)); null where no storeyed wing stands on the ground (ground(b) absent, 3.3: a
                            storey-less stack's main entrance, where volume 2's BCR-V2-41 puts it; seam S23R4-06); with
                            PlanGeometryRow.exposureAllStoreys false, 0 wherever ground(b) exists (the no-op pin, T-V3-34) */ }
// on §2.6's Basement (BCR-V3-20) — a model fact derived with the basement, never by the plan (3.7.4)
interface Basement { /* §2.6's fields; kind gains 'raised' by BCR-V2-28 */
  crypt?: { ring: Polygon /* world lattice points inside Basement.ring (equal to it for a crypt-only basement at its derivation; the
                            rank's trim shortens this ring only and its re-growth lengthens it again, never changing Basement.ring,
                            3.7.4 (3); ST-39); carried with the wings by rule 2 (b) as Basement.ring is; edited by setAttr(basement)
                            on the path basement/crypt/ring */;
            edited?: true /* set by that setAttr: the ring is then a fixed input the rank never trims (4.2) */ } }
```

Derived, never stored (read at draw, export and check): **the level reading** — a wing's first level `s₀(w)` and the
building's ground predicate `ground(b)` (3.3), from volume 2's `storeyRange`; **the storey heights** and every
`floorCm(w, s)` (3.3); **the roof terraces** `T(x)`, their floor, parapet and walkability (3.4a); **the outside ground**
of every exterior wall (3.6 W2); **the grade faces** of an underground building's host chamber (3.12 (9)); **the deck
predicate** `onDeck(b)` (3.7.2 (0)); **the inlet mark** (5.1); the storey switcher's names (4.5); a stair core's or stair head's flights and landing (3.3 S4, from
the kind, its bay and the storey height); a room's `lit` (its role row's `lit` unless a stored plan's room was edited by
`setAttr plan/rooms/<id>/lit`, 4.2); a chimney's column ring (`PlanGeometryRow.hearth.stackCm` about `Chimney.column`); a
door's clearance square (3.6 O3); `floorCm(w, s)` per wing and storey (3.3); an opening's **concealment** — an opening is
concealed exactly when a room on either side of it is concealed (3.6 O6); the crypt's column-grid points (3.7.5), from
which its `column` faces are cut; a choir flight's or crypt stair's treads (from its ring and the floors of the two rooms
it joins, 3.7.6); the principal crypt and every crypt's rank (3.7.4 (3)); the crypt's **capped bays** — its step-2 ring less
`Basement.crypt.ring`, inside `Basement.ring`, wherever the rank has trimmed it (3.7.4 (3); ST-39); whether a crypt is
**stair-entered** — a storeyed ground-standing wing's ring sharing area with its vault (3.7.4; seam S23R5-01); a room's number (5.1, under the `roomNumbers`
view key); the porch outline (V2's `Porch` and its kind, drawn under the plan, 5.1).

### 2.2 Identity of the plan's parts

Rooms keep §2.6's address `room:<building id>/<level>/<i>`, carried by the room's anchor (its centroid within its wing,
§6.3) — for a wing standing on another (volume 2's `BaseWing.on`), per its storey counted from its first level, `s −
s₀(w)` (3.3; BCR-V3-29; J-V3.85), so an edit that shifts a stack's levels keeps every room above it. The level part of a
room's address, and of every plan-part id below, records the level at minting and is never re-read as a storey
(`Room.storey` is). **Minting `i`** (S23-14; J-V3.103): a composer room keeps the id the `rooms` rung gave it (V02 §3.8:
`i` in the order hall, gate hall, chapel, then the tower rooms by tower key); every other room of a level, structural faces
included and an omitted composer room's replacement (A2 (11)) among them, is minted `i = c + r` — `c` one more than the
highest `rooms`-rung id on that level (0 with none: the count of its composer rooms where volume 2 numbers them without
gaps), `r` its rank in `readBack`'s canonical face order (§3.4) among the level's other rooms. A stored plan's re-cut (3.11) keeps each kept room's id by the re-match
below and mints every new room, in the same canonical order, from the level's highest `i` + 1, never re-using an id; a
composer room new to a stored plan whose `rooms`-rung id another kept room of its level already holds is minted so too.
The other parts are addressed inside the plan, never in the entity registry, so a click mints nothing (§6.2):

| part | id | assigned | re-matched on a re-cut or carry by |
|---|---|---|---|
| wall | `wall:<building>/<level>/<i>`, i in `readBack`'s canonical edge order (§3.4) after merging collinear pieces between the same two faces | P5 (3.5) | its two rooms' ids and its midpoint within `moduleCm` |
| opening | `op:<building>/<level>/<i>`, i by (wall id, `at`), a floor opening by (host room id, `point`) | O2 (3.6), 3.7 | its wall's id and `at` within one door width; an entrance opening by `Opening.entrance`; a head's opening by its access id |
| window | `win:<building>/<level>/<i>`, i by (wall id, `at`) | W3 (3.6) | wall id and façade bay index |
| stair core | `core:<building>/<wing key>/<j>` (S23-13; J-V3.102) — the wing key `StairCore.wing` (BCR-V2-27), `j` the rank of the bay's lowest-leftmost lattice point among that wing's cores | S5 (3.3), 3.7.6 | wing and bay overlap ≥ ½ |
| chimney | `chim:<building>/<wing key>/<j>` — the wing key `Chimney.wing` (the hearth's wing), `j` the rank of its column point (lowest-leftmost) among that wing's stacks | H4 (3.3) | wing and column within `stackCm` |
| access head | `head:<building>/<access id>` | 3.7 | its access id (the AccessPoint's identity, §2.8) |
| furniture | `furn:<room id>/<ordinal>` | F3 (3.8), `instance` | its room's id and ordinal; an item whose room is re-cut away is re-placed by F1–F4 (unstored) or orphaned and reported (stored, §7.4's plan-event row) |

A stored plan's part ids are what plan events name; the re-match column is the one rule §7.4's plan-event row and a
stored plan's re-cut (§7.3) apply to them (J-V3.12). Every id that names a wing names it by key, so adding or removing
another wing renumbers no part of a stored plan. Structural faces — a stack, a shaft's through-ring, a column, a
choir flight — are rooms of their structural role and keep room addresses; room numbers have no ids: they are a function
of the room order (5.1).

### 2.3 The plan report (non-canonical)

```ts
interface PlanReport {   // kept in the elaboration chunk beside its Plan (§2.9's ElaborationChunk.bytes carries both, BCR-V3-8); never in a digest
  building: Id; inputs: Hash64 /* the ElaborationRecord.inputs it was derived under */;
  programmeSource: { level: 'specialisation'|'class'|'family'|'buildingClass'|'fallback'; key: string; slot?: string;
    half?: 'works'|'shop'; era?: string; vacant?: true;
    via?: string /* the composition key of volume 2's composition.classFamily a v. key without a row of its own resolved through (A1 (3); SR1-06) */ } /* A1's resolution (3.2) */;
  owed: { origin: ProgramRoom['origin']; rule: number; role: RoomRole; delivered: 'full'|'folded'|'generic'|'dropped'|'oversize'; tier?: 0|1|2|3|4|5|6 /* absent exactly for a room dropped
    under solidMonument (A5 (b); T28-1 as BCR-V3-14 words it; seam S23R3-12) */; into?: Id }[] /* per ProgramRoom */;
  units: { household: Id; asked: UnitForm; built: UnitForm }[] /* F-PLAN tier 0's form falls */;
  fit: ('dropSoft'|'omitHard'|'reduceCirculation'|'stairDown'|'minimalRooms')[] /* the no-abort ladder's steps taken (3.9) */;
  anchors: { kind: 'core'|'stack'|'access'|'entranceRoom'|'sharedAccess'|'crypt'|'cryptStair'|'choirStair'|'hood'|'flue'|'composerRoom'
    |'landingDoor'|'terraceExit'|'terraceDoor'|'seatingExit'|'tombDoor'|'stoop'|'inlet'; tier: 0|1|2|6; distCm?: Cm; note?: string }[];
  warnings: { code: 'W_TIER_UNREACHED'|'W_STACK_ACCESS'|'W_DECK_ACCESS'|'W_ENTRANCE_NO_STOREY'|'W_CHURCH_CATACOMB_HEAD'
    |'W_GRADE_FACE_TUNNEL'|'shrineOneRoom'|'solidMonument'|'stackCarried'; wing?: number; entrance?: number; access?: Id;
    note?: string }[] /* 3.9's item-110 rows and the church head; each also in the panel's plain words (4.5) */;
  patterns: Record<number /* storey */, { piece: number; pattern: LayoutPattern | 'lodgings' }[]> /* per seed piece (3.5) */;
  datum: { doorsWithSteps: number; joinsRefused: number } /* 3.6 O1 (c) */;
  circulationShare: Record<number /* storey */, number>; attempts: Record<number, number> /* plan.layout attempts per storey */;
  chainSteps: number /* canonical-chain steps run */; furnitureSkipped: number; ms: number /* measured, diagnostics only */ }
```

Producer: every step's failure handling (3.9) and A1. Consumers: the building panel's "what this plan owes" list (4.5),
the clerk's reader and the room explainer (4.6), the JSON `plan` block's `report` member (5.3), the soft bands (§13.7) and
T28-1's reporting clause. **A stored plan's report** (V3C-50; a stored plan keeps no cache chunk once evicted, §12.8) is recomputed
on demand — from `Plan.program` against the stored rooms (`Room.program` gives owed ↔ delivered; a program row no room
names is `dropped`), the units from `Plan.units` against the ladder row, the heads from `Plan.heads`; the members only a
derivation measures (`attempts`, `ms`, `fit`) read absent (J-V3.27).

### 2.4 The rule tables and the default rows

All rows live in `roomProgram.json` (§14), carry provenance (§7.6, §17.1 (6)) and are edited by `editTable`; every
number below is `own` unless marked, with the default shown; its calibration register entry is this section's closing
*register lines of `roomProgram.json`* — a B-PLAN `measure` at V3-P6 for the columns they name — else V12 §3.11's
default line (SCC-R2C-17).
Room lists are discrete cells (§4.7 S11): an authored four-column cell reads poor / modest / prosperous / rich, `squalid`
reading the poor row and `comfortable` the modest row (J-V3.28).

**Types (BCR-V3-1 adds the new tables and extends §10.2's two rows).**

```ts
interface RoomRoleRow {   // one per RoomRole: what a role is, wherever a programme names it
  role: RoomRole; scope: Room['scope'] /* the default scope; a RoomRuleRow's scope overrides; A2 (1) sets 'unit' */;
  area: [number, number, number] | 'ring' /* m²: min, target, max before the ladder's sizeFactor; 'ring': the composer's or a structural ring, never area-checked */;
  storey: 'any'|'ground'|'upper'|'top'|'basement'|'notBasement'|'belowTop' /* belowTop: any storeyed level but the building's highest
                                 (a stepped temple's sacristy off the one-room shrine, 2.4) */; exterior: 'none'|'some'|'max';
  door: 'door'|'arch'|'open'|'passage'|'none' /* passage and none only on the structural rows */; maxDoors: number;
  hearth: boolean; lit: boolean; minWidthCm: Cm;
  aspectMax: number /* long ÷ short side of the room's OBB: slice refuses a part above it, soft — tried last (3.5) */;
  bias: 'none'|'sun'|'lowEnd' /* the assignment's tie-break among equal fits (3.5): sun — the part facing nearest the noon sun (item 102);
                                 lowEnd — the part whose centroid samples lowest (a longhouse's byre, downslope) */;
  hosts: number /* sub-locations one room of the role hosts (A2 (5)) */;
  furnish: { density: number /* items per m² */; wallBias: number /* share placed at wall slots first (F3) */; glyphs: string[] } }
interface FurnitureRow {  // the abstract glyph catalogue; setting-agnostic shapes, our own
  glyph: string; shape: 'rect'|'round'|'ell'; wCm: [Cm, Cm]; dCm: [Cm, Cm]; placement: 'against'|'corner'|'free'|'row';
  clearCm: Cm /* free floor kept in front of it */; perRoomMax: number; weight: number; band?: string[] /* absent: every band */;
  tall: boolean /* taller than a sill: an against item keeps off a window's bay (F3) */ }
interface PatternRow { pattern: LayoutPattern; requires: 'none'|'entrance'|'hall'|'core'|'courtOrStreet' /* what a seed piece must hold for the pattern to cut it (3.5) */ }
interface EntranceAnchorRow { entrance: Entrance['role'] | 'concealed'; roles: (RoomRole | 'crossPassage' | 'firstGround' | 'concealedFirst')[] /* A2 (8) */ }
interface WingAffinityRow { role: RoomRole; wings: string[] /* WingRole values (BCR-V2-01) or 'part:<partName>' (BCR-V3-13), preferred first (A5 (e));
                                 'tier:top' the highest storeyed tier, 'tier:entrance' the tier holding the main entrance's storey (item 110 (c)) */ }
interface SubLocationRoleRow { key: string /* a SubLocation tag, a SettlementForge tag of a custom service, or 'cap:<capacity key>' */; roles: RoomRole[] /* A2 (5) */ }
interface AccessHostRow { reach: string /* the reached element's system kind (II.7.6's kinds, sewer included, ruin, item 109 (b), and mine), or 'well' */;
  cause?: AccessCause['rule'] /* V4 §2.2 (BCR-30): a row with a cause wins over the row without one for the same reach */; roles: RoomRole[] /* 3.7.2 (6) */ }
interface PlanGeometryRow {   // one row per table version
  moduleCm: Cm /* 50, the wing-local module (§2.6 step 4) */; minRoomWidthCm: Cm /* 180 */; corridorCm: Cm /* 100 */; galleryCm: Cm /* 120 */; crossPassageCm: Cm /* 150 */;
  door: { mainCm: Cm /* 120 */; entranceCm: Cm /* 100 */; internalCm: Cm /* 80 */; serviceCm: Cm /* 90 */; archCm: Cm /* 120 */; jambCm: Cm /* 15 */; heightCm: Cm /* 200 */ };
  window: { widthCm: Record<string /* band id */, Cm> /* squalid 40, poor 50, modest 60, comfortable 70, prosperous 80, rich 100 */; slitCm: Cm /* 20 */; endClearCm: Cm /* 30 */; sillCm: Cm /* 90 */; headCm: Cm /* 210 */; lightBelowCm: Cm /* 60 */ };
  stair: { riserCm: Cm /* 20 */; goingCm: Cm /* 23 */; flightCm: { house: Cm /* 90 */; institution: Cm /* 120 */ }; landingCm: Cm /* 90 */; spiralCm: Cm /* 180, diameter */; ladder: [Cm, Cm] /* 70 × 110 */; hatchCm: Cm /* 80 */ };
  hearth: { stackCm: [Cm, Cm] /* 60 × 60, one flue */; doubleCm: [Cm, Cm] /* 60 × 100, back to back */; apronCm: Cm /* 90 */; flueReachM: M /* 30: an underground hearth's reach to an air shaft (3.12) */ };
  access: { shaftCm: Cm /* 120 */; wellCm: Cm /* 150, parapet included */; snapCm: Cm /* 300 */ };
  crypt: { bayCm: Cm /* 400: the column grid's pitch (3.7.5) */; columnCm: Cm /* 50: a column's square side */ };
  datum: { maxSteps: number /* 3 */ };
  unitFloorM2: Record<UnitForm, number> /* house 60, dwelling 30, lodging 16, apartment 12, room 9 — A3's floor per unit */;
  furnish: { walkwayCm: Cm /* 60 */ };
  view: { planCap: number /* 64 */; planStop: number /* 350: 'view' derives and draws plans at 1:350 or finer */; leavesStop: number /* 350 */; treadsStop: number /* 250 */;
    frameShare: number /* 0.6 */; frameStops: [number, number] /* [125, 350]: the zoom-to-plan clamp (4.5) */ };
  sunTieBreak: boolean /* true; false is a no-op pin (the bias 'sun' ignored) */;
  exposureAllStoreys: boolean /* true: W2's outside-ground gates on every storey and Entrance.storey by the ground (3.6; item 110 (a));
                                 false: exposure read on basement walls only and every entrance on storey 0 — the no-op pin of T-V3-34 */ }
```

§10.2's rows as BCR-V3-1 extends them: `RoomProgramRow.for` gains `family?: string` (a V11 template family key),
`slot?: string` (a structure slot role, `#n` for the n-th slot of that role in slot order) and `half?: 'works'|'shop'`;
`for.use` holds a specialisation name (V11 §3.6.2); `for.cls` holds a V11 class id, a §2.6 building class, or `'*'` in a
generic slot row. `RoomProgramRow` gains `shared?: 'all'|'none'|RoomRole[]` (the ladder row's shared rooms the key
admits; default `'all'`), `unitHearth?: boolean` (the poor row's cooking place carries a hearth; default true),
`unitOneRoom?: boolean` (a unit's rooms are delivered as one room, A2 (1); default false), `fill?: RoomRole[]` (A5 (f)),
`staffSleepIn?: number` (A2 (3b); default 0), `seatingExits?: boolean` (3.3 S6 (d): a core against a solid seating wing
ends in an exit onto it; default false); its `furnish.density` and `furnish.wallBias` are multipliers (default 1) of
the role cells; each pattern entry's weight is stated at every band (0 excludes). `RoomRuleRow`'s `area`, `storey`,
`exterior`, `door`, `adjacency` and `furnish` become optional (absent: the role table's cell; adjacency absent: none),
`storey` gains `'notBasement'` and `'belowTop'`, `count` gains `perRoom?: number` (the `perCapacity` divisor: capacity ÷ perRoom rooms,
rounded up), and the row gains `half?: 'works'|'shop'|'both'` (default `both`) and `hearth?` keeps its meaning (a cell
that overrides the role's).

**The pattern table** (`PatternRow`): `nave` none; `bisect` none; `follow` courtOrStreet; `spine` core (a piece holding
the core's bay, else the main entrance); `hall_and_parlour` hall (a piece holding a `hall`, `common room` or `taproom`
target and at least one more); `cross_passage` entrance (the piece holding the main entrance); `enfilade` none.

**The default role table** (areas in m²; `U` upper, `G` ground, `T` top, `B` basement, `nB` not basement; exterior
n / s / m; scope `svc` service, `circ` circulation, `sh` shared; bias `sun`, `low`, `—`; hosts 1 unless noted; density
in items per m²). Density provenance: store, kitchen, parlour and stair hall are `ref:Dwellings itch 17195045 prop density
(export), scaled at 2 m per cell` (the measured medians ÷ 4), hall and chamber the same rounded; every other density,
every area and every other cell is `own` (J-V3.22, V3C-57):

| role | scope | area min / target / max | storey | ext | door | maxDoors | hearth | lit | minWidth cm | aspectMax | bias | density | glyphs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| hall | svc | 16 / 24 / 40 | G | s | door | 4 | yes | yes | 300 | 2.5 | sun | 0.06 | table, bench, chest |
| parlour | svc | 10 / 15 / 26 | any | s | door | 3 | yes | yes | 250 | 2 | sun | 0.075 | table, stool, chest |
| solar | svc | 12 / 18 / 30 | U | m | door | 2 | yes | yes | 300 | 2 | sun | 0.07 | bed, chest, table |
| chamber | svc | 8 / 12 / 20 | nB | s | door | 1 | no | yes | 240 | 2 | — | 0.08 | bed, chest |
| staff chamber | svc | 4 / 6 / 9 | any | s | door | 1 | no | yes | 180 | 2.5 | — | 0.10 | cot, chest |
| bedroom | svc | 6 / 8 / 12 | nB | s | door | 1 | no | yes | 200 | 2 | — | 0.08 | bed, chest |
| cooking place | svc | 3 / 4 / 6 | nB | s | open | 2 | yes | yes | 150 | 3 | — | 0.10 | table, barrel |
| room | svc | 9 / 10 / 14 | nB | s | door | 1 | no | yes | 220 | 2 | — | 0.08 | pallet, chest |
| kitchen | svc | 9 / 14 / 24 | G | s | door | 3 | yes | yes | 250 | 2 | — | 0.125 | table, bench, barrel, shelf |
| buttery | svc | 4 / 6 / 10 | G | n | door | 1 | no | no | 180 | 3 | — | 0.15 | barrel, shelf |
| store | svc | 4 / 8 / 16 | any | n | door | 1 | no | no | 180 | 4 | — | 0.15 | crate, barrel, shelf |
| cellar | svc | 6 / 12 / 30 | B | n | door | 2 | no | no | 180 | 4 | — | 0.15 | barrel, crate, shelf |
| common room | svc | 16 / 26 / 45 | G | m | open | 4 | yes | yes | 350 | 2 | sun | 0.07 | table, bench |
| taproom | svc | 16 / 24 / 40 | G | m | door | 3 | yes | yes | 300 | 2 | sun | 0.09 | table, bench, barrel, counter |
| guest room | svc (hosts 2) | 8 / 10 / 14 | U | s | door | 1 | no | yes | 240 | 2 | — | 0.08 | bed, chest |
| dormitory | svc (hosts 4) | 16 / 24 / 40 | U | s | door | 1 | no | yes | 300 | 3 | — | 0.10 | pallet |
| shop | svc | 10 / 16 / 28 | G | m | door | 2 | no | yes | 250 | 2.5 | sun | 0.10 | counter, shelf, chest |
| workshop | svc | 14 / 22 / 40 | G | m | door | 2 | no | yes | 300 | 3 | — | 0.10 | workbench, shelf, crate |
| forge | svc | 12 / 18 / 30 | G | s | arch | 2 | yes | yes | 300 | 2.5 | — | 0.08 | anvil, workbench, barrel |
| bakehouse | svc | 12 / 18 / 28 | G | s | door | 2 | yes | yes | 300 | 2.5 | — | 0.08 | table, trough |
| brewhouse | svc | 14 / 22 / 36 | G | s | door | 2 | yes | yes | 300 | 2.5 | — | 0.10 | vat, barrel |
| slaughter room | svc | 12 / 20 / 36 | G | s | arch | 2 | no | yes | 300 | 2.5 | — | 0.05 | table, trough, rack |
| kiln | svc | 12 / 20 / 40 | G | s | arch | 2 | yes | yes | 300 | 2 | — | 0.05 | crate, shelf |
| furnace | svc | 8 / 12 / 20 | G | n | door | 1 | yes | no | 250 | 2 | — | 0.05 | crate |
| counting room | svc | 6 / 9 / 14 | nB | s | door | 1 | no | yes | 200 | 2 | — | 0.10 | table, chest, shelf |
| office | svc | 8 / 12 / 20 | nB | s | door | 2 | yes | yes | 250 | 2 | — | 0.10 | table, shelf, chest |
| study | svc | 6 / 10 / 16 | nB | s | door | 1 | no | yes | 220 | 2 | — | 0.12 | table, shelf, stool |
| library | svc | 16 / 30 / 90 | nB | m | door | 2 | no | yes | 350 | 3 | — | 0.10 | shelf, table, stool |
| laboratory | svc | 10 / 16 / 30 | nB | s | door | 1 | yes | yes | 250 | 2 | — | 0.12 | table, shelf, vat |
| guard room | svc | 10 / 16 / 24 | G | s | door | 2 | yes | yes | 250 | 2.5 | — | 0.08 | bench, table, rack |
| armoury | svc | 8 / 16 / 40 | nB | n | door | 1 | no | no | 250 | 3 | — | 0.12 | rack, chest |
| mess | svc | 16 / 30 / 80 | nB | m | door | 3 | yes | yes | 350 | 3 | — | 0.08 | table, bench |
| ward | svc (hosts 6) | 20 / 40 / 100 | nB | m | door | 2 | yes | yes | 400 | 4 | — | 0.10 | bed, chest |
| cell | svc | 4 / 6 / 9 | any | n | door | 1 | no | no | 180 | 2 | — | 0.10 | pallet |
| bath | svc | 15 / 30 / 80 | G | s | door | 2 | no | yes | 300 | 3 | — | 0.04 | vat, bench |
| nave | svc | 30 / 120 / 900 | G | m | arch | 4 | no | yes | 400 | 4 | — | 0.06 | altar, pew |
| chancel | svc | 20 / 45 / 150 | G | m | arch | 3 | no | yes | 400 | 3 | — | 0.04 | altar, bench, ledger (only where the building has no crypt, F3) |
| chapel | svc | 12 / 20 / 40 | nB | m | arch | 2 | no | yes | 300 | 3 | — | 0.05 | altar, bench |
| chapter house | svc | 40 / 60 / 120 | G | m | door | 2 | no | yes | 500 | 2 | — | 0.05 | bench |
| sacristy | svc | 6 / 9 / 14 | G | s | door | 1 | no | yes | 200 | 2 | — | 0.10 | chest, shelf |
| crypt | svc | ring (`Basement.crypt.ring`, 3.7.4; its size is volume 11's `cryptM2`) | B | n (a `raised` crypt's walls above ground: `light` windows, W2) | arch | 2 | no | no | 300 | — | — | 0.03 | tomb |
| porch | circ | 4 / 8 / 16 | G | s | arch | 2 | no | yes | 200 | 2.5 | — | 0.05 | bench |
| undercroft | svc | 20 / 40 / 120 | G | s | arch | 3 | no | no | 300 | 4 | — | 0.05 | crate, barrel |
| arcade | svc | 40 / 150 / 700 | G | m | open | 8 | no | yes | 400 | 6 | — | 0.08 | table, counter |
| garderobe | svc | 1 / 1.5 / 3 | nB | s | door | 1 | no | no | 90 | 3 | — | 0 | — |
| garret | svc | 6 / 12 / 30 | T | s | door | 1 | no | yes | 200 | 4 | — | 0.10 | crate, pallet |
| mill room | svc | 20 / 40 / 80 | G | s | arch | 2 | no | yes | 300 | 2 | — | 0.04 | millstone, crate |
| barn floor | svc | 40 / 80 / 200 | G | n | arch | 2 | no | no | 400 | 4 | — | 0.02 | crate, trough |
| byre | svc | 15 / 30 / 60 | G | s | door | 2 | no | no | 300 | 4 | low | 0.05 | stall, trough |
| stable | svc | 20 / 40 / 100 | G | s | arch | 2 | no | no | 300 | 5 | — | 0.05 | stall, trough, rack |
| dovecote | svc | 6 / 12 / 25 | G | n | door | 1 | no | no | 200 | 2 | — | 0.20 | shelf |
| back room | svc | 8 / 12 / 20 | nB | n | door | 1 | no | yes | 200 | 2.5 | — | 0.08 | table, bench |
| strongroom | svc | 4 / 6 / 10 | any | n | door | 1 | no | no | 180 | 2 | — | 0.12 | chest |
| towerRoom | svc | ring | any | m | door | 2 | no | yes | 200 | — | — | 0.06 | table, chest |
| gatehall | circ | ring (12 / 20 / 40 in a gatehouse slot) | G | n | arch | 4 | no | yes | 300 | — | — | 0 | — |
| stair hall | circ | 6 / 9 / 16 | any | s | open | 6 | no | yes | 200 | 5 | — | 0.05 | bench |
| corridor, landing | circ | derived (3.5) | any | s | open | — | no | no | `corridorCm` | — | — | 0 | — |
| passage | circ | ring (the span ring, §2.6) | G | n | passage | 2 | no | no | — | — | — | 0 | — |
| stair | circ | ring (a core's bay, a head's bay, a crypt stair's or a choir flight's ring; 3.3, 3.7) | any | n | open | 2 | no | yes | — | — | — | 0 | — |
| stack | circ | ring (the stack's ring, 3.3) | any | n | none | 0 | no | no | — | — | — | 0 | — |
| shaft | circ | ring (a shaft's or well's ring, 3.7.2) | any | n | open (at its head), none (through) | 1 | no | no | — | — | — | 0 | — |
| column | circ | ring (a crypt column, 3.7.5; a ruin chamber's column inside an underground building, 3.12) | any | n | none | 0 | no | no | — | — | — | 0 | — |
| cistern | svc | 8 / 20 / 80 | G | n | arch | 1 | no | no | 250 | 3 | — | 0 | — (drawn with §8.2's water role as its floor fill, 5.1) |

`back room` and `strongroom` are the concealed programme's roles (item 63); `crypt` the room of `Basement.crypt` (3.7.4 –
3.7.5); `stair`,
`stack`, `shaft` and `column` are structural faces (every storey's rooms tile its extents, §2.6's fourth rung): never allocated by
A5, never furnished; `stack` and a `shaft`'s through-ring never labelled or entered (BCR-V3-9). `towerRoom` and `gatehall`
are volume 2's composer roles (V2 §3.8) with its spelling; `gatehall` in a gatehouse slot without a composer takes the
area shown.

**The class rows** (the last resolution level of A1 but one, keyed by §2.6's `BuildingClass`; every `RoomProgramRow` of
the class at every band). Notation: rooms as role × count law (priority; storey where the role's is overridden; bands
where not all); patterns as ground / upper / top / basement, each `pattern weight`; circulation as rich → squalid; fill in
order. Unit, shared, staff and circulation rooms come from the interior ladder (§2.6) and resolve through the role table:

| class | own rooms | patterns | stair: placement, kind | basementAccess | circulation | shared, unitHearth, unitOneRoom | fill |
|---|---|---|---|---|---|---|---|
| hovel, tent, shack, lean_to_shelter | — | nave 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 0/1 | none, true, true | — |
| cottage | — | hall_and_parlour 3, bisect 1 / bisect 1 / bisect 1 / nave 1 | rear, winder | trapdoor | 1/20 at every band | all, true, false | chamber, store |
| house | — | rich–comfortable: hall_and_parlour 2, cross_passage 1, spine 0; modest–squalid: hall_and_parlour 1, cross_passage 1, spine 1 / rich–comfortable: bisect 2, spine 0; modest–squalid: bisect 1, spine 2 / bisect 1 / nave 1 | by_entrance, dogleg | core | 1/10, 1/10, 1/8, 1/6, 1/5, 1/5 | all, true, false | chamber, store |
| row_house | shop × const 1 (soft) where the template's frontage is `shopfront` or `stall` | rich–comfortable: cross_passage 2, follow 1, spine 0; modest–squalid: cross_passage 1, follow 1, spine 1 / bisect 1, spine 1 (spine 0 at rich–comfortable) / bisect 1 / nave 1 | rear, straight | core | as house | all, true, false | chamber, store |
| hall | hall × 1 (hard; area 40 / 80 / 250; ground, or upper over an undercroft × 1 where floors > 1), counting room × 1, office × 1 (soft), store × perStorey | nave 2, follow 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/10 | all, true, false | store |
| inn | common room × 1 (hard; area 30 / 45 / 90), kitchen × 1 (hard), buttery × 1, store × 1, guest room × perCapacity (tag tempResidential, perRoom 2), dormitory × 1 (poor, modest), parlour × 1 (prosperous, rich), counting room × 1 (rich) | cross_passage 2, follow 1 / spine 1 / spine 1 / nave 1 | centre, dogleg | core | 3/20 | all, true, false | guest room |
| workshop | workshop × 1 (hard), store × 1 | follow 2, bisect 1 / bisect 2, spine 1 (spine 0 at comfortable and richer) / bisect 1 / nave 1 | rear, straight | trapdoor | 1/8 | all, true, false | store, chamber |
| warehouse | store × perStorey (hard), counting room × 1 | nave 2, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/20 | none, true, false | store |
| chapel | nave × 1 (hard), sacristy × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 0/1 | none, true, false | — |
| church, temple | nave × 1 (hard), chancel × 1 (hard), sacristy × 1, chapel × 1 (soft; prosperous, rich) | nave 1 everywhere | tower, spiral (else by_entrance, winder) | core | 1/20 | none, true, false | — |
| manor | (A2 (4): only at the one-household ladder form) hall (area 40 / 80 / 250), solar, parlour, kitchen, buttery × 1 each (hard), chapel × 1 (rich), counting room × 1, garderobe × perStorey, store × 1 | hall_and_parlour 2, cross_passage 1 / enfilade 1, follow 1 / bisect 1 / nave 1 | centre, dogleg (tower, spiral where a tower joins the wing) | core | 1/10 | all, true, false | chamber, parlour, store |
| keep | hall × 1, guard room × 1, store × perStorey (basement), garderobe × perStorey (hard) | nave 1, bisect 1 / nave 1, bisect 1 / nave 1 / nave 1 | tower, spiral (else centre, winder) | core | 1/20 | all, true, false | chamber, store |
| tower | towerRoom × perStorey | nave 1 everywhere | centre, spiral | core | 0/1 | none, true, false | — |
| mill | mill room × 1 (hard), store × 1 | nave 1 / bisect 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | none, true, false | store |

Per-band cells: the circulation column gives the six rows' `circulation` (the default band set's order, §4.5); every
other column holds at every row unless it names rows. The poorest row's circulation is the one §2.6's capacity reads — on PE's register line (V12 §3.11's default line), never
tuned at V3-P6; the `room` role's area, the capacity's other cell, rides the first register line, measured there and never
tuned (the register lines below; SCC-R3C-8, SCC-91).
`unitOneRoom`: a hovel's household lives in one room with its hearth (A2 (1)).

**The template-family rows** (`for.family`, V11 §3.6.1's families; the rooms stand in the family's **main slot** — its
first structure marked required, else its first structure; the other slots take the slot rows below). Four-column
cells p / m / pr / r; "= X" takes class row X whole:

| family | main slot | own rooms | patterns | stair | bAcc | circ | fill |
|---|---|---|---|---|---|---|---|
| `dwelling-row` | house | = row_house | | | | | |
| `dwelling-detached` | house | = house | | | | | |
| `dwelling-compound` | hall | hall × 1 (hard; area 40 / 80 / 250); parlour × 1 (soft); counting room × 1 (soft; pr, r) | as manor | centre, dogleg | core | 1/10 | chamber, parlour, store |
| `hovel`, `cluster` | hut, the cluster's structure | = hovel | | | | | |
| `lodging-row` | house | kitchen × 1 (shared, soft, ground, adjacency hard to core); common room × 1 (shared, soft; m, pr, r) | cross_passage 2, bisect 1 / spine 1 / spine 1 / nave 1 | by_entrance, dogleg | core | 1/6 | room |
| `shopfront` | shop-house | shop × 1 (hard); store × 1 (soft; m, pr, r); counting room × 1 (soft; r) | cross_passage 1, follow 1, bisect 1 / bisect 2, spine 1 / bisect 1 / nave 1 | rear, straight | core | 1/10 | chamber, store |
| `workshop-row` | shop-house | workshop × 1 (hard); shop × 1 (soft; m, pr, r); store × 1 (soft; pr, r); counting room × 1 (soft; r) | follow 2, bisect 1 / bisect 2, spine 1 / bisect 1 / nave 1 | rear, straight | trapdoor | 1/8 | store, chamber |
| `workshop-yard` | house | = house (the dwelling); the work in its `forge or workshop` slot | | | | | |
| `works-noxious` | works | workshop × 1 (hard); store × 1 (soft); office × 1 (soft; pr, r) | nave 2, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | trapdoor | 1/20 | store |
| `yard` | shed | store × 1 (hard); workshop × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 1/20 | store |
| `kiln-yard` | kiln | kiln × 1 (hard); store × 1 (soft) | nave 2, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | store |
| `warehouse` | store | = warehouse | | | | | |
| `market-hall` | hall | arcade × 1 (hard, ground); hall × 1 (hard, upper); office × 1 (soft, upper) | nave 1 / nave 2, bisect 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/20 | store |
| `hall` | hall | = hall | | | | | |
| `inn-compound` | inn | = inn | | | | | |
| `tavern-row` | house | taproom × 1 (hard); store × 1 (soft, basement; m, pr, r); guest room × 2 (soft; pr); parlour × 1, guest room × 3, kitchen × 1 (soft; r) | cross_passage 2, follow 1 / bisect 1, spine 1 / bisect 1 / nave 1 | by_entrance, dogleg | core | 1/10 | chamber, guest room |
| `bath-house` | bath hall | bath × 1 (hard); furnace × 1 (hard); room × 1 (soft: the changing room); store × 1 (soft) | nave 1, bisect 2 / bisect 1 / nave 1 / nave 1 | by_entrance, straight | trapdoor | 1/20 | room |
| `church` | nave | = church | | | | | |
| `chapel` | nave | = chapel | | | | | |
| `cathedral` | nave and choir | nave × 1 (hard); chancel × 1 (hard); sacristy × 1; chapel × 3 (soft) | nave 1 everywhere | tower, spiral (else by_entrance, winder) | core | 1/20 | — |
| `cloister` | church | = church | | | | | |
| `court-institution` | main range | hall × 1 (hard); office × 1 (soft); chamber × 1 (soft: the warden's); kitchen × 1 (soft) | hall_and_parlour 1, cross_passage 1, bisect 1 / spine 1, bisect 1 / bisect 1 / nave 1 | centre, dogleg | core | 1/8 | chamber, store |
| `barracks` | block | dormitory × perStorey (hard, upper); mess × 1 (hard, ground); armoury × 1; guard room × 1; office × 1 (soft) | nave 1, bisect 1 / spine 2, nave 1 / nave 1 / nave 1 | centre, dogleg | core | 1/8 | dormitory, store |
| `watch-house` | post | guard room × 1 (hard); store × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 0/1 | — |
| `tower` | tower | = tower | | | | | |
| `castle` | the keep | = keep | | | | | |
| `farm` | farmhouse | = house, with kitchen × 1 (hard) and store × 1 (soft: the dairy) | | | | | |
| `mill` | mill house | = mill | | | | | |
| `extractive` | works shed | workshop × 1 (hard); store × 1 (soft) | nave 1 everywhere | by_entrance, ladder | trapdoor | 0/1 | — |
| `landing-yard` | sheds | store × 1 (hard); workshop × 1 (soft) | nave 1, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | store |
| `stable-yard` | stable | stable × 1 (hard); store × 1 (soft, top: the hay loft) | nave 1, bisect 1 / nave 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | store |

**The slot rows** (`for.slot`; for every structure that is not its template's main slot; resolved (1) a row with that slot
under the building's class id, (2) under its family, (3) the generic slot row below (`for.cls` `'*'`), (4) the building's
class row; the level is reported): house, farmhouse, close houses, parsonage → the `house` class row at the band; dwelling
(staff) → the `cottage` class row; hut → `hovel`; shed, sheds → store × 1 (hard), workshop × 1 (soft), nave; hall → the
`hall` class row; main range → the `court-institution` family row; kitchen → kitchen × 1 (hard), buttery × 1, store × 1
(soft), bisect; stable, stables → stable × 1 (hard), store × 1 (soft, top); store → store × perStorey (hard); cellar store →
store × perStorey (hard; basement preferred where the building has one); shop-house → the `shopfront` family row;
workshop, works, works shed → workshop × 1 (hard), store × 1 (soft); forge → forge × 1 (hard), store × 1 (soft); forge or
workshop → forge × 1 (hard) where the class's V11 profile family is `metalwork`, else workshop × 1 (hard), each with
store × 1 (soft); journeymen → dormitory × 1 (hard), staff chamber × 1 (soft: the foreman's), spine; office → office × 1
(hard), store × 1 (soft); kiln → kiln × 1 (hard), store × 1 (soft); inn → `inn`; brewhouse → brewhouse × 1 (hard), store
× 1 (soft, basement); bath hall → the `bath-house` family row; furnace → furnace × 1 (hard); nave, church → the `church`
class row; nave and choir → the `cathedral` family row; tower, towers → the `tower` class row; porch → porch × 1 (hard);
chapter house → chapter house × 1 (hard); cloister ring → arcade × 1 (hard), nave; gatehouse → gatehall × 1 (hard),
guard room × 1 (soft: the porter's); barn, barns → barn floor × 1 (hard), store × 1 (soft, top); byre → byre × 1 (hard),
store × 1 (soft, top); chapel → the `chapel` class row; block → the `barracks` family row; armoury → armoury × perStorey
(hard); post → the `watch-house` family row; annex → store × 1, office × 1 (soft); mill house → `mill`; wheel or sails →
mill room × 1 (hard); dovecote → dovecote × 1 (hard); chamber block → solar × 1 (hard), chamber × perStorey (soft),
enfilade; ranges → chamber × perStorey (hard), store × 1 (soft). Under the `cloister` family: ranges#1 → chapter house × 1
(hard, ground), dormitory × 1 (hard, upper); ranges#2 → mess × 1 (hard, ground: the refectory), kitchen × 1 (hard);
ranges#3 → store × perStorey (hard), guest room × 2 (soft, upper). A slot role no row names falls to the building's class
row, reported `buildingClass`.

**The class-id rows** (`for.cls` a V11 class id, V11 §3.5; band cells p / m / pr / r follow V11 §3.6.2's specialisations,
so a building's work grows with the quarter's wealth — DEFINITION §3 step 7; `slot` where the rooms stand in a slot other
than the main; `staffSleepIn` where not 0). Every other V11 class takes its family row:

| class id | rooms (p / m / pr / r) | notes |
|---|---|---|
| `smithy`, `farrier`, `armourer` | slot `forge or workshop`: forge / forge, store / forge, shop, store / forge, shop, store, counting room | staffSleepIn 0.5; the journeymen's beds go to a `journeymen` slot where the template has one (A2 (3b)) |
| `bakery` | bakehouse / bakehouse, shop / bakehouse, shop, store / bakehouse, shop, store, counting room (all soft but the bakehouse and, from m, the shop) | staffSleepIn 0.5 |
| `cookshop` | kitchen (hard), shop (hard); store (soft; pr, r) | — |
| `tavern`, `alehouse` | taproom / taproom, store (basement) / taproom, guest room × 2, store (basement) / taproom, parlour, guest room × 3, kitchen, store (basement); an alehouse stops at the modest cell | — |
| `inn`, `coaching_inn`, `caravanserai` | the `inn` class row | staffSleepIn 0.5 |
| `brewery` | half works: brewhouse (hard), store (soft, basement), counting room (soft; r); half shop: taproom (hard), store (soft, basement); both: brewhouse, taproom, store | split, item 105 (h); staffSleepIn 0.5 |
| `butcher` | half works: slaughter room (hard), store (soft); half shop: shop (hard), store (soft); both: shop (hard), slaughter room (soft; adjacency hard to entrance:yard), store | split |
| `potter` | half works: kiln (hard), store (soft); half shop: shop (hard), store (soft); both: kiln, shop, store | split |
| `shambles` | slaughter room × 2 (hard), shop × 1 (soft), store × 1 | — |
| `maltings` | kiln (hard), store × perStorey (hard) | — |
| `smelter` | forge (hard), store (soft) | — |
| `vintner` | shop (hard), store × 2 (hard, basement) | — |
| `goldsmith` | shop / shop, workshop / shop, workshop, strongroom / shop, workshop, strongroom, counting room | — |
| `moneylender`, `money_changer`, `pawnshop`, `bank` | shop or hall (bank), counting room, strongroom (hard) | — |
| `tailor` | workshop / workshop, shop / shop, workshop, store / shop, workshop, parlour (the fitting room), store | — |
| `apothecary`, `herbalist` | shop / shop, store / shop, laboratory (the still-room), store / shop, laboratory, study, store | — |
| `barber_surgeon`, `physician`, `healer` | shop or parlour, chamber (the surgery); physician: study, laboratory (soft; pr, r) | — |
| `alchemist`, `enchanter`, `scroll_scribe` | laboratory (hard), shop (soft), store (soft); scroll scribe: study for laboratory | — |
| `merchant_house` | — / counting room, store / counting room, store × perStorey, parlour / hall (area 40 / 80 / 250), counting room, store × perStorey, strongroom | — |
| `shop`, `grocer`, `fishmonger`, `draper`, `furrier`, `ship_chandlery`, `outfitter` | shop / shop, store / shop, store / shop, store, counting room | — |
| `mint`, `assay_office` | workshop or laboratory (hard), strongroom (hard), guard room, office | — |
| `town_hall`, `guildhall`, `customs_house`, `harbour_master` | hall (hard, upper over an undercroft where floors > 1), office × 2, counting room, store; guildhall: chapel (soft; r) | — |
| `courthouse` | hall (hard), office, cell × 2 (hard, basement preferred) | — |
| `archive`, `library` | library × perStorey (hard), office × 1 | — |
| `school`, `college`, `university`, `scriptorium` | hall (hard; not scriptorium), study × perStorey, library × 1 (soft); college and university: dormitory × perStorey (upper) | — |
| `mages_guild`, `academy_of_magic`, `mage_tower` | laboratory × 2, library × 1, study × perStorey; guild and academy: hall; the tower: towerRoom × perStorey as the class row | — |
| `hospital`, `foundling_home` | ward × perStorey (hard), chapel × 1 (soft), kitchen × 1, office × 1; foundling home: dormitory for ward | — |
| `almshouse` | the ladder's units, chapel × 1 (soft), kitchen × 1 (shared) | — |
| `prison`, `workhouse` | prison: cell × perCapacity (tag tempResidential, perRoom 1), guard room × 2, office; workhouse: dormitory × perStorey, workshop × 2, mess | — |
| `barracks`, `mercenary_hall`, `training_yard` | the `barracks` family row; mercenary hall: hall, mess, armoury | — |
| `watchtower`, `tower_house` | the `tower` class row with guard room × 1 (ground) (watchtower) or hall × 1 (first storey, tower house) | — |
| `market_hall`, `cloth_hall` | the `market-hall` family row | — |
| `cathedral`, `great_temple` | the `cathedral` family row | volume 11's crypt column `always`: the crypt from `Basement.crypt` (A2 (9), 3.7.4), the settlement's largest |
| `church` | nave, chancel / + sacristy / + sacristy, chapel / + sacristy, chapel × 2 | crypt column `basement`: a crypt from `Basement.crypt` exactly where its basement holds one (A2 (9)) |
| `monastery` | the `church` class row in its `church` slot; the cloister slots by the slot rows | — |
| `cemetery` | its chapel slot: the `chapel` class row | no crypt of its own (crypt column `never`); its catacomb is V04's (V4 §3.5.1), whose entrance stair is headed in the chapel's nave (3.7.2 (6)) |
| `theatre`, `opera_house`, `auction_house`, `adventurers_hall`, `hireling_hall`, `teleport_circle`, `planar_embassy` | hall (hard), store, room (soft); embassy: guest room × 2 | — |
| `conduit_house` (V3C-77) | cistern × 1 (hard), store × 1 (soft), office × 1 (soft; pr, r); patterns nave 2, bisect 1 / nave 1 / nave 1 / nave 1; stair by_entrance, ladder; trapdoor; 1/20 | the aqueduct's end house (item 110 (b)); its inlet mark where an aqueduct ends at it (5.1) |
| `arena` (V3C-78; volume 2's `ovalCourt`, from V2C-59) | office × 1 (soft; ground), store × perStorey (soft), cell × 2 (hard; basement preferred), store × 2 (soft; basement); patterns spine 1 everywhere (the ambulatory: the spine corridor along each storeyed ring wing); stair rear (the court side), straight; core; circulation 1/5 at every band; fill store; `seatingExits` true | the seating banks are solid wings (no rooms, 3.4); the arena floor is the composition's court, never a room; the gate halls are volume 2's composer rooms (A2 (11)) with their court arches (3.6 O1 (b)) |
| `'*'` · `for.use` `stepped_temple` (V3C-69, V3C-83) | chapel × 1 (hard; storey top: the sanctuary, alone on the shrine's top storey), sacristy × 1 (soft; belowTop), store × 1 (soft; belowTop); patterns nave 1 everywhere; stair by_entrance, ladder; trapdoor; 0/1; fill none | on a solid stack the shrine is the only storeyed wing, so the sacristy and the store are dropped (tier 0, `shrineOneRoom`); a crypt by volume 11's column (a great temple's `always`), entered by the tomb door (3.7.1) |
| `'*'` · `for.use` `terraced_palace` | the `manor` class row, with hall × 1 (hard; storey ground, affinity `tier:entrance`), solar × 1 and chamber × perStorey (soft; upper); fill chamber, parlour, store | its tiers joined by S5's chain cores and S6's landing doors |
| `'*'` · `for.use` `tiered_tower` | the `tower` class row (towerRoom × perStorey); stair centre, spiral | one core up every tier it fits (S5 (a)) |
| `golem_works`, `necro_works` | workshop × 2 (hard), laboratory (hard), store | — |

**The village class rows** (V07 §2.4's classes; S23R1-07, SR1-06; J-V3.111). Each row is keyed by the class's **`v.`
key** (`for.cls` = `v.<id>`, as V07 §2.4 and V11 §2.9 key them): a village row and V11's town row of the same word are two
keys, so a row here that takes a town row names it. Same resolution (A1): `v.longhouse` — hall × 1 (hard, the unit's
hearth room), byre × 1 (hard; bias `lowEnd`: the downslope end, V7 §2.4's "byre end downslope"), nave 1, bisect 1 / — / —
/ nave 1, by_entrance, ladder, trapdoor, 0/1, unitOneRoom false; `v.farmstead` — the `farm` family row, its barn and byre
by the slot rows; `v.yeoman_house` — the `house` class row, its barn and dovecote by the slot rows; `v.manor_house` — main
slot `hall`: hall × 1 (hard; area 40 / 80 / 250), kitchen × 1 (soft), the chamber block, kitchen, barn, stables and
dovecote by the slot rows; `v.parish_church` — the `church` class row (its west tower a `part:tower` wing, BCR-V3-13);
`v.parsonage` — the `house` class row; `v.tithe_barn` — barn floor × 1 (hard), store × 1 (soft); `v.watermill`,
`v.windmill` — the `mill` class row; `v.smithy`, `v.alehouse`, `v.inn` — the town class-id rows `smithy`, `alehouse`,
`inn`; `v.chapel` — the town `chapel` class row; `v.hovel`, `v.cottage` — the town `hovel` and `cottage` class rows;
`v.bakehouse` (the common oven) — bakehouse × 1 (hard), store × 1 (soft), nave 1 everywhere, by_entrance, ladder,
trapdoor, 1/20, fill store (J-V3.112); `v.shop` (a general dealer with a stall front) — the `shopfront` family row
(J-V3.112).

**A `v.` key without a row of its own** (today `v.reeve_house`, `v.landing`, `v.wood_yard`, `v.charcoal_pit`, `v.potter`,
`v.tannery`, `v.watchtower` and `v.pound`, and any village class added later; SR1-06) reads, at A1 (3), the row named by
the composition key volume 2's `composition.classFamily` gives that `v.` key (V2 §3.10.5, keyed by the `v.` keys, SR1-05):
the template-family row of that name above, else the class row of that name (§2.6's `BuildingClass`, e.g. `manor`,
`cottage`), else the slot row of that name (e.g. `barn`, `kitchen`); the row reached is reported at level `family` with
`programmeSource.via` naming the key (2.3). A composition key that places no building (`yardPart`: `v.pound`, a walled pen)
yields no plan, as no building stands. A key that names no row here falls on to A1 (4), reported with `via`, which T-V3-1
fails. The key-to-row lookup reads volume 2's table at run time and restates none of its cells.

**The vacant programme** (A1, a building with no `use` and no household, item 17): the class row at the plot's
`builtBand` with the as-built unit form's rooms (the ladder row at `builtBand`), and the crypt where `Basement.crypt`
exists (A2 (9)), every room scope `service`, no `unit`, no furniture, labelled by role; `PlanReport.programmeSource.vacant`
set. A ruined or decayed building draws this plan as
5.1 states.

**The entrance anchors** (`EntranceAnchorRow`, A2 (8)): main → [stair hall (A6 only), gatehall, common room, taproom,
shop, arcade, nave, hall, crossPassage, firstGround]; yard → [kitchen, bakehouse, brewhouse, forge, slaughter room, stable,
byre, store]; service → [kitchen, store, buttery, furnace]; side and rear → [shop, taproom, workshop, store, hall];
concealed → [concealedFirst]. `crossPassage` is the `cross_passage` strip; `firstGround` the first `ProgramRoom` in list
order on the entrance's storey; `concealedFirst` the concealed suite's first room.

The three `'*'` rows are keyed by specialisation (A1 rule (1)) until volume 11 names the class ids that carry
`stepped_temple`, `terraced_palace` and `tiered_tower` (V2's X17; V3C-69 (4)); they then move under those ids unchanged. No
row names volume 2's `stepped-monument`: a ruin's stepped monument is volume 4's chamber record, not a building, and has no
plan (V2 §3.15.6; critique/V04.md C4-110-8; J-V3.96).

**The wing affinities** (`WingAffinityRow`, A5 (e)): hall → tier:entrance, main; common room, taproom, shop, arcade → main, range; parlour,
solar, chamber → cross, main, block; kitchen, buttery, bakehouse, brewhouse, furnace, store, staff chamber → service, back,
main; stable, byre, barn floor → service, back, main; gatehall → gate; towerRoom → tower, turret; nave → part:nave, main,
part; chancel → part:chancel, part:apse, main; sacristy → part:chancel, part:transept, main; chapel → part:transept,
part:chapel, cross, main; chapel and nave also → shrine, tier:top ahead of their lists; towerRoom → tower, turret, tier;
any other role → none (the largest remaining piece). A `stair` or other solid wing is never an affinity target (it
reaches no level, 3.4). The crypt has no affinity: its ring is placed by the basement function (3.7.4), never by A5.

**The sub-location roles** (`SubLocationRoleRow`, A2 (5)): SubLocation tags — bed → guest room, chamber; table →
common room, taproom; counter → shop, taproom; stage → common room, taproom, hall; bath → bath; pickup, deliver → store;
capacities, for a sub-location no tag maps (its largest capacity key) — cap:tempResidential → guest room; cap:leisure →
common room; cap:studying → study; cap:working → workshop; cap:guestWorker → dormitory; SettlementForge tags of a custom
service (item 104 (h) (5); V08 §2.6's tag words) — healing → ward; lodging → guest room; arcane, magic, enchanting,
alchemy → laboratory; legal, law, civic, public_authority → office; education, scholarly → study, library; religious,
church, divine → chapel; food → kitchen; trade, market, economic → shop; craft, metalwork, leather, textile → workshop;
banking → counting room; defense, military, security → guard room; warehouse → store.

**The access hosts** (`AccessHostRow`, 3.7.2 (6)): catacomb with cause `crypt` → crypt (volume 4's crypt join, V4 §3.5.7
(c): the only catacomb head a crypt holds); catacomb (any other cause) → cellar, nave, store (the burial ground's chapel,
V4 §3.5.1 (9)) — never a crypt; sewer, vaults, buried, dug, undercity → cellar, store; cavern, ruin, quarry, mine →
cellar, store, workshop; well → kitchen, store, and the yard entrance's room. A church-class building — one whose class's
crypt column is `always` or `basement` — never hosts a catacomb access of source `system` (3.7.2 (6)).

**The furniture catalogue** (glyph: shape, w × d cm, placement, clear cm, per room max, weight, tall):
bed (rect 90–140 × 190–200, against, 60, 2, 3, no) · cot (rect 70–80 × 180, against, 50, 2, 2, no) · pallet (rect 70–80
× 170–180, against, 40, 4, 2, no) · chest (rect 50 × 90–120, against, 60, 3, 2, no) · table (rect 80–100 × 120–240, free,
70, 2, 3, no) · stool (round 35, free, 30, 4, 1, no) · bench (rect 30–40 × 120–200, against, 50, 4, 2, no) · shelf (rect
35–40 × 90–180, against, 70, 3, 2, yes) · barrel (round 50–70, corner, 30, 6, 2, no) · crate (rect 50–70 × 50–70, corner,
30, 6, 2, no) · counter (rect 60 × 150–240, against, 90, 1, 3, no) · workbench (rect 70 × 150–200, against, 90, 2, 3, no)
· anvil (rect 40 × 70, free, 90, 1, 3, no) · trough (rect 60 × 150, against, 70, 1, 2, no) · vat (round 120–160, free, 70,
2, 3, yes) · rack (rect 40 × 150, against, 70, 2, 1, yes) · altar (rect 90–120 × 180–240, against, 120, 1, 5, yes) · pew
(rect 50 × 240–400, row, 70, 12, 3, no) · tomb (rect 90 × 210, free, 60, 4, 2, no) · millstone (round 140–180, free, 90,
1, 5, no) · stall (rect 100–150 × 220–260, against, 60, 12, 2, no) · ledger (rect 90 × 200, free, 0, 6, 2, no; drawn flush
with the floor, a burial slab in a church without a crypt, J-V3.44) · brazier (round 60, free, 90, 1, 3, no; an
underground hearth with no flue in reach, 3.12). The hearth is no furniture glyph: it is drawn from
`Room.hearth` (5.1).

**The work limit** moves to `workLimits.json` (§4.12, §5.1 (5)) as the plan stage's row `{ counter: 'plan.storey'; unit:
'moduleCells'; perUnit: 40; floor: 2 000 }` (BCR-V3-23 adds the unit).

**The register lines of `roomProgram.json`** (reconciliation round 3, second brief; SCC-R2C-17; J-V3.118). Every
calibratable cell of this volume's tables (registry row 38, V11 §3.1) takes its calibration register entry (V12 §3.11)
from exactly one line below, in V2 §3.10.10's form, `owner` `'V03'`, written by the seat landing the milestone that ships
the cell, in the same change (§8's exit cells); a column no line names takes V12 §3.11's default line, written in that
change by `plat calibrate register --defaults`. `bar.T-V3-35` is volume 12's bar-metric family (V12 §2.1) over this
volume's bar T-V3-35 (§7), registered by the seat landing P1 — the change that writes the first entry naming it — as a V12
`BenchBarDef`: `id` `'T-V3-35'`, `owner` `'V03'`, `statistic` its four clauses in order (unit `share`), `stages` `[]` (the
plan rung is a module reader with no StageId, V11 §3.1 row 38, so V12 §3.7.2 (4) admits no run's cell through the bar and
the lines are read at the exit only), `towns` B-PLAN's fixtures (`family` `'bplan'`, `perSetting` 1, each setting's
`preset` `'default'`) and B-CITY-lite (`family` `'bcity'`, its lite count per rung, `preset` `'default'`), `tier`
`'milestone'`, `run` T-V3-35's check, every building's plan derived by the `plan` query (4.6). A clause whose subject is
not yet built reads −1 and is left out of the verdict (clause (iv) before P2's furnishing); no entry naming the bar falls
due before V3-P6.

| cells — one entry each | method, due | metric | when it cannot confirm |
|---|---|---|---|
| every `RoomRoleRow`'s `area` triple (the `room` role's included: measured by T-V3-35 (i) at V3-P6 but never tuned there, since §2.6's capacity reads its minimum from M2b; the column's default entry, written at M2b, restated in place by this line at P1 — V12 §3.11's later-line rule; seam SCC-91 — should M6-P land after M-CAL's record, the restatement ships with a new major version of `roomProgram` (V12 §4.2), the entry `provisional` again; seam SCC-106), `minWidthCm` and `aspectMax`; the area overrides of the class, family, slot, class-id and village rows; `PlanGeometryRow.unitFloorM2` and `.minRoomWidthCm` (shipped at P1) | `measure` at V3-P6 — T-V3-35 (i) and (ii) on B-PLAN and B-CITY-lite after P6's tuning | `bar.T-V3-35` | the default stays, reported: a cell P6 tuned returns to its shipped default in the same change, the entry closes `fallback-applied` and the miss is reported to the owner (V12 §5.5) (the `room` row, never tuned, never moves) |
| the stair cells P1 ships — `stair.goingCm`, `stair.flightCm`, `stair.spiralCm`, `stair.hatchCm` | `measure` at V3-P6 — T-V3-35 (iii) | `bar.T-V3-35` | the default stays, reported |
| the furnishing cells — every `RoomRoleRow`'s `furnish.density` and `furnish.wallBias` (P1), every `FurnitureRow`'s `wCm`, `dCm`, `clearCm`, `perRoomMax` and `weight` (P2), `PlanGeometryRow.furnish.walkwayCm` (P2) | `measure` at V3-P6 — T-V3-35 (iv) | `bar.T-V3-35` | the default stays, reported |
| PE's cells and the capacity's own — `stair.ladder`, `stair.landingCm` and each class row's poorest-band `circulation` (§2.6's *One capacity function*, J-A28.28; SCC-R3C-8; the capacity's other cell, the `room` role's `area` triple — its min §2.6's `minRoomCm2` — rides its column's entry on the first line above, measured, never tuned; seam SCC-91) (M2b), `datum.maxSteps`, `stair.riserCm`, `moduleCm`, `door.mainCm` (M3a) | no line here: V12 §3.11's default line, its entries written by the seats landing M2b and M3a (J-V3.118: a retune at V3-P6 would shift the capacity — every shell's household count — the entrance storeys and the outside doors those milestones build) | `frame.roomProgram.<column>` | the default line's: closes `fixed` at M-CAL with "no admissible frame" where no frame's run targets the column |
| every other calibratable cell — the rest of `PlanGeometryRow` (the corridor, door, window, hearth, access, crypt and view cells), `RoomRoleRow.maxDoors` and `.hosts`, the pattern weights, every `circulation` cell but the class rows' poorest-band ones (PE's line), `staffSleepIn` and `perRoom` | V12 §3.11's default line (`corpus` at M-CAL), written with each cell's landing | `frame.roomProgram.<column>` | as above; §13.7's item-28 plan soft band keeps its own entry (a threshold, `thr.`), whose fallback steps once the `circulation` cell of a band row other than a class row's poorest — never a cell the capacity reads (§13.7's item-28 row as BCR-V3-33 words it; SCC-R3C-8) |
| the switches `sunTieBreak` and `exposureAllStoreys` | not calibratable (`ColumnSpec.calibratable: false`, as V11 §3.7.4's `orientEnabled`): no entry | — | — |
| the keys, enumerations and laws — the role names; `RoomRoleRow`'s `scope`, `storey`, `exterior`, `door`, `hearth`, `lit`, `bias` and `furnish.glyphs`; the room lists, count laws and `for` keys of the programme rows; `PatternRow`, `EntranceAnchorRow`, `WingAffinityRow`, `SubLocationRoleRow`, `AccessHostRow`; each `FurnitureRow`'s `glyph`, `shape`, `placement`, `band` and `tall` | not calibratable (keys, enumerations and laws, as V12 §3.11 reads V11's `ColumnSpec`): no entry | — | — |

### 2.5 Lifecycle of every new state field

| field or record | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `Storey.furniture`, `FurnitureItem`, `Room.nextFurniture` | F1–F4 in the plan derivation; `instance` add on a stored plan | draw (5.1), JSON, SVG, T-V3-8 | in the elaboration chunk (unstored); in the stored composition's plan once any plan event or `instance` stores it (§2.6) | re-derived with the plan (`plan.furnish`); a stored plan's items kept by id; after a carry each is checked and re-snapped or orphaned (4.3); New random on `plan.furnish` re-places every item not `edited` (4.3) | the event's undo record keeps the former storey (§7.4's plan-event row) | a document before BCR-V3-2 has none: the first derivation fills them; a stored plan without the member gets an empty list and F1–F4 on its next re-cut; a quarter-turn `rotCdeg` of a draft reads as the wing frame's angle plus the quarter turn |
| `FurnitureItem.edited` | `instance` add, move or restyle | New random on `plan.furnish` (4.3) | with the stored plan | kept | with the storey | absent: not edited |
| `Room.name` | `setAttr plan/rooms/<id>/name` (4.2) | label (5.1), panel, JSON, Foundry journal, room explainer | with the stored plan (the edit stores it) | kept by the room's re-match (2.2); a room re-cut away takes its name to the kept room that re-matches it, else the name is orphaned and reported | `setAttr`'s inverse | absent: the role's display text |
| edited `Room.lit` | `setAttr plan/rooms/<id>/lit` | draw, VTT and Foundry lights | with the stored plan | an edited attribute (§7.2): kept through re-cuts while the room re-matches | inverse | absent: the role's `lit` |
| `Opening.hinge`, `.swing` | O3; `setOpening` with `hinge` or `swing` (BCR-V3-24) | draw, VTT bounds, F2's clearance | with the plan | re-derived by O3 whenever the opening is, unless the opening was edited (an edited opening is a fixed input, 4.3) | with the storey | absent → O3 derives them at first read |
| `Opening.point` | 3.7 (a hatch, a head's floor opening, the crawl hatch) | draw, VTT portals, Foundry notes | with the plan | re-derived with the head it belongs to | with the storey | absent: a wall opening |
| `Opening.steps` | O1 (c) | draw (the flight), F2 (the flight's footprint kept free), glTF | with the plan | re-derived with the opening | with the storey | absent: level |
| `WindowRec.kind` | W2; `setWindow` with `kind` (BCR-V3-24) | draw, SVG, VTT, glTF | with the plan | re-derived by W1–W4 (roles) unless edited | with the storey | absent → re-derived by W2's rule for its wall (a tower's, keep's or basement's wall a `slit` or `light`, else `window`) |
| `Chimney.air` | 3.7.2 (4) | draw (the stack), VTT, the room explainer | with the plan | re-derived with the heads | with the storey | absent: no air access |
| `ProgramRoom.origin`, `.subLocation`, `.anchor.access` | A2, A6, 3.7 | A5, the cutters, P5, the report, the explainer | in `Plan.program` | re-derived with the programme | with the plan | absent `origin` in a stored plan: `programme`; absent `subLocation`: none |
| `Plan.heads`, `AccessHead` | 3.7 — including the null form: 3.7.2 (1)'s outside door with `storey` null, no `room` and its `door`, on a building with neither a basement nor `ground(b)` (seam S23R2-10) | anchors (never the null form), draw (the null form at its door on the outline, 5.1), exports (the null form in the JSON only, 5.3), panel, explainer, T-V3-22 | with the plan | re-derived whenever a hosted access changes (a stale mark, §2.8 as BCR-V3-19 amends it); a stored plan re-anchors inside the changing event (4.3) | with the plan | a document before BCR-V3-19 has none: derived at the next derivation or re-cut |
| `Building.declaredRooms` | `setAttr declaredRooms` (4.2) | A2 (7) | the building record (§2.6), in its leaf digest (BCR-V3-15) | an edited attribute (§7.2): kept by every re-derivation and re-cut | `setAttr`'s inverse | absent: none |
| `BaseWing.partName` (BCR-V3-13; S23-15) | the base outline builder at S11 from its footprint template's part, passed through by volume 2's M0 (d); every wing writer (volume 2's mutator W-steps, its `setMassing` ops, `removeWing`'s re-joined block, the canonical re-ordering of BCR-V2-27) keeps it on the wing that keeps its key — a re-joined block keeps the lowest key's; a wing new to the building has none | A5 (e)'s `part:<name>` affinities, the crypt's seed (3.7.4 step 1), volume 2's M8 (e) crossing tower, the room why (4.6) | in `Building.wings`, inside the building's leaf digest; the JSON schema's wing record (BCR-V3-13) | re-derived with the template whenever S11 re-fits the footprint | restored with the wings by the causing event's undo | a document without it re-derives it at load for every building of a template family — each wing's ring matched to its template's part (the part whose fitted ring equals the wing's on the lattice, else the part overlapping it by more than half, ties by part order), else absent; each absent one reported in the upgrade's fates |
| `Entrance.faces` `tunnel` | the underground stages' entrance derivation (V04, II.7.3, II.7.5) | 3.12, 5.3's portals | the entrance record | as every entrance | as every entrance | no older document holds it |
| `roomNumbers` view key | the viewer (4.5) | the draw, the key table, SVG `plan.key`, Foundry journal titles, JSON `number` | view state (§2.9), outside the model hash | — | view keys are not undone (§2.9) | absent: `off` |
| `PlanReport` | every derivation and re-cut; recomputed on demand for a stored plan (2.3) | panel, clerk, explainer, JSON, bars | in the elaboration chunk only (non-canonical) | replaced with the chunk | nothing canonical | dropped with a stale chunk |
| `RoomRoleRow`, `FurnitureRow`, `PlanGeometryRow`, `PatternRow`, `EntranceAnchorRow`, `WingAffinityRow`, `SubLocationRoleRow`, `AccessHostRow`; the family, slot, class-id and village rows; item 110's rows and cells (the `cistern` role, the `'*'` specialisation rows, `conduit_house`, `arena`, `seatingExits`, `belowTop`, `exposureAllStoreys`) | the shipped `roomProgram.json`; `editTable` | A1–A6, anchors, cutters, openings, F1–F4, 3.7, 3.12 | the table pins of the recipe (§2.9) and row operations (§7.6) | an edit of a slice marks every plan that cites it stale (`ElaborationRecord.slices`, §2.8) and re-cuts stored ones (§7.3); an edit of `stair.ladder`, `landingCm` or the `room` role's min re-runs the capacity rule's re-homing (§2.6, BCR-V3-12) | `editTable`'s inverse | a table version bump is §7.5's; the new tables arrive with the output version that ships them, a stored plan citing none re-reads them at its next re-cut |
| hearth edits (`setHearth`), `moveStairCore.kind`, `instance` on a room, `setOpening.hinge`/`swing`, `setWindow.kind`, `setAttr` on `plan/rooms/<id>/name`, `…/lit`, `plan/pattern/<level>`, `declaredRooms` | the plan tools (4.2), the clerk | the rung's re-derivation as fixed inputs | the log (§2.9) | kept as edited attributes (§7.2) | inverse in the undo record | event migration (§7.5) adds nothing: new kinds and parameters only |
| New random on an edited plan (`regenerate` with `rung` `plan`, `plan.layout`, `plan.roles`, `plan.furnish`) | T10 `hold` | 4.3's per-rung rule | the log | the rung's counter advances; edited and locked parts fixed; §5.1 (6)'s comparison on the stored subtree | the event's undo record (the former plan) | — |
| `setAttr(basement)`'s consequences for hosted accesses | 4.2 | 3.7, V04's per-building draws | the access records (V04) and the plan | the underground layer's per-building rules re-run for this building (4.2) | one undo step restores the basement, the accesses and the plan | — |
| `Basement.crypt` (`ring`, `edited`) (BCR-V3-20) | the basement function (3.7.4) at S11 with the basement, from volume 11's `crypt` column and `cryptM2`, the seed (volume 2's `cryptSeedWings(b)`, else the far third; 3.7.4 step 1), the principal's area and a dossier crypt record | A2 (9), the crypt plan (3.7.5), the crypt and choir stairs (3.7.6), volume 4's crypt join (V4 §3.5.7 (c), which reads this field and never a plan room), volume 10's why, volume 1's T-V1-47 (its check that no crypt has a place or a pin; V1-3.7.1's opening pass selects by `AccessPoint` fields and reads no crypt field; S23R1-24), the rank (3.7.4 (3)), the draw of an unelaborated building (none: a crypt draws only in a plan), JSON `entities` | with `Basement` in the building's leaf digest (§2.6) | re-derived with the basement — at S11, after a `setMassing` commit or a designation mutation (V2 §3.14.5 (c)), after a terrain change (a `basement` class only; an `always` class keeps its crypt with no condition), and after any change of the principal crypt, its building or its area (every other crypt re-ranked — trimmed or re-grown by 3.7.4 (3), `Basement.ring` never shortened; ST-39); an `edited` ring is kept as the author's (§7.2) and reported when the rank no longer holds | the causing event's undo record (the former `Basement`) | a document without the member re-derives it on load for every `always` and `basement` building with a basement; an `always` building with no basement takes the crypt ladder — a one-time shift the owner's rule causes (J111), reported in the upgrade's fates |
| crypt stairs (`StairCore` records, levels [−1, 0]) and choir flights (rooms of role `stair`) | 3.7.6, with the crypt and the chancel's lift | O2, the draw, VTT portals, T28-2, T-V3-23 | with the plan (a core; a room) | re-derived with the plan, from `Basement.crypt` and `floorCm` (3.3); a stored plan re-anchors them inside the changing event (4.3) | with the storeys | none: they exist only where a crypt or a lift exists |
| `column` faces (crypt columns, ruin columns) | 3.7.5, 3.12 | the cutters (fixed rings), the draw, VTT `line_of_sight` | with the plan (rooms of role `column`) | re-derived with the crypt ring or the host chamber | with the storey | none |
| `Entrance.storey` (BCR-V3-26) | §2.6's `deriveEntrances` at S11 (from M3a, §8's PE) and at every re-derivation of the entrance set | E1, O2, A2 (8), A6, W2's door gate, the switcher, VTT, JSON | on the entrance record, in the building's leaf digest | re-derived with the entrance, and when the outside ground at its vertex (a terrain or `RetainingWall` change beside it) or the stack changes, or the building's basement — its `access`, `kind` or `floors` (the levels the storeys read, and the main entrance's rule; seams S23R4-01, S23R5-03) (*Entrances* rule 4 as BCR-V3-26 amends it); an edited entrance keeps its vertex, its storey re-derived | the causing event's undo record | none needed: built at M3a with the first stacks and walls, so no shipped document holds an entrance without it; a pre-M3a document derives 0 on load (T-V3-34), any other value or a dropped secondary entrance listed in the upgrade's fates (S23R3-05) |
| the level reading, storey heights, `floorCm` (3.3) | derived per call | seeds, datums, cores, doors, windows, exports | never | re-derived with the plan | — | none |
| the crypt's capped bays (3.7.4 (3); ST-39) | derived per call from the step-2 ring, `Basement.crypt.ring` and `Basement.ring` | A2 (9)'s `undercroft`, the storey −1 seeds (3.4, 3.7.5), the column grid, the draw, T-V3-23 (h) | never (their `undercroft` room persists with a stored plan, re-matched as any room) | with every rank run, re-grown away when the crypt re-grows | the causing event's undo restores `Basement` | none |
| the stair-entered reading (3.7.4; seam S23R5-01) | derived per call from `ground(b)`, the storeyed ground wings' rings and the crypt's vault | the basement function's extent (3.7.4, M6-U), O2, 3.7.5, 3.7.6, 3.9, 4.2, T-V3-23 (j) | never (the extent it chose persists as `Basement.ring`) | recomputed at each read: a wing change (a `setMassing` commit, a designation mutation) or a change of the crypt's step-2 or edited ring moves it — never a rank event, which moves no vault — and the basement is re-derived with it inside the causing event (the `Basement.crypt` row above), which marks the plan stale or re-cuts a stored one | — (its inputs' undo) | none: built with the crypt derivation at M6-U, so no shipped document holds a crypt without it |
| the roof terraces `T(x)` and their walkability (3.4a) | derived with the plan | the draw, VTT, Foundry, JSON `terraces`, S6, W4, T-V3-29 | never (a stored plan re-derives them at read from its wings and openings) | with the plan | — | none |
| the outside ground per wall and the outside digest (3.6 W2; BCR-V3-28) | derived per call; the digest in `ElaborationRecord.inputs` | W2's gates, `Entrance.storey`, the walk-out, the stale test | the digest in the non-canonical record (§2.8) | a `RetainingWall`, a terrain change, a levelled platform's datum (the values `levelledGroundCm` returns, BCR-V5-30) or a deck change beside the building moves the digest: an unstored plan goes stale, a stored plan is re-cut inside the changing event (4.3; §7.3) | the causing event's undo | none |
| `basementDoor(b)` (3.7.1; S23R3-01) | derived per call, from eager records, whenever step 3, volume 1's reserve or a test reads it | step 3's door on storey −1, 3.7.6, 3.7.7, O2, volume 1's entrance reserve, the why, T-V3-30 | never | recomputed at each read: a `RetainingWall`, terrain, levelled-platform, wing, entrance or basement change (from M6-U `Basement.crypt` among the basement's fields, its vault never moved by the rank; seam S23R4-03) moves it, which marks an unstored plan stale and re-cuts a stored one inside the event (BCR-V3-28's digest, the basement's change; §7.3) | — (its inputs' undo) | none |
| `stackAccessDoor(b, a)` (3.7.2 (1); S23R3-09) | derived per call, from eager records, whenever 3.7.2 (1), volume 1's reserve or a test reads it | `AccessHead.door`, 3.9's report, 5.1, 5.3, volume 1's entrance reserve and digest, T-V3-22 | never (the head's `door` persists with a stored plan) | recomputed at each read: a wing, stack, stair or access change moves it, which marks an unstored plan stale and re-anchors a stored one's head inside the event (§2.8 as BCR-V3-19 words it; 4.3) | — (its inputs' undo) | none |
| `StairCore.levels` over a stack; landing doors, terrace exits, terrace and seating doors (3.3 S5–S6) | S5–S6 in the derivation; `moveStairCore` | O2's roots, the draw, portals, T-V3-28 | with the plan (cores; openings) | re-derived with the plan; a stored plan's re-cut keeps an edited core and re-derives the doors around it (3.11) | with the storeys | none: they exist only on a stack |
| `Chimney.levels` through overlying tiers (3.3 H3) | H3 | the roofscape's stack (V2C-55), T-V3-4, VTT, JSON | with the plan | re-derived with the stacks; a `setHearth` or a `tiers` edit re-cuts every storey the stack crosses | with the storeys | a stored plan whose chimney ends under a tier re-derives its `levels` at the next re-cut |
| a crypt-only basement set by `setAttr(basement)` on `basement/crypt/ring` (4.2; V3C-75) | the edit, by the crypt ladder (the ground wings' whole inset instead where the ring would not be stair-entered, 3.7.4; seam S23R5-01) | as `Basement.crypt` | with `Basement` in the leaf digest, `crypt.edited` set | an edited attribute (§7.2): kept through re-derivations; announced on a `never` class | one step: basement, crypt and plan | none |
| a split half's programme (`programmeSource.half`, derived) | at read, from `Use.branchOf` as S10b's split writes it (item 105 (h)) | A1 (3.2), the report, the room why | never (derived; the use is in the leaf digest) | a split or a merge back onto one plot changes `Use.branchOf`, which marks both buildings' plans stale and re-cuts stored ones (§2.8, §7.3) | the causing event's undo restores both uses and both plans | none |

## 3 Generation

### 3.1 One derivation, in order

`plan(input, composition, k, prior?)` (§2.6) runs, per building, in this order (J-V3.33, J-V3.36):
1. **Programme** — A1 resolution, A2 lists, A3 sizes (3.2).
2. **Fixed geometry, before any allocation** — the level reading, `ground(b)` and the storey heights (3.3); the seed
   pieces of every storey (3.4), with the crypt's ring cut out of
   storey −1 as its own piece, its capped bays as another, and their columns (3.7.4–3.7.5); the composer's and the passage's rooms (3.3 E2); the heads of
   the hosted accesses and their through-rings (3.7.2–3.7.3); the stair cores (3.3 S1–S5) and the joins of stacked wings
   (S6) with the roof terraces (3.4a); the crypt stairs and the choir flights (3.7.6); the entrances' inward points (3.3
   E1). A building with no storeyed wing has no level at or above the ground and no room there (S6's `solidMonument`):
   where it has a basement (a crypt-only basement of an `always` class, 3.7.4; a requested one) the derivation continues
   for its basement storeys alone — 3.7.1 – 3.7.7: the crypt, its columns and its entry — a crypt that is not stair-entered (3.7.4) — from the outside door at
   `basementDoor(b)`, directly or through O2's one crypt join (seams S23R4-03, S23R5-01), and the heads on its lowest storey (3.7.2 (1)) — every room whose storey rule admits no basement
   storey dropped with no tier (A5 (b)); where it has none but hosts an access, the plan holds no storey and no room, only
   the heads of 3.7.2 (1)'s outside-door form (`storey` null); with neither it stops here with an empty plan (seam
   S23R2-10; J-V3.91, J-V3.117).
3. **A4** storey capacities.
4. **A5** allocation — (a) units, (b) hard non-unit rooms, (c) the hearth rooms' wings and then the stacks (3.3 H1–H3),
   (d) soft rooms, (e) wing choice, (f) fill — with the no-abort fit ladder where a step runs short (3.9).
5. **A6** shared access, then **A2 (8)** entrance anchors.
6. Per storey, from the deepest basement storey, then level 0, then upward: the **partition** (3.5) — the shared-access
   strip, the per-piece patterns, read-back, the units' inner rooms, the roles re-deal.
7. Per storey: **openings** (3.6 O1–O6) and **windows** (W1–W3).
8. Over all storeys: **dormers** (W4), the chimney records (H4), **furnishing** (3.8), the **report** (2.3).

Inputs are §2.6 step 1's (the building's accesses as BCR-V3-19 widens them, `Basement.crypt` as BCR-V3-20 adds it),
`composition` as the `rooms` rung left it (`Composition.rooms`, V02 §3.8 — every path that derives a plan derives
`wings`, then `rooms`, then this rung, 4.5, 4.6; S23-34) and the table slices, nothing else; the only draws are the four `plan.*` streams at the creation indices of 3.10. A re-cut
is the same derivation with `prior` (3.11). Units: integer cm on the world lattice; areas as `area2` (twice the area, cm²)
wherever a comparison decides anything, m² only in tables and reports. Wings are named by their key (BCR-V2-27) wherever
this volume says "wing", and ordered by key.

### 3.2 A — the programme

**A1 Resolution** (J-V3.26, J-V3.29, J-V3.30). The inputs: the designation template's `programme` key `k` (V11 §3.6.1: the
class id — for a custom institution the class volume 11's resolver gave it, V11 §3.13; for a ladder GUILD or SIZE record
its greater tier's class, V11 §3.12; for a village class its `v.` key, V07 §2.4; V11 §2.9); the building's slot (`BuildingSlot.role`, §4.7
S11) and whether it is its template's **main slot** (2.4); the **half** `h` — `shop` when `Use.branchOf` is set, `works`
when another building's use names this use in its `branchOf`, else `both` (item 105 (h)); the occupants' band `b`
(`Plot.fieldBand`); the recipe's era `e` (§7.7 layer 1). At every level below, a row whose `for.era` is `e` wins over
the era-less row at the same key (V3C-45; J-V3.78). **The main slot** resolves by the first match of:
1. the class-id row whose `for.use` is `Use.specialisation` (V11 §3.6.2's discrete cell), under `k`, else under `'*'` (a
   specialisation row that spans classes: item 110 (c)'s stepped forms, 2.4; V3C-69 (4));
2. the class-id row (`for.cls` = `k`, no `for.use`);
3. where `h` is not `both` and the row reached by (1)–(2) has no `half` cells, or no row was reached: the family row of
   volume 11's `split.works` or `split.shop` for `k` (by `h`); otherwise the family row of `k`'s `templateFamily` — for a `v.` key, which carries none, the row its volume 2
   `composition.classFamily` key names (2.4's village rows; SR1-06), reported with `programmeSource.via`;
4. the building-class row of §2.6's `Building.class`;
5. the fallback: the `house` class row when the building houses a household, else the `warehouse` class row.

**Another slot** resolves by 2.4's slot-row order (a slot row under the class id, under the family — for a `v.` key the family its `composition.classFamily` key names —, the generic `'*'`
slot row, then the building-class row). A row's room with `half` other than `both` and other than `h` is dropped. A
building with no `use` and no household takes **the vacant programme** (2.4). The row reached, its level, the slot, the
half, the era and `vacant` go to `PlanReport.programmeSource`. A concealed use (`Building.concealed`) resolves its own row
by the same rule, for A2 (6). **Band cells**: an authored four-column cell reads poor / modest / prosperous / rich
(`squalid` the poor cell, `comfortable` the modest cell, J-V3.28); continuous cells (areas, `sizeFactor`,
`furnish.density`) interpolate linearly along the field value between the centres of the two bands it lies between (§4.5's
centres); discrete cells switch at the cut. **Pattern precedence** (V3C-17 (3)): at a band whose ladder form is
`lodging`, `apartment` or `room`, the ladder row's `circulation.patterns` replace the resolved row's `upper` and `top`
cells (the first listed at weight 2, each other at weight 1); the resolved row governs every other cell.

**A2 Lists.** `ProgramRoom`s are built in the order (1)–(7), (9), (10), (11); (8) runs after A6. Each carries `origin`,
`rule` (its row index in that list), `scope`, `priority`, and the resolved row's cells overriding the role table's
(J-V3.1):
* **(1) Units.** Per household in address order, its unit's rooms at the ladder row's `form` (scope `unit`, hard, origin
  `ladder`). Where the resolved row sets `unitOneRoom`, the unit is one room of role `room` whose area triple is the sum of
  the form's unit-room triples; where it sets `unitHearth: false`, the unit's cooking place carries no hearth (H1 skips
  it).
* **(1′) The live-in household** (`Building.dwelling`, §4.7 S10b; J-V3.32): its form is the ladder row's form capped at
  `dwelling` (a richer form becomes `dwelling`: the shell is the use's), its rooms marked `liveIn` for A5 (a).
* **(2) Shared rooms.** The ladder row's `shared` roles that the resolved row's `shared` cell admits (`all`, `none` or a
  role list), scope `shared`, soft, origin `ladder`.
* **(3) Staff rooms** of the owners' unit (the unit at form `house` or `dwelling` whose principal chamber is largest; ties
  by household address), by the ladder row's `staff.count`: `const` n rooms, or one per n **principal chambers** — the
  unit's rooms of role `chamber` or `solar` (V3C-38). Area = `sizeShare` × the target of the owners' principal chamber (the
  unit's largest `chamber`, `solar` or `hall`); scope `service`, soft, origin `staff`.
* **(3b) Workplace sleep-in staff** (V3C-08; J-V3.31): `beds = ⌈workers.max × staffSleepIn⌉`, `workers` from volume 11's
  `BuildingClassRow.staff` at band `b`, `staffSleepIn` from the resolved row (default 0); `beds ≥ 3` gives `dormitory` ×
  `⌈beds ÷ 8⌉`, `beds` 1–2 gives `staff chamber` × `beds`; soft, origin `sleepIn`, storey rule `top` then `upper`. Where the
  template has a `journeymen` slot, its building's slot row holds the dormitory and (3b) adds nothing here.
* **(4) Class and use rooms** of the resolved row at band `b`, half-filtered, origin `programme` (the vacant programme's:
  `vacant`). **A dwelling row's own rooms need the form `house`** (S23-16; J-V3.104): for a dwelling row — the class rows
  `house`, `cottage`, `row_house` and `manor`, the family rows `dwelling-row`, `dwelling-detached`, `dwelling-compound` and
  `farm`, the village rows `v.yeoman_house`, `v.parsonage` and `v.manor_house` (and `v.cottage`, `v.hovel` through the class rows
  they take), and every slot row that takes one of them — the
  row's own rooms apply only where the interior-ladder row's form at band `b` is `house`; at any other form the units of
  (1) and the shared rooms of (2) replace them, as volume 2's `rooms` rung withholds the hall and chapel (V02 §3.8,
  J-V2.36), and the row's `fill` still runs. Every other row (an institution's, the `'*'` specialisation rows included)
  keeps its own rooms at every band. Count laws per §10.2: `const`,
  `perHousehold`, `perStorey` (one per storey the room's storey rule admits), `perCapacity` (the named capacity summed over
  the building's sub-locations, ÷ the row's `perRoom`, rounded up — guest room 2, dormitory 8, cell 1 by default),
  `perSubLocation`. A fractional count draws once on `plan.program` (3.10).
* **(5) Sub-locations** (V3C-20; J-V3.74). Per `SubLocation` in id order, its keys are its tags in order, then
  `cap:` + its largest capacity key (ties in the order leisure, tempResidential, guestWorker, studying, working); the
  roles are those of `SubLocationRoleRow` for the first key that has a row. It is hosted by the first room of (4), in list
  order, whose role is among them and whose hosted count is below its role's `hosts`; else it adds a `ProgramRoom` of the
  first mapped role (soft, origin `subLocation`); `store` only when no key maps (reported). A2 writes
  `ProgramRoom.subLocation`; P5 copies it to `Room.subLocation`. A custom service inside its provider (item 104 (h) (5))
  arrives as such a sub-location with its SettlementForge tags.
* **(6) Concealed rooms.** Per concealed use in id order: the rooms of its resolved row marked `concealed` (§10.2's
  `RoomRuleRow.concealed`); where the row marks none, `back room` × 1 (hard) and `strongroom` × 1 (soft, `basement`
  preferred where the building has a basement). Each is flagged `concealed`, scope `service`, origin `concealed`.
* **(7) Declared rooms** (V3C-33; J-V3.58). `Building.declaredRooms` in list order: `role × count`, hard, origin
  `declared`, storey rule the declared `storey` (that exact level) where given, else the role's; scope the role's.
* **(9) The crypt.** Exactly when `Basement.crypt` exists (3.7.4): `crypt` × 1, hard, storey −1, area its ring, origin
  `crypt` — whatever the class, band or vacancy (V3C-61 (2)); where the rank has capped it (3.7.4 (3)), `undercroft` × 1
  as well — hard, storey −1, area the capped bays' ring, origin `crypt`, `rule` 1 (ST-39).
* **(10) Access host rooms.** Per hosted access (3.7.2) whose host roles (3.7.2 (6)) name no room of the lists above on
  the head's storey class: a `cellar` (a basement head) or `store` (a ground head) at its min area, hard, origin `access` —
  none for a head of `storey` null, which has no host room, and none on a crypt-only basement, whose heads 3.7.2 (6)
  hosts in its undercroft or crypt (J-V3.119).
* **(11) Composer rooms.** Each `Composition.rooms` room (volume 2's `hall`, `gatehall`, `chapel`, `towerRoom`) takes the
  first unmatched `ProgramRoom` of its role on its storey (its area becomes the ring's); a composer room that matches none
  adds a `ProgramRoom` of its role (hard, area its ring, origin `composer`). **A composer room the composer omitted**
  (V02 §3.13 F-COMPOSE (3); S23-27; J-V3.106) is placed here: a composed wing of role `gate` holding no `gatehall` room of
  `Composition.rooms` adds a `ProgramRoom` `gatehall` (hard, origin `composer`, `rule` −1, `wing` that wing's key) whose
  fixed ring E2 (3.3) lays across the wing from eave side to eave side, as wide as the lower bound of volume 2's
  `CompositionRow.rooms.gateHallM` at the occupants' band, centred on the main entrance's offset (else the wing's
  midpoint), clipped to its seed piece and moved along the wing on the module until it keeps `minEdge` (§3.4) from every
  side it does not share — with no lawful position, an area target of the role's gatehouse triple allocated to that wing
  (reported `composerRoom`, tier 2); a composed tower missing its `towerRoom` on a storey it reaches adds a `towerRoom`
  there (hard, origin `composer`, `rule` −1, `wing` the tower's key, area its tower's seed piece on that storey, a ring
  role). So the court keeps O1 (b)'s arches and T28-2's reach with or without the composer's ring.
* **(8) Entrance anchors** (after A5 and A6; V3C-10; J-V3.75). Per entrance in ordinal order whose `storey` is not null
  (BCR-V3-26; a solid stack's main entrance opens nothing and S6's root landing door takes its place, with that door's
  storey), the first `ProgramRoom` on the entrance's storey, not already anchoring an entrance, whose role is in the entrance's `EntranceAnchorRow` list, in list
  order, takes `anchor.entrance` (`crossPassage` is resolved at the cut: the anchor passes to the cross-passage strip
  where that pattern is drawn, else to the next list entry; `firstGround` the first `ProgramRoom` in list order on the
  entrance's storey; `concealedFirst` the concealed suite's first room). A room anchors one entrance only, unless two
  entrances' inward points fall in one seed piece. With no candidate, a `stair hall` of its min area is added
  (circulation, hard, origin `entrance`). Every fall is reported in `PlanReport.anchors`.

**A3 Sizes.** A room's `areaM2` = its role's triple (or the resolved row's override) × the ladder row's `sizeFactor` at
the value; a ring role takes its ring's area as min, target and max. **The unit floor** (V3C-36; J-V3.40): where the sum
of a unit's targets falls below `PlanGeometryRow.unitFloorM2` of its form, every room of the unit is scaled by that floor
÷ the sum (min, target and max together). Provenance of the floor and of the `room` role's 9 m²: own, general historical
knowledge, not corpus-witnessed (item 104 (f)'s wording); the floor calibrate-later at P6 — its entry 2.4's `measure`
line at V3-P6 (T-V3-35 (i)–(ii)) — and the `room` role's area on that line too, as its column's entry (written at M2b by V12 §3.11's default line,
restated in place at P1), measured at P6 but never tuned there, since §2.6's capacity reads its min from M2b (2.4's
register lines; SCC-R3C-8, SCC-91).

**A4 Storey capacities.** For storey `s`: `cap(s) = area(pieces(s)) − Σ fixed rings on s − circulation(s)` in `area2`;
the fixed rings are those of step 2 of 3.1 (the stacks are subtracted when A5 (c) places them); `circulation(s) =
area(pieces(s)) × num ÷ den` of the resolved row's circulation cell (integers; the ring of A6 counts inside it), at least
one landing (`landingCm` × the core's flight width) on every storey the core serves above its first. The crypt's piece is
outside `cap(−1)`: it holds the crypt alone.

**A5 Allocation** (deterministic; no draw). A storey is **claimed** by the use when a hard non-unit room of the resolved
row has that storey class (a shop's or a forge's ground storey).
* **(a) Units first** (F-PLAN tier 0; V3C-15; J-V3.33). A `house` unit takes every storey above the basement. `dwelling`
  units take whole storeys in address order from the lowest unclaimed storey up — one storey each where storeys ≥ units;
  else split by wing (units to wings in key order) where wings ≥ units; else side by side on one storey around a lobby
  (3.5's `lodgings`). The **live-in** unit takes the lowest storey above the use's hard rooms with capacity, spilling
  upward ("quarters above"); with no upper storey it stays on the ground storey marked `farFromEntrance` (3.5's
  assignment). `lodging`, `apartment` and `room` units pack first-fit from the top storey down (the poorest highest,
  J-V3.2), `perStorey(s) = ⌊cap(s) ÷ unitArea⌋` with `unitArea` the sum of the form's targets, falling to the next poorer
  form (tier 0) until every household fits. A claimed storey is tried last in every rule. When even `room` does not fit,
  the no-abort ladder runs (3.9).
* **(b) Hard non-unit rooms** by storey rule: `ground` (level 0: the lowest storeyed level, V2C-61), `top` (the highest
  storeyed level), `basement` (storey −1), `upper` (the lowest storey above level 0 with capacity), `notBasement`, `any`
  and `belowTop` (the storey with the most capacity left among those the rule admits, ties lower), a declared room's
  exact level. A room whose rule admits no storey the building has is `dropped` (soft, tier 0) or delivered by tier 5
  (hard) — on a building with no storeyed wing (3.1 step 2) it is `dropped`, hard or soft, with no tier, under the
  information `solidMonument`, since no storey stands above the ground to hold it (seam S23R2-10), and is listed in
  `PlanReport.owed` with no `tier` (2.3) — T28-1's exception as BCR-V3-14 words it (seam S23R3-12). A shortfall runs the
  ladder's step (ii).
* **(c) Hearths first among the wings.** Every allocated room that needs a hearth (H1) takes its wing now by (e)'s rules;
  then H1–H3 place the stacks (3.3) and `cap(s)` of every storey a stack crosses falls by its ring.
* **(d) Soft rooms** by priority then list order. Staff rooms by the ladder's `staff.placement` in order (`attic`: the top
  storey; `basement`; `service`: a storey holding a wing of role `service` or `back`, BCR-V2-01), never on a storey that
  holds the owners' principal rooms while another allowed storey has capacity (J-A28.27; V3C-17 (2)); sleep-in staff
  (3b) the top storey, then the upper storeys downward; every other soft room onto the storey its rule allows with the
  most capacity left (ties lower). A soft room that fits nowhere is `dropped` (tier 0, reported); the unit's hearth room
  never (it falls with its form). A storey class whose only positive-weight pattern is `nave` holds one target per seed
  piece: its soft non-anchored extras go to another storey with capacity, in level order, before 3.5's strips.
* **(e) Wing choice inside a storey** (V3C-17, V3C-18, V3C-28; J-V3.76, J-V3.77), first rule that decides: (1) an anchor
  names the wing (an entrance's inward point, a stack, the core's bay, an access head, a composer room); (2) adjacency
  (`RoomRuleRow.adjacency`, hard): `direct` or `corridor` — the partner's wing; `under` — the room moves to the storey
  below its target's, under it; `to: 'core'` — the core's wing (the shared kitchen "by the stair core", §2.6);
  `to: 'entrance:main'` or `'entrance:yard'` — the wing holding that entrance; (3) a concealed room — the wing of the
  concealed entrance where one exists, else the wing holding the use's service rooms; (4) a `farFromEntrance` target — the
  wing farthest from the main entrance's inward point; (5) `WingAffinityRow`: the first wing role of its list that the
  storey has with capacity left (`part:<name>` a wing carrying that template part name, BCR-V3-13); (6) the wing piece
  with the largest remaining area. Ties by wing key.
* **(f) Fill** (V3C-14; J-V3.39). Per storey in level order, while its spare capacity is at least the smallest target of
  the resolved row's `fill` list, fill rooms are added cycling through the list, each at its target (soft, origin
  `fill`); a fill room is scope `unit` of the storey's household where every unit room on that storey belongs to one
  household, else `service`. After the cut a piece above its role's max keeps it (`oversize`, reported), never split
  below a min.

Output: per storey and wing piece, an ordered list of targets.

**A6 Shared access** (V3C-01; J-V3.34). After A5, when the building houses two or more units, a live-in unit, or any
unit with no room on the main entrance's storey (`Entrance.storey`; on a solid stack the root landing door's, S6): one
`stair hall` `ProgramRoom` (circulation, hard, origin `sharedAccess`, that storey, `anchor.entrance` = the main ordinal). Its area counts inside `circulation(s)`
(A4), so nothing is re-allocated; it is cut first on its storey (3.5 step 0).

### 3.3 Anchors — placed before any cut

Each anchor is a fixed ring (§3.4's `fixed`) or an opening position, placed from candidates on the wing-local module in
the wing's OBB frame (§2.6 step 4), filtered by exact containment in every seed piece it must lie in (§3.4), ordered by a
score and then by the candidate's lowest-leftmost lattice point, first candidate taken; no anchor reads a stream, so a
`plan.layout` re-roll keeps them all (§6.1; J-V3.4). Every candidate keeps `minEdge` (§3.4) from other anchors' rings and
from seed sides it does not lie on.

**The level reading** (item 110 (c); V3C-65 (1), (3), V3C-82; J-V3.80, J-V3.88). A wing reaches the levels of volume
2's `storeyRange(b, w)`: a solid wing (`BaseWing.solid`) none, a storeyed wing on the ground `[0, floors − 1]`, a storeyed
wing standing on another from the level above the one it stands on. `s₀(w)` is its first level. **`ground(b)`** is level
0 when some storeyed wing stands on no other wing (`BaseWing.on` absent), and is absent otherwise — a stack whose every
ground wing is solid (a stepped temple). Level 0 is the lowest storeyed level (volume 2's BCR-V2-33, `Storey.level`; from V2C-61 (1)), so on a solid
stack level 0 is the shrine's floor, 10–25 m up: every rule of this volume that means the real ground reads `ground(b)`,
never "storey 0" — W2's basement exposure (3.6), the core's join to the basement and the tomb door (3.7.1), the heads'
storey (3.7.2 (1)), the crypt stairs (3.7.6), the crawl hatch (3.7.7) and the switcher's names (4.5). A solid wing is
never a seed piece, an anchor's or a head's host room, an affinity target (A5 (e)) or a stair candidate's wing (S2); a
door in its outer face (the tomb door, an outside head, 3.7.1, 3.7.2 (1)) is an opening onto the ground, not a room. Where no
wing stands on another, `storeyRange` is the base's reading and every rule here is unchanged (T-V3-34).

**Storey heights and floor datums** (V3C-21, V3C-65 (2); critique/V02.md V2C-61 (3) and J-V2.85; J-V3.43, J-V3.90). A
storeyed wing `w` of `n = w.heights.floors` storeys has the storey run `E(w) = deckLevel(w) − w.heights.baseCm` (volume
2's `deckLevel`: its eave, less a flat roof's parapet) and the nominal heights of its class's `HeightsRow.storeyCm`
(volume 11 §2.8, through the designation template's `heights` key): `G` = `storeyCm.ground` for the wing's first storey
— a stacked tier's first storey is a principal floor too (J-V2.85) — and `U` = `storeyCm.upper` for each other (a
`tower` or `turret` wing: `towerStoreyCm`, else `U`, for all). They are scaled to sum to `E`: `h(w, 0) = ⌊ratio(E × G,
G + (n − 1) × U)⌋`, `h(w, j) = ⌊ratio(E × U, G + (n − 1) × U)⌋` for `0 < j < n − 1`, and the top storey takes the
remainder, so `Σ h = E` exactly (a one-storey wing: `h(w, 0) = E`). A class without a heights row takes `⌊ratio(E, n)⌋`
per storey, the remainder on the top. Then `storeyCm(w, s) = h(w, s − s₀(w))` and `floorCm(w, s) = w.heights.baseCm +
Σ_{j < s − s₀(w)} h(w, j)` for `s ≥ s₀(w)`; a stacked wing's `baseCm` is `deckLevel` of the wing it stands on
(BCR-V2-32), so its first floor is the terrace it stands on. For `s < 0`: the `baseCm` of the ground wing above less `|s|
× cellar.depthCm` — for a `half` basement, the `baseCm` the basement step raised by `cellar.depthCm ÷ 2` (volume 2's
BCR-V2-28, as extended by its reconciliation round 1 (b); J-V2.91), so its floor lies at the datum less half the depth; for a
crypt-only half form, the seed wings' (`cryptSeedWings(b)`) only, the choir flights of 3.7.6 (c) then climbing the difference (S23-11) — a
`raised` crypt's floor being volume 2's (V2 §3.14.5 (d); inside a solid tier 0, critique/V02.md
V2C-68). Each seed piece keeps its wing's `floorCm`; a room's elevation is its wing's `floorCm` at its storey (the
exports read it, 5.3). V03 is unbuilt, so moving from one mean height per wing to these profiles moves no golden
(J-V3.90).

* **S1 Stair bay size.** Storey height `h` = the largest `storeyCm(w, s)` among the storeys the core climbs from (the
  basement's `cellar.depthCm`; on a chain, S5 (a), over every wing it serves); risers `n = ⌈h ÷ riserCm⌉`
  (`n = 0` allowed for a crypt entry at level, 3.7.6: a bay of `landingCm` depth); flight width `f` (house or institution
  by class); `straight`: f × ((n − 1) · goingCm + landingCm); `dogleg`: 2f × (⌈(n − 1) ÷ 2⌉ · goingCm + landingCm);
  `winder`: 2f × 2f; `spiral`: the tower's round room, or a disc of `spiralCm` as a 16-gon on the lattice; `ladder`:
  `ladder` cm; `trapdoor`: `hatchCm` square. With the defaults a 300 cm storey gives straight 90 × 412, dogleg 180 × 251,
  winder 180 × 180.
* **S2 Stair candidates.** Every bay position on the module whose long side lies along a wing side (exterior, party or
  court — the row house's party-wall stair) or along a joint, inside the wing's seed piece at every storey the core
  serves (the wing's levels; the basement ring as well where `Basement.access` is `core` and 3.7.1 lets the core join it;
  for a chain core, S5 (a), inside the extent of every wing it serves at every level it serves), never in a solid wing. Excluded: a bay over the passage
  room, a composer room it cannot stand in by §2.6's contract, a head's ring, a crypt stair or choir flight, a column, an
  entrance's clearance square (a square of the door's width inward of the opening) or a hearth apron.
* **S3 Score by `stair.placement`:** `by_entrance` — the distance from the main entrance's inward point (the opening's
  midpoint moved `door.mainCm` inward); `rear` — the distance to the wing side opposite the frontage (for a wing with a
  side on a court ring, that side: a ring wing of a closed court, the arena's included, V2C-59); `centre` — the
  distance to the wing's centroid; `tower` — the tower's round room (a spiral whose bay is a sector against the room's
  wall, or the whole room for a stair turret), else `centre`'s order. **Where A2 finds a shared access likely** (two or
  more households, a live-in, or a unit of form `dwelling` or poorer in a building of more than one storey), every rule's
  score is its own plus the bay's distance from the main entrance's inward point (V3C-01 (3)).
* **S4 Kind fallback.** No candidate for the row's kind → the next kind of `dogleg → straight → winder → ladder` from the
  row's kind onward, then `trapdoor` for the basement (§2.6 step 3); each fall an anchor tier 2 (BCR-V3-10); none left →
  tier 6 (the upper storeys unreached, the building flagged; §5.2). Flights are drawn, not stored (2.1).
* **S5 Cores** (V3C-66 (1); J-V3.81). **(a) Chains of stacked storeyed wings first.** A chain starts at a storeyed wing
  standing on no storeyed wing and continues, level by level, through the storeyed wing standing on the previous one
  (volume 2 lays at most one storeyed tier on a tier, the shrine last; a solid wing between them ends the chain). A chain
  of two or more levels takes one core: its candidates (S2) lie inside the extent of every wing it serves at every level
  it serves; S5 tries the whole chain, then each shorter prefix from its bottom, and takes the longest prefix with a
  candidate, then S3's score. Under volume 2's `internal` stair form (a tiered tower) the placement is `centre` and the
  kind `spiral`, whatever the row says. A stacked wing that its chain's core does not reach takes its own core from
  `s₀(w)` upward where it has two or more storeys, and is joined by S6 in any case. **(b) Joined wings** — wings joined
  along a joint of at least `2f` share the core of the wing earliest in the clip order when its bay lies within `2f` of
  that joint, both wings reach its storeys and their `floorCm` at each shared storey differ by at most `datum.maxSteps ×
  riserCm`; a tower serves the wing it joins (§2.6). **(c)** Every other wing that has upper storeys is reached by its own
  core.
* **S6 Joining a stacked wing** (item 110 (c) "stairs up its faces"; V3C-66 (2), V3C-67 (3); critique/V02.md V2C-53;
  J-V3.81, J-V3.82, J-V3.91). For every storeyed wing `y` standing on a wing `x` (`y.on = x`), in key order:
  * **(a) Landing door** — where `stairChain(b)` has a flight whose `to` is `x` (its head on `x`'s terrace, 3.4a): one
    door of `door.entranceCm` on `y`'s ring side `landingSide(b, y)` at level `s₀(y)`, centred on the point of that side
    nearest the midpoint of the flight's `head` side, within `access.snapCm`, else at the side's midpoint (reported
    `landingDoor`, tier 2, with its distance). It opens from the terrace into `y`'s room there.
  * **(b) Terrace exit** — else, where no chain core serves `y` and a core serving `x`'s top storey has its bay inside the
    projection of `T(x)` (outside every wing standing on `x`): that core's `levels` upper bound becomes `s₀(y)`, its bay at
    `s₀(y)` a room of role `stair` on the terrace (a stair house) with one `open` opening onto `T(x)`, and `y`'s room
    nearest it takes a terrace door (O1 (d)); reported `terraceExit`.
  * **(c) Terrace door** — else, where a chain core serves `y` and `T(x)` is flat, `y`'s room at `s₀(y)` with the longest
    exterior run on `T(x)` takes one door of `door.entranceCm` onto it (a door onto the roof terrace); reported
    `terraceDoor`.
  * **(d) Seating exits** — in a building whose resolved row sets `seatingExits` (the arena, 2.4), every core whose bay
    lies against a joint with a solid wing ends, at its wing's top storey, in one `open` opening in that joint onto the
    solid wing's roof (the seating, volume 2's roofscape; no terrace); reported `seatingExit`.
  * **(e) Unreached** — a `y` that none of (a)–(c) and no core joins is F-PLAN tier 1: flagged and reported
    `W_TIER_UNREACHED` (the sealed stair form `none` of critique/V02.md V2C-47 (2) lands here by design).
  * **The solid stack's root** (volume 2's BCR-V2-41; from V2C-53). Where `ground(b)` is absent, the main entrance
    stands where volume 2's BCR-V2-41 puts it — at the foot of the stair chain, or on tier 0's front side on a sealed stack
    — and opens no plan door (`Entrance.storey` null); the plan's root is the landing door of the first storeyed wing the
    stair chain reaches, in the chain's order (a sealed stack has no chain: its storeyed wing falls to (e); seam S23R4-06),
    and A2 (8) and A6 read that door and its storey;
    every plan-side rule that reads the main entrance's inward point — S3's scores, the patterns' `entrance`
    requirement, `cross_passage`, A5 (e) (4), 3.5's step 0, O2 — reads that door's instead, while the tomb door (3.7.1)
    and the crypt's seed and growth (3.7.4) read the main entrance itself, which stands on the footprint.
    A building with no storeyed wing at all (a solid monument, a sealed stack whose every wing is solid — one carrying a
    storeyed tier or shrine is planned and flagged by (e) (seam S23R3-15) — a great temple laid with `top` `flat` by
    volume 2's `stepped-temple` row or its `tiers` op, V2 §3.15.4, §4.6) has no level at or above the ground and no room
    there — reported `solidMonument`, which is no failure; its terraces and flights are volume 2's roofscape. Its basement
    storeys, where it has a basement, are planned alone (3.1 step 2: a crypt that is not stair-entered (3.7.4), entered from the outside door at
    `basementDoor(b)`, directly or through O2's one crypt join, seams S23R4-03, S23R5-01); without a basement its hosted accesses keep their outside-door heads (3.7.2 (1), `storey` null);
    with neither its plan is empty (seam S23R2-10).
* **H1 Hearth demand.** Every allocated room whose role row or resolved-row cell sets `hearth`, and the unit's cooking
  room in every unit form that has one (unless `unitHearth` is false), needs a hearth on a wall of that room.
* **H2 Stack candidates** (after A5 (c) fixed the hearth rooms' wings; V3C-11; J-V3.6, J-V3.36), in the historical order
  of a town house, with one rule over the whole order (V3C-68 (1); J-V3.83): a candidate whose column lies inside the
  extent of a wing standing on the hearth's wing, directly or higher in its stack, is taken only after every candidate
  whose column lies under the hearth wing's own exposed roof or terrace. (a) **back to back** — where one wing piece of a storey holds two hearth targets, a `doubleCm` stack
  centred on the lattice line across the piece's long axis at the two targets' area ratio, measured from the piece's end
  nearer the main entrance (the line `hall_and_parlour` would cut; no stream); if that pattern is drawn, its cut is written
  as two `splitFace`s ending on the stack's ring, and every other pattern cuts around it; (b) a party wall; (c) the gable —
  the wing side at the end of its ridge axis; (d) any exterior side; (e) a joint side between wings (it exists before any
  cut), a smoke hood (reported `hood`). No candidate → tier 6 (the hearth omitted, the room kept, reported). **Many
  hearths in one piece** (a tenement's cooking places, N > 2): `m = ⌈N ÷ 2⌉` `doubleCm` stacks against the piece side
  away from the frontage (the side opposite the main entrance's; else its longest exterior side) at `(i + ½) × L ÷ m` along
  it (`L` its length, i < m), each serving two units; each cooking place is assigned (3.5) to the part sharing a side with
  its stack. **Stacks rise:** a stack placed for a lower hearth is offered first to the hearth room of the same wing on
  every higher storey (a fireplace over the kitchen fireplace, by rule).
* **H3 Placement.** The ring is `stackCm` (or `doubleCm`) against its wall at the module position nearest the wall's
  midpoint (or the position (a) or the pitch rule gives) that keeps `apronCm` of clear floor in front of it inside the
  piece; it is a fixed ring on every storey from its lowest hearth to the top storey its wing reaches and on, through
  every level of every storeyed wing whose extent contains the column above that (the tiers of a stack), up to the
  highest (V3C-68 (2)); a solid wing over the column is masonry the flue passes with no ring cut. Each storey it crosses
  has its seed piece opened with the ring and its `cap(s)` reduced by it (A5 (c)). So the chimney's column is one point
  on all its storeys (§2.6's `Chimney`) and no stack ends under a floor. A hearthless air stack (3.7.2 (4)) is carried
  the same way.
* **H4 Records.** One `Chimney` per stack (`levels` from its lowest hearth to the highest level H3 carried it to;
  `wing` the hearth's wing), `Room.hearth = { wall, at, chimney }` filled after the partition gives the room its wall
  ids. A stack carried into another wing is reported `stackCarried` (information, no tier). The roofscape draws the
  stack over `column` on the roof or terrace at `levels[1]`'s wing, never on `Chimney.wing`'s roof where a wing standing
  on it covers the column (volume 2's roofscape, V2 §5.2; from V2C-55 (2), which meets V3C-68 (3)).
* **E1 Entrance points.** Each entrance's inward point (the opening's midpoint moved `door.mainCm` inward) on its storey
  (`Entrance.storey`, BCR-V3-26); an entrance whose storey is null has none (S6's solid-stack root). The piece holding it
  receives the entrance's anchored room (A2 (8)).
* **E2 Composer rooms and the passage room** are fixed rings as §2.6 states (an omitted gate hall's ring laid here by A2
  (11)'s rule); a composer room keeps its composer role
  (A2 (11)).

### 3.4 Seed pieces per storey

Per §2.6 steps 1 and 4: the extents of the wings reaching the storey (a wing reaches the levels of volume 2's
`storeyRange`, a solid wing none — 3.3's level reading; BCR-V3-25), clipped to tile by `tileRings` in the clip order, the span rings at the ground storey, `Basement.ring` below —
on storey −1 with the crypt's ring (3.7.4) cut out as its own piece and its capped bays as another — opened with the fixed rings of 3.3 and 3.7 on one
transient arena per storey. The work limit is the plan stage's `WorkLimitLaw` row (2.4: counter `plan.storey`, unit
`moduleCells` = Σ piece area ÷ `moduleCm²`, 40 per unit, floor 2 000; BCR-V3-23). Storeys are exactly the levels
`storeyRange` gives each wing — for a wing on the ground its `Heights.floors` (J-V3.23): an attic is a storey only where
`floors` counts it, its rooms then taking the `top` rule. A stacked wing's extent lies inside the wing it stands on (V2
§3.15.1 ST6), and at its own levels the lower wing reaches nothing, so the clip order meets no contained stacked wing:
each tier's storeys are cut on its own extent (V3C-65 (1)).

### 3.4a Roof terraces (item 110 (c) "a flat roof or a shrine on the top tier"; V3C-67; J-V3.82)

For every wing `x` whose own roof kind (`RoofSpec.kind` on `x`) is `flat` — whether laid (volume 2's
`MassingRef.stack.lowerRoof` below the top tier, its `top` `flat` or `shrine` at the top) or set by an edit (V2 §4.6 (3),
which leaves `lowerRoof` the laid default), solid or storeyed (S23-12; J-V3.101) — its **terrace** is `T(x) = ring(x) − ∪ ring(y)` over the
wings `y` with `y.on = x`, the stairs among them (the kernel's exact difference on the lattice; it may have several
faces). Its floor is `deckLevel(x)`; its edge along `ring(x)`'s sides carries volume 2's `parapetCm` (0: no parapet). A
pent roof makes no terrace. `MassingRef.stack` is read here only for the shrine's identity (`top: 'shrine'`, the
walkability rule below).
* **Its level.** `T(x)` belongs to level `s₀(y)` of the storeyed wing `y` standing on `x`, whose floor is `deckLevel(x)`;
  with none, to `storeyRange(b, x)[1] + 1` for a storeyed `x` — a **roof level**, with no rooms — and to no level for a
  solid `x` that nothing storeyed stands on (drawn as roof in the scene of the next storeyed level above it, else by the
  roofscape alone).
* **Walkable or roof.** `T(x)` is walkable when a flight's head arrives on it (`stairChain`'s `to` = `x`), a terrace exit
  opens onto it, or a landing or terrace door opens onto it (S6); otherwise it is roof. On a solid stack only the terrace
  whose level holds the shrine's floor is walkable in the shrine's scene; the lower solid terraces draw as roof there.
* **A roof level** is exported as a scene only where a flight or a terrace exit reaches it (5.3), and the switcher lists
  it as "Roof terrace" (4.5).
* **Outside ground.** For W2 (3.6), the outside of a wall of `y` facing `T(x)` is `deckLevel(x)`; of a wall facing a pent
  skirt, the skirt's height at the wall (its ridge line), never walkable.
* A building with no storeyed wing has no level at or above the ground: its terraces and flights are volume 2's roofscape
  (S6's `solidMonument`), drawn with its heads of `storey` null (5.1); its basement storeys, where it has a basement, are
  planned alone (3.1 step 2; seam S23R2-10).
Terraces are derived at every derivation and at read for a stored plan; nothing is stored (2.5).

### 3.5 The partition — the shared-access strip, the cut machine and the patterns

**Step 0 — the shared-access strip** (A6; V3C-01 (2)). On the main entrance's storey (or the root landing door's, S6),
with `p` that door's inward point and `B` the bay of the core that serves the most unit storeys (ties: the core nearest `p`):
* where `B` lies in `p`'s seed piece within `corridorCm + door.mainCm` of the entrance's side, the stair hall is the
  rectangle in the wing frame spanning from that side to `B`'s far side, as wide as `max(B's width along the side +
  corridorCm, door.mainCm + 2 · jambCm)`, clipped to the piece and grown to the role's min area along the side;
* otherwise it is a strip `corridorCm` wide whose centreline runs from `p` along the entrance side's inward normal until
  it meets the line of `B`'s nearest long side, then parallel to that side to `B` (a path of two or three segments on
  the module); where `B` lies in another seed piece, the path runs to the nearest point of the joint between the two
  pieces and continues from there in the next piece by the same rule;
* the strip is cut by `splitFace`s along its long edges (each a polyline of at most three vertices whose ends lie on the
  piece's boundary or on a fixed ring), takes the stair hall's target, and is the main entrance's anchored room.
If no such strip leaves every remaining part at or above `minRoomWidthCm`, S3 is re-run with only the distance to `p`
as the score, and the strip retried; failing that, the stair hall shrinks to a lobby of `corridorCm` × (`door.mainCm` + 2
· `jambCm`) at the entrance and each unit reaches it by O5's strip (tier 2, reported `sharedAccess`).

**The drawn pattern and the other pieces** (V3C-13; J-V3.38). `plan.layout` draws one pattern per storey class from the
resolved row's weights (after A1's precedence). The drawn pattern applies to the seed piece that holds its `PatternRow`
requirement — `entrance`: the piece holding the main entrance's inward point; `hall`: the piece holding a `hall`,
`common room` or `taproom` target and at least one more; `core`: the piece holding the core's bay (else the main
entrance); `courtOrStreet`: a piece with a court side or a frontage side; `none`: the largest piece (ties by wing key).
Every other piece of the storey takes the first pattern of its cell's list, in list order among positive weights, whose
requirement it holds; else `bisect`. Where no piece holds the drawn pattern's requirement, every piece takes that rule
and the fall is reported. `Plan.pattern` records the drawn pattern; `PlanReport.patterns` the per-piece ones.

**The cut machine** (V3C-12; J-V3.8, J-V3.37). One primitive, `slice(piece, axis, area2)`, in the wing's OBB frame:
* For a module position `t` along `axis`, let `L(t)` be the line perpendicular to `axis` there. Fill the piece's holes
  that are fixed rings (a stack, a column, a head inside the piece) to get `P̂`; take the maximal segments of `L(t) ∩ P̂`
  in order along the line; the **candidate** is the segment containing the point of `L(t)` nearest the piece's OBB centre.
  The candidate is written as one `splitFace` per stretch of it outside the fixed rings (the rings bridge it, never cut),
  each stretch's ends placed on the piece's or a ring's boundary by §3.4's input-side rule. A position whose candidate
  does not split the piece into exactly two faces has no cut.
* The **start-side part** is the face on the lower-`t` side; its exact `area2` (the kernel's booleans) is compared with
  the target. Positions are searched by bisection over the module positions whose candidate exists (O(log cells)); when
  the start-side area is not monotone across the bracket's ends, a linear scan over those positions takes the nearest,
  bounded by the storey's work limit.
* **Refusals:** a part narrower (its OBB's short side) than its target role's `minWidthCm` or than `minEdge` is refused
  and the next position tried; a part whose OBB ratio exceeds its role's `aspectMax` is tried only after every position
  within it (soft; V3C-41).
* `strip(piece, side, depth)` cuts a band of `depth` along one side (a `splitFace` parallel to it, its ends on the
  boundary or on fixed rings as above).
* **P0.** While a piece has a re-entrant vertex and holds more than one target, a cut from its first re-entrant vertex in
  lattice order along whichever OBB axis gives two parts whose area ratio is nearest the ratio of the target groups they
  will hold (the groups by `bisect`'s split); the cut's position is the vertex's, so no search.
* **Assignment.** Each cut assigns its targets to its parts at once, in this order: anchored targets to the part holding
  their anchor — the part containing the entrance's inward point or the head, or sharing a side with the anchor's ring (a
  stack, the core's bay, a composer room); adjacency-hard pairs to parts that share the cut; concealed targets to the
  parts farthest from the hub (parts not adjacent to the main entrance's anchored piece first, then by distance from its
  inward point, larger first; V3C-28); a `farFromEntrance` target to the part farthest from that point; then largest
  target first to the larger part. **Bias tie-break** (V3C-40; J-V3.66): when both parts lie within a role's [min, max],
  a role with bias `sun` (hall, parlour, solar, common room, taproom, shop) takes the part whose exterior walls' outward
  normals come nearest the path sun's noon azimuth at the equinox for the recipe's latitude (§8.4's sampler, item 102 (a),
  (d)), and a role with bias `lowEnd` takes the part at volume 2's `MassingRef.low` end where one is recorded, else the part
  whose centroid samples lowest (the longhouse's byre, downslope); `sunTieBreak: false` switches the sun rule off. Further
  ties by lattice order. No room waits for a label (§2.6 step 4).

**The patterns** (`plan.layout` also draws each tie between equal-score cut positions, keyed as 3.10 states):

| pattern | cuts, in order |
|---|---|
| `nave` | the principal target — the anchored one, else the largest — takes the piece; every other target (after A5 (d) moved what it could) is cut from it by `strip` along the piece side farthest from the main entrance's inward point, in list order, each strip's depth its target area ÷ that side's usable length, floored at the role's `minWidthCm`; a strip that would leave the principal below its min is not cut and its target is dropped (soft, tier 0) or delivered by tier 5 (hard). **A church whose chancel is not a wing part** takes its chancel strip at the crypt ring's nave-side edge where the building has a crypt (the chancel over the crypt), whatever the chancel's target, the report noting an oversize or undersize chancel (J-V3.72) |
| `bisect` | P0; split the target list into two groups of nearest-equal area (largest-first greedy); `slice` across the piece's longer OBB axis at the groups' ratio; recurse on each part with its group |
| `follow` | `strip` of `galleryCm` along the court side, else the frontage side (the gallery, circulation); the rest `slice`d across the long axis into the targets in order |
| `spine` | where the piece's short side ≥ 2 · `minRoomWidthCm` + `corridorCm`: a corridor strip of `corridorCm` along the long axis, from the core's bay to the far end — from a core standing mid-length, to both ends, passing along the bay's long side (V3C-13 (2)) — targets alternately either side, each side `slice`d; else single-loaded along the side away from the frontage |
| `hall_and_parlour` | one `slice` across the long axis at hall ÷ (hall + parlour), written around the back-to-back stack where H2 (a) placed one (the lobby-entry plan); remaining targets by `bisect` inside the parlour end |
| `cross_passage` | a strip of `crossPassageCm` across the wing through the main entrance's inward point (circulation, the hub), reaching the opposite side (and its rear or yard door where one exists); the hall on the larger side, the service rooms (`buttery`, `kitchen`, `store`, `shop`) `slice`d on the other |
| `enfilade` | `slice` across the long axis only, targets in list order; aligned doors (O4) |
| `lodgings` (the `dwelling` lobby, A5 (a)) | a lobby strip of `corridorCm` × (`corridorCm` + the door widths) at the main entrance (or the A6 strip where one is cut), then `bisect` of the rest into the units, each unit's rooms by `bisect` inside it — a variant of `bisect`, not an eighth `LayoutPattern` value (J-V3.25) |

**P5 Read-back and walls.** `readBack` (§3.4) gives the faces; each face takes its target's role, scope, unit,
concealment and `program` index; faces left without a target (slivers, strips) merge into the adjacent circulation face
where one exists, else into the neighbour with the least area over its target (`absorbSliver` or `mergeFaces`, never
across a joint); walls are the edges between different faces, typed by §2.6 (`exterior` on a seed side facing outside,
`party` on the plot's party-wall edge, `court` on a court ring, `partition` otherwise), collinear pieces merged between
the same two faces. Structural faces (the core's bay, a head's bay, stacks, through-rings, columns, choir flights) keep
their structural roles. **P6 Units' inner rooms:** inside a unit's piece its own rooms are cut by `bisect`, the cooking
place last, against the stack when the form has one.

**P7 Roles within exchange classes (`plan.roles`)** (V3C-22; J-V3.9, J-V3.62). The cut's assignment is re-dealt inside
each **exchange class** — the storey's non-anchored rooms (no entrance, hearth, core, head or composer anchor) of one
scope, one unit, one `maxDoors`, one hub-ness and one `door` kind, where every member role's storey rule is met by every
member's storey, every member piece's area lies in every member role's [min, max] and every member piece's OBB short side
is at least every member role's `minWidthCm`. `plan.roles` draws a permutation of the class's roles over its pieces in
piece order (Fisher–Yates on the stream, creation index 3.10). Because a class shares scope, unit, door cap, hub-ness and
door kind, O2's costs and O3's positions and widths are unchanged by it: a roles re-roll moves no wall and no opening
(T28-6, T-V3-19) and re-derives only windows, furniture, `lit` and labels (§6.1).

### 3.6 Openings — doors, unit entries, loops, windows, dormers

* **O1 Candidate door edges.** (a) Every wall between two rooms whose length ≥ the door's width (O3) + 2 · `jambCm`;
  entrances are fixed openings at their vertices (§2.6 rule 5), kind `entrance`; the passage room's two `passage` openings
  are fixed. (b) **Fixed arches** (V3C-04): a room of role `gatehall` takes an `arch` of `door.archCm` centred on each of
  its walls that lies on a court ring (volume 2's gate hall, open to the street by its entrance and to the court by this);
  the composed hall's **court door** (V2 §3.8 (1), where the main entrance does not lie on the `main` wing) is a fixed
  `door` of `door.mainCm` at the offset volume 2 gives on the hall's court wall. Both are secondary roots (O2). (c) **Floor
  datums** (V3C-21; J-V3.43): between rooms whose `floorCm` differ by Δ, a wall takes a plain door where Δ ≤ `riserCm`,
  a door with `steps = ⌈Δ ÷ riserCm⌉` treads drawn inside the lower room (their footprint kept free by F2) where Δ ≤
  `datum.maxSteps × riserCm`, and no door otherwise (`joinsRefused`, reported); a church's nave and a lifted chancel are
  joined by the choir flights instead (3.7.6). (d) **The joins of a stack** (S6; V3C-66 (2), V3C-67 (3)): each landing
  door, terrace door and seating exit is a fixed opening on its wall, of the width S6 gives, and a **stack root** (O2);
  4.2's `setOpening` on an exterior wall is lawful where the outside is a walkable terrace or ground within the datum
  tolerance (W2), and is otherwise bent to the nearest such wall of the same room, named. (e) **The main entrance's
  stoop** (V3C-66 (3)): where no level's floor the main entrance may open on (over an `external` basement, the levels at or above the
  ground: *Entrance storeys* below; seam S23R4-01) meets the outside ground at it (`Entrance.storey` 0 by default,
  BCR-V3-26) and its floor lies more than `riserCm` above it, the entrance opening carries `steps = ⌈Δ ÷
  riserCm⌉` treads drawn outside the wall — inside the porch where one stands — uncapped, and above `datum.maxSteps` it is
  reported `stoop`; a main entrance whose floor lies below the outside ground by more than the tolerance is reported
  `joinsRefused` and still opened (rule 5).
* **O2 The tree** (V3C-26; J-V3.10, J-V3.42). Prim's algorithm over the room graph's **internal** edges, from the main
  entrance's room on its storey (`Entrance.storey`) — on a solid stack, from S6's root landing door (critique/V02.md
  V2C-53); with no storeyed wing, from the basement root below (seams S23R2-10,
  S23R3-11) — until every room with an internal path is spanned. **Stack roots** (V3C-66; J-V3.81): then each landing door,
  terrace exit or terrace door of S6 whose room is still unspanned starts a further Prim tree over internal edges (the
  same costs), in S6's order; the rooms so spanned are reached from the main entrance through the exterior flights of
  `stairChain` and the walkable terraces (BCR-V3-14 extends T28-2 to them). **The basement root** (seam S23R3-11;
  J-V3.121): where `Basement.access` is `external` and `basementDoor(b)` is not `null`, the room of storey −1 its door
  opens into — whichever of 3.7.1's rules placed it — then starts a further Prim tree over the basement storeys' internal
  edges (the same costs), after the stack roots: the core stops at the ground storey there (§2.6 step 3), so the door is
  the root of the basement's storeys (§2.6 step 5 as volume 2's BCR-V2-33 (c) words it; T28-2's `external` clause); on a
  building with no storeyed wing it is the first and only tree. Edge cost: 1 into a circulation room, 2 between a hub
  and a room of its unit or use, 3 otherwise; a soft adjacency pair costs one less (never below 1); a hard `direct`
  adjacency pair is a forced edge, taken first. Forbidden: between rooms of two different units; between a unit room and a
  service room of the use (the live-in unit excepted, by O4's loop only); between a concealed room and a public one;
  between the crypt and any other basement room but its capped bays' undercroft, which 3.7.5's arch joins as a forced edge;
  and, where the crypt is stair-entered (3.7.4), between that undercroft and any other basement room, so the vault — the
  crypt and its capped bays — is closed to the rest of the basement (the crypt is entered from the church above; seams
  S23R4-03, S23R5-02) — a crypt stair's foot and a head's bay, structural faces joined as below, being no such room; into
  a room already at its role's `maxDoors`. Ties by room index. **The crypt join** (seams S23R4-03, S23R5-01; J-V3.126,
  J-V3.127). On a building whose crypt is not stair-entered (3.7.4) — entered from the basement, never from the church
  above (3.7.6) — the tree that spans the basement (the basement root's; else the main tree, which enters storey −1 by the
  core's bay or the trapdoor, §2.6 step 3) joins the crypt to the rest of the basement by exactly one join, within the
  crypt role's `maxDoors`: (i) where the tree enters the basement outside the crypt, at the first room it spans that
  adjoins the crypt while the crypt is unspanned — 3.7.5's arch where that room is the capped bays' undercroft (the forced
  edge above), else one new `arch` of `door.archCm` (the crypt role's door kind, O3) on their shared wall — the tree
  continuing from the crypt; (ii) where it enters the basement in the crypt (the outside door, or the core's bay, opens into it), 3.7.5's arch
  where the crypt has capped bays, else one new such arch to the crypt's adjoining room of least edge cost (ties by room
  index), the tree continuing from that room. So the crypt and every basement room beside it are reached from wherever the
  tree enters the basement — the outside door, the core's bay or the trapdoor — and the join is reported as a `cryptStair`
  anchor noted `crypt join` (3.9). **Secondary entrances** (side, rear, yard, service — a side door onto a walk-out's low side
  among them, 3.6; O1 (b)'s fixed arches and court door) then add their own openings only — never a tree edge — and a room reachable only
  through one of them is tier 1, except a concealed suite with a concealed entrance, which may be joined only through it
  (item 63; BCR-V3-14). **Structural faces:** the core's bay on each storey it serves is a room of role `stair` joined by one
  `open` opening onto its adjacent circulation room, else its largest neighbour (§2.6 step 5) — on storey −1 never a room of
  a stair-entered crypt's closed vault (above; seam S23R5-02); the storeys are linked
  through it (a portal in the exports, 5.3). A crypt stair joins the nave (3.7.6); a choir flight joins the nave and the
  chancel; a head's bay joins its host room by the head's opening (3.7.2), outside the host's `maxDoors`. A stack, a
  through-ring and a column are outside the graph (BCR-V3-9). A room left unreached is tier 1 (3.9).
* **O3 Width, position, leaf and swing** (V3C-48; J-V3.11). Widths: the main entrance `door.mainCm`; every other
  entrance `door.entranceCm`; a door between a room of scope `service` and circulation or the yard `door.serviceCm`; every
  other door `door.internalCm`; an arch `door.archCm`; an open doorway the whole wall where the wall is a pattern strip's
  side ≤ `corridorCm` + 2 · `jambCm`, else `door.archCm`. Heights: doors and arches `door.heightCm` (exports). A door
  stands on its wall at `jambCm + width ÷ 2` from the wall end nearer the tree parent's centroid, `hinge` at that end,
  swinging into the child room (into the unit from its corridor; into a room from the street), except where its swing
  square would overlap a stair bay, a head, a stack's apron or another door's square: then the other end, then the wall's
  midpoint, then the other swing (deterministic). Arches and open doorways take the wall's midpoint. Door kind = the child
  room's role `door`; a roles re-roll never changes a kind, width or position (P7).
* **O4 Loops by rule, never by chance:** hall ↔ parlour and hall ↔ stair hall where they share a wall; kitchen ↔ its
  yard door's room; every consecutive pair of an `enfilade` (doors aligned on the line `moduleCm` in from the court or
  street side); a common room ↔ the kitchen; the live-in unit's hub ↔ the use's principal room where they share a wall
  (the master's door into his shop; the unit's entry stays on circulation). A loop never joins two units or a concealed
  room to a public one.
* **O5 Unit entries.** A unit's entry is the tree edge from its first room to circulation or the street (`Plan.units[].
  entry`); where none exists after O2 — its pieces touch no circulation — its largest room nearest the core (or the A6
  strip) gets a circulation strip (`corridorCm`) cut from it along its wall toward the core, the unit room keeping its role
  if its area stays ≥ the role's min; else tier 1. This is how a subdivided shell grows its corridor (item 28 (f)).
* **O6 Concealed openings.** An opening is **concealed** exactly when a room on either side of it is concealed (derived,
  2.1). A concealed suite with a concealed entrance is joined through it; one without is joined by one concealed opening to
  one room of the use's service rooms (V3C-28); a secret head's room is joined by one concealed opening to the cellar, or
  to the concealed suite where one lies on that storey (3.7.3).
* **W1 Exterior demand** per room: `none` 0; `some` one window per exterior wall that holds at least one façade bay, at
  most 2; `max` one per façade bay.
* **Outside ground and exposure on every storey** (item 110 (a); V3C-70; J-V3.84). For each exterior wall of every
  storey, `outsideCm` is the surface sampled `door.mainCm` outward, along the wall's outward normal, from its midpoint:
  `levelledGroundCm(doc, key, p)` at the sample point `p` (BCR-V5-30: the levelled platform's datum, else the raster;
  `key` the building's arena, the ground's or its sky island's), never a direct read of the `Terrain` raster, which holds
  no levelled height; where the wall's midpoint lies within `cellar.insetCm + door.mainCm` of a `RetainingWall` chain
  and the sample point lies across it, `levelledGroundCm` on the chain's far side, never the blend across the step (the
  reading volume 2's BCR-V2-42 gives a wall-side datum sample; from V2C-57); on a deck (a bridge, pier, mole
  or quay deck) the deck's `surfaceCm`, over open water the water's surface; where the sample point lies inside the ring
  of another wing of the building that reaches no level there (the wing a stacked wing stands on, a stair wing, a solid
  seating bank), that wing's roof surface at the point — a terrace's `deckLevel` (3.4a), a pent skirt's or a stair's
  height there; only a walkable terrace of those is walkable. With
  `PlanGeometryRow.exposureAllStoreys` (default true):
  * a window stands only where `floorCm(w, s) + window.sillCm ≥ outsideCm` (no window into earth or into a pent skirt);
  * a door or an entrance opening stands on the wall only where `|floorCm(w, s) − outsideCm| ≤ datum.maxSteps ×
    riserCm` and the outside is walkable — ground, a deck or a walkable terrace, never water or a pent roof — the main
    entrance excepted (O1 (e));
  * a basement wall keeps the `light` rule below, its exposure read against the ground wing above it.
  With it false, only the basement rule reads the outside (the no-op pin, T-V3-34).
* **Entrance storeys** (BCR-V3-26; V3C-66 (3), V3C-70 (2)). `deriveEntrances` (§2.6) writes each entrance's `storey`: the
  level, basement levels included, whose `floorCm` at the entrance's wing meets `outsideCm` at its vertex within
  `datum.maxSteps × riserCm` — the nearest such floor where two meet — so a hill-town house entered from two streets has
  its back door one floor up, and a side door on a walk-out's low side opens into the cellar. The main entrance of a building whose `Basement.access`
  is `external` reads the levels at or above the ground only: that basement's core stops at the ground storey (§2.6 step 3;
  J-A29.25), so a main door on a basement level would strand every storey above it. A walk-out house fronting its street
  downhill keeps its main entrance on level 0 with its stoop (O1 (e)); its basement is entered by the outside door at
  `basementDoor(b)` — commonly on its low street side (rule 3), under or beside the stoop. S11 derives the entrance
  storeys after the basement decision, whose levels and access they read, and a change of the basement's `access`, `kind`
  or `floors` — by the basement's re-derivation or `setAttr(basement)` — re-derives them; the storey step draws nothing, so
  the door and basement draws keep their order on `siteplan.entrance` (J-A29.61) (*Entrances* rule 4 as BCR-V3-26 words
  it; seams S23R4-01, S23R5-03; J-V3.124). With no level meeting an
  entrance's ground, a side, rear, yard or service entrance is not derived (dropped after its draws on `siteplan.entrance`, so no other draw
  moves; reported `W_ENTRANCE_NO_STOREY`), and the main entrance keeps level 0 with its stoop (O1 (e)); where
  `ground(b)` is absent the main entrance's storey is null (S6). With `exposureAllStoreys` false every storey is 0 where
  `ground(b)` exists.
* **W2 Bays** (V3C-03, V3C-46; J-V3.13, J-V3.41; S23R1-02). On every side of every wing, volume 2's `facadeBays(wing,
  side, bayM)` (V2 §3.7: an eave side with its valley term, any other side of a `rect` or `quad` wing without it, a
  `polygon` wing's bays round its free perimeter) — so the plan's windows, the dormers and §8.4's lit windows share one
  rhythm; a side with no bay takes no window. The bays are the same on every storey, so windows on
  stacked walls align (§2.6 step 6). A window takes a bay's centre, moved along the wall to keep `endClearCm` from
  partitions, openings and stacks within its bay (no window in a bay where that fails); none on a party wall. Kinds:
  `slit` (`slitCm`) on the above-ground walls of a tower, turret or keep wing; on a basement wall, a `light` window only
  where the wall's **exposure** — the `baseCm` of the ground wing above the wall less its `outsideCm` — is at least
  `window.lightBelowCm` (a half cellar, a walk-out's low side and its face at a retaining wall, a raised crypt's walls),
  and no window on a buried wall; `window` otherwise. Every window also passes the exposure gate above. Under §11's Q1 order (the plan rung before volume 2's M6b), volume 2's
  `facadeBays`, `endMarginM` and `bayM` are built first as volume 2's own item, moved forward from its M6b and priced
  there, and exported from `@plat/plots` as `massStepped` is; P1 imports them and prices none of them (S23-36).
* **W3 Width** by the occupants' band (`window.widthCm`), ids by 2.2. The window-density baseline of the reference is
  §13.5's descriptive row, never a rule (V3C-47).
* **W4 Dormers** (§2.6 step 6; V2 §3.7's precedence). A room under a terrace or a flat roof takes no dormer (V3C-67 (4));
  on a stack "top storey" is each storeyed wing's own top level under a pitched roof, and volume 2's `tier`, `shrine`
  and `stair` roles admit no dormer row anyway (V2 §3.15.3). With a composition: an unedited `DormerRow`'s `count` becomes the
  number of top-storey roofed rooms with exterior demand whose exterior wall lies under that eave, at most its `nb`; its
  `kind` and `widthCm` kept and its positions volume 2's `dormerPositions`; each such room takes the dormer in its bay as
  its window. An edited `DormerRow` (`edited: true`) is a fixed input: each top-storey room under one of its dormers takes
  that dormer as its window, whatever its demand. Without a composition, `Wing.dormers` is that count (§2.6), derived.
### 3.7 Basements, the crypt and the heads of the ways down

**3.7.1 The basement storey.** Storeys −1 … −k are cut like any storey on `Basement.ring` (seed), storey −1 less the
crypt's piece and its capped bays' piece (3.7.4, 3.7.5), with the core's bay where `Basement.access` is `core`. Their rooms are A5's basement allocation —
`cellar`, `store`, `undercroft` (scope `service`), a concealed use's `strongroom` (`service`, concealed), the host rooms of
A2 (10) — and, with nothing allocated, one `cellar` (`nave`). The crypt (`service`) is its own piece (3.7.5). **Access**
follows §2.6 step 3 (`core`, `trapdoor`, `external` with its door at `basementDoor(b)`, below; BCR-V3-32). An access or basement change marks
the rung stale (§2.8's inputs, as BCR-V3-19 words them).
* **Where a core joins it** (V3C-65 (3), V3C-82; J-V3.88). A core joins the basement only where `ground(b)` exists and
  the core's wing stands on the ground and reaches level 0; its bay then lies inside the part of `Basement.ring` under a storeyed ground wing (J-A29.25's rule), else the base's trapdoor fallback in that part —
  in either case outside the vault of a stair-entered crypt (3.7.4), which O2 closes to the rest of the basement; a
  crypt-only basement's cores are its crypt stairs (3.7.4) (seam S23R5-02). A building with a solid ground
  wing beside a storeyed one (the arena's seating beside its ring, a stepped temple with a storeyed annex) is joined so,
  never forced outside.
* **The walk-out at a retaining wall** (item 110 (a); V3C-70 (3); BCR-V3-27 (a)). Where a footprint side lies on or within
  `cellar.insetCm` of a `RetainingWall`'s high side whose step there is at least half the cellar depth, the basement
  decision takes the walk-out form (`Basement.access` `external`) and its outside door opens on that side, onto the
  lower terrace, by `basementDoor(b)`'s rule 1 below; W2 gives that face its `light` windows. Volume 2 keeps a building
  off a wall by its template's setback (V2 §3.17 (a)), so the rule fires where that setback is below `cellar.insetCm` — a
  row built against the terrace's edge. The decision is S11's (the base's *Basements* as BCR-V3-27 words it), built at
  M3a with the retaining walls (§8's PE).
* **The outside door — `basementDoor(b)`** (S23R3-01; J-V3.114, J-V3.115). Where an `external` basement's outside door
  opens is stated once, here, as a pure function of eager records:
  ```ts
  declare function basementDoor(doc: Document, key: PlatKey, b: Building): { side: number /* the index of a Basement.ring side */; at: PointCm /* the door's centre on that side */ } | null;
  ```
  Written `basementDoor(b)` in prose, it is called on the building's own document and arena key — the key its plot lies
  on — which reach the `RetainingWall`s and `levelledGroundCm(doc, key, p)` (seam S23R3-16). It reads `Basement.ring` and `.access`, from M6-U the crypt's vault (below: `Basement.crypt` with its capped
  bays — derived, never stored: 2.1's derived pieces, 3.7.4 (3)), the `Entrance` records, the wings (`ground(b)` by 3.3's level reading, the
  stair wings' rings and stair 0's approach, volume 2's `stairChain`), the `RetainingWall`s with volume 1's
  `stepProfile(wall)` (its BCR-43) and volume 5's `levelledGroundCm(doc, key, p)` (BCR-V5-30), and the cells `moduleCm`,
  `door.mainCm`, `cellar.insetCm` and `cellar.depthCm`; it draws nothing and reads no plan, is implemented in
  `@plat/plots` beside `facadeBays` and re-exported by the plan package (`@plat/buildings`, BCR-V2-18's precedent), and is built with the eager facts at M3a (§8's PE; file f item 578), so the plan
  rung's step 3 (§2.6 as BCR-V3-32 words it), volume 1's entrance reserve (V1-3.8.2 step 5), T28-3 and the exports read
  one door without elaborating anything. It is `null` unless `Basement.access` is `external`; otherwise the first of these rules that gives a side wins, over the
  **door sides** — the sides of `Basement.ring` at least two `moduleCm` long (a door's width, §2.6 step 3) — each read at
  its **door point**: its midpoint, except on a building with `Basement.crypt` and `ground(b)` — a church, whose crypt is
  entered from the church above by its crypt stairs (3.7.6), never from the street, or a crypt beside a storeyed wing but
  under none, entered through O2's crypt join from a basement room (seams S23R4-03, S23R5-01; J-V3.125, J-V3.127). There the
  door point is the point of the side nearest its midpoint (ties toward the side's first vertex) at which the door's
  **span** — two `moduleCm` centred on it (a door's width, §2.6 step 3, as `stackAccessDoor(b, a)`'s span), lying
  within the side — shares no length with the crypt's **vault**, and a side
  with no such point is no door side. The vault is `Basement.crypt.ring` with, where the rank has capped it, its capped
  bays — the step-2 ring of 3.7.4, which the rank's trim and re-growth never move, so no event at another church moves
  this door — or the author's ring where `Basement.crypt.edited` is set. `Basement.crypt` exists from M6-U (file f item
  238); before it every door point is a midpoint. The rules:
  1. **The wall walk-out.** The door sides whose door point lies within `2 × cellar.insetCm` of a `RetainingWall`'s high
     side whose step there — `stepProfile(wall)` at the chain point nearest the door point — is at least `cellar.depthCm ÷ 2`
     (the ring lies `cellar.insetCm` inside the ground wings, so this is BCR-V3-27 (a)'s footprint test moved onto the
     ring): the one with the largest step, ties by the nearer wall, then by ring index; `at` its door point. Where the test
     — read at the midpoint of a side that is no door side — holds only for sides of the ring that are no door sides
     (shorter than a door side, or, on a church, with no door point off its crypt's vault), the result is `null` while
     `ground(b)` exists — the base's
     `trapdoor` fallback, reported (3.9) — and never a door on a side away from the wall; without `ground(b)` rule 2
     follows.
  2. **The tomb door**, where `ground(b)` is absent (no storeyed ground wing: the one condition of volume 2's BCR-V2-33,
     the access external where no ground wing is storeyed; provenance V3C-82): an outside stair down to a door at the
     basement's floor in the face of a ground-standing wing on the main entrance's side, on the door side nearest that
     face, outside every stair wing's ring and stair 0's approach, `at` that side's point nearest the main entrance,
     moved along the side until the door's width lies within it (reported `tombDoor`). A crypt inside a solid tier 0
     (critique/V02.md V2C-68) is entered by the same door at its own floor. The tomb door is the basement's root (T28-2's
     `external` clause).
  3. **The fall walk-out.** The door side whose outside ground is lowest — `levelledGroundCm` at the point
     `cellar.insetCm + door.mainCm` outward from the side's door point along its outward normal (the point W2 samples for
     the wall above it, 3.6, where the door point is the midpoint), read on a `RetainingWall`'s far side where the point
     lies across one — ties by ring index; `at` its door point.

  With no door side at all the result is `null` (the `trapdoor` fallback, reported; 3.9). The plan opens the door — an
  `Opening` of kind `door` of `door.entranceCm` on storey −1's wall along `side`, centred at `at` — with the base's outside
  stair (step 3); whichever rule places it, the door is the root of the basement's storeys (O2's basement root; §2.6
  step 5 as volume 2's BCR-V2-33 (c) words it; seam S23R3-11). Every input is
  eager, so a `RetainingWall`, terrain, levelling, wing, entrance or basement change — the crypt's vault among the
  basement's, from M6-U — moves the door, and marks the plan stale through BCR-V3-28's outside digest or the basement's own
  change (§2.8).

**3.7.2 Access heads** (V3C-59, V3C-60; J-V3.49, J-V3.50). Every `AccessPoint` in `BuildingInput.accesses` — every access
whose `ground.host` is this building or its basement, whatever its source (`neighbourhood`, `basement`, `system`,
`lifeline`, `edit`, and volume 4's `dig`, `opening`, `overlap`, `crypt`, `dossier`) or cause (BCR-V3-19; V4 §2.2) — gets
exactly one head, in access-id order, placed before any cut:
0. **Decks** (item 110 (d); V3C-72, V3C-84; J-V3.92). A building on a deck — `onDeck(b)`: exactly the buildings volume
   2's deck gate (BCR-V2-34) denies a cellar, a placed landmark at a mole's head or mid-mole included (J-V2.68; a quay on
   the bank excepted by volume 2's `DeckContext.surfaceCm` null, V2 §2.6; from V2C-66 (1)) — hosts no head and no well. An access volume 4 hands one anyway is
   headed as a `hatch` on level 0 and reported `W_DECK_ACCESS`; a well pin there stays volume 4's, unheaded (reported).
1. **Storey.** A `stair`, `cellar_stair`, `ladder`, `hatch`, `shaft` or `door` heads on the building's lowest storey (the
   deepest basement storey, else level 0 where `ground(b)` exists); with neither — a solid stack without a basement — the
   head is an outside door in the face of a ground-standing wing, its descent inside the mass the access's own stairwell
   (volume 4's), reported `W_STACK_ACCESS` (V3C-65 (3)): a head of `storey` null, with no room and no `Opening`, whose
   `door` (2.1) is `stackAccessDoor(b, a)` below — the one point volume 1's entrance reserve reads (V1-3.8.2 step 5; seam
   S23R3-09) — drawn `door.entranceCm` wide at its `at` (5.1; seam S23R2-10).
   **`stackAccessDoor(b, a)`** (seam S23R3-09; J-V3.120) states that door once, as a pure function of eager records:
   ```ts
   declare function stackAccessDoor(b: Building, a: AccessPoint): { wing: number /* BaseWing.key */; side: number /* that wing's ring side */; at: PointCm; fallback?: true } | null;
   ```
   It is `null` unless the building has no basement and `ground(b)` is absent (3.3) — the only buildings whose heads take
   this form — and otherwise reads only the wings (`on`, `solid`, `role`, their rings), volume 2's `stairChain` (stair 0,
   and its approach strip as V2 §4.6 bounds it: none under the stair form `none`), `a.ground.at` and the cell `moduleCm`;
   it draws nothing and reads no plan, is implemented in `@plat/plots` beside `basementDoor(b)` and re-exported by
   `@plat/buildings`, and is built with the eager facts at M3a (§8's PE), so volume 1's entrance reserve (M5) reads it
   before any plan exists. Terms: the building's **outline** is the edge of the area its ground-standing wings
   (the wings without `on`) cover together; a **door part** is a maximal stretch of a wing's ring side lying on
   that outline, at least two `moduleCm` long (a door's width, §2.6 step 3, as `basementDoor(b)`'s door sides); a point of
   a door part is **admissible** where it lies at least one `moduleCm` from each end of its part and its **span** — one
   `moduleCm` either side of it along the side — lies at least one `moduleCm` from stair 0's approach strip.
   * **The wing** — among the ground-standing wings whose `role` is not `stair` and that hold an admissible point, the one
     whose ring, as a region, lies nearest `a.ground.at` (0 where it holds the point; ties by key).
   * **The side** — among that wing's ring sides holding an admissible point, the one whose admissible points lie nearest
     `a.ground.at` (ties by side index).
   * **`at`** — `a.ground.at`'s projection onto that side, moved along it by the least distance that makes it admissible
     (ties toward the side's first vertex).
   * **The fallback** — with no admissible point on any non-stair ground-standing wing: the midpoint of the outline side
     nearest `a.ground.at` among every ground-standing wing's ring sides, stair 0's included (ties by wing key, then side
     index), `fallback` set; the plan reports it `W_STACK_ACCESS` with the note `door fallback` (3.9).
   The head's `door` takes the result's `wing`, `side` and `at`; `distCm` (5) is measured to that `at`. Every input is
   eager, so a wing, stack or stair change moves the door, and the access's change or the building's re-derivation marks
   the plan stale (§2.8 as BCR-V3-19 words it). A `well` heads on level 0 where
   `ground(b)` exists (water is drawn from above), else it stays volume 4's pin, unheaded (reported). A crypt
   join (cause `crypt`) heads on storey −1 in the crypt; any other kind a building hosts (a `sinkhole`, `collapsed_shaft`,
   `ruin_entrance` under a footprint) is headed as a `hatch` (on a building with neither a basement nor `ground(b)`, as
   the outside door above), reported.
2. **Form.** `stair` and `cellar_stair`: the bay of one flight — S1 at the access's drop where the drop is at most the head
   storey's height (the basement's `cellar.depthCm`, else level 0's `storeyCm`), else S1 at that height, trying
   `straight`, `dogleg`, `winder`, `spiral` in S4's order; the rest of the descent is the access's own stairwell below the
   floor, the underground part's (volume 4), never cut into the plan. `ladder`: the ladder bay. `hatch`: an `Opening` of
   kind `trapdoor` with `point` (BCR-V3-17) over a ladder bay. `door`: an `Opening` of kind `door` on the head storey's wall
   segment nearest the element, at the point nearest it. `shaft`: a square of `access.shaftCm` with a ladder in it.
   `well`: a disc of `access.wellCm` (its parapet included) as a 16-gon on the lattice, like the spiral's.
3. **Through-rings.** A `well`'s or a `shaft`'s ring is a fixed ring on every storey from its head down to the lowest
   basement storey, a face of role `shaft` (never allocated, furnished or entered but at its head).
4. **Air.** An access of role `air` the building hosts (volume 4's L1 air shaft through a building) rides the chimney stack
   nearest `ground.at` within `access.snapCm`: `Chimney.air` names it and the stack's `levels` extend down to the lowest
   storey. With no stack in reach, a hearthless stack from the lowest storey to the roof is placed by H2 (b)–(d) (drawn on
   the roof as a stack, §8.6), reported. On a building with neither a basement nor `ground(b)`, which has no storey to
   carry a stack from, it takes (1)'s outside-door form — a vent in the foot — `storey` null (seam S23R2-10).
5. **Position.** Candidates on the module ranked by distance from `ground.at` — a stair's bay against a wall of its piece
   as S2 requires; a shaft, well or hatch anywhere in the piece keeping `minEdge` — excluding clearance squares, aprons,
   the core's bay, the crypt's columns and other heads. The first candidate within `access.snapCm` of `ground.at` is taken,
   else the nearest, reported in `PlanReport.anchors` with its distance (`AccessHead.distCm`); a head of `storey` null
   takes (1)'s door point instead, `distCm` measured to `door.at`. The head is the drawn
   position at the building band; the underground part keeps `ground.at`; the two scenes link by the access id (5.3).
6. **Host room.** The head's room is the first role, in the order of the `AccessHostRow` for the reached element's system
   kind and the access's cause (a row with the cause wins over the row without one), that is present on the head's storey;
   the `ProgramRoom` holding it takes `anchor.access` (BCR-V3-19), and with none present A2 (10) has added one; a head of
   `storey` null has no host room. **On a crypt-only basement** — storey −1 the crypt's and its capped bays' pieces alone
   (A4, 3.7.5), with no cellar or store and no room to cut one — a head whose reach is not a catacomb lies in the capped
   bays' `undercroft` where one exists, else in the crypt itself (an access broken into the vault), reported in
   `PlanReport.anchors` (`kind: 'access'`, tier 2, note `crypt host`; J-V3.119). A crypt join
   (cause `crypt`, volume 4's U-ACCESS (c)) is the only catacomb head a crypt holds; any other catacomb head — the burial
   ground's chapel stair, volume 4's §3.5.1 (9) — lies in a cellar, the chapel's nave or a store. **A church-class building**
   (its class's crypt column `always` or `basement`, 3.7.4; J-V3.73) never hosts a catacomb access of source `system`: should
   volume 4 hand one, the plan heads it in a store, reports `W_CHURCH_CATACOMB_HEAD`, and T-V3-23 (d) fails the fixture.
7. **Opening and state.** The head's opening enters it from its host room (kind `open` for a stair or ladder bay, the
   hatch's `trapdoor`, the door itself), outside the host's `maxDoors`, as a core's is; a head of `storey` null has no
   `Opening` — its door is its `door` (1), on no storey's wall. The access's state as II.7.4 reads
   it — the stored `state`, or, while its element is closed (II.6), the derived reading (`bricked` while the element is
   sealed; `collapsed` while it is partly caved in or collapsed) — is drawn and exported (5.1, 5.3): `open` as drawn;
   `locked` a closed, locked door or hatch; `bricked` the opening drawn as wall with a bricking hatch and left out of every
   portal; `collapsed` the opening drawn as a trace with rubble stipple (§8.2's access row, as volume 1's V1-3.8.8 draws
   the surface symbol) and left out of every portal (S23R3-07). The reading is taken at draw and export time from the
   access record and its element's closure, never stored on the head, so a closure change (II.6's conversions, volume 6's
   epochs) redraws the head's storey (its `DisplayDelta`, 5.1) without re-cutting the plan.

**3.7.3 A secret head** (V3C-02; J-V3.51). A head whose access's `knownTo` is `secret` gets, before the storey's cut, its
own concealed room: a fixed ring of role `back room`, of area the role's min × the ladder row's `sizeFactor` and at least
the head's ring plus `landingCm` in front of it, against the head storey's wall nearest the element (the head placed
inside it by 3.7.2 (5) within that ring). The room is `concealed` (scope `service`); the rest of the storey — the public
cellar with its core or trapdoor — keeps its scope and no concealed flag. The room is joined by one concealed opening to
the cellar, or to the concealed suite where the building has one on that storey (O6). A `local` or `public` head stays in
its host room. The same holds for a secret head on a ground storey (a hovel's hidden shaft).

**3.7.4 The crypt — derived with the basement, never by the plan** (item 109 (k) (2), (6) as revised ~20:05, J111;
V3C-61; BCR-V3-20; J-V3.45, J-V3.48). §2.6's basement function derives `Basement.crypt` with the basement, from volume
11's three-valued `crypt` column (BCR-V11-13):
* **`always`** — volume 11's `cathedral` and `great_temple`, and any building a dossier crypt record binds to (volume 4's
  dossier row set, V4 §2.3a). The basement is taken by the **no-refusal crypt ladder** — `full`, then `half`, then
  `raised` (V2 §3.14.5 (d), `Basement.kind 'raised'`, BCR-V2-28; on a sky island volume 5's rim-slab vault, V5 §3.10 (5),
  planned here as the `full` form) — in place of the class probability and of the terrain gate's no-cellar rows. Where
  the class's ordinary cellar draw also gives a basement, the crypt lies inside it; otherwise, where the crypt is stair-entered or `ground(b)` is absent (below), the basement is
  **crypt-only**: `Basement.ring` is the crypt's ring, `floors` 1, and `Basement.access` is `core`, its cores being the crypt
  stairs (3.7.6), so T28-3 holds — `external`, by its outside door at `basementDoor(b)` (the tomb door, or a wall walk-out's door), where `ground(b)` is absent (3.7.1; a great temple built
  as a solid stack, whose seed wing is its tier 0, V2 §3.15.3). Where `ground(b)` exists but the crypt would not be
  stair-entered (below), the basement is never crypt-only: it takes the region whole (§2.6's inset of the ground wings,
  BCR-V2-33), the crypt inside it, `floors` 1, its access the programme row's (§2.6 step 3; `external` only for a walk-out,
  volume 2's BCR-V2-33), so the core the storeyed wing brings, or the trapdoor fallback, lands in the part under that wing
  (3.7.1's *Where a core joins it*) — an outside door, where a walk-out makes the access `external`, lying off the vault
  (3.7.1) — and O2's crypt join enters the crypt (seam S23R5-01; J-V3.127). On the `raised` rung volume 2 lifts every ground wing over that whole inset, the storeyed wing with the seed wings, so its ground storey clears the basement by `crypt.clearCm` as a raised choir clears its crypt and its core reaches the basement beside the crypt; a solid tier 0 holding the crypt inside it keeps its height (V2 §3.14.5 (d) and BCR-V2-28 as seam S23R6-02 words them; seam S23R6-01; J-V3.128). An author's crypt ring on a building without a
  basement makes a basement by the same ladder — crypt-only, or the ground wings' whole inset where that ring would not
  be stair-entered (4.2; V3C-75).
* **`basement`** — the base decision applies unchanged; a `full`, `half` or `walkout` basement holds a crypt, a crawl
  space none (volume 11's religious cellar rows are then the crypt's chance).
* **`never`** — no crypt.

The **ring** is derived in three steps, all on the lattice and in `area2`:
1. **Seed** (S23R1-01). The part of the basement's region (`Basement.ring`; for a crypt-only basement, the ring the
   basement would take, §2.6's inset of the ground wings, BCR-V2-33) under the wings `cryptSeedWings(b)` returns (volume 2
   §3.14.5 (c), exported by `@plat/plots`); where it returns none, the third of the region farthest from the main entrance
   along the footprint's OBB long axis.
2. **Growth** to volume 11's `cryptM2` target `T` for the class at the occupants' band (a four-column cell, read as A1
   reads cells): where the seed exceeds `T`, it is trimmed from its end nearer the main entrance by a cut perpendicular to
   the long axis at the module position giving `T` (`slice`'s search); where it falls short, it grows toward the main
   entrance by the slab of the region between its entrance-side edge and a parallel line, the line's module position
   giving `T` (bisection), never beyond the region — on the crypt ladder's `half` and `raised` rungs never beyond the ground wings its step-1 seed lies under (volume 2's `cryptSeedWings(b)`, else the ground wings over the far third), which volume 2 raises or lifts over it, or the solid tier 0 that holds it (V2 §3.14.5 (d); BCR-V2-28), so a half-sunk or raised crypt stays under its raised choir (seam S23R6-03; J-V3.129) — and a region smaller than `T` becomes the crypt whole (reported); a crypt so bounded below `T` is reported short as a region smaller than `T` is. An author's ring (4.2) keeps no bound: volume 2 then raises or lifts the wings over it (seam S23R6-02).
3. **Rank.** The settlement's **principal crypt** is the `cathedral` building's (several: the largest ring, ties by
   address); with no cathedral, the `always` building's with the largest ring (ties by address); with no `always`
   building there is none. Every other crypt's ring is **capped** at `crypt.rankShare` (volume 11's row, default 0.8) ×
   the principal's area: its step-2 ring, trimmed from its entrance end by step 2's cut where it exceeds the cap (ST-39;
   J-V3.107). **The trim shortens `Basement.crypt.ring` only, never `Basement.ring`**: a crypt-only basement keeps its
   whole extent as basement, and the **capped bays** — the step-2 ring less the trimmed ring, inside `Basement.ring` (derived, never
   stored: 2.1's derived pieces; §1b's capped-bays row) — are planned as one `undercroft` room (A2 (9)) under the crypt's column grid, their vaults kept and drawn
   (3.7.5). **The rank is recomputed, never only a trim**: each run caps every ranked crypt afresh from its step-2 ring
   (steps 1–2, deterministic, no draw), so when the principal's area falls, the principal moves to another building or
   the trimmed building becomes the principal (the see returns), its ring re-grows within `Basement.ring`, up to its
   step-2 ring, and the capped bays regain the crypt role. The rank runs as a closing pass of S11 over every building with
   a crypt (BCR-V3-20), and again, inside the causing event, whenever the principal crypt, its building or its area
   changes (the other crypts' plans are then marked stale or re-cut, §7.3); volume 11's compile bar keeps every `always`
   class's smallest `cryptM2` above every `basement` class's largest, so at generation the trim is a backstop, save where the `half` or `raised` bound leaves the principal short, and across
   epochs volume 6 re-runs this rank inside each op that moves the see (V6 §3.18.3 (2)–(3)).

**A stair-entered crypt** (seam S23R5-01; J-V3.127). A crypt is *stair-entered* where `ground(b)` exists and the ring of a
storeyed ground-standing wing (3.3's level reading: `BaseWing.on` absent and `s₀(w)` = 0) shares area with its
**vault** (3.7.1: the step-2 ring, which holds its capped bays, or the author's ring where `edited` is set) — a reading of
eager records, derived and never stored, that no rank event moves. A stair-entered crypt is entered by its crypt stairs
(3.7.6); any other — `ground(b)` absent (a great temple built solid), or no storeyed wing over its vault (a great
temple's crypt under its solid tier 0 beside a storeyed annex) — is entered from the basement: by the outside door at
`basementDoor(b)`, or through O2's one crypt join. The basement function reads it before it fixes the basement's extent
(the `always` bullet above), on the step-2 ring of the region a crypt-only basement would take (step 1) — the ring the
crypt keeps in the whole inset too, whose seed and growth read the same region — and it is built with the crypt
derivation at M6-U (file f item 238; §8's P2).

A ring the author set (`setAttr(basement)` on `basement/crypt/ring`, `edited: true`) is kept as the author's and never
trimmed; a rank or an always-rule it breaks is announced and reported (4.2; J-V3.47). A dossier crypt record makes its
building `always`. **No plan derivation writes `Basement.crypt`**: the plan reads it (T-V3-23 (f)), so volume 4's crypt
join (V4 §3.5.7 (c)), the rank, volume 10's why and volume 1's T-V1-47 (its check that no crypt has a place or a pin;
V1-3.7.1's opening pass selects by `AccessPoint` fields and reads no crypt field; S23R1-24) read it at generation without
elaborating any building. A church-class building without a crypt furnishes its chancel with flush `ledger` slabs (3.8; J-V3.44): no
opening, no join and no floor-vault "crypt".

**3.7.5 The crypt's plan.** The crypt's ring is a fixed seed piece of storey −1 (3.4), cut out of `Basement.ring` before
A5 allocates the rest, and holds one room of role `crypt` (the `nave` pattern). **The capped bays** (3.7.4 (3)), where
the rank has trimmed the crypt, are a second fixed seed piece beside it holding one room of role `undercroft` (the `nave`
pattern), joined to the crypt by one `arch` of `door.archCm` on their shared wall, and — only where the crypt is not
stair-entered (3.7.4; O2's crypt join) — to the rest of storey −1 as any room is (O2; seam S23R5-02). The crypt's **columns**: in the step-2 ring's OBB frame (an `edited` ring's own), a grid of pitch `crypt.bayCm` centred on
that OBB, so the grid does not move when the rank trims or re-grows the ring; a square of `crypt.columnCm` stands at every grid node lying at
least `crypt.bayCm ÷ 2` inside the crypt's ring or the capped bays' ring and outside every stair bay and head; each is a fixed ring of role `column` that the cut
avoids and F3 furnishes around. The crypt's boundary moves only with `Basement.crypt.ring` (a `moveWall` on it bends to
`setAttr(basement)`, 4.2). Its walls above ground in the `raised` form take W2's `light` windows.

**3.7.6 Crypt stairs and choir flights** (V3C-61 (4); J-V3.46). The crypt's **nave-side edge** is its ring's edge that
crosses the footprint's long axis nearer the main entrance; on storey 0 the same line is the nave/chancel line (the chancel
wing's joint, or the chancel strip's cut, 3.5).
* **Where they start** (V3C-65 (3)). Crypt stairs are laid only to a stair-entered crypt (3.7.4); they and the choir flights are laid only from a nave piece on level 0; where `ground(b)` holds no nave, the crypt stairs from the largest room on level 0 whose piece stands over part of the crypt's ring along its nave-side edge, else from the largest room of level 0 standing over part of its vault (seam S23R6-04), the flight's bay laid inside that part, landing in the crypt, else in the capped bays' undercroft that
  3.7.5's arch joins to it (3.9); where the crypt is not stair-entered (3.7.4: `ground(b)` absent — a stepped temple's
  sanctuary on its solid stack — or no storeyed wing over its vault), the crypt's entry is from the basement — the
  outside door at `basementDoor(b)` (3.7.1: the tomb door, or a wall walk-out's door) directly, or O2's one crypt join
  from the basement's tree (O2 (i), (ii); seams S23R4-03, S23R5-01) — reported `cryptStair` with the note `tomb door`
  (the door opening into the crypt) or `crypt join`, and no stair descends through a solid wing.
* **(a) Crypt stairs, `full` and `half` forms.** Straight flights of S1 at Δ = `floorCm`(the nave's wing, 0) − the crypt's
  floor, width `stair.flightCm.institution`, each a `StairCore` of `levels` [−1, 0] whose bay lies inside the crypt's ring
  against its nave-side edge, its long axis along the church's axis (it descends away from the nave). Two flank the axis,
  at ±(`minRoomWidthCm` ÷ 2 + f ÷ 2) from it, where the edge holds two flights and `minRoomWidthCm` between them; else
  one, on the side of the lower lattice index. On storey 0 the bay is a fixed ring in the piece above it (the chancel's
  west end where the crypt lies under the chancel alone), joined like a core's bay (O2) with the nave preferred — one `open`
  opening onto the nave, or onto the room above it that the tree reaches first; on storey −1 its foot opens into the crypt. A bay that does
  not fit takes `dogleg`, `winder`, `spiral` in turn, then one `ladder` bay (tier 2, reported `cryptStair`).
* **(b) The crypt entry, `raised` form.** One `StairCore` of `levels` [−1, 0] centred on the axis at the nave-side edge:
  S1 straight at Δ = |the nave's floor − the crypt's floor| (Δ may be 0: a level bay of `landingCm` depth), width
  `stair.flightCm.institution`; on storey 0 its ring lies under the lifted choir at the nave's floor and is joined to the
  nave by an `arch`; its foot opens into the crypt.
* **(c) Choir flights.** Wherever a chancel piece's `floorCm` exceeds the adjacent nave piece's by more than
  `datum.maxSteps × riserCm` (volume 2's lift of `crypt.clearCm`, or any other difference between the nave's and the
  chancel's wings), two straight flights of S1 at that difference, width `stair.flightCm.institution`, stand in the nave
  piece against the nave/chancel line, rising toward the chancel — flanking the crypt entry at ±(its width ÷ 2 + `jambCm` +
  f ÷ 2) from the axis in the `raised` form, else flanking the axis as (a) does; where the width holds only one, one on the
  side of the lower lattice index; where none fits, one flight against the nave's side wall at the line (tier 2), else
  tier 6 (flagged). Each flight is a room of role `stair` with an `open` opening onto the nave at its foot and onto the
  chancel at its head: the O2 edge between nave and chancel that replaces O1 (c)'s refused door, so T28-2 holds.
* Where the crypt is stair-entered (3.7.4) the crypt stairs are its entry and the vault is closed to the rest of the
  basement (O2; seam S23R5-02); where `ground(b)` exists the basement's outside door never opens into the crypt's vault
  (3.7.1's door point; seam S23R4-03), so a crypt beside a storeyed wing but under none is entered by O2's crypt join
  (seam S23R5-01). A crypt joined to a catacomb holds that access's head (3.7.2 (6)) and
  nothing else links it underground.

**3.7.7 The crawl space** (`kind: 'crawl'`) is no storey: level 0 carries an `Opening` of kind `trapdoor` with
`point` (BCR-V3-17) in the room over the building's lowest footprint sample (J-V3.18), and nothing below is cut. Where
`ground(b)` is absent, the hatch is an outside one at `basementDoor(b)` (3.7.1; the access is `external` there by volume
2's BCR-V2-33), else, where that is `null`, in the face of the ground-standing wing nearest the main entrance, reported.
### 3.8 Furnishing

* **F1 Count.** Per room: `n = density × area in m²` (the role's density, interpolated, × the resolved row's
  `furnish.density` multiplier), its fraction drawn once on `plan.furnish`; 0 in circulation, passage and structural rooms
  and in a vacant or ruined plan.
* **F2 Free floor.** The room's ring less: every opening's clearance square, every stair bay with its first-step apron
  (`landingCm`), every stack's apron, every head's ring with `landingCm` in front of a stair or ladder head, every
  `Opening.steps` flight's footprint, every column, and a `walkwayCm` band along the tree path through the room (door to
  door).
* **F3 Place** (V3C-41, V3C-49; J-V3.67). The glyphs are the role's list filtered by each row's `band` (absent: every
  band); `ledger` enters only a chancel of a church-class building without a crypt (J-V3.44), `brazier` only by 3.12, and
  `tomb` in a crypt stands `free` between its columns. Glyphs are drawn by the rows' weights on `plan.furnish`, largest
  first, each capped at its `perRoomMax`. The first `round(n × wallBias)` items (the role's `wallBias` × the row's
  multiplier) go to wall slots: `against` items at slots scanned along the room's walls from the corner farthest from the
  room's entry door, counter-clockwise, on the module; `corner` items in corners first. The rest by their placement: `row`
  items (pews) in rows across the long axis from the altar end with `clearCm` aisles; `free` items at the room's spine
  summit (§3.8's `spine` reader), then along the spine. Rotation `rotCdeg`: an `against`, `corner` or `row` item's is its
  wall's direction, a free item's the room's OBB long axis, in integer centidegrees through `dmath` (§6.5 (2)); the fit test
  uses the rotated rectangle and its `clearCm` in front inside F2's free floor. An item whose row is `tall` keeps off a
  window's bay. An `altar` stands first, centred against the room's wall farthest from its entry door (a chancel's east
  wall; V3C-18). None fitting → skipped (counted in the report). Nothing is placed over an opening's clearance square, a
  stair bay, a head or an apron (§2.6 step 6).
* **F4 Ids** in placement order (2.2); `Room.nextFurniture` set to the count.

### 3.9 Failure handling — every step's failure, on F-PLAN's ladder (§5.2)

| failure | detected by | tier (§5.2) and repair |
|---|---|---|
| a household does not fit at its form | A5 (a) | 0: the next poorer form; never omitted — at `room` the **no-abort fit ladder** below runs |
| a soft room does not fit | A5 (d) | 0: dropped, reported; 5 later if a cut leaves it below min |
| a hard non-unit room does not fit | A5 (b) | the ladder's step (ii): 6, omitted and reported, only after every unit has reached its form or `room` |
| no stair candidate for the kind | S4 | 2: the next kind; 6: upper storeys unreached, flagged |
| no stack candidate | H2 (a)–(d) | 2: the next preference; (e) a smoke hood, reported; 6: the hearth omitted, the room kept, reported |
| an anchor or head ring refused by the arena (`fixed`) | `transientArena` | 2: the next candidate in the same attempt (no stream read) |
| a head beyond `access.snapCm` | 3.7.2 (5) | 2: the nearest candidate, its distance reported |
| no shared-access strip fits | 3.5 step 0 | 2: the core re-scored by distance, then the lobby with O5 strips, reported |
| a cut part below `minWidthCm` everywhere | `slice` | 2: slide to the neighbour's minimum; 3: re-run the pattern on the next `plan.layout` attempt (≤ 3); 4: `bisect` on the wing's axes |
| a room unreached or a unit without its own door | O2, O5 | 2: O5's strip; 5: a soft room absorbed into circulation; 1 → flagged if still failing |
| two floors too far apart for a door | O1 (c) | the wings unjoined (S5), a stair hall flight or the choir flights; `joinsRefused` reported |
| a crypt stair or choir flight that does not fit | 3.7.6 | 2: the next kind, one flight, the side wall; 6: flagged |
| a hard room missing after the cut | P5 | 5: a generic room where a piece is free; 6: omitted, flagged |
| a seed, passage or composer ring refused | `tileRings`, `transientArena` | the rung aborts with its stream key (a composer's or caller's bug, §2.6's contract); the building draws its wings and is flagged |
| work limit reached on a storey | the storey's work count | 3: the next attempt; 4: `bisect`; then 6 for the remaining soft rooms |
| a chain core fits no whole chain | S5 (a) | 2: the longest prefix; the rest by their own cores and S6 |
| a landing door's point beyond `access.snapCm` | S6 (a) | 2: the side's midpoint, the distance reported (`landingDoor`) |
| a stacked wing joined by no core, landing, exit or terrace door | S6 (e) | 1: flagged, `W_TIER_UNREACHED` |
| a building with no storeyed wing | S6 | none: no level at or above the ground, `solidMonument` (information); its basement storeys alone where it has a basement (3.1 step 2), else its heads of `storey` null (3.7.2 (1)), else an empty plan; a room whose storey rule admits no basement storey dropped with no tier (A5 (b); seam S23R2-10) |
| no nave on level 0 over a stair-entered crypt (3.7.4) | 3.7.6 | the largest room of level 0 standing over part of the vault, the flight's bay laid inside that part, landing in the crypt, else in the capped bays' undercroft that 3.7.5's arch joins to it, `cryptStair` noted; then the crypt-stair row above (seam S23R5-01) |
| a crypt that is not stair-entered (3.7.4) | 3.7.6, O2 | the outside door at `basementDoor(b)` directly, or O2's one crypt join from the basement's tree (seams S23R4-03, S23R5-01), `cryptStair` noted `tomb door` or `crypt join`; where the basement itself is unreached, the base's fallback, tier 1, flagged |
| an `external` basement whose `basementDoor(b)` is `null` (no door side; a wall walk-out whose ring sides at the wall are all shorter than two modules or, on a church, hold no door point off its crypt's vault, seam S23R4-03) | 3.7.1 | 2: the base's `trapdoor` fallback (§2.6 step 3), reported as a `core` anchor noted `no basement door`; where not even its bay fits — always so without `ground(b)` — the basement is unreachable, tier 1, flagged (the base's fallback) |
| a hosted access on a solid stack without a basement | 3.7.2 (1) | 2: an outside door at `stackAccessDoor(b, a)`, `W_STACK_ACCESS` (noted `door fallback` where its fallback held; seam S23R3-09) |
| an access or a well handed to a deck building | 3.7.2 (0) | 2: a hatch on level 0, `W_DECK_ACCESS`; the well unheaded |
| a secondary entrance whose ground meets no floor | `Entrance.storey` (3.6) | not derived, `W_ENTRANCE_NO_STOREY` (the base's entrance set is otherwise unchanged) |
| the main entrance's floor far above its ground | O1 (e) | the stoop, uncapped, reported `stoop` above `datum.maxSteps` |
| a stepped temple's soft rooms with no storey below the shrine | A5 (b) | 0: dropped, `shrineOneRoom` |
| a grade face holding an entrance marked `tunnel` | 3.12 (9) | drawn and exported as `yard`, `W_GRADE_FACE_TUNNEL` |

**The no-abort fit ladder** (V3C-16; J-V3.35), run in order until every household has a unit, each step reported in
`PlanReport.fit`: (i) `dropSoft` — every soft room dropped; (ii) `omitHard` — hard non-unit rooms omitted, the last in list
order first (tier 6); (iii) `reduceCirculation` — the storey's circulation reduced to the core's landings and O5's unit
door strips; (iv) `stairDown` — the stair kind stepped down S4's order to the smallest bay that fits; (v) `minimalRooms` —
`room` units cut at the capacity's own `minRoomCm2` with `minWidthCm` relaxed to `minRoomWidthCm`. BCR-V3-12 subtracts
from §2.6's capacity, on every storey above the lowest a core serves, a `ladder` bay and a landing, so step (v) always
fits a shell at capacity; a table edit that would break that re-homes the excess before any plan runs (§2.6's capacity
rule, 2.5's table row). No plan aborts for want of room (T-V3-17). Nothing outside the building is touched; every tier
lands in `PlanReport` (2.3).

### 3.10 Determinism

Streams (§6.1's key layout: the building's lineage and the rung counters, then the creation index), each draw's creation
index stated so a local re-derivation draws exactly what a whole derivation would (V3C-23; J-V3.63):

| stream | draws | creation index |
|---|---|---|
| `plan.program` | A2's fractional counts only | (origin, `rule`, household ordinal or 0) |
| `plan.layout` | the pattern per storey class; each tie between equal-score cut positions | (storey class) for the pattern; (storey level, attempt, the cut's ordinal in the storey's cut order) for a tie; the attempt counter per storey level, cap 3 |
| `plan.roles` | P7's permutation per exchange class | (storey level, the exchange class's index in piece order) |
| `plan.furnish` | F1's fraction, F3's glyph choices | (the room's address), draws in placement order within the room |

Every other choice is a total order stated above (score, then lowest-leftmost lattice point, then list order, then wing
key). All arithmetic is integer on `area2` and lattice points except `slice`'s ratio, computed with `ratio()` (§3.2 (8)),
the spiral's and the well's 16-gons and `rotCdeg`, from `dmath` (§6.5 (2)). A plan is a function of §2.6 step 1's inputs
and the rung counters (J-V3.9); a whole derivation and the same state reached by any local re-derivation of 4.2 on an
unstored plan are byte-identical (T-V3-20). Item 110's rules add no draw: the level reading, storey heights, chain cores,
S6's joins, terraces, exposure, entrance storeys, the tomb door and grade faces are total orders on the shell, so a
`plan.layout` or `plan.roles` re-roll keeps them all.

### 3.11 Re-cuts — the chain steps, the kept-room test and the kept openings

A re-cut (§2.6's canonical chain; a stored plan's re-cut, §7.3) runs 3.1 with `prior`. The seeds and anchors are the
prior's — the core's bay, the stacks, entrances, the passage and composer rooms, the crypt's ring, its columns and stairs,
the choir flights and the heads are unchanged by construction unless their own inputs changed (a head whose access
changed is re-placed by 3.7.2). A5 allocates the new programme and A6's strip is cut first on its storey. The **kept-room
test** runs before any other cut: a prior room is kept (passed as `fixed`, §3.4) when its seed piece is unchanged, its ring
meets no new A6 strip, and its area lies in [min, max] of a role of the new programme on its storey that is still
unassigned — the best fit first (the programme room whose target is nearest, ties by list order; J-V3.24) — a unit room
only where the same household is still housed; the rest is cut as new, its rooms minted by 2.2's rule from the level's
highest id + 1 (S23-14). **On a stack** (V3C-76; BCR-V3-29; J-V3.85) the
prior's rooms of a wing standing on another are compared with the new storeys of the same wing by the wing-relative
storey `s − s₀(w)`, so a `tiers` edit that adds a storey below shifts no room of the tiers above out of its match: the
kept rooms keep their ids, their openings, windows and furniture follow them (2.2), and locks and edited attributes
follow the kept ids. A room whose wing the edit removes (a tier taken off) or whose wing-relative storey no longer exists
is orphaned and reported (§7.4's plan-event row), and the edit's dry run lists it (4.2). A kept room keeps its address, walls, openings on
kept walls and furniture (ids unchanged). **Kept openings** (V3C-39; J-V3.79): every kept opening is re-checked against
O2's forbidden set under the new units and concealment and against the new `maxDoors`; one that fails is removed
(reported), and O2 re-derives the tree with the openings that pass as forced edges. The report counts kept rooms (the
mutation-survival figure of T-V3-9). Each step of the chain is one such derivation with its draws keyed by the step's
target (§6.1).

### 3.12 Buildings below ground

A building whose `ContextVector.arena` is `underground` — a sewer-front dwelling (II.7.3), an undercity building
(II.7.5), a dwelling in a cavern or ruin once an access exists (item 109 (e), (j) (4)) — takes 3.1–3.11 with these
differences, all else unchanged (V3C-62; J-V3.53):
1. **No basement**: 3.7.1, 3.7.4–3.7.7 do not run; a head it hosts (none by volume 4's rules) would be headed on level 0.
2. **No windows and no dormers**: W1–W4 do not run, except on a grade face (9). A room's `lit` stays its role's; its light is a lamp by volume 4's
   underground light rows (V4 §3.9, §4.7's light table in the `underground` arena).
3. **Hearths**: H2's candidates are replaced — first a **face flue** on a grade face (9), else a **flue** on the room's wall nearest the building's frontage,
   carried to the nearest access of role `air` within `hearth.flueReachM` (in plan): a `Chimney` whose `column` is the
   flue's wall point, `levels` its own storey, and `air` that access, drawn as a flue mark (5.1), never a roof stack. With
   no air access in reach the hearth is a **brazier**: `Room.hearth` absent, one `brazier` glyph placed by F3, reported
   (`flue`). No stack ever rises through the ground.
4. **Entrances**: the frontage door opens onto its tunnel run, gallery or undercity walkway — `Entrance.faces` `tunnel`
   (BCR-V3-21), written by volume 4's derivation of the underground building's entrances — except on a grade face (9).
5. **Walls** keep §2.6's kinds; the draw styles an underground building's `exterior` walls by its host (the tunnel's
   masonry, the cavern's rock, item 109 (g)'s ruin masonry), read from the building's part — no new wall kind (5.1).
6. **A ruin chamber's columns** inside the footprint (volume 4's chamber column points, V4 §3.5.0a — `ruinColumns(chamberId)`
   as critique/V04.md C4-64 (5) models them; item 109 (g)'s "column dots in halls") are fixed rings of role `column` that
   the cut avoids.
7. **Storeys** are the building's `Heights` as volume 4 derives them under its host's headroom.
8. The plan's draw and its per-storey VTT scene sit at the underground band's depth (§11.1; volume 4's scene per band).
9. **Grade faces** (item 110 (b) as revised ~23:40; II.7.5, II.7.6; V3C-73; J-V3.86, J-V3.98). A side of the host
   chamber — the chamber of volume 4 whose ring holds the building's footprint on its part — that volume 4 marks open to
   ground part 0 is a **grade face**: an arch vault's open face between two piers of a raised way (critique/V04.md
   C4-110-1's `archVault` chambers), or a bridge approach's or street vault's open arch. The building's wall on it is an
   exterior wall at grade: W1–W3 run on it (windows in the arch's infill, bays by W2 — volume 2's `facadeBays` on that side — along the span, `outsideCm` the
   ground under the span); the frontage entrance on it faces the way or ground under the span (`street`, `lane`, `alley`,
   or `yard` for open ground; never `tunnel` — one written `tunnel` there is drawn and exported as `yard`, reported
   `W_GRADE_FACE_TUNNEL`); a hearth's flue on it is a `Chimney` whose `levels` are its own storey, drawn as a flue mark on
   the face, never a roof stack (the deck is overhead). (1)–(8) hold otherwise, and a chamber with no grade face is planned
   as before. **Pre-decided fallback** until volume 4 records its marks: an `archVault` chamber's grade faces are the two
   sides of its rectangle parallel to its raised way's axis (the arch mouths; its other two sides stand against the
   piers, C4-110-1's geometry); any other chamber has none. The building's storeys stay under the vault's soffit by
   volume 2's clamp (critique/V02.md V2C-67 (2)). Removing a raised way — a user's removal of a generated one holds
   through regeneration (item 110 (b)) — takes its vault chambers and their buildings by the base's least-disruption
   fates; the removal's dry run lists each such building and, where its plan is stored, "its edited floor plan is lost"
   with its named rooms and placed items counted, and undo restores the building with its stored plan byte for byte (4.2).
10. **A ruin's stepped monument** is volume 4's chamber record (`Chamber.monument`, critique/V04.md C4-110-8), laid by
    volume 2's `layTiers` and decayed there — not a building — so it has no plan; an underground building never overlaps
    it (volume 4 treats its tiers as obstacles). V3C-65 (4)'s "these rules unchanged below ground" therefore binds only a
    building below ground that stands on another wing, which the level reading (3.3) already covers.

## 4 Editing

### 4.1 The declarations — item 101's vocabulary, no new tool

Every plan edit is an event of §7.1 emitted by an existing tool (§7.1's *The authoring toolkit*); this volume adds
parameters and attribute paths, never a thirteenth tool (§13.2's elegance bars):

| tool | plan edits it emits |
|---|---|
| T9 `shape` | `setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening` (with `hinge`, `swing`; BCR-V3-24), `setWindow` (with `kind`; BCR-V3-24), `moveStairCore` (with `kind`; BCR-V3-3), `setHearth` (BCR-V3-3), `setRoomUnit`, `instance` on a room's furniture (BCR-V3-4), `setEntrance`, `setAttr` on `basement` (with `basement/crypt/ring`), `declaredRooms` (BCR-V3-15), `plan/rooms/<id>/lit` and `plan/pattern/<level>` |
| T11 `name` | `setAttr` on `plan/rooms/<id>/name` (a room's name; V3C-34) |
| T10 `hold` | `lock` on `plan/rooms/<id>` (a room kept through every re-cut), `regenerate` with `rung` (`plan`, `plan.layout`, `plan.roles`, `plan.furnish`) |
| T6 `place` | `convert` `relet` (the household count, within the capacity) — the count is programme, so it sits with placement (BCR-V3-16) |
| T2 `ground` | `addUndergroundAccess` stays the underground tools' (§7.1; item 66); its effect on the plan is a head re-anchored (3.7.2) |
| T9 `shape` (volume 2's tier controls), T3 `wall` (`retaining`), T4 `road` (`raised`) | no plan event: volume 2's `setMassing { op: 'tiers' }`, a retaining wall's and a raised way's edits are their owners'; their effect on plans is 4.2's re-match, stale mark or fate line |

A clerk emits the same events through the tool API (§11.2), dry-run first, `proposedBy: 'clerk'` (§7.1).

### 4.2 The edits the plan needs, each with its semantics and its bend

The plan events, `setRoomUnit` and `regenerate` with `rung` are §7.1's; their dry runs check §13.2's plan bars on the
overlay (§7.1). This volume fixes what each does to the derived parts of 3.5–3.8. Per item 101's R2, an edit that cannot
be done exactly is **bent** to the nearest lawful form and the bend named in one line; it is refused only against a
dossier fact or a lock (V3C-29; J-V3.54). Local re-derivations draw at 3.10's creation indices, so a plan reached through
them equals the whole derivation's (T-V3-20).
* **`setRoomRole`** — roles only: re-derives the room's door kinds and widths (O3; a changed width re-centred on the same
  midpoint), windows (W1–W3 on its walls), furniture (F1–F4 in that room, ids re-issued from `nextFurniture`), `lit` and
  its label; no ring and no opening position moves. A role whose storey rule or area range the room breaks is kept as
  declared and the report notes the rule.
* **`moveWall`, `splitRoom`, `mergeRooms`** — the storey's rooms on either side re-take O1–O6 for the walls touched, W1–W3
  for the exterior walls touched and F1–F4 for the rooms touched; other rooms' parts keep their ids (2.2). A wall moved
  past a room's `minWidthCm` or into a fixed ring stops at the nearest lawful module position (bend named). A `moveWall` on
  the crypt's boundary is carried out as `setAttr(basement)` on `basement/crypt/ring` (announced).
* **`setOpening`** (with the optional `hinge` and `swing`) **and `setWindow`** (with the optional `kind`) — the named part
  only; a moved door re-takes O3's hinge and swing unless given; F2's clearance is re-checked and furniture now in a
  clearance square moves by F3 within its room (listed in the fates). A door onto a forbidden edge (two units, concealed
  and public) bends to the nearest wall of the same room whose other side is allowed. A door on an exterior wall is
  lawful where the outside is ground within the datum tolerance or a walkable terrace (W2, O1 (d)) — a door set onto a
  roof terrace makes it walkable (3.4a) — and is otherwise bent to the nearest such wall of the same room, named ("no
  door into earth: moved to the street side"); a window set below its outside ground bends up to the lowest bay whose
  sill clears it, else to the nearest wall that has one, named.
* **`moveStairCore`** (with the optional `kind`) — the bay on every storey it serves; each such storey re-partitioned
  around it (3.11). A kind whose bay does not fit at the requested position takes the nearest kind in S4's order that fits
  there; a position that fits no kind takes S2's nearest candidate; each bend named.
* **`setHearth`** (BCR-V3-3) `{ building, storey, room, op: 'add'|'move'|'remove', wall?, at? }` — the stack re-placed by
  H2–H3 constrained to the named wall and position, rising through the storeys above as H2 states; a wall that cannot take
  a stack bends to the nearest wall of the room that can, in H2's order; every storey the stack crosses is re-cut around it
  (3.11); removing the last hearth on a stack removes the `Chimney` and its roof stack (§8.6).
* **`instance` on a room** (BCR-V3-4) — `entity` a room id, `ordinal` a furniture ordinal (its decimal string): `add` (a
  glyph at a point, ordinal `Room.nextFurniture`), `move` (to a point, snapped to 10 cm), `remove`, `restyle`
  (`style.glyph`, `style.rotCdeg`, `style.wCm`, `style.dCm` — sizes clamped into the row's range, named). An add or move
  onto a spot F2 forbids snaps to the nearest free slot of F3's scan in the same room (named); where the room has no free
  slot, the item **bends** to the nearest room of the building that has one — on the same storey by centroid distance,
  else on the nearest storey (ties lower), ties by room id — placed there by F3's scan and named ("no room for a bed in
  the pantry: placed in the chamber"; S23-26; J-V3.105); a moved item that bends into another room takes that room's
  `nextFurniture` as its ordinal (a new id, the fates listing the old). Where no room of the building has a free slot, the
  item is kept where the author put it and reported as crowding its room. Nothing is refused. The item is marked `edited`.
* **`setAttr declaredRooms`** (BCR-V3-15) — the declared rooms become A2 (7)'s hard rooms; an unstored plan is marked
  stale, a stored one re-cut inside the event. A room that fits not on its declared storey bends to the nearest storey
  that holds it (ties lower); one that fits nowhere first displaces soft rooms and then other hard non-unit rooms (the fit
  ladder's (i)–(ii)), named; only where every household's unit leaves no room is it refused, naming that cause (the
  households are the dossier's population, item 20 (h)).
* **`setAttr plan/rooms/<id>/name`** (T11) — the room's name; the label shows it, the role unchanged; stores the plan.
* **`setAttr plan/rooms/<id>/lit`** — the room's light on or off (an edited attribute, §7.2; Dwellings' per-room toggle);
  stores the plan.
* **`setAttr plan/pattern/<level>`** — re-cuts that storey by 3.11 with the named `LayoutPattern` for every piece that holds
  its requirement (the others by 3.5's rule, named); stores the plan.
* **`setAttr(basement)`** (V3C-63; J-V3.70), including `basement/crypt/ring` — the basement storeys re-cut (3.11); the crypt
  re-derived by 3.7.4 unless its ring is the path set; the building's hosted accesses **re-read after the underground
  rules re-run for this building** — II.7.3's gate and draw, volume 4's per-building crypt-join and dig-from-above draws
  (V4 §3.5.7 (c), (d)), each keyed per building so the same uniform decides at the new floor, owned by volume 4 — and the
  heads re-anchored for whatever records result. The dry run's preview names, one line each, every access gained, lost or
  re-hosted and, where a lost one was a void's last access, the dwellings item 109 (j) (4) would empty (from volume 4's
  excavation reading, V4 §3.5.7 (g): "removing this cellar seals the only way into the ruin: 4 households leave"). An edit
  that removes an `always` building's crypt, or shrinks the principal crypt below another, is **kept** as the author's
  attribute (item 101: everything is editable; J-V3.47) and announced ("by the rules the cathedral always has the
  settlement's largest crypt; this edit removes it"), and reported in `PlanReport.anchors` (`kind: 'crypt'`, with a note);
  a change of the principal's area re-runs the rank for every other crypt (3.7.4 (3)), named in the preview.
  **On a building without a basement**, `setAttr(basement)` on `basement/crypt/ring` (V3C-75; J-V3.87) makes a
  crypt-only basement by the no-refusal crypt ladder (full, then half, then raised; 3.7.4) — the ground wings' whole
  inset instead where the ring would not be stair-entered (3.7.4; seam S23R5-01) — as a dossier crypt record
  does: the building is `always` for that derivation, `Basement.crypt.edited` is set, and the ring is the given ring
  clipped to 3.7.4 step 1's region and snapped to the lattice; its access is the crypt stairs where the ring is
  stair-entered, the programme row's with O2's crypt join where `ground(b)` exists but it is not, or the tomb door where
  `ground(b)` is absent. On a `never` class it is kept and announced ("by the rules this building has no crypt; kept as
  yours"; J-V3.47's form); the terrain gate never refuses it, the raised form being always lawful. Volume 9's
  `drawChamber` bend inside a church-class footprint emits exactly this event (§13's hand-off). **On a deck building**
  (`onDeck(b)`, 3.7.2 (0); V3C-72 (2); S23-17) every basement form fails at once and the request **bends** (item 101 R2)
  to the same request on the nearest building on the ground of its plot group, else of its block, else the nearest
  building on the ground, named `bend.deck.basement` (BCR-V2-34 as file f item 305 words it; volume 2 registers the id
  for volumes 9 and 10): "A deck over water holds no cellar: the cellar goes to <building> on the quay." The dry run
  previews that building's basement and its consequences as for any `setAttr(basement)`; a deck is a fact of the map,
  neither a dossier fact nor a lock, so nothing is refused (J-V3.54).
* **Volume 2's `tiers` op and the stepped mutations** (T9's tier controls; V3C-76; J-V3.85) are volume 2's events; on
  the plan they re-cut a stored plan by 3.11's wing-relative re-match (an unstored one goes stale). The op's dry run lists,
  from this volume, every named, locked or furnished room and every edited opening of a tier the edit removes (or of a
  wing-relative storey it takes away), each as "orphaned: <room name or role>, tier k"; each undo restores the plan byte
  for byte.
* **A `RetainingWall` drawn, moved or removed** (T3 `wall` `retaining`, T2 `ground`; V3C-71) — the base's edit; each
  building whose outside digest it moves (BCR-V3-28) has its unstored plan marked stale and its stored plan re-cut inside
  the event (W2's gates re-run, the walk-out re-decided), both listed in the edit's fates; undo restores them byte for
  byte.
* **Removing a raised way** (item 110 (b); V3C-73 (3)) — the base's edit (a removal of a generated way holds through
  regeneration); among its fates, each building in its vaults and, for a stored plan, "its edited floor plan is lost"
  with its named rooms and placed items counted (3.12 (9)); volumes 9 and 10 read the fates; undo restores them.

The first of the plan edits above on a building stores its composition with its plan (§2.6), under J-P48 (1) in the same
batch; `setAttr declaredRooms` and `setAttr(basement)` are building attributes and store the plan only when it is already
stored, and the last three bullets are their owners' edits, which store nothing here.

### 4.3 Locality, stored plans, carries, New random and undo

**Locality.** Every plan edit's effective scope is its building (§7.3 item 1), plus, for the storing edit, the faces
J-P48 (1)'s split vertices touch (§2.6); nothing outside the building is re-derived (T28-7) — **except** the underground
consequences of `setAttr(basement)`, which are the underground layer's (volume 4) and are named in the preview, and the
rank of the other crypts when the principal's area changes (their plans marked stale, stored ones re-cut in the same
event). Conversely, three edits outside a building reach its plan, each by its owner's scope: a `RetainingWall`'s
(through the outside digest, BCR-V3-28), a raised way's removal (through its vaults' fates) and a deck's ruin or removal
(item 110 (d): the buildings fall with it, 5.1).

**Stored plans.** An edited room, a locked room (`plan/rooms/<id>`), an edited opening, window, hearth, stair core,
furniture item or crypt ring is a fixed input of every later re-cut of that plan (§7.2): a stored plan whose inputs change
is re-cut inside the changing event around them (§7.3's table), by 3.11 with the edited parts passed as fixed rings and
fixed openings; an edited part that no longer fits the new shell (its wing's clipped seed changed) is orphaned and
reported (§7.4's plan-event row).

**Carries** (V3C-24; J-V3.64). BCR-V3-2 adds each `Storey.furniture[].at` to the points `carryWings` carries with a stored
plan (§2.6's `CarriedShapes.composition`, J-P48). After each carry, each carried item is checked — its footprint inside
its room's carried ring, off every clearance square, stair bay, head and apron; one that fails is re-snapped by F3's slot
scan within its room with no draw (a fate, reported), else orphaned (§7.3 item 4). An opening whose `at + widthCm ÷ 2 +
jambCm` exceeds its carried wall's length is clamped to the wall's end and reported.

**New random on an edited plan** (V3C-25; J-V3.65). `regenerate` with `rung`: `plan.furnish` — every furniture item not
`edited` is re-placed by F1–F4 on the advanced counter, edited items fixed; `plan.roles` — P7 over the exchange classes,
edited and locked rooms excluded; `plan.layout` — the stored plan re-cut by 3.11 around its edited and locked parts with
the advanced counter; `plan` — all three. Each is compared by §5.1 (6) on the stored subtree and reported when nothing
changed (never a silent no-op).

**Undo.** Each event's undo record is the former storeys it touched (§7.4): `setHearth`'s every storey its stack crosses,
`moveStairCore`'s every storey the core serves, `setAttr(basement)`'s basement, crypt, hosted accesses and plan in one
step, `setAttr declaredRooms`' former value and plan. **Lifecycle rows** for `setHearth`, `instance` on a room and the
plan attribute paths: §7.4's plan-event row (BCR-V3-4, BCR-V3-16 add them by name); for `declaredRooms` and `basement`:
§7.4's `setAttr` row with the consequences above.

### 4.4 What is not an edit

Clicking a building, switching storeys, opening the plan panel, turning room numbers on (the `roomNumbers` view key) and
a clerk's plan or why query log nothing (§4.1, item 28 (c), §2.9's view state). A room's light is the edited attribute
of 4.2; `placeLight` (§7.1, item 68) adds lights of its own and never changes a room's `lit`.

### 4.5 The click, the storey switcher and the plan panel — the viewer's experience

* **States (§2.8)** read on the building: `absent` — the wings draw, the panel offers "Show plan"; `current` — the plan
  draws; `stale` — the cached plan draws under §8.5's marker, the panel says what changed (the input group whose digest
  moved: households, band, use, wings, an access, the crypt, the Works stage or a table), and the next building click (4.5's
  bands), double-click or view re-derives it from its canonical prior (§4.1); `edited` — the stored plan draws, a pencil mark beside the marker slot.
* **Click and double-click** (§14's input scheme; V3C-30; J-V3.55; S23-18, S23-34; J-V3.108). **From the neighbourhood
  band down**, a click selects the building, opens the plan panel and, under `elaborate: 'click'`, derives `wings`, then
  `rooms` (V02 §3.8), then `plan` into the cache, each where absent or stale, **without moving the view**. **At the city
  and district bands** a click on a building is the district's click (V01 V1-3.8.1: its close-up and its buildings'
  `wings` rung), which also selects the building and opens its panel without deriving `rooms` or `plan` (the panel offers
  "Show plan"). A double-click — or the panel's "Show plan" — at any band derives `wings`, `rooms` and `plan` as above and
  zooms to the building band at the **frame stop**: the coarsest stop at which the building's
  longest side fills `view.frameShare` (0.6) of the view, clamped to `view.frameStops` [1:125, 1:350] (5.1), and sets
  `storey` to the main entrance's storey (on a solid stack, the root landing door's, S6; with no storeyed wing, storey −1
  where it has a basement). The plan arrives from the derivation pool as a `DisplayDelta` (§8.6); until then the wings
  draw with a small progress tick on the building (no spinner over the map). A stale building whose re-cut chain is long
  derives its steps in the pool during idle frames once it goes stale (the chain row of section 6; V3C-53), so a click
  mostly finds it current.
* **The storey switcher** (V3C-55; V3C-65 (3), V3C-66 (5)): a vertical radio group beside the building, accessible name
  "Storey", one option per storeyed level (−k … n) and per walkable roof level (3.4a), named "Storey n of m — cellar /
  ground / first …" — "ground" only for level 0 where `ground(b)` exists — and on a stack by wing role and ordinal ("Tier
  2, storey 1", "Shrine", "Roof terrace"); a building with no storeyed wing lists only its basement storeys, and with no
  basement has no switcher (seam S23R2-10). The current one is checked; the map region's live
  description gains "storey n of m"; `keymap.json` rows `plan.storeyUp` (PageUp) and `plan.storeyDown` (PageDown), editable
  and versioned (§14); the view key `storey` (§2.9) holds it per viewer.
* **The plan panel** (the context panel's building tab, accessible name "Floor plan"): rooms by storey with their name or
  role, number (when `roomNumbers` is on), unit (the household's name for a viewer admitted to it) and area in m²; what the
  plan owed — `PlanReport.owed` with each row's `delivered` in plain words ("folded into the hall", "no room for it:
  dropped") — and the units with their forms ("asked for lodgings, built as single rooms"); **the ways down** (V3C-64;
  J-V3.71): per storey — a head of `storey` null under "at the foot" — each head's kind, state, what it reaches (the element's system and, through volume 4's connection
  graph, the systems beyond it, item 109 (j) (3b)) and its cause in plain words ("dug when the house was built", "the
  neighbourhood's way down", "the catacomb's stair", "a door from the crypt into the catacomb", "added by an edit"), each
  withheld for a key its `knownTo` does not admit; the crypt, where the building has one ("the cathedral's crypt, the
  largest in the town"; "raised over wet ground"; "entered by a door at the platform's foot"); **item 110's lines** —
  "a solid monument: no rooms above the ground" (`solidMonument`; its crypt under the crypt line), "tier 3 cannot be reached: no stair arrives there" (`W_TIER_UNREACHED`),
  "stands on the bridge: no cellar and no well" (a deck), "fell with the bridge" (or pier, mole, quay) for a building whose
  deck is ruined or removed, "backs onto the terrace wall: no windows on that side" (the exposure gate), "a cellar that
  opens onto the street below" (a walk-out at a wall), "built into an arch of the viaduct" (a grade face). **Room numbers** (V3C-34; J-V3.59): the per-viewer view key `roomNumbers:
  'off'|'storey'|'building'` numbers rooms in reading order (storey, then room index; per storey or through the
  building), with a key table in the panel. Every edit tool of 4.1 acts from the panel or on the canvas.
* **`elaborate: 'view'`** (V3C-32; J-V3.57) derives (each plan through `wings`, then `rooms`, then `plan`, as a click does;
  S23-34) and draws plans only at stops of `view.planStop` (1:350) or finer, and
  for at most `view.planCap` (64) buildings per view, centre-out, within §6's per-frame budget; the rest draw their wings.

### 4.6 The clerk's view — plan queries and "why?"

**Queries** (BCR-V3-5): `{ kind: 'plan'; building: Id; storey?: number }` returns the plan's storeys as §11.1's JSON `plan`
block, derived first — `wings`, then `rooms`, then `plan`, each where absent or stale, as a click does (S23-34; the
pool, no event, the cache only); `{ kind:
'planReport'; building: Id }` returns `PlanReport` (a stored plan's recomputed, 2.3). Both filter by the caller's
knowledge key (§9.2) by 5.4's merge: a concealed room, door, head or its furniture is withheld for a key that does not
admit its use, the room merged into its public neighbour and the areas re-summed, so the answer never shows a void. A
clerk changes a plan only through 4.1's events via `preview` then `edit`.

**"Why?"** (V3C-35; J-V3.60). This volume registers a `WhyProvider` (BCR-V10-3's interface) for kind `room`, resolving a
`room:` address through its building's plan — stored, else the cache, else a derivation into the cache as the `plan`
query does (BCR-V3-22 lets volume 10's registry resolve plan addresses by prefix). Its answer: `facts` — role, name, scope,
household, area, storey, tier, and `accesses: { id, kind, reaches, cause }[]` for the heads it holds; `cause` — the
`ProgramRoom`'s origin and rule (the class, use, specialisation, half or slot row; the ladder row and band; a declared
room; a crypt from volume 11's column and the basement form; an edit), the pattern and the step that cut it, and each
head's cause, and for each of its doors and missing windows item 110's causes (V3C-66, -67, -70, -72, -73; critique
§12.6): `landingDoor` (the flight that arrives there), `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut` (the rule of `basementDoor(b)` that placed the door: the retaining wall's id and its step, or the fall; on a church, that its door point was moved off the crypt's vault, seam S23R4-03), `tombDoor` (no storeyed ground wing), `gradeFace` (the raised way or bridge and its
vault), `deckNoCellar` (the deck: why a deck building has no cellar; S23-17), `stoop` (over an `external` basement, the main entrance kept on the ground storey, 3.6; seam S23R4-01), `exposure` (the outside ground above a sill or floor), `stackCarried` (the
tier a chimney rises through); `facts` gain `elevationCm` and the room's tier (wing role and ordinal); `rest` — its
`PlanReport.owed` row and the unit's asked and built form. The building's path `plan` ("why
these units?", "why is there no kitchen?", "why no crypt?", "why are there no rooms?", "why can't I reach the top
tier?") answers from the ladder row at the occupants' band, `Building.households`, A1's `programmeSource`, the owed rows,
`Basement.crypt`'s derivation (the column value, the ladder's form, the rank trim) and `PlanReport.warnings`. Both are knowledge-filtered by volume 10's oracle rules and 5.4.

## 5 Rendering, labels, exports

### 5.1 The plan at the building band

**Stops (BCR-V3-6).** The pyramid gains eight stops past 1:500 at the same 2^¼ step, to ≈ 1:125, drawn only at the
building band and only over buildings whose plan draws; every other mark there is the building band's (§8.5). The
building band's threshold is the stop nearest 1:700 (entered there, left one stop coarser, §8.5's hysteresis; J-V3.20).
At 1:125 one CSS pixel is ≈ 3.3 cm, so an 80 cm door is ≈ 24 px and a 5 px room label fits a 1.5 m room.

**The detail ladder inside the band** (V3C-31; J-V3.56), by the `PlanGeometryRow.view` stops: from the threshold to
coarser than 1:350 — walls by kind, openings as gaps, the heads as solid symbols, room labels and lights only (under
`elaborate: 'view'` no plan draws there at all, 4.5); from `leavesStop` (1:350) — door leaves and swings, windows, hearths,
the stair and flight outlines, the wall shade and the porch; from `treadsStop` (1:250) — treads, furniture, slits, crypt
columns and ledger slabs. The frame stop of a double-click (4.5) is never coarser than 1:350.

**Marks and order** (§8.1's mark tables; one `DisplayDelta` per building and storey; bottom to top): the other storeys'
wing outlines faded (§8.5); the **porch** outline under the plan at the main entrance — volume 2's `Porch` and its kind
(a rectangle, or the half-disc of a `halfRound`), V3C-58; the storey's floor (`ground` in `ink`, the lit roof tone in `lit`,
§8.2); **the storey's roof terraces** (3.4a; V3C-67 (5)) — a walkable `T(x)` as floor in the roof tone with its parapet as
a thin double line along the parapeted edge and its doors, a roof `T(x)` hatched as roof under the faded outlines, never
furnished; **the exterior flights** of `stairChain` whose head lands on the storey (V3C-66 (4)) — treads by volume 2's
`stairTreads(w)` (its `n − 1` lines at its `goingCm`; V2 §2.6; S23R1-03) and an arrow up, outside the walls, and on a solid stack's storey the flight drawn only as far as the solid wing it
climbs; a terrace exit's stair house as a stair room; the main entrance's **stoop** (O1 (e)) as treads outside the door;
the **wall shade** — the paint program `planWallShade` (BCR-V3-6; our own, J-V3.69): a soft band of the floor's
shade inside every wall, broken at openings, fading inward over 40 cm; furniture (glyph shapes from `FurnitureRow`, at
ink α 0.5 in `ink`, their fills in the `furniture` role in `lit`), `ledger` slabs as flush outlines; stair flights (derived,
2.1: treads as hairlines at `goingCm`, the landing, an arrow from the lower storey's first step up; a spiral as radial
treads; a ladder as two rails and rungs; a trapdoor as a square with a diagonal) — the flights drawn on the lower storey,
the arrival landing on the upper; crypt stairs with their arrow pointing down from the nave, choir flights with theirs up
to the chancel; **the heads** (V3C-60 (7)): a stair or cellar stair going down as its flight with the arrow pointing down
from the head, a shaft as a square with ladder rails and a down chevron, a well as a double ring with a windlass line, a
hatch as a square with a diagonal, an access door as a door with a down tick; a head of `storey` null (3.7.2 (1)) as that
door, `door.entranceCm` wide, with its down tick at `door.at` (`stackAccessDoor(b, a)`'s point; seam S23R3-09) on the footprint's outline, on every storey view and, where the plan has no storey, on
the building's outline view — its wings as drawn without a plan (§8.5) — so volume 1's one mark of a building-hosted
access (V1-3.8.8) exists on a solid stack too (seam S23R2-10); a head read `locked` (3.7.2 (7)) with a lock tick,
`bricked` as wall with a bricking hatch, `collapsed` its opening as a trace with rubble stipple (§8.2's access row, as
volume 1's V1-3.8.8 draws the surface symbol); the crypt's columns as filled squares in ink; hearths (a filled
rectangle of the stack in the roof tone with an ink rim, the hearth mouth an open side toward the room), an underground
hearth's **flue** as a short hatched line to its wall with an arrow toward its air shaft (a grade face's flue as the same
mark with its arrow outward through the infill, 3.12 (9)), a brazier as its glyph; a `cistern` room's floor in §8.2's
water role, and the **inlet mark** where an aqueduct-class raised way ends within `access.snapCm` of the building — a
short double line through the cistern's wall nearest the way's end vertex (derived, no record; with no cistern wall in
reach it is reported `inlet`, V3C-77); walls
by kind (exterior at the outline weight, party the same with the party hatch of §8.2 at the building band, partition at
½, court as exterior; an underground building's exterior walls styled by its host — the tunnel's masonry as ink, a
cavern's rock in §8.2's rock-edge role, a ruin's masonry as broken ink, 3.12 (5)); openings as gaps with the door leaf (a
hairline from the hinge at the door's width and a quarter-circle swing arc in `ink`; an arch as two jamb ticks and a
dashed lintel; an open doorway as a gap; a door with `steps` its short flight inside the lower room); entrances with
§8.2's entrance ticks and an inward arrow on the main one; windows as wall breaks with a thin double line, a `light` as a
single thin line, a slit as a single tick; room labels, numbers and lights (§8.5, with the cap range of §9.4); the change
marker (`live.stale`, §8.5). Concealed parts follow 5.4. `hatched` draws the plan as `ink`'s (§8.2's table). Colour roles
only, plus the one program `planWallShade`.

**Labels** (V3C-54). A room's label is its `name` where set, else its role's display text from the setting pack (§10.4),
in §9.4's room-label range (5–9 px); a unit room adds the household's name in a second line when the viewer's knowledge
admits it, in the same range (never below 5 px) and dropped when it does not fit; with `roomNumbers` on, the room's number
is a numeral at the label's head in the same range. Nothing else is labelled inside a plan; a structural face never is.

**The plan in progress and in ruin** (item 67): walls without doors, windows or furniture up to the storey `heightsAt`
has raised; a `decayed` or `ruined` building's fallen walls as broken ink runs over rubble stipple and open rooms without
labels — both drawings of the same plan (§2.6 step 7, §8.6), the crypt's ring included (a ruined church keeps its crypt).
**A deck's fall** (item 110 (d); V3C-72 (3)): a deck building that the base ruins with its deck draws its ruined plan
where the deck stands in ruin (its piers or arches left) and nothing where the deck is removed; the panel says "fell
with the bridge" (or pier, mole, quay).

**Below ground**, the plan draws at the underground band's depth in the underground view (3.12 (8); volume 4 §5.1).

### 5.2 Picture exports

**SVG** at the building band: one file per storey on request, or the **all-storeys sheet** (V3C-52): the storeys side by
side in level order on one sheet, each captioned "Storey n", one scale bar. Groups `layer.plan.floor`, `plan.shade`,
`plan.furniture`, `plan.stairs`, `plan.heads`, `plan.hearths`, `plan.walls`, `plan.openings`, `plan.windows`,
`plan.labels`, `plan.lights` and, with numbering on, `plan.key` (the key table: number, name or role, area), with the
`<metadata>` map to room, wall, opening, head and furniture ids (§11.1's convention). **PNG** by §8.8's tiles at the
building-band stops, the sheet likewise.

### 5.3 Interchange and scene exports

* **JSON `plan` block** (§11.1): as the base lists, plus each room's `name`, `number` (when the export's numbering option
  is on) and `elevationCm` (its wing's `floorCm`); each storey's `furniture` (id, glyph, centre, size, `rotCdeg`); each
  opening's `hinge`, `swing`, `point` and `steps`; each window's `kind`; each stair core's `kind` and derived flights (tread
  lines as cm polylines, for importers without our rules), the crypt stairs and choir flights among them; each hearth and
  flue, with each chimney's `levels`; each entrance's `storey`; `terraces: { wing, storey, ring, floorCm, parapetCm,
  walkable }[]` (3.4a); the exterior flights of `stairChain` per storey of their head (tread lines as cm polylines, by `stairTreads`);
  `inlet: PointCm` where one is drawn; `accesses: { id, kind, state, storey /* null for 3.7.2 (1)'s outside door */, room? /* absent then */,
  door? /* { wing, side, at }, present then */, head: Polygon | PointCm, reaches: { element: Id; system: string }[],
  cause }[]` (V3C-60 (7), V3C-64; `state` as 3.7.2 (7) reads it, `collapsed` included; a head of `storey` null lies on no
  storey, so no `.dd2vtt` or Foundry scene carries it, seam S23R2-10); `crypt: { ring, principal: boolean }` where the building has one; and the plan's
  `report` (2.3). Knowledge-filtered by 5.4 for picture-class keys as §11.1 states.
* **`.dd2vtt` per storey** (§11.1's profile; V3C-51): the image drawn at the scale the scene's `pixels_per_grid` implies
  (100 px per 1.5 m square ≈ 1:57), the 1:125 stop's mark widths scaled with it, without the grid; `line_of_sight` from
  every wall minus its openings and minus its windows (sight passes a window) and from every column; `portals` one per
  door, arch and entrance at the plan opening's width (BCR-V3-18) — `bounds` the opening's two ends, `rotation` the wall's,
  `closed: true` for a door and `false` for an arch or open doorway — the stair cores (crypt stairs included) named portals
  on each storey they link, a head that is a door in a wall line a portal; every other head a `plat` extension object naming
  its access id and the underground band's scene (as volume 4's scene carries the same id, V4 §5.5); a head read `bricked` or `collapsed`
  (3.7.2 (7)) no portal; `lights` per lit room (§11.1); the scene's elevation the main entrance wing's `floorCm`. Furniture stays in the
  image (`objects_line_of_sight` empty, §11.1). **Item 110** (V3C-66 (4), V3C-67 (6)): a walkable terrace is floor in the
  scene image with its parapet drawn in it and left out of `line_of_sight` (a parapet does not block sight; the format
  has no movement-only wall, so Foundry's export carries the block); each landing door, terrace door and seating exit is a portal; each flight's head
  is a named portal on the storey it lands on, its foot linked to the scene of the storey or ground below it (a `plat`
  extension object naming both scenes); a roof level is a scene only where a flight or a terrace exit reaches it; the
  scene's elevation is the root entrance's storey floor (the main entrance's, else S6's root landing door's, else — with
  no storeyed wing — storey −1's, entered at `basementDoor(b)`; seam S23R2-10).
* **Foundry scene JSON per storey**: walls `c: [x0, y0, x1, y1]` for every wall segment between openings, movement and
  sight blocked; a window's span a wall that blocks movement and passes sight and light (the window type); doors as door
  walls (`door: 1`, closed; a head read `locked` has its door locked, one read `bricked` or `collapsed` is plain wall); arches and open doorways as gaps; the stair cores and each head
  as notes linking the storeys' scenes, a head's note naming the underground band's scene; a terrace's parapet a wall of
  the window type (movement blocked, sight and light passing) and each exterior flight a note linking the scene of its
  head to the one of its foot; journal entries one per room,
  titled "n. name" when numbered (else the name or role), with role, area, the household where admitted and the ways down
  it holds.
* **CityJSON (BCR-V3-7; J-V3.68)**: a building whose plan rung is not `absent` gains `BuildingStorey` children (one per
  storeyed level, its level and elevation — the least `floorCm` among its wings, so a tier's storeys stand at their true
  heights; terraces add nothing, roof surfaces being §11.1's), `BuildingUnit` children (one per household unit, attribute `plat:form`, its rooms as
  its children where admitted) and `BuildingRoom` children (one per room: an LoD1 solid of its ring from its `floorCm` to
  the next storey's floor at its wing, attributes `role`, `scope`, `name`, `plat:unit` where admitted, `plat:tier`); the
  crypt a `BuildingRoom` of its storey; furniture is not written (the plan's glyphs are abstract).
* **glTF (BCR-V3-7)**: an export option `interiors` (default off, so the default file and its budget are unchanged): per
  storey the walls extruded from each room's `floorCm` to its ceiling, doors and arches as gaps `door.heightCm` high,
  windows as gaps from `window.sillCm` to `min(window.headCm, the storey's height − 30 cm)`, floors as planes, interior stairs
  (the crypt stairs and choir flights among them) as stepped prisms at the plan's `goingCm`, the exterior flights as
  volume 2 exports them (V2 §5.6, by `stairTreads`; S23R1-03), columns as prisms; nodes named by room, wall and head ids.

### 5.4 Concealment at a public key

(V3C-27; J-V3.52.) For a knowledge key that does not admit a concealed use (item 63 (a), (c); §9.2), each of its concealed
rooms — and a secret head's room (3.7.3) — is drawn, exported and answered **as part of its non-concealed neighbour**
sharing its longest wall (ties by room index): the walls between them omitted, the neighbour's label kept, its area in the
clerk's answer re-summed to include it; a cluster of adjacent concealed rooms merges whole into the non-concealed
neighbour sharing the cluster's longest boundary; a concealed opening is drawn and exported as wall; the concealed head,
its furniture and its ways down are absent. VTT `line_of_sight`, Foundry walls, CityJSON rooms and glTF walls follow the
same merge, so at a public key every storey's rooms tile its extents with no enclosed room lacking an opening (T-V3-12,
T-V3-14). For an admitting key everything draws as derived.

## 6 Performance budgets

On §12.1's reference hardware, in the derivation pool; the rung's whole budget is §12.7's (5 ms median, 20 ms p95 per
plan; × steps for a chain), which this split must sum inside. PLAUSIBLE until the P0 spike measures it (§8).

| work | budget (median / p95) | law and basis |
|---|---|---|
| A programme, resolution and allocation (incl. A6 and the fit ladder) | 0.2 / 0.6 ms | O(rooms × storeys); ≤ 60 rooms; the fit ladder at most five more A5 passes |
| anchors (S1–S5, H1–H4, E1–E2), heads, the crypt's columns and stairs | 0.6 / 2.2 ms | O(candidates) on the module; ≤ 400 candidates per wing, exact containment per candidate; heads ≤ 4 per building |
| per storey: seed clip, arena open, the A6 strip, cuts, read-back | 0.8 / 3 ms | O(pieces + cuts × log cells): `slice`'s bisection (≈ 10 probes per cut, each an `area2` of a boolean on ≤ 40 vertices), the linear-scan fallback bounded by the work limit — never cell enumeration |
| openings O1–O6, W1–W4 | 0.3 / 1 ms | O(walls) per storey |
| furnishing F1–F4 | 0.4 / 1.5 ms | O(items × slots) per room; ≤ 40 items per storey |
| a typical 2-storey house, with basement | 3 / 10 ms | the rows above at 3 storeys — inside §12.7's 5 / 20 |
| a 4-storey tenement of 12 units | 5 / 18 ms | the class the P0 spike must measure first |
| a cathedral with crypt, choir flights and 6 chapels | 4 / 15 ms | 3 storeys (crypt, ground, tower), ≤ 80 columns |
| the crypt rank pass (S11's closing pass, per settlement) | ≤ 1 ms | ≤ 60 crypts at METROPOLIS: one sort and one trim each |
| item 110's per-storey reads — outside ground and exposure, entrance storeys, terraces (V3C-80) | 0.1 / 0.3 ms per storey | O(exterior walls) `levelledGroundCm` or surface samples; one kernel difference per flat roof |
| S11's eager additions (§8's PE): `Entrance.storey` per entrance, `basementDoor(b)` per `external` basement; `stackAccessDoor(b, a)` per stack-hosted access, on call (seam S23R3-09) | ≤ 0.05 ms per building | O(entrances × levels + ring sides × retaining walls within `2 × cellar.insetCm`) `levelledGroundCm` samples and `stepProfile` reads, inside S11's stage budget (§12); `stackAccessDoor` O(ground wings' ring sides × outline sides), no sample; from M6-U a church's door points add O(ring sides × vault sides) span clips on its crypt's vault (3.7.4 steps 1–2 recomputed, no draw; seam S23R4-03); measured at M3a on B-CITY-lite, the crypt clause at M6-U |
| a stepped temple (solid tiers, a one-room shrine; V3C-80) | 1 / 4 ms | one storeyed level; no piece for a solid wing |
| a tiered tower of five one-storey tiers (one spiral chain core) | 4 / 14 ms | five storeys of one piece each, the chain core's containment over five extents |
| a terraced palace of four tiers × two storeys (≤ 60 rooms) | 13 / 45 ms | eight storeys at the per-storey rows, plus S5–S6 and the terraces; derived storey by storey in the pool during idle frames, as the chain row is, with the progress tick until the last storey lands; stepped buildings are at most 0.1 % of buildings (volume 2's X17 cap), so §12.7's median and p95 per plan are unmoved |
| the longest re-cut chain (V3C-53): a capacity-30 shell from `rich` with one household to `squalid` at capacity, ≈ 34 steps | 170 / 680 ms | derived step by step in the pool during idle frames once the building goes stale; a click before the last step shows the progress tick until it lands |
| the plan draw per storey (vector, tile worker) | 1.5 ms | ≤ 300 marks per storey |
| a storey's VTT scene (image excluded) | ≤ 20 ms | walls ≤ 200 segments |
| `elaborate: 'view'` at a METROPOLIS core at 1:350 (V3C-32) | ≤ 64 plans derived, ≤ 8 per 16 ms pool frame, drawn within §12.5's frame budget | `view.planCap`, centre-out; measured at P4 on the B-CITY METROPOLIS seeds |
| the cache (§12.8) | ≤ 4 KB per storey, furniture included; ≤ 64 × 3 × 4 KB ≈ 0.8 MB for a capped view | 40 items × 16 B + rooms, walls, openings as §12.8 states |

**Fallbacks, pre-decided:** a class over its row → the module doubles (§12.7's fallback) for that class; a storey over
its `workLimit` → F-PLAN tier 3 then 4 (3.9); furnishing over 1.5 ms p95 at P0 → F3's slot scan steps at 2 × module; the
view mode over its frame share → it derives the three buildings nearest the view's centre per frame, and a METROPOLIS view
over §12.5's budget halves `view.planCap`; a chain step over 20 ms p95 → the steps' memoised chunks (§2.9) are kept for
the session; where P0 measures a stacked building above 20 ms p95 per pair of storeys, the module doubles for the
stacked wings above tier 0 (§12.7's fallback, per class; V3C-80). A run-time miss is reported, never answered by a coarser plan (§12.7).

## 7 Tests and acceptance bars

The base's T28-1 – T28-19 (§13.2) — T28-1 and T28-2 as BCR-V3-14 words them — and the plan soft bands (§13.7, the
item-28 row's fallback as BCR-V3-33 words it) stand; this volume's bars add to them, all on B-PLAN's
fixtures (§13.2) and, from P1, on every building of B-CITY-lite clicked by script. Hard unless marked soft. **B-PLAN
gains** (each a named fixture): a three-slot inn compound; a smithy with a separate dwelling; a split brewer pair and a
split butcher pair; a bent quad with a party-wall stack; a cruciform church with and without a crypt; a rectangular church
with a crypt (the chancel strip); a cathedral on `flood` ground (the raised crypt), on `low` ground (the half crypt) and on
a sky island (the rim-slab vault); a rich shell with one household; a `squalid` tenement at capacity; a vacant house; a
closed-family inn with its gate hall and the hall's court door; a stepped row on a slope and a two-wing house with wings of
different storey heights; a front whose concealed use's service rooms lie on another storey; a building with a secret
item-64 access; the access fixtures of T-V3-22; a sewer-front dwelling and a ruin dwelling (T-V3-24). **Item 110's
fixtures** (the second round): a stepped temple of the `great_temple` class (solid tiers, axial stair, a one-storey
shrine, its `always` crypt) on dry and on `flood` ground, and one laid with `top` `flat` — no shrine, its crypt planned
alone (seam S23R2-10); the same with a storeyed ground annex, with and without a requested basement, and on a `flood` plot (critique/V02.md V2C-47 (5); seams S23R5-01, S23R6-01); a terraced palace (four storeyed tiers of two storeys, flights); a tiered tower (five one-storey tiers, pent roofs,
the `internal` form); a sealed stack (stair form `none`, V2C-47 (2)); the arena (volume 2's `ovalCourt`, V2 §2.1; from V2C-59);
the terrace-wall sub-fixture (a row built against a 3 m wall on its rear line, V2C-57, and a house at the wall's top edge
with a walk-out); a house between two streets on different terraces; a bridge-deck row of shop-houses, a jetty shed and a
mole-head tower (a landmark); a viaduct with an occupied arch vault; an aqueduct ending at a conduit house. **From P1,
B-PLAN's scripted click set also clicks every building of both known-city fixtures** (J78's and item 110 (e)'s; V3C-78):
no plan aborts, and F-PLAN's tier-6 flags are counted and reported per class.

| id | bar | how measured |
|---|---|---|
| T-V3-1 | resolution and schema (V3C-05, V3C-13, V3C-38, V3C-61, V3C-69, V3C-77, V3C-78): every class of volume 11's registry, every volume 7 village class (its `v.` key), the classes of the 17 scene archetypes and every `generic-<family>` class, at every band and with every specialisation, slot role and half its templates name, resolves by A1 to a row whose level is reported; every `v.` key resolves to a row of its own or through its `composition.classFamily` key (`via` reported), never to the building-class row or the fallback, `v.pound` (no building) excepted (S23R1-07, SR1-06); volume 11's stepped specialisations and volume 2's stepped composition rows resolve at level `specialisation`, no hard room of theirs names a storey rule its fixture's storeyed levels cannot meet, and every `belowTop` room is soft; `conduit_house` and `arena` resolve to their class-id rows; every role named is in the role table and every role row carries every column; every pattern cell states a weight at every band; every `fill`, `shared`, `unitHearth`, `perRoom` and `half` cell present where its law needs it; no class, family or class-id row names the `crypt` role (it comes only from `Basement.crypt`); every `AccessHostRow` reach has a row; every tag of the shipped class table's sub-locations maps or is listed | schema and enumeration test on `roomProgram.json` with volume 11's and volume 7's registries |
| T-V3-2 | allocation (V3C-09, V3C-15, V3C-17): every household housed (T28-13 widened to every fixture); `lodging` / `apartment` / `room` units fill the top storey down (unit k's storey never below unit k+1's); a `dwelling` pair divides by storey where storeys ≥ 2; a live-in unit never shares a seed piece with the use's hard rooms where an upper storey has capacity; no unit falls a form while a hard non-unit room is delivered on a storey the unit could have used; no staff room on a storey holding the owners' principal rooms while another allowed storey had capacity | the plan's units and rooms against A5 |
| T-V3-3 | stair bays: every core's bay equals S1's size for its kind and storey height within one module, lies against a wing side or joint along its long side, and overlaps no clearance square, apron, head or flight | geometry test |
| T-V3-4 | stacks (V3C-11, V3C-68): every chimney's column is one point on every storey of its `levels`; every hearth room touches its stack; no stack without a hearth or an air access; every unit with a cooking place touches a stack or reports a hood; no two stacks share a point unless one `doubleCm` ring; every stack reaches the roof or a terrace over its column — `levels[1]` is the highest level of any storeyed wing whose extent holds the column — and no stack ends under a floor | per plan, the stepped fixtures included |
| T-V3-5 | windows (V3C-03, V3C-46): none on a party wall; every window centre lies on a façade bay of volume 2's `facadeBays` for its side within `endClearCm`, and a side with no bay holds no window (S23R1-02); windows on stacked walls share bay indices; `slit` only on above-ground walls of tower, turret and keep wings; `light` only on basement walls whose exposure ≥ `window.lightBelowCm`; none on a buried wall or an underground building; with a composition, every unedited `DormerRow.count` equals W4's count and every edited row's dormers are windows of the rooms under them | per plan |
| T-V3-6 | doors (V3C-48, V3C-58): every door's hinge within `jambCm` + ½ module of its wall end or at the midpoint (arch); no two clearance squares overlap; a unit room's door count ≤ its role's `maxDoors`; every width is O3's for its kind; the main entrance's opening lies within the porch's width where a porch exists | per plan |
| T-V3-7 | loops only by O4: every door-graph cycle contains an O4 edge (§13.7's soft band made hard for O4's own list) | cycle basis per storey |
| T-V3-8 | furniture (V3C-41, V3C-49): every item's rotated footprint inside its room's ring; none over a clearance square, a stair bay, a head or an apron; counts within ± 1 of F1's `n` or reported skipped; no glyph above its `perRoomMax` or outside its `band`; `ledger` only in the chancel of a church-class building without a crypt | per plan |
| T-V3-9 | re-cuts (V3C-39): (soft, reported) the share of rooms kept by 3.11 on a house → inn designation change and on a one-band fall, by class; (hard) after every re-cut no kept opening joins two units or a concealed room to a public one or exceeds a `maxDoors`; T28-15's exact restoration stands | B-PLAN mutation fixtures |
| T-V3-10 | basements (V3C-02): a crawl space has exactly one `trapdoor` opening with `point` on the ground storey and no basement storey; every basement room's scope is 3.7.1's; with a secret item-64 access, the public cellar is reached from the core or trapdoor, the access's room only through its concealed opening, and T63-3 holds | the item-64 fixtures of §13.2 |
| T-V3-11 | edits (V3C-29, V3C-42, V3C-63, V3C-25): each of `setHearth`, `moveStairCore` with `kind`, `instance` on a room, `setOpening` with `hinge` / `swing`, `setWindow` with `kind` and the attribute paths of 4.1 commits, re-cuts only its building (`setAttr(basement)`: plus the named underground consequences) and undoes byte-identically; every bend of 4.2 lands on its nearest lawful form with a one-line reason and none is refused but for 4.2's stated causes; a B-EDIT sequence removing a cellar that holds a void's last access previews that access and the dwellings that would leave; `regenerate` on each rung of an edited plan changes it or reports that nothing changed; item 110's sequences — (i) a retaining wall drawn behind a planned building marks its plan stale, the re-derivation drops the windows below the new ground, and undo restores it byte-identically (V3C-71); (ii) on a church without a basement, a chamber drawn inside its footprint (volume 9's bend) makes a crypt-only basement with the edited ring, announced where the class is `never`, and undo restores it byte-identically (V3C-75); (iii) `setAttr(basement)` on a deck shop bends to the same request on the nearest ground building, named `bend.deck.basement`, and the dry run previews that building's basement (V3C-72; S23-17); (iv) an `instance` add or move into a room with no free slot bends to the nearest room with one, named, and a building with none keeps the item where it was put, reported (S23-26) | B-EDIT plan sequences, 10³ per PR |
| T-V3-12 | the clerk (V3C-27, V3C-35): `plan` and `planReport` at `public` over a front with a concealed use return no concealed room, door, head or furniture and each storey's answered areas sum to its extents; at `secret` all; neither query nor `why` writes a log entry or changes a digest; `why` on a room returns its facts, cause and rest, with its heads' causes | API test |
| T-V3-13 | exports (V3C-51): each storey's `.dd2vtt` portals equal the plan's openings and entrances at their plan widths (T28-19), a bricked head none and a head whose element is sealed or collapsed none (S23R3-07); `line_of_sight` has no segment across a window or opening; Foundry windows pass sight, a locked head's door is locked; the CityJSON file with storeys, units and rooms validates against CityJSON 2.0 and each `BuildingRoom`'s footprint equals its room's ring; the glTF `interiors` file validates and no window gap exceeds its storey's height less 30 cm; the JSON wing record carries `partName` through a save and load, and a document without it re-derives it by 2.5's migration row, each unmatched wing reported (S23-15) | validators in CI |
| T-V3-14 | draw (V3C-31, V3C-54, V3C-27): every B-PLAN fixture at each detail tier's first stop in `ink`, `lit` and `hatched`: the tier's marks and no finer ones; every opening's gap and leaf inside its wall; flights on the lower storey; one label per room inside its ring or none (§8.3's plan-draw row), no label line below 5 px; room numbers in reading order when on; at `public` no enclosed room without an opening and the drawn rooms tile each storey | §13.4's visual regression |
| T-V3-15 | budgets: §6's rows at median and p95 on B-PLAN and B-CITY-lite clicks; the view-cap row on the B-CITY METROPOLIS seeds | the bench, §13.8 nightly |
| T-V3-16 | shared access (V3C-01): every unit's entry door is reached from the main entrance, or from a secondary entrance of the same unit, through circulation rooms and stair cores only — never through a room of another unit or a service room of the use | the door graph, on B-PLAN and T28-13's ladder fixtures |
| T-V3-17 | no abort (V3C-16): over B-PLAN and a household sweep from 1 to each fixture's capacity, no plan aborts for want of room and every household has a unit; the fit ladder's steps are reported | sweep |
| T-V3-18 | floor datums (V3C-21): no door crosses a floor difference above `datum.maxSteps × riserCm`; every door across more than `riserCm` carries its `steps`; wings unjoined by S5 share no core | the stepped-row, slope and mixed-height fixtures |
| T-V3-19 | roles re-roll (V3C-22): `regenerate` with rung `plan.roles` leaves every ring and every `Opening.at`, `widthCm`, `wall` and `kind` byte-identical | B-PLAN |
| T-V3-20 | local = whole (V3C-23): a plan reached by a whole derivation equals, byte for byte, the same state reached through each local re-derivation of 4.2 on an unstored plan | B-EDIT pairs |
| T-V3-21 | declared rooms (V3C-33): a declared room appears on its declared storey or on 4.2's bent storey with its reason, survives every re-cut, marks an unstored plan stale and undoes byte-identically | B-EDIT |
| T-V3-22 | access heads (V3C-59, V3C-60): on fixtures holding one access of each source and cause — II.7.3's fallback cellar stair; an item-64 access; a catacomb entrance in a cemetery's chapel (V4 §3.5.1 (9)); a crypt join (cause `crypt`); an `addUndergroundAccess` into a building with and one without a basement, its door into the other cellar included (both buildings); a lifeline stair; volume 4's L1 chimney air shaft; an L5 institution; item 109's dug `cellar_stair`, `shaft` and `well`; a 10 m catacomb stair; a hovel's shaft; a kitchen well; a solid stack without a basement hosting one access (seam S23R2-10), and one whose access's `ground.at` lies nearest stair 0's flight (seam S23R3-09); a dug access under a crypt-only cathedral (J-V3.119) — every hosted access has exactly one head, no wall crosses a head, every head fits its storey, no straight bay exceeds one storey's flight, every through-ring is continuous from its head to the lowest storey, and §13.2's T12-1 fixture passes on its plan side; the solid stack's one head has `storey` null, no room and its `door` equal to `stackAccessDoor(b, a)` — on a non-stair ground wing's outline side, at least one module from each end of its door part and its span one module clear of stair 0's approach strip, never in a flight (seam S23R3-09) — is drawn (5.1) and written in the JSON `accesses` with `storey` null, and no VTT or Foundry scene carries it; the crypt-only cathedral's dug head lies in its undercroft, else its crypt, reported `crypt host`; the `stackAccessDoor(b, a)` clause runs from M3a on the eager records (§8's PE), the head's draw and export from P2 | per plan; the door clause from M3a on eager records |
| T-V3-23 | the crypt (V3C-61 (12); J111), on B-PLAN, B-CITY-lite and, at the model level with no plan elaborated, 200 CITY and METROPOLIS seeds: (a) every `always` building, and every building a dossier crypt record binds to, has `Basement.crypt` on every terrain class, `damp` and `flood` included (the raised form), and on a sky island; (b) on derived output the principal's crypt ring is strictly the largest in the settlement; (c) a `basement`-class church has a crypt exactly when it has a `full`, `half` or `walkout` basement, and a `never` class never has one; (d) no church-class building hosts a catacomb access of source `system`, and every catacomb head in a building with a crypt has cause `crypt` and lies in the crypt; (e) when elaborated, every crypt room covers its ring and every chancel is reachable from the main entrance (T28-2) in all three forms, with choir flights wherever the lift exceeds `datum.maxSteps` risers; and a great temple laid with `top` `flat` (volume 2's `stepped-temple` row, V2 §3.15.4, or its `tiers` op, V2 §4.6) has a plan holding storey −1 with its crypt room, entered from the door at `basementDoor(b)`, directly or through O2's one crypt join (seam S23R4-03), and no level at or above the ground (seam S23R2-10), and T28-1 holds, the `stepped_temple` row's `chapel` listed under `solidMonument` with no tier (seam S23R3-12); (f) no plan derivation changes `Basement.crypt`; (g) (V3C-74) with no building elaborated, the set of volume 4's crypt joins equals the set after elaborating every church, and every cathedral whose crypt ring lies over a catacomb element draws its join; (h) (ST-39) a crypt-only church whose crypt the rank caps keeps `Basement.ring` byte-identical, its capped bays planned as one `undercroft` room under the crypt's column grid, reached from the crypt through 3.7.5's arch (O2's forced edge; seam S23R4-03), and after the principal's area falls (or the church becomes the principal) its crypt ring re-grows to its step-2 ring and the undercroft is gone; (i) (S23R1-01) the crypt's step-1 seed region (3.7.4) lies under the wings volume 2's `cryptSeedWings(b)` returns wherever it returns any — a ranged church's `chancel`, `apse` or `crossing` part and a stepped temple's tier 0 among them — and in the far third only where it returns none; on the `half` and `raised` rungs the derived crypt ring lies under those wings alone — on a cathedral fixture on a `low` plot whose chancel's inset is below its `cryptM2`, the crypt is reported short and lies under no nave (seam S23R6-03); (j) (S23R4-03) on a walk-out `basement`-class church — fixtures: a church on a slope falling toward its chancel, its crypt longer than half the nave's axis, capped and uncapped — the outside door at `basementDoor(b)` shares no length with the crypt's vault (its ring and its capped bays), else the basement takes the reported `trapdoor` fallback; no outside door opens into the vault, which is entered from the church by its crypt stairs, and O2 joins the crypt to no other basement room but its capped bays' undercroft; every basement room is reached (T28-2); on a flat-topped great temple whose cellar draw gives a basement larger than its crypt, capped and uncapped, the crypt and every basement room are reached from the tomb door through exactly one crypt join; (S23R5-01) on the stepped great temple with a storeyed ground annex (§7's fixture), its crypt seeded under the solid tier 0 — with a requested basement (`Basement.access` ≠ `external`, volume 2's T-V2-44, its *Basement access* clause; seam S23R6-06) and with none (the basement then taking the ground wings' whole inset, never crypt-only) — the crypt is reached (T28-2) through exactly one crypt join from the room the annex's core or the trapdoor fallback enters, and no crypt its crypt stairs enter (3.7.4) takes a crypt join; and on a `flood` plot, the same temple's basement is the ground wings' whole inset in the `raised` form, the annex's ground storey clearing it by `crypt.clearCm` (volume 2's T-V2-36), its crypt reached through one crypt join (seam S23R6-01); (S23R5-02) on a capped walk-out church with a cellar, no tree path joins the crypt or its undercroft to a cellar room, the undercroft reached from the crypt through 3.7.5's arch; the door clause and the basement's extent run from M6-U on the eager records, the reach from P2 | model-level test and per plan |
| T-V3-24 | buildings below ground (V3C-62): on §13.2's T12-1 fixture and a ruin-dwelling fixture, no window, stack or basement on an underground building; every hearth has a flue to an air access within `hearth.flueReachM` or is a reported brazier; no wall crosses a ruin column; every frontage entrance faces `tunnel` | per plan |
| T-V3-25 | slots, halves and composer rooms (V3C-04, V3C-06, V3C-07): in the three-slot inn only the main slot holds the common room and the stable block holds its stable; the smithy's separate dwelling takes the `house` row; the split brewer's works holds a brewhouse and no taproom, its shop a taproom and no brewhouse, and a merge back onto one plot marks both plans stale; every composed `gatehall` and `towerRoom` resolves, and the court of a closed family is reached through the gate hall's arches; a rich manor whose occupants fall to the poor band has no `hall` or `solar` room and houses its units in the main range (S23-16); a closed family whose composer omitted its gate hall (V02 F-COMPOSE (3)) still has a `gatehall` with both arches, and an omitted `towerRoom` is still present on every storey its wing reaches (S23-27); every composer room keeps the `rooms` rung's id, no two rooms of a level share an id, and a stored plan's re-cut that adds a room mints it above the level's highest id (S23-14); every core and chimney id names its wing by key and survives the removal of another wing unchanged (S23-13) | the named fixtures |
| T-V3-26 | fill and vacancy (V3C-14): the rich shell with one household leaves no storey with spare capacity above the smallest fill target; the `squalid` tenement at capacity houses every household at `room` or better; the vacant house's plan has every room scope `service`, no unit and no furniture, labelled by role | the named fixtures |
| T-V3-27 | tiers nest (V3C-65, V3C-82, V3C-83): every room lies inside the extent of a wing reaching its level; no room, anchor or head lies in a solid wing; each stacked wing's `floorCm` at `s₀` equals `deckLevel` of the wing it stands on within 1 cm, and each wing's storey heights sum to its storey run exactly; each storey's rooms tile the extents of the wings reaching it (the fourth rung); no crypt stair or head descends through a solid wing; the arena's basement is reached by a core in a storeyed range, never by an outside door, and the stepped temple's by the tomb door; on every stepped-temple fixture the shrine's top storey holds exactly one room, of role `chapel` | the stepped fixtures and the arena |
| T-V3-28 | reach on a stack (V3C-66; critique/V02.md V2C-53): every storeyed wing's rooms are reached from the root through cores, landing doors, terrace exits or terrace doors (T28-2 as BCR-V3-14 extends it); every `stairChain` flight whose head meets a storeyed wing has its landing door; no core bay lies outside the extent of a wing it serves; no entrance door stands more than `datum.maxSteps × riserCm` from its outside ground, the main entrance's stoop excepted and reported; on a solid stack with a stair chain the main entrance stands at stair 0's foot (volume 2's BCR-V2-41; seam S23R4-06) with `storey` null and the plan's root is the first landing door; the sealed stack reports `W_TIER_UNREACHED` and nothing else fails | the stepped fixtures |
| T-V3-29 | terraces (V3C-67): every walkable terrace touches a landing, an exit or a door; no terrace polygon overlaps a room of its storey; every storeyed stacked wing standing on a flat roof has a landing or terrace door; no room under a terrace or a flat roof has a dormer; each storey's `.dd2vtt` scene with a walkable terrace has the terrace's floor in its image and each of its doors as a portal (validator); a building with no storeyed wing and no basement has no storey in its plan (its heads only, each `storey` null), no switcher and no failure, and one with a basement plans its basement storeys alone (seam S23R2-10); on the flat-topped great temple T28-1 holds, the `stepped_temple` row's `chapel` listed under `solidMonument` with no tier (seam S23R3-12) | the stepped fixtures; a flat-topped solid pyramid; the flat-topped great temple |
| T-V3-30 | exposure (V3C-70): no window's sill lies below its outside ground; no door or entrance lies more than the tolerance from its outside ground (the main stoop excepted); every building with a footprint side within `cellar.insetCm` of a retaining wall's high side whose step there is at least half the cellar depth, and whose class draws a basement, has a walk-out on that side; a rear entrance onto an upper terrace's street opens on the storey whose floor meets it; a half cellar's floor lies at the datum less half the cellar depth within 1 cm, its walls take their `light` windows and the main entrance its stoop (S23-11); a pitched roof set on a lower tier by `setAttr(wings/<key>/roof)` makes no terrace and a tier set flat makes one (S23-12); (S23R2-06) on the terrace-wall sub-fixture, whose plots S10–S11 level, every ground sample W2 reads equals `levelledGroundCm` at its point — the platform datum on a levelled plot and on each side of the wall, never the unlevelled raster there — so a build that samples the raster fails the walk-out and entrance-storey clauses above; and re-levelling a plot beside a stored plan re-cuts it (BCR-V3-28's digest); (S23R3-01) every external basement's outside door lies at `basementDoor(b)` (3.7.1), and every wall walk-out's door is on the wall's side — its ring side's midpoint within `2 × cellar.insetCm` of that wall's high side — or, where no ring side there is two modules long, the basement is joined by the reported `trapdoor` fallback; the entrance-storey and walk-out clauses, `basementDoor(b)` included, run from M3a on the eager records (§8's PE), the plan clauses from P1; (S23R3-11) on item 110 (e)'s terraced wards and the terrace-wall sub-fixture, with their wall and fall walk-outs, every room of a walk-out basement is spanned from the room its outside door opens into (O2's basement root), none tier 1; (S23R4-01) on a downhill-fronted walk-out house — its street along its low side, 130 – 250 cm of fall at its main entrance, the fall under its footprint past `cellar.slopeCm` — the main entrance's `Entrance.storey` is 0, never a basement level, opened with its stoop (O1 (e)), the basement entered by its outside door at `basementDoor(b)`, and every room of every storey is reached (T28-2); after `setAttr(basement)` changes that basement's access, kind or floors, every entrance's `storey` equals a fresh derivation's (S23R5-03) (*Entrances* rule 4); the storey clauses run from M3a on the eager records (§8's PE), the reach from P1 | item 110 (e)'s terraced wards and ravine of stepped housing; the terrace-wall sub-fixture; the two-street house; the downhill-fronted walk-out house; the half-cellar house on wet ground; the stepped fixture with its roofs edited |
| T-V3-31 | decks (V3C-72, V3C-84): no basement, head or well in any deck building, the mole-head tower included; every deck building's level-0 floor equals its deck's `surfaceCm` within 1 cm; a ruined deck's buildings draw as 5.1 states and a removed deck's draw nothing; `setAttr(basement)` on a deck shop bends to the nearest ground building with a basement request, named (S23-17) | the bridge-deck row, the jetty shed, the mole-head tower |
| T-V3-32 | grade faces and the aqueduct's end (V3C-73, V3C-77): the vault building's grade face has its entrance and windows; no `tunnel` face lies on a grade face; every hearth has a face flue, an air-access flue or a brazier; removing the viaduct previews the stored plan's loss and undo restores it byte-identically; the conduit house holds a `cistern` and draws its inlet mark where the aqueduct ends within snap | the viaduct and aqueduct fixtures |
| T-V3-33 | tier edits keep the author's rooms (V3C-76): on a stored terraced palace with a named room, a locked room and a placed item in tier 2, a `tiers` edit adding a storey to tier 0 keeps all three with their ids at their new levels; removing tier 2 lists them in the preview; each undo restores the plan byte-identically | B-EDIT |
| T-V3-34 | item 110's no-op pin (item 110 (f); V3C-81): with no stacked or solid wing, no `RetainingWall`, no deck plot and no raised way, and with `exposureAllStoreys` false, every B-PLAN and B-CITY-lite plan is byte-identical to the plan with this volume's item-110 paths (the level reading's stack cases, S5 (a), S6, 3.4a, the exposure gates, `Entrance.storey`'s ground reading, 3.7.2 (0), 3.12 (9)) removed; with `exposureAllStoreys` true the only differences are windows and entrances on walls whose outside ground lies above their sill or outside the floor tolerance, each listed — the recorded realism change of J-V3.84, not a golden's shift (V03 is unbuilt); from M3a, before any plan exists, the same pin holds on the eager records §8's PE builds (S23R3-05): with `exposureAllStoreys` false every `Entrance.storey` is 0 where `ground(b)` exists and no entrance is dropped, and with no `RetainingWall` and no solid ground wing `basementDoor(b)` takes rule 3 only | B-PLAN, B-CITY-lite; from M3a, their eager records |
| T-V3-35 | the B-PLAN calibration statistics (SCC-R2C-17; J-V3.118) — the bar 2.4's register lines name as `bar.T-V3-35`, registered there as a V12 `BenchBarDef`; four clauses, each a share, in this order: (i) of the delivered rooms of every role whose area is not `ring`, the share whose area lies inside the role's [min, max] × the ladder row's `sizeFactor` (A3; the resolved row's override where one is set) — pass ≥ 0.90; (ii) of the households on the fixtures and on a household sweep from 1 to 80 % of each fixture's capacity, the share whose unit is built at its asked form (`PlanReport.units`, `built` = `asked`) — pass ≥ 0.95; (iii) of the cores of buildings on the `house`, `row_house` and `cottage` class rows and the families taking them, the share whose kind S4 dropped to `ladder` or `trapdoor` where the resolved row asked another kind — pass ≤ 1/90 (parity row (d′)'s target made a clause); (iv) Σ `PlanReport.furnitureSkipped` ÷ Σ F1's `n` over the furnished rooms — pass ≤ 0.10, −1 and left out of the verdict until P2 lands F1–F4; the verdict passes when every clause that applies passes (thresholds `own`) | B-PLAN's fixtures and B-CITY-lite, every building's plan derived by the `plan` query (4.6); at V3-P6's exit (tier `milestone`) |

**Parity against the reference that owns the subject (Dwellings; descriptive rows, research-side, never `baselines.json`
rows — §13.5's note):** (a) *programme realisation* on the twelve footprints the Dwellings exports lane decoded, fed as
wings at 2 m per cell with their programmes **translated into our role names and counts by a research seat** (V3C-37;
J-V3.61: the file `research/fixtures/dwellings-ab.json` — each footprint as wing rings in cm and its programme in our
roles, with its provenance, passed through §17.1 (5)'s scan; the builder receives only that file and never the
reference's lists): hard rooms realised 12 / 12, all items ≥ 90 %, against the reference's 79 of 157
(`research/findings/dwellings-synthesis.md` §6 (4), §7); (b) *stairs stacked* 100 % against the reference's stated
floor-pair failures; (c) *public → private depth* — hall, then parlour or living room, then chamber, ordered by median
door depth from the main entrance in ≥ 90 % of houses (the reference's medians 1, 2, 6 as the descriptive baseline); (d)
*room-size order* by role matching the reference's ordinal order (store < kitchen < chamber < parlour < hall) in ≥ 90 %
of houses, the Spearman bar of §13.7 per building; (d′) *the trapdoor rate* (V3C-52): at most 1 house in 90 falls to a
`trapdoor` core, the reference's rate as the target, reported (T-V3-35 (iii) holds that target as a bar clause at
V3-P6); (e) *storeys inside the storey below* (V3C-79; the plan
side of Dwellings' upper-storey setback, docs/confidence/dwellings.md B3): on the stepped fixtures every storeyed level's
rooms lie inside the extents of the wings reaching the level below it — hard, 100 %, with the reference's 17 of 17
exports as the descriptive baseline — and each smaller storey's rooms per m² lie within ± 25 % of level 0's
(descriptive).

## 8 Build plan

The owner's order puts the plan rung after the stage-3 buildings (item 28 (d); the staged stage-3 row), so this plan
slots after volume V02's composer milestone (its M6b); its P0 spike may run earlier because it needs only the base's
wings, entrances, basements and transient arena, and commits no product path (the owner is asked in §11 whether P1–P3 may
also land on base wings before V02). Estimates in person-weeks, PLAUSIBLE, for the builder tier with a verifier seat.

| milestone | content | exit (executed) | pw | depends on |
|---|---|---|---|---|
| **PE — the plan rung's eager facts** (S23R3-05; J-V3.116) | built into the base within M2b and M3a, not the plan package: **at M2b**, BCR-V3-12's `R(s)` in *One capacity function*, with the cells `stair.ladder` and `stair.landingCm` shipped in the base's `roomProgram.json` (file f item 233); **at M3a**, in S11 with item 110 (a), (c) and volume 2's BCR-V2-41 (file f items 230, 241, 242, 578): BCR-V3-26's `Entrance.storey` with its tolerance cells (`datum.maxSteps`, `stair.riserCm`) and `exposureAllStoreys`, rule 4's non-derivation and 3.6's storey rule; BCR-V3-27 (a)'s wall walk-out and `basementDoor(b)` (3.7.1) with the cells `moduleCm` and `door.mainCm`; `stackAccessDoor(b, a)` (3.7.2 (1); seam S23R3-09) on `moduleCm`; `basementDoor(b)`'s crypt clause (3.7.1's door point off the crypt's vault; seam S23R4-03) is built at M6-U with the crypt derivation (file f item 238), inside its 0.25 pw, its door clause of T-V3-23 (j) at M6-U's exit — from then the door of a walk-out church whose rule-1 or rule-3 midpoint lay on its crypt's vault moves off it, and volume 1's entrance reserve with it through the value its digest hashes, declared in M6-U's shift record with the crypt's first derivation; and the pure readings they need — 3.3's level reading (`ground(b)`) and storey heights (`floorCm`) and W2's outside-ground sample (3.6) — exported from `@plat/plots`, which P1 imports | at M2b: the capacity with `R(s)` on T28-13's ladder fixtures and the re-homing on an edit of `stair.ladder`, `stair.landingCm` or the `room` role's min (2.5's table row); at M3a: T-V3-30's entrance-storey and walk-out clauses (`basementDoor(b)` included), T-V3-22's `stackAccessDoor(b, a)` clause and T-V3-34, on the eager records of the terrace-wall sub-fixture, the two-street house, the stepped fixtures and B-CITY-lite; at each, `plat calibrate register --check` green over the cells it lands — their entries V12 §3.11's default line (`plat calibrate register --defaults`), the `area` column's among them at M2b (over the `room` row), which 2.4's first register line restates in place at P1 (SCC-91); 2.4's register lines naming none of PE's cells nor the class rows' poorest-band `circulation` (SCC-R2C-17, SCC-R3C-8) | 0.75–1 (M2b 0.25; M3a 0.5–0.75), moved from P1 | the base's *One capacity function* (M2b); item 110 (a)'s `RetainingWall`s and levelling with volume 1's `stepProfile` and volume 5's `levelledGroundCm`, item 110 (c)'s stacks through volume 2's M3a-V2 (`storeyRange`, `deckLevel`, `BaseWing.on`, `.solid`, `stairChain`) and BCR-V2-41 (M3a) |
| **P0 — B-PLAN spike** | the synthesis's first experiment (`dwellings-synthesis.md` §6): 24 fixtures, six classes, three bands; A1–A6 with the fit ladder, anchors, `bisect`, `follow`, `spine`, `hall_and_parlour`, O1–O5, F-PLAN; the Dwellings A/B of §7 (a) on the research seat's translated fixture (J-V3.61) | §7 (a)–(d′) measured; T28-1 – T28-4, T-V3-16, T-V3-17 green; §6's per-storey row measured with its fallback decided | 1.5–2 | the base's transient arena (§3.4; priced in §16's unpriced-mechanisms line), M2b's entrances and basements; the fixture file |
| **P1 — the rung on any wings** | every pattern and `lodgings`; the per-piece rule and the cut machine on bent pieces; S1–S5, H1–H4, E1–E2; floor datums; W1–W4 on volume 2's façade bays (under §11's Q1 order imported from `@plat/plots`, built and priced as volume 2's item moved forward from its M6b; S23-36); every row of 2.4 (role, class, family, slot, class-id, village, tables); `PlanReport`; the chain, the kept-room and kept-opening tests; **item 110** — the plan's uses of the level reading, `ground(b)` and the storey heights (their functions imported from PE), chain cores (S5 (a)), S6's joins, the roof terraces (3.4a), stacks through tiers, the window and door exposure gates (BCR-V3-25), the basement door opened at `basementDoor(b)` (BCR-V3-32), the stepped, `conduit_house` and `arena` rows (`Entrance.storey`, the wall walk-out, `basementDoor(b)` and `R(s)` are PE's) | T28-1 – T28-6, T28-13 – T28-17 (F-PLAN clause), T-V3-1 – T-V3-7, T-V3-9, T-V3-16 – T-V3-20, T-V3-25 – T-V3-29, the plan clauses of T-V3-30 and T-V3-34 on B-PLAN; the known-city click set; `plat calibrate register --check` green over the cells it lands — their entries from 2.4's register lines, else V12 §3.11's default line (`plat calibrate register --defaults`) — with T-V3-35's `BenchBarDef` registered (SCC-R2C-17), and the `area` column's M2b entry restated in place by 2.4's first line (V12 §3.11's later-line rule; SCC-91) — should M6-P land after M-CAL's record, the restatement ships with a new major version of `roomProgram` (V12 §4.2), the entry `provisional` again (SCC-106) | 4–5.5 | P0, PE; volume 2's composer for composed wings (base wings earlier, by §11's answer) and its item-110 fold (`storeyRange`, `deckLevel`, `stairChain`, `landingSide`, with critique/V02.md V2C-53 and V2C-61 as landed); volume 11's registry (class ids, families, `staff`, `split`, `HeightsRow`); item 110 (a)'s `RetainingWall` |
| **P2 — basements, heads, the crypt, concealment, furnishing, below ground** | 3.7 but 3.7.4's derivation (heads of every source, the secret head's room, the crypt's plan and columns, crypt stairs and choir flights, the crawl hatch, the core's join and the tomb door, O2's crypt join and closed vault (seams S23R4-03, S23R5-01, S23R5-02), the deck rule; `stackAccessDoor(b, a)` is PE's); 3.12 with its grade faces; the concealed sub-graph and 5.4's merge; F1–F4 and the catalogue; BCR-V3-1, -2, -17, -19, -21 (`Basement.crypt` with its seed, growth and rank and the stair-entered reading that sets the basement's extent — 3.7.4 and BCR-V3-20 — is built at M6-U, file f item 238, S23-20; seam S23R5-01) | T-V3-8, T-V3-10, T-V3-22 – T-V3-24, T-V3-31, T-V3-32; the concealed-institutions row of the base's §5.3; T12-1's plan side; `plat calibrate register --check` green over the cells it lands (the furniture catalogue and `furnish.walkwayCm`: 2.4's register lines) | 3–4.25 | P1; volume 4's access records (U-SYS, U-ACCESS, U-LINK, U-DIG) and item 64's, and its `archVault` chambers (critique/V04.md C4-110-1; the grade-face fallback of 3.12 (9) until they land); volume 11's crypt column and rows; the crypt derivation and volume 2's lift (M6-U; BCR-V3-20, BCR-V2-28 — the crypt's plan and T-V3-23's plan clauses run from that landing) and the deck gate (BCR-V2-34) |
| **P3 — editing, the click and the clerk** | the plan tools with their bends; `setHearth`, `moveStairCore.kind`, `instance` on a room, the attribute paths, `declaredRooms`, `setAttr(basement)` with its underground preview, the crypt-only basement and the deck bend; New random per rung; carries under warps (§2.6's test with stored furnished plans); the wing-relative re-match under volume 2's `tiers` op and its orphan preview, the retaining wall's stale mark and re-cut, the raised way's removal fates (BCR-V3-28, -29); the storey switcher with stack names, the panel with its ways down, item 110's lines and room numbers; the clerk's queries and the `WhyProvider` with item 110's causes (BCR-V3-3, -4, -5, -15, -16, -22, -24) | T28-6, T28-7, T28-9 – T28-12, T28-18 (`setRoomUnit` clause), T-V3-11, T-V3-12, T-V3-21, T-V3-33 | 3.25–4.5 | P1, P2; §7's editing core (M2a–M3a); volume 10's registry |
| **P4 — the draw** | the building-band stops and the detail ladder (BCR-V3-6), every mark of 5.1 in `ink`, `lit`, `hatched` and the ink variants, `planWallShade`, labels, numbers, lights, the Works and ruin drawings, the underground band's plans; terraces, exterior flights, the stoop, the cistern and inlet mark, the deck's fall; the view cap | T-V3-14; §8.2's plan-draw row; the view-cap row of §6 on the B-CITY METROPOLIS seeds | 2.25–2.75 | P1; §8's building band (M2b) |
| **P5 — exports** | the JSON block (with `terraces`, entrance storeys, flights, `inlet`), SVG and PNG with the all-storeys sheet, `.dd2vtt` and Foundry per storey (terraces, landing portals, linked flights, roof levels), CityJSON storeys at their true elevations, units and rooms, glTF interiors (BCR-V3-7, -18) | T28-19, T-V3-13, T-V3-29's export clause | 1.75–2.25 | P1, P4; §11's exporters (M3b) |
| **P6 — content and tuning** | the role, class, family, use and catalogue rows and the unit floors tuned on B-PLAN and B-CITY-lite — never the `room` role's area (2.4's first register line: measured, never tuned) or a class row's poorest-band `circulation` (2.4's PE line), which §2.6's capacity reads (SCC-R3C-8, SCC-91); the soft bands; an owner review of twenty plans (six classes, three bands, a church with its crypt) as a side-by-side against Dwellings houses of like size, §13.6's written protocol reused, unrated panels not blocking | §13.7's plan soft bands; T-V3-15; T-V3-35, which confirms 2.4's `measure` entries or opens their fallback, so `plat calibrate register --check` is green with no V03 entry `provisional` past V3-P6 (SCC-R2C-17); the panel offered | 2–3 | P1–P5 |
| **total** | | | **18.5–25.25** | |

**Reconciled with the parity assessment** (V3C-56). docs/confidence/dwellings.md's capability matrix sums to 20.0 pw
for Dwellings-alone parity (its rows A1–H2, D7 excluded). This volume builds none of rows B1 (ground-plan drafting,
0.8), B2 (storey count, 0.2), B5 (footprint hand-off, 0.4), D4 (naming, 0.3), E6 (roofs, 1.0), E7 (elevation, 1.5), F1
(blueprint editor, 0.3), G3 (hand-off contract, 0.3) or A1 (parameter surface, 0.3), nor the massing half of B3
(upper-storey setback, 0.2 of its 0.4) — together 5.3 pw: footprints, storeys, setbacks and roofs are volume 2's and the
base's, naming volume 11's, the editor and parameters volume 9's and the base's, and the elevation is dropped (J-V3.19).
B3's plan half — a smaller storey's containment and partition, and the exposed roof — is this volume's since item 110
(c) (V3C-79; parity row (e)). The rows it does build sum to 14.7 pw, plus D7's 1.5 pw (the typed, programme-first method
this volume's programme is) — 16.2 pw at the assessor's pace. The remaining 2.3–9.05 pw of this volume's 18.5–25.25 pay
for what parity does not ask: the interior ladder and its re-cuts, the resolution over every registered class, the
editing contract (events, bends, undo, stored plans, carries), the VTT, Foundry, CityJSON and glTF exports, the clerk and
"why", the ways down, the crypt and the buildings below ground, and item 110's stacks, terraces, hillside exposure,
decks and vaults (1.75–2.5 pw of the second round). (The critique's ≈ 6.6 pw for the dropped rows recomputes from the
matrix as 5.5 pw, 5.3 pw after B3's plan half.)

**Risks, in order** (the synthesis's list, §6, answered here): packing a programme into bent or L wings (A5's trimming
before any cut, P0 and the exact `slice` before the pattern, tiers 2–5; measured at P0); small wings against a stair bay
(S4's kind fallback; parity row (d′)); institutions (per-class rows, `nave` and its strips, the crypt's stairs); the
mutation operator (the kept-room and kept-opening tests; T-V3-9's survival figure); the building band's legibility (the
stops, the detail ladder; P4's visual bars); the budget of `slice` (bisection, never cell enumeration; P0 measures); the
shared-access strip in tight shells (its fallback; T-V3-16 on the ladder fixtures from P0); stacked buildings (a chain
core that fits no whole chain, a terraced palace's budget; S5's prefixes, S6's joins and §6's module fallback, measured
on the stepped fixtures at P1). **Spikes:** P0 is the spike;
its pre-decided fallbacks are §6's and 3.9's.

**Where in §16's order** (S23-19; J-V3.109). The base prices the plan rung's hooks (§16: O9's +2 and the transient
arena); the rung itself, staged by the owner's roadmap, is §16's milestone **M6-P — the plan rung**, a row after volume 2's
M6 (BCR-V2-20) carrying P0–P6 and 17.75–24.25 pw of this volume's 18.5–25.25 (the crypt derivation's 0.25 pw moved to M6-U with file f item 238, S23-20) on the effort table's line "plan rung (volume 3)"
(BCR-V3-30); PE's 0.75–1 pw is built within the base's M2b (0.25) and M3a (0.5–0.75) and counted in those rows, inside
§16's first total (file f items 567 and 568; S23R3-05; J-V3.116). Its P0 spike may run after M4; P1–P6 follow volume 2's M6b, or, where the owner answers §11's Q1 yes, P1–P3
run on base wings after M4. §16's total: the coherence pass computes it once (file f item 568), the staged milestones
summed on its second line; this volume states no total of its own. Where the plan rung lands before volume 2 (Q1), M6-P creates the
`@plat/buildings` package (BCR-V3-31).

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V3.1 | Chose one role table that every programme resolves through, with class and use rows overriding only the cells they set, over repeating each room's cells in every class-and-band row, because the interior ladder names its roles across all classes and the repeat would state one fact about a hundred times (single source). |
| J-V3.2 | Chose to pack `lodging`, `apartment` and `room` units from the top storey down over bottom-up, because the poorest historically lodged highest (garrets) and the ground storey keeps the shop, the shared kitchen and the stair hall hub (§2.6's shared-room placement). |
| J-V3.3 | Chose to divide `dwelling` units by storey first, then by wing, then side by side around a lobby, over wing first, because the stair hall already gives each storey its own door, so no corridor is added — item 28 (f)'s "separate floors or wings" in that order. |
| J-V3.4 | Chose anchors placed by a total candidate order that reads no stream over drawn anchors, because §6.1 promises a layout re-roll keeps the stair core and §5.1 requires tier-2 repairs to read no stream. |
| J-V3.5 | Chose the stair-kind fallback dogleg → straight → winder → ladder → trapdoor over refusing the plan, because a narrow row house or cottage historically took a steeper or winding stair or a ladder rather than no upper storey. |
| J-V3.6 | Chose the stack preference back to back on a cross line, then party wall, then gable, then any exterior wall, then a smoke hood on a joint, over one fixed rule, because it is the historical order of town-house chimneys (the lobby-entry plan, shared party stacks) — the realism tiebreaker. |
| J-V3.7 | Chose stacks as vertical fixed rings from the lowest hearth to the wing's top, offered first to the hearth rooms above, over hearths placed storey by storey, because a flue is continuous and the owner's coherence rule puts chimneys over hearths (item 28 (a)). |
| J-V3.8 | Chose one cut primitive — an area-targeted straight cut found by bisection on the module — over grid packing or a treemap, because it is O(log cells) per cut, exact in `area2`, lattice-clean, and answers the synthesis's O(cells²) warning. |
| J-V3.9 | Chose roles assigned by the programme as pieces are cut, with `plan.roles` re-dealing roles only inside exchange classes that leave the door graph's costs, kinds and widths unchanged (P7), over a role search after the cut, because function first is the owner-adopted inversion of the reference (item 28 (a)), a search is the reference's own cost centre, and §6.1 and T28-6 require a roles re-roll to move no wall or opening. |
| J-V3.10 | Chose a priced tree from the main entrance plus loops by O4's rules over random extra doors, because item 60's ruling keeps ours and a loop must have a reason (a service route, an enfilade, the master's door into his shop). |
| J-V3.11 | Chose a door's hinge and swing derived by rule over leaving them undrawn, because the VTT door bounds, the drawn leaf and furniture clearance all need them, and a rule keeps them deterministic. |
| J-V3.12 | Chose plan-local ids for walls, openings, windows, cores, chimneys, heads and furniture over registry entities, because a click must mint nothing (§6.2) and a stored plan's parts are re-matched by rule (2.2). |
| J-V3.13 | Chose one window bay grid per wing side, shared by every storey, over per-room window placement, because windows then align across storeys by construction (§2.6 step 6) and the façade reads as built. |
| J-V3.14 | Chose furniture as plan values edited by the existing `instance` event over a new furniture event, because item 101 forbids a new tool and `instance` already adds, moves, removes and restyles instances by entity and ordinal. |
| J-V3.15 | Chose a new `setHearth` event over deriving hearths from roles alone, because a stack is geometry a roles re-roll must never move (§6.1), so moving it must re-cut, which no role event may do. |
| J-V3.16 | Chose eight building-band stops to ≈ 1:125 over drawing plans at 1:500, because at 1:500 an 80 cm door is ≈ 6 px — below the legibility floor. |
| J-V3.17 | Chose CityJSON rooms at LoD1 and a glTF `interiors` option off by default over leaving interiors out of 3-D, because every entity kind is exported and the default files and budgets stay unchanged. |
| J-V3.18 | Chose the crawl space's hatch in the room over the lowest footprint sample over a drawn position, because a hatch belongs where the void is deepest and a rule needs no stream. |
| J-V3.19 | Chose no elevation view over Dwellings' elevation, because elevations are the 3-D export's (§11.1) and the synthesis names it scope creep (risk 10). |
| J-V3.20 | Chose the building band's threshold at the stop nearest 1:700 over 1:500, so a clicked building is framed with its plot and neighbours before the plan's own stops; the detail ladder (J-V3.56) keeps the coarse stops legible. |
| J-V3.21 | Chose the plan report as non-canonical data in the elaboration chunk over a report record in the model, because a click writes nothing canonical (§6.2) and the report is a function of the plan. |
| J-V3.22 | Chose our own role areas, historically plausible for 12th–15th-century Western Europe (a hovel's room 9–14 m², a hall 16–40 m² and a hall class's 40–250 m²) and ordered as Dwellings' measured medians order its roles, over the reference's cell counts, because the reference has no scale (`dwellings-synthesis.md` §2.5); the four density cells equal to the reference's measured medians are marked as such (V3C-57); calibrate-later at P6. |
| J-V3.23 | Chose a roof storey only where `Heights.floors` counts it over inventing attics, because storeys are the shell's fact (§2.6) and the plan never adds shell. |
| J-V3.24 | Chose the kept-room test's best fit (nearest target, then list order) over first fit, so a re-cut keeps the most rooms in the roles they fit best (least disruption, item 28 (f)). |
| J-V3.25 | Chose `lodgings` as an allocation variant of `bisect` over an eighth `LayoutPattern` value, so the base's type is unchanged and no weight row can draw it where A5 does not ask for it. |
| J-V3.26 | Chose the resolution specialisation → class id → split or template family → building class → fallback over keying programmes by §2.6's eighteen building classes, because volume 11 fixes the programme key as the class id and scales work by specialisation per band (V3C-05, V3C-08), and every registered class then finds a row. |
| J-V3.27 | Chose to recompute a stored plan's report on demand from `Plan.program` against its rooms over storing the report, because a stored plan keeps no cache chunk once evicted (§12.8) and the report is derivable except for the measured members. |
| J-V3.28 | Chose four-column band cells (poor, modest, prosperous, rich) with `squalid` reading poor and `comfortable` modest over six-column cells, because volume 11's specialisations are authored at four anchors and a six-way split would state guesses twice. |
| J-V3.29 | Chose slot-keyed rows for every structure of a multi-building template over one programme per designation, because an inn's stable block must not receive a common room (V3C-06). |
| J-V3.30 | Chose split halves by a `half` filter on the class-id row, else volume 11's split families, over one programme for both plots, so a brewer's taphouse holds no brewhouse (item 105 (h); V3C-07). |
| J-V3.31 | Chose workplace sleep-in beds from volume 11's `staff` column × a row's `staffSleepIn` over a fixed journeymen room, because the workforce is volume 11's fact and the share varies by trade (V3C-08). |
| J-V3.32 | Chose the live-in household's form capped at `dwelling` and placed above the work first over giving it the ladder's full form, because the shell is the use's and the owner's own example is "quarters above" (item 28 (a); V3C-09). |
| J-V3.33 | Chose units allocated first, with storeys the use claims tried last, over hard rooms first, because F-PLAN tier 0 and §2.6 step 3 place the households first and a hard forge must never push a family to a poorer form (V3C-15). |
| J-V3.34 | Chose one shared stair hall cut from the main entrance to the core over per-unit corridors grown from any room, because it is how a subdivided house gave each family its own door (item 28 (f)) and it is the shortest circulation that meets T-V3-16 (V3C-01). |
| J-V3.35 | Chose a pre-decided no-abort fit ladder with a capacity reserve for a ladder bay and a landing over the rung's abort, because the owner's "never omit a household" forbids a plan with no units (V3C-16). |
| J-V3.36 | Chose to decide the hearth rooms' wings before placing stacks, and to place a back-to-back stack on the line a pattern would cut, over placing stacks on walls the cut has not made, because anchors must precede the cut and read no stream (V3C-11). |
| J-V3.37 | Chose `slice` on the maximal segment nearest the piece's centre, with fixed rings as bridges and a bounded linear scan where the area is not monotone, over a cut refused on every bent piece, because bent quads and notched pieces are common (V3C-12). |
| J-V3.38 | Chose to apply the drawn pattern to the piece that holds its requirement and give every other piece the first pattern it admits over one pattern for every wing, because an L or a courtyard building has pieces without an entrance, a hall or a core (V3C-13). |
| J-V3.39 | Chose filler rooms by class list and oversize pieces kept over stretching rooms past their maximum or leaving area unassigned, because a large shell with a small programme historically held more rooms, not bigger ones (V3C-14). |
| J-V3.40 | Chose a unit floor per unit form in `PlanGeometryRow` (house 60 … room 9 m²) over a per-ladder-row column, so one fact per form serves every band's row (V3C-36; general historical knowledge, calibrate-later). |
| J-V3.41 | Chose volume 2's façade bays on every side (its function, `facadeBays`; J-V2.93) over a plan-only bay grid or a restatement of its law per side, so the plan's windows, the dormers and the lit windows share one rhythm (V3C-03; S23R1-02). |
| J-V3.42 | Chose Prim over internal edges with secondary entrances adding openings only over secondary roots at cost 0, because a room reachable only from outside breaks T28-2 (V3C-26). |
| J-V3.43 | Chose steps inside the lower room up to `datum.maxSteps` risers and no door beyond over level doors across any drop, because wings on a slope or of different storey heights stand at different floors (V3C-21). |
| J-V3.44 | Chose flush ledger slabs as furnishing in a church without a crypt over a floor-vault "crypt", because under J111 a church without a crypt has none, and burial under the church floor was marked by slabs. |
| J-V3.45 | Chose the crypt as a model fact on `Basement`, drawn by the plan, over a plan-only room, because plans are derived on a click, and volume 4's join, the largest-crypt rule, volume 10 and volume 1's T-V1-47 read the crypt at generation (V3C-61 (1); S23R1-24). |
| J-V3.46 | Chose crypt stairs from the nave and choir flights over the lifted chancel over the stair core alone, because the raised form lifts the chancel past O1 (c)'s three steps and a crypt was historically entered from the nave (general knowledge, V3C-61 (4)). |
| J-V3.47 | Chose to keep and announce an author's removal of the cathedral's crypt over refusing it, because everything is editable (item 101 R2) and the owner's crypt rule governs derivation (V3C-61 (7)). |
| J-V3.48 | Chose a rank trim of every other crypt to `crypt.rankShare` × the principal's area over trusting the size rows alone, because the owner's "the cathedral always has … the largest crypt" must hold on derived output whatever the bands and shells (V3C-61 (1)). |
| J-V3.49 | Chose to anchor every access a building hosts, whatever its source or cause, over item 64's accesses alone, because the access edit, the neighbourhood's stair, the catacomb's entrance, the crypt join and the owner's dug access are all ways down inside buildings (V3C-59). |
| J-V3.50 | Chose one flight per head with the rest of the descent below the floor as the access's own stairwell over a straight bay at the full drop, because a 10 m descent fits no cellar (V3C-60). |
| J-V3.51 | Chose a secret access's own concealed back room over concealing the whole cellar, so the public cellar stays reachable and the secret stays hidden (V3C-02). |
| J-V3.52 | Chose to merge a concealed room into its public neighbour at a public key over drawing a door-less void, because a void is the tell item 63 exists to avoid (V3C-27). |
| J-V3.53 | Chose a flue to an air shaft, else a brazier, for an underground hearth over a stack through the ground, because no stack may rise through rock or another building (V3C-62). |
| J-V3.54 | Chose bends named in one line over refusals for plan edits, because item 101 R2 allows refusals only against a dossier fact or a lock (V3C-29). |
| J-V3.55 | Chose click to select and derive without moving the view and double-click to zoom over a click that frames the building, because §14's input scheme gives every entity that behaviour (V3C-30). |
| J-V3.56 | Chose a detail ladder by stop inside the building band over drawing every mark at every stop, because at the band's threshold leaves, treads and furniture are below the legibility floor (V3C-31). |
| J-V3.57 | Chose `view` plans only at 1:350 or finer and at most 64 per view over every visible building, because a METROPOLIS core holds hundreds and would fill the cache in one view (V3C-32). |
| J-V3.58 | Chose declared rooms as a building attribute read as hard programme rooms over rooms that can only be drawn, because item 101's authoring is "declare, then derive" and the Dwellings users ask for programme control (V3C-33). |
| J-V3.59 | Chose a room name that keeps the role and a per-viewer numbering key over role labels only, because a GM's room key is the ordinary use of a plan (Dwellings D6; V3C-34). |
| J-V3.60 | Chose a `WhyProvider` for rooms and a `plan` path on buildings over queries without causes, because volume 10 routes "why?" to the kind's provider (V3C-35). |
| J-V3.61 | Chose a translated A/B fixture prepared by a research seat over handing the builder the reference's lists, because §17.1 (2) forbids an implementer reading reference word lists (V3C-37). |
| J-V3.62 | Chose an exchange class keyed also by door kind and minimum width over scope, unit, door cap and hub-ness alone, so a roles re-roll can never move an opening or place a role in a piece too narrow for it (V3C-22). |
| J-V3.63 | Chose an explicit creation index for every `plan.*` draw over sequential draws per building, so a local re-derivation draws what the whole derivation would (V3C-23). |
| J-V3.64 | Chose to carry furniture points with a stored plan and re-snap or orphan them after a warp over carrying rings alone, because mean-value carrying is not rigid (V3C-24). |
| J-V3.65 | Chose a per-rung New random on an edited plan, edited parts fixed, over leaving it undefined, because a silent no-op is forbidden (§5.1 (6); V3C-25). |
| J-V3.66 | Chose a sun tie-break for principal rooms among equally fitting parts over ignoring orientation, because the rich sought the sun (item 102 (d)) and a tie-break never overrides fit (V3C-40). |
| J-V3.67 | Chose furniture rotation in integer centidegrees from the slot wall over quarter turns of the wing frame, because bent quads, polygon wings and round rooms have walls off that frame (V3C-49). |
| J-V3.68 | Chose CityJSON `BuildingUnit`s per household unit and no furniture over furniture objects, because units are the plan's social fact and the glyphs are abstract (V3C-51). |
| J-V3.69 | Chose a wall-shade program of our own and an all-storeys sheet over omitting both, because the synthesis keeps the reference's shading as a readability device and its users print whole houses (V3C-52). |
| J-V3.70 | Chose to re-run the underground layer's per-building rules on a basement edit and name every access gained or lost and every emptied void in the preview over a silent consequence, because item 109 (j) (4) empties a void whose last access closes (V3C-63). |
| J-V3.71 | Chose to explain every way down — kind, state, reach, cause — in the panel, the why and the exports over drawing heads alone, because item 109 (g) and (j) (3) require the cause to be told (V3C-64). |
| J-V3.72 | Chose a strip chancel cut at the crypt's nave-side edge in a church without a chancel wing over the chancel's own target depth, so the chancel stands over the crypt as historically it did. |
| J-V3.73 | Chose "church-class" as a class whose crypt column is `always` or `basement` over a class-name list, so a burial ground's chapel (class `cemetery`, `never`) may host the catacomb's entrance and no church may (J111). |
| J-V3.74 | Chose a tag → role table for sub-locations, with capacities and SettlementForge tags as fallbacks, over naming a room by a tag, because no sub-location tag is a role name (V3C-20). |
| J-V3.75 | Chose an entrance → room-role table for anchors over an unstated hub choice, so every entrance's room is decided by data (V3C-10). |
| J-V3.76 | Chose room placement by wing role and template part names (`WingAffinityRow`, BCR-V3-13) over the largest remaining piece alone, so a manor's kitchen lands in its service range and a church's chancel in its eastern arm (V3C-18). |
| J-V3.77 | Chose to read the base's adjacency cells, the ladder's staff placement and its circulation patterns over leaving them dangling, with the ladder's patterns governing the upper storeys of subdivided bands (V3C-17). |
| J-V3.78 | Chose an era row winning over the era-less row at the same key over ignoring `for.era`, so alternative room sets by era (Dwellings D5's idea) are data (V3C-45). |
| J-V3.79 | Chose to re-check every kept opening after a re-cut and remove the ones the new units forbid over keeping them, because a kept door between two households breaks the unit rule (V3C-39). |
| J-V3.80 | Chose to read volume 2's `storeyRange` and `deckLevel` and a ground predicate `ground(b)` over counting every wing's storeys from the ground, because a stacked tier's lower levels would vanish under the base's clip order, its floor would stand a storey too high, and on a solid stack level 0 is not the ground (V3C-65). |
| J-V3.81 | Chose one core carried up a chain of stacked tiers wherever its bay fits every tier, then landing doors where volume 2's stairs arrive, then terrace exits and terrace doors, with each such door a further root of the door tree, over a core per tier and secondary roots that reach nothing, because stacked tiers are not joined along a joint and a tier entered from its terrace is the stepped building's own form (V3C-66). |
| J-V3.82 | Chose the roof terrace as a derived surface of the level above, walkable only where a flight, an exit or a door reaches it, over a room of a new role, because a terrace lies outside the walls (no room tiles it) and an unreached roof must not read as floor in a game scene (V3C-67). |
| J-V3.83 | Chose to prefer stacks under the hearth wing's own exposed roof and to carry any other up through the tiers above, over ending a flue under a floor, because a flue is continuous (J-V3.7; V3C-68). |
| J-V3.84 | Chose the outside-ground test on every storey — windows above their outside ground, doors only within the step tolerance — switchable off by one flag, over reading exposure on basement walls only, because retaining walls put earth against ground storeys; V03 is unbuilt, so the change moves no golden, and on natural slopes it is a realism fix recorded here (V3C-70). |
| J-V3.85 | Chose to re-match a stacked wing's rooms by wing-relative storey, with their addresses kept, over the absolute level, because a tier edit below must not orphan the author's named, locked and furnished rooms above (V3C-76). |
| J-V3.86 | Chose to treat a host chamber's side that volume 4 marks open to ground part 0 as an exterior wall at grade — windows, a street door and a flue in the arch's infill — over applying the underground rules to the whole building, because an arch vault's face is open air (V3C-73). |
| J-V3.87 | Chose to make a crypt-only basement by the crypt ladder when an author sets a crypt ring on a building without a basement, over refusing the edit, because everything is editable (item 101) and the ladder's raised form is always lawful (V3C-75). |
| J-V3.88 | Chose "no storeyed wing stands on the ground" over "a solid ground wing" as the one condition for the outside basement door, because a basement that a storeyed ground wing's core can reach must not be forced outside (V3C-82). |
| J-V3.89 | Chose one sanctuary room on a stepped temple's shrine top storey, its sacristy and store only on another storeyed level, over cutting service rooms into the shrine, following volume 2's small shrine and its X18 (V3C-83; the historical reading PLAUSIBLE: some temple-top shrines had an outer and an inner room, which a two-storey shrine still gets below). |
| J-V3.90 | Chose storey heights from the class's heights row — a principal first storey on every wing, a stacked tier's included, and upper storeys — scaled to sum to the wing's storey run below any parapet, over one mean height per wing, because volume 2 raises each tier from a ground and an upper storey height (critique/V02.md V2C-61, J-V2.85) and a parapet is not a storey; V03 is unbuilt, so no golden moves. |
| J-V3.91 | Chose, on a solid stack, the main entrance at the stair's foot with no plan door and the plan rooted at the first landing door, and an empty plan with no failure for a building with no storeyed wing — its basement storeys and its heads still planned (seam S23R2-10) —, over a main door on the shrine, because rule 1 keeps the main entrance on the footprint and a solid stack has no storey there (critique/V02.md V2C-53, which withdraws V3C-66 (3)'s shrine door). |
| J-V3.92 | Chose to single-source the deck rule on volume 2's deck gate (every deck plot, landmarks included) and give a deck building no head and no well, over a landmark exemption, because volume 2 treats no deck — a mole included — as ground (J-V2.68; V3C-84); a mole fort's cistern would be an amendment to J-V2.68. |
| J-V3.93 | Chose the stepped programmes as specialisation rows under `'*'` until volume 11 names their class ids, over waiting, so A1's rule (1) reaches them whatever class carries the specialisation (V3C-69 (4)). |
| J-V3.94 | Chose an `arena` row with an ambulatory by the `spine` pattern, cells and stores below, and a row cell `seatingExits` for the cores' exits onto the seating, over a class-name test or no way onto the seating, because tables carry behaviour (item 23) and an amphitheatre's stairs lead to its banks (V3C-78; critique/V02.md V2C-59). |
| J-V3.95 | Chose a `cistern` role in the conduit house and a derived inlet mark where an aqueduct ends at it, over a store and a workshop, because the aqueduct's end house holds water and generated aqueducts make it common (V3C-77). |
| J-V3.96 | Chose no plan and no programme row for a ruin's stepped monument, over V3C-69 (1)'s `stepped-monument` row, because volume 4 keeps the monument as a chamber's record and never as a building (V2 §3.15.6; critique/V04.md C4-110-8), so the row would be read by nothing (the wiring rule). |
| J-V3.97 | Chose an outside-ground digest — the retaining walls near the footprint, the samples W2 reads and, for a building below ground, its host chamber's ring and grade faces — in `ElaborationRecord.inputs` over the building's own leaf state alone, because the plan now reads ground outside the walls and a stale plan must not look current (V3C-71). |
| J-V3.98 | Chose a pre-decided grade-face fallback for volume 4's `archVault` chambers — the two sides parallel to the raised way's axis, the arch mouths — over a rule that never fires until volume 4 marks them, because C4-110-1's chamber geometry fixes those faces and generated viaducts are common (V3C-73 (2)). |
| J-V3.99 | Chose `Entrance.storey` derived with the entrance set at S11 — a secondary entrance whose ground meets no floor not derived, after its draws — over a plan-time reading alone, so exports, the clerk and the plan read one fact and a hill-town house's back door stands one floor up without elaborating anything (V3C-66 (3), V3C-70 (2)). |
| J-V3.100 | Chose an uncapped outside stoop for a main entrance whose ground meets no floor over refusing or moving the main door, because rule 1 fixes the main entrance and a stoop is the historical answer to a raised ground floor. |
| J-V3.101 | Chose the roof terrace from each wing's own `RoofSpec.kind` (flat, laid or edited) over `MassingRef.stack.lowerRoof` and `top`, because volume 2's roof edit changes the wing's roof and leaves the stack's field as the laid default for a later re-lay, so only the wing's own roof says what stands there now (S23-12); the stack is read only for the shrine. |
| J-V3.102 | Chose stair core and chimney ids by wing key then a rank inside the wing over a building-wide index by wing order, because wings are keyed and canonically ordered (BCR-V2-27), so a wing added or removed elsewhere would renumber a stored plan's cores and stacks that plan events name (S23-13). |
| J-V3.103 | Chose composer rooms keeping the `rooms` rung's ids, other rooms minted after them in `readBack`'s order, and a stored plan's new rooms minted from the level's highest id + 1 over re-numbering every room on each cut, because plan events name room ids and volume 2 fixes the composer's (S23-14); never re-using an id keeps an old event from naming a new room. |
| J-V3.104 | Chose to apply a dwelling row's own rooms only at the ladder form `house`, the units and shared rooms replacing them at every other form, over adding the class's hall and solar beside the units at every band, because volume 2's `rooms` rung withholds the hall and chapel below that form (J-V2.36) and a manor divided into lodgings historically lost its hall to them (S23-16); institutions keep their rooms at every band. |
| J-V3.105 | Chose to bend a furniture add or move into a full room to the nearest room with a free slot (same storey first), and to keep it where the author put it when no room has one, over refusing it, because item 101 R2 allows refusals only against a dossier fact or a lock (S23-26; J-V3.54). |
| J-V3.106 | Chose to place an omitted gate hall as a fixed ring across its gate wing at the entrance offset, `gateHallM`'s lower bound wide, and an omitted tower room as its tower's piece, over leaving the role to A5's leftovers, because volume 2's F-COMPOSE (3) hands the role to this rung and the court is reached only through the gate hall's arches (S23-27). |
| J-V3.107 | Chose a rank that caps `Basement.crypt.ring` only — the capped bays kept as an undercroft under the crypt's column grid — and is recomputed from each crypt's step-2 ring on every run, so a trimmed crypt re-grows when the see returns, over a trim that also shortens a crypt-only basement, because volume 6's epoch rule keeps every vault (J-V6.62, T-V6-55) and a recomputed rank is the same function at generation and across epochs (ST-39). |
| J-V3.108 | Chose the district click at the city and district bands (close-up and `wings`, the building selected and its panel open) and the building click from the neighbourhood band down, each deriving `wings`, then `rooms`, then `plan`, over a building click at every band, because the base orders the gestures down the ladder, volume 2 keeps the district band composition-free and the plan reads the composer's rooms (S23-18, S23-34; J-S23.5). |
| J-V3.109 | Chose a §16 milestone of its own for the plan rung (M6-P) with its effort-table line and the §14 package line, over leaving the rung outside §16 until the owner opens stage 3, because the rung is designed to build depth and priced here, and a total computed once from the table's lines keeps volumes 1–3 from rewriting one number three ways (S23-19, S23-37). |
| J-V3.110 | Chose to apply this volume's half of S23-17 (the deck bend) and S23-19 (the M6-P milestone), which the workflow routed to the base-change lane because their owner cell reads "V03 + BASE-F", over leaving them to the next round, because their V03 text is stated exactly in the seam file and the base-change lane edits file f only; S23-20's V03 half (P2's price moving with the crypt derivation to M6-U) is left to the lane that relabels file f items 226 and 238, because its price and test split follow that label. |
| J-V3.111 | *Reconciliation round 2 (S23R1-07, SR1-06).* Chose to key the village programme rows by V07's `v.` keys, each row that takes a town row naming it, and to resolve a `v.` key without a row of its own through the row its volume 2 `composition.classFamily` key names (reported as `programmeSource.via`), over unprefixed ids or a copy of every V07 class here, because V07 and V11 key a village class `v.<id>` and a same-word town row is another key (SS-01), and one lookup through volume 2's table keeps a village building's programme and massing on one family and resolves any later village class without a new row. |
| J-V3.112 | *Reconciliation round 2 (SR1-06).* Chose rows of their own for `v.bakehouse` (bakehouse and store) and `v.shop` (the `shopfront` family row) over the `composition.classFamily` fallback for them, because the composition keys volume 2 gives them are massing choices (`kitchen`, `dwelling-detached`) whose programme rows would plan a common oven as a kitchen with a buttery and a general dealer's house with no shop room. |
| J-V3.113 | *Reconciliation round 3 (S23R2-06).* Chose to read every ground height W2 samples through volume 5's `levelledGroundCm(doc, key, p)` on the building's own arena key, and to stale a plan when a levelled platform's datum changes as well as the terrain (BCR-V3-28's digest holding the values read), over sampling the `Terrain` raster, because BCR-V5-30 keeps levelled heights out of the raster: a raster read gives the unlevelled slope at every terraced wall (misreading the exposure gates, `Entrance.storey` and the walk-out), and a raster-only stale trigger misses a re-levelling. |
| J-V3.114 | *Reconciliation round 4 (S23R3-01).* Chose one pure function `basementDoor(b)` of eager records, implemented in `@plat/plots` beside `facadeBays` and built at M3a, as the single producer of an external basement's door — the wall walk-out's side first, then the tomb door, then the fall walk-out — with BCR-V3-32 bringing the base's step 3 and T28-3 to read it, over the base's lowest-midpoint rule with this volume's two exceptions stated beside it, because on a levelled plot `levelledGroundCm` reads one platform under every side (the rule fell to the ring-index tie and never found the wall), step 3's text contradicted 3.7.1's tomb door and wall door, and volume 1's entrance reserve needs the door from committed state without elaborating a plan. |
| J-V3.115 | *Reconciliation round 4 (S23R3-01).* Chose, inside `basementDoor(b)`, (a) the wall test on the ring at `2 × cellar.insetCm` — BCR-V3-27 (a)'s footprint distance plus the ring's own inset — over `cellar.insetCm` measured on the ring, because the ring lies `cellar.insetCm` inside the ground wings, so the narrower test would miss exactly the walls the basement decision found; (b) no door off the wall (the trapdoor fallback, reported) where the wall's ring sides are too short for a door, over a door on another side, so a wall walk-out never opens a door into the platform's fill; and (c) rule 3's sample outside the wall — `levelledGroundCm` at W2's point, `cellar.insetCm + door.mainCm` out from the ring side — over the ring side's own midpoint, because on a levelled platform, or with an authored `external` access, the inside sample is the platform datum under every side, while the outside sample finds the ground the door opens onto; on an unlevelled plot both find the downslope side. A behaviour shift against the base's step-3 text, never shipped (the base is unbuilt). |
| J-V3.116 | *Reconciliation round 4 (S23R3-05).* Chose to build the plan rung's eager facts — BCR-V3-12's `R(s)` at M2b with *One capacity function*; BCR-V3-26's `Entrance.storey` with rule 4's non-derivation, and BCR-V3-27 (a)'s wall walk-out with `basementDoor(b)`, at M3a in S11 with item 110 (a), (c) and BCR-V2-41 — as §8's PE row inside the base's milestones, 0.75–1 pw moved from P1 (the volume's total unchanged; M6-P's line without it, file f items 567 and 568), over building them with the plan rung at M6-P, because their inputs exist at M2b and M3a and their readers (S10b's placement and re-homing, volume 1's entrance reserve at M5, volume 2's porches, the exports) run earlier, so a build at M6-P would shift capacity and households in every multi-storey building, and entrance sets, storeys and walk-outs in every terraced or stacked one — an undeclared one-time shift of eager records. |
| J-V3.117 | *Reconciliation round 3, second brief (S23R2-10).* Chose to plan a building with no storeyed wing below the ground — its basement storeys alone where it has a basement (the crypt, its columns, its entry by the door at `basementDoor(b)`, its heads on the lowest storey), else its hosted accesses as heads of `storey` null with a `door` on the ground-standing face, else an empty plan — dropping with no tier every room whose storey rule admits no basement storey, over the empty plan in every case, because a great temple laid with `top` `flat` (volume 2's `stepped-temple` row, flat at 0.2 of its poor anchor, or its `tiers` op) is an `always`-crypt class whose crypt, entrance door and heads the empty plan dropped, while volume 1 relies on the plan for every building-hosted access's one mark (V1-3.8.8) and tells the owner the crypt door is drawn with the building. Two readings of the seam's text, recorded here: its "it keeps the heads of 3.7.2 (1)'s outside-door form" is read with 3.7.2 (1) — with a basement the heads lie on its lowest storey, the outside-door form only without one; and the door's point is `stackAccessDoor(b, a)`, which volume 1's reserve reads (seam S23R3-09; J-V3.120). No shipped output moves (V03 is unbuilt). |
| J-V3.118 | *Reconciliation round 3, second brief (SCC-R2C-17).* Chose register lines of this volume's own for `roomProgram.json` in V2 §3.10.10's form — `measure` at V3-P6 on a new bar T-V3-35 (room areas inside their ranges, households at their asked form, the stair-fall rate against parity (d′)'s target, furniture skipped) for the area, unit-floor, stair-bay and furnishing columns P6 tunes, fallback "the default stays, reported"; PE's cells and every other column on V12 §3.11's default line; the two switches and the keys not calibratable — over dropping the B-PLAN claim for the default line alone, because P6 does tune those columns on B-PLAN and an entry that never names that measurement would let a tuned value stand unconfirmed until M-CAL, where no corpus frame measures room areas; over naming the existing bars, whose clauses are structural and pass whatever the values; PE's cells stay on the default line because a retune at V3-P6 would shift the capacity, entrance storeys and outside doors built at M2b and M3a (J-V3.116); `stages` `[]` because the plan rung has no StageId (V11 §3.1 row 38), so no run reaches these cells through the bar. *Amended (reconciliation round 4, second brief; SCC-R3C-8):* the same reason holds for the two cells of this table the capacity itself reads — the `room` role's `area` (its min `minRoomCm2`) and each class row's poorest-band `circulation` — so they join PE's cells on the default line, P6 tunes neither, and §13.7's item-28 fallback steps no poorest-band cell of a class row (BCR-V3-33; J-V3.123). *Amended again (reconciliation round 5; SCC-91):* the `room` role's `area` rides its column's entry on the first line — measured at V3-P6, never tuned — since V12 §3.11 binds a column, not a row, to one entry; only the class rows' poorest-band `circulation` stays on the default line (J-V3.123). |
| J-V3.119 | *Reconciliation round 3, second brief (found tracing S23R2-10's lifecycle).* Chose, on a crypt-only basement, to head an access whose reach is not a catacomb in the capped bays' undercroft, else in the crypt itself (reported `crypt host`), over the cellar A2 (10) would add, because storey −1 there is the crypt's and its capped bays' pieces alone (A4), so that cellar could never fit and the head would lose its host room — a path S23R2-10's repair opens on every flat-topped great temple over which volume 4 draws a dug or overlap access; a catacomb head there stays the crypt join (3.7.2 (6), T-V3-23 (d)). |
| J-V3.120 | *Reconciliation round 4, second brief (S23R3-09).* Chose one pure function of eager records, `stackAccessDoor(b, a)` in `@plat/plots` beside `basementDoor(b)`, built at M3a, as the single producer of a stack-hosted access's outside door — read by the head (3.7.2 (1)) and by volume 1's entrance reserve and digest — over two texts deriving one point, and a non-stair ground-standing wing with door parts two `moduleCm` long, the door one `moduleCm` from each end and its span one `moduleCm` clear of stair 0's approach strip, over the nearest ground-standing wing and `door.entranceCm` + 2 · `jambCm`, because stair 0 is a ground wing (V2 §3.15.1 ST6), so the nearest-wing rule could put the door in a flight, a point moved along its side left volume 1's rectangle, volume 1's reserve must read the point at M5, and `moduleCm` ships at M3a (file f item 233) while `door.entranceCm` and `jambCm` ship at M6-P. Refinements of the seam's text, recorded: (a) the wing is the nearest among those holding an admissible point, so a wing whose outline stretches are all too short or by the strip passes to the next before the fallback; (b) "outside the approach strip" is read as the door's span at least one `moduleCm` from it, so no door opens onto the strip's edge; (c) the function is `null` outside its domain (a basement, or `ground(b)`) and carries `fallback` so the plan can report it. Its effort, a nearest-point clamp along a side, is counted inside PE's M3a range and leaves P2's as priced (totals unchanged). |
| J-V3.121 | *Reconciliation round 4, second brief (S23R3-11).* Chose the base's reading — an `external` basement's outside door, whichever of `basementDoor(b)`'s rules placed it, roots a further Prim tree over the basement storeys' internal edges after the stack roots — over a walk-out's door as a secondary entrance adding openings only, because the core stops at the ground storey there (§2.6 step 3, J-A29.25), T28-2 starts at that door, and volume 2's BCR-V2-33 (c) states it for both `external` cases; with openings only, every room of every walk-out basement was unreached (F-PLAN tier 1 on every hill house with a walk-out). J-V3.42 stands for the side, rear, yard and service doors, a side door onto a walk-out's low side among them. |
| J-V3.122 | *Reconciliation round 4, second brief (S23R3-12).* Chose to amend the base's T28-1 (BCR-V3-14) so that, on a building with no storeyed wing, a room whose storey rule admits none of its basement storeys — hard or soft — is dropped under `solidMonument` and listed in the report with no tier (`PlanReport.owed`'s `tier` made optional, absent exactly then), over delivering such a room by tier 5 or leaving T28-1 unamended, because no storey stands above the ground to hold the `stepped_temple` row's `chapel` on a great temple laid with `top` `flat`, a generic room there would stand inside solid masonry, and the unamended bar would fail and flag that building at F-PLAN tier 1 on every derivation though nothing is wrong; F-PLAN's tier 1 reads the bar ("§13.2's plan bars fail on the overlay"), so it follows with no text of its own. The request quotes T28-1's soft-room clause too, since "each with its tier in the report" would otherwise fail the same building's soft rooms — a refinement of the seam's text. |
| J-V3.123 | *Reconciliation round 4, second brief (SCC-R3C-8).* Chose to put the two cells of `roomProgram.json` that §2.6's capacity reads — the `room` role's `area` triple (its min `minRoomCm2`) and each class row's poorest-band `circulation` — on PE's default line, never tuned at V3-P6, with §13.7's item-28 fallback stepping no poorest-band cell of a class row (BCR-V3-33), over letting P6 tune them as a declared shift of the capacity (T28-13's fixtures and the goldens re-signed at M6-P), because the capacity is an eager fact every shell's household count has read since M2b (J-A28.28), so a tune at the plan rung would move households, their placement and everything downstream in every town at a milestone the owner's roadmap stages last — J-V3.116's and J-V3.118's reason for PE's cells. The `room` role's target and max ride with its min (one cell, one entry); A3's unit floor, still `measure` at V3-P6, keeps P6's lever on a `room` unit's size. *Amended (reconciliation round 5; SCC-91):* V12 §3.11 binds a whole column to one register entry — the default line's `cal.<table>.*.<column>` covers every row, a later named line restates that one entry in place, and a named entry beside a default entry for one column fails the lint — so the `room` role's `area` triple, one row of the `area` column, cannot sit on the default line while its column's other rows sit on 2.4's `measure` line. It rides the first register line: the column's entry, written by `--defaults` at M2b over the `room` row, restated in place at P1, measured by T-V3-35 (i) at V3-P6 and never tuned there; its fallback moves no `room` cell. Only each class row's poorest-band `circulation`, a column wholly on the default line, stays on PE's line. The reason above — no tune of a cell the capacity reads at the plan rung — is unchanged; over a V12 rule for row-subset default entries, because the later-line rule as written covers the case with no new register machinery. *Noted (reconciliation round 6; SCC-106):* should M6-P land after M-CAL's record, the M2b entry has closed `fixed` there (no corpus frame measures room areas), and V12 §3.11 restates a closed entry in place only under a new major table version (V12 §4.2); so P1's restatement then ships with a new major version of `roomProgram`, the entry `provisional` again (2.4's first register line, §8's P1 row) — over leaving that order unstated, which would leave the P1 seat a restatement the lint refuses. |
| J-V3.124 | *Reconciliation round 5 (S23R4-01).* Chose the main entrance of a building whose basement is `external` on the ground storey, opened with its stoop — its `Entrance.storey` reading the levels at or above the ground only, derived by S11 after the basement decision and re-derived when the basement's access, kind or floors change — over extending the core down to a basement level the main entrance meets, because the base's `external` access stops the core at the ground storey (§2.6 step 3, J-A29.25, kept by BCR-V3-32 and volume 2's BCR-V2-33) and a basement holds service rooms only (3.7.1, A5), so the other reading would amend two base texts and bring the entrance hall and the shared stair into the cellar; with the main entrance on storey −1, O2 rooted the main tree in the basement and every room of storey 0 and above was unreached (F-PLAN tier 1, T28-2 failed) on the common downhill-fronted walk-out house. An outside flight to the main door with the cellar door under it is a historical hill-street form; the stoop lengthens (up to about fourteen risers, reported `stoop`; volume 1's T-V1-26 stoop clause keeps its doubled-depth fallback). A side, rear, yard or service entrance still opens on a basement level its ground meets. The re-derivation on a change of the basement's access, kind or floors (`setAttr(basement)`, the basement's re-derivation) is a refinement of the seam's text, from tracing that lifecycle path, recorded — kind and floors added by reconciliation round 6 (seam S23R5-03), since a basement storey added or a crypt's `raised` floor moves the levels a side, rear or yard door may meet; the storey step draws nothing, so the door and basement draws hold their order on `siteplan.entrance` (J-A29.61), and BCR-V3-26's closing says so, over a text the base could read as moving S11's entrance draws after the basement's. No shipped output moves (the base's M3a is unbuilt). |
| J-V3.125 | *Reconciliation round 5 (S23R4-03).* Chose, on a building with `Basement.crypt` and `ground(b)`, to read `basementDoor(b)`'s rules 1 and 3 at each door side's **door point** — its midpoint, else the nearest point whose span, a door's width held within the side, shares no length with the crypt's vault, a side with none being no door side and the result `null` (the reported `trapdoor` fallback) where no side remains — over a door opening into the crypt, because a church's crypt is entered from the church above by its crypt stairs (3.7.6), volume 1's §0 tells the owner so, and a tree started in the crypt crossed no forbidden edge, leaving the cellar unreached (T28-2). Three refinements of the seam's text, recorded: (a) the door point slides along its side, as the tomb door does, over disqualifying every side whose midpoint's span touches the crypt, so a walk-out church whose crypt covers the midpoint of its low long side keeps its door on that low side, off the crypt, rather than falling to a higher side or to the trapdoor; (b) the region cleared is the crypt's **vault** — its ring with its capped bays, the step-2 ring on an unedited crypt — over the ring alone, because the rank's trim and re-growth move the ring when another church's crypt changes, so a ring-only test would move this door and volume 1's reserve on an event elsewhere, and a door into the capped bays reaches the crypt through 3.7.5's arch. The clause is inert before M6-U (no `Basement.crypt`); its first reading moves such churches' doors once, declared in M6-U's shift record with the crypt's first derivation, and is priced inside that derivation's 0.25 pw. (c) The span is two `moduleCm` — the base's door width (§2.6 step 3), as `stackAccessDoor(b, a)`'s span, shipped at M3a — held within the side, over `door.mainCm` (120 cm), because a door side may be as short as two modules (100 cm), so a `door.mainCm` span held within its side would bar on a church a side every other building may use, and one not held within it could slide past the side's end. BCR-V3-32's step-3 text states the condition; file f item 578 carries it by reference. |
| J-V3.126 | *Reconciliation round 5 (S23R4-03).* Chose, on a building whose crypt is not stair-entered (3.7.4; round 5 wrote 'with no storeyed ground wing', amended below), exactly one crypt join in O2's tree — at the first room the tree that spans the basement reaches beside the unspanned crypt, else, where the tree starts in the crypt, to its adjoining room of least edge cost — with 3.7.5's capped-bays arch a forced tree edge exempt from the crypt's forbidden clause, over one crypt door on every building, and over growing a solid temple's crypt toward its tomb door, because a solid temple has no church above and its crypt's entry is the outside door, which the crypt's trim from its entrance end (3.7.4 step 2, shared with every church and read by volume 4's crypt join, volume 6's rank and volume 10's why) puts in a cellar wherever the cellar draw gives a larger basement — where the forbidden edge then left the crypt unreached (T28-2, T-V3-23 (e)). Refinements of the seam's text, recorded: (a) the join is an `arch` of `door.archCm` — the crypt role's door kind by O3, as 3.7.5's arch is — over a door of `door.entranceCm`, so T-V3-6's widths hold with no O3 exception; (b) 3.7.5's arch is the join where the capped bays' undercroft is the room reached (no second opening) and a forced edge everywhere, over the arch as an opening outside the tree, which by O2's text left a capped crypt-only church's undercroft reachable through no tree edge (tier 1) — a residue found tracing this path. A church with `ground(b)` keeps the forbidden clause for every other room: its crypt is entered by its crypt stairs alone. No shipped output moves (V03 is unbuilt). *Amended (reconciliation round 6; seams S23R5-01, S23R5-02):* the condition is the crypt's, not the building's — stair-entered where a storeyed ground wing's ring shares area with its vault (J-V3.127) — and the tree that joins it is the one spanning the basement, the main tree where that enters storey −1 by the core's bay or the trapdoor; and (c) where crypt stairs enter the crypt the forced arch closes the vault — the undercroft joins no other basement room — so the forced edge reaches a capped crypt-only church's undercroft without opening the crypt to a cellar (seam S23R5-02), over reverting the arch to an opening outside the tree, which re-strands that undercroft (critique/seam-stage2-3-r5.md J-S23R5.3); a crypt stair's foot and a head's bay stay structural faces, outside that clause. The capped bays' citation keeps 2.1, whose list of derived pieces states the reading, with §1b's row and 3.7.4 (3) added — the seam's (c) read against that paragraph, recorded. |
| J-V3.127 | *Reconciliation round 6 (S23R5-01).* Chose to key the crypt's entry on whether a storeyed ground wing stands over its vault — **stair-entered**, by its crypt stairs; else from the basement, by the outside door or one crypt join — and to give a crypt that no stair reaches on a building with `ground(b)` a whole basement (the ground wings' inset) rather than a crypt-only one, over keying on `ground(b)`, which strands the crypt of a great temple with a storeyed annex (no crypt stair, no join); over a tomb door for that crypt, which volume 2's BCR-V2-33 bars (a storeyed annex's basement 'never outside'); and over seeding the crypt under the annex, which moves volume 2's `cryptSeedWings` and puts the temple's crypt off its sanctuary, read by volumes 4, 6 and 10; the vault, not the trimmed ring, so the reading never flips on a rank event elsewhere. The realism tiebreaker agrees: a temple platform's substructure opening into its tomb chamber is a historical arrangement, and the crypt stays under the sanctuary. Refinements of the seam's text, recorded: (a) 'overlaps' is read as sharing area, never an edge alone, since a wing that only touches the vault stands over no part of it; (b) the basement function tests the step-2 ring of the region a crypt-only basement would take — the ring the crypt keeps in the whole inset, whose seed and growth read the same region; (c) an author's crypt ring on a building without a basement follows the same rule (3.7.4, 4.2 and BCR-V3-20's requested-basement clause), so an edited ring under a solid tier takes the whole inset too — a path the seam's text did not name, found tracing that edit's lifecycle; (d) 3.7.6 words the join 'from the basement's tree (O2 (i), (ii))' over 'from the room the basement's tree enters first', since O2 joins at the first spanned room adjoining the crypt, which need not be the first entered; (e) where no nave stands over a stair-entered crypt the flight's bay is laid inside the part of the vault the largest level-0 room stands over, landing in the crypt, else in the capped bays' undercroft (3.7.6, 3.9); (f) 3.7.1's door-point condition stays on `ground(b)`, its reason now naming a crypt beside a storeyed wing but under none, so such a walk-out keeps its door off the vault, into a cellar, and the crypt join enters the crypt (the seam's §3.3 (a)); (g) the whole basement's access is the programme row's, an outside door only where a walk-out makes it `external`, off the vault. No shipped output moves (V03 and M6-U are unbuilt): the basement's extent for such a temple is M6-U's first derivation, and the reach is P2's. |
| J-V3.128 | *Finalization (seam S23R6-01).* Chose, for a crypt no stair reaches on the `raised` rung, the ground wings' whole inset with **every ground wing over it lifted** (volume 2's lift keyed on the wings over the basement's ring, S23R6-02), so the storeyed annex clears the basement by `crypt.clearCm` and its core reaches the basement beside the crypt, over (i) a crypt-only raised basement with a tomb door into the platform's chamber, which would amend BCR-V2-33's access rule, volume 2's "never outside" (V2 §3.15.3, T-V2-44), J-V3.88 and `basementDoor(b)`'s door point and rule 2 for one wet-ground case, and over (ii) refusing the whole inset on that rung, which re-strands the crypt (S23R5-01). One rule on every rung, the whole inset reached through the annex's core, is the simpler mechanism, and a hall raised over an undercroft on wet ground is a historical form (PLAUSIBLE, general knowledge). BCR-V3-20 needs no change: the lift is BCR-V2-28's. |
| J-V3.129 | *Finalization (seam S23R6-03).* Chose to bound a derived crypt's growth on the `half` rung as on the `raised` rung — under the ground wings its step-1 seed lies under, which volume 2 raises or lifts over it, or the solid tier 0 that holds it — over letting it grow and raising every wing it reaches (volume 2's ring rule alone), because volume 2's form is a raised choir over a half-sunk crypt (J-V2.91) and raising a nave with its choir drops the choir flights; a short principal still out-ranks every other crypt by the cap, and an author's ring keeps no bound (volume 2 raises the wings over it, S23R6-02). |

## 10 Base change requests

Each names the base section's exact heading, quotes the current text once, and gives the new text or mechanism. This
volume is written as if each were applied. BCR-V3-1 – BCR-V3-10 are the first draft's, revised; BCR-V3-11 – BCR-V3-24
come from the revision against critique/V03.md; BCR-V3-25 – BCR-V3-29, and the second-round additions to BCR-V3-1, -9,
-14 and -20, from the second round (item 110; critique/V03.md §12). Single source: where volume 2's base change requests
(BCR-V2-31 – BCR-V2-39, BCR-V2-41 and BCR-V2-42, all landed in volume 2) state a rule,
this volume cites them and requests nothing — BCR-V3-25's *Basements* bullet and BCR-V3-27 (b) and (c) are dropped for
BCR-V2-33 and BCR-V2-34 (critique/V03.md §12.10, V3C-82). Reconciliation round 1 (critique/seam-stage2-3-r0.md) adds
BCR-V3-30 (§16's M6-P) and BCR-V3-31 (§14's package), extends BCR-V3-13 (the part name's lifecycle and JSON), and scopes
BCR-V3-15, -19 and -28 to the `plan` rung's inputs as BCR-V2-13 splits them per rung. Reconciliation round 4 adds BCR-V3-32
(step 3's outside door and T28-3 at `basementDoor(b)`; S23R3-01) and build notes on BCR-V3-12, -26, -27 and -30 for §8's
PE row (S23R3-05).

**BCR-V3-1 — the plan tables and the programme cells** (V3C-19). Heading: `### 10.2 Roster (data-driven, replaceable; sequential
and prefix-stable; our values)`, paragraph *Replaceability, households, entrances, cellars and the room programme*.
Current: "`RosterTables.roomProgram` holds the room programmes and `RosterTables.basementGate` the basement's terrain-gate
values:". New: "`RosterTables.roomProgram` holds the room programmes and the plan rung's tables — the role table
(`RoomRoleRow`), the furniture catalogue (`FurnitureRow`), the plan geometry row (`PlanGeometryRow`), `PatternRow`,
`EntranceAnchorRow`, `WingAffinityRow`, `SubLocationRoleRow` and `AccessHostRow`, their types and default rows volume V03
§2.4 — and `RosterTables.basementGate` the basement's terrain-gate values:". In the same heading's `interface
RoomProgramRow`, current "`for: { cls: BuildingClass; band: string; use?: string; era?: string }`" → new "`for: { cls:
BuildingClass | string /* a volume 11 class id, or '*' in a generic slot row */; family?: string /* a volume 11 template
family */; slot?: string /* a structure slot role, '#n' for the n-th of that role */; half?: 'works'|'shop'; band: string;
use?: string /* a specialisation name (V11 §3.6.2) */; era?: string }`", and the row gains `shared?: 'all'|'none'|RoomRole[];
unitHearth?: boolean; unitOneRoom?: boolean; fill?: RoomRole[]; staffSleepIn?: number` (V03 §2.4), its `furnish.density`
and `furnish.wallBias` documented as multipliers (default 1) of the role table's cells. In `interface RoomRuleRow`,
current "`area: [number, number, number] /* m²: min, target, max */; storey: 'any'|'ground'|'upper'|'top'|'basement' /*
the storey rule */; exterior: 'none'|'some'|'max' /* windows */; door: 'door'|'arch'|'open' /* the opening kind */;`" → new
"`area?: [number, number, number] /* m²: min, target, max; absent: the role table's cell, volume V03 §2.4 */; storey?:
'any'|'ground'|'upper'|'top'|'basement'|'notBasement' /* absent: the role's */; exterior?: 'none'|'some'|'max'; door?:
'door'|'arch'|'open' /* absent: the role's */;`", and in the same interface `adjacency` and `furnish` become optional
(absent: none; the role's), `count` gains `perRoom?: number` (the `perCapacity` divisor) and the row gains `half?:
'works'|'shop'|'both'` (default `both`). *Second round (item 110):* `RoomRuleRow.storey` also gains `'belowTop'` (any
storeyed level but the building's highest, volume V03 §2.4) and `RoomProgramRow` gains `seatingExits?: boolean` (volume
V03 §3.3 S6 (d)). In `## §14 Package and module layout, key interfaces, dependency rules, extension
points`, `@plat/tables`, after "the `interiorLadder` table of `InteriorLadderRow`s, §2.6, §10.2)" insert ", with the plan
rung's tables (V03 §2.4)".

**BCR-V3-2 — the plan records.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`. Current: "rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[] }"
(in `interface Storey`). New: "rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[]; furniture:
FurnitureItem[] /* V03 §2.1 */ }". Mechanism for the rest: add to `Room` the fields `nextFurniture: number` and `name?:
string`; to `Opening` the fields `hinge?: 0|1`, `swing?: Id` and `steps?: number`; to `WindowRec` the field `kind:
'window'|'slit'|'light'`; to `Chimney` the field `air?: Id[]`; to `ProgramRoom` the fields `origin` and `subLocation?` (V03
§2.1); declare `FurnitureItem` as V03 §2.1 states (`rotCdeg` integer centidegrees). In step 6, after "furniture is
abstract shapes by role from the row's `furnish` columns, never blocking an opening or the stair bay" add "(`Storey.
furniture`, placed by V03 §3.8)". In `interface CarriedShapes`, current "and with a stored plan every storey's room rings,
walls' end points, stair-core bays and chimney columns (rule 2 (b); J-P48)" → new "and with a stored plan every storey's
room rings, walls' end points, stair-core bays, chimney columns and furniture points (rule 2 (b); J-P48)"; in the
paragraph *A stored composition is carried with its wings (J-P48)*, current "each `StairCore.bay`, each `Chimney.column`"
→ new "each `StairCore.bay`, each `Chimney.column`, each `Storey.furniture[].at` (re-snapped or orphaned after the carry
by V03 §4.3)". In `### 12.8 Memory (what is counted, per rung)`, *The elaboration cache*: current "(rings and walls as
integer cm, openings and windows as offsets along their walls)" → new "(rings and walls as integer cm, openings, windows
and furniture as offsets along their walls or in cm)".

**BCR-V3-3 — hearth and stair-kind edits, and the count of plan events.** Heading: `### 7.1 Edits are ordered events on
addresses; the named actions; the edit targets; dry-run validation`. Current: "| { t: 'moveStairCore'; building: Id; core:
Id; bay: Polygon }". New: "| { t: 'moveStairCore'; building: Id; core: Id; bay?: Polygon; kind?: StairCore['kind'] }   //
at least one of bay and kind; an unfitting kind or bay bends to the nearest that fits, named (V03 §4.2)" and, after
`setRoomUnit`, "| { t: 'setHearth'; building: Id; storey: number; room: Id; op: 'add'|'move'|'remove'; wall?: Id; at?: Cm }
// V03 §4.2: the stack re-placed under the rung's rules, each storey it crosses re-cut; the undo record keeps those
storeys". In each of the four places that count "the seven plan events" (V3C-44) — `### 0.2 Where the owner's late rules
land — items 1–7 (…), items 8–31 (…) and items 32–88 and 101 (…)`, row 28; `### 13.2 Per-stage invariants, statistics,
cost-model tests, contract tests, B-EDIT`, the enumeration test's list; `## §14 Package and module layout, key interfaces,
dependency rules, extension points`, the `@plat/api` comment "the event kinds amendments b add"; and `# Staged by the
owner's roadmap (this document defers nothing)`, the stage-3 row — current "the seven plan events" → new "the eight plan
events (the seven and `setHearth`, V03 §4.2)".

**BCR-V3-4 — furniture through `instance`.** Same heading as BCR-V3-3. Current: "| { t: 'instance'; entity: Id;
ordinal?: string; point?: PointCm; op: 'add'|'move'|'remove'|'restyle'; to?: PointCm; style?: Partial<InstanceStyle> }".
Mechanism: `entity` may name a plan room (`room:<building>/<level>/<i>`), `ordinal` then naming a furniture item as the
decimal string of its ordinal and `style` being `Partial<{ glyph: string; rotCdeg: number /* integer centidegrees */; wCm:
Cm; dCm: Cm }>`; the first such event stores the building's composition as the plan events do (§2.6); its dry run applies
V03 §4.2's bends. In the edit-target table's `buildings` row and in T9 `shape`'s row add "`setHearth`, `instance` on a
room's furniture"; in `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) —
G-P8`'s plan-event row add both kinds.

**BCR-V3-5 — the clerk's plan queries.** Heading: `### 11.2 The embedding API and the worker boundary (SCL-6)`. Current:
"type Query =\n  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }". New: add "| { kind: 'plan';
building: Id; storey?: number } | { kind: 'planReport'; building: Id }   // V03 §4.6: derives an absent or stale plan into
the cache as a click does, logs nothing; knowledge-filtered by V03 §5.4's merge (§9.2)".

**BCR-V3-6 — the building band's stops, threshold, detail ladder, furniture role and wall shade.** Heading: `### 8.8
Tiles, zoom stops, print and the canvas budget`. Current: "cover B-ZOOM's 1:50 000 → 1:500 in 27 stops". New: "cover
B-ZOOM's 1:50 000 → 1:500 in 27 stops, and eight building-band stops continue the same step to ≈ 1:125, drawn only for
buildings whose plan draws, with the plan's detail ladder by stop (V03 §5.1)". In `### 8.5 Level of detail, the city-band
figure-ground contract, way selection, first paint`, *Bands*, after "**building** — wings and" add "(entered at the stop
nearest 1:700)"; in `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets
(G-R2)`, the colour-role list gains `furniture` (V03 §5.1), mapped in `ink` to ink at α 0.5 and in `lit` to a wood tone of
the sheet, and the paint programs gain `planWallShade` (V03 §5.1: a soft band inside each plan wall, broken at openings).
In `### 2.9 The document and serialisation`, the view keys gain `roomNumbers: 'off'|'storey'|'building'` (V03 §4.5), outside
the model hash.

**BCR-V3-7 — interiors in CityJSON and glTF.** Heading: `### 11.1 Formats`. Current (CityJSON row): "a basement as a
`BuildingPart` below `baseCm`". New: "a basement as a `BuildingPart` below `baseCm`; for a building whose plan rung is not
`absent`, `BuildingStorey`, `BuildingUnit` and `BuildingRoom` children as V03 §5.3 states". In the 3-D row after "OBJ as a
flat secondary" insert "; the `interiors` option (default off) adds each plan's walls, floors, stairs and columns per V03
§5.3".

**BCR-V3-8 — the report in the cache.** Heading: `### 2.9 The document and serialisation`. Current (`ElaborationChunk`):
"a derived Composition, Plan or close-up, or one memoised step of a re-cut chain (§2.6)". New: "a derived Composition,
Plan (with its `PlanReport`, V03 §2.3) or close-up, or one memoised step of a re-cut chain (§2.6)".

**BCR-V3-9 — the volume's bars and the structural faces.** Heading: `### 13.2 Per-stage invariants, statistics,
cost-model tests, contract tests, B-EDIT`. Current: "(T28-19) the JSON `plan` block validates against its schema and
round-trips, and every storey scene's portals equal the plan's openings and entrances (§11.1)." New: the same sentence,
then "Volume V03's T-V3-1 – T-V3-34 run on the same fixtures from stage 3's intake, T-V3-23 (a)–(d), (f) and (g) also at
the model level from the crypt's landing (M6-U; file f item 238)." T28-2's text is BCR-V3-14's. In `### 8.3 Symbol catalogue and draw-style census`,
the plan-draw row, after "a room left unlabelled only where its label does not fit at the range's bottom" add "or where it
is a structural face (a stack, a shaft, a column; V03 §2.4)".

**BCR-V3-10 — the stair's kind fallback inside F-PLAN's tier 2.** Heading: `### 5.2 Failure classes: detection, ladder,
test`, the F-PLAN row. Current: "at the next candidate of that step's filtered placement order". New: "at the next
candidate of that step's filtered placement order — for a stair bay the order continuing through the next stair kinds
(V03 §3.3 S4) — and, for a household that does not fit, V03 §3.9's no-abort fit ladder before any omission".

**BCR-V3-11 — shared access in the unit rule.** Heading: `### 5.3 The invariant suite, by scope (SCL-1)`, the
interior-ladder row. Current: "each household unit has its own entry door onto circulation (a corridor, stair hall or
landing) or onto the street and never opens through another unit's room;". New: "each household unit has its own entry
door onto circulation (a corridor, stair hall or landing) or onto the street, never opens through another unit's room,
and is reached from the main entrance through circulation rooms and stair cores only (V03 §3.2 A6);".

**BCR-V3-12 — a stair and a landing in the capacity.** Heading: `### 2.6 Buildings, heights and ground datum, wings,
materials, sub-locations, the stage-3 interface`, *One capacity function (J-A28.23, J-A28.28)*. Current: "`capacity(b) =
min(households.max of the designation template at the plot's builtBand (§10.2), floor(Σ over the storeys s at or above the
ground of A(s) × (den − num) ÷ (2 · den · minRoomCm2)))`". New: "`capacity(b) = min(households.max of the designation
template at the plot's builtBand (§10.2), floor(Σ over the storeys s at or above the ground of (A(s) × (den − num) − den ×
R(s)) ÷ (2 · den · minRoomCm2)))` — `R(s)` 0 at the ground and, on every storey above it, the `area2` of a `ladder` stair
bay and a landing (`PlanGeometryRow.stair.ladder` and `.landingCm`, volume V03 §2.4), so the plan rung's no-abort fit
ladder always houses a shell at capacity (V03 §3.9)". And after "basement storeys excluded." add "An edit of the `room`
role's min, `stair.ladder` or `stair.landingCm` (§7.6) re-runs the capacity rule's re-homing, like a template edit." Built at M2b with *One capacity function*, the cells
`stair.ladder` and `stair.landingCm` shipped in the base's `roomProgram.json` then (volume 3 §8's PE; file f item 233;
S23R3-05).

**BCR-V3-13 — template part names.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`, *The base outline builder*, item 1 *Footprint templates*. Current: "each template
is stored as its constituent rectangles and wedges so the wing rule below holds." New: "each template is stored as its
constituent rectangles and wedges so the wing rule below holds, each carrying a `partName` (nave, transept, crossing,
chancel, apse, tower, cloister walk, …; data) that the fitted wing keeps (`BaseWing.partName?: string`, written by the
outline builder and carried with the wing), read by the plan rung's room placement and the crypt's seed (volume V03 §3.2
A5 (e), §3.7.4)". In `interface BaseWing`, after `ridgeAxis` add "`partName?: string /* a template part's name, above;
absent on every other wing */`". *Reconciliation (S23-15):* the field's lifecycle is volume V03 §2.5's row — kept by every
wing writer on the wing that keeps its key (a re-joined block keeps the lowest key's), absent on a new wing, restored
with the wings on undo, re-derived at load for a template-family building by matching each wing's ring to its template
part, else absent and reported. In `### 11.1 Formats`, the JSON schema row needs no new text: the schema is generated
from the `zod` types, so `partName` rides the wing record of `Building.wings` by construction (volume V03 T-V3-13 checks
the round trip).

**BCR-V3-14 — T28-1 and T28-2: the storey-less plan, structural faces and concealed suites.** Heading: `### 13.2 Per-stage invariants, statistics,
cost-model tests, contract tests, B-EDIT`. Current (T28-2): "openings and stair cores lead to every room of every storey;".
New: "openings and stair cores lead to every room of every storey but a structural face's (roles `stack`, `shaft`,
`column`, V03 §2.4) — a concealed room, for a key that admits its use, from its concealed entrance where it has one (item
63), and a lifted chancel through its choir flights (V03 §3.7.6);". *Second round (item 110 (c); V3C-66; critique/V02.md
V2C-53):* the new text continues "…through its choir flights (V03 §3.7.6), and a wing standing on another (volume 2's
stepped massing) through the exterior flights of its stair chain and its landing door, terrace exit or terrace door
(V03 §3.3 S6);", and in the same bar current "(T28-2) starting at the main entrance" → new "(T28-2) starting at the main
entrance — on a building whose every ground wing is solid, at the landing door of the first storeyed wing its stair
chain reaches (§2.6 *Entrances* rule 5 as BCR-V2-41 amends it; V03 §3.3 S6), and a building with no storeyed wing has no
room above the ground to test, its basement storeys, where it has a basement, reached from the room its outside door at
`basementDoor(b)` opens into (V03 §3.1 step 2; seam S23R2-10) —". *Reconciliation round 4, second brief (seam S23R3-12; J-V3.122):* on the same heading,
T28-1, current "Hard: (T28-1) each room the programme marks hard is present; soft rooms are delivered, folded into a
neighbour or dropped, each with its tier in the report;" → new "Hard: (T28-1) each room the programme marks hard is
present, and soft rooms are delivered, folded into a neighbour or dropped, each with its tier in the report — except on
a building with no storeyed wing, where a room, hard or soft, whose storey rule admits none of its basement storeys is
dropped under `solidMonument` and listed in the report with no tier (volume V03 §3.1 step 2, §3.2 A5 (b), §2.3);".
F-PLAN's tier 1 (§5.2: "§13.2's plan bars fail on the overlay — a hard room missing") reads the bar and follows with no
text of its own. Quotation checked present once in the base by a whitespace-normalised search (scratchpad receipt
rcV3r4b/quote-receipt.txt).

**BCR-V3-15 — declared rooms.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations,
the stage-3 interface`. Mechanism: `interface Building` gains "`declaredRooms?: { role: RoomRole; count: number; storey?:
number }[] /* item 101: rooms the author declares this building must hold; setAttr path declaredRooms (T9 shape); read by
the plan rung as hard programme rooms (V03 §3.2 A2 (7)); in the leaf digest */`". In `### 2.8 Identity, lifecycle,
provenance, the entity registry`, `ElaborationRecord.inputs`' comment **as volume 2's BCR-V2-13 (its reconciliation-round-1 extension)
splits it per rung** (this request applies after it; S23-39), in the **`plan` rung's list**, current
"its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans)" → new
"its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, declared rooms, the wings'
spans)"; the `wings` and `rooms` rungs' lists do not gain it.

**BCR-V3-16 — the toolkit's rows and the `instance` lifecycle for plan rooms** (V3C-43). Heading: `### 7.1 Edits are ordered
events on addresses; the named actions; the edit targets; dry-run validation`, *The authoring toolkit*. Current: "| L2
programme | T6 `place` | `placeAt` (its point form), `assign`, `build`, `drawFootprint` |". New: "| L2 programme | T6
`place` | `placeAt` (its point form), `assign`, `build`, `drawFootprint`, `convert` (`relet`) |". Current (T11's row): "|
L4 finish | T11 `name` | `setAttr(name)`, `moveLabel`, `hideLabel`, `group` |". New: "| L4 finish | T11 `name` |
`setAttr(name)` (a room's name on `plan/rooms/<id>/name`, V03 §4.2), `moveLabel`, `hideLabel`, `group` |". In `### 7.4
Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`, the `instance` row gains, at
its end, "— for an `entity` that is a plan room, the plan-event row applies instead (V03 §4.3)".

**BCR-V3-17 — floor openings.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations,
the stage-3 interface`. Current: "interface Opening { id: Id; wall: Id; at: Cm /* from a */; widthCm: Cm;". New:
"interface Opening { id: Id; wall: Id /* for a floor opening (point set): the host room's nearest wall, for ordering only */;
at: Cm /* from a */; point?: PointCm /* a floor opening's centre — a trapdoor, a hatch, an access head's opening (V03 §3.7)
*/; widthCm: Cm;".

**BCR-V3-18 — entrance portals at the plan's widths.** Heading: `### 11.1 Formats`, the `.dd2vtt` profile. Current:
"`side`, `rear`, `yard` and `service`, each 1.2 m wide)". New: "`side`, `rear`, `yard` and `service`, each the width of its
plan opening where the plan rung exists (V03 §3.6 O3), else 1.2 m)".

**BCR-V3-19 — every access a building hosts is a plan anchor.** Heading: `### 2.6 Buildings, heights and ground datum,
wings, materials, sub-locations, the stage-3 interface`. In `BuildingInput`, current "accesses?: Id[] /* item 64: the
AccessPoints that open in its basement (II.7.3's Basement accesses, declared in II.7.4) — anchors of the plan (step 3) */"
→ new "accesses?: Id[] /* every AccessPoint whose ground.host is this building or its basement, any source or cause —
II.7.3's neighbourhood cellar stair and Basement accesses, a system's own entrance and the crypt join (II.7.6, volume 4),
an undercity lifeline (II.7.5), an access edit (§7.3 item 9) and item 109 (j) (3)'s dug access — anchors of the plan (step
3; V03 §3.7.2) */"; in the plan rung's step 1, current "the basement's accesses (item 64)" → new "the accesses the
building hosts (`BuildingInput.accesses`)"; in `ProgramRoom`, current "| 'core' | 'hearth' | 'passage' /* the passage room:
the span ring (step 1) */" → new "| 'core' | 'hearth' | 'passage' /* the passage room: the span ring (step 1) */ | {
access: Id } /* the room holding an access head, V03 §3.7.2 */"; `interface Plan` gains "`heads: AccessHead[] /* V03 §2.1
*/`". In `### 2.8 Identity, lifecycle, provenance, the entity registry`, `ElaborationRecord.inputs`' comment **as
volume 2's BCR-V2-13 (its reconciliation-round-1 extension) splits it per rung** (applied after it; S23-39), in the
**`plan` rung's list**, current "the accesses that open in its basement (item 64)" → new "the accesses it hosts, each with
its kind, state and knowledge"; in the `stale` sentence, which BCR-V2-13 makes per rung, current "an access into its
basement" → new "an access it hosts, its crypt" — inputs of the `plan` rung only, so neither stales `wings` or `rooms`.

**BCR-V3-20 — the crypt on the basement** (item 109 (k) (2), (6) as revised ~20:05, J111; critique/V03.md V3C-61; the seed named by reconciliation round 2, S23R1-01).
Heading: `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`. In
`interface Basement`, after the `access` field add "`crypt?: { ring: Polygon; edited?: true } /* item 109 (k) (2): the
building's crypt, derived with the basement (Basements, below; volume V03 §3.7.4); carried with the wings by rule 2 (b)
as ring is; edited by setAttr(basement) on basement/crypt/ring; never written by the plan rung */`" (the `kind` union's
`'raised'` is volume 2's BCR-V2-28). In the paragraph *Basements (owner: "selective but appropriate basements"; item 29
(b); J-A29.22, J-A29.24)*, current "none for hovels, tents, sheds, shacks and lean-to shelters;" → new "none for hovels,
tents, sheds, shacks and lean-to shelters; the class row's `crypt` column (volume 11, BCR-V11-13) decides the building's
crypt — `always` (the cathedral, a great temple, and any building a dossier crypt record binds to) takes its basement by
the no-refusal crypt ladder, full, then half, then raised (BCR-V2-28; on a sky island volume 5's rim-slab vault), in place
of the class probability and of the terrain gate's no-cellar rows, a crypt-only basement where its ordinary draw gives
none — the ground wings' whole inset instead where a storeyed ground wing stands but over none of the crypt's vault — its ring before the rank's trim, or the author's ring (volume V03
§3.7.4); `basement` holds a crypt exactly when a full, half or walk-out basement is drawn; `never` none — its ring seeded
under volume 2's `cryptSeedWings(b)` (else the far third), grown to volume 11's `cryptM2` and ranked (the principal crypt, the cathedral's, strictly the largest: every other trimmed
to `crypt.rankShare` × its area, in a closing pass after S11 over the settlement and again whenever the principal's area
changes) as volume V03 §3.7.4 states;". And in *A requested basement (item 66; J-A66.21)*, at its end, add: "A requested
basement of an `always` class keeps its crypt; a crypt ring the author edits is never trimmed by the rank (V03 §4.2); a
crypt ring set by `setAttr(basement)` on a building without a basement makes a crypt-only basement by the crypt ladder
(the ground wings' whole inset where a storeyed ground wing stands but over none of that ring, volume V03 §3.7.4), the
building `always` for that derivation (volume V03 §4.2; V3C-75)." *Reconciliation round 6 (seam S23R5-01; J-V3.127):*
the two clauses on a crypt no stair reaches are added; file f item 238 carries the text by reference, its label
unchanged.

**BCR-V3-21 — the tunnel frontage.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`. Current (in `interface Entrance`): "faces: 'street'|'lane'|'alley'|'yard'|'court'|
'passage'|'footpath' /* the way or part the door opens onto; passage: an item 30 passage face; footpath: a cluster
structure's path (item 70) */;". New: "faces: 'street'|'lane'|'alley'|'yard'|'court'|'passage'|'footpath'|'tunnel' /* the way
or part the door opens onto; passage: an item 30 passage face; footpath: a cluster structure's path (item 70); tunnel: an
underground building's frontage door onto its tunnel run, gallery or undercity walkway (II.7.3, II.7.5; volume V03 §3.12)
*/;".

**BCR-V3-22 — plan addresses in the explainer registry.** Heading: `### 2.8 Identity, lifecycle, provenance, the entity
registry`, the explainer registry as volume 10's BCR-V10-3 adds it ("`interface WhyProvider { kinds: string[];
explain(model: ModelView, id: Id, path: string | undefined, key: Knowledge): WhyAnswer }`"). Mechanism: after it add "An
address whose prefix is `room:` resolves to the kind `room`, whose provider (volume V03 §4.6) resolves it through its
building's plan — stored, cached or derived into the cache as the `plan` query does — so plan parts need no registry
entry (§6.2)."

**BCR-V3-23 — the plan stage's work unit.** Heading: `### 4.12 The strategy interface, stage registration by declared
I/O, and the stage-2 seam (pointer)`. Current: "type WorkUnit = 'plots' | 'buildings' | 'households' | 'landHa' |
'frameCells' | 'latticeNodes' | 'faces' | 'vertices';". New: "type WorkUnit = 'plots' | 'buildings' | 'households' |
'landHa' | 'frameCells' | 'latticeNodes' | 'faces' | 'vertices' | 'moduleCells' /* the plan rung: a storey's piece area
÷ moduleCm², V03 §3.4 */;", with the plan stage's row in `workLimits.json` as volume V03 §2.4 states.

**BCR-V3-24 — door leaves and window kinds are editable.** Heading: `### 7.1 Edits are ordered events on addresses; the
named actions; the edit targets; dry-run validation`. Current: "| { t: 'setOpening'; building: Id; storey: number; wall:
Id; at?: Cm; kind: 'door'|'arch'|'open'|'none' }". New: "| { t: 'setOpening'; building: Id; storey: number; wall: Id; at?:
Cm; kind: 'door'|'arch'|'open'|'none'; hinge?: 0|1; swing?: Id /* V03 §2.1 */ }". Current: "| { t: 'setWindow'; building:
Id; storey: number; wall: Id; at?: Cm; op: 'add'|'move'|'remove' }". New: "| { t: 'setWindow'; building: Id; storey:
number; wall: Id; at?: Cm; op: 'add'|'move'|'remove'; kind?: 'window'|'slit'|'light' /* V03 §2.1 */ }".

**BCR-V3-25 — the levels a wing reaches, in the plan rung and the fourth rung** (item 110 (c); V3C-65 (5)). Heading:
`### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`. (1) The plan
rung's step 1, current: "The wings that reach each storey (`BaseWing.ring` or the composed `Wing.footprint`, with their
`spans`". New: "The wings that reach each storey (a wing reaches the levels of volume 2's `storeyRange`, a solid wing
none; volume V03 §3.3) (`BaseWing.ring` or the composed `Wing.footprint`, with their `spans`". (2) The stage-3 contract's
fourth rung, current: "the union of the plan's rooms equals the union of the **extents** of the wings that reach the
storey —". New: "the union of the plan's rooms equals the union of the **extents** of the wings that reach the storey — a
solid wing (`BaseWing.solid`, volume 2) reaching none —". The capacity's `A(s)`, `Storey.wings`, `Storey.level`'s 0 and
the basement's ring inside the ground wings are volume 2's BCR-V2-33's (as its second revision extends it; from V2C-61 (1)),
cited, never restated.

**BCR-V3-26 — the storey an entrance opens on** (item 110 (a), (c); V3C-66 (3), V3C-70 (2); J-V3.99). Same heading. In
`interface Entrance`, current: "offsetCm: Cm /* along that side; side and offset re-read from the vertex after every carry
(rule 3) */ }". New: "offsetCm: Cm /* along that side; side and offset re-read from the vertex after every carry (rule 3)
*/; storey: number | null /* derived with the entrance, never set alone, after the basement decision: the level (basement levels
included — for the main entrance only where `Basement.access` is not `external`, whose core stops at the ground storey, the
plan rung's step 3) whose floor at its wing meets the outside ground at its vertex within the plan's step tolerance, the nearest where two meet; the main
entrance 0 where none meets (opened with a stoop); null where no storeyed wing stands on the ground (rule 5's exception);
the rule and the tolerance are volume V03 §3.6's */ }". In *Entrances* rule 4, current: "entrances are re-derived when the
designation mutates and kept where an edit fixed them (§7.2)." New: "entrances are re-derived when the designation mutates, and when the ground or the stack beside them or the building's basement (its `access`, `kind` or `floors`) changes — their `storey` with them (volume V03 §3.6) — and kept
where an edit fixed them (§7.2); a side, rear, yard or service entrance whose outside ground meets no level's floor is not
derived, after its draws (volume V03 §3.6)." Rule 5's exception for a building whose every ground wing is solid is volume 2's BCR-V2-41, cited whole (seam S23R4-06; file
f items 230 and 241: rule 5 is carried there; this request carries no rule-5 text). Built at M3a in S11's entrance
derivation, with BCR-V2-41 (volume 3 §8's PE; file f item 241; S23R3-05); S11 derives the storeys — a step with no draw — after the basement decision, whose levels and access they read;
the door and basement draws keep their order on the `siteplan.entrance` concern (§6.1, J-A29.61) (reconciliation rounds
5 and 6; seams S23R4-01, S23R5-03; J-V3.124). File f item 241 carries the text by reference; its label is unchanged.

**BCR-V3-27 — the walk-out at a retaining wall** (item 110 (a); V3C-70 (3)). Same heading, paragraph *Basements*.
Current: "a **walk-out** cellar where the fall under the footprint exceeds the row's `slopeCm` (the same samples
`deriveBase` reads — the skirt facts)". New: "a **walk-out** cellar where the fall under the footprint exceeds the row's
`slopeCm` (the same samples `deriveBase` reads — the skirt facts), or where a footprint side lies on or within
`cellar.insetCm` of a `RetainingWall`'s high side (item 110 (a); §2.7) whose step there (volume 1's `stepProfile`,
BCR-43) is at least half the cellar depth — its outside door (step 3's `external`) then on that side, at `basementDoor(b)`
(volume V03 §3.7.1; BCR-V3-32)". Built at M3a with item 110 (a)'s retaining walls, `basementDoor(b)` with it (volume 3
§8's PE; file f items 242 and 578; S23R3-05). Volume 2's sentence "A walk-out
basement where the plot's low edge is a wall is volume 3's BCR-V3-27 (a) (§2.6's basement rule reading the step there; its
door on that side)" (V2 §3.17 (a), as V02's reconciliation round 3 words it, S23R2-07) points here. The request's parts (b), the deck gate, and (c), the outside door of a stack, are dropped for
volume 2's BCR-V2-34 and for volume 2's BCR-V2-33 (the access external where no ground wing is storeyed; provenance
V3C-82), whose door volume 2 §3.15.3 leaves to volume V03 §3.7.1's tomb door.

**BCR-V3-28 — the outside ground among a plan's inputs** (V3C-71; J-V3.97). Heading: `### 2.8 Identity, lifecycle,
provenance, the entity registry`, `ElaborationRecord.inputs`' comment, as BCR-V2-13 splits it per rung and BCR-V3-19 words
the **`plan` rung's list** (applied after both; S23-39): after "the accesses it
hosts, each with its kind, state and knowledge" add ", the outside ground — the digest of the `RetainingWall`s within
`cellar.insetCm` + `door.mainCm` of the footprint, of the surface samples volume V03 §3.6 W2 reads outside each exterior
wall (the values §4.7's levelled-ground reader `levelledGroundCm` returned there, and its deck, water and roof samples)
and, for a building below ground, of its host chamber's ring and grade faces (volume V03 §3.12 (9))". In the `stale`
sentence, after BCR-V3-19's "an access it hosts, its crypt" add ", a retaining wall, the terrain or a levelled platform's
datum, a deck or the host chamber beside it" — inputs of the `plan` rung only: a retaining wall drawn beside a house
stales its plan, never its `wings` or `rooms` rung.

**BCR-V3-29 — a stacked wing's rooms re-matched by wing-relative storey** (V3C-76; J-V3.85). Heading: `### 6.3
Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`, the anchor table's row. Current:
"| room of a stored plan (§2.6) | centroid within its wing, per storey |". New: "| room of a stored plan (§2.6) |
centroid within its wing, per storey — for a wing standing on another (volume 2's `BaseWing.on`), per its storey counted
from its first level (`s − s₀`, volume V03 §3.3); the address's level part records the level at minting and is never
re-read as the storey |".

**BCR-V3-30 — the plan rung's milestone** (reconciliation round 1; critique/seam-stage2-3-r0.md S23-19; J-V3.109).
Heading: `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`.
Mechanism, applied after BCR-V2-20: a row after BCR-V2-20's M6 row, "`| **M6-P — the plan rung** (volume 3 §8) | P0 the
B-PLAN spike (may run after M4), P1 the rung on any wings, P2 basements, heads, the crypt's plan, concealment,
furnishing and buildings below ground, P3 editing, the click and the clerk, P4 the draw, P5 exports, P6 content and
tuning | volume 3 §8's exits; the owner's twenty-plan review | 17.75–24.25 pw |`"; a line in the effort table after
BCR-V2-20's stage-3 line, "plan rung (volume 3) | 17.75–24.25 | volume 3 §8 (its PE row built within M2b and M3a)".
Volume 3's PE row (§8; S23R3-05; J-V3.116) is built within the base's milestones, not M6-P: M2b's row gains in its
content cell "BCR-V3-12's `R(s)` in *One capacity function* (volume 3 §8's PE)" and 0.25 pw in its estimate, and M3a's
row "volume 3's eager plan facts — `Entrance.storey` and rule 4's non-derivation (BCR-V3-26), the wall walk-out
(BCR-V3-27 (a)) and `basementDoor(b)` (volume 3 §8's PE)" and 0.5–0.75 pw — deltas inside §16's first total (file f
items 567 and 568). §16's total is not restated here: the coherence pass computes it once (file f item 568). In `# Staged by the
owner's roadmap (this document defers nothing)`, the row
"`| stage 3 — manor-style building compositions (after stage 2) |`": its hooks cell, after BCR-V2-20's pointer, gains
"; the plan rung designed to build depth in `docs/volumes/V03-interiors.md` (milestone M6-P, §16)".

**BCR-V3-31 — the plan rung's package** (reconciliation round 1; S23-37; joins file f item 505, applied after
BCR-V2-18). Heading: `## §14 Package and module layout, key interfaces, dependency rules, extension points`. In BCR-V2-18's
`@plat/buildings` line, current "the massing (outline), the composer (compose), composition.json's loaders, the roofscape
and facadeBays" → new "the massing (outline), the composer (compose), composition.json's loaders, the roofscape and
facadeBays, and the plan rung (volume 3: plan() — the programme, the anchors, the partition, openings, heads, the crypt's
plan, furnishing and the plan report; its tables load through @plat/tables, BCR-V3-1)"; in BCR-V2-18's dependency rule,
current "is imported by `render` and `export` for its pure `roofscape` and `facadeBays` only" → new "is imported by
`render` and `export` for its pure `roofscape` and `facadeBays`, and by `export` for the plan's pure readers (the JSON
`plan` block, the `.dd2vtt` and Foundry storey scenes, CityJSON storeys and glTF interiors), only". Where the plan rung
lands before volume 2 (volume 3 §11's Q1 answered yes), M6-P creates the package with the plan rung alone and volume 2's
M6a adds its members.

**BCR-V3-32 — the outside door of an external basement** (reconciliation round 4; critique/seam-stage2-3-r3.md S23R3-01;
J-V3.114, J-V3.115; file f item 578, applied after items 371 (BCR-V2-33) and 242 (BCR-V3-27)). (a) Heading: `### 2.6
Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`, *The plan rung*, step 3.
Current: "`external`, a walk-out's outside stair: the core stopping at the ground storey, a door (an `Opening` of kind
`door`) opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long
(a door's width), whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index) —
where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —". New: "`external`, an
outside stair (BCR-V2-33's external access — a walk-out's, or that of a building with no storeyed ground wing): the core, where
one serves the ground, stopping at the ground storey, a door (an `Opening` of kind `door`) opens the basement at the
point volume V03 §3.7.1's `basementDoor(b)` gives — on a side of `Basement.ring` at least two of step 4's wing-local
modules long (a door's width) — and, where the building has a crypt and a storeyed ground wing, one whose door lies off
the crypt (its ring and capped bays; volume V03 §3.7.1): a retaining wall's side first, else, where no ground wing is storeyed, the tomb door's, else the side
whose outside ground samples lowest on `levelledGroundCm` (ties by ring index); a pure function of eager records,
implemented in `@plat/plots` — where it gives none, the basement is joined by the `trapdoor` fallback above, reported
—". (b) Heading: `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`, T28-3. Current:
"or, for a walk-out, where no side of the ring is long enough for its door (§2.6's fallback, step 3; J-A29.25) — or, for
any other walk-out (`Basement.access` `'external'`), by its outside stair;". New: "or, for an external access, where
`basementDoor(b)` gives no door (§2.6's fallback, step 3; J-A29.25) — or, for any other external access (a walk-out, or a
building with no storeyed ground wing), by its outside stair at `basementDoor(b)` (volume V03 §3.7.1);". `basementDoor(b)`
itself is built at M3a with BCR-V3-27 (a) (volume 3 §8's PE; file f item 578's BASE label), so volume 1's entrance
reserve (M5) calls it; the step-3 and T28-3 texts are the plan rung's (M6-P). Both quotations checked present once in
the base by a whitespace-normalised search (scratchpad receipt rcV3r4/quote-receipt.txt). *Reconciliation round 5 (seam
S23R4-03; J-V3.125):* the crypt clause of the new step-3 text reads `Basement.crypt`, which exists from M6-U (file f item
238); before it the clause is inert, and its first reading moves such a church's door once, declared in M6-U's shift
record with the crypt's first derivation (volume 3 §8's PE). File f item 578 carries the text by reference; its label is
unchanged.

**BCR-V3-33 — the plan soft band's fallback never moves the capacity** (reconciliation round 4, second brief;
critique/seam-content-calibration-r3.md SCC-R3C-8; J-V3.123). Heading: `### 13.7 Thresholds without a reference source
(IMP-6, DEF-1; D-30)`, the row *item 28 plan soft bands*, its fallback cell. Current: "the layout pattern's circulation
value (a `RoomProgramRow` cell) steps once toward the band's centre and the measurement repeats". New: "the layout
pattern's circulation value (a `RoomProgramRow` cell) steps once toward the band's centre and the measurement repeats —
never the cell of the class's programme at the band set's poorest band, which §2.6's capacity reads (J-A28.28): a miss
there is reported and the cell stays (volume V03 §2.4's register lines)". Staged with the plan rung (M6-P), whose intake
runs the band; the capacity's two cells are never tuned — each class row's poorest-band `circulation` on V12 §3.11's default line from
M2b, the `room` role's area on its `area` column's entry, written at M2b by that line and restated in place at P1 by
volume 3 §2.4's first register line, measured there, never tuned (seam SCC-91). Quotation checked
present once in the base by a whitespace-normalised search (scratchpad receipt rcV3r4b/quote-receipt.txt).

## 11 Owner questions

1. **Product order: may interiors come before the manor-style buildings?** The owner's order is city → neighbourhoods →
   buildings → plans (item 28 (d)). The plan rung needs only the walls of a building, which the base already makes, so
   plans could appear on every building right after the base's hardening milestone (M4), and pick up the manor-style
   compositions later with no rework (volume 2's façade-bay function and constants are then built first as its own item,
   moved forward from its M6b and priced there; S23-36).
   **Recommendation: yes** — build P0, P1 and P3 on the base's buildings after M4, P2 once volume 4's access records
   exist, and add the composed wings when volume V02 lands; the owner sees floor plans months earlier. If the owner keeps
   the order, P1–P6 simply start after V02 (§8), with only the P0 spike earlier.

The revision raised no new owner question: the critique's 64 findings are design repairs inside this volume and its base
change requests, and the owner's ~20:05 crypt and catacomb ruling (J111) is applied as ruled (3.7.4–3.7.6). The one
choice near the owner's rule — an author may remove the cathedral's crypt, which the plan then keeps and announces
(J-V3.47) — is recorded as a vetoable decision, because item 101 makes everything editable.

The second round raised none either: item 110 is the owner's ruling (~23:30, raised ways as revised ~23:40), and every
choice it left open is a vetoable decision (J-V3.80 – J-V3.100). A cistern inside a mole fort would need volume 2's
J-V2.68 amended; item 110 (d) names no such need, so nothing is asked (critique/V03.md V3C-84 (3)).

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on 2026-09-28, text against text):** every base citation — the records, steps, ladder, capacity,
events, rows, budgets and bars this volume cites were read in `docs/ARCHITECTURE.md` as it stands after the amendments c–e
pass and the hand-fix (unchanged since 16:19 on 2026-09-28); the 41 quotations of section 10 were checked present in the
base by a whitespace-normalised search (each found once; "the seven plan events" four times, as BCR-V3-3 names);
volume 2 as revised and landed at 22:06 (`facadeBays`, `DormerRow`, `WingRole`, BCR-V2-27's wing keys, §3.8's rooms and the
hall's court door, §3.14.5's crypt seed wings and lift, BCR-V2-28); volume 4 as its revision stood at 22:12 (`AccessCause`
and the new sources, BCR-29/30; the catacomb entrance, V4 §3.5.1 (9); U-ACCESS's crypt join, dig and wells, §3.5.7 (c),
(d), (f)); volume 11's landed registry (`templateFamily`, `split`, `staff`, the families and specialisations) and
critique/V11.md V11C-02's crypt column (`always` / `basement` / `never`, `cryptM2`, `crypt.rankShare`, BCR-V11-13); volume
5's rim-slab vault (V5 §3.10 (5)); item 109 (k) (2) and (6) as revised ~20:05 and J111; the Dwellings capability matrix's
sum (20.0 pw) and the dropped rows' sum (5.5 pw), computed from docs/confidence/dwellings.md §2; the Dwellings facts used
as descriptive baselines (programme realisation 79 of 157, stair floor-pair failures, window density, prop-density
ordering) as the research files' CONFIRMED rows, cited by file and section and used as ideas only.

**PLAUSIBLE until executed:** every mechanism, default row and number this volume adds — the resolution tables, the role,
class, family, slot, class-id and village rows, the allocation, fill and fit ladder, the shared-access strip, the anchor
scores, the cut machine, the door, window and head rules, the crypt's growth and rank, the crypt stairs and choir flights,
furnishing, the budgets split and the estimates — until P0–P2 measure them on B-PLAN (§8), with the pre-decided fallbacks
of §6 and §3.9; the historical readings behind the new rules (a shared stair hall giving each family its own door, a unit
floor of 9–60 m², crypts entered from the nave, raised choirs over crypts on wet ground, ledger slabs in a church floor)
are general knowledge, not corpus-witnessed; the CityJSON 2.0 types (`BuildingStorey`, `BuildingUnit`, `BuildingRoom`) are
to be checked against the schema at P5 (T-V3-13 validates). Volume 4's and volume 11's revisions had not landed when this
revision was written: where their final text renames a field this volume reads (`AccessPoint.cause`, the crypt column's
values, `crypt.rankShare`), this volume follows theirs (§13's hand-offs). The retrovalidation files were searched for
findings naming the plan rung; none is open against it (RV-pc-9's household-roster wording is already fixed in §10.2), a
search, not a proof.

**Second round (2026-09-29, item 110).** CONFIRMED, read this run text against text: critique/V03.md §12 whole (V3C-65 –
V3C-84, with §12.9's routing and §12.10's reconciliation); volume 2 as landed at 23:54 (md5 260622bb…, unchanged since):
its records and derived functions (V2 §2.6: `TierCells`, `TierInput`, `TierLay`, `DeckContext`, `deckLevel`,
`storeyRange`, `stairChain`, `landingSide`, the lifecycle table and the new roles), V2 §3.15.1 – §3.15.6, §3.16, §3.17,
BCR-V2-31 – BCR-V2-39, J-V2.66 – J-V2.78 and the X-rows X1 – X26; critique/V02.md §11 (V2C-47, -53, -55, -57, -59, -61,
-66, -67, -68 and §11.7's routing and reconciliation, which adopts V3C-82's condition and withdraws V3C-66 (3)'s shrine
door); critique/V04.md §8 (C4-110-1, C4-110-2, C4-110-8 with its note, C4-64, C4-65); item 110 of file g (lines 599–653)
as revised ~23:40; volume 11's `HeightsRow` (V11 l. 418–420), `conduit_house` (l. 1109) and `arena` (l. 1025), and 0 hits
for `stepped_temple`, `terraced_palace` or `tiered_tower` (hence the `'*'` rows); the base's `Entrance`, `Basement`,
`Storey`, `Chimney`, `BuildingInput`, *Entrances* rules 1–5, *Basements*, *A requested basement*, the plan rung's step 1,
the fourth rung, `ElaborationRecord`, §6.3's plan-room anchor row and T28-2 — the eleven new quotations of BCR-V3-25 –
BCR-V3-29 and BCR-V3-14's second-round text each found once by a whitespace-normalised search. PLAUSIBLE: every new rule,
row and number of the round (the level reading's edge cases, chain cores and prefixes, S6's joins, terraces and their
walkability, the stacks' carry, the exposure gates and entrance storeys, the tomb door, the grade-face fallback, the
budgets and the 1.75–2.5 pw added) until P1–P2 run them on the stepped, terrace, deck and vault fixtures; the historical
readings (hill-town houses entered from two streets, walk-outs at a terrace edge, arch-vault fronts bricked in with a door,
windows and a flue, tomb doors at a stepped platform's foot, a one-room temple-top sanctuary, stoops) are general
knowledge, not corpus-witnessed. The findings this round read as routed have landed: volume 2's BCR-V2-41 and
BCR-V2-42, V2C-55's chimney draw, V2C-59's `ovalCourt` and V2C-61's `Storey.level` are read as landed (V02 md5
dc951b81…; reconciliation round 3, S23R2-05); critique/V04.md's `archVault` chambers and grade-face marks and volume
11's stepped class ids are read as their volumes state them (V04 §3.5.4 (d) and IN-V04-4's `gradeFaces`; V11's
`specialisation` values `stepped_temple`, `terraced_palace`, `tiered_tower`); where a landed text differs, this volume
follows it (§13). Clean-room: item 110 came from a study-only assessment (J114); no identifier,
name, list or table of it, or of the Dwellings reference, appears in this round's text.

**Reconciliation round 1 (2026-09-29).** CONFIRMED, read this run text against text: critique/seam-stage2-3-r0.md
S23-06, S23-10 – S23-20, S23-26, S23-27, S23-33 – S23-39 and J-S23.2, J-S23.5; critique/seam-time-r0.md ST-39; V02 §3.8
(the `rooms` rung, its emission rule and room ids), §3.11 (`wingsInputs`, the building click's order), §3.13
F-COMPOSE (3), §4.6 (3) (roof edits on a stack), ST4 (the top tier's `flat` roof under a shrine), BCR-V2-18 and
BCR-V2-20; V06 §3.18.3 (2)–(4), J-V6.62 and T-V6-55; V01 V1-3.8.1; the base's `ElaborationRecord` (§2.8), the stage-3
staged row, §14's and §16's headings; file f items 234, 235, 237, 238, 261, 263, 305, 474, 505 and 524 — the eight
current texts BCR-V3-15, -19, -30 and -31 quote, and the three volume 2 sentences 2.2, 3.4a and A2 (11) lean on, each found
once by a whitespace-normalised search (scratchpad receipt rcV3/quote-receipt.txt). PLAUSIBLE: the new mechanisms (id minting, the omitted gate hall's ring, the capped bays' undercroft and a
rank recomputed from the step-2 ring, the furniture bend's storey order, the dwelling-row list) until P1–P3 run them on
B-PLAN; BCR-V2-13's per-rung split, BCR-V2-28's half-cellar raise and file f item 305's deck bend read as landed (V02 md5
c459dd4d…, file f 40e2f8d6…; rechecked at V02 58bebf4e…, file f a2b438e3…; reconciliation round 2, S23R1-09).

**Reconciliation round 2 (2026-09-29).** CONFIRMED, read text against text this run (scratchpad receipt
rcV3r2/quote-receipt.txt): volume 2's `cryptSeedWings(b)` (V2 §2.4, stated once in V2 §3.14.5 (c); J-V2.92), `facadeBays`
on every side (V2 §2.4, §3.7; J-V2.93), `stairTreads(w)` (V2 §2.6, read by V2 §5.6; J-V2.90) and `composition.classFamily`
keyed by the `v.` keys (V2 §3.10.5 as its reconciliation round 2 re-keys it; J-V2.96); V07 §2.4's twenty-five `v.` keys
and V11 §2.9's namespace; file f items 305 and 568. The edits are citations and a key rename: no mechanism of this volume
changes but the crypt's seed (now exactly volume 2's function, so a ranged church's crypt lies under its chancel and a
stepped temple's in its tier 0 instead of the far third — a behaviour shift against the round-1 text, never shipped), the
windows on gables and towers (now on volume 2's bays with its deductions for meeting wings and towers), the exterior
flights' tread count (now volume 2's) and the programme of the village buildings, which found no row before. PLAUSIBLE
until P1–P2 run on B-PLAN and the village fixtures: that `v.bakehouse` and `v.shop`'s rows and the `classFamily` fallback
give every village building a sensible room set (T-V3-1's `v.` clause is the bar).

**Reconciliation round 3 (2026-09-29).** CONFIRMED, read text against text this run: volume 2 at md5 dc951b81… —
BCR-V2-33 (whose *Basements* sentence volume 2's reconciliation round 3 brought to "external where no ground wing is
storeyed", J-V2.99, S23R2-03), BCR-V2-41, BCR-V2-42, V2
§2.1's `ovalCourt`, §2.6's `DeckContext.surfaceCm` null on the bank and §5.2's plan chimney at `Chimney.levels[1]`; file f
items 230, 241 (rule 5 carried by BCR-V2-41; BCR-V3-26's rule-5 text dropped) and 263; volume 5's BCR-V5-30 (the one
reader `levelledGroundCm(doc, key, p)`, the raster kept unlevelled) and its §1b row; V04 §3.5.4 (d) and IN-V04-4; V11's
stepped `specialisation` values. Every edit applied by exact-string replacement with each anchor asserted unique
(scratchpad rcV3r3/edit*.py). The edits are citations and one reader: no mechanism changes but W2's ground reads — now
the platform datum on a levelled plot where a raster read would give the unlevelled slope (the rule's intent since the
second round; never shipped) — and the plan's stale trigger, which now includes a levelled platform's datum (J-V3.113).
PLAUSIBLE until P1 runs on the terrace-wall sub-fixture: that T-V3-30's new clause catches a raster-sampling build.

**Reconciliation round 4 (2026-09-29).** CONFIRMED, read text against text this run: critique/seam-stage2-3-r3.md
S23R3-01 – S23R3-08 whole, with J-S23R3.2, -3 and -5; the base (md5 01fea21f…) at §2.6's plan step 3 and *Basements*,
§13.2's T28-3, II.6's access reading and II.7.4's `state` comment, §8.2's access row and §16's M2b and M3a rows — the two
quotations of BCR-V3-32, both headings, BCR-V3-27's current text and the two milestone rows each found once by a
whitespace-normalised search (scratchpad receipt rcV3r4/quote-receipt.txt); file f (md5 d9a7d9f3…) items 230, 233, 241,
242, 567, 568 and 578 as the base-change lane's round 4 labels them (PE in M2b and M3a; BCR-V3-32 under item 578); volume
1's `stepProfile` (its BCR-43), V1-3.8.2 step 5's reserve and V1-3.8.8 with J-V1.93; volume 2's BCR-V2-33 as its round 3
words it (J-V2.99). Every edit applied by exact-string replacement with each anchor asserted unique (scratchpad
rcV3r4/edit*.py). PLAUSIBLE until executed: `basementDoor(b)`'s three rules, its `2 × cellar.insetCm` ring test and rule
3's outside sample (J-V3.115), and PE's split of 0.25 and 0.5–0.75 pw between M2b and M3a, until M3a runs T-V3-30's
walk-out clauses on the terrace-wall sub-fixture's and a hill fixture's eager records. Behaviour: rule 3's outside sample
can put a fall walk-out's door on another side than the base's step-3 text would (J-V3.115) — a shift against an unbuilt
text, no golden moves; building PE at M2b and M3a removes the one-time shift of capacity, entrance sets, storeys and
walk-outs a build at M6-P would have caused (J-V3.116).

**Reconciliation round 2, second brief (2026-09-29).** CONFIRMED, read text against text this run:
critique/seam-stage2-3-r1.md's S23R1-24 whole (§3.6 item 5 and §4); volume 1 (live text) at V1-3.7.1's opening pass —
its selection by `AccessPoint` source, role, kind and `cause.system`, with no read of `Basement.crypt` — and at T-V1-47's
"0 places or pins for crypts", the one volume 1 text that reads the crypt; the four edited sentences found once each
and replaced by exact string with each anchor asserted unique (scratchpad rcV3r2b/edit1.py); SR1-06's village rows
(2.4), the `composition.classFamily` fallback and A2 (4)'s dwelling list found in place by `grep`, no stale village id
(`longhouse`, `farmstead`, `yeoman_house`, `manor_house`, `parish_church`, `parsonage`) left as a class key. No
behaviour changes: the edit corrects a reader list; no generation, test or golden moves.

**Reconciliation round 3, second brief (2026-09-29).** CONFIRMED, read text against text this run:
critique/seam-stage2-3-r2.md's S23R2-10 and S23R2-15 rows and critique/seam-content-calibration-r2.md's SCC-R2C-17,
SCC-R2C-13 and SCC-R2C-4 rows with its closing PLAUSIBLE note (V03 may take the default line instead); volume 2's
§3.15.4 `stepped-temple` row (`top` flat .2, shrine .8 at the poor anchor) and §4.6's `tiers` op (`top?: 'flat' |
'shrine' | 'roofed'`); volume 1's V1-3.8.2 step 5 (the stack-hosted access's reserve at `ground.at`'s projection),
V1-3.8.3's digest (the `basementDoor(b)` value and `ground(b)`), J-V1.75 and J-V1.96; V2 §3.10.10's register-line form
and bar registrations; V12 §2.1's `BenchBarDef`, §2.6's `CalibrationEntry` (a §13.7 letter's `threshold` target distinct
from a column's), §3.11's default line and *Milestone exits*, §3.7.2 (4) and X-V12-16; V11 §3.1's row 38 (readers "the
plan rung (V03; lazy, a module reader)") and its *Readers* paragraph; file f items 233 and 483. Every edit applied by exact
string with each anchor asserted unique before any replacement (scratchpad rcV3r3b/edit0.py – edit8.py); volume 2's live BCR-V2-33 and BCR-V2-41 (its round-3 continuation, 10:24: the
storey-less stack's plan and door as 3.1 step 2 and `basementDoor(b)` state); doc_checks with
the base's headings: C1, C2 and S1 0, C4 2 (pre-existing), S2 31 → 49 (volume pointers `V12 §3.11` and `V12 §5.5`, this sentence's two among them), C3
424 → 466 (section-number runs and generic phrases). PLAUSIBLE until
executed: T-V3-35's thresholds (0.90, 0.95, 1/90, 0.10; `own`) until P6 measures them; that V12's registration accepts
`stages` `[]` (it types the field `string[]` and states no non-empty rule); the realism of heading a dug access in a
crypt-only basement's undercroft or crypt (J-V3.119). Behaviour: V03 is unbuilt, so planning a flat-topped monument's
crypt and its heads, and the register lines, move no golden and no shipped output.

**Reconciliation round 4, second brief (2026-09-29).** CONFIRMED, read text against text this run:
critique/seam-stage2-3-r3.md's continuation §7.3 – §8 (S23R3-09 – S23R3-17, the V03 rows whole, with S23R3-10's V01
half and S23R3-13's file-f half read for the seam) and critique/seam-content-calibration-r3.md's SCC-R3C-8 row with its
PLAUSIBLE note; the base's T28-1 and T28-2 (§13.2), *One capacity function* (§2.6: `minRoomCm2` and the circulation share
"both read from one row — the class's programme at the band set's first, poorest band"), §13.7's item-28 row and
F-PLAN's tier 1 (§5.2), each quotation found once by a whitespace-normalised search (scratchpad
rcV3r4b/quote-receipt.txt); volume 2's §3.15.1 ST6 ("the ground wings — tier 0 and stair 0 — tile"), §4.6's approach
strip and `stairChain`'s declaration (V2 §2.6); every edit applied by exact string with each anchor asserted unique before
any replacement (rcV3r4b/edit1.py – edit3.py, and two single-anchor fixes: the ST6 section number and a reworded
definition); doc_checks with the base's headings: C1, C2 and S1 0, C4 2 (pre-existing), S2 49 → 53 (four more `V12 §3.11`
volume pointers), C3 466 → 493 (section-number runs, generic phrases and the stand-in banner, none an identifier). PLAUSIBLE until executed:
that `stackAccessDoor(b, a)`'s admissibility (one module from each end of a door part, the span one module clear of the
approach strip) leaves an admissible point on tier 0 of every shipped stepped row — the fallback is reported where it
does not, and T-V3-22's new fixture measures it from M3a; that no corpus frame at M-CAL targets the capacity's two cells
(as for PE's cells, J-V3.118); the realism of a walk-out's basement reached only from its outside door (the base's own
reading, J-A29.25). Behaviour: V03 is unbuilt and BCR-V3-14's T28-1 text and BCR-V3-33 change plan-rung bars before any
shipped output reads them, so no golden and no shipped output moves; the capacity's cells keep their values.

**Reconciliation round 5 (2026-09-29).** CONFIRMED, read text against text this run: critique/seam-stage2-3-r4.md §4
(S23R4-01, -03 and -06 whole, with J-S23R4.2, .3 and .5) and critique/seam-content-calibration-r4.md's SCC-91 row with
its note; the base's J-A29.25 (the `external` core stopping at the ground storey; a programme row's `basementAccess`
naming `core` or `trapdoor` only), §2.6 step 3's current text and T28-2's `external` clause (scratchpad
rcV3r5/base-receipt.txt); V12 §3.11's later-line rule (a later named line restates the default line's one entry in
place, never a second entry) and its lint on two entries for one knob; volume 2's BCR-V2-41 (the stair chain's foot,
tier 0's front side on a sealed stack); `door.mainCm` 120 and `moduleCm` 50 in 2.4's `PlanGeometryRow`; every edit
applied by a whitespace-normalised match asserted unique before any replacement (rcV3r5/edit1.py, edit2.py and
follow-up single-anchor fixes; the whole change in rcV3r5/diff.txt); doc_checks with the base's headings: C1, C2 and S1 0, C4 2 (pre-existing), S2 53 → 62 (nine more
`V12 §3.11` volume pointers), C3 493 → 520 (generic phrases, section-number runs and the stand-in banner, none an
identifier). PLAUSIBLE until executed: the frequency of the downhill-fronted walk-out house and of the walk-out church
whose low side lies on its crypt (the seam's grading); that the door point's slide keeps a door on the low side of most
such churches (T-V3-23 (j)'s fixtures measure it from M6-U; the `trapdoor` fallback is reported where it does not);
that a stoop of about fourteen risers reads well at the building band (P4's visual bars); that the crypt clause fits
inside M6-U's 0.25 pw for the crypt derivation. Behaviour: V03 and the base's M3a and M6-U are unbuilt, so no golden and
no shipped output moves; the one-time move of a walk-out church's door, and of volume 1's reserve with it, at M6-U is
declared there with the crypt's first derivation (§8's PE).

**Reconciliation round 6 (2026-09-29).** CONFIRMED, read text against text this run: critique/seam-stage2-3-r5.md §3.2,
§3.3 and §4 (S23R5-01 – 03 whole, with J-S23R5.2, .3 and .5) and critique/seam-content-calibration-r5.md's SCC-106 row;
volume 2's BCR-V2-33 (the access `external` for a walk-out or where no ground wing is storeyed, else the programme row's
`basementAccess`); the base's J-A29.61 (one concern `siteplan.entrance` for the door and basement draws) and §6.1's
concern row; V12 §3.11's later-line rule (a closed entry restated only under a new major table version, V12 §4.2), §4.2's
register verb (a status never returns to `provisional` but under a new major table version) and V12's due-table row
mapping M6-P to `M-CAL/M6-P`; this volume's 2.1 list of derived pieces, which states the capped bays' reading (so
S23R5-02 (c) was widened, not swapped); V03's md5 at the start equal to the seam's input (e60491e3…); every edit applied
by a whitespace-normalised match asserted unique before any replacement (rcV3r6/edit0.py – edit11.py; the whole change in
rcV3r6/diff.txt); doc_checks with the base's headings: C1, C2 and S1 0, C4 2 (pre-existing; the first pass's three new list-word lines — generic words, no copied list — reworded away), S2 62 →
65 (three more `V12 §3.11` volume pointers), C3 520 → 550 (section-number runs, generic phrases and the stand-in banner,
none an identifier; rcV3r6/dc-before.txt, dc-final2.txt). PLAUSIBLE until executed: that the
annex temple's crypt lies under no storeyed wing in the fixture as built (T-V3-23 (j) holds either way from M6-U —
stair-entered, by its crypt stairs, or not, by one crypt join); that a flight laid inside the part of the vault a level-0
room stands over fits (3.7.6 (a)'s kinds, then tier 6, flagged); that the closed vault leaves every cellar of a capped
walk-out church reached (T-V3-23 (j)'s new clause, the core's bay and the trapdoor kept outside the vault). Behaviour:
V03 and M6-U are unbuilt, so no golden and no shipped output moves; the whole basement of a crypt no stair reaches is
M6-U's first derivation, which M6-U's shift record already declares.

## 13 Fix list

**Deliberately left for later:** none. Every one of critique/V03.md's 64 findings was fixed in this volume or in its base
change requests (the disposition table is appended to the critique); no minor was deferred.

**Cross-volume hand-offs** (not deferrals: each is a sibling revision's side of a rule this volume states, listed so the
manager routes it):
* **revise-V4.** The crypt join (V4 §3.5.7 (c)) reads `Basement.crypt` (BCR-V3-20), never "a crypt room (V03's role)";
  its sentence "A church without a crypt room (V03's floor-vault fold on wet ground) draws nothing" reads "A building
  without `Basement.crypt` draws nothing" — the fold is gone (J-V3.44). V4 §3.5.1 (11) and §2.3a: a dossier crypt record
  binds to its church building, which makes it `always` (3.7.4), not to a plan room. The catacomb entrance's host row
  ("`AccessHostRow` catacomb → nave for a chapel host") stands as 2.4 writes it. Volume 4 writes the underground
  buildings' `Entrance.faces` `tunnel` (BCR-V3-21) and their ruin chambers' column points (3.12 (6)).
* **revise-V11.** The `crypt` column's three values and meanings, `cryptM2` by class and band, and `crypt.rankShare`
  (default 0.8) are volume 11's rows (V11C-02), read here; its compile bar keeps every `always` class's smallest `cryptM2`
  above every `basement` class's largest. The class-id rows here read `BuildingClassRow.staff` with this volume's
  `staffSleepIn` cell, and `split.works` / `split.shop` as template families with rows in 2.4.
* **revise-V6.** An epoch that changes a church's basement, class or the principal's area re-runs the crypt derivation
  and the rank pass (3.7.4 (3)); a crypt never shrinks below an `edited` ring.
* **revise-V1, V10, V9.** Volume 1's no-place, no-pin rule for crypts reads `Basement.crypt`; volume 10 registers this
  volume's `room` provider and resolves `room:` addresses by BCR-V3-22; volume 9's tool rows and panels host this volume's
  plan panel, switcher and `roomNumbers` key (4.5).

**Second round (item 110).** Deliberately left for later: **none** — critique/V03.md's twenty item-110 findings are fixed
in this volume or its base change requests (the disposition table is appended to the critique); two sub-points are ruled
by evidence rather than built: V3C-65 (4) and V3C-69 (1)'s `stepped-monument` row (a ruin's monument is volume 4's
chamber record and has no plan, 3.12 (10), J-V3.96), and V3C-66 (3)'s shrine door, withdrawn by critique/V02.md V2C-53 in
favour of S6's root landing door (J-V3.91). **Cross-volume hand-offs** (each a sibling's side of a rule stated here; for
volumes/_integrate and the sibling revisions now running):
* **volume 4.** The crypt rewording of V3C-74 and C4-64 (1)–(5): V4 l. 192 "it reads `Basement.crypt` (V03 §3.7.4,
  BCR-V3-20) only for the crypt join"; l. 326 and 659 "its church building, which the record makes `always` (V03 §3.7.4);
  the crypt is that building's `Basement.crypt`"; l. 342 "V4 §3.5.7's crypt join reads its `Basement.crypt`"; l. 765
  "basements and `Basement.crypt` (read)"; l. 1220 "binds to its church building (`always`, V03 §3.7.4)"; l. 1329 "A
  church-class building whose `Basement.crypt` ring lies over a catacomb element in plan, or within `accessReachM` …"; l.
  1336 "its head in the crypt (V03's `AccessHostRow` catacomb with cause `crypt` → crypt)"; l. 1337 "A building without
  `Basement.crypt` draws nothing." — with V04's own model-level bar matching T-V3-23 (g). The join's head stays in the
  crypt where a solid stack's crypt is entered by the tomb door. `archVault` chambers (C4-110-1) record their grade faces
  (`gradeFaces`: the ring sides open to ground part 0; until then 3.12 (9)'s fallback), and a building seated in one
  takes its frontage entrance on a grade face with `faces` `street`, `lane`, `alley` or `yard`, never `tunnel`;
  `ruinColumns` (C4-64 (5)) feeds 3.12 (6).
* **volume 2 (volumes/_integrate).** BCR-V2-33's external-access condition (the access external where no ground wing is
  storeyed; from V3C-82; V02 IN-V02-2 (a), BCR-V2-33's own sentence brought to it by seam issue S23R2-03), with V2 l. 1890's pointer
  reading "volume 3 placing its door by its tomb-door rule (V03 §3.7.1)"; V2 §3.17 (a)'s walk-out sentence pointing at
  BCR-V3-27 (a); critique/V02.md V2C-55's roofscape drawing a plan stack at `Chimney.levels[1]` over its column (closes
  V3C-68 (3)); V2C-61's `Storey.level` wording and J-V2.85, which 3.3's storey heights read; V2C-53's BCR-V2-41, landed and
  carrying rule 5 (file f items 230 and 241; BCR-V3-26 carries no rule-5 text); the `tiers` op's dry run listing this volume's orphaned rooms (4.2).
* **volume 6.** V06 l. 1783 "volume 3 `Basement.crypt` (derived with the basement; the plan draws it)" and l. 2106
  "V03's `Basement.crypt`"; an epoch that levels a terrace, raises a retaining wall or adds a raised way marks the
  neighbouring plans stale by BCR-V3-28's digest; an epoch-added raised way's vault buildings are planned by 3.12 (9);
  tiers added over epochs re-match by BCR-V3-29.
* **volume 1.** V01 l. 1211 "a crypt is `Basement.crypt`, a basement fact (V03 §3.7.4, BCR-V3-20)".
* **volume 9.** V09 l. 2715: `drawChamber`'s bend inside a church-class footprint emits `setAttr { path:
  'basement/crypt/ring', value: <the drawn ring clipped to the building's crypt region> }` and previews the ladder's form
  (4.2); l. 223 and 1627 read "the crypts (`Basement.crypt`, V03 §3.7.4)" for "crypt rooms"; T9's tier controls preview a
  removed tier's orphaned rooms; the raised-way removal preview lists the vault buildings' stored plans; the storey
  switcher's stack names (4.5).
* **volume 10.** Register item 110's why causes (4.6): `landingDoor`, `terraceDoor`, `terraceExit`, `seatingExit`,
  `walkOut`, `tombDoor`, `gradeFace`, `deckNoCellar` (S23-17), `stoop`, `exposure`, `stackCarried`.
* **volume 11.** Name the class ids that carry `stepped_temple`, `terraced_palace` and `tiered_tower` (the `'*'` rows then
  move under them unchanged); `HeightsRow.storeyCm` is read by 3.3; the `conduit_house` and `arena` programme rows are this
  volume's (2.4).
* **volume 12.** Both known-city fixtures are in B-PLAN's click set from P1 (§7).

**Reconciliation round 1** (critique/seam-stage2-3-r0.md; critique/seam-time-r0.md). Deliberately left for later:
**none** — the fourteen issues routed here (S23-11 – S23-16, S23-18, S23-26, S23-27, S23-34, S23-36, S23-37, S23-39,
ST-39: 8 majors, 6 minors) are fixed in this volume, and so are this volume's halves of S23-17 and S23-19, which the
workflow routed to the base-change lane (J-V3.110). **Cross-volume hand-offs** (each the other side of a rule stated
here; for the sibling reconcile lanes and the next seam round):
* **volume 1.** V1-3.8.1 adds "a click on a building at these bands is this click (V03 §4.5)" (S23-18).
* **volume 2.** F-COMPOSE (3) reads "… then omitted — volume 3's A2 (11) places that role itself" (S23-27); §8.3's M6b
  row notes that `facadeBays`, `endMarginM` and `bayM` may move forward under volume 3's Q1 order, then exported from
  `@plat/plots` (S23-36; BCR-V2-18's line names them there in that case); §2.1 and §2.5 name `partName` and its writers
  as this volume's §2.5 row states (S23-33); V2 §1b's bend list registers `bend.deck.basement` (S23-17); BCR-V2-28's
  half-cellar raise (S23-10) and BCR-V2-13's per-rung inputs (S23-06), which 3.3's datum and BCR-V3-15, -19, -28 read.
* **base-change lane (file f).** Items 235, 237 and 263 note that BCR-V3-15, -19 and -28 apply after item 261
  (BCR-V2-13), to the `plan` rung's list (S23-39); item 305 carries the deck bend as S23-17 words it; item 568 computes
  §16's total once, with items 474 and 524's lines and BCR-V3-30's M6-P line (S23-19); item 505 carries BCR-V3-31 after BCR-V2-18 (S23-37).
  S23-20's relabel of items 226, 234 and 238 is that lane's; its V03 half — P2 dropping `Basement.crypt`'s derivation and
  rank pass, re-priced, with T-V3-23's model-level clauses moving to M6-U — follows once the label lands (J-V3.110).
* **volume 6.** V6 §3.18.3 (3) cites the rank as 3.7.4 (3) now states it (crypt ring only, capped bays as undercroft,
  re-grown when the see returns); nothing there changes (ST-39).
* **volumes 9 and 10.** `bend.deck.basement`'s line and the cause `deckNoCellar` replace the deck refusal and
  `deckRefusal` (S23-17); the furniture bend's line (S23-26); the district-band click selects a building without its plan
  (S23-18).

**Reconciliation round 1 — the base-change lane's edits in this volume** (volumes/reconcile-BASE-F-r1, 2026-09-29; J-V3.110's
hand-off). S23-20's V03 half, applied after file f relabelled items 226, 234, 238 and 436 (`Basement.crypt`, the crypt ladder, the
seed rule and the rank: BASE design, built at M6-U; template part names BASE at M3a): P2 no longer builds `Basement.crypt` with
the rank pass or BCR-V3-20 (the crypt's plan, columns, stairs and choir flights stay), re-priced 3.25–4.5 → 3–4.25 pw; the
volume's total reads 18.5–25.25 pw in §8, its parity paragraph, *Where in §16's order*, BCR-V3-30 and the ledger; BCR-V3-9's
model-level T-V3-23 clauses run from M6-U. File f item 567 cites BCR-V3-30 as the M6-P row, item 568 computes §16's totals.

**Reconciliation round 2** (the round-1 seam issues S23R1-01, -02, -03, -07, -09 and SR1-06). Deliberately left for later:
**none** — five majors and one minor, all fixed here. **Cross-volume hand-offs** (the other side of a rule stated here):
* **volume 2.** V2 §3.7's parenthesis quoting W2 ("on every side, volume 2's `facadeBays(wing, side)`") and hand-off X30
  may quote W2's first sentence as it now stands ("On every side of every wing, volume 2's `facadeBays(wing, side, bayM)`")
  or drop the quote; X30's 3.7.4 text now holds ("under the wings `cryptSeedWings(b)` returns … where it returns none, the
  third of the region farthest from the main entrance"). Nothing else: V2 states its side.
* **volume 7.** A village class added to V07 §2.4 needs a `composition.classFamily` row in volume 2 (V2 §3.10.5) and,
  only where that key's programme row misfits it, a row of its own here (J-V3.111, J-V3.112).


**Reconciliation round 3** (the round-2 seam issues S23R2-04, -05 and -06). Deliberately left for later: **none** —
three minors, all fixed here. **Cross-volume hand-offs** (the other side of a rule stated here):
* **volume 5.** BCR-V5-30's reader list and its §1b row may name volume 3's W2 outside-ground sample (3.6) — read by the
  exposure gates, `Entrance.storey`, the walk-out and BCR-V3-28's digest — among `levelledGroundCm`'s readers (S23R2-06);
  nothing else there changes.
* **volume 2.** Applied by volume 2's reconciliation round 3 (BCR-V2-33, V2 §3.15.3, J-V2.99); nothing open.

**Reconciliation round 4** (the round-3 seam issues S23R3-01, -05, -07 and -08). Deliberately left for later: **none** —
two majors and two minors, all fixed here. **Cross-volume hand-offs** (the other side of a rule stated here):
* **volume 1 (its S23R3-02).** V1-3.8.2 step 5's reserve at an `external` basement reads `basementDoor(b)` (3.7.1) — the
  rectangle outward from the footprint side nearest that point, centred on its projection — and V1-3.8.3's chunk digest
  adds the door; `basementDoor(b)` exists from M3a (§8's PE), before the reserve's M5.
* **volume 2.** BCR-V2-33's clause "its door then placed by volume 3's tomb-door rule (V03 §3.7.1)" may read "its door at
  volume 3's `basementDoor(b)` (V03 §3.7.1)", since a stack beside a retaining wall takes the wall's door first (rule 1);
  V2 §3.17 (a)'s "its door on that side" stands. (Applied by volume 2's reconciliation round 3 continuation, S23R2-12.)
* **base-change lane (file f).** Items 241 and 242 (M3a) may list the `PlanGeometryRow` cells PE ships at M3a —
  `datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`, `moduleCm` and `door.mainCm` — beside item 233's two `stair`
  cells at M2b, so item 233's "the rest of the row with M6-P" reads after both; BCR-V3-30's M6-P estimate now reads
  17.75–24.25 pw, PE's 0.75–1 pw in M2b and M3a (item 567's note: nothing left to subtract).

**Reconciliation round 2, second brief** (S23R1-24; SR1-06 re-verified). Deliberately left for later: **none** — the one
minor fixed here. **Cross-volume hand-offs:**
* **volume 1.** Nothing required; its §1b may name T-V1-47 as the reader of volume 3's `Basement.crypt` (V03 §3.7.4),
  the one volume 1 text that reads it.

**Reconciliation round 3, second brief** (S23R2-10, S23R2-15, SCC-R2C-17). Deliberately left for later: **none** — the
major and both minors fixed here, and J-V3.119's neighbour of S23R2-10 with them. **Cross-volume hand-offs** (the other
side of a rule stated here):
* **volume 12 (its SCC-R2C-4).** X-V12-16 adds volume 3: its `roomProgram.json` columns take V03 §2.4's register lines
  (a `measure` at V3-P6 on `bar.T-V3-35`, registered by V03's P1 seat), the rest V12 §3.11's default line, at the exits of
  V03 §8's PE, P1, P2 and P6; V12 §3.11's default-line list may name "volume 3's §2.4 cells its own lines leave".
* **volume 11.** Registry row 38's `readers` name only the plan rung, a module reader, while S11 reads the table from M2b
  (the capacity's `R(s)` cells, BCR-V3-12, beside §2.6's `InteriorLadderRow`) and from M3a (`Entrance.storey`'s and
  `basementDoor(b)`'s cells; V03 §8's PE); the row may add S11 to its readers (its `stageReaders`) — V11's call, since it
  widens V12 §3.7.2 (4)'s admission to runs whose metrics read S11. T-V3-35's `stages` `[]` holds either way.
* **volume 1.** Nothing required: a stack-hosted access's head now carries its `door` (V03 2.1, 3.7.2 (1)), whose point is
  the projection volume 1's reserve already uses (J-V1.96). *(Superseded by reconciliation round 4's second brief: the
  point is `stackAccessDoor(b, a)`, which volume 1's reserve reads — seams S23R3-09, S23R3-10.)*

**Reconciliation round 4, second brief** (S23R3-09, -11, -12, -15, -16; SCC-R3C-8). Deliberately left for later:
**none** — three majors and three minors, all fixed here. **Cross-volume hand-offs** (the other side of a rule stated
here):
* **volume 1 (its S23R3-10).** V1-3.8.2 step 5's stack-hosted reserve reads `stackAccessDoor(b, a)` (V03 3.7.2 (1);
  `@plat/plots`, M3a) — the rectangle outward from the side it names, centred on its `at` — and V1-3.8.3's digest adds its
  value; T-V1-26's stack-door clause runs from M5 on the eager records. The round-3 second brief's "nothing required" for
  volume 1 is superseded.
* **base-change lane (file f).** Applied by its round-4 continuation: item 483 (BCR-V3-14) reads "T28-1 on a building
  with no storeyed wing, and T28-2 …", *Needed by* V02, V03 (its S23R3-13); item 585 carries BCR-V3-33 (§13.7's item-28
  row, its fallback cell), **STAGED (M6-P)**, *Needed by* V03, as §10 words it; item 578 (BCR-V3-32) is unchanged —
  `basementDoor`'s new signature is prose-transparent ("written `basementDoor(b)`"). Nothing open.
* **volume 2 (its S23R3-14).** Applied by volume 2's reconciliation round 4, second brief (11:27): BCR-V2-41's list reads
  "a solid monument, a sealed stack whose every wing is solid", a sealed stack carrying a storeyed tier or shrine keeps
  that wing's plan, reached by nothing (S6 (e), `W_TIER_UNREACHED`), and T-V2-45 cites T-V3-28 — worded as S6 is here;
  its `rebaseStack` now takes a `levelledGroundCm` reader, consistent with `basementDoor(doc, key, b)`. Nothing open.
* **volume 11, volume 12.** Nothing new: the capacity's two cells take V12 §3.11's default line as PE's cells do
  (X-V12-16's V03 clause, "the rest", unchanged); row 38's readers are V11's (SCC-R3C-7).

**Reconciliation round 5** (S23R4-01, -03, -06; SCC-91). Deliberately left for later: **none** — three majors and one
minor, all fixed here. **Cross-volume hand-offs** (the other side of a rule stated here):
* **base-change lane (file f).** Item 578 (BCR-V3-32) carries the step-3 text by reference; its note may add that
  `basementDoor(b)` reads, from M6-U, `Basement.crypt` with its capped bays (item 238), the crypt clause built with that
  item and its first reading declared in M6-U's shift record; the label is unchanged. Item 241 (BCR-V3-26) is unchanged:
  the storey comment's condition and rule 4's `Basement.access` trigger are the request's own text. Item 585
  (BCR-V3-33) is unchanged: only the request's note moved (SCC-91). Nothing required.
* **volume 1.** V1-3.8.2 step 5's reserve reads `basementDoor(b)`'s value; from M6-U a walk-out church's door may move off
  its crypt's vault, and the reserve with it through V1-3.8.3's digest — the one-time move declared in M6-U's shift record
  (§8's PE). No volume 1 text changes; its §0 statement that a church's crypt has no entrance of its own on the street now
  holds by 3.7.1's door point and O2. Nothing required.
* **volume 2.** BCR-V2-41 is cited whole at S6, 2.1 and BCR-V3-26 (S23R4-06); BCR-V2-33 (c)'s root clause is unchanged;
  S23R4-02 (the stack helpers' readers) is volume 2's own. Nothing required.
* **volume 12.** The `room` row rides the `area` column's entry by V12 §3.11's later-line rule as written; X-V12-16's V03
  clause ("the rest") still holds for PE's cells and the class rows' poorest-band `circulation`. Nothing required.
* **volumes 4, 6 and 10.** The crypt's derivation, trim and rank are unchanged — the door reads the vault, which the rank
  never moves; volume 10's why reads the new `walkOut` and `stoop` notes through this volume's `WhyProvider` (4.6).
  Nothing required.

**Reconciliation round 6** (S23R5-01, -02, -03; SCC-106). Deliberately left for later: **none** — one major and three
minors, all fixed here. S23R5-02's sub-point (c) is applied as a widened citation rather than a swap: 2.1's list of
derived pieces states the capped bays' reading, so 3.7.1 and 3.7.4 (3) keep 2.1 and add 3.7.4 (3) and §1b's row
(J-V3.126's amendment). **Cross-volume hand-offs** (the other side of a rule stated here):
* **base-change lane (file f; its S23R5-04).** Item 238's M6-U content takes S23R5-04's words — `basementDoor(b)`'s crypt
  clause and its declared first reading — and, S23R5-01 having landed here, "the stair-entered test and the whole basement
  of a crypt no stair reaches (volume 3 §3.7.4)"; item 238 carries BCR-V3-20's two new clauses by reference, its label
  unchanged; item 578's note and label as S23R5-04 words them (round 5's "nothing required" for item 578 is superseded);
  item 241 carries BCR-V3-26's widened rule-4 trigger and its closing by reference, its label unchanged.
* **volume 4 (its U4 line; the layers seam's hand-off).** V04 §8's U4 line lists the crypt derivation's content as file f
  item 238 does, the stair-entered test and the crypt clause among it.
* **volume 1 (its S23R5-05).** §0's great-temple sentence as S23R5-05 words it; volume 1's §0 on a church's crypt now holds
  by O2's closed vault. Nothing else.
* **volume 2.** *Superseded by the finalization (seam S23R6-01, S23R6-02):* S23R6-02 — the raised lift acts on every ground wing over the whole inset, and the lift and the crypt-only half raise act on the wings over the basement's ring (V2 §3.14.5 (c)–(d), BCR-V2-28). *Round 6's words, kept for the record:* T-V2-44's requested basement (its *Basement access* clause; seam S23R6-06; `Basement.access` ≠ `external`) holds and its crypt is now
  reached through one crypt join (T-V3-23 (j)); its half raise's "a basement that is only a crypt" reads the basement as
  derived, so the whole inset of a crypt no stair reaches takes the ordinary half raise; BCR-V2-33 and `cryptSeedWings`
  are unchanged.
* **volume 9.** The `drawChamber` bend's preview shows the basement 4.2 gives — the ground wings' whole inset where the
  drawn ring would not be stair-entered. Nothing required: it previews the edit's result.
* **volumes 6, 10 and 12.** An epoch op that changes wings re-derives the basement with the stair-entered reading through
  the `Basement.crypt` row's triggers (2.5); volume 10's why reads the `cryptStair` note `crypt join` through this
  volume's `WhyProvider`; V12 §3.11 and §4.2 as they stand cover SCC-106's order case. Nothing required.

## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V03-1 (J-VI.17 H18; CVR-V10-2, CVR-V10-9).** This volume registers, for volume 10's clerk: (a) the `crypt`
  section provider over `Basement.crypt` — presence by the class's `crypt` value, area and form, the principal crypt,
  the crypt join, or no crypt — with its `info.crypt.*` catalogue keys; (b) in its `plan` section one catalogue key per
  item-110 room cause of 3.x's list (`landingDoor`, `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut`, `tombDoor`,
  `gradeFace`, `deckNoCellar`, `stoop`, `exposure`, `stackCarried`). `deckNoCellar` (renamed from `deckRefusal` by
  reconcile-V03-r1, S23-17) names why a deck building has no cellar (a fact of the deck, volume 2's BCR-V2-34), not an edit
  refusal.
* **IN-V03-2 (J-VI.4).** A basement or cellar request on a deck building, and every other plan edit that contradicts no
  dossier fact and no lock, is bent by its dry run (item 101 R2; volume 2's `bend.deck.basement`, S23-17 — `bend.deck.single`
  is volume 2's family bend for small light buildings on a bridge, not this one); no plan edit is refused
  on a structural ground.
* **IN-V03-3 (J-VI.5).** The tier facts this volume reads (`storeyRange`, `BaseWing.on` and `.solid`, `stairChain`,
  `landingSide`, `MassingRef.stack`) are volume 2's second revision as landed; its `W_TIER_UNREACHED` flags a storeyed
  wing on a sealed (`none`) stack, which volume 2 now admits.

## Reconciliation round 1 (volumes/reconcile-V03-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r1; covered by the whole-design retrovalidation (J84).

Against critique/seam-stage2-3-r0.md and critique/seam-time-r0.md: fourteen issues routed to this volume — 8 majors
(S23-12, -13, -14, -15, -16, -18, -34 and ST-39) and 6 minors (S23-11, -26, -27, -36, -37 and -39) — all fixed; none
invalid; nothing on the fix list. Also applied: this volume's halves of S23-17 and S23-19 (J-V3.110). What changed, in place:
* **§2.1** — `Basement.crypt.ring`'s comment: equal to `Basement.ring` for a crypt-only basement at its derivation; the
  rank shortens and re-grows the crypt ring only (ST-39); `ProgramRoom.rule` for the crypt's capped bays and an omitted
  composer room; the derived list gains the crypt's capped bays. §2.3: `PlanReport.anchors.kind` gains `composerRoom`.
* **§2.2** — room-id minting beside the composer's ids, and a stored plan's new rooms from the level's highest id + 1
  (S23-14); stair core and chimney ids by wing key (S23-13).
* **§2.4** — the manor row notes that its own rooms stand only at the one-household ladder form (A2 (4); S23-16).
* **§2.5** — new rows: `BaseWing.partName` (S23-15) and the crypt's capped bays; the `Basement.crypt` row re-ranks on a
  change of the principal crypt, its building or its area, never shortening `Basement.ring` (ST-39).
* **§3.1** — the plan's input includes `Composition.rooms` from the `rooms` rung (S23-34); the capped bays are a seed
  piece. **§3.2** — A2 (4): a dwelling row's own rooms only at the form `house` (S23-16); A2 (9): the capped bays'
  `undercroft` (ST-39); A2 (11): an omitted gate hall or tower room placed by this rung (S23-27). **§3.3** — the half
  basement's raised `baseCm` named as the source of its floor datum (S23-11); E2 lays the omitted gate hall's ring.
  **§3.4 / §3.4a** — the capped bays' piece; terraces from each wing's own `RoofSpec.kind` (S23-12). **§3.6 W2** — volume
  2's `facadeBays` built as its own item moved forward under Q1, imported by P1 (S23-36). **§3.7.1, §3.7.4 (3), §3.7.5** —
  the rank caps the crypt ring only, is recomputed from the step-2 ring so a crypt re-grows, and the capped bays are an
  `undercroft` under a column grid fixed to the step-2 ring (ST-39). **§3.11** — new rooms minted by 2.2's rule.
* **§4.2** — a furniture add or move into a full room bends to the nearest room with a free slot (S23-26); a basement
  request on a deck bends by `bend.deck.basement` (S23-17). **§4.5** — the click by band: the district click at the city
  and district bands, the building click from the neighbourhood band down; every path derives `wings`, `rooms`, then
  `plan` (S23-18, S23-34); `view` likewise. **§4.6** — the `plan` query derives `wings`, `rooms`, then `plan`; the cause
  `deckRefusal` → `deckNoCellar` (S23-34, S23-17). **§0** — one clause on the far-out click.
* **§7** — T-V3-11 (iii)–(iv), T-V3-13 (`partName` round trip), T-V3-23 (h) (the capped crypt), T-V3-25 (the poor manor,
  omitted composer rooms, id rules), T-V3-30 (the half cellar, edited tier roofs), T-V3-31 (the deck bend).
* **§8 / §11** — P1 imports `facadeBays` (S23-36); P3's deck bend; §8's closing paragraph names milestone M6-P (S23-19);
  Q1's parenthesis follows S23-36. No estimate moves: each addition is a rule inside P1–P3's existing items (PLAUSIBLE).
* **§10** — BCR-V3-13 gains the part name's lifecycle and JSON (S23-15); BCR-V3-15, -19 and -28 target the `plan` rung's
  list of BCR-V2-13's per-rung inputs (S23-39); new BCR-V3-30 (§16's M6-P row, effort line and staged pointer; S23-19)
  and BCR-V3-31 (§14's `@plat/buildings` line and export dependency; S23-37 — its tables load through `@plat/tables` as
  BCR-V3-1 already states, so the "plan tables' loaders" of the required text are not moved into the package).
* **§1b** — rows for `BaseWing.partName`, the capped bays, the `rooms` rung as an interface, the terrace's roof source
  and the deck bend. **§9** — J-V3.101 – J-V3.110. **§12, §13** — this round's receipts and hand-offs. **Integration
  notes** — IN-V03-1 (`deckNoCellar`) and IN-V03-2 (`bend.deck.basement`) edited in place.
* **Receipts** — docs/validation/bench/doc_checks.py on this file after the round: C1 0, C2 0, S1 0, C4 2 (both present
  before the round, the same lines), C3 and S2 ordinary phrasing, section-number runs and volume-section pointers
  (scratchpad rcV3/dc-before.txt and dc-after2.txt); every table row's cell count checked against its header.

## Reconciliation round 2 (volumes/reconcile-V03-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r2; covered by the whole-design retrovalidation (J84).

Against the round-1 seam issues routed to this volume: S23R1-01, -02, -03 and -07 (majors), S23R1-09 (minor) and SR1-06
(major) — all fixed; none invalid; nothing on the fix list. What changed, in place:
* **The crypt's seed (S23R1-01).** 3.7.4 step 1 seeds under the wings volume 2's `cryptSeedWings(b)` returns (V2 §3.14.5
  (c), exported by `@plat/plots`), else the far third; BCR-V3-20's *Basements* text names the function; §1, §1b (the
  `Basement.crypt` and `BaseWing.partName` rows) and §2.5's `Basement.crypt` row name it; T-V3-23 gains (i).
* **Windows on one bay law (S23R1-02).** W2 reads volume 2's `facadeBays(wing, side, bayM)` on every side and restates
  no law; a side with no bay takes no window; 3.12 (9)'s grade faces read it; §1, §1b's windows row, T-V3-5 and J-V3.41
  follow.
* **Exterior flights by one tread law (S23R1-03).** 5.1 draws them by volume 2's `stairTreads(w)`; 5.3's JSON writes their
  tread lines by it and the glTF takes them as volume 2 exports them (V2 §5.6), interior stairs keeping the plan's
  `goingCm`; §1 and §1b's entity-kinds paragraph name it.
* **Village classes by their `v.` keys (S23R1-07, SR1-06).** 2.4's village rows keyed `v.<id>`, each naming the town row
  it takes; new rows `v.bakehouse` and `v.shop` (J-V3.112); a `v.` key without a row of its own resolves at A1 (3)
  through volume 2's `composition.classFamily` (J-V3.111), reported as `PlanReport.programmeSource.via` (2.3); A1's
  inputs, the other-slot order, A2 (4)'s dwelling list, §1, §1b's rows and T-V3-1 follow.
* **Citations to landed texts (S23R1-09).** 3.3's half-cellar datum cites volume 2's BCR-V2-28 as its round 1 (b)
  extends it (J-V2.91); BCR-V3-15 and -19 cite BCR-V2-13's round-1 per-rung split; §8, BCR-V3-30 and §13's round-1
  hand-off cite file f item 568 for §16's total; §12's round-1 sentence reads the three texts as landed, with the hashes.
* **Ledger, §9, §12, §13.** RC2.1 – RC2.6; J-V3.111 – J-V3.112; this round's CONFIRMED/PLAUSIBLE; this round's hand-offs.

## Reconciliation round 3 (volumes/reconcile-V03-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r3; covered by the whole-design retrovalidation (J84).

Against the round-2 seam issues routed to this volume: S23R2-04, -05 and -06 (all minor) — all fixed; none invalid;
nothing on the fix list. What changed, in place:
* **The tomb-door condition from volume 2 (S23R2-04).** §1's item-110 inputs, 3.7.1's tomb door and BCR-V3-27's closing
  cite "volume 2's BCR-V2-33 (the access external where no ground wing is storeyed)", V3C-82 kept only as provenance;
  §13's second-round volume 2 hand-off reads the same. J-V3.88 is unchanged.
* **Landed volume 2 texts, not critiques (S23R2-05).** §1's hooks row and S6's solid-stack root cite volume 2's
  BCR-V2-41; W2 cites volume 2's BCR-V2-42; §10's preamble reads BCR-V2-41 and -42 as landed; BCR-V3-26's conditional
  is gone — rule 5 is volume 2's BCR-V2-41 (file f items 230 and 241) and the request carries no rule-5 text; BCR-V3-25
  cites BCR-V2-33 as its second revision extends it; §12's second-round sentence reads the routed findings as landed,
  leaving only volume 4's `archVault` grade faces and volume 11's stepped class ids as those volumes state them. Cheap
  companions: §1's lead-in to volume 2's second-revision names, §1b's chimney row and H4 (volume 2's roofscape, V2 §5.2),
  3.3's `Storey.level` (BCR-V2-33), 3.7.2 (0)'s bank quay (`DeckContext.surfaceCm` null), 2.4's arena row and §7's arena
  fixture (volume 2's `ovalCourt`), §13's BCR-V2-41 hand-off.
* **One reader for levelled ground (S23R2-06).** W2's outside ground is `levelledGroundCm(doc, key, p)` at the sample
  point (BCR-V5-30: the levelled platform's datum, else the raster; the building's arena key), and across a retaining
  wall `levelledGroundCm` on the chain's far side, never a raster read; §1's hooks row and §1b's outside-ground row name
  the reader; §2.5's outside-ground lifecycle row and BCR-V3-28 stale a plan on a levelled platform's datum change, and
  BCR-V3-28's digest hashes the `levelledGroundCm` values W2 read; §6's budget row counts those reads; T-V3-30 gains a
  clause that a raster-sampling build fails (J-V3.113).
* **Ledger, §9, §12, §13.** RC3.1 – RC3.3; J-V3.113; this round's CONFIRMED/PLAUSIBLE; this round's hand-offs (volume 5's
  reader list, volume 2's S23R2-03).

## Reconciliation round 4 (volumes/reconcile-V03-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r4; covered by the whole-design retrovalidation (J84).

Against the round-3 seam issues routed to this volume (critique/seam-stage2-3-r3.md): S23R3-01 and -05 (majors), S23R3-07
and -08 (minors) — all fixed; none invalid; nothing on the fix list. What changed, in place:
* **One producer for the basement's outside door (S23R3-01).** 3.7.1 states `basementDoor(b): { side; at } | null` once —
  pure, of eager records (`Basement.ring`, the entrances, the wings and stairs, `RetainingWall`s with volume 1's
  `stepProfile`, `levelledGroundCm`), `null` unless the access is `external`, implemented in `@plat/plots` beside
  `facadeBays` and re-exported by `@plat/buildings` — in the order the wall walk-out (largest step first), the tomb door
  (3.7.1's present rule), the fall walk-out, else `null` (the trapdoor fallback); the **Access** sentence reads "`external`
  with its door at `basementDoor(b)`"; 3.7.4, 3.7.6, 3.7.7 and 3.9 (a new row for `null`) read it; §1's hooks and volume 1
  line, §1b's derived-piece and interface rows, §2.5's row, 4.6's `walkOut` cause and §6's S11 row name it; new BCR-V3-32
  brings the base's step 3 and T28-3 to it (file f item 578), and BCR-V3-27's new text cites it; T-V3-30 gains the door
  clauses; J-V3.114 records the one function. Two refinements of the seam text, recorded in J-V3.115: the ring test at `2
  × cellar.insetCm` (the footprint test moved onto the ring, which lies `cellar.insetCm` inside) with no door off the wall
  where the wall's ring sides are too short, and rule 3's sample outside the wall at W2's point rather than at the ring
  side's own midpoint (the inside sample reads the platform under every side on a levelled plot).
* **Eager facts at their inputs' milestones (S23R3-05).** §8 gains the PE row before P0 — BCR-V3-12's `R(s)` at M2b with
  `stair.ladder` and `stair.landingCm` in the base's `roomProgram.json`; BCR-V3-26's `Entrance.storey` (its tolerance
  cells, rule 4's non-derivation, 3.6's storey rule) and BCR-V3-27 (a)'s wall walk-out with `basementDoor(b)` at M3a in S11,
  with the level reading, storey heights and W2's outside sample as pure functions P1 imports; tests T-V3-30's
  entrance-storey and walk-out clauses and T-V3-34 on the eager records at M3a; 0.75–1 pw moved from P1 (now 4–5.5), the
  volume's 18.5–25.25 unchanged; *Where in §16's order* and BCR-V3-30 put 17.75–24.25 pw on M6-P and PE's 0.25 and
  0.5–0.75 pw in the M2b and M3a rows (file f items 567, 568); BCR-V3-12, -26 and -27 carry their build milestone; §2.5's
  `Entrance.storey` migrate cell reads "none needed: built at M3a with the first stacks and walls …"; T-V3-34 gains its
  eager pin; J-V3.116.
* **Access heads in II.7.4's reading (S23R3-07).** 3.7.2 (7) draws and exports the stored state or, while the element is
  closed, the derived reading (`bricked` while sealed, `collapsed` while partly caved in or collapsed), a collapsed head as
  a trace with rubble stipple and no portal; 5.1's head list, 5.3's JSON `state`, `.dd2vtt` portals and Foundry walls, and
  T-V3-13 follow.
* **Round-3 records (S23R3-08).** §12's round-3 parenthesis and §13's round-3 volume 2 hand-off read BCR-V2-33 as applied
  by volume 2's round 3 (J-V2.99, S23R2-03).
* **Ledger, §9, §12, §13.** RC4.1 – RC4.4; J-V3.114 – J-V3.116; this round's CONFIRMED/PLAUSIBLE; this round's hand-offs
  (volume 1's reserve, volume 2's BCR-V2-33 clause, file f's M3a cells).

## Reconciliation round 2, second brief (volumes/reconcile-V03-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r2; covered by the whole-design retrovalidation (J84).

A re-issued brief under this lane key with two seam issues: SR1-06 (major), fixed by this lane's first landing (04:48) and
verified in the live text after rounds 3 and 4 — nothing redone — and S23R1-24 (minor, raised by the seam-stage2-3-r1
continuation after that landing) — fixed; none invalid; nothing on the fix list. What changed, in place:
* **`Basement.crypt`'s volume 1 reader (S23R1-24).** §1b's `Basement.crypt` row, §2.5's lifecycle row and 3.7.4's
  closing paragraph read "volume 1's T-V1-47 (its check that no crypt has a place or a pin; V1-3.7.1's opening pass
  selects by `AccessPoint` fields and reads no crypt field)" for "volume 1's no-place rule"; J-V3.45's reason reads
  "volume 10 and volume 1's T-V1-47 read the crypt at generation" for "volume 1 and volume 10 need the crypt at
  generation". The decision itself stands on volume 4's join and the largest-crypt rule.
* **Ledger, §12, §13.** RC2.7; this brief's CONFIRMED/PLAUSIBLE; one optional hand-off to volume 1's §1b.

## Reconciliation round 3, second brief (volumes/reconcile-V03-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r3; covered by the whole-design retrovalidation (J84).

A re-issued brief under this lane key: the first brief's S23R2-04, -05 and -06 landed at 06:01 and are history; this brief
routes S23R2-10 (major) and S23R2-15 (minor) from critique/seam-stage2-3-r2.md's continuation and SCC-R2C-17 (minor) from
critique/seam-content-calibration-r2.md's continuation — all fixed; none invalid; nothing on the fix list. What changed, in
place:
* **A building with no storeyed wing keeps what lies below the ground (S23R2-10).** 3.1 step 2: such a building has no
  level at or above the ground and no room there; with a basement (a crypt-only basement of an `always` class, a
  requested one) the derivation continues for its basement storeys alone — 3.7.1 – 3.7.7, the crypt, its columns, its
  entry by the outside door at `basementDoor(b)`, its heads on the lowest storey; without one, its hosted accesses keep
  3.7.2 (1)'s outside-door heads; with neither the plan is empty. S6's `solidMonument` sentence, 3.4a's last bullet and
  3.9's row say the same; A5 (b) drops, with no tier, every room whose storey rule admits no basement storey; O2 roots such
  a plan at the room the outside door opens into, and BCR-V3-14's T28-2 text follows. `AccessHead.storey` is `number |
  null` (null exactly for 3.7.2 (1)'s outside door on a building with neither a basement nor `ground(b)`), `room`
  optional, and a new `door?: { wing, side, at }` filled by 3.7.2 (1) at `ground.at`'s projection onto the nearest outline
  side, where volume 1's reserve stands (J-V1.96); 3.7.2 (4)–(7), A2 (10), §1b's head row and §2.5's `Plan.heads` row
  carry the null form; 5.1 draws it at the building band on every storey view and on the outline view, 5.3's JSON writes
  `storey` null and the `door`, and no VTT or Foundry scene carries it; 4.5's switcher lists only basement storeys, the
  double-click opens storey −1, the panel reads "no rooms above the ground"; §0 tells the owner; T-V3-22, T-V3-23 (e),
  T-V3-29 and §7's fixtures gain the solid stack's head and the flat-topped great temple; J-V3.91 and J-V3.117. Found
  tracing the lifecycle: a non-catacomb head on a crypt-only basement lies in the undercroft, else the crypt (3.7.2 (6),
  J-V3.119), since no cellar can be cut there.
* **Wiring rows (S23R2-15).** §1b's level-reading row adds `Entrance.storey`, `basementDoor(b)`, volume 1's reserve and
  digest and the base's *Basements* condition; the interfaces gain `ground(b)` and the level reading (`@plat/plots`, M3a);
  the `PlanGeometryRow` row names PE's eager readers and cells by milestone (M2b, M3a; file f item 233's note); the
  `basementDoor(b)` rows add volume 1's close-up digest (V1-3.8.3).
* **The register lines of `roomProgram.json` (SCC-R2C-17).** §2.4's opening sentence points at new closing register lines
  in V2 §3.10.10's form: a `measure` at V3-P6 on the new bar T-V3-35 (§7: room areas inside their ranges, households at
  their asked form, the stair-fall rate against parity (d′)'s target, furniture skipped) for the area, unit-floor,
  stair-bay and furnishing columns, fallback "the default stays, reported"; PE's cells and the rest on V12 §3.11's default
  line; the two switches and the keys not calibratable; T-V3-35 registered as a `BenchBarDef` (`owner` `'V03'`, `stages`
  `[]`) by the P1 seat. §8's PE, P1, P2 and P6 exits carry `plat calibrate register --check` green; A3's unit floor and
  parity (d′) point at the line; §1b gains the row; J-V3.118.
* **Ledger, §9, §12, §13.** RC3.4 – RC3.7; J-V3.117 – J-V3.119; this brief's CONFIRMED/PLAUSIBLE; hand-offs to volume 12
  (X-V12-16 adds V03) and volume 11 (row 38's readers and S11).
* **BCR-V3-32's new step-3 text** reads "an outside stair (BCR-V2-33's external access — a walk-out's, or that of a
  building with no storeyed ground wing)" and "a retaining wall's side first, else, where no ground wing is storeyed, the
  tomb door's", so the requested text follows `basementDoor(b)`'s rule order (a stack beside a retaining wall takes the
  wall's door first) — volume 2's reconciliation round 3 continuation's note of 10:24 (S23R2-12's V03 echo); the quoted
  current text is unchanged.

## Reconciliation round 4, second brief (volumes/reconcile-V03-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r4; covered by the whole-design retrovalidation (J84).

A re-issued brief under this lane key: the first brief's S23R3-01, -05, -07 and -08 landed at 07:20 and are history; this
brief routes S23R3-09, -11 and -12 (majors) and S23R3-15 and -16 (minors) from critique/seam-stage2-3-r3.md's
continuation and SCC-R3C-8 (minor) from critique/seam-content-calibration-r3.md's continuation — all six fixed; none
invalid; nothing on the fix list. What changed, in place:
* **One door for a stack-hosted access (S23R3-09).** 3.7.2 (1) states the outside door of an access on a building with
  neither a basement nor `ground(b)` once, as `stackAccessDoor(b, a)` — a pure function of the wings, volume 2's
  `stairChain` (stair 0 and its approach strip), `a.ground.at` and `moduleCm`, in `@plat/plots` beside `basementDoor(b)`,
  built at M3a in PE: the nearest non-stair ground-standing wing holding an admissible point (on the outline, one module
  from each end of a door part two modules long, its span one module clear of the approach strip), its nearest such
  side, `at` the projection moved the least distance to admissible; else the nearest outline side's midpoint of any
  ground wing, `fallback` set and reported `W_STACK_ACCESS` (`door fallback`). The head's `door` takes its value (2.1),
  3.9's row, 5.1 (drawn `door.entranceCm` wide), §6's eager row, §1b's derived, interface and head rows, 2.5's lifecycle
  row and T-V3-22 (a fixture with `ground.at` nearest stair 0; the clause from M3a) read it; §8's PE row adds it and
  `deckLevel` to its dependencies, P2 names it PE's; J-V3.117's projection sentence cites it; J-V3.120.
* **The walk-out's door roots the basement (S23R3-11).** O2 gains **the basement root**: an `external` basement's door at
  `basementDoor(b)`, whichever rule placed it, starts a Prim tree over the basement storeys after the stack roots — the
  only tree on a building with no storeyed wing; "a walk-out's outside door" leaves the secondary entrances (a side door
  onto a walk-out's low side stays one); 3.7.1's closing sentence and §1b's row follow; T-V3-30 gains the clause that
  every walk-out basement room is spanned from its door's room, none tier 1; J-V3.121 (J-V3.42 stands for the other
  doors).
* **T28-1 on the storey-less plan (S23R3-12).** BCR-V3-14 (now "T28-1 and T28-2 …") amends T28-1 — its soft-room clause
  quoted with it — so that on a building with no storeyed wing a room whose storey rule admits none of its basement
  storeys is dropped under `solidMonument` and listed with no tier; `PlanReport.owed`'s `tier` becomes optional, absent
  exactly then (2.3); A5 (b), §7's opening sentence, T-V3-23 (e) and T-V3-29 cite it; F-PLAN's tier 1 follows the bar;
  J-V3.122.
* **Wording and signature (S23R3-15, S23R3-16).** BCR-V3-26 paraphrases BCR-V2-41 as "no plan above the ground where no
  wing is storeyed (its basement storeys and access heads planned)"; S6 lists "a sealed stack whose every wing is solid",
  one with a storeyed tier or shrine planned and flagged by (e). `basementDoor` is declared `basementDoor(doc, key, b)`,
  written `basementDoor(b)` in prose on the building's own document and arena key; §1b's two rows say "on `(doc, key)`".
* **The capacity's cells stay put (SCC-R3C-8).** 2.4's register lines put the `room` role's `area` triple (its min §2.6's
  `minRoomCm2`) and each class row's poorest-band `circulation` on PE's default line with PE's cells, out of V3-P6's
  `measure` line and the "every other" row; §13.7's item-28 fallback steps no poorest-band cell of a class row (new
  BCR-V3-33); A3's provenance sentence, 2.4's class-row note, §8's PE exit and P6's content follow; J-V3.118 is amended and
  J-V3.123 records the choice over a declared shift.
* **Ledger, §9, §12, §13.** RC4.5 – RC4.10; J-V3.120 – J-V3.123; this brief's CONFIRMED/PLAUSIBLE; hand-offs to volume 1
  (S23R3-10), file f (item 483's label and item 585 for BCR-V3-33, both applied there), volume 2 (S23R3-14, applied there at 11:27); the round-3 second brief's
  volume 1 hand-off marked superseded.

## Reconciliation round 5 (volumes/reconcile-V03-r5, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r5; covered by the whole-design retrovalidation (J84).

This round routes S23R4-01 and -03 (majors) and S23R4-06 (minor) from critique/seam-stage2-3-r4.md and SCC-91 (major)
from critique/seam-content-calibration-r4.md — all four fixed; none invalid; nothing on the fix list. What changed, in
place:
* **The main entrance over an `external` basement (S23R4-01).** `Entrance.storey` (2.1 and BCR-V3-26's comment) admits
  basement levels for the main entrance only where `Basement.access` is not `external`, whose core stops at the ground
  storey; 3.6's *Entrance storeys* states why, keeps a downhill-fronted walk-out's main entrance on level 0 with its stoop
  and its cellar door at `basementDoor(b)`, has S11 derive the storeys after the basement decision and re-derive them on
  an access change (BCR-V3-26's rule-4 text adds `Basement.access`; a refinement found tracing `setAttr(basement)`);
  O1 (e)'s stoop, §1b's and 2.5's `Entrance.storey` rows, 4.6's `stoop` note and §0 follow; T-V3-30 gains the
  downhill-fronted walk-out house (storey 0 from M3a, every room reached from P1, the storeys re-derived after an access
  edit); J-V3.124.
* **The basement's door off a church's crypt; the crypt join (S23R4-03).** 3.7.1 reads each door side at its **door
  point** — the midpoint, but on a building with a crypt and `ground(b)` the nearest point whose two-module span shares no
  length with the crypt's **vault** (its ring with its capped bays, which the rank never moves); rules 1 and 3 read it,
  a side without one is no door side, and none left gives the reported `trapdoor` fallback. BCR-V3-32's step-3 text adds
  the condition (file f item 578 by reference); the clause is built at M6-U with the crypt derivation, its first reading
  declared in M6-U's shift record (§8's PE, §1b, 2.5, §6, 3.9, 4.6's `walkOut`). O2 exempts the capped bays' arch from the
  crypt's forbidden clause as a forced edge and gives a building with no storeyed ground wing exactly one crypt join —
  an `arch` of `door.archCm`, at the first room the basement root spans beside the crypt, or from the crypt to its
  cheapest neighbour where the tree starts in it; 3.1 step 2, S6, 3.7.6's entries, 3.9's row, T-V3-23 (e) and (h), new clause (j) and §0
  follow; J-V3.125 – J-V3.126 record the refinements of the seam's text (the sliding door point, the vault, the two-module
  span, the join as an arch, the capped arch as a forced edge).
* **A storey-less stack's entrance cited (S23R4-06).** S6, 2.1 and BCR-V3-26 cite volume 2's BCR-V2-41 for where the
  main entrance of a storey-less stack stands — the stair chain's foot, or tier 0's front side on a sealed stack, whose
  storeyed wing falls to S6 (e); T-V3-28's clause names the stair-chain form.
* **One register entry for the `area` column (SCC-91).** 2.4's first register line takes every `RoomRoleRow`'s `area`
  triple, the `room` role's included — the column's default entry written at M2b, restated in place at P1 by V12 §3.11's
  later-line rule, measured by T-V3-35 (i) at V3-P6 and never tuned there, its fallback moving no `room` cell; PE's row
  keeps only the class rows' poorest-band `circulation`; the class-row note, A3, §8's PE, P1 and P6 cells, BCR-V3-33's
  note, J-V3.118 and J-V3.123 follow.
* **Ledger, §9, §12, §13.** RC5.1 – RC5.5; J-V3.124 – J-V3.126, J-V3.118 and J-V3.123 amended; this round's
  CONFIRMED/PLAUSIBLE; hand-offs to file f (item 578's note, optional), volume 1 (the declared move of its reserve at
  M6-U), volume 2, volume 12 and volumes 4, 6 and 10 — nothing required of any.

## Reconciliation round 6 (volumes/reconcile-V03-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V03-r6; covered by the whole-design retrovalidation (J84).

This round routes S23R5-01 (major), S23R5-02 and S23R5-03 (minors) from critique/seam-stage2-3-r5.md and SCC-106
(minor) from critique/seam-content-calibration-r5.md — all four fixed; none invalid; nothing on the fix list. What
changed, in place:
* **The stair-entered crypt (S23R5-01).** 3.7.4 defines a crypt as **stair-entered** where `ground(b)` exists and a
  storeyed ground-standing wing's ring shares area with its vault (the step-2 ring, or the author's ring) — a reading of
  eager records the rank never moves; a stair-entered crypt is entered by its crypt stairs, any other from the basement.
  The `always` bullet gives a crypt that would not be stair-entered on a building with `ground(b)` the ground wings' whole
  inset, never a crypt-only basement, its access the programme row's, so the storeyed wing's core or the trapdoor lands
  beside the crypt and O2's crypt join enters it; an author's crypt ring on a building without a basement follows the same
  rule (3.7.4, 4.2, BCR-V3-20's requested-basement clause, §1b's and 2.5's edit rows — a neighbour found tracing that
  edit). O2's crypt join is keyed on the crypt, run by the tree that spans the basement (the main tree through the core's
  bay or the trapdoor where no basement root exists). 3.7.6's entries and last bullet, 3.9's two rows, 3.1 step 2, S6,
  §1b's door-graph and `basementDoor(b)` rows, a new derived row in §1b and 2.5, 2.1's derived list, 3.7.1's door-point
  reason, §0, §7's annex fixture with and without a requested basement, T-V3-23 (j), §8's P2 and BCR-V3-20's clause (file
  f item 238 by reference) follow; J-V3.126's condition is restated and J-V3.127 records the choice and seven refinements.
* **The vault closed (S23R5-02).** O2's forbidden clause closes a stair-entered crypt's vault — the crypt and its capped
  bays — to the rest of the basement, a crypt stair's foot and a head's bay staying structural faces; 3.7.5 joins the
  undercroft to the rest of storey −1 only where the crypt is not stair-entered; 3.7.1's *Where a core joins it* keeps the
  core's bay and the trapdoor outside such a vault and O2's structural-face rule never opens the core's bay into it (two
  neighbours found tracing the tree's entries into storey −1); the capped bays' citations keep 2.1 and add 3.7.4 (3) and
  §1b's row; T-V3-23 (j) gains the capped walk-out church with a cellar; J-V3.126 is amended.
* **The entrance storeys' trigger (S23R5-03).** 3.6 re-derives the storeys on a change of the basement's `access`, `kind`
  or `floors` and says the storey step draws nothing, so the door and basement draws keep their order on
  `siteplan.entrance`; 2.5's and §1b's rows, BCR-V3-26's rule-4 text and closing (file f item 241 by reference), T-V3-30
  and J-V3.124 follow.
* **The restatement after M-CAL (SCC-106).** 2.4's first register line and §8's P1 exit add that, should M6-P land after
  M-CAL's record, the restatement ships with a new major version of `roomProgram` (V12 §4.2), the entry `provisional`
  again; J-V3.123 notes it.
* **Ledger, §9, §12, §13.** RC6.1 – RC6.5; J-V3.127 new, J-V3.123, -124 and -126 amended; this round's
  CONFIRMED/PLAUSIBLE; hand-offs to file f (S23R5-04, its own register entry, now also naming the stair-entered test in
  item 238's content), volume 4's U4 line, volume 1 (S23R5-05, its own) and volumes 2, 6, 9, 10 and 12 — nothing
  required of those five.

## Finalization (volumes/_finalize, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

The finalization fixed, in place, this volume's round-6 issues of seam-stage2-3-r6: **S23R6-01** (major) — 3.7.4's `always` bullet states that on the `raised` rung volume 2 lifts every ground wing over the whole inset, so a storeyed annex clears the basement as a raised choir clears its crypt; §0, §7's annex fixture (now also on a `flood` plot), T-V3-23 (j), §13's round-6 hand-off to volume 2 and new **J-V3.128**; **S23R6-03** (major) — 3.7.4 step 2 bounds a derived crypt's growth on the `half` and `raised` rungs to the ground wings its step-1 seed lies under (a short crypt reported short; an author's ring unbounded), 3.7.4 (3)'s backstop sentence, T-V3-23 (i) and new **J-V3.129**; and three of its minors — **S23R6-04** (3.7.6's crypt stairs laid only to a stair-entered crypt), **S23R6-05** (BCR-V3-20 reads the crypt's vault) and **S23R6-06** (T-V2-44's *Basement access* clause cited in place of T-V2-45). Volume 2's half is S23R6-02 (applied in V02). **CONFIRMED** by execution: each replacement asserted exactly one match; the two J rows inserted after J-V3.127. **PLAUSIBLE:** that the half-rung bound leaves the cathedral's principal crypt rank intact in practice (T-V3-23 (b) and (i) settle it at M6-U).
