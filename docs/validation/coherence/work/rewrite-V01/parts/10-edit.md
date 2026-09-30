## 4 Editing

Stage 2 adds **no event kind**: every stage-2 state is edited by §7.1's existing events, each with its dry run, fate
report, one undo step and migration (§7.1–§7.5), and every tool is one of the twelve with at most one new parameter
(§7.1's "a new capability adds a parameter to an existing tool, never a thirteenth tool"; item 272). **No wrong answers**
(item 101 R2; J-V1.50; J-VI.4): every dry run below **bends** a request to the nearest lawful one and says so in one
gentle line; it refuses only what item 20 forbids (a dossier fact) and what a lock protects (a locked or pinned entity),
and then offers `rejectSite` or "unlock first" (§7.7).

### 4.1 What is edited, by which event and tool, with its effective scope

| state | event(s) | tool (layer) | effective scope (§7.3) and what stays byte-identical | the dry run's bend (refusal only for a dossier fact or a lock) |
|---|---|---|---|---|
| a district's fabric (a layout card) | one undo group: `setAttr(D.fabric, r)`, then `regenerate({ ids: [D] }, 'keep')` | T8 `fill` with `fabric` (L3) | D from S8 with the seam exception (§7.3 item 1, item 369), plus the cross-arena consequences volumes 4 and 5 declare for a ground edit (V01 §3.9); every other district byte-identical outside it (II.4) | an infeasible template is **bent** to its fallback and the bend named ("Rings did not fit this district's shape; laid as a square instead"); a template the locks and V01 §3.5.12's fixed inputs leave no room for bends to `bent-cut`; a catacomb source in D stays (V01 §3.9) |
| a template's parameters (plaza size, void square, quay on the water, ring jitter, through radials, street width, terrace spacing) | `setAttr(D.fabricParams.k, v)` + `regenerate` (grouped) | T8's "more" (L3) | as above | a value outside the row's `range` is **clamped** to it, the bend named ("plaza size capped at twice the default") |
| `Auto` layout | `setAttr(D.fabric, 'auto')` — it clears the path's edited mark (§7.2), so S7c's rule sets the fabric again — + `regenerate` (grouped) | T8 (L3) | as above | — |
| same layout, new seed | `regenerate({ ids: [D] }, 'newRandom')` | T10 `hold` (L3), shift+click (§14's keymap) | D from S8 (its fabric kept, V01 §3.12), with V01 §3.9's cross-arena consequences | — |
| a block's content (houses, manor, square, green, yard) | `setAttr(B.content, c)` (and `setAttr(B.squareType, t)` for a square) | T9 `shape` on a block (L3) | D from S10a (iii) with recorded rerolls: S10a (i)'s placements kept (a field-driving item standing on B itself re-placed by (i)'s scoring on D's other candidate blocks), S9b not re-run (every other block keeps its content), S10a's distribution re-run for D — and for the receiving district when D cannot re-house B's households — so only blocks whose allocation changes re-derive; B's content held (declared) | B's displaced households are **re-homed** by S10a's re-homing order (§4.5 (5)): first D's other blocks with the join maximum lowered one step (denser plots, §4.7 S10 (7)), then the first district in S7b's order whose capacity holds them, named in one line ("14 households move to the Weavers' quarter"); a `manor` edit with no household of the top band in D's range **bends** to the largest residential class the band range admits ("typed a large house: no household of the rich band lives here"); a catacomb source or entrance plot on B is allowed, its closed source named (V04 §3.5.1 (8): the complex frozen — no growth, `fill` unchanged, every gallery kept; V01 §3.9); **refused** only for a locked, pinned or dossier-backed plot on B → "unlock first" / `rejectSite` offered |
| a square's function | `setAttr(B.squareType, t)` | T9 `shape` | B's S11 centrepiece re-drawn by the new row; its place renamed by §6.3 case (4), listed | `t` not sited for B (V01 §3.5.3) → bent to the nearest sited type ("not at a main junction; typed a well square") |
| a way's surface | `setAttr(W.surface, s)` | T9 `shape` on a way (L3) | display only (no geometry); the edited path held against V01 §3.7.3's rule | — |
| a local place's name, knowledge, label | `setAttr(P.name)`, `setAttr(P.knownTo)`, `moveLabel`, `hideLabel`, `delete(P)` (removes the name, never the place) | T11 `name` (L4) | the place's label; uniqueness by §9.6 | a dossier-owned name → refused as `dossier-owned`, with the display text offered (§9.1) |
| a new local place (an unnamed court, yard or square) | `setAttr(P.name)` on a new `HoodPlace` minted from the event's `seq` | T11 `name` on the unnamed face (L4) | the new place and its label | a duplicate name → bent to the next unique form (§9.6) |
| a hood pin (a close-up's well, tree, fountain …) | `instance { entity: B, ordinal: 'hood:<n>', op }` — `move`, `remove`, `restyle` (its `InstanceStyle.pinKind` may change the kind, item 421); preceded in the same group by a `closeup` event when D has no `CloseupRecord` | T9 `shape` (L3): drag, delete, restyle | the pin alone; the close-up's cache chunk re-derived (§8.10's resolution) | a move off B's faces → the nearest point on them |
| a new hood pin | `instance { entity: B, op: 'add', point, style: { pinKind } }` (user ordinal `u<n>`; with the `closeup` event when needed) | T6 `place` with a **furniture** stamp (L2; items 272, 349) | as above | a point on a footprint, an access symbol or a way corridor → the nearest clear point |
| how busy the close-up is | `closeup { district, strategy, params: { pinGate } }` | T12 `dress` (L4): a quieter / busier slider on the close-up panel | the close-up's derived pins only | `pinGate` outside [0, 2] → **clamped** to it, the bend named |
| the close-up's framing | the style's `closeup.vignette` (`setStyle`) | T12 `dress` | style only | — |
| opening any area (the outline close-up) | none — a view action (V01 §3.8.9) | the view's open gesture (rectangle, lasso, a named site; volume 9 lays it out) | nothing in the model | a degenerate outline opens nothing, named in one line |
| the stage-2 switch (`hood.constants` · `fabric.extensionWeight`; V01 §3.15) | `editTable` on `hood.constants`, or `editPreset` on the active preset's entry (§7.6) | the tables editor or the presets dialog (§7.4's row) | a Re-derive from S2 with carry-over (V01 §3.15, *The switch's edit*; V01 §4.3): what the stages before S2 commit byte-identical; the held inputs kept (§7.2) | a value outside [0, 1] → **clamped** to it (the column's range, V01 §3.14), the bend named |
| a standalone neighbourhood document | `generate` with `Recipe.product = 'hood'` and `Recipe.hood`; later `adjust` of the recipe (Re-derive from S0) | T1 `intend` with `product: 'hood'` (L0; item 272) | the whole document (it is small: V01 §6) with carry-over of edited entities (§6.3) | an outline below one block's area → **scaled up** about its centroid, the bend named (V01 §3.10.1 step 4) |
| a standalone neighbourhood document's outline | `adjust(hood.outline, polygon)` from the outline's handles (points in, shape out, §7.1) | T1 / T2 handles | Re-derive from S0, edited entities carried | not simple → F-OUTLINE's repair shown |
| a standalone neighbourhood document's hillside | `adjust(hood.edges.slope, { bearingCdeg, pct })` (Re-derive from S0) | T1's hillside edge, dragged downhill (L0) | the whole document, edited entities carried | the Terraces card with no slope → the default hillside, named ("laid on a hillside falling south …", V01 §3.10.1); `pct` outside [0, `hood.hillsideMaxPct`] clamped, named |
| a ward's terracing | one undo group: `setAttr(D.terrace, v)` with v `'on'`, `'off'` or absent, then `regenerate({ ids: [D] }, 'keep')` | T8 `fill`'s "more" chip *Terraces: auto / on / off* (L3) | D from S8 with the seam exception, its walls re-raised by its own S10 (item 302); every other district byte-identical, a neighbour's wall profiles recomputed (V01 §3.11 (7)) | *on* where `walls` is false **bends**: the contour streets laid, no wall, one line ("the slope here is too gentle for retaining walls; terrace streets laid") |
| a raised way crossing D (remove a generated one; add one) | the base's edit (item 110 (b): a removal's suppression, item 260; T4 `road` with `raised`, the aqueduct class) | from the neighbourhood panel, routed to the base's tool (T4, L1; volume 9 lays it out) | every district whose part-0 ways, strips or plots change — the crossed and the detour's — each from S8 (V01 §3.17.5); everything else byte-identical | an added part removes the plots under its strip by least disruption and re-homes their households, named in one line (V01 §3.17.4) |
| a retaining wall (draw one; move or delete a declared one) | the base's events (item 110 (a)) | T3 `wall` in its `retaining` kind; a T2 terrace stroke's edge (L1–L2) | the base edit's own scope; for this volume, the chunk of the district holding the wall goes stale (V01 §3.8.3), and in every later re-derivation of it the wall is a fixed input (V01 §3.17.2) | a drawn wall meeting a shared chain is snapped off it to its drawn side (V01 §3.11 (7)) |

Everything else inside a close-up is a base entity edited as one (II.4), with no `closeup` event: lanes and their names
(`setAttr`, `moveLabel`), plots (`split`, `join`, `setAttr`), buildings (`setAttr`, `setEntrance`, …), locks,
assignments, the square's centrepiece pin (a model `Pin`: `setAttr`, `delete`, `instance`), greens (`drawGreen`, the tree
brush). **Demolishing fates over a stagnant catacomb** — from a replace close-up or a content edit — list the
`blockLifted` notice (V01 §3.9); a refine close-up never emits one. An edit whose target a dossier change removed (a pin
on a place the dossier took away) is reported orphaned by §7.4's rule; an edit on a locked target is refused with
"unlock first".

### 4.2 The tool parameters (items 272, 349, 350)

* **T1 `intend`** gains `product: 'town' | 'hood'`. With `hood` its card asks for a shape (the outline templates as
  thumbnails, "by the layout" — the default, V01 §3.10.1 — or "draw"), a size (the chips **small / medium / large**,
  about 85, 700 and 1 050 houses; or a house count; or hectares), what kind of place (the `hood.kinds` cards, all
  district kinds, plus "great houses" and "slum", which are wealth presets, V01 §3.10.1), `leafy` and `secular`, a layout
  card (Auto and the eleven rows) and the wealth and density sliders; an optional water (sea, canal or river), wall or
  **hillside** edge by dragging a side (the hillside's fall, default `hood.hillsidePct`, V01 §2.6; the Terraces card sets
  one when none is given, V01 §3.10.1). It shows no layer toggles (V01 §3.10.1 (7)). It emits `generate` with
  `Recipe.hood` (V01 §2.6).
* **T8 `fill`** gains `fabric: FabricStrategyId | 'auto'` on a district scope, with the row's `params` behind "more"
  (`streetWidthM`, `plazaScale`, `squareVoid`, `quayOnEdge`, `ringJitter`, `ringRadials`, `terraceSpacingM`) and the chip
  *Terraces: auto / on / off* (`setAttr(D.terrace)`, V01 §4.1). It emits one undo group of `setAttr(fabric |
  fabricParams.* | terrace)` and `regenerate` (§7.1's binding, item 349). Its three variations (§7.3 item 10) are the
  district's next three distinct rerolls under the chosen fabric.
* **T6 `place`** gains the **furniture** stamp: the hood-pin kinds of `hood.pins` (well, pump, trough, fountain, large
  tree, statue, monument, bandstand, cross, shrine), dropped on a spot inside an opened close-up; it emits `instance`.
* **T11 `name`** on an unnamed court, yard or square creates its place (V01 §4.1).
* **T12 `dress`** gains the close-up's `pinGate` slider and the vignette choice; its layer toggles (`setLayer`) hide the
  hood pins with the `pins` layer and the block trees with the `trees` layer (V01 §5.1.3).
The canvas, the clerk's tool API and the skeleton file expose these parameters identically (§7.1's three surfaces); a
skeleton's `quarter` carries `fabric` (item 349) and `terrace` (item 350), and a skeleton export writes both back
(V01 §5.3).

### 4.3 Locality, stated as the oracle checks it

* **Opening, closing, re-opening** a district or an outline: no event; the model digest unchanged; the close-up chunks
  and the display deltas are the only products (T-V1-15).
* **A fabric change or New random on D**: every entity outside D's effective scope byte-identical (§7.3's oracle, II.4's
  seam exception with the bounding ways' attributes) — the scope including the cross-arena consequences volumes 4 and 5
  declare for a ground edit (V04 §4.3's ground-edit row, V05 §4.3's island re-read; V01 §3.9), which the oracle predicts
  from those rows; inside, locked, pinned, assigned, dossier-backed entities and V01 §3.5.12's fixed inputs kept (§7.2);
  everything else re-derived with carry-over (§6.3) and its fates listed.
* **A block's content**: D's blocks whose S10a allocation is unchanged are byte-identical (S10–S12b are pure functions of
  the allocation and the blocks' own streams, §4.7); the blocks that receive B's households — in D, or in the receiving
  district when D cannot house them — re-derive from S10 with their recorded rerolls, with the cross-arena consequences of
  those re-cut plots (V04 §4.3, V05 §4.3); nothing else moves.
* **A hood pin**: the block's `overrides` row and the chunk; nothing else.
* **A place or surface edit**: the attribute and its label or marks; no geometry.
* **A terracing change on D**: as a fabric change — D from S8, its walls re-raised by its own S10; a neighbour's walls
  byte-identical, their derived profiles recomputed on read (V01 §3.11 (7)).
* **A raised way's removal or addition** (the base's edit): the districts whose part-0 ways, strips or plots change, each
  from S8 (V01 §3.17.5); every other district byte-identical.
* **A declared retaining wall**: for this volume, the chunk of the district holding it goes stale (V01 §3.8.3); the wall
  is a fixed input of that district's later re-derivations (V01 §3.17.2).
* **The stage-2 switch's edit** (V01 §3.15): what the stages before S2 commit byte-identical; from S2 on, every entity
  re-derived with §6.3's carry-over and its fates listed — the held inputs (§7.2; V01 §3.5.12) kept, the template seeds,
  typed blocks, places and pins stage 2 no longer makes retired, the underground re-derived by its tail with the opening
  pass under the new gate (V04 §4.3's switch row, §3.10), never held byte-identical.
* **A toggle or preset change**: a parity preset reaches stage 2 only through the stage-2 switch and the rows'
  `extension` markers (V01 §3.15, T-V1-4); a layer toggled on or off (the islands, the underground) is its own volume's
  recipe change and re-derivation (V05 §4.2, V04 §4.3), and stage 2, a function of the records that exist, reads that
  layer's records at the re-derivations that change makes and at no other time.

### 4.4 Undo and lifecycle rows (§7.4, item 373)

| event on stage-2 state | persisted where | regeneration | undo | migration |
|---|---|---|---|---|
| `setAttr(D.fabric)` / `setAttr(D.fabricParams.k)` | log; the district's leaf | S7c keeps an edited path; D re-derives from S8 in the grouped `regenerate` | the group's undo: the attribute's former value and D's undo record (its successions reversed, §7.4) | an unknown row id → `bent-cut`, reported (§7.5) |
| `setAttr(B.content)` / `setAttr(B.squareType)` | log; the block's leaf | S9b keeps an edited path; a re-derivation of D from S8 that succeeds B carries the edit to B's successor by the anchor rule, else it is orphaned and reported | undo record: the former content and D's S10a distribution (and the receiving district's, when households moved) | absent → `ordinary`; `market` → `trading` |
| `instance` on a hood pin | log; `Block.overrides` | resolved at each derivation by §8.10's law | inverse (the row removed or restored) | a row whose kind a new table version drops → orphaned, reported |
| `closeup` | log; `CloseupRecord` in `closeups` | kept across D's re-derivations; carried to the anchor successor of a merge or split | restores the former record; the first `closeup` of D is undoable only when no `instance` event on D's blocks with a `seq` above its `since` is live (§7.4's independence check) | `tableVersion` kept within §6.4's window, then migrated with a report |
| `setAttr` / `delete` on a `HoodPlace`; a place created by T11 | log; the place's leaf and naming record | a succeeded place keeps its edited name; a deleted name stays deleted (its tombstone keeps the address); a created place stays while its host face exists | undo record (a created place's undo removes it) | §7.5 |
| `setAttr(W.surface)` | log; the way's leaf | V01 §3.7.3 keeps an edited path | undo record | — |
| `generate` / `adjust` of `Recipe.hood` | the recipe | Re-derive from S0 | the recipe's former value | `Recipe.product` absent → `town`; a class-named kind migrated (V01 §2.7) |
| a `quarter` with `fabric` or `terrace` (skeleton or canvas; items 349, 350) | log (the sugar's expansion) | S7c and `terraceState` keep the declared paths | the expansion's undo | an absent `fabric` → S7c's; an absent `terrace` → derived |
| `setAttr(D.terrace)` | log; the district's leaf | `terraceState` reads it; S7c's weight, the base's district-edge source and the elevated-road generator follow it | the group's undo: the former value and D's undo record | absent → derived |
| `editTable` / `editPreset` on the stage-2 switch (V01 §3.15) | log: the row operation and the confirmed fates (§7.4's row, §7.1) | Re-derive from S2 with carry-over; the underground tail after the ground | the document as it stood (§7.4's `editTable` / `editPreset` undo; the fates reversed) | §7.6's table-row migration |

Redo re-applies each row's event from the log; a replay after a load reproduces it byte-identically (T-V1-34).

### 4.5 The clerk's view and the "why" providers (item 101; volume 10 builds the clerk)

The clerk and the application's "why?" panel read stage 2 through `query` and the oracle under the viewer's key (§9.2,
§11.2). `@plat/hood` registers these **why providers** (V10 §2.13; §2.8's explainer registry, item 270), one provider per
kind or path; each recomputes its answer as a pure function of committed state — never from a stored report, so the
answer is the same before and after a save, a load or an unrelated edit (T-V1-37). The pulls they return name V11's
families (`WhyPull.family`, V10 §2.13).
* **`district.fabric`** (and the section `fabric`) — "declared by the user" for an edited path; otherwise χ̃ over the
  committed allocation, the eligible rows with their weights (the shade and chain terms among them) and the keyed
  uniform. A committed fabric on the recomputed pick's fallback chain is reported as that pick bent to it (F-TEMPLATE's
  substitution writes the row built to `D.fabric`, V01 §3.13); a recomputed pick that differs otherwise sets volume 10's
  `evaluated.drifted` with its cause (the reconcile moved households after the draw, or the allocation changed since):
  the fabric stands, as survivors do.
* **`block.content`, `block.squareType`** — D's quotas, the candidate's siting rule, its score terms (prestige, spacing,
  and the sun factor and the siting pushes as `WhyPull`s of V11's families `sun` and `nuisance`), the keyed pick, or
  "declared"; a fixed input names why it stayed ordinary (a SIZE compound, a catacomb's churchyard).
* **`HoodPlace` names** — the grammar feature that fired (a trade, a landmark, a destination, the centrepiece, an
  opening's kind), recomputed from the place's naming record.
* **hood pins** — the site, the gate's terms (band, identity, shade as a `sun` pull, `pinGate`, the court factor), the
  prior picks and the decay; an override's state (`byOrdinal`, `rematched`, `orphaned`).
* **ladder records** — volume 10's `members` answer for a QUARTER, GUILD, COUNT or SIZE record: the step type, the range,
  the count and the member ids, each counted once (item 108 (c)).
* **an unwalled side** — volume 10's `closure` answer for a barrier run ("the cliff is the wall here", item 106 (g)).
* **openings and voids** — an opening's cause (its `AccessPoint`), and "the ruins under the old quarter" through
  `districtsAbove` (V01 §3.16); an unexcavated void is named only to a key that admits it.
* **`district.terrace`** — the state and its source (V01 §3.17.1): "the ground here falls 18 % and the relief is hilly:
  the quarter is terraced", "declared by the user", or "too gentle for retaining walls: terrace streets only".
* **`RetainingWall`** (every wall, one provider for the kind) — its producer and reading: a generated wall's levelled
  block, plot or ward (the base's S10–S11 levelling, or the district-edge source for a ward-edge wall, item 302), its
  slope against `terrace.slopeMin` and its step against `terrace.stepMinCm` from the derived step (`stepProfile`): "the
  quarter stands 3 m above the fields here"; a declared wall, "drawn by the user" (its `drawWall` or `terrace` event);
  each way that crosses it, "by a stair" or "by a ramp", with the way-class rule by slope.
* **`district.raised`** (an empty under-deck strip or a pier hole in D) — the raised way and its recorded reason (item
  110 (f); `DistrictContext.raised`): "under the arches of the Old Aqueduct, which carries water from the hill springs".
A subject no provider here covers (a deck plot, a raised way itself) takes volume 10's provider for its kind (V10 §3.9).

**The close-up panel's reader query** — `query({ kind: 'hood', id: D })` returns the district's name, identity (with a
QUARTER record's label), fabric, population, the ladder records with members in D (members here; members elsewhere with
their districts), the chains in its context, the voids under it the key admits, its shade share, its terrace state
(`DistrictContext.terrace`), the raised ways crossing it (`DistrictContext.raised`: the way, its kind and its recorded
reason), and the bends of its last re-derivation; volume 9 lays the panel out. The panel offers, beside the layout
cards, **remove** on a generated raised way (routed to the base's removal with its dry run, V01 §3.17.5), T4's `raised`
add, and the *Terraces: auto / on / off* chip (V01 §4.1).

Its **proposals** are previews of T8 (a fabric on a district, with the three variations), T9 (a block's content) and T6's
furniture stamp, shown as ghosts with a one-line reason (§14's clerk contract). Its **critiques** of a skeleton add, for
stage 2: a declared fabric whose requirement fails on the declared quarter (a ring on a narrow strip: "bends to a
square"), a district whose squares fall short of its quota with no sited block, and a quarter whose identity has no
anchor (§14's existing critique). It sees a court's or a yard's name only when its viewer's key admits `local` at the band
it asks for (§9.2).

### 4.6 Hosts and shared documents

A host sends these events through the bridge like any (§11.3); a dossier naming claim may name a `HoodPlace` (§7.7 item
82), which makes that name dossier-owned. Stage 2 changes nothing in the bridge protocol.

