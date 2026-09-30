# edges for V10
general_rules: {"E4-degenerate": "General rule (to be stated once at §5.1 by the determinism editor if absent): every stage commits geometry through kernel transactions; a degenerate result is refused by the kernel (§3.1: E_DEGENERATE, E_BELOW_MIN_EDGE, E_NON_SIMPLE …) and handled by the stage's failure class (§5.2, or the volume's own F-class) on its ladder, never a whole-map retry. A mechanism with no local statement is DEFINED by that rule once its stage's failure class is named in its text."}

## M-V10-456 V10 §2.1 2.1 Package, threads and the dependency rule (BCR-V10-8) (line 456)
- [UNTESTED] E5-data missing, empty or contradictory data (the dossier included) | It imports `@plat/api` (the facade and its types), `@plat/model` (the event schemas, `Id`, `FactTier`, `Blueprint`, `MsgRef`), `@plat/tables` (`clerk.ops`, `clerk.content`, the vocabularies and V09's message catalogue fi | tests=[] | rung=None

## M-V10-504 V10 §2.3 2.3 Sessions, segments and turns (session memory) (line 504)
- [UNTESTED] E5-data missing, empty or contradictory data (the dossier included) | Every rule of this volume that says "the session's key" means it: the harness passes it as `admitAs` — `'secret'` at that tier, else the key form `{ tier, places }` (J-V10.90) — on every `query` and every filtered `previ | tests=[] | rung=Only a `tool_use` block after the last `fallback` block of a response is a call (V10 §3.1); a declined attempt's blocks are never run, recorded or announced.

## M-V10-570 V10 §2.4 2.4 Drafts (session memory) (line 570)
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=[] | rung=None

## M-V10-781 V10 §2.9 2.9 Critique findings and refusals (session memory) (line 781)
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=['T-V10-4', 'T-V9-13', 'T101-3'] | rung=None

## M-V10-795 V10 §2.10 2.10 The clerk tables — `clerk.ops` (device only) and `clerk.content` (document-overridabl (line 795)
- [UNTESTED] E5-data missing, empty or contradictory data (the dossier included) | **Default rows** (provenance `own` unless named; no row calibratable by the corpus stage — V11 §3.1 registers `clerk.ops` and `clerk.content` as rows 88–89 with `calibratable: false` on every column, since no corpus of d | tests=[] | rung=`ops.model.fallbacks`, `ops.model.betas` | `default`, `['server-side-fallback-2026-07-01']` | the provider's recommended server-side refusal fallback, routed by refusal category (skill:

## M-V10-900 V10 §2.12 2.12 The tools' inputs (the vocabulary the model writes; schemas generated, V10 §3.4) (line 900)
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=[] | rung=None

## M-V10-1215 V10 §3.1 3.1 Entries, routes and the turn (line 1215)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T101-1'] | rung=**Before anything else, the fallback boundary** (the provider's refusal fallback, skill: refusal fallbacks;
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=['T101-1'] | rung=**Before anything else, the fallback boundary** (the provider's refusal fallback, skill: refusal fallbacks;

## M-V10-1265 V10 §3.2 3.2 The request: the cached prefix, segments and map updates (line 1265)
- [UNTESTED] E1-none no input / nothing to act on | Each route therefore has its own cached prefix; the explain and help routes send two tools and one, so their prefixes are small and no call is wasted on a declaration the route would refuse. 2. | tests=[] | rung=`output_config.effort` pinned per route — never varied inside a segment, the grounding repair included (V10 §3.13), since a top-level effort change invalidates the messages cache;
- [UNTESTED] E2-one exactly one item | `system` — one text block, the rendered prompt (V10 §3.3), with an explicit cache breakpoint of TTL `clerk.ops.cache.staticTtl`: the tools and the system are one cached prefix for every request of every segment of the ro | tests=[] | rung=`output_config.effort` pinned per route — never varied inside a segment, the grounding repair included (V10 §3.13), since a top-level effort change invalidates the messages cache;
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=[] | rung=`output_config.effort` pinned per route — never varied inside a segment, the grounding repair included (V10 §3.13), since a top-level effort change invalidates the messages cache;
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=[] | rung=`output_config.effort` pinned per route — never varied inside a segment, the grounding repair included (V10 §3.13), since a top-level effort change invalidates the messages cache;

## M-V10-1306 V10 §3.3 3.3 The system prompt, the map block and the vocabulary block (line 1306)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-43'] | rung=**Refusals and bends** (V10 §3.16): when a request falls in a refusal category, say so in one sentence and offer the listed alternatives — for a refusal you give yourself (a dossier change asked for in words, a picture, 

## M-V10-1441 V10 §3.4 3.4 The tool schemas (line 1441)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T101-1'] | rung=`check_draft` | Try the draft on a copy of the map: what each declaration made, bends, refusals, counts and the rules check. |

## M-V10-1503 V10 §3.5 3.5 Running the tools (line 1503)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-4', 'T-V9-13', 'T-V9-15', 'T-V9-32', 'T101-3'] | rung=An answer carrying a `bent` `MsgRef` — any `bend.*` row of V9 §4.9 — leaves the item `bent`, the bend its `bent` line and its alternatives `propose` actions — for a placement bend each of the preview's plots as `placeAt`
- [UNDEFINED] E6-rungs every rung from THORP to the METROPOLIS cap | None | tests=['T-V10-4', 'T-V9-13', 'T-V9-15', 'T-V9-32', 'T101-3'] | rung=An answer carrying a `bent` `MsgRef` — any `bend.*` row of V9 §4.9 — leaves the item `bent`, the bend its `bent` line and its alternatives `propose` actions — for a placement bend each of the preview's plots as `placeAt`

## M-V10-1598 V10 §3.6 3.6 The spatial resolver — words to points (line 1598)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-5', 'T-V9-13', 'T101-3'] | rung=PointCm; bent?: string }` is a pure function of the anchor, the committed geometry of the document it targets (the scratch while a draft exists) and `clerk.content`'s `spatial` row.

## M-V10-1636 V10 §3.7 3.7 Natural language to a skeleton draft (creation mode) (line 1636)
- [UNTESTED] E1-none no input / nothing to act on | An unspecified field stays absent: the rules and the auto features derive it (item 20 (h) applied to words, §7.7 layer 1); the clerk never asks the user for it (V10 §3.3 rule 4). | tests=[] | rung=The encoder routes the blueprint by `LadderRouter.route(population)` (V07 §2.1): below 1 500 people it returns the village product once V07's `ProductDecl('village')` is registered, and the draft is a village — `size.run
- [UNDEFINED] E2-one exactly one item | None | tests=[] | rung=The encoder routes the blueprint by `LadderRouter.route(population)` (V07 §2.1): below 1 500 people it returns the village product once V07's `ProductDecl('village')` is registered, and the draft is a village — `size.run
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=[] | rung=The encoder routes the blueprint by `LadderRouter.route(population)` (V07 §2.1): below 1 500 people it returns the village product once V07's `ProductDecl('village')` is registered, and the draft is a village — `size.run
- [UNTESTED] E5-data missing, empty or contradictory data (the dossier included) | An unspecified field stays absent: the rules and the auto features derive it (item 20 (h) applied to words, §7.7 layer 1); the clerk never asks the user for it (V10 §3.3 rule 4). | tests=[] | rung=The encoder routes the blueprint by `LadderRouter.route(population)` (V07 §2.1): below 1 500 people it returns the village product once V07's `ProductDecl('village')` is registered, and the draft is a village — `size.run
- [UNTESTED] E6-rungs every rung from THORP to the METROPOLIS cap | "a green village" → V07's `green`), `water` and `coastSide`, `walls`, `wealth`, `planned`, `era`, `magic`, `castle`, `harbour`, `temple`, and at a village rung `fieldSystem` and `palisade`. | tests=[] | rung=The encoder routes the blueprint by `LadderRouter.route(population)` (V07 §2.1): below 1 500 people it returns the village product once V07's `ProductDecl('village')` is registered, and the draft is a village — `size.run

## M-V10-1677 V10 §3.8 3.8 Rosters (line 1677)
- [UNTESTED] E1-none no input / nothing to act on | With a dossier connected every line must name an unplaced dossier element (the brief lists them); a line naming none is refused by the engine as dossier-owned, and the clerk offers the unplaced elements as the alternativ | tests=[] | rung=None
- [UNTESTED] E2-one exactly one item | A roster has one variation (J-V10.16); its cards are the choice. | tests=[] | rung=None
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=[] | rung=None
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=[] | rung=None

## M-V10-1690 V10 §3.9 3.9 The oracle at depth — providers, sections, the solver's explanation and the field's dr (line 1690)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-10', 'T-V10-37', 'T-V10-9'] | rung=`members` for a collective or ladder record's use (item 108);

## M-V10-1820 V10 §3.9a 3.9a The underground and the crypt, explained (item 109; J-V10.40) (line 1820)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-29'] | rung=The clerk explains item 109's subjects only from the records their volumes write — V04's `RuinRecord`, `CatacombComplex`, `AccessCause`, `LinkCause`, `reusedBy` and the excavation reading, and §2.6's `Basement.crypt` (V0
- [UNDEFINED] E6-rungs every rung from THORP to the METROPOLIS cap | None | tests=['T-V10-29'] | rung=The clerk explains item 109's subjects only from the records their volumes write — V04's `RuinRecord`, `CatacombComplex`, `AccessCause`, `LinkCause`, `reusedBy` and the excavation reading, and §2.6's `Basement.crypt` (V0
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=['T-V10-29'] | rung=The clerk explains item 109's subjects only from the records their volumes write — V04's `RuinRecord`, `CatacombComplex`, `AccessCause`, `LinkCause`, `reusedBy` and the excavation reading, and §2.6's `Basement.crypt` (V0

## M-V10-1862 V10 §3.10 3.10 The critique engine — rules checked by code, explained by the model (line 1862)
- [UNDEFINED] E3-cap the maximum and its caps | None | tests=['T-V10-39'] | rung=K2 | info | a draft item with a bend line that K16 or K17 does not report | "{what} was adjusted: {bent}." | — |
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-39'] | rung=K2 | info | a draft item with a bend line that K16 or K17 does not report | "{what} was adjusted: {bent}." | — |
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=['T-V10-39'] | rung=K2 | info | a draft item with a bend line that K16 or K17 does not report | "{what} was adjusted: {bent}." | — |

## M-V10-1962 V10 §3.12 3.12 Knowledge gating — the guard (line 1962)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-6'] | rung=**Dry-run results are filtered too.** A preview or an edit made for the clerk asks for `{ filtered: true }` with `admitAs` the effective key in V10 §2.3's form (BCR-V10-6, BCR-V10-22): fates, renames, conflict actions, c
- [UNDEFINED] E6-rungs every rung from THORP to the METROPOLIS cap | None | tests=['T-V10-6'] | rung=**Dry-run results are filtered too.** A preview or an edit made for the clerk asks for `{ filtered: true }` with `admitAs` the effective key in V10 §2.3's form (BCR-V10-6, BCR-V10-22): fates, renames, conflict actions, c
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=['T-V10-6'] | rung=**Dry-run results are filtered too.** A preview or an edit made for the clerk asks for `{ filtered: true }` with `admitAs` the effective key in V10 §2.3's form (BCR-V10-6, BCR-V10-22): fates, renames, conflict actions, c

## M-V10-2014 V10 §3.13 3.13 Never inventing a dossier fact — structure first, then the grounding check (line 2014)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-29'] | rung=**Claims.** Checked before any repair, sentence by sentence:

## M-V10-2118 V10 §3.15 3.15 Transcripts that replay as skeletons (line 2118)
- [UNDEFINED] E1-none no input / nothing to act on | None | tests=['T-V10-12', 'T101-4', 'T101-6'] | rung=`quarter` the six wards, the ravine quarter by V01's terraced-ward kind (CVR-V10-13; pre-decided fallback until V01 names it: the residential kind, V01's `stepped` context row applying by slope);

## M-V10-2149 V10 §3.16 3.16 Refusals with alternatives (line 2149)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-29', 'T-V9-15', 'T101-3'] | rung=The engine's refusals come from the dry run (§5.2 F-EDIT with its actions and closest options, as `MsgRef`s) and are worded by that `MsgRef` alone — V9 §4.9's `refuse.*` row for the code, one sentence per engine code on 
- [UNDEFINED] E6-rungs every rung from THORP to the METROPOLIS cap | None | tests=['T-V10-29', 'T-V9-15', 'T101-3'] | rung=The engine's refusals come from the dry run (§5.2 F-EDIT with its actions and closest options, as `MsgRef`s) and are worded by that `MsgRef` alone — V9 §4.9's `refuse.*` row for the code, one sentence per engine code on 

## M-V10-2220 V10 §3.17 3.17 The host clerk seam (line 2220)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-20', 'T-V8-27'] | rung=`builtin` with `transport { baseURL, token, expiresAt, fallbacks }` uses the proxy (B);

## M-V10-2316 V10 §3.18 3.18 The usage meter and the caps (line 2316)
- [UNDEFINED] E1-none no input / nothing to act on | None | tests=[] | rung=After every response the meter reads `usage.iterations` — the per-attempt source of truth; top-level `usage` covers only the attempt that produced the message (J-V10.53) — and adds each iteration's input, output, cache-r
- [UNDEFINED] E2-one exactly one item | None | tests=[] | rung=After every response the meter reads `usage.iterations` — the per-attempt source of truth; top-level `usage` covers only the attempt that produced the message (J-V10.53) — and adds each iteration's input, output, cache-r
- [UNTESTED] E3-cap the maximum and its caps | Before every request the harness refuses to send when the month's estimate has reached `monthlyCapUsd` (`budget`), warns in the drawer when it passes `warnShare` of the cap, and ends the turn when the turn's estimate pas | tests=[] | rung=After every response the meter reads `usage.iterations` — the per-attempt source of truth; top-level `usage` covers only the attempt that produced the message (J-V10.53) — and adds each iteration's input, output, cache-r
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=[] | rung=After every response the meter reads `usage.iterations` — the per-attempt source of truth; top-level `usage` covers only the attempt that produced the message (J-V10.53) — and adds each iteration's input, output, cache-r

## M-V10-2329 V10 §3.19 3.19 Failure handling — every failure has a bounded ladder, and nothing applies without ac (line 2329)
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=['T-V10-18'] | rung=The clerk cannot damage a map: nothing it does commits without the user's acceptance (J-V10.8), so every ladder below ends in a message and, at worst, a lost draft — never a partial change.
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=['T-V10-18'] | rung=The clerk cannot damage a map: nothing it does commits without the user's acceptance (J-V10.8), so every ladder below ends in a message and, at worst, a lost draft — never a partial change.

## M-V10-2357 V10 §3.20 3.20 Safety and privacy — what is sent, what is kept (line 2357)
- [UNTESTED] E1-none no input / nothing to act on | **Never sent:** the document's bytes, any image, coordinates, a withheld name or purpose, a concealed use, an unexcavated element below `secret`, the host's seed, its binding keys or its raw dossier, the user's other doc | tests=[] | rung=None
- [UNDEFINED] E2-one exactly one item | None | tests=[] | rung=None
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=[] | rung=None
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=[] | rung=None

## M-V10-2403 V10 §3.22 3.22 Determinism (line 2403)
- [UNDEFINED] E1-none no input / nothing to act on | None | tests=['T-V10-11', 'T-V10-3', 'T-V10-30', 'T-V10-4', 'T-V10-5', 'T-V10-8', 'T-V10-9'] | rung=None
- [UNDEFINED] E6-rungs every rung from THORP to the METROPOLIS cap | None | tests=['T-V10-11', 'T-V10-3', 'T-V10-30', 'T-V10-4', 'T-V10-5', 'T-V10-8', 'T-V10-9'] | rung=None

## M-V10-2425 V10 §4.1 4.1 The encoders — each tool's input to its events (line 2425)
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-1', 'T-V10-33', 'T-V10-4', 'T-V10-7', 'T-V9-12', 'T-V9-13', 'T101-1', 'T101-2'] | rung=T1 `intend` | creation mode | the draft's `Blueprint` (§4.2 S0), routed by `LadderRouter.route(population)` (V10 §3.7):

## M-V10-2560 V10 §4.5 4.5 Locality and scope (line 2560)
- [UNDEFINED] E2-one exactly one item | None | tests=['T-V10-25'] | rung=None

## M-V10-2569 V10 §4.6 4.6 What is not an edit (line 2569)
- [UNDEFINED] E5-data missing, empty or contradictory data (the dossier included) | None | tests=[] | rung=None
- [UNDEFINED] E7-toggles every toggle and preset (parity presets, every layer on and off) | None | tests=[] | rung=None
- [UNTESTED] E8-lifecycle save, load, undo, redo, regenerate and migrate | `clerk.content`'s rows change by `editTable` on the document's override layer or through the preference layer, `clerk.ops`' through the device's preference layer only (§7.6; a document's or host's row on it is refused, V | tests=[] | rung=None

## M-V10-2586 V10 §5.1 5.1 On the map (view state; never exported, never hashed) (line 2586)
- [UNDEFINED] E8-lifecycle save, load, undo, redo, regenerate and migrate | None | tests=[] | rung=None

## M-V10-2602 V10 §5.3 5.3 Exports (line 2602)
- [UNDEFINED] E1-none no input / nothing to act on | None | tests=[] | rung=None
- [UNDEFINED] E2-one exactly one item | None | tests=[] | rung=None
- [UNTESTED] E8-lifecycle save, load, undo, redo, regenerate and migrate | * **The defect store** — "Save as file" in the drawer's settings writes the device's `DefectRecord`s as JSON (V10 §2.8): counts and codes only, so it is offered under any key. | tests=[] | rung=None

## M-V10-2618 V10 §5.4 5.4 The drawer's text (semantics; V09 draws it) (line 2618)
- [UNDEFINED] E1-none no input / nothing to act on | None | tests=['T-V10-29', 'T-V9-15'] | rung=A proposal card shows the reason line, the AI mark, the active variation's counts, bends, fates and renames, **What else changes** (its effects: up to ten lines by kind, then "and {n} other changes", drawn as V09's fates
- [UNDEFINED] E4-degenerate degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | None | tests=['T-V10-29', 'T-V9-15'] | rung=A proposal card shows the reason line, the AI mark, the active variation's counts, bends, fates and renames, **What else changes** (its effects: up to ten lines by kind, then "and {n} other changes", drawn as V09's fates

# combinations owned by V10 (non-DEFINED)
- C-steep-clerk steep(pipeline) x clerk(V10) rungs=['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None
- C-moat-clerk moat(pipeline) x clerk(V10) rungs=['TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None
- C-square-clerk square(pipeline) x clerk(V10) rungs=['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None
- C-frame-clerk frame(kernel) x clerk(V10) rungs=['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None
- C-sewer-clerk sewer(V04) x clerk(V10) rungs=['TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None
- C-access-clerk access(V04) x clerk(V10) rungs=['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None
- C-vault-clerk vault(V04) x clerk(V10) rungs=['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None
- C-custom-clerk custom(V08) x clerk(V10) rungs=['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS'] status=UNDEFINED ev=None

# combinations involving V10 (any owner, non-DEFINED)

# named combinations
- {"id": "CN-a-settlement-that-grows-over-a-sealed-void", "combination": "a settlement that grows over a sealed void", "units": ["V06", "V04"], "owner": "V06", "status": "DEFINED (to confirm: outcome, rung, test)", "evidence": {"where": "canon reading", "quote": "V06 §3.11.6 and §3.5.2 (passages sealed by decline and reopened by regrowth); V04 §0/§3.5.7 (a house built over a void may dig down into it; a new sewer or a growing catacomb may cut through it); g item 113 (d)–(e) (sewers reopen; LOST until refound)"}}
- {"id": "CN-a-catacomb-growing-into-a-sewer", "combination": "a catacomb growing into a sewer", "units": ["V04", "pipeline"], "owner": "V04", "status": "DEFINED (to confirm: the typed opening, rung, test)", "evidence": {"where": "canon reading", "quote": "V04 §0 l.195: 'A catacomb may break into a sewer, a quarry into a cave; each meeting is a typed opening' — V04 §3.5.1's growth and U-LINK's breach link state the mechanism; II.7.6 carries the base's link kinds"}}
- {"id": "CN-a-raised-way-under-an-island-s-shade", "combination": "a raised way under an island's shade", "units": ["V05", "model", "pipeline"], "owner": "V05", "status": "DEFINED (to confirm)", "evidence": {"where": "canon reading", "quote": "V05 §1b / §3.15 (7): sky.clearance and reclearIsland read every caster an epoch commits under an island (EpochScope.raised); file f item 290: raised ways and retaining walls are casters of item 102's daylight driver; the island's groundRefCm counts the caster ceiling"}}
- {"id": "CN-a-raised-way-over-a-harbour-mouth", "combination": "a raised way over a harbour mouth", "units": ["pipeline", "model", "V04"], "owner": "pipeline", "status": "UNDEFINED", "evidence": {"where": "canon reading", "quote": "no text states whether a generated raised way may cross a harbour mouth, its chain (item 106) or a mole; the owner (the raised-way generation, §4.3 with file f items 244 and 290) states the outcome (the route solver's cost row or an exclusion), its rung and a test"}}
- {"id": "CN-a-deck-plot-on-a-bridge-over-a-moat", "combination": "a deck plot on a bridge over a moat", "units": ["pipeline", "model"], "owner": "pipeline", "status": "DEFINED (to confirm realism)", "evidence": {"where": "canon reading", "quote": "file f item 246: a Bridge of kind ford or draw, or with no deckCm, offers no deck plot — a drawbridge over a moat carries none; a fixed moat bridge with a deck offers them by the deck rows (V11 deck, deckOk); the pipeline editor confirms or narrows it for gate bridges (realism tiebreaker)"}}
- {"id": "CN-a-retaining-wall-on-a-cliff-edge", "combination": "a retaining wall on a cliff edge", "units": ["model", "pipeline"], "owner": "pipeline", "status": "UNDEFINED", "evidence": {"where": "canon reading", "quote": "no text states the outcome where S10/S11's levelling or a district edge would raise a retaining wall along a cliff line (a closure barrier of kind cliff, item 106): the pipeline editor states it (the cliff face holds the ground; no wall is raised on a cliff edge, or the wall stops at it), with its test"}}
- {"id": "CN-a-dossier-removing-what-an-edit-pinned", "combination": "a dossier removing what an edit pinned", "units": ["V08", "determinism"], "owner": "determinism", "status": "DEFINED (to confirm)", "evidence": {"where": "canon reading", "quote": "§7.7's precedence (the dossier is the sole immutable truth, items 20, 22) and its dossier contract items 1–5: a dossier event removes the institution; the user's pin on its place yields (the pin is reported as orphaned, §7.4); V08 §3.6 applies the removal"}}
- {"id": "CN-an-epoch-undone-after-a-save", "combination": "an epoch undone after a save", "units": ["V06", "determinism"], "owner": "V06", "status": "DEFINED (to confirm)", "evidence": {"where": "canon reading", "quote": "V06 §0 ('survives saving and reloading), undo while it is the latest thing that happened, or branch from') and V06 §4's undo of an epoch as one event; §7.4's epoch row"}}