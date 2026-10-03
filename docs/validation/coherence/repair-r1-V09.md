# Repair round 1 — V09 (the application) — lane coherence/repair-V09-r1

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V09-r1; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first "=== " line is
# ignored. Unit V09: docs/volumes/V09-application.md as assemble-r0 left it (635 793 bytes, 4 439 lines). Each REPLACE body
# is the live subsection with count-asserted substitutions (109, scratch rV09/subs1-5.py) and canon ID-TOOL's tool word
# at each first use of T1–T12 in a paragraph or table row (350 insertions; the scan reads 0 bare first uses); every other
# line is verbatim. Checked on a copy: the 56 blocks apply with 0 skipped and give the target text byte for byte; headings
# 110 → 110, fences balanced; refs.py over the set: V09 0 broken (ambiguous-form 9 → 7, VV910-19); doc_checks S1 0;
# C3/S2 hits only the volume-qualified pointers and plain-English 3-grams of the new rows (corpus INCOMPLETE here: the
# clean-room result is NOT authoritative). Words 103 572 → 107 149 (new rows, tests and the tool words; no restatement).
#
# PROGRESS: done — 40 of 40 issues fixed in text (2 blocker, 21 major, 17 minor); 0 ruling requests.
#
# Where each issue is fixed: VAH-09 §4.9 refuse.locked/.warp/.water · VAH-12 §4.9 lead, refuse.table.* rows, §7 T-V9-15 ·
# VAH-16, VAT-12 §4.3 T10 row, §9 J-V9.101 · VAH-17 §4.3 delete row · VAH-19, VV34-08 §2.9, §4.9 family table · VAH-21,
# VV910-19 §4.9 host.* paragraph, §3.16 (a) · VAH-22 §2.6 · VAH-24, VAT-05 §2.9 · VAL-21 §8.1, §10.2 XV-V9-8 · VAP-05 §7
# lead, T-V9-5/-6/-13, new T-V9-81 (T101-7) and T-V9-82 (T101-4), §8.1 AP3 exit · VAP-06 §8.1, T-V9-16/-41/-53, J-V9.103 ·
# VAP-24 T-V9-57 · VAT-01 §1b, §4.3, §4.5, §4.21.1, T-V9-71 · VAT-16 §3.9, §4.3, §4.9 refuse.dossierClock, §5.6 · VAT-18
# §3.9, §3.16 row 81, §4.9 info.past.viewing, §5.6 · VAT-22 §4.3, §4.5 mappers, T-V9-44 · VAT-24 §3.14, §4.9, §4.11,
# T-V9-64 · VAT-25 §4.3, §4.5 T8 · VEL0-02 §2.11, §3.8, §3.16 row 16, T-V9-17, J-V9.137 · VK0-17 §3.16 · VM-R0S-25 §4.14,
# §4.9 info.recipe.preset · VPC-08 §1.3, §1b ×2, §4.21.5 · VV34-05 bend.crypt.cathedral · VV56-24, VV910-08 six
# bend.island.* rows · VV910-03 §1.2, §1b, §2.11, §5.12 · VV910-06 §1b, §4.21.9 (3) · VV910-10 §1b, §3.9, §4.9,
# §4.21.9 (1), T-V9-79 · VV910-11 §2.9, §4.9, §4.21.9 (2), T-V9-79 · VV910-12 §3.16, §4.9 edge.nothingToApply.<form> ·
# VV910-13 §4.21.9, §4.9, T-V9-79, J-V9.131 · VV910-14 §3.16 row 22 · VV910-15 §4.9 lead, T-V9-15 · VV910-16 §1.1 ·
# VV910-18 the six places and §4.21.3's · VV910-20 the ID-TOOL pass, whole volume.
#
# Notes for the adjudicator and the seams:
# - E-07's keys. The table-edit refusals take the keys the concurrent determinism repair writes into §7.1's outcome table
#   (VAH-11): refuse.table.rung, .ownerRule, .invalid (a dangling ref or a type error), and .knowledge. That table also
#   names bend.frame.held, bend.room.unreachable, bend.warp.halved, refuse.bug, refuse.capacity.household, refuse.host.cap,
#   refuse.style.order, refuse.upgrade.packCap and refuse.works.access; each now has its row here, so VAH-12's "every key
#   §7.1's outcome table names has its row" holds once both land. bend.invalid's codes cell names §7.1's value-range row
#   (a bend, never a ConflictAction).
# - VV910-15's gate list predates VAH-11 and VDC0-36, which make refuse.viewer, refuse.islandsRung and refuse.stale outcome
#   rows of §7.1. The lead therefore lists as gates only the rows outside that table: exportTier, dossierClock, phone,
#   layer, restore.dossier and refuse.clerk.*.
# - VAH-16 asks for the trees' re-roll "scoped to the wood". §7.1's rerollLayer takes `ids` for `naming` only, so the
#   woods' trees re-roll town-wide through T12's New trees, VAT-12's form and J-V9.101's.
# - VV910-12. Each empty form gets its own key, edge.nothingToApply.<form> (nine keys, one per case of §7.1's list), instead
#   of a single key with an engine-written {reason}, so every reason has catalogue words. PreviewResult.empty (VRC0S-29)
#   carries the key.
# - VAT-25. The chip is V01 §4.1's "Terraces: auto / on / off" (auto is the absent value) with V01's grouped regenerate.
#   V01 is the home of the chip, so its three values stand rather than the issue's two.
# - Held VV56-07. The advance and history-replay waits cite "item 119's comfort level as V06's part of the item applies
#   it". Nothing here chooses between per-epoch and whole-run.
# - Other units' parts that these issues name are not written here: §16's carried row and staged-screens line follow AP5's
#   move (VAP-06; scope, VCS-08); V10 §5.4's card list reads Ask again (VAT-24; V10); V12 §2.13's item110.* suites gain
#   V09's canvas scripts (VAP-24; V12); §13.2's take-over row's range T-V9-1 – T-V9-70 now runs to T-V9-82 (scope); V06
#   §2.2 and §6.5 cite V09 §5.12 for the history store's defaults (VV910-03 with VV56-02; V06). V11 §4.2 does not state
#   that an absent family multiplies by 1, so V09 §2.6 keeps that fact as its chip's Normal reading (VAH-22).

=== FILE docs/volumes/V09-application.md ===

=== REPLACE ### 1.1 What this volume builds ===
### 1.1 What this volume builds

`@plat/app` at build depth: the standalone editor (entry `index.html`) and the **shell** that both it and the host mode
of V08 (entry `embed.html`, file f item 507) run on. The shell is one program with one set of screens; a host mode is a
`ShellMode` (V09 §2.2) that removes or locks what V08 §5.1 names, and adds nothing this volume does not declare as an
extension slot. Concretely, this volume settles:

1. **The screens** — the empty state and the new-town flow (V09 §5.2); the editor frame (top bar, tool rail, map region
   with its overlays, context panel, view bar, drawers; V09 §5.1); the panels (selection and its tabs, tool options, the
   report, history with restore points, the gazetteer and "features in view", the advanced panel and the tables editor,
   style and dress, names); the sheets and dialogs (confirm the fates, export in five families, share, settings, open and
   recent towns, the keymap overlay, about); the clerk drawer; the overlays (ghost, handles, count badge, snap
   highlight, the variations tray, the bend line, the refusal card, first-use hints, toasts); the thematic views the owner's
   file-g rules ask the interface for (the shade map, the supply links, the siting "Why here?" card).
2. **The flows** — boot and open; the first map; the declaration pipeline (gesture → draft → preview → ghost → commit or
   cancel) with its latency budget; confirmation of fates and renames; variations and New random on a scope; undo, redo,
   restore points and "open a copy from here"; autosave with crash recovery; export; share; settings; accepting or
   refusing a clerk's proposal.
3. **The input model** — pointer, pen, touch and keyboard, one gesture grammar across them; the responsive classes and
   what a phone may do (V09 §4.12, J-V9.9); accessibility beyond §14's contract.
4. **The tool binding's screens** — §7.1's binding table (one home tool per event kind and target class or path, E-04)
   is the base's; this volume gives every row its gestures, its context-panel control and its screen (V09 §4.3), with a
   completeness test (T-V9-12).
5. **The words** — the message catalogue: every refusal, bend, conflict, fate, error and hint in plain words (V09 §4.9,
   V09 §2.9).
6. **The acceptance machinery** — the first-five-minutes protocol in operational detail, the owner's UX sitting on
   §13.6's protocol shape, the game-master trial before the public release (item 112 (b)), and the known-city fixtures
   authored through the canvas by a gesture script (V09 §7).
7. **File g's interface parts** — the shade map view (item 102 (f)); the siting explanations (items 103 (e), 104 (a)); the
   link view and link edits (item 105 (j)); the wall tool's snapping to natural barriers and its barrier-arc ghost (item
   106 (g)); a collective record's member list (item 108 (a)–(b)); a chain named as a working quarter only past item 72's
   threshold (item 104 (h) (3) as revised by item 107 (e)). The base mechanisms of those items are file g's; this volume
   designs only their screens and gestures. The declarations the edits store are volume 11's document-only tables
   (V11 §4.2), which the screens write by `editTable` (V09 §2.6), and every answer a panel shows is volume 10's
   `WhyAnswer` (V10 §2.13), projected for the card (V09 §2.7).
8. **Item 109's screens** — the game master's view of sealed and lost caverns and ruins (V09 §4.17.1); the system chip that
   draws a gallery or chamber into a named system and starts a new ruin, cavern or catacomb (V09 §4.17.2); how each way down
   came about and the path in (V09 §4.17.3); dwellings only after a way in (V09 §4.17.4); the catacomb, crypt and cemetery
   panels, with their bends (V09 §4.17.5); the dossier facts they show (V09 §1b).
9. **The other volumes' screens** — volume 10's drawer view model, the own-key card where a configuration enables the
   built-in clerk (V09 §4.11; J121), data notice, usage meter, settings, creation preview,
   import critique and transcript export (V09 §4.11, V09 §3.12, V09 §5.10, V09 §5.12); volume 6's "Re-run from here",
   chronicle and use-history tables, animated history and history import (V09 §3.9, V09 §3.12, V09 §5.10); volume 2's
   massing handles and family strip (V09 §3.5); volume 5's shade strips and "Update shade now" (V09 §5.4); volume 7's
   whole-circuit view (V09 §5.4); volume 1's coverage and voids views (V09 §5.4); and the base's view keys, people search,
   family tree, clock, notes, pins and ruler that no other volume places (V09 §4.18, V09 §4.19).
10. **Item 110's tools** (V09 §4.20; J-V9.58) — T3 `wall`'s **Retaining wall** mode and T2 `ground`'s **Terrace** mode (V09 §4.20.1); T4 `road`'s
   **Raised** toggle and **Aqueduct** chip (V09 §4.20.2); removing a generated raised way, and building it again
   (V09 §4.20.3); T6 `place` on deck faces and at a mole's landmark slots (V09 §4.20.4); T9 `shape`'s tier controls (V09 §4.20.5); the panels,
   handles, span and crossing controls and why lines of the new records (V09 §4.20.6); what else a change does, in words,
   on every preview (V09 §4.20.7; file f item 465); reaching what lies under a raised deck (V09 §4.20.8; file f item 466);
   item 110 on the Sky layer (V09 §4.20.9); the item-110 exports (V09 §5.10; file f item 447); an author's removals in the
   skeleton (V09 §3.12; file f item 455); and the second known-city fixture through the canvas (V09 §7.2). The events
   these tools send are file f item 362's.
11. **Items 111–119 on screen** (V09 §4.21) — T2's spring flag for an oasis (item 111); the colour-vision setting and the
   second cue of every thematic view of this volume (item 112 (a)) and the game-master trial's running (item 112 (b),
   V09 §7.6); the history option in T1 `intend`'s sheet and a lost void's panel line (item 113); the wall repair's material and the
   wall states in the legend (item 114); a hand edit beyond the grandeur ceiling, honoured and explained (item 115); the
   view controls' stop at the zoom-out limit (item 116); the season control and its follow switch (item 117); the festival
   list and its switch (item 118); the progress view of a one-time wait (item 119).
12. **The edges** — every mechanism of this volume at its limits, with its outcome, failure rung and test (V09 §3.16).
=== END ===

=== REPLACE ### 1.2 The base hooks consumed, by section ===
### 1.2 The base hooks consumed, by section

| base section | what this volume reads or plugs into |
|---|---|
| §1.2 | the one-click default request — the empty state's town (V09 §5.2) |
| §2.8 | the entity registry's per-type edit kinds, undo paths and lifecycle rows — generate the context panel's controls (V09 §4.4); `factTier` — the tier chips on every panel row; `Provenance.symbolic` (item 113 (f)) — the symbolic chip |
| §2.9 | the document (`view`, `derived`, `undo` sections), the view keys and their writers, the stored authoring `session`; the `.plat` writer the autosave uses |
| §4.1, §7.7 | the skeleton file as a creation prefix; the forms catalogue and `Intent` behind T1 `intend`'s cards; §4.2 S0's history option (item 113) |
| §5.2, §5.4 | F-EDIT and its `ConflictAction`s — the refusal card; the generation report — the report panel |
| §6.1, §6.4 | the `intent.surprise` stream (Surprise me), Enter's successor seed; permalinks, their refusal reasons, the output-version and preview notices |
| §7.1–§7.4 | every event kind, the named actions, the dry run and its outcome table, the toolkit (twelve tools, the binding table, sugar, points forms), declared means held, fates, variations, undo and redo with sessions, independence and truncation |
| §7.5, §7.6, §7.8 | the upgrade diff; the override layer, preferences folded at creation, the tables editor and presets dialog; the control registry, the ≤ 12-control basic panel, proxy thumbnails, layer and light controls |
| §8.2, §8.4, §8.5, §8.8, §8.9 | live layers (`live.ghost`, `live.selection`, `live.stale`) and thematic rows, the second cues and the checked variants (item 112); the light keys; the LOD bands and the first map; the tile pyramid and its per-map zoom-out limit (item 116); the worker boundary and its snap, coverage and furniture queries |
| §9.1, §9.2, §9.4, §9.5 | labels, `displayText`, region groups; the knowledge admission function (E-17); the leader-line switch; furniture, the legend, the ruler, the authoring surfaces (handles, feature snap, count badge), the underlay, framing |
| §10.3 | the people query (gazetteer), the family-tree view (module tier) |
| §11.1–§11.3, §11.5 | the export formats and their knowledge rule; `PlatApi` (`generate`, `open`, `edit`, `preview`, `confirm`, `cancel`, `undo`, `redo`, `query` with `why`, `view`, `setView`, `export`, `report`, `subscribe`); roles and view keys over a bridge; `DocResolver` |
| §12, §12.5, §12.6 | the ten-second comfort level of a one-time wait, §12's laws staying the targets, and its progress rule (item 119); first-map and frame budgets; edit, preview and warp budgets — the latency budget of V09 §6 is built from them |
| §13.2, §13.4, §13.6 | the bars of items 101 and 110–119; the app harness, scripted tasks, accessibility, input scheme, the first-five-minutes test; the protocol shape reused by the owner's UX sitting |
| §14 | `@plat/app`, the interaction contract R1–R19, the per-tool interactions, the input scheme, accessibility, context help, the family-tree view |
| §16 | the milestones the application's steps slot into (V09 §8); the release gate (item 112 (b)) |
| §17.1, §17.2 | the clean room (our own UI words and colours); the bundled fonts |
| item 110's homes (file f items 244–246, 362–364, 447, 455, 465, 466) | §2.7's `RetainingWall`, the raised ways' parts, supports and spans with their use, the deck plots; §3.4's ground arena parts from 1; §4.3 and §4.6's raised-way course solver, stairs and ramps; §4.7 S10–S11's levelling and deck plots; §4.8's moles, piers and quays; §5.3's revised deck invariant; §7.1's events and edit targets; §7.3's S7 row; §8's drawing and shadows of raised parts and retaining walls; §11.1's formats and skeleton; §11.2's preview effects and hit stack |

**Volumes read** (each cited where it is used): V01's parameters on T1 `intend`, T6 `place`, T8 `fill` and T12 `dress` and its close-up panel (V01 §4.2,
V01 §4.5); V02's `setMassing` and `setComposition` under T9 `shape`, the canvas-handle contract, the stack and deck records and
their bends (V02 §1b, V02 §2.6, V02 §4.1, V02 §4.5, V02 §4.6); V03's storey switcher, plan panel, plan tools and crypt
(V03 §3.7.4, V03 §4.1, V03 §4.2, V03 §4.5); V04's underground tool mapping, depth band, ruins, the access pass and its
causes, the excavation reading with its lost state, catacombs and the unexcavated style (V04 §1b, V04 §2.2, V04 §3.5.1,
V04 §3.5.4, V04 §3.5.7, V04 §4.1–V04 §4.4, V04 §5.1–V04 §5.5); V05's sky tool mapping, the `key` parameter, the shade strips
and "Update shade now" (V05 §3.22, V05 §4.1, V05 §4.2, V05 §5.1); V06's history store and frame cache (reading this volume's device settings, V09 §5.12), time card, timeline bar,
chronicle, `forkAt`, `rerunFrom`, the reason key, the raised-way ledger and the suppression (V06 §2.2, V06 §2.13, V06 §4.1,
V06 §4.4, V06 §5.1–V06 §5.3); V07's village rungs, `declareEnd` and walk-mode roads (V07 §4.2); V08's host mode, host
clerk seam and embed entry (V08 §3.1, V08 §4.4, V08 §5.1) and V08 §2.6b's aqueduct and elevated-road rows; V10's
settings, sessions, proposals, the drawer's view model and the oracle's typed answer (V10 §2.2–V10 §2.13, V10 §3.1,
V10 §3.11, V10 §3.17–V10 §3.21, V10 §4.2–V10 §4.4, V10 §5.1–V10 §5.4); V11's siting profile, families and their `says`,
the document-only tables and their lifecycle, and the `raisedWays`, `terrace` and `deck` rows (V11 §2.3–V11 §2.4,
V11 §3.3.1, V11 §3.24, V11 §4.1–V11 §4.5); V12's evidence file and register (V12 §2.6, V12 §3.11). Where this volume needed
something of a sibling it asked in V09 §10.2, whose every row is closed at its destination.
=== END ===

=== REPLACE ### 1.3 Out of scope, and who owns it ===
### 1.3 Out of scope, and who owns it

* **The clerk's reasoning** — its model, prompts, tool definitions, cost and evaluation — is volume 10's. This volume owns
  the drawer, the AI label and opt-in, the proposal cards, accept / try again / undo-the-clerk's-change, and the rendering
  of every `why` answer (V09 §4.11, V09 §5.8). Inside SettlementForge the assistant, its AI setup and its model tier follow
  SettlementForge (J121, J122; SCOPE-C07): SettlementForge's assistant drives the map's tool API through the host seam.
* **Host mode's differences** — no file operations (V09 §2.2's `fileMenu: false`), the dossier-owned values locked, the
  Map tab's host actions in the frame's header and the frame's own strips — are V08 §5.1, V08 §4.2 and V08 §4.6.
  SettlementForge mounts no viewer frame (V08 §3.1, V08 §3.14), so a viewer's filtered history is a generic host's only
  (§11.3). This volume supplies the shell those differences switch (V09 §2.2).
* **The timeline bar, the chronicle, the time card, fork and re-run** are V06 §5.1, V06 §4.1 and V06 §4.4; this volume gives
  them their place in the frame and joins the chronicle to the history panel as a second tab (V09 §5.6).
* **The plan panel's and storey switcher's contents** are V03 §4.5; **the close-up panel's contents** are V01 §4.2 and
  V01 §4.5; this volume lays both out.
* **The rows a panel shows** — class names, district kinds, goods, siting families — are volume 11's content; the UI reads
  each row's display label and icon cells (file f item 516).
* **Drawing the map** is §8's; the application composes the tiles the tile worker delivers and draws only screen-space
  overlays (handles, badges, the snap highlight, the bend line) on the main thread (§9.5).
* **The D-5 map sittings** against the references are §13.6's and volume 12's; this volume reuses only the protocol's
  shape for a sitting on the editor itself (V09 §7.4).
* **Hosting and accounts** follow SettlementForge (J121); simultaneous editing of one map by two people is not offered
  (J122). The standalone editor has no hosted service and no account (§11.5); several people share a town only inside a
  host (§11.3, V08).
* **Item 110's records and rules** — `RetainingWall`, the raised ways' parts, supports, spans and their use, the course
  solver, the arch vaults, the deck plots and their budget, the stepped stacks, the reason keys and the suppression a
  removal of generated content records — are the base's (file f items 244–246, 260, 362–364) and volumes 2, 4, 6 and 11's
  (V02 §2.6, V02 §4.6, V04 §3.5.4, V06 §2.13, V11 §3.24). V08 binds none of it (V08 §2.6b). This volume designs their tools,
  words and screens (V09 §4.20). The time card's count of raised ways built is V06's (V06 §4.1); this volume hosts the card.
* **The underground's records and rules** — ruins, caverns, the access pass and its causes, the excavation reading with its
  lost state, catacombs, their growth, ratchet and stagnation, and every bend they compute — are V04's (V04 §3.5,
  V04 §3.5.7); a church's crypt, its rank cap and its wet-ground rule are V03's (V03 §3.7.4) and the cathedral's crypt
  basement V02's no-refusal crypt ladder (V02 §3.14.5). This volume shows them, maps gestures to their events and words
  their messages (V09 §4.17).
* **Items 111–119's rules** — the oasis and the water pull, the style families' second cues and checked variants, the
  history replay, the wall condition ladder and its drivers, the grandeur ceiling, the zoom-out limit, the season and
  festival rows, the ten-second comfort level and its quality budget — are the base's and their volumes' (item 111 at §4.2 S0–S1
  and §7.1; item 112 at §8.2 and §13.2; item 113 at §4.2 S0, §4.11 and V06; item 114 at §2.7, §7.1 and V06 §3.7.7; item 115
  at §4.7 S10b and V02; item 116 at §8.8; items 117 and 118 at §2.9, §7.7 and §8.2; item 119 at §12); this volume designs
  their controls, words and panels (V09 §4.21).
* **The people and the family tree's contents** — the relation store, postings, schedules and the clock's hours — are
  §10.3's module (`@plat/sim`, M4b); this volume places their screens (V09 §4.18).
=== END ===

=== REPLACE ## 1b Wiring table ===
## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into; base records are cited, not
restated, and a cell names a mechanism by its home section. A piece with no consumer or no producer would be a defect
(owner, 2026-09-28: "every piece of engineering is to be wired to something else"); T-V9-12 and T-V9-15 check the two
registries mechanically.

| piece (V09 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `ShellConfig`, `ShellMode`, `HostSlots` (2.2) | the boot (3.1) from media queries and the entry; V08's `embed.html` fills `HostSlots` — its `clerkMode` from the host's `clerk.config` (file f item 473), its `hostName`, its `historyLines` from `host.state` listed at the key the shell passes (`list(effectiveKey())`, 2.2, 2.10), and its `newDocuments` (V08 §3.1 step 7 (b), (c)); rebuilt on every `clerk.config` | every screen; the rail's availability; the export tab's formats; the Assistant button and the clerk slot's kind (`built-in`, or `host` for the card-only drawer); "Set by {host}" (`host.locked`) and a host card's AI mark; the history panel's group "The party" (4.10); the host-mode rule of every action that makes a new document (3.9) | §14 `@plat/app`; file f item 507 (the embed entry) |
| `toolkit.json` rows (2.3) | our table versions | the rail and options strip (4.2), the mapper (3.3), the gestures of §7.1's binding (4.3), the context menu (4.4), `@plat/docs`' tool pages, T-V9-12 | §14 `@plat/tables`; file f item 516 |
| `messages/en.json` rows (2.9, 4.9) | our table versions; V08's `host.*` rows; volume 10's key families and volume 6's `info.copy.condensed`, their `en` texts loaded from their homes (V09 §4.9's sources paragraph) | every bend line, refusal card, toast, hint, fates word, error and panel sentence of this volume; every `says` of a why section, every critique, clerk refusal and notice line the drawer draws, the clerk's button words and the withheld kind words; `@plat/docs`' messages page, one anchor per row (`messages#<key>`, the page a row's **Show me why** opens, V09 §5.15); T-V9-15, T-V10-29 | §14 `@plat/tables`; §5.2 F-EDIT; §7.1's outcome table; file f item 516 |
| a row's `buttons` (`MsgButton` lists; 2.9, 4.9) and the `button.*` rows | our table versions, in `en.json` only; the engine's `MsgRef` arguments they read (file f item 463); the dry run's `ConflictAction`s, `PreviewResult.alternatives` and the dossier's unplaced elements, for `commit`'s sources | the canvas's refusal and bend cards, toasts, the fates sheet and panels (V09 §3.3, V09 §5.3); V09 §4.9's event forms, application commands and V09 §4.5's mode ids; volume 10's cards through V10 §3.5 step 3; T-V9-13, T-V9-15, T-V9-27, T-V10-4 | §5.2 F-EDIT; §11.2; T101-3 |
| `info.copy.condensed` (3.9, 4.9) | V06 §3.15.5's line; the new document's `forkedFrom.seq` above the seq asked (V06 §4.4) | the new document's opening toast after a copy or re-run below a rebase point (V09 §3.9, V09 §4.11); T-V9-15, T-V9-27 | §2.9 `Base`; V06 §3.15.5 |
| the keymap's added rows (4.13) | `keymap.json` | the input layer; the keymap overlay | §14's input scheme; file f item 516 |
| `Draft` and the draft mirror (2.4) | pointer, key, paste and card events | the mapper; the overlay's raw stroke; the recovery offer (3.1) | §9.5 authoring surfaces |
| the mapper (3.3, 4.5) | a settled `Draft` | `preview` and `edit` calls | §7.1's events and toolkit |
| `PreviewState` (2.4) | `preview`'s `PreviewResult` | the ghost (`live.ghost`), the badge, the bend line, the refusal card, the fates shown before Accept | §11.2 `preview`; §8.2 `live.ghost` |
| `VariationSet` (2.4, 3.6) | `preview` with `variations: 3` for a derived fill, or one `preview` per clerk variation (file f item 461); `thumbnail` per preview | the tray; the committed group of V09 §3.6 | §7.3 item 10 |
| feature snap by role (3.4) | the tile worker's `RoleIndex.snap` with a role filter (file f item 517) | the draft's points; the snap highlight; the ruler (4.19) | §9.5; §8.9's snap query |
| wall arcs in the preview (3.4) | `drawWall`'s dry run (file f item 462) | the wall ghost's barrier arcs, the anchor towers, the badge's walled and barrier metres, the enclosed districts' tint | item 106 (a)–(g); §7.1's `drawWall` points form |
| placement alternatives (4.5 T6 `place`) | the top three `SiteCandidate`s of the `sites` query (file f items 463, 468) | T6's faint alternative sites; the refusal and bend cards' "put it here" | §4.7 S10b's closest sites |
| `sizeM2` on a quarter's points form (4.5 T5 `quarter`) | the badge's plus / minus and the size chips | S6's grower's target in `quarter`'s dry run (file f item 348) | §7.1 `PointsForm` |
| `Selection`, `HandleSet`, `CountBadge` (2.5) | clicks, lists, lassos; the selected geometry by V09 §3.5's rules; `PreviewResult.counts` | the context panel, the handles' drags (3.5), `live.selection` | §8.2 `live.selection`; §9.5 |
| the context panel and context menu generator (4.4) | §2.8's entity registry (edit kinds, attribute paths with their labels and help anchors, `factTier`), the entity schemas and §7.8's control registry | panel controls and menu entries → `setAttr`, `setAttrMany`, `editTable`, the kinds §7.1's binding homes | §2.8, §7.8; file f item 269 |
| map-side siting, link and split declarations (2.6) | `editTable` row operations on V11's document-only tables `siting.declared` and `siting.linkEdits` from the Shape tab, the per-kind panel, the link view and a clerk's accepted proposal | V11's resolver and S10b's score, the link binding, the split placement (V11 §4.2–V11 §4.4); the `why` and `links` answers | file f item 380; items 104 (a) (1), 105 (h), (j) |
| a wall stretch's grade override (4.7) | `setAttr(enceinte, 'profile/<arc>/grade')` | S7's operator as a fixed input | §4.8; item 106 (c); file f item 360 |
| `WhyCardModel` (2.7) | V10's `WhyAnswer` from `query({ kind: 'why' })` (file f item 468; each kind's `WhyProvider`, file f item 270, and each `WhySectionProvider`'s rows, V10 §3.9) with row ids resolved to sentences by V11 §4.5 | the why card (5.8), the source chips (4.7), the drawer's why turn (4.11), the underground panels (4.17) and item 110's panels and why lines (4.20.6) — `sections` drawn by all of them | §11.2's oracle |
| `LinkRow` (2.7) | the `links` query, read from the generation worker's link cache (3.15), bound by S10a/S10b's binding function | `live.links`, the Link card, the GeoJSON `supplyLink` features | §11.2; item 105 (a), (j); file f item 460 |
| a record's members (4.7) | `EntityCard.members` (`query entity`, file f item 468) and `WhyAnswer.members` | the record panel, the gazetteer's counts | §11.2; item 108 |
| `live.shade` provider (5.4) | `ModelView.fieldDriver('daylight')`; V05's held strips (`sky.island.shadeStrip`, `shadePending`) | the Shade view's tiles, its legend and readout; picture exports while it is on | §8.2 live layers; item 102 (f); file f item 411 |
| `live.links` provider (5.4) | the `links` query | the Supply links view (overlay) | §8.2 live layers; file f item 411 |
| `live.coverage`, `live.voids` providers (5.4) | V01's `catchmentOf` and `districtsAbove` (V01 §3.16) | the Coverage and Voids views | §8.2 live layers; file f item 411 |
| `showCircuit` on the wall layer (5.4) | the wall layer's toggle, by `setLayer` (file f item 413) | S14 draws the barrier arcs after commit, in the town and village products (V07 §5) | §8.4 `LayerSpec`; item 106 (g) |
| view keys `thematic`, `workingLayer`, `restore/<id>` (2.1, 2.8) | the view bar; the history panel | the live providers; the tools' layer; the restore flow | §2.9 view state; file f item 277 |
| the Show menu's **SettlementForge's chains** entry (5.4) | the gazetteer's `customChain` rows as V08 §5.2's row lists them, read at the view's effective key after each load and each commit | `thematic: 'supplyChains'` → V08 §5.2's thematic row: its lines, legend and GeoJSON | §2.9 view state; §8.2 thematic rows; file f items 277, 410 |
| **New trees** (3.7, 4.5 T12 `dress`) | the Dress panel's button | `rerollLayer { concern: 'render.instances' }` → S14's instance layouts; the history line "New trees" (4.10); volume 10's `DressInput.restyle`, which reads V09 §4.5's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer` |
| **New decoration** (3.7, 4.5 T12 `dress`) | the Dress panel's button | the group V09 §4.5's T12 row states (J-V9.115) → the render-time hashes of `style.jitter` and `style.crowns` (§6.1; display only); the history line "New decoration" (4.10); volume 10's `restyle` value `'decoration'`, which reads V09 §4.5's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer`; §7.4 |
| view key `showUnexcavated` (4.17.1) | the Below group's "Show hidden caves and ruins", offered only at tier `secret` | S14's unexcavated style (V04 §5.2), which draws unexcavated and lost clusters; a picture export at `secret` | §2.9, §11.3, §11.1; file f item 278 |
| `ViewOpts.viewAs` (4.8) | the View as menu (a tier); a host's players' view, set by the embed's bridge handler as the party's key form (V08 §3.14 (5)) | §9.2's admission for this view's drawing and labels; `effectiveKey()` (2.10) — the `admitAs` of every band-less read (2.7), the key the shell lists the host's lines with (2.2), the clerk's session key and the export dialog's default knowledge (file f item 453) | §9.2's admission function; §11.2 view options; file f items 464, 572 |
| the base's own view keys placed on screen (4.19) | the Map, Below and Light groups, the Notes panel, the Dress panel, a viewer's style card | `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `weather`, favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings — their readers are the base's | §2.9 view state; §9.5 |
| the ruler (4.19) | key M and the view bar's button | a length or area readout; "Save as annotation" (a view pin) | §9.5 measure tool |
| the system chip and "New ruin / cavern / catacomb" (4.17.2) | the town's `UndergroundSystem` records by name and kind; item 109's admissibility by rung | `drawTunnel { system }`, `drawChamber { system }`, `drawChamber { system: { newKind } }` | §7.1; file f item 361 |
| "How people get down here" (4.17.3) | `AccessPoint.cause`, `UndergroundLink.cause` (V04 §2.2) and the excavation reading's connection graph (V04 §3.5.7) | the access, cavern and ruin panels; "Show the way in"; the access symbol by cause; the access edits | II.7.4; V04 §3.5.7 |
| a lost void's line (4.17.1, 4.21.3) | V04's excavation reading `lost` and its `ExcavationRecord` (V04 §2.2, V04 §3.5.7) | the void's panel line, the Below legend's "Once known" entry, "Show hidden caves and ruins" at tier `secret`; T-V9-73 | II.7.4; item 113 (e) |
| the dwelling closure (4.17.4) | a dwelling or undercity declaration on an `unexcavated` cluster; for **Use another building**, the dry run's `PreviewResult.alternatives` (file f item 372) | the access closure's pieces with the dwelling, dug by V04 §3.8's U-DIG; the bend card's **Use another building** re-preview; the clerk's `propose` for the alternative (V10 §3.16) | §7.3 item 9 |
| the catacomb, crypt and cemetery panels (4.17.5) | `CatacombComplex` (V04 §2.2), `Basement.crypt` (V03 §3.7.4), the crypt join's `AccessPoint` (cause `crypt`), the burial face and V01's opening place | the panels, the extent chart, the bends' words, the fates of an author's delete | II.7.6; V04 §3.5.1 |
| the People panel, the family tree, "Where is", the clock (4.18) | `query people`, `relations`, `whereIs`; the `time` key and `sim.advance` | the panels; the map's highlight of home and work | §11.2; §10.3; §14's family-tree view |
| `HistoryRow` (2.8) | the log (and the journal's times) | the history panel, the context panel's History tab, a generic host's viewer filter (`HostSlots.historyFilter`, §11.3) | §7.4 status; §2.9 log |
| `HistoryRow.lines`, `.dossierGroup` and the dossier groups (2.8, 4.10) | the log's `dossierFacts` events — their `changes` count, the `absorbed` week, their `notes` (V08 §3.6 step 4) — and the port's `host:port` events after each; `report(h)`'s `changes` (§5.4); `query({ kind: 'entity', dossierKey })` and `query({ kind: 'entity', id })` at `effectiveKey()` (file f item 583); V06's `EpochReport.raised.suppressedFired` for the epoch rows' lines | the history panel's absorb and creation groups: heads, note lines, report-entry lines, Show (V08 §4.6's absorb group); T-V9-69 | §7.4; §5.4; §11.2; V08 §4.6 |
| the report panel's dossier section (5.7) | `report(h)`'s `GenerationReport.dossier` and `.dossierNotes` (file f item 390); the note keys by file f item 583; the entries' addresses named by `entity` reads at `effectiveKey()` | the placement list (`report.dossier.<state>`) and the standing-note lines under `host.group.standing`; T-V9-69 | §5.4; V08 §4.6 |
| the report panel's "What its past left" (5.7, 4.21.3) | §2.7's `HistoryRecord` (the peak, its evidence and `symbolic`, the refoundings, the buried systems) and V06's replay record (V06 §2.14) | the report panel's history lines with Show; the symbolic chip on a fact whose provenance carries `symbolic` (§2.8); T-V9-73 | §2.7, §2.8; §4.11; item 113 |
| restore flow and re-run (3.9) | a row or a restore point | `undo(h, of)` groups; `forkAt`, `rerunFrom` (V06 §4.4); in host mode the new document written by `export(h, 'plat')` to the user's device and released, or the controls hidden (`HostSlots.newDocuments`) | §7.4; file f item 458 |
| `JournalEntry`, `LocalDocRecord` (2.11, 3.8) | every API call that changes the log, in two phases; compaction's `export(h, 'plat')` | recovery at open; the recent list; Recently deleted; the file `DocResolver`; `LocalDocRecord.appVersion` read at open (3.1) | §2.9's writer; §11.5 |
| `AppPrefs` (2.11) | first run, the settings screen, hint completion | the shell; a new document's recipe (the `generation` block); V06's history store and frame cache (the device settings V09 §5.12 states, which V06 §2.2 reads) | §7.6's `userGlobal` layer; V06 §2.2 |
| `ClerkSlot`, `ClerkMount`, `ClerkHandle` (2.10) | volume 10's harness (`@plat/clerk`) implementing `ClerkHandle` over V10 §2.6's view model, in host mode for both slot kinds; `ClerkMount.host` filled by the embed's bridge handler (V08 §3.1; file f item 473); `ClerkMount.effectiveKey` from the view key and View as (file f item 464); `ClerkMount.rebuildEvents`, the shell's one implementation of V09 §4.20.3 (4); `ClerkHandle.send`'s `attach.newMap` from the drawer's Start a new map from this | the drawer (4.11); the settings' Assistant section over `ClerkSettings` and the defect list (V10 §2.2, V10 §2.8); V10's `HostProxyBackend` and its session key (V10 §2.3); V10's **Put it back** (V10 §4.3) from `rebuildEvents`; V10 §3.1 (4)'s creation mode from `attach.newMap` | §11.2's clerk API; §14's clerk; file f item 473; V08 §3.1 |
| the skeleton import dialog (3.12) | `GenerationReport.prefix` (file f item 470 (d)); `CritiqueEngine.run` (V10 §3.10); a skeleton's `history` block (V06 §5.3) | the dialog's outcomes, the findings with Show and Fix (a `propose` fix run through the shell's own pipeline), "Check with the assistant" (V10's `critique` route) | §4.1, §5.4, §11.1 |
| the creation preview (4.11) | a creation proposal's scratch document (V10 §3.11 (3); file f item 469), in the empty state or after the drawer's Start a new map from this (standalone only) | the read-only view under its banner; acceptance opens the new document (V09 §3.2 (3)'s rule for the untouched empty-state town) | §11.2 |
| massing handles and the family strip (3.5) | V02 §4.5's contract; one `setMassing` dry run per feasible family | `reshapeRange`, `moveTower`, `setComposition`, `setMassing` | V02 §4.1, V02 §4.5 |
| the export dialog (5.10) | the user's options; its default knowledge, the view's effective key (2.10) | `export(h, fmt, opts)` with `knowledge` lowered only (file f item 453) and the VTT details (file f item 454); V06's `chronicle.csv`, `uses-history.csv` and animated history; V10's transcript | §11.1 |
| the share sheet (5.11) | `export(h, 'permalink')`, §6.4's refusal conditions | the clipboard; the file download | §6.4, §11.5 |
| the three load outcomes (3.14 (a)–(c)) | `open`'s load (§2.9 *Load* steps 2–3; §6.4's retention window) | V09 §3.14 (a)–(c)'s screens and their actions; the history rows (4.10); T-V9-67 | §2.9 *Load*, §6.4, §7.4's rebase row, §7.5 |
| the locus wording (4.16 (6)) | a `Locus` (a roster line's, an `assign`'s) and its target's name from the `gazetteer` query at the view's effective key (2.7) | `refuse.roster.dossier`'s `{locus}` (4.9), the history template "Asked for {name} {locus}" (4.10), volume 10's `dossier` row (V10 §3.16); T-V9-13 | §7.1's `Locus`; §11.2 `gazetteer` |
| `F5Record`, `UxSittingRecord` (7.3, 7.4) | the first-five-minutes sessions; the owner's sitting | `MilestoneRecord.ux` of M2a, M3a and M3b (file f item 490) | §13.3, §13.4, §13.6's protocol shape |
| `TrialRecord` (7.6) | the game-master trial's sessions and its report (item 112 (b)) | volume 12's calibration record and the fix list; §16's release gate (T112-2); T-V9-72 | §13.2 (T112-2); §16's release gate |
| the canvas script (3.12, 7.2) | the known-city fixture's gesture list, each gesture with its view scale and centre | the app harness; T101-6's agreement bar | §13.2's elegance bars; §13.4 harness |
| item 110's events (4.20; file f item 362): `drawWall` of kind `retaining` with `highSide`, `drawWay` with `raised` and the `aqueduct` class, the `terrace` sugar, `setAttr` of `spans/<n>/use` | T3 `wall`'s Retaining wall mode, T2 `ground`'s Terrace mode, T4 `road`'s Raised toggle and Aqueduct chip, T9 `shape`'s span chips; volume 10's encoders; a skeleton's prefix | the fold (the base's `RetainingWall`, raised parts and span use); the journal (3.8); the history templates (4.10); T-V9-12's walker | §7.1 (file f item 362) |
| a crossing's form and a raised way's deck paths (4.20.6; file f item 364) | the panel's Stair · Ramp chip, the Deck height and Arch spacing steppers | the fold (file f item 244's held `clearanceCm` and `spanSpacingCm`, read by its support step and the course solver); the history row by its path label (file f item 269) | §7.1's ways row; §2.7 |
| a removal of generated content and its suppression (4.20.3) | the Delete key, the context menu and T10 `hold` (a plain `delete`); the fold writes file f item 260's `detail.suppress` | V06's ledger and every generator (V06 §2.13); `info.remove.holds`; the history row's "Build it again" and `ClerkMount.rebuildEvents` (one function, V09 §4.20.3 (4)); the skeleton (file f item 455) | §7.1, §2.8; file f item 260 |
| the preview's effects (4.20.7; file f item 465) | the engine's dry run, filled from the owning volumes' rows (V02's deck buildings, V03's stored plans, V04's arch vaults, the base's routes, junctions and water) | the badge's "and {n} other changes", the fates sheet's "What else changes", the live region, the clerk's card, T1 `intend`'s whole-town ghost | §11.2 |
| the hit stack and `Selection.kind 'part'` (4.20.8; file f item 466) | the tile worker's hit-test slices; for a sky hit, the point un-displaced by the island's offset (V05 §4.2; V09 §3.4) | click-again cycling, "Select below", the span and crossing panels, T11 `name` on a raised way, the touch menu, volume 10's `entity { at }` | §11.2's `hit` |
| handle kinds `rampEnd`, `terraceLevel`, `tierStep`, `tierCentre`, `tierRadius`, `shrineInset` (2.5, 3.5) | V09 §3.5 from the selection | the mapper: `moveVertex`, `terrace`, `setMassing { op: 'tiers' }` | §9.5 |
| the Raised toggle and the Aqueduct chip (2.4, 4.20.2) | T4 `road`'s options strip; PageUp and PageDown while drawing | the mapper's `raised` and `class`; the badge (memory only, reset on tool entry) | §7.1 |
| T9 `shape`'s tier controls (4.20.5) | a selected `stepped` building at the building band | `setMassing { op: 'tiers' }`, `setAttr` of a tier's heights, shape, skirt and solid (V02 §4.6) | V02 §4.6 |
| "Keep them as yours" (4.20.3) | T1 `intend`'s whole-town ghost when a Re-derive drops generated raised ways | declared `drawWay { raised: true }` events in the Re-derive's group | §7.1 |
| "Raised ways the town builds by itself" (4.14) | the advanced panel's Streets group | `editTable` on volume 11's `raisedWays` chances, read by every raised-way generator (V06 §2.13); the dry run's "Remove them too" | §7.6 |
| the item-110 exports and the deck scene (5.10; file f item 447) | the exporters | the export dialog's rows; T-V9-61 | §11.1 |
| removals in the skeleton (3.12; file f item 455) | Export skeleton | the import dialog's *kept removed* and *nothing to remove* rows; T-V9-62 | §11.1 |
| the second known-city fixture's canvas script (7.2) | the test tree, written from its brief | T-V9-56, T-V9-3's measurement, volume 12's golden (V12 §3.14) | §13.2, §16 (item 110 (e)) |
| the tables editor's cell inspector (4.14) | V12's register entries (`CalibrationEntry`, V12 §2.6) through `dist/evidence.json` | each cell's status, reference, due milestone and evidence lines; the presets dialog's historical packs | §7.6; V12 §2.6 |
| T2 `ground`'s spring flag (4.21.1) | T2 `ground`'s **Lake** mode, its **Spring-fed (oasis)** toggle | `drawWater` whose points form carries `spring` (§7.1's `PointsForm`; item 111) → S1's oasis with its grove and gardens (§4.2 S1); the badge's grove and garden lines; the history template "Made an oasis at {place}"; T-V9-71 | §7.1; §4.2 S1; item 111 (a) |
| view key `cvdVariant` (4.21.2) | the view bar's **Colour vision** chip; Settings' Accessibility section, its machine default `AppPrefs.cvdDefault` | the tile key and the sheet's checked variant (§8.2); the legend's swatches (§9.5); picture exports while it is set; T-V9-72 | §8.2; §2.9; item 112 (a) |
| the second cues of this volume's thematic views (5.4) | V09 §5.4's view rows (a cue per colour-coded meaning) | the live providers' marks and the legend; the style check (T112-1) | §8.2's second cues; item 112 (a) |
| the history option on T1 `intend`'s sheet (4.21.3) | T1 `intend`'s **History** chip (standalone, or a host with no dossier history) | `adjust` of §4.2 S0's history option (`Recipe.history`) → the replay (§4.11; V06 §3.20); the whole-town ghost with its fates; T-V9-73 | §4.2 S0; §4.11; item 113 (a) |
| the wall repair's material (4.21.4) | T3 `wall`'s **Repair** mode, its **Material** chip (robust, or a patch row of V11's `walls.patchMaterials` by the wall's kind and culture) | `convert repairWall` with its material (§7.1; item 114 (f)); the history template; the wall's panel line; T-V9-74 | §7.1; §2.7 `Enceinte.condition`; item 114 |
| the wall states in the legend (4.21.4, 5.4) | §8.2's state rows for `standing`, `worn`, `patched`, `breached`, `dismantled` | the legend panel's wall lines and each state's second cue; T-V9-74 | §8.2; §9.5; item 114 (e) |
| the grandeur note (4.21.5) | the dry run of a hand placement or reshape above the rung's grandeur ceiling (item 115 (c)): honoured, its line `info.grand.beyondTier` | the preview card and the badge's line, the building's why card fact; V10's explanation (V10 §3.9); T-V9-75 | §7.1's outcome table; §4.7 S10b; item 115 |
| the zoom-out stop (4.21.6) | §8.8's per-map zoom-out limit (the stop where `bounds` fits the viewport's short side, plus one) | the view bar's zoom control, the wheel and pinch, **Fit the town**, the export dialog's frame; T-V9-76 | §8.8; §9.5; item 116 |
| the season control (4.21.7) | the view bar's **Season** control: a week slider, the four season chips and **Follow SettlementForge** | §2.9's year position and follow flag → §8.2's season rows; the export dialog's season line; V10's explanation; T-V9-77 | §2.9; §7.7's calendar row; §8.2; item 117 |
| the progress view (4.21.9) | the worker host's stage messages (§11.2's worker boundary (`onProgress`); §12's progress rule) and each one-time wait's own steps (epochs, export tiles, replayed calls; the events a Go back to here undoes) | the progress strip and its line (`progress.*`), the first map's stages filling in under it; T-V9-79 | §12 (item 119) |
| the edge suite's outcomes (3.16) | each mechanism's own inputs at their limits | the `edge.*` rows, the refusals and bends named there; T-V9-80 | §5.1's ladder |
| the festival list (4.21.8) | §7.7's traditions row (the dossier's festivals and their weeks) or, standalone, the generic festivals by culture and season | §2.9's festival display (follow · off · preview a festival) → §8.2's decoration rows; the export's festival name; T-V9-78 | §2.9; §7.7; §8.2; item 118 |

**The dossier facts this volume shows** (it writes none; each is read through the port's digest and §7.7's rows):

| fact shown | dossier field (`DossierDigest`, §14) | the rule that carries it to the map | where it appears (V09 §) |
|---|---|---|---|
| the title's tier word | `settlement.tierWord` | §7.7 item 15 | top bar and the `title` label (5.1) |
| a locked population | `settlement.population` | §7.7 item 15; host mode's `lockedControls` (V08 §5.1) | T1 `intend`'s size card, the basic panel (4.5) |
| a dossier-owned name or kind | `institutions[].name`, `.kindLabel`, `.kind` | §7.7 item 11 (the refusal) | the panel's locked fields, `refuse.dossierOwned` (4.4, 4.9) |
| a place's knowledge | `institutions[].knownTo` | §7.7 item 7 | "Who knows this place" chips, locked (4.3) |
| a collective range | `institutions[].count` | DR9, item 108 (b) | the record panel's "between 5 and 10" (4.7) |
| why an element is as it is | the change envelope from `receipts` | §7.7 item 13 (`DossierChange`) | the why card's "Since week …" (5.8); history rows (4.10) |
| how the map read the record (the port's notes) | the digest fields each `PortNote` kind names (V08 §4.6's table) | V08 §3.6 (4) (`dossierFacts.notes`, `DossierBinding.notes`) | the history's note lines under an absorb or creation head (4.10) and the report panel's standing notes (5.7) |
| a custom kind's profile sources | `institutions[].category`, `.tags`, `.custom` | item 104 (a) (2)–(7) | the profile chips (4.7, 5.8) |
| the tier of every field | the registry's dossier paths | §2.8's `factTier` over §7.7 item 12's binding | every tier chip (4.4) |
| an ancient ruin | `site.deposits` of kind `ancient_ruins`; an institution of scene archetype `ruined-landmark` | DR19, DR24 | a ruin's why card: "SettlementForge's record names ruins here" (4.17.3, 5.8) |
| a magical node, ley lines, a magical history | `site.deposits` of kind `magical_node`; the "Magical ley lines" income rows; `history.events` of type `magical` | DR19; `HistoryHint` | a ruin's why card (the source in words) |
| mining | `site.deposits` of the mining kinds | DR19 | a cavern's why card ("Mining here makes caves likelier") |
| the cathedral | `Cathedral (10,000+ only)`, `Great cathedral` | DR9 | every cathedral's "Below" line: its crypt, always, the largest (4.17.5) |
| how many catacombs | the church records (`Parish church` and its ranges, `Monastery or friary`) and item 108's collective members | DR9, DR10; V04 §3.5.1 (3) | the catacomb panel's count sentence (4.17.5) |
| the burial faces | `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house`, `Graveyard`, the `Cemetery network` grounds | DR9, DR10, item 108; V04 §3.5.1 (1) | the cemetery's "Catacombs below" line; the catacomb's "Under {burial face}" (4.17.5) |
| a crypt record | an institution matching the subterranean row `crypt` | DR17 (file f item 386) | its church's "Below" line (4.17.5) |
| a forced system or undercity | the `tables/dossier/subterranean` rows; `CircumstanceSlice.undercity` | DR17 (file f item 386) | the system's why card ("SettlementForge's record puts it here"); an access of cause `dossier` (4.17.3) |
| an aqueduct's reason (the water system) | the records bound to `conduit_house` (`Aqueduct or water system`, `Advanced water infrastructure`) and the demand records | DR34 (V08 §2.6b (1)) | a raised way's why card: a `facts` row of tier `dossier` under "The town raised it: it needed water" (4.20.6) |
| an elevated road's reason (high ground) | the dossier-bound institutions of class significance ≥ 20 and the custom `landmark` records at their reservations | DR35 (V08 §2.6b (2)) | the same card's `ref` rows, withheld names read by kind (4.20.6) |
| a toll bridge on a dry site | the dossier's toll bridge | file f item 399 | the bridge's why card; nothing else in V09 |
| that nothing of item 110 is dossier-bound | — | V08 §2.6b (5) | every raised way, retaining wall and deck plot is removable by the plain delete (4.20.3) |
| an oasis | `site.deposits` of kind `oasis_water` on an arid site | DR40 (item 111 (a)) | the water body's why card: "SettlementForge's record puts water here" (4.21.1, 5.8); T2 `ground`'s spring toggle locked on it |
| the town's past | `peakTier`, the high-water population, `tierHistory`, `populationHistory`, `calamityHistory`, the history's events, the lifecycle's destruction and resettlement | DR36–DR39 (item 113) | T1 `intend`'s History chip reads "From SettlementForge's record" and is locked; the report panel's "What its past left"; the symbolic chip (4.21.3) |
| a wall's condition at generation | the settlement's `readiness` label and its wealth | §7.7's condition row (item 114 (d)) | the wall's why line (4.21.4) |
| a building specified as grand | a dossier record naming a manor, hall or similar (V08's "specified", item 115 (c)) | §4.7 S10b's ceiling, lifted for it | the building's why fact "Named in SettlementForge's record" (4.21.5) |
| the week and season | the campaign calendar's week and season | §7.7's calendar row (item 117 (c)) | the Season control's week while **Follow SettlementForge** is on (4.21.7) |
| the festivals | `traditions[]` and the custom-content traditions (their windows and staging) | §7.7's traditions row (item 118) | the festival list with its weeks (4.21.8) |
=== END ===

=== REPLACE ### 2.1 The five classes of state ===
### 2.1 The five classes of state

| class | where it lives | written by | persisted | shared over a bridge | examples (V09 §) |
|---|---|---|---|---|---|
| canonical | the document's log and style (§2.9) | `edit` only | the `.plat` file | yes (`doc.apply`) | every declaration; the `editTable` rows of 2.6 |
| document view state | §2.9's view section, one key each, last-writer-wins by (Lamport counter, session) | `setView` | the `.plat` file (never in a digest) | the shared keys yes; the per-viewer keys never (§11.3) | restore points `restore/<id>` (shared); `thematic`, `workingLayer`, `underlay`, `showUnexcavated`, `cvdVariant`, §2.9's year position with its follow flag and its festival display (items 117, 118), and the base's keys of V09 §4.19 (per viewer) |
| machine preferences | IndexedDB database `plat-app`, store `prefs` | the settings screen, hint completion, rail pins | the browser profile (never in a document) | no | `AppPrefs` (2.11) |
| local store | IndexedDB `plat-app`, stores `docs`, `journal`, `drafts`, `assets` | the autosave, the draft mirror, the underlay picker | the browser profile | no | `LocalDocRecord`, `DraftMirror`, underlay images (2.11) |
| session-transient | the main thread's memory | the shell | never (the draft is mirrored, 2.4) | no | selection and the hit stack under the last click (4.20.8), active tool, the draft, the preview and its effects (4.20.7), the variations tray, T4 `road`'s Raised toggle (4.20.2), toasts, `ViewOpts.viewAs` (4.8), the People panel's filters, the upgrade offer's **Not now** (3.14 (a)) |
=== END ===

=== REPLACE ### 2.5 Selection, handles and the count badge ===
### 2.5 Selection, handles and the count badge

```ts
interface Selection { ids: Id[]; primary?: Id;
  kind: 'entity'|'label'|'link'|'handle'|'region'|'record'|'part';   // 'region': a region group of quarters (§9.1) selected by its label or by T11's
                                                               // "Name as region" — its panel renames, re-groups or dissolves it (`group`, §7.1)
                                                               // 'part': a sub-part of one entity — a raised way's span, a crossing of a retaining wall, a stepped building's tier (V09 §4.20.8)
  part?: { id: Id; path: string /* 'spans/<n>' · 'crossings/<retaining wall id>' · 'tiers/<k>' — file f item 466's `sub` */ };
  stack?: { ids: Id[] /* file f item 466's answer at the last click, top first */; at: PointCm; index: number /* the entry selected */ };
  scope?: EditScope /* a lasso's or a box's resolved scope, for "re-roll here" and multi-move */ }
interface HandleSet { entity: Id;
  kind: 'boundary'|'knot'|'vertex'|'level'|'islandRim'|'footprint'|'label'|'gate'|'stretchEnd'|'underlay'|'frame'
      | 'rangeEnd'|'rangeWidth'|'towerCentre'|'towerResize'|'roomExtent'|'keep'|'bailey'
      | 'rampEnd'|'terraceLevel'|'tierStep'    // item 110 (V09 §4.20): a raised way's end on the ground, a terrace's level, tier 1's inset step
      | 'tierCentre'|'tierRadius'|'shrineInset';   // a round or octagonal tier 0's centre and radius; the top tier's shrine inset (V02 §4.6; V09 §4.20.5)
  points: PointCm[] /* by V09 §3.5's rules */; emits: string /* the event kind a drag commits, by V09 §3.5's table */;
  more: boolean /* the user asked for more handles on this entity (session only) */ }
interface CountBadge { plots: number; households: number; buildings: number;       // §11.2 PreviewResult.counts
  byFate: Record<'kept'|'carried'|'orphaned'|'discarded', number>;
  extra: { label: MsgKey; value: number; unit?: string }[];                           // per tool, V09 §4.5: gates, towers, walled and barrier metres, houses displaced, length, area
  effects: number;                                                                     // `PreviewResult.effects.length + effectsMore` (file f item 465): "and {n} other changes", with Show
  plusMinus?: { param: string /* the draft parameter a press steps */; step: number; min: number; max: number } }
```

All three are session-transient and derived: a `Selection` from clicks and lists (its `stack` from file f item 466's hit
answer, cycled by V09 §4.20.8); a `HandleSet` from the selected entity's geometry by V09 §3.5's rule; a `CountBadge` from
the latest `PreviewResult`. None is saved. A lake has no rim handles: its
shore is its basin filled to its level (S1's basin fill), so it offers the level handle and T2 `ground`'s water paint (J-V9.47).
=== END ===

=== REPLACE ### 2.6 The map-side declarations file g asks the interface to store ===
### 2.6 The map-side declarations file g asks the interface to store

Items 104 (a) (1), 105 (h) and 105 (j) let the author override siting, keep a split works-and-shop pair on one plot, and
pin, move or cut a supply link — "stored map-side … never written to the dossier". They live in volume 11's two
**document-only tables**, `siting.declared` and `siting.linkEdits` (V11 §4.2, file f item 380), edited by `editTable` row
operations with V11 §4.4's lifecycle (the inverse row operation undoes; a key that no longer resolves is orphaned and
reported in the history panel's orphans, V09 §4.10) and V11 §4.3's locality (a placed use is kept and listed with the score
it would gain by moving). One store: the solver, the clerk and the canvas read and write the same rows (J-V9.36). This
volume maps each screen to its row operation:

| screen (V09 §) | table | key | cells written | owner rule |
|---|---|---|---|---|
| "All {kind}s in this town", the per-kind panel (4.7) | `siting.declared` | a kind key: `uid:<localUid>` for a custom kind; `cat:<catalogId>` for a dossier catalogue kind; `cls:<class>` for a roster class no dossier record binds | `familyWeights` (below); `profile` (a `Partial<SitingProfile>`, V11 §2.3, from "Edit the details"); `split: false` ("Keep works and shop together for every {kind}"); `quarter` ("Put them in {quarter}"); `place` ("Put them here") | item 104 (a) (1) |
| "Keep them where they are", on the per-kind panel (4.7) | `siting.declared` | one `use:<address>` row per member the kind has now, in one group | `pin` on each (a member added later is not pinned; the panel says "Pinned {n} of them where they are") | item 104 (a) (1) |
| "Keep together on one plot", on one split institution (4.7) | `siting.declared` | `use:<the works use's address>` | `split: false`; "Let the rules decide" deletes the row | item 105 (h) |
| the link view (4.7) | `siting.linkEdits` | `<consumer use address>/<good>` (V11's key) | `bindTo` ("Keep this supplier", "Use another supplier"); `avoid` ("Cut this link": the provider joins the list, the next nearest serves); `cut: true` with neither ("Stop buying {good} here": no pull for that good at that use); "Reset" deletes the row | item 105 (j) |

**The tables' shape** is V11 §4.2's (V09-XAGREE-1): the key forms `uid:`, `cat:`, `cls:` and `use:`; a kind key admits
`profile`, `familyWeights`, `quarter`, `place` and `split`; a `use:` key admits `place`, `pin`, `split` and
`specialisation`; `siting.linkEdits` cells are `{ bindTo?, avoid?, cut? }` with the three meanings of the table above.
Every screen writes only a cell V11 §4.2 declares for its key form.

**The family multipliers** (this section is the home of their words; V09 §4.7 and V10 cite it). `familyWeights` is
V11 §4.2's cell, its values and meaning there; V09 §4.7's chips word its five values Ignore 0 · Less 0.5 · Normal 1 ·
More 2 · Much more 3, one chip row per family id of V11 §2.4's enum (`nuisance`, `need`, `clientele`, `supply`,
`alignment`, `competition`, `coverage`, `sun`), and a family the cell does not hold reads Normal — a multiplier of 1.
**No per-use siting weights** (J-V9.36): a single place is moved (`relocateUse`) or pinned (`placeAt`, T10 `hold`) — the owner's
per-kind declaration is the row, and one member's site is its own edit. **Tier and dossier.** Each row is `declared`
(§2.8's `factTier`) and held by every re-derivation (§7.2). A dossier-backed kind accepts rows — they change where the map
puts or binds things, never a dossier fact (item 20 (h)) — and no row is ever written to the dossier. A dossier event that
removes the kind orphans its row, reported (V11 §4.4). **Class-wide rules** — a class's profile cells in `roster.classes`
for every town — stay the tables editor's (V09 §4.14).
=== END ===

=== REPLACE ### 2.7 The answers the panels render ===
### 2.7 The answers the panels render

The panels read §11.2's `query`. **The oracle's answer is volume 10's `WhyAnswer`** (V10 §2.13, placed in §11.2 by
file f item 468 and produced by each kind's `WhyProvider`, file f item 270); this volume adds none of its fields (J-V9.33). The why
card (V09 §5.8), the source chips (V09 §4.7), the drawer's why turn (V09 §4.11) and the underground panels (V09 §4.17) render
one app-side projection of it, `WhyCardModel`, built on the main thread from the answer and the row sentences V11 §4.5
resolves; it is session-transient and never saved.

```ts
interface WhyCardModel {
  subject: { id: Id; kind: string; name?: string; tier: FactTier; withheld?: true };
  decidedBy: MsgRef;                              // from the oldest `cause` entry (table below)
  bars: { text: string; target?: Id; share: number /* signed */; source: 'pull'|'driver'; withheld?: true }[];   // ≤ 12, by |share| descending
  more: number;                                   // the bars beyond 12
  closure: MsgRef[];                              // an enceinte's barrier arcs, one line each
  links: { text: MsgRef; other: Id; declared?: 'bindTo'|'avoid'|'cut' }[];
  members?: { text: MsgRef; ids: Id[] };
  chips: { family: string; text: MsgRef; lowConfidence?: true }[];
  alternatives: { n: 1|2|3; plot: Id; score: number; hardFails: string[] }[];
  facts: { label: MsgRef; value: string; tier: FactTier; row?: string }[];
  dossierLine?: MsgRef;
  drifted: boolean;
  sections: { kind: string /* V10 §3.9's section name */; title: MsgRef /* 'why.section.<kind>', V09 §4.9 */;
    rows: { text: MsgRef; value?: string; tier: FactTier; target?: Id; withheld?: true }[] }[] }   // after facts, in the providers' registration order (V10 §3.9)
// a void's depth, excavation reading and ways down are the `underground` section's rows (J-V9.82)
```

| card field | read from `WhyAnswer` | rule |
|---|---|---|
| `decidedBy` | the oldest `cause` entry | an event carrying `EditBase.dossier` → "Placed here by SettlementForge's record"; a declaring event of §7.1's toolkit by the user → "You placed it here" ("You accepted the assistant's proposal" when it carries `proposedBy: 'clerk'`); `step` S10b → "The rules put it here"; `chance` present → "Placed by chance among equal sites"; an epoch → "The town's growth put it here in {year}"; **item 110** (V09 §4.20.6): a raised way's line is its own `raised` section row — `info.raised.built` (at an epoch with its year), `.carried` or `.declared`, in V10 §3.9's words — which the section block then does not draw again (J-V9.82); a retaining wall the levelling made → "The ground was levelled here; it steps {m} m"; a span walled up by the rules → "An arch of {way}, walled up as a vault" ("… by you" after a span edit); otherwise "The rules made it" |
| `bars` from pulls | `pulls` | length \|`share`\| against the largest in the answer; side by sign (left a push away, right a pull toward); text: the `row` id resolved by V11 §4.5 — a family row's `says` with the target's name, a signature pair's `reason`, a class row's note, a supply edge's good; the target named and clickable (Show) |
| `bars` from drivers | `drivers.terms` (a district, block or plot; item 102 (f)) | each term's `delta` as a bar; `daylight` reads "In shade {p} % of the day"; the others by their catalogue rows `why.driver.<driver>` |
| `closure` | `closure` (an enceinte, gate or tower; item 106 (g)) | "The {barrier} closes the circuit from {from} to {to}" per arc |
| `links` | `links` | role `consumer` → "Buys {good} from {other} ({distM} m, {near enough \| a long way})", role `provider` → "Sells {good} to {other}"; "near enough" when `distM` ≤ `comfortM`; the orientation in words ("works near its source", "sells near its market", "balanced"); `branchOf` → "its shop" or "its works" |
| `members` | `members` | "{count} {kind}s (the town's size asks for {min} to {max})" and the step in words (V09 §4.7) |
| `chips` | `profile.sources[].rung` | declaration → "yours"; archetype → "from its picture type"; category → "from its category"; tags → "from its tags"; library → "from its library entry"; keywords → "guessed from its name" in the low-confidence tone; fallback → "a general guess" |
| `alternatives` | `alternatives` | numbered outlines at `plot` while the card is open |
| `facts` | `facts` | the registry's path label (file f item 269), the tier chip, and for a `row` "from SettlementForge's record, by rule {row}"; a fact whose provenance carries `symbolic` (§2.8; item 113 (f)) adds the chip "size not recorded" (`info.history.symbolic`, V09 §4.21.3) |
| `dossierLine` | the newest `history` entry with a `change` | "Since week {w}: {reason}" |
| `drifted` | `evaluated.drifted` | "Today the rules would put it elsewhere; it stays." |
| `sections` | `sections` (V10 §2.13's `WhySection`: each registered provider's rows, V10 §3.9, V10 §3.9a) | one block per section, in the answer's order, after `facts`; `title` the key `why.section.<kind>` (V09 §4.9); per row: `text` its `says` (a key of the families of V09 §4.9's sources paragraph), else the registry path label of its `key` (file f item 269); `value` its `value` with its `unit` in the user's units (`AppPrefs.units`); `tier` its tier chip; `target` its `ref`, named and clickable (Show); a `withheld` row reads "somewhere the viewer doesn't know"; a `purpose` row never arrives (the facade drops it, V10 §3.9). The underground panels (V09 §4.17), item 110's panels and why lines (V09 §4.20.6) and the drawer's why turn draw these same rows, so one `MsgRef` is one sentence everywhere |

A withheld target, member or link end reads "somewhere the viewer doesn't know" (§11.2 *Knowledge* (2)); a withheld
subject shows its kind and nothing else.

**Every band-less read speaks for its view** (J-V9.86). §9.2's admission function (E-17) decides what a key admits; the
application only chooses the key. Every `query` the application makes for a view — `why`,
`entity`, `sites`, `links`, `gazetteer`, `people`, `whereIs`, `relations`, and any band-less kind added later — is sent as
`query(h, q, { admitAs })` with the view's effective key (V09 §2.10's `effectiveKey()`, in file f item 572's form), so the why
card, the source chips, the context panel, the gazetteer and "features in view", the Link card, the record panel's
members, the People panel, the family tree, "Where is" and T6 `place`'s alternative sites admit only what View as admits; a
cached answer is dropped and re-asked when `onEffectiveKey` fires. The view-bound reads — the tiles, the labels and the
hit stack — read `viewAs` through §9.2's admission function (file f item 464). The export dialog's default knowledge is the same key
(file f item 453; V09 §5.10). The application's own dry runs — the ghost, the badge, the fates sheet, the refusal and bend
cards, the effects list — carry no `admitAs`: they confirm a change the user commits under the role's key, and a filtered
dry run drops concealed uses from its fates (file f item 470 (b)), so the person accepting would not see all the change moves;
the View as banner stays up above them. The clerk passes its own `admitAs` (V10 §2.3).

**The supply links** are the one list the oracle does not give per view, so `query({ kind: 'links', … })` (file f item 460) returns
`LinkRow`s, read from the generation worker's link cache (V09 §3.15):

```ts
interface LinkRow {
  consumer: Id; provider: Id; good: string;
  distanceM: number; comfortM: number; maxDistanceM: number;
  satisfaction: number /* 0–1: 1 within comfortM, falling to 0 at maxDistanceM, item 107 (b) */;
  mode: 'road'|'water'|'any'; volume: number /* the good's relative volume, item 105 (c) */;
  orientation: 'source'|'market'|'balanced';      // V10's WhyLink field, item 105 (b)
  declared?: 'bindTo'|'avoid'|'cut';              // a siting.linkEdits row names it (V09 §2.6)
  chain?: WhyLink['chain'];                        // item 105 (i): a SettlementForge chain's id, status ('impaired'|'vulnerable') and an entrepôt's end — V10 §2.13's type, cited
  source: 'class'|'dossier'|'custom'; withheld?: true }
```

**A record's members** are `EntityCard.members` (`query({ kind: 'entity', id })`, file f item 468) and `WhyAnswer.members`; this
volume asks for no query kind of its own for them (J-V9.42).

**The shade raster.** The shade map view (V09 §5.4) reads item 102's daylight-share driver `D(x)` as the field keeps it —
a raster at the prosperity field's cell size, held by the generation worker beside the field (recomputed on load with the
field, never stored, §2.9) — through the live-layer model view: `ModelView.fieldDriver('daylight'): { cellCm: number;
origin: PointCm; w: number; h: number; values: Uint8Array /* 0–255 ≙ D 0–1 */ }` (file f item 411). Where the field did not compute it (a table with `w_sun` = 0 may skip the sampler), the accessor runs item
102 (a)'s sampler on demand in the generation worker over the same casters and caches it for the document state, within
V09 §6.4's cost law, so the view works whatever the weight and never changes the field. A floating island's contribution is
never sampled here: its strip is V05's held strip (V05 §5.1's `sky.island.shadeStrip` and `shadePending` rows), which the
view draws as V05 states it (V09 §5.4).
=== END ===

=== REPLACE ### 2.8 History rows and restore points ===
### 2.8 History rows and restore points

```ts
interface HistoryRow {                          // derived from the log on demand (never stored); V09 §4.10 renders it
  seq: number; kind: string /* EditEvent['t'] */; group?: number;
  author: 'user'|'host'|'epoch'|'migration'; proposedBy?: 'clerk'; dossier?: { changeId?: string; reason?: string };
  epoch?: number; week?: number;                // the epoch and week it folded in (§4.11)
  time?: number;                                // wall-clock ms from this machine's journal (2.11) for events made here; absent otherwise
  text: MsgRef;                                 // the plain-words line, V09 §4.10's templates: "Painted the quarter Tanners' Row (42 plots)"
  targets: Id[];                                // from the event's touched set (§7.4) — "show me" highlights them
  lines?: { text: MsgRef; targets: Id[] }[];    // derived sub-lines drawn under the row (V09 §4.10): a dossier event's report entries, a `dossierFacts` event's notes, an epoch's suppressed raised-way reasons; each with Show when `targets` is not empty; never stored
  dossierGroup?: number;                        // the seq of the `dossierFacts` event heading the group the row is drawn in (V09 §4.10's dossier groups; J-V9.107): set on that event's own row and on each port event after it
  status: 'live'|'undone'|'undo'|'redo';        // §7.4: live unless an undo targets it and no later redo re-applies it
  undoable: boolean; notUndoable?: 'creation'|'dossier'|'dependent'|'otherSession'|'window' }   // why not, in the message catalogue
interface RestorePoint {                        // one shared document view key each: `restore/<id>` (§2.9 view section)
  id: string /* 12 base-32 chars, random, minted by the app */; seq: number /* the log position: the state after this event */;
  name: string /* ≤ 60 chars; the user's, or the auto text */; auto?: 'beforeWholeTown'|'timed'|'beforeRestore'|'beforeImport';
  createdAt: number; session: string }
```

**Auto restore points** are written before every whole-town action — a Re-derive from S0–S4 (T1 `intend`'s site, size or walls
changed after declarations, §7.1), an `upgrade`, a `rebase`, "apply my current preferences" (§7.6), an epoch advance (V06's
time card) and a restore itself — and every 15 minutes of active editing when at least one event was committed since the
last one. At most 20 auto points are kept (the oldest auto point is deleted by writing its key to `null`); named points are
kept until deleted, at most 200 per document. A `null` key whose Lamport stamp is older than the snapshot is dropped by the
next compaction (V09 §3.8), so deleted points do not accumulate. Restoring and opening a copy are V09 §3.9's.
=== END ===

=== REPLACE ### 2.9 The message catalogue ===
### 2.9 The message catalogue

```ts
type MsgKey = string;                          // dotted: 'refuse.dossierOwned', 'bend.wall.ridge', 'fate.orphaned', 'error.storage.quota'
// MsgRef is §11.2's ({ key, args? }, declared in @plat/model; file f item 463), its key a MsgKey of this catalogue. An { id } argument is an address
// rendered under a key, a withheld place as its kind: an engine-built MsgRef (a bend, a refusal, a conflict action) under the caller's key;
// a line a panel builds from band-less data (the report's entries, V09 §4.10, V09 §5.7) under the view's effectiveKey() (V09 §2.7)
interface MsgRow { key: MsgKey; text: string /* {placeholders} and the forms below; one sentence, ≤ 25 words, no jargon (T-V9-15) */;
  buttons?: MsgButton[] /* the row's buttons in their order — V09 §4.9's button column; read from en.json only */; tone: 'info'|'bend'|'refusal'|'error'|'success'|'hint';
  codes: string[] /* the engine codes it renders: an F-EDIT reason, a ConflictAction kind, an E_* error, a PortNote, a link-refusal condition */ }
// argument forms in `text`: {slot} renders the argument (an { id } under the reader's key, a withheld place as its kind); {a slot} (en only) renders
// the English indefinite article and then the slot — "an" before words beginning a, e, i, o or u, except words beginning "uni", "use", "usu", "eu"
// or "one", which take "a", and "a" before every other word; a locale file writes its own grammar in its `text` (J-V9.126)
type ButtonClass = 'commit'|'why'|'show'|'tool'|'drop'|'app';
interface MsgButton {
  key: MsgKey;             // its words: a row of the button.* family (V09 §4.9), one row per wording, shared — "Show me why" is button.showWhy wherever offered
  does: ButtonClass;
  from?: ConflictAction['kind'] | 'alternatives' | 'unplaced' | 'event';   // commit: the first dry-run action of that kind, one button per preview alternative,
                           // one per unplaced dossier element, or the event form `event` names
  each?: MsgKey;           // commit from 'alternatives': one alternative's words where a card lists every alternative at once (V10 §3.16) — a button.* row
  event?: ButtonEventId;   // commit from 'event': a row of V09 §4.9's event forms
  page?: string;           // why: the page the row names (refuse.staged's 'staged/{layerId}'); absent, V10 §3.5 step 3's target rule ('messages#<key>', V09 §5.15)
  arg?: string;            // show: a MsgRef argument whose { id } it selects, or a list source — 'alternatives' | 'dependents' | 'created:<kind>' | 'targets' |
                           // 'entry' | 'slot' | 'preview' (below); app: the MsgRef argument the command reads
  tool?: ToolId; mode?: string;   // tool: the tool and its ToolModeRow.id (V09 §2.3; V09 §4.5 names the modes)
  subject?: true;          // tool: the row's first address argument the reader's key admits, selected first
  command?: AppCommand;    // app: one of V09 §4.9's application commands
  when?: 'owner'|'names' } // drawn only for the owner role; only when the thing the row names is a name
type ButtonEventId = 'exactSite'|'notHere'|'firstFreeSite'|'rederive'|'cityUp'|'unassignCreation'|'roomRole'|'stairsAxial'|'stairsFlights'|
  'stairsInternal'|'retainingFlat'|'retainingOtherSide'|'rampLonger'|'roadToFoot'|'catacombUnder'|'joinCatacomb'|'cryptSmallest'|
  'cryptEnlarge'|'keepRaised'|'removeStanding';          // V09 §4.9's event forms, one row each
type AppCommand = 'download'|'reload'|'retry'|'seeUpgrade'|'editWithVersion'|'copyCommand'|'openRecipe'|'keepSaved'|'useRebuilt'|
  'downloadUnreplayed'|'undo'|'undoGoingBack'|'restoreTown'|'showDeleted'|'goBack'|'openCopy'|'exportPicture'|'share'|'switchLayer'|
  'reattach'|'enterKey'|'openSettings'|'viewAsOff'|'showEffects'|'generateWithoutHistory';   // V09 §4.9's application commands, one row each
```

**The buttons as data** (J-V9.121). Every button a row offers is one `MsgButton` of
its `buttons` list, in order, so the canvas's cards and toasts and volume 10's drawer read one source (T101-3; T-V9-15,
T-V9-27, T-V10-4). **Words.** A button is worded by its `key`, a `button.*` row, its slots filled from the row's `MsgRef` —
or, for a button that carries one entry of a list, from that entry: a `ConflictAction`, whose `msg` (file f item 463) is keyed
as the button; an alternative's plot, site or building; an unplaced element — each name read at the reader's key (the
canvas's the role's key, J-V9.86; the clerk's its session key). **What each class does on the canvas.** `commit` previews
its events as a new draft and commits on Accept (V09 §3.3): from a `ConflictAction` kind, the first action of that kind in
the answer's order — `unlock` the `unlock` of its `target`, `unassign` an `unassign` of its `target`, `moveTo` the draft's
declaration at its `target` (J-V9.111's form for an assignment), `reroute` the draft through its `at` — the other actions
of that kind marked on the map; from `alternatives`, one entry of `PreviewResult.alternatives` (file f item 463; file f item 372) —
the draft at that plot by V10 §4.1's `where.plot`, or V09 §4.17.4's access group for that building — the canvas drawing
them marked (a click on one picks it) and its one button, worded by `key`, stepping to the next alternative not yet tried,
while a card that shows every alternative at once (the drawer's, V10 §3.16) has one button per alternative worded by
`each`; from `unplaced`, one per unplaced element of the dossier's list (§7.1's roster rule), drawn as V09 §4.16 (5)'s
picker, the line re-previewed with its `element`; from `event`, the events the event form names. `why` opens the why card
or the page by V10 §3.5 step 3's *The why target*, `page` naming the page where the row gives one. `show` selects what
`arg` names and frames it (`live.selection`): a `MsgRef` argument's `{ id }`; the preview's `alternatives`; the dependent
later events' targets (`dependents`, §7.4); the preview's created addresses of one registry kind (`created:<kind>`,
file f item 470); an effect's `targets` (file f item 465); a report entry's addresses (`entry`, §5.4); a removed slot's former outline
(`slot`, drawn, nothing selected); or, for `preview`, the draft re-previewed and its fresh ghost drawn. A selection is how
the canvas moves a thing (V09 §4.6), so **Move it** is a `show`. `tool` activates `tool` in `mode` on that mode's working
layer (V09 §4.2), with `subject` the row's first admitted address argument selected first. `drop` closes the card and
withdraws the draft or pending edit it belongs to (**Keep {building}**, **Keep a way open**), or dismisses a notice that
has none (**Not now**). `app` runs one application command (V09 §4.9's list) and is never an edit of its own. **Where a
button is not drawn.** A `commit` whose source yields nothing (no action of that kind, no alternative left, no element
unplaced, an event form with nothing to change), a `subject` button whose row has no address argument the reader's key
admits, and a button whose `when` does not hold are not drawn; every `refuse.*` row still keeps **Show me why**, its last
button. **Arguments a button reads.** A `show` `arg`, a `subject` and a `page`
template read the row's `MsgRef`; where the text shows no such argument the engine's `MsgRef` still carries it
(file f item 463's `args` hold every argument, shown or not) — the ones the button column names, among them `thing`,
`building`, `crypt`, `layer` and `layerId` on engine rows and `source` on a panel's line — and T-V9-13's fixtures check
each engine row's. **The clerk's reading** (V10 §3.5 step 3): `commit` →
a `propose` of the same events, `why` → `why`, `show` → `select`, `tool` → `useTool` with `mode` and, for `subject`, the
ids, `drop` → the card's **Drop** where the bent item is the proposal's only item, else a `propose` without it (V10 §3.16).
No `bend.*` row and no `refuse.*` row a dry run answers carries an `app` button
(T-V9-15), so a card the clerk builds meets five classes; a fate's or a removal's line with an `app` **Undo** that the
drawer draws on a proposal card shows it only once the proposal is accepted, as the card's own **Undo**. The
`refuse.clerk.*` family carries no `buttons`: its alternatives are volume 10's `clerk.content.refusals` actions
(V10 §2.10). **Locales.** English is the catalogue's source language; which locales ship follows SettlementForge (J121), and the
locale files are the mechanism that carries them. A locale file carries each key's `text` only; `buttons`, `tone` and
`codes` are read from `en.json`, the contract (V11 §3.1's registry row for `messages` types the locale files so). A
`button.*` row has tone `info`, no `codes` and no `buttons`, and at most eight words.

File `@plat/tables/messages/en.json` (file f item 516): versioned data with provenance `own`; a locale is another file of the same
keys, carrying their `text` only (*Locales* above; the key set is the contract). V09 §4.9 lists the rows. A code the engine can emit with no row is a CI
failure (T-V9-15), so a new refusal cannot reach a user as a raw code. **One message mechanism** (J-V9.42): the engine's
bend lines, conflict actions and F-EDIT messages are `MsgRef`s whose address arguments it renders per caller under the
caller's key (file f item 463, merged with file f item 470 (c)); the application renders them with this catalogue, and volume 10's
clerk renders the same keys (its `DraftItem.bent` is a `MsgRef`, V10 §2.4). **The file carries every key any
surface renders** (J-V9.79): beside the application's own rows it holds the key families volume 10
renders — `critique.K1`–`K18`, `refuse.clerk.*`, `clerk.notice`, `info.raised.*`, `info.under.*`, `info.catacomb.*`,
`info.crypt.*`, `info.plan.*` and the withheld kind words — whose `en` texts are written once, in volume 10, and loaded from there
(V09 §4.9's sources paragraph lists each family's source and the two sub-families whose words this volume writes);
volume 7's `info.village.*` lines (V07 §4.5), volume 5's island lines (V05 §3.2, V05 §3.23, V05 §4.2) and volume 6's lines
`info.copy.condensed` (V06 §3.15.5), `info.past.viewing` (V06 §5.1) and `bend.hood.noClock` (V06 §4.1), loaded the same
way; volume 11's `says` and `reason` sentences are shown as volume 11 writes them. T-V9-15 covers every family and runs its
readability step over all of them, reporting a failure to the owning volume (J-V9.55 as revised by J-V9.79).
=== END ===

=== REPLACE ### 2.11 Machine preferences and the local store ===
### 2.11 Machine preferences and the local store

```ts
interface AppPrefs {
  schema: 1;
  units: 'metric'|'imperial'; theme: 'system'|'light'|'dark'; uiScale: 1|1.25|1.5|1.75|2;
  reducedMotion: 'system'|'on'|'off'; highContrastChrome: boolean; largeTargets: boolean /* 44 px minimum even with a fine pointer */;
  cvdDefault: 'none'|'protan'|'deutan'|'tritan' /* the Colour vision a view starts with where its town holds no `cvdVariant` (V09 §4.21.2); default 'none' */;
  announcePreviews: boolean /* the live region's preview summaries (V09 §6.3); on by default (a polite live region is silent unless a screen reader reads it) */;
  longPressMs: number /* 300–1 000, default 500 (V09 §4.15) */;
  hintsDone: Record<string /* ToolId | 'clerk' | 'tour' | 'variations' | 'restore' */, number /* ms when completed; 0 = not yet */>;
  tourOffered: boolean;                        // the guided first town was offered once (V09 §5.9)
  railPins: ToolId[]; railExpanded: ToolLayer[];   // tools pinned to the rail; layer groups left open
  snapRadiusPx: number /* default 8 (§9.5), 4–24 */; handles: 'fewer'|'default'|'more' /* 4 / 4–8 / up to 16 */;
  keymapOverrides: RowOp[];                    // over keymap.json (§14): row operations by binding id
  history: { storeMB: number /* the history store's memory: default 256 on the desktop tier, 96 on the low-end tier (V09 §5.12) */; frames: number /* frames kept in memory: default 8 */ };   // read by V06 §2.2's history store and frame cache
  reroll: { keepChangeToggle: boolean };       // §13.4's fallback for "declared means held"; off until the test asks for it
  touch: { editFabric: boolean };              // §13.4's touch fallback: false hides the FABRIC and FINISH layers' edits on a coarse pointer
  generation: { stylePreset?: string; packs?: string[]; rung?: string; labels?: boolean };   // §7.6's userGlobal layer, folded into a new document's recipe
  recent: { docId: string; title: string; openedAt: number }[] }   // ≤ 20
interface LocalDocRecord {                      // store `docs`, key docId
  docId: string; title: string; rung: string; thumb: Blob /* 256 px PNG from the tile worker */;
  snapshot: Blob;                               // the last compacted `.plat` (§2.9's writer; model included)
  snapshotSeq: number;                          // the log head the snapshot holds
  bytes: number; savedAt: number; appVersion: string; outputVersion: string;
  deletedAt?: number }                          // set by Delete: the town sits in "Recently deleted" for 30 days with its snapshot and journal (V09 §5.12)
interface JournalEntry { docId: string; n: number /* journal order */; call: JournalCall;
  phase: 'pending'|'done';                     // pending: written before the call is sent; done: rewritten with the result (V09 §3.8)
  logHeadBefore: string; logHeadAfter?: string /* §11.3's logHead after the call; set when done */; seqs?: [number, number] /* the seq range it appended */; time: number }   // store `journal`, key [docId, n]
type JournalCall =                             // the API calls that change the log, recorded exactly as the shell sends them (V09 §3.8)
  | { api: 'edit'; events: EditEvent[] }        // with `fates` and `renames` filled when the user confirmed them (§11.2's resubmission form);
                                                // a fates-sheet `confirm(h, token, fates, renames)` is journalled in this form: its events with their fates and renames filled
  | { api: 'regenerate'; scope: Scope; mode: 'keep'|'newRandom'; discardEdits?: boolean }
  | { api: 'adjust'; param: string; value: unknown }
  | { api: 'undo'; of?: number } | { api: 'redo' }
  | { api: 'advance'; req: AdvanceRequest /* V06 §2.3 */; stoppedAfter?: number /* when Stop ended it: the epochs folded, its last epoch's `stoppedAt` */ }
  | { api: 'setView'; patch: Record<string, unknown> /* shared view keys only: restore points */ }
interface DraftMirror { docId: string; draft: Omit<Draft, 'state'>; savedAt: number; appVersion: string }   // store `drafts`, key docId
interface UnderlayAsset { hash: string /* SHA-256 of the bytes */; bytes: Blob; type: 'image/png'|'image/jpeg'|'image/webp' }   // store `assets`; the view key `underlay` holds the hash, opacity and frame
```

The standalone app is the file `DocResolver` of §11.5 over this store: `resolve(ref)` reads a `LocalDocRecord` (the
snapshot plus its journal, V09 §3.8), and it has no `publish`. Nothing in the store leaves the machine except by an
explicit export, share or download. **`appVersion`** (a record's and a mirror's) is read at open (V09 §3.1 (3) (c),
V09 §3.8): a `LocalDocRecord` written by a newer application version than the running one opens its snapshot read-only — view,
export and Download — with the strip `error.newerApp` and its **Reload** (the `reload` command fetches the newer
application), its journal kept unreplayed and untouched; a `DraftMirror` from another version is discarded with its note
(V09 §2.12). **Where IndexedDB is refused** (a private window, a storage policy) the store runs in
memory and the shell shows the persistent banner "This browser won't let the editor keep your town. Download it to keep
your work." with a Download button (never silent; V09 §3.8's ladder).
=== END ===

=== REPLACE ### 2.12 Lifecycle of every new state field ===
### 2.12 Lifecycle of every new state field

| state | create | read | persist | regenerate / re-derive | undo | migrate |
|---|---|---|---|---|---|---|
| `Draft` | pointer-down or a card pick with a tool active (V09 §3.3) | the mapper, the overlay, the badge | memory; mirrored as `DraftMirror` | a committed event underneath (another client, an epoch) re-previews it at its next settle | n/a (not in the log); Esc or cancel drops it | n/a |
| `DraftMirror` | every settle of a live draft | the open flow (V09 §3.1) | IndexedDB `drafts` | — | deleted on commit or cancel | a mirror whose `appVersion` schema differs is discarded with the note "Your unfinished drawing was from an older version and could not be restored." |
| `PreviewState`, `VariationSet` | each settle (V09 §3.3), each "Show three more" | the ghost, tray and badge | memory | a stale result (older `gen`, or `logHead` moved) is dropped and re-requested | n/a | n/a |
| `Selection`, `HandleSet`, `CountBadge` | a click, a list pick, a lasso; derived from the selected geometry; from the preview | the context panel, the overlay | memory | recomputed when the selected entity's record changes (a `doc.changed` naming it) | the selection survives undo when its ids still exist, else it clears | n/a |
| `HistoryRow` | derived from the log | the history panel, the context panel's History tab, `HostSlots.historyFilter` (V09 §1b) | never | recomputed per log change | — | the templates are keyed by event kind, one for every kind of the base and volumes 1–8, and for item 110's variants by their discriminating field (`drawWall.retaining`, `drawWay.raised`, `drawWay.aqueduct`, `terrace`, `setAttr.spans/use`, `setMassing.tiers`; V09 §4.10; T-V9-15's walker); a kind from a newer version renders "A change made with a newer version of the editor"; `lines` and `dossierGroup` are derived with the row (V09 §4.10) and never stored |
| `RestorePoint` (`restore/<id>`) | the Restore-point button; the auto rules of 2.8 | the history panel | the document's view section (shared) | unaffected (a log position) | deleting a point writes the key to `null`; a restore is itself undoable (V09 §3.9) | a point whose `seq` exceeds the log (a truncated log, §7.4) is shown "at the latest state" and re-pointed on the next save |
| view keys `thematic`, `workingLayer` (per viewer) | the view bar | the live providers, the tools | the document's view section; never over a bridge | — | not logged (view state); the previous value is one click away | an unknown value reads as the default (`none`, `ground`) |
| view key `underlay` (per viewer) | the dress panel's underlay picker | the compositor (§9.5) | view section (hash, opacity, frame); the image in `assets` | — | not logged | an absent asset shows "The tracing image is not on this computer" with a re-pick button |
| `siting.declared`, `siting.linkEdits` rows (map-side, declared; V11's tables) | `editTable` from the per-kind panel, the Shape tab, the link view, "Keep together", a clerk's accepted proposal | V11's resolver, S10b, the link binding, the split placement; the `why` and `links` answers | the log (events) | held by every re-derivation; a key that no longer resolves is orphaned and reported (V11 §4.4) | the inverse row operation | V11 §4.4 (row migration by keyed row operations, §7.6) |
| `ToolRow`, `MsgRow` (with its `buttons`) | our table versions | the shell, `@plat/docs`; the rows' `buttons` also volume 10's cards (V10 §3.5 step 3) | `@plat/tables` | — | — | additive rows; a removed key is refused by the loader while referenced — a `button.*` row while a row's `buttons` name it, a mode while a `tool` button names it |
| `AppPrefs` | first run (defaults), the settings screen, hint completion | the shell at boot and on change | IndexedDB `prefs` | — | the settings screen's "Reset" restores defaults; each change is one step back in that screen | `schema` bumped with a converter; an unknown field is dropped with a note in the about screen |
| `LocalDocRecord`, `JournalEntry` | the first commit of a new document; every commit (journal); compaction (V09 §3.8) | open, recent towns, crash recovery | IndexedDB `docs`, `journal` | compaction folds the journal into a new snapshot | the log's own undo; Delete moves the town to "Recently deleted" for 30 days (`deletedAt`) with Restore; it is removed only by "Delete now" there or by the storage ladder after asking (V09 §3.14) | a snapshot of an older output version opens by §2.9's steps (frozen view or replay) |
| `UnderlayAsset` | dropping or picking an image | the compositor | IndexedDB `assets` | — | removing the underlay keeps the asset until no document's view key names it (swept at boot) | — |
| `ClerkMount.host`, `ClerkMount.effectiveKey` (2.10) | the shell's mount of the clerk slot: `effectiveKey` from the view key and View as; in host mode `host` from the embed's bridge handler (V08 §3.1) | V10's harness (its session key, `HostProxyBackend`, the host proposal intake) | memory only; the transport's token never leaves memory (file f item 473) | a new `clerk.config` replaces the body (`onConfig`); a change of either key input fires `onEffectiveKey` | n/a (not in the log) | n/a |
| a host's proposal card in the card-only drawer (4.11) | a host's `preview { proposal }` through `ClerkMount.host.proposals` (V10 §3.17) | the drawer | memory; Accept commits its events as one group with `proposedBy: 'clerk'` (V10 §4.2) | re-previewed on a moved head, stale by V10 §3.11's rule; a newer host proposal or a built-in turn supersedes it (answered `dropped`) | the accepted group is one undo step; Drop leaves nothing | n/a |
| a clerk session's transcript | V10's harness (V10 §2.7) | the drawer; the export "Assistant conversation (JSON)" (V09 §5.10) | V10's: memory, or its device store only while keep history is on (V10 §3.15) | — | accepted proposals are ordinary log events with their undo | V10's |
| view key `showUnexcavated` (per viewer) | the Below group's toggle, at tier `secret` only (V09 §4.17.1) | S14's unexcavated style; a picture export at `secret` | the view section; never over a bridge to another client | — | not logged; toggled back | absent: `false`; a client below `secret` reads it as `false` whatever its value |
| `ViewOpts.viewAs` | the View as menu (V09 §4.8); a host's players' view through the embed's bridge handler (a key form) | §9.2's filter for this view; `effectiveKey()` — the `admitAs` of every band-less read (V09 §2.7), the clerk's session key, the export dialog's default knowledge | memory only (session-transient) | `onEffectiveKey` fires on every change; cached band-less answers are re-asked | the menu's previous value; a host's form is cleared only by the host (its toggle) | — |
| `WhyCardModel` | built from a `WhyAnswer` (V09 §2.7) | the why card, the chips, the drawer, the underground panels, item 110's panels (its `sections`) | never | rebuilt at every open and on `doc.changed` naming the subject | — | — |
| `Selection.stack`, `Selection.part` (4.20.8) | a click or a tap (file f item 466's answer) | the panel, T11 `name`, the context menu's "Select below" | memory | cleared when the part's or an entry's id disappears (`doc.changed`) | kept across undo when the ids survive, else cleared | n/a |
| the effects list (`PreviewResult.effects`, 4.20.7) | each preview and each `confirm` | the badge, the fates sheet's "What else changes", the live region, the clerk's card | never | dropped with a stale preview and re-requested | n/a | n/a |
| T4 `road`'s Raised toggle and Aqueduct chip (4.20.2) | T4's options strip, PageUp and PageDown while drawing | the mapper, the badge | memory only; never `AppPrefs`, never logged | — | reset to off each time T4 is picked (J-V9.73) | n/a |
| "Keep them as yours" (4.20.3) | T1 `intend`'s whole-town ghost card | the Re-derive's group | as declared `drawWay` events in the log | held (declared) | one undo with the Re-derive | — |
| a suppressing removal, as the app shows it (4.20.3) | a Delete of generated content of file f item 260's kinds — a raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06's `detail.suppress`), an island or sky access (V05's removed slots) | `info.remove.holds`, the history row, `ClerkMount.rebuildEvents`, the skeleton's export (file f item 455) | the log (the base's and V06's) | holds through Regenerate, scoped re-rolls, reloads and epochs (V06 §2.13) | undo lifts it; "Build it again" (and the clerk's Put it back, the same events) re-declares | an older document has none |
| `HostSlots.historyLines`' lines (2.2, 4.10) | a host change reaching this session — for SettlementForge a `party` value differing from the last one received, a new `partyPicturesAt` (V08 §3.1 step 7 (c)) | the history panel's group "The party" | never by the shell: the host's handler holds them in the session's memory, and a reload starts with none (the record keeps no reveal history beyond `party.prev`, V08 §4.6) | re-listed, with `list(effectiveKey())`, on each `onChange` and each `onEffectiveKey` (V09 §2.2) | none: not events, no Undo this — the host's own "Hide again" / "Reveal again" (V08 §4.2) | n/a |
| a copy saved in host mode (3.9) | an action that makes a new document, under `newDocuments: 'download'` | the user, opening the file in the standalone app (§2.9's load) | the user's device only (a `.plat` download); nothing in the frame, the host or a local store | — | n/a: the frame's document is untouched | the `.plat` reads by §2.9's steps |
| `attach.newMap` (2.10) | the drawer menu's Start a new map from this (standalone) | V10 §3.1 (4) | memory, for one message | — | Esc or the item again clears it before sending | n/a |
| view key `cvdVariant` (per viewer; 4.21.2) | the **Colour vision** chip (the view bar's Map group; Settings' Accessibility section) | the tile key and the sheet's checked variant (§8.2), the legend (§9.5), picture exports | the view section; never over a bridge | — | not logged; the chip's previous value | absent or unknown: `AppPrefs.cvdDefault`; a sheet without that variant draws its palette with its cues (§8.2) |
| §2.9's year position and its follow flag (per viewer; 4.21.7) | the **Season** control; with the flag on, §7.7's calendar row sets the week at open and at each absorb | §8.2's season rows, the export's season line, V10's explanation | the view section; never over a bridge; the model and its hash untouched in every week (item 117 (a)) | a new absorb moves the week only while the flag is on | not logged; the control's previous value | absent: the flag on with a dossier, midsummer standalone (item 117 (c)) |
| §2.9's festival display (per viewer; 4.21.8) | the festival list: follow · off · preview one festival | §8.2's decoration rows, the export's festival name | the view section; never over a bridge; model and hash untouched (item 118 (a)) | a festival no longer listed after an absorb falls back to follow | not logged | absent: follow |
| the History chip's choice (4.21.3) | T1 `intend`'s sheet | the `adjust` of the recipe's history option (§4.2 S0) | the log (a canonical `adjust`, the base's lifecycle row) | a Re-derive from S0 (whole town) | one undo with its Re-derive | the recipe's migration (§7.5) |
| the Colour vision, Season and festival controls' own state | the view bar | the three keys above | none of their own: each control shows its key | — | — | — |
| T2 `ground`'s **Spring-fed** toggle, T3 `wall`'s **Material** chip (4.21.1, 4.21.4) | the options strip | the mapper | memory, per tool for the session, as every option (V09 §4.2) | — | not logged; the event they shape is | n/a |
| the grandeur line (4.21.5) | derived from the draft's events and the ceiling table, per preview; the why card's `facts` row | the badge, the preview card, the why card | never | recomputed with each preview | — | — |
| the zoom-out stop (4.21.6) | derived from §8.8's limit for the map's `bounds` and the viewport | the zoom controls, Fit the town, the export frame | never | re-read at each `doc.changed` that moves `bounds` and at each resize | — | — |
| the progress view (4.21.9) | a one-time wait past `progress.showAfterMs` | the progress strip | memory, for the wait | — | — | — |
=== END ===

=== REPLACE ### 3.2 The empty state and a new town ===
### 3.2 The empty state and a new town

1. With no document routed, the app calls `generate({ seed })` with a fresh seed (V09 §3.13) and the recipe of §1.2's
   one-click default with the user's `generation` preferences folded in (§7.6). The complete city band is on screen within
   §12.5's first-map law (§1.2), framed by §9.5 inside the map's zoom-out limit (§8.8; item 116: the first view unchanged).
2. Over the map, top centre: the line "Change anything: click it." with three buttons — **Surprise me** (the dice;
   `intent.surprise`, §7.7), **Choose a kind of place** (opens T1 `intend`'s cards, V09 §4.5 T1) and **Open a town…** — and, once the
   first map has settled and the main thread is idle, the **Try another** strip at the foot: the six proxy thumbnails of
   §7.8 (the towns' own S0–S4 runs on six fresh seeds with the same intent), within §7.8's budget. Picking one continues
   that recipe from its committed S4 state (§7.8) and replaces the untouched town.
3. **The empty state lasts until the first declaration.** While the document's log holds only its creation prefix, the
   town is replaceable without a question: Enter, "Surprise me", a proxy pick, a T1 card change or an accepted creation
   proposal of the assistant (V09 §4.11) replaces it (an unscoped new town is the empty state's action only, R5; §7.3
   item 10), and nothing is written to the local store — an untouched town holds no declaration, so nothing of the
   user's is lost, and it is not added to Recent towns (J-V9.127). The
   first committed event makes the document a saved town (its `LocalDocRecord` is created, V09 §3.8), removes the empty
   state's overlay, and from then on Enter is **Same kind, new seed** — a NEW document with seed + 1 keeping the recipe
   (§7.1) — opened beside the current one in the recent list, never replacing it (in host mode by `HostSlots.newDocuments`,
   V09 §3.9). "New town" in the file menu likewise
   makes a new document.
4. The overlay line closes on the first click on the map and never re-appears for this browser once the user has
   completed any declaration (`hintsDone.tour`).
=== END ===

=== REPLACE ### 3.3 The declaration pipeline — gesture, draft, preview, ghost, commit ===
### 3.3 The declaration pipeline — gesture, draft, preview, ghost, commit

Every tool runs this one pipeline; the per-tool mapping from a draft to events is V09 §4.5's table (the **mapper**).

| step | input | output | constant (provenance) |
|---|---|---|---|
| 1 pointer-down (or a card pick, a paste, a key) | the active tool and mode, the working layer | a `Draft` in state `drawing` | — |
| 2 move | pointer samples (coalesced events, `getCoalescedEvents` where the browser has it) | the raw trace drawn at once on the overlay canvas; the snap candidate lit (V09 §3.4); readouts updated (length, area, height; R4) | raw trace ≤ 1 frame (V09 §6) |
| 3 settle | no pointer movement for `settleMs`, or pointer-up | `state = 'settled'`; the draft's points resampled and simplified by §7.1's authoring-boundary rule, snaps resolved into points | `settleMs` = 120 ms (§12.6) |
| 4 map | the settled draft | `EditEvent[]` by the tool mode's mapper row (V09 §4.5); a sugar event carries `expansion` = the running `sugar.json` version (§7.1); a `placeAt` from a point is written `plot: ''` with `from: { points: [p] }`, the dry run deriving and writing the plot — the nearest lawful one (§7.1; file f item 367; V10 §4.1's `where.at`) — and T6 `place`'s "this plot only" writes the plot under the point (V10 §4.1's `where.plot`), so the canvas and the clerk emit the same bytes (T101-3) | — |
| 5 preview | the events | `preview(h, events, { view, variations? })` (§11.2; file f item 461 for variations) with `gen += 1` | one preview in flight per draft; a newer settle cancels the older request's delivery (latest wins, §12.6) |
| 6 ghost | the `PreviewResult` whose `gen` is the latest | `live.ghost` drawn (§8.2), handles (V09 §3.5), the count badge (V09 §2.5) with its effects count (file f item 465; V09 §4.20.7), the bend line when `bent` is set, the refusal card when `status: 'conflict'` | delivery ≤ 3 ms (§12.6) |
| 7 commit | release (commit-on-release tools) or Accept (accept tools; V09 §4.5's column) | `edit(h, events)` — for a variation, its committed group (V09 §3.6) — with `fates` / `renames` filled from the shown preview (§11.2's resubmission form); the journal's `pending` entry is written first (V09 §3.8) | — |
| 8 settle the result | `ApplyResult` | `ok`: the draft closes, the ghost clears, the journal appends (V09 §3.8), a toast names the change with Undo; `confirm` (the state moved since the preview): the fates sheet (V09 §5.5) with the fresh list; `conflict`: the refusal card | — |

**Commit on release or accept.** A tool whose gesture draws the thing itself — a wall or road stroke, a terrain or field
brush stroke, a handle drag, a label drag, a shape drag, a lock — commits on pointer-up (R1: the real thing on release),
unless the preview lists a fate other than *kept*, a rename, or an effect on something beyond the thing itself
(V09 §4.20.7), in which case release leaves the ghost pending with the badge's fate and effect counts and the Accept button
reads "Accept — {n} of your changes move" (or "Accept — {n} other changes" when only effects are listed). **A Delete** is
previewed by the same rule (V09 §4.20.3; J-V9.63): it commits at once only when its dry run lists nothing beyond the thing
itself. A tool whose result is chosen — a
quarter's size, a place's site, a roster's sites, a fill's variation, any clerk proposal — leaves the ghost pending with
**Accept** (Enter) and **Cancel** (Esc). A pending ghost is **accepted implicitly** when the user starts any other gesture
or picks another tool (the ghost was what they asked for; undo takes it back), and cancelled only by Esc, Cancel or undo
(J-V9.3). No dialog opens before a gesture's first ghost (R1). **T1 `intend` after a declaration** (J-V9.43): a card or slider
change is a Re-derive (§7.1), so its ghost is a whole-town preview of the `adjust` event — the progress view shows past
`progress.showAfterMs` (V09 §4.21.9), since §12.5's model law passes 1 s at the upper rungs — with the badge's fate counts ("Rebuilds from
{stage}: {n} of your changes are kept, {m} move"); **Accept** commits, and the fates sheet (V09 §5.5) opens only then, and
only when the dry run lists fates other than *kept* or renames. Esc restores the previous value; nothing is written until
Accept.

**Refused and bent.** `bent` (R2) draws the ghost normally and adds one line under the badge in the `bend` tone ("The wall
follows the ridge, 40 m off your line"). `conflict` draws the refusal card (V09 §5.3) at the draft's last point: the plain
reason and the row's buttons (V09 §2.9's `MsgButton` list, V09 §4.9's button column) — a `commit` from a `ConflictAction`
carrying that action ("Unlock", "Put it at {site}" at its `target`, "Remove the assignment"), each a new draft or event;
the draft stays open so the user can adjust. A refusal is never a
modal, and every card carries at least one action — at the least **Show me why**, the last button of every `refuse.*`
row, which opens the why card or the page that explains the limit (V09 §4.9; J-V9.44). Where the dry run can name the nearest lawful alternative, the engine returns
a bend instead of a conflict, and the alternative is pre-selected on the card, one click away.

**When the world moves under a pending ghost** (an epoch, a host's `doc.apply`, a clerk's accepted proposal in another
panel): the preview is re-requested at once with the same draft; the ghost dims until the fresh result lands.
=== END ===

=== REPLACE ### 3.4 Snapping and free placement ===
### 3.4 Snapping and free placement

The feature snap of §9.5 answers from the tile worker's `RoleIndex.snap` within one frame, the unsnapped point shown until
the answer arrives. **On the Sky layer** every tool point, handle drag and hit test is un-displaced before it is snapped or
resolved: under §8.4's `offset` occlusion the drawn island stands displaced by `elevation × offsetPerMetre`, so the world
point is the screen point's ground position less that island's offset vector, then read in the island's frame by its
anchor (V05 §4.1, V05 §5.2) — a click on a lifted island's drawn house selects that house, and a stroke drawn on the
drawn island lands on the island's own arena. Each tool mode asks for its own candidate roles (file f item 517 adds the
role filter and the returned role):

| tool mode | snaps to (in priority order when two are within the radius) |
|---|---|
| T3 wall | enceinte ends and wall vertices; **natural-barrier edges** — sheer and steep cliff edges, gorge rims, deep-marsh edges and shorelines (item 106 (a), (g)); ridge and slope-break lines; road crossings |
| T4 road | junction vertices; gates; way centre-lines (the point lands on the line and splits it at commit, §7.1); piers and quays; shore points (a road to water) — with Raised on, the next row instead |
| T4 `road` with **Raised** on, or the **Aqueduct** chip (V09 §4.20.2) | **the two ends only**: junction vertices, way centre-lines (the end splits that way at commit, making a ground vertex) and plot frontage points; an aqueduct's first point also springs and river reaches, its last also squares, fountain and cistern pins and `conduit_house` plots; interior points snap to nothing on ground part 0 and never split a way they cross; Shift's 15° rule still applies |
| T3 `wall` **Retaining wall** (V09 §4.20.1) | slope-break and contour lines; the ends of existing retaining walls; plot boundaries; street centre-lines — never a natural-barrier edge (a retaining wall closes no circuit) |
| T2 `ground` **Terrace** (V09 §4.20.1) | none (a brush); the level is the ground height under the pointer-down point, shown as a readout |
| T5 quarter (corner and lasso points) | street centre-lines; shores and banks; walls; ridges |
| T2 `ground` river source and mouth, harbour shore point, lake point | the shore or bank for a mouth or a harbour; terrain peaks and saddles for a source; none for a lake's point, a spring-fed one included (V09 §4.21.1) |
| T6 place | the plot under the point (the plot is the snap: its outline lights); on a deck, the deck plot under the point, and for a tower or fort stamp a mole's landmark slots ("Mole head", "Mid-mole") and a long bridge's mid-span slot (V09 §4.20.4; file f item 246) |
| T9 shape drags | the footprint's own plot edges and neighbours' party walls (§3.6's attraction does the rest) |
| handle drags | the same roles as the tool that made the thing |
| the ruler (§9.5) | way centre-lines, face edges, vertices (unchanged) |

The candidate edge lights in the `snap` overlay colour (V09 §5.1) with a small label of its role ("Cliff edge", "Main
road", "Shore"). Holding **Alt** (on touch: the second-finger tap-and-hold, V09 §4.12) places freely; the free flag goes
into `Draft.free` and the point is not snapped. **Angles.** Holding **Shift** while a points form or a line is drawn snaps
the current segment's bearing to 15° steps from model north (after the feature snap; a snapped end keeps its feature and the
segment's bearing is the one that results), and the readout adds the segment's bearing ("N 45° E · 120 m"). **Right-click
while drawing** removes the last point of a points form or line (Backspace does the same); outside a drawing it opens the
context menu (V09 §4.4). The snap is resolved into the event's points before the dry run (§9.5),
and the kernel's attraction (§3.6) still applies. The radius is `AppPrefs.snapRadiusPx` (default 8 px, §9.5), scaled to
22 px under a coarse pointer (a finger's contact area; J-V9.9).

**The wall tool and natural barriers (item 106 (g)).** While a wall is drawn, the tool asks the dry run for the trace with
its arcs typed (file f item 462 adds `arcs` to `PreviewResult`): each arc of the derived circuit is `walled` (a curtain of a
defensibility grade — full, light, closure-only, item 106 (c)) or `barrier` (closed by a cliff, gorge, marsh or shore,
item 106 (a)). The ghost draws walled arcs as the wall ghost and barrier arcs as a dashed line along the barrier with
small closing ticks, labelled in the badge: "walled 1.8 km · closed by cliffs 0.9 km". The districts the ghost circuit
would enclose are tinted with the thematic veil at α 0.15, and the badge names them ("encloses Old Town, Tanners' Row and
the Harbour") — §14's T3 `wall` row. A stretch's end that snapped to a
barrier edge is drawn with an anchor-tower ghost (item 106 (a)'s tower at each anchor). Releasing near a barrier within
`wall.barrierReachM` (item 106 (b)) shows the reach ghost — the spare ground the trace takes in, tinted as gardens — and
the bend line says "The wall reaches the cliff; the ground between becomes gardens." A drawn line that would cut a
waterfront off from the water is bent to the nearest lawful circuit (a quay front or sea gates, item 106 (d)) and the
bend line names it ("Kept the harbour open with two sea gates").
=== END ===

=== REPLACE ### 3.6 Variations ===
### 3.6 Variations

A derived fill offers three versions (R5; §7.3 item 10), and a clerk proposal offers its real alternatives. One preview
contract serves both (file f item 461, merged with file f item 470 (b); J-V9.41):
* **The four derived sources** — T8's `fill`; T8's density, greenery and prosperity brushes; a scoped New random (T10 `hold`'s
  button "Try again", shift+click, the New random brush of V09 §3.7); a T5 quarter's fabric — call `preview(h, events, { view,
  variations: 3, page })`. It returns `previewId` and `variations: { event, result }[]` for §7.3 item 10's three overlays,
  each `event` the resolved event with its absolute reroll map; the generation worker keeps the overlays until the draft
  commits or cancels.
* **A clerk proposal's variations** are separate event lists (V10 §2.5), never rerolls of one preview: each is previewed by
  its own call (`ClerkHandle.focus`, which runs V10's `Variation.preview`), its thumbnail tied to that preview, and the tray
  shows V10's `label` under each ("as asked", "next best site", "a larger quarter"); one ghost at a time.

**Thumbnails.** `thumbnail(h, { previewId, variation, box, px })` returns the tile worker's export-class raster of that
preview's overlay ghost marks at the scope's bounding box, 160 × 120 CSS px. `[` and `]` or a tap cycle the focus, and the
focused variation is the one drawn as `live.ghost`. **Show three more** asks for page + 1, whose rerolls continue past the
last used (§5.1 (6)'s advance, within `reroll.maxAdvance`). Declared entities are kept in every variation (§7.2), and the
tray says so under the thumbnails when any are in scope: "Your {n} declared things stay in all three."

**What Accept commits, per source** — one group, one undo step, replaying to the accepted variation's digest (T-V9-7):

| source | the committed group |
|---|---|
| a `fill` | [`fill`, `regenerate { scope: the fill's resolved scope, mode: 'newRandom', rerolls }`] |
| a density, greenery or prosperity brush | [`setField { field, stroke }`, `regenerate { scope: the blocks the dry run re-derives past τ, mode: 'newRandom', rerolls }`] |
| a quarter's fabric | [`quarter`, `regenerate { scope: the new district, mode: 'newRandom', rerolls }`] |
| a scoped New random | the `regenerate` alone, with its rerolls |
| a clerk variation | that variation's own events, committed by the harness (V09 §2.10) |

`rerolls` is the focused variation's absolute reroll map. Variations are dropped from the worker on commit or cancel.
=== END ===

=== REPLACE ### 3.7 New random on a scope ===
### 3.7 New random on a scope

Every New random (§7.1's named action) is scoped (R5; §7.3 item 10). Its control is one button, labelled "Try again" (its
catalogue row), in the context panel of any
selection and in the tray, with a scope chip row: **this building** (a building's rung, `regenerate` with `rung`), **this
block**, **this quarter**, **this lasso** (the selection's `scope`), on the Below layer **this run** (a tunnel run) and
**this system** (an underground system; V04 §1b.3). A layer's `rerollLayer` is never a New random scope, since `rerollLayer`
is not T10 `hold`'s (§7.1's T10 row): new names are T11 `name`'s **New names** with its scope (these, this
quarter, the town; V09 §4.3's T11 row), and new trees are T12 `dress`'s **New trees** (`rerollLayer { concern: 'render.instances' }`,
town-wide; V09 §4.3's T12 row; J-V9.101), and the drawing's small random touches and tree crowns are T12's **New decoration**
(V09 §4.5's T12 row; J-V9.115). **The New random brush** (T10's third mode; §14's T10 row): the blocks the
stroke passes over, each block whose area the brush's footprint covers by at least 20 %, form the scope; held things under
the brush dim to show they will stay; release previews three variations (V09 §3.6) and Accept commits the scoped
`regenerate`. **Held things are marked** while T10 is active and while a New random ghost shows: a small pin glyph (12 px, in
`tier.declared`) at the anchor of every declared or pinned thing in view, and a lock glyph on locked ones. Shift+click (§14) is New random on the clicked
entity's own scope with the kind kept. T10's **keep these, re-roll the rest**: the user lassos a scope, clicks the things to
keep (each click toggles a pending lock, drawn as a lock ghost), then New random — committed as one group: the `lock`
events, then `regenerate { scope, mode: 'newRandom' }` with the variation chosen (V09 §3.6); one undo step. The dry run's
fates list names every declared or locked thing *kept* and every name it re-draws; the "keep / change" toggle of §13.4's
fallback, when `AppPrefs.reroll.keepChangeToggle` is on, adds per declared entity in scope a chip "Change this too", which adds an `unpin` of that entity
to the group before the regenerate; the entity is derived from then on, and the fates list says so.
=== END ===

=== REPLACE ### 3.8 Autosave, compaction and crash recovery (R15) ===
### 3.8 Autosave, compaction and crash recovery (R15)

1. **Journal, in two phases** (J-V9.45). Every API call that changes the log — `edit` (a fates-sheet `confirm` among them,
   journalled in its resubmission form: the events with their fates and renames filled, §11.2 *Confirming fates*),
   `regenerate`, `adjust`, `undo`, `redo`, `advance` (V06 §4.1's whole group of epochs, one entry) and `setView` of a
   shared restore-point key — is appended to IndexedDB store `journal` as a `JournalEntry` (V09 §2.11) **before** the call
   is sent, in phase `pending` with the `logHead` before it, and rewritten in phase `done` with `logHeadAfter` and its
   `seqs` when the result is `ok` — for an `advance` that **Stop** ended, also `stoppedAfter`, the epochs it folded; a
   `conflict` or a cancelled confirmation deletes the pending entry. The pending write is issued in the same task as the
   call (the structured clone ≤ 2 ms, V09 §6.5); the next gesture never waits for either write; a write failure takes
   V09 §3.14's storage ladder.
2. **Compaction.** When the journal holds 50 `done` entries past the snapshot, or 60 s pass without a commit after at
   least one entry, or the page is hidden (`visibilitychange`), or an `advance` has just been written `done`, the app asks
   `export(h, 'plat')` (§2.9's writer; model included) in the generation worker and replaces `LocalDocRecord.snapshot`,
   then deletes the journal entries up to `snapshotSeq`. It **runs only when idle** (V09 §6.5): no draft, preview, export
   or `advance` pending and the pointer still for at least 2 s — or at once on `visibilitychange` hidden and after an
   `advance`'s `done` write, so a group of epochs never waits for idle; a compaction due while an `advance` runs waits for
   that write, so a snapshot never holds part of a group. A gesture started while a compaction runs shows the working
   ring on its badge until the preview arrives. The snapshot drops every `null` view key whose Lamport stamp is older than the
   snapshot (deleted restore points). Compaction runs under the role's knowledge key, whatever "View as" shows (V09 §4.8).
   Constants: 50 entries, 60 s, 2 s (our own; calibrate-later by the M2a autosave measurement, V09 §6).
3. **Recovery.** Opening a town reads its snapshot through `open` and re-issues the journal's calls past `snapshotSeq` in
   order. The engine is deterministic (§6), so each `done` call must reproduce its recorded `logHeadAfter`; a trailing
   `pending` call — the tab was killed between sending it and recording its result, possibly after the worker had
   committed it — is re-issued from its `logHeadBefore` and its result accepted and recorded. An `advance` is re-issued
   with its request from its `logHeadBefore`: a `done` one must reproduce its `logHeadAfter`, as every `done` call must,
   and one that **Stop** ended is stopped again after `stoppedAfter` epochs — the shell calls `cancelAdvance` when the
   job's `onProgress` (§11.2) reports epoch `stoppedAfter` running, and V06 §4.1's job ends after the running epoch; a
   trailing `pending` one (the tab killed mid-group, the epochs it had folded lost with the worker) is re-issued whole.
   The first mismatch stops
   recovery there, keeps the unreplayed calls in the record's quarantine (downloadable as a JSON file from the history
   panel), and says "Recovered your town up to {time}. {n} later changes could not be replayed." Nothing is discarded
   silently. A clean recovery says nothing.
4. **Times.** `JournalEntry.time` gives the history panel its times for the seqs each call appended (`seqs`); events that
   reached the document elsewhere show no time (J-V9.6).
5. **Leaving.** Closing the tab with a journal write pending triggers the browser's "leave site?" prompt only while a
   write is actually outstanding (typically < 50 ms); otherwise leaving is silent, because everything is already saved.
6. **Host mode.** With `ShellMode = 'host'` the local store is off: every commit reaches the host through the bridge, and
   the host is the store (§11.3; V08 §3.7); only the draft mirror stays local, keyed by the host's document id.
=== END ===

=== REPLACE ### 3.9 Undo, redo, restore points and "open a copy from here" ===
### 3.9 Undo, redo, restore points and "open a copy from here"

* **Undo and redo** are `undo(h)` and `redo(h)` for the document's session (§7.4): the top bar's two arrows, ctrl / cmd+Z
  and ctrl / cmd+shift+Z (§14). A target that is not undoable — a creation event, a dossier event, an epoch that carried
  one — is skipped by §7.4's target rule; when the latest live event is one of those the Undo button's tooltip says
  "Changes from SettlementForge can't be undone here" (host mode) or "This is where the town began" (the creation prefix).
  A dependent-event conflict (§7.4 independence) cannot arise in a standalone document with one session; over a bridge the
  refusal card names the dependent events and their authors.
* **Go back to here** (a row or a restore point in the history panel, owner role): the app computes the live events after
  the chosen seq, stops at the latest one that is not undoable (a restore to before it is refused: "The town can go back
  only to {time} — SettlementForge changed it after that."), writes an auto restore point "Before going back to
  {name}", and sends one `edit` call carrying an `undo { of }` event for each remaining live event, in reverse log order, all with
  one `group` (§7.1) — undoing in reverse order makes every step independent (§7.4). The toast offers "Undo going back",
  which sends the matching `redo { of }` events (each naming its undo's `seq`, newest first) as one group while the redo
  stack is intact; any new change clears it (§7.4), and the auto point then remains the way back (through "Open a copy
  from here"). **Its cost** is the sum of the targets' undo-record costs (each O(its scope), §7.4), so going back a few
  hundred edits at METROPOLIS can take seconds: past `progress.showAfterMs` the progress view (V09 §4.21.9) counts the
  events undone of the total (`progress.undo`), the map stays pannable and viewable, the tools wait, and the toast's "Undo going back" is the way back (the
  call is one group, so it is not cancelled midway).
* **Re-run from here** (owner role; a history row, a chronicle row or a restore point, offered when epochs or dossier
  events follow it): `rerunFrom(h, seq)` (V06 §4.4) — a NEW document, the log prefix through `seq` with every later epoch
  and dossier event re-appended in log order and recomputed — opened in a new tab and added to the recent list; the
  current document is untouched. The toast says "Opened a copy from {name} and re-ran the town's history after it. Your
  later hand edits are listed there to re-apply." and the new document's report lists each such edit with V06's
  **Re-apply**. A dossier-bound document's copy is detached (V06 §4.4), and the toast adds "It no longer follows
  SettlementForge." Before a rebase point both take the earliest seq they can, with volume 6's line (V06 §3.15.5;
  J-V6.98) — see *Before a rebase point* below.
* **Open a copy from here** (a row or a point): `forkAt(h, seq)` (V06 §4.4, file f item 458) makes a new document with the same
  recipe and the log prefix through `seq`, opened in a new tab of the app and added to the recent list — the way to keep
  both a past state and the present. From the past view (V09 §5.6) it takes the seq of the frame on screen; on a
  dossier-bound document `refuse.dossierClock`'s what-if copy takes the head, detached (V06 §2.3, V06 §4.4).
* **Before a rebase point** (J-V9.122). On a rebased document (§2.9's `Base`) a `seq` below `base.seq` is never
  refused and no control is disabled: `forkAt` and `rerunFrom` bend to the earliest seq they can take (V06 §3.15.5; V06 §4.4;
  J-V6.98) — from a history or chronicle row, a restore point's items and the drawer's `fork` and `rerun` buttons
  (V09 §4.11) alike. The app knows the bend from the new document's `forkedFrom.seq` (V06 §4.4), which then exceeds the seq it
  asked for, and adds `info.copy.condensed` — V06 §3.15.5's line, "history before year N was condensed; the copy starts at
  year N", `{year}` the year of the rebase point's week (§2.9's `Base`) — as the new document's opening toast: after the
  re-run's own ("Opened a copy from {name} …"), alone for a copy, and in host mode after `info.copy.saved` (and
  `info.copy.rerunEdits`).
* **In host mode a new document is saved, never opened** (J-V9.92). The frame holds one live document and
  has no local store, recent list or app tab (V08 §3.1 step 6; V09 §3.8 (6)), so every action that makes a NEW document —
  **Re-run from here** and **Open a copy from here** (the history and chronicle rows, the restore points' menu items,
  `refuse.restore.dossier`'s button, the past view's `info.past.viewing`), `refuse.dossierClock`'s what-if copy, the drawer's `fork` and `rerun` buttons (V09 §4.11), Enter's **Same kind, new seed**
  (V09 §3.2 (3)), `ClerkMount.openNewDocument` and a document without `model`'s **Open its recipe with this version**
  (V09 §3.14 (c)) — follows `HostSlots.newDocuments`. With `'download'` the app makes the
  new document as above (`rerunFrom`, `forkAt`, `generate` with seed + 1, or V09 §3.14 (c)'s recipe and log), writes it with `export(h, 'plat')` under the
  role's key (§11.1 *Knowledge*: a copy is the document, not a picture, so View as does not lower it) to the user's device
  through the frame's download (V08 §5.4 (2): `.plat` is the user's format, never the host's), named `{town}.plat` from
  the new document's name by V09 §5.10's rule, and releases it with `close(h)` (§11.2) without opening it in the frame: the
  frame's document and its log are untouched and nothing is added to a recent list. The toast is `info.copy.saved`
  ("Saved a copy to your computer as {file}; it does not follow {host}.", `{host}` from `HostSlots.hostName`; a
  dossier-bound document's copy is detached, V06 §4.4), and after a re-run it adds `info.copy.rerunEdits` ("{n} later hand
  edits were not carried; they stay in this map.", `{n}` from the re-run's list of edits to re-apply, which the frame does
  not show). A refused write takes V09 §3.14's export row, the new document released. Where the role's key is below
  `secret`, at which §11.1 offers no `.plat`, and with `'off'`, those controls are not drawn — the rows' and points'
  buttons, the refusal card's button, the past view's and the what-if copy's buttons, the drawer's `fork` and `rerun` buttons, `error.frozen.noModel`'s **Open its recipe
  with this version** — and Enter with nothing pending does
  nothing. In either setting the drawer's **Start a new map from this** is hidden and no turn enters creation mode
  (V09 §4.11).
* **Name a restore point**: the history panel's "Mark this moment" writes `restore/<id>` at the current head with the typed
  name (default "Restore point {n}").
=== END ===

=== REPLACE ### 3.14 Failure ladders ===
### 3.14 Failure ladders

| failure | detected by | ladder (in order) | what the user sees |
|---|---|---|---|
| the generation worker or the tile worker dies | the worker host's `error` / heartbeat (none for 5 s while work is pending) | (1) restart the workers; (2) reopen the document from the local store and journal (V09 §3.8); (3) if the restart fails twice, the read-only picture of the last composed tiles with a Download button for the saved `.plat` | "The map engine restarted. Nothing was lost." — or, at rung 3, "The map engine could not restart. Your town is saved; download it or reload the page." |
| a preview slower than its budget | `receivedAt − requestedAt` > 1 s | (1) the badge shows a small working ring; (2) past 10 s the preview is cancelled and the tool switches to preview-on-release for the rest of the session (§12.6's pre-decided fallback) | "Big change — the preview will show when you let go." |
| a confirm token went stale | `confirm` returns a fresh `confirm` (§11.2) | re-show the fates sheet with the new list, highlighting what changed | "Something changed while you were deciding. Here is the new list." |
| storage quota exceeded or a write refused | IndexedDB `QuotaExceededError` or a transaction error | (1) compact now; (2) offer to empty "Recently deleted" and to remove the thumbnails and underlay images of towns not opened in 90 days (each asked, never silent); (3) pause the journal and show the Download banner | "Your computer is out of space for saved towns. Download this town to keep it." |
| IndexedDB unavailable | open of `plat-app` fails | memory store for the session with the persistent Download banner (V09 §2.11) | as V09 §2.11 |
| a snap answer later than a frame | the tile worker's query | the unsnapped point stays shown until it lands (§9.5) | nothing |
| a raised or aqueduct course longer than `raised.previewOnReleaseKm` (V09 §4.20) | the stroke's length at settle | that stroke previews on release only (V09 §6.1), the badge's working ring while the solver runs; nothing commits before Accept | "Big change: the preview will show when you let go." (`error.previewSlow`) |
| an export fails | the worker's error | the partial bytes are dropped (no file written); Retry | "The export stopped: {reason}. Nothing was saved. Retry?" |
| the clerk is unreachable, its key refused, or its month's cap reached | V10 §3.19's ladder, reported as the turn's `outcome` and its `RefusalView` (`offline`, `key`, `budget`) | the drawer shows the refusal card with the actions V10 §3.16's row offers (`openSettings` for `key` and `budget`, none for `offline`); every other tool is unaffected | the card's text is V10 §3.16's row under `refuse.clerk.offline`, `refuse.clerk.key.<keyState>` or `refuse.clerk.budget` (V09 §4.9's sources paragraph; one row for an unreachable clerk, E-32); at the cap the meter's foot line is `clerk.cap.reached` (V09 §4.11) |
| a gesture starts while a compaction runs | the worker's queue | the badge's working ring until the preview lands (V09 §3.8 (2)) | nothing more |
| (a) a document of an earlier output version **inside the retention window** (the running version's N−1 or N−2) | §2.9 step 3; §6.4 | the document opens, verifies and edits under its own output version — the retained packages' lazy chunk (V09 §3.1 (1)) — and the owner is offered the upgrade: standalone, the strip `info.upgrade.offer` at the map's top, whose **See what changes** shows §7.5's diff (the engine's `migrate`, §14's `EditEngine`) in the fates sheet's form (V09 §5.5; an auto restore point first, V09 §2.8) and commits the `upgrade` event on **Do it**, while **Not now** keeps the old model (§7.5) for this session, the offer returning at the next open; **in host mode V08 §4.2's "Update the map engine" is that offer and the shell draws none of its own** — one event, one control (J-V8.94; J-V9.96) | `info.upgrade.offer` (standalone, owner; no strip in host mode) |
| (b) a document of an output version **outside the retention window, with its `model`** | §2.9 step 2 | the **frozen view** — view and export only, each chunk checked by its content hash and never root-checked (§2.9 step 2) — labelled by the shell's own `error.frozen` strip at the map's top in both modes (J-V9.97), with the CLI command that replays and checks it under its own output version (§6.4) as a copyable line beneath it; the strip's one control, for the owner, is **Edit it with this version**: the `rebase` event with reason `frozenImport` through `edit` (§11.2; the engine's `rebase`, §14's `EditEngine`, computes its `stateDigest` and `version`, §2.9 step 2), whose dry run returns `confirm` with the renames (§7.4's rebase row), shown in the fates sheet (V09 §5.5) and committed on **Do it** — in host mode through `doc.changed`, the client then sending `doc.snapshot`, as V08 §4.2's upgrade row does; from then on the document edits under the running version, and the rebase's undo (§7.4) returns the frozen view. A chunk that misses its content hash at load: its partitions drawn marked, the strip `error.frozen.damaged`, no **Edit it with this version**. A refusal found at the rebase — its records root differing from `model.recordsDigest` (damage), or a pack that neither `packs` nor the running version's shipped packs hold, or one past §2.9's 2 MB cap (§7.5) — commits nothing and turns the strip into `error.frozen.damaged` or `error.frozen.pack` | `error.frozen` (the Edit control for the owner only; an editor sees the command alone) · `error.frozen.damaged` · `error.frozen.pack` |
| (c) a document of an output version outside the retention window **without `model`** (only the CLI writes one, §2.9) | §2.9 step 2 | no frozen view can be drawn: the town on screen stays (nothing is replaced; in host mode the frame's map region is empty) and the strip `error.frozen.noModel` shows the CLI command beneath it; its **Open its recipe with this version** makes a NEW document from the file's recipe and log as §6.4 opens a link made with another output version — `generate` from the recipe, then the log's events through `edit` (V09 §3.1 (3) (a)) — with §6.4's notice `error.linkVersion`, opened beside the current one (standalone) or, in host mode, under V09 §3.9's host rule: saved to the device and never opened (`'download'`), not drawn with `'off'` (J-V9.96) | `error.frozen.noModel`; then `error.linkVersion` |
| a load mismatch (§2.9 step 4) | load verification | the owner chooses: keep the saved town (a `rebase`) or take the replayed one | "This saved town differs from what its recipe rebuilds. Keep the saved town, or use the rebuilt one?" with the differences counted |
| a skeleton or file the loader refuses | `open` / `generate` errors | nothing is replaced | "This file can't be opened: {reason}." |
| a local town saved by a newer application version (V09 §2.11) | `LocalDocRecord.appVersion` above the running one at open | the snapshot opens read-only (view, export, Download); the journal kept unreplayed; **Reload** fetches the newer application | `error.newerApp` |
=== END ===

=== REPLACE ### 3.16 Edges — every mechanism at its limits (principle (11)) ===
### 3.16 Edges — every mechanism at its limits (principle (11))

Each row states the outcome, the failure rung (§5.1's ladder: check, repair locally, retry that piece, simpler shape,
substitute, leave out and report — never a whole-map retry, and in the application never a lost edit) and the test;
T-V9-80 is the edge suite, one scripted fixture per clause named by its row number. Three rules hold everywhere and the
rows name only what they add:
* **Degenerate geometry (E4).** The application draws no model geometry: every gesture reaches the model through the
  dry run. The settle (V09 §3.3 step 3) merges coincident points and drops zero-length segments by §7.1's
  authoring-boundary rule; a draft left with fewer points than its form needs (a line of one point, a lasso of two, a
  zero-area box) sends no preview — the draft stays open and the readout says what is missing (`edge.morePoints`); any
  other degenerate shape (self-touching, collinear, a sliver) reaches the dry run, whose kernel refusal (`E_DEGENERATE`,
  `E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT` …) returns as its bend or its F-EDIT row (V09 §4.9) — never a crash, a hang or a
  blank (repair locally; T-V9-80 (1), T-V9-14); an edit the dry run resolves to nothing (§7.1's *Empty edits*) commits
  nothing, its readout naming why (`edge.nothingToApply.<form>`; T-V9-80 (1)).
* **Every rung (E6).** Every screen and tool works from THORP to the METROPOLIS cap; the only rung gates are those the
  base and the volumes rule — the Sky layer at CITY and METROPOLIS with islands, **New catacomb** at TOWN and above, the
  size chips' bands, the village rungs' modes (V07 §4.1), the History chip's rungs above the town's own — each shown
  disabled with its reason, never hidden without one (check; T-V9-80 (2) runs every screen's script at THORP, VILLAGE, TOWN,
  CITY and the cap).
* **Save, load, undo, redo, regenerate, migrate (E8).** A logged edit's lifecycle is §7.4's; every state this volume adds
  has its V09 §2.12 row; a view key survives save and load and is never undone (T-V9-45); session state is dropped on
  reload, the draft mirror excepted (V09 §2.4).

**(a) Data, state and flows (V09 §2, V09 §3)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 3 | `toolkit.json` (V09 §2.3) | a missing, duplicated or unknown row, mode or param; a `values.table` naming no table; a key binding id absent from `keymap.json` | the loader refuses the package at build (CI), never at run time; a shipped row whose table has no rows shows its param disabled with `edge.nothingToChoose` | check | T-V9-12; T-V9-80 (3) |
| 4 | `Selection`, `HandleSet`, `CountBadge` (V09 §2.5) | a selected id tombstoned by another client or an epoch; an empty `PreviewResult.counts`; a `stack` whose entries vanish | the selection drops the id (cleared when none remain) at the `doc.changed` naming it; the badge shows "0 plots · 0 households · 0 buildings"; the stack re-asks at the next click | repair locally | T-V9-80 (4) |
| 5 | the map-side declarations (V09 §2.6) | a row whose key no longer resolves; an empty `familyWeights`; a cell V11 §4.2 does not declare for its key form | orphaned and listed in the history panel's orphans (V11 §4.4); absent weights read 1; the screen cannot write it (T-V9-25), an imported one is dropped by V11's loader with its note | leave out and report | T-V9-25; T-V9-80 (5) |
| 6 | `WhyCardModel` (V09 §2.7) | an answer with no `cause`, no pulls, no drivers, no sections; a `WhyAnswer` for a tombstoned subject | `decidedBy` "The rules made it"; the bars and sections omitted, never an empty heading; a tombstoned subject closes the card with `edge.removed` | substitute | T-V9-65; T-V9-80 (6) |
| 7 | `HistoryRow`, restore points (V09 §2.8) | an event kind with no template; a restore point past the log head; 20 auto points reached; 200 named points reached | a build failure (T-V9-15), never a code on screen; the point reads "at the latest state" and is re-pointed on save; the oldest auto point is dropped; a 201st named point asks `edge.replaceOldest` | check | T-V9-15; T-V9-80 (7) |
| 8 | the clerk slot (V09 §2.10) | no clerk configured; a `clerk.config` with no transport; `onEffectiveKey` firing mid-turn | no Assistant button, and nothing of the drawer runs; mode `off` until a valid config; the turn ends and V10 §3.12 (6) clears it (`clerk.view.cleared`) | check | T-V9-27; T-V9-40; T-V9-80 (8) |
| 9 | the local store (V09 §2.11) | IndexedDB refused; the quota full; a record from a newer version; a record with no snapshot | memory-only with `error.storageNone`; the storage ladder with `error.storageFull`; read-only with `error.newerApp`; the record listed with `edge.unreadable` and Download of its journal | substitute | T-V9-17; T-V9-80 (9) |
| 10 | boot and open (V09 §3.1) | a permalink at every rung; a file that fails the fingerprint; a file of each output version; a crash between the worker's commit and the journal's `done` | every rung opens by the same route; `error.openRefused`; V09 §3.14 (a)–(c); recovery replays to the last committed head | retry that piece | T-V9-67; T-V9-17; T-V9-80 (10) |
| 11 | the empty state (V09 §3.2) | a site on which the one-click default is infeasible; a THORP or METROPOLIS request from T1 `intend` | S1's ladder bends the site (§4.2 S1), and the report says so; the proxies keep §7.8's budget at each rung, the METROPOLIS proxies after the first map | simpler shape | T-V9-1; T-V9-80 (11) |
| 12 | snapping (V09 §3.4) | no candidate within the radius; exactly one; two at equal distance; a snap answer later than a frame | the unsnapped point; that candidate; the higher row of the mode's priority list, then the lower address; the unsnapped point until it lands | substitute | T-V9-8; T-V9-80 (12) |
| 13 | handles (V09 §3.5) | a shape with fewer vertices than `k`; a zero-length edge; a ring whose salient vertices crowd | every vertex a handle; the edge merged at the settle; the spacing rule drops the less salient, ties by lattice order | repair locally | T-V9-10; T-V9-80 (13) |
| 14 | variations (V09 §3.6) | a source whose three rerolls give fewer than three distinct digests; a scope with nothing to vary | the distinct ones shown with `edge.fewVersions`; the tray does not open and the draft previews once | leave out and report | T-V9-7; T-V9-80 (14) |
| 15 | New random on a scope (V09 §3.7) | a scope holding nothing rerollable (every thing locked or declared); one thing; a scope crossing a dossier-owned element; every rung; each layer toggle; undo after a save | the control disabled with `edge.allKept`; that thing alone; the element kept, the rest re-rolled; the same at every rung; a hidden layer's things re-rolled all the same (hiding is view state); one undo step, kept across save (§7.4) | check | T-V9-6; T-V9-7; T-V9-80 (15) |
| 16 | autosave and recovery (V09 §3.8) | no entry since the snapshot; one entry; a journal whose first entry mismatches; a 100-epoch advance killed after its last epoch and before compaction, one killed mid-group, and one stopped at epoch 40 and killed before compaction | nothing to replay; one call replayed; recovery stops at the mismatch with `error.recoveryPartial` and the unreplayed calls downloadable; the advance re-issued from its `logHeadBefore` to its `logHeadAfter`, the mid-group one (still `pending`) re-issued whole, the stopped one stopped again after its 40th epoch — each reopening at the journalled head, no epoch lost and no recovery line shown | retry that piece | T-V9-17; T-V9-80 (16) |
| 17 | undo, restore, copies (V09 §3.9) | nothing to undo; one event; a creation or dossier target; "Go back" of a few hundred edits at METROPOLIS; below a rebase point | the arrows disabled; that event; skipped by §7.4's target rule with its line; the progress view past 1 s; `info.copy.condensed` | check | T-V9-16; T-V9-27; T-V9-80 (17) |
| 18 | the skeleton (V09 §3.12) | an empty skeleton; a single declaration; a skeleton naming a class, table row or pack this build lacks; a skeleton from a newer version | a new town with no declarations; one row in the dialog; that declaration listed *refused* with its reason, the rest applied; opened by §2.9's steps with its notice | leave out and report | T-V9-62; T-V9-80 (18) |
| 19 | the failure ladders (V09 §3.14) | a worker death at every rung; a degenerate result in any flow | the same ladder at every rung; the E4 rule above | retry that piece | T-V9-80 (19) |
| 20 | the link cache (V09 §3.15) | a town with no consumer or no provider; a good with no provider | an empty cache and a Supply links view reading `edge.noLinks`; the consumer's `WhyAnswer` lists the unserved good (item 105 (a)) | leave out and report | T-V9-24; T-V9-80 (20) |

**(b) Editing (V09 §4)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 21 | the rail and working layer (V09 §4.2) | no tool offered on the layer; one; Sky at a rung without islands; Below with no network; a layer toggled off while it is the working layer | the modes shown disabled with their reasons; the one mode active; the Sky and Below switches disabled with their reasons; switching the working layer turns its visibility on (view state only) | check | T-V9-22; T-V9-80 (21) |
| 22 | the binding table (V09 §4.3) | a (kind, target class or path) pair with two home tools; a pair with none | a CI failure of T-V9-12, never a run-time choice | check | T-V9-12 |
| 23 | the context panel (V09 §4.4) | an entity kind with no editable path; one path; a dossier-owned field; an entity tombstoned while open | the About tab only; one control; disabled with "Set by SettlementForge"; the panel closes at `doc.changed` with `edge.removed` | check | T-V9-80 (23) |
| 24 | the twelve tools (V09 §4.5) | a points form's degenerate draft; T1 `intend` at the rung's ends | the E4 rule above; the size chips of that band only | check | T-V9-80 (1) |
| 25 | multi-selection (V09 §4.6) | nothing selected; one thing; things of kinds that cannot move; a move of zero offset; undo after save | the menu's multi items hidden; the single panel; left in place and named in the badge; no event sent; one group undone | check | T-V9-80 (25) |
| 26 | the file-g edits (V09 §4.7) | a kind with no member; one member; `familyWeights` at every family's Ignore; a link with no other provider for **Use another supplier**; a wall stretch of zero length; a dossier-ranged record; every rung; undo of a group after save | the per-kind panel still writes the row, applied when a member arrives; one row pinned; every soft term off, hard needs kept (item 103 (c)); the handle offers nothing and the card says `edge.noSupplier`; the E4 rule; the count control absent (dossier-owned); the same rows at every rung; one undo step | check | T-V9-24; T-V9-25; T-V9-80 (26) |
| 27 | View as (V09 §4.8) | View as with nothing withheld at the chosen tier; a host form naming no places | the view unchanged but the banner; the form's tier alone | substitute | T-V9-66; T-V9-80 (27) |
| 28 | the catalogue (V09 §4.9) | a slot with no argument; an `{ id }` argument tombstoned | filled from the entry the button carries, else rendered as its kind word; the kind word | substitute | T-V9-13; T-V9-15 |
| 29 | the history panel (V09 §4.10) | 10 000 rows; a row whose targets are all tombstoned; every rung | virtualised within V09 §6.3; **Show** hidden, the text kept; the same at every rung | leave out and report | T-V9-80 (29) |
| 30 | the drawer (V09 §4.11) | no turn yet; one proposal; the cap reached; a proposal whose events are degenerate; a `ProposalView` with no variations; every rung; apply-then-undo off and on; a reload mid-turn | the suggested prompts; one card; `clerk.cap.reached` and the box disabled; the dry run's bend or refusal on the card; the card drawn with Drop only; the same at every rung; V10 §4.4's cases; the turn lost, the transcript kept by V10 §2.7's rule | check | T-V9-27; T-V9-80 (30) |
| 31 | touch (V09 §4.12) | a two-finger tap with no drawing tool; a long press that moves past 8 px | a zoom-to-band as a double-click; a drag, never the menu | check | T-V9-22 |
| 32 | the keyboard (V09 §4.13) | a binding at every rung; a rebinding that collides; a keymap override after an upgrade that removed its target row | the same bindings; the later rebinding refused with `edge.keyTaken`; the override dropped with a note in About | check | T-V9-80 (32) |
| 33 | the advanced panel, tables, presets (V09 §4.14) | no override; one table with one row; an override whose base row changed; the parity presets; an override after undo and after a table release | "as the rules say" everywhere; that row; the orphans list with Keep mine / Take new (§7.6); each preset's values shown with their layer; the base's lifecycle (§7.6) | check | T-V9-80 (33) |
| 34 | the roster reader (V09 §4.16) | an empty line; a line of only punctuation; a locus naming nothing | skipped; skipped; the card asks "Where is {X}?" | leave out and report | T-V9-13; T-V9-70 |
| 35 | the underground screens (V09 §4.17) | a degenerate gallery or chamber | V04's ladders (V04 §5.2's F-UNDER and F-VOID rows) with their bends | V04's | T-V9-35 |
| 36 | people (V09 §4.18) | a town of one person; no people | the tree of one card; the People panel absent (J-V9.48) | check | T-V9-46 |
| 37 | item 110's tools (V09 §4.20) | no raised way, retaining wall or deck in the town; exactly one; a zero-length stroke | the Raised-ways row reads `edge.noneStanding`; that one's panel; the E4 rule | check | T-V9-51; T-V9-80 (37) |
| 38 | retaining walls and terraces (V09 §4.20.1) | a chain of one point; a closed chain of zero area; a terrace stroke of zero length | the E4 rule; a closed chain with no area sends nothing and says `edge.drawRound`; no stroke, no event | check | T-V9-54; T-V9-80 (38) |
| 39 | raised ways (V09 §4.20.2) | a course of one station (`A = B`); a stroke whose ends are both on one vertex; an aqueduct with no source and no terminal in reach; undo, regenerate and an epoch after a raised way | no way sent, the readout `edge.samePoint`; the same; `bend.aqueduct.uphill`; the base's and V06's lifecycles (a declared way held) | check | T-V9-52; T-V9-80 (39) |
| 40 | a raised course across a sky access (J-VI.4 (f)) | `skyAccessObstacles` offers no re-route | the course ends at its last ground vertex before the column or rope line, `bend.raised.skyAccess` | simpler shape | T-V9-52 |
| 41 | removals (V09 §4.20.3) | a removal of a thing whose record is degenerate; every rung | the plain `delete`; the suppression by reason key at every rung that generates the kind (none below CITY for raised ways) | check | T-V9-53; T-V9-80 (41) |
| 42 | decks (V09 §4.20.4) | a deck with zero plots; a stamp on a deck edge | `edge.noDeckPlots`; the nearest free deck plot, bent | repair locally | T-V9-55 |
| 43 | tiers (V09 §4.20.5) | a stack of one tier; the tier cap; a zero step | the stepper at 1 with the stairs chip disabled (`edge.oneTier`); `bend.tiers.count`; `bend.tiers.step` | repair locally | T-V9-59 |
| 44 | the new records' panels (V09 §4.20.6) | a span of zero length; a crossing whose way was removed; undo of a span edit after save | the span's panel absent (V04 §3.5.4's span rule makes none); the crossing panel closes at `doc.changed`; one undo step, kept across save | check | T-V9-80 (44) |
| 45 | the effects list (V09 §4.20.7) | no effect; more than the cap; a confirm after an undo | no line and no section; `effectsMore`; the list re-read with the fresh `confirm` | leave out and report | T-V9-60 |
| 46 | the hit stack (V09 §4.20.8) | nothing under the point; a point on a mark's edge | the selection cleared; the hit radius's nearest mark | check | T-V9-58 |
| 47 | item 110 on Sky (V09 §4.20.9) | an island with no rim strip; one island; a degenerate rim stroke | V05's records decide (the move is to 1 m inside the `setback` line where one exists, else the stroke kept); the island menu's one entry preselected; the E4 rule | V05's | T-V9-80 (47) |

**(c) Screens (V09 §5)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 48 | the frame (V09 §5.1) | a viewport below 320 × 480; every rung | the narrow layout with the map region at least 200 px high, panels as full-height sheets; the same frame at every rung | simpler shape | T-V9-21; T-V9-80 (48) |
| 49 | the empty state's card (V09 §5.2) | a first map that fails | the card stays with **Surprise me** and **Open a town…**; the report names the failure rung | substitute | T-V9-1 |
| 50 | the overlays (V09 §5.3) | no preview yet; a ghost of zero area | the raw stroke only; the badge's counts, no ghost | check | T-V9-80 (50) |
| 51 | the thematic views (V09 §5.4) | nothing to draw for the view; one value; a stored value the town cannot draw (`supplyChains` with none listed); a view on every rung; each view on and off; save and reload | the legend reads `edge.nothingToShow`; the legend's one entry; read as None; the same views at every rung (Coverage and Voids hidden where their sources are absent); no model digest changes; `thematic` restored per viewer | check | T-V9-23; T-V9-68; T-V9-80 (51) |
| 52 | the fates sheet (V09 §5.5) | a `confirm` with no fates and no renames; one fate; every rung | the action commits without the sheet (V09 §3.3); one row; the same at every rung, paged beyond 1 000 | check | T-V9-80 (52) |
| 53 | the other panels (V09 §5.7) | an empty report; one entry; a degenerate entry address; a report with no dossier; every rung; each style; a panel after undo | `edge.allMade`; one line; the entry drawn with no **Show**; the dossier sections omitted; the same at every rung; the Dress cards of the shipped styles; re-read at `doc.changed` | leave out and report | T-V9-69; T-V9-80 (53) |
| 54 | the why card (V09 §5.8) | an answer with nothing to show; one bar; a subject of zero area; a withheld subject | "The rules made it" and no bars; one bar at full length; the card anchored at the subject's point; its kind and nothing else | substitute | T-V9-65; T-V9-80 (54) |
| 55 | onboarding (V09 §5.9) | no hint left; one; the guided town after its step's target was deleted; `hintsDone` after a reset | no callout; that one; the step skipped with `edge.stepGone`; hints shown again | substitute | T-V9-80 (55) |
| 56 | the export dialog (V09 §5.10) | a scope with nothing in it; one building; a frame of zero area; every rung; each preset | the tab says `edge.nothingToExport` and Export is disabled; a one-building scene; the E4 rule (no frame is sent); the same tabs at every rung; the preset's knowledge and look | check | T-V9-19; T-V9-80 (56) |
| 57 | settings (V09 §5.12) | no local town; one; a stored value out of range; each toggle | Storage lists none; one row; clamped into range with a note in About; each written and restored by Reset | substitute | T-V9-80 (57) |
| 58 | open and recent (V09 §5.13) | a recent entry at every rung; a recent entry whose record was purged; reopening after a migration | the same list; the entry dropped with `edge.townGone`; opened by §2.9's steps | leave out and report | T-V9-80 (58) |
| 59 | labels in the app (V09 §5.14) | a rename at every rung; an empty name | the same inline editor; refused by the editor (`edge.nameLetter`) and never sent | check | T-V9-80 (59) |
| 60 | every new thing (V09 §5.15) | a thing with no export form; each layer off in an export; a degenerate thing | its row names "never"; the layer omitted from that export; the E4 rule | check | T-V9-19; T-V9-80 (60) |

**(d) Where two units' features meet** (the canon's combinations this volume owns)

| # | combination | outcome | rung | test |
|---|---|---|---|---|
| 61 | steep ground × the tools (T2 `ground` – T6 `place` on a slope beyond S1's steep row) | the dry run's own ladders (a road's switchbacks, a wall's barrier, a building's platform); the tool shows the bend line, never a refusal | simpler shape | T-V9-80 (61) |
| 62 | steep ground × the working layers | Below's systems follow V04's depth rule on steep ground; Sky unaffected; the layer switch unchanged | — | T-V9-80 (62) |
| 63 | a moat × the tools (T3 `wall` over a moat, T4 `road` across it, T6 `place` on its bank) | a wall follows the moat's inner edge; a road crosses by a draw or fixed bridge (§7.1's drawn-bridge rule, `bend.road.bridge`); T6's stamp takes the nearest dry plot, bent | repair locally | T-V9-80 (63) |
| 64 | a bridge × the working layers | a bridge is Ground's; its deck plots Ground's; a sewer under it Below's, reached through the hit stack's order | — | T-V9-58 |
| 65 | an oasis × the tools | T2 `ground`'s toggle (V09 §4.21.1); T3 `wall` and T4 `road` treat the oasis as water; T5 `quarter` and T8 `fill` over its grove and gardens bend as over any green | repair locally | T-V9-71 |
| 66 | an oasis × the working layers | the oasis is Ground's; on Sky the toggle is hidden (V05's water) | — | T-V9-71 |
| 67 | the frame × the tools (a gesture past `bounds`) | points beyond the frame are clamped to it at the settle, the readout saying `edge.frameEnd`; a quarter's lasso is clipped | repair locally | T-V9-80 (67) |
| 68 | the frame × the working layers | Below and Sky share the frame's `bounds`; the zoom-out limit is the ground's bounds for every layer (item 116) | — | T-V9-76 |
| 69 | a close-up neighbourhood × the working layers | the close-up is Ground's; Below and Sky show the town's layers as they stand, the close-up's edits Ground-only (V01 §4.5) | — | T-V9-80 (69) |
| 70 | a terraced ward × the tools | T2 `ground`'s Terrace on a terraced ward re-levels within the ward's steps (V01's terraced fabric keeps its step rule); T3 `wall`'s Retaining wall snaps to the ward's step lines; T5's quarter over it keeps its terraces | repair locally | T-V9-54; T-V9-80 (70) |
| 71 | a terraced ward × the working layers | Ground's; Below under a terrace follows V04's depth from the levelled ground | — | T-V9-80 (71) |
| 72 | a composed building × the working layers | Ground's at the building band; its basement and crypt reached on Below's band and in the plan panel | — | T-V9-80 (72) |
| 73 | a crypt × the tools (T6 `place`'s chamber inside a church; T9 `shape`'s plan events on it) | V09 §4.17.5 (a) and (e)'s bends | repair locally | T-V9-35 |
| 74 | a crypt × the working layers | the crypt is a basement, drawn on Below's band with its church's plan, never listed as a system (J111) | — | T-V9-35 |
| 75 | a plan × the working layers | a stored plan's storeys switch with the storey switcher on Ground; its basement on Below's band | — | T-V9-80 (75) |
| 76 | an island's shade × the tools | a tool acting in a shaded cell reads the field as it stands; **Update shade now** after an island moves; the shade view's pending line until then | — | T-V9-43 |
| 77 | an island's shade × the working layers | the shade is Ground's view (`live.shade`); switching to Sky keeps it drawn dimmed | — | T-V9-43 |
| 78 | a sky access × the working layers | its foot on Ground, its top on Sky; each end selected on its layer, the hit stack joining them | — | T-V9-80 (78) |
| 79 | a landfall × the tools | a stroke over a landfall's covered set bends as over rubble ground (V05 §3.16); T10 `hold`'s re-roll leaves the landfall held | repair locally | T-V9-80 (79) |
| 80 | a landfall × the working layers | the fallen island's remains are Ground's; its landing yards Sky's while it floated | — | T-V9-80 (80) |
| 81 | a town's history × the tools | while the timeline thumb is off "now" the tools are disabled with V06's band, each offering **Open a copy from here** at the frame's seq (`info.past.viewing`, V09 §5.6); a tool edit after an epoch acts on the present; "Re-run from here" keeps later hand edits listed | check | T-V9-41; T-V9-80 (81) |
| 82 | a town's history × the working layers | every layer is drawn at the thumb's week; Below's `lost` voids follow the replay (V09 §4.17.1) | — | T-V9-73 |
| 83 | a dossier × the tools | a dossier-owned field is locked (`refuse.dossierOwned`); a dossier element's delete is **Not here**; a T6 `place` or T7 `roster` line naming no element takes `refuse.roster.dossier`; an absorb under a pending ghost re-previews it | check | T-V9-13; T-V9-69 |
| 84 | custom content × the tools | a custom kind stamps and sites by its profile (item 104); its chain's links pin, move and cut as any link | — | T-V9-24; T-V9-68 |
| 85 | custom content × the working layers | custom institutions are Ground's; a custom underground kind is Below's by its registry row | — | T-V9-80 (85) |

The named combinations of the owner's list that reach the application — a settlement growing over a sealed void
(V09 §4.17.4's closure, T-V9-38), a dossier removing what an edit pinned (the pin orphaned and listed, V09 §4.10's orphans), an
epoch undone after a save (V09 §3.9, T-V9-16) — are closed at those rows.
=== END ===

=== REPLACE ### 4.2 The tool rail, the five layers and the working layer ===
### 4.2 The tool rail, the five layers and the working layer

**The rail.** A vertical column on the left (wide and medium layouts; a bottom sheet on narrow, V09 §4.12). It holds the
five layers as labelled groups — "Kind of place" (L0 INTENT), "Ground & bones" (L1 GROUND AND BONES), "What's in it"
(L2 PROGRAMME), "Fabric" (L3 FABRIC), "Finish" (L4 FINISH) — each tool a 44 × 44 px button with its icon, its name under it at UI scale 1, and its number badge (T1 `intend` – T12 `dress`, which is
also its key, V09 §4.13). **Progressive depth (R9).** On first run only the four `firstScreen` tools show: T1 `intend`, T5 `quarter`
`quarter`, T6 `place`, T12 `dress`, each layer group collapsed to a "More…" chevron. A layer group expands when the user
opens its chevron, when a hint or the guided town points into it, or when the user first uses one of its tools; the
expansion is remembered (`AppPrefs.railExpanded`). T9 `shape` and T10 `hold` are `contextual`: they appear in the rail (and
as the first two tabs of the context panel) from the first selection on, and stay. A user can pin any tool to the top of
the rail (`railPins`). The rail never scrolls on a wide layout (12 tools × 52 px + 5 headers ≤ 760 px at UI scale 1;
beyond that the groups collapse to their chevrons automatically).

**Tool options.** Picking a tool opens its options strip along the top of the map (not a dialog): the mode chips
(V09 §4.5's modes) and the parameters marked `basic`; "More" reveals the rest (R4). Options are remembered per tool for the
session.

**No layer bookkeeping (R6).** Nothing in the application orders, stacks or groups what is drawn: draw order is §8.2's
semantic order, a new thing lands where its kind belongs, and the working layer below chooses only which model layer
(ground, a sky island, the underground) the tools act on.

**The working layer** (view key `workingLayer`, per viewer; V09 §2.4): a three-way switch in the view bar — **Ground**,
**Sky** (enabled at CITY and METROPOLIS when the town has islands, II.6; a menu of the islands by name sets `key`), **Below**
(enabled when the town has an underground network, II.7, or a cavern or ruin — at any rung, item 109 (j) (1)). Switching
layer also sets the layer's visibility on (§7.8's layer controls, view state only) and dims the other layers to 35 %
opacity. Every tool mode declares the layers it acts on (`ToolModeRow.layers`). On **Sky** every row of V05 §4.1 takes
its sky form, with the island's `key` (V09 §4.20.9): T1 `intend` the islands setting and count; T2 `ground` the island's terrain, water and
rim, and a **Terrace** whose edge lays an island retaining wall; T3 `wall` **Draw wall** as V05 §3.21's barrier-closure enceinte
walling only the landing yards, and **Retaining wall** as an island `RetainingWall`, bent inward past the rim walk on or
along the rim (`bend.retaining.rim`; J-VI.4 (g)); T4 `road` a sky access only (V05 §4.2; Raised and Aqueduct hidden); T5 `quarter` a floating quarter; T6 `place` an
institution onto the island; T8 `fill` the brushes; T9 `shape` the island's altitude, area, position, occlusion, underside and field,
and an access's kind, role, state, knowledge and foot; T10 `hold` the island's locks, New random and **Update shade now**; T11 `name`
the island's name and label; T12 `dress` the sky layer's visibility and occlusion. On **Below**, T4 draws a tunnel, a gallery or
a link and T6 places a chamber or an access, each into the system the **system chip** names (V09 §4.17.2). A mode that
does not act on the working layer is shown disabled with its reason ("Tunnels are dug below the ground" for T4's Tunnel
on Sky). **A raised part** (item 110 (b): a ground arena part from 1) stays on the **Ground** working layer — no fourth
switch — and what lies under its deck is reached through the hit stack (V09 §4.20.8; J-V9.68).

**The Below group** appears in the view bar while Below is the working layer or the underground is visible: the **depth
band** — a ladder of the non-empty bands by depth range ("−2.5 to −5 m") with the kinds present, stepped by PageUp and
PageDown (file f item 413); the view key `depthBand` is its one store — the **view** chips *Cut-away* · *Over the streets* ·
*Below alone* (`LayerSpec.underView`: `cutaway`, `overlay`, `solo`; a `setLayer`, V04 §5.1), the **hand lantern** toggle
(the view key `handLantern`, §2.9), and, only for a view whose knowledge tier is `secret`, **Show hidden caves and ruins**
(the view key `showUnexcavated`, V09 §4.17.1). The **Sky group** holds the island menu and **Update shade now** for a
selected island (V05's `regenerate { kind: 'shade', island }`, T10 `hold`'s). The Map and Light groups are V09 §4.19's.
=== END ===

=== REPLACE ### 4.3 The tool binding table — every edit kind and where a user reaches it ===
### 4.3 The tool binding table — every edit kind and where a user reaches it

The binding is §7.1's (E-04): one home tool per (event kind, target class or path), every `EditEvent` kind of the base
and the volumes included, and the kinds no user produces directly marked with their producer. This table gives each row
its screen — the mode that emits it (generated from `toolkit.json`'s `emits`, V09 §2.3), the gesture, and the context-panel
control or pointer idiom that also reaches it; T-V9-12 checks both tables, pair by pair, against the `EditEvent` union and
the entity registry (§2.8) on every build.

| event kind (target) | the mode (§7.1's home tool) | the gesture | also from | source |
|---|---|---|---|---|
| `adjust` (intent, recipe, layers, islands, sewer family, ruins, a standalone neighbourhood's outline; the recipe's history option, item 113) | T1 `intend` (cards and sliders; the **History** chip, V09 §4.21.3) | a card or slider change; after a declaration a Re-derive previews as a whole-town ghost and commits on Accept (V09 §3.3); across the CITY line its effects list the generated raised ways that go or come, with **Keep them as yours** (V09 §4.20.3 (7)) | the basic and advanced panels (§7.8) | §7.1, §7.8; V01 §4.2; V04 §4.1; V05 §4.2 |
| `setField(terrain)`, `warp`, `drawWater` (a lake's points form with `spring`, item 111), `moveCourseKnot` | T2 `ground` (raise, lower, cliff, flatten; warp kernels; lake, with its **Spring-fed (oasis)** toggle, V09 §4.21.1; river by source and mouth; **river or canal drawn** as a line with a width handle; coast and harbour; water paint) | brush strokes; a warp session with Apply / Discard (§7.1); points forms; a drawn line → `drawWater { kind: 'river' \| 'canal', add: [], line, widthCm }`; knot drags | river and lake handles (V09 §3.5) | §7.1; V05 §4.2 (sky key); FTG's drawn river |
| `setAttr` on `geology`, a bank class, a site feature | T2 `ground` (on the selected ground or water) | chips | the context panel | §7.1's terrain and water rows |
| `convert` `reclaim`, `siltReach`, `shiftCourse`, `digCanal`, `retypeLand`; `setAttr` on `WaterBody.spring.flow` | T2 `ground` (the "Change over time" menu of a water, marsh or hinterland face; the land-use chip; a spring's flow slider) | a context action with a ghost; V06 §4.2's forms | the context panel | §4.11, §7.1; V06 §4.2 |
| `drawWall`, `placeGate`; `moveVertex` on a gate's crossing | T3 `wall` (draw, gate; on Sky with the island's `key`, V05 §3.21) | two or more points or a line; a gate stamp on the trace; a gate's grip slides it (V09 §3.5) | wall handles | §7.1; item 106 (g) |
| `drawWall` of kind `retaining` with `highSide` (file f item 362 (a)); `moveVertex` on its chain; `setAttr` on a retaining wall (material, towers, high side) | T3 `wall` (**Retaining wall**; on Sky with the island's `key`) | two or more points or a line with the High side chip (V09 §4.20.1) | the retaining wall's panel and chain handles | item 110 (a) |
| `terrace` (sugar, file f item 362 (c)) | T2 `ground` (**Terrace**; on Sky with the island's `key`) | a brush with a level readout, then the level handle; Accept (V09 §4.20.1) | "Change the terrace's level" on a terrace-made wall | item 110 (a) |
| `setAttr` on the castle (`site`, `baileyArea`) | T3 `wall` (on the selected castle: its keep grip and its bailey handle) | drags, previewed | the castle's context panel ("Move the castle", "Castle grounds" stepper) | §7.4's MFCG asks |
| `convert` `wallToWay`, `gateToJunction`, `neglect`, `breach`, `dismantle`, `contractWall`, `absorbWall`, `repairWall` (with its material, item 114), `wearWall`, `repairRetaining`; `setAttr` on `Enceinte.pathway` | T3 `wall` ("Change over time" on an enceinte or gate; a run's grip: **Repair** with the **Material** chip, **Wear**, V09 §4.21.4; a neglected ring's **Back in use**; a retaining wall's decayed stretch: **Repair**) | a context action with a ghost; V06 §4.2's forms | the context panel | §4.11; V06 §4.2 |
| `drawWay` (every class; `bridge` over water; V07's walk mode) | T4 `road` (class chips: main, street, lane, alley, track, path, quay, pier, bridge, ford) | two points or a line | way handles (`moveVertex`) | §7.1; V07 §4.2 |
| `drawWay` with `raised` and the `aqueduct` class (file f item 362 (b)) | T4 `road` (the **Raised** toggle; the **Aqueduct** chip; V09 §4.20.2) | two points or a line, its ends on ground vertices | a raised way's handles (`rampEnd`, interior points); **Build it again** in the history (V09 §4.20.3); **Keep them as yours** on T1 `intend`'s ghost | item 110 (b) |
| `setAttr` of a span's `use` (`spans/<n>/use`), of a crossing's `form` (`crossings/<wall>/form`), of a raised way's `clearanceCm` and `spanSpacingCm` (file f item 362 (d), file f item 364) | T9 `shape` (its `setAttr`, on a selected raised way, its span or a crossing, reached through the hit stack; J-V9.104) | chips; steppers; each previewed (V09 §4.20.6) | the span's, crossing's and raised way's panels | item 110 (a), (b); V04 §3.5.4 (the arch vault) |
| `setAttr` on a way (class, width, name) and a bridge's kind; `convert` `downgradeWay`, `upgradeWay`, `repairRaised` | T9 `shape` (its `setAttr`, on a selected way; J-V9.104; the class chip's `path` ↔ its former class; **Repair** on a raised way, **Rebuild the deck** on a bridge or pier) | class chips; a width stepper; a context action with a ghost | the context panel | §7.1's ways row; V06 §4.2 |
| `split` of a way at a point, `merge` of two ways | T9 `shape` (on a selected way: **Split here**, one click on it; with two ways selected: **Join these**; J-V9.104) | a click; a context action | the context panel; the context menu | §7.1; §7.4's MFCG asks ("add vertices") |
| `drawTunnel` (a sewer run, or a gallery with `system`), `addLink` (working layer Below) | T4 `road` (tunnel, link), the gallery's system from the **system chip** (V09 §4.17.2) | two points or a line on the underground layer | — | V04 §4.1; item 109 (h) |
| `placeSkyAccess` (working layer Sky, or a stroke from the ground to a rim) | T4 `road` (sky access) | a stroke ground → rim | the island's context panel | V05 §4.2 |
| `quarter` (sugar), `drawBoundary` | T5 `quarter` (kind card, then seed / corners / lasso / brush / click-inside) | points forms (§7.1) | boundary handles (a partial ring, V09 §3.5) | §7.1; V05 (`sky`) |
| `setAttr` on a district (kind, identity, `DistrictIntent`, band), `merge` and `split` of districts | T5 `quarter` (on a selected quarter: its kind card, band chip, "Merge with…", "Split along…") | chips; a two-point split line | the context panel | §7.1's districts row; item 72 |
| `declareEnd` (village rungs) | T5 `quarter` (at a village rung the card reads "End") | one point, a building or a pin | — | V07 §4.2 |
| `placeAt`, `assign`, `build`, `drawFootprint` | T6 `place` (a class stamp; a typed locus; draw a footprint; on a deck plot, and at a mole's or a long bridge's landmark slot, V09 §4.20.4) | drop, type, draw | the context panel's "Make this a…" | §7.1; item 110 (d) |
| `setAttr` on a market's `rank`, a use's `concealment` and `front`, an institution's `powers` | T6 `place` (on the selected place: "Main market", "Hidden behind…") | chips | the context panel | §7.1; items 24, 63 |
| `rejectSite` (a dossier element's "delete", and its lift), `placeAt { lift: true }`, `unassign` | T6 `place` (on a dossier-backed thing, **Not here**; on a rejected site, **Allow here again** → `rejectSite { op: 'lift' }`; on a pinned plot, **Free this plot** → `placeAt { lift: true }`; on an assigned thing, **Remove the assignment** → `unassign`) | context actions; Delete on the selection | the Delete key; the refusal card | §7.7; the owner's "it is not permanent" |
| `drawChamber` (into a system, or `{ newKind }` creating a ruin, cavern or catacomb, file f item 361), `placeAccess` (over a sealed void it is the user's excavation), `addUndergroundAccess` | T6 `place` (on Below: chamber, access, with the system chip; on a building: "Add a way down") | one point and a size; a context action | the building's context panel; the access closure of a dwelling declaration (V09 §4.17.4) | V04 §4.1; §7.3 item 9; item 109 (h), (j) |
| `setAttr` on an access point (`kind`, `role`, `state`, `knownTo`, `ground.at`), `moveVertex` on its `access_point` vertex, `delete` | T9 `shape` on the selected access ("Brick it up", "Lock it", "Open it", "Who knows this way down", the opening's drag, the underground end's drag); T6 `place` for a new one | chips; drags; the Delete key | the access's panel (V09 §4.17.3) | §7.1's underground row; V04 §4.2 |
| `setAttr` on a catacomb's `fill`; `delete` of catacomb galleries | T9 `shape` on the catacomb (the fill stepper; Delete on selected galleries) | a stepper; the Delete key | the catacomb panel (V09 §4.17.5) | V04 §4.2, V04 §4.3 (J-V4.56) |
| `instance` add (a hood pin) | T6 `place` (furniture stamp) | drop | — | V01 §4.2 |
| `convert` `relet` | T6 `place` (the building's "Households") | a number stepper | the plan panel | V03 §4.1 |
| `convert` `openUse`, `closeUse`, `relocateUse`, `mutate`; `swapUse` | T6 `place` ("Open a business here", "Close", "Move it", "Swap with…") | a context action; drag a use's badge onto another building | the context panel | §4.11, §7.1 |
| `roster` (sugar) | T7 `roster`; its one-line form also T6 `place` (a place by a locus: a drop on a quarter, road or gate, or a typed locus; file f item 570) | paste or type a list; cards; for T6, one drop or one typed locus | — | §7.1; file f item 570 |
| `fill`, `setField` (density, greenery, prosperity), `drawGreen`; `setAttrMany` of land use; `instance` groups of trees | T8 `fill` (density, mix, greenery, prosperity brushes; square; park; **Land use** lasso — arable, pasture, orchard, wood → `setAttrMany` of the land-use faces under it; **Trees** brush — plant, thin, restyle → one group of `instance` events, a `drawGreen` first where no green hosts them) | brushes; drops; a lasso | — | §7.1; §7.4's MFCG asks ("farms in chosen areas"); FTG's tree brush |
| `setAttr(fabric)` + `regenerate`, `setAttr(fabricParams.*)`, `setAttr(terrace)` + `regenerate` | T8 `fill` (layout card on a district, with its **Terraces** chip — V01's `terrace`: auto · on · off) | a card pick with variations; the chip, one undo group | the close-up panel | V01 §4.1, V01 §4.2 |
| `split`, `join`, `merge`, `moveFootprint`, `setEntrance`, `paint`, `setAttr` (class, heights, roof, basement, tenure, reach, front jitter, surface, a square's type, a block's content, a way's class, width and name, the item-110 `setAttr` paths …) | T9 `shape` | corner and door drags; storey steppers; roof and wall paint; chips | the context panel's Shape tab | §7.1; V01 §4.1 |
| `setMassing`, `setComposition` (`room` among its ops), `reshapeRange`, `moveTower` (with `shape`), `addTower` | T9 `shape` (at the building band: range, tower and room handles, storey and dormer steppers, roof, the porch and the secondary porch, hood, tower-shape and room chips, the family strip; on a `stepped` building the tier controls — `setMassing { op: 'tiers' }` and a tier's `setAttr` of heights, shape, skirt and solid, V09 §4.20.5) | handles, steppers, chips (V09 §3.5) | the building tab | V02 §4.1, V02 §4.4, V02 §4.5, V02 §4.6 |
| plan events (`setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`, `moveStairCore`, `setRoomUnit`), `setHearth`, `instance` on furniture | T9 `shape` (at the building band, the plan) | wall and door drags; role chips | the plan panel (V03 §4.5) | §7.1; V03 §4.1 |
| `drawPassage`, `convert` `sealPassage`, `openPassage`, `densify`, `thin`, `subdivide`, `amalgamate`, `plotToGarden` | T9 `shape` (on a plot or block) | a two-point passage; context actions | the context panel | §7.1, §4.11 |
| `convert` `demolish`, `abandon`, `decay`, `ruin`, `robStone`, `clear`, `rebuild`, `build`, `burn`; `setAttr` on a `MutationPlan` step and on `Use.strain` | T9 `shape` ("Change over time" on a building; the plan's steps; the use's "clear its trouble"); the history panel's hazard tray for a fire, a flood, a collapse or a dry year (V06 §4.2) | context actions with ghosts; the hazard's dry run with three variations | the context panel | §4.11; V06 §4.2 |
| `convert` tunnel kinds (`silt`, `caveIn`, `seal`, `reopen`, `flood`), `raiseGrade`, `clearUndercity`; island kinds (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`); `setAttr` on a ruin's `monument/count` | T9 `shape` (on the tunnel, system, neighbourhood, island or ruin; a ruin's monument stepper) | context actions; the island's rim handles (V09 §3.5); a stepper | the context panel | V04 §4.1, V04 §4.2; V05 §4.2 |
| `startWorks`, `cancelWorks`, `setAttr` on a Works | T9 `shape` ("Build it over time" on any build, convert, join, split or delete) | a toggle on the action with a duration | the Works' context panel | §4.11, item 67 |
| `editTable` on `siting.declared` and `siting.linkEdits` (V09 §2.6) | T9 `shape` (a place's "What it cares about", its per-kind panel "All {kind}s in this town", "Keep together on one plot"); the link view (V09 §4.7) | chips and sliders; link drags; context actions | the context panel; the tables editor | items 104 (a) (1), 105 (h), (j); V11 §4.2 |
| `lock`, `unlock`, `pin`, `unpin`, `revert`, `regenerate` (keep, New random, a rung, a tunnel run or a system, an island's `shade`); `rerollLayer('village.track')` | T10 `hold` | the lock and pin icons; **Try again** (New random) with its scope chips — at a village rung also the roads and the fields (V07 §4.1), a village's woods re-rolling with T12 `dress`'s **New trees** (`rerollLayer('render.instances')`, town-wide, §6.1); the re-roll brush (V09 §3.7); ctrl / cmd+click (revert); "Update shade now" on an island | alt+click (lock), shift+click (New random), R | §7.1, §14; V04 §1b.3; V05 §4.2; V07 §4.1 |
| `setAttr(name)`, `setAttr(displayText)`, `moveLabel`, `hideLabel`, `group`, `rerollLayer(naming)` | T11 `name` | click a label to type; drag it; select quarters and "Name as region"; "New names" with a scope | F2 on the selection | §7.1, §9.1 |
| `setAttr(knownTo)` on a plot, building or institution | T11 `name` ("Who knows this place": everyone, locals, secret) | chips | the context panel | §7.1; item 30 |
| `setAttr` on an island (area, altitude, state, occlusion, underside) and on a sky access | T9 `shape` (on the island) | handles and steppers | the island's context panel | V05 §4.2 |
| `setStyle`, `setLayer`, `paintGround`, `placeLight`; the leader-line switch (a style row, §9.4); `rerollLayer` of `style.compass`, `naming.emblem`, `render.instances` (**New trees**, V09 §3.7; J-V9.101) and `style.jitter` with `style.crowns` (**New decoration**, one group; J-V9.115) | T12 `dress` | style cards; toggles; **New trees**, **New decoration**, **New emblem** and **New compass** (buttons in the Dress panel, V09 §4.19; each a `rerollLayer` at the concern's current salt + 1 — New decoration two, as one group — V09 §4.5's T12 row); a quarter's **Colour** swatch (a thematic `setStyle` row keyed by that district); the wall layer's **Show the whole circuit** and the underground's view chips (`setLayer`); a ground-texture brush; drop a light; the furniture tray | the view bar (layers, the Below group) | §7.1, §9.4, §9.5; §7.4's MFCG asks ("set district colours"); V01 (pinGate, vignette); V04 (lights below, `underView`) |
| `setAttr` on a light (kind, height, colour, intensity, radius, point), `delete` of a light | T12 `dress` (the selected light) | chips; a drag re-hosts its point | the context panel | §7.1's lights row |
| `closeup` | produced by the first edit inside a close-up (PART II) | — | — | §7.1; V01 |
| `setAttrMany` | the multi-selection's context panel (V09 §4.6) | a field changed with several selected | the gazetteer's people list (bulk) | §7.1 |
| `delete` | T10 `hold` (J-V9.74; file f item 368): the Delete key or **Delete** in the context menu, on any thing but an access point and catacomb galleries (T9 `shape`) and a light (T12 `dress`), as §7.1's binding keys it — a dossier-backed thing takes `rejectSite`, an island V05's `convert removeIsland` (V05 §4.2) | previewed; committed at once only when its dry run lists nothing beyond the thing itself, else Accept (V09 §4.20.3) | every tool's context menu; the clerk (volume 10's `hold` op `remove`) | §7.1; item 110 (b); file f item 260 |
| `editTable`, `editPreset` | the tables editor and the presets dialog (V09 §5.7); the advanced panel's "Raised ways the town builds by itself" (V09 §4.14) | a cell edit; a row insert or delete; a two-way chip | — | §7.6 |
| `epoch` | produced by V06's `advance` (T1 `intend`'s time card, the timeline bar) and the port's cadence | "Advance 10 years" | — | V06 §4.1 |
| `undo`, `redo` | the top bar; ctrl / cmd+Z, shift+Z; "Go back to here" (a group) | — | the history panel | §7.4 |
| `upgrade`, `rebase` | the upgrade offer inside the retention window (§7.5's diff; standalone `info.upgrade.offer`'s **See what changes**, in host mode V08 §4.2's **Update the map engine**; V09 §3.14 (a)); the load-mismatch choice; the frozen view's **Edit it with this version** (`rebase` with reason `frozenImport`; V09 §3.14 (b)); "Rebuild around my drawings" (§7.2) in the file menu, kept in host mode (V09 §2.2's `fileMenu: false`) | — | — | §7.5, §2.9, §7.2 |
| `dossierFacts`, `dossierRecord` | none: host-only (V08 §4.1); refused from any user | — | — | V08 |
| `advance` (V06's trajectory) | V06's time card (T1 `intend`'s sheet) and the timeline bar; on a dossier-bound document refused, the card showing `refuse.dossierClock` (V09 §5.6) | a shape chip and "Advance" | the clerk's proposal | V06 §2.3, V06 §4.1 |

The base's **view keys** with no event — `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `season`, `weather`,
favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings, `showUnexcavated` — are
written by `setView` from the controls of V09 §4.2 and V09 §4.19; they are not logged and have no undo beyond the control's
previous value (§2.9).
=== END ===

=== REPLACE ### 4.4 The context panel — generated from the entity registry ===
### 4.4 The context panel — generated from the entity registry

A selection opens the **context panel** (wide: a 360 px column on the right; medium: a 320 px sheet over the map's right
edge; narrow: a bottom sheet at half height, dragged to full; V09 §5.1). Its content is **generated** from §2.8's entity
registry, so a new entity kind or edit path reaches the panel without panel code:

* **Header** — the thing's name (click to rename: T11 `name`), its kind in plain words from the message catalogue, a **tier
  chip** for the thing and for each field (§2.8's `factTier`: "From SettlementForge" for `dossier`, "Yours" for
  `declared`, "Made by the rules" for `map`), the lock and pin toggles (T10 `hold`), and the **Why here?** button (V09 §5.8).
* **Tabs** — **About** (every attribute the registry lists for the kind, each with its tier chip; an editable path is a
  control, a derived one is text); **Shape** (T9 `shape`'s controls for the kind, V09 §4.5); **Keep** (T10: lock paths, pin, revert,
  **Try again** — §7.1's New random — with its scope chips); **Links** (a use's supply links, V09 §4.7); **Over time** (the kind's `convert` ops and
  "Build it over time" for Works, §4.11; the lifecycle lines — "ruined since year N", "once an inn" — from V06 §5.2);
  **History** (the history panel filtered to rows whose `targets` include the thing). A tab with nothing to show for the
  kind is omitted; the building kind adds V03's plan tab and V02's massing controls at the building band; a district adds
  V01's close-up tab.
* **Controls by attribute type** — an enumeration of ≤ 6 values: chips; more: a searchable list; a number with a range and
  unit: a stepper beside a slider, the unit from `AppPrefs.units`; a boolean: a toggle; a name: an inline text field; a
  reference to another entity: a "pick on the map" button (the next click on a matching kind answers); a colour: the
  style's palette swatches plus a custom picker. An attribute's type, range and unit come from the entity's schema
  (`zod`, §1.7), its label and help anchor from the registry's row for that edit path (file f item 269), a parameter's from the
  control registry (§7.8, §14's context help).
* **Dossier-owned fields** are shown, not hidden: disabled, with the reason "Set by SettlementForge" and, for a name, the
  map-side alternative "Show a different name on this map" (`displayText`, §9.1); an attempt that reaches the engine
  anyway gets the `refuse.dossierOwned` card (V09 §4.9).
* **Multi-selection** — the header reads "{n} selected" with the kinds counted; About shows only the attributes every
  selected thing has, a differing value shown as "mixed"; a change sends one `setAttrMany` with the resolved ids (§7.1),
  one undo step. Shape and Keep act on each selected thing, grouped into one undo step.
* **The context menu** (right-click, a long press on touch, Shift+F10 or the Menu key on the selection) is generated from
  the same registry and `toolkit.json` (J-V9.52), in this order: **Why here?**; **Select below: {name}**, one item per
  other entry of the hit stack under the pointer (V09 §4.20.8); **Try again** (with the kind's default scope); **Lock** / **Unlock**; **Pin** / **Unpin**; **Reset to generated** (when edited); the kind's primary Shape actions
  (the first four of its Shape tab's controls, as items); an **Over time** submenu (the kind's `convert` ops and "Build it
  over time"); **All {kind}s in this town…** for a use (V09 §4.7); and last **Delete**, previewed by V09 §4.20.3's rule — or
  **Not here** for a dossier-backed thing. Each item is the same control as the panel's, so it previews and commits the same way; a menu opens
  at the pointer, is keyboard-navigable (arrows, Enter, Esc) and closes on any other click.
=== END ===

=== REPLACE ### 4.5 The twelve tools at build depth ===
### 4.5 The twelve tools at build depth

Each row gives the modes (with their gesture), the parameters shown at once and those behind "More" (R4), the mapper from
a draft to events (V09 §3.3 step 4; a points form written as §7.1 states it, each geometry field the dry run resolves
written empty — `points: []`, `boundary: []`, `add: []`, a `placeAt`'s `plot: ''` — beside its `from`, the bytes
V10 §4.1's encoders write, T101-3), the commit style (V09 §3.3), the badge's extra figures and readouts, the tool's bend and
refusal lines (V09 §4.9), the keyboard form (§14's accessibility contract) and its availability on the narrow layout and
with a coarse pointer (V09 §4.12). §14's table gives each tool's first-use hint and live feedback; they are not restated.

**Mode ids** (`ToolModeRow.id`, V09 §2.3; J-V9.124). Each mode's id is its name in the row in lower camel case,
unique within its tool — among them T4 `road`'s `way` (the class chips, with **Raised** and **Aqueduct**), `tunnel`, `link` and
`skyAccess`; T6 `place`'s `stamp`, `locus`, `footprint`, `furniture`, the two **Below** modes `chamber` and
`access`, and `wayDown` (on a building); T9 `shape`'s contextual modes, named by what is selected — `plot`, `building`, `massing`
(V02's massing tools at the building band), `plan` (V03's plan tools), `tiers` (a stepped building's tier controls,
V09 §4.20.5), `place`, `way` and `raised`; and T11 `name`'s `rename`, `moveLabel`, `region`, `newNames`, `leader` and `knownTo`. A
catalogue button and the clerk's `useTool` open a tool in one of them (V09 §2.9's `MsgButton.mode`; V09 §4.11), and T-V9-15
checks every such mode against `toolkit.json`.

| tool | modes · gesture | basic parameters | behind "More" | mapper → events | commit | badge extras · readouts | keyboard form | narrow · coarse |
|---|---|---|---|---|---|---|---|---|
| T1 `intend` | the **Kind of place** sheet: product chips (Town & city; Village when that product is registered, V07; Neighbourhood, V01's `product: 'hood'`), site cards (a forms-catalogue row with its water setting, side and era preset, §7.7, §7.8), size chips (seven, at population quantiles of the rungs' bands read from the rung table: small town, town, large town at the TOWN band's 25th, 50th and 85th percentiles; small city, city, large city at the CITY band's; metropolis at the METROPOLIS band's median — each showing its number, "about 3 400 people"; J-V9.56, the one rule for the size words, which V10 §3.3's lexicon names by quantile), wealth slider, walls chip (none · one ring · two rings), style card, the **History** chip (item 113; V09 §4.21.3); Surprise me; V06's time card | site, size, wealth, walls, style | exact population, seed, gates, castle, the features strip, planned ↔ organic, greenery, labels (the rest of §7.8's basic panel); "Advanced…" opens the advanced panel | empty state: a new `generate` replacing the untouched town (V09 §3.2); after a declaration: `adjust(param, value)` — a Re-derive for a parameter consumed before S10 (§7.1) | empty state: on release; after a declaration: a whole-town ghost with Accept (V09 §3.3); the fates sheet only after Accept, when fates other than kept or renames exist | the proxy thumbnails while a site or size card is hovered (§7.8); "Rebuilds from {stage}: {n} of your changes are kept, {m} move"; across the CITY line, the raised ways that go or come among the effects (V09 §4.20.3 (7)) | cards in a grid with arrow keys, Enter picks; sliders take arrows and Page keys | yes · yes |
| T2 `ground` | **Raise, Lower, Cliff, Flatten** (brush: press and drag); **Warp** (the eight kernels of §7.1, a session with Apply / Discard); **Lake** (one point, then drag up or down for the level; the **Spring-fed (oasis)** toggle, V09 §4.21.1); **River** (source point, mouth point); **River or canal** (draw a line; a width handle, default the kind's width row); **Coast & harbour** (sea level, one shore point, a basin size); **Water paint** (add or subtract water by lasso); **Terrace** (a brush that levels the ground under it to a level, with its level handle; V09 §4.20.1) | brush radius (m), strength | falloff, the terrain brush's water mode (`locked` by default, `follow`; §7.2), a warp's inner radius | a stroke → `setField { field: 'terrain', stroke }`; a warp session → one `warp`; lake → `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm } }`, with the toggle on `from: { points: [p], levelCm, spring: true }` (§7.1's `PointsForm.spring`; item 111 (a)); river → `drawWater { kind: 'river', add: [], from: { points: [source, mouth] } }`; a drawn river or canal → `drawWater { kind, add: [], line, widthCm }`; harbour → `drawWater { kind: 'harbour_basin', add: [], from: { points: [shore], levelCm, sizeM2 } }`; water paint → `drawWater { kind, add: rings }` or `drawWater { kind, add: [], subtract: rings }` (on Sky: with V05's `key`); terrace → `terrace { stroke, levelCm }` (file f item 362 (c)) | a stroke on release; a warp on Apply; water forms and a terrace on Accept | height under the pointer (m), slope (%), stroke length; "{n} plots re-flow · {m} roads re-routed" from the preview | a brush applies at the focused entity's scope with the arrow keys moving the brush centre and Enter stamping; points forms by arrows + Enter | no (view only: "Shaping the ground needs a larger screen") · yes |
| T3 `wall` | **Draw wall** (two or more points or a line; closes when its ends meet within 20 px); **Gate** (drop a gate stamp on a trace; slide a gate's grip — `moveVertex`, V09 §3.5); **Retaining wall** (two or more points or a line with the **High side** chip; V09 §4.20.1); **Repair** on a run (its **Material** chip: robust, or a patch row; V09 §4.21.4) and **Wear**; on the castle, its keep and bailey handles | High side (Retaining wall); Material (Repair) | the enceinte kind (§2.7), open or closed | a line → `drawWall { points, kind, closed }`, two or more points → `drawWall { points: [], kind, closed, from: { points } }`; a gate → `placeGate { enceinte, at, expansion }` (`expansion` sugar.json's current version); a retaining wall → `drawWall { kind: 'retaining', closed, highSide? }` with its line as `points`, or `points: []` and `from: { points }`; Repair → `convert { op: 'repairWall', enceinte, stretch, material }` and Wear → `convert { op: 'wearWall', enceinte, stretch }` (V06 §2.8) | on release; Accept when fates move houses or effects are listed | gates · towers · walled m · closed by barriers m · houses displaced · the districts enclosed, tinted (V09 §3.4); a retaining wall: V09 §4.20.1 (2)'s badge | points by arrows + Enter; Tab cycles gate grips | no · yes |
| T4 `road` | class chips (main, street, lane, alley, track, path, quay, pier, bridge, ford, **Aqueduct**); the **Raised** toggle (V09 §4.20.2); **Tunnel**, **Link** (Below, with the system chip); **Sky access** (Sky, or a stroke from the ground to a rim) | class, Raised | width (m), name, V07's walk mode at village rungs | two points → `drawWay { points: [], class, widthCm, from: { points: [a, b] } }` (S4's router); a line → `drawWay { points, class, widthCm }`; with Raised or Aqueduct → the same with `raised: true` (file f item 362 (b)); Below → `drawTunnel` / `addLink` (V04); Sky → `placeSkyAccess` (V05) | on release; a raised or aqueduct stroke always on Accept (V09 §4.20.2 (8)) | length (m), bearing (Shift snaps to 15°), grade (%), bridges, "{n} new frontage plots" (ghosts along the road; on a pier, quay or bridge "{n} deck plots", V09 §4.20.4); with Raised on V09 §4.20.2 (8)'s badge | points by arrows + Enter; Backspace or right-click removes the last point; PageUp / PageDown turn Raised on and off while drawing | no · yes |
| T5 `quarter` | a **kind card** first (the district-kind rows, V11), then: one **seed** point, **two to four corners**, a **lasso**, a **brush**, or **click inside** a road-enclosed block (takes that block whole); a name | kind, name, band chip (the band set's labels, §4.5) | size target (m², also the badge's plus / minus), sky (V05) | `quarter { boundary: [], from: { points, sizeM2? }, kind, name?, band?, expansion }` (§7.1's sugar; `expansion` sugar.json's current version); click-inside → the block's ring as the lasso form; at a village rung → `declareEnd` (V07); on a selected quarter: `setAttr`, `merge`, `split` (V09 §4.3) | Accept (pending ghost with handles, V09 §3.3) | plots · households · buildings, **plus / minus** stepping `sizeM2` by (band max − band min) ÷ 8, clamped into the kind's size band, from the band's median when unset (file f item 348) | kind cards by arrows; the seed at the focus point; handles by Tab | yes (seed and click-inside only) · yes |
| T6 `place` | **Stamp** (a searchable palette of class stamps grouped by category, V11's labels and icons, listing the classes the document's rung admits — V09 §4.16 (3)'s set; drop on a spot, a quarter, a road or a gate); **Locus** (type "near the north gate"); **Footprint** (draw a polygon); **Furniture** (V01's hood-pin stamps); **Below**: chamber (`chamber`), access (`access` — `placeAccess` on a chosen spot, over a sealed void the user's excavation; the mode `bend.under.noAccess`'s and `info.under.sealed`'s **Add a way down** open), each into the system the system chip names, and "New ruin", "New cavern", "New catacomb" where item 109 admits one (V09 §4.17.2); on a building: "Add a way down"; on a rejected site "Allow here again", on a pinned plot "Free this plot", on an assigned thing "Remove the assignment"; on a deck, its plots and a mole's or long bridge's landmark slots (V09 §4.20.4) | class, name | exact site ("this plot only"), the drift bounds (§7.7), a hidden front (item 63) | a drop on a plot → V10 §4.1's `where.at` row (with "this plot only", its `where.plot` row), the one mapping for canvas and clerk (T101-3): `placeAt` with `designation { cls, use }` (§4.7's `Designation`: the stamp's building class and its roster class id) and, when the name field is filled, a `setAttr { path: 'name' }` on the use that `placeAt` creates — its address read from the preview's `created` list (file f item 470) as V10 §3.11 (3) resolves a placeholder — the two in one group; a drop on a quarter, road or gate, or a typed locus → a one-line `roster { lines: [{ name, cls, locus }], expansion }` (`expansion` sugar.json's current version; an empty name field writes `name: ''`, file f item 571's unnamed line; one text with V10 §4.1's `where.locus` row; T6's own kind by file f item 570; the sugar expands to one `assign` whose id the engine mints from the event's `seq`, §6.3, so the app never writes an assignment id; the locus is a `Locus` (§7.1: its `rel` in, on, at or near, its `target` and optional `side`) parsed from the drop target or the typed words, V09 §4.16); **with a dossier connected** (§7.1's roster rule; J-V9.88) a locus drop of a class stamp previews the same one-line `roster`, and a line naming no element comes back `dossier-owned`: its refusal card is `refuse.roster.dossier` with the element picker of V09 §4.16 (5) (the unplaced elements, the stamp's class first; a pick re-previews the line with its `element`, V10 §4.1's `element` row) and **Put it at {site}** — `placeAt { plot, designation }` on the first `SiteCandidate` satisfying the locus, the alternative V10 §3.16 offers: the first candidate with no `hardFails` of `query({ kind: 'sites', cls, near: target.anchor, district: rel === 'in' ? target.id : undefined, k: 3 }, { admitAs })` — `target` the locus target's `EntityCard`, `district` only for `in` a quarter — one query for canvas and clerk; when none of the three is free of hard fails, **Put it at {site}** is not shown and the element picker stays — one rule with V10's `dossier` alternative, which is then not offered; footprint → `drawFootprint`; furniture → `instance { op: 'add' }` (V01); chamber → `drawChamber { system }` or `{ system: { newKind } }` (file f item 361); access → `placeAccess`; a way down → `addUndergroundAccess`; the lifts → `rejectSite { op: 'lift' }`, `placeAt { lift: true }`, `unassign` | Accept, or nudge (drag the ghost footprint to another plot: a new preview there) | the chosen plot's area, households; the one-line reason; two or three faint alternatives (file f item 463); on a deck "on the {deck} · at most {n} storeys · {a}–{b} m²" (V09 §4.20.4); a design above the rung's grandeur ceiling, honoured, with the line `info.grand.beyondTier` (item 115 (c); V09 §4.21.5) | the stamp palette is a listbox with type-ahead; the locus field is text; Enter accepts | yes · yes |
| T7 `roster` | **Paste** into the visible box in T6 `place`'s options ("Paste your list of places"); each line becomes a card with its guessed class (changeable) and locus; under the box, **Ask the assistant to place these** when a clerk is configured and on (V09 §4.11) | — | with a dossier: an element picker per line (unplaced elements) | one `roster { lines }` (§7.1's sugar) for the whole list; accepting card by card commits a `roster` with that card's line and re-previews the rest; with a dossier connected, a line committed naming no element comes back `dossier-owned`: its card is `refuse.roster.dossier` — the element picker and, when a candidate is free of hard fails, **Put it at {site}** by T6's `sites` query (`near` and `district` from the line's locus, both omitted for a line with none; V10 §4.1) — one rule with volume 10's `dossier` alternative (J-V10.93; J-V9.99) | Accept all, or per card | plots · households · buildings; sites placed · lines not placed (each with its nearest options) | the card list is a grid; Enter accepts the focused card | yes · yes |
| T8 `fill` | **Density**, **Mix** (an arrangement: dense rows, detached, compounds …), **Greenery**, **Prosperity** brushes; **Square**, **Park** (drop and size); **Land use** (a lasso: arable, pasture, orchard, wood); **Trees** (a brush: plant, thin, restyle); **Layout** card on a district (V01's fabric), its **Terraces** chip behind More | brush radius, the density dial (−3 … +3) | the arrangement's class, the layout's parameters (V01), the layout card's **Terraces** chip (auto · on · off; V01 §4.1) | density / greenery / prosperity → `setField { field, stroke }`; mix → `fill { scope: the blocks under the brush, arrangement, cls? }`; square / park → `drawGreen { polygon, kind }`; land use → `setAttrMany { ids: the land-use faces under the lasso, path: their kind, value }` (§2.7's land-use faces); trees → one group of `instance { op: 'add' \| 'remove' \| 'restyle' }` (a `drawGreen` first where no green hosts them); layout → `setAttr(district.fabric)` + `regenerate` (grouped, V01); terraces → `setAttr(district.terrace)` (`'on'`, `'off'`, or absent for auto) + `regenerate({ ids: [the district] }, 'keep')` (grouped, V01 §4.1) | brushes, mix, layout: Accept one of three variations, the committed group of V09 §3.6; square, park, land use, trees, terraces: Accept | plots · households · buildings; the variation tray | the brush at the focused scope; `[` `]` cycle variations; Enter accepts | no · yes (subject to §13.4's touch fallback) |
| T9 `shape` | contextual: on a plot — split (a two-point line), join (click a neighbour), corner drags, front jitter, reach; on a building — move and turn the footprint, storeys, roof kind and colour, door drags, basement, class, over-time actions, "Build it over time"; at the building band — V02's massing and V03's plan tools, and on a `stepped` building the tier controls (V09 §4.20.5); on a place — "What it cares about" (V09 §4.7); on a way — class, width and name, **Split here** (one click on it) and, with two ways selected, **Join these**; on a raised way, span or crossing — V09 §4.20.6's controls | the kind's primary controls | the rest of the kind's editable paths | the event kinds of V09 §4.3's T9 rows; on a way, Split here → `split { id: the way, cut: [p] }`, `p` the nearest point of the way's centre-line to the click by V10 §4.1's T9 rule, and Join these → `merge { ids: [the first selected, the second] }` | on release (each edit one undo step; V02 and V03 as they state) | "{n} households re-homed", the site plan's changes; a reshape above the rung's grandeur ceiling, honoured, with `info.grand.beyondTier` (V09 §4.21.5) | every control in the Shape tab is a form control | view and the Shape tab's forms only · yes (subject to §13.4's fallback) |
| T10 `hold` | contextual: the lock and pin toggles on any thing; **Keep these, re-roll the rest** on a lasso; **Try again** (New random) with scope chips (on Below also this run, this system); the **Re-roll brush** (V09 §3.7); **Reset to generated**; on an island **Update shade now**; **Delete** on any thing (the Delete key and the context menu; V09 §4.20.3; J-V9.74) | — | lock on attribute paths (a person's name, a room) | `lock` / `unlock` / `pin` / `unpin`; `revert`; `regenerate { scope, mode }` (V09 §3.7); `delete { id }` | lock and pin at once; a re-roll by Accept of a variation; a Delete at once, or on Accept when its dry run lists anything beyond the thing itself | the fates list (kept, carried, orphaned); held things stay bright while the rest ghosts | alt+Enter toggles the selection's lock (L stays the labels key, §14); R is Try again | yes · yes |
| T11 `name` | click a label to type a new name; drag a label; select quarters and **Name as region**; **New names** with a scope (these, this quarter, the town); the leader-line switch; "Who knows this place" | — | name packs and a user's own name list (§10.4, an `adjust` of packs) | `setAttr(name)` — or `setAttr(label.displayText)` for a dossier-owned name; `moveLabel`; `hideLabel`; `group`; New names — these → `rerollLayer { concern: 'naming', ids: the selection's named entities, salt: 0 }`; this quarter → the same with `ids` the quarter and every `gazetteer` row not marked withheld whose district is the quarter, read with `admitAs` = `effectiveKey()` (V09 §2.7; J-V9.110); `ids` in address order in both scoped forms, their per-entity `salts` the dry run's (§6.3 case (3)); the town → `rerollLayer { concern: 'naming', salt: the concern's current salt + 1 }` with no `ids`, through the fates sheet — a concern's current salt is §6.1's effective salt, as `DisplayList.salts` carries it; `setAttr(knownTo)` | on Enter or release; a town-wide New names or a pack change via the fates sheet (it lists every rename, §6.3 case (4)) | "{n} names change" | F2 renames the selection; Tab moves between labels in view | yes · yes |
| T12 `dress` | **Style** cards (the shipped families, random style, saved sheets); the **quarter tint** toggle; a selected quarter's **Colour** swatch; the **furniture tray** (compass, scale bar, title cartouche, legend, emblem, border, grid, north arrow, annotation marker); **Light** (day or night, sun: cursor, fixed or path, sun height, hour); **Ground texture** brush; **Lights** (drop a lamp or a torch); **Underlay** (an image to trace, its opacity and frame handles); the close-up's quieter / busier slider and vignette (V01); **New trees**, **New decoration**, **New emblem** and **New compass** (buttons in the Dress panel; V09 §3.7, V09 §4.19) | style, tint, furniture, light | ground texture, lights, underlay, the style's rows ("Edit this style…", the style dialog) | style card → `setStyle`; tint → `setStyle` (a thematic row); a quarter's colour → `setStyle` (a thematic row keyed by that district); furniture and light → view keys by `setView` (§9.5, §2.9); ground texture → `paintGround`; lights → `placeLight`; underlay → the `underlay` view key; close-up → `closeup` params and `setStyle` (V01); New trees → `rerollLayer { concern: 'render.instances', salt: the concern's current salt + 1 }` (town-wide, §6.1; display only: the trees, hedgerows and render-time field strips are re-drawn and nothing else moves; J-V9.101); New emblem → `rerollLayer { concern: 'naming.emblem', salt: the concern's current salt + 1 }` and New compass → `rerollLayer { concern: 'style.compass', salt: the concern's current salt + 1 }` (town-wide; the emblem generator and the compass program re-draw, nothing else, §9.5); New decoration → one `group` of `rerollLayer { concern: 'style.jitter', salt: the concern's current salt + 1 }` then `rerollLayer { concern: 'style.crowns', salt: the concern's current salt + 1 }`, in §6.1's registry order (town-wide; display only: the drawing's render-time jitter and the tree crowns' shapes are re-drawn and nothing else moves, §6.1; one undo step; J-V9.115) | at once; logged ones are one undo step each; view-key changes are not logged and are toggled back | — | every card and toggle is a button; the underlay's frame handles by Tab and arrows | yes (not the texture brush or the underlay) · yes |
=== END ===

=== REPLACE ### 4.6 Multi-selection and moving things (R16) ===
### 4.6 Multi-selection and moving things (R16)

* **Selecting several.** Shift+click adds or removes a thing; shift+drag on empty map draws a box; the lasso (T10 `hold`'s lasso,
  or the lasso chip in the selection menu) selects every thing whose mark centre lies inside; the gazetteer and
  "features in view" lists select with ctrl / cmd+click and shift+click; ctrl / cmd+A selects every thing of the primary's
  kind in its district.
* **Moving.** Dragging any selected thing moves the whole selection by the same world offset, each thing by its own event
  kind, all in one `group` (one undo step): a building by `moveFootprint`, a label by `moveLabel`, a decoration, tree or
  hood pin by `instance { op: 'move' }`, a light by `setAttr(point)`, a vertex handle by `moveVertex`, a place (a
  `placeAt` pin) by `placeAt` on the plot under its new centre. Things that cannot move (a district, a whole road) are
  left in place and named in the badge ("2 roads stay; drag their handles to move them"). The ghost shows every moved
  thing at its new place; the dry run's fates list what re-fits around them. Rotation (a building's `rotateCdeg`) is the
  rotate handle of a single selected footprint.
* **Reaching what lies beneath** (item 110 (b)). A click on the already-selected thing, where more marks lie under the
  pointer, selects the next one down — a raised deck, then its span, then the arch vault, then the street — and the
  context menu lists **Select below: {name}** for each (V09 §4.20.8; file f item 466). A double-click still zooms to the thing's
  band.
* **Copy and paste** are not offered: a copied building is not a declaration the rules can derive, and the survey records
  the request only for free-form builders (Tiny Glade, `research/ux/tool-survey.md` §1 rank 5); a "same kind here" is T6 `place`'s
  stamp.
=== END ===

=== REPLACE ### 4.8 Knowledge in the editor — "View as" ===
### 4.8 Knowledge in the editor — "View as"

The view bar's **View as** menu (owner and editor roles) chooses what this view **shows**: "Everything" (the role's
tier), "What locals know" (`local`), "What anyone knows" (`public`). It is a display filter, not the view's knowledge key
(J-V9.46): it sets `ViewOpts.viewAs` (file f item 464), which §9.2's admission function (E-17) reads for this view's tiles and labels, admitting
only what both the key and `viewAs` admit. **Every other read for the view** — the panels, the gazetteer, the why card,
the Link card, the People panel, the family tree, "Where is", T6 `place`'s alternatives and the clerk's reads for this drawer —
passes the view's effective key (V09 §2.10's `effectiveKey()`) as `admitAs` on its band-less `query` (file f item 572;
V09 §2.7), and the export dialog's default knowledge is that same key (file f item 453). The per-viewer `knowledge` key
stays the role's (§11.3), so compaction, ctrl / cmd+S and "Download all my towns" — which need tier `secret` (§11.1) —
keep working while the owner views the town as a player. It only lowers (a client never raises its tier above its role's,
J-A30.82), a tier keeps the key's places list, and while it is lowered a banner "Viewing as: what anyone knows"
(`info.viewAs`) stays up and "Show hidden caves and ruins" is hidden. The export dialog shows what it will write and can
lower it further for that export (file f item 453).

**A host's players' view** (J-V9.85). A host may set `viewAs` to a key form — a tier with the places the
party has learned. V08's "See what the players see" (V08 §3.14 (5), `seePlayersView`) is that: the embed's bridge
handler (V08 §3.1) applies the resolved party key to the frame's view by `setViewOpts(view, { viewAs: { tier, places }
})` and clears it with `viewAs: undefined`, with no view-state write, so the frame's knowledge key and its document
formats stay the role's. While a host's form is set, the View as menu reads **"What the players know"** — a fourth
entry, shown only then and selected — with its other entries disabled under the line `info.viewAs.host`; the View as
banner is not drawn, because the host's strip "Showing what the players see" (`HostSlots.banner`, V08 §5.1) stands for
it; and `effectiveKey()` returns the form by V09 §2.10's rule, so the panels, the why card, the Link card, the gazetteer,
the drawer and the export default all read as the players would.
=== END ===

=== REPLACE ### 4.9 The words — the message catalogue's rows (English, our own) ===
### 4.9 The words — the message catalogue's rows (English, our own)

Every line a user reads for a bend, a refusal, a fate, an error, a share condition or a hint is a row of
`messages/en.json` (V09 §2.9). The rules for writing one: one sentence, at most 25 words; say what happened and what to do;
name the thing by its name, never by an id; never "error", "invalid", "conflict" or a code in the text; offer the action as
a button when there is one; the bend tone is gentle ("follows", "kept"), never apologetic. **Bend before refusing**
(R2; J-V9.44): where the dry run can name the nearest lawful alternative, the engine bends to it and the row is a `bend`
with that alternative pre-selected and the other one click away; the only refusals left are a dossier fact, a lock or an
assignment, a dependent later change, the viewer role, a staged layer, the rung, the screen and a table edit V11 §4.1
refuses — availability gates, not bends of a lawful declaration (J-VI.4) — and the conflicts and caps §7.1's table names,
each offering its one resolution or none (content an earlier stage made, a stale base, a household capacity or a Works
conflict, a style or knowledge table the loader would refuse, a host's or an upgrade's size cap, a bug abort); every other
cause of a dry run, the island, aqueduct and rim cases and V02's
massing cases among them, is a bend row. **One row per outcome** (E-07): every key §7.1's dry-run outcome table names has
its row here, worded for the cause, detection and outcome of each outcome row that names it (one key may word several
outcome rows); and every `bend.*` and `refuse.*` row here names its producer in its codes column — an outcome row of
§7.1 (a bend a volume's dry run makes under its last row, *every other infeasible declaration*, naming that volume's
section), or, for a gate outside that table, §11.1's export rule (`refuse.exportTier`), §11.2's `advance` on a
dossier-bound document (`refuse.dossierClock`, V06 §2.3), the shell's screen and layer gates (`refuse.phone`, V09 §4.12;
`refuse.layer`, V09 §4.2), V09 §3.9 (`refuse.restore.dossier`) or V10 §3.16 (`refuse.clerk.*`). T-V9-15 checks both
directions. A row's text is the user's words; the design's name for the same concept is the glossary's (`refuse.kept`'s
"Rebuild from {stage}" is §7.1's Re-derive; the re-roll control's "Try again" is New random, and no other control is so
worded — an export's retry is **Retry**, a proposal card's `retry` **Ask again**).
**Every** refusal row carries at least one button, at the least **Show me why** (the why card of the blocking thing, or the help page of the
limit — the target chosen by V10 §3.5 step 3's *The why target*, one rule for this button and the clerk's `why` action,
cited, not restated; J-V9.120) — and the rule is data: every `refuse.*` row's `buttons` end with
`button.showWhy` (T-V9-15). **The button column** is each row's `buttons` list (V09 §2.9's `MsgButton`), in
order and separated by " · ": each button its `button.*` key, then its class and the data the class needs — `commit(…)`
with its source (a `ConflictAction` kind; `alternatives` with its list form `each`; `unplaced`; or `event:<form>`, a row of
*The event forms* below), `why` (with `page` where the row names one), `show(…)` with its `arg`, `tool(<tool>/<mode>)`
with `subject: <argument>` where it acts on the row's thing, `drop`, `app(…)` with its command and argument — and a `when`
in brackets (`[owner]`, `[names]`). A name in backticks after `show`, `subject` or `app` is the `MsgRef` argument it reads
(V09 §2.9's *Arguments a button reads*). The words are *The `button.*` rows* after the table. The shipped rows:

| key | text (placeholders in braces) | buttons — the row's `MsgButton` list (V09 §2.9) | engine codes it renders |
|---|---|---|---|
| `bend.wall.ridge` | "The wall follows the ridge, {m} m off your line." | — | `PreviewResult.bent` (S5a's trace) |
| `bend.wall.reach` | "The wall reaches the {barrier}; the ground between becomes gardens." | — | item 106 (b) |
| `bend.wall.waterfront` | "Kept the harbour open with {n} sea gates." | — | item 106 (d) |
| `bend.wall.open` | "Open ground needs a wall; kept a light wall here." | — | item 106 (c) (V09 §4.7) |
| `bend.road.route` | "The road goes round the {obstacle}; it is {m} m longer than a straight line." | — | S4's router (§4.3) |
| `bend.road.bridge` | "The road crosses the {water} on a new bridge." | — | §7.1's drawn-bridge rule |
| `bend.quarter.snap` | "The quarter's edge follows the streets; it never cuts through a block." | — | §7.1's quarter snap |
| `bend.quarter.size` | "A {kind} quarter here holds at most {n} plots; it stops at {edge}." | — | the kind's size band |
| `bend.place.site` | "{name} fits best {m} m away: {reason}." | `button.putHereAnyway` commit(`event:exactSite`) | S10b's site choice |
| `bend.lake.level` | "The water fills the hollow to {level} m; above that it would spill." | — | S1's basin fill |
| `bend.river.course` | "The river runs downhill, so it reaches {mouth} this way." | — | S1's water operator |
| `bend.harbour.size` | "The shore allows a basin of {size} m² here." | — | §4.8's harbour rules |
| `bend.roster.line` | "{name} went {where} instead: {reason}." | `button.show` show(`name`) | the roster's solve |
| `bend.fill.band` | "This quarter's wealth sets its building sizes; used the nearest mix it allows." | — | the band's rows (§4.7) |
| `refuse.dossierOwned` | "SettlementForge sets this. Change it there, or show a different name on this map." | `button.otherName` tool(`name`/`rename`, subject: `thing`) [names] · `button.showWhy` why | F-EDIT `dossier-owned` |
| `refuse.dossierRemove` | "SettlementForge keeps {thing} in this town. You can move it, or mark this spot as not for it." | `button.moveIt` show(`thing`) — selected with its handles; dragging moves it (V09 §4.6) · `button.notHere` commit(`event:notHere`) · `button.showWhy` why | F-EDIT (§7.7 item 2's list); `rejectSite`, `placeAt` offered |
| `refuse.roster.dossier` | "SettlementForge's record decides this town's places. Place one of them here, or put {thing} on a plot {locus}." — slots: `{thing}` the line's name, or the class's display label when the name is `''`; `{locus}` the line's locus worded by V09 §4.16 (6) ("near the North Gate"), or for a line with none the settlement's name after `in`'s connective ("in Oakford") (J-V9.100) | `button.placeElement` commit(`unplaced`) — V09 §4.16 (5)'s picker · `button.putAt` commit(`event:firstFreeSite`) (not drawn when no `sites` candidate is free of hard fails) · `button.showWhy` why | F-EDIT `dossier-owned` on a `roster` line naming no element — T6 `place`'s one line, any line of T7 `roster`'s list, or the clerk's (§7.1's roster rule; V09 §4.5's T6 and T7) |
| `refuse.locked` | "{thing} is locked. Unlock it to change it, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) — the closest acceptable declarations that leave the locked thing untouched (item 101 R2; item 20 (g)) · `button.showWhy` why | `E_LOCKED`; `ConflictAction` `unlock`; `PreviewResult.alternatives` |
| `refuse.assigned` | "{thing} is assigned. Remove the assignment to change it." | `button.unassign` commit(`unassign`) · `button.showWhy` why | `ConflictAction` `unassign` |
| `refuse.assignment.noSite` | "No plot here suits {thing} as it is assigned. The closest places are marked." — the marked places are the refusal's `moveTo` actions | `button.putAt` commit(`moveTo`) — the same declaration at the first `moveTo` target, previewed: an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` (J-V9.111) · `button.showWhy` why | F-EDIT (§5.2 as file f item 582 amends it): an assignment, or the re-placement a `rejectSite` causes (§7.7), that no plot satisfies inside the hard rows |
| `bend.place.noSite` | "{thing} needs {reason}; it went to {site}, the closest place that has it." | `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; no plot here in the hard rows); `PreviewResult.alternatives` for the other acceptable sites (file f item 463; file f item 582's alternatives) |
| `bend.place.overBudget` | "Putting {thing} there would move {n} other places; it went to {site}, which moves {k}." | `button.overBudget` commit(`event:exactSite`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; the disruption budget) |
| `bend.vacate` | "This pulls down {building}; its {n} households move to {where}." | `button.keepBuilding` drop (withdraws the edit) | the dry run's bend (file f item 582; item 31's demolition as a fate, item 17's relocation) |
| `bend.room.minArea` | "The {room} stays at {m2} m², the smallest a {role} can be." | `button.roleInstead` commit(`event:roomRole`) · `button.showWhy` why | F-EDIT (plan minimum), bent to the smallest lawful split (V03 §4) |
| `bend.room.noDoor` | "Moved the wall so every household keeps its own door." | `button.showWhy` why | F-EDIT (item 28 (f)), bent to the nearest wall position that keeps each unit's door |
| `bend.room.unreachable` | "Kept a door so every room can still be reached from the entrance." | `button.showWhy` why | F-EDIT (item 28 (f); V03 §3.2 A6), bent to the nearest lawful form that keeps every room reached — the door kept, or moved to the nearest wall whose other side reaches circulation (V03 §4.2) |
| `bend.capacity` | "This building holds at most {max} households; set to {max}." | `button.showWhy` why (J-V9.123) | F-EDIT (`relet` above capacity), clamped |
| `bend.passage` | "A passage needs two storeys above it; it goes under the two-storey part of {building}." | `button.showWhy` why | F-EDIT (`Passage.headroomCm`), moved to the nearest lawful run |
| `refuse.capacity.household` | "{n} households in {district} have nowhere left to live there; move them first." | `button.show` show(`district`) · `button.showWhy` why | §7.1's capacity row: a capacity re-homing that cannot place a household filling no dossier's population (§2.6's capacity rule), the capacities that refuse it named; item 17's relocation first |
| `refuse.works.access` | "These works would cut off {plot} or leave its people without a home; move them first." | `button.show` show(`plot`) · `button.showWhy` why | §7.1's Works row (§5.3; item 67): a plot left without access or a building's occupants unhoused, the plots and households named; item 17's relocation first |
| `refuse.warp` | "That push would move {thing} off its ground. Unlock it, push more gently, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) · `button.showWhy` why | F-EDIT (warp carrying a held record); `PreviewResult.alternatives` |
| `refuse.water` | "The new water would reach {thing}, which is kept. Unlock it, move the water, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) · `button.showWhy` why | F-EDIT (§7.3 (b) 3); `PreviewResult.alternatives` |
| `bend.warp.halved` | "The push went half as far here, so nothing it moves breaks." | — | §7.1's warp-step row: a step that would break an invariant, halved (§3.6) |
| `bend.carve` | "The river takes the deepest course the ground allows, {m} m at most." | `button.showWhy` why | F-EDIT (`carveMaxCm`), bent to the deepest lawful course |
| `refuse.kept` | "That would cut through {thing} made earlier. Rebuild from {stage} instead?" | `button.rebuildFrom` commit(`event:rederive`) · `button.showWhy` why | `E_KEPT`, `E_LEVEL` (§7.1's one resolution) |
| `bend.invalid` | "{field} can't be {value}; set to {nearest}, the nearest it allows." | `button.showWhy` why | §7.1's value-range row: a table cell or an edited path outside its declared range, clamped to the nearest lawful value (`PreviewResult.bent`) |
| `bend.frame.held` | "The town's edge stays out far enough to keep the {n} things you made, locked or pinned." | `button.showWhy` why | §7.1's frame row: a Re-derive whose frame law would leave locked, pinned or declared things or drawn constraints outside, given the smallest frame that encloses them (§3.2 (9); §7.4's frame row) |
| `refuse.stale` | "The town changed while you were working. Here is the new preview." | `button.newPreview` show(`preview`) · `button.showWhy` why | `ConflictAction` `stale`; `doc.rejected { stale }` |
| `refuse.staged` | "{layer} isn't part of this version yet." | `button.showWhy` why(page `staged/{layerId}`, the staged layer's guide page) | F-EDIT naming a staged layer (§7.3 item 9 (d)) |
| `refuse.islandsRung` | "Floating islands exist only in cities and metropolises." | `button.cityUp` commit(`event:cityUp`) · `button.showWhy` why | §7.8's disabled control |
| `refuse.undo.creation` | "This is where the town began. Remove the assignment instead." | `button.unassign` commit(`event:unassignCreation`) · `button.showWhy` why | F-EDIT (undo of a creation event) |
| `refuse.undo.dossier` | "Changes from SettlementForge can't be undone here." | `button.otherNameHere` tool(`name`/`rename`, subject: `thing`) [names] · `button.showWhy` why | F-EDIT (undo of a dossier event) |
| `refuse.undo.dependent` | "Later changes by {authors} depend on this. Undo those first." | `button.showThem` show(`dependents`) · `button.showWhy` why | F-EDIT (independence, §7.4) |
| `refuse.restore.dossier` | "The town can go back only to {time}; SettlementForge changed it after that." | `button.goBackTo` app(`goBack`) · `button.openCopy` app(`openCopy`) · `button.showWhy` why | V09 §3.9 |
| `refuse.viewer` | "You're viewing this town. Ask its owner to make changes." | `button.showWhy` why | `preview` refused `role`; `doc.rejected { role }` |
| `refuse.exportTier` | "This file holds every secret of the town; only its owner can make it." | `button.pictureInstead` app(`exportPicture`) · `button.showWhy` why | `E_KNOWLEDGE_TIER` |
| `refuse.phone` | "{tool} needs a larger screen. Open this town on a tablet or computer." | `button.shareDevice` app(`share`) · `button.showWhy` why | V09 §4.12 |
| `refuse.layer` | "{tool} works on the {layer}. Switch to it first." | `button.switch` app(`switchLayer`, `layer`) · `button.showWhy` why | V09 §4.2 |
| `refuse.dossierClock` | "SettlementForge keeps this town's time; make a what-if copy to run it ahead." | `button.whatIf` app(`openCopy`, `seq` — the head: a detached `forkAt`, V06 §4.4; in host mode by `HostSlots.newDocuments`) · `button.showWhy` why | §11.2's `advance` refused on a dossier-bound document (V06 §2.3; J-V6.2); the time card's **Advance** there (V09 §5.6) |
| `refuse.table.rung` | "Below a city the town raises no ways by itself; draw this one yourself with Raised on." | `button.drawRaised` tool(`road`/`way`) — T4 `road`'s options strip with its **Raised** toggle on (V09 §4.20.2) · `button.showWhy` why | §7.1's table-edit row: an `editTable` setting a `raisedWays` row below CITY, item 110 (b)'s rung gate (V11 §4.1, V11 §4.4) |
| `refuse.table.ownerRule` | "{cell} is fixed by a rule of the map and stays {value}." | `button.showWhy` why | §7.1's table-edit row: a stamped owner-rule cell (V11 §4.1; V11 §3.2.1 step 4) |
| `refuse.table.invalid` | "{cell} can't be {value}; it takes {expected}." — `{expected}` the cell's schema as the tables editor words it: a unit and range, an enumeration's values, or a row of the table its `ref` names (V09 §4.14) | `button.showWhy` why | §7.1's table-edit row: a dangling `ref` or a type error in an `editTable` (V11 §4.1) |
| `refuse.table.knowledge` | "With these rows someone who knows more would see less; a place everyone knows shows at every scale." | `button.showWhy` why | §7.1's knowledge-admission row: `ConflictAction` `invalid` on an `editTable` of `knowledge.admit` (§9.2), the offending rows marked in the tables editor |
| `refuse.style.order` | "This style leaves {n} pairs of layers without an order; set them in the style dialog." | `button.showWhy` why | §7.1's style row: `ConflictAction` `invalid` on a `setStyle` leaving an unresolved or ambiguous layer-order pair (§8.2; J-R39), the pairs listed in the style dialog; nothing applied |
| `refuse.host.cap` | "{host}'s content would make this town {size}, more than a town can hold; it was not added." | `button.showWhy` why | §7.1's host-cap row: a host provider's output past §2.9's cap on pack data and host content |
| `refuse.upgrade.packCap` | "Updating would make this town's copy of {pack} too large to keep, so the town stays as it was made." | `button.notNow` drop — keeps the old model (§7.5) · `button.showWhy` why | §7.1's upgrade row: an upgrade's copy of a pack that stops shipping would pass §2.9's cap (§7.5), "keep the old model" its one resolution |
| `refuse.bug` | "That change hit a fault in the map engine, so nothing changed; the report keeps the details." | `button.showWhy` why | §7.1's bug-abort row: nothing commits; the cause `bug` with its stream key in the report (§5.1 (8), §5.4) |
| `share.pack` | "This town uses the setting pack {pack}, which isn't built in. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (pack) |
| `share.corpus` | "This town uses your own name list {list}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (user corpus) |
| `share.host` | "This town uses content from {host}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (host content) |
| `share.kept` | "This town was kept from a saved copy, so a link can't rebuild it. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (rebased base) |
| `share.long` | "Too many changes for a link. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (2 000 characters) |
| `fate.kept` | "stays as you made it" | — | `EditFate` `kept` |
| `fate.carried` | "moves with its new surroundings" | — | `carried` |
| `fate.orphaned` | "loses what it was attached to; it stays in the history and can be re-attached" | `button.reattach` app(`reattach`) | `orphaned` |
| `fate.discarded` | "your change is removed" | — | `discarded` |
| `error.workerRestarted` | "The map engine restarted. Nothing was lost." | — | V09 §3.14 |
| `error.workerDead` | "The map engine could not restart. Your town is saved; download it or reload the page." | `button.download` app(`download`) · `button.reload` app(`reload`) | V09 §3.14 |
| `error.engine` | "This browser can't run the map engine: {reason}." | — | `E_ENGINE_UNAVAILABLE` |
| `error.previewSlow` | "Big change: the preview will show when you let go." | — | V09 §3.14 |
| `error.storageFull` | "Your computer is out of space for saved towns. Download this town to keep it." | `button.download` app(`download`) | quota |
| `error.storageNone` | "This browser won't let the editor keep your town. Download it to keep your work." | `button.download` app(`download`) | IndexedDB refused |
| `error.exportFailed` | "The export stopped: {reason}. Nothing was saved. Retry?" | `button.retry` app(`retry`) | an exporter's error |
| `error.openRefused` | "This file can't be opened: {reason}." | — | `open` / `generate` errors |
| `info.upgrade.offer` | "Made with {version}; it opens as it was made, and updating it to {current} adds what's new." | `button.seeChanges` app(`seeUpgrade`) · `button.notNow` drop | §2.9 step 3, §7.5 (V09 §3.14 (a); standalone only) |
| `error.frozen` | "Made with {version}, shown read-only and not checked by this version; edit it with this version, or replay it exactly with the command below." | `button.editWithVersion` app(`editWithVersion`) [owner] · `button.copyCommand` app(`copyCommand`) | §2.9 step 2 (V09 §3.14 (b)) |
| `error.frozen.damaged` | "Part of this saved copy is damaged, so it can't be edited here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's damage: a chunk missing its content hash, or the records root differing at the rebase |
| `error.frozen.pack` | "This town needs the setting pack {pack}, which can't be added here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's missing pack; §7.5's 2 MB cap at the `frozenImport` rebase |
| `error.frozen.noModel` | "Made with {version}, and this file keeps only its recipe and changes; open them with this version, or replay it exactly with the command below." | `button.openRecipe` app(`openRecipe`) · `button.copyCommand` app(`copyCommand`) | §2.9 step 2's document without `model` (V09 §3.14 (c)) |
| `error.mismatch` | "This saved town differs from what its recipe rebuilds ({n} differences). Keep the saved town, or use the rebuilt one?" | `button.keepSaved` app(`keepSaved`) · `button.useRebuilt` app(`useRebuilt`) | §2.9 step 4 |
| `error.recoveryPartial` | "Recovered your town up to {time}. {n} later changes could not be replayed." | `button.downloadThem` app(`downloadUnreplayed`) | V09 §3.8 |
| `error.newerApp` | "This town was saved by a newer version of the editor; it opens read-only here." | `button.reload` app(`reload`) · `button.download` app(`download`) | a `LocalDocRecord.appVersion` above the running one (V09 §2.11, V09 §3.14) |
| `error.linkVersion` | "Made with {old}, shown with {new}; small differences are expected." | — | §6.4 |
| `success.applied` | "{change}." | `button.undo` app(`undo`) | every commit |
| `success.saved` | "Saved {file} ({size})." | — (J-V9.123) | V09 §3.10 |
| `success.restored` | "Went back to {name}." | `button.undoGoingBack` app(`undoGoingBack`) | V09 §3.9 |
| `bend.under.accessDug` | "Dug a way down from {building} so people can live there." | `button.useAnotherBuilding` commit(`alternatives`, each `button.digDownFrom`) — on the canvas the stepping button, while the dry run's `alternatives` holds a building not yet tried (V09 §4.17.4); the list form, one per building where a card shows every alternative at once (V10 §3.16), `{building}` read at the card's reader's key — the canvas at the role's key, J-V9.86; the clerk at its session key (J-V9.118) · `button.showWayIn` show(`created:access`) | V09 §4.17.4 (file f item 372) |
| `bend.under.accessOpening` | "Opened a way down at {place} so people can live there." | `button.showWayIn` show(`created:access`) · `button.showWhy` why (steps 2 and 3 run only when no building qualifies, so no building is offered) | V09 §4.17.4 |
| `bend.under.noAccess` | "Nobody can reach this cave yet, so the homes stand above it." | `button.addWayDown` tool(`place`/`access`) — T6 `place`'s Below access mode on a chosen spot · `button.showWhy` why | V09 §4.17.4 (4): the dry run's bend onto ground part 0 (item 101 R2) |
| `bend.catacomb.church` | "Churches keep crypts; catacombs lie under cemeteries. This is {church}'s crypt." | `button.startCatacomb` commit(`event:catacombUnder`) · `button.showCrypt` show(`crypt`) | V09 §4.17.5 (a) |
| `bend.catacomb.join` | "{town} may have {count} catacombs; this joins the Catacombs of {name}." | `button.showWhy` why | V09 §4.17.5 (b) |
| `bend.catacomb.charnel` | "{town} may have {count} catacombs; {ground} keeps a charnel vault instead." | `button.joinCatacombs` commit(`event:joinCatacomb`) | V09 §4.17.5 (b) |
| `bend.catacomb.belowTown` | "Catacombs come with towns; {ground} keeps a charnel vault." | `button.showWhy` why | V09 §4.17.5 (c) |
| `bend.catacomb.noGround` | "Catacombs lie under cemeteries; this is a vault." | `button.startItUnder` commit(`event:catacombUnder`) | V09 §4.17.5 (d) |
| `bend.crypt.cathedral` | "A cathedral always keeps its crypt, the largest in {town}; kept at its smallest, {m2} m²." — `{m2}` from the bend's kept ring (V03 §3.7.4 (1)) | `button.cryptSmallest` commit(`event:cryptSmallest`) | V03 §3.7.4's crypt-edit dry run (V09 §4.17.5 (e)) |
| `bend.crypt.largest` | "The cathedral keeps the largest crypt; this one stops at {share} of the cathedral's." | `button.cryptEnlarge` commit(`event:cryptEnlarge`) | V03 §3.7.4's crypt-edit dry run: the rank cap `crypt.rankShare` × the principal's area (V09 §4.17.5 (e)) |
| `bend.ruin.axis` | "The old walls run on the ruin's own lines; your room turned {deg}° to follow them." | — | V04 §4.1's ruin chamber |
| `info.catacomb.stagnant` | V10 §3.9a's stagnation line (its text, single source) | `button.showWhy` why | `CatacombComplex.blockedBy` non-empty |
| `info.catacomb.stopped` | V10 §3.9a's `stopped` state line | `button.showCemetery` show(`source`) | `blockedBy` holds `sourceClosed` |
| `info.catacomb.overCount` | V10 §3.9a's `overCount` count line | `button.showWhy` why | `CatacombComplex.overCount` |
| `info.catacomb.blocked.<cause>` | this volume's words, one per `blockedBy` value — V09 §4.17.5's "Over time" lines (`reach`, `wet`, `system`, `foundation`, `wallStrip`, `depth`; `rank` is V10 §3.9a's rank line) | — | `CatacombComplex.blockedBy` |
| `fate.catacomb.removed` | "The catacomb gives up {m2} m²; it will not dig here again." | `button.undo` app(`undo`) | a `delete` of catacomb galleries (J-V4.56) |
| `fate.access.lastWay` | "This was the last way into {place}; {n} households there leave." | `button.keepWayOpen` drop (withdraws the edit) | a `bricked`, `delete` or `seal` of a cluster's last access (V04 §4.3) |
| `info.under.deep` | V10 §3.9a's sealed-deep-void line | — | a sealed void's `underground` section (item 109 (j) (5)) |
| `info.under.sealed` | V10 §3.9a's unexcavated line | `button.addWayDown` tool(`place`/`access`) | an `unexcavated` cluster (V04 §3.5.7 (g)) |
| `info.under.cause.<rule>` | this volume's words, one per `AccessCause.rule` — V09 §4.17.3's table | — | an access point's `underground` row |
| `why.section.<kind>` | a why section's title, one per section V10 §3.9 registers: `underground` "Below ground" · `crypt` "The crypt" · `raised` "Raised ways" · `massing` "Its shape" · `plan` "Inside" · `fabric` "The streets around it" · `island` "Shade from above" · `move` "Over time" | — | `WhyCardModel.sections[].title` (V09 §2.7) |
| `clerk.key.unchecked` | "Saved. The key will be checked when you are back online." | — | `setKey` returning `unchecked` (V09 §4.11) |
| `clerk.host.mark` | "{host}'s assistant (AI)" | — | a host proposal's card (V09 §4.11) |
| `clerk.defect.<kind>` | `previewMismatch` "The assistant's preview and the map's differed." · `badRequest` "The AI service turned down a request." · `placeholder` "A step of a proposal no longer matched the map." · `creationDigest` "A new town came out differently from its preview." | — | V10 §2.8's `DefectRecord.kind` (V09 §5.12) |
| `clerk.defects.none` | "No problems recorded." | — | an empty defect store (V09 §5.12) |
| `clerk.key.missing` | "The assistant needs your own key for the AI service." | `button.enterKey` app(`enterKey`) · `button.notNow` drop | the drawer's first opening, only where the deployment's configuration enables the built-in clerk with a user's key — standalone, or a host that asks for one (V09 §4.11; J121) |
| `clerk.cap.warn` | "The assistant has used {share} of this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | V10 §3.18 |
| `clerk.cap.reached` | "The assistant has reached this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | the meter's foot line only (V09 §4.11; V10 §3.18); the drawer's refusal card at the cap is `refuse.clerk.budget` (V10 §3.16) |
| `info.viewAs` | "Viewing as: {tier}." | `button.showEverything` app(`viewAsOff`) | V09 §4.8 |
| `info.viewAs.host` | "Turn off “See what the players see” to choose another view." | — | V09 §4.8 (the View as menu while a host's players' view is set) |
| `info.copy.saved` | "Saved a copy to your computer as {file}; it does not follow {host}." | — | V09 §3.9's host-mode rule under `newDocuments: 'download'` |
| `info.copy.rerunEdits` | "{n} later hand edits were not carried; they stay in this map." | — | the same, after a re-run (V09 §3.9) |
| `info.copy.condensed` | V06 §3.15.5's line, "history before year N was condensed; the copy starts at year N" (its text, single source, loaded from volume 6 as V09 §4.9's explanation paragraph loads volume 10's families; `{year}` for N) | — | `forkAt` or `rerunFrom` bent to the earliest seq before a rebase point (V06 §3.15.5, V06 §4.4; J-V6.98): the copy's `forkedFrom.seq` above the seq asked (V09 §3.9's *Before a rebase point*) |
| `clerk.newMap.line` | "Describe the new town — this one stays as it is" | — | the drawer's Start a new map from this (V09 §4.11) |
| `history.group.party` | "The party" | — | the history panel's host group (V09 §4.10) |
| `history.dossierFacts.creation` | "Made from SettlementForge's record" | — | the history panel's creation head (V09 §4.10) |
| `report.moved.<kind>` | one per `ReportEntry.kind` (§5.4): `place` "{element} now stands on {site}." · `reject` "{site} is marked as not for {element}; it stands elsewhere." · `lapse` "The mark keeping {element} off {site} has lapsed." · `open` "{use} opened on {to}." · `close` "{use} closed on {from}." · `relocate` "{use} moved from {from} to {to}." · `mutate` "{plot} was rebuilt for this change." · `disruption` "This change moved a few places nearby." · `disruption.over` "This change moved more places than its limit." · `rename` "{from} is now called {to}." · `works.start` "Work began on {works}." · `works.cancel` "Work on {works} stopped." · `works.finish` "Work on {works} is finished." | `button.show` show(`entry`) — the entry's element, use, plot or works | `ReportEntry.kind`, `disruption.overBudget`, `works.op` — the report panel's "What moved" and the history's report-entry lines (V09 §5.7, V09 §4.10; J-V9.109) |
| `report.dossier.<state>` | one per `GenerationReport.dossier` state (§5.4): `placed` "{element} stands on {site}." · `rejectedSite` "{site} is marked as not for {element}." · `blocked` "{element} can't stand on {site}; the closest places that suit it are marked." | `button.show` show(`entry`) — the element; for `blocked`, its `closest` sites marked | `GenerationReport.dossier[].state` — the report panel's placement state (V09 §5.7; J-V9.109) |
| `success.deleted` | "Moved {town} to Recently deleted. It stays there for 30 days." | `button.undo` app(`restoreTown`) · `button.show` app(`showDeleted`) | V09 §5.12 |
| `bend.retaining.moved` | "The wall follows the step in the ground, {m} m off your line." | `button.keepMyLine` commit(`event:retainingFlat`) | V09 §4.20.1 (3) (a) |
| `bend.retaining.flat` | "The ground is flat here, so a terrace {h} m high goes on the {side}, with this wall on its edge." | `button.otherSide` commit(`event:retainingOtherSide`) | V09 §4.20.1 (3) (b) |
| `info.crossing.stair` · `info.crossing.ramp` | "{way} climbs the terrace by a stair." · "{way} climbs the terrace by a ramp." | `button.showWhy` why | the dry run's crossing form (item 110 (a)) |
| `bend.crossing.steep` | "Too steep for a ramp on a {class}; the stair stays." | `button.longerRamp` commit(`event:rampLonger`) | file f item 364 |
| `bend.raised.clearance` | "The deck stays {m} m above {way} so carts can pass under." | — | file f item 364 (the clearance bent up) |
| `bend.raised.end` | "A raised way comes down to the ground; its end moved {m} m to {place}." | — | V09 §4.20.2 (2) |
| `bend.raised.wall` | "The raised road comes down before the {wall} and passes through its gate." | `button.showWhy` why | file f item 363 |
| `bend.wall.aqueductArch` | "The wall lets the aqueduct through by an arch." | — | file f item 363 |
| `bend.aqueduct.source` | "Water runs downhill, so the aqueduct starts at {source}, {m} m higher." | `button.showWhy` why | V09 §4.20.2 (5) |
| `bend.aqueduct.terminal` | "Added a fountain where the aqueduct ends, on {place}." | — | V09 §4.20.2 (5) |
| `bend.aqueduct.uphill` | "No spring or river lies high enough within {km} km to feed {terminal}, so it has a well instead." | `button.showWhy` why | the dry run's bend to a well pin at the terminal (J-VI.4 (h); V09 §4.20.2 (5)) |
| `bend.raised.island` | "A road cannot reach a floating island; a hoist, rope line, stair or bridge of light can." | `button.roadToFoot` commit(`event:roadToFoot`) · `button.showWhy` why | the dry run's bend to `placeSkyAccess` (J-VI.4 (d); V05 §4.2; V09 §4.20.2 (6)) |
| `bend.aqueduct.island` | "An island's water is its own; the aqueduct ends here." | `button.showWhy` why | the dry run's bend to the last ground vertex outside the island (J-VI.4 (d); V05 §4.2) |
| `bend.raised.onIsland` | "An island carries no raised way; its bridges cross its river on their own decks." | `button.showWhy` why | the dry run's bend: `raised` dropped, the way on the island's ground (J-VI.4 (e); V05 §3.22 (3)) |
| `bend.aqueduct.onIsland` | "An island's water is its own; a fountain stands where the aqueduct would end." | `button.showWhy` why | the dry run's bend to a fountain pin at the stroke's end (J-VI.4 (e); V05 §4.2) |
| `bend.retaining.rim` | "The rim walk stays level; the wall stands inside it." | `button.showWhy` why | the dry run's bend inward past the rim walk (J-VI.4 (g); V05 §3.22 (4); V09 §4.20.9) |
| `bend.deck.full` | "The {deck} has no free plot there; placed it on {plot}." | `button.showWhy` why | V09 §4.20.4 (1) |
| `bend.deck.class` | "A {class} can't stand on a {deck}; placed it at the {deck}'s landward end." | `button.showWhy` why | volume 11's `deckOk` (V09 §4.20.4 (2)) |
| `bend.deck.floors` | "A {deck} carries at most {n} storeys." | — | V02 §4.6 (5) |
| `bend.deck.single` | "A {deck} carries small, light buildings; this one stays a single range." | `button.showWhy` why | V02 §4.6 (5): a `family: 'stepped'` op on a deck building |
| `bend.deck.basement` | "No cellar can go over the water; it went to {building}, the nearest on the ground." | `button.show` show(`building`) | V03 §4.2 |
| `bend.tiers.stepped` | "Made {building} a stepped building first." | — | V02 §4.6 (1): a `tiers` op on a building not stepped |
| `bend.tiers.count` | "Only {n} tiers fit on this base; made {n}." | — | V02 §4.6 (1) |
| `bend.tiers.step` | "A step that wide leaves no second tier; used {m} m, the widest that fits." | — | V02 §4.6 (1) |
| `bend.tiers.axial` | "This stack takes its stairs straight up the front." | `button.stairsInside` commit(`event:stairsInternal`) · `button.showWhy` why | V02 §4.6 (1): `flights` on a round or octagonal stack; `internal` over a solid tier 0 with a storeyed tier above |
| `bend.tiers.none` | "No stairs reach these tiers: the stack is sealed." | `button.stairsFront` commit(`event:stairsAxial`) · `button.stairsFaces` commit(`event:stairsFlights`) | V02 §4.6 (1), (4): `internal` where every tier is solid; a stair removed over a solid tier 0 |
| `bend.tiers.internal` | "The tiers are reached by stairs inside." | `button.stairsFront` commit(`event:stairsAxial`) | V02 §4.6 (1), (4): `none` over a storeyed tier 0; a stair removed over a storeyed tier 0 |
| `bend.tiers.form` | "Those stairs need {m} m in front of the building; kept the {form}." | `button.showWhy` why | V02 §4.6 (1) |
| `bend.tiers.top` | "The shrine no longer fits; the top is flat." | — | V02 §4.6 (1) |
| `bend.tier.height` | "The stair up this tier needs room on the terrace below." | — | V02 §4.6 (2) |
| `bend.stack.base` | "Raised the tier below instead, by {m} m." | — | V02 §4.6 (2): a `baseCm` on a wing standing on a tier |
| `bend.stack.roof` | "A {tier} here takes a {roof} roof." | — | V02 §4.6 (1), (3) |
| `bend.stack.groundWing` | "The new {wing} stands on the ground beside the lowest tier." | `button.changeShape` tool(`shape`/`massing`, subject: `building`) | V02 §4.6 (4) |
| `bend.building.remove` | "Removed the building with its last wing." | — | V02 §4.2, V02 §4.6 (4) |
| `bend.row.plotLine` | "Moved the plot line with the wall; {neighbour}'s plot changes too." | `button.show` show(`neighbour`) | V02 §4.2 |
| `bend.wing.grow` | "Grew the wing to the smallest it can be, {m} m wide." | — | V02 §4.2 step 2 |
| `bend.family.nearest` | "{building} can't take that shape here; made it the nearest that fits." | `button.showWhy` why | V02 §4.2 |
| `bend.room.passage` | "With no gate range here, the gate hall is a passage through {wing}." | — | V02 §4.3 |
| `bend.room.host` | "A {room} needs a larger wing; it went to {wing}." | — | V02 §4.3 |
| `info.remove.holds` | "The town won't {rebuild \| raise} this {kind}; undo brings it back." | `button.undo` app(`undo`) | V06 §2.13's suppression; V05's removed slots (V09 §4.20.3); every delete dry-run line of V06 §3.19.3 (6) and V06 §4.2 (V06-AGREE-1) |
| `info.remove.holds.deck` | "No house will be built on this spot of the {deck}; undo brings it back." | `button.undo` app(`undo`) | the same, for a deck plot (V06 §3.19.3 (6)) |
| `info.raised.count` | "{n} raised ways in {town}; the rules build up to {cap} by themselves." | — | V06's ledger (V09 §4.20.2 (8)) |
| `info.raised.walk` | "A walked way follows the ground." | — | V07's walk mode (V09 §4.20.2 (10)) |
| `disabled.onlyBelow` | "Tunnels are dug below the ground." | `button.switch` app(`switchLayer`, `layer` — the Below layer) | V09 §4.2 |
| `effect.added` | "The city raises a {kind}: {reason}." (and "{thing} is added" for other kinds) | `button.show` show(`targets`) | file f item 465 `added` |
| `effect.route.detour` | "{route} now goes round by {way}, {m} m longer." | `button.show` show(`targets`) | `rerouted` |
| `effect.way.joined` | "{way} now meets {way2} at a crossing." | `button.show` show(`targets`) | `joined` |
| `effect.water.lost` | "{terminal} loses its water." | `button.show` show(`targets`) | `lost` |
| `effect.vault.removed` | "The arch vault under {way} goes, with what is in it." | `button.show` show(`targets`) | `removed` (V04 §3.5.4's arch vault) |
| `effect.plan.lost` | "{building}'s drawn plan goes with it." | `button.show` show(`targets`) | `removed` (V03 §3.11's stored plan) |
| `effect.deck.ruined` | "{n} buildings on the {deck} fall with it." | `button.show` show(`targets`) | `removed` (item 110 (d)) |
| `effect.households.displaced` | "{n} households move to make room for {thing}." | `button.show` show(`targets`) | `displaced` |
| `effect.walls.rebuilt` | "{n} retaining walls are laid again along the new edge." | `button.show` show(`targets`) | `rebuilt` |
| `effect.stairs.relaid` | "The stairs of {building} are laid again." | `button.show` show(`targets`) | `rebuilt` (V02 §4.6 (2)) |
| `effect.raised.goes` | "{name}, a {kind}, goes: a town builds none by itself." | `button.keepAsYours` commit(`event:keepRaised`) | `removed` on a Re-derive to TOWN (V09 §4.20.3 (7)) |
| `effect.moved` | "{thing} moves {m} m." | `button.show` show(`targets`) | `moved` |
| `effect.more` | "and {n} other changes" | `button.show` app(`showEffects`) | `effectsMore` |
| `offer.raised.standing` | "The {n} raised ways standing stay; remove them too?" | `button.removeToo` commit(`event:removeStanding`) | V09 §4.14 |
| `import.removed` | "The rules would have built {kind} here; kept removed." | `button.show` show(`slot`) | file f item 455 |
| `import.nothingToRemove` | "{kind} was removed in the original; the rules did not build it here." | — | file f item 455 |
| `bend.raised.skyAccess` | "This would cut {island}'s {access}; the raised way ends here." | `button.showWhy` why | the dry run's bend to the last ground vertex before a sky access's column or rope line where `skyAccessObstacles` offers no re-route (J-VI.4 (f); V09 §4.20.2 (6)) |
| `bend.island.keepRoom` | V05 §4.2's line, "{island} keeps room for its {institution}; shrunk to {area} ha" (its text, single source, loaded from volume 5) | `button.showWhy` why | V05 §4.2: a hand resize below the island's floor |
| `bend.island.rimStop` | V05 §4.2's line, "{island} keeps room for its {institution}; the rim stops here" (its text, single source, loaded from volume 5) | `button.showWhy` why | V05 §4.2: a rim reshape bent back to the furthest lawful position |
| `bend.island.handMax` | V05's line, "An island takes at most {n} ways up by hand; moved {access} here" (its text, single source, loaded from volume 5) | `button.deleteOneFirst` show(`access`) — the hand-placed access the bend moves, selected for its Delete (V09 §4.6) · `button.showWhy` why | a `placeSkyAccess` past `accessCount.handMax`, bent into a move of the island's nearest hand-placed access (V05 §3.23, V05 §4.2; J-V5.82) |
| `bend.island.belowCity` | V05's line, "Floating islands need a city; this quarter is laid on the ground" (its text, single source, loaded from volume 5) | `button.cityUp` commit(`event:cityUp`) · `button.showWhy` why | a `quarter` with `sky` below CITY from the API or the clerk, bent to the plain quarter (V05 §3.23's events row) |
| `bend.island.join` | V05's line, "At most three islands float here; this quarter joins {island}" (its text, single source, loaded from volume 5) | `button.showWhy` why | a fourth forced slot, bent to join the nearest open island as a district on it (V05 §3.2 (3); J-VI.4 (a)) |
| `bend.island.lastAccess` | V05's line, "An island keeps one way up; moved to {site}" (its text, single source, loaded from volume 5) | `button.placeOtherAccess` tool(`road`/`skyAccess`) · `button.showWhy` why | a `delete` of an island's last access, bent into a move to the next admissible site (V05 §4.2; J-VI.4 (c)) |
| `bend.island.footMoved` | "The way up lands clear of {pier}." — this volume's words (V05 names the bend, not its line) | `button.showWhy` why | an access foot blocked by a standing raised part, moved to the nearest admissible foot, naming the deck or raised-way pier in the way (V05 §4.2; J-VI.4 (b)) |
| `bend.island.accessKind` | "A {asked} won't work here, so this way up is a {kind}; {kinds} would fit." — this volume's words, naming the kinds that fit (V05 §4.2) | `button.showWhy` why | an access kind the `magic` circumstance or the row's limits do not admit, bent to the nearest admitted kind (V05 §4.2; J-VI.4 (b)) |
| `bend.hood.noClock` | V06 §4.1's line, "a neighbourhood alone has no history yet — open it in its town to advance time" (its text, single source, loaded from volume 6) | `button.showWhy` why | `advance` on a standalone neighbourhood document, bent to none (V06 §4.1; CANON-C02) |
| `bend.wall.newStretch` | "Its stone is gone, so a new stretch is built here." | `button.showWhy` why | a hand `repairWall` on a `dismantled` run or `repairRetaining` on a ruined stretch, bent to a `drawWall` on its line (V06 §2.8; J-VI.4) |
| `bend.raised.newSpan` | "That span is gone, so it is rebuilt as a new span." | `button.showWhy` why | a hand `repairRaised` on a dismantled span or a cleared support (V06 §2.8; J-VI.4) |
| `info.wall.inUse` | "This wall is in use; nothing changes." | — | a no-stretch `repairWall` with no neglect to lift (V06 §2.8) |
| `info.wall.patchOnlyGap` | "Only a gap is patched; this stretch can be rebuilt in {material}." | — | the **Material** chip's patch rows on a `worn` or `patched` run (V09 §4.21.4) |
| `info.wall.run` | "{state} since {year}{, material}." — `{state}` the run's condition word (`legend.wall.<state>`), `{, material}` ", patched with {material}" on a `patched` run | — | a wall run's panel line (V09 §4.21.4) |
| `legend.wall.<state>` | `standing` "Wall" · `worn` "Weathered wall" · `patched` "Patched with {material}" · `breached` "Breach" · `dismantled` "Wall taken down" | — | §8.2's wall state rows, the legend panel (V09 §4.21.4; item 114 (e)) |
| `wall.material.robust` | "In {material}" — the wall's own material word, the enceinte kind's `label` cell | — | the **Material** chip's first choice (V09 §4.21.4) |
| `info.oasis.badge` | "An oasis: {grove} ha of grove and {gardens} ha of gardens." | — | T2 `ground`'s Lake ghost with **Spring-fed** on (V09 §4.21.1) |
| `info.oasis.dossier` | "SettlementForge's record puts water here." | `button.showWhy` why | a water body carrying the dossier's `oasis_water` (DR40; V09 §4.21.1) |
| `info.grand.beyondTier` | "{building} is grander than a {tier} usually has; kept as you made it." | — | a hand design above the rung's grandeur ceiling (item 115 (c); V09 §4.21.5) |
| `info.grand.dossier` | "SettlementForge's record names {building}, so it keeps its full design." | — | a dossier-specified grand building (item 115 (c); V09 §4.21.5) |
| `info.history.symbolic` | "size not recorded" | — | the chip on a fact whose provenance carries `symbolic` (§2.8; item 113 (f); V09 §2.7) |
| `info.history.fromRecord` | "From SettlementForge's record" | — | T1 `intend`'s locked **History** chip with a dossier history (V09 §4.21.3) |
| `info.history.cancelled` | "No town was made." | `button.generateWithoutHistory` app(`generateWithoutHistory`) | a history-first generation stopped during its replay (V06 §3.20.4; V09 §4.21.9) |
| `info.past.viewing` | V06 §5.1's band, "Year {year} — viewing the past" (its text, single source, loaded from volume 6) | `button.openCopy` app(`openCopy`, `seq` — the frame's on screen; in host mode by `HostSlots.newDocuments`) | the timeline thumb off "now": the band, and each disabled tool pressed (V06 §5.1; V09 §5.6) |
| `info.recipe.preset` | "Made from the preset {preset}." | — | `Recipe.presetId` (§2.9), the advanced panel's head (V09 §4.14) |
| `report.history.<line>` | `peak` "Once a {tier} of about {n} people, in {year}." · `symbolicPeak` "Once a {tier}; its size is not recorded." · `destroyed` "Destroyed in {year}; refounded in {year2}." · `oldWalls` "Walls beyond today's houses: the {tier}'s old line." · `oldStreets` "Old street lines under {district}." · `buried` "Buried under {place}: {kind}." · `oversize` "{building} is larger than today's {tier} needs." | `button.show` show(`entry`) | §2.7's `HistoryRecord` and V06's replay record (V06 §2.14): the report panel's "What its past left" (V09 §5.7, V09 §4.21.3) |
| `info.under.lost` | "Once known; its way in closed in {year}." | — | a void whose excavation reading is `lost` (V04 §3.5.7; item 113 (e)), shown at tier `secret` only (V09 §4.17.1) |
| `info.under.lostUndated` | "Once known; its way in has closed." | — | the same, when no closing is dated (V09 §4.17.1) |
| `legend.under.lost` | "Once known" | — | the Below legend's entry for a `lost` void (V09 §4.17.1) |
| `view.cvd.<variant>` | `none` "Usual colours" · `protan` "Red-weak" · `deutan` "Green-weak" · `tritan` "Blue-weak" · `line` "Colours: {variant}" | — | the **Colour vision** chip (V09 §4.21.2; §8.2's `CvdVariant`) |
| `export.vtt.walls` | "Patches count as walls, breaches as openings." | — | the export dialog's VTT tab (V09 §4.21.4; item 114 (f)) |
| `info.zoom.limit` | "This is the whole town." | — | the zoom-out control at the map's zoom-out limit (V09 §4.21.6; §8.8) |
| `view.season.<name>` | `spring` "Spring" · `summer` "Summer" · `autumn` "Autumn" · `winter` "Winter" · `week` "Week {w}" · `follow` "Follow SettlementForge" · `noWeek` "SettlementForge has no week yet" · `line` "{season}, week {w}" | — | the **Season** control and the export's season line (V09 §4.21.7) |
| `view.festival.<name>` | `title` "Festivals" · `row` "{festival}, weeks {a}–{b}" · `on` "Decorate when a festival is on" · `off` "No decorations" · `preview` "Preview" · `spring` "Spring feast" · `midsummer` "Midsummer" · `harvest` "Harvest home" · `midwinter` "Midwinter" · `line` "Dressed for {festival}" | — | the festival list, its switch, the standalone generic festivals and the export's festival line (V09 §4.21.8) |
| `progress.stage.<group>` | `ground` "Shaping the ground and the water" · `plan` "Working out what the town needs" · `streets` "Laying out the streets" · `walls` "Raising the walls" · `quarters` "Dividing the quarters" · `plots` "Cutting the plots" · `places` "Finding a place for everything" · `buildings` "Shaping the buildings" · `land` "Fields, gardens and trees" · `names` "Naming streets and places" · `drawing` "Drawing the map" · `people` "Settling the people" · `below` "Digging the underground" | — | the progress view's stage line (V09 §4.21.9; item 119 (c)) |
| `progress.<wait>` | `epoch` "Year {year} of {years}" · `history` "Replaying the town's past: {year}" · `dossier` "Reading SettlementForge's record" · `export` "Writing the {format}: {percent} %" · `migrate` "Updating this town to this version" · `undo` "Going back: {n} of {total} changes" | — | the progress view's line for a one-time wait that is not a stage run, and for Go back to here and a restore jump (V09 §4.21.9, V09 §3.9) |
| `edge.<case>` | `morePoints` "Add another point." · `drawRound` "Draw round an area." · `samePoint` "The ends are the same point." · `frameEnd` "The town ends here." · `nothingToChoose` "Nothing to choose here." · `removed` "That was removed." · `allKept` "Everything here is kept." · `fewVersions` "Only {n} different versions here." · `noLinks` "No supply links in view." · `noSupplier` "No other supplier of {good}." · `keyTaken` "Already used by {action}." · `noneStanding` "None standing." · `noDeckPlots` "No plots on this {deck}." · `oneTier` "One tier has no stairs." · `nothingToShow` "Nothing to show here." · `allMade` "Everything you asked for was made." · `stepGone` "This step's thing is gone." · `nothingToExport` "Nothing to export here." · `townGone` "That town is no longer on this computer." · `unreadable` "This town could not be read." · `nameLetter` "A name needs a letter." · `replaceOldest` "Replace the oldest named point?" · `nothingToApply.<form>`, one per empty form of §7.1's *Empty edits*: `noStrokes` "Nothing to change: the warp has no strokes." · `shortStroke` "Nothing to change: the stroke is too short." · `noArea` "Nothing to change: the shape has no area." · `noMatch` "Nothing to change: nothing matches." · `noLines` "Nothing to change: the list has no lines." · `noQuarters` "Nothing to change: no quarters are chosen." · `noFace` "Nothing to change: nothing lies in that area." · `noAlternative` "Nothing to change: nothing here has another version." · `groundLocked` "Nothing to change: the ground there is locked." | — | V09 §3.16's outcomes, one row per case named there; an empty dry run's reason (§7.1's *Empty edits*), carried as `PreviewResult.empty` (§11.2) |
| `parse.<word>` | V09 §4.16's connectives, a locale's own words: `rel.in` "in" · `rel.on` "on" · `rel.at` "at" · `rel.near` "near · by · beside · next to" (the first word is the one written, V09 §4.16 (6)) · `side` "the {side} side of" · `dir.N` "north" · `dir.E` "east" · `dir.S` "south" · `dir.W` "west" · `kind.gate` "gate" · `kind.square` "square" · `kind.market` "market" · `kind.harbour` "harbour" · `kind.bridge` "bridge" | — | V09 §4.16's reader and its wording (4), (6) |
| `why.driver.<driver>` | one per term of §4.5's field that `FieldDrivers.terms` names: a driver-table row's display label (its `label` cell, file f item 516), and this volume's words for the rest — `water` "Water close by in dry country" (item 111 (b)) · `character` "The kind of quarter it is" · `brush` "Your painting" · `epoch` "The years since" · `chance` "Chance" (`daylight` reads "In shade {p} % of the day", V09 §2.7) | — | `WhyCardModel.bars` from drivers (V09 §2.7) |

**The `button.*` rows** (one per wording, shared by every row that offers it; tone `info`; J-V9.121):
`button.putHereAnyway` "Put it here anyway" · `button.show` "Show" · `button.otherName` "Show a different name" ·
`button.otherNameHere` "Show a different name on this map" · `button.moveIt` "Move it" · `button.notHere` "Not here" ·
`button.placeElement` "Place {element} here" · `button.putAt` "Put it at {site}" · `button.unlock` "Unlock" ·
`button.unassign` "Remove the assignment" · `button.showWhy` "Show me why" · `button.chooseMarked` "Choose another of the
marked places" · `button.overBudget` "Put it there anyway ({n} moves)" · `button.keepBuilding` "Keep {building}" ·
`button.roleInstead` "Make it a {role2} instead" · `button.rebuildFrom` "Rebuild from {stage}" · `button.newPreview` "Show
the new preview" · `button.cityUp` "Make this town a city" · `button.showThem` "Show them" · `button.goBackTo` "Go back to
{time}" · `button.openCopy` "Open a copy from here" · `button.pictureInstead` "Save a picture instead" ·
`button.shareDevice` "Share it to another device" · `button.switch` "Switch" · `button.downloadFile` "Download file" ·
`button.reattach` "Re-attach" · `button.download` "Download" · `button.reload` "Reload" · `button.retry` "Retry" ·
`button.seeChanges` "See what changes" · `button.notNow` "Not now" · `button.editWithVersion` "Edit it with this version" ·
`button.copyCommand` "Copy the command" · `button.openRecipe` "Open its recipe with this version" · `button.keepSaved`
"Keep saved" · `button.useRebuilt` "Use rebuilt" · `button.downloadThem` "Download them" · `button.undo` "Undo" ·
`button.undoGoingBack` "Undo going back" · `button.useAnotherBuilding` "Use another building" · `button.digDownFrom` "Dig
down from {building} instead" · `button.showWayIn` "Show the way in" · `button.addWayDown` "Add a way down" ·
`button.startCatacomb` "Start a catacomb under {ground}" · `button.showCrypt` "Show the crypt" · `button.joinCatacombs`
"Join it to the Catacombs of {name}" · `button.startItUnder` "Start it under {ground}" · `button.cryptSmallest` "Make it as
small as allowed ({m2} m²)" · `button.cryptEnlarge` "Enlarge the cathedral's crypt too" · `button.showCemetery` "Show the
cemetery" · `button.keepWayOpen` "Keep a way open" · `button.enterKey` "Enter a key" · `button.changeLimit` "Change the
limit" · `button.showEverything` "Show everything" · `button.keepMyLine` "Keep my line" · `button.otherSide` "Use the other
side" · `button.longerRamp` "Make the ramp longer" · `button.roadToFoot` "Draw a road to its foot" · `button.stairsFront`
"Stairs along the front" · `button.stairsFaces` "Stairs up the faces" · `button.stairsInside` "Put the stairs inside" ·
`button.changeShape` "Change the building's shape" · `button.keepAsYours` "Keep it as yours" · `button.removeToo` "Remove
them too" · `button.whatIf` "Make a what-if copy and advance it" · `button.drawRaised` "Draw the raised way" ·
`button.generateWithoutHistory` "Generate without its history" ·
`button.deleteOneFirst` "Delete one first" · `button.placeOtherAccess` "Place a different access". A `ConflictAction`'s `msg` (file f item 463) is keyed as the button that carries it: `unlock` → `button.unlock`,
`unassign` → `button.unassign`, `moveTo` → `button.putAt` (`{site}` its target's name). A slot a row's text does not fill
is filled from the entry the button carries (V09 §2.9's *Words*).

**The event forms** (`MsgButton.event`; a `commit` from `event` carries exactly these events, the canvas building them from
the draft and the row's `MsgRef`, and volume 10's `propose` the same bytes, T101-3; J-V9.121):

| form | the events it commits | its rule |
|---|---|---|
| `exactSite` | the draft re-mapped at the plot the user asked for, with "this plot only" (V10 §4.1's `where.plot`), its disruption taken as the preview lists it | file f item 582's exact site; V09 §4.5's T6 `place` |
| `notHere` | `rejectSite` of the dossier-backed thing's site (T6 `place`'s **Not here**) | V09 §4.3's T6 row; §7.2 |
| `firstFreeSite` | `placeAt { plot, designation }` on the first `SiteCandidate` with no `hardFails` of V09 §4.5's T6 `place` `sites` query for the line's locus — nothing when none of the three is free | V09 §4.5's T6 row; V10 §4.1 |
| `rederive` | the declaration with a Re-derive from `{stage}` — §7.1's one resolution of `E_KEPT` and `E_LEVEL` — previewed as V09 §3.3's whole-town ghost | §7.1; V09 §3.3 |
| `cityUp` | `adjust` of T1 `intend`'s size to small city (T1's size chips) | V09 §4.5's T1 row; §7.8 |
| `unassignCreation` | `unassign` of the assignment the creation event made | §7.4's target rule; V09 §3.9 |
| `roomRole` | the draft re-mapped with the room's role `{role2}` (the smallest lawful split) | V03 §4 |
| `stairsAxial` · `stairsFlights` · `stairsInternal` | `tiers { stairs: 'axial' }`, `{ stairs: 'flights' }`, `{ stairs: 'internal' }` on the row's `building` (the stair chip) — `stairsInternal` nothing where tier 0 has no storeys | V09 §4.20.5 (1); V02 §4.6 |
| `retainingFlat` | the drawn line's flat-ground form, a `terrace` whose edge carries the wall | V09 §4.20.1 (3) (b) |
| `retainingOtherSide` | the same form with the terrace on the other side of the line | V09 §4.20.1 (3) (b) |
| `rampLonger` | the crossing's ramp lengthened along the way to its class's grade — nothing where the way's run does not allow it | file f item 364 |
| `roadToFoot` | the same sky access plus a ground `drawWay` of the stroke's class from its first point to the access's foot, one group | V09 §4.20.2 (6) |
| `catacombUnder` | the drawn chamber moved to the centroid of `{ground}`'s burial face (nearest by distance, ties by address), where V09 §4.17.5's ladder places it | V09 §4.17.5 (a), (d) |
| `joinCatacomb` | a `drawTunnel` from the charnel vault to the nearest element of the Catacombs of `{name}` | V09 §4.17.5 (b) |
| `cryptSmallest` | the cathedral's crypt kept at its smallest lawful size, `{m2}` m² — the bent result, accepted in words | V09 §4.17.5 (e) |
| `cryptEnlarge` | the two-event group enlarging the cathedral's crypt, then this crypt | V09 §4.17.5 (e) |
| `keepRaised` | one declared `drawWay { raised: true, class, widthCm, points }` along `{name}`'s course, in the Re-derive's group (the **Keep them as yours** checkbox for that way) | V09 §4.20.3 (7) |
| `removeStanding` | each standing generated raised way removed as V09 §4.20.3 (2), in one group | V09 §4.14; V09 §4.20.3 (6) |

**The application commands** (`MsgButton.command`; `app` buttons run them and never edit by themselves; none sits on a
row a dry run answers, T-V9-15):

| command | what it runs | where |
|---|---|---|
| `download` | the document's `.plat` to the device (ctrl / cmd+S's command) | V09 §4.13; V09 §3.14 |
| `reload` | reloads the page | V09 §3.14 |
| `retry` | the failed export again with its options | V09 §3.10 |
| `seeUpgrade` | the upgrade's diff (§2.9 step 3, §7.5) | V09 §3.14 (a) |
| `editWithVersion` | the `frozenImport` rebase | V09 §3.14 (b) |
| `copyCommand` | the replay command to the clipboard | V09 §3.14 (b) |
| `openRecipe` | the recipe and its log opened with this version | V09 §3.14 (c) |
| `keepSaved` · `useRebuilt` | §2.9 step 4's choice | V09 §3.14 |
| `downloadUnreplayed` | the changes recovery could not replay, as a file | V09 §3.8 |
| `undo` | `undo(h)` of the group the line names | V09 §3.9 |
| `undoGoingBack` | the matching redo group of a Go back to here | V09 §3.9 |
| `restoreTown` · `showDeleted` | Recently deleted's **Restore** of that town; the list | V09 §5.12 |
| `goBack` · `openCopy` | **Go back to here** at `{time}`'s seq; **Open a copy from here** at the row's `seq` — `{time}`'s, the frame's on the past view (`info.past.viewing`), or the head for `refuse.dossierClock`'s what-if copy, detached | V09 §3.9, V09 §5.6 |
| `exportPicture` | the export dialog on its Picture tab (PNG) | V09 §5.10 |
| `share` | the share sheet | V09 §5.11 |
| `switchLayer` | the working layer set to the row's `layer` | V09 §4.2 |
| `reattach` | the orphan's re-attach pick | V09 §4.10 |
| `enterKey` | the key card | V09 §4.11 |
| `openSettings` | Settings' Assistant section | V09 §5.12 |
| `viewAsOff` | View as cleared | V09 §4.8 |
| `showEffects` | the fates sheet's **What else changes**, paged | V09 §5.5 |
| `generateWithoutHistory` | a new town from the stopped request with its history replay off (`history.replay` false, the parity presets' setting; V06 §3.20.4) | V09 §4.21.9 |

The tool hints are §14's table's texts, keyed `hint.<tool>`; this volume adds `hint.variations` ("Three versions: pick one,
or ask for three more."), `hint.restore` ("Every change is saved. Step back to any point here."), `hint.links` ("Lines
show who buys from whom. Click one to change it."), `hint.shade` ("Darker streets spend more of the day in shade.") and
`hint.clerk` ("Ask for a walled harbour town with a temple quarter."), `hint.oasis` ("In dry country a lake can be
spring-fed: an oasis, with its grove and gardens.", the first time T2 `ground`'s Lake mode is picked on an arid site), `hint.raised` ("A raised way crosses what is
below without meeting it; its ends come down by stairs or ramps.", the first time Raised is turned on) and `hint.below`
("Click again to pick what's underneath.", the first time a click lands on a stack of more than one mark), each recorded
in `AppPrefs.hintsDone`. Every `host.*` key volume 8 names is a row of the same file, its text volume 8's (V08 §3.9's
held reasons, V08 §4.2's controls and undo words, V08 §4.6's port notes and history lines — `HostSlots.historyLines`'
texts, V09 §4.10 — V08 §5.1's strips and banner rows, `host.locked`, and the draft mirror's discard notice).

**The explanation and assistant keys — one text each (J-V9.79).** The same file carries the key
families volume 10 renders, so the drawer, the why card and the panels draw one sentence per key. Their `en` texts are
written once, in the section named — volume 10's, or volume 7's for the village lines — and loaded into
`messages/en.json` from there; this volume does not restate them:

| family | one key per | its `en` text is written in |
|---|---|---|
| `critique.K1` – `critique.K18` | critique row | V10 §3.10's template column |
| `refuse.clerk.<category>` (with `refuse.clerk.key.<keyState>` for the `key` row's three sentences and `refuse.clerk.dossier.count` for the `dossier` row's count sentence) and `refuse.clerk.opsDevice` | one key per `RefusalCategory` value whose V10 §3.16 row words the refusal itself — every value but `lock`, `rule` and `role`, whose cards render the engine's `refuse.*` row for the code — `refuse.viewer` for `role` | V10 §3.16's table; V10 §2.10 |
| `clerk.notice` | — | V10 §3.20's data notice |
| `clerk.alt.*` | each key V10 §5.4's list of the drawer's keys names (*The keys of the drawer's words*): each alternative of a V10 §3.16 row (`clerk.alt.<category>.<n>`, `<n>` its position in its row), the help route's tool button, the history buttons, a critique finding's fix and the stale card's **Ask again** (`clerk.alt.stale.retry`) — so every `ClerkAction` `label` that is not a `button.*` row's words has its key | V10 §3.16's alternatives column; for the other keys, the V10 sections V10 §5.4's list cites |
| `clerk.view.cleared` | — | V10 §3.12 (6)'s line when the view's key changes |
| `clerk.applied` | — | V10 §4.4's applied card line |
| `info.raised.<outcome>` | each of the `raised` section's ten outcomes (`built`, `declared`, `carried`, `belowCity`, `reasonNotMet`, `noCourse`, `chance`, `cap`, `suppressed`, `waited`) | V10 §3.9's outcome table (this volume's `info.raised.count` and `.walk` above are its own badge lines, not outcomes) |
| `info.under.*` | each `underground` row of V10 §3.9a — the ruin rows, `LinkCause`, the excavation reading, the dwellings line, `deep`, `sealed` | V10 §3.9a — except `info.under.cause.<rule>` (V09 §4.17.3) and `info.under.lost` (V09 §4.17.1; item 113 (e)), whose words are this volume's, because V10 §3.9a names the causes and the `lost` reading without words |
| `info.catacomb.*` | each value of `CatacombComplex.source.kind`, the rank and count lines, each state, and each burial-face outcome of `catacombOutcome` (`holds`, `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`) | V10 §3.9a — except `info.catacomb.blocked.<cause>`, whose words are this volume's (V09 §4.17.5), for the same reason |
| `info.crypt.*` | the `crypt` section's rows: presence, area and form (full, half, raised-choir, the rim vault), rank, the crypt join, no crypt (dry and wet ground) | V10 §3.9a's `crypt` table |
| `info.plan.*` | each `plan` section row of V10 §3.9a — the eleven item-110 room causes and the three `PlanReport.notes` ids, keyed as V03 §4.6 states (`info.plan.cause.<cause>`) | V10 §3.9a's `plan` table |
| `info.village.*` | each row of V07 §4.5's list | V07 §4.5 |
| `kind.<registry kind>` | each kind of `clerk.content.withheldWords` | V10 §2.10's `content.withheldWords` row |

A shipped locale carries every key of every family (T-V9-15, T-V10-29). V09 §4.17 and V09 §4.20.6 name the row each place
shows by its key; its words are the owning volume's.
=== END ===

=== REPLACE ### 4.11 The clerk's view — the drawer (the clerk itself is volume 10's) ===
### 4.11 The clerk's view — the drawer (the clerk itself is volume 10's)

* **Off until opened; always labelled; three cards the first time** (J-V9.35). The top bar's **Assistant (AI)** button —
  shown when `ShellConfig.clerk` is set and, in host mode, when `HostSlots.clerkMode` is `builtin` — opens the drawer. Its
  first opening shows three cards in this order, each with **Not now**, which returns to the map with the clerk off:
  1. the **AI label**: "This assistant uses AI to suggest changes. It only proposes — you decide. It sees what you can see
     of this town." — **Continue**;
  2. the **data notice**: V10 §3.20's notice, shown as volume 10 writes it — **I agree** writes `ClerkSettings.consent`
     with the notice's version;
  3. the **key** — only where the deployment's configuration enables the built-in clerk with a user's key (standalone, or a
     host that asks for one; V09 §2.10's *The AI setup*; J121, J122), skipped under a host's proxy: a masked field "Your key for the AI service", a
     checkbox "Remember on this device" with V10's warning beneath it ("Anything running on this site can read a
     remembered key."), **Save** (`ClerkHandle.setKey`, which checks the key before storing it) and a link "How to get a key"
     to its help page. The verdict shows on the card: `ok` closes it; `invalid`, `noCredit` or `noAccess` shows the
     matching sentence of V10 §3.16's `key` row under the field (`refuse.clerk.key.<keyState>`), and the field stays for
     another try; `unchecked` (offline) shows `clerk.key.unchecked` and closes it.
  Then `enabled` is set and the drawer opens. The map, every tool and every export work fully without it (R19).
* **Layout.** Wide: a 400 px drawer on the right, over the context panel (the panel returns when the drawer closes);
  medium: a full-height sheet; narrow: full screen with the map as a strip above. A text box with three suggested prompts
  under it ("A walled harbour town with a temple quarter", "Why is the tannery here?", "Check my plan for mistakes");
  **Paste a list** sends the text on V10's roster entry. The drawer's menu holds **New topic** (`ClerkHandle.newTopic`: the
  next message starts a fresh conversation on its route, V10 §3.2; the earlier one stays in the transcript), **How do I
  …?** (below), **What the assistant sees**, **Copy conversation**, **Save these changes as a skeleton** (below) and, standalone only, **Start a new map from this** (below).
* **Turns** — the drawer renders V10 §2.6's `TurnView` stream as V10 §5.4 gives its meaning (J-V9.34): the user's words;
  while the turn runs, its `progress` lines with **Stop**; then the `reply` blocks in order — `text` as prose; `entity` as a
  link chip with the name (or the kind, when withheld) and its tier chip, which selects the thing on the map (hover
  highlights it); `unverified` in the muted tone with "not found on the map"; `action` as V10 §5.4 words it — a button worded by
  its `label`, a `select` without one as its ids' chips (J-V10.100) — running its `ClerkAction` — and under the
  turn its cost in muted text ("about $0.04").
* **The actions** a button runs follow V10 §2.6's dispatch table, each worded by its `label` (V10 §5.4): the
  application runs `select` → the ids selected on the map; `why` → the why card of its `id` (V09 §5.8), else the Help page
  `page` (V09 §5.9) — what the canvas's **Show me why** opens for that row (V09 §3.3, V09 §4.9); `openSettings` → the settings' Assistant section; `useTool` → that tool active in the action's `mode` (else as last
  used) on that mode's working layer (V09 §4.2), its `ids` selected first (V09 §4.5's mode ids); `export` →
  the export dialog on that format; `fork` → "Open a copy from here" (`forkAt`); `rerun` → "Re-run from here" (`rerunFrom`,
  V09 §3.9) — below a rebase point at the earliest seq with `info.copy.condensed` (V09 §3.9's *Before a rebase point*), in host mode by `HostSlots.newDocuments`, the copy saved to the device or the
  button not drawn (V09 §3.9); every other kind goes to `ClerkHandle.run` — `propose` (its events previewed as a ghost, then Accept like any
  proposal), `undo` (the accepted group's undo) and `rebuild` (**Put it back**, V10 §4.3, its events those of
  `ClerkMount.rebuildEvents`, V09 §2.10).
* **Proposal cards** (`ProposalView`): the AI mark, the reason line, the active variation's counts, fates, renames
  and findings; its bends, each its `msg` with its `actions` as buttons (V10 §2.6's `bends[].actions`, the row's `MsgRow.buttons`
  as V10 §3.5 step 3 reads them), and a roster card's lines with their `lines[].actions`; its effects under **What else
  changes**, drawn as the fates sheet draws them (V09 §4.20.7) but each line with its **Show** only — an effect row's other
  buttons (`button.keepAsYours`, `effect.more`'s paging) are the canvas's, never a proposal card's; a
  removal's `info.remove.holds` line, the variation chips with V10's labels and thumbnails (each variation its own preview, V09 §3.6); **Accept**
  (Enter) → `ClerkHandle.accept`; **Accept these lines** (a roster's cards) → `acceptLines`; **Ask again** → `retry`
  (worded by `clerk.alt.stale.retry`, the one wording of a card's `retry`; "Try again" is New random's alone, V09 §4.9);
  **Drop** → `drop`; **Why** → the why card of what the proposal makes; once accepted, **Undo**, and on a removal no longer
  the latest group **Put it back** (`rebuild`), each worded by its label (V10 §2.6's card buttons). Focusing a chip calls
  `focus` and draws that variation's ghost; one proposal's ghost shows at a time. A proposal whose town moved on shows
  `refuse.stale` with its row's buttons (**Show the new preview**, the card's `focus`; **Show me why**; V09 §4.9) and
  **Ask again** (V10 §3.11; V10 §2.6: its `retry`, worded `clerk.alt.stale.retry`).
* **Refusals** (`RefusalView`): the refusal card with its text and each action as a button worded by its `label`, a
  `select` without one as its ids' chips (V10 §5.4).
* **The card-only drawer — a host's proposal** (V10 §3.17; V08 §4.4 (3)). This is the SettlementForge module's path:
  SettlementForge's own assistant drives the map's tool API and its proposals arrive here (J121, J122). In host mode with
  `clerkMode` `off` or `host` the clerk slot is of kind `host` (V09 §2.2): no Assistant button shows and nothing is sent to a model from the
  frame. A `TurnView` whose proposal has `source: 'host'` arriving on `turns` (the harness takes it from
  `ClerkMount.host.proposals`, V09 §2.10) opens the drawer, in the layouts above, in its **card-only mode**: that proposal
  card alone — its AI mark `clerk.host.mark` naming the host's assistant (`HostSlots.hostName`), the reason line, the
  variation chips, counts, bends, fates, renames, findings and **What else changes**, and **Accept**, **Drop** and **Why**
  — with no message box, suggested prompts, first-opening cards, menu, settings or meter, and no **Ask again** (the host's
  assistant re-proposes on its side). **Accept** → `ClerkHandle.accept` (V10 §4.2); **Drop** → `drop`; the harness answers
  the host through `ClerkMount.host.answer`; the drawer closes on either. A newer host proposal replaces the card; a moved
  town shows `refuse.stale` with its row's buttons (V10 §3.11) and without **Ask again**, since a host's card offers no
  `retry` (V10 §2.6). A viewer
  never receives one (§11.2 refuses a viewer's `preview`). With `clerkMode`
  `builtin` a host proposal is drawn in the full drawer as a turn with no user words (V10 §2.6).
* **The creation preview** (V10 §3.11 (3), V10 §5.1). While a creation proposal waits, the map region shows the active
  variation's scratch document read-only (`ClerkMount.showScratch`) under a banner across the map's top, "Preview — not
  your map yet", with the variation chips, **Accept** and **Back to my town**; the tools are disabled while it shows.
  Accept follows V10 §4.2 (3): when the current town is the untouched empty-state town the view moves to the new town and
  the untouched one is dropped, as V09 §3.2 drops it — it holds no declaration and is not added to Recent towns (J-V9.127);
  otherwise the new document opens beside the current one (`ClerkMount.openNewDocument`: a
  new tab of the app and a Recent entry) and a toast names it. In host mode `openNewDocument` follows
  `HostSlots.newDocuments` (V09 §3.9), though no creation proposal arises there (below).
* **The meter.** The drawer's foot reads "This month: about ${usd} of ${cap}" from `ClerkHandle.usage()`; past V10's
  `warnShare` the line takes the bend tone (`clerk.cap.warn`); at the cap `clerk.cap.reached` shows and the message box is
  disabled until the month turns or the user raises the cap.
* **Asking why.** The why card's **Ask the assistant** (V09 §5.8; hidden when no clerk is enabled) sends the question on
  V10's `why` entry with the fetched `WhyAnswer` attached, and opens the drawer.
* **Asking how, and handing over a list** (J-V9.89). **How do I …?** — in the drawer's menu and in Help
  (V09 §5.9), shown only when a clerk is configured and on — opens the drawer with its message box on V10's `help` entry, the
  box's placeholder reading "How do I …?"; the question goes by `ClerkHandle.send(question, 'help')`, and the answer's
  closing `useTool` action (V10 §3.1) is drawn as its button, worded by its `label` (`clerk.alt.help.useTool`,
  V10 §5.4), which runs by V10 §2.6's dispatch table — that tool
  active with its options strip; the next message returns to the `drawer` entry. **Ask the assistant to place these**
  — under T7 `roster`'s paste box (V09 §4.5), shown only when a clerk is configured and on — sends the pasted text on V10's
  `roster` entry (`ClerkHandle.send` with entry `'roster'` and the text attached as `roster`), exactly as the drawer's
  **Paste a list** does, and opens the drawer. With no clerk, or the clerk off, neither control shows.
* **Starting a new map from this** (J-V9.93). **Start a new map from this** — in the drawer's menu,
  standalone only — puts the message box in creation mode for its next message: the line `clerk.newMap.line` ("Describe the
  new town — this one stays as it is") shows above the box, and the message goes by `ClerkHandle.send(text, 'drawer',
  { newMap: true })`, which V10 §3.1 (4) reads as the user's choice of creation mode. Its proposal previews as a
  creation proposal under the banner (above), and **Accept** opens the new document beside the current one
  (`ClerkMount.openNewDocument`), since the current town is not the untouched empty-state town. Esc, or the item again,
  returns the box to its ordinary mode; after the message is sent it returns by itself. **In host mode** the item is hidden
  and **no turn enters creation mode**: the frame's document is the host's and is never the empty-state town (V09 §3.2 is
  standalone's route (d)), so V10 §3.1 (4)'s first condition is standalone's, and new documents follow
  V09 §3.9's host rule.
* **Knowledge and roles.** The session reads under the view's role and under "View as" (V09 §4.8), the effective key the
  harness takes from `ClerkMount.effectiveKey` (V09 §2.10): a viewer's drawer reads
  and asks why but receives no proposal, its declarations answered by `refuse.viewer` (V10 §3.16); a change of the
  effective key clears the conversation by V10 §3.12 (6), the drawer showing `clerk.view.cleared`.
* **Apply-then-undo** is V10 §4.4's setting (the user's `ClerkSettings.applyMode`, off by default): the drawer draws an
  applied card as V10 §4.4 states it, its line `clerk.applied` with the other variations as chips, and every case V10 §4.4 never
  applies arrives as a preview.
* **Saving.** **Save these changes as a skeleton** (edit mode: the document's own skeleton, which holds the accepted
  declarations, V10 §3.15; creation mode: the transcript's skeleton, V10 §5.3); **Copy conversation** (its text to the
  clipboard); "Assistant conversation (JSON)" in the export dialog (V09 §5.10). The conversation is kept as V10 §2.7 rules:
  in memory by default, in the device store while the user's "Keep history" is on (J-V9.10 as amended by J-V9.34).
  **What the assistant sees** (the drawer's menu) opens V10 §5.4's read-only view of what was sent, as volume 10 defines
  it.
=== END ===

=== REPLACE ### 4.12 Touch, pen and small screens — decided ===
### 4.12 Touch, pen and small screens — decided

The evidence is thin (`research/ux/tool-survey.md` §6: MFCG's maker says it is not designed for small touchscreens; FTG's
editor is large-screen only; watabou's other tools open the context menu on a long press). The decision (J-V9.9), with
§13.4's first-five-minutes sessions confirming it:

* **Layout classes** (V09 §2.2): **wide** (≥ 1024 CSS px) and **medium** (600–1023 px, and ≥ 480 px high) get every tool;
  **narrow** (< 600 px wide, or < 480 px high — a phone in either orientation) is a **viewer with light edits**: the map,
  the gazetteer and "features in view", layers and thematic views, "View as", the history panel (restore and copy), T1 `intend`,
  T5 `quarter` (seed and click-inside only), T6 `place`, T7 `roster`, T10 `hold`, T11 `name`, T12 `dress` (style, tint, furniture, light), every export, share and the
  clerk drawer. T2 `ground`, T3 `wall`, T4 `road`, T8 `fill`, warps and T9 `shape`'s geometry drags are not offered on narrow — their rail slots show the tool
  greyed with the `refuse.phone` line — while T9's Shape tab forms (storeys, roof, class) work. The tables editor and the
  advanced panel are read-only lists on narrow.
* **Gestures under a coarse pointer** — tap = click; long press (500 ms, no movement beyond 8 px) = the context menu
  (right-click); two-finger drag = pan; pinch = zoom; one-finger drag on empty map = pan when no drawing tool is active,
  and draws when one is; **free placement** (Alt) = a second finger held anywhere while the first draws; double-tap = zoom
  to the thing's band (double-click); the pointer idioms that need a modifier (shift+click New random, ctrl / cmd+click
  reset, alt+click lock) are the context panel's buttons. Hit targets and handles are at least 44 × 44 CSS px, the snap
  radius 22 px (V09 §3.4). Tooltips appear on a long press on a control.
* **The hit stack by touch** (V09 §4.20.8). A tap on the selected thing where the stack holds more selects the next one
  down, as a click does, and the long-press menu lists **Select below: {name}**. On narrow, a raised way, a span, a deck
  plot and a stepped building can be selected, named (T11) and deleted with V09 §4.20.3's pending card; they cannot be drawn
  there (T2, T3 and T4 are not offered).
* **Pen** is a fine pointer; pressure is not read (a brush's strength is its slider's, so a replayed stroke never depends on
  a device), and the barrel button is right-click.
* **The fallback** (§13.4): if tablet participants fail where pointer users pass, `AppPrefs.touch.editFabric` defaults to
  false for coarse pointers, hiding the L3 FABRIC and L4 FINISH layers' geometry edits (T8, T9's drags) on touch, and the
  guide says so.
* **The cursor sun** (§8.4): with no pointer hovering, the sun is the sheet's fixed sun (§1.2); on touch, a one-finger drag
  with the Light chip held in the view bar moves the sun (a view input, never logged).
=== END ===

=== REPLACE ### 4.13 The keyboard ===
### 4.13 The keyboard

`keymap.json` (§14) keeps every base binding (A, B, D, N, L, T, M, W then 1–8, G, F, R, Esc, ctrl / cmd+Z, shift+Z, + / −,
0, ?) and adds these rows (each also on a menu or button): **1–9** pick T1 `intend` – T9 `shape` (outside a warp session; T10 `hold` – T12 `dress` by the rail
or their keys below); **alt+Enter** toggles the selection's lock (T10); **F2** renames the selection (T11 `name`); **S** opens the
dress panel (T12); **Enter** accepts the pending ghost or the focused variation — and only when neither is pending keeps MFCG's idiom: in the
empty state a new town replaces the untouched one, after a declaration Same kind, new seed opens a new document beside it
(V09 §3.2; a toast names the town left in Recent); **[** and **]** cycle variations; **Tab** /
shift+Tab cycle a selection's handles, then the arrow keys move the focused handle by 1 m (shift: 10 m) and Enter commits;
**Delete** / Backspace deletes the selection — previewed, committing at once only when nothing beyond the thing itself
changes, else the pending card with Accept (V09 §4.20.3) — (a dossier-backed thing: "Not here", `rejectSite`); **H** the history panel;
**E** the export dialog; **ctrl / cmd+S** downloads a copy of the `.plat`; **ctrl / cmd+O** opens a town; **Space** held
pans with the pointer; **+** / **−** zoom, and stop at the map's zoom-out limit (V09 §4.21.6); **X** opens the clerk drawer when a clerk is configured; **M** is the base's ruler (V09 §4.19); **PageUp** /
**PageDown** step the underground band while Below is active (file f item 413), and while a T4 `road` stroke is drawn on Ground turn
Raised on and off for that stroke (V09 §4.20.2); **Shift+F10** and the Menu key open the
context menu on the selection (V09 §4.4). Bindings fire only while the map region has
focus (§14); a text field's focus suspends them; a user's rebinding is an `AppPrefs.keymapOverrides` row (§14).
=== END ===

=== REPLACE ### 4.14 The advanced panel, the tables editor and the presets dialog ===
### 4.14 The advanced panel, the tables editor and the presets dialog

* **Advanced panel** (the town's recipe panel) — every parameter of §7.8's registry (≈ 200), grouped by consuming stage
  ("Site", "Programme", "Streets", "Districts", "Plots", "Buildings", "Greenery", "Names", "Look"), with a search box.
  Its head reads `info.recipe.preset` ("Made from the preset {preset}", `{preset}` the preset's name) from
  `Recipe.presetId` (§2.9; provenance only), and nothing when the recipe names no preset. Each row: label, value
  with its unit, range, the **layer that set it** (§7.6: "default", "preset", "your preferences", "this town",
  "SettlementForge"), the locality badge ("changes nearby" for a local control, "rebuilds from {stage}" otherwise), and its
  help link. A change is `adjust`; a Re-derive shows the fates sheet first with an auto restore point (V09 §2.8). The
  "Buildings" group carries V02's `fantasyShapes` control (V02 §4.5; file f item 402). The
  "Streets" group adds the row **Raised ways the town builds by itself: as the rules say · none** (item 110 (b)): "none"
  is one `editTable` setting this document's rows of volume 11's `raisedWays` table to chance 0, previewed; its dry run
  says `offer.raised.standing` ("The {n} raised ways standing stay; remove them too?") with **Remove them too**, a grouped
  `delete` of each generated one, each suppressed (V09 §4.20.3). "as the rules say" deletes the override rows. The row is
  on medium and wide, read-only on narrow.
* **Tables editor** — the rule tables of §7.6, listed by group; a table opens as a grid of keyed rows (virtualised); a cell
  editor typed by the table's schema (unit, range, enumeration); per cell the provenance (source, date, note) and a chip
  "as MFCG does", "as FTG does" or "ours" read from the cell's `provenance.source` and `extension` marker (item 23).
  **The cell inspector** shows the cell's calibration register entry (V12 §2.6's `CalibrationEntry`), read from
  `dist/evidence.json`: its status in plain words ("the owner's rule" for a stamped cell), its reference, its due milestone
  and its evidence lines (V12's X-V12-6). An edit
  is an `editTable` event previewed first (its re-derivations and, for the fallback, its fates, §7.6); **Reset row** removes
  the override; the **orphans** list shows overrides whose base row changed in a newer table version, old base, new base and
  the user's value side by side (§7.6), with Keep mine / Take new. **Export overrides** writes the row operations as JSON.
* **Presets dialog** — pick a preset (the parity presets `MFCG` and `FTG` among them, §7.6); the adopted and selectable
  historical packs are listed as "historical ({era}, {region})", offered only to documents of that era and region
  (V12 §2.6); **Save these settings as a preset** is `editPreset`.
* **"Apply my current preferences"** (settings, §7.6) sends one `adjust` per changed parameter, grouped, with the fates
  sheet.
=== END ===

=== REPLACE ### 4.15 Accessibility beyond §14's contract ===
### 4.15 Accessibility beyond §14's contract

§14 fixes WCAG 2.2 AA for the chrome, the landmarks, keyboard reach, the gazetteer and "features in view" as the
non-visual route, contrast, reduced motion and 100–200 % scaling; T-V9-21 tests them on every new screen. This volume adds:
* **The rail and strips** — the rail is a `toolbar` with a roving tab stop (arrow keys between tools, Enter picks), each
  layer group a labelled `group`, each button's accessible name "{tool}: {hint}"; the options strip is a `toolbar` whose
  chip sets are `radiogroup`s.
* **The ghost, spoken** — each settled preview's badge, bend line or refusal is announced once through a polite live region
  (`AppPrefs.announcePreviews`, V09 §6.3): "Preview: temple quarter, 42 plots, 180 households, 38 buildings; 2 of your
  changes move. Enter to accept, Escape to cancel." When the preview lists effects, the first three follow ("Also: Market
  Street now goes round by Bell Lane, …") and the rest as "and {n} other changes" (V09 §4.20.7). The refusal card is a
  `status`, never an `alert` (it is not modal).
* **Handles by keyboard** — a selected shape's handles are a `listbox` in the map region ("Corner 3 of 6, 120 m east and
  80 m north of the town centre"); Tab reaches them, the arrow keys move the focused one (1 m; shift 10 m), Enter commits.
  **No trap:** Tab past the last handle leaves the map region for the next landmark (the context panel), shift+Tab before
  the first returns focus to the map region itself, and Esc drops handle focus back to the map; T-V9-21's no-trap step
  walks it.
* **Declaring in words** — every points-form tool accepts places by name, resolved by the locus reader of V09 §4.16: T5 `quarter` "a
  temple quarter near the market" (the seed at the market's anchor), T4 `road` "a street from the north gate to the harbour" (two
  points, one at each target's anchor), T3 `wall` "a wall from the castle to the river" (the two ends at those targets' anchors),
  T6 `place`'s typed locus, T7 `roster`'s list — so a screen-reader user can make every declaration of the L0 INTENT, L1 GROUND AND BONES and
  L2 PROGRAMME layers without the canvas. A named
  target's point is always the target's `EntityCard.anchor` (V10 §3.6 rule 1), read by `query({ kind: 'entity',
  id })` (file f item 468); nothing else is snapped here, since
  the dry run's points-form derivation does the rest (§7.1; V10 §3.6 rule 7), so the same words on the canvas and to the
  clerk write the same bytes (T101-3; T-V9-13).
* **Variations and fates** — the tray is a `radiogroup` whose options read their summaries ("Version 2 of 3: 44 plots, 176
  households"); the fates sheet is a table with row and column headers and a Show button per row.
* **Never colour alone** — tier chips carry words; every colour-coded meaning of this volume's thematic views has the
  second cue of V09 §5.4's cue column (the link view's goods family by colour and dash pattern, a satisfaction below 1 by
  a hollow arrowhead, an impaired chain by half width; one channel per cue), and the colour-vision setting is V09 §4.21.2's
  (item 112); the shade view's steps are also read out under the pointer; the snap highlight and handles
  keep ≥ 3 : 1 against the paper and ink of every shipped sheet (checked by T-V9-21's contrast step).
* **Timing** — toasts stay while hovered or focused; the long press is adjustable 300–1 000 ms (`AppPrefs.longPressMs`,
  default 500); no action has a time limit.
=== END ===

=== REPLACE ### 4.16 Reading typed words — the roster line and the locus ===
### 4.16 Reading typed words — the roster line and the locus

T7 `roster`'s pasted lines, T6 `place`'s typed locus and V09 §4.15's word declarations are read by one small reader of our own, deterministic,
with its connective words as rows of the message catalogue (`parse.*` keys) so a locale supplies its own:
1. **Lines.** One place per non-empty line; a leading bullet, number or dash is dropped.
2. **Fields.** The first of these splits that fits wins: "name: class, locus"; "name — class — locus" (also "-" or "–"
   with spaces around it); "name (class) locus"; otherwise the whole line is the name and the class is guessed from its
   words ("The Golden Anvil smithy" → smithy).
3. **The class.** Words and word pairs are matched against the class rows' display labels and synonyms (volume 11's `label` and `synonyms` cells, V11 §2.3; the town-and-city words in V11 §3.5.15) — of the classes the document's rung admits (the fold's product and rung, V07 §2.1): at a base rung the town-and-city rows, V05's sky rows where a sky layer stands, and the generic rows; at a village rung the `v.` rows, the town-and-city rows that play themselves there (no `villageForm`; V11 §3.22; V07 §3.11 step 3) and the generic rows, a town-and-city row with a `villageForm` answering through its `v.` row (J-V9.125): exact first, then with a plural ending removed, then within one letter for words of five letters or more; ties go to the row's `commonness` cell within that set (a roster share within one meaning, V11 §3.5.1, V07 §2.4), a `v.` row before a town-and-city row at a village rung, then to row order; no match gives the generic "Other" class and the
   card asks "What is it?" with a class picker.
4. **The locus.** "in X" → `in`; "on X" → `on`; "at X" → `at`; "near X", "by X", "beside X", "next to X" → `near`;
   "north / south / east / west (side) of X" → `near` with that `side`; a connective followed by "the north / south /
   east / west side of X" keeps its `rel` and takes that `side` (the form (6) writes). X is resolved by
   `query({ kind: 'gazetteer', text: X })`: an exact name first, then the best match whose kind fits a kind word in X ("gate", "square", "market",
   "harbour", "bridge"), with "the north gate" meaning the gate whose bearing from the town centre is nearest north; the
   market and the harbour name the principal market and the harbour. An unresolved X leaves the card asking "Where is
   {X}?" with a pick-on-map button; nothing is guessed silently.
5. **With a dossier** each line must name a dossier element (§7.1's roster rule): the class field becomes an element picker
   listing the unplaced elements whose names match the line.
6. **Wording a locus** — the reverse of (4) (J-V9.100). A `Locus` is worded as its `rel`'s connective — the first
   word of its `parse.rel.<rel>` row ("in", "on", "at", "near"; the row's other words are the synonyms (4) reads, "by",
   "beside" and "next to" for `near`) — then, with a `side`, "the {side} side of" (`parse.side`, `{side}` the
   `parse.dir.<N|E|S|W>` word), then the target's name as the `gazetteer` query answers it at the view's effective key
   (V09 §2.7); a target it withholds or leaves unnamed is worded by its kind's label after "the" ("the gate"). Examples:
   "near the North Gate", "on the west side of the Market", "in Tanners' Row". For a named target (4) reads the worded
   form back to the same `Locus` (T-V9-13). Its readers: `refuse.roster.dossier`'s `{locus}` (V09 §4.9), the history
   template "Asked for {name} {locus}" (V09 §4.10; its `{name}` the line's name, or the class's display label for an
   unnamed line) and volume 10's `dossier` row, which cites it (V10 §3.16).
=== END ===

=== REPLACE ### 4.17 The underground in the editor — item 109's screens (J111) ===
### 4.17 The underground in the editor — item 109's screens (J111)

The records and their rules are V04's (V04 §2.2, V04 §3.5.0a, V04 §3.5.1, V04 §3.5.7) and the crypt V03's `Basement.crypt`
(V03 §3.7.4); this section is what a user sees and does with them. **The panels' explanatory lines are the why rows**: a void's excavation reading, its ways in and its dwellings line, a ruin's rows, a catacomb's source, rank, count,
entrance and state, a burial face's outcome, and a crypt's presence, form, rank and join are the matching rows of the
`underground` and `crypt` sections of the subject's `WhyAnswer` (V10 §3.9a), drawn through `WhyCardModel.sections`
(V09 §2.7) with their catalogue keys (V09 §4.9's explanation paragraph) — so a panel, the why card and the clerk say one
sentence. Each place below is named by its row's key; the words of `info.under.*`, `info.catacomb.*` and `info.crypt.*` are
V10 §3.9a's, except the rows this volume words (`info.under.cause.<rule>`, `info.under.lost`,
`info.catacomb.blocked.<cause>`; V09 §4.9).

**4.17.1 Hidden caves and ruins — the game master's view (item 109 (j) (2)).** A cavern or ruin exists whole whether or
not anyone can reach it; a cluster whose excavation reading is `unexcavated` (V04 §3.5.7 (g)) is known to nobody in town.
The Below group's **Show hidden caves and ruins** writes the per-viewer view key `showUnexcavated` (file f item 278; V04's name
for it; J-V9.38). It is offered — present and settable — only to a view whose knowledge key is tier `secret` and whose
View as shows everything; to any lower key it is absent, and a stored value reads as `false`. With it on, S14 draws every
element of an unexcavated cluster in V04 §5.2's unexcavated style, and the legend adds "Not yet found by anyone in town". Below `secret` no sealed void is drawn,
labelled, listed in the gazetteer or "features in view", answered by `why` (an unknown address) or exported (V04 §5.2's
knowledge rule; file f item 278 for §11.1). At `secret`, a picture export draws sealed voids only when its view's toggle is on;
GeoJSON and glTF carry them only at `secret` (GeoJSON with `excavation: 'unexcavated'`), and a VTT scene never (V04 §5.5).
**A lost void** (item 113 (e)): a cluster whose excavation reading is `lost` — once reached (V04 §2.2's `ExcavationRecord`),
its every open link since closed (V04 §3.5.7) — is shown at tier `secret` exactly as an unexcavated one (the same toggle,
style and knowledge rule; GeoJSON's `excavation: 'lost'`), its panel's line `info.under.lost` ("Once known; its way in closed
in {year}", `{year}` the newest closing among the links and accesses of its last path, read from their lifecycle blocks,
§2.8; `info.under.lostUndated` when none is dated) and the legend's entry `legend.under.lost` ("Once known"); below
`secret` it is as a sealed void. Its dwellings empty by V04's vacancy rules; a way in reopened by an edit or an epoch makes
it `accessible` again and the line goes (T-V9-73).

**4.17.2 Drawing into a system — the system chip; new ruins, caverns and catacombs (item 109 (g), (h)).** On the Below
layer, T4 `road`'s Tunnel and T6 `place`'s Chamber show a **system chip** in the options strip: the town's underground systems by name
and kind ("Old Town — buried town", "the Catacombs of St Aelred's — catacomb", "Sewers", "the Deep Caves — cavern",
"Ruins of Ashkar — ruin" …), only those the view's key admits, defaulting to the system under the draft's first point,
else the one last used. Under them it lists the new systems item 109 admits at the town's rung: **New ruin** and **New
cavern** at every rung (item 109 (j) (1)), **New catacomb** at TOWN and above (item 109 (k)). A crypt is never a system and
is never listed (J111). The mapper emits `drawTunnel { system }` or `drawChamber { system }`; a "New …" pick emits
`drawChamber { system: { newKind }, … }`, a closure (§7.3 item 9) that creates the `UndergroundSystem` with its first
chamber (file f item 361): a ruin with its `RuinRecord` of source `declared`, its plan's axis from the drawn chamber (V04 §4.7);
a cavern of the site's geology; a catacomb by the bend ladder of 4.17.5. A ruin chamber is laid on the ruin's axis
(`bend.ruin.axis` names the turn) and drawn in V04 §5.2's `ruin` program, and the legend adds "Ruins of an older town" whenever a ruin
element is drawn. Re-making a run or a system is T10 `hold`'s "this run" or "this system" (V09 §3.7).

**4.17.3 How people get down here (item 109 (j) (3), (3b)).** The panels of an access point, a cavern or ruin cluster, a
catacomb and an undercity neighbourhood have a section **How people get down here**: one line per way in, from the
`AccessPoint.cause` (V04 §2.2's `AccessCause`) of the access, or of the link it reaches through, worded by the catalogue
row `info.under.cause.<rule>` — the `underground` section's access row, whose words are this table's (V09 §4.9); the
access's symbol on the map is V04 §5.2 (7)'s, by `cause.rule`:

| `cause.rule` | the line | symbol |
|---|---|---|
| `dig` | "{building} dug a way down when it was built." (with an `event`: "… when it was rebuilt in {year}") | a stepped arrow |
| `opening` | by kind: "A sinkhole opens here." · "A cave mouth opens here." · "A collapsed shaft leads down here." · "The ruins' old entrance opens here." · "A skylight opens into the cave here." | a ragged ring |
| `overlap` | "The {system} broke into it in {year}." ("… when it was dug" at generation) | a broken wall |
| `mineBreach` | "The miners of {working} broke into it." | a broken wall |
| `lifeline` | "The people below dug this way out to {place}." | a stair |
| `edit` | "You opened this way down." | its kind's, with the declared pin |
| `dossier` | "SettlementForge's record puts a way in here." | its kind's |
| `crypt` | "Reached from {church}'s crypt." (J111) | an arched door |
| `system` | a catacomb's: "The stair down from {cemetery}." (at V01 §3.5.12's opening place, in its chapel where one stands); another system's: "The {system}'s own way in." | a stair |
| `neighbourhood` | "A street stair down to the {neighbourhood}." | a stair |
| `basement` | "{building}'s cellar opens into it." | a stepped arrow |
| `legacy` | "From an older version of the town." | its kind's |

A void reached only through other systems reads "Reached through the {system} from {access}": the path is the
excavation reading's connection graph from the nearest surface access (V04 §3.5.7 (g)), which the reader returns on the
cluster as the fact `under/wayIn` (a list of links and accesses). **Show the way in** highlights every step of
that path (`live.selection`) and lists the steps with their bands in the panel, switching the drawn band as the user steps
through them. A sealed void reads its unexcavated row (`info.under.sealed`) with **Add a way down**; its section adds
the sealed-deep row (`info.under.deep`) when its top lies deeper than `DigRule.maxM` (V11's cell; V04 §3.5.7) below every footprint over it (item
109 (j) (5)).

**Editing a way down** (T9 `shape` and T6 `place`; V09 §4.3's rows): **Brick it up** → `setAttr(access, 'state', 'bricked')`; **Lock it** and
**Open it** → `state` `locked` or `open`; **Who knows this way down** → the `knownTo` chips; dragging its opening →
`setAttr(access, 'ground.at', p)`, re-hosted by `pointLocate` (outside II.7.3's admitted ground the refusal card carries
"Show me why"); dragging its underground end → `moveVertex` on its `access_point` vertex; Delete → `delete`. A change that
closes a cluster's last way in previews the dwellings that empty (`fate.access.lastWay`, V04 §4.3) before Accept.

**4.17.4 Dwellings only after a way in (item 109 (j) (4), with R2).** A declaration that would put dwellings in an
`unexcavated` cluster — a T5 quarter or boundary on a void part, a T6 `placeAt` of a dwelling class on a void plot, a
clerk's proposal of either — is expanded as a closure that also makes the way in (file f item 372; J-V9.40):
1. a dug access from the ground building standing nearest above the cluster (plan distance from the cluster's nearest
   element to its footprint, ties by address) whose dig floor lies within `DigRule.maxM` of that element's top —
   a `cellar_stair` or `shaft` by V04 §3.5.7 (d)'s kinds, source `dig`, cause `edit` — with `bend.under.accessDug`;
2. else a public opening at the nearest candidate of V04 §3.5.7 (e)'s kinds, its chance waived because it is declared,
   cause `edit`, with `bend.under.accessOpening`;
3. else a public opening of kind `collapsed_shaft` at the point of public ground (V04 §1.2) over the cluster nearest, in
   plan, to its shallowest element, cause `edit` (file f item 372's note; J-VI.4), with `bend.under.accessOpening`;
4. else — no public ground lies over the cluster, and every footprint over it stands beyond `DigRule.maxM` of it — the dry
   run bends the declaration onto ground part 0 over the same footprint, so the homes stand above the void (a quarter or
   boundary takes the same outline on part 0; a dwelling `placeAt` the part-0 plot over its point), named by
   `bend.under.noAccess` ("Nobody can reach this cave yet, so the homes stand above it.") with the alternatives **Add a way
   down** (T6 on a chosen spot) and **Show me why** (item 101 R2; J-V9.102).
The way in and the dwellings are one group and one undo step, so no dwelling stands in a sealed void after any
declaration (T-V9-38).

**The bends' alternatives** (J-V9.112). With step 1's bend the dry run lists in `PreviewResult.alternatives` the
further buildings step 1's rule qualifies, in its order (plan distance, then address), at most three (file f item 372).
**Use another building** is shown while one of them has not been tried: it re-previews the group `[addUndergroundAccess {
building: that building }, the declaration]` — the access first and with no `target`, so file f item 372's grouped-access rule
takes the cluster's element nearest that building's footprint (step 1's element), and the declaration's closure then
finds the cluster reachable and adds no access of its own — and the card keeps `bend.under.accessDug` with `{building}`
that building, drawn by the application from the alternative it chose; each press steps to the next building, and the
button goes when none is left. Accept commits the group as one undo step. The clerk's `propose` for the alternative
carries the same events (V10 §3.16), one per listed building, each labelled by the row's list form "Dig down from
{building} instead" (V09 §4.9), since that card shows every alternative at once (J-V9.118). Steps 2 and 3 run only when no building qualifies, so `bend.under.accessOpening`
offers no building: its buttons are **Show the way in** and **Show me why**.

**4.17.5 Catacombs, crypts and cemeteries (item 109 (k) (1)–(6); J111: "switch it then, cathedral also gets crypts but
cemetaries get catacombs").**
* **The catacomb's panel** — an `UndergroundSystem` of kind `catacomb` and its `CatacombComplex` (V04 §2.2):
  * its name, V04 §5.4's label;
  * its burial face with **Show**, and its source, rank and count — the `info.catacomb.*` rows of its `underground` section
    (the source by `CatacombComplex.source.kind`, the count by V04 §3.5.1 (3), a collective record's members counted once;
    with `overCount`, `info.catacomb.overCount`);
  * its entrance — the `system` cause's line of 4.17.3, at V01 §3.5.12's opening place — with **Show**, and every other way
    in by 4.17.3.
* **Its "Over time" tab**: the extent (`extentFloorM2`, m²) with a line chart of it per epoch (from V06's history frames)
  whose values never fall (T-V9-34); this epoch's growth against its cap ("grew {a} m² of at most {cap} m²", from
  `lastGrowth.addedM2` and V04's cap); the **state**, read from `blockedBy` — **growing** when it is empty, **stopped** when
  it holds `sourceClosed` (`info.catacomb.stopped`), **stagnant** otherwise, with each other cause in words
  (`info.catacomb.blocked.<cause>`, this volume's words): `reach` "It
  has reached as far as its diggers go", `wet` "The ground beyond is too wet", `system` "Another tunnel is in the way",
  `foundation` "Deep foundations are in the way", `wallStrip` "The town wall's footing is in the way", `depth` "The rock
  lies too deep", `rank` "It may not outgrow the Catacombs of {largest}"; and the ossuaries' **fill** as a bar, captioned
  `info.catacomb.stagnant` while stagnant, with a stepper (`setAttr` of `fill`; lowering it is allowed and undoable, and
  the next stagnation raises it again, V04 §3.5.1 (7)). The underground view draws the ossuaries denser as `fill` rises
  (V04 §5.2's ossuary program); the application only passes the layer.
* **The crypt on a church's panel.** Every church-class building's panel has a **Below** line from its `Basement.crypt`
  (V03 §3.7.4): the `crypt` section's rows (`info.crypt.*`) — its presence, area and form, the cathedral's "the largest"
  always present (V02 §3.14.5's no-refusal ladder), and on wet ground V03 §3.7.4's rule (an always-crypt class takes the
  raised-choir crypt; any other church none, with ledger slabs in the chancel floor); **Show** opens the plan at the
  basement storey. Where the crypt join exists (an `AccessPoint` of
  cause `crypt`), the line adds "Opens into the Catacombs of {name}" with **Show the way in**. A church without a crypt
  reads the `crypt` section's no-crypt row, with **Add a crypt** where its class's crypt column admits one (`setAttr` of the basement's crypt, V03).
  A crypt is never listed as an underground system.
* **The cemetery's panel** — a churchyard part, a `cemetery`-class use, a Cemetery network ground, a monastery's burial
  yard: its catacomb's name with **Show** and its entrance, or the burial face's outcome from V04's candidate pass, read
  from the face's `why` (path `catacomb`) as its `info.catacomb.*` row (`holds`, `countReached`, `wet`, `age`, `island`,
  `belowTown`, `chance`).
* **Bends, none refused** (R2; J-V9.39). The dry run of `drawChamber { system: { newKind: 'catacomb' } }` runs file f item 361's
  ladder; this volume words the result:
  (a) the chamber's centroid lies inside a church-class building's footprint → `setAttr(building,
      'basement/crypt/ring', <the drawn ring clipped to the building's crypt region>)` and no chamber is laid; on a
      building without a basement, volume 3's crypt ladder makes a crypt-only basement (full, then half, then raised;
      V03 §4.2), and the ghost names the form ("a half-sunk crypt under {church}"); undo is one step:
      `bend.catacomb.church`, offering "Start a catacomb under {its churchyard, or the nearest burial face}";
  (b) on a burial face with the count reached → within V04's `accessReachM` of an element of an existing complex it joins
      that complex (`bend.catacomb.join`); otherwise it becomes a charnel vault — one `ossuary` chamber of the `dug` system
      under that face, capped at `charnelMaxM2` (`bend.catacomb.charnel`, offering "Join it to the Catacombs of {name}", a
      `drawTunnel` from the chamber to that complex's nearest element);
  (c) below TOWN → the charnel vault (`bend.catacomb.belowTown`);
  (d) on no burial face, or on a worked-out quarry below CITY → the chamber stays as drawn, in the `dug` system
      (`bend.catacomb.noGround`, offering "Start it under {nearest burial face}", which moves it to that face's centroid;
      nearest by distance from the chamber's centroid, ties by address). A worked-out quarry at CITY or METROPOLIS within
      V04's `ossuaryReachM` is a lawful source, and the chamber commits as a quarry ossuary.
  (e) Crypt edits (V03's plan events and `setAttr` of the basement): removing the cathedral's crypt — `setRoomRole` away
      from crypt, the basement set to none, a `mergeRooms` that dissolves it — is bent to keep it at its smallest lawful
      size (`bend.crypt.cathedral`); enlarging another church's crypt bends to the rank cap, `crypt.rankShare` × the
      cathedral's area (`bend.crypt.largest`, offering "Enlarge the cathedral's crypt too", a two-event group); another
      church's crypt may be removed freely, and when it carried the crypt join its fates list "The way from {church}'s crypt
      into the catacombs closes." V03 §3.7.4 states these dry runs; this volume words them.
* **The author's removal** (item 109 (k) (4); V04's J-V4.56). Deleting catacomb galleries stays allowed — everything is
  editable: the badge and the fates sheet say `fate.catacomb.removed`, the extent floor drops by the deleted area and the
  deleted nodes are tombstoned, so growth never digs them again; undo restores both. A seal keeps the extent: "Sealed
  galleries stay part of the catacomb."

**4.17.6 Arch vaults at street level (item 110 (b); V04 §3.5.4).** An arch vault stands at grade in a raised
way's `vault` span but belongs to the vaults system. On **Ground** it is reached through its span in the hit stack — the
deck, the span, the vault, the street (V09 §4.20.8). On **Below**, the vaults system's panel lists arch vaults under their
own heading, "At street level, under {way}", each with **Show**, which pans to the span; the depth-band filter never
hides them. Their doors are drawn with the Ground layer's entrances. The why card's first line is V09 §2.7's arch-vault
`decidedBy`. Opening its span or removing its way lists the vault, its building and
any drawn plan among the effects (V09 §4.20.7).
=== END ===

=== REPLACE ### 4.19 The base's view keys, notes, pins and the ruler on screen ===
### 4.19 The base's view keys, notes, pins and the ruler on screen

The base declares these view keys and furniture options and names the application as their writer (§2.9, §9.5); each is
view state, not logged and outside every digest, and the per-viewer ones never cross a bridge (§11.3).

| control | where | writes | default |
|---|---|---|---|
| **Rotate the map** — a dial and "North up" | the view bar's Map group | `rotation` (degrees; the compass follows, §9.5) | 0 |
| **Plots only** | Map group | `plotsOnly` | off |
| **Detail: when clicked · when in view** | Map group | `elaborate` | when clicked |
| **Hand lantern** | Below group (V09 §4.2) | `handLantern` | off |
| **Season** (V09 §4.21.7's control, with the festival list of V09 §4.21.8), **Weather** (where §8 draws them) | the Light group | §2.9's year position and its follow flag (item 117); `weather` | V09 §4.21.7's; `weather` the recipe's, `snow` on by default in a cold or severe climate's snow weeks and off in an arid one, the user's to switch (item 117 (g)) |
| **Day or night**, sun mode, sun height, hour | Light group | `light`, `sunMode`, `sunHeight` | §2.9's |
| **Favourite** — a star on every panel's header | panels; the Notes panel lists them | favourites | none |
| **Notes** — a private note on any thing's About tab; public notes (owner and editor) | the Notes panel and each panel's About tab | notes, public notes | none |
| **Pins** — "Add a pin", then a click; each with a label, a note and one of six colours | the Notes panel | view pins | none |
| **My look** — a viewer's style card | the Dress panel's style cards, for the viewer role | `stylePreset` (a viewer never writes `setStyle`, §11.3 N-15) | none |
| **Grid** — kind (squares, hexes), cell size, skip water | the Dress panel | the grid settings | off |
| **Legend** — auto · everything · off, a border, a corner | the Dress panel | the legend settings | auto |
| **Emblem** — generated, **New emblem** (`rerollLayer { concern: 'naming.emblem', salt: the concern's current salt + 1 }`, logged, one undo step; V09 §4.5's T12 `dress` row), or an SVG of the user's, cleaned by §9.5's sanitiser | the Dress panel | the emblem settings | generated |
| **Compass** — on or off; drag it to place it; the wheel over it turns it; **New compass** (`rerollLayer { concern: 'style.compass', salt: the concern's current salt + 1 }`, logged, one undo step; §9.5) | the Dress panel and the map | the compass settings | §9.5's |
| **The ruler** — click points for a length (m and ft); **Area** for a polygon (m², ha, acres); feature snap by file f item 517 (`{ p }`); Esc ends; **Save as annotation** writes a view pin labelled with the measure | key M; a view-bar button | view data; a view pin | — |
=== END ===

=== REPLACE ### 4.20 Item 110 on the canvas (the owner's "they go in"; J-V9.58) ===
### 4.20 Item 110 on the canvas (the owner's "they go in"; J-V9.58)

Item 110 closes four authoring gaps — terrace retaining walls, raised ways, stepped massing and buildings on decks — and
lets a city raise ways by itself while "a user can decide to add or remove". The records, their generation and their
lifecycles are the base's (V09 §1.3), with volume 2's stacks and deck buildings (V02 §3.15–V02 §3.16), volume 4's arch vaults
(V04 §3.5.4), volume 6's reason
keys and suppression (V06 §2.13) and volume 11's rows. This section is their tools, words and screens. Every gesture runs
V09 §3.3's pipeline, every event is file f item 362's, and every word is a V09 §4.9 row.

**The `toolkit.json` rows item 110 adds** (V09 §2.3; T-V9-12 reads them):

| tool · mode or parameter | gesture · kind | `emits` | `layers` | basic | narrow · coarse |
|---|---|---|---|---|---|
| T3 `wall` · mode `retaining` ("Retaining wall") | `points` (`polyline` form) | `drawWall` | ground, sky | — (a mode chip beside Draw wall and Gate) | no · yes |
| T3 `wall` · param `highSide` ("High side": Auto · Left · Right) | `chip` | — | ground, sky | yes (in the Retaining wall mode) | — |
| T2 `ground` · mode `terrace` ("Terrace") | `brush` | `terrace` | ground, sky | — (a mode chip) | no · yes |
| T2 `ground` · param `levelCm` ("Level") | `number`, and the level handle | — | ground, sky | yes (in the Terrace mode) | — |
| T4 `road` · param `raised` ("Raised") | `toggle` | `drawWay` | ground | yes | no · yes |
| T4 `road` · class chip `aqueduct` ("Aqueduct") | `chip` of the class parameter | `drawWay` | ground | yes | no · yes |
| T9 `shape` · context controls `spanUse`, `crossingForm`, `deckHeight`, `archSpacing` (on a selected raised way, span or crossing) | `card` controls | `setAttr` | ground | — (context) | yes (view) · yes |
| T9 `shape` · params `tierCount`, `tierTop`, `tierStairs` (with Sealed), `tierShape`, `tierSkirt`, `tierSolid`, `tierStairWidth`, per-tier `floors` / `eaveCm` | `number`, `chip` | `setMassing`, `setAttr` | ground, sky | the count, top, stair and shape chips; skirt, solid and stair width behind More | yes (the Shape tab's forms) · yes |
| T9 `shape` · handles `tierStep`, `tierCentre`, `tierRadius`, `shrineInset` | `drag-handle` | `setMassing` | ground, sky | — (on selection) | no · yes |
| T10 `hold` · the Delete gesture ("Delete", "Remove") | `click` | `delete` | ground, sky, underground | — (context) | yes · yes |

The other modes of T2 `ground`, T3 `wall`, T6 `place`, T8 `fill`, T9 `shape`, T10 `hold`, T11 `name` and T12 `dress` gain `'sky'` in their `layers` where V05 §4.1 maps them; T1 `intend`'s and
T5 `quarter`'s carry it already, and T4 `road`'s only in its Sky access mode (V09 §4.20.9).

**Constants of this section** (each read by the dry run or the shell as stated; provenance in brackets):

| constant | value | read by | provenance |
|---|---|---|---|
| a retaining chain's closing radius | 20 px (22 px coarse) | the shell (T3 `wall`'s Retaining wall, as Draw wall) | our own, as V09 §4.5's T3 row |
| `raised.previewOnReleaseKm` | 3 km | the shell (V09 §3.14) | our own, calibrate-later; confirmed by T-V9-3 at M3a |
| `tierStep` snap | 10 cm | the step handle | our own |

The dry run's cells are volume 11's and the engine's own, cited by name, never restated here: the flat-ground test and
its sampling (§7.1's retaining-wall dry run; `terrace.stepMinCm`, `terrace.slopeMin`, `terrace.coverShare`,
`terrace.retainingReachM`, `terrace.flatDepthM`, V11 §3.24.1), the aqueduct's source reach and fall
(`aqueduct.sourceReachKm`, `aqueduct.gradient`, V11 §3.24.2), the bridge's mid-span threshold
(`deck.landmarks/bridgeMid/minSpanM`, V11 §3.24.4; J-VI.8), the effects list's cap (§11.2's `PreviewResult.effects`) and
the deck scenes' cap per export (§11.1).

#### 4.20.1 Retaining walls and terraces (item 110 (a))

1. **T3 `wall` gains a third mode, Retaining wall** — a mode chip beside Draw wall and Gate, never a kind behind More. Two or more
   points or a line; the chain closes when its ends meet within 20 px (a platform, its high side inside). The **High
   side** chip reads Auto · Left · Right, relative to the drawing direction; Auto sends no `highSide`, and the dry run takes
   its high side (file f item 362 (a); §7.1). Snaps, in priority order: slope-break and
   contour lines, the ends of existing retaining walls, plot boundaries, street centre-lines (V09 §3.4). Mapper: `drawWall {
   kind: 'retaining', points | from: { points }, closed, highSide? }`. Commit on release, or Accept when fates move houses
   or effects are listed (V09 §3.3). A retaining wall is never an enclosure: the Gate stamp does not snap to it, it closes
   no circuit, and the wall-arcs ghost of V09 §3.4 is not drawn for it.
2. **The ghost** draws the wall line with short ticks on its low side (the base's drawing, §8), a stair or ramp mark at
   every way it crosses, and the plots on either side re-flowing. The badge reads "retaining wall {m} m · steps {a}–{b} m
   · {n} ways cross by stairs, {k} by ramps". Each crossing's form is the dry run's (the way-class rule, item 110 (a)),
   named in the bend line by `info.crossing.stair` or `info.crossing.ramp` ("Market Street climbs the terrace by a
   stair"); the words follow the dry run's result and never guess it.
3. **Flat ground bends, never refuses** (R2; J-V9.60). §7.1's dry run tests the drawn run for flat ground and bends it:
   (a) onto the nearest slope-break line, terrace edge or retaining wall in reach, clipped to the drawn run's extent
       (`bend.retaining.moved`, offering "Keep my line", which takes (b));
   (b) otherwise into a `terrace` over the strip on the high side (Auto: the left of the drawing direction), so that the
       drawn line is its edge and carries its wall (`bend.retaining.flat`, offering "Use the other side"). The strip's other edges, where they step, carry walls too, and the badge counts them.
   Both bends commit the bent events, never the flat wall, so item 110 (f)'s "nowhere flat" holds on every path.
4. **T2 `ground` gains a Terrace mode** (a brush). Press and drag over the ground to level it; the level is the ground height at
   the pointer-down point, shown as a readout ("Level 34.2 m"). After release and before Accept, a **level handle** — a
   vertical double arrow at the stroke's first point, as a lake's — moves the level, each drag re-previewing. The brush
   radius is T2's radius parameter, its default V10 §2.10's `encoders.terrace.radiusM` (one default for canvas and clerk). Mapper:
   `terrace { stroke: { path, radiusCm, falloff: 'cosine', amount: 1, water }, levelCm, expansion }` (file f item 362 (c)),
   `water` from T2's water-mode parameter. Commit: Accept, since it re-levels plots. Badge: "terrace {area} m² · retaining
   walls {m} m · steps {a}–{b} m · {n} plots re-flow".
5. **Handles after commit** (V09 §3.5). A retaining wall's chain has the open-chain handles, or a ring's when closed; a drag
   is `moveVertex`, and on a generated wall it makes the wall declared and held (§7.2), which the panel says ("Yours from
   now on; the rules no longer move it."). Selecting a terrace-made wall offers **Change the terrace's level**: the level
   handle again, emitting a new `terrace` over the recorded stroke at the dragged level, whose expansion replaces the old
   walls in its group (file f item 362 (c)). The recorded stroke is the `terrace` event's own, found through the wall's lifecycle
   cause (§2.8: its `EditRef`).
6. **Crossings from the other side.** A T4 road drawn across a standing retaining wall shows the stair or ramp in its
   ghost with the same bend line; a primary or secondary way ramps where the base's way-class rule says so. The form is
   editable afterwards (V09 §4.20.6 (6)).
7. **Keyboard and devices.** Points by arrows and Enter; the High side chip is a `radiogroup`; the terrace brush moves by
   the arrow keys at the focus point and stamps with Enter, and the level handle takes arrows (10 cm; shift 1 m)
   (V09 §4.15). Neither mode is offered on narrow (T2 and T3 are not); both work with a coarse pointer.
8. The bar is T-V9-54 (V09 §7.1).

#### 4.20.2 Raised ways and aqueducts (item 110 (b))

1. **Controls.** T4 `road`'s options strip gains a basic toggle **Raised** and a class chip **Aqueduct**; the chip turns Raised
   on and locks it while chosen. While a T4 stroke is drawn on the Ground layer, **PageUp** turns Raised on for that stroke
   and **PageDown** off — the surveyed road tools' elevation keys (`research/ux/tool-survey.md` Part II, B2-S5). PageUp and
   PageDown keep stepping the depth band while Below is the working layer (V09 §4.13).
2. **Snapping with Raised on** (V09 §3.4's row). The two ends snap only to ground vertices — junction vertices, way
   centre-lines (the end splits that way at commit, making a ground vertex) and plot frontage points. Interior points snap
   to nothing on ground part 0 and never split a way they cross; Shift's 15° rule still applies. An end released away
   from any ground vertex is bent by the dry run along the course to the nearest one (`bend.raised.end`).
3. **Forms.** Two points → the base's raised-way course solver (the one generation and V06's epoch step call; V06 §3.19)
   derives the course; a line → the drawn line is the deck's centre-line, resolved and stored as §7.1 stores a points form.
   Mapper: `drawWay { class, widthCm, raised: true, points | from: { points } }` (file f item 362 (b)); the Aqueduct chip sends
   `class: 'aqueduct'`.
4. **Walls** (file f item 363; J-V9.61). A raised road or viaduct whose course meets an enceinte's trace ramps down to a ground
   vertex before it and passes through the gate the ground way makes there (`bend.raised.wall`). An aqueduct passes through
   an arch in the curtain, never a gate (item 110 (b)), and its ghost draws the arch mark. From the other side, a T3 wall
   drawn across a standing aqueduct shows an arch in its ghost, not a gate (`bend.wall.aqueductArch`).
5. **The aqueduct's ends.** Its first point snaps to a spring or a river reach (its source), its last to a square, a
   fountain pin, a `conduit_house` plot or a cistern of the vaults system (its footprint lit on the ground; II.7.6) — its
   terminal; its course falls all the way at volume 11's `aqueduct.gradient`. A source lying lower than the terminal is
   bent to the nearest source above it within `aqueduct.sourceReachKm` (`bend.aqueduct.source`); with none in reach, the
   dry run bends the stroke to a well pin at the terminal (`instance { op: 'add' }` of a well pin, the base's decoration
   pins, §4.7 S11; J-VI.4 (h)) and commits no way, named by `bend.aqueduct.uphill`, whose alternative is "Show me why"
   (J-V9.75). A terminal released on open ground gets a new fountain
   pin there in the same group (`instance { op: 'add' }`; in a square it is the square's centrepiece, §4.7 S11), named by
   `bend.aqueduct.terminal`. Its buried stretches stay the base's line on ground part 0 (file f item 244); the ghost draws
   them dashed.
6. **A floating island** (V05 §4.2, V05 §3.22 (3); J-VI.4 (d), (e)). A raised or aqueduct stroke never makes a way to or on
   an island, and the dry run bends it (item 101 R2): a raised stroke that ends on an island's rim becomes `placeSkyAccess`
   with the stroke's ends as top and foot and the kind V05 §3.10 admits there, named by `bend.raised.island` in V05's words,
   whose alternative is **Draw a road to its foot** (the same access plus a ground `drawWay` of the stroke's class from its
   first point to the access's foot, one group); an aqueduct stroke that ends on a rim ends at its last ground vertex
   outside the island's footprint (`bend.aqueduct.island`, "An island's water is its own; the aqueduct ends here.", with
   "Show me why"). A raised or aqueduct stroke wholly on an island's key never arises from the canvas, because Raised and
   Aqueduct are hidden on Sky (V09 §4.20.9); from the clerk or a skeleton the dry run drops `raised` and draws the way on the
   island's ground (`bend.raised.onIsland`), and makes an aqueduct a fountain pin at its end (`bend.aqueduct.onIsland`),
   each with "Show me why". A raised course that would cut a sky access's column or rope line, where `skyAccessObstacles`
   offers no re-route, ends at its last ground vertex before it (`bend.raised.skyAccess`; J-VI.4 (f)); T-V9-52 has a
   fixture with a hoist across the stroke.
7. **Rungs.** The Raised toggle and the Aqueduct chip are offered at every rung, the village rungs included (V07 §4.1's
   T4 row); at TOWN and below the user's declaration is the only source (item 110 (b)). Nothing about the cap disables
   them: a declared way counts toward the generator's cap and is never refused by it (V06 §2.13's `declared`).
8. **Badge.** With Raised on, the first line reads "Raised", then "raised {m} m · {n} arches · crosses {k} ways with no
   junction · up to {h} m above the ground · {v} vaults beneath" (the vaults by V04 §3.5.4's span rule); an
   aqueduct adds "from {source} to {terminal} · falls {f} m". At CITY and METROPOLIS the last line reads `info.raised.count`
   ("{n} raised ways in {town}; the rules build up to {cap} by themselves") — a fact from V06's ledger, never a limit.
   A raised or aqueduct stroke leaves its ghost pending with **Accept** — its course and its crossings are for the user to
   judge (J-V9.4) — and never commits on release; each crossing without a junction is drawn as a small bridge mark.
9. **Devices and keys.** Not offered on narrow (T4 is not); points by arrows and Enter; the toggle is in the options
   strip; PageUp and PageDown as (1).
10. **State and walk mode** (J-V9.73). The toggle and the chip hold while T4 stays the active tool, like the class chips,
    and reset to off each time T4 is picked. They are never stored in `AppPrefs`, because a toggle left on by accident turns
    the next street into a viaduct. While V07's walk mode is on, Raised and Aqueduct are disabled with `info.raised.walk`
    ("A walked way follows the ground"); the clerk or the tool API may still send both, and V07's dry run bends them to the
    points form (V07 §4.1).
11. A course longer than `raised.previewOnReleaseKm` previews on release (V09 §3.14). The bars are T-V9-51 and
    T-V9-52.

#### 4.20.3 Removing a generated thing, and adding it again (item 110 (b), (f); the owner's "add or remove")

1. **Delete previews** (J-V9.63). A Delete — the key, the context menu or T10 `hold`, on any thing — commits at once only when
   its dry run lists no fate other than *kept* and no effect beyond the thing itself (V09 §4.20.7). Otherwise the ghost
   stays pending: the removed thing dashed, a detour and new crossings ghosted, the badge's effect count, **Accept — remove
   it** (Enter) and Esc; the fates sheet opens only when the result is `confirm`.
2. **Generated content** — whatever file f item 260 suppresses: a raised way whose lifecycle cause is a generation or epoch
   rule, a harbour-mouth chain, a quay wall, a retaining wall and a deck plot (`detail.suppress`), and a floating island and a
   sky access in volume 5's record form — is removed by the plain `delete { id }` (an island's becomes V05's `convert
   removeIsland`, V05 §4.2). The fold records the suppression by reason key (file f item 260's `detail.suppress`; V05's removed
   slots) — never by its course, so it holds across a table release, an upgrade or a historical pack that moves the course
   (V12 §4.1; T-V12-40) — no client writes a reason key, and a journal replays the call exactly (file f item 362 (e)). The
   suppression holds through Regenerate, a scoped New random over every district the thing crossed, a reload through crash recovery and every
   epoch (V06 §2.13's ledger reads the suppressed set at every generation and epoch). The pending card and the committed
   toast carry `info.remove.holds` — "The town won't {rebuild | raise} this {kind}; undo brings it back." — whose
   arguments come from the dry run's `holds` (file f item 465): the subjects are the engine's, never a list in the shell;
   a deck plot's line is `info.remove.holds.deck`. The clerk's "removed by you" line uses the same row.
3. **The dossier.** Nothing item 110 makes is dossier-bound (V08 §2.6b (5), J-V8.72): a raised way whose reason read a
   dossier record (DR34's water system, DR35's landmarks) is generated content and is removed by (2); its why card
   names the record. A dossier-backed element keeps V09 §4.3's general rule (`rejectSite`, or `refuse.dossierRemove` with
   **Move it** for a record with no site).
4. **History** (V09 §4.10). The row reads "Removed the {kind} {name}; the town won't {rebuild | raise} it", with **Show** —
   its former shape as a dashed outline while hovered, read from the removed thing's last record (file f item 467) — and **Undo
   this**. Where Undo this is refused as dependent (`refuse.undo.dependent`), the row offers **Build it again**: a new
   declaration of the removed thing by its own tool, filled from its last record (file f item 467) and previewed first — one row
   per kind file f item 260 suppresses (J-V9.95):

   | removed kind | Build it again's events | the tool it opens |
   |---|---|---|
   | a raised way or an aqueduct | `drawWay { raised: true, class, widthCm, points }` on the former course | T4 `road` with Raised on, or the Aqueduct chip |
   | a quay wall | `drawWall { kind, points, closed }` on its former line, `kind` and `closed` the record's | T3 `wall`'s Draw wall |
   | a harbour-mouth chain (the water gate across the harbour entrance, file g item 106 (e)) | `placeGate { enceinte, at }` at its former place | T3's Gate |
   | a retaining wall | `drawWall { kind: 'retaining', points, closed, highSide }` on its former chain (file f item 362 (a)) | T3's Retaining wall |
   | a deck plot | `drawFootprint { polygon, cls? }` on the deck at its former slot — the footprint and class of the building tombstoned at the removal's seq whose last record names that plot, or the plot's own outline when it stood empty — which S11 fits as the deck plot at that slot (served by V06 §3.19.3 (7)) | T9 `shape` on the deck |
   | a floating island | V05 §3.2 (6) (ii)'s T5 `quarter` `sky` declaration on its former outline, which takes its held slot | T5 with Sky |
   | a sky access | `placeSkyAccess` at its former top and foot (a placed access; the removed ordinal stays held, V05 §3.10 (1)) | T4's Sky access |

   **One function** computes these events for a removal group, named by its first seq: for each `delete` of the group it
   reads the tombstoned id's `entity` answer (file f item 467) with `admitAs` = `effectiveKey()` (V09 §2.7) and emits that
   kind's row, in the group's order; a delete whose answer the key withholds, or whose kind has no row, adds nothing, and an
   empty result shows no **Build it again** (nor volume 10's **Put it back**). The history row calls it, and the shell hands
   the same function to the clerk slot as `ClerkMount.rebuildEvents` (V09 §2.10), so volume 10's `rebuild` action takes
   exactly these events — the one source (J-V9.94).
5. **Narrow.** Delete from the context menu (or the long-press menu) is offered on narrow with the same pending card (it
   is not a drawing gesture).
6. **A town-wide "none".** The advanced panel's "Raised ways the town builds by itself: none" (V09 §4.14) sets volume 11's
   chances to 0 and offers **Remove them too** for the standing generated ones, each removed as (2).
7. **Crossing the CITY line on T1 `intend`** (J-V9.72). A Re-derive from CITY to TOWN drops the generated raised ways,
   since a town raises none by its own rule. The whole-town ghost's effects list each one that goes (`effect.raised.goes`),
   and the card offers **Keep them as yours** — a checkbox, unchecked by default. Checked, it appends one declared `drawWay
   { raised: true, class, widthCm, points }` per kept way along its current course, in the Re-derive's group, so one undo
   removes both. Raising a town to CITY lists each way the city raises, with its reason (`effect.added`: "The city raises a
   {kind}: {reason}"). An epoch's fall keeps them (V06's rule); only a Re-derive drops them.
8. The bars are T-V9-53 and T-V9-63.

#### 4.20.4 Decks: moles, jetties, quay platforms and bridges (item 110 (d))

1. **T6 `place` on a deck plot.** A stamp on a deck plot maps to `placeAt` from its point (V09 §3.3 step 4): the dry run finds the
   deck plot under the point. On a
   deck with no free plot there, the dry run takes the nearest free deck plot on the same deck, else the nearest land plot,
   bent (`bend.deck.full`).
2. **A class the deck refuses.** A class volume 11's `deckOk` refuses is bent to the nearest free land plot at the deck's
   landward end — the plot nearest the deck's shore vertex (`bend.deck.class`: "A {class} can't stand on a {deck}; placed it
   at the {deck}'s landward end.").
3. **Landmark slots.** T6's snap lights a mole's slots — its head and its midpoint ("Mole head", "Mid-mole") — and a long
   bridge's mid-span slot (file f item 246) for a tower or fort stamp; a stamp there maps to `placeAt` on the slot's landmark
   plot, whose building reads `DeckContext.landmark` (V02 §3.16 (2)). A non-landmark class dropped on a slot takes the
   nearest free deck plot, bent (`bend.deck.full`).
4. **The deck building's badge** reads "on the {deck} · at most {maxFloors} storeys · {a}–{b} m²" from volume 11's `deck`
   budget (`DeckBudgetRead`, V02 §2.6) — a storey cap and a footprint band, never a count of plots (J-V9.66). T9 `shape`'s storey
   stepper on it is clamped at `maxFloors` with V02's bend (`bend.deck.floors`, V02 §4.6 (5)).
5. **T4 `road`'s deck ghosts.** Drawing a `pier`, `quay` or `bridge` way ghosts its deck plots along the deck, and the badge adds
   "{n} deck plots"; a raised way offers none (J-V2.71).
6. **Removing or ruining a deck** previews its buildings among the effects (`removed`, `displaced`; V09 §4.20.7). The deck
   host's Over time tab offers **Rebuild it** (the base's rebuild of the host, as the coherence pass writes item 110 (d)'s
   lifecycle), which re-offers the plots, listed as `added`.
7. **Fixture 1's bridge fortress** (V09 §7.2). Its canvas script makes it by T4 `bridge`, then a T6 stamp of the fort class
   on the bridge's mid-span slot. File f item 246 gives a bridge deck of at least volume 11's
   `deck.landmarks/bridgeMid/minSpanM` (V11 §3.24.4) one landmark slot at its mid-span, as a mole's midpoint has.
8. The bar is T-V9-55.

#### 4.20.5 Tiers — stepped massing at the building band (item 110 (c); V02 §4.6)

1. **The controls.** At the building band on a `stepped` building, T9 `shape` and the Shape tab show: a **tier stepper** (the
   count → `setMassing { op: 'tiers', count }`); a **step handle** on tier 1's front face (`tierStep`; its drag emits `tiers {
   insetCm }`, the inset being the handle's distance from tier 0's front face, snapped to 10 cm); a **stair chip** (Along the
   front · Up the faces · Inside · Sealed → `stairs: 'axial' | 'flights' | 'internal' | 'none'`); a **top chip** (Flat ·
   Shrine · Roofed → `top`); a **shape chip** for tier 0 (Square · Round · Octagonal → `tiers { shape }`, V02's tier-0
   shapes); behind More a **skirt chip** (Flat terraces · Skirt roofs → `tiers { lowerRoof: 'flat' | 'pent' }`) and a **solid
   chip** (All solid · Lower solid · None solid → `tiers { solid: 'all' | 'lower' | 'none' }`); a **shrine-inset handle** on the
   top tier (`shrineInset` → `tiers { shrineInsetShare }`); on a round or octagonal tier 0 its **centre and radius handles**
   (`tierCentre`, `tierRadius` → `tiers { centre, radiusCm }`), all as V02 §4.6 (1) states (J-VI.5); per tier a **storey stepper** (a storeyed tier or the shrine: `setAttr(wings/<key>/heights/floors)`) or a
   **height stepper** (a solid tier: `setAttr(wings/<key>/heights/eaveCm)`); and behind More a **stair-width stepper**
   (`tiers { stairWidthCm }`). A tier is also selectable as a part (`tiers/<k>`) through the hit stack (V09 §4.20.8), which
   opens its own stepper.
2. **When.** The per-tier storey and height steppers from M3a (the base's `setAttr` of a wing's heights, J-V2.65); the tier
   stepper, the step handle and the chips from M6c, with V02's `tiers` op (V02 §8.5); a build before M6c ships none of them
   (its `toolkit.json` has no such rows).
3. **Preview.** Each is previewed. A removed tier's rooms are listed among the fates where a stored plan holds them, and
   otherwise among the effects (V03 §3.11); the stairs' re-lay is an effect (`effect.stairs.relaid`). V02 §1b's bends are
   worded by V09 §4.9's rows (`bend.tiers.*`, `bend.tier.height`, `bend.stack.*`, `bend.deck.*`, `bend.building.remove`,
   `bend.family.nearest`).
4. **Bends, never refusals** (item 101 R2; J-VI.4). Every case a tier edit meets is a bend of V02 §1b's set, worded by
   V09 §4.9's rows; the island and rim cases bend as J-VI.4 (a)–(h) states (V09 §4.20.2 (6), V09 §4.20.9). T-V9-13 lists
   all of them as bends.
5. **The why facts.** The Shape tab's About section shows V02's `massing/stack/*` facts (shape, the stair form asked and
   laid, the top, the step, truncated tiers; V02 §4.6 (6)) with their tier chips.
6. The bar is T-V9-59 (M6c); the per-tier steppers are in T-V9-51 at M3a.

#### 4.20.6 The new records' panels, handles, spans, crossings and why lines

1. **Panel rows** (registry labels and help anchors, file f item 269):
   * a **retaining wall** — its step "{a}–{b} m", its material, towers or buttresses, its high side (chips), and "Made by
     the rules on levelled ground" or "Yours";
   * a **raised way** — its kind (viaduct, raised road, aqueduct; V06's `RaisedKind` `viaduct` · `elevated` · `aqueduct`),
     its reason as the `raised` section's row of its `WhyAnswer` (`info.raised.<outcome>`, V10 §3.9; the same `MsgRef` the
     why card and the clerk draw), with its values (the reason's words volume 11's `raisedWays` `says` rows, V11 §3.24.2),
     its deck height, its arches with their use, its
     supports, the vaults beneath (volume 4), an aqueduct's source and terminal, and for a way carried down its `carried`
     row (`info.raised.carried`, from V07's `RaisedRead.origin`);
   * a **deck** (its host way's panel) — its kind, host, plots, storey cap and footprint band;
   * a **stepped building** — V02's why facts (V09 §4.20.5 (5));
   * a **span** — its use and reason, its vault's building when walled up;
   * a **crossing** — the way, the wall, its form and the step it climbs.
2. **A span** (selected through the hit stack) shows T9 `shape`'s **Open arch · Walled up as a vault** chips → `setAttr(way,
   'spans/<n>/use', 'open' | 'vault')` (file f item 362 (d)), previewed; the effects list the vault's building and any drawn plan
   in it. A span whose recorded reason keeps it open (a part-0 way, water or a flood cell beneath, too tall,
   too low or too steep; V04 §3.5.4's span rule) shows "Walled up as a vault" disabled with that reason in words ("A street
   passes under this arch") — no event is sent. The edit is held (a user edit), and the why card then reads "… by you".
3. **`decidedBy`** (V09 §2.7's rows): for a raised way its own `raised` section row (`info.raised.built`, `.carried` or
   `.declared`), not drawn twice (J-V9.82); V09 §2.7's lines for a levelled retaining wall and an arch vault. The rest of the card's item-110 lines are the `raised`, `underground`, `massing`, `plan`, `island` and `move`
   sections' rows (V09 §2.7's `sections`).
   A raised way whose reason read a dossier record adds the record as a `facts` row of tier `dossier` (DR34) or as `ref`
   rows, a withheld one named by kind (DR35).
4. **Handles** (V09 §3.5's rows): `rampEnd` on a raised way's two ends (drag → `moveVertex` resolved only onto a ground
   vertex, the snap of V09 §4.20.2 (2)); its interior points (`moveVertex` on its raised part's lattice point); a retaining
   wall's chain (V09 §4.20.1 (5)); the terrace level (`terraceLevel`); the tier step (`tierStep`), a round or octagonal tier 0's centre and radius
   (`tierCentre`, `tierRadius`) and the shrine's inset (`shrineInset`) (V09 §4.20.5 (1)).
5. **The context menu** of a raised way: Why here?; Select below (V09 §4.20.8); Lock, Pin; Reset to generated (when edited);
   the Over time submenu (the base's conversions of a way); and Delete with V09 §4.20.3's card.
6. **A crossing's form and the deck's measures** (file f item 364). A selected crossing shows T9's **Stair · Ramp** chip →
   `setAttr(way, 'crossings/<retaining wall id>/form', 'stair' | 'ramp')`; a ramp too steep for the way's class bends into
   a longer ramp along the way where its run allows, else back to a stair (`bend.crossing.steep`). A selected raised way
   shows T9's **Deck height** (`clearanceCm`, the least soffit height over the ways it crosses; a value below volume 11's
   `raisedWays.structure.clearanceCm` for a crossed way's class bends up to it, `bend.raised.clearance`) and **Arch
   spacing** (`spanSpacingCm`, within the material's `pierSpacingM` band) steppers. Each is previewed, and once edited is
   held.
7. The bars are T-V9-51 and T-V9-60 (the effects), with T-V9-12 reading the new paths.

#### 4.20.7 What else a change does — the effects list (file f item 465)

A preview's **fates** are the declared and held things an edit touches (§11.2); item 110's consequences reach things that
are not held — a generated route's detour, streets that now meet a ground way, a terminal that loses its water, arch
vaults with their buildings and drawn plans, buildings on a removed deck, households moved by new supports, retaining walls
re-laid by a terrace. file f item 465 gives `PreviewResult` and `ApplyResult`'s `confirm` one typed list, `effects` (kind
`added` · `removed` · `rerouted` · `joined` · `lost` · `displaced` · `rebuilt` · `moved`, a `MsgRef`, its targets; at most 50,
then `effectsMore`), filled by the engine from the rows the owning volumes state, and a `holds` line for a suppressing
removal. The application renders it in four places, one list, one wording (the `effect.*` rows of V09 §4.9):
* **the badge** adds "and {n} other changes" with **Show**, which opens the list over the map; each row's Show highlights
  its targets;
* **the fates sheet** (V09 §5.5) gains a section **What else changes** after the fates, grouped by kind, virtualised with the
  fates;
* **the live region** reads the first three and "and {n} other changes" (V09 §4.15);
* **the clerk's card** reads the same list, filtered under the key, each line with its Show only (V09 §4.11; V10 §5.4).
A gesture whose preview lists any effect commits on Accept (V09 §3.3). The bar is T-V9-60 (J-V9.64).

#### 4.20.8 Reaching what lies under a deck — the hit stack (file f item 466)

1. **The answer.** `query({ kind: 'hit', … })` returns every mark under the point within the hit radius, top first by §8.2's
   draw order (a raised part above ground part 0), with the sub-part under the point (a raised way's span, a crossing, a
   stepped building's tier), ≤ 1 ms from the tile worker's hit-test slices.
2. **Click-again cycling** (J-V9.65). A click selects the top of the stack. A click on the already-selected thing, where the
   stack holds more, selects the next one down, cycling back to the top after the last; a click elsewhere starts afresh. A
   click on a selected raised way over one of its spans selects that span (`Selection.kind = 'part'`, path `spans/<n>`).
   The order on a viaduct over a street: the deck, the span, the arch vault (when walled up), the street. A double-click
   stays "zoom to the band". `hint.below` shows the first time a click lands on a stack of more than one mark.
3. **Select below.** The context menu lists **Select below: {name}** for every other entry (the keyboard route: Shift+F10 on
   the selection, V09 §4.4). By touch, a tap cycles as a click does and the long-press menu lists the same (V09 §4.12).
4. **Names** (V09 §5.14). T11 `name` takes the top of the stack, and a second click the way beneath, so a viaduct and the street
   under it keep separate names; an aqueduct is named as any way is.
5. **Volume 10's `entity { at }`** returns the top of the same stack (V10 §2.13).
6. The bar is T-V9-58.

#### 4.20.9 Item 110 on the Sky layer (V05 §3.22 (4), V05 §4.1)

On Sky the tools act on the chosen island's arena with its `key` (V09 §4.2's sentence lists every row of V05 §4.1):
* **T2 `ground` Terrace** levels the island's ground and lays an island `RetainingWall` along its edge (file f item 245); **T3 `wall` Retaining
  wall** draws one. A stroke of either on or along the rim strip is bent by the dry run inward past the rim walk (J-VI.4
  (g); V05 §3.22 (4)): every point of the stroke lying in the rim strip moves along the island's radial direction to 1 m
  inside the strip's `setback` line, named by `bend.retaining.rim` ("The rim walk stays level; the wall stands
  inside it.") with "Show me why"; the ghost shows the moved stroke pre-selected, as every bend (V09 §3.3), and the clerk
  and a skeleton get the same bend from the same dry run.
* **T3 Draw wall** lays V05 §3.21's barrier-closure enceinte walling only the landing yards, with V05's words.
* **T4 `road`** offers only the sky access (V05 §4.2); Raised and Aqueduct are hidden, since no raised part stands on an island
  (V05 §3.22 (3)).
* **T6 `place`, T8 `fill`, T9 `shape`, T10 `hold`, T11 `name` and T12 `dress`** take their V05 §4.1 forms; `toolkit.json`'s `layers` name `'sky'` for T2, T3, T6, T8, T9,
  T10, T11 and T12.
* The disabled example on Sky is T4's Tunnel: "Tunnels are dug below the ground" (`disabled.onlyBelow`).
=== END ===

=== REPLACE ### 4.21 Items 111–119 on screen ===
### 4.21 Items 111–119 on screen

Each owner item's rules are the base's and their volumes' (V09 §1.3); this section is the application's part of each,
as the canon routes it — its controls, words, panels, lifecycle and bar. Every word is a V09 §4.9 row, every gesture runs
V09 §3.3's pipeline, and every view setting is view state that never changes the model or its hash.

**4.21.1 The oasis — T2 `ground`'s spring flag (item 111).**
1. **The control.** T2 `ground`'s **Lake** mode gains the toggle **Spring-fed (oasis)** (a `ToolParamRow` of kind `toggle`,
   `basic`, default off; `toolkit.json`, V09 §2.3), offered on every site on Ground — an oasis the user draws may stand on
   any site, since item 111 (d)'s "only on arid sites" binds generation and not a drawing — and hidden on Sky (an island's
   water is V05's; item 111 does not apply there). `hint.oasis` shows the first time the Lake mode is picked on an arid
   site (the biome's climate row, §4.2 S0).
2. **The mapper.** With the toggle on, the lake's points-and-level form maps to `drawWater { kind: 'lake', add: [], from: {
   points: [p], levelCm, spring: true } }`, the flag inside the points form (§7.1's `PointsForm.spring`; §7.1's T2 row;
   item 111 (a)); the dry run fills the basin (S1's basin fill,
   `bend.lake.level` where the level spills) and lays the oasis's grove and irrigated gardens (§4.2 S1; §2.3's
   `WaterBody.spring`). Commit on Accept, since the grove and gardens re-flow plots.
3. **The ghost and badge.** The ghost draws the water, the grove and the gardens (§8.2's rows); the badge's extra line is
   `info.oasis.badge` ("An oasis: {grove} ha of grove and {gardens} ha of gardens"), the areas read from the preview's
   created land-use faces (`PreviewResult.created`, their `entity` answers), and the usual counts.
4. **After commit.** The oasis is a declared water body (held, §7.2): its level handle as any lake's (V09 §3.5); its flow
   slider ("The spring fails" · "The spring runs again") is V06 §4.2's hand form (`setAttr` on `WaterBody.spring.flow`);
   Delete removes the water, the grove and the gardens as one previewed group (V09 §4.20.3 (1)). The history row reads "Made
   an oasis at {place}" (V09 §4.10). The why card's bars carry the water term as `why.driver.water` (V09 §4.9; item 111
   (b)), whose explanation rows are volume 10's.
5. **From the dossier.** An oasis a dossier's `oasis_water` deposit makes (DR40) is dossier-owned: its panel shows
   **Spring-fed** on and locked ("Set by SettlementForge"), its why card's `facts` row reads `info.oasis.dossier`
   ("SettlementForge's record puts water here"), a Delete takes `refuse.dossierRemove` (§7.7 item 2), and the level handle
   stays (a map-side value the dossier does not set).
6. **Edges.** The toggle on a lake whose point lies in no hollow bends the level as any lake (`bend.lake.level`); a spring
   on an island never arises (hidden); undo removes the oasis, its grove and its gardens in one step; a save, a reload, a
   Regenerate and an epoch keep it (declared). The bar is T-V9-71.

**4.21.2 Colour vision and the second cues (item 112 (a)); the trial (item 112 (b)).**
1. **The setting.** The view bar's Map group and Settings' Accessibility section (V09 §5.12) carry **Colour vision**: "Usual
   colours" · "Red-weak" · "Green-weak" · "Blue-weak" (`view.cvd.<variant>`), writing the per-viewer view key `cvdVariant`
   (`'none'` · `'protan'` · `'deutan'` · `'tritan'`, §8.2's `CvdVariant`). §8.2 joins it to the tile key and lays the sheet's
   checked variant; the legend (§9.5) draws the variant's swatches; picture exports made while it is set draw it, and the
   export dialog's Picture tab shows the line "Colours: {variant}" with a chip to switch it for that export. It is not
   logged, never crosses a bridge and is never in a digest (V09 §2.12); Settings writes the machine default
   `AppPrefs.cvdDefault`, which a view reads while its town holds no value.
2. **The second cues.** Every colour-coded meaning of this volume's thematic views carries a second cue — a pattern, a
   line style, a label or a shape — stated once in V09 §5.4's cue column, one channel per cue (V09-ICONF-4's rule); the
   style families' cues are §8.2's. The chrome's own status colours always pair with an icon and words (V09 §5.1).
3. **The trial** (item 112 (b)) is V09 §7.6's protocol.
4. **Edges.** A sheet without a checked variant for the chosen deficiency draws its palette with its second cues (§8.2);
   an unknown stored value reads `'none'`; the chip on narrow is in Settings only. The bar is T-V9-72.

**4.21.3 A town with a past — the history option, what the past left, a lost void (item 113).**
1. **The History chip.** T1 `intend`'s sheet gains **History**: "None" · "Once a {tier}" — a picker of the rungs above the
   town's own (item 113 (a), "once a city, now a village") — with, behind More, an **Age** stepper (years, default
   `history.defaultAgeYears` = 300, our own, calibratable; confirmed by T-V9-73's fixture replaying within item 119's
   comfort level as V06's part of the item applies it). A pick maps to `adjust('history', { peak: { rung }, ageYears, scars: [] })`, the blueprint's `history`
   (§4.2 S0's `HistoryHint`), and "None" to `adjust('history', undefined)`. In the empty state it is part of the new town's
   recipe; after a declaration it is a Re-derive from S0 (§7.1), previewed as the whole-town ghost with its fates
   (V09 §3.3), the replay's wait shown by the progress view (4.21.9). With a dossier history (DR36–DR39) the chip reads
   `info.history.fromRecord` ("From SettlementForge's record") and is locked; the replay is the port's.
2. **What its past left.** The report panel (V09 §5.7) gains the section "What its past left", one line per
   `report.history.<line>` row read from §2.7's `HistoryRecord` and V06's replay record (V06 §2.14) — the peak (or the
   symbolic peak), each destruction and refounding, the old walls and streets, each buried system, an oversized building —
   each with **Show** on its targets. A fact whose provenance carries `symbolic` shows the chip `info.history.symbolic`
   ("size not recorded") beside its tier chip (V09 §2.7); the story is volume 10's.
3. **A lost void** (item 113 (e)) is V09 §4.17.1's (`info.under.lost`; the Below legend's "Once known").
4. **Edges.** "Once a {tier}" is not offered at the town's own rung or below; at METROPOLIS the picker is empty and the
   chip reads "None" only; a standalone neighbourhood document has no History chip (it has no clock, V06 §4.1); undo of the
   Re-derive restores the former recipe and model; a skeleton carries the blueprint's `history` (§11.1). The bar is
   T-V9-73.

**4.21.4 Walls: the repair's material, and the wall states in the legend (item 114).**
1. **The Repair mode.** T3 `wall` on a selected run (its grip) offers **Repair** with the **Material** chip — first "In
   {material}" (`wall.material.robust`, the wall's own material, the default), then one chip per row of V11's
   `walls.patchMaterials` for the enceinte's kind and culture, each worded by its row's `label` cell ("Patch with timber",
   "Patch with wattle", "Patch with an earth bank" …) — and **Wear**; on a neglected ring (no run selected), **Back in
   use**. The mapper sends `convert { op: 'repairWall', enceinte, stretch, material }`, `convert { op: 'wearWall',
   enceinte, stretch }` or `convert { op: 'repairWall', enceinte }` (V06 §2.8's shapes; §7.1's T3 row). Commit on release;
   Accept when the dry run lists fates or effects. The chip's choice is a session option of the tool (V09 §2.12).
2. **What each run takes.** On a `breached` run a patch row makes it `patched`, robust `standing`; on a `worn` or
   `patched` run only robust is offered (the patch rows shown disabled with `info.wall.patchOnlyGap`); on a `dismantled`
   run the dry run bends to a new stretch on its line (`bend.wall.newStretch`; V06 §2.8); a `standing` run offers **Wear**
   only. "Back in use" with no neglect to lift is a no-op with `info.wall.inUse`.
3. **The panel and the legend.** A selected run's panel line is `info.wall.run` ("{state} since {year}, patched with
   {material}"), read from its condition and material (§2.7's `Enceinte.condition`) and the epoch of its last change; the
   ring's why card carries the generation-time line from §7.7's condition row (readiness and wealth; item 114 (d)) and
   volume 10's story of each run. The legend (§9.5) lists each wall state present in the view — `legend.wall.<state>`,
   each drawn with §8.2's state row and its second cue (a break with rubble, a patch's own line style, the worn ticks at
   the district band and finer, a dismantled run's trace discs) — so no state is told by colour alone (item 112).
4. **Exports** carry each run's condition and material (§11.1); the export dialog's VTT tab says "Patches count as walls,
   breaches as openings" (item 114 (f)).
5. **Edges.** A run with no material recorded reads robust; a ring of one run takes the same controls; the Material chip
   on a palisade lists the palisade's patch rows (V07); undo restores the former condition, material and last-change epoch
   (V06 §2.8). The bar is T-V9-74.

**4.21.5 A hand edit beyond the grandeur ceiling — honoured and explained (item 115 (c)).**
1. **Honoured.** A T6 placement or a T9 `shape` reshape that gives a dwelling a design above its rung's ceiling (§4.7 S10b's
   ceiling; §10.2's table, V11's rows) — an `H` or `U` plan, a court, a tower or a turret at THORP or HAMLET, a second manor
   or a grand arrangement on another dwelling at VILLAGE — is committed as asked: the ceiling is a default, never a refusal
   (item 101 R2), and an epoch never reshapes it down (V06 §3.8.5 (4)).
2. **Explained.** The shell reads the rung's ceiling row (the same table, by the document's rung) against the draft's
   events — the class a `placeAt` or `build` designates, the family or feature a `setMassing` or `setComposition` sets —
   and, when the design lies above it, adds `info.grand.beyondTier` ("{building} is grander than a {tier} usually has; kept
   as you made it") to the badge and the preview card; the building's why card carries the same line as a `facts` row
   (tier `declared`), and volume 10's explanation says it (V10 §3.9). A building the dossier names as grand (V08's
   "specified", item 115 (c)) reads `info.grand.dossier` instead, tier `dossier`.
3. **Edges.** At TOWN and above the ceiling admits every design and no line shows; a reshape back under the ceiling drops
   the line; the same edit from the clerk carries the same line on its card (V10). The bar is T-V9-75.

**4.21.6 The view stops at the zoom-out limit (item 116).**
1. **The limit** is §8.8's per-map zoom-out limit — the stop at which the map's whole `bounds` fits the viewport's short
   side, plus one stop of margin (item 116 (a)). The wheel, a pinch, the − key and the view bar's zoom-out button settle no
   further out than it; at the limit the button is disabled with `info.zoom.limit` ("This is the whole town") as its
   tooltip, and a further wheel or pinch settles back to it without a bounce.
2. **Fit the town** (the view bar's frame button) frames the limit less its margin — for a village, V07 §5.2's township
   view — and the first view is §9.5's framing, unchanged (item 116 (e)). The export dialog's "whole town" frame is the same
   bounds (item 116 (c)).
3. **Growth.** An epoch or a hand edit that grows `bounds` moves the limit with it at the next `doc.changed`; a view
   zoomed out at the old limit stays where it is until the user zooms.
4. **Edges.** A viewport resize re-reads the limit; a map whose bounds fit at the pyramid's outermost stop keeps that stop
   as its limit. The bar is T-V9-76.

**4.21.7 The season control and "Follow SettlementForge" (item 117).**
1. **The control.** The view bar's Light group carries **Season**: a week slider (0–51, spring first, SettlementForge's
   grid; "Week {w}"), the four chips **Spring** · **Summer** · **Autumn** · **Winter**, each the middle week of its
   thirteen (6, 19, 32, 45), and, when the document has a dossier, the switch **Follow SettlementForge**
   (`view.season.<name>`). It writes §2.9's year position and follow flag (per viewer, never over a bridge, never in a
   digest; V09 §2.12). The slider and chips re-skin by §8.2's season rows within §12.5's re-skin budget; the map, its model
   and its hash are untouched in every week (item 117 (a)).
2. **Following.** With the switch on, the week is §7.7's calendar row's — the dossier's current week and season — at open
   and at each absorb; moving the slider or a chip turns the switch off, and turning it on again takes the dossier's week.
   Standalone, the control opens at midsummer (week 19) and has no switch (item 117 (c)).
3. **Weather and light.** `snow` weather defaults on in a cold or severe climate's snow weeks and off in an arid one, and
   stays the user's to switch; the view sun's default height follows the week (item 117 (g)) — both view state only.
4. **Exports and words.** Image and print exports draw the week shown and name it (`view.season.line`, "{season}, week
   {w}"); the export dialog shows the line and a chip to pick another week for that export; a battle-map export records
   it (§11.1). The clerk's explanation of a seasonal look is volume 10's.
5. **Edges.** A dossier with no week falls back to midsummer with the switch on and the line "SettlementForge has no week
   yet"; an unknown stored week is clamped into 0–51; the same document shows identical hashes in all 52 weeks (T-V9-77).

**4.21.8 The festival list and its switch (item 118).**
1. **The list.** Under the Season control, **Festivals** (`view.festival.title`) lists each festival §7.7's traditions row
   reads from the dossier — "{festival}, weeks {a}–{b}" (`view.festival.row`), in window order — each with **Preview**;
   standalone, the list holds the generic festivals chosen by the culture and the season (item 118 (b): "Spring feast",
   "Midsummer", "Harvest home", "Midwinter"). Above it the switch: "Decorate when a festival is on" · "No decorations".
2. **What it writes.** §2.9's festival display (per viewer): `follow` (the switch on: a festival's decorations show while
   the view's week lies in its window), `off`, or a festival id (**Preview**: that festival shown whatever the week, until
   the switch is touched or another is previewed). §8.2's decoration rows draw it; the map, the model and its hash are
   untouched (item 118 (a)).
3. **Exports and words.** Image and print exports draw the decorations shown and name the festival
   (`view.festival.line`, "Dressed for {festival}"); battle-map exports draw them in the image only (§11.1). The clerk's
   words are volume 10's.
4. **Edges.** A previewed festival no longer listed after an absorb falls back to `follow` (V09 §2.12); two festivals
   whose windows overlap both show, in window order; with no traditions and no preview nothing is drawn (item 118 (h)'s
   no-op pin). The bar is T-V9-78.

**4.21.9 The progress view — a one-time wait (item 119 (c)).**
1. **When.** Every one-time wait a user sits through — a generate, a Regenerate or Re-derive, an open (from a file, a
   permalink or SettlementForge), an absorb, an export and a migration — runs within §12's ten-second comfort level, §12's
   laws staying the targets (item 119 (a)); an advance of time and item 113's history replay take that comfort level as
   V06's part of item 119 applies it. A wait that passes `progress.showAfterMs` (1 000 ms, our own; item 119 (c)'s "about
   one second") shows the progress view, and a shorter one shows nothing; **Go back to here** and a restore jump
   (V09 §3.9) past it show the progress view the same way, counting the events undone (`progress.undo`).
2. **What it shows.** A strip over the map's top — never a modal and never an empty screen: on an existing town the town
   stays drawn under it (dimmed while a whole-town result is pending), and on a first map the stages' outputs fill in as
   they land, drawn in the ghost style under the strip, never shown as the finished map until it is complete (§8.5). The
   strip names the running stage by `progress.stage.<group>` — the running `StageDecl`'s own group by the table below,
   a volume's main-phase stage taking the group of the base stage before it in the registry's order, a tail stage
   `below` — or, for a wait that is not a
   stage run, its `progress.<wait>` row (an epoch "Year {year} of {years}", the replay "Replaying the town's past: {year}",
   an absorb, an export with its percentage, a migration), with a bar over the wait's known steps (stages, epochs, export
   tiles) and **Stop** where the wait can stop: V06's advance; item 113's history replay at generation, where a stopped
   history-first generation leaves no document and shows `info.history.cancelled` with **Generate without its history**
   (V06 §3.20.4) — a stopped Re-derive's replay commits nothing; and an export.
3. **The stage groups:** `ground` S0–S1 · `plan` S2–S3 · `streets` S4, S5a–S5d, S8–S9 · `walls` S7 · `quarters` S6, S7b ·
   `plots` S10a, S10 · `places` S10b · `buildings` S11 · `land` S12a–S12c · `names` S13a · `drawing` S14 and the tiles of the
   first map · `people` S15 (the simulation module, §4.10, when it is on) · `below` every `phase: 'tail'` stage (V04's
   underground layer, run after the first map, §4.1). Stage progress reaches the shell from the generation worker as each
   stage starts (the worker host's messages, §11.2's worker boundary (`onProgress`); §12's progress rule), never polled.
4. **Interaction stays fast.** Pan, zoom, hover, the season and festival switches and every panel stay live during the
   wait, at their own budgets (V09 §6; item 119 (d)); a gesture's preview is never delayed by the progress view.
5. **Edges.** A wait that ends inside `progress.showAfterMs` never flashes the strip; a wait that fails shows the failure
   rung's line in its place (V09 §3.14); a stage that reports no progress keeps its name with an indeterminate bar. The
   bar is T-V9-79.
=== END ===

=== REPLACE ### 5.1 The frame, and the chrome's own look ===
### 5.1 The frame, and the chrome's own look

**The frame (wide layout, reference viewport 1 440 × 900 CSS px, §12.5).**

| region | place and size | holds |
|---|---|---|
| top bar | full width, 48 px | the town's title and tier word (click to rename: the `title` label, §9.5) and the seed chip; the file menu (New town, Open…, Save a copy, Export skeleton, Rebuild around my drawings, Recently deleted, Settings, About; in host mode Export skeleton, Rebuild around my drawings, Settings and About only, V09 §2.2's `fileMenu: false`); Undo, Redo; the panel menu (Report, History, Gazetteer, Names, Notes, People when the module holds people); Share; Export; Help (?); Assistant (AI) when a clerk is configured and on |
| tool rail | left, 72 px wide (a label under each icon at UI scale 1) | the five layer groups and their tools (V09 §4.2) |
| options strip | across the map's top, 44 px, only while a tool is active | the tool's mode chips and basic parameters, "More" (V09 §4.5) |
| map region | the rest; `role="application"` (§14) | the composed tiles, the overlays (V09 §5.3), the empty state's overlay, the variations tray, the refusal card, toasts at the bottom centre |
| context panel | right, 360 px, when something is selected or a panel is opened | selection tabs (V09 §4.4), or the report, history, gazetteer, names or dress panel |
| view bar | map's foot, 40 px | working layer (Ground · Sky · Below, V09 §4.2) with the Below and Sky groups; the Map group (rotate, plots only, detail; V09 §4.19); Show (thematic views, V09 §5.4); View as (V09 §4.8); the Map group also holds **Colour vision** (V09 §4.21.2); the Light group (day or night, sun mode, height, the season with its festival list, V09 §4.21.7–V09 §4.21.8, weather) with the clock (V09 §4.18); layer toggles (§7.8); the ruler; the scale bar and zoom; V06's timeline bar docks above it when the town has history. Groups that do not fit fold into a "More" menu, in the order Map, Light, layers |
| drawer | right, 400 px, over the context panel | the clerk (V09 §4.11) |

Medium: the rail collapses to icons (52 px), the context panel and the drawer become sheets over the map's right edge,
the options strip wraps to two rows. Narrow: the rail becomes a bottom bar of the four first-screen tools plus "More" (a
sheet of the rest that the narrow layout allows), panels and the drawer are bottom sheets, the view bar folds into a
"Layers" button. **Chrome tokens** (our own values; the chrome is deliberately calmer than the map and never uses the map's
roles, so a tint on the map is never mistaken for a control):

| token | light | dark | used for |
|---|---|---|---|
| `chrome.bg` | `#FBF8F2` | `#1E1C19` | bars, rail, panels' ground |
| `chrome.surface` | `#FFFFFF` | `#2A2723` | cards, sheets, fields |
| `chrome.ink` | `#2B2621` | `#EDE7DC` | text, icons (contrast ≥ 12 : 1 on `bg`) |
| `chrome.muted` | `#6B6358` | `#B3AA9C` | secondary text (≥ 5 : 1 on `bg` and `surface`) |
| `chrome.line` | `#DDD5C6` | `#45403A` | rules, borders |
| `chrome.accent` | `#2F5D7C` | `#8FB8D6` | the primary button, focus ring (3 px), selection outline |
| `mark.snap` | `#C2572B` | `#E08A5F` | the lit snap candidate, its role label |
| `mark.bend` | `#8A6A1F` | `#D9B866` | the bend line's rule |
| `mark.refusal` | `#9B2C2C` | `#E07A7A` | the refusal card's left rule (never a fill) |
| `mark.ai` | `#5B4B8A` | `#B3A5E0` | the AI mark on the clerk's button, cards and history rows |
| `tier.declared` · `tier.dossier` · `tier.map` | `#2E7D5B` · `#7A5230` · `#6B6358` | `#7CC8A3` · `#D1A47C` · `#B3AA9C` | the tier chips (with their words, never colour alone) |

No chrome colour carries a meaning alone: every mark pairs with its icon and words — the tier chips with their words, the
refusal and bend cards with their text and rule, the AI mark with the label "AI" — so the chrome reads the same under every
colour-vision setting (item 112 (a)).

Type: the system UI stack (`system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif`) at 13 / 15 / 18 / 22 px
× the UI scale, line height 1.4; the map's labels stay in the bundled faces (§17.2), and T11 `name`'s inline editor draws its
text in the label's own face and size so a rename is seen as it will print. A 4 px spacing grid; 6 px radius; no drop
shadows (rules instead). Icons: the twelve tools and the app-specific marks (ghost, badge, AI, tiers, working layers) are
our own 24 px SVG sprite, which also carries the 45 family glyphs `fam.<family key>` (V11 §3.4's non-alias families) that
T6 `place`'s stamp palette and the class cards read through V11's `icon` cells (V09 §2.3's `iconCell`; a family whose `icon` cell
is empty shows its label alone); generic glyphs (close, undo, search, chevrons) come from one permissively licensed icon set
imported through one adapter file and credited in the notices (§17.4; J-V9.12). Motion: panels slide in 150 ms ease-out,
the ghost fades in over 80 ms; the reduced-motion preference (§14) removes both. Dark theme follows the system by
default (`AppPrefs.theme`); the map's style is independent of the chrome's theme (the `night` sheet is a map style, not a
chrome setting).
=== END ===

=== REPLACE ### 5.4 The thematic views — Show: prosperity, shade, supply links and the rest ===
### 5.4 The thematic views — Show: prosperity, shade, supply links and the rest

The view bar's **Show** menu sets the per-viewer view key `thematic`: **None**; **Wealth** (§8.2's thematic row keyed by
`prosperity`); **Shade** (below); **Supply links** (below); **Quarters** (the identity tint, item 72); **Uses** (the
use-keyed row, knowledge-filtered, §8.2); **Who knows** (tints places by `knownTo`: public, local, secret — shown only
to a `secret` view); **Coverage** (for a selected class, each district or catchment tinted by whether it holds a member —
"one in every district" gaps shown, from V01's `catchmentOf` over the class's `CoverageSpec`; `live.coverage`, overlay);
**Voids** (the footprints of the underground's systems projected on the ground, each named with the districts above it,
V01's `districtsAbove`; `live.voids`, overlay; knowledge-filtered, a sealed void only under `showUnexcavated`);
**SettlementForge's chains** (V08 §5.2's `supplyChains` view: each chain drawn, labelled and listed by V08 §5.2's
`CustomChainRecord` row; offered only while that row lists a chain in the gazetteer, which the shell reads by
`query({ kind: 'gazetteer', kinds: ['customChain'] })` at the view's effective key after each load and each commit — while
none is listed the entry is hidden and a stored `supplyChains` value draws nothing and reads as None; its drawing cost is
V08 §6's; J-V9.105). One
thematic view at a time; the legend for it sits in the map's lower left, listing only the values drawn (§8.2).

**Shade** (item 102 (f)) is a new `base` live-layer provider, `live.shade` (file f item 411): it reads the daylight-share raster
(V09 §2.7) and draws each field cell as a translucent veil over the ground and blocks — six steps of the style's ink at α
0 / 0.08 / 0.16 / 0.24 / 0.32 / 0.40 for shade shares 0–10 / 10–25 / 25–40 / 40–55 / 55–70 / 70–100 % of the day (our own
steps) — under the buildings' fills, so streets and yards read darker where they lie long in shade; the veil is this
volume's alone. Over it the view draws V05's rows as V05 states them (V05 §5.1; J-V9.53): each island's held strip
(`sky.island.shadeStrip`) as one solid ink line round the cells it shades for at least three of the nine sun samples,
labelled with the island's name, and, while an island has moved since its shade was last brought up to date,
`sky.island.shadePending` as a dashed line — so the veil's steps say how much of the day, the solid line whose shadow it
is, and the dashed line where it will move. The legend reads "Shade through the day" with the six steps, then "Under
{island}'s shadow for a third of the day or more" (solid) and "Where {island}'s shadow will move" (dashed), with **Update
shade now** (V05's `regenerate { kind: 'shade', island }`) beside a pending island's entry. Hovering reads "In shade {p} % of the day" in the readout, and
the "Why here?" card of anything in a shaded cell includes the shade row (V09 §5.8). The provider is a `base` target, so
it is part of the tile key (§8.8) and redraws only when the field or the view changes; it never changes the field.

**Supply links** (item 105 (j)) is a new `overlay` live-layer provider, `live.links` (file f item 411), fed by `query({ kind:
'links', region })` (V09 §2.7): each link a quadratic curve from provider to consumer (its control point offset
perpendicular to the chord by 15 % of its length, always to the left of the provider → consumer direction), 1–4 px wide by
the good's volume, coloured by the good's family from the thematic palette in key order and dashed in that family's own
pattern (five patterns), with a small arrowhead at 60 % of its length — hollow where the satisfaction is below 1 (beyond
the comfortable distance, item 107 (b)); a pin dot at the consumer end of a kept link; an impaired or at-risk
SettlementForge chain's links at half width, and an entrepôt's end marked with a small square (item 105 (i)). Dashing
carries the goods family only (V09-ICONF-4). With nothing selected, at the city band, the 150 highest-volume links in view are drawn
at 50 % opacity; at the district band and finer, every link in view up to 400 (the busiest first; the legend says "the 400
busiest of {n}"). With a use selected, only its links and its partners' are drawn, at full opacity. The legend lists the
goods drawn. A link whose end the key withholds is drawn to the plot without a name; a concealed use's links are not
drawn (the query filters them, §11.2). The links come from the generation worker's link cache (V09 §3.15).

**Show the whole circuit** (item 106 (g); J-V9.54) is an option of the wall layer, `LayerSpec.showCircuit` (file f item 413),
toggled in the layer toggles and in T3 `wall`'s options: while it is on, S14 draws every committed enceinte's barrier arcs — the
stretches a cliff, gorge, marsh or shore closes — as a faint dashed line along the barrier with a small tick at each
anchor, so the enclosure reads whole after commit, not only in the wall tool's ghost. It serves the town and the village
products alike (V07 §5's palisade relies on it).

**The cue column** (item 112 (a)): each colour-coded meaning of this volume's views, and its second cue — one channel per
cue, drawn at the legend-bearing stops and named in the legend. The style families' own rows (Wealth, Quarters, Uses and
the base's tints) carry §8.2's cues.

| view | colour carries | second cue |
|---|---|---|
| Shade | the share of the day in shade (the veil's six steps) | the veil's steps are lightness, not hue; the readout's words; an island's strip solid, a pending one dashed |
| Supply links | the goods family | the family's dash pattern (five); a satisfaction below 1 by a hollow arrowhead; an impaired chain by half width; an entrepôt by a square |
| Who knows | public, local, secret | hatching: none · diagonal · cross-hatch, and the legend's words |
| Coverage | a district or catchment holding a member, or not | a gap outlined dashed and labelled "none here" |
| Voids | each system's projected footprint | its outline and its name label with the districts above |
| the wall states (V09 §4.21.4) | §8.2's state rows | a break with rubble, a patch's own line style, worn ticks, trace discs |
| the tier chips, the refusal and bend marks (V09 §5.1) | tier, tone | their words and rules |
=== END ===

=== REPLACE ### 5.5 The fates sheet — confirming what moves ===
### 5.5 The fates sheet — confirming what moves

An action that returns `confirm` (§11.2) — a Re-derive, an Adjust of an early parameter, a regeneration over protected
things, discard-edits-in-scope, a town-wide New names, a pack change — opens the **fates sheet** (a sheet over the map,
never a blocking modal: the map stays pannable and every listed row can be shown). Its head: the action in words and
the counts per fate in plain words ("12 stay as you made them · 3 move with their new surroundings · 1 loses what it was
attached to"). Its body: the rows grouped by fate (`fates` paged by `query({ kind: 'fates' })` beyond 1 000, virtualised),
each with the thing's name, its kind and **Show**; then the renames, old and new text side by side; then **What else
changes** — the preview's effects (file f item 465) grouped by kind, each row its `effect.*` sentence with **Show**, paged with the
fates, and a suppressing removal's `info.remove.holds` line at the head of the section (V09 §4.20.7). Its foot: **Do it**
(sends `confirm(h, token, fates, renames)`) and **Cancel** (`cancel(h, token)`); an auto restore point is written before a
whole-town action (V09 §2.8). A stale token re-opens the sheet with the fresh list and "Something changed while you were
deciding" (V09 §3.14). All renames are confirmed as a set (J-V9.8); a user who wants an old name back renames it afterwards.
A T1 `intend` Re-derive reaches this sheet only after its whole-town ghost has been accepted (V09 §3.3), never before a picture.
=== END ===

=== REPLACE ### 5.6 The history panel and the timeline ===
### 5.6 The history panel and the timeline

The history panel (V09 §4.10) opens in the context panel's place (H, or the clock icon in the top bar): the restore-point
chips across its head, the filter chips, in host mode the host's group "The party" at the head of the rows (V09 §4.10), the day-grouped rows, the orphans section at the end, and, with epochs, the "Chronicle" tab. V06's timeline bar
docks above the view bar when the town has history (V06 §5.1): its thumb and the
history panel scroll together — scrubbing to a week scrolls the panel to that week's rows — and while the thumb is off
"now" the editing tools are disabled with V06's "viewing the past" band (`info.past.viewing`, "Year {year} — viewing
the past", V06 §5.1's words), and every disabled tool offers **Open a copy from here**: pressed, it shows the band's row
with that button, a `forkAt` at the seq of the frame on screen (V06 §5.1; V09 §3.9; in host mode by
`HostSlots.newDocuments`); on a rebased document the bar greys the range
before the rebase point with its banner (V06 §3.15.5). **V06's time card** sits in T1 `intend`'s sheet (V06 §4.1): its shape chip,
span, cadence, threat and era row and hazards chip are `toolkit.json` params of T1's time-card mode; its end-state preview
is drawn by V09 §3.3's machinery as the whole-town ghost of the last epoch against the present, with the count badge's
V06 extras — households and buildings gained or lost, the walled share, the raised ways built by kind — and the bend line
when V06 §3.3.2 bends the cadence; the preview's background run shows the progress view (V09 §4.21.9) with **Stop**, and
Accept appends the chosen variation's epochs as one group. On a dossier-bound document §11.2 refuses `advance` (the host's
clock owns its time, V06 §2.3): the card's **Advance** shows `refuse.dossierClock` in the card's place, with **Make a
what-if copy and advance it** — a detached `forkAt` at the head (V06 §4.4), the copy opened with its time card; in host
mode by `HostSlots.newDocuments` (V09 §3.9).
=== END ===

=== REPLACE ### 5.7 The other panels ===
### 5.7 The other panels

* **Report** (§5.4, the "i" button in the top bar, and a dot on it when something was delivered simplified or left out):
  "What you asked for" — each requested feature with "made in full", "made simpler" or "left out" and its cause in words;
  "Couldn't place" — `unplaced` and `unserved` with Show; for a dossier-bound town, the placement state
  (`GenerationReport.dossier`, each entry by its `report.dossier.<state>` row with Show) and, under `host.group.standing`
  ("How the map reads SettlementForge's record"), the standing notes (`GenerationReport.dossierNotes`, V08 §4.6),
  each line as V09 §4.10's note lines — its `msg` by the catalogue, **Show** on its `keys`' addresses (file f item 583), a line
  with a withheld target not drawn; "What moved" — the `changes` entries newest first, each by its
  `report.moved.<kind>` row (V09 §4.9) — in both lists each `{ id }` argument rendered under `effectiveKey()` as V09 §4.10's
  report-entry lines render theirs, a withheld one as its kind word and never a **Show** target; "What its past left" —
  the `report.history.<line>` rows of a town with a past (V09 §4.21.3), each with Show; "Details" (collapsed) — the ladder
  uses with their replay keys, the kernel warnings, the stage timings (telemetry).
* **Gazetteer and "features in view"** (§14, §11.2): a search field and kind chips (districts, quarters, streets,
  buildings, institutions, people, water); rows with name, kind, district and a tier chip; selecting a row selects on the
  map and the reverse; withheld places show as "an unnamed {kind}" (§11.2 *Knowledge*); a collective record shows its
  member count (V09 §4.7); the people chip opens the People panel (V09 §4.18).
* **Notes** (the panel menu): favourites, the user's private notes, the public notes and the pins (V09 §4.19), each row with
  Show; "Add a pin"; a pin's label, note and colour edited in place.
* **Names** (T11 `name`'s panel): the town's names by kind with rename in place, "New names" with its scope, the packs and a
  user's own name list (§10.4), the region groups, the leader-line switch (§9.4).
* **Dress** (T12 `dress`'s panel): style cards (a 120 px render of the current view in each style, drawn by the tile worker at
  the city band), the tint toggle, the furniture tray (each a toggle; dragging an item on the map places it; view state,
  §9.5), light, ground texture, lights, underlay; the grid, legend, emblem and compass controls (V09 §4.19); the building look chips, V02's `FM` building-scope look among them (V02 §5.3; item 376); **New trees** and **New
  decoration** (V09 §4.5's T12 row); for the viewer
  role the style cards write the viewer's own `stylePreset`, never the town's style; **Edit this style…** opens the style
  dialog (§8.2's sheet rows by role, a colour picker per role with the contrast matrix's warning when a pair falls below its
  bar).
* **Advanced, tables, presets** — V09 §4.14.
* **Close-up** (V01's panel for an opened district) and **plan** (V03's plan panel, the storey switcher beside the
  building) render inside the context panel's district and building tabs.
=== END ===

=== REPLACE ### 5.9 Onboarding and help ===
### 5.9 Onboarding and help

* **First-use hints** — V09 §5.3; the order of appearance: T1 `intend`'s on the empty state's card, T5 `quarter`, T6 `place` and T12 `dress`'s the first time
  each is picked, the others likewise, `hint.variations` on the first tray, `hint.restore` the first time the history
  panel opens, `hint.links` and `hint.shade` on the first use of those views, `hint.clerk` in the drawer's empty state,
  `hint.raised` the first time T4 `road`'s Raised is turned on, `hint.below` the first time a click lands on a stack of more
  than one mark (V09 §4.20.8) and `hint.oasis` the first time T2 `ground`'s Lake mode is picked on an arid site (V09 §4.21.1).
* **The guided first town** — offered once, on the empty state's second visit or from Help ("Show me around"), never forced
  and never re-offered once dismissed (`AppPrefs.tourOffered`): six steps of about 30 s each, each waiting for the user's
  own gesture — (1) click a building ("Every thing has a card"), (2) pick T5, drop one seed ("Paint a district"), (3) press +
  on the badge and Accept, (4) T6: drop a tavern near a gate, (5) T10 `hold`: Try again on a block and pick a version ("What you
  made stays"), (6) T12: pick a style and add a compass. Each step's hint completes that tool's first-use hint.
* **Context help** (§14): every control's "?" opens its `@plat/docs` page in a side sheet; the keymap overlay (?) lists the
  current bindings, the user's overrides marked.
* **How do I …?** — Help's entry for asking the assistant, shown only when a clerk is configured and on: it opens
  the drawer on V10's `help` entry (V09 §4.11). Without a clerk, Help keeps its context help and the guided first town.
=== END ===

=== REPLACE ### 5.12 Settings ===
### 5.12 Settings

Settings opens from the file menu's **Settings** in both modes — host mode keeps it (V09 §2.2's `fileMenu: false`)
— and at its Assistant section from the clerk's `openSettings` (V09 §4.11; V09 §3.14's clerk row).
Sections, each with Reset: **General** — units (metric · imperial), theme (system · light · dark), UI scale (100–200 %),
language — which locales ship follows SettlementForge (J121); English is the catalogue's source language, and in host
mode the frame's language is the host's, read from SettlementForge's setting on `doc.load` (V08 §5.5). **New towns** — the `generation` preferences folded into a
new document (§7.6): style, size, name packs, labels on; "Apply my current preferences to this town" (V09 §4.14). **Editing**
— snap radius (4–24 px), handles (fewer · default · more), "Show three more" page size (fixed at three; not a setting),
the §13.4 fallbacks when the tests switch them on (keep / change toggle on re-rolls; touch editing of the fabric).
**Assistant** — rendered from and written to `ClerkSettings` (V10 §2.2) through `ClerkHandle.settings` / `setSettings`,
the one store (J-V9.34), and not shown when the host's `clerkMode` is `off` or `host` (the card-only drawer has no
settings): on · off; the key — only where the configuration enables the built-in clerk with a user's key (V09 §2.10's *The AI
setup*; J121) — a masked field with **Remember on this device** and V10's warning that anything
running on this site can read a remembered key, and **Forget key**, with its last verdict (`keyState`) worded as on the key
card (V09 §4.11); **Keep history** (off by default: conversations stay
in memory); the monthly cap and the per-turn cap in US dollars; preview first (default) · apply then undo (V10 §4.4); the
data notice with the date it was accepted and **Read it again**; **Problems found** — the device's defect records
(`ClerkHandle.defects()`, V10 §2.8), one line each with its date and its kind in words (`clerk.defect.<kind>`), with **Save
as file** (JSON) and **Clear** (`clearDefects`), or `clerk.defects.none`; in host mode the fields the host forces are shown locked
with `host.locked` ("Set by {host}", read with `HostSlots.hostName`). **Accessibility**
— colour vision (V09 §4.21.2; the per-viewer key of the open town, remembered as the default for new views in
`AppPrefs.cvdDefault`), reduced motion (system · on · off), high-contrast chrome, large targets, the long press (300–1 000 ms), "announce previews" (the live
region, V09 §6.3, on by default). **Keyboard** — the keymap with rebinding (§14). **Storage** (standalone only: host mode has no local store, so V09 §2.2's
`fileMenu: false` drops the section; V09 §3.8 (6)) — the local towns with
their sizes and last-opened dates; **Delete** moves a town to **Recently deleted** (J-V9.51), where it stays 30 days with its
snapshot and journal, listed with its deletion date, **Restore** and **Delete now**; "Download all my towns" (a `.zip` of
`.plat` files); **History** — the history store's memory (default 256 MB on the desktop tier, 96 MB on the low-end tier)
and the frames kept in memory (default 8): per-device settings, outside the recipe, the log and every digest, which
change what is cached, never what is drawn (V06 §2.2's history store and frame cache read them).
**About** — the generator version, the output version and the schema version (§6.4), the notices of every bundled
library (§17.4), the fonts' licences (§17.2), and the sentence "Your towns stay on this computer unless you export or share
them."
=== END ===

=== REPLACE ### 5.14 Labels in the application ===
### 5.14 Labels in the application

Map labels are §9's; the application adds no label entity. T11 `name`'s inline editor opens over the label at the label's own
face, size and curve (the per-glyph positions S13b computed, §9.2) so the typed text is seen in place; Enter commits
`setAttr(name)` (or `displayText` for a dossier-owned name, §9.1), Esc cancels; a longer name re-flows by S13b after the
commit. **T11 on a raised way** edits that way's name: the click takes the top of the hit stack and a second click the way
beneath, so a viaduct and the street under it keep separate names (V09 §4.20.8); an aqueduct is named as any way is, by
§9's way names or by typing; the placement is §9's. Region groups are created by selecting quarters and **Name as region**; their labels draw at the city band above
the city cut (§9.1). The chrome's own text (buttons, panels, messages) is DOM text from the catalogue and never enters the
map's label engine.
=== END ===

=== REPLACE ### 5.15 Every new thing: drawn, labelled, exported, persisted ===
### 5.15 Every new thing: drawn, labelled, exported, persisted

| thing (V09 §) | drawn | labelled | exported | persisted |
|---|---|---|---|---|
| `siting.declared`, `siting.linkEdits` rows (2.6; V11's tables) | through their effects: the link view's pin dots and crossed stubs; nothing else of their own | in the why card's chips ("yours"), the per-kind panel and the Links tab | as the document's override layer in the `.plat` and the skeleton (V11 §4.2); GeoJSON carries `plat:links` (the use's declared link rows) on the use's building features | the log (`editTable` events) |
| link rows (2.7; derived) | `live.links` (5.4) | the legend by good; the Link card | GeoJSON: with "include supply links", one LineString per link in view scope, `kind: 'supplyLink'`, `good`, `consumer`, `provider`, `satisfaction`, `declared` | never (recomputed, item 105 (a)) |
| the shade raster (2.7; derived) | `live.shade` (5.4) | the legend; the readout | a picture export while Shade is on draws it (a base live layer in the tile key, §11.1's live layers named in the export's layer set) | never (the field's driver, recomputed on load) |
| a record's members (4.7; `EntityCard.members`) | outlines while a record is selected | the panel's list | the members are ordinary buildings in every export | the model (their buildings) |
| restore points (2.8) | chips in the history panel | their names | inside the `.plat`'s view section only | the document's view section |
| `showUnexcavated` (4.17.1) | V04's unexcavated style while on, at `secret` | the legend's "Not yet found by anyone in town" | a picture at `secret` with it on; never below `secret` | the view section, per viewer |
| the ways down's causes (4.17.3) | the access symbol by cause; "Show the way in" as `live.selection` | the panel's lines | GeoJSON's `cause` on every access and link (V04 §5.5) | the model (V04's records) |
| the catacomb, crypt and cemetery panels (4.17.5) | the extent chart; the ossuary fill by V04's program | the panels' sentences | GeoJSON's complex feature (V04 §5.5) | the model (V04's and V03's records) |
| `live.coverage`, `live.voids` (5.4) | overlay tints and outlines | the legend | a picture while the view is on | never (derived) |
| the Show menu's **SettlementForge's chains** (5.4) | V08 §5.2's `supplyChains` thematic row while `thematic` is `supplyChains` | the legend and the gazetteer by V08 §5.2's row | GeoJSON: V08 §5.2's `supplyChain` LineStrings, under its knowledge rule; a picture while the view is on | never, but the per-viewer view key `thematic` (the records are V08's, in the model) |
| `LayerSpec.showCircuit` (5.4) | barrier arcs dashed with anchor ticks | — | pictures draw it while on | the style's layer spec (`setLayer`, logged) |
| the People panel, the family tree, where-is pins (4.18) | panels; home and work outlines; a pin | the panels' rows | the people CSV (§11.1) | never (queries) |
| notes, pins, favourites (4.19) | pins as markers with their colour; notes in panels | a pin's label | public notes and pins inside the `.plat`'s view section; never in pictures unless "Show pins" is on in the Picture tab | the view section |
| Recently deleted (2.11) | the Storage section and the file menu's list | the town's title | "Restore", then any export | IndexedDB, 30 days |
| drafts, previews, variations (2.4) | the ghost, tray, badge | the badge | never | never (the draft mirror only, locally) |
| the message catalogue, `toolkit.json` (2.3, 2.9) | the chrome | — | `@plat/docs` generates the tools' and messages' guide pages from them — the messages page with one anchor per row, `messages#<key>` (the `page` a `why` carries for a row: V10 §3.5 step 3's default target), and one page per staged layer §7.3 item 9 (d)'s F-EDIT can name, `staged/<layerId>` (what the layer is and the milestone that ships it, from the base's staged table; `refuse.staged`'s `page`) | `@plat/tables` |
| preferences and the local store (2.11) | the settings screen | — | "Download all my towns" | IndexedDB |
| item 110's ghosts, handles and badges (4.20) | the ghost's marks of 5.3; the `rampEnd`, `terraceLevel` and `tierStep` handles | the badge's lines | never | never (session) |
| the effects list (4.20.7) | the badge's count; the fates sheet's "What else changes"; the clerk's card | the `effect.*` rows | never | never (per preview) |
| the hit stack and part selection (4.20.8) | the selection outline of the entry chosen | the context menu's "Select below: {name}" | never | never (session) |
| retaining walls, raised ways, spans, arch vaults, deck plots and tiers (the base's and volumes 2 and 4's records, as V09 §4.20 edits them) | §8 (the base's drawing: the low-side ticks and shadow, the raised part above ground part 0 with its shadow) | §9 (a raised way is labelled like any way; T11 `name`) | GeoJSON, SVG, PNG, VTT (a deck scene per raised way), glTF and CityJSON by file f item 447 | the model; their edits in the log |
| a removal's suppression (4.20.3) | nothing (the thing is gone); the history row's dashed former outline while hovered | the history row and `info.remove.holds` | the skeleton's removals (file f item 455) | the log (file f item 260's `detail.suppress`) |
| the second fixture's canvas script (7.2) | — | — | the test tree | the test tree |
| an oasis (4.21.1; §2.3's `WaterBody.spring`) | §8.2's water, grove and garden rows | §9.1's water label | every format as a water body with its grove and gardens (§11.1) | the model; its event in the log |
| `cvdVariant` (4.21.2) | the sheet's checked variant | the legend's swatches | a picture made while it is set | the view section, per viewer |
| the history lines and the symbolic chip (4.21.3) | the report panel; the chip | the `report.history.*` rows | the report's JSON in the full export | never (derived from §2.7's `HistoryRecord`) |
| a lost void's line (4.17.1) | V04's unexcavated style, at `secret` | `info.under.lost`, the legend's "Once known" | GeoJSON's `excavation: 'lost'` at `secret` (V04 §5.5) | never (V04's reading, derived) |
| the wall states and a run's material (4.21.4) | §8.2's state rows | the legend's `legend.wall.<state>`; the run's panel line | every format with condition and material (§11.1) | the model (§2.7's `Enceinte.condition`); repairs in the log |
| the grandeur line (4.21.5) | the badge line | `info.grand.*` | never | never (derived per preview and per why answer) |
| the zoom-out stop (4.21.6) | the zoom control's disabled state | `info.zoom.limit` | the export's whole-town frame | never (§8.8's limit, derived from `bounds`) |
| the season and the festival display (4.21.7, 4.21.8) | §8.2's season and decoration rows | `view.season.line`, `view.festival.line` | pictures draw and name them; battle maps record the season | the view section, per viewer |
| the progress strip (4.21.9) | the strip | `progress.*` | never | never (session) |
=== END ===

=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

All figures are for the reference machine and viewport of §12.1 and §12.5 (1 440 × 900 CSS px at device pixel ratio 2),
p95, PLAUSIBLE until measured at the milestones of V09 §8; the model-side costs they add up are §12.3–§12.7's, cited, never
restated as new laws. METROPOLIS takes the same scoped budgets within ± 20 % (§12.6's scope invariance) except where a row
below names its own METROPOLIS figure (T1 `intend`'s Re-derive and T12 `dress`'s re-raster follow whole-town laws); TOWN takes them or less.
**One-time waits and interaction** (item 119). A wait a user sits through once — a new town, a Re-derive, an open, an
absorb, an export, a migration — runs within §12's ten-second comfort level, §12's laws staying the targets; an advance
and a history replay take that comfort level as V06's part of item 119 applies it; each shows V09 §4.21.9's progress view
past `progress.showAfterMs`. Every budget of this section is an interaction budget, and item 119 relaxes none of them
(item 119 (d)).

### 6.1 The gesture-to-ghost latency budget

Four latencies, each measured by the shell's telemetry (`Draft.startedAt`, `PreviewState.requestedAt` / `receivedAt`, the
compose time) and never saved:

| latency | from → to | budget | provenance |
|---|---|---|---|
| **L-trace** | a pointer event → its raw trace, readout and handle drawn | ≤ 1 frame (16.7 ms), ≤ 4 ms of main-thread work in that frame | §12.5's pan budget |
| **L-snap** | a pointer move → the snap candidate lit | ≤ 2 frames (the query answers within one, §9.5) | §9.5, §8.9 |
| **L-ghost** | the pointer's settle (120 ms after it stops, §12.6) → the ghost composed on screen | the dry run's scope cost (§12.6) + 3 ms delivery (§12.6) + ≤ 16 ms compose | §12.6 |
| **L-commit** | release or Accept → the committed result visible | the edit's scope cost (§12.6) + the dirty tiles' first re-raster; < 100 ms for a scoped edit (§12.6's edit-to-redraw) | §12.6, §12.5 |

**Stop-to-ghost** (what a user feels: the hand stops, the ghost appears) = 120 ms + L-ghost. Per tool at CITY:

| tool (the dry run's scope, §12.6) | L-ghost | stop-to-ghost |
|---|---|---|
| T9 shape — one plot (≤ 5 ms model + ≤ 2 ms deltas) | ≤ 26 ms | ≤ 150 ms |
| T11 name — a label re-flow (S13b ≤ 2 ms per stop, §12.7) | ≤ 21 ms | ≤ 145 ms (a rename commits on Enter; no settle) |
| T6 place — a post-build placement (≤ 30 ms at CITY, one designation mutation ≤ 5 ms) | ≤ 56 ms | ≤ 180 ms |
| T5 quarter — a quarter of ≤ 450 buildings (≤ 30 ms scoped law + 3 ms deltas + S6's regrouping of the covered cells ≤ 10 ms) | ≤ 62 ms | ≤ 185 ms |
| T4 road — a coarse edit (≤ 60 ms at CITY) | ≤ 80 ms | ≤ 200 ms |
| T3 wall — S7's re-trace with its strips' F-REDERIVE (≤ 60 ms coarse + ≤ 30 ms strips) | ≤ 110 ms | ≤ 230 ms |
| T2 ground — a terrain stroke (≤ 3 ms + 1 µs per re-based entity + the field-brush law) | ≤ 60 ms | ≤ 180 ms |
| T8 fill — three variations of a quarter (three overlays run on three derivation-pool workers, ≈ one scope's cost; thumbnails ≤ 3 × 15 ms in the tile worker) | ≤ 70 ms (ghost); ≤ 120 ms (tray) | ≤ 190 ms (ghost); ≤ 240 ms (tray) |
| T7 roster — one solve of N lines (≤ 30 ms + 25 ms per line at CITY) | ≤ 30 + 25 N ms | 20 lines ≤ 650 ms (the "working" ring shows past 1 s, V09 §3.14) |
| T10 hold — a block's New random with variations | ≤ 40 ms | ≤ 160 ms |
| T12 dress — a style change (the view's re-raster, §12.5's settle) | ≤ 150 ms at CITY; ≤ 250 ms at METROPOLIS (§12.5's METROPOLIS settle) | — (at once on click) |
| T9 `shape` family strip — F feasible families, each a single-plot dry run (≤ 5 ms model + ≤ 2 ms deltas, §12.6) on the derivation pool's ≤ 4 workers, then F thumbnails at ≤ 15 ms each in the tile worker | ⌈F ÷ 4⌉ × 7 ms + F × 15 ms: ≤ 134 ms for F = 8 | the strip complete ≤ 150 ms after the building is selected (its thumbnails appear as they land) |
| T1 intend — in the empty state, a new town (§12.5's first-map law); after a declaration, a Re-derive's whole-town ghost (§12.3's model law from the named stage) | ≤ the model law + 16 ms compose, at every rung within §12's ten-second comfort level | the progress view past 1 s (V09 §4.21.9); the ghost at the law's figure (V09 §3.3) |
| T4 `road` with Raised or Aqueduct — a course of L km over built land (the course solver, the supports, the strip's re-plot, the vaults offered; V09 §4.20.2) | ≤ 60 ms + 60 ms per km at CITY; the same law at METROPOLIS, the working ring past 1 s | ≤ 180 ms + 60 ms per km; a course longer than `raised.previewOnReleaseKm` previews on release (V09 §3.14) |
| T3 `wall` Retaining wall (V09 §4.20.1) | as T3's row: ≤ 110 ms | ≤ 230 ms |
| T2 `ground` Terrace — the levelling of ≤ 60 plots and its edge walls (V09 §4.20.1) | ≤ 90 ms at CITY; ≤ 110 ms at METROPOLIS | ≤ 210 ms; else preview on release |
| Delete of a generated raised way — the detour's re-route, the freed land, the vaults (V09 §4.20.3) | ≤ 120 ms at CITY; ≤ 60 ms + 60 ms per km at METROPOLIS | ≤ 240 ms at CITY, the working ring past 1 s; nothing commits before Accept |
| T6 `place` on a deck plot (V09 §4.20.4) | as T6's row: ≤ 56 ms | ≤ 180 ms |
| T9 `shape` tiers — a stack's re-lay (V02 §6.5: ≤ 2 ms model) (V09 §4.20.5) | ≤ 26 ms (T9's row) | ≤ 150 ms |
| the hit stack (file f item 466; V09 §4.20.8) | ≤ 1 ms per click at every rung | — (no settle) |

While the hand moves, the previous ghost stays at α 0.25 (never a blank) and the raw trace follows at L-trace; a terrain
brush shows its footprint and a local hillshade of the stroke's kernel alone, computed on the main thread in ≤ 2 ms per frame
from the stroke's radius and amount (no model read), until the settle's preview replaces it. **Measurement:** the app
harness replays each tool's canvas script (V09 §7.2) 50 times at TOWN, CITY and METROPOLIS band tops on B-CITY-lite seeds
(M2a for T9 `shape` – T10 `hold`, M3a for T2 `ground` – T8 `fill`, M3b for T11 `name` – T12 `dress`) and fits p95 — with the item-110 canvas scripts, the second known-city
fixture's among them, at the CITY and METROPOLIS band tops (M3a); pass: each within its row + 10 %. **Pre-decided fallback:**
a tool that misses previews on release only (§12.6's fallback), fixed at the milestone for that tool and rung and
reported; if T5 `quarter` or T6 `place` still misses on release, its dry run gains §12.3's single-worker exemption from the pool queue
(it runs ahead of background verification) and is re-measured.

### 6.2 Boot, bundle and offline

* **The shell chunk** (the frame, rail, overlays, message catalogue, `toolkit.json`) ≤ 180 KB gzipped of JavaScript and
  CSS; every panel, dialog and non-PNG exporter is a lazy chunk ≤ 60 KB gzipped (the tables editor ≤ 120 KB); the worker
  bundles are `@plat/api`'s (§14): the generation worker's bundle ≤ 700 KB gzipped, the tile worker's ≤ 350 KB, the
  derivation pool's the generation worker's; the stamp tiles (§8.10) ≤ 1.5 MB in total, fetched after the first map.
  **Chrome interactive** — the frame drawn and accepting input — ≤ 300 ms after navigation from a warm cache on the
  reference machine; the first map then follows §12.5's law. **A cold first load** (nothing cached) on a 10 Mbit/s link
  with 50 ms latency: chrome interactive ≤ 1.5 s, the first TOWN map ≤ 3 s (the shell, the two worker bundles and the
  bundled fonts' first faces ≈ 1.4 MB at that rate, plus §12.5's law), the stamp tiles and the lazy chunks after it; the
  empty state shows a drawn placeholder of paper and a progress line while the workers load. These size caps and load
  times are our own and calibrate-later at M1 (V09 §8).
* **Offline** — the app is an installable web app: a service worker caches the shell, the worker bundles, the fonts and
  the stamp tiles (§8.10) at first load, so every later open, every tool and every export works with no network; only
  the clerk (volume 10) and a host's publishing resolver need one (J-V9.11).
* **The page's `connect-src`** (V10 §3.17's connect rule). The standalone application's content security policy
  lists the page's own origin and, only in a build that ships the clerk's configuration A, the provider's API origin;
  nothing else is reachable. A build without A lists no model origin, and the drawer then shows V10 §3.17's unavailable
  reason. The embed's policy is V08 §3.1's.

### 6.3 Panels, dialogs and the assistive route

* Any panel or dialog shows its content ≤ 100 ms after the click; every interaction's next paint ≤ 200 ms
  at the 75th percentile across the scripted tasks (the "good" bar for interaction-to-next-paint).
* The gazetteer's results ≤ 100 ms after the typing pauses (150 ms debounce not counted); a `query` page ≤ 64 KB (§11.2).
* The fates sheet's first page ≤ 150 ms after the `confirm` result; the history panel opens ≤ 150 ms with 10 000 rows
  (virtualised; rows rendered on scroll ≤ 4 ms per frame). A dossier group's lines (V09 §4.10) are built when the
  group first opens: its report entries from the already-held `report(h)`, one `entity` query per distinct address its
  report-entry lines name and one per distinct note key
  (file f item 583), batched and cached per effective key — ≤ 50 ms for a group of 100 notes on the reference machine; a closed
  group builds nothing.
* A why card ≤ 100 ms after the click: the `why` query ≤ 50 ms at CITY (a read over provenance and the derivation record,
  and a re-score of ≤ 3 alternatives at §12.6's placement bound), rendering ≤ 30 ms.
* **The progress strip** (V09 §4.21.9) shows within one frame of `progress.showAfterMs` passing and names each stage
  within one frame of its notice, ≤ 2 ms of main-thread work per frame; the stages' outputs fill in at the tile worker's
  own budget (§12.5), never delaying a pan, a zoom or a preview.
* **The view switches** — Colour vision, the season slider and chips, the festival switch and a preview — answer at
  L-trace and re-skin the cached tiles within §12.5's re-skin budget (items 112, 117 (i), 118); none regenerates. The
  zoom-out limit only removes stops (§12.5: fewer, never more; item 116).
* The accessibility live region announces a preview's summary once per settle ("Preview: 42 plots, 180 households, 38
  buildings; 2 of your changes move"), never more often than once per 500 ms.

### 6.4 The file-g views

* **Shade** (`live.shade`) — marks for the visible cells ≤ 8 ms per tile set at CITY. **The on-demand sampler's cost law**
  (used only when the field skipped it): C = 9 sun positions × the field's cells in the frame (§4.5's 32 m cells) × the
  march steps per ray (≤ 20: the tallest caster's height over the lowest sun's tangent, in cells), each step one caster
  lookup; at METROPOLIS's frame (≈ 62 500 cells) ≈ 11 M steps, ≈ 60–120 ms in the generation worker, once per document
  state, cached and invalidated by any event that changes a caster (terrain, walls, towers; buildings only across epochs,
  item 102 (b)); islands are never sampled here (V05's held strips). **Fallback:** when the estimate passes 250 ms the
  sampler runs on the view's window only at twice the field cell (a quarter of the cells), for the view only, and the
  legend says "Shade shown roughly at this zoom".
* **Supply links** (`live.links`, the link cache of V09 §3.15) — the full bind once per `logHead`: one nearest-provider
  lookup per (consumer, good) through the solver's provider index, ≈ 2 µs each; at METROPOLIS (≈ 6 000 uses, ≈ 3 goods
  each, V06 §6.1's sizes; 35 000 buildings) ≤ 120 ms in the generation worker, in the background after the first map;
  an edit's incremental re-bind ≤ 5 ms per scoped edit; the `links` query ≤ 5 ms per page and ≤ 20 ms for ≤ 400 links in
  view at CITY; marks ≤ 2 ms; the overlay composes without a re-raster (§8.2's `overlay` target). Measured at M3a, with the link view (AP3); the
  pre-decided fallback, if the full bind misses: bind lazily by view region, cache per region.

### 6.5 Autosave, storage and memory

* A journal entry ≤ 2 ms of main-thread work per phase (the call's structured clone; the IndexedDB writes are
  asynchronous) and never delays the next gesture; a compaction runs in the generation worker (`export(h, 'plat')` ≤ 250 ms
  at CITY, ≤ 900 ms at METROPOLIS's 8 MB document, measured at M2a and M3a) only when idle (V09 §3.8 (2)), so it never
  stalls a preview during active editing; a gesture that starts during one shows the working ring.
* **Go back to here** costs the sum of its targets' undo-record costs (§7.4, each O(its scope)); ≤ 1 s for 100 typical
  scoped edits at CITY, with the progress view past `progress.showAfterMs` (V09 §4.21.9).
* Storage per town: §2.9's document budget for the snapshot (CITY ≤ 3 MB) + the journal (≤ 50 entries, typically ≤ 200 KB)
  + a 256 px thumbnail; the store warns at 80 % of the browser's granted quota.
* Memory beyond §12.8's lines: the shell ≤ 60 MB (DOM, the overlay canvas, thumbnails, the history's virtualised window);
  three variation overlays ≤ 3 × the scope's undo-record size (§7.4: O(scope)); three thumbnails ≈ 0.9 MB at DPR 2.

### 6.6 Touch

Long press 500 ms; pinch and two-finger pan at §12.5's pan rates (≥ 60 fps reference, ≥ 30 fps on the low-end device of
§12.1); a handle drag under a finger meets L-trace. **Measurement:** the M2a and M3a first-five-minutes sessions' tablets
record the telemetry (with the participants' consent, kept on the session machine only).
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

Every bar runs in the app harness of §13.4 (Playwright on the reference machine of §12.1; Chromium, Firefox and WebKit
where the bar says "three engines") unless it names another bench. "Canvas script" is V09 §3.12's gesture list. Bars
T-V9-3, -4 and -29 to -31 are milestone exit criteria (V09 §8); the rest run on every pull request. They take over
§13.2's T101-1 – T101-9 on the canvas (§13.2's take-over row for the application): T101-1 and T101-2 by T-V9-12, T101-3
by T-V9-12, T-V9-13 and T-V9-71, T101-4 by T-V9-82, T101-5 by T-V9-13, T101-6 by T-V9-31 and T-V9-56, T101-7 by
T-V9-81, T101-8 by T-V9-6 and T101-9 by T-V9-5.

### 7.1 The bars

| id | what it checks | pass | milestone |
|---|---|---|---|
| T-V9-1 | the empty state (V09 §3.2): first run shows a finished town with the overlay line and three buttons, no form; the first declaration ends the empty state; from M3b, the proxies after idle | the first map within §12.5's law + 100 ms; Enter before any declaration replaces the town, after one makes a new document (two documents in the recent list); from M3b the six proxies within §7.8's budget | M1 (shell), M2a; M3b (proxies) |
| T-V9-2 | R1 — no dialog before a first ghost | for every tool mode's canvas script — T1 `intend` after a declaration among them — no element with `role="dialog"` or `alertdialog` opens between pointer-down and the first `live.ghost` delivery; T1's fates sheet opens only after Accept | M2a, M3a |
| T-V9-3 | the latency budget (V09 §6.1) | stop-to-ghost p95 per tool within its row + 10 % at TOWN, CITY and METROPOLIS band tops — the item-110 rows on their scripts at CITY and METROPOLIS — or the pre-decided fallback applied and reported | M2a (T9 `shape`, T10 `hold`), M3a (T2 `ground` – T8 `fill` and item 110's rows), M3b (T11 `name`, T12 `dress`) |
| T-V9-4 | L-trace and L-snap | ≤ 1 frame and ≤ 2 frames p95 over a 2 s scripted drag per tool; main thread ≤ 4 ms per frame | M2a, M3a |
| T-V9-5 | the count badge is true (takes T101-9 on the canvas) | the badge equals `PreviewResult.counts`; after Accept, the committed model's plots, households and buildings of the declared thing equal the badge exactly — a quarter, a fill and a roster among the declarations | M2a; the quarter, fill and roster at M3a |
| T-V9-6 | declared means held, as the user sees it (takes T101-8) | declare a quarter and a tavern, then Try again on a block inside the quarter (its fates list naming each declared thing held), **New trees** (T12 `dress`; `rerollLayer` of `render.instances`, town-wide) and **New decoration** (T12; `style.jitter` then `style.crowns`, one group, one undo step): every declared entity keeps its leaf digest, and New decoration changes no model digest; the tray shows the declared-things line; Try again's chip row offers no layer chip | M2a; the New trees and New decoration steps at M3b (with T12, AP4) |
| T-V9-7 | variations | for each source (fill, a density, greenery and prosperity brush, a quarter's fabric, a scoped New random): three thumbnails of distinct content digests; Accept commits V09 §3.6's group for that source; a replay of the log gives the accepted variation's model digest; "Show three more" gives three new distinct ones | M2a (New random), M3a (the rest) |
| T-V9-8 | snapping | on fixtures, a T3 `wall` end within 8 px of a cliff edge, a T4 `road` end near a junction and a T5 `quarter` corner near a street centre-line resolve to the snap target's point in the stored event; with Alt held they do not; the role label shows | M3a |
| T-V9-9 | the wall ghost and natural barriers (item 106 (g)) | on item 106 (h)'s river-loop and cliff-backed fixtures, the ghost's barrier arcs' total length equals the committed enceinte's barrier-closure length within 1 m, the badge's walled length the committed wall's within 1 m, and every anchor tower ghost becomes a committed tower | M3a |
| T-V9-10 | handles | every closed derived shape shows 4–8 handles by default and 8–16 with More (k by V09 §3.5's rules); each handle kind's drag emits V09 §3.5's event; a boundary handle drag's `drawBoundary` polygon differs from the resolved ring only between the moved handle's neighbours, and it changes only the plots along that run (the locality oracle, §7.3 item 7 (ii)); a lake shows no rim handle | M3a |
| T-V9-11 | the canvas is deterministic | one canvas script, each gesture replayed at its recorded view scale and centre, on the three engines, at 1 440 × 900 and 1 024 × 768, at DPR 1 and 2, yields one model digest | M3a |
| T-V9-12 | the tool binding is complete | a walker over the `EditEvent` union (the base and the volumes as revised) and §2.8's registry reads `toolkit.json`'s modes' `emits`, the `HandleSet` kinds' emits (V09 §3.5), the context panel's and the context menu's generated controls: every kind is emitted by one of them or is on V09 §4.3's host-only / API-only list — item 110's forms read by their discriminating fields (`drawWall.kind: 'retaining'`, `drawWay.raised`, `class: 'aqueduct'`, the `terrace` sugar, `setMassing { op: 'tiers' }`, the `spans/<n>/use`, `crossings/<wall>/form`, `clearanceCm` and `spanSpacingCm` paths); every entity kind's editable path has a control; a new kind without either fails CI; and each mode's `emits` lies within its tool's entry of T101-1's registry — §7.1's toolkit row as the requests amend it (T6 `place`'s one-line `roster` by file f item 570) plus the kinds a volume registers under that tool — so T101-2 holds on the canvas side as T-V10-1 holds it on the clerk's; and a T6 drop at a point emits `placeAt { plot: '', from: { points: [p] }, designation }`, byte-equal to V10 §4.1's `where.at` encoding of that point, while "this plot only" emits the plot under it (T101-3); a way's **Split here** and **Join these** are T9 `shape`'s (V09 §4.3), emitting `split { id, cut: [p] }` at the nearest centre-line point and `merge { ids }`, byte-equal with V10 §4.1's T9 way forms; T11 `name`'s **New names** in its three scopes and T12 `dress`'s **New emblem**, **New compass**, **New trees** and **New decoration** write V09 §4.5's bytes — the scoped forms `salt: 0` with `ids` in address order, the town-wide ones the concern's `DisplayList.salts` value + 1, New decoration's two as one group in registry order — which T-V10-4 compares with the clerk's encoders; and every rerollable concern of §6.1's registry (`naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem`) is written by a control, a concern no control writes failing CI | M2a on |
| T-V9-13 | refusals and bends are actionable (takes T101-5's refusal clause) | every refusal of a declaration by a dossier fact or a lock — `refuse.dossierOwned`, `refuse.dossierRemove`, `refuse.roster.dossier`, `refuse.locked`, `refuse.warp`, `refuse.water` — carries its reason and at least one closest alternative, as T101-5 states (a marked declaration of the dry run's `alternatives`, an unplaced dossier element, or the map-side alternative its row names); each F-EDIT reason, `ConflictAction` kind and bend of a fixture list — the bends of J-VI.4 among them, listed as bends (V02 §1b's massing set, `bend.raised.*`, `bend.aqueduct.*`, `bend.retaining.rim`, `bend.island.*`, `bend.hood.noClock`, `bend.wall.newStretch`, `bend.raised.newSpan`) — renders its catalogue row; every refusal row carries at least one button and every bend its pre-selected alternative where the row names one; each button yields a preview that is `ok` or a new bend; on a dossier-bound fixture a T6 `place` locus drop naming no element renders `refuse.roster.dossier` with the element picker and **Put it at {site}**, the picker's pick previews the line with its `element`, and Put it at {site} previews `ok` on the first candidate of V09 §4.5's `sites` query — the plot the clerk's `dossier` alternative names for the same locus; when none of the three candidates is free of hard fails, the card shows the element picker without **Put it at {site}**; on a T7 `roster` list on the same fixture, a line committed naming no element renders `refuse.roster.dossier` on its card with the picker and **Put it at {site}** by the same query (`near` and `district` from the line's locus, both omitted for a line with none), its plot equal to the clerk's `dossier` alternative for the same line (J-V10.93); the card's `{thing}` is the line's name, or the class's display label when the name is `''`, and its `{locus}` V09 §4.16 (6)'s wording (`in` and the settlement's name for a line with none), which (4) parses back to the same `Locus` for every named locus target of the fixture; for each word declaration of V09 §4.15 — T5 `quarter`'s seed, T4 `road`'s two points, T3 `wall`'s two ends — the point written is the named target's `EntityCard.anchor`, equal to volume 10's resolution of `{ at: target }` for the same words (V10 §3.6 rule 1), and the canvas's events are byte-equal to the clerk's encoding of the same words (T101-3); an `assign`, and a `rejectSite` whose re-placement no plot satisfies inside the hard rows, render `refuse.assignment.noSite` with the `moveTo` places marked, and **Put it at {site}** previews `ok` or a new bend on the first `moveTo` target; every `show` `arg`, `subject` and `page` template of a fixture row finds its argument in the dry run's `MsgRef` — the arguments the text does not show among them (`thing`, `building`, `crypt`, `layer`, `layerId`) — and every `commit` button of a fixture row, from each source and each event form it names, previews `ok` or a new bend with exactly the events V09 §4.9's forms state | M2a, M3a |
| T-V9-14 | no dead ends | 1 000 random gestures (a random tool mode, random points in the frame) on B-CITY-lite seeds: 0 end with neither a ghost nor a refusal card; 0 uncaught errors | M3a |
| T-V9-15 | the words | every code the engine can emit (the enums of §5.2, §11.2, §6.4's conditions, V08's port notes, V04's causes and `blockedBy`) has a catalogue row; every event kind of the base and the volumes has a history template, and each item-110 variant one by its discriminating field (V09 §4.10), `history.dossierFacts.creation` among them; every `ReportEntry.kind` (with `disruption`'s two forms and `works`'s three ops) has its `report.moved.<kind>` row and every `GenerationReport.dossier` state its `report.dossier.<state>` row, and F-EDIT's kept assignment case its `refuse.assignment.noSite` row; every key §7.1's dry-run outcome table names has its row, and every `bend.*` and `refuse.*` row names a producer that exists — an outcome row of §7.1 naming its key (a volume's bend under its last row, by the volume section the row cites), or a gate V09 §4.9's lead lists (E-07); every term `FieldDrivers.terms` can name has its `why.driver.<driver>` row, every registered `StageDecl` resolves to a `progress.stage.<group>` row (V09 §4.21.9; a tail stage to `below`, S15 to `people`) and every wait of V09 §4.21.9 (1), Go back to here among them, to its `progress.<wait>` row, and every `Enceinte.condition` value has its `legend.wall.<state>` row; every row ≤ 25 words, Flesch–Kincaid grade ≤ 8 by our own script, and free of "error", "invalid", "conflict", `E_…` patterns and ids; the same readability step runs over the rendered V10 refusal and critique templates and V11's `says` and `reason` sentences, and a failure is reported to that volume's table; every key of V09 §4.9's explanation families — `critique.K1`–`K18`, `refuse.clerk.*` (one per `RefusalCategory` value but `lock`, `rule` and `role`, the `key` row's three verdicts and `refuse.clerk.dossier.count` among them), `clerk.notice`, `clerk.alt.*` (one per alternative of V10 §3.16's rows and per harness button V10 §2.6's `label` comment names), `clerk.view.cleared`, `clerk.applied`, `info.raised.<outcome>` for the ten outcomes, `info.under.*` with `info.under.cause.<rule>` per `AccessCause.rule`, `info.catacomb.*` per `source.kind`, state, burial-face outcome and `blockedBy` value, `info.crypt.*`, `kind.<registry kind>` per withheld kind — and `why.section.<kind>` per registered section has a row in every shipped locale (the walker T-V10-29 shares); `clerk.alt.*` has one row per key V10 §5.4's list of the drawer's keys names (`clerk.alt.stale.retry` among them); `info.copy.condensed` has its row, its text V06 §3.15.5's line; **the buttons**: every row that offers a button carries its `buttons` list in `en.json` and no locale file carries `buttons`, `tone` or `codes`; every button's `key` is a `button.*` row, and every `button.*` row is named by some row's list; every `commit` names a source (a `ConflictAction` kind, `alternatives` with an `each` row, `unplaced`, or `event` with a form of V09 §4.9's event forms), every `tool` button a `ToolId` and a `ToolModeRow.id` of that tool in `toolkit.json`, every `app` button an `AppCommand` of V09 §4.9's list; every `refuse.*` row of V09 §4.9's table ends with `button.showWhy`; no `bend.*` row and no `refuse.*` row whose codes a dry run answers carries an `app` button; and each `ConflictAction` kind a `commit` carries has its `msg.key` equal to that button's `key` | M1 on |
| T-V9-16 | history and restore | a 300-edit scripted session: "Go back to here" at 5 random points gives the model digest of a replay of the log prefix to that point; "Undo going back" restores the head's digest; "Open a copy from here" gives a document whose digest equals the prefix's | M2a (go back), M6-E (copy, with V06's E6) |
| T-V9-17 | autosave and crash recovery | 50 trials of a 200-edit session killed at a random commit, each after the worker's commit and before the journal's `done` write: the reopened town's digest equals the last committed head in 50 of 50; 10 trials killed between a fates-sheet `confirm` and its `done` write recover the confirmed action; a corrupted journal entry stops recovery before it with `error.recoveryPartial`; a 100-epoch advance killed after its last epoch and before compaction, one killed mid-group and one stopped at epoch 40 and killed before compaction each reopen at the journalled head — the first and the third at their `logHeadAfter`, the second with the advance re-issued whole — no epoch lost and no recovery line shown | M2a; the advance clauses at M6-E (with V06's advance) |
| T-V9-18 | the draft mirror | a crash mid-quarter reopens with the offer; accepting restores the draft's points and params exactly | M3a |
| T-V9-19 | exports | every tab's every format writes a file on B-CITY-lite TOWN and CITY; the estimate within ± 30 % of the actual size; the model digest and log unchanged by any export; a `public` picture holds no withheld name in its text, `aria-label`s or metadata; the VTT file carries open windows, alpha-first colours, the grid first in the Foundry scene and, when asked, the `{cols}x{rows}` picture | M3b |
| T-V9-20 | share | each of §6.4's refusal conditions shows its `share.*` row and offers the file; an allowed town's link rebuilds the session's digest | M3a |
| T-V9-21 | accessibility | axe-core: 0 serious or critical on every screen, panel, sheet, drawer and overlay state; the four first-five-minutes tasks and §13.4's scripted tasks completed keyboard-only; each preview announced once per settle; no focus trap — Tab past the last handle reaches the context panel, shift+Tab before the first returns to the map, Esc drops handle focus; 200 % UI scale with no loss of content | M1 (shell), M2a, M3a, M3b |
| T-V9-22 | touch and small screens | on a coarse-pointer medium emulation every tool of V09 §4.12's list completes its canvas script with touch events; on narrow the withheld tools show `refuse.phone`; a long press opens the context menu; a second finger places freely | M3a |
| T-V9-23 | the shade view | on item 102 (g)'s island fixture ≥ 90 % of the island strip's cells draw in the two darkest steps; toggling the view changes no model digest; the legend lists only the steps drawn | M3b |
| T-V9-24 | links and link edits | a fixture with one bakery and two mills: Keep → a `siting.linkEdits` row `{ bindTo }` and the `links` query binds the kept mill; Cut → `{ avoid }` and the other mill serves; Stop buying → `{ cut: true }` and no link; Reset deletes the row and the nearest serves; each undo exact; the why card's links list the link; at `public` a concealed use's links are absent | M3a |
| T-V9-25 | siting overrides | the tannery kind's `nuisance` set to Ignore in its per-kind panel: a `siting.declared` row with `familyWeights.nuisance = 0` under the kind's key; the next placement's why card shows no nuisance bar; placed tanneries stay and are listed with the score they would gain (V11 §4.3); "Show better sites" lists ≤ 3; a relocation accepted and undone restores the digest | M3a |
| T-V9-26 | records | on B-DOSSIER-lite's fixtures, selecting a COUNT or GUILD record outlines exactly its `EntityCard.members` and the panel's count equals the model's | M3a |
| T-V9-27 | the clerk drawer | with a scripted test clerk (a `ClerkHandle` that emits fixed `TurnView`s): no proposal commits without Accept, or without apply-then-undo switched on; an accepted proposal carries `proposedBy: 'clerk'` and author `user`; every `ReplyBlock` kind renders and every `ClerkAction` kind runs its action; each turn shows its cost and the month's tally; the first opening shows the label, the notice and the key in that order; "Undo the assistant's last change" undoes exactly that group; a viewer sees no proposal; `AppPrefs` holds no clerk field; New topic closes the live segment (the next turn opens a new one); the key card shows each `setKey` verdict (`ok` closes it, `invalid`, `noCredit` and `noAccess` their sentence, `unchecked` its note); the settings list the defect records with Save as file and Clear; each `ClerkAction` kind is dispatched by V10 §2.6's table — the seven the application runs by the shell, `propose`, `undo` and `rebuild` through `run`; a `why` opens the card or page the canvas's **Show me why** opens for that row; every `action` button shows its `label`, a labelled `select` its label and an unlabelled one its ids' chips; a stale card shows `refuse.stale` with **Ask again**, a host's stale card without it; an applied card shows `clerk.applied`, a key change `clerk.view.cleared`, and a viewer's declaration `refuse.viewer`; a proposal card's effect lines carry **Show** only (V09 §4.11), and on a `source: 'host'` card the bends carry no actions and the card offers Accept, Drop and Why only (V10 §2.6); for every bend and refusal row of T-V9-13's fixture the drawer's card and the canvas's card carry the same buttons in the same order, both read from the row's `buttons` (`commit` → `propose` with the canvas's bytes, `why` → `why` opening the same card or page, `show` → `select` of the same ids, `tool` → `useTool` with the same `mode` and, for `subject`, the same ids, `drop` → **Drop**), with no `app` button on either; a `useTool` with a `mode` opens that tool in that mode on the mode's working layer with its `ids` selected (**Add a way down** opens T6 `place`'s `access` mode on Below); and a `fork` block, and a `rerun` block, whose seq lies below a rebased document's `base.seq` make a copy whose `forkedFrom.seq` is the earliest seq, its opening toast ending with `info.copy.condensed` (saved, in host mode, with `info.copy.saved` first) | M3a (scripted), M3c (V10's harness) |
| T-V9-28 | host mode is the same shell | `embed.html` with V08's `HostSlots` renders every screen of the standalone app except V08 §5.1's list (a DOM-structure diff against an allowlist); the allowlist also names the history panel's group "The party" — drawn from `HostSlots.historyLines` at the head of the All and SettlementForge filters only, newest first, **Show** only on a line with targets, no **Undo this** — and re-listed with the new key on a View as change: a spy on `list` sees every call carry `effectiveKey()`, and a line revealing one `local` and one `public` place draws, under "What anyone knows", naming the `public` place alone with **Show** on it alone, and both again when View as is cleared, each state read once the provider's `onChange` has fired for the new key (V08's per-key cache, J-V8.109), the same on "See what the players see" set and cleared — and the host rule for new documents: with `newDocuments: 'download'` each of Open a copy from here and Re-run from here (on a row, a chronicle row and a restore point), the drawer's `fork` and `rerun` and Enter's Same kind, new seed saves one `.plat` to the device whose model digest equals the standalone app's for the same action, leaves the frame's document and log head unchanged, writes no local store or recent entry and toasts `info.copy.saved`; with `'off'` none of those controls is in the DOM; **Start a new map from this** is absent in both; the file menu holds exactly Export skeleton, Rebuild around my drawings, Settings and About, Settings has no Storage section, and ctrl / cmd+O and ctrl / cmd+S do nothing (V09 §2.2's `fileMenu: false`) | M-SF (with V08's SF6; AP5b) |
| T-V9-29 | the first-five-minutes test (V09 §7.3) | §13.4's pass rule at both M3a sessions; the M2a pipeline session recorded | M2a (pipeline), M3a (mid and exit) |
| T-V9-30 | the owner's UX sitting (V09 §7.4) | its pass rule, or its unrated rule applied | M2a (diagnostic), M3a, M3b |
| T-V9-31 | the known-city fixture authored through the canvas (V09 §7.2) | its bars (a)–(e), with item 110's rows on (its bridge fortress with its deck plots; the raised ways the city rules add listed in its report) | M3a |
| T-V9-32 | help coverage | every tool, mode, parameter and panel control has its `@plat/docs` anchor; every tool's guide page is generated from `toolkit.json`; every catalogue row whose **Show me why** resolves to a page by V10 §3.5 step 3's target rule — every `bend.*`, `info.*` and `error.*` row that offers it, and every `refuse.*` row with no admitted address argument — has its anchor `messages#<key>`, and every staged layer §7.3 item 9 (d)'s F-EDIT can name has its page `staged/<layerId>` | M3b |
| T-V9-33 | hidden caves and ruins (item 109 (j) (2)) | on a fixture with a sealed cavern and a sealed ruin: at `public` and `local` no sealed element is drawn, labelled, listed, answered by `why` (an unknown address) or present in any export, and the toggle is absent; at `secret` with the toggle on every element V04 records `unexcavated` draws in the unexcavated style, and with it off none does; "View as: what anyone knows" hides the toggle | M6-U (with V04's U3b) |
| T-V9-34 | the catacomb panels (item 109 (k)) | on B-CITY and a METROPOLIS fixture every catacomb panel's extent, state words, fill, rank, count sentence and source equal V04's `CatacombComplex` and V04's count; across a scripted 10-epoch sequence the extent chart never falls; every church's Below line equals its `Basement.crypt`, and every cathedral shows a crypt, the largest | M6-U |
| T-V9-35 | the catacomb bends (item 109 (k), R2) | each of the bends (a)–(d) and both crypt bends (e) of V09 §4.17.5 fires on a scripted gesture, shows its row with its offer and commits the stated events; a chamber drawn inside a church without a basement yields a crypt-only basement with the drawn ring, and its undo restores the document byte for byte; none is refused; no system chip entry and no panel ever presents a catacomb sourced at a church building | M6-U |
| T-V9-36 | ruins drawn and drawable (item 109 (g), (h)) | a chamber drawn with the system chip on a ruin commits `drawChamber { system: <the ruin> }` and draws in the ruin program; "New ruin" commits the closure creating the system; the legend shows "Ruins of an older town"; T10 `hold`'s "this system" re-makes only that system | M6-U |
| T-V9-37 | ways down and their causes (item 109 (j) (3), (3b)) | on fixtures holding one access of each `cause.rule`, each panel line equals its catalogue row for that cause and its symbol differs by cause; "Show the way in" highlights exactly the connection graph's path; every access edit of V09 §4.3 commits its event and undoes exactly | M6-U |
| T-V9-38 | dwellings only after a way in (item 109 (j) (4)) | 0 dwellings in an `unexcavated` cluster after every declaration of a 200-gesture script; every dwelling declaration on a sealed void either commits with its access in one group (dug, else an opening, else a shaft from the public ground over it) or is bent above ground by `bend.under.noAccess`, with its alternatives; on a fixture with three buildings qualifying by step 1, the dug-access bend lists the other two in `PreviewResult.alternatives`, **Use another building** re-previews `[addUndergroundAccess { building }, the declaration]` from each in step 1's order with the access reaching the cluster and no second access, and is not shown after the last; an opening's bend offers no building | M6-U |
| T-V9-39 | View as is a filter | with "View as: what anyone knows" on, compaction, ctrl / cmd+S and "Download all my towns" succeed, no withheld name reaches the DOM, a picture export defaults to `public`, and the `knowledge` key is unchanged | M3a |
| T-V9-40 | the assistant's screens (V10) | with V10's harness on cassettes: the import dialog lists every prefix outcome and every critique finding with Show and Fix, and "Check with the assistant" starts the `critique` route; "Ask the assistant" on a why card starts the `why` route with the answer attached; a creation proposal shows its scratch read-only under the banner, and Accept opens the new document beside the current one — from the untouched empty-state town it replaces that town, and Recent towns gains no entry for it (J-V9.127); the transcript exports as V10's JSON; a host `clerk.config` of `off` or `host` shows no Assistant button and no message box (a host's proposal then opens the card-only drawer, T-V9-64); **How do I …?** in the drawer's menu and in Help sends on the `help` entry and its answer's `useTool` button makes that tool active, and **Ask the assistant to place these** under T7 `roster`'s box sends the pasted text on the `roster` entry, neither shown with no clerk configured or with the clerk off; with **no clerk configured** (`ShellConfig.clerk` null) the import dialog still lists every finding, its **Fix** on a `propose` fix previews the events as a ghost with Accept and commits them as one group with no `proposedBy`, a `useTool` fix makes the tool active, and `ClerkHandle.run` is never called — the same with a clerk mounted; **Start a new map from this** in the drawer's menu (standalone) sends the next message with `attach.newMap: true`, its proposal previews as a creation proposal under the banner, and Accept opens the new document beside the current one, which stays unchanged; in host mode that item is absent, no turn enters creation mode, and the drawer's `fork` and `rerun` buttons follow `newDocuments` as T-V9-28 states; in host mode with `clerkMode: 'builtin'`, a scripted `key` refusal and a scripted `budget` refusal each show the card's `openSettings` button, which opens Settings at its Assistant section with the fields the host forces locked under `host.locked` ("Set by SettlementForge") | M3c (the host clauses on T-V9-64's scripted host page); M-SF (the host clauses again on V08's embed, AP5b) |
| T-V9-41 | V06's screens | "Re-run from here" gives V06's `rerunFrom` document and leaves the current one unchanged; `chronicle.csv` and `uses-history.csv` equal V06's writers' output; the animated history stays ≤ 100 MB by stride doubling; a skeleton with a `history` block reports it at import | M6-E (with V06's E6) |
| T-V9-42 | V02's handles | on a composed building each handle kind (range end and width, tower centre and radius, room extent) emits V02's event and each stepper and chip its event; the family strip shows one thumbnail per feasible family within V09 §6.1's row, and a tap commits `setMassing` | M6c (with V02) |
| T-V9-43 | shade strips and the circuit | the Shade view draws V05's strip and pending rows for every island with their legend entries; "Update shade now" clears the pending line; with "Show the whole circuit" on, every barrier arc of item 106 (h)'s fixtures draws after commit in the town and the village products | M3b; the staged layers' milestones |
| T-V9-44 | base edits reached (MFCG's asks, FTG) | a scripted count: each of §7.4's thirteen MFCG asks and FTG's drawn river, tree brush and land-use painting is reached in ≤ 3 actions from the rail or a panel, commits its event (castle `site` and `baileyArea`, `setAttrMany` of land use, way `split` and `merge`, a district-keyed thematic `setStyle`, an `instance` group, `rejectSite` lift, `placeAt` lift, `unassign`, `drawWater { kind, add: [], line, widthCm }`) and undoes exactly | M3a |
| T-V9-45 | view keys, notes, pins and the ruler | each control of V09 §4.19 writes its key, which survives save and reload and never enters a digest; the per-viewer keys never cross a bridge; §13.4's "measure a street with the ruler" passes; "Save as annotation" writes a pin | M3b |
| T-V9-46 | people and the family tree | the People panel's filters equal the `people` query's rows; the family tree matches §14's layout rules (generations in rows, elision beyond two, re-root) and is keyboard-operable; opening a person pins nothing; "Where is" draws the `whereIs` answer | M4b |
| T-V9-47 | METROPOLIS costs | the link cache's full bind ≤ 120 ms and a scoped re-bind ≤ 5 ms; a compaction never starts while a draft is pending; the shade sampler within its law or its fallback applied; T1 `intend`'s and T12 `dress`'s METROPOLIS rows of V09 §6.1 | M2a (compaction, AP2), M3a (links, AP3, where the link view is built), M3b (shade, AP4) |
| T-V9-48 | a clerk's alternatives | each variation of a scripted proposal is previewed by its own call and thumbnailed from that preview; the tray shows V10's labels; one ghost at a time | M3a (scripted) |
| T-V9-49 | nothing is lost by deleting | a deleted town is in Recently deleted with its snapshot and journal for 30 days, Restore reopens it at its last head, and the storage ladder never purges it without asking | M2a |
| T-V9-50 | the context menu | right-click, a long press, Shift+F10 and the Menu key open the same menu on every entity kind, generated from the registry, each item producing the panel control's event | M2a |
| T-V9-51 | item 110's tools (V09 §4.20.1–V09 §4.20.6) | each gesture — Retaining wall (both high sides, open and closed), Terrace and its level handle, Raised, Aqueduct, a deck stamp, a landmark slot, a span's use, a crossing's form, the deck height and arch spacing, the per-tier storey stepper — previews, commits file f item 362's or file f item 364's events in one group, and undoes byte for byte | M3a (tier count, step, stairs and top: T-V9-59) |
| T-V9-52 | raised ways on the canvas | 0 junctions between a raised part and every way it crosses; no crossed way split; both ends on ground vertices, an end released elsewhere bent to one; a raised road meeting a town wall comes down before it and passes its gate; an aqueduct passes a wall by an arch, never a gate; an aqueduct from a lower source is bent to the nearest higher source, else to a well at the terminal (J-VI.4 (h)); a raised stroke to an island's rim commits 0 ways and one sky access, and an aqueduct stroke to a rim ends at its last ground vertex outside the island (J-VI.4 (d)); a raised stroke across a hoist's column or rope line with no re-route ends at its last ground vertex before it, with `bend.raised.skyAccess` (J-VI.4 (f)) | M3a (the island case with the sky's milestone) |
| T-V9-53 | a suppression holds | a generated raised way removed on the canvas stays removed after Regenerate, a scoped New random over every district it crossed, a reload through crash recovery and ten epochs with V06's pass; "Undo this" brings it back with its ids; its card and row show `info.remove.holds`; the same holds for every kind file f item 260 suppresses on the fixture — a harbour-mouth chain, a quay wall, a generated retaining wall, a generated deck plot and a floating island; with a later edit making Undo this dependent, each removal row's **Build it again** and `ClerkMount.rebuildEvents(seq)` for the same group return byte-equal event lists (canonical CBOR), those of V09 §4.20.3 (4)'s row for the kind, and committing them re-creates the thing as declared | M3a; the epochs M6-E (with V06's E6); the island with volume 5's sky milestone |
| T-V9-54 | retaining walls and terraces | every way crossing one is a stair or a ramp in the ghost and in the committed model, the bend line naming the dry run's form; a wall drawn on flat ground bends by V09 §4.20.1 (3) (a) or (b), and 0 retaining walls stand on flat ground after any script; a terrace is one group and one undo step; a level-handle change leaves no wall of the old step | M3a |
| T-V9-55 | decks | a stamp on a deck lies inside its deck plot and within the budget's band; a refused class bends to the landward end; storeys above `maxFloors` bend; a tower or fort stamp on a mole's head, mid-mole or the mid-span of a bridge at least V11's `deck.landmarks/bridgeMid/minSpanM` long lands on the slot; a removed deck's buildings are listed among the effects; T4 `road`'s pier, quay and bridge ghosts show their deck plots | M3a |
| T-V9-56 | the second known-city fixture (V09 §7.2) | its bars (a)–(e) and its emulation variant | M3a |
| T-V9-57 | the no-op pin on the canvas | with V11 §3.24.0's item-110 switches off, fixture 1's canvas script yields the model digest it yielded before item 110 — a `NoOpPin` registration of the known-city canvas scripts (V09 §7.2) as a suite of V12 §2.13's `item110.raised`, `.terrace`, `.deck` and `.stepped` pins on V12 §3.7.8's engine, owner V09, written by the M3a seat; with only the raised-way rows on, every TOWN-rung canvas script is byte-identical | M3a |
| T-V9-58 | the hit stack (V09 §4.20.8) | on a viaduct over a street with a walled-up span: successive clicks select the deck, the span, the arch vault and the street, then the deck again; the context menu lists the others; a tap cycles the same; T11 `name`'s second click names the street; `hint.below` shows once; each answer ≤ 1 ms | M3a |
| T-V9-59 | tier controls (V09 §4.20.5) | on a stepped temple each control emits V02's event (the count, `insetCm` by the step handle snapped to 10 cm, the stairs, the top, the stair width, a tier's heights); each of V02 §1b's bends shows its V09 §4.9 row, the bent result pre-selected, with its alternative (J-VI.4 (i)), and each alternative's preview is `ok` or a bend; the shape, skirt and solid chips and the centre, radius and shrine-inset handles emit V02 §4.6 (1)'s `tiers` fields; undo exact | M6c (with V02) |
| T-V9-60 | effects (V09 §4.20.7) | on scripted fixtures — a viaduct's removal (`rerouted`, `removed` vaults with a drawn plan), an aqueduct's removal (`lost`), a deck's removal (`removed`), a terrace (`rebuilt`, `displaced`), a Re-derive to CITY (`added`) — every effect kind appears in the preview's `effects`, in the fates sheet's "What else changes" and on the clerk's card; the live region reads the first three; the list caps at §11.2's cap with `effectsMore`; the clerk's card draws each effect line with Show only | M3a |
| T-V9-61 | item 110 in the exports (file f item 447) | on the second fixture every retaining wall, raised way, span, arch vault and deck plot appears in each format as file f item 447 (a)–(d) state; the ground scene has 0 portals where a raised way crosses a street; each deck scene's grid aligns at 0 px per cell (O11 (g)); the 3-D file holds one deck mesh per raised way and one wall mesh per retaining wall | M3b |
| T-V9-62 | removals in the skeleton (file f item 455) | on the second fixture, one generated raised way removed, the skeleton exported and opened with the same seed: the way stays removed and the digest equals the document's; under another seed the import dialog shows *kept removed* or *nothing to remove*, never an error | M3a |
| T-V9-63 | Keep them as yours (V09 §4.20.3 (7)) | a CITY fixture with two generated raised ways re-derived at TOWN lists both among the effects; with the box checked both stand as declared ways and one undo restores the city; unchecked, none stands | M3a |
| T-V9-64 | the card-only drawer and the host channel | in host mode — at M3c on the application harness's scripted host page, a test-only page that loads the shell in host mode and fills `ClerkMount.host` and `HostSlots` over §11.3's bridge as a host would (the harness side T-V10-20 drives), and at M-SF on V08's `embed.html` with its host harness: before any `clerk.config` (mode `off`) and under `host` no Assistant button shows; a `preview { events, view: true, proposal }` opens the drawer with that card alone — the AI mark naming `hostName`, no message box, menu, settings or meter, no Ask again; Accept commits one group with `proposedBy: 'clerk'` and the host receives `clerk.proposal { status: 'accepted', seqs }`; Drop answers `dropped`; a newer proposal replaces the card and answers the older one `dropped`; a moved head answers `stale`; a viewer's `preview` is refused; the harness reads the transport only through `ClerkMount.host.config()`, a refresh arrives through `onConfig` after `needsToken()`, a transport off the allowlist is answered by `refused('origin')`; no token appears in any store, log or report | M3c (with V10's C5, on the scripted host page); M-SF (on V08's embed, AP5b) |
| T-V9-65 | why sections | on fixtures holding a catacomb under a churchyard, a cathedral with its crypt, a sealed deep cavern, a generated viaduct, a stepped temple and a building with a drawn plan: each why card draws every section of its `WhyAnswer` after the facts, in the providers' order, titled by `why.section.<kind>`, each row's `says` rendered, values in the chosen units, targets clickable; a withheld row reads the unknown-place line; the catacomb's panel, the church's crypt line, the void's sealed line and the raised way's panel reason render the same `MsgRef` as the card (compared row by row); a raised way's `decidedBy` row is not drawn twice | M3a (scripted rows); M6-U, M6c (live providers) |
| T-V9-66 | View as reaches every read | on T-V10-6's canary fixture (`local`, `secret`, concealed and unexcavated places named with unique canary strings): with View as "What anyone knows", no canary appears in the why card (a withheld target reads the unknown-place line), the source chips, the gazetteer, "features in view", the Link card, the record panel, the People panel, "Where is" or T6 `place`'s alternative sites, and a spy on the facade finds every band-less `query` the shell sends carrying `admitAs: 'public'`; with a host-set key form `{ tier: 'public', places: [one secret place] }` that place's name shows in each and no other canary does, the menu reads "What the players know" with its other entries disabled, the View as banner is not drawn and the export dialog defaults to the form; clearing View as re-asks every open answer at the role's key without a reload (`onEffectiveKey`); the knowledge key and the document formats are unchanged throughout; the fates sheet of an edit made meanwhile lists every fate at the role's key (J-V9.86) | M3a (tiers, and the form set by the test harness through `setViewOpts`); M-SF (the form through V08's embed, SF6; AP5b) |
| T-V9-67 | the three load outcomes (V09 §3.14 (a)–(c)) | with test builds labelled o(N), o(N−1) and o(N−3) (§6.4's fixture labels): **(a)** a document saved at N−1 opens editable under its own version, an edit commits there, the standalone app shows `info.upgrade.offer`, **See what changes** shows §7.5's diff in the fates sheet and **Do it** commits one `upgrade` (the output version then N), **Not now** commits nothing; **(b)** a document at N−3 with `model` opens as the frozen view under `error.frozen` with the CLI command, no other edit accepted (view and export only, §2.9 step 2) and **Edit it with this version** the one edit control, which returns `confirm` with the renames in the fates sheet and on **Do it** commits one `rebase` with reason `frozenImport`, after which an edit commits under N; the same document with one chunk's bytes altered shows `error.frozen.damaged` and no Edit control; one naming a pack the build lacks shows `error.frozen.pack` after the attempt with nothing committed; **(c)** a document at N−3 without `model` shows `error.frozen.noModel`, and **Open its recipe with this version** opens a new document under `error.linkVersion` whose model digest equals the same recipe and log opened as a link, the town on screen unchanged; **host mode** (the embed, owner frame): the N−1 document shows no upgrade strip and no upgrade control but V08 §4.2's header **Update the map engine**, the banner slot draws no frozen-view notice, (b)'s **Edit it with this version** commits its `rebase` through `doc.changed` followed by `doc.snapshot`, (c)'s button saves one `.plat` to the device with `newDocuments: 'download'` and is absent with `'off'`; an editor's frame shows `error.frozen` without the Edit control | M3a (the standalone clauses); M-SF (the host clauses, on V08's embed with SF6; AP5b) |
| T-V9-68 | SettlementForge's chains in the Show menu | on `town-cc-1` or its test-side variant with one active custom chain (T-V8-25's variants), and on a variant whose every chain is inactive: the Show menu lists **SettlementForge's chains** on the first and not on the second; choosing it writes the per-viewer key `thematic: 'supplyChains'` and draws V08 §5.2's lines with the chain's label in the legend; under a key that withholds one of the chain's nodes the entry is absent; switching the view on and off changes no model digest and adds no log entry; a GeoJSON export while it is on carries V08's `supplyChain` LineString | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-69 | the dossier groups and the standing notes | on `town-1`'s digest pairs through V08's embed (T-V8-14's pairs, an undated one among them): each committed absorb is one group headed `host.group.absorb` with `{n}` its ledger event's `changes` count and `{week}` its `absorbed` entry's week (`host.group.absorbUndated` on the undated pair); under it its dossier events in log order, each followed by one line per report entry of its `seq`, then one line per stored note of the ledger event with **Show** exactly where the note's `keys` bind an element (highlighting those addresses), then its epoch rows; the creation's prefix is headed "Made from SettlementForge's record" with its notes; on the variant whose absorb carries an epoch in which a removed raised way's reason fires again (V06's fixture for W60), that epoch row carries one `info.raised.suppressed` line with **Show** on the removed way's former outline; under View as "What anyone knows" a note line whose key binds a `local` or `secret` element is not drawn and returns when View as is cleared, and a report-entry line whose element is `secret` is drawn naming it by its `kind.<registry kind>` word with no **Show** on it — in the group and in the report panel's "What moved" alike — and names it again when View as is cleared; the group is listed under All and SettlementForge and absent under Mine and Assistant; the report panel lists `GenerationReport.dossier` by its `report.dossier.<state>` rows, then the standing notes under `host.group.standing`, one line per `GenerationReport.dossierNotes` entry; all of it the same in a second editor's frame and after a reload | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-70 | the roster reader's namespaces (J-V9.125) | T7 `roster`'s pasted lines and T6 `place`'s typed words, read by V09 §4.16 (3): on a TOWN fixture "a smithy", "an inn" and "a church" resolve to `smithy`, `inn` and `church`, never to a `v.` class; on a VILLAGE fixture they resolve to `v.smithy`, `v.inn` and `v.parish_church`; "a chandler" at VILLAGE resolves to `v.shop`; a town-and-city class that plays itself at VILLAGE ("a pawnshop") resolves to itself; T6's stamp palette lists exactly the same set at each rung | M3a (the village rungs' clauses with V07's V-M2 rows) |
| T-V9-71 | the oasis (V09 §4.21.1; item 111) | on an arid and a temperate fixture: T2 `ground`'s Lake with **Spring-fed** on previews the water, the grove and the gardens with `info.oasis.badge`, commits `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm, spring: true } }` byte-equal to V10's encoding of the same request (T101-3), and undoes the three in one step; the history row reads "Made an oasis at {place}"; the toggle is absent on Sky; a dossier `oasis_water` oasis shows the toggle locked, `info.oasis.dossier` on its why card and `refuse.dossierRemove` on Delete; a save, a reload, a Regenerate and an epoch keep a drawn oasis | M3a (M6-sky for the Sky clause) |
| T-V9-72 | colour vision, the second cues and the trial (V09 §4.21.2, V09 §7.6; item 112) | each **Colour vision** choice writes `cvdVariant` and the tiles and legend draw the sheet's checked variant; the key never crosses a bridge, never enters a digest and adds no log entry; `AppPrefs.cvdDefault` applies to a town with no value; every thematic view of V09 §5.4 at each variant passes T112-1's style check and each colour-coded meaning of V09 §5.4's cue column draws its second cue; a picture exported under a variant draws it and says so; the chrome's marks keep their words (axe-core's colour step and a greyscale capture of every screen); the trial's `TrialRecord` validates against its schema and its pass rule is computed as V09 §7.6 states | M3b (the view); the release gate (the trial, T112-2) |
| T-V9-73 | a town with a past (V09 §4.21.3, V09 §4.17.1; item 113) | T1 `intend`'s **History** "Once a city" on a VILLAGE fixture commits one `adjust` of the blueprint's `history` as a Re-derive from S0 with its whole-town ghost; the same recipe and history replay byte-identically on the three engines; the report panel's "What its past left" lists one line per `HistoryRecord` entry with Show; a symbolic peak's facts carry the "size not recorded" chip; a dossier history locks the chip with `info.history.fromRecord`; a void whose last open link is bricked reads `info.under.lost` at `secret` only, drawn in the unexcavated style, and loses the line when a way in reopens; the replay's wait shows the progress view and ends within item 119's comfort level as V06's part of the item applies it | M6-E (with V06's replay; the lost-void clauses with V04's U-ACCESS) |
| T-V9-74 | the wall's repair and states (V09 §4.21.4; item 114) | on a fixture with a breached, a worn, a patched and a dismantled run: Repair with a patch row makes the breached run `patched` with that material, robust makes it `standing`; the worn and patched runs offer robust only; the dismantled run bends with `bend.wall.newStretch`; Wear on a standing run makes it `worn`; "Back in use" on a ring with nothing to lift shows `info.wall.inUse`; each commits V06 §2.8's event and undoes exactly; the run's panel line and the legend's `legend.wall.<state>` entries equal the model; every state stays distinguishable in a greyscale capture at the bands §8.2 states; the VTT tab shows `export.vtt.walls` | M6-E (with V06 §3.7.7's condition ladder) |
| T-V9-75 | a hand design beyond the grandeur ceiling (V09 §4.21.5; item 115) | on THORP, HAMLET and VILLAGE fixtures: a T9 `shape` `U` plan, a court and a tower on a dwelling and a second manor by T6 `place` each commit as asked with `info.grand.beyondTier` on the badge, the card and the why card; the same edits at TOWN show no line; a dossier-named hall reads `info.grand.dossier`; a reshape back under the ceiling drops the line; the clerk's card for the same edit carries the line | M6 (with V02's ceiling rows; the VILLAGE clauses with V07's village rungs) |
| T-V9-76 | the zoom-out limit (V09 §4.21.6; item 116) | at every rung from THORP to the cap: the wheel, pinch, − key and zoom button settle at §8.8's limit and never beyond; the button is disabled there with `info.zoom.limit`; Fit the town frames the bounds (a village at V07 §5.2's township view); the first view is unchanged; a hand edit growing the bounds moves the limit; the export's whole-town frame equals the bounds | the milestone §16's row for item 116 names |
| T-V9-77 | the season control (V09 §4.21.7; item 117) | a campaign fixture opens on its dossier's week with **Follow SettlementForge** on; a slider move turns it off and turning it on restores the dossier's week; a standalone town opens at week 19 with no switch; the four chips set weeks 6, 19, 32, 45; the document's model digest is identical in all 52 weeks and no week change adds a log entry; a picture names its week; `snow` defaults on in a cold climate's snow weeks; the re-skin stays within §12.5's budget | the milestone §16's row for item 117 names |
| T-V9-78 | the festival list (V09 §4.21.8; item 118) | a dossier with two festivals lists both with their weeks; with the switch on, decorations show exactly in their windows' weeks; **Preview** shows one out of its window until the switch is touched; "No decorations" draws none; a previewed festival removed by an absorb falls back to `follow`; standalone, the four generic festivals are listed; the model digest is identical with decorations on and off; a picture names the festival | the milestone §16's row for item 118 names (V08's `traditions` read at M-SF) |
| T-V9-79 | the progress view (V09 §4.21.9; item 119) | for a generate, a Re-derive, an open from a file, an absorb, a 100-year advance, a history replay, a CITY PNG export and a migration at METROPOLIS's cap: a wait under 1 s shows no strip; a longer one shows it within one frame of 1 s, never an empty map region, naming each stage group in order and the wait's own line; a Go back to here of a few hundred edits at METROPOLIS shows the strip past 1 s with its `progress.undo` count; a stopped history-first generation shows `info.history.cancelled`, whose **Generate without its history** makes the town with `history.replay` false; pan and zoom keep §12.5's frame budget throughout; every one-time wait completes within §12's ten-second comfort level on the reference machine — an advance and the history replay as V06's part of item 119 applies it; every registered `StageDecl` resolves to a group row, a tail stage to `below` | M3b (the strip); M6-E (the advance and the replay) |
| T-V9-80 | the edge suite (V09 §3.16) | one scripted fixture per clause of V09 §3.16's table: each edge meets its stated outcome at its stated rung, with no uncaught error, no hang, no lost data and no whole-map retry | M3a, and at each later milestone for its rows |
| T-V9-81 | points in, shape out on the canvas (takes T101-7) | through the canvas script on §13.2's ridge fixture: T3 `wall`'s Draw wall from two points follows the ridge and closes when its ends meet; T5 `quarter`'s seed quarter never crosses a block and its boundary lies on street centre-lines, water, walls or ridges; T2 `ground`'s Lake at one point and a level has a shoreline equal to the terrain's contour at that level — each event the points form of V09 §4.5's mapper, byte-equal to the tool API's for the same points (T101-3) | M3a |
| T-V9-82 | a canvas-declared subset round trip (takes T101-4 on the canvas) | the documents of the known-city canvas scripts (V09 §7.2) and the declared subset of a scripted B-CITY-lite session, each exported by Export skeleton (V09 §3.12) and re-imported under its seed, reproduce the document's model digest — an author's removals kept (file f item 455) | M3a |

### 7.2 The known-city fixture, authored through the canvas

J78 and item 101 (e) make an ORIGINAL skeleton with the structure of the owner's reference city the acceptance fixture of
the toolkit, authored three ways that must agree (§13.2's T101 bars). This volume owns the "by hand" way. The fixture's
structure (our own names, nothing traced; `research/reference-maps/baldurs-gate/README.md` is study-only): a walled upper
town with a citadel on a bluff; a walled lower port sloping to a harbour with piers; unwalled outer sprawl along three
roads; a hill inside the extent; cliffs with a cliffside cemetery; a satellite quarter across the river; a fortress on a
bridge (with its deck plots, item 110 (d); V09 §4.20.4 (7)); two enceintes with nine gates; three region labels (upper, lower, outer);
about fourteen declared quarters (a temple quarter, a manor quarter, a harbour quarter, an enclave, a graveyard …); about
sixty named places with landmark leader lines; the two looks, ink and quarter-tinted. Its inputs live in
`plat/tests/fixtures/known-city/K1/` and its goldens under `plat/goldens/known/K1/` (J-V12.58).

**The canvas script** is written once from the fixture's written brief as gestures (T1 `intend`: the `citadel-and-port` form, CITY,
coast; T2 `ground`: the bluff, the hill and the cliffs by strokes, the river by source and mouth, the harbour by shore point and
size; T3 `wall`: two walls by points, nine gates; T4 `road`: the three roads, the bridge, the piers; T5 `quarter`: the quarters by seeds and
corners with their kinds and names; T7 `roster`: the sixty places as one pasted roster; T6 `place`: the ten landmarks that need an exact
plot by stamp, the fortress among them on the bridge's mid-span slot (V09 §4.20.4 (7)); T11 `name`: three region groups and the leader-line switch; T12 `dress`: the tint). Bars:

* (a) as T101-6 states it: the script's final model digest equals the skeleton file's, and the clerk's path — at M3a a
  scripted transcript of tool-API calls, from M3c V10's cassette — meets the fixture's structure list (J78 (e); J-V9.50);
* (b) it plays within 10 minutes on the reference machine, every gesture's stop-to-ghost within V09 §6.1's budgets;
* (c) every gesture's preview is `ok` or bent — 0 refusals — and the script needs ≤ 250 gestures;
* (d) both looks pass B-ZOOM's legibility floors (§13.4);
* (e) **the dedicated-user bar**: a person of the program who has not seen the script rebuilds the fixture by hand from its
  written brief in ≤ 90 minutes, and the fixture's structural checklist holds on the result (two enceintes, nine gates,
  three regions, every named place present and in its region, the bridge fortress, the cemetery on the cliff, the
  satellite across the river) — the owner's "a dedicated user can build it" measured.

**The emulation variant**: the same brief declared only through the L2 PROGRAMME layer (intent, bones, programme; no
fabric) — the checklist holds and the rules fill the rest.

**Fixture 1 with item 110's rows on.** Its brief keeps its bridge fortress, now on a deck with plots; at CITY the rules may
raise a way the site calls for, which the fixture's report lists with its reason; bars (a)–(e) and the checklist are re-run
and unchanged in kind. **The behaviour shift, recorded once** (item 110): with the raised-way rows on, a
CITY or METROPOLIS canvas script's digest may change, because the rules now raise ways there by themselves; with the
terrace, raised-way and deck-plot rows off, every canvas script is byte-identical to its pre-item-110 digest (T-V9-57). No
golden is re-recorded without naming this cause.

**The second fixture (item 110 (e); J114)** — beside the first, at M3a, authored both ways (the skeleton file, and by hand
through the canvas) with the same bars. This volume names no reference map, city or ward: the brief, the canvas script
and the skeleton are the program's own, under our own names, and live in the test tree at
`plat/tests/fixtures/known-city/K2/` (`brief.md`, `canvas.json`, `skeleton.plat`; J-V12.58), never under
`research/reference-maps/`.
* **The brief** (its structure is item 110 (e)'s; the names are ours): a port city on a headland with the sea on three
  sides; a landward curtain with towers, anchored on the sea at both ends, and a gate plaza; an enclosed harbour behind a
  mole, with a tower at mid-mole and a fort at the mole's head; a causeway from the mole to a rocky islet with a
  lighthouse; a second, open anchorage of jetties with small buildings on them; three or more terraced wards bounded by
  inner walls, with retaining walls along their terraces; ring streets round two precincts; a straight raised road
  crossing the streets below; a ravine of stepped housing; a stepped temple; an arena; six named wards with curved labels
  (Gate Ward, Upper Terrace, Middle Terrace, Lower Terrace, Ravine Ward, Harbour Ward).
* **The canvas script** (V09 §3.12's form): T1 `intend` (a coastal site, CITY); T2 `ground` (the hills, the ravine, the islet by water paint,
  the harbour basin by shore point and size; the terraces by Terrace strokes, V09 §4.20.1); T3 `wall` (the landward wall as an open
  chain anchored on the shore at both ends, item 106's barrier closure; the inner walls; the retaining walls by the
  Retaining wall mode); T4 `road` (the mole and the jetties as `pier` lines, the causeway, the ring streets, the raised road with
  Raised on); T5 `quarter` (the six wards by seeds and corners, the ravine quarter with volume 1's stepped fabric); T6 `place` (the mid-mole
  tower and the mouth fort on the mole's landmark slots, the lighthouse, the stepped temple by its class stamp — volume
  11's specialisation, V02 X17 — the arena, the precincts; the deck buildings are left to the rules); T11 `name` (the six
  labels); T12 `dress` (the tint). At M3a no tier control is needed (V09 §4.20.5 (2)).
* **Bars**, as the first fixture's: (a) as T101-6 — the script's final model digest equals the skeleton file's, and the
  clerk's path meets the structure list; (b) it plays within 10 minutes, every gesture within V09 §6.1's budgets; (c) every
  preview `ok` or bent, 0 refusals, ≤ 250 gestures; (d) both looks pass B-ZOOM's legibility floors; (e) a person of the
  program who has not seen the script rebuilds it by hand from the brief in ≤ 90 minutes, and V12 §3.14's K2 structure
  list holds, its thresholds V12's: the landward wall's two sea anchors and its gate plaza; the mole with its mid-mole tower
  and its mouth fort; the causeway and the lighthouse; the jetties outside the basin with deck buildings (K2-4: at least
  eight jetties, deck buildings on at least four); at least three terraced wards with inner walls and at least
  ten retaining walls, every way crossing one a stair or a ramp; ring streets round two precincts; the raised road crossing
  at least two ways with no junction; the ravine quarter; the stepped temple with at least four tiers; the arena; six
  named wards. **The emulation variant:** the brief declared only through the L2 PROGRAMME layer; the checklist holds and
  the rules fill the rest.
* The second fixture's own golden and model bars are volume 12's (V02 X25; its goldens under `plat/goldens/known/K2/`,
  its record `fixture.json` there, which V10's evaluation group A reads); this volume's bar is T-V9-56, with T-V9-61 and
  T-V9-62 run on it.

### 7.3 The first-five-minutes protocol, operationally

§13.4 states the test, its pass rule and its fallbacks; this is how it is run.
1. **When and what build.** The four tasks need T5 `quarter`'s and T6 `place`'s events, which §16 builds at M3a (drawn boundaries,
   post-build assignments, positive placement and the solver), so the four-task sessions run inside M3a — the first on its
   midpoint build, once those events have landed, the second at its exit — and the M2a exit holds a **pipeline session**
   instead: three to five participants, recorded and not gating, on the tasks the M2a build can express — a New random on a scope
   that keeps a locked thing (T10 `hold`), a shape task ("make this house one storey taller, then split this plot", T9 `shape`), going back
   in the history, and adding a compass — its findings feeding AP3 (file f item 494; J-V9.15). The dress task's style change has
   `ink` and `lit` to choose from at M3a (`lit` ships at M2b).
2. **Participants.** Five SettlementForge users per round (within §13.4's five to eight), recruited from its existing
   community, thanked by credit and early access, no payments (J122), each: runs tabletop games, has used a map tool
   casually, does not program for a living, has never seen the editor, and was not in an earlier session. Two per session
   work on a tablet (§13.4's touch question). The build they use is on SettlementForge's staging host (J121; V09 §11 Q1).
3. **Setup.** A generated TOWN at a seed from `H32("f5/<milestone>/<participant>")` (§13.6's `H32`), the empty state
   dismissed, no clerk unless the session tests it; the reference laptop with a mouse, or a 10–11 inch tablet.
4. **Tasks**, read from cards, in this order, with no help: *quarter* — "Make a temple quarter called {name} next to the
   market."; *place* — "Put a tavern called {name} near the {gate}."; *dress* — "Make the map look like {style} and add a
   compass."; *re-roll* — "You don't like the houses in this block" (the observer points) "— get a different version, but
   keep your quarter and tavern." Five minutes from the first touch for all four.
5. **Observation.** One observer per participant records per task: completed, seconds, the step where stuck, notes; then
   asks two questions: "Did anything change that you expected to stay, or stay that you expected to change?" (§13.4's
   declared-means-held question) and, where a clerk was on, "Did the assistant feel slow?". No video is kept; any screen
   recording is deleted once the notes are written.
6. **Record** `plat/goldens/ux/<milestone>/f5.json`, named in the milestone's `MilestoneRecord.ux` (file f item 490):

```ts
interface F5Record { milestone: string; build: string; date: string;
  participants: { id: string /* P1 … P8, no names */; device: 'laptop'|'tablet';
    tasks: { task: 'quarter'|'place'|'dress'|'reroll'; completed: boolean; seconds?: number; stuckAt?: string; notes?: string }[];
    surprisedByHeld?: boolean; clerk?: { used: boolean; slow?: boolean } }[];
  verdict: { perTask: Record<'quarter'|'place'|'dress'|'reroll', { passed: number; failed: number }>; pass: boolean /* §13.4: all, or all but one, complete all four */ };
  fallbacksApplied: ('firstScreen'|'hint'|'touchFabric'|'clerkApplyThenUndo'|'keepChangeToggle')[] }
```

7. **Consequences.** §13.4's fallbacks, applied through `toolkit.json` (first-screen placement, hint text) and `AppPrefs`'
   defaults (`touch.editFabric`, `reroll.keepChangeToggle`) and `ClerkSettings.applyMode`'s default (V10 §4.4), each a shipped-data change with a note in the
   release notes; a task two or more participants fail is re-run with new participants before the milestone exits.

### 7.4 The owner's UX sitting — §13.6's shape applied to the editor

The owner is the casual user this product is for (a non-programmer who delegates the technical judgement), so the owner's
own use is a gate as the owner's eye is for the maps (§13.6):
1. **When.** M2a (diagnostic, recorded, not gating), M3a (gates "the editor is ready for casual users"), M3b (the exports and
   the dress panel).
2. **Fixed before the sitting.** The tasks and the seeds (`H32("ux/<milestone>/<i>")`), committed before the build is shown.
   The tasks: the four of V09 §7.3; "Export this town for your tabletop"; "Find out why the tannery is where it is"; "Undo a
   mistake, then go back to how the town was ten minutes ago".
3. **Rubric**, per task: (1) "Could you do it without help?" — yes · with a hint · no; (2) "Did it do what you expected?" —
   yes · partly · no; (3) "Would you use this for your game?" — yes · maybe · no; an optional one-line note.
4. **Pass.** Every task "yes" or "with a hint" on (1), and at least two thirds of the tasks "yes" on (2) and on (3).
5. **Unrated.** If the owner has not sat within seven days of the build being ready, the milestone's editor status is
   recorded "provisional — not rated", the build continues, no "ready for casual users" claim is made, and the sitting is
   offered again at the next milestone (§13.6 (7)'s rule).
6. **Record** `plat/goldens/ux/<milestone>/owner.json`: `UxSittingRecord { milestone; date; status: 'diagnostic'|'passed'|
   'failed'|'accepted'|'provisional-not-rated'; seeds: string[]; answers: { task: string; q: 1|2|3; answer: string; note?:
   string }[]; acceptance?: { by: 'owner'; text: string; date: string } }`, named in the milestone's `MilestoneRecord.ux`
(§13.3; file f item 490).

### 7.5 Parity with the references' own editing

Every capability the reference generators' editors have is reached, and the action counts are compared on §13.4's scripted
tasks (O16 (c)); sources: `research/ux/tool-survey.md` Part I D.

| the reference's capability | reference actions | PLAT | PLAT actions | verdict |
|---|---|---|---|---|
| a new town (MFCG Enter; FTG's create form) | 1; a form | Enter in the empty state; afterwards Same kind, new seed (a new document) | 1 | parity; the current town is never lost (improvement) |
| re-roll one ward (MFCG ctrl-click) | 1 | shift+click (a scoped New random), with three variations | 1 (+1 to pick) | parity; candidates added (improvement) |
| warp brushes (MFCG's eight) | mode + stroke + Enter | T2 `ground`'s warp session, eight kernels, Apply | same | parity |
| rename a label (MFCG click) | 1 + typing | click + typing (T11 `name`) | same | parity |
| move a label (impossible in MFCG) | — | drag (T11 `name`) | 1 | improvement |
| district colours (impossible in MFCG) | — | T12 `dress`'s tint and the style dialog | 2 | improvement |
| keep edits across sessions (impossible in MFCG) | — | autosave | 0 | improvement |
| roads as click-chains that snap and split (FTG) | n + 1 | T4 `road` two points or a line, with snap | 2 | parity |
| place a building (FTG two clicks) | 2 | T6 `place` stamp drop, Accept | 2 | parity |
| swap two buildings' details (FTG) | 3 | drag a use's badge onto another building (`swapUse`) | 1 drag | parity |
| paint roofs (FTG brush) | brush | T9 `shape` paint | brush | parity |
| regenerate an area with presets (FTG) | select + preset + accept | T10 `hold` Try again with scope chips and variations | 2 | parity; three candidates (improvement) |
| confirm the consequences (FTG's confirm-actions list) | 1 | the badge's fate counts and the fates sheet | 1 | parity |
| "This action cannot be undone" (FTG's regenerate) | — | never: every action undoes (R11) | — | improvement |
| bulk edit (FTG) | select + form | multi-select + `setAttrMany` | same | parity |
| the thirteen MFCG asks of §7.4 | — | each reachable from the rail or a panel in ≤ 3 actions (V09 §4.3), verified by T-V9-44's scripted action count | ≤ 3 | improvement (MFCG has none) |
| rotate the map (MFCG's warp menu) | 1 | the Map group's dial or "North up" | 1 | parity |
| a river drawn with a width; trees by brush; pins with a label, a note and a colour (FTG) | a draw; a brush; a click and a form | T2 `ground`'s river or canal line with its width handle; T8 `fill`'s Trees brush; the Notes panel's pins | same | parity |
| people search and a clock (FTG) | a form; a button | the People panel; the clock's Next hour (module tier) | same | parity |
| a city as tabletop crops plus an overview (E4 (4)) | — | the scene split with a numbered overview PNG | 0 extra | parity |
| a road raised while drawing (the surveyed road tools' Page Up/Down, `research/ux/tool-survey.md` Part II, B2-S5) | a key | T4 `road`'s Raised toggle, or PageUp and PageDown while drawing (V09 §4.20.2) | 1 | parity |
| a multi-level tabletop scene (Part II, E-S33, E-S34) | — | a raised way's deck scene, a level with its elevation band (file f item 447 (c)) | 0 extra | parity |
| retaining walls, raised ways, stepped buildings and deck plots in the reference generators | none | T3 `wall`, T2 `ground`, T4 `road`, T9 `shape` and T6 `place` (item 110; V09 §4.20) | — | improvement |

### 7.6 The game-master trial before the public release (item 112 (b))

§13.2's T112-2 makes the trial a release gate (§16); this is how it is run.
1. **Who and how many.** Ten to twenty SettlementForge game masters, recruited through SettlementForge's existing
   community, each running the map on their own settlements, thanked by credit and early access, no payments (item 112 (b);
   J122). A participant of a first-five-minutes session (V09 §7.3) may take part.
2. **What they use.** The release candidate on SettlementForge's staging host (J121; V09 §11 Q1), inside SettlementForge
   (host mode) — the map module over their own campaigns, the dossier absorbed as their play moves on.
3. **The sessions.** At least two sessions of play each, over at least two weeks of the campaign clock; nothing scripted.
   After each session the participant answers the trial form (four questions: what they used, what surprised them, what
   failed them, would they use it next session) and may attach pictures; the in-app defect records (V09 §5.12) are
   exported with their consent.
4. **The record** `plat/goldens/ux/release/trial.json`, named in the release gate's record (§16):

```ts
interface TrialRecord { build: string; from: string; to: string /* ISO dates */;
  participants: { id: string /* G1 … G20, no names */; tier: string /* the settlement's rung */;
    sessions: { date: string; players: number; minutes: number; used: string[] /* screens and tools, by id */ }[];
    findings: { severity: 'blocker'|'major'|'minor'; area: string; text: string; fixed?: string /* the change that fixed it */ }[] }[];
  report: { path: string /* the written report */; date: string };
  verdict: { participants: number; everyTwoSessions: boolean; openBlockers: number; pass: boolean } }
```

5. **Pass** (T112-2): at least ten participants, each with at least two sessions; the report written; every blocker fixed
   (re-checked by its reporter where they can) and every major fixed or ruled by the owner; the findings entered in volume
   12's calibration record and the fix list (V12). A failed trial holds the public release and runs a second round on the
   fixed build.
=== END ===

=== REPLACE ### 8.1 Where it slots into §16 ===
### 8.1 Where it slots into §16

The application is built along the base's milestones, never ahead of the engine it drives: each step below ships inside the
milestone named, on that milestone's API, and exits on its bars. Estimates are expert person-weeks (PLAUSIBLE), for the
application's code, data rows and its own test tooling; the engine work they call is the base's and the other volumes'.

| step | milestone | content | exit (V09 §7) | pw |
|---|---|---|---|---|
| **AP1 — the shell** | M1 | the frame (top bar, rail with the tools that exist, map region, context panel, view bar); the chrome tokens, the icon sprite and the two themes; the empty state's card (the proxies' strip waits for M3b); the report, gazetteer and "features in view" panels in plain words; the basic panel; the keymap; the accessibility contract; context help's skeleton; the message catalogue's first rows and its coverage test; open and download of generated towns | T-V9-1 (shell), T-V9-15, T-V9-21 (shell) | 2.5–3.5 |
| **AP2 — the editing core as screens** | M2a | selection and the generated context panel; T9 `shape` and T10 `hold`; the preview pipeline — ghost, badge, handles for T9, the variations tray with thumbnails (file f item 461), the refusal card, the bend line, the fates sheet; undo and redo; the history panel with restore points and "Go back to here"; autosave, compaction, crash recovery and the draft mirror; the M2a pipeline session of the first-five-minutes test (V09 §7.3; file f item 494); the owner's diagnostic sitting | T-V9-2 to -7, -12, -13, -16 (go back), -17, -29 (the pipeline session, recorded), -30 (diagnostic), -47 (compaction) | 2.5–3.5 |
| **AP3 — the full toolkit on the canvas** | M3a | T2 `ground` – T8 `fill` in full (points forms, snapping by role file f item 517, wall arcs file f item 462, placement alternatives file f item 463, the quarter's size file f item 348); handles on every shape; T7 `roster`'s paste and cards; multi-selection and move; the working layer; the advanced panel, tables editor and presets; the siting rows, the link view and link edits, split merge-back, wall stretch grades, record members, the why card (V11's tables by `editTable`, file f items 460 and 360, V10's `WhyAnswer` through `WhyCardModel`, its `sections` drawn by the card's row renderer within this estimate); the clerk drawer (with volume 10's clerk, or the scripted test clerk until it lands); touch and the three layout classes; the share sheet; open and recent; the three load outcomes (V09 §3.14 (a)–(c): the upgrade offer, the frozen view's Edit it with this version, a model-less file's recipe), standalone (host mode at AP5b); the known-city canvas script; the two four-task sessions (midpoint and exit); the owner's gating sitting; **the revision's base edits** (the castle's keep and bailey, land use, the tree brush, way split and join, district colour, the lifts, the drawn river), the context menu, View as as a filter, Recently deleted, the re-roll brush and the held-thing marks; **item 110 on the canvas** (V09 §4.20: Retaining wall, Terrace, Raised and Aqueduct, removal and Build it again, decks and landmark slots, the per-tier steppers, spans and crossings, the effects list, the hit stack, Keep them as yours, the Raised-ways row, the skeleton's removals, the export dialog's item-110 rows) and the second known-city canvas script | T-V9-3, -4, -8 to -11, -14, -18, -20, -22, -24 to -27, -29, -30, -31, -39, -44, -47 (links), -48, -50, -51 to -58, -60, -62, -63, -65, -66 (tiers, the harness form), -67 (the standalone clauses), -81, -82 | 7.25–11 |
| **AP4 — finish, export and shade** | M3b | the export dialog's five tabs with estimates and the tabletop details (file f item 454); T11 `name` in full (inline editor, region groups, leader-line switch); T12 `dress` in full (furniture tray, underlay, lights, ground texture, the style dialog, **New trees**, **New decoration**, **New emblem** and **New compass**); the shade view (file f item 411, once item 102's driver is in the field); the Try-another strip (with §7.8's proxies); the guided first town; settings complete; the installable offline app; help coverage; the owner's sitting on exports and dress; **the revision's view keys** (the Map and Light groups, notes, pins, favourites, the grid, legend and emblem controls, the ruler), the coverage and voids views, the whole-circuit option, the tabletop overview | T-V9-3 (T11, T12), -6 (New trees, New decoration), -19, -21, -23, -30, -32, -43, -45, -47 (shade), -61 | 3–4.25 |
| **AP5 — time** | M6-E (staged; with V06's E6) | "Open a copy from here" on V06's `forkAt` and "Re-run from here" on `rerunFrom`; the Chronicle tab joined to V06's timeline bar; `chronicle.csv`, `uses-history.csv`, the animated history and the history block at import | T-V9-16 (copy), T-V9-17 (the advance clauses), T-V9-41, T-V9-53 (the epochs) | 0.5–0.75 |
| **AP5b — host mode** | M-SF (with V08's SF4 and SF6; V08 §8.1) | the host shell verified on V08's `embed.html` with V08's `HostSlots` — the file menu under `fileMenu: false`, the host rule for new documents (`newDocuments`) and the history panel's host group (`historyLines`), the three load outcomes in host mode (V09 §3.14 (a)–(c)), View as's host-set key form; the assistant's host clauses re-run on the embed; the Show menu's **SettlementForge's chains** (V09 §5.4); the history panel's dossier groups and the report panel's standing notes (V09 §4.10, V09 §5.7) | T-V9-28, T-V9-40 (the host clauses, on the embed), T-V9-64 (on the embed), T-V9-66 (the embed clause), T-V9-67 (the host clauses), T-V9-68, T-V9-69 | 0.25–0.5 |
| **AP6 — Below and item 109** | M6-U (staged; with V04's U3, U3b and U4) | the Below group (band ladder, view chips, lantern, the hidden-voids toggle at `secret`); the system chip and New ruin / cavern / catacomb; the ruin legend; "How people get down here" with every cause, "Show the way in" and the access edits; the dwelling closure's words; the catacomb, crypt and cemetery panels, the extent chart and the bends | T-V9-33 to -38 | 1–1.5 |
| **AP7 — Sky** | M6-sky (staged; with V05's P4) | the Sky group and island menu; the island handles (rim by `resizeIsland`, altitude); "Update shade now"; the shade strips and their legend | T-V9-43 (strips) | 0.5–1 |
| **AP8 — the built-in assistant's screens** | M3c (staged; with V10's C2–C5 — C5 for the host channel and the card-only drawer) | the three first-open cards (label, notice, key); every `ReplyBlock` and `ClerkAction`; the meter and the caps; the settings' Assistant section over `ClerkSettings`; the creation preview and its acceptance; the import dialog's critique and "Check with the assistant"; "Ask the assistant"; the transcript export; the card-only drawer for a host's proposal and the host channel `ClerkMount.host`, verified on the application harness's scripted host page (T-V9-64); New topic, the key verdict and the defect list; Start a new map from this (`attach.newMap`) | T-V9-27 (harness), T-V9-40 (the host clauses on the scripted host page), T-V9-64 (on the scripted host page) | 1–1.25 |
| **AP9 — people and the family tree** | M4b (with `@plat/sim`) | the People panel, the person card with "Where is", the family tree, the clock | T-V9-46 | 0.75–1.25 |
| **AP10 — building-band controls** | M6c (staged; with V02) | V02's handles and family strip (V09 §3.5) and the tier controls (V09 §4.20.5: the tier stepper, the step handle, the stair and top chips, the stair width) | T-V9-42, T-V9-59 | 0.25–0.5 |
| **AP11 — items 111–119 on screen** (V09 §4.21) | across milestones, each part with its engine | the oasis toggle at M3a (with AP3); Colour vision, the cue column and the progress view at M3b (with AP4); the History chip, "What its past left" and the lost-void line at M6-E (with V06's replay and V04's U-ACCESS); the wall's Repair material and legend at M6-E (with V06 §3.7.7); the grandeur line at M6 (with V02's ceiling rows); the zoom-out stop, the season control and the festival list at the milestones §16's rows for items 116–118 name; the game-master trial before the public release (V09 §7.6) | T-V9-71 – T-V9-79 | 2–2.75 |
| **total** | | | | **21.5–31.75** (base line 16.25–24.0, AP5b inside it, J-V9.103; staged AP5–AP8 and AP10 3.25–5.0; AP11 2–2.75 with the owner items it serves) |

**Against the base's pricing.** §16's effort table prices the reference app's UI with item 101's addition; this volume's
design adds to that line, itemised: autosave,
compaction, crash recovery and the draft mirror +0.75–1.25; restore points and "Go back" +0.25–0.5; the message catalogue in
plain words with its coverage test +0.5; the file-g interface (the siting rows, the link view and edits, split merge-back,
wall grades, record members, the shade view, the why card) +1.5–2; the export dialog's estimates and tabletop details
+0.5; the touch layer and the three layout classes +1–1.5; the guided first town +0.25; the owner's sittings and the
known-city canvas bars +0.25–0.5 — **+5–7 pw** — and the base-side additions (the base edits, the view keys,
notes, pins and ruler, the context menu, View as, Recently deleted, people and the family tree) **+1.5–2.25 pw**, and
item 110 on the canvas (V09 §4.20, the effects list, the hit stack, the item-110 dialog rows, the skeleton's removals
and the second fixture's script) **+1.25–2.25 pw**, carried by file f item 530 as a widening of that line to
**16.25–24.0**. The staged screens — time's (AP5 0.5–0.75: the copy, the re-run, the Chronicle tab and V06's exports),
the staged layers' (AP6 1–1.5, AP7 0.5–1), the staged clerk's (AP8 1–1.25) and the stage-3 building band's (AP10
0.25–0.5); 3.25–5 pw — are built with their staged milestones — V06's E6 at M6-E, V04's M6-U, V05's P4, V10's M3c and
V02's M6c — and priced in §16's row for the application's staged screens, outside the base total and outside those
volumes' totals (V04 §8, V05 §8, V10 §8 and V02 §8 name the step each lands with).
AP11 is priced with the owner items it serves (items 111–119), each part inside the milestone of its engine.
=== END ===

=== REPLACE ### 8.2 Spikes (risk retirement, at the start of their milestone) ===
### 8.2 Spikes (risk retirement, at the start of their milestone)

* **S-A1 — the preview loop at CITY (M2a, first week).** T9 `shape`'s drag → settle → `preview` → ghost on a CITY document on the
  reference machine, and a T5 `quarter` seed preview on a hand-made harness over §7.1's `quarter` event: measure L-ghost; pass:
  V09 §6.1's rows + 10 %; else apply §6.1's fallback before building further tools on it.
* **S-A2 — the local store on three engines (M2a).** The journal, compaction and recovery on Chromium, Firefox and WebKit,
  including WebKit's eviction of script-written storage for sites not installed; measure the write cost and verify
  `navigator.storage.persist()`; pre-decided outcome where persistence is not granted: the Storage section shows "Your
  browser may clear saved towns after a while. Install the app or download your towns to keep them." once, and the Download
  banner appears after the first hour of editing in such a session.
* **S-A3 — the touch recogniser (M3a, first week).** The gesture mapping of V09 §4.12 on two tablets (one iPad-class, one
  Android-class): long press, second-finger free placement, pinch during a draw; pass: T-V9-22's scripts; else the second
  finger's free placement becomes a "Place freely" toggle chip in the options strip.
* **S-A4 — a raised course's preview at METROPOLIS (M3a, first week of item 110's tools).** An aqueduct of 5 km over built
  land and a viaduct's removal on a METROPOLIS document: measure L-ghost against V09 §6.1's rows; pass: + 10 %; else the
  preview-on-release threshold `raised.previewOnReleaseKm` is lowered to 1 km for that rung and reported, and T-V9-3
  records it.
=== END ===

=== REPLACE ### 8.3 Risks, in order ===
### 8.3 Risks, in order

1. **The first-five-minutes test fails a task** (§13.4 answers it: first-screen and hint revisions, a re-run with new
   participants before the milestone exits).
2. **L-ghost at CITY and METROPOLIS for T3 `wall` and T4 `road`** (V09 §6.1's fallback: preview on release).
3. **Browser storage eviction** (S-A2's outcome; the product's promise "never lose work" then rests on the download and
   install paths, which the Storage section states plainly).
4. **Touch** (§13.4's fallback: the L3 FABRIC and L4 FINISH layers' geometry edits pointer-only on touch).
5. **Volume 10's clerk arrives later than AP3** (the drawer ships against the scripted test clerk; T-V9-27 runs on it; the
   built-in clerk plugs into the same slot at M3c, AP8).
6. **The siblings' records arrive in another shape** (V04's causes and `blockedBy`, V10's `TurnView`, V11's tables): the
   screens read them through the one projection each (`WhyCardModel`, the cause table, the §2.6 mapping), so a change is
   one table's rows; V09 §10.2 lists what each sibling is asked for.
7. **Item 110's base mechanisms land late or in another shape** (§2.7's records and file f items 244–246, 362–364, 447,
   455 and 465–467): the tools read them only through file f item 362's events and file f items 465, 466 and 467's
   answers, so a change is those items' text; until they land, AP3 builds item 110's screens against the scripted engine stub the harness
   already uses for T-V9-12 and T-V9-13, and T-V9-51 – T-V9-63 run when the engine side lands inside M3a.
=== END ===

=== REPLACE ## 9 Decisions (each vetoable) ===
## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V9.1 | chose one shell with host slots (`ShellMode`, `HostSlots`) over a separate host application, because V08's differences are a short list and a fix to the shell then reaches both the standalone editor and SettlementForge's Map tab |
| J-V9.2 | **Superseded by J-V9.36**: the map-side declarations are volume 11's document-only tables written by `editTable`, not attributes of `Use` |
| J-V9.3 | chose to accept a pending ghost implicitly when the user starts another gesture or picks another tool, over requiring an explicit Accept, because R1 forbids a dialog-first flow and the survey's strongest pattern is the result appearing with the gesture; Esc, Cancel and undo keep it cheap to refuse |
| J-V9.4 | chose commit-on-release for things the gesture itself draws (strokes, drags, locks) and Accept for things the user chooses among (a quarter's size, a place's site, a roster, a fill's variation, a clerk's proposal), because the chosen ones carry a count or candidates to judge first (R3, R14) while a stroke's ghost is the thing itself |
| J-V9.5 | chose a journal of the API calls, replayed with a `logHead` check after each, over journalling log events, because unshared truncation (§7.4) and confirmed fates change the log's own shape, while the engine's determinism makes replaying the calls exact and self-checking |
| J-V9.6 | chose to keep wall-clock times in the local journal, not in the document, because `EditBase` has no time field and adding one would change every document digest for a display detail; events made elsewhere show no time |
| J-V9.7 | chose restore points as shared view keys, one key per point, over a canonical list, because they are bookmarks on log positions that must never move the model digest, and one key per point merges concurrent additions under last-writer-wins |
| J-V9.8 | chose to confirm a dry run's renames as one set over per-rename choices, because keeping one old name is a different event (a name lock) that would change the dry run's own result; a user renames afterwards |
| J-V9.9 | chose three layout classes — every tool on wide and medium (tablets), and a viewer with light edits on narrow (phones: T1 `intend`, T5 `quarter`'s seed and click-inside, T6 `place`, T7 `roster`, T10 `hold` – T12 `dress`, exports, share, the clerk) — over full editing on phones or none on tablets, because handles and snapping need 44 px targets with the map visible around them, the survey's touch evidence is thin, and §13.4's sessions decide tablet editing with a pre-decided fallback |
| J-V9.10 | chose to keep the clerk's conversation in memory only — kept as the accepted declarations in the log, or as the user's own copy — over saving it in the document, because the accepted proposals already carry their provenance and a chat may hold what the user did not mean to keep; when the user switches on volume 10's "Keep history", V10 §2.7's device store keeps it, never the document (**amended by J-V9.34**) |
| J-V9.11 | chose an installable, offline-capable web app with no telemetry and no network use except the clerk and a host's publishing resolver, because the base has no hosted service (§11.5), the towns are the user's, and the audience expects its tools to work at the table without a connection |
| J-V9.12 | chose our own icon sprite for the twelve tools and the app-specific marks and one permissively licensed icon set, through one adapter file, for generic glyphs, over drawing every glyph or taking every icon from a library, because the tools' icons carry the product's identity while generic glyphs gain from familiarity (§17.4's licence rule holds) |
| J-V9.13 | chose "what anyone knows" as the Share sheet's default picture tier, while the export dialog defaults to the view's tier, because sharing is where a secret leaks by accident and a game master's everyday view is `secret` |
| J-V9.14 | chose a three-way chip for the walls control (none · one ring · two rings) over the slider item 101 (g) drew, because the control is discrete (§7.8's registry) and the survey's mapping amends it (`research/ux/tool-survey.md` §5 T1 `intend`); file f item 515 corrects the base's wording |
| J-V9.15 | chose to run the four-task first-five-minutes sessions inside M3a (its midpoint build and its exit), with a smaller, non-gating pipeline session at the M2a exit on what M2a can express (a re-roll keeping a locked thing, a shape task, going back, a compass), over pulling M3a's engine pieces for T5 `quarter` and T6 `place` (drawn boundaries, post-build assignments, positive placement, the solver) into M2a, because the four tasks need those events and moving them would reorder the base's milestones; the survey's "cheapest point" is kept by the M2a session (file f item 494) |
| J-V9.16 | chose the system UI font stack for the chrome over bundling a UI face, because it costs no bytes, reads natively on every device and leaves the bundled faces (§17.2) for the map alone |
| J-V9.17 | chose handles at the most salient corners (turning angle × shorter adjacent edge, spaced along the ring) over evenly spaced or all vertices, because users grab a shape at its corners and 4–8 handles keep an edit a drag rather than a redraw (item 101 (i) rule 3) |
| J-V9.18 | chose `sizeM2` on the quarter's points form to carry the badge's plus and minus over a separate size event, because the event already has a points form and the grower reads a target size — one parameter on an existing tool |
| J-V9.19 | chose to show a link or siting edit as a changed binding with an offer to "Show better sites" over moving buildings at once, because a move is a relocation with its own fates, which the author sees before it happens (R3); the declaration holds for every later placement |
| J-V9.20 | chose curved provider-to-consumer arcs for the link view over lines routed along the streets, because hundreds of routed lines overlap on the same streets and hide the pattern; V08's view of one custom chain routes along ways and stays its own view |
| J-V9.21 | chose six stepped shade veils drawn under the buildings' fills over a continuous ramp or a veil on top, because steps read as a legend and under-drawing keeps buildings and labels legible (the legibility floor) |
| J-V9.22 | chose not to offer copy and paste of buildings, because a copied building is not a declaration the rules can derive and the survey records the request only for free-form builders; T6 `place`'s stamp is "the same kind here" |
| J-V9.23 | chose to commit a roster card accepted alone as a `roster` with that one line and re-preview the rest, over committing a subset of one solve, because §7.1 solves a roster in one dry run and a committed subset must be its own solve |
| J-V9.24 | chose existing events for the app's compound gestures — a use badge dragged onto another building is `swapUse`, "Go back to here" is a group of `undo`s — over new kinds, because §7.1 and §7.4 already carry their undo and replay; a gate slides by `moveVertex` on its crossing (**amended by J-V9.47**) |
| J-V9.25 | **Superseded by J-V9.33**: the oracle's answer is volume 10's `WhyAnswer` (file f item 468), and this volume keeps only its app-side projection `WhyCardModel` |
| J-V9.26 | chose an owner's UX sitting on §13.6's protocol shape as a gate at M3a, because the owner is the casual user the product is for and the maps' "mastered" already rests on the owner's eye |
| J-V9.27 | chose a dedicated-user bar — a person rebuilding the known city by hand in ≤ 90 minutes — besides the scripted canvas, because the owner's words were "a dedicated user can build it", which a script cannot measure |
| J-V9.28 | chose to request persistent storage and to state eviction plainly (S-A2) over promising local permanence, because WebKit may clear script-written storage for sites not installed; an honest note beats a silent loss |
| J-V9.29 | chose pages of three variations with "Show three more" over a user-set count, because R5 names three and a fixed small number bounds the preview's cost |
| J-V9.30 | chose live-layer providers (`live.shade`, `live.links`) over thematic override rows for the two new views, because their values are a derived raster and derived bindings, not entity attributes a style row can key on |
| J-V9.31 | chose `MsgRef` (a key and arguments) for the engine's bend and conflict lines over English strings, because the catalogue then owns every word of the application's own a user reads, a locale is a file, and the coverage test can check them — the application's own words (**amended by J-V9.55**) |
| J-V9.32 | chose to state "this changes where the rules would put it; it stays here until you move it" under the siting rows over re-siting automatically, because an automatic move of a declared or dossier place would break declared-means-held (§7.2) and item 20's dossier authority |
| J-V9.33 | chose to render volume 10's `WhyAnswer` through one app-side projection, `WhyCardModel`, stated as a table (V09 §2.7), over keeping a second answer type in the base, because two shapes of one oracle cannot both be applied and volume 10 owns the oracle; the projection also carries item 102 (f)'s drivers and item 106 (g)'s closure, which only volume 10's shape holds |
| J-V9.34 | chose volume 10's drawer view model and harness — the harness commits, only on the drawer's Accept or the user's apply-then-undo setting — over a shell that commits on Accept through a facade without `edit`, because volume 10's acceptance re-previews and checks the card the user saw before committing, and one committer is simpler to prove; the colliding type names are renamed (`ClerkMount`, `ClerkHandle`) and `ClerkSettings` is the one settings store |
| J-V9.35 | chose to show, at the drawer's first opening, the AI label, then the data notice, then the key entry, each skippable back to "Not now", over one combined card, because consent must come before any key is typed and each card answers one question a casual user has |
| J-V9.36 | chose volume 11's two document-only tables, edited by `editTable`, as the one store of the siting, link and split declarations, with a per-kind panel keyed `uid:`, `cat:` or `cls:` and no per-use siting weights (a single place is moved or pinned instead), and a `use:` key only for keeping one institution's works and shop together, over per-use attributes on `Use`, because the solver, the clerk and the canvas must read one store and item 104 (a) (1) keys the author's declaration by kind |
| J-V9.37 | chose three link-edit cells — `bindTo` to keep or move a supplier, `avoid` to cut one supplier, `cut` alone to stop buying the good — over overloading `cut` with a provider, because each of the link view's four buttons then writes one unambiguous row |
| J-V9.38 | chose V04's name `showUnexcavated` for the hidden-voids toggle and made it a per-viewer view key, never a logged layer field, offered only to a `secret` view, over the name `underSealed` and over a `LayerSpec` field, because a game master's toggle must never enter the log another client reads and one name must serve both volumes |
| J-V9.39 | chose to state the catacomb bend ladder once, in file f item 361 as the dry run of `drawChamber { system: { newKind: 'catacomb' } }`, and to word it here, because the ladder is the dry run's and R2 requires a bend for each misplaced catacomb; none of the four catacomb bends or two crypt bends refuses |
| J-V9.40 | chose to expand a dwelling declaration on a sealed void into a closure that makes the way in by V09 §4.17.4's four-step ladder — a way dug down from the nearest building within `DigRule.maxM`, else the nearest public opening, else a `collapsed_shaft` from the public ground over the cluster, else the declaration bent onto ground part 0 — over refusing it, because §7.3 item 9's closure exists for exactly this and R2 allows a refusal only against a fact or a lock (**amended by J-V9.102**) |
| J-V9.41 | chose one preview contract for variations — volume 10's `{ event, result }[]` with a page, a `previewId` and a `thumbnail` tied to its preview — and one committed group per source, with a clerk's alternatives previewed each by its own call, over two contracts, because §7.3 item 10's variations and a clerk's alternatives are different things that must replay exactly |
| J-V9.42 | chose to merge four requests with volume 10's — `sizeM2` clamped into the band from the median, one `MsgRef` mechanism rendered per caller, the top three `SiteCandidate`s as placement alternatives, and a record's members from `EntityCard.members` — and to withdraw this volume's `members` query, because each fact must have one owner |
| J-V9.43 | chose to preview a T1 `intend` change after a declaration as a whole-town ghost with Accept, and to open the fates sheet only after Accept and only when fates move, over opening the sheet first, because R1 forbids a dialog before a picture and §12.5's model law makes the ghost affordable with a working ring |
| J-V9.44 | chose to turn every refusal that is neither a dossier fact, a lock, a dependency, a role, a staged layer, the rung nor the screen into a bend with its alternative pre-selected, and to give every remaining refusal at least one button, over the first draft's fifteen refusals, because R2 and T101-5 require the closest alternative; a rule of a building's structure or of nature is a bend too (J-VI.4) |
| J-V9.45 | chose a two-phase journal — pending before the call, done with its result — with a fates-sheet confirmation journalled in its resubmission form, over writing each entry after `ok`, because a kill between the worker's commit and the write would lose a commit and break the chain of heads |
| J-V9.46 | chose to make "View as" a display filter (`ViewOpts.viewAs`) separate from the view's knowledge key, over lowering the key, because a lowered key refuses the document formats and would stop autosave, ctrl / cmd+S and downloads while the owner looks through a player's eyes |
| J-V9.47 | chose that a boundary drag replaces only the run between the moved handle's neighbours, that a lake offers only its level handle (its shore is its basin filled to that level), that every gate slides by `moveVertex` on its crossing, that an island's rim resizes it by `resizeIsland`, and More handles = clamp(round(perimeter ÷ 75 m), 8, 16), over whole-ring lassos and rim handles that fight the basin rule, because a handle drag must stay local (item 101 (i)) and never contradict a derivation rule |
| J-V9.48 | chose to design the People panel, the person card with "Where is", the family tree and the clock here at M4b, over an out-of-scope row, because §14 places the family-tree view in `@plat/app` and no other volume owns these screens |
| J-V9.49 | chose a link cache bound once per `logHead` and re-bound incrementally, compaction only when idle, and a stated cost law for the shade sampler with a coarser-cell fallback, because METROPOLIS's tens of thousands of consumers and 8 MB documents would otherwise stall the view and the previews |
| J-V9.50 | chose to record each canvas-script gesture's view scale and centre and to replay it at that view, and to restate the known-city bar (a) as T101-6 states it, because the snap resolves in screen pixels and a transcript made from words resolves to different points than a hand |
| J-V9.51 | chose a "Recently deleted" list kept 30 days, purged earlier only after asking, over a 10 s undo, because R11 and R15 promise that nothing is lost by one click |
| J-V9.52 | chose to generate the context menu from the registry and `toolkit.json`, in a fixed order, over a hand-written menu per kind, because the panel and the menu must offer the same actions and a new kind must reach both without code |
| J-V9.53 | chose to draw, over this volume's six-step shade veil, V05's revised strip rows as V05 states them — a solid line at the three-of-nine area and a dashed pending line — over three nested strip areas, because V05's revision moved the veil to this volume and kept the strips as outlines; the veil's steps carry "some, much, most of the day" |
| J-V9.54 | chose "Show the whole circuit" as a `LayerSpec` option of the wall layer, drawn by S14 in both products, over a view key, because it is a choice about how the style draws walls, exported in pictures, and V07's palisade relies on it |
| J-V9.55 | chose to scope the catalogue to the application's own words and to run T-V9-15's readability step over volume 10's and volume 11's rendered sentences, reporting failures to those volumes, over copying their sentences into this catalogue, because each sentence must have one owner; the file also carries volume 10's key families, their texts volume 10's (**amended by J-V9.79**) |
| J-V9.56 | chose seven size chips at population quantiles of the rungs' bands, read from the rung table, each showing its number, over three unnumbered chips, because the owner rules that population sets size within a tier |
| J-V9.57 | chose to place the base's view keys, notes, pins, favourites, the grid, legend, emblem and compass controls and the ruler in named groups of the view bar and in a Notes and a Dress panel, over leaving them to a later volume, because the application is their only writer and the parity tasks need them |
| J-V9.58 | chose to design item 110's tools in this volume itself (V09 §4.20) over leaving them to the architect's attachment notes, because an implementer holding the base and this volume must build them without guessing |
| J-V9.59 | chose to widen `drawWall` with a `retaining` kind and `drawWay` with `raised` and the `aqueduct` class, and to add a `terrace` sugar, over new event kinds per record, because file g and volumes 6 and 10 already speak of T3 `wall`'s retaining kind and T4 `road`'s raised flag, one tool mode maps to one event family, and the fold resolves the record by kind; the terrace is sugar because its walls lie where the levelling puts them |
| J-V9.60 | chose to bend a retaining wall drawn on flat ground onto the nearest step, else into a terrace with the wall on its edge, over refusing it, because R2 allows a refusal only against a fact or a lock, and item 110 (f) wants no retaining wall on flat ground |
| J-V9.61 | chose to bring a raised road or viaduct down before a town wall, through its ground way's gate, over carrying it over the wall, because a raised deck over a curtain would be an unguarded way in; the aqueduct's arch is item 110 (b)'s own rule |
| J-V9.62 | chose a basic Raised toggle and an Aqueduct class chip on T4 `road`, with PageUp and PageDown while drawing, over a separate raised-way mode, because item 110 (b) names "T4 `road` with `raised`, or the aqueduct class" and the surveyed road tools raise a road with those keys |
| J-V9.63 | chose a previewed Delete that needs Accept whenever the removal changes anything beyond the thing itself, over a Delete that commits at once, because R1 and R3 require the consequences to be seen first and a raised way's removal reaches routes, streets, vaults and water |
| J-V9.64 | chose one typed effects list on the preview and the confirmation, with a `holds` line for a suppressing removal, over reading consequences off the ghost's geometry, because the words must reach the fates sheet, a screen reader and the clerk, and each volume owns its own consequence; the kind `added` joins the other seven so a Re-derive can name what it builds |
| J-V9.65 | chose click-again cycling through a hit stack, with the context menu's "Select below", over a modifier-click, because alt-, shift- and ctrl-clicks are already lock, New random and reset (§14), and the stack serves raised decks, arches, crossings and tiers alike |
| J-V9.66 | chose to show a deck's budget as its storey cap and footprint band, never as a count of plots, and to bend a class the deck refuses to its landward end, because the budget is volume 11's footprint and storey row and R2 bends before it refuses |
| J-V9.67 | **Superseded by J-VI.4** (item 101 R2): a rule of a building's structure or of nature is a bend, never a refusal (V09 §4.9) |
| J-V9.68 | chose to keep a raised part on the Ground working layer, reached through the hit stack, over a fourth working-layer switch, because a raised part is a ground arena part (item 110 (b)) whose ends join ground vertices (§7.1) |
| J-V9.69 | chose one deck scene per raised way — a level of a multi-level scene — over drawing decks only into the ground scene's picture, because a fight on a viaduct needs the deck's parapets as walls at the deck's height, and the surveyed tabletop tool stores levels by elevation band |
| J-V9.70 | chose to carry an author's removals of generated content in the skeleton, a suppressing one by its reason key, over carrying declarations only, because a removal is the author's act, the owner ruled that it holds, and the base's skeleton round trip would otherwise fail |
| J-V9.71 | chose to allow a closed retaining chain as a platform over forbidding `closed`, because a temple or citadel platform is retained on every side, and item 110 (a)'s "never an enclosure" means not an `Enceinte` (no gate, no circuit), which the fold enforces |
| J-V9.72 | chose an unchecked "Keep them as yours" when a Re-derive to TOWN drops a city's generated raised ways, over keeping them silently or dropping them silently, because a town builds none by its own rule while the user may want the city's, and the choice costs one click |
| J-V9.73 | chose a Raised toggle that resets each time T4 `road` is picked, and is never remembered, over a remembered one, because a remembered toggle turns the next ordinary street into a viaduct |
| J-V9.74 | chose T10 `hold` as `delete`'s home tool — the Delete key and the context menu being its gestures — over leaving `delete` without a tool, because volume 10's file f item 368 puts it there for the clerk, T-V9-12 and T101-1 need one home tool per kind, and the removal of generated content is a held edit of T10's class |
| J-V9.75 | chose a well pin as the bent result of an aqueduct with no higher source (J-VI.4 (h)), over a cistern, because a cistern is a chamber of the underground vaults system (II.7.6) that the ground tools do not draw, while a well is a ground pin the dry run places at the terminal |
| J-V9.76 | **Superseded by J-VI.4 (g)**: the rim case is the dry run's bend (V09 §4.20.9), its inward move the geometry, so the clerk and a skeleton get it too |
| J-V9.77 | chose to read a removed thing's former shape from the base's tombstone (`Tombstone.last`, file f item 467) over a journal sidecar kept by the app, because a delete made by the clerk, a host or another session must also offer Show and Build it again, and the tombstone already holds the last record |
| J-V9.78 | chose to expand the `terrace` sugar into volume 10's flatten mode (file f item 366 with its `levelCm`) over a second levelling stroke, because the base must carry one flatten mechanism and the clerk's terrace must replay as the canvas's |
| J-V9.79 | chose to carry volume 10's key families in the one catalogue file with their `en` texts loaded from volume 10's sections, and to write here only the two sub-families volume 10 names without words (`info.under.cause.<rule>`, `info.catacomb.blocked.<cause>`), over copying volume 10's sentences into V09 §4.9 (two owners of one sentence) or leaving the keys out of the file (T-V10-29 and T-V9-15 fail and a raw key reaches the user); the `info.under.*` family points at volume 10's texts |
| J-V9.80 | chose a card-only mode of the one drawer, reached through a clerk slot of kind `host` that is always set in host mode, over a separate host-card component or the full drawer under configuration C, because V10 §3.17 routes a host's proposal through the same `turns` stream and card as a built-in one — a second component would draw the same card twice — and the full drawer would put a second assistant beside the host's, against "one assistant per product" |
| J-V9.81 | chose to hand the harness the bridge through `ClerkMount.host`, filled by the embed's bridge handler, over giving the harness the bridge transport or widening `HostSlots.clerkMode` into the whole configuration, because the bridge handler is the embed's one owner of the transport (V08 §3.1), the shell needs only the mode, and the proxy token must stay out of shell state |
| J-V9.82 | chose to draw `WhyAnswer.sections` as titled blocks after the facts, to withdraw `WhyCardModel.under`, and to take a raised way's `decidedBy` from its own `raised` row, over keeping `under` and this volume's own raised-way cause lines beside the sections, because each explanation must reach the screen from one row and two renderings of one outcome drift apart |
| J-V9.83 | chose a BCR adding a one-line `roster` to T6 `place`'s row of §7.1's toolkit table (file f item 570) over moving a place by a locus to T7 `roster` or having the canvas emit `assign` with an app-minted id, because a locus drop is a T6 gesture, the sugar mints the assignment id from the event's `seq` (§6.3) so neither surface writes one, and the rows must list what each tool emits for T101-2 and T-V10-1 |
| J-V9.84 | chose to make the canvas's T6 `place` drop-on-a-plot mapper V10 §4.1's `where.at` and `where.plot` rows by citation — `designation { cls, use }`, the name a `setAttr` on the created use in the same group — over the canvas's former `{ cls, name }`, because the base's `Designation` has no name field and T101-3 needs the two surfaces to emit the same bytes |
| J-V9.85 | chose to let `ViewOpts.viewAs` hold a key form `{ tier, places }` beside a tier, set by a host's players' view through `setViewOpts`, with `effectiveKey()` returning the form when its tier is the lower and the places both lists hold otherwise, over a tier-only View as with V08 writing the party key into the view state, because the party's learned places cannot be a tier, and a view-state write refuses the frame's document formats and risks its saves (J-V9.46); while a host's form is set the menu's other entries are disabled and the host's strip stands for the banner, over two competing banners and a menu that could contradict the host's switch; at equal or higher form tiers the value errs toward hiding, never showing (J-A30.82) |
| J-V9.86 | chose to pass the effective key as `admitAs` on every band-less read the application makes for a view and to default the export knowledge to it, over lowering each panel's answers in the shell, because only the facade knows every withheld fact and one parameter covers every kind, present and future (file f item 572); and to keep the application's own dry runs — ghost, badge, fates sheet, refusal and bend cards, effects — at the role's key, over filtering them, because they are the user's consent to a change and a filtered dry run drops concealed uses from its fates (file f item 470 (b)); file f item 572's "reads and dry runs" is read as the clerk's |
| J-V9.87 | chose to write a point-dropped `placeAt` as `plot: ''` with the point form, the dry run deriving the plot, over the shell's own hit query filling `plot`, because the canvas and the clerk must emit the same bytes (T101-3, T-V10-4) and the dry run is the one place that knows the nearest lawful plot (file f item 367) |
| J-V9.88 | chose, on a dossier-bound map, a refusal card for T6 `place`'s locus drop with the element picker and **Put it at {site}** — the first candidate with no hard fails of a `sites` query narrowed by the locus (`near` its target's anchor, `district` for `in`) — over reusing `refuse.dossierOwned` or bending silently to a site, because the dossier owns the roster (item 101), R2 needs a one-click lawful alternative, and one query keeps the canvas's and the clerk's offer identical |
| J-V9.89 | chose to give V10's `help` and `roster` entries their controls — **How do I …?** in the drawer's menu and in Help, **Ask the assistant to place these** under T7 `roster`'s box, each shown only with a clerk configured and on — and to draw the help answer's `useTool` as a button, over leaving the entries reachable only by typing in the drawer or running the tool unasked, because a declared entry without a caller is a dangling wire and no assistant action runs without the user's click (J-V9.34) |
| J-V9.90 | chose to have the skeleton import dialog run a finding's `propose` fix itself through the shell's pipeline, committed as the user's declaration with no `proposedBy`, clerk or none, over routing it to the harness, because the check must work without the model (V10 §3.21, T-V10-2), the critique engine is model-free, and `proposedBy: 'clerk'` would claim a model proposed what a rule row did; this is V10 §2.6's dispatch table's one exception |
| J-V9.91 | chose a `HostSlots.historyLines` list filled by the host and drawn as its own group "The party", over folding host lines into `HistoryRow` or a separate host panel, because `HistoryRow` is derived from the log alone (V09 §2.8) and a reveal is no log event, and one group at the head of the list keeps the log's rows, filters and undo untouched |
| J-V9.92 | chose, for every action that makes a new document in host mode, `HostSlots.newDocuments` — `'download'` writing the new `.plat` to the user's device and releasing it, `'off'` hiding the controls — and no creation mode in host mode, over hiding the actions outright or a host-side store operation for copies, because the owner's "everything editable" keeps a past state reachable, `.plat` is the user's format in host mode (V08 §5.4 (2)), the frame holds one live document (V08 §3.1 step 6) and a host-side copy would be a new capability across the SettlementForge boundary; Enter's Same kind, new seed and `refuse.restore.dossier`'s button are included because they too make a new document, and the toast is one sentence to keep V09 §4.9's rule |
| J-V9.93 | chose to give "Start a new map from this" a drawer-menu item and `attach.newMap` on `send`, standalone only, over deleting volume 10's clause and the "beside" path, because both volumes built that path and "everything editable" favours starting a new town without losing the current one, while in host mode the frame's document is the host's |
| J-V9.94 | chose `ClerkMount.rebuildEvents`, one implementation in the application that the history row and the harness both call, reading the tombstones with `admitAs` at the view's effective key, over the harness rebuilding the events from the tombstone itself or reading at the role's key, because V09 §4.20.3 (4) is the one source of those events and two implementations drift, `@plat/clerk` may not import `@plat/app` (V10 §2.1), and a thing the view's key withholds must not be rebuilt from that view (J-A30.82) |
| J-V9.95 | chose to give Build it again one row per kind file f item 260 suppresses — each the removed thing's own tool's declaration filled from its last record, file f item 467 widened to the fields the rows read — and a deck plot's re-add by `drawFootprint` at its slot, which V06 §3.19.3 (7) serves by its key, over keeping the raised-way-only form, because the base widened the suppressed kinds (J-VI.14) and a removal with no way back after a dependent edit breaks the owner's "add or remove"; `drawFootprint` because the base has no event that makes a bare plot and S11 fits a plot around a declared footprint (§7.1) |
| J-V9.96 | chose to split V09 §3.14's older-document row into §2.9's three outcomes — (a) inside the retention window the document edits under its own version and the owner is offered the upgrade by a standalone strip, in host mode by V08 §4.2's header control alone; (b) outside it with `model` the frozen view, whose one owner control **Edit it with this version** is the `frozenImport` rebase through `edit` and `confirm`; (c) without `model` **Open its recipe with this version**, a new document made from the file's recipe and log as §6.4 opens a link, under V09 §3.9's host rule in host mode — over one row offering an upgrade and "Open its recipe" for every older document, because the base separates the three (§2.9 steps 2–3, §7.5), a version outside the window can be neither upgraded nor replayed in the browser, the frozen view's one edit had no control, one event keeps one control in host mode (J-V8.94), and opening the recipe with its log keeps the user's changes by the path the base already gives a link, with §6.4's notice |
| J-V9.97 | chose to draw a frozen view's notice as the shell's own `error.frozen` strip in both modes, carrying its one control, over V08's banner slot drawing it in host mode, because that control commits an event of the document (the `frozenImport` rebase), which only the shell's pipeline issues, a slot-drawn notice beside it would show two notices or a control with no event path, and one shell in both modes is T-V9-28's premise; the banner slot keeps the players'-view strip and the held notice |
| J-V9.98 | chose to define `fileMenu: false` as keeping Export skeleton, Rebuild around my drawings, Settings and About and dropping New town, Open…, Save a copy and Recently deleted (their keys inert, Settings without its Storage section), over hiding the whole menu or a separate settings control in host mode, because the kept entries are an export, an edit (§7.2's rebase has no other control) and preferences the frame needs (`openSettings`, the `host.locked` fields), the dropped ones serve the local store host mode lacks (V09 §3.8 (6)), and one menu in both modes keeps T-V9-28's allowlist short |
| J-V9.99 | chose to give T7 `roster`'s list cards volume 10's `dossier` alternative — the element picker and **Put it at {site}** from T6 `place`'s `sites` query, `near` and `district` from the line's locus and omitted for a line with none — over the list's picker alone, because one engine refusal renders one card on canvas and clerk, J-V10.93 is a recorded decision grounded in R2's one-click lawful alternative, and T6 already carries the button |
| J-V9.100 | chose to word a locus as the exact reverse of V09 §4.16 (4) — the `rel`'s connective, "the {side} side of" for a side, the target's gazetteer name at the view's effective key — extending (4) to read the side form after any connective, and to write `refuse.roster.dossier` as "…on a plot {locus}" with the connective inside the slot and "in {settlement}" for a line with none, over "near {locus}" with a bare target name, because "near" would lose a locus's `in`, `on` or `at`, the round trip lets T-V9-13 test the wording mechanically, and a bare settlement name after "on a plot" is no sentence; the slots meet V10 §3.16's rule |
| J-V9.101 | chose **New trees** as T12 `dress`'s `rerollLayer { concern: 'render.instances' }`, town-wide and committed at once, over keeping the layer chips on T10 `hold`'s Try again or adding `rerollLayer` to T10's row, because §7.1's T10 row homes only the village track's re-roll (V10's J-V10.84 built on it), T12 already homes the display re-rolls (`style.compass`, `naming.emblem`) and V10's `DressInput.restyle` reaches any concern V09 §4.3's T12 row names with no change in V10; and `render.instances` over `style.crowns`, because the trees' positions, spacing and rotation are drawn from `render.instances` (§4.9, §8.10) while `style.crowns` is a sheet's crown library, a style's look — the concern also re-draws hedgerows and render-time field strips, display only, which is the base's own "trees" layer (§7.3 item 10) |
| J-V9.102 | chose the dwelling closure's ladder dug access → public opening → `collapsed_shaft` from the public ground over the cluster (file f item 372's note) → the bend onto ground part 0, over the bend as the third step, because file f item 372 keeps the user's homes below wherever any ground over the void is public, while the bend above ground — which item 101 R2 requires in place of the former refusal — is the floor only where no ground over the cluster is public and nothing over it can dig down |
| J-V9.103 | chose to split AP5 into AP5 (time, M6-E) and AP5b (host mode, M-SF), and to run T-V9-64 and T-V9-40's host clauses at M3c on the application harness's scripted host page and again at M-SF on V08's embed, over holding AP8's exit until M-SF or building part of the embed early, because V08 builds `embed.html`, `HostSlots` and its host harness in SF0, SF1 and SF6 at M-SF (J-V8.39; V08 §8.1), V10 tests its host seam at C5 on §11.3's bridge alone (T-V10-20), and the split keeps AP5b's estimate (0.25–0.5) inside the base line, since the host shell is priced with the shell, while AP5 lands with V06's E6 — `forkAt`, `rerunFrom`, the timeline bar and the history panel (V06 §8) — never ahead of the engine it drives, on the staged-screens line |
| J-V9.104 | chose to home the raised way's four context controls and a way's own `setAttr` (class, width, name, a bridge's kind) under T9 `shape`, over leaving them under T4 `road`, because §7.1's T9 row owns `setAttr`, V09 §4.1 sends a panel edit to the tool that owns its kind, and volume 10 encodes every `setAttr` under T9's `set` and `span` — one home tool per kind on both surfaces and in the history's attribution; T4 keeps `drawWay`; the way's own row moves with the four because it is the same kind under the same rule; and a way's `split` and `merge` — **Split here** and **Join these** — are T9's too, so every kind a selected way's controls emit is T9's |
| J-V9.105 | chose to reach V08's `supplyChains` view through the Show menu as one more `thematic` value, offered only while the gazetteer lists an active chain at the view's key, over a host-chrome toggle or an entry always listed, because thematic views are switched only by the Show menu (V09 §5.4), a standalone copy of a dossier-bound document keeps its records and so its view, and an entry that could draw nothing would be a dead control |
| J-V9.106 | chose to carry J-VI.4 (d), (e), (g) and (h) into V09 §4.20.2 (6) and the island rows, adding `bend.aqueduct.onIsland`, and to keep J-V9.76's inward-move geometry (every rim-strip point along the radial to 1 m inside the `setback` line) as the dry run's rule asked of volume 5, over leaving the island rows as refusals with offers and the distance unstated, because T-V9-52's text and J-VI.4 decide the island bends, one key per bent result keeps each line true (an aqueduct cut short at the rim is not one turned into a fountain), and V05 §3.22 (4) says "inward past the rim walk" without a distance an implementer could build |
| J-V9.107 | chose to form a dossier group from a `dossierFacts` event and the port's `host:port` events that follow it, up to the next ledger event or another session's event, with `HistoryRow.dossierGroup` derived from it, over reading `EditEvent.group` as the seam issue's text had it, because V08 §3.6 step 6 gives the port's events no `group` (C8-15; J-V8.59) and commits an absorb, or a creation's prefix, in one run, so the session and the next ledger event bound the group exactly; and chose the creation head for a ledger event that is the log's first, since a creation's prefix opens with one (V08 §3.6 step 4) |
| J-V9.108 | chose to resolve a note's binding keys by a new `entity` input `dossierKey` (file f item 583) over having V08 store addresses in `PortNote.keys` or the panel scanning every entity's `EntityCard.dossierKey`, because the notes are stored by binding key for byte identity across editors (V08 §2.4), one band-less read per key keeps admission under `admitAs` like every other read the application makes (V09 §2.7), and a scan would cost a query per entity |
| J-V9.109 | chose to word the report's "What moved" entries and its placement states as catalogue families (`report.moved.<kind>`, `report.dossier.<state>`) over words composed in the panel, because the history's dossier lines now render the same entries and T-V9-15's rule is that no engine code reaches a user without a row; the words are our own, one sentence each |
| J-V9.110 | chose to read **New names — this quarter**'s gazetteer with `admitAs` = `effectiveKey()` over the role's key, because V09 §2.7's band-less read rule (J-V9.86) already sends every `gazetteer` read with the view's effective key, volume 10 reads the same scope with the session's effective key (J-V10.95) so the two surfaces write the same bytes, and a name View as withholds would otherwise be re-drawn out of the user's sight; with View as off the two keys are one. The scope is the quarter and every row not marked withheld whose district it is, `ids` in address order |
| J-V9.111 | chose `refuse.assignment.noSite`'s **Put it at {site}** as the same declaration at the refusal's first `moveTo` target — an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` — over one `placeAt` for both, because a refused new assignment has no element yet for a `placeAt` to pin, while a `rejectSite`'s element exists and keeps its rejection; the marked places are the refusal's `moveTo` actions, the channel the base's F-EDIT already fills |
| J-V9.112 | chose **Use another building** as a re-preview of the declaration grouped after an explicit `addUndergroundAccess` from the next qualifying building, the buildings listed by the dry run in `PreviewResult.alternatives` and the access's target defaulted by file f item 372's grouped-access rule, over an exclusion field on the declaration or the application naming the target element, because only the dry run knows which buildings qualify and which element each measures from, the events stay the base's, and the clerk's `propose` carries the same bytes (V10 §3.16); and removed "Dig from a building instead" from the opening's bend, because steps 2 and 3 run only when no building qualifies |
| J-V9.113 | chose to draw V08 §4.6 item 3's `info.raised.suppressed` line from a per-epoch list on V06's `EpochReport.raised` (`suppressedFired`) over a `why` read per removed way, because the epoch report is already the panel's read for an epoch (V06 W19), `raisedOutcome` answers one subject at a time (file f item 290) and would query every removed way at every epoch, and the report's `suppressedHeld` count names no removal to Show |
| J-V9.114 | chose a key argument on `HostSlots.historyLines.list` — the shell calling `list(effectiveKey())` each time it draws the group and re-listing on each `onChange` and each `onEffectiveKey` — over handing `effectiveKey` and `onEffectiveKey` to the embed's bridge handler or letting the handler compute its own key, because V09 §2.10 makes the shell's computation the only one and hands it only to the clerk slot, the shell already re-draws its panels on `onEffectiveKey` (V09 §2.7), the View as menu is the shell's and the handler would never see it change, and a provider that is given its key keeps no View-as state of its own |
| J-V9.115 | chose one **New decoration** control writing `style.jitter` then `style.crowns` as one group, over two controls or folding `style.crowns` into **New trees**, because the base's own word for the pair is "decoration" (§7.4's `rerollLayer` row), J-V9.101 fixed New trees' bytes to `render.instances` alone (which volume 10's `restyle` encodes), and one plain button suits the owner's reader; the group's history is one row, and volume 10's `restyle` takes the same group as one value, `'decoration'` (V10 §4.1's T12 `dress` row; J-V10.99); found beside it, the `rerollLayer` template gains "New emblem" and "New compass", which the two buttons wrote with no words of their own |
| J-V9.116 | chose to render the `{ id }` arguments of the report-entry lines and of the report panel's two lists by band-less `entity` reads at `effectiveKey()`, a withheld address shown as its `kind.<registry kind>` word and left out of the line's targets, over the role's key or dropping the line as a withheld note line is dropped, because V09 §2.7 makes every band-less read speak for its view, a report entry says that something changed (which the viewer may know) while its name is the secret, and the kind word is how the gazetteer and the why card already show a withheld place; V09 §2.9's `MsgRef` comment now separates the engine-built messages (the caller's key, the role's for the application's own dry runs, J-V9.86) from the lines a panel builds (the view's key) |
| J-V9.117 | chose to read the dwelling closure's way in and the epoch's fired suppressions at their homes — V04 §3.8's closure and V06 §2.10's `EpochReport.raised.suppressedFired`, filled by V06 §3.19.3 (2) — cited and never restated, because each owner states its mechanism once |
| J-V9.118 | chose to give `bend.under.accessDug`'s alternative a catalogue list form, "Dig down from {building} instead", beside the canvas's stepping **Use another building**, over volume 10 joining that button's text with a building's name, because a card that shows every alternative at once needs one label per building, a joined label is a line no catalogue row holds (V09 §4.9's one-source rule; a locale could not reorder it), and `{building}` is read at the reader's key as every other slot is (the canvas's dry runs at the role's key, J-V9.86; the clerk at its session key) |
| J-V9.119 | chose to cite the raised-way reading as `RaisedOutcome`'s reason key (`key`, V06 §2.13's `RaisedReasonKey`) with its `declared` outcome and V10's `raised[].reason`, over a `RaisedOutcome.reason`, because V10 §2.13's type names no field `reason` and a citation must name a field its target holds; and to carry the drawer's companions to three places — V09 §2.10's viewer sentence and V09 §4.11's *Knowledge and roles* (`refuse.viewer`, `clerk.view.cleared`) and the card-only drawer's stale card (no **Ask again**, since V10 §2.6's host card offers no `retry`) — because every key V09 §4.9's table loads needs a place the drawer draws it (the one-source rule; the wiring standard) |
| J-V9.120 | chose to cite V10 §3.5 step 3's *The why target* for the canvas's **Show me why** (V09 §4.9's opening rule) over keeping this volume's looser wording beside it or moving the rule here, because volume 10 wrote it once for both readers with each one's key (the canvas's the role's key, J-V9.86; the clerk's its session key), the canvas and the clerk must open one card or page for one row (T101-3), and a second statement could drift (the one-source rule); the canvas's build (AP3) implements the rule from that text |
| J-V9.121 | chose the typed button list (`MsgRow.buttons?: MsgButton[]`, the words in a shared `button.*` family, V09 §4.9's button column written as the list, every `refuse.*` row ending with `button.showWhy`) and to add five things its interface lacked, each because a row needed it to be data rather than prose: a sixth class `app` for the buttons of application-only rows (downloads, reloads, the frozen and mismatch choices, restores, shares, the key and cap lines, View as) — commands that are neither a map commit, a why, a selection, a tool nor a withdrawal — never on a row a dry run answers, so the clerk's five-way mapping stays whole; `event` naming one of 21 event forms written once in V09 §4.9, so "the one event the row names" is data both cards build byte for byte; `each`, the list form J-V9.118 already gave the dug-access alternative, extended to **Choose another of the marked places**; `when` for the `[owner]` and `[names]` conditions the prose carried; and `command` naming one of 24 application commands. Also chose to key a `ConflictAction`'s `msg` (file f item 463) as the button that carries it, over a second wording beside the row's, so file f item 463's field keeps its consumer and the clerk's "a dry-run action's own message" label equals the canvas's words; **Move it** as a `show` (the canvas moves a selection by dragging, V09 §4.6); and locale files that carry `text` only, so a translation cannot change what a button does |
| J-V9.122 | chose volume 6's bend over V09 §3.9's disabled control: below a rebase point every copy and re-run — the history and chronicle rows, the restore points and the drawer's `fork` and `rerun` — takes the earliest seq with V06 §3.15.5's line as `info.copy.condensed`, loaded from volume 6 like volume 10's families, and the app detects the bend from the new document's `forkedFrom.seq` exceeding the seq asked rather than from a new return field, because V06 §4.4 already records that header and a second channel would restate it (J-V6.98; the one-source rule) |
| J-V9.123 | chose to withdraw two buttons found unwired rather than invent a source for each: `bend.capacity`'s "Show larger buildings nearby" (no query or preview field names buildings with room — file f item 463's `alternatives` are a placement's plots — so the row offers **Show me why**, whose why card shows the building's capacity) and `success.saved`'s "Show" (a page cannot reveal a saved file on the user's device); and, beside them, to give `refuse.stale` **Show me why** and put `refuse.undo.dossier`'s **Show me why** last, as the rule made data requires, and to read `bend.place.noSite`'s other sites as `PreviewResult.alternatives`, as file f item 582 bends them, not as `moveTo` actions |
| J-V9.124 | chose to name tool modes by a rule — each mode's name in its row in lower camel case, T9 `shape`'s contextual modes by what is selected — with the ids the buttons open written out (T6 `place`'s `access`, T9's `tiers` and `massing`, T11 `name`'s `rename`), over a separate id table, because `toolkit.json`'s rows already carry the names; and to state the why page's id forms, `messages#<key>` for a row and `staged/<layerId>` for a staged layer (generated by `@plat/docs` from the base's staged table), because V10 §3.5 step 3's target rule and `refuse.staged`'s `page` need an address both cards open and T-V9-32 can walk |
| J-V9.125 | chose to scope the roster reader and T6 `place`'s stamp palette to the classes the document's rung admits — the town-and-city, sky and generic rows at a base rung; the `v.` rows, the self-playing town-and-city rows and the generic rows at a village rung, a row with a `villageForm` answering through its `v.` row — with ties by `commonness` inside that set and a `v.` row first at a village rung, over one match across both namespaces with a tie on `commonness`, because volume 11 makes a label unique only within its namespace (45 words shared by script), the two `commonness` cells mean different shares (TOWN over about 180 rows, VILLAGE over 25), and a village class declared on a town map is a wrong declaration the user never asked for. |
| J-V9.126 | chose an English-only argument form `{a slot}` for the indefinite article, its rule written once in V09 §2.9, with each locale writing its own grammar in its `text`, over an article in every template or a per-locale article table, because the article depends on the slot's first sound and only English's rule is ours to state; V08's templates carry no article |
| J-V9.127 | chose to drop the untouched empty-state town when a creation proposal replaces it — no local record, no Recent entry — over writing it to Recent as a recipe-only record, because it holds no declaration of the user's (V09 §3.2) and one rule for every way the empty state is replaced (Enter, Surprise me, a proxy, T1 `intend`, the clerk) is simpler than two; V10 §4.2 (3) reads the same (a cross-part note) |
| J-V9.128 | chose to put **Colour vision** in the view bar's Map group and in Settings' Accessibility section, the view key per viewer and a machine default `AppPrefs.cvdDefault` for towns that hold none, over a per-town setting only or a machine setting only, because a person's colour vision belongs to the person across towns while a shared town's viewers differ, and item 112 (a) asks for a view setting |
| J-V9.129 | chose to word a hand design above the grandeur ceiling from the shell's own read of the ceiling table against the draft's events, with the building's why card carrying the same line, over a new dry-run field, because the ceiling is a table the application can read as it reads a deck's budget, the edit is honoured and nothing is bent, and a base field would restate what the table and the events already say |
| J-V9.130 | chose a week slider with the four season chips at their middle weeks and a **Follow SettlementForge** switch that any manual pick turns off, over a four-way season chip, because item 117 (b) makes the season a week of the year and a pick against the campaign's week must not silently snap back at the next absorb |
| J-V9.131 | chose to name the progress view's stages by thirteen groups, a volume's main-phase stage taking the group of the base stage before it in the registry's order and every tail stage `below`, over one row per stage id, because a user reads "laying out the streets", not a stage id, and every registered stage then has words without a volume writing any; the strip names what is running and never a finished map before it is (§8.5) |
| J-V9.132 | chose the History chip's standalone form as a peak rung and an age, over offering destruction and refounding by hand, because item 113 names the standalone option "once a city, now a village" and a destruction is the dossier's or the replay's event, not a blueprint choice; `history.defaultAgeYears` (300) is our own and calibratable |
| J-V9.133 | chose to offer T2 `ground`'s **Spring-fed (oasis)** toggle on every ground site and hide it on Sky, over offering it on arid sites only, because item 111 (d)'s "oases only on arid sites" binds generation — "unless drawn or supplied" — and an island's water is V05's |
| J-V9.134 | chose to offer only robust repair on a `worn` or `patched` run and the patch rows on a `breached` run, over every material on every run, because V06 §2.8's `repairWall` turns a breach into a patch and a worn or patched run robust into standing, and a patch over a wall that still stands is not a transition the ladder has |
| J-V9.135 | chose to state every mechanism's limits in one table, V09 §3.16, with one scripted suite, T-V9-80, over scattering them through the sections, because an edge is checked by the same harness whatever its mechanism and one table shows a missing one at a glance; each row names its home section |
| J-V9.136 | chose V02 §1b's bend ids as the one set of the massing bends — retiring this volume's `bend.tiers.flights`, `bend.stack.internalSolid`, `.removeStair`, `.addWing`, `.deck` and `.notStepped`, the event form `giveTiers` and the buttons `button.giveTiers`, `button.changeStairs` and `button.plotsOnLand` — over keeping two sets, because the producer of a bend owns its id and a key no producer emits is a row no user can see (V09-XAGREE-3) |
| J-V9.137 | chose to journal `advance` as one entry — its request, and the count of epochs where Stop ended it — re-issued at recovery from its `logHeadBefore`, with a compaction at once after its `done` write, over journalling its `epoch` events or leaving it to the idle compaction, because the epochs are the deterministic result of the request at its head (§6), no API call appends `epoch` events but the request itself (V06 §2.3), and the at-once compaction leaves only a kill inside that compaction to the re-issue, so a century of history is never lost silently (V09 §3.8) |
=== END ===

=== REPLACE ### 10.1 Requests to the base ===
### 10.1 Requests to the base

Every base change this volume needs is applied in the base as a file f item (ID-BCR); this volume cites the base's text
and restates none of it. The former request ids stay here only as a pointer table, so an older citation resolves.

| former id | subject | applied as | base home |
|---|---|---|---|
| BCR-V9-1 | the reference UI's contents in `@plat/app` | file f item 514 | §14 |
| BCR-V9-2 | the walls control (a three-way chip) and the keymap's rows | file f item 515 | §14's per-tool table and input scheme |
| BCR-V9-3 | the view keys `thematic`, `workingLayer` (ground, a sky island's `PlatKey`, or the underground, its band the view key `depthBand`; V09-XCONF-1) and `restore/<id>` | file f item 277 | §2.9 *View state* |
| BCR-V9-4 | map-side siting declarations on `Use` | superseded by J-V9.36 (volume 11's tables, file f item 380) | — |
| BCR-V9-5 | the `links` query kind (item 105 (j)) | file f item 460 | §11.2 |
| BCR-V9-6 | a second why-answer type | superseded by J-V9.33 (volume 10's `WhyAnswer`, file f item 468) | — |
| BCR-V9-7 | the live layers `live.shade`, `live.links` and the model view's field driver | file f item 411 | §8.2 |
| BCR-V9-8 | the application's tables (`toolkit.json`, `messages/`, the keymap rows) | file f item 516 | §14's `@plat/tables` |
| BCR-V9-9 | the feature snap by role | file f item 517 | §14's `RoleIndex`; §9.5 |
| BCR-V9-10 | variations through the preview, and their thumbnails | file f item 461 | §11.2; §7.3 item 10 |
| BCR-V9-11 | the wall's arcs in its preview | file f item 462 | §11.2 |
| BCR-V9-12 | message keys in the preview, and placement alternatives | file f item 463 | §11.2; §5.2 |
| BCR-V9-13 | a wall stretch's grade as an edit | file f item 360 | §7.1 |
| BCR-V9-14 | an export's knowledge tier, lowered only | file f item 453 | §11.1 *Knowledge* |
| BCR-V9-15 | the tabletop scene's four details | file f item 454 | §11.1 |
| BCR-V9-16 | a quarter's target size and the badge's plus and minus | file f item 348 | §7.1; §9.5 |
| BCR-V9-17 | when the first-five-minutes sessions run | file f item 494 | §13.4 |
| BCR-V9-18 | the application's pricing | file f item 530 | §16 |
| BCR-V9-19 | a label and a help anchor per edit path | file f item 269 | §2.8 |
| BCR-V9-20 | the hidden-voids view key and its knowledge rule | file f items 278 and 413 | §2.9; §11.1 |
| BCR-V9-21 | a chamber that starts a system; the catacomb bend ladder | file f item 361 | §7.1; §7.3 item 9 |
| BCR-V9-22 | dwellings in a sealed void as a closure | file f item 372 | §7.3 item 9 |
| BCR-V9-23 | View as as a display filter | file f item 464 | §11.2 |
| BCR-V9-24 | the editor's sittings in the milestone record | file f item 490 | §13.3 |
| BCR-V9-25 | the wall layer's whole circuit | file f item 413 | §8.4 |
| BCR-V9-26 | item 110's events | file f item 362 | §7.1 |
| BCR-V9-27 | a preview's effects | file f item 465 | §11.2 |
| BCR-V9-28 | the hit stack | file f item 466 | §11.2 |
| BCR-V9-29 | a raised way and a town wall | file f item 363 | §7.1 |
| BCR-V9-30 | a long bridge's mid-span landmark slot | file f item 246 | §2.7; §4.7 S10 |
| BCR-V9-31 | item 110 in the formats (with the one VTT rule of V01-XCONF-2: a retaining wall joins `line_of_sight` where its step is at least `vtt.retainingMinCm`, broken over stairs and ramps; the supports' footprints as cliffs) | file f items 447 and 448 | §11.1 |
| BCR-V9-32 | removals in the skeleton | file f item 455 | §11.1 |
| BCR-V9-33 | a crossing's form and a raised way's measures | file f items 364 and 244 | §7.1; §2.7 |
| BCR-V9-34 | a removed thing's last shape | file f item 467 | §11.2 |
| BCR-V9-35 | a place by a locus is T6 `place`'s one-line roster | file f item 570 | §7.1 |
| BCR-V9-36 | an entity by its binding key | file f item 583 | §11.2 |

Other volumes' requests this volume reads are cited by their applied items where they are read (file f items 245, 260,
270, 353, 358, 359, 366–368, 380, 390, 399, 402, 410, 458, 468–470, 472, 473, 507, 571, 572, 582). Items 111–119 of file g
are applied to the base at their homes (V09 §1.3); this volume holds their screens (V09 §4.21, V09 §7.6).
=== END ===

=== REPLACE ### 10.2 Cross-volume requests (to the siblings; not base changes) ===
### 10.2 Cross-volume requests (to the siblings; not base changes)

Each row is closed at its destination, or ruled there by the canon; the validation records keep each row's history.

| id | to | what this volume needs | where it lives |
|---|---|---|---|
| XV-V9-1, XV-V9-2 | V11 | `siting.declared`'s key forms `uid:`, `cat:`, `cls:`, `use:` and the cells each admits; `siting.linkEdits`' `{ bindTo?, avoid?, cut? }` with their three meanings | V11 §4.2, the union V09-XAGREE-1 rules; V09 §2.6 cites it |
| XV-V9-3 | V04 | `showUnexcavated` a per-viewer view key, never a `LayerSpec` field | V04 §1b, V04 §2.6, V04 §5.1 |
| XV-V9-4 | V04 | the fact `under/wayIn`, the burial face's `why` path `catacomb`, the access symbol by `cause.rule`, the closures of file f items 361 and 372 | V04 §4.1, V04 §4.5, V04 §5.2 (7) |
| XV-V9-5 | V03 | the crypt-edit dry runs of V09 §4.17.5 (e) | V03 §3.7.4 (the rank cap `crypt.rankShare`; V09-XAGREE-2) |
| XV-V9-6 | V02 | nothing beyond V02 §3.14.5, V02 §4.5 and V02 §4.6, which this volume cites | — |
| XV-V9-7 | V10 | `createClerk(mount)` → `ClerkHandle`; `DraftItem.bent` a `MsgRef`; the merged texts of file f items 461, 463 and 348 | V10 §2.4, V10 §2.6, V10 §3.1 |
| XV-V9-8 | V04, V05, V10, V02 | AP6, AP7, AP8 and AP10 built with their staged milestones (AP5 with V06's E6) and priced on §16's line of the application's staged screens, outside those volumes' totals | §16's staged-screens line; V04 §8, V05 §8, V10 §8 and V02 §8 name the step each lands with |
| XV-V9-9 | V07 | the palisade's circuit reads `LayerSpec.showCircuit` | V07 §5.1 |
| XV-V9-10 – XV-V9-12 | V10 | file f item 362's shapes in the encoders; the effects on the proposal card; the retaining, terrace and raised-way readings | V10 §2.6, V10 §2.13, V10 §4.1, V10 §5.4 |
| XV-V9-13 | V11 | the `terrace` table's cells, `deck.landmarks/bridgeMid/minSpanM`, the `raisedWays` `says` rows | V11 §3.24.1, V11 §3.24.2, V11 §3.24.4 |
| XV-V9-14 | V04 | an arch vault records its raised way and span | V04 §3.5.4 (`archVault`) |
| XV-V9-15 | V03 | the crypt ladder for `setAttr(basement/crypt/ring)` on a building without a basement | V03 §4.2 |
| XV-V9-16 | V05 | `delete` is T10 `hold`'s; the island and rim cases are bends with V09 §4.9's rows | V05 §1b, V05 §2.1, V05 §4.2 |
| XV-V9-17, XV-V9-20, XV-V9-21, XV-V9-24, XV-V9-26, XV-V9-29 | V08 | `ClerkMount.host` and `HostSlots` filled by the embed; the players' view; the host's history lines and `newDocuments`; the frozen notice's strip; the gazetteer's chains; the per-key line cache | V08 §3.1 step 7, V08 §3.8, V08 §3.14 (5), V08 §4.6, V08 §5.1, V08 §5.2 |
| XV-V9-18, XV-V9-19, XV-V9-22, XV-V9-30 | V10 | `ClerkHandle` everywhere (E-33); the dispatch table's application-run kinds; `rebuildEvents` and `attach.newMap`; the reading of `MsgRow.buttons` | V10 §2.3, V10 §2.6, V10 §3.1, V10 §3.5 step 3, V10 §3.16, V10 §3.17, V10 §4.3 |
| XV-V9-23, XV-V9-28 | V06 | Build it again's serving re-adds; `EpochReport.raised.suppressedFired` | V06 §2.10, V06 §3.19.3 (2), V06 §3.19.3 (7) |
| XV-V9-25 | V05 | the rim stroke's inward move to 1 m inside the `setback` line | V05 §3.22 (4) |
| XV-V9-27 | V04 | the dwelling closure's way in and its alternatives | V04 §3.8 |
| XV-V9-31 | V11 | the `messages` registry row types `en.json` as `MsgRow` and every other locale as `{ key; text }`, its loader refusing a locale carrying `buttons`, `tone` or `codes` | V11 §3.1's registry |
| XV-V9-32 | V10 | a creation proposal replacing the untouched empty-state town drops it, with no Recent entry (J-V9.127) | V10 §4.2 (3) |
| XV-V9-33 | V10 | the size words name V09 §4.5's quantiles, never a population number (V10-XAGREE-3) | V10 §3.3 |
| XV-V9-34 | V06 | `downgradeWay`, `upgradeWay` and `repairRaised` on T9 `shape`, as §7.1's binding homes them | V06 §4.2 |
| XV-V9-35 | V11 | a `label` cell on each `walls.patchMaterials` row (the Material chip's words) | V11's `walls.patchMaterials` |
=== END ===

=== REPLACE ## Integration notes ===
## Integration notes

The integration lane's rulings for this volume (`docs/volumes/_integrate.md`) are folded into the text at their homes:

| ruling | where it lives |
|---|---|
| J-VI.1, J-VI.23 — the handle kind `towerResize` (clean room) | V09 §2.5; V09 §3.5 |
| J-VI.4 — the island, aqueduct, rim and massing cases are bends; the refusals left are availability gates | V09 §4.9; V09 §4.20.2 (6); V09 §4.20.5 (4); V09 §4.20.9; J-V9.67 |
| J-VI.2, J-VI.3 — the raised-way reasons `drop`, `link`, `water`, `declared`; the closure arcs' barrier kinds | V09 §2.7; §11.2's `PreviewResult.arcs` |
| J-VI.5 (V02 X21) — T9 `shape`'s tier shape, skirt and solid chips, the Sealed stair, the shrine-inset, centre and radius handles; V02 §1b's bends worded | V09 §4.20.5 (1); V09 §3.5; V09 §4.9 |
| J-VI.17 H5 (V02 X10) — the `FM` building look; `setComposition room`, the secondary porch and `moveTower { shape }` on T9 `shape`; `fantasyShapes` in the advanced panel | V09 §5.7; V09 §4.3; V09 §4.14 |
| J-VI.17 H23 — a span's `use` and a ruin monument's count on T9 `shape` | V09 §4.3; V09 §4.20.6 |
| J-VI.17 H24 (V12 X-V12-6, X-V12-8) — the cell inspector and the historical packs; the K2 fixture's list and path | V09 §4.14; V09 §7.2 |
| J-VI.8 — `deck.landmarks/bridgeMid/minSpanM` is volume 11's cell | V09 §4.20 |
| J-VI.17 — `ClerkHandle.send`'s five entries | V09 §2.10 |
| J-VI.14 — one suppression mechanism for every removal of generated content | V09 §4.20.3; V09 §4.9's `info.remove.holds` |
| J-VI.18 — file f item 447's GeoJSON names for both variants | V09 §5.10; file f item 447 |
| J-VI.22 — V04's milestone M6-U; M6c stays V02's | V09 §7.1; V09 §8.1 |
| J-VI.27 — the Deck height and Arch spacing steppers edit file f item 244's held fields | V09 §4.20.6 (6) |
| J-VI.30 — `bend.place.noSite`, `bend.place.overBudget`, `bend.vacate` | V09 §4.9 |
=== END ===
