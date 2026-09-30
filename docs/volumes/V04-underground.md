# Design volume 4 — The underground: sewers, tunnels, underground neighbourhoods, catacombs, caverns, quarries and the undercity

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V4-underground; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised by opus standing in for the Fable seat volumes/revise-V4; covered by the whole-design retrovalidation (J84).
> REVISED 2026-09-28 against `docs/volumes/critique/V04.md` (63 findings, as amended for the owner's ~20:05 switch, J111:
> "switch it then, cathedral also gets crypts but cemetaries get catacombs"), folding item 109 of
> `docs/AMENDMENTS-2026-09-28g.md` (ruins, caverns at any tier, optional access, catacombs under cemeteries only, the
> ratchet) and the underground's parts of items 102–108. The disposition table is appended to the critique.
> PENDING FABLE REVIEW — revised (second round) by opus standing in for the Fable seat volumes/revise-V4; covered by the whole-design retrovalidation (J84).
> REVISED 2026-09-29 against critique §8 (C4-110-1 – C4-110-12, C4-64, C4-65): item 110 of file g (owner, ~23:30 "they go
> in"; raised ways revised ~23:40) — the vaults under raised ways, the ruins' stepped monuments, the raised-way piers and
> retaining-wall footings as foundations, the aqueduct seam, sewers at retaining walls — and the revise-V3 and revise-V7
> hand-offs (`Basement.crypt`, `Entrance.faces` `tunnel`, modelled ruin columns; `'rung'`, `v.parish_church`, the
> maintenance mode). The second disposition table is appended to the critique (§8.5).
> PENDING FABLE REVIEW — reconciled (round 1) by opus standing in for the Fable seat volumes/reconcile-V04-r1; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 against the seam checks `docs/volumes/critique/seam-layers-r0.md` (SL-03 – SL-06, SL-08, SL-15,
> SL-16, SL-22, SL-30, SL-31) and `docs/volumes/critique/seam-time-r0.md` (ST-03, ST-16, ST-17, ST-21 – ST-24, ST-50);
> the note *Reconciliation round 1* at the end lists every change.
> PENDING FABLE REVIEW — reconciled (round 2) by opus standing in for the Fable seat volumes/reconcile-V04-r2; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 (round 2) against the seam checks `docs/volumes/critique/seam-layers-r1.md` (SLR1-01, SLR1-04,
> SLR1-05, SLR1-07, SLR1-14 – SLR1-16, SLR1-19, SLR1-20), `seam-time-r1.md` (TR-07, TR-08, TR-10 – TR-12) and
> `seam-settlements-r1.md` (SR1-24); the note *Reconciliation round 2* at the end lists every change.
> PENDING FABLE REVIEW — reconciled (round 3) by opus standing in for the Fable seat volumes/reconcile-V04-r3; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 (round 3) against the seam checks `docs/volumes/critique/seam-layers-r2.md` (SLR2-08, SLR2-15)
> and `seam-time-r2.md` (TT-02, TT-07); the note *Reconciliation round 3* at the end lists every change.
> PENDING FABLE REVIEW — reconciled (round 4) by opus standing in for the Fable seat volumes/reconcile-V04-r4; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 (round 4) against the seam check `docs/volumes/critique/seam-layers-r3.md` (SLR3-01); the note
> *Reconciliation round 4* at the end lists every change.
> PENDING FABLE REVIEW — reconciled (round 3, continuation) by opus standing in for the Fable seat volumes/reconcile-V04-r3; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 (round 3, continuation on the re-issued brief) against `docs/volumes/critique/seam-content-calibration-r2.md`
> §7 (SCC-R2C-14); the note *Reconciliation round 3 — continuation* at the end lists every change.
> PENDING FABLE REVIEW — reconciled (round 4, continuation) by opus standing in for the Fable seat volumes/reconcile-V04-r4; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 (round 4, continuation on the re-issued brief) against `docs/volumes/critique/seam-surfaces-r3.md`
> §9 (SR3-11) and `seam-content-calibration-r3.md` §6.2 (SCC-R3C-13); the note *Reconciliation round 4 — continuation* at
> the end lists every change.
> PENDING FABLE REVIEW — reconciled (round 5) by opus standing in for the Fable seat volumes/reconcile-V04-r5; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 (round 5) against the seam check `docs/volumes/critique/seam-layers-r4.md` (SLR4-06); the note
> *Reconciliation round 5* at the end lists every change.
> PENDING FABLE REVIEW — reconciled (round 6) by opus standing in for the Fable seat volumes/reconcile-V04-r6; covered by the whole-design retrovalidation (J84).
> RECONCILED 2026-09-29 (round 6) against the seam check `docs/volumes/critique/seam-layers-r5.md` (SLR5-01); the note
> *Reconciliation round 6* at the end lists every change.

**PROGRESS** (one line per section; kill-safe ledger — a resumed run continues from the first `planned`):
- 0 In plain words — done
- 1 Scope, base hooks, out of scope — done
- 1b Wiring table — done
- 2 Data model — done
- 3 Generation — done
- 4 Editing — done
- 5 Rendering, labels, exports — done
- 6 Performance budgets — done
- 7 Tests and acceptance bars — done
- 8 Build plan — done
- 9 Decisions — done
- 10 Base change requests — done
- 11 Owner questions — done
- 12 CONFIRMED versus PLAUSIBLE — done
- 13 Fix list — done (filled by the revision)

**REVISION LEDGER** (revise-V4; kill-safe — a resumed run continues from the first `planned`):
- R0 header, ledger, §0 — done
- R1 §1, §1b — done
- R2 §2 — done
- R3 §3.1–§3.4 — done
- R4 §3.5 (U-SYS: ruins, catacombs, caverns, quarries, vaults, forced vaults, the access pass) — done
- R5 §3.6–§3.12 — done
- R6 §4 — done
- R7 §5, §6 — done
- R8 §7, §8 — done
- R9 §9, §10 — done
- R10 §11, §12, §13 — done
- R11 the critique's disposition table — done
- R12 checks and the LANDED line — done

**RECONCILIATION LEDGER** (reconcile-V04-r1, 2026-09-29; kill-safe — a resumed run continues from the first `planned`):
- C1 §1, §1b (sky rule, public ground, callers, opening pass, report line, hood pins) — done
- C2 §2, §3 (primary, closed face, count, ruin source, workings, scoped pass, own lottery, keys, closures) — done
- C3 §4, §5, §7, §8 (tools, visibility, shadow term, T-V4-50/-52, T-V4-71 – T-V4-74, U5) — done
- C4 §9, §10, §11, §12, §13 and the note — done
- C5 file f items 319 and 414, checks, the LANDED line — done

**SECOND-ROUND LEDGER** (revise-V4, 2026-09-29; critique §8; kill-safe — a resumed run continues from the first `planned`):
- S0 header, ledger, §0 — done
- S1 §1, §1b — done
- S2 §2 — done
- S3 §3.1–§3.4 — done
- S4 §3.5 (the arch vaults, the foundations, the aqueduct seam, monuments and columns, the crypt join, the village rungs) — done
- S5 §3.6–§3.12 — done
- S6 §4, §5, §6 — done
- S7 §7, §8 — done
- S8 §9, §10 — done
- S9 §11, §12, §13 and the critique's §8.5 disposition — done
- S10 checks and the LANDED line — done

**RECONCILIATION ROUND 2 LEDGER** (reconcile-V04-r2, 2026-09-29; kill-safe — a resumed run continues from the first `planned`):
- D1 header, ledger — done
- D2 §1, §1b (the hood line's input, the V01 services, the levelled reader, `Foundations.apply`, the deaths, the workings, the opening pass's callers) — done
- D3 §2, §3 (the hood line, the opening pass after generation, the foundations at an epoch, F6 by relocation, the deaths, the buried terraces, the village working, the surface quarry, the citations, the pseudo-district's name, the opening's role, `v.parish_church`) — done
- D4 §4, §5, §6, §7, §8 (the edits, T-V4-75 and the bar clauses, the build order with `@plat/hood`, the price) — done
- D5 §9, §10, §11, §12, §13 and the note — done
- D6 checks and the LANDED line — done

**RECONCILIATION ROUND 3 LEDGER** (reconcile-V04-r3, 2026-09-29; kill-safe — a resumed run continues from the first `planned`):
- E1 header, ledger — done
- E2 §1b, §2, §3, §4, §7, §9, §10 (the opening pass's two commits, the cause and excavation readers, the crowding hook at `growth`, the landfall reopening, BCR-6's quote, the vacated households by id) — done
- E3 §12, §13 and the note — done
- E4 volume 1's counterpart wording (V1-2.3, V1-2.7, 1b `HoodPlace`), checks and the LANDED line — done
- E5 continuation on the re-issued brief (SCC-R2C-14): §8's register at each exit with the due steps and the fallbacks V12 §3.11's V04 lines leave to it, §1b.1's rows (SCC-R2C-2's V04 half with them), J-V4.117 – J-V4.118, §12, §13 and the note — done
- E6 continuation checks and the second LANDED line — done

**RECONCILIATION ROUND 4 LEDGER** (reconcile-V04-r4, 2026-09-29; kill-safe — a resumed run continues from the first `planned`):
- G1 header, ledger — done
- G2 §1.2, §1b, §2.6, §3 (the hood line's forecast order and cap, §3.3's first paragraph, P5's catacomb expectation and P7 in a hood, F6's void part) — done
- G3 §7 (T-V4-75), §9 (J-V4.116), §12, §13 and the note — done
- G4 checks and the LANDED line — done
- G5 continuation on the re-issued brief (SR3-11, SCC-R3C-13): §1b, §3.8 (the grouped access's exception, the dwelling closure among U-DIG's callers), §3.11's failure row, §4.3, §4.7, §6, §7 (T-V4-48), §8's register wording, §9 (J-V4.119 – J-V4.120), §12, §13 and the note — done
- G6 continuation checks and the second LANDED line — done

**RECONCILIATION ROUND 5 LEDGER** (reconcile-V04-r5, 2026-09-29; kill-safe — a resumed run continues from the first `planned`):
- H1 header, ledger — done
- H2 §1.2, §1b.2, §3.1's T6 row, §3.10, §3.11, §4.3, §7 (T-V4-74 (b)), §8 (U3b) — the dwelling closure's opening rungs in the one list, the stage-2 switch as the pass's gate and its edit as a commit — done
- H3 §9 (J-V4.121), §12, §13 and the note — done
- H4 checks and the LANDED line — done

**RECONCILIATION ROUND 6 LEDGER** (reconcile-V04-r6, 2026-09-29; kill-safe — a resumed run continues from the first `planned`):
- K1 header, ledger — done
- K2 §1.2, §1b.2, §3.10, §3.11, §4.3, §7 (T-V4-31, T-V4-74 (b)), §8 (U3b) — the stage-2 switch's edit as volume 1's re-derivation (V1-3.15's *The switch's edit*), its tail's T6 running the pass under the new gate, the underground never held byte-identical — done
- K3 §9 (J-V4.121), §12, §13 and the note — done
- K4 checks and the LANDED line — done

**How to read this volume.** It builds, to implementation depth, the subject that `docs/ARCHITECTURE.md` (the base)
carries at hook depth in II.6 and II.7. The implementer holds the base and this volume and nothing else (§17.1). Every
fact the base already states is cited by its section and never restated; every new fact is stated once, here. Where the
base must change, section 10 files a base change request (BCR-n) and the volume is written as if it were applied.
Decisions are `J-V4.n` (section 9), tests `T-V4-n` (section 7). Section references without a prefix (§4.7, II.7.3)
are the base's; `V4 §n` is this volume's.

## 0 In plain words

Under every settlement this stage builds the underground the way the town itself was built: from rules, from the same
seed, after the streets and houses above it exist. It is hidden until you switch it on; when you do, the ground fades to
a pale ghost and the underground appears beneath it as a dungeon-style map — solid rock drawn dark and hatched, every
tunnel, gallery and chamber a pale void cut into it, one depth level at a time.

**The sewers come first** — sometimes in a town, always in a city. They follow medieval practice: the town's small
streams are covered over and become the main drains, a few big sewers run under the principal streets, and everything
falls downhill, never uphill, to an outlet just above the river or the shore below the harbour and the mills — or, where
there is no water, to a cess field outside the walls. How big each sewer is follows how much of the town drains into it,
so the trunk sewers near the river are large and the branches small. Most houses simply empty into the street or a pit;
only the wealthier houses and the trades that need water are connected. Where a sewer passes under the town wall a grille
closes it. In the realistic setting few sewers are big enough to walk in; the fantasy setting makes them large, vaulted
and connected into loops.

**People live along the walkable sewers,** in rooms cut into the tunnel wall on both sides, one or two rooms deep, with
no alleys — the owner's rules — and never under a house, a wall, the river or wet ground. They are the town's poorest
and those with reasons to hide.

**Beside the sewers,** where history or geology explains them. Catacombs grow under the town's **cemeteries** — its
churchyards, its burial grounds and, in a big city, the great cemeteries outside the gates — as large as the dead they
hold: at most one in a town, a few in a city by its number of churches, the largest under the cemetery that buries the
most. A church keeps its own **crypt** in its basement (the cathedral always, the largest); a crypt joins a catacomb only
where one grows beneath it. Caves follow the water in limestone or old lava, more often in mountains and where people
mine, and narrow fissures open in ordinary hill rock; a mine may break into a cave. Old quarries lie under or near a
town, as large as the stone the town was built from, and a great city may turn a worked-out quarry into an ossuary.
Vaults carry streets over slopes and bridges onto their banks, and cisterns hold water under the oldest precincts; where
a great fire or flood made the townspeople raise the ground, the old streets survive underneath as a buried town.

**Under the arches.** Where a city carries a road on a viaduct, a raised road or an aqueduct, the ground under some of its
arches is walled in as a vault — a store, a stable, a workshop's back room — while the arches over a street, a stream or
steep ground stay open. You can open or close any arch, and removing the raised way removes its vaults with it. Where
the city draws water from an aqueduct, a great cistern lies under the conduit house at its end, and the other cisterns
are dug only where neither a river nor the aqueduct's fountains are near. Terraced streets step down at their retaining
walls, and the sewer beneath drops down a shaft there rather than breaking the surface. The piers of a viaduct and the
footings of a retaining wall go down into the ground: where they meet a cave or a ruin, the builders filled it.

**Older than the town.** Where the dossier or the site gives a reason — ancient ruins, a magical node, a history of
magic — the remains of an older civilisation lie beneath: its streets, halls, temples and tombs laid out on its own plan,
straight-walled and columned, visibly not the town above, and decayed so that its great halls survive and its houses are
rubble. Where the older people built in steps, their temple or tomb stands as a stepped monument in its hall, its upper
tiers fallen into a mound and its top cut off where the ground above presses down.

**Found, or not.** A cave or a ruin can lie under a hamlet as easily as under a city, and most start sealed: nobody
knows they are there. Every house built over one may dig down into it, a sinkhole or a cave mouth may open it, a new sewer
or a growing catacomb may cut through it; so a village over a cave rarely reaches it and a city over it usually has, and
the deepest chambers stay hidden even under a metropolis. Only once a way in exists do people settle in it — a few
squatters or a cult, or, in a large place, the undercity. A game master can show the sealed voids to see what the
inhabitants do not.

**The undercity** — at most one to three neighbourhoods — settles in the largest reachable void, an old ruin first: it
has its own market square in a great chamber, its own walkways, its own tavern, fence and guild seat, and its lifelines
to the surface for air, water and food. Each of its neighbourhoods is the shadow of a real district above, named as its
underside, and its people are the town's own. Its places sit where the town's rules put them: its trades within reach of
the markets they serve through the ways up, its guild seat away from the garrison above.

**The parts meet, or not.** A catacomb may break into a sewer, a quarry into a cave; each meeting is a typed opening —
open, gated, secret, collapsed or flooded — and some are known only to those who know. Cellars may have a way down; a
thieves' den is more likely to have one.

**Nothing is torn down.** Tunnels silt up, cave in, flood or are bricked up and sealed; they stay as ruins and a growing
town reopens them before it digs new ones. A catacomb never shrinks: when it can grow no further, the old bones are moved
and its ossuaries fill instead.

**Light.** There is no sun below. Lamps at doors, torches at junctions, braziers in the undercity's market, and the
columns of daylight that fall through gratings and shafts are all the light there is.

**Editing** is the same as above ground: draw a tunnel with two points and it routes itself; drag it; make it deeper;
silt it or reopen it; draw an old street into a ruin and it follows the ruin's grid; add a way down from any cellar and
everything that way needs — the cellar, the passage, the opening — is built for you in one step you can undo; open a way
into a sealed cave and the preview lists everything that opening reaches.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds

Nine engines, one view and their editing, all in one package `@plat/under` (J-V4.1; BCR-12):

| engine | the base's slot | what it makes | V4 § |
|---|---|---|---|
| **U-NET** the sewer network | `SewerStrategy` (II.6; II.7.1–II.7.2) | the `sewer` system record, part 0's rock face, `Tunnel` records with their chains, invert profiles, outfalls and grilles, underground `Junction` records with the chamber flag, the plot connections (`serves`), the network's own gratings and mouths | 3.2 |
| **U-FORECAST** the S7b predictor | S7b (6)–(7) (§4.5) | `NetworkForecast`: the predicted navigable run length and capacity, each void source's predicted capacity, the undercity's existence verdict (P6) and each cavern or ruin void's chance of access (P7), read by S7b's allocations | 3.3 |
| **U-FRONT** the sewer-front neighbourhoods | `UndergroundStrategy` (II.7.3–II.7.4) | part 0's blocks, plots, buildings and access points; F6: the scattered dwellings of accessible cavern and ruin clusters | 3.4 |
| **U-SYS** the void systems | `UndergroundSystemStrategy` (II.7.6; g items 109, 110) | `ruin` (with its stepped monuments and modelled columns), `catacomb` (with its `CatacombComplex` records), `cavern` (the fissure variant included), `quarry` (mine voids, chain mines and the quarry ossuary), `vaults` (forced vaults, the arch vaults under raised ways and an aqueduct's terminal cistern included) and `buried` systems: their parts, galleries, chambers and their own entrances | 3.5 |
| **U-ACCESS** the access pass | II.7.6's connection graph (2)–(4); g item 109 (j) (3), (3b), (k) (2) | overlap and mine breaches, proximity links, crypt joins, dig-from-above accesses, public openings, the sewer's adoption of ancient drains, and the excavation reading | 3.5.7 |
| **U-CITY** the undercity | `UndercityStrategy` (II.7.5) | undercity districts, blocks, plots, buildings, walkways, the main chamber | 3.6 |
| **U-LINK** the connection stage | `UndergroundLinkStrategy` (II.7.6 (1), (5)) | lifelines, item 64's basement accesses, the passages of the dossier's subterranean institutions, outskirts | 3.7 |
| **U-DIG** the closure generators | §7.3 item 9 (d), II.7.6's *pieces* | the `dug` system and its passages, for `addUndergroundAccess`, an undercity lifeline, a subterranean dossier institution and its network, a dwelling declaration's closure on a sealed void and the grouped access before it (BCR-V9-22; SR3-11) | 3.8 |
| **U-RECONCILE** the tail's reconcile | S10b's plan–fit–reconcile (§4.7) | T8: the only tail stage that writes ground records — uses and households only, never geometry — for what the tail could not seat below | 3.7a |
| **U-FADE** the underground's part of an epoch | §4.11's decline step and grow path, as volume 6's participants call them: `under.fade` (the underground's own lottery after the fabric pool, BCR-6), `under.extend`, `under.access`, `under.undercity` (V6 §3.2) | the fade candidates and their conversion, the foundations over the epoch's new footings (`Foundations.apply`, TR-07), the network laid whole the first epoch sewers turn on and extended at every later one (with its drops at new retaining walls), the new quarry and mine workings, the catacombs' growth (the span's calamity deaths in the need), the arch-vault reconcile over the epoch's raised ways, the scoped access pass (the village workings included), the undercity's re-read and clearance, F6's dwellings filled by volume 6's relocation | 3.10 |
| **U-VIEW** view, labels, exports | §8.1, §8.2, §8.4, §9, §11 | the underground display list and its programs (the ruin program and the unexcavated style among them), the cut-away, labels, the per-band exports | 5 |

The underground's light rows (§4.7's `LightRule`, arena `underground`) are placed by the engines that make their hosts
(V4 §3.9); the edit kinds are the base's (§7.1), completed in V4 §4.

### 1.2 The base hooks this volume consumes (cited, never restated)

| hook | where | how this volume uses it |
|---|---|---|
| existence by tier, the S0 draw, `Features.sewers`, `Features.underground`, the toggle as visibility | II.7.1, §4.2 S0, §2.9, §7.8 | U-NET's gate; the tail's gate (V4 §3.1) |
| the rung rows `RungProfile.layers.sewers`, `.undercity` | §1.1 | U-NET's and U-CITY's gates |
| the network's declaration, families, presets | II.6 (`SewerStrategy`) | implemented by U-NET; the family and preset become two recipe controls (BCR-9) |
| the tunnel profile table, navigability, depth and fall, outfalls on the downstream side | II.7.2 | U-NET's sizing and invert pass |
| the drain connection table and `drainOf` | II.7.1 | U-NET step N8 |
| the owner's rules U1–U3, the occupants, the cut, the surface constraint, access, depth, lifecycle, order | II.7.3 | U-FRONT, verbatim as rules; this volume adds only the steps and the constants' provenance |
| `AccessPoint`, `UndergroundRule`, `UndergroundStrategy` | II.7.4 | records and rules read as declared |
| the undercity: requirements, existence and bound, size law, allocation, shadow rules, outskirts, lifelines and light | II.7.5 | U-CITY and U-LINK |
| the systems, parts, depth bands, derivations, connection graph, access-edit pieces, `UndergroundSystemRow`, `LinkRule`, `RaiseGrade` | II.7.6 | U-SYS, U-LINK, U-DIG |
| the condition table, `silt`/`caveIn`/`seal`/`reopen`/`flood`, the stretch split | II.6, §4.11 (`DeclineOp`) | U-FADE and the hand conversions |
| the records `Tunnel`, `UndergroundSystem`, `Gallery`, `Chamber`, `UndergroundLink`, `LightSource` | §2.7 | written as declared, with BCR-3's additions |
| the underground levels and parts, the `under<n>/` prefixes | §2.1, §2.2 rule 1, §3.4 | every stage's transactions |
| `kerb`, `corridorUnion`, `bandUnion` on every arena; chambers as closed chains | §3.7 (J-A12.31, J-A65.32) | every stage's band and cut |
| path search (A\*/Dijkstra) | §3.1 | U-NET's tree, U-DIG's connector |
| S9–S11 and the placement solver on another arena | §4.7, §4.7 S10b | U-FRONT and U-CITY run them with `ContextVector.arena = 'underground'` |
| S7b (6) and (7) | §4.5 | read U-FORECAST (in a hood document after the one-district allocation, V4 §3.1's hood line; SLR3-01) |
| the light table and the lighting model (sources, shafts, hand lantern) | §4.7 *Light sources*, §8.4 | V4 §3.9 and V4 §5.3 |
| the `states` rows and the underground programs | §8.2 | V4 §5.2 adds the undeclined programs' details |
| depth bands, the cut-away, `depthBand` view key | §8.4, §2.9 | V4 §5.1 |
| the knowledge filter | §9.2, §8.1 item 7 | every mark and label |
| the exports' underground rows | §11.1 | V4 §5.5 |
| the `sewer` concern and the ordinary concerns | §6.1 | every draw (V4 §3.12) |
| the anchor table rows for access points, tunnels, galleries, chambers, links, undercity neighbourhoods | §6.3 | identity across re-derivation |
| the edit kinds, the locality rows, the lifecycle rows, the closure rule | §7.1, §7.3, §7.4, §7.3 item 9 — its (d) with the dwelling closure and the grouped access as file f item 372 applies BCR-V9-22 (SR3-11) | V4 §4; the dwelling closure's way in, V4 §3.8 |
| F-UNDER, F-VOID, §5.3's underground rows | §5.2, §5.3 | kept; F-NET added (BCR-7) |
| the hook tests T11-1, T12-1, T14-1, T63–T66 | §13.2 | kept and run on generated output; V4 §7 adds T-V4-n |
| DR17 and the dossier's staged rows | §7.7, item 88 | V4 §1b's dossier trace |
| item 109's base side: the `ruin` kind and depth band, the relief rows, the mining boost and the fissure variant, a ruin as a void source and its rank, basement access over ruins, the DR rows, the ruin style, the catacomb gate, sources, count rows and ratchet | g item 109 (a)–(k) (the coherence pass applies it to §2.7, §4.2 S1, II.7.3, II.7.5, II.7.6, §7.7, §8.2) | U-SYS, U-ACCESS, U-CITY, U-FADE, U-VIEW build it to depth; this volume cites g for the base mechanism and files a BCR only where it needs more (BCR-29 – BCR-36) |
| items 102–108's base side: the daylight-share term, the siting profiles and relation families, custom profile resolution, the supply web, walls on natural barriers, spread and pull, institution ladders | g items 102–108 | V4 §3.6a (the cross-arena distance), F4 and C4 (members, clandestine modes), N11a (grilles at walls), F2 and C5 (the daylight-share term in the prosperity the underground inherits — a model reading, never a render input; a shaft's light reads the render's shadow term, V4 §5.3), V4 §3.5.3 (chain mines) |
| the declarations read ahead and the creation prefix | §4.1 *Declarations read ahead*, §7.1 (`creation`) | V4 §4.7 |
| the parity presets and the `extension` cells | §7.6 | BCR-23, T-V4-35 |
| basements, their water table and the requested-mode ladder | §2.6 *Basements*, II.7.6 step 1 | U-ACCESS's dig floor, U-LINK L5, BCR-43 |
| `CircumstanceSlice.undercity`, `.magic`, `.biome` | §7.7 layer 2 | U-FORECAST P6, C0, the light rows |
| the concealed institutions' modes and their fallback chain | §4.7 *Concealed institutions* | F4, C4, T8 |
| S10b's plan–fit–reconcile | §4.7 S10b | T8 (V4 §3.7a) |
| the naming record and protected names | §2.8 | tunnel, system, complex and ruin names (V4 §5.4) |
| the stream key's components (stage id, concern, salt, epoch) | §6.1 | V4 §3.12 |
| item 110's base side: `RetainingWall` and S10–S11's levelled ground; the raised way's record on ground parts from 1 (its deck, its raised-way piers, its spans with their `use`), the aqueduct's terminal and the fountains it feeds; the revised deck invariant | g item 110 (a), (b) (the coherence pass applies it to §2.7, §3.4, §4.3, §4.6, §4.7, §5.3); BCR-45 for the span's use, the raised-way piers' keys and foundations and the aqueduct's delivery; volume 5's BCR-V5-30 for `levelledGroundCm`, the one reader of levelled heights (SLR1-16) | the ground reads (below), U-NET N3 and N6–N7, the foundations (V4 §3.5.0), the arch vaults, the cistern test and the terminal cistern (V4 §3.5.4), U-ACCESS, U-DIG, the drawing (V4 §5.2) |
| `layTiers`, `TierInput`, `TierLay`, the `stepped-monument` composition row | V02 §2.6, §3.15.1, §3.15.4, §3.15.6 (X19) | the ruin's stepped monuments (V4 §3.5.0a (5a)) |
| `Basement.crypt`, `Entrance.faces` `'tunnel'`, `AccessHostRow` | V03 §2.1, §2.4, §3.7.2 (6), §3.7.4 (BCR-V3-20, BCR-V3-21) | the crypt join (V4 §3.5.7 (c)), the burial-face entrance (V4 §3.5.1 (9)), the underground buildings' entrances (F4, F6, C4) |
| V11's `stepped-shrine` heights row, the `CultureRow.monument` values, `era.raisedVaultM` and `culture.raisedVaultM` | V11 (critique-V11 V11C-35 (3), (5); X-V11-10) | the monuments (V4 §3.5.0a (5a)); BCR-45's vault share |
| `EpochScope` (`raised`, `levelled`, `built`, `basementGrown`, `elements`, `surfaceChanged`, `workings`), the participants `under.fade`, `under.extend`, `under.access`, `under.undercity`, volume 6's derived catacomb primary and per-epoch cap, the span's calamity deaths (`CalamityRef.deaths`), the relocation that fills F6's dwellings at an epoch and the in-participant re-homing | V06 §2.1, §2.4, §3.2 (W65), §3.18 (§3.18.1 (2c), (4), (6); §3.18.2 (3)) | the callers of V4 §3.10's functions (V4 §1b.2): `Foundations.apply` (TR-07), `ArchVaults.reconcile` and the network's drops, the first-epoch network, catacomb growth (with the deaths, TR-10), new workings, the scoped access pass (the village workings of `scope.workings` included, TR-12), the fade, the undercity's re-read and F6 by relocation (TR-08) |
| volume 1's local-place step and its opening pass, `HoodPlace`, the ground `AccessPoint` symbols, `hood.pins` (arena-keyed); its services `districtsAbove(part, element)` and `fabricSignature(region)`; `Recipe.product`, the hood recipe's `contextRung` and its one-district allocation | V1-2.2, V1-2.6, V1-3.7.1, V1-3.8.2, V1-3.8.8, V1-3.10.1 step 6 and (7), V1-3.15, V1-3.16, V1-5.1.2 | the opening pass, run by T6 — generation's, and the tail's after a re-derivation, a switch edit's among them (V1-3.15, *The switch's edit*; SLR5-01) — and by the commits V4 §3.10 names while the stage-2 switch `fabric.extensionWeight` stands above 0 (V1-3.15; SLR1-04, SLR4-06); an access's surface head is V01's symbol (V4 §5.2 (7)); no underground hood pins (V4 §1.3); `districtsAbove` read by C5 (the undercity's parent) and §4.5 (the clerk's ruin answer), `fabricSignature` by V4 §3.5.0a (7) (the ruin's distinctness step) (SLR1-07); `Recipe.product` by the hood line (V4 §3.1; SLR1-01), which runs U-FORECAST after the one-district allocation and reads that allocation for P7's cap and P5's catacomb expectation (V1-3.10.1 step 6; J-V1.92; SLR3-01; J-V4.116) |
| live sky islands and their churches; the landfall's `fallen_island` decoration, its rubble `quarry` land use and the raised parts it ruins | V5 §1.3, §3.5 (3), §3.16 (4)–(5); BCR-V5-26 | the catacomb count (V4 §3.5.1 (3)); the access closures (V4 §3.10); the arch vaults' condition (V4 §3.5.4 (d) (2)); a `quarry` with a `source` is never the surface quarry (V4 §3.5.3; SLR1-14); nothing else of the sky layer is read (V4 §1.2) |

**The ground, and part 0 (C4-110-4).** Item 110 (b) gives the ground layer parts from 1 (raised decks). In this volume
**the ground** means `{ layer: 'ground', part: 0 }` unless a raised part is named: every ground read — `pointLocate`,
`resolve`, a way, a junction, a face, a frontage, a footprint, a basement ring, a well pin — is on ground part 0, and the
heights read are `levelledGroundCm(doc, ground, p)` (BCR-V5-30: a levelled plot's, block's or ward's platform datum, else
the unlevelled raster; the levelling is never written into the `Terrain` raster; SLR1-16). **Part 0** without a
layer means the underground layer's part 0, the sewer's. A raised part is read only where this volume names it: the
raised-way record's raised-way piers and spans (V4 §3.5.0's foundations, V4 §3.5.4's arch vaults) and the cut-away's outlines (V4
§5.2). A raised spine is never a T1 edge, never split and never a junction; its deck carries no sewer; the way beneath it
keeps its own edges, junctions, runs and gratings. In prose the raised way's supports are **raised-way piers**, always with
the qualifier; in identifiers they are `raisedSupport`, because `pier` is this volume's jetty way class
(`NetworkRule.classCost`).

**The sky layer is never read (owner item 2; V05 §1.3; SL-05; J-V4.101).** Every building, basement, crypt, plot,
district, reservation and face the underground reads is on the ground layer: an island's buildings — its cathedral's
rim-slab crypt included (V5 §3.10 (5)) — are never a dig host, a basement-access host, a crypt-join host or a burial
face, a sky district is never in U-NET's service region, and no underground element, link or access has an end on the
sky layer. The one exception is a count, not a source: the catacomb count counts each church on a live sky island once
(V4 §3.5.1 (3); V5 §3.5 (3)). While the underground is the active layer the tools pick ground buildings and points only
(V4 §4.1).

**Public ground (SL-15; J-V4.100).** Stated once here and cited wherever this volume names it: **public ground** is a
way corridor, an L1 `square` or gate-plaza face, or a block whose `Block.content` is `square` or `green` (volume 1's
dispatched square and green blocks, each one L3 residue face, V1-3.5.10; V01 BCR-5); **a square** is an L1 `square` face
or a `square` block; **a yard** is a plot's yard part or a `yard` block's `yard_common` residue. Each is resolved by
`pointLocate` on ground part 0 and, for a block, its `Block.content` (S9b's eager typing, so every district's blocks
carry it before the tail). II.7.3's surface test admits all of them already (residue, greens and yard parts are allowed
ground), so F3 is unchanged; the readers of the definition are N11's gratings, F5's access order and shafts, L1's
lifeline stair and air grating, `placeAccess`'s kinds, the forced vaults (V4 §3.5.6), the terminal cistern (V4 §3.5.4
(e)), a buried town's squares (V4 §3.5.5, BCR-20) and `OpeningRow`'s `collapsed_shaft` row.

### 1.3 Out of scope, with the reason

* **The evolution engine's scheduling** — when an epoch runs, its population target and its strike lottery — is the
  evolution engine's (§4.11; staged by the owner). This volume supplies what that engine calls for the underground
  (`UndergroundFade`, `Foundations.apply`, `SewerStrategy.derive` at the first sewers epoch and `.extend` after it,
  `QuarryWorkings.extend`, `CatacombGrowth.grow` with volume 6's cap, primary and calamity deaths, `AccessPass.run` over an
  `EpochScope`, `ArchVaults.reconcile`, the undercity's epoch re-read; V4 §3.10, each with its caller in V4 §1b.2) and runs
  them by hand now.
* **The plan rung's basement plan** (stage 3, §2.6 item 28) draws the stair, ladder or hatch this volume's access
  records reserve; the plan itself is the stage-3 volume's. This volume writes the reservation (the access record and
  its `basement` host) and marks the rung `stale` (§7.3 item 9 (d)).
* **The underground close-up** (II.1's `layer: 'underground'`) is stage 2's workflow; it reads the committed part and
  needs nothing from this volume beyond the records. The `underground` rows of volume 1's `hood.pins` (V1-2.2,
  V1-3.8.2, arena-keyed) are this volume's: it ships none, so an underground close-up draws no hood pins — the
  underground's furniture is its light rows (V4 §3.9) and its access marks (V4 §5.2) (J-V4.97).
* **The port's wiring to a live host** is the SettlementForge stage's; this volume reads only the neutral digest and the
  blueprint fields the port already fills (V4 §1b).
* **Crypts** — a church's burial vault in its own basement — are V03's (`Basement.crypt`, BCR-V3-20, derived with the
  basement; the cathedral's largest-crypt bar), V11's (the class rows' three-valued crypt column) and V02's (the forced
  basement), g item 109 (k) (2). This volume lays nothing with a church as its source; it reads `Basement.crypt` only for
  the crypt join (V4 §3.5.7 (c)) and the class's crypt column only for the church-class host rule (V4 §3.5.1 (9)).
* **The raised way itself** — its generation, course, raised-way piers, spans and their `use`, and its decay and repair —
  is the base's (g item 110 (b); BCR-45 states the span rule) and V06's over epochs (V6 §3.19); this volume lays the arch
  vaults the base's `vault` spans name, the aqueduct's terminal cistern and nothing on a raised deck. The vault's infill wall
  and door on the ground view are the base's drawing.
* **Terraces and deck plots.** `RetainingWall` and the levelling are the base's (S10–S11, g item 110 (a)); this volume reads
  the walls and the levelled ground. Deck plots (item 110 (d)) have no underground part: a deck building has no basement,
  no dig floor and no crypt (V2 §3.16 (6)), so U-ACCESS (d) and L3 never meet one.
* **The second known-city fixture** (item 110 (e)) is V12's; its raised road and ravine run this volume's bars T-V4-62 –
  T-V4-70.
* **The ancient-culture plan rows, the persistence order, the rank weights and the `ruin` naming slice** are V11's
  content; their schema is V4 §2.3's.
* **The scheduling over epochs** of excavation, catacomb growth, ruin decay and the links' re-binding is V06's, over this
  volume's rules (V4 §3.10).
* **The controls** for `showUnexcavated` and for the active layer are V09's; this volume declares the view key and what it
  draws.
* **The village product's display of the layer** is V07's; this volume runs the tail at the village rungs (V4 §3.1).
* **The clerk's explanations** are V10's, reading `cause`, `blockedBy`, `reusedBy` and the records this volume writes.
* **The port's side of the dossier sources** is V08's; this volume traces every fact it reads (V4 §1b.5).
* **Nothing else is out of scope.** Caverns and ruins exist at every rung (g item 109 (j) (1)); the other void systems keep
  TOWN and above, save an inherited system in maintenance mode at a village rung (V4 §3.1) and the arch vaults and terminal
  cistern, which follow their raised way at every rung; the dug passage exists at every rung.

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every record, field, table, stage output, interface, edit kind and entity kind this volume adds, with its producer and
its consumer. "BCR-n" marks a piece that lands in the base by a change request (section 10). A piece with no consumer
would be dead engineering; none is listed without one.

### 1b.1 Records, fields and tables

| piece | fed by (producer) | feeds (consumers) | base hook |
|---|---|---|---|
| `Outfall` (the type, BCR-1) | S1 (3) writes `Terrain.outfalls` (where drainage leaves the land); U-NET N2 writes `Tunnel.outfall` | U-NET N2 (candidates), N3 (roots); U-LINK L1 (a route outside); §8.2's mouth glyph; §11.1's GeoJSON point | §2.3, §2.7 |
| `Junction` on an underground part, with `chamber` (BCR-2) | U-NET N9, U-CITY C3 (walkway junctions), U-SYS (gallery junctions), a `drawTunnel` fold | `corridorUnion` (the wedge's owner, §2.2 rule 1); the `tunnel` light rows (V4 §3.9); the chamber program (V4 §5.2); U-FRONT F2 (no plot on a chamber wedge) | §2.4, §3.7 |
| `Way.flowToward` as a derived reading (BCR-2) | `wayFall(way)` over the terrain sampler, at read | U-NET N3's edge direction; the reader (§11.2) | §2.4 |
| `Tunnel.depthOffsetCm` (BCR-3) | `setAttr` (V4 §4.2) | U-NET N7 (added to the derived invert); every re-derivation of the run | §2.7, §7.1 |
| `Tunnel.chambers` as a view (BCR-3) | the kernel's resolution of the wedges at the run's `chamber` junctions | the chamber program; VTT's portals; the glTF chamber solids | §2.7 |
| `Chamber.kind` (BCR-3) | U-SYS (each kind's chamber rows), U-CITY C2 (`market`), `drawChamber` | §8.2's chamber program (cistern water, ossuary niches); the light rows' `chamber` host; U-CITY C1 (void choice); labels | §2.7 |
| `District.core` (BCR-4) | U-CITY C2 | U-CITY C3 (walkways end at its plaza rim), C4 (the black market's plot and the ring's stall pins), C5 (the parent, through `districtsAbove(part, core)`, V1-3.16; SLR1-07); the light rows (C6: the market chamber's braziers); the label anchor of the neighbourhood | §2.5 |
| `NetworkRule` (`tables/under/network.json`) | shipped defaults; `editTable` (§7.6) | U-NET N1–N12; U-FORECAST | §7.6 |
| `UndergroundFadeRule` (`tables/under/fade.json`) | shipped defaults; `editTable` | U-FADE (V4 §3.10) | §4.11's decline table (a sibling table) |
| `UnderLayoutRule` (`tables/under/layout.json`) | shipped defaults; `editTable` | U-CITY C2–C3 (carve, plaza, walkways), U-LINK L1 (lifelines), the light placement's lived scope (V4 §3.9) | §7.6 |
| the underground light rows (rows of `lights.json`, arena `underground`) | shipped defaults (V4 §3.9) | S11's light placement run by U-FRONT, U-SYS, U-CITY, U-LINK on their parts | §4.7 |
| `NetworkForecast` (derived, never persisted) | U-FORECAST at S7b (in a hood document after the one-district allocation, V1-3.10.1 step 6) | S7b (6) (the capacity cap), S7b (7) (the void capacities) | §4.5 |
| `StageDecl.phase` (BCR-5) | the registry declarations of the nine engines | §4.1's scheduler (the tail after first paint) | §4.1, §4.12 |
| the two controls `layers.sewers.family`, `layers.sewers.preset` (BCR-9) | the recipe's params (§2.9), the advanced panel | U-NET (family, preset); U-FRONT (preset's navigable rows); U-CITY (`UndercityRule.presets`) | §7.8 |
| `LayerSpec.underView` and the roles `rock`, `void` (BCR-10) | the style sheet and `setLayer` | S14's underground build, the tile worker | §8.2, §8.4 |
| label kinds `tunnel`, `system` (BCR-17) | S13a in the tail | S13b, the knowledge filter | §9.1 |
| naming slices `sewer`, `catacomb`, `cavern`, `quarry`, `vaults`, `buried`, `undercity.plaza` (BCR-18) | the naming pack | S13a's naming of named runs, systems and the main chamber | §10.4 |
| the dossier rows `tables/dossier/sanitation` and `tables/dossier/subterranean`, with their rows (V4 §2.3a; BCR-14) | shipped rows, not calibratable (dossier row sets: every column `calibratable: false`, as V11 §3.1 row 63's; SCC-R2C-2's V04 half) | the port's creation (door 1): `toggles.sewers`, a system's forced existence, a placement's `arena` row, each record's binding target (V4 §2.3a) | §7.7 DR17 |
| F-NET (BCR-7) | U-NET's detections | the report's `requestedVsBuilt` and ladder counts (§5.4) | §5.2 |
| `RuinRecord` (V4 §2.2) | U-SYS V4 §3.5.0a | U-SYS's layout and decay; U-ACCESS (the entrance at its marker); U-CITY C1 (the rank) and C2 (core candidates); S13a (its name); S14 (the `ruin` program); the exports; V08's `magical_node` site through `ruinCentre()`; the report's `ruin.node` line (V4 §3.5.0a (9)); V12's `undergroundInputOf` | §2.7 (the `ruin` kind, g item 109 (b)) |
| `ruinCentre(doc)` (derived) | `RuinRecord.centre` | V08 (the `magical_node` site at the ruin's heart, g item 109 (f); DR-V8.2), the ruin light rows, the `ruin.node` line's test (V4 §3.5.0a (9)) | — |
| the report line `ruin.node: { deposit: Id; ruin: Id; name: NameRef }` (V4 §3.5.0a (9); SL-03) | the tail's T6, after S13a names the ruin: one per `magical_node` deposit whose site stands at `ruinCentre()` | V05's why ("the node beneath the old ruins", V5 §3.3, §4.5), V10's why, the reader | §5.4 |
| `CatacombComplex` (V4 §2.2) | U-SYS V4 §3.5.1 | U-SYS (growth, ratchet, the rank cap against the primary), `CatacombGrowth.grow` under volume 6's `under.extend` (epoch growth with V06's cap and primary), U-FADE (usage), U-ACCESS (crypt joins), S13a (its name), S14 (ossuary fill), V12's `catacomb.extentM2`, V10 (`blockedBy`), the report | §2.7 (`UndergroundSystem.sources`) |
| `AccessPoint.cause` (BCR-30) | every creator: U-NET N11, U-SYS's entrances, U-ACCESS, U-FRONT F5, U-LINK L1, L3, L5, U-DIG, the edits, the upgrade | the excavation reading, V10's why, V12's `void.*`, V03's access head (`AccessHostRow`), volume 1's opening pass (a catacomb entrance selected by `cause.system`, V1-3.7.1; SLR2-15), GeoJSON | II.7.4 |
| `UndergroundLink.cause`, `Gallery.reusedBy`, `Chamber.reusedBy` (BCR-33) | U-ACCESS, U-LINK L1, U-SYS (tomb reuse, the quarry ossuary), the edits | the excavation reading, the adopting system's extent and program, V10, V12's `link.*`, GeoJSON | §2.7 |
| `excavation(cluster)` (derived, never stored) | U-ACCESS (g) over the connection graph | U-CITY C1, U-FRONT F6, the knowledge filter, S14's unexcavated style, the light rows, V12's `undergroundInputOf`, V10, volume 1's `DistrictContext.under[].access` (V1-2.3; SLR2-15) | — |
| `UndergroundSystem.variant` (BCR-32) | U-SYS V4 §3.5.2 (a fissure) | S14, V12 (a `cavern` with its variant), T-V4-12 | §2.7 |
| `Tunnel.grilles`, `Tunnel.name` (BCR-44, BCR-3) | U-NET N11a; S13a | S14 (the grille bar), VTT (closed portals), labels, the reader | §2.7 |
| `NetworkForecast.undercity`, `.voidAccess` (P6, P7) | U-FORECAST (in a hood document P7's cap from the one-district allocation's poorest-band households, V4 §3.1's hood line) | S7b (7), S7b (6)'s void-dwelling part, U-CITY C0 (re-read, never re-drawn), U-FRONT F6 | §4.5 |
| `RuinRule`, `OpeningRow`, `DigRule`, `CatacombRule` (`tables/under/ruin.json`, `openings.json`, `dig.json`, `catacomb.json`) | shipped defaults (V4 §2.3; V11 fills the culture rows, the persistence order, the rank weights and the ruin slice); `editTable` | U-SYS, U-ACCESS, U-CITY C1, U-FADE, U-FORECAST P5–P7, V12's bars | §7.6 |
| `UnderLayoutRule.openings`, `.forecastSafety`, `.crowdCap`, `.voidDwellings`, `.accessForecastMin` | shipped defaults | §8.4 (b)'s shaft (BCR-38), glTF, VTT, the symbol size; S7b (6)–(7) (BCR-19); F0 and C1's surplus absorption; F6; P7 | §7.6 |
| the register entries of this volume's calibratable columns (V12 §2.6's `CalibrationEntry`, one per column; V4 §8 *The register at each exit*; SCC-R2C-14) | the seat landing each step of V4 §8, in the step's change: V12 §3.11's lines for V04's cells, then `plat calibrate register --defaults` for the rest (J-V4.117) | the provisional-number lint (`plat calibrate register --check`, T-V12-20) at PR tier and at each step's exit; the history rows the due steps append (T-V4-43, T-V4-44, T-V4-45, T-V4-62, T-V4-68; the V4-U5 panel); the corpus stage's target lists at the default line's due — M-CAL, or the underground's later corpus run when a step lands after M-CAL (V12 §3.10.1, §3.10.5; SCC-R3C-1, SCC-R3C-13) | §13.7, §13.9 |
| the second values of V4 §8's fallbacks table (`distinct.rotateDeg` 45; `monument.tierDecay` 0.9 with `monument.ceilingClearCm` 150) | V4 §8 (J-V4.118) | V12 §3.11's `under.ruin` V04 line: a fallback run (V12 §3.7) after T-V4-45's miss, the panel rule after a V4-U5 No | §13.7 |
| `recipe.layers.ruins` (BCR-35) | the recipe's params; the advanced panel's *Ancient ruins* | U-SYS V4 §3.5.0a (the no-dossier chance), U-FORECAST P5 | §7.8, D-3 |
| the view key `showUnexcavated` (BCR-V9-20; J-VI.19) | volume 9's per-viewer control (not `setLayer`) | S14's unexcavated style (drawn only for a `secret` key) | §8.4 |
| the stage warnings `W_NET_CROSS`, `W_BASEMENT_NEAR_VOID`, `W_VOID_UNDER_WATER`, `W_RUIN_SIMILAR`, `W_CATACOMB_BELOW_TOWN`, `W_SUBTERRANEAN_WET`, `W_OUTFALL_LOW`, `W_RUIN_SOURCE_REMOVED` (BCR-41) | the tail stages (the last by U-SYS or the dossier phase's mutation, V4 §2.6) | the report's `stages[].warnings`, V10 | §5.4 |
| `underDistance(member, target)` (V4 §3.6a) | the part's walkway, gallery and tunnel graph and the solver's `street` mode | S10b's relation families for underground members (supply, clientele, competition, links, comfort), the coverage catchments | §4.7 S10b; g items 103, 105, 107 |
| T8's writes | U-RECONCILE | the ground's model digest (finalised after T8), the report's `requestedVsBuilt` | §4.7 S10b |
| `ChamberKind` `archVault` and the arch-vault chambers (V4 §3.5.4 (d); C4-110-1) | U-SYS's vaults step from the base's `vault` spans (BCR-45); `ArchVaults.reconcile` at an edit or an epoch | S14 (the vault hatch in the shallowest band), the exports, V10 (the span's reason), a declared institution's placement and V03's plan of it | §2.7 (BCR-3, BCR-46) |
| `Chamber.span` | the arch source | the reconcile (create, collapse, delete by key), V10, GeoJSON | §2.7 (BCR-46) |
| `Chamber.monument` (`MonumentRecord`; C4-110-8) | the ruin step (V4 §3.5.0a (5a)) through V02's `layTiers`; a `setAttr` on `monument/count` | S14 (a ring and a shadow per standing tier, the mound), the light pass's prisms, U-CITY (obstacles; the core's plaza), GeoJSON rings, glTF prisms, V10 | §2.7 (BCR-46) |
| `Chamber.columns` and `ruinColumns(chamberId)` (derived; C4-64 (5)) | the ruin step (V4 §3.5.0a (5b)) | the ruin program's column dots, V03 §3.12 (6)'s fixed rings, U-CITY's cut (obstacles), glTF and VTT | — |
| `CultureRow.monument` (V4 §2.3) | V11's ancient-culture rows (critique-V11 V11C-35 (5)) | the ruin step's monument rule | §7.6 |
| `foundationObstacles(doc)` (derived; C4-110-5) | the base's raised-way piers (to `raised.supportFoundationCm`, BCR-45), the `RetainingWall` footings, the buried aqueduct stretches | the shallow-element rule and the ruin's inverse rule (V4 §3.5.0), the cavern step, catacomb growth (`blockedBy: 'foundation'`), the forced vaults, U-DIG's cost, U-CITY's carve | g item 110 (a), (b) |
| `FoundationsResult` (derived, V4 §2.4; TR-07) | `Foundations.apply` at an epoch | volume 6's `under.extend` (the vacated households re-homed inside the participant, V6 §3.18.1 (4)), its report `under.collapsedByFoundation`, V10 (the footing that filled a void) | — |
| `aqueductDelivery(doc)` (derived; C4-110-6) | the base's aqueduct records: the terminal and the fountains it feeds (BCR-45) | the cistern test (V4 §3.5.4 (c)), the terminal cistern | g item 110 (b) |
| the terminal cistern (C4-110-6) | U-SYS's vaults step, one per aqueduct whose terminal kind is `cistern` | its `well` access, N8 (the terminal building's `channel` need), S14, V10 | II.7.6 (BCR-20 as amended) |
| the wall-crossing knots and drops (V4 §3.2 N6–N7; C4-110-7) | U-NET from the base's `RetainingWall`s and levelled ground | N7's inverts, S14's drop glyph, GeoJSON's invert profile | g item 110 (a) |
| `Entrance.faces` `'tunnel'` (C4-64 (4)) | S11 under F4, F6 and C4 | V03 §3.12 (4), VTT portals | §2.6 (BCR-V3-21) |
| `CatacombComplex.blockedBy` `'rung'` (C4-65 (1)) | U-SYS at a village rung (V4 §3.5.1 (6)) | V10, the report, V07's hand-off down | — |
| `UnderLayoutRule.openings.archDoor`; the `vaults` row's `archVault` and `terminalCisternM2` params | shipped defaults | the arch vault's geometry and door light, the terminal cistern | §7.6 |
| `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR`, `W_TERMINAL_CISTERN_SKIPPED` (BCR-41 as amended) | U-SYS | the report, V10 | §5.4 |

### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `SewerStrategy.derive` | U-NET (`@plat/under/net`) | the tail scheduler, first, after the first paint (V4 §3.1); volume 6's `under.extend` (`afterGrowth` 10) at the first epoch whose prelude turns `Features.sewers` on (V6 §3.2): U-NET whole over the current ways as the epoch's mutation, every existing entity kept and never re-derived, then U-ACCESS (a)'s overlap test over the new runs (V4 §3.10) |
| `SewerStrategy.extend` (V4 §3.10) | U-NET | volume 6's `under.extend` (`afterGrowth` 10) at every later epoch with `Features.sewers` on; on the grow-by-stage path, §4.11's grow step after the new stage's S11 (BCR-6) |
| `NetworkForecaster.forecast` | U-FORECAST (`@plat/under/forecast`) | S7b (6), (7) in `@plat/content` (BCR-19); in a hood document run by volume 1's unit run after the one-district allocation (V1-3.10.1 step 6; V4 §3.1's hood line) |
| `UndergroundStrategy.derive` | U-FRONT | the tail scheduler |
| `UndergroundSystemStrategy.derive` ×6 (ruin first) | U-SYS | the tail scheduler, in V4 §3.5.0's order |
| the buried-system builder (V4 §3.5.5) | U-SYS (`@plat/under/sys`) | T2's buried step (a history scar at generation); the `raiseGrade` conversion's operator (II.7.6) at an epoch (volume 6's hazard phase, V6 §3.11.6) or by hand, which passes it the raised region's records and the `RetainingWall`s the same batch tombstones (V6 §3.19.4 (1)), read on their last live state as the buried floor's steps (TR-11) |
| `UndercityStrategy.derive` | U-CITY | the tail scheduler |
| `UndergroundLinkStrategy.link` (BCR-26's return) | U-LINK | the tail scheduler, T5, after U-CITY |
| `AccessPass.run(doc, scope?: EpochScope)` (U-ACCESS; `excavation(doc, cluster)`) | `@plat/under/access` | the tail scheduler, T2b, after U-SYS, with no scope (the whole document; at a village rung every mining use's outside-plot working, V4 §3.5.7 (a)); volume 6's `under.access` (`afterGrowth` 20) with the epoch's scope — `scope.workings` included (TR-12) — its last step volume 1's opening pass over the public openings it made (V4 §3.10); every commit that touches an access, a link, an element's closure or a building over a void (the excavation reading only) |
| `ruinCentre(doc)` | U-SYS | V08, the ruin light rows, the `ruin.node` report line (T6) |
| volume 1's opening pass (V1-3.7.1; SL-06, SLR1-04) | V01's local-place step (`@plat/hood`; called only while it is registered and runs — while `fabric.extensionWeight` > 0, V1-3.7.1, V1-3.15; V4 §8; SLR4-06) | inside every commit that creates, removes or re-kinds an access V1-3.7.1 selects (V4 §3.10): the tail's T6 at generation, after S13a names the systems and complexes (V4 §3.1); at an epoch the last step of `AccessPass.run` with a scope and of `CatacombGrowth.grow` when it lays a new complex's entrance; in an edit the commit of a `delete`, a `setAttr` of `kind` or `role`, a `placeAccess` making a public opening (V4 §4.1), the `delete` of a gallery or chamber carrying a selected access (the access removed with its element), a `regenerate` of a `cavern`, `ruin` or `quarry` system after U-ACCESS (e) re-runs over the regenerated elements' candidates (SLR2-08), a dwelling declaration's closure whose second or third rung makes a public opening (V4 §3.8), or the re-derivation that an `editTable` or `editPreset` of volume 1's stage-2 switch makes (V1-3.15, *The switch's edit*), at its T6: raised above 0, the places made; lowered to 0, none made and the old ones retired by §6.3's carry-over (SLR4-06, SLR5-01; J-V4.121) — one `HoodPlace` of kind `opening` per public opening of role `access` and per catacomb entrance, made and named on `naming` by V1-2.8's key, or tombstoned with its host or retired by a switch edit's re-derivation (V1-3.15), each a fate of the commit; records and labels only |
| `districtsAbove(part, element)` (V1-3.16; SLR1-07) | V01's `@plat/hood` (V01's W15) | U-CITY C5 (an undercity neighbourhood's `parent`: the first entry for its core, II.7.5 (2)); §4.5's clerk (the districts above a ruin) |
| `fabricSignature(region)` (V1-3.16; SLR1-07) | V01's `@plat/hood` (V01's W15) | V4 §3.5.0a (7), the ruin's distinctness step, with the ruin's outline |
| `ArchVaults.reconcile(doc, raised, cause)` (V4 §3.5.4 (d)) | U-SYS (`@plat/under/sys`) | the tail's T2 vaults step (every raised way); the commit of a ground edit that adds, removes or re-shapes a raised way or sets a span's `use` (V4 §4.3); V06's `under.extend` at an epoch over `EpochScope.raised` (W65) |
| `foundationObstacles(doc)`, `aqueductDelivery(doc)` | `@plat/under/sys` | the readers of §1b.1's rows |
| `Foundations.apply(doc, scope: EpochScope, cause): FoundationsResult` (V4 §3.5.0; TR-07) | U-SYS (`@plat/under/sys`) | volume 6's `under.extend` (`afterGrowth` 10), its first act (V6 §3.18.1 (6)), at every rung, the maintenance mode included: V4 §3.5.0's rule over the new footprints and basement rings of `scope.built` and `scope.basementGrown`, the raised-way piers of `scope.raised` and the retaining-wall footings of `scope.levelled` — an older void's gallery stretch within reach split out `collapsed`, a chamber covered by at least `collapseShare` `collapsed`, a pillar otherwise, a later system's element within reach `collapsed`; cause `foundation`, `event` the epoch's `seq`; it returns the collapsed elements and the void dwellings vacated on collapsed floors, their households for the caller's re-homing (V6 §3.18.1 (4)) |
| `ruinColumns(chamberId)` | `@plat/under/sys` | V03 §3.12 (6), S14's ruin program, the glTF and VTT exports |
| `SewerStrategy.extend`'s wall drops over `EpochScope.levelled` (V4 §3.10) | U-NET | V06's `under.extend` (W65) |
| `underDistance(member, target)` | `@plat/under/distance` | S10b's scorer on the underground parts (V4 §3.6a) |
| `CatacombGrowth.grow(doc, epoch, opts?: { capM2: Record<Id, number>; primary: Id; deaths?: number })` (V4 §3.5.1 (5)–(8)) | U-SYS | volume 6's `under.extend` (`afterGrowth` 10, after the sewer's extension) with its per-complex cap, derived primary and the span's calamity deaths (V6 §3.18.2 (3), (3a); `CalamityRef.deaths`, V08 §3.6; TR-10), its last step, when it lays a new complex's entrance, volume 1's opening pass (V4 §3.10); on the grow-by-stage path, `SewerStrategy.extend`'s growth stage; every re-derivation (the ratchet) — the last two with `opts` absent (V4 §3.5.1 (5)) |
| `QuarryWorkings.extend(doc, scope: EpochScope, epoch)` (V4 §3.5.3; ST-23) | U-SYS | volume 6's `under.extend` (`afterGrowth` 10, after the catacombs' growth), TOWN and above; on the grow-by-stage path, `SewerStrategy.extend`'s growth stage |
| `workedOut(working, scope?)` (derived; V4 §3.5.3) | `@plat/under/sys` | V4 §3.5.1 (1) (e)'s quarry-ossuary candidates, volume 6's candidate list (V6 §3.18.2 (1)), V10 |
| `Reconcile.run` (T8) | U-RECONCILE | the tail scheduler, last |
| `DugGenerators` (basement, target, connector, system, access, reservation, link) | U-DIG | `addUndergroundAccess`'s closure (§7.3 item 9), U-LINK's lifeline closure (II.7.5), U-LINK L5 for a subterranean dossier institution (V4 §3.7); a dwelling declaration's closure on a sealed void (its first rung: target, connector where needed, access, reservation) and the grouped access before it (BCR-V9-22, as file f item 372 applies it; V4 §3.8; SR3-11) — at an edit's dry run, and in a skeleton prefix at U-CITY C0 (V4 §4.7) |
| `UndergroundFade.candidates` / `.apply` | U-FADE | volume 6's `under.fade` (`decline` 10): the underground's own lottery after the fabric pool, uncapped by the district's `fabric` cap (BCR-6; V6 §3.5.2); a hand `convert` (§7.1) |
| `UndercityEpoch.reread` | U-CITY | volume 6's `under.undercity` (`afterGrowth` 30), then F6 over the clusters `under.access` made accessible, its new dwellings filled by volume 6's relocation of the district's poorest-band ground households (up to `voidDwellings.share` and each cluster's `maxHouseholds`), never an S7b (6) allocation at an epoch (V6 §3.18.1 (4); BCR-6; TR-08); the households a shrinking or cleared neighbourhood vacates returned to the participant for its re-homing |
| `drainOf(plot)` (II.7.1's view) | U-NET's `serves` | §11.2's reader; the plot inspector |
| the underground display list (semantics `under.*`, V4 §5.2) | S14's underground builder in `@plat/render` | the tile worker; the exports |
| per-band exports | `@plat/export` (V4 §5.5) | the user; a VTT host |

Each stage's output is consumed: the `sewer` system record and part 0's tunnels by U-FRONT, U-ACCESS, U-LINK, S14 and
the exports; U-FRONT's plots by S10b, S11, S12c, S13a and the statistics; U-SYS's parts by U-ACCESS, U-CITY, U-LINK,
S14; U-ACCESS's links, accesses and excavation reading by U-FRONT F6, U-CITY C1, S14, the filter and the reader; U-CITY's
districts by S12c (character), S13a (names), §9.1's quarter tree; U-LINK's links and accesses by S14, §2.6's plan rung
reservation and the reader; T8's writes by the ground's model digest and the report.

### 1b.3 Edit kinds (each with its tool, lifecycle row and undo)

| edit | the authoring tool (§7.1's twelve) | lifecycle row | undo |
|---|---|---|---|
| `drawTunnel` (with `from`, BCR-8) | T4 `road` (on the underground layer the road tool draws a tunnel) | §7.4's underground tools row | the replaced underground scope |
| `drawChamber` (with `from`, BCR-8) | T6 `place` (a chamber is placed by one point and a size) | the same row | the same |
| `addLink` | T4 `road` (two points on two elements) | the same row | the same |
| `placeAccess`, `addUndergroundAccess` | T6 `place` | the underground tools row; the closure row | the closure record |
| `setAttr` on `depthOffsetCm`, `widthCm`, `headroomCm`, kind, `knownTo`, `state`, `Chamber.kind` | T9 `shape` | §7.4's setAttr row | the inverse |
| `convert` `silt`, `caveIn`, `seal`, `reopen`, `flood`, `raiseGrade`, `clearUndercity` | T9 `shape` | §7.4's convert row | the replaced scope |
| `regenerate` on a tunnel run, a system, an undercity neighbourhood | T10 `hold` | §7.4's regenerate row | the replaced scope |
| `adjust` of `layers.sewers.family` / `.preset`, of `recipe.layers.ruins`, of the TOWN *Sewers* toggle (Re-derive from S7b with carry-over; BCR-9, BCR-35, BCR-37) | T1 `intend` | §7.4's adjust row | the replaced scope |
| `drawTunnel` / `drawChamber` with system `ruin` (on the ruin's axis) | T4 `road` / T6 `place` | the underground tools row | the replaced scope |
| `placeAccess` over an unexcavated cluster (the user's excavation, cause `edit`) | T6 `place` | the underground tools row | the replaced scope |
| `setAttr` on a `CatacombComplex`'s `fill` | T9 `shape` | §7.4's setAttr row | the inverse |
| `delete` of catacomb galleries (lowers `extentFloorM2`, tombstones the nodes; J-V4.56) | T9 `shape` | §7.4's delete row | the replaced scope |
| `setLayer` (underground visibility, `underView`, `showUnexcavated`; `depthBand` is a view key) | T12 `dress` | §7.4's layer row | the inverse |
| `placeLight` on an underground host | T12 `dress` | §7.4's light row | exact |
| `setAttr` on a raised way's span `use` (the base's path `spans/<a>-<b>/use`, BCR-45; a held user edit) — V04 lays or removes that span's arch vault in the same commit | T9 `shape` | §7.4's setAttr row | the inverse (the chamber restored with its id) |
| `setAttr` on a ruin chamber's `monument/count` (the monument re-laid by `layTiers`) | T9 `shape` | §7.4's setAttr row | the inverse |
| a raised way added (T4 `road` with `raised`, the aqueduct class) or deleted (generated or drawn): the base's edit, with V04's arch vaults, their links and accesses as fates in the same commit (C4-110-3) | T4 `road`; T9 `shape`'s delete | the base's rows; V4 §2.6's arch-vault row | the replaced scope (the vaults' ids restored) |

### 1b.4 Entity kinds (each rendered, labelled, exported, persisted)

| entity | rendered (V4 §5.2) | labelled (V4 §5.4) | exported (V4 §5.5) | persisted |
|---|---|---|---|---|
| `Tunnel` | band by kind, states | a named run (trunk, culvert) | GeoJSON, SVG, PNG, VTT walls, glTF, CityJSON `Tunnel` | part 0 chunk (§3.9) |
| underground `Junction` | wedge; a chamber in `chamber` | none | as the wedge face (GeoJSON) | part chunk |
| `UndergroundSystem` | its part's rock and voids | a system label (catacombs, caves, quarries, old town) | GeoJSON (a feature per system with its part and depth range) | entities block |
| `Gallery`, `Chamber` | the system programs | the main chamber's name | all six formats | part chunk |
| `UndergroundLink` | by kind | none | GeoJSON line, VTT portal, glTF opening | entities block |
| `AccessPoint` | its underground end: symbol by kind and state, sized by its opening row; the shaft's light — its surface head is volume 1's ground symbol (V4 §5.2 (7)) | none (a public opening's or a catacomb entrance's place is volume 1's `HoodPlace`, made by the opening pass: T6 at generation, the commits V4 §3.10 names after it) | GeoJSON point (with `cause`); VTT: a portal only for a door in a wall line, else a shaft light and a `plat` extension object; glTF shaft of the opening's section | entities block |
| ruin `Gallery`, `Chamber` | the `ruin` program; the unexcavated style while unexcavated | the ruin's `system` label | as every system's; GeoJSON with `culture` and `excavation` | part chunk |
| `RuinRecord` | through its elements and its surface marker | its name (V4 §5.4) | the ruin's GeoJSON system feature | entities block |
| `CatacombComplex` | its galleries; the ossuary fill's niche density | "the Catacombs of ⟨cemetery⟩" | a GeoJSON feature per complex with `source`, `rank`, `extentFloorM2`, `fill` | entities block |
| a tunnel grille (`Tunnel.grilles`) | the gate bar across the band | none | GeoJSON point on the tunnel; VTT closed portal | with its tunnel |
| underground `Block`, `Plot`, `Building` | as ground, through the cut-away; `vault` hatch | cells unnamed; institutions by the knowledge filter | as ground at depth | part chunk |
| undercity `District` | its plaza and walkways | the Under-⟨quarter⟩ label | GeoJSON with `parent` | entities block |
| underground `LightSource` | the light pass | none | GeoJSON, VTT `lights`, glTF `KHR_lights_punctual` | entities block |
| `Outfall` (value on a tunnel) | the mouth glyph at the bank | none | GeoJSON point on the tunnel's feature | with its tunnel |
| an arch vault (`Chamber` of kind `archVault`) | the `vault` hatch in the shallowest band; the raised way's outline in the cut-away; the base draws its infill and door on the ground | one `system` label per raised way's run of vaults, "the ⟨way⟩ Arches" | GeoJSON with absolute floor and ceiling and `span`; VTT walls from the raised-way pier faces, its door a portal; glTF interior only | the vaults part chunk |
| a ruin monument (`Chamber.monument`) | a ring and a shadow per standing tier; the mound in rubble stipple | none (its ruin's label) | GeoJSON a Polygon per standing tier with `tier`, `baseCm`, `topCm`; glTF prisms | with its chamber |
| ruin column points (`Chamber.columns`, derived) | the ruin program's dots | none | glTF columns; VTT `line_of_sight` squares | never (derived) |
| the terminal cistern | as a `cistern` | none | as a chamber | the vaults part chunk |

### 1b.5 Dossier facts, traced to their field and derivation row

| fact the underground uses | dossier field (through `DossierDigest`, §14) | derivation row (§7.7) | reader here |
|---|---|---|---|
| population (the TOWN law, the size law's N) | the population | DR7, DR17 | II.7.1's law (S0), II.7.5's size law in U-CITY |
| wealth level (the TOWN law) | `wealth.label` → `intent.wealthLevel` | DR6, DR17 | II.7.1's law |
| sewers forced on at TOWN; the network's binding | an institution matching a `tables/dossier/sanitation` row (V4 §2.3a: `Sewage system`, a sanitation-tagged record, or a custom record whose resolved profile carries the tag `sanitation`, item 104 (a)) | DR17 (BCR-14) | the port sets `toggles.sewers = 'on'`; U-NET's gate reads `Features.sewers`; the `sewer` system takes the record's binding |
| a system forced to exist | an institution matching a `tables/dossier/subterranean` row naming a system kind (V4 §2.3a: `Underground network` → the dug network; a catacomb record → one complex; a mine record → a mine working; a cistern record → a cistern), or a custom record whose resolved profile matches (item 104 (a); V4 §2.3a) | DR17 (BCR-14) | U-SYS's existence (V4 §3.5.0), U-LINK L5's network (V4 §3.7), the binding |
| a crypt record | an institution matching the subterranean row `crypt` | DR17 (BCR-14) | its church building, which V03 §3.7.4 makes `always` (`Basement.crypt`), never a plan room and never a system (C4-64 (2)) |
| an institution placed underground | an institution with `facets.subterranean` and no system row | DR17, DR10 | S10b's `arena` hard row; on the surface, the basement row (BCR-43) and U-LINK L5 |
| the services and bans of `Underground network` | its record's services ("Discreet passage", "Untaxed storage") and `forbiddenResources` (marsh, floodplain) | DR17 (BCR-14), mapping row 34 | L5's network: the `beyondWalls` outlet first and a storage chamber; U-DIG's infinite cost on `damp` and `flood` cells |
| the undercity required or forbidden | `CircumstanceSlice.undercity` (§7.7 layer 2), set to `require` by an `Underground city` record | DR17 | U-FORECAST P6, U-CITY C0, the forced vaults (V4 §3.5.6); the first neighbourhood bound to the record and named by it |
| the black market's binding | a `Black market bazaar` record | DR9, DR17 | the core's black-market use (C5) |
| disorder | the blueprint's `disorder` | DR17 | II.7.5's size law; U-FADE's seal weight; the clearance rule |
| crime | `PortRows.crime` (item 88, staged) | DR16, DR17 | §4.6's access factor and undercity factor (J-A88.41) |
| concealment and knowledge of an institution | `facets.clandestine`, `knownTo` | DR16, DR20 | access `knownTo` (II.7.3 (4)), the concealed modes (F4, C4) |
| the settlement's age and scars | `history.ageYears`, `history.events` (→ `HistoryHint`, item 88, staged) | S2's stage count (§4.2 S2) | the catacomb age gate, the buried town (II.7.6), a ruin's `ageYears` |
| an ancient ruin | `site.deposits` of kind `ancient_ruins`, or an institution of scene archetype `ruined-landmark` (item 104) | DR19, DR24 (BCR-34) | V4 §3.5.0a's strongest source; the port's ruin decoration becomes its surface marker; a source the dossier later removes clears `RuinRecord.source.ref` and the ruin stays (V4 §2.6) |
| a magical node and ley lines | `site.deposits` of kind `magical_node`; the economy's "Magical ley lines" income rows | DR19 (BCR-34) | a ruin source (`ruin.chance.magic`); the node's site at `ruinCentre()` (V08, DR-V8.2) and the report's `ruin.node` line, which V05's and V10's why read (V4 §3.5.0a (9)) |
| a magical history or an ancient founding | `history.events` of type `magical`; `history.ageYears` beyond `ruin.ancientYears` | S2, `HistoryHint` (BCR-34) | a ruin source (`ruin.chance.history`) and its `ageYears` |
| delving nearby | an institution of the Adventuring category whose tags carry `delving` | DR9 (BCR-34) | the ruin chance × `ruin.delvingFactor`, never alone |
| mining | `site.deposits` of kinds `iron_deposits`, `precious_metals`, `gemstone_deposits`, `coal_deposits`, copper | DR19 (BCR-34) | the cavern's mining test (V4 §3.5.2) |
| mountainous relief | `site.terrain` `mountain` | DR1 | the relief class (g item 109 (a) (1)): the cavern rows, the fissure gate |
| how many catacombs | the church-class records (`Parish church` and its count ranges, `Monastery or friary` and its counts) and item 108's collective members | DR9, DR10 (BCR-34) | V4 §3.5.1's count, which counts the buildings of the classes `cathedral`, `great_temple`, `church` and `v.parish_church` (V07's village class, V11 §2.9; SR1-24) on the ground and on every live sky island, each once (V05 §3.5 (3)), and each monastery's church (C4-65 (2)); re-read at each epoch by volume 6 (V6 §3.18.2 (1)) |
| the cathedral | `Cathedral (10,000+ only)`, `Great cathedral` | DR9 | V03's crypt (always, the largest); V4 §3.5.7's crypt join reads its `Basement.crypt` |
| the water system | an `aqueduct_or_water_system` record | V11's mapping to `conduit_house` (V08's trace; V6's factor on the aqueduct's chance) | no system of its own: its terminal building is the `conduit_house`, and where the aqueduct's terminal is a cistern, V4 §3.5.4 (e)'s terminal cistern lies under that building's yard (C4-110-6) |
| the burial faces | `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house`, `Graveyard`, `Cemetery network` | DR9, DR10, item 108 (BCR-34) | V4 §3.5.1's candidates (seated as `cemetery` uses; the network one ground beyond each gate); a village `Graveyard` forms none (the TOWN gate) |
| the calamity deaths (TR-10) | a calamity record's deaths (`CalamityRef.deaths`, V08 §2.6a (4), §3.6), carried by the port in `EpochInputs.events` | DR-V6.1, through volume 6 (V6 §2.4, §3.18.2 (3)) | `CatacombGrowth.grow`'s `opts.deaths` at an epoch: added to each face's need by its `burialShare`, never to the cap (V4 §3.5.1 (2), (5)) |
| a custom institution's siting and its chains | `DossierInstitution.custom` and its resolved profile; `activeChains` | DR24 (item 104), item 105 | the row-set match (V4 §2.3a); the chain mine (V4 §3.5.3) |
| the magic circumstance and the biome | `CircumstanceSlice.magic`, `.biome` | DR17 | the light rows (V4 §3.9) |

Every other value the underground holds is the map's own derivation (item 20 (h)): a gap in the dossier is filled by
these rules, never by a question to the host.

## 2 Data model

### 2.1 What the base already declares (read as declared)

`Features` (II.7.4, §2.9), `Tunnel`, `UndergroundSystem`, `Gallery`, `Chamber`, `UndergroundLink`, `LightSource` (§2.7),
`AccessPoint`, `UndergroundRule`, `TunnelProfileRow`, `SewerExistenceRow` (II.7.4), `UndercityExistenceRow`,
`UndercityRule`, `ClearUndercity` (II.7.5), `UndergroundSystemRow`, `LinkRule`, `RaiseGrade` (II.7.6), `DeclineOp`'s
underground ops (§4.11), `District.parent`, `.outskirts` and the `underground` and `undercity` kinds (§2.5),
`ContextVector.arena` (§2.5), `Terrain.geology` (§2.3), `Document.nextUndergroundPart` (§2.9), the vertex and edge roles
`tunnel`, `gallery`, `chamber_wall`, `access_point`, `link_end`, `invert_knot`, `margin` (§2.2 rule 7) and the class
table's `drain`, `underground`, `undercity`, `undergroundAccess` and concealment columns (§10.2). Units, ids and
addresses are §2.1's; every length below is an integer centimetre (`Cm`) or a metre field named `…M`.

### 2.2 New and changed fields

```ts
// BCR-1 (§2.3): the outfall type the base names and never declares
type OutfallInto = 'sea'|'lake'|'river'|'canal'|'ditch'|'moat'|'frame'|'stream'|'field';
interface Outfall {
  into: OutfallInto;          // from the receiving water's kind: river, tributary, distributary, estuary, islet_channel → 'river'; sea → 'sea'; lake, pond → 'lake';
                              // canal → 'canal'; ditch → 'ditch'; moat → 'moat'; the frame edge → 'frame'; a culverted brook's open course below the
                              // town (a drainage line that is no water body, V4 §3.2 N3) → 'stream'; U-NET's cess field outside the walls → 'field'
  water: Id | null;           // the receiving WaterBody; null for 'frame' and 'field'
  at: PointCm;                // the bank point (on the receiving body's shore chain), the frame-edge point, or the field's point in outside ground;
                              // a point-anchored value carried with the face it lies on under a warp or a vertex move by §7.4's point rule
  cell: number }              // the `hydro` cell containing `at` (§2.3), re-found whenever `at` moves
// Terrain.outfalls (S1's): one Outfall per bank stretch of `outfallStretchM` (50 m) of each water body into which D8 flow
// from land cells enters, and per 50 m of frame edge the flow leaves by — the one of largest accumulation per stretch.
// Tunnel.outfall (U-NET's): the Outfall the run discharges at; a copy of one of Terrain.outfalls at derivation, or a
// 'field' Outfall U-NET makes (V4 §3.2 N2); re-seated by V4 §4.3's outfall re-seat when a water edit moves its shore.

// BCR-2 (§2.4)
// Way.flowToward: no longer stored — the reading wayFall(way) (below); a stored value in an older document is dropped on
// load (§7.5), the reading being exact on every host.
function wayFall(way: Way, t: TerrainSampler, rule: NetworkRule): 'from'|'to'|'level';
  // h_from − h_to at the spine's end vertices: > rule.levelCm → 'to'; < −rule.levelCm → 'from'; else 'level'
interface Junction { /* §2.4's fields, and: */
  arms: Id[];                 // ways; on an underground part the tunnels or galleries meeting there (V4 J-V4.37)
  chamber?: true }            // underground only: a junction of ≥ `chamberMinArms` navigable arms in the navigable preset — its wedge
                              // is drawn and used as a sewer chamber (V4 J-V4.9); derived by U-NET N10 and on every re-derivation of
                              // the arms, never edited on its own (a width edit on an arm re-derives it)

// BCR-3 (§2.7)
interface Tunnel { /* §2.7's fields, with: */
  outfall?: Outfall;          // typed by BCR-1
  serves: Id[];               // the plots drained through this run (J-V4.43), sorted by address; a plot's buildings drain through their plot
  chambers?: FaceRef;         // a view: the wedges of this run's end junctions whose `chamber` is set; never stored separately (J-V4.44)
  depthOffsetCm?: Cm;         // a hand offset added to the derived invert at every knot, ≤ 0 deeper, > 0 shallower, clamped by V4 §3.2 N7;
                              // absent = 0; written only by `setAttr` (V4 §4.2)
  name?: NameRef;             // a trunk's or a culvert's name (V4 §5.4), drawn by the tail's S13a with its NamingRecord; a setAttr
                              // on it makes it a protected name (§2.8)
  grilles?: Cm[] }            // BCR-44: a view, never stored — the stations along the centreline where the run's band crosses an enceinte's
                              // wall_strip, a quay wall or a sea wall (V4 §3.2 N11a)
type ChamberKind = 'ossuary'|'hall'|'breakdown'|'workings'|'cistern'|'streetVault'|'bridgeVault'|'archVault'|'square'|'storey'|'market'
  |'cellar'|'storage'|'temple'|'court'|'tomb'|'vault'|'room'|'gate';
                              // ossuary (catacomb); hall, breakdown (cavern); workings (quarry); cistern, streetVault, bridgeVault,
                              // archVault (vaults: archVault the walled-in arch of a raised way's span, at grade, V4 §3.5.4 (d));
                              // square, storey (buried); market (the undercity's carved main chamber); cellar, storage (dug);
                              // temple, court, tomb, vault, room, gate (ruin; `hall` and `cistern` also serve a ruin)
interface SpanKey { raised: Id; a: number; b: number }   // a raised way and the keys of the two raised-way piers bounding one of its
                              // spans (BCR-45: a raised-way pier's key is minted once along the deck and never reused), a < b along the deck
interface MonumentRecord {    // a ruin chamber's stepped monument (g item 110 (c); V4 §3.5.0a (5a); C4-110-8)
  host: 'temple'|'hall'|'tomb';   // the CultureRow.monument host it answers
  lay: TierLay;               // V02's `layTiers` result (V2 §2.6) in world centimetres on the lattice, after the ceiling cut (tiers,
                              // stairs and the shrine; `lay.truncated` counts V02's own truncation and V04's ceiling cut together)
  standing: number;           // tiers standing from the bottom (0 … the tiers laid): tier k stands for k < standing; the stair k with
                              // its tier; the shrine only when every tier stands and its own draw passes (V4 §3.5.0a (6))
  moundCm: Cm;                // the rubble mound's height over the first fallen tier's ring (0 when every tier stands)
  count?: number }            // the author's tier count (`setAttr` on `monument/count`), an input override; absent: ST1's draw
interface Chamber { /* §2.7's fields, with: */
  kind: ChamberKind;          // written by its system's layout, U-CITY C2 or `drawChamber`; read by §8.2's chamber row (BCR-40), the
                              // light rows' `chamber` host, U-CITY C1 and C2, the ruin program's column dots
  reusedBy?: { system: Id; since: number };    // BCR-33: an element another system adopted (V4 §3.5.7 (f)); `since` the epoch
  span?: SpanKey;             // BCR-46: an `archVault`'s span — persisted, written once by the arch source; the reconcile's key
  monument?: MonumentRecord } // BCR-46: persisted on a ruin `temple`, `hall` or `tomb` chamber whose culture row names it
// Chamber.columns: PointCm[] — a view, never stored (C4-64 (5)): the column centres of a ruin `hall` or `temple` chamber after
// the decay (V4 §3.5.0a (5b)); exported by @plat/under as ruinColumns(chamberId); read by V03 §3.12 (6), S14, glTF, VTT
interface Gallery { /* §2.7's fields, with: */ reusedBy?: { system: Id; since: number } }   // BCR-33, as on Chamber
// UndergroundSystem: `kind` gains 'ruin' (g item 109 (b)); it gains `variant?: 'fissure'` (BCR-32: a cavern of ordinary rock,
// V4 §3.5.2) and `name?: NameRef` (a system's label text, V4 §5.4); `sources` gains the building of a subterranean dossier
// institution whose passage U-LINK L5 dug, its burial faces (a catacomb), the ruin's dossier source (a ruin)

// BCR-4 (§2.5)
interface District { /* §2.5's fields, with: */
  core?: Id }                 // an undercity neighbourhood's main chamber — its plaza and black market (II.7.5 (2)); written by U-CITY C2

// BCR-29, BCR-30 (II.7.4): an access's new kinds, sources and its cause
// AccessPoint.kind gains 'sinkhole'|'collapsed_shaft'|'ruin_entrance' (public openings, V4 §3.5.7 (e));
// AccessPoint.source gains 'dig'|'opening'|'overlap'|'crypt'|'dossier'
interface AccessCause {
  rule: 'neighbourhood'|'basement'|'system'|'dig'|'opening'|'overlap'|'mineBreach'|'lifeline'|'edit'|'dossier'|'crypt'|'legacy';
  system?: Id;                // the system whose growth or rule made it (the reached void for a dig, the growing system for an overlap)
  event?: number }            // the `seq` of the edit or the epoch that made it; 0 at generation
// AccessPoint.cause: AccessCause — persisted, written once by the access's creator (V4 §2.6), read by the excavation
// reading, V10, V12's void measures, V03's access head, volume 1's opening pass (a catacomb entrance by `system`,
// V1-3.7.1; SLR2-15) and GeoJSON

// BCR-33 (§2.7): why a link exists
type LinkCause = 'proximity'|'overlap'|'mineBreach'|'reuse'|'lifeline'|'edit'|'dig'|'dossier'|'crypt'|'legacy';
// UndergroundLink.cause: LinkCause — persisted; its `kind` stays the condition and its `via` the opening (§2.7); item 109's
// "breach" is `via: 'breach'` and its "reuse" is `cause: 'reuse'`

interface RuinRecord {                       // one per ruin system, in the entities block; V4 §3.5.0a
  system: Id;
  culture: string;                           // a `RuinRule.cultures` row id (V11's rows)
  family: 'grid'|'axial'|'radial'|'terraced';
  centre: PointCm; axisDeg: number /* [0, 180) */; sharedAxis: boolean;
  outline: PolygonCm;                        // the plan's rectangle on axisDeg, clipped to the frame
  extentM2: number; significance: 'shrine'|'palace'|'district';
  ageYears: number; burialCm: Cm;            // the ancient ground's depth below the smoothed present terrain
  source: { kind: 'dossierRuins'|'ruinedLandmark'|'magicalNode'|'leyLine'|'magicalHistory'|'blueprint'|'declared'; ref: Id | null };
  marker: Id | null;                         // the surface decoration that marks it (the port's ruin decoration), if any
  name?: NameRef;
  attempts: number; similar: boolean }       // the distinctness retries used (0–4) and W_RUIN_SIMILAR (V4 §3.5.0a (7))

interface CatacombComplex {                  // one per catacomb complex, in the entities block; V4 §3.5.1
  id: Id; system: Id;
  source: { kind: 'churchyard'|'cemetery'|'network'|'monastery'|'quarryOssuary'|'legacy'; ref: Id };
                                             // the churchyard part, the cemetery use, the network's ground, the monastery's burial
                                             // yard, the adopted quarry working, or (legacy) the church an older document held
  rank: number;                              // 1 for the first formed; set at creation, never re-ranked; the primary (V4 §3.5.1 (5))
                                             // is a reading — rank 1 at generation, volume 6's derived primary at an epoch — never stored
  anchor: PointCm; axisDeg: number; floorCm: Cm;   // the grid's anchor and axis; the complex's one floor
  extentFloorM2: number;                     // the high-water extent: the ratchet's floor
  fill: number;                              // [0, 1]: how full its ossuaries are (stagnation's reuse)
  blockedBy?: ('reach'|'wet'|'system'|'foundation'|'wallStrip'|'depth'|'sourceClosed'|'rank'|'rung')[];   // derived at each
                                             // derivation; 'rung': the settlement stands below TOWN (V4 §3.5.1 (6); C4-65 (1))
  lastGrowth: { epoch: number; addedM2: number };
  tombstones: [number, number][];            // grid nodes (i, j) the author deleted: growth never digs them again (J-V4.56)
  overCount?: true;                          // an upgraded document holding more complexes than the count (V4 §4.6)
  name?: NameRef }
```

### 2.3 New rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

Every value below is **our own** (provenance `own`, `extension`: no reference has an underground — `ftg-posts-c.md`
records FTG's author stating underground settlements unsupported; MFCG has none), calibratable against the corpus when
its stage comes (§13.9). Historical anchors are named where a value leans on one; they are orders of magnitude, not
measurements.

```ts
type Preset = 'historical'|'navigable';
interface NetworkRule {                                    // tables/under/network.json — U-NET and U-FORECAST
  classes: Record<Preset, { main: WayClass[]; drain: WayClass[] }>;   // which ways may carry a main or a drain
  classCost: Record<WayClass, number>;                     // multiplies an edge's length in the tree search
  mainMinHa: Record<Preset, number>;                       // served area at which a run becomes a main
  drainMinHa: Record<Preset, number>;                      // served area at which a run becomes a drain
  trunkHa: number;                                         // served area at which a main is a named trunk
  culvertCatchHa: number;                                  // a drainage line with this catchment is a stream the town culverts
  culvertLinkM: number;                                    // how far a street node reaches to join a culvert
  culvertFactor: number;                                   // cost factor of a culvert edge (≤ 1: flows prefer the old stream)
  adverseCostPerM: number;                                 // tree-search cost per metre of rise along an edge, in metres of length
  coverMinCm: Cm; coverMaxCm: Cm;                          // the crown's depth: a terrain edit below min is reported; above max a run is infeasible
  outfall: { reachM: number; linkM: number; maxOutfalls: Record<Preset, number>; minOutfallHa: number;
             harbourClearM: number; moatPenalty: number; below: ('harbour'|'mill')[]; stretchM: number;
             freeboardCm: Cm /* the outfall invert's height above the receiving water (V4 §3.2 N7) */ };
  drainExtendM: number; drainPriority: Record<Preset, string[] /* class tags */>;
  passage: { reachM: number; loopM: number; perKm: number; maxGrade: number };   // navigable only
  manholeSpacingM: Record<Preset, number>;
  chamberMinArms: number;
  levelCm: Cm;                                             // wayFall's dead band
  chaikin: number;                                         // smoothing passes of a drainage-line centreline
  maxReroute: number }                                     // N7's re-route rung cap (the attempt cap of §6.1's geometry ladders)
```

| `NetworkRule` field | default | note |
|---|---|---|
| `classes.historical` | main: `through`, `primary`, `quay`, `bridge`; drain: `secondary`, `lane` | medieval mains ran under the principal streets (the vaulted sewer of 1370s Paris ran under a principal street to the river) |
| `classes.navigable` | main: `through`, `primary`, `secondary`, `quay`, `bridge`, `lane`; drain: `alley`, `cul_de_sac`, `track`, `path` | the fantasy network |
| `classCost` | through 0.8 · primary 0.9 · quay 0.9 · secondary 1.0 · bridge 1.0 · lane 1.3 · cul_de_sac 1.6 · alley 2.0 · track 2.5 · path 3.0 · pier ∞ · ford ∞ | flows prefer the main streets |
| `mainMinHa` | historical 8 · navigable 1.5 | |
| `drainMinHa` | historical 3 · navigable 0.3 | below it the street's gutter serves |
| `trunkHa` | 40 | |
| `culvertCatchHa` | 25 | a brook, not a river (a river is a `WaterBody`); London's Walbrook and Fleet are the pattern of a culverted town stream |
| `culvertLinkM` / `culvertFactor` | 30 / 0.5 | |
| `adverseCostPerM` | 50 | one metre of climb costs as fifty metres of level run |
| `coverMinCm` / `coverMaxCm` | 50 / 800 | cut-and-cover, never mined |
| `outfall` | reachM 600 · linkM 80 · maxOutfalls historical 3, navigable 6 · minOutfallHa 5 · harbourClearM 150 · moatPenalty 4 · below `harbour`, `mill` · stretchM 50 · freeboardCm 30 | town ditches received sewage historically, so a moat is admitted last, not never; the freeboard keeps the mouth above the water it discharges into |
| `drainExtendM` | 120 | |
| `drainPriority` | historical: `hospital`, `monastery`, `bath`, `tannery`, `dyer`, `fuller`, `brewery`, `slaughterhouse` · navigable: every `channel` class | institutions with their own drains |
| `passage` | reachM 35 · loopM 250 · perKm 3 · maxGrade 0.125 | |
| `manholeSpacingM` | historical 100 · navigable 60 | |
| `chamberMinArms` / `levelCm` / `chaikin` / `maxReroute` | 3 / 10 / 2 / 3 | |

```ts
interface UndergroundFadeRule {                            // tables/under/fade.json — U-FADE (V4 §3.10)
  sampleM: number;                                         // exposure samples along an element's centreline or outline
  neglectGain: number;                                     // the weight's rise with disuse
  ops: { element: 'drain'|'culvert'|'main'|'passage'|'galleryDry'|'galleryWet'|'chamber'|'ruinGallery'|'ruinChamber';
         from: 'inUse'|'neglected'|'cavedIn';
         weights: Partial<Record<'silt'|'caveIn'|'seal'|'flood', number>> }[];
  sealBase: number; orderGain: number;                     // a seal's weight × (1 + orderGain × (1 − disorder))
  undercity: { clearanceDisorder: number; clearancePerYear: number } }
```

| `UndergroundFadeRule` | default |
|---|---|
| `sampleM` / `neglectGain` | 25 / 1.5 |
| `drain`, `culvert`, `main` from `inUse` | silt 0.7 · caveIn 0.2 · seal 0.1 |
| the same from `neglected` | caveIn 0.6 · seal 0.4 |
| any tunnel, gallery or chamber from `cavedIn` | caveIn 0.7 (to collapsed) · seal 0.3 |
| `passage`, `galleryDry` (catacomb, quarry, vaults, buried, dug) from `inUse` | caveIn 0.8 · seal 0.2 |
| `galleryWet` (a cavern gallery, any gallery with `water`) from `inUse` | silt 0.5 · caveIn 0.2 · flood 0.3 |
| `galleryWet` from `neglected` | caveIn 0.4 · seal 0.2 · flood 0.4 |
| `chamber` from `inUse` | caveIn 0.6 · seal 0.2 · flood 0.2 |
| `ruinGallery`, `ruinChamber` from `inUse` or `neglected` | caveIn 0.6 · seal 0.1 · flood 0.3, the weight × `RuinRule.fadeFactor` (0.25: a ruin decays slowly) |
| `sealBase` / `orderGain` | 0.1 / 1.0 |
| `undercity.clearanceDisorder` / `.clearancePerYear` | 0.15 / 0.02 |

`flood` is admitted only on an element whose floor lies below the water table (II.6's condition table); a weight whose
op is not admitted is dropped and the rest renormalised. An element whose class and condition have no row is not a
candidate (C4-27's rule), so the table has no dead end.

**Parameters added to the rows' open `params` (II.7.6's `UndergroundSystemRow.params`; our own, `extension`,
calibratable; item 23: no number of V4 §3.5 stands outside a row).** Every row: `surfaceClearCm` 600 (V4 §3.5.0's
shallow-element rule; the undercity reads its host system's). `cavern`: `caveCatchHa` 5; `caveKmPerKm2` 1.0 (the length
cap: × the frame's area in km², replacing a per-rung cap, g item 109 (j) (1)); `meanderM` 6, `meanderWaveM` 40;
`reliefWindowM` 100, `hallReliefM` 15, `hallBaseM2` 400, `hallPerReliefM2` 40, `hallMaxM2` 2 000, `hallAxisRatio` 1.6,
`hallJitter` 0.2, `hallDryCm` 100 (a hall's floor above the local water table, C4-14); `tubeMax` 3, `tubeSpacingM` 300,
`tubeMaxM` 1 500, `tubeDepthCm` 800, `tubeChamberM` 200; `mouthCoverCm` 100, `skylightDepthM` 10, `sinkholeCoverM` 8;
`forecastFloorShare` 0.4; `mineBoost` 1.4, `mineCap` 0.9, `miningCellShare` 0.02 (g item 109 (a) (2)); `breachM` 40 (a mine
working's reach into a cave, g item 109 (a) (3)); `fissureChance` 0.15, `fissureMax` 2, `fissureMaxM` 400,
`fissureWidthCm` 80–150, `fissureHeadroomCm` 600–1 200, `fissureChamberM2` 150. `quarry`: `oreM3PerMine` 2 000,
`workingMaxHa` 4, `stoneWallCm` 60, `chainVolume` {low 0.5, moderate 1, high 2} (a chain mine's volume factor, C4-16),
`headingWidthCm` 150, `headingHeadroomCm` 200. `vaults`: `bridgeRiseCm` 150, `approachM` 30, `vaultBelowCm` 400,
`cisternBelowCm` 700, `forcedGridM` 8 (the forced vaults' pitch, V4 §3.5.6), `archInsetPierCm` 60 and `archInsetOpenCm` 30
(an arch vault's inset at its raised-way piers and at its open faces, V4 §3.5.4 (d)), `archDoorStripM` 2 (the strip beyond
an open face that the door's choice reads), `terminalCisternM2` 600 (an aqueduct's terminal cistern: 4 × the precinct
cistern's 150 m², calibrate-later, C4-110-6). The arch vault's headroom and fall bounds and its share are the base's, since
a span's use is an eager base fact (BCR-45). `dug`: `digGridCm` 100, `digMaxGrade` 0.25,
`rockCost` {rock 3, high 1.5, mid 1, low 1.2}, `networkCellars` 3 (the `Underground network`'s joined cellars, V4 §2.3a),
`storageM2` 20. S1's `outfallStretchM` 50 is §2.3's (BCR-1).

```ts
interface UnderLayoutRule {                                // tables/under/layout.json — U-CITY, U-LINK, the light placement scope; our own, extension
  undercity: { walkwayCm: Cm /* 300 */; plazaShare: number /* 0.35 of the core's area */; walkwayMinChamberM2: number /* 150 */;
    carveMarginM: number /* 2 */; carveMinShare: number /* 0.8 */; airPerM2: number /* one air opening per 1 500 m² of floor */;
    lifelineReachM: number /* 80 */; lifelineSecretShare: number /* 0.5 */; stairMaxDepthCm: Cm /* 600 */ };
  lights: { litReachM: number /* 60: a run or system within this of a plot is lived and lit (V4 §3.9) */ };
  forecastSafety: number /* 0.85: S7b (6)–(7) cap each allocation at this × the forecast capacity (C4-02) */;
  crowdCap: number /* 2: households an underground cell may hold when the tail absorbs a surplus below (V4 §3.4 F0) */;
  voidDwellings: { maxHouseholds: number /* 8 per cluster */; share: number /* 0.05 of the poorest band's households */ };
  accessForecastMin: number /* 0.5: P7's access chance at which a void counts for S7b (V4 §3.3) */;
  openings: Record<AccessPoint['kind'] | 'archDoor', { widthCm: Cm; areaM2: number; lightTransmission: number }>;
  links: { overlapShaftM: number /* 6 */; overlapShaftChance: number /* 0.1 */; reuseM: number /* 3 */; reuseMinM: number /* 30 */ };
  foundations: { footingWidthCm: Cm /* 100: a retaining wall's footing strip, centred on its chain */;
    footingBelowCm: Cm /* 100: the footing's depth below the wall's low-side ground */;
    conduitClearCm: Cm /* 100: a buried aqueduct stretch's reach beyond its channel's band and below its floor */;
    collapseShare: number /* 0.25: the share of an older void's chamber floor that grown footings must cover to collapse it (V4 §3.5.0) */ } }
```

| `UnderLayoutRule.openings` (C4-17; our own, calibratable) | `widthCm` | `areaM2` | `lightTransmission` |
|---|---|---|---|
| `grating` | 60 | 0.36 | 0.6 |
| `shaft` | 100 | 1.0 | 1.0 |
| `well` | 120 | 1.1 | 1.0 |
| `stair` | 120 | 2.4 | 0.8 |
| `cellar_stair`, `hatch` | 90 | 0.8 | 0 (closed from above) |
| `door` | 90 | 0 | 0 |
| `ladder` | 60 | 0.4 | 0 |
| `mouth` | the gallery's bore | bore × headroom | 1.0 |
| `sinkhole` | √ of its area | min(0.02 × the chamber's area, 25) | 1.0 |
| `collapsed_shaft` | 150 | 2.0 | 1.0 |
| `ruin_entrance` | 200 | 3.0 | 0.8 |
| `archDoor` (an arch vault's `door`, V4 §3.5.4 (d)) | 200 | 5.0 | 1.0 (a daylight opening at grade) |

Readers: §8.4 (b)'s shaft (BCR-38), the glTF shaft's section, the VTT shaft light's radius, §8.2's symbol size. A `door`
access whose element is an `archVault` chamber reads the `archDoor` row, not the `door` row.

```ts
interface RuinRule {                                       // tables/under/ruin.json — U-SYS §3.5.0a, U-ACCESS, U-CITY C1, U-FADE, U-FORECAST
  chance: { magic: number /* 0.6 */; history: number /* 0.4 */; delvingFactor: number /* 1.5 */;
            blueprint: Record<Rung, Record<'plain'|'rolling'|'hilly'|'mountainous', number>> /* only while recipe.layers.ruins is on */ };
  ancientYears: number;                                    // 500: a founding older than this is an ancient founding
  significance: Record<'shrine'|'palace'|'district', { extentHa: [number, number]; weight: number }>;
  maxFrameShare: number; maxChambers: number;              // 0.05 of the frame; 1 500
  forecastFloorShare: number;                              // 0.3: P5's usable floor share of a forecast ruin's extent
  depthM: [number, number];                                // [4, 30] (BCR-31)
  burialByAge: { ageYears: number; burialM: number }[];    // interpolated; clamped to depthM
  smoothM: number;                                         // 50: the kernel that smooths today's terrain into the ancient ground
  sharedAxisChance: number;                                // 0.25
  cultures: CultureRow[];                                  // V11's rows
  survival: Record<PersistenceClass, number>;              // V11's persistence order as survival shares at ageRefYears
  ageRefYears: number; coverKeep: number;                  // 1 000; +0.1 survival per 10 m of cover, capped at 1
  distinct: { retries: number /* 3 */; rotateDeg: number /* 30 */ };
  fadeFactor: number; magicLightChance: number;            // 0.25; 0.5
  sourceWeight: Record<UndergroundSystem['kind'], number>; // the undercity's rank: ruin 2.0, buried 1.5, vaults 1.2, catacomb 1.0, quarry 0.8, cavern 0.8
  monument: { clearM: number /* 3 */; tierDecay: number /* 0.85 */; ceilingClearCm: Cm /* 200 */; moundShare: number /* 0.4 */ } }
                                                           // V4 §3.5.0a (5a), (6): a monument's clearance to its chamber walls, the
                                                           // per-tier fall of survival, the headroom kept over its top, the mound's
                                                           // height as a share of the fallen tiers' (C4-110-8)
interface CultureRow {                                     // V11's content; schema here
  id: string; family: 'grid'|'axial'|'radial'|'terraced';
  blockPitchM: [number, number]; streetCm: [Cm, Cm] /* main, minor */; aspect: number;
  orientation: 'cardinal'|'solar'|'contour'|'free'; roomM: [number, number]; columnPitchM: number;
  hallShare: number; terraceRiseM?: number; weight: number;
  monument?: { band: 0|1|2|3 /* V02's anchor index into the stepped-monument row */; hosts: ('temple'|'hall'|'tomb')[] } }
                                                           // absent: the culture raised no stepped monuments (C4-110-8); V11 fills it
type PersistenceClass = 'hall'|'wall'|'colonnade'|'cistern'|'gate'|'axis'|'street'|'room';
interface OpeningRow { kind: 'sinkhole'|'mouth'|'skylight'|'collapsed_shaft'|'ruin_entrance'; chance: number; coverM?: number }   // tables/under/openings.json
interface DigRule {                                        // tables/under/dig.json — U-ACCESS (c)
  cap: number; reachM: number; decayM: number; maxM: number; basementFactor: number; planReachM: number;
  classRow: Record<string /* class id or family tag */, number>; sealedFloor: number }
interface CatacombRule {                                   // tables/under/catacomb.json — U-SYS §3.5.1, U-ACCESS (c), U-FADE, U-FORECAST P5
  count: Record<'TOWN'|'CITY'|'METROPOLIS', { churchesPer: number | null; cap: number }>;
  chance: Record<'churchyard'|'cemetery'|'network'|'monastery'|'quarryOssuary', Partial<Record<Rung, number>>>;
  rankCap: number; growthCapShare: number; growthFloorM2: number; plagueNeedFactor: number;
  ossuaryReachM: number; cryptJoin: { own: number; other: number }; charnelMaxM2: number }
```

| table | defaults (our own, `extension`, calibratable; V11 reviews the rows marked V11) |
|---|---|
| `RuinRule.chance` | a dossier `ancient_ruins` deposit or a `ruined-landmark` record 1 (by rule, no draw); magic 0.6; history 0.4; delving × 1.5, capped at 1, never alone; blueprint (toggle on only) THORP–VILLAGE plain 0.02 · rolling 0.03 · hilly 0.05 · mountainous 0.06, TOWN 0.04 · 0.05 · 0.08 · 0.10, CITY and METROPOLIS 0.06 · 0.08 · 0.12 · 0.15 |
| `RuinRule.significance` | shrine 0.3–1 ha, weight 0.5 · palace 1–3 ha, 0.35 · district 4–15 ha, 0.15; a `ruined-landmark` record forces palace, an `ancient_ruins` deposit draws |
| `RuinRule.burialByAge` | 300 y → 4 m · 1 000 y → 9 m · 2 000 y → 18 m · 3 000 y → 30 m |
| `RuinRule.survival` (V11 orders) | hall 0.8 · wall 0.75 · colonnade 0.7 · cistern 0.7 · gate 0.65 · axis 0.6 · street 0.45 · room 0.2 at 1 000 years; `ageDecay` survival^(ageYears ÷ ageRefYears) |
| `RuinRule.cultures` (V11) | at least one row per family; each row differs from every current culture row of V11 in block pitch, grid regularity and orientation law (g item 109 (c)) |
| `OpeningRow` | sinkhole 0.15 per soluble chamber with cover < `sinkholeCoverM` under no footprint · mouth 0.5 per candidate · skylight 0.3 per breakdown chamber within `skylightDepthM` · collapsed_shaft 0.05 per quarry, mine or ruin chamber under a square, a square or green block (V4 §1.2) or a field face with cover ≤ 15 m · ruin_entrance 0.6, or 1 where the dossier says the ruin is known (a `ruined-landmark` record, or an `ancient_ruins` deposit in state `discovered`) |
| `DigRule` | cap 0.6 · reachM 6 · decayM 2 · maxM 20 · basementFactor 1.5 · planReachM 5 · classRow: a religious house, a working's pithead 0.5, a great house 0.35, an inn 0.3, a workshop 0.15, an ordinary house 0.12, a hovel 0.03 (V11 fills every class by its family; V07 fills its village classes, V07 §3.16 (3); C4-65 (6)) · sealedFloor 0.5 |
| `RuinRule.monument`, `CultureRow.monument` | clearM 3 · tierDecay 0.85 · ceilingClearCm 200 · moundShare 0.4 (our own); the monument cell is V11's per ancient-culture row (critique-V11 V11C-35 (5): a grid culture none, the others a band and their hosts) |
| `CatacombRule` | count TOWN (—, 1), CITY (10, 3), METROPOLIS (8, 5) (g item 109 (k) (3)); chance churchyard 0.25 · 0.4 · 0.5 at TOWN · CITY · METROPOLIS, cemetery and network 0.3 · 0.45 · 0.55, monastery 0.4, quarry ossuary 0.3 (CITY and METROPOLIS only); rankCap 0.9; growthCapShare 0.01 per year, compounded over the epoch's span (V11 §3.23.8, J-V11.32; J-VI.6 — the value is V11's); growthFloorM2 60; plagueNeedFactor 3; ossuaryReachM 500; cryptJoin own 0.7, other 0.3; charnelMaxM2 40 |

V11's registry row 58 lists these four tables beside `under.network`, `under.layout` and `under.fade`, schema V04 (C4-63);
§1b.1 names each reader.

### 2.3a The dossier's row sets (BCR-14; C4-05, C4-16)

`tables/dossier/sanitation` — a record matching a row turns `toggles.sewers` to `on` and binds to the `sewer` system
(`Identity.dossier`, §2.8):

| match (kind, `catalogId`, tag or resolved profile) | binding |
|---|---|
| kind `Sewage system` | the `sewer` `UndergroundSystem` |
| a record whose tags, or whose resolved profile (item 104 (a)), carry `sanitation` | the `sewer` `UndergroundSystem` |

`tables/dossier/subterranean` — a record with `facets.subterranean`, or a custom record whose resolved profile matches the
last row, takes its row's effect:

| match | effect | binding |
|---|---|---|
| `Underground network` | the dug network (V4 §3.7 L5): from the record's building a passage to the `beyondWalls` outlet first ("Discreet passage"), up to `networkCellars` cellars of uses in its district joined by dug passages, one `storage` chamber of `storageM2` ("Untaxed storage"), all `knownTo: 'secret'`; its `forbiddenResources` (marsh, floodplain) make `damp` and `flood` cells infinite in U-DIG's cost | the `dug` system's network pieces |
| `Underground city` | `CircumstanceSlice.undercity = 'require'` (V4 §3.6 C0, §3.5.6) | the first undercity neighbourhood |
| `Black market bazaar` | the core's black market use (C5), else an `undercity: 'preferred'` placement | that use |
| a catacomb record (kind label `Catacombs`, `Ossuary`) | one complex forced within the count (V4 §3.5.1 (7)) | its `CatacombComplex` |
| a crypt record | no system: its church building takes the crypt (V03 §3.7.4 makes a building a dossier crypt record binds to `always`; g item 109 (k) (2)); never a plan room (C4-64 (2)) | the church building |
| a mine record (`Mine`, a mining class with `facets.subterranean`) | one mine working forced (V4 §3.5.3) | the working's chamber |
| a cistern record | one cistern forced under its precinct (V4 §3.5.4) | the cistern chamber |
| a record of any other kind with `facets.subterranean`, or a custom record whose resolved profile NEEDS `secrecy` and carries a tag `underground`, `smuggling` or `illicit` (item 104 (a); the match is written into the profile's sources) | the `arena: 'underground'` hard row; placed on the surface, the basement row (BCR-43) and U-LINK L5 | its placement |

An `aqueduct_or_water_system` record matches neither set: V11 maps it to `conduit_house`, the base's aqueduct names that
building as its terminal (V2 §3.17 (b)), and where the terminal's kind is `cistern` the underground part is V4 §3.5.4 (e)'s
terminal cistern under its yard, listed among the vaults system's `sources` with the building (C4-110-6).


### 2.4 Derived transients (never persisted)

```ts
interface NetworkForecast {                                // U-FORECAST's output at S7b; recomputed on every replay, in no digest
  runs: { lengthM: number; navigable: boolean; admissibleShare: number /* the share of its side strips under admitted ground */ }[];
  navigableRunM: number;                                   // Σ lengthM over navigable runs of ≥ UndergroundRule.minRunM
  capacityHouseholds: number;                              // II.7.3's cap: 2 × Σ lengthM × admissibleShare ÷ the poorest band's mean frontage
  voids: { kind: 'ruin'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'; capacityHouseholds: number; source: Id | null /* read by the
           report's forecast line */; pAccess: number /* P7: 1 for a kind dug from the surface */ }[];
  undercity: { exists: boolean; n: number; H: number };  // P6: II.7.5's existence verdict and size, re-read by U-CITY C0
  voidDwellingHouseholds: number }                       // P7's allocation for F6: Σ over accessible-forecast cavern and ruin voids
interface SewerGraph {                                     // U-NET's working graph (V4 §3.2), built and dropped inside the stage
  nodes: { id: number; at: PointCm; groundCm: Cm; kind: 'junction'|'bend'|'culvert'|'outfall'; ref: Id | number /* way junction, hydro cell */ }[];
  edges: { a: number; b: number; lengthCm: Cm; kind: 'way'|'culvert'|'drainage'|'outfallRun'; way?: Id; cost: number /* per direction */ }[] }
interface FoundationsResult {                              // Foundations.apply's return at an epoch (V4 §3.5.0 *At an epoch*; TR-07); never persisted
  collapsed: Id[];                                         // the gallery stretches and chambers created or converted `collapsed`, cause `foundation`, in address order
  pillars: Id[];                                           // the chambers that keep their floor with a footing standing in them as a pillar
  vacated: { plot: Id; households: Id[] }[] }              // the void dwellings (F6's, an undercity neighbourhood's) on collapsed floors, vacated by II.7.3's
                                                           // rules in the same batch — each plot with its households' ids (§2.7's `Household.id`), address
                                                           // order, for the caller's re-homing by name (V6 §3.18.1 (4), (6); TT-07)
```

### 2.5 Identity: lineage units and creation keys

Addresses, lineage and anchors are §6.3's; the anchor rows for access points, tunnels, galleries, chambers, links and
undercity neighbourhoods are its table's. What this volume adds is each generated entity's **lineage parent and creation
key** — the structured components of its lineage hash (§6.3), chosen so an upstream change that does not touch the
entity's source leaves its key unchanged (LC-3):

| entity | parent | creation key |
|---|---|---|
| the `sewer` system | the town root | (`UndergroundSystem`, `sewer`) |
| a void system | the town root | (`UndergroundSystem`, its kind) — one per kind (II.7.6) |
| a way-following tunnel run | the `sewer` system | (the followed way's lineage, the station of the run's upstream end along the way from its `from` node, rounded to 1 m); §6.3's anchor matching resolves a moved station (C4-44) |
| a culvert or drainage-line run | the `sewer` system | (`culvert`, the lineage of the receiving outfall's water body, the hydro cell of the run's downstream end) |
| an outfall run | the `sewer` system | (`outfall`, the receiving water's lineage, the `Outfall.cell`) |
| a passage | the `sewer` system | (`passage`, the two mains' lineages sorted) |
| a drain for a plot | the `sewer` system | (`drain`, the plot's lineage) |
| an underground `Junction` | its part's system | the arms' lineages sorted |
| a catacomb gallery or chamber | the `catacomb` system | (its source's lineage, the grid coordinate (i, j) from the source's anchor) |
| a cavern gallery or chamber | the `cavern` system | (the hydro cell of its upstream end; a tube's start cell) |
| a quarry gallery or chamber | the `quarry` system | (the working's ordinal, the grid coordinate) |
| a vault chamber | the `vaults` system | (its source way's, bridge's or precinct's lineage, its ordinal) |
| an arch vault (C4-110-1) | the `vaults` system | (`arch`, the raised way's lineage, the two raised-way piers' keys `a`, `b`) — so a span keeps its chamber's id through every regeneration that keeps the way, and a re-laid span of the same raised-way piers finds it again |
| the terminal cistern (C4-110-6) | the `vaults` system | (`terminal`, the aqueduct raised way's lineage) |
| a monument's tiers, stairs and shrine | its chamber (a sub-record, as a building's wings are; §2.8) | `layTiers`' keys in its order (V2 §3.15.1 ST7); its draws keyed as V4 §3.12 lists |
| a buried gallery or chamber | the `buried` system | the cleared record's lineage (II.7.6: fresh records keyed from what they bury) |
| a dug passage | the `dug` system | the closure event's `seq` and its piece ordinal (§7.3 item 9 (b)) |
| a lifeline's dug piece at generation | the `dug` system | (its neighbourhood district's lineage, the piece ordinal) — II.7.6's "keyed by that district's lineage" |
| an L5 piece (a subterranean institution's passage, its network, its cellar chamber) | the `dug` system | (the institution's binding key hashed as the unit, the piece ordinal) |
| a ruin gallery or chamber | the `ruin` system | (the ruin system, its plan coordinate: a street's index, or a room's (i, j, k) in the plan's lattice) |
| a `CatacombComplex` | the `catacomb` system | its source's lineage |
| a forced-vaults chamber | the `vaults` system | (the forced district's lineage, the grid coordinate (i, j)) |
| a chain mine | the `quarry` system | (the chain's key, its resource node) |
| a heading gallery (a mine breach) | the `quarry` system | (the working's key, the cavern gallery's lineage) |
| a scattered-dwelling block (F6) | the underground pseudo-district | (the cluster's lowest element lineage, the block ordinal) |
| an undercity walkway | the neighbourhood's district | (the chamber's lineage, the walkway's ordinal in its tree) |
| an access point | its source: the system, the neighbourhood's district, the building, the link or the event | (its role, its host's lineage, its ordinal); a dig access (the building's lineage, `dig`, the void kind); an opening (the element's lineage, the opening kind); a crypt join (the church's and the complex source's lineages); an arch vault's door (the chamber's key, `door`); the terminal cistern's well (the chamber's key, `well`) |
| a link | the connection stage's run (the settlement) | the two end elements' lineages sorted, and its station ordinal on the first; an overlap or mine breach (the pair, `overlap` or `mineBreach`); a reuse (the adopted element, the adopting system) |
| an underground light | its host | §4.7 (1)'s rule: host lineage, row, ordinal |

### 2.6 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `Terrain.outfalls` | S1 (3) at generation; S1's water operator after a water edit (§7.3 (b)) | U-NET N2 | the terrain chunk | re-derived with S1's hydrology | the water edit's replaced scope | absent in an older document: recomputed on load from the hydro grid |
| `Tunnel.outfall` | U-NET N2/N3 | U-NET N7 (the root invert), U-LINK L1, S14, exports | the tunnel record | kept while the run's root is kept; re-seated by V4 §4.3 when its shore moves | the edit's undo record holds the former value | absent: the run's downstream end's nearest `Terrain.outfalls` entry, found on load and reported |
| `Tunnel.serves` | U-NET N8 | `drainOf`, the reader, U-FADE's usage | the tunnel record | re-derived for the plots an edit re-cuts (V4 §4.3) | the edit's undo record | ids mapped by §7.5 |
| `Tunnel.depthOffsetCm` | `setAttr` | U-NET N7 | the tunnel record; the event in the log | an input override kept by every re-derivation (§7.2) | the inverse | absent = 0 |
| `Junction.chamber` | U-NET N10 | S14's chamber program, the light rows, U-FRONT F2 | the junction record | re-derived with its arms | with its arms' scope | absent: re-derived on load |
| `Chamber.kind` | U-SYS, U-CITY, `drawChamber` | S14, light rows, U-CITY C1 | the chamber record | re-derived with its system; `setAttr` override kept | the inverse | absent: the system row's first chamber kind |
| `District.core` | U-CITY C2 | U-CITY C3, C5, C6, light rows, labels | the district record | re-derived with the neighbourhood | the scope's undo | absent: the neighbourhood's largest chamber, found on load |
| the family and preset controls | the recipe's params (creation), `adjust` | U-NET, U-FRONT, U-CITY | the recipe; the `adjust` event | Re-derive from the network stage (§7.1) | the adjust's replaced scope | absent: `mixed`, `historical` |
| `AccessPoint.state` (BCR-21) | II.7.3's rule row, U-NET N11, U-LINK; `setAttr`; the access closures of a host's change (V4 §3.10) | S14's `states` rows, VTT portals, U-LINK's lifeline test | the access record | kept by re-derivation while the access's anchor survives (§6.3) | the causing event's undo record | absent: `open` |
| `LayerSpec.underView` | `setLayer` | S14, the tile worker | the style state | view only | the inverse | absent: `cutaway` |
| `NetworkForecast` (with P6, P7) | U-FORECAST at S7b (in a hood document after the one-district allocation, V1-3.10.1 step 6) | S7b (6), (7); U-CITY C0; F6 | never | recomputed on every replay | — | — |
| `RuinRecord` | U-SYS V4 §3.5.0a; a declared ruin element (V4 §4.7) | its readers in §1b.1 | the entities block | kept whole (culture, axis, plan) by every re-derivation; a New random on the ruin system re-draws culture, axis and plan, its openings re-drawn by U-ACCESS (e) over the new elements and volume 1's opening pass run over those made and removed in the same commit (V4 §3.10; SLR2-08); a source the dossier removes — at an epoch's `dossier` phase or before a re-derivation — clears `RuinRecord.source.ref` (its `kind` kept), reported `W_RUIN_SOURCE_REMOVED`, and the system stays, fading by U-FADE, because the underground is never torn down (item 11; DEFINITION §4; J-V4.99); a blueprint ruin follows the toggle only at a re-derivation (the toggle's Re-derive from S7b, V4 §4.3), never at an epoch | the scope's | absent: no ruin (g item 109 (h)); the upgrade creates none |
| `CatacombComplex` | U-SYS V4 §3.5.1 | U-SYS, U-FADE, U-ACCESS, S14, V12's `catacomb.extentM2`, V10 | the entities block | only adds (V4 §3.5.1 (6)): every derivation — a growth stage, an epoch, a dossier event, a replay, a Re-derive, a New random — keeps every element and `extentFloorM2`; `fill` and `blockedBy` re-derived | the event's | absent: `extentFloorM2` = the laid extent, `fill` 0, `overCount` where the count is exceeded (V4 §4.6) |
| `AccessPoint.cause` | its creator | the excavation reading, V10, V12, V03, volume 1's opening pass (a catacomb entrance selected by `cause.system`, V1-3.7.1; SLR2-15), GeoJSON | the access record | kept with its access (§6.3's anchor) | the causing event's | absent: `legacy` |
| `UndergroundLink.cause` | U-ACCESS, U-LINK L1, U-SYS, the edits | the same | the link record | kept with its link | the causing event's | absent: `legacy` |
| `Gallery.reusedBy`, `Chamber.reusedBy` | U-ACCESS (f), U-SYS (tomb reuse, the quarry ossuary) | the adopting system's extent and program, V10 | the element's record | re-derived with the adopting system; never removed by the adopted system's re-derivation | the scope's | absent: none |
| `excavation(cluster)` | U-ACCESS (g) | §1b.1's readers | never (derived) | recomputed after every commit that touches an access, a link, an element's closure or a building over a void | follows its causes | — |
| the carve's cleared galleries | U-CITY's carve post-pass (V4 §3.6 C2) | S14 (not drawn), the host's extent | the gallery records, existence `cleared`, cause `rule:undercity-carve` | a New random on the host system re-runs the carve; a New random on the neighbourhood `resurrect`s them, then re-carves | the scope's | absent: the upgrade re-runs the carve |
| `District.outskirts` | U-LINK L6 | labels, counts, the reader | the district record | re-run after any part-0 edit within `outskirtsReachM` of a lifeline link | the edit's scope | absent: recomputed |
| `Tunnel.name` | the tail's S13a | labels, the reader | the tunnel record with its `NamingRecord` | kept by §6.3's cases; protected by a `setAttr` (§2.8) | the inverse | absent: drawn |
| `Tunnel.grilles` | a view (N11a) | S14, VTT | never | recomputed with the run or a wall edit crossing it | — | — |
| `recipe.layers.ruins` | the recipe's params, `adjust` | U-SYS, U-FORECAST | the recipe | Re-derive from S7b | the adjust's scope | absent: `off` |
| the view key `showUnexcavated` (BCR-V9-20; J-VI.19) | volume 9's per-viewer control | S14 | the viewer's view state, never the document | view only | not an event (a view key) | absent: `false` |
| an arch vault (`archVault` chamber, `Chamber.span`, its `door`; C4-110-3) | U-SYS's vaults step (T2) from the base's `vault` spans; `ArchVaults.reconcile` in the commit of an edit that adds a raised way (T4 `road` with `raised`, the aqueduct class; the same span rule), sets a span's `use` to `vault`, or re-shapes a way; at an epoch through V06's `under.extend` over `EpochScope.raised` | S14, the exports, U-ACCESS (b), V10, a declared placement | the vaults part chunk | re-derived with its raised way, its id kept by its key; its closure follows its span at every derivation by V4 §3.5.4 (d) (2) (`collapsed` where the span's or a bounding support's `state` is `ruined` or `cleared` — a landfall's ruin included — or the span's V06 condition reads breached or dismantled; else none); **removed** in the same commit as its raised way is deleted, generated or drawn, or its span set `open` — its links and accesses with it, listed as fates in the dry run; a regeneration after a removal lays none, because the base's generator is the removal's only reader and V04 reads only the resulting raised-way set | the replaced scope: the way and its vaults back with the same ids | absent in an older document: laid at the next vaults derivation, the upgrade's diff listing them (V4 §4.6) |
| the terminal cistern | U-SYS's vaults step, one per aqueduct whose terminal kind is `cistern` | N8, S14, V10, the exports | the vaults part chunk | re-derived with its aqueduct, its id kept by its key; removed with it | the replaced scope | absent: laid at the next vaults derivation, reported |
| `Chamber.monument` | the ruin step (V4 §3.5.0a (5a)) | S14, the light pass, U-CITY, the exports, V10 | with its chamber | kept byte for byte while its chamber's plan is kept; re-laid through `layTiers` with the same draws on a `setAttr` of `monument/count` (the count kept as an input override); laid at the next ruin derivation where absent and its culture row names the host; removed where the row no longer names it (a table edit); a New random on the ruin re-draws it with the plan | the inverse, or the scope's | absent: laid at the next ruin derivation, reported |
| `Chamber.columns` | derived with its chamber | V03 §3.12 (6), S14, glTF, VTT | never | recomputed with the chamber and its monument | follows its chamber | — |
| `Entrance.faces` `'tunnel'` (C4-64 (4)) | S11 under F4, F6 and C4 | V03 §3.12 (4), VTT | the entrance record | re-derived with its building | the building's | absent on an older document's underground building: rewritten by the upgrade (V4 §4.6) |
| a village working's breach access (TR-12; V4 §3.5.7 (a)) | U-ACCESS (a) at T2b at a village rung; `AccessPass.run` over `scope.workings` at an epoch | the excavation reading, V10, V12's `void.*`, GeoJSON | the access record | kept by its key (the working's and the element's lineages) at every derivation; follows §3.10's access closures with the working's plot as its host; kept at V07's hand-off up | the causing event's | absent: made at the next T2b, reported |

The base's fields keep their base rows (§7.4, §2.8): `Tunnel.navigable`, `headroomCm`, `closure`, the condition reading,
`AccessPoint.state`, `knownTo`, `source`, `Gallery.walkway`, `Features.underground`.

## 3 Generation

### 3.1 The underground tail: order, registration, scheduling

The nine engines register as stages by declared I/O (§4.12) in `@plat/layout`'s registry, their code in `@plat/under`
(BCR-12). Each declares `phase: 'tail'` (BCR-5): the scheduler runs the main path unchanged to the first paint (§4.1,
§8.5), then runs the tail stages eagerly and serially on the generation worker, in this order, before it takes any queued
edit; between two tail stages it yields to a queued view request (pan, zoom, a layer or band switch), never to an edit
(C4-19). The ground arena's geometry and its per-arena digests are final before the tail, and no tail stage writes
ground geometry (the ground `PlatKey`; §3.4; §5.3's cross-arena write count). Two tail steps write ground *records*,
never geometry: T8, the reconcile, which writes uses and household counts only, and T6's S13a step, which writes volume
1's opening places (`HoodPlace` records of kind `opening` with their `place` labels, V1-3.7.1; SL-06); the ground's model
digest and the document's root digest are finalised after T8 (J-V4.2 as amended; J-V4.59).

| order | stage | reads | writes | streams (§6.1) | lineage unit | ladder |
|---|---|---|---|---|---|---|
| T1 | U-NET `SewerStrategy.derive` | `Features.sewers`; ways, junctions, districts, plots and uses with the class `drain` column (ground part 0, read); `Terrain` (sampler, `hydro`, `outfalls`), the levelled ground (`levelledGroundCm`, BCR-V5-30) and the `RetainingWall`s (g item 110 (a)), water bodies, enceintes and quay walls (read); `NetworkRule`, `TunnelProfileRow`, the connection table (II.7.1); the family and preset controls; the creation prefix's tunnels (V4 §4.7) | the `sewer` system; part 0's L0–L2; tunnels, underground junctions, the network's access points; `serves` | `sewer` (the `pit` share) | the `sewer` system | F-NET |
| T2 | U-SYS ruin → catacomb → cavern → quarry → vaults → buried | the ground (read); the raised ways' raised-way piers, spans and aqueduct terminals on ground parts ≥ 1 and the `RetainingWall`s (read; BCR-45); `SiteResources`; the religious, burial and stone rows; `HistoryHint`; the dossier digest's ruin, magic and mining facts (V4 §1b.5); the system rows, `RuinRule`, `CatacombRule`; V02's `layTiers` and its `stepped-monument` row; part 0 (read, for depth reports and the forced vaults); `Recipe.product` (the hood line, below) | each system's record, part, galleries, chambers and own entrances; `RuinRecord`; `CatacombComplex`; the monuments; the arch vaults and the terminal cistern | `sewer` keyed by the system and the source | each system | F-VOID |
| T2b | U-ACCESS the access pass (V4 §3.5.7) | every part; ground buildings with their footprints, basements and `Basement.crypt` (read); the foundation obstacles; wells; at a village rung the mining uses' outside-plot workings and V07's `mine.workingDepthM` (V07 §3.16 (4)); `LinkRule`, `DigRule`, `OpeningRow`, `CatacombRule` | links (proximity, overlap, mine breach, crypt, reuse), access points (dig, opening, crypt, a village working's breach), heading galleries (quarry part), `reusedBy`; the excavation reading | `sewer`, keyed by the element pair, the building and the void kind, the candidate element | each building; each element pair | F-VOID |
| T3 | U-FRONT `UndergroundStrategy.derive` | part 0; the ground (read); the three field rasters; the underground `Allocation`; `UndergroundRule`; the granularity and designation rows; `UnderLayoutRule`; the excavation reading (F6) | part 0's L3–L4, the underground pseudo-district's blocks, plots, buildings; neighbourhood access points; F6's blocks, plots and buildings in accessible cavern and ruin clusters; lights | `plot.*`, `siting`, `siteplan`, `heights`, `pin.light` | the underground pseudo-district | F-UNDER, F-PLOT, F-SITING |
| T4 | U-CITY `UndercityStrategy.derive` | the void parts; the ground (read); the fields; the undercity `Allocation`; `UndercityRule`; U-FORECAST's P6 verdict; the excavation reading | undercity districts, walkways, carved chambers (the carve post-pass), blocks, plots, buildings; lights | `plot.*`, `siting`, `siteplan`, `heights`, `pin.light` (existence is P6's, never re-drawn) | each neighbourhood | F-VOID, F-UNDER, F-SITING |
| T5 | U-LINK `UndergroundLinkStrategy.link` | every part; ground buildings with basements; `LinkRule`; `UndergroundRule.access` | lifeline links and accesses; item 64's basement accesses; L5's pieces and networks; `District.outskirts` | `sewer` | the settlement; each building; each district; each dossier institution | F-VOID, F-EDIT (none at generation) |
| T6 | the tail's S12c and S13a | the underground and undercity districts and entities; the ground `AccessPoint`s of the public openings and catacomb entrances; the `magical_node` deposit sites (read) | characters, names, label candidates of the underground; then, after the naming of systems and complexes, volume 1's opening pass (V1-3.7.1; run only while `@plat/hood`'s local-place step is registered and runs — while `fabric.extensionWeight` > 0, V1-3.15; V4 §8; SLR4-06): one `HoodPlace` of kind `opening` per public opening of role `access` and per catacomb entrance (V1-3.7.1's selection), with its `place` label — records only, never geometry — so a catacomb entrance's place carries its complex's name; the report's `ruin.node` lines (V4 §3.5.0a (9)) | `naming` | as §4.10; an opening place as V1-2.8 (its host access's; SLR1-07) | §9.6's naming ladder |
| T8 | U-RECONCILE (V4 §3.7a) | the households and institutions the tail could not seat below; the ground's placed plots, buildings and uses (read) | ground uses and household counts only, never geometry | `siting` keyed by the receiving ground district | each receiving district | F-SITING |
| T7 | S14's underground build | the layer's records | the underground display list, built when the layer is first shown (lazy; §8.1) | `render.instances` | — | — |

The eager sequence is T1, T2, T2b, T3, T4, T5, T6, T8; T7 runs when the layer is first shown. **At every rung** (C4-46;
g item 109 (j) (1)): at THORP, HAMLET and VILLAGE, and at a TOWN whose draw left `Features.sewers` false, the tail runs T2
(ruin and cavern only — catacombs, quarries, vaults and the buried town keep TOWN and above — and the vaults step for the
arch vaults and terminal cistern of a raised way, which follow their way at every rung, C4-110-3), T2b, T3's F6 only, T5
(L3, L5, L7), T6 and T8, and T7 on show; never T1 or T4 as generators (no new network; the undercity keeps II.7.5's rows).
The village product shows the layer (V07).

**The maintenance mode (C4-65 (3); V07 §3.12; J-V4.90).** At a village rung, a system that an earlier, larger rung left
(V07's hand-off down) — the sewer network, a catacomb, a quarry, vaults or a buried town — stays registered in maintenance
mode: its stage re-derives its own part from its kept elements by `corridorUnion` (§4.11's rule for the buried and dug
parts), lays nothing new and never grows; U-FADE ages it at the underground's rate (V4 §3.10); the foundation rule (V4
§3.5.0; `Foundations.apply` at an epoch) still collapses what a new footing meets (TR-07); a catacomb's complex keeps
its `extentFloorM2` and is `stagnant` with `blockedBy` holding `'rung'` (V4 §3.5.1 (6)); an inherited undercity is re-read
by `UndercityEpoch.reread` against the village row's bound 0 and vacates by II.7.5's rules, its chambers staying as their
host system's elements. §3.5.0's TOWN gates bar only the laying of a new system of those kinds. A replay runs the tail at
the same position of the fold as the generation did, so replays and generations agree byte for byte (§6.2).

**A standalone neighbourhood document (volume 1, V1-3.10.1 step 6 and (7); SLR1-01, SLR3-01; J-V4.105, J-V4.116).** Its
S0 writes `Features.sewers` false and the undercity circumstance `forbid`, so N0 commits nothing, P1–P4 forecast nothing,
P6 finds no undercity and U-CITY never runs. In a hood document U-FORECAST runs after the one-district allocation, not
before S7b (5), and P7's cap reads that allocation's poorest-band households in place of the roster's (volume 1,
V1-3.10.1 step 6; J-V1.92); S7b (6) (d)'s void part is taken from that allocation. P5's catacomb expectation likewise
ranks only the burial faces that allocation's anchors bring (a temple's churchyard, a burial ground, a monastery's
burial yard), never the virtual host town's roster (J-V4.116). `Recipe.product` is read by this **hood line** — in U-FORECAST at S7b and in the tail's T2 — its only
reader besides S0. Where it is `'hood'`, the tail runs this section's below-TOWN set whatever the hood's `contextRung`: T2's
ruin and cavern, with the vaults step only for the arch vaults and terminal cistern of a declared raised way (the unit run
generates none); T2b; T3's F6; T5's L3, L5 and L7; T6; T8; and T7 on show. It adds U-SYS's catacomb step (V4 §3.5.1) at
TOWN's rules, chances and count — **one** — its candidates only the hood's own burial faces ((1) (a)–(d) inside the hood's
outline: its temple's churchyard, a burial ground or a monastery's burial yard an anchor brings; never a quarry ossuary,
which (1) (e) keeps to CITY and above). No quarry, generated or forced vault or buried town is laid, and U-FORECAST's P5 and
P7 forecast only the kinds this set lays: a ruin, a cavern and the one catacomb. Every other rung-scaled row the set reads
(the ruin's blueprint chance, the cavern rows, `OpeningRow`, `DigRule`) is read at the hood's `contextRung`, the rung whose
rows the hood reads (V1-2.6). A hood document runs no epoch in volume 6's first build (V1-3.10.1 (7)), so V4 §3.10 never
meets one.

### 3.2 U-NET — the sewer network by medieval rules

**Inputs and constants.** The rule families are II.6's; the default family is `mixed` (J-V4.3): the town's small streams
culverted as trunks, mains under the principal streets feeding them, everything falling to the nearest admitted outfall
downstream. Constants are `NetworkRule`'s (V4 §2.3) and the profile table's (II.7.2).

**N0 — Gate and records.** If `Features.sewers` is false, U-NET commits nothing and part 0 stays schema-complete and empty
(II.7.2). Else it mints the `UndergroundSystem` of kind `sewer` on part 0 (V4 §2.5), its `rule` naming the family and preset
row (`net.<family>.<preset>`), and writes part 0's L0: the `margin` ring (the ground's frame plus its context margin,
§3.2 (9)) and the rock face.

**N1 — The service region `R`.** The ground districts (layer `ground`; never a sky district, V4 §1.2) whose kind is
neither `hinterland`, `underground` nor `undercity`: the
settlement's built extent, intramural and extramural. A point is in `R` when `pointLocate` on the ground's L1 finds a face
owned by one of them (§3.4).

**N2 — Outfalls.** Candidates are `Terrain.outfalls` (BCR-1) with `into` ∈ {`river`, `sea`, `lake`, `canal`, `ditch`}
whose `at` lies within `outfall.reachM` of `R`. A candidate is admitted when it lies downstream of the settlement, read as
the base states it (II.7.2; C4-22):
* on a river, `ContextVector.upstream ≥ 0.5` at the candidate's `Outfall.cell` (§2.5's field, read, never restated), and
  its course station `s` (the cumulative length of the course to the course vertex nearest `at`) ≥ the station of every
  harbour basin's mouth and every water mill's intake on that course (`outfall.below`, II.7.2's policy row). A mill's
  intake station is the course station nearest its building's footprint centroid; a basin's mouth station is the course
  station nearest the centroid of the basin face's edge shared with the river;
* on the sea or a lake, `at` lies ≥ `outfall.harbourClearM` from every harbour basin face and from the harbour-mouth
  chain's line where one is drawn (g item 106 (e); C4-33);
* on a canal or ditch, its `flowTo` end is the one beyond `at` (the flow leaves the town).
With none admitted, `moat` candidates are admitted with the start cost `outfall.moatPenalty × outfall.reachM`
(a town ditch took the town's waste; J-V4.7). With none of those either, U-NET makes one **field outfall**: the D8 path of
the hydro cell of largest accumulation on `R`'s boundary is followed outward to its first cell outside `R` and beyond the
outermost enceinte's outer strip; the Outfall there is `{ into: 'field', water: null, at: that cell's centre, snapped }`,
the cess field of a dry town. Every admitted candidate is linked to the nearest way junction within `outfall.linkM` by a
straight `outfallRun` edge; a candidate with none is dropped.

**N3 — The drainage graph and its tree.** The `SewerGraph` (V4 §2.4) holds:
* **way edges** — every way spine between consecutive junctions with at least one end within `outfall.reachM` of `R`'s
  convex hull (C4-23: the extent is fixed before the search; the Dijkstra then selects), plus the outfall-run edges of N2 —
  each with its spine vertices as its polyline, its class and both directions' costs
  `cost(u→v) = len · classCost[class] + adverseCostPerM · max(0, h_v − h_u)` (heights by the terrain sampler at the end
  vertices, all in centimetres); `pier` and `ford` never carry a sewer. The way edges are ground part 0's only (V4 §1.2):
  a raised spine is never an edge, never split by a culvert crossing and never a junction, and the way beneath it keeps its
  own edges, so a sewer follows the street under a viaduct, never the viaduct (C4-110-4);
* **culvert edges** (`mixed`, `drainage-lines`) — every maximal D8 path of `hydro` cells in `R` whose catchment
  (`flowAccum` × the cell's area) reaches `culvertCatchHa` and which lies outside every water face: the town's
  unwatered brooks. Its polyline is the cells' centres, smoothed by `chaikin` Chaikin passes, snapped (§3.2 (7)) and
  simplified at `minEdge`; it is directed downstream only, cost `len · culvertFactor`. Where it leaves `R` or enters a water
  face its end is an outfall node (`Terrain.outfalls`' entry for that stretch; a brook that flows on outside `R`,
  never a water body, ends at an Outfall `{ into: 'stream' }` — BCR-1 carries the value). Each crossing of a culvert
  polyline with a way edge (a segment sweep) splits both at a new node; each way node within `culvertLinkM` of a culvert
  gains a link edge to its nearest culvert node;
* **drainage edges** (`drainage-lines` only) — the D8 tree on the `hydro` cells of `R` itself, each cell a node draining
  to its D8 neighbour; no way edge is used.

For `follow-streets` and `mixed` the tree is a **multi-source Dijkstra** (§3.1's binary-heap search) from the admitted
outfall nodes over the reversed edges, the heap keyed by (cost, node address), so equal costs resolve by address
(J-V4.4). For `drainage-lines` the tree is D8 itself. Roots whose subtree drains less than `outfall.minOutfallHa` (N4's
area) are dropped and the search re-run once without them; if more than `outfall.maxOutfalls[preset]` remain, the largest
subtrees' roots are kept and the search re-run once more. A node no root reaches drains by its gutters: its area is
reported as unsewered.

**N3a — Declarations (C4-08; LC-8's class).** The network honours what the author declared before it searches:
1. **Held runs.** Each drawn or held run (a `drawTunnel` without `system`, a locked or pinned run, a creation-prefix
   tunnel, V4 §4.7) enters the `SewerGraph` as a fixed chain of edges: its committed centreline, its kind and profile kept,
   cost 0 along it, its invert knots fixed. N7 treats them as constraints: a receiver's head takes min(its own upper
   bound, the held knot), and a held run is never re-laid, re-routed or truncated.
2. **Deleted runs.** A user's `delete` of a generated run leaves a tombstone on its creation key (V4 §2.5) in the network's
   derivation record: the way edges it followed take cost ∞ and N5 never re-selects them.
3. **Carry-over.** Regenerated runs are matched to their predecessors by creation key (§6.3); a matched run keeps its
   `depthOffsetCm`, its protected name and its moved or edited access points (their `ground.at` re-hosted by
   `pointLocate`).
4. `SewerStrategy.extend` (V4 §3.10) and Re-derive from any stage read the same declarations.

**N4 — Served area.** Each ground plot of `R` (the L3 plots of `R`'s districts) adds its area to the node nearer, by
station, to the projection of its frontage midpoint on its frontage way's edge (`Frontage.way`); each edge adds the part
of its corridor area inside `R` (length inside `R` × the way's width; C4-23) half to each end; under `drainage-lines` a plot adds to the hydro cell of its
centroid. In reverse tree order (deepest first; ties by address) `served(n) = local(n) + Σ served(child)`, in hectares; the
edge `n → parent(n)` carries `served(n)`.

**N5 — Which edges are tunnels, and of what kind.** A culvert edge is always a `culvert`. A way or outfall-run edge
carrying `S` hectares is a `main` when `S ≥ mainMinHa[preset]` and its class is in `classes[preset].main`, a `drain` when
`S ≥ drainMinHa[preset]` and its class is in `main ∪ drain`; else it is no tunnel. **Downstream closure:** every edge on
the tree path from a selected edge to its root is selected, its kind the greater of its own and its upstream's in the
order `drain` < `main` (a culvert stays a culvert); an outfall run takes its incoming edge's kind. Under `drainage-lines`
a drainage edge is a `drain` at `drainMinHa`, a `main` at `mainMinHa`, and a `culvert` where its catchment reaches
`culvertCatchHa`.

**N6 — Runs and profiles.** The selected subgraph is cut into **runs** at every node of degree ≠ 2, at every kind change,
at every change of the way followed and at outfall nodes; each run is one `Tunnel` (II.6: one record, one condition).
Its centreline is its edges' polylines in flow order — a way run's positions read from the way's spine by `resolve` on the
ground key, a copy of positions, never of topology (J-A12.43) — `follows` the way (absent for culverts, drainage and
outfall runs), `widthCm` and `headroomCm` from the profile table at (kind, preset), a historical main's by II.7.2's law
with `servedHa` = the served area at the run's downstream edge (kept in the run's derivation record, §2.8), `navigable`
derived and stored (§2.7), `rule` the row's id. A run whose served area reaches `trunkHa` is a **trunk** (named, V4 §5.4).
**Wall crossings (g item 110 (a); C4-110-7).** Where a run's centreline crosses a `RetainingWall`'s chain (a segment sweep of
the run against the walls' chains), two vertices are inserted on the centreline at the wall's two faces — the chain offset
by half the wall's thickness to its high and to its low side — each with its height `levelledGroundCm` on its own side
(BCR-V5-30; SLR1-16). A way the wall turns into a stair or a ramp keeps its spine; the run copies the spine's positions and adds these two.
With no `RetainingWall` (the terrace rows off) no vertex is added and U-NET is byte-identical.

**N7 — The invert pass (J-V4.6; root-first, C4-10).** Two sweeps; every height `h` is `levelledGroundCm` at the knot
(BCR-V5-30), so a wall-face knot reads its own side's datum.
1. **Root-first.** Each outfall knot's floor is `low = h(at) + freeboardCm`: the terrain's height at the shore stands for
   the water surface, as §2.6's water table reads it, so the mouth sits `outfall.freeboardCm` (30 cm) above the water it
   discharges into; a field outfall's is `h(at) − coverMinCm − headroomCm`. Upstream along the tree,
   `low(v) = low(next) + minGradient · len(v, next)` is the lowest invert from which `v` still falls to its mouth. Each knot
   starts at `inv(v) = upper(v)` with `upper(v) = h(v) − coverCm − headroomCm + depthOffsetCm` (the profile row's `coverCm`,
   the run's `depthOffsetCm`, BCR-3) where `upper(v) ≥ low(v)`; else at `low(v)`, its cover shrinking below `coverCm`,
   admitted while the crown keeps `coverMinCm` — the knots of an outfall run are exempt, being the mouth's cut through the
   bank face — and failing at `v` otherwise.
2. **Leaves-first.** Runs are then visited from the leaves; along each run, vertex by vertex in flow order,
   `inv(v) = min(inv(v), inv(prev) − minGradient · len(prev, v))`; a run's head takes `min(its invert, the lowest
   downstream-end invert of the runs entering it)`, so every branch falls into its receiver; held knots (N3a) are fixed.
   Since every upstream knot starts at or above `low`, this sweep never lowers a knot below `low(v)`.
3. **The drop at a wall (C4-110-7).** Where the flow crosses a `RetainingWall` from its high face to its low face, the
   low-face knot starts at its own `upper` (the low side's cover), and the sweep's `min` makes the invert fall across the
   wall's thickness. The segment between the two face knots is a **drop** when its fall exceeds `minGradient ×` its length:
   one run and one record still (no junction; J-V4.85), drawn as a drop shaft at the wall (V4 §5.2) and exported with both knots. A
   run whose flow climbs a wall keeps falling by N7's rule, its cover growing on the high side, and the `coverMaxCm` ladder
   applies as anywhere. So no crown rises above the levelled ground at either face (T-V4-67).
The crown's depth `h(v) − inv(v) − headroomCm` must stay ≤ `coverMaxCm`. **Its ladder (F-NET, BCR-7):** (1) re-route —
the tree edge downstream of the first failing vertex takes cost ∞ and the Dijkstra re-runs for the nodes whose root path
used it (≤ `maxReroute` attempts, no draw); (2) truncate — the subtree above the failing edge takes a local root if an
admitted outfall lies within `outfall.linkM` of one of its nodes, else it carries no tunnel and its plots drain by gutter
and pit, reported; the terrain is never lowered. An outfall whose knot cannot keep the freeboard (a bank lower than the
run allows) keeps it anyway and reports `W_OUTFALL_LOW`. Each vertex carries an `invert_knot` row; `elevationCm` is the
rounded mean invert; the `sewer` system's `depthM` is the range of the runs' crown depths.

**N8 — Plot connections (`serves`; J-V4.8, J-V4.43).** For each plot of `R` (on ground part 0; its `Frontage.way` a part-0
way), its need is the highest `drain` value among its uses' class rows (`channel` > `pit` > `none`) — and at least `channel`
for the plot of an aqueduct's terminal building, whose overflow leaves by the sewer (V4 §3.5.4 (e); C4-110-6); II.7.1's
connection table then decides:
* `channel` — connected to the nearest `main` or `culvert` run whose centreline lies within `reachM[preset]` of its
  frontage midpoint (ties by address; BCR-28 names the culvert, which is the trunk of the `mixed` family); else, where its class carries a tag in `drainPriority[preset]` and a selected run's node lies within
  `drainExtendM` along its frontage way's spine, a **drain run** is added along that spine stretch (kind `drain`, its
  profile row, its invert laid by N7's rule from its head down to the receiving run's invert at the junction, dropped if
  its head's crown would exceed `coverMaxCm`) and the plot connected to it; else unconnected, reported;
* `pit` — one uniform on `sewer` keyed by the plot's lineage; connected, to the nearest run within `reachM`, when it falls
  below the band's `pitShareByBand` (II.7.1); else unconnected, silently (a pit is the norm);
* `none` — never connected.
A connection is logical: the plot's id in the run's `serves`, sorted; no chain, no pin, no ground change (II.7.1).

**N9 — Passages (navigable preset only; J-V4.10).** For every pair of navigable runs, not sharing a junction, whose
centrelines come within `passage.reachM` in plan (a uniform grid index over run segments), the closest pair of points is a
candidate when the network path between them is longer than `passage.loopM`; candidates are taken in order of (plan
distance, the pair's sorted lineage), each run accepting at most `⌊length ÷ 1 000 m × passage.perKm⌋`, a candidate whose
straight segment crosses an accepted passage or whose grade exceeds `passage.maxGrade` refused. Each accepted one is a
`passage` run (profile row `passage`), splitting both mains at its ends (new junctions), its invert linear between theirs.

**N10 — Commit on part 0.** One L1 batch inserts every run's centreline in address order as a `tunnel` chain with its
`invert_knot` rows; every vertex where ≥ 3 run ends meet takes a `junction` row and a `Junction` record (BCR-2) whose
`arms` are the runs, `chamber` set where the preset is `navigable` and at least `chamberMinArms` arms are navigable
(J-V4.9). A crossing the kernel finds between two runs the graph did not join (an outfall run across a drain) is a
junction too (§3.4), reported `W_NET_CROSS`: each run keeps its own invert knots at the vertex, the drop between them
standing. Every underground `Junction` takes `kind` as the ground does (§2.4's union): `T`, `X` or `Y` by its arm count
and angles, `end` at a dead end (C4-30 (a)). One L2 batch runs `corridorUnion` over part 0's L1 faces with half-width `widthCm ÷ 2 + wallCm` (§3.7), giving
every run its two half-band strips, every junction its wedge and the rock between as part 0's blocks.

**N11 — The network's own openings (J-V4.11).** On every `main` and `culvert` run, at its head where the head lies in `R`
and at every `manholeSpacingM[preset]` of centreline from it, the ground point above is tested by `pointLocate` on ground
part 0 (a point under a raised deck is tested on the way beneath, whose corridor it is): on
public ground (V4 §1.2: a corridor, an L1 square or gate-plaza face, or a square or green block) it takes an
`AccessPoint` of kind `grating`, role `access`, source `system`,
`knownTo: 'public'`, state `open`; off public ground the site slides along the run in 5 m steps up to half the spacing each
way, else the site is skipped. Each outfall takes a `mouth` (role `access`, its `ground.host` the land face at `at`), and
each culvert's inlet where its brook enters `R` another. Their `access_point` vertices lie on the run's kerb at the
nearest point (a transaction on part 0). Each carries `cause: { rule: 'system', system: the sewer }`. A grating on a lived
run is also the sewer-front neighbourhood's access (V4 §3.4 F5; C4-45).

**N11a — Grilles at walls (g item 106; C4-33).** `Tunnel.grilles` is a view: the stations where a run's band crosses an
enceinte's `wall_strip`, a quay wall or a sea wall, found by a segment sweep of the run's centreline against those
strips' outlines at read. Each draws as a gate bar across the band (V4 §5.2), exports as a closed VTT portal and is
public to the knowledge filter; an outfall run through a quay or sea wall keeps its mouth, so no wall cuts off the
water's access (g item 106 (d)).

**N12 — Close.** `Features.underground` is true; the report carries the network's length by kind, the outfalls by
`into`, the connected share of plots by need, the unsewered area and every F-NET use (§5.4).

### 3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13; fixes RV-pc-4, C4-20, C4-40)

S7b (6) and (7) cap the underground and undercity allocations by predicted capacities (II.7.3, II.7.5); the base states the
prediction for street-following mains only. `NetworkForecaster.forecast(doc, rules)` runs at S7b, before (5) (in a hood
document after the one-district allocation, V4 §3.1's hood line), on what exists then — the ways of S4 and S5, the district
faces of S6, `Terrain`, the roster of S2 — **gated** (C4-20): P1–P4 run only where `Features.sewers` is true and for the chosen family only; P5 and P7 run at every rung for caverns and ruins and
at TOWN and above for the other kinds; P6 runs at TOWN and above; in a hood document (V4 §3.1's hood line) P5 and P7
forecast a ruin, a cavern and at most one catacomb only.
1. **P1** — N1–N3 exactly, on the same code (`R` from S6's districts).
2. **P2** — served area from the district faces: each district's L1 faces' area × the dense core's plot share (0.62,
   §4.2 S2), spread over its bounding way edges in proportion to their length, then N4's accumulation.
3. **P3** — N5 and N6 (no N7: the invert changes no size), giving each run's kind, profile and `navigable`.
4. **P4 — the admissible share.** A way run's side strips lie under the street where `halfWidth(way) − (widthCm ÷ 2 +
   wallCm)` reaches the poorest band's minimum underground depth (II.7.3: 4 m × the band row), else under the frontage
   buildings, which II.7.3 excludes: its share is the fraction of its length under square faces or under ways meeting that
   margin; a culvert or drainage run under blocks takes 1 − the district's coverage row. The capacity is II.7.3's
   `2 × Σ lengthM × admissibleShare ÷ meanFrontage(poorest band)` over the navigable runs of at least `minRunM`.
5. **P5 — the voids, realised where the key exists (C4-40).** Each system's floor area ÷ `m2PerHousehold` (II.7.5):
   * a **ruin** by its own existence draw and extent draw (the keys U-SYS uses, V4 §3.5.0a — its sources are dossier facts
     and the recipe, all known at S7b) × `RuinRule.forecastFloorShare` (0.3);
   * a **cavern** by its existence draw (the key U-SYS uses; the geology is S1's) and the frame's rock × `maxRockShare` ×
     `forecastFloorShare`;
   * **vaults** by the part-0 bridges and steep ways present (exact), and the **forced vaults** under `require` (V4 §3.5.6)
     by their law (exact) — never an arch vault or a terminal cistern, which no undercity takes (C4-110-2); a **buried** town
     by the scar rule (exact);
   * a **quarry** by V4 §3.5.3's volume law over the roster's predicted stone stock;
   * **catacombs**, the one expectation (their burial faces are seated at S10b): the roster's expected burial faces ranked
     by expected burials, the first `count` of them (V4 §3.5.1's count), each need × its face chance (in a hood document the
     burial faces the one-district allocation's anchors bring, the first one; V4 §3.1's hood line).
6. **P6 — the undercity's existence (C4-20).** II.7.5's rung row; the TOWN draw — one uniform on `sewer` keyed by (the
   settlement, `undercity`), which U-CITY C0 re-reads and never re-draws; `CircumstanceSlice.undercity` (`require` → exists
   at TOWN and above with `n ≥ 1`, the forced vaults counted where no counted void qualifies; `forbid` → none); the size
   law's `H` and `n`, capped by the counted voids' capacities in rank order (capacity × `RuinRule.sourceWeight`). It
   returns `undercity: { exists, n, H }`.
7. **P7 — the chance of access (g item 109 (j); C4-48 (6)).** For each forecast cavern or ruin void,
   `pAccess = 1 − (1 − pOpen) × Π_b (1 − pDig(b))`: `b` the buildings expected over its plan extent — each district face
   over it × the district's coverage row × its band's buildings per hectare — each priced by `DigRule` at the ordinary
   house's class row and `depthFactor` at the void's top depth; `pOpen = 1 − Π (1 − chance)` over its expected opening
   candidates (`OpeningRow`); `pAccess = 1` where a P3 run's plan passes over the void within its depth range (the overlap
   rule). A kind dug from the surface has `pAccess = 1`. A void counts toward P6's capacity and F6's allocation only when
   `pAccess ≥ accessForecastMin` (0.5). `voidDwellingHouseholds` is Σ min(`voidDwellings.maxHouseholds`, capacity) over
   the counted cavern and ruin voids the undercity forecast does not take, capped at `voidDwellings.share` × the poorest
   band's households (in a hood document, the one-district allocation's poorest-band households).
S7b (6) and (7) allocate at most `forecastSafety` (0.85) × each forecast capacity (BCR-19), so over-forecasts are rare. The
forecast is advisory and deterministic: its misses are absorbed below (V4 §3.4 F0, §3.6 C1) and the remainder by T8 (V4
§3.7a), reported, never re-rolled. Budget: its own §12.4 row, ≤ 3 ms at CITY, ≤ 6 ms at METROPOLIS, ≤ 1 ms at a village
rung (BCR-11).

### 3.4 U-FRONT — the sewer-front neighbourhoods (II.7.3's rules, as steps)

The rules — U1–U3, the occupants, the cut, the surface constraint, access, depth, lifecycle, order — are II.7.3's and
are not restated; these are its steps.
1. **F0 — gate and absorption (C4-02).** The underground `Allocation` exists (S7b (6)) and part 0 holds at least one open
   navigable run. With an allocation and no such run, its households go first to the other underground allocations with
   free capacity (an undercity neighbourhood, then F6's clusters), and only the remainder to T8 (V4 §3.7a), reported
   (F-SITING). A surplus S10b cannot seat on the plots F2 cut raises the occupancy of the placed sewer-front cells, in
   address order, up to `crowdCap` households per cell; the rest goes to T8.
2. **F1 — frontages.** On each part-0 block, each kerb edge of an open navigable run is a frontage (II.7.3's cut (1)) — a
   wedge at a `chamber` junction never is (J-V4.9): the chamber stays open floor. `Frontage` records are made per block
   and run (§2.5), class the run's kind.
3. **F2 — regions and plots.** S10 (2)–(10) with the context vector of II.7.3 (the ground's field shifted by
   `undergroundOffset`, `ContextVector.arena = 'underground'`), the regions' depth capped by `depthScale`. The prosperity
   sampled is the ground raster with its daylight-share term (g item 102): the underground inherits its parent ground's
   standing, not a sun of its own (J-V4.51).
4. **F3 — the surface test.** II.7.3's sampled `pointLocate` test and F-UNDER's ladder on every plot before commit; each
   block's **recorded ground cells** — the ground L1 faces its samples touched, by address — are written into its
   derivation record (§2.8), the declared read §7.3's locality row uses.
5. **F4 — placement and buildings.** S10b places the allocation, its relation families measured by `underDistance`
   (V4 §3.6a); S11 lays `row` and `institution` arrangements only, heights by II.7.3's depth rule.
   * **Members (g item 108; C4-34).** A COUNT or GUILD ladder record of an underground-preferred or subterranean kind
     places each member as its own item, keyed `#k` (item 108's member key), each by the scorer; a SIZE step places one
     larger compound; members are never double-counted with their record.
   * **Clandestine institutions (item 63; C4-35).** An `underground`-mode concealed use takes a plot whose `knownTo` is
     the institution's (default `secret`); its exposure preference is the station farthest along the run from a public
     grating (a soft row); it has no front (`Building.concealed` without `Use.front`); its door light carries the
     `exposure` row `hidden`, so the light draws only for a key that admits it (§8.1 item 7); its way to the surface is
     L3's basement access with the concealed multiplier where a building above reaches it.
   * **No crypt below.** F4 never seats a crypt as an underground plot: the `preferred` classes are V11's rows, and a crypt
     is its church's `Basement.crypt` (V03 §3.7.4; g item 109 (k) (2)).
   * **Entrances (C4-64 (4)).** Every entrance S11 derives on an underground building here opens onto its tunnel run's
     kerb: it takes `Entrance.faces: 'tunnel'` (BCR-V3-21; J-V4.91), which V03 §3.12 (4) and the VTT portals read. F6 and C4 write
     the same on their buildings' entrances (a gallery kerb, a chamber wall, a walkway kerb).
6. **F5 — access, air, light.** Per neighbourhood (a connected component of open navigable run edges carrying a plot)
   II.7.3's access order, its squares, yards and public ground read by V4 §1.2's definition; shafts every
   `shaftSpacingM` on public ground. Shaft spacing counts every surface-breaking
   opening whatever its role, the record keeping its own role; an N11 grating on a lived run satisfies the
   neighbourhood's access (T12-1's ≥ 1 access row), so no second stair is made beside it (C4-45). Lights by V4 §3.9's
   sewer rows.
7. **F6 — scattered dwellings in the voids (g item 109 (e), (j) (4); C4-48 (5)).** In each cavern or ruin cluster (U-CITY
   C1's connected component) whose excavation reading is `accessible` and which no undercity neighbourhood took, at every
   rung: S10 cuts the cluster's floor with frontages on gallery kerbs and chamber walls (II.7.5's cut; `water` galleries
   are never frontages), S10b places up to `voidDwellings.maxHouseholds` households of F6's allocation (S7b (6)'s void
   part, BCR-19; in a hood document taken from the one-district allocation, V4 §3.1's hood line) — at an epoch, in a cluster `under.access` made accessible that epoch, the households volume 6 relocates
   into its new dwellings (V6 §3.18.1 (4); V4 §3.10; TR-08), and in a cluster accessible before that pass, the crowding
   hook's void part up to the free capacity (V6 §3.6 (1); BCR-V6-28 (c); TT-02) — by
   II.7.3's rows, and S11 lays the `row` and `hovel` arrangements, ceiling-capped (II.7.5). The occupants
   are squatters and hermits of the poorest band and, where the roster holds one, a forbidden shrine (a cult). F6's blocks
   join the underground pseudo-district's `faces` (a `FaceRef` names its part), keyed by the cluster (V4 §2.5). A cluster
   that is `unexcavated` holds no dwelling (J-V4.53); one that turns `unexcavated` vacates them (V4 §4.3).

**Existence along the sewers (C4-18).** II.7.3's surface test excludes every footprint, so under 4–8 m streets the
sewer-front plots may be rare. The bar T-V4-41 measures it at U2 (at least one sewer-front neighbourhood on 60 % of
navigable and 10 % of historical CITY seeds). **Pre-decided fallback** if it fails: BCR-27 applies — II.7.3's surface
constraint binds sewer-front plots only where their ceiling lies within `surfaceClearCm` of the ground, as J-V4.21 does for
voids — and the navigable profile's `coverCm` rises to 600, so those dwellings' ceilings clear that depth (J-V4.60).

### 3.5 U-SYS — the void systems

**3.5.0 Existence, order and what every system shares.** In the order ruin, catacomb, cavern, quarry, vaults, buried —
the ruin laid first, so every later system meets it (g item 109 (c)) — each kind is gated by rung (C4-46; g item 109 (j)
(1), whose base side the coherence pass applies to II.7.6's gate sentence and PART III's village rows):

| kind | rungs | existence |
|---|---|---|
| `ruin` | every rung, THORP to METROPOLIS | V4 §3.5.0a's sources |
| `cavern`, the fissure variant included | every rung | the geology flag and its row chance × the mining boost (V4 §3.5.2) |
| `catacomb` | TOWN and above | V4 §3.5.1's candidates, rank and count |
| `quarry` (mines and chain mines) | TOWN and above | V4 §3.5.3's volume law; mines where the roster holds a mining class |
| `vaults` | TOWN and above for the generated sources (bridge, street and cistern vaults, the forced vaults); the arch vaults and the terminal cistern at every rung, following their raised way (C4-110-3) | V4 §3.5.4's rules; the forced vaults (V4 §3.5.6); the base's `vault` spans and `cistern` terminals (BCR-45) |
| `buried` | TOWN and above | the scar rule (II.7.6) |
| `dug` | every rung | U-DIG's closures and U-LINK L5 |

**In a hood document** (V4 §3.1's hood line) the rung column reads: `ruin`, `cavern` and `dug` as at every rung; `catacomb`
at TOWN's rules and count, on the hood's own burial faces; `vaults` the arch vaults and terminal cistern of a declared raised
way only; no `quarry` and no `buried`.

Each chance is one uniform on `sewer` keyed by (the kind, the source's lineage). The parity presets set every chance to 0
(a dossier source's included: a parity run carries no dossier), the ruin toggle `off` and the scar rule off (T-V4-35).
**Dossier forcing (BCR-14; V4 §2.3a):** a subterranean record whose row names this system kind makes the system exist with
at least one source — its own building where it has one; else a catacomb record the first burial face in rank order that
passes the dry-ground gate (V4 §3.5.1 (9)), a mine record the ore cell nearest the town (V4 §3.5.3), a cistern record the
oldest precinct's court (V4 §3.5.4) — its chance taken as 1. A crypt record forces no system (C4-49 (5)). A system is
created (its part the next unused, §2.9) only when its first element can be laid; it writes its L0 margin ring, then its
elements in one L1 batch (galleries as `gallery` chains, chambers as closed `chamber_wall` chains; a gallery segment inside
a chamber is dropped so galleries end on the wall), then one L2 `corridorUnion` batch. **The shallow-element rule
(J-V4.21):** an element of a system laid after the town whose ceiling lies within `surfaceClearCm` (600 cm) of the ground
above keeps `foundationClearM` (II.7.6) from every basement ring of another building and never lies under a water face;
deeper elements are free of the surface. A ruin is older than the town, so the rule runs the other way for it: a ruin
element under a footprint or within `foundationClearM` of a basement ring is created `collapsed`, cause `foundation` (the
town's foundations cut through it; g item 109 (c), (d)). A dry kind (catacomb, quarry, vaults, dug) keeps its floor above
the water table; a buried or ruin element found below it is created `flooded` (II.6's row). An arch vault stands at grade
and is exempt from the cover rows and from the dry-kind rule (V4 §3.5.4 (d)).

**Foundations (g item 110 (a), (b); C4-110-5; J-V4.82).** `foundationObstacles(doc)` is derived at every derivation from
the ground as it stands: (1) each raised-way pier's footprint (its ring on ground part 0, for the raised way of every raised part) from
`levelledGroundCm` at its centroid (BCR-V5-30) down to `raised.supportFoundationCm` (400 cm, BCR-45) below it; (2) each
`RetainingWall`'s footing — a live wall's, and one a `raiseGrade` tombstoned (V6 §3.19.4 (1)), whose footing stays in the
ground under the buried town — a strip `foundations.footingWidthCm` (100 cm) wide centred on its chain, from its high-side
ground down to its low-side ground (each `levelledGroundCm` on its own side, a tombstoned wall's on its last live state)
less `footingBelowCm` (100 cm), that is the step height plus 100 cm, station by station along the wall; (3) each
buried aqueduct stretch's channel band grown by `conduitClearCm` (100 cm), from the ground down to its channel floor less
100 cm. An element lies **within reach** of an obstacle when its plan band meets the obstacle's footprint grown by
`foundationClearM` (II.7.6) and its top lies above the obstacle's bottom. Every rule that reads basement rings reads these
beside them. A system laid after the town (a catacomb, a quarry or mine working, vaults, the forced vaults, the undercity's
carve, a dug passage and U-DIG's connector) lays no element within reach; a catacomb node so refused records
`blockedBy: 'foundation'`. An older void (a cavern, its fissures, a ruin) keeps its plan and the builders fill what they
met: a gallery's stretch within reach is split out by II.6's stretch split and created `collapsed`, cause `foundation`; a
chamber whose floor the grown footprints cover by at least `foundations.collapseShare` (0.25) is created `collapsed`, cause
`foundation`, and one covered less keeps its floor with the footing standing in it as a masonry pillar — no floor, no
plot, no walkway and no pin on it (drawn by V4 §5.2, explained by V10: "the footing of a raised-way pier of ⟨way⟩"). The reading is
re-made at every derivation from the current raised-way piers and retaining walls, so a removed raised way's fill goes with it and a new one's
comes with it (T-V4-65). A raised-way pier is no building and never a dig host for U-ACCESS (d). The buried town's own
elements are never collapsed by a footing: its old streets and storeys are the ground the walls held (V4 §3.5.5).

**At an epoch (TR-07; J-V4.109)** no V04 stage derives, so the rule is applied by `Foundations.apply(doc, scope, cause)`
(V4 §1b.2), volume 6's `under.extend`'s first act (V6 §3.18.1 (6)), at every rung, the maintenance mode included: over the
new footprints and basement rings of `scope.built` and `scope.basementGrown`, the raised-way piers of the parts in
`scope.raised` and the footings of the retaining walls in `scope.levelled`, it applies this paragraph's rule to the
elements within reach of those obstacles — an older void's stretch split out `collapsed`, a chamber covered by at least
`collapseShare` `collapsed`, one covered less holding the footing as a pillar, a later system's element `collapsed` (a
catacomb's staying in its extent, V4 §3.5.1 (6)) — cause `foundation` with `event` the epoch's `seq`, one batch per part,
no draw. The plots on a floor it collapses (F6's, an undercity neighbourhood's) are vacated by II.7.3's vacancy rules in the
same batch and returned in `FoundationsResult` (V4 §2.4) — each plot with its households' ids — with the collapsed
elements and the pillars, for volume 6's re-homing by name inside the participant (TT-07). An epoch op removes no obstacle — a breached or dismantled span keeps its piers' footings
(V6 §3.19.2), a tombstoned wall its footing (above) — so the element set it collapses is the one a regeneration of the same
state collapses (T-V4-65; V6's T-V6-67).

The rows' gallery and chamber defaults, which II.7.6 leaves to the rows (our own values; J-V4.16 – J-V4.20, J-V4.52):

| system | gallery `widthCm` / `wallCm` / `headroomCm` | `coverM` | chamber kinds: `minM2` / `ceilingCm` |
|---|---|---|---|
| `ruin` | a street at its culture row's `streetCm` / 60 / 300; a corridor 150 / 50 / 250 | `burialCm ÷ 100` less the ceiling | `hall` 150 / 800 · `temple` 100 / 700 · `court` 100 / 600 · `gate` 20 / 400 · `room`, `tomb`, `vault` 6 / 300 · `cistern` 40 / 500 — each ceiling capped at `burialCm − 100` |
| `catacomb` | 120 / 50 / 200 | 2.5 | `ossuary` 9 / 250 |
| `cavern` | 300 / 100 / 400 (a volcanic tube 500 / 100 / 400; a fissure 80–150 / 100 / 600–1 200) | 3 | `hall` 400 / 800 · `breakdown` 300 / 600 (a fissure's ≤ `fissureChamberM2`) |
| `quarry` | haulage 250 / 50 / 250; a heading 150 / 50 / 200 | 6 (`minCoverM`) | `workings` 400 / 250 (the pillars drawn, not modelled) |
| `vaults` | 400 / 60 / 300 | 1 (an arch vault 0: at grade) | `cistern` 150 (a castle's 250; a terminal cistern `terminalCisternM2`) / 500 · `streetVault` 40 / 300 · `bridgeVault` 60 / 300 · `archVault` the span's inset rectangle / the soffit less its floor (V4 §3.5.4 (d)) |
| `buried` | the old way's width / 30 / the raise − 50 | 0 | `storey` the footprint / min(the storey height, raise − 50) · `square` the old square / raise − 50 |
| `dug` | 100 / 30 / 190 | 1.5 | `cellar` 6 / 220 · `storage` `storageM2` / 220 · a charnel `ossuary` ≤ `charnelMaxM2` / 250 |
| undercity carved (in the host's part) | walkway 300 / 0 / the chamber's ceiling | — | `market` `mainChamberM2` / min(the host row's largest ceiling, the adjoining headroom + 200) |

**3.5.0a Ruins (g item 109 (b), (c), (e)–(h); C4-47; J-V4.52).** An older civilisation's remnant plan, laid first, at every
rung.
1. **Existence, strongest first.** A ruin the document already holds is kept whole whatever its dossier source now says —
   a removed source clears `source.ref` (V4 §2.6; `W_RUIN_SOURCE_REMOVED`; ST-22) — save a `blueprint` ruin, which a
   re-derivation with `recipe.layers.ruins` off does not lay. Otherwise the sources are read in this order and the first
   that fires sets `RuinRecord.source`:
   (a) a `site.deposits` entry of kind `ancient_ruins`, or an institution of scene archetype `ruined-landmark`: the ruin
   exists, no draw; (b) a `magical_node` deposit or a ley-line income row: `RuinRule.chance.magic` (0.6); (c) a `magical`
   history event, or `history.ageYears ≥ ancientYears` (an ancient founding): `chance.history` (0.4); (d) with none of
   these, `chance.blueprint[rung][relief]`, only while `recipe.layers.ruins` is `on` (BCR-35; D-3's named toggle). A
   delving institution multiplies (b)–(d) by `delvingFactor` (1.5), capped at 1, and alone gives nothing. One ruin system
   per settlement; one uniform on `sewer` keyed by (`ruin`, the source's lineage — the deposit's, the institution's, the
   event's — or the town root for the blueprint). A declared ruin element in the creation prefix (V4 §4.7) makes it exist
   whatever the draw, `source: 'declared'`.
2. **Culture and axis.** The culture row is one draw over `RuinRule.cultures` by weight on the ruin's stream, or the row V11
   maps to the ancient civilisation the dossier's history names. `axisDeg` follows the row's orientation law: `cardinal`
   0° (north–south) ± 5°; `solar` 90° (east–west) ± 10°; `contour` the mean contour bearing over the outline
   (perpendicular to the mean terrain gradient); `free` uniform on [0°, 180°) — the jitter a draw. With
   `sharedAxisChance` (0.25) it takes instead the bearing of the present tier-1 way whose spine passes nearest the centre
   (its OBB axis), and `sharedAxis` is set: the old axis surviving as the new (g item 109 (c)).
3. **Place, size and outline.** The centre is the marker's position (the port's ruin decoration or the ruined landmark's
   site); else the magical node's position (DR19's deposit site); else the centroid of the growth-stage-1 districts; else,
   at a village rung with no stage-1 district, the centroid of the village's district (V07's one district; C4-65 (4));
   else the town root's anchor. The significance is drawn by weight (a
   `ruined-landmark` record forces `palace`), the extent uniform in its `extentHa` range, capped at `maxFrameShare` × the
   frame's area. The outline is a rectangle of that area on `axisDeg` with the row's `aspect`, centred and clipped to the
   frame; a clip that removes more than half moves the centre toward the frame's centre, in 10 m steps, until half
   remains.
4. **Depth.** The ancient ground `g(p)` is the present terrain smoothed by a `smoothM` (50 m) box kernel less `burialCm`,
   `burialCm` = `burialByAge(ageYears)` interpolated and clamped to `depthM` [4, 30] m (BCR-31); `ageYears` is the source's
   (a history event's `yearsAgo`, a founding's age) where it gives one, else drawn on [`ancientYears`, 3 000]. A `terraced`
   plan steps its floor by `terraceRiseM` per terrace along the fall line. Each element's floor follows `g` at its
   vertices (a gallery graded, a chamber level at its centroid's value); each chamber's ceiling is its kind's, capped at
   `burialCm − 100`. An element whose floor lies below the water table is created `flooded`.
5. **The ancient plan, by family** (V11's row gives `blockPitchM`, `streetCm`, `aspect`, `roomM`, `columnPitchM`,
   `hallShare`, `terraceRiseM`):
   * `grid` — streets on a pitch drawn in `blockPitchM` along and across `axisDeg`, every third a main street at
     `streetCm[0]`, the rest `streetCm[1]`; each block cut into rooms by recursive splits along its longer side until both
     sides lie within `roomM`; the `hallShare` of blocks nearest the centre become one `hall` each, the central block a
     `temple`, and where the perimeter streets meet the outline a `gate`;
   * `axial` — a processional axis through the centre along `axisDeg` at `streetCm[0]`; along it alternate `court`s and
     rows of rooms mirrored across the axis; a `temple` at its head; `hall`s at a third of its length from the head;
   * `radial` — a ring road at 0.7 of the outline's inradius and spokes every 45° to a central `hall` (the citadel);
     the wedges cut into rooms as `grid` cuts blocks;
   * `terraced` — terraces along the contours `blockPitchM` apart, each a terrace gallery with a row of rooms on its uphill
     side, joined by a stair gallery every `blockPitchM` along the terrace.
   Streets and corridors become galleries; rooms become chambers of kind `room`, those of the outermost row in the quarter
   farthest from the centre along the axis `tomb` (the necropolis), those adjoining a `hall` `vault`; a cistern where the
   row's `hallShare` block lies lowest. Where the culture row's `monument.hosts` holds `tomb`, the necropolis's block
   nearest the centre is not cut into rooms: it is one `tomb` chamber, a mausoleum, so a monument fits (J-V4.86). Each main
   street carries its ancient drain as a channel (the `water` stroke), the element the sewer may adopt (V4 §3.5.7 (f)).
   At most `maxChambers` chambers: beyond it the plan's outer rooms are dropped from the outline inward. One L1 batch, one
   L2 `corridorUnion` batch, on the next unused part.
5a. **Stepped monuments (g item 110 (c); C4-110-8; J-V4.84).** Where the culture row carries `monument`, each host kind it
   names takes one monument: `temple` the temple chamber nearest the centre, `hall` the hall nearest the centre, `tomb` the
   mausoleum of (5); ties by address. V02's `layTiers` (V2 §3.15.1) lays it with:
   * `frame` — the chamber's rectangle on `axisDeg`: `u` along its **front**, the side facing the nearest main-street
     (`axis`) gallery, else the side facing the centre, ties by the lower side index; `v` inward; the origin the front's
     corner that makes (`u`, `v`) right-handed, moved inward by `monument.clearM` along both;
   * `region` — `W` the front's length and `D` the depth, each less 2 × `monument.clearM` (3 m);
   * `scale` 1; `cells` V02's `stepped-monument` row at the anchor `monument.band`; `heights` V11's `stepped-shrine` row
     (critique-V11 V11C-35 (3)), not the great temple's nave row; `pitch` M11's one pitch rule at the site's climate row;
     `parapetCm` 0 and `plinthCm` 0 (a ruin keeps neither); no `anchor`;
   * `draws` — ST1's list, drawn by V04 in ST1's order (V2 §3.15.1) on `sewer`, keyed by (the ruin system, the chamber's
     plan coordinate, `'tiers/0'`) for the first pass and (…, `'tiers/1'`) for the per-tier pass; an author's
     `monument.count` replaces `n`, every other draw unchanged. ST6's failed check is an attempt on the same keys with the
     attempt index, as V02 states.
   An ST0-infeasible region is retried once with `clearM` halved; still infeasible, the chamber keeps its form with no
   monument and `W_RUIN_MONUMENT_SKIPPED` is reported — nothing is discarded (§5). **The ceiling cut:** with `top` the laid
   stack's highest point above the chamber's floor (V2 §3.15.2's envelope), the chamber's ceiling becomes
   `min(burialCm − 100, max(its kind's ceiling, top + monument.ceilingClearCm))`; the tiers, stairs and shrine whose top
   would rise above that ceiling less `ceilingClearCm` are removed from the top down and counted into `lay.truncated`, so the
   top stays under the ceiling — the ground above pressed on it. The result is `Chamber.monument` (V4 §2.2), decayed by (6).
   Its standing tiers and its mound are obstacles for U-CITY (V4 §3.6). With no `monument` cell the ruin draws nothing on
   the `'tiers/*'` keys and is byte-identical (T-V4-68).
5b. **Columns, modelled (C4-64 (5); J-V4.92).** In every `hall` and `temple` chamber, in its rectangle's frame, the column
   grid of pitch `columnPitchM` centred on the rectangle, every node at least `columnPitchM ÷ 2` inside its walls and outside
   its monument's tier-0 ring grown by 100 cm; each line of nodes along `u` is one colonnade row, indexed from the front. The
   nodes of the rows (6) keeps are `Chamber.columns`, derived, never stored, exported by `@plat/under` as
   `ruinColumns(chamberId)`: V03 §3.12 (6) reads them as fixed rings, the ruin program draws them as its 60 cm dots (V4
   §5.2), C3's walkways keep 60 cm clear of each, and glTF and VTT export them. The drawn dots are the modelled points
   (T-V4-44).
6. **Decay (the persistence order).** Each element's persistence class — `hall` for halls and temples, `cistern`, `gate`,
   `axis` for the main streets, `street` for the rest, `wall` for vaults, `room` for rooms, courts and tombs; `colonnade` for
   the columns' rows — survives when one uniform on `sewer` keyed by the element falls below
   `S(class) = min(1, survival[class]^(ageYears ÷ ageRefYears) + coverKeep × burialCm ÷ 1 000)`. A non-survivor stays as a
   record with `closure: 'collapsed'`, cause `decay` — g item 109 (c)'s "collapsed or filled", since the base has no filled
   state. Collapsed elements count in V12's plan measures and never in capacity or access. **A colonnade row** survives when
   one uniform keyed by (the chamber's key, `'colonnade'`, the row's index) falls below `S(colonnade)`; a fallen row's nodes
   leave `Chamber.columns`, and a collapsed chamber has none. **A monument decays from the top (C4-110-8):** tier k stands
   while one uniform keyed by (the chamber's key, `'tiers/decay'`, k) falls below `S(hall) × monument.tierDecay^k` (0.85);
   `standing` is the first k that fails, and every tier from it up falls with its stair; the shrine stands only when every
   tier stands and its own uniform (index n) passes. The fallen tiers lie as a rubble mound on the first fallen tier's ring,
   `moundCm = moundShare × Σ` the fallen tiers' heights, capped at the ceiling less 50 cm. A host chamber created
   `collapsed` keeps its monument with `standing` 0: a mound in the rubble.
7. **Distinct from the town above (g item 109 (c)).** After the decay, V12's paired measures (`ruin.blockArea`,
   `grid.r4`, `grid.axis`) are computed for the ruin's plan and for the district fabric over its outline (volume 1's
   `fabricSignature(outline)`, V1-3.16; SLR1-07); where they fail V12's `paired` margins, the next culture row in the draw's order is tried (up to
   `distinct.retries`, 3), then the axis is turned by `rotateDeg` (30°; skipped when `sharedAxis`); if all fail the last
   attempt stands and `W_RUIN_SIMILAR` is reported (`attempts`, `similar`).
8. **Its surface.** The marker — the port's ruin decoration, or the ruined landmark's building — stays on the ground and
   is the `ruin_entrance` candidate of U-ACCESS (e); `RuinRecord.marker` names it.
9. **`ruinCentre(doc)`** returns the record's centre (else null): the magical node sits at the ruin's heart, the position
   V08's `magical_node` site reads (g item 109 (f); DR-V8.2). **The report line (SL-03).** For each `magical_node` deposit
   whose site stands at `ruinCentre()`, the tail's T6, once S13a has named the ruin, writes the generation report's line
   `ruin.node: { deposit: Id; ruin: Id /* the ruin system */; name: NameRef /* RuinRecord.name, a reference, so a renamed
   ruin reads its new name */ }` (§5.4), derived with the report and gone with the deposit or the ruin. V05's why ("the
   node beneath the old ruins", V5 §3.3, §4.5) and V10's read it. Volume 5's node term stays positionless (J-V5.41): no
   island rule reads this volume's arena, and this line is all a sky reader takes from it (J-V4.102).
10. **Identity.** A ruin element's creation key is (the ruin system, its plan coordinate), so a regeneration that keeps
    the plan keeps every key; the record is kept whole while its source stands (V4 §2.6).
A ruin exists whole whether or not anyone can reach it: its excavation reading (V4 §3.5.7 (g)) starts `unexcavated`.

**3.5.1 Catacombs — under cemeteries only, counted, ranked, never shrinking (g item 109 (k); C4-49, C4-50, C4-24;
J-V4.16, J-V4.55).** TOWN and above.
1. **Candidates: burial faces only.** (a) The `churchyard` part of a church or temple plot (§4.9's churchyard row) — the
   church building is never the source; (b) every `cemetery`-class use (V11 §3.5, its `extramural` row letting it lie
   outside the walls), the dossier's `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house` and
   `Graveyard` records seated as that class; (c) each burial ground of a `Cemetery network` record, one beyond each gate on
   a through route (item 108's COUNT row, V11); (d) a monastery's `burial` yard part; (e) at CITY and METROPOLIS only, after
   every burial face, a worked-out quarry working (V4 §3.5.3) within `ossuaryReachM` (500 m) of `R`: the **quarry
   ossuary**, which adopts the working by `reuse` (V4 §3.5.7 (f)). A burial face on a sky island is skipped (V05 §1.3, §3.5 (3); SLR1-07).
2. **Rank by the burials each face serves.** At growth stage k of K, `burialShare_k(f)` is the share of that stage's
   households whose nearest open burial face, by the street solver's `street` distance from their plot (§4.7), is `f`
   (ties by address), over the faces standing at stage k. The face's need is II.7.6's ossuary law with that share
   (BCR-36): `A(f) = Σ_k pop_k × burialShare_k(f) × yearsPerStage × burialRate ÷ 1 000 × ossuaryShare × m2PerBurial`, a
   plague epoch's burials × `plagueNeedFactor`, and at an epoch the span's calamity deaths as burials — `burialShare(f) ×
   opts.deaths × ossuaryShare × m2PerBurial`, `burialShare` the epoch's ((5); TR-10) — each added to the need, never to the
   cap (6). Candidates rank by `A` descending, then the face's area, then address. A
   quarry ossuary's need is the burials of the faces left without a complex after the burial-face pass plus the unmet need
   of the stagnant complexes (5); one whose need is under `growthFloorM2` is not adopted.
3. **Count.** One at TOWN; at CITY and METROPOLIS `min(cap, 1 + ⌊churches ÷ churchesPer⌋)` (`CatacombRule.count`: 10 and
   8, caps 3 and 5). `churches` counts the buildings of classes `cathedral`, `great_temple`, `church` and
   `v.parish_church` (V07's village class, V07 §2.4, V11 §2.9; C4-65 (2); SR1-24) on the ground and on every live sky island, each once (V05 §3.5 (3); the one
   exception to V4 §1.2's sky rule — a count, never a candidate: (1) skips every sky face), and each monastery's church; a
   collective dossier record counts each member once (item 108 (c)); volume 6 re-reads the count at each epoch (V6
   §3.18.2 (1)). The churches set how many; only
   burial faces hold them. Candidates are tried in rank order until the count is reached, each passing II.7.6's
   dry-ground gate (not `damp` or `flood`), its age gate (`minAgeYears` by the face's growth stage, `HistoryHint` or the
   log) and its source chance — one uniform on `sewer` keyed by (`catacomb`, the face's lineage), no epoch component (fixed by its
   key and never re-drawn, V4 §3.12), against
   `CatacombRule.chance` (churchyard 0.25 · 0.4 · 0.5; cemetery and network 0.3 · 0.45 · 0.55; monastery 0.4; quarry
   ossuary 0.3). A face that fails is skipped and not counted, so not every town has one. Every existing complex counts,
   closed ones included; a created complex's existence is never drawn again.
4. **Layout.** A `CatacombComplex` per formed complex. Its anchor is the face's centroid (a quarry ossuary's, the
   working's), its axis the face's OBB long axis; grid nodes at `gridM` pitch along that axis. A breadth-first growth from
   the anchor node, in order (grid distance, then (i, j)), admits node `n` when: it lies within `reachM` of the anchor
   (else `reach`); its ground point is neither `damp` nor `flood` (`wet`); it is no tombstone; it lies under no
   `wall_strip` band (`wallStrip`); it passes the shallow-element rule and lies within reach of no foundation obstacle
   (V4 §3.5.0: basements, raised-way piers, retaining-wall footings; `foundation`); it lies in no other system's
   element of this part at another depth band (`system`); and, with `A` the admitted set, the level floor holds (C4-24):
   `max_{m ∈ A∪{n}} h(m) − floor(A∪{n}) ≤ depthM.max`, with `floor(X) = min_{m ∈ X}(h(m) − coverM − headroom)` (`depth`).
   Each rejection's reason is kept in `blockedBy`. A node inside a ruin `tomb` chamber in plan at a shared depth reuses it:
   the tomb's area counts toward the complex and takes `reusedBy` (V4 §3.5.7 (f)). Growth stops when the galleries' floor
   area plus the chambers' reaches the target. Every grid edge between two admitted nodes is a gallery; every admitted node
   where `(i + j) mod 4 = 0` and three or more galleries meet takes an `ossuary` chamber, a square of half the pitch. One
   complex, one floor (`floorCm`). Complexes are laid in rank order; a node within one pitch of an earlier complex joins
   it (its floor) when that floor is admissible there, else is not admitted — two complexes meet or keep apart, never
   cross (II.7.6).
5. **The largest under the largest cemetery (ST-03; J-V4.95).** Every complex but the **primary** is capped at `rankCap`
   (0.9) × the primary's extent. The primary is a reading, never stored: the complex whose source serves the most burials
   — the greatest need `A` of (2) (a quarry ossuary's its need), ties by rank, so rank 1 at generation — at every
   derivation; at an epoch, volume 6's derived primary, the same reading held by its hysteresis (V6 §3.18.2 (3a)), passed
   in `opts.primary`. The cap only blocks growth (`blockedBy: 'rank'`) and never removes anything, so the largest catacomb
   lies under the cemetery serving the most burials — in a big city usually the main cemetery outside the walls, which
   overtakes an older churchyard's complex over epochs (g item 109 (k) (3)). **The signature:** `CatacombGrowth.grow(doc,
   epoch, opts?: { capM2: Record<Id, number>; primary: Id; deaths?: number })` — with `opts` (volume 6's `under.extend`),
   `capM2[id]` bounds each complex's growth at this call (volume 6's per-epoch cap, V6 §3.18.2 (3)), `primary` names the
   primary and `deaths` carries the span's calamity deaths (volume 6's sum of `CalamityRef.deaths` over the epoch's events,
   V6 §2.4, §3.18.2 (3); V08 §3.6; absent 0), which (2) adds to the need and never to the cap (TR-10); without `opts`, the
   cap is (6)'s — none at generation and at a re-derivation (each complex to its need), the per-epoch cap with `years` the
   stage's span at a growth stage of the grow-by-stage path —, the primary is the reading above and no deaths are added.
6. **The ratchet (C4-50; g item 109 (k) (4)).** Generation lays each complex to its need (the generation stands for the
   settlement's whole past; the per-epoch cap is an epoch rule) and sets `extentFloorM2`. Every later derivation — a
   growth stage (`extend`), an epoch, a dossier event, a replay, a Re-derive from any stage, a New random, a migration —
   only adds: every existing element is kept, closed ones included; the target is `max(the current extent, the
   recomputed need)`; at an epoch the growth is at most `max(the current extent × ((1 + growthCapShare)^years − 1), growthFloorM2)`,
   `years` the epoch's span (J-VI.6) — or volume 6's `opts.capM2[id]` where it passes one, (5); growth
   continues from the existing frontier in (grid distance, (i, j)) order; `extentFloorM2` becomes the greater of itself and
   the laid extent. A kept element that a later town puts under a basement ring is converted `collapsed`, cause
   `foundation`, and stays in the extent. A New random on the catacomb system re-derives its lights and labels only; its
   dry run says "catacombs keep their extent". **Below TOWN (C4-65 (1)).** At a village rung an existing complex (V4 §3.1's
   maintenance mode) never grows: `blockedBy` gains `'rung'`, it is stagnant, and its `fill` rises by (7) with the burials
   of its standing faces; its extent never falls below `extentFloorM2`; a rise back to TOWN lifts the block at the next
   derivation.
7. **Stagnation, a reading (g item 109 (k) (5)).** A complex is stagnant when its need exceeds its laid capacity and its
   frontier has no admissible node (or the rank cap blocks it). Its `fill` is then raised to
   `max(fill, clamp((need − laid) ÷ its ossuary chambers' area, 0, 1))` — ossuaries only fill; the bones never leave — and
   §8.2's ossuary program draws it as denser niches (V4 §5.2). When a block lifts (V01's `blockLifted` notice, a plot above
   demolished, the source reopened) growth resumes at the next derivation by least disruption.
8. **A closed face (ST-21; stated here once, volume 6 citing it).** A face is **closed** when its cemetery use is closed or
   ruined; when its face is retyped to another land use; when the dossier removes its record; for a churchyard, when its
   churchyard part is removed or its plot holds no live church-family use (the church's use closed, or moved off the
   plot); for a quarry ossuary, when no face feeding it is open. Its complex is then frozen — no growth and no change of
   `fill` (`blockedBy: 'sourceClosed'`) — and stays, every element kept. A church-family use arriving on a closed
   churchyard's plot **reopens the same face**, its lineage kept, and the complex resumes at the next derivation from its
   frontier by least disruption. A new cemetery may begin a new complex only where the count allows.
9. **The entrance (C4-49 (6); BCR-36).** A `stair` `AccessPoint`, source `system`, cause `{ rule: 'system', system }`,
   `knownTo: 'local'`, at the grid node nearest the face's centroid, its ground host the face; its head inside the burial
   ground's chapel where one stands on the face and its class's crypt column is `never` (V11's `cemetery` chapel slot),
   in a cellar, the nave or a store by V03's `AccessHostRow` (catacomb, any cause but `crypt`) — never a crypt — else in
   the open face, drawn with the stair symbol. **A church-class building** (its class's crypt column `always` or
   `basement`, V03 §3.7.4) never hosts a catacomb access of source `system` (V03 §3.7.2 (6); C4-64 (3)): a churchyard's
   catacomb is entered from the churchyard, and through its church only by the crypt join (V4 §3.5.7 (c)); a quarry
   ossuary by its working's shaft and a stair at the working's surface head.
10. **Dossier forcing (C4-49 (7)).** A catacomb record forces one complex, within the count, on the first burial face in
    rank order that passes the dry-ground gate: its chance 1, its age gate waived and reported. Where the roster holds no
    burial face at all, BCR-14's row seats the record's surface as a `cemetery` use at S10b (extramural soft, V11 §3.5)
    before the tail, so the tail never writes the ground. Below TOWN the TOWN gate stands: the record becomes one `ossuary`
    chamber of the `dug` system under its burial face — a charnel vault, its area the need capped at `charnelMaxM2` (40 m²),
    reached by a `stair` from the face or its chapel — reported `W_CATACOMB_BELOW_TOWN`; never a church crypt and never a
    gallery system.
11. **Crypts are the church's.** V04 lays nothing with a church as its source; F4 and C4 never seat a crypt as an
    underground plot; a crypt record binds to its church building, which V03 §3.7.4 makes `always` (V4 §2.3a; C4-64 (2)).
    The cathedral always has a crypt, the largest in the settlement — V03's bar (V3C-61), cited here.

**3.5.2 Caverns (J-V4.17; g item 109 (a), (j) (1); C4-46, C4-53, C4-14, C4-26).** At every rung; the extent is the site's.
*Existence:* the geology flag (S1, with g item 109 (a) (1)'s relief rows) and its row chance (soluble 0.7, volcanic 0.4),
× `mineBoost` (1.4, capped at `mineCap` 0.9) where the site **holds mining** — the share of the frame's land cells with
`SiteResources.ore ≥ 0.5` reaches `miningCellShare` (0.02), or the roster holds a mining class, or the dossier carries a
mining deposit (V4 §1b.5); one uniform on `sewer` keyed by (`cavern`, the town root). **The fissure variant:** where the
flag is `ordinary` and the relief class is `hilly` or `mountainous`, a `cavern` system of `variant: 'fissure'` (BCR-32)
exists with `fissureChance` (0.15), × the same boost, capped. *Soluble rock:* the D8 paths over the frame's `rock`, `high`
and `mid` cells whose catchment reaches `caveCatchHa`, in descending accumulation, until the extent cap `maxRockShare` of
the frame's rock area or the length cap `caveKmPerKm2` × the frame's area in km² is reached; each path's gallery follows
it with a lateral meander of amplitude `meanderM` and wavelength `meanderWaveM` (value noise on `sewer` keyed by the path's
start cell); its floor is `max(WT(v) − 50, h(v) − depthM.max)`, capped at `h(v) − coverM − headroom`, and it carries
`water` where the floor lies at or below the water table WT (§2.6's definition). A confluence under local relief (the
height range within `reliefWindowM`) of at least `hallReliefM` takes a `hall`: an ellipse of area
`min(hallMaxM2, hallBaseM2 + hallPerReliefM2 × relief)` m², axis ratio `hallAxisRatio` along the downstream path, eight
vertices each moved radially by ± `hallJitter` (a draw per vertex); **its floor lies `hallDryCm` (100 cm) above the local
water table** (C4-14), joined to each gallery by a `stair` step (a gallery segment graded at `digMaxGrade`), the cave
stream crossing the hall as a `water` channel along the downstream path. *Volcanic rock:* `1 + ⌊tubeMax × u⌋` tubes
(one uniform, capped at `tubeMax`), started from the highest rock cells at least `tubeSpacingM` apart, following steepest
descent for up to `tubeMaxM` or the cap, floor at `h − tubeDepthCm`, a `breakdown` chamber every `tubeChamberM`.
*Fissures:* `1 + ⌊fissureMax × u⌋` fissures (capped at `fissureMax`), each started from a rock cell of the frame's top decile
of slope (the steepest first, at least `tubeSpacingM` apart), following the steepest line along the fall of the slope for
up to `fissureMaxM`; galleries of width drawn in `fissureWidthCm` and headroom in `fissureHeadroomCm` (a draw per gallery),
each floor at `h − coverM − headroom` capped by `depthM`; one or two `breakdown` chambers of at most `fissureChamberM2`;
never a `hall`. *Openings are candidates, not certainties* (g item 109 (j) (3) (ii)): where a gallery's crown cover falls
below `mouthCoverCm` the gallery is a `mouth` candidate there; a breakdown chamber within `skylightDepthM` of the surface
a `skylight` candidate; a soluble chamber whose cover is under `sinkholeCoverM`, under ground that is no footprint, a
`sinkhole` candidate — each drawn by U-ACCESS (e); a failed mouth candidate ends its gallery sealed by talus. Every
cavern and fissure element within reach of a foundation obstacle takes V4 §3.5.0's foundation rule (C4-110-5).

**3.5.3 Quarries, mine voids and chain mines (J-V4.18; C4-25, C4-16).** *Volume* (II.7.6, J-A65.45): `V = wasteFactor ×
(Σ_stone buildings perimeter × (eaveCm − baseCm) × 60 cm + Σ enceintes length × thicknessCm × heightCm + Σ towers 0.4 π r² h)`.
*Cells:* the frame's cells with `SiteResources.stone ≥ 0.5` within `reachM`, ordered by (inside `R` first, stone value
descending, distance to the centre, cell index), taken until their volume reaches `V`. **The surface quarry** is §4.9's `quarry` land
use without a `source`; a landfall's rubble working — a `quarry` with a `source` (V05 §3.16 (4), BCR-V5-26) — is never the
surface quarry, a stone working or a volume source (SLR1-14; the sky layer is never read, V4 §1.2). **The surface split** (II.7.6's
"left to the hinterland's surface quarry"): a taken cell whose terrain class is `high` — the outcrop at the surface, its
cover under `minCoverM` — contributes its volume to §4.9's surface quarry and is laid nowhere underground; the other taken
cells, at `headroom × (1 − pillarShare)` per unit area, are grouped into **workings** (4-connected components, a component
over `workingMaxHa` split along its OBB's short axis). **A working's floor** is `min_cells(h) − max(minCoverM + headroom,
depthM.min)` in centimetres (C4-25), a cell whose floor would lie deeper than `depthM.max` dropped. *Layout:* each working is
one `workings` chamber, its outline the working's cell union simplified at `minEdge`; the room-and-pillar field inside it
is **drawn, not modelled** — §8.2's `quarry` program lays square pillars of side `√pillarShare × roomM` at pitch `roomM`
along the chamber's OBB axis (J-V4.18); a `shaft` (public, source `system`) opens on the nearest ground point within 30 m
of the working's centre that is no footprint, its `access_point` vertex on the chamber's wall nearest below it; the
workings are joined by `haulage` galleries along a minimum spanning tree over their centroids (Euclidean, Prim's, ties by
index), the nearest working to the town joined to its outcrop by an `adit` gallery ending in a `mouth` where the stone cell
lies outside `R`. *Mine voids:* the same on `SiteResources.ore ≥ 0.5` cells, volume `oreM3PerMine` per mining class
instance, in the same `quarry` part. *Chain mines (item 104 (h) (1), item 105; C4-16):* each ACTIVE supply chain whose
resource node is of kind `subterranean` reuses the nearest mine or quarry working within `reachM`, or makes one — a working
at the hinterland edge on the nearest `SiteResources.ore` or `stone` cell — of volume `oreM3PerMine` × the chain's volume
factor (`chainVolume`: low 0.5, moderate 1, high 2), its surface head the map feature item 104 (h) (1) places; the working
is the chain's resource node for the supply web (item 105). The undercity settles a workings chamber as any chamber
(V4 §3.6): S10 cuts its floor, the drawn pillars yielding to its plots.
*Worked out (ST-23; J-V4.98).* `workedOut(working, scope?)` is a reading, derived at every derivation and never stored: a
mine working is worked out while its mining use is closed or gone; a chain mine while its chain is not ACTIVE; a stone
working — which serves the town's building stone and has no use — is worked out unless it is in the running epoch's
`scope.elements` (laid or extended by this epoch), so at generation, which stands for the town's past, every stone working
is worked out. Readers: the quarry-ossuary candidates (V4 §3.5.1 (1) (e)), volume 6's candidate list (V6 §3.18.2 (1)),
V10. *New workings at an epoch.* `QuarryWorkings.extend(doc, scope, epoch)` (TOWN and above; volume 6's `under.extend`,
after the catacombs' growth) lays, one commit per kind: (1) **stone** — the stone the epoch built, `ΔV = wasteFactor ×`
(the volume law's terms over the stone buildings of `scope.built` and the enceinte stretches and towers the epoch's
fortification step built), taken as new cells in the volume law's order, skipping every cell under an existing working or
the surface quarry's face, with the surface split, grouped into new workings; (2) **mines** — one working of
`oreM3PerMine` per mining-class use whose `opened` epoch is this one, on the ore cells in the same order; (3) **chain
mines** — each ACTIVE chain with a subterranean resource node and no working, as above. Every existing working is kept and
never re-derived. Each new working takes its `workings` chamber, its `shaft` and one `haulage` gallery to the nearest
existing working of its kind by centroid (ties by index; none for the first), its ordinal the system's next unused (so an
epoch renumbers nothing, V4 §2.5), and joins `EpochScope.elements`; its commit runs U-ACCESS (a)'s overlap test and, for a
mine working, the mine breach. Where the cells within `reachM` run out before `ΔV` is met, the rest comes from the surface
quarry, the unmet m³ reported. No draw is made (V4 §3.12).

**3.5.4 Vaults (J-V4.19; g item 110 (b); C4-110-1 – C4-110-4, C4-110-6, C4-110-7).**
* **(a) Bridge vaults:** each deck end of a built bridge — a part-0 `Bridge` deck over water (§2.7), never a raised deck —
  whose `deckCm` stands more than `bridgeRiseCm` over the bank's ground takes one `bridgeVault` chamber under its approach
  way: the way's corridor over `approachM` from the deck end, inset 50 cm, floor `vaultBelowCm` below the street, ceiling 300.
* **(b) Street vaults:** every part-0 way stretch of at least 12 m in `R` whose along-way grade exceeds `vaultSlope` takes a
  `streetVault` under its corridor, inset 50 cm, floor `vaultBelowCm` below the stretch's lowest street point. The grade is
  measured over the way's ramped profile with its stair intervals left out, so a stair where a way crosses a
  `RetainingWall` is no vault source (C4-110-7); a raised ramp is never a street-vault stretch (C4-110-4).
* **(c) Cisterns:** each precinct of growth stage 1 and the castle where `min(dist.water, the plan distance to the nearest
  aqueduct delivery point)` exceeds `cisternDistM` takes a `cistern` under its open court (a yard part of its plot; the
  castle's inner ward or bailey face), a rounded square of the row's area, floor `cisternBelowCm` below, with a `well`
  access in the court above; a cistern record forces one under its precinct (V4 §2.3a). `aqueductDelivery(doc)` is each
  aqueduct's terminal point and every public fountain the base records it feeds (BCR-45). This reads only the base's
  eager aqueduct records, and the base's aqueduct need test reads none of V04's placed cisterns (BCR-45), so the two never
  form a cycle (C4-110-6; J-V4.83).
* II.7.3's surface list binds every vault of (a)–(c) and (e), the cistern's own host admitted (a castle's reservation
  excludes sewer dwellings, not its own cistern; BCR-20). Each street or bridge vault takes a `stair` from the corridor at its
  downhill end, source `system`, `knownTo: 'public'`.
* **(d) Arch vaults — the fourth source** (g item 110 (b): "the spaces between piers stay open or hold the base's vaults";
  J-V4.79 – J-V4.81). The base fixes each span's `use` eagerly (BCR-45); V04 reads it and never decides it.
  `ArchVaults.reconcile(doc, raised, cause)` visits each raised way of `raised` (every one at T2) in address order:
  1. **Lay.** Each span of use `vault` has one chamber — kind `archVault`, key (`arch`, the way's lineage, `a`, `b`),
     `span` its `SpanKey` — found by its key or created: its footprint the span's under-deck rectangle between the two
     raised-way piers' inner faces (the deck's plan outline on ground part 0), inset `archInsetPierCm` (60) at the raised-way piers
     and `archInsetOpenCm` (30) at the two open faces; its floor (`elevationCm`) `levelledGroundCm` at the span's axis
     midpoint (BCR-V5-30), levelled and cut into the uphill side; its ceiling the span's soffit (BCR-45) less that floor. One `door`
     `AccessPoint` (source `system`, `knownTo: 'public'`, cause `{ rule: 'system', system: the vaults system }`,
     `ground.host` the part-0 face at its point) stands at the midpoint of the open face whose `archDoorStripM` (2 m) strip
     beyond holds the most part-0 way or open ground (no footprint, no water), ties by the lower side index; where
     neither face opens onto either, no door is made and `W_ARCH_VAULT_NO_DOOR` is reported (a walled-up arch).
  2. **Condition (SL-31).** Its closure follows its span, re-read at every reconcile: `collapsed` where the span's `state`
     is `ruined` or `cleared`, where its V06 condition reads breached or dismantled (BCR-V6-26), or where a bounding
     support's `state` is `ruined` or `cleared` (file f item 244) — a landfall's ruin included (V05 §3.16 (4)); else none.
     U-FADE never strikes it (C4-110-2).
  3. **Remove.** Every arch vault of the way whose span no longer exists or whose use is `open`, and every arch vault of a
     way no longer in the model, is deleted with its door, its links and its accesses in the same commit, each a fate in
     the dry run (C4-110-3).
  The chambers sit in the `vaults` system's part (created at the first, §2.9), one L1 batch and one L2 `corridorUnion` per
  reconcile. **They are not undercity voids** (C4-110-2): P5, C1, the forced vaults, U-FRONT, F6 and U-FADE's candidates
  exclude them; L3's basement accesses and U-DIG's connector never target one (a cellar reaches it by the street); U-ACCESS
  (b)'s proximity links reach it as any vaults element. §8.2's chamber row reads it as storage (the vault hatch, V4 §5.2).
  An institution stands in one only by declaration: a declared placement naming the chamber (T6 `place` inside its
  footprint, a skeleton `placeAt`) seats the use on one plot equal to the chamber's floor and one single-storey building
  under its ceiling, its entrance at the door, `faces` by the ground the door opens onto (§2.6's rule); V03 plans it as any
  building.
* **(e) The terminal cistern (C4-110-6).** An aqueduct whose terminal kind is `cistern` (BCR-45) takes one `cistern`
  chamber, key (`terminal`, the aqueduct's lineage): under the yard part of its terminal building's plot (V11's
  `conduit_house`, V2 §3.17 (b)) where one stands, else under the public ground (V4 §1.2) nearest the terminal point; a rounded square
  of `terminalCisternM2` (600 m²), floor `cisternBelowCm` below, with a `well` access in the yard or on the public ground
  above (source `system`, cause `{ rule: 'system', system }`). The terminal building's plot's drain need is at least
  `channel` (N8), so the overflow leaves by the sewer where one runs. Where neither a yard nor public ground takes the
  rounded square, it shrinks in 10 % steps down to the precinct cistern's 150 m², else it is skipped and
  `W_TERMINAL_CISTERN_SKIPPED` is reported. The aqueduct's buried stretches (where the terrain stands above its gradient
  line) stay the base's line on ground part 0, never an underground system; they are foundation obstacles (V4 §3.5.0).

**3.5.5 A buried old town (J-V4.20).** II.7.6's rule, with its region the growth-stage-1 districts; its galleries those
districts' way centrelines (the old streets under the new, the regrowth-first town having kept their lines), its
`storey` chambers their buildings' footprints, and — BCR-20 — each square of the region (an L1 `square` face or a `square` block, V4 §1.2)
a `square` chamber: the old market under the new. Floors at `scarBaseCm + scarGainCm × severity` below the present grade;
headrooms and ceilings by the table above; a building's entrance vertices are kept on its storey chamber's wall as
`portal` rows for the exports. The same builder serves `raiseGrade` at an epoch or by hand (II.7.6), over the raised
region's records. **Terraces under a raised grade (TR-11; J-V4.112).** The floors follow the old grade point by point:
`levelledGroundCm` (BCR-V5-30) read on the region's last live state, before the `raiseGrade` batch applies the raise, less
the depth the rule gives. A `RetainingWall` that the same batch tombstones inside the region (cause `convert:raiseGrade`, V6
§3.19.4 (1)) is therefore a step in the buried floor: the galleries and the `storey` and `square` chambers on its high side
keep the high side's datum — the step being the wall's `stepProfile` (volume 1's BCR-43) on that last live state at their
nearest station — and a gallery crossing the wall's line takes two knots at the wall's faces, as N6 places them for a run,
the segment between them a **stair step** (one gallery and one record still, drawn as a stair, V4 §5.2). A `square` chamber
the line crosses is split along it, each side at its own datum (a footprint never crosses a retaining wall). So the buried
town keeps its terraces and its old stairs; with no wall inside the region nothing changes. A buried town is reachable by construction — the raised town's cellars open into its old storeys —
so its excavation reading is always `accessible` (J-V4.62).

**3.5.6 Forced vaults — a required undercity always has a void (II.7.5; C4-03; J-V4.61).** Where
`CircumstanceSlice.undercity = 'require'` and U-FORECAST's P6 finds no counted void with capacity for one neighbourhood,
U-SYS lays a `vaults` complex under the **oldest district** (the lowest `growthStage`, then the largest area, ties by
address), after the ordinary vaults: a grid of `streetVault` chambers of `forcedGridM` (8 m) pitch under that district's
public ground (V4 §1.2; ground part 0, by `pointLocate`), never within reach of a foundation obstacle (V4
§3.5.0) and never counting or joining an arch vault (C4-110-2, C4-110-5), at the vault row's floor `vaultBelowCm`, joined by vault
galleries along the grid, grown breadth-first from the district's largest square of either kind (V4 §1.2; else its centroid's nearest
corridor) until the floor area reaches `max(minHouseholds, H) × m2PerHousehold`, plus one `market` chamber of
`mainChamberM2` at the grid's start. The shallow-element rule binds it; where the ground cannot take it, the complex steps
its floor below `surfaceClearCm` (the surface rule then releases it, J-V4.21) and grows again. So C1's "none formed" cannot
occur under `require` (T-V4-37). Under `forbid`, S7b (7) makes no allocation and U-CITY does not run.

**3.5.7 U-ACCESS — the access pass (T2b; g item 109 (j) (3), (3b), (k) (2), (a) (3), (d); C4-48, C4-51 – C4-54, C4-58).**
After U-SYS and before U-FRONT, in this order; every link and access it makes records its `cause` (BCR-30, BCR-33).
* **(a) Overlap and mine breaches.** *Overlap (C4-51):* for every pair of elements of different parts whose plan bands
  intersect (each part's static index) and whose vertical intervals — floor to floor plus headroom or ceiling — also
  intersect, one link at the intersection's centroid, `via: 'breach'`, cause `overlap`, naming the growing system and
  event. Where one end is a sealed cavern or ruin element its kind is `open` (the owner's rule); for any other pair the kind
  comes from `LinkRule.kinds`, a builders' grille reading `gated`. Neither element moves: the sewer's course and hydraulics
  are never bent. Where the plan bands intersect and the vertical gap is above 0 and at most `overlapShaftM` (6 m), a
  `shaft` link with `overlapShaftChance` (0.1; one uniform keyed by the pair, no epoch component). *Mine breach (C4-53):* a mine working whose
  wall lies within `breachM` (40 m) in 3-D of a cavern gallery joins it by a `heading` gallery in the quarry part along the
  straight 3-D segment (floor graded at most `digMaxGrade`, a `stair` link where steeper), with a `breach` link of kind
  `open`, cause `mineBreach`, at the cavern end; the working's shaft is then the cave's access by transitivity. *The
  village working (TR-12; V07 §3.16 (4); J-V4.113):* at a village rung, where no `quarry` system exists, each mining use's
  outside-plot working — at T2b every one, with a scope those in `scope.workings` — is tested against the `cavern` and
  `ruin` elements whose plan band lies within `breachM` (40 m) of the working's plot ring and whose top lies at most the
  working's `mine.workingDepthM` row (V07: open cast 10 m, shaft 30 m) below `levelledGroundCm` at the plot's centroid; the
  nearest such element of each void system (plan distance, ties by address) takes an `AccessPoint` at the working — kind
  `shaft`, role `access`, source `dig`, `knownTo: 'local'`, state `open`, its `ground.host` the working's plot face and its
  `ground.at` the plot's pole of inaccessibility, its `access_point` vertex on the element's kerb or wall nearest below it —
  cause `{ rule: 'mineBreach', system: <the void's system>, event }` (0 at generation, the epoch's `seq` with a scope), and
  no link record, the working being no system. It is keyed, and so idempotent, by (the working's lineage, the element's
  lineage), and draws nothing; at V07's hand-off up the working becomes a quarry source by V4 §3.5.3 and the access is kept.
  **The same
  overlap test runs wherever a system grows** (g item 109 (j) (3b)): `SewerStrategy.extend`, a catacomb's growth, a new
  quarry, mine or chain working, U-DIG's passages, a lifeline, and an edit that draws or deepens an element — each in its
  own commit, recording its cause.
* **(b) Proximity links (II.7.6 (2)–(4); moved here from U-LINK).** For each pair of parts (a < b) and each element `e` of
  part a — tunnels, galleries, chambers, open or closed — samples every 5 m of its centreline or outline query part b's
  static index for elements within `linkReachM` in plan whose floor lies within `linkDepthM`; per element pair the
  stations are taken greedily along `e`, each at least `linkSpacingM` beyond the last and beyond any link (a) made; at each,
  one uniform on `sewer` keyed by (the two elements' lineages, the station ordinal) against the pair of kinds' chance
  (II.7.6); its kind by the weights, `flooded` only where both floors lie below the water table; its `via` by the floor
  difference — ≤ 100 cm `breach` (`door` where an end is an underground building's wall), ≤ 300 cm `stair`, else `shaft`;
  `knownTo` by II.7.6 (4); cause `proximity`. Its two `link_end` vertices land on each element's kerb or wall at the
  nearest points, one transaction per part (§3.4).
* **(c) Crypt joins (g item 109 (k) (2); C4-49 (5), C4-64 (1)).** A church-class building on ground part 0 (never a sky-layer building, V4 §1.2; its class's crypt column
  `always` or `basement`) with `Basement.crypt` (BCR-V3-20: derived with the basement at S11, so it exists at generation
  without any plan elaborated) whose crypt ring lies over a catacomb element in plan, or within `accessReachM` (5 m) of one, draws once per (church,
  complex) pair: one uniform on `sewer` keyed by the pair (the one mixer over the church's and the complex source's
  lineages, as (b)'s pairs are), no epoch component, so a join first reached by an epoch's growth gives the answer a
  regeneration gives; its chance `cryptJoin.own` (0.7) when the complex's source is the church's own churchyard, else
  `cryptJoin.other` (0.3). A success makes an `AccessPoint` from the crypt, source `crypt`, cause `{ rule: 'crypt',
  system }`: kind `door` where the element's floor lies within `stairDropCm` of the crypt floor, else `cellar_stair`; its
  head stays in the crypt (V03's `AccessHostRow`: catacomb with cause `crypt` → crypt). The join replaces item 64's draw for
  that pair. A building without `Basement.crypt` draws nothing. A church-class building's only way to a catacomb is this
  join: L3 gives it no basement access to a catacomb element, and no catacomb access of source `system` is headed in it
  (V4 §3.5.1 (9); V03 §3.7.2 (6)). Catacomb galleries under a church keep `foundationClearM` below its basement floor; a
  crypt is joined only by this access, never cut.
* **(d) Dig from above (g item 109 (j) (3) (i), (j) (5); C4-52).** Every ground building (on ground part 0; a raised-way
  pier is no building and never a dig host, C4-110-5) whose footprint overlaps in plan
  a cavern or ruin element whose top lies below the building's **dig floor** — its basement floor (`baseCm` less
  `Basement.floors × cellar.depthCm`, §2.6) where it has a basement, else its `baseCm` — or whose basement ring lies within
  `DigRule.planReachM` (5 m) in plan of one, draws once per void kind: one uniform on `sewer` keyed by (the building's
  lineage, `dig`, the void kind), in this stage, no epoch component (the building's lineage already carries the epoch
  that built it, §6.3). `p = min(cap, classRow(class) × basementFactor × depthFactor(d))`, `cap` 0.6, `classRow` by the
  building's class (V11 fills every class by its family), `basementFactor` 1.5 with a basement and 1 without,
  `depthFactor(d)` 1 for `d ≤ reachM` (6 m), `exp(−(d − reachM) ÷ decayM)` beyond (`decayM` 2 m) and 0 beyond `maxM`
  (20 m), `d` the vertical distance from the dig floor to the element's top. A success makes an `AccessPoint` to the
  shallowest such element under the footprint, source `dig`, cause `{ rule: 'dig', system, event }`: a `cellar_stair`
  where the building has a basement and the drop lies within `stairDropCm`, else a `shaft`, and a `well` where the plot's
  well pin stands over the element; its head in the basement (V03's access head). The draw is evaluated at every
  derivation, but its value is fixed by its key: an access once made persists (removed only by §3.10's host closures), and
  one not yet made appears when the building's chance later rises above its draw (a basement added, a deeper void
  reached) — so more buildings, deeper cellars and more digging raise the chance of access as the settlement grows, and a
  building never draws twice for one kind. Item 109 (d)'s "chance raised over a ruin" is this row.
* **(e) Public openings (g item 109 (j) (3) (ii); C4-48 (3)).** Each candidate V4 §3.5.2 and §3.5.0a name — a `sinkhole`,
  a `mouth`, a `skylight`, a `collapsed_shaft` over a quarry, mine or ruin chamber under a square, a square or green block (V4 §1.2) or a field
  face with cover ≤ 15 m, a `ruin_entrance` at the ruin's marker — draws its `OpeningRow.chance`: one uniform on `sewer`
  keyed by (the candidate element's lineage, the opening kind), no epoch component (fixed by its key, never re-drawn). A success makes an `AccessPoint` of that kind (BCR-29), source
  `opening`, role `access` (a `skylight` is a `mouth` of role `light`; SLR1-20), cause `{ rule: 'opening', system }`,
  `knownTo: 'public'` (a `ruin_entrance` `local` unless the dossier says the ruin is known).
* **(f) Reuse (g item 109 (d); C4-54 (2)).** An element of one part adopted by another system keeps its place, part and
  kind and takes `reusedBy: { system, since }` (BCR-33), with one link of cause `reuse`, `via: 'breach'`, at the adopting
  system's nearest element; the adopting system counts its area in its extent and draws it with its own program as an
  overlay, so nothing is laid twice. The sewer adopts an ancient drain after the fact: a ruin main street carrying its
  drain takes `reusedBy` the sewer where a laid run's centreline lies within `reuseM` (3 m) of it for at least 30 m, its
  floor falls in the run's flow direction at ≥ `minGradient`, and its crown depth is at most `coverMaxCm` — the run keeps
  its own record and course, so the rule never works against hydraulics. A catacomb's tomb reuse and the quarry ossuary's
  adoption are made by U-SYS and recorded the same way. A well pin whose shaft — to the water table plus 100 cm — passes
  through a ruin or cavern chamber is always an access: kind `well`, source `dig`, cause `dig` — at every rung, V07's
  village `well` and `pump` pins being this same pin record (V07 §3.16 (3) (ii); C4-65 (5)). A buried chamber within
  `linkReachM` above a ruin chamber takes a `stair` link at the `any–buried` chance.
* **(g) The excavation reading (g item 109 (j) (2)–(4); C4-48 (2); J-V4.53).** `excavation(cluster)` is `'accessible'` or
  `'unexcavated'` for every cluster (a connected component of a part's open galleries and chambers, joined at junctions
  and chamber walls) of a `cavern` or `ruin` part. The connection graph's nodes are the clusters of every part and the
  surface; its edges are links of kind `open`, `gated` or `secret` and access points in state `open` or `locked`. A cluster
  is `accessible` when the graph joins it to the surface — transitively, so opening one void can open those beyond it. A
  part of any other kind is always `accessible`: the sewer, catacombs, quarries, vaults and dug passages were dug from the
  surface, and the buried town is entered from the cellars above (J-V4.62). It is derived, never stored: a union-find over
  clusters, recomputed after every commit that touches an access, a link, an element's closure or a building over a void,
  for the clusters that commit touches, and cached by the underground's digest. V12's `undergroundInputOf` reads it as
  `state: 'unexcavated'`.
**Determinism (C4-58).** Item 64's basement draw stays in U-LINK (T5); the dig draws are U-ACCESS's; the two stages' stream
keys differ by their stage id (§6.1), and within U-ACCESS each (building, void kind) has its own salt, so no draw's value
depends on another rule's presence. Every key is listed in V4 §3.12.
**With a scope (ST-50).** `AccessPass.run(doc, scope?: EpochScope)`: without a scope (T2b) it runs (a)–(g) over the whole
document; with volume 6's scope (`under.access`, `afterGrowth` 20) it runs (a), (b) and (f) over `scope.elements` and (a)'s village-working test over `scope.workings` (TR-12), (c) for
the pairs whose catacomb element is in `scope.elements`, (d) for the buildings of `scope.built` and `scope.basementGrown`,
(e) for the candidates among `scope.elements` and under the faces of `scope.surfaceChanged`, then (g). Every step is
idempotent — a link or access found by its creation key is kept, never made twice — so running it after
`under.extend`'s own overlap tests adds nothing twice, and each made access or link records `event` = the epoch's `seq`.
Its last step is volume 1's opening pass over the public openings (e) made (V4 §3.10; SLR1-04).

### 3.6 U-CITY — the undercity (II.7.5's rules, as steps)

Existence, the size law, the allocation, the shadow rules, the outskirts and the light are II.7.5's. The layout constants
are a new record, `UnderLayoutRule` (`tables/under/layout.json`, V4 §2.3; our own).
1. **C0 — existence (C4-20, C4-03).** U-CITY re-reads U-FORECAST's P6 verdict `{ exists, n, H }` and never re-draws; the
   four requirements are checked on the built voids. Under `require` at least one neighbourhood forms (V4 §3.5.6 lays
   its void where none is counted), and the first neighbourhood takes the `Underground city` record's assignment: its
   `District.identity.dossier` is the record's binding key and its name the record's name, a protected dossier name,
   never a naming-slice draw. Under `forbid` U-CITY does not run.
2. **C1 — the voids, read-only first (C4-11, C4-14, C4-48, C4-54).** For each built system part whose kind the preset
   admits (`UndercityRule.presets`; the `historical` preset admits `ruin`, BCR-42), its **clusters** are the connected
   components of its open galleries and chambers (joined at junctions and chamber walls), the arch vaults and the terminal
   cistern excepted — they stand at grade or under a conduit house and no undercity takes them (C4-110-2). A cavern or ruin cluster is a
   candidate only while its excavation reading is `accessible` (V4 §3.5.7 (g); the undercity never excavates a sealed
   void, J-V4.54). A cluster's capacity is its floor area — chambers plus the bands of galleries that carry no `water`
   (a `water` gallery counts 0, is never a walkway, and still joins clusters and serves as a water lifeline) — ÷
   `m2PerHousehold`. Before any commit, each candidate passes a **read-only lifeline test**: L1's candidate search for
   access, air and water (V4 §3.7 L1) and C2's carve feasibility, run against the parts as they stand after U-ACCESS; a
   cluster that fails is not a candidate, so no neighbourhood is ever dropped after it is committed. Candidates are ranked
   by `capacity × RuinRule.sourceWeight[kind]`; where a ruin and another kind both qualify, the first pick is one draw on
   `sewer` keyed by (the settlement, `undercityRank`) weighted by those products (so V12's `ruinChosen` share is
   `w_ruin ÷ Σ w`), the rest in descending product, ties by lowest address; one neighbourhood each, while fewer than `n` are
   formed and the cluster holds at least `minHouseholds`; where fewer clusters qualify than `n` and the largest holds at
   least `2 × householdsPerNeighbourhood`, it is split in two by its chamber graph — seeds the two chambers farthest apart
   by graph distance, every node to the nearer seed, ties by address (J-V4.24; deterministic, no draw). `H` is shared
   among the neighbourhoods in proportion to capacity, each capped at its own. **None formed** (never under `require`):
   no undercity; its households go to the underground pseudo-district's free capacity — its sewer-front plots, then F6's
   void dwellings (SLR1-19) — and only the remainder to T8 (V4 §3.7a), reported (F-VOID). Under `require`, where the one counted void the forecast relied on proves
   sealed, the required neighbourhood takes it with a lifeline stair of cause `dossier` (the dossier outranks the chance;
   C4-48 (8)).
3. **C2 — the main chamber (J-V4.22; C4-13).** The core (`District.core`, BCR-4) is, in order: a ruin `court`, `temple`
   or `hall` chamber of at least `mainChamberM2` (an ancient forum is the first plaza candidate, g item 109 (e)); else the
   cluster's largest chamber of at least `mainChamberM2`; else one is **carved** by U-CITY's carve post-pass on the host
   part: from the cluster node nearest its area centroid (ties by address) a 16-gon of radius
   `√(mainChamberM2 ÷ π) + carveMarginM` is inserted as a `chamber_wall` chain of kind `market`, its floor the seed's, its
   ceiling by V4 §3.5.0's table. A ruin chamber holding a monument is a core candidate where its floor less the monument's
   tier-0 ring and mound reaches `mainChamberM2`; the monument then stands inside the plaza disc, which the ring's stall pins
   and walkways keep clear of (an undercity market round an ancient pyramid; C4-110-8). The carve lays nothing within reach of a
   foundation obstacle (V4 §3.5.0; C4-110-5). Each host gallery crossing the 16-gon is split at the wall by §6.3's SPLIT rule; its
   inside parts take `existence: 'cleared'`, cause `rule:undercity-carve`, and are kept, never deleted (in a catacomb its
   grid of galleries — the undercity hollowed its own square). A New random on the host system re-runs the carve for every
   neighbourhood whose core it held, in the same transaction set; a New random on the neighbourhood `resurrect`s the
   cleared parts (§2.8) and re-carves. The carve's feasibility — its admitted area, inside the part's depth band and clear
   of every other cluster's elements, reaching `carveMinShare` of `mainChamberM2` — is part of C1's read-only test.
4. **C3 — streets (J-V4.23; C4-39).** The core's plaza is the disc of radius `√(plazaShare × area ÷ π)` about its
   centroid, ringed by a closed walkway (a `Gallery` with `walkway`, width `walkwayCm`, wall 0): plots front the ring's
   outer kerb and the disc inside it stays open. In every chamber of at least `walkwayMinChamberM2`, the openings — the
   vertices where galleries meet its wall, and its access points — and one hub (the ring's nearest point for the core, the
   centroid otherwise) are joined by a minimum spanning tree (Prim's, ties by index) whose edges are shortest paths inside
   the chamber polygon (a visibility graph on its vertices, ties by index; a monument's standing rings and mound, a
   foundation pillar and each column point grown to 60 cm are holes in the polygon), each edge a walkway. Every gallery of the
   cluster that joins two chambers of the neighbourhood and carries no `water` takes `walkway` (II.7.5's adopted
   streets). One L1 batch inserts them; one L2 `corridorUnion` batch bands them.
5. **C4 — plots and buildings.** S10 on the neighbourhood's blocks with frontages on walkway and gallery kerbs and on
   chamber walls (II.7.5); the surface test of V4 §3.5.0's shallow-element rule applied through F-UNDER's samples where the
   ceiling lies within the host row's `surfaceClearCm` of the ground, those blocks recording their ground cells as F3
   does; no plot on a floor at or below the water table (a cavern hall's floor lies `hallDryCm` above it, V4 §3.5.2);
   no plot on a monument's standing tiers or mound or on a foundation pillar (obstacles cut out of the floor), while a plot
   may hold column points, which V03 §3.12 (6) plans round. Every entrance S11 derives here takes `Entrance.faces:
   'tunnel'` (BCR-V3-21; C4-64 (4)).
   S10b places the neighbourhood's share of the allocation, its relation families measured by `underDistance`
   (V4 §3.6a), the black market as a hard `near: core` row fronting the ring — bound to a `Black market bazaar` record
   where the dossier holds one (V4 §2.3a); ladder members, SIZE steps and clandestine modes as F4 states (C4-34, C4-35);
   no crypt is ever seated below (V4 §3.5.1 (11)). S11 with `UndercityRule.arrangements`, heights ceiling-capped (II.7.5);
   the ring's stall pins by §4.7's market pins at the secondary-market scale.
6. **C5 — the district.** `District { kind: 'undercity', parent, core, faces }` with II.7.5 (2)'s parent rule, computed as
   the first entry of volume 1's `districtsAbove(part, core)` (V1-3.16; SLR1-07); its prosperity field as II.7.5 states (the parent's field with its daylight term, J-V4.51);
   `outskirts` is written by U-LINK L6 (BCR-4).
7. **C6 — lights.** V4 §3.9's undercity rows.

### 3.6a The cross-arena distance (items 103, 105, 107; II.7.5 (3); C4-15; J-V4.66)

1. **`underDistance(member, target)`** for a member on an underground part is the shortest path over the member's part's
   open walkways, galleries, chamber floors and tunnels — and on through open links into other parts — to an open access
   point or lifeline whose `knownTo` the member's use admits (a public use: `public` and `local` accesses; a clandestine
   use: its own `knownTo` and wider), plus the ground's `street`-mode distance (§4.7's solver) from that access's
   `ground.at` to the target; a target that is itself underground takes the underground path where it is shorter. It is
   II.7.5 (3)'s "along its walkways to its nearest lifeline and on from the lifeline's ground point", built.
2. The relation families SUPPLY, CLIENTELE and COMPETITION, item 105's links (each consumer bound to its nearest provider)
   and item 107's comfort distance read `underDistance` for underground members.
3. EMITS and SENSITIVE-TO act within an arena only — rock absorbs smell, smoke and noise — except water pollution, which
   reaches the ground at the network's outfalls (a sewer-front tannery's counts at its run's outfall), and disorder, which
   reaches the parent district.
4. ALIGNMENT reads plan distance, so a guild seat under the garrison still repels (item 103 (b)'s example).
5. Coverage (item 103): each undercity neighbourhood and the underground pseudo-district (the sewer-front neighbourhoods
   and F6's void dwellings; SLR1-19) is a catchment of its own for the
   everyday-service classes whose V11 row admits the arena.
6. The siting statistics of item 103 (e) run on underground members against a random-placement baseline (T-V4-60).

### 3.7 U-LINK — the connection stage (II.7.6's rules, as steps)

1. **L1 — lifelines, realised (II.7.5 (4); J-V4.25; C4-11).** For each undercity neighbourhood, in address order, L1
   makes what C1's read-only test found: *access* — the cluster is accessible by construction; where its nearest access
   is another part's element, L1 writes that **lifeline link** itself (kind `open`, or `secret` by `lifelineSecretShare`,
   a draw on `sewer` keyed by the district; its `via` by U-ACCESS (b)'s floor rule; cause `lifeline`), and where a basement
   access is the cheapest access L1 creates it with source `lifeline`, cause `lifeline`, and L3 skips that building; else
   the shallowest element's ground point above, on ground part 0 — public ground or a yard (V4 §1.2), or outside ground (a point under a
   raised deck on the way beneath, never inside a raised-way pier's footprint) — within `lifelineReachM`: a
   `stair` where the drop is at most `stairMaxDepthCm`, else a `shaft`, source `lifeline`, `knownTo` `secret` by the same
   draw else `local`; *air* — a `grating` of role `air` on public ground (V4 §1.2) above a walkway or chamber, else a well pin's
   point, else a ruin decoration's, else a `shaft` through a building whose footprint lies over the cluster (its chimney),
   one per neighbourhood and one more per `airPerM2` of floor; *water* — a `water` gallery or a cistern of the cluster or
   one linked to it within `linkReachM` (U-ACCESS's links exist by now), else a well pin within 30 m of the cluster in plan
   (a `well` access), else a river-bank `mouth` of a cavern of the cluster; *a route outside* — satisfied when the graph
   reaches a `mouth` or an outfall, never required. A realisation that cannot place a vertex the test found runs U-DIG's
   lifeline closure from the district ring, its pieces keyed by (the district's lineage, the piece ordinal) (C4-06), its
   target never an unexcavated cluster. No neighbourhood is dropped here.
2. **L2 — links between parts** are U-ACCESS (b)'s (V4 §3.5.7), run before the undercity.
3. **L3 — basement accesses (item 64).** II.7.3's *Basement accesses* (1)–(5), building by building on ground part 0 (never a sky-layer building, V4 §1.2) in address order,
   cause `{ rule: 'basement' }`, for every target but a cavern or ruin element (U-ACCESS (d)'s dig draw decides those), a
   catacomb element from a church-class building (U-ACCESS (c)'s join is its only way to a catacomb; C4-64 (3)) and an
   arch vault (at grade, reached by the street; C4-110-2), skipping a building L1 gave a
   lifeline access. It runs here, after U-FRONT and U-CITY, because its targets include sewer dwellings' and undercity
   buildings' walls and undercity walkways (II.7.3 (1)).
4. **L4 — lifeline closures** run inside L1 (above).
5. **L5 — subterranean dossier institutions (BCR-14; C4-05, C4-06, C4-07).** An institution with `facets.subterranean`
   that S10b placed on a surface plot (no underground allocation could take it) has a basement — S10b's hard row admits
   only plots whose terrain gate allows one, and S11 forces it by the requested-mode ladder (BCR-43) — and takes the first
   rung that succeeds: (1) a basement access to the nearest element within `accessReachM`; (2) U-DIG's connector to an
   element within `digReachM`; (3) U-DIG's minimal `dug` system to an outlet; (4) always: a `cellar` chamber of the `dug`
   system directly beneath its basement (floor at the `dug` row's upper depth, `cellar` 6 m², `knownTo` the institution's,
   no connector), reached by a `hatch` — where the water table lies above that floor the chamber is created `flooded` and
   `W_SUBTERRANEAN_WET` reported, and the fact still has its underground. An `Underground network` record takes the **dug
   network** instead (V4 §2.3a): from its building the passage to the `beyondWalls` outlet first, then up to
   `networkCellars` cellars of uses in its district by dug passages, one `storage` chamber, all `knownTo: 'secret'`, its
   `forbiddenResources` infinite in U-DIG's cost. Every L5 piece is keyed by (the institution's binding key, the piece
   ordinal) on `sewer` (C4-06), source `system` with the building among the dug system's `sources`, cause `dossier`, held
   while the institution is live (V4 §4.4); the rung used is reported (T-V4-34).
6. **L6 — outskirts.** From each link endpoint on part 0 that joins a neighbourhood's cluster, a walk along open part-0
   runs up to `outskirtsReachM`; the U-FRONT blocks whose frontage runs it reaches are `District.outskirts` (II.7.5). L6
   re-runs after any part-0 edit within `outskirtsReachM` of a lifeline link (V4 §2.6).
7. **L7 — close.** `Features.underground` recomputed (II.7.4).

### 3.7a T8 — U-RECONCILE, the tail's only writer of ground uses and households (C4-02; J-V4.59)

The last eager tail stage. Its inputs are what the tail could not seat below after absorption (V4 §3.4 F0, §3.6 C1, F6):
surplus households, and institutions no underground plot took (an `underground`-mode concealed use; an
`undercity: 'preferred'` or `underground: 'preferred'` class). *Households* go by S10b's reconcile (§4.7) to the ground's
vacant residential buildings of the poorest band — first in the parent district of the neighbourhood they were meant for,
else the district above their run, else the town's poorest district — then to occupied poorest-band buildings up to each
building's capacity (§4.7's generation fill), in address order; a remainder (practically nil after `forecastSafety` and the
absorption) is reported in `requestedVsBuilt` and still counted in the population. *Institutions* take item 63's chain
(§4.7 *Concealed institutions* (2): `underground` → `front` → `hidden`) or their class row's ground placement, each by
S10b's reconcile on a vacant ground plot. T8 writes uses and household counts only: no plot, face, footprint or building is
created, moved or removed, so the ground arena's geometry and digests stay those of the first paint and T12-1's "0 writes
on the ground `PlatKey`" holds for the underground stage. Besides T8, the tail writes ground records only in T6's S13a step — volume 1's opening
places, records and labels, never geometry (V4 §3.1; SL-06). The ground's model digest is finalised after T8. Every T8 write
is reported; T-V4-3 bars its rate (at most 2 % of CITY seeds at the default presets).

### 3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as algorithms)

The pieces and their order are II.7.6's; the closure mechanics are §7.3 item 9's. Added here:
* **Target search.** Each part's static index is queried for elements within `accessReachM` of the basement ring (a
  direct access, no connector), then within `digReachM`, in II.7.6's order; ties by plan distance, then address. An arch
  vault is never a target (C4-110-2); from a church-class building a catacomb element is a target only as a hand crypt
  join (V4 §4.1).
* **The connector (J-V4.27).** A local grid of `digGridCm` cells over the bounding box of the basement ring and the
  target point grown by 20 m (at most 400 × 400 cells; larger is a refusal naming the bound). Step cost = step length ×
  `rockCost` of the terrain class under the cell (`damp` and `flood` infinite); infinite within `foundationClearM` of every
  other building's footprint and basement ring (the ground, read), within reach of every foundation obstacle (V4 §3.5.0:
  raised-way piers, retaining-wall footings, buried aqueduct stretches; C4-110-5) and of every dug passage's band, under a water face, and
  where the water table lies above the passage floor. A\* with the octile heuristic × the least cost, ties by
  (f, g, cell index). The path's cell centres are simplified (Visvalingam at `minEdge`) and snapped. Its floor falls
  linearly from the basement floor to the target's floor, clamped to the `dug` row's depth range, above the water table by
  30 cm and below the network's `coverCm` (II.7.2); a remaining drop beyond `digMaxGrade` is taken by the end link's
  `stair` (`via`). A route longer than `2 × digReachM` is a refusal with the reason (II.7.6).
* **The minimal system.** Where nothing lies within `digReachM`, the outlet row's first kind with a candidate within
  `2 × digReachM` — another cellar of the same `Use.owner`, a void, the nearest river or canal bank, the shore, the
  nearest point beyond the outermost enceinte's outer strip — ends the passage: a `mouth` on outside ground, or a `door`
  into the other cellar.
* **Keys at generation and at an edit (C4-06).** An edit's pieces are keyed by the event's `seq` (§7.3 item 9 (b)); a
  lifeline's pieces at generation by (the district's lineage, the piece ordinal); L5's by (the institution's binding key,
  the piece ordinal); each on `sewer` with the same key. Generated pieces re-derive with their owner (the neighbourhood's
  New random; the institution's relocation); edit-made pieces are held (§7.3 item 9 (c)); a `regenerate` on the `dug`
  system re-derives only its generated pieces, its dry run listing the held ones as kept (BCR-24).
* **Voids and bans (SR3-11).** The target search never picks an element of an `unexcavated` cluster unless the edit names
  it, or the access is BCR-V9-22's grouped access (base §7.3 item 9 (d) as file f item 372 applies it): an
  `addUndergroundAccess { building }` with no `target`, grouped before a dwelling declaration on an `unexcavated` cluster
  (V9 §4.17.4's forms), targets that cluster's element nearest in plan to the building's footprint (ties by address).
  Either is the user's excavation (cause `edit`), its dry run listing the clusters it opens, and the declaration's closure
  then finds the cluster reachable and adds no access. The grouped access keeps every other piece of its own closure (the
  basement by §2.6's requested-mode ladder, the connector where the target lies beyond `accessReachM` of the basement ring,
  the plan reservation); the rule holds for a building the dwelling closure's first rung qualifies (below; the base's "one
  of those buildings"), and an untargeted access from any other building takes the ordinary search, the declaration's
  closure then making its own way in. A record's `forbiddenResources` make `damp` and `flood` cells infinite in the
  connector's cost.
* **The dwelling closure's way in (base §7.3 item 9 (d) as file f item 372 applies BCR-V9-22; V9 §4.17.4; SR3-11;
  J-V4.119).** A dwelling declaration on an `unexcavated` cluster — a `quarter` or `drawBoundary` on a void part, a
  `placeAt` of a dwelling class on a void plot, a clerk's proposal of either — is a closure, and its first rung calls
  U-DIG. The buildings **above the cluster** are the ground buildings (ground part 0; never a raised-way pier, C4-110-5)
  that §3.5.7 (d)'s geometry admits over one of its elements — a footprint overlapping the element in plan, or a basement
  ring within `DigRule.planReachM` of it — each measured to the cluster's element nearest in plan to its footprint (ties by
  address); one **qualifies** when its dig floor (§3.5.7 (d)) lies within `DigRule.maxM` above that element's top. They are
  ordered by that plan distance, then address, and the first digs: its target that element (a `reused` piece of the
  closure record); its pieces U-DIG's connector, only where the element lies beyond `accessReachM` of the basement ring
  (or, without a basement, of the footprint), the access and the plan reservation — no basement piece, the rung taking the
  building as it stands so that its dig floor stays the one it qualified by, and no minimal system; the access of §3.5.7
  (d)'s kinds (a `cellar_stair` where the building has a basement and the drop lies within `stairDropCm`, else a `shaft`,
  a `well` where the plot's well pin stands over the element), its head by V03's access head as (d)'s, source `dig`,
  cause `{ rule: 'edit', system: the cluster's system, event: the declaration's seq }`, with `bend.under.accessDug`. A
  building whose connector U-DIG refuses (the `2 × digReachM` bound above, or no finite path) is passed over for the next,
  listed in the dry run with its reason, and the rung fails only when none remains. The dry run lists in
  `PreviewResult.alternatives` the qualifying buildings after the one that dug, in the same order, at most three (the
  base's), without digging them in the dry run; a re-preview of the grouped access from one whose connector U-DIG then
  refuses is refused with its reason (§7.3 item 9 (e)). The base's second and third rungs — a public opening at the
  nearest of §3.5.7 (e)'s candidates with its chance waived, else a `collapsed_shaft` at the base's point of public ground
  over the cluster — are made by U-ACCESS (e)'s opening maker as `placeAccess`'s public-opening form makes them (V4 §4.1):
  source `opening`, role `access`, cause `{ rule: 'edit', system, event }`, `knownTo` by (e)'s rule, volume 1's opening
  pass in the same commit (V4 §3.10); the fourth, the bend onto ground part 0, is the base's and adds no underground piece.
  The pieces are keyed as an edit's (above) by the declaration's `seq`, recorded in its closure record, held while it is
  live and removed by its undo (§7.3 item 9 (c)); the excavation reading opens the cluster in the same commit, and the
  declaration's own pieces follow in the same event (§7.3 item 9 (a)'s order). In a skeleton prefix the closure runs where
  U-CITY C0 reads the declaration on a cluster still `unexcavated` after T2b (V4 §4.7), a grouped access before it in the
  prefix running there first rather than among T5's closures (J-V4.120).
* **The edit-triggered lifeline closure (§7.3 item 9 (d); C4-42).** After the dry run of a `drawBoundary` or `split` on an
  undercity district, C1's read-only lifeline test runs for each resulting district; one that fails calls the lifeline
  generators from its ring, keyed by its lineage and the event's `seq`, the pieces shown as fates on the tools T5 and T9.

### 3.9 Light underground — the rows (item 68 (d′); J-V4.33; C4-28, C4-60)

The model is §8.4's (no global light; ambient `ambient.underground`; shafts; the hand lantern). The rows, arena
`underground` (§4.7's `LightRule`; `extension`; our own values), placed by the engine that makes the host. `magic` is the
row's admitted circumstance values (BCR-39 lets it include `'none'`); a row with no `magic` field lights under every value.

| system | host | kind, source | height cm | cd | radius cm | size cm | count or spacing | magic |
|---|---|---|---|---|---|---|---|---|
| sewer, void dwellings (F6) | `door` | the band's fuel, fire (below) | 170 | 6 | 500 | 3 | one per entrance | — |
| sewer | `tunnel` (a junction) | torch, fire | 220 | 15 | 800 | 5 | one per junction of a lived run; its host the arm of the lowest address (C4-30 (b)) | — |
| sewer | `accessPoint` | torch, fire | 220 | 12 | 700 | 5 | one per access of a lived run | — |
| undercity | `door` | the band's fuel, fire | 180 | 10 | 700 | 5 | one per entrance | — |
| undercity | `door` (tavern, fence, guild seat, shrine, pit, healer) | lantern, fire | 250 | 25 | 1 000 | 8 | one per main entrance | — |
| undercity | `gallery` (a walkway) | torch, fire | 230 | 15 | 900 | 5 | spacing solved by §4.7 (2) for `minLux` poor 0.5, modest 0.8, prosperous 1.2 lx | `none`, `low` |
| undercity | `gallery` (a walkway) | magical orb, magic | min(500, ceiling − 30) | 30 | 1 200 | 30 | the torch row's spacing × 1.5 | `high` |
| undercity | `chamber` `market` | brazier, fire | 100 | 60 | 1 400 | 25 | ⌈area ÷ 150 m²⌉ on the ring's inner kerb, evenly by arc length | — |
| undercity | `chamber` other, ≥ 400 m² | fire pit, fire | 30 | 40 | 1 200 | 25 | ⌈area ÷ 400 m²⌉ at the chamber's hubs | — |
| catacomb | `chamber` `ossuary` | shrine lamp, fire | 120 | 3 | 400 | 5 | one per ossuary chamber | — |
| catacomb | `accessPoint` (its entrance) | shrine lamp, fire | 120 | 3 | 400 | 5 | one | — |
| cavern | `gallery` | glow fungus, magic | 20 | 0.5 | 300 | 30 | every 15 m, where the magic circumstance is `low` or `high` or the biome is in the row's list (`temperate_forest`, `wetland`, `jungle`; V11 reviews) | `none`, `low`, `high` with the biome clause |
| ruin | `chamber` `hall`, `temple` | ancient glow, magic | ceiling − 30 | 8 | 900 | 20 | ⌈area ÷ 300 m²⌉, each chamber with `magicLightChance` (0.5; a draw on `sewer` keyed by the chamber) | `low`, `high` |
| ruin | `accessPoint` | torch, fire | 220 | 12 | 700 | 5 | one per access of a lived cluster | — |
| quarry, vaults, buried | `accessPoint` | torch, fire | 220 | 12 | 700 | 5 | one per access of a lived system, an arch vault's door excepted | — |

**Fuel (item 68 (d′) (1)).** A `door` row's "the band's fuel" resolves by the plot's band and the era row: poor a
rushlight (6 cd, size 3), modest a tallow lamp (8 cd, size 4), prosperous and above an oil lamp (10 cd, size 5); an era row
may replace them (V11's era rows). A run, system or cluster is **lived** when it carries plots — F6's scattered dwellings
included — or lies within `litReachM` (60 m, `UnderLayoutRule`) of one; an unlived network or system is dark but for its
shafts, and an unexcavated cluster carries no light at all. Every underground light's height is capped at its host's
ceiling − 30 cm. Door sides are drawn on `pin.light` as on the ground (§4.7 (4)). **Arch vaults** carry no light row: each
is daylit through its door, which the light pass treats as §8.4 (b)'s shaft with the `archDoor` opening row (V4 §2.3); a
declared institution in one takes the sewer `door` row's lamp by its band's fuel (C4-110-10).

### 3.10 U-FADE and the underground at an epoch (item 11; J-V4.28 – J-V4.30)

The evolution engine owns the epoch; these are the underground's parts it calls (BCR-6), usable by hand now. V06 schedules
them over epochs (the links' re-binding, excavation, ruin decay, catacomb growth). **Their callers (ST-50)** are volume 6's
four participants (V6 §3.2; V4 §1b.2): `under.fade` at `decline` (order 10) runs `UndergroundFade`; `under.extend` at
`afterGrowth` (order 10) runs `Foundations.apply` over the epoch's scope (V6 §3.18.1 (6); TR-07), then the arch-vault
reconcile, then `SewerStrategy.derive` the first epoch `Features.sewers` turns on (else `.extend` with its wall drops), then
`CatacombGrowth.grow` with its `opts`, then `QuarryWorkings.extend`; `under.access` (order 20) runs
`AccessPass.run(doc, scope)`; `under.undercity` (order 30) runs `UndercityEpoch.reread`, then F6, its new dwellings filled
by volume 6's relocation (below; TR-08). On the grow-by-stage path V04's own M4 hooks call the same functions without volume 6's scope and `opts`.
* **`UndergroundFade.candidates(doc, epoch)`** — every tunnel, gallery and chamber neither locked nor pinned — an arch
  vault excepted, whose condition follows its span (V4 §3.5.4 (d); C4-110-2) — in use,
  neglected or partly caved in, whose dwell band has run (§4.11: tunnels two bands slower than a building, from its last
  condition change), with weight `w = E_u · rate(underground) · u · neglect`: `E_u` the mean of §4.11's exposure field over
  the ground points above the element every `sampleM` (II.6: "the exposure of the ground it runs under"); `rate` the
  `underground` persistence row (0.03); `u` the underground lottery's draw on `epoch.transform` keyed by (the element's lineage, the
  epoch); `neglect = 1 + neglectGain × (1 − usage)`, `usage` ∈ [0, 1] the share of a run's served and fronting plots that
  are occupied, of a lived system's plots that are occupied, 1 for a catacomb whose burial face is open (a stagnant one
  included) and 0 for one whose face is closed, 1 for a vault whose way is live, a ruin cluster's its dwellings'
  occupancy (0 while unexcavated; C4-61), 0 for an unlived cavern or quarry. A ruin element's weight is further ×
  `RuinRule.fadeFactor` (its fade rows, V4 §2.3).
* **`UndergroundFade.apply(element, epoch)`** — the op drawn on `epoch.transform` from `UndergroundFadeRule.ops` at the
  element's class and condition, a seal's weight × `(1 + orderGain × (1 − disorder))`; a run longer than 120 m is struck on
  a 120 m stretch centred at its most exposed sample (II.6's stretch split), so cave-ins are local. A catacomb gallery that
  silts, caves in or is sealed stays in its complex's extent and in `extentFloorM2` (g item 109 (k) (4)).
* **Its own lottery (ST-17; J-V4.103).** The underground's strikes are drawn by this lottery at the evolution engine's
  `decline` step, after the fabric pool (volume 6's `under.fade`), at the underground's rate: never in the fabric pool,
  never counted against a district's `fabric` cap and never in the pool's persistence order (BCR-6; V6 §3.5.2). A lived
  void whose last access it seals is vacated in the same batch (V6 §3.18.1 (4)).
* **`Foundations.apply(doc, scope, cause)`** (`under.extend`, its first act; TR-07; J-V4.109) — V4 §3.5.0's rule over the
  epoch's new footings (V4 §3.5.0, *At an epoch*), at every rung; it returns `FoundationsResult` (V4 §2.4): the collapsed
  elements, the pillars and the void households vacated on collapsed floors, which volume 6 re-homes inside the participant
  (V6 §3.18.1 (4), (6)); a catacomb node a new footing refuses records `blockedBy: 'foundation'` at the next growth.
* **`SewerStrategy.derive` at the first sewers epoch (ST-50).** The first epoch whose prelude turns `Features.sewers` on
  (V6 §3.2, *The feature set at an epoch*), `under.extend` runs U-NET whole (N0–N12) over the current ways as the epoch's
  mutation instead of `extend`: part 0 is laid on the sewer's empty part; N3a's declarations are honoured; every existing
  entity — another system's elements, the accesses, the links, the ground — is kept and never re-derived; N8 connects the
  plots of `R`; the new runs join `EpochScope.elements`, and U-ACCESS (a)'s overlap test runs over them in the same commit
  (a run crossing a sealed void opens it, cause `overlap`, `event` the epoch's `seq`). Volume 6 reports it
  (`under.featureOn`). Sewer-front dwellings follow through the crowding hook (below).
* **`SewerStrategy.extend(doc, epoch)`** — `under.extend` at every later epoch; on the grow-by-stage path, after the new
  stage's S11: N1–N6 over the current ways with
  N3a's declarations, every node under an open existing run a root of cost 0 beside the outfalls, existing runs never
  re-derived; a tree path over an edge under a closed run `reopen`s that run (regrowth-first, II.6) before any new run is
  made; new runs' inverts fall into their receiver's; N8 for the new plots only; then U-ACCESS (a)'s overlap test for the
  new runs (a new run crossing a sealed void opens it, cause `overlap`, event the epoch). **The wall drops (C4-110-7):** over
  V06's `EpochScope.levelled`, each existing run whose centreline crosses a `RetainingWall` the epoch made or re-derived
  takes N6's two wall-crossing vertices, and N7 re-lays the connected network's knots, its plan unchanged (as a depth offset
  re-lays them, J-V4.15).
* **`ArchVaults.reconcile(doc, EpochScope.raised, epoch)`** (C4-110-3; V06's `under.extend`, W65) — in the epoch's commit:
  lays the arch vaults of the `vault` spans of a raised way the epoch founded or repaired (a town becoming a city), collapses
  those whose span or a bounding support reads `ruined` or `cleared`, or whose span volume 6 breached or dismantled (V4
  §3.5.4 (d) (2); a landfall's ruin included), and deletes those of a removed raised way,
  with their links and accesses; the new chambers join `EpochScope.elements`, so the access pass tests them in the same
  epoch (g item 109 (j) (3b)).
* **At a village rung** the maintenance mode (V4 §3.1) makes U-FADE, the foundation rule (`Foundations.apply`: a new
  footing collapses what it meets, at every rung; TR-07), the arch-vault reconcile and the undercity's re-read the only
  changes an inherited system sees: nothing grows, nothing new is laid (C4-65 (3)); the access pass still tests the caverns,
  ruins, openings and the village workings (V4 §3.5.7 (a); TR-12).
* **`CatacombGrowth.grow(doc, epoch, opts?)`** (`under.extend`, after the sewer's extension) — each complex's ratchet step
  (V4 §3.5.1 (5)–(8)) at the epoch: its growth bounded by `opts.capM2[id]` (volume 6's per-epoch cap, V6 §3.18.2 (3);
  without `opts`, `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)`, J-VI.6), every complex but
  `opts.primary` held by the rank cap (V4 §3.5.1 (5)), a plague epoch's burials × `plagueNeedFactor` and the span's
  calamity deaths (`opts.deaths`, each face by its `burialShare`, V4 §3.5.1 (2); TR-10) added to the need, never to the cap;
  each new gallery joins `EpochScope.elements` and runs U-ACCESS (a)'s overlap test and (c)'s crypt join for a church whose
  crypt it first reaches (V6 §3.18.3 (6)). A complex it founds lays its entrance `stair` (V4 §3.5.1 (9)), and its last step
  is volume 1's opening pass over that entrance (below; SLR1-04).
* **`QuarryWorkings.extend(doc, scope, epoch)`** (`under.extend`, after the catacombs' growth; ST-23) — V4 §3.5.3's new
  workings of the epoch's stone, mining uses and chains, each commit with its overlap test and mine breach; `workedOut`
  is read at every epoch (V4 §3.5.3).
* **`UndercityEpoch.reread(doc, epoch)`** (`under.undercity`, order 30; then F6 over the clusters `under.access` made
  accessible this epoch) — II.7.5 (5)'s size re-read past `hysteresis`; a shrinking neighbourhood
  vacates its plots farthest (walkway distance) from its core first; a new neighbourhood opens only in free capacity and
  only in an accessible cluster; when `disorder` < `clearanceDisorder`, each neighbourhood draws clearance at
  `1 − (1 − clearancePerYear)^years` on `epoch.transform` keyed by its lineage, at most one `clearUndercity` per epoch, in
  address order.
* **Access at an epoch (g item 109 (j) (3)–(4)).** `under.access` runs `AccessPass.run(doc, scope)` (V4 §3.5.7, *With a
  scope*): each building the epoch builds, or gives a basement, over a cavern or ruin element draws
  U-ACCESS (d)'s dig draw; the excavation reading is recomputed; a cluster that became `accessible` takes F6's
  new dwellings (V4 §3.4 F6's cut and arrangements), filled by volume 6's relocation of the district's poorest-band ground
  households (V6 §3.18.1 (4); TR-08) — never by S7b (6), whose allocation at an epoch is the crowding hook's alone and runs
  before this pass (below; TT-02); one that turned `unexcavated` — its last access sealed, bricked or
  deleted — vacates its dwellings and undercity plots by II.7.3's vacancy rules, as fates of the epoch (C4-48 (7)).
* The crowding hook (II.7.3 (c); V6 §3.6 (1)) sends its households through S7b (6)'s underground allocation at the
  epoch (BCR-V6-28 (c)), at `growth`, before `under.access`: U-FRONT places them on the lived runs first, then on reopened
  ones (both only where `Features.sewers` is on), then in the free capacity of the void clusters accessible before this
  epoch's access pass (F6; V6 §3.6 (1); TR-08; TT-02). They are new households, part of the epoch's target; F6's new
  dwellings in a cluster the pass opens take relocated households only (above), so ground, underground and sky households
  equal the target (T-V4-72 (f)).
* **Access closures (item 64 (c); BCR-21).** An access point's own state changes only with its host, at the epoch or edit that
  changes the host: a basement access whose building's use turns to a class whose `undergroundAccess.prob` is 0 at its band
  becomes `bricked` (stored, cause `convert:<the use op>`); one whose building is demolished or whose basement is removed is
  deleted with its host (§2.8); a street grating or stair whose ground host is re-hosted by `pointLocate` onto ground II.7.3
  does not admit (a footprint over a former street) becomes `bricked`; an access whose ground host a landfall covers — its
  ground point in a member of a `fallen_island` decoration (a covered way, plot, land use or reservation; V05 §3.16
  (4)–(5)): a grating, a street stair, a public opening, a catacomb stair — becomes `bricked`, cause `convert:fallIsland`,
  until the batch in which that host leaves its `fallen_island` decoration — whichever op ends its cover, at an epoch or
  by hand (V6 §3.5.2; TT-07) — when it returns to `open` (`locked` where its `knownTo` is `secret`)
  (SL-30); a basement or dig access whose building the landfall demolishes is deleted with its host (above); a secret access whose building's concealed use
  relocates stays, `locked`, its `knownTo` unchanged. The `collapsed` and element-sealed readings stay II.6's derived ones.
* **Opening places after generation (SLR1-04; J-V4.106).** Volume 1's opening pass (V1-3.7.1) runs inside every commit
  that creates, removes or re-kinds an access it selects — a public opening of source `opening` and role `access`, or a
  catacomb system's entrance `stair` — over those accesses only, and at a T6 over every
  access it selects: at generation T6 (V4 §3.1) and at the T6 of the tail that follows a re-derivation (V4 §4.3's
  `adjust` and switch rows); at an epoch the last step of
  `AccessPass.run` with a scope (its (e) openings) and of `CatacombGrowth.grow` when it lays a new complex's entrance; in an
  edit the commit of a `delete` of such an access, a `setAttr` of its `kind` or `role`, a `placeAccess` that makes a
  public opening (V4 §4.1), the `delete` of a gallery or chamber that carries a selected access (the access removed with
  its element, a fate of the commit, its place tombstoned), a `regenerate` (New random) of a `cavern`, `ruin` or
  `quarry` system — the systems whose elements carry opening candidates (V4 §3.5.7 (e)) — which removes the old elements'
  openings with them, re-runs U-ACCESS (e) over the regenerated elements' candidates (keyed by the new elements'
  lineages), recomputes the excavation reading, then runs the pass over the openings made and removed (SLR2-08;
  J-V4.115), a dwelling declaration's closure whose second or third rung makes a public opening (V4 §3.8), over that
  opening (SLR4-06), or the re-derivation that an `editTable` or `editPreset` of volume 1's stage-2 switch
  `fabric.extensionWeight` makes (V1-3.15, *The switch's edit*), at its T6: raised above 0, the places made; lowered to 0,
  none made and the old ones retired by §6.3's carry-over (SLR4-06, SLR5-01; J-V4.121). A made access gains its `HoodPlace`, named on `naming` by V1-2.8's key in the same commit; a
  removed one, or one re-kinded out of the selection (its `role` set to `light`), tombstones its place (V1-2.7); a kind
  changed within the selection re-derives the place's subtype; each is a fate of the commit. A state change (`bricked`,
  `locked`, the landfall closure) changes the place's symbol, never the place. The pass runs only while `@plat/hood`'s
  local-place step is registered and runs — while `fabric.extensionWeight` > 0 (V01 V1-3.7.1, V1-3.15); the registration is
  V4 §8's registry lookup, and with either missing no opening place is made and their count is reported (V4 §3.11;
  SLR4-06).

### 3.11 Failure handling (no whole-map retry; §5)

| where | detection | ladder | report |
|---|---|---|---|
| U-NET outfalls | no admitted candidate | moat candidates → one field outfall | `requestedVsBuilt`: "sewers discharge to the town ditch / a cess field" |
| U-NET runs | crown deeper than `coverMaxCm` | re-route ≤ 3 → truncate to a local root → gutters and pits | F-NET counts, unsewered hectares |
| U-NET drains | a drain's head too deep | the drain dropped, the plot unconnected | the count |
| U-FORECAST vs built | capacity missed | S10b's reconcile, F-SITING (II.7.3) | the miss in households |
| U-FRONT plots | a sample under excluded ground | F-UNDER (II.7.3) | per rung |
| U-SYS | no admissible ground in the band | a smaller extent → the system omitted (F-VOID) | per system |
| U-FRONT, U-CITY | households the built voids cannot seat | `crowdCap` occupancy → the other underground allocations → T8 (never a ground re-placement by these stages) | the households moved, by step |
| U-CITY | a void, a core, a lifeline missing | C1's read-only test: the cluster is not a candidate → fewer neighbourhoods → none (F-VOID; never under `require`) | per neighbourhood |
| U-SYS ruin | a plan too like the town above | the next culture rows (≤ 3) → the axis turned 30° → kept, `W_RUIN_SIMILAR` | the record's `attempts` |
| U-SYS catacomb | a face failing a gate; growth blocked | the next face in rank order; stagnation (`fill` rises, `blockedBy`) | per complex |
| U-SYS forced vaults | the ground refuses the shallow grid | the floor steps below `surfaceClearCm` and the grid grows again | the step |
| U-ACCESS | a link end with no admissible vertex | the link skipped | the count |
| U-LINK L5 | a basement access, a connector or an outlet missing | the next rung → the cellar chamber (always), `flooded` on wet ground (`W_SUBTERRANEAN_WET`) | the rung used |
| T8 | ground capacity short | vacant stock → occupied stock to capacity → reported, counted | `requestedVsBuilt` |
| U-LINK | a link end with no admissible vertex | the link skipped | the count |
| U-DIG | a basement, a route or a stage missing | the nearest lawful form or the refusal (F-EDIT, §7.3 item 9 (e)); in a dwelling closure's first rung a building whose connector is refused is passed over for the next, then the base's opening rungs and its bend (V4 §3.8; SR3-11) | in the dry run |
| U-SYS ruin monument | an ST0-infeasible region | `clearM` halved once → the chamber without a monument, `W_RUIN_MONUMENT_SKIPPED` | the count |
| U-SYS arch vault | no open face for its door | the vault laid walled up, no door, `W_ARCH_VAULT_NO_DOOR` | the count |
| U-SYS terminal cistern | no yard or public ground takes it | the square shrinks in 10 % steps to 150 m² → skipped, `W_TERMINAL_CISTERN_SKIPPED` | the count |
| U-NET wall crossing | the fall across a wall beyond `minGradient` | the drop (V4 §3.2 N7 (3)); a climbing run's cover by the `coverMaxCm` ladder | F-NET counts |
| U-SYS quarry at an epoch | the stone cells within `reachM` run out before the epoch's `ΔV` | the rest from the surface quarry (V4 §3.5.3's: a `quarry` land use without a `source`; SLR1-14) | the unmet m³ |
| U-SYS ruin | its dossier source removed | the system kept whole, `source.ref` cleared (V4 §2.6) | `W_RUIN_SOURCE_REMOVED` |
| `Foundations.apply` at an epoch | a new footing over a lived void floor | the floor collapsed, its dwellings vacated and returned for volume 6's re-homing (V6 §3.18.1 (4)); never a discard | volume 6's `under.collapsedByFoundation` |
| the opening pass (T6 and the commits of V4 §3.10) | `@plat/hood`'s local-place step not registered (M6-U built beside M5, V4 §8); or registered with the stage-2 switch `fabric.extensionWeight` at 0, so that the step does not run (V01 V1-3.7.1, V1-3.15; SLR4-06) | no opening place made, the underground kept whole; unregistered, the first tail run after it registers makes them, a declared shift (§13.3); switched off, they are made at the T6 of the re-derivation that an `editTable` or `editPreset` raising the switch above 0 makes (V1-3.15, *The switch's edit*), fates of that edit (V4 §3.10; J-V4.121; SLR5-01) | the count of unplaced openings, the line naming its cause (the step unregistered, or the switch at 0) |

### 3.12 Determinism (§6; C4-58, C4-20, C4-06)

Every draw is listed, each on an existing concern (§6.1), its stream keyed by the stage id, the entity key and the salt
named: the `pit` connection (`sewer`, the plot); the systems' existence and each source's chance (`sewer`, kind and
source); the ruin's existence (`sewer`, its source or the town root), its culture row and shared axis, its axis jitter,
significance, extent and age (`sewer`, the ruin), its decay survival (`sewer`, the element); each burial-face candidate's
chance (`sewer`, the face); a cavern's meander and hall vertices (`sewer`, the path's start cell); a volcanic tube count and
a fissure count and each fissure gallery's width and headroom (`sewer`, the cavern system, the gallery); the undercity's
existence (`sewer`, the settlement, `undercity` — drawn once at S7b by P6 and re-read by C0; C1's split is deterministic,
no draw); the undercity's rank pick (`sewer`, the settlement, `undercityRank`); a lifeline's knowledge (`sewer`, the
district); each proximity link (`sewer`, the element pair and station); each overlap shaft (`sewer`, the element pair);
each opening (`sewer`, the candidate element and the opening kind); each dig (`sewer` in U-ACCESS, the building, salt the
void kind); each crypt join (`sewer`, the church and the complex source, no epoch component); the quarry ossuary's chance
(`sewer`, the working); each basement access (`sewer` in U-LINK, the building — item 64's draw, a different stage from the
dig draw, so neither shifts the other); U-DIG's pieces (`sewer`, the edited entity, the target, the event's `seq`; at
generation the district's lineage for a lifeline, the institution's binding key for L5); the ruin's magic lights
(`sewer`, the chamber); a monument's ST1 draws (`sewer`, the ruin system, the chamber's plan coordinate, `'tiers/0'` then
`'tiers/1'`, the attempt index on an ST6 retry), its tier decay (`sewer`, the chamber's key, `'tiers/decay'`, the tier's
index) and each colonnade row's survival (`sewer`, the chamber's key, `'colonnade'`, the row's index) (C4-110-8, C4-64
(5)); the underground plots and buildings (`plot.*`, `siting`, `siteplan`, `heights`, keyed from their
pseudo-district or neighbourhood); door-light sides (`pin.light`); the fade and clearance draws (`epoch.transform`);
T8's placements (`siting`, the receiving district); and names (`naming`) — no new concern (§6.1). A span's `use` is the
base's draw on its raised-way stream (BCR-45), fixed before the tail; V04 draws nothing for an arch vault or the terminal
cistern, so the arch-vault set never depends on the order districts are opened (T-V4-70). At an epoch the keys
take the epoch component (§6.1) except the dig draw (the building's lineage carries its epoch), the catacomb source draw
(keyed by the face's lineage; a quarry ossuary's by its working), each public opening's draw and each overlap shaft's
(keyed by their elements), and the crypt join — each fixed by its key and never re-drawn (ST-16; V6 J-V6.52, T-V6-34);
so a building's dig draw at the epoch that builds it equals the one a regeneration of that epoch gives (prefix-stable),
and a face refused its catacomb at TOWN compares the same draw against CITY's chance when the town becomes a city.
`QuarryWorkings.extend` and `SewerStrategy.derive` at an epoch draw nothing new but the network's `pit` draws. The hood
line, `Foundations.apply`, the village-working test and the buried floor's terrace steps draw nothing; the opening pass's
names are volume 1's draws on `naming` (V1-2.8).
Every loop runs in address order; every search breaks ties by address or index; the tail runs serially on one worker;
every length is an integer centimetre and every transcendental goes through `dmath` (§6.5). A New random on a system, a
tunnel run or an undercity neighbourhood advances its reroll and writes only its own part, but for its links' far ends
(§3.4), the carve's split parts (V4 §3.6 C2) and, on a `cavern`, `ruin` or `quarry` system, volume 1's opening places
over the openings U-ACCESS (e) makes and removes (V4 §3.10; SLR2-08); a New random on the catacomb system removes nothing
(V4 §3.5.1 (6)).

## 4 Editing

The edit kinds are §7.1's (the underground tools row of its edit-target table), their lifecycle rows §7.4's and the
closure rule §7.3 item 9's. This section adds what they need to be built: the points forms, the attribute paths with
their ranges, the locality of each, and what the clerk sees.

### 4.1 Declarations — points in, shape out (item 101 (i); BCR-8; C4-31, C4-62)

| event | its points form | the dry run derives | the handles |
|---|---|---|---|
| `drawTunnel` (sewer, no `system`) | two points; the kind optional | a route: where both points lie within `outfall.linkM` of ways, U-NET's tree search between the nearest graph nodes (N3's costs); else the straight segment; an end within 2 m of a run joins it (a junction); the kind, when not given, a `main` where either end lies within `outfall.linkM` of a way, else a `drain`; the profile by the kind and the preset; the invert by N7 from the lower end; `navigable` derived; the overlap test (U-ACCESS (a)) at commit | four to eight vertices of the route; the ends |
| `drawTunnel` with a `system` (a gallery) | two points | a catacomb or quarry gallery an L-route on its system's grid axis; a `ruin` gallery an L-route on the ruin's `axisDeg`; any other a straight segment; the floor from the nearer existing element of the system, else the row's depth range's middle (a ruin's: `g(p)`, V4 §3.5.0a (4)) | as above |
| `drawChamber` | one point and a size, or three or more points | a rounded rectangle of the size aligned with the nearest gallery of the system (a `ruin` chamber: a right-angled rectangle on the ruin's axis, kind `room` unless a kind is given), or the polygon; floor from the nearest element; `kind` the row's first chamber kind | the corners |
| `addLink` | one point on each of two elements of different parts | the elements (nearest within 5 m), `via` by the floor difference (U-ACCESS (b)'s rule), kind `open` unless given, cause `edit` | the two ends |
| `placeAccess` | one ground point | the element nearest below it within 10 m in plan on any part (shallowest first); the kind by the drop and the host (C4-31): on public ground (V4 §1.2) II.7.3's neighbourhood kinds — a street `stair` where the drop is within `stairMaxDepthCm`, a `well` shaft in a yard or square, else a `shaft` (a `grating` of role `air` when asked); in a building the basement kinds (II.7.3 (3)); role `access`, cause `edit`. Asked for a public opening's kind (`sinkhole`, `mouth`, `collapsed_shaft`, `ruin_entrance`), it makes that opening at the nearest opening candidate of that kind within 10 m (V4 §3.5.2's, §3.5.0a (8)'s and `OpeningRow`'s, whatever its draw gave): source `opening`, role `access`, cause `{ rule: 'edit', system, event }`, `knownTo` by U-ACCESS (e)'s rule, and volume 1's opening pass places it in the same commit (V4 §3.10); with no such candidate the kind is refused, the nearest candidate offered (SLR1-04; J-V4.107). Over an `unexcavated` cluster it is the user's excavation: the dry run lists every cluster that becomes `accessible`, transitively, and says that dwellings come at the next Re-derive from S7b or the next epoch | the opening and the underground end |
| `addUndergroundAccess` | the building (a click) | the closure (V4 §3.8); with no `target` and grouped before a dwelling declaration on an `unexcavated` cluster (V9 §4.17.4's **Use another building**), its target by V4 §3.8's grouped-access rule (BCR-V9-22; SR3-11) | the access; the connector's vertices |
| a raised way added (the base's T4 `road` with `raised`, or the aqueduct class; g item 110 (b)) | the base's | the base's spans with their `use` by BCR-45's rule; V04's arch vaults of its `vault` spans and, for an aqueduct with a `cistern` terminal, its terminal cistern, shown as fates in the same dry run (C4-110-3) | the base's |

**Two reads every points form shares (C4-110-4, C4-64 (3)).** A ground point is read on ground part 0: a point on a
raised deck resolves to the ground beneath it, a click on the sky layer resolves to ground part 0 beneath it (no island
building or face is ever a host, V4 §1.2), and one inside a raised-way pier's footprint moves to the nearest free
part-0 point, the move reported in the dry run. An access from a church-class building (its class's crypt column `always`
or `basement`) to a catacomb element — by `placeAccess` in it or `addUndergroundAccess` naming a catacomb target — is a
hand crypt join: source `crypt`, cause `{ rule: 'crypt', system, event }`, its head in the crypt; a building without
`Basement.crypt` is refused with the fix offered (`setAttr(basement)` on `basement/crypt/ring`, V03 §4.2) (J-V4.89).

A dry run shows the derived shape as a ghost with its fates; accepted, the shape is stored resolved and no later
derivation moves it (declared means held, §7.2; N3a). The toolkit's layer: showing the underground layer makes it the
active layer until the user picks another (the active-layer control is V09's); while it is active the road tool T4 draws a
tunnel or a link, the place tool T6 a chamber or an access, the shape tool T9 every attribute below (1b.3) — no thirteenth
tool (§13.2's elegance bars).

### 4.2 Attribute paths (`setAttr`), with ranges and effects

| entity | path | range | effect (re-derived, locally) |
|---|---|---|---|
| tunnel | `kind` | `drain`, `main`, `culvert`, `passage` (a `passage` only in the navigable preset) | the profile row re-read; `navigable` re-derived; its bands |
| tunnel | `widthCm`, `headroomCm` | 40–600, 60–600 | `navigable` re-derived; its bands; a run turning non-navigable lists its frontage plots as fates (vacated, their faces residue) to confirm |
| tunnel | `depthOffsetCm` | such that every crown stays ≤ `coverMaxCm` | N7 re-run over the connected network's inverts (plan unchanged); an offset past the cover limit returns F-EDIT with the nearest lawful offset; the overlap test at commit |
| tunnel | `name` | text | `Tunnel.name` (BCR-3), a protected name (§2.8) |
| gallery | `widthCm`, `headroomCm`, `elevationCm`, `knownTo` | 60–800, 150–1 000, inside its system's `depthM` | its bands; a floor crossing another element of its part at another band is refused (II.7.6); the overlap test at commit |
| chamber | `kind`, `ceilingCm`, `elevationCm`, `knownTo` | the row's kinds (`ChamberKind`) — `archVault` only by the arch source, a `setAttr` to or from it refused (the span's `use` is its edit); ≥ 200; the depth range | the plots under it re-capped (II.7.5); a lowered ceiling re-fits the buildings by S11's mutator and cuts a monument's tiers by V4 §3.5.0a (5a) |
| ruin chamber | `monument/count` | 2 … the `stepped-monument` row's `count` maximum at the monument's band | re-laid by `layTiers` with the same draws, `n` replaced; the ceiling cut and the decay re-run; the plots on its floor re-cut where they meet the new rings |
| raised way span (the base's path `spans/<a>-<b>/use`, BCR-45) | `use` | `open`, `vault` | a held user edit, kept through regeneration; V04's reconcile lays or removes that span's arch vault in the same commit, a removal listing its links, accesses and any declared institution in it as fates |
| catacomb complex | `fill` | 0–1 | its ossuaries' drawing; later derivations only raise it (V4 §3.5.1 (7)) |
| link | `kind`, `knownTo`, `via` | II.7.6's values | its marks; the excavation reading re-derived |
| access point | `kind`, `role`, `state`, `knownTo`, `ground.at` | II.7.4 (with BCR-29's kinds) | re-hosted by `pointLocate` (§7.1); a `state` of `bricked` on a cluster's last access lists the vacated dwellings as fates; a `kind` or `role` change on an access volume 1's opening pass selects runs the pass in the commit, its place re-derived or tombstoned as a fate (V4 §3.10; SLR1-04) |
| undercity district | as a ground district (§7.1's districts row) | — | — |

A tunnel's condition is never a path (J-A11.21): `convert` `silt`, `caveIn`, `seal`, `reopen`, `flood` (§7.1).

### 4.3 Locality (§7.3; J-V4.14; C4-04, C4-30, C4-42, C4-43, C4-48, C4-50)

| edit | re-derives | byte-identical |
|---|---|---|
| a tunnel drawn, moved, re-profiled or deleted | U-FRONT on the part-0 blocks its edges bound (II.7.2); N8 for the plots within `reachM` of it; the lights of those blocks; the overlap test for the drawn or moved run; the excavation reading | the ground; every other part but a new link's far end; the rest of part 0 |
| a depth offset | the inverts of the connected network (knots only); the overlap test | every face and plot |
| a ground edit (way, plot, building, field) | the part-0 blocks, and the undercity blocks under a ceiling within `surfaceClearCm`, whose recorded ground cells its clear region covers (II.7.3); N8 for the plots it re-cut; a building created or given a basement over a cavern or ruin element draws U-ACCESS (d) in the edit's commit, keyed as at generation; the excavation reading; nothing of the network's plan — sewers outlive the streets above them. A tunnel whose followed way is deleted keeps its course, `follows` absent; one whose way is split re-points `follows` to the part over the run's midpoint (C4-30 (d)) | every tunnel's geometry and invert |
| a water edit moving a shore that holds an outfall | the **outfall re-seat**: the run's `Tunnel.outfall.at` moves to the nearest point of the same water body's shore, its last segment extended or shortened within `outfall.linkM`; beyond it, F-EDIT names the stranded outfall and offers Re-derive from the network stage | every other run |
| a water or terrain edit that puts water, or the water table, over a void element whose ceiling lies within `surfaceClearCm` | each such gallery and chamber converted `flooded` (II.6) as fates of the edit, or, where `flood` is not admitted, reported `W_VOID_UNDER_WATER` (C4-43) | the rest |
| a terrain edit | nothing moves; runs whose crown cover falls below `coverMinCm` are listed in the fate report (`exposed`); S1's water operator recomputes `Terrain.outfalls` wherever D8 re-runs (C4-30 (f)) | all |
| a `delete` of a public opening or a catacomb entrance, or of a gallery or chamber carrying one (the access removed with its element), a `setAttr` of an access's `kind` or `role`, or a `placeAccess` making a public opening (SLR1-04, SLR2-08) | volume 1's opening pass over that access: its `HoodPlace` made and named, re-derived or tombstoned, a fate of the commit (V4 §3.10) | every other place |
| a `delete`, `seal` or `bricked` of a cluster's last access | the excavation reading; the cluster's F6 dwellings and undercity plots vacated by II.7.3's vacancy rules, listed as fates in the dry run (C4-48 (7)) | the rest |
| a dwelling declaration on an `unexcavated` cluster, alone or after its grouped `addUndergroundAccess` (BCR-V9-22; SR3-11) | the closure's way in (V4 §3.8: U-DIG's pieces from the building that digs, or the base's opening rungs with volume 1's opening pass); the excavation reading; the declaration's own pieces on the cluster it opens | the rest |
| an `editTable` or `editPreset` that changes the resolved `fabric.extensionWeight` (volume 1's stage-2 switch, V1-3.15) — across 0, or inside (0, 1] (SLR4-06, SLR5-01) | volume 1's re-derivation of the edit (V1-3.15, *The switch's edit*: from the switch's first reader stage with §6.3's carry-over), then T1–T8 as after the `adjust` row's Re-derive — the re-cut plots and buildings drawing U-ACCESS (d) and the access closures (V4 §3.10) as the ground-edit row states, the excavation reading recomputed. T6's opening pass runs under the new gate: a place is made for each selected access where the switch rose above 0; where it fell to 0 none is made, and each old place is retired by the carry-over; a change inside (0, 1] keeps the gate, and the pass runs as at generation over the accesses the re-derived document selects. These are fates of the edit (V4 §3.10; J-V4.121) | what the stages before that first reader stage commit |
| a `drawBoundary` or `split` on an undercity district | C1's read-only lifeline test per resulting district; a failing district's lifeline closure (V4 §3.8), its pieces shown as fates (C4-42) | the rest |
| a `delete` of catacomb galleries | the author's declaration: `extentFloorM2` lowered by the deleted area and the deleted grid nodes tombstoned, so growth never digs them again (J-V4.56) | the rest |
| `regenerate` (New random) on a system, a run or an undercity neighbourhood | that system's part, that run's blocks, that neighbourhood's elements; the links' far ends (§3.4); a host system's carve re-run (V4 §3.6 C2); on the catacomb system its lights and labels only; on the `dug` system its generated pieces only; on a `cavern`, `ruin` or `quarry` system U-ACCESS (e) over the new elements' opening candidates (the old elements' openings removed with them), the excavation reading, and volume 1's opening pass over the openings the new plan makes or removes (V4 §3.10; SLR2-08) | the ground but those opening places, every other part |
| `adjust` of the family or the preset, of `recipe.layers.ruins`, or of the TOWN *Sewers* toggle | **Re-derive from S7b** with carry-over (§6.3): these change S7b (6)–(7)'s inputs (the navigable preset always allocates, the undercity presets change its bound and sources, a TOWN toggled on gains the allocations, a ruin feeds P5 and P7), so the ground's allocation re-runs, surviving placements kept by §6.3's rules, then T1–T8 (C4-04; BCR-9, BCR-35, BCR-37) | the ground's geometry outside the re-placed uses |
| a basement edit bringing a ring within `foundationClearM` of a shallow void element | nothing; reported `W_BASEMENT_NEAR_VOID`, and U-LINK's basement rule may give it a way down at its next re-derivation | all |
| a raised way added, removed or re-shaped, generated or drawn (C4-110-3, C4-110-5) | `ArchVaults.reconcile` over that way in the same commit — its vaults laid or deleted with their links and accesses, fates in the dry run; `foundationObstacles` re-read under its raised-way piers: the older voids' collapsed stretches and pillars there re-derived, and an existing element of a later system a new raised-way pier puts within reach converted `collapsed`, cause `foundation`, as a fate (a catacomb's staying in its extent, V4 §3.5.1 (6)); the excavation reading; the terminal cistern of an aqueduct | the network (a raised spine is never an edge); every other part |
| a span's `use` set | that span's arch vault laid or removed | the rest |
| a `RetainingWall` drawn, moved or removed, or a levelling edit (C4-110-7) | N6's wall-crossing vertices and N7's re-lay for the runs crossing it (knots only, the plan unchanged); `foundationObstacles` re-read along it (as above); the street-vault stretches of the ways it re-profiles | every tunnel's plan |
| a `setAttr` on `monument/count` | that monument, its chamber's ceiling, U-CITY's plots on its floor where the new rings meet them | the rest |

### 4.4 Undo and the closure record

Every row is §7.4's; the closure record (§7.3 item 9 (c)) names U-DIG's pieces. Additions: the outfall re-seat's former
`at` is in the water edit's undo record; a depth offset's undo restores the knots of every run N7 re-laid; an excavation's
undo removes its access and restores the vacated or opened state by the replaced scope; an opening place that an edit's
opening pass made or tombstoned returns with the edit's undo (a place's undo is its host's event, V1-2.7); a catacomb delete's undo restores
the galleries, `extentFloorM2` and the tombstones; a raised way's removal's undo restores the way, its arch vaults, their
doors, links and accesses with the same ids (the replaced scope); a monument count's undo restores the former lay.
**Held pieces:** L5's pieces for a subterranean dossier institution are
held while that institution is live: a `delete` of one returns F-EDIT `dossier-owned` with `rejectSite` offered (the
institution moved, its underground re-made; item 20). Edit-made `dug` pieces are held (§7.3 item 9 (c)); generated ones
re-derive with their owner (V4 §3.8).

### 4.5 The clerk's view (§11.2's tool API; item 101)

The clerk reads the underground through the reader, filtered by its viewer's knowledge key (§9.2): per system its kind,
depth range, floor area and element counts; per band its contents; per named run its name, kind, served area and
outfall; per undercity neighbourhood its parent, households, institutions it may know; per access its kind, state,
`knownTo` and `cause` where admitted; per link its kind, `via` and `cause`; per catacomb complex its source, rank,
extent, `fill` and `blockedBy`; per ruin its culture, age and the districts above it (volume 1's `districtsAbove(part, element)`,
V1-3.16, for "under the old quarter"); per ruin monument its tiers laid, standing and truncated and its mound; per arch vault its raised way
and its span's `reason` (a street, water, flood, too tall, too low, too steep, the chance, the cap or the user; BCR-45);
per terminal cistern its aqueduct and source; per cistern the nearest water and aqueduct delivery point its test read;
per foundation pillar or collapsed stretch the raised-way pier or retaining wall that made it, and the epoch whose
`Foundations.apply` made it; per village working's breach its working and the void it reached; per buried stair step the
tombstoned retaining wall it keeps (TR-07, TR-11, TR-12). A ruin, a cavern cluster and
every unexcavated element are known to a `secret` key only (V4 §5.2). V10 builds "why is this here" from these records and
the rows that pulled each member (V4 §3.6a) — among them the span's reason, the aqueduct serving a precinct and a raised-way pier's
footing in a cave (C4-110-12). The clerk proposes the
same events (V4 §4.1) as ghosts; accepted, they commit with `proposedBy: 'clerk'`. A secret element it cannot see it cannot
edit: an event naming a withheld id is refused as if the id did not exist.

### 4.6 Migration (§7.5; C4-38, C4-59)

A document saved before U-NET's output version holds `Features.sewers` true and an empty part 0. On first opening under
that version the tail runs as part of the version's `upgrade` event (§7.5): the diff lists the underground records made,
declared as the release's shift of the underground layer; the ground's digests are unchanged. Such a document had no
S7b (6)–(7) allocations, so the upgrade makes no sewer-front plots, void dwellings or undercity; its diff says so and
offers **Re-derive from S7b** to make them (C4-38). A stored `flowToward` is dropped (BCR-2); a `Chamber` without `kind`
takes its row's first kind; a `Tunnel` without `outfall` takes the nearest `Terrain.outfalls` entry to its downstream
end, reported. A document saved before item 109's version (C4-59), in the same `upgrade` event, with a declared shift
(§13.3):
1. Every existing catacomb complex is kept — the ratchet outranks the count — and gets a `CatacombComplex` with
   `extentFloorM2` equal to its laid extent and `fill` 0, flagged `overCount` where the count is exceeded; no complex is
   added until the count allows. A complex whose source is a church building (the old crypted-church row) is kept whole,
   re-sourced to that church plot's `churchyard` part where one exists, else `legacy` naming the church, reported; no
   complex is ever created under a church.
2. Every existing access and link keeps its record, with cause `legacy`. A dwelling or undercity in a cavern is kept where
   any existing access makes its cluster accessible; otherwise its plots vacate as the upgrade's fates, listed.
3. The access pass (U-ACCESS) runs; it adds accesses and never removes one.
4. No ruin is created (g item 109 (h)); `recipe.layers.ruins`, absent, reads `off`.

A document saved before item 110's version (C4-110-3, C4-110-8, C4-64 (4)), in the same `upgrade` event, with a declared
shift: every `vault` span of a raised way the document holds gets its arch vault and every `cistern` terminal its terminal
cistern, the diff listing them; a ruin whose culture row names a monument gets it; the foundation reading, the wall-crossing
vertices and drops and the church-class host rule apply; and the entrances of its underground buildings are rewritten to
`faces: 'tunnel'`. Nothing is removed but what the foundation reading collapses, each listed.

### 4.7 Read-ahead — the skeleton file's underground bones (item 101; §4.1 *Declarations read ahead*; C4-09; BCR-25)

A skeleton file, or any log whose creation prefix holds underground declarations, is read ahead by the tail stages, each
declaration by the stage that owns its subject and as a constraint of that stage:
* **U-NET** reads the prefix's `drawTunnel` without `system` as held runs (N3a (1)).
* **U-SYS** reads `drawTunnel` with a `system` and `drawChamber` as held elements of their kind; a declared element makes its
  system exist whatever its chance draws (a declaration is a fact), and the system's layout grows around it (a ruin's plan
  on the declared elements' axis, a catacomb's grid from the declared gallery's axis). A raised way the prefix declares
  (the base's) has its arch vaults and terminal cistern laid by V4 §3.5.4 (d), (e) like any.
* **U-CITY** reads a `quarter` or `drawBoundary` on a void part as a required neighbourhood, as `require` places one
  (V4 §3.6 C0), in the declared cluster; on a cluster still `unexcavated` after T2b its way in is the dwelling closure's
  (V4 §3.8), run at C0 before C1's lifeline test with the declaration's `seq`, never `require`'s lifeline stair of cause
  `dossier` (SR3-11; J-V4.120).
* **U-LINK** reads `addLink`, `placeAccess` and `addUndergroundAccess`, whose closures run at their prefix positions after
  T5, in prefix order, each folding nothing the derivation has already made (§7.4) — save an `addUndergroundAccess`
  grouped before a dwelling declaration on a sealed cluster, which runs with that declaration's closure at U-CITY C0
  (above; V4 §3.8).
A declaration a stage cannot honour is refused at its dry run with the reason and the closest alternatives (item 20 (g)).
The skeleton file, the canvas and the tool API give one model digest for the same declarations (T-V4-40).

## 5 Rendering, labels and exports

### 5.1 The underground view (§8.4; BCR-10; J-V4.31)

Hidden by default at every rung (§8.4). When the underground layer is visible, one depth band draws at a time
(`depthBand`, §2.9; its default §8.4's), in one of three modes, `LayerSpec.underView` (BCR-10), default `cutaway`:
* **`cutaway`** — the ground drawn first as a **ghost**: every ground mark at `ghostAlpha` (0.25), in its luminance only,
  ground labels hidden but for the district and quarter labels at half alpha; then the band's underground marks over it,
  so every tunnel reads against the street above it;
* **`overlay`** — the ground at full strength, the band's underground marks over it at alpha 0.7;
* **`solo`** — the underground alone, the ground reduced to its way centrelines as `trace` hairlines (the export default).
The adjacent bands' traces are §8.4's. The **band ladder** in the layer panel lists every non-empty band as its depth
range (−2.5 to −5 m …) with the kinds present, the drawn band marked; PageUp and PageDown step it while the underground
layer is active (§14's keymap, BCR-10). A document opened with the underground visible shows the ghosted ground with the
notice "building the underground…" until T7 has built the drawn band (C4-31). **`showUnexcavated`** (BCR-10; a per-viewer
view key, default `false`, its control V09's) draws the unexcavated clusters in their own style (V4 §5.2) — for a `secret`
key only, whatever its value, so a game master sees what the inhabitants do not (g item 109 (j) (2)). **Raised parts
(C4-110-10).** In `cutaway` and `overlay` the raised parts' decks and raised-way piers over the drawn area draw as `trace`
hairline outlines over the ghost, so an arch vault reads under its arch; in `solo` only the raised-way piers' outlines. The ground
view draws nothing of this volume, save volume 1's ground symbols and opening places, which read this volume's
`AccessPoint` records (V1-3.8.8, V1-5.1.2, V1-5.2.2; SL-08); a span's infill wall and door are the base's drawing.

### 5.2 Marks and programs (§8.1, §8.2)

The underground builder of S14 writes, per part and band, marks of the semantics `under.rock`, `under.void`,
`under.water`, `under.wall`, `under.building`, `under.trace`, `under.access`, `under.link`, `under.label` with the
ordinary columns (§8.1; `knownTo` and `concealed` on every mark, item 7). The draw order inside a band:
1. **Rock** — a hatched halo of `rockHaloM` (4 m) outside every void's kerb, in the new role `rock` (BCR-10: `ink` a
   40 %-ink cross-hatch at 1.2 paper px; `lit` a dark stone fill; `hatched` its dense hatch), the rest of the rock
   transparent so the ghost shows: the dungeon-map figure-ground, where voids read as carved (J-V4.31).
2. **Voids** — tunnel bands, gallery bands and chamber floors in the new role `void` (the paper, a step lighter than the
   ghosted ground). A tunnel draws by §8.2's kind rows over the void (the cased band for a `main`, the hairline pair for a
   `drain` or `culvert`, arch glyphs at a `passage`'s ends); a `chamber` junction wedge in `chamber`'s fill.
3. **Water** — along every `drain`, `main` and `culvert` its channel, a `water` stroke 0.4 × the bore wide on the
   centreline; a gallery with `water` and a `cistern` filled in `water`; a flooded element by §8.2's `states` row.
4. **Walls** — every void's kerb and chamber wall as a `wall` stroke, 1.5 × a way's casing for a `main`, 1 × elsewhere.
5. **Buildings** — the footprints of the sewer dwellings and the undercity in `building`, the vault classes with the
   `vault` hatch (§8.2), party walls and door ticks as on the ground; the undercity's informal clusters by §4.7's cluster
   rows.
6. **The plaza** — the core's ring walkway, the stalls as pins.
7. **Access points and links** — §8.2's `states` rows, each access by its underground end only. Its surface head — an
   outfall's `mouth` at the bank (a small arch glyph facing the water) included — is volume 1's ground symbol (V1-3.8.8,
   V1-5.1.2), drawn in an opened close-up by the knowledge filter and the `pins` toggle whatever the underground layer's
   visibility; the underground layer draws only the underground end (SL-08; J-V4.96).
8. **The adjacent bands' traces** (§8.4).
9. **Light**, then the **plan lines** (below).

The `states` rows of §8.2 cover every declined condition; the undeclined defaults are the rows above. Added programs and
rules (BCR-40; C4-29, C4-33, C4-50, C4-56):
* **Chamber fill by kind.** §8.2's chamber row is keyed by `Chamber.kind`: `streetVault`, `bridgeVault` and `archVault` with
  the `vault` hatch (an arch vault in the shallowest band, its floor at grade; its door a daylight opening), `storey` and
  `square` as buried-town floors, `cellar` and `storage` as `dug`, `ossuary` with niche ticks
  whose density rises with its complex's `fill` (1 tick per 60 cm of wall at `fill` 0 to 1 per 30 cm at 1), `market` as
  the undercity's plaza.
* **The `ruin` program** (g item 109 (g)): walls as two parallel `wall` strokes 30 cm apart on every chamber outline and
  gallery kerb; a 60 cm dot at each point of `Chamber.columns` (the modelled points, C4-64 (5)); `collapsed` elements in a
  rubble stipple of the `rock` role; the main streets' ancient drains as the `water` stroke — distinct from the cavern's
  irregular fill. **A monument** (C4-110-8): each standing tier's ring as a `wall` stroke, its stairs as hatched strips, the
  shrine's ring where it stands, each tier casting its own shadow (V4 §5.3); the mound as the rubble stipple within the first
  fallen tier's ring.
* **Foundations and drops** (C4-110-5, C4-110-7). A foundation pillar in a void's floor draws as a filled `wall` square of
  its footing; a stretch collapsed by a foundation as the rubble stipple; a drop at a retaining wall as a small filled square
  on the run at the wall's line (the drop shaft). A buried gallery's stair step at a tombstoned retaining wall's line (V4
  §3.5.5; TR-11) draws as a hatched strip across its band, as a monument's stairs do.
* **The unexcavated style** (g item 109 (j) (2)): every element of an `unexcavated` cluster draws its kerbs and walls
  dashed (4 : 3 at 1 paper px) at 40 % alpha, with no fill, no light and no label but its system's; only while
  `showUnexcavated` is on and only for a `secret` key.
* **Grilles.** Each station of `Tunnel.grilles` draws the link style's gate bar across the band (C4-33).
* **Access symbols** are sized by their opening row (`UnderLayoutRule.openings`, C4-17).
* **Knowledge (C4-56 (3)).** The knowledge filter admits an unexcavated element, its label, its links and its exports only
  at `secret` (the game master's key, §11's audience table), whatever its `knownTo`; a ruin's and a cavern cluster's
  existence is otherwise known as its `knownTo` says once it is accessible.

### 5.3 Light underground (§8.4; item 68 (d′); J-V4.32)

The surface layer (§8.4 (a)) of an underground band: each void's floor at its floor elevation relative to the band's
datum (the band's upper bound); **rock as a prism** to the band's roof — the highest ceiling in the band plus 100 cm — so
no point light passes through rock and a torch in one tunnel never lights the next; the underground buildings as their
prisms to their eaves under the ceiling; a monument's standing tiers, stairs and shrine as their prisms from their bases to
their tops, each casting its own shadow, and its mound as a prism of `moundCm` (C4-110-8); a foundation pillar as a prism to
the band's roof; a chamber's ceiling never drawn. Sources: the band's `LightSource`s, the light
shafts at every access or mouth that breaks the surface (§8.4 (b), with BCR-38: the global light × the opening's `areaM2`
× its `lightTransmission` (V4 §2.3) × its direct-light visibility — the ground pass's shadow term at its `ground.at`
under the current sun (every caster included, a sky island's slabs among them, V05 §5.3 (1)); item 102's daylight share,
a model reading, never enters the picture (SL-16) — plus its sky-ambient share; C4-17, C4-32), the hand lantern; ambient `ambient.underground`
(0.02), `E_key` `nightLux`. **The legibility floor:** the plan lines — every kerb, chamber wall and building outline of the
band — are composed after the light pass in their unlit colours at 60 % alpha, as labels are (J-A68.87), so the dark
between the pools of light is part of the look and the plan stays readable. The light pass runs per band tile, its bake
keyed by the band; a band switch re-bakes only the tiles in view (V4 §6).

### 5.4 Labels (§9; BCR-17, BCR-18; J-V4.34)

| what | label kind | placement | name source |
|---|---|---|---|
| a trunk or a culvert run | `tunnel` | curved along its centreline (§9.3's spine candidates), watercourse italic | the naming pack's `sewer` slice; a culvert reads as its brook's (the ⟨name⟩ Brook, the ⟨name⟩ Culvert) |
| a void system | `system` | at the centroid of its floor in the band holding the largest share of its floor area, only in that band | the `cavern`, `quarry`, `vaults`, `buried` slices (`UndergroundSystem.name`); a buried town its quarter's (Old ⟨quarter⟩) |
| a catacomb complex | `system` | at its floor's centroid | `CatacombComplex.name`: a complex under a burial face reads its cemetery's name (the Catacombs of ⟨cemetery⟩), a churchyard's its church's; a quarry ossuary its quarter's (the Ossuary of ⟨quarter⟩) (C4-49 (8)); a crypt's label is V03's |
| a ruin | `system` | at its outline's centroid, in its main band | `RuinRecord.name`: the ancient civilisation the dossier's history names (a protected dossier name), else V11's `ruin` slice (BCR-18); an unexcavated ruin's label only at `secret` (C4-56 (4)) |
| a raised way's arch vaults (C4-110-10) | `system` | at the midpoint of its run of arch vaults, in the shallowest band; the target its lowest-address arch vault | the `vaults` slice naming the run after its way ("the ⟨way⟩ Arches") |
| an undercity neighbourhood | `district` (§9.1) | II.7.5's | II.7.5's `undercity` slice |
| the core's plaza | `place` | its disc | the `undercity.plaza` slice |
| the sewer-front neighbourhood | `district` | at its largest block | II.7.3's family of its own |

Names are drawn once on `naming` in the tail's S13a and kept by §6.3's cases. Every label is a candidate only while the
underground is visible and its band drawn, and only where the knowledge filter admits its entity (§9.2).

### 5.5 Exports (§11.1; BCR-16; J-V4.35, J-V4.36)

| format | the underground |
|---|---|
| GeoJSON | §11.1's rows; each tunnel with `kind`, `navigable`, `widthCm`, `headroomCm`, its invert profile (drops included), `depthBand`, its grilles and its outfall as a Point feature with `into`; each system a feature with its part, depth range and `variant`; each element with `excavation` (for a cavern or ruin), `culture` (a ruin's) and `reusedBy`, a buried gallery with its floor profile, its terrace stair steps included (TR-11); each arch vault with its absolute floor and ceiling (terrain-datum cm) and its `span`; each monument's standing tier a Polygon with `tier`, `baseCm`, `topCm` (absolute) and its mound a Polygon with `moundCm`; `ruinColumns` as a MultiPoint per chamber; each catacomb complex a feature with `source`, `rank`, `extentFloorM2` and `fill`; each access and link with its `cause`; `plat:tier` on every property |
| SVG | one group per band, `layer.underground.band<k>`, holding the band's semantics groups in V4 §5.2's order; the ghost ground in `layer.ground` at the export's `underView` |
| PNG / tiles | per band, per layer transparent; lit by the CPU reference at the export's light setting (no hand lantern, J-A68.92) |
| VTT (dd2vtt and Foundry-class scenes) | one scene per non-empty band (§11.1), `solo` and lit: `line_of_sight` from every void kerb and chamber wall and every underground building's footprint less its doors, from each arch vault's walls — its raised-way pier faces and its open faces less its door, the door a portal (C4-110-10) — and from each column's 60 cm square, each foundation pillar and each monument's lowest standing tier; `portals` only at openings in a wall line (C4-41) — a `door` access, a link whose `via` is `door` or `breach` (`gated` and `secret` closed, `open` open), an underground building's entrances and each tunnel grille (closed); every vertical access (a stair, shaft, ladder, hatch, well, grating, mouth, sinkhole) is its shaft light plus a `plat` extension object naming the band it leads to, sized by its opening row; `lights` the band's lights and shafts; a `plat` extension object with the band's depth range; unexcavated elements and their links are left out (C4-56 (5)) |
| glTF | voids as inward-facing solids — a tunnel or gallery swept along its centreline as its bore by its headroom, a `main` whose headroom reaches half its bore plus 50 cm with a half-round crown; chambers as floor, walls and a flat ceiling at `ceilingCm` (an arch vault's interior only, its ceiling at the soffit; the raised way's own solid is the base's); a monument's standing tiers, stairs and shrine as prisms and its mound as a prism; columns as 60 cm prisms floor to ceiling; the rock never exported; underground buildings extruded base to eave (§11.1); access points as shafts from floor to ground; each band a node, its lights in it |
| CityJSON | one `Tunnel` object per system (the sewer's per run, §11.1) with a `TunnelPart` per run or gallery and a `TunnelHollowSpace` per chamber; underground buildings as §11.1 states |
| CSV | the network's statistics: length by kind, served area, connected shares, outfalls |

Every export is filtered by its knowledge key (§11.1): a secret access, link, `dug` gallery (the secret passage of
T-V4-21; C4-36) or place is left out with its lights, and an unexcavated element exports only at `secret`.

## 6 Performance budgets

Measured as §12.1 states (the reference hardware, the harness, p50 and p95 over the rung's golden seeds). The tail is off
the first paint (J-V4.2): the first map's laws of §12.5 are unchanged; the tail's time is reported as `timings.tail` and
bounded here. Work sizes are PLAUSIBLE until the U0 spike measures them at CITY **and METROPOLIS** (V4 §8; C4-19).

| stage | work at CITY (historical / navigable) | rate assumed | p50 village rungs · TOWN · CITY · METROPOLIS (historical) | navigable × |
|---|---|---|---|---|
| U-FORECAST (at S7b, on the main path; its own §12.4 row, BCR-11) | ≈ 2 000 way edges, ≈ 20 000 `hydro` cells in `R`; P5–P7 over ≤ 10 voids | Dijkstra ≈ 0.3 µs per edge relaxation; cell scan ≈ 50 ns | ≤ 1 · 1 · 3 · 6 ms | 1 |
| T1 U-NET | ≈ 12 km / 40 km of runs, ≈ 1 000 / 3 500 chain vertices; 5 500 plot connections | insertion ≤ 8 µs (§12.4); `corridorUnion` at S9's rate per km; a connection ≈ 0.4 µs by the grid index | — · 6 · 18 · 45 ms | × 2 |
| T2 U-SYS (catacomb, cavern, quarry, vaults, buried) | catacombs ≤ 300 grid nodes per complex, ≤ 5 complexes; caverns ≤ `caveKmPerKm2` × the frame; quarries one chamber per working; vaults ≤ 60 chambers | as T1 | 2 · 5 · 15 · 35 ms | × 1.3 |
| T2 U-SYS ruin | a sunken district of ≤ 15 ha: ≤ `maxChambers` 1 500 chambers, ≈ 400 galleries; the distinctness measures ≤ 4 times; ≤ 3 monuments, each one `layTiers` of ≤ 8 tiers (≤ 0.5 ms p95 each, J-V4.87); the column grids | as T1 | 1.5 · 6 · 12 (p95 ≤ 20) · 20 ms | 1 |
| T2 U-SYS arch vaults, terminal cistern, foundations (C4-110-11) | arch vaults ≤ `raised.vaultCap[rung]` (240 at METROPOLIS, BCR-45), O(spans); the foundation obstacles by the static index | ≈ 5 µs per span; ≈ 1 µs per index query | 0.2 · 0.3 · 1 · 2 ms; p95 ≤ 3 ms | 1 |
| T2b U-ACCESS | the overlap and proximity queries over every part's static index; the buildings over voids by the index; the excavation reading a union-find over clusters | ≈ 1 µs per index query | 1 · 4 · ≤ 12 p95 · ≤ 30 p95 ms | × 1.5 |
| T3 U-FRONT (F6 included) | ≤ 300 plots historical, ≤ 1 500 navigable; ≤ 8 households per void cluster | S10 + S11 ≈ 16 µs per plot; 5 samples per plot by `pointLocate` ≈ 1 µs | 1 · 1 · 3 · 8 ms | × 4 |
| T4 U-CITY | ≤ 3 × 120 households, ≤ 400 plots; C1's read-only test | as T3; the visibility-graph MST over ≤ 200 openings | — · 1 · 4 · 8 ms | × 1.5 |
| T5 U-LINK | L1, L3 over ≈ 2 000 basements, L5, L6 | ≈ 1 µs per index query | 1 · 1 · 4 · 10 ms | × 1.5 |
| T6 tail S12c + S13a | ≤ 5 districts, ≤ 400 names | §12.4's rates | 1 · 1 · 2 · 4 ms | 1 |
| T8 U-RECONCILE | usually none; ≤ 100 households | S10b's reconcile rate | 0 · 0 · ≤ 1 · ≤ 2 ms | 1 |
| **tail total** | | | **≤ 10 ms p95 at each village rung (p50 ≈ 7.7); 26 · 71 · 162 ms p50 at TOWN · CITY · METROPOLIS; p95 ≤ 36 · 112 · 253 ms** | navigable p95 ≤ 61 · 192 · 343 ms |
| T7 S14 underground build (on first show of the layer) | ≤ 12 000 marks per band at CITY | §12.4's S14 rate | ≤ 6 ms per band at CITY | — |

**The first edit after the first paint (C4-19).** The tail yields between stages to a queued view request, never to an
edit, so an edit queued during the tail commits within §12.6's budget for its scope plus the tail's remaining p95
(T-V4-42).

**View.** Showing the layer or switching band re-rasters the visible tiles of the underground layer only (the ground's
ghost is the cached ground tiles composited at `ghostAlpha`): ≤ 150 ms to the lit band at CITY on the reference device,
the unlit band first within one frame (J-A68.88's order). The light pass's frame and bake budgets are §12.5's; a band's
bake is keyed by the band, so returning to a band reuses its bake.

**Edits** (§12.6's functions of scope): a tunnel edit ≤ 30 ms at CITY (its bounded blocks and their plots, the overlap
test); a depth offset ≤ 5 ms; `addUndergroundAccess`'s dry run ≤ 60 ms (a connector grid of at most 160 × 160 cells at the
default reach); a dwelling closure's first rung ≤ 60 ms for the building that digs and ≤ 60 ms more for each one passed
over, its qualifying test ≤ 1 ms (a plan query of the part's static index; V4 §3.8; SR3-11); the excavation reading ≤ 1 ms per commit (only the clusters the commit touches); a New random on a system
≤ its T2 share; the family, preset, ruins and TOWN-toggle adjusts at §12.6's *re-derive from S7b* row plus the tail's p95
(C4-04); Re-derive from the network stage ≤ the tail's p95; a raised way's add or removal adds ≤ 2 ms for its arch vaults
and foundations; a span's `use` edit ≤ 1 ms; a monument's count ≤ 1 ms; a retaining-wall edit's re-laid knots ≤ 5 ms, as a
depth offset.

**The second reconciliation's additions (2026-09-29).** `Foundations.apply` at an epoch ≤ 1 ms per 100 new footings at
CITY (one static-index query each; inside volume 6's `under.extend` row); the opening pass ≤ 0.1 ms per access it visits;
the village-working test ≤ 0.2 ms per village (≤ 10 workings, one index query each); the buried floor's terrace steps
inside the `raiseGrade` builder's own time, O(walls × elements within one wall's reach); a hood document's tail ≤ 12 ms p95
at every `contextRung` (the village rungs' ≤ 10 ms plus one catacomb complex's layout, ≤ 2 ms).

**Memory** (§12.8): part 0 ≤ 1 MB historical, ≤ 3 MB navigable at CITY; a ruin part ≤ 2 MB; each other part ≤ 1.5 MB; the
underground display list ≤ 2 MB per drawn band; ×2.5 at METROPOLIS.

**Exports.** A VTT band scene ≤ 1.5 s at CITY; the underground glTF ≤ 2 s; within §12.7's export laws.

**Pre-decided fallbacks** (in order, each triggered by the U0 spike's METROPOLIS navigable measurement and re-checked at
U5): (1) U-ACCESS's proximity sampling every 10 m; (2) the cavern and quarry caps halve (`caveKmPerKm2`, `workingMaxHa`)
and the ruin's `maxChambers` falls to 1 000; (3) U-NET's historical `drainMinHa` rises to 5 ha. Each is a table value with
a declared shift (§13.3).

## 7 Tests and acceptance bars

§13's families; every bar runs on generated output from U1 (V4 §8) and keeps the base's hook tests T11-1, T12-1, T14-1
and T63–T66 green on the same output. **Parity (C4-01):** no reference owns the underground — MFCG has none and FTG's
author states underground settlements unsupported (`research/findings/ftg-posts-c.md`) — so the parity metric is
invisibility **under the parity presets**: with a parity preset on and the layer hidden, a CITY renders pixel for pixel as
before M6-U (T14-1 as BCR-22 amends it), and no system but the tier's hidden sewer exists, no household goes below and the
ground's model digest equals the pre-M6-U digest (T-V4-35). Under the default presets the ground differs only by the
households and `preferred` uses S7b (6)–(7) send below: a declared one-time shift of the M6-U output version, recorded in
`plat/goldens/` at U1 (§13.3). **The look's precedent (C4-37):** the hatched-rock figure-ground (J-V4.31) is the look of
the reference family's dungeon and cave maps (`research/findings/watabou-extra-a.md` §2.7 and §2.8, the hatching and its
two-layer mask; `research/findings/dwellings-posts.md`, its "house-like dungeons"); nothing of it is copied, and the
owner's panel carries a side-by-side against a render in that style. Every other bar is a rule bar or a realism bar
without a reference source (§13.7; provenance `own`, PLAUSIBLE until the owner's panel, V4 §8).

| id | family (§13) | bar | tier (§13.8) |
|---|---|---|---|
| T-V4-1 | stage invariant | every run's invert knots fall monotonically in flow order at ≥ `minGradient`; every branch's downstream invert ≥ its receiver's at the junction — 0 violations on 500 seeds per rung × 3 families × 2 presets | PR (20 seeds), nightly |
| T-V4-2 | stage invariant | every run reaches an outfall along its tree path; every river outfall at `ContextVector.upstream` ≥ 0.5 and below every harbour mouth and mill intake; every sea or lake outfall ≥ `harbourClearM` from a harbour basin and the harbour-mouth chain; a moat or field outfall only where none was admitted; every outfall invert ≥ the shore height + `freeboardCm`, or `W_OUTFALL_LOW` reported (C4-10) — 0 violations | PR, nightly |
| T-V4-3 | stage invariant | every crown ≤ `coverMaxCm`; the ground's terrain and arena digests identical with the tail run and not run (nothing trenched, no ground geometry written by any tail stage); T8's use writes on ≤ 2 % of CITY seeds at the default presets, each in `requestedVsBuilt` (C4-02) | PR |
| T-V4-4 | rule bar | every main's bore and headroom equal II.7.2's law at its downstream served area; `navigable` equals the thresholds' verdict; historical preset: navigable runs ≤ 10 % of network length at the CITY median (realism, own) | nightly |
| T-V4-5 | conservation | Σ served area at the outfalls + unsewered area = the plot and corridor area of `R` within 0.1 % | PR |
| T-V4-6 | statistics | `channel` plots connected (to a main or culvert, BCR-28) ≥ 90 % at CITY historical; `pit` connections per band within ± 3 s.e. of `pitShareByBand` over 500 seeds; every `serves` id within `reachM` of its run or on its drain | nightly |
| T-V4-7 | rule bar | `follow-streets`: every way run's centreline equals its way's spine positions; `drainage-lines`: every cell step follows D8; `mixed`: every culvert on a drainage line of catchment ≥ `culvertCatchHa` | PR |
| T-V4-8 | forecast | on 200 CITY seeds, navigable preset: the forecast capacity within ± 25 % of the built on ≥ 90 % of seeds; historical: the forecast navigable length within ± 30 %; each void kind's forecast capacity within ± 30 % of the built on ≥ 80 % of seeds (C4-40); P6's verdict equals C0's on 100 % (C4-20) | nightly |
| T-V4-9 | the owner's rules | T12-1's rows (U1–U3, ≥ 1 access per neighbourhood, 0 plots under excluded ground, 0 ground writes) on 500 generated seeds per rung, both presets; every entrance of an underground building on a tunnel, gallery or walkway kerb or a chamber wall has `faces: 'tunnel'` (C4-64 (4)) | nightly |
| T-V4-10 | rule bar | every lived run stretch of `2 × shaftSpacingM` holds a grating, or the gap is reported with its reason | nightly |
| T-V4-11 | rule bar | each catacomb complex: its extent ≥ min(its need, the cap-limited growth) and ≥ `extentFloorM2`; one floor, the level-floor admission holding (C4-24); no node on `damp` or `flood` ground or a tombstone; its stair on its burial face (C4-50 (8)) | nightly |
| T-V4-12 | rule bar | a non-fissure cavern only on `soluble` or `volcanic` geology, a fissure only on `ordinary` rock at hilly or mountainous relief and never with a `hall` (C4-53); its length ≤ `caveKmPerKm2` × the frame's km²; `water` ⇔ floor ≤ the water table; every `hall` floor ≥ the water table + `hallDryCm` and no undercity plot on a floor at or below it (C4-14); a mouth only at a candidate whose cover < `mouthCoverCm` | nightly |
| T-V4-13 | rule bar | quarries: Σ workings area × headroom × (1 − `pillarShare`) within ± 10 % of the volume law; no working with cover < `minCoverM`; one shaft per working | nightly |
| T-V4-14 | rule bar | vaults under public ground (a cistern under its own host's court); cisterns only where `dist.water` > `cisternDistM`; every bridge vault at a deck end risen ≥ 150 cm | nightly |
| T-V4-15 | rule bar | T65-8 extended: a buried town's squares are `square` chambers; its buildings' entrances are portals on their storey chambers; **the terraced fixture (TR-11):** a `raiseGrade` over a terraced quarter keeps each tombstoned wall's step in the buried floor — every high-side gallery vertex and chamber floor within 10 cm of the high side's last live datum less the rule's depth, a stair step in every gallery crossing a wall's line — and a region with no wall buries as before | PR |
| T-V4-16 | stage invariant | no element of a system laid after the town within `surfaceClearCm` of the ground lies under water or within `foundationClearM` of another building's basement at generation; after a water or terrain edit every such element is `flooded` or `W_VOID_UNDER_WATER` is reported (C4-43) | nightly |
| T-V4-17 | isolation | T65-6 on generated output: re-deriving each system leaves the ground and every other part byte-identical but for its links' far ends and, for a `cavern`, `ruin` or `quarry` system, volume 1's opening places over the openings it makes and removes (SLR2-08); a New random on a carved host re-carves its neighbourhoods' cores, and one on the neighbourhood resurrects the cleared parts before re-carving, both undoing exactly (C4-13) | PR |
| T-V4-18 | the undercity | T65-1 – T65-5 on generated output; every neighbourhood has a core ≥ `mainChamberM2` with its plaza ring and the black market fronting it; its chambers joined by walkways; its lifelines (access, air, water) present on 100 % | nightly |
| T-V4-19 | statistics | neighbourhood counts and `H` follow II.7.5's size law on 500 seeds per rung; on 200 paired seeds a higher `wealthLevel` never raises `H` and a higher `disorder` never lowers it | nightly |
| T-V4-20 | statistics | link frequencies per pair of kinds within ± 3 s.e. of `LinkRule.chance` over 500 seeds; spacing ≥ `linkSpacingM`; `flooded` only below the water table | nightly |
| T-V4-21 | knowledge | T30-5's enumeration on an underground fixture: at tier `public` no secret access, link, `dug` gallery, lifeline or concealed place in any view, label, reader answer or export, with its lights; at `secret` all of them | PR |
| T-V4-22 | the closure | T66-1 – T66-4, T66-6 on generated output; every connector keeps `foundationClearM`, its floor above the water table and inside its band, its length ≤ `2 × digReachM`; the A\* route identical on the five engines | PR |
| T-V4-23 | lifecycle | 1 000 hand-applied fade rounds on the hook city: only ladder moves (silt only from in use; collapse only from caved in; flood only below the water table; no `demolish`); `extend` on a fixture whose growth crosses a sealed run reopens it on 100 % of seeds and digs no new run on its line | nightly |
| T-V4-24 | statistics | clearance draws within ± 3 s.e. of `1 − (1 − clearancePerYear)^years` when `disorder` is under the threshold; none above it | nightly |
| T-V4-25 | light (§8.3's row family) | underground, the CPU reference gives a floor point with no light and no shaft in reach ≤ `ambient.underground` × its albedo; a floor point under a grating at noon is brighter than every point of its band without a light or shaft in reach; a torch in one run adds 0 to a parallel run through 3 m of rock; the GPU pass within §13.4's tolerance | PR (fixture) |
| T-V4-26 | light | an unlived network or system carries no light but its shafts; every underground light's height ≤ its host's ceiling − 30 cm | PR |
| T-V4-27 | visual regression | the underground hook fixture in `cutaway`, `overlay` and `solo` at each band, day and night, in every family, against its goldens; only the drawn band in full; hiding the layer restores the ground's golden pixel for pixel | milestone |
| T-V4-28 | export | every band's dd2vtt validates; every void kerb and chamber wall is a `line_of_sight` segment; a portal at every access, link and underground entrance the key admits | milestone |
| T-V4-29 | export | the underground glTF and CityJSON validate (§11.1's validators); every void solid's normals face inward | milestone |
| T-V4-30 | determinism | the tail's per-part digests, U-ACCESS's links and accesses and T8's writes identical on the five engines of §6.5 and between generation and replay; a building's dig draw unchanged by a void added under another kind (C4-58) | nightly |
| T-V4-31 | locality (§7.3's oracle) | a tunnel edit changes only the blocks it bounds, N8's plots and its overlap links; a ground edit changes no tunnel's geometry or invert; a depth offset changes only invert knots; the family, preset, ruins and TOWN-toggle adjusts change exactly the S7b scope the oracle predicts (C4-04); a stage-2 switch edit — across 0 in either direction, or inside (0, 1] — changes nothing that the stages before the switch's first reader stage commit, the underground re-derived by T1–T8 after volume 1's re-derivation (V1-3.15, *The switch's edit*; SLR5-01) | PR (B-EDIT sequences with underground events) |
| T-V4-32 | performance | V4 §6's p95 bars on B-CITY-lite (PR tier) and at METROPOLIS (nightly) | PR, nightly |
| T-V4-33 | migration | a document saved before U-NET's version opens with its ground digests unchanged, its underground made by the upgrade's diff, no sewer-front plots or undercity, and the diff offering Re-derive from S7b (C4-38); a pre-item-109 document keeps every catacomb complex (`overCount` flagged, church-sourced ones re-sourced or `legacy`), gives every access and link cause `legacy`, keeps a cavern's dwellings only where its cluster is accessible, gains accesses only, and holds no ruin (C4-59) | milestone |
| T-V4-34 | dossier (B-DOSSIER) | a TOWN dossier with a sanitation record has sewers on 100 % of seeds; a subterranean catacomb record has a complex on a burial face (a charnel vault below TOWN); a subterranean institution no allocation takes has an underground by L5 on 100 % of seeds, the rung used reported (C4-07); a COUNT or GUILD subterranean record places each member `#k` below and a SIZE step one compound (C4-34) | nightly |
| T-V4-35 | parity presets | under `MFCG` and `FTG` no system but a CITY's or METROPOLIS's hidden sewer exists — no ruin and no cavern at any rung (g item 109 (i)'s no-op pin) — no undercity, no link, no underground plot, no undercity or void-dwelling allocation, and the ground's model digest equal to the pre-M6-U digest on 200 seeds per rung (C4-01, C4-46) | PR |
| T-V4-36 | editing | a two-point `drawTunnel` between points near ways routes along them, its kind derived when not given; a depth offset past the cover limit is refused naming the nearest lawful offset; a `drawWay` on the underground is refused offering `drawTunnel`; a `placeAccess` on public ground takes a neighbourhood kind (C4-31); a ruin draw follows the ruin's axis (C4-62) | PR |
| T-V4-37 | dossier (C4-03) | B-DOSSIER fixtures with `require` at TOWN on a site with no void: ≥ 1 neighbourhood on 100 % of seeds, bound to the `Underground city` record and named by it; `forbid`: 0 neighbourhoods and no allocation | nightly |
| T-V4-38 | dossier (C4-05, C4-64 (2)) | every surveyed subterranean or sanitation record (`Sewage system`, `Underground network`, `Underground city`, `Black market bazaar`, catacomb, crypt, mine, cistern) binds to its map entity by V4 §2.3a on 100 % of B-DOSSIER seeds; a crypt record binds to its church building, which has `Basement.crypt`, never to a system or a plan room | nightly |
| T-V4-39 | lifecycle (C4-08) | a Re-derive from the network stage, and an epoch's `extend`, after a `drawTunnel`, a `delete` of a generated run and a depth offset keep all three on 100 % of B-EDIT sequences | PR |
| T-V4-40 | editing (C4-09; T101's pattern) | an underground skeleton fixture (tunnels, a ruin chamber, a catacomb gallery, a link, an access, a required neighbourhood) authored as a skeleton file, on the canvas and through the tool API gives one model digest | PR |
| T-V4-41 | existence (C4-18) | at U2, on 200 CITY seeds: ≥ 1 sewer-front neighbourhood on ≥ 60 % (navigable) and ≥ 10 % (historical); failing, the pre-decided fallback (BCR-27, navigable `coverCm` 600) applies and the bar re-runs | nightly |
| T-V4-42 | performance (C4-19) | the first edit queued during the tail commits within §12.6's budget for its scope plus the tail's remaining p95; the tail yields only to view requests | PR |
| T-V4-43 | presence (C4-46; V12's `presence` rule) | caverns and ruins present at every rung, THORP to METROPOLIS, at their rows' rates (± 3 s.e., 500 seeds per rung on forced-geology and forced-source sites); the tail within 10 ms p95 at each village rung | nightly |
| T-V4-44 | structure (C4-47; V12's `twoSample`) | ruin systems beat cavern systems on `plan.rightAngle` and `plan.straight`, ≥ 30 systems each; every ruin `hall` and `temple` chamber's `Chamber.columns` equals the ruin program's drawn dots point for point, and none lies inside a monument's tier-0 ring grown by 100 cm (C4-64 (5)) | nightly |
| T-V4-45 | distinctness (C4-47; V12's `paired`) | each ruin differs from the district fabric above it on `ruin.blockArea`, `grid.r4` and `grid.axis` by V12's margins, `W_RUIN_SIMILAR` on ≤ 5 % | nightly |
| T-V4-46 | dossier (C4-47) | on 100 % of B-DOSSIER seeds a dossier carrying `ancient_ruins` or a `ruined-landmark` record has a ruin system, its marker linked, or a reported reason | nightly |
| T-V4-47 | no-op pin (C4-47; g item 109 (i)) | with the ruin chance 0 and the relief, boost and fissure rows at the base's values, the output is byte-identical to the base's | PR |
| T-V4-48 | access (C4-48; SR3-11) | 0 dwellings in an `unexcavated` cluster on 100 % of seeds at every rung; every access and link carries its `cause`; **the closures' clause (at U4):** on T-V9-38's three-building fixture the group `[addUndergroundAccess { building: the second building }, the dwelling declaration]` digs from that building to the cluster's element nearest its footprint, opens the cluster (cause `edit`), and the declaration adds no second access (J-SS3.10); the declaration alone digs from the first building (plan distance, then address) with `bend.under.accessDug`, lists the other two in `PreviewResult.alternatives`, and its undo removes the access and leaves the cluster `unexcavated`; an untargeted `addUndergroundAccess` not grouped before a dwelling declaration never targets an `unexcavated` element; a skeleton prefix holding the same group gives the model digest the edit gives (T-V4-40's pattern) | PR, nightly |
| T-V4-49 | access (C4-48; V12's `trend`) | the accessible share of voids rises with the buildings over them: `voidAccessible` binned, 40 towns per rung from THORP to METROPOLIS on a forced-void site | nightly |
| T-V4-50 | catacombs (C4-49, C4-64, C4-65 (2); 500 seeds per rung) | ≤ 1 complex at TOWN, counts within `CatacombRule.count` at CITY and METROPOLIS, `churches` counting `v.parish_church` (SR1-24) and each church on a live sky island once (0 sky faces among the candidates); every complex's source a burial face or, at CITY and above, a quarry ossuary — 0 sourced at a church building; no quarry ossuary at TOWN; the largest complex (by `extentFloorM2`) under the primary (at generation the highest-ranked face holding one); every crypt join in a building with `Basement.crypt`, where an element lies within `accessReachM` of its crypt ring, cause `crypt`, its head in the crypt; 0 catacomb accesses of source `system` in a church-class building (crypt column `always` or `basement`), and every catacomb access headed in a building with `Basement.crypt` of cause `crypt` (V03's T-V3-23 (d)) (the cathedral's crypt is V03's bar) | nightly |
| T-V4-51 | ratchet (C4-50, C4-65 (1); V12's `exactMonotone`) | `catacomb.extentM2` never decreases across every epoch sequence of H-100 and V06's trajectories, and across replay, Re-derive and New random; **the decline case:** a town's catacomb carried into a village by V07's hand-off down keeps its extent, is stagnant with `blockedBy` holding `'rung'`, and its `fill` never falls | nightly |
| T-V4-52 | ratchet (C4-50; ST-03) | growth per epoch ≤ `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)` (J-VI.6), or ≤ `opts.capM2[id]` where volume 6 passes it; a stagnant complex's `fill` rises while its extent holds; **the overtaking fixture:** on 100 CITY histories of V06's trajectories in which a newer extramural cemetery comes to serve more burials than the rank-1 churchyard, the newer complex becomes the primary and, within the epochs its cap allows, the largest complex, no complex's extent ever falling and the older one held by the rank cap in growth only; **the calamity deaths (TR-10):** an epoch whose `opts.deaths` is D raises each face's need by its `burialShare` × D × `ossuaryShare` × `m2PerBurial` and never its cap, and `deaths` absent reads 0 (V6's T-V6-69) | nightly |
| T-V4-53 | overlap (C4-51) | on a fixture whose sewer crosses a sealed ruin chamber and a cavern gallery at a shared depth: a breach link on 100 % of seeds and both voids `accessible`; no link where the vertical gap exceeds `overlapShaftM` but by the shaft chance; every such link carrying its cause | PR |
| T-V4-54 | depth keeps secrets (C4-52; V12's `floor` on `voidSealedDeep`) | at METROPOLIS on a forced deep-void site, the sealed share of chambers deeper than `dig.reachM` below every footprint over them ≥ `sealedFloor` (0.5); pre-decided fallback: `decayM` halves once, then `maxM` falls to 12 m | nightly |
| T-V4-55 | caverns (C4-53; V12's `trend`, `higherWith`) | cavern presence rises with relief and is higher with mining than without, per relief class | nightly |
| T-V4-56 | caverns (C4-53) | every mine–cavern breach lies within `breachM` in 3-D; **the village working (TR-12):** at a village rung, on a forced-cavern fixture with a mining use's outside-plot working, one `AccessPoint` of cause `mineBreach` and no link on 100 % of seeds where a cavern or ruin element lies within `breachM` of the working at a depth within its `mine.workingDepthM` row, none otherwise — at T2b, and for a working opened at an epoch by `AccessPass.run` over `scope.workings` with the epoch's `seq` (V6's T-V6-68; V07's T-V7-39) | PR |
| T-V4-57 | ruins (C4-54) | every ruin link obeys the connection graph: U-ACCESS (a)'s overlap test, (b)'s reach, (f)'s reuse admission | nightly |
| T-V4-58 | ruins (C4-54; V12's `rate` on `ruinChosen`) | where a ruin and a cavern both qualify, the undercity takes the ruin at `w_ruin ÷ Σ w` ± 3 s.e., ≥ 200 undercities | nightly |
| T-V4-59 | knowledge (C4-56) | at `public` no unexcavated element, label or light in any view, reader answer or export; with `showUnexcavated` off none is drawn at any key | PR |
| T-V4-60 | siting (C4-15; item 103 (e)) | underground members' supply, clientele and competition distances by `underDistance` beat a random-placement baseline; no undercity guild seat within the garrison's repel radius in plan | nightly |
| T-V4-61 | custom content (C4-16; B-DOSSIER) | custom fixtures — tag only, scene archetype only, an active chain with a subterranean resource — each reach the underground (a placement below, or the chain mine) | nightly |
| T-V4-62 | arch vaults (C4-110-1, C4-110-2; 200 CITY and 100 METROPOLIS seeds with raised ways, and the second known-city fixture) | an arch vault in exactly each `vault` span, keyed by its way and raised-way piers — none over a part-0 way, water or a flood cell; each headroom within [`minHeadroomCm`, `maxHeightCm`] and each fall under the span ≤ `maxFallCm` (BCR-45); a door on an open face, or `W_ARCH_VAULT_NO_DOOR`; 0 arch vaults in an undercity cluster, a forced-vault count, U-FADE's candidates, an L3 or U-DIG target or a sewer-front block; each `collapsed` exactly when V4 §3.5.4 (d) (2) says so (the span's or a bounding support's `state` `ruined` or `cleared`, a landfall's included, or the span breached or dismantled; SL-31) | nightly |
| T-V4-63 | lifecycle (C4-110-3; B-EDIT sequences with raised-way events) | on 100 %: a removed raised way, generated or drawn, leaves no arch vault, door, link or access after its removal and after a regeneration; its undo restores them with the same ids; a user-added raised way's `vault` spans have their vaults in the same commit; a span's `use` edit lays or removes exactly that vault and survives a regeneration; an epoch that founds a raised way (V06's `under.extend`) lays its vaults in the epoch's commit | PR |
| T-V4-64 | ground parts (C4-110-4) | 0 sewer edges, junctions, runs or gratings on a raised part; no tunnel `follows` a raised way; no street vault under a raised ramp; no bridge vault at a raised deck; every access's `ground.host` a part-0 face, none inside a raised-way pier's footprint | PR |
| T-V4-65 | foundations (C4-110-5) | 0 open void floor or open gallery stretch within reach of a foundation obstacle (raised-way piers to `supportFoundationCm`, retaining-wall footings, buried aqueduct stretches); 0 later-system elements laid within reach; 0 dig accesses from a raised-way pier; removing the raised way returns the older voids' stretches to their state without it; **at an epoch (TR-07):** `Foundations.apply` over a raised way founded over a lived cavern chamber, a basement grown over a ruin gallery and a terrace levelled over a cavern collapses exactly the element set a regeneration of the same state collapses (V6's T-V6-67), returns the vacated dwellings' households by id (TT-07) and draws nothing | nightly |
| T-V4-66 | the aqueduct seam (C4-110-6) | the base's raised-way set, span uses and aqueduct verdicts byte-identical with the underground tail run and not run; every cistern where `min(dist.water, the nearest delivery point) > cisternDistM`, or forced by a record; one terminal cistern per `cistern` terminal, under its conduit house's yard or public ground with a `well`, or `W_TERMINAL_CISTERN_SKIPPED`; the terminal building's plot connected as `channel` where a run lies within reach | nightly |
| T-V4-67 | retaining walls (C4-110-7; terraced fixtures and 200 hilly CITY seeds) | 0 crowns above the levelled ground at any knot, the wall-face knots included, and at 1 m samples between knots; a drop at every wall crossing whose fall exceeds `minGradient ×` its length; T-V4-1 still holds; with the terrace rows off, U-NET byte-identical to its output before item 110 | nightly |
| T-V4-68 | monuments (C4-110-8) | every monument's tiers nest (each ring inside the one below, V02's ST6 test) and its stairs abut; `standing` ≤ the tiers laid; the laid top + `ceilingClearCm` ≤ the chamber's ceiling ≤ `burialCm − 100`; `lay.truncated` counts both cuts; a monument laid twice from the same seed is byte-identical; a ruin without the `monument` cell draws nothing on the `'tiers/*'` keys and is byte-identical to its output without it; no plot, walkway or pin on a standing ring or mound | PR |
| T-V4-69 | no-op pin (C4-110-9; g item 110 (f)) | with the terrace, raised-way and deck-plot rows off and no `CultureRow.monument`, the underground's output is byte-identical to its output before item 110, on 200 seeds per rung | PR |
| T-V4-70 | laziness (C4-110-9) | opening every district in two orders leaves the arch-vault set, the span uses and the tail's per-part digests byte-identical (V01's T-V1-15 on the raised-way set) | PR |
| T-V4-71 | layers (SL-05, SL-04; V05's T-V5-26) | on 100 % of B-CITY seeds with sky islands: 0 dig hosts, basement-access hosts, crypt-join hosts or catacomb candidates on the sky layer; `R` holds no sky district; 0 underground elements, links or accesses with an end on the sky layer; the catacomb count equals the count with each island church counted once | PR, nightly |
| T-V4-72 | epoch contracts (ST-50, ST-16, ST-17, ST-23; V06's participants) | (a) a TOWN whose `Features.sewers` turns on at an epoch gets U-NET whole, every pre-existing underground entity and the ground byte-identical; (b) across V06's trajectories each catacomb source, public opening and overlap shaft key is drawn once, the same value at every epoch; (c) 0 underground strikes in the fabric pool or counted against a district's `fabric` cap; (d) a mining use opened at an epoch has its working in that epoch's commit with its overlap test, and every stone working reads worked out outside the epoch that laid it; (e) `AccessPass.run` with a scope, run twice, adds nothing the second time; (f) F6's new dwellings in a cluster that `under.access` made accessible this epoch are filled only by volume 6's relocation (V6 §3.18.1 (4); T-V6-52), none of their households new; the crowding hook's S7b (6) allocation (V6 §3.6 (1); BCR-V6-28 (c)) runs at `growth`, before `under.access`, and seats only on runs and clusters accessible before it; ground + underground + sky households equal the epoch's target (TR-08; TT-02) | nightly |
| T-V4-73 | sources and closures (ST-22, ST-21, SL-30, SL-31) | (a) a dossier event removing a ruin's `ancient_ruins` source leaves the ruin whole with `source.ref` null and `W_RUIN_SOURCE_REMOVED`; (b) a churchyard whose church use closes freezes its complex (`sourceClosed`, `fill` unchanged), and a church-family use arriving on the plot resumes it with the same face lineage; (c) a landfall over a grating, a street stair and a catacomb stair bricks each, cause `convert:fallIsland`, and the batch in which its host leaves the decoration — at an epoch, and by a hand op — reopens it (V6 §3.5.2; TT-07); the arch vault under a span a landfall ruins is `collapsed` in the same batch | PR |
| T-V4-74 | public ground, places and the report (SL-15, SL-06, SL-08, SL-03) | (a) on B-CITY seeds with volume 1's dispatched squares: gratings, lifeline stairs and forced vaults land on square and green blocks as on L1 squares, and a buried town's square blocks are `square` chambers; (b) after the tail, one `HoodPlace` of kind `opening` per public opening of role `access` and per catacomb entrance, 0 ground geometry writes by the tail (T12-1), the ground digest finalised after T8; after an epoch that opens a sinkhole, after a `CatacombGrowth.grow` that founds a complex, after an edit that deletes a public opening or sets its `role` to `light`, after a `regenerate` of a cavern system and of a ruin system that carry openings, after a `delete` of a chamber carrying a sinkhole and of the ruin element carrying its entrance (SLR2-08), after a dwelling declaration whose closure makes a public opening (a sealed cluster with no qualifying building above it, so that the base's second rung places the opening; SLR4-06), and after an `editTable` that raises `fabric.extensionWeight` from 0 to 1 (J-V4.121), the opening places equal V1-3.7.1's selection over the standing accesses — 0 orphan places, 0 unplaced openings (SLR1-04); with the local-place step unregistered or the stage-2 switch at 0, 0 places and their count reported, and after an `editTable` that lowers the switch from 1 to 0, 0 opening places, each tombstoned (retired by §6.3's carry-over) as a fate of the edit and restored by its undo (SLR4-06); after either switch edit, the underground re-derived with the ground by T1–T8, never held byte-identical (SLR5-01); (c) an outfall's surface head draws in an opened close-up with the underground layer hidden, and not for a key that does not admit it; (d) one `ruin.node` line per `magical_node` deposit at `ruinCentre()`, none otherwise; (e) every access of source `opening` has role `access` but a skylight's `light` (SLR1-20) | PR |
| T-V4-75 | hood documents (SLR1-01, SLR3-01; V01's T-V1-20) | on 100 hood documents per `contextRung` (TOWN, CITY, METROPOLIS) on forced-cavern sites with a temple anchor: 0 sewer, quarry, buried or undercity elements; 0 vaults but a declared raised way's arch vaults and terminal cistern; ≤ 1 catacomb complex, its source a burial face inside the hood, formed by TOWN's chance; caverns and ruins at their rows' rates at the hood's `contextRung`; U-FORECAST's P5 kinds within {ruin, cavern, catacomb}, its catacomb expectation over burial faces inside the hood only, and P6's verdict none; U-FORECAST called after the one-district allocation (V1-3.10.1 step 6), P7's `voidDwellingHouseholds` ≤ `voidDwellings.share` × the one-district allocation's poorest-band households, and the underground pseudo-district's allocation ≤ `forecastSafety` × that forecast (volume 1's T-V1-20); the tail ≤ 12 ms p95 | PR (20), nightly |

**The owner's panel** (§13.6 without a reference): at U5 the owner rates, blind to which is which, ten CITY and five
METROPOLIS underground bands (historical and navigable, each mode, a ruin among them) for legibility and plausibility,
beside one render in the reference family's hatched style (C4-37); an unrated panel
follows §13.6 (7) — the build continues, the milestone is *provisional — not rated*.

## 8 Build plan

**Where it slots (J-V4.46; BCR-13).** The underground is staged by the owner "after the city is mastered" (DEFINITION
§4): it is milestone **M6-U — the underground layer**, after M4 ("mastered") and, by default, after M5 (stage 2). It
reads three services of volume 1's `@plat/hood`, which V01 builds in its W15 at M5 (V01 §8.2): `fabricSignature` (U3, the
ruin's distinctness step, V4 §3.5.0a (7)), `districtsAbove` (U4, C5's parent and the clerk's ruin answer, V4 §3.6, §4.5)
and the local-place step's opening pass (U4, T6 and the commits of V4 §3.10). It may run as a parallel lane beside M5 when
the owner so orders (owner question 1); run so, U3's distinctness step and U4's C5 are scheduled after W15's services
land, and T6 runs the opening pass only while `@plat/hood`'s local-place step is registered — a registry lookup (§4.12):
absent, no opening place is made and their count is reported (V4 §3.11), and the first tail run after it registers makes
them, a declared shift of the places (§13.3) (SLR1-05; J-V4.108). Its hooks are M4's (the records, the tools, the closure rule, the basement row, the underground hook
fixture); it builds on M2b's placement solver and granularity law, M3a's edit system and API, M3b's exports, lights and
night view. Staffing per the owner: rulings on the Fable seat, building and verification on Opus seats.

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **U0 — spike** (risk retirement) | U-NET N1–N10 on B-CITY-lite (the graph, the tree, the root-first invert pass, the commit and `corridorUnion` on part 0); the tail scheduler with `phase` and its yield to view requests; U-DIG's A\* on the 160 × 160 grid; the METROPOLIS navigable tail on a forced-void site (T1, T2 with a ruin, T2b) | T1's p95 at CITY ≤ 40 ms (historical) and ≤ 80 ms (navigable); **the METROPOLIS navigable tail p95 ≤ 343 ms and U-ACCESS's sample count at METROPOLIS measured, each V4 §6 fallback triggered by it** (C4-19); T-V4-1, T-V4-3, T-V4-5 green on 20 seeds per rung; the A\* identical on the five engines; the first paint unchanged (§12.5); `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 1.25–1.75 |
| **U1 — the network** | U-NET whole (N0–N12 with N3a and N11a, the three families, both presets; the part-0 reads, and N6's wall-crossing vertices with N7's drop, C4-110-4, C4-110-7: 0.25 pw); U-FORECAST wired into S7b (BCR-19) with P1–P6, `forecastSafety` and its own §12.4 row (BCR-11); T8 (U-RECONCILE); `Outfall` from S1 (BCR-1); the drain rule and `drainOf`; the two controls (BCR-9) with their S7b locality (BCR-37); the cut-away with its three modes and the band ladder; the `rock` and `void` roles; GeoJSON, SVG and PNG per band; the tail's S13a for runs; migration (V4 §4.6) | T-V4-1 – T-V4-8, T-V4-30, T-V4-33, T-V4-35, T-V4-39, T-V4-42, T-V4-64 (the network's part), T-V4-67; T14-1 as BCR-22 amends it (pixel parity under the parity presets); **the default presets' one-time ground shift recorded as the M6-U output version's declared shift in `plat/goldens/`** (C4-01); the tail within V4 §6 at CITY; `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 4.75–5.75 |
| **U2 — the sewer-front neighbourhoods** | U-FRONT (F0–F5) with the surplus absorption, members and clandestine modes; the neighbourhood accesses and shafts; the sewer light rows; `Junction.chamber`; labels of runs and the sewer-front district; VTT per band | T12-1 and T-V4-9, T-V4-10, T-V4-25 (sewer part), T-V4-26, T-V4-28, **T-V4-41 (existence, with its pre-decided fallback)**; the crowding hook by hand; `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 2.75–3.75 |
| **U3 — the void systems** | U-SYS: **the ruin** (V4 §3.5.0a: sources, culture and axis, plan families, decay, distinctness, `RuinRecord`, `ruinCentre`; 2.5–3.5 pw), catacomb (layout), cavern with **the mining boost, fissures and the mine breach** (0.5–1 pw), quarry and mine voids with the surface split and chain mines, vaults, buried, with `Chamber.kind`; **item 110's parts** (1–1.75 pw; C4-110-12): the arch vaults and `ArchVaults.reconcile`, the terminal cistern and the aqueduct-delivery cistern test, `foundationObstacles`, the ruin's monuments through V02's `layTiers` and its modelled columns; the system programs (the `ruin` program, the monuments, the pillars) and labels; the dossier's system forcing (BCR-14, V4 §2.3a) | T-V4-11 – T-V4-17, T-V4-38, T-V4-43 – T-V4-47, T-V4-55, T-V4-56, T-V4-61, T-V4-62, T-V4-64 – T-V4-66, T-V4-68, T-V4-69, T64-1 – T64-3, T65-4, T65-6 – T65-8 on generated output; `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 8–11.75 |
| **U3b — access and excavation** | U-ACCESS (T2b): overlap and mine breaches, proximity links, dig draws, public openings, reuse, the excavation reading; F6's void dwellings; the unexcavated style and `showUnexcavated`; the forecast's P7; **the second reconciliation's access parts** (TR-12, SLR1-04: 0.25 pw): the village working's breach at T2b and over `scope.workings`, the public-opening `placeAccess` and the opening pass's edit callers (the stage-2 switch's edit reaching the pass only as its re-derivation's T6, V1-3.15, so nothing of its own to build; SLR4-06, SLR5-01) | T-V4-20, T-V4-21, T-V4-48, T-V4-49, T-V4-53, T-V4-54, T-V4-56's village clause, T-V4-57, T-V4-59; `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 2.25–3.25 |
| **U4 — the undercity, the catacomb rules and the closures** | U-CITY (C0–C6) with `District.core`, the read-only lifeline test, the rank draw, the carve post-pass, the plaza ring and visibility-graph walkways; `underDistance`; the forced vaults; **the catacomb rules** (burial-face candidates and catchments, the count, the rank cap, the ratchet, stagnation and fill, the quarry ossuary, the crypt join, the burial-face entrance, the charnel vault; 1.25–1.75 pw); **the crypt derivation**, moved from volume 3's P2 (`Basement.crypt` with its seed, growth and rank — volume 3 §3.7.4 steps 1–3, BCR-V3-20 —; volume 2's crypt ladder with its `raised` form and lift, BCR-V2-28, the lift and the half raise acting on the ground wings over the basement's ring (volume 2 §3.14.5 (d); seam S23R6-02); the stair-entered test and the whole basement of a crypt no stair reaches (volume 3 §3.7.4's *A stair-entered crypt* and its `always` bullet; seam S23R5-01); and volume 3 §3.7.1's crypt clause of `basementDoor(b)`, the door point off the crypt's vault (file f item 578), whose first reading moves a walk-out church's outside door off its crypt and volume 1's entrance reserve with it (V01 V1-3.8.2 step 5; its close-up chunks stale by V1-3.8.3's digest); file f item 238, S23-20, S23R5-04: 0.25 pw, unchanged); the hand-offs of V03 and V07 (the join on `Basement.crypt`, the church-class host rule, `Entrance.faces`, `'rung'`, `v.parish_church`, the maintenance mode; C4-64, C4-65: 0.25 pw); the hood line (V4 §3.1; SLR1-01: a gate over the existing steps, within the range); U-LINK L1, L3, L5 (its always rung and the dug network), L6, L7; U-DIG's pieces for `addUndergroundAccess`, the lifeline closure and L5, with the dwelling closure's way in and the grouped access (BCR-V9-22 as file f item 372 applies it; SR3-11; absorbed in the range); the read-ahead (V4 §4.7); the undercity light rows and labels | T65-1 – T65-5, T66-1 – T66-4, T66-6, T-V4-18, T-V4-19, T-V4-22, T-V4-34, T-V4-37, T-V4-40, T-V4-48's closures' clause, T-V4-50 – T-V4-52, T-V4-58, T-V4-60, T-V4-71, T-V4-74, T-V4-75; T-V3-23 (j)'s door and basement-extent clauses (volume 3; they run from M6-U on); the crypt derivation's first reading recorded in the M6-U output version's declared shift (§13.3) — the churches' crypts and their basements, the `raised` form's lifted wings, and each walk-out church's outside door moved off its crypt with volume 1's entrance reserve — beside U1's forecast shift (C4-01) (seam SLR6-01); `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 5.25–7.25 |
| **U5 — time, 3-D and hardening** | U-FADE, `extend` (with the wall drops over `EpochScope.levelled`), `CatacombGrowth.grow`, `UndercityEpoch.reread`, `ArchVaults.reconcile` over `EpochScope.raised` and access at an epoch (BCR-6; V06's `under.extend`) run by hand and on M4's grow path; **the epoch contracts** (ST-03, ST-23, ST-50, SL-30: 0.25–0.5 pw): U-NET laid whole at the first sewers epoch, `AccessPass.run` over an `EpochScope`, `CatacombGrowth.grow`'s `opts` and the primary reading, `QuarryWorkings.extend` and `workedOut`, the landfall closure; **the second reconciliation's epoch parts** (TR-07, TR-08, TR-10, TR-11, SLR1-04: 0.25 pw): `Foundations.apply` with its `FoundationsResult`, F6 filled by volume 6's relocation, the calamity deaths in `CatacombGrowth.grow`, the buried floor's terraces under `raiseGrade`, the opening pass's epoch callers; glTF and CityJSON of the underground; performance at METROPOLIS; the owner's panel | T-V4-23, T-V4-24, T-V4-27, T-V4-29, T-V4-31, T-V4-32, T-V4-36, T-V4-63, T-V4-70, T-V4-72, T-V4-73; the epoch clauses of T-V4-15, T-V4-52, T-V4-56, T-V4-65 and T-V4-74 (b); the panel rated or offered (§13.6 (7)); `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 3–4.25 |
| content | the naming slices (BCR-18, the `ruin` slice with V11), the dossier row sets (V4 §2.3a), the ruin, openings, dig and catacomb tables, the ancient-culture rows reviewed with V11, the light rows' tuning, the style rows of `rock` and `void` in every family | reviewed by the clean-room scanner (§17.1); every cell with provenance; `plat calibrate register --check` green over the cells it lands (*The register at each exit*, below) | 1–1.5 |
| **total** | | | **28.25–39.25** |

**Item 110's dependencies.** The raised-way record with its spans' `use` (BCR-45), `RetainingWall` and the levelling land
with the base's item 110 side at M3a, and V02's `layTiers` with the base outline builder at M3a (BCR-V2-39) — both before
M6-U, so M6-U waits on nothing new. The second known-city fixture (V12, M3a) carries a raised road, a ravine and a stepped
temple; this volume runs T-V4-62 – T-V4-70 on it from U3.

**The register at each exit** (reconciliation round 3's continuation, SCC-R2C-14; X-V12-16; J-V4.117, J-V4.118). Every
step above that lands a registry table of this volume, or a calibratable column of one, exits with "`plat calibrate
register --check` green over the cells it lands — their entries from V12 §3.11's default line (`plat calibrate register
--defaults`) unless this volume's own line in V2 §3.10.10's form names the column". The lint runs at PR tier from M1
(T-V12-20), so the change that lands a column carries its entry, never a later change (V12 §3.11, *Every volume's landing
exits green*). A table lands whole, every column, in the first step whose change first ships its rows (holds a compiled
cell; V11 §2.1's empty-table rule: every registry row compiles from C0 as its schema's empty table, J-V11.84, and
`--defaults` writes no entry for an empty table's column, SCC-R2C-5 (a)), and that change writes one entry per
calibratable column (V11's `ColumnSpec`; `rows` absent, so a row a later step adds — a light row, an opening kind, a
culture row — needs none); a table that first ships rows (holds a compiled cell; V11 §2.1's empty-table rule) in an
earlier step than planned below takes its entries in that step, the check failing the step otherwise (SCC-R3C-13). The landing seat writes the named lines' entries first, then runs `--defaults`
for the rest (V12 §3.11's order). V11's cells in these tables are authored by V11's C8 (V11 §8), whose rows land inside
the step that first ships their table's rows, so that change carries C8's entries by V12 §3.11's lines for them — the check
reads the change, not the seat. A base cell that one of this volume's requests (V4 §10) adds lands with the step that
builds its reader, owner `base`, by a V12 line where one names it, else by the default line (V12 §3.11's items 109 and 110
paragraph); so do the cells of the base's II.7 tables (registry rows 57 and 59) where a step here, not M4's hook fixture,
first ships their rows. Keys, laws, enumerations, switches, word lists and dossier row sets take no entry (V11 marks them
`calibratable: false`). This volume writes no register line of its own (J-V4.117). As planned:

| step | first ships rows here — holds a compiled cell, V11 §2.1's empty-table rule (registry row) | each column's entry from |
|---|---|---|
| U0 | `under.network` (58), every column — N1–N10 read it | the default line |
| U1 | `under.layout` (58), every column — U-FORECAST's `forecastSafety` (BCR-19) reads it | the default line; `voidDwellings`, `accessForecastMin`, `links.overlapShaftM` and `links.overlapShaftChance` by V12 §3.11's "V04's other item-109 cells" line, which is the default line's entry itself (one entry each) |
| U2 | none of this volume's: the sewer light rows are rows of the base's `lights` (51), whose columns the base's landing of that table already bound | — (the check runs and is green) |
| U3 | `under.ruin` (58a), every column; `under.catacomb` (58a) — U-SYS V4 §3.5.1 and T-V4-11 read it; this volume's `params` keys of `under.systems` (59): every row's `surfaceClearCm` and the `cavern`, `quarry`, `vaults` and `dug` keys of V4 §2.3 | `under.ruin`: V04's cells by V12's `under.ruin` V04 line, V11's (`chance`, `cultures`, `survival`, `sourceWeight`) by V12's lines for them; `under.catacomb`: `ossuaryReachM` by V12's line for it, V11's cells by V12's `under.catacomb` line; `under.systems`: `mineBoost`, `mineCap`, `fissureChance` and `breachM` by V12's item 109 (a) line (owner `base`), `miningCellShare` by V12's line for it (V11), every other key by the default line |
| U3b | `under.openings`, `under.dig` (58a) — U-ACCESS reads them | `coverM` and `planReachM` by V12's lines for them; V11's cells by V12's `under.openings` and `under.dig` lines (`sealedFloor` by its own) |
| U4 | none: the catacomb rules, U-CITY, U-LINK and U-DIG read tables U1 and U3 landed | — (the check runs and is green) |
| U5 | `under.fade` (58), every column — U-FADE reads it | the default line (V12's "V04's other item-109 cells" line names the fade rows and defers to it) |
| content | none: the naming slices (68) and the dossier row sets (V4 §2.3a) are not calibratable; the light rows' tuning and the `rock` and `void` style roles are rows of tables (51, 52) whose columns the base's landing already bound — entered, or not calibratable | — (the check runs and is green) |

**The due steps.** A V12 §3.11 line whose `measure` names a step at which the bar it cites does not run in this plan is
due at the step whose exit runs that bar, written `'V4-<step>'` (a volume's phase as V12 §2.8's milestone ids write
it, `'V4-U5'`): the `under.openings` and `under.dig` lines' "`measure` at U3" (the bar map's 109 (j) (5) rows, T-V4-49
and T-V4-54) at `'V4-U3b'`, and the `under.ruin` `sourceWeight` line's (the 109 (i) row, T-V4-58, U-CITY's source
choice) at `'V4-U4'`; every other V04 line falls due where it says (U3 for the ruin, cavern and span-rule measures, U5
for the V4-U5 panel, and the default line's due for the default line — V12 §3.11: M-CAL, or the underground's later corpus
run when a step lands after M-CAL; SCC-R3C-1, SCC-R3C-13).

**What V12 §3.11's V04 lines leave to this section** (J-V4.118). Its `under.ruin` V04 line and its span-rule line close on
"V04 §8's pre-decided fallbacks, else the panel rule". The history row each group's entry takes at its due step, the
condition that confirms it and the pre-decided move:

| cells (V12 §3.11's line) | the history row at the due step, and what confirms it | the pre-decided move (once; the bar re-runs or the group re-sits) | a second miss |
|---|---|---|---|
| `distinct.retries`, `distinct.rotateDeg` (the `under.ruin` V04 line) | T-V4-45 at U3: the `W_RUIN_SIMILAR` share and V12's `paired` margins on `ruin.blockArea`, `grid.r4` and `grid.axis`; confirmed when the share ≤ 5 % | only when T-V4-45 still fails after V11 §3.23.4's culture-row move (V12's `cultures` line) has run: `distinct.rotateDeg` 30 → 45, a grid's greatest axis difference, as a `fallback` run (V12 §3.7) | `not-achieved`, reported to the owner as a table defect (V12 §5.5) |
| `monument.clearM`, `.tierDecay`, `.ceilingClearCm`, `.moundShare` (the same line) | T-V4-68 at U3 (conformance, 0 violations; it moves no cell), then the V4-U5 panel's `realism` on the frames holding a ruin | a No at V4-U5: `monument.tierDecay` 0.85 → 0.9 and `monument.ceilingClearCm` 200 → 150 — more tiers stand and fit under the chamber's ceiling, T-V4-68's clearance clause reading the new margin | the panel rule: `not-achieved`, reported |
| the line's other V04 cells — `ancientYears`, `significance`, `maxFrameShare`, `maxChambers`, `forecastFloorShare`, `depthM`, `burialByAge`, `smoothM`, `sharedAxisChance`, `ageRefYears`, `coverKeep`, `fadeFactor`, `magicLightChance` | T-V4-43's presence rates and T-V4-44's structure at U3 (confirmed when both pass), then the V4-U5 panel | none stated | the panel rule |
| the span-rule constants (V12's V04 span-rule line: `raised.vaultShare`, the headroom and fall bounds, the cap, the deck depth, `raised.supportFoundationCm`) — base cells landed at M3a with the base's item 110 side by the seat landing BCR-45, never by a step here | T-V4-62 at U3 (conformance, 0 violations; confirmed when it passes), then the M4-110 and V4-U5 panels | none stated | the panel rule |

T-V4-62 reads no `under.ruin` cell: the `under.ruin` V04 line's history row records the bars this table names for its
groups (T-V4-43, T-V4-44, T-V4-45, T-V4-68), and T-V4-62's row belongs to the span-rule line. No line names a `bar.T-V4-n`
metric, so this volume registers no `BenchBarDef` (X-V12-15).

**Risks, in order.** (1) The tail's time at METROPOLIS in the navigable preset, now with a ruin and the access pass (U0
measures at METROPOLIS; V4 §6's fallbacks). (2) The forecast's miss moving households between the surface and the
underground (T-V4-8; `forecastSafety`, the absorption below and T8 absorb it; a miss over 25 % re-tunes P4's admissible
share and P7's building estimate). (3) `corridorUnion` on sparse, frame-sized rock faces (U0; §3.7's fallback applies
unchanged). (4) Legibility of the dark underground and of the ruin program (V4 §5.3's plan lines; the owner's panel). (5)
The volume laws giving voids too large or too small to host an undercity (T-V4-11, T-V4-13; the rows are calibratable).
(6) A ruin plan too like the town above (T-V4-45). (7) The span rule leaving too many or too few arch vaults (T-V4-62;
`raised.vaultShare` and the cap are calibratable rows). (8) Shallow ruins cutting most monuments to stubs (T-V4-68; the
owner's panel; `burialByAge` is calibratable; the pre-decided move above: `monument.tierDecay` 0.9, `ceilingClearCm` 150). (9) Built beside M5, M6-U waiting on volume 1's W15 services
(`fabricSignature`, `districtsAbove`, the opening pass): U3's distinctness step and U4's C5 are scheduled after them, and
the opening places arrive as a declared shift (SLR1-05).

**Risk spikes.** (a) At U3's start: the ruin plan's distinctness and structure bars (V12's `paired` and `twoSample`) on 50
fixture seeds; pre-decided fallback: the next culture family becomes the default draw. (b) At U3b's start: the excavation
reading's per-commit cost at METROPOLIS (≤ 1 ms); pre-decided fallback: the reading recomputed per band of parts touched
rather than per cluster, cached by part digest.

**Evidence that ends each step** is the step's bars executed and quoted, the declared shifts recorded (§13.3), the
register check green over the cells it lands (*The register at each exit*, above), and
`docs/lane-events.log`'s LANDED line.

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V4.1 | chose one package `@plat/under` for the engines (seven as landed, nine after the revision added U-ACCESS and U-RECONCILE) (registered in `@plat/layout`'s registry) over spreading them through `@plat/layout` and `@plat/plots`, because the layer is staged and must land and version as one unit with no edit to the base's packages but registrations |
| J-V4.2 | chose to run the underground as a tail after the first paint, serially on the generation worker and before any queued edit (yielding only to view requests), over adding it to the main critical path, because §12.3's CITY model budget has no room for it and the default view hides the layer, while the population and the digest stay whole; amended by the revision: the ground arena's geometry and digests are final before the tail, the one tail writer of ground records is T8 (J-V4.59), and the ground's model digest and the root digest are finalised after T8 |
| J-V4.3 | chose `mixed` (culverted drainage lines as trunks, street mains feeding them) as the default family over `follow-streets`, because medieval towns covered their brooks and laid a few mains under the principal streets — the realism tiebreaker |
| J-V4.4 | chose the tree as a multi-source shortest-path search from the admitted outfalls over the way graph (D8 itself for `drainage-lines`) over a network optimisation, because it is deterministic, O(E log V), and reproduces the downhill-to-the-nearest-outlet shape |
| J-V4.5 | chose tunnel selection by accumulated served area against per-preset thresholds, with the downstream closure, over per-street rules, because the served area is what sizes a sewer (II.7.2's law) and so one quantity decides existence and size |
| J-V4.6 | chose one leaves-to-root invert pass with a re-route, then truncate, ladder over lowering the terrain, because the owner's town never trenches and every run must fall |
| J-V4.7 | chose outfalls from S1's drainage outlets, admitted downstream of the harbour and the mills, with the town moat and then a cess field as fallbacks, over a fixed river outfall, because a town may lie on the sea, a lake or dry ground and historically discharged to its ditch when it had nothing better |
| J-V4.8 | chose logical house connections (`serves`) over drawn house drains, and drains only for the priority institutions, because thousands of stub tunnels would cost arena edges and draw clutter for a fact the reader already gives |
| J-V4.9 | chose sewer chambers as flagged junction wedges on part 0 over `chamber_wall` chains there, because U2 keeps part 0's L1 to tunnel chains only |
| J-V4.10 | chose navigable-preset passages at the mains' closest approaches over random cross-links, because loops where mains nearly meet read as a planned fantasy network and stay deterministic |
| J-V4.11 | chose the network's own gratings at a manhole spacing on public ground and mouths at outfalls and culvert inlets, over access only where people live, because a maintained sewer has openings and the undercity's lifelines and the connection graph need them |
| J-V4.12 | chose `Way.flowToward` as a derived reading over a stored field, because no stage produced it and a stored copy would go stale after every terrain edit |
| J-V4.13 | chose a forecast that runs the network's own first steps at S7b for every family over the base's street-only prediction, because the prediction had no input under `drainage-lines` (RV-pc-4) |
| J-V4.14 | chose to keep the network's plan through ground edits (only connections and the fronting blocks re-derive) over re-deriving it, because sewers outlive the streets above them and an edit's locality must stay small; the whole network re-derives only by Re-derive from the network stage |
| J-V4.15 | chose `Tunnel.depthOffsetCm` as the one depth edit of a tunnel over editing invert knots, because the invert must stay monotone and one offset re-laid by N7 keeps it so |
| J-V4.16 | chose catacombs as a level grid aligned to their burial face, grown breadth-first to the ossuary need (and, after generation, by the ratchet), over a random walk, because it is deterministic, sized by the law and matches the grid-like ossuary galleries of the historical pattern |
| J-V4.17 | chose soluble caverns along the drainage lines at the water table and volcanic tubes along the steepest descent, capped by length near the town, over rock-share-only extents, because caves follow water or flow and a frame-wide cave would cost more than its reader |
| J-V4.18 | chose each quarry working as one chamber with its pillars drawn by the `quarry` program over modelled pillars, because a modelled room-and-pillar field is tens of thousands of edges at CITY for no reader but the picture |
| J-V4.19 | chose vaults under bridge approaches and steep streets and cisterns under old precincts and the castle's own court, admitting a cistern's own host, over the literal "public ground only", because a castle's cistern under its ward is the historical case |
| J-V4.20 | chose to bury a buried town's squares as `square` chambers and keep its buildings' entrances as portals, because the old market under the new is the buried town's natural plaza and the exports need its doors |
| J-V4.21 | chose to apply the surface constraint to void elements and undercity plots only within `surfaceClearCm` (6 m) of the ground, over everywhere, because deep rock is not constrained by what stands above it |
| J-V4.22 | chose to carve an undercity's main chamber where its void has none (within its own part), over dropping the neighbourhood, because an undercity hollows its own square — and to drop it only when the rock will not take the carve |
| J-V4.23 | chose walkways as a minimum spanning tree over each chamber's openings and a ring round the core's plaza, over a grid of streets, because it is deterministic, connects every opening and keeps the plaza open |
| J-V4.24 | chose one neighbourhood per void cluster, a large cluster split by its chamber graph, over free partition, because a neighbourhood should be one connected place |
| J-V4.25 | chose to realise lifelines in the order access, air, water, then an optional route outside, reusing existing openings first, over new openings always, because the fewest new openings keep the map legible and the rules satisfied |
| J-V4.26 | chose links by per-part index proximity with station-greedy spacing and `via` by the floor difference, over all-pairs, because it is linear in the elements and matches II.7.6's spacing rule |
| J-V4.27 | chose a local 1 m grid A\* for dug connectors over the terrain grid, because a 5–10 m cell cannot keep a 0.5 m foundation clearance |
| J-V4.28 | chose the fade weight as exposure × rate × chance × neglect-by-usage, and the op by a table per element class and condition with seals favoured by order, over uniform ops, because disused tunnels decay first and authorities seal where they rule |
| J-V4.29 | chose, at a growth stage, to connect new faces to the existing network and reopen closed runs on the chosen path before digging new ones, over re-deriving the network, because regrowth-first (II.6) and survivors never re-roll |
| J-V4.30 | chose an undercity clearance only while `disorder` is below a threshold, at a per-year rate, one per epoch, over clearance by hand only, because order is what clears a warren |
| J-V4.31 | chose the dungeon-map figure-ground (a hatched rock halo, voids in paper) over the ground's ghost, `cutaway` by default, over a translucent overlay by default, because it reads at once as underground and stays legible — the look of the reference family's dungeon and cave maps (`research/findings/watabou-extra-a.md` §2.7–§2.8; `research/findings/dwellings-posts.md`), named as the visual precedent, nothing copied (C4-37) |
| J-V4.32 | chose rock as a light-blocking prism to the band's roof and the plan lines composed after the light, over a lit plan alone, because light must not pass through rock and legibility is the floor |
| J-V4.33 | chose "lived only" lighting of the network's junctions and accesses over item 68 (d′) (1)'s lighting of every run's junctions and access points, because nobody tends a torch where nobody lives, and (d′)'s "sewer tunnels sparse" is kept by the lived runs' junctions and the shafts; a narrowing of (d′) (1), recorded here as vetoable (C4-28) — reverting it is one table change (the lived test removed from the sewer rows) |
| J-V4.34 | chose labels for named runs, systems (in their main band), undercity neighbourhoods and the plaza only, over labelling every tunnel, because the underground's label budget is small and names mark what matters |
| J-V4.35 | chose the VTT band scene's walls from void kerbs, chamber walls and underground footprints, portals at accesses, links and doors, over walls from the rock face, because the kerb is the wall a token meets |
| J-V4.36 | chose glTF voids as inward-facing solids with the rock not exported, over exporting rock, because the voids are the model and a rock mass would dwarf the file |
| J-V4.37 | chose to reuse `Junction` records on underground parts, over a separate record, because `corridorUnion`'s wedge needs an owner and the light and chamber rules need a junction to host |
| J-V4.38 | chose `Chamber.kind` as a stored row reference, over inferring a cistern or an ossuary from its system, because one system holds several chamber kinds that draw and light differently |
| J-V4.39 | chose `District.core` for an undercity neighbourhood's main chamber, over a search at every read, because six readers need it and a carve makes it |
| J-V4.40 | chose the connection stage as the one writer of `District.outskirts`, over the undercity stage, because outskirts are defined by the links that join the neighbourhood and those exist only after U-LINK |
| J-V4.41 | chose the family and the preset as two model controls in the advanced panel, over fixed values, because D-3's fantasy toggle must be settable and the families are the owner's "exactly follows the roads. Or they don't" |
| J-V4.42 | chose `LayerSpec.underView` with three modes over one fixed cut-away, because relating a tunnel to its street and reading the underground alone are both needed |
| J-V4.43 | chose `Tunnel.serves` to list plots only, over plots or buildings, because a plot's buildings drain through it and one list is one truth |
| J-V4.44 | chose `Tunnel.chambers` as a view over its junctions' flags, over a stored field, because the flag lives on the junction and two stores would diverge |
| J-V4.45 | chose to read the dossier's sanitation and subterranean records through two row sets with written rows and binding targets (V4 §2.3a), matching custom records by their resolved profile, forcing sewers and systems, and to give a subterranean institution no allocation takes a dug underground from its cellar, over ignoring them, because DR17 names them and a dossier fact must exist and be bound on every map (C4-05, C4-16) |
| J-V4.46 | chose M6-U after M5 as the default slot, a parallel lane permitted, because the owner stages the layer after the city is mastered; amended by the second reconciliation (SLR1-05): M6-U reads three of volume 1's M5 services (`fabricSignature`, `districtsAbove`, the opening pass), so a parallel lane schedules U3's distinctness step and U4's C5 after V01's W15 and gates the opening pass on its registration (J-V4.108) |
| J-V4.47 | chose invisibility as the parity metric and an owner panel without a reference, over inventing a reference, because no generator has an underground |
| J-V4.48 | chose to declare `Outfall` with S1 as the producer of `Terrain.outfalls`, and the `stream` and `field` kinds, because the base names the type and the field and never declares or fills them |
| J-V4.49 | chose to make a pre-U-NET document's underground by the version's upgrade event with the ground unchanged, over leaving it empty, because `Features.sewers` already says a CITY has a network |
| J-V4.50 | chose to hold L5's pieces while their dossier institution is live, a delete refused `dossier-owned` with `rejectSite` offered, over letting a delete stand, because the institution's underground is part of the dossier fact on the map |
| J-V4.51 | chose to have underground plots sample the ground's prosperity field with its daylight-share term (item 102), and light shafts take the opening's direct-light visibility — the render's shadow term under the current sun, never item 102's model share (SL-16) — over an underground sun term of their own, because the underground's standing follows its parent ground's wealth, and a shaft in shade is darker (C4-32) |
| J-V4.52 | chose a ruin laid as an ancient plan from a culture row (grid, axial, radial, terraced) and decayed by a persistence order, with a distinctness retry, over a cavern-like organic layout, because the owner asked for "the remain outline of past civilization", much more structured than a cave (C4-47) |
| J-V4.53 | chose the excavation state as a reading derived from the connection graph, recomputed per commit, over a stored flag, because access arises from many causes (digs, openings, overlaps, links, edits) and is transitive, and a stored copy would go stale after any of them (C4-48) |
| J-V4.54 | chose that the undercity never excavates a sealed void — it settles only accessible clusters, and its lifeline closure never targets an unexcavated one — save the dossier's `require` on the void its forecast counted, over lifelines that open any void, because the owner rules that dwellings come only once access exists, and the dossier outranks the chance (C4-48) |
| J-V4.55 | chose catacombs only under burial faces ranked by the burials they serve, the church count setting how many, the largest kept under the first by a rank cap, and the crypt left to its church with a V04 join draw, over a church-sourced catacomb, because the owner switched it (J111: "cathedral also gets crypts but cemetaries get catacombs") and historically the great catacombs lay under cemeteries, mostly outside the walls (C4-49) |
| J-V4.56 | chose that the author's `delete` of catacomb galleries lowers `extentFloorM2` and tombstones the nodes, over refusing it, because everything is editable and the ratchet binds derivations, not the author (C4-50) |
| J-V4.57 | chose the ruin's depth band [4, 30] m drawn by age (BCR-31) over g's 8–30 m, because a young ruin lies within a sewer's reach and ancient streets commonly lie 3–8 m under a later town, so the owner's own example (a sewer growing through a ruin chamber) happens; with 8–30 m it would rest on the shaft chance alone (C4-51) |
| J-V4.58 | chose to admit `ruin` among the `historical` preset's undercity sources (BCR-42), because a ruin is a built void and so realism, as vaults and a buried town are (C4-54) |
| J-V4.59 | chose one declared tail stage, T8, as the only writer of ground uses and household counts — never geometry; the only other ground records the tail writes are volume 1's opening places in T6's S13a step, records and labels (SL-06) — after capping allocations at `forecastSafety` and absorbing surpluses below, over re-placing households on the ground from several tail stages, because the ground's geometry must stay the first paint's and one writer is testable (C4-02) |
| J-V4.60 | chose to measure sewer-front existence at U2 (T-V4-41) with a pre-decided fallback — BCR-27's surface rule within `surfaceClearCm` and navigable `coverCm` 600 — over relaxing the surface rule now, because II.7.3's rule is the owner's and may suffice; the fallback applies only on a failed measurement (C4-18) |
| J-V4.61 | chose forced vaults under the oldest district for a required undercity where no counted void qualifies, over failing the requirement, because II.7.5 names "the vaults under the oldest district" and the dossier's word outranks the rule (C4-03) |
| J-V4.62 | chose that only cavern and ruin parts read the excavation state, every other part being accessible by construction (dug from the surface; the buried town entered from the raised town's cellars), because those were made by the settlement and so reached (C4-48) |
| J-V4.63 | chose to keep item 64's basement draw in U-LINK (after U-FRONT and U-CITY, whose walls and walkways it targets) and to move the void accesses — overlap, mine breach, proximity links, crypt joins, dig draws, openings, reuse — into the new T2b, over moving item 64 into T2b as the critique proposed, because item 64's targets do not exist before T3 and T4, and the two draws then sit in different stages with different stream keys (C4-48, C4-58) |
| J-V4.64 | chose, below TOWN, a catacomb record's charnel vault as one `ossuary` chamber of the `dug` system capped at `charnelMaxM2`, over a catacomb system or a church crypt, because the TOWN gate stands, J111 gives churches crypts, and the dossier fact must exist (C4-49 (7)) |
| J-V4.65 | chose L5's always-successful last rung — a cellar chamber under the basement reached by a hatch, `flooded` on wet ground and reported — with the basement guaranteed by S10b's hard row and S11's forced basement, over a refusal, because every subterranean dossier fact must have its underground (C4-07) |
| J-V4.66 | chose `underDistance` as the walkway path to an admitted access plus the street distance from it, rock absorbing emissions but water pollution and disorder, alignment by plan, over plan distance for every family, because an undercity trade reaches its market through the ways up while a guild seat still fears the garrison overhead (C4-15) |
| J-V4.67 | chose chain mines that reuse or make a working at the hinterland edge sized by the chain's volume factor, over a surface pit only, because item 104 (h) (1) sites a subterranean resource as a mine and the underground is where a mine lives (C4-16) |
| J-V4.68 | chose to key a way-following run by its upstream station rounded to 1 m, over its ordinal along the way, because a new junction must not renumber the later runs and detach their locks, names and offsets (C4-44) |
| J-V4.69 | chose the dig draw keyed by (building, void kind) with no epoch component, evaluated at every derivation with its made access persisted, over a one-time draw record, because the key already fixes the value, a rising chance may later cross it (a basement added), and no draw is ever repeated with a new value (C4-52, C4-58) |
| J-V4.70 | chose stagnation's `fill` as a monotone maximum of the derived shortfall over an accumulator, because a re-derivation must not count one epoch's burials twice and ossuaries only fill (C4-50) |
| J-V4.71 | chose an estimate of 25.75–35.75 pw over the critique's 24.25–34.25, because it also prices the mechanisms the other findings add (T8, the cross-arena distance, N3a and the read-ahead, the forced vaults, L5's ladder, the root-first invert) (C4-57); the second round raises the total by J-V4.94 |
| J-V4.72 | chose root-first outfall inverts with `freeboardCm` above the shore height, the shore's terrain standing for the water surface as §2.6 reads it, over leaf-first depths alone, because a mouth below the water backs the river into the network (C4-10) |
| J-V4.73 | chose to connect `channel` plots to mains and culverts (BCR-28), over mains only, because in the `mixed` family the culverted brook is the trunk the historical town drained into (C4-21) |
| J-V4.74 | chose tunnel grilles as a derived view over a stored field, because they follow the walls and the runs and a stored copy would go stale after either is edited (C4-33) |
| J-V4.75 | chose that an unexcavated element is drawn, labelled, explained and exported only for a `secret` key, whatever `showUnexcavated` says, because the view key must never leak what no inhabitant knows to a player's view (C4-56) |
| J-V4.76 | chose F6's scattered dwellings as blocks of the one underground pseudo-district (a `FaceRef` naming its part), over a pseudo-district per cluster, because II.7.3 keeps one pseudo-district per settlement and a handful of squatters is no neighbourhood (C4-48) |
| J-V4.77 | chose to read "secret passage" as a `dug` gallery, whose `knownTo` exists, over adding `Tunnel.knownTo`, because the network's own passages are public works (C4-36) |
| J-V4.78 | chose the undercity's first pick as a weighted draw over capacity × source weight when a ruin competes, over a fixed order, because item 109 (i)'s bar reads a ranked share, not a certainty (C4-54) |
| J-V4.79 | chose a span's `use` as an eager base fact, fixed at the raised way's generation from ground part 0 only (BCR-45) and read by this volume, over this volume deciding the spans in its tail, because the tail never writes the ground (J-V4.59), the ground's plots and V01's lanes must know which arches are walled before the tail runs, and a span decided lazily would depend on the order close-ups are opened (C4-110-1) |
| J-V4.80 | chose the arch vault as an at-grade chamber of the `vaults` system (`ChamberKind` `archVault`) under the base's infill, over a ground building or a new system kind, because the vaults system already owns the town's vaults, the base draws the span's wall and door, and a chamber carries the storage reading and a declared institution without a new entity kind (C4-110-1, C4-110-2) |
| J-V4.81 | chose that an arch vault is no undercity void, never a fade candidate and never an L3 or U-DIG target, its condition following its span's, over treating it as any vault, because it stands at grade under a daylit structure that V06 decays as one, and an arch cannot outlive its arch (C4-110-2, C4-110-3) |
| J-V4.82 | chose raised-way piers, retaining-wall footings and buried aqueduct stretches as foundation obstacles, re-derived at every derivation — later systems keeping out of their reach, older voids filled by the stretch or holding the footing as a masonry pillar where it covers under a quarter of a chamber — over ignoring them or collapsing whole elements, because builders filled what their footings met and a whole cave does not vanish under one raised-way pier (C4-110-5) |
| J-V4.83 | chose to keep the base's aqueduct need test on eager inputs and this volume's cistern test reading the aqueduct's delivery points, with the terminal cistern this volume's and the buried stretches the base's line, over one joint test, because a cistern placed in the tail cannot feed a decision made before it, while the delivery points exist before the tail (C4-110-6) |
| J-V4.84 | chose monuments laid by V02's `layTiers` from the culture row's `monument` cell with V11's `stepped-shrine` heights row, decayed from the top under a ceiling cut, over a tier builder of this volume's or the great temple's heights row, because one tier construction serves ruins and living temples alike (V2 §3.15.6) and a temple's nave row would put a 20 m shrine on a pyramid (critique-V11 V11C-35 (3)) (C4-110-8) |
| J-V4.85 | chose a drop at a retaining wall as a steep segment between two wall-face knots within one run, over a drop junction splitting the run, because the run stays one record with one condition (II.6) and the two knots alone keep every crown below the levelled ground (C4-110-7) |
| J-V4.86 | chose to make the necropolis's block nearest the centre one mausoleum chamber where the culture's monument hosts a tomb, over laying the monument in an ordinary tomb room, because a 6 m² room never fits a stepped mass and would be skipped every time (C4-110-8) |
| J-V4.87 | chose a monument budget of 0.5 ms p95 each over the critique's 2 ms, because `layTiers` is constant-size geometry of at most eight tiers, and three monuments at 2 ms would break the village rung's 10 ms tail (C4-110-11) |
| J-V4.88 | chose to count the arch-vault cap in the order raised ways were founded (their creation event, then address) and along each deck, over address order, so that a later way never displaces an earlier way's vaults (prefix-stable, §6.2) (C4-110-1; BCR-45) |
| J-V4.89 | chose that a hand access from a church-class building to a catacomb is a hand crypt join (source `crypt`, cause `crypt` with its event), refused without `Basement.crypt` with the crypt offered as the fix, over admitting a `system` or `edit` catacomb head there, because V03's T-V3-23 (d) holds every catacomb head in a crypted building to cause `crypt` (C4-64 (3)) |
| J-V4.90 | chose a maintenance mode at village rungs for every inherited system, the sewer network and the undercity included, over the critique's catacomb, quarry, vaults and buried town only, because V07's hand-off down keeps the sewer network's records too and tunnels are never torn down (DEFINITION §4) (C4-65 (3)) |
| J-V4.91 | chose that S11, run by F4, F6 and C4, writes `Entrance.faces: 'tunnel'`, over a post-pass, because the entrance derivation is S11's and the three stages run S11 on their arenas (C4-64 (4)) |
| J-V4.92 | chose column points modelled from the chamber, with a colonnade decay per row, over drawn-only columns, because V03 plans buildings round them and the dots drawn must be the points the plan avoids (C4-64 (5)) |
| J-V4.93 | chose to file the span rule's constants (`raised.vaultShare`, the headroom and fall bounds, the cap, the deck depth) and `raised.supportFoundationCm` among the base's raised-way rows (BCR-45), over this volume's tables, because the base fixes the spans at M3a, before this volume exists, and a raised-way pier's depth is the base structure's own dimension (C4-110-1, C4-110-5) |
| J-V4.94 | chose an estimate of 27.25–38 pw (item 110's parts and the two hand-offs, +1.5–2.25 pw, priced in U1, U3 and U4), as the critique proposed (C4-110-12); reconciliation round 1 adds 0.25 pw to U4 for the crypt derivation moved from volume 3 (S23-20, file f item 238) |
| J-V4.95 | chose the catacomb primary as a reading — the complex whose source serves the most burials, ties by rank (rank 1 at generation), and at an epoch volume 6's hysteresis-held primary passed in `opts` with its per-complex cap — over the formation rank, because the owner's rule is the largest catacomb under the largest cemetery across a history, and a newer extramural cemetery must be able to overtake an old churchyard's complex (ST-03) |
| J-V4.96 | chose volume 1's one visibility rule for an access's surface head — its ground symbol, drawn by the knowledge filter and the `pins` toggle whatever the underground layer's visibility — with the underground layer drawing only the underground end, over hiding the surface head with the layer, because a mouth or a grating stands on the ground where anyone who knows of it sees it: knowledge, not layer visibility, hides what a viewer does not know (SL-08) |
| J-V4.97 | chose to ship no `underground` rows of volume 1's `hood.pins`, so an underground close-up draws no hood pins, over furnishing tunnels with pins, because the underground's furniture is its light rows and access marks, and a pin set tuned for streets would clutter a tunnel's kerbs (SL-22) |
| J-V4.98 | chose `workedOut` as a derived reading — a mine's use closed, a chain inactive, a stone working outside the epoch that laid it — and `QuarryWorkings.extend` laying the epoch's new stone, mining and chain workings with their overlap tests, over a stored worked-out flag or a re-derived quarry system, because every input is already in the model, a stored flag would go stale, and existing workings must never be re-laid (ST-23) |
| J-V4.99 | chose to keep a ruin whose dossier source is removed — `source.ref` cleared, reported, fading by U-FADE — over removing the system, because the underground is never torn down (item 11; DEFINITION §4) and a removal would delete a lived void with no household channel; a blueprint ruin still follows its toggle at a re-derivation, never at an epoch (ST-22) |
| J-V4.100 | chose one definition of public ground (a way corridor, an L1 square or gate-plaza face, or a square or green block; a yard including a `yard` block's residue), cited by every reader, over L1 square faces only, because volume 1's dispatched squares are the town's squares on the ground, and a grating, a lifeline stair, a forced vault or a buried market belongs under them as under an L1 square (SL-15) |
| J-V4.101 | chose that the underground never reads the sky layer — no dig, basement-access or crypt-join host, burial face, district of `R` or element end on an island — save the catacomb count, which counts each island church once, over a plan-only test, because the owner's item 2 keeps islands out of the underground while the church count is a dossier and roster fact wherever the churches stand (SL-05, SL-04, ST-24) |
| J-V4.102 | chose to run volume 1's opening pass and write the `ruin.node` report line in the tail's T6, after S13a names the systems, complexes and ruin, over a stage of their own or a write by T2, because both need the names and T6 already writes the underground's names; the opening places are records and labels, never geometry, so the tail still writes no ground geometry (SL-06, SL-03) |
| J-V4.103 | chose the underground's own lottery at the `decline` step after the fabric pool (volume 6's `under.fade`), uncapped by the district's `fabric` cap, over one shared strike lottery, because tunnels decay by their own exposure and rate and must not compete with the fabric's cap or enter its persistence order (ST-17) |
| J-V4.104 | chose to price the epoch contracts this round adds — the network laid whole at the first sewers epoch, the scoped access pass, the primary and cap, the new workings and `workedOut`, the landfall closure — at 0.25–0.5 pw in U5 (2.75–4 pw), the total in V4 §8 (ST-03, ST-23, ST-50, SL-30) |
| J-V4.105 | chose to read `Recipe.product` in this volume's hood line — U-FORECAST and T2 — and to run the below-TOWN set with the catacomb step at TOWN's rules and count (one) on the hood's own burial faces whatever its `contextRung`, over reading the `contextRung`'s TOWN-and-above rows for every kind, because volume 1 rules a lone neighbourhood's layers (J-V1.77: no host town whose stone a quarry supplies, no growth history whose scar a buried town fills, no town bridges or streets whose vaults this volume generates), and an input no stage of this volume read left it laying quarries, vaults and up to three catacombs in a hood (SLR1-01) |
| J-V4.106 | chose to run volume 1's opening pass inside every commit that creates, removes or re-kinds an access it selects — T6, the scoped access pass, a complex founded at an epoch, and the edits — over T6 alone or a periodic sweep, because a place lives exactly as long as its host (V1-2.7), and only a commit-local pass keeps the two in step with no orphan place and no unnamed sinkhole (SLR1-04); amended by the third reconciliation: a `regenerate` of a `cavern`, `ruin` or `quarry` system and the `delete` of an element carrying a selected access are two more such commits (SLR2-08; J-V4.115) |
| J-V4.107 | chose to let `placeAccess` make a public opening of a named kind at the nearest opening candidate of that kind, whatever its draw gave — source `opening`, cause `edit` — over refusing the public-opening kinds to the author, because everything is editable, volume 1 selects places by source, and a sinkhole the author opens must get the record, place and name a generated one gets (SLR1-04) |
| J-V4.108 | chose to schedule the ruin's distinctness step and the undercity's parent after V01's W15 services and to gate T6's opening pass on the local-place step's registration, the missing places a declared shift, over duplicating the three services in `@plat/under`, because each service is stated and built once, by volume 1, and a registry lookup keeps a parallel M6-U buildable without them (SLR1-05) |
| J-V4.109 | chose an exported `Foundations.apply(doc, scope, cause)` applying V4 §3.5.0's rule to the epoch's new footings only, at every rung, returning the collapsed elements, the pillars and the vacated plots with their households' ids (volume 6 re-houses them by name; TT-07), with a `raiseGrade`-tombstoned retaining wall's footing kept among the obstacles, over re-deriving the whole foundation reading at an epoch, because an epoch runs no stage of this volume, a scoped application costs O(scope), and with no epoch op removing an obstacle it collapses the regeneration's element set (T-V4-65; V6's T-V6-67) (TR-07) |
| J-V4.110 | chose to fill F6's new dwellings at an epoch only by volume 6's relocation of the district's poorest-band ground households, while the crowding hook's residual households take S7b (6)'s underground allocation at the epoch — on lived, then reopened runs, then accessible void clusters (V6 §3.6 (1); BCR-V6-28) — over allocating F6's new dwellings through S7b (6), because S7b does not run over standing districts at an epoch and the relocated households keep the total equal to the target (V6 §3.18.1 (4); T-V6-52) (TR-08; reworded by the third reconciliation, TT-02) |
| J-V4.111 | chose to take the span's calamity deaths as `CatacombGrowth.grow`'s `opts.deaths`, spread over the faces by their `burialShare` and added to the need only, over adding them to the cap or leaving them unread, because a plague's or a siege's dead are buried where the living were, while the per-epoch cap is the ratchet's pace (V6 §3.18.2 (3)) (TR-10) |
| J-V4.112 | chose to lay a raised grade's buried floor on the old grade point by point — `levelledGroundCm` on the region's last live state — each tombstoned retaining wall a step, a gallery crossing its line taking a stair step inside the gallery, over a stair link, because a link joins elements of different parts (§2.7) while the buried streets are one system on one part, as the cavern hall's stairs and N7's drops are (TR-11) |
| J-V4.113 | chose, at a village rung, to record a mining use's outside-plot working breaking into a cavern or ruin as one `shaft` `AccessPoint` of source `dig` and cause `mineBreach` per void system — its nearest element, keyed by the working's and the element's lineages, no link and no draw — tested at T2b and over `scope.workings`, over a heading gallery or a link, because below TOWN no `quarry` system exists to hold one (V07's J-V7.49) and the key makes the test idempotent at every derivation (TR-12) |
| J-V4.114 | chose to price the second reconciliation at 0.5 pw — 0.25 in U3b (the village working, the public-opening `placeAccess`, the opening pass's edit callers) and 0.25 in U5 (`Foundations.apply`, F6 by relocation, the deaths, the buried terraces, the opening pass's epoch callers), the hood line absorbed in U4 as a gate over existing steps — the total 28.25–39.25 pw (SLR1-01, SLR1-04, TR-07, TR-08, TR-10 – TR-12) |
| J-V4.115 | chose to run volume 1's opening pass in two more commits — a `regenerate` of a `cavern`, `ruin` or `quarry` system, after U-ACCESS (e) re-runs over the new elements' candidates keyed by their lineages, and the `delete` of a gallery or chamber carrying a selected access — and to include the `quarry` system beside the cavern and ruin the seam check named, over leaving a regenerated system's openings unplaced until the next T6, because a place lives exactly as long as its host (V1-2.7) and a quarry chamber carries the `collapsed_shaft` candidate (V4 §3.5.7 (e)); priced inside U3b's 0.25 pw for the opening pass's edit callers (J-V4.114), the total unchanged (SLR2-08) |
| J-V4.116 | chose, in a hood document, to run U-FORECAST after the one-district allocation and to read that allocation wherever the forecast reads the roster — P7's cap on `voidDwellingHouseholds` (its poorest-band households) and P5's catacomb expectation (the burial faces its anchors bring, the first one) — with S7b (6) (d)'s void part taken from it, over the town order (the forecast before S7b (5), on the roster of S2) with the virtual host town's roster, because volume 1 rules the order and the cap (V1-3.10.1 step 6; J-V1.92: the hood's demand is its capacity, and the virtual town's poorest band would cap the void part at a whole town's share), and the catacomb expectation read from the same roster would rank a virtual town's cemeteries that lie outside the hood, while U-SYS's catacomb step in a hood takes only the hood's own burial faces (V4 §3.1's hood line); the seam check found the V04 half unapplied (SLR3-01) |
| J-V4.117 | *Reconciliation round 3's continuation (SCC-R2C-14).* Chose to bind every calibratable column this volume lands to V12 §3.11's named lines for V04's cells (the `under.ruin` V04 line, `coverM`, `planReachM`, `ossuaryReachM`, the item 109 (a) cavern line, the span-rule line, "V04's other item-109 cells") or to its default line, and to write no register line of its own, with every step's exit carrying the register check over the cells it lands (V4 §8 *The register at each exit*), over writing lines in V2 §3.10.10's form for the columns T-V4-45, T-V4-62 and T-V4-68 confirm (the finding's option), because the columns those bars bear on are already named by V12's lines — `distinct`, `monument` and `burialByAge` by the `under.ruin` V04 line, the span-rule constants by the span-rule line — and a second line for one column fails the lint as two entries for one knob, while the rest they touch (the arch vault's insets and door strip, `terminalCisternM2`, the opening rows) are admitted by rule bars that confirm the rule, not the value; so no line names a `bar.T-V4-n` metric and no `BenchBarDef` is needed. No reference owns the underground (C4-01), so the default line's corpus stage is the only outside measurement the other columns can get, most closing `fixed` with "no admissible frame" at M-CAL (or at the underground's later corpus run when its step lands after M-CAL; SCC-R3C-1, SCC-R3C-13) while the V4-U5 panel rates the underground whole. Where V12's lines say "`measure` at U3" of a bar this plan runs later, the entry is due at the step that runs the bar (`'V4-U3b'` for `under.openings` and `under.dig`, `'V4-U4'` for `sourceWeight`), because an entry written at U3b with a due of U3 would fail its own landing's exit as provisional past due. Applied with it, SCC-R2C-2's V04 half: §1b.1 calls the dossier row sets not calibratable |
| J-V4.118 | *Reconciliation round 3's continuation (SCC-R2C-14).* Chose the pre-decided moves V12 §3.11's `under.ruin` V04 line and span-rule line leave to this volume — `distinct.rotateDeg` 30 → 45 after V11 §3.23.4's culture-row move has failed to clear T-V4-45, and `monument.tierDecay` 0.85 → 0.9 with `monument.ceilingClearCm` 200 → 150 on a V4-U5 No, and no second value for the ruin's other cells or for the span-rule constants — over a second value for every cell, because 45° is a grid's greatest axis difference (the most the turn can buy), a slower tier decay and a smaller ceiling margin are the two cells that lengthen a monument's standing tiers without moving the burial law (BCR-31's band) or the persistence order (V11's), and the arch vaults' number and the ruin's age laws have no one-directional failure a single second value can answer (a No may mean too many or too few), so the panel rule reports them to the owner as table defects; the culture move runs first because the plan's likeness to the town comes from the culture row, the turn only from the axis |
| J-V4.119 | *Reconciliation round 4's continuation (SR3-11).* Chose to read the base's "ground building nearest above the cluster" (file f item 372; V9 §4.17.4 step 1) through §3.5.7 (d)'s geometry — a footprint overlapping one of the cluster's elements in plan, or a basement ring within `DigRule.planReachM` of one — and to dig the first rung's access with no basement piece and no minimal system, over ranking every ground building by plan distance or giving the rung `addUndergroundAccess`'s full closure, because "above" and the bend's "every footprint over it" name footprints over the void, (d) already decides when a building can dig down into a void (so a dig by chance and a dig by a declaration answer to one geometry), and taking the building as it stands keeps its dig floor the one it qualified by and gives V9's `cellar_stair` or `shaft`, where a basement ladder could deepen or refuse it; to pass over a building whose connector U-DIG refuses for the next qualifying one, over dropping to the base's opening rung, because the base's order prefers a dug access from a building whenever one can be dug; and to list the alternatives by the base's rule without digging them in the dry run, over pre-digging up to three more connectors, because the dry run's budget (V4 §6) holds one building's connector and a refused alternative is answered by its own re-preview's refusal. The grouped access keeps its own closure's pieces (the basement ladder among them), being the user's `addUndergroundAccess`; only its target is the base's rule |
| J-V4.120 | *Reconciliation round 4's continuation (SR3-11).* Chose that in a skeleton prefix a dwelling declaration on a cluster still `unexcavated` after T2b takes the dwelling closure's way in at U-CITY C0, before C1's lifeline test, a grouped access before it in the prefix running there first, over reading it as `require` places a neighbourhood (a lifeline stair of cause `dossier`) or leaving the grouped access among T5's closures, because a declaration is the user's word, not the dossier's (cause `edit`; item 20 (h)), and a grouped access run after U-CITY had opened the cluster would add the second access T-V9-38 forbids; the prefix and the edit then give one model digest (T-V4-48's prefix clause, T-V4-40's pattern) |
| J-V4.121 | *Reconciliation round 5 (SLR4-06); revised in round 6 (SLR5-01).* Chose to gate volume 1's opening pass on volume 1's stage-2 switch as well as on its registration — the pass runs only while `fabric.extensionWeight` > 0 (V1-3.7.1, V1-3.15), a switched-off document keeping its underground whole with no opening place and the count reported — with the switch's own edit being volume 1's re-derivation (V1-3.15), whose tail's T6 runs the pass under the new gate: after an `editTable` or `editPreset` that raises the resolved switch above 0 the places are made over the accesses the re-derived document selects; after one that lowers it to 0 none is made and every old opening place is retired by §6.3's carry-over; each a fate of the edit and restored by its undo (§7.6's undo row); over leaving the places to the next generation or keeping them while the switch is off, because the pass belongs to the step the switch gates, V1-3.15 and T-V1-4 hold a switched-off document to 0 places, and a place lives as long as its host only while the step runs (V1-2.7, as SLR5-02 words it), so a place missing or left standing after the edit would break T-V4-74 (b)'s equality. Round 6 withdrew round 5's narrower form — the edit as a commit of V4 §3.10's list that ran the pass over every standing access and tombstoned every opening place, with the underground held byte-identical — because the switch's first reader is S2 (V1-3.15's `λ_b` 0 on V1-3.5.9's land estimate), so the edit re-types blocks and fabrics and re-cuts plots and buildings, and the underground's accesses, excavation reading and dwellings follow by this volume's ground-edit and closure rules (V4 §4.3, §3.10): inside that commit there is no fixed set of standing accesses and nothing below is byte-identical, and the edit is priced as the re-derivation. The §4.3 row covers every change of the resolved value, as V1-3.15's bullet re-derives every change (a change inside (0, 1] keeping the gate, the pass running as at generation). The rows cite V1-3.15's *The switch's edit* and "that first reader stage", never a stage number, so they hold whether volume 1 keeps the first-reader re-derivation or narrows it by §7.6's slice rule. The dwelling closure's opening rungs, which J-V4.119 already runs the pass in, join the same list so that the one list volume 1 cites is whole |

## 10 Base change requests

Each names the base section's exact heading, quotes the current text once and gives the new text or the mechanism. The
volume is written as if all were applied. Where file g's base side (items 102–109) is applied by the coherence pass, a
BCR here asks only for what V04 needs beyond it. **One BCR changes a ground output (C4-01):** BCR-19 wires the forecast
into S7b (6) and (7), so under the default presets a CITY sends households and `preferred` uses below and its ground
changes by them — a one-time declared shift of the M6-U output version (BCR-22), never under the parity presets
(BCR-23). Every other BCR declares what the base names and never declares, gives a staged field its producer, or adds the
staged layer's own rows.

**BCR-1 — the outfall type and its producer.**
* `### 2.3 Terrain and water` — current: "flowAccum: Uint32Array /* on `hydro` */; outfalls: Outfall[];" — new: the same
  line with the comment `/* S1 (3)'s drainage outlets (§4.2): one per bank stretch of outfallStretchM (50 m) of each water
  body into which D8 flow from land enters, and per 50 m of frame edge the flow leaves by — the one of largest accumulation
  per stretch; read by the network stage (II.7.2) */`, and after `interface HydroGrid …` the declarations of
  `OutfallInto` and `Outfall` exactly as V4 §2.2 gives them.
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace` —
  current: "(9) Drainage stays queryable." — new: "(9) Drainage stays queryable, and S1 writes `Terrain.outfalls` (§2.3):
  per water body, each 50 m bank stretch into which D8 flow from land enters, and each 50 m of frame edge the flow leaves
  by, as one `Outfall` at its cell of largest accumulation; recomputed by S1's water operator after a water edit (§7.3 (b))."

**BCR-2 — `flowToward` derived; junctions on the underground.** `### 2.4 Ways (the skeleton) and typed edges` — current:
"slopeP95?: number; flowToward?: 'from'|'to' /* sewer hook: drainage direction along the way */; corridor?: FaceRef /* L2 view */; lifecycle: Lifecycle }"
and "interface Junction { id: Id; vertex: VertexRef /* ('junction', id) */; arms: Id[]; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square'; wedges?: FaceRef /* L2 view */ }"
— new: the `Way` line without `flowToward`, and after the interfaces: "`wayFall(way)` — the drainage direction along a
way, a reading, never stored: the terrain sampler's height at the spine's `from` end less that at its `to` end, beyond
`NetworkRule.levelCm` (10 cm) either way, gives `'to'` or `'from'`, else `'level'` (II.7.2); a stored `flowToward` in an
older document is dropped on load (§7.5)"; and `interface Junction { id: Id; vertex: VertexRef /* ('junction', id) */; arms: Id[] /* ways; on an underground part the tunnels or galleries meeting there (V4) */; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square'; wedges?: FaceRef /* L2 view */; chamber?: true /* underground: a navigable junction wedge drawn and used as a sewer chamber (II.7.2) */ }`.

**BCR-3 — tunnels and chambers.** `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records`
* current: "invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; follows?: Id /* way */; outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string;"
  — new: "invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; follows?: Id /* way */; outfall?: Outfall /* §2.3; re-seated when its shore moves (II.7.2) */; serves: Id[] /* the plots drained, sorted by address; a plot's buildings drain through it */; chambers?: FaceRef /* a view: the wedges of its end junctions whose Junction.chamber is set, never stored separately */; depthOffsetCm?: Cm /* a hand offset added to the derived invert at every knot; absent 0; setAttr only */; name?: NameRef /* a trunk's or a culvert's name (S13a); a setAttr protects it (§2.8) */; grilles?: Cm[] /* BCR-44: a view, never stored — the stations along the centreline where the run crosses a wall_strip, a quay wall or a sea wall (item 106) */; rule: string;"
* current: "interface Chamber { id: Id; system: Id; outline: ChainRef /* ('chamber_wall', id): its closed L1 chain */; floor: FaceRef /* L1 */; elevationCm: Cm /* its floor */; ceilingCm: Cm /* clear height above the floor: caps what stands in it (II.7.5) */;"
  — new: the same with `kind: ChamberKind /* ossuary, hall, breakdown, workings, cistern, streetVault, bridgeVault, square, storey, market, cellar, storage, and the ruin's temple, court, tomb, vault, room, gate (the underground volume §2.2; C4-29) */;` after `system: Id;`, and `type ChamberKind` declared beside it as the underground volume §2.2 gives it.
* `UndergroundSystem.sources`' comment gains, before "or the undercity neighbourhood's `District`": "the building of a
  subterranean dossier institution whose passage the connection stage dug,".
* The stretch split of II.6 ("its chambers (`Tunnel.chambers`)") reads the view: nothing to re-point.

**BCR-4 — the undercity's core and the outskirts' writer.**
* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector` —
  current: "parent?: Id /* item 65: an undercity neighbourhood's surface district, the one it shadows (II.7.5) */; outskirts?: Id[] /* item 65: an undercity neighbourhood's sewer-front blocks in part 0 (II.7.3) — a link across parts, never a second key (J-A65.31) */;"
  — new: the same, `outskirts`' comment ending "…(J-A65.31); written by the connection stage (II.7.6)", and
  `core?: Id /* item 65: an undercity neighbourhood's main chamber — its plaza and black market (II.7.5) */;` after it.
* `### 2.8 Identity, lifecycle, provenance, the entity registry` — current: "`parent` and `outskirts` (written by the
  undercity's stage)" — new: "`parent` and `core` (written by the undercity's stage) and `outskirts` (written by the
  connection stage)".

**BCR-5 — the tail.** `### 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer)`
— current: "txForm: 'declared'|'callback' /* §3.3; the op form per stage, §4.1 */ }   // §14's Stage extends it" — new:
"txForm: 'declared'|'callback' /* §3.3; the op form per stage, §4.1 */; phase?: 'main'|'tail' /* 'tail': run after the first paint (§4.1); absent 'main' */ }   // §14's Stage extends it". (Amended by the revision, C4-02, and the reconciliation, SL-06: the tail bullet below says that the tail writes no ground geometry, that only its reconcile stage writes ground uses and household counts, and that its S13a step writes the neighbourhood volume's opening places.)
`### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker` — after the bullet beginning
"* **The one-click first paint is the complete city LOD (SCL-4).**" add the bullet: "* **The tail.** Stages declared
`phase: 'tail'` — the underground layer's (II.7) — run after the first paint, eagerly and serially on the generation
worker in their topological order, before the worker takes any queued edit, yielding between stages only to a queued view
request; they write no ground geometry: only their reconcile stage writes ground uses and household counts, for what the
underground could not seat (the underground volume §3.7a), and their S13a step the neighbourhood volume's opening places
(`HoodPlace` records and labels, V1-3.7.1); the ground's model digest and
the root model digest are finalised after them; their time is reported as `timings.tail` (§12.4). A replay runs them at
the same fold position."

**BCR-6 — the underground at an epoch.** `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)`
* current: "A tunnel silts, caves in and is sealed by the same lottery at the underground's rate, is never demolished by
  the engine (J-A11.41), and is reopened before a new one is dug." — new: "The underground's candidates, weights and
  conversions are `UndergroundFade.candidates` and `.apply` (II.7; the underground's rows in `tables/under/fade.json`): a
  tunnel, gallery or chamber silts, caves in, floods or is sealed by its own lottery at the `decline` step, after the
  fabric pool (the evolution volume's `under.fade` participant), at the underground's rate with
  `UndergroundFade.candidates`' weights, uncapped by the district's `fabric` cap and outside the pool's persistence order,
  never demolished by the engine (J-A11.41), and is reopened before a new one is dug; the undercity's size is re-read and
  a neighbourhood cleared by `UndercityEpoch.reread` (II.7.5; the evolution volume's `under.undercity`)."
* applied after file f item 574 (BCR-V6-28): its current text is step (6) as that request leaves it (TT-07) — current:
  "(6) new faces of a new stage — the underground crowding hook first sends" — the step gains, after S11 of the new stage:
  "then, where `Features.sewers` is on, `SewerStrategy.extend` connects the new faces to the network, reopening closed
  runs on its paths first (II.7.2); the first epoch the feature turns on, `SewerStrategy.derive` lays the network whole
  over the current ways instead, every existing entity kept (the evolution volume's `under.extend`)".

**BCR-7 — F-NET.** `### 5.2 Failure classes: detection, ladder, test` — current (F-UNDER's ladder cell): "band depth →
the band's lower depth → the class minimum depth → a `vacant` run, reported; a network run needing more fall than the
ground gives is re-routed toward the nearer outfall, never trenched (II.7.2)" — new: the same without its last clause,
and a row after it: "| F-NET† the sewer network cannot be laid as asked [II.7.2] | the network stage (staged — this row is
its hook) | no admitted outfall; a run's crown deeper than `coverMaxCm`; a drain's head too deep | outfalls: the moat →
one cess-field outfall; a run: re-route (≤ 3 attempts, no draw) → a local root → gutters and pits, reported; a drain:
dropped, its plot unconnected — never a trench, never a terrain change | T-V4-1 – T-V4-3 (the underground volume) |".

**BCR-8 — points forms and paths of the underground tools.** `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`
* current: "| { t: 'drawTunnel'; points: PointCm[]; kind: Tunnel['kind']; widthCm?: Cm; headroomCm?: Cm; system?: Id" —
  new: the same with `from?: PointsForm /* two points: the route derived at the dry run (II.7) */;` after `system?: Id …;`.
* current: "| { t: 'drawChamber'; system: Id; polygon: PolygonCm; floorCm?: Cm }" — new: "| { t: 'drawChamber'; system:
  Id; polygon: PolygonCm; floorCm?: Cm; from?: PointsForm /* one point and a size, or three or more points (II.7) */ }".
* the tunnels row of the edit-target table, current: "`setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived
  from them, §2.7)" — new: "`setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived from them, §2.7 —,
  `depthOffsetCm` — the invert re-laid, refused past the cover limit —, `name`)"; the chambers' `setAttr` list gains
  `kind` and `ceilingCm`.

**BCR-9 — the network's two controls.** `### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)`
— current: "*Sewers:* one control with two meanings by rung —" — the bullet gains, after its sentence on the layer hidden
by default: "Two further model controls sit beside it in the advanced panel: *Sewer layout* (`layers.sewers.family`:
follows the streets, follows the drainage, mixed — default mixed) and *Sewer style* (`layers.sewers.preset`: historical,
navigable — D-3's toggle, default historical); each consuming S7b and the network stage (the navigable preset always
allocates below, the undercity presets change its bound and sources), locality *re-derive from S7b* with carry-over
(§6.3), discrete" (amended by the revision, C4-04; BCR-37 aligns the TOWN toggle).

**BCR-10 — the view.**
* `### 8.4 Layers, shadows, heights` — current: "interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible:
  boolean; castsShadowOnto?: Layer; exportSeparately: boolean;" — new: the same with `underView?: 'cutaway'|'overlay'|'solo' /* the underground layer: the ground ghosted beneath, the ground at full, or the underground alone (II.7); default cutaway */;` added (the unexcavated style's toggle is volume 9's per-viewer view key `showUnexcavated`, BCR-V9-20, not a `LayerSpec` field; J-VI.19, file f item 413).
* `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)` — the role
  vocabulary gains `rock` (the hatched halo round underground voids) and `void` (a void's floor), with a row in every
  shipped family; the `quarry` program's pillar squares are laid at `roomM` pitch, side `√pillarShare × roomM`, along a
  `workings` chamber's OBB axis.
* `## §14 Package and module layout, key interfaces, dependency rules, extension points` — the keymap gains PageUp and
  PageDown: the underground band up and down while the underground layer is active.

**BCR-11 — the tail's budget row.** `### 12.4 CITY per-stage split (SCL-3)` — current: "| the sewer network and underground
stages (owner-staged; II.7.2, II.7.3) | II.7 | not on the one-click path until they are built and registered; measured at
their intake — the drain connection's distance query counted with S10b's rasters, the underground cut at S10's per-plot
rate on its own arena; a hidden layer costs nothing to draw | (staged) |" — new: "| the underground tail (II.7; after the
first paint, §4.1) | II.7 and the underground volume §6 | the network, the void systems, the sewer-front and undercity
neighbourhoods, the ruins, the arch vaults, the access pass, the links and the reconcile: p95 ≤ 10 ms at each village
rung; p50 26 · 71 · 162 ms at TOWN · CITY · METROPOLIS historical, p95 36 · 112 · 253; navigable p95 61 · 192 · 343 |
(tail) |", and a row
after S7b's (C4-19): "| S7b's underground forecast (II.7; the underground volume §3.3) | §4.5 | the network's graph, tree
and sizing on S4–S6's ways, the void capacities, the undercity's existence, the voids' access chances | 3 ms (6 at
METROPOLIS, 1 at a village rung) |", the CITY critical path re-summed (≈ 262 → ≈ 265 ms p50) and METROPOLIS's by its 6 ms,
the p95 laws of §12.3 standing. `### 12.8 Memory (what is counted, per rung)` gains the underground parts' line (part 0
≤ 1 MB historical, ≤ 3 MB navigable at CITY; a ruin part ≤ 2 MB; each other part ≤ 1.5 MB).

**BCR-12 — the package.** `## §14 Package and module layout, key interfaces, dependency rules, extension points` — current:
"@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]"
— add after it: "@plat/under    the underground layer (staged, M6-U): the network, its forecast, the sewer-front neighbourhoods, the
void systems, the undercity, the connection stage, the closure generators, the fade — over @plat/kernel, @plat/model,
@plat/tables, @plat/plots and @plat/content; registered in @plat/layout's registry; never imported by the ground's
packages"; `@plat/tables` gains "the underground's `tables/under/network.json`, `layout.json` and `fade.json` and the
dossier's `tables/dossier/sanitation` and `subterranean` row sets".

**BCR-13 — the build plan.** `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`
— after the M5 row add the row "**M6-U — the underground layer** (staged by the owner; built when the owner orders it,
after M5 or beside it)" with the underground volume §8's content, exits and estimate (28.25–39.25 pw), priced outside the
base total like every staged engine until ordered. `# Staged by the owner's roadmap (this document defers nothing)` —
the underground row's subject gains "(built at M6-U by the underground volume)".

**BCR-14 — the dossier's underground facts.** `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)`
— current (DR17): "| DR17 | the underground: sewers, accesses, the undercity | the population; sanitation records;
subterranean kinds; the crime scalar (§10.2's staged crime row, item 88); the blueprint's `disorder`; `undercity` | II.7's
feature law; II.7.5 with §4.6's staged crime term | `blueprint.features`, `sewer` | the underground mode only with a
navigable run; a required undercity exists |" — new: the rule cell "II.7's feature law — a sanitation record (an
institution matching `tables/dossier/sanitation`) sets `toggles.sewers` to `on`; a subterranean institution matching
`tables/dossier/subterranean` forces its system kind (II.7.6), one matching none takes the `arena: 'underground'` hard row
and, placed on the surface, a dug underground from its cellar (II.7.6's connection stage); II.7.5 with §4.6's staged crime
term", and the bar cell "…; a required undercity exists; a sanitation record gives sewers; a subterranean record has an
underground". **Amended by the revision (C4-05, C4-16, C4-02 (4), C4-49 (7); BCR-34, C4-55):** the rule cell further
reads "— the two row sets' rows and binding targets are the underground volume's §2.3a (`Sewage system` → the sewer
system; `Underground network` → the dug network; `Underground city` → `undercity: 'require'` and the first
neighbourhood; `Black market bazaar` → the core's black market; a catacomb record → one complex on a burial face, its
surface seated as a `cemetery` use at S10b where the roster holds no burial face; a crypt record → its church's crypt,
never a system; a mine or cistern record → its working or cistern); a custom record matches by its resolved profile (item
104 (a)); an institution taking the underground hard row that S10b places on the surface does so only on a plot whose
terrain gate (§2.6) admits at least a half cellar (a hard row), its basement forced (§2.6); the ruin's sources (BCR-34) —
an `ancient_ruins` deposit or a `ruined-landmark` record, a `magical_node` deposit or a ley-line income row, a `magical`
history event or an ancient founding, a delving institution as support — the mining deposits and `mountain` terrain
(the cavern's rows), the church-class records and their counts (the catacomb count) and the burial records and the
`Cemetery network` (its candidates)".

**BCR-15 — the bars.** `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT` — after the
closure rule's group ("* *The closure rule (item 66; §7.3 item 9).*") add: "* *The underground layer built (M6-U).* The
underground volume's T-V4-1 – T-V4-75, run from M6-U's steps; the hook tests above run on its generated output."

**BCR-16 — the VTT underground scene.** `### 11.1 Formats` — current: "* **Per layer:** one file per model layer — the
underground one per depth band (II.7.3) — its elevation in the file name" — the bullet gains: "; an underground band's
scene takes `line_of_sight` from every void kerb and chamber wall and every underground building's footprint less its
doors, `portals` at every access point (closed when locked or bricked), every link (closed when gated or secret) and every
underground entrance, `lights` the band's lights and shafts, each only where the export's key admits it (§8.1 item 7)".

**BCR-17 — label kinds.** `### 9.1 What is model and what is view` — current: "interface LabelEntity { id: Id; target: Id;
kind: 'district'|'quarter'|'region'|'way'|'landmark'|'place'|'water'|'wood'|'gate'|'title'|'annotation'|'address';" —
new: the kind union gains `'tunnel'|'system'` (a named sewer run along its centreline; a void system at its main band's
floor centroid; II.7).

**BCR-18 — naming slices.** `### 10.4 Names, descriptions and setting packs` — after the bullet "* **An undercity
neighbourhood (item 65; J-A65.40)** is named" add: "* **The underground's other names (II.7).** A trunk sewer run and a
culvert take a name from the naming pack's `sewer` slice (a culvert reads as its brook's); a void system from its kind's
slice (`catacomb`, `cavern`, `quarry`, `vaults`, `buried`), a catacomb reading its source church's name and a buried town
its quarter's; an undercity's plaza from the `undercity.plaza` slice; a catacomb complex its cemetery's name (a
churchyard's its church's; a quarry ossuary its quarter's); a ruin the ancient civilisation the dossier's history names,
else the `ruin` slice (item 109 (g)) — each drawn once on its own `naming` stream in the tail's S13a."

**BCR-19 — the sewer-front allocation's prediction (RV-pc-4).** `### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order`
— current: "(the `navigable` preset always; `historical` when the trunk law of II.7.2 gives at least one navigable run of
`minRunM` = 60 m, predicted at S7b from the arterials' and main roads' served areas, which exist by then, since the mains
follow them)" — new: "(the `navigable` preset always; `historical` when the trunk law of II.7.2 gives at least one
navigable run of `minRunM` = 60 m — both predicted at S7b by the network forecast, which runs the network stage's graph,
tree and sizing on the ways and district faces that exist by then, for every family)"; and "The allocation is capped by
the predicted capacity" reads the forecast's `capacityHouseholds` × `forecastSafety` (0.85; C4-02). `### 4.5 S6
Districts, quarters and fields · S7b Allocation and district claims` (6) and (7) read the forecast for the capacity and
the voids, each allocation capped at `forecastSafety` × its forecast capacity; (7) reads the forecast's existence verdict
(P6) instead of drawing; and (6) gains (d), at every rung: the **void-dwelling part** — `voidDwellingHouseholds` of the
poorest band for the cavern and ruin voids whose forecast access chance reaches `accessForecastMin` (the underground
volume §3.3 P7), placed by F6 — its share an `extension` cell (BCR-23); the underground pseudo-district exists wherever
(6) allocates, (d) included, at every rung.

**BCR-20 — the buried town's squares, the cistern's host, the network's interface.**
* `### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)` — current: "its galleries
  that region's way centrelines and its chambers their buildings' ground storeys" — new: "its galleries that region's way
  centrelines, its chambers their buildings' ground storeys and its squares (a `square` chamber each: every square face
  and every square block of the region, the underground volume §1.2)"; current: "and a
  cistern under the oldest precincts and the castle where `dist.water` exceeds `cisternDistM` (400 m) — each a chamber or a
  short run of vaults under its way or precinct, under public ground only (II.7.3's surface constraint applies)" — new:
  "…under public ground only (II.7.3's surface constraint applies, a cistern's own precinct or castle court admitted)".
* `## II.6 The staged layers — floating islands and sewers: the hooks the base carries now` — current: "interface
  SewerStrategy { derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset:
  'historical'|'navigable' }, ctx: StageContext, k: Kernel): KernelResult<Tunnel[]> }" — new: "interface SewerStrategy {
  derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' },
  ctx: StageContext, k: Kernel): KernelResult<{ system: UndergroundSystem; tunnels: Tunnel[]; junctions: Junction[];
  access: AccessPoint[] }>; extend(doc: Document, epoch: number, ctx: StageContext, k: Kernel): KernelResult<{ tunnels:
  Tunnel[]; junctions: Junction[]; access: AccessPoint[]; reopened: Id[] }> }".

**BCR-21 — an access's state follows its host.** `### II.7.4 The hook interfaces and the base's part` — current:
"state: 'open'|'locked'|'bricked' /* item 64 (c): stored, set by the rule's row or an edit; it reads collapsed or bricked while its element is closed (II.6), a derived reading, never stored */;"
— new: "state: 'open'|'locked'|'bricked' /* item 64 (c): stored, set by the rule's row, an edit, or the access closures of its host's change (a use turned to a class whose access row is 0, a ground host no longer admitted: `bricked`; II.7's volume §3.10); it reads collapsed or bricked while its element is closed (II.6), a derived reading, never stored */;". Its lifecycle row is V4 §2.6's.

**BCR-22 — T14-1's parity clause (C4-01).** `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests,
B-EDIT` — current: "with the layer hidden a CITY's render matches, pixel for pixel, the render the same seed gave before
the staged stages registered." — new: "with the layer hidden and a parity preset (`MFCG` or `FTG`) on, a CITY's render
matches, pixel for pixel, the render the same seed gave before the staged stages registered; under the default presets
the ground differs only by the households and `preferred` uses S7b (6) and (7) send below, a one-time shift of the M6-U
output version recorded in `plat/goldens/` (§13.3)."

**BCR-23 — the underground's shares are extension cells (C4-01).** `### II.7.4 The hook interfaces and the base's part` —
current: "interface UndergroundRule { undergroundShare: Record<Rung, number>;" — new: "interface UndergroundRule {
undergroundShare: Record<Rung, number> /* an `extension` cell: 0 under the parity presets (§7.6), as are `crowdingShare`,
the class table's `underground: 'preferred'` and `undercity: 'preferred'` shares and the void-dwelling share (S7b (6)
(d)) */;". `### 7.6 The override layer and editable tables (G-P12; owner amendment 5)` — current: "the island and sewer
rules and the ladder's tendencies among them" — new: "the island and sewer rules — the underground's shares among them
(II.7.4's `UndergroundRule`) — and the ladder's tendencies among them".

**BCR-24 — the `dug` system's generation-time creators (C4-06).** `### II.7.6 Catacombs, caverns and quarries; depth
bands and the connection graph (item 65)` — current: "(the private passages an access edit or an undercity lifeline's
closure digs, item 66)" — new: "(the private passages an access edit or an undercity lifeline's closure digs, item 66,
and those the connection stage digs at generation for an undercity lifeline and for a subterranean dossier institution,
keyed by the district's lineage or the institution's binding key)". `### 7.3 Locality — effective scope, local operators,
edit fates, recorded inputs, the oracle (G-P3)`, item 9 (d) — current: "and every later edit kind that implies missing
prerequisites declares its generators the same way." — new: "…the same way. The connection stage also calls the lifeline
and dossier-institution generators at generation (II.7.6), with no `ClosureRecord`: generated pieces re-derive with their
owner, edit-made pieces are held, and a `regenerate` on the `dug` system re-derives only its generated pieces."

**BCR-25 — the underground's read-ahead (C4-09).** `### 4.1 Stage graph, evaluation model, laziness contract,
transactions, the worker`, the *Declarations read ahead* bullet — current: "S10b takes the declared places (`placeAt`,
`assign`) as positive placements." — new: "S10b takes the declared places (`placeAt`, `assign`) as positive placements;
the underground tail's stages (II.7; staged) take the declared tunnels, galleries, chambers, links, accesses and void
neighbourhoods (`drawTunnel`, `drawChamber`, `addLink`, `placeAccess`, `addUndergroundAccess`, a `quarter` or
`drawBoundary` on a void part) as held elements, a declared element making its system exist (the underground volume
§4.7)."

**BCR-26 — the connection stage's interface (C4-12).** `### II.7.6 …` — current: "interface UndergroundLinkStrategy {
link(doc: Document, rule: LinkRule, access: UndergroundRule['access'], ctx: StageContext, k: Kernel): KernelResult<{
links: UndergroundLink[]; access: AccessPoint[] }> }" — new: the same returning `KernelResult<{ links:
UndergroundLink[]; access: AccessPoint[]; outskirts: { district: Id; blocks: Id[] }[]; dug: { system?:
UndergroundSystem; galleries: Gallery[]; chambers: Chamber[] } }>`, and beside it `interface AccessPassStrategy {
run(doc: Document, rules: { link: LinkRule; dig: DigRule; openings: OpeningRow[]; catacomb: CatacombRule }, ctx:
StageContext, k: Kernel): KernelResult<{ links: UndergroundLink[]; access: AccessPoint[]; headings: Gallery[] }> }` (the
underground volume's U-ACCESS, registered after the void systems); the registration comment — current: "which writes
link records and access points and no geometry but their link_end and access_point vertices, one part per transaction;"
— new: "which writes link records and access points and no geometry but their link_end and access_point vertices and the
`dug` pieces of lifeline closures and of the dossier's subterranean institutions (Dug passages), each on the `dug` part,
one part per transaction; the access pass, before the undercity, writes the proximity, overlap, mine-breach, crypt and
reuse links, the dig, opening and crypt accesses and a mine's heading galleries;".

**BCR-27 — the surface rule within reach of the ground (C4-18; applied only if T-V4-41 fails at U2, J-V4.60).**
`### II.7.3 …` — current: "Before a plot is committed its ring is tested on the ground arena through `pointLocate` and
`resolve`" — new: "Before a plot whose ceiling lies within `surfaceClearCm` (600 cm) of the ground is committed, its ring
is tested on the ground arena through `pointLocate` and `resolve`" (a deeper plot is free of the surface, as II.7.6's
shallow elements are), and II.7.2's profile table gives the navigable `main` a `coverCm` of 600.

**BCR-28 — culverts connect plots (C4-21; J-V4.73).** `### II.7.1 …`, the connection table — current: "connected when a
main lies within `reachM` = 60 m of its frontage midpoint, else reported as unconnected" — new: "connected when a main or
a culvert lies within `reachM` = 60 m of its frontage midpoint, else reported as unconnected".

**BCR-29 — the public openings (C4-48).** `### II.7.4 …` — current:
"kind: 'stair'|'ladder'|'hatch'|'door'|'shaft'|'well'|'cellar_stair'|'grating'|'mouth'" — new:
"kind: 'stair'|'ladder'|'hatch'|'door'|'shaft'|'well'|'cellar_stair'|'grating'|'mouth'|'sinkhole'|'collapsed_shaft'|'ruin_entrance'
/* … ; sinkhole, collapsed_shaft, ruin_entrance: public openings into a cavern, a quarry or mine, or a ruin (item 109 (j)
(3) (ii)) */".

**BCR-30 — an access's cause (C4-48).** `### II.7.4 …` — current:
"source: 'neighbourhood'|'basement'|'system'|'lifeline'|'edit'" — new:
"source: 'neighbourhood'|'basement'|'system'|'lifeline'|'edit'|'dig'|'opening'|'overlap'|'crypt'|'dossier' /* … a
building's dig into a void, a public opening, a system grown through a void (item 109 (j) (3), (3b)), a church's crypt
joining a catacomb (item 109 (k) (2)), a dossier's requirement */; cause: AccessCause /* persisted: the rule, the system
and the event that made it; absent in an older document `legacy` (the underground volume §2.2) */", with `AccessCause`
declared as the underground volume §2.2 gives it.

**BCR-31 — the ruin's depth band (C4-51; J-V4.57).** `### II.7.6 …`, *Depth bands* — current: "caverns 5–60 m following the
rock, a buried town at its old grade, dug passages 2.5–6 m)" — new: "caverns 5–60 m following the rock, a buried town at
its old grade, ruins 4–30 m by their age (item 109 (c); the underground volume §3.5.0a), dug passages 2.5–6 m)",
superseding g item 109 (c)'s "8–30 m" when the coherence pass applies it.

**BCR-32 — the system's variant and name (C4-53).** `### 2.7 …` — current: "interface UndergroundSystem { id: Id; kind:
'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'" — new: "interface UndergroundSystem { id: Id; kind:
'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'|'ruin'" (g item 109 (b)), and after the kind's comment
`variant?: 'fissure' /* a cavern of ordinary rock at hilly or mountainous relief (item 109 (a) (2)) */; name?: NameRef /*
its label's text (the underground volume §5.4) */;`.

**BCR-33 — a link's cause; reuse (C4-54).** `### 2.7 …` — current: "kind: 'open'|'gated'|'secret'|'collapsed'|'flooded';
via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }" — new:
"kind: 'open'|'gated'|'secret'|'collapsed'|'flooded'; via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|
'secret'; cause: 'proximity'|'overlap'|'mineBreach'|'reuse'|'lifeline'|'edit'|'dig'|'dossier'|'crypt'|'legacy' /* why it
exists; item 109's "breach" is `via: 'breach'` and its "reuse" is `cause: 'reuse'` — superseding g's HOMES wording "link
kinds breach and reuse" */; rule: string; lifecycle: Lifecycle }"; and the `Chamber` line — current: "closure?:
'collapsed'|'sealed'|'flooded'; knownTo?: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }" — new: the
same with `reusedBy?: { system: Id; since: number } /* an element another system adopted (item 109 (d)) */;` before
`rule`, and the same field on `Gallery`.

**BCR-34 — the dossier's ruin, magic, mining, church and burial facts (C4-55).** Carried in BCR-14's amended DR17 rule
cell (above); V08 owns the port side; the underground volume §1b.5 traces each fact to its reader.

**BCR-35 — the ruins toggle (C4-55; D-3).** `**D-3 — realism in the base.**` — current: "the game-system stat pack (D-32);
magical lights, which exist only under" — new: "the game-system stat pack (D-32); ancient ruins without a dossier source —
a model setting `recipe.layers.ruins`, off by default, admitting item 109 (b)'s blueprint chance (a dossier source makes a
ruin whatever it says; the parity presets 0); magical lights, which exist only under". `### 7.8 …`, the layer controls
bullet — current: "`elaborate` (item 28) is no control:" — new: "*Ancient ruins:* the model feature `recipe.layers.ruins`
(off / on; consuming stage S7b, since a ruin feeds the forecast's void capacity and access chance; locality *re-derive
from S7b*; discrete), in the advanced panel. `elaborate` (item 28) is no control:".

**BCR-36 — the catacomb's sources, share and entrance (C4-49; g item 109 (k) (2)'s source list is the coherence pass's).**
`### II.7.6 …`, the *Catacombs* bullet — current: "(crypted church 0.6; churchyard 0.25 at TOWN, 0.4 at CITY, 0.5 at
METROPOLIS; precinct 0.4)" — new: "(churchyard 0.25 at TOWN, 0.4 at CITY, 0.5 at METROPOLIS; a cemetery or a `Cemetery
network` ground 0.3, 0.45, 0.55; a monastery's burial ground 0.4; a CITY or METROPOLIS quarry ossuary 0.3 — the
underground volume §3.5.1)"; current: "the source's share of its religion's temples, §10.2" — new: "the source's burial
share, the share of households whose nearest open burial face it is (the underground volume §3.5.1)"; current: "an
entrance stair from the source's building" — new: "an entrance stair on the source's burial face, its head in the face's
chapel where one stands (the underground volume §3.5.1)".

**BCR-37 — the TOWN toggle's locality (C4-04).** `### II.7.1 …` — current: "locality class *re-derive from the network
stage* — the two staged stages of II.7.2 and II.7.3 run again on the sewer's part 0 and the ground stays byte-identical,
§7.3)" — new: "locality class *re-derive from S7b* — S7b (6) and (7) re-run with carry-over (§6.3), a TOWN toggled on or off
gaining or losing the underground allocations, then the underground tail; the ground's geometry outside the re-placed
uses stays byte-identical, §7.3)". `### 7.8 …` — current: "consuming stage S0; locality *re-derive from the network
stage*, confined to the underground arena;" — new: "consuming stages S0 and S7b; locality *re-derive from S7b* (II.7.1);".

**BCR-38 — the light shaft's opening and shadow (C4-17, C4-32; SL-16).** `### 8.4 Layers, shadows, heights`, (b) — current:
"current global light's × the opening's area ÷ 1 m², a cosine lobe whose radius is its depth plus 4 m" — new: "current
global light's × the opening's `areaM2` × its `lightTransmission` (the underground volume's `UnderLayoutRule.openings`) ×
its direct-light visibility — the ground pass's shadow term at its `ground.at` under the current sun (every caster
included, a sky island's slabs among them, the sky volume §5.3 (1)) — plus its sky-ambient share, a cosine lobe whose
radius is its depth plus 4 m".

**BCR-39 — light rows under no magic, and by biome (C4-28).** `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots ·
S10b Placement · S11 Site plans and footprints — the plot model`, `LightRule` — current: "magic?: ('low'|'high')[] /*
magical rows: only under these values of the circumstance */;" — new: "magic?: ('none'|'low'|'high')[] /* the circumstance
values a row lights under: a magical row's `low`/`high`; a fire row a magical row replaces, `['none','low']` */; biome?:
string[] /* a row admitted by the biome beside the circumstance (II.7.6's glowing fungus) */;".

**BCR-40 — the chamber fill by kind, the ruin program, the unexcavated style (C4-29, C4-56).** `### 8.2 Style sheets as
data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)` — current (the `states` chamber row):
"| chamber | the system's kind — ossuary, cavern hall, quarry room, cistern or vault, undercity chamber (II.7.6; II.7.5) |
the underground layer | replace: `chamber` with the system's fill; a flooded chamber in `water`; a collapsed one as a trace
with rubble stipple |" — new: "| chamber | its `Chamber.kind` (the underground volume's `ChamberKind`) | the underground
layer | replace: `chamber` with the kind's fill — `ossuary` niche ticks densening with its complex's `fill`, `workings`
the quarry pillars, `cistern` in `water`, `streetVault` and `bridgeVault` the `vault` hatch, `storey` and `square` as
buried-town floors, `cellar` and `storage` as `dug`, the ruin's kinds by the `ruin` program; a flooded chamber in `water`;
a collapsed one as a trace with rubble stipple; an unexcavated one in the unexcavated style |"; and the underground
program list — current: "`quarry` (a worked gallery's band with pillar squares) and `chamber`" — new: "`quarry` (a
worked gallery's band with pillar squares), `ruin` (double-lined masonry walls 30 cm apart, 60 cm column dots in halls
and temples, rubble stipple where collapsed; item 109 (g)), the unexcavated style (dashed kerbs at 40 % alpha, no fill,
no light; drawn only for a `secret` key while `showUnexcavated` is on; item 109 (j) (2)) and `chamber`".

**BCR-41 — a stage's own warnings (C4-30 (g)).** `### 5.4 The generation report` — current: "attempts: number;" (in
`GenerationReport.stages`) — new: "attempts: number; warnings?: Record<string, number> /* a stage's own non-kernel warning
codes — the underground's W_NET_CROSS, W_BASEMENT_NEAR_VOID, W_VOID_UNDER_WATER, W_RUIN_SIMILAR,
W_CATACOMB_BELOW_TOWN, W_SUBTERRANEAN_WET, W_OUTFALL_LOW (the underground volume) */;".

**BCR-42 — a ruin under the historical preset (C4-54 (4); J-V4.58).** `### II.7.5 …` — current: "its void sources vaults,
catacombs, quarries and a buried old town only" — new: "its void sources vaults, catacombs, quarries, a buried old town
and a ruin (a built void, item 109 (e)) only"; and `UndercityRule.presets` — current: "sources: UndergroundSystem['kind'][]
/* historical: vaults, catacomb, quarry, buried; navigable: all */" — new: the same with "historical: vaults, catacomb,
quarry, buried, ruin".

**BCR-43 — a forced basement for a subterranean institution on the surface (C4-02 (4), C4-07).** `### 2.6 Buildings,
heights and ground datum, wings, materials, sub-locations, the stage-3 interface`, *Basements* — current: "derived by the
same function, never rolled alone, from:" — new: "derived by the same function, never rolled alone — and forced by
II.7.6 step 1's requested-mode ladder (the probability taken as 1, the terrain gate kept) for a building whose use is a
subterranean dossier institution placed on the surface (DR17; the underground volume §3.7 L5) — from:"; its S10b hard row
is BCR-14's amended DR17 cell.

**BCR-44 — tunnel grilles (C4-33; g item 106).** Carried in BCR-3's `Tunnel` line (`grilles?: Cm[]`, a view).

**BCR-45 — the raised way's spans, piers, foundations and aqueduct delivery (C4-110-1, C4-110-3, C4-110-5, C4-110-6;
J-V4.79, J-V4.88, J-V4.93).** File g item 110 (b)'s raised-way record, homed by the coherence pass in `### 2.7 Walls,
gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers'
records` (g's current text: "Its piers are footprints on the ground part; the spaces between piers stay open or hold the
base's vaults (II.7.6)"). Mechanism to add to the record:
```ts
supports: { key: number /* minted once in order along the deck, never reused: a raised-way pier's identity with its way's lineage */;
  ring: Polygon /* its footprint on ground part 0 */ }[];            // its state is V06's BCR-V6-26
spans: { a: number; b: number /* the bounding piers' keys, a before b along the deck */;
  use: 'open'|'vault'; reason: 'way'|'water'|'flood'|'tall'|'low'|'slope'|'chance'|'cap'|'land'|'user';
  soffitCm: Cm /* derived: the deck's level at the span's crown less raised.deckDepthCm */;
  held?: true /* a user's setAttr on spans/<a>-<b>/use: an input override every regeneration keeps (§7.2) */ }[];
terminal?: { kind: 'basin'|'cistern'|'fountain'; at: PointCm; building?: Id /* its conduit_house */ };   // an aqueduct's
feeds?: Id[];                                                       // an aqueduct's: the public fountains it supplies
```
**The span rule**, run eagerly at the end of the raised way's generation (after §4.6's cut), for every raised way —
generated, declared or drawn, the user's operator running it on a new way — from ground part 0 only: (1) the under-deck
strip is the deck's plan outline between the two piers' inner faces; (2) the span is `open` where the strip meets a part-0
way's corridor (`way`), a water face (`water`) or a flood cell (`flood`), where `soffitCm` less `levelledGroundCm` (volume 5's BCR-V5-30) at the
span's axis midpoint exceeds `raised.vault.maxHeightCm` (900; `tall`) or falls below `minHeadroomCm` (250; `low`), or
where `levelledGroundCm` under the strip falls more than `maxFallCm` (150; `slope`); (3) otherwise one uniform on the
raised-way stream keyed by (the way's lineage, `a`, `b`) decides it against `raised.vaultShare[kind]` (viaduct 0.6,
elevated road 0.7, aqueduct 0.15) × volume 11's `era.raisedVaultM` × `culture.raisedVaultM` (1 by default), capped at 1:
`vault` (`land`) below it, else `open` (`chance`); (4) at most `raised.vaultCap[rung]` (10 at each village rung, 40 at
TOWN, 120 at CITY, 240 at METROPOLIS) spans are `vault` in the settlement, counted in the order the raised ways were
founded (their creation event, then address) and along each deck, the rest `open` (`cap`); (5) a `setAttr` on a span's
`use` is a held user edit (`user`). `raised.deckDepthCm` is 150 and `raised.supportFoundationCm` — each pier's depth below
the levelled ground, which the underground volume's foundation rule reads (§3.5.0) — is 400; all our own, calibrate-later,
`extension` cells. **The aqueduct's need test** (g item 110 (b): "the base's cistern rule reads the same distances")
reads only eager inputs — river and lake frontage, springs, the well estimate and the climate row's rain term per walled
area — and never the underground's placed cisterns, so no cycle arises; the underground's cistern rule reads the
aqueduct's delivery points (`terminal.at` and `feeds`) in return. And `### II.7.6 …`, the **Vaults** bullet — current:
"cistern under the oldest precincts and the castle where `dist.water` exceeds `cisternDistM` (400 m) — each a chamber or a
short run of vaults under its way or precinct, under public ground only (II.7.3's surface constraint applies)." — new:
"cistern under the oldest precincts and the castle where the lesser of `dist.water` and the distance to the nearest
aqueduct delivery point exceeds `cisternDistM` (400 m) — each a chamber or a short run of vaults under its way or precinct,
under public ground only (II.7.3's surface constraint applies); an aqueduct's cistern terminal takes a terminal cistern
under its conduit house's yard; and each span a raised way's record marks `vault` holds one arch vault at grade, laid by
the underground volume (§3.5.4) and following its raised way at every rung — the TOWN gate binds the other vault sources
only" (BCR-20's precinct admission and BCR-V7-27's gate sentence stand beside it).

**BCR-46 — the chamber's arch vault, span and monument (C4-110-1, C4-110-8).** `### 2.7 …`, the `Chamber` line as BCR-3 and
BCR-33 amend it — mechanism: `ChamberKind` gains `'archVault'` (the walled-in arch of a raised way's span, at grade), and
the line gains, before `rule`, `span?: { raised: Id; a: number; b: number } /* an arch vault's span: the raised way and its
two bounding piers' keys (II.7.6's Vaults) */; monument?: { host: 'temple'|'hall'|'tomb'; lay: TierLay; standing: number;
moundCm: Cm; count?: number } /* a ruin chamber's stepped monument (item 110 (c)), laid by volume 2's layTiers and decayed
from the top (the underground volume §3.5.0a) */;`.

**Amendments of the second round (2026-09-29).** BCR-11 (the tail row's times, C4-110-11), BCR-13 (the estimate,
C4-110-12) and BCR-15 (the bars' range) are amended in place above. BCR-20's cistern sentence is superseded by BCR-45's.
BCR-36's count reads the churches of the classes `cathedral`, `great_temple`, `church` and `v.parish_church` (SR1-24) on the ground
and on every live sky island, each once (SL-04), and each
monastery's church (C4-65 (2)). BCR-40's chamber row gives `archVault` the `vault` hatch, and its `ruin` program draws
its column dots at the chamber's modelled points, each standing monument tier's ring with its own shadow, the mound in rubble
stipple, a foundation pillar as a filled square and a drop at a wall as a small filled square (C4-110-8, C4-110-10,
C4-64 (5)). BCR-41's warning codes gain `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR` and
`W_TERMINAL_CISTERN_SKIPPED`. `Basement.crypt` (BCR-V3-20), `Entrance.faces` `'tunnel'` (BCR-V3-21) and PART III's
maintenance mode (BCR-V7-27) are the sibling volumes' requests, read here and not re-filed.

**Amendments of the second reconciliation (2026-09-29).** BCR-13's estimate (28.25–39.25 pw; J-V4.114), BCR-15's range
(T-V4-1 – T-V4-75; SLR1-15), BCR-45's span rule (its heights read through volume 5's `levelledGroundCm`, BCR-V5-30; SLR1-16)
and the BCR-36 paragraph's class key (`v.parish_church`; SR1-24) are amended in place above. No new base change is
requested: the hood line reads volume 1's `Recipe.product` (V01's own request), and `Foundations.apply`, the calamity
deaths, the buried terraces, the village working and the opening pass's callers are this volume's mechanisms over hooks the
base and its sibling volumes already declare.


## 11 Owner questions

Only the owner's decisions — product order and money. Everything else is decided above, each vetoable (section 9).

1. **When to build the underground.** The owner stages it "after the city is mastered". Recommendation: build it as
   milestone M6-U right after stage 2 (M5); if a second implementer pair is free during M5, run it beside M5 as a parallel
   lane: M6-U reads three of volume 1's M5 services (`fabricSignature`, `districtsAbove` and the opening pass), so its
   ruin-distinctness step (U3) and its undercity parent (U4) are built after V01's W15 delivers them, and until the opening
   pass registers the tail makes no opening places, a declared shift when it does (V4 §8; SLR1-05). The alternative — before stage 2 — delays the neighbourhood close-ups the owner
   placed next.
2. **Its cost.** About 28.25–39.25 expert person-weeks (≈ 14–20 calendar weeks at the base's staffing of two
   implementers and a verifier), priced outside the base's 185.5–248.5 pw like every staged engine until ordered (§16).
   The growth from 17.5–24.5 pw is item 109 (the ruins, caverns at every rung, optional access, the catacomb rules:
   ≈ 6.75–9.75 pw), the mechanisms the first critique required (≈ 1.5 pw) and item 110's underground parts with the V03
   and V07 hand-offs (the arch vaults, the foundations, the aqueduct seam, the monuments, the wall drops: ≈ 1.5–2.25 pw); the seam reconciliation adds the epoch contracts (≈ 0.25–0.5 pw, U5)
   and the crypt derivation moved from volume 3 (0.25 pw, U4), and its second round 0.5 pw (the village working, the
   opening places after generation, the foundations at an epoch and the other epoch seams; U3b and U5; J-V4.114).
   Recommendation: approve it with the order in
   question 1. If a cut is wanted, the cheapest to drop are the fissure variant and the ruin's `terraced` family
   (≈ 0.5–1 pw), then the navigable preset's passages and chambers and the cavern tubes (≈ 1.5–2 pw); the undercity
   (≈ 3–4.5 pw) and the ruins (≈ 2.5–3.5 pw) are the most visible to keep.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed evidence this volume was written from):
* The design already contains the amendments of 2026-09-27 and 28: `docs/lane-events.log` holds
  `amendments-c/validate LANDED` (14:19) and `amendments-c/closing LANDED` (16:13) on 2026-09-28, so the base was read,
  not the amendment files. File g's items 102–109 are not yet in the base (`docs/ARCHITECTURE.md` unchanged since 16:19,
  md5 01fea21f…); the revision read item 109 whole in `docs/AMENDMENTS-2026-09-28g.md` and cites g for its base side.
* The revision read the critique whole (`docs/volumes/critique/V04.md`, 1 489 lines, as amended ~21:05 for J111) and
  II.7 of the base whole (II.7.1–II.7.6), with every base passage a new BCR quotes.
* Every base text quoted in section 10 exists in `docs/ARCHITECTURE.md` (a whitespace-normalised script check over all 57
  current-text quotes of BCR-1 – BCR-43: 57 found).
* The base names `Outfall` (`Terrain.outfalls`, `Tunnel.outfall`) and never declares it, and no stage writes
  `Way.flowToward` (grep of the whole design: declarations and readers only) — BCR-1 and BCR-2 answer them.
* RV-pc-4 (the sewer-front allocation's prediction has no input under `drainage-lines`) stands in the current II.7.3 text
  — BCR-19 and V4 §3.3 answer it.
* The base's parity presets zero every `extension` cell (§7.6), and II.7.4 does not mark `undergroundShare` as one
  (read) — BCR-23 answers it; T14-1's pixel clause is as BCR-22 quotes it (read).
* §6.1's stream key carries the stage id and a salt (read), so item 64's draw in U-LINK and the dig draw in U-ACCESS never
  share a stream (J-V4.63).
* §2.6 reads a basement's water table as the nearest water body's shore sample plus a freeboard (read): N7's root-first
  outfall takes the shore height as the water surface on the same reading.
* No reference owns the subject: `research/findings/ftg-posts-c.md` records FTG's author stating underground
  settlements unsupported; the base's emulation notes (II.7.3, II.7.5 (f)) record MFCG's and FTG's absence. The hatched
  look's precedent is named by file and section only (`research/findings/watabou-extra-a.md` §2.7–§2.8).
* The clean-room checks are recorded in section 13's last paragraph.
* **The second round (2026-09-29)** read critique §8 whole (C4-110-1 – C4-110-12, C4-64, C4-65, with its notes from V02's
  fold); item 110 of file g whole; V02 §2.6, §3.15 and §3.17; V03 §2.1, §2.4, §3.7.2 (6), §3.7.4, §3.12, BCR-V3-20,
  BCR-V3-21 and its hand-offs; V07 §3.12, §3.16 and BCR-V7-27; V06's span, scope and ledger records (V6 §2.12, §2.13) and
  W65; critique-V11 V11C-35 and its `raisedWays` rows; critique-V1 V1C-70 and V1C-86. The base is unchanged (md5
  `01fea21f…`) and holds no raised way, `RetainingWall` or aqueduct yet, so BCR-45 quotes file g's text for the raised-way
  record; its quote of II.7.6's Vaults bullet and the three file g quotes of §3.5.4 and BCR-45 were checked verbatim by a
  whitespace-normalised script (4 of 4 found).

* **The reconciliation (2026-09-29, round 1)** read its 18 issues whole in `docs/volumes/critique/seam-layers-r0.md` and
  `seam-time-r0.md`, and the counterpart text at each seam: V05 §1.3, §3.3, §3.5 (3), §3.16 (4)–(5); V06 §2.1
  (`EpochParticipant`, `EpochScope`), §3.2's participant table and *The feature set at an epoch*, §3.18.1, §3.18.2,
  §3.18.3 (6); V01 V1-3.7.1, its `HoodPlace` and `hood.pins` rows; V08's deposit row and DR-V8.2 (the `magical_node`
  site drawn at `ruinCentre()`); file f items 244, 319, 325 and 414; and the base's II.7.3 surface test and access order
  (public ground named there as corridors, squares and gate plazas; residue, greens and yard parts admitted). Every
  replacement was applied by an exact-string script that asserted each anchor unique, and every marker re-verified after
  the concurrent base-change lane's writes to this file.
* **The second reconciliation (2026-09-29, round 2)** read its 15 issues whole in `docs/volumes/critique/seam-layers-r1.md`,
  `seam-time-r1.md` and `seam-settlements-r1.md`, and the counterpart text at each seam: V01 V1-2.6 (`HoodRecipe`,
  `contextRung`), V1-2.7's opening row, V1-3.7.1's opening pass, V1-3.10.1 (7), V1-3.16 (`catchmentOf`, `districtsAbove`,
  `fabricSignature`), its W15 row, risk 8 and notes (16)–(17); V06 §2.1 (`EpochScope.workings`), §2.4 (`CalamityRef.deaths`),
  §3.2's `under.*` rows, §3.6 (1), §3.11.6, §3.18.1 (2c), (4), (6), §3.18.2 (3), §3.19.4 (1), X14, X25 and T-V6-52,
  T-V6-67 – T-V6-69; V07 §3.16 (4), its `mine.workingDepthM` row and J-V7.49; V05 §3.16 (4), BCR-V5-26 and BCR-V5-30; V11
  §2.9's `v.` class namespace and `v.parish_church`; the base's `RaiseGrade` (II.7.6). The file was unchanged since round 1
  (md5 `78e40951…`) when the lane began; every replacement was applied by an exact-string script asserting each anchor
  unique; volume 1's counterpart sentences were applied in `docs/volumes/V01-neighbourhoods.md` after its own round-2 lane
  had landed (its md5 checked unchanged first).
* **The third reconciliation (2026-09-29, round 3)** read its 4 issues whole in `docs/volumes/critique/seam-layers-r2.md`
  (SLR2-08, SLR2-15) and `seam-time-r2.md` (TT-02, TT-07), and the counterpart text at each seam: V06 §3.2's `under.extend`
  row (the arch-vault reconcile now second, after the foundations), §3.5.2 *Accesses under the rubble*, §3.6 (1) (the
  crowding hook at `growth`), §3.18.1 (4) and (6) (F6's new dwellings by relocation; the vacated households re-housed
  inside the participant, which needs their ids), BCR-V6-28 (a)–(c); file f items 319 and 574 (574's note: applied before 319); V01 V1-2.3's `under` field,
  V1-2.7's opening row, the 1b `HoodPlace` row and V1-3.7.1's catacomb selection by `cause.system`; the base's `Household`
  (`id: Id`, §2.7). V04's `collapsed_shaft` candidates over quarry chambers (V4 §2.3's `OpeningRow`, §3.5.7 (e)) are why
  the regenerate case names the `quarry` system too (J-V4.115). Every replacement was applied by an exact-string script
  asserting each anchor unique (the file's md5 `08a632a2…` unchanged since round 2 when the lane began).
* **The sixth reconciliation (2026-09-29, round 6)** read its one issue whole in `docs/volumes/critique/seam-layers-r5.md`
  (SLR5-01, with SLR5-02, its seam rows 26, 42, 77, 91 and 95, and the advice to the reconcile lanes) and the counterpart
  text: V01 V1-2.7's `hood.constants` row ("an `editTable` re-derives from the first stage that reads the cell (§7.6)"),
  V1-3.15's *The stage-2 switch* bullet (S9b's land in the programme, `λ_b` 0), V1-3.5.9 (S2's land estimate ×
  `(1 + λ_b)`), base §6.3's carry-over (an old entity with no successor becomes a tombstone), and this volume's §4.3
  ground-edit and `adjust` rows and §3.10's access closures. V1-3.15's bullet *The switch's edit* was not yet in V01 when
  this lane wrote its rows (V01 at md5 `011db7dd…`); volume 1's live lane reconcile-V01-r6 then landed it, and before
  landing this lane read it with V1-2.7's `HoodPlace (opening)` row, V1-3.7.1's lifetime sentence, V1-4.3's oracle bullet
  *The stage-2 switch's edit* and J-V1.101 (V01 at md5 `a348b2f1…`, not edited by this lane): they match V04's rows on the
  re-derivation from S2 with §6.3's carry-over, the tail's T6 running the pass under the new gate, the retired places and
  the underground never held byte-identical; volume 1 re-derives every change of the value, so V4 §4.3's row and T-V4-31
  now name a change inside (0, 1] as well as across 0. Every replacement was applied by an
  exact-string script asserting each anchor unique (the file's md5 `27bdbbd7…` unchanged since round 5 when the lane began).
* **The fifth reconciliation (2026-09-29, round 5)** read its one issue whole in `docs/volumes/critique/seam-layers-r4.md`
  (SLR4-06, with its seam rows 16, 42, 76 and 77) and the counterpart text: V01 V1-3.7.1 (the local-place step's
  `extension` gate and its *Openings* paragraph), V1-3.14's `fabric.extensionWeight` row (a `weight` in [0, 1], 1 by
  default), V1-3.15 (*The stage-2 switch*: 0 in `MFCG` and `FTG`, the step and the hood pins run only while it is > 0),
  T-V1-4 (0 `HoodPlace`s under the parity presets), and base §7.6's table-edit invalidation with its undo row. Every
  replacement was applied by an exact-string script asserting each anchor unique (the file's md5 `87f5ce61…` unchanged
  since round 4's continuation when the lane began; V01 read at md5 `0c3c1107…`, not edited).
* **The fourth reconciliation's continuation (2026-09-29, the re-issued brief)** read its two new issues whole in
  `docs/volumes/critique/seam-surfaces-r3.md` §9 (SR3-11, with its pairs SR3-12 (b) and SR3-15 and J-SS3.10) and
  `seam-content-calibration-r3.md` §6.2 (SCC-R3C-13, with SCC-R3C-1) and the counterpart text: file f item 372 as landed
  (the four rungs, the alternatives and the grouped-access sentence), base §7.3 item 9 (a)–(e), V9 §4.17.4 (the rungs and
  **Use another building**), V9 §1b's dwelling-closure row and the `bend.under.accessDug` row, V4 §3.5.7 (d) and (e), and
  V11 J-V11.84 (the empty-table rule). SLR3-01, the brief's first issue, landed at 07:08 and was re-verified in the live
  text (V4 §3.1's hood line, §3.3, P7, §1b, §2.6, T-V4-75), not redone. Every replacement was applied by an exact-string
  script asserting each anchor unique (the file's md5 `fed9e0c2…` unchanged since round 3's continuation when the lane
  began).
* **The fourth reconciliation (2026-09-29, round 4)** read its one issue whole in `docs/volumes/critique/seam-layers-r3.md`
  (SLR3-01) and the counterpart text: V01 V1-3.10.1 steps 3 and 6 (the virtual host town, the one-district allocation computed
  by S7b once field pass 1 has run, S7b (6)–(7) after it with P7's cap from its poorest band and the void part taken from
  it), J-V1.92, T-V1-20 and V01's cross-volume note (25). Every replacement was applied by an exact-string script asserting
  each anchor unique (the file's md5 `8c42db56…` unchanged since round 3 when the lane began).
* **The third reconciliation's continuation (2026-09-29, the re-issued brief)** read its one issue whole in
  `docs/volumes/critique/seam-content-calibration-r2.md` §7 (SCC-R2C-14, with SCC-R1C-2's re-check and SCC-R2C-2) and the
  counterpart text: V12 §3.11 whole (its entries, the default line, the catch-all rule, the items 109 and 110 lines naming
  V04's cells, the panel rule, the lint and *Milestone exits*), V12 §2.6's `CalibrationEntry`, §2.8's milestone ids and
  X-V12-15 – X-V12-16; V2 §3.10.10 (the form of a volume's own lines); V11 §3.1's registry rows 51, 57 – 59 and 63 and
  V11 §8 (C8, the register at every exit, the non-g lines). The reading found that V12's `under.openings`, `under.dig` and
  `sourceWeight` lines cite bars this plan runs at U3b and U4, not U3, and that V12's `under.ruin` V04 line cites T-V4-62,
  which reads no `under.ruin` cell (J-V4.117; V4 §8). Every replacement was applied by an exact-string script asserting
  each anchor unique (the file's md5 `7d89f86a…` unchanged since round 4 and the later edits when the continuation began).

* *Finalization (seam SLR6-01).* U4's crypt content and exit were written from a read of volume 3 §3.7.4 (its *A stair-entered crypt* and the `always` bullet), volume 3 §8's PE row, T-V3-23 (j), and file f items 238 and 578 as they stand after reconciliation round 6; the crypt derivation's first reading is now a named part of M6-U's declared shift beside U1's forecast shift (C4-01).

**PLAUSIBLE** (reasoned, not measured):
* The sixth reconciliation: that S2 is the stage-2 switch's first reader stage (read from V1-3.15's `λ_b` 0 and V1-3.5.9's
  `(1 + λ_b)` on S2's land estimate, as the seam check reads it; if volume 1 names another first reader, or narrows the
  edit by §7.6's slice rule, V04's rows hold unchanged, because they cite V1-3.15's *The switch's edit* and "that first
  reader stage", never a stage number); that a switch edit over a document with voids changes the underground's accesses,
  excavation reading and dwellings only through the ground-edit and closure rules the tail already applies (V4 §4.3's
  ground-edit row, V4 §3.10's closures), so the tail needs no switch-specific step — T-V4-31's and T-V4-74 (b)'s switch
  clauses test the outcome, and no bar measures how much of the underground a switch edit moves.
* The fifth reconciliation: that an `editTable` of the cell or an `editPreset` changing its entry are the only ways the
  resolved stage-2 switch crosses 0 inside a document (the base names no other event that moves a cell's resolved value);
  that volume 1's re-derivation of that edit (V1-3.15, *The switch's edit*; SLR5-02) and J-V4.121's rule agree for the
  opening places — the pass run at the re-derivation's T6 under the new gate, the old places retired by §6.3's carry-over
  (round 6, SLR5-01; T-V4-74 (b) and T-V1-4 test it); SLR4-06 (b)'s scenario itself, which T-V4-74 (b) now exercises.
* The fourth reconciliation's continuation: that §3.5.7 (d)'s geometry is what the base means by a building "above the
  cluster" (J-V4.119; T-V4-48's closures' clause and T-V9-38 test the mechanism, not the reading); that a connector is
  rarely dug in the dwelling closure at the default reaches (`planReachM` and `accessReachM` both 5 m) and that passing
  over a refused building keeps the rung inside V4 §6's budget; that V12 takes SCC-R3C-1's milestone id for a column
  landing after M-CAL (V4 §8 cites the default line's due in words until V12 §3.11 writes it).
* The third reconciliation's continuation: that no corpus frame admits most of this volume's default-line columns, so
  they close `fixed` with "no admissible frame" at their due (M-CAL, or the underground's later corpus run; SCC-R3C-1)
  and the V4-U5 panel stays their only outside rating; that the
  second values of J-V4.118 move T-V4-45's similar share and the monuments' standing tiers the way wanted (T-V4-45 and
  the V4-U5 panel measure them); and that every table lands in the step V4 §8's plan names (the check fails the step
  that first ships a table's rows earlier without its entries, so a wrong plan costs a red check, never a dangling cell).
* The fourth reconciliation's mechanism: that P7's cap read from the one-district allocation keeps a hood's void part at a
  neighbourhood's scale (T-V4-75 and T-V1-20 measure the bound, not the realism of the share), and that ranking P5's catacomb
  expectation over the allocation's anchor-brought burial faces changes no allocation in a hood, where P6 finds no undercity
  and P7 takes only cavern and ruin voids (J-V4.116: it keeps the forecast's inputs coherent, not its outputs).
* The third reconciliation's mechanisms: that re-running U-ACCESS (e) over a regenerated cavern, ruin or quarry system's
  elements yields the opening share a fresh derivation yields (T-V4-74 (b) measures only that the places match the
  openings); that the crowding hook's void part at `growth` finds free capacity in clusters opened in earlier epochs often
  enough to matter (T-V4-72 (f) measures the total, not the share); the absorption of J-V4.115's two commits in U3b's
  existing 0.25 pw.
* The second reconciliation's mechanisms: that `Foundations.apply` over the epoch's new footings collapses the same element
  set as a regeneration (T-V4-65's epoch clause measures it; it rests on no epoch op removing an obstacle); that the village
  working's plan-distance test with a depth bound is what V07 §3.16 (4) means by "within 40 m, at a depth the working
  reaches"; that the buried floor's point-by-point old grade with the walls' steps reproduces the terraces (T-V4-15); the hood
  document's tail budget (≤ 12 ms p95) and the 0.5 pw of J-V4.114.
* The reconciliation's mechanisms: that the primary read at a re-derivation (most burials by `A`) agrees with volume 6's
  hysteresis-held primary except inside its 10 % band; that the epoch's built stone is a fair `ΔV` for new stone workings;
  that reopening a landfall-bricked access as `open` (`locked` when secret) matches its former state in practice; the
  0.25–0.5 pw of J-V4.104 (T-V4-52, T-V4-72, T-V4-73 carry the measurements).
* The second round's constants (our own, calibratable): the span rule's `raised.vaultShare`, headroom and fall bounds, cap
  and deck depth; `raised.supportFoundationCm`; the footing and conduit reaches and `collapseShare`; the arch vault's insets
  and door strip; `terminalCisternM2`; the monument's `clearM`, `tierDecay`, `ceilingClearCm` and `moundShare`; the
  `archDoor` opening row. That the span rule walls a plausible share of arches (T-V4-62), that shallow ruins still show
  legible monuments after the ceiling cut (T-V4-68, the owner's panel), and the second round's budgets (V4 §6).
* Every default constant of V4 §2.3, §3 and §3.9 (our own, `extension`, calibratable), the new ones included: the ruin's
  chances, extents, burial-by-age and survival rows; the openings' chances; the dig rows; the catacomb's count, chances,
  `rankCap`, `growthCapShare`, `growthFloorM2`, `cryptJoin` and `charnelMaxM2`; `forecastSafety`, `crowdCap`,
  `voidDwellings`, `accessForecastMin`, `freeboardCm`, `hallDryCm`; the opening sizes. The historical anchors (the
  culverted brooks of London, the fourteenth-century vaulted sewer of Paris, the quarries and ossuaries under Paris, the
  great catacombs under cemeteries outside the walls) are orders of magnitude, not measurements.
* That `forecastSafety` and the absorption keep T8's writes under 2 % of CITY seeds (T-V4-3); that the dig rows keep
  deep voids sealed at METROPOLIS (T-V4-54, fallback pre-decided); that BCR-31's 4–30 m band makes a sewer's growth
  through a ruin common (T-V4-53); that the ruin plans pass the distinctness bar (spike (a)); that sewer-front
  neighbourhoods appear under ordinary streets (T-V4-41, fallback pre-decided).
* The budgets of V4 §6 (U0 measures them at CITY and METROPOLIS; the fallbacks are pre-decided); the forecast's accuracy
  bar (T-V4-8); the estimates of V4 §8.
* That the dungeon-map figure-ground, the ruin program and the plan lines after the light are legible enough (the owner's
  panel decides).

## 13 Fix list

**Reconciliation round 6 (2026-09-29).** The one seam issue routed to this volume — SLR5-01 (major) — is fixed in this
volume (V4 §1.2, §1b.2, §3.10, §3.11, §4.3's switch row, T-V4-31, T-V4-74 (b), §8's U3b; J-V4.121 revised), so the Fix
list holds no item. **Hand-off** (volume 1's own lane's, SLR5-02, not a deferral): V1-3.15 gains the bullet *The switch's
edit*; V1-2.7's `HoodPlace (opening)` row and V1-3.7.1's sentence read that a place lives as long as its host while the
step runs; T-V1-4 gains the edit's clause; J-V1.101 records the choice. V04's rows cite the bullet by name, not a stage, so
they hold whether volume 1 keeps the first-reader re-derivation or narrows it by §7.6's slice rule (SLR5-01's last
paragraph). Volume 1's lane landed these words while this lane ran, and this lane checked them against V04's rows before
landing (V4 §12's sixth-reconciliation entry; `seam-layers-r5.md`'s advice to the reconcile lanes).

**Reconciliation round 5 (2026-09-29).** The one seam issue routed to this volume — SLR4-06 (minor) — is fixed in this
volume (V4 §1.2, §1b.2, §3.1's T6 row, §3.10, §3.11, §4.3, T-V4-74 (b), §8's U3b; J-V4.121), so the Fix list holds no item.
**Hand-off** (volume 1's own lane's, not a deferral; restated by round 6, SLR5-01): V1-3.15's *The switch's edit*
(SLR5-02) states the stage-2 switch's edit — volume 1's re-derivation from the switch's first reader stage with §6.3's
carry-over, the template seeds, typed blocks, places and pins it does not make again retired, the underground tail's T6
running the opening pass under the new gate — and V1-2.7's `HoodPlace` lifecycle states the opening place's retirement and
re-making by that edit, so both volumes say the same (J-V4.121 as round 6 revised it). Volume 1 needs no further
counterpart sentence for SLR4-06: its V1-2.7 opening row and §1b `HoodPlace` row cite "the commits V04 §3.10 names", which
now include the dwelling closure's opening rungs and the switch edit's re-derivation at its T6.

**Reconciliation round 4's continuation (2026-09-29, the re-issued brief).** The two issues the re-issued brief added —
SR3-11 (major) and SCC-R3C-13 (minor) — are fixed in this volume (V4 §3.8, §1.1, §1.2, §1b.2, §3.11, §4.1, §4.3, §4.7, §6,
T-V4-48, §8; J-V4.119, J-V4.120), so the Fix list holds no item. **Hand-offs** (each the sibling file's own lane's, not
deferrals): (1) V09 — SR3-12 (b): XV-V9-27 may now cite "V4 §3.8's *Voids and bans* exception for BCR-V9-22's grouped
access, and the dwelling closure among U-DIG's callers (seam-surfaces-r3 SR3-11)" and be marked **Met**; (2) file f —
SR3-15: item 372's *Needed by* gains V04 (V4 §3.8); (3) V12 — SCC-R3C-1: the default line's due for a column landing after
M-CAL (the underground's later corpus run), which V4 §8 now cites in words.

**Reconciliation round 3's continuation (2026-09-29, the re-issued brief).** The one issue the re-issued brief added —
SCC-R2C-14 (minor) — is fixed in this volume (V4 §8 *The register at each exit*; J-V4.117, J-V4.118), so the Fix list holds
no item. **Hand-offs** (each the sibling file's own lane's, not deferrals): (1) V12 §3.11's `under.openings`, `under.dig`
and `under.ruin` `sourceWeight` lines say "`measure` at U3" of bars this plan runs at U3b (T-V4-49, T-V4-54) and U4
(T-V4-58), and its `under.ruin` V04 line cites T-V4-62, which reads no `under.ruin` cell — V4 §8 sets those entries' `due`
by the step that runs the bar and routes T-V4-62's row to the span-rule line, so the design is buildable as written, and
V12's lane may align the lines' wording (logged); (2) SCC-R2C-2 is V11's issue: its V04 half (§1b.1's dossier-rows cell:
not calibratable) is applied here, its V11 half (registry row 63's list gaining `sanitation` and `subterranean`, T-V11-1
(a)'s grep) stays V11's lane's (logged).

**Reconciliation round 4 (2026-09-29).** The one seam issue routed to this volume — SLR3-01 (major), the V04 half of
SLR2-05 — is fixed in this volume, so the Fix list holds no item. Volume 1 needs no counterpart sentence: V1-3.10.1 step 6,
J-V1.92 and T-V1-20 already say what V04 now says, and V01's cross-volume note (25) is met.

**Reconciliation round 3 (2026-09-29).** All 4 seam issues routed to this volume — TT-02 (major); TT-07, SLR2-08 and
SLR2-15 (minors) — are fixed in this volume, none is left, so the Fix list holds no item. The V01-wording halves of
SLR2-08 (V1-2.7's opening row and §1b's `HoodPlace` row: "the opening pass, run in the commits V04 §3.10 names") and SLR2-15 (V1-2.3's `under` comment: `access` from the cluster's `excavation` reading) were
applied in `docs/volumes/V01-neighbourhoods.md` by this lane after volume 1's round-3 lane had landed (its section
*Counterpart edits by volumes/reconcile-V04-r3*). **Hand-offs and notes** (each the sibling file's own lane's, not
deferrals): file f item 574's note still quotes step (6) before BCR-V6-28 as V04
BCR-6's current text; BCR-6 now quotes it as 574 leaves it and says it is applied after 574, so that note's quote is
history (logged for the base-change lane and the coherence pass; no edit made to file f). Round 2's remark below that
volume 6's `under.extend` row lists the arch-vault reconcile after the workings is superseded: V06 lists it second, V4
§3.10's order, and the parenthetical that allowed the other order is deleted (TT-07 (b)).

**Reconciliation round 2 (2026-09-29).** All 15 seam issues routed to this volume — SLR1-01, SLR1-04, SLR1-05 and TR-07,
TR-08, TR-10, TR-11, TR-12 (8 majors); SLR1-07, SLR1-14, SLR1-15, SLR1-16, SLR1-19, SLR1-20 and SR1-24 (7 minors) — are
fixed in this volume, none is left, so the Fix list holds no item. The V01-wording halves of SLR1-01, SLR1-04, SLR1-05,
SLR1-07 and SLR1-19 were applied in `docs/volumes/V01-neighbourhoods.md` by this lane, volume 1's own round-2 lane having
landed first (its closing paragraph *Counterpart edits by volumes/reconcile-V04-r2*). **Hand-offs** (each the sibling
file's own lane's, not deferrals): V07 §3.16 (4) cites V4 §3.5.7 (a) for the village working's test in its next round
(TR-12's own text). Applied by this lane after their writers had landed: `docs/volumes/_integrate.md` §6's roll-up now
quotes this volume's cost as 28.25–39.25 pw (it had kept round 0's 27.25–38) and names the W15 wait in V04 Q1's parallel
lane (SLR1-05); file f's `V04 §10, l. N` pointers were already replaced by the base-change lane (SLR1-18). Volume 6 needs no
sentence: its `under.extend` row lists the arch-vault reconcile after the workings,
which V4 §3.10 states gives the same result, and its T-V6-67 – T-V6-69 read as this volume now implements them.

**Reconciliation round 1 (2026-09-29).** All 18 seam issues routed to this volume — SL-03, SL-04, SL-05, SL-06, SL-08,
SL-15, SL-16, SL-22, SL-30, SL-31 and ST-03, ST-16, ST-17, ST-21, ST-22, ST-23, ST-24, ST-50: 1 blocker, 14 majors, 3
minors — are fixed in this volume (and in file f item 414's label); none is left, so the Fix list holds no item. **Hand-offs**
(the counterpart sentences in sibling files, each that file's own lane's, not deferrals): V05 §3.3 and §4.5 cite "the
report's `ruin.node` line (V4 §3.5.0a (9))" instead of "the deposit's report entry" (SL-03); V06 §3.18.2 (5) cites V4
§3.5.1 (8) for a closed burial face, keeping only its epoch statements (ST-21), §3.18.1 (1) adds the removal of a ruin's
dossier source citing V4 §2.6 (ST-22), §3.18.2 (1) cites V4 §3.5.1 (3)'s count with the island churches (ST-24), and its
`under.extend` row cites `QuarryWorkings.extend` and `workedOut` (ST-23); V01 V1-3.7.1's selection (SL-07, V01's) is the
one this volume's T6 hands its records to; V08's `site.ruinEvidence` row reads "V05's why through V04's `ruin.node`
line" rather than "V05's node term through V04's `ruinCentre()`"; `docs/volumes/_integrate.md` §6 quotes this volume's
old cost (27.25–38 pw); file f's `V04 §10, l. N` pointers are stale after this round's edits (logged for the base-change
lane).

**Second round (2026-09-29).** Every finding of critique §8 — C4-110-1 – C4-110-12, C4-64 and C4-65: 2 blockers, 9 majors,
3 minors — is fixed in this volume or its base change requests; none is deferred, so the Fix list holds no item. Three are
fixed with a refinement recorded as a vetoable decision: the monuments take V11's `stepped-shrine` heights row rather than
the great temple's (J-V4.84), with a 0.5 ms budget rather than 2 ms (J-V4.87); the maintenance mode covers the sewer
network and an inherited undercity too (J-V4.90). The second disposition table is appended to
`docs/volumes/critique/V04.md` (§8.5). **Hand-offs** (each the sibling's own part, not deferrals): V06 — its
`under.extend` calls `ArchVaults.reconcile` over `EpochScope.raised` and `SewerStrategy.extend`'s wall drops over
`EpochScope.levelled` (W65, as V06 already reads them); V11 — `era.raisedVaultM` and `culture.raisedVaultM`, the
`CultureRow.monument` values and the `stepped-shrine` heights row (critique-V11 V11C-35, X-V11-10), and the vaults slice's
"the ⟨way⟩ Arches" name; V01 — its lanes pass only under `open` spans and its readers of ways read part 0 (critique-V1
V1C-70); V03 — reads `ruinColumns` (§3.12 (6)) and plans a declared institution in an arch vault as any building; V09 — the
span's `use` and the monument's count on T9 `shape`; V10 — the providers for a span's reason, an aqueduct serving a
precinct, a raised-way pier's footing in a cave and a monument; V12 — the second fixture runs T-V4-62 – T-V4-70; V07 — its FL-2 is met
(`'rung'`, `v.parish_church`, the maintenance mode, the ruin centre, the well pins, the `DigRule` rows).

**First round (2026-09-28).** The revision (revise-V4) fixed every finding of the critique in this volume; none is
deferred, so the Fix list holds no item. The disposition table is appended to `docs/volumes/critique/V04.md`. Three findings were fixed by a
mechanism other than the one the critique proposed, each recorded as a vetoable decision: item 64's basement draw stays
in U-LINK, and only the void accesses move to the new access pass (C4-48 (1) (e); J-V4.63); T12-1 needs no amendment,
because its clause scopes the underground stage and T8 is a separate stage writing no ground geometry (C4-02 (5);
J-V4.59); the estimate is 25.75–35.75 pw, not 24.25–34.25, because it also prices the other findings' mechanisms
(C4-57; J-V4.71).

**Handoffs to sibling volumes (not deferrals; each is that volume's own part by the brief):** V03 — its `AccessHostRow`
rows catacomb → crypt (the crypt join's head) and catacomb → nave (a cemetery chapel's entrance head), and the cathedral's
largest-crypt bar; V11 — the ancient-culture rows, the persistence order, the rank weights, the `DigRule.classRow` by
family, the fungus biome list, the fuel rows by era, the `ruin` naming slice and registry row 58's four new tables
(schema here, V4 §2.3); V12 — the specs of the bars this volume registers (T-V4-43, -44, -45, -49, -51, -54, -55, -58);
V06 — the scheduling of excavation, catacomb growth and ruin decay over epochs; V09 — the `showUnexcavated` and
active-layer controls; V10 — the explanations reading `cause`, `blockedBy` and `reusedBy`; V08 — the port side of the
ruin, magic, mining, church and burial facts; V05 — the `ruin.node` report line for its why (V4 §3.5.0a (9); its node term reads no
position, SL-03) and islands' exclusion of burial faces.

**Clean-room checks of the second round** (the same command, 2026-09-29): C1 0, C2 0, C4 0 (one hit — a VTT row's
common words — reworded away), S1 0; C3 154 three-gram runs, the 34 new ones each read — common English phrases ("at the
midpoint of its", "is byte identical to its") and digit runs of section numbers and values, no reference content; S2 35,
the new ones pointers to sibling volumes' sections (V2 §3.15 – §3.17, V6 §2.12, §2.13, §3.19, V07 §3.16), not to the base.

**Clean-room checks on the revised volume** (`docs/validation/bench/doc_checks.py --doc docs/volumes/V04-underground.md
--heads docs/ARCHITECTURE.md`): C1 identifiers 0, C2 colours 0, C4 copied lists 0, S1 tables 0; C3 119 three-gram runs,
each read — common English phrases ("a new random on the", "is split in two by"), digit runs of section numbers and
values, the review banner, and file paths cited by file and section (`research/findings/watabou-extra-a.md`,
`research/findings/dwellings-posts.md`, `docs/lane-events.log`, the amendments file) and a list of bar ids — no reference content; S2 9
pointers unresolved against the base, each this volume's own section (V4 §3.12, V4 §5.5), two of them in this paragraph.

**Reconciliation round 1 — the base-change lane's edits in this volume** (volumes/reconcile-BASE-F-r1, 2026-09-29). File f
items 238, 226 and 436 (S23-20, SCC-29) label the crypt chain BASE design, built at M6-U: U4 gains the crypt derivation moved
from volume 3's P2 (+0.25 pw: U4 5.25–7.25; the total, with this round's other re-pricing, 27.75–38.75 pw in §8, BCR-13 and
§11 Q2; J-V4.94 notes the move). File f item 560 merges
BCR-36 with V01 BCR-36 (SL-17) and item 208 is applied before V01 BCR-6 on the `Way` line (SL-18); neither changes this volume's text.


## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V04-1 (J-VI.6).** `growthCapShare` is volume 11's 0.01 **per year, compounded over the epoch's span** (V11
  §3.23.8, J-V11.32): the defaults table, V4 §3.5.1, the epoch step and T-V4-52 now read `max(extent × ((1 +
  growthCapShare)^years − 1), growthFloorM2)` (edited in place). The defaults table's rows that volume 11 owns — the ruin
  chances, the cultures and their monument cells, the survival order, the source weights, the openings, the dig rows,
  the catacomb rows — are read from V11 §3.23 and their values here are illustrations of those rows (X-V11-4).
* **IN-V04-2 (J-VI.5; volume 2's X19, X29).** The ruin stage lays a stepped monument by calling volume 2's `drawTiers`
  (ST1, on the ruin's stream) and then `layTiers` alone, with `TierCells.heights` of the `stepped-monument` row,
  `plinthCm` 0, `parapetCm` 0 and `scale` 1; a returned `TierFailure` truncates the monument to the tiers laid (recorded
  in `Chamber.monument.standing`, warning `W_RUIN_MONUMENT_SKIPPED` when none). An `archVault` chamber's record gives its
  soffit as its ceiling, which volume 2's `vaultClamp` reads for a building standing on the underground layer.
* **IN-V04-3 (J-VI.17 H2; volume 2's X12).** The dig draw's key (item 109 (j) (3) (i)) carries the wing key of a wing the
  mutator adds (V2 §3.9 W6); item 109 (k) (5)'s obstacle test reads volume 2's footprint and basement floor (V2 §3.14.5
  (f)).
* **IN-V04-4 (J-VI.17 H12; volume 3's hand-off).** An `archVault` chamber records its grade faces (`gradeFaces`: the
  ring's sides open to ground part 0); a building seated in one takes its frontage entrance on a grade face with `faces`
  `street`, `lane`, `alley` or `yard`, never `tunnel`; until a chamber records them, volume 3's 3.12 (9) fallback holds.
* **IN-V04-5 (J-VI.17 H13).** The arch vaults beneath a span that a landfall ruins (volume 5's `sky.islands`) follow the
  span's state by this volume's own decline rule (collapse with the span; C4-110-2).
* **IN-V04-6 (J-VI.17 H14; volume 8's X13).** The ruin-existence step (V4 §3.5.0a) reads `site.ruinEvidence`'s seven
  kinds in its own strongest-first order, DR30 (DR-V8.2), DR31's (DR-V8.3) relief and mining inputs and DR32's (DR-V8.4)
  burial faces, rank and church count as volume 8 §2.6a states them.
* **IN-V04-7 (J-VI.17 H15; XV-V9-4).** The underground reader returns, on a cavern or ruin cluster, the fact
  `under/wayIn` (the connection graph's path from the nearest surface access, or none) and, on a burial face, the why
  path `catacomb` with its candidate-pass reason; §8.2's access symbol is chosen by `cause.rule`.
* **IN-V04-8 (J-VI.17 H16; CVR-V10-1, CVR-V10-10).** This volume exports `catacombOutcome(doc, face)`, read-only, over the
  candidate pass's derived per-face record (`holds`, `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`), and
  registers the `underground` section provider with volume 10's §3.9a rows plus rows for an arch vault (its span and the
  span's reason), a ruin's stepped monument (tiers laid, standing, truncated), an aqueduct's terminal cistern and a void
  met by a support's footing; one catalogue key per value of `source.kind`, `blockedBy`, `cause.rule` and the outcome.
* **IN-V04-9 (J-VI.9).** `terminal.kind` is `cistern` only under a `conduit_house` the roster or the dossier holds;
  otherwise `fountain` or `basin`.
* **IN-V04-10 (J-VI.2).** The span `reason` vocabulary (`way`, `water`, …) is the span rule's own; the raised way's
  recorded reason is volume 6's `RaisedReasonKey` with its derived word (J-VI.2) — two different fields.
* **IN-V04-11 (J-VI.19).** `showUnexcavated` is volume 9's per-viewer view key (BCR-V9-20), not a `LayerSpec` field:
  §1b's and §2's rows naming `LayerSpec.showUnexcavated` read "the view key `showUnexcavated`", set by volume 9's control
  (not `setLayer`), default false, drawn only under a `secret` key; BCR-10's `LayerSpec` field is dropped (file f item
  413); `underView` stays on `LayerSpec`.
* **IN-V04-12 (J-VI.22).** This volume's milestone is **M6-U** (renamed in place, 17 uses): "M6" is volume 2's stage 3.

## Reconciliation round 1 (volumes/reconcile-V04-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V04-r1; covered by the whole-design retrovalidation (J84).

The seam checks `docs/volumes/critique/seam-layers-r0.md` and `seam-time-r0.md` routed 18 issues to this volume (1
blocker, 14 majors, 3 minors). All 18 are fixed; none is left for the Fix list. What changed, by issue:

* **ST-03 (blocker) — the catacomb primary.** V4 §3.5.1 (5): every complex but the **primary** is capped at `rankCap` ×
  the primary's extent; the primary is a reading (most burials by `A`, ties by rank — rank 1 at generation; volume 6's
  hysteresis-held primary at an epoch); the signature `CatacombGrowth.grow(doc, epoch, opts?: { capM2; primary })` with
  its defaults (§3.5.1 (5), (6); §1b.2; §3.10; §2.2's `rank` comment); T-V4-52's overtaking fixture; J-V4.95.
* **ST-16 — keys fixed without the epoch component.** §3.12's exception list gains the catacomb source draw (a quarry
  ossuary's by its working), each public opening's and each overlap shaft's; §3.5.1 (3), §3.5.7 (a) and (e) say "no epoch
  component"; T-V4-72 (b).
* **ST-17 — the underground's own lottery.** §3.10's new bullet, §1.1's U-FADE row, §1b.2's caller (`under.fade`,
  `decline` 10), BCR-6's new text (after the fabric pool, uncapped by the `fabric` cap, outside the persistence order);
  J-V4.103; T-V4-72 (c). File f item 319 already lists V06 (the base-change lane's edit).
* **ST-21 — a closed burial face.** V4 §3.5.1 (8) holds the one list (use closed or ruined, face retyped, dossier record
  removed, a churchyard's plot without a live church-family use, a quarry ossuary with no open feeding face), the frozen
  state (no growth, no change of `fill`) and the reopening rule (the same lineage); T-V4-73 (b).
* **ST-22 — a ruin's removed source.** §2.6's `RuinRecord` row and §3.5.0a (1): `source.ref` cleared,
  `W_RUIN_SOURCE_REMOVED`, the system kept and fading; a blueprint ruin follows its toggle only at a re-derivation;
  §1b.1, §1b.5, §3.11, BCR-41's codes (§10's reconciliation paragraph); J-V4.99; T-V4-73 (a).
* **ST-23 — workings over epochs.** §3.5.3's `workedOut(working, scope?)` reading and `QuarryWorkings.extend(doc, scope,
  epoch)` (stone by the epoch's built stone, mines by newly opened mining uses, chain mines), with the overlap test and the
  mine breach; §1b.2 rows, §3.10 bullet, §3.11 row; J-V4.98; T-V4-72 (d).
* **ST-24 / SL-04 — island churches in the count.** §3.5.1 (3), §1b.5's row, T-V4-50 and §10's BCR-36 paragraph count the
  classes on the ground and on every live sky island, each once; no island face is ever a candidate; J-V4.101.
* **ST-50 — epoch callers.** §1b.2 names volume 6's participants for `SewerStrategy.derive` (the first sewers epoch, U-NET
  whole, existing entities kept), `.extend`, `AccessPass.run(doc, scope?: EpochScope)` (§3.5.7's *With a scope*),
  `CatacombGrowth.grow`, `QuarryWorkings.extend`, `UndergroundFade`, `UndercityEpoch.reread`; §3.10's intro and bullets
  cite them; §1.2's V06 hook row; §1.3; BCR-6's second bullet; T-V4-72 (a), (e).
* **SL-03 — the ruin centre's readers and the `ruin.node` line.** V05 is removed from `ruinCentre()`'s consumers (§1b.1,
  §1b.2, §1b.5, §3.5.0a (9), §13); §3.5.0a (9) adds the report line `ruin.node: { deposit; ruin; name }`, written by T6
  after S13a names the ruin, read by V05's and V10's why; §1b.1's new row; J-V4.102; T-V4-74 (d).
* **SL-05 — the sky layer is never read.** §1.2's new paragraph; N1's `R` of ground-layer districts; §3.5.7 (c) and L3 on
  ground part 0; §4.1's tools resolve a sky click to ground part 0; §1.2's V05 hook row; J-V4.101; T-V4-71.
* **SL-06 — the opening pass.** §3.1's paragraph (no tail stage writes ground geometry; T8 and T6's S13a step write ground
  records), the T6 row (volume 1's opening pass after the naming), §3.7a's heading and text, J-V4.59, BCR-5's bullet and
  its amendment note, §1b.2's row (V01 implements, T6 calls), §1b.4's `AccessPoint` row; J-V4.102; T-V4-74 (b). File f
  item 325 points to BCR-5, whose text now carries it.
* **SL-08 — one visibility rule.** §5.2 (7): the underground layer draws an access's underground end; its surface head
  is volume 1's ground symbol, drawn by the knowledge filter and the `pins` toggle whatever the layer's visibility; §5.1's
  last sentence; §1b.4; J-V4.96; T-V4-74 (c).
* **SL-15 — public ground.** §1.2 defines public ground, a square and a yard once (volume 1's square, green and yard blocks
  included); N11, F5, L1, `placeAccess`, the forced vaults, the terminal cistern, §3.5.5's buried squares (BCR-20) and
  `OpeningRow`'s `collapsed_shaft` row (§2.3 and §3.5.7 (e)) cite it; J-V4.100; T-V4-74 (a).
* **SL-16 — the shaft's shadow term.** §5.3 and BCR-38 (renamed "the light shaft's opening and shadow") read the ground
  pass's shadow term under the current sun, every caster included, a sky island's slabs among them; item 102's share is
  never a render input; §1.2's items 102–108 row; J-V4.51's second half; file f item 414's label.
* **SL-22 (minor) — hood pins.** §1.3: the `underground` rows of volume 1's `hood.pins` are this volume's and it ships
  none, so an underground close-up draws no hood pins; J-V4.97.
* **SL-30 (minor) — accesses under a landfall.** §3.10's access closures: a covered host bricks its access (cause
  `convert:fallIsland`) until an epoch's clearance restores it, reopening `open` (`locked` when secret); §1.2's V05 row;
  T-V4-73 (c).
* **SL-31 (minor) — the arch vault's condition words.** §3.5.4 (d) (2), §2.6's arch-vault row, §3.10's reconcile bullet
  and T-V4-62 read the stored `state` values `ruined` / `cleared` of the span and its bounding supports (file f item 244),
  a landfall's included, beside V06's breached and dismantled; "toppled" is gone.

New: J-V4.95 – J-V4.104; T-V4-71 – T-V4-74; U5 2.75–4 pw (+0.25–0.5 pw for the epoch contracts; the total is §8's, which
also carries the base-change lane's U4 crypt derivation). Hand-offs to the sibling files' own lanes are listed in §13.
The concurrent base-change lane (volumes/reconcile-BASE-F-r1) edited this file in the same hour (its note stands before
the Integration notes); both lanes wrote by exact-string replacement and every marker of both was re-verified.

## Reconciliation round 2 (volumes/reconcile-V04-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V04-r2; covered by the whole-design retrovalidation (J84).

The seam checks `docs/volumes/critique/seam-layers-r1.md`, `seam-time-r1.md` and `seam-settlements-r1.md` routed 15 issues
to this volume (0 blockers, 8 majors, 7 minors). All 15 are fixed; none is left for the Fix list. What changed, by issue:

* **SLR1-01 (major) — the lone neighbourhood's tail.** V4 §3.1's new *hood line*: a hood document's S0 inputs
  (`Features.sewers` false, the undercity `forbid`), `Recipe.product` read by U-FORECAST and T2 (its only reader besides
  S0), the below-TOWN set whatever `contextRung`, the catacomb step at TOWN's rules and count (one) on the hood's own burial
  faces, no quarry, generated or forced vault or buried town, P5 and P7 forecasting only those kinds; §3.3's gate, §3.5.0's
  hood sentence, §1.2's V01 row, T2's reads; T-V4-75 (§7), U4 (§8); J-V4.105. Volume 1's sentence (V1-3.10.1 (7), T-V1-20,
  J-V1.77's reason) applied in V01.
* **SLR1-04 (major) — opening places after generation.** V4 §3.10's new bullet: volume 1's opening pass runs inside every
  commit that creates, removes or re-kinds a selected access — T6; the last step of `AccessPass.run` with a scope and of
  `CatacombGrowth.grow` founding a complex; an edit's `delete`, `setAttr` of `kind` or `role`, or `placeAccess` making a
  public opening — its places named by V1-2.8's key, tombstoned with their hosts, fates of the commit; §4.1's `placeAccess`
  of a public opening's kind at a candidate (J-V4.107); §4.2, §4.3's new row, §4.4; §1b.2's opening-pass, `AccessPass.run`
  and `CatacombGrowth.grow` rows; §1b.4; T-V4-74 (b)'s epoch and edit clauses; J-V4.106. V01's V1-2.7 opening row applied
  in V01.
* **SLR1-05 (major) — the build order with `@plat/hood`.** V4 §8's *Where it slots* names the three W15 services
  (`fabricSignature` for U3, `districtsAbove` and the opening pass for U4), schedules U3's distinctness step and U4's C5
  after W15 when M6-U runs beside M5, and gates T6's opening pass on the registry (absent: no place, a count reported, a
  declared shift when it registers); §3.1's T6 row, §3.11's new row, risk (9), §11 Q1 (the "share no package" clause
  gone), J-V4.46 amended, J-V4.108. V01's W15 row applied in V01.
* **TR-07 (major) — `Foundations.apply`.** Exported (§1b.2) and specified (V4 §3.5.0 *At an epoch*): the rule over the
  epoch's new footings, at every rung, cause `foundation`, no draw, returning `FoundationsResult` (V4 §2.4) with the vacated
  households for volume 6's re-homing; a `raiseGrade`-tombstoned wall's footing stays an obstacle; §3.10's order
  (`Foundations.apply`, then the reconcile, then the network, catacombs, workings) and bullet; the maintenance mode keeps the
  foundation rule (§3.1, §3.10); §1.1, §1.2, §1.3, §1b.1; T-V4-65's epoch clause; J-V4.109.
* **TR-08 (major) — F6 at an epoch.** V4 §3.10: a newly accessible cluster's F6 dwellings are filled by volume 6's
  relocation, never an S7b (6) allocation at an epoch; the crowding hook seats on lived, reopened, then accessible void
  clusters; §3.4 F6, §1b.2's `UndercityEpoch.reread` row; T-V4-72 (f); J-V4.110.
* **TR-10 (major) — the calamity deaths.** `CatacombGrowth.grow`'s `opts.deaths` (V4 §3.5.1 (5)), added by (2) to each
  face's need by its `burialShare`, never the cap; §1b.2, §1b.5's new row (V08 §3.6 through volume 6), §3.10; T-V4-52's
  clause; J-V4.111.
* **TR-11 (major) — the buried terraces.** V4 §3.5.5: the raised grade's buried floor on the old grade point by point, each
  tombstoned retaining wall a step (its `stepProfile` on the last live state), a stair step in each gallery crossing its
  line; §1b.2's new builder row (the tombstones as its input); §5.2, §5.5, §4.5; T-V4-15's terraced fixture; J-V4.112 (a stair step inside the gallery rather than a stair link).
* **TR-12 (major) — the village working.** V4 §3.5.7 (a)'s *village working*: at a village rung each mining use's
  outside-plot working tested at T2b and over `scope.workings` against cavern and ruin elements within `breachM` at a depth
  its `mine.workingDepthM` reaches, one `shaft` `AccessPoint` of source `dig`, cause `mineBreach`, no link, per void system;
  *With a scope*; T2b's row; §1.2's `EpochScope` (with `workings`); §2.6's lifecycle row; T-V4-56's clause; J-V4.113.
* **SLR1-07 (minor) — the services and four citations.** C5 computes the parent as `districtsAbove(part, core)`'s first entry;
  §1.2 and §1b.2 list `districtsAbove` and `fabricSignature`; §1b.1's `District.core` row (C4, C5, C6 corrected); T6's lineage
  cites V1-2.8; §3.5.1 (1) cites V05 §1.3, §3.5 (3); §3.5.0a (7) and §4.5 name the calls. V01's 1b row applied in V01.
* **SLR1-14 (minor) — the surface quarry.** Defined once in V4 §3.5.3 (a `quarry` land use without a `source`; a landfall's
  rubble working is never the surface quarry, a stone working or a volume source); §3.11's row and §1.2's V05 row cite it.
* **SLR1-15 (minor) — the bar range.** BCR-15 reads T-V4-1 – T-V4-75.
* **SLR1-16 (minor) — levelled heights.** §1.2's ground paragraph reads `levelledGroundCm` (BCR-V5-30); N6, N7, T1's reads,
  §3.5.0's foundations (1)–(2), §3.5.4 (d) (1) and BCR-45's span rule (2) cite it; §1.2's item-110 row adds BCR-V5-30.
* **SLR1-19 (minor) — the pseudo-district's name.** §3.6a (5) and C1 name the underground pseudo-district (the sewer-front
  neighbourhoods and F6's void dwellings). V01's V1-3.16 applied in V01.
* **SLR1-20 (minor) — the opening's role.** §3.5.7 (e) writes role `access` (a skylight a `mouth` of role `light`); T-V4-74 (e).
* **SR1-24 (minor) — the church class key.** `v.parish_church` in §3.5.1 (3), §1b.5, T-V4-50, the BCR-36 paragraph and U4's
  row, and in the hand-off's mentions in the second revision's banner and §13's second-round paragraph; the catalogue kind
  `Parish church` unchanged.

New: J-V4.105 – J-V4.114; T-V4-75; `FoundationsResult`; U3b 2.25–3.25 pw and U5 3–4.25 pw (+0.5 pw), the total 28.25–39.25
pw in §8, BCR-13 and §11 Q2. Hand-offs to the sibling files' own lanes are listed in §13.

## Reconciliation round 3 (volumes/reconcile-V04-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V04-r3; covered by the whole-design retrovalidation (J84).

The seam checks `docs/volumes/critique/seam-layers-r2.md` and `seam-time-r2.md` routed 4 issues to this volume (0 blockers,
1 major, 3 minors). All 4 are fixed; none is left for the Fix list. What changed, by issue:

* **TT-02 (major) — the crowding hook at an epoch.** T-V4-72 (f) now bars only F6's **new** dwellings in a cluster
  `under.access` opened that epoch: filled by volume 6's relocation alone, none of their households new; the crowding
  hook's S7b (6) allocation (V6 §3.6 (1); BCR-V6-28 (c)) runs at `growth`, before `under.access`, seating on runs and on
  clusters accessible before it; ground + underground + sky households equal the target. J-V4.110 reworded to the same
  effect. The text it tests says the same: V4 §3.4 F6 (relocation into a newly opened cluster's new dwellings; the
  crowding hook's void part into an earlier cluster's free capacity), §3.10's order line and *Access at an epoch* ("never
  by S7b (6), whose allocation at an epoch is the crowding hook's alone and runs before this pass"), its crowding-hook
  bullet (at `growth`, BCR-V6-28 (c), new households of the target), and §1b.2's `UndercityEpoch.reread` row ("its new
  dwellings").
* **TT-07 (minor) — three residuals.** (a) §3.10 *Access closures*: a landfall-bricked access reopens in the batch in
  which its host leaves its `fallen_island` decoration, whichever op ends the cover, at an epoch or by hand (V6 §3.5.2);
  T-V4-73 (c) tests both. (b) BCR-6's second bullet is applied after file f item 574 (BCR-V6-28) and quotes step (6) as
  that request leaves it ("(6) new faces of a new stage — the underground crowding hook first sends"); §3.10's stale
  parenthetical on volume 6 listing the reconcile after the workings is deleted (V06 now lists it second, V4 §3.10's
  order). (c) `FoundationsResult.vacated` is `{ plot: Id; households: Id[] }[]` — the base's `Household.id`s, for volume
  6's re-housing by name; §3.5.0 *At an epoch*, T-V4-65 and J-V4.109 say so.
* **SLR2-08 (minor) — two more commits run the opening pass.** V4 §3.10's bullet, §1b.2's opening-pass row and §4.3 (the
  opening-pass row and the regenerate row) add the `delete` of a gallery or chamber carrying a selected access (the
  access removed with its element, its place tombstoned) and a `regenerate` of a `cavern`, `ruin` or `quarry` system
  (the old elements' openings removed with them, U-ACCESS (e) re-run over the new elements' candidates keyed by their
  lineages, the excavation reading, then the pass over the openings made and removed); the `quarry` system is added
  because its chambers carry the `collapsed_shaft` candidate (J-V4.115). §2.6's `RuinRecord` regenerate cell and §3.12's
  New-random sentence (the opening places as the regenerate's one ground write) follow; T-V4-74 (b) adds both cases and
  T-V4-17's isolation bar admits those places; J-V4.106 amended.
* **SLR2-15 (minor) — volume 1's two reads.** §1b.1's `AccessPoint.cause` row, the §2.4 comment and §2.6's read cell add
  volume 1's opening pass (a catacomb entrance selected by `cause.system`, V1-3.7.1); §1b.1's `excavation(cluster)` row
  adds volume 1's `DistrictContext.under[].access` (V1-2.3).

Volume 1's counterpart wording (SLR2-08: V1-2.7's opening row and §1b's `HoodPlace` row cite "the opening pass, run in the
commits V04 §3.10 names"; SLR2-15: V1-2.3's `under` comment names the `excavation` reading as `access`'s producer) was
applied in V01 after its round-3 lane landed.

New: J-V4.115 (no new bar, no new BCR; the build total unchanged at 28.25–39.25 pw, J-V4.115's work absorbed in U3b).
Hand-offs are listed in §13.

## Reconciliation round 4 (volumes/reconcile-V04-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V04-r4; covered by the whole-design retrovalidation (J84).

The seam check `docs/volumes/critique/seam-layers-r3.md` routed 1 issue to this volume (0 blockers, 1 major, 0 minors). It
is fixed; nothing is left for the Fix list. What changed:

* **SLR3-01 (major) — a hood document's forecast order and P7's cap (the V04 half of SLR2-05).** Volume 1 runs a lone
  neighbourhood's S7b (6)–(7) after its one-district allocation, with P7's cap read from that allocation's poorest band
  (V1-3.10.1 step 6; J-V1.92); this volume now says the same, in six places. (1) V4 §3.1's hood line: in a hood document
  U-FORECAST runs after the one-district allocation, not before S7b (5); P7's cap reads that allocation's poorest-band
  households in place of the roster's; S7b (6) (d)'s void part is taken from that allocation; its heading cites
  V1-3.10.1 step 6, SLR3-01 and J-V4.116. (2) §3.3's first paragraph: "before (5) (in a hood document after the
  one-district allocation, V4 §3.1's hood line)". (3) P7's last sentence: "(in a hood document, the one-district
  allocation's poorest-band households)". (4) §1b.1's `NetworkForecast` row, §2.6's `NetworkForecast` row: "U-FORECAST at
  S7b (in a hood document after the one-district allocation, V1-3.10.1 step 6)"; §1b.1's P6/P7 row names the hood's cap;
  §1b.2's `NetworkForecaster.forecast` row names volume 1's unit run as the hood caller. (5) §1.2's volume-1 row cites
  V1-3.10.1 step 6 and (7) and names the one-district allocation among the hooks; §1.2's S7b row points at the hood line.
  (6) T-V4-75 adds: U-FORECAST called after the one-district allocation; P7's `voidDwellingHouseholds` ≤
  `voidDwellings.share` × the one-district allocation's poorest-band households; the underground pseudo-district's
  allocation ≤ `forecastSafety` × that forecast (volume 1's T-V1-20).
* **Beyond the required text, for the same seam (J-V4.116).** P5's catacomb expectation in a hood ranks only the burial
  faces the one-district allocation's anchors bring (the roster's would rank the virtual town's cemeteries outside the
  hood), and T-V4-75 bars it; F6's allocation cites the hood's source of the void part (V4 §3.4 F6).

New: J-V4.116; T-V4-75's clauses. No new BCR (BCR-19 stays the town's order; the hood's order is volume 1's unit run), no
new owner question; the build total is unchanged at 28.25–39.25 pw (the order is a call site in U4's hood work). Volume 1
needs no counterpart edit.

## Integration notes — continuation (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate (continuation); covered by the whole-design retrovalidation (J84).

* **IN-V04-13 (J-VI.28 applying J-VI.19 in the text).** §1b's reader row and §2's lifecycle row for the unexcavated
  style now name "the view key `showUnexcavated` (BCR-V9-20; J-VI.19)", set by volume 9's per-viewer control, not a
  `LayerSpec` field and not an event; BCR-10's §8.4 new text adds only `underView` and says so. IN-V04-11 had stated this
  by note; the rows themselves still read the retired field.
* **IN-V04-14 (J-VI.27).** The `supports` list of BCR-45's record — the piers whose keys bound this volume's arch-vault
  spans and whose depth `raised.supportFoundationCm` the foundation rule reads — is produced by file f item 244's support
  step (stations at a pitch in volume 11's `pierSpacingM` band or the way's held `spanSpacingCm`, keys kept through an
  unchanged course); BCR-45's span rule runs after it, unchanged.

## Reconciliation round 3 — continuation (volumes/reconcile-V04-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V04-r3; covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane's brief with one issue more than its 06:11 landing covered. The four landed issues
(SLR2-08, SLR2-15, TT-02, TT-07) are history, verified present and not redone. The new one, from
`docs/volumes/critique/seam-content-calibration-r2.md` §7, is fixed; nothing is left for the Fix list. What changed:

* **SCC-R2C-14 (minor) — the register at this volume's exits (SCC-R1C-2's V04 half).** V4 §8's exit cells for U0, U1,
  U2, U3, U3b, U4, U5 and the content row each carry "`plat calibrate register --check` green over the cells it lands", and
  *Evidence that ends each step* names the check. A new §8 paragraph, *The register at each exit*, states the clause in
  the finding's words and adds four things. (1) How tables land: each lands whole in the first step whose change compiles
  it, with one entry per calibratable column in that change; V11's C8 cells travel inside it; base cells added by this
  volume's requests and the base's II.7 tables follow the same rule. (2) The plan: `under.network` at U0; `under.layout` at
  U1; `under.ruin`, `under.catacomb` and this volume's `under.systems` `params` keys at U3; `under.openings` and
  `under.dig` at U3b; `under.fade` at U5; U2, U4 and the content row land no calibratable column. For each column it names
  the V12 §3.11 line that binds it, or the default line. (3) *The due steps*: where a V12 line's "`measure` at U3" cites a
  bar this plan runs later, the entry is due at that bar's step — `'V4-U3b'` for `under.openings` and `under.dig`,
  `'V4-U4'` for `sourceWeight`. (4) *What V12 §3.11's V04 lines leave to this section*: for each group, the history row it
  takes, the condition that confirms it and its pre-decided move. The moves are `distinct.rotateDeg` 30 → 45, run only after
  V11's culture-row move has failed, and `monument.tierDecay` 0.9 with `ceilingClearCm` 150 on a V4-U5 No; the ruin's other
  cells and the span-rule constants have none and fall to the panel rule. The volume writes no register line of its own
  and registers no `BenchBarDef` (J-V4.117): the columns T-V4-45 and T-V4-68 bear on are already named by V12's `under.ruin`
  V04 line, and the span-rule constants by its span-rule line. A second line for any of them would fail the lint as two
  entries for one knob. §1b.1 gains two rows: the register entries, with their producer and consumers, and the second
  values.
* **Beyond the listed issue (SCC-R2C-2's V04 half; V11 owns the issue).** §1b.1's cell for the dossier row sets
  `tables/dossier/sanitation` and `tables/dossier/subterranean` now reads "not calibratable" (every dossier row set's columns
  carry `calibratable: false`, V11 §3.1 row 63's rule). The register paragraph's content row depends on this.

New: J-V4.117, J-V4.118; §1b.1's two rows; a CONFIRMED and a PLAUSIBLE entry in §12; hand-offs in §13. No new bar, no new
BCR, no owner question. The build total is unchanged at 28.25–39.25 pw: the entries are written by the seats already
landing each step, with one command.

## Reconciliation round 4 — continuation (volumes/reconcile-V04-r4, 2026-09-29)

The workflow re-issued this lane's brief with two issues more than its 07:08 landing covered. The landed one (SLR3-01) is
history: its text was verified present (V4 §3.1's hood line, §3.3, P7, §1b, §2.6, T-V4-75) and not redone. The two new
ones, from `docs/volumes/critique/seam-surfaces-r3.md` §9 and `seam-content-calibration-r3.md` §6.2, are fixed; nothing is
left for the Fix list. What changed:

* **SR3-11 (major) — the grouped access into a sealed void, and the dwelling closure among U-DIG's callers.** (1) V4 §3.8's
  *Voids and bans* now carries the exception in the finding's words. An `addUndergroundAccess { building }` with no
  `target`, grouped before a dwelling declaration on an `unexcavated` cluster (V9 §4.17.4's forms), targets that cluster's
  element nearest in plan to the building's footprint, ties by address. Like a named target, it is the user's excavation
  (cause `edit`): its dry run lists the clusters it opens, and the declaration's closure then finds the cluster reachable
  and adds no access. The grouped access keeps its own closure's other pieces. The rule holds for a building the first rung
  qualifies (the base's "one of those buildings"); from any other building, an untargeted access takes the ordinary search.
  (2) A new §3.8 bullet, *The dwelling closure's way in*, makes the closure's first rung a caller of U-DIG. The buildings
  above the cluster are those §3.5.7 (d)'s geometry admits over one of its elements. One qualifies when its dig floor lies
  within `DigRule.maxM` above its nearest element's top. They are ordered by plan distance, then address; the first digs to
  that element. It gets no basement piece and no minimal system, and a connector only beyond `accessReachM`. The access
  takes (d)'s kinds, source `dig`, cause `edit` with the declaration's `seq`, and carries `bend.under.accessDug`. A building
  whose connector is refused is passed over. The alternatives are the next qualifying buildings, at most three, not dug in
  the dry run. The base's opening rungs are made by U-ACCESS (e)'s opening maker, as `placeAccess`'s public-opening form
  makes them, with volume 1's opening pass in the same commit. Keys, closure record, hold and undo are an edit's (J-V4.119).
  (3) In a skeleton prefix the closure runs at U-CITY C0 for a cluster still sealed after T2b. A grouped access in the
  prefix runs there first, not among T5's closures, and the declaration never takes `require`'s lifeline stair of cause
  `dossier` (V4 §4.7's U-CITY and U-LINK bullets; J-V4.120). (4) The wiring: §1.1's U-DIG row, §1.2's closure-rule row,
  §1b.2's `DugGenerators` row, §4.1's `addUndergroundAccess` row, §3.11's U-DIG failure row, a new §4.3 locality row and
  §6's budget (≤ 60 ms per building dug or passed over). (5) T-V4-48 gains the closures' clause at U4: T-V9-38's
  three-building fixture, the declaration alone, the undo, the ban on untargeted accesses outside the group, and the
  prefix's digest. U4 lists the work and the clause, absorbed in its range.
* **SCC-R3C-13 (minor) — the register's wording.** In V4 §8's *The register at each exit*, "compiles" now reads "first ships
  its rows (holds a compiled cell; V11 §2.1's empty-table rule)". That covers both of the finding's sentences, the plan
  table's header and the two further uses of the same verb in the paragraph (C8's rows, the base's II.7 tables). *The due
  steps* give the default line's entries "the default line's due (V12 §3.11: M-CAL, or the underground's later corpus run
  when a step lands after M-CAL; SCC-R3C-1)". The same wording is aligned in §1b.1's register row, J-V4.117's corpus
  clause and §12's PLAUSIBLE entry.

New: J-V4.119, J-V4.120; a CONFIRMED and a PLAUSIBLE entry in §12; hand-offs in §13 (XV-V9-27's status and citation to
V09, SR3-12 (b); item 372's *Needed by* to file f, SR3-15; the default line's later due to V12, SCC-R3C-1). No new BCR and
no owner question. The build total is unchanged at 28.25–39.25 pw.

## Reconciliation round 5 (volumes/reconcile-V04-r5, 2026-09-29)

The seam check `docs/volumes/critique/seam-layers-r4.md` routed one issue to this volume, SLR4-06 (minor); it is fixed and
nothing is left for the Fix list. What changed:

* **SLR4-06 (a) — the one list of commits.** V4 §3.10's bullet *Opening places after generation* and §1b.2's opening-pass
  row now name the dwelling declaration's closure whose second or third rung makes a public opening (V4 §3.8, the bullet
  *The dwelling closure's way in*), the pass running over that opening in the declaration's commit. T-V4-74 (b) checks the
  places after such a declaration, on a sealed cluster with no qualifying building above it, so that the base's second rung
  places the opening.
* **SLR4-06 (b) — the gate.** V4 §3.10's last sentence now reads that the pass runs only while `@plat/hood`'s local-place
  step is registered and runs — while `fabric.extensionWeight` > 0 (V01 V1-3.7.1, V1-3.15). With either missing, no opening
  place is made and their count is reported. §3.11's opening-pass row adds the switched-off cause with its outcome, and its
  report line names the cause. T-V4-74 (b)'s last clause reads "with the local-place step unregistered or the stage-2
  switch at 0, 0 places and their count reported". The same gate is stated in §3.1's T6 row, §1b.2's caller cell and §1.2's
  volume-1 row, which now cites V1-3.15.
* **Beyond the required text — the switch's own edit (J-V4.121).** The switch is an editable `weight`, so its edit is a
  commit that changes whether the pass may run. It joins V4 §3.10's list: an `editTable` or `editPreset` that raises the
  resolved switch above 0 runs the pass over every standing access it selects and makes their places. One that lowers it to
  0 tombstones every opening place. Each is a fate of the edit, and the edit's undo restores it. §4.3 gains the edit's
  locality row. T-V4-74 (b) checks both directions and the undo. §8's U3b names the edit among the opening pass's edit
  callers, absorbed in its range.

New: J-V4.121; a CONFIRMED and a PLAUSIBLE entry in §12; a hand-off in §13 (volume 1 may state the switch's edit for its
other places and pins). No new BCR and no owner question. The build total is unchanged at 28.25–39.25 pw.

## Reconciliation round 6 (volumes/reconcile-V04-r6, 2026-09-29)

The seam check `docs/volumes/critique/seam-layers-r5.md` routed one issue to this volume, SLR5-01 (major); it is fixed and
nothing is left for the Fix list. Round 5 had made the stage-2 switch's edit a narrow commit of V4 §3.10's list that held the
underground byte-identical; volume 1 re-derives that edit from the switch's first reader stage (V1-2.7's `hood.constants`
row), which is S2, so the ground's blocks, fabrics, plots and buildings are re-cut and the underground follows them. What
changed:

* **V4 §4.3's switch row.** Its *re-derives* cell now reads: volume 1's re-derivation of the edit (V1-3.15, *The switch's
  edit*: from the switch's first reader stage with §6.3's carry-over), then T1–T8 as after the `adjust` row's Re-derive, the
  re-cut plots and buildings drawing U-ACCESS (d) and the access closures as the ground-edit row states and the excavation
  reading recomputed; T6's opening pass runs under the new gate — a place made for each selected access where the switch
  rose above 0, none where it fell to 0 and each old place retired by the carry-over — fates of the edit. Its
  *byte-identical* cell reads "what the stages before that first reader stage commit". The row's edit cell cites SLR5-01
  and, after volume 1's lane noted that V1-3.15's bullet re-derives every change of the value (its 13:46 note), names any
  change — across 0, or inside (0, 1], where the gate holds and the pass runs as at generation.
* **V4 §3.10's one list and §1b.2's row.** The list entry reads "the re-derivation that an `editTable` or `editPreset` of
  volume 1's stage-2 switch `fabric.extensionWeight` makes (V1-3.15, *The switch's edit*), at its T6: raised above 0, the
  places made; lowered to 0, none made and the old ones retired by §6.3's carry-over", in both places (§1b.2's without the
  cell's name). The bullet's head no
  longer says "inside the one edit that moves its gate, over every access it selects"; it reads "at a T6 over every access it
  selects: at generation T6 and at the T6 of the tail that follows a re-derivation (V4 §4.3's `adjust` and switch rows)".
  §1b.2's "tombstoned with its host or when the switch falls to 0" reads "… or retired by a switch edit's re-derivation
  (V1-3.15)".
* **J-V4.121.** The switch's own edit is volume 1's re-derivation (V1-3.15), whose tail's T6 runs the pass under the new
  gate. "Within §6's per-access budget" is deleted: the edit is priced as the re-derivation. The decision records why round
  5's narrower form was withdrawn and that the rows cite V1-3.15's bullet, not a stage.
* **Aligned beyond the required text.** §1.2's volume-1 row says the pass runs at T6, generation's and the tail's after a
  re-derivation, a switch edit's among them. §3.11's opening-pass row says a switched-off document's places are made at the
  T6 of the re-derivation that raises the switch. §8's U3b says the switch edit reaches the pass only as that
  re-derivation's T6, so it adds nothing of its own to build. T-V4-31, the locality oracle's bar, adds the switch edit:
  nothing the stages before its first reader stage commit changes, and the underground is re-derived by T1–T8.
* **T-V4-74 (b).** Its switch clauses keep their assertions (0 places at 0; after 0 → 1 the places equal the selection; each
  place a fate, restored by the undo); a lowered switch's places are "tombstoned (retired by §6.3's carry-over)"; and it adds
  "after either switch edit, the underground re-derived with the ground by T1–T8, never held byte-identical".
* **§12 and §13.** A CONFIRMED and a PLAUSIBLE entry for round 6; round 5's PLAUSIBLE entry and §13's hand-off cite V1-3.15's
  *The switch's edit* (SLR5-02) in place of "volume 1 does not yet state the edit's transition" and "may state". §13 gains a
  round-6 paragraph with volume 1's hand-off.

Volume 1's words are SLR5-02 (the bullet, the place's lifetime in V1-2.7 and V1-3.7.1, T-V1-4's clause, J-V1.101), owned by
volume 1's lane reconcile-V01-r6, which wrote them while this lane ran; this lane read them before landing (V01 md5
`a348b2f1…`) and found them in agreement with V04's rows, and widened §4.3's switch row and T-V4-31 to any change of the
value, as volume 1's bullet re-derives every change. No new BCR and no owner question. The build total is unchanged at 28.25–39.25 pw.

## Finalization (volumes/_finalize, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

The finalization fixed, in place, **SLR6-01** (major, seam-layers-r6): V04 §8's U4 row now carries the crypt derivation's round-6 content — the stair-entered test and the whole basement of a crypt no stair reaches (volume 3 §3.7.4), volume 2's lift acting on the ground wings over the basement's ring (S23R6-02), and volume 3 §3.7.1's crypt clause of `basementDoor(b)` with its first reading moving a walk-out church's outside door and volume 1's entrance reserve — and U4's exit runs T-V3-23 (j)'s door and basement-extent clauses and records the crypt derivation's first reading in the M6-U output version's declared shift beside U1's forecast shift (C4-01). U4's estimate is unchanged (5.25–7.25 pw). §12 records the reads (a CONFIRMED bullet). The round-6 minors SLR6-02, SLR6-03 and SCC-113 are on the finalization's fix list (docs/volumes/INDEX.md §7). **CONFIRMED** by execution: both cell edits asserted one match each.
