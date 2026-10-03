# Design volume 9 — The application: the map editor a casual user opens, and the authoring toolkit as screens and flows

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V9-application, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the application `@plat/app` — the standalone editor and
the shell that V08's host mode runs on — over the base (`docs/ARCHITECTURE.md`, with files f and g applied:
`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`). The implementer holds the base and this volume and
the sibling sections cited, and nothing else (§17.1). Every fact the base or another volume states is cited, never
restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n` is a design
volume's section, this one included (`V09 §4.3`); a list after a volume prefix stays in that volume (`V04 §3.5,
V04 §3.10`); `item n` is an amendment item — items 1–101 the owner's instructions, 102–119 file g's owner and program rules,
200 and above file f's, each the applied text of a volume's base change request (V09 §10 lists this volume's); `J-VI.n`
is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V9.n`
(V09 §9), tests `T-V9-n` (V09 §7). **Words.** Every word the application shows a user is quoted here in "double quotes"; those
strings are the message catalogue's English rows (V09 §2.9), data, not code; English is the catalogue's source language,
and which locales ship follows SettlementForge (J121). **Clean room.** Nothing here is taken from a reference program's
code, word lists, palettes or screens: the reference generators' and the surveyed tools' behaviour enters only as
described behaviour, cited by file and section (`research/ux/tool-survey.md`, `research/findings/visual-spec.md`); the
application's colours, words and layout are our own (§17.1). **Names.** The toolkit's layers are always written with
their word (L0 INTENT … L4 FINISH, §7.1); a bare L0–L4 is a refinement level (§2.2). A tool is written with its word at
first use in a paragraph (T8 `fill`); a base bar group always with its number (T101-1), never a bare tool id.

## 0 In plain words

**What a person sees when they open it.** A finished town, already drawn, filling the screen — never a blank page or a
form. One quiet line sits over it: "Change anything: click it." A small strip along the bottom offers six other towns to
try, and a dice button makes a completely new one. Everything else waits until it is wanted.

**How changing it feels.** Down the left side is a short column of tools, grouped the way a town is thought about: what
kind of place it is (its site, size, wealth and walls), its ground and bones (hills and rivers, walls, roads, quarters),
what is in it (named places, a pasted list of places), its fabric (denser here, a garden there, this house shaped
just so, this corner kept) and its finish (names and the look). At first only four tools show — change the town's
kind, paint a quarter, drop a place, dress the map — and the rest appear the moment they are useful. Whatever you do
with a tool, you see the result before it happens: a pale "ghost" of the new quarter, road, wall or house appears
under your hand within about a fifth of a second, with a little badge that says how many plots, households and
buildings it will hold, and handles you can drag. Nothing is final until you let go or press accept, and even then one
press of undo takes it back. If what you ask cannot be done exactly, the program does the nearest thing it can and
says so in one plain sentence ("The wall follows the ridge; it was 40 m off your line"), with the other lawful options one
click away. It holds back only where it honestly cannot do what you ask: a fact a SettlementForge record fixes, something
you locked, a change another person's later work depends on, or a drawing tool on a screen too small for it. Even then it
says why in one sentence and offers at least one thing it can do instead.

