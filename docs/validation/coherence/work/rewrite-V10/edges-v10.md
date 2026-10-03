# Edge catalogue — every mechanism at its limits, and the cross-unit combinations (principle (11))

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/canon; covered by the whole-design retrovalidation (J84).

Machine twin: `edges.json` (`mechanisms`, `edges`, `combinations`, `named_combinations`, `general_rules`, `method`).

**Method.** Mechanisms are the subsections of each unit's mechanism chapters (base §2–§11, PART II, PART III, with §4's stage blocks split at their bold stage leads; a volume's §2–§5 subsections). An edge class applies where the mechanism's text uses its vocabulary three times or more; the edge is DEFINED where a sentence of the mechanism's own text states the case (quoted as evidence), UNTESTED where it is defined but no test id appears in the text or cites the section, UNDEFINED otherwise. Inventory-reported edges (edges_observed, edge_gaps, undefined_edges, undefined-edge conflicts) are listed as UNDEFINED entries EI-…. Combinations: every pair of features from different units that can meet on one map (rungs intersect; layers meet directly, through accesses, basements, foundations, shade or landfall; or a time, dossier, edit, view, export, clerk, content or preset feature over a physical one); DEFINED where one sentence of either unit (or the outcome's owner) names both, else UNDEFINED, routed to the owner (the later-built unit for two physical features; the time, dossier, edit, view, export, clerk, content or preset unit otherwise). The evidence is a scan: a verifier confirms each quoted sentence states the outcome, its failure rung and its test.

**Edge classes.** E1 no input; E2 exactly one item; E3 the maximum and its caps; E4 degenerate geometry; E5 missing, empty or contradictory data (the dossier included); E6 every rung from THORP to the METROPOLIS cap; E7 every toggle and preset; E8 save, load, undo, redo, regenerate and migrate. **An UNDEFINED edge is a MAJOR finding to close (a BLOCKER where its outcome would be a crash, a hang, lost data, a silent wrong result or a whole-map retry); an UNTESTED one needs its test.** Each owner writes the outcome, the failure rung (§5's ladder: check, repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and the test.

**General rule for E4-degenerate (E-GEN-1).** General rule (to be stated once at §5.1 by the determinism editor if absent): every stage commits geometry through kernel transactions; a degenerate result is refused by the kernel (§3.1: E_DEGENERATE, E_BELOW_MIN_EDGE, E_NON_SIMPLE …) and handled by the stage's failure class (§5.2, or the volume's own F-class) on its ladder, never a whole-map retry. A mechanism with no local statement is DEFINED by that rule once its stage's failure class is named in its text.

## Summary by unit

| unit | mechanisms | edges | DEFINED | UNTESTED | UNDEFINED | combinations owned (UNDEFINED) |
|---|---|---|---|---|---|---|
| model | 9 | 19 | 15 | 1 | 3 | 3 |
| kernel | 10 | 75 | 37 | 15 | 23 | 0 |
| pipeline | 35 | 210 | 137 | 30 | 43 | 39 |
| determinism | 17 | 132 | 95 | 4 | 33 | 39 |
| rendering | 21 | 134 | 86 | 11 | 37 | 38 |
| scope | 9 | 60 | 52 | 0 | 8 | 0 |
| V01 | 89 | 287 | 55 | 99 | 133 | 15 |
| V02 | 35 | 159 | 91 | 21 | 47 | 28 |
| V03 | 28 | 105 | 50 | 26 | 29 | 6 |
| V04 | 33 | 152 | 38 | 62 | 52 | 62 |
| V05 | 40 | 169 | 61 | 48 | 60 | 31 |
| V06 | 39 | 179 | 67 | 64 | 48 | 42 |
| V07 | 37 | 173 | 91 | 44 | 38 | 0 |
| V08 | 36 | 147 | 86 | 20 | 41 | 62 |
| V09 | 71 | 261 | 100 | 67 | 94 | 25 |
| V10 | 48 | 158 | 93 | 14 | 51 | 8 |
| V11 | 36 | 151 | 87 | 12 | 52 | 21 |
| V12 | 39 | 135 | 84 | 11 | 40 | 17 |

