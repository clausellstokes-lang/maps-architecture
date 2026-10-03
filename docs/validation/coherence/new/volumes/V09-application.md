# Design volume 9 — The application: the map editor a casual user opens, and the authoring toolkit as screens and flows

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V9-application; covered by the whole-design retrovalidation (J84).

Conventions. "The base" is `docs/ARCHITECTURE.md`; a bare section sign (§) points into the base, "Vnn §x.y" into a design
volume — this one is V09 — and every number of a reference list carries its prefix. Decisions are J-V9.n (V09 §9), the
base changes this volume asked for are BCR-V9-n (V09 §10, each a pointer to its applied file f item), bars are T-V9-n
(V09 §7). A tool T1–T12 is item 101's (§7.1), written with its word at first use in a paragraph (T8 `fill`); an item's
bars are always numbered (T101-3). A toolkit layer is written with its word (L0 INTENT); a bare L0–L4 is a refinement
level (§2.2). Every word the application shows a user is quoted in "double quotes": those strings are the message
catalogue's English source rows (V09 §2.9) — data, not code. Nothing here is taken from a reference program's code, word
lists, palettes or screens: the references and surveyed tools enter only as described behaviour, cited by file
(`research/ux/tool-survey.md`, `research/findings/visual-spec.md`), and the application's colours, words and layout are
our own (§17.1).

## 0 In plain words

**What a person sees when they open it.** A finished town, already drawn, filling the screen — never a blank page or a
form. One quiet line sits over it: "Change anything: click it." A strip along the bottom offers six other towns to try,
and a dice button makes a completely new one. Everything else waits until it is wanted.

**How changing it feels.** Down the left side is a short column of tools, grouped the way a town is thought about: what
kind of place it is (its site, size, wealth, walls and past), its ground and bones (hills, rivers, an oasis, walls,
roads, quarters), what is in it (named places, a pasted list of places), its fabric (denser here, a garden there, this
house shaped just so, this corner kept) and its finish (names and the look). At first only four tools show — change the
town's kind, paint a quarter, drop a place, dress the map — and the rest appear the moment they are useful. Whatever you
do, you see the result before it happens: a pale "ghost" of the new quarter, road, wall or house appears under your hand
within about a fifth of a second, with a badge saying how many plots, households and buildings it will hold, and handles
you can drag. Nothing is final until you let go or press accept, and one press of undo takes it back. If what you ask
cannot be done exactly, the program does the nearest thing it can and says so in one plain sentence ("The wall follows
the ridge; it was 40 m off your line"), with the other lawful options one click away. It holds back only where it
honestly cannot do what you ask — a fact a SettlementForge record fixes, something you locked, a change another person's
later work depends on, or a drawing tool on a screen too small for it — and then it says why in one sentence and offers
at least one thing it can do instead.

**Your work is never lost.** Every change is saved the moment you make it, on your own computer, with no account and no
internet needed. A history panel lists every change in plain words ("Painted the Tanners' quarter", "Moved the north
gate") with its time; you can step back to any point, name a point to come back to, or open a copy of the town as it was.
What you declared — a quarter you painted, a tavern you placed, a wall you drew — stays put: ask for "a different version
of this block" or "new trees" and only the rest changes, with three versions side by side to choose from.

**A town with a past.** A desert town can have an oasis — a spring-fed pool with its palms and gardens — and you can add
or remove one with the ground tool; dry towns crowd toward their water and their richest people live nearest it. A town
can also be told its past ("once a city, now a village"): it is then generated as that city and aged to the present, so
its old walls run far beyond today's houses and its church is too big for its congregation. A cave whose last way in has
closed is remembered as "once known" until someone finds a way back.

**Seeing why.** Click any building and ask "Why here?": the program lists what pulled it there — the market it sells to,
the mill that supplies it, the river it needs, the garrison a thieves' den keeps away from, the morning shade of a
floating island — and shows the other sites it considered. A "shade" view paints how much of the day each street lies in
shadow, and a "supply" view draws the lines between each workshop and the places it buys from and sells to; you can pin,
redirect or cut any of those lines, and the town keeps your choice. Every coloured view also carries a pattern, line or
label, and a setting draws the map in a variant checked for the three common kinds of colour blindness.

**Below the streets.** The underground has its own layer: sewers, catacombs, caves, old quarries and the ruins of an
older town. Some caves and ruins lie sealed and nobody in town knows of them; the game master alone can switch on "Show
hidden caves and ruins" and see them drawn faint and dashed, while a player's view never shows them. Click any way down
and it says how it came about ("The Old Mill dug a way down when it was built", "A sinkhole opens here", "The sewer
broke into it in year 40") and can light up the whole path in from the street. People only live underground where there
is a way in: draw an underground quarter in a sealed cave and the editor digs a way down from the nearest house and tells
you so. Catacombs lie under cemeteries and grow, never shrink; when they cannot grow their ossuaries fill instead, and
the catacomb's card says why. Churches have crypts, and the cathedral always has the largest.

**Terraces, raised roads and houses on the harbour wall.** On a hillside you can brush a terrace: the ground under the
brush is levelled and a retaining wall runs along its edge, and wherever a street crosses that wall it climbs by a stair
or a ramp. The road tool's "Raised" switch draws a raised road, a viaduct or an aqueduct that passes over the streets
below without meeting them and comes down by stairs or ramps at its ends. A city also builds a few by itself where there
is a reason — a ravine to cross, two hilltop quarters to join, water to bring in — and each says why. You can remove any
of them: the program first shows what else changes (a road that now goes round, streets that now meet, a fountain that
runs dry), and once you accept, the town never rebuilds it — not in a new version, not as the years pass; undo brings it
back. Under a viaduct, click again to reach the street beneath. Stepped temples and terraced palaces have controls for
their tiers, and moles, jetties and bridges carry small houses, with a tower or a fort at a mole's head or middle.

**Getting it out.** One export button offers pictures (screen, poster or print size), a virtual-tabletop scene that
arrives in the game already walled, lit and on its grid, GIS data, and 3-D models; each shows its size and a preview
before it writes, and none changes the town. Sharing gives a link when the town can be rebuilt from one, and otherwise
the file.

**On a tablet or a phone.** A tablet gets every tool with touch (press and hold opens the menu a right-click opens). A
phone is for looking, naming, placing things from a list, dressing and exporting; the drawing tools that need precise
handles wait for a bigger screen, and the phone says so where they would be.

**The assistant.** An optional assistant, clearly labelled as AI and off until you open it, can take a sentence like "a
walled harbour town with a temple quarter" and propose it as ghosts you accept or refuse, answer "why is this here?", and
check a plan for mistakes. It never draws pictures and never changes anything by itself. Inside SettlementForge it is
SettlementForge's own assistant, set up the way SettlementForge sets up its AI; on its own, the map uses whatever AI
access its installation enables, and says in plain words what it sends and to whom before anything leaves your
computer. Every answer shows what it cost, within the limit that setup sets. (How it thinks is volume 10's subject; this
volume is its drawer on the screen.)

**How we will know it works.** Before each editing milestone closes, five SettlementForge users who have never seen it
get a finished town and must, without help and within five minutes, paint a named quarter, put a named place near a
landmark, restyle the map and add a compass, and re-roll part of the town while keeping what they made. The owner does
the same tasks at a recorded sitting. Before the public release, ten to twenty SettlementForge game masters use the map
on their own settlements for at least two sessions of play. A known-city test builds a whole original city with the
structure of a famous fantasy map three ways — typed as a file, drawn by hand in the editor, and dictated to the
assistant; the file and the hand-drawn town must come out identical, and the assistant's version must have the same
structure. A second known city — a port on a headland with terraced quarters, a harbour mole with its towers and a raised
road — is built the same ways (V09 §7.2).

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds

`@plat/app` at build depth: the standalone editor (entry `index.html`) and the **shell** that both it and V08's host mode
(entry `embed.html`, §14) run on. The shell is one program with one set of screens; a host mode is a `ShellMode`
(V09 §2.2) that removes or locks what V08 §5.1 names and adds nothing this volume does not declare as an extension slot.
This volume settles:

1. **The screens** — the empty state and the new-town flow (V09 §5.2); the editor frame (top bar, tool rail, map region
   with its overlays, context panel, view bar, drawers; V09 §5.1); the panels (selection and its tabs, tool options, the
   report, history with restore points, the gazetteer and "features in view", the advanced panel and the tables editor,
   style and dress, names); the sheets and dialogs (confirm the fates, export in five families, share, settings, open and
   recent towns, the keymap overlay, about); the clerk drawer; the overlays (ghost, handles, count badge, snap highlight,
   the variations tray, the bend line, the refusal card, first-use hints, toasts); the thematic views the owner's file g
   rules ask the interface for (the shade map, the supply links, the siting "Why here?" card).
2. **The flows** — boot and open; the first map; the declaration pipeline (gesture → draft → preview → ghost → commit or
   cancel) with its latency budget; confirmation of fates and renames; variations and New random scoped to a selection;
   undo, redo, restore points and "open a copy from here"; autosave with crash recovery; export; share; settings;
   accepting or refusing a clerk's proposal.
3. **The input model** — pointer, pen, touch and keyboard under one gesture grammar; the responsive classes and what a
   phone may do (V09 §4.12, J-V9.9); accessibility beyond §14's contract.
4. **The tool binding's screens** — §7.1's binding table gives every edit event kind of the base and of volumes 1–8 its
   home tool per (event kind, target class or path); V09 §4.3 places each pair on the screen (the gesture, the mode, the
   context-panel control) and T-V9-12 checks completeness over the pairs.
5. **The words** — the message catalogue: every refusal, bend, conflict, fate, error and hint in plain words (V09 §2.9,
   V09 §4.9).
6. **The acceptance machinery** — the first-five-minutes protocol in operational detail, the owner's UX sitting on
   §13.6's protocol shape, the game-master trial's running (g item 112 (b)), and the known-city fixtures authored through
   the canvas by a gesture script (V09 §7).
7. **File g's interface parts** — the shade map view (item 102 (f)); the siting explanations (items 103 (e), 104 (a)); the
   link view and link edits (item 105 (j)); the wall tool's snapping to natural barriers and its barrier-arc ghost (item
   106 (g)); a collective record's member list (item 108 (a)–(b)); a chain named as a working quarter only past item 72's
   threshold (item 104 (h) (3) as revised by item 107 (e)). The mechanisms are the base's; this volume designs their
   screens and gestures. The declarations the edits store are volume 11's document-only tables (V11 §4.2), written by
   `editTable` (V09 §2.6); every answer a panel shows is volume 10's `WhyAnswer` (V10 §2.13), projected for the card
   (V09 §2.7).
8. **Item 109's screens** — the game master's view of sealed caverns and ruins (V09 §4.17.1); the system chip that draws a
   gallery or chamber into a named system and starts a new ruin, cavern or catacomb (V09 §4.17.2); how each way down came
   about and the path in (V09 §4.17.3); dwellings only after a way in (V09 §4.17.4); the catacomb, crypt and cemetery
   panels with their bends (V09 §4.17.5); the dossier facts they show (V09 §1b).
9. **The other volumes' screens** — volume 10's drawer view model, settings, creation preview, import critique and
   transcript export (V09 §4.11, §3.12, §5.10, §5.12; the key card only where a deployment enables the built-in clerk
   with a user key, V09 §4.11); volume 6's "Re-run from here", chronicle and use-history tables, animated history and
   history import (V09 §3.9, V09 §3.12, V09 §5.10); volume 2's massing handles and family strip (V09 §3.5); volume 5's
   shade strips and "Update shade now" (V09 §5.4); volume 7's whole-circuit view (V09 §5.4); volume 1's coverage and voids
   views (V09 §5.4); and the base's view keys, people search, family tree, clock, notes, pins and ruler that no other
   volume places (V09 §4.18, V09 §4.19).
10. **Item 110's tools** (J-V9.58) — T3's **Retaining wall** mode and T2's **Terrace** mode (V09 §4.20.1); T4's
    **Raised** toggle and **Aqueduct** chip (V09 §4.20.2); removing a generated raised way and building it again
    (V09 §4.20.3); T6 on deck faces and at a mole's landmark slots (V09 §4.20.4); T9's tier controls (V09 §4.20.5); the
    panels, handles, span and crossing controls and why lines of the new records (V09 §4.20.6); what else a change does,
    in words, on every preview (V09 §4.20.7); reaching what lies under a raised deck (V09 §4.20.8); item 110 on the Sky
    layer (V09 §4.20.9); the item-110 exports (V09 §5.10); an author's removals in the skeleton (V09 §3.12); and the
    second known-city fixture through the canvas (V09 §7.2). Their events are §7.1's (item 362).
11. **Item 111's tool** — T2 `ground`'s **Oasis** form: a lake's point-and-level form with the spring flag, its removal,
    its words, binding row and why-card line (V09 §4.5, V09 §4.9, V09 §4.21.1).
12. **Item 112's view setting and trial** — the colour-vision selector writing the view key `cvdVariant` (§8.2), the
    second cue of every thematic view of this volume (V09 §5.4), and the game-master trial's running (V09 §7.6).
13. **Item 113's editor part** — T1's **History** chip (the blueprint's history option, §4.2 S0), the panel lines of a
    replayed past and of a symbolic peak, and the lost void's panel line, legend line and tier rule (V09 §4.5,
    V09 §4.17.3, V09 §4.21.2, V09 §4.21.3).

### 1.2 The base hooks consumed, by section

| base section | what this volume reads or plugs into |
|---|---|
| §1.2 | the one-click default request — the empty state's town (V09 §5.2) |
| §2.3 | `WaterBody.spring` and the oasis's grove and gardens (item 111) — T2's Oasis form and its panel |
| §2.8 | the entity registry's per-type edit kinds, undo paths, lifecycle rows, path labels and help anchors (item 269) and explainers (item 270) — the context panel's controls (V09 §4.4); `factTier` — the tier chips on every panel row; the `symbolic` provenance flag (item 113 (f)) |
| §2.9 | the document (`view`, `derived`, `undo` sections), the view keys and their writers (items 277, 278), the stored authoring `session`; the `.plat` writer the autosave uses; *Load* steps 2–3 (V09 §3.14) |
| §4.1, §4.2 S0, §7.7 | the skeleton file as a creation prefix; the blueprint's `history` option (item 113); the forms catalogue and `Intent` behind T1's cards |
| §4.11 | history-first generation (item 113) — the replay's lines on the panels; the evolution hook behind the time card |
| §5.2, §5.4 | F-EDIT and its `ConflictAction`s — the refusal card; the generation report — the report panel |
| §6.1, §6.4 | the `intent.surprise` stream (Surprise me), Enter's successor seed, the rerollable concerns; permalinks, their refusal reasons, the output-version, retention and preview notices |
| §7.1–§7.4 | every event kind, the named actions (New random, Re-derive), the dry run and its outcome table, the toolkit (twelve tools, their binding table, sugar, points forms), declared means held, fates, variations, undo and redo with sessions, independence and truncation |
| §7.5, §7.6, §7.8 | the upgrade diff; the override layer, preferences folded at creation, the document-only tables (item 380), the tables editor and presets dialog; the control registry, the ≤ 12-control basic panel, proxy thumbnails, layer and light controls |
| §8.2, §8.4, §8.5, §8.8, §8.9 | live layers (`live.ghost`, `live.selection`, `live.stale`, and items 411's `live.shade` and `live.links`) and thematic rows; colour-deficiency variants and `cvdVariant` (item 112); `LayerSpec` (item 413); the light keys; the LOD bands and the first map; the tile pyramid; the worker boundary with its snap, coverage, furniture and hit queries |
| §9.1, §9.2, §9.4, §9.5 | labels, `displayText`, region groups; the knowledge admission (§9.2, with its readers); the leader-line switch; furniture, the ruler, the authoring surfaces (handles, feature snap by role (item 517), count badge), the underlay, framing, the legend's second cues |
| §10.3 | the people query (gazetteer), the family-tree view (module tier) |
| §11.1–§11.3, §11.5 | the export formats, their knowledge rule and the item-110 entities (items 447, 453–455); `PlatApi` (`generate`, `open`, `edit`, `preview`, `confirm`, `cancel`, `undo`, `redo`, `query` with `why`, `links` and `entity`, `view`, `setView`, `export`, `report`, `subscribe`; items 458–470, 572, 583); roles and view keys over a bridge (items 472, 473); `DocResolver` |
| §12.5, §12.6 | first-map and frame budgets; edit, preview and warp budgets — V09 §6's latency budget is built from them |
| §13.2, §13.4, §13.6 | the bars of items 111–113; the app harness, scripted tasks, accessibility, input scheme, the first-five-minutes test (item 494); the protocol shape reused by the owner's UX sitting; the game-master trial's release gate (T112-2) |
| §14 | `@plat/app` and its contents (item 514), the interaction contract R1–R19, the per-tool interactions, the walls control and the keymap (item 515), the application's tables (item 516), the input scheme, accessibility, context help, the family-tree view, the embed entry (item 507) |
| §16 | the milestones the application's steps slot into and their pricing (item 530; V09 §8) |
| §17.1, §17.2 | the clean room (our own UI words and colours); the bundled fonts |
| item 110's homes | §2.7's `RetainingWall`, raised-way record and deck plots (items 244–246); §2.8's suppression (item 260); §3.4's ground parts from 1; §4.3 and §4.6's raised-way course solver, stairs and ramps; §4.7 S10–S11's levelling and deck plots; §4.8's moles, piers and quays; §5.3's deck invariant; §7.1's events and edit targets (items 362–364, 368); §8's drawing and shadows; §11.1's formats and skeleton; §11.2's preview effects and hit stack (items 465–467) |

Volumes consumed: V01's tool parameters on T1, T6, T8 and T12 (V01 §4.2) and its close-up panel's reader query
(V01 §4.5); V02's `setMassing` and `setComposition` under T9 (V02 §4.1), its canvas-handle contract (V02 §4.5), its tier
controls and bend ids (V02 §1b, V02 §4.6) and its deck records (V02 §2.6, V02 §3.15–§3.16); V03's storey switcher, plan
panel and plan tools (V03 §4.5, V03 §4.1) and its crypt rules (V03 §3.7.4); V04's underground tools, depth band, access
pass and its causes, catacombs, ruins, arch vaults and the unexcavated style (V04 §1b.3, V04 §2.2, V04 §3.5, V04 §4.1–§4.5,
V04 §5.1–§5.5); V05's sky tool mapping, the `key` parameter, item 110 on islands and the shade strips (V05 §3.22,
V05 §4.1–§4.2); V06's time card, timeline bar, chronicle, `forkAt` and `rerunFrom`, device settings, the history store,
the reason key and the raised-way ledger (V06 §2.2, V06 §2.13, V06 §4.1, V06 §4.4, V06 §5.1–§5.3); V07's village rungs,
`declareEnd` and walk-mode roads (V07 §4.2); V08's host mode, host clerk seam and embed entry (V08 §3.1, V08 §4.4,
V08 §5.1) and its item-110 reasons (V08 §2.6b); V10's settings, sessions, proposals, the drawer's view model and the
oracle's typed answer (V10 §2.2–§2.13, V10 §3.1, V10 §3.11, V10 §3.17–§3.21, V10 §4.2–§4.4, V10 §5.1–§5.4); V11's siting
profile, families and their `says`, the document-only tables and their lifecycle (V11 §2.3–§2.4, V11 §3.3.1,
V11 §4.1–§4.5). Each is cited where it is used; what this volume needs of a sibling is closed at the sibling (V09 §13).

### 1.3 Out of scope, and who owns it

* **The clerk's reasoning** — its model, prompts, tool definitions, cost and evaluation — is volume 10's; in the
  SettlementForge module the assistant is SettlementForge's own, driving the map's tool API through the host seam, and its
  provider, model tier and key path are SettlementForge's AI setup read as configuration inputs (J121, J122; §14). This
  volume owns the drawer, the AI label and opt-in, the proposal cards, accept / try again / undo-the-clerk's-change, and
  the rendering of every `why` answer (V09 §4.11, V09 §5.8).
* **Host mode's differences** — no file operations (V09 §2.2's `fileMenu: false`: the file menu keeps Export skeleton,
  Rebuild around my drawings, Settings and About), the dossier-owned values locked, the Map tab's host actions in the
  frame's header and the frame's own strips — are V08 §5.1, V08 §4.2 and V08 §4.6. SettlementForge mounts no viewer
  frame (V08 §3.1, V08 §3.14), so a viewer's filtered history is a generic host's only (§11.3). This volume supplies the
  shell those differences switch (V09 §2.2).
* **The timeline bar, the chronicle, the time card, fork, re-run and the history replay's engine** are V06's (V06 §4.1,
  V06 §4.4, V06 §5.1); this volume gives them their place in the frame and joins the chronicle to the history panel as a
  second tab (V09 §5.6).
* **The plan panel's and storey switcher's contents** are V03 §4.5's; **the close-up panel's contents** V01 §4.5's; this
  volume lays both out.
* **The rows a panel shows** — class names, district kinds, goods, siting families — are volume 11's content; the UI
  reads each row's display label and icon cells (§14's application tables, item 516).
* **Drawing the map** is §8's; the application composes the tiles the tile worker delivers and draws only screen-space
  overlays (handles, badges, the snap highlight, the bend line) on the main thread (§9.5).
* **The D-5 map sittings** against the references are §13.6's and volume 12's; this volume reuses only the protocol's
  shape for a sitting on the editor itself (V09 §7.4).
* **Hosting and accounts** follow SettlementForge (J121); a standalone town needs neither (§11.5). Two people editing one
  map at once is not offered (J122); several people share a town only inside a host (§11.3, V08).
* **Item 110's records and rules** — `RetainingWall`, the raised ways' parts, supports, spans and their use, the course
  solver, the deck plots and their budget, the reason keys and the suppression a removal of generated content records —
  are the base's (items 244–246, 260, 362–364) and volumes 2, 4, 6 and 11's (V02 §3.15–§3.16, V04 §3.5.4 (d)'s arch
  vaults, V06 §2.13, V11's `raisedWays`, `terrace` and `deck` rows). V08 binds none of it (V08 §2.6b (5)). This volume
  designs their tools, words and screens (V09 §4.20); the time card's count of raised ways built is V06's (V06 §4.1).
* **The underground's records and rules** — ruins, caverns, the access pass and its causes, the excavation reading and
  its lost state, catacombs, their growth, ratchet and stagnation, and every bend they compute — are V04's (V04 §3.5,
  V04 §3.5.7); a church's crypt is V03's `Basement.crypt` (V03 §3.7.4) and the cathedral's crypt basement V02's (the
  no-refusal crypt ladder, V02 §3.14.5). This volume shows them, maps gestures to their events and words their messages
  (V09 §4.17).
* **Item 111's, 112's and 113's mechanisms** — the oasis, the water pull and the climate cell (§2.3, §4.2, §4.5); the
  second cues, checked variants and the style check (§8.2, §13.2); the history replay, the effective peak, refounding,
  burial and lost access (§4.11, §7.7, II.7.6, V04, V06, V08) — are the base's and the named volumes'; this volume
  writes their tool, view setting, trial running, history option and panel lines.
* **The people and the family tree's contents** — the relation store, postings, schedules and the clock's hours — are
  §10.3's module (`@plat/sim`, M4b); this volume places their screens (V09 §4.18).

## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into; base records are cited, not
restated, and a mechanism's text lives at the section the row names. A piece with no consumer or no producer would be a
defect (principle (7)); T-V9-12 and T-V9-15 check the two registries mechanically.

| piece (V09 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `ShellConfig`, `ShellMode`, `HostSlots` (2.2) | the boot (3.1) from media queries and the entry; in host mode V08's embed fills `HostSlots` — `clerkMode` from SettlementForge's `clerk.config` (item 473), `hostName`, `historyLines` listed at the shell's `effectiveKey()`, `newDocuments` (V08 §3.1 step 7 (b), (c)); rebuilt on every `clerk.config` | every screen; the rail's availability; the export tab's formats; the Assistant button and the clerk slot's kind (2.10); "Set by {host}" (`host.locked`) and a host card's AI mark; the history panel's group "The party" (4.10); the host-mode rule of every action that makes a new document (3.9) | §14 `@plat/app`; the embed entry (item 507) |
| `toolkit.json` rows (2.3) | our table versions | the rail and options strip (4.2), the mapper (3.3), V09 §4.3's screen columns, the context menu (4.4), `@plat/docs`' tool pages, T-V9-12 | §14's application tables (item 516) |
| `messages/en.json` rows (2.9, 4.9) | our table versions; V08's `host.*` rows; volume 10's key families and volume 6's `info.copy.condensed`, their `en` texts loaded from their owners (V09 §4.9's families paragraph) | every bend line, refusal card, toast, hint, fates word, error and panel sentence; every `says` of a why section, critique, clerk refusal and notice line the drawer draws; `@plat/docs`' messages page, one anchor `messages#<key>` per row, opened by **Show me why** (5.15); T-V9-15, T-V10-29 | item 516; §5.2 F-EDIT; §7.1's dry-run outcome table |
| a row's `buttons` and the `button.*` rows (2.9, 4.9) | our table versions, in `en.json` only; the engine's `MsgRef` arguments (item 463); the dry run's `ConflictAction`s, `PreviewResult.alternatives` and the dossier's unplaced elements | the canvas's cards, toasts, fates sheet and panels (3.3, 5.3); V09 §4.9's event forms (`commit`), application commands (`app`) and V09 §4.5's mode ids (`tool`); volume 10's cards by V10 §3.5 step 3's reading; T-V9-13, T-V9-15, T-V9-27, T-V10-4 | §5.2 F-EDIT; §11.2 (item 463); T101-3 |
| `info.copy.condensed` (3.9, 4.9) | V06 §3.15.5's line; the new document's `forkedFrom.seq` above the seq asked (V06 §4.4) | the new document's opening toast after a copy or re-run below a rebase point (3.9, 4.11); T-V9-15, T-V9-27 | §2.9 `Base`; V06 §3.15.5 |
| the keymap's added rows (4.13) | `keymap.json` | the input layer; the keymap overlay | §14's input scheme and keymap (item 515) |
| `Draft` and the draft mirror (2.4) | pointer, key, paste and card events | the mapper; the overlay's raw stroke; the recovery offer (3.1) | §9.5 authoring surfaces |
| the mapper (3.3, 4.5) | a settled `Draft` | `preview` and `edit` calls | §7.1's events and toolkit |
| `PreviewState` (2.4) | `preview`'s `PreviewResult` | the ghost (`live.ghost`), the badge, the bend line, the refusal card, the fates shown before Accept | §11.2 `preview`; §8.2 `live.ghost` |
| `VariationSet` (2.4, 3.6) | `preview` with `variations: 3` for a derived fill, or one `preview` per clerk variation; `thumbnail` per preview (item 461) | the tray; the committed group of 3.6 | §7.3 item 10 |
| feature snap by role (3.4) | the tile worker's `RoleIndex.snap` with a role filter (item 517) | the draft's points; the snap highlight; the ruler (4.19) | §9.5; §8.9's snap query |
| wall arcs in the preview (3.4) | `drawWall`'s dry run (item 462) | the wall ghost's barrier arcs, the anchor towers, the badge's walled and barrier metres, the enclosed districts' tint | item 106 (a)–(g); §7.1's `drawWall` points form |
| placement alternatives (4.5 T6) | the top three `SiteCandidate`s of the `sites` query (items 463, 468) | T6's faint alternative sites; the refusal and bend cards' "put it here" | §4.7 S10b's closest sites |
| `sizeM2` on a quarter's points form (4.5 T5) | the badge's plus and minus and the size chips | S6's grower's target in `quarter`'s dry run (item 348) | §7.1 `PointsForm` |
| `Selection`, `HandleSet`, `CountBadge` (2.5) | clicks, lists, lassos; the selected geometry by 3.5's rules; `PreviewResult.counts` | the context panel, the handles' drags (3.5), `live.selection` | §8.2 `live.selection`; §9.5 |
| the sky un-displacement (3.4, 4.20.8) | a point or hit on the Sky layer, its island's elevation and the view's `offsetPerMetre` (V05 §4.2) | the draft's points, the hit stack and the handles on an island, in the island's own plan | §8.4's offset occlusion; V05 §4.2 |
| the context panel and context menu generator (4.4) | §2.8's entity registry (edit kinds, attribute paths with their labels, help anchors and explainers, `factTier`; items 269, 270), the entity schemas and §7.8's control registry | panel controls and menu entries → `setAttr`, `setAttrMany`, `editTable` and the kinds §7.1 binds | §2.8, §7.8 |
| map-side siting, link and split declarations (2.6) | `editTable` row operations on V11 §4.2's document-only tables from the Shape tab, the per-kind panel, the link view and a clerk's accepted proposal | V11's resolver and S10b's score, the link binding, the split placement (V11 §4.2–§4.4); the `why` and `links` answers | item 380; items 104 (a) (1), 105 (h), (j) |
| a wall stretch's grade override (4.7) | `setAttr(enceinte, 'profile/<arc>/grade')` | S7's operator as a fixed input | §4.8; item 106 (c); item 360 |
| `WhyCardModel` (2.7) | V10's `WhyAnswer` from `query({ kind: 'why' })` (item 468; each kind's `WhyProvider`, item 270, and each `WhySectionProvider`'s rows, V10 §3.9), row ids resolved by V11 §4.5 | the why card (5.8), the source chips (4.7), the drawer's why turn (4.11), the underground panels (4.17), item 110's panels (4.20.6), the oasis and the past's lines (4.21) — `sections` drawn by all of them | §11.2's oracle |
| `LinkRow` (2.7) | the `links` query from the generation worker's link cache (3.15), bound by S10a/S10b's binding function | `live.links`, the Link card, the GeoJSON `supplyLink` features | §11.2 (item 460); item 105 (a), (j) |
| a record's members (4.7) | `EntityCard.members` (`query entity`, item 468) and `WhyAnswer.members` | the record panel, the gazetteer's counts | §11.2; item 108 |
| `live.shade` provider (5.4) | `ModelView.fieldDriver('daylight')`; V05's held strips (`sky.island.shadeStrip`, `shadePending`) | the Shade view's tiles, legend and readout; picture exports while it is on | §8.2 live layers (item 411); item 102 (f) |
| `live.links` provider (5.4) | the `links` query | the Supply links view | §8.2 live layers (item 411) |
| `live.coverage`, `live.voids` providers (5.4) | V01's `catchmentOf` and `districtsAbove` (V01 §3.16) | the Coverage and Voids views | §8.2 live layers (item 411) |
| `showCircuit` on the wall layer (5.4) | the wall layer's toggle, by `setLayer` | S14 draws the barrier arcs after commit, in the town and village products (V07 §5) | §8.4 `LayerSpec` (item 413); item 106 (g) |
| view keys `thematic`, `workingLayer`, `restore/<id>` (2.1, 2.8) | the view bar; the history panel | the live providers; the tools' layer; the restore flow | §2.9 view state (item 277) |
| view key `cvdVariant` (5.12, 5.4) | Settings' colour-vision selector and the Dress panel's chip | §8.2's loader (the variant's role substitutions; the tile key, §8.8); §9.5's legend with its second cues; a picture export's colours (5.10) | §8.2's colour-deficiency variants (item 112) |
| the Show menu's **SettlementForge's chains** entry (5.4) | the gazetteer's `customChain` rows as V08 §5.2's row lists them, read at the view's effective key after each load and commit | `thematic: 'supplyChains'` → V08 §5.2's thematic row: its lines, legend and GeoJSON | §2.9 view state; §8.2 thematic rows (item 410) |
| **New trees**, **New decoration** (4.5 T12) | the Dress panel's buttons | `rerollLayer` of the concerns V09 §4.5 T12 names → the instance layouts and render-time hashes that read them; the history lines (4.10); volume 10's `DressInput.restyle` (V10 §4.1's T12 row) | §6.1's rerollable concerns; §7.1 `rerollLayer`; §7.4 |
| view key `showUnexcavated` (4.17.1) | the Below group's "Show hidden caves and ruins", offered only at tier `secret` | S14's unexcavated program (V04 §5.2); a picture export at `secret` | §2.9, §11.3, §11.1 (item 278) |
| `ViewOpts.viewAs` (4.8) | the View as menu (a tier); a host's players' view, set by the embed's bridge handler as the party's key form (V08 §3.14 (5)) | §9.2's admission for this view's drawing and labels; `effectiveKey()` (2.10) — the `admitAs` of every band-less read (2.7), the key `HostSlots.historyLines.list` is called with, the clerk's session key and the export dialog's default knowledge | §11.2 view options (items 464, 572); §9.2 |
| the base's own view keys placed on screen (4.19) | the Map, Below and Light groups, the Notes panel, the Dress panel, a viewer's style card | `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `season`, `weather`, favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings — read by the base | §2.9 view state; §9.5 |
| the ruler (4.19) | key M and the view bar's button | a length or area readout; "Save as annotation" (a view pin) | §9.5 measure tool |
| the system chip and "New ruin / cavern / catacomb" (4.17.2) | the town's `UndergroundSystem` records by name and kind; item 109's admissibility by rung | `drawTunnel { system }`, `drawChamber { system }`, `drawChamber { system: { newKind } }` | §7.1 (item 361) |
| "How people get down here" (4.17.3) | `AccessPoint.cause`, `UndergroundLink.cause` (V04 §2.2) and the excavation reading's connection graph (V04 §3.5.7 (g)) | the access, cavern and ruin panels; "Show the way in"; the access symbol by cause; the access edits | II.7.4; V04 §3.5.7 |
| the lost void's lines (4.17.3) | the excavation reading's `lost` state and `ExcavationRecord` (V04 §2.2, V04 §3.5.7 (g)); the closing link's `Lifecycle.since` | the void's panel line, the Below legend's "Once known" row, the knowledge rule of its label (V04 §5.4); T-V9-72 | II.7.6 (item 113 (e)) |
| the dwelling closure (4.17.4) | a dwelling or undercity declaration on an `unexcavated` or `lost` cluster; for **Use another building**, the dry run's `PreviewResult.alternatives` | the access closure's pieces with the dwelling, dug by V04 §3.8's U-DIG; the bend card's **Use another building** re-preview (`addUndergroundAccess` grouped before the declaration); the clerk's `propose` for the alternative (V10 §3.16) | §7.3 item 9 |
| the catacomb, crypt and cemetery panels (4.17.5) | `CatacombComplex` (V04 §2.2), `Basement.crypt` (V03 §3.7.4), the crypt join's `AccessPoint` (cause `crypt`), the burial face, `catacombOutcome` (V04 §4.5) and V01's opening place (V01 §3.5.12) | the panels, the extent chart, the bends' words, the fates of an author's delete | II.7.6; V04 §3.5.1 |
| the People panel, the family tree, "Where is", the clock (4.18) | `query people`, `relations`, `whereIs`; the `time` key and `sim.advance` | the panels; the map's highlight of home and work | §11.2; §10.3; §14's family-tree view |
| `HistoryRow` (2.8) | the log (and the journal's times) | the history panel, the context panel's History tab, a generic host's viewer filter (`HostSlots.historyFilter`, §11.3) | §7.4 status; §2.9 log |
| `HistoryRow.lines`, `.dossierGroup` and the dossier groups (2.8, 4.10) | the log's `dossierFacts` events (their `changes` count, `absorbed` week, `notes`; V08 §3.6 step 4) and the port's events after each; `report(h)`'s `changes` (§5.4); `entity` reads by `dossierKey` and by `id` at `effectiveKey()` (item 583); V06's `EpochReport.raised.suppressedFired` | the history panel's absorb and creation groups: heads, note lines, report-entry lines, Show (V08 §4.6); T-V9-69 | §7.4; §5.4; §11.2; V08 §4.6 |
| the report panel's dossier section (5.7) | `report(h)`'s `GenerationReport.dossier` and `.dossierNotes` (item 390); the note keys; the entries' addresses named by `entity` reads at `effectiveKey()` | the placement list (`report.dossier.<state>`) and the standing-note lines under `host.group.standing`; T-V9-69 | §5.4; V08 §4.6 |
| restore flow and re-run (3.9) | a row or a restore point | `undo(h, of)` groups; `forkAt`, `rerunFrom` (V06 §4.4; item 458); in host mode the new document saved by `export(h, 'plat')` to the user's device, or the controls hidden (`HostSlots.newDocuments`) | §7.4 |
| `JournalEntry`, `LocalDocRecord` (2.11, 3.8) | every API call that changes the log, in two phases; compaction's `export(h, 'plat')` | recovery at open; the recent list; Recently deleted; the file `DocResolver`; `appVersion` read at open (3.1 (c)) | §2.9's writer; §11.5 |
| `AppPrefs` (2.11) | first run, the settings screen, hint completion | the shell; a new document's recipe (the `generation` block); V06's history store and frame cache (their device settings, V06 §2.2) | §7.6's `userGlobal` layer |
| `ClerkSlot`, `ClerkMount`, `ClerkHandle` (2.10) | volume 10's harness implementing `ClerkHandle` (V10 §2.6's members, in both slot kinds); `ClerkMount.host` filled by the embed's bridge handler (V08 §3.1) with the five bridge messages of item 473; `ClerkMount.effectiveKey` from the view key and View as; `ClerkMount.rebuildEvents`, the shell's one implementation of V09 §4.20.3 (4); `attach.newMap` from the drawer's Start a new map from this | the drawer (4.11) — every `ReplyBlock` rendered, every `ClerkAction` dispatched, a host's proposal card; Settings' Assistant section over `ClerkSettings` and the defect list (V10 §2.2, V10 §2.8); V10's `HostProxyBackend` and session key (V10 §2.3); V10's **Put it back** (V10 §4.3); V10 §3.1 (4)'s creation mode | §11.2's clerk API; §14's clerk (item 473); V08 §3.1 |
| the skeleton import dialog (3.12) | `GenerationReport.prefix` (item 470); `CritiqueEngine.run` (V10 §3.10); a skeleton's `history` block (V06 §5.3) | the dialog's outcomes, the findings with Show and Fix, "Check with the assistant" (V10's `critique` route) | §4.1, §5.4, §11.1 |
| the creation preview (4.11) | a creation proposal's scratch document (V10 §3.11 (3); item 469), in the empty state or after the drawer's Start a new map from this (standalone only) | the read-only view under its banner; acceptance opens the new document | §11.2 |
| massing handles and the family strip (3.5) | V02 §4.5's contract; one `setMassing` dry run per feasible family | `reshapeRange`, `moveTower`, `setComposition`, `setMassing` | V02 §4.1, V02 §4.5 |
| the export dialog (5.10) | the user's options; its default knowledge, the view's effective key (2.10) | `export(h, fmt, opts)` with `knowledge` lowered only (item 453) and the VTT details (item 454); V06's `chronicle.csv`, `uses-history.csv` and animated history; V10's transcript | §11.1 |
| the share sheet (5.11) | `export(h, 'permalink')`, §6.4's refusal conditions | the clipboard; the file download | §6.4, §11.5 |
| the three load outcomes (3.14 (a)–(c)) | `open`'s load (§2.9 *Load* steps 2–3; §6.4's retention window) | the upgrade offer, the frozen view's strip and the recipe opening as 3.14 states them; the history rows (4.10); T-V9-67 | §2.9 *Load*, §6.4, §7.4's rebase row, §7.5 |
| the locus wording (4.16 (6)) | a `Locus` and its target's name from the `gazetteer` query at the view's effective key (2.7) | `refuse.roster.dossier`'s `{locus}` (4.9), the history template "Asked for {name} {locus}" (4.10), volume 10's `dossier` row by citation (V10 §3.16); T-V9-13 | §7.1's `Locus`; §11.2 `gazetteer` |
| `F5Record`, `UxSittingRecord` (7.3, 7.4) | the first-five-minutes sessions; the owner's sitting | `MilestoneRecord.ux` of M2a, M3a and M3b (item 490) | §13.3, §13.4, §13.6's protocol shape |
| `GmTrialRecord` (7.6) | the game-master trial's sessions | volume 12's calibration record and the fix list (V12, item 112 (b)); T112-2's report before release | §13.2 T112-2; §16's release gate |
| the canvas script (3.12, 7.2) | the known-city fixtures' gesture lists, each gesture with its view scale and centre | the app harness; T101-6's agreement bar | §13.2's elegance bars; §13.4 harness |
| item 110's events (4.20) | T3's Retaining wall mode, T2's Terrace mode, T4's Raised toggle and Aqueduct chip, T9's span chips; volume 10's encoders; a skeleton's prefix | the fold (the base's `RetainingWall`, raised parts and span use); the journal (3.8); the history templates (4.10); T-V9-12's walker | §7.1 (item 362) |
| a crossing's form and a raised way's deck paths (4.20.6) | the panel's Stair · Ramp chip, the Deck height and Arch spacing steppers | the fold: item 244's support step and course solver read `clearanceCm` and `spanSpacingCm`; the history row by its path label | §7.1's ways row (item 364) |
| a removal of generated content and its suppression (4.20.3) | the Delete key, the context menu and T10 `hold` (a plain `delete`, item 368); the fold writes `detail.suppress` (item 260) | V06's ledger and every generator (V06 §2.13); `info.remove.holds`; the history row's "Build it again" and `ClerkMount.rebuildEvents` (one function); the skeleton (item 455) | §7.1, §2.8 (item 260) |
| the preview's effects (4.20.7) | the engine's dry run, filled from the owning volumes' rows (V02's deck buildings, V03's stored plans, V04's arch vaults, the base's routes, junctions and water) | the badge's "and {n} other changes", the fates sheet's "What else changes", the live region, the clerk's card, T1's whole-town ghost | §11.2 (item 465) |
| the hit stack and `Selection.kind 'part'` (4.20.8) | the tile worker's hit-test slices (item 466) | click-again cycling, "Select below", the span and crossing panels, T11 on a raised way, the touch menu, volume 10's `entity { at }` | §11.2's `hit` |
| handle kinds `rampEnd`, `terraceLevel`, `tierStep` (2.5, 3.5) | 3.5 from the selection | the mapper: `moveVertex`, `terrace`, `setMassing { op: 'tiers' }` | §9.5 |
| the Raised toggle and the Aqueduct chip (2.4, 4.20.2) | T4's options strip; PageUp and PageDown while drawing | the mapper's `raised` and `class`; the badge (memory only, reset on tool entry) | §7.1's `drawWay` |
| T9's tier controls (4.20.5) | a selected `stepped` building at the building band | `setMassing { op: 'tiers' }`, `setAttr` of a tier's heights (V02 §4.6) | V02 §4.6 |
| "Keep them as yours" (4.20.3) | T1's whole-town ghost when a Re-derive drops generated raised ways | declared `drawWay { raised: true }` events in the Re-derive's group | §7.1 |
| "Raised ways the town builds by itself" (4.14) | the advanced panel's Streets group | `editTable` on volume 11's `raisedWays` chances, read by every raised-way generator (V06 §2.13); the dry run's "Remove them too" | §7.6 |
| the item-110 exports and the deck scene (5.10) | the exporters | the export dialog's rows; T-V9-61 | §11.1 (item 447) |
| removals in the skeleton (3.12) | Export skeleton | the import dialog's `import.removed` and `import.nothingToRemove` rows; T-V9-62 | §11.1 (item 455) |
| the second known-city fixture's canvas script (7.2) | the test tree, written from its brief | T-V9-56, T-V9-3's measurement, volume 12's golden (V12 §3.14's K2) | §13.2, §16 (item 110 (e)) |
| T2's **Oasis** form (4.21.1) | T2 `ground`'s Water mode with the Oasis chip: one point and a level | `drawWater { kind: 'lake', from: { points, levelCm, spring: true } }` → S1's oasis (`WaterBody.spring`, the grove and gardens, §2.3); its removal a plain `delete` of the water body; the history line; the why line; T-V9-71 | §7.1's T2 row (item 111); §2.3 |
| T1's **History** chip (4.21.2) | T1 `intend`'s sheet, standalone | `adjust('blueprint.history', …)` → §4.2 S0's history option and §4.11's history-first generation (a Re-derive from S0, its fates sheet and auto restore point first) | §4.2 S0, §4.11 (item 113) |
| the past's lines (4.21.3) | the document's `HistoryRecord` (§2.7; V06's replay record) and the `symbolic` provenance flag (§2.8) | the report panel's "What its past left" lines, the why card's `facts` chip "a size the record does not give", the time card's first entry; T-V9-72 | §2.7, §2.8, §4.11 |
| the tables editor's cell inspector (4.14) | V12's register (`register.json`) and `dist/evidence.json` (V12 §2.6's `CalibrationEntry`) | the inspector's status line, reference, due milestone, evidence lines and history | §7.6; V12 §2.6 |

**The dossier facts this volume shows** (it writes none; each is read through the port's digest and §7.7's rows):

| fact shown | dossier field (`DossierDigest`, §14) | the rule that carries it to the map | where it appears (V09 §) |
|---|---|---|---|
| the title's tier word | `settlement.tierWord` | §7.7 item 15 | top bar and the `title` label (5.1) |
| a locked population | `settlement.population` | §7.7 item 15; host mode's `lockedControls` (V08 §5.1) | T1's size card, the basic panel (4.5) |
| a dossier-owned name or kind | `institutions[].name`, `.kindLabel`, `.kind` | §7.7 item 11 (the refusal) | the panel's locked fields, `refuse.dossierOwned` (4.4, 4.9) |
| a place's knowledge | `institutions[].knownTo` | §7.7 item 7 | "Who knows this place" chips, locked (4.3) |
| a collective range | `institutions[].count` | DR9, item 108 (b) | the record panel's "between 5 and 10" (4.7) |
| why an element is as it is | the change envelope from `receipts` | §7.7 item 13 (`DossierChange`) | the why card's "Since week …" (5.8); history rows (4.10) |
| how the map read the record (the port's notes) | the digest fields each `PortNote` kind names (V08 §4.6) | V08 §3.6 (4) (`dossierFacts.notes`, `DossierBinding.notes`) | the note lines under an absorb or creation head (4.10) and the report panel's standing notes (5.7) |
| a custom kind's profile sources | `institutions[].category`, `.tags`, `.custom` | item 104 (a) (2)–(7) | the profile chips (4.7, 5.8) |
| the tier of every field | the registry's dossier paths | §2.8's `factTier` over §7.7 item 12's binding | every tier chip (4.4) |
| an ancient ruin | `site.deposits` of kind `ancient_ruins`; an institution of scene archetype `ruined-landmark` | DR30, DR24 | a ruin's why card: "SettlementForge's record names ruins here" (4.17.3, 5.8) |
| a magical node, ley lines, a magical history | `site.deposits` of kind `magical_node`; the "Magical ley lines" income rows; `history.events` of type `magical` | DR30; `HistoryHint` | a ruin's why card (the source in words) |
| mining | `site.deposits` of the mining kinds | DR31 | a cavern's why card ("Mining here makes caves likelier") |
| the cathedral | `Cathedral (10,000+ only)`, `Great cathedral` | DR9, DR32 | every cathedral's "Below" line: its crypt, always, the largest (4.17.5) |
| how many catacombs | the church records (`Parish church` and its ranges, `Monastery or friary`) and item 108's collective members | DR9, DR32; V04 §3.5.1 (3) | the catacomb panel's count sentence (4.17.5) |
| the burial faces | `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house`, `Graveyard`, the `Cemetery network` grounds | DR32, item 108; V04 §3.5.1 (1) | the cemetery's "Catacombs below" line; the catacomb's "Under {burial face}" (4.17.5) |
| a crypt record | an institution matching the subterranean row `crypt` | DR17 | its church's "Below" line (4.17.5) |
| a forced system or undercity | the `tables/dossier/subterranean` rows; `CircumstanceSlice.undercity` | DR17 | the system's why card ("SettlementForge's record puts it here"); an access of cause `dossier` (4.17.3) |
| an aqueduct's reason (the water system) | the records bound to `conduit_house` (`Aqueduct or water system`, `Advanced water infrastructure`) and the demand records | DR34 (V08 §2.6b (1)) | a raised way's why card: a `facts` row of tier `dossier` under "The town raised it: it needed water" (4.20.6) |
| an elevated road's reason (high ground) | the dossier-bound institutions of class significance ≥ 20 and the custom `landmark` records at their reservations | DR35 (V08 §2.6b (2)) | the same card's `ref` rows, withheld names read by kind (4.20.6) |
| a toll bridge on a dry site | the dossier's toll bridge | §7.7 (item 399) | the bridge's why card; nothing else in V09 |
| an oasis | `site.deposits` of kind `oasis_water` on an arid `site.terrain` | DR40 | the oasis's why line "SettlementForge's record names an oasis here" (4.21.1); its delete refused as a dossier fact (`refuse.dossierOwned`) |
| the town's past | `peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, `history.events` | DR36–DR39 | the report panel's "What its past left" and the symbolic chip (4.21.3); the T1 History chip locked "Set by {host}" in host mode |
| that nothing of item 110 is dossier-bound | — | V08 §2.6b (5) | every raised way, retaining wall and deck plot is removable by the plain delete (4.20.3) |

## 2 Data model

The application adds no canonical state of its own: every change to a town is an event through `edit` (§7.1), and the
town's look is its logged style (§2.9). What it adds is view state (in the document's view section, outside every
digest), machine preferences, a local store and memory-only session state. The map-side declarations file g asks the
interface for are volume 11's document-only tables, written by `editTable` (V09 §2.6).

### 2.1 The five classes of state

The five differ in store and writer, so they stay apart.

| class | where it lives | written by | persisted | shared over a bridge | examples (V09 §) |
|---|---|---|---|---|---|
| canonical | the document's log and style (§2.9) | `edit` only | the `.plat` file | yes (`doc.apply`) | every declaration; the `editTable` rows of 2.6 |
| document view state | §2.9's view section, one key each, last-writer-wins by (Lamport counter, session) | `setView` | the `.plat` file (never in a digest) | the shared keys yes; the per-viewer keys never (§11.3) | restore points `restore/<id>` (shared); `thematic`, `workingLayer`, `underlay`, `showUnexcavated`, `cvdVariant`, `depthBand` and the base's keys of 4.19 (per viewer) |
| machine preferences | IndexedDB database `plat-app`, store `prefs` | the settings screen, hint completion, rail pins | the browser profile (never in a document) | no | `AppPrefs` (2.11) |
| local store | IndexedDB `plat-app`, stores `docs`, `journal`, `drafts`, `assets` | the autosave, the draft mirror, the underlay picker | the browser profile | no | `LocalDocRecord`, `DraftMirror`, underlay images (2.11) |
| session-transient | the main thread's memory | the shell | never (the draft is mirrored, 2.4) | no | selection and the hit stack under the last click (4.20.8), active tool, the draft, the preview and its effects (4.20.7), the variations tray, T4's Raised toggle (4.20.2), toasts, `ViewOpts.viewAs` (4.8), the People panel's filters, the upgrade offer's **Not now** (3.14 (a)) |

### 2.2 The shell: modes, layout classes, input capabilities, host slots

```ts
type ShellMode = 'standalone' | 'host';                       // host = V08's embed.html (V08 §5.1): its differences switch the slots below
type LayoutClass = 'wide' | 'medium' | 'narrow';               // V09 §4.12: wide ≥ 1024 CSS px wide; narrow < 600 px wide or < 480 px high; medium otherwise
interface InputCaps { finePointer: boolean; coarsePointer: boolean; hover: boolean; physicalKeyboard: boolean }   // from matchMedia('(pointer: fine|coarse)'), '(hover: hover)' and the last key event; re-read on change
  // readers: physicalKeyboard chooses the hints' wording ("press R" or "tap Try again") and whether Help offers the keymap overlay (V09 §5.9)
interface ShellConfig {
  mode: ShellMode; role: 'owner'|'editor'|'viewer';            // standalone: always 'owner' (§7.4's unshared document); host: from doc.load (§11.3)
  layout: LayoutClass; inputs: InputCaps;
  resolver: DocResolver | null;                                // standalone: the file resolver of §11.5 over the local store (V09 §3.8); host: null (V08 §5.1)
  clerk: ClerkSlot | null;                                     // V09 §2.10; standalone: null when the deployment's configuration enables no clerk; host mode: always set —
                                                               // kind 'built-in' when clerkMode is 'builtin', kind 'host' when it is 'host' or 'off' (the card-only drawer, V09 §4.11)
  host?: HostSlots }
interface HostSlots {                                          // the only places host mode changes the shell; V08 fills them
  header?: SlotRenderer /* V08 §4.2's actions */;
  banner?: SlotRenderer /* the frame's own strips: V08 §5.1's "Showing what the players see" and the held notice (V08 §5.2); a frozen view's notice is the
                           shell's own `error.frozen` strip with its one control, in both modes (V09 §3.14 (b); J-V9.97), never this slot's; the status
                           banner of V08 §5.1's table is SettlementForge's own, drawn outside the frame */;
  lockedControls: { control: string /* a control-registry id, §7.8 */; reason: MsgKey }[];   // e.g. population, tier word, the History chip: "Set by SettlementForge"
  historyFilter?: (row: HistoryRow) => boolean /* a generic host's viewer role (§11.3): its history filtered by its key; SettlementForge sets none — it mounts
                                                   no viewer frame (V08 §3.1, V08 §3.14) */;
  fileMenu: false /* host mode (J-V9.98): the file menu keeps Export skeleton, Rebuild around my drawings, Settings and About and drops New town, Open…,
                     Save a copy and Recently deleted, the host being the store (V08 §5.1); their keys (ctrl / cmd+O, ctrl / cmd+S; V09 §4.13) do nothing;
                     Settings drops its Storage section (no local store, V09 §3.8 (6)) and keeps every other section (V09 §5.12) */;
  exportFormats: Format[] /* by role and key, §11.1 Knowledge */;
  clerkMode: 'off'|'builtin'|'host' /* from the host's clerk.config (§11.3, item 473): builtin shows the Assistant button and the full drawer (V10 §3.17); off
                                      (until one arrives) and host show no button and no message box — the drawer opens only in its card-only mode, for a host's
                                      proposal (V09 §4.11). In the SettlementForge module the mode and the AI configuration are SettlementForge's own (J121, J122):
                                      SettlementForge's assistant proposes through the host proposal path ('host'); 'builtin' only where SettlementForge's
                                      configuration enables the built-in clerk */;
  hostName?: string /* the host's product name, read by "Set by {host}" (V09 §5.12) and a host card's AI mark `clerk.host.mark` (V09 §4.11); absent: "the host" */;
  historyLines?: { list(key: ViewState['knowledge']): HostHistoryLine[]; onChange(h: () => void): () => void /* returns its unsubscribe */ }
                                   // the host's own lines in the history panel — for SettlementForge the DM's reveals and hides and the time the party pictures were
                                   // last drawn (V08 §4.6), filled by the embed's bridge handler from host.state (V08 §3.1 step 7 (b), (c)); drawn as V09 §4.10's group
                                   // "The party"; absent: no group (J-V9.91). The shell calls list(effectiveKey()) (V09 §2.10) each time it draws the group — so again on
                                   // each onChange and each onEffectiveKey — and the provider names and targets only the places that key admits (each read with that key
                                   // as admitAs, V09 §2.7), keeping no View-as state of its own; it may answer at once with what it holds and fire onChange when more is
                                   // read (V08's per-key cache) (J-V9.114)
  newDocuments: 'download' | 'off' /* what an action that makes a NEW document does in the frame (V09 §3.9; J-V9.92): 'download' saves it to the user's device as a
                                      .plat and never opens it; 'off' hides those actions. Required in host mode: the frame holds one live document and has no local
                                      store, recent list or app tab (V08 §3.1 step 6; V09 §3.8 (6)) */ }
interface HostHistoryLine { at: number /* ms, when the host's change reached this session */; text: MsgRef /* a host.* key with its slots — volume 8's words (V09 §4.9) */;
  targets: Id[] /* entity ids for Show, the handler resolving a binding key to its entity; may be empty */ }
type SlotRenderer = (el: HTMLElement, ctx: { role: ShellConfig['role'] }) => () => void /* mounts; returns its unmount */
```

`ShellConfig` is built at boot (V09 §3.1) and rebuilt on a resize, an input change and, in host mode, every
`clerk.config` (`ClerkMount.host.onConfig`, V09 §2.10): the clerk slot's kind follows `clerkMode`, and a switch away from
`builtin` closes an open full drawer (`ClerkHandle.close`); nothing in it is persisted. A host's slots are the only
host-specific code paths in `@plat/app`, so a fix in the shell reaches both entries.

### 2.3 Tools as data — `toolkit.json`

The twelve tools, their sub-modes, the parameters the volumes add and the first-use hints are one versioned table in
`@plat/tables` beside `keymap.json` and `sugar.json` (§14's application tables, item 516), so `@plat/docs` generates the
tools' guide pages from it and a new parameter is a row, never code (§13.2's elegance bar: a new capability adds a
parameter, never a tool).

```ts
type ToolId = 'intend'|'ground'|'wall'|'road'|'quarter'|'place'|'roster'|'fill'|'shape'|'hold'|'name'|'dress';
type ToolLayer = 'L0'|'L1'|'L2'|'L3'|'L4';                     // item 101's commitment layers by id; in words L0 INTENT, L1 GROUND AND BONES, L2 PROGRAMME, L3 FABRIC, L4 FINISH (§7.1)
type GestureKind = 'points'|'stroke'|'brush'|'lasso'|'drop'|'click'|'drag-handle'|'card'|'text'|'slider'|'paste';
type PointsFormKind = 'seed'|'corners'|'lasso'|'sourceMouth'|'levelPoint'|'shoreBasin'|'twoPoints'|'polyline'|'onePoint';
interface ToolRow { id: ToolId; n: number /* 1–12, §7.1's order */; layer: ToolLayer; label: MsgKey; hint: MsgKey /* §14's first-use hint */;
  icon: string /* an id in the app's own icon sprite, V09 §5.1 */; key: string /* its keymap.json binding id */;
  firstScreen: boolean /* R9: true for intend, quarter, place, dress */; contextual: boolean /* true for shape, hold: offered once a thing is selected */;
  narrow: boolean /* available on the narrow layout (V09 §4.12) */; coarse: boolean /* available with a coarse pointer */;
  modes: ToolModeRow[]; params: ToolParamRow[] }
interface ToolModeRow { id: string; label: MsgKey; icon: string; gesture: GestureKind; pointsForm?: PointsFormKind;
  emits: string[] /* the EditEvent kinds (`t`) this mode's commit may carry — each a pair of §7.1's binding table, which T-V9-12 checks */;
  layers: ('ground'|'sky'|'underground')[] /* the working layers it acts on, V09 §4.2 */ }
interface ToolParamRow { id: string; label: MsgKey; kind: 'chip'|'card'|'slider'|'text'|'number'|'toggle'|'stamp';
  values?: string[] | { table: TableId; labelCell: string; iconCell?: string } /* chips from a list, or cards from a table's rows (district kinds, classes, style presets) */;
  range?: [number, number]; step?: number; unit?: string; default?: unknown;
  basic: boolean /* shown at once; else behind "more" (R4) */; source: string /* 'base §7.1' | 'V01 §4.2' | 'V05 §4.2' … */ }
```

The shipped rows are V09 §4.2's table. Lifecycle: shipped data (create: our table versions; read: the shell at boot and
`@plat/docs`; persist: the package; regenerate: n/a; undo: n/a; migrate: a new row or mode is additive, a removed mode is
refused by the loader while a keymap row or a `tool` button names it). A user never edits `toolkit.json`; a user pins
tools to the rail (`AppPrefs.railPins`, V09 §2.11) and rebinds keys (`AppPrefs.keymapOverrides`, as `keymap.json` row
operations, §14).

### 2.4 The declaration draft and its preview

```ts
type WorkingLayer = { layer: 'ground' } | { layer: 'sky'; key: PlatKey /* the island's arena, V05 */ } | { layer: 'underground' };   // the band is the view key `depthBand` alone (§2.9), never copied here
interface Draft {
  id: number;                                 // session-monotonic
  tool: ToolId; mode: string; params: Record<string, unknown>;   // T4's `raised` toggle and class chip, T3's `highSide`, T2's terrace `levelCm` and Oasis chip among them (V09 §4.20, V09 §4.21)
  layer: WorkingLayer;                        // the view key `workingLayer` at the gesture's start (V09 §4.2)
  points: PointCm[];                          // world cm, on the Sky layer in the island's own plan (V09 §3.4); a snapped point is stored as the snap target's point (§9.5), resolved before any preview
  free: boolean[];                            // per point: Alt was held (placed freely, no feature snap)
  strokes?: (FieldStroke | WarpStroke)[];     // brushes (T2, T8) and warp sessions
  text?: string;                              // T7's pasted list, T11's name, T6's typed locus
  target?: Id;                                // the entity a handle drag or a context action edits
  handle?: { entity: Id; index: number };     // the handle being dragged (V09 §3.5)
  startedAt: number;                          // performance.now() at pointer-down
  state: 'drawing'|'settled'|'previewing'|'ready'|'bent'|'refused'|'committing' }
interface PreviewState {
  draftId: number; gen: number;               // gen increments on every request; a result whose gen is not the latest is dropped (latest wins, §12.6)
  events: EditEvent[];                        // the events the draft maps to (V09 §3.3's mapper), sent to preview(h, events, { view })
  result?: PreviewResult;                     // §11.2 — fates, renames, counts, shape, bent, and the effects on what is not held (item 465; V09 §4.20.7)
  requestedAt: number; receivedAt?: number;   // for the latency telemetry of V09 §6
  stale: boolean }                            // the pointer moved since the request: the ghost dims (V09 §5.3)
interface VariationSet {
  source: 'fill'|'brush'|'quarter'|'reroll'|'clerk';     // V09 §3.6's four sources of a derived fill, and a clerk proposal's alternatives
  base: EditEvent[];                          // the draft's events (a fill, a setField stroke, a quarter, a scoped regenerate)
  items: { event?: EditEvent /* derived sources: the resolved event with its absolute reroll map (item 461) */;
           events?: EditEvent[] /* clerk: that variation's own events (V10 §2.5) */; label?: string /* clerk: V10's label */;
           result: PreviewResult; previewId: string /* the preview it belongs to, for `thumbnail` */; thumb: ImageBitmap | null }[];
  chosen: number;                             // 0–2 on the current page
  page: number }                              // "Show three more" advances past the rerolls used (V09 §3.6); clerk variations have one page
```

**The draft mirror (R15, never lose work).** While a draft is `drawing` or later, its points, params, text and target are
written to IndexedDB store `drafts` as a `DraftMirror` (V09 §2.11) at every pointer settle; commit or cancel deletes it.
On the next open of that document a mirror found there offers "Finish the {toolName} you were drawing?" — accepting
rebuilds the draft and previews it; declining deletes the mirror. A draft is never in the log.

### 2.5 Selection, handles and the count badge

```ts
interface Selection { ids: Id[]; primary?: Id;
  kind: 'entity'|'label'|'link'|'handle'|'region'|'record'|'part';   // 'region': a region group of quarters (§9.1) selected by its label or by T11's
                                                               // "Name as region" — its panel renames, re-groups or dissolves it (`group`, §7.1);
                                                               // 'part': a sub-part of one entity — a raised way's span, a crossing of a retaining wall, a stepped building's tier (V09 §4.20.8)
  part?: { id: Id; path: string /* 'spans/<n>' · 'crossings/<retaining wall id>' · 'tiers/<k>' — the hit answer's `sub` (item 466) */ };
  stack?: { ids: Id[] /* the hit answer at the last click, top first (item 466) */; at: PointCm; index: number /* the entry selected */ };
  scope?: EditScope /* a lasso's or a box's resolved scope, for New random and multi-move */ }
interface HandleSet { entity: Id;
  kind: 'boundary'|'knot'|'vertex'|'level'|'islandRim'|'footprint'|'label'|'gate'|'stretchEnd'|'underlay'|'frame'
      | 'rangeEnd'|'rangeWidth'|'towerCentre'|'towerResize'|'roomExtent'|'keep'|'bailey'
      | 'rampEnd'|'terraceLevel'|'tierStep'|'shrineInset';   // item 110 (V09 §4.20): a raised way's end on the ground, a terrace's level, tier 1's inset step, a
                                                             // stepped building's top shrine (V02 §4.6)
  points: PointCm[] /* by V09 §3.5's rules */; emits: string /* the event kind a drag commits, by V09 §3.5's table */;
  more: boolean /* the user asked for more handles on this entity (session only) */ }
interface CountBadge { plots: number; households: number; buildings: number;       // §11.2 PreviewResult.counts
  byFate: Record<'kept'|'carried'|'orphaned'|'discarded', number>;
  extra: { label: MsgKey; value: number; unit?: string }[];                           // per tool, V09 §4.5: gates, towers, walled and barrier metres, houses displaced, length, area
  effects: number;                                                                     // `PreviewResult.effects.length + effectsMore` (item 465): "and {n} other changes", with Show
  plusMinus?: { param: string /* the draft parameter a press steps */; step: number; min: number; max: number } }
```

All three are session-transient and derived: a `Selection` from clicks and lists (its `stack` from the hit answer,
cycled by V09 §4.20.8); a `HandleSet` from the selected entity's geometry by V09 §3.5's rule; a `CountBadge` from the
latest `PreviewResult`. None is saved. A lake has no rim handles: its shore is its basin filled to its level (S1's basin
fill), so it offers the level handle and T2's water paint (J-V9.47) — an oasis too, its spring point a `knot` handle.

### 2.6 The map-side declarations file g asks the interface to store

Items 104 (a) (1), 105 (h) and 105 (j) let the author override siting, keep a split works-and-shop pair on one plot, and
pin, move or cut a supply link — "stored map-side … never written to the dossier". They live in volume 11's two
document-only tables, `siting.declared` and `siting.linkEdits`, whose key forms and the cells each form admits are
V11 §4.2's (item 380); every edit is an `editTable` row operation with V11 §4.4's lifecycle (the inverse row operation
undoes; a key that no longer resolves is orphaned and reported in the history panel's orphans, V09 §4.10) and V11 §4.3's
locality (a placed use is kept and listed with the score it would gain by moving). One store: the solver, the clerk and
the canvas read and write the same rows (J-V9.36). Each screen writes a cell V11 §4.2 declares:

| screen (V09 §) | table | key form | cells written | owner rule |
|---|---|---|---|---|
| "All {kind}s in this town", the per-kind panel (4.7) | `siting.declared` | `uid:` (a custom kind), `cat:` (a catalogue kind) or `cls:` (a roster class no dossier record binds) | `familyWeights` (the ladder below); `profile` ("Edit the details"); `split: false` ("Keep works and shop together for every {kind}"); `quarter` ("Put them in {quarter}"); `place` ("Put them here") | item 104 (a) (1) |
| the per-kind panel's "Keep them where they are" (4.7) | `siting.declared` | one `use:` row per present member of the kind, in one group | `pin` (the member's present plot) | item 104 (a) (1) |
| "Keep together on one plot", on one split institution (4.7) | `siting.declared` | `use:` (the works use's address) | `split: false`; "Let the rules decide" deletes the row | item 105 (h) |
| the link view (4.7) | `siting.linkEdits` | `<consumer use address>/<good>` | `bindTo` ("Keep this supplier", "Use another supplier"); `avoid` ("Cut this link": the provider joins the list, the next nearest serves); `cut: true` with neither ("Stop buying {good} here": no pull for that good at that use); "Reset" deletes the row | item 105 (j) |

**The family multipliers.** `familyWeights` holds, per family id of V11 §2.4's enum (`nuisance`, `need`, `clientele`,
`supply`, `alignment`, `competition`, `coverage`, `sun`), one of **Ignore 0 · Less 0.5 · Normal 1 · More 2 · Much more 3**,
multiplying that family's soft terms for every use of the key's kind; a hard need is never scaled (item 103 (c)); absent
is 1. This is the ladder's one statement; V09 §4.7 and V10 cite it. **No per-use siting weights** (J-V9.36): a single
place is moved (`relocateUse`) or pinned (`placeAt`, T10) — the per-kind declaration is the row, and one member's site is
its own edit. **Tier and dossier.** Each row is `declared` (§2.8's `factTier`) and held by every re-derivation (§7.2). A
dossier-backed kind accepts rows — they change where the map puts or binds things, never a dossier fact (item 20 (h)) —
and no row is ever written to the dossier. A dossier event that removes the kind orphans its row, reported (V11 §4.4).
**Class-wide rules** — a class's profile cells in `roster.classes` for every town — stay the tables editor's (V09 §4.14).

### 2.7 The answers the panels render

The panels read §11.2's `query`. **The oracle's answer is volume 10's `WhyAnswer`** (V10 §2.13; §11.2, item 468),
produced by each kind's `WhyProvider` (§2.8, item 270); this volume adds none of its fields (J-V9.33). The why card
(V09 §5.8), the source chips (V09 §4.7), the drawer's why turn (V09 §4.11), the underground panels (V09 §4.17), item
110's panels (V09 §4.20.6) and the oasis and past lines (V09 §4.21) render one app-side projection of it,
`WhyCardModel`, built on the main thread from the answer and the row sentences V11 §4.5 resolves; it is
session-transient and never saved.

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
  facts: { label: MsgRef; value: string; tier: FactTier; row?: string; symbolic?: true }[];
  dossierLine?: MsgRef;
  drifted: boolean;
  sections: { kind: string /* V10 §3.9's section name */; title: MsgRef /* 'why.section.<kind>', V09 §4.9 */;
    rows: { text: MsgRef; value?: string; tier: FactTier; target?: Id; withheld?: true }[] }[] }   // after facts, in the providers' registration order (V10 §3.9)
```

| card field | read from `WhyAnswer` | rule |
|---|---|---|
| `decidedBy` | the oldest `cause` entry | an event carrying `EditBase.dossier` → "Placed here by SettlementForge's record"; a declaring event of §7.1's toolkit by the user → "You placed it here" ("You accepted the assistant's proposal" when it carries `proposedBy: 'clerk'`); `step` S10b → "The rules put it here"; `chance` present → "Placed by chance among equal sites"; an epoch → "The town's growth put it here in {year}"; a creation-prefix epoch of the history replay (§4.11) → "Built when the town was {a tierWord}, in year {year}" (V09 §4.21.3); a raised way → its own `raised` section row (`info.raised.built` at an epoch with its year, `.carried` or `.declared`, in V10 §3.9's words), which the section block then does not draw again (J-V9.82); a retaining wall the levelling made → "The ground was levelled here; it steps {m} m"; a span walled up by the rules → "An arch of {way}, walled up as a vault" ("… by you" after a span edit); otherwise "The rules made it" |
| `bars` from pulls | `pulls` | length \|`share`\| against the largest in the answer; side by sign (left a push away, right a pull toward); text: the `row` id resolved by V11 §4.5 — a family row's `says` with the target's name, a signature pair's `reason`, a class row's note, a supply edge's good, the water pull's row (item 111) with its water's name; the target named and clickable (Show) |
| `bars` from drivers | `drivers.terms` (a district, block or plot; item 102 (f)) | each term's `delta` as a bar; `daylight` reads "In shade {p} % of the day"; `water` (item 111's prosperity water term) reads "Near {water}: {m} m"; the others by their catalogue rows `why.driver.<driver>` |
| `closure` | `closure` (an enceinte, gate or tower; item 106 (g)) | "The {barrier} closes the circuit from {from} to {to}" per arc |
| `links` | `links` | role `consumer` → "Buys {good} from {other} ({distM} m, {near enough \| a long way})", role `provider` → "Sells {good} to {other}"; "near enough" when `distM` ≤ `comfortM`; the orientation in words ("works near its source", "sells near its market", "balanced"); `branchOf` → "its shop" or "its works" |
| `members` | `members` | "{count} {kind}s (the town's size asks for {min} to {max})" and the step in words (V09 §4.7) |
| `chips` | `profile.sources[].rung` | declaration → "yours"; archetype → "from its picture type"; category → "from its category"; tags → "from its tags"; library → "from its library entry"; keywords → "guessed from its name" in the low-confidence tone; fallback → "a general guess" |
| `alternatives` | `alternatives` | numbered outlines at `plot` while the card is open |
| `facts` | `facts` | the registry's path label (§2.8, item 269), the tier chip, for a `row` "from SettlementForge's record, by rule {row}", and for a fact whose provenance is `symbolic` (§2.8; item 113 (f)) the chip "a size the record does not give" |
| `dossierLine` | the newest `history` entry with a `change` | "Since week {w}: {reason}" |
| `drifted` | `evaluated.drifted` | "Today the rules would put it elsewhere; it stays." |
| `sections` | `sections` (V10 §2.13's `WhySection`; V10 §3.9, V10 §3.9a) | one block per section, in the answer's order, after `facts`; `title` the key `why.section.<kind>` (V09 §4.9); per row: `text` its `says` (a key of V09 §4.9's families), else the registry path label of its `key`; `value` with its `unit` in the user's units (`AppPrefs.units`); `tier` its tier chip; `target` its `ref`, named and clickable (Show); a `withheld` row reads "somewhere the viewer doesn't know"; a `purpose` row never arrives (the facade drops it, V10 §3.9). Every panel that draws an answer draws these same rows, so one `MsgRef` is one sentence everywhere |

A withheld target, member or link end reads "somewhere the viewer doesn't know" (§11.2 *Knowledge* (2)); a withheld
subject shows its kind and nothing else. An answer with no pull, no driver and no section draws the subject, `decidedBy`
and the facts only — never an empty bar chart.

**Every band-less read speaks for its view** (J-V9.86). Every `query` the application makes for a view — `why`,
`entity`, `sites`, `links`, `gazetteer`, `people`, `whereIs`, `relations`, and any band-less kind added later — is sent
as `query(h, q, { admitAs })` with the view's effective key (V09 §2.10's `effectiveKey()`, in the form of §11.2's
`admitAs`, item 572), and is one reader of §9.2's one admission; so the why card, the source chips, the context panel,
the gazetteer and "features in view", the Link card, the record panel's members, the People panel, the family tree,
"Where is" and T6's alternative sites admit only what View as admits, and a cached answer is dropped and re-asked when
`onEffectiveKey` fires. The view-bound reads — the tiles, the labels and the hit stack — read `viewAs` through §9.2
(item 464). The export dialog's default knowledge is the same key (item 453; V09 §5.10). The application's own dry runs
— the ghost, the badge, the fates sheet, the refusal and bend cards, the effects list — carry no `admitAs`: they confirm
a change the user commits under the role's key, and a filtered dry run drops concealed uses from its fates (item 470),
so the person accepting would not see all the change moves; the View as banner stays up above them. The clerk passes
its own `admitAs` (V10 §2.3).

**The supply links** are the one list the oracle does not give per view, so `query({ kind: 'links', … })` (item 460)
returns `LinkRow`s, read from the generation worker's link cache (V09 §3.15):

```ts
interface LinkRow {
  consumer: Id; provider: Id; good: string;
  distanceM: number; comfortM: number; maxDistanceM: number;
  satisfaction: number /* 0–1: 1 within comfortM, falling to 0 at maxDistanceM, item 107 (b) */;
  mode: 'road'|'water'|'any'; volume: number /* the good's relative volume, item 105 (c) */;
  orientation: 'source'|'market'|'balanced';      // V10's WhyLink field, item 105 (b)
  declared?: 'bindTo'|'avoid'|'cut';              // a siting.linkEdits row names it (V09 §2.6)
  chain?: WhyLink['chain'];                        // item 105 (i): a SettlementForge chain's id, status and an entrepôt's end — V10 §2.13's type
  source: 'class'|'dossier'|'custom'; withheld?: true }
```

**A record's members** are `EntityCard.members` (`query({ kind: 'entity', id })`, item 468) and `WhyAnswer.members`; this
volume asks for no query kind of its own for them (J-V9.42).

**The shade raster.** The shade map view (V09 §5.4) reads item 102's daylight-share driver `D(x)` as the field keeps it —
a raster at the prosperity field's cell size, held by the generation worker beside the field (recomputed on load with
the field, never stored, §2.9) — through the live-layer model view: `ModelView.fieldDriver('daylight'): { cellCm:
number; origin: PointCm; w: number; h: number; values: Uint8Array /* 0–255 ≙ D 0–1 */ }` (item 411). Where the field did
not compute it (a table with `w_sun` = 0 may skip the sampler), the accessor runs item 102 (a)'s sampler on demand in
the generation worker over the same casters and caches it for the document state, within V09 §6.4's cost law, so the
view works whatever the weight and never changes the field. A floating island's contribution is never sampled here: its
strip is V05's held strip (V05 §5.1's `sky.island.shadeStrip` and `shadePending` rows), drawn as V05 states it (V09 §5.4).

### 2.8 History rows and restore points

```ts
interface HistoryRow {                          // derived from the log on demand (never stored); V09 §4.10 renders it
  seq: number; kind: string /* EditEvent['t'] */; group?: number;
  author: 'user'|'host'|'epoch'|'migration'; proposedBy?: 'clerk'; dossier?: { changeId?: string; reason?: string };
  epoch?: number; week?: number;                // the epoch and week it folded in (§4.11)
  time?: number;                                // wall-clock ms from this machine's journal (2.11) for events made here; absent otherwise
  text: MsgRef;                                 // the plain-words line, V09 §4.10's templates: "Painted the quarter Tanners' Row (42 plots)"
  targets: Id[];                                // from the event's touched set (§7.4) — "show me" highlights them
  lines?: { text: MsgRef; targets: Id[] }[];    // derived sub-lines drawn under the row (V09 §4.10): a dossier event's report entries, a `dossierFacts` event's notes,
                                                // an epoch's suppressed raised-way reasons; each with Show when `targets` is not empty; never stored
  dossierGroup?: number;                        // the seq of the `dossierFacts` event heading the group the row is drawn in (V09 §4.10; J-V9.107): set on that event's own row and on each port event after it
  status: 'live'|'undone'|'undo'|'redo';        // §7.4: live unless an undo targets it and no later redo re-applies it
  undoable: boolean; notUndoable?: 'creation'|'dossier'|'dependent'|'otherSession'|'window' }   // why not, in the message catalogue
interface RestorePoint {                        // one shared document view key each: `restore/<id>` (§2.9 view section)
  id: string /* 12 base-32 chars, random, minted by the app */; seq: number /* the log position: the state after this event */;
  name: string /* ≤ 60 chars; the user's, or the auto text */; auto?: 'beforeWholeTown'|'timed'|'beforeRestore'|'beforeImport';
  createdAt: number; session: string }
```

**Auto restore points** are written before every whole-town action — a Re-derive from S0–S4 (T1's site, size, walls or
History changed after declarations, §7.1), an `upgrade`, a `rebase`, "apply my current preferences" (§7.6), an epoch
advance (V06's time card) and a restore itself — and every 15 minutes of active editing when at least one event was
committed since the last one. At most 20 auto points are kept (the oldest is deleted by writing its key to `null`); named
points are kept until deleted, at most 200 per document. A `null` key whose Lamport stamp is older than the snapshot is
dropped by the next compaction (V09 §3.8), so deleted points do not accumulate. Restoring and opening a copy are V09 §3.9's.

### 2.9 The message catalogue

```ts
type MsgKey = string;                          // dotted: 'refuse.dossierOwned', 'bend.wall.ridge', 'fate.orphaned', 'error.storage.quota'
type MsgRef = { key: MsgKey; args?: Record<string, string | number | { id: Id }> };   // an { id } argument is an address rendered under a key, a withheld place as its kind:
                                               // an engine-built MsgRef (a bend, a refusal, a conflict action) under the caller's key; a line a panel builds from band-less data
                                               // (the report's entries, V09 §4.10, V09 §5.7) under the view's effectiveKey() (V09 §2.7)
interface MsgRow { key: MsgKey; text: string /* {placeholders}; one sentence, ≤ 25 words, no jargon (T-V9-15) */;
  buttons?: MsgButton[] /* the row's buttons in their order — V09 §4.9's button column; read from en.json only */; tone: 'info'|'bend'|'refusal'|'error'|'success'|'hint';
  codes: string[] /* the engine codes it renders: an F-EDIT reason, a ConflictAction kind, an E_* error, a PortNote, a link-refusal condition */ }
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
  'reattach'|'enterKey'|'openSettings'|'viewAsOff'|'showEffects';   // V09 §4.9's application commands, one row each
```

**Argument forms.** A slot is written `{name}`. English has one more form, the indefinite `{a name}`: the slot's
rendered words after "an" when they begin with a, e, i, o or u — except words beginning "uni", "use", "usu", "eu" or
"one", which take "a" — else after "a" (a withheld place rendered as its kind takes the form by the kind's words). The
form is `en`'s only: a locale file writes its own grammar in its `text`. A row never writes "a {" or "an {" before a slot
(T-V9-15).

**The buttons as data** (J-V9.121). Every button a row offers is one `MsgButton` of its `buttons` list, in order, so the
canvas's cards and toasts and volume 10's drawer read one source (T101-3; T-V9-15, T-V9-27, T-V10-4). **Words.** A
button is worded by its `key`, a `button.*` row, its slots filled from the row's `MsgRef` — or, for a button that
carries one entry of a list, from that entry: a `ConflictAction`, whose `msg` (item 463) is keyed as the button; an
alternative's plot, site or building; an unplaced element — each name read at the reader's key (the canvas's the role's
key, J-V9.86; the clerk's its session key). **What each class does on the canvas.** `commit` previews its events as a
new draft and commits on Accept (V09 §3.3): from a `ConflictAction` kind, the first action of that kind in the answer's
order — `unlock` the `unlock` of its `target`, `unassign` an `unassign` of its `target`, `moveTo` the draft's declaration
at its `target` (J-V9.111's form for an assignment), `reroute` the draft through its `at` — the other actions of that
kind marked on the map; from `alternatives`, one entry of `PreviewResult.alternatives` (items 463, 372) — the draft at
that plot by V10 §4.1's `where.plot`, or V09 §4.17.4's access group for that building — the canvas drawing them marked
(a click on one picks it) and its one button, worded by `key`, stepping to the next alternative not yet tried, while a
card that shows every alternative at once (the drawer's, V10 §3.16) has one button per alternative worded by `each`;
from `unplaced`, one per unplaced element of the dossier's list (§7.1's roster rule), drawn as V09 §4.16 (5)'s picker,
the line re-previewed with its `element`; from `event`, the events the event form names. `why` opens the why card or
the page by V10 §3.5 step 3's *The why target*, `page` naming the page where the row gives one. `show` selects what `arg`
names and frames it (`live.selection`): a `MsgRef` argument's `{ id }`; the preview's `alternatives`; the dependent later
events' targets (`dependents`, §7.4); the preview's created addresses of one registry kind (`created:<kind>`, item 470);
an effect's `targets` (item 465); a report entry's addresses (`entry`, §5.4); a removed slot's former outline (`slot`,
drawn, nothing selected); or, for `preview`, the draft re-previewed and its fresh ghost drawn. A selection is how the
canvas moves a thing (V09 §4.6), so **Move it** is a `show`. `tool` activates `tool` in `mode` on that mode's working
layer (V09 §4.2), with `subject` the row's first admitted address argument selected first. `drop` closes the card and
withdraws the draft or pending edit it belongs to (**Keep {building}**, **Keep a way open**), or dismisses a notice that
has none (**Not now**). `app` runs one application command (V09 §4.9's list) and is never an edit of its own. **Where a
button is not drawn.** A `commit` whose source yields nothing (no action of that kind, no alternative left, no element
unplaced, an event form with nothing to change), a `subject` button whose row has no address argument the reader's key
admits, and a button whose `when` does not hold are not drawn; every `refuse.*` row still keeps **Show me why**, its last
button. **Arguments a button reads.** A `show` `arg`, a `subject` and a `page` template read the row's `MsgRef`; where
the text shows no such argument the engine's `MsgRef` still carries it (item 463: `args` hold every argument, shown or
not) — among them `thing`, `building`, `crypt`, `layer` and `layerId` on engine rows and `source` on a panel's line — and
T-V9-13's fixtures check each engine row's. **The clerk's reading** (V10 §3.5 step 3): `commit` → a `propose` of the same
events (inside a proposal of several items, the active variation's events with the bent item's replaced, V10 §3.16),
`why` → `why`, `show` → `select`, `tool` → `useTool` with `mode` and, for `subject`, the ids, `drop` → the card's
**Drop** where the bent item is the proposal's only item, else a `propose` without it (V10 §3.16). No `bend.*` row and no
`refuse.*` row a dry run answers carries an `app` button (T-V9-15), so a card the clerk builds meets five classes; a
fate's or a removal's line with an `app` **Undo** that the drawer draws on a proposal card shows it only once the
proposal is accepted, as the card's own **Undo**; a proposal card's effect lines are V09 §4.11's. The `refuse.clerk.*`
family carries no `buttons`: its alternatives are volume 10's `clerk.content.refusals` actions (V10 §2.10). A
`button.*` row has tone `info`, no `codes` and no `buttons`, and at most eight words.

**The file and its locales.** File `@plat/tables/messages/en.json` (§14's application tables, item 516): versioned data
with provenance `own`. English is the catalogue's source language and `en.json` the contract: it carries every key with
its `text`, `buttons`, `tone` and `codes`. A locale is another file of the same keys carrying their `text` only (its row
type `{ key; text }`, V11 §3.1's registry row 87), its loader refusing any other field. Which locales ship follows
SettlementForge's decision on interface languages (J121); the frame's interface language is the host's, read on
`doc.load` (§11.3), and standalone the browser's language where a shipped locale has it, else English. V09 §4.9 lists
the rows. A code the engine can emit with no row is a CI failure (T-V9-15), so a new refusal never reaches a user as a
raw code. **One message mechanism** (J-V9.42): the engine's bend lines, conflict actions and F-EDIT messages are
`MsgRef`s whose address arguments it renders per caller under the caller's key (item 463); the application renders
them with this catalogue, and volume 10's clerk renders the same keys (its `DraftItem.bent` is a `MsgRef`, V10 §2.4).
**The file carries every key any surface renders** (J-V9.79): beside the application's own rows it holds the key
families volume 10 renders and volume 6's line `info.copy.condensed`, their `en` texts written once by their owners and
loaded from there (V09 §4.9's families paragraph), and shows volume 11's `says` and `reason` sentences as volume 11 writes
them. T-V9-15 covers every family and runs its readability step over all of them, reporting a failure to the owning
volume (J-V9.55, amended by J-V9.79).

### 2.10 The clerk slot — what the drawer drives

The drawer is volume 10's view model drawn by this volume (V10 §2.6, V10 §5.4); the harness that runs the model, holds
the session and commits on acceptance is volume 10's (V10 §2.1, V10 §4.2), and `ClerkHandle`'s members are V10 §2.6's
(the harness adds none). This volume declares the mount point and the handle it drives, named so that none collides with
volume 10's `ClerkSession`, `ClerkTurn`, `Proposal` or `Variation`:

```ts
interface ClerkSlot { id: string; label: string /* "Assistant (AI)" — the catalogue's word, always shown with the AI mark; "clerk" stays the internal name */;
  kind: 'built-in'|'host' /* 'host': the card-only drawer for a host's proposal (V09 §2.2, V09 §4.11) */;
  mount(ctx: ClerkMount): ClerkHandle }                    // V10's harness implements it for both kinds — kind 'host' with no model backend; null in ShellConfig when none
interface ClerkMount {                                     // what the shell hands the harness
  doc: DocHandle; view: ViewHandle; role: 'owner'|'editor'|'viewer';
  selection: () => Id[];
  openNewDocument: (h: DocHandle) => void;                 // creation acceptance: the new document beside the current one (V10 §4.2 (3)); in host mode by
                                                           // HostSlots.newDocuments (V09 §3.9): saved to the user's device, never opened in the frame
  rebuildEvents: (seq: number) => Promise<WithoutBase<EditEvent>[]>;   // the removal group whose first seq is `seq`: each of its deletes' "Build it again" events by
                                                           // V09 §4.20.3 (4), from the `entity` answers on the tombstoned ids (item 467) read with admitAs = effectiveKey() —
                                                           // the one implementation, which the history row's Build it again also calls; [] when nothing can be built;
                                                           // V10 §4.3's rebuild takes exactly these (J-V9.94)
  showScratch: (h: DocHandle | null) => void;              // the creation preview's read-only view and its banner (V09 §4.11)
  effectiveKey: () => ViewState['knowledge'];              // the view's key read through View as (`ViewOpts.viewAs`, item 464) by the rule below — V10 §2.3's session key
                                                           // and the `admitAs` of the application's own band-less reads (V09 §2.7): the shell's one computation of it
  onEffectiveKey: (h: (k: ViewState['knowledge']) => void) => () => void;   // fired on a change of either; returns its unsubscribe
  host?: {                                                 // host mode only: the embed's bridge handler fills it (V08 §3.1); absent standalone
    config(): ClerkConfig | null;                          // the latest clerk.config body (null before one arrives: mode 'off')
    onConfig(h: (c: ClerkConfig) => void): () => void;     // every later clerk.config, a token refresh among them; returns its unsubscribe
    needsToken(): void;                                    // posts clerk.needsToken {} (V10 §3.17's refresh lead, or an authentication failure)
    refused(reason: 'origin'): void;                       // posts clerk.config.refused { reason } (item 473 (a))
    proposals: AsyncIterable<{ events: EditEvent[]; proposal: HostProposal }>;   // each preview { events, view: true, proposal } from the host, in arrival order
    answer(id: string, status: 'accepted'|'dropped'|'stale'|'failed', seqs?: number[]): void } }   // posts clerk.proposal (item 473 (b))
// ClerkConfig is item 473's clerk.config body (mode; transport { baseURL, token, expiresAt, fallbacks? }; capUsd) and HostProposal its (b)'s proposal body
// (id, reason, variations) — both generated from @plat/api's bridge schema under the names V08's client uses (V08 §2.2), never restated here
interface ClerkHandle {                                    // createClerk(mount) returns it (V10 §2.6)
  turns: AsyncIterable<TurnView>;                          // every update of every turn (V10 §2.6): progress lines, reply blocks, the proposal, the refusals, costUsd
  send(text: string, entry?: 'drawer'|'why'|'check'|'roster'|'help' /* V10 §3.1's five entries */, attach?: { why?: WhyAnswer; skeleton?: Blob; roster?: string;
                                                           newMap?: true /* the drawer's Start a new map from this (V09 §4.11): V10 §3.1 (4) reads it as the user's choice of
                                                                            creation mode for this message; never set in host mode (J-V9.93) */ }): void;
  accept(proposalId: string, variation: number): Promise<void>;   // V10 §4.2: the harness re-previews, then commits one group with proposedBy 'clerk'
  acceptLines(proposalId: string, lines: number[]): Promise<void>;
  retry(proposalId: string): void; drop(proposalId: string): void;
  focus(proposalId: string, variation: number): void;      // draws that variation's ghost (its own preview, V09 §3.6)
  stop(): void; close(): void;
  settings(): ClerkSettings; setSettings(p: Partial<ClerkSettings>): void;   // V10 §2.2: the one store of the clerk's settings
  setKey(key: string | null, remember: boolean): Promise<ClerkSettings['keyState']>;   // only where the configuration enables the built-in clerk with a user key: checks the key
                                                           // before storing it (V10 §3.19); "remember on this device" writes V10's device key; null forgets it; the key card shows the verdict (V09 §4.11)
  usage(): UsageTally;                                     // V10 §2.8: the turn's and the month's estimate against the caps
  run(action: ClerkAction): Promise<void>;                 // the harness's half of V10 §2.6's dispatch table — propose, undo, rebuild; the application runs select,
                                                           // why (the why card or Help page, V09 §5.8, V09 §5.9), openSettings, useTool, export, fork (forkAt)
                                                           // and rerun (rerunFrom) itself — seven kinds — and passes the rest here (V09 §4.11)
  newTopic(): void;                                        // the drawer menu's New topic: closes the route's live segment (V10 §3.2)
  defects(): DefectRecord[]; clearDefects(): void }        // V10 §2.8's device defect store, listed in Settings' Assistant section (V09 §5.12)
```

**The effective key** (J-V9.85). `effectiveKey()` reads the view's knowledge key K (§2.9, §11.3) through
`ViewOpts.viewAs`: unset, it returns K; a tier t returns `{ tier: the lower of t and K's tier, places: K's places }`; a key
form f (a host's players' view, V09 §4.8) returns f itself when f's tier is below K's — its places standing in for K's —
and, when f's tier is not below K's, `{ tier: K's tier, places: the places both lists hold }`, the safe side (it may hide a
place K learned that f's tier would admit, never show one either withholds). Every reader it reaches admits exactly what
both it and K admit — the facade by `admitAs` (item 572), §9.2's admission by `viewAs` (item 464) — so a place on f's
list that K does not admit is never shown (J-A30.82). It is passed as `admitAs` in item 572's form: `'secret'` when its
tier is `secret`, else `{ tier, places }`. `onEffectiveKey` fires when either input changes: a `view.set` of K (§11.3),
the View as menu, or a host setting or clearing its form. The shell computes it once per view, hands the same function to
the clerk slot and passes its value to a host's `HostSlots.historyLines.list` (V09 §2.2), so the panels, the host's lines
and the drawer never read at two keys.

**Who commits.** The harness commits, and only on the drawer's **Accept** (or "Accept these lines" on a roster card) — or,
when the user has switched on V10 §4.4's apply-then-undo setting, on a finished turn whose variation needs no
confirmation, its card reading `clerk.applied` (V10 §4.4). Never silently: every commit has its card, its AI mark and its
undo (J-V9.34). The facade the harness uses is §11.2's, under the session's role and key: a viewer's drawer reads and asks
why, and every declaration answers `role`, its card worded by `refuse.viewer` (V09 §4.9; V10 §3.16's `role` row). **One
settings store.** `ClerkSettings` (V10 §2.2, device key `plat.clerk.settings`) holds on or off, the backend, where the key
lives, the apply mode, keep history, the caps and the consent; `AppPrefs` holds nothing of the clerk's. **Whose AI
setup** (J121, J122). In the SettlementForge module the assistant, its provider, model tier and key path are
SettlementForge's: a host's `clerk.config` forces `enabled` and the backend (V10 §3.17), its mode reaching the shell as
`HostSlots.clerkMode` (the button and the slot's kind) and its whole body reaching the harness as `ClerkMount.host` (the
transport with its fallbacks and `capUsd`, for V10's `HostProxyBackend`; the token held in memory only), with the other
four bridge messages of item 473 — one channel, the embed's bridge handler (V08 §3.1), so the harness never touches the
bridge itself. Standalone, the clerk exists only where the deployment's configuration enables the built-in clerk, and
the own-key card appears only where that configuration asks for a user key (V09 §4.11).

### 2.11 Machine preferences and the local store

```ts
interface AppPrefs {
  schema: 1;
  units: 'metric'|'imperial'; theme: 'system'|'light'|'dark'; uiScale: 1|1.25|1.5|1.75|2;
  reducedMotion: 'system'|'on'|'off'; highContrastChrome: boolean; largeTargets: boolean /* 44 px minimum even with a fine pointer */;
  announcePreviews: boolean /* the live region's preview summaries (V09 §6.3); on by default (a polite live region is silent unless a screen reader reads it) */;
  longPressMs: number /* 300–1 000, default 500 (V09 §4.15) */;
  hintsDone: Record<string /* ToolId | 'clerk' | 'tour' | 'variations' | 'restore' */, number /* ms when completed; 0 = not yet */>;
  tourOffered: boolean;                        // the guided first town was offered once (V09 §5.9)
  railPins: ToolId[]; railExpanded: ToolLayer[];   // tools pinned to the rail; layer groups left open
  snapRadiusPx: number /* default 8 (§9.5), 4–24 */; handles: 'fewer'|'default'|'more' /* 4 / 4–8 / up to 16 */;
  keymapOverrides: RowOp[];                    // over keymap.json (§14): row operations by binding id
  history: { storeMB: number; frames: number };   // the user's values of V06's history store and frame cache — their defaults and ranges are V06 §2.2's device settings
  reroll: { keepChangeToggle: boolean };       // §13.4's fallback for "declared means held"; off until the test asks for it
  touch: { editFabric: boolean };              // §13.4's touch fallback: false hides the FABRIC and FINISH layers' edits on a coarse pointer
  generation: { stylePreset?: string; packs?: string[]; rung?: string; labels?: boolean };   // §7.6's userGlobal layer, folded into a new document's recipe
  recent: { docId: string; title: string; openedAt: number }[] }   // ≤ 20
interface LocalDocRecord {                      // store `docs`, key docId
  docId: string; title: string; rung: string; thumb: Blob /* 256 px PNG from the tile worker */;
  snapshot: Blob;                               // the last compacted `.plat` (§2.9's writer; model included)
  snapshotSeq: number;                          // the log head the snapshot holds
  bytes: number; savedAt: number; outputVersion: string;
  appVersion: string;                           // the application that last wrote the record; read at open (V09 §3.1 (c)): a record from a newer application opens read-only
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
  | { api: 'setView'; patch: Record<string, unknown> /* shared view keys only: restore points */ }
interface DraftMirror { docId: string; draft: Omit<Draft, 'state'>; savedAt: number; appVersion: string }   // store `drafts`, key docId
interface UnderlayAsset { hash: string /* SHA-256 of the bytes */; bytes: Blob; type: 'image/png'|'image/jpeg'|'image/webp' }   // store `assets`; the view key `underlay` holds the hash, opacity and frame
```

The standalone app is the file `DocResolver` of §11.5 over this store: `resolve(ref)` reads a `LocalDocRecord` (the
snapshot plus its journal, V09 §3.8), and it has no `publish`. Nothing in the store leaves the machine except by an
explicit export, share or download. **Where IndexedDB is refused** (a private window, a storage policy) the store runs in
memory and the shell shows the persistent banner "This browser won't let the editor keep your town. Download it to keep
your work." with a Download button (never silent; V09 §3.8's ladder).

### 2.12 Lifecycle of every new state field

| state | create | read | persist | regenerate / re-derive | undo | migrate |
|---|---|---|---|---|---|---|
| `Draft` | pointer-down or a card pick with a tool active (V09 §3.3) | the mapper, the overlay, the badge | memory; mirrored as `DraftMirror` | a committed event underneath (another client, an epoch) re-previews it at its next settle | n/a (not in the log); Esc or cancel drops it | n/a |
| `DraftMirror` | every settle of a live draft | the open flow (V09 §3.1) | IndexedDB `drafts` | — | deleted on commit or cancel | a mirror whose `appVersion` schema differs is discarded with the note "Your unfinished drawing was from an older version and could not be restored." |
| `PreviewState`, `VariationSet` | each settle (V09 §3.3), each "Show three more" | the ghost, tray and badge | memory | a stale result (older `gen`, or `logHead` moved) is dropped and re-requested | n/a | n/a |
| `Selection`, `HandleSet`, `CountBadge` | a click, a list pick, a lasso; derived from the selected geometry; from the preview | the context panel, the overlay | memory | recomputed when the selected entity's record changes (a `doc.changed` naming it) | the selection survives undo when its ids still exist, else it clears | n/a |
| `HistoryRow` | derived from the log | the history panel, the context panel's History tab, `HostSlots.historyFilter` | never | recomputed per log change | — | the templates are keyed by event kind, one for every kind of the base and volumes 1–8, and for the variants by their discriminating field (`drawWall.retaining`, `drawWay.raised`, `drawWay.aqueduct`, `drawWater.spring`, `terrace`, `setAttr.spans/use`, `setMassing.tiers`, `adjust.blueprint.history`; V09 §4.10; T-V9-15's walker); a kind from a newer version renders "A change made with a newer version of the editor"; `lines` and `dossierGroup` are derived with the row and never stored |
| `RestorePoint` (`restore/<id>`) | the Restore-point button; the auto rules of 2.8 | the history panel | the document's view section (shared) | unaffected (a log position) | deleting a point writes the key to `null`; a restore is itself undoable (V09 §3.9) | a point whose `seq` exceeds the log (a truncated log, §7.4) is shown "at the latest state" and re-pointed on the next save |
| view keys `thematic`, `workingLayer`, `cvdVariant` (per viewer) | the view bar; Settings' and the Dress panel's colour-vision selector | the live providers, the tools; §8.2's loader and the tile key (`cvdVariant`) | the document's view section; never over a bridge | — | not logged (view state); the previous value is one click away | an unknown value reads as the default (`none`, `ground`, `'none'`) |
| view key `underlay` (per viewer) | the dress panel's underlay picker | the compositor (§9.5) | view section (hash, opacity, frame); the image in `assets` | — | not logged | an absent asset shows "The tracing image is not on this computer" with a re-pick button |
| `siting.declared`, `siting.linkEdits` rows (map-side, declared; V11's tables) | `editTable` from the per-kind panel, the Shape tab, the link view, "Keep together", a clerk's accepted proposal | V11's resolver, S10b, the link binding, the split placement; the `why` and `links` answers | the log (events) | held by every re-derivation; a key that no longer resolves is orphaned and reported (V11 §4.4) | the inverse row operation | V11 §4.4 |
| `ToolRow`, `MsgRow` (with its `buttons`) | our table versions | the shell, `@plat/docs`; the rows' `buttons` also volume 10's cards (V10 §3.5 step 3) | `@plat/tables` | — | — | additive rows; a removed key is refused by the loader while referenced — a `button.*` row while a row's `buttons` name it, a mode while a `tool` button names it |
| `AppPrefs` | first run (defaults), the settings screen, hint completion | the shell at boot and on change | IndexedDB `prefs` | — | the settings screen's "Reset" restores defaults; each change is one step back in that screen | `schema` bumped with a converter; an unknown field is dropped with a note in the about screen |
| `LocalDocRecord`, `JournalEntry` | the first commit of a new document; every commit (journal); compaction (V09 §3.8) | open (its `appVersion` too, V09 §3.1 (c)), recent towns, crash recovery | IndexedDB `docs`, `journal` | compaction folds the journal into a new snapshot | the log's own undo; Delete moves the town to "Recently deleted" for 30 days (`deletedAt`) with Restore; it is removed only by "Delete now" there or by the storage ladder after asking (V09 §3.14) | a snapshot of an older output version opens by §2.9's steps (frozen view or replay); a record from a newer application opens read-only, its journal untouched |
| `UnderlayAsset` | dropping or picking an image | the compositor | IndexedDB `assets` | — | removing the underlay keeps the asset until no document's view key names it (swept at boot) | — |
| `ClerkMount.host`, `ClerkMount.effectiveKey` (2.10) | the shell's mount of the clerk slot: `effectiveKey` from the view key and View as; in host mode `host` from the embed's bridge handler (V08 §3.1) | V10's harness (its session key, `HostProxyBackend`, the host proposal intake) | memory only; the transport's token never leaves memory (item 473) | a new `clerk.config` replaces the body (`onConfig`); a change of either key input fires `onEffectiveKey` | n/a (not in the log) | n/a |
| a host's proposal card in the card-only drawer (4.11) | a host's `preview { proposal }` through `ClerkMount.host.proposals` (V10 §3.17) | the drawer | memory; Accept commits its events as one group with `proposedBy: 'clerk'` (V10 §4.2) | re-previewed on a moved head, stale by V10 §3.11's rule; a newer host proposal or a built-in turn supersedes it (answered `dropped`) | the accepted group is one undo step; Drop leaves nothing | n/a |
| a clerk session's transcript | V10's harness (V10 §2.7) | the drawer; the export "Assistant conversation (JSON)" (V09 §5.10) | V10's: memory, or its device store only while keep history is on (V10 §3.15) | — | accepted proposals are ordinary log events with their undo | V10's |
| view key `showUnexcavated` (per viewer) | the Below group's toggle, at tier `secret` only (V09 §4.17.1) | S14's unexcavated program; a picture export at `secret` | the view section; never over a bridge to another client | — | not logged; toggled back | absent: `false`; a client below `secret` reads it as `false` whatever its value |
| `ViewOpts.viewAs` | the View as menu (V09 §4.8); a host's players' view through the embed's bridge handler (a key form) | §9.2's admission for this view; `effectiveKey()` — the `admitAs` of every band-less read (V09 §2.7), the clerk's session key, the export dialog's default knowledge | memory only (session-transient) | `onEffectiveKey` fires on every change; cached band-less answers are re-asked | the menu's previous value; a host's form is cleared only by the host (its toggle) | — |
| `WhyCardModel` | built from a `WhyAnswer` (V09 §2.7) | the why card, the chips, the drawer, the underground panels, item 110's panels, the oasis and past lines (its `sections`, `facts`) | never | rebuilt at every open and on `doc.changed` naming the subject | — | — |
| `Selection.stack`, `Selection.part` (4.20.8) | a click or a tap (the hit answer, item 466) | the panel, T11, the context menu's "Select below" | memory | cleared when the part's or an entry's id disappears (`doc.changed`) | kept across undo when the ids survive, else cleared | n/a |
| the effects list (`PreviewResult.effects`, 4.20.7) | each preview and each `confirm` | the badge, the fates sheet's "What else changes", the live region, the clerk's card | never | dropped with a stale preview and re-requested | n/a | n/a |
| T4's Raised toggle and Aqueduct chip, T2's Oasis chip (4.20.2, 4.21.1) | the tools' options strips; PageUp and PageDown while drawing (T4) | the mapper, the badge | memory only; never `AppPrefs`, never logged | — | reset to off each time the tool is picked (J-V9.73) | n/a |
| "Keep them as yours" (4.20.3) | T1's whole-town ghost card | the Re-derive's group | as declared `drawWay` events in the log | held (declared) | one undo with the Re-derive | — |
| a suppressing removal, as the app shows it (4.20.3) | a Delete of generated content of item 260's kinds — a raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06's `detail.suppress`), an island or sky access (V05's removed slots) | `info.remove.holds`, the history row, `ClerkMount.rebuildEvents`, the skeleton's export (item 455) | the log (the base's and V06's) | holds through Regenerate, New random, reloads and epochs (V06 §2.13) | undo lifts it; "Build it again" (and the clerk's Put it back, the same events) re-declares | an older document has none |
| `HostSlots.historyLines`' lines (2.2, 4.10) | a host change reaching this session — for SettlementForge a `party` value differing from the last one received, a new `partyPicturesAt` (V08 §3.1 step 7 (c)) | the history panel's group "The party" | never by the shell: the host's handler holds them in the session's memory, and a reload starts with none (V08 §4.6) | re-listed with `list(effectiveKey())` on each `onChange` and each `onEffectiveKey` (V09 §2.2) | none: not events — the host's own "Hide again" / "Reveal again" (V08 §4.2) | n/a |
| a copy saved in host mode (3.9) | an action that makes a new document, under `newDocuments: 'download'` | the user, opening the file in the standalone app (§2.9's load) | the user's device only (a `.plat` download) | — | n/a: the frame's document is untouched | the `.plat` reads by §2.9's steps |
| `attach.newMap` (2.10) | the drawer menu's Start a new map from this (standalone) | V10 §3.1 (4) | memory, for one message | — | Esc or the item again clears it before sending | n/a |

## 3 Generation — the application's runtime flows

The application generates no town content itself: it drives §11.2's API. Its "generation" is the flows below, each a
sequence of steps with its inputs, outputs, constants (with provenance) and failure ladder (V09 §3.14); determinism is
V09 §3.13 and every flow's limits are V09 §3.16's.

### 3.1 Boot and open

1. **Load.** `index.html` loads the shell chunk (the frame, the map region, the tool rail, the message catalogue and
   `toolkit.json`; V09 §6.2's size budget), then `@plat/api`'s worker host starts the generation worker, the derivation
   pool and the tile worker (§1.7, §8.9). Panels, dialogs, exporters other than PNG, the tables editor, the clerk drawer
   and the retained output versions (§6.4) are lazily loaded chunks, fetched on first use; while one loads, its button
   shows a progress ring and the rest of the app stays live.
2. **Preferences.** `AppPrefs` are read from IndexedDB (defaults on first run, V09 §2.11); `ShellConfig` is built
   (V09 §2.2).
3. **Route.** In order: (a) a URL with a permalink (`?o=…&s=…`, `&r=`, `&l=`; §6.4) opens that town — `generate` from the
   decoded recipe, then the log's events through `edit` — with §6.4's notices when its output version is not the running
   one; (b) a file handed to the app (drag-and-drop, the OS "open with" of an installed app, the Open dialog) opens by
   type — `.plat` or the compact twin through `open` (§2.9's load; the three outcomes for another output version are
   V09 §3.14's), a skeleton as a NEW document whose creation prefix is the skeleton (§11.1; V09 §3.12), a
   `.png`/`.jpg`/`.webp` as an underlay offer on the current town; (c) the most recent local town when the last session
   ended with one open — its snapshot and journal (V09 §3.8); a `LocalDocRecord` whose `appVersion` is newer than the
   running application opens read-only under `info.newerApp` with **Download**, its journal left untouched for the newer
   application's recovery (J-V9.126); (d) otherwise the empty state's new town (V09 §3.2).
4. **Recovery check.** When the routed document has a `DraftMirror`, the offer of V09 §2.4 appears after the first map.
   When the local store holds a journal newer than its snapshot, recovery (V09 §3.8) runs before the first edit is
   accepted; the map shows as soon as the snapshot's first map is up (§2.9: editable after the fingerprint check).

### 3.2 The empty state and a new town

1. With no document routed, the app calls `generate({ seed })` with a fresh seed (V09 §3.13) and §1.2's one-click default
   recipe with the user's `generation` preferences folded in (§7.6). The complete city band is on screen within §12.5's
   first-map law.
2. Over the map, top centre: the line "Change anything: click it." with three buttons — **Surprise me** (the dice;
   `intent.surprise`, §7.7), **Choose a kind of place** (opens T1's cards, V09 §4.5) and **Open a town…** — and, once the
   first map has settled and the main thread is idle, the **Try another** strip at the foot: §7.8's six proxy thumbnails
   (the towns' own S0–S4 runs on six fresh seeds with the same intent) within §7.8's budget. Picking one continues that
   recipe from its committed S4 state (§7.8) and replaces the untouched town.
3. **The empty state lasts until the first declaration.** While the document's log holds only its creation prefix, the
   town is replaceable without a question: Enter, "Surprise me", a proxy pick or a T1 card change replaces it (an
   unscoped new town is the empty state's action only, R5; §7.3 item 10), and nothing is written to the local store. The
   first committed event makes the document a saved town (its `LocalDocRecord` is created, V09 §3.8) and removes the
   empty state's overlay; from then on Enter is **Same kind, new seed** — a NEW document with seed + 1 keeping the recipe
   (§7.1) — opened beside the current one in the recent list, never replacing it (in host mode by
   `HostSlots.newDocuments`, V09 §3.9). "New town" in the file menu likewise makes a new document.
4. The overlay line closes on the first click on the map and never re-appears for this browser once the user has
   completed any declaration (`hintsDone.tour`).

### 3.3 The declaration pipeline — gesture, draft, preview, ghost, commit

Every tool runs this one pipeline; the per-tool mapping from a draft to events is V09 §4.5's table (the **mapper**).

| step | input | output | constant (provenance) |
|---|---|---|---|
| 1 pointer-down (or a card pick, a paste, a key) | the active tool and mode, the working layer | a `Draft` in state `drawing` | — |
| 2 move | pointer samples (coalesced events, `getCoalescedEvents` where the browser has it) | the raw trace drawn at once on the overlay canvas; the snap candidate lit (V09 §3.4); readouts updated (length, area, height; R4) | raw trace ≤ 1 frame (V09 §6) |
| 3 settle | no pointer movement for `settleMs`, or pointer-up | `state = 'settled'`; the draft's points resampled and simplified by §7.1's authoring-boundary rule, snaps resolved into points | `settleMs` = 120 ms (§12.6) |
| 4 map | the settled draft | `EditEvent[]` by the tool mode's mapper row (V09 §4.5); a sugar event carries `expansion` = the running `sugar.json` version (§7.1); a `placeAt` from a point is written `plot: ''` with `from: { points: [p] }`, the dry run deriving and writing the nearest lawful plot (§7.1; V10 §4.1's `where.at`), and T6's "this plot only" writes the plot under the point (V10 §4.1's `where.plot`), so the canvas and the clerk emit the same bytes (T101-3) | — |
| 5 preview | the events | `preview(h, events, { view, variations? })` (§11.2; item 461 for variations) with `gen += 1` | one preview in flight per draft; a newer settle cancels the older request's delivery (latest wins, §12.6) |
| 6 ghost | the `PreviewResult` whose `gen` is the latest | `live.ghost` drawn (§8.2), handles (V09 §3.5), the count badge (V09 §2.5) with its effects count (V09 §4.20.7), the bend line when `bent` is set, the refusal card when `status: 'conflict'` | delivery ≤ 3 ms (§12.6) |
| 7 commit | release (commit-on-release tools) or Accept (accept tools; V09 §4.5's column) | `edit(h, events)` — for a variation, its committed group (V09 §3.6) — with `fates` / `renames` filled from the shown preview (§11.2's resubmission form); the journal's `pending` entry is written first (V09 §3.8) | — |
| 8 settle the result | `ApplyResult` | `ok`: the draft closes, the ghost clears, the journal appends (V09 §3.8), a toast names the change with Undo; `confirm` (the state moved since the preview): the fates sheet (V09 §5.5) with the fresh list; `conflict`: the refusal card | — |

**Commit on release or accept.** A tool whose gesture draws the thing itself — a wall or road stroke, a terrain or field
brush stroke, a handle drag, a label drag, a shape drag, a lock — commits on pointer-up (R1: the real thing on release),
unless the preview lists a fate other than *kept*, a rename, or an effect on something beyond the thing itself
(V09 §4.20.7): then release leaves the ghost pending with the badge's fate and effect counts and the Accept button reads
"Accept — {n} of your changes move" (or "Accept — {n} other changes" when only effects are listed). **A Delete** is
previewed by the same rule (V09 §4.20.3; J-V9.63): it commits at once only when its dry run lists nothing beyond the
thing itself. A tool whose result is chosen — a quarter's size, a place's site, a roster's sites, a fill's variation, any
clerk proposal — leaves the ghost pending with **Accept** (Enter) and **Cancel** (Esc). A pending ghost is **accepted
implicitly** when the user starts any other gesture or picks another tool (the ghost was what they asked for; undo takes
it back), and cancelled only by Esc, Cancel or undo (J-V9.3). No dialog opens before a gesture's first ghost (R1).
**T1 after a declaration** (J-V9.43): a card, slider or chip change is a Re-derive (§7.1), so its ghost is a whole-town
preview of the `adjust` event — the working ring shows past 1 s, since §12.5's model law at METROPOLIS's top exceeds it —
with the badge's fate counts ("Re-derives from {stage}: {n} of your changes are kept, {m} move"); **Accept** commits, and
the fates sheet (V09 §5.5) opens only then, and only when the dry run lists fates other than *kept* or renames. Esc
restores the previous value; nothing is written until Accept.

**Refused and bent.** `bent` (item 101 R2) draws the ghost normally and adds one line under the badge in the `bend` tone
("The wall follows the ridge, 40 m off your line"). `conflict` draws the refusal card (V09 §5.3) at the draft's last
point: the plain reason and the row's buttons (V09 §2.9's `MsgButton` list) — a `commit` from a `ConflictAction`
carrying that action ("Unlock", "Put it at {site}" at its `target`, "Remove the assignment"), each a new draft or event;
the draft stays open so the user can adjust. A refusal is never a modal, and every card carries at least one action — at
least **Show me why**, the last button of every `refuse.*` row (J-V9.44). Which causes refuse and which bend is §7.1's
dry-run outcome table (only a dossier fact or a lock refuses; every other cause bends, its target pre-selected on the
card, one click away).

**When the world moves under a pending ghost** (an epoch, a host's `doc.apply`, a clerk's accepted proposal in another
panel): the preview is re-requested at once with the same draft; the ghost dims until the fresh result lands.

### 3.4 Snapping and free placement

The feature snap of §9.5 answers from the tile worker's `RoleIndex.snap` within one frame, the unsnapped point shown
until the answer arrives. Each tool mode asks for its own candidate roles (the role filter and the returned role, item
517):

| tool mode | snaps to (in priority order when two are within the radius) |
|---|---|
| T3 wall | enceinte ends and wall vertices; **natural-barrier edges** — sheer and steep cliff edges, gorge rims, deep-marsh edges and shorelines (item 106 (a), (g)); ridge and slope-break lines; road crossings |
| T4 road | junction vertices; gates; way centre-lines (the point lands on the line and splits it at commit, §7.1); piers and quays; shore points (a road to water) — with Raised on, the next row instead |
| T4 with **Raised** on, or the **Aqueduct** chip (V09 §4.20.2) | **the two ends only**: junction vertices, way centre-lines (the end splits that way at commit, making a ground vertex) and plot frontage points; an aqueduct's first point also springs and river reaches, its last also squares, fountain and cistern pins and `conduit_house` plots; interior points snap to nothing on ground part 0 and never split a way they cross; Shift's 15° rule still applies |
| T3 **Retaining wall** (V09 §4.20.1) | slope-break and contour lines; the ends of existing retaining walls; plot boundaries; street centre-lines — never a natural-barrier edge (a retaining wall closes no circuit) |
| T2 **Terrace** (V09 §4.20.1) | none (a brush); the level is the ground height under the pointer-down point, shown as a readout |
| T5 quarter (corner and lasso points) | street centre-lines; shores and banks; walls; ridges |
| T2 river source and mouth, harbour shore point, lake and oasis point | the shore or bank for a mouth or a harbour; terrain peaks and saddles for a source; for an oasis, hollows and fault lines (the S1 candidates, §4.2 S1); none for a lake's point |
| T6 place | the plot under the point (the plot is the snap: its outline lights); on a deck, the deck plot under the point, and for a tower or fort stamp a mole's landmark slots ("Mole head", "Mid-mole") and a long bridge's mid-span slot (V09 §4.20.4) |
| T9 shape drags | the footprint's own plot edges and neighbours' party walls (§3.6's attraction does the rest) |
| handle drags | the same roles as the tool that made the thing |
| the ruler (§9.5) | way centre-lines, face edges, vertices |

The candidate edge lights in the `snap` overlay colour (V09 §5.1) with a small label of its role ("Cliff edge", "Main
road", "Shore"). Holding **Alt** (on touch: the second-finger tap-and-hold, V09 §4.12) places freely; the free flag goes
into `Draft.free` and the point is not snapped. **Angles.** Holding **Shift** while a points form or a line is drawn
snaps the current segment's bearing to 15° steps from model north (after the feature snap; a snapped end keeps its feature
and the segment's bearing is the one that results), and the readout adds the bearing ("N 45° E · 120 m"). **Right-click
while drawing** removes the last point of a points form or line (Backspace does the same); outside a drawing it opens the
context menu (V09 §4.4). The snap is resolved into the event's points before the dry run (§9.5), and the kernel's
attraction (§3.6) still applies. The radius is `AppPrefs.snapRadiusPx` (default 8 px, §9.5), scaled to 22 px under a
coarse pointer (J-V9.9).

**Points on the Sky layer** (J-V9.134). Every tool point and every hit on the Sky layer is converted to the island's own plan by its
anchor, and under `offset` occlusion first un-displaced — the world point less the island's `elevation ×
offsetPerMetre` vector (§8.4; V05 §4.2) — before the snap query, the draft and the hit stack read it, so a stroke drawn
over a lifted island lands where it is drawn and a click on its drawn house selects that house (T-V9-75).

**The wall tool and natural barriers (item 106 (g)).** While a wall is drawn, the tool asks the dry run for the trace
with its arcs typed (`PreviewResult.arcs`, item 462): each arc of the derived circuit is `walled` (a curtain of a
defensibility grade — full, light, closure-only, item 106 (c)) or `barrier` (closed by one of J-VI.3's barrier kinds:
`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`). The ghost draws walled arcs as the wall ghost and barrier arcs as
a dashed line along the barrier with small closing ticks, labelled in the badge: "walled 1.8 km · closed by cliffs 0.9
km". The districts the ghost circuit would enclose are tinted with the thematic veil at α 0.15, and the badge names them
("encloses Old Town, Tanners' Row and the Harbour") — §14's T3 row. A stretch's end that snapped to a barrier edge is
drawn with an anchor-tower ghost (item 106 (a)'s tower at each anchor). Releasing near a barrier within
`wall.barrierReachM` (item 106 (b)) shows the reach ghost — the spare ground the trace takes in, tinted as gardens — and
the bend line says "The wall reaches the cliff; the ground between becomes gardens." A drawn line that would cut a
waterfront off from the water is bent to the nearest lawful circuit (a quay front or sea gates, item 106 (d)) and the bend
line names it ("Kept the harbour open with two sea gates").

### 3.5 Handles

A selected derived shape shows its `HandleSet` (V09 §2.5). **Which points.** For a closed outline (a quarter's boundary,
an island's rim) the handles are k of its vertices: by default k = clamp(round(perimeter ÷ 150 m), 4, 8) — 4 for
`handles: 'fewer'` — and with "More handles" on the entity (session only) k = clamp(round(perimeter ÷ 75 m), 8, 16),
chosen greedily by **salience** = the exterior turning angle at the vertex × the length of its shorter adjacent edge, with
no two handles closer than perimeter ÷ (2k) along the ring; ties by the vertex's lattice order (y, x) (our own rule;
deterministic). A ring with fewer vertices than k shows every vertex. For an open chain (a road, a wall trace) the
handles are the chain's ends plus up to 6 interior points by the same rule (14 with More); a chain of two vertices shows
its two ends; for a river, its course knots instead (`WaterBody.controls`, §2.3). A gate is a grip on its enceinte; a lake
or an oasis has its level handle (a vertical double arrow beside its rim) — an oasis also its spring point — since its
shore is its basin filled to that level (J-V9.47); an island has its rim handles and an altitude handle (V05); a castle a
keep grip at its keep's centre and a bailey handle on the bailey's outline at its point farthest from the keep; a place's
handle is its footprint; a label's is the label; at the building band a building has V02 §4.5's handles. **Item 110**
(V09 §4.20.6): a raised way has its two end handles (`rampEnd`, a half-filled circle) and interior points by the
open-chain rule; a retaining wall is an open chain, or a ring when closed, by the same rules; a terrace-made retaining
wall, once selected, adds its terrace's level handle (`terraceLevel`); a `stepped` building at the building band adds the
step handle on tier 1's front face (`tierStep`), the shrine-inset handle on the top tier (`shrineInset`) and, on a round
or octagonal tier 0, its centre and radius handles (V02 §4.6).

**What a drag emits** — each a new declaration of the same kind on the same entity (§7.1), previewed through V09 §3.3 at
each settle and committed on release:

| handle | the drag emits | source |
|---|---|---|
| a quarter's boundary | `drawBoundary { district, polygon }` whose polygon is the district's current resolved ring with only the run between the moved handle's two neighbouring handles replaced by previous handle → the new point → next handle; the street snap of §7.1's quarter rule resolves it, so only that edge's plots re-derive | §7.1; item 101 (i) |
| a river knot | `moveCourseKnot` | §7.1 |
| a road or wall chain point | `moveVertex` at that lattice point with its role signature | §7.1 |
| a lake's or an oasis's level | `drawWater` with the level form at the same point (an oasis keeping `spring`) | §7.1 |
| an oasis's spring point | `setAttr(waterBody, 'spring/at', point)` | §2.3 (item 111) |
| an island's rim | `convert resizeIsland { island, areaHa: areaHa × (r′ ÷ r)², altitudeCm }`, r and r′ the handle's distances from the island's centroid before and after | V05 §4.2 |
| an island's altitude | `setAttr(island, 'altitudeCm')` | V05 §4.2 |
| a gate's grip — a placed or a generated gate | `moveVertex` on the gate's crossing vertex, sliding it along its enceinte; the crossing way follows by §7.1's vertex rule | §7.1's walls row; J-V9.47 |
| a wall stretch's end (its grade's boundary) | `moveVertex` on the stretch's anchor vertex | §7.1; item 106 (c) |
| a footprint | `moveFootprint` | §7.1 |
| a place dropped on another plot | `placeAt` there | §7.1 |
| a label | `moveLabel` | §7.1 |
| a castle's keep | `setAttr(castle, 'site', point)` | §7.4's MFCG asks |
| a castle's bailey | `setAttr(castle, 'baileyArea', baileyArea × (r′ ÷ r)²)`, r measured from the keep | §7.4's MFCG asks |
| a range's end · its width | `reshapeRange` (the centre-line end · the width) | V02 §4.5 |
| a tower's centre · its radius | `moveTower { at }` · `moveTower { radius }` | V02 §4.5 |
| a hall's, gate hall's or chapel's extent | `setComposition room` (its extent along the host's ridge) | V02 §4.5 |
| the underlay's frame · the export frame | the `underlay` · `frame` view keys (not logged) | §9.5 |
| a raised way's end (`rampEnd`) | `moveVertex` on that end's ground vertex, resolved only onto a ground vertex — a junction, a way's centre-line (split there) or a frontage point (V09 §4.20.2 (2)); its ramp or stair re-laid by the dry run | §7.1 (item 362); V09 §4.20.6 |
| a raised way's interior point | `moveVertex` on its raised part's lattice point (the address names the part), never on ground part 0 | §7.1; item 110 (b) |
| a retaining wall's chain point | `moveVertex`; on a generated wall the wall becomes declared and held, and the panel says "Yours from now on; the rules no longer move it." | §7.1; §7.2 |
| a terrace's level (`terraceLevel`) | a new `terrace { stroke: the recorded stroke, levelCm: the dragged level }`, whose expansion replaces the old walls in its group | §7.1 (item 362); V09 §4.20.1 (5) |
| tier 1's step (`tierStep`) | `setMassing { op: 'tiers', insetCm }`, the inset being the handle's distance from tier 0's front face, snapped to 10 cm | V02 §4.6 (1); V09 §4.20.5 |
| the top tier's shrine (`shrineInset`) · a round or octagonal tier 0's centre and radius | `setMassing { op: 'tiers', shrineInsetShare }`, the share V02 §4.6 defines read from the handle's position · `setMassing { op: 'tiers', centre, radiusCm }` | V02 §4.6 (1) |

**The building band's steppers, chips and family strip** (V02 §4.5's contract): beside a selected building and in its
Shape tab, each wing's storey stepper and roof-kind chip (`setAttr`), each eave's dormer stepper (`setComposition
dormers`), the main entrance's porch chip and every other entrance's hood toggle (`setComposition porch`; the secondary
porch included), each tower's shape chip (`moveTower { shape }`) and the hall, gate-hall and chapel chips
(`setComposition room`), each one event and one undo. The **family strip** runs along the foot of the context panel's
head: one 96 × 72 px thumbnail per feasible family of the building's row (the feasible families V02's `WhyProvider` lists
as `massing/alternatives/<family>`), each the dry run of `setMassing { family }` on the derivation pool drawn by
`thumbnail` (V09 §3.6); hovering one draws its ghost; a tap commits it (budget V09 §6.1); a building with one feasible
family shows no strip. Hit radius 10 px (fine pointer) or 22 px (coarse); handles are drawn on the main thread over the
composed tiles (§9.5) and cost ≤ 1 ms per frame (V09 §6).

### 3.6 Variations

A derived fill offers three versions (R5; §7.3 item 10), and a clerk proposal offers its real alternatives. One preview
contract serves both (item 461; J-V9.41):
* **The four derived sources** — T8's `fill`; T8's density, greenery and prosperity brushes; a scoped New random (T10's
  button, shift+click, the re-roll brush of V09 §3.7); a T5 quarter's fabric — call `preview(h, events, { view,
  variations: 3, page })`. It returns `previewId` and `variations: { event, result }[]` for §7.3 item 10's three
  overlays, each `event` the resolved event with its absolute reroll map; the generation worker keeps the overlays until
  the draft commits or cancels.
* **A clerk proposal's variations** are separate event lists (V10 §2.5), never rerolls of one preview: each is previewed
  by its own call (`ClerkHandle.focus`, which runs V10's `Variation.preview`), its thumbnail tied to that preview, and
  the tray shows V10's `label` under each ("as asked", "next best site", "a larger quarter"); one ghost at a time.

**Thumbnails.** `thumbnail(h, { previewId, variation, box, px })` returns the tile worker's export-class raster of that
preview's overlay ghost marks at the scope's bounding box, 160 × 120 CSS px. `[` and `]` or a tap cycle the focus, and
the focused variation is the one drawn as `live.ghost`. **Show three more** asks for page + 1, whose rerolls continue past
the last used (within `reroll.maxAdvance`, §7.3 item 10); at that limit the button is not drawn. Declared entities are
kept in every variation (§7.2), and the tray says so under the thumbnails when any are in scope: "Your {n} declared
things stay in all three." A scope with nothing derived in it — every thing in it declared or locked — offers no
variations: the button reads `info.reroll.nothing` ("Everything here is yours or held; nothing to vary.").

**What Accept commits, per source** — one group, one undo step, replaying to the accepted variation's digest (T-V9-7):

| source | the committed group |
|---|---|
| a `fill` | [`fill`, `regenerate { scope: the fill's resolved scope, mode: 'newRandom', rerolls }`] |
| a density, greenery or prosperity brush | [`setField { field, stroke }`, `regenerate { scope: the blocks the dry run re-derives past τ, mode: 'newRandom', rerolls }`] |
| a quarter's fabric | [`quarter`, `regenerate { scope: the new district, mode: 'newRandom', rerolls }`] |
| a scoped New random | the `regenerate` alone, with its rerolls |
| a clerk variation | that variation's own events, committed by the harness (V09 §2.10) |

`rerolls` is the focused variation's absolute reroll map. Variations are dropped from the worker on commit or cancel.

### 3.7 New random on a scope

Every New random is scoped (R5; §7.3 item 10). Its control is one button, worded "Try again", in the context panel of any
selection and in the tray, with a scope chip row: **this building** (a building's rung, `regenerate` with `rung`), **this
block**, **this quarter**, **this lasso** (the selection's `scope`), on the Below layer **this run** (a tunnel run) and
**this system** (an underground system; V04 §1b.3). A layer re-roll is never one of its scopes, since its event,
`rerollLayer`, is not T10's (§7.1's binding table): new names are T11's **New names** with its scope (these, this quarter,
the town), new trees T12's **New trees**, and the drawing's small random touches and tree crowns T12's **New decoration**
(each stated at V09 §4.5's T11 and T12 rows). **The re-roll brush** (T10's third mode; §14's T10 row): the blocks the
stroke passes over, each block whose area the brush's footprint covers by at least 20 %, form the scope; held things
under the brush dim to show they will stay; release previews three variations (V09 §3.6) and Accept commits the scoped
`regenerate`. **Held things are marked** while T10 is active and while a New random ghost shows: a small pin glyph
(12 px, in `tier.declared`) at the anchor of every declared or pinned thing in view, and a lock glyph on locked ones.
Shift+click (§14) is New random on the clicked entity's own scope with the kind kept. T10's **keep these, re-roll the
rest**: the user lassos a scope, clicks the things to keep (each click toggles a pending lock, drawn as a lock ghost),
then New random — committed as one group: the `lock` events, then `regenerate { scope, mode: 'newRandom' }` with the
variation chosen (V09 §3.6); one undo step. The dry run's fates list names every declared or locked thing *kept* and
every name it re-draws; the "keep / change" toggle of §13.4's fallback, when `AppPrefs.reroll.keepChangeToggle` is on,
adds per declared entity in scope a chip "Change this too", which adds an `unpin` of that entity to the group before the
regenerate; the entity is derived from then on, and the fates list says so.

### 3.8 Autosave, compaction and crash recovery (R15)

1. **Journal, in two phases** (J-V9.45). Every API call that changes the log — `edit` (a fates-sheet `confirm` among
   them, journalled in its resubmission form: the events with their fates and renames filled, §11.2 *Confirming fates*),
   `regenerate`, `adjust`, `undo`, `redo`, and `setView` of a shared restore-point key — is appended to IndexedDB store
   `journal` as a `JournalEntry` (V09 §2.11) **before** the call is sent, in phase `pending` with the `logHead` before
   it, and rewritten in phase `done` with `logHeadAfter` and its `seqs` when the result is `ok`; a `conflict` or a
   cancelled confirmation deletes the pending entry. The pending write is issued in the same task as the call (the
   structured clone ≤ 2 ms, V09 §6.5); the next gesture never waits for either write; a write failure takes V09 §3.14's
   storage ladder.
2. **Compaction.** When the journal holds 50 `done` entries past the snapshot, or 60 s pass without a commit after at
   least one entry, or the page is hidden (`visibilitychange`), the app asks `export(h, 'plat')` (§2.9's writer; model
   included) in the generation worker and replaces `LocalDocRecord.snapshot`, then deletes the journal entries up to
   `snapshotSeq`. It **runs only when idle** (V09 §6.5): no draft, preview or export pending and the pointer still for at
   least 2 s — or at once on `visibilitychange` hidden. A gesture started while a compaction runs shows the working ring
   on its badge until the preview arrives. The snapshot drops every `null` view key whose Lamport stamp is older than the
   snapshot (deleted restore points). Compaction runs under the role's knowledge key, whatever "View as" shows (V09 §4.8).
   Constants: 50 entries, 60 s, 2 s (our own; calibrate-later by T-V9-47's threshold calibration and T-V9-17's recovery trials at M2a — an application
   constant, outside volume 12's register, V12 §3.11).
3. **Recovery.** Opening a town reads its snapshot through `open` and re-issues the journal's calls past `snapshotSeq` in
   order. The engine is deterministic (§6), so each `done` call must reproduce its recorded `logHeadAfter`; a trailing
   `pending` call — the tab was killed between sending it and recording its result, possibly after the worker had
   committed it — is re-issued from its `logHeadBefore` and its result accepted and recorded. The first mismatch stops
   recovery there, keeps the unreplayed calls in the record's quarantine (downloadable as a JSON file from the history
   panel), and says "Recovered your town up to {time}. {n} later changes could not be replayed." Nothing is discarded
   silently. A clean recovery says nothing; an empty journal is no recovery.
4. **Times.** `JournalEntry.time` gives the history panel its times for the seqs each call appended (`seqs`); events that
   reached the document elsewhere show no time (J-V9.6).
5. **Leaving.** Closing the tab with a journal write pending triggers the browser's "leave site?" prompt only while a
   write is actually outstanding (typically < 50 ms); otherwise leaving is silent, because everything is already saved.
6. **Host mode.** With `ShellMode = 'host'` the local store is off: every commit reaches the host through the bridge, and
   the host is the store (§11.3; V08 §3.7); only the draft mirror stays local, keyed by the host's document id.

### 3.9 Undo, redo, restore points and "open a copy from here"

* **Undo and redo** are `undo(h)` and `redo(h)` for the document's session (§7.4): the top bar's two arrows, ctrl /
  cmd+Z and ctrl / cmd+shift+Z (§14). A target that is not undoable — a creation event (the history replay's epochs
  among them, §4.11), a dossier event, an epoch that carried one — is skipped by §7.4's target rule; when the latest live
  event is one of those the Undo button's tooltip says "Changes from SettlementForge can't be undone here" (host mode) or
  "This is where the town began" (the creation prefix). A dependent-event conflict (§7.4 independence) cannot arise in a
  standalone document with one session; over a bridge the refusal card names the dependent events and their authors.
* **Go back to here** (a row or a restore point in the history panel, owner role): the app computes the live events after
  the chosen seq, stops at the latest one that is not undoable (a restore to before it is refused: "The town can go back
  only to {time} — SettlementForge changed it after that."), writes an auto restore point "Before going back to {name}",
  and sends one `edit` call carrying an `undo { of }` event for each remaining live event, in reverse log order, all with
  one `group` (§7.1) — undoing in reverse order makes every step independent (§7.4). The toast offers "Undo going back",
  which sends the matching `redo { of }` events (each naming its undo's `seq`, newest first) as one group while the redo
  stack is intact; any new change clears it (§7.4), and the auto point then remains the way back (through "Open a copy
  from here"). Going back to the head itself is no change and is not offered. **Its cost** is the sum of the targets'
  undo-record costs (each O(its scope), §7.4), so going back a few hundred edits at METROPOLIS can take seconds: past 1 s
  a progress bar in the history panel counts the events undone of the total, the map stays pannable and viewable, the
  tools wait, and the toast's "Undo going back" is the way back (the call is one group, so it is not cancelled midway).
* **Re-run from here** (owner role; a history row, a chronicle row or a restore point, offered when epochs or dossier
  events follow it): `rerunFrom(h, seq)` (V06 §4.4) — a NEW document, the log prefix through `seq` with every later epoch
  and dossier event re-appended in log order and recomputed — opened in a new tab and added to the recent list; the
  current document is untouched. The toast says "Opened a copy from {name} and re-ran the town's history after it. Your
  later hand edits are listed there to re-apply." and the new document's report lists each such edit with V06's
  **Re-apply**. A dossier-bound document's copy is detached (V06 §4.4), and the toast adds "It no longer follows
  SettlementForge."
* **Open a copy from here** (a row or a point): `forkAt(h, seq)` (V06 §4.4; item 458) makes a new document with the same
  recipe and the log prefix through `seq`, opened in a new tab and added to the recent list — the way to keep both a past
  state and the present.
* **Before a rebase point** (J-V9.122). On a rebased document (§2.9's `Base`) a `seq` below `base.seq` is never refused and
  no control is disabled: `forkAt` and `rerunFrom` bend to the earliest seq they can take (V06 §3.15.5, V06 §4.4) — from a
  history or chronicle row, a restore point's items and the drawer's `fork` and `rerun` buttons (V09 §4.11) alike. The
  app knows the bend from the new document's `forkedFrom.seq` (V06 §4.4), which then exceeds the seq it asked for, and
  shows `info.copy.condensed` (V06 §3.15.5's line, `{year}` the year of the rebase point's week) as the new document's
  opening toast: after the re-run's own, alone for a copy, and in host mode after `info.copy.saved` (and
  `info.copy.rerunEdits`).
* **In host mode a new document is saved, never opened** (J-V9.92). The frame holds one live document and has no local
  store, recent list or app tab (V08 §3.1 step 6; V09 §3.8 (6)), so every action that makes a NEW document — **Re-run
  from here** and **Open a copy from here** (the history and chronicle rows, the restore points' menu items,
  `refuse.restore.dossier`'s button), the drawer's `fork` and `rerun` buttons (V09 §4.11), Enter's **Same kind, new seed**
  (V09 §3.2 (3)), `ClerkMount.openNewDocument` and a document without `model`'s **Open its recipe with this version**
  (V09 §3.14 (c)) — follows `HostSlots.newDocuments`. With `'download'` the app makes the new document as above
  (`rerunFrom`, `forkAt`, `generate` with seed + 1, or V09 §3.14 (c)'s recipe and log), writes it with
  `export(h, 'plat')` under the role's key (§11.1 *Knowledge*: a copy is the document, not a picture, so View as does not
  lower it) to the user's device through the frame's download (V08 §5.4 (2): `.plat` is the user's format, never the
  host's), named `{town}.plat` by V09 §5.10's rule, and releases it with `close(h)` (§11.2) without opening it: the
  frame's document and its log are untouched and nothing is added to a recent list. The toast is `info.copy.saved`
  ("Saved a copy to your computer as {file}; it does not follow {host}.", `{host}` from `HostSlots.hostName`; a
  dossier-bound document's copy is detached, V06 §4.4), and after a re-run it adds `info.copy.rerunEdits` ("{n} later
  hand edits were not carried; they stay in this map."). A refused write takes V09 §3.14's export row, the new document
  released. Where the role's key is below `secret`, at which §11.1 offers no `.plat`, and with `'off'`, those controls
  are not drawn and Enter with nothing pending does nothing. In either setting the drawer's **Start a new map from this**
  is hidden and no turn enters creation mode (V09 §4.11).
* **Name a restore point**: the history panel's "Mark this moment" writes `restore/<id>` at the current head with the
  typed name (default "Restore point {n}"); at 200 named points the button reads `info.restore.full` ("This town keeps
  200 named points; delete one to mark another.").

### 3.10 Export

1. The export dialog (V09 §5.10) collects the format's options and asks the engine for an **estimate** — the file size
   and time from §12.7's laws and §11.1's size estimates, and for a VTT scene the split into scenes when the scope passes
   the scene cap — before anything is written.
2. `export(h, fmt, opts)` runs in the generation worker (§11.1 *Where exports run*); the dialog shows the bands done out
   of the bands total (§11.1) and a Cancel that aborts the worker job.
3. The bytes arrive transferred; the app saves them through the File System Access API's save picker where the browser
   has it, else a download link, with the file name of V09 §5.10's rule. A toast says "Saved {file} ({size})".
4. Exports never change the town (they are views, §11), never write the log, and carry the knowledge key and the drawn
   week the dialog set (§11.1 *Knowledge*; V06 §5.3).

### 3.11 Share

The share sheet (V09 §5.11) asks `export(h, 'permalink')`. When §6.4's conditions hold it shows the link with Copy; when a
condition fails it shows §6.4's reason in plain words (V09 §4.9's `share.*` rows) and offers the `.plat` file instead,
and — for a small log — the inline compressed log of §6.4 (§11.5). The standalone app configures no publishing resolver,
so it never produces `&doc=` references (§11.5); a host that configures one gets the third option. "Share a picture"
exports a PNG of the current view with the knowledge tier the sheet sets (V09 §4.8).

### 3.12 The skeleton: export, import, the canvas script

* **Export skeleton** (history panel and the file menu): `export(h, 'skeleton')` writes §11.1's declared subset with the
  author's removals of generated content (item 455); the dialog says "This file holds what you declared and what you
  removed — the rules fill in the rest when it is opened." A clerk transcript saved from the drawer is written the same
  way (the accepted proposals are declarations in the log; the unaccepted ones are not in it). A town with nothing
  declared exports a skeleton of its recipe alone, the dialog adding "Nothing is declared yet; the file rebuilds this
  town from its recipe."
* **Open a skeleton** creates a new document whose creation prefix is the skeleton (§11.1, §4.1): `generate` with the
  skeleton's recipe and prefix; the first map arrives within §12.3's model law plus the prefix's read-ahead. The **import
  dialog** then opens as a sheet over the new map (never before it, R1):
  * **What was declared** — one row per prefix declaration from `GenerationReport.prefix` (item 470): *applied* ("Made
    as written"), *bent* (the bend's `MsgRef`, "Show"), *refused* (its reason and its `closest` options as "Put it here
    instead" buttons, each a preview), and for a carried suppression `import.removed` (with **Show**
    outlining where) or `import.nothingToRemove` (V09 §4.9) — never a failed open; a prefix with no declaration shows "Nothing was declared in this file."
  * **Checked against the rules** — `CritiqueEngine.run` over the new document (V10 §3.10, from `@plat/clerk/core`, which
    needs no model): each `CritiqueFinding` as a line in its catalogue text with its severity, **Show** (highlights its
    subjects) and, when it has one, **Fix** (its `ClerkAction`, worded `clerk.alt.critique.fix`; J-V9.90): a `propose`
    fix the dialog runs itself, whether or not a clerk is mounted — its events, based as the user's (`EditBase` filled as
    any tool's mapper fills it), go through V09 §3.3's pipeline from step 5 as a ghost with **Accept**, committed by
    `edit` as the user's own declaration with no `proposedBy`, since no model proposed it; a fix of an application kind
    (`useTool`, `select`) runs by V10 §2.6's dispatch table. This is that table's one exception: a `propose` reaches
    `ClerkHandle.run` only from the drawer, so the check and its fixes work without the model (V10 §3.21);
  * **Its history** — when the skeleton carries a `history` block (V06 §5.3), "This town was run forward {n} years from
    its founding" with the chronicle's first lines and "Open the chronicle";
  * **Check with the assistant** — shown only when a clerk is configured and on: opens the drawer on V10's `critique`
    route with the skeleton loaded (V10 §3.1).
  The dialog closes with **Done**; its content stays in the report panel ("From the file").
* **The canvas script** — the test harness's gesture script (V09 §7.2) — is a JSON list of gestures in world coordinates
  (`{ tool, mode, params, points, free, accept, view: { cmPerCssPx, centre } }`) that the shell's pipeline plays through
  the real tools. Each gesture fixes the view scale (world cm per CSS px) and centre it was recorded at, and the harness
  sets that view before replaying it, so the feature snap — which resolves in screen pixels (V09 §3.4) — resolves
  identically at any viewport size and device pixel ratio (J-V9.50). It is test tooling, not a user feature.

### 3.13 Determinism

The application puts exactly one non-deterministic input into a document: a new document's seed, a 32-bit value from
`crypto.getRandomValues`, recorded in the recipe (§6.2). Surprise me draws its intent on §7.7's `intent.surprise` stream
of that fresh seed; the proxy thumbnails' six seeds are `H32("proxy/<seed>/<i>")`, i = 1 … 6 (§13.6's `H32`), so none
coincides with Same kind, new seed's seed + 1. Everything else a user does reaches the model as a resolved event: points
are stored after resampling and snapping (§7.1, §9.5) — on the Sky layer after the un-displacement (V09 §3.4) — a
variation as its absolute reroll map (§7.3 item 10), a scope as its resolved `EditScope`, so replay never depends on
pointer timing, the frame rate, the viewport or which variation thumbnails rendered first. Restore-point ids are random
but are view state, outside every digest. Hints, the rail's order, handle choice (V09 §3.5) and the message texts are
pure functions of their inputs. T-V9-11 checks that a canvas script played on three engines, two viewport sizes and two
pixel ratios, each gesture at its recorded view scale, yields one model digest.

### 3.14 Failure ladders

| failure | detected by | ladder (in order) | what the user sees |
|---|---|---|---|
| the generation worker or the tile worker dies | the worker host's `error` / heartbeat (none for 5 s while work is pending) | (1) restart the workers; (2) reopen the document from the local store and journal (V09 §3.8); (3) if the restart fails twice, the read-only picture of the last composed tiles with a Download button for the saved `.plat` | "The map engine restarted. Nothing was lost." — or, at rung 3, "The map engine could not restart. Your town is saved; download it or reload the page." |
| a preview slower than its budget | `receivedAt − requestedAt` > 1 s | (1) the badge shows a small working ring; (2) past 10 s the preview is cancelled and the tool switches to preview-on-release for the rest of the session (§12.6's fallback) | "Big change — the preview will show when you let go." (`error.previewSlow`) |
| a confirm token went stale | `confirm` returns a fresh `confirm` (§11.2) | re-show the fates sheet with the new list, highlighting what changed | "Something changed while you were deciding. Here is the new list." |
| storage quota exceeded or a write refused | IndexedDB `QuotaExceededError` or a transaction error | (1) compact now; (2) offer to empty "Recently deleted" and to remove the thumbnails and underlay images of towns not opened in 90 days (each asked, never silent); (3) pause the journal and show the Download banner | "Your computer is out of space for saved towns. Download this town to keep it." |
| IndexedDB unavailable | open of `plat-app` fails | memory store for the session with the persistent Download banner (V09 §2.11) | as V09 §2.11 |
| a snap answer later than a frame | the tile worker's query | the unsnapped point stays shown until it lands (§9.5) | nothing |
| a raised or aqueduct course longer than 3 km (V09 §4.20.2) | the stroke's length at settle | that stroke previews on release only (V09 §6.1), the badge's working ring while the solver runs; nothing commits before Accept | `error.previewSlow` |
| an export fails | the worker's error | the partial bytes are dropped (no file written); Retry | "The export stopped: {reason}. Nothing was saved. Try again?" |
| the clerk is unreachable, its key refused, or its month's cap reached | V10 §3.19's ladder, reported as the turn's `outcome` and its `RefusalView` (`offline`, `key`, `budget`) | the drawer shows the refusal card with the actions V10 §3.16's row offers (`openSettings` for `key` and `budget`, none for `offline`); every other tool is unaffected | the card's text is V10 §3.16's row under `refuse.clerk.offline` (the one row for an unreachable clerk), `refuse.clerk.key.<keyState>` or `refuse.clerk.budget` (V09 §4.9's families); at the cap the meter's foot line is `clerk.cap.reached` (V09 §4.11) |
| a gesture starts while a compaction runs | the worker's queue | the badge's working ring until the preview lands (V09 §3.8 (2)) | nothing more |
| (a) a document of an earlier output version **inside the retention window** (the running version's N−1 or N−2) | §2.9 *Load* step 3; §6.4 | the document opens, verifies and edits under its own output version — the retained packages' lazy chunk (V09 §3.1 (1)) — and the owner is offered the upgrade: standalone, the strip `info.upgrade.offer` at the map's top, whose **See what changes** shows §7.5's diff (the engine's `migrate`, §14's `EditEngine`) in the fates sheet's form (V09 §5.5; an auto restore point first, V09 §2.8) and commits the `upgrade` event on **Do it**, while **Not now** keeps the old model (§7.5) for this session, the offer returning at the next open; in host mode V08 §4.2's "Update the map engine" is that offer and the shell draws none of its own — one event, one control (J-V9.96) | `info.upgrade.offer` (standalone, owner; no strip in host mode) |
| (b) a document of an output version **outside the retention window, with its `model`** | §2.9 *Load* step 2 | the **frozen view** — view and export only, each chunk checked by its content hash and never root-checked — labelled by the shell's own `error.frozen` strip at the map's top in both modes (J-V9.97), with the CLI command that replays and checks it under its own output version (§6.4) as a copyable line beneath it; the strip's one control, for the owner, is **Edit it with this version**: the `rebase` event with reason `frozenImport` through `edit` (§11.2; the engine's `rebase`, §14's `EditEngine`), whose dry run returns `confirm` with the renames (§7.4's rebase row), shown in the fates sheet (V09 §5.5) and committed on **Do it** — in host mode through `doc.changed`, the client then sending `doc.snapshot`, as V08 §4.2's upgrade row does; from then on the document edits under the running version, and the rebase's undo (§7.4) returns the frozen view. A chunk that misses its content hash at load: its partitions drawn marked, the strip `error.frozen.damaged`, no **Edit it with this version**. A refusal found at the rebase — its records root differing from `model.recordsDigest` (damage), or a pack that neither `packs` nor the running version's shipped packs hold, or one past §2.9's 2 MB cap (§7.5) — commits nothing and turns the strip into `error.frozen.damaged` or `error.frozen.pack` | `error.frozen` (the Edit control for the owner only; an editor sees the command alone) · `error.frozen.damaged` · `error.frozen.pack` |
| (c) a document of an output version outside the retention window **without `model`** (only the CLI writes one, §2.9) | §2.9 *Load* step 2 | no frozen view can be drawn: the town on screen stays (nothing is replaced; in host mode the frame's map region is empty) and the strip `error.frozen.noModel` shows the CLI command beneath it; its **Open its recipe with this version** makes a NEW document from the file's recipe and log as §6.4 opens a link made with another output version — `generate` from the recipe, then the log's events through `edit` (V09 §3.1 (3) (a)) — with §6.4's notice `error.linkVersion`, opened beside the current one (standalone) or, in host mode, under V09 §3.9's host rule (J-V9.96) | `error.frozen.noModel`; then `error.linkVersion` |
| a load mismatch (§2.9 *Load* step 4) | load verification | the owner chooses: keep the saved town (a `rebase`) or take the replayed one | "This saved town differs from what its recipe rebuilds. Keep the saved town, or use the rebuilt one?" with the differences counted |
| a skeleton or file the loader refuses | `open` / `generate` errors | nothing is replaced | "This file can't be opened: {reason}." |
| a local record written by a newer application | `LocalDocRecord.appVersion` at open (V09 §3.1 (3) (c)) | read-only open of its snapshot; the journal kept untouched; **Download** | `info.newerApp` ("This town was last changed by a newer version of the editor; it opens read-only here.") |

### 3.15 The link cache (item 105 (j) at METROPOLIS)

The Supply links view and the Link card need every consumer in view bound to its providers, which at METROPOLIS is tens
of thousands of uses (J-V9.49). The generation worker therefore binds **all** links once per `logHead`, by the function
S10a/S10b use (item 105 (a); the solver's provider index, one nearest-provider lookup per consumer and good), and keeps
the result as a flat array of `LinkRow`s sorted by (consumer address, good) with a grid index over the consumers'
anchors. An edit's commit re-binds only the consumers in its touched set and those whose nearest provider of any good
lies in it (the index answers which), so the cache follows the log incrementally; a `siting.linkEdits` row re-binds its
consumer. The `links` query reads the cache by region, ids or good, pages it (§11.2's 64 KB page) and filters it by the
caller's key. A town with no consumer of any good holds an empty cache, and the view draws nothing but its legend's "No
supply links in this town." The cache is derived, never saved, rebuilt on load in the background after the first map,
and dropped with the document. Its costs are V09 §6.4's.

### 3.16 Edges — every mechanism at its limits (principle (11))

Every mechanism of V09 §2 – V09 §5 has a defined outcome at the limits of its inputs, a rung of a failure ladder — V09
§3.14's for the application's own failures, the engine's (§5; §7.1's outcome table) for an event's — and a test; nothing
in the application retries a whole map. Four rules cover whole classes; table (e) gives every other case by mechanism,
(f) the one bend another unit's ruling adds, and (g) the combinations V09 owns. T-V9-74 runs every row of (a)–(f) and
T-V9-76 every row of (g).

**(a) Degenerate geometry.** The application commits no geometry: a settled draft passes §7.1's authoring-boundary rule
(kernel §3.6 — coincident points are one vertex, a point within `minEdge` of its predecessor is decimated, a
self-crossing stroke is split into simple runs) before the mapper sees it, and an event's degenerate result is the
engine's to refuse (§5.1 (9)), shown as V09 §3.3's bend line or card. The draft adds four rules of its own (J-V9.133): a stroke, line
or course that settles to fewer than two distinct points is a click — the mode's click action in V09 §4.5's table, else
the selection under the point; a ring (a lasso, a box, a quarter, an area, a measured area) that settles to fewer than
three distinct points or to zero area maps to no event, and the draft closes with nothing previewed or written; a handle
drag that would make its ring self-touching or leave it under three vertices stops at the last lawful position; a split,
cut or join whose two points coincide maps to no event. The overlays — ghost, handles, badge, bend line, card, snap ring,
hit stack — draw only engine geometry, previewed or committed, so no degenerate shape reaches them (rendering's T-ER-02);
a ghost of zero area draws nothing while the badge still counts its fates. A measure argument of zero renders its unit's
zero ("0 m²"), never an empty slot. Tests: T-V9-74 (one degenerate input of each kind per gesture kind of V09 §2.3),
T-V9-10, T-V9-12.

**(b) Rungs.** The application has no rung-specific code: the rail, the panels, the catalogue, the history, the why card,
the fates sheet, the exports, Settings and the drawer run the same code from THORP to the METROPOLIS cap (§5.1 (10)). What
a rung does not offer is shown disabled with its reason, never hidden — the Sky layer below CITY or without islands (V09
§4.2), the underground's modes where V04's rung admits none, a raised way's generation below CITY while its declaration
holds from TOWN (item 110 (b)), the village's forms below TOWN (V07 §4.1). At the METROPOLIS cap the costs are V09 §6's
with their fallbacks: preview on release (V09 §3.14), the link cache's incremental bind (V09 §3.15), the compaction
thresholds (V09 §3.8), and every long list — the fates sheet past 1 000 rows, the history panel, the effects list, the
Coverage legend, the export dialog's scene list — virtualised, drawing only the rows in view. A THORP's handful of
entities meets the same bars: a panel of one row, a history of one row, a link view with no consumer (V09 §3.15's legend
line). Tests: T-V9-74 runs the four first-five-minutes tasks and each tool mode's one gesture on each rung's fixture;
T-V9-47 at METROPOLIS.

**(c) Toggles and presets.** A layer on or off, a preset (the parity presets among them), a thematic view, an underlay,
"View as" and `cvdVariant` change what is drawn and which controls are offered, never what a control writes: they are view
state or the owner's model toggles (V09 §2.1), so none changes a digest by itself. A control whose layer is hidden stays
in its panel and writes the same event (its result previews with the layer shown for the ghost's life); a model toggle a
preset turns off removes the generated forms its owner names (item 110's off forms, V02 §3.3's `fantasyShapes`,
`massing.composed`) while every declared thing holds under every preset (§7.2), its tool offered as before; a choice the
toggle no longer offers is shown read-only with its stored value, never rewritten. A preset change is one `setStyle` or
`adjust` and one undo step (V09 §4.14). Tests: T-V9-74 (each tool's gesture with every layer off in turn and under each
parity preset).

**(d) Save, load, undo, redo, regenerate, migrate.** Each new state field's behaviour is its V09 §2.12 row; the
document's own is §2.9 and §7.4's. Three rules close what no row states: a session-transient state (a draft, a pending
ghost, a selection, the hit stack, the tray) never outlives the document's load or a regenerate — a pending ghost is
re-previewed after an undo, a redo or an epoch underneath it (V09 §3.3), and dropped by a load; a document view key whose
subject is gone (a restore point's target, a `thematic` class removed by a migration) reads as its default, never as an
error; and every list the application renders from the log (history, restore points, effects, the clerk's sent cards) is
rebuilt from the log after a load, so a reload shows what was shown, bar session state. Tests: T-V9-17, T-V9-74 (each
panel's state after save, reload, undo, redo, regenerate and an `upgrade`).

**(e) Every other limit, by mechanism.**

| mechanism (V09 §) | limit | outcome · rung | test |
|---|---|---|---|
| tools, catalogue, keys as data (2.3, 2.9, 4.9, 4.13) | a mode emitting a kind with no binding pair; a parameter naming a table with no row; a code with no row; a slot with no argument; a key bound twice; a user's override colliding with a binding | a build failure, never a runtime state (T-V9-12's pairs, T-V9-15's rows and slots, the keymap loader's uniqueness check); the colliding override is refused in Settings with the other binding named and kept unchanged | T-V9-12, T-V9-15, T-V9-74 |
| selection, handles, badge (2.5, 3.5) | nothing selected; a selected thing deleted under the selection (another client, an epoch, an undo); kinds sharing no handle; a ring of hundreds of vertices | the context panel's town view (V09 §4.4); the gone id leaves the selection at the next `doc.changed`, the panel closing when none remains; only the kinds' own handles; vertex handles drawn only where they stand ≥ 12 px apart at the zoom, the rest reached by zooming | T-V9-10, T-V9-74 |
| map-side declarations (2.6, 4.7) | an empty table; a row whose subject (consumer, provider, class, place) is gone; a link edit naming a good its consumer no longer needs; a `split` past its count; the most rows | the rules' siting and binding; the row binds nothing (V11 §4.2), stays listed greyed in its panel with **Remove**, and undo of the removal restores it; the same; the split's options stop at the class's count (`bend.invalid`); no cap of V09's — each row is one `editTable` and its own undo step | T-V9-74 |
| the answers panels render (2.7, 5.8) | a `why` with no fact, no driver or no evidence; one fact; an answer whose subject was deleted since the click; a symbolic fact | the card's head and its `decidedBy` line, then whatever bars it has; one fact drawn alone; `refuse.stale`'s new answer; the `chip.symbolic` chip | T-V9-65, T-V9-74 |
| history rows and restore points (2.8, 3.9, 4.10) | an empty history; a row whose event kind has no template; 200 named points; a restore point whose `seq` precedes a rebase; going back past a non-undoable target; the most rows | `empty.list`; impossible (T-V9-15's walker); `info.restore.full`; restored by its rebase rule (V09 §3.9); the target skipped by §7.4's rule and named struck in the group; a virtualised list, **Go back to here** within V09 §6.5's cost | T-V9-15, T-V9-16, T-V9-74 |
| the clerk slot and drawer (2.10, 4.11) | no key, no network or no clerk (`clerkMode` `off`); the first message; an empty turn; the cap reached mid-turn; a proposal with no event; the largest proposal (≥ 1 000 events) | the drawer's setup card or `refuse.clerk.offline`, every other tool unaffected; the notice before it (V10 §3.20); nothing sent; the turn ends with `clerk.cap.reached` and nothing commits; a refused card; its ghost previews by V09 §3.3 with preview on release past budget | T-V9-27, T-V9-74 |
| preferences and the local store (2.11) | no IndexedDB; a corrupt record; a record from a newer application; a full store; a `DraftMirror` from another schema | the session's memory store and the Download banner; the record is skipped, listed in Open with `error.openRefused` and **Download** of its bytes; `info.newerApp` read-only; V09 §3.14's quota ladder; discarded with V09 §2.12's note | T-V9-17, T-V9-74 |
| boot and open (3.1, 5.13) | a permalink whose recipe will not decode; a file that is not a town; no recent towns; a town at the METROPOLIS cap | V09 §3.14's "This file can't be opened: {reason}." and the empty state; the same; Open shows only New; it opens by §12.5's first-map law with the working ring | T-V9-1, T-V9-67, T-V9-73, T-V9-74 |
| the empty state and a new town (3.2, 5.2) | the user leaves every card at its default; a seed of zero; a rung change before the first map | the default town of V09 §3.2; zero is a seed like any other; the newer request wins (the older map is dropped) | T-V9-1, T-V9-74 |
| snapping (3.4) | no candidate within the radius; one candidate; several at one distance; a snap answer later than a frame; a radius preference outside 4–24 px | the free point; that candidate; the higher role of V09 §3.4's order, then the nearer id; the unsnapped point until it lands (V09 §3.14); clamped to the range | T-V9-8, T-V9-74 |
| variations and New random (3.6, 3.7) | nothing derived in scope; a scope of one thing; `reroll.maxAdvance` reached; a scope spanning a locked thing; shift+click on a declared thing | `info.reroll.nothing`; three variations of that thing; **Show three more** not drawn; the locked thing kept in every variation and named *kept*; New random of its derived neighbours, the declared thing kept | T-V9-7, T-V9-74 |
| autosave and recovery (3.8) | a crash with an empty journal; one `pending` entry; a corrupt entry; a journal past the snapshot by thousands of entries | the snapshot opens as saved; the entry re-issued and checked against `logHeadAfter`; recovery stops before it with `error.recoveryPartial` and the quarantine download; compaction at once after the replay | T-V9-17, T-V9-74 |
| the skeleton (3.12) | an export with no declaration; one declaration; an import whose rows name kinds this version lacks; an import onto a town with edits | a valid file holding only the recipe; a one-row file; the rows skipped and listed in the import report (`import.removed` and its kin), nothing else changed; the import's events appended as one group after an auto restore point | T-V9-62, T-V9-74 |
| the link cache (3.15) | no consumer of any good; a consumer with no provider in reach | the empty cache and its legend line; the consumer's row `unserved`, drawn as a stub (V09 §5.4) | T-V9-24, T-V9-47, T-V9-74 |
| the rail and the working layer (4.2) | no tool picked; one layer group open; a layer switch with a draft pending; a working layer the town lacks after an undo (the last island removed) | the select pointer; the others collapsed; the draft dropped with its ghost, nothing written; the working layer returns to Ground and the switch shows Sky disabled | T-V9-74 |
| the context panel (4.4) | a kind with no editable attribute; one attribute; an attribute value the registry cannot render | the About tab as text only; the same; the raw value with its unit, never a blank | T-V9-74 |
| multi-selection (4.6) | an empty box; one thing; a move that takes one member out of its lawful zone; a mixed selection across layers | nothing selected; the single-selection panel; the whole move bends or refuses by that member's row, never a partial move; members of the working layer only | T-V9-74 |
| "View as" (4.8) | no knowledge key defined; a key that hides the selection | the full map (View as is not offered); the selection drops and `info.viewAs` names the key | T-V9-39, T-V9-74 |
| the advanced panel and presets (4.14) | nothing changed; one row; a stored value outside the row's range (an older file); a preset naming a row this version lacks | **Re-derive** disabled; one `adjust`; shown and clamped only by a fresh choice (`bend.invalid`); the unknown row skipped, named in the preset's note | T-V9-74 |
| people and the clock (4.18) | one person; a household with no living member | a tree of one; the household's line reads empty and its plot keeps its use until an epoch re-lets it (V06) | T-V9-46, T-V9-74 |
| item 110 on the canvas (4.20) | Raised, Retaining or Aqueduct with no point; one point; two coincident ends; a tier count of 1 or at V02's cap; Delete of a thing with no effects; a hit stack of one | no draft; no event (rule (a)); no event; tiers truncated (`bend.tiers.count`) or clamped (`bend.tiers.step`); committed at once; a plain click selects it | T-V9-51 – T-V9-60, T-V9-74 |
| the Sky layer (4.20.9) | no island; one island; an island lifted under `offset` | the layer disabled (V09 §4.2); its menu of one; points un-displaced (V09 §3.4) | T-V9-75 |
| overlays and the fates sheet (5.3, 5.5) | a preview with no fate other than *kept*; one fate; a confirm token stale twice | no sheet (commit on release); a one-row sheet; re-shown each time with the fresh list | T-V9-5, T-V9-74 |
| thematic views (5.4) | **None**; a view with one category; a view whose provider holds no data (no island for Shade, no class selected for Coverage); `cvdVariant` set with no thematic view | nothing drawn but the map; one legend row with its second cue; the legend's `empty.list` line, the view kept selectable; the variant still applied to the map's palette | T-V9-23, T-V9-77, T-V9-74 |
| the other panels (5.7) | a Dress panel with one style; a report with no moved entry; a report panel at METROPOLIS | one card; `empty.list`; paged and virtualised | T-V9-74 |
| onboarding and help (5.9) | hints already done; a hint whose tool is disabled on the rung; a reset of hints | none shown; skipped until the tool is enabled; every hint shows again once at its trigger | T-V9-74 |
| the export dialogs (5.10) | a scope with nothing in it; one tab's single format; an export at the METROPOLIS cap; a family toggled off | a valid empty file and the dialog's note that it is empty; that format alone; streamed by district (§12.7) with its estimate; that family's tab omitted | T-V9-19, T-V9-74 |
| Settings (5.12) | no defect records; one; a value outside its range in an older `AppPrefs` | `clerk.defects.none`; one line; clamped on load | T-V9-74 |
| labels in the application (5.14) | a name longer than its frame; an empty `displayText` | ellipsised in panels, full in the tooltip; the entity's class label | T-V9-74 |
| every new thing (5.15) | a thing with no drawn form at the zoom; a thing whose export family is off | listed in its panel only; omitted from that family, kept in the others | T-V9-74 |

**(f) The bend of J-VI.4 (f).** A raised course that would cut a sky access's column or rope line, where V05's
`skyAccessObstacles` offers no re-route, ends at the last ground vertex before it, with `bend.raised.hoist` (V09
§4.20.2 (6); V05 §4.2); T-V9-52's clause.

**(g) Combinations** V09 owns — another unit's feature met by the tools (T1–T12) or the layers (Ground, Sky, Below and
the view's thematic layers):

| combination (rungs) | outcome | test |
|---|---|---|
| steep ground × the tools (all) | a stroke over steep ground previews its owner's bends — the wall follows the ridge, the road its grade, the quarter its terraces (item 110 (a)); a handle dragged down a slope keeps the thing on its datum; T2's Flatten over a terraced ward reports the ward's re-derivation in the effects list | T-V9-51, T-V9-76 |
| steep ground × the layers (all) | Ground draws the slope's hachures and retaining walls; Below's cut-and-cover follows the surface (V04); Shade casts by the terrain (V05) | T-V9-76 |
| a moat × the tools (TOWN–METROPOLIS) | T3's wall snaps to the moat's inner edge and a gate takes a bridge (base §4.8); T4 crossing it bends to a bridge (`bend.road.bridge`); T2's Lake over it refuses with `refuse.water` | T-V9-76 |
| a bridge × the layers (all) | Ground draws the deck and its buildings (V09 §4.20.4); Below shows the river under it; the hit stack reaches what lies beneath (V09 §4.20.8) | T-V9-58, T-V9-76 |
| an oasis × the tools (all) | T2's Oasis chip makes one (V09 §4.21.1); T5 and T6 site around its grove; Delete removes pool, spring, grove and gardens in one event; a dossier oasis refuses with `refuse.dossierOwned` | T-V9-71 |
| an oasis × the layers (all) | Ground draws the pool, grove and gardens; Sky disables the chip (`disabled.skyWater`); Below draws its spring's well shaft where V04 has one | T-V9-71, T-V9-76 |
| the map's frame × the tools (all) | a stroke past the frame clips at it; a frame growth moves nothing the user drew and adds no history row of its own | T-V9-76 |
| the map's frame × the layers (all) | every layer clips at the same frame; Sky's lifted islands never draw past it | T-V9-76 |
| a neighbourhood × the layers (TOWN–METROPOLIS) | a standalone neighbourhood document shows Ground and Below only, Sky disabled with its reason; the History chip absent (`bend.time.hoodAlone` for a clerk's `adjust`) | T-V9-72, T-V9-76 |
| a terraced ward × the tools (TOWN–METROPOLIS) | T3's Retaining wall and T2's Flatten write the ward's terraces (V09 §4.20.1); T5 over a ward keeps its terraces; a building's handles keep it on its terrace | T-V9-51, T-V9-76 |
| a terraced ward × the layers (TOWN–METROPOLIS) | Ground draws the terrace edges; Below cuts at each terrace's level; the Coverage view tints by district, not by terrace | T-V9-76 |
| a composed building × the layers (all) | Ground draws its roofscape at the building band; Below shows its basement and crypt; the hit stack names each wing | T-V9-76 |
| a crypt × the tools (all) | T9's convert of a church carries its crypt (V03 §3.7.4); Delete of the church lists the crypt in its effects (`effect.vault.removed`); T4 Raised over it bends by V02's crypt rule | T-V9-60, T-V9-76 |
| a crypt × the layers (all) | Below draws it with its church's Below line (V09 §4.17); Ground shows the church only | T-V9-76 |
| a plan × the layers (all) | Ground draws V03's plan at the building band, Below its cellar; a hidden layer leaves the plan's tab in the panel | T-V9-76 |
| shade × the tools (CITY, METROPOLIS) | an edit under an island marks shade stale and **Update shade now** recomputes it; a T8 greenery stroke in deep shade previews its owner's bend | T-V9-76 |
| shade × the layers (CITY, METROPOLIS) | the Shade view draws over Ground only; on Sky it is not offered | T-V9-77, T-V9-76 |
| a sky access × the layers (CITY, METROPOLIS) | Ground draws its foot, Sky its head, each selecting the one access; a raised course meeting its column bends (f) | T-V9-52, T-V9-76 |
| a landfall × the tools (CITY, METROPOLIS) | the fallen island's ground is editable on Ground like any other; its ruin reads `ruinDetail` (DR30) | T-V9-76 |
| a landfall × the layers (CITY, METROPOLIS) | Sky drops the fallen island from its menu; Ground draws the wreck | T-V9-76 |
| a town's past × the tools (all) | the History chip's Re-derive keeps declared things (§7.2); a tool on the replay's epochs edits after them, never inside; the replay's epochs are not undo targets | T-V9-72 |
| a town's past × the layers (all) | Ground draws ruins and once-known voids at their keys; Below draws the buried systems the `HistoryRecord` names | T-V9-72, T-V9-76 |
| a dossier × the tools (all) | a dossier-owned fact refuses edit (`refuse.dossierOwned`, `refuse.dossierRemove`); its neighbours bend around it | T-V9-26, T-V9-69, T-V9-76 |
| custom content × the tools (all) | a custom class is placed, named and removed by the same tools; an unknown custom kind in a pasted roster line is listed as not understood | T-V9-70, T-V9-76 |
| custom content × the layers (all) | a custom kind draws on the layer its row names, its symbol from its row, else its family's glyph | T-V9-76 |

## 4 Editing — every screen's declarations, the tool binding, the clerk's view

### 4.1 The editing model in one paragraph

A user either **selects** a thing and acts on it in the context panel (or with the pointer idioms of §14's input
scheme), or picks a **tool** and makes a gesture on the map. Both paths end in the same place: one or more of §7.1's
events, sent through the pipeline of V09 §3.3 — previewed as a ghost, committed once, undone in one step. A tool acts on
the **working layer** (V09 §4.2); a selection acts on the thing selected, whatever its layer. There is no command
grammar (R8): the thing and the action are chosen in one motion — drag a road to move it, click a label to rename it,
press on a building and pick "Why here?". Everything the context panel can do is also reachable by the home tool §7.1's
binding table gives its event kind (its screen in V09 §4.3), so the rail is complete for a user who never opens a panel,
and the panel is complete for one who never opens the rail.

### 4.2 The tool rail, the five layers and the working layer

**The rail.** A vertical column on the left (wide and medium layouts; a bottom sheet on narrow, V09 §4.12). It holds
item 101's five layers as labelled groups — "Kind of place" (INTENT), "Ground & bones" (GROUND AND BONES), "What's in it"
(PROGRAMME), "Fabric" (FABRIC), "Finish" (FINISH) — each tool a 44 × 44 px button with its icon, its name under it at UI
scale 1, and its number badge (T1–T12, which is also its key, V09 §4.13). **Progressive depth (R9).** On first run only
the four `firstScreen` tools show: T1 `intend`, T5 `quarter`, T6 `place`, T12 `dress`, each layer group collapsed to a
"More…" chevron. A layer group expands when the user opens its chevron, when a hint or the guided town points into it,
or when the user first uses one of its tools; the expansion is remembered (`AppPrefs.railExpanded`). T9 `shape` and T10
`hold` are `contextual`: they appear in the rail (and as the first two tabs of the context panel) from the first
selection on, and stay. A user can pin any tool to the top of the rail (`railPins`). The rail never scrolls on a wide
layout (12 tools × 52 px + 5 headers ≤ 760 px at UI scale 1; beyond that the groups collapse to their chevrons
automatically).

**Tool options.** Picking a tool opens its options strip along the top of the map (not a dialog): the mode chips
(V09 §4.5's modes) and the parameters marked `basic`; "More" reveals the rest (R4). Options are remembered per tool for
the session.

**No layer bookkeeping (R6).** Nothing in the application orders, stacks or groups what is drawn: draw order is §8.2's
semantic order, a new thing lands where its kind belongs, and the working layer below chooses only which model layer
(ground, a sky island, the underground) the tools act on.

**The working layer** (view key `workingLayer`, per viewer; V09 §2.4): a three-way switch in the view bar — **Ground**,
**Sky** (enabled at CITY and METROPOLIS when the town has islands, II.6; a menu of the islands by name sets `key`),
**Below** (enabled when the town has an underground network, II.7, or a cavern or ruin — at any rung, item 109 (j) (1)).
A switch the town does not admit is drawn disabled with its reason ("No islands float over this town"; "Nothing lies
below this town yet") and the view key keeps `ground`. Switching layer also sets the layer's visibility on (§7.8's layer
controls, view state only) and dims the other layers to 35 % opacity. Every tool mode declares the layers it acts on
(`ToolModeRow.layers`). On **Sky** every row of V05 §4.1 takes its sky form, with the island's `key` (V09 §4.20.9): T1 the
islands setting and count; T2 the island's terrain, water and rim, and a **Terrace** whose edge lays an island retaining
wall (T2's **Oasis** chip disabled: "An island's water is its own", item 111); T3 **Draw wall** as V05 §3.21's
barrier-closure enceinte walling only the landing yards, and **Retaining wall** as an island `RetainingWall`, bent inward
past the rim walk on or along the rim (`bend.retaining.rim`); T4 a sky access only (V05 §4.2; Raised and Aqueduct hidden);
T5 a floating quarter; T6 an institution onto the island; T8 the brushes; T9 the island's altitude, area, position,
occlusion, underside and field, and an access's kind, role, state, knowledge and foot; T10 the island's locks, New random
and **Update shade now**; T11 the island's name and label; T12 the sky layer's visibility and occlusion. On **Below**, T4
draws a tunnel, a gallery or a link and T6 places a chamber or an access, each into the system the **system chip** names
(V09 §4.17.2). A mode that does not act on the working layer is shown disabled with its reason ("Tunnels are dug below
the ground" for T4's Tunnel on Sky). **A raised part** (item 110 (b): a ground arena part from 1) stays on the **Ground**
working layer — no fourth switch — and what lies under its deck is reached through the hit stack (V09 §4.20.8;
J-V9.68).

**The Below group** appears in the view bar while Below is the working layer or the underground is visible: the **depth
band** — a ladder of the non-empty bands by depth range ("−2.5 to −5 m") with the kinds present, stepped by PageUp and
PageDown (§14's precedence: while a plan is open the keys step its storey) — the view key `depthBand` its one store; the
**view** chips *Cut-away* · *Over the streets* · *Below alone* (`LayerSpec.underView`: `cutaway`, `overlay`, `solo`; a
`setLayer`, §8.4, V04 §5.1); the **hand lantern** toggle (the view key `handLantern`, §2.9); and, only for a view whose
knowledge tier is `secret`, **Show hidden caves and ruins** (the view key `showUnexcavated`, V09 §4.17.1). The **Sky
group** holds the island menu and **Update shade now** for a selected island (V05's `regenerate { kind: 'shade', island }`,
T10's). The Map and Light groups are V09 §4.19's.

### 4.3 The tool binding's screens — where a user reaches every edit kind

§7.1's binding table gives every `EditEvent` kind — the base's and the volumes' — its home tool per (event kind, target
class or path), and names the producer of every kind no user makes directly. This section places each pair on the
screen: the mode (a `toolkit.json` row whose `emits` lists the kind), the gesture, and the panel control or pointer idiom
that also reaches it. T-V9-12 checks, on every build, that every pair of §7.1's table has a mode here whose tool is its
home tool, and that every mode's `emits` names only pairs of that table.

| pairs of §7.1's row (event kind, target) | mode · gesture | also from |
|---|---|---|
| T1 `intend`: `adjust` (intent, recipe, layers, islands, sewer family, ruins, a lone hood's outline, the blueprint's `history`) | the **Kind of place** sheet's cards, chips and sliders, and its **History** chip (V09 §4.21.2); after a declaration a Re-derive previews as a whole-town ghost and commits on Accept (V09 §3.3); across the CITY line its effects list the generated raised ways that go or come, with **Keep them as yours** (V09 §4.20.3 (7)) | the basic and advanced panels (§7.8) |
| T2 `ground`: `setField(terrain)`, `warp`, `drawWater`, `moveCourseKnot`, `terrace` | raise, lower, cliff, flatten (brushes); warp kernels (a session with Apply / Discard); lake and **Oasis** (one point and a level; V09 §4.21.1); river by source and mouth; **river or canal drawn** as a line with a width handle → `drawWater { kind: 'river' \| 'canal', line, widthCm }`; coast and harbour; water paint; **Terrace** (a brush with a level readout, then the level handle; Accept; V09 §4.20.1) | river, lake and oasis handles (V09 §3.5); "Change the terrace's level" on a terrace-made wall |
| T2 `ground`: `setAttr` on `geology`, a bank class, a site feature (an oasis's spring point among them); `convert` `reclaim`, `siltReach`, `shiftCourse`, `digCanal`, `retypeLand` | chips on the selected ground or water; the "Change over time" menu of a water or marsh face (a context action with a ghost) | the context panel |
| T3 `wall`: `drawWall` (every kind), `placeGate`, `moveVertex` on a gate's crossing or a retaining wall's chain, `setAttr` on a retaining wall and on the castle | **Draw wall** (two or more points or a line; on Sky with the island's `key`, V05 §3.21); **Gate** (a stamp on the trace; a gate's grip slides it, V09 §3.5); **Retaining wall** with the High side chip (V09 §4.20.1); the castle's keep grip and bailey handle | wall handles; the retaining wall's panel and chain handles; the castle's panel ("Move the castle", "Castle grounds" stepper) |
| T3 `wall`: `convert` `wallToWay`, `gateToJunction`, `neglect`, `breach`, `dismantle`, `contractWall`, `absorbWall`, `repairWall`, `repairRetaining` | "Change over time" on an enceinte, a gate or a retaining wall (a context action with a ghost) | the context panel |
| T4 `road`: `drawWay` (every class, `raised`, the `aqueduct` class, V07's walk mode), `drawTunnel`, `addLink`, `placeSkyAccess` | class chips (main, street, lane, alley, track, path, quay, pier, bridge, ford, **Aqueduct**) and the **Raised** toggle (two points or a line; a raised stroke's ends on ground vertices, V09 §4.20.2); **Tunnel** and **Link** on Below (the gallery's system from the system chip, V09 §4.17.2); **Sky access** (a stroke ground → rim) | way handles; a raised way's handles; **Build it again** in the history (V09 §4.20.3); **Keep them as yours** on T1's ghost; the island's context panel |
| T5 `quarter`: `quarter`, `drawBoundary`, `declareEnd`, `setAttr` on a district, `merge` and `split` of districts | a kind card, then seed / corners / lasso / brush / click-inside (§7.1's points forms); on a selected quarter its kind card, band chip, "Merge with…", "Split along…" (a two-point line); at a village rung the card reads "End" (one point, a building or a pin) | boundary handles (a partial ring, V09 §3.5); the context panel |
| T6 `place`: `placeAt` and its `lift`, `assign`, `unassign`, `build`, `drawFootprint`, `rejectSite` and its `lift`, `drawChamber`, `placeAccess`, `addUndergroundAccess`, `instance` adding a hood pin, a one-line `roster`; `convert` `relet`, `openUse`, `closeUse`, `relocateUse`, `mutate`; `swapUse`; `setAttr` on a market's `rank`, a use's `concealment` and `front`, an institution's `powers` | **Stamp** (drop on a spot, a quarter, a road or a gate; on a deck plot and at a landmark slot, V09 §4.20.4); **Locus** (typed); **Footprint**; **Furniture** (V01's stamps); on Below `chamber` and `access` with the system chip; "Add a way down" on a building; **Not here** on a dossier-backed thing, **Allow here again** on a rejected site, **Free this plot** on a pinned plot, **Remove the assignment** on an assigned thing; "Households" (a stepper); "Open a business here", "Close", "Move it", "Swap with…" (drag a use's badge onto another building); "Main market", "Hidden behind…" chips | the Delete key on a dossier-backed thing; the refusal card; the context panel's "Make this a…"; the plan panel; the access closure of a dwelling declaration (V09 §4.17.4) |
| T7 `roster`: `roster` of any number of lines | paste or type a list; cards | — |
| T8 `fill`: `fill`, `setField` (density, greenery, prosperity), `drawGreen`, `setAttrMany` of land use, `instance` groups of trees, `setAttr(fabric)`, `setAttr(fabricParams.*)`, `setAttr(terrace)` with their `regenerate` | density, mix, greenery and prosperity brushes; square and park (drop and size); **Land use** lasso; **Trees** brush (plant, thin, restyle); the **Layout** card and the Terraces chip on a district (a card pick with variations) | the close-up panel |
| T9 `shape`: `split`, `join`, `merge` of ways and plots; `moveFootprint`, `setEntrance`, `paint`; `setAttr` on the shape paths (a building's class, heights, roof and basement; a plot's tenure, reach and front jitter; a way's class, width, surface and name; a bridge's kind; a square's type; a block's content; a raised way's spans, crossings, `clearanceCm` and `spanSpacingCm`; a wall stretch's grade; an access point's paths; a catacomb's `fill`; an island's and a sky access's paths; a ruin monument's count; a mutation plan's step); `moveVertex` on an access point; `setMassing`, `setComposition`, `reshapeRange`, `moveTower`, `addTower`; the plan events, `setHearth`, `instance` on furniture; `drawPassage`; `convert` `sealPassage`, `openPassage`, `densify`, `thin`, `subdivide`, `amalgamate`, `plotToGarden` (plots and blocks), `demolish`, `abandon`, `decay`, `ruin`, `robStone`, `clear`, `rebuild`, `build` (buildings), the tunnel kinds `silt`, `caveIn`, `seal`, `reopen`, `flood`, `raiseGrade`, `clearUndercity` (V04) and the island kinds `resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland` (V05); `startWorks`, `cancelWorks`; `editTable` of the map-side declarations; `delete` of an access point or catacomb galleries | V09 §4.5's contextual modes (`plot`, `building`, `massing`, `plan`, `tiers`, `place`, `way`, `raised`): corner, door, range, tower, room, wall and access drags; storey, dormer and fill steppers; roof, wall-paint, porch (the secondary porch included), hood, tower-shape (`moveTower { shape }`), room (`setComposition room`) and role chips; the family strip; on a way **Split here** and, with two ways selected, **Join these**; on a raised way, span or crossing the span `use` chip (open · vault), the crossing's Stair · Ramp chip and the Deck height and Arch spacing steppers (V09 §4.20.6); on a ruin's monument a count stepper; "Change over time" actions; "Build it over time" (a toggle with a duration); "What it cares about", "All {kind}s in this town", "Keep together on one plot" and the link view (V09 §4.7); "Brick it up", "Lock it", "Open it", "Who knows this way down" on an access (V09 §4.17.3) | the context panel's Shape tab; the building, plan and catacomb panels; the island's context panel; the tables editor |
| T10 `hold`: `lock`, `unlock`, `pin`, `unpin`, `revert`, `regenerate` (keep, New random, a rung, a tunnel run or system, an island's `shade`), `rerollLayer('village.track')`, `delete` of anything else | the lock and pin icons; "Try again" with its scope chips; the re-roll brush (V09 §3.7); **Reset to generated**; "Update shade now" on an island; **Delete** on any thing (V09 §4.20.3) | alt+click (lock), shift+click (New random), R, ctrl / cmd+click (revert); the Delete key and every tool's context menu |
| T11 `name`: `setAttr(name)`, `setAttr(displayText)`, `setAttr(knownTo)` on a plot, building or institution, `moveLabel`, `hideLabel`, `group`, `rerollLayer(naming)` | click a label to type; drag it; select quarters and "Name as region"; **New names** with a scope; "Who knows this place" chips | F2 on the selection; the context panel |
| T12 `dress`: `setStyle`, `setLayer`, `paintGround`, `placeLight`, `setAttr` and `delete` of a light, `rerollLayer` of `style.compass`, `naming.emblem`, `render.instances`, `style.jitter` and `style.crowns` | style cards; toggles; **New trees**, **New decoration**, **New emblem**, **New compass**; a quarter's **Colour** swatch (a thematic `setStyle` row keyed by that district); the wall layer's **Show the whole circuit** and the underground's view chips (`setLayer`); a ground-texture brush; drop a light, drag it to re-host its point; the furniture tray | the view bar (layers, the Below group); the light's context panel |
| no tool — its producer (§7.1) | `setAttrMany` other than land use: the multi-selection's context panel (V09 §4.6), the gazetteer's bulk edit; `closeup`: the first edit inside a close-up; `editTable`, `editPreset`: the tables editor and presets dialog (V09 §5.7) and the advanced panel's "Raised ways the town builds by itself" (V09 §4.14); `epoch` and `advance`: V06's time card (T1's sheet) and the timeline bar ("Advance 10 years"); `undo`, `redo`: the top bar, ctrl / cmd+Z and shift+Z, "Go back to here" (a group); `upgrade`, `rebase`: the upgrade offer (V09 §3.14 (a); in host mode V08 §4.2's **Update the map engine**), the load-mismatch choice, the frozen view's **Edit it with this version** (V09 §3.14 (b)), "Rebuild around my drawings" (§7.2) in the file menu, kept in host mode; `dossierFacts`, `dossierRecord`: host-only (V08 §4.1), refused from any user | the clerk's proposals for `advance` |

The base's **view keys** with no event — `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `season`, `weather`,
favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings, `showUnexcavated`,
`cvdVariant` — are written by `setView` from the controls of V09 §4.2, V09 §4.19 and V09 §5.12; they are not logged and
have no undo beyond the control's previous value (§2.9).

### 4.4 The context panel — generated from the entity registry

A selection opens the **context panel** (wide: a 360 px column on the right; medium: a 320 px sheet over the map's right
edge; narrow: a bottom sheet at half height, dragged to full; V09 §5.1). Its content is **generated** from §2.8's entity
registry, so a new entity kind or edit path reaches the panel without panel code:

* **Header** — the thing's name (click to rename: T11), its kind in plain words from the message catalogue, a **tier
  chip** for the thing and for each field (§2.8's `factTier`: "From SettlementForge" for `dossier`, "Yours" for
  `declared`, "Made by the rules" for `map`), the lock and pin toggles (T10), and the **Why here?** button (V09 §5.8).
* **Tabs** — **About** (every attribute the registry lists for the kind, each with its tier chip; an editable path is a
  control, a derived one is text); **Shape** (T9's controls for the kind, V09 §4.5); **Keep** (T10: lock paths, pin,
  revert, New random with its scope chips); **Links** (a use's supply links, V09 §4.7); **Over time** (the kind's
  `convert` ops and "Build it over time" for Works, §4.11; the lifecycle lines — "ruined since year N", "once an inn" —
  from V06 §5.2); **History** (the history panel filtered to rows whose `targets` include the thing). A tab with nothing
  to show for the kind is omitted; the building kind adds V03's plan tab and V02's massing controls at the building band;
  a district adds V01's close-up tab.
* **Controls by attribute type** — an enumeration of ≤ 6 values: chips; more: a searchable list; a number with a range
  and unit: a stepper beside a slider, the unit from `AppPrefs.units`; a boolean: a toggle; a name: an inline text field;
  a reference to another entity: a "pick on the map" button (the next click on a matching kind answers); a colour: the
  style's palette swatches plus a custom picker. An attribute's type, range and unit come from the entity's schema
  (`zod`, §1.7), its label and help anchor from the registry's row for that edit path (§2.8, item 269), a parameter's
  from the control registry (§7.8, §14's context help).
* **Dossier-owned fields** are shown, not hidden: disabled, with the reason "Set by SettlementForge" and, for a name, the
  map-side alternative "Show a different name on this map" (`displayText`, §9.1); an attempt that reaches the engine
  anyway gets the `refuse.dossierOwned` card (V09 §4.9).
* **Multi-selection** — the header reads "{n} selected" with the kinds counted; About shows only the attributes every
  selected thing has, a differing value shown as "mixed"; a change sends one `setAttrMany` with the resolved ids (§7.1),
  one undo step. Shape and Keep act on each selected thing, grouped into one undo step.
* **The context menu** (right-click, a long press on touch, Shift+F10 or the Menu key on the selection) is generated from
  the same registry and `toolkit.json` (J-V9.52), in this order: **Why here?**; **Select below: {name}**, one item per
  other entry of the hit stack under the pointer (V09 §4.20.8); **Try again** (New random with the kind's default
  scope); **Lock** / **Unlock**; **Pin** / **Unpin**; **Reset to generated** (when edited); the kind's primary Shape
  actions (the first four of its Shape tab's controls, as items); an **Over time** submenu (the kind's `convert` ops and
  "Build it over time"); **All {kind}s in this town…** for a use (V09 §4.7); and last **Delete**, previewed by
  V09 §4.20.3's rule — or **Not here** for a dossier-backed thing. Each item is the same control as the panel's, so it
  previews and commits the same way; a menu opens at the pointer, is keyboard-navigable (arrows, Enter, Esc) and closes
  on any other click. A kind with no Shape action and no `convert` op shows neither group.

### 4.5 The twelve tools at build depth

Each row gives the modes (with their gesture), the parameters shown at once and those behind "More" (R4), the mapper
from a draft to events (V09 §3.3 step 4), the commit style (V09 §3.3), the badge's extra figures and readouts, the
keyboard form (§14's accessibility contract) and its availability on the narrow layout and with a coarse pointer
(V09 §4.12); the bend and refusal lines are V09 §4.9's rows. §14's table gives each tool's first-use hint and live
feedback.

**Mode ids** (`ToolModeRow.id`, V09 §2.3; J-V9.124). Each mode's id is its name in the row in lower camel case, unique
within its tool — among them T2's `lake` with its `oasis` chip, T6's `stamp`, `locus`, `footprint`, `furniture`, the two
**Below** modes `chamber` and `access`, and `wayDown` (on a building); T9's contextual modes, named by what is selected —
`plot`, `building`, `massing` (V02's massing tools at the building band), `plan` (V03's plan tools), `tiers` (a stepped
building's tier controls, V09 §4.20.5), `place`, `way` and `raised`; and T11's `rename`, `moveLabel`, `region`,
`newNames`, `leader` and `knownTo`. A catalogue button and the clerk's `useTool` open a tool in one of them (V09 §2.9's
`MsgButton.mode`; V09 §4.11), and T-V9-15 checks every such mode against `toolkit.json`.

| tool | modes · gesture | basic parameters | behind "More" | mapper → events | commit | badge extras · readouts | keyboard form | narrow · coarse |
|---|---|---|---|---|---|---|---|---|
| T1 `intend` | the **Kind of place** sheet: product chips (Town & city; Village when that product is registered, V07; Neighbourhood, V01's `product: 'hood'`), site cards (a forms-catalogue row with its water setting, side and era preset, §7.7, §7.8), size chips, wealth slider, walls chip (none · one ring · two rings), style card, the **History** chip (V09 §4.21.2); Surprise me; V06's time card. **The size words** — seven chips at population quantiles of the rungs' bands read from the rung table: small town, town, large town at the TOWN band's 25th, 50th and 85th percentiles; small city, city, large city at the CITY band's; metropolis at the METROPOLIS band's median — each showing its number ("about 3 400 people"). This rule is the size words' one home: the History chip's peaks and the clerk's lexicon (V10 §3.3) name these quantiles, never a number of their own (J-V9.56) | site, size, wealth, walls, style | exact population, seed, gates, castle, the features strip, planned ↔ organic, greenery, labels (the rest of §7.8's basic panel); "Advanced…" opens the advanced panel | empty state: a new `generate` replacing the untouched town (V09 §3.2); after a declaration: `adjust(param, value)` — a Re-derive for a parameter consumed before S10 (§7.1) | empty state: on release; after a declaration: a whole-town ghost with Accept (V09 §3.3); the fates sheet only after Accept, when fates other than kept or renames exist | the proxy thumbnails while a site or size card is hovered (§7.8); "Re-derives from {stage}: {n} of your changes are kept, {m} move"; across the CITY line, the raised ways that go or come among the effects (V09 §4.20.3 (7)) | cards in a grid with arrow keys, Enter picks; sliders take arrows and Page keys | yes · yes |
| T2 `ground` | **Raise, Lower, Cliff, Flatten** (brush: press and drag); **Warp** (the eight kernels of §7.1, a session with Apply / Discard); **Lake** (one point, then drag up or down for the level), with the **Oasis** chip (the spring flag; V09 §4.21.1); **River** (source point, mouth point); **River or canal** (draw a line; a width handle, default the kind's width row); **Coast & harbour** (sea level, one shore point, a basin size); **Water paint** (add or subtract water by lasso); **Terrace** (a brush that levels the ground under it to a level, with its level handle; V09 §4.20.1) | brush radius (m), strength; Oasis | falloff, the terrain brush's water mode (`locked` by default, `follow`; §7.2), a warp's inner radius | a stroke → `setField { field: 'terrain', stroke }`; a warp session → one `warp`; lake → `drawWater { kind: 'lake', from: { points: [p], levelCm } }`, with Oasis `from: { points: [p], levelCm, spring: true }`; river → `drawWater { kind: 'river', from: { points: [source, mouth] } }`; a drawn river or canal → `drawWater { kind, line, widthCm }`; harbour → `drawWater { from: { points: [shore], levelCm, sizeM2 } }`; water paint → `drawWater` with `add` or `subtract` rings (on Sky with V05's `key`); terrace → `terrace { stroke, levelCm }` (item 362) | a stroke on release; a warp on Apply; water forms and a terrace on Accept | height under the pointer (m), slope (%), stroke length; "{n} plots re-flow · {m} roads re-routed" from the preview; for an oasis V09 §4.21.1's badge | a brush applies at the focused entity's scope with the arrow keys moving the brush centre and Enter stamping; points forms by arrows + Enter | no (view only: "Shaping the ground needs a larger screen") · yes |
| T3 `wall` | **Draw wall** (two or more points or a line; closes when its ends meet within 20 px); **Gate** (drop a gate stamp on a trace; slide a gate's grip — `moveVertex`, V09 §3.5); **Retaining wall** (two or more points or a line with the **High side** chip; V09 §4.20.1); on the castle, its keep and bailey handles | High side (Retaining wall) | the enceinte kind (§2.7), open or closed | `drawWall { points or from: { points }, kind, closed }`; a gate → `placeGate { enceinte, at }`; a retaining wall → `drawWall { kind: 'retaining', points or from, closed, highSide? }` | on release; Accept when fates move houses or effects are listed | gates · towers · walled m · closed by barriers m · houses displaced · the districts enclosed, tinted (V09 §3.4); a retaining wall: V09 §4.20.1 (2)'s badge | points by arrows + Enter; Tab cycles gate grips | no · yes |
| T4 `road` | class chips (main, street, lane, alley, track, path, quay, pier, bridge, ford, **Aqueduct**); the **Raised** toggle (V09 §4.20.2); **Tunnel**, **Link** (Below, with the system chip); **Sky access** (Sky, or a stroke from the ground to a rim) | class, Raised | width (m), name, V07's walk mode at village rungs | two points → `drawWay { class, widthCm, from: { points: [a, b] } }` (S4's router); a line → `drawWay { points }`; with Raised or Aqueduct → `drawWay { class, widthCm, raised: true, points \| from: { points } }` (item 362); Below → `drawTunnel` / `addLink` (V04); Sky → `placeSkyAccess` (V05) | on release; a raised or aqueduct stroke always on Accept (V09 §4.20.2 (8)) | length (m), bearing (Shift snaps to 15°), grade (%), bridges, "{n} new frontage plots" (ghosts along the road; on a pier, quay or bridge "{n} deck plots", V09 §4.20.4); with Raised on V09 §4.20.2 (8)'s badge | points by arrows + Enter; Backspace or right-click removes the last point; PageUp / PageDown turn Raised on and off while drawing | no · yes |
| T5 `quarter` | a **kind card** first (the district-kind rows, V11), then: one **seed** point, **two to four corners**, a **lasso**, a **brush**, or **click inside** a road-enclosed block (takes that block whole); a name | kind, name, band chip (the band set's labels, §4.5) | size target (m², also the badge's plus / minus), sky (V05) | `quarter { kind, name?, band?, from: { points, sizeM2? } }` (§7.1's sugar); click-inside → the block's ring as the lasso form; at a village rung → `declareEnd` (V07); on a selected quarter: `setAttr`, `merge`, `split` | Accept (pending ghost with handles, V09 §3.3) | plots · households · buildings, **plus / minus** stepping `sizeM2` by (band max − band min) ÷ 8, clamped into the kind's size band, from the band's median when unset (item 348) | kind cards by arrows; the seed at the focus point; handles by Tab | yes (seed and click-inside only) · yes |
| T6 `place` | **Stamp** (a searchable palette of class stamps grouped by category, V11's labels and icons, listing the classes the document's rung admits — V09 §4.16 (3)'s set; drop on a spot, a quarter, a road or a gate); **Locus** (type "near the north gate"); **Footprint** (draw a polygon); **Furniture** (V01's hood-pin stamps); **Below**: chamber (`chamber`), access (`access` — `placeAccess` on a chosen spot, over a sealed void the user's excavation; `bend.under.noAccess`'s and `info.under.sealed`'s **Add a way down** open it), each into the system the system chip names, and "New ruin", "New cavern", "New catacomb" where item 109 admits one (V09 §4.17.2); on a building: "Add a way down"; on a rejected site "Allow here again", on a pinned plot "Free this plot", on an assigned thing "Remove the assignment"; on a deck, its plots and a mole's or long bridge's landmark slots (V09 §4.20.4) | class, name | exact site ("this plot only"), the drift bounds (§7.7), a hidden front (item 63) | a drop on a plot → V10 §4.1's `where.at` row (with "this plot only", its `where.plot` row), the one mapping for canvas and clerk (T101-3): `placeAt` with `designation { cls, use }` (§4.7's `Designation`) and, when the name field is filled, a `setAttr { path: 'name' }` on the use `placeAt` creates — its address read from the preview's `created` list (item 470) as V10 §3.11 (3) resolves a placeholder — the two in one group; a drop on a quarter, road or gate, or a typed locus → a one-line `roster { lines: [{ name, cls, locus }], expansion }` (an empty name field writes `name: ''`, item 571's unnamed line; one text with V10 §4.1's `where.locus` row; item 570; the sugar expands to one `assign` whose id the engine mints from the event's `seq`, §6.3, so the app never writes an assignment id; the locus a `Locus` — §7.1: its `rel` in, on, at or near, its `target` and optional `side` — parsed from the drop target or the typed words, V09 §4.16); **with a dossier connected** (§7.1's roster rule; J-V9.88) a locus drop of a class stamp previews the same one-line `roster`, and a line naming no element comes back `dossier-owned`: its card is `refuse.roster.dossier` with the element picker of V09 §4.16 (5) (the unplaced elements, the stamp's class first; a pick re-previews the line with its `element`) and **Put it at {site}** — `placeAt { plot, designation }` on the first `SiteCandidate` with no `hardFails` of `query({ kind: 'sites', cls, near: target.anchor, district: rel === 'in' ? target.id : undefined, k: 3 }, { admitAs })` (`target` the locus target's `EntityCard`; one query for canvas and clerk); when none of the three is free of hard fails, **Put it at {site}** is not shown and the picker stays — one rule with V10's `dossier` alternative; footprint → `drawFootprint`; furniture → `instance { op: 'add' }` (V01); chamber → `drawChamber { system }` or `{ system: { newKind } }` (item 361); access → `placeAccess`; a way down → `addUndergroundAccess`; the lifts → `rejectSite { op: 'lift' }`, `placeAt { lift: true }`, `unassign` | Accept, or nudge (drag the ghost footprint to another plot: a new preview there) | the chosen plot's area, households; the one-line reason; two or three faint alternatives (item 463); on a deck "on the {deck} · at most {n} storeys · {a}–{b} m²" (V09 §4.20.4) | the stamp palette is a listbox with type-ahead; the locus field is text; Enter accepts | yes · yes |
| T7 `roster` | **Paste** into the visible box in T6's options ("Paste your list of places"); each line becomes a card with its guessed class (changeable) and locus; under the box, **Ask the assistant to place these** when a clerk is configured and on (V09 §4.11) | — | with a dossier: an element picker per line (unplaced elements) | one `roster { lines }` (§7.1's sugar) for the whole list; accepting card by card commits a `roster` with that card's line and re-previews the rest; with a dossier connected, a line committed naming no element comes back `dossier-owned`: its card is `refuse.roster.dossier` — the element picker and, when a candidate is free of hard fails, **Put it at {site}** by T6's `sites` query (`near` and `district` from the line's locus, both omitted for a line with none; V10 §4.1) — one rule with volume 10's `dossier` alternative (J-V9.99); an empty paste makes no card and no event | Accept all, or per card | plots · households · buildings; sites placed · lines not placed (each with its nearest options) | the card list is a grid; Enter accepts the focused card | yes · yes |
| T8 `fill` | **Density**, **Mix** (an arrangement: dense rows, detached, compounds …), **Greenery**, **Prosperity** brushes; **Square**, **Park** (drop and size); **Land use** (a lasso: arable, pasture, orchard, wood); **Trees** (a brush: plant, thin, restyle); **Layout** card on a district (V01's fabric) | brush radius, the density dial (−3 … +3) | the arrangement's class, the layout's parameters (V01) | density / greenery / prosperity → `setField { field, stroke }`; mix → `fill { scope: the blocks under the brush, arrangement, cls? }`; square / park → `drawGreen { polygon, kind }`; land use → `setAttrMany { ids: the land-use faces under the lasso, path: their kind, value }` (§2.7's land-use faces); trees → one group of `instance { op: 'add' \| 'remove' \| 'restyle' }` (a `drawGreen` first where no green hosts them); layout → `setAttr(district.fabric)` + `regenerate` (grouped, V01) | brushes, mix, layout: Accept one of three variations, the committed group of V09 §3.6; square, park, land use, trees: Accept | plots · households · buildings; the variation tray | the brush at the focused scope; `[` `]` cycle variations; Enter accepts | no · yes (subject to §13.4's touch fallback) |
| T9 `shape` | contextual: on a plot — split (a two-point line), join (click a neighbour), corner drags, front jitter, reach; on a building — move and turn the footprint, storeys, roof kind and colour, door drags, basement, class, over-time actions, "Build it over time"; at the building band — V02's massing and V03's plan tools, and on a `stepped` building the tier controls (V09 §4.20.5); on a place — "What it cares about" (V09 §4.7); on a way — class, width and name, **Split here** (one click on it) and, with two ways selected, **Join these**; on a raised way, span or crossing — V09 §4.20.6's controls; on a ruin's monument — its count | the kind's primary controls | the rest of the kind's editable paths | the event kinds of V09 §4.3's T9 row; on a way, Split here → `split { id: the way, cut: [p] }`, `p` the nearest point of the way's centre-line to the click by V10 §4.1's T9 rule, and Join these → `merge { ids: [the first selected, the second] }`; a ruin monument's count → `setAttr(monument/count)` | on release (each edit one undo step; V02 and V03 as they state) | "{n} households re-homed", the site plan's changes | every control in the Shape tab is a form control | view and the Shape tab's forms only · yes (subject to §13.4's fallback) |
| T10 `hold` | contextual: the lock and pin toggles on any thing; **Keep these, re-roll the rest** on a lasso; **Try again** (New random) with scope chips (on Below also this run, this system); the **Re-roll brush** (V09 §3.7); **Reset to generated**; on an island **Update shade now**; **Delete** on any thing (the Delete key and the context menu; V09 §4.20.3; J-V9.74) | — | lock on attribute paths (a person's name, a room) | `lock` / `unlock` / `pin` / `unpin`; `revert`; `regenerate { scope, mode }` (V09 §3.7); `delete { id }` | lock and pin at once; New random by Accept of a variation; a Delete at once, or on Accept when its dry run lists anything beyond the thing itself | the fates list (kept, carried, orphaned); held things stay bright while the rest ghosts | alt+Enter toggles the selection's lock (L stays the labels key, §14); R is New random | yes · yes |
| T11 `name` | click a label to type a new name; drag a label; select quarters and **Name as region**; **New names** with a scope (these, this quarter, the town); the leader-line switch; "Who knows this place" | — | name packs and a user's own name list (§10.4, an `adjust` of packs) | `setAttr(name)` — or `setAttr(label.displayText)` for a dossier-owned name; `moveLabel`; `hideLabel`; `group`; New names — these → `rerollLayer { concern: 'naming', ids: the selection's named entities, salt: 0 }`; this quarter → the same with `ids` the quarter and every `gazetteer` row not marked withheld whose district is the quarter, read with `admitAs` = `effectiveKey()` (V09 §2.7; J-V9.110); `ids` in address order in both scoped forms, their per-entity `salts` the dry run's (§6.3 case (3)); the town → `rerollLayer { concern: 'naming', salt: the concern's current salt + 1 }` with no `ids`, through the fates sheet — a concern's current salt is §6.1's effective salt, as `DisplayList.salts` carries it; `setAttr(knownTo)`; a scope with no named entity offers no New names | on Enter or release; a town-wide New names or a pack change via the fates sheet (it lists every rename, §6.3 case (4)) | "{n} names change" | F2 renames the selection; Tab moves between labels in view | yes · yes |
| T12 `dress` | **Style** cards (the shipped families, random style, saved sheets); the **quarter tint** toggle; a selected quarter's **Colour** swatch; the **Colour vision** chip (V09 §5.12); the **furniture tray** (compass, scale bar, title cartouche, legend, emblem, border, grid, north arrow, annotation marker); **Light** (day or night, sun: cursor, fixed or path, sun height, hour); **Ground texture** brush; **Lights** (drop a lamp or a torch); **Underlay** (an image to trace, its opacity and frame handles); the close-up's quieter / busier slider and vignette (V01); **New trees**, **New decoration**, **New emblem** and **New compass** (buttons in the Dress panel) | style, tint, furniture, light | ground texture, lights, underlay, the style's rows ("Edit this style…", the style dialog) | style card → `setStyle`; tint → `setStyle` (a thematic row); a quarter's colour → `setStyle` (a thematic row keyed by that district); Colour vision → the view key `cvdVariant`; furniture and light → view keys by `setView` (§9.5, §2.9); ground texture → `paintGround`; lights → `placeLight`; underlay → the `underlay` view key; close-up → `closeup` params and `setStyle` (V01). **The four layer re-rolls** (town-wide, each a `rerollLayer` at the concern's current salt + 1, §6.1; display only — nothing else moves): **New trees** → concern `render.instances` (the trees, hedgerows and render-time field strips re-drawn; J-V9.101); **New emblem** → `naming.emblem` and **New compass** → `style.compass` (the emblem generator and the compass program re-draw, §9.5); **New decoration** → one `group` of `style.jitter` then `style.crowns`, in §6.1's registry order (the drawing's render-time jitter and the tree crowns' shapes; one undo step; J-V9.115) — this row is New decoration's one statement, which volume 10's `restyle` value `'decoration'` reads (V10 §4.1) | at once; logged ones are one undo step each; view-key changes are not logged and are toggled back | — | every card and toggle is a button; the underlay's frame handles by Tab and arrows | yes (not the texture brush or the underlay) · yes |

### 4.6 Multi-selection and moving things (R16)

* **Selecting several.** Shift+click adds or removes a thing; shift+drag on empty map draws a box; the lasso (T10's
  lasso, or the lasso chip in the selection menu) selects every thing whose mark centre lies inside; the gazetteer and
  "features in view" lists select with ctrl / cmd+click and shift+click; ctrl / cmd+A selects every thing of the
  primary's kind in its district. A box or lasso that holds no mark centre leaves the selection as it was.
* **Moving.** Dragging any selected thing moves the whole selection by the same world offset, each thing by its own event
  kind, all in one `group` (one undo step): a building by `moveFootprint`, a label by `moveLabel`, a decoration, tree or
  hood pin by `instance { op: 'move' }`, a light by `setAttr(point)`, a vertex handle by `moveVertex`, a place (a
  `placeAt` pin) by `placeAt` on the plot under its new centre. Things that cannot move (a district, a whole road) are
  left in place and named in the badge ("2 roads stay; drag their handles to move them"); a selection of only such
  things does not drag. The ghost shows every moved thing at its new place; the dry run's fates list what re-fits around
  them. Rotation (a building's `rotateCdeg`) is the rotate handle of a single selected footprint.
* **Reaching what lies beneath** (item 110 (b)). A click on the already-selected thing, where more marks lie under the
  pointer, selects the next one down — a raised deck, then its span, then the arch vault, then the street — and the
  context menu lists **Select below: {name}** for each (V09 §4.20.8; item 466). A double-click still zooms to the
  thing's band.
* **Copy and paste** are not offered: a copied building is not a declaration the rules can derive, and the survey records
  the request only for free-form builders (Tiny Glade, `research/ux/tool-survey.md` §1 rank 5); a "same kind here" is
  T6's stamp.

### 4.7 The file g edits: siting, links, splits, wall stretches, records

**"What it cares about" (items 103 (e), 104 (a)).** A place's Shape tab shows how the rules site its kind, read from its
`why` answer (V09 §2.7): the eight families of V11 §2.4 as rows, each worded by V11 §3.3.1's `says` column (V11's
sentence; J-V9.36) with the resolved weight's **source chip** ("yours", "from its picture type", "from its category",
"from its tags", "from its library entry", "guessed from its name" in the low-confidence tone, "a general guess"). The
rows are read-only here and link to the **per-kind panel**, "All {kind}s in this town" (also on the context menu): the
same rows with V09 §2.6's five-step family multiplier each, written into `siting.declared` under the kind's key by
`editTable`; "Edit the details" opens the kind's `Partial<SitingProfile>` cells (emits and sensitive-to levels, needs,
clientele, competition, coverage, balance) as a typed form over the same row; and **Put them in {quarter}**, **Put them
here** and **Keep them where they are** write the cells V09 §2.6's table names. The chips turn to "yours". The panel
then says, as V11 §4.3 rules: "Placed {kind}s stay where they are. {n} would gain by moving." and offers **Show better
sites**: a fresh `why` whose `alternatives` (≤ 3) are drawn as faint numbered outlines; clicking one previews `convert
relocateUse { use, to: site }` (§4.11) with its fates, and Accept moves it. A kind with no placed member shows the rows
and no "would gain" line. A change for every town ("all tanneries everywhere") is the tables editor's (V09 §4.14).

**The link view and link edits (item 105 (j)).** The thematic view **Supply links** (V09 §5.4) draws the links. Clicking a
link selects it (`Selection.kind = 'link'`); the Link card reads "{consumer} buys {good} from {provider} — {distance} m,
{near enough | a long way}", its orientation in words, and — for a SettlementForge chain (item 105 (i)) — "This supply is
impaired" or "This supply is at risk" and "{end} trades through {entrepôt}". It offers, each an `editTable` row
operation on `siting.linkEdits` keyed `<consumer>/<good>` (V09 §2.6):
* **Keep this supplier** → `{ bindTo: provider }`;
* **Use another supplier** → the link's provider end becomes a handle; every other member providing that good glows;
  dropping on one → `{ bindTo: that member }` (item 105 (j)'s "move"); dropping elsewhere cancels; with no other
  provider of that good, the item is not drawn;
* **Cut this link** → `{ avoid: [provider] }` (the next nearest serves; with none, the consumer takes no provider for that
  good, said in the preview); **Stop buying {good} here** → `{ cut: true }`;
* **Reset** → the row deleted (the path back to the rule).
Each previews first: the ghost redraws the consumer's links as they would bind, and the badge names what re-binds ("the
bakery now buys flour from the east mill"). A binding change moves no building by itself; the card offers **Show better
sites** as above. How a kept, cut, impaired or entrepôt link is drawn is V09 §5.4's (one channel per cue). A chain is
never labelled a quarter in this view: the legend names a chain by its goods ("wool → cloth → dyed cloth"), and a
quarter name appears on the map only when item 72's identity threshold names one or the author or the dossier declares
one (item 104 (h) (3) as revised by item 107 (e)).

**Works and shop (item 105 (h)).** A split institution's panel shows both buildings ("Works: the slaughterhouse outside
the east gate · Shop: the stall on Market Street") with **Keep together on one plot** → a `siting.declared` row keyed
`use:<works use>` with `split: false`, previewed with its fates (the shop's use closes and the works takes one plot);
**Let the rules decide** deletes the row. The per-kind panel offers the same for every member of the kind. The split's
own placement is the solver's (item 105 (h)).

**A wall's stretches (item 106 (c)).** Selecting a stretch of wall shows its grade — "Full curtain", "Light wall", or
"No wall: the {cliff | gorge | marsh | water} closes it" — as chips. A change is `setAttr(enceinte,
'profile/<arc>/grade', g)` (item 360), an edited path S7's operator keeps as a fixed input; "No wall" is offered only on an
arc whose barrier closes by item 106 (a)'s defensibility table, and a request for it on open ground is bent: "Open
ground needs a wall; kept a light wall here." The badge shows the stretch's length and towers.

**A collective record's members (item 108).** A record selected from the gazetteer or by clicking one member (then
"Select all {n}") sets `Selection.kind = 'record'`: every member is outlined on the map, and the panel reads the record's
`EntityCard.members` (item 468): "Blacksmiths — 7 workshops (the town's size asks for 5 to 10)", the step in plain words
(COUNT "one trade, several workshops"; QUARTER "a trade's own quarter"; GUILD "a guild hall and its workshops"; SIZE "one
larger establishment"; REPLACEMENT "replaced the smaller one"), and the members by district, each clickable. Members are
edited one by one like any building; the count is the dossier's range or the population's (item 108 (b)) and is not a
control; a map-side `setAttr` of the count is refused `dossier-owned` when the dossier set the range (§7.7 item 11), with
"Show me why" on its card. A record of one member reads "{kind} — 1 workshop" and offers no "Select all".

### 4.8 Knowledge in the editor — "View as"

The view bar's **View as** menu (owner and editor roles) chooses what this view **shows**: "Everything" (the role's
tier), "What locals know" (`local`), "What anyone knows" (`public`). It is a display filter, not the view's knowledge key
(J-V9.46): it sets `ViewOpts.viewAs` (item 464), which §9.2's admission reads for this view's tiles and labels,
admitting only what both the key and `viewAs` admit. **Every other read for the view** — the panels, the gazetteer, the
why card, the Link card, the People panel, the family tree, "Where is", T6's alternatives and the clerk's reads for
this drawer — passes the view's effective key (V09 §2.10's `effectiveKey()`) as `admitAs` on its band-less `query`
(item 572; V09 §2.7), and the export dialog's default knowledge is that same key (item 453). The per-viewer `knowledge`
key stays the role's (§11.3), so compaction, ctrl / cmd+S and "Download all my towns" — which need tier `secret`
(§11.1) — keep working while the owner views the town as a player. It only lowers (a client never raises its tier above
its role's, J-A30.82): an entry at or above the role's tier is the role's view and "Everything" is then the only entry
drawn enabled; a tier keeps the key's places list, and while it is lowered a banner "Viewing as: what anyone knows"
(`info.viewAs`) stays up and "Show hidden caves and ruins" is hidden. The export dialog shows what it will write and can
lower it further for that export (item 453).

**A host's players' view** (J-V9.85). A host may set `viewAs` to a key form — a tier with the places the party has
learned. V08's "See what the players see" (V08 §3.14 (5), `seePlayersView`) is that: the embed's bridge handler
(V08 §3.1) applies the resolved party key to the frame's view by `setViewOpts(view, { viewAs: { tier, places } })` and
clears it with `viewAs: undefined`, with no view-state write, so the frame's knowledge key and its document formats stay
the role's. While a host's form is set, the View as menu reads **"What the players know"** — a fourth entry, shown only
then and selected — with its other entries disabled under the line `info.viewAs.host`; the View as banner is not drawn,
because the host's strip "Showing what the players see" (`HostSlots.banner`, V08 §5.1) stands for it; and
`effectiveKey()` returns the form by V09 §2.10's rule, so the panels, the why card, the Link card, the gazetteer, the
drawer and the export default all read as the players would.

### 4.9 The words — the message catalogue's rows (English, our own)

Every line a user reads for a bend, a refusal, a fate, an error, a share condition or a hint is a row of
`messages/en.json` (V09 §2.9). The rules for writing one: one sentence, at most 25 words; say what happened and what to
do; name the thing by its name, never by an id; never "error", "invalid", "conflict" or a code in the text; offer the
action as a button when there is one; the bend tone is gentle ("follows", "kept"), never apologetic. **Bend before
refusing** (item 101 R2; J-V9.44): §7.1's dry-run outcome table decides each cause — refused only for a dossier fact or a
lock, otherwise bent, with the nearest lawful alternative pre-selected and the others one click away — and every key
below maps one to one to a row of that table. The other `refuse.*` rows are availability gates, not outcomes of a lawful
declaration: an assignment, a dependent later change, the viewer role, a staged layer, the rung, the screen, the
working layer. Every stack, island, retaining-wall, aqueduct and raised-way case is a bend (`bend.*`), never a refusal.
**Every** refusal row carries at least one button, at the least **Show me why** (the why card of the blocking thing, or
the help page of the limit — the target chosen by V10 §3.5 step 3's *The why target*, one rule for this button and the
clerk's `why` action; J-V9.120) — and the rule is data: every `refuse.*` row's `buttons` end with `button.showWhy`
(T-V9-15). **The button column** is each row's `buttons` list (V09 §2.9's `MsgButton`), in order, separated by " · ":
each button its `button.*` key, then its class and the data the class needs — `commit(…)` with its source (a
`ConflictAction` kind; `alternatives` with its list form `each`; `unplaced`; or `event:<form>`, a row of *The event
forms* below), `why` (with `page` where the row names one), `show(…)` with its `arg`, `tool(<tool>/<mode>)` with
`subject: <argument>` where it acts on the row's thing, `drop`, `app(…)` with its command and argument — and a `when` in
brackets (`[owner]`, `[names]`). A name in backticks after `show`, `subject` or `app` is the `MsgRef` argument it reads.
The words are *The `button.*` rows* after the table. The shipped rows:

| key | text (placeholders in braces) | buttons — the row's `MsgButton` list | engine codes it renders |
|---|---|---|---|
| `bend.wall.ridge` | "The wall follows the ridge, {m} m off your line." | — | `PreviewResult.bent` (S5a's trace) |
| `bend.wall.reach` | "The wall reaches the {barrier}; the ground between becomes gardens." | — | item 106 (b) |
| `bend.wall.waterfront` | "Kept the harbour open with {n} sea gates." | — | item 106 (d) |
| `bend.wall.open` | "Open ground needs a wall; kept a light wall here." | — | item 106 (c) (V09 §4.7) |
| `bend.road.route` | "The road goes round the {obstacle}; it is {m} m longer than a straight line." | — | S4's router (§4.3) |
| `bend.road.bridge` | "The road crosses the {water} on a new bridge." | — | §7.1's drawn-bridge rule |
| `bend.quarter.snap` | "The quarter's edge follows the streets; it never cuts through a block." | — | §7.1's quarter snap |
| `bend.quarter.size` | "This {kind} quarter holds at most {n} plots here; it stops at {edge}." | — | the kind's size band |
| `bend.place.site` | "{name} fits best {m} m away: {reason}." | `button.putHereAnyway` commit(`event:exactSite`) | S10b's site choice |
| `bend.lake.level` | "The water fills the hollow to {level} m; above that it would spill." | — | S1's basin fill (a lake and an oasis alike) |
| `bend.river.course` | "The river runs downhill, so it reaches {mouth} this way." | — | S1's water operator |
| `bend.harbour.size` | "The shore allows a basin of {size} m² here." | — | §4.8's harbour rules |
| `bend.roster.line` | "{name} went {where} instead: {reason}." | `button.show` show(`name`) | the roster's solve |
| `bend.fill.band` | "This quarter's wealth sets its building sizes; used the nearest mix it allows." | — | the band's rows (§4.7) |
| `refuse.dossierOwned` | "SettlementForge sets this. Change it there, or show a different name on this map." | `button.otherName` tool(`name`/`rename`, subject: `thing`) [names] · `button.showWhy` why | F-EDIT `dossier-owned` (a dossier-made oasis's delete among them, DR40) |
| `refuse.dossierRemove` | "SettlementForge keeps {thing} in this town. You can move it, or mark this spot as not for it." | `button.moveIt` show(`thing`) — selected with its handles; dragging moves it (V09 §4.6) · `button.notHere` commit(`event:notHere`) · `button.showWhy` why | F-EDIT (§7.7 item 2's list); `rejectSite`, `placeAt` offered |
| `refuse.roster.dossier` | "SettlementForge's record decides this town's places. Place one of them here, or put {thing} on a plot {locus}." — `{thing}` the line's name, or the class's display label when the name is `''`; `{locus}` the line's locus worded by V09 §4.16 (6) ("near the North Gate"), or for a line with none the settlement's name after `in`'s connective ("in Oakford") (J-V9.100) | `button.placeElement` commit(`unplaced`) — V09 §4.16 (5)'s picker · `button.putAt` commit(`event:firstFreeSite`) (not drawn when no `sites` candidate is free of hard fails) · `button.showWhy` why | F-EDIT `dossier-owned` on a `roster` line naming no element — T6's one line, any line of T7's list, or the clerk's (§7.1's roster rule) |
| `refuse.locked` | "{thing} is locked. Unlock it to change it." | `button.unlock` commit(`unlock`) · `button.showWhy` why | `E_LOCKED`; `ConflictAction` `unlock` |
| `refuse.assigned` | "{thing} is assigned. Remove the assignment to change it." | `button.unassign` commit(`unassign`) · `button.showWhy` why | `ConflictAction` `unassign` |
| `refuse.assignment.noSite` | "No plot here suits {thing} as it is assigned. The closest places are marked." — the marked places are the refusal's `moveTo` actions | `button.putAt` commit(`moveTo`) — the same declaration at the first `moveTo` target, previewed: an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` (J-V9.111) · `button.showWhy` why | F-EDIT (§5.2; item 582): an assignment, or the re-placement a `rejectSite` causes (§7.7), that no plot satisfies inside the hard rows |
| `bend.place.noSite` | "{thing} needs {reason}; it went to {site}, the closest place that has it." | `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (item 582; no plot here in the hard rows); `PreviewResult.alternatives` for the other acceptable sites (item 463) |
| `bend.place.overBudget` | "Putting {thing} there would move {n} other places; it went to {site}, which moves {k}." | `button.overBudget` commit(`event:exactSite`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (item 582; the disruption budget) |
| `bend.vacate` | "This pulls down {building}; its {n} households move to {where}." | `button.keepBuilding` drop (withdraws the edit) | the dry run's bend (item 582; item 31's demolition as a fate, item 17's relocation) |
| `bend.room.minArea` | "The {room} stays at {m2} m², the smallest {a role} can be." | `button.roleInstead` commit(`event:roomRole`) · `button.showWhy` why | F-EDIT (plan minimum), bent to the smallest lawful split (V03 §4.2) |
| `bend.room.noDoor` | "Moved the wall so every household keeps its own door." | `button.showWhy` why | F-EDIT (item 28 (f)), bent to the nearest wall position that keeps each unit's door |
| `bend.capacity` | "This building holds at most {max} households; set to {max}." | `button.showWhy` why (J-V9.123) | F-EDIT (`relet` above capacity), clamped |
| `bend.passage` | "A passage needs two storeys above it; it goes under the two-storey part of {building}." | `button.showWhy` why | F-EDIT (`Passage.headroomCm`), moved to the nearest lawful run |
| `refuse.warp` | "That push would move {thing} off its ground. Unlock it or push more gently." | `button.unlock` commit(`unlock`) · `button.showWhy` why | F-EDIT (a warp carrying a locked record) |
| `refuse.water` | "The new water would reach {thing}, which is kept. Unlock it or move the water." | `button.unlock` commit(`unlock`) · `button.showWhy` why | F-EDIT (§7.3 (b) 3: new water through a locked record, a locked oasis's mask included) |
| `bend.carve` | "The river takes the deepest course the ground allows, {m} m at most." | `button.showWhy` why | F-EDIT (`carveMaxCm`), bent to the deepest lawful course |
| `refuse.kept` | "That would cut through {thing} made earlier. Re-derive the town from {stage} instead?" | `button.rederive` commit(`event:rederive`) · `button.showWhy` why | `E_KEPT`, `E_LEVEL` (§7.1's one resolution) |
| `bend.invalid` | "{field} can't be {value}; set to {nearest}, the nearest it allows." | `button.showWhy` why | `ConflictAction` `invalid`, clamped to the nearest lawful value |
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
| `error.exportFailed` | "The export stopped: {reason}. Nothing was saved. Try again?" | `button.tryAgain` app(`retry`) | an exporter's error |
| `error.openRefused` | "This file can't be opened: {reason}." | — | `open` / `generate` errors |
| `info.upgrade.offer` | "Made with {version}; it opens as it was made, and updating it to {current} adds what's new." | `button.seeChanges` app(`seeUpgrade`) · `button.notNow` drop | §2.9 *Load* step 3, §7.5 (V09 §3.14 (a); standalone only) |
| `error.frozen` | "Made with {version}, shown read-only and not checked by this version; edit it with this version, or replay it exactly with the command below." | `button.editWithVersion` app(`editWithVersion`) [owner] · `button.copyCommand` app(`copyCommand`) | §2.9 *Load* step 2 (V09 §3.14 (b)) |
| `error.frozen.damaged` | "Part of this saved copy is damaged, so it can't be edited here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's damage: a chunk missing its content hash, or the records root differing at the rebase |
| `error.frozen.pack` | "This town needs the setting pack {pack}, which can't be added here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's missing pack; §7.5's 2 MB cap at the `frozenImport` rebase |
| `error.frozen.noModel` | "Made with {version}, and this file keeps only its recipe and changes; open them with this version, or replay it exactly with the command below." | `button.openRecipe` app(`openRecipe`) · `button.copyCommand` app(`copyCommand`) | §2.9 step 2's document without `model` (V09 §3.14 (c)) |
| `error.mismatch` | "This saved town differs from what its recipe rebuilds ({n} differences). Keep the saved town, or use the rebuilt one?" | `button.keepSaved` app(`keepSaved`) · `button.useRebuilt` app(`useRebuilt`) | §2.9 *Load* step 4 |
| `error.recoveryPartial` | "Recovered your town up to {time}. {n} later changes could not be replayed." | `button.downloadThem` app(`downloadUnreplayed`) | V09 §3.8 |
| `error.linkVersion` | "Made with {old}, shown with {new}; small differences are expected." | — | §6.4 |
| `info.newerApp` | "This town was last changed by a newer version of the editor; it opens read-only here." | `button.download` app(`download`) | `LocalDocRecord.appVersion` newer than the running application (V09 §3.1 (3) (c); J-V9.126) |
| `empty.list` | "Nothing here yet." | — | an empty list: the history panel, a report's moved entries, a thematic view whose provider holds no data (V09 §3.16 (e)) |
| `info.reroll.nothing` | "Everything here is yours or held; nothing to vary." | — | a New random scope with nothing derived (V09 §3.6) |
| `info.restore.full` | "This town keeps 200 named points; delete one to mark another." | — | the 200th named restore point (V09 §2.8, V09 §3.9) |
| `success.applied` | "{change}." | `button.undo` app(`undo`) | every commit |
| `success.saved` | "Saved {file} ({size})." | — (J-V9.123) | V09 §3.10 |
| `success.restored` | "Went back to {name}." | `button.undoGoingBack` app(`undoGoingBack`) | V09 §3.9 |
| `success.deleted` | "Moved {town} to Recently deleted. It stays there for 30 days." | `button.undo` app(`restoreTown`) · `button.show` app(`showDeleted`) | V09 §5.12 |
| `bend.under.accessDug` | "Dug a way down from {building} so people can live there." | `button.useAnotherBuilding` commit(`alternatives`, each `button.digDownFrom`) — on the canvas the stepping button, while the dry run's `alternatives` holds a building not yet tried (V09 §4.17.4); the list form where a card shows every alternative at once (V10 §3.16), `{building}` read at the card's reader's key (J-V9.86, J-V9.118) · `button.showWayIn` show(`created:access`) | V09 §4.17.4 (item 372) |
| `bend.under.accessOpening` | "Opened a way down at {place} so people can live there." | `button.showWayIn` show(`created:access`) · `button.showWhy` why (steps 2 and 3 run only when no building qualifies, so no building is offered) | V09 §4.17.4 |
| `bend.under.noAccess` | "Nobody can reach this cave yet, so the homes stand above it." | `button.addWayDown` tool(`place`/`access`) — T6's Below access mode on a chosen spot · `button.showWhy` why | V09 §4.17.4 (4): the dry run's bend onto ground part 0 |
| `bend.catacomb.church` | "Churches keep crypts; catacombs lie under cemeteries. This is {church}'s crypt." | `button.startCatacomb` commit(`event:catacombUnder`) · `button.showCrypt` show(`crypt`) | V09 §4.17.5 (a) |
| `bend.catacomb.join` | "{town} may have {count} catacombs; this joins the Catacombs of {name}." | `button.showWhy` why | V09 §4.17.5 (b) |
| `bend.catacomb.charnel` | "{town} may have {count} catacombs; {ground} keeps a charnel vault instead." | `button.joinCatacombs` commit(`event:joinCatacomb`) | V09 §4.17.5 (b) |
| `bend.catacomb.belowTown` | "Catacombs come with towns; {ground} keeps a charnel vault." | `button.showWhy` why | V09 §4.17.5 (c) |
| `bend.catacomb.noGround` | "Catacombs lie under cemeteries; this is a vault." | `button.startItUnder` commit(`event:catacombUnder`) | V09 §4.17.5 (d) |
| `bend.crypt.cathedral` | "A cathedral always keeps its crypt, the largest in {town}." | `button.cryptSmallest` commit(`event:cryptSmallest`) | V03 §3.7.4's crypt-edit dry run (V09 §4.17.5 (e)) |
| `bend.crypt.largest` | "The cathedral keeps the largest crypt; this one stops at {share} of the cathedral's." | `button.cryptEnlarge` commit(`event:cryptEnlarge`) | V03 §3.7.4's rank cap, `crypt.rankShare` × the principal's area (V09 §4.17.5 (e)) |
| `bend.ruin.axis` | "The old walls run on the ruin's own lines; your room turned {deg}° to follow them." | — | V04 §4.1's ruin chamber |
| `info.catacomb.blocked.<cause>` | this volume's words, one per `blockedBy` value — V09 §4.17.5's "Over time" lines (`reach`, `wet`, `system`, `foundation`, `wallStrip`, `depth`; `rank` is V10 §3.9a's rank line) | — | `CatacombComplex.blockedBy` |
| `fate.catacomb.removed` | "The catacomb gives up {m2} m²; it will not dig here again." | `button.undo` app(`undo`) | a `delete` of catacomb galleries (J-V4.56) |
| `fate.access.lastWay` | "This was the last way into {place}; {n} households there leave and it is remembered only as once known." | `button.keepWayOpen` drop (withdraws the edit) | a `bricked`, `delete` or `seal` of a cluster's last access (V04 §4.3) — the cluster turns `lost` (V04 §3.5.7 (g)) |
| `info.under.cause.<rule>` | this volume's words, one per `AccessCause.rule` — V09 §4.17.3's table | — | an access point's `underground` row |
| `info.under.lost` | "Once known; no open way leads here since year {year}." — `{year}` the year of the closing link's or access's `Lifecycle.since`; with no such record, "Once known; no open way leads here now." | `button.addWayDown` tool(`place`/`access`) [owner] · `button.showWhy` why | a cluster whose excavation reading is `lost` (V04 §2.2, V04 §3.5.7 (g); item 113 (e)) |
| `why.section.<kind>` | a why section's title, one per section V10 §3.9 registers: `underground` "Below ground" · `crypt` "The crypt" · `raised` "Raised ways" · `massing` "Its shape" · `plan` "Inside" · `fabric` "The streets around it" · `island` "Shade from above" · `move` "Over time" | — | `WhyCardModel.sections[].title` (V09 §2.7) |
| `clerk.key.unchecked` | "Saved. The key will be checked when you are back online." | — | `setKey` returning `unchecked` (V09 §4.11) |
| `clerk.host.mark` | "{host}'s assistant (AI)" | — | a host proposal's card (V09 §4.11) |
| `clerk.defect.<kind>` | `previewMismatch` "The assistant's preview and the map's differed." · `badRequest` "The AI service turned down a request." · `placeholder` "A step of a proposal no longer matched the map." · `creationDigest` "A new town came out differently from its preview." | — | V10 §2.8's `DefectRecord.kind` (V09 §5.12) |
| `clerk.defects.none` | "No problems recorded." | — | an empty defect store (V09 §5.12) |
| `clerk.key.missing` | "The assistant needs your own key for the AI service." | `button.enterKey` app(`enterKey`) · `button.notNow` drop | the drawer's first opening where the deployment's configuration enables the built-in clerk with a user key (V09 §4.11; never in the SettlementForge module) |
| `clerk.cap.warn` | "The assistant has used {share} of this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | V10 §3.18 |
| `clerk.cap.reached` | "The assistant has reached this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | the meter's foot line only (V09 §4.11; V10 §3.18); the drawer's refusal card at the cap is `refuse.clerk.budget` (V10 §3.16) |
| `info.viewAs` | "Viewing as: {tier}." | `button.showEverything` app(`viewAsOff`) | V09 §4.8 |
| `info.viewAs.host` | "Turn off “See what the players see” to choose another view." | — | V09 §4.8 (the View as menu while a host's players' view is set) |
| `info.copy.saved` | "Saved a copy to your computer as {file}; it does not follow {host}." | — | V09 §3.9's host-mode rule under `newDocuments: 'download'` |
| `info.copy.rerunEdits` | "{n} later hand edits were not carried; they stay in this map." | — | the same, after a re-run (V09 §3.9) |
| `clerk.newMap.line` | "Describe the new town — this one stays as it is" | — | the drawer's Start a new map from this (V09 §4.11) |
| `history.group.party` | "The party" | — | the history panel's host group (V09 §4.10) |
| `history.dossierFacts.creation` | "Made from SettlementForge's record" | — | the history panel's creation head (V09 §4.10) |
| `report.moved.<kind>` | one per `ReportEntry.kind` (§5.4): `place` "{element} now stands on {site}." · `reject` "{site} is marked as not for {element}; it stands elsewhere." · `lapse` "The mark keeping {element} off {site} has lapsed." · `open` "{use} opened on {to}." · `close` "{use} closed on {from}." · `relocate` "{use} moved from {from} to {to}." · `mutate` "{plot} was rebuilt for this change." · `disruption` "This change moved a few places nearby." · `disruption.over` "This change moved more places than its limit." · `rename` "{from} is now called {to}." · `works.start` "Work began on {works}." · `works.cancel` "Work on {works} stopped." · `works.finish` "Work on {works} is finished." | `button.show` show(`entry`) — the entry's element, use, plot or works | `ReportEntry.kind`, `disruption.overBudget`, `works.op` — the report panel's "What moved" and the history's report-entry lines (V09 §5.7, V09 §4.10; J-V9.109) |
| `report.dossier.<state>` | one per `GenerationReport.dossier` state (§5.4): `placed` "{element} stands on {site}." · `rejectedSite` "{site} is marked as not for {element}." · `blocked` "{element} can't stand on {site}; the closest places that suit it are marked." | `button.show` show(`entry`) — the element; for `blocked`, its `closest` sites marked | `GenerationReport.dossier[].state` (V09 §5.7; J-V9.109) |
| `report.past.<line>` | one per line of a replayed past (V09 §4.21.3): `peak` "Once {a sizeWord}, about {population} people, in year {year}." · `peak.symbolic` "Once {a tierWord}; its exact size is not recorded." · `refounded` "Destroyed in year {year} ({cause}) and built again on its ruins." · `buried` "The old town's streets lie buried under {district}." · `epochs` "Its past was played in {n} steps of {years} years." | `button.show` show(`entry`) — the walls, ruins or buried system the line names | `HistoryRecord` (§2.7): `peak` with `symbolic`, `refounded`, `buried`, `epochs` |
| `chip.symbolic` | "a size the record does not give" | — | a fact whose provenance is `symbolic` (§2.8; V09 §2.7's `facts`) |
| `bend.retaining.moved` | "The wall follows the step in the ground, {m} m off your line." | `button.keepMyLine` commit(`event:retainingFlat`) | V09 §4.20.1 (3) (a) |
| `bend.retaining.flat` | "The ground is flat here, so a terrace {h} m high goes on the {side}, with this wall on its edge." | `button.otherSide` commit(`event:retainingOtherSide`) | V09 §4.20.1 (3) (b) |
| `info.crossing.stair` · `info.crossing.ramp` | "{way} climbs the terrace by a stair." · "{way} climbs the terrace by a ramp." | `button.showWhy` why | the dry run's crossing form (item 110 (a)) |
| `bend.crossing.steep` | "Too steep for a ramp on {a class}; the stair stays." | `button.longerRamp` commit(`event:rampLonger`) | item 364 |
| `bend.raised.clearance` | "The deck stays {m} m above {way} so carts can pass under." | — | item 364 (the clearance bent up) |
| `bend.raised.end` | "A raised way comes down to the ground; its end moved {m} m to {place}." | — | V09 §4.20.2 (2) |
| `bend.raised.wall` | "The raised road comes down before the {wall} and passes through its gate." | `button.showWhy` why | item 363 |
| `bend.wall.aqueductArch` | "The wall lets the aqueduct through by an arch." | — | item 363 |
| `bend.aqueduct.source` | "Water runs downhill, so the aqueduct starts at {source}, {m} m higher." | `button.showWhy` why | V09 §4.20.2 (5) |
| `bend.aqueduct.terminal` | "Added a fountain where the aqueduct ends, on {place}." | — | V09 §4.20.2 (5) |
| `bend.aqueduct.uphill` | "No spring or river lies high enough within {km} km to feed {terminal}, so it has a well instead." | `button.showWhy` why | the dry run's bend to a well pin at the terminal (J-VI.4 (h); V09 §4.20.2 (5)) |
| the island and sky-access bends: `bend.island.count`, `.rung`, `.move`, `.altitude`, `.floor`, `.rimStop`, `.fallen`; `bend.access.kind`, `.deck`, `.rimFull`, `.last`; `bend.raised.island`, `bend.aqueduct.island`, `bend.raised.onIsland`, `bend.aqueduct.onIsland`, `bend.raised.hoist`, `bend.retaining.rim`, `bend.wall.rim` | V05 §4.2's bend table, each line written once there and loaded from it | `bend.raised.island`: `button.roadToFoot` commit(`event:roadToFoot`) · `button.showWhy` why; `bend.island.rung`: `button.cityUp` commit(`event:cityUp`); `bend.island.fallen`, `bend.access.last`: `button.showWhy` why; every other: `button.showWhy` why | V05 §4.2's events (J-VI.4 (d), (e), (f), (g); V09 §4.20.2 (6), V09 §4.20.9) |
| `bend.time.hoodAlone` | "A neighbourhood alone has no history yet — open it in its town to advance time." | `button.showWhy` why | `advance` and a skeleton's `history` block on a standalone neighbourhood document (V06 §4.1, J-V6.102; V10's bend category) |
| `bend.deck.full` | "The {deck} has no free plot there; placed it on {plot}." | `button.showWhy` why | V09 §4.20.4 (1) |
| `bend.deck.class` | "There is no room for {a class} on the {deck}; placed it at the {deck}'s landward end." | `button.showWhy` why | volume 11's `deckOk`; V02 §3.16 (6)'s landward plot (V09 §4.20.4 (2)) |
| the massing, stack and deck bends of V02 §1b (V02 §4.2, V02 §4.3, V02 §4.6) | `bend.tiers.stepped` "Made {building} a stepped building first." · `bend.tiers.count` "Only {n} tiers fit on this base; made {n}." · `bend.tiers.step` "A step that wide leaves no second tier; used {m} m, the widest that fits." · `bend.tiers.axial` "This {shape} stack takes its stairs straight up the front." · `bend.tiers.none` "The lowest tier is solid, so no stair goes inside; the tiers are sealed." · `bend.tiers.internal` "Removed the stairs; the tiers are now reached from inside." · `bend.tiers.form` "Those stairs need {m} m in front of the base; kept the stairs it has." · `bend.tiers.top` "The shrine no longer fits; the top is flat." · `bend.tier.height` "The stair up this tier needs room on the terrace below." · `bend.stack.groundWing` "A stepped building carries nothing on its tiers; the {wing} stands on the ground beside it." · `bend.stack.roof` "A tier of this stack takes {a roof}; used it." · `bend.stack.base` "Raised the tier below by {m} m instead." · `bend.deck.single` "The {deck} carries small, light buildings; kept {building} in one block." · `bend.deck.floors` "The {deck} carries at most {n} storeys." · `bend.deck.basement` "A deck over water has no cellar; it went to {building}, the nearest on land." · `bend.building.remove` "Removed the building with its last wing." · `bend.row.plotLine` "Moved the plot line with {neighbour}; both houses are re-fitted." · `bend.wing.grow` "A wing needs at least {m2} m²; made it that size." · `bend.wing.clip` "The wing stops at the plot's edge; join the plot next door for more room." · `bend.wing.trim` "The two ranges now meet at a straight joint." · `bend.tower.move` "The tower stands {m} m out, clear of the wing." · `bend.family.nearest` "{building} needs {m2} m² of plot for that shape; made it {a family} instead." · `bend.dormers.count` "This roof has room for {n} dormers; made {n}." · `bend.porch.kind` "There is room only for {a porch} here; used it." · `bend.room.passage` "No gate range here, so the gate is a passage through the front wing." · `bend.room.host` "The {room} went to {wing}, the largest wing that can hold it." · `bend.room.extent` "The {room} reaches as far as its wing allows, {m} m." | `bend.tiers.none`: `button.stairsFront` commit(`event:stairsAxial`) · `button.stairsFaces` commit(`event:stairsFlights`); `bend.tiers.internal`: `button.changeStairs` tool(`shape`/`tiers`, subject: `building`); `bend.tiers.form`: `button.stairsInside` commit(`event:stairsInternal`); `bend.stack.groundWing`: `button.changeShape` tool(`shape`/`massing`, subject: `building`); `bend.deck.single`: `button.plotsOnLand` show(`alternatives`); `bend.family.nearest`, `bend.wing.clip`: `button.joinPlot` tool(`shape`/`plot`); every other: — | V02 §1b's bend ids, each emitted by V02's dry run (V02 owns the ids; T-V9-15's walker over V02 §1b) |
| `info.remove.holds` | "The town won't {rebuild \| raise} this {kind}; undo brings it back." — for a deck plot "No house will be built on this spot of the {deck}; undo brings it back." | `button.undo` app(`undo`) | the suppression (§2.8, item 260; V06 §2.13): a raised way, harbour-mouth chain, quay wall, retaining wall, deck plot; V05's removed islands and accesses; an oasis's delete held by carry-over (§7.4's oasis row) — every delete dry-run line of these kinds, V06's and V05's included (V09 §4.20.3) |
| `info.raised.count` | "{n} raised ways in {town}; the rules build up to {cap} by themselves." | — | V06's ledger (V09 §4.20.2 (8)) |
| `info.raised.walk` | "A walked way follows the ground." | — | V07's walk mode (V09 §4.20.2 (10)) |
| `disabled.onlyBelow` | "Tunnels are dug below the ground." | `button.switch` app(`switchLayer`, `layer` — the Below layer) | V09 §4.2 |
| `disabled.skyWater` | "An island's water is its own." | — | T2's Oasis chip on the Sky layer (V09 §4.2; item 111) |
| `effect.added` | "The city raises {a kind}: {reason}." (and "{thing} is added" for other kinds) | `button.show` show(`targets`) | item 465 `added` |
| `effect.route.detour` | "{route} now goes round by {way}, {m} m longer." | `button.show` show(`targets`) | `rerouted` |
| `effect.way.joined` | "{way} now meets {way2} at a crossing." | `button.show` show(`targets`) | `joined` |
| `effect.water.lost` | "{terminal} loses its water." | `button.show` show(`targets`) | `lost` (an aqueduct's terminal, or what an oasis's spring fed) |
| `effect.vault.removed` | "The arch vault under {way} goes, with what is in it." | `button.show` show(`targets`) | `removed` (V04 §3.5.4 (d)) |
| `effect.plan.lost` | "{building}'s drawn plan goes with it." | `button.show` show(`targets`) | `removed` (V03 §3.11) |
| `effect.deck.ruined` | "{n} buildings on the {deck} fall with it." | `button.show` show(`targets`) | `removed` (item 110 (d)) |
| `effect.households.displaced` | "{n} households move to make room for {thing}." | `button.show` show(`targets`) | `displaced` |
| `effect.walls.rebuilt` | "{n} retaining walls are laid again along the new edge." | `button.show` show(`targets`) | `rebuilt` |
| `effect.stairs.relaid` | "The stairs of {building} are laid again." | `button.show` show(`targets`) | `rebuilt` (V02 §4.6 (2)) |
| `effect.raised.goes` | "{name}, {a kind}, goes: a town builds none by itself." | `button.keepAsYours` commit(`event:keepRaised`) | `removed` on a Re-derive to TOWN (V09 §4.20.3 (7)) |
| `effect.moved` | "{thing} moves {m} m." | `button.show` show(`targets`) | `moved` |
| `effect.more` | "and {n} other changes" | `button.show` app(`showEffects`) | `effectsMore` |
| `offer.raised.standing` | "The {n} raised ways standing stay; remove them too?" | `button.removeToo` commit(`event:removeStanding`) | V09 §4.14 |
| `import.removed` | "The rules would have built {kind} here; it stays removed." | `button.show` show(`slot`) | item 455 |
| `import.nothingToRemove` | "{kind} was removed in the original; the rules did not build it here." | — | item 455 |
| `label.cvd.<variant>` | `none` "Usual colours" · `protan` "Red-weak" · `deutan` "Green-weak" · `tritan` "Blue-weak"; the selector's title "Colour vision" | — | the view key `cvdVariant` (§8.2; V09 §5.12) |
| `history.label.<option>` | T1's History chip: `none` "No past" · `once` "Once {a sizeWord}" · `age` "Founded about {n} years ago" | — | the blueprint's `history` (§4.2 S0; V09 §4.21.2) |

**The `button.*` rows** (one per wording, shared by every row that offers it; tone `info`; J-V9.121):
`button.putHereAnyway` "Put it here anyway" · `button.show` "Show" · `button.otherName` "Show a different name" ·
`button.otherNameHere` "Show a different name on this map" · `button.moveIt` "Move it" · `button.notHere` "Not here" ·
`button.placeElement` "Place {element} here" · `button.putAt` "Put it at {site}" · `button.unlock` "Unlock" ·
`button.unassign` "Remove the assignment" · `button.showWhy` "Show me why" · `button.chooseMarked` "Choose another of the
marked places" · `button.overBudget` "Put it there anyway ({n} moves)" · `button.keepBuilding` "Keep {building}" ·
`button.roleInstead` "Make it {a role2} instead" · `button.rederive` "Re-derive from {stage}" · `button.newPreview` "Show
the new preview" · `button.cityUp` "Make this town a city" · `button.showThem` "Show them" · `button.goBackTo` "Go back to
{time}" · `button.openCopy` "Open a copy from here" · `button.pictureInstead` "Save a picture instead" ·
`button.shareDevice` "Share it to another device" · `button.switch` "Switch" · `button.downloadFile` "Download file" ·
`button.reattach` "Re-attach" · `button.download` "Download" · `button.reload` "Reload" · `button.tryAgain` "Try again" ·
`button.seeChanges` "See what changes" · `button.notNow` "Not now" · `button.editWithVersion` "Edit it with this version"
· `button.copyCommand` "Copy the command" · `button.openRecipe` "Open its recipe with this version" · `button.keepSaved`
"Keep saved" · `button.useRebuilt` "Use rebuilt" · `button.downloadThem` "Download them" · `button.undo` "Undo" ·
`button.undoGoingBack` "Undo going back" · `button.useAnotherBuilding` "Use another building" · `button.digDownFrom` "Dig
down from {building} instead" · `button.showWayIn` "Show the way in" · `button.addWayDown` "Add a way down" ·
`button.startCatacomb` "Start a catacomb under {ground}" · `button.showCrypt` "Show the crypt" · `button.joinCatacombs`
"Join it to the Catacombs of {name}" · `button.startItUnder` "Start it under {ground}" · `button.cryptSmallest` "Make it as
small as allowed ({m2} m²)" · `button.cryptEnlarge` "Enlarge the cathedral's crypt too" · `button.showCemetery` "Show the
cemetery" · `button.keepWayOpen` "Keep a way open" · `button.enterKey` "Enter a key" · `button.changeLimit` "Change the
limit" · `button.showEverything` "Show everything" · `button.keepMyLine` "Keep my line" · `button.otherSide` "Use the other
side" · `button.longerRamp` "Make the ramp longer" · `button.roadToFoot` "Draw a road to its foot" · `button.stairsFront`
"Stairs along the front" · `button.stairsFaces` "Stairs up the faces" · `button.stairsInside` "Put the stairs inside" · `button.changeStairs` "Change the stairs" ·
`button.changeShape` "Change the building's shape" · `button.plotsOnLand` "Show plots on land" · `button.joinPlot` "Join
the plot next door" · `button.keepAsYours` "Keep it as yours" · `button.removeToo` "Remove them too". A `ConflictAction`'s
`msg` (item 463) is keyed as the button that carries it: `unlock` → `button.unlock`, `unassign` → `button.unassign`,
`moveTo` → `button.putAt` (`{site}` its target's name). A slot a row's text does not fill is filled from the entry the
button carries (V09 §2.9's *Words*).

**The event forms** (`MsgButton.event`; a `commit` from `event` carries exactly these events, the canvas building them
from the draft and the row's `MsgRef`, and volume 10's `propose` the same bytes, T101-3; J-V9.121):

| form | the events it commits | its rule |
|---|---|---|
| `exactSite` | the draft re-mapped at the plot the user asked for, with "this plot only" (V10 §4.1's `where.plot`), its disruption taken as the preview lists it | item 582's exact site; V09 §4.5's T6 |
| `notHere` | `rejectSite` of the dossier-backed thing's site (T6's **Not here**) | V09 §4.3's T6 row; §7.2 |
| `firstFreeSite` | `placeAt { plot, designation }` on the first `SiteCandidate` with no `hardFails` of V09 §4.5's T6 `sites` query for the line's locus — nothing when none of the three is free | V09 §4.5's T6 row |
| `rederive` | the declaration with a Re-derive from `{stage}` — §7.1's one resolution of `E_KEPT` and `E_LEVEL` — previewed as V09 §3.3's whole-town ghost | §7.1; V09 §3.3 |
| `cityUp` | `adjust` of T1's size to small city (T1's size chips) | V09 §4.5's T1 row; §7.8 |
| `unassignCreation` | `unassign` of the assignment the creation event made | §7.4's target rule; V09 §3.9 |
| `roomRole` | the draft re-mapped with the room's role `{role2}` (the smallest lawful split) | V03 §4.2 |
| `stairsAxial` · `stairsFlights` · `stairsInternal` | `tiers { stairs: 'axial' }`, `{ stairs: 'flights' }`, `{ stairs: 'internal' }` on the row's `building` (the stair chip) — `stairsInternal` nothing where tier 0 has no storeys | V09 §4.20.5 (1); V02 §4.6 |
| `retainingFlat` | the drawn line's flat-ground form, a `terrace` whose edge carries the wall | V09 §4.20.1 (3) (b) |
| `retainingOtherSide` | the same form with the terrace on the other side of the line | V09 §4.20.1 (3) (b) |
| `rampLonger` | the crossing's ramp lengthened along the way to its class's grade — nothing where the way's run does not allow it | item 364 |
| `roadToFoot` | the same sky access plus a ground `drawWay` of the stroke's class from its first point to the access's foot, one group | V09 §4.20.2 (6) |
| `catacombUnder` | the drawn chamber moved to the centroid of `{ground}`'s burial face (nearest by distance, ties by address), where V09 §4.17.5's ladder places it | V09 §4.17.5 (a), (d) |
| `joinCatacomb` | a `drawTunnel` from the charnel vault to the nearest element of the Catacombs of `{name}` | V09 §4.17.5 (b) |
| `cryptSmallest` | the cathedral's crypt kept at its smallest lawful size, `{m2}` m² — the bent result, accepted in words | V03 §3.7.4; V09 §4.17.5 (e) |
| `cryptEnlarge` | the two-event group enlarging the cathedral's crypt, then this crypt | V03 §3.7.4; V09 §4.17.5 (e) |
| `keepRaised` | one declared `drawWay { raised: true, class, widthCm, points }` along `{name}`'s course, in the Re-derive's group (the **Keep them as yours** checkbox for that way) | V09 §4.20.3 (7) |
| `removeStanding` | each standing generated raised way removed as V09 §4.20.3 (2), in one group | V09 §4.14; V09 §4.20.3 (6) |

**The application commands** (`MsgButton.command`; `app` buttons run them and never edit by themselves; none sits on a
`bend.*` or `refuse.*` row a dry run answers, T-V9-15):

| command | what it runs | where |
|---|---|---|
| `download` | the document's `.plat` to the device (ctrl / cmd+S's command) | V09 §4.13; V09 §3.14 |
| `reload` | reloads the page | V09 §3.14 |
| `retry` | the failed export again with its options | V09 §3.10 |
| `seeUpgrade` | the upgrade's diff (§2.9 *Load* step 3, §7.5) | V09 §3.14 (a) |
| `editWithVersion` | the `frozenImport` rebase | V09 §3.14 (b) |
| `copyCommand` | the replay command to the clipboard | V09 §3.14 (b) |
| `openRecipe` | the recipe and its log opened with this version | V09 §3.14 (c) |
| `keepSaved` · `useRebuilt` | §2.9 *Load* step 4's choice | V09 §3.14 |
| `downloadUnreplayed` | the changes recovery could not replay, as a file | V09 §3.8 |
| `undo` | `undo(h)` of the group the line names | V09 §3.9 |
| `undoGoingBack` | the matching redo group of a Go back to here | V09 §3.9 |
| `restoreTown` · `showDeleted` | Recently deleted's **Restore** of that town; the list | V09 §5.12 |
| `goBack` · `openCopy` | **Go back to here** and **Open a copy from here** at `{time}`'s seq | V09 §3.9 |
| `exportPicture` | the export dialog on its Picture tab (PNG) | V09 §5.10 |
| `share` | the share sheet | V09 §5.11 |
| `switchLayer` | the working layer set to the row's `layer` | V09 §4.2 |
| `reattach` | the orphan's re-attach pick | V09 §4.10 |
| `enterKey` | the key card | V09 §4.11 |
| `openSettings` | Settings' Assistant section | V09 §5.12 |
| `viewAsOff` | View as cleared | V09 §4.8 |
| `showEffects` | the fates sheet's **What else changes**, paged | V09 §5.5 |

The tool hints are §14's table's texts, keyed `hint.<tool>`; this volume adds `hint.variations` ("Three versions: pick
one, or ask for three more."), `hint.restore` ("Every change is saved. Step back to any point here."), `hint.links` ("Lines
show who buys from whom. Click one to change it."), `hint.shade` ("Darker streets spend more of the day in shade."),
`hint.clerk` ("Ask for a walled harbour town with a temple quarter."), `hint.raised` ("A raised way crosses what is below
without meeting it; its ends come down by stairs or ramps.", the first time Raised is turned on), `hint.below` ("Click
again to pick what's underneath.", the first time a click lands on a stack of more than one mark) and `hint.oasis` ("Click
a hollow, then drag up to fill it from a spring.", the first time the Oasis chip is on), each recorded in
`AppPrefs.hintsDone`. Every `host.*` key volume 8 names is a row of the same file, its text volume 8's (V08 §4.2's
controls, dialogs and undo words, V08 §5.1's strips and banner rows, `host.locked`, the port's notes, V08 §4.6's history
lines — `HostSlots.historyLines`' texts, V09 §4.10 — and the draft mirror's discard notice, V08 §3.7).

**The explanation and assistant keys — one text each (J-V9.79).** The same file carries the key families volume 10
renders, so the drawer, the why card and the panels draw one sentence per key. Their `en` texts are written once, in the
volume 10 section named, and loaded into `messages/en.json` from there:

| family | one key per | its `en` text is written in |
|---|---|---|
| `critique.K1` – `critique.K18` | critique row | V10 §3.10's template column |
| `refuse.clerk.<category>` (with `refuse.clerk.key.<keyState>` for the `key` row's three sentences and `refuse.clerk.dossier.count` for the `dossier` row's count sentence) and `refuse.clerk.opsDevice` | one key per `RefusalCategory` value whose V10 §3.16 row words the refusal itself — every value but `lock`, `rule` and `role`, whose cards render the engine's `refuse.*` row for the code — `refuse.viewer` for `role`; `refuse.clerk.offline` is the one row for an unreachable clerk | V10 §3.16's table; V10 §2.10 |
| `clerk.notice` | — | V10 §3.20's data notice |
| `clerk.alt.*` | each key V10 §5.4's list of the drawer's keys names: each alternative of a V10 §3.16 row (`clerk.alt.<category>.<n>`, `<n>` its number in V10 §3.16's alternatives column, kept when an alternative is retired), the help route's tool button, the history buttons not worded by a `button.*` row (`.rerun`, `.rebuild`), a critique finding's fix and the stale card's **Ask again** (`clerk.alt.stale.retry`) — so every `ClerkAction` `label` that is not a `button.*` row's words has its key | V10 §3.16's alternatives column; for the other keys, the V10 sections V10 §5.4's list cites |
| `clerk.view.cleared` | — | V10 §3.12 (6)'s line when the view's key changes |
| `clerk.applied` | — | V10 §4.4's applied card line |
| `info.raised.<outcome>` | each of the `raised` section's ten outcomes (`built`, `declared`, `carried`, `belowCity`, `reasonNotMet`, `noCourse`, `chance`, `cap`, `suppressed`, `waited`) | V10 §3.9's outcome table (`info.raised.count` and `.walk` above are this volume's badge lines, not outcomes) |
| `info.under.*` | each `underground` row of V10 §3.9a — the ruin rows, `LinkCause`, the excavation reading, the dwellings line, `deep`, `sealed` | V10 §3.9a — except `info.under.cause.<rule>` and `info.under.lost`, whose words are this volume's (V09 §4.17.3) |
| `info.catacomb.*` | each value of `CatacombComplex.source.kind`, the rank and count lines, each state (`stagnant`, `stopped`, `overCount` among them), and each burial-face outcome of `catacombOutcome` (`holds`, `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`) | V10 §3.9a — except `info.catacomb.blocked.<cause>`, whose words are this volume's (V09 §4.17.5) |
| `info.crypt.*` | the `crypt` section's rows: presence, area and form (full, half, raised-choir, the rim vault), rank, the crypt join, no crypt (dry ground; wet ground with ledger slabs in the chancel floor, V03 §3.7.4) | V10 §3.9a's `crypt` table |
| `kind.<registry kind>` | each kind of `clerk.content.withheldWords` | V10 §2.10's `content.withheldWords` row |

The rows `info.catacomb.stagnant` (with **Show me why**), `info.catacomb.stopped` (with **Show the cemetery**,
show(`source`)) and `info.catacomb.overCount` (with **Show me why**) carry these buttons in `en.json`, their texts V10
§3.9a's. A shipped locale carries every key of every family (T-V9-15, T-V10-29); the panels of V09 §4.17 and
V09 §4.20.6 name each row by its key.

### 4.10 The history panel — every change in plain words, restore points, orphans

The history panel (V09 §5.6) lists `HistoryRow`s (V09 §2.8), newest first, grouped by day, with the time where the
journal has it. Each row's text comes from a template keyed by the event kind (and, for `setAttr` and `convert`, by the
path or the op, and for the variants by the discriminating field of V09 §2.12's `HistoryRow` row), filled from the event
and its touched set:

| event | template |
|---|---|
| `quarter` | "Painted the {kind} quarter {name} ({plots} plots)" |
| `drawBoundary` | "Reshaped the edge of {district}" |
| `placeAt`, `assign` | "Placed {name} ({class})" · "Asked for {name} {locus}" |
| `roster` | "Placed {n} places from a list" |
| `drawWay`, `drawWall`, `placeGate` | "Drew {a class} ({m} m)" · "Built a wall ({m} m, {gates} gates)" · "Added a gate to {wall}" |
| `drawWall.retaining` · `terrace` | "Built a retaining wall along {place} ({m} m, steps {a}–{b} m)" · "Levelled {area} m² at {level} m, with {n} retaining walls" |
| `drawWay.raised` · `drawWay.aqueduct` | "Raised {a kind} from {a} to {b} ({m} m, {n} arches)" · "Brought water from {source} to {terminal} ({m} m)" |
| `setAttr.spans/use` · `setAttr.crossings/form` · a raised way's `clearanceCm` or `spanSpacingCm` | "Walled up an arch of {way} as a vault" or "Opened an arch of {way}" · "{way} now crosses {wall} by {a stair \| a ramp}" · "Changed the deck height of {way}" · "Changed the arch spacing of {way}" |
| `setMassing.tiers` | "Gave {building} {n} tiers" (the count); "Changed the tiers of {building}" (the step, the stairs or the top) |
| `delete` of generated content that suppresses, or of an oasis (V09 §4.20.3) | "Removed the {kind} {name}; the town won't {rebuild \| raise} it" |
| `setField` | "Raised the ground near {place}" (lower, cliff, flatten) · "Made {place} denser" (greener, richer, poorer) |
| `warp`, `drawWater`, `drawWater.spring`, `moveCourseKnot` | "Warped the streets near {place}" · "Made a lake" · "Made an oasis at {place}" · "Drew the river {name}" · "Moved the course of {river}" |
| `adjust.blueprint.history` | "Gave {town} a past: once {a sizeWord}" · "Took away {town}'s past" |
| the history replay's epochs (the creation prefix, §4.11) | one head row "Played {town}'s past in {n} steps from year {year}" (`history.replay`), its epochs under it by V06's chronicle lines; not undoable ("This is where the town began") |
| `fill` | "Filled {scope} with {arrangement}" |
| `split`, `join`, `merge`, `moveFootprint`, `setEntrance`, `paint` | "Split {plot}" · "Joined {n} plots" · "Merged {a} into {b}" · "Moved {building}" · "Moved the door of {building}" · "Painted {n} roofs {colour}" |
| `setAttr` | "Changed {field} of {thing}" (the field's catalogue label) |
| `lock`, `pin`, `revert` | "Locked {thing}" · "Pinned {thing}" · "Reset {thing} to generated" |
| `regenerate`, `rerollLayer` | "Tried again: {scope}" (New random) · "Rebuilt {scope} as generated" (keep) · "New names for {scope}" · "New trees" · "New emblem" · "New compass" · "New decoration" — New decoration's group is one row: its `style.jitter` event carries the words and its `style.crowns` event is drawn in that row, **Undo this** undoing the group |
| `setStyle`, `paintGround`, `placeLight` | "Restyled the map ({preset})" · "Painted ground texture" · "Placed {a kind}" |
| `convert` | "{thing}: {op in words}" ("The Old Mill: abandoned") |
| an `undo` group from "Go back to here" | one row "Went back to {name}", its undone targets shown struck through beneath it |
| `epoch` | V06's chronicle line for the epoch; its `lines` one `info.raised.suppressed` line (`{w}` the removal's week) per entry of the epoch report's `raised.suppressedFired` (V06 §2.10) — a raised-way reason that fired at a slot a live suppression holds (J-V9.113) — its target the removed thing, shown as its former outline (item 467); V08 §4.6 item 3 |
| `dossierFacts` of an absorb | the head of the absorb's group (V08 §4.6): `host.group.absorb` ("{n} changes from SettlementForge, week {week}") with `{n}` the event's `changes` count and `{week}` the week of the `absorbed` entry its fold appends (V08 §3.6 step 4), `host.group.absorbUndated` when that week is null; its `lines` the event's `notes`, each `msg` rendered by the catalogue (V08 §4.6's `host.note.<kind>` rows) and its `keys` resolved to addresses as `targets` (item 583), a line dropped when the view's effective key (V09 §2.10) does not admit a target |
| `dossierFacts` opening a creation's prefix | "Made from SettlementForge's record" (`history.dossierFacts.creation`), heading the prefix's events; its `lines` the event's notes, as the absorb's |
| a dossier event | "SettlementForge: {reason}", drawn in its group under the head (below); its `lines` the §5.4 `changes` entries whose `seq` is the event's, each by its `report.moved.<kind>` row (V09 §4.9), **Show** on the entry's element, use, plot or works |
| any event with `proposedBy: 'clerk'` | the kind's template prefixed by the AI mark: "Assistant: {summary}" |
| `drawTunnel`, `drawChamber`, `addLink`, `placeAccess`, `addUndergroundAccess` | "Dug a tunnel ({m} m)" · "Dug a chamber in {system}" · "Started {system}" (a `newKind`) · "Joined {a} to {b} underground" · "Opened a way down at {place}" · "Added a way down from {building}" |
| `editTable` on the siting tables | "Changed how {kind}s are placed" · "Kept {consumer}'s supplier of {good}" · "Cut {consumer}'s link to {provider}" · "Kept {institution} on one plot" |
| `upgrade` · `rebase` (by its reason) | "Updated the town to {to}" · "Kept the saved town" (`keptSnapshot`) · "Rebuilt around your drawings" (`drawnConstraintsRebuilt`) · "Took the town into {version}; before this it can't be rebuilt from its seed" (`frozenImport`; V09 §3.14 (b)) — keys `history.upgrade`, `history.rebase.<reason>` |
| every other kind of the base and of volumes 1–8 | its own template, keyed `history.<kind>` (and `history.convert.<op>`, `history.setAttr.<path>` where the op or path changes the words): "Advanced the town {n} years", "Made the manor an H", "Moved the tower of {building}", "Planted {n} trees", "Allowed {thing} here again", "Split {way}" … — each written with its kind; T-V9-15's walker over the `EditEvent` union of the base and the volumes fails the build on a kind without one (no fallback prints a code) |

**Controls.** Each row: **Show** (pans and highlights its targets), **Undo this** (owner role: `undo(h, of)`, subject to
independence — a dependent later event makes the refusal card list it), **Go back to here**, **Open a copy from here**
and, where epochs or dossier events follow it, **Re-run from here** (V09 §3.9). A removal row adds **Show** as its former
outline, dashed while hovered, and — where Undo this is refused as dependent — **Build it again** (V09 §4.20.3 (4); the
same function the clerk slot receives as `ClerkMount.rebuildEvents`, V09 §2.10). In host mode the copy and re-run
controls follow `HostSlots.newDocuments` (V09 §3.9). The panel's head: **Mark this moment** (a named restore point), the
restore points as a strip of named chips (auto points in a lighter tone), **Export skeleton**, and the filters "All ·
Mine · Assistant · SettlementForge · Over time". Undone rows are shown struck through and greyed with "Redo" on the latest
one. A non-undoable row shows its reason on hover from the catalogue ("This is where the town began", "From
SettlementForge"). A document whose log holds only its creation prefix shows the creation head alone and "Your changes
will be listed here." **Orphans.** The document's orphan table (§7.3 item 4) is the panel's last section, "Changes that
lost their target": each row names the edit and what it was attached to, with **Re-attach**: the user picks a new target
on the map, and the app sends the same event kind with the new target (a new, ordinary event; the orphan stays listed
until the user dismisses it). **Chronicle.** When the document has epochs (V06), a second tab "Chronicle" shows
V06 §5.1's chronicle; its rows scrub the timeline bar (V06), and each row carries **Open a copy from here** and **Re-run
from here** (V09 §3.9).

**The dossier groups** (V08 §4.6; J-V9.107). A `dossierFacts` event heads a group: itself and the events after it in the
log whose session is the port's reserved `host:port` (V08 §3.6 step 6), up to the next `dossierFacts` event or the first
event of another session — the port commits an absorb, or a creation's prefix, in one run, so its events are contiguous,
and they carry no `group`; each row of the group has `dossierGroup` set to the head's `seq`. The head is the absorb's
(`host.group.absorb` or `.absorbUndated`) or, when the `dossierFacts` event is the log's first (a creation's prefix opens
with it, V08 §3.6 step 4), the creation's ("Made from SettlementForge's record"). Under the head, in V08 §4.6's order:
(1) the group's events other than epochs, in log order, each by its template — a dossier event followed by its
report-entry lines; (2) the head's note lines; (3) the group's `epoch` rows (V06's chronicle line with its `lines`,
V08 §4.6 item 3). The head toggles its group open and closed — the newest group open, the rest closed, a per-viewer
convenience never stored — and its **Show** highlights every target of its rows and lines; the members keep the row
controls above as `undoable` and V09 §3.9 allow them (a dossier row is not undoable: "From SettlementForge"). A group is
listed under the **All** and **SettlementForge** filters; under **Over time** its epoch rows are listed on their own;
never under **Mine** or **Assistant**. **Note lines.** Each note of the head event's `notes` is one line: its `msg`
rendered by the catalogue (V08 §4.6's `host.note.<kind>` rows), its `targets` the addresses its `keys` bind, each read by
`query({ kind: 'entity', dossierKey: key }, { admitAs: effectiveKey() })` (item 583; V09 §2.7's band-less rule) — a key
no binding row holds adds no target; a line any of whose answers is `withheld` is not drawn (§11.2 *Knowledge*;
V08 §4.6 item 2), and the answers are re-read when `onEffectiveKey` fires. **Report-entry lines.** A dossier event's
lines are the entries of `report(h)`'s `changes` (§5.4) whose `seq` is the event's, each by its `report.moved.<kind>`
row with its addresses as `{ id }` arguments, rendered under `effectiveKey()` by V09 §2.7's band-less rule — each an
`entity` read with that key as `admitAs`, a withheld address shown as its `kind.<registry kind>` word — and re-rendered
when `onEffectiveKey` fires, never at the role's key (J-V9.116); its element, use, plot or works are its `targets`, a
withheld one left out, and the line itself is drawn. The standing notes are the report panel's, not the history's
(V09 §5.7; V08 §4.6).

**The host's lines** (J-V9.91). In host mode with `HostSlots.historyLines` set, the panel draws the host's lines as one
group at the head of the list, titled `history.group.party` ("The party"), under the **All** and **SettlementForge**
filters only, newest first by `at`: each line its `text` (a `host.*` row in volume 8's words — "Revealed to the party:
the Tanners' Hall", the time the party pictures were last drawn) with its time, and **Show** when its `targets` are not
empty. A host line is not an event: it has no **Undo this**, **Go back to here**, copy or re-run control and is never
struck through — its undo is the host's own "Hide again" or "Reveal again" in the header (V08 §4.2). The shell never
persists the lines: it calls `list(effectiveKey())` (V09 §2.2, V09 §2.10) each time it draws the group, and re-lists them
on each `onChange` and each `onEffectiveKey` — so a View as change, or a host's players' view set or cleared, re-draws the
group at the new key as every other panel is (V09 §2.7), the provider naming and targeting only the places that key
admits (J-V9.114); the group is absent when the slot is unset or its list is empty. The log's rows, filters and undo are
untouched by it (V09 §2.8).

### 4.11 The clerk's view — the drawer (the clerk itself is volume 10's)

* **Whose assistant** (J121, J122). In the SettlementForge module the assistant is SettlementForge's, proposing through
  the host proposal path into the card-only drawer below, its provider, model tier and key path SettlementForge's AI
  setup read as configuration (V09 §2.10); `builtin` arrives only where SettlementForge's configuration enables the
  built-in clerk (M3c). Standalone, the drawer exists only where the deployment's configuration enables the built-in
  clerk, and the key card only where that configuration asks for a user key.
* **Off until opened; always labelled; cards the first time** (J-V9.35). The top bar's **Assistant (AI)** button — shown
  when `ShellConfig.clerk` is set and, in host mode, when `HostSlots.clerkMode` is `builtin` — opens the drawer. Its
  first opening shows these cards in order, each with **Not now**, which returns to the map with the clerk off:
  1. the **AI label**: "This assistant uses AI to suggest changes. It only proposes — you decide. It sees what you can
     see of this town." — **Continue**;
  2. the **data notice**: V10 §3.20's notice, shown as volume 10 writes it — **I agree** writes `ClerkSettings.consent`
     with the notice's version;
  3. the **key** (only where the configuration asks for a user key — V10's configuration A; never under a host's proxy,
     configuration B, nor in the SettlementForge module): a masked field "Your key for the AI service", a checkbox
     "Remember on this device" with V10's warning beneath it ("Anything running on this site can read a remembered
     key."), **Save** (`ClerkHandle.setKey`, which checks the key before storing it) and a link "How to get a key" to its
     help page. The verdict shows on the card: `ok` closes it; `invalid`, `noCredit` or `noAccess` shows the matching
     sentence of V10 §3.16's `key` row under the field (`refuse.clerk.key.<keyState>`), and the field stays for another
     try; `unchecked` (offline) shows `clerk.key.unchecked` and closes it.
  Then `enabled` is set and the drawer opens. The map, every tool and every export work fully without it (R19).
* **Layout.** Wide: a 400 px drawer on the right, over the context panel (the panel returns when the drawer closes);
  medium: a full-height sheet; narrow: full screen with the map as a strip above. A text box with three suggested prompts
  under it ("A walled harbour town with a temple quarter", "Why is the tannery here?", "Check my plan for mistakes");
  **Paste a list** sends the text on V10's roster entry. The drawer's menu holds **New topic** (`ClerkHandle.newTopic`:
  the next message starts a fresh conversation on its route, V10 §3.2; the earlier one stays in the transcript), **How do
  I …?** (below), **What the assistant sees**, **Copy conversation**, **Save these changes as a skeleton** (below) and,
  standalone only, **Start a new map from this** (below).
* **Turns** — the drawer renders V10 §2.6's `TurnView` stream as V10 §5.4 gives its meaning (J-V9.34): the user's words;
  while the turn runs, its `progress` lines with **Stop**; then the `reply` blocks in order — `text` as prose; `entity`
  as a link chip with the name (or the kind, when withheld) and its tier chip, which selects the thing on the map (hover
  highlights it); `unverified` in the muted tone with "not found on the map"; `action` as V10 §5.4 words it — a button
  worded by its `label`, a `select` without one as its ids' chips — running its `ClerkAction`; and under the turn its
  cost in muted text ("about $0.04"). A turn that returns no block draws the user's words and its cost alone.
* **The actions** a button runs follow V10 §2.6's dispatch table, each worded by its `label` (V10 §5.4): the application
  runs `select` → the ids selected on the map; `why` → the why card of its `id` (V09 §5.8), else the Help page `page`
  (V09 §5.9) — what the canvas's **Show me why** opens for that row (V09 §3.3, V09 §4.9); `openSettings` → the
  settings' Assistant section; `useTool` → that tool active in the action's `mode` (else as last used) on that mode's
  working layer (V09 §4.2), its `ids` selected first (V09 §4.5's mode ids); `export` → the export dialog on that format;
  `fork` → "Open a copy from here" (`forkAt`); `rerun` → "Re-run from here" (`rerunFrom`, V09 §3.9) — below a rebase
  point at the earliest seq with `info.copy.condensed` (V09 §3.9), in host mode by `HostSlots.newDocuments`; every other
  kind goes to `ClerkHandle.run` — `propose` (its events previewed as a ghost, then Accept like any proposal), `undo`
  (the accepted group's undo) and `rebuild` (**Put it back**, V10 §4.3, its events those of `ClerkMount.rebuildEvents`,
  V09 §2.10).
* **Proposal cards** (`ProposalView`): the AI mark, the reason line, the active variation's counts, fates, renames and
  findings; each bend line (`ProposalView.variations[].bends`) with its `actions` as buttons worded by their labels (a
  `select` without one as its ids' chips); each roster line with its `actions`; its effects under **What else changes** —
  each line its `text` with **Show**, a selection of its `targets`, then "and {n} other changes" (`effect.more`'s words,
  `{n}` the variation's `effectsMore`) with no button; no other button of an `effect.*` row is drawn on a clerk card (a
  Re-derive's **Keep them as yours** is T1's, V09 §4.20.3 (7); in the drawer the user asks for the ways to be kept,
  which V10's prompt rules let the clerk declare); a removal's `info.remove.holds` line; the variation chips with V10's
  labels and thumbnails (each variation its own preview, V09 §3.6); **Accept** (Enter) → `ClerkHandle.accept`; **Accept
  these lines** (a roster's cards) → `acceptLines`; **Try again** → `retry`; **Drop** → `drop`; **Why** → the why card
  of what the proposal makes; once accepted, **Undo**, and on a removal no longer the latest group **Put it back**
  (`rebuild`), each worded by its label (V10 §2.6's card buttons). The turn's `refused` items (V10 §2.6) are drawn as
  refusal cards below the proposal card, or alone when no proposal stands. Focusing a chip calls `focus` and draws that
  variation's ghost; one proposal's ghost shows at a time. A proposal whose town moved on shows `refuse.stale` with its
  row's buttons (**Show the new preview**, the card's `focus`; **Show me why**) and **Ask again** (V10 §3.11; its
  `retry`, worded `clerk.alt.stale.retry`).
* **Refusals** (`RefusalView`): the refusal card with its text and each action as a button worded by its `label`, a
  `select` without one as its ids' chips (V10 §5.4).
* **The card-only drawer — a host's proposal** (V10 §3.17; V08 §4.4 (3)). In host mode with `clerkMode` `off` or `host`
  the clerk slot is of kind `host` (V09 §2.2): no Assistant button shows and nothing is sent to a model from the frame. A
  `TurnView` whose proposal has `source: 'host'` arriving on `turns` (the harness takes it from
  `ClerkMount.host.proposals`, V09 §2.10) opens the drawer, in the layouts above, in its **card-only mode**: that
  proposal card alone — its AI mark `clerk.host.mark` naming the host's assistant (`HostSlots.hostName`), the reason line,
  the variation chips, counts, bends (with no actions: a host card offers accept, drop and why only), fates, renames,
  findings and **What else changes** as above, and **Accept**, **Drop** and **Why** — with no message box, suggested
  prompts, first-opening cards, menu, settings or meter, and no **Try again** (the host's assistant re-proposes on its
  side). **Accept** → `ClerkHandle.accept` (V10 §4.2); **Drop** → `drop`; the harness answers the host through
  `ClerkMount.host.answer`; the drawer closes on either. A newer host proposal replaces the card; a moved town shows
  `refuse.stale` with its row's buttons and without **Ask again**, since a host's card offers no `retry` (V10 §2.6). A
  viewer never receives one (§11.2 refuses a viewer's `preview`). With `clerkMode` `builtin` a host proposal is drawn in
  the full drawer as a turn with no user words (V10 §2.6).
* **The creation preview** (V10 §3.11 (3), V10 §5.1). While a creation proposal waits, the map region shows the active
  variation's scratch document read-only (`ClerkMount.showScratch`) under a banner across the map's top, "Preview — not
  your map yet", with the variation chips, **Accept** and **Back to my town**; the tools are disabled while it shows.
  Accept follows V10 §4.2 (3): when the current town is the untouched empty-state town the view moves to the new town (the
  old one stays in Recent towns); otherwise the new document opens beside the current one (`ClerkMount.openNewDocument`:
  a new tab of the app and a Recent entry) and a toast names it. In host mode `openNewDocument` follows
  `HostSlots.newDocuments` (V09 §3.9), though no creation proposal arises there (below).
* **The meter.** The drawer's foot reads "This month: about ${usd} of ${cap}" from `ClerkHandle.usage()`, `{cap}` the cap
  the configuration sets (in the SettlementForge module SettlementForge's `capUsd`); past V10's `warnShare` the line takes
  the bend tone (`clerk.cap.warn`); at the cap `clerk.cap.reached` shows and the message box is disabled until the month
  turns or the cap is raised where the configuration lets the user raise it.
* **Asking why.** The why card's **Ask the assistant** (V09 §5.8; hidden when no clerk is enabled) sends the question on
  V10's `why` entry with the fetched `WhyAnswer` attached, and opens the drawer.
* **Asking how, and handing over a list** (J-V9.89). **How do I …?** — in the drawer's menu and in Help (V09 §5.9), shown
  only when a clerk is configured and on — opens the drawer with its message box on V10's `help` entry, the box's
  placeholder reading "How do I …?"; the question goes by `ClerkHandle.send(question, 'help')`, and the answer's closing
  `useTool` action (V10 §3.1) is drawn as its button, worded by its `label` (`clerk.alt.help.useTool`, V10 §5.4), which
  runs by V10 §2.6's dispatch table — that tool active with its options strip; the next message returns to the `drawer`
  entry. **Ask the assistant to place these** — under T7's paste box (V09 §4.5), shown only when a clerk is configured and
  on — sends the pasted text on V10's `roster` entry (`ClerkHandle.send` with entry `'roster'` and the text attached as
  `roster`), exactly as the drawer's **Paste a list** does, and opens the drawer. With no clerk, or the clerk off, neither
  control shows.
* **Starting a new map from this** (J-V9.93). **Start a new map from this** — in the drawer's menu, standalone only —
  puts the message box in creation mode for its next message: the line `clerk.newMap.line` ("Describe the new town — this
  one stays as it is") shows above the box, and the message goes by `ClerkHandle.send(text, 'drawer', { newMap: true })`,
  which V10 §3.1 (4) reads as the user's choice of creation mode. Its proposal previews as a creation proposal under the
  banner (above), and **Accept** opens the new document beside the current one (`ClerkMount.openNewDocument`), since the
  current town is not the untouched empty-state town. Esc, or the item again, returns the box to its ordinary mode; after
  the message is sent it returns by itself. **In host mode** the item is hidden and **no turn enters creation mode**: the
  frame's document is the host's and is never the empty-state town (V09 §3.2 is standalone's route (d)), so V10 §3.1 (4)'s
  first condition is standalone's, and new documents follow V09 §3.9's host rule.
* **Knowledge and roles.** The session reads under the view's role and under "View as" (V09 §4.8), the effective key the
  harness takes from `ClerkMount.effectiveKey` (V09 §2.10): a viewer's drawer reads and asks why but receives no
  proposal, its declarations answered by `refuse.viewer` (V10 §3.16); a change of the effective key clears the
  conversation by V10 §3.12 (6), the drawer showing `clerk.view.cleared`.
* **Apply-then-undo** is V10 §4.4's setting (the user's `ClerkSettings.applyMode`, off by default): the drawer draws an
  applied card as V10 §4.4 states it, its line `clerk.applied` with the other variations as chips, and every case V10 §4.4
  never applies arrives as a preview.
* **Saving.** **Save these changes as a skeleton** (edit mode: the document's own skeleton, which holds the accepted
  declarations, V10 §3.15; creation mode: the transcript's skeleton, V10 §5.3); **Copy conversation** (its text to the
  clipboard); "Assistant conversation (JSON)" in the export dialog (V09 §5.10). The conversation is kept as V10 §2.7
  rules: in memory by default, in the device store while the user's "Keep history" is on (J-V9.10, amended by J-V9.34).
  **What the assistant sees** (the drawer's menu) opens V10 §5.4's read-only view of what was sent, as volume 10 defines
  it.

### 4.12 Touch, pen and small screens — decided

The evidence is thin (`research/ux/tool-survey.md` §6: MFCG's maker says it is not designed for small touchscreens;
FTG's editor is large-screen only; watabou's other tools open the context menu on a long press). The decision (J-V9.9),
with §13.4's first-five-minutes sessions confirming it:

* **Layout classes** (V09 §2.2): **wide** (≥ 1024 CSS px) and **medium** (600–1023 px, and ≥ 480 px high) get every
  tool; **narrow** (< 600 px wide, or < 480 px high — a phone in either orientation) is a **viewer with light edits**:
  the map, the gazetteer and "features in view", layers and thematic views, "View as", the history panel (restore and
  copy), T1, T5 (seed and click-inside only), T6, T7, T10, T11, T12 (style, tint, colour vision, furniture, light), every
  export, share and the clerk drawer. T2, T3, T4, T8, warps and T9's geometry drags are not offered on narrow — their rail
  slots show the tool greyed with the `refuse.phone` line — while T9's Shape tab forms (storeys, roof, class) work. The
  tables editor and the advanced panel are read-only lists on narrow.
* **Gestures under a coarse pointer** — tap = click; long press (500 ms, no movement beyond 8 px) = the context menu
  (right-click); two-finger drag = pan; pinch = zoom; one-finger drag on empty map = pan when no drawing tool is active,
  and draws when one is; **free placement** (Alt) = a second finger held anywhere while the first draws; double-tap =
  zoom to the thing's band (double-click); the pointer idioms that need a modifier (shift+click New random, ctrl /
  cmd+click reset, alt+click lock) are the context panel's buttons. Hit targets and handles are at least 44 × 44 CSS px,
  the snap radius 22 px (V09 §3.4). Tooltips appear on a long press on a control.
* **The hit stack by touch** (V09 §4.20.8). A tap on the selected thing where the stack holds more selects the next one
  down, as a click does, and the long-press menu lists **Select below: {name}**. On narrow, a raised way, a span, a deck
  plot and a stepped building can be selected, named (T11) and deleted with V09 §4.20.3's pending card; they cannot be
  drawn there (T2, T3 and T4 are not offered).
* **Pen** is a fine pointer; pressure is not read (a brush's strength is its slider's, so a replayed stroke never depends
  on a device), and the barrel button is right-click.
* **The fallback** (§13.4): if tablet participants fail where pointer users pass, `AppPrefs.touch.editFabric` defaults to
  false for coarse pointers, hiding the FABRIC and FINISH layers' geometry edits (T8, T9's drags) on touch, and the guide
  says so.
* **The cursor sun** (§8.4): with no pointer hovering, the sun is the sheet's fixed sun (§1.2); on touch, a one-finger
  drag with the Light chip held in the view bar moves the sun (a view input, never logged).

### 4.13 The keyboard

`keymap.json` (§14; item 515) keeps every base binding (A, B, D, N, L, T, M, W then 1–8, G, F, R, Esc, ctrl / cmd+Z,
shift+Z, + / −, 0, ?) and adds these rows (each also on a menu or button): **1–9** pick T1–T9 (outside a warp session;
T10–T12 by the rail or their keys below); **alt+Enter** toggles the selection's lock (T10); **F2** renames the selection
(T11); **S** opens the dress panel (T12); **Enter** accepts the pending ghost or the focused variation — and only when
neither is pending keeps MFCG's idiom: in the empty state a new town replaces the untouched one, after a declaration Same
kind, new seed opens a new document beside it (V09 §3.2; a toast names the town left in Recent); **[** and **]** cycle
variations; **Tab** / shift+Tab cycle a selection's handles, then the arrow keys move the focused handle by 1 m (shift:
10 m) and Enter commits; **Delete** / Backspace deletes the selection — previewed, committing at once only when nothing
beyond the thing itself changes, else the pending card with Accept (V09 §4.20.3) — (a dossier-backed thing: "Not here",
`rejectSite`); **H** the history panel; **E** the export dialog; **ctrl / cmd+S** downloads a copy of the `.plat`;
**ctrl / cmd+O** opens a town; **Space** held pans with the pointer; **X** opens the clerk drawer when a clerk is
configured; **M** is the base's ruler (V09 §4.19); **PageUp** / **PageDown** step the underground band while Below is
active (§8.4, item 413; V04 §5.1), and while a T4 stroke is drawn on Ground turn Raised on and off for that stroke
(V09 §4.20.2), §14 stating the keys' precedence; **Shift+F10** and the Menu key open the context menu on the selection
(V09 §4.4). Bindings fire only while the map region has focus (§14); a text field's focus suspends them; a user's
rebinding is an `AppPrefs.keymapOverrides` row (§14), and a rebinding onto a key another row holds is refused by the
keymap editor with that row named.

### 4.14 The advanced panel, the tables editor and the presets dialog

* **Advanced panel** — every parameter of §7.8's registry (≈ 200), grouped by consuming stage ("Site", "Programme",
  "Streets", "Districts", "Plots", "Buildings", "Greenery", "Names", "Look"), with a search box. Each row: label, value
  with its unit, range, the **layer that set it** (§7.6: "default", "preset", "your preferences", "this town",
  "SettlementForge"), the locality badge ("changes nearby" for a local control, "re-derives from {stage}" otherwise), and
  its help link. A change is `adjust`; a Re-derive shows the fates sheet first with an auto restore point (V09 §2.8). The
  "Buildings" group carries the `fantasyShapes` control (V02 §4.4–§4.5; item 402). The "Streets" group adds the row
  **Raised ways the town builds by itself: as the rules say · none** (item 110 (b)): "none" is one `editTable` setting this
  document's rows of volume 11's `raisedWays` table to chance 0, previewed; its dry run says `offer.raised.standing` with
  **Remove them too**, a grouped `delete` of each generated one, each suppressed (V09 §4.20.3). "as the rules say" deletes
  the override rows. The row is on medium and wide, read-only on narrow. A search that matches nothing shows "No setting
  matches {words}."
* **Tables editor** — the rule tables of §7.6, listed by group; a table opens as a grid of keyed rows (virtualised); a
  cell editor typed by the table's schema (unit, range, enumeration); per cell the provenance (source, date, note) and a
  chip "as MFCG does", "as FTG does" or "ours" read from the cell's `provenance.source` and `extension` marker (item 23).
  **The cell inspector** shows the cell's calibration register entry (V12 §2.6's `CalibrationEntry`, read from the
  shipped `register.json` and `dist/evidence.json`): its status in plain words ("the owner's rule" for a stamped cell,
  "measured", "our own, to be calibrated at {milestone}"), its reference, its due milestone, its evidence lines and its
  history; a cell with no register entry shows its provenance alone. An edit is an `editTable` event previewed first
  (its re-derivations and, for the fallback, its fates, §7.6); **Reset row** removes the override; the **orphans** list
  shows overrides whose base row changed in a newer table version, old base, new base and the user's value side by side
  (§7.6), with Keep mine / Take new. **Export overrides** writes the row operations as JSON.
* **Presets dialog** — pick a preset (the parity presets `MFCG` and `FTG` among them, §7.6; the adopted and selectable
  historical packs listed as "historical ({era}, {region})", offered only to documents of that era and region, V12 §3.14);
  **Save these settings as a preset** is `editPreset`.
* **"Apply my current preferences"** (settings, §7.6) sends one `adjust` per changed parameter, grouped, with the fates
  sheet; with nothing changed the item is disabled.

### 4.15 Accessibility beyond §14's contract

§14 fixes WCAG 2.2 AA for the chrome, the landmarks, keyboard reach, the gazetteer and "features in view" as the
non-visual route, contrast, reduced motion and 100–200 % scaling; T-V9-21 tests them on every new screen. This volume
adds:
* **The rail and strips** — the rail is a `toolbar` with a roving tab stop (arrow keys between tools, Enter picks), each
  layer group a labelled `group`, each button's accessible name "{tool}: {hint}"; the options strip is a `toolbar` whose
  chip sets are `radiogroup`s.
* **The ghost, spoken** — each settled preview's badge, bend line or refusal is announced once through a polite live
  region (`AppPrefs.announcePreviews`, V09 §6.3): "Preview: temple quarter, 42 plots, 180 households, 38 buildings; 2 of
  your changes move. Enter to accept, Escape to cancel." When the preview lists effects, the first three follow ("Also:
  Market Street now goes round by Bell Lane, …") and the rest as "and {n} other changes" (V09 §4.20.7). The refusal card is
  a `status`, never an `alert` (it is not modal).
* **Handles by keyboard** — a selected shape's handles are a `listbox` in the map region ("Corner 3 of 6, 120 m east and
  80 m north of the town centre"); Tab reaches them, the arrow keys move the focused one (1 m; shift 10 m), Enter commits.
  **No trap:** Tab past the last handle leaves the map region for the next landmark (the context panel), shift+Tab before
  the first returns focus to the map region itself, and Esc drops handle focus back to the map; T-V9-21's no-trap step
  walks it.
* **Declaring in words** — every points-form tool accepts places by name, resolved by the locus reader of V09 §4.16: T5 "a
  temple quarter near the market" (the seed at the market's anchor), T4 "a street from the north gate to the harbour" (two
  points, one at each target's anchor), T3 "a wall from the castle to the river" (the two ends at those targets'
  anchors), T6's typed locus, T7's list — so a screen-reader user can make every INTENT, GROUND AND BONES and PROGRAMME
  declaration without the canvas. A named target's point is always the target's `EntityCard.anchor` (V10 §3.6 rule 1),
  read by `query({ kind: 'entity', id })` (item 468); nothing else is snapped here, since the dry run's points-form
  derivation does the rest (§7.1; V10 §3.6 rule 7), so the same words on the canvas and to the clerk write the same bytes
  (T101-3; T-V9-13).
* **Variations and fates** — the tray is a `radiogroup` whose options read their summaries ("Version 2 of 3: 44 plots, 176
  households"); the fates sheet is a table with row and column headers and a Show button per row.
* **Never colour alone** — tier chips carry words; every thematic view of this volume carries its second cue
  (V09 §5.4, item 112), and Settings' colour-vision selector draws the checked variants (V09 §5.12); the shade view's
  steps are also read out under the pointer; the snap highlight and handles keep ≥ 3 : 1 against the paper and ink of
  every shipped sheet and of each sheet's checked variants (T-V9-21's contrast step).
* **Timing** — toasts stay while hovered or focused; the long press is adjustable 300–1 000 ms (`AppPrefs.longPressMs`,
  default 500); no action has a time limit.

### 4.16 Reading typed words — the roster line and the locus

T7's pasted lines, T6's typed locus and V09 §4.15's word declarations are read by one small reader of our own,
deterministic, with its connective words as rows of the message catalogue (`parse.*` keys) so a locale supplies its own:
1. **Lines.** One place per non-empty line; a leading bullet, number or dash is dropped.
2. **Fields.** The first of these splits that fits wins: "name: class, locus"; "name — class — locus" (also "-" or "–"
   with spaces around it); "name (class) locus"; otherwise the whole line is the name and the class is guessed from its
   words ("The Golden Anvil smithy" → smithy).
3. **The class.** Words and word pairs are matched against the class rows' display labels and synonyms (V11 §2.3's
   `label` and `synonyms` cells; the town-and-city words in V11 §3.5.15) — of the classes the document's rung admits (the
   fold's product and rung, V07 §2.1): at a base rung the town-and-city rows, V05's sky rows where a sky layer stands, and
   the generic rows; at a village rung the `v.` rows, the town-and-city rows that play themselves there (no
   `villageForm`; V11 §3.22; V07 §3.11 step 3) and the generic rows, a town-and-city row with a `villageForm` answering
   through its `v.` row (J-V9.125): exact first, then with a plural ending removed, then within one letter for words of
   five letters or more; ties go to the row's `commonness` cell compared within one meaning (a roster share, V11 §3.5.1,
   V07 §2.4), a `v.` row before a town-and-city row at a village rung, then to row order; no match gives the generic
   "Other" class and the card asks "What is it?" with a class picker.
4. **The locus.** "in X" → `in`; "on X" → `on`; "at X" → `at`; "near X", "by X", "beside X", "next to X" → `near`;
   "north / south / east / west (side) of X" → `near` with that `side`; a connective followed by "the north / south /
   east / west side of X" keeps its `rel` and takes that `side` (the form (6) writes). X is resolved by
   `query({ kind: 'gazetteer', text: X })`: an exact name first, then the best match whose kind fits a kind word in X
   ("gate", "square", "market", "harbour", "bridge"), with "the north gate" meaning the gate whose bearing from the town
   centre is nearest north; the market and the harbour name the principal market and the harbour. An unresolved X leaves
   the card asking "Where is {X}?" with a pick-on-map button; nothing is guessed silently.
5. **With a dossier** each line must name a dossier element (§7.1's roster rule): the class field becomes an element
   picker listing the unplaced elements whose names match the line; with none unplaced, the picker says "Every place in
   SettlementForge's record is on the map."
6. **Wording a locus** — the reverse of (4) (J-V9.100). A `Locus` is worded as its `rel`'s connective — the first word of
   its `parse.rel.<rel>` row ("in", "on", "at", "near"; the row's other words are the synonyms (4) reads, "by", "beside"
   and "next to" for `near`) — then, with a `side`, "the {side} side of" (`parse.side`, `{side}` the
   `parse.dir.<N|E|S|W>` word), then the target's name as the `gazetteer` query answers it at the view's effective key
   (V09 §2.7); a target it withholds or leaves unnamed is worded by its kind's label after "the" ("the gate"). Examples:
   "near the North Gate", "on the west side of the Market", "in Tanners' Row". For a named target (4) reads the worded form
   back to the same `Locus` (T-V9-13). Its readers: `refuse.roster.dossier`'s `{locus}` (V09 §4.9), the history template
   "Asked for {name} {locus}" (V09 §4.10; its `{name}` the line's name, or the class's display label for an unnamed line)
   and volume 10's `dossier` row, which cites it (V10 §3.16).

### 4.17 The underground in the editor — item 109's screens

The records and their rules are V04's (V04 §2.2, V04 §3.5.0a, V04 §3.5.1, V04 §3.5.7) and the crypt V03's
`Basement.crypt` (V03 §3.7.4); this section is what a user sees and does with them. **The panels' explanatory lines are
the why rows**: a void's excavation reading, its ways in and its dwellings line, a ruin's rows, a catacomb's source, rank,
count, entrance and state, a burial face's outcome, and a crypt's presence, form, rank and join are the matching rows of
the `underground` and `crypt` sections of the subject's `WhyAnswer` (V10 §3.9a), drawn through `WhyCardModel.sections`
(V09 §2.7) with their catalogue keys (V09 §4.9's families) — so a panel, the why card and the clerk say one sentence.
This section names each row by its section and subject; the words quoted here are this volume's own rows.

**4.17.1 Hidden caves and ruins — the game master's view (item 109 (j) (2)).** A cavern or ruin exists whole whether or
not anyone can reach it; a cluster whose excavation reading is `unexcavated` (V04 §3.5.7 (g)) is known to nobody in town.
The Below group's **Show hidden caves and ruins** writes the per-viewer view key `showUnexcavated` (§2.9, item 278;
J-V9.38). It is offered — present and settable — only to a view whose knowledge key is tier `secret` and whose View as
shows everything; to any lower key it is absent, and a stored value reads as `false`. With it on, S14 draws every element
of an unexcavated cluster in V04 §5.2's unexcavated program, and the legend adds "Not yet found by anyone in town". Below
`secret` no sealed void is drawn, labelled, listed in the gazetteer or "features in view", answered by `why` (an unknown
address) or exported (V04 §5.2's knowledge rule; §11.1). At `secret`, a picture export draws sealed voids only when its
view's toggle is on; GeoJSON and glTF carry them only at `secret` (GeoJSON with `excavation: 'unexcavated'`), and a VTT
scene never (V04 §5.5). A town with no unexcavated cluster still offers the toggle at `secret`; it draws nothing more.

**4.17.2 Drawing into a system — the system chip; new ruins, caverns and catacombs (item 109 (g), (h)).** On the Below
layer, T4's Tunnel and T6's Chamber show a **system chip** in the options strip: the town's underground systems by name
and kind ("Old Town — buried town", "the Catacombs of St Aelred's — catacomb", "Sewers", "the Deep Caves — cavern",
"Ruins of Ashkar — ruin" …), only those the view's key admits, defaulting to the system under the draft's first point,
else the one last used. Under them it lists the new systems item 109 admits at the town's rung: **New ruin** and **New
cavern** at every rung (item 109 (j) (1)), **New catacomb** at TOWN and above (item 109 (k)). A crypt is never a system
and is never listed (J111). The mapper emits `drawTunnel { system }` or `drawChamber { system }`; a "New …" pick emits
`drawChamber { system: { newKind }, … }`, a closure (§7.3 item 9) that creates the `UndergroundSystem` with its first
chamber (item 361): a ruin with its `RuinRecord` of source `declared`, its plan's axis from the drawn chamber (V04 §4.7); a
cavern of the site's geology; a catacomb by the bend ladder of 4.17.5. A ruin chamber is laid on the ruin's axis
(`bend.ruin.axis` names the turn) and drawn in V04 §5.2's `ruin` program, and the legend adds "Ruins of an older town"
whenever a ruin element is drawn. A town with no system the key admits shows only the "New …" entries. Re-making a run or
a system is T10's "this run" or "this system" (V09 §3.7).

**4.17.3 How people get down here (item 109 (j) (3), (3b)).** The panels of an access point, a cavern or ruin cluster, a
catacomb and an undercity neighbourhood have a section **How people get down here**: one line per way in, from the
`AccessPoint.cause` (V04 §2.2's `AccessCause`) of the access, or of the link it reaches through, worded by the catalogue
row `info.under.cause.<rule>` — the `underground` section's access row, whose words are this table's (V09 §4.9); the
access's symbol on the map differs by cause (§8.2's access row draws it by `cause.rule`, V04 §5.2):

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

A void reached only through other systems reads "Reached through the {system} from {access}": the path is the excavation
reading's connection graph from the nearest surface access (V04 §3.5.7 (g)), which the reader returns on the cluster as
the fact `under/wayIn` (a list of links and accesses). **Show the way in** highlights every step of that path
(`live.selection`) and lists the steps with their bands in the panel, switching the drawn band as the user steps through
them. A sealed void reads its unexcavated row (`info.under.sealed`) with **Add a way down**; its section adds the
sealed-deep row (`info.under.deep`) when its top lies deeper than `DigRule.maxM` (V04's rule, its value V11's) below
every footprint over it (item 109 (j) (5)).

**A lost void** (item 113 (e); V04 §2.2, V04 §3.5.7 (g); J-V9.132). A cluster whose every open path to the surface has closed and
one of whose elements was once reached reads `lost`: its panel's **How people get down here** shows `info.under.lost`
("Once known; no open way leads here since year {year}.", `{year}` from the closing link's or access's
`Lifecycle.since`, else "… now.") with **Add a way down** for the owner; it is drawn faded by the unexcavated program and
its label marked "once known" (V04 §5.2, V04 §5.4) for every key its `knownTo` admits — unlike an unexcavated cluster it
needs no toggle and is not limited to `secret`, since it was known — and the Below legend adds "Once known; no way in
now" whenever one is drawn. Its dwellings have left by the vacancy rules (V04 §3.5.7 (g)); the panel's dwellings row
says so. A refound cluster (a way reopened, dug or excavated) reads `accessible` again in the commit that opens it, and
the line goes.

**Editing a way down** (T9 and T6; V09 §4.3's rows): **Brick it up** → `setAttr(access, 'state', 'bricked')`; **Lock it**
and **Open it** → `state` `locked` or `open`; **Who knows this way down** → the `knownTo` chips; dragging its opening →
`setAttr(access, 'ground.at', p)`, re-hosted by `pointLocate` (outside II.7.3's admitted ground the refusal card carries
"Show me why"); dragging its underground end → `moveVertex` on its `access_point` vertex; Delete → `delete`. A change
that closes a cluster's last way in previews the dwellings that empty and the cluster turning lost
(`fate.access.lastWay`, V04 §4.3) before Accept.

**4.17.4 Dwellings only after a way in (item 109 (j) (4), with item 101 R2).** A declaration that would put dwellings in an
`unexcavated` or `lost` cluster — a T5 quarter or boundary on a void part, a T6 `placeAt` of a dwelling class on a void
plot, a clerk's proposal of either — is expanded as a closure that also makes the way in (item 372; J-V9.40, amended by
J-V9.102):
1. a dug access from the ground building standing nearest above the cluster (V04 §3.5.7 (d)'s geometry: plan distance
   from the cluster's nearest element to its footprint, ties by address) whose dig floor lies within `DigRule.maxM` of that
   element's top — a `cellar_stair` or `shaft` by V04 §3.5.7 (d)'s kinds, source `dig`, cause `edit` — with
   `bend.under.accessDug`;
2. else a public opening at the nearest candidate of V04 §3.5.7 (e)'s kinds, its chance waived because it is declared,
   cause `edit`, with `bend.under.accessOpening`;
3. else a public opening of kind `collapsed_shaft` at the point of public ground (V04 §1.2) over the cluster nearest, in
   plan, to its shallowest element, cause `edit` (item 372's note; J-VI.4), with `bend.under.accessOpening`;
4. else — no public ground lies over the cluster, and every footprint over it stands beyond `DigRule.maxM` of it — the dry
   run bends the declaration onto ground part 0 over the same footprint, so the homes stand above the void (a quarter or
   boundary takes the same outline on part 0; a dwelling `placeAt` the part-0 plot over its point), named by
   `bend.under.noAccess` with the alternatives **Add a way down** (T6 on a chosen spot) and **Show me why** (item 101 R2;
   J-V9.102).
The way in and the dwellings are one group and one undo step, so no dwelling stands in a sealed or lost void after any
declaration (T-V9-38).

**The bends' alternatives** (J-V9.112). With step 1's bend the dry run lists in `PreviewResult.alternatives` the further
buildings step 1's rule qualifies, in its order (plan distance, then address), at most three (item 372). **Use another
building** is shown while one of them has not been tried: it re-previews the group `[addUndergroundAccess { building:
that building }, the declaration]` — the access first and with no `target`, so item 372's grouped-access rule takes the
cluster's element nearest that building's footprint (step 1's element), and the declaration's closure then finds the
cluster reachable and adds no access of its own — and the card keeps `bend.under.accessDug` with `{building}` that
building, drawn by the application from the alternative it chose; each press steps to the next building, and the button
goes when none is left. Accept commits the group as one undo step. The clerk's `propose` for the alternative carries the
same events (V10 §3.16), one per listed building, each labelled by the row's list form "Dig down from {building} instead"
(V09 §4.9), since that card shows every alternative at once (J-V9.118). Steps 2 and 3 run only when no building
qualifies, so `bend.under.accessOpening` offers no building: its buttons are **Show the way in** and **Show me why**.

**4.17.5 Catacombs, crypts and cemeteries (item 109 (k) (1)–(6); J111: "cathedral also gets crypts but cemetaries get
catacombs").**
* **The catacomb's panel** — an `UndergroundSystem` of kind `catacomb` and its `CatacombComplex` (V04 §2.2): its name, by
  V04 §5.4's label rule; "Under {burial face}" with **Show**, and its **source** row; its **rank** and **count** rows (with
  `overCount`, `info.catacomb.overCount`); its entrance — the stair down from its cemetery at V01 §3.5.12's opening place
  (in its chapel where one stands) — with **Show**, and every other way in by 4.17.3. The source, rank and count rows are
  V10 §3.9a's catacomb rows (`info.catacomb.*`).
* **Its "Over time" tab**: the extent (`extentFloorM2`, m²) with a line chart of it per epoch (from V06's history frames)
  whose values never fall (T-V9-34); this epoch's growth against its cap ("grew {a} m² of at most {cap} m²", from
  `lastGrowth.addedM2` and V04's cap); the **state**, read from `blockedBy` — **growing** when it is empty, **stopped**
  when it holds `sourceClosed` (`info.catacomb.stopped`), **stagnant** otherwise, with each other cause in words
  (`info.catacomb.blocked.<cause>`, this volume's words): `reach` "It has reached as far as its diggers go", `wet` "The
  ground beyond is too wet", `system` "Another tunnel is in the way", `foundation` "Deep foundations are in the way",
  `wallStrip` "The town wall's footing is in the way", `depth` "The rock lies too deep" (`rank` is V10 §3.9a's rank
  line); and the ossuaries' **fill** as a bar, captioned `info.catacomb.stagnant` while stagnant, with a stepper (`setAttr`
  of `fill`; lowering it is allowed and undoable, and the next stagnation raises it again, V04 §3.5.1 (7)). The
  underground view draws the ossuaries denser as `fill` rises (V04 §5.2's ossuary program); the application only passes
  the layer. A catacomb with no epoch yet shows its extent alone, no chart.
* **The crypt on a church's panel.** Every church-class building's panel has a **Below** line drawing the `crypt`
  section's rows (V10 §3.9a, from `Basement.crypt`, V03 §3.7.4): presence, area and form (full, half, raised-choir; the
  cathedral's always present, the largest, by V02 §3.14.5's no-refusal ladder), rank, the crypt join ("opens into the
  Catacombs of {name}", with **Show the way in**), or no crypt — on wet ground an `always` class takes the raised-choir
  crypt and any other church no crypt, its ledger slabs in the chancel floor (V03 §3.7.4's wet-ground rule). **Show**
  opens the plan at the basement storey. A church without a crypt offers **Add a crypt** where its class's crypt column
  admits one (`setAttr` of the basement's crypt, V03). A crypt is never listed as an underground system.
* **The cemetery's panel** — a churchyard part, a `cemetery`-class use, a Cemetery network ground, a monastery's burial
  yard: "Catacombs below: {name}" with **Show** and its entrance; or the face's `catacombOutcome` row (V04 §4.5;
  V10 §3.9a's burial-face outcome — `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`), read from the face's
  `why` (path `catacomb`).
* **Bends, none refused** (item 101 R2; J-V9.39). The dry run of `drawChamber { system: { newKind: 'catacomb' } }` runs
  item 361's ladder; this volume words the result:
  (a) the chamber's centroid lies inside a church-class building's footprint → `setAttr(building, 'basement/crypt/ring',
      <the drawn ring clipped to the building's crypt region>)` and no chamber is laid; on a building without a basement,
      V03's crypt ladder makes a crypt-only basement (full, then half, then raised; V03 §4.2), and the ghost names the form
      ("a half-sunk crypt under {church}"); undo is one step: `bend.catacomb.church`, offering "Start a catacomb under {its
      churchyard, or the nearest burial face}";
  (b) on a burial face with the count reached → within V04's `accessReachM` of an element of an existing complex it joins
      that complex (`bend.catacomb.join`); otherwise it becomes a charnel vault — one `ossuary` chamber of the `dug` system
      under that face, capped at `charnelMaxM2` (`bend.catacomb.charnel`, offering "Join it to the Catacombs of {name}", a
      `drawTunnel` from the chamber to that complex's nearest element);
  (c) below TOWN → the charnel vault (`bend.catacomb.belowTown`);
  (d) on no burial face, or on a worked-out quarry below CITY → the chamber stays as drawn, in the `dug` system
      (`bend.catacomb.noGround`, offering "Start it under {nearest burial face}", which moves it to that face's centroid;
      nearest by distance from the chamber's centroid, ties by address). A worked-out quarry at CITY or METROPOLIS within
      V04's `ossuaryReachM` is a lawful source, and the chamber commits as a quarry ossuary.
  (e) Crypt edits (V03's plan events and `setAttr` of the basement), by V03 §3.7.4's crypt-edit dry runs: a plan event
      that would remove the cathedral's crypt — `setRoomRole` away from crypt, the basement set to none, a `mergeRooms`
      that dissolves it — keeps it at its smallest lawful size (`bend.crypt.cathedral`); an enlarging edit of another
      church's crypt bends to the rank cap, `crypt.rankShare` × the principal's area (`bend.crypt.largest`, "stops at
      {share} of the cathedral's", offering "Enlarge the cathedral's crypt too", a two-event group); another church's crypt
      may be removed freely, and when it carried the crypt join its fates list "The way from {church}'s crypt into the
      catacombs closes."
* **The author's removal** (item 109 (k) (4); J-V4.56). Deleting catacomb galleries stays allowed — everything is
  editable: the badge and the fates sheet say `fate.catacomb.removed`, the extent floor drops by the deleted area and the
  deleted nodes are tombstoned, so growth never digs them again; undo restores both. A seal keeps the extent: "Sealed
  galleries stay part of the catacomb."

**4.17.6 Arch vaults at street level (item 110 (b); V04 §3.5.4 (d)).** An arch vault stands at grade in a raised way's
`vault` span but belongs to the vaults system; it records its raised way and span (`Chamber.span`). On **Ground** it is
reached through its span in the hit stack — the deck, the span, the vault, the street (V09 §4.20.8). On **Below**, the
vaults system's panel lists arch vaults under their own heading, "At street level, under {way}", each with **Show**,
which pans to the span; the depth-band filter never hides them. Their doors are drawn with the Ground layer's entrances.
The why card reads "An arch of {way}, walled up as a vault", or "… by you" after a span edit (V09 §2.7). Opening its span
or removing its way lists the vault, its building and any drawn plan among the effects (V09 §4.20.7).

### 4.18 People, the family tree and the clock (§10.3's module, M4b)

Offered only when the relation store holds people (the module tier, §10.3); absent otherwise (J-V9.48).
* **The People panel** (the gazetteer's People chip, or "People" in the top bar's panel menu) opens in the context panel's
  place: filters for type, race, gender, profession, workplace (a pick on the map), age (a two-thumb range), household (a
  pick on the map) and district (chips), sent as `query({ kind: 'people', … })` and paged; each row gives name, age,
  profession, household, district and a tier chip, a withheld person reading "someone the viewer doesn't know" (§9.2). A
  filter that matches no one reads "No one here matches." Selecting a row outlines the person's home and workplace on the
  map and opens the person's card.
* **The person's card**: name, age, household, profession, workplace, the module's content rows, **Family tree**, and
  **Where is {name} at…** — an hour slider (default the `time` key's hour) and a day chip send `query({ kind: 'whereIs',
  person, day, hour })`, and the answer draws a pin on its building with "At {hour} on {day}: {place}".
* **The family tree** (§14's view) opens in the context panel's place widened to 560 px (a full-height sheet on narrow):
  `query({ kind: 'relations', person, up: 2, down: 2 })`; generations in rows by birth epoch, partners side by side and
  children below; a branch beyond two generations elided into "+{n}", which expands on click; **Re-root here** on any
  person; opening a person never pins it (§10.3); a keyboard tree grid (arrows between people, Enter opens the card, +
  expands, − collapses). A person with no relation shows the one card alone.
* **The clock**, beside the Light group: the `time` key's day and hour, **Next hour** (`sim.advance { hours: 1 }`, hidden
  without `@plat/sim`), and "Day and night follow the hour" (`light: 'time'`). It never moves the map (§11.3).

### 4.19 The base's view keys, notes, pins and the ruler on screen

The base declares these view keys and furniture options and names the application as their writer (§2.9, §9.5); each is
view state, not logged and outside every digest, and the per-viewer ones never cross a bridge (§11.3).

| control | where | writes | default |
|---|---|---|---|
| **Rotate the map** — a dial and "North up" | the view bar's Map group | `rotation` (degrees; the compass follows, §9.5) | 0 |
| **Plots only** | Map group | `plotsOnly` | off |
| **Detail: when clicked · when in view** | Map group | `elaborate` | when clicked |
| **Hand lantern** | Below group (V09 §4.2) | `handLantern` | off |
| **Season**, **Weather** (where §8 draws them) | the Light group | `season`, `weather` | the recipe's |
| **Day or night**, sun mode, sun height, hour | Light group | `light`, `sunMode`, `sunHeight` | §2.9's |
| **Favourite** — a star on every panel's header | panels; the Notes panel lists them | favourites | none |
| **Notes** — a private note on any thing's About tab; public notes (owner and editor) | the Notes panel and each panel's About tab | notes, public notes | none |
| **Pins** — "Add a pin", then a click; each with a label, a note and one of six colours | the Notes panel | view pins | none |
| **My look** — a viewer's style card | the Dress panel's style cards, for the viewer role | `stylePreset` (a viewer never writes `setStyle`, §11.3 N-15) | none |
| **Colour vision** — usual · red-weak · green-weak · blue-weak | Settings' General section and the Dress panel (V09 §5.12) | `cvdVariant` (`'none'`, `'protan'`, `'deutan'`, `'tritan'`; §8.2) | `'none'` |
| **Grid** — kind (squares, hexes), cell size, skip water | the Dress panel | the grid settings | off |
| **Legend** — auto · everything · off, a border, a corner | the Dress panel | the legend settings | auto |
| **Emblem** — generated, **New emblem** (V09 §4.5's T12 row; logged, one undo step), or an SVG of the user's, cleaned by §9.5's sanitiser | the Dress panel | the emblem settings | generated |
| **Compass** — on or off; drag it to place it; the wheel over it turns it; **New compass** (V09 §4.5's T12 row; logged, one undo step) | the Dress panel and the map | the compass settings | §9.5's |
| **The ruler** — click points for a length (m and ft); **Area** for a polygon (m², ha, acres); feature snap by role (item 517, `{ p }`); Esc ends; **Save as annotation** writes a view pin labelled with the measure | key M; a view-bar button | view data; a view pin | — |

### 4.20 Item 110 on the canvas (J-V9.58)

Item 110 closes four authoring gaps — terrace retaining walls, raised ways, stepped massing and buildings on decks — and
lets a city raise ways by itself while "a user can decide to add or remove" (the owner's rule). The records, their
generation, their dry-run rules and their lifecycles are the base's (items 244–246, 260, 362–364; §7.1's item-110 text),
with volume 2's stacks and deck buildings (V02 §3.15–§3.16), volume 4's arch vaults (V04 §3.5.4 (d)), volume 6's reason
keys and suppression (V06 §2.13) and volume 11's rows. This section is their tools, words and screens: every gesture runs
V09 §3.3's pipeline, every event is §7.1's (item 362), and every word is a V09 §4.9 row.

**The `toolkit.json` rows item 110 adds** (V09 §2.3; T-V9-12 reads them):

| tool · mode or parameter | gesture · kind | `emits` | `layers` | basic | narrow · coarse |
|---|---|---|---|---|---|
| T3 · mode `retaining` ("Retaining wall") | `points` (`polyline` form) | `drawWall` | ground, sky | — (a mode chip beside Draw wall and Gate) | no · yes |
| T3 · param `highSide` ("High side": Auto · Left · Right) | `chip` | — | ground, sky | yes (in the Retaining wall mode) | — |
| T2 · mode `terrace` ("Terrace") | `brush` | `terrace` | ground, sky | — (a mode chip) | no · yes |
| T2 · param `levelCm` ("Level") | `number`, and the level handle | — | ground, sky | yes (in the Terrace mode) | — |
| T4 · param `raised` ("Raised") | `toggle` | `drawWay` | ground | yes | no · yes |
| T4 · class chip `aqueduct` ("Aqueduct") | `chip` of the class parameter | `drawWay` | ground | yes | no · yes |
| T9 · context controls `spanUse`, `crossingForm`, `deckHeight`, `archSpacing` (on a selected raised way, span or crossing) | `card` controls | `setAttr` | ground | — (context) | yes (view) · yes |
| T9 · params `tierCount`, `tierTop`, `tierStairs`, `tierShape`, `tierSkirt`, `tierSolid`, `tierStairWidth`, per-tier `floors` / `eaveCm`; the handles `tierStep`, `shrineInset`, and a round or octagonal tier 0's centre and radius | `number`, `chip`, `drag-handle` | `setMassing`, `setAttr` | ground, sky | the count, top, stair and shape chips; skirt, solid and stair width behind More | yes (the Shape tab's forms) · yes |
| T10 · the Delete gesture ("Delete", "Remove") | `click` | `delete` | ground, sky, underground | — (context) | yes · yes |

The other modes of T2, T3, T6, T8, T9, T10, T11 and T12 gain `'sky'` in their `layers` where V05 §4.1 maps them; T1's
and T5's carry it already, and T4's only in its Sky access mode (V09 §4.20.9).

**Constants of this section** (each read by the shell as stated; the dry run's cells are named where they live):

| constant | value | read by | provenance |
|---|---|---|---|
| a retaining chain's closing radius | 20 px (22 px coarse) | the shell (T3's Retaining wall, as Draw wall) | our own, as V09 §4.5's T3 row |
| `raised.previewOnReleaseKm` | 3 km | the shell (V09 §3.14) | our own, calibrate-later by T-V9-3 at M3a — an application constant, outside V12's register (V12 §3.11) |
| the deck scenes' cap per export | 8 | the export dialog's split (item 447's deck scene) | our own, calibrate-later by T-V9-61 (each deck scene's export at the cap within §12.7's export budgets) — an application constant, outside V12's register (V12 §3.11) |
| `tierStep` snap | 10 cm | the step handle | our own |
| the terrace brush's default radius | V10 §2.10's `encoders.terrace.radiusM` | T2's Terrace mode | volume 10's cell, cited — one default for the canvas and the clerk |
| `terrace.stepMinCm`, `terrace.slopeMin`, `terrace.retainingReachM`, `terrace.flatDepthM`, `terrace.coverShare` | V11's `terrace` table (V11 §3.24.1) | the dry run's flat-ground rule (§7.1) | V11's cells |
| the flat-ground sampling (every 2 m, ± 3 m across) | §7.1 | the dry run | the base's |
| `aqueduct.sourceReachKm`, `aqueduct.gradient` | V11's `raisedWays.settings` | the aqueduct's source bend and its fall (§7.1) | V11's cells |
| `deck.landmarks/bridgeMid/minSpanM` | V11 §3.24.4 | the mid-span slot (item 246); T6's slot snap | V11's cell (J-VI.8) |
| the effects list's cap | §11.2 (50, then `effectsMore`) | the badge and the fates sheet | the base's (item 465) |

#### 4.20.1 Retaining walls and terraces (item 110 (a))

1. **T3 gains a third mode, Retaining wall** — a mode chip beside Draw wall and Gate, never a kind behind More. Two or more
   points or a line; the chain closes when its ends meet within the closing radius (a platform, its high side inside).
   The **High side** chip reads Auto · Left · Right, relative to the drawing direction; Auto sends no `highSide`, and the
   dry run takes the side whose mean ground within 10 m of the chain is higher (item 362). Snaps: V09 §3.4's row. Mapper:
   `drawWall { kind: 'retaining', points | from: { points }, closed, highSide? }`. Commit on release, or Accept when fates
   move houses or effects are listed (V09 §3.3). A retaining wall is never an enclosure: the Gate stamp does not snap to
   it, it closes no circuit, and the wall-arcs ghost of V09 §3.4 is not drawn for it.
2. **The ghost** draws the wall line with short ticks on its low side (§8's drawing), a stair or ramp mark at every way it
   crosses, and the plots on either side re-flowing. The badge reads "retaining wall {m} m · steps {a}–{b} m · {n} ways
   cross by stairs, {k} by ramps". Each crossing's form is the dry run's (the way-class rule, item 110 (a)), named in the
   bend line by `info.crossing.stair` or `info.crossing.ramp` ("Market Street climbs the terrace by a stair"); the words
   follow the dry run's result and never guess it.
3. **Flat ground bends, never refuses** (item 101 R2; J-V9.60). §7.1 states the flat-ground rule (the sampling, the cover
   share, the reach and the strip, V11's cells). On the canvas: (a) when the chain moves onto a nearby step, the bend line
   is `bend.retaining.moved`, offering **Keep my line**, which takes (b); (b) otherwise the declaration becomes a `terrace`
   over the strip on the high side (Auto: the left of the drawing direction), so the drawn line is its edge and carries
   its wall (`bend.retaining.flat`, offering **Use the other side**); the strip's other edges, where they step, carry walls
   too, and the badge counts them. Both bends commit the bent events, never the flat wall, so item 110 (f)'s "nowhere
   flat" holds on every path.
4. **T2 gains a Terrace mode** (a brush). Press and drag over the ground to level it; the level is the ground height at
   the pointer-down point, shown as a readout ("Level 34.2 m"). After release and before Accept, a **level handle** — a
   vertical double arrow at the stroke's first point, as a lake's — moves the level, each drag re-previewing. The brush
   radius is T2's radius parameter (its default V10 §2.10's `encoders.terrace.radiusM`). Mapper: `terrace { stroke: {
   path, radiusCm, falloff: 'cosine', amount: 1, water }, levelCm, expansion }` (item 362), `water` from T2's water-mode
   parameter. Commit: Accept, since it re-levels plots. Badge: "terrace {area} m² · retaining walls {m} m · steps {a}–{b} m ·
   {n} plots re-flow". A stroke whose levelled footprint steps nowhere by `terrace.stepMinCm` lays no wall, and the badge
   says "no retaining wall needed".
5. **Handles after commit** (V09 §3.5). A retaining wall's chain has the open-chain handles, or a ring's when closed; a
   drag is `moveVertex`, and on a generated wall it makes the wall declared and held (§7.2), which the panel says ("Yours
   from now on; the rules no longer move it."). Selecting a terrace-made wall offers **Change the terrace's level**: the
   level handle again, emitting a new `terrace` over the recorded stroke at the dragged level, whose expansion replaces
   the old walls in its group (§7.1). The recorded stroke is the `terrace` event's own, found through the wall's lifecycle
   cause (§2.8: its `EditRef`).
6. **Crossings from the other side.** A T4 road drawn across a standing retaining wall shows the stair or ramp in its
   ghost with the same bend line; a primary or secondary way ramps where the way-class rule says so. The form is editable
   afterwards (V09 §4.20.6 (6)).
7. **Keyboard and devices.** Points by arrows and Enter; the High side chip is a `radiogroup`; the terrace brush moves by
   the arrow keys at the focus point and stamps with Enter, and the level handle takes arrows (10 cm; shift 1 m)
   (V09 §4.15). Neither mode is offered on narrow (T2 and T3 are not); both work with a coarse pointer.
8. The bar is T-V9-54 (V09 §7.1).

#### 4.20.2 Raised ways and aqueducts (item 110 (b))

1. **Controls.** T4's options strip gains a basic toggle **Raised** and a class chip **Aqueduct**; the chip turns Raised
   on and locks it while chosen. While a T4 stroke is drawn on the Ground layer, **PageUp** turns Raised on for that
   stroke and **PageDown** off — the surveyed road tools' elevation keys (`research/ux/tool-survey.md` Part II, B2-S5).
   PageUp and PageDown keep stepping the depth band while Below is the working layer (V09 §4.13).
2. **Snapping with Raised on** (V09 §3.4's row). The two ends snap only to ground vertices; interior points snap to
   nothing on ground part 0 and never split a way they cross; Shift's 15° rule still applies. An end released away from
   any ground vertex is bent by the dry run along the course to the nearest one (§7.1; `bend.raised.end`).
3. **Forms.** Two points → the base's raised-way course solver (the one generation and V06's epoch step call; V06 §3.19)
   derives the course; a line → the drawn line is the deck's centre-line, resolved and stored as §7.1 stores a points
   form. Mapper: `drawWay { class, widthCm, raised: true, points | from: { points } }` (item 362); the Aqueduct chip sends
   `class: 'aqueduct'`.
4. **Walls** (item 363; J-V9.61). A raised road or viaduct whose course meets an enceinte's trace comes down before it
   and passes through its gate (`bend.raised.wall`); an aqueduct passes through an arch in the curtain, never a gate, and
   its ghost draws the arch mark. From the other side, a T3 wall drawn across a standing aqueduct shows an arch in its
   ghost, not a gate (`bend.wall.aqueductArch`).
5. **The aqueduct's ends** (§7.1's source and terminal rules, V11's cells). Its first point snaps to a spring or a river
   reach (its source), its last to a square, a fountain pin, a `conduit_house` plot or a cistern of the vaults system
   (its footprint lit on the ground; II.7.6) — its terminal; its course falls all the way. A source lying lower than the
   terminal is bent to the nearest source above it within reach (`bend.aqueduct.source`); with none in reach, the stroke
   is bent to a well pin at the terminal (`instance { op: 'add' }` of a well pin, §4.7 S11's decoration pins; J-VI.4 (h))
   and commits no way, named by `bend.aqueduct.uphill` with **Show me why** (J-V9.75). A terminal released on open ground
   gets a new fountain pin there in the same group (in a square, the square's centrepiece), named by
   `bend.aqueduct.terminal`. Its buried stretches stay a line on ground part 0; the ghost draws them dashed. An oasis's
   spring (V09 §4.21.1) is a source like any spring.
6. **A floating island** (V05 §4.2, V05 §3.22 (3); J-VI.4 (d)–(f)). A raised or aqueduct stroke never makes a way to or
   on an island, and the dry run bends it (§7.1): a raised stroke ending on an island's rim becomes `placeSkyAccess` with
   the stroke's ends as top and foot and the kind V05 §3.10 admits there (`bend.raised.island`, offering **Draw a road to
   its foot**: the same access plus a ground `drawWay` of the stroke's class from its first point to the access's foot,
   one group); an aqueduct stroke ending on a rim ends at its last ground vertex outside the island's footprint
   (`bend.aqueduct.island`); a raised course that would cut a sky access's column or rope line, where V05's
   `skyAccessObstacles` offers no re-route, ends at the last ground vertex before it (`bend.raised.hoist`, with **Show me
   why**). A stroke wholly on an island's key never arises from the canvas, because Raised and Aqueduct are hidden on Sky
   (V09 §4.20.9); from the clerk or a skeleton the dry run drops `raised` and draws the way on the island's ground
   (`bend.raised.onIsland`), and makes an aqueduct a fountain pin at its end (`bend.aqueduct.onIsland`). Each line's
   words are V05 §4.2's (V09 §4.9).
7. **Rungs.** The Raised toggle and the Aqueduct chip are offered at every rung, the village rungs included (V07 §4.1's T4
   row); at TOWN and below the user's declaration is the only source (item 110 (b)). Nothing about the cap disables
   them: a declared way counts toward the generator's cap and is never refused by it (V06 §2.13's `declared`).
8. **Badge.** With Raised on, the first line reads "Raised", then "raised {m} m · {n} arches · crosses {k} ways with no
   junction · up to {h} m above the ground · {v} vaults beneath" (the vaults by V04 §3.5.4 (d)'s span rule); an aqueduct
   adds "from {source} to {terminal} · falls {f} m". At CITY and METROPOLIS the last line reads `info.raised.count` — a
   fact from V06's ledger, never a limit. A raised or aqueduct stroke leaves its ghost pending with **Accept** — its course
   and its crossings are for the user to judge (J-V9.4) — and never commits on release; each crossing without a junction
   is drawn as a small bridge mark.
9. **Devices and keys.** Not offered on narrow (T4 is not); points by arrows and Enter; the toggle is in the options
   strip; PageUp and PageDown as (1).
10. **State and walk mode** (J-V9.73). The toggle and the chip hold while T4 stays the active tool, like the class chips,
    and reset to off each time T4 is picked; they are never stored in `AppPrefs`, because a toggle left on by accident
    turns the next street into a viaduct. While V07's walk mode is on, Raised and Aqueduct are disabled with
    `info.raised.walk`; the clerk or the tool API may still send both, and V07's dry run bends them to the points form
    (V07 §4.1).
11. A course longer than `raised.previewOnReleaseKm` previews on release (V09 §3.14). The bars are T-V9-51 and T-V9-52.

#### 4.20.3 Removing a generated thing, and adding it again (item 110 (b), (f); the owner's "add or remove")

1. **Delete previews** (J-V9.63). A Delete — the key, the context menu or T10, on any thing — commits at once only when
   its dry run lists no fate other than *kept* and no effect beyond the thing itself (V09 §4.20.7). Otherwise the ghost
   stays pending: the removed thing dashed, a detour and new crossings ghosted, the badge's effect count, **Accept —
   remove it** (Enter) and Esc; the fates sheet opens only when the result is `confirm`.
2. **Generated content** — whatever item 260's suppression covers: a raised way whose lifecycle cause is a generation or
   epoch rule, a harbour-mouth chain, a quay wall, a retaining wall and a deck plot (`detail.suppress`), and a floating
   island and a sky access in volume 5's record form — is removed by the plain `delete { id }` (an island's becomes V05's
   `convert removeIsland`, V05 §4.2). The fold records the suppression by reason key (item 260's `detail.suppress`; V05's
   removed slots), so no client writes a reason key and a journal replays the call exactly (item 362). The suppression is
   keyed to the reason, never the course (V12 §4.1), so it holds through Regenerate, New random over every district the
   thing crossed, a reload through crash recovery, every epoch (V06 §2.13's ledger reads the suppressed set at every
   generation and epoch), a table release, an upgrade and a historical pack that changes the course. The pending card and
   the committed toast carry `info.remove.holds`, whose arguments come from the dry run's `holds` (item 465): the subjects
   are the engine's, never a list in the shell. Volume 6's delete dry-run lines and the clerk's "removed by you" line use
   the same row.
3. **The dossier.** Nothing item 110 makes is dossier-bound (V08 §2.6b (5)): a raised way whose reason read a dossier
   record (DR34's water system, DR35's landmarks) is generated content and is removed by (2); its why card names the
   record. A dossier-backed element keeps V09 §4.3's general rule (`rejectSite`, or `refuse.dossierRemove` with **Move it**
   for a record with no site).
4. **History** (V09 §4.10). The row reads "Removed the {kind} {name}; the town won't {rebuild | raise} it", with **Show**
   — its former shape as a dashed outline while hovered, read from the removed thing's last record (item 467) — and
   **Undo this**. Where Undo this is refused as dependent (`refuse.undo.dependent`), the row offers **Build it again**: a
   new declaration of the removed thing by its own tool, filled from its last record (item 467) and previewed first — one
   row per kind item 260 suppresses (J-V9.95):

   | removed kind | Build it again's events | the tool it opens |
   |---|---|---|
   | a raised way or an aqueduct | `drawWay { raised: true, class, widthCm, points }` on the former course | T4 with Raised on, or the Aqueduct chip |
   | a quay wall | `drawWall { kind, points, closed }` on its former line, `kind` and `closed` the record's | T3's Draw wall |
   | a harbour-mouth chain (the water gate across the harbour entrance, item 106 (e)) | `placeGate { enceinte, at }` at its former place | T3's Gate |
   | a retaining wall | `drawWall { kind: 'retaining', points, closed, highSide }` on its former chain | T3's Retaining wall |
   | a deck plot | `drawFootprint { polygon, cls? }` on the deck at its former slot — the footprint and class of the building tombstoned at the removal's seq whose last record names that plot, or the plot's own outline when it stood empty — which S11 fits as the deck plot at that slot (served by V06 §3.19.3 (7)) | T9 on the deck |
   | a floating island | V05 §3.2 (6) (ii)'s T5 `sky` declaration on its former outline, which takes its held slot | T5 with Sky |
   | a sky access | `placeSkyAccess` at its former top and foot (a placed access; the removed ordinal stays held, V05 §3.10 (1)) | T4's Sky access |

   **One function** computes these events for a removal group, named by its first seq: for each `delete` of the group it
   reads the tombstoned id's `entity` answer (item 467) with `admitAs` = `effectiveKey()` (V09 §2.7) and emits that
   kind's row, in the group's order; a delete whose answer the key withholds, or whose kind has no row, adds nothing, and
   an empty result shows no **Build it again** (nor volume 10's **Put it back**). The history row calls it, and the shell
   hands the same function to the clerk slot as `ClerkMount.rebuildEvents` (V09 §2.10), so volume 10's `rebuild` action
   takes exactly these events — one source (J-V9.94).
5. **Narrow.** Delete from the context menu (or the long-press menu) is offered on narrow with the same pending card (it
   is not a drawing gesture).
6. **A town-wide "none".** The advanced panel's "Raised ways the town builds by itself: none" (V09 §4.14) sets volume
   11's chances to 0 and offers **Remove them too** for the standing generated ones, each removed as (2).
7. **Crossing the CITY line on T1** (J-V9.72). A Re-derive from CITY to TOWN drops the generated raised ways, since a town
   raises none by its own rule. The whole-town ghost's effects list each one that goes (`effect.raised.goes`), and the
   card offers **Keep them as yours** — a checkbox, unchecked by default. Checked, it appends one declared `drawWay {
   raised: true, class, widthCm, points }` per kept way along its current course, in the Re-derive's group, so one undo
   removes both. Raising a town to CITY lists each way the city raises, with its reason (`effect.added`). An epoch's fall
   keeps them (V06's rule); only a Re-derive drops them.
8. The bars are T-V9-53 and T-V9-63.

#### 4.20.4 Decks: moles, jetties, quay platforms and bridges (item 110 (d))

1. **T6 on a deck plot.** A stamp on a deck plot maps to `placeAt` from its point (V09 §3.3 step 4): the dry run finds the
   deck plot under the point. On a deck with no free plot there, the dry run takes the nearest free deck plot on the same
   deck, else the nearest land plot, bent (`bend.deck.full`).
2. **A class the deck refuses.** A class volume 11's `deckOk` refuses is bent to the nearest free land plot at the deck's
   landward end — the plot nearest the deck's shore vertex (`bend.deck.class`; V02 §3.16 (6)).
3. **Landmark slots** (item 246). T6's snap lights a mole's slots — its head and its midpoint ("Mole head", "Mid-mole") —
   and the mid-span slot of a bridge deck at least V11 §3.24.4's `deck.landmarks/bridgeMid/minSpanM` long, for a tower or
   fort stamp; a stamp there maps to `placeAt` on the slot's landmark plot, whose building reads `DeckContext.landmark`
   (V02 §3.16 (2)). A non-landmark class dropped on a slot takes the nearest free deck plot, bent (`bend.deck.full`). A
   bridge of kind ford or draw, or with no deck, offers no deck plot and no slot (item 246).
4. **The deck building's badge** reads "on the {deck} · at most {maxFloors} storeys · {a}–{b} m²" from volume 11's `deck`
   budget (`DeckBudgetRead`, V02 §2.6) — a storey cap and a footprint band, never a count of plots (J-V9.66). T9's storey
   stepper on it is clamped at `maxFloors` with V02's bend (`bend.deck.floors`, V02 §4.6 (5)).
5. **T4's deck ghosts.** Drawing a `pier`, `quay` or `bridge` way ghosts its deck plots along the deck, and the badge adds
   "{n} deck plots"; a raised way offers none (J-V2.71).
6. **Removing or ruining a deck** previews its buildings among the effects (`removed`, `displaced`; V09 §4.20.7). The deck
   host's Over time tab offers **Rebuild it** (the base's rebuild of the host, item 246's lifecycle), which re-offers the
   plots, listed as `added`.
7. **Fixture 1's bridge fortress** (V09 §7.2). Its canvas script makes it by T4 `bridge`, then a T6 stamp of the fort
   class on the bridge's mid-span slot (item 246).
8. The bar is T-V9-55.

#### 4.20.5 Tiers — stepped massing at the building band (item 110 (c); V02 §4.6)

1. **The controls.** At the building band on a `stepped` building, T9 and the Shape tab show, each previewed and each one
   `setMassing { op: 'tiers', … }` or `setAttr` as V02 §4.6 states: a **tier stepper** (`count`); a **step handle** on tier
   1's front face (`tierStep`; `insetCm`, the handle's distance from tier 0's front face, snapped to 10 cm); a **stair
   chip** (Along the front · Up the faces · Inside · Sealed → `stairs: 'axial' | 'flights' | 'internal' | 'none'`); a
   **top chip** (Flat · Shrine · Roofed → `top`); a **shape chip** (Rect · Round · Octagon → `shape`); a **skirt chip**
   (Flat terraces · Skirt roofs → `lowerRoof: 'flat' | 'pent'`); a **solid chip** (All solid · Lower tiers solid · None
   solid → `solid: 'all' | 'lower' | 'none'`); a **shrine-inset handle** on the top tier (`shrineInset`;
   `shrineInsetShare`); on a round or octagonal tier 0 its **centre and radius handles** (`centre`, `radiusCm`); per tier a
   **storey stepper** (a storeyed tier or the shrine: `setAttr(wings/<key>/heights/floors)`) or a **height stepper** (a
   solid tier: `setAttr(wings/<key>/heights/eaveCm)`); and behind More a **stair-width stepper** (`stairWidthCm`). A tier
   is also selectable as a part (`tiers/<k>`) through the hit stack (V09 §4.20.8), which opens its own stepper. On a
   building that is not stepped, T9's family strip offers the stepped family where it is feasible (`setMassing { family:
   'stepped' }`), and a `tiers` op from the clerk or a skeleton bends it stepped first (`bend.tiers.stepped`).
2. **When.** The per-tier storey and height steppers from M3a (the base's `setAttr` of a wing's heights, J-V2.65); the tier
   stepper, the handles and the chips from M6c, with V02's `tiers` op (V02 §8); a build before M6c ships none of them (its
   `toolkit.json` has no such rows).
3. **Preview.** A removed tier's rooms are listed among the fates where a stored plan holds them, and otherwise among the
   effects (V03 §3.11); the stairs' re-lay is an effect (`effect.stairs.relaid`). Every limit of a stack is a bend of
   V02 §1b's set, worded by its V09 §4.9 row — never a refusal (item 101 R2).
4. **The why facts.** The Shape tab's About section shows V02's `massing/stack/*` facts (shape, the stair form asked and
   laid, the skirt, the top, the step, truncated tiers; V02 §4.6 (7)) with their tier chips.
5. The bar is T-V9-59 (M6c); the per-tier steppers are in T-V9-51 at M3a.

#### 4.20.6 The new records' panels, handles, spans, crossings and why lines

1. **Panel rows** (registry labels and help anchors, item 269):
   * a **retaining wall** — its step "{a}–{b} m", its material, towers or buttresses, its high side (chips), and "Made by
     the rules on levelled ground" or "Yours";
   * a **raised way** — its kind (viaduct, raised road, aqueduct; V06's `RaisedKind` `viaduct` · `elevated` ·
     `aqueduct`), its reason as the `raised` section's row of its `WhyAnswer` (`info.raised.<outcome>`, V10 §3.9) with its
     values (the reason's words are volume 11's `says`), its deck height, its arches with their use, its supports, the
     vaults beneath (volume 4), an aqueduct's source and terminal, and for a way carried down its `carried` row (from
     V07's `RaisedRead.origin`);
   * a **deck** (its host way's panel) — its kind, host, plots, storey cap and footprint band;
   * a **stepped building** — V02's why facts (V09 §4.20.5 (4));
   * a **span** — its use and reason, its vault's building when walled up;
   * a **crossing** — the way, the wall, its form and the step it climbs.
2. **A span** (selected through the hit stack) shows T9's **Open arch · Walled up as a vault** chips → `setAttr(way,
   'spans/<n>/use', 'open' | 'vault')` (item 362), previewed; the effects list the vault's building and any drawn plan in
   it (V03 §3.11). A span whose recorded reason keeps it open (a part-0 way, water or a flood cell beneath, too tall, too
   low or too steep, or wholly over hinterland land use — reason `country`, J-C4; V04 §3.5.4 (d)) shows "Walled up as a
   vault" disabled with that reason in words ("A street passes under this arch") — no event is sent. The edit is held (a
   user edit), and the why card then reads "… by you".
3. **`decidedBy`** (V09 §2.7's rows): for a raised way its own `raised` section row, not drawn twice (J-V9.82); "The
   ground was levelled here; it steps {m} m"; "An arch of {way}, walled up as a vault". The rest of the card's item-110
   lines are the `raised`, `underground`, `massing`, `plan`, `island` and `move` sections' rows (V09 §2.7). A raised way
   whose reason read a dossier record adds the record as a `facts` row of tier `dossier` (DR34) or as `ref` rows, a
   withheld one named by kind (DR35).
4. **Handles** (V09 §3.5's rows): `rampEnd` on a raised way's two ends (drag → `moveVertex` resolved only onto a ground
   vertex, the snap of V09 §4.20.2 (2)); its interior points (`moveVertex` on its raised part's lattice point); a
   retaining wall's chain (V09 §4.20.1 (5)); the terrace level (`terraceLevel`); the tier step (`tierStep`), the shrine
   inset (`shrineInset`) and a round or octagonal tier 0's centre and radius.
5. **The context menu** of a raised way: Why here?; Select below (V09 §4.20.8); Lock, Pin; Reset to generated (when
   edited); the Over time submenu (the base's conversions of a way); and Delete with V09 §4.20.3's card.
6. **A crossing's form and the deck's measures** (item 364). A selected crossing shows T9's **Stair · Ramp** chip →
   `setAttr(way, 'crossings/<retaining wall id>/form', 'stair' | 'ramp')`; a ramp too steep for the way's class bends
   into a longer ramp along the way where its run allows, else back to a stair (`bend.crossing.steep`). A selected raised
   way shows T9's **Deck height** (`clearanceCm`, the least soffit height over the ways it crosses; a value below volume
   11's `raisedWays.structure.clearanceCm` for a crossed way's class bends up to it, `bend.raised.clearance`) and **Arch
   spacing** (`spanSpacingCm`, within the material's `pierSpacingM` band) steppers — item 244's held fields, which its
   support step and the course solver read, so an edit re-lays the piers and re-derives the spans in the same commit. Each
   is previewed, and once edited is held.
7. The bars are T-V9-51 and T-V9-60 (the effects), with T-V9-12 reading the new paths.

#### 4.20.7 What else a change does — the effects list (item 465)

A preview's **fates** are the declared and held things an edit touches (§11.2); item 110's consequences reach things
that are not held — a generated route's detour, streets that now meet a ground way, a terminal that loses its water, arch
vaults with their buildings and drawn plans, buildings on a removed deck, households moved by new supports, retaining
walls re-laid by a terrace. §11.2 gives `PreviewResult` and `ApplyResult`'s `confirm` one typed list, `effects` (its kinds
`added` · `removed` · `rerouted` · `joined` · `lost` · `displaced` · `rebuilt` · `moved`, a `MsgRef`, its targets; capped,
then `effectsMore`), filled by the engine from the rows the owning volumes state, and a `holds` line for a suppressing
removal. The application renders it in four places, one list, one wording (the `effect.*` rows of V09 §4.9):
* **the badge** adds "and {n} other changes" with **Show**, which opens the list over the map; each row's Show
  highlights its targets;
* **the fates sheet** (V09 §5.5) gains a section **What else changes** after the fates, grouped by kind, virtualised with
  the fates;
* **the live region** reads the first three and "and {n} other changes" (V09 §4.15);
* **the clerk's card** reads the same list, filtered under the key, with **Show** only (V09 §4.11).
A gesture whose preview lists any effect commits on Accept (V09 §3.3). A preview with no effect draws none of the four.
The bar is T-V9-60 (J-V9.64).

#### 4.20.8 Reaching what lies under a deck — the hit stack (item 466)

1. **The answer.** `query({ kind: 'hit', … })` returns every mark under the point within the hit radius, top first by
   §8.2's draw order (a raised part above ground part 0), with the sub-part under the point (a raised way's span, a
   crossing, a stepped building's tier), ≤ 1 ms from the tile worker's hit-test slices. On the Sky layer the point is
   un-displaced first (V09 §3.4; V05 §4.2). An empty answer (no mark within the radius) clears the selection.
2. **Click-again cycling** (J-V9.65). A click selects the top of the stack. A click on the already-selected thing, where
   the stack holds more, selects the next one down, cycling back to the top after the last; a click elsewhere starts
   afresh; a stack of one entry stays on it. A click on a selected raised way over one of its spans selects that span
   (`Selection.kind = 'part'`, path `spans/<n>`). The order on a viaduct over a street: the deck, the span, the arch vault
   (when walled up), the street. A double-click stays "zoom to the band". `hint.below` shows the first time a click lands
   on a stack of more than one mark.
3. **Select below.** The context menu lists **Select below: {name}** for every other entry (the keyboard route:
   Shift+F10 on the selection, V09 §4.4). By touch, a tap cycles as a click does and the long-press menu lists the same
   (V09 §4.12).
4. **Names** (V09 §5.14). T11 takes the top of the stack, and a second click the way beneath, so a viaduct and the street
   under it keep separate names; an aqueduct is named as any way is.
5. **Volume 10's `entity { at }`** returns the top of the same stack.
6. The bar is T-V9-58.

#### 4.20.9 Item 110 on the Sky layer (V05 §3.22 (4), V05 §4.1)

On Sky the tools act on the chosen island's arena with its `key` (V09 §4.2's sentence lists every row of V05 §4.1):
* **T2 Terrace** levels the island's ground and lays an island `RetainingWall` along its edge (item 245); **T3 Retaining
  wall** draws one. A stroke of either on or along the rim strip is bent by the dry run inward past the rim walk (J-VI.4
  (g); V05 §3.22 (4)): every point of the stroke lying in the rim strip moves along the island's radial direction (from
  its land centroid) to 1 m inside the strip's `setback` line, the other points unchanged, named by `bend.retaining.rim`
  with **Show me why**; the ghost shows the moved stroke pre-selected, as every bend (V09 §3.3), and the clerk and a
  skeleton get the same bend from the same dry run. A stroke lying wholly inside the strip moves wholly; one whose moved
  points would cross each other is simplified by §7.1's authoring-boundary rule before the dry run.
* **T3 Draw wall** lays V05 §3.21's barrier-closure enceinte walling only the landing yards (`bend.wall.rim` along the
  rim away from a landing).
* **T4** offers only the sky access (V05 §4.2); Raised and Aqueduct are hidden, since no raised part stands on an island
  (V05 §3.22 (3)).
* **T6, T8, T9, T10, T11 and T12** take their V05 §4.1 forms; `toolkit.json`'s `layers` name `'sky'` for T2, T3, T6, T8,
  T9, T10, T11 and T12. T2's Oasis chip is disabled there (`disabled.skyWater`; item 111 does not apply on an island).
* The disabled example on Sky is T4's Tunnel: "Tunnels are dug below the ground" (`disabled.onlyBelow`).

### 4.21 Items 111–113 in the editor — the oasis, a town's past and its lines

#### 4.21.1 The oasis (item 111)

1. **The tool** (J-V9.128). T2 `ground`'s **Lake** mode carries the **Oasis** chip — the spring flag of §7.1's lake points form. With
   it on, the gesture is the lake's: one point, then drag up or down for the level; the point snaps to the hollows and
   fault lines S1 would choose (V09 §3.4's row). Mapper: `drawWater { kind: 'lake', from: { points: [p], levelCm, spring:
   true } }`; S1's oasis construction lays the spring-fed pond or small lake, its grove and its irrigated gardens (§2.3,
   §4.2 S1). Commit on Accept (it re-flows plots). The chip resets to off each time T2 is picked, like the Raised toggle.
2. **The ghost and badge.** The pool, its grove and its gardens ghosted with the short channels to each garden (§8.2);
   the badge reads "spring-fed pool {area} m² · {n} gardens · {k} households now near water", the last from the dry run's
   effects (`added`, `moved`), and lists the plots that re-flow. The level bends as a lake's (`bend.lake.level`).
3. **Anywhere, by hand.** An oasis may be drawn on any ground site — the arid chance is the generator's, not the tool's
   (item 111 (a), (d): "oases appear only on arid sites unless drawn"); on the Sky layer the chip is disabled with
   `disabled.skyWater`. An oasis is water for every rule that reads water (§2.3), so the dry run's effects list what its
   water pull and the prosperity water term move (§4.2 S3, §4.5).
4. **Removing one.** Delete on its water body (T10's delete, V09 §4.20.3 (1)) removes the pool with its spring, grove and
   gardens in one event, its effects listing what loses the water (`effect.water.lost`) and the quarters the pull no
   longer holds; a generated oasis's suppression holds by carry-over (§7.4's oasis row), its card `info.remove.holds`
   ("The town won't rebuild this oasis; undo brings it back."); a dossier-made oasis (DR40) is SettlementForge's and its
   delete is refused (`refuse.dossierOwned`). Its history row is "Removed the oasis {name}; the town won't rebuild it".
5. **Its handles and panel.** The level handle and the spring point's `knot` handle (V09 §3.5); the panel shows its area,
   its spring's flow ("full" or the share V06's failing spring left, `spring.flow`), its grove and gardens, and its why
   line: `decidedBy` "You placed it here", "The rules put it here" (S1's arid draw) or, for a dossier oasis, the `facts` row
   "SettlementForge's record names an oasis here" (DR40); the water pull's bars on the quarters around it are the why
   card's (V09 §2.7; V10's water-pull rows).
6. **History and hint.** "Made an oasis at {place}" (V09 §4.10); `hint.oasis` the first time the chip is on.
7. The bar is T-V9-71.

#### 4.21.2 The history option (item 113 (a) (1))

1. **The chip** (J-V9.129). T1's **Kind of place** sheet carries a **History** chip, standalone: **No past** (no `history`) · one
   chip **Once {a sizeWord}** per size word of V09 §4.5's T1 size chips whose population exceeds the town's present one
   ("Once a city", "Once a metropolis"), and behind More a **Founded about {n} years ago** stepper (default V11's
   `history.defaultAgeYears` for the present rung). A pick writes `adjust('blueprint.history', { ageYears, scars: [],
   peak: { rung, population, symbolic: false, evidence: ['blueprint'] } })` (§4.2 S0's history option, `HistoryHint`,
   §2.7), the peak's rung and population the size word's (its quantile of the rung table, J-V9.56); **No past** writes
   `adjust('blueprint.history', undefined)`.
2. **What it does.** The option is consumed at S0, so a change after a declaration is a Re-derive from S0 (§7.1): its
   whole-town ghost previews the town generated as its past and aged to the present by V06's replay (§4.11; V06 §3.20) —
   walls beyond the houses, old street lines kept as tracks, an oversized church — with the fates sheet and an auto
   restore point first (V09 §2.8), one undo step. In the empty state it replaces the untouched town as any T1 change does.
   The replay runs inside V06's generation budget; past 1 s the ghost shows the working ring (V09 §3.3).
3. **Where it is not offered.** In host mode the town's past is SettlementForge's (DR36–DR39): the chip shows the
   dossier's peak locked, "Set by {host}" (`HostSlots.lockedControls`). On a standalone neighbourhood document (V01's
   `product: 'hood'`) the chip is absent: such a document has no clock (V06 §4.1), and an `adjust` of `history` from the
   clerk or a skeleton bends to none with `bend.time.hoodAlone`. A build before M6-E (V06's replay engine) ships the chip
   hidden.
4. **History.** "Gave {town} a past: once {a sizeWord}" or "Took away {town}'s past" (V09 §4.10); the replay's epochs are
   the creation prefix's, drawn under their head and never undo targets (V09 §4.10).
5. The bar is T-V9-72.

#### 4.21.3 A past's lines (item 113 (a)–(c), (f))

1. **The report panel's "What its past left"** (V09 §5.7). When the document carries a `HistoryRecord` (§2.7), its rows
   by `report.past.<line>`: the peak ("Once {a sizeWord}, about {population} people, in year {year}"; a symbolic peak
   "Once {a tierWord}; its exact size is not recorded"), each refounding, each buried system ("The old town's streets lie
   buried under {district}", with **Show** on the buried system on Below), and the replay's epoch count. A document with
   no `HistoryRecord` shows no such section.
2. **The why card.** A fact laid by the replay under a symbolic peak carries the `symbolic` provenance (§2.8): its `facts`
   row shows `chip.symbolic` ("a size the record does not give"), and a thing whose oldest cause is a replay epoch reads
   "Built when the town was {a tierWord}, in year {year}" (V09 §2.7's `decidedBy`). Volume 10 tells the story from the
   same record (V10).
3. **The time card and chronicle** (V06 §5.1) list the replay's epochs as the town's first chronicle entries, under the
   history panel's head (V09 §4.10).
4. **The lost void's line** is V09 §4.17.3's.
5. The bar is T-V9-72.

## 5 Rendering, labels, exports — the screens and the dialogs

The map itself is drawn by §8 in the tile worker; the application composes its tiles in the map region and draws, on the
main thread, only screen-space marks: handles, the count badge, the bend line, the snap highlight, the raw stroke while
drawing, readouts and hints (§9.5). Panels and dialogs are DOM, styled by the tokens below.

### 5.1 The frame, and the chrome's own look

**The frame (wide layout, reference viewport 1 440 × 900 CSS px, §12.5).**

| region | place and size | holds |
|---|---|---|
| top bar | full width, 48 px | the town's title and tier word (click to rename: the `title` label, §9.5) and the seed chip; the file menu (New town, Open…, Save a copy, Export skeleton, Rebuild around my drawings, Recently deleted, Settings, About; in host mode Export skeleton, Rebuild around my drawings, Settings and About only, V09 §2.2's `fileMenu: false`); Undo, Redo; the panel menu (Report, History, Gazetteer, Names, Notes, People when the module holds people); Share; Export; Help (?); Assistant (AI) when a clerk is configured and on |
| tool rail | left, 72 px wide (a label under each icon at UI scale 1) | the five layer groups and their tools (V09 §4.2) |
| options strip | across the map's top, 44 px, only while a tool is active | the tool's mode chips and basic parameters, "More" (V09 §4.5) |
| map region | the rest; `role="application"` (§14) | the composed tiles, the overlays (V09 §5.3), the empty state's overlay, the variations tray, the refusal card, toasts at the bottom centre |
| context panel | right, 360 px, when something is selected or a panel is opened | selection tabs (V09 §4.4), or the report, history, gazetteer, names or dress panel |
| view bar | map's foot, 40 px | working layer (Ground · Sky · Below, V09 §4.2) with the Below and Sky groups; the Map group (rotate, plots only, detail; V09 §4.19); Show (thematic views, V09 §5.4); View as (V09 §4.8); the Light group (day or night, sun mode, height, season, weather) with the clock (V09 §4.18); layer toggles (§7.8); the ruler; the scale bar and zoom; V06's timeline bar docks above it when the town has history. Groups that do not fit fold into a "More" menu, in the order Map, Light, layers |
| drawer | right, 400 px, over the context panel | the clerk (V09 §4.11) |

Medium: the rail collapses to icons (52 px), the context panel and the drawer become sheets over the map's right edge,
the options strip wraps to two rows. Narrow: the rail becomes a bottom bar of the four first-screen tools plus "More" (a
sheet of the rest that the narrow layout allows), panels and the drawer are bottom sheets, the view bar folds into a
"Layers" button. **Chrome tokens** (our own values; the chrome is deliberately calmer than the map and never uses the
map's roles, so a tint on the map is never mistaken for a control):

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

Type: the system UI stack (`system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif`) at 13 / 15 / 18 / 22
px × the UI scale, line height 1.4; the map's labels stay in the bundled faces (§17.2), and T11's inline editor draws its
text in the label's own face and size so a rename is seen as it will print. A 4 px spacing grid; 6 px radius; no drop
shadows (rules instead). Icons: the twelve tools, the app-specific marks (ghost, badge, AI, tiers, working layers) and
the 45 family glyphs `fam.<family key>` (V11 §3.4's non-alias families; the seat that lands T6's stamp palette draws them
and writes the 45 family `icon` cells in the same change) are our own 24 px SVG sprite; a palette group or class card
whose row has no `icon` cell shows its label alone (`iconCell` is optional, V09 §2.3); generic glyphs (close, undo,
search, chevrons) come from one permissively licensed icon set imported through one adapter file and credited in the
notices (§17.4; J-V9.12). Motion: panels slide in 150 ms ease-out, the ghost fades in over 80 ms; the reduced-motion
preference (§14) removes both. Dark theme follows the system by default (`AppPrefs.theme`); the map's style is
independent of the chrome's theme (the `night` sheet is a map style, not a chrome setting), and so is the colour-vision
variant (`cvdVariant`, the map's only, V09 §5.12): the chrome tokens are checked for the three deficiencies as they are
(T-V9-21).

### 5.2 The empty state and a new town

The generated town fills the map region at §9.5's framing. Over it, top centre, a card on `chrome.surface` at 92 %
opacity: the line "Change anything: click it." (18 px), and three buttons — the dice **Surprise me**, **Choose a kind of
place**, **Open a town…**. Along the map's foot, above the view bar, the **Try another** strip: six 160 × 120 px proxy
thumbnails drawn in §8.5's distinct preview style with a "×" to dismiss the strip; hovering one shows its site and size
in words. The first click on the map, or any tool pick, closes the card; the strip stays until dismissed or the first
declaration. On narrow, the card is a bottom sheet and the strip scrolls sideways. A proxy thumbnail not yet drawn shows
its frame with the working ring; one that fails is left out of the strip.

### 5.3 The overlays: ghost, handles, badge, bend line, refusal card, snap, tray, hints

* **Ghost** — §8.2's `live.ghost`: the derived shape and the plots and buildings it would make or move in the style's ink
  at α 0.5; while `PreviewState.stale`, α 0.25 with the previous shape. Things the ghost would remove are drawn as a
  dashed outline; things it would move as the outline at the old place and the ghost at the new, joined by a thin arrow.
  The **effective scope** (§7.3 item 1), when larger than the drawn area, is a dotted outline labelled "also rebuilt".
  **Item 110's ghosts** (V09 §4.20): a retaining wall's line with short ticks on its low side and a stair or ramp mark at
  each way it crosses; a terrace's levelled area as a flat tint with its walls; a raised way drawn above the ground's ghost
  with its supports' footprints, a small bridge mark at each way it crosses without a junction, its ramps or stairs at
  both ends, an aqueduct's arch mark where it passes a wall and its buried stretches dashed; a pier's, quay's or bridge's
  deck plots as faint outlines along the deck; a removed thing dashed, with its detour and new crossings ghosted. **An
  oasis's ghost** (V09 §4.21.1): the pool, its grove and gardens and their channels. A preview whose result holds no
  geometry (an `adjust` of a view-only path, a lock) draws no ghost, only the badge.
* **Handles** — 12 px circles (22 px under a coarse pointer, with a 44 px hit area) in `chrome.surface` with a 2 px
  `chrome.accent` ring; the focused handle filled accent; a gate grip is a bar across the trace; a level handle a vertical
  double arrow. "More handles" is a small "+" beside the shape's handle set.
* **Count badge** — a pill at the ghost's anchor (§8.2's badge anchor): "42 plots · 180 households · 38 buildings", the
  tool's extras after a dot (V09 §4.5), then fate counts when any are not kept ("3 of your changes move"), then "and {n}
  other changes" with **Show** when the preview lists effects (V09 §4.20.7), with − and + buttons when the draft has
  `plusMinus`; below it, the bend line (`mark.bend` rule, 13 px text) or the one-line reason. A figure that is zero is
  left out ("12 plots" with no households). While drawing, a **readout** follows the pointer (length, area, height,
  slope; R4).
* **Pending ghost's buttons** — Accept (Enter) and Cancel (Esc) under the badge.
* **Refusal card** — a card at the draft's last point with a `mark.refusal` left rule, the catalogue's text and one
  button per offered action; it closes when the draft changes or on Esc. It is never modal. A draft whose last point lies
  outside the view anchors the card at the view's nearest edge, with an arrow toward the point.
* **Snap highlight** — the candidate edge stroked 3 px in `mark.snap`, a 12 px label of its role beside the pointer.
* **Variations tray** — three 160 × 120 px thumbnails over the map's foot, the focused one ringed, "Show three more", and
  the declared-things line (V09 §3.6).
* **Toasts** — bottom centre, one at a time, 6 s (the Undo button extends it while hovered), stacked into a count when
  several arrive ("3 changes applied").
* **First-use hints** — a small callout anchored to the tool's button or to the ghost, with the hint's text and "Got
  it"; it completes (`AppPrefs.hintsDone`) when the user performs the gesture or presses Got it, and never reappears.

### 5.4 The thematic views — Show: prosperity, shade, supply links and the rest

The view bar's **Show** menu sets the per-viewer view key `thematic`: **None**; **Wealth** (§8.2's thematic row keyed by
`prosperity`); **Shade** (below); **Supply links** (below); **Quarters** (the identity tint, item 72); **Uses** (the
use-keyed row, knowledge-filtered, §8.2); **Who knows** (tints places by `knownTo`: public, local, secret — shown only to
a `secret` view); **Coverage** (for a selected class, each district or catchment tinted by whether it holds a member —
"one in every district" gaps shown, from V01's `catchmentOf` over the class's `CoverageSpec`; `live.coverage`, overlay);
**Voids** (the footprints of the underground's systems projected on the ground, each named with the districts above it,
V01's `districtsAbove`; `live.voids`, overlay; knowledge-filtered, a sealed void only under `showUnexcavated`);
**SettlementForge's chains** (V08 §5.2's `supplyChains` view: each chain drawn, labelled and listed by V08 §5.2's
`CustomChainRecord` row; offered only while that row lists a chain in the gazetteer, which the shell reads by
`query({ kind: 'gazetteer', kinds: ['customChain'] })` at the view's effective key after each load and each commit —
while none is listed the entry is hidden and a stored `supplyChains` value draws nothing and reads as None; its drawing
cost is V08 §6's; J-V9.105). One thematic view at a time; the legend for it sits in the map's lower left, listing only
the values drawn, each with its second cue (§8.2, §9.5).

**The second cue of every view** (item 112 (a); §8.2's table where the meaning is the base's). No meaning rests on hue
alone: **Wealth** — §8.2's hatch density by band; **Quarters** — the district's name label and the boundary's line style
at a tint change (§8.2); **Uses** — each use family's glyph `fam.<family key>` (V09 §5.1) at the use's anchor; **Who
knows** — the outline's line style (`local` dashed, `secret` dotted; §8.2); **Coverage** — a gap district hatched, a
covered one plain; **Voids** — the system's program glyph (§8.2's underground cue); **Supply links** — the goods family
by its dash pattern (below); **Shade** — darkness, not hue, with its readout; **SettlementForge's chains** — V08 §5.2's
row. The cues draw in the thematic views and at the legend-bearing zoom stops (§8.2); with `cvdVariant` set, every
provider's colours — `live.shade`, `live.links`, `live.coverage`, `live.voids` included — take the sheet's checked
variant (§8.2's loader, the variant in the tile key).

**Shade** (item 102 (f)) is a `base` live-layer provider, `live.shade` (item 411): it reads the daylight-share raster
(V09 §2.7) and draws each field cell as a translucent veil over the ground and blocks — six steps of the style's ink at α
0 / 0.08 / 0.16 / 0.24 / 0.32 / 0.40 for shade shares 0–10 / 10–25 / 25–40 / 40–55 / 55–70 / 70–100 % of the day (our own
steps) — under the buildings' fills, so streets and yards read darker where they lie long in shade; the veil is this
volume's alone. Over it the view draws V05's rows as V05 states them (V05 §5.1; J-V9.53): each island's held strip
(`sky.island.shadeStrip`) as one solid ink line round the cells it shades for at least three of the nine sun samples,
labelled with the island's name, and, while an island has moved since its shade was last brought up to date,
`sky.island.shadePending` as a dashed line — so the veil's steps say how much of the day, the solid line whose shadow it
is, and the dashed line where it will move. The legend reads "Shade through the day" with the six steps, then "Under
{island}'s shadow for a third of the day or more" (solid) and "Where {island}'s shadow will move" (dashed), with **Update
shade now** (V05's `regenerate { kind: 'shade', island }`) beside a pending island's entry. Hovering reads "In shade {p} %
of the day" in the readout, and the "Why here?" card of anything in a shaded cell includes the shade row (V09 §5.8). The
provider is a `base` target, so it is part of the tile key (§8.8) and redraws only when the field or the view changes; it
never changes the field. A town with no caster draws an empty veil and its legend's steps.

**Supply links** (item 105 (j)) is an `overlay` live-layer provider, `live.links` (item 411), fed by `query({ kind:
'links', region })` (V09 §2.7): each link a quadratic curve from provider to consumer (its control point offset
perpendicular to the chord by 15 % of its length, always to the left of the provider → consumer direction), 1–4 px wide
by the good's volume. **One channel per cue** (J-V9.127): the goods family is the line's colour from the thematic palette
in key order **and** its dash pattern (five patterns, one per family, solid for the first); a satisfaction below 1
(beyond the comfortable distance, item 107 (b)) is a **hollow arrowhead** at 60 % of the line's length (a satisfied link's
arrowhead filled); an impaired or at-risk SettlementForge chain's links are drawn at **half width** (item 105 (i)); an
entrepôt's end carries a small square; a kept link a pin dot at the consumer end; a cut or avoided link a crossed stub,
shown only while its consumer is selected. Dashing never carries a second meaning. With nothing selected, at the city
band, the 150 highest-volume links in view are drawn at 50 % opacity; at the district band and finer, every link in view
up to 400 (the busiest first; the legend says "the 400 busiest of {n}"). With a use selected, only its links and its
partners' are drawn, at full opacity. The legend lists the goods drawn with their patterns and names the half-width and
hollow-arrowhead cues. A link whose end the key withholds is drawn to the plot without a name; a concealed use's links are
not drawn (the query filters them, §11.2). The links come from the generation worker's link cache (V09 §3.15).

**Show the whole circuit** (item 106 (g); J-V9.54) is an option of the wall layer, `LayerSpec.showCircuit` (§8.4, item
413), toggled in the layer toggles and in T3's options: while it is on, S14 draws every committed enceinte's barrier arcs —
the stretches a cliff, gorge, marsh or shore closes — as a faint dashed line along the barrier with a small tick at each
anchor, so the enclosure reads whole after commit, not only in the wall tool's ghost. It serves the town and the village
products alike (V07 §5's palisade relies on it). A town with no enceinte draws nothing.

### 5.5 The fates sheet — confirming what moves

An action that returns `confirm` (§11.2) — a Re-derive, an Adjust of an early parameter, a regeneration over protected
things, discard-edits-in-scope, a town-wide New names, a pack change — opens the **fates sheet** (a sheet over the map,
never a blocking modal: the map stays pannable and every listed row can be shown). Its head: the action in words and the
counts per fate in plain words ("12 stay as you made them · 3 move with their new surroundings · 1 loses what it was
attached to"). Its body: the rows grouped by fate (`fates` paged by `query({ kind: 'fates' })` beyond 1 000, virtualised),
each with the thing's name, its kind and **Show**; then the renames, old and new text side by side; then **What else
changes** — the preview's effects (item 465) grouped by kind, each row its `effect.*` sentence with **Show**, paged with
the fates, and a suppressing removal's `info.remove.holds` line at the head of the section (V09 §4.20.7). A group with no
row is left out. Its foot: **Do it** (sends `confirm(h, token, fates, renames)`) and **Cancel** (`cancel(h, token)`); an
auto restore point is written before a whole-town action (V09 §2.8). A stale token re-opens the sheet with the fresh list
and "Something changed while you were deciding" (V09 §3.14). All renames are confirmed as a set (J-V9.8); a user who wants
an old name back renames it afterwards. A T1 Re-derive reaches this sheet only after its whole-town ghost has been
accepted (V09 §3.3), never before a picture.

### 5.6 The history panel and the timeline

The history panel (V09 §4.10) opens in the context panel's place (H, or the clock icon in the top bar): the restore-point
chips across its head, the filter chips, in host mode the host's group "The party" at the head of the rows, the
day-grouped rows, the orphans section at the end, and, with epochs, the "Chronicle" tab. V06's timeline bar docks above the
view bar when the town has history (V06 §5.1): its thumb and the history panel scroll together — scrubbing to a week
scrolls the panel to that week's rows — and while the thumb is off "now" the editing tools are disabled with V06's
"viewing the past" band.

### 5.7 The other panels

* **Report** (§5.4, the "i" button in the top bar, and a dot on it when something was delivered simplified or left out):
  "What you asked for" — each requested feature with "made in full", "made simpler" or "left out" and its cause in words;
  "Couldn't place" — `unplaced` and `unserved` with Show; for a dossier-bound town, the placement state
  (`GenerationReport.dossier`, each entry by its `report.dossier.<state>` row with Show) and, under
  `host.group.standing` ("How the map reads SettlementForge's record"), the standing notes (`GenerationReport.dossierNotes`,
  V08 §4.6; item 390), each line as V09 §4.10's note lines — its `msg` by the catalogue, **Show** on its `keys`' addresses
  (item 583), a line with a withheld target not drawn; "What its past left" — V09 §4.21.3's `report.past.*` lines when the
  document carries a `HistoryRecord`; "What moved" — the `changes` entries newest first, each by its `report.moved.<kind>`
  row — in both lists each `{ id }` argument rendered under `effectiveKey()` as V09 §4.10's report-entry lines render
  theirs, a withheld one as its kind word and never a **Show** target; "Details" (collapsed) — the ladder uses with their
  replay keys, the kernel warnings, the stage timings (telemetry). A section with nothing to list is left out.
* **Gazetteer and "features in view"** (§14, §11.2): a search field and kind chips (districts, quarters, streets,
  buildings, institutions, people, water); rows with name, kind, district and a tier chip; selecting a row selects on the
  map and the reverse; withheld places show as "an unnamed {kind}" (§11.2 *Knowledge*); a collective record shows its
  member count (V09 §4.7); the people chip opens the People panel (V09 §4.18). A search with no match reads "Nothing here
  is called {words}."
* **Notes** (the panel menu): favourites, the user's private notes, the public notes and the pins (V09 §4.19), each row
  with Show; "Add a pin"; a pin's label, note and colour edited in place.
* **Names** (T11's panel): the town's names by kind with rename in place, "New names" with its scope, the packs and a
  user's own name list (§10.4), the region groups, the leader-line switch (§9.4).
* **Dress** (T12's panel): style cards (a 120 px render of the current view in each style, drawn by the tile worker at the
  city band), the tint toggle, the **Colour vision** chip (V09 §5.12), the furniture tray (each a toggle; dragging an item
  on the map places it; view state, §9.5), light, ground texture, lights, underlay; the grid, legend, emblem and compass
  controls (V09 §4.19); **New trees** and **New decoration** (V09 §4.5's T12 row); for the viewer role the style cards
  write the viewer's own `stylePreset`, never the town's style; **Edit this style…** opens the style dialog (§8.2's sheet
  rows by role, a colour picker per role with the contrast matrix's warning when a pair falls below its bar, and in each
  checked variant the style check's warning when a legend pair falls below `cvd.minDeltaE2000`, §13.2).
* **Advanced, tables, presets** — V09 §4.14.
* **Close-up** (V01's panel for an opened district) and **plan** (V03's plan panel, the storey switcher beside the
  building) render inside the context panel's district and building tabs.

### 5.8 The "Why here?" card

A `WhyCardModel` (V09 §2.7, projected from volume 10's `WhyAnswer`) renders as: the subject's name with its tier chip; the
`decidedBy` line; the **bars** — each a plain sentence with a horizontal bar whose length is its share against the
largest in the answer and whose side (left a push away, right a pull toward) is its sign, the target named and clickable
(**Show**), then "and {more} smaller reasons"; for a district, block or plot the **drivers** of its wealth as bars — the
shade among them, "In shade {p} % of the day" (item 102 (f)), and in arid country the water term, "Near {water}: {m} m"
(item 111); for a wall the **closure** lines ("The cliff closes the circuit from north-east to south-east", item 106
(g)); the **links** as "Buys {good} from {provider} ({m} m, near enough)" and "Sells {good} to {consumer}", with the
orientation in words and a split pair's other half; a record's **members**; the **profile chips** with their sources
(V09 §4.7); the **alternatives** as "Other sites it considered", each drawn on the map as a faint numbered outline while
the card is open; the **facts** with their tier chips and derivation rows, a symbolic one with `chip.symbolic`; the
**dossier line** "Since week {w}: {reason}"; "Today the rules would put it elsewhere; it stays." when `drifted`; then the
**sections** (V09 §2.7), each under its title (`why.section.<kind>`) with its rows as plain sentences, their values in the
user's units, tier chips and Show on a row's target — for an underground element its depth, excavation reading and ways
down (the `underground` rows, V09 §4.17.3's lines among them), and for item 110's records their `raised` rows and lines
(V09 §4.20.6). A withheld target reads "somewhere the viewer doesn't know" (§11.2). **Ask the assistant** at the card's
foot (hidden without an enabled clerk) sends the card's question with its `WhyAnswer` on V10's `why` entry (V09 §4.11).
The card is a non-modal panel; it answers within V09 §6.3's budget.

### 5.9 Onboarding and help

* **First-use hints** — V09 §5.3; the order of appearance: T1's on the empty state's card, T5, T6 and T12's the first time
  each is picked, the others likewise, `hint.variations` on the first tray, `hint.restore` the first time the history
  panel opens, `hint.links` and `hint.shade` on the first use of those views, `hint.clerk` in the drawer's empty state,
  `hint.raised` the first time T4's Raised is turned on, `hint.below` the first time a click lands on a stack of more than
  one mark (V09 §4.20.8) and `hint.oasis` the first time T2's Oasis chip is on.
* **The guided first town** — offered once, on the empty state's second visit or from Help ("Show me around"), never
  forced and never re-offered once dismissed (`AppPrefs.tourOffered`): six steps of about 30 s each, each waiting for the
  user's own gesture — (1) click a building ("Every thing has a card"), (2) pick T5, drop one seed ("Paint a district"),
  (3) press + on the badge and Accept, (4) T6: drop a tavern near a gate, (5) T10: New random on a block and pick a version
  ("What you made stays"), (6) T12: pick a style and add a compass. Each step's hint completes that tool's first-use hint.
  On narrow, step (2) uses T5's seed and step (3) its plus on the badge, both offered there.
* **Context help** (§14): every control's "?" opens its `@plat/docs` page in a side sheet; the keymap overlay (?) lists
  the current bindings, the user's overrides marked.
* **How do I …?** — Help's entry for asking the assistant, shown only when a clerk is configured and on: it opens the
  drawer on V10's `help` entry (V09 §4.11). Without a clerk, Help keeps its context help and the guided first town.

### 5.10 The export dialogs

One **Export** dialog (E, or the top bar) with five families as tabs; each tab's options are the format's §11.1 options in
plain words, with defaults that make the common case one click. Every tab shows, before anything is written, a **preview**
of the frame (a small render with the crop and, for VTT, the grid), the **estimate** ("about 12 MB, about 6 seconds"),
what the file shows ("What it shows: everything | what locals know | what anyone knows", and "what the players know"
while a host's players' view is set; by default the view's effective key, V09 §2.10, so "View as" carries into the file;
lowered only; item 453), and for a town with history the **year** it draws (V06 §5.3). **Export** runs V09 §3.10.

| tab | formats | options (defaults first) | file name |
|---|---|---|---|
| **Picture** | PNG (default), SVG (raised parts in their own group `layer.ground.raised`, item 447) | frame: current view · whole town (§9.5's framing) · a district · the selection · draw a rectangle; size: screen (the view × 2) · A4 · A3 · A2 at 300 dpi (§11.1's print presets) · custom pixels; SVG text as outlines (default) or editable text; band: city (default) · district (with its size estimate, §11.1); light: as shown now (default; §8.4's fixed sun where the view uses the cursor) · fixed sun · the sun at an hour · night; colours: as on screen (the view's `cvdVariant`, default) · usual; background: paper · transparent; one PNG per layer (written as one `.zip`; the raised parts are their own PNG, so a user can drop the decks to see under them); furniture on · off; pins and public notes on · off (off by default); hidden caves and ruins (offered only at `secret` with the view's toggle on, V09 §4.17.1); **Animated history** (APNG; offered when the town has history, V06 §5.3): a stride of every epoch (default) or every N years, each frame captioned with its year, 2 frames a second, the frame size the picture's, capped at 100 MB by doubling the stride until it fits (the dialog says so) | `{town}-{frame}.png`, `.svg` or `.zip`; `{town}-history.png` |
| **Tabletop** | Universal VTT `.dd2vtt` (default), Foundry scene JSON | scope: the current view snapped to whole squares (default) · a district · draw a rectangle · a building's storeys (when its plan exists); the square: 5 ft = 1.5 m (default) or 1 m; pixels per square: 70 · 100 (default) · 140 · 200; the layer: ground · a sky island · below (a depth band) · a storey · a raised way's deck (picked on the map or from a list of those in scope; item 447); light: day (fixed sun) · night; "Also save a plain picture for grid-by-name tabletops" (off) | `{town}-{scope}-{cols}x{rows}.dd2vtt` |
| **Map data** | GeoJSON (default), GeoJSON in metres | where on Earth: "No real place" (0°, 0°, the default) · latitude, longitude and the turn of north (§11.1's geo anchor, remembered per town in `exportAnchor`); trees: one group per wood (default) · one per tree · none; layers: checkboxes by model layer, with "Raised ways" and "Retaining walls" (both on; item 447); include supply links (on when the link view is on) | `{town}.geojson` · `{town}.metric.geojson` + its sidecar |
| **3-D** | glTF binary (default), OBJ, CityJSON | scope: whole town · a district · the selection; terrain, trees and lights on · off; for CityJSON the geo anchor; raised ways, their supports and vaults, and retaining walls as item 447 writes them | `{town}.glb` · `.obj` · `.city.json` |
| **Files** | the town (`.plat`), a skeleton, statistics CSV (statistics, people, buildings), with history `chronicle.csv` and `uses-history.csv` (V06 §5.3), the full JSON, the compact twin, **Assistant conversation (JSON)** (V10 §5.3's transcript, with or without the user's messages; offered when a clerk session exists) | — (the full JSON, the `.plat` and the compact twin are offered only at the `secret` tier, §11.1) | `{town}.plat` · `{town}.skeleton.plat` · `{town}-{table}.csv` · `{town}-chronicle.csv` · `{town}-uses-history.csv` · `{town}.json` · `{town}.cbor` · `{town}.plat-clerk.json` |

**The tabletop details (R18; `research/ux/tool-survey.md` E4; item 454).** The scene exporter writes windows as open
portals (`closed: false`) and doors as closed ones, light colours as eight-digit colours with the alpha first, the grid
before the walls in a Foundry scene, and — when asked — the plain picture named `{cols}x{rows}` for tabletops that read
the grid from the file name. A retaining wall joins a scene's line of sight by §11.1's one VTT rule (its derived step at
least `vtt.retainingMinCm`, broken over stair and ramp intervals), raised supports' footprints as cliffs do. When the
scope passes the scene cap (8 192 px a side, §11.1) the dialog shows the grid of scenes it will write, as numbered tiles
over the preview, and offers the pixels per square that would fit one scene (never below 50, §11.1); it also writes,
checked by default, an **overview**: one PNG of the whole scope at 1 024 px on its long side with the scene grid drawn and
each scene's number in its corner, named `{town}-{scope}-overview.png` (`research/ux/tool-survey.md` E4 (4)). **Raised
decks** (item 447): a ground-scene export whose scope crosses raised ways also writes one deck scene per raised way (at
most the deck scenes' cap, V09 §4.20's constants table, the longest first, and the dialog says "{n} raised ways in scope;
writing the {cap} longest"), named `{town}-{scope}-deck-{way}.dd2vtt` at the deck's mean elevation; the estimate counts
them, and a Foundry scene writes each as one more level with its elevation band. `{town}` is the town's name, lower-case
ASCII with hyphens (a name with no ASCII letters falls back to "town-{seed}"); `{frame}` and `{scope}` are "view", "town",
the district's name, "selection", "area" or the building's name. A scope that holds nothing to export (an empty
rectangle) disables **Export** with "Nothing in this area to export."

### 5.11 The share sheet

**Share** in the top bar: (1) **Link** — the permalink with Copy when §6.4 allows one; otherwise the reason in words
(`share.*`, V09 §4.9) and **Download the town file**, plus "a short link from your changes" when the inline log of §11.5
fits; (2) **Picture** — one PNG of the current view, "What it shows" defaulting to **what anyone knows** in this sheet (a
shared picture should not reveal secrets by accident; J-V9.13), changeable; (3) **Skeleton** — the declared subset, for
another person to build their own version from. A host that configures a publishing `DocResolver` adds (4) "Publish a
link" (§11.5); the standalone app has none.

### 5.12 Settings

Settings opens from the file menu's **Settings** in both modes — host mode keeps it (V09 §2.2's `fileMenu: false`) — and
at its Assistant section from the clerk's `openSettings` (V09 §4.11; V09 §3.14's clerk row). Sections, each with Reset:
**General** — units (metric · imperial), theme (system · light · dark), UI scale (100–200 %), **Colour vision** (usual ·
red-weak · green-weak · blue-weak: the per-viewer view key `cvdVariant`, §8.2; item 112 (a); J-V9.130), and the interface
language — in host mode the host's (§11.3), standalone the browser's language where a shipped locale has it, the shipped
locales following SettlementForge's decision on interface languages (J121), English the catalogue's source. **New towns**
— the `generation` preferences folded into a new document (§7.6): style, size, name packs, labels on; "Apply my current
preferences to this town" (V09 §4.14). **Editing** — snap radius (4–24 px), handles (fewer · default · more), "Show three
more" page size (fixed at three; not a setting), the §13.4 fallbacks when the tests switch them on (keep / change toggle on
re-rolls; touch editing of the fabric). **Assistant** — rendered from and written to `ClerkSettings` (V10 §2.2) through
`ClerkHandle.settings` / `setSettings`, the one store (J-V9.34), and not shown when the host's `clerkMode` is `off` or
`host` (the card-only drawer has no settings): on · off; where the configuration asks for a user key, the key — a masked
field with **Remember on this device** and V10's warning that anything running on this site can read a remembered key,
and **Forget key**, with its last verdict (`keyState`) worded as on the key card (V09 §4.11); **Keep history** (off by
default: conversations stay in memory); the monthly cap and the per-turn cap in US dollars where the configuration lets
the user set them; preview first (default) · apply then undo (V10 §4.4); the data notice with the date it was accepted and
**Read it again**; **Problems found** — the device's defect records (`ClerkHandle.defects()`, V10 §2.8), one line each with
its date and its kind in words (`clerk.defect.<kind>`), with **Save as file** (JSON) and **Clear** (`clearDefects`), or
`clerk.defects.none`; in host mode the fields the host forces are shown locked with `host.locked` ("Set by {host}", read
with `HostSlots.hostName`). **Accessibility** — reduced motion (system · on · off), high-contrast chrome, large targets,
the long press (300–1 000 ms), "announce previews" (the live region, V09 §6.3, on by default). **Keyboard** — the keymap
with rebinding (§14). **Storage** (standalone only: host mode has no local store, V09 §3.8 (6)) — the local towns with
their sizes and last-opened dates; **Delete** moves a town to **Recently deleted** (J-V9.51), where it stays 30 days with
its snapshot and journal, listed with its deletion date, **Restore** and **Delete now**; "Download all my towns" (a `.zip`
of `.plat` files). **History** — the history store's memory and the frames kept in memory (`AppPrefs.history`, their
defaults and ranges V06 §2.2's device settings), which change what is cached, never what is drawn. **About** — the
generator version, the output version and the schema version (§6.4), the notices of every bundled library (§17.4), the
fonts' licences (§17.2), and the sentence "Your towns stay on this computer unless you export or share them."

### 5.13 Open, recent and new

**Open a town…** (ctrl / cmd+O): a grid of the recent towns (thumbnail, title, tier word, last opened, size), sorted by
last opened — with none, "No towns yet" and **New town**; **Open a file…** (the OS picker, `.plat`, `.cbor`, skeletons);
**Paste a link**. Drag-and-drop of a file anywhere on the window opens it (an image offers "Trace over this image?" as an
underlay). **New town** opens the empty state in a new document. A town opened from a file is added to the local store on
its first edit (so opening a file to look at it writes nothing). A recent town written by a newer application opens
read-only (V09 §3.1 (3) (c)).

### 5.14 Labels in the application

Map labels are §9's; the application adds no label entity. T11's inline editor opens over the label at the label's own
face, size and curve (the per-glyph positions S13b computed, §9.2) so the typed text is seen in place; Enter commits
`setAttr(name)` (or `displayText` for a dossier-owned name, §9.1), Esc cancels; a longer name re-flows by S13b after the
commit; an empty name is not committed ("A name can't be empty; Esc keeps the old one."). **T11 on a raised way** edits
that way's name: the click takes the top of the hit stack and a second click the way beneath, so a viaduct and the street
under it keep separate names (V09 §4.20.8); an aqueduct is named as any way is, by §9's way names or by typing; the
placement is §9's. Region groups are created by selecting quarters and **Name as region**; their labels draw at the city
band above the city cut (§9.1). The chrome's own text (buttons, panels, messages) is DOM text from the catalogue and never
enters the map's label engine.

### 5.15 Every new thing: drawn, labelled, exported, persisted

| thing (V09 §) | drawn | labelled | exported | persisted |
|---|---|---|---|---|
| `siting.declared`, `siting.linkEdits` rows (2.6; V11's tables) | through their effects: the link view's pin dots and crossed stubs; nothing else of their own | in the why card's chips ("yours"), the per-kind panel and the Links tab | as the document's override layer in the `.plat` and the skeleton (V11 §4.2); GeoJSON carries `plat:links` (the use's declared link rows) on the use's building features | the log (`editTable` events) |
| link rows (2.7; derived) | `live.links` (5.4) | the legend by good with its pattern; the Link card | GeoJSON: with "include supply links", one LineString per link in view scope, `kind: 'supplyLink'`, `good`, `consumer`, `provider`, `satisfaction`, `declared` | never (recomputed, item 105 (a)) |
| the shade raster (2.7; derived) | `live.shade` (5.4) | the legend; the readout | a picture export while Shade is on draws it (a base live layer in the tile key, §11.1's live layers named in the export's layer set) | never (the field's driver, recomputed on load) |
| a record's members (4.7; `EntityCard.members`) | outlines while a record is selected | the panel's list | the members are ordinary buildings in every export | the model (their buildings) |
| restore points (2.8) | chips in the history panel | their names | inside the `.plat`'s view section only | the document's view section |
| `showUnexcavated` (4.17.1) | V04's unexcavated program while on, at `secret` | the legend's "Not yet found by anyone in town" | a picture at `secret` with it on; never below `secret` | the view section, per viewer |
| `cvdVariant` (5.12) | the sheet's checked variant and the second cues (§8.2) | the legend's cues (§9.5) | a picture "as on screen" (5.10) | the view section, per viewer |
| the ways down's causes (4.17.3) | the access symbol by cause; "Show the way in" as `live.selection` | the panel's lines | GeoJSON's `cause` on every access and link (V04 §5.5) | the model (V04's records) |
| a lost void (4.17.3) | the unexcavated program, faded (V04 §5.2), for the keys its `knownTo` admits | its label marked "once known" (V04 §5.4); `info.under.lost`; the legend's "Once known; no way in now" | GeoJSON's `excavation: 'lost'` (V04 §5.5) | the model (`ExcavationRecord`, V04 §2.2) |
| the catacomb, crypt and cemetery panels (4.17.5) | the extent chart; the ossuary fill by V04's program | the panels' sentences | GeoJSON's complex feature (V04 §5.5) | the model (V04's and V03's records) |
| `live.coverage`, `live.voids` (5.4) | overlay tints and outlines, with their second cues | the legend | a picture while the view is on | never (derived) |
| the Show menu's **SettlementForge's chains** (5.4) | V08 §5.2's `supplyChains` thematic row while `thematic` is `supplyChains` | the legend and the gazetteer by V08 §5.2's row | GeoJSON: V08 §5.2's `supplyChain` LineStrings, under its knowledge rule; a picture while the view is on | never, but the per-viewer view key `thematic` (the records are V08's, in the model) |
| `LayerSpec.showCircuit` (5.4) | barrier arcs dashed with anchor ticks | — | pictures draw it while on | the style's layer spec (`setLayer`, logged) |
| the People panel, the family tree, where-is pins (4.18) | panels; home and work outlines; a pin | the panels' rows | the people CSV (§11.1) | never (queries) |
| notes, pins, favourites (4.19) | pins as markers with their colour; notes in panels | a pin's label | public notes and pins inside the `.plat`'s view section; never in pictures unless "Show pins" is on in the Picture tab | the view section |
| Recently deleted (2.11) | the Storage section and the file menu's list | the town's title | "Restore", then any export | IndexedDB, 30 days |
| drafts, previews, variations (2.4) | the ghost, tray, badge | the badge | never | never (the draft mirror only, locally) |
| the message catalogue, `toolkit.json` (2.3, 2.9) | the chrome | — | `@plat/docs` generates the tools' and messages' guide pages from them — the messages page with one anchor per row, `messages#<key>` (the `page` a `why` carries for a row: V10 §3.5 step 3's default target), and one page per staged layer §7.3 item 9 (d)'s F-EDIT can name, `staged/<layerId>` (what the layer is and the milestone that ships it, from the base's staged table; `refuse.staged`'s `page`) | `@plat/tables` |
| preferences and the local store (2.11) | the settings screen | — | "Download all my towns" | IndexedDB |
| item 110's ghosts, handles and badges (4.20) | the ghost's marks of 5.3; the `rampEnd`, `terraceLevel`, `tierStep` and `shrineInset` handles | the badge's lines | never | never (session) |
| the effects list (4.20.7) | the badge's count; the fates sheet's "What else changes"; the clerk's card | the `effect.*` rows | never | never (per preview) |
| the hit stack and part selection (4.20.8) | the selection outline of the entry chosen | the context menu's "Select below: {name}" | never | never (session) |
| retaining walls, raised ways, spans, arch vaults, deck plots and tiers (the base's and volumes 2 and 4's records, as V09 §4.20 edits them) | §8 (the low-side ticks and shadow, the raised part above ground part 0 with its shadow) | §9 (a raised way is labelled like any way; T11) | GeoJSON, SVG, PNG, VTT (a deck scene per raised way), glTF and CityJSON by item 447 | the model; their edits in the log |
| a removal's suppression (4.20.3) | nothing (the thing is gone); the history row's dashed former outline while hovered | the history row and `info.remove.holds` | the skeleton's removals (item 455) | the log (item 260's `detail.suppress`) |
| an oasis (4.21.1; §2.3's records) | §8.2's water, grove and garden rows with the channels | §9's water label | every export as water, greenery and land use (§11.1) | the model; its edits in the log |
| a town's past (4.21.2–4.21.3; `HistoryRecord`) | through the replayed fabric (walls, tracks, ruins, buried systems) | the report panel's `report.past.*` lines; `chip.symbolic` | the replay's ruins and buried systems as any ruin or system; the `.plat` carries the record | the model (`HistoryRecord`, the creation prefix's epochs) |
| the second fixture's canvas script (7.2) | — | — | the test tree | the test tree |

## 6 Performance budgets

All figures are for the reference machine and viewport of §12.1 and §12.5 (1 440 × 900 CSS px at device pixel ratio 2),
p95, PLAUSIBLE until measured at the milestones of V09 §8; the model-side costs they add up are §12.3–§12.7's, cited, never
restated as new laws. METROPOLIS takes the same scoped budgets within ± 20 % (§12.6's scope invariance) except where a row
below names its own METROPOLIS figure (T1's Re-derive and T12's re-raster follow whole-town laws); TOWN takes them or
less.

### 6.1 The gesture-to-ghost latency budget

Four latencies, each measured by the shell's telemetry (`Draft.startedAt`, `PreviewState.requestedAt` / `receivedAt`,
the compose time) and never saved:

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
| T2 Oasis — a lake's basin fill with S1's oasis construction and the water pull's re-plot of its plots (V09 §4.21.1) | ≤ 90 ms at CITY; ≤ 110 ms at METROPOLIS | ≤ 210 ms; else preview on release |
| T8 fill — three variations of a quarter (three overlays run on three derivation-pool workers, ≈ one scope's cost; thumbnails ≤ 3 × 15 ms in the tile worker) | ≤ 70 ms (ghost); ≤ 120 ms (tray) | ≤ 190 ms (ghost); ≤ 240 ms (tray) |
| T7 roster — one solve of N lines (≤ 30 ms + 25 ms per line at CITY) | ≤ 30 + 25 N ms | 20 lines ≤ 650 ms (the "working" ring shows past 1 s, V09 §3.14) |
| T10 hold — a block's New random with variations | ≤ 40 ms | ≤ 160 ms |
| T12 dress — a style change (the view's re-raster, §12.5's settle); a colour-vision change the same | ≤ 150 ms at CITY; ≤ 250 ms at METROPOLIS (§12.5's METROPOLIS settle) | — (at once on click) |
| T9 family strip — F feasible families, each a single-plot dry run (≤ 5 ms model + ≤ 2 ms deltas, §12.6) on the derivation pool's ≤ 4 workers, then F thumbnails at ≤ 15 ms each in the tile worker | ⌈F ÷ 4⌉ × 7 ms + F × 15 ms: ≤ 134 ms for F = 8 | the strip complete ≤ 150 ms after the building is selected (its thumbnails appear as they land) |
| T1 intend — in the empty state, a new town (§12.5's first-map law); after a declaration, a Re-derive's whole-town ghost (§12.3's model law from the named stage; with the History chip, the replay inside V06's generation budget) | ≤ the law + 16 ms compose | the working ring past 1 s; the ghost at the law's figure (V09 §3.3) |
| T4 with Raised or Aqueduct — a course of L km over built land (the course solver, the supports, the strip's re-plot, the vaults offered; V09 §4.20.2) | ≤ 60 ms + 60 ms per km at CITY; the same law at METROPOLIS, the working ring past 1 s | ≤ 180 ms + 60 ms per km; a course over `raised.previewOnReleaseKm` previews on release (V09 §3.14) |
| T3 Retaining wall (V09 §4.20.1) | as T3's row: ≤ 110 ms | ≤ 230 ms |
| T2 Terrace — the levelling of ≤ 60 plots and its edge walls (V09 §4.20.1) | ≤ 90 ms at CITY; ≤ 110 ms at METROPOLIS | ≤ 210 ms; else preview on release |
| Delete of a generated raised way — the detour's re-route, the freed land, the vaults (V09 §4.20.3) | ≤ 120 ms at CITY; ≤ 60 ms + 60 ms per km at METROPOLIS | ≤ 240 ms at CITY, the working ring past 1 s; nothing commits before Accept |
| T6 on a deck plot (V09 §4.20.4) | as T6's row: ≤ 56 ms | ≤ 180 ms |
| T9 tiers — a stack's re-lay (V02 §6: ≤ 2 ms model) (V09 §4.20.5) | ≤ 26 ms (T9's row) | ≤ 150 ms |
| the hit stack (item 466; V09 §4.20.8) | ≤ 1 ms per click at every rung | — (no settle) |

While the hand moves, the previous ghost stays at α 0.25 (never a blank) and the raw trace follows at L-trace; a terrain
brush shows its footprint and a local hillshade of the stroke's kernel alone, computed on the main thread in ≤ 2 ms per
frame from the stroke's radius and amount (no model read), until the settle's preview replaces it. **Measurement:** the
app harness replays each tool's canvas script (V09 §7.2) 50 times at TOWN, CITY and METROPOLIS band tops on B-CITY-lite
seeds (M2a for T9–T10, M3a for T2–T8, M3b for T11–T12) and fits p95 — with the item-110 canvas scripts, the second
known-city fixture's among them, at the CITY and METROPOLIS band tops (M3a), and the oasis script on an arid seed (M3a);
pass: each within its row + 10 %. **Fallback:** a tool that misses previews on release only (§12.6's fallback), fixed at
the milestone for that tool and rung and reported; if T5 or T6 still misses on release, its dry run gains §12.3's
single-worker exemption from the pool queue (it runs ahead of background verification) and is re-measured.

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
  times are our own, calibrate-later at M1 by T-V9-73 (the warm and cold loads and the bundles' sizes on the reference
  machine and link) — application constants, outside V12's register (V12 §3.11).
* **Offline** — the app is an installable web app: a service worker caches the shell, the worker bundles, the fonts and
  the stamp tiles (§8.10) at first load, so every later open, every tool and every export works with no network; only
  the clerk (volume 10) and a host's publishing resolver need one (J-V9.11).
* **The page's `connect-src`** (V10 §3.17's connect rule). The standalone application's content security policy lists
  the page's own origin and, only in a build whose configuration enables the built-in clerk with a provider (V10's
  configuration A), the provider's API origin; nothing else is reachable. A build without it lists no model origin, and
  the drawer then shows V10 §3.17's unavailable reason. The embed's policy is V08 §3.1's.

### 6.3 Panels, dialogs and the assistive route

* Any panel or dialog's content drawn ≤ 100 ms after the click; every interaction's next paint ≤ 200 ms at the 75th
  percentile across the scripted tasks (the "good" bar for interaction-to-next-paint).
* The gazetteer's results ≤ 100 ms after the typing pauses (150 ms debounce not counted); a `query` page ≤ 64 KB (§11.2).
* The fates sheet's first page ≤ 150 ms after the `confirm` result; the history panel opens ≤ 150 ms with 10 000 rows
  (virtualised; rows rendered on scroll ≤ 4 ms per frame). A dossier group's lines (V09 §4.10) are built when the group
  first opens: its report entries from the already-held `report(h)`, one `entity` query per distinct address its
  report-entry lines name and one per distinct note key (item 583), batched and cached per effective key — ≤ 50 ms for a
  group of 100 notes on the reference machine; a closed group builds nothing.
* A why card ≤ 100 ms after the click: the `why` query ≤ 50 ms at CITY (a read over provenance and the derivation record,
  and a re-score of ≤ 3 alternatives at §12.6's placement bound), rendering ≤ 30 ms.
* The accessibility live region announces a preview's summary once per settle ("Preview: 42 plots, 180 households, 38
  buildings; 2 of your changes move"), never more often than once per 500 ms.

### 6.4 The file g views

* **Shade** (`live.shade`) — marks for the visible cells ≤ 8 ms per tile set at CITY. **The on-demand sampler's cost law**
  (used only when the field skipped it): C = 9 sun positions × the field's cells in the frame (§4.5's 32 m cells) × the
  march steps per ray (≤ 20: the tallest caster's height over the lowest sun's tangent, in cells), each step one caster
  lookup; at METROPOLIS's frame (≈ 62 500 cells) ≈ 11 M steps, ≈ 60–120 ms in the generation worker, once per document
  state, cached and invalidated by any event that changes a caster (terrain, walls, towers, raised ways and retaining
  walls; buildings only across epochs, item 102 (b)); islands are never sampled here (V05's held strips). **Fallback:**
  when the estimate passes 250 ms the sampler runs on the view's window only at twice the field cell (a quarter of the
  cells), for the view only, and the legend says "Shade shown roughly at this zoom".
* **Supply links** (`live.links`, the link cache of V09 §3.15) — the full bind once per `logHead`: one nearest-provider
  lookup per (consumer, good) through the solver's provider index, ≈ 2 µs each; at METROPOLIS (≈ 6 000 uses, ≈ 3 goods
  each, V06 §6.1's sizes; 35 000 buildings) ≤ 120 ms in the generation worker, in the background after the first map; an
  edit's incremental re-bind ≤ 5 ms per scoped edit; the `links` query ≤ 5 ms per page and ≤ 20 ms for ≤ 400 links in
  view at CITY; marks ≤ 2 ms; the overlay composes without a re-raster (§8.2's `overlay` target). Measured at M3a, with
  the link view (AP3); **fallback**, if the full bind misses: bind lazily by view region, cache per region.
* **Colour vision** — a `cvdVariant` change re-rasters the view as a style change does (V09 §6.1's T12 row).

### 6.5 Autosave, storage and memory

* A journal entry ≤ 2 ms of main-thread work per phase (the call's structured clone; the IndexedDB writes are
  asynchronous) and never delays the next gesture; a compaction runs in the generation worker (`export(h, 'plat')` ≤ 250 ms
  at CITY, ≤ 900 ms at METROPOLIS's 8 MB document, measured at M2a and M3a by T-V9-47) only when idle (V09 §3.8 (2)), so
  it never stalls a preview during active editing; a gesture that starts during one shows the working ring.
* **Go back to here** costs the sum of its targets' undo-record costs (§7.4, each O(its scope)); ≤ 1 s for 100 typical
  scoped edits at CITY, with the progress bar of V09 §3.9 past 1 s.
* Storage per town: §2.9's document budget for the snapshot (CITY ≤ 3 MB) + the journal (≤ 50 entries, typically
  ≤ 200 KB) + a 256 px thumbnail; the store warns at 80 % of the browser's granted quota.
* Memory beyond §12.8's lines: the shell ≤ 60 MB (DOM, the overlay canvas, thumbnails, the history's virtualised window);
  three variation overlays ≤ 3 × the scope's undo-record size (§7.4: O(scope)); three thumbnails ≈ 0.9 MB at DPR 2.

### 6.6 Touch

Long press 500 ms; pinch and two-finger pan at §12.5's pan rates (≥ 60 fps reference, ≥ 30 fps on the low-end device of
§12.1); a handle drag under a finger meets L-trace. **Measurement:** the M2a and M3a first-five-minutes sessions' tablets
record the telemetry (with the participants' consent, kept on the session machine only).

## 7 Tests and acceptance bars

Every bar runs in the app harness of §13.4 (Playwright on the reference machine of §12.1; Chromium, Firefox and WebKit
where the bar says "three engines") unless it names another bench. "Canvas script" is V09 §3.12's gesture list. Bars
T-V9-3, T-V9-4, T-V9-29 to T-V9-31, T-V9-73 and T-V9-78 are milestone or release exit criteria (V09 §8); the rest run on
every pull request.

### 7.1 The bars

| id | what it checks | pass | milestone |
|---|---|---|---|
| T-V9-1 | the empty state (V09 §3.2): first run shows a finished town with the overlay line and three buttons, no form; the first declaration ends the empty state; from M3b, the proxies after idle | the first map within §12.5's law + 100 ms; Enter before any declaration replaces the town, after one makes a new document (two documents in the recent list); from M3b the six proxies within §7.8's budget | M1 (shell), M2a; M3b (proxies) |
| T-V9-2 | R1 — no dialog before a first ghost | for every tool mode's canvas script — T1 after a declaration among them — no element with `role="dialog"` or `alertdialog` opens between pointer-down and the first `live.ghost` delivery; T1's fates sheet opens only after Accept | M2a, M3a |
| T-V9-3 | the latency budget (V09 §6.1) | stop-to-ghost p95 per tool within its row + 10 % at TOWN, CITY and METROPOLIS band tops — the item-110 and oasis rows on their scripts at CITY and METROPOLIS — or the fallback applied and reported; `raised.previewOnReleaseKm`'s course triggers preview-on-release (its calibration) | M2a (T9, T10), M3a (T2–T8, item 110's and the oasis's rows), M3b (T11, T12) |
| T-V9-4 | L-trace and L-snap | ≤ 1 frame and ≤ 2 frames p95 over a 2 s scripted drag per tool; main thread ≤ 4 ms per frame | M2a, M3a |
| T-V9-5 | the count badge is true | the badge equals `PreviewResult.counts`; after Accept, the committed model's plots, households and buildings of the declared thing equal the badge exactly | M2a |
| T-V9-6 | declared means held, as the user sees it | declare a quarter and a tavern, then New random on a block inside the quarter, **New trees** and **New decoration** (V09 §4.5's T12 row): every declared entity keeps its leaf digest, and New decoration changes no model digest and is one undo step; the tray shows the declared-things line; New random's chip row offers no layer chip | M2a; the New trees and New decoration steps at M3b (with T12, AP4) |
| T-V9-7 | variations | for each source (fill, a density, greenery and prosperity brush, a quarter's fabric, a scoped New random): three thumbnails of distinct content digests; Accept commits V09 §3.6's group for that source; a replay of the log gives the accepted variation's model digest; "Show three more" gives three new distinct ones; a scope of only declared things offers none (`info.reroll.nothing`) | M2a (New random), M3a (the rest) |
| T-V9-8 | snapping | on fixtures, a T3 end within 8 px of a cliff edge, a T4 end near a junction and a T5 corner near a street centre-line resolve to the snap target's point in the stored event; with Alt held they do not; the role label shows | M3a |
| T-V9-9 | the wall ghost and natural barriers (item 106 (g)) | on item 106 (h)'s river-loop and cliff-backed fixtures, the ghost's barrier arcs' total length equals the committed enceinte's barrier-closure length within 1 m, the badge's walled length the committed wall's within 1 m, and every anchor tower ghost becomes a committed tower | M3a |
| T-V9-10 | handles | every closed derived shape shows 4–8 handles by default and 8–16 with More (k by V09 §3.5's rules; a ring of fewer vertices every vertex); each handle kind's drag emits V09 §3.5's event; a boundary handle drag's `drawBoundary` polygon differs from the resolved ring only between the moved handle's neighbours, and it changes only the plots along that run (the locality oracle, §7.3 item 7 (ii)); a lake shows no rim handle | M3a |
| T-V9-11 | the canvas is deterministic | one canvas script, each gesture replayed at its recorded view scale and centre, on the three engines, at 1 440 × 900 and 1 024 × 768, at DPR 1 and 2, yields one model digest | M3a |
| T-V9-12 | the tool binding's screens are complete | a walker over the `EditEvent` union (the base and the volumes as revised) and §2.8's registry reads `toolkit.json`'s modes' `emits`, the `HandleSet` kinds' emits (V09 §3.5), the context panel's and the context menu's generated controls: every (event kind, target class or path) pair of §7.1's binding table is emitted by a mode of its home tool or is on that table's producer list, and no mode emits a pair outside its tool's row — item 110's and item 111's forms read by their discriminating fields (`drawWall.kind: 'retaining'`, `drawWay.raised`, `class: 'aqueduct'`, the `terrace` sugar, `drawWater.spring`, `setMassing { op: 'tiers' }`, the `spans/<n>/use`, `crossings/<wall>/form`, `clearanceCm` and `spanSpacingCm` paths) and `adjust('blueprint.history')`; every entity kind's editable path has a control; a new kind without either fails CI; so T101-2 holds on the canvas side as T-V10-1 holds it on the clerk's; a T6 drop at a point emits `placeAt { plot: '', from: { points: [p] }, designation }`, byte-equal to V10 §4.1's `where.at` encoding of that point, while "this plot only" emits the plot under it (T101-3); a way's **Split here** and **Join these** emit `split { id, cut: [p] }` at the nearest centre-line point and `merge { ids }`, byte-equal with V10 §4.1's T9 way forms; T11's **New names** in its three scopes and T12's **New emblem**, **New compass**, **New trees** and **New decoration** write V09 §4.5's bytes — the scoped forms `salt: 0` with `ids` in address order, the town-wide ones the concern's `DisplayList.salts` value + 1, New decoration's two as one group in registry order — which T-V10-4 compares with the clerk's encoders; and every rerollable concern of §6.1's registry (`naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem`) is written by a control, a concern no control writes failing CI | M2a on |
| T-V9-13 | refusals and bends are actionable | each F-EDIT reason, `ConflictAction` kind and bend of a fixture list — the bends of J-VI.4 (`bend.raised.*`, `bend.aqueduct.*`, `bend.retaining.rim`, the island and access bends of V05 §4.2), every bend id of V02 §1b and item 582's three, each listed as a bend, never a refusal — renders its catalogue row; every refusal row carries at least one button and every bend its pre-selected alternative where the row names one; each button yields a preview that is `ok` or a new bend; on a dossier-bound fixture a T6 locus drop naming no element renders `refuse.roster.dossier` with the element picker and **Put it at {site}**, the picker's pick previews the line with its `element`, and Put it at {site} previews `ok` on the first candidate of V09 §4.5's `sites` query — the plot the clerk's `dossier` alternative names for the same locus; when none of the three candidates is free of hard fails, the card shows the element picker without **Put it at {site}**; on a T7 list on the same fixture, a line committed naming no element renders `refuse.roster.dossier` on its card with the picker and **Put it at {site}** by the same query (`near` and `district` from the line's locus, both omitted for a line with none), its plot equal to the clerk's `dossier` alternative for the same line (J-V10.93); the card's `{thing}` is the line's name, or the class's display label when the name is `''`, and its `{locus}` V09 §4.16 (6)'s wording (`in` and the settlement's name for a line with none), which (4) parses back to the same `Locus` for every named locus target of the fixture; for each word declaration of V09 §4.15 — T5's seed, T4's two points, T3's two ends — the point written is the named target's `EntityCard.anchor`, equal to volume 10's resolution of `{ at: target }` for the same words (V10 §3.6 rule 1), and the canvas's events are byte-equal to the clerk's encoding of the same words (T101-3); an `assign`, and a `rejectSite` whose re-placement no plot satisfies inside the hard rows, render `refuse.assignment.noSite` with the `moveTo` places marked, and **Put it at {site}** previews `ok` or a new bend on the first `moveTo` target; every `show` `arg`, `subject` and `page` template of a fixture row finds its argument in the dry run's `MsgRef` — the arguments the text does not show among them (`thing`, `building`, `crypt`, `layer`, `layerId`) — and every `commit` button of a fixture row, from each source and each event form it names, previews `ok` or a new bend with exactly the events V09 §4.9's forms state | M2a, M3a |
| T-V9-14 | no dead ends | 1 000 random gestures (a random tool mode, random points in the frame) on B-CITY-lite seeds: 0 end with neither a ghost nor a refusal card; 0 uncaught errors | M3a |
| T-V9-15 | the words | every code the engine can emit (the enums of §5.2, §11.2, §6.4's conditions, V08's port notes, V04's causes and `blockedBy`, V02 §1b's bend ids, V05 §4.2's bend table) has a catalogue row; every event kind of the base and volumes 1–8 has a history template, and each variant one by its discriminating field (V09 §4.10), `history.dossierFacts.creation` and `history.replay` among them; every `ReportEntry.kind` (with `disruption`'s two forms and `works`'s three ops) has its `report.moved.<kind>` row, every `GenerationReport.dossier` state its `report.dossier.<state>` row, every `HistoryRecord` line its `report.past.<line>` row, and F-EDIT's kept assignment case its `refuse.assignment.noSite` row; every row ≤ 25 words, Flesch–Kincaid grade ≤ 8 by our own script, and free of "error", "invalid", "conflict", `E_…` patterns and ids; no `en` text writes "a {" or "an {" before a slot, and the indefinite form `{a name}` renders "an" before a vowel-initial word ("an inn") and "a" before "uni", "use", "usu", "eu" and "one"; the same readability step runs over the rendered V10 refusal and critique templates and V11's `says` and `reason` sentences, and a failure is reported to that volume's table; every key of V09 §4.9's families — `critique.K1`–`K18`, `refuse.clerk.*` (one per `RefusalCategory` value but `lock`, `rule` and `role`, the `key` row's three verdicts and `refuse.clerk.dossier.count` among them), `clerk.notice`, `clerk.alt.*` (one row per key V10 §5.4's list of the drawer's keys names, `clerk.alt.stale.retry` among them), `clerk.view.cleared`, `clerk.applied`, `info.raised.<outcome>` for the ten outcomes, `info.under.*` with `info.under.cause.<rule>` per `AccessCause.rule` and `info.under.lost`, `info.catacomb.*` per `source.kind`, state, burial-face outcome and `blockedBy` value, `info.crypt.*`, `kind.<registry kind>` per withheld kind — and `why.section.<kind>` per registered section has a row in every shipped locale (the walker T-V10-29 shares); `info.copy.condensed` has its row, its text V06 §3.15.5's line; no row `error.clerkOffline` exists; **the buttons**: every row that offers a button carries its `buttons` list in `en.json` and no locale file carries `buttons`, `tone` or `codes`; every button's `key` is a `button.*` row, and every `button.*` row is named by some row's list; every `commit` names a source (a `ConflictAction` kind, `alternatives` with an `each` row, `unplaced`, or `event` with a form of V09 §4.9's event forms), every event form is named by some row, every `tool` button a `ToolId` and a `ToolModeRow.id` of that tool in `toolkit.json`, every `app` button an `AppCommand` of V09 §4.9's list; every `refuse.*` row of V09 §4.9's table ends with `button.showWhy`; no `bend.*` row and no `refuse.*` row whose codes a dry run answers carries an `app` button; and each `ConflictAction` kind a `commit` carries has its `msg.key` equal to that button's `key` | M1 on |
| T-V9-16 | history and restore | a 300-edit scripted session: "Go back to here" at 5 random points gives the model digest of a replay of the log prefix to that point; "Undo going back" restores the head's digest; "Open a copy from here" gives a document whose digest equals the prefix's | M2a (go back), M4 (copy, with V06's `forkAt`) |
| T-V9-17 | autosave and crash recovery | 50 trials of a 200-edit session killed at a random commit, each after the worker's commit and before the journal's `done` write: the reopened town's digest equals the last committed head in 50 of 50; 10 trials killed between a fates-sheet `confirm` and its `done` write recover the confirmed action; a corrupted journal entry stops recovery before it with `error.recoveryPartial`; a record whose `appVersion` is newer than the build opens read-only under `info.newerApp` with its journal untouched | M2a |
| T-V9-18 | the draft mirror | a crash mid-quarter reopens with the offer; accepting restores the draft's points and params exactly | M3a |
| T-V9-19 | exports | every tab's every format writes a file on B-CITY-lite TOWN and CITY; the estimate within ± 30 % of the actual size; the model digest and log unchanged by any export; a `public` picture holds no withheld name in its text, `aria-label`s or metadata; the VTT file carries open windows, alpha-first colours, the grid first in the Foundry scene and, when asked, the `{cols}x{rows}` picture; a picture "as on screen" under a `cvdVariant` draws the variant, "usual" the sheet's palette | M3b |
| T-V9-20 | share | each of §6.4's refusal conditions shows its `share.*` row and offers the file; an allowed town's link rebuilds the session's digest | M3a |
| T-V9-21 | accessibility | axe-core: 0 serious or critical on every screen, panel, sheet, drawer and overlay state; the four first-five-minutes tasks and §13.4's scripted tasks completed keyboard-only; each preview announced once per settle; no focus trap — Tab past the last handle reaches the context panel, shift+Tab before the first returns to the map, Esc drops handle focus; 200 % UI scale with no loss of content; the snap highlight and handles ≥ 3 : 1 against every shipped sheet and its checked variants, and the chrome tokens' pairs distinct under the three simulated deficiencies by the style check's threshold (`cvd.minDeltaE2000`, §13.2) | M1 (shell), M2a, M3a, M3b |
| T-V9-22 | touch and small screens | on a coarse-pointer medium emulation every tool of V09 §4.12's list completes its canvas script with touch events; on narrow the withheld tools show `refuse.phone`; a long press opens the context menu; a second finger places freely | M3a |
| T-V9-23 | the shade view | on item 102 (g)'s island fixture ≥ 90 % of the island strip's cells draw in the two darkest steps; toggling the view changes no model digest; the legend lists only the steps drawn | M3b |
| T-V9-24 | links and link edits | a fixture with one bakery and two mills: Keep → a `siting.linkEdits` row `{ bindTo }` and the `links` query binds the kept mill; Cut → `{ avoid }` and the other mill serves; Stop buying → `{ cut: true }` and no link; Reset deletes the row and the nearest serves; each undo exact; the why card's links list the link; at `public` a concealed use's links are absent; the link view draws the family by colour and pattern, a link below satisfaction 1 with a hollow arrowhead and an impaired chain's links at half width, no dash pattern varying with satisfaction or impairment | M3a |
| T-V9-25 | siting overrides | the tannery kind's `nuisance` set to Ignore in its per-kind panel: a `siting.declared` row with `familyWeights.nuisance = 0` under the kind's key; the next placement's why card shows no nuisance bar; placed tanneries stay and are listed with the score they would gain (V11 §4.3); "Show better sites" lists ≤ 3; a relocation accepted and undone restores the digest; every screen of V09 §2.6's table writes only a cell V11 §4.2 admits for its key form | M3a |
| T-V9-26 | records | on B-DOSSIER-lite's fixtures, selecting a COUNT or GUILD record outlines exactly its `EntityCard.members` and the panel's count equals the model's | M3a |
| T-V9-27 | the clerk drawer | with a scripted test clerk (a `ClerkHandle` that emits fixed `TurnView`s, carrying no request words — so the substitutions volume 10 makes from a request's words, **Show a different name** as a `setAttr displayText` `propose` and a dossier-declared way's (1) through the request's anchor, are T-V10-4's to measure): no proposal commits without Accept, or without apply-then-undo switched on; an accepted proposal carries `proposedBy: 'clerk'` and author `user`; every `ReplyBlock` kind renders and every `ClerkAction` kind runs its action; each turn shows its cost and the month's tally; the first opening shows the label and the notice, and the key card only under a configuration that asks for a user key; "Undo the assistant's last change" undoes exactly that group; a viewer sees no proposal; `AppPrefs` holds no clerk field; New topic closes the live segment; the key card shows each `setKey` verdict (`ok` closes it, `invalid`, `noCredit` and `noAccess` their sentence, `unchecked` its note); the settings list the defect records with Save as file and Clear; each `ClerkAction` kind is dispatched by V10 §2.6's table — the seven the application runs by the shell, `propose`, `undo` and `rebuild` through `run`; a `why` opens the card or page the canvas's **Show me why** opens for that row; every `action` button shows its `label`, a labelled `select` its label and an unlabelled one its ids' chips; a stale card shows `refuse.stale` with **Ask again**, a host's stale card without it; an applied card shows `clerk.applied`, a key change `clerk.view.cleared`, and a viewer's declaration `refuse.viewer`; for every bend and refusal row of T-V9-13's fixture the drawer's card and the canvas's card carry the same buttons in the same order — the drawer's read from `ProposalView.variations[].bends[].actions`, a roster line's `actions` and `TurnView.refused`'s cards, the canvas's from the row's `buttons` (`commit` → `propose` with the canvas's bytes, `why` → `why` opening the same card or page, `show` → `select` of the same ids, `tool` → `useTool` with the same `mode` and, for `subject`, the same ids, `drop` → **Drop** where the bent item is the proposal's only item, else a `propose` without it), with no `app` button on either; a `useTool` with a `mode` opens that tool in that mode on the mode's working layer with its `ids` selected (**Add a way down** opens T6's `access` mode on Below); and a `fork` block, and a `rerun` block, whose seq lies below a rebased document's `base.seq` make a copy whose `forkedFrom.seq` is the earliest seq, its opening toast ending with `info.copy.condensed` (saved, in host mode, with `info.copy.saved` first) | M3a (scripted), M3c (V10's harness) |
| T-V9-28 | host mode is the same shell | `embed.html` with V08's `HostSlots` renders every screen of the standalone app except V08 §5.1's list (a DOM-structure diff against an allowlist); the allowlist also names the history panel's group "The party" — drawn from `HostSlots.historyLines` at the head of the All and SettlementForge filters only, newest first, **Show** only on a line with targets, no **Undo this** — and re-listed with the new key on a View as change: a spy on `list` sees every call carry `effectiveKey()`, and a line revealing one `local` and one `public` place draws, under "What anyone knows", naming the `public` place alone with **Show** on it alone, and both again when View as is cleared, each state read once the provider's `onChange` has fired for the new key (V08's per-key cache, J-V8.109), the same on "See what the players see" set and cleared — and the host rule for new documents: with `newDocuments: 'download'` each of Open a copy from here and Re-run from here (on a row, a chronicle row and a restore point), the drawer's `fork` and `rerun` and Enter's Same kind, new seed saves one `.plat` to the device whose model digest equals the standalone app's for the same action, leaves the frame's document and log head unchanged, writes no local store or recent entry and toasts `info.copy.saved`; with `'off'` none of those controls is in the DOM; **Start a new map from this** is absent in both; the file menu holds exactly Export skeleton, Rebuild around my drawings, Settings and About, Settings has no Storage section, and ctrl / cmd+O and ctrl / cmd+S do nothing (V09 §2.2's `fileMenu: false`); the History chip shows the dossier's peak locked | M-SF (with V08's SF6; AP5b) |
| T-V9-29 | the first-five-minutes test (V09 §7.3) | §13.4's pass rule at both M3a sessions; the M2a pipeline session recorded | M2a (pipeline), M3a (mid and exit) |
| T-V9-30 | the owner's UX sitting (V09 §7.4) | its pass rule, or its unrated rule applied | M2a (diagnostic), M3a, M3b |
| T-V9-31 | the known-city fixture authored through the canvas (V09 §7.2) | its bars (a)–(e), with item 110's rows on (its bridge fortress with its deck plots; the raised ways the city rules add listed in its report) | M3a |
| T-V9-32 | help coverage | every tool, mode, parameter and panel control has its `@plat/docs` anchor; every tool's guide page is generated from `toolkit.json`; every catalogue row whose **Show me why** resolves to a page by V10 §3.5 step 3's target rule — every `bend.*`, `info.*` and `error.*` row that offers it, and every `refuse.*` row with no admitted address argument — has its anchor `messages#<key>`, and every staged layer §7.3 item 9 (d)'s F-EDIT can name has its page `staged/<layerId>` | M3b |
| T-V9-33 | hidden caves and ruins (item 109 (j) (2)) | on a fixture with a sealed cavern and a sealed ruin: at `public` and `local` no sealed element is drawn, labelled, listed, answered by `why` (an unknown address) or present in any export, and the toggle is absent; at `secret` with the toggle on every element V04 records `unexcavated` draws in the unexcavated program, and with it off none does; "View as: what anyone knows" hides the toggle | M6-U (with V04's U3b) |
| T-V9-34 | the catacomb panels (item 109 (k)) | on B-CITY and a METROPOLIS fixture every catacomb panel's extent, state words, fill and its source, rank and count rows equal V04's `CatacombComplex` and V04's count, rendered by the same `MsgRef`s as the why card; across a scripted 10-epoch sequence the extent chart never falls; every church's Below line equals its `Basement.crypt` (V03 §3.7.4's wet-ground rule on a wet-ground fixture: an `always` class raised-choir, another church no crypt), and every cathedral shows a crypt, the largest | M6-U |
| T-V9-35 | the catacomb bends (item 109 (k), item 101 R2) | each of the bends (a)–(d) and both crypt bends (e) of V09 §4.17.5 fires on a scripted gesture, shows its row with its offer and commits the stated events — `bend.crypt.largest` at `crypt.rankShare` × the principal's area (V03 §3.7.4); a chamber drawn inside a church without a basement yields a crypt-only basement with the drawn ring (V03 §4.2), and its undo restores the document byte for byte; none is refused; no system chip entry and no panel ever presents a catacomb sourced at a church building | M6-U |
| T-V9-36 | ruins drawn and drawable (item 109 (g), (h)) | a chamber drawn with the system chip on a ruin commits `drawChamber { system: <the ruin> }` and draws in the ruin program; "New ruin" commits the closure creating the system; the legend shows "Ruins of an older town"; T10's "this system" re-makes only that system | M6-U |
| T-V9-37 | ways down and their causes (item 109 (j) (3), (3b)) | on fixtures holding one access of each `cause.rule`, each panel line equals its catalogue row for that cause and its symbol differs by cause; "Show the way in" highlights exactly the connection graph's path; every access edit of V09 §4.3 commits its event and undoes exactly | M6-U |
| T-V9-38 | dwellings only after a way in (item 109 (j) (4)) | 0 dwellings in an `unexcavated` or `lost` cluster after every declaration of a 200-gesture script; every dwelling declaration on a sealed void either commits with its access in one group (dug, else an opening, else a shaft from the public ground over it) or is bent above ground by `bend.under.noAccess`, with its alternatives; on a fixture with three buildings qualifying by step 1, the dug-access bend lists the other two in `PreviewResult.alternatives`, **Use another building** re-previews `[addUndergroundAccess { building }, the declaration]` from each in step 1's order with the access reaching the cluster and no second access, and is not shown after the last; an opening's bend offers no building | M6-U |
| T-V9-39 | View as is a filter | with "View as: what anyone knows" on, compaction, ctrl / cmd+S and "Download all my towns" succeed, no withheld name reaches the DOM, a picture export defaults to `public`, and the `knowledge` key is unchanged | M3a |
| T-V9-40 | the assistant's screens (V10) | with V10's harness on cassettes: the import dialog lists every prefix outcome and every critique finding with Show and Fix, and "Check with the assistant" starts the `critique` route; "Ask the assistant" on a why card starts the `why` route with the answer attached; a creation proposal shows its scratch read-only under the banner, and Accept opens the new document beside the current one; the transcript exports as V10's JSON; a host `clerk.config` of `off` or `host` shows no Assistant button and no message box (a host's proposal then opens the card-only drawer, T-V9-64); **How do I …?** in the drawer's menu and in Help sends on the `help` entry and its answer's `useTool` button makes that tool active, and **Ask the assistant to place these** under T7's box sends the pasted text on the `roster` entry, neither shown with no clerk configured or with the clerk off; with **no clerk configured** (`ShellConfig.clerk` null) the import dialog still lists every finding, its **Fix** on a `propose` fix previews the events as a ghost with Accept and commits them as one group with no `proposedBy`, a `useTool` fix makes the tool active, and `ClerkHandle.run` is never called — the same with a clerk mounted; **Start a new map from this** in the drawer's menu (standalone) sends the next message with `attach.newMap: true`, its proposal previews as a creation proposal under the banner, and Accept opens the new document beside the current one, which stays unchanged; in host mode that item is absent, no turn enters creation mode, and the drawer's `fork` and `rerun` buttons follow `newDocuments` as T-V9-28 states; in host mode with `clerkMode: 'builtin'`, a scripted `key` refusal and a scripted `budget` refusal each show the card's `openSettings` button, which opens Settings at its Assistant section with the fields the host forces locked under `host.locked` ("Set by SettlementForge") | M3c (the host clauses on T-V9-64's scripted host page); M-SF (the host clauses again on V08's embed, AP5b) |
| T-V9-41 | V06's screens | "Re-run from here" gives V06's `rerunFrom` document and leaves the current one unchanged; `chronicle.csv` and `uses-history.csv` equal V06's writers' output; the animated history stays ≤ 100 MB by stride doubling; a skeleton with a `history` block reports it at import | M4 (with V06) |
| T-V9-42 | V02's handles | on a composed building each handle kind (range end and width, tower centre and radius, room extent) emits V02's event and each stepper and chip its event; the family strip shows one thumbnail per feasible family within V09 §6.1's row, and a tap commits `setMassing` | M6c (with V02) |
| T-V9-43 | shade strips and the circuit | the Shade view draws V05's strip and pending rows for every island with their legend entries; "Update shade now" clears the pending line; with "Show the whole circuit" on, every barrier arc of item 106 (h)'s fixtures draws after commit in the town and the village products | M3b; the staged layers' milestones |
| T-V9-44 | base edits reached (MFCG's asks, FTG) | a scripted count: each of §7.4's thirteen MFCG asks and FTG's drawn river, tree brush and land-use painting is reached in ≤ 3 actions from the rail or a panel, commits its event (castle `site` and `baileyArea`, `setAttrMany` of land use, way `split` and `merge`, a district-keyed thematic `setStyle`, an `instance` group, `rejectSite` lift, `placeAt` lift, `unassign`, `drawWater { line, widthCm }`) and undoes exactly | M3a |
| T-V9-45 | view keys, notes, pins and the ruler | each control of V09 §4.19 writes its key, which survives save and reload and never enters a digest; the per-viewer keys never cross a bridge; §13.4's "measure a street with the ruler" passes; "Save as annotation" writes a pin | M3b |
| T-V9-46 | people and the family tree | the People panel's filters equal the `people` query's rows; the family tree matches §14's layout rules (generations in rows, elision beyond two, re-root) and is keyboard-operable; opening a person pins nothing; "Where is" draws the `whereIs` answer | M4b |
| T-V9-47 | METROPOLIS costs and the compaction | the link cache's full bind ≤ 120 ms and a scoped re-bind ≤ 5 ms; a compaction never starts while a draft is pending, starts at its thresholds (50 `done` entries, 60 s after a commit, 2 s of stillness, or hidden) — their calibration — and stays within V09 §6.5's times; the shade sampler within its law or its fallback applied; T1's and T12's METROPOLIS rows of V09 §6.1 | M2a (compaction, AP2), M3a (links, AP3, where the link view is built), M3b (shade, AP4) |
| T-V9-48 | a clerk's alternatives | each variation of a scripted proposal is previewed by its own call and thumbnailed from that preview; the tray shows V10's labels; one ghost at a time | M3a (scripted) |
| T-V9-49 | nothing is lost by deleting | a deleted town is in Recently deleted with its snapshot and journal for 30 days, Restore reopens it at its last head, and the storage ladder never purges it without asking | M2a |
| T-V9-50 | the context menu | right-click, a long press, Shift+F10 and the Menu key open the same menu on every entity kind, generated from the registry, each item producing the panel control's event | M2a |
| T-V9-51 | item 110's tools (V09 §4.20.1–§4.20.6) | each gesture — Retaining wall (both high sides, open and closed), Terrace and its level handle, Raised, Aqueduct, a deck stamp, a landmark slot, a span's use, a crossing's form, the deck height and arch spacing, the per-tier storey stepper — previews, commits §7.1's events (items 362, 364) in one group, and undoes byte for byte | M3a (the tier controls: T-V9-59) |
| T-V9-52 | raised ways on the canvas | 0 junctions between a raised part and every way it crosses; no crossed way split; both ends on ground vertices, an end released elsewhere bent to one; a raised road meeting a town wall comes down before it and passes its gate; an aqueduct passes a wall by an arch, never a gate; an aqueduct from a lower source is bent to the nearest higher source, else to a well at the terminal (J-VI.4 (h)); a raised stroke to an island's rim commits 0 ways and one sky access, an aqueduct stroke to a rim ends at its last ground vertex outside the island (J-VI.4 (d)), and on a fixture with a hoist across the stroke's course and no re-route the course ends at the last ground vertex before the hoist's column with `bend.raised.hoist` (J-VI.4 (f)) | M3a (the island and hoist cases with the sky's milestone) |
| T-V9-53 | a suppression holds | a generated raised way removed on the canvas stays removed after Regenerate, a scoped New random over every district it crossed, a reload through crash recovery, ten epochs with V06's pass, and a table release that changes its course (the suppression keyed to its reason, V12 §4.1); "Undo this" brings it back with its ids; its card and row show `info.remove.holds`; the same holds for every kind item 260 suppresses on the fixture — a harbour-mouth chain, a quay wall, a generated retaining wall, a generated deck plot and a floating island; with a later edit making Undo this dependent, each removal row's **Build it again** and `ClerkMount.rebuildEvents(seq)` for the same group return byte-equal event lists (canonical CBOR), those of V09 §4.20.3 (4)'s row for the kind, and committing them re-creates the thing as declared | M3a; the epochs M4 (with V06); the island with volume 5's sky milestone |
| T-V9-54 | retaining walls and terraces | every way crossing one is a stair or a ramp in the ghost and in the committed model, the bend line naming the dry run's form; a wall drawn on flat ground bends by V09 §4.20.1 (3) (a) or (b), and 0 retaining walls stand on flat ground after any script; a terrace is one group and one undo step; a level-handle change leaves no wall of the old step | M3a |
| T-V9-55 | decks | a stamp on a deck lies inside its deck plot and within the budget's band; a refused class bends to the landward end; storeys above `maxFloors` bend; a tower or fort stamp on a mole's head, mid-mole or the mid-span of a bridge at least V11's `deck.landmarks/bridgeMid/minSpanM` long lands on the slot; a ford or draw bridge offers none; a removed deck's buildings are listed among the effects; T4's pier, quay and bridge ghosts show their deck plots | M3a |
| T-V9-56 | the second known-city fixture (V09 §7.2) | its bars (a)–(e) and its emulation variant | M3a |
| T-V9-57 | the no-op pin on the canvas | with volume 11's terrace, raised-way and deck-plot rows off, fixture 1's canvas script yields the model digest it yielded before item 110; with only the raised-way rows on, every TOWN-rung canvas script is byte-identical | M3a |
| T-V9-58 | the hit stack (V09 §4.20.8) | on a viaduct over a street with a walled-up span: successive clicks select the deck, the span, the arch vault and the street, then the deck again; the context menu lists the others; a tap cycles the same; T11's second click names the street; `hint.below` shows once; each answer ≤ 1 ms | M3a |
| T-V9-59 | tier controls (V09 §4.20.5) | on a stepped temple each control emits V02 §4.6's event (the count, `insetCm` by the step handle snapped to 10 cm, the stairs, the top, the shape, the skirt, the solid mode, the shrine inset, a round tier 0's centre and radius, the stair width, a tier's heights); each bend id of V02 §1b the fixture's gestures reach shows its V09 §4.9 row with its buttons, the bent value pre-selected, and each button's preview is `ok` or a bend; no stack or deck limit renders a refusal (item 101 R2); undo exact | M6c (with V02) |
| T-V9-60 | effects (V09 §4.20.7) | on scripted fixtures — a viaduct's removal (`rerouted`, `removed` vaults with a drawn plan), an aqueduct's removal (`lost`), a deck's removal (`removed`), a terrace (`rebuilt`, `displaced`), a Re-derive to CITY (`added`), an oasis (`added`, `moved`) — every effect kind appears in the preview's `effects`, in the fates sheet's "What else changes" and on the clerk's card; on the clerk's card each line shows its text with **Show** alone and "and {n} other changes" with no button, its `{n}` the variation's `effectsMore`; the live region reads the first three; the list caps at §11.2's cap with `effectsMore` | M3a |
| T-V9-61 | item 110 in the exports (item 447) | on the second fixture every retaining wall, raised way, span, arch vault and deck plot appears in each format as item 447 states; the ground scene has 0 portals where a raised way crosses a street, and a retaining wall joins line of sight by §11.1's VTT rule; each deck scene's grid aligns at 0 px per cell (O11 (g)); the 3-D file holds one deck mesh per raised way and one wall mesh per retaining wall; a scope crossing more raised ways than the deck scenes' cap writes the cap's longest with the dialog's line, each deck scene's export within §12.7's export law (the cap's calibration) | M3b |
| T-V9-62 | removals in the skeleton (item 455) | on the second fixture, one generated raised way removed, the skeleton exported and opened with the same seed: the way stays removed and the digest equals the document's; under another seed the import dialog shows `import.removed` or `import.nothingToRemove`, never an error | M3a |
| T-V9-63 | Keep them as yours (V09 §4.20.3 (7)) | a CITY fixture with two generated raised ways re-derived at TOWN lists both among the effects; with the box checked both stand as declared ways and one undo restores the city; unchecked, none stands | M3a |
| T-V9-64 | the card-only drawer and the host channel | in host mode — at M3c on the application harness's scripted host page, a test-only page that loads the shell in host mode and fills `ClerkMount.host` and `HostSlots` over §11.3's bridge as a host would (the harness side T-V10-20 drives), and at M-SF on V08's `embed.html` with its host harness: before any `clerk.config` (mode `off`) and under `host` no Assistant button shows; a `preview { events, view: true, proposal }` opens the drawer with that card alone — the AI mark naming `hostName`, no message box, menu, settings or meter, no Try again; Accept commits one group with `proposedBy: 'clerk'` and the host receives `clerk.proposal { status: 'accepted', seqs }`; Drop answers `dropped`; a newer proposal replaces the card and answers the older one `dropped`; a moved head answers `stale`; a viewer's `preview` is refused; the harness reads the transport only through `ClerkMount.host.config()`, a refresh arrives through `onConfig` after `needsToken()`, a transport off the allowlist is answered by `refused('origin')`; no token appears in any store, log or report | M3c (with V10's C5, on the scripted host page); M-SF (on V08's embed, AP5b) |
| T-V9-65 | why sections | on fixtures holding a catacomb under a churchyard, a cathedral with its crypt, a sealed deep cavern, a generated viaduct, a stepped temple and a building with a drawn plan: each why card draws every section of its `WhyAnswer` after the facts, in the providers' order, titled by `why.section.<kind>`, each row's `says` rendered, values in the chosen units, targets clickable; a withheld row reads the unknown-place line; the catacomb's panel, the church's crypt line, the void's sealed line and the raised way's panel reason render the same `MsgRef` as the card (compared row by row); a raised way's `decidedBy` row is not drawn twice | M3a (scripted rows); M6-U, M6c (live providers) |
| T-V9-66 | View as reaches every read | on T-V10-6's canary fixture (`local`, `secret`, concealed and unexcavated places named with unique canary strings): with View as "What anyone knows", no canary appears in the why card (a withheld target reads the unknown-place line), the source chips, the gazetteer, "features in view", the Link card, the record panel, the People panel, "Where is" or T6's alternative sites, and a spy on the facade finds every band-less `query` the shell sends carrying `admitAs: 'public'`; with a host-set key form `{ tier: 'public', places: [one secret place] }` that place's name shows in each and no other canary does, the menu reads "What the players know" with its other entries disabled, the View as banner is not drawn and the export dialog defaults to the form; clearing View as re-asks every open answer at the role's key without a reload (`onEffectiveKey`); the knowledge key and the document formats are unchanged throughout; the fates sheet of an edit made meanwhile lists every fate at the role's key (J-V9.86) | M3a (tiers, and the form set by the test harness through `setViewOpts`); M-SF (the form through V08's embed, SF6; AP5b) |
| T-V9-67 | the three load outcomes (V09 §3.14 (a)–(c)) | with test builds labelled o(N), o(N−1) and o(N−3) (§6.4's fixture labels): **(a)** a document saved at N−1 opens editable under its own version, an edit commits there, the standalone app shows `info.upgrade.offer`, **See what changes** shows §7.5's diff in the fates sheet and **Do it** commits one `upgrade` (the output version then N), **Not now** commits nothing; **(b)** a document at N−3 with `model` opens as the frozen view under `error.frozen` with the CLI command, no other edit accepted (view and export only, §2.9 *Load* step 2) and **Edit it with this version** the one edit control, which returns `confirm` with the renames in the fates sheet and on **Do it** commits one `rebase` with reason `frozenImport`, after which an edit commits under N; the same document with one chunk's bytes altered shows `error.frozen.damaged` and no Edit control; one naming a pack the build lacks shows `error.frozen.pack` after the attempt with nothing committed; **(c)** a document at N−3 without `model` shows `error.frozen.noModel`, and **Open its recipe with this version** opens a new document under `error.linkVersion` whose model digest equals the same recipe and log opened as a link, the town on screen unchanged; **host mode** (the embed, owner frame): the N−1 document shows no upgrade strip and no upgrade control but V08 §4.2's header **Update the map engine**, the banner slot draws no frozen-view notice, (b)'s **Edit it with this version** commits its `rebase` through `doc.changed` followed by `doc.snapshot`, (c)'s button saves one `.plat` to the device with `newDocuments: 'download'` and is absent with `'off'`; an editor's frame shows `error.frozen` without the Edit control | M3a (the standalone clauses); M-SF (the host clauses, on V08's embed with SF6; AP5b) |
| T-V9-68 | SettlementForge's chains in the Show menu | on `town-cc-1` or its test-side variant with one active custom chain (T-V8-25's variants), and on a variant whose every chain is inactive: the Show menu lists **SettlementForge's chains** on the first and not on the second; choosing it writes the per-viewer key `thematic: 'supplyChains'` and draws V08 §5.2's lines with the chain's label in the legend; under a key that withholds one of the chain's nodes the entry is absent; switching the view on and off changes no model digest and adds no log entry; a GeoJSON export while it is on carries V08's `supplyChain` LineString | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-69 | the dossier groups and the standing notes | on `town-1`'s digest pairs through V08's embed (T-V8-14's pairs, an undated one among them): each committed absorb is one group headed `host.group.absorb` with `{n}` its ledger event's `changes` count and `{week}` its `absorbed` entry's week (`host.group.absorbUndated` on the undated pair); under it its dossier events in log order, each followed by one line per report entry of its `seq`, then one line per stored note of the ledger event with **Show** exactly where the note's `keys` bind an element (highlighting those addresses), then its epoch rows; the creation's prefix is headed "Made from SettlementForge's record" with its notes; on the variant whose absorb carries an epoch in which a removed raised way's reason fires again (V06's fixture), that epoch row carries one `info.raised.suppressed` line with **Show** on the removed way's former outline; under View as "What anyone knows" a note line whose key binds a `local` or `secret` element is not drawn and returns when View as is cleared, and a report-entry line whose element is `secret` is drawn naming it by its `kind.<registry kind>` word with no **Show** on it — in the group and in the report panel's "What moved" alike — and names it again when View as is cleared; the group is listed under All and SettlementForge and absent under Mine and Assistant; the report panel lists `GenerationReport.dossier` by its `report.dossier.<state>` rows, then the standing notes under `host.group.standing`, one line per `GenerationReport.dossierNotes` entry; all of it the same in a second editor's frame and after a reload | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-70 | the roster reader's namespaces (J-V9.125) | T7's pasted lines and T6's typed words, read by V09 §4.16 (3): on a TOWN fixture "a smithy", "an inn" and "a church" resolve to `smithy`, `inn` and `church`, never to a `v.` class; on a VILLAGE fixture they resolve to `v.smithy`, `v.inn` and `v.parish_church`; "a chandler" at VILLAGE resolves to `v.shop`; a town-and-city class that plays itself at VILLAGE ("a pawnshop") resolves to itself; T6's stamp palette lists exactly the same set at each rung | M3a (the village rungs' clauses with V07's V-M2 rows) |
| T-V9-71 | the oasis (V09 §4.21.1; item 111) | on an arid fixture a T2 Oasis gesture commits `drawWater { kind: 'lake', from: { points: [p], levelCm, spring: true } }`, byte-equal with V10's encoding of the same point and level (T101-3); the committed water body carries `spring` and its grove and gardens name it in `fedBy`; the badge's figures equal the dry run's; the history row reads "Made an oasis at {place}"; Delete removes the pool, spring, grove and gardens in one event, its effects list what loses the water, and undo restores the document byte for byte; a generated oasis's suppression holds through Regenerate and a reload; a dossier oasis's delete renders `refuse.dossierOwned`; on a non-arid fixture the drawn oasis commits; on the Sky layer the chip is disabled with `disabled.skyWater` | M3a |
| T-V9-72 | a town's past and a lost void (V09 §4.17.3, V09 §4.21.2–§4.21.3; item 113) | **the chip**: on a standalone VILLAGE fixture each History pick writes `adjust('blueprint.history', …)` with V09 §4.21.2's `HistoryHint` (the peak at the size word's quantile, `symbolic: false`), its Re-derive previews and commits as one undo step after an auto restore point, and **No past** returns the digest before it; the chip is absent on a neighbourhood document (a clerk `adjust` there bends with `bend.time.hoodAlone`) and locked "Set by {host}" in host mode; **the lines**: on T113-1's city-to-village fixture the report panel's `report.past.*` lines equal the `HistoryRecord` (peak, epochs, refoundings, buried systems), a fact sized by a symbolic peak shows `chip.symbolic` and no other does, and the replay's epochs are drawn under their head and refused as undo targets; **the lost void**: closing a cluster's last open way previews `fate.access.lastWay`, after Accept its panel shows `info.under.lost` with the closing year, it draws faded with its "once known" label and the legend row at every key its `knownTo` admits (without the toggle), its dwellings gone; reopening a way removes the line and the cluster reads `accessible` | M6-E (the chip and the lines, with V06's replay); M6-U (the lost void, with V04's U-ACCESS) |
| T-V9-73 | boot and bundle (V09 §6.2) | the shell chunk, each lazy chunk and the worker bundles within V09 §6.2's caps (measured from the build's output); chrome interactive from a warm cache ≤ 300 ms, and a cold first load on the 10 Mbit/s, 50 ms link within its figures (chrome ≤ 1.5 s, the first TOWN map ≤ 3 s), on the reference machine — these constants' calibration | M1 |
| T-V9-74 | the edges (V09 §3.16) | every row of V09 §3.16's per-mechanism table on its fixture: the stated outcome, on its stated rung of the failure ladder; across the suite, 0 crashes, 0 hangs past 10 s, 0 lost edits (every committed event survives a reload) and 0 whole-map retries | each row at its mechanism's milestone (M1–M-SF) |
| T-V9-75 | pointing at a lifted island (V09 §3.4; V05 §4.2) | under `offset` occlusion at METROPOLIS: a click on a lifted island's drawn house selects that house (the hit stack's top), a T2 stroke drawn over the lifted island lands where it is drawn in the island's plan, a snap answers for the un-displaced point, and the canvas's events equal V10's encoding of the same island point | with the sky's milestone (M6-sky) |
| T-V9-76 | the combinations (V09 §3.16 (g)) | each combination row on its paired fixture at each rung its row names: the stated outcome and test clause | with the later of the pair's milestones |
| T-V9-77 | colour vision and the second cues (V09 §5.4, V09 §5.12; item 112) | the selector in Settings and the Dress panel writes the per-viewer `cvdVariant`, unlogged, never over a bridge, surviving reload; in each variant every thematic view of V09 §5.4 draws its second cue at the legend-bearing stops and its legend shows each category's cue; the style check (T112-1) passes on every live provider's palette (`live.shade`, `live.links`, `live.coverage`, `live.voids`) in each variant; the link view's three cues (pattern, hollow arrowhead, half width) each carry one meaning | M3b (`hatched` at M5) |
| T-V9-78 | the game-master trial (V09 §7.6; item 112 (b)) | before the public release is tagged: `GmTrialRecord` holds at least ten participants, each with at least two sessions of play on their own settlements; the report exists at its path (T112-2); every finding is a `TrialFinding` routed by V12 §2.14's intake, and every `blocker` or `major` finding's fix-list entry is fixed or ruled before the tag | the release gate (§16), after M-SF |

### 7.2 The known-city fixtures, authored through the canvas

J78 and item 101 (e) make two original skeletons with a city's structure the toolkit's acceptance fixtures, each
authored three ways that must agree (T101-6). V12 §3.14 holds their one statement of setting, seed, structure list,
emulation subset, input folder (`plat/tests/fixtures/known-city/<id>/`) and golden (X-V12-8); this volume owns their
canvas scripts (`canvas.json`, V09 §3.12's form) and the by-hand way. Our own names throughout; nothing traced.

**K1** (J78). The brief: a walled upper town with a citadel on a bluff; a walled lower port sloping to a harbour with
piers; unwalled outer sprawl along three roads; a hill inside the extent; cliffs with a cliffside cemetery; a satellite
quarter across the river; a fortress on a bridge with its deck plots (item 110 (d); V09 §4.20.4 (7)); two enceintes with
nine gates; three region labels (upper, lower, outer); about fourteen declared quarters; about sixty named places with
landmark leader lines; the two looks, ink and quarter-tinted. **Its canvas script**: T1 (the `citadel-and-port` form,
CITY, coast); T2 (the bluff, the hill and the cliffs by strokes, the river by source and mouth, the harbour by shore point
and size); T3 (two walls by points, nine gates); T4 (the three roads, the bridge, the piers); T5 (the quarters by seeds and
corners with their kinds and names); T7 (the sixty places as one pasted roster); T6 (the ten landmarks that need an exact
plot, the fortress on the bridge's mid-span slot); T11 (three region groups and the leader-line switch); T12 (the tint).
At CITY the rules may raise a way the site calls for; the fixture's report lists it with its reason (V12 §3.14's
`extras`).

**K2** (item 110 (e); J114). The brief's current draft (the file is `brief.md`): a port city on a headland with the sea on
three sides; a landward curtain with towers, anchored on the sea at both ends, and a gate plaza; an enclosed harbour behind
a mole, a tower at mid-mole and a fort at its head; a causeway from the mole to a rocky islet with a lighthouse; an open
anchorage of jetties with small buildings on some of them; three or more terraced wards bounded by inner walls, with
retaining walls along their terraces; ring streets round two precincts; a straight raised road crossing the streets below;
a ravine of stepped housing; a stepped temple; an arena; six named wards with curved labels (Gate Ward, Upper Terrace,
Middle Terrace, Lower Terrace, Ravine Ward, Harbour Ward). **Its canvas script**: T1 (a coastal site, CITY); T2 (the hills,
the ravine, the islet by water paint, the harbour basin by shore point and size, the terraces by Terrace strokes); T3 (the
landward wall as an open chain anchored on the shore at both ends, item 106's barrier closure; the inner walls; the
retaining walls); T4 (the mole and the jetties as `pier` lines, the causeway, the ring streets, the raised road with Raised
on); T5 (the six wards, the ravine quarter with V01's stepped fabric); T6 (the mid-mole tower and the mouth fort on the
mole's landmark slots, the lighthouse, the stepped temple by its class stamp, the arena, the precincts; deck buildings left
to the rules); T11 (the six labels); T12 (the tint). No tier control is needed (V09 §4.20.5 (2)).

**Bars, for each fixture** (T-V9-31, T-V9-56):
* (a) T101-6: the script's final model digest equals the skeleton file's, and the tool-API path — at M3a a scripted
  transcript, from M3c V10's cassette — meets the structure list (J78 (e); J-V9.50);
* (b) it plays within 10 minutes on the reference machine, every gesture's stop-to-ghost within V09 §6.1's budgets;
* (c) every preview `ok` or bent — 0 refusals — in ≤ 250 gestures;
* (d) both looks pass B-ZOOM's legibility floors (§13.4);
* (e) **the dedicated-user bar**: a person of the program who has not seen the script rebuilds the fixture by hand from its
  brief in ≤ 90 minutes, and the fixture's structure list (V12 §3.14; K2-4 reads "≥ 8 jetties outside the basin, deck
  buildings on ≥ 4") holds on the result — the owner's "a dedicated user can build it" measured.

**The emulation variant**: the brief declared only to PROGRAMME (L2: intent, bones, programme; no fabric); V12 §3.14.3's
emulation subset holds and the rules fill the rest. **The behaviour shift, recorded once** (item 110): with the raised-way
rows on, a CITY or METROPOLIS canvas script's digest may change, because the rules raise ways there by themselves; with
the terrace, raised-way and deck-plot rows off, every canvas script is byte-identical to its pre-item-110 digest
(T-V9-57); no golden is re-recorded without naming this cause. K2's golden and model bars are volume 12's; T-V9-61 and
T-V9-62 also run on it.

### 7.3 The first-five-minutes protocol, operationally

§13.4 states the test, its pass rule, its participants and its fallbacks; this is how V09 runs it.
1. **When and what build.** The four tasks need T5's and T6's events (M3a), so the sessions run inside M3a — on its
   midpoint build once those events have landed, and at its exit. The M2a exit holds a **pipeline session** instead: three
   to five participants, recorded and not gating, on the tasks the M2a build expresses — a New random on a scope that keeps
   a locked thing (T10), a shape task ("make this house one storey taller, then split this plot", T9), going back in the
   history, adding a compass — its findings feeding AP3 (item 494; J-V9.15). The dress task chooses between `ink` and `lit`
   at M3a.
2. **Participants.** Five per round (§13.4's five to eight; J122), recruited by V09 from SettlementForge's community and
   thanked by credit and early access, with no payments; each runs tabletop games, has used a map tool casually, does not
   program for a living, has never seen PLAT and was in no earlier round. Two per round work on a tablet (§13.4's touch
   question).
3. **Setup.** A generated TOWN at seed `H32("f5/<milestone>/<participant>")` (§13.6), the empty state dismissed, no clerk
   unless the round tests it; the reference laptop with a mouse, or a 10–11 inch tablet.
4. **Tasks**, read from cards, in order, without help: *quarter* — "Make a temple quarter called {name} next to the
   market."; *place* — "Put a tavern called {name} near the {gate}."; *dress* — "Make the map look like {style} and add a
   compass."; *New random* — "You don't like the houses in this block" (the observer points) "— get a different version,
   but keep your quarter and tavern." Five minutes from the first touch for all four.
5. **Observation.** One observer per participant records per task: completed, seconds, the step where stuck, notes; then
   asks "Did anything change that you expected to stay, or stay that you expected to change?" and, with a clerk on, "Did
   the assistant feel slow?". No video is kept; a screen recording is deleted once the notes are written.
6. **Record** `plat/goldens/ux/<milestone>/f5.json`, named in the milestone's `MilestoneRecord.ux` (item 490):

```ts
interface F5Record { milestone: string; build: string; date: string;
  participants: { id: string /* P1 … P8, no names */; device: 'laptop'|'tablet';
    tasks: { task: 'quarter'|'place'|'dress'|'reroll'; completed: boolean; seconds?: number; stuckAt?: string; notes?: string }[];
    surprisedByHeld?: boolean; clerk?: { used: boolean; slow?: boolean } }[];
  verdict: { perTask: Record<'quarter'|'place'|'dress'|'reroll', { passed: number; failed: number }>; pass: boolean /* §13.4: all, or all but one, complete all four */ };
  fallbacksApplied: ('firstScreen'|'hint'|'touchL3L4'|'clerkApplyThenUndo'|'keepChangeToggle')[] }
```

7. **Consequences.** §13.4's fallbacks, applied through `toolkit.json` (first-screen placement, hint text), `AppPrefs`'
   defaults (`touch.editFabric`, `reroll.keepChangeToggle`) and `ClerkSettings.applyMode`'s default (V10 §4.4), each a
   shipped-data change named in the release notes; a task two or more participants fail is re-run with new participants
   before the milestone exits.

### 7.4 The owner's UX sitting — §13.6's shape applied to the editor

The owner is the casual user this product is for, so the owner's own use is a gate as the owner's eye is for the maps:
1. **When.** M2a (diagnostic, not gating), M3a (gates "the editor is ready for casual users"), M3b (the exports and the
   Dress panel).
2. **Fixed before the sitting.** Seeds `H32("ux/<milestone>/<i>")` and the tasks, committed before the build is shown: the
   four of V09 §7.3; "Export this town for your tabletop"; "Find out why the tannery is where it is"; "Undo a mistake, then
   go back to how the town was ten minutes ago".
3. **Rubric**, per task: "Could you do it without help?" — yes · with a hint · no; "Did it do what you expected?" — yes ·
   partly · no; "Would you use this for your game?" — yes · maybe · no; an optional one-line note.
4. **Pass.** Every task "yes" or "with a hint" on the first question, and at least two thirds "yes" on the second and the
   third.
5. **Unrated.** Without a sitting within seven days of the build being ready, the editor status is "provisional — not
   rated", the build continues, no "ready for casual users" claim is made, and the sitting is offered at the next milestone
   (§13.6 (7)).
6. **Record** `plat/goldens/ux/<milestone>/owner.json`: `UxSittingRecord { milestone; date; status: 'diagnostic'|'passed'|
   'failed'|'accepted'|'provisional-not-rated'; seeds: string[]; answers: { task: string; q: 1|2|3; answer: string; note?:
   string }[]; acceptance?: { by: 'owner'; text: string; date: string } }`, named in `MilestoneRecord.ux` (§13.3; item 490).

### 7.5 Parity with the references' own editing

Every capability the reference generators' editors have is reached, and the action counts are compared on §13.4's scripted
tasks (O16 (c); `research/ux/tool-survey.md` Part I D).

| the reference's capability | reference actions | PLAT | PLAT actions | verdict |
|---|---|---|---|---|
| a new town (MFCG Enter; FTG's form) | 1; a form | Enter in the empty state; afterwards Same kind, new seed (a new document) | 1 | parity; the current town never lost |
| re-roll one ward (MFCG ctrl-click) | 1 | shift+click: New random on that scope, three variations | 1 (+1 to pick) | parity; candidates added |
| warp brushes (MFCG's eight) | mode + stroke + Enter | T2's warp session, eight kernels, Apply | same | parity |
| rename, move a label (MFCG: rename only) | 1 + typing; — | T11 click + typing; drag | same; 1 | parity; improvement |
| district colours; edits kept across sessions (impossible in MFCG) | — | T12's tint and the style dialog; autosave | 2; 0 | improvement |
| roads as snapping click-chains (FTG) | n + 1 | T4 two points or a line, with snap | 2 | parity |
| place a building (FTG) | 2 | T6 stamp drop, Accept | 2 | parity |
| swap two buildings' details (FTG) | 3 | drag a use's badge onto another building (`swapUse`) | 1 drag | parity |
| paint roofs; bulk edit (FTG) | brush; select + form | T9 paint; multi-select + `setAttrMany` | same | parity |
| regenerate an area with presets (FTG) | select + preset + accept | T10 New random with scope chips and variations | 2 | parity; three candidates |
| confirm the consequences (FTG's list) | 1 | the badge's fate counts and the fates sheet | 1 | parity |
| "This action cannot be undone" (FTG's regenerate) | — | every action undoes (R11) | — | improvement |
| the thirteen MFCG asks (§7.4) | — | each from the rail or a panel in ≤ 3 actions (V09 §4.3), T-V9-44's count | ≤ 3 | improvement |
| rotate the map (MFCG) | 1 | the Map group's dial or "North up" | 1 | parity |
| a river with a width; trees by brush; pins with label, note and colour (FTG) | a draw; a brush; a click and a form | T2's river or canal with its width handle; T8's Trees; the Notes panel's pins | same | parity |
| people search and a clock (FTG) | a form; a button | the People panel; the clock's Next hour | same | parity |
| tabletop crops plus an overview (E4 (4)) | — | the scene split with a numbered overview PNG | 0 extra | parity |
| a road raised while drawing (`research/ux/tool-survey.md` Part II, B2-S5) | a key | T4's Raised, or PageUp and PageDown while drawing (V09 §4.20.2) | 1 | parity |
| a multi-level tabletop scene (Part II, E-S33, E-S34) | — | a raised way's deck scene with its elevation band (item 447) | 0 extra | parity |
| retaining walls, raised ways, stepped buildings, deck plots | none | T3, T2, T4, T9 and T6 (item 110; V09 §4.20) | — | improvement |

### 7.6 The game-master trial (item 112 (b); §16's release gate)

Before the map's public release inside SettlementForge, V09 runs the trial §16 sets: ten to twenty SettlementForge game
masters, each using the map on their own settlements for at least two sessions of play, recruited through SettlementForge's
community and thanked by credit and early access, with no payments (J122; J-V9.131).
1. **When and what build.** After M-SF (the map reached from SettlementForge, V08 §8), on the release candidate; the
   sessions are the participants' own games, over four to eight weeks.
2. **What participants do.** Make or open their settlements' maps, use them at the table and edit them between sessions,
   with no task cards; after each session a short form — what they used, what failed or surprised them, what they missed,
   and the colour-vision variant if they chose one (`cvdVariant`, V09 §5.12). The forms stay outside `plat/`, crossing
   hashed (V12 §2.8).
3. **Record** `plat/goldens/ux/release/gm-trial.json`, its report `gm-trial.md` beside it (T112-2):

```ts
interface GmTrialRecord { trial: string; build: string; from: string; to: string;
  participants: { id: string /* G1 … G20, no names */;
    sessions: { date: string; tools: ToolId[]; cvdVariant?: 'none'|'protan'|'deutan'|'tritan'; form: string /* the form's hash */ }[] }[];
  findings: TrialFinding[] }   // V12 §2.14: each in our words, no participant's or settlement's name, no quotation
```

4. **Consequences.** The trial seat writes each finding; V12's intake (`plat calibrate trial`, V12 §2.14) routes it — an
   owner question, a trial row on the register entries its cells name, a `known-defects.json` entry (the fix list). The
   release is tagged only when the record holds at least ten participants with two sessions each and every `blocker` or
   `major` finding's fix-list entry is fixed or ruled (T-V9-78).

## 8 Build plan

### 8.1 Where it slots into §16

The application is built along the base's milestones, in the order J122 fixed, never ahead of the engine it drives: each
step ships inside the milestone named, on that milestone's API, and exits on its bars. Estimates are expert person-weeks
(PLAUSIBLE) for the application's code, data rows and test tooling; the engine work they call is the base's and the other
volumes'. Item 111's, item 112's and item 113's screens are absorbed in their steps' ranges.

| step | milestone | content | exit (V09 §7) | pw |
|---|---|---|---|---|
| **AP1 — the shell** | M1 | the frame (top bar, rail with the tools that exist, map region, context panel, view bar); the chrome tokens, icon sprite and two themes; the empty state's card; the report, gazetteer and "features in view" panels; the basic panel; the keymap; the accessibility contract; context help's skeleton; the catalogue's first rows and its coverage test; open and download of generated towns; boot and bundle | T-V9-1 (shell), T-V9-15, T-V9-21 (shell), T-V9-73 | 2.5–3.5 |
| **AP2 — the editing core as screens** | M2a | selection and the generated context panel; T9 and T10; the preview pipeline — ghost, badge, T9's handles, the variations tray with thumbnails (item 461), the refusal card, the bend line, the fates sheet; undo and redo; the history panel with restore points and "Go back to here"; autosave, compaction, crash recovery and the draft mirror; the pipeline session (V09 §7.3; item 494); the owner's diagnostic sitting; the shell reads SettlementForge's staging host for its host-mode checks (J121) | T-V9-2 – T-V9-7, T-V9-12, T-V9-13, T-V9-16 (go back), T-V9-17, T-V9-29 (pipeline session), T-V9-30 (diagnostic), T-V9-47 (compaction) | 2.5–3.5 |
| **AP3 — the full toolkit on the canvas** | M3a | T2–T8 in full (points forms, snapping by role (item 517), wall arcs (item 462), placement alternatives (item 463), the quarter's size (item 348)) with T2's Oasis chip (V09 §4.21.1); handles on every shape; T7's paste and cards; multi-selection and move; the working layer; the advanced panel, tables editor and presets; the siting rows, link view and link edits, split merge-back, wall stretch grades, record members, the why card (V11's tables by `editTable`, item 460, item 360; V10's `WhyAnswer` through `WhyCardModel`); the clerk drawer on the scripted test clerk; touch and the three layout classes; share; open and recent; the three load outcomes, standalone; the context menu, View as, Recently deleted, the re-roll brush and the held-thing marks; the base edits of V09 §4.3's MFCG and FTG rows; item 110 on the canvas (V09 §4.20); both known-city canvas scripts; the two four-task sessions; the owner's gating sitting | T-V9-3, T-V9-4, T-V9-8 – T-V9-11, T-V9-14, T-V9-18, T-V9-20, T-V9-22, T-V9-24 – T-V9-27, T-V9-29 – T-V9-31, T-V9-39, T-V9-44, T-V9-47 (links), T-V9-48, T-V9-50 – T-V9-58, T-V9-60, T-V9-62, T-V9-63, T-V9-65, T-V9-66 (tiers, the harness form), T-V9-67 (standalone), T-V9-70, T-V9-71 | 7.25–11 |
| **AP4 — finish, export and shade** | M3b | the export dialog's five tabs with estimates and the tabletop details (item 454); T11 in full; T12 in full (furniture tray, underlay, lights, ground texture, the style dialog, New trees, New decoration, New emblem, New compass); the shade view (item 411); the Try-another strip; the guided first town; Settings complete with the colour-vision selector (`cvdVariant`, V09 §5.12) and the second cues (V09 §5.4); the installable offline app; help coverage; the owner's sitting on exports and dress; the Map and Light groups, notes, pins, favourites, grid, legend, emblem and the ruler; the coverage and voids views; the whole-circuit option; the tabletop overview | T-V9-3 (T11, T12), T-V9-6, T-V9-19, T-V9-21, T-V9-23, T-V9-30, T-V9-32, T-V9-43, T-V9-45, T-V9-47 (shade), T-V9-61, T-V9-77 | 3–4.25 |
| **AP5 — time** | M4 (with V06's steps); its item-113 screens with M6-E's replay | "Open a copy from here" on V06's `forkAt`, "Re-run from here" on `rerunFrom`; the Chronicle tab joined to V06's timeline bar; `chronicle.csv`, `uses-history.csv`, the animated history and the history block at import; the History chip (V09 §4.21.2) and a town's past in the report panel and the history (V09 §4.21.3) | T-V9-16 (copy), T-V9-41, T-V9-53 (the epochs), T-V9-72 (the chip and the lines) | 0.5–0.75 |
| **AP5b — host mode** | M-SF (with V08's SF4 and SF6) | the host shell on V08's `embed.html` with V08's `HostSlots` — the file menu under `fileMenu: false`, the host rule for new documents, the history panel's host group; the three load outcomes in host mode; View as's host-set key; the assistant's host clauses on the embed; the Show menu's SettlementForge's chains; the dossier groups and the standing notes | T-V9-28, T-V9-40 (host clauses), T-V9-64, T-V9-66 (embed), T-V9-67 (host), T-V9-68, T-V9-69 | 0.25–0.5 |
| **AP6 — Below and item 109** | M6-U (with V04's U3, U3b and U4) | the Below group (band ladder, view chips, lantern, the hidden-voids view key at `secret`); the system chip and New ruin, cavern, catacomb; the ruin legend; "How people get down here" with every cause, "Show the way in" and the access edits; the dwelling closure's words; the catacomb, crypt and cemetery panels, the extent chart and the bends; the once-known void (V09 §4.17.3) | T-V9-33 – T-V9-38, T-V9-72 (the lost void) | 1–1.5 |
| **AP7 — Sky** | M6-sky (with V05's P4) | the Sky group and island menu; the island handles; Update shade now; the shade strips and their legend; points on a lifted island (V09 §3.4) | T-V9-43 (strips), T-V9-75 | 0.5–1 |
| **AP8 — the built-in assistant's screens** | M3c (with V10's C2–C5) | the first-open cards (label, notice, and a key card only where the configuration asks for one, J121); every `ReplyBlock` and `ClerkAction`; the meter and caps; Settings' Assistant section over `ClerkSettings`; the creation preview; the import dialog's "Check with the assistant"; "Ask the assistant"; the transcript export; the card-only drawer and the host channel `ClerkMount.host` on the harness's scripted host page; New topic, the key verdict and the defect list; Start a new map from this | T-V9-27 (harness), T-V9-40 (host clauses on the scripted host page), T-V9-64 | 1–1.25 |
| **AP9 — people and the family tree** | M4b (with `@plat/sim`) | the People panel, the person card with "Where is", the family tree, the clock | T-V9-46 | 0.75–1.25 |
| **AP10 — building-band controls** | M6c (with V02) | V02's handles and family strip (V09 §3.5) and the tier controls (V09 §4.20.5) | T-V9-42, T-V9-59 | 0.25–0.5 |
| **the release gate** | after M-SF | the game-master trial (V09 §7.6) — a process, priced in no step | T-V9-78 | — |
| **total** | | | | **19.5–29** |

**Pricing.** §16's line for the reference app's UI and V09's build-depth additions (16.75–24.75 pw, item 530; the totals computed once by item 568) carries
AP1–AP5, AP5b and AP9; the staged screens — AP6 1–1.5, AP7 0.5–1, AP8 1–1.25, AP10 0.25–0.5; 2.75–4.25 pw — are priced
with their staged milestones (M6-U, M6-sky, M3c, M6c), outside the base total, as those engines are.

### 8.2 Spikes (risk retirement, at the start of their milestone)

* **S-A1 — the preview loop at CITY (M2a, first week).** T9's drag → settle → `preview` → ghost on a CITY document on the
  reference machine, and a T5 seed preview on a harness over §7.1's `quarter` event: measure L-ghost; pass: V09 §6.1's
  rows + 10 %; else apply V09 §6.1's fallback before building further tools on it.
* **S-A2 — the local store on three engines (M2a).** The journal, compaction and recovery on Chromium, Firefox and
  WebKit, including WebKit's eviction of script-written storage for sites not installed; measure the write cost and
  verify `navigator.storage.persist()`; where persistence is not granted, the Storage section says once "Your browser may
  clear saved towns after a while. Install the app or download your towns to keep them.", and the Download banner appears
  after the first hour of editing in such a session.
* **S-A3 — the touch recogniser (M3a, first week).** V09 §4.12's gesture mapping on an iPad-class and an Android-class
  tablet: long press, second-finger free placement, pinch during a draw; pass: T-V9-22's scripts; else free placement
  becomes a "Place freely" chip in the options strip.
* **S-A4 — a raised course's preview at METROPOLIS (M3a, first week of item 110's tools).** A 5 km aqueduct over built
  land and a viaduct's removal on a METROPOLIS document: measure L-ghost against V09 §6.1; pass: + 10 %; else
  `raised.previewOnReleaseKm` is lowered to 1 km for that rung, reported, and T-V9-3 records it.

### 8.3 Risks, in order

1. **The first-five-minutes test fails a task** — §13.4's fallbacks: first-screen and hint revisions, a re-run with new
   participants before the milestone exits.
2. **L-ghost at CITY and METROPOLIS for T3 and T4** — V09 §6.1's fallback: preview on release.
3. **Browser storage eviction** — S-A2's outcome; "never lose work" then rests on the download and install paths, which
   the Storage section states plainly.
4. **Touch** — §13.4's fallback: L3–L4 pointer-only on touch.
5. **Volume 10's clerk arrives after AP3** — the drawer ships against the scripted test clerk (T-V9-27); the built-in clerk
   plugs into the same slot at M3c (AP8).
6. **The siblings' records arrive in another shape** (V04's causes and `blockedBy`, V10's `TurnView`, V11's tables) — the
   screens read each through one projection (`WhyCardModel`, the cause table, V09 §2.6's mapping), so a change is one
   table's rows.
7. **Item 110's base mechanisms land late or in another shape** — the tools read them only through §7.1's events and
   §11.2's effects, hit stack and last-outline answers (items 465, 466, 467); until they land AP3 builds against the
   harness's scripted engine stub, and T-V9-51 – T-V9-63 run when the engine side lands inside M3a.

## 9 Decisions (each vetoable)

Each row is "chose X over Y because Z", final unless the owner or the Fable retrovalidation vetoes it. A row a later row
changed carries one mark — "superseded by" or "amended by" that row — and the governing row keeps the reason; the body
states the governing text.

| id | decision |
|---|---|
| J-V9.1 | one shell with host slots (`ShellMode`, `HostSlots`) over a separate host application, because V08's differences are a short list and one fix then reaches both products |
| J-V9.2 | superseded by J-V9.36 |
| J-V9.3 | accepting a pending ghost implicitly at the next gesture or tool over an explicit Accept, because R1 forbids dialog-first flows; Esc, Cancel and undo keep refusing cheap |
| J-V9.4 | commit on release for what a gesture draws and Accept for what the user chooses among, because chosen things carry counts or candidates to judge first (R3, R14) |
| J-V9.5 | a journal of API calls replayed with a `logHead` check over journalling log events, because truncation and confirmed fates change the log's shape while replay is exact and self-checking |
| J-V9.6 | wall-clock times in the local journal, not the document, because `EditBase` has no time field and adding one would change every digest for a display detail |
| J-V9.7 | restore points as shared view keys, one per point, over a canonical list, because bookmarks must never move the model digest and one key per point merges concurrent additions |
| J-V9.8 | confirming a dry run's renames as one set over per-rename choices, because keeping one old name is a different event that changes the dry run itself |
| J-V9.9 | three layout classes — every tool on wide and medium, a viewer with light edits on narrow — over full editing on phones or none on tablets, because handles need 44 px targets with the map visible, and §13.4 decides tablets with a fallback |
| J-V9.10 | the clerk's conversation in memory only, over saving it in the document, because accepted proposals carry their provenance and a chat may hold what the user did not mean to keep; amended by J-V9.34 |
| J-V9.11 | an installable offline web app with no telemetry and no network use but the clerk and a host's resolver, because the base has no hosted service (§11.5) and games run without a connection |
| J-V9.12 | our own icon sprite for the tools and app marks and one permissively licensed set for generic glyphs, through one adapter file, because tool icons carry the product's identity (§17.4's licence rule holds) |
| J-V9.13 | "what anyone knows" as the Share sheet's default tier while the export dialog defaults to the view's, because sharing is where a secret leaks by accident |
| J-V9.14 | a three-way walls chip (none · one ring · two rings) over a slider, because the control is discrete (§7.8's registry) |
| J-V9.15 | the four-task sessions inside M3a with a non-gating pipeline session at M2a's exit, over pulling M3a's T5 and T6 engine pieces into M2a, because moving them would reorder the base's milestones (item 494) |
| J-V9.16 | the system UI font stack for the chrome over a bundled UI face, because it costs no bytes and leaves the bundled faces to the map |
| J-V9.17 | handles at the most salient corners over evenly spaced or all vertices, because users grab corners and 4–8 handles keep an edit a drag (item 101 (i) rule 3) |
| J-V9.18 | `sizeM2` on the quarter's points form for the badge's plus and minus over a size event, because one parameter on an existing event suffices (item 348) |
| J-V9.19 | showing a link or siting edit as a changed binding with "Show better sites" over moving buildings at once, because a move is a relocation the author sees first (R3) |
| J-V9.20 | curved provider-to-consumer arcs over street-routed lines, because hundreds of routed lines overlap and hide the pattern; V08's chain view stays its own |
| J-V9.21 | six stepped shade veils under the buildings' fills over a ramp or a top veil, because steps read as a legend and under-drawing keeps buildings legible |
| J-V9.22 | no copy and paste of buildings, because a copied building is no declaration the rules can derive; T6's stamp is "the same kind here" |
| J-V9.23 | a roster card accepted alone as a one-line `roster` with the rest re-previewed, over committing a subset of one solve, because a committed subset must be its own solve |
| J-V9.24 | existing events for compound gestures (`swapUse`, a group of `undo`s) over new kinds, because §7.1 and §7.4 already carry their undo and replay; amended by J-V9.47 |
| J-V9.25 | superseded by J-V9.33 |
| J-V9.26 | the owner's UX sitting on §13.6's shape as a gate at M3a, because the owner is the casual user the product is for |
| J-V9.27 | a dedicated-user bar — the known city rebuilt by hand in ≤ 90 minutes — beside the scripted canvas, because "a dedicated user can build it" is not measured by a script |
| J-V9.28 | requesting persistent storage and stating eviction plainly over promising permanence, because WebKit may clear storage for sites not installed |
| J-V9.29 | pages of three variations with "Show three more" over a user-set count, because R5 names three and a fixed number bounds the cost |
| J-V9.30 | live-layer providers (`live.shade`, `live.links`) over thematic rows, because their values are a derived raster and derived bindings, not attributes |
| J-V9.31 | `MsgRef` for the engine's bend and conflict lines over English strings, because the catalogue then owns every word and a locale is a file; amended by J-V9.55 |
| J-V9.32 | the siting rows' "it stays here until you move it" over re-siting automatically, because an automatic move would break declared-means-held (§7.2) and dossier authority |
| J-V9.33 | rendering V10's `WhyAnswer` through one projection, `WhyCardModel`, over a second answer type in the base, because one oracle has one owner (V10) |
| J-V9.34 | V10's drawer view model and harness as the one committer, on Accept or apply-then-undo, over a shell committing through a facade, because V10's acceptance re-checks the card the user saw; `ClerkMount`, `ClerkHandle`, one `ClerkSettings` store |
| J-V9.35 | the drawer's first-open cards one at a time, each skippable, over one combined card, because consent comes before any key and each card answers one question; amended by J121 (the key card only where the configuration asks) |
| J-V9.36 | V11's two document-only tables, by `editTable`, as the one store of siting, link and split declarations, keyed per kind (`uid:`, `cat:`, `cls:`; `use:` only to keep one institution's works together), over per-use attributes, because solver, clerk and canvas read one store and item 104 (a) (1) keys by kind |
| J-V9.37 | three link-edit cells — `bindTo`, `avoid`, `cut` — over overloading `cut`, because each of the link view's buttons then writes one unambiguous row |
| J-V9.38 | V04's name for the hidden-voids option as a per-viewer view key offered only at `secret`, over a logged layer field, because a game master's toggle must never enter the log (item 278) |
| J-V9.39 | stating the catacomb bend ladder once as the dry run of `drawChamber { system: { newKind: 'catacomb' } }` (item 361) and wording it here, because R2 requires a bend for each misplaced catacomb |
| J-V9.40 | expanding a dwelling declaration on a sealed void into a closure that opens a way in, over refusing it, because §7.3 item 9's closure exists for this; amended by J-V9.102 |
| J-V9.41 | one preview contract for variations with one committed group per source, a clerk's alternatives each previewed by its own call, because both must replay exactly (item 461) |
| J-V9.42 | merging four requests with V10's (`sizeM2` clamping, one `MsgRef` mechanism, the top three sites as alternatives, members from `EntityCard.members`), because each fact has one owner |
| J-V9.43 | a T1 change after a declaration previewed as a whole-town ghost with Accept, the fates sheet only after Accept and only when fates move, because R1 forbids a dialog before a picture |
| J-V9.44 | turning every refusal that is not a dossier fact, lock, dependency, role, staged layer, rung or screen into a bend with its alternative pre-selected, every remaining refusal with a button, because R2 and T101-5 require the closest alternative |
| J-V9.45 | a two-phase journal (pending, then done) with a fates-sheet confirmation in its resubmission form, over writing after `ok`, because a kill between commit and write would lose a commit |
| J-V9.46 | "View as" as a display filter separate from the knowledge key, over lowering the key, because a lowered key stops autosave and downloads (item 464) |
| J-V9.47 | local handle drags — a boundary's run between neighbours, a lake's level handle only, gates by `moveVertex`, an island's rim by `resizeIsland`, More handles = clamp(round(perimeter ÷ 75 m), 8, 16) — because a drag must stay local and never contradict a derivation rule |
| J-V9.48 | designing the People panel, person card, family tree and clock here at M4b, because §14 places the family-tree view in `@plat/app` |
| J-V9.49 | a link cache bound once per `logHead` and re-bound incrementally, compaction only when idle, and a shade sampler's cost law with a coarser fallback, because METROPOLIS would otherwise stall |
| J-V9.50 | recording each canvas-script gesture's view scale and centre and replaying at that view, because snapping resolves in screen pixels |
| J-V9.51 | a "Recently deleted" list kept 30 days, purged earlier only on asking, over a 10 s undo, because R11 and R15 promise nothing is lost by one click |
| J-V9.52 | the context menu generated from the registry and `toolkit.json` in a fixed order, because panel and menu must offer the same actions without code per kind |
| J-V9.53 | V05's strip rows drawn as V05 states them (a solid line at three of nine, a dashed pending line) over this volume's veil, because V05 owns the strips; the veil's steps carry "some, much, most of the day" |
| J-V9.54 | "Show the whole circuit" as a `LayerSpec` option of the wall layer over a view key, because it is a style choice exported in pictures and V07's palisade relies on it |
| J-V9.55 | the catalogue scoped to the application's own words, T-V9-15's readability step run over V10's and V11's sentences, because each sentence has one owner; amended by J-V9.79 |
| J-V9.56 | seven size chips at population quantiles of the rungs' bands, each showing its number, because population sets size within a tier |
| J-V9.57 | placing the base's view keys, notes, pins, favourites, grid, legend, emblem, compass and ruler in named view-bar groups and the Notes and Dress panels, because the application is their only writer |
| J-V9.58 | designing item 110's tools in this volume (V09 §4.20), because an implementer must build them without guessing |
| J-V9.59 | widening `drawWall` with `retaining`, `drawWay` with `raised` and the `aqueduct` class, and a `terrace` sugar, over new kinds per record, because one tool mode maps to one event family (item 362) |
| J-V9.60 | bending a retaining wall drawn on flat ground onto the nearest step, else into a terrace, over refusing it, because R2 refuses only a fact or a lock |
| J-V9.61 | bringing a raised way down before a town wall, through its gate, over carrying it over, because a deck over a curtain is an unguarded way in |
| J-V9.62 | a basic Raised toggle and an Aqueduct chip on T4, with PageUp and PageDown while drawing, over a raised-way mode, because item 110 (b) names them and the surveyed tools use those keys |
| J-V9.63 | a previewed Delete that needs Accept when the removal changes anything beyond the thing, because R1 and R3 require consequences seen first |
| J-V9.64 | one typed effects list on the preview and the confirmation, the kind `added` among them, because words must reach the fates sheet, a screen reader and the clerk (item 465) |
| J-V9.65 | click-again cycling through a hit stack with "Select below", over a modifier-click, because alt-, shift- and ctrl-clicks are taken (item 466) |
| J-V9.66 | a deck's budget shown as its storey cap and footprint band, a refused class bent to its landward end, because the budget is V11's row and R2 bends first |
| J-V9.67 | superseded by J-VI.4 (item 101 R2): those cases are bends |
| J-V9.68 | a raised part kept on the Ground working layer, reached by the hit stack, over a fourth layer, because it is a ground arena part whose ends join ground vertices |
| J-V9.69 | one deck scene per raised way, a level of a multi-level scene, because a fight on a viaduct needs the deck's parapets at its height (item 447) |
| J-V9.70 | carrying an author's removals of generated content in the skeleton, by reason key, because a removal is the author's act that holds (item 455) |
| J-V9.71 | allowing a closed retaining chain as a platform, because "never an enclosure" means no `Enceinte`, which the fold enforces |
| J-V9.72 | an unchecked "Keep them as yours" when a Re-derive to TOWN drops a city's generated raised ways, because the choice costs one click |
| J-V9.73 | a Raised toggle reset each time T4 is picked, never remembered, because a remembered toggle turns the next street into a viaduct |
| J-V9.74 | T10 as `delete`'s home tool, the Delete key and the context menu its gestures, because each kind has one home tool (T-V9-12, T101-1) |
| J-V9.75 | a well pin as the bent result of an aqueduct with no higher source, over a cistern, because a cistern is an underground chamber the ground tools do not draw |
| J-V9.76 | superseded by J-V9.106 |
| J-V9.77 | a removed thing's former shape from the base's tombstone (`Tombstone.last`, item 467) over an app journal, because a delete by the clerk, a host or another session must offer Show and Build it again too |
| J-V9.78 | the `terrace` sugar expanded into the one flatten mode with `levelCm` (item 366), because the base carries one flatten mechanism |
| J-V9.79 | V10's key families carried in the one catalogue file with V10's texts, only two sub-families worded here, because one sentence has one owner and no raw key may reach a user |
| J-V9.80 | a card-only mode of the one drawer through a clerk slot of kind `host`, over a host card component or the full drawer under configuration C, because one card is drawn once and one assistant per product |
| J-V9.81 | the bridge handed to the harness through `ClerkMount.host`, over the transport or a wider `clerkMode`, because the embed owns the transport and the proxy token stays out of shell state |
| J-V9.82 | `WhyAnswer.sections` drawn as titled blocks, `WhyCardModel.under` withdrawn, a raised way's `decidedBy` from its own row, because one explanation reaches the screen from one row |
| J-V9.83 | a one-line `roster` on T6's binding row (item 570) over moving a locus drop to T7 or an app-minted id, because the sugar mints the id and the rows must list what each tool emits |
| J-V9.84 | T6's drop-on-a-plot mapper as V10 §4.1's `where.at` and `where.plot` rows, the name a `setAttr` in the same group, because the base's `Designation` has no name and T101-3 needs equal bytes |
| J-V9.85 | `ViewOpts.viewAs` holding a key form `{ tier, places }` set by a host's players' view, over a tier-only View as, because a party's learned places are no tier; while set, the menu's other entries are disabled |
| J-V9.86 | the effective key passed as `admitAs` on every band-less read and as the export default, the application's own dry runs kept at the role's key, because only the facade knows every withheld fact and a filtered dry run drops fates |
| J-V9.87 | a point-dropped `placeAt` written `plot: ''` with the point form, over the shell filling `plot`, because the dry run knows the nearest lawful plot and both surfaces emit the same bytes |
| J-V9.88 | on a dossier-bound map, a refusal card for T6's locus drop with the element picker and **Put it at {site}** from a `sites` query narrowed by the locus, because the dossier owns the roster and R2 needs a one-click alternative |
| J-V9.89 | controls for V10's `help` and `roster` entries (**How do I …?**, **Ask the assistant to place these**), shown only with a clerk on, because an entry without a caller is a dangling wire |
| J-V9.90 | the skeleton import dialog running a finding's fix through the shell's pipeline as the user's declaration with no `proposedBy`, because the check works without the model; V10 §2.6's one exception |
| J-V9.91 | `HostSlots.historyLines` drawn as its own group "The party", over folding host lines into `HistoryRow`, because a reveal is no log event |
| J-V9.92 | `HostSlots.newDocuments` (`'download'` or `'off'`) for every action that makes a new document in host mode, no creation mode there, because the frame holds one live document and a host-side copy would be a new capability across the boundary |
| J-V9.93 | "Start a new map from this" as a drawer-menu item with `attach.newMap`, standalone only, because a new town must not cost the current one |
| J-V9.94 | `ClerkMount.rebuildEvents`, one implementation reading tombstones at the view's effective key, because two implementations drift and a withheld thing must not be rebuilt from that view |
| J-V9.95 | Build it again as one row per kind item 260 suppresses, each the removed thing's own tool's declaration from its last record, because a removal with no way back breaks "add or remove" |
| J-V9.96 | the older-document row split into §2.9's three outcomes — edit under its own version with an upgrade offer; the frozen view with **Edit it with this version**; **Open its recipe with this version** — because each has its own path |
| J-V9.97 | a frozen view's notice as the shell's own `error.frozen` strip in both modes, because its control commits an event only the shell's pipeline issues |
| J-V9.98 | `fileMenu: false` keeping Export skeleton, Rebuild around my drawings, Settings and About, dropping New town, Open…, Save a copy and Recently deleted, because the kept ones are an export, an edit and preferences the frame needs |
| J-V9.99 | T7's list cards with V10's `dossier` alternative (the element picker and **Put it at {site}**), because one engine refusal renders one card on canvas and clerk |
| J-V9.100 | a locus worded as the exact reverse of V09 §4.16 (4), and `refuse.roster.dossier` as "…on a plot {locus}", because the round trip lets T-V9-13 test the wording mechanically |
| J-V9.101 | **New trees** as T12's `rerollLayer { concern: 'render.instances' }`, town-wide and committed at once, because §7.1's T10 row lists no layer re-roll and trees' positions are drawn from `render.instances` |
| J-V9.102 | the dwelling closure's ladder dug access → public opening → `collapsed_shaft` from the public ground over the cluster → the bend onto ground part 0, because item 372 keeps homes below wherever ground over the void is public |
| J-V9.103 | AP5 split into AP5 (time, M4) and AP5b (host mode, M-SF), the host clauses run at M3c on the harness's scripted host page and again at M-SF, because V08 builds the embed at M-SF |
| J-V9.104 | a raised way's context controls and a way's own `setAttr`, `split` and `merge` homed under T9, because §7.1's T9 row owns `setAttr` and one kind has one home tool on both surfaces |
| J-V9.105 | V08's `supplyChains` view as one more `thematic` value in the Show menu, offered only while an active chain is listed, because thematic views are switched only there |
| J-V9.106 | J-VI.4 (d), (e), (g) and (h) carried into V09 §4.20.2 (6) and the island bends, each bent result its own key (`bend.aqueduct.onIsland` among them), the inward move to 1 m inside the setback line asked of V05, because one key per result keeps each line true |
| J-V9.107 | a dossier group formed from a `dossierFacts` event and the port's events that follow, up to the next ledger event or another session's event, because the port's events carry no `group` |
| J-V9.108 | a note's binding keys resolved by the `entity` input `dossierKey` (item 583), because one band-less read per key keeps admission under `admitAs` |
| J-V9.109 | the report's "What moved" entries and placement states as catalogue families (`report.moved.<kind>`, `report.dossier.<state>`), because no engine code reaches a user without a row |
| J-V9.110 | **New names — this quarter**'s gazetteer read with `admitAs` = `effectiveKey()`, because both surfaces then write the same bytes and a withheld name is not re-drawn out of sight |
| J-V9.111 | `refuse.assignment.noSite`'s **Put it at {site}** as the same declaration at the first `moveTo` target, because a refused new assignment has no element for a `placeAt` |
| J-V9.112 | **Use another building** as a re-preview grouped after an explicit `addUndergroundAccess` from the next qualifying building listed by the dry run, because only the dry run knows which buildings qualify |
| J-V9.113 | `info.raised.suppressed` lines drawn from V06's per-epoch `suppressedFired` list, over a `why` per removed way, because the epoch report is the panel's read for an epoch |
| J-V9.114 | a key argument on `HostSlots.historyLines.list`, called with `effectiveKey()` at each draw, because the shell's key computation is the only one |
| J-V9.115 | one **New decoration** control writing `style.jitter` then `style.crowns` as one group, because the base calls the pair "decoration" and one plain button suits the reader |
| J-V9.116 | report-entry `{ id }` arguments read at `effectiveKey()`, a withheld one shown by its kind word and left out of the targets, because a change may be known while its name is secret |
| J-V9.117 | superseded by V09 §13's closed hand-offs |
| J-V9.118 | `bend.under.accessDug`'s alternative as a list form "Dig down from {building} instead", because a card showing every alternative needs one label per building |
| J-V9.119 | a raised way's reading cited as `RaisedOutcome`'s reason key with its `declared` outcome, because a citation must name a field its target holds |
| J-V9.120 | V10 §3.5 step 3's why target cited for **Show me why**, over a second statement here, because canvas and clerk open one card for one row (T101-3) |
| J-V9.121 | typed button lists (`MsgRow.buttons?: MsgButton[]`, a shared `button.*` family, every `refuse.*` row ending with `button.showWhy`) with a sixth class `app` for application-only commands, because each button becomes data |
| J-V9.122 | V06's bend below a rebase point — the earliest seq with `info.copy.condensed` — over a disabled control, detected from `forkedFrom.seq`, because V06 already records it |
| J-V9.123 | two unwired buttons withdrawn (`bend.capacity`'s and `success.saved`'s) rather than inventing sources, because no query names buildings with room and a page cannot reveal a saved file |
| J-V9.124 | tool modes named by rule (the row's name in lower camel case) and the why page's id forms (`messages#<key>`, `staged/<layerId>`), because buttons and T-V9-32 need an address |
| J-V9.125 | the roster reader and T6's palette scoped to the classes the document's rung admits, ties by `commonness` within that set, because V11 makes a label unique only within its namespace |
| J-V9.126 | a local record from a newer application opened read-only with `info.newerApp` and Download, over migrating it down or refusing it, because an older build cannot know the newer record's fields and must not overwrite them |
| J-V9.127 | one channel per link cue — colour and dash pattern the goods family, a hollow arrowhead satisfaction below 1, half width impaired — over combined cues, because each second cue must carry one meaning (item 112) |
| J-V9.128 | the oasis as T2 Lake's Oasis chip writing `drawWater`'s lake points form with `spring: true`, over a new tool or event, because §7.1's T2 row carries the form and one mode keeps one event family (item 111) |
| J-V9.129 | the History chip as one `adjust('blueprint.history', …)` Re-derive after an auto restore point, absent on a neighbourhood document and locked in host mode, over a separate history tool, because item 113's hint is a blueprint field and V06's replay runs at generation |
| J-V9.130 | colour vision as the per-viewer view key `cvdVariant`, in Settings and the Dress panel, never logged nor sent over a bridge, because it is one viewer's need, not the town's (item 112 (a)) |
| J-V9.131 | V09 runs the game-master trial and holds its `GmTrialRecord`, its findings V12's `TrialFinding`s and the participants' forms outside `plat/`, because §16 assigns the trial to V09 and V12 owns intake (item 112 (b); J122) |
| J-V9.132 | a lost void drawn faded with its "once known" label and `info.under.lost` at every key its `knownTo` admits, without the hidden-voids option, because what a town has lost is part of its known story (V04 §5.2) |
| J-V9.133 | the draft's own degenerate rules (a stroke under two distinct points is a click; a ring under three or of zero area maps to no event; a handle stops at its last lawful position) and virtualised long lists, over engine refusals for each, because no gesture should reach the engine with nothing to say (V09 §3.16) |
| J-V9.134 | a point on a lifted island un-displaced by its elevation × `offsetPerMetre` before snapping and mapping, over picking in drawn space, because the island's plan is where the event lands (V05 §4.2) |

## 10 Base change requests

Every request this volume made of the base is applied by file f (`docs/AMENDMENTS-2026-09-28f.md`); its text lives at the
base section the item names, with the item's landing milestone, and this volume cites it there as base text.

| request | the base text it changed | applied as |
|---|---|---|
| BCR-V9-1 | §14: `@plat/app`'s contents | item 514 |
| BCR-V9-2 | §14: the walls control and the keymap | items 458, 515 |
| BCR-V9-3 | §2.9 *View state*: three view keys — `workingLayer` is ground, a sky island's `PlatKey`, or the underground (its band the view key `depthBand`) | item 277 |
| BCR-V9-4 | — (superseded by J-V9.36: V11's document-only tables) | — |
| BCR-V9-5 | §11.2: the `links` query kind | item 460 |
| BCR-V9-6 | — (superseded by J-V9.33: V10's `WhyAnswer`) | — |
| BCR-V9-7 | §8.2: two live layers and the field driver | item 411 |
| BCR-V9-8 | §14: the application's tables | item 516 |
| BCR-V9-9 | §14: the feature snap by role | item 517 |
| BCR-V9-10 | §11.2: variations through the preview, and thumbnails | item 461 |
| BCR-V9-11 | §11.2: the wall's arcs in its preview | item 462 |
| BCR-V9-12 | §11.2: message keys in the preview; placement alternatives | item 463 |
| BCR-V9-13 | §7.1: a wall stretch's grade as an edit | item 360 |
| BCR-V9-14 | §11.1: an export's knowledge tier, lowered only | item 453 |
| BCR-V9-15 | §11.1: the tabletop scene's four details | item 454 |
| BCR-V9-16 | §7.1: a quarter's target size | item 348 |
| BCR-V9-17 | §13.4: when the first-five-minutes sessions run | item 494 |
| BCR-V9-18 | §16: the application's pricing | item 530 |
| BCR-V9-19 | §2.8: a label and a help anchor per edit path | item 269 |
| BCR-V9-20 | §2.9: the hidden-voids view key and its knowledge rule | item 278 |
| BCR-V9-21 | §7.1: a chamber that starts a system; the catacomb bend ladder | item 361 |
| BCR-V9-22 | §7.3: dwellings in a sealed void as a closure | item 372 |
| BCR-V9-23 | §11.2: "View as" as a display filter | item 464 |
| BCR-V9-24 | §13.3: the editor's sittings in the milestone record | item 490 |
| BCR-V9-25 | §8.4: the wall layer's whole circuit | item 413 |
| BCR-V9-26 | §7.1: item 110's events | item 362 |
| BCR-V9-27 | §11.2: a preview's effects | item 465 |
| BCR-V9-28 | §11.2: the hit stack | item 466 |
| BCR-V9-29 | §7.1: a raised way and a town wall | item 363 |
| BCR-V9-30 | §2.7: a long bridge's mid-span landmark slot | item 246 |
| BCR-V9-31 | §11.1: item 110 in the formats | item 447 |
| BCR-V9-32 | §11.1: removals in the skeleton | item 455 |
| BCR-V9-33 | §2.7, §7.1: a crossing's form and a raised way's measures | items 244, 364 |
| BCR-V9-34 | §11.2: a removed thing's last shape | item 467 |
| BCR-V9-35 | §7.1: a place by a locus is T6's one-line roster | item 570 |
| BCR-V9-36 | §11.2: an entity by its binding key | item 583 |

Item 277's text reads `workingLayer` as BCR-V9-3's row above states it, matching V09 §2.4's `WorkingLayer` and V04's
`depthBand`; the base's §2.9 carries that reading.

## 11 Owner questions

None open. The owner's delegation (J121, J122) answered every question this volume put, and the design reads each answer
as an input:

| # | question | answer |
|---|---|---|
| Q1 | where and when the editor goes on the web | follows SettlementForge's staging (J121): AP2's builds are read on SettlementForge's staging host; the public release is SettlementForge's, behind §16's release gate |
| Q2 | how the first-five-minutes participants are found and thanked | five SettlementForge users per round from its community, thanked by credit and early access, no payments (J122; V09 §7.3 (2)) |
| Q3 | the editor's name on screen and in files | follows SettlementForge (J121); "PLAT" stays the working name in every build until then |

The clerk's provider, key and assistant follow SettlementForge's AI setup (J121, J122; V10's own record). Item 110's,
item 111's, item 112's and item 113's screens raise no owner question.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read evidence).** Every base section V09 §1.2 names, read at its current text in the coherence pass's base
(`docs/validation/coherence/new/base/`), with file f's items cited in V09 §10 and V09 §13 and file g's items 101–113
whole; `docs/DEFINITION.md`, `docs/OWNER-INSTRUCTIONS-2026-09-25.md` and `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`
whole; `research/ux/tool-survey.md` Part I D and E and Part II (§1–§6); the tool mappings and the sections cited of V01 –
V07 as landed in the coherence pass, and of V08, V10, V11 and V12 at their current texts; V12 §2.14 and §3.14 for the
trial's findings and the known-city fixtures. Nothing of this volume was built or run.

**PLAUSIBLE (reasoning, to be measured).** Every budget of V09 §6 until the milestones' harness measures it, each with
the test that calibrates it — the latency rows (T-V9-3), the boot and bundle caps (T-V9-73), the compaction thresholds and
times, the link cache's 120 ms and 5 ms and the shade sampler (T-V9-47), the deck scene cap (T-V9-61), the autosave and
recovery figures (T-V9-17); our own constants — the handle salience rule, More handles' 75 m, the quarter's ± 12.5 %
step, the 500 ms long press, the 22 px coarse snap radius, the shade view's six steps, the link view's caps (150 and 400),
the seven size chips' quantiles, the 30-day bin, the 15° angle step, the 20 % re-roll-brush cover, V09 §4.20's
item-110 constants, V09 §3.16's 12 px handle spacing — each an application constant outside V12's register (V12 §3.11),
calibrated by the test its row names; the estimates of V09 §8; the browser storage behaviour (S-A2); the trial's four to
eight weeks; and the whole of the user experience, which only the first-five-minutes rounds (V09 §7.3), the owner's
sittings (V09 §7.4) and the game-master trial (V09 §7.6) confirm.

## 13 Fix list

None open. Every hand-off to this volume is closed in its text, and every hand-off it made is closed at its
destination.

| hand-off | from → to | closed at (an outgoing one: at its destination, or routed to its lane) |
|---|---|---|
| X6 | V06 → V09 | V09 §5.12 (History settings, V06 §2.2); V09 §4.5 T1 (V06's time card, V06 §4.1); V09 §3.9 (before a rebase point); V09 §4.7 (link pin, move, cut) |
| X21 | V06 → V09 | V09 §4.20.3 (the delete's dry run and fates); V09 §4.3 (the hand forms' tool rows); V09 §4.14 (the `raisedWays` row) |
| X30 | V06 → V09 | `bend.time.hoodAlone` (V09 §4.9, V09 §4.21.2); `repairRetaining` on T3 (V09 §4.3); `info.remove.holds` for a retaining wall and a deck plot (V09 §4.9) |
| X39, X44 | V06 → V09 | V09 §4.20.3 (4) (Build it again's forms); V09 §4.10's `epoch` row (`suppressedFired`) |
| X12, X15 – X18, X20 | V08 → V09 | V09 §4.9 (`host.*` rows), V09 §2.2 (`HostSlots`, `fileMenu: false`), V09 §4.10 (the party group, dossier groups, `list(key)`), V09 §5.4, V09 §5.7 |
| CVR-V10-4, -7, -15 – -20 | V10 → V09 | V09 §6.2, V09 §4.3, V09 §2.10, V09 §2.6, V09 §4.9, V09 §4.5's T11 row, V09 §4.11, V09 §2.9 |
| X-V11-13, X-V11-14, X-V11-17 | V11 → V09 | V09 §2.6 (V11's two tables, no store of V09's own); V09 §2.3, §2.9 (registry rows 86–87); V09 §5.1 (the 45 family glyphs) |
| X-V12-6 | V12 → V09 | V09 §4.14 (the cell inspector; the historical packs in the presets dialog) |
| X-V12-8 | V12 → V09 | V09 §7.2 (V12 §3.14's structure lists, K2-4, the fixtures' folder) |
| X-V12-10 | V12 → V09 | V09 §4.20.3 (a removal keyed to its reason) |
| X-V12-18 | V12 → V09 | nothing to change |
| XV-V9-1, XV-V9-2, XV-V9-31 | V09 → V11 | routed to V11 §4.2 (the `cls:` key form, `familyWeights` on V09 §2.6's ladder, the `avoid` cell), written by V11's rewrite; V11 §3.1's registry row 87 |
| XV-V9-3, -4, -14, -27 | V09 → V04 | V04 §1b.1 (`showUnexcavated` a view key); V04 §4.5 (`under/wayIn`); V04 §2.2, V04 §5.1 (an arch vault's `Chamber.span`); V04 §1.1 (U-DIG) |
| XV-V9-5, -15 | V09 → V03 | V03 §3.7.4 (the crypt-edit dry runs); V03 §4.2 |
| XV-V9-6, -8 | V09 → V02, V04, V05, V10 | V02 §3.14.5, §4.5, §4.6; the staged screens priced with their milestones (§16; V09 §8.1) |
| XV-V9-9 | V09 → V07 | V07 §5.1 (`LayerSpec.showCircuit`) |
| XV-V9-16, -25 | V09 → V05 | V05 §4.2 (the island bends; T10's delete row); V05 §3.22 (the inward move to 1 m inside the setback line) |
| XV-V9-7, -10 – -12, -18, -19, -22, -30 | V09 → V10 | V10's text as each cites (V10 §2.6, §3.5, §3.16, §4.1, §4.3) |
| XV-V9-17, -20, -21, -24, -26, -29 | V09 → V08 | V08 §3.1 step 7, §3.8, §5.2 |
| XV-V9-23, -28 | V09 → V06 | V06 §2.10, V06 §3.19.3 |

## Integration notes

Every integration and reconciliation decision on this volume is folded into the body at its home — the bends that
replaced refusals (J-VI.4) at V09 §4.9 and V09 §4.20, the key forms of View as at V09 §4.8, the host slots at V09 §2.2,
the buttons as data at V09 §2.9 and V09 §4.9 — and recorded in V09 §9.