**Your work is never lost.** Every change is saved the moment you make it, on your own computer, with no account and
no internet needed. A history panel lists every change in plain words ("Painted the Tanners' quarter", "Moved the
north gate") with its time; you can step back to any point, name a point to come back to, or open a copy of the town
as it was. Things you declared — a quarter you painted, a tavern you placed, a wall you drew — stay put: when you ask
for "a different version of this block" or "new trees", everything you made is kept and only the rest changes, and
the program shows you three versions side by side to choose from.

**Seeing why.** Click any building and ask "Why here?": the program lists what pulled it there — the market it sells
to, the mill that supplies it, the river it needs, the garrison a thieves' den keeps away from, the morning shade of a
floating island — and shows the other sites it considered. A "shade" view paints how much of the day each street lies
in shadow, and a "supply" view draws the lines between each workshop and the places it buys from and sells to; you
can pin, redirect or cut any of those lines, and the town keeps your choice from then on.

**Below the streets.** The underground has its own layer: sewers, catacombs, caves, old quarries and the ruins of an
older town that stood here before. Some caves and ruins lie sealed, and nobody in town knows of them; the game master
alone can switch on "Show hidden caves and ruins" and see them drawn faint and dashed, while a player's view never shows
them — and a place whose last way in has closed is shown to the game master the same way, marked as once known. Click
any way down and it says how it came about ("The Old Mill dug a way down when it was built", "A sinkhole opens here",
"The sewer broke into it in year 40") and can light up the whole path in from the street. People only live underground
where there is a way in: if you draw an underground quarter in a sealed cave, the editor digs a way down from the nearest
house and tells you so. Catacombs lie under cemeteries and grow, never shrink; when they cannot grow, their ossuaries fill
instead, and the catacomb's card says why. Churches have crypts, and the cathedral always has the largest.

**Terraces, raised roads and houses on the harbour wall.** On a hillside you can brush a terrace: the ground under the
brush is levelled and a retaining wall runs along its edge, and wherever a street crosses that wall it climbs by a stair
or a ramp. The road tool's "Raised" switch draws a raised road, a viaduct or an aqueduct: it passes over the streets below
without meeting them and comes down to the ground by stairs or ramps at its ends. A city also builds a few by itself
where there is a reason — a ravine to cross, two hilltop quarters to join, water to bring in — and each says why. You
can remove any of them: the program first shows what else changes (a road that now goes round, streets that now meet, a
fountain that runs dry), and once you accept, the town never rebuilds it — not in a new version, not as the years
pass; undo brings it back. Under a viaduct, click again to reach the street beneath. Stepped temples and terraced
palaces have controls for their tiers, and moles, jetties and bridges carry small houses, with a tower or a fort at a
mole's head or middle.

**Water, walls, grandeur and history.** In dry country the ground tool's lake can be spring-fed: an oasis, with its grove
and gardens, and the town leans toward its water. A wall repaired by hand is repaired in stone or patched in timber, wattle
or earth, and the legend names each state a wall can be in. A small place is not grand: a hamlet's houses stay farmhouses
however rich it is, but anything you shape or place by hand keeps the design you gave it, and the program says it is
grander than such a place usually has. A town can be made with a past — "once a city, now a village" — and the map shows
what that past left: walls beyond the houses, old street lines, a church too big for today.

**Seeing it your way.** Anyone who sees colours differently picks their colour vision in the view settings, and every map
colour that means something also has a pattern, a line style or a label. The map never zooms out past its own land, so
even a hamlet fills the screen. The map dresses for the time of year — ice on the millpond in a cold winter, the woods
every shade of autumn — following SettlementForge's calendar or the week you pick, and when a festival is on its streets
are hung with bunting and banners; none of this changes the town itself.

**Nothing keeps you waiting long.** A new town, a big change, a town opened from SettlementForge or an export is done
within ten seconds, and any wait longer than a second shows what is being made — the ground, the streets, the houses —
with the map filling in, never an empty screen. Moving around the map, dragging and undoing stay instant.

**Getting it out.** One export button offers pictures (screen, poster or print size), a virtual-tabletop scene that
arrives in the game already walled, lit and on its grid, GIS data, and 3-D models; each shows its size and a preview
before it writes, and none of them changes the town. Sharing gives a link when the town can be rebuilt from one, and
otherwise the file.

**On a tablet or a phone.** A tablet gets every tool with touch (press and hold opens the menu that a right-click
opens). A phone is for looking, naming, placing things from a list, dressing and exporting; the drawing tools that need
precise handles wait for a bigger screen, and the phone says so where they would be.

**The assistant.** An optional assistant, clearly labelled as AI and off until you open it, can take a sentence like "a
walled harbour town with a temple quarter" and propose it as ghosts you accept or refuse, answer "why is this here?",
and check a plan for mistakes. It never draws pictures and never changes anything by itself. Inside SettlementForge it is
SettlementForge's own assistant, set up the way SettlementForge sets up its AI (J121): the map only shows its proposals and
its answers. Where a deployment offers the built-in assistant, it says the first time, in plain words, what it sends and
to whom, before anything is sent; every answer shows what it cost, and it stops at the spending limit its configuration
sets. (How it thinks is volume 10's subject; this volume is its drawer on the screen.)

**How we will know it works.** Before each editing milestone closes, five SettlementForge users who have never seen it
get a finished town and must, without help and within five minutes, paint a named quarter, put a named place near a
landmark, restyle the map and add a compass, and re-roll part of the town while keeping what they made. The owner does
the same tasks at a recorded sitting. Before the public release, ten to twenty SettlementForge game masters use the map on
their own settlements for at least two sessions of play and report what they found. A known-city test builds a whole
original city with the structure of a famous fantasy map three ways — typed as a file, drawn by hand in the editor, and
dictated to the assistant. The file and the hand-drawn town must come out identical, and the assistant's version must have
the same structure. A second known city — a port on a headland with terraced quarters, a harbour mole with its towers
and a raised road — is built the same ways (V09 §7.2).

## 1 Scope, the base hooks consumed, and what is out of scope

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
9. **The other volumes' screens** — volume 10's drawer view model, data notice, usage meter, settings, creation preview,
   import critique and transcript export (V09 §4.11, V09 §3.12, V09 §5.10, V09 §5.12); volume 6's "Re-run from here",
   chronicle and use-history tables, animated history and history import (V09 §3.9, V09 §3.12, V09 §5.10); volume 2's
   massing handles and family strip (V09 §3.5); volume 5's shade strips and "Update shade now" (V09 §5.4); volume 7's
   whole-circuit view (V09 §5.4); volume 1's coverage and voids views (V09 §5.4); and the base's view keys, people search,
   family tree, clock, notes, pins and ruler that no other volume places (V09 §4.18, V09 §4.19).
10. **Item 110's tools** (V09 §4.20; J-V9.58) — T3's **Retaining wall** mode and T2's **Terrace** mode (V09 §4.20.1); T4's
   **Raised** toggle and **Aqueduct** chip (V09 §4.20.2); removing a generated raised way, and building it again
   (V09 §4.20.3); T6 on deck faces and at a mole's landmark slots (V09 §4.20.4); T9's tier controls (V09 §4.20.5); the panels,
   handles, span and crossing controls and why lines of the new records (V09 §4.20.6); what else a change does, in words,
   on every preview (V09 §4.20.7; file f item 465); reaching what lies under a raised deck (V09 §4.20.8; file f item 466);
   item 110 on the Sky layer (V09 §4.20.9); the item-110 exports (V09 §5.10; file f item 447); an author's removals in the
   skeleton (V09 §3.12; file f item 455); and the second known-city fixture through the canvas (V09 §7.2). The events
   these tools send are file f item 362's.
11. **Items 111–119 on screen** (V09 §4.21) — T2's spring flag for an oasis (item 111); the colour-vision setting and the
   second cue of every thematic view of this volume (item 112 (a)) and the game-master trial's running (item 112 (b),
   V09 §7.6); the history option in T1's sheet and a lost void's panel line (item 113); the wall repair's material and the
   wall states in the legend (item 114); a hand edit beyond the grandeur ceiling, honoured and explained (item 115); the
   view controls' stop at the zoom-out limit (item 116); the season control and its follow switch (item 117); the festival
   list and its switch (item 118); the progress view of a one-time wait (item 119).
12. **The edges** — every mechanism of this volume at its limits, with its outcome, failure rung and test (V09 §3.16).

### 1.2 The base hooks consumed, by section

| base section | what this volume reads or plugs into |
|---|---|
| §1.2 | the one-click default request — the empty state's town (V09 §5.2) |
| §2.8 | the entity registry's per-type edit kinds, undo paths and lifecycle rows — generate the context panel's controls (V09 §4.4); `factTier` — the tier chips on every panel row; `Provenance.symbolic` (item 113 (f)) — the symbolic chip |
| §2.9 | the document (`view`, `derived`, `undo` sections), the view keys and their writers, the stored authoring `session`; the `.plat` writer the autosave uses |
| §4.1, §7.7 | the skeleton file as a creation prefix; the forms catalogue and `Intent` behind T1's cards; §4.2 S0's history option (item 113) |
| §5.2, §5.4 | F-EDIT and its `ConflictAction`s — the refusal card; the generation report — the report panel |
| §6.1, §6.4 | the `intent.surprise` stream (Surprise me), Enter's successor seed; permalinks, their refusal reasons, the output-version and preview notices |
| §7.1–§7.4 | every event kind, the named actions, the dry run and its outcome table, the toolkit (twelve tools, the binding table, sugar, points forms), declared means held, fates, variations, undo and redo with sessions, independence and truncation |
| §7.5, §7.6, §7.8 | the upgrade diff; the override layer, preferences folded at creation, the tables editor and presets dialog; the control registry, the ≤ 12-control basic panel, proxy thumbnails, layer and light controls |
| §8.2, §8.4, §8.5, §8.8, §8.9 | live layers (`live.ghost`, `live.selection`, `live.stale`) and thematic rows, the second cues and the checked variants (item 112); the light keys; the LOD bands and the first map; the tile pyramid and its per-map zoom-out limit (item 116); the worker boundary and its snap, coverage and furniture queries |
| §9.1, §9.2, §9.4, §9.5 | labels, `displayText`, region groups; the knowledge admission function (E-17); the leader-line switch; furniture, the legend, the ruler, the authoring surfaces (handles, feature snap, count badge), the underlay, framing |
| §10.3 | the people query (gazetteer), the family-tree view (module tier) |
| §11.1–§11.3, §11.5 | the export formats and their knowledge rule; `PlatApi` (`generate`, `open`, `edit`, `preview`, `confirm`, `cancel`, `undo`, `redo`, `query` with `why`, `view`, `setView`, `export`, `report`, `subscribe`); roles and view keys over a bridge; `DocResolver` |
| §12, §12.5, §12.6 | the ten-second ceiling of a one-time wait and its progress rule (item 119); first-map and frame budgets; edit, preview and warp budgets — the latency budget of V09 §6 is built from them |
| §13.2, §13.4, §13.6 | the bars of items 101 and 110–119; the app harness, scripted tasks, accessibility, input scheme, the first-five-minutes test; the protocol shape reused by the owner's UX sitting |
| §14 | `@plat/app`, the interaction contract R1–R19, the per-tool interactions, the input scheme, accessibility, context help, the family-tree view |
| §16 | the milestones the application's steps slot into (V09 §8); the release gate (item 112 (b)) |
| §17.1, §17.2 | the clean room (our own UI words and colours); the bundled fonts |
| item 110's homes (file f items 244–246, 362–364, 447, 455, 465, 466) | §2.7's `RetainingWall`, the raised ways' parts, supports and spans with their use, the deck plots; §3.4's ground arena parts from 1; §4.3 and §4.6's raised-way course solver, stairs and ramps; §4.7 S10–S11's levelling and deck plots; §4.8's moles, piers and quays; §5.3's revised deck invariant; §7.1's events and edit targets; §7.3's S7 row; §8's drawing and shadows of raised parts and retaining walls; §11.1's formats and skeleton; §11.2's preview effects and hit stack |

**Volumes read** (each cited where it is used): V01's parameters on T1, T6, T8 and T12 and its close-up panel (V01 §4.2,
V01 §4.5); V02's `setMassing` and `setComposition` under T9, the canvas-handle contract, the stack and deck records and
their bends (V02 §1b, V02 §2.6, V02 §4.1, V02 §4.5, V02 §4.6); V03's storey switcher, plan panel, plan tools and crypt
(V03 §3.7.4, V03 §4.1, V03 §4.2, V03 §4.5); V04's underground tool mapping, depth band, ruins, the access pass and its
causes, the excavation reading with its lost state, catacombs and the unexcavated style (V04 §1b, V04 §2.2, V04 §3.5.1,
V04 §3.5.4, V04 §3.5.7, V04 §4.1–V04 §4.4, V04 §5.1–V04 §5.5); V05's sky tool mapping, the `key` parameter, the shade strips
and "Update shade now" (V05 §3.22, V05 §4.1, V05 §4.2, V05 §5.1); V06's device settings, time card, timeline bar,
chronicle, `forkAt`, `rerunFrom`, the reason key, the raised-way ledger and the suppression (V06 §2.2, V06 §2.13, V06 §4.1,
V06 §4.4, V06 §5.1–V06 §5.3); V07's village rungs, `declareEnd` and walk-mode roads (V07 §4.2); V08's host mode, host
clerk seam and embed entry (V08 §3.1, V08 §4.4, V08 §5.1) and V08 §2.6b's aqueduct and elevated-road rows; V10's
settings, sessions, proposals, the drawer's view model and the oracle's typed answer (V10 §2.2–V10 §2.13, V10 §3.1,
V10 §3.11, V10 §3.17–V10 §3.21, V10 §4.2–V10 §4.4, V10 §5.1–V10 §5.4); V11's siting profile, families and their `says`,
the document-only tables and their lifecycle, and the `raisedWays`, `terrace` and `deck` rows (V11 §2.3–V11 §2.4,
V11 §3.3.1, V11 §3.24, V11 §4.1–V11 §4.5); V12's evidence file and register (V12 §2.6, V12 §3.11). Where this volume needed
something of a sibling it asked in V09 §10.2, whose every row is closed at its destination.

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
  festival rows, the ten-second ceiling and its quality budget — are the base's and their volumes' (item 111 at §4.2 S0–S1
  and §7.1; item 112 at §8.2 and §13.2; item 113 at §4.2 S0, §4.11 and V06; item 114 at §2.7, §7.1 and V06 §3.7.7; item 115
  at §4.2 S10b and V02; item 116 at §8.8; items 117 and 118 at §2.9, §7.7 and §8.2; item 119 at §12); this volume designs
  their controls, words and panels (V09 §4.21).
* **The people and the family tree's contents** — the relation store, postings, schedules and the clock's hours — are
  §10.3's module (`@plat/sim`, M4b); this volume places their screens (V09 §4.18).