## The combinations the owner named

* **a settlement that grows over a sealed void** (V06, V04; owner V06) — DEFINED (to confirm: outcome, rung, test): canon reading: "V06 §3.11.6 and §3.5.2 (passages sealed by decline and reopened by regrowth); V04 §0/§3.5.7 (a house built over a void may dig down into it; a new sewer or a growing catacomb may cut through it); g item 113 (d)–(e) (sewers reopen; LOST until refound)"
* **a catacomb growing into a sewer** (V04, pipeline; owner V04) — DEFINED (to confirm: the typed opening, rung, test): canon reading: "V04 §0 l.195: 'A catacomb may break into a sewer, a quarry into a cave; each meeting is a typed opening' — V04 §3.5.1's growth and U-LINK's breach link state the mechanism; II.7.6 carries the base's link kinds"
* **a raised way under an island's shade** (V05, model, pipeline; owner V05) — DEFINED (to confirm): canon reading: "V05 §1b / §3.15 (7): sky.clearance and reclearIsland read every caster an epoch commits under an island (EpochScope.raised); file f item 290: raised ways and retaining walls are casters of item 102's daylight driver; the island's groundRefCm counts the caster…"
* **a raised way over a harbour mouth** (pipeline, model, V04; owner pipeline) — UNDEFINED: canon reading: "no text states whether a generated raised way may cross a harbour mouth, its chain (item 106) or a mole; the owner (the raised-way generation, §4.3 with file f items 244 and 290) states the outcome (the route solver's cost row or an exclusion), its rung and a…"
* **a deck plot on a bridge over a moat** (pipeline, model; owner pipeline) — DEFINED (to confirm realism): canon reading: "file f item 246: a Bridge of kind ford or draw, or with no deckCm, offers no deck plot — a drawbridge over a moat carries none; a fixed moat bridge with a deck offers them by the deck rows (V11 deck, deckOk); the pipeline editor confirms or narrows it for gat…"
* **a retaining wall on a cliff edge** (model, pipeline; owner pipeline) — UNDEFINED: canon reading: "no text states the outcome where S10/S11's levelling or a district edge would raise a retaining wall along a cliff line (a closure barrier of kind cliff, item 106): the pipeline editor states it (the cliff face holds the ground; no wall is raised on a cliff e…"
* **a dossier removing what an edit pinned** (V08, determinism; owner determinism) — DEFINED (to confirm): canon reading: "§7.7's precedence (the dossier is the sole immutable truth, items 20, 22) and its dossier contract items 1–5: a dossier event removes the institution; the user's pin on its place yields (the pin is reported as orphaned, §7.4); V08 §3.6 applies the removal"
* **an epoch undone after a save** (V06, determinism; owner V06) — DEFINED (to confirm): canon reading: "V06 §0 ('survives saving and reloading), undo while it is the latest thing that happened, or branch from') and V06 §4's undo of an epoch as one event; §7.4's epoch row"


### V10

* M-V10-456-E5-data — UNTESTED — V10 §2.1 *2.1 Package, threads and the dependency rule (BCR-V10-8)* — missing, empty or contradictory data (the dossier included); defined by: "It imports `@plat/api` (the facade and its types), `@plat/model` (the event schemas, `Id`, `FactTier`, `Blueprint`, `MsgRef`), `@plat/tables` (`clerk…"
* M-V10-504-E5-data — UNTESTED — V10 §2.3 *2.3 Sessions, segments and turns (session memory)* — missing, empty or contradictory data (the dossier included); defined by: "Every rule of this volume that says "the session's key" means it: the harness passes it as `admitAs` — `'secret'` at that tier, else the key form `{ …"
* M-V10-570-E5-data — UNDEFINED — V10 §2.4 *2.4 Drafts (session memory)* — missing, empty or contradictory data (the dossier included)
* M-V10-781-E5-data — UNDEFINED — V10 §2.9 *2.9 Critique findings and refusals (session memory)* — missing, empty or contradictory data (the dossier included); tests seen: T-V10-4, T-V9-13, T101-3
* M-V10-795-E5-data — UNTESTED — V10 §2.10 *2.10 The clerk tables — `clerk.ops` (device only) and `clerk.content`…* — missing, empty or contradictory data (the dossier included); defined by: "**Default rows** (provenance `own` unless named; no row calibratable by the corpus stage — V11 §3.1 registers `clerk.ops` and `clerk.content` as rows…"
* M-V10-900-E5-data — UNDEFINED — V10 §2.12 *2.12 The tools' inputs (the vocabulary the model writes; schemas gene…* — missing, empty or contradictory data (the dossier included)
* M-V10-1215-E4-degenerate — UNDEFINED — V10 §3.1 *3.1 Entries, routes and the turn* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T101-1
* M-V10-1215-E8-lifecycle — UNDEFINED — V10 §3.1 *3.1 Entries, routes and the turn* — save, load, undo, redo, regenerate and migrate; tests seen: T101-1
* M-V10-1265-E1-none — UNTESTED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — no input / nothing to act on; defined by: "Each route therefore has its own cached prefix; the explain and help routes send two tools and one, so their prefixes are small and no call is wasted…"
* M-V10-1265-E2-one — UNTESTED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — exactly one item; defined by: "`system` — one text block, the rendered prompt (V10 §3.3), with an explicit cache breakpoint of TTL `clerk.ops.cache.staticTtl`: the tools and the sy…"
* M-V10-1265-E4-degenerate — UNDEFINED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V10-1265-E8-lifecycle — UNDEFINED — V10 §3.2 *3.2 The request: the cached prefix, segments and map updates* — save, load, undo, redo, regenerate and migrate
* M-V10-1306-E4-degenerate — UNDEFINED — V10 §3.3 *3.3 The system prompt, the map block and the vocabulary block* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-43
* M-V10-1441-E4-degenerate — UNDEFINED — V10 §3.4 *3.4 The tool schemas* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T101-1
* M-V10-1503-E4-degenerate — UNDEFINED — V10 §3.5 *3.5 Running the tools* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-4, T-V9-13, T-V9-15, T-V9-32
* M-V10-1503-E6-rungs — UNDEFINED — V10 §3.5 *3.5 Running the tools* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-4, T-V9-13, T-V9-15, T-V9-32
* M-V10-1598-E4-degenerate — UNDEFINED — V10 §3.6 *3.6 The spatial resolver — words to points* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-5, T-V9-13, T101-3
* M-V10-1636-E1-none — UNTESTED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — no input / nothing to act on; defined by: "An unspecified field stays absent: the rules and the auto features derive it (item 20 (h) applied to words, §7.7 layer 1); the clerk never asks the u…"
* M-V10-1636-E2-one — UNDEFINED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — exactly one item
* M-V10-1636-E4-degenerate — UNDEFINED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V10-1636-E5-data — UNTESTED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — missing, empty or contradictory data (the dossier included); defined by: "An unspecified field stays absent: the rules and the auto features derive it (item 20 (h) applied to words, §7.7 layer 1); the clerk never asks the u…"
* M-V10-1636-E6-rungs — UNTESTED — V10 §3.7 *3.7 Natural language to a skeleton draft (creation mode)* — every rung from THORP to the METROPOLIS cap; defined by: ""a green village" → V07's `green`), `water` and `coastSide`, `walls`, `wealth`, `planned`, `era`, `magic`, `castle`, `harbour`, `temple`, and at a vi…"
* M-V10-1677-E1-none — UNTESTED — V10 §3.8 *3.8 Rosters* — no input / nothing to act on; defined by: "With a dossier connected every line must name an unplaced dossier element (the brief lists them); a line naming none is refused by the engine as doss…"
* M-V10-1677-E2-one — UNTESTED — V10 §3.8 *3.8 Rosters* — exactly one item; defined by: "A roster has one variation (J-V10.16); its cards are the choice."
* M-V10-1677-E4-degenerate — UNDEFINED — V10 §3.8 *3.8 Rosters* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident)
* M-V10-1677-E5-data — UNDEFINED — V10 §3.8 *3.8 Rosters* — missing, empty or contradictory data (the dossier included)
* M-V10-1690-E4-degenerate — UNDEFINED — V10 §3.9 *3.9 The oracle at depth — providers, sections, the solver's explanati…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-10, T-V10-37, T-V10-9
* M-V10-1820-E4-degenerate — UNDEFINED — V10 §3.9a *3.9a The underground and the crypt, explained (item 109; J-V10.40)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29
* M-V10-1820-E6-rungs — UNDEFINED — V10 §3.9a *3.9a The underground and the crypt, explained (item 109; J-V10.40)* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-29
* M-V10-1820-E8-lifecycle — UNDEFINED — V10 §3.9a *3.9a The underground and the crypt, explained (item 109; J-V10.40)* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-29
* M-V10-1862-E3-cap — UNDEFINED — V10 §3.10 *3.10 The critique engine — rules checked by code, explained by the mo…* — the maximum and its caps; tests seen: T-V10-39
* M-V10-1862-E4-degenerate — UNDEFINED — V10 §3.10 *3.10 The critique engine — rules checked by code, explained by the mo…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-39
* M-V10-1862-E8-lifecycle — UNDEFINED — V10 §3.10 *3.10 The critique engine — rules checked by code, explained by the mo…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-39
* M-V10-1962-E4-degenerate — UNDEFINED — V10 §3.12 *3.12 Knowledge gating — the guard* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-6
* M-V10-1962-E6-rungs — UNDEFINED — V10 §3.12 *3.12 Knowledge gating — the guard* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-6
* M-V10-1962-E8-lifecycle — UNDEFINED — V10 §3.12 *3.12 Knowledge gating — the guard* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-6
* M-V10-2014-E4-degenerate — UNDEFINED — V10 §3.13 *3.13 Never inventing a dossier fact — structure first, then the groun…* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29
* M-V10-2118-E1-none — UNDEFINED — V10 §3.15 *3.15 Transcripts that replay as skeletons* — no input / nothing to act on; tests seen: T-V10-12, T101-4, T101-6
* M-V10-2149-E4-degenerate — UNDEFINED — V10 §3.16 *3.16 Refusals with alternatives* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29, T-V9-15, T101-3
* M-V10-2149-E6-rungs — UNDEFINED — V10 §3.16 *3.16 Refusals with alternatives* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-29, T-V9-15, T101-3
* M-V10-2220-E4-degenerate — UNDEFINED — V10 §3.17 *3.17 The host clerk seam* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-20, T-V8-27
* M-V10-2316-E1-none — UNDEFINED — V10 §3.18 *3.18 The usage meter and the caps* — no input / nothing to act on
* M-V10-2316-E2-one — UNDEFINED — V10 §3.18 *3.18 The usage meter and the caps* — exactly one item
* M-V10-2316-E3-cap — UNTESTED — V10 §3.18 *3.18 The usage meter and the caps* — the maximum and its caps; defined by: "Before every request the harness refuses to send when the month's estimate has reached `monthlyCapUsd` (`budget`), warns in the drawer when it passes…"
* M-V10-2316-E5-data — UNDEFINED — V10 §3.18 *3.18 The usage meter and the caps* — missing, empty or contradictory data (the dossier included)
* M-V10-2329-E5-data — UNDEFINED — V10 §3.19 *3.19 Failure handling — every failure has a bounded ladder, and nothi…* — missing, empty or contradictory data (the dossier included); tests seen: T-V10-18
* M-V10-2329-E8-lifecycle — UNDEFINED — V10 §3.19 *3.19 Failure handling — every failure has a bounded ladder, and nothi…* — save, load, undo, redo, regenerate and migrate; tests seen: T-V10-18
* M-V10-2357-E1-none — UNTESTED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — no input / nothing to act on; defined by: "**Never sent:** the document's bytes, any image, coordinates, a withheld name or purpose, a concealed use, an unexcavated element below `secret`, the…"
* M-V10-2357-E2-one — UNDEFINED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — exactly one item
* M-V10-2357-E5-data — UNDEFINED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — missing, empty or contradictory data (the dossier included)
* M-V10-2357-E8-lifecycle — UNDEFINED — V10 §3.20 *3.20 Safety and privacy — what is sent, what is kept* — save, load, undo, redo, regenerate and migrate
* M-V10-2403-E1-none — UNDEFINED — V10 §3.22 *3.22 Determinism* — no input / nothing to act on; tests seen: T-V10-11, T-V10-3, T-V10-30, T-V10-4
* M-V10-2403-E6-rungs — UNDEFINED — V10 §3.22 *3.22 Determinism* — every rung from THORP to the METROPOLIS cap; tests seen: T-V10-11, T-V10-3, T-V10-30, T-V10-4
* M-V10-2425-E4-degenerate — UNDEFINED — V10 §4.1 *4.1 The encoders — each tool's input to its events* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-1, T-V10-33, T-V10-4, T-V10-7
* M-V10-2560-E2-one — UNDEFINED — V10 §4.5 *4.5 Locality and scope* — exactly one item; tests seen: T-V10-25
* M-V10-2569-E5-data — UNDEFINED — V10 §4.6 *4.6 What is not an edit* — missing, empty or contradictory data (the dossier included)
* M-V10-2569-E7-toggles — UNDEFINED — V10 §4.6 *4.6 What is not an edit* — every toggle and preset (parity presets, every layer on and off)
* M-V10-2569-E8-lifecycle — UNTESTED — V10 §4.6 *4.6 What is not an edit* — save, load, undo, redo, regenerate and migrate; defined by: "`clerk.content`'s rows change by `editTable` on the document's override layer or through the preference layer, `clerk.ops`' through the device's pref…"
* M-V10-2586-E8-lifecycle — UNDEFINED — V10 §5.1 *5.1 On the map (view state; never exported, never hashed)* — save, load, undo, redo, regenerate and migrate
* M-V10-2602-E1-none — UNDEFINED — V10 §5.3 *5.3 Exports* — no input / nothing to act on
* M-V10-2602-E2-one — UNDEFINED — V10 §5.3 *5.3 Exports* — exactly one item
* M-V10-2602-E8-lifecycle — UNTESTED — V10 §5.3 *5.3 Exports* — save, load, undo, redo, regenerate and migrate; defined by: "* **The defect store** — "Save as file" in the drawer's settings writes the device's `DefectRecord`s as JSON (V10 §2.8): counts and codes only, so it…"
* M-V10-2618-E1-none — UNDEFINED — V10 §5.4 *5.4 The drawer's text (semantics; V09 draws it)* — no input / nothing to act on; tests seen: T-V10-29, T-V9-15
* M-V10-2618-E4-degenerate — UNDEFINED — V10 §5.4 *5.4 The drawer's text (semantics; V09 draws it)* — degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident); tests seen: T-V10-29, T-V9-15
* EI-V10-EDGE-1 — UNDEFINED (inventory V10-EDGE-1) — V10 §4.2 (3) creation acceptance and V09 §4.11 creation preview vs V09 §3.2 (3)… — V10 says that when a creation proposal replaces the untouched empty-state town 'the old handle closes — nothing is lost, the old town being its seed and still in the recent documents (R15)', and V09 §4.11 says 'the old one stays in Recent towns'; but V09 §3.2 (3) writes nothing to the local store while the log holds only its creation prefix (the LocalDocRecord is created on the first committed ev…


### V10

* C-steep-clerk — steep (pipeline) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-moat-clerk — moat (pipeline) × clerk (V10) at TOWN, CITY, METROPOLIS
* C-square-clerk — square (pipeline) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-frame-clerk — frame (kernel) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-sewer-clerk — sewer (V04) × clerk (V10) at TOWN, CITY, METROPOLIS
* C-access-clerk — access (V04) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-vault-clerk — vault (V04) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS
* C-custom-clerk — custom (V08) × clerk (V10) at THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS

