# Design volume 9 — The application: the map editor a casual user opens, and the authoring toolkit as screens and flows

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V9-application; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised by opus standing in for the Fable seat volumes/revise-V9; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised (second round, item 110) by opus standing in for the Fable seat volumes/revise-V9; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 1) by opus standing in for the Fable seat volumes/reconcile-V09-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 2) by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 3) by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 4) by opus standing in for the Fable seat volumes/reconcile-V09-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 1, continuation: seam-surfaces-r0 SS-29 – SS-46) by opus standing in for the Fable seat volumes/reconcile-V09-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 2, continuation: seam-surfaces-r1 SR-22 – SR-36) by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 3, continuation: seam-surfaces-r2 SR2-23, SR2-26 – SR2-28) by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 4, continuation: seam-surfaces-r3 SR3-12) by opus standing in for the Fable seat volumes/reconcile-V09-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 5: seam-surfaces-r4 SR4-05) by opus standing in for the Fable seat volumes/reconcile-V09-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 6: seam-surfaces-r5 SR5-01, SR5-04, SR5-07) by opus standing in for the Fable seat volumes/reconcile-V09-r6; covered by the whole-design retrovalidation (J84).

> Revision note (revise-V9, 2026-09-28). Revised in place against `docs/volumes/critique/V09.md` (50 findings: 4 blockers,
> 22 majors, 24 minors; folded for the owner's ~20:05 switch, J111: "switch it then, cathedral also gets crypts but
> cemetaries get catacombs"). The why card now projects volume 10's `WhyAnswer`; the drawer is volume 10's view model;
> the map-side siting, link and split declarations are volume 11's document-only tables; item 109 has its screens
> (hidden voids for the game master, ruins and systems on the Below layer, how a way down came about, dwellings only
> after a way in, catacombs under cemeteries and crypts under churches). Every change is listed against its finding in
> the disposition table appended to the critique. Decisions J-V9.33 on, requests BCR-V9-20 on and bars T-V9-33 on are the
> revision's; withdrawn items keep their numbers and say so.

> Revision note (revise-V9, second round, 2026-09-29). Revised in place against the item-110 addendum of
> `docs/volumes/critique/V09.md` (its §12: 31 findings, V9C-51 – V9C-81 — 2 blockers, 14 majors, 15 minors) under the
> owner's ~23:30 "they go in" and ~23:40 "i think raised ways for cities is fair for the genertor to generate adn then a
> user can decide to add or remove". Item 110's tools are designed in the new V9 §4.20: retaining walls and terraces,
> raised ways and aqueducts, removing and re-adding them, decks and their landmark slots, stepped tiers, what else a
> change does, reaching what lies under a deck, and the Sky layer. Plots on a bridge deck are no longer staged. Decisions
> J-V9.58 on, requests BCR-V9-26 on, cross-volume requests XV-V9-10 on and bars T-V9-51 on are this round's; the
> disposition is appended to the critique as its §13.

PROGRESS (one line per section: planned | done)
- 0 In plain words: done (revised; second round for item 110)
- 1 Scope, base hooks, out of scope: done (revised; second round for item 110)
- 1b Wiring table: done (revised; second round for item 110)
- 2 Data model: done (revised; second round for item 110)
- 3 Generation (the app's runtime flows): done (revised; second round for item 110)
- 4 Editing (every screen's declarations, the tool binding table, the clerk's view): done (revised; second round for item 110)
- 5 Rendering, labels, exports (the screens, the dialogs): done (revised; second round for item 110)
- 6 Performance budgets: done (revised; second round for item 110)
- 7 Tests and acceptance bars: done (revised; second round for item 110)
- 8 Build plan: done (revised; second round for item 110)
- 9 Decisions: done (revised; second round for item 110)
- 10 Base change requests: done (revised; second round for item 110)
- 11 Owner questions: done (revised; second round for item 110)
- 12 CONFIRMED versus PLAUSIBLE: done (revised; second round for item 110)
- 13 Fix list: done (revised; second round for item 110)
- Reconciliation round 1 (reconcile-V09-r1; seam-surfaces-r0 SS-06/07/08/11/13/15/16/22/23): done
- Reconciliation round 2 (reconcile-V09-r2; seam-surfaces-r1 SR-06/08/09/10/12/13/14/15/16): done
- Reconciliation round 3 (reconcile-V09-r3; seam-surfaces-r2 SR2-01/02/11/13/14/15/18): done
- Reconciliation round 4 (reconcile-V09-r4; seam-surfaces-r3 SR3-01/02/03/04/05): done
- Reconciliation round 1, continuation (reconcile-V09-r1, second brief; seam-surfaces-r0 SS-29/30/31/32/34/35/40/41/46): done
- Reconciliation round 2, continuation (reconcile-V09-r2, second brief; seam-surfaces-r1 SR-22/27/29/30/34/35/36): done
- Reconciliation round 3, continuation (reconcile-V09-r3, second brief; seam-surfaces-r2 SR2-23/26/27/28): done
- Reconciliation round 4, continuation (reconcile-V09-r4, second brief; seam-surfaces-r3 SR3-12): done
- Reconciliation round 5 (reconcile-V09-r5; seam-surfaces-r4 SR4-05, parts (a) – (d)): done
- Reconciliation round 6 (reconcile-V09-r6; seam-surfaces-r5 SR5-01, SR5-04, SR5-07): done

Revision ledger (revise-V9; planned | done)
- R0 header and ledger: done
- R1 V9 §0–§1b: done
- R2 V9 §2: done
- R3 V9 §3: done
- R4 V9 §4.1–§4.16: done
- R5 V9 §4.17–§4.19 (new): done
- R6 V9 §5: done
- R7 V9 §6–§7: done
- R8 V9 §8–§13: done
- R9 the critique's disposition table: done

Revision ledger (revise-V9, second round — item 110; planned | done)
- Q0 header and ledger: done
- Q1 V9 §0–§1b: done
- Q2 V9 §2: done
- Q3 V9 §3: done
- Q4 V9 §4.1–§4.19 rows: done
- Q5 V9 §4.20 (new): done
- Q6 V9 §5: done
- Q7 V9 §6–§7: done
- Q8 V9 §8–§13: done
- Q9 the critique's disposition table (critique §13): done

Conventions. "The base" is `docs/ARCHITECTURE.md` with amendments c, d and e folded in (their closing pass has landed,
`docs/lane-events.log` 2026-09-28 16:13) and file g's items 102–109 (`docs/AMENDMENTS-2026-09-28g.md`, item 109 (k) as revised ~20:05, J111) as the
coherence pass applies them; a section sign (§) points into the base, "V9 §" into this volume, and the other design volumes are
cited by their file (V01 `docs/volumes/V01-neighbourhoods.md` … V08 `docs/volumes/V08-settlementforge.md`) with their own
section forms. Decisions are J-V9.n (V9 §9), base change requests BCR-V9-n (V9 §10), bars T-V9-n (V9 §7). Every word the
application shows a user is quoted here in "double quotes"; those strings are the message catalogue's default English rows
(V9 §2.9) and are data, not code. Nothing in this volume is taken from a reference program's code, word lists, palettes or
screens: the reference generators' and the surveyed tools' behaviour enters only as described behaviour, cited by file and
section (`research/ux/tool-survey.md`, `research/findings/visual-spec.md`), and the application's colours, words and
layout are our own (§17.1).

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
them. Click any way down and it says how it came about ("The Old Mill dug a way down when it was built", "A sinkhole
opens here", "The sewer broke into it in year 40") and can light up the whole path in from the street. People only live
underground where there is a way in: if you draw an underground quarter in a sealed cave, the editor digs a way down from
the nearest house and tells you so. Catacombs lie under cemeteries and grow, never shrink; when they cannot grow, their
ossuaries fill instead, and the catacomb's card says why. Churches have crypts, and the cathedral always has the
largest.

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

**Getting it out.** One export button offers pictures (screen, poster or print size), a virtual-tabletop scene that
arrives in the game already walled, lit and on its grid, GIS data, and 3-D models; each shows its size and a preview
before it writes, and none of them changes the town. Sharing gives a link when the town can be rebuilt from one, and
otherwise the file.

**On a tablet or a phone.** A tablet gets every tool with touch (press and hold opens the menu that a right-click
opens). A phone is for looking, naming, placing things from a list, dressing and exporting; the drawing tools that need
precise handles wait for a bigger screen, and the phone says so where they would be.

**The assistant.** An optional assistant, clearly labelled as AI and off until you open it, can take a sentence like "a
walled harbour town with a temple quarter" and propose it as ghosts you accept or refuse, answer "why is this here?",
and check a plan for mistakes. It never draws pictures and never changes anything by itself. The first time, it says in
plain words what it sends and to whom, and asks for your own key to the AI service before anything leaves your computer;
every answer shows what it cost, and it stops at the monthly limit you set. (How it thinks is volume 10's subject; this
volume is its drawer on the screen.)

**How we will know it works.** Before each editing milestone closes, five to eight game masters who have never seen it
get a finished town and must, without help and within five minutes, paint a named quarter, put a named place near a
landmark, restyle the map and add a compass, and re-roll part of the town while keeping what they made. The owner does
the same tasks at a recorded sitting. A known-city test builds a whole original city with the structure of a
famous fantasy map three ways — typed as a file, drawn by hand in the editor, and dictated to the assistant. The file
and the hand-drawn town must come out identical, and the assistant's version must have the same structure. A second
known city — a port on a headland with terraced quarters, a harbour mole with its towers and a raised road — is built
the same ways (V9 §7.2).

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds

`@plat/app` at build depth: the standalone editor (entry `index.html`) and the **shell** that both it and the host mode
of V08 (entry `embed.html`, BCR-V8-3) run on. The shell is one program with one set of screens; a host mode is a
`ShellMode` (V9 §2.2) that removes or locks what V08 §5.1 names, and adds nothing this volume does not declare as an
extension slot. Concretely, this volume settles:

1. **The screens** — the empty state and the new-town flow (V9 §5.2); the editor frame (top bar, tool rail, map region
   with its overlays, context panel, view bar, drawers; V9 §5.1); the panels (selection and its tabs, tool options, the
   report, history with restore points, the gazetteer and "features in view", the advanced panel and the tables editor,
   style and dress, names); the sheets and dialogs (confirm the fates, export in five families, share, settings, open and
   recent towns, the keymap overlay, about); the clerk drawer; the overlays (ghost, handles, count badge, snap
   highlight, the variations tray, the bend line, the refusal card, first-use hints, toasts); the thematic views the owner's
   file-g rules ask the interface for (the shade map, the supply links, the siting "Why here?" card).
2. **The flows** — boot and open; the first map; the declaration pipeline (gesture → draft → preview → ghost → commit or
   cancel) with its latency budget; confirmation of fates and renames; variations and scoped re-rolls; undo, redo,
   restore points and "open a copy from here"; autosave with crash recovery; export; share; settings; accepting or
   refusing a clerk's proposal.
3. **The input model** — pointer, pen, touch and keyboard, one gesture grammar across them; the responsive classes and
   what a phone may do (decided: V9 §4.12, J-V9.9); accessibility beyond §14's contract.
4. **The tool binding** — every edit event kind of the base and of volumes 1–8 reached from exactly one home tool of
   §7.1's twelve (and optionally a context-panel control), in one table (V9 §4.3), with a completeness test (T-V9-12).
5. **The words** — the message catalogue: every refusal, bend, conflict, fate, error and hint in plain words (V9 §4.9,
   §2.9).
6. **The acceptance machinery** — the first-five-minutes protocol in operational detail, the owner's UX sitting on
   §13.6's protocol shape, and the known-city fixture authored through the canvas by a gesture script (V9 §7).
7. **File g's interface parts** — the shade map view (item 102 (f)); the siting explanations (items 103 (e), 104 (a)); the
   link view and link edits (item 105 (j)); the wall tool's snapping to natural barriers and its barrier-arc ghost (item
   106 (g)); a collective record's member list (item 108 (a)–(b)); a chain named as a working quarter only past item 72's
   threshold (item 104 (h) (3) as revised by item 107 (e)). The base mechanisms of those items are file g's; this volume
   designs only their screens and gestures. The declarations the edits store are volume 11's document-only tables
   (V11 §4.2), which the screens write by `editTable` (V9 §2.6), and every answer a panel shows is volume 10's
   `WhyAnswer` (V10 §2.13), projected for the card (V9 §2.7).
8. **Item 109's screens** (file g, as revised ~20:05, J111) — the game master's view of sealed caverns and ruins (V9 §4.17.1); the system chip that draws a gallery or chamber into a named system and starts a new ruin, cavern or
   catacomb (V9 §4.17.2); how each way down came about and the path in (V9 §4.17.3); dwellings only after a way in (V9 §4.17.4); the catacomb, crypt and cemetery panels, with their bends (V9 §4.17.5); the dossier facts they show (V9 §1b).
9. **The other volumes' screens** — volume 10's drawer view model, key entry, data notice, usage meter, settings,
   creation preview, import critique and transcript export (V9 §4.11, §3.12, §5.10, §5.12); volume 6's "Re-run from here",
   chronicle and use-history tables, animated history and history import (V9 §3.9, §3.12, §5.10); volume 2's massing
   handles and family strip (V9 §3.5); volume 5's shade strips and "Update shade now" (V9 §5.4); volume 7's whole-circuit
   view (V9 §5.4); volume 1's coverage and voids views (V9 §5.4); and the base's view keys, people search, family tree,
   clock, notes, pins and ruler that no other volume places (V9 §4.18, §4.19).
10. **Item 110's tools** (file g item 110, as revised ~23:40; V9 §4.20; J-V9.58) — T3's **Retaining wall** mode and T2's
   **Terrace** mode (V9 §4.20.1); T4's **Raised** toggle and **Aqueduct** chip (V9 §4.20.2); removing a generated raised
   way, and building it again (V9 §4.20.3); T6 on deck faces and at a mole's landmark slots (V9 §4.20.4); T9's tier
   controls (V9 §4.20.5); the panels, handles, span and crossing controls and why lines of the new records (V9 §4.20.6);
   what else a change does, in words, on every preview (V9 §4.20.7; BCR-V9-27); reaching what lies under a raised deck
   (V9 §4.20.8; BCR-V9-28); item 110 on the Sky layer (V9 §4.20.9); the item-110 exports (V9 §5.10; BCR-V9-31); an
   author's removals in the skeleton (V9 §3.12; BCR-V9-32); and the second known-city fixture through the canvas (V9
   §7.2). The events these tools send are BCR-V9-26's.

### 1.2 The base hooks consumed, by section

| base section | what this volume reads or plugs into |
|---|---|
| §1.2 | the one-click default request — the empty state's town (V9 §5.2) |
| §2.8 | the entity registry's per-type edit kinds, undo paths and lifecycle rows — generate the context panel's controls (V9 §4.4); `factTier` — the tier chips on every panel row |
| §2.9 | the document (`view`, `derived`, `undo` sections), the view keys and their writers, the stored authoring `session`; the `.plat` writer the autosave uses |
| §4.1, §7.7 | the skeleton file as a creation prefix; the forms catalogue and `Intent` behind T1's cards |
| §5.2, §5.4 | F-EDIT and its `ConflictAction`s — the refusal card; the generation report — the report panel |
| §6.1, §6.4 | the `intent.surprise` stream (Surprise me), Enter's successor seed; permalinks, their refusal reasons, the output-version and preview notices |
| §7.1–§7.4 | every event kind, the named actions, the dry run, the toolkit (twelve tools, sugar, points forms), declared means held, fates, variations, undo and redo with sessions, independence and truncation |
| §7.5, §7.6, §7.8 | the upgrade diff; the override layer, preferences folded at creation, the tables editor and presets dialog; the control registry, the ≤ 12-control basic panel, proxy thumbnails, layer and light controls |
| §8.2, §8.4, §8.5, §8.8, §8.9 | live layers (`live.ghost`, `live.selection`, `live.stale`) and thematic rows; the light keys; the LOD bands and first paint; the tile pyramid; the worker boundary and its snap, coverage and furniture queries |
| §9.1, §9.2, §9.4, §9.5 | labels, `displayText`, region groups; the knowledge filter; the leader-line switch; furniture, the ruler, the authoring surfaces (handles, feature snap, count badge), the underlay, framing |
| §10.3 | the people query (gazetteer), the family-tree view (module tier) |
| §11.1–§11.3, §11.5 | the export formats and their knowledge rule; `PlatApi` (`generate`, `open`, `edit`, `preview`, `confirm`, `cancel`, `undo`, `redo`, `query` with `why`, `view`, `setView`, `export`, `report`, `subscribe`); roles and view keys over a bridge; `DocResolver` |
| §12.5, §12.6 | first-map and frame budgets; edit, preview and warp budgets — the latency budget of V9 §6 is built from them |
| §13.4, §13.6 | the app harness, scripted tasks, accessibility, input scheme, the first-five-minutes test; the protocol shape reused by the owner's UX sitting |
| §14 | `@plat/app`, the interaction contract R1–R19, the per-tool interactions, the input scheme, accessibility, context help, the family-tree view |
| §16 | the milestones the application's steps slot into (V9 §8) |
| §17.1, §17.2 | the clean room (our own UI words and colours); the bundled fonts |
| item 110's homes (applied from file g by the coherence pass, with BCR-V9-26 – BCR-V9-33) | §2.7's `RetainingWall`, the raised ways' parts, supports and spans with their use, the deck plots; §3.4's ground arena parts from 1; §4.3 and §4.6's raised-way course solver, stairs and ramps; §4.7 S10–S11's levelling and deck plots; §4.8's moles, piers and quays; §5.3's revised deck invariant; §7.1's events and edit targets (BCR-V9-26, BCR-V9-33); §7.3's S7 row (BCR-V9-29); §8's drawing and shadows of raised parts and retaining walls; §11.1's formats and skeleton (BCR-V9-31, BCR-V9-32); §11.2's preview effects and hit stack (BCR-V9-27, BCR-V9-28) |

Volumes consumed (landed): V01's parameters on T1, T6, T8 and T12 and its close-up panel (V1-4.2, W7 — "volume 9 lays out
the screens"); V02's `setMassing` and `setComposition` under T9 (V2 §4.1); V03's storey switcher, plan panel and plan tools
(V03 §4.5, §4.1); V04's underground tool mapping and depth band (V04 §1b rows for the underground tools); V05's sky tool
mapping and the `key` parameter (V05 §4.2); V06's time card, timeline bar, chronicle, `forkAt` and `rerunFrom` (V6 §5.1,
§4.4; BCR-V6-11); V07's village rungs, `declareEnd` and walk-mode roads (V07 §4.2); V08's host mode, host clerk seam and
embed entry (V08 §5.1, §4.4, §3.1). Landed after this volume's first draft and read for its revision: V10 §2.2–§2.13
(settings, sessions, proposals, the drawer's view model, the oracle's typed answer), §3.1, §3.11, §3.17–§3.21, §4.2–§4.4
and §5.1–§5.4; V11 §2.3–§2.4, §3.3.1 and §4.1–§4.5 (the siting profile, the families and their `says`, the document-only
tables and their lifecycle); V04 as revised (V4 §1b, §2.2, §3.5.1, §3.5.7, §4.1–§4.4, §5.1–§5.5: ruins, the access pass and
its causes, catacombs under burial faces, the unexcavated style); V02 §4.5 as revised (the canvas-handle contract); V05's
`sky.island.shadeStrip` and `shadePending` rows and "Update shade now"; V06 §2.2's device settings, §4.4 and §5.2–§5.3.
Where this volume needs something of a sibling it names the request in V9 §10.2; the implementer reads the base, this
volume and the sibling sections cited. Read for the second round (item 110): V02's item-110 fold (V2 §2.6's `DeckContext`, `DeckBudgetRead` and
the stack records, V2 §3.15, V2 §3.16, V2 §4.6 and hand-off X21); V05 §3.22 and §4.1–§4.2 as revised in its second round (T2's
terrace and T3's retaining kind on an island's key, T4's raised stroke to a rim bent to a sky access (J-VI.4 (d)), an island's delete
turned into `convert removeIsland`); V06 §2.13 (the reason key, the raised-way ledger and BCR-V6-24's suppression); V08
§2.6b (DR-V8.7 and DR-V8.8 feed the aqueduct's and the elevated road's reasons; nothing item 110 generates is
dossier-bound); critique-V10's C10-50 – C10-53 and its CVR-V10-7 to this volume; critique-V4's C4-110-1 – C4-110-3 (the
spans' use and the arch vaults); critique-V3's V3C-73, V3C-75 and V3C-76; critique-V11's §11 (the `raisedWays`,
`terrace` and `deck` rows it proposes to volume 11); and critique-V7's walk-mode row. Each is cited where it is used.

### 1.3 Out of scope, and who owns it

* **The clerk's reasoning** — its model, prompts, tool definitions, cost and evaluation — is volume 10's. This volume owns
  the drawer, the AI label and opt-in, the proposal cards, accept / try again / undo-the-clerk's-change, and the rendering
  of every `why` answer (V9 §4.11, §5.8).
* **Host mode's differences** — no file operations (V9 §2.2's `fileMenu: false`: the file menu keeps Export skeleton,
  Rebuild around my drawings, Settings and About; SR3-02), the dossier-owned values locked, the Map tab's host actions in the frame's
  header and the frame's own strips — are V08 §5.1, §4.2 and §4.6. SettlementForge mounts no viewer frame (V08 §3.1,
  §3.14), so a viewer's filtered history is a generic host's only (§11.3; SR-16). This volume supplies the shell those
  differences switch (V9 §2.2).
* **The timeline bar, the chronicle, the time card, fork and re-run** are V06 §5.1, §4.1 and §4.4; this volume gives them
  their place in the frame and joins the chronicle to the history panel as a second tab (V9 §5.6).
* **The plan panel's and storey switcher's contents** are V03 §4.5; **the close-up panel's contents** are V01 V1-4.2; this
  volume lays both out.
* **The rows a panel shows** — class names, district kinds, goods, siting families — are volume 11's content; the UI reads
  each row's display label and icon cells (BCR-V9-8).
* **Drawing the map** is §8's; the application composes the tiles the tile worker delivers and draws only screen-space
  overlays (handles, badges, the snap highlight, the bend line) on the main thread (§9.5).
* **The D-5 map sittings** against the references are §13.6's and volume 12's; this volume reuses only the protocol's
  shape for a sitting on the editor itself (V9 §7.4).
* **A hosted service, accounts and live multi-user editing** — none (§11.5); several people share a town only inside a host
  (§11.3, V08).
* **Item 110's records and rules** — `RetainingWall`, the raised ways' parts, supports, spans and their use, the course
  solver, the arch vaults, the deck plots and their budget, the stepped stacks, the reason keys and the suppression a
  removal of generated content records — are the base's (applied from file g by the coherence pass, with this volume's
  BCR-V9-26 – BCR-V9-33) and volumes 2, 4, 6 and 11's (V2 §3.15–§3.16, critique-V4's C4-110-1, V6 §2.13, volume 11's
  `raisedWays`, `terrace` and `deck` rows). V08 binds none of it (V08 §2.6b (5)). This volume designs their tools, words
  and screens (V9 §4.20). The time card's count of raised ways built is V06's (V6 §4.1); this volume only hosts the card.
* **The underground's records and rules** — ruins, caverns, the access pass and its causes, the excavation reading,
  catacombs, their growth, ratchet and stagnation, and every bend they compute — are V04's (V4 §3.5, §3.5.7); a church's
  crypt is V03's `Basement.crypt` (V03 §3.7.4) and the cathedral's crypt basement V02's (the no-refusal crypt ladder, V2 §3.14.5). This volume shows them, maps gestures to
  their events and words their messages (V9 §4.17), and asks the siblings in V9 §10.2 for what it needs.
* **The people and the family tree's contents** — the relation store, postings, schedules and the clock's hours — are
  §10.3's module (`@plat/sim`, M4b); this volume places their screens (V9 §4.18).

## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into. Base records are cited, not
restated. A piece with no consumer or no producer would be a defect (owner, 2026-09-28: "every piece of engineering is to
be wired to something else"); T-V9-12 and T-V9-15 check the two registries mechanically.

| piece (V9 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `ShellConfig`, `ShellMode`, `HostSlots` (2.2) | the boot (3.1) from media queries and the entry; V08's `embed.html` fills `HostSlots`, its `clerkMode` from the host's `clerk.config` (BCR-V10-7), its `hostName` (XV-V9-17), its `historyLines` from `host.state`, listed at the key the shell passes (`list(effectiveKey())`, 2.2, 2.10; SR2-23), and its `newDocuments` (V08 §3.1 step 7 (b), (c); SR2-01, SR2-02; XV-V9-21, XV-V9-29); rebuilt on every `clerk.config` | every screen; the rail's availability; the export tab's formats; the Assistant button, and the clerk slot's kind (`built-in`, or `host` for the card-only drawer; SS-06); "Set by {host}" (`host.locked`) and a host card's AI mark; the history panel's group "The party" (`historyLines` of `HostHistoryLine`s, 4.10); the host-mode rule of every action that makes a new document (`newDocuments`, 3.9) | §14 `@plat/app`; BCR-V8-3 (the embed entry) |
| `toolkit.json` rows (2.3) | our table versions | the rail and options strip (4.2), the mapper (3.3), the binding table (4.3), the context menu (4.4), `@plat/docs`' tool pages, T-V9-12 | §14 `@plat/tables`; BCR-V9-8 |
| `messages/en.json` rows (2.9, 4.9) | our table versions; V08's `host.*` rows; volume 10's key families, their `en` texts loaded from V10 §2.10, §3.9, §3.9a, §3.10, §3.11, §3.12, §3.13, §3.16, §3.20 and §4.4 (V9 §4.9's explanation paragraph; SS-16; SR4-05 (b)); volume 6's `info.copy.condensed` line, loaded from V6 §3.15.5 (SR5-04) | every bend line, refusal card, toast, hint, fates word, error and panel sentence of this volume's own; every `says` of a why section, every critique, clerk refusal and notice line the drawer draws, the clerk's button words (`clerk.alt.*`), and the withheld kind words; `@plat/docs`' messages page with one anchor per row, `messages#<key>` — the page a row's **Show me why** opens by V10 §3.5 step 3's target rule (V9 §5.15; SR5-07 (c)); T-V9-15 and T-V10-29 | §14 `@plat/tables`; §5.2 F-EDIT; BCR-V9-8; CVR-V10-4 |
| a row's `buttons` (`MsgButton` lists; 2.9, 4.9) and the `button.*` rows | our table versions, in `en.json` only (a locale file carries `text` only); the engine's `MsgRef` arguments they read, shown in the text or not (BCR-V9-12); the dry run's `ConflictAction`s, `PreviewResult.alternatives` and the dossier's unplaced elements, for `commit`'s sources | the canvas's refusal and bend cards, toasts, the fates sheet and panels (V9 §3.3, §5.3); V9 §4.9's event forms (the `commit` events), its application commands (`app`), V9 §4.5's mode ids (`tool`); volume 10's cards through V10 §3.5 step 3 (`commit` → `propose`, `why` → `why`, `show` → `select`, `tool` → `useTool` with its mode and ids, `drop` → **Drop**; XV-V9-30); T-V9-13, T-V9-15, T-V9-27, T-V10-4 | §5.2 F-EDIT; §11.2 (BCR-V9-12); T101-3 |
| `info.copy.condensed` (3.9, 4.9) | V6 §3.15.5's line; the new document's `forkedFrom.seq` above the seq asked (V6 §4.4) | the new document's opening toast after a copy or re-run below a rebase point — from the history and chronicle rows, the restore points and the drawer's `fork` and `rerun` (V9 §3.9, §4.11); T-V9-15, T-V9-27 | §2.9 `Base`; V6 §3.15.5 (J-V6.98) |
| the keymap's added rows (4.13) | `keymap.json` | the input layer; the keymap overlay | §14's input scheme; BCR-V9-8 |
| `Draft` and the draft mirror (2.4) | pointer, key, paste and card events | the mapper; the overlay's raw stroke; the recovery offer (3.1) | §9.5 authoring surfaces |
| the mapper (3.3, 4.5) | a settled `Draft` | `preview` and `edit` calls | §7.1's events and toolkit |
| `PreviewState` (2.4) | `preview`'s `PreviewResult` | the ghost (`live.ghost`), the badge, the bend line, the refusal card, the fates shown before Accept | §11.2 `preview`; §8.2 `live.ghost` |
| `VariationSet` (2.4, 3.6) | `preview` with `variations: 3` for a derived fill, or one `preview` per clerk variation (BCR-V9-10, merged with BCR-V10-6 (b)); `thumbnail` per preview | the tray; the committed group of V9 §3.6 | §7.3 item 10 |
| feature snap by role (3.4) | the tile worker's `RoleIndex.snap` with a role filter (BCR-V9-9) | the draft's points; the snap highlight; the ruler (4.19) | §9.5; §8.9's snap query |
| wall arcs in the preview (3.4) | `drawWall`'s dry run (BCR-V9-11) | the wall ghost's barrier arcs, the anchor towers, the badge's walled and barrier metres, the enclosed districts' tint | item 106 (a)–(g); §7.1's `drawWall` points form |
| placement alternatives (4.5 T6) | the top three `SiteCandidate`s of the `sites` query (BCR-V10-1; BCR-V9-12 as merged) | T6's faint alternative sites; the refusal and bend cards' "put it here" | §4.7 S10b's closest sites |
| `sizeM2` on a quarter's points form (4.5 T5) | the badge's plus / minus and the size chips | S6's grower's target in `quarter`'s dry run (BCR-V9-16, merged with BCR-V10-12) | §7.1 `PointsForm` |
| `Selection`, `HandleSet`, `CountBadge` (2.5) | clicks, lists, lassos; the selected geometry by V9 §3.5's rules; `PreviewResult.counts` | the context panel, the handles' drags (3.5), `live.selection` | §8.2 `live.selection`; §9.5 |
| the context panel and context menu generator (4.4) | §2.8's entity registry (edit kinds, attribute paths with their labels and help anchors, `factTier`), the entity schemas and §7.8's control registry | panel controls and menu entries → `setAttr`, `setAttrMany`, `editTable`, the kinds of 4.3 | §2.8, §7.8; BCR-V9-19 |
| map-side siting, link and split declarations (2.6) | `editTable` row operations on V11's document-only tables `siting.declared` and `siting.linkEdits` from the Shape tab, the per-kind panel, the link view and a clerk's accepted proposal | V11's resolver and S10b's score, the link binding, the split placement (V11 §4.2–§4.4); the `why` and `links` answers | BCR-V11-10; items 104 (a) (1), 105 (h), (j) |
| a wall stretch's grade override (4.7) | `setAttr(enceinte, 'profile/<arc>/grade')` | S7's operator as a fixed input | §4.8; item 106 (c); BCR-V9-13 |
| `WhyCardModel` (2.7) | V10's `WhyAnswer` from `query({ kind: 'why' })` (BCR-V10-1; each kind's `WhyProvider`, BCR-V10-3, and each `WhySectionProvider`'s rows, V10 §3.9) with row ids resolved to sentences by V11 §4.5 | the why card (5.8), the source chips (4.7), the drawer's why turn (4.11), the underground panels (4.17) and item 110's panels and why lines (4.20.6) — `sections` drawn by all of them (SS-15) | §11.2's oracle |
| `LinkRow` (2.7) | the `links` query, read from the generation worker's link cache (3.15), bound by S10a/S10b's binding function | `live.links`, the Link card, the GeoJSON `supplyLink` features | §11.2; item 105 (a), (j); BCR-V9-5 |
| a record's members (4.7) | `EntityCard.members` (`query entity`, BCR-V10-1) and `WhyAnswer.members` | the record panel, the gazetteer's counts | §11.2; item 108 |
| `live.shade` provider (5.4) | `ModelView.fieldDriver('daylight')`; V05's held strips (`sky.island.shadeStrip`, `shadePending`) | the Shade view's tiles, its legend and readout; picture exports while it is on | §8.2 live layers; item 102 (f); BCR-V9-7 |
| `live.links` provider (5.4) | the `links` query | the Supply links view (overlay) | §8.2 live layers; BCR-V9-7 |
| `live.coverage`, `live.voids` providers (5.4) | V01's `catchmentOf` and `districtsAbove` (V1-3.16) | the Coverage and Voids views | §8.2 live layers; BCR-V9-7 |
| `showCircuit` on the wall layer (5.4) | the wall layer's toggle, by `setLayer` (BCR-V9-25) | S14 draws the barrier arcs after commit, in the town and village products (V07 §5) | §8.4 `LayerSpec`; item 106 (g) |
| view keys `thematic`, `workingLayer`, `restore/<id>` (2.1, 2.8) | the view bar; the history panel | the live providers; the tools' layer; the restore flow | §2.9 view state; BCR-V9-3 |
| the Show menu's **SettlementForge's chains** entry (5.4; SS-41) | the gazetteer's `customChain` rows as V08 §5.2's row lists them, read at the view's effective key after each load and each commit (SR-35) | `thematic: 'supplyChains'` → V08 §5.2's thematic row: its lines, legend and GeoJSON | §2.9 view state; §8.2 thematic rows; BCR-V9-3; BCR-V8-15 |
| **New trees** (3.7, 4.5 T12; SS-29) | the Dress panel's button | `rerollLayer { concern: 'render.instances' }` → S14's instance layouts (trees, hedgerows, render-time field strips); the history line "New trees" (4.10); volume 10's `DressInput.restyle`, which reads V9 §4.3's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer` |
| **New decoration** (3.7, 4.5 T12; SR2-26) | the Dress panel's button | one group of `rerollLayer { concern: 'style.jitter' }` then `rerollLayer { concern: 'style.crowns' }`, each at the concern's current salt + 1 → the render-time hashes that read those two salts (§6.1; display only); the history line "New decoration" (4.10); volume 10's `restyle` value `'decoration'` (V10 §4.1's T12 row; J-V10.99), which reads V9 §4.3's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer`; §7.4's "decoration" |
| view key `showUnexcavated` (4.17.1) | the Below group's "Show hidden caves and ruins", offered only at tier `secret` | S14's unexcavated style (V4 §5.2); a picture export at `secret` | §2.9, §11.3, §11.1; BCR-V9-20 |
| `ViewOpts.viewAs` (4.8) | the View as menu (a tier); a host's players' view, set by the embed's bridge handler as the party's key form (V08 §3.14 (5), `seePlayersView`; SR-05, SR-06) | §9.2's filter for this view's drawing and labels; `effectiveKey()` (2.10), which every band-less read of the application passes as `admitAs` — the why card, the panels, the gazetteer, the Link card, the People panel, "Where is", T6's alternatives (2.7; BCR-V10-22; SR-08), the report's entry lines' names (4.10, 5.7; SR2-27) — and the key the shell lists the host's lines with (`HostSlots.historyLines.list`, 2.2; SR2-23), and which is the clerk's session key and the export dialog's default knowledge (BCR-V9-14) | §11.2 view options; BCR-V9-23, BCR-V10-22 |
| the base's own view keys placed on screen (4.19) | the Map, Below and Light groups, the Notes panel, the Dress panel, a viewer's style card | `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `season`, `weather`, favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings — their readers are the base's | §2.9 view state; §9.5 |
| the ruler (4.19) | key M and the view bar's button | a length or area readout; "Save as annotation" (a view pin) | §9.5 measure tool |
| the system chip and "New ruin / cavern / catacomb" (4.17.2) | the town's `UndergroundSystem` records by name and kind; item 109's admissibility by rung | `drawTunnel { system }`, `drawChamber { system }`, `drawChamber { system: { newKind } }` | §7.1; BCR-V9-21 |
| "How people get down here" (4.17.3) | `AccessPoint.cause`, `UndergroundLink.cause` (V4 §2.2) and the excavation reading's connection graph (V4 §3.5.7 (g)) | the access, cavern and ruin panels; "Show the way in"; the access symbol by cause; the access edits | II.7.4; V4 §3.5.7 |
| the dwelling closure (4.17.4) | a dwelling or undercity declaration on an `unexcavated` cluster; for **Use another building**, the dry run's `PreviewResult.alternatives` (BCR-V9-22; SR-36) | the access closure's pieces with the dwelling (BCR-V9-22), dug by V4 §3.8's U-DIG; the bend card's **Use another building** re-preview (`addUndergroundAccess` grouped before the declaration); the clerk's `propose` for the alternative (V10 §3.16) | §7.3 item 9 |
| the catacomb, crypt and cemetery panels (4.17.5) | `CatacombComplex` (V4 §2.2), `Basement.crypt` (V03 §3.7.4), the crypt join's `AccessPoint` (cause `crypt`), the burial face and V01's opening place | the panels, the extent chart, the bends' words, the fates of an author's delete | II.7.6; V4 §3.5.1 |
| the People panel, the family tree, "Where is", the clock (4.18) | `query people`, `relations`, `whereIs`; the `time` key and `sim.advance` | the panels; the map's highlight of home and work | §11.2; §10.3; §14's family-tree view |
| `HistoryRow` (2.8) | the log (and the journal's times) | the history panel, the context panel's History tab, a generic host's viewer filter (`HostSlots.historyFilter`, §11.3; SettlementForge sets none, SR-16) | §7.4 status; §2.9 log |
| `HistoryRow.lines`, `.dossierGroup` and the dossier groups (2.8, 4.10; SR-22) | the log's `dossierFacts` events — their `changes` count, the `absorbed` week their fold appends, their `notes` (V08 §3.6 step 4) — and the port's `host:port` events after each; `report(h)`'s `changes` (§5.4); `query({ kind: 'entity', dossierKey })` at `effectiveKey()` (BCR-V9-36); `query({ kind: 'entity', id })` at `effectiveKey()` for the report-entry lines' names (SR2-27); V06's `EpochReport.raised.suppressedFired` for the epoch rows' lines (XV-V9-28) | the history panel's absorb and creation groups: heads, note lines, report-entry lines, Show (V08 §4.6's absorb group); T-V9-69 | §7.4; §5.4; §11.2; V08 §4.6 |
| the report panel's dossier section (5.7; SR-22) | `report(h)`'s `GenerationReport.dossier` and `.dossierNotes` (BCR-V8-8; SR-23); the note keys by BCR-V9-36; the entries' addresses named by `entity` reads at `effectiveKey()` (SR2-27) | the placement list (`report.dossier.<state>`) and the standing-note lines under `host.group.standing`; T-V9-69 | §5.4; V08 §4.6 |
| restore flow and re-run (3.9) | a row or a restore point | `undo(h, of)` groups; `forkAt`, `rerunFrom` (V06 §4.4); in host mode the new document written by `export(h, 'plat')` to the user's device and released, or the controls hidden (`HostSlots.newDocuments`; SR2-02) | §7.4; BCR-V6-11 |
| `JournalEntry`, `LocalDocRecord` (2.11, 3.8) | every API call that changes the log, in two phases; compaction's `export(h, 'plat')` | recovery at open; the recent list; Recently deleted; the file `DocResolver` | §2.9's writer; §11.5 |
| `AppPrefs` (2.11) | first run, the settings screen, hint completion | the shell; a new document's recipe (the `generation` block); V06's history store and frame cache (their device settings) | §7.6's `userGlobal` layer; V06 §2.2 |
| `ClerkSlot`, `ClerkMount`, `ClerkHandle` (2.10) | volume 10's harness (`@plat/clerk`) implementing `ClerkHandle` over V10 §2.6's view model — every member the drawer calls (`run`, `newTopic`, `setKey`'s verdict, `defects`, SS-08) — in host mode for both slot kinds (the card-only drawer for configuration C and `off`, SS-06); `ClerkMount.host` filled by the embed's bridge handler (V08 §3.1) with `clerk.config`, `clerk.needsToken`, `clerk.config.refused`, `preview { proposal }` and `clerk.proposal` (BCR-V10-7; SS-07); `ClerkMount.effectiveKey` from the view key and View as (BCR-V9-23); `ClerkMount.rebuildEvents`, the shell's one implementation of V9 §4.20.3 (4) (SR2-14); `ClerkHandle.send`'s `attach.newMap` from the drawer's Start a new map from this (SR2-13) | the drawer (4.11) — every `ReplyBlock` rendered, every `ClerkAction` dispatched, a host's proposal card; the settings' Assistant section over `ClerkSettings` and the defect list (V10 §2.2, §2.8); V10's `HostProxyBackend` (the transport) and its session key (V10 §2.3); V10's **Put it back** (`rebuild`, V10 §4.3) from `rebuildEvents`; V10 §3.1 (4)'s creation mode from `attach.newMap` | §11.2's clerk API; §14's clerk; BCR-V10-7; V08 §3.1 |
| the skeleton import dialog (3.12) | `GenerationReport.prefix` (BCR-V10-6 (d)); `CritiqueEngine.run` (V10 §3.10); a skeleton's `history` block (V06 §5.3) | the dialog's outcomes, the findings with Show and Fix (a `propose` fix run through the shell's own pipeline, clerk or none; SR-13), "Check with the assistant" (V10's `critique` route) | §4.1, §5.4, §11.1 |
| the creation preview (4.11) | a creation proposal's scratch document (V10 §3.11 (3); BCR-V10-5), in the empty state or after the drawer's Start a new map from this (standalone only; SR2-13) | the read-only view under its banner; acceptance opens the new document (beside the current one unless it is the empty-state town) | §11.2 |
| massing handles and the family strip (3.5) | V02 §4.5's contract; one `setMassing` dry run per feasible family | `reshapeRange`, `moveTower`, `setComposition`, `setMassing` | V02 §4.1, §4.5 |
| the export dialog (5.10) | the user's options; its default knowledge, the view's effective key (2.10; SR-08) | `export(h, fmt, opts)` with `knowledge` lowered only (BCR-V9-14) and the VTT details (BCR-V9-15); V06's `chronicle.csv`, `uses-history.csv` and animated history; V10's transcript | §11.1 |
| the share sheet (5.11) | `export(h, 'permalink')`, §6.4's refusal conditions | the clipboard; the file download | §6.4, §11.5 |
| the three load outcomes (3.14 (a)–(c); SR3-01): the upgrade offer `info.upgrade.offer`, the frozen view's `error.frozen` strip with **Edit it with this version**, a document without `model`'s `error.frozen.noModel` with **Open its recipe with this version** | `open`'s load (§2.9 steps 2–3): the document's output version against the running one and the retention window (§6.4), the chunk checks and `model`'s presence | (a) the `upgrade` with §7.5's diff in the fates sheet, standalone only (in host mode V08 §4.2's header control is the offer); (b) the `rebase` with reason `frozenImport` through `edit`, its `confirm` in the fates sheet (host mode: `doc.changed`, then `doc.snapshot`); (c) a new document from the recipe and log as §6.4 opens a link, under V9 §3.9's host rule in host mode; the history rows (4.10); T-V9-67 | §2.9 *Load*, §6.4, §7.4's rebase row, §7.5 |
| the locus wording (4.16 (6); SR3-04) | a `Locus` (a roster line's, an `assign`'s) and its target's name from the `gazetteer` query at the view's effective key (2.7) | `refuse.roster.dossier`'s `{locus}` (4.9), the history template "Asked for {name} {locus}" (4.10), volume 10's `dossier` row by citation (V10 §3.16); (4) reads it back (T-V9-13) | §7.1's `Locus`; §11.2 `gazetteer` |
| `F5Record`, `UxSittingRecord` (7.3, 7.4) | the first-five-minutes sessions; the owner's sitting | `MilestoneRecord.ux` of M2a, M3a and M3b (BCR-V9-24) | §13.3, §13.4, §13.6's protocol shape |
| the canvas script (3.12, 7.2) | the known-city fixture's gesture list, each gesture with its view scale and centre | the app harness; T101-6's agreement bar | §13.2's elegance bars; §13.4 harness |
| item 110's events (4.20; BCR-V9-26): `drawWall` of kind `retaining` with `highSide`, `drawWay` with `raised` and the `aqueduct` class, the `terrace` sugar, `setAttr` of `spans/<n>/use` | T3's Retaining wall mode, T2's Terrace mode, T4's Raised toggle and Aqueduct chip, T9's span chips (SS-46); volume 10's encoders (XV-V9-10, XV-V9-12); a skeleton's prefix | the fold (the base's `RetainingWall`, raised parts and span use); the journal (3.8); the history templates (4.10); T-V9-12's walker | §7.1 (BCR-V9-26) |
| a crossing's form and a raised way's deck paths (4.20.6; BCR-V9-33) | the panel's Stair · Ramp chip, the Deck height and Arch spacing steppers | the fold; the history row by its path label (BCR-V9-19) | §7.1's ways row |
| a removal of generated content and its suppression (4.20.3) | the Delete key, the context menu and T10 (a plain `delete`); the fold writes BCR-V6-24's `detail.suppress` | V06's ledger and every generator (V6 §2.13); `info.remove.holds`; the history row's "Build it again" and `ClerkMount.rebuildEvents` (one function, V9 §4.20.3 (4); SR2-14); the skeleton (BCR-V9-32) | §7.1, §2.8; BCR-V6-24 |
| the preview's effects (4.20.7; BCR-V9-27) | the engine's dry run, filled from the owning volumes' rows (V02's deck buildings, V03's stored plans, V04's arch vaults, the base's routes, junctions and water) | the badge's "and {n} other changes", the fates sheet's "What else changes", the live region, the clerk's card (XV-V9-11), T1's whole-town ghost | §11.2 |
| the hit stack and `Selection.kind 'part'` (4.20.8; BCR-V9-28) | the tile worker's hit-test slices | click-again cycling, "Select below", the span and crossing panels, T11 on a raised way, the touch menu, volume 10's `entity { at }` | §11.2's `hit` |
| handle kinds `rampEnd`, `terraceLevel`, `tierStep` (2.5, 3.5) | V9 §3.5 from the selection | the mapper: `moveVertex`, `terrace`, `setMassing { op: 'tiers' }` | §9.5 |
| the Raised toggle and the Aqueduct chip (2.4, 4.20.2) | T4's options strip; PageUp and PageDown while drawing | the mapper's `raised` and `class`; the badge (memory only, reset on tool entry) | — |
| T9's tier controls (4.20.5) | a selected `stepped` building at the building band | `setMassing { op: 'tiers' }`, `setAttr` of a tier's heights (V2 §4.6) | V02 §4.6; X21 |
| "Keep them as yours" (4.20.3) | T1's whole-town ghost when a Re-derive drops generated raised ways | declared `drawWay { raised: true }` events in the Re-derive's group | §7.1 |
| "Raised ways the town builds by itself" (4.14) | the advanced panel's Streets group | `editTable` on volume 11's `raisedWays` chances, read by every raised-way generator (V6 §2.13); the dry run's "Remove them too" | §7.6 |
| the item-110 exports and the deck scene (5.10; BCR-V9-31) | the exporters | the export dialog's rows; T-V9-61 | §11.1 |
| removals in the skeleton (3.12; BCR-V9-32) | Export skeleton | the import dialog's *kept removed* and *nothing to remove* rows; T-V9-62 | §11.1 |
| the second known-city fixture's canvas script (7.2) | the test tree, written from its brief | T-V9-56, T-V9-3's measurement, volume 12's golden (V02's X25) | §13.2, §16 (item 110 (e)) |

**The dossier facts this volume shows** (it writes none; each is read through the port's digest and §7.7's rows):

| fact shown | dossier field (`DossierDigest`, §14) | the rule that carries it to the map | where it appears (V9 §) |
|---|---|---|---|
| the title's tier word | `settlement.tierWord` | §7.7 item 15 (J-A81.72) | top bar and the `title` label (5.1) |
| a locked population | `settlement.population` | §7.7 item 15; host mode's `lockedControls` (V08 §5.1) | T1's size card, the basic panel (4.5) |
| a dossier-owned name or kind | `institutions[].name`, `.kindLabel`, `.kind` | §7.7 item 11 (the refusal) | the panel's locked fields, `refuse.dossierOwned` (4.4, 4.9) |
| a place's knowledge | `institutions[].knownTo` | §7.7 item 7 | "Who knows this place" chips, locked (4.3) |
| a collective range | `institutions[].count` | DR9, item 108 (b) | the record panel's "between 5 and 10" (4.7) |
| why an element is as it is | the change envelope from `receipts` | §7.7 item 13 (`DossierChange`) | the why card's "Since week …" (5.8); history rows (4.10) |
| how the map read the record (the port's notes) | the digest fields each `PortNote` kind names (V08 §4.6's table) | V08 §3.6 (4) (`dossierFacts.notes`, `DossierBinding.notes`) | the history's note lines under an absorb or creation head (4.10) and the report panel's standing notes (5.7); SR-22 |
| a custom kind's profile sources | `institutions[].category`, `.tags`, `.custom` | item 104 (a) (2)–(7) | the profile chips (4.7, 5.8) |
| the tier of every field | the registry's dossier paths | §2.8's `factTier` over §7.7 item 12's binding | every tier chip (4.4) |
| an ancient ruin | `site.deposits` of kind `ancient_ruins`; an institution of scene archetype `ruined-landmark` | DR19, DR24 (V04's BCR-34) | a ruin's why card: "SettlementForge's record names ruins here" (4.17.3, 5.8) |
| a magical node, ley lines, a magical history | `site.deposits` of kind `magical_node`; the "Magical ley lines" income rows; `history.events` of type `magical` | DR19, `HistoryHint` (BCR-34) | a ruin's why card (the source in words) |
| mining | `site.deposits` of the mining kinds | DR19 (BCR-34) | a cavern's why card ("Mining here makes caves likelier") |
| the cathedral | `Cathedral (10,000+ only)`, `Great cathedral` | DR9 | every cathedral's "Below" line: its crypt, always, the largest (4.17.5) |
| how many catacombs | the church records (`Parish church` and its ranges, `Monastery or friary`) and item 108's collective members | DR9, DR10 (BCR-34); V4 §3.5.1 (3) | the catacomb panel's count sentence (4.17.5) |
| the burial faces | `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house`, `Graveyard`, the `Cemetery network` grounds | DR9, DR10, item 108 (BCR-34); V4 §3.5.1 (1) | the cemetery's "Catacombs below" line; the catacomb's "Under {burial face}" (4.17.5) |
| a crypt record | an institution matching the subterranean row `crypt` | DR17 (BCR-14) | its church's "Below" line (4.17.5) |
| a forced system or undercity | the `tables/dossier/subterranean` rows; `CircumstanceSlice.undercity` | DR17 (BCR-14) | the system's why card ("SettlementForge's record puts it here"); an access of cause `dossier` (4.17.3) |
| an aqueduct's reason (the water system) | the records bound to `conduit_house` (`Aqueduct or water system`, `Advanced water infrastructure`) and the demand records | DR-V8.7 (V08 §2.6b (1)) | a raised way's why card: a `facts` row of tier `dossier` under "The town raised it: it needed water" (4.20.6) |
| an elevated road's reason (high ground) | the dossier-bound institutions of class significance ≥ 20 and the custom `landmark` records at their reservations | DR-V8.8 (V08 §2.6b (2)) | the same card's `ref` rows, withheld names read by kind (4.20.6) |
| a toll bridge on a dry site | the dossier's toll bridge | BCR-V8-32 | the bridge's why card; nothing else in V09 |
| that nothing of item 110 is dossier-bound | — | V08 §2.6b (5) (J-V8.72) | every raised way, retaining wall and deck plot is removable by the plain delete (4.20.3) |

## 2 Data model

The application adds no canonical state of its own: every change to a town is an event through `edit` (§7.1), and the
town's look is its logged style (§2.9). What it adds is view state (in the document's view section, outside every
digest), machine preferences, a local store, and memory-only session state. The map-side declarations file g asks the
interface for are volume 11's document-only tables, written by `editTable` (V9 §2.6).

### 2.1 The four classes of state

| class | where it lives | written by | persisted | shared over a bridge | examples (V9 §) |
|---|---|---|---|---|---|
| canonical | the document's log and style (§2.9) | `edit` only | the `.plat` file | yes (`doc.apply`) | every declaration; the `editTable` rows of 2.6 |
| document view state | §2.9's view section, one key each, last-writer-wins by (Lamport counter, session) | `setView` | the `.plat` file (never in a digest) | the shared keys yes; the per-viewer keys never (§11.3) | restore points `restore/<id>` (shared); `thematic`, `workingLayer`, `underlay`, `showUnexcavated` and the base's keys of V9 §4.19 (per viewer) |
| machine preferences | IndexedDB database `plat-app`, store `prefs` | the settings screen, hint completion, rail pins | the browser profile (never in a document) | no | `AppPrefs` (2.11) |
| local store | IndexedDB `plat-app`, stores `docs`, `journal`, `drafts`, `assets` | the autosave, the draft mirror, the underlay picker | the browser profile | no | `LocalDocRecord`, `DraftMirror`, underlay images (2.11) |
| session-transient | the main thread's memory | the shell | never (the draft is mirrored, 2.4) | no | selection and the hit stack under the last click (4.20.8), active tool, the draft, the preview and its effects (4.20.7), the variations tray, T4's Raised toggle (4.20.2), toasts, `ViewOpts.viewAs` (4.8), the People panel's filters, the upgrade offer's **Not now** (3.14 (a)) |

### 2.2 The shell: modes, layout classes, input capabilities, host slots

```ts
type ShellMode = 'standalone' | 'host';                       // host = V08's embed.html (V08 §5.1): its differences switch the slots below
type LayoutClass = 'wide' | 'medium' | 'narrow';               // V9 §4.12: wide ≥ 1024 CSS px wide; narrow < 600 px wide or < 480 px high; medium otherwise
interface InputCaps { finePointer: boolean; coarsePointer: boolean; hover: boolean; physicalKeyboard: boolean }   // from matchMedia('(pointer: fine|coarse)'), '(hover: hover)' and the last key event; re-read on change
  // readers: physicalKeyboard chooses the hints' wording ("press R" or "tap Try again") and whether the keymap overlay is offered in Help (V9 §5.9)
interface ShellConfig {
  mode: ShellMode; role: 'owner'|'editor'|'viewer';            // standalone: always 'owner' (§7.4's unshared document); host: from doc.load (§11.3)
  layout: LayoutClass; inputs: InputCaps;
  resolver: DocResolver | null;                                // standalone: the file resolver of §11.5 over the local store (V9 §3.8); host: null (V08 §5.1)
  clerk: ClerkSlot | null;                                     // V9 §2.10; standalone: null when no clerk is configured; host mode: always set — kind 'built-in'
                                                               // when clerkMode is 'builtin', kind 'host' when it is 'host' or 'off' (the card-only drawer, V9 §4.11; SS-06)
  host?: HostSlots }
interface HostSlots {                                          // the only places host mode changes the shell; V08 fills them
  header?: SlotRenderer /* V08 §4.2's actions */;
  banner?: SlotRenderer /* the frame's own strips: V08 §5.1's "Showing what the players see" and the held notice (V08 §5.2); a frozen view's
                           notice is the shell's own `error.frozen` strip with its one control, in both modes (V9 §3.14 (b); J-V9.97), never
                           this slot's; the status banner of V08 §5.1's table is SettlementForge's own, drawn outside the frame (J-V8.35; SR-16) */;
  lockedControls: { control: string /* a control-registry id, §7.8 */; reason: MsgKey }[];   // e.g. population and tier word: "Set by SettlementForge"
  historyFilter?: (row: HistoryRow) => boolean /* a generic host's viewer role (§11.3): its history filtered by its key; SettlementForge sets
                                                   none, since it mounts no viewer frame (V08 §3.1, §3.14; SR-16) */;
  fileMenu: false /* host mode (SR3-02; J-V9.98): the file menu keeps Export skeleton, Rebuild around my drawings, Settings and About
                     and drops the file operations — New town, Open…, Save a copy and Recently deleted — the host being the store
                     (V08 §5.1); their keys (ctrl / cmd+O, ctrl / cmd+S; V9 §4.13) do nothing; Settings drops its Storage section
                     (no local store, V9 §3.8 (6)) and keeps every other section (V9 §5.12) */;
  exportFormats: Format[] /* by role and key, §11.1 Knowledge */;
  clerkMode: 'off'|'builtin'|'host' /* from the host's clerk.config (BCR-V10-7): builtin shows the Assistant button and the full drawer (V10 §3.17); off (the default
                                      until one arrives) and host show no button and no message box — the drawer opens only in its card-only mode, for a host's proposal (V9 §4.11; SS-06) */;
  hostName?: string /* the host's product name, read by "Set by {host}" (V9 §5.12) and a host card's AI mark `clerk.host.mark` (V9 §4.11); V08's embed fills it (XV-V9-17); absent: "the host" */;
  historyLines?: { list(key: ViewState['knowledge']): HostHistoryLine[]; onChange(h: () => void): () => void /* returns its unsubscribe */ }   // the host's own lines
                                   // in the history panel — for SettlementForge the DM's reveals and hides and the time the party pictures were last drawn (V08 §4.6), filled
                                   // by the embed's bridge handler from host.state (V08 §3.1 step 7 (b), (c); XV-V9-21); drawn as V9 §4.10's group "The party"; absent: no
                                   // group (SR2-01; J-V9.91). The shell calls list(effectiveKey()) (V9 §2.10) each time it draws the group — so again on each onChange and
                                   // each onEffectiveKey — and the provider names and targets only the places that key admits (each read with that key as admitAs, V9 §2.7),
                                   // keeping no View-as state or key subscription of its own; a provider may answer at once with what it holds and fire onChange when
                                   // more is read (V08's per-key cache) (SR2-23; J-V9.114; XV-V9-29)
  newDocuments: 'download' | 'off' /* what an action that makes a NEW document does in the frame (V9 §3.9's host-mode rule; SR2-02; J-V9.92): 'download' saves it to the
                                      user's device as a .plat and never opens it; 'off' hides those actions. Required in host mode: the frame holds one live document and
                                      has no local store, recent list or app tab (V08 §3.1 step 6; V9 §3.8 (6)) */ }
interface HostHistoryLine { at: number /* ms, when the host's change reached this session */; text: MsgRef /* a host.* key with its slots — volume 8's words (V9 §4.9) */;
  targets: Id[] /* entity ids for Show, the handler resolving a binding key to its entity; may be empty */ }
type SlotRenderer = (el: HTMLElement, ctx: { role: ShellConfig['role'] }) => () => void /* mounts; returns its unmount */
```

`ShellConfig` is built at boot (V9 §3.1) and rebuilt on a resize, an input change and, in host mode, every `clerk.config`
(`ClerkMount.host.onConfig`, V9 §2.10): the clerk slot's kind follows `clerkMode`, and a switch away from `builtin` closes an
open full drawer (`ClerkHandle.close`); nothing in it is persisted. A host's
slots are the only host-specific code paths in `@plat/app`; everything else is shared, so a fix in the shell reaches both
entries.

### 2.3 Tools as data — `toolkit.json`

The twelve tools, their sub-modes, the parameters the volumes add and the first-use hints are one versioned table in
`@plat/tables` beside `keymap.json` and `sugar.json` (BCR-V9-8), so `@plat/docs` generates the tools' guide pages from it
and a new parameter is a row, never code (§13.2's elegance bar: a new capability adds a parameter, never a tool).

```ts
type ToolId = 'intend'|'ground'|'wall'|'road'|'quarter'|'place'|'roster'|'fill'|'shape'|'hold'|'name'|'dress';
type ToolLayer = 'L0'|'L1'|'L2'|'L3'|'L4';
type GestureKind = 'points'|'stroke'|'brush'|'lasso'|'drop'|'click'|'drag-handle'|'card'|'text'|'slider'|'paste';
type PointsFormKind = 'seed'|'corners'|'lasso'|'sourceMouth'|'levelPoint'|'shoreBasin'|'twoPoints'|'polyline'|'onePoint';
interface ToolRow { id: ToolId; n: number /* 1–12, §7.1's order */; layer: ToolLayer; label: MsgKey; hint: MsgKey /* §14's first-use hint */;
  icon: string /* an id in the app's own icon sprite, V9 §5.1 */; key: string /* its keymap.json binding id */;
  firstScreen: boolean /* R9: true for intend, quarter, place, dress */; contextual: boolean /* true for shape, hold: offered once a thing is selected */;
  narrow: boolean /* available on the narrow layout (V9 §4.12) */; coarse: boolean /* available with a coarse pointer */;
  modes: ToolModeRow[]; params: ToolParamRow[] }
interface ToolModeRow { id: string; label: MsgKey; icon: string; gesture: GestureKind; pointsForm?: PointsFormKind;
  emits: string[] /* the EditEvent kinds (`t`) this mode's commit may carry — the binding table of V9 §4.3 is generated from these */;
  layers: ('ground'|'sky'|'underground')[] /* the working layers it acts on, V9 §4.2 */ }
interface ToolParamRow { id: string; label: MsgKey; kind: 'chip'|'card'|'slider'|'text'|'number'|'toggle'|'stamp';
  values?: string[] | { table: TableId; labelCell: string; iconCell?: string } /* chips from a list, or cards from a table's rows (district kinds, classes, style presets) */;
  range?: [number, number]; step?: number; unit?: string; default?: unknown;
  basic: boolean /* shown at once; else behind "more" (R4) */; source: string /* 'base §7.1' | 'V01 V1-4.2' | 'V05 §4.2' … */ }
```

The shipped rows are V9 §4.2's table. Lifecycle: shipped data (create: our table versions; read: the shell at boot and
`@plat/docs`; persist: the package; regenerate: n/a; undo: n/a; migrate: a new row or mode is additive, a removed mode is
refused by the loader while a keymap row names it). A user never edits `toolkit.json`; a user pins tools to the rail
(`AppPrefs.railPins`, 2.11) and rebinds keys (`AppPrefs.keymapOverrides`, as `keymap.json` row operations, §14).

### 2.4 The declaration draft and its preview

```ts
type WorkingLayer = { layer: 'ground' } | { layer: 'sky'; key: PlatKey /* the island's arena, V05 */ } | { layer: 'underground' };   // the band is the view key `depthBand` alone (§2.9), never copied here
interface Draft {
  id: number;                                 // session-monotonic
  tool: ToolId; mode: string; params: Record<string, unknown>;   // T4's `raised` toggle and class chip, T3's `highSide`, T2's terrace `levelCm` among them (V9 §4.20)
  layer: WorkingLayer;                        // the view key `workingLayer` at the gesture's start (V9 §4.2)
  points: PointCm[];                          // world cm; a snapped point is stored as the snap target's point (§9.5), resolved before any preview
  free: boolean[];                            // per point: Alt was held (placed freely, no feature snap)
  strokes?: (FieldStroke | WarpStroke)[];     // brushes (T2, T8) and warp sessions
  text?: string;                              // T7's pasted list, T11's name, T6's typed locus
  target?: Id;                                // the entity a handle drag or a context action edits
  handle?: { entity: Id; index: number };     // the handle being dragged (V9 §3.5)
  startedAt: number;                          // performance.now() at pointer-down
  state: 'drawing'|'settled'|'previewing'|'ready'|'bent'|'refused'|'committing' }
interface PreviewState {
  draftId: number; gen: number;               // gen increments on every request; a result whose gen is not the latest is dropped (latest wins, §12.6)
  events: EditEvent[];                        // the events the draft maps to (V9 §3.3's mapper), sent to preview(h, events, { view })
  result?: PreviewResult;                     // §11.2 — fates, renames, counts, shape, bent, and the effects on what is not held (BCR-V9-27; V9 §4.20.7)
  requestedAt: number; receivedAt?: number;   // for the latency telemetry of V9 §6
  stale: boolean }                            // the pointer moved since the request: the ghost dims (V9 §5.3)
interface VariationSet {
  source: 'fill'|'brush'|'quarter'|'reroll'|'clerk';     // V9 §3.6's four sources of a derived fill, and a clerk proposal's alternatives
  base: EditEvent[];                          // the draft's events (a fill, a setField stroke, a quarter, a scoped regenerate)
  items: { event?: EditEvent /* derived sources: the resolved event with its absolute reroll map (BCR-V9-10) */;
           events?: EditEvent[] /* clerk: that variation's own events (V10 §2.5) */; label?: string /* clerk: V10's label */;
           result: PreviewResult; previewId: string /* the preview it belongs to, for `thumbnail` */; thumb: ImageBitmap | null }[];
  chosen: number;                             // 0–2 on the current page
  page: number }                              // "Show three more" advances past the rerolls used (§5.1 (6)); clerk variations have one page
```

**The draft mirror (R15, never lose work).** While a draft is `drawing` or later, its points, params, text and target are
written to IndexedDB store `drafts` as a `DraftMirror` (2.11) at every pointer settle; commit or cancel deletes it. On the
next open of that document a mirror found there offers "Finish the {toolName} you were drawing?" — accepting rebuilds the
draft and previews it; declining deletes the mirror. A draft is never in the log: the log receives only what is committed.

### 2.5 Selection, handles and the count badge

```ts
interface Selection { ids: Id[]; primary?: Id;
  kind: 'entity'|'label'|'link'|'handle'|'region'|'record'|'part';   // 'region': a region group of quarters (§9.1) selected by its label or by T11's
                                                               // "Name as region" — its panel renames, re-groups or dissolves it (`group`, §7.1)
                                                               // 'part': a sub-part of one entity — a raised way's span, a crossing of a retaining wall, a stepped building's tier (V9 §4.20.8)
  part?: { id: Id; path: string /* 'spans/<n>' · 'crossings/<retaining wall id>' · 'tiers/<k>' — BCR-V9-28's `sub` */ };
  stack?: { ids: Id[] /* BCR-V9-28's answer at the last click, top first */; at: PointCm; index: number /* the entry selected */ };
  scope?: EditScope /* a lasso's or a box's resolved scope, for "re-roll here" and multi-move */ }
interface HandleSet { entity: Id;
  kind: 'boundary'|'knot'|'vertex'|'level'|'islandRim'|'footprint'|'label'|'gate'|'stretchEnd'|'underlay'|'frame'
      | 'rangeEnd'|'rangeWidth'|'towerCentre'|'towerResize'|'roomExtent'|'keep'|'bailey'
      | 'rampEnd'|'terraceLevel'|'tierStep';   // item 110 (V9 §4.20): a raised way's end on the ground, a terrace's level, tier 1's inset step
  points: PointCm[] /* by V9 §3.5's rules */; emits: string /* the event kind a drag commits, by V9 §3.5's table */;
  more: boolean /* the user asked for more handles on this entity (session only) */ }
interface CountBadge { plots: number; households: number; buildings: number;       // §11.2 PreviewResult.counts
  byFate: Record<'kept'|'carried'|'orphaned'|'discarded', number>;
  extra: { label: MsgKey; value: number; unit?: string }[];                           // per tool, V9 §4.5: gates, towers, walled and barrier metres, houses displaced, length, area
  effects: number;                                                                     // `PreviewResult.effects.length + effectsMore` (BCR-V9-27): "and {n} other changes", with Show
  plusMinus?: { param: string /* the draft parameter a press steps */; step: number; min: number; max: number } }
```

All three are session-transient and derived: a `Selection` from clicks and lists (its `stack` from BCR-V9-28's hit
answer, cycled by V9 §4.20.8); a `HandleSet` from the selected entity's geometry by V9 §3.5's rule; a `CountBadge` from
the latest `PreviewResult`. None is saved. A lake has no rim handles: its
shore is its basin filled to its level (S1's basin fill), so it offers the level handle and T2's water paint (J-V9.47).

### 2.6 The map-side declarations file g asks the interface to store

Items 104 (a) (1), 105 (h) and 105 (j) let the author override siting, keep a split works-and-shop pair on one plot, and
pin, move or cut a supply link — "stored map-side … never written to the dossier". They live in volume 11's two
**document-only tables**, `siting.declared` and `siting.linkEdits` (V11 §4.2, BCR-V11-10), edited by `editTable` row
operations with V11 §4.4's lifecycle (the inverse row operation undoes; a key that no longer resolves is orphaned and
reported in the history panel's orphans, V9 §4.10) and V11 §4.3's locality (a placed use is kept and listed with the score
it would gain by moving). One store: the solver, the clerk and the canvas read and write the same rows (J-V9.36). This
volume maps each screen to its row operation:

| screen (V9 §) | table | key | cells written | owner rule |
|---|---|---|---|---|
| "All {kind}s in this town", the per-kind panel (4.7) | `siting.declared` | `uid:<localUid>` for a custom kind; `cat:<catalogId>` for a dossier catalogue kind; `cls:<class>` for a roster class no dossier record binds (V9 §10.2 XV-V9-1) | `familyWeights` (below; XV-V9-1); `profile` (a `Partial<SitingProfile>`, V11 §2.3, from "Edit the details"); `split: false` ("Keep works and shop together for every {kind}"); V11's `quarter`, `place` and `pin` cells from "Put them in {quarter}", "Put them here" and "Keep them where they are" | item 104 (a) (1) |
| "Keep together on one plot", on one split institution (4.7) | `siting.declared` | `use:<the works use's address>` (XV-V9-1: this key form admits the `split` cell only) | `split: false`; "Let the rules decide" deletes the row | item 105 (h) |
| the link view (4.7) | `siting.linkEdits` | `<consumer use address>/<good>` (V11's key) | `bindTo` ("Keep this supplier", "Use another supplier"); `avoid` ("Cut this link": the provider joins the list, the next nearest serves; XV-V9-2); `cut: true` with neither ("Stop buying {good} here": no pull for that good at that use); "Reset" deletes the row | item 105 (j) |

**The family multipliers.** `familyWeights` (V11 §4.2's cell name; CVR-V10-16) holds, per family id of V11 §2.4's enum (`nuisance`, `need`, `clientele`, `supply`,
`alignment`, `competition`, `coverage`, `sun`), one of Ignore 0 · Less 0.5 · Normal 1 · More 2 · Much more 3, multiplying
that family's soft terms for every use of the key's kind; a hard need is never scaled (item 103 (c)); absent is 1.
**No per-use siting weights** (J-V9.36): a single place is moved (`relocateUse`) or pinned (`placeAt`, T10) — the owner's
per-kind declaration is the row, and one member's site is its own edit. **Tier and dossier.** Each row is `declared`
(§2.8's `factTier`) and held by every re-derivation (§7.2). A dossier-backed kind accepts rows — they change where the map
puts or binds things, never a dossier fact (item 20 (h)) — and no row is ever written to the dossier. A dossier event that
removes the kind orphans its row, reported (V11 §4.4). **Class-wide rules** — a class's profile cells in `roster.classes`
for every town — stay the tables editor's (V9 §4.14).

### 2.7 The answers the panels render

The panels read §11.2's `query`. **The oracle's answer is volume 10's `WhyAnswer`** (V10 §2.13, placed in §11.2 by
BCR-V10-1 and produced by each kind's `WhyProvider`, BCR-V10-3); this volume adds none of its fields (J-V9.33). The why
card (V9 §5.8), the source chips (V9 §4.7), the drawer's why turn (V9 §4.11) and the underground panels (V9 §4.17) render
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
  sections: { kind: string /* V10 §3.9's section name */; title: MsgRef /* 'why.section.<kind>', V9 §4.9 */;
    rows: { text: MsgRef; value?: string; tier: FactTier; target?: Id; withheld?: true }[] }[] }   // after facts, in the providers' registration order (V10 §3.9; SS-15)
// the former `under` field (a void's depth, excavation reading and ways down) is withdrawn: the `underground` section's rows carry them (SS-15; J-V9.82)
```

| card field | read from `WhyAnswer` | rule |
|---|---|---|
| `decidedBy` | the oldest `cause` entry | an event carrying `EditBase.dossier` → "Placed here by SettlementForge's record"; a declaring event of §7.1's toolkit by the user → "You placed it here" ("You accepted the assistant's proposal" when it carries `proposedBy: 'clerk'`); `step` S10b → "The rules put it here"; `chance` present → "Placed by chance among equal sites"; an epoch → "The town's growth put it here in {year}"; **item 110** (V9 §4.20.6): a raised way's line is its own `raised` section row — `info.raised.built` (at an epoch with its year), `.carried` or `.declared`, in V10 §3.9's words — which the section block then does not draw again (J-V9.82); a retaining wall the levelling made → "The ground was levelled here; it steps {m} m"; a span walled up by the rules → "An arch of {way}, walled up as a vault" ("… by you" after a span edit); otherwise "The rules made it" |
| `bars` from pulls | `pulls` | length \|`share`\| against the largest in the answer; side by sign (left a push away, right a pull toward); text: the `row` id resolved by V11 §4.5 — a family row's `says` with the target's name, a signature pair's `reason`, a class row's note, a supply edge's good; the target named and clickable (Show) |
| `bars` from drivers | `drivers.terms` (a district, block or plot; item 102 (f)) | each term's `delta` as a bar; `daylight` reads "In shade {p} % of the day"; the others by their catalogue rows `why.driver.<driver>` |
| `closure` | `closure` (an enceinte, gate or tower; item 106 (g)) | "The {barrier} closes the circuit from {from} to {to}" per arc |
| `links` | `links` | role `consumer` → "Buys {good} from {other} ({distM} m, {near enough \| a long way})", role `provider` → "Sells {good} to {other}"; "near enough" when `distM` ≤ `comfortM`; the orientation in words ("works near its source", "sells near its market", "balanced"); `branchOf` → "its shop" or "its works" |
| `members` | `members` | "{count} {kind}s (the town's size asks for {min} to {max})" and the step in words (V9 §4.7) |
| `chips` | `profile.sources[].rung` | declaration → "yours"; archetype → "from its picture type"; category → "from its category"; tags → "from its tags"; library → "from its library entry"; keywords → "guessed from its name" in the low-confidence tone; fallback → "a general guess" |
| `alternatives` | `alternatives` | numbered outlines at `plot` while the card is open |
| `facts` | `facts` | the registry's path label (BCR-V9-19), the tier chip, and for a `row` "from SettlementForge's record, by rule {row}" |
| `dossierLine` | the newest `history` entry with a `change` | "Since week {w}: {reason}" |
| `drifted` | `evaluated.drifted` | "Today the rules would put it elsewhere; it stays." |
| `sections` | `sections` (V10 §2.13's `WhySection`: each registered provider's rows, V10 §3.9, §3.9a) | one block per section, in the answer's order, after `facts`; `title` the key `why.section.<kind>` (V9 §4.9); per row: `text` its `says` (a key of the families of V9 §4.9's explanation paragraph), else the registry path label of its `key` (BCR-V9-19); `value` its `value` with its `unit` in the user's units (`AppPrefs.units`); `tier` its tier chip; `target` its `ref`, named and clickable (Show); a `withheld` row reads "somewhere the viewer doesn't know"; a `purpose` row never arrives (the facade drops it, V10 §3.9). The underground panels (V9 §4.17), item 110's panels and why lines (V9 §4.20.6) and the drawer's why turn draw these same rows, so one `MsgRef` is one sentence everywhere (SS-15) |

A withheld target, member or link end reads "somewhere the viewer doesn't know" (§11.2 *Knowledge* (2)); a withheld
subject shows its kind and nothing else.

**Every band-less read speaks for its view** (SR-08; J-V9.86). Every `query` the application makes for a view — `why`,
`entity`, `sites`, `links`, `gazetteer`, `people`, `whereIs`, `relations`, and any band-less kind added later — is sent as
`query(h, q, { admitAs })` with the view's effective key (V9 §2.10's `effectiveKey()`, in BCR-V10-22's form), so the why
card, the source chips, the context panel, the gazetteer and "features in view", the Link card, the record panel's
members, the People panel, the family tree, "Where is" and T6's alternative sites admit only what View as admits; a
cached answer is dropped and re-asked when `onEffectiveKey` fires. The view-bound reads — the tiles, the labels and the
hit stack — read `viewAs` through §9.2's filter (BCR-V9-23). The export dialog's default knowledge is the same key
(BCR-V9-14; V9 §5.10). The application's own dry runs — the ghost, the badge, the fates sheet, the refusal and bend
cards, the effects list — carry no `admitAs`: they confirm a change the user commits under the role's key, and a filtered
dry run drops concealed uses from its fates (BCR-V10-6 (b)), so the person accepting would not see all the change moves;
the View as banner stays up above them. The clerk passes its own `admitAs` (V10 §2.3).

**The supply links** are the one list the oracle does not give per view, so `query({ kind: 'links', … })` (BCR-V9-5) returns
`LinkRow`s, read from the generation worker's link cache (V9 §3.15):

```ts
interface LinkRow {
  consumer: Id; provider: Id; good: string;
  distanceM: number; comfortM: number; maxDistanceM: number;
  satisfaction: number /* 0–1: 1 within comfortM, falling to 0 at maxDistanceM, item 107 (b) */;
  mode: 'road'|'water'|'any'; volume: number /* the good's relative volume, item 105 (c) */;
  orientation: 'source'|'market'|'balanced';      // V10's WhyLink field, item 105 (b)
  declared?: 'bindTo'|'avoid'|'cut';              // a siting.linkEdits row names it (V9 §2.6)
  chain?: WhyLink['chain'];                        // item 105 (i): a SettlementForge chain's id, status ('impaired'|'vulnerable') and an entrepôt's end — V10 §2.13's type, cited (SS-21)
  source: 'class'|'dossier'|'custom'; withheld?: true }
```

**A record's members** are `EntityCard.members` (`query({ kind: 'entity', id })`, BCR-V10-1) and `WhyAnswer.members`; this
volume asks for no query kind of its own for them (J-V9.42).

**The shade raster.** The shade map view (V9 §5.4) reads item 102's daylight-share driver `D(x)` as the field keeps it —
a raster at the prosperity field's cell size, held by the generation worker beside the field (recomputed on load with the
field, never stored, §2.9) — through the live-layer model view: `ModelView.fieldDriver('daylight'): { cellCm: number;
origin: PointCm; w: number; h: number; values: Uint8Array /* 0–255 ≙ D 0–1 */ }` (BCR-V9-7). Where the field did not compute it (a table with `w_sun` = 0 may skip the sampler), the accessor runs item
102 (a)'s sampler on demand in the generation worker over the same casters and caches it for the document state, within
V9 §6.4's cost law, so the view works whatever the weight and never changes the field. A floating island's contribution is
never sampled here: its strip is V05's held strip (V05 §5.1's `sky.island.shadeStrip` and `shadePending` rows), which the
view draws as V05 states it (V9 §5.4).

### 2.8 History rows and restore points

```ts
interface HistoryRow {                          // derived from the log on demand (never stored); V9 §4.10 renders it
  seq: number; kind: string /* EditEvent['t'] */; group?: number;
  author: 'user'|'host'|'epoch'|'migration'; proposedBy?: 'clerk'; dossier?: { changeId?: string; reason?: string };
  epoch?: number; week?: number;                // the epoch and week it folded in (§4.11)
  time?: number;                                // wall-clock ms from this machine's journal (2.11) for events made here; absent otherwise
  text: MsgRef;                                 // the plain-words line, V9 §4.10's templates: "Painted the quarter Tanners' Row (42 plots)"
  targets: Id[];                                // from the event's touched set (§7.4) — "show me" highlights them
  lines?: { text: MsgRef; targets: Id[] }[];    // derived sub-lines drawn under the row (V9 §4.10; SR-22): a dossier event's report entries, a `dossierFacts` event's notes, an epoch's suppressed raised-way reasons; each with Show when `targets` is not empty; never stored
  dossierGroup?: number;                        // the seq of the `dossierFacts` event heading the group the row is drawn in (V9 §4.10's dossier groups; J-V9.107): set on that event's own row and on each port event after it
  status: 'live'|'undone'|'undo'|'redo';        // §7.4: live unless an undo targets it and no later redo re-applies it
  undoable: boolean; notUndoable?: 'creation'|'dossier'|'dependent'|'otherSession'|'window' }   // why not, in the message catalogue
interface RestorePoint {                        // one shared document view key each: `restore/<id>` (§2.9 view section)
  id: string /* 12 base-32 chars, random, minted by the app */; seq: number /* the log position: the state after this event */;
  name: string /* ≤ 60 chars; the user's, or the auto text */; auto?: 'beforeWholeTown'|'timed'|'beforeRestore'|'beforeImport';
  createdAt: number; session: string }
```

**Auto restore points** are written before every whole-town action — a Re-derive from S0–S4 (T1's site, size or walls
changed after declarations, §7.1), an `upgrade`, a `rebase`, "apply my current preferences" (§7.6), an epoch advance (V06's
time card) and a restore itself — and every 15 minutes of active editing when at least one event was committed since the
last one. At most 20 auto points are kept (the oldest auto point is deleted by writing its key to `null`); named points are
kept until deleted, at most 200 per document. A `null` key whose Lamport stamp is older than the snapshot is dropped by the
next compaction (V9 §3.8), so deleted points do not accumulate. Restoring and opening a copy are V9 §3.9's.

### 2.9 The message catalogue

```ts
type MsgKey = string;                          // dotted: 'refuse.dossierOwned', 'bend.wall.ridge', 'fate.orphaned', 'error.storage.quota'
type MsgRef = { key: MsgKey; args?: Record<string, string | number | { id: Id }> };   // an { id } argument is an address rendered under a key, a withheld place as its kind: an engine-built MsgRef (a bend, a refusal, a conflict action) under the
                                               // caller's key; a line a panel builds from band-less data (the report's entries, V9 §4.10, §5.7) under the view's effectiveKey() (V9 §2.7; SR2-27)
interface MsgRow { key: MsgKey; text: string /* {placeholders}; one sentence, ≤ 25 words, no jargon (T-V9-15) */;
  buttons?: MsgButton[] /* the row's buttons in their order — V9 §4.9's button column; read from en.json only (SR5-01) */; tone: 'info'|'bend'|'refusal'|'error'|'success'|'hint';
  codes: string[] /* the engine codes it renders: an F-EDIT reason, a ConflictAction kind, an E_* error, a PortNote, a link-refusal condition */ }
type ButtonClass = 'commit'|'why'|'show'|'tool'|'drop'|'app';
interface MsgButton {
  key: MsgKey;             // its words: a row of the button.* family (V9 §4.9), one row per wording, shared — "Show me why" is button.showWhy wherever offered
  does: ButtonClass;
  from?: ConflictAction['kind'] | 'alternatives' | 'unplaced' | 'event';   // commit: the first dry-run action of that kind, one button per preview alternative,
                           // one per unplaced dossier element, or the event form `event` names
  each?: MsgKey;           // commit from 'alternatives': one alternative's words where a card lists every alternative at once (V10 §3.16) — a button.* row
  event?: ButtonEventId;   // commit from 'event': a row of V9 §4.9's event forms
  page?: string;           // why: the page the row names (refuse.staged's 'staged/{layerId}'); absent, V10 §3.5 step 3's target rule ('messages#<key>', V9 §5.15)
  arg?: string;            // show: a MsgRef argument whose { id } it selects, or a list source — 'alternatives' | 'dependents' | 'created:<kind>' | 'targets' |
                           // 'entry' | 'slot' | 'preview' (below); app: the MsgRef argument the command reads
  tool?: ToolId; mode?: string;   // tool: the tool and its ToolModeRow.id (V9 §2.3; V9 §4.5 names the modes)
  subject?: true;          // tool: the row's first address argument the reader's key admits, selected first
  command?: AppCommand;    // app: one of V9 §4.9's application commands
  when?: 'owner'|'names' } // drawn only for the owner role; only when the thing the row names is a name
type ButtonEventId = 'exactSite'|'notHere'|'firstFreeSite'|'rederive'|'cityUp'|'unassignCreation'|'roomRole'|'stairsAxial'|'stairsFlights'|
  'stairsInternal'|'giveTiers'|'retainingFlat'|'retainingOtherSide'|'rampLonger'|'roadToFoot'|'catacombUnder'|'joinCatacomb'|'cryptSmallest'|
  'cryptEnlarge'|'keepRaised'|'removeStanding';          // V9 §4.9's event forms, one row each
type AppCommand = 'download'|'reload'|'retry'|'seeUpgrade'|'editWithVersion'|'copyCommand'|'openRecipe'|'keepSaved'|'useRebuilt'|
  'downloadUnreplayed'|'undo'|'undoGoingBack'|'restoreTown'|'showDeleted'|'goBack'|'openCopy'|'exportPicture'|'share'|'switchLayer'|
  'reattach'|'enterKey'|'openSettings'|'viewAsOff'|'showEffects';   // V9 §4.9's application commands, one row each
```

**The buttons as data** (seam-surfaces-r5 SR5-01; J-SS5.2; J-V9.121). Every button a row offers is one `MsgButton` of
its `buttons` list, in order, so the canvas's cards and toasts and volume 10's drawer read one source (T101-3; T-V9-15,
T-V9-27, T-V10-4). **Words.** A button is worded by its `key`, a `button.*` row, its slots filled from the row's `MsgRef` —
or, for a button that carries one entry of a list, from that entry: a `ConflictAction`, whose `msg` (BCR-V9-12) is keyed
as the button; an alternative's plot, site or building; an unplaced element — each name read at the reader's key (the
canvas's the role's key, J-V9.86; the clerk's its session key). **What each class does on the canvas.** `commit` previews
its events as a new draft and commits on Accept (V9 §3.3): from a `ConflictAction` kind, the first action of that kind in
the answer's order — `unlock` the `unlock` of its `target`, `unassign` an `unassign` of its `target`, `moveTo` the draft's
declaration at its `target` (J-V9.111's form for an assignment), `reroute` the draft through its `at` — the other actions
of that kind marked on the map; from `alternatives`, one entry of `PreviewResult.alternatives` (BCR-V9-12; BCR-V9-22) —
the draft at that plot by V10 §4.1's `where.plot`, or V9 §4.17.4's access group for that building — the canvas drawing
them marked (a click on one picks it) and its one button, worded by `key`, stepping to the next alternative not yet tried,
while a card that shows every alternative at once (the drawer's, V10 §3.16) has one button per alternative worded by
`each`; from `unplaced`, one per unplaced element of the dossier's list (§7.1's roster rule), drawn as V9 §4.16 (5)'s
picker, the line re-previewed with its `element`; from `event`, the events the event form names. `why` opens the why card
or the page by V10 §3.5 step 3's *The why target*, `page` naming the page where the row gives one. `show` selects what
`arg` names and frames it (`live.selection`): a `MsgRef` argument's `{ id }`; the preview's `alternatives`; the dependent
later events' targets (`dependents`, §7.4); the preview's created addresses of one registry kind (`created:<kind>`,
BCR-V10-6); an effect's `targets` (BCR-V9-27); a report entry's addresses (`entry`, §5.4); a removed slot's former outline
(`slot`, drawn, nothing selected); or, for `preview`, the draft re-previewed and its fresh ghost drawn. A selection is how
the canvas moves a thing (V9 §4.6), so **Move it** is a `show`. `tool` activates `tool` in `mode` on that mode's working
layer (V9 §4.2), with `subject` the row's first admitted address argument selected first. `drop` closes the card and
withdraws the draft or pending edit it belongs to (**Keep {building}**, **Keep a way open**), or dismisses a notice that
has none (**Not now**). `app` runs one application command (V9 §4.9's list) and is never an edit of its own. **Where a
button is not drawn.** A `commit` whose source yields nothing (no action of that kind, no alternative left, no element
unplaced, an event form with nothing to change), a `subject` button whose row has no address argument the reader's key
admits, and a button whose `when` does not hold are not drawn; every `refuse.*` row still keeps **Show me why**, its last
button. **Arguments a button reads.** A `show` `arg`, a `subject` and a `page`
template read the row's `MsgRef`; where the text shows no such argument the engine's `MsgRef` still carries it
(BCR-V9-12's `args` hold every argument, shown or not) — the ones the button column names, among them `thing`,
`building`, `crypt`, `layer` and `layerId` on engine rows and `source` on a panel's line — and T-V9-13's fixtures check
each engine row's. **The clerk's reading** (V10 §3.5 step 3): `commit` →
a `propose` of the same events, `why` → `why`, `show` → `select`, `tool` → `useTool` with `mode` and, for `subject`, the
ids, `drop` → the card's **Drop**. No `bend.*` row and no `refuse.*` row a dry run answers carries an `app` button
(T-V9-15), so a card the clerk builds meets five classes; a fate's or a removal's line with an `app` **Undo** that the
drawer draws on a proposal card shows it only once the proposal is accepted, as the card's own **Undo**. The
`refuse.clerk.*` family carries no `buttons`: its alternatives are volume 10's `clerk.content.refusals` actions (V10
§2.10). **Locales.** A locale file carries each key's `text` only; `buttons`, `tone` and `codes` are read from `en.json`,
the contract. A `button.*` row has tone `info`, no `codes` and no `buttons`, and at most eight words.

File `@plat/tables/messages/en.json` (BCR-V9-8): versioned data with provenance `own`; a locale is another file of the same
keys, carrying their `text` only (*Locales* above; English ships; the key set is the contract). V9 §4.9 lists the rows. A code the engine can emit with no row is a CI
failure (T-V9-15), so a new refusal cannot reach a user as a raw code. **One message mechanism** (J-V9.42): the engine's
bend lines, conflict actions and F-EDIT messages are `MsgRef`s whose address arguments it renders per caller under the
caller's key (BCR-V9-12, merged with BCR-V10-6 (c)); the application renders them with this catalogue, and volume 10's
clerk renders the same keys (its `DraftItem.bent` is a `MsgRef`, V9 §10.2 XV-V9-7). **The file carries every key any
surface renders** (SS-16; CVR-V10-4; J-V9.79): beside the application's own rows it holds the key families volume 10
renders — `critique.K1`–`K18`, `refuse.clerk.*`, `clerk.notice`, `info.raised.*`, `info.under.*`, `info.catacomb.*`,
`info.crypt.*` and the withheld kind words — whose `en` texts are written once, in volume 10, and loaded from there (V9
§4.9's explanation paragraph lists each family's source and the two sub-families whose words this volume writes), and
volume 6's one line `info.copy.condensed` (V6 §3.15.5), loaded the same way (SR5-04); volume
11's `says` and `reason` sentences are shown as volume 11 writes them. T-V9-15 covers every family and runs its
readability step over all of them, reporting a failure to the owning volume (J-V9.55 as revised by J-V9.79).

### 2.10 The clerk slot — what the drawer drives

The drawer is volume 10's view model drawn by this volume (V10 §2.6, §5.4); the harness that runs the model, holds the
session and commits on acceptance is volume 10's (V10 §2.1, §4.2). This volume declares only the mount point and the
handle it drives, named so that none collides with volume 10's `ClerkSession`, `ClerkTurn`, `Proposal` or `Variation`:

```ts
interface ClerkSlot { id: string; label: string /* "Assistant (AI)" — the catalogue's word, always shown with the AI mark; "clerk" stays the internal name (SS-24) */;
  kind: 'built-in'|'host' /* 'host': the card-only drawer for a host's proposal (V9 §2.2, §4.11; SS-06) */;
  mount(ctx: ClerkMount): ClerkHandle }                    // V10's harness implements it for both kinds (V9 §10.2 XV-V9-7) — kind 'host' with no model backend; null in ShellConfig when none
interface ClerkMount {                                     // what the shell hands the harness
  doc: DocHandle; view: ViewHandle; role: 'owner'|'editor'|'viewer';
  selection: () => Id[];
  openNewDocument: (h: DocHandle) => void;                 // creation acceptance: the new document beside the current one (V10 §4.2 (3)); in host mode by
                                                           // HostSlots.newDocuments (V9 §3.9's host-mode rule): saved to the user's device, never opened in the frame (SR2-02)
  rebuildEvents: (seq: number) => Promise<WithoutBase<EditEvent>[]>;   // the removal group whose first seq is `seq`: each of its deletes' "Build it again" events by
                                                           // V9 §4.20.3 (4), from BCR-V9-34's `entity` answers on the tombstoned ids read with admitAs = effectiveKey() —
                                                           // the one implementation, which the history row's Build it again also calls; [] when nothing can be built;
                                                           // V10 §4.3's rebuild takes exactly these (SR2-14; J-V9.94)
  showScratch: (h: DocHandle | null) => void;              // the creation preview's read-only view and its banner (V9 §4.11)
  effectiveKey: () => ViewState['knowledge'];              // the view's key read through View as (`ViewOpts.viewAs`, BCR-V9-23) by the rule below — V10 §2.3's session key
                                                           // and the `admitAs` of the application's own band-less reads (V9 §2.7): the shell's one computation of it (SS-10; CVR-V10-15; SR-06, SR-08)
  onEffectiveKey: (h: (k: ViewState['knowledge']) => void) => () => void;   // fired on a change of either; returns its unsubscribe
  host?: {                                                 // host mode only (SS-07): the embed's bridge handler fills it (V08 §3.1); absent standalone
    config(): ClerkConfig | null;                          // the latest clerk.config body (null before one arrives: mode 'off')
    onConfig(h: (c: ClerkConfig) => void): () => void;     // every later clerk.config, a token refresh among them; returns its unsubscribe
    needsToken(): void;                                    // posts clerk.needsToken {} (V10 §3.17's refresh lead, or an authentication failure)
    refused(reason: 'origin'): void;                       // posts clerk.config.refused { reason } (BCR-V10-7 (a))
    proposals: AsyncIterable<{ events: EditEvent[]; proposal: HostProposal }>;   // each preview { events, view: true, proposal } from the host, in arrival order
    answer(id: string, status: 'accepted'|'dropped'|'stale'|'failed', seqs?: number[]): void } }   // posts clerk.proposal (BCR-V10-7 (b))
// ClerkConfig is BCR-V10-7's clerk.config body (mode; transport { baseURL, token, expiresAt, fallbacks? }; capUsd) and HostProposal its (b)'s proposal body
// (id, reason, variations) — both generated from @plat/api's bridge schema under the names V08's client uses (V08 §2.2), never restated here
interface ClerkHandle {
  turns: AsyncIterable<TurnView>;                          // every update of every turn (V10 §2.6): progress lines, reply blocks, the proposal, the refusal, costUsd
  send(text: string, entry?: 'drawer'|'why'|'check'|'roster'|'help' /* J-VI.17: V10 §3.1's five entries */, attach?: { why?: WhyAnswer; skeleton?: Blob; roster?: string;
                                                           newMap?: true /* the drawer's Start a new map from this (V9 §4.11): V10 §3.1 (4) reads it as the user's choice of
                                                                            creation mode for this message; never set in host mode (SR2-13; J-V9.93) */ }): void;   // V10 §3.1's entries
  accept(proposalId: string, variation: number): Promise<void>;   // V10 §4.2: the harness re-previews, then commits one group with proposedBy 'clerk'
  acceptLines(proposalId: string, lines: number[]): Promise<void>;
  retry(proposalId: string): void; drop(proposalId: string): void;
  focus(proposalId: string, variation: number): void;      // draws that variation's ghost (its own preview, V9 §3.6)
  stop(): void; close(): void;
  settings(): ClerkSettings; setSettings(p: Partial<ClerkSettings>): void;   // V10 §2.2: the one store of the clerk's settings
  setKey(key: string | null, remember: boolean): Promise<ClerkSettings['keyState']>;   // checks the key before storing it (V10 §3.19); "remember on this device" writes
                                                           // V10's device key; null forgets it; the key card shows the verdict (V9 §4.11; SS-08)
  usage(): UsageTally;                                     // V10 §2.8: the turn's and the month's estimate against the caps
  run(action: ClerkAction): Promise<void>;                 // the harness's half of V10 §2.6's dispatch table — propose, undo, rebuild; the application runs select,
                                                           // why (the why card or Help page, V9 §5.8, §5.9; SR4-01), openSettings, useTool, export, fork (forkAt)
                                                           // and rerun (rerunFrom) itself — seven kinds — and passes the rest here (V9 §4.11)
  newTopic(): void;                                        // the drawer menu's New topic: closes the route's live segment (V10 §3.2)
  defects(): DefectRecord[]; clearDefects(): void }        // V10 §2.8's device defect store, listed in Settings' Assistant section (V9 §5.12)
```

**The effective key** (SR-06; J-V9.85). `effectiveKey()` reads the view's knowledge key K (§2.9, §11.3) through
`ViewOpts.viewAs`: unset, it returns K; a tier t returns `{ tier: the lower of t and K's tier, places: K's places }`; a
key form f (a host's players' view, V9 §4.8) returns f itself when f's tier is below K's — its places standing in for
K's — and, when f's tier is not below K's, `{ tier: K's tier, places: the places both lists hold }`, the safe side (it may hide
a place K learned that f's tier would admit, never show one either withholds). Every reader it reaches admits exactly
what both it and K admit — the facade by `admitAs` (BCR-V10-22), §9.2's filter by `viewAs` (BCR-V9-23) — so a place on
f's list that K does not admit is never shown (J-A30.82). It is passed as `admitAs` in BCR-V10-22's form: `'secret'`
when its tier is `secret`, else `{ tier, places }`. `onEffectiveKey` fires when either input changes: a `view.set` of K
(§11.3), the View as menu, or a host setting or clearing its form. The shell computes it once per view, hands the same
function to the clerk slot and passes its value to a host's `HostSlots.historyLines.list` (V9 §2.2; SR2-23), so the panels,
the host's lines and the drawer can never read at two keys.

**Who commits.** The harness commits, and only on the drawer's **Accept** (or "Accept these lines" on a roster card) — or,
when the user has switched on V10 §4.4's apply-then-undo setting, on a finished turn whose variation needs no
confirmation, with its card reading `clerk.applied` (V10 §4.4; SR4-04 (b)). Never silently: every commit has its card, its AI mark and its
undo (J-V9.34). The facade the harness uses is §11.2's, under the session's role and key: a viewer's drawer reads and
asks why, and every declaration answers `role`, its card worded by `refuse.viewer` (V9 §4.9; V10 §3.16's `role` row; SR4-04
(e)). **One settings store.** `ClerkSettings` (V10 §2.2, device key
`plat.clerk.settings`) holds on or off, the backend, where the key lives, the apply mode, keep history, the caps and the
consent; `AppPrefs` holds nothing of the clerk's. A host's `clerk.config` forces `enabled` and the backend (V10 §3.17): its
mode reaches the shell as `HostSlots.clerkMode` (the button and the slot's kind) and its whole body reaches the harness as
`ClerkMount.host` (the transport with its fallbacks and `capUsd`, for V10's `HostProxyBackend`; the token held in memory
only), with the other four bridge messages of BCR-V10-7 — one channel, the embed's bridge handler (V08 §3.1), so the
harness never touches the bridge itself (SS-07). **One contract.** Every member the drawer and the settings call is
declared on `ClerkHandle` above — `run`, `newTopic`, `setKey`'s verdict, `defects` and `clearDefects` among them (SS-08) —
so the shell calls nothing that is not in this interface, and volume 10's harness adds no member of its own (V9 §10.2
XV-V9-18).

### 2.11 Machine preferences and the local store

```ts
interface AppPrefs {
  schema: 1;
  units: 'metric'|'imperial'; theme: 'system'|'light'|'dark'; uiScale: 1|1.25|1.5|1.75|2;
  reducedMotion: 'system'|'on'|'off'; highContrastChrome: boolean; largeTargets: boolean /* 44 px minimum even with a fine pointer */;
  announcePreviews: boolean /* the live region's preview summaries (V9 §6.3); on by default (a polite live region is silent unless a screen reader reads it) */;
  longPressMs: number /* 300–1 000, default 500 (V9 §4.15) */;
  hintsDone: Record<string /* ToolId | 'clerk' | 'tour' | 'variations' | 'restore' */, number /* ms when completed; 0 = not yet */>;
  tourOffered: boolean;                        // the guided first town was offered once (V9 §5.9)
  railPins: ToolId[]; railExpanded: ToolLayer[];   // tools pinned to the rail; layer groups left open
  snapRadiusPx: number /* default 8 (§9.5), 4–24 */; handles: 'fewer'|'default'|'more' /* 4 / 4–8 / up to 16 */;
  keymapOverrides: RowOp[];                    // over keymap.json (§14): row operations by binding id
  history: { storeMB: number /* V06's history store: default 256 desktop, 96 on the low-end tier */; frames: number /* frames kept in memory, default 8 */ };   // V06 §2.2's device settings
  reroll: { keepChangeToggle: boolean };       // §13.4's fallback for "declared means held"; off until the test asks for it
  touch: { editFabric: boolean };              // §13.4's touch fallback: false hides L3–L4 edits on a coarse pointer
  generation: { stylePreset?: string; packs?: string[]; rung?: string; labels?: boolean };   // §7.6's userGlobal layer, folded into a new document's recipe
  recent: { docId: string; title: string; openedAt: number }[] }   // ≤ 20
interface LocalDocRecord {                      // store `docs`, key docId
  docId: string; title: string; rung: string; thumb: Blob /* 256 px PNG from the tile worker */;
  snapshot: Blob;                               // the last compacted `.plat` (§2.9's writer; model included)
  snapshotSeq: number;                          // the log head the snapshot holds
  bytes: number; savedAt: number; appVersion: string; outputVersion: string;
  deletedAt?: number }                          // set by Delete: the town sits in "Recently deleted" for 30 days with its snapshot and journal (V9 §5.12)
interface JournalEntry { docId: string; n: number /* journal order */; call: JournalCall;
  phase: 'pending'|'done';                     // pending: written before the call is sent; done: rewritten with the result (V9 §3.8)
  logHeadBefore: string; logHeadAfter?: string /* §11.3's logHead after the call; set when done */; seqs?: [number, number] /* the seq range it appended */; time: number }   // store `journal`, key [docId, n]
type JournalCall =                             // the API calls that change the log, recorded exactly as the shell sends them (V9 §3.8)
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
snapshot plus its journal, V9 §3.8), and it has no `publish`. Nothing in the store leaves the machine except by an
explicit export, share or download. **Where IndexedDB is refused** (a private window, a storage policy) the store runs in
memory and the shell shows the persistent banner "This browser won't let the editor keep your town. Download it to keep
your work." with a Download button (never silent; V9 §3.8's ladder).

### 2.12 Lifecycle of every new state field

| state | create | read | persist | regenerate / re-derive | undo | migrate |
|---|---|---|---|---|---|---|
| `Draft` | pointer-down or a card pick with a tool active (V9 §3.3) | the mapper, the overlay, the badge | memory; mirrored as `DraftMirror` | a committed event underneath (another client, an epoch) re-previews it at its next settle | n/a (not in the log); Esc or cancel drops it | n/a |
| `DraftMirror` | every settle of a live draft | the open flow (V9 §3.1) | IndexedDB `drafts` | — | deleted on commit or cancel | a mirror whose `appVersion` schema differs is discarded with the note "Your unfinished drawing was from an older version and could not be restored." |
| `PreviewState`, `VariationSet` | each settle (V9 §3.3), each "Show three more" | the ghost, tray and badge | memory | a stale result (older `gen`, or `logHead` moved) is dropped and re-requested | n/a | n/a |
| `Selection`, `HandleSet`, `CountBadge` | a click, a list pick, a lasso; derived from the selected geometry; from the preview | the context panel, the overlay | memory | recomputed when the selected entity's record changes (a `doc.changed` naming it) | the selection survives undo when its ids still exist, else it clears | n/a |
| `HistoryRow` | derived from the log | the history panel, the context panel's History tab, `HostSlots.historyFilter` (V9 §1b; SR2-28) | never | recomputed per log change | — | the templates are keyed by event kind, one for every kind of the base and volumes 1–8, and for item 110's variants by their discriminating field (`drawWall.retaining`, `drawWay.raised`, `drawWay.aqueduct`, `terrace`, `setAttr.spans/use`, `setMassing.tiers`; V9 §4.10; T-V9-15's walker); a kind from a newer version renders "A change made with a newer version of the editor"; `lines` and `dossierGroup` are derived with the row (V9 §4.10; SR-22) and never stored |
| `RestorePoint` (`restore/<id>`) | the Restore-point button; the auto rules of 2.8 | the history panel | the document's view section (shared) | unaffected (a log position) | deleting a point writes the key to `null`; a restore is itself undoable (V9 §3.9) | a point whose `seq` exceeds the log (a truncated log, §7.4) is shown "at the latest state" and re-pointed on the next save |
| view keys `thematic`, `workingLayer` (per viewer) | the view bar | the live providers, the tools | the document's view section; never over a bridge | — | not logged (view state); the previous value is one click away | an unknown value reads as the default (`none`, `ground`) |
| view key `underlay` (per viewer) | the dress panel's underlay picker | the compositor (§9.5) | view section (hash, opacity, frame); the image in `assets` | — | not logged | an absent asset shows "The tracing image is not on this computer" with a re-pick button |
| `siting.declared`, `siting.linkEdits` rows (map-side, declared; V11's tables) | `editTable` from the per-kind panel, the Shape tab, the link view, "Keep together", a clerk's accepted proposal | V11's resolver, S10b, the link binding, the split placement; the `why` and `links` answers | the log (events) | held by every re-derivation; a key that no longer resolves is orphaned and reported (V11 §4.4) | the inverse row operation | V11 §4.4 (row migration by keyed row operations, §7.6) |
| `ToolRow`, `MsgRow` (with its `buttons`, SR5-01) | our table versions | the shell, `@plat/docs`; the rows' `buttons` also volume 10's cards (V10 §3.5 step 3) | `@plat/tables` | — | — | additive rows; a removed key is refused by the loader while referenced — a `button.*` row while a row's `buttons` name it, a mode while a `tool` button names it |
| `AppPrefs` | first run (defaults), the settings screen, hint completion | the shell at boot and on change | IndexedDB `prefs` | — | the settings screen's "Reset" restores defaults; each change is one step back in that screen | `schema` bumped with a converter; an unknown field is dropped with a note in the about screen |
| `LocalDocRecord`, `JournalEntry` | the first commit of a new document; every commit (journal); compaction (V9 §3.8) | open, recent towns, crash recovery | IndexedDB `docs`, `journal` | compaction folds the journal into a new snapshot | the log's own undo; Delete moves the town to "Recently deleted" for 30 days (`deletedAt`) with Restore; it is removed only by "Delete now" there or by the storage ladder after asking (V9 §3.14) | a snapshot of an older output version opens by §2.9's steps (frozen view or replay) |
| `UnderlayAsset` | dropping or picking an image | the compositor | IndexedDB `assets` | — | removing the underlay keeps the asset until no document's view key names it (swept at boot) | — |
| `ClerkMount.host`, `ClerkMount.effectiveKey` (2.10) | the shell's mount of the clerk slot: `effectiveKey` from the view key and View as; in host mode `host` from the embed's bridge handler (V08 §3.1) | V10's harness (its session key, `HostProxyBackend`, the host proposal intake) | memory only; the transport's token never leaves memory (BCR-V10-7) | a new `clerk.config` replaces the body (`onConfig`); a change of either key input fires `onEffectiveKey` | n/a (not in the log) | n/a |
| a host's proposal card in the card-only drawer (4.11) | a host's `preview { proposal }` through `ClerkMount.host.proposals` (V10 §3.17) | the drawer | memory; Accept commits its events as one group with `proposedBy: 'clerk'` (V10 §4.2) | re-previewed on a moved head, stale by V10 §3.11's rule; a newer host proposal or a built-in turn supersedes it (answered `dropped`) | the accepted group is one undo step; Drop leaves nothing | n/a |
| a clerk session's transcript | V10's harness (V10 §2.7) | the drawer; the export "Assistant conversation (JSON)" (V9 §5.10) | V10's: memory, or its device store only while keep history is on (V10 §3.15) | — | accepted proposals are ordinary log events with their undo | V10's |
| view key `showUnexcavated` (per viewer) | the Below group's toggle, at tier `secret` only (V9 §4.17.1) | S14's unexcavated style; a picture export at `secret` | the view section; never over a bridge to another client | — | not logged; toggled back | absent: `false`; a client below `secret` reads it as `false` whatever its value |
| `ViewOpts.viewAs` | the View as menu (V9 §4.8); a host's players' view through the embed's bridge handler (a key form, SR-06) | §9.2's filter for this view; `effectiveKey()` — the `admitAs` of every band-less read (V9 §2.7), the clerk's session key, the export dialog's default knowledge | memory only (session-transient) | `onEffectiveKey` fires on every change; cached band-less answers are re-asked | the menu's previous value; a host's form is cleared only by the host (its toggle) | — |
| `WhyCardModel` | built from a `WhyAnswer` (V9 §2.7) | the why card, the chips, the drawer, the underground panels, item 110's panels (its `sections`) | never | rebuilt at every open and on `doc.changed` naming the subject | — | — |
| `Selection.stack`, `Selection.part` (4.20.8) | a click or a tap (BCR-V9-28's answer) | the panel, T11, the context menu's "Select below" | memory | cleared when the part's or an entry's id disappears (`doc.changed`) | kept across undo when the ids survive, else cleared | n/a |
| the effects list (`PreviewResult.effects`, 4.20.7) | each preview and each `confirm` | the badge, the fates sheet's "What else changes", the live region, the clerk's card | never | dropped with a stale preview and re-requested | n/a | n/a |
| T4's Raised toggle and Aqueduct chip (4.20.2) | T4's options strip, PageUp and PageDown while drawing | the mapper, the badge | memory only; never `AppPrefs`, never logged | — | reset to off each time T4 is picked (J-V9.73) | n/a |
| "Keep them as yours" (4.20.3) | T1's whole-town ghost card | the Re-derive's group | as declared `drawWay` events in the log | held (declared) | one undo with the Re-derive | — |
| a suppressing removal, as the app shows it (4.20.3) | a Delete of generated content of file f item 260's kinds — a raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06's `detail.suppress`), an island or sky access (V05's removed slots; SR2-15) | `info.remove.holds`, the history row, `ClerkMount.rebuildEvents`, the skeleton's export (BCR-V9-32) | the log (the base's and V06's) | holds through Regenerate, scoped re-rolls, reloads and epochs (V6 §2.13) | undo lifts it; "Build it again" (and the clerk's Put it back, the same events) re-declares | an older document has none |
| `HostSlots.historyLines`' lines (2.2, 4.10) | a host change reaching this session — for SettlementForge a `party` value differing from the last one received, a new `partyPicturesAt` (V08 §3.1 step 7 (c)) | the history panel's group "The party" | never by the shell: the host's handler holds them in the session's memory, and a reload starts with none (the record keeps no reveal history beyond `party.prev`, V08 §4.6) | re-listed, with `list(effectiveKey())`, on each `onChange` and each `onEffectiveKey` (V9 §2.2; SR2-23) | none: not events, no Undo this — the host's own "Hide again" / "Reveal again" (V08 §4.2) | n/a |
| a copy saved in host mode (3.9) | an action that makes a new document, under `newDocuments: 'download'` | the user, opening the file in the standalone app (§2.9's load) | the user's device only (a `.plat` download); nothing in the frame, the host or a local store | — | n/a: the frame's document is untouched | the `.plat` reads by §2.9's steps |
| `attach.newMap` (2.10) | the drawer menu's Start a new map from this (standalone) | V10 §3.1 (4) | memory, for one message | — | Esc or the item again clears it before sending | n/a |

## 3 Generation — the application's runtime flows

The application generates no town content itself: it drives §11.2's API. Its "generation" is the set of flows below, each
a sequence of steps with its inputs, outputs, constants (with provenance) and failure ladder (V9 §3.14). Determinism is
V9 §3.13.

### 3.1 Boot and open

1. **Load.** `index.html` loads the shell chunk (the frame, the map region, the tool rail, the message catalogue and
   `toolkit.json`; V9 §6's size budget), then `@plat/api`'s worker host starts the generation worker, the derivation pool
   and the tile worker (§1.7, §8.9). Panels, dialogs, exporters other than PNG, the tables editor, the clerk drawer and the
   retained output versions (§6.4) are lazily loaded chunks, fetched on first use; while one loads, its button shows a
   progress ring and the rest of the app stays live.
2. **Preferences.** `AppPrefs` are read from IndexedDB (defaults on first run, V9 §2.11); `ShellConfig` is built (V9 §2.2).
3. **Route.** In order: (a) a URL with a permalink (`?o=…&s=…`, `&r=`, `&l=`; §6.4) opens that town — `generate` from the
   decoded recipe then the log's events through `edit` — with §6.4's notices when its output version is not the running
   one; (b) a file handed to the app (drag-and-drop, the OS "open with" of an installed app, the Open dialog) opens by
   type — `.plat` or the compact twin through `open` (§2.9's load: fingerprint check, background verification, the
   document's own output version's packages inside the retention window, a frozen view for an output version outside the
   retention window — the three outcomes and their controls are V9 §3.14's; SR3-01), a skeleton as a NEW document whose
   creation prefix is the skeleton (§11.1; V9 §3.12), a
   `.png`/`.jpg`/`.webp` as an underlay offer on the current town; (c) the most recent local town when the last session
   ended with one open — its snapshot and journal (V9 §3.8); (d) otherwise the empty state's new town (V9 §3.2).
4. **Recovery check.** When the routed document has a `DraftMirror`, the offer of V9 §2.4 appears after the first map.
   When the local store holds a journal newer than its snapshot, recovery (V9 §3.8) runs before the first edit is
   accepted; the map shows as soon as the snapshot's first map is up (§2.9: editable after the fingerprint check).

### 3.2 The empty state and a new town

1. With no document routed, the app calls `generate({ seed })` with a fresh seed (V9 §3.13) and the recipe of §1.2's
   one-click default with the user's `generation` preferences folded in (§7.6). The complete city band is on screen within
   §12.5's first-map law (≈ 124–145 ms at the default TOWN on the reference machine, §1.2).
2. Over the map, top centre: the line "Change anything: click it." with three buttons — **Surprise me** (the dice;
   `intent.surprise`, §7.7), **Choose a kind of place** (opens T1's cards, V9 §4.5 T1) and **Open a town…** — and, once the
   first map has settled and the main thread is idle, the **Try another** strip at the foot: the six proxy thumbnails of
   §7.8 (the towns' own S0–S4 runs on six fresh seeds with the same intent), within §7.8's budget (all six within 1 s at
   TOWN). Picking one continues that recipe from its committed S4 state (§7.8) and replaces the untouched town.
3. **The empty state lasts until the first declaration.** While the document's log holds only its creation prefix, the
   town is replaceable without a question: Enter, "Surprise me", a proxy pick or a T1 card change replaces it (an
   unscoped new town is the empty state's action only, R5; §7.3 item 10), and nothing is written to the local store. The
   first committed event makes the document a saved town (its `LocalDocRecord` is created, V9 §3.8), removes the empty
   state's overlay, and from then on Enter is **Same kind, new seed** — a NEW document with seed + 1 keeping the recipe
   (§7.1) — opened beside the current one in the recent list, never replacing it (in host mode by `HostSlots.newDocuments`,
   V9 §3.9). "New town" in the file menu likewise
   makes a new document.
4. The overlay line closes on the first click on the map and never re-appears for this browser once the user has
   completed any declaration (`hintsDone.tour`).

### 3.3 The declaration pipeline — gesture, draft, preview, ghost, commit

Every tool runs this one pipeline; the per-tool mapping from a draft to events is V9 §4.5's table (the **mapper**).

| step | input | output | constant (provenance) |
|---|---|---|---|
| 1 pointer-down (or a card pick, a paste, a key) | the active tool and mode, the working layer | a `Draft` in state `drawing` | — |
| 2 move | pointer samples (coalesced events, `getCoalescedEvents` where the browser has it) | the raw trace drawn at once on the overlay canvas; the snap candidate lit (V9 §3.4); readouts updated (length, area, height; R4) | raw trace ≤ 1 frame (V9 §6) |
| 3 settle | no pointer movement for `settleMs`, or pointer-up | `state = 'settled'`; the draft's points resampled and simplified by §7.1's authoring-boundary rule, snaps resolved into points | `settleMs` = 120 ms (§12.6) |
| 4 map | the settled draft | `EditEvent[]` by the tool mode's mapper row (V9 §4.5); a sugar event carries `expansion` = the running `sugar.json` version (§7.1); a `placeAt` from a point is written `plot: ''` with `from: { points: [p] }`, the dry run deriving and writing the plot — the nearest lawful one (§7.1; BCR-V10-18; V10 §4.1's `where.at`) — and T6's "this plot only" writes the plot under the point (V10 §4.1's `where.plot`), so the canvas and the clerk emit the same bytes (T101-3; SR-09) | — |
| 5 preview | the events | `preview(h, events, { view, variations? })` (§11.2; BCR-V9-10 for variations) with `gen += 1` | one preview in flight per draft; a newer settle cancels the older request's delivery (latest wins, §12.6) |
| 6 ghost | the `PreviewResult` whose `gen` is the latest | `live.ghost` drawn (§8.2), handles (V9 §3.5), the count badge (V9 §2.5) with its effects count (BCR-V9-27; V9 §4.20.7), the bend line when `bent` is set, the refusal card when `status: 'conflict'` | delivery ≤ 3 ms (§12.6) |
| 7 commit | release (commit-on-release tools) or Accept (accept tools; V9 §4.5's column) | `edit(h, events)` — for a variation, its committed group (V9 §3.6) — with `fates` / `renames` filled from the shown preview (§11.2's resubmission form); the journal's `pending` entry is written first (V9 §3.8) | — |
| 8 settle the result | `ApplyResult` | `ok`: the draft closes, the ghost clears, the journal appends (V9 §3.8), a toast names the change with Undo; `confirm` (the state moved since the preview): the fates sheet (V9 §5.5) with the fresh list; `conflict`: the refusal card | — |

**Commit on release or accept.** A tool whose gesture draws the thing itself — a wall or road stroke, a terrain or field
brush stroke, a handle drag, a label drag, a shape drag, a lock — commits on pointer-up (R1: the real thing on release),
unless the preview lists a fate other than *kept*, a rename, or an effect on something beyond the thing itself (V9
§4.20.7), in which case release leaves the ghost pending with the badge's fate and effect counts and the Accept button
reads "Accept — {n} of your changes move" (or "Accept — {n} other changes" when only effects are listed). **A Delete** is
previewed by the same rule (V9 §4.20.3; J-V9.63): it commits at once only when its dry run lists nothing beyond the thing
itself. A tool whose result is chosen — a
quarter's size, a place's site, a roster's sites, a fill's variation, any clerk proposal — leaves the ghost pending with
**Accept** (Enter) and **Cancel** (Esc). A pending ghost is **accepted implicitly** when the user starts any other gesture
or picks another tool (the ghost was what they asked for; undo takes it back), and cancelled only by Esc, Cancel or undo
(J-V9.3). No dialog opens before a gesture's first ghost (R1). **T1 after a declaration** (J-V9.43): a card or slider
change is a Re-derive (§7.1), so its ghost is a whole-town preview of the `adjust` event — the working ring shows past
1 s, since the model law reaches ≈ 2.3 s at METROPOLIS's top (§12.5) — with the badge's fate counts ("Rebuilds from
{stage}: {n} of your changes are kept, {m} move"); **Accept** commits, and the fates sheet (V9 §5.5) opens only then, and
only when the dry run lists fates other than *kept* or renames. Esc restores the previous value; nothing is written until
Accept.

**Refused and bent.** `bent` (R2) draws the ghost normally and adds one line under the badge in the `bend` tone ("The wall
follows the ridge, 40 m off your line"). `conflict` draws the refusal card (V9 §5.3) at the draft's last point: the plain
reason and the row's buttons (V9 §2.9's `MsgButton` list, V9 §4.9's button column) — a `commit` from a `ConflictAction`
carrying that action ("Unlock", "Put it at {site}" at its `target`, "Remove the assignment"), each a new draft or event;
the draft stays open so the user can adjust. A refusal is never a
modal, and every card carries at least one action — at the least **Show me why**, the last button of every `refuse.*`
row, which opens the why card or the page that explains the limit (V9 §4.9; J-V9.44; SR5-01). Where the dry run can name the nearest lawful alternative, the engine returns
a bend instead of a conflict, and the alternative is pre-selected on the card, one click away.

**When the world moves under a pending ghost** (an epoch, a host's `doc.apply`, a clerk's accepted proposal in another
panel): the preview is re-requested at once with the same draft; the ghost dims until the fresh result lands.

### 3.4 Snapping and free placement

The feature snap of §9.5 answers from the tile worker's `RoleIndex.snap` within one frame, the unsnapped point shown until
the answer arrives. Each tool mode asks for its own candidate roles (BCR-V9-9 adds the role filter and the returned role):

| tool mode | snaps to (in priority order when two are within the radius) |
|---|---|
| T3 wall | enceinte ends and wall vertices; **natural-barrier edges** — sheer and steep cliff edges, gorge rims, deep-marsh edges and shorelines (item 106 (a), (g)); ridge and slope-break lines; road crossings |
| T4 road | junction vertices; gates; way centre-lines (the point lands on the line and splits it at commit, §7.1); piers and quays; shore points (a road to water) — with Raised on, the next row instead |
| T4 with **Raised** on, or the **Aqueduct** chip (V9 §4.20.2) | **the two ends only**: junction vertices, way centre-lines (the end splits that way at commit, making a ground vertex) and plot frontage points; an aqueduct's first point also springs and river reaches, its last also squares, fountain and cistern pins and `conduit_house` plots; interior points snap to nothing on ground part 0 and never split a way they cross; Shift's 15° rule still applies |
| T3 **Retaining wall** (V9 §4.20.1) | slope-break and contour lines; the ends of existing retaining walls; plot boundaries; street centre-lines — never a natural-barrier edge (a retaining wall closes no circuit) |
| T2 **Terrace** (V9 §4.20.1) | none (a brush); the level is the ground height under the pointer-down point, shown as a readout |
| T5 quarter (corner and lasso points) | street centre-lines; shores and banks; walls; ridges |
| T2 river source and mouth, harbour shore point, lake point | the shore or bank for a mouth or a harbour; terrain peaks and saddles for a source; none for a lake's point |
| T6 place | the plot under the point (the plot is the snap: its outline lights); on a deck, the deck plot under the point, and for a tower or fort stamp a mole's landmark slots ("Mole head", "Mid-mole") and a long bridge's mid-span slot (V9 §4.20.4; BCR-V9-30) |
| T9 shape drags | the footprint's own plot edges and neighbours' party walls (§3.6's attraction does the rest) |
| handle drags | the same roles as the tool that made the thing |
| the ruler (§9.5) | way centre-lines, face edges, vertices (unchanged) |

The candidate edge lights in the `snap` overlay colour (V9 §5.1) with a small label of its role ("Cliff edge", "Main
road", "Shore"). Holding **Alt** (on touch: the second-finger tap-and-hold, V9 §4.12) places freely; the free flag goes
into `Draft.free` and the point is not snapped. **Angles.** Holding **Shift** while a points form or a line is drawn snaps
the current segment's bearing to 15° steps from model north (after the feature snap; a snapped end keeps its feature and the
segment's bearing is the one that results), and the readout adds the segment's bearing ("N 45° E · 120 m"). **Right-click
while drawing** removes the last point of a points form or line (Backspace does the same); outside a drawing it opens the
context menu (V9 §4.4). The snap is resolved into the event's points before the dry run (§9.5),
and the kernel's attraction (§3.6) still applies. The radius is `AppPrefs.snapRadiusPx` (default 8 px, §9.5), scaled to
22 px under a coarse pointer (a finger's contact area; J-V9.9).

**The wall tool and natural barriers (item 106 (g)).** While a wall is drawn, the tool asks the dry run for the trace with
its arcs typed (BCR-V9-11 adds `arcs` to `PreviewResult`): each arc of the derived circuit is `walled` (a curtain of a
defensibility grade — full, light, closure-only, item 106 (c)) or `barrier` (closed by a cliff, gorge, marsh or shore,
item 106 (a)). The ghost draws walled arcs as the wall ghost and barrier arcs as a dashed line along the barrier with
small closing ticks, labelled in the badge: "walled 1.8 km · closed by cliffs 0.9 km". The districts the ghost circuit
would enclose are tinted with the thematic veil at α 0.15, and the badge names them ("encloses Old Town, Tanners' Row and
the Harbour") — §14's T3 row. A stretch's end that snapped to a
barrier edge is drawn with an anchor-tower ghost (item 106 (a)'s tower at each anchor). Releasing near a barrier within
`wall.barrierReachM` (item 106 (b)) shows the reach ghost — the spare ground the trace takes in, tinted as gardens — and
the bend line says "The wall reaches the cliff; the ground between becomes gardens." A drawn line that would cut a
waterfront off from the water is bent to the nearest lawful circuit (a quay front or sea gates, item 106 (d)) and the
bend line names it ("Kept the harbour open with two sea gates").

### 3.5 Handles

A selected derived shape shows its `HandleSet` (V9 §2.5). **Which points.** For a closed outline (a quarter's boundary, an
island's rim) the handles are k of its vertices: by default k = clamp(round(perimeter ÷ 150 m), 4, 8) — 4 for
`handles: 'fewer'` — and with "More handles" on the entity (session only) k = clamp(round(perimeter ÷ 75 m), 8, 16),
chosen greedily by **salience** = the exterior turning angle at the vertex × the length of its shorter adjacent edge, with
no two handles closer than perimeter ÷ (2k) along the ring; ties by the vertex's lattice order (y, x) (our own rule;
deterministic). For an open chain (a road, a wall trace) the handles are the chain's ends plus up to 6 interior points by
the same rule (14 with More), and, for a river, its course knots instead (`WaterBody.controls`, §2.3). A gate is a grip on
its enceinte; a lake has only its level handle (a vertical double arrow beside its rim), since its shore is its basin
filled to that level (J-V9.47); an island has its rim handles and an altitude handle (V05); a castle a keep grip at its
keep's centre and a bailey handle on the bailey's outline at its point farthest from the keep; a place's handle is its
footprint; a label's is the label; at the building band a building has V02 §4.5's handles. **Item 110** (V9 §4.20.6): a
raised way has its two end handles (`rampEnd`, a half-filled circle) and interior points by the open-chain rule; a
retaining wall is an open chain, or a ring when closed, by the same rules; a terrace-made retaining wall, once selected,
adds its terrace's level handle (`terraceLevel`, a vertical double arrow as the lake's); a `stepped` building at the
building band adds the step handle on tier 1's front face (`tierStep`).

**What a drag emits** — each a new declaration of the same kind on the same entity (§7.1), previewed through V9 §3.3 at
each settle and committed on release:

| handle | the drag emits | source |
|---|---|---|
| a quarter's boundary | `drawBoundary { district, polygon }` whose polygon is the district's current resolved ring with only the run between the moved handle's two neighbouring handles replaced by previous handle → the new point → next handle; the street snap of §7.1's quarter rule resolves it, so only that edge's plots re-derive | §7.1; item 101 (i) |
| a river knot | `moveCourseKnot` | §7.1 |
| a road or wall chain point | `moveVertex` at that lattice point with its role signature | §7.1 |
| a lake's level | `drawWater` with the level form at the same point | §7.1 |
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
| a raised way's end (`rampEnd`) | `moveVertex` on that end's ground vertex, resolved only onto a ground vertex — a junction, a way's centre-line (split there) or a frontage point (V9 §4.20.2 (2)); its ramp or stair re-laid by the dry run | BCR-V9-26 (b); V9 §4.20.6 |
| a raised way's interior point | `moveVertex` on its raised part's lattice point (the address names the part), never on ground part 0 | §7.1; item 110 (b) |
| a retaining wall's chain point | `moveVertex`; on a generated wall the wall becomes declared and held, and the panel says "Yours from now on; the rules no longer move it." | §7.1; §7.2 |
| a terrace's level (`terraceLevel`) | a new `terrace { stroke: the recorded stroke, levelCm: the dragged level }`, whose expansion replaces the old walls in its group | BCR-V9-26 (c); V9 §4.20.1 (5) |
| tier 1's step (`tierStep`) | `setMassing { op: 'tiers', insetCm }`, the inset being the handle's distance from tier 0's front face, snapped to 10 cm | V02 §4.6 (1); V9 §4.20.5 |

**The building band's steppers, chips and family strip** (V02 §4.5's contract): beside a selected building and in its
Shape tab, each wing's storey stepper and roof-kind chip (`setAttr`), each eave's dormer stepper (`setComposition
dormers`), the main entrance's porch chip and every other entrance's hood toggle (`setComposition porch`), each tower's
shape chip (`moveTower { shape }`) and the hall, gate-hall and chapel chips (`setComposition room`), each one event and one
undo. The **family strip** runs along the foot of the context panel's head: one 96 × 72 px thumbnail per feasible family
of the building's row (the feasible families M3 finds, which V02's `WhyProvider` lists as `massing/alternatives/<family>`), each the dry run of `setMassing
{ family }` on the derivation pool and drawn by `thumbnail` (V9 §3.6); hovering one draws its ghost; a tap commits it
(budget V9 §6.1). Hit radius 10 px (fine pointer) or 22 px (coarse); handles are drawn on the main thread over the
composed tiles (§9.5) and cost ≤ 1 ms per frame (V9 §6).

### 3.6 Variations

A derived fill offers three versions (R5; §7.3 item 10), and a clerk proposal offers its real alternatives. One preview
contract serves both (BCR-V9-10, merged with BCR-V10-6 (b); J-V9.41):
* **The four derived sources** — T8's `fill`; T8's density, greenery and prosperity brushes; a scoped New random (T10's Try
  again, shift+click, the re-roll brush of V9 §3.7); a T5 quarter's fabric — call `preview(h, events, { view,
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
| a clerk variation | that variation's own events, committed by the harness (V9 §2.10) |

`rerolls` is the focused variation's absolute reroll map. Variations are dropped from the worker on commit or cancel.

### 3.7 Scoped re-rolls

Every re-roll is scoped (R5; §7.3 item 10). The re-roll control is one button, "Try again", in the context panel of any
selection and in the tray, with a scope chip row: **this building** (a building's rung, `regenerate` with `rung`), **this
block**, **this quarter**, **this lasso** (the selection's `scope`), on the Below layer **this run** (a tunnel run) and
**this system** (an underground system; V04 §1b.3). A layer re-roll is never a Try again scope, since its event,
`rerollLayer`, is not T10's (§7.1's T10 row; SS-29): new names are T11's **New names** with its scope (these, this
quarter, the town; V9 §4.3's T11 row), and new trees are T12's **New trees** (`rerollLayer { concern: 'render.instances' }`,
town-wide; V9 §4.3's T12 row; J-V9.101), and the drawing's small random touches and tree crowns are T12's **New decoration**
(`style.jitter` then `style.crowns`, one group; SR2-26; J-V9.115). **The re-roll brush** (T10's third mode; §14's T10 row): the blocks the
stroke passes over, each block whose area the brush's footprint covers by at least 20 %, form the scope; held things under
the brush dim to show they will stay; release previews three variations (V9 §3.6) and Accept commits the scoped
`regenerate`. **Held things are marked** while T10 is active and while a re-roll ghost shows: a small pin glyph (12 px, in
`tier.declared`) at the anchor of every declared or pinned thing in view, and a lock glyph on locked ones. Shift+click (§14) is "Try again" on the clicked
entity's own scope with the kind kept. T10's **keep these, re-roll the rest**: the user lassos a scope, clicks the things to
keep (each click toggles a pending lock, drawn as a lock ghost), then Try again — committed as one group: the `lock`
events, then `regenerate { scope, mode: 'newRandom' }` with the variation chosen (V9 §3.6); one undo step. The dry run's
fates list names every declared or locked thing *kept* and every name it re-draws; the "keep / change" toggle of §13.4's
fallback, when `AppPrefs.reroll.keepChangeToggle` is on, adds per declared entity in scope a chip "Change this too", which adds an `unpin` of that entity
to the group before the regenerate; the entity is derived from then on, and the fates list says so.

### 3.8 Autosave, compaction and crash recovery (R15)

1. **Journal, in two phases** (J-V9.45). Every API call that changes the log — `edit` (a fates-sheet `confirm` among them,
   journalled in its resubmission form: the events with their fates and renames filled, §11.2 *Confirming fates*),
   `regenerate`, `adjust`, `undo`, `redo`, and `setView` of a shared restore-point key — is appended to IndexedDB store
   `journal` as a `JournalEntry` (V9 §2.11) **before** the call is sent, in phase `pending` with the `logHead` before it,
   and rewritten in phase `done` with `logHeadAfter` and its `seqs` when the result is `ok`; a `conflict` or a cancelled
   confirmation deletes the pending entry. The pending write is issued in the same task as the call (the structured
   clone ≤ 2 ms, V9 §6.5); the next gesture never waits for either write; a write failure takes V9 §3.14's storage ladder.
2. **Compaction.** When the journal holds 50 `done` entries past the snapshot, or 60 s pass without a commit after at
   least one entry, or the page is hidden (`visibilitychange`), the app asks `export(h, 'plat')` (§2.9's writer; model
   included) in the generation worker and replaces `LocalDocRecord.snapshot`, then deletes the journal entries up to
   `snapshotSeq`. It **runs only when idle** (V9 §6.5): no draft, preview or export pending and the pointer still for at
   least 2 s — or at once on `visibilitychange` hidden. A gesture started while a compaction runs shows the working ring
   on its badge until the preview arrives. The snapshot drops every `null` view key whose Lamport stamp is older than the
   snapshot (deleted restore points). Compaction runs under the role's knowledge key, whatever "View as" shows (V9 §4.8).
   Constants: 50 entries, 60 s, 2 s (our own; calibrate-later by the M2a autosave measurement, V9 §6).
3. **Recovery.** Opening a town reads its snapshot through `open` and re-issues the journal's calls past `snapshotSeq` in
   order. The engine is deterministic (§6), so each `done` call must reproduce its recorded `logHeadAfter`; a trailing
   `pending` call — the tab was killed between sending it and recording its result, possibly after the worker had
   committed it — is re-issued from its `logHeadBefore` and its result accepted and recorded. The first mismatch stops
   recovery there, keeps the unreplayed calls in the record's quarantine (downloadable as a JSON file from the history
   panel), and says "Recovered your town up to {time}. {n} later changes could not be replayed." Nothing is discarded
   silently. A clean recovery says nothing.
4. **Times.** `JournalEntry.time` gives the history panel its times for the seqs each call appended (`seqs`); events that
   reached the document elsewhere show no time (J-V9.6).
5. **Leaving.** Closing the tab with a journal write pending triggers the browser's "leave site?" prompt only while a
   write is actually outstanding (typically < 50 ms); otherwise leaving is silent, because everything is already saved.
6. **Host mode.** With `ShellMode = 'host'` the local store is off: every commit reaches the host through the bridge, and
   the host is the store (§11.3; V08 §3.7); only the draft mirror stays local, keyed by the host's document id.

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
  hundred edits at METROPOLIS can take seconds: past 1 s a progress bar in the history panel counts the events undone of
  the total, the map stays pannable and viewable, the tools wait, and the toast's "Undo going back" is the way back (the
  call is one group, so it is not cancelled midway).
* **Re-run from here** (owner role; a history row, a chronicle row or a restore point, offered when epochs or dossier
  events follow it): `rerunFrom(h, seq)` (V06 §4.4) — a NEW document, the log prefix through `seq` with every later epoch
  and dossier event re-appended in log order and recomputed — opened in a new tab and added to the recent list; the
  current document is untouched. The toast says "Opened a copy from {name} and re-ran the town's history after it. Your
  later hand edits are listed there to re-apply." and the new document's report lists each such edit with V06's
  **Re-apply**. A dossier-bound document's copy is detached (V06 §4.4), and the toast adds "It no longer follows
  SettlementForge." Before a rebase point both take the earliest seq they can, with volume 6's line (V6 §3.15.5;
  J-V6.98) — see *Before a rebase point* below.
* **Open a copy from here** (a row or a point): `forkAt(h, seq)` (V06 §4.4, BCR-V6-11) makes a new document with the same
  recipe and the log prefix through `seq`, opened in a new tab of the app and added to the recent list — the way to keep
  both a past state and the present.
* **Before a rebase point** (SR5-04; J-V9.122). On a rebased document (§2.9's `Base`) a `seq` below `base.seq` is never
  refused and no control is disabled: `forkAt` and `rerunFrom` bend to the earliest seq they can take (V6 §3.15.5; V6 §4.4;
  J-V6.98) — from a history or chronicle row, a restore point's items and the drawer's `fork` and `rerun` buttons (V9
  §4.11) alike. The app knows the bend from the new document's `forkedFrom.seq` (V6 §4.4), which then exceeds the seq it
  asked for, and adds `info.copy.condensed` — V6 §3.15.5's line, "history before year N was condensed; the copy starts at
  year N", `{year}` the year of the rebase point's week (§2.9's `Base`) — as the new document's opening toast: after the
  re-run's own ("Opened a copy from {name} …"), alone for a copy, and in host mode after `info.copy.saved` (and
  `info.copy.rerunEdits`).
* **In host mode a new document is saved, never opened** (SR2-02; J-SS2.3; J-V9.92). The frame holds one live document and
  has no local store, recent list or app tab (V08 §3.1 step 6; V9 §3.8 (6)), so every action that makes a NEW document —
  **Re-run from here** and **Open a copy from here** (the history and chronicle rows, the restore points' menu items,
  `refuse.restore.dossier`'s button), the drawer's `fork` and `rerun` buttons (V9 §4.11), Enter's **Same kind, new seed**
  (V9 §3.2 (3)), `ClerkMount.openNewDocument` and a document without `model`'s **Open its recipe with this version**
  (V9 §3.14 (c); SR3-01) — follows `HostSlots.newDocuments`. With `'download'` the app makes the
  new document as above (`rerunFrom`, `forkAt`, `generate` with seed + 1, or V9 §3.14 (c)'s recipe and log), writes it with `export(h, 'plat')` under the
  role's key (§11.1 *Knowledge*: a copy is the document, not a picture, so View as does not lower it) to the user's device
  through the frame's download (V08 §5.4 (2): `.plat` is the user's format, never the host's), named `{town}.plat` from
  the new document's name by V9 §5.10's rule, and releases it with `close(h)` (§11.2) without opening it in the frame: the
  frame's document and its log are untouched and nothing is added to a recent list. The toast is `info.copy.saved`
  ("Saved a copy to your computer as {file}; it does not follow {host}.", `{host}` from `HostSlots.hostName`; a
  dossier-bound document's copy is detached, V06 §4.4), and after a re-run it adds `info.copy.rerunEdits` ("{n} later hand
  edits were not carried; they stay in this map.", `{n}` from the re-run's list of edits to re-apply, which the frame does
  not show). A refused write takes V9 §3.14's export row, the new document released. Where the role's key is below
  `secret`, at which §11.1 offers no `.plat`, and with `'off'`, those controls are not drawn — the rows' and points'
  buttons, the refusal card's button, the drawer's `fork` and `rerun` buttons, `error.frozen.noModel`'s **Open its recipe
  with this version** — and Enter with nothing pending does
  nothing. In either setting the drawer's **Start a new map from this** is hidden and no turn enters creation mode
  (V9 §4.11).
* **Name a restore point**: the history panel's "Mark this moment" writes `restore/<id>` at the current head with the typed
  name (default "Restore point {n}").

### 3.10 Export

1. The export dialog (V9 §5.10) collects the format's options and asks the engine for an **estimate** — the file size and
   time from §12.7's laws and §11.1's size estimates, and for a VTT scene the split into scenes when the scope passes the
   scene cap — before anything is written.
2. `export(h, fmt, opts)` runs in the generation worker (§11.1 *Where exports run*); the dialog shows the bands done out of
   the bands total (§11.1) and a Cancel that aborts the worker job.
3. The bytes arrive transferred; the app saves them through the File System Access API's save picker where the browser has
   it, else a download link, with the file name of V9 §5.10's rule. A toast says "Saved {file} ({size})".
4. Exports never change the town (they are views, §11), never write the log, and carry the knowledge key and the drawn
   week the dialog set (§11.1 *Knowledge*; V06 §5.3).

### 3.11 Share

The share sheet (V9 §5.11) asks `export(h, 'permalink')`. When §6.4's conditions hold it shows the link with Copy; when a
condition fails it shows §6.4's reason in plain words (V9 §4.9's `share.*` rows) and offers the `.plat` file instead, and
— for a small log — the inline compressed log of §6.4 (§11.5). The standalone app configures no publishing resolver, so it
never produces `&doc=` references (§11.5); a host that configures one gets the third option. "Share a picture" exports a
PNG of the current view with the knowledge tier the sheet sets (V9 §4.8).

### 3.12 The skeleton: export, import, the canvas script

* **Export skeleton** (history panel and the file menu): `export(h, 'skeleton')` writes §11.1's declared subset with the
  author's removals of generated content (BCR-V9-32); the dialog says "This file holds what you declared and what you
  removed — the rules fill in the rest when it is opened." A clerk transcript saved
  from the drawer is written the same way (the accepted proposals are declarations in the log; the unaccepted ones are
  not in it).
* **Open a skeleton** creates a new document whose creation prefix is the skeleton (§11.1, §4.1): `generate` with the
  skeleton's recipe and prefix; the first map arrives within §12.3's model law plus the prefix's read-ahead. The **import
  dialog** then opens as a sheet over the new map (never before it, R1):
  * **What was declared** — one row per prefix declaration from `GenerationReport.prefix` (BCR-V10-6 (d)): *applied* ("Made
    as written"), *bent* (the bend's `MsgRef`, "Show"), *refused* (its reason and its `closest` options as "Put it here
    instead" buttons, each a preview), and for a carried removal (BCR-V9-32) *kept removed* ("The rules would have built
    {kind} here; kept removed", "Show" outlining where) or *nothing to remove* ("{kind} was removed in the original; the
    rules did not build it here") — never a failed open;
  * **Checked against the rules** — `CritiqueEngine.run` over the new document (V10 §3.10, from `@plat/clerk/core`, which
    needs no model): each `CritiqueFinding` as a line in its catalogue text with its severity, **Show** (highlights its
    subjects) and, when it has one, **Fix** (its `ClerkAction`, worded by its `label` `clerk.alt.critique.fix`; SR-13; J-V9.90): a `propose` fix the dialog runs
    itself, whether or not a clerk is mounted — its events, based as the user's (`EditBase` filled as any tool's
    mapper fills it), go through V9 §3.3's pipeline from step 5 as a ghost with **Accept**, committed by `edit` as the
    user's own declaration with no `proposedBy`, since no model proposed it; a fix of an application kind (`useTool`,
    `select`) runs by V10 §2.6's dispatch table. This is that table's one exception: a `propose` reaches
    `ClerkHandle.run` only from the drawer (XV-V9-19), so the check and its fixes work without the model (V10 §3.21);
  * **Its history** — when the skeleton carries a `history` block (V06 §5.3), "This town was run forward {n} years from its
    founding" with the chronicle's first lines and "Open the chronicle";
  * **Check with the assistant** — shown only when a clerk is configured and on: opens the drawer on V10's `critique`
    route with the skeleton loaded (V10 §3.1).
  The dialog closes with **Done**; its content stays in the report panel ("From the file").
* **The canvas script** — the test harness's gesture script (V9 §7.2) — is a JSON list of gestures in world coordinates
  (`{ tool, mode, params, points, free, accept, view: { cmPerCssPx, centre } }`) that the shell's pipeline plays through the
  real tools. Each gesture fixes the view scale (world cm per CSS px) and centre it was recorded at, and the harness sets
  that view before replaying it, so the feature snap — which resolves in screen pixels (V9 §3.4) — resolves identically
  at any viewport size and device pixel ratio (J-V9.50). It is test tooling, not a user feature.

### 3.13 Determinism

The application puts exactly one non-deterministic input into a document: a new document's seed, a 32-bit value from
`crypto.getRandomValues`, recorded in the recipe (§6.2). Surprise me draws its intent on §7.7's `intent.surprise`
stream of that fresh seed; the proxy thumbnails' six seeds are `H32("proxy/<seed>/<i>")`, i = 1 … 6 (§13.6's `H32`), so
none coincides with Same kind, new seed's seed + 1. Everything else a user does
reaches the model as a resolved event: points are stored after resampling and snapping (§7.1, §9.5), a variation as its
absolute reroll map (§7.3 item 10), a scope as its resolved `EditScope`, so replay never depends on pointer timing, the
frame rate, the viewport or which variation thumbnails rendered first. Restore-point ids are random but are view state,
outside every digest. Hints, the rail's order, handle choice (V9 §3.5) and the message texts are pure functions of their
inputs. T-V9-11 checks that a canvas script played on three engines, two viewport sizes and two pixel ratios, each gesture at
its recorded view scale, yields one model digest.

### 3.14 Failure ladders

| failure | detected by | ladder (in order) | what the user sees |
|---|---|---|---|
| the generation worker or the tile worker dies | the worker host's `error` / heartbeat (none for 5 s while work is pending) | (1) restart the workers; (2) reopen the document from the local store and journal (V9 §3.8); (3) if the restart fails twice, the read-only picture of the last composed tiles with a Download button for the saved `.plat` | "The map engine restarted. Nothing was lost." — or, at rung 3, "The map engine could not restart. Your town is saved; download it or reload the page." |
| a preview slower than its budget | `receivedAt − requestedAt` > 1 s | (1) the badge shows a small working ring; (2) past 10 s the preview is cancelled and the tool switches to preview-on-release for the rest of the session (§12.6's pre-decided fallback) | "Big change — the preview will show when you let go." |
| a confirm token went stale | `confirm` returns a fresh `confirm` (§11.2) | re-show the fates sheet with the new list, highlighting what changed | "Something changed while you were deciding. Here is the new list." |
| storage quota exceeded or a write refused | IndexedDB `QuotaExceededError` or a transaction error | (1) compact now; (2) offer to empty "Recently deleted" and to remove the thumbnails and underlay images of towns not opened in 90 days (each asked, never silent); (3) pause the journal and show the Download banner | "Your computer is out of space for saved towns. Download this town to keep it." |
| IndexedDB unavailable | open of `plat-app` fails | memory store for the session with the persistent Download banner (V9 §2.11) | as V9 §2.11 |
| a snap answer later than a frame | the tile worker's query | the unsnapped point stays shown until it lands (§9.5) | nothing |
| a raised or aqueduct course longer than 3 km (V9 §4.20.2) | the stroke's length at settle | that stroke previews on release only (V9 §6.1), the badge's working ring while the solver runs; nothing commits before Accept | "Big change: the preview will show when you let go." (`error.previewSlow`) |
| an export fails | the worker's error | the partial bytes are dropped (no file written); Retry | "The export stopped: {reason}. Nothing was saved. Try again?" |
| the clerk is unreachable, its key refused, or its month's cap reached | V10 §3.19's ladder, reported as the turn's `outcome` and its `RefusalView` (`offline`, `key`, `budget`) | the drawer shows the refusal card with the actions V10 §3.16's row offers (`openSettings` for `key` and `budget`, none for `offline`); every other tool is unaffected | the card's text is V10 §3.16's row under `refuse.clerk.offline`, `refuse.clerk.key.<keyState>` or `refuse.clerk.budget` (V9 §4.9's explanation paragraph); at the cap the meter's foot line is `clerk.cap.reached` (V9 §4.11; SR-14) |
| a gesture starts while a compaction runs | the worker's queue | the badge's working ring until the preview lands (V9 §3.8 (2)) | nothing more |
| (a) a document of an earlier output version **inside the retention window** (the running version's N−1 or N−2) | §2.9 step 3; §6.4 | the document opens, verifies and edits under its own output version — the retained packages' lazy chunk (V9 §3.1 (1)) — and the owner is offered the upgrade: standalone, the strip `info.upgrade.offer` at the map's top, whose **See what changes** shows §7.5's diff (the engine's `migrate`, §14's `EditEngine`) in the fates sheet's form (V9 §5.5; an auto restore point first, V9 §2.8) and commits the `upgrade` event on **Do it**, while **Not now** keeps the old model (§7.5) for this session, the offer returning at the next open; **in host mode V08 §4.2's "Update the map engine" is that offer and the shell draws none of its own** — one event, one control (J-V8.94; J-V9.96) | `info.upgrade.offer` (standalone, owner; no strip in host mode) |
| (b) a document of an output version **outside the retention window, with its `model`** | §2.9 step 2 | the **frozen view** — view and export only, each chunk checked by its content hash and never root-checked (§2.9 step 2) — labelled by the shell's own `error.frozen` strip at the map's top in both modes (J-V9.97), with the CLI command that replays and checks it under its own output version (§6.4) as a copyable line beneath it; the strip's one control, for the owner, is **Edit it with this version**: the `rebase` event with reason `frozenImport` through `edit` (§11.2; the engine's `rebase`, §14's `EditEngine`, computes its `stateDigest` and `version`, §2.9 step 2), whose dry run returns `confirm` with the renames (§7.4's rebase row), shown in the fates sheet (V9 §5.5) and committed on **Do it** — in host mode through `doc.changed`, the client then sending `doc.snapshot`, as V08 §4.2's upgrade row does; from then on the document edits under the running version, and the rebase's undo (§7.4) returns the frozen view. A chunk that misses its content hash at load: its partitions drawn marked, the strip `error.frozen.damaged`, no **Edit it with this version**. A refusal found at the rebase — its records root differing from `model.recordsDigest` (damage), or a pack that neither `packs` nor the running version's shipped packs hold, or one past §2.9's 2 MB cap (§7.5) — commits nothing and turns the strip into `error.frozen.damaged` or `error.frozen.pack` | `error.frozen` (the Edit control for the owner only; an editor sees the command alone) · `error.frozen.damaged` · `error.frozen.pack` |
| (c) a document of an output version outside the retention window **without `model`** (only the CLI writes one, §2.9) | §2.9 step 2 | no frozen view can be drawn: the town on screen stays (nothing is replaced; in host mode the frame's map region is empty) and the strip `error.frozen.noModel` shows the CLI command beneath it; its **Open its recipe with this version** makes a NEW document from the file's recipe and log as §6.4 opens a link made with another output version — `generate` from the recipe, then the log's events through `edit` (V9 §3.1 (3) (a)) — with §6.4's notice `error.linkVersion`, opened beside the current one (standalone) or, in host mode, under V9 §3.9's host rule: saved to the device and never opened (`'download'`), not drawn with `'off'` (J-V9.96) | `error.frozen.noModel`; then `error.linkVersion` |
| a load mismatch (§2.9 step 4) | load verification | the owner chooses: keep the saved town (a `rebase`) or take the replayed one | "This saved town differs from what its recipe rebuilds. Keep the saved town, or use the rebuilt one?" with the differences counted |
| a skeleton or file the loader refuses | `open` / `generate` errors | nothing is replaced | "This file can't be opened: {reason}." |

### 3.15 The link cache (item 105 (j) at METROPOLIS)

The Supply links view and the Link card need every consumer in view bound to its providers, which at METROPOLIS is tens of
thousands of uses (J-V9.49). The generation worker therefore binds **all** links once per `logHead`, by the function
S10a/S10b use (item 105 (a); the solver's provider index, one nearest-provider lookup per consumer and good), and keeps the
result as a flat array of `LinkRow`s sorted by (consumer address, good) with a grid index over the consumers' anchors. An
edit's commit re-binds only the consumers in its touched set and those whose nearest provider of any good lies in it (the
index answers which), so the cache follows the log incrementally; a `siting.linkEdits` row re-binds its consumer. The
`links` query reads the cache by region, ids or good, pages it (§11.2's 64 KB page) and filters it by the caller's key.
The cache is derived, never saved, rebuilt on load in the background after the first map, and dropped with the document.
Its costs are V9 §6.4's.

## 4 Editing — every screen's declarations, the tool binding, the clerk's view

### 4.1 The editing model in one paragraph

A user either **selects** a thing and acts on it in the context panel (or with the pointer idioms of §14's input scheme),
or picks a **tool** and makes a gesture on the map. Both paths end in the same place: one or more of §7.1's events, sent
through the pipeline of V9 §3.3 — previewed as a ghost, committed once, undone in one step. A tool acts on the **working
layer** (V9 §4.2); a selection acts on the thing selected, whatever its layer. There is no command grammar (R8): the
thing and the action are chosen in one motion — drag a road to move it, click a label to rename it, press on a building
and pick "Why here?". Everything the context panel can do is also reachable by the tool that owns its event kind (V9 §4.3),
so the rail is complete for a user who never opens a panel, and the panel is complete for one who never opens the rail.

### 4.2 The tool rail, the five layers and the working layer

**The rail.** A vertical column on the left (wide and medium layouts; a bottom sheet on narrow, V9 §4.12). It holds the
five layers as labelled groups — "Kind of place" (L0), "Ground & bones" (L1), "What's in it" (L2), "Fabric" (L3), "Finish"
(L4) — each tool a 44 × 44 px button with its icon, its name under it at UI scale 1, and its number badge (T1–T12, which is
also its key, V9 §4.13). **Progressive depth (R9).** On first run only the four `firstScreen` tools show: T1 `intend`, T5
`quarter`, T6 `place`, T12 `dress`, each layer group collapsed to a "More…" chevron. A layer group expands when the user
opens its chevron, when a hint or the guided town points into it, or when the user first uses one of its tools; the
expansion is remembered (`AppPrefs.railExpanded`). T9 `shape` and T10 `hold` are `contextual`: they appear in the rail (and
as the first two tabs of the context panel) from the first selection on, and stay. A user can pin any tool to the top of
the rail (`railPins`). The rail never scrolls on a wide layout (12 tools × 52 px + 5 headers ≤ 760 px at UI scale 1;
beyond that the groups collapse to their chevrons automatically).

**Tool options.** Picking a tool opens its options strip along the top of the map (not a dialog): the mode chips (V9
§4.5's modes) and the parameters marked `basic`; "More" reveals the rest (R4). Options are remembered per tool for the
session.

**No layer bookkeeping (R6).** Nothing in the application orders, stacks or groups what is drawn: draw order is §8.2's
semantic order, a new thing lands where its kind belongs, and the working layer below chooses only which model layer
(ground, a sky island, the underground) the tools act on.

**The working layer** (view key `workingLayer`, per viewer; V9 §2.4): a three-way switch in the view bar — **Ground**,
**Sky** (enabled at CITY and METROPOLIS when the town has islands, II.6; a menu of the islands by name sets `key`), **Below**
(enabled when the town has an underground network, II.7, or a cavern or ruin — at any rung, item 109 (j) (1)). Switching
layer also sets the layer's visibility on (§7.8's layer controls, view state only) and dims the other layers to 35 %
opacity. Every tool mode declares the layers it acts on (`ToolModeRow.layers`). On **Sky** every row of V5 §4.1 takes
its sky form, with the island's `key` (V9 §4.20.9): T1 the islands setting and count; T2 the island's terrain, water and
rim, and a **Terrace** whose edge lays an island retaining wall; T3 **Draw wall** as V5 §3.21's barrier-closure enceinte
walling only the landing yards, and **Retaining wall** as an island `RetainingWall`, bent inward past the rim walk on or
along the rim (`bend.retaining.rim`; J-VI.4 (g)); T4 a sky access only (V05 §4.2; Raised and Aqueduct hidden); T5 a floating quarter; T6 an
institution onto the island; T8 the brushes; T9 the island's altitude, area, position, occlusion, underside and field,
and an access's kind, role, state, knowledge and foot; T10 the island's locks, New random and **Update shade now**; T11
the island's name and label; T12 the sky layer's visibility and occlusion. On **Below**, T4 draws a tunnel, a gallery or
a link and T6 places a chamber or an access, each into the system the **system chip** names (V9 §4.17.2). A mode that
does not act on the working layer is shown disabled with its reason ("Tunnels are dug below the ground" for T4's Tunnel
on Sky). **A raised part** (item 110 (b): a ground arena part from 1) stays on the **Ground** working layer — no fourth
switch — and what lies under its deck is reached through the hit stack (V9 §4.20.8; J-V9.68).

**The Below group** appears in the view bar while Below is the working layer or the underground is visible: the **depth
band** — a ladder of the non-empty bands by depth range ("−2.5 to −5 m") with the kinds present, stepped by PageUp and
PageDown (V04's BCR-10); the view key `depthBand` is its one store — the **view** chips *Cut-away* · *Over the streets* ·
*Below alone* (`LayerSpec.underView`: `cutaway`, `overlay`, `solo`; a `setLayer`, V4 §5.1), the **hand lantern** toggle
(the view key `handLantern`, §2.9), and, only for a view whose knowledge tier is `secret`, **Show hidden caves and ruins**
(the view key `showUnexcavated`, V9 §4.17.1). The **Sky group** holds the island menu and **Update shade now** for a
selected island (V05's `regenerate { kind: 'shade', island }`, T10's). The Map and Light groups are V9 §4.19's.

### 4.3 The tool binding table — every edit kind and where a user reaches it

Every `EditEvent` kind of §7.1, of volumes 1–8 and of this volume's declarations has one **home tool** (the tool whose
modes emit it, generated from `toolkit.json`'s `emits`) and, where useful, a context-panel control or a pointer idiom. A
kind that no user produces directly is marked with its producer. T-V9-12 checks the table against the `EditEvent` union
and the entity registry (§2.8) on every build.

| event kind | home tool (mode) | the gesture | also from | source |
|---|---|---|---|---|
| `adjust` (intent, recipe, layers, islands, sewer family, ruins, a lone hood's outline) | T1 `intend` (cards and sliders) | a card or slider change; after a declaration a Re-derive previews as a whole-town ghost and commits on Accept (V9 §3.3); across the CITY line its effects list the generated raised ways that go or come, with **Keep them as yours** (V9 §4.20.3 (7)) | the basic and advanced panels (§7.8) | §7.1, §7.8; V01 V1-4.2; V04; V05 §4.2 |
| `setField(terrain)`, `warp`, `drawWater`, `moveCourseKnot` | T2 `ground` (raise, lower, cliff, flatten; warp kernels; lake; river by source and mouth; **river or canal drawn** as a line with a width handle; coast and harbour; water paint) | brush strokes; a warp session with Apply / Discard (§7.1); points forms; a drawn line → `drawWater { kind: 'river' \| 'canal', line, widthCm }`; knot drags | river and lake handles (V9 §3.5) | §7.1; V05 (sky key); FTG's drawn river |
| `setAttr` on `geology`, a bank class, a site feature | T2 `ground` (on the selected ground or water) | chips | the context panel | §7.1's terrain and water rows |
| `convert` `reclaim`, `siltReach`, `shiftCourse`, `digCanal` | T2 `ground` (the "Change over time" menu of a water or marsh face) | a context action with a ghost | the context panel | §4.11, §7.1 |
| `drawWall`, `placeGate`; `moveVertex` on a gate's crossing | T3 `wall` (draw, gate; on Sky with the island's `key`, V5 §3.21) | two or more points or a line; a gate stamp on the trace; a gate's grip slides it (V9 §3.5) | wall handles | §7.1; item 106 (g) |
| `drawWall` of kind `retaining` with `highSide` (BCR-V9-26 (a)); `moveVertex` on its chain; `setAttr` on a retaining wall (material, towers, high side) | T3 `wall` (**Retaining wall**; on Sky with the island's `key`) | two or more points or a line with the High side chip (V9 §4.20.1) | the retaining wall's panel and chain handles | item 110 (a) |
| `terrace` (sugar, BCR-V9-26 (c)) | T2 `ground` (**Terrace**; on Sky with the island's `key`) | a brush with a level readout, then the level handle; Accept (V9 §4.20.1) | "Change the terrace's level" on a terrace-made wall | item 110 (a) |
| `setAttr` on the castle (`site`, `baileyArea`) | T3 `wall` (on the selected castle: its keep grip and its bailey handle) | drags, previewed | the castle's context panel ("Move the castle", "Castle grounds" stepper) | §7.4's MFCG asks |
| `convert` `wallToWay`, `gateToJunction`, `neglect`, `breach`, `dismantle`, `contractWall` | T3 `wall` ("Change over time" on an enceinte or gate) | a context action with a ghost | the context panel | §4.11 |
| `drawWay` (every class; `bridge` over water; V07's walk mode) | T4 `road` (class chips: main, street, lane, alley, track, path, quay, pier, bridge, ford) | two points or a line | way handles (`moveVertex`) | §7.1; V07 §4.2 |
| `drawWay` with `raised` and the `aqueduct` class (BCR-V9-26 (b)) | T4 `road` (the **Raised** toggle; the **Aqueduct** chip; V9 §4.20.2) | two points or a line, its ends on ground vertices | a raised way's handles (`rampEnd`, interior points); **Build it again** in the history (V9 §4.20.3); **Keep them as yours** on T1's ghost | item 110 (b) |
| `setAttr` of a span's `use` (`spans/<n>/use`), of a crossing's `form` (`crossings/<wall>/form`), of a raised way's `clearanceCm` and `spanSpacingCm` (BCR-V9-26 (d), BCR-V9-33) | T9 `shape` (its `setAttr`, on a selected raised way, its span or a crossing, reached through the hit stack; SS-46; J-V9.104) | chips; steppers; each previewed (V9 §4.20.6) | the span's, crossing's and raised way's panels | item 110 (a), (b); critique-V4's C4-110-1 |
| `setAttr` on a way (class, width, name) and a bridge's kind | T9 `shape` (its `setAttr`, on a selected way; SS-46; J-V9.104) | class chips; a width stepper | the context panel | §7.1's ways row |
| `split` of a way at a point, `merge` of two ways | T9 `shape` (on a selected way: **Split here**, one click on it; with two ways selected: **Join these**; SR-27; J-V9.104) | a click; a context action | the context panel; the context menu | §7.1; §7.4's MFCG asks ("add vertices") |
| `drawTunnel` (a sewer run, or a gallery with `system`), `addLink` (working layer Below) | T4 `road` (tunnel, link), the gallery's system from the **system chip** (V9 §4.17.2) | two points or a line on the underground layer | — | V04 §4.1; item 109 (h) |
| `placeSkyAccess` (working layer Sky, or a stroke from the ground to a rim) | T4 `road` (sky access) | a stroke ground → rim | the island's context panel | V05 §4.2 |
| `quarter` (sugar), `drawBoundary` | T5 `quarter` (kind card, then seed / corners / lasso / brush / click-inside) | points forms (§7.1) | boundary handles (a partial ring, V9 §3.5) | §7.1; V05 (`sky`) |
| `setAttr` on a district (kind, identity, `DistrictIntent`, band), `merge` and `split` of districts | T5 `quarter` (on a selected quarter: its kind card, band chip, "Merge with…", "Split along…") | chips; a two-point split line | the context panel | §7.1's districts row; item 72 |
| `declareEnd` (village rungs) | T5 `quarter` (at a village rung the card reads "End") | one point, a building or a pin | — | V07 §4.2 |
| `placeAt`, `assign`, `build`, `drawFootprint` | T6 `place` (a class stamp; a typed locus; draw a footprint; on a deck plot, and at a mole's or a long bridge's landmark slot, V9 §4.20.4) | drop, type, draw | the context panel's "Make this a…" | §7.1; item 110 (d) |
| `setAttr` on a market's `rank`, a use's `concealment` and `front`, an institution's `powers` | T6 `place` (on the selected place: "Main market", "Hidden behind…") | chips | the context panel | §7.1; items 24, 63 |
| `rejectSite` (a dossier element's "delete", and its lift), `placeAt { lift: true }`, `unassign` | T6 `place` (on a dossier-backed thing, **Not here**; on a rejected site, **Allow here again** → `rejectSite { op: 'lift' }`; on a pinned plot, **Free this plot** → `placeAt { lift: true }`; on an assigned thing, **Remove the assignment** → `unassign`) | context actions; Delete on the selection | the Delete key; the refusal card | §7.7; the owner's "it is not permanent" |
| `drawChamber` (into a system, or `{ newKind }` creating a ruin, cavern or catacomb, BCR-V9-21), `placeAccess` (over a sealed void it is the user's excavation), `addUndergroundAccess` | T6 `place` (on Below: chamber, access, with the system chip; on a building: "Add a way down") | one point and a size; a context action | the building's context panel; the access closure of a dwelling declaration (V9 §4.17.4) | V04 §4.1; §7.3 item 9; item 109 (h), (j) |
| `setAttr` on an access point (`kind`, `role`, `state`, `knownTo`, `ground.at`), `moveVertex` on its `access_point` vertex, `delete` | T9 `shape` on the selected access ("Brick it up", "Lock it", "Open it", "Who knows this way down", the opening's drag, the underground end's drag); T6 for a new one | chips; drags; the Delete key | the access's panel (V9 §4.17.3) | §7.1's underground row; V04 §4.2 |
| `setAttr` on a catacomb's `fill`; `delete` of catacomb galleries | T9 `shape` on the catacomb (the fill stepper; Delete on selected galleries) | a stepper; the Delete key | the catacomb panel (V9 §4.17.5) | V04 §4.2, §4.3 (J-V4.56) |
| `instance` add (a hood pin) | T6 `place` (furniture stamp) | drop | — | V01 V1-4.2 |
| `convert` `relet` | T6 `place` (the building's "Households") | a number stepper | the plan panel | V03 §4.1 |
| `convert` `openUse`, `closeUse`, `relocateUse`, `mutate`; `swapUse` | T6 `place` ("Open a business here", "Close", "Move it", "Swap with…") | a context action; drag a use's badge onto another building | the context panel | §4.11, §7.1 |
| `roster` (sugar) | T7 `roster`; its one-line form also T6 `place` (a place by a locus: a drop on a quarter, road or gate, or a typed locus; BCR-V9-35) | paste or type a list; cards; for T6, one drop or one typed locus | — | §7.1; BCR-V9-35 |
| `fill`, `setField` (density, greenery, prosperity), `drawGreen`; `setAttrMany` of land use; `instance` groups of trees | T8 `fill` (density, mix, greenery, prosperity brushes; square; park; **Land use** lasso — arable, pasture, orchard, wood → `setAttrMany` of the land-use faces under it; **Trees** brush — plant, thin, restyle → one group of `instance` events, a `drawGreen` first where no green hosts them) | brushes; drops; a lasso | — | §7.1; §7.4's MFCG asks ("farms in chosen areas"); FTG's tree brush |
| `setAttr(fabric)` + `regenerate`, `setAttr(fabricParams.*)` | T8 `fill` (layout card on a district) | a card pick with variations | the close-up panel | V01 V1-4.2 |
| `split`, `join`, `merge`, `moveFootprint`, `setEntrance`, `paint`, `setAttr` (class, heights, roof, basement, tenure, reach, front jitter, surface, a square's type, a block's content, a way's class, width and name, the item-110 `setAttr` paths …; SS-46) | T9 `shape` | corner and door drags; storey steppers; roof and wall paint; chips | the context panel's Shape tab | §7.1; V01 V1-4.1 |
| `setMassing`, `setComposition`, `reshapeRange`, `moveTower`, `addTower` | T9 `shape` (at the building band: range, tower and room handles, storey and dormer steppers, roof, porch, hood, tower-shape and room chips, the family strip; on a `stepped` building the tier controls — `setMassing { op: 'tiers' }` and a tier's `setAttr` of heights, V9 §4.20.5) | handles, steppers, chips (V9 §3.5) | the building tab | V02 §4.1, §4.5, §4.6 |
| plan events (`setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`, `moveStairCore`, `setRoomUnit`), `setHearth`, `instance` on furniture | T9 `shape` (at the building band, the plan) | wall and door drags; role chips | the plan panel (V03 §4.5) | §7.1; V03 §4.1 |
| `drawPassage`, `convert` `sealPassage`, `openPassage`, `densify`, `thin`, `subdivide`, `amalgamate`, `plotToGarden` | T9 `shape` (on a plot or block) | a two-point passage; context actions | the context panel | §7.1, §4.11 |
| `convert` `demolish`, `abandon`, `decay`, `ruin`, `robStone`, `clear`, `rebuild`, `build` | T9 `shape` ("Change over time" on a building) | context actions with ghosts | the context panel | §4.11 |
| `convert` tunnel kinds (`silt`, `caveIn`, `seal`, `reopen`, `flood`), `raiseGrade`, `clearUndercity`; island kinds (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`) | T9 `shape` (on the tunnel, system, neighbourhood or island) | context actions; the island's rim handles (V9 §3.5) | the context panel | V04, V05 |
| `startWorks`, `cancelWorks`, `setAttr` on a Works | T9 `shape` ("Build it over time" on any build, convert, join, split or delete) | a toggle on the action with a duration | the Works' context panel | §4.11, item 67 |
| `editTable` on `siting.declared` and `siting.linkEdits` (V9 §2.6) | T9 `shape` (a place's "What it cares about", its per-kind panel "All {kind}s in this town", "Keep together on one plot"); the link view (V9 §4.7) | chips and sliders; link drags; context actions | the context panel; the tables editor | items 104 (a) (1), 105 (h), (j); V11 §4.2 |
| `lock`, `unlock`, `pin`, `unpin`, `revert`, `regenerate` (keep, New random, a rung, a tunnel run or a system, an island's `shade`) | T10 `hold` | the lock and pin icons; "Try again" with its scope chips; the re-roll brush (V9 §3.7); ctrl / cmd+click (revert); "Update shade now" on an island | alt+click (lock), shift+click (New random), R | §7.1, §14; V04 §1b.3; V05 §4.2 |
| `setAttr(name)`, `setAttr(displayText)`, `moveLabel`, `hideLabel`, `group`, `rerollLayer(naming)` | T11 `name` | click a label to type; drag it; select quarters and "Name as region"; "New names" with a scope | F2 on the selection | §7.1, §9.1 |
| `setAttr(knownTo)` on a plot, building or institution | T11 `name` ("Who knows this place": everyone, locals, secret) | chips | the context panel | §7.1; item 30 |
| `setAttr` on an island (area, altitude, state, occlusion, underside) and on a sky access | T9 `shape` (on the island) | handles and steppers | the island's context panel | V05 §4.2 |
| `setStyle`, `setLayer`, `paintGround`, `placeLight`; the leader-line switch (a style row, §9.4); `rerollLayer` of `style.compass`, `naming.emblem`, `render.instances` (**New trees**, V9 §3.7; SS-29; J-V9.101) and `style.jitter` with `style.crowns` (**New decoration**, one group; SR2-26; J-V9.115) | T12 `dress` | style cards; toggles; **New trees**, **New decoration**, **New emblem** and **New compass** (buttons in the Dress panel, V9 §4.19; each a `rerollLayer` at the concern's current salt + 1 — New decoration two, as one group — V9 §4.5's T12 row; SR-29, SR2-26); a quarter's **Colour** swatch (a thematic `setStyle` row keyed by that district); the wall layer's **Show the whole circuit** and the underground's view chips (`setLayer`); a ground-texture brush; drop a light; the furniture tray | the view bar (layers, the Below group) | §7.1, §9.4, §9.5; §7.4's MFCG asks ("set district colours"); V01 (pinGate, vignette); V04 (lights below, `underView`) |
| `setAttr` on a light (kind, height, colour, intensity, radius, point), `delete` of a light | T12 `dress` (the selected light) | chips; a drag re-hosts its point | the context panel | §7.1's lights row |
| `closeup` | produced by the first edit inside a close-up (PART II) | — | — | §7.1; V01 |
| `setAttrMany` | the multi-selection's context panel (V9 §4.6) | a field changed with several selected | the gazetteer's people list (bulk) | §7.1 |
| `delete` | T10 `hold` (J-V9.74; BCR-V10-20): the Delete key or **Delete** in the context menu, on any thing — a dossier-backed thing takes `rejectSite`, an island V05's `convert removeIsland` (V5 §4.2) | previewed; committed at once only when its dry run lists nothing beyond the thing itself, else Accept (V9 §4.20.3) | every tool's context menu; the clerk (volume 10's `hold` op `remove`) | §7.1; item 110 (b); BCR-V6-24 |
| `editTable`, `editPreset` | the tables editor and the presets dialog (V9 §5.7); the advanced panel's "Raised ways the town builds by itself" (V9 §4.14) | a cell edit; a row insert or delete; a two-way chip | — | §7.6 |
| `epoch` | V06's time card and timeline bar (`advance`) | "Advance 10 years" | — | V06 §4.1 |
| `undo`, `redo` | the top bar; ctrl / cmd+Z, shift+Z; "Go back to here" (a group) | — | the history panel | §7.4 |
| `upgrade`, `rebase` | the upgrade offer inside the retention window (§7.5's diff; standalone `info.upgrade.offer`'s **See what changes**, in host mode V08 §4.2's **Update the map engine**; V9 §3.14 (a)); the load-mismatch choice; the frozen view's **Edit it with this version** (`rebase` with reason `frozenImport`; V9 §3.14 (b); SR3-01); "Rebuild around my drawings" (§7.2) in the file menu, kept in host mode (V9 §2.2's `fileMenu: false`) | — | — | §7.5, §2.9, §7.2 |
| `dossierFacts`, `dossierRecord` | none: host-only (V08 §4.1); refused from any user | — | — | V08 |
| `advance` (V06's trajectory) | V06's time card (T1's sheet) and the timeline bar | a shape chip and "Advance" | the clerk's proposal | V06 §2.3, §4.1 |

The base's **view keys** with no event — `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `season`, `weather`,
favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings, `showUnexcavated` — are
written by `setView` from the controls of V9 §4.2 and V9 §4.19; they are not logged and have no undo beyond the control's
previous value (§2.9).

### 4.4 The context panel — generated from the entity registry

A selection opens the **context panel** (wide: a 360 px column on the right; medium: a 320 px sheet over the map's right
edge; narrow: a bottom sheet at half height, dragged to full; V9 §5.1). Its content is **generated** from §2.8's entity
registry, so a new entity kind or edit path reaches the panel without panel code:

* **Header** — the thing's name (click to rename: T11), its kind in plain words from the message catalogue, a **tier
  chip** for the thing and for each field (§2.8's `factTier`: "From SettlementForge" for `dossier`, "Yours" for
  `declared`, "Made by the rules" for `map`), the lock and pin toggles (T10), and the **Why here?** button (V9 §5.8).
* **Tabs** — **About** (every attribute the registry lists for the kind, each with its tier chip; an editable path is a
  control, a derived one is text); **Shape** (T9's controls for the kind, V9 §4.5); **Keep** (T10: lock paths, pin, revert,
  Try again with its scope chips); **Links** (a use's supply links, V9 §4.7); **Over time** (the kind's `convert` ops and
  "Build it over time" for Works, §4.11; the lifecycle lines — "ruined since year N", "once an inn" — from V06 §5.2);
  **History** (the history panel filtered to rows whose `targets` include the thing). A tab with nothing to show for the
  kind is omitted; the building kind adds V03's plan tab and V02's massing controls at the building band; a district adds
  V01's close-up tab.
* **Controls by attribute type** — an enumeration of ≤ 6 values: chips; more: a searchable list; a number with a range and
  unit: a stepper beside a slider, the unit from `AppPrefs.units`; a boolean: a toggle; a name: an inline text field; a
  reference to another entity: a "pick on the map" button (the next click on a matching kind answers); a colour: the
  style's palette swatches plus a custom picker. An attribute's type, range and unit come from the entity's schema
  (`zod`, §1.7), its label and help anchor from the registry's row for that edit path (BCR-V9-19), a parameter's from the
  control registry (§7.8, §14's context help).
* **Dossier-owned fields** are shown, not hidden: disabled, with the reason "Set by SettlementForge" and, for a name, the
  map-side alternative "Show a different name on this map" (`displayText`, §9.1); an attempt that reaches the engine
  anyway gets the `refuse.dossierOwned` card (V9 §4.9).
* **Multi-selection** — the header reads "{n} selected" with the kinds counted; About shows only the attributes every
  selected thing has, a differing value shown as "mixed"; a change sends one `setAttrMany` with the resolved ids (§7.1),
  one undo step. Shape and Keep act on each selected thing, grouped into one undo step.
* **The context menu** (right-click, a long press on touch, Shift+F10 or the Menu key on the selection) is generated from
  the same registry and `toolkit.json` (J-V9.52), in this order: **Why here?**; **Select below: {name}**, one item per
  other entry of the hit stack under the pointer (V9 §4.20.8); **Try again** (with the kind's default scope); **Lock** / **Unlock**; **Pin** / **Unpin**; **Reset to generated** (when edited); the kind's primary Shape actions
  (the first four of its Shape tab's controls, as items); an **Over time** submenu (the kind's `convert` ops and "Build it
  over time"); **All {kind}s in this town…** for a use (V9 §4.7); and last **Delete**, previewed by V9 §4.20.3's rule — or
  **Not here** for a dossier-backed thing. Each item is the same control as the panel's, so it previews and commits the same way; a menu opens
  at the pointer, is keyboard-navigable (arrows, Enter, Esc) and closes on any other click.

### 4.5 The twelve tools at build depth

Each row gives the modes (with their gesture), the parameters shown at once and those behind "More" (R4), the mapper from
a draft to events (V9 §3.3 step 4), the commit style (V9 §3.3), the badge's extra figures and readouts, the tool's bend and
refusal lines (V9 §4.9), the keyboard form (§14's accessibility contract) and its availability on the narrow layout and
with a coarse pointer (V9 §4.12). §14's table gives each tool's first-use hint and live feedback; they are not restated.

**Mode ids** (`ToolModeRow.id`, V9 §2.3; SR5-07 (a); J-V9.124). Each mode's id is its name in the row in lower camel case,
unique within its tool — among them T6's `stamp`, `locus`, `footprint`, `furniture`, the two **Below** modes `chamber` and
`access`, and `wayDown` (on a building); T9's contextual modes, named by what is selected — `plot`, `building`, `massing`
(V02's massing tools at the building band), `plan` (V03's plan tools), `tiers` (a stepped building's tier controls, V9
§4.20.5), `place`, `way` and `raised`; and T11's `rename`, `moveLabel`, `region`, `newNames`, `leader` and `knownTo`. A
catalogue button and the clerk's `useTool` open a tool in one of them (V9 §2.9's `MsgButton.mode`; V9 §4.11), and T-V9-15
checks every such mode against `toolkit.json`.

| tool | modes · gesture | basic parameters | behind "More" | mapper → events | commit | badge extras · readouts | keyboard form | narrow · coarse |
|---|---|---|---|---|---|---|---|---|
| T1 `intend` | the **Kind of place** sheet: product chips (Town & city; Village when that product is registered, V07; Neighbourhood, V01's `product: 'hood'`), site cards (a forms-catalogue row with its water setting, side and era preset, §7.7, §7.8), size chips (seven, at population quantiles of the rungs' bands read from the rung table: small town, town, large town at the TOWN band's 25th, 50th and 85th percentiles; small city, city, large city at the CITY band's; metropolis at the METROPOLIS band's median — each showing its number, "about 3 400 people"), wealth slider, walls chip (none · one ring · two rings), style card; Surprise me; V06's time card | site, size, wealth, walls, style | exact population, seed, gates, castle, the features strip, planned ↔ organic, greenery, labels (the rest of §7.8's basic panel); "Advanced…" opens the advanced panel | empty state: a new `generate` replacing the untouched town (V9 §3.2); after a declaration: `adjust(param, value)` — a Re-derive for a parameter consumed before S10 (§7.1) | empty state: on release; after a declaration: a whole-town ghost with Accept (V9 §3.3); the fates sheet only after Accept, when fates other than kept or renames exist | the proxy thumbnails while a site or size card is hovered (§7.8); "Rebuilds from {stage}: {n} of your changes are kept, {m} move"; across the CITY line, the raised ways that go or come among the effects (V9 §4.20.3 (7)) | cards in a grid with arrow keys, Enter picks; sliders take arrows and Page keys | yes · yes |
| T2 `ground` | **Raise, Lower, Cliff, Flatten** (brush: press and drag); **Warp** (the eight kernels of §7.1, a session with Apply / Discard); **Lake** (one point, then drag up or down for the level); **River** (source point, mouth point); **River or canal** (draw a line; a width handle, default the kind's width row); **Coast & harbour** (sea level, one shore point, a basin size); **Water paint** (add or subtract water by lasso); **Terrace** (a brush that levels the ground under it to a level, with its level handle; V9 §4.20.1) | brush radius (m), strength | falloff, the terrain brush's water mode (`locked` by default, `follow`; §7.2), a warp's inner radius | a stroke → `setField { field: 'terrain', stroke }`; a warp session → one `warp`; lake → `drawWater { kind: 'lake', from: { points: [p], levelCm } }`; river → `drawWater { kind: 'river', from: { points: [source, mouth] } }`; a drawn river or canal → `drawWater { kind, line, widthCm }`; harbour → `drawWater { from: { points: [shore], levelCm, sizeM2 } }`; water paint → `drawWater` with `add` or `subtract` rings (on Sky: with V05's `key`); terrace → `terrace { stroke, levelCm }` (BCR-V9-26 (c)) | a stroke on release; a warp on Apply; water forms and a terrace on Accept | height under the pointer (m), slope (%), stroke length; "{n} plots re-flow · {m} roads re-routed" from the preview | a brush applies at the focused entity's scope with the arrow keys moving the brush centre and Enter stamping; points forms by arrows + Enter | no (view only: "Shaping the ground needs a larger screen") · yes |
| T3 `wall` | **Draw wall** (two or more points or a line; closes when its ends meet within 20 px); **Gate** (drop a gate stamp on a trace; slide a gate's grip — `moveVertex`, V9 §3.5); **Retaining wall** (two or more points or a line with the **High side** chip; V9 §4.20.1); on the castle, its keep and bailey handles | High side (Retaining wall) | the enceinte kind (§2.7), open or closed | `drawWall { points or from: { points }, kind, closed }`; a gate → `placeGate { enceinte, at }`; a retaining wall → `drawWall { kind: 'retaining', points or from, closed, highSide? }` | on release; Accept when fates move houses or effects are listed | gates · towers · walled m · closed by barriers m · houses displaced · the districts enclosed, tinted (V9 §3.4); a retaining wall: V9 §4.20.1 (2)'s badge | points by arrows + Enter; Tab cycles gate grips | no · yes |
| T4 `road` | class chips (main, street, lane, alley, track, path, quay, pier, bridge, ford, **Aqueduct**); the **Raised** toggle (V9 §4.20.2); **Tunnel**, **Link** (Below, with the system chip); **Sky access** (Sky, or a stroke from the ground to a rim) | class, Raised | width (m), name, V07's walk mode at village rungs | two points → `drawWay { class, widthCm, from: { points: [a, b] } }` (S4's router); a line → `drawWay { points }`; with Raised or Aqueduct → `drawWay { class, widthCm, raised: true, points \| from: { points } }` (BCR-V9-26 (b)); Below → `drawTunnel` / `addLink` (V04); Sky → `placeSkyAccess` (V05) | on release; a raised or aqueduct stroke always on Accept (V9 §4.20.2 (8)) | length (m), bearing (Shift snaps to 15°), grade (%), bridges, "{n} new frontage plots" (ghosts along the road; on a pier, quay or bridge "{n} deck plots", V9 §4.20.4); with Raised on V9 §4.20.2 (8)'s badge | points by arrows + Enter; Backspace or right-click removes the last point; PageUp / PageDown turn Raised on and off while drawing | no · yes |
| T5 `quarter` | a **kind card** first (the district-kind rows, V11), then: one **seed** point, **two to four corners**, a **lasso**, a **brush**, or **click inside** a road-enclosed block (takes that block whole); a name | kind, name, band chip (the band set's labels, §4.5) | size target (m², also the badge's plus / minus), sky (V05) | `quarter { kind, name?, band?, from: { points, sizeM2? } }` (§7.1's sugar); click-inside → the block's ring as the lasso form; at a village rung → `declareEnd` (V07); on a selected quarter: `setAttr`, `merge`, `split` (V9 §4.3) | Accept (pending ghost with handles, V9 §3.3) | plots · households · buildings, **plus / minus** stepping `sizeM2` by (band max − band min) ÷ 8, clamped into the kind's size band, from the band's median when unset (BCR-V9-16, merged with BCR-V10-12) | kind cards by arrows; the seed at the focus point; handles by Tab | yes (seed and click-inside only) · yes |
| T6 `place` | **Stamp** (a searchable palette of class stamps grouped by category, V11's labels and icons, listing the classes the document's rung admits — V9 §4.16 (3)'s set (seam SR6-03); drop on a spot, a quarter, a road or a gate); **Locus** (type "near the north gate"); **Footprint** (draw a polygon); **Furniture** (V01's hood-pin stamps); **Below**: chamber (`chamber`), access (`access` — `placeAccess` on a chosen spot, over a sealed void the user's excavation; the mode `bend.under.noAccess`'s and `info.under.sealed`'s **Add a way down** open), each into the system the system chip names, and "New ruin", "New cavern", "New catacomb" where item 109 admits one (V9 §4.17.2); on a building: "Add a way down"; on a rejected site "Allow here again", on a pinned plot "Free this plot", on an assigned thing "Remove the assignment"; on a deck, its plots and a mole's or long bridge's landmark slots (V9 §4.20.4) | class, name | exact site ("this plot only"), the drift bounds (§7.7), a hidden front (item 63) | a drop on a plot → V10 §4.1's `where.at` row (with "this plot only", its `where.plot` row), the one mapping for canvas and clerk (T101-3; SS-11): `placeAt` with `designation { cls, use }` (§4.7's `Designation`: the stamp's building class and its roster class id) and, when the name field is filled, a `setAttr { path: 'name' }` on the use that `placeAt` creates — its address read from the preview's `created` list (BCR-V10-6) as V10 §3.11 (3) resolves a placeholder — the two in one group; a drop on a quarter, road or gate, or a typed locus → a one-line `roster { lines: [{ name, cls, locus }], expansion }` (`expansion` sugar.json's current version; an empty name field writes `name: ''`, BCR-V10-23's unnamed line; one text with V10 §4.1's `where.locus` row; T6's own kind by BCR-V9-35; the sugar expands to one `assign` whose id the engine mints from the event's `seq`, §6.3, so the app never writes an assignment id; the locus is a `Locus` (§7.1: its `rel` in, on, at or near, its `target` and optional `side`) parsed from the drop target or the typed words, V9 §4.16); **with a dossier connected** (§7.1's roster rule; SR-10; J-V9.88) a locus drop of a class stamp previews the same one-line `roster`, and a line naming no element comes back `dossier-owned`: its refusal card is `refuse.roster.dossier` with the element picker of V9 §4.16 (5) (the unplaced elements, the stamp's class first; a pick re-previews the line with its `element`, V10 §4.1's `element` row) and **Put it at {site}** — `placeAt { plot, designation }` on the first `SiteCandidate` satisfying the locus, the alternative V10 §3.16 offers: the first candidate with no `hardFails` of `query({ kind: 'sites', cls, near: target.anchor, district: rel === 'in' ? target.id : undefined, k: 3 }, { admitAs })` — `target` the locus target's `EntityCard`, `district` only for `in` a quarter — one query for canvas and clerk (XV-V9-19); when none of the three is free of hard fails, **Put it at {site}** is not shown and the element picker stays — one rule with V10's `dossier` alternative, which is then not offered (SR2-10, SR2-11); footprint → `drawFootprint`; furniture → `instance { op: 'add' }` (V01); chamber → `drawChamber { system }` or `{ system: { newKind } }` (BCR-V9-21); access → `placeAccess`; a way down → `addUndergroundAccess`; the lifts → `rejectSite { op: 'lift' }`, `placeAt { lift: true }`, `unassign` | Accept, or nudge (drag the ghost footprint to another plot: a new preview there) | the chosen plot's area, households; the one-line reason; two or three faint alternatives (BCR-V9-12); on a deck "on the {deck} · at most {n} storeys · {a}–{b} m²" (V9 §4.20.4) | the stamp palette is a listbox with type-ahead; the locus field is text; Enter accepts | yes · yes |
| T7 `roster` | **Paste** into the visible box in T6's options ("Paste your list of places"); each line becomes a card with its guessed class (changeable) and locus; under the box, **Ask the assistant to place these** when a clerk is configured and on (V9 §4.11; SR-12) | — | with a dossier: an element picker per line (unplaced elements) | one `roster { lines }` (§7.1's sugar) for the whole list; accepting card by card commits a `roster` with that card's line and re-previews the rest; with a dossier connected, a line committed naming no element comes back `dossier-owned`: its card is `refuse.roster.dossier` — the element picker and, when a candidate is free of hard fails, **Put it at {site}** by T6's `sites` query (`near` and `district` from the line's locus, both omitted for a line with none; V10 §4.1) — one rule with volume 10's `dossier` alternative (J-V10.93; J-V9.99; SR3-03) | Accept all, or per card | plots · households · buildings; sites placed · lines not placed (each with its nearest options) | the card list is a grid; Enter accepts the focused card | yes · yes |
| T8 `fill` | **Density**, **Mix** (an arrangement: dense rows, detached, compounds …), **Greenery**, **Prosperity** brushes; **Square**, **Park** (drop and size); **Land use** (a lasso: arable, pasture, orchard, wood); **Trees** (a brush: plant, thin, restyle); **Layout** card on a district (V01's fabric) | brush radius, the density dial (−3 … +3) | the arrangement's class, the layout's parameters (V01) | density / greenery / prosperity → `setField { field, stroke }`; mix → `fill { scope: the blocks under the brush, arrangement, cls? }`; square / park → `drawGreen { polygon, kind }`; land use → `setAttrMany { ids: the land-use faces under the lasso, path: their kind, value }` (§2.7's land-use faces); trees → one group of `instance { op: 'add' \| 'remove' \| 'restyle' }` (a `drawGreen` first where no green hosts them); layout → `setAttr(district.fabric)` + `regenerate` (grouped, V01) | brushes, mix, layout: Accept one of three variations, the committed group of V9 §3.6; square, park, land use, trees: Accept | plots · households · buildings; the variation tray | the brush at the focused scope; `[` `]` cycle variations; Enter accepts | no · yes (subject to §13.4's touch fallback) |
| T9 `shape` | contextual: on a plot — split (a two-point line), join (click a neighbour), corner drags, front jitter, reach; on a building — move and turn the footprint, storeys, roof kind and colour, door drags, basement, class, over-time actions, "Build it over time"; at the building band — V02's massing and V03's plan tools, and on a `stepped` building the tier controls (V9 §4.20.5); on a place — "What it cares about" (V9 §4.7); on a way — class, width and name, **Split here** (one click on it) and, with two ways selected, **Join these** (SR-27); on a raised way, span or crossing — V9 §4.20.6's controls (SS-46) | the kind's primary controls | the rest of the kind's editable paths | the event kinds of V9 §4.3's T9 rows; on a way, Split here → `split { id: the way, cut: [p] }`, `p` the nearest point of the way's centre-line to the click by V10 §4.1's T9 rule (CVR-V10-18 (b)), and Join these → `merge { ids: [the first selected, the second] }` (SR-27) | on release (each edit one undo step; V02 and V03 as they state) | "{n} households re-homed", the site plan's changes | every control in the Shape tab is a form control | view and the Shape tab's forms only · yes (subject to §13.4's fallback) |
| T10 `hold` | contextual: the lock and pin toggles on any thing; **Keep these, re-roll the rest** on a lasso; **Try again** with scope chips (on Below also this run, this system); the **Re-roll brush** (V9 §3.7); **Reset to generated**; on an island **Update shade now**; **Delete** on any thing (the Delete key and the context menu; V9 §4.20.3; J-V9.74) | — | lock on attribute paths (a person's name, a room) | `lock` / `unlock` / `pin` / `unpin`; `revert`; `regenerate { scope, mode }` (V9 §3.7); `delete { id }` | lock and pin at once; a re-roll by Accept of a variation; a Delete at once, or on Accept when its dry run lists anything beyond the thing itself | the fates list (kept, carried, orphaned); held things stay bright while the rest ghosts | alt+Enter toggles the selection's lock (L stays the labels key, §14); R is Try again | yes · yes |
| T11 `name` | click a label to type a new name; drag a label; select quarters and **Name as region**; **New names** with a scope (these, this quarter, the town); the leader-line switch; "Who knows this place" | — | name packs and a user's own name list (§10.4, an `adjust` of packs) | `setAttr(name)` — or `setAttr(label.displayText)` for a dossier-owned name; `moveLabel`; `hideLabel`; `group`; New names — these → `rerollLayer { concern: 'naming', ids: the selection's named entities, salt: 0 }`; this quarter → the same with `ids` the quarter and every `gazetteer` row not marked withheld whose district is the quarter, read with `admitAs` = `effectiveKey()` (V9 §2.7; J-V9.110; CVR-V10-18 (a)); `ids` in address order in both scoped forms (CVR-V10-18 (c)), their per-entity `salts` the dry run's (§6.3 case (3)); the town → `rerollLayer { concern: 'naming', salt: the concern's current salt + 1 }` with no `ids`, through the fates sheet — a concern's current salt is §6.1's effective salt, as `DisplayList.salts` carries it (SR-29); `setAttr(knownTo)` | on Enter or release; a town-wide New names or a pack change via the fates sheet (it lists every rename, §6.3 case (4)) | "{n} names change" | F2 renames the selection; Tab moves between labels in view | yes · yes |
| T12 `dress` | **Style** cards (the shipped families, random style, saved sheets); the **quarter tint** toggle; a selected quarter's **Colour** swatch; the **furniture tray** (compass, scale bar, title cartouche, legend, emblem, border, grid, north arrow, annotation marker); **Light** (day or night, sun: cursor, fixed or path, sun height, hour); **Ground texture** brush; **Lights** (drop a lamp or a torch); **Underlay** (an image to trace, its opacity and frame handles); the close-up's quieter / busier slider and vignette (V01); **New trees**, **New decoration**, **New emblem** and **New compass** (buttons in the Dress panel; V9 §3.7, §4.19) | style, tint, furniture, light | ground texture, lights, underlay, the style's rows ("Edit this style…", the style dialog) | style card → `setStyle`; tint → `setStyle` (a thematic row); a quarter's colour → `setStyle` (a thematic row keyed by that district); furniture and light → view keys by `setView` (§9.5, §2.9); ground texture → `paintGround`; lights → `placeLight`; underlay → the `underlay` view key; close-up → `closeup` params and `setStyle` (V01); New trees → `rerollLayer { concern: 'render.instances', salt: the concern's current salt + 1 }` (town-wide, §6.1; display only: the trees, hedgerows and render-time field strips are re-drawn and nothing else moves; J-V9.101); New emblem → `rerollLayer { concern: 'naming.emblem', salt: the concern's current salt + 1 }` and New compass → `rerollLayer { concern: 'style.compass', salt: the concern's current salt + 1 }` (town-wide; the emblem generator and the compass program re-draw, nothing else, §9.5; SR-29); New decoration → one `group` of `rerollLayer { concern: 'style.jitter', salt: the concern's current salt + 1 }` then `rerollLayer { concern: 'style.crowns', salt: the concern's current salt + 1 }`, in §6.1's registry order (town-wide; display only: the drawing's render-time jitter and the tree crowns' shapes are re-drawn and nothing else moves, §6.1; one undo step; SR2-26; J-V9.115) | at once; logged ones are one undo step each; view-key changes are not logged and are toggled back | — | every card and toggle is a button; the underlay's frame handles by Tab and arrows | yes (not the texture brush or the underlay) · yes |

### 4.6 Multi-selection and moving things (R16)

* **Selecting several.** Shift+click adds or removes a thing; shift+drag on empty map draws a box; the lasso (T10's lasso,
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
  context menu lists **Select below: {name}** for each (V9 §4.20.8; BCR-V9-28). A double-click still zooms to the thing's
  band.
* **Copy and paste** are not offered: a copied building is not a declaration the rules can derive, and the survey records
  the request only for free-form builders (Tiny Glade, `research/ux/tool-survey.md` §1 rank 5); a "same kind here" is T6's
  stamp.

### 4.7 The file-g edits: siting, links, splits, wall stretches, records

**"What it cares about" (items 103 (e), 104 (a)).** A place's Shape tab shows how the rules site its kind, read from its
`why` answer (V9 §2.7): the eight families of V11 §2.4 as rows, each worded by V11 §3.3.1's `says` column (V11's sentence,
single-sourced; J-V9.36) with the resolved weight's **source chip** ("yours", "from its picture type", "from its category",
"from its tags", "from its library entry", "guessed from its name" in the low-confidence tone, "a general guess"). The
rows are read-only here and link to the **per-kind panel**, "All {kind}s in this town" (also on the context menu): the
same rows with a five-step control each (Ignore 0 · Less 0.5 · Normal 1 · More 2 · Much more 3), writing the family
multiplier into `siting.declared` under the kind's key (V9 §2.6: `uid:`, `cat:` or `cls:`) by `editTable`; "Edit the
details" opens the kind's `Partial<SitingProfile>` cells (emits and sensitive-to levels, needs, clientele, competition,
coverage, balance) as a typed form over the same row; and **Put them in {quarter}**, **Put them here** and **Keep them where
they are** write V11's `quarter`, `place` and `pin` cells. The chips turn to "yours". The panel then says, as V11 §4.3
rules: "Placed {kind}s stay where they are. {n} would gain by moving." and offers **Show better sites**: a fresh `why`
whose `alternatives` (≤ 3) are drawn as faint numbered outlines; clicking one previews `convert relocateUse { use, to:
site }` (§4.11) with its fates, and Accept moves it. A change for every town ("all tanneries everywhere") is the tables
editor's (V9 §4.14).

**The link view and link edits (item 105 (j)).** The thematic view **Supply links** (V9 §5.4) draws the links. Clicking a
link selects it (`Selection.kind = 'link'`); the Link card reads "{consumer} buys {good} from {provider} — {distance} m,
{near enough | a long way}", its orientation in words, and — for a SettlementForge chain (item 105 (i)) — "This supply is
impaired" or "This supply is at risk" and "{end} trades through {entrepôt}". It offers, each an `editTable` row operation
on `siting.linkEdits` keyed `<consumer>/<good>` (V9 §2.6):
* **Keep this supplier** → `{ bindTo: provider }`;
* **Use another supplier** → the link's provider end becomes a handle; every other member providing that good glows;
  dropping on one → `{ bindTo: that member }` (item 105 (j)'s "move"); dropping elsewhere cancels;
* **Cut this link** → `{ avoid: [provider] }` (the next nearest serves); **Stop buying {good} here** → `{ cut: true }`;
* **Reset** → the row deleted (the path back to the rule).
Each previews first: the ghost redraws the consumer's links as they would bind, and the badge names what re-binds ("the
bakery now buys flour from the east mill"). A binding change moves no building by itself; the card offers **Show better
sites** as above. A kept link is drawn with a pin dot at the consumer end; a cut or avoided link is shown (as a crossed
stub) only while its consumer is selected; an impaired or at-risk chain's links draw at half width with a gap every 20 px,
and an entrepôt's end carries a small square (the legend names both). A chain is never labelled a quarter in this view: the
legend names a chain by its goods ("wool → cloth → dyed cloth"), and a quarter name appears on the map only when item 72's
identity threshold names one or the author or the dossier declares one (item 104 (h) (3) as revised by item 107 (e)).

**Works and shop (item 105 (h)).** A split institution's panel shows both buildings ("Works: the slaughterhouse outside
the east gate · Shop: the stall on Market Street") with **Keep together on one plot** → a `siting.declared` row keyed
`use:<works use>` with `split: false`, previewed with its fates (the shop's use closes and the works takes one plot);
**Let the rules decide** deletes the row. The per-kind panel offers the same for every member of the kind. The split's
own placement is the solver's (item 105 (h)).

**A wall's stretches (item 106 (c)).** Selecting a stretch of wall shows its grade — "Full curtain", "Light wall", or
"No wall: the {cliff | gorge | marsh | water} closes it" — as chips. A change is `setAttr(enceinte, 'profile/<arc>/grade',
g)` (BCR-V9-13), an edited path S7's operator keeps as a fixed input; "No wall" is offered only on an arc whose barrier
closes by item 106 (a)'s defensibility table, and a request for it on open ground is bent: "Open ground needs a wall; kept a
light wall here." The badge shows the stretch's length and towers.

**A collective record's members (item 108).** A record selected from the gazetteer or by clicking one member (then
"Select all {n}") sets `Selection.kind = 'record'`: every member is outlined on the map, and the panel reads the record's
`EntityCard.members` (BCR-V10-1): "Blacksmiths — 7 workshops (the town's size asks for 5 to 10)", the step in plain words
(COUNT "one trade, several workshops"; QUARTER "a trade's own quarter"; GUILD "a guild hall and its workshops"; SIZE "one
larger establishment"; REPLACEMENT "replaced the smaller one"), and the members by district, each clickable. Members are
edited one by one like any building; the count is the dossier's range or the population's (item 108 (b)) and is not a
control; a map-side `setAttr` of the count is refused `dossier-owned` when the dossier set the range (§7.7 item 11), with
"Show me why" on its card.

### 4.8 Knowledge in the editor — "View as"

The view bar's **View as** menu (owner and editor roles) chooses what this view **shows**: "Everything" (the role's
tier), "What locals know" (`local`), "What anyone knows" (`public`). It is a display filter, not the view's knowledge key
(J-V9.46): it sets `ViewOpts.viewAs` (BCR-V9-23), which §9.2's filter reads for this view's tiles and labels, admitting
only what both the key and `viewAs` admit. **Every other read for the view** — the panels, the gazetteer, the why card,
the Link card, the People panel, the family tree, "Where is", T6's alternatives and the clerk's reads for this drawer —
passes the view's effective key (V9 §2.10's `effectiveKey()`) as `admitAs` on its band-less `query` (BCR-V10-22; V9
§2.7; SR-08), and the export dialog's default knowledge is that same key (BCR-V9-14). The per-viewer `knowledge` key
stays the role's (§11.3), so compaction, ctrl / cmd+S and "Download all my towns" — which need tier `secret` (§11.1) —
keep working while the owner views the town as a player. It only lowers (a client never raises its tier above its role's,
J-A30.82), a tier keeps the key's places list, and while it is lowered a banner "Viewing as: what anyone knows"
(`info.viewAs`) stays up and "Show hidden caves and ruins" is hidden. The export dialog shows what it will write and can
lower it further for that export (BCR-V9-14).

**A host's players' view** (SR-05, SR-06; J-V9.85). A host may set `viewAs` to a key form — a tier with the places the
party has learned. V08's "See what the players see" (V08 §3.14 (5), `seePlayersView`) is that: the embed's bridge
handler (V08 §3.1) applies the resolved party key to the frame's view by `setViewOpts(view, { viewAs: { tier, places }
})` and clears it with `viewAs: undefined`, with no view-state write, so the frame's knowledge key and its document
formats stay the role's. While a host's form is set, the View as menu reads **"What the players know"** — a fourth
entry, shown only then and selected — with its other entries disabled under the line `info.viewAs.host`; the View as
banner is not drawn, because the host's strip "Showing what the players see" (`HostSlots.banner`, V08 §5.1) stands for
it; and `effectiveKey()` returns the form by V9 §2.10's rule, so the panels, the why card, the Link card, the gazetteer,
the drawer and the export default all read as the players would.

### 4.9 The words — the message catalogue's rows (English, our own)

Every line a user reads for a bend, a refusal, a fate, an error, a share condition or a hint is a row of
`messages/en.json` (V9 §2.9). The rules for writing one: one sentence, at most 25 words; say what happened and what to do;
name the thing by its name, never by an id; never "error", "invalid", "conflict" or a code in the text; offer the action as
a button when there is one; the bend tone is gentle ("follows", "kept"), never apologetic. **Bend before refusing**
(R2; J-V9.44): where the dry run can name the nearest lawful alternative, the engine bends to it and the row is a `bend`
with that alternative pre-selected and the other one click away; the only refusals left are a dossier fact, a lock or an
assignment, a dependent later change, the viewer role, a staged layer, the rung, the screen, — the class "a rule of a building's structure or of nature" (J-V9.67) is withdrawn by J-VI.4, its cases now bends — and
**every** refusal row
carries at least one button, at the least **Show me why** (the why card of the blocking thing, or the help page of the
limit — the target chosen by V10 §3.5 step 3's *The why target*, one rule for this button and the clerk's `why` action,
cited, not restated; CVR-V10-19 (b); J-V9.120) — and the rule is data: every `refuse.*` row's `buttons` end with
`button.showWhy` (SR5-01 (b); T-V9-15). **The button column** is each row's `buttons` list (V9 §2.9's `MsgButton`), in
order and separated by " · ": each button its `button.*` key, then its class and the data the class needs — `commit(…)`
with its source (a `ConflictAction` kind; `alternatives` with its list form `each`; `unplaced`; or `event:<form>`, a row of
*The event forms* below), `why` (with `page` where the row names one), `show(…)` with its `arg`, `tool(<tool>/<mode>)`
with `subject: <argument>` where it acts on the row's thing, `drop`, `app(…)` with its command and argument — and a `when`
in brackets (`[owner]`, `[names]`). A name in backticks after `show`, `subject` or `app` is the `MsgRef` argument it reads
(V9 §2.9's *Arguments a button reads*). The words are *The `button.*` rows* after the table. The shipped rows:

| key | text (placeholders in braces) | buttons — the row's `MsgButton` list (V9 §2.9) | engine codes it renders |
|---|---|---|---|
| `bend.wall.ridge` | "The wall follows the ridge, {m} m off your line." | — | `PreviewResult.bent` (S5a's trace) |
| `bend.wall.reach` | "The wall reaches the {barrier}; the ground between becomes gardens." | — | item 106 (b) |
| `bend.wall.waterfront` | "Kept the harbour open with {n} sea gates." | — | item 106 (d) |
| `bend.wall.open` | "Open ground needs a wall; kept a light wall here." | — | item 106 (c) (V9 §4.7) |
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
| `refuse.dossierRemove` | "SettlementForge keeps {thing} in this town. You can move it, or mark this spot as not for it." | `button.moveIt` show(`thing`) — selected with its handles; dragging moves it (V9 §4.6) · `button.notHere` commit(`event:notHere`) · `button.showWhy` why | F-EDIT (§7.7 item 2's list); `rejectSite`, `placeAt` offered |
| `refuse.roster.dossier` | "SettlementForge's record decides this town's places. Place one of them here, or put {thing} on a plot {locus}." — slots: `{thing}` the line's name, or the class's display label when the name is `''`; `{locus}` the line's locus worded by V9 §4.16 (6) ("near the North Gate"), or for a line with none the settlement's name after `in`'s connective ("in Oakford") (SR3-04; J-V9.100) | `button.placeElement` commit(`unplaced`) — V9 §4.16 (5)'s picker · `button.putAt` commit(`event:firstFreeSite`) (not drawn when no `sites` candidate is free of hard fails; SR2-11) · `button.showWhy` why | F-EDIT `dossier-owned` on a `roster` line naming no element — T6's one line, any line of T7's list, or the clerk's (§7.1's roster rule; V9 §4.5's T6 and T7; SR-10, SR3-03) |
| `refuse.locked` | "{thing} is locked. Unlock it to change it." | `button.unlock` commit(`unlock`) · `button.showWhy` why | `E_LOCKED`; `ConflictAction` `unlock` |
| `refuse.assigned` | "{thing} is assigned. Remove the assignment to change it." | `button.unassign` commit(`unassign`) · `button.showWhy` why | `ConflictAction` `unassign` |
| `refuse.assignment.noSite` | "No plot here suits {thing} as it is assigned. The closest places are marked." — the marked places are the refusal's `moveTo` actions | `button.putAt` commit(`moveTo`) — the same declaration at the first `moveTo` target, previewed: an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` (J-V9.111) · `button.showWhy` why | F-EDIT (§5.2 as file f item 582 amends it): an assignment, or the re-placement a `rejectSite` causes (§7.7), that no plot satisfies inside the hard rows (SR-30) |
| `bend.place.noSite` | "{thing} needs {reason}; it went to {site}, the closest place that has it." | `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; no plot here in the hard rows); `PreviewResult.alternatives` for the other acceptable sites (BCR-V9-12; file f item 582's alternatives) |
| `bend.place.overBudget` | "Putting {thing} there would move {n} other places; it went to {site}, which moves {k}." | `button.overBudget` commit(`event:exactSite`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; the disruption budget) |
| `bend.vacate` | "This pulls down {building}; its {n} households move to {where}." | `button.keepBuilding` drop (withdraws the edit) | the dry run's bend (file f item 582; item 31's demolition as a fate, item 17's relocation) |
| `bend.room.minArea` | "The {room} stays at {m2} m², the smallest a {role} can be." | `button.roleInstead` commit(`event:roomRole`) · `button.showWhy` why | F-EDIT (plan minimum), bent to the smallest lawful split (V03 §4) |
| `bend.room.noDoor` | "Moved the wall so every household keeps its own door." | `button.showWhy` why | F-EDIT (item 28 (f)), bent to the nearest wall position that keeps each unit's door |
| `bend.capacity` | "This building holds at most {max} households; set to {max}." | `button.showWhy` why (J-V9.123) | F-EDIT (`relet` above capacity), clamped |
| `bend.passage` | "A passage needs two storeys above it; it goes under the two-storey part of {building}." | `button.showWhy` why | F-EDIT (`Passage.headroomCm`), moved to the nearest lawful run |
| `refuse.warp` | "That push would move {thing} off its ground. Unlock it or push more gently." | `button.unlock` commit(`unlock`) · `button.showWhy` why | F-EDIT (warp carrying a held record) |
| `refuse.water` | "The new water would reach {thing}, which is kept. Unlock it or move the water." | `button.unlock` commit(`unlock`) · `button.showWhy` why | F-EDIT (§7.3 (b) 3) |
| `bend.carve` | "The river takes the deepest course the ground allows, {m} m at most." | `button.showWhy` why | F-EDIT (`carveMaxCm`), bent to the deepest lawful course |
| `refuse.kept` | "That would cut through {thing} made earlier. Rebuild from {stage} instead?" | `button.rebuildFrom` commit(`event:rederive`) · `button.showWhy` why | `E_KEPT`, `E_LEVEL` (§7.1's one resolution) |
| `bend.invalid` | "{field} can't be {value}; set to {nearest}, the nearest it allows." | `button.showWhy` why | `ConflictAction` `invalid`, clamped to the nearest lawful value |
| `refuse.stale` | "The town changed while you were working. Here is the new preview." | `button.newPreview` show(`preview`) · `button.showWhy` why | `ConflictAction` `stale`; `doc.rejected { stale }` |
| `refuse.staged` | "{layer} isn't part of this version yet." | `button.showWhy` why(page `staged/{layerId}`, the staged layer's guide page) | F-EDIT naming a staged layer (§7.3 item 9 (d)) |
| `refuse.islandsRung` | "Floating islands exist only in cities and metropolises." | `button.cityUp` commit(`event:cityUp`) · `button.showWhy` why | §7.8's disabled control |
| `refuse.undo.creation` | "This is where the town began. Remove the assignment instead." | `button.unassign` commit(`event:unassignCreation`) · `button.showWhy` why | F-EDIT (undo of a creation event) |
| `refuse.undo.dossier` | "Changes from SettlementForge can't be undone here." | `button.otherNameHere` tool(`name`/`rename`, subject: `thing`) [names] · `button.showWhy` why | F-EDIT (undo of a dossier event) |
| `refuse.undo.dependent` | "Later changes by {authors} depend on this. Undo those first." | `button.showThem` show(`dependents`) · `button.showWhy` why | F-EDIT (independence, §7.4) |
| `refuse.restore.dossier` | "The town can go back only to {time}; SettlementForge changed it after that." | `button.goBackTo` app(`goBack`) · `button.openCopy` app(`openCopy`) · `button.showWhy` why | V9 §3.9 |
| `refuse.viewer` | "You're viewing this town. Ask its owner to make changes." | `button.showWhy` why | `preview` refused `role`; `doc.rejected { role }` |
| `refuse.exportTier` | "This file holds every secret of the town; only its owner can make it." | `button.pictureInstead` app(`exportPicture`) · `button.showWhy` why | `E_KNOWLEDGE_TIER` |
| `refuse.phone` | "{tool} needs a larger screen. Open this town on a tablet or computer." | `button.shareDevice` app(`share`) · `button.showWhy` why | V9 §4.12 |
| `refuse.layer` | "{tool} works on the {layer}. Switch to it first." | `button.switch` app(`switchLayer`, `layer`) · `button.showWhy` why | V9 §4.2 |
| `share.pack` | "This town uses the setting pack {pack}, which isn't built in. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (pack) |
| `share.corpus` | "This town uses your own name list {list}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (user corpus) |
| `share.host` | "This town uses content from {host}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (host content) |
| `share.kept` | "This town was kept from a saved copy, so a link can't rebuild it. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (rebased base) |
| `share.long` | "Too many changes for a link. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (2 000 characters) |
| `fate.kept` | "stays as you made it" | — | `EditFate` `kept` |
| `fate.carried` | "moves with its new surroundings" | — | `carried` |
| `fate.orphaned` | "loses what it was attached to; it stays in the history and can be re-attached" | `button.reattach` app(`reattach`) | `orphaned` |
| `fate.discarded` | "your change is removed" | — | `discarded` |
| `error.workerRestarted` | "The map engine restarted. Nothing was lost." | — | V9 §3.14 |
| `error.workerDead` | "The map engine could not restart. Your town is saved; download it or reload the page." | `button.download` app(`download`) · `button.reload` app(`reload`) | V9 §3.14 |
| `error.engine` | "This browser can't run the map engine: {reason}." | — | `E_ENGINE_UNAVAILABLE` |
| `error.previewSlow` | "Big change: the preview will show when you let go." | — | V9 §3.14 |
| `error.storageFull` | "Your computer is out of space for saved towns. Download this town to keep it." | `button.download` app(`download`) | quota |
| `error.storageNone` | "This browser won't let the editor keep your town. Download it to keep your work." | `button.download` app(`download`) | IndexedDB refused |
| `error.exportFailed` | "The export stopped: {reason}. Nothing was saved. Try again?" | `button.tryAgain` app(`retry`) | an exporter's error |
| `error.clerkOffline` | "The assistant isn't available right now. Everything else works." | — | a clerk `error` turn |
| `error.openRefused` | "This file can't be opened: {reason}." | — | `open` / `generate` errors |
| `info.upgrade.offer` | "Made with {version}; it opens as it was made, and updating it to {current} adds what's new." | `button.seeChanges` app(`seeUpgrade`) · `button.notNow` drop | §2.9 step 3, §7.5 (V9 §3.14 (a); standalone only) |
| `error.frozen` | "Made with {version}, shown read-only and not checked by this version; edit it with this version, or replay it exactly with the command below." | `button.editWithVersion` app(`editWithVersion`) [owner] · `button.copyCommand` app(`copyCommand`) | §2.9 step 2 (V9 §3.14 (b); SR3-01) |
| `error.frozen.damaged` | "Part of this saved copy is damaged, so it can't be edited here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's damage: a chunk missing its content hash, or the records root differing at the rebase |
| `error.frozen.pack` | "This town needs the setting pack {pack}, which can't be added here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's missing pack; §7.5's 2 MB cap at the `frozenImport` rebase |
| `error.frozen.noModel` | "Made with {version}, and this file keeps only its recipe and changes; open them with this version, or replay it exactly with the command below." | `button.openRecipe` app(`openRecipe`) · `button.copyCommand` app(`copyCommand`) | §2.9 step 2's document without `model` (V9 §3.14 (c)) |
| `error.mismatch` | "This saved town differs from what its recipe rebuilds ({n} differences). Keep the saved town, or use the rebuilt one?" | `button.keepSaved` app(`keepSaved`) · `button.useRebuilt` app(`useRebuilt`) | §2.9 step 4 |
| `error.recoveryPartial` | "Recovered your town up to {time}. {n} later changes could not be replayed." | `button.downloadThem` app(`downloadUnreplayed`) | V9 §3.8 |
| `error.linkVersion` | "Made with {old}, shown with {new}; small differences are expected." | — | §6.4 |
| `success.applied` | "{change}." | `button.undo` app(`undo`) | every commit |
| `success.saved` | "Saved {file} ({size})." | — (J-V9.123) | V9 §3.10 |
| `success.restored` | "Went back to {name}." | `button.undoGoingBack` app(`undoGoingBack`) | V9 §3.9 |
| `bend.under.accessDug` | "Dug a way down from {building} so people can live there." | `button.useAnotherBuilding` commit(`alternatives`, each `button.digDownFrom`) — on the canvas the stepping button, while the dry run's `alternatives` holds a building not yet tried (V9 §4.17.4, SR-36); the list form, one per building where a card shows every alternative at once (V10 §3.16), `{building}` read at the card's reader's key — the canvas at the role's key, J-V9.86; the clerk at its session key (SR3-12 (e), J-V9.118) · `button.showWayIn` show(`created:access`) | V9 §4.17.4 (BCR-V9-22) |
| `bend.under.accessOpening` | "Opened a way down at {place} so people can live there." | `button.showWayIn` show(`created:access`) · `button.showWhy` why (steps 2 and 3 run only when no building qualifies, so no building is offered; SR-36) | V9 §4.17.4 |
| `bend.under.noAccess` | "Nobody can reach this cave yet, so the homes stand above it." | `button.addWayDown` tool(`place`/`access`) — T6's Below access mode on a chosen spot · `button.showWhy` why | V9 §4.17.4 (4): the dry run's bend onto ground part 0 (item 101 R2; SS-35; formerly `refuse.under.noAccess`) |
| `bend.catacomb.church` | "Churches keep crypts; catacombs lie under cemeteries. This is {church}'s crypt." | `button.startCatacomb` commit(`event:catacombUnder`) · `button.showCrypt` show(`crypt`) | V9 §4.17.5 (a) |
| `bend.catacomb.join` | "{town} may have {count} catacombs; this joins the Catacombs of {name}." | `button.showWhy` why | V9 §4.17.5 (b) |
| `bend.catacomb.charnel` | "{town} may have {count} catacombs; {ground} keeps a charnel vault instead." | `button.joinCatacombs` commit(`event:joinCatacomb`) | V9 §4.17.5 (b) |
| `bend.catacomb.belowTown` | "Catacombs come with towns; {ground} keeps a charnel vault." | `button.showWhy` why | V9 §4.17.5 (c) |
| `bend.catacomb.noGround` | "Catacombs lie under cemeteries; this is a vault." | `button.startItUnder` commit(`event:catacombUnder`) | V9 §4.17.5 (d) |
| `bend.crypt.cathedral` | "A cathedral always keeps its crypt, the largest in {town}." | `button.cryptSmallest` commit(`event:cryptSmallest`) | V9 §4.17.5 (e) |
| `bend.crypt.largest` | "The cathedral keeps the largest crypt; this one stops just short of it." | `button.cryptEnlarge` commit(`event:cryptEnlarge`) | V9 §4.17.5 (e) |
| `bend.ruin.axis` | "The old walls run on the ruin's own lines; your room turned {deg}° to follow them." | — | V04 §4.1's ruin chamber |
| `info.catacomb.stagnant` | V10 §3.9a's stagnation line (its text, single source; SS-16) | `button.showWhy` why | `CatacombComplex.blockedBy` non-empty |
| `info.catacomb.stopped` | V10 §3.9a's `stopped` state line | `button.showCemetery` show(`source`) | `blockedBy` holds `sourceClosed` |
| `info.catacomb.overCount` | V10 §3.9a's `overCount` count line | `button.showWhy` why | `CatacombComplex.overCount` |
| `info.catacomb.blocked.<cause>` | this volume's words, one per `blockedBy` value — V9 §4.17.5's "Over time" lines (`reach`, `wet`, `system`, `foundation`, `wallStrip`, `depth`; `rank` is V10 §3.9a's rank line) | — | `CatacombComplex.blockedBy` |
| `fate.catacomb.removed` | "The catacomb gives up {m2} m²; it will not dig here again." | `button.undo` app(`undo`) | a `delete` of catacomb galleries (J-V4.56) |
| `fate.access.lastWay` | "This was the last way into {place}; {n} households there leave." | `button.keepWayOpen` drop (withdraws the edit) | a `bricked`, `delete` or `seal` of a cluster's last access (V04 §4.3) |
| `info.under.deep` (formerly `why.under.deep`) | V10 §3.9a's sealed-deep-void line | — | a sealed void's `underground` section (item 109 (j) (5)) |
| `info.under.sealed` (formerly `why.under.sealed`) | V10 §3.9a's unexcavated line | `button.addWayDown` tool(`place`/`access`) | an `unexcavated` cluster (V04 §3.5.7 (g)) |
| `info.under.cause.<rule>` | this volume's words, one per `AccessCause.rule` — V9 §4.17.3's table | — | an access point's `underground` row |
| `why.section.<kind>` | a why section's title, one per section V10 §3.9 registers: `underground` "Below ground" · `crypt` "The crypt" · `raised` "Raised ways" · `massing` "Its shape" · `plan` "Inside" · `fabric` "The streets around it" · `island` "Shade from above" · `move` "Over time" | — | `WhyCardModel.sections[].title` (V9 §2.7) |
| `clerk.key.unchecked` | "Saved. The key will be checked when you are back online." | — | `setKey` returning `unchecked` (V9 §4.11) |
| `clerk.host.mark` | "{host}'s assistant (AI)" | — | a host proposal's card (V9 §4.11) |
| `clerk.defect.<kind>` | `previewMismatch` "The assistant's preview and the map's differed." · `badRequest` "The AI service turned down a request." · `placeholder` "A step of a proposal no longer matched the map." · `creationDigest` "A new town came out differently from its preview." | — | V10 §2.8's `DefectRecord.kind` (V9 §5.12) |
| `clerk.defects.none` | "No problems recorded." | — | an empty defect store (V9 §5.12) |
| `clerk.key.missing` | "The assistant needs your own key for the AI service." | `button.enterKey` app(`enterKey`) · `button.notNow` drop | the drawer's first opening (V9 §4.11) |
| `clerk.cap.warn` | "The assistant has used {share} of this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | V10 §3.18 |
| `clerk.cap.reached` | "The assistant has reached this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | the meter's foot line only (V9 §4.11; V10 §3.18); the drawer's refusal card at the cap is `refuse.clerk.budget` (V10 §3.16; SR-14) |
| `info.viewAs` | "Viewing as: {tier}." | `button.showEverything` app(`viewAsOff`) | V9 §4.8 |
| `info.viewAs.host` | "Turn off “See what the players see” to choose another view." | — | V9 §4.8 (the View as menu while a host's players' view is set; SR-06) |
| `info.copy.saved` | "Saved a copy to your computer as {file}; it does not follow {host}." | — | V9 §3.9's host-mode rule under `newDocuments: 'download'` (SR2-02) |
| `info.copy.rerunEdits` | "{n} later hand edits were not carried; they stay in this map." | — | the same, after a re-run (V9 §3.9) |
| `info.copy.condensed` | V6 §3.15.5's line, "history before year N was condensed; the copy starts at year N" (its text, single source, loaded from volume 6 as V9 §4.9's explanation paragraph loads volume 10's families; `{year}` for N) | — | `forkAt` or `rerunFrom` bent to the earliest seq before a rebase point (V6 §3.15.5, §4.4; J-V6.98): the copy's `forkedFrom.seq` above the seq asked (V9 §3.9's *Before a rebase point*; SR5-04) |
| `clerk.newMap.line` | "Describe the new town — this one stays as it is" | — | the drawer's Start a new map from this (V9 §4.11; SR2-13) |
| `history.group.party` | "The party" | — | the history panel's host group (V9 §4.10; SR2-01) |
| `history.dossierFacts.creation` | "Made from SettlementForge's record" | — | the history panel's creation head (V9 §4.10; SR-22) |
| `report.moved.<kind>` | one per `ReportEntry.kind` (§5.4): `place` "{element} now stands on {site}." · `reject` "{site} is marked as not for {element}; it stands elsewhere." · `lapse` "The mark keeping {element} off {site} has lapsed." · `open` "{use} opened on {to}." · `close` "{use} closed on {from}." · `relocate` "{use} moved from {from} to {to}." · `mutate` "{plot} was rebuilt for this change." · `disruption` "This change moved a few places nearby." · `disruption.over` "This change moved more places than its limit." · `rename` "{from} is now called {to}." · `works.start` "Work began on {works}." · `works.cancel` "Work on {works} stopped." · `works.finish` "Work on {works} is finished." | `button.show` show(`entry`) — the entry's element, use, plot or works | `ReportEntry.kind`, `disruption.overBudget`, `works.op` — the report panel's "What moved" and the history's report-entry lines (V9 §5.7, §4.10; SR-22; J-V9.109) |
| `report.dossier.<state>` | one per `GenerationReport.dossier` state (§5.4): `placed` "{element} stands on {site}." · `rejectedSite` "{site} is marked as not for {element}." · `blocked` "{element} can't stand on {site}; the closest places that suit it are marked." | `button.show` show(`entry`) — the element; for `blocked`, its `closest` sites marked | `GenerationReport.dossier[].state` — the report panel's placement state (V9 §5.7; SR-22; J-V9.109) |
| `success.deleted` | "Moved {town} to Recently deleted. It stays there for 30 days." | `button.undo` app(`restoreTown`) · `button.show` app(`showDeleted`) | V9 §5.12 |
| `bend.retaining.moved` | "The wall follows the step in the ground, {m} m off your line." | `button.keepMyLine` commit(`event:retainingFlat`) | V9 §4.20.1 (3) (a) |
| `bend.retaining.flat` | "The ground is flat here, so a terrace {h} m high goes on the {side}, with this wall on its edge." | `button.otherSide` commit(`event:retainingOtherSide`) | V9 §4.20.1 (3) (b) |
| `info.crossing.stair` · `info.crossing.ramp` | "{way} climbs the terrace by a stair." · "{way} climbs the terrace by a ramp." | `button.showWhy` why | the dry run's crossing form (item 110 (a)) |
| `bend.crossing.steep` | "Too steep for a ramp on a {class}; the stair stays." | `button.longerRamp` commit(`event:rampLonger`) | BCR-V9-33 |
| `bend.raised.clearance` | "The deck stays {m} m above {way} so carts can pass under." | — | BCR-V9-33 (the clearance bent up) |
| `bend.raised.end` | "A raised way comes down to the ground; its end moved {m} m to {place}." | — | V9 §4.20.2 (2) |
| `bend.raised.wall` | "The raised road comes down before the {wall} and passes through its gate." | `button.showWhy` why | BCR-V9-29 |
| `bend.wall.aqueductArch` | "The wall lets the aqueduct through by an arch." | — | BCR-V9-29 |
| `bend.aqueduct.source` | "Water runs downhill, so the aqueduct starts at {source}, {m} m higher." | `button.showWhy` why | V9 §4.20.2 (5) |
| `bend.aqueduct.terminal` | "Added a fountain where the aqueduct ends, on {place}." | — | V9 §4.20.2 (5) |
| `bend.aqueduct.uphill` | "No spring or river lies high enough within {km} km to feed {terminal}, so it has a well instead." | `button.showWhy` why | the dry run's bend to a well pin at the terminal (J-VI.4 (h); V9 §4.20.2 (5); SS-32) |
| `bend.raised.island` | "A road cannot reach a floating island; a hoist, rope line, stair or bridge of light can." | `button.roadToFoot` commit(`event:roadToFoot`) · `button.showWhy` why | the dry run's bend to `placeSkyAccess` (J-VI.4 (d); V05 §4.2; V9 §4.20.2 (6)) |
| `bend.aqueduct.island` | "An island's water is its own; the aqueduct ends here." | `button.showWhy` why | the dry run's bend to the last ground vertex outside the island (J-VI.4 (d); V05 §4.2) |
| `bend.raised.onIsland` | "An island carries no raised way; its bridges cross its river on their own decks." | `button.showWhy` why | the dry run's bend: `raised` dropped, the way on the island's ground (J-VI.4 (e); V05 §3.22 (3)) |
| `bend.aqueduct.onIsland` | "An island's water is its own; a fountain stands where the aqueduct would end." | `button.showWhy` why | the dry run's bend to a fountain pin at the stroke's end (J-VI.4 (e); V05 §4.2; SS-32) |
| `bend.retaining.rim` | "The rim walk stays level; the wall stands inside it." | `button.showWhy` why | the dry run's bend inward past the rim walk (J-VI.4 (g); V05 §3.22 (4); V9 §4.20.9; SS-32) |
| `bend.deck.full` | "The {deck} has no free plot there; placed it on {plot}." | `button.showWhy` why | V9 §4.20.4 (1) |
| `bend.deck.class` | "A {class} can't stand on a {deck}; placed it at the {deck}'s landward end." | `button.showWhy` why | volume 11's `deckOk` (V9 §4.20.4 (2)) |
| `bend.deck.floors` | "A {deck} carries at most {n} storeys." | — | V02 §4.6 (4) |
| `bend.tiers.count` | "Only {n} tiers fit on this base; made {n}." | — | V02 §4.6 (1) |
| `bend.tiers.step` | "A step that wide leaves no second tier; used {m} m, the widest that fits." | — | V02 §4.6 (1) |
| `bend.tiers.flights` | "A round stack takes its stairs straight up the front." | — | V02 §4.6 (1) |
| `bend.tier.height` | "The stair up this tier needs room on the terrace below." | — | V02 §4.6 (2) |
| `bend.stack.internalSolid` | "The lowest tier is solid, so the stairs can't go inside it." | `button.stairsFront` commit(`event:stairsAxial`) · `button.stairsFaces` commit(`event:stairsFlights`) | V02 §4.6 (1) |
| `bend.stack.removeStair` | "The stairs are how the tiers are reached; change them instead." | `button.stairsInside` commit(`event:stairsInternal`) · `button.changeStairs` tool(`shape`/`tiers`, subject: `building`) | V02 §4.6 (3) (J-V2.76) |
| `bend.stack.addWing` | "A stepped building has no room for towers or added wings." | `button.changeShape` tool(`shape`/`massing`, subject: `building`) | V02 §4.6 (3) (J-V2.73) |
| `bend.stack.deck` | "A deck can't carry a stepped building." | `button.plotsOnLand` show(`alternatives`) | V02 §4.6 (4) |
| `bend.stack.notStepped` | "{building} isn't built in tiers." | `button.giveTiers` commit(`event:giveTiers`) | V02 §4.6 (1) |
| `info.remove.holds` | "The town won't {rebuild \| raise} this {kind}; undo brings it back." | `button.undo` app(`undo`) | V6 §2.13's suppression; V05's removed slots (V9 §4.20.3) |
| `info.raised.count` | "{n} raised ways in {town}; the rules build up to {cap} by themselves." | — | V06's ledger (V9 §4.20.2 (8)) |
| `info.raised.walk` | "A walked way follows the ground." | — | V07's walk mode (V9 §4.20.2 (10)) |
| `disabled.onlyBelow` | "Tunnels are dug below the ground." | `button.switch` app(`switchLayer`, `layer` — the Below layer) | V9 §4.2 |
| `effect.added` | "The city raises a {kind}: {reason}." (and "{thing} is added" for other kinds) | `button.show` show(`targets`) | BCR-V9-27 `added` |
| `effect.route.detour` | "{route} now goes round by {way}, {m} m longer." | `button.show` show(`targets`) | `rerouted` |
| `effect.way.joined` | "{way} now meets {way2} at a crossing." | `button.show` show(`targets`) | `joined` |
| `effect.water.lost` | "{terminal} loses its water." | `button.show` show(`targets`) | `lost` |
| `effect.vault.removed` | "The arch vault under {way} goes, with what is in it." | `button.show` show(`targets`) | `removed` (critique-V4's C4-110-3) |
| `effect.plan.lost` | "{building}'s drawn plan goes with it." | `button.show` show(`targets`) | `removed` (critique-V3's V3C-73 (3)) |
| `effect.deck.ruined` | "{n} buildings on the {deck} fall with it." | `button.show` show(`targets`) | `removed` (item 110 (d)) |
| `effect.households.displaced` | "{n} households move to make room for {thing}." | `button.show` show(`targets`) | `displaced` |
| `effect.walls.rebuilt` | "{n} retaining walls are laid again along the new edge." | `button.show` show(`targets`) | `rebuilt` |
| `effect.stairs.relaid` | "The stairs of {building} are laid again." | `button.show` show(`targets`) | `rebuilt` (V02 §4.6 (2)) |
| `effect.raised.goes` | "{name}, a {kind}, goes: a town builds none by itself." | `button.keepAsYours` commit(`event:keepRaised`) | `removed` on a Re-derive to TOWN (V9 §4.20.3 (7)) |
| `effect.moved` | "{thing} moves {m} m." | `button.show` show(`targets`) | `moved` |
| `effect.more` | "and {n} other changes" | `button.show` app(`showEffects`) | `effectsMore` |
| `offer.raised.standing` | "The {n} raised ways standing stay; remove them too?" | `button.removeToo` commit(`event:removeStanding`) | V9 §4.14 |
| `import.removed` | "The rules would have built {kind} here; kept removed." | `button.show` show(`slot`) | BCR-V9-32 |
| `import.nothingToRemove` | "{kind} was removed in the original; the rules did not build it here." | — | BCR-V9-32 |

**The `button.*` rows** (one per wording, shared by every row that offers it; tone `info`; SR5-01; J-V9.121):
`button.putHereAnyway` "Put it here anyway" · `button.show` "Show" · `button.otherName` "Show a different name" ·
`button.otherNameHere` "Show a different name on this map" · `button.moveIt` "Move it" · `button.notHere` "Not here" ·
`button.placeElement` "Place {element} here" · `button.putAt` "Put it at {site}" · `button.unlock` "Unlock" ·
`button.unassign` "Remove the assignment" · `button.showWhy` "Show me why" · `button.chooseMarked` "Choose another of the
marked places" · `button.overBudget` "Put it there anyway ({n} moves)" · `button.keepBuilding` "Keep {building}" ·
`button.roleInstead` "Make it a {role2} instead" · `button.rebuildFrom` "Rebuild from {stage}" · `button.newPreview` "Show
the new preview" · `button.cityUp` "Make this town a city" · `button.showThem` "Show them" · `button.goBackTo` "Go back to
{time}" · `button.openCopy` "Open a copy from here" · `button.pictureInstead` "Save a picture instead" ·
`button.shareDevice` "Share it to another device" · `button.switch` "Switch" · `button.downloadFile` "Download file" ·
`button.reattach` "Re-attach" · `button.download` "Download" · `button.reload` "Reload" · `button.tryAgain` "Try again" ·
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
`button.changeStairs` "Change the stairs" · `button.changeShape` "Change the building's shape" · `button.plotsOnLand` "Show
plots on land" · `button.giveTiers` "Give it tiers" · `button.keepAsYours` "Keep it as yours" · `button.removeToo` "Remove
them too". A `ConflictAction`'s `msg` (BCR-V9-12) is keyed as the button that carries it: `unlock` → `button.unlock`,
`unassign` → `button.unassign`, `moveTo` → `button.putAt` (`{site}` its target's name). A slot a row's text does not fill
is filled from the entry the button carries (V9 §2.9's *Words*).

**The event forms** (`MsgButton.event`; a `commit` from `event` carries exactly these events, the canvas building them from
the draft and the row's `MsgRef`, and volume 10's `propose` the same bytes, T101-3; J-V9.121):

| form | the events it commits | its rule |
|---|---|---|
| `exactSite` | the draft re-mapped at the plot the user asked for, with "this plot only" (V10 §4.1's `where.plot`), its disruption taken as the preview lists it | file f item 582's exact site; V9 §4.5's T6 |
| `notHere` | `rejectSite` of the dossier-backed thing's site (T6's **Not here**) | V9 §4.3's T6 row; §7.2 |
| `firstFreeSite` | `placeAt { plot, designation }` on the first `SiteCandidate` with no `hardFails` of V9 §4.5's T6 `sites` query for the line's locus — nothing when none of the three is free | V9 §4.5's T6 row; XV-V9-19 |
| `rederive` | the declaration with a Re-derive from `{stage}` — §7.1's one resolution of `E_KEPT` and `E_LEVEL` — previewed as V9 §3.3's whole-town ghost | §7.1; V9 §3.3 |
| `cityUp` | `adjust` of T1's size to small city (T1's size chips) | V9 §4.5's T1 row; §7.8 |
| `unassignCreation` | `unassign` of the assignment the creation event made | §7.4's target rule; V9 §3.9 |
| `roomRole` | the draft re-mapped with the room's role `{role2}` (the smallest lawful split) | V03 §4 |
| `stairsAxial` · `stairsFlights` · `stairsInternal` | `tiers { stairs: 'axial' }`, `{ stairs: 'flights' }`, `{ stairs: 'internal' }` on the row's `building` (the stair chip) — `stairsInternal` nothing where tier 0 has no storeys | V9 §4.20.5 (1); V02 §4.6 |
| `giveTiers` | `setMassing { family: 'stepped' }` on `{building}` | V9 §4.20.5; V02 §4.6 (1) |
| `retainingFlat` | the drawn line's flat-ground form, a `terrace` whose edge carries the wall | V9 §4.20.1 (3) (b) |
| `retainingOtherSide` | the same form with the terrace on the other side of the line | V9 §4.20.1 (3) (b) |
| `rampLonger` | the crossing's ramp lengthened along the way to its class's grade — nothing where the way's run does not allow it | BCR-V9-33 |
| `roadToFoot` | the same sky access plus a ground `drawWay` of the stroke's class from its first point to the access's foot, one group | V9 §4.20.2 (6) |
| `catacombUnder` | the drawn chamber moved to the centroid of `{ground}`'s burial face (nearest by distance, ties by address), where V9 §4.17.5's ladder places it | V9 §4.17.5 (a), (d) |
| `joinCatacomb` | a `drawTunnel` from the charnel vault to the nearest element of the Catacombs of `{name}` | V9 §4.17.5 (b) |
| `cryptSmallest` | the cathedral's crypt kept at its smallest lawful size, `{m2}` m² — the bent result, accepted in words | V9 §4.17.5 (e) |
| `cryptEnlarge` | the two-event group enlarging the cathedral's crypt, then this crypt | V9 §4.17.5 (e) |
| `keepRaised` | one declared `drawWay { raised: true, class, widthCm, points }` along `{name}`'s course, in the Re-derive's group (the **Keep them as yours** checkbox for that way) | V9 §4.20.3 (7) |
| `removeStanding` | each standing generated raised way removed as V9 §4.20.3 (2), in one group | V9 §4.14; V9 §4.20.3 (6) |

**The application commands** (`MsgButton.command`; `app` buttons run them and never edit by themselves; none sits on a
row a dry run answers, T-V9-15):

| command | what it runs | where |
|---|---|---|
| `download` | the document's `.plat` to the device (ctrl / cmd+S's command) | V9 §4.13; V9 §3.14 |
| `reload` | reloads the page | V9 §3.14 |
| `retry` | the failed export again with its options | V9 §3.10 |
| `seeUpgrade` | the upgrade's diff (§2.9 step 3, §7.5) | V9 §3.14 (a) |
| `editWithVersion` | the `frozenImport` rebase | V9 §3.14 (b) |
| `copyCommand` | the replay command to the clipboard | V9 §3.14 (b) |
| `openRecipe` | the recipe and its log opened with this version | V9 §3.14 (c) |
| `keepSaved` · `useRebuilt` | §2.9 step 4's choice | V9 §3.14 |
| `downloadUnreplayed` | the changes recovery could not replay, as a file | V9 §3.8 |
| `undo` | `undo(h)` of the group the line names | V9 §3.9 |
| `undoGoingBack` | the matching redo group of a Go back to here | V9 §3.9 |
| `restoreTown` · `showDeleted` | Recently deleted's **Restore** of that town; the list | V9 §5.12 |
| `goBack` · `openCopy` | **Go back to here** and **Open a copy from here** at `{time}`'s seq | V9 §3.9 |
| `exportPicture` | the export dialog on its Picture tab (PNG) | V9 §5.10 |
| `share` | the share sheet | V9 §5.11 |
| `switchLayer` | the working layer set to the row's `layer` | V9 §4.2 |
| `reattach` | the orphan's re-attach pick | V9 §4.10 |
| `enterKey` | the key card | V9 §4.11 |
| `openSettings` | Settings' Assistant section | V9 §5.12 |
| `viewAsOff` | View as cleared | V9 §4.8 |
| `showEffects` | the fates sheet's **What else changes**, paged | V9 §5.5 |

The tool hints are §14's table's texts, keyed `hint.<tool>`; this volume adds `hint.variations` ("Three versions: pick one,
or ask for three more."), `hint.restore` ("Every change is saved. Step back to any point here."), `hint.links` ("Lines
show who buys from whom. Click one to change it."), `hint.shade` ("Darker streets spend more of the day in shade.") and
`hint.clerk` ("Ask for a walled harbour town with a temple quarter."), `hint.raised` ("A raised way crosses what is
below without meeting it; its ends come down by stairs or ramps.", the first time Raised is turned on) and `hint.below`
("Click again to pick what's underneath.", the first time a click lands on a stack of more than one mark), each recorded
in `AppPrefs.hintsDone`. Every `host.*` key volume 8 names is a row of the same file, its text volume 8's (V08 §13 X12:
§4.2's controls and undo words, §5.1's strips and banner rows, `host.locked`, the port's notes, V08 §4.6's history lines —
`HostSlots.historyLines`' texts, V9 §4.10 — and the draft mirror's discard notice; SR2-18).

**The explanation and assistant keys — one text each (SS-16; CVR-V10-4; J-V9.79).** The same file carries the key
families volume 10 renders, so the drawer, the why card and the panels draw one sentence per key. Their `en` texts are
written once, in the volume 10 section named, and loaded into `messages/en.json` from there; this volume does not restate
them:

| family | one key per | its `en` text is written in |
|---|---|---|
| `critique.K1` – `critique.K18` | critique row | V10 §3.10's template column |
| `refuse.clerk.<category>` (with `refuse.clerk.key.<keyState>` for the `key` row's three sentences and `refuse.clerk.dossier.count` for the `dossier` row's count sentence) and `refuse.clerk.opsDevice` | one key per `RefusalCategory` value whose V10 §3.16 row words the refusal itself — every value but `lock`, `rule` and `role`, whose cards render the engine's `refuse.*` row for the code — `refuse.viewer` for `role` (SS-28; CVR-V10-17; SR4-04 (e)) | V10 §3.16's table; V10 §2.10 |
| `clerk.notice` | — | V10 §3.20's data notice |
| `clerk.alt.*` | each key V10 §5.4's list of the drawer's keys names (*The keys of the drawer's words*): each alternative of a V10 §3.16 row (`clerk.alt.<category>.<n>`, `<n>` its position in its row), the help route's tool button, the history buttons, a critique finding's fix and the stale card's **Ask again** (`clerk.alt.stale.retry`) — so every `ClerkAction` `label` that is not a `button.*` row's words has its key (SR4-02; SR5-07 (b)) | V10 §3.16's alternatives column; for the other keys, the V10 sections V10 §5.4's list cites |
| `clerk.view.cleared` | — | V10 §3.12 (6)'s line when the view's key changes (SR4-04 (b)) |
| `clerk.applied` | — | V10 §4.4's applied card line (SR4-04 (b)) |
| `info.raised.<outcome>` | each of the `raised` section's ten outcomes (`built`, `declared`, `carried`, `belowCity`, `reasonNotMet`, `noCourse`, `chance`, `cap`, `suppressed`, `waited`) | V10 §3.9's outcome table (this volume's `info.raised.count` and `.walk` above are its own badge lines, not outcomes) |
| `info.under.*` | each `underground` row of V10 §3.9a — the ruin rows, `LinkCause`, the excavation reading, the dwellings line, `deep`, `sealed` | V10 §3.9a — except `info.under.cause.<rule>`, whose words are this volume's (V9 §4.17.3), because V10 §3.9a names the causes without words |
| `info.catacomb.*` | each value of `CatacombComplex.source.kind`, the rank and count lines, each state, and each burial-face outcome of `catacombOutcome` (`holds`, `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`) | V10 §3.9a — except `info.catacomb.blocked.<cause>`, whose words are this volume's (V9 §4.17.5), for the same reason |
| `info.crypt.*` | the `crypt` section's rows: presence, area and form (full, half, raised-choir, the rim vault), rank, the crypt join, no crypt (dry and wet ground) | V10 §3.9a's `crypt` table |
| `kind.<registry kind>` | each kind of `clerk.content.withheldWords` | V10 §2.10's `content.withheldWords` row |

A shipped locale carries every key of every family (T-V9-15, T-V10-29). The quoted panel lines of V9 §4.17 and §4.20.6
name the row each place shows; where a quotation there and the owning volume's text differ, the owning volume's text is the
one shipped.

### 4.10 The history panel — every change in plain words, restore points, orphans

The history panel (V9 §5.6) lists `HistoryRow`s (V9 §2.8), newest first, grouped by day, with the time where the journal
has it. Each row's text comes from a template keyed by the event kind (and, for `setAttr` and `convert`, by the path or the
op, and for item 110's variants by the discriminating field — `drawWall.retaining`, `drawWay.raised`,
`drawWay.aqueduct`, `terrace`, `setAttr.spans/use`, `setMassing.tiers`), filled from the event and its touched set:

| event | template |
|---|---|
| `quarter` | "Painted the {kind} quarter {name} ({plots} plots)" |
| `drawBoundary` | "Reshaped the edge of {district}" |
| `placeAt`, `assign` | "Placed {name} ({class})" · "Asked for {name} {locus}" |
| `roster` | "Placed {n} places from a list" |
| `drawWay`, `drawWall`, `placeGate` | "Drew a {class} ({m} m)" · "Built a wall ({m} m, {gates} gates)" · "Added a gate to {wall}" |
| `drawWall.retaining` · `terrace` | "Built a retaining wall along {place} ({m} m, steps {a}–{b} m)" · "Levelled {area} m² at {level} m, with {n} retaining walls" |
| `drawWay.raised` · `drawWay.aqueduct` | "Raised a {kind} from {a} to {b} ({m} m, {n} arches)" · "Brought water from {source} to {terminal} ({m} m)" |
| `setAttr.spans/use` · `setAttr.crossings/form` · a raised way's `clearanceCm` or `spanSpacingCm` | "Walled up an arch of {way} as a vault" or "Opened an arch of {way}" · "{way} now crosses {wall} by a {stair \| ramp}" · "Changed the deck height of {way}" · "Changed the arch spacing of {way}" |
| `setMassing.tiers` | "Gave {building} {n} tiers" (the count); "Changed the tiers of {building}" (the step, the stairs or the top) |
| `delete` of generated content that suppresses (V9 §4.20.3) | "Removed the {kind} {name}; the town won't {rebuild \| raise} it" |
| `setField` | "Raised the ground near {place}" (lower, cliff, flatten) · "Made {place} denser" (greener, richer, poorer) |
| `warp`, `drawWater`, `moveCourseKnot` | "Warped the streets near {place}" · "Made a lake" · "Drew the river {name}" · "Moved the course of {river}" |
| `fill` | "Filled {scope} with {arrangement}" |
| `split`, `join`, `merge`, `moveFootprint`, `setEntrance`, `paint` | "Split {plot}" · "Joined {n} plots" · "Merged {a} into {b}" · "Moved {building}" · "Moved the door of {building}" · "Painted {n} roofs {colour}" |
| `setAttr` | "Changed {field} of {thing}" (the field's catalogue label) |
| `lock`, `pin`, `revert` | "Locked {thing}" · "Pinned {thing}" · "Reset {thing} to generated" |
| `regenerate`, `rerollLayer` | "Tried again: {scope}" · "Rebuilt {scope} as generated" · "New names for {scope}" · "New trees" · "New emblem" · "New compass" · "New decoration" — New decoration's group is one row: its `style.jitter` event carries the words and its `style.crowns` event is drawn in that row, not on its own, **Undo this** undoing the group (SR2-26) |
| `setStyle`, `paintGround`, `placeLight` | "Restyled the map ({preset})" · "Painted ground texture" · "Placed a {kind}" |
| `convert` | "{thing}: {op in words}" ("The Old Mill: abandoned") |
| an `undo` group from "Go back to here" | one row "Went back to {name}", its undone targets shown struck through beneath it |
| `epoch` | V06's chronicle line for the epoch; its `lines` one `info.raised.suppressed` line (`{w}` the removal's week) per entry of the epoch report's `raised.suppressedFired` — a raised-way reason that fired at a slot a live removal holds (XV-V9-28; J-V9.113) — its target the removed thing, shown as its former outline (BCR-V9-34); V08 §4.6 item 3 |
| `dossierFacts` of an absorb (SR-22) | the head of the absorb's group (V08 §4.6): `host.group.absorb` ("{n} changes from SettlementForge, week {week}") with `{n}` the event's `changes` count and `{week}` the week of the `absorbed` entry its fold appends (V08 §3.6 step 4), `host.group.absorbUndated` when that week is null; its `lines` the event's `notes`, each `msg` rendered by the catalogue (V08 §4.6's `host.note.<kind>` rows) and its `keys` resolved to addresses as `targets` (BCR-V9-36), a line dropped when the view's effective key (V9 §2.10) does not admit a target |
| `dossierFacts` opening a creation's prefix (SR-22) | "Made from SettlementForge's record" (`history.dossierFacts.creation`), heading the prefix's events; its `lines` the event's notes, as the absorb's |
| a dossier event | "SettlementForge: {reason}", drawn in its group under the head (below); its `lines` the §5.4 `changes` entries whose `seq` is the event's, each by its `report.moved.<kind>` row (V9 §4.9; V9 §5.7's "What moved"), **Show** on the entry's element, use, plot or works |
| any event with `proposedBy: 'clerk'` | the kind's template prefixed by the AI mark: "Assistant: {summary}" |
| `drawTunnel`, `drawChamber`, `addLink`, `placeAccess`, `addUndergroundAccess` | "Dug a tunnel ({m} m)" · "Dug a chamber in {system}" · "Started {system}" (a `newKind`) · "Joined {a} to {b} underground" · "Opened a way down at {place}" · "Added a way down from {building}" |
| `editTable` on the siting tables | "Changed how {kind}s are placed" · "Kept {consumer}'s supplier of {good}" · "Cut {consumer}'s link to {provider}" · "Kept {institution} on one plot" |
| `upgrade` · `rebase` (by its reason) | "Updated the town to {to}" · "Kept the saved town" (`keptSnapshot`) · "Rebuilt around your drawings" (`drawnConstraintsRebuilt`) · "Took the town into {version}; before this it can't be rebuilt from its seed" (`frozenImport`; V9 §3.14 (b)) — keys `history.upgrade`, `history.rebase.<reason>` |
| every other kind of the base and of volumes 1–8 | its own template, keyed `history.<kind>` (and `history.convert.<op>`, `history.setAttr.<path>` where the op or path changes the words): "Advanced the town {n} years", "Made the manor an H", "Moved the tower of {building}", "Planted {n} trees", "Allowed {thing} here again", "Split {way}" … — each written with its kind; T-V9-15's walker over the `EditEvent` union of the base and the volumes fails the build on a kind without one (no fallback prints a code) |

**Controls.** Each row: **Show** (pans and highlights its targets), **Undo this** (owner role: `undo(h, of)`, subject to
independence — a dependent later event makes the refusal card list it), **Go back to here**, **Open a copy from here** and,
where epochs or dossier events follow it, **Re-run from here** (V9 §3.9). A removal row adds **Show** as its former
outline, dashed while hovered, and — where Undo this is refused as dependent — **Build it again** (V9 §4.20.3 (4); the same
function the clerk slot receives as `ClerkMount.rebuildEvents`, V9 §2.10). In host mode the copy and re-run controls follow
`HostSlots.newDocuments` (V9 §3.9). The panel's head: **Mark this moment** (a named restore point), the restore points as a
strip of named chips (auto
points in a lighter tone), **Export skeleton**, and the filters "All · Mine · Assistant · SettlementForge · Over time".
Undone rows are shown struck through and greyed with "Redo" on the latest one. A non-undoable row shows its reason on hover
from the catalogue ("This is where the town began", "From SettlementForge"). **Orphans.** The document's orphan table
(§7.3 item 4) is the panel's last section, "Changes that lost their target": each row names the edit and what it was
attached to, with **Re-attach**: the user picks a new target on the map, and the app sends the same event kind with the new
target (a new, ordinary event; the orphan stays listed until the user dismisses it). **Chronicle.** When the document has
epochs (V06), a second tab "Chronicle" shows V06 §5.1's chronicle; its rows scrub the timeline bar (V06), and each row
carries **Open a copy from here** and **Re-run from here** (V9 §3.9).

**The dossier groups** (SR-22; V08 §4.6; J-V9.107). A `dossierFacts` event heads a group: itself and the events after
it in the log whose session is the port's reserved `host:port` (V08 §3.6 step 6; BCR-V8-19), up to the next
`dossierFacts` event or the first event of another session — the port commits an absorb, or a creation's prefix, in one
run, so its events are contiguous, and they carry no `group` (V08 §3.6 step 6); each row of the group has `dossierGroup`
set to the head's `seq`. The head is the absorb's (`host.group.absorb` or `.absorbUndated`) or, when the `dossierFacts`
event is the log's first (a creation's prefix opens with it, V08 §3.6 step 4), the creation's ("Made from SettlementForge's
record"). Under the head, in V08 §4.6's order: (1) the group's events other than epochs, in log order, each by its
template — a dossier event followed by its report-entry lines; (2) the head's note lines; (3) the group's `epoch` rows
(V06's chronicle line with its `lines`, V08 §4.6 item 3). The head
toggles its group open and closed — the newest group open, the rest closed, a per-viewer convenience never stored — and
its **Show** highlights every target of its rows and lines; the members keep the row controls above as `undoable` and V9
§3.9 allow them (a dossier row is not undoable: "From SettlementForge"). A group is listed under the **All** and
**SettlementForge** filters; under **Over time** its epoch rows are listed on their own; never under **Mine** or
**Assistant**. **Note lines.** Each note of the head event's `notes` is one line: its `msg` rendered by the catalogue
(V08 §4.6's `host.note.<kind>` rows, loaded into `messages/en.json` as V9 §4.9 states), its `targets` the addresses its
`keys` bind, each read by `query({ kind: 'entity', dossierKey: key }, { admitAs: effectiveKey() })` (BCR-V9-36; V9 §2.7's
band-less rule) — a key no binding row holds adds no target; a line any of whose answers is `withheld` is not drawn
(§11.2 *Knowledge*; V08 §4.6 item 2), and the answers are re-read when `onEffectiveKey` fires. **Report-entry lines.** A
dossier event's lines are the entries of `report(h)`'s `changes` (§5.4) whose `seq` is the event's, each by its
`report.moved.<kind>` row (V9 §4.9) with its addresses as `{ id }` arguments, rendered under `effectiveKey()` by V9
§2.7's band-less rule — each an `entity` read with that key as `admitAs`, a withheld address shown as its `kind.<registry
kind>` word (V9 §4.9) — and re-rendered when `onEffectiveKey` fires, never at the role's key (SR2-27; J-V9.116); its
element, use, plot or works are its `targets`, a withheld one left out, and the line itself is drawn. The standing notes are the report panel's, not
the history's (V9 §5.7; V08 §4.6).

**The host's lines** (SR2-01; J-SS2.2; J-V9.91). In host mode with `HostSlots.historyLines` set, the panel draws the host's
lines as one group at the head of the list, titled `history.group.party` ("The party"), under the **All** and
**SettlementForge** filters only, newest first by `at`: each line its `text` (a `host.*` row in volume 8's words —
"Revealed to the party: the Tanners' Hall", the time the party pictures were last drawn) with its time, and **Show** when
its `targets` are not empty. A host line is not an event: it has no **Undo this**, **Go back to here**, copy or re-run
control and is never struck through — its undo is the host's own "Hide again" or "Reveal again" in the header (V08 §4.2).
The shell never persists the lines: it calls `list(effectiveKey())` (V9 §2.2, §2.10) each time it draws the group, and
re-lists them, with `effectiveKey()`, on each `onChange` and each `onEffectiveKey` — so a View as change, or a host's players'
view set or cleared, re-draws the group at the new key as every other panel is (V9 §2.7), the provider naming and
targeting only the places that key admits (SR2-23; J-V9.114); the group is absent when the slot is unset or its list is
empty. The log's rows, filters and undo are untouched by it (V9 §2.8).

### 4.11 The clerk's view — the drawer (the clerk itself is volume 10's)

* **Off until opened; always labelled; three cards the first time** (J-V9.35). The top bar's **Assistant (AI)** button —
  shown when `ShellConfig.clerk` is set and, in host mode, when `HostSlots.clerkMode` is `builtin` — opens the drawer. Its
  first opening shows three cards in this order, each with **Not now**, which returns to the map with the clerk off:
  1. the **AI label**: "This assistant uses AI to suggest changes. It only proposes — you decide. It sees what you can see
     of this town." — **Continue**;
  2. the **data notice**: V10 §3.20's notice, shown as volume 10 writes it — **I agree** writes `ClerkSettings.consent`
     with the notice's version;
  3. the **key** (configuration A only; skipped under a host's proxy, B): a masked field "Your key for the AI service", a
     checkbox "Remember on this device" with V10's warning beneath it ("Anything running on this site can read a
     remembered key."), **Save** (`ClerkHandle.setKey`, which checks the key before storing it) and a link "How to get a key"
     to its help page. The verdict shows on the card (SS-08): `ok` closes it; `invalid`, `noCredit` or `noAccess` shows the
     matching sentence of V10 §3.16's `key` row under the field (`refuse.clerk.key.<keyState>`), and the field stays for
     another try; `unchecked` (offline) shows `clerk.key.unchecked` and closes it.
  Then `enabled` is set and the drawer opens. The map, every tool and every export work fully without it (R19).
* **Layout.** Wide: a 400 px drawer on the right, over the context panel (the panel returns when the drawer closes);
  medium: a full-height sheet; narrow: full screen with the map as a strip above. A text box with three suggested prompts
  under it ("A walled harbour town with a temple quarter", "Why is the tannery here?", "Check my plan for mistakes");
  **Paste a list** sends the text on V10's roster entry. The drawer's menu holds **New topic** (`ClerkHandle.newTopic`: the
  next message starts a fresh conversation on its route, V10 §3.2; the earlier one stays in the transcript), **How do I
  …?** (below; SR-12), **What the assistant sees**, **Copy conversation**, **Save these changes as a skeleton** (below;
  SS-08) and, standalone only, **Start a new map from this** (below; SR2-13).
* **Turns** — the drawer renders V10 §2.6's `TurnView` stream as V10 §5.4 gives its meaning (J-V9.34): the user's words;
  while the turn runs, its `progress` lines with **Stop**; then the `reply` blocks in order — `text` as prose; `entity` as a
  link chip with the name (or the kind, when withheld) and its tier chip, which selects the thing on the map (hover
  highlights it); `unverified` in the muted tone with "not found on the map"; `action` as V10 §5.4 words it — a button worded by
  its `label`, a `select` without one as its ids' chips (J-V10.100; SR4-05 (a)) — running its `ClerkAction` — and under the
  turn its cost in muted text ("about $0.04").
* **The actions** a button runs follow V10 §2.6's dispatch table, each worded by its `label` (V10 §5.4; SR4-02): the
  application runs `select` → the ids selected on the map; `why` → the why card of its `id` (V9 §5.8), else the Help page
  `page` (V9 §5.9) — what the canvas's **Show me why** opens for that row (V9 §3.3, §4.9; SR4-01); `openSettings` → the settings' Assistant section; `useTool` → that tool active in the action's `mode` (else as last
  used) on that mode's working layer (V9 §4.2), its `ids` selected first (SR5-07 (a); V9 §4.5's mode ids); `export` →
  the export dialog on that format; `fork` → "Open a copy from here" (`forkAt`); `rerun` → "Re-run from here" (`rerunFrom`,
  V9 §3.9) — below a rebase point at the earliest seq with `info.copy.condensed` (V9 §3.9's *Before a rebase point*;
  SR5-04), in host mode by `HostSlots.newDocuments`, the copy saved to the device or the button not drawn (V9 §3.9;
  SR2-02); every other kind goes to `ClerkHandle.run` — `propose` (its events previewed as a ghost, then Accept like any
  proposal), `undo` (the accepted group's undo) and `rebuild` (**Put it back**, V10 §4.3, its events those of
  `ClerkMount.rebuildEvents`, V9 §2.10; SR2-14).
* **Proposal cards** (`ProposalView`): the AI mark, the reason line, the active variation's counts, bends, fates, renames
  and findings, its effects under **What else changes** drawn as the fates sheet draws them (V9 §4.20.7; XV-V9-11), a
  removal's `info.remove.holds` line, the variation chips with V10's labels and thumbnails (each variation its own preview, V9 §3.6); **Accept**
  (Enter) → `ClerkHandle.accept`; **Accept these lines** (a roster's cards) → `acceptLines`; **Try again** → `retry`;
  **Drop** → `drop`; **Why** → the why card of what the proposal makes; once accepted, **Undo**, and on a removal no longer
  the latest group **Put it back** (`rebuild`), each worded by its label (V10 §2.6's card buttons). Focusing a chip calls
  `focus` and draws that variation's ghost; one proposal's ghost shows at a time. A proposal whose town moved on shows
  `refuse.stale` with its row's buttons (**Show the new preview**, the card's `focus`; **Show me why**; V9 §4.9) and
  **Ask again** (V10 §3.11; V10 §2.6: its `retry`, worded `clerk.alt.stale.retry`; SR4-04 (a); SR5-01).
* **Refusals** (`RefusalView`): the refusal card with its text and each action as a button worded by its `label`, a
  `select` without one as its ids' chips (V10 §5.4).
* **The card-only drawer — a host's proposal** (SS-06; V10 §3.17; V08 §4.4 (3)). In host mode with `clerkMode` `off` or
  `host` the clerk slot is of kind `host` (V9 §2.2): no Assistant button shows and nothing is sent to a model from the
  frame. A `TurnView` whose proposal has `source: 'host'` arriving on `turns` (the harness takes it from
  `ClerkMount.host.proposals`, V9 §2.10) opens the drawer, in the layouts above, in its **card-only mode**: that proposal
  card alone — its AI mark `clerk.host.mark` naming the host's assistant (`HostSlots.hostName`), the reason line, the
  variation chips, counts, bends, fates, renames, findings and **What else changes**, and **Accept**, **Drop** and **Why**
  — with no message box, suggested prompts, first-opening cards, menu, settings or meter, and no **Try again** (the host's
  assistant re-proposes on its side). **Accept** → `ClerkHandle.accept` (V10 §4.2); **Drop** → `drop`; the harness answers
  the host through `ClerkMount.host.answer`; the drawer closes on either. A newer host proposal replaces the card; a moved
  town shows `refuse.stale` with its row's buttons (V10 §3.11) and without **Ask again**, since a host's card offers no
  `retry` (V10 §2.6). A viewer
  never receives one (§11.2 refuses a viewer's `preview`). With `clerkMode`
  `builtin` a host proposal is drawn in the full drawer as a turn with no user words (V10 §2.6).
* **The creation preview** (V10 §3.11 (3), §5.1). While a creation proposal waits, the map region shows the active
  variation's scratch document read-only (`ClerkMount.showScratch`) under a banner across the map's top, "Preview — not
  your map yet", with the variation chips, **Accept** and **Back to my town**; the tools are disabled while it shows.
  Accept follows V10 §4.2 (3): when the current town is the untouched empty-state town the view moves to the new town (the
  old one stays in Recent towns); otherwise the new document opens beside the current one (`ClerkMount.openNewDocument`: a
  new tab of the app and a Recent entry) and a toast names it. In host mode `openNewDocument` follows
  `HostSlots.newDocuments` (V9 §3.9), though no creation proposal arises there (below).
* **The meter.** The drawer's foot reads "This month: about ${usd} of ${cap}" from `ClerkHandle.usage()`; past V10's
  `warnShare` the line takes the bend tone (`clerk.cap.warn`); at the cap `clerk.cap.reached` shows and the message box is
  disabled until the month turns or the user raises the cap.
* **Asking why.** The why card's **Ask the assistant** (V9 §5.8; hidden when no clerk is enabled) sends the question on
  V10's `why` entry with the fetched `WhyAnswer` attached, and opens the drawer.
* **Asking how, and handing over a list** (SR-12; J-V9.89). **How do I …?** — in the drawer's menu and in Help (V9
  §5.9), shown only when a clerk is configured and on — opens the drawer with its message box on V10's `help` entry, the
  box's placeholder reading "How do I …?"; the question goes by `ClerkHandle.send(question, 'help')`, and the answer's
  closing `useTool` action (V10 §3.1) is drawn as its button, worded by its `label` (`clerk.alt.help.useTool`, V10
  §5.4), which runs by V10 §2.6's dispatch table — that tool
  active with its options strip; the next message returns to the `drawer` entry. **Ask the assistant to place these**
  — under T7's paste box (V9 §4.5), shown only when a clerk is configured and on — sends the pasted text on V10's
  `roster` entry (`ClerkHandle.send` with entry `'roster'` and the text attached as `roster`), exactly as the drawer's
  **Paste a list** does, and opens the drawer. With no clerk, or the clerk off, neither control shows.
* **Starting a new map from this** (SR2-13; J-SS2.4; J-V9.93). **Start a new map from this** — in the drawer's menu,
  standalone only — puts the message box in creation mode for its next message: the line `clerk.newMap.line` ("Describe the
  new town — this one stays as it is") shows above the box, and the message goes by `ClerkHandle.send(text, 'drawer',
  { newMap: true })`, which V10 §3.1 (4) reads as the user's choice of creation mode (XV-V9-22). Its proposal previews as a
  creation proposal under the banner (above), and **Accept** opens the new document beside the current one
  (`ClerkMount.openNewDocument`), since the current town is not the untouched empty-state town. Esc, or the item again,
  returns the box to its ordinary mode; after the message is sent it returns by itself. **In host mode** the item is hidden
  and **no turn enters creation mode**: the frame's document is the host's and is never the empty-state town (V9 §3.2 is
  standalone's route (d)), so V10 §3.1 (4)'s first condition is standalone's (XV-V9-22), and new documents follow V9
  §3.9's host rule.
* **Knowledge and roles.** The session reads under the view's role and under "View as" (V9 §4.8), the effective key the
  harness takes from `ClerkMount.effectiveKey` (V9 §2.10): a viewer's drawer reads
  and asks why but receives no proposal, its declarations answered by `refuse.viewer` (V10 §3.16); a change of the
  effective key clears the conversation by V10 §3.12 (6), the drawer showing `clerk.view.cleared` (SR4-04 (b)).
* **Apply-then-undo** is V10 §4.4's setting (the user's `ClerkSettings.applyMode`, off by default): the drawer draws an
  applied card as V10 §4.4 states it, its line `clerk.applied` with the other variations as chips, and every case V10 §4.4 never
  applies arrives as a preview (SS-22).
* **Saving.** **Save these changes as a skeleton** (edit mode: the document's own skeleton, which holds the accepted
  declarations, V10 §3.15; creation mode: the transcript's skeleton, V10 §5.3); **Copy conversation** (its text to the
  clipboard); "Assistant conversation (JSON)" in the export dialog (V9 §5.10). The conversation is kept as V10 §2.7 rules:
  in memory by default, in the device store while the user's "Keep history" is on (J-V9.10 as amended by J-V9.34).
  **What the assistant sees** (the drawer's menu) opens V10 §5.4's read-only view of what was sent, as volume 10 defines
  it (SS-23).

### 4.12 Touch, pen and small screens — decided

The evidence is thin (`research/ux/tool-survey.md` §6: MFCG's maker says it is not designed for small touchscreens; FTG's
editor is large-screen only; watabou's other tools open the context menu on a long press). The decision (J-V9.9), with
§13.4's first-five-minutes sessions confirming it:

* **Layout classes** (V9 §2.2): **wide** (≥ 1024 CSS px) and **medium** (600–1023 px, and ≥ 480 px high) get every tool;
  **narrow** (< 600 px wide, or < 480 px high — a phone in either orientation) is a **viewer with light edits**: the map,
  the gazetteer and "features in view", layers and thematic views, "View as", the history panel (restore and copy), T1,
  T5 (seed and click-inside only), T6, T7, T10, T11, T12 (style, tint, furniture, light), every export, share and the
  clerk drawer. T2, T3, T4, T8, warps and T9's geometry drags are not offered on narrow — their rail slots show the tool
  greyed with the `refuse.phone` line — while T9's Shape tab forms (storeys, roof, class) work. The tables editor and the
  advanced panel are read-only lists on narrow.
* **Gestures under a coarse pointer** — tap = click; long press (500 ms, no movement beyond 8 px) = the context menu
  (right-click); two-finger drag = pan; pinch = zoom; one-finger drag on empty map = pan when no drawing tool is active,
  and draws when one is; **free placement** (Alt) = a second finger held anywhere while the first draws; double-tap = zoom
  to the thing's band (double-click); the pointer idioms that need a modifier (shift+click New random, ctrl / cmd+click
  reset, alt+click lock) are the context panel's buttons. Hit targets and handles are at least 44 × 44 CSS px, the snap
  radius 22 px (V9 §3.4). Tooltips appear on a long press on a control.
* **The hit stack by touch** (V9 §4.20.8). A tap on the selected thing where the stack holds more selects the next one
  down, as a click does, and the long-press menu lists **Select below: {name}**. On narrow, a raised way, a span, a deck
  plot and a stepped building can be selected, named (T11) and deleted with V9 §4.20.3's pending card; they cannot be drawn
  there (T2, T3 and T4 are not offered).
* **Pen** is a fine pointer; pressure is not read (a brush's strength is its slider's, so a replayed stroke never depends on
  a device), and the barrel button is right-click.
* **The fallback** (§13.4): if tablet participants fail where pointer users pass, `AppPrefs.touch.editFabric` defaults to
  false for coarse pointers, hiding L3–L4 geometry edits (T8, T9's drags) on touch, and the guide says so.
* **The cursor sun** (§8.4): with no pointer hovering, the sun is the sheet's fixed sun (§1.2); on touch, a one-finger drag
  with the Light chip held in the view bar moves the sun (a view input, never logged).

### 4.13 The keyboard

`keymap.json` (§14) keeps every base binding (A, B, D, N, L, T, M, W then 1–8, G, F, R, Esc, ctrl / cmd+Z, shift+Z, + / −,
0, ?) and adds these rows (each also on a menu or button): **1–9** pick T1–T9 (outside a warp session; T10–T12 by the rail
or their keys below); **alt+Enter** toggles the selection's lock (T10); **F2** renames the selection (T11); **S** opens the
dress panel (T12); **Enter** accepts the pending ghost or the focused variation — and only when neither is pending keeps MFCG's idiom: in the
empty state a new town replaces the untouched one, after a declaration Same kind, new seed opens a new document beside it
(V9 §3.2; a toast names the town left in Recent); **[** and **]** cycle variations; **Tab** /
shift+Tab cycle a selection's handles, then the arrow keys move the focused handle by 1 m (shift: 10 m) and Enter commits;
**Delete** / Backspace deletes the selection — previewed, committing at once only when nothing beyond the thing itself
changes, else the pending card with Accept (V9 §4.20.3) — (a dossier-backed thing: "Not here", `rejectSite`); **H** the history panel;
**E** the export dialog; **ctrl / cmd+S** downloads a copy of the `.plat`; **ctrl / cmd+O** opens a town; **Space** held
pans with the pointer; **X** opens the clerk drawer when a clerk is configured; **M** is the base's ruler (V9 §4.19); **PageUp** /
**PageDown** step the underground band while Below is active (V04's BCR-10), and while a T4 stroke is drawn on Ground turn
Raised on and off for that stroke (V9 §4.20.2); **Shift+F10** and the Menu key open the
context menu on the selection (V9 §4.4). Bindings fire only while the map region has
focus (§14); a text field's focus suspends them; a user's rebinding is an `AppPrefs.keymapOverrides` row (§14).

### 4.14 The advanced panel, the tables editor and the presets dialog

* **Advanced panel** — every parameter of §7.8's registry (≈ 200), grouped by consuming stage ("Site", "Programme",
  "Streets", "Districts", "Plots", "Buildings", "Greenery", "Names", "Look"), with a search box. Each row: label, value
  with its unit, range, the **layer that set it** (§7.6: "default", "preset", "your preferences", "this town",
  "SettlementForge"), the locality badge ("changes nearby" for a local control, "rebuilds from {stage}" otherwise), and its
  help link. A change is `adjust`; a Re-derive shows the fates sheet first with an auto restore point (V9 §2.8). The
  "Streets" group adds the row **Raised ways the town builds by itself: as the rules say · none** (item 110 (b)): "none"
  is one `editTable` setting this document's rows of volume 11's `raisedWays` table to chance 0, previewed; its dry run
  says `offer.raised.standing` ("The {n} raised ways standing stay; remove them too?") with **Remove them too**, a grouped
  `delete` of each generated one, each suppressed (V9 §4.20.3). "as the rules say" deletes the override rows. The row is
  on medium and wide, read-only on narrow.
* **Tables editor** — the rule tables of §7.6, listed by group; a table opens as a grid of keyed rows (virtualised); a cell
  editor typed by the table's schema (unit, range, enumeration); per cell the provenance (source, date, note) and a chip
  "as MFCG does", "as FTG does" or "ours" read from the cell's `provenance.source` and `extension` marker (item 23). An edit
  is an `editTable` event previewed first (its re-derivations and, for the fallback, its fates, §7.6); **Reset row** removes
  the override; the **orphans** list shows overrides whose base row changed in a newer table version, old base, new base and
  the user's value side by side (§7.6), with Keep mine / Take new. **Export overrides** writes the row operations as JSON.
* **Presets dialog** — pick a preset (the parity presets `MFCG` and `FTG` among them, §7.6); **Save these settings as a
  preset** is `editPreset`.
* **"Apply my current preferences"** (settings, §7.6) sends one `adjust` per changed parameter, grouped, with the fates
  sheet.

### 4.15 Accessibility beyond §14's contract

§14 fixes WCAG 2.2 AA for the chrome, the landmarks, keyboard reach, the gazetteer and "features in view" as the
non-visual route, contrast, reduced motion and 100–200 % scaling; T-V9-21 tests them on every new screen. This volume adds:
* **The rail and strips** — the rail is a `toolbar` with a roving tab stop (arrow keys between tools, Enter picks), each
  layer group a labelled `group`, each button's accessible name "{tool}: {hint}"; the options strip is a `toolbar` whose
  chip sets are `radiogroup`s.
* **The ghost, spoken** — each settled preview's badge, bend line or refusal is announced once through a polite live region
  (`AppPrefs.announcePreviews`, V9 §6.3): "Preview: temple quarter, 42 plots, 180 households, 38 buildings; 2 of your
  changes move. Enter to accept, Escape to cancel." When the preview lists effects, the first three follow ("Also: Market
  Street now goes round by Bell Lane, …") and the rest as "and {n} other changes" (V9 §4.20.7). The refusal card is a
  `status`, never an `alert` (it is not modal).
* **Handles by keyboard** — a selected shape's handles are a `listbox` in the map region ("Corner 3 of 6, 120 m east and
  80 m north of the town centre"); Tab reaches them, the arrow keys move the focused one (1 m; shift 10 m), Enter commits.
  **No trap:** Tab past the last handle leaves the map region for the next landmark (the context panel), shift+Tab before
  the first returns focus to the map region itself, and Esc drops handle focus back to the map; T-V9-21's no-trap step
  walks it.
* **Declaring in words** — every points-form tool accepts places by name, resolved by the locus reader of V9 §4.16: T5 "a
  temple quarter near the market" (the seed at the market's anchor), T4 "a street from the north gate to the harbour" (two
  points, one at each target's anchor), T3 "a wall from the castle to the river" (the two ends at those targets' anchors),
  T6's typed locus, T7's list — so a screen-reader user can make every L0–L2 declaration without the canvas. A named
  target's point is always the target's `EntityCard.anchor` (V10 §3.6 rule 1; SR-35), read by `query({ kind: 'entity',
  id })` (BCR-V10-1); nothing else is snapped here, since
  the dry run's points-form derivation does the rest (§7.1; V10 §3.6 rule 7), so the same words on the canvas and to the
  clerk write the same bytes (T101-3; T-V9-13; SS-31).
* **Variations and fates** — the tray is a `radiogroup` whose options read their summaries ("Version 2 of 3: 44 plots, 176
  households"); the fates sheet is a table with row and column headers and a Show button per row.
* **Never colour alone** — tier chips carry words; the link view draws each goods family with its own dash pattern (five
  patterns) besides its colour; the shade view's steps are also read out under the pointer; the snap highlight and handles
  keep ≥ 3 : 1 against the paper and ink of every shipped sheet (checked by T-V9-21's contrast step).
* **Timing** — toasts stay while hovered or focused; the long press is adjustable 300–1 000 ms (`AppPrefs.longPressMs`,
  default 500); no action has a time limit.

### 4.16 Reading typed words — the roster line and the locus

T7's pasted lines, T6's typed locus and V9 §4.15's word declarations are read by one small reader of our own, deterministic,
with its connective words as rows of the message catalogue (`parse.*` keys) so a locale supplies its own:
1. **Lines.** One place per non-empty line; a leading bullet, number or dash is dropped.
2. **Fields.** The first of these splits that fits wins: "name: class, locus"; "name — class — locus" (also "-" or "–"
   with spaces around it); "name (class) locus"; otherwise the whole line is the name and the class is guessed from its
   words ("The Golden Anvil smithy" → smithy).
3. **The class.** Words and word pairs are matched against the class rows' display labels and synonyms (volume 11's `label` and `synonyms` cells) — of the classes the document's rung admits (the fold's product and rung, V07 §2.1): at a base rung the town-and-city rows, V05's sky rows where a sky layer stands, and the generic rows; at a village rung the `v.` rows, the town-and-city rows that play themselves there (no `villageForm`; V11 §3.22; V07 §3.11 step 3) and the generic rows, a town-and-city row with a `villageForm` answering through its `v.` row (seam-settlements-r6 SR6-03; J-V9.125): exact first, then with a plural ending removed, then within one letter for words of five letters or more; ties go to the row's `commonness` cell within that set, a `v.` row before a town-and-city row at a village rung, then to row order; no match gives the generic "Other" class and the
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
6. **Wording a locus** — the reverse of (4) (SR3-04; J-V9.100). A `Locus` is worded as its `rel`'s connective — the first
   word of its `parse.rel.<rel>` row ("in", "on", "at", "near"; the row's other words are the synonyms (4) reads, "by",
   "beside" and "next to" for `near`) — then, with a `side`, "the {side} side of" (`parse.side`, `{side}` the
   `parse.dir.<N|E|S|W>` word), then the target's name as the `gazetteer` query answers it at the view's effective key
   (V9 §2.7); a target it withholds or leaves unnamed is worded by its kind's label after "the" ("the gate"). Examples:
   "near the North Gate", "on the west side of the Market", "in Tanners' Row". For a named target (4) reads the worded
   form back to the same `Locus` (T-V9-13). Its readers: `refuse.roster.dossier`'s `{locus}` (V9 §4.9), the history
   template "Asked for {name} {locus}" (V9 §4.10; its `{name}` the line's name, or the class's display label for an
   unnamed line) and volume 10's `dossier` row, which cites it (V10 §3.16).

### 4.17 The underground in the editor — item 109's screens (as revised ~20:05, J111)

The records and their rules are V04's (V4 §2.2, §3.5.0a, §3.5.1, §3.5.7) and the crypt V03's `Basement.crypt` (V03
§3.7.4); this section is what a user sees and does with them. **The panels' explanatory lines are the why rows** (SS-15,
SS-16): a void's excavation reading, its ways in and its dwellings line, a ruin's rows, a catacomb's source, rank, count,
entrance and state, a burial face's outcome, and a crypt's presence, form, rank and join are the matching rows of the
`underground` and `crypt` sections of the subject's `WhyAnswer` (V10 §3.9a), drawn through `WhyCardModel.sections` (V9
§2.7) with their catalogue keys (V9 §4.9's explanation paragraph) — so a panel, the why card and the clerk say one
sentence. The lines quoted below name the row each place shows.

**4.17.1 Hidden caves and ruins — the game master's view (item 109 (j) (2)).** A cavern or ruin exists whole whether or
not anyone can reach it; a cluster whose excavation reading is `unexcavated` (V4 §3.5.7 (g)) is known to nobody in town.
The Below group's **Show hidden caves and ruins** writes the per-viewer view key `showUnexcavated` (BCR-V9-20; V04's name
for it; J-V9.38). It is offered — present and settable — only to a view whose knowledge key is tier `secret` and whose
View as shows everything; to any lower key it is absent, and a stored value reads as `false`. With it on, S14 draws every
element of an unexcavated cluster in V04's unexcavated style (dashed kerbs at 40 % alpha, no fill, no light, only its
system's label; V4 §5.2), and the legend adds "Not yet found by anyone in town". Below `secret` no sealed void is drawn,
labelled, listed in the gazetteer or "features in view", answered by `why` (an unknown address) or exported (V4 §5.2's
knowledge rule; BCR-V9-20 for §11.1). At `secret`, a picture export draws sealed voids only when its view's toggle is on;
GeoJSON and glTF carry them only at `secret` (GeoJSON with `excavation: 'unexcavated'`), and a VTT scene never (V4 §5.5).

**4.17.2 Drawing into a system — the system chip; new ruins, caverns and catacombs (item 109 (g), (h)).** On the Below
layer, T4's Tunnel and T6's Chamber show a **system chip** in the options strip: the town's underground systems by name
and kind ("Old Town — buried town", "the Catacombs of St Aelred's — catacomb", "Sewers", "the Deep Caves — cavern",
"Ruins of Ashkar — ruin" …), only those the view's key admits, defaulting to the system under the draft's first point,
else the one last used. Under them it lists the new systems item 109 admits at the town's rung: **New ruin** and **New
cavern** at every rung (item 109 (j) (1)), **New catacomb** at TOWN and above (item 109 (k)). A crypt is never a system and
is never listed (J111). The mapper emits `drawTunnel { system }` or `drawChamber { system }`; a "New …" pick emits
`drawChamber { system: { newKind }, … }`, a closure (§7.3 item 9) that creates the `UndergroundSystem` with its first
chamber (BCR-V9-21): a ruin with its `RuinRecord` of source `declared`, its plan's axis from the drawn chamber (V4 §4.7);
a cavern of the site's geology; a catacomb by the bend ladder of 4.17.5. A ruin chamber is laid on the ruin's axis
(`bend.ruin.axis` names the turn) and drawn in V04's `ruin` program — straight double-lined walls, column dots in halls
and temples, rubble stipple where collapsed (V4 §5.2) — and the legend adds "Ruins of an older town" whenever a ruin
element is drawn. Re-making a run or a system is T10's "this run" or "this system" (V9 §3.7).

**4.17.3 How people get down here (item 109 (j) (3), (3b)).** The panels of an access point, a cavern or ruin cluster, a
catacomb and an undercity neighbourhood have a section **How people get down here**: one line per way in, from the
`AccessPoint.cause` (V4 §2.2's `AccessCause`) of the access, or of the link it reaches through, worded by the catalogue
row `info.under.cause.<rule>` — the `underground` section's access row, whose words are this table's (V9 §4.9); the access's symbol on the map differs by cause (V9 §10.2 XV-V9-4 asks V04's access row for it):

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
| `system` | a catacomb's: "The stair down from {cemetery}." (at V1C-09's opening place, in its chapel where one stands); another system's: "The {system}'s own way in." | a stair |
| `neighbourhood` | "A street stair down to the {neighbourhood}." | a stair |
| `basement` | "{building}'s cellar opens into it." | a stepped arrow |
| `legacy` | "From an older version of the town." | its kind's |

A void reached only through other systems reads "Reached through the {system} from {access}": the path is the
excavation reading's connection graph from the nearest surface access (V4 §3.5.7 (g)), which the reader returns on the
cluster as the fact `under/wayIn` (a list of links and accesses; XV-V9-4). **Show the way in** highlights every step of
that path (`live.selection`) and lists the steps with their bands in the panel, switching the drawn band as the user steps
through them. A sealed void reads its unexcavated row (`info.under.sealed`) with **Add a way down**; its section adds
the sealed-deep row (`info.under.deep`) when its top lies deeper than `DigRule.maxM` below every footprint over it (item
109 (j) (5)).

**Editing a way down** (T9 and T6; V9 §4.3's rows): **Brick it up** → `setAttr(access, 'state', 'bricked')`; **Lock it** and
**Open it** → `state` `locked` or `open`; **Who knows this way down** → the `knownTo` chips; dragging its opening →
`setAttr(access, 'ground.at', p)`, re-hosted by `pointLocate` (outside II.7.3's admitted ground the refusal card carries
"Show me why"); dragging its underground end → `moveVertex` on its `access_point` vertex; Delete → `delete`. A change that
closes a cluster's last way in previews the dwellings that empty (`fate.access.lastWay`, V04 §4.3) before Accept.

**4.17.4 Dwellings only after a way in (item 109 (j) (4), with R2).** A declaration that would put dwellings in an
`unexcavated` cluster — a T5 quarter or boundary on a void part, a T6 `placeAt` of a dwelling class on a void plot, a
clerk's proposal of either — is expanded as a closure that also makes the way in (BCR-V9-22; J-V9.40):
1. a dug access from the ground building standing nearest above the cluster (plan distance from the cluster's nearest
   element to its footprint, ties by address) whose dig floor lies within `DigRule.maxM` (20 m) of that element's top —
   a `cellar_stair` or `shaft` by V4 §3.5.7 (d)'s kinds, source `dig`, cause `edit` — with `bend.under.accessDug`;
2. else a public opening at the nearest candidate of V4 §3.5.7 (e)'s kinds, its chance waived because it is declared,
   cause `edit`, with `bend.under.accessOpening`;
3. else a public opening of kind `collapsed_shaft` at the point of public ground (V4 §1.2) over the cluster nearest, in
   plan, to its shallowest element, cause `edit` (file f item 372's note; J-VI.4), with `bend.under.accessOpening`;
4. else — no public ground lies over the cluster, and every footprint over it stands beyond `DigRule.maxM` of it — the dry
   run bends the declaration onto ground part 0 over the same footprint, so the homes stand above the void (a quarter or
   boundary takes the same outline on part 0; a dwelling `placeAt` the part-0 plot over its point), named by
   `bend.under.noAccess` ("Nobody can reach this cave yet, so the homes stand above it.") with the alternatives **Add a way
   down** (T6 on a chosen spot) and **Show me why** (item 101 R2; SS-35; J-V9.102).
The way in and the dwellings are one group and one undo step, so no dwelling stands in a sealed void after any
declaration (T-V9-38).

**The bends' alternatives** (SR-36; J-V9.112). With step 1's bend the dry run lists in `PreviewResult.alternatives` the
further buildings step 1's rule qualifies, in its order (plan distance, then address), at most three (BCR-V9-22).
**Use another building** is shown while one of them has not been tried: it re-previews the group `[addUndergroundAccess {
building: that building }, the declaration]` — the access first and with no `target`, so BCR-V9-22's grouped-access rule
takes the cluster's element nearest that building's footprint (step 1's element), and the declaration's closure then
finds the cluster reachable and adds no access of its own — and the card keeps `bend.under.accessDug` with `{building}`
that building, drawn by the application from the alternative it chose; each press steps to the next building, and the
button goes when none is left. Accept commits the group as one undo step. The clerk's `propose` for the alternative
carries the same events (V10 §3.16), one per listed building, each labelled by the row's list form "Dig down from
{building} instead" (V9 §4.9), since that card shows every alternative at once (SR3-12 (e); J-V9.118). Steps 2 and 3 run only when no building qualifies, so `bend.under.accessOpening`
offers no building: its buttons are **Show the way in** and **Show me why**.

**4.17.5 Catacombs, crypts and cemeteries (item 109 (k) (1)–(6) as revised ~20:05, J111: "switch it then, cathedral
also gets crypts but cemetaries get catacombs").**
* **The catacomb's panel** — an `UndergroundSystem` of kind `catacomb` and its `CatacombComplex` (V4 §2.2):
  * its name, V04's label (V4 §5.4): "the Catacombs of {cemetery}", a churchyard's by its church, "the Ossuary of {quarter}";
  * "Under {burial face}" with **Show**, and the source in words: "the churchyard of {church}", "the burial ground", "the
    cemetery outside {gate}", "the {network} ground outside {gate}", "the monastery's burial ground", "an old quarry turned
    ossuary", or "from an older version of the town" (`legacy`);
  * its rank: "The largest catacomb in {town}" at rank 1, else "{n} of {count}"; the count in words by V4 §3.5.1 (3): "A town
    has one catacomb." or "{town} is a city with {churches} churches, so it may have {count} catacombs." (the churches as
    V04 counts them, a collective record's members once); with `overCount`, `info.catacomb.overCount`;
  * its entrance: "The stair down from {cemetery}" (V1C-09's opening place, in its chapel where one stands) with **Show**,
    and every other way in by 4.17.3.
* **Its "Over time" tab**: the extent (`extentFloorM2`, m²) with a line chart of it per epoch (from V06's history frames)
  whose values never fall (T-V9-34); this epoch's growth against its cap ("grew {a} m² of at most {cap} m²", from
  `lastGrowth.addedM2` and V04's cap); the **state**, read from `blockedBy` — **growing** when it is empty, **stopped** when
  it holds `sourceClosed` (`info.catacomb.stopped`), **stagnant** otherwise, with each other cause in words
  (`info.catacomb.blocked.<cause>`, this volume's words): `reach` "It
  has reached as far as its diggers go", `wet` "The ground beyond is too wet", `system` "Another tunnel is in the way",
  `foundation` "Deep foundations are in the way", `wallStrip` "The town wall's footing is in the way", `depth` "The rock
  lies too deep", `rank` "It may not outgrow the Catacombs of {largest}"; and the ossuaries' **fill** as a bar, captioned
  `info.catacomb.stagnant` while stagnant, with a stepper (`setAttr` of `fill`; lowering it is allowed and undoable, and
  the next stagnation raises it again, V4 §3.5.1 (7)). The underground view draws the ossuaries denser as `fill` rises
  (V4 §5.2's ossuary program); the application only passes the layer.
* **The crypt on a church's panel.** Every church-class building's panel has a **Below** line from its `Basement.crypt`
  (V03 §3.7.4): "Crypt, {m²} m²"; for the cathedral "Crypt, {m²} m², the largest in {town}" — always present (V02's
  no-refusal ladder, V2 §3.14.5); V03's wet-ground fold reads "floor vaults (wet ground)" and V02's `raised` form "a
  raised-choir crypt"; **Show** opens the plan at the basement storey. Where the crypt join exists (an `AccessPoint` of
  cause `crypt`), the line adds "Opens into the Catacombs of {name}" with **Show the way in**. A church without a crypt
  reads "No crypt", with **Add a crypt** where its class's crypt column admits one (`setAttr` of the basement's crypt, V03).
  A crypt is never listed as an underground system.
* **The cemetery's panel** — a churchyard part, a `cemetery`-class use, a Cemetery network ground, a monastery's burial
  yard: "Catacombs below: {name}" with **Show** and its entrance; or "No catacomb below" with the reason from V04's
  candidate pass, read from the face's `why` (path `catacomb`; XV-V9-4): "the town's one catacomb lies under {other}",
  "{town} may have {count}, and they lie under {others}", "the ground is too wet", "it is younger than a century", or
  "chance".
* **Bends, none refused** (R2; J-V9.39). The dry run of `drawChamber { system: { newKind: 'catacomb' } }` runs BCR-V9-21's
  ladder; this volume words the result:
  (a) the chamber's centroid lies inside a church-class building's footprint → `setAttr(building,
      'basement/crypt/ring', <the drawn ring clipped to the building's crypt region>)` and no chamber is laid; on a
      building without a basement, volume 3's crypt ladder makes a crypt-only basement (full, then half, then raised; V03
      §4.2, V3C-75), and the ghost names the form ("a half-sunk crypt under {church}"); undo is one step:
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
      size (`bend.crypt.cathedral`); enlarging another church's crypt past the cathedral's is clamped just short of it
      (`bend.crypt.largest`, offering "Enlarge the cathedral's crypt too", a two-event group); another church's crypt may be
      removed freely, and when it carried the crypt join its fates list "The way from {church}'s crypt into the catacombs
      closes." V03 computes (e) (XV-V9-5).
* **The author's removal** (item 109 (k) (4); V04's J-V4.56). Deleting catacomb galleries stays allowed — everything is
  editable: the badge and the fates sheet say `fate.catacomb.removed`, the extent floor drops by the deleted area and the
  deleted nodes are tombstoned, so growth never digs them again; undo restores both. A seal keeps the extent: "Sealed
  galleries stay part of the catacomb."

**4.17.6 Arch vaults at street level (item 110 (b); critique-V4's C4-110-1).** An arch vault stands at grade in a raised
way's `vault` span but belongs to the vaults system. On **Ground** it is reached through its span in the hit stack — the
deck, the span, the vault, the street (V9 §4.20.8). On **Below**, the vaults system's panel lists arch vaults under their
own heading, "At street level, under {way}", each with **Show**, which pans to the span; the depth-band filter never
hides them. Their doors are drawn with the Ground layer's entrances. The why card reads "An arch of {way}, walled up as a
vault", or "… by you" after a span edit (V9 §2.7). Opening its span or removing its way lists the vault, its building and
any drawn plan among the effects (V9 §4.20.7).

### 4.18 People, the family tree and the clock (§10.3's module, M4b)

Offered only when the relation store holds people (the module tier, §10.3); absent otherwise (J-V9.48).
* **The People panel** (the gazetteer's People chip, or "People" in the top bar's panel menu) opens in the context panel's
  place: filters for type, race, gender, profession, workplace (a pick on the map), age (a two-thumb range), household (a
  pick on the map) and district (chips), sent as `query({ kind: 'people', … })` and paged; each row gives name, age,
  profession, household, district and a tier chip, a withheld person reading "someone the viewer doesn't know" (§9.2).
  Selecting a row outlines the person's home and workplace on the map and opens the person's card.
* **The person's card**: name, age, household, profession, workplace, the module's content rows, **Family tree**, and
  **Where is {name} at…** — an hour slider (default the `time` key's hour) and a day chip send `query({ kind: 'whereIs',
  person, day, hour })`, and the answer draws a pin on its building with "At {hour} on {day}: {place}".
* **The family tree** (§14's view) opens in the context panel's place widened to 560 px (a full-height sheet on narrow):
  `query({ kind: 'relations', person, up: 2, down: 2 })`; generations in rows by birth epoch, partners side by side and
  children below; a branch beyond two generations elided into "+{n}", which expands on click; **Re-root here** on any
  person; opening a person never pins it (§10.3); a keyboard tree grid (arrows between people, Enter opens the card, +
  expands, − collapses).
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
| **Hand lantern** | Below group (V9 §4.2) | `handLantern` | off |
| **Season**, **Weather** (where §8 draws them) | the Light group | `season`, `weather` | the recipe's |
| **Day or night**, sun mode, sun height, hour | Light group | `light`, `sunMode`, `sunHeight` | §2.9's |
| **Favourite** — a star on every panel's header | panels; the Notes panel lists them | favourites | none |
| **Notes** — a private note on any thing's About tab; public notes (owner and editor) | the Notes panel and each panel's About tab | notes, public notes | none |
| **Pins** — "Add a pin", then a click; each with a label, a note and one of six colours | the Notes panel | view pins | none |
| **My look** — a viewer's style card | the Dress panel's style cards, for the viewer role | `stylePreset` (a viewer never writes `setStyle`, §11.3 N-15) | none |
| **Grid** — kind (squares, hexes), cell size, skip water | the Dress panel | the grid settings | off |
| **Legend** — auto · everything · off, a border, a corner | the Dress panel | the legend settings | auto |
| **Emblem** — generated, **New emblem** (`rerollLayer { concern: 'naming.emblem', salt: the concern's current salt + 1 }`, logged, one undo step; V9 §4.5's T12 row; SR-29), or an SVG of the user's, cleaned by §9.5's sanitiser | the Dress panel | the emblem settings | generated |
| **Compass** — on or off; drag it to place it; the wheel over it turns it; **New compass** (`rerollLayer { concern: 'style.compass', salt: the concern's current salt + 1 }`, logged, one undo step; §9.5; SR-29) | the Dress panel and the map | the compass settings | §9.5's |
| **The ruler** — click points for a length (m and ft); **Area** for a polygon (m², ha, acres); feature snap by BCR-V9-9 (`{ p }`); Esc ends; **Save as annotation** writes a view pin labelled with the measure | key M; a view-bar button | view data; a view pin | — |

### 4.20 Item 110 on the canvas (file g item 110 as revised ~23:40; the owner's "they go in"; J-V9.58)

Item 110 closes four authoring gaps — terrace retaining walls, raised ways, stepped massing and buildings on decks — and
the owner's ~23:40 revision lets a city raise ways by itself while "a user can decide to add or remove". The records,
their generation and their lifecycles are the base's as the coherence pass writes them from item 110 (V9 §1.3), with
volume 2's stacks and deck buildings (V2 §3.15–§3.16), volume 4's arch vaults (critique-V4's C4-110-1), volume 6's reason
keys and suppression (V6 §2.13) and volume 11's rows. This section is their tools, words and screens. Every gesture runs
V9 §3.3's pipeline, every event is BCR-V9-26's, and every word is a V9 §4.9 row.

**The `toolkit.json` rows item 110 adds** (V9 §2.3; T-V9-12 reads them):

| tool · mode or parameter | gesture · kind | `emits` | `layers` | basic | narrow · coarse |
|---|---|---|---|---|---|
| T3 · mode `retaining` ("Retaining wall") | `points` (`polyline` form) | `drawWall` | ground, sky | — (a mode chip beside Draw wall and Gate) | no · yes |
| T3 · param `highSide` ("High side": Auto · Left · Right) | `chip` | — | ground, sky | yes (in the Retaining wall mode) | — |
| T2 · mode `terrace` ("Terrace") | `brush` | `terrace` | ground, sky | — (a mode chip) | no · yes |
| T2 · param `levelCm` ("Level") | `number`, and the level handle | — | ground, sky | yes (in the Terrace mode) | — |
| T4 · param `raised` ("Raised") | `toggle` | `drawWay` | ground | yes | no · yes |
| T4 · class chip `aqueduct` ("Aqueduct") | `chip` of the class parameter | `drawWay` | ground | yes | no · yes |
| T9 · context controls `spanUse`, `crossingForm`, `deckHeight`, `archSpacing` (on a selected raised way, span or crossing; SS-46) | `card` controls | `setAttr` | ground | — (context) | yes (view) · yes |
| T9 · params `tierCount`, `tierTop`, `tierStairs`, `tierStairWidth`, per-tier `floors` / `eaveCm` | `number`, `chip` | `setMassing`, `setAttr` | ground, sky | the count, top and stair chips; stair width behind More | yes (the Shape tab's forms) · yes |
| T10 · the Delete gesture ("Delete", "Remove") | `click` | `delete` | ground, sky, underground | — (context) | yes · yes |

The other modes of T2, T3, T6, T8, T9, T10, T11 and T12 gain `'sky'` in their `layers` where V5 §4.1 maps them; T1's and
T5's carry it already, and T4's only in its Sky access mode (V9 §4.20.9).

**Constants of this section** (each read by the dry run or the shell as stated; provenance in brackets):

| constant | value | read by | provenance |
|---|---|---|---|
| a retaining chain's closing radius | 20 px (22 px coarse) | the shell (T3's Retaining wall, as Draw wall) | our own, as V9 §4.5's T3 row |
| `terrace.stepMinCm`, `terrace.slopeMin` | 60 cm, 0.15 | the dry run of `drawWall { kind: 'retaining' }` and `terrace` | volume 11's `terrace` rows (critique-V11 §11; V07's defaults) |
| `terrace.retainingReachM` | 15 m | the flat-ground bend (a) | our own, calibrate-later at M3a; a cell of volume 11's `terrace` table (XV-V9-13) |
| `terrace.flatDepthM` | 12 m | the flat-ground bend (b) | as above |
| `terrace.coverShare` | 0.8 | the flat-ground bends | as above |
| the step's sampling | every 2 m along the chain, ± 3 m across it | the flat-ground test | our own |
| `raised.previewOnReleaseKm` | 3 km | the shell (V9 §3.14) | our own, calibrate-later by T-V9-3 at M3a |
| `aqueduct.sourceReachKm`, `aqueduct.gradient` | 10 km; [0.0003, 0.003] | the aqueduct's source bend and its fall | volume 11's `raisedWays.settings` (critique-V11 §11) |
| volume 11's `deck.landmarks/bridgeMid/minSpanM` | volume 11's value (V11 §3.24.4) | BCR-V9-30's mid-span slot; T6's slot snap | volume 11's cell, cited, not a constant of this volume (J-VI.8; SR-15) |
| the effects list's cap | 50, then `effectsMore` | BCR-V9-27 | our own |
| the deck scenes' cap per export | 8 | BCR-V9-31 (c) | our own, calibrate-later |
| `tierStep` snap | 10 cm | the step handle | our own |

#### 4.20.1 Retaining walls and terraces (item 110 (a); V9C-53)

1. **T3 gains a third mode, Retaining wall** — a mode chip beside Draw wall and Gate, never a kind behind More. Two or more
   points or a line; the chain closes when its ends meet within 20 px (a platform, its high side inside). The **High
   side** chip reads Auto · Left · Right, relative to the drawing direction; Auto sends no `highSide`, and the dry run takes
   the side whose mean ground within 10 m of the chain is higher (BCR-V9-26 (a)). Snaps, in priority order: slope-break and
   contour lines, the ends of existing retaining walls, plot boundaries, street centre-lines (V9 §3.4). Mapper: `drawWall {
   kind: 'retaining', points | from: { points }, closed, highSide? }`. Commit on release, or Accept when fates move houses
   or effects are listed (V9 §3.3). A retaining wall is never an enclosure: the Gate stamp does not snap to it, it closes
   no circuit, and the wall-arcs ghost of V9 §3.4 is not drawn for it.
2. **The ghost** draws the wall line with short ticks on its low side (the base's drawing, §8), a stair or ramp mark at
   every way it crosses, and the plots on either side re-flowing. The badge reads "retaining wall {m} m · steps {a}–{b} m
   · {n} ways cross by stairs, {k} by ramps". Each crossing's form is the dry run's (the way-class rule, item 110 (a)),
   named in the bend line by `info.crossing.stair` or `info.crossing.ramp` ("Market Street climbs the terrace by a
   stair"); the words follow the dry run's result and never guess it.
3. **Flat ground bends, never refuses** (R2; J-V9.60). The dry run samples the drawn run every 2 m and measures, at each
   station, the ground step across the chain (± 3 m) and the slope across it. Where at least `terrace.coverShare` (0.8) of
   the stations step less than `terrace.stepMinCm` and slope less than `terrace.slopeMin`, the run is flat, and:
   (a) when a slope-break line, a terrace edge or an existing retaining wall whose step reaches `terrace.stepMinCm` lies
       within `terrace.retainingReachM` (15 m) of at least 0.8 of the stations, the chain moves onto the nearest such
       line, clipped to the drawn run's extent (`bend.retaining.moved`, offering "Keep my line", which takes (b));
   (b) otherwise the declaration becomes a `terrace` over the strip on the high side (Auto: the left of the drawing
       direction) between the drawn line and `terrace.flatDepthM` (12 m), levelled to the strip's highest ground plus
       `terrace.stepMinCm`, so that the drawn line is its edge and carries its wall (`bend.retaining.flat`, offering "Use the
       other side"). The strip's other edges, where they step, carry walls too, and the badge counts them.
   Both bends commit the bent events, never the flat wall, so item 110 (f)'s "nowhere flat" holds on every path.
4. **T2 gains a Terrace mode** (a brush). Press and drag over the ground to level it; the level is the ground height at
   the pointer-down point, shown as a readout ("Level 34.2 m"). After release and before Accept, a **level handle** — a
   vertical double arrow at the stroke's first point, as a lake's — moves the level, each drag re-previewing. The brush
   radius is T2's radius parameter (default 25 m, volume 10's `encoders.terrace.radiusM`, one default for both). Mapper:
   `terrace { stroke: { path, radiusCm, falloff: 'cosine', amount: 1, water }, levelCm, expansion }` (BCR-V9-26 (c)),
   `water` from T2's water-mode parameter. Commit: Accept, since it re-levels plots. Badge: "terrace {area} m² · retaining
   walls {m} m · steps {a}–{b} m · {n} plots re-flow".
5. **Handles after commit** (V9 §3.5). A retaining wall's chain has the open-chain handles, or a ring's when closed; a drag
   is `moveVertex`, and on a generated wall it makes the wall declared and held (§7.2), which the panel says ("Yours from
   now on; the rules no longer move it."). Selecting a terrace-made wall offers **Change the terrace's level**: the level
   handle again, emitting a new `terrace` over the recorded stroke at the dragged level, whose expansion replaces the old
   walls in its group (BCR-V9-26 (c)). The recorded stroke is the `terrace` event's own, found through the wall's lifecycle
   cause (§2.8: its `EditRef`).
6. **Crossings from the other side.** A T4 road drawn across a standing retaining wall shows the stair or ramp in its
   ghost with the same bend line; a primary or secondary way ramps where the base's way-class rule says so. The form is
   editable afterwards (V9 §4.20.6 (6)).
7. **Keyboard and devices.** Points by arrows and Enter; the High side chip is a `radiogroup`; the terrace brush moves by
   the arrow keys at the focus point and stamps with Enter, and the level handle takes arrows (10 cm; shift 1 m) (V9
   §4.15). Neither mode is offered on narrow (T2 and T3 are not); both work with a coarse pointer.
8. The bar is T-V9-54 (V9 §7.1).

#### 4.20.2 Raised ways and aqueducts (item 110 (b); V9C-54, V9C-73)

1. **Controls.** T4's options strip gains a basic toggle **Raised** and a class chip **Aqueduct**; the chip turns Raised
   on and locks it while chosen. While a T4 stroke is drawn on the Ground layer, **PageUp** turns Raised on for that stroke
   and **PageDown** off — the surveyed road tools' elevation keys (`research/ux/tool-survey.md` Part II, B2-S5). PageUp and
   PageDown keep stepping the depth band while Below is the working layer (V9 §4.13).
2. **Snapping with Raised on** (V9 §3.4's row). The two ends snap only to ground vertices — junction vertices, way
   centre-lines (the end splits that way at commit, making a ground vertex) and plot frontage points. Interior points snap
   to nothing on ground part 0 and never split a way they cross; Shift's 15° rule still applies. An end released away
   from any ground vertex is bent by the dry run along the course to the nearest one (`bend.raised.end`).
3. **Forms.** Two points → the base's raised-way course solver (the one generation and V06's epoch step call; V6 §3.19)
   derives the course; a line → the drawn line is the deck's centre-line, resolved and stored as §7.1 stores a points form.
   Mapper: `drawWay { class, widthCm, raised: true, points | from: { points } }` (BCR-V9-26 (b)); the Aqueduct chip sends
   `class: 'aqueduct'`.
4. **Walls** (BCR-V9-29; J-V9.61). A raised road or viaduct whose course meets an enceinte's trace ramps down to a ground
   vertex before it and passes through the gate the ground way makes there (`bend.raised.wall`). An aqueduct passes through
   an arch in the curtain, never a gate (item 110 (b)), and its ghost draws the arch mark. From the other side, a T3 wall
   drawn across a standing aqueduct shows an arch in its ghost, not a gate (`bend.wall.aqueductArch`).
5. **The aqueduct's ends.** Its first point snaps to a spring or a river reach (its source), its last to a square, a
   fountain pin, a `conduit_house` plot or a cistern of the vaults system (its footprint lit on the ground; II.7.6) — its
   terminal; its course falls all the way at volume 11's `aqueduct.gradient`. A source lying lower than the terminal is
   bent to the nearest source above it within `aqueduct.sourceReachKm` (`bend.aqueduct.source`); with none in reach, the
   dry run bends the stroke to a well pin at the terminal (`instance { op: 'add' }` of a well pin, the base's decoration
   pins, §4.7 S11; J-VI.4 (h)) and commits no way, named by `bend.aqueduct.uphill`, whose alternative is "Show me why"
   (J-V9.75; SS-32). A terminal released on open ground gets a new fountain
   pin there in the same group (`instance { op: 'add' }`; in a square it is the square's centrepiece, critique-V1's
   V1C-85), named by `bend.aqueduct.terminal`. Its buried stretches stay the base's line on ground part 0 (critique-V4's
   C4-110-6); the ghost draws them dashed.
6. **A floating island** (V05 §4.2, §3.22 (3); J-VI.4 (d), (e)). A raised or aqueduct stroke never makes a way to or on
   an island, and the dry run bends it (item 101 R2): a raised stroke that ends on an island's rim becomes `placeSkyAccess`
   with the stroke's ends as top and foot and the kind V5 §3.10 admits there, named by `bend.raised.island` in V05's words,
   whose alternative is **Draw a road to its foot** (the same access plus a ground `drawWay` of the stroke's class from its
   first point to the access's foot, one group); an aqueduct stroke that ends on a rim ends at its last ground vertex
   outside the island's footprint (`bend.aqueduct.island`, "An island's water is its own; the aqueduct ends here.", with
   "Show me why"). A raised or aqueduct stroke wholly on an island's key never arises from the canvas, because Raised and
   Aqueduct are hidden on Sky (V9 §4.20.9); from the clerk or a skeleton the dry run drops `raised` and draws the way on the
   island's ground (`bend.raised.onIsland`), and makes an aqueduct a fountain pin at its end (`bend.aqueduct.onIsland`),
   each with "Show me why" (SS-32).
7. **Rungs.** The Raised toggle and the Aqueduct chip are offered at every rung, the village rungs included (V07 §4.1's
   T4 row); at TOWN and below the user's declaration is the only source (item 110 (b)). Nothing about the cap disables
   them: a declared way counts toward the generator's cap and is never refused by it (critique-V6's C6-40 (2); V6 §2.13's
   `declared`).
8. **Badge.** With Raised on, the first line reads "Raised", then "raised {m} m · {n} arches · crosses {k} ways with no
   junction · up to {h} m above the ground · {v} vaults beneath" (the vaults by critique-V4's C4-110-1 span rule); an
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
11. A course longer than `raised.previewOnReleaseKm` (3 km) previews on release (V9 §3.14). The bars are T-V9-51 and
    T-V9-52.

#### 4.20.3 Removing a generated thing, and adding it again (item 110 (b), (f); the owner's "add or remove"; V9C-55, V9C-70, V9C-71)

1. **Delete previews** (J-V9.63). A Delete — the key, the context menu or T10, on any thing — commits at once only when
   its dry run lists no fate other than *kept* and no effect beyond the thing itself (V9 §4.20.7). Otherwise the ghost
   stays pending: the removed thing dashed, a detour and new crossings ghosted, the badge's effect count, **Accept — remove
   it** (Enter) and Esc; the fates sheet opens only when the result is `confirm`.
2. **Generated content** — whatever file f item 260 suppresses: a raised way whose lifecycle cause is a generation or epoch
   rule, a harbour-mouth chain, a quay wall, a retaining wall and a deck plot (`detail.suppress`), and a floating island and a
   sky access in volume 5's record form (SR2-15) — is removed by the plain `delete { id }` (an island's becomes V05's `convert
   removeIsland`, V5 §4.2). The fold records the suppression by reason key (BCR-V6-24's `detail.suppress`; V05's removed
   slots), so no client writes a reason key and a journal replays the call exactly (BCR-V9-26 (e)). The removal holds
   through Regenerate, a scoped New random over every district the thing crossed, a reload through crash recovery and every
   epoch (V6 §2.13's ledger reads the suppressed set at every generation and epoch). The pending card and the committed
   toast carry `info.remove.holds` — "The town won't {rebuild | raise} this {kind}; undo brings it back." — whose
   arguments come from the dry run's `holds` (BCR-V9-27): the subjects are the engine's, never a list in the shell
   (V9C-70). The clerk's "removed by you" line uses the same row.
3. **The dossier.** Nothing item 110 makes is dossier-bound (V08 §2.6b (5), J-V8.72): a raised way whose reason read a
   dossier record (DR-V8.7's water system, DR-V8.8's landmarks) is generated content and is removed by (2); its why card
   names the record. A dossier-backed element keeps V9 §4.3's general rule (`rejectSite`, or `refuse.dossierRemove` with
   **Move it** for a record with no site).
4. **History** (V9 §4.10). The row reads "Removed the {kind} {name}; the town won't {rebuild | raise} it", with **Show** —
   its former shape as a dashed outline while hovered, read from the removed thing's last record (BCR-V9-34) — and **Undo
   this**. Where Undo this is refused as dependent (`refuse.undo.dependent`), the row offers **Build it again**: a new
   declaration of the removed thing by its own tool, filled from its last record (BCR-V9-34) and previewed first — one row
   per kind file f item 260 suppresses (SR2-15; J-V9.95):

   | removed kind | Build it again's events | the tool it opens |
   |---|---|---|
   | a raised way or an aqueduct | `drawWay { raised: true, class, widthCm, points }` on the former course | T4 with Raised on, or the Aqueduct chip |
   | a quay wall | `drawWall { kind, points, closed }` on its former line, `kind` and `closed` the record's | T3's Draw wall |
   | a harbour-mouth chain (the water gate across the harbour entrance, file g item 106 (e)) | `placeGate { enceinte, at }` at its former place | T3's Gate |
   | a retaining wall | `drawWall { kind: 'retaining', points, closed, highSide }` on its former chain (BCR-V9-26 (a)) | T3's Retaining wall |
   | a deck plot | `drawFootprint { polygon, cls? }` on the deck at its former slot — the footprint and class of the building tombstoned at the removal's seq whose last record names that plot, or the plot's own outline when it stood empty — which S11 fits as the deck plot at that slot (served by V6 §3.19.3 (7); XV-V9-23 met) | T9 on the deck |
   | a floating island | V5 §3.2 (6) (ii)'s T5 `sky` declaration on its former outline, which takes its held slot | T5 with Sky |
   | a sky access | `placeSkyAccess` at its former top and foot (a placed access; the removed ordinal stays held, V5 §3.10 (1)) | T4's Sky access |

   **One function** computes these events for a removal group, named by its first seq: for each `delete` of the group it
   reads the tombstoned id's `entity` answer (BCR-V9-34) with `admitAs` = `effectiveKey()` (V9 §2.7) and emits that
   kind's row, in the group's order; a delete whose answer the key withholds, or whose kind has no row, adds nothing, and an
   empty result shows no **Build it again** (nor volume 10's **Put it back**). The history row calls it, and the shell hands
   the same function to the clerk slot as `ClerkMount.rebuildEvents` (V9 §2.10), so volume 10's `rebuild` action takes
   exactly these events — the one source (critique-V10's C10-50 (4); SR2-14; J-SS2.1; J-V9.94).
5. **Narrow.** Delete from the context menu (or the long-press menu) is offered on narrow with the same pending card (it
   is not a drawing gesture).
6. **A town-wide "none".** The advanced panel's "Raised ways the town builds by itself: none" (V9 §4.14) sets volume 11's
   chances to 0 and offers **Remove them too** for the standing generated ones, each removed as (2).
7. **Crossing the CITY line on T1** (V9C-71; J-V9.72). A Re-derive from CITY to TOWN drops the generated raised ways,
   since a town raises none by its own rule. The whole-town ghost's effects list each one that goes (`effect.raised.goes`),
   and the card offers **Keep them as yours** — a checkbox, unchecked by default. Checked, it appends one declared `drawWay
   { raised: true, class, widthCm, points }` per kept way along its current course, in the Re-derive's group, so one undo
   removes both. Raising a town to CITY lists each way the city raises, with its reason (`effect.added`: "The city raises a
   {kind}: {reason}"). An epoch's fall keeps them (V06's rule); only a Re-derive drops them.
8. The bars are T-V9-53 and T-V9-63.

#### 4.20.4 Decks: moles, jetties, quay platforms and bridges (item 110 (d); V9C-58)

1. **T6 on a deck plot.** A stamp on a deck plot maps to `placeAt` from its point (V9 §3.3 step 4): the dry run finds the
   deck plot under the point (SR-09). On a
   deck with no free plot there, the dry run takes the nearest free deck plot on the same deck, else the nearest land plot,
   bent (`bend.deck.full`).
2. **A class the deck refuses.** A class volume 11's `deckOk` refuses is bent to the nearest free land plot at the deck's
   landward end — the plot nearest the deck's shore vertex (`bend.deck.class`: "A {class} can't stand on a {deck}; placed it
   at the {deck}'s landward end.").
3. **Landmark slots.** T6's snap lights a mole's slots — its head and its midpoint ("Mole head", "Mid-mole") — and a long
   bridge's mid-span slot (BCR-V9-30) for a tower or fort stamp; a stamp there maps to `placeAt` on the slot's landmark
   plot, whose building reads `DeckContext.landmark` (V2 §3.16 (2)). A non-landmark class dropped on a slot takes the
   nearest free deck plot, bent (`bend.deck.full`).
4. **The deck building's badge** reads "on the {deck} · at most {maxFloors} storeys · {a}–{b} m²" from volume 11's `deck`
   budget (`DeckBudgetRead`, V2 §2.6) — a storey cap and a footprint band, never a count of plots (J-V9.66). T9's storey
   stepper on it is clamped at `maxFloors` with V02's bend (`bend.deck.floors`, V2 §4.6 (4)).
5. **T4's deck ghosts.** Drawing a `pier`, `quay` or `bridge` way ghosts its deck plots along the deck, and the badge adds
   "{n} deck plots"; a raised way offers none (J-V2.71).
6. **Removing or ruining a deck** previews its buildings among the effects (`removed`, `displaced`; V9 §4.20.7). The deck
   host's Over time tab offers **Rebuild it** (the base's rebuild of the host, as the coherence pass writes item 110 (d)'s
   lifecycle), which re-offers the plots, listed as `added`.
7. **Fixture 1's bridge fortress** (V9 §7.2). Its canvas script makes it by T4 `bridge`, then a T6 stamp of the fort class
   on the bridge's mid-span slot. BCR-V9-30 gives a bridge deck of at least volume 11's `deck.landmarks/bridgeMid/minSpanM` (V11 §3.24.4) one landmark slot
   at its mid-span, as a mole's midpoint has. The pre-decided fallback, if the coherence pass declines it: the fort stands on
   the bridgehead plot, and fixture 1's checklist reads "the fortress at the bridge".
8. The bar is T-V9-55.

#### 4.20.5 Tiers — stepped massing at the building band (item 110 (c); V2 §4.6; X21; V9C-59)

1. **The controls.** At the building band on a `stepped` building, T9 and the Shape tab show: a **tier stepper** (the
   count → `setMassing { op: 'tiers', count }`); a **step handle** on tier 1's front face (`tierStep`; its drag emits `tiers {
   insetCm }`, the inset being the handle's distance from tier 0's front face, snapped to 10 cm); a **stair chip** (Along the
   front · Up the faces · Inside · Sealed → `stairs: 'axial' | 'flights' | 'internal' | 'none'`; the `none` form and the
   further controls of V02's second revision per Integration notes IN-V09-4, J-VI.5); a **top chip** (Flat · Shrine · Roofed →
   `top`); per tier a **storey stepper** (a storeyed tier or the shrine: `setAttr(wings/<key>/heights/floors)`) or a
   **height stepper** (a solid tier: `setAttr(wings/<key>/heights/eaveCm)`); and behind More a **stair-width stepper**
   (`tiers { stairWidthCm }`). A tier is also selectable as a part (`tiers/<k>`) through the hit stack (V9 §4.20.8), which
   opens its own stepper.
2. **When.** The per-tier storey and height steppers from M3a (the base's `setAttr` of a wing's heights, J-V2.65); the tier
   stepper, the step handle and the chips from M6c, with V02's `tiers` op (V2 §8.5); a build before M6c ships none of them
   (its `toolkit.json` has no such rows).
3. **Preview.** Each is previewed. A removed tier's rooms are listed among the fates where a stored plan holds them, and
   otherwise among the effects (critique-V3's V3C-76 (3)); the stairs' re-lay is an effect (`effect.stairs.relaid`).
   V02's bends are worded: `bend.tiers.count`, `bend.tiers.step`, `bend.tiers.flights`, `bend.tier.height`.
4. **Withdrawn by J-VI.4 (integration, 2026-09-29): these are bends, not refusals** — item 101 R2; V02's second
   revision bends each case (V2 §1b's bend ids) and the island cases bend as J-VI.4 (a)–(h) states; the message keys below
   are renamed `bend.*` with the same words. The former text, kept for the record: `bend.stack.internalSolid` (offers "Stairs along the front" · "Stairs up the
   faces"), `bend.stack.removeStair` (offers "Put the stairs inside" where tier 0 has storeys, else "Change the stairs"),
   `bend.stack.addWing` (offers "Change the building's shape"), `bend.stack.deck` (offers "Show plots on land") and
   `bend.stack.notStepped` (offers "Give it tiers"). With `bend.raised.island`, `bend.aqueduct.island`,
   `bend.raised.onIsland`, `bend.aqueduct.uphill` and `bend.retaining.rim` they form V9 §4.9's added refusal class —
   a rule of a building's structure or of nature that the dry run names, each with its offer; T-V9-13's list gains them.
5. **The why facts.** The Shape tab's About section shows V02's `massing/stack/*` facts (shape, the stair form asked and
   laid, the top, the step, truncated tiers; V2 §4.6 (6)) with their tier chips.
6. The bar is T-V9-59 (M6c); the per-tier steppers are in T-V9-51 at M3a.

#### 4.20.6 The new records' panels, handles, spans, crossings and why lines (V9C-61, V9C-74, V9C-76)

1. **Panel rows** (registry labels and help anchors, BCR-V9-19):
   * a **retaining wall** — its step "{a}–{b} m", its material, towers or buttresses, its high side (chips), and "Made by
     the rules on levelled ground" or "Yours";
   * a **raised way** — its kind (viaduct, raised road, aqueduct; V06's `RaisedKind` `viaduct` · `elevated` · `aqueduct`),
     its reason as the `raised` section's row of its `WhyAnswer` (`info.raised.<outcome>`, V10 §3.9; the same `MsgRef` the
     why card and the clerk draw, SS-15), with its values (the reason's words are volume 11's `says`: "carried over the {feature} on arches: the drop is
     {d} m and going round was {x} m longer"; "a raised road between {a} and {b} over the lower {district}"; "brings water
     from {source}: the wells and cisterns inside the walls fall short"), its deck height, its arches with their use, its
     supports, the vaults beneath (volume 4), an aqueduct's source and terminal, and for a way carried down its `carried`
     row (`info.raised.carried`, from V07's `RaisedRead.origin`);
   * a **deck** (its host way's panel) — its kind, host, plots, storey cap and footprint band;
   * a **stepped building** — V02's why facts (V9 §4.20.5 (5));
   * a **span** — its use and reason, its vault's building when walled up;
   * a **crossing** — the way, the wall, its form and the step it climbs.
2. **A span** (selected through the hit stack) shows T9's **Open arch · Walled up as a vault** chips (SS-46) → `setAttr(way,
   'spans/<n>/use', 'open' | 'vault')` (BCR-V9-26 (d)), previewed; the effects list the vault's building and any drawn plan
   in it (V3C-73 (3)). A span whose recorded reason keeps it open (a part-0 way, water or a flood cell beneath, too tall,
   too low or too steep; critique-V4's C4-110-1) shows "Walled up as a vault" disabled with that reason in words ("A street
   passes under this arch") — no event is sent. The edit is held (a user edit), and the why card then reads "… by you".
3. **`decidedBy`** (V9 §2.7's rows): for a raised way its own `raised` section row (`info.raised.built`, `.carried` or
   `.declared`), not drawn twice (J-V9.82); "The ground was levelled here; it steps {m} m"; "An arch of {way}, walled up as
   a vault". The rest of the card's item-110 lines are the `raised`, `underground`, `massing`, `plan`, `island` and `move`
   sections' rows (V9 §2.7's `sections`).
   A raised way whose reason read a dossier record adds the record as a `facts` row of tier `dossier` (DR-V8.7) or as `ref`
   rows, a withheld one named by kind (DR-V8.8).
4. **Handles** (V9 §3.5's rows): `rampEnd` on a raised way's two ends (drag → `moveVertex` resolved only onto a ground
   vertex, the snap of V9 §4.20.2 (2)); its interior points (`moveVertex` on its raised part's lattice point); a retaining
   wall's chain (V9 §4.20.1 (5)); the terrace level (`terraceLevel`) and the tier step (`tierStep`).
5. **The context menu** of a raised way: Why here?; Select below (V9 §4.20.8); Lock, Pin; Reset to generated (when edited);
   the Over time submenu (the base's conversions of a way); and Delete with V9 §4.20.3's card.
6. **A crossing's form and the deck's measures** (BCR-V9-33; V9C-76). A selected crossing shows T9's **Stair · Ramp** chip (SS-46) →
   `setAttr(way, 'crossings/<retaining wall id>/form', 'stair' | 'ramp')`; a ramp too steep for the way's class bends into
   a longer ramp along the way where its run allows, else back to a stair (`bend.crossing.steep`). A selected raised way
   shows T9's **Deck height** (`clearanceCm`, the least soffit height over the ways it crosses; a value below volume 11's
   `raisedWays.structure.clearanceCm` for a crossed way's class bends up to it, `bend.raised.clearance`) and **Arch
   spacing** (`spanSpacingCm`, within the material's `pierSpacingM` band) steppers. Each is previewed, and once edited is
   held.
7. The bars are T-V9-51 and T-V9-60 (the effects), with T-V9-12 reading the new paths.

#### 4.20.7 What else a change does — the effects list (BCR-V9-27; V9C-56)

A preview's **fates** are the declared and held things an edit touches (§11.2); item 110's consequences reach things that
are not held — a generated route's detour, streets that now meet a ground way, a terminal that loses its water, arch
vaults with their buildings and drawn plans, buildings on a removed deck, households moved by new supports, retaining walls
re-laid by a terrace. BCR-V9-27 gives `PreviewResult` and `ApplyResult`'s `confirm` one typed list, `effects` (kind
`added` · `removed` · `rerouted` · `joined` · `lost` · `displaced` · `rebuilt` · `moved`, a `MsgRef`, its targets; at most 50,
then `effectsMore`), filled by the engine from the rows the owning volumes state, and a `holds` line for a suppressing
removal. The application renders it in four places, one list, one wording (the `effect.*` rows of V9 §4.9):
* **the badge** adds "and {n} other changes" with **Show**, which opens the list over the map; each row's Show highlights
  its targets;
* **the fates sheet** (V9 §5.5) gains a section **What else changes** after the fates, grouped by kind, virtualised with the
  fates;
* **the live region** reads the first three and "and {n} other changes" (V9 §4.15);
* **the clerk's card** reads the same list, filtered under the key (XV-V9-11; critique-V10's C10-53).
A gesture whose preview lists any effect commits on Accept (V9 §3.3). The bar is T-V9-60 (J-V9.64).

#### 4.20.8 Reaching what lies under a deck — the hit stack (BCR-V9-28; V9C-57, V9C-75, V9C-78)

1. **The answer.** `query({ kind: 'hit', … })` returns every mark under the point within the hit radius, top first by §8.2's
   draw order (a raised part above ground part 0), with the sub-part under the point (a raised way's span, a crossing, a
   stepped building's tier), ≤ 1 ms from the tile worker's hit-test slices.
2. **Click-again cycling** (J-V9.65). A click selects the top of the stack. A click on the already-selected thing, where the
   stack holds more, selects the next one down, cycling back to the top after the last; a click elsewhere starts afresh. A
   click on a selected raised way over one of its spans selects that span (`Selection.kind = 'part'`, path `spans/<n>`).
   The order on a viaduct over a street: the deck, the span, the arch vault (when walled up), the street. A double-click
   stays "zoom to the band". `hint.below` shows the first time a click lands on a stack of more than one mark.
3. **Select below.** The context menu lists **Select below: {name}** for every other entry (the keyboard route: Shift+F10 on
   the selection, V9 §4.4). By touch, a tap cycles as a click does and the long-press menu lists the same (V9 §4.12).
4. **Names** (V9 §5.14). T11 takes the top of the stack, and a second click the way beneath, so a viaduct and the street
   under it keep separate names; an aqueduct is named as any way is.
5. **Volume 10's `entity { at }`** returns the top of the same stack (critique-V10's CVR-V10-7).
6. The bar is T-V9-58.

#### 4.20.9 Item 110 on the Sky layer (V05 §3.22 (4), §4.1; V9C-60)

On Sky the tools act on the chosen island's arena with its `key` (V9 §4.2's sentence lists every row of V5 §4.1):
* **T2 Terrace** levels the island's ground and lays an island `RetainingWall` along its edge (BCR-V5-27); **T3 Retaining
  wall** draws one. A stroke of either on or along the rim strip is bent by the dry run inward past the rim walk (J-VI.4
  (g); V5 §3.22 (4)): every point of the stroke lying in the rim strip moves along the island's radial direction to 1 m
  inside the strip's `setback` line (XV-V9-25), named by `bend.retaining.rim` ("The rim walk stays level; the wall stands
  inside it.") with "Show me why"; the ghost shows the moved stroke pre-selected, as every bend (V9 §3.3), and the clerk
  and a skeleton get the same bend from the same dry run (SS-32; J-V9.76 withdrawn).
* **T3 Draw wall** lays V5 §3.21's barrier-closure enceinte walling only the landing yards, with V05's words.
* **T4** offers only the sky access (V05 §4.2); Raised and Aqueduct are hidden, since no raised part stands on an island
  (V05 §3.22 (3)).
* **T6, T8, T9, T10, T11 and T12** take their V5 §4.1 forms; `toolkit.json`'s `layers` name `'sky'` for T2, T3, T6, T8, T9,
  T10, T11 and T12.
* The disabled example on Sky is T4's Tunnel: "Tunnels are dug below the ground" (`disabled.onlyBelow`).

## 5 Rendering, labels, exports — the screens and the dialogs

The map itself is drawn by §8 in the tile worker; the application composes its tiles in the map region and draws, on the
main thread, only screen-space marks: handles, the count badge, the bend line, the snap highlight, the raw stroke while
drawing, readouts and hints (§9.5). Panels and dialogs are DOM, styled by the tokens below.

### 5.1 The frame, and the chrome's own look

**The frame (wide layout, reference viewport 1 440 × 900 CSS px, §12.5).**

| region | place and size | holds |
|---|---|---|
| top bar | full width, 48 px | the town's title and tier word (click to rename: the `title` label, §9.5) and the seed chip; the file menu (New town, Open…, Save a copy, Export skeleton, Rebuild around my drawings, Recently deleted, Settings, About; in host mode Export skeleton, Rebuild around my drawings, Settings and About only, V9 §2.2's `fileMenu: false`; SR3-02); Undo, Redo; the panel menu (Report, History, Gazetteer, Names, Notes, People when the module holds people); Share; Export; Help (?); Assistant (AI) when a clerk is configured and on |
| tool rail | left, 72 px wide (a label under each icon at UI scale 1) | the five layer groups and their tools (V9 §4.2) |
| options strip | across the map's top, 44 px, only while a tool is active | the tool's mode chips and basic parameters, "More" (V9 §4.5) |
| map region | the rest; `role="application"` (§14) | the composed tiles, the overlays (V9 §5.3), the empty state's overlay, the variations tray, the refusal card, toasts at the bottom centre |
| context panel | right, 360 px, when something is selected or a panel is opened | selection tabs (V9 §4.4), or the report, history, gazetteer, names or dress panel |
| view bar | map's foot, 40 px | working layer (Ground · Sky · Below, V9 §4.2) with the Below and Sky groups; the Map group (rotate, plots only, detail; V9 §4.19); Show (thematic views, V9 §5.4); View as (V9 §4.8); the Light group (day or night, sun mode, height, season, weather) with the clock (V9 §4.18); layer toggles (§7.8); the ruler; the scale bar and zoom; V06's timeline bar docks above it when the town has history. Groups that do not fit fold into a "More" menu, in the order Map, Light, layers |
| drawer | right, 400 px, over the context panel | the clerk (V9 §4.11) |

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

Type: the system UI stack (`system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif`) at 13 / 15 / 18 / 22 px
× the UI scale, line height 1.4; the map's labels stay in the bundled faces (§17.2), and T11's inline editor draws its
text in the label's own face and size so a rename is seen as it will print. A 4 px spacing grid; 6 px radius; no drop
shadows (rules instead). Icons: the twelve tools and the app-specific marks (ghost, badge, AI, tiers, working layers) are
our own 24 px SVG sprite; generic glyphs (close, undo, search, chevrons) come from one permissively licensed icon set
imported through one adapter file and credited in the notices (§17.4; J-V9.12). Motion: panels slide in 150 ms ease-out,
the ghost fades in over 80 ms; the reduced-motion preference (§14) removes both. Dark theme follows the system by
default (`AppPrefs.theme`); the map's style is independent of the chrome's theme (the `night` sheet is a map style, not a
chrome setting).

### 5.2 The empty state and a new town

The generated town fills the map region at §9.5's framing. Over it, top centre, a card on `chrome.surface` at 92 %
opacity: the line "Change anything: click it." (18 px), and three buttons — the dice **Surprise me**, **Choose a kind of
place**, **Open a town…**. Along the map's foot, above the view bar, the **Try another** strip: six 160 × 120 px proxy
thumbnails drawn in §8.5's distinct preview style with a "×" to dismiss the strip; hovering one shows its site and size in
words. The first click on the map, or any tool pick, closes the card; the strip stays until dismissed or the first
declaration. On narrow, the card is a bottom sheet and the strip scrolls sideways.

### 5.3 The overlays: ghost, handles, badge, bend line, refusal card, snap, tray, hints

* **Ghost** — §8.2's `live.ghost`: the derived shape and the plots and buildings it would make or move in the style's ink
  at α 0.5; while `PreviewState.stale`, α 0.25 with the previous shape. Things the ghost would remove are drawn as a
  dashed outline; things it would move as the outline at the old place and the ghost at the new, joined by a thin arrow.
  The **effective scope** (§7.3 item 1), when larger than the drawn area, is a dotted outline labelled "also rebuilt".
  **Item 110's ghosts** (V9 §4.20): a retaining wall's line with short ticks on its low side and a stair or ramp mark at each
  way it crosses; a terrace's levelled area as a flat tint with its walls; a raised way drawn above the ground's ghost with
  its supports' footprints, a small bridge mark at each way it crosses without a junction, its ramps or stairs at both
  ends, an aqueduct's arch mark where it passes a wall and its buried stretches dashed; a pier's, quay's or bridge's deck
  plots as faint outlines along the deck; a removed thing dashed, with its detour and new crossings ghosted.
* **Handles** — 12 px circles (22 px under a coarse pointer, with a 44 px hit area) in `chrome.surface` with a 2 px
  `chrome.accent` ring; the focused handle filled accent; a gate grip is a bar across the trace; a level handle a vertical
  double arrow. "More handles" is a small "+" beside the shape's handle set.
* **Count badge** — a pill at the ghost's anchor (§8.2's badge anchor): "42 plots · 180 households · 38 buildings", the
  tool's extras after a dot (V9 §4.5), then fate counts when any are not kept ("3 of your changes move"), then "and {n}
  other changes" with **Show** when the preview lists effects (V9 §4.20.7), with − and + buttons when the draft has
  `plusMinus`; below it, the bend line (`mark.bend` rule, 13 px text) or the one-line reason.
  While drawing, a **readout** follows the pointer (length, area, height, slope; R4).
* **Pending ghost's buttons** — Accept (Enter) and Cancel (Esc) under the badge.
* **Refusal card** — a card at the draft's last point with a `mark.refusal` left rule, the catalogue's text and one
  button per offered action; it closes when the draft changes or on Esc. It is never modal.
* **Snap highlight** — the candidate edge stroked 3 px in `mark.snap`, a 12 px label of its role beside the pointer.
* **Variations tray** — three 160 × 120 px thumbnails over the map's foot, the focused one ringed, "Show three more",
  and the declared-things line (V9 §3.6).
* **Toasts** — bottom centre, one at a time, 6 s (the Undo button extends it while hovered), stacked into a count when
  several arrive ("3 changes applied").
* **First-use hints** — a small callout anchored to the tool's button or to the ghost, with the hint's text and "Got it";
  it completes (`AppPrefs.hintsDone`) when the user performs the gesture or presses Got it, and never reappears.

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
V08 §6's; SS-41; SR-35; J-V9.105). One
thematic view at a time; the legend for it sits in the map's lower left, listing only the values drawn (§8.2).

**Shade** (item 102 (f)) is a new `base` live-layer provider, `live.shade` (BCR-V9-7): it reads the daylight-share raster
(V9 §2.7) and draws each field cell as a translucent veil over the ground and blocks — six steps of the style's ink at α
0 / 0.08 / 0.16 / 0.24 / 0.32 / 0.40 for shade shares 0–10 / 10–25 / 25–40 / 40–55 / 55–70 / 70–100 % of the day (our own
steps) — under the buildings' fills, so streets and yards read darker where they lie long in shade; the veil is this
volume's alone. Over it the view draws V05's rows as V05 states them (V05 §5.1; J-V9.53): each island's held strip
(`sky.island.shadeStrip`) as one solid ink line round the cells it shades for at least three of the nine sun samples,
labelled with the island's name, and, while an island has moved since its shade was last brought up to date,
`sky.island.shadePending` as a dashed line — so the veil's steps say how much of the day, the solid line whose shadow it
is, and the dashed line where it will move. The legend reads "Shade through the day" with the six steps, then "Under
{island}'s shadow for a third of the day or more" (solid) and "Where {island}'s shadow will move" (dashed), with **Update
shade now** (V05's `regenerate { kind: 'shade', island }`) beside a pending island's entry. Hovering reads "In shade {p} % of the day" in the readout, and
the "Why here?" card of anything in a shaded cell includes the shade row (V9 §5.8). The provider is a `base` target, so
it is part of the tile key (§8.8) and redraws only when the field or the view changes; it never changes the field.

**Supply links** (item 105 (j)) is a new `overlay` live-layer provider, `live.links` (BCR-V9-7), fed by `query({ kind:
'links', region })` (V9 §2.7): each link a quadratic curve from provider to consumer (its control point offset
perpendicular to the chord by 15 % of its length, always to the left of the provider → consumer direction), 1–4 px wide by
the good's volume, coloured by the good's family from the thematic palette in key order, with a small arrowhead at 60 %
of its length; dashed where the satisfaction is below 1 (beyond the comfortable distance, item 107 (b)); a pin dot at the
consumer end of a kept link; an impaired or at-risk SettlementForge chain's links at half width with a gap every 20 px, and
an entrepôt's end marked with a small square (item 105 (i)). With nothing selected, at the city band, the 150 highest-volume links in view are drawn
at 50 % opacity; at the district band and finer, every link in view up to 400 (the busiest first; the legend says "the 400
busiest of {n}"). With a use selected, only its links and its partners' are drawn, at full opacity. The legend lists the
goods drawn. A link whose end the key withholds is drawn to the plot without a name; a concealed use's links are not
drawn (the query filters them, §11.2). The links come from the generation worker's link cache (V9 §3.15).

**Show the whole circuit** (item 106 (g); J-V9.54) is an option of the wall layer, `LayerSpec.showCircuit` (BCR-V9-25),
toggled in the layer toggles and in T3's options: while it is on, S14 draws every committed enceinte's barrier arcs — the
stretches a cliff, gorge, marsh or shore closes — as a faint dashed line along the barrier with a small tick at each
anchor, so the enclosure reads whole after commit, not only in the wall tool's ghost. It serves the town and the village
products alike (V07 §5's palisade relies on it).

### 5.5 The fates sheet — confirming what moves

An action that returns `confirm` (§11.2) — a Re-derive, an Adjust of an early parameter, a regeneration over protected
things, discard-edits-in-scope, a town-wide New names, a pack change — opens the **fates sheet** (a sheet over the map,
never a blocking modal: the map stays pannable and every listed row can be shown). Its head: the action in words and
the counts per fate in plain words ("12 stay as you made them · 3 move with their new surroundings · 1 loses what it was
attached to"). Its body: the rows grouped by fate (`fates` paged by `query({ kind: 'fates' })` beyond 1 000, virtualised),
each with the thing's name, its kind and **Show**; then the renames, old and new text side by side; then **What else
changes** — the preview's effects (BCR-V9-27) grouped by kind, each row its `effect.*` sentence with **Show**, paged with the
fates, and a suppressing removal's `info.remove.holds` line at the head of the section (V9 §4.20.7). Its foot: **Do it**
(sends `confirm(h, token, fates, renames)`) and **Cancel** (`cancel(h, token)`); an auto restore point is written before a
whole-town action (V9 §2.8). A stale token re-opens the sheet with the fresh list and "Something changed while you were
deciding" (V9 §3.14). All renames are confirmed as a set (J-V9.8); a user who wants an old name back renames it afterwards.
A T1 Re-derive reaches this sheet only after its whole-town ghost has been accepted (V9 §3.3), never before a picture.

### 5.6 The history panel and the timeline

The history panel (V9 §4.10) opens in the context panel's place (H, or the clock icon in the top bar): the restore-point
chips across its head, the filter chips, in host mode the host's group "The party" at the head of the rows (V9 §4.10;
SR2-01), the day-grouped rows, the orphans section at the end, and, with epochs, the "Chronicle" tab. V06's timeline bar
docks above the view bar when the town has history (V06 §5.1): its thumb and the
history panel scroll together — scrubbing to a week scrolls the panel to that week's rows — and while the thumb is off
"now" the editing tools are disabled with V06's "viewing the past" band.

### 5.7 The other panels

* **Report** (§5.4, the "i" button in the top bar, and a dot on it when something was delivered simplified or left out):
  "What you asked for" — each requested feature with "made in full", "made simpler" or "left out" and its cause in words;
  "Couldn't place" — `unplaced` and `unserved` with Show; for a dossier-bound town, the placement state
  (`GenerationReport.dossier`, each entry by its `report.dossier.<state>` row with Show) and, under `host.group.standing`
  ("How the map reads SettlementForge's record"), the standing notes (`GenerationReport.dossierNotes`, V08 §4.6; SR-23),
  each line as V9 §4.10's note lines — its `msg` by the catalogue, **Show** on its `keys`' addresses (BCR-V9-36), a line
  with a withheld target not drawn (SR-22); "What moved" — the `changes` entries newest first, each by its
  `report.moved.<kind>` row (V9 §4.9) — in both lists each `{ id }` argument rendered under `effectiveKey()` as V9 §4.10's
  report-entry lines render theirs, a withheld one as its kind word and never a **Show** target (SR2-27); "Details" (collapsed) — the ladder uses with their replay keys, the
  kernel warnings, the stage timings (telemetry).
* **Gazetteer and "features in view"** (§14, §11.2): a search field and kind chips (districts, quarters, streets,
  buildings, institutions, people, water); rows with name, kind, district and a tier chip; selecting a row selects on the
  map and the reverse; withheld places show as "an unnamed {kind}" (§11.2 *Knowledge*); a collective record shows its
  member count (V9 §4.7); the people chip opens the People panel (V9 §4.18).
* **Notes** (the panel menu): favourites, the user's private notes, the public notes and the pins (V9 §4.19), each row with
  Show; "Add a pin"; a pin's label, note and colour edited in place.
* **Names** (T11's panel): the town's names by kind with rename in place, "New names" with its scope, the packs and a
  user's own name list (§10.4), the region groups, the leader-line switch (§9.4).
* **Dress** (T12's panel): style cards (a 120 px render of the current view in each style, drawn by the tile worker at
  the city band), the tint toggle, the furniture tray (each a toggle; dragging an item on the map places it; view state,
  §9.5), light, ground texture, lights, underlay; the grid, legend, emblem and compass controls (V9 §4.19); **New trees** and **New
  decoration** (V9 §4.5's T12 row; SR2-26); for the viewer
  role the style cards write the viewer's own `stylePreset`, never the town's style; **Edit this style…** opens the style
  dialog (§8.2's sheet rows by role, a colour picker per role with the contrast matrix's warning when a pair falls below its
  bar).
* **Advanced, tables, presets** — V9 §4.14.
* **Close-up** (V01's panel for an opened district) and **plan** (V03's plan panel, the storey switcher beside the
  building) render inside the context panel's district and building tabs.

### 5.8 The "Why here?" card

A `WhyCardModel` (V9 §2.7, projected from volume 10's `WhyAnswer`) renders as: the subject's name with its tier chip; the
`decidedBy` line; the **bars** — each a plain sentence with a horizontal bar whose length is its share against the
largest in the answer and whose side (left a push away, right a pull toward) is its sign, the target named and clickable
(**Show**), then "and {more} smaller reasons"; for a district, block or plot the **drivers** of its wealth as bars — the
shade among them, "In shade {p} % of the day" (item 102 (f)); for a wall the **closure** lines ("The cliff closes the
circuit from north-east to south-east", item 106 (g)); the **links** as "Buys {good} from {provider} ({m} m, near
enough)" and "Sells {good} to {consumer}", with the orientation in words and a split pair's other half; a record's
**members**; the **profile chips** with their sources (V9 §4.7); the **alternatives** as "Other sites it considered", each
drawn on the map as a faint numbered outline while the card is open; the **facts** with their tier chips and derivation
rows; the **dossier line** "Since week {w}: {reason}"; "Today the rules would put it elsewhere; it stays." when
`drifted`; then the **sections** (V9 §2.7; SS-15), each under its title (`why.section.<kind>`) with its rows as plain
sentences, their values in the user's units, tier chips and Show on a row's target — for an underground element its
depth, excavation reading and ways down (the `underground` rows, V9 §4.17.3's lines among them, with `info.under.deep` for
a deep sealed void); and for item 110's records (V9 §4.20.6) — a raised way's `raised` rows (its outcome in volume 10's
words with its values, the first as the `decidedBy` line), a dossier record that fed it as a `facts` row of tier
`dossier`; a retaining wall's "The ground was levelled here; it steps {m} m"; an
arch vault's "An arch of {way}, walled up as a vault" (V9 §4.17.6). A withheld target reads "somewhere the viewer doesn't know" (§11.2). **Ask the
assistant** at the card's foot (hidden without an enabled clerk) sends the card's question with its `WhyAnswer` on V10's
`why` entry (V9 §4.11). The card is a non-modal panel; it answers within V9 §6.3's budget.

### 5.9 Onboarding and help

* **First-use hints** — V9 §5.3; the order of appearance: T1's on the empty state's card, T5, T6 and T12's the first time
  each is picked, the others likewise, `hint.variations` on the first tray, `hint.restore` the first time the history
  panel opens, `hint.links` and `hint.shade` on the first use of those views, `hint.clerk` in the drawer's empty state,
  `hint.raised` the first time T4's Raised is turned on and `hint.below` the first time a click lands on a stack of more
  than one mark (V9 §4.20.8).
* **The guided first town** — offered once, on the empty state's second visit or from Help ("Show me around"), never forced
  and never re-offered once dismissed (`AppPrefs.tourOffered`): six steps of about 30 s each, each waiting for the user's
  own gesture — (1) click a building ("Every thing has a card"), (2) pick T5, drop one seed ("Paint a district"), (3) press +
  on the badge and Accept, (4) T6: drop a tavern near a gate, (5) T10: Try again on a block and pick a version ("What you
  made stays"), (6) T12: pick a style and add a compass. Each step's hint completes that tool's first-use hint.
* **Context help** (§14): every control's "?" opens its `@plat/docs` page in a side sheet; the keymap overlay (?) lists the
  current bindings, the user's overrides marked.
* **How do I …?** (SR-12) — Help's entry for asking the assistant, shown only when a clerk is configured and on: it opens
  the drawer on V10's `help` entry (V9 §4.11). Without a clerk, Help keeps its context help and the guided first town.

### 5.10 The export dialogs

One **Export** dialog (E, or the top bar) with five families as tabs; each tab's options are the format's §11.1 options in
plain words, with defaults that make the common case one click. Every tab shows, before anything is written, a **preview**
of the frame (a small render with the crop and, for VTT, the grid), the **estimate** ("about 12 MB, about 6 seconds"), what
the file shows ("What it shows: everything | what locals know | what anyone knows", and "what the players know" while a
host's players' view is set; by default the view's effective key, V9 §2.10, so "View as" carries into the file; lowered
only; BCR-V9-14; SR-08), and for a town with history the **year** it draws (V06 §5.3). **Export** runs V9 §3.10.

| tab | formats | options (defaults first) | file name |
|---|---|---|---|
| **Picture** | PNG (default), SVG (raised parts in their own group `layer.ground.raised`, BCR-V9-31 (b)) | frame: current view · whole town (§9.5's framing) · a district · the selection · draw a rectangle; size: screen (the view × 2) · A4 · A3 · A2 at 300 dpi (§11.1's print presets) · custom pixels; SVG text as outlines (default) or editable text; band: city (default) · district (with its size estimate, §11.1); light: as shown now (default; §8.4's fixed sun where the view uses the cursor) · fixed sun · the sun at an hour · night; background: paper · transparent; one PNG per layer (written as one `.zip`; the raised parts are their own PNG, so a user can drop the decks to see under them); furniture on · off; pins and public notes on · off (off by default); hidden caves and ruins (offered only at `secret` with the view's toggle on, V9 §4.17.1); **Animated history** (APNG; offered when the town has history, V06 §5.3): a stride of every epoch (default) or every N years, each frame captioned with its year, 2 frames a second, the frame size the picture's, capped at 100 MB by doubling the stride until it fits (the dialog says so) | `{town}-{frame}.png`, `.svg` or `.zip`; `{town}-history.png` |
| **Tabletop** | Universal VTT `.dd2vtt` (default), Foundry scene JSON | scope: the current view snapped to whole squares (default) · a district · draw a rectangle · a building's storeys (when its plan exists); the square: 5 ft = 1.5 m (default) or 1 m; pixels per square: 70 · 100 (default) · 140 · 200; the layer: ground · a sky island · below (a depth band) · a storey · a raised way's deck (picked on the map or from a list of those in scope; BCR-V9-31 (c)); light: day (fixed sun) · night; "Also save a plain picture for grid-by-name tabletops" (off) | `{town}-{scope}-{cols}x{rows}.dd2vtt` |
| **Map data** | GeoJSON (default), GeoJSON in metres | where on Earth: "No real place" (0°, 0°, the default) · latitude, longitude and the turn of north (§11.1's geo anchor, remembered per town in `exportAnchor`); trees: one group per wood (default) · one per tree · none; layers: checkboxes by model layer, with "Raised ways" and "Retaining walls" (both on; BCR-V9-31 (a)); include supply links (on when the link view is on) | `{town}.geojson` · `{town}.metric.geojson` + its sidecar |
| **3-D** | glTF binary (default), OBJ, CityJSON | scope: whole town · a district · the selection; terrain, trees and lights on · off; for CityJSON the geo anchor; raised ways, their supports and vaults, and retaining walls as BCR-V9-31 (d) writes them | `{town}.glb` · `.obj` · `.city.json` |
| **Files** | the town (`.plat`), a skeleton, statistics CSV (statistics, people, buildings), with history `chronicle.csv` and `uses-history.csv` (V06 §5.3), the full JSON, the compact twin, **Assistant conversation (JSON)** (V10 §5.3's transcript, with or without the user's messages; offered when a clerk session exists) | — (the full JSON, the `.plat` and the compact twin are offered only at the `secret` tier, §11.1) | `{town}.plat` · `{town}.skeleton.plat` · `{town}-{table}.csv` · `{town}-chronicle.csv` · `{town}-uses-history.csv` · `{town}.json` · `{town}.cbor` · `{town}.plat-clerk.json` |

**The tabletop details (R18; `research/ux/tool-survey.md` E4).** The scene exporter writes windows as open portals
(`closed: false`) and doors as closed ones, light colours as eight-digit colours with the alpha first, the grid before the
walls in a Foundry scene, and — when asked — the plain picture named `{cols}x{rows}` for tabletops that read the grid from
the file name (BCR-V9-15). When the scope passes the scene cap (8 192 px a side, §11.1) the dialog shows the grid of
scenes it will write, as numbered tiles over the preview, and offers the pixels per square that would fit one scene
(never below 50, §11.1); it also writes, checked by default, an **overview**: one PNG of the whole scope at 1 024 px on its
long side with the scene grid drawn and each scene's number in its corner, named `{town}-{scope}-overview.png`
(`research/ux/tool-survey.md` E4 (4)). **Raised decks** (BCR-V9-31 (c)): a ground-scene export whose scope crosses raised
ways also writes one deck scene per raised way (at most 8, the longest first, and the dialog says "{n} raised ways in
scope; writing the 8 longest"), named `{town}-{scope}-deck-{way}.dd2vtt` at the deck's mean elevation; the estimate
counts them, and a Foundry scene writes each as one more level with its elevation band. `{town}` is the town's name, lower-case ASCII with hyphens (a name with no ASCII letters falls back
to "town-{seed}"); `{frame}` and `{scope}` are "view", "town", the district's name, "selection", "area" or the building's
name.

### 5.11 The share sheet

**Share** in the top bar: (1) **Link** — the permalink with Copy when §6.4 allows one; otherwise the reason in words
(`share.*`, V9 §4.9) and **Download the town file**, plus "a short link from your changes" when the inline log of §11.5 fits;
(2) **Picture** — one PNG of the current view, "What it shows" defaulting to **what anyone knows** in this sheet (a shared
picture should not reveal secrets by accident; J-V9.13), changeable; (3) **Skeleton** — the declared subset, for another
person to build their own version from. A host that configures a publishing `DocResolver` adds (4) "Publish a link"
(§11.5); the standalone app has none.

### 5.12 Settings

Settings opens from the file menu's **Settings** in both modes — host mode keeps it (V9 §2.2's `fileMenu: false`; SR3-02)
— and at its Assistant section from the clerk's `openSettings` (V9 §4.11; V9 §3.14's clerk row).
Sections, each with Reset: **General** — units (metric · imperial), theme (system · light · dark), UI scale (100–200 %),
language (English; the catalogue's other locales when shipped). **New towns** — the `generation` preferences folded into a
new document (§7.6): style, size, name packs, labels on; "Apply my current preferences to this town" (V9 §4.14). **Editing**
— snap radius (4–24 px), handles (fewer · default · more), "Show three more" page size (fixed at three; not a setting),
the §13.4 fallbacks when the tests switch them on (keep / change toggle on re-rolls; touch editing of the fabric).
**Assistant** — rendered from and written to `ClerkSettings` (V10 §2.2) through `ClerkHandle.settings` / `setSettings`,
the one store (J-V9.34), and not shown when the host's `clerkMode` is `off` or `host` (the card-only drawer has no
settings): on · off; the key — a masked field with **Remember on this device** and V10's warning that anything
running on this site can read a remembered key, and **Forget key**, with its last verdict (`keyState`) worded as on the key
card (V9 §4.11); **Keep history** (off by default: conversations stay
in memory); the monthly cap and the per-turn cap in US dollars; preview first (default) · apply then undo (V10 §4.4); the
data notice with the date it was accepted and **Read it again**; **Problems found** — the device's defect records
(`ClerkHandle.defects()`, V10 §2.8), one line each with its date and its kind in words (`clerk.defect.<kind>`), with **Save
as file** (JSON) and **Clear** (`clearDefects`), or `clerk.defects.none` (SS-08); in host mode the fields the host forces are shown locked
with `host.locked` ("Set by {host}", read with `HostSlots.hostName`; SR2-18). **Accessibility**
— reduced motion (system · on · off), high-contrast chrome, large targets, the long press (300–1 000 ms), "announce previews" (the live
region, V9 §6.3, on by default). **Keyboard** — the keymap with rebinding (§14). **Storage** (standalone only: host mode has no local store, so V9 §2.2's
`fileMenu: false` drops the section; V9 §3.8 (6)) — the local towns with
their sizes and last-opened dates; **Delete** moves a town to **Recently deleted** (J-V9.51), where it stays 30 days with its
snapshot and journal, listed with its deletion date, **Restore** and **Delete now**; "Download all my towns" (a `.zip` of
`.plat` files); **History** — the history store's memory (256 MB on a desktop, 96 MB on the low-end tier) and the frames
kept in memory (8), V06 §2.2's device settings, which change what is cached, never what is drawn.
**About** — the generator version, the output version and the schema version (§6.4), the notices of every bundled
library (§17.4), the fonts' licences (§17.2), and the sentence "Your towns stay on this computer unless you export or share
them."

### 5.13 Open, recent and new

**Open a town…** (ctrl / cmd+O): a grid of the recent towns (thumbnail, title, tier word, last opened, size), sorted by last
opened; **Open a file…** (the OS picker, `.plat`, `.cbor`, skeletons); **Paste a link**. Drag-and-drop of a file anywhere on
the window opens it (an image offers "Trace over this image?" as an underlay). **New town** opens the empty state in a new
document. A town opened from a file is added to the local store on its first edit (so opening a file to look at it writes
nothing).

### 5.14 Labels in the application

Map labels are §9's; the application adds no label entity. T11's inline editor opens over the label at the label's own
face, size and curve (the per-glyph positions S13b computed, §9.2) so the typed text is seen in place; Enter commits
`setAttr(name)` (or `displayText` for a dossier-owned name, §9.1), Esc cancels; a longer name re-flows by S13b after the
commit. **T11 on a raised way** edits that way's name: the click takes the top of the hit stack and a second click the way
beneath, so a viaduct and the street under it keep separate names (V9 §4.20.8); an aqueduct is named as any way is, by
§9's way names or by typing; the placement is §9's. Region groups are created by selecting quarters and **Name as region**; their labels draw at the city band above
the city cut (§9.1). The chrome's own text (buttons, panels, messages) is DOM text from the catalogue and never enters the
map's label engine.

### 5.15 Every new thing: drawn, labelled, exported, persisted

| thing (V9 §) | drawn | labelled | exported | persisted |
|---|---|---|---|---|
| `siting.declared`, `siting.linkEdits` rows (2.6; V11's tables) | through their effects: the link view's pin dots and crossed stubs; nothing else of their own | in the why card's chips ("yours"), the per-kind panel and the Links tab | as the document's override layer in the `.plat` and the skeleton (V11 §4.2); GeoJSON carries `plat:links` (the use's declared link rows) on the use's building features | the log (`editTable` events) |
| link rows (2.7; derived) | `live.links` (5.4) | the legend by good; the Link card | GeoJSON: with "include supply links", one LineString per link in view scope, `kind: 'supplyLink'`, `good`, `consumer`, `provider`, `satisfaction`, `declared` | never (recomputed, item 105 (a)) |
| the shade raster (2.7; derived) | `live.shade` (5.4) | the legend; the readout | a picture export while Shade is on draws it (a base live layer in the tile key, §11.1's live layers named in the export's layer set) | never (the field's driver, recomputed on load) |
| a record's members (4.7; `EntityCard.members`) | outlines while a record is selected | the panel's list | the members are ordinary buildings in every export | the model (their buildings) |
| restore points (2.8) | chips in the history panel | their names | inside the `.plat`'s view section only | the document's view section |
| `showUnexcavated` (4.17.1) | V04's unexcavated style while on, at `secret` | the legend's "Not yet found by anyone in town" | a picture at `secret` with it on; never below `secret` | the view section, per viewer |
| the ways down's causes (4.17.3) | the access symbol by cause; "Show the way in" as `live.selection` | the panel's lines | GeoJSON's `cause` on every access and link (V4 §5.5) | the model (V04's records) |
| the catacomb, crypt and cemetery panels (4.17.5) | the extent chart; the ossuary fill by V04's program | the panels' sentences | GeoJSON's complex feature (V4 §5.5) | the model (V04's and V03's records) |
| `live.coverage`, `live.voids` (5.4) | overlay tints and outlines | the legend | a picture while the view is on | never (derived) |
| the Show menu's **SettlementForge's chains** (5.4; SS-41) | V08 §5.2's `supplyChains` thematic row while `thematic` is `supplyChains` | the legend and the gazetteer by V08 §5.2's row (SR-35) | GeoJSON: V08 §5.2's `supplyChain` LineStrings, under its knowledge rule; a picture while the view is on | never, but the per-viewer view key `thematic` (the records are V08's, in the model) |
| `LayerSpec.showCircuit` (5.4) | barrier arcs dashed with anchor ticks | — | pictures draw it while on | the style's layer spec (`setLayer`, logged) |
| the People panel, the family tree, where-is pins (4.18) | panels; home and work outlines; a pin | the panels' rows | the people CSV (§11.1) | never (queries) |
| notes, pins, favourites (4.19) | pins as markers with their colour; notes in panels | a pin's label | public notes and pins inside the `.plat`'s view section; never in pictures unless "Show pins" is on in the Picture tab | the view section |
| Recently deleted (2.11) | the Storage section and the file menu's list | the town's title | "Restore", then any export | IndexedDB, 30 days |
| drafts, previews, variations (2.4) | the ghost, tray, badge | the badge | never | never (the draft mirror only, locally) |
| the message catalogue, `toolkit.json` (2.3, 2.9) | the chrome | — | `@plat/docs` generates the tools' and messages' guide pages from them — the messages page with one anchor per row, `messages#<key>` (the `page` a `why` carries for a row: V10 §3.5 step 3's default target), and one page per staged layer §7.3 item 9 (d)'s F-EDIT can name, `staged/<layerId>` (what the layer is and the milestone that ships it, from the base's staged table; `refuse.staged`'s `page`) (SR5-07 (c)) | `@plat/tables` |
| preferences and the local store (2.11) | the settings screen | — | "Download all my towns" | IndexedDB |
| item 110's ghosts, handles and badges (4.20) | the ghost's marks of 5.3; the `rampEnd`, `terraceLevel` and `tierStep` handles | the badge's lines | never | never (session) |
| the effects list (4.20.7) | the badge's count; the fates sheet's "What else changes"; the clerk's card | the `effect.*` rows | never | never (per preview) |
| the hit stack and part selection (4.20.8) | the selection outline of the entry chosen | the context menu's "Select below: {name}" | never | never (session) |
| retaining walls, raised ways, spans, arch vaults, deck plots and tiers (the base's and volumes 2 and 4's records, as V9 §4.20 edits them) | §8 (the base's drawing: the low-side ticks and shadow, the raised part above ground part 0 with its shadow) | §9 (a raised way is labelled like any way; T11) | GeoJSON, SVG, PNG, VTT (a deck scene per raised way), glTF and CityJSON by BCR-V9-31 | the model; their edits in the log |
| a removal's suppression (4.20.3) | nothing (the thing is gone); the history row's dashed former outline while hovered | the history row and `info.remove.holds` | the skeleton's removals (BCR-V9-32) | the log (BCR-V6-24's `detail.suppress`) |
| the second fixture's canvas script (7.2) | — | — | the test tree | the test tree |

## 6 Performance budgets

All figures are for the reference machine and viewport of §12.1 and §12.5 (1 440 × 900 CSS px at device pixel ratio 2),
p95, PLAUSIBLE until measured at the milestones of V9 §8; the model-side costs they add up are §12.3–§12.7's, cited, never
restated as new laws. METROPOLIS takes the same scoped budgets within ± 20 % (§12.6's scope invariance) except where a row
below names its own METROPOLIS figure (T1's Re-derive and T12's re-raster follow whole-town laws); TOWN takes them or less.

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
| T7 roster — one solve of N lines (≤ 30 ms + 25 ms per line at CITY) | ≤ 30 + 25 N ms | 20 lines ≤ 650 ms (the "working" ring shows past 1 s, V9 §3.14) |
| T10 hold — a block's New random with variations | ≤ 40 ms | ≤ 160 ms |
| T12 dress — a style change (the view's re-raster, §12.5's settle) | ≤ 150 ms at CITY; ≤ 250 ms at METROPOLIS (§12.5's METROPOLIS settle) | — (at once on click) |
| T9 family strip — F feasible families, each a single-plot dry run (≤ 5 ms model + ≤ 2 ms deltas, §12.6) on the derivation pool's ≤ 4 workers, then F thumbnails at ≤ 15 ms each in the tile worker | ⌈F ÷ 4⌉ × 7 ms + F × 15 ms: ≤ 134 ms for F = 8 | the strip complete ≤ 150 ms after the building is selected (its thumbnails appear as they land) |
| T1 intend — in the empty state, a new town (§12.5's first-map law: 124–145 ms at the default TOWN, 0.33–0.42 s at the default CITY); after a declaration, a Re-derive's whole-town ghost (§12.3's model law from the named stage) | ≤ the model law + 16 ms compose; ≈ 2.3 s at METROPOLIS's top (§12.5) | the working ring past 1 s; the ghost at the law's figure (V9 §3.3) |
| T4 with Raised or Aqueduct — a course of L km over built land (the course solver, the supports, the strip's re-plot, the vaults offered; V9 §4.20.2) | ≤ 60 ms + 60 ms per km at CITY; the same law at METROPOLIS, the working ring past 1 s | ≤ 180 ms + 60 ms per km; a course over 3 km previews on release (V9 §3.14) |
| T3 Retaining wall (V9 §4.20.1) | as T3's row: ≤ 110 ms | ≤ 230 ms |
| T2 Terrace — the levelling of ≤ 60 plots and its edge walls (V9 §4.20.1) | ≤ 90 ms at CITY; ≤ 110 ms at METROPOLIS | ≤ 210 ms; else preview on release |
| Delete of a generated raised way — the detour's re-route, the freed land, the vaults (V9 §4.20.3) | ≤ 120 ms at CITY; ≤ 60 ms + 60 ms per km at METROPOLIS | ≤ 240 ms at CITY, the working ring past 1 s; nothing commits before Accept |
| T6 on a deck plot (V9 §4.20.4) | as T6's row: ≤ 56 ms | ≤ 180 ms |
| T9 tiers — a stack's re-lay (V2 §6.5: ≤ 2 ms model) (V9 §4.20.5) | ≤ 26 ms (T9's row) | ≤ 150 ms |
| the hit stack (BCR-V9-28; V9 §4.20.8) | ≤ 1 ms per click at every rung | — (no settle) |

While the hand moves, the previous ghost stays at α 0.25 (never a blank) and the raw trace follows at L-trace; a terrain
brush shows its footprint and a local hillshade of the stroke's kernel alone, computed on the main thread in ≤ 2 ms per frame
from the stroke's radius and amount (no model read), until the settle's preview replaces it. **Measurement:** the app
harness replays each tool's canvas script (V9 §7.2) 50 times at TOWN, CITY and METROPOLIS band tops on B-CITY-lite seeds
(M2a for T9–T10, M3a for T2–T8, M3b for T11–T12) and fits p95 — with the item-110 canvas scripts, the second known-city
fixture's among them, at the CITY and METROPOLIS band tops (M3a); pass: each within its row + 10 %. **Pre-decided fallback:**
a tool that misses previews on release only (§12.6's fallback), fixed at the milestone for that tool and rung and
reported; if T5 or T6 still misses on release, its dry run gains §12.3's single-worker exemption from the pool queue
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
  times are our own and calibrate-later at M1 (V9 §8).
* **Offline** — the app is an installable web app: a service worker caches the shell, the worker bundles, the fonts and
  the stamp tiles (§8.10) at first load, so every later open, every tool and every export works with no network; only
  the clerk (volume 10) and a host's publishing resolver need one (J-V9.11).
* **The page's `connect-src`** (V10 §3.17's connect rule; CVR-V10-4). The standalone application's content security policy
  lists the page's own origin and, only in a build that ships the clerk's configuration A, the provider's API origin;
  nothing else is reachable. A build without A lists no model origin, and the drawer then shows V10 §3.17's unavailable
  reason. The embed's policy is V08 §3.1's.

### 6.3 Panels, dialogs and the assistive route

* Any panel or dialog opens (first paint of its content) ≤ 100 ms after the click; every interaction's next paint ≤ 200 ms
  at the 75th percentile across the scripted tasks (the "good" bar for interaction-to-next-paint).
* The gazetteer's results ≤ 100 ms after the typing pauses (150 ms debounce not counted); a `query` page ≤ 64 KB (§11.2).
* The fates sheet's first page ≤ 150 ms after the `confirm` result; the history panel opens ≤ 150 ms with 10 000 rows
  (virtualised; rows rendered on scroll ≤ 4 ms per frame). A dossier group's lines (V9 §4.10; SR-22) are built when the
  group first opens: its report entries from the already-held `report(h)`, one `entity` query per distinct address its
  report-entry lines name (SR2-27) and one per distinct note key
  (BCR-V9-36), batched and cached per effective key — ≤ 50 ms for a group of 100 notes on the reference machine; a closed
  group builds nothing.
* A why card ≤ 100 ms after the click: the `why` query ≤ 50 ms at CITY (a read over provenance and the derivation record,
  and a re-score of ≤ 3 alternatives at §12.6's placement bound), rendering ≤ 30 ms.
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
* **Supply links** (`live.links`, the link cache of V9 §3.15) — the full bind once per `logHead`: one nearest-provider
  lookup per (consumer, good) through the solver's provider index, ≈ 2 µs each; at METROPOLIS (≈ 6 000 uses, ≈ 3 goods
  each, V06 §6.1's sizes; 35 000 buildings) ≤ 120 ms in the generation worker, in the background after the first map;
  an edit's incremental re-bind ≤ 5 ms per scoped edit; the `links` query ≤ 5 ms per page and ≤ 20 ms for ≤ 400 links in
  view at CITY; marks ≤ 2 ms; the overlay composes without a re-raster (§8.2's `overlay` target). Measured at M3a, with the link view (AP3); the
  pre-decided fallback, if the full bind misses: bind lazily by view region, cache per region.

### 6.5 Autosave, storage and memory

* A journal entry ≤ 2 ms of main-thread work per phase (the call's structured clone; the IndexedDB writes are
  asynchronous) and never delays the next gesture; a compaction runs in the generation worker (`export(h, 'plat')` ≤ 250 ms
  at CITY, ≤ 900 ms at METROPOLIS's 8 MB document, measured at M2a and M3a) only when idle (V9 §3.8 (2)), so it never
  stalls a preview during active editing; a gesture that starts during one shows the working ring.
* **Go back to here** costs the sum of its targets' undo-record costs (§7.4, each O(its scope)); ≤ 1 s for 100 typical
  scoped edits at CITY, with the progress bar of V9 §3.9 past 1 s.
* Storage per town: §2.9's document budget for the snapshot (CITY ≤ 3 MB) + the journal (≤ 50 entries, typically ≤ 200 KB)
  + a 256 px thumbnail; the store warns at 80 % of the browser's granted quota.
* Memory beyond §12.8's lines: the shell ≤ 60 MB (DOM, the overlay canvas, thumbnails, the history's virtualised window);
  three variation overlays ≤ 3 × the scope's undo-record size (§7.4: O(scope)); three thumbnails ≈ 0.9 MB at DPR 2.

### 6.6 Touch

Long press 500 ms; pinch and two-finger pan at §12.5's pan rates (≥ 60 fps reference, ≥ 30 fps on the low-end device of
§12.1); a handle drag under a finger meets L-trace. **Measurement:** the M2a and M3a first-five-minutes sessions' tablets
record the telemetry (with the participants' consent, kept on the session machine only).

## 7 Tests and acceptance bars

Every bar runs in the app harness of §13.4 (Playwright on the reference machine of §12.1; Chromium, Firefox and WebKit
where the bar says "three engines") unless it names another bench. "Canvas script" is V9 §3.12's gesture list. Bars
T-V9-3, -4 and -29 to -31 are milestone exit criteria (V9 §8); the rest run on every pull request.

### 7.1 The bars

| id | what it checks | pass | milestone |
|---|---|---|---|
| T-V9-1 | the empty state (V9 §3.2): first run shows a finished town with the overlay line and three buttons, no form; the first declaration ends the empty state; from M3b, the proxies after idle | the first map within §12.5's law + 100 ms; Enter before any declaration replaces the town, after one makes a new document (two documents in the recent list); from M3b the six proxies within §7.8's budget | M1 (shell), M2a; M3b (proxies) |
| T-V9-2 | R1 — no dialog before a first ghost | for every tool mode's canvas script — T1 after a declaration among them — no element with `role="dialog"` or `alertdialog` opens between pointer-down and the first `live.ghost` delivery; T1's fates sheet opens only after Accept | M2a, M3a |
| T-V9-3 | the latency budget (V9 §6.1) | stop-to-ghost p95 per tool within its row + 10 % at TOWN, CITY and METROPOLIS band tops — the item-110 rows on their scripts at CITY and METROPOLIS — or the pre-decided fallback applied and reported | M2a (T9, T10), M3a (T2–T8 and item 110's rows), M3b (T11, T12) |
| T-V9-4 | L-trace and L-snap | ≤ 1 frame and ≤ 2 frames p95 over a 2 s scripted drag per tool; main thread ≤ 4 ms per frame | M2a, M3a |
| T-V9-5 | the count badge is true | the badge equals `PreviewResult.counts`; after Accept, the committed model's plots, households and buildings of the declared thing equal the badge exactly | M2a |
| T-V9-6 | declared means held, as the user sees it | declare a quarter and a tavern, then Try again on a block inside the quarter, **New trees** (T12; `rerollLayer` of `render.instances`, town-wide; SS-29) and **New decoration** (T12; `style.jitter` then `style.crowns`, one group, one undo step; SR2-26): every declared entity keeps its leaf digest, and New decoration changes no model digest; the tray shows the declared-things line; Try again's chip row offers no layer chip | M2a; the New trees and New decoration steps at M3b (with T12, AP4) |
| T-V9-7 | variations | for each source (fill, a density, greenery and prosperity brush, a quarter's fabric, a scoped New random): three thumbnails of distinct content digests; Accept commits V9 §3.6's group for that source; a replay of the log gives the accepted variation's model digest; "Show three more" gives three new distinct ones | M2a (New random), M3a (the rest) |
| T-V9-8 | snapping | on fixtures, a T3 end within 8 px of a cliff edge, a T4 end near a junction and a T5 corner near a street centre-line resolve to the snap target's point in the stored event; with Alt held they do not; the role label shows | M3a |
| T-V9-9 | the wall ghost and natural barriers (item 106 (g)) | on item 106 (h)'s river-loop and cliff-backed fixtures, the ghost's barrier arcs' total length equals the committed enceinte's barrier-closure length within 1 m, the badge's walled length the committed wall's within 1 m, and every anchor tower ghost becomes a committed tower | M3a |
| T-V9-10 | handles | every closed derived shape shows 4–8 handles by default and 8–16 with More (k by V9 §3.5's rules); each handle kind's drag emits V9 §3.5's event; a boundary handle drag's `drawBoundary` polygon differs from the resolved ring only between the moved handle's neighbours, and it changes only the plots along that run (the locality oracle, §7.3 item 7 (ii)); a lake shows no rim handle | M3a |
| T-V9-11 | the canvas is deterministic | one canvas script, each gesture replayed at its recorded view scale and centre, on the three engines, at 1 440 × 900 and 1 024 × 768, at DPR 1 and 2, yields one model digest | M3a |
| T-V9-12 | the tool binding is complete | a walker over the `EditEvent` union (the base and the volumes as revised) and §2.8's registry reads `toolkit.json`'s modes' `emits`, the `HandleSet` kinds' emits (V9 §3.5), the context panel's and the context menu's generated controls: every kind is emitted by one of them or is on V9 §4.3's host-only / API-only list — item 110's forms read by their discriminating fields (`drawWall.kind: 'retaining'`, `drawWay.raised`, `class: 'aqueduct'`, the `terrace` sugar, `setMassing { op: 'tiers' }`, the `spans/<n>/use`, `crossings/<wall>/form`, `clearanceCm` and `spanSpacingCm` paths); every entity kind's editable path has a control; a new kind without either fails CI; and each mode's `emits` lies within its tool's entry of T101-1's registry — §7.1's toolkit row as the requests amend it (T6's one-line `roster` by BCR-V9-35) plus the kinds a volume registers under that tool — so T101-2 holds on the canvas side as T-V10-1 holds it on the clerk's (SS-13); and a T6 drop at a point emits `placeAt { plot: '', from: { points: [p] }, designation }`, byte-equal to V10 §4.1's `where.at` encoding of that point, while "this plot only" emits the plot under it (T101-3; SR-09); a way's **Split here** and **Join these** are T9's (V9 §4.3; SR-27), emitting `split { id, cut: [p] }` at the nearest centre-line point and `merge { ids }`, byte-equal with V10 §4.1's T9 way forms; T11's **New names** in its three scopes and T12's **New emblem**, **New compass**, **New trees** and **New decoration** write V9 §4.5's bytes — the scoped forms `salt: 0` with `ids` in address order, the town-wide ones the concern's `DisplayList.salts` value + 1, New decoration's two as one group in registry order — which T-V10-4 compares with the clerk's encoders (SR-29); and every rerollable concern of §6.1's registry (`naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem`) is written by a control, a concern no control writes failing CI (SR2-26) | M2a on |
| T-V9-13 | refusals and bends are actionable | each F-EDIT reason, `ConflictAction` kind and bend of a fixture list — the bends of J-VI.4 among them (`bend.stack.*`, `bend.raised.*`, `bend.aqueduct.*`, `bend.retaining.rim`, formerly `refuse.*`) — renders its catalogue row; every refusal row carries at least one button and every bend its pre-selected alternative where the row names one; each button yields a preview that is `ok` or a new bend; on a dossier-bound fixture a T6 locus drop naming no element renders `refuse.roster.dossier` with the element picker and **Put it at {site}**, the picker's pick previews the line with its `element`, and Put it at {site} previews `ok` on the first candidate of V9 §4.5's `sites` query — the plot the clerk's `dossier` alternative names for the same locus (SR-10); when none of the three candidates is free of hard fails, the card shows the element picker without **Put it at {site}** (SR2-11); on a T7 list on the same fixture, a line committed naming no element renders `refuse.roster.dossier` on its card with the picker and **Put it at {site}** by the same query (`near` and `district` from the line's locus, both omitted for a line with none), its plot equal to the clerk's `dossier` alternative for the same line (J-V10.93; SR3-03); the card's `{thing}` is the line's name, or the class's display label when the name is `''`, and its `{locus}` V9 §4.16 (6)'s wording (`in` and the settlement's name for a line with none), which (4) parses back to the same `Locus` for every named locus target of the fixture (SR3-04); for each word declaration of V9 §4.15 — T5's seed, T4's two points, T3's two ends — the point written is the named target's `EntityCard.anchor`, equal to volume 10's resolution of `{ at: target }` for the same words (V10 §3.6 rule 1), and the canvas's events are byte-equal to the clerk's encoding of the same words (T101-3; SS-31); an `assign`, and a `rejectSite` whose re-placement no plot satisfies inside the hard rows, render `refuse.assignment.noSite` with the `moveTo` places marked, and **Put it at {site}** previews `ok` or a new bend on the first `moveTo` target (SR-30); every `show` `arg`, `subject` and `page` template of a fixture row finds its argument in the dry run's `MsgRef` — the arguments the text does not show among them (`thing`, `building`, `crypt`, `layer`, `layerId`) — and every `commit` button of a fixture row, from each source and each event form it names, previews `ok` or a new bend with exactly the events V9 §4.9's forms state (SR5-01) | M2a, M3a |
| T-V9-14 | no dead ends | 1 000 random gestures (a random tool mode, random points in the frame) on B-CITY-lite seeds: 0 end with neither a ghost nor a refusal card; 0 uncaught errors | M3a |
| T-V9-15 | the words | every code the engine can emit (the enums of §5.2, §11.2, §6.4's conditions, V08's port notes, V04's causes and `blockedBy`) has a catalogue row; every event kind of the base and volumes 1–8 has a history template, and each item-110 variant one by its discriminating field (V9 §4.10), `history.dossierFacts.creation` among them; every `ReportEntry.kind` (with `disruption`'s two forms and `works`'s three ops) has its `report.moved.<kind>` row and every `GenerationReport.dossier` state its `report.dossier.<state>` row, and F-EDIT's kept assignment case its `refuse.assignment.noSite` row (SR-22, SR-30); every row ≤ 25 words, Flesch–Kincaid grade ≤ 8 by our own script, and free of "error", "invalid", "conflict", `E_…` patterns and ids; the same readability step runs over the rendered V10 refusal and critique templates and V11's `says` and `reason` sentences, and a failure is reported to that volume's table; every key of V9 §4.9's explanation families — `critique.K1`–`K18`, `refuse.clerk.*` (one per `RefusalCategory` value but `lock`, `rule` and `role`, the `key` row's three verdicts and `refuse.clerk.dossier.count` among them; CVR-V10-17; SR4-04 (e)), `clerk.notice`, `clerk.alt.*` (one per alternative of V10 §3.16's rows and per harness button V10 §2.6's `label` comment names; SR4-02), `clerk.view.cleared`, `clerk.applied`, `info.raised.<outcome>` for the ten outcomes, `info.under.*` with `info.under.cause.<rule>` per `AccessCause.rule`, `info.catacomb.*` per `source.kind`, state, burial-face outcome and `blockedBy` value, `info.crypt.*`, `kind.<registry kind>` per withheld kind — and `why.section.<kind>` per registered section has a row in every shipped locale (the walker T-V10-29 shares; SS-16); `clerk.alt.*` has one row per key V10 §5.4's list of the drawer's keys names (`clerk.alt.stale.retry` among them; SR5-07 (b)); `info.copy.condensed` has its row, its text V6 §3.15.5's line (SR5-04); **the buttons** (SR5-01): every row that offers a button carries its `buttons` list in `en.json` and no locale file carries `buttons`, `tone` or `codes`; every button's `key` is a `button.*` row, and every `button.*` row is named by some row's list; every `commit` names a source (a `ConflictAction` kind, `alternatives` with an `each` row, `unplaced`, or `event` with a form of V9 §4.9's event forms), every `tool` button a `ToolId` and a `ToolModeRow.id` of that tool in `toolkit.json`, every `app` button an `AppCommand` of V9 §4.9's list; every `refuse.*` row of V9 §4.9's table ends with `button.showWhy`; no `bend.*` row and no `refuse.*` row whose codes a dry run answers carries an `app` button; and each `ConflictAction` kind a `commit` carries has its `msg.key` equal to that button's `key` | M1 on |
| T-V9-16 | history and restore | a 300-edit scripted session: "Go back to here" at 5 random points gives the model digest of a replay of the log prefix to that point; "Undo going back" restores the head's digest; "Open a copy from here" gives a document whose digest equals the prefix's | M2a (go back), M4 (copy, with V06's `forkAt`) |
| T-V9-17 | autosave and crash recovery | 50 trials of a 200-edit session killed at a random commit, each after the worker's commit and before the journal's `done` write: the reopened town's digest equals the last committed head in 50 of 50; 10 trials killed between a fates-sheet `confirm` and its `done` write recover the confirmed action; a corrupted journal entry stops recovery before it with `error.recoveryPartial` | M2a |
| T-V9-18 | the draft mirror | a crash mid-quarter reopens with the offer; accepting restores the draft's points and params exactly | M3a |
| T-V9-19 | exports | every tab's every format writes a file on B-CITY-lite TOWN and CITY; the estimate within ± 30 % of the actual size; the model digest and log unchanged by any export; a `public` picture holds no withheld name in its text, `aria-label`s or metadata; the VTT file carries open windows, alpha-first colours, the grid first in the Foundry scene and, when asked, the `{cols}x{rows}` picture | M3b |
| T-V9-20 | share | each of §6.4's refusal conditions shows its `share.*` row and offers the file; an allowed town's link rebuilds the session's digest | M3a |
| T-V9-21 | accessibility | axe-core: 0 serious or critical on every screen, panel, sheet, drawer and overlay state; the four first-five-minutes tasks and §13.4's scripted tasks completed keyboard-only; each preview announced once per settle; no focus trap — Tab past the last handle reaches the context panel, shift+Tab before the first returns to the map, Esc drops handle focus; 200 % UI scale with no loss of content | M1 (shell), M2a, M3a, M3b |
| T-V9-22 | touch and small screens | on a coarse-pointer medium emulation every tool of V9 §4.12's list completes its canvas script with touch events; on narrow the withheld tools show `refuse.phone`; a long press opens the context menu; a second finger places freely | M3a |
| T-V9-23 | the shade view | on item 102 (g)'s island fixture ≥ 90 % of the island strip's cells draw in the two darkest steps; toggling the view changes no model digest; the legend lists only the steps drawn | M3b |
| T-V9-24 | links and link edits | a fixture with one bakery and two mills: Keep → a `siting.linkEdits` row `{ bindTo }` and the `links` query binds the kept mill; Cut → `{ avoid }` and the other mill serves; Stop buying → `{ cut: true }` and no link; Reset deletes the row and the nearest serves; each undo exact; the why card's links list the link; at `public` a concealed use's links are absent | M3a |
| T-V9-25 | siting overrides | the tannery kind's `nuisance` set to Ignore in its per-kind panel: a `siting.declared` row with `familyWeights.nuisance = 0` under the kind's key; the next placement's why card shows no nuisance bar; placed tanneries stay and are listed with the score they would gain (V11 §4.3); "Show better sites" lists ≤ 3; a relocation accepted and undone restores the digest | M3a |
| T-V9-26 | records | on B-DOSSIER-lite's fixtures, selecting a COUNT or GUILD record outlines exactly its `EntityCard.members` and the panel's count equals the model's | M3a |
| T-V9-27 | the clerk drawer | with a scripted test clerk (a `ClerkHandle` that emits fixed `TurnView`s): no proposal commits without Accept, or without apply-then-undo switched on; an accepted proposal carries `proposedBy: 'clerk'` and author `user`; every `ReplyBlock` kind renders and every `ClerkAction` kind runs its action; each turn shows its cost and the month's tally; the first opening shows the label, the notice and the key in that order; "Undo the assistant's last change" undoes exactly that group; a viewer sees no proposal; `AppPrefs` holds no clerk field; New topic closes the live segment (the next turn opens a new one); the key card shows each `setKey` verdict (`ok` closes it, `invalid`, `noCredit` and `noAccess` their sentence, `unchecked` its note); the settings list the defect records with Save as file and Clear; each `ClerkAction` kind is dispatched by V10 §2.6's table — the seven the application runs by the shell, `propose`, `undo` and `rebuild` through `run` (SS-08); a `why` opens the card or page the canvas's **Show me why** opens for that row; every `action` button shows its `label`, a labelled `select` its label and an unlabelled one its ids' chips; a stale card shows `refuse.stale` with **Ask again**, a host's stale card without it; an applied card shows `clerk.applied`, a key change `clerk.view.cleared`, and a viewer's declaration `refuse.viewer` (SR4-05); for every bend and refusal row of T-V9-13's fixture the drawer's card and the canvas's card carry the same buttons in the same order, both read from the row's `buttons` (`commit` → `propose` with the canvas's bytes, `why` → `why` opening the same card or page, `show` → `select` of the same ids, `tool` → `useTool` with the same `mode` and, for `subject`, the same ids, `drop` → **Drop**), with no `app` button on either; a `useTool` with a `mode` opens that tool in that mode on the mode's working layer with its `ids` selected (**Add a way down** opens T6's `access` mode on Below); and a `fork` block, and a `rerun` block, whose seq lies below a rebased document's `base.seq` make a copy whose `forkedFrom.seq` is the earliest seq, its opening toast ending with `info.copy.condensed` (saved, in host mode, with `info.copy.saved` first) (SR5-01, SR5-04, SR5-07 (a)) | M3a (scripted), M3c (V10's harness) |
| T-V9-28 | host mode is the same shell | `embed.html` with V08's `HostSlots` renders every screen of the standalone app except V08 §5.1's list (a DOM-structure diff against an allowlist); the allowlist also names the history panel's group "The party" — drawn from `HostSlots.historyLines` at the head of the All and SettlementForge filters only, newest first, **Show** only on a line with targets, no **Undo this** (SR2-01) — and re-listed with the new key on a View as change: a spy on `list` sees every call carry `effectiveKey()`, and a line revealing one `local` and one `public` place draws, under "What anyone knows", naming the `public` place alone with **Show** on it alone, and both again when View as is cleared, each state read once the provider's `onChange` has fired for the new key (V08's per-key cache, J-V8.109), the same on "See what the players see" set and cleared (SR2-23) — and the host rule for new documents: with `newDocuments: 'download'` each of Open a copy from here and Re-run from here (on a row, a chronicle row and a restore point), the drawer's `fork` and `rerun` and Enter's Same kind, new seed saves one `.plat` to the device whose model digest equals the standalone app's for the same action, leaves the frame's document and log head unchanged, writes no local store or recent entry and toasts `info.copy.saved`; with `'off'` none of those controls is in the DOM; **Start a new map from this** is absent in both (SR2-02); the file menu holds exactly Export skeleton, Rebuild around my drawings, Settings and About, Settings has no Storage section, and ctrl / cmd+O and ctrl / cmd+S do nothing (V9 §2.2's `fileMenu: false`; SR3-02) | M-SF (with V08's SF6; AP5b; SS-40) |
| T-V9-29 | the first-five-minutes test (V9 §7.3) | §13.4's pass rule at both M3a sessions; the M2a pipeline session recorded | M2a (pipeline), M3a (mid and exit) |
| T-V9-30 | the owner's UX sitting (V9 §7.4) | its pass rule, or its unrated rule applied | M2a (diagnostic), M3a, M3b |
| T-V9-31 | the known-city fixture authored through the canvas (V9 §7.2) | its bars (a)–(e), with item 110's rows on (its bridge fortress with its deck plots; the raised ways the city rules add listed in its report) | M3a |
| T-V9-32 | help coverage | every tool, mode, parameter and panel control has its `@plat/docs` anchor; every tool's guide page is generated from `toolkit.json`; every catalogue row whose **Show me why** resolves to a page by V10 §3.5 step 3's target rule — every `bend.*`, `info.*` and `error.*` row that offers it, and every `refuse.*` row with no admitted address argument — has its anchor `messages#<key>`, and every staged layer §7.3 item 9 (d)'s F-EDIT can name has its page `staged/<layerId>` (SR5-07 (c)) | M3b |
| T-V9-33 | hidden caves and ruins (item 109 (j) (2)) | on a fixture with a sealed cavern and a sealed ruin: at `public` and `local` no sealed element is drawn, labelled, listed, answered by `why` (an unknown address) or present in any export, and the toggle is absent; at `secret` with the toggle on every element V04 records `unexcavated` draws in the unexcavated style, and with it off none does; "View as: what anyone knows" hides the toggle | M6 (with V04's U3b) |
| T-V9-34 | the catacomb panels (item 109 (k)) | on B-CITY and a METROPOLIS fixture every catacomb panel's extent, state words, fill, rank, count sentence and source equal V04's `CatacombComplex` and V04's count; across a scripted 10-epoch sequence the extent chart never falls; every church's Below line equals its `Basement.crypt`, and every cathedral shows a crypt, the largest | M6 |
| T-V9-35 | the catacomb bends (item 109 (k), R2) | each of the bends (a)–(d) and both crypt bends (e) of V9 §4.17.5 fires on a scripted gesture, shows its row with its offer and commits the stated events; a chamber drawn inside a church without a basement yields a crypt-only basement with the drawn ring (V3C-75), and its undo restores the document byte for byte; none is refused; no system chip entry and no panel ever presents a catacomb sourced at a church building | M6 |
| T-V9-36 | ruins drawn and drawable (item 109 (g), (h)) | a chamber drawn with the system chip on a ruin commits `drawChamber { system: <the ruin> }` and draws in the ruin program; "New ruin" commits the closure creating the system; the legend shows "Ruins of an older town"; T10's "this system" re-makes only that system | M6 |
| T-V9-37 | ways down and their causes (item 109 (j) (3), (3b)) | on fixtures holding one access of each `cause.rule`, each panel line equals its catalogue row for that cause and its symbol differs by cause; "Show the way in" highlights exactly the connection graph's path; every access edit of V9 §4.3 commits its event and undoes exactly | M6 |
| T-V9-38 | dwellings only after a way in (item 109 (j) (4)) | 0 dwellings in an `unexcavated` cluster after every declaration of a 200-gesture script; every dwelling declaration on a sealed void either commits with its access in one group (dug, else an opening, else a shaft from the public ground over it) or is bent above ground by `bend.under.noAccess`, with its alternatives (SS-35); on a fixture with three buildings qualifying by step 1, the dug-access bend lists the other two in `PreviewResult.alternatives`, **Use another building** re-previews `[addUndergroundAccess { building }, the declaration]` from each in step 1's order with the access reaching the cluster and no second access, and is not shown after the last; an opening's bend offers no building (SR-36) | M6 |
| T-V9-39 | View as is a filter | with "View as: what anyone knows" on, compaction, ctrl / cmd+S and "Download all my towns" succeed, no withheld name reaches the DOM, a picture export defaults to `public`, and the `knowledge` key is unchanged | M3a |
| T-V9-40 | the assistant's screens (V10) | with V10's harness on cassettes: the import dialog lists every prefix outcome and every critique finding with Show and Fix, and "Check with the assistant" starts the `critique` route; "Ask the assistant" on a why card starts the `why` route with the answer attached; a creation proposal shows its scratch read-only under the banner, and Accept opens the new document beside the current one; the transcript exports as V10's JSON; a host `clerk.config` of `off` or `host` shows no Assistant button and no message box (a host's proposal then opens the card-only drawer, T-V9-64); **How do I …?** in the drawer's menu and in Help sends on the `help` entry and its answer's `useTool` button makes that tool active, and **Ask the assistant to place these** under T7's box sends the pasted text on the `roster` entry, neither shown with no clerk configured or with the clerk off (SR-12); with **no clerk configured** (`ShellConfig.clerk` null) the import dialog still lists every finding, its **Fix** on a `propose` fix previews the events as a ghost with Accept and commits them as one group with no `proposedBy`, a `useTool` fix makes the tool active, and `ClerkHandle.run` is never called — the same with a clerk mounted (SR-13); **Start a new map from this** in the drawer's menu (standalone) sends the next message with `attach.newMap: true`, its proposal previews as a creation proposal under the banner, and Accept opens the new document beside the current one, which stays unchanged (SR2-13); in host mode that item is absent, no turn enters creation mode, and the drawer's `fork` and `rerun` buttons follow `newDocuments` as T-V9-28 states (SR2-02); in host mode with `clerkMode: 'builtin'`, a scripted `key` refusal and a scripted `budget` refusal each show the card's `openSettings` button, which opens Settings at its Assistant section with the fields the host forces locked under `host.locked` ("Set by SettlementForge") (SR3-02) | M3c (the host clauses on T-V9-64's scripted host page); M-SF (the host clauses again on V08's embed, AP5b; SS-40) |
| T-V9-41 | V06's screens | "Re-run from here" gives V06's `rerunFrom` document and leaves the current one unchanged; `chronicle.csv` and `uses-history.csv` equal V06's writers' output; the animated history stays ≤ 100 MB by stride doubling; a skeleton with a `history` block reports it at import | M4 (with V06) |
| T-V9-42 | V02's handles | on a composed building each handle kind (range end and width, tower centre and radius, room extent) emits V02's event and each stepper and chip its event; the family strip shows one thumbnail per feasible family within V9 §6.1's row, and a tap commits `setMassing` | M6c (with V02) |
| T-V9-43 | shade strips and the circuit | the Shade view draws V05's strip and pending rows for every island with their legend entries; "Update shade now" clears the pending line; with "Show the whole circuit" on, every barrier arc of item 106 (h)'s fixtures draws after commit in the town and the village products | M3b; the staged layers' milestones |
| T-V9-44 | base edits reached (MFCG's asks, FTG) | a scripted count: each of §7.4's thirteen MFCG asks and FTG's drawn river, tree brush and land-use painting is reached in ≤ 3 actions from the rail or a panel, commits its event (castle `site` and `baileyArea`, `setAttrMany` of land use, way `split` and `merge`, a district-keyed thematic `setStyle`, an `instance` group, `rejectSite` lift, `placeAt` lift, `unassign`, `drawWater { line, widthCm }`) and undoes exactly | M3a |
| T-V9-45 | view keys, notes, pins and the ruler | each control of V9 §4.19 writes its key, which survives save and reload and never enters a digest; the per-viewer keys never cross a bridge; §13.4's "measure a street with the ruler" passes; "Save as annotation" writes a pin | M3b |
| T-V9-46 | people and the family tree | the People panel's filters equal the `people` query's rows; the family tree matches §14's layout rules (generations in rows, elision beyond two, re-root) and is keyboard-operable; opening a person pins nothing; "Where is" draws the `whereIs` answer | M4b |
| T-V9-47 | METROPOLIS costs | the link cache's full bind ≤ 120 ms and a scoped re-bind ≤ 5 ms; a compaction never starts while a draft is pending; the shade sampler within its law or its fallback applied; T1's and T12's METROPOLIS rows of V9 §6.1 | M2a (compaction, AP2), M3a (links, AP3, where the link view is built), M3b (shade, AP4) |
| T-V9-48 | a clerk's alternatives | each variation of a scripted proposal is previewed by its own call and thumbnailed from that preview; the tray shows V10's labels; one ghost at a time | M3a (scripted) |
| T-V9-49 | nothing is lost by deleting | a deleted town is in Recently deleted with its snapshot and journal for 30 days, Restore reopens it at its last head, and the storage ladder never purges it without asking | M2a |
| T-V9-50 | the context menu | right-click, a long press, Shift+F10 and the Menu key open the same menu on every entity kind, generated from the registry, each item producing the panel control's event | M2a |
| T-V9-51 | item 110's tools (V9 §4.20.1–§4.20.6) | each gesture — Retaining wall (both high sides, open and closed), Terrace and its level handle, Raised, Aqueduct, a deck stamp, a landmark slot, a span's use, a crossing's form, the deck height and arch spacing, the per-tier storey stepper — previews, commits BCR-V9-26's or BCR-V9-33's events in one group, and undoes byte for byte | M3a (tier count, step, stairs and top: T-V9-59) |
| T-V9-52 | raised ways on the canvas | 0 junctions between a raised part and every way it crosses; no crossed way split; both ends on ground vertices, an end released elsewhere bent to one; a raised road meeting a town wall comes down before it and passes its gate; an aqueduct passes a wall by an arch, never a gate; an aqueduct from a lower source is bent to the nearest higher source, else to a well at the terminal (J-VI.4 (h)); a raised stroke to an island's rim commits 0 ways and one sky access, and an aqueduct stroke to a rim ends at its last ground vertex outside the island (J-VI.4 (d); SS-32) | M3a (the island case with the sky's milestone) |
| T-V9-53 | a removal holds | a generated raised way removed on the canvas stays removed after Regenerate, a scoped New random over every district it crossed, a reload through crash recovery and ten epochs with V06's pass; "Undo this" brings it back with its ids; its card and row show `info.remove.holds`; the same holds for every kind file f item 260 suppresses on the fixture — a harbour-mouth chain, a quay wall, a generated retaining wall, a generated deck plot and a floating island (SR2-15); with a later edit making Undo this dependent, each removal row's **Build it again** and `ClerkMount.rebuildEvents(seq)` for the same group return byte-equal event lists (canonical CBOR), those of V9 §4.20.3 (4)'s row for the kind, and committing them re-creates the thing as declared (SR2-14) | M3a; the epochs M4 (with V06); the island with volume 5's sky milestone |
| T-V9-54 | retaining walls and terraces | every way crossing one is a stair or a ramp in the ghost and in the committed model, the bend line naming the dry run's form; a wall drawn on flat ground bends by V9 §4.20.1 (3) (a) or (b), and 0 retaining walls stand on flat ground after any script; a terrace is one group and one undo step; a level-handle change leaves no wall of the old step | M3a |
| T-V9-55 | decks | a stamp on a deck lies inside its deck plot and within the budget's band; a refused class bends to the landward end; storeys above `maxFloors` bend; a tower or fort stamp on a mole's head, mid-mole or the mid-span of a bridge at least V11's `deck.landmarks/bridgeMid/minSpanM` long lands on the slot; a removed deck's buildings are listed among the effects; T4's pier, quay and bridge ghosts show their deck plots | M3a |
| T-V9-56 | the second known-city fixture (V9 §7.2) | its bars (a)–(e) and its emulation variant | M3a |
| T-V9-57 | the no-op pin on the canvas | with volume 11's terrace, raised-way and deck-plot rows off, fixture 1's canvas script yields the model digest it yielded before item 110; with only the raised-way rows on, every TOWN-rung canvas script is byte-identical | M3a |
| T-V9-58 | the hit stack (V9 §4.20.8) | on a viaduct over a street with a walled-up span: successive clicks select the deck, the span, the arch vault and the street, then the deck again; the context menu lists the others; a tap cycles the same; T11's second click names the street; `hint.below` shows once; each answer ≤ 1 ms | M3a |
| T-V9-59 | tier controls (V9 §4.20.5) | on a stepped temple each control emits V02's event (the count, `insetCm` by the step handle snapped to 10 cm, the stairs, the top, the stair width, a tier's heights); each of V02's bends shows its row; each of V02's former refusals shows its `bend.stack.*` row, pre-selected, with its alternative (J-VI.4 (i); SS-32), and each alternative's preview is `ok` or a bend; undo exact | M6c (with V02) |
| T-V9-60 | effects (V9 §4.20.7) | on scripted fixtures — a viaduct's removal (`rerouted`, `removed` vaults with a drawn plan), an aqueduct's removal (`lost`), a deck's removal (`removed`), a terrace (`rebuilt`, `displaced`), a Re-derive to CITY (`added`) — every effect kind appears in the preview's `effects`, in the fates sheet's "What else changes" and on the clerk's card; the live region reads the first three; the list caps at 50 with `effectsMore` | M3a |
| T-V9-61 | item 110 in the exports (BCR-V9-31) | on the second fixture every retaining wall, raised way, span, arch vault and deck plot appears in each format as BCR-V9-31 (a)–(d) state; the ground scene has 0 portals where a raised way crosses a street; each deck scene's grid aligns at 0 px per cell (O11 (g)); the 3-D file holds one deck mesh per raised way and one wall mesh per retaining wall | M3b |
| T-V9-62 | removals in the skeleton (BCR-V9-32) | on the second fixture, one generated raised way removed, the skeleton exported and opened with the same seed: the way stays removed and the digest equals the document's; under another seed the import dialog shows *kept removed* or *nothing to remove*, never an error | M3a |
| T-V9-63 | Keep them as yours (V9 §4.20.3 (7)) | a CITY fixture with two generated raised ways re-derived at TOWN lists both among the effects; with the box checked both stand as declared ways and one undo restores the city; unchecked, none stands | M3a |
| T-V9-64 | the card-only drawer and the host channel (SS-06, SS-07) | in host mode — at M3c on the application harness's scripted host page, a test-only page that loads the shell in host mode and fills `ClerkMount.host` and `HostSlots` over §11.3's bridge as a host would (the harness side T-V10-20 drives), and at M-SF on V08's `embed.html` with its host harness (SS-40): before any `clerk.config` (mode `off`) and under `host` no Assistant button shows; a `preview { events, view: true, proposal }` opens the drawer with that card alone — the AI mark naming `hostName`, no message box, menu, settings or meter, no Try again; Accept commits one group with `proposedBy: 'clerk'` and the host receives `clerk.proposal { status: 'accepted', seqs }`; Drop answers `dropped`; a newer proposal replaces the card and answers the older one `dropped`; a moved head answers `stale`; a viewer's `preview` is refused; the harness reads the transport only through `ClerkMount.host.config()`, a refresh arrives through `onConfig` after `needsToken()`, a transport off the allowlist is answered by `refused('origin')`; no token appears in any store, log or report | M3c (with V10's C5, on the scripted host page; SS-34); M-SF (on V08's embed, AP5b; SS-40) |
| T-V9-65 | why sections (SS-15) | on fixtures holding a catacomb under a churchyard, a cathedral with its crypt, a sealed deep cavern, a generated viaduct, a stepped temple and a building with a drawn plan: each why card draws every section of its `WhyAnswer` after the facts, in the providers' order, titled by `why.section.<kind>`, each row's `says` rendered, values in the chosen units, targets clickable; a withheld row reads the unknown-place line; the catacomb's panel, the church's crypt line, the void's sealed line and the raised way's panel reason render the same `MsgRef` as the card (compared row by row); a raised way's `decidedBy` row is not drawn twice | M3a (scripted rows); M6-U, M6c (live providers) |
| T-V9-66 | View as reaches every read (SR-06, SR-08) | on T-V10-6's canary fixture (`local`, `secret`, concealed and unexcavated places named with unique canary strings): with View as "What anyone knows", no canary appears in the why card (a withheld target reads the unknown-place line), the source chips, the gazetteer, "features in view", the Link card, the record panel, the People panel, "Where is" or T6's alternative sites, and a spy on the facade finds every band-less `query` the shell sends carrying `admitAs: 'public'`; with a host-set key form `{ tier: 'public', places: [one secret place] }` that place's name shows in each and no other canary does, the menu reads "What the players know" with its other entries disabled, the View as banner is not drawn and the export dialog defaults to the form; clearing View as re-asks every open answer at the role's key without a reload (`onEffectiveKey`); the knowledge key and the document formats are unchanged throughout; the fates sheet of an edit made meanwhile lists every fate at the role's key (J-V9.86) | M3a (tiers, and the form set by the test harness through `setViewOpts`); M-SF (the form through V08's embed, SF6; AP5b; SS-40) |
| T-V9-67 | the three load outcomes (SR3-01; V9 §3.14 (a)–(c)) | with test builds labelled o(N), o(N−1) and o(N−3) (§6.4's fixture labels): **(a)** a document saved at N−1 opens editable under its own version, an edit commits there, the standalone app shows `info.upgrade.offer`, **See what changes** shows §7.5's diff in the fates sheet and **Do it** commits one `upgrade` (the output version then N), **Not now** commits nothing; **(b)** a document at N−3 with `model` opens as the frozen view under `error.frozen` with the CLI command, no other edit accepted (view and export only, §2.9 step 2) and **Edit it with this version** the one edit control, which returns `confirm` with the renames in the fates sheet and on **Do it** commits one `rebase` with reason `frozenImport`, after which an edit commits under N; the same document with one chunk's bytes altered shows `error.frozen.damaged` and no Edit control; one naming a pack the build lacks shows `error.frozen.pack` after the attempt with nothing committed; **(c)** a document at N−3 without `model` shows `error.frozen.noModel`, and **Open its recipe with this version** opens a new document under `error.linkVersion` whose model digest equals the same recipe and log opened as a link, the town on screen unchanged; **host mode** (the embed, owner frame): the N−1 document shows no upgrade strip and no upgrade control but V08 §4.2's header **Update the map engine**, the banner slot draws no frozen-view notice, (b)'s **Edit it with this version** commits its `rebase` through `doc.changed` followed by `doc.snapshot`, (c)'s button saves one `.plat` to the device with `newDocuments: 'download'` and is absent with `'off'`; an editor's frame shows `error.frozen` without the Edit control | M3a (the standalone clauses); M-SF (the host clauses, on V08's embed with SF6; AP5b; SS-40) |
| T-V9-68 | SettlementForge's chains in the Show menu (SS-41) | on `town-cc-1` or its test-side variant with one active custom chain (T-V8-25's variants), and on a variant whose every chain is inactive: the Show menu lists **SettlementForge's chains** on the first and not on the second; choosing it writes the per-viewer key `thematic: 'supplyChains'` and draws V08 §5.2's lines with the chain's label in the legend; under a key that withholds one of the chain's nodes the entry is absent; switching the view on and off changes no model digest and adds no log entry; a GeoJSON export while it is on carries V08's `supplyChain` LineString | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-69 | the dossier groups and the standing notes (SR-22) | on `town-1`'s digest pairs through V08's embed (T-V8-14's pairs, an undated one among them): each committed absorb is one group headed `host.group.absorb` with `{n}` its ledger event's `changes` count and `{week}` its `absorbed` entry's week (`host.group.absorbUndated` on the undated pair); under it its dossier events in log order, each followed by one line per report entry of its `seq`, then one line per stored note of the ledger event with **Show** exactly where the note's `keys` bind an element (highlighting those addresses), then its epoch rows; the creation's prefix is headed "Made from SettlementForge's record" with its notes; on the variant whose absorb carries an epoch in which a removed raised way's reason fires again (V06's fixture for W60), that epoch row carries one `info.raised.suppressed` line with **Show** on the removed way's former outline; under View as "What anyone knows" a note line whose key binds a `local` or `secret` element is not drawn and returns when View as is cleared, and a report-entry line whose element is `secret` is drawn naming it by its `kind.<registry kind>` word with no **Show** on it — in the group and in the report panel's "What moved" alike — and names it again when View as is cleared (SR2-27); the group is listed under All and SettlementForge and absent under Mine and Assistant; the report panel lists `GenerationReport.dossier` by its `report.dossier.<state>` rows, then the standing notes under `host.group.standing`, one line per `GenerationReport.dossierNotes` entry; all of it the same in a second editor's frame and after a reload | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-70 | the roster reader's namespaces (seam-settlements-r6 SR6-03; J-V9.125) | T7's pasted lines and T6's typed words, read by V9 §4.16 (3): on a TOWN fixture "a smithy", "an inn" and "a church" resolve to `smithy`, `inn` and `church`, never to a `v.` class; on a VILLAGE fixture they resolve to `v.smithy`, `v.inn` and `v.parish_church`; "a chandler" at VILLAGE resolves to `v.shop`; a town-and-city class that plays itself at VILLAGE ("a pawnshop") resolves to itself; T6's stamp palette lists exactly the same set at each rung | M3a (the village rungs' clauses with V07's V-M2 rows) |

### 7.2 The known-city fixture, authored through the canvas

J78 and item 101 (e) make an ORIGINAL skeleton with the structure of the owner's reference city the acceptance fixture of
the toolkit, authored three ways that must agree (§13.2's T101 bars). This volume owns the "by hand" way. The fixture's
structure (our own names, nothing traced; `research/reference-maps/baldurs-gate/README.md` is study-only): a walled upper
town with a citadel on a bluff; a walled lower port sloping to a harbour with piers; unwalled outer sprawl along three
roads; a hill inside the extent; cliffs with a cliffside cemetery; a satellite quarter across the river; a fortress on a
bridge (with its deck plots, item 110 (d); V9 §4.20.4 (7)); two enceintes with nine gates; three region labels (upper, lower, outer);
about fourteen declared quarters (a temple quarter, a manor quarter, a harbour quarter, an enclave, a graveyard …); about
sixty named places with landmark leader lines; the two looks, ink and quarter-tinted.

**The canvas script** is written once from the fixture's written brief as gestures (T1: the `citadel-and-port` form, CITY,
coast; T2: the bluff, the hill and the cliffs by strokes, the river by source and mouth, the harbour by shore point and
size; T3: two walls by points, nine gates; T4: the three roads, the bridge, the piers; T5: the quarters by seeds and
corners with their kinds and names; T7: the sixty places as one pasted roster; T6: the ten landmarks that need an exact
plot by stamp, the fortress among them on the bridge's mid-span slot (V9 §4.20.4 (7)); T11: three region groups and the leader-line switch; T12: the tint). Bars:

* (a) as T101-6 states it: the script's final model digest equals the skeleton file's, and the clerk's path — at M3a a
  scripted transcript of tool-API calls, from M3c V10's cassette — meets the fixture's structure list (J78 (e); J-V9.50);
* (b) it plays within 10 minutes on the reference machine, every gesture's stop-to-ghost within V9 §6.1's budgets;
* (c) every gesture's preview is `ok` or bent — 0 refusals — and the script needs ≤ 250 gestures;
* (d) both looks pass B-ZOOM's legibility floors (§13.4);
* (e) **the dedicated-user bar**: a person of the program who has not seen the script rebuilds the fixture by hand from its
  written brief in ≤ 90 minutes, and the fixture's structural checklist holds on the result (two enceintes, nine gates,
  three regions, every named place present and in its region, the bridge fortress, the cemetery on the cliff, the
  satellite across the river) — the owner's "a dedicated user can build it" measured.

**The emulation variant**: the same brief declared only to L2 (intent, bones, programme; no fabric) — the checklist holds
and the rules fill the rest.

**Fixture 1 with item 110's rows on.** Its brief keeps its bridge fortress, now on a deck with plots; at CITY the rules may
raise a way the site calls for, which the fixture's report lists with its reason; bars (a)–(e) and the checklist are re-run
and unchanged in kind. **The behaviour shift, recorded once** (item 110 as revised ~23:40): with the raised-way rows on, a
CITY or METROPOLIS canvas script's digest may change, because the rules now raise ways there by themselves; with the
terrace, raised-way and deck-plot rows off, every canvas script is byte-identical to its pre-item-110 digest (T-V9-57). No
golden is re-recorded without naming this cause.

**The second fixture (item 110 (e); J114)** — beside the first, at M3a, authored both ways (the skeleton file, and by hand
through the canvas) with the same bars. This volume names no reference map, city or ward: the brief, the canvas script
and the skeleton are the program's own, under our own names, and live in the test tree at
`plat/test/fixtures/known-city-2/` (`brief.md`, `canvas.json`, `skeleton.plat`), never under `research/reference-maps/`
(V9C-80).
* **The brief** (its structure is item 110 (e)'s; the names are ours): a port city on a headland with the sea on three
  sides; a landward curtain with towers, anchored on the sea at both ends, and a gate plaza; an enclosed harbour behind a
  mole, with a tower at mid-mole and a fort at the mole's head; a causeway from the mole to a rocky islet with a
  lighthouse; a second, open anchorage of jetties with small buildings on them; three or more terraced wards bounded by
  inner walls, with retaining walls along their terraces; ring streets round two precincts; a straight raised road
  crossing the streets below; a ravine of stepped housing; a stepped temple; an arena; six named wards with curved labels
  (Gate Ward, Upper Terrace, Middle Terrace, Lower Terrace, Ravine Ward, Harbour Ward).
* **The canvas script** (V9 §3.12's form): T1 (a coastal site, CITY); T2 (the hills, the ravine, the islet by water paint,
  the harbour basin by shore point and size; the terraces by Terrace strokes, V9 §4.20.1); T3 (the landward wall as an open
  chain anchored on the shore at both ends, item 106's barrier closure; the inner walls; the retaining walls by the
  Retaining wall mode); T4 (the mole and the jetties as `pier` lines, the causeway, the ring streets, the raised road with
  Raised on); T5 (the six wards by seeds and corners, the ravine quarter with volume 1's stepped fabric); T6 (the mid-mole
  tower and the mouth fort on the mole's landmark slots, the lighthouse, the stepped temple by its class stamp — volume
  11's specialisation, V02's X17 — the arena, the precincts; the deck buildings are left to the rules); T11 (the six
  labels); T12 (the tint). At M3a no tier control is needed (V9 §4.20.5 (2)).
* **Bars**, as the first fixture's: (a) as T101-6 — the script's final model digest equals the skeleton file's, and the
  clerk's path meets the structure list; (b) it plays within 10 minutes, every gesture within V9 §6.1's budgets; (c) every
  preview `ok` or bent, 0 refusals, ≤ 250 gestures; (d) both looks pass B-ZOOM's legibility floors; (e) a person of the
  program who has not seen the script rebuilds it by hand from the brief in ≤ 90 minutes, and this checklist holds: the
  landward wall's two sea anchors and its gate plaza; the mole with its mid-mole tower and its mouth fort; the causeway and
  the lighthouse; at least eight jetties with deck buildings; at least three terraced wards with inner walls and at least
  ten retaining walls, every way crossing one a stair or a ramp; ring streets round two precincts; the raised road crossing
  at least two ways with no junction; the ravine quarter; the stepped temple with at least four tiers; the arena; six
  named wards. **The emulation variant:** the brief declared only to L2; the checklist holds and the rules fill the rest.
* The second fixture's own golden and model bars are volume 12's (V02's X25); this volume's bar is T-V9-56, with T-V9-61 and
  T-V9-62 run on it.

### 7.3 The first-five-minutes protocol, operationally

§13.4 states the test, its pass rule and its fallbacks; this is how it is run.
1. **When and what build.** The four tasks need T5's and T6's events, which §16 builds at M3a (drawn boundaries,
   post-build assignments, positive placement and the solver), so the four-task sessions run inside M3a — the first on its
   midpoint build, once those events have landed, the second at its exit — and the M2a exit holds a **pipeline session**
   instead: three to five participants, recorded and not gating, on the tasks the M2a build can express — a scoped re-roll
   that keeps a locked thing (T10), a shape task ("make this house one storey taller, then split this plot", T9), going back
   in the history, and adding a compass — its findings feeding AP3 (BCR-V9-17; J-V9.15). The dress task's style change has
   `ink` and `lit` to choose from at M3a (`lit` ships at M2b).
2. **Participants.** Five to eight per session (§13.4), each: runs tabletop games, has used a map tool casually, does not
   program for a living, has never seen PLAT, and was not in an earlier session. Two per session work on a tablet (§13.4's
   touch question). Recruitment and any thank-you are the owner's (V9 §11 Q2).
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
6. **Record** `plat/goldens/ux/<milestone>/f5.json`, named in the milestone's `MilestoneRecord.ux` (BCR-V9-24):

```ts
interface F5Record { milestone: string; build: string; date: string;
  participants: { id: string /* P1 … P8, no names */; device: 'laptop'|'tablet';
    tasks: { task: 'quarter'|'place'|'dress'|'reroll'; completed: boolean; seconds?: number; stuckAt?: string; notes?: string }[];
    surprisedByHeld?: boolean; clerk?: { used: boolean; slow?: boolean } }[];
  verdict: { perTask: Record<'quarter'|'place'|'dress'|'reroll', { passed: number; failed: number }>; pass: boolean /* §13.4: all, or all but one, complete all four */ };
  fallbacksApplied: ('firstScreen'|'hint'|'touchL3L4'|'clerkApplyThenUndo'|'keepChangeToggle')[] }
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
   The tasks: the four of V9 §7.3; "Export this town for your tabletop"; "Find out why the tannery is where it is"; "Undo a
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
(§13.3; BCR-V9-24).

### 7.5 Parity with the references' own editing

Every capability the reference generators' editors have is reached, and the action counts are compared on §13.4's scripted
tasks (O16 (c)); sources: `research/ux/tool-survey.md` Part I D.

| the reference's capability | reference actions | PLAT | PLAT actions | verdict |
|---|---|---|---|---|
| a new town (MFCG Enter; FTG's create form) | 1; a form | Enter in the empty state; afterwards Same kind, new seed (a new document) | 1 | parity; the current town is never lost (improvement) |
| re-roll one ward (MFCG ctrl-click) | 1 | shift+click (a scoped New random), with three variations | 1 (+1 to pick) | parity; candidates added (improvement) |
| warp brushes (MFCG's eight) | mode + stroke + Enter | T2's warp session, eight kernels, Apply | same | parity |
| rename a label (MFCG click) | 1 + typing | click + typing (T11) | same | parity |
| move a label (impossible in MFCG) | — | drag (T11) | 1 | improvement |
| district colours (impossible in MFCG) | — | T12's tint and the style dialog | 2 | improvement |
| keep edits across sessions (impossible in MFCG) | — | autosave | 0 | improvement |
| roads as click-chains that snap and split (FTG) | n + 1 | T4 two points or a line, with snap | 2 | parity |
| place a building (FTG two clicks) | 2 | T6 stamp drop, Accept | 2 | parity |
| swap two buildings' details (FTG) | 3 | drag a use's badge onto another building (`swapUse`) | 1 drag | parity |
| paint roofs (FTG brush) | brush | T9 paint | brush | parity |
| regenerate an area with presets (FTG) | select + preset + accept | T10 Try again with scope chips and variations | 2 | parity; three candidates (improvement) |
| confirm the consequences (FTG's confirm-actions list) | 1 | the badge's fate counts and the fates sheet | 1 | parity |
| "This action cannot be undone" (FTG's regenerate) | — | never: every action undoes (R11) | — | improvement |
| bulk edit (FTG) | select + form | multi-select + `setAttrMany` | same | parity |
| the thirteen MFCG asks of §7.4 | — | each reachable from the rail or a panel in ≤ 3 actions (V9 §4.3), verified by T-V9-44's scripted action count | ≤ 3 | improvement (MFCG has none) |
| rotate the map (MFCG's warp menu) | 1 | the Map group's dial or "North up" | 1 | parity |
| a river drawn with a width; trees by brush; pins with a label, a note and a colour (FTG) | a draw; a brush; a click and a form | T2's river or canal line with its width handle; T8's Trees brush; the Notes panel's pins | same | parity |
| people search and a clock (FTG) | a form; a button | the People panel; the clock's Next hour (module tier) | same | parity |
| a city as tabletop crops plus an overview (E4 (4)) | — | the scene split with a numbered overview PNG | 0 extra | parity |
| a road raised while drawing (the surveyed road tools' Page Up/Down, `research/ux/tool-survey.md` Part II, B2-S5) | a key | T4's Raised toggle, or PageUp and PageDown while drawing (V9 §4.20.2) | 1 | parity |
| a multi-level tabletop scene (Part II, E-S33, E-S34) | — | a raised way's deck scene, a level with its elevation band (BCR-V9-31 (c)) | 0 extra | parity |
| retaining walls, raised ways, stepped buildings and deck plots in the reference generators | none | T3, T2, T4, T9 and T6 (item 110; V9 §4.20) | — | improvement |

## 8 Build plan

### 8.1 Where it slots into §16

The application is built along the base's milestones, never ahead of the engine it drives: each step below ships inside the
milestone named, on that milestone's API, and exits on its bars. Estimates are expert person-weeks (PLAUSIBLE), for the
application's code, data rows and its own test tooling; the engine work they call is the base's and the other volumes'.

| step | milestone | content | exit (V9 §7) | pw |
|---|---|---|---|---|
| **AP1 — the shell** | M1 | the frame (top bar, rail with the tools that exist, map region, context panel, view bar); the chrome tokens, the icon sprite and the two themes; the empty state's card (the proxies' strip waits for M3b); the report, gazetteer and "features in view" panels in plain words; the basic panel; the keymap; the accessibility contract; context help's skeleton; the message catalogue's first rows and its coverage test; open and download of generated towns | T-V9-1 (shell), T-V9-15, T-V9-21 (shell) | 2.5–3.5 |
| **AP2 — the editing core as screens** | M2a | selection and the generated context panel; T9 and T10; the preview pipeline — ghost, badge, handles for T9, the variations tray with thumbnails (BCR-V9-10), the refusal card, the bend line, the fates sheet; undo and redo; the history panel with restore points and "Go back to here"; autosave, compaction, crash recovery and the draft mirror; the M2a pipeline session of the first-five-minutes test (V9 §7.3; BCR-V9-17); the owner's diagnostic sitting | T-V9-2 to -7, -12, -13, -16 (go back), -17, -29 (the pipeline session, recorded), -30 (diagnostic), -47 (compaction) | 2.5–3.5 |
| **AP3 — the full toolkit on the canvas** | M3a | T2–T8 in full (points forms, snapping by role BCR-V9-9, wall arcs BCR-V9-11, placement alternatives BCR-V9-12, the quarter's size BCR-V9-16); handles on every shape; T7's paste and cards; multi-selection and move; the working layer; the advanced panel, tables editor and presets; the siting rows, the link view and link edits, split merge-back, wall stretch grades, record members, the why card (V11's tables by `editTable`, BCR-V9-5, -13, V10's `WhyAnswer` through `WhyCardModel`, its `sections` drawn by the card's row renderer within this estimate, SS-15); the clerk drawer (with volume 10's clerk, or the scripted test clerk until it lands); touch and the three layout classes; the share sheet; open and recent; the three load outcomes (V9 §3.14 (a)–(c): the upgrade offer, the frozen view's Edit it with this version, a model-less file's recipe; SR3-01), standalone (host mode at AP5b); the known-city canvas script; the two four-task sessions (midpoint and exit); the owner's gating sitting; **the revision's base edits** (the castle's keep and bailey, land use, the tree brush, way split and join, district colour, the lifts, the drawn river), the context menu, View as as a filter, Recently deleted, the re-roll brush and the held-thing marks; **item 110 on the canvas** (V9 §4.20: Retaining wall, Terrace, Raised and Aqueduct, removal and Build it again, decks and landmark slots, the per-tier steppers, spans and crossings, the effects list, the hit stack, Keep them as yours, the Raised-ways row, the skeleton's removals, the export dialog's item-110 rows) and the second known-city canvas script | T-V9-3, -4, -8 to -11, -14, -18, -20, -22, -24 to -27, -29, -30, -31, -39, -44, -47 (links), -48, -50, -51 to -58, -60, -62, -63, -65, -66 (tiers, the harness form), -67 (the standalone clauses) | 7.25–11 |
| **AP4 — finish, export and shade** | M3b | the export dialog's five tabs with estimates and the tabletop details (BCR-V9-15); T11 in full (inline editor, region groups, leader-line switch); T12 in full (furniture tray, underlay, lights, ground texture, the style dialog, **New trees**, **New decoration**, **New emblem** and **New compass**); the shade view (BCR-V9-7, once item 102's driver is in the field); the Try-another strip (with §7.8's proxies); the guided first town; settings complete; the installable offline app; help coverage; the owner's sitting on exports and dress; **the revision's view keys** (the Map and Light groups, notes, pins, favourites, the grid, legend and emblem controls, the ruler), the coverage and voids views, the whole-circuit option, the tabletop overview | T-V9-3 (T11, T12), -6 (New trees, New decoration), -19, -21, -23, -30, -32, -43, -45, -47 (shade), -61 | 3–4.25 |
| **AP5 — time** | M4 (with V06's steps) | "Open a copy from here" on V06's `forkAt` and "Re-run from here" on `rerunFrom`; the Chronicle tab joined to V06's timeline bar; `chronicle.csv`, `uses-history.csv`, the animated history and the history block at import | T-V9-16 (copy), T-V9-41, T-V9-53 (the epochs) | 0.5–0.75 |
| **AP5b — host mode** | M-SF (with V08's SF4 and SF6; V08 §8.1; SS-40) | the host shell verified on V08's `embed.html` with V08's `HostSlots` — the file menu under `fileMenu: false`, the host rule for new documents (`newDocuments`) and the history panel's host group (`historyLines`) (SR2-01, SR2-02), the three load outcomes in host mode (V9 §3.14 (a)–(c)), View as's host-set key form; the assistant's host clauses re-run on the embed; the Show menu's **SettlementForge's chains** (V9 §5.4; SS-41); the history panel's dossier groups and the report panel's standing notes (V9 §4.10, §5.7; SR-22) | T-V9-28, T-V9-40 (the host clauses, on the embed), T-V9-64 (on the embed), T-V9-66 (the embed clause), T-V9-67 (the host clauses), T-V9-68, T-V9-69 | 0.25–0.5 |
| **AP6 — Below and item 109** | M6-U (staged; with V04's U3, U3b and U4) | the Below group (band ladder, view chips, lantern, the hidden-voids toggle at `secret`); the system chip and New ruin / cavern / catacomb; the ruin legend; "How people get down here" with every cause, "Show the way in" and the access edits; the dwelling closure's words; the catacomb, crypt and cemetery panels, the extent chart and the bends | T-V9-33 to -38 | 1–1.5 |
| **AP7 — Sky** | the sky's staged milestone (with V05's P4) | the Sky group and island menu; the island handles (rim by `resizeIsland`, altitude); "Update shade now"; the shade strips and their legend | T-V9-43 (strips) | 0.5–1 |
| **AP8 — the built-in assistant's screens** | M3c (staged; with V10's C2–C5 — C5 for the host channel and the card-only drawer; SS-34) | the three first-open cards (label, notice, key); every `ReplyBlock` and `ClerkAction`; the meter and the caps; the settings' Assistant section over `ClerkSettings`; the creation preview and its acceptance; the import dialog's critique and "Check with the assistant"; "Ask the assistant"; the transcript export; the card-only drawer for a host's proposal and the host channel `ClerkMount.host` (SS-06, SS-07), verified on the application harness's scripted host page (T-V9-64; SS-40); New topic, the key verdict and the defect list (SS-08); Start a new map from this (`attach.newMap`, SR2-13) | T-V9-27 (harness), T-V9-40 (the host clauses on the scripted host page), T-V9-64 (on the scripted host page) | 1–1.25 |
| **AP9 — people and the family tree** | M4b (with `@plat/sim`) | the People panel, the person card with "Where is", the family tree, the clock | T-V9-46 | 0.75–1.25 |
| **AP10 — building-band controls** | M6c (staged; with V02) | V02's handles and family strip (V9 §3.5) and the tier controls (V9 §4.20.5: the tier stepper, the step handle, the stair and top chips, the stair width) | T-V9-42, T-V9-59 | 0.25–0.5 |
| **total** | | | | **19.5–29** (base line 16.75–24.75; staged AP6–AP8 and AP10 2.75–4.25 — AP8 +0.25 by the reconciliation, SS-06 – SS-08; AP5 split into AP5 and AP5b at the same 0.75–1.25, both inside the base line, SS-40, J-V9.103) |

**Against the base's pricing (§16's effort table).** The base's line "the reference app's UI (panels, drawing and snapping
tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters,
accessibility, context help, keymap)" is 8.5–12.5 pw with item 101's +1.5–2.5. This volume's design adds, itemised: autosave,
compaction, crash recovery and the draft mirror +0.75–1.25; restore points and "Go back" +0.25–0.5; the message catalogue in
plain words with its coverage test +0.5; the file-g interface (the siting rows, the link view and edits, split merge-back,
wall grades, record members, the shade view, the why card) +1.5–2; the export dialog's estimates and tabletop details
+0.5; the touch layer and the three layout classes +1–1.5; the guided first town +0.25; the owner's sittings and the
known-city canvas bars +0.25–0.5 — **+5–7 pw** — and the revision's base-side additions (the base edits, the view keys,
notes, pins and ruler, the context menu, View as, Recently deleted, re-run and V06's exports, people and the family tree)
**+2–3 pw**, and the second round's item 110 on the canvas (V9 §4.20, the effects list, the hit stack, the item-110
dialog rows, the skeleton's removals and the second fixture's script) **+1.25–2.25 pw**, carried by BCR-V9-18 as a widening
of that line to **16.75–24.75**. The staged layers', the staged clerk's and the stage-3 building band's screens (AP6
1–1.5, AP7 0.5–1, AP8 1–1.25, AP10 0.25–0.5; 2.75–4.25 pw) are priced with their own staged milestones — V04's M6-U, V05's P4,
V10's M3c and V02's M6c — outside the base total, as those engines are (V9 §10.2 XV-V9-8).

### 8.2 Spikes (risk retirement, at the start of their milestone)

* **S-A1 — the preview loop at CITY (M2a, first week).** T9's drag → settle → `preview` → ghost on a CITY document on the
  reference machine, and a T5 seed preview on a hand-made harness over §7.1's `quarter` event: measure L-ghost; pass: V9
  §6.1's rows + 10 %; else apply §6.1's fallback before building further tools on it.
* **S-A2 — the local store on three engines (M2a).** The journal, compaction and recovery on Chromium, Firefox and WebKit,
  including WebKit's eviction of script-written storage for sites not installed; measure the write cost and verify
  `navigator.storage.persist()`; pre-decided outcome where persistence is not granted: the Storage section shows "Your
  browser may clear saved towns after a while. Install the app or download your towns to keep them." once, and the Download
  banner appears after the first hour of editing in such a session.
* **S-A3 — the touch recogniser (M3a, first week).** The gesture mapping of V9 §4.12 on two tablets (one iPad-class, one
  Android-class): long press, second-finger free placement, pinch during a draw; pass: T-V9-22's scripts; else the second
  finger's free placement becomes a "Place freely" toggle chip in the options strip.
* **S-A4 — a raised course's preview at METROPOLIS (M3a, first week of item 110's tools).** An aqueduct of 5 km over built
  land and a viaduct's removal on a METROPOLIS document: measure L-ghost against V9 §6.1's rows; pass: + 10 %; else the
  preview-on-release threshold `raised.previewOnReleaseKm` is lowered to 1 km for that rung and reported, and T-V9-3
  records it.

### 8.3 Risks, in order

1. **The first-five-minutes test fails a task** (§13.4 answers it: first-screen and hint revisions, a re-run with new
   participants before the milestone exits).
2. **L-ghost at CITY and METROPOLIS for T3 and T4** (V9 §6.1's fallback: preview on release).
3. **Browser storage eviction** (S-A2's outcome; the product's promise "never lose work" then rests on the download and
   install paths, which the Storage section states plainly).
4. **Touch** (§13.4's fallback: L3–L4 pointer-only on touch).
5. **Volume 10's clerk arrives later than AP3** (the drawer ships against the scripted test clerk; T-V9-27 runs on it; the
   built-in clerk plugs into the same slot at M3c, AP8).
6. **The siblings' records arrive in another shape** (V04's causes and `blockedBy`, V10's `TurnView`, V11's tables): the
   screens read them through the one projection each (`WhyCardModel`, the cause table, the §2.6 mapping), so a change is
   one table's rows; V9 §10.2 lists what each sibling is asked for.
7. **Item 110's base mechanisms land late or in another shape** (the coherence pass's §2.7 records and BCR-V9-26 –
   BCR-V9-34): the tools read them only through BCR-V9-26's events and BCR-V9-27, -28 and -34's answers, so a change is
   those requests' text; until they land, AP3 builds item 110's screens against the scripted engine stub the harness
   already uses for T-V9-12 and T-V9-13, and T-V9-51 – T-V9-63 run when the engine side lands inside M3a.

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V9.1 | chose one shell with host slots (`ShellMode`, `HostSlots`) over a separate host application, because V08's differences are a short list and a fix to the shell then reaches both the standalone editor and SettlementForge's Map tab |
| J-V9.2 | **withdrawn by the revision (V9C-03):** the map-side declarations are volume 11's document-only tables written by `editTable` (J-V9.36), not attributes of `Use`; BCR-V9-4 is withdrawn with it |
| J-V9.3 | chose to accept a pending ghost implicitly when the user starts another gesture or picks another tool, over requiring an explicit Accept, because R1 forbids a dialog-first flow and the survey's strongest pattern is the result appearing with the gesture; Esc, Cancel and undo keep it cheap to refuse |
| J-V9.4 | chose commit-on-release for things the gesture itself draws (strokes, drags, locks) and Accept for things the user chooses among (a quarter's size, a place's site, a roster, a fill's variation, a clerk's proposal), because the chosen ones carry a count or candidates to judge first (R3, R14) while a stroke's ghost is the thing itself |
| J-V9.5 | chose a journal of the API calls, replayed with a `logHead` check after each, over journalling log events, because unshared truncation (§7.4) and confirmed fates change the log's own shape, while the engine's determinism makes replaying the calls exact and self-checking |
| J-V9.6 | chose to keep wall-clock times in the local journal, not in the document, because `EditBase` has no time field and adding one would change every document digest for a display detail; events made elsewhere show no time |
| J-V9.7 | chose restore points as shared view keys, one key per point, over a canonical list, because they are bookmarks on log positions that must never move the model digest, and one key per point merges concurrent additions under last-writer-wins |
| J-V9.8 | chose to confirm a dry run's renames as one set over per-rename choices, because keeping one old name is a different event (a name lock) that would change the dry run's own result; a user renames afterwards |
| J-V9.9 | chose three layout classes — every tool on wide and medium (tablets), and a viewer with light edits on narrow (phones: T1, T5's seed and click-inside, T6, T7, T10–T12, exports, share, the clerk) — over full editing on phones or none on tablets, because handles and snapping need 44 px targets with the map visible around them, the survey's touch evidence is thin, and §13.4's sessions decide tablet editing with a pre-decided fallback |
| J-V9.10 | chose to keep the clerk's conversation in memory only — kept as the accepted declarations in the log, or as the user's own copy — over saving it in the document, because the accepted proposals already carry their provenance and a chat may hold what the user did not mean to keep; **amended by J-V9.34**: when the user switches on volume 10's "Keep history", V10 §2.7's device store keeps it, never the document |
| J-V9.11 | chose an installable, offline-capable web app with no telemetry and no network use except the clerk and a host's publishing resolver, because the base has no hosted service (§11.5), the towns are the user's, and the audience expects its tools to work at the table without a connection |
| J-V9.12 | chose our own icon sprite for the twelve tools and the app-specific marks and one permissively licensed icon set, through one adapter file, for generic glyphs, over drawing every glyph or taking every icon from a library, because the tools' icons carry the product's identity while generic glyphs gain from familiarity (§17.4's licence rule holds) |
| J-V9.13 | chose "what anyone knows" as the Share sheet's default picture tier, while the export dialog defaults to the view's tier, because sharing is where a secret leaks by accident and a game master's everyday view is `secret` |
| J-V9.14 | chose a three-way chip for the walls control (none · one ring · two rings) over the slider item 101 (g) drew, because the control is discrete (§7.8's registry) and the survey's mapping amends it (`research/ux/tool-survey.md` §5 T1); BCR-V9-2 corrects the base's wording |
| J-V9.15 | chose to run the four-task first-five-minutes sessions inside M3a (its midpoint build and its exit), with a smaller, non-gating pipeline session at the M2a exit on what M2a can express (a re-roll keeping a locked thing, a shape task, going back, a compass), over pulling M3a's engine pieces for T5 and T6 (drawn boundaries, post-build assignments, positive placement, the solver) into M2a, because the four tasks need those events and moving them would reorder the base's milestones; the survey's "cheapest point" is kept by the M2a session (BCR-V9-17) |
| J-V9.16 | chose the system UI font stack for the chrome over bundling a UI face, because it costs no bytes, reads natively on every device and leaves the bundled faces (§17.2) for the map alone |
| J-V9.17 | chose handles at the most salient corners (turning angle × shorter adjacent edge, spaced along the ring) over evenly spaced or all vertices, because users grab a shape at its corners and 4–8 handles keep an edit a drag rather than a redraw (item 101 (i) rule 3) |
| J-V9.18 | chose `sizeM2` on the quarter's points form to carry the badge's plus and minus over a separate size event, because the event already has a points form and the grower reads a target size — one parameter on an existing tool |
| J-V9.19 | chose to show a link or siting edit as a changed binding with an offer to "Show better sites" over moving buildings at once, because a move is a relocation with its own fates, which the author sees before it happens (R3); the declaration holds for every later placement |
| J-V9.20 | chose curved provider-to-consumer arcs for the link view over lines routed along the streets, because hundreds of routed lines overlap on the same streets and hide the pattern; V08's view of one custom chain routes along ways and stays its own view |
| J-V9.21 | chose six stepped shade veils drawn under the buildings' fills over a continuous ramp or a veil on top, because steps read as a legend and under-drawing keeps buildings and labels legible (the legibility floor) |
| J-V9.22 | chose not to offer copy and paste of buildings, because a copied building is not a declaration the rules can derive and the survey records the request only for free-form builders; T6's stamp is "the same kind here" |
| J-V9.23 | chose to commit a roster card accepted alone as a `roster` with that one line and re-preview the rest, over committing a subset of one solve, because §7.1 solves a roster in one dry run and a committed subset must be its own solve |
| J-V9.24 | chose existing events for the app's compound gestures — a use badge dragged onto another building is `swapUse`, "Go back to here" is a group of `undo`s — over new kinds, because §7.1 and §7.4 already carry their undo and replay; **amended by J-V9.47**: a gate slides by `moveVertex` on its crossing, no longer `placeGate` with the old stub's `delete` |
| J-V9.25 | **withdrawn by the revision (V9C-01):** the oracle's answer is volume 10's `WhyAnswer` (BCR-V10-1), and this volume keeps only its app-side projection `WhyCardModel` (J-V9.33); BCR-V9-6 is withdrawn with it |
| J-V9.26 | chose an owner's UX sitting on §13.6's protocol shape as a gate at M3a, because the owner is the casual user the product is for and the maps' "mastered" already rests on the owner's eye |
| J-V9.27 | chose a dedicated-user bar — a person rebuilding the known city by hand in ≤ 90 minutes — besides the scripted canvas, because the owner's words were "a dedicated user can build it", which a script cannot measure |
| J-V9.28 | chose to request persistent storage and to state eviction plainly (S-A2) over promising local permanence, because WebKit may clear script-written storage for sites not installed; an honest note beats a silent loss |
| J-V9.29 | chose pages of three variations with "Show three more" over a user-set count, because R5 names three and a fixed small number bounds the preview's cost |
| J-V9.30 | chose live-layer providers (`live.shade`, `live.links`) over thematic override rows for the two new views, because their values are a derived raster and derived bindings, not entity attributes a style row can key on |
| J-V9.31 | chose `MsgRef` (a key and arguments) for the engine's bend and conflict lines over English strings, because the catalogue then owns every word of the application's own a user reads, a locale is a file, and the coverage test can check them; **scoped by J-V9.55** to the application's own words |
| J-V9.32 | chose to state "this changes where the rules would put it; it stays here until you move it" under the siting rows over re-siting automatically, because an automatic move of a declared or dossier place would break declared-means-held (§7.2) and item 20's dossier authority |
| J-V9.33 | chose to render volume 10's `WhyAnswer` through one app-side projection, `WhyCardModel`, stated as a table (V9 §2.7), over keeping a second answer type in the base, because two shapes of one oracle cannot both be applied and volume 10 owns the oracle; the projection also carries item 102 (f)'s drivers and item 106 (g)'s closure, which only volume 10's shape holds (V9C-01) |
| J-V9.34 | chose volume 10's drawer view model and harness — the harness commits, only on the drawer's Accept or the user's apply-then-undo setting — over a shell that commits on Accept through a facade without `edit`, because volume 10's acceptance re-previews and checks the card the user saw before committing, and one committer is simpler to prove; the colliding type names are renamed (`ClerkMount`, `ClerkHandle`) and `ClerkSettings` is the one settings store (V9C-02) |
| J-V9.35 | chose to show, at the drawer's first opening, the AI label, then the data notice, then the key entry, each skippable back to "Not now", over one combined card, because consent must come before any key is typed and each card answers one question a casual user has (V9C-02) |
| J-V9.36 | chose volume 11's two document-only tables, edited by `editTable`, as the one store of the siting, link and split declarations, with a per-kind panel keyed `uid:`, `cat:` or `cls:` and no per-use siting weights (a single place is moved or pinned instead), and a `use:` key only for keeping one institution's works and shop together, over per-use attributes on `Use`, because the solver, the clerk and the canvas must read one store and item 104 (a) (1) keys the author's declaration by kind (V9C-03; XV-V9-1) |
| J-V9.37 | chose three link-edit cells — `bindTo` to keep or move a supplier, `avoid` to cut one supplier, `cut` alone to stop buying the good — over overloading `cut` with a provider, because each of the link view's four buttons then writes one unambiguous row (V9C-03; XV-V9-2) |
| J-V9.38 | chose V04's name `showUnexcavated` for the hidden-voids toggle and made it a per-viewer view key, never a logged layer field, offered only to a `secret` view, over the critique's name `underSealed` and over V04's `LayerSpec` field, because a game master's toggle must never enter the log another client reads and one name must serve both volumes (V9C-04; XV-V9-3) |
| J-V9.39 | chose to state the catacomb bend ladder once, in BCR-V9-21 as the dry run of `drawChamber { system: { newKind: 'catacomb' } }`, and to word it here, because V04's revision landed without it and R2 requires a bend for each misplaced catacomb; none of the four catacomb bends or two crypt bends refuses (V9C-08) |
| J-V9.40 | chose to expand a dwelling declaration on a sealed void into a closure that digs a way down from the nearest building within `DigRule.maxM`, else opens the nearest public opening, and to refuse only when neither exists, over refusing it, because §7.3 item 9's closure exists for exactly this and R2 allows a refusal only against a fact or a lock (V9C-07) |
| J-V9.41 | chose one preview contract for variations — volume 10's `{ event, result }[]` with a page, a `previewId` and a `thumbnail` tied to its preview — and one committed group per source, with a clerk's alternatives previewed each by its own call, over two contracts, because §7.3 item 10's variations and a clerk's alternatives are different things that must replay exactly (V9C-09, V9C-25) |
| J-V9.42 | chose to merge four requests with volume 10's — `sizeM2` clamped into the band from the median, one `MsgRef` mechanism rendered per caller, the top three `SiteCandidate`s as placement alternatives, and a record's members from `EntityCard.members` — and to withdraw this volume's `members` query, because each fact must have one owner (V9C-10) |
| J-V9.43 | chose to preview a T1 change after a declaration as a whole-town ghost with Accept, and to open the fates sheet only after Accept and only when fates move, over opening the sheet first, because R1 forbids a dialog before a picture and §12.5's model law makes the ghost affordable with a working ring (V9C-15) |
| J-V9.44 | chose to turn every refusal that is neither a dossier fact, a lock, a dependency, a role, a staged layer, the rung nor the screen into a bend with its alternative pre-selected, and to give every remaining refusal at least one button, over the first draft's fifteen refusals, because R2 and T101-5 require the closest alternative (V9C-16); **amended by J-V9.67** (withdrawn by J-VI.4; SS-32): a rule of a building's structure or of nature that the dry run names, with its offer, joins the refusals — no longer: those cases are bends |
| J-V9.45 | chose a two-phase journal — pending before the call, done with its result — with a fates-sheet confirmation journalled in its resubmission form, over writing each entry after `ok`, because a kill between the worker's commit and the write would lose a commit and break the chain of heads (V9C-17) |
| J-V9.46 | chose to make "View as" a display filter (`ViewOpts.viewAs`) separate from the view's knowledge key, over lowering the key, because a lowered key refuses the document formats and would stop autosave, ctrl / cmd+S and downloads while the owner looks through a player's eyes (V9C-18) |
| J-V9.47 | chose that a boundary drag replaces only the run between the moved handle's neighbours, that a lake offers only its level handle (its shore is its basin filled to that level), that every gate slides by `moveVertex` on its crossing, that an island's rim resizes it by `resizeIsland`, and More handles = clamp(round(perimeter ÷ 75 m), 8, 16), over whole-ring lassos and rim handles that fight the basin rule, because a handle drag must stay local (item 101 (i)) and never contradict a derivation rule (V9C-19) |
| J-V9.48 | chose to design the People panel, the person card with "Where is", the family tree and the clock here at M4b, over an out-of-scope row, because §14 places the family-tree view in `@plat/app` and no other volume owns these screens (V9C-22) |
| J-V9.49 | chose a link cache bound once per `logHead` and re-bound incrementally, compaction only when idle, and a stated cost law for the shade sampler with a coarser-cell fallback, because METROPOLIS's tens of thousands of consumers and 8 MB documents would otherwise stall the view and the previews (V9C-23) |
| J-V9.50 | chose to record each canvas-script gesture's view scale and centre and to replay it at that view, and to restate the known-city bar (a) as T101-6 states it, because the snap resolves in screen pixels and a transcript made from words resolves to different points than a hand (V9C-24) |
| J-V9.51 | chose a "Recently deleted" list kept 30 days, purged earlier only after asking, over a 10 s undo, because R11 and R15 promise that nothing is lost by one click (V9C-27) |
| J-V9.52 | chose to generate the context menu from the registry and `toolkit.json`, in a fixed order, over a hand-written menu per kind, because the panel and the menu must offer the same actions and a new kind must reach both without code (V9C-28) |
| J-V9.53 | chose to draw, over this volume's six-step shade veil, V05's revised strip rows as V05 states them — a solid line at the three-of-nine area and a dashed pending line — over three nested strip areas, because V05's revision moved the veil to this volume and kept the strips as outlines; the veil's steps carry "some, much, most of the day" (V9C-14) |
| J-V9.54 | chose "Show the whole circuit" as a `LayerSpec` option of the wall layer, drawn by S14 in both products, over a view key, because it is a choice about how the style draws walls, exported in pictures, and V07's palisade relies on it (V9C-14) |
| J-V9.55 | chose to scope the catalogue to the application's own words and to run T-V9-15's readability step over volume 10's and volume 11's rendered sentences, reporting failures to those volumes, over copying their sentences into this catalogue, because each sentence must have one owner (V9C-42); revised by J-V9.79 — the file also carries volume 10's key families, their texts volume 10's |
| J-V9.56 | chose seven size chips at population quantiles of the rungs' bands, read from the rung table, each showing its number, over three unnumbered chips, because the owner rules that population sets size within a tier (V9C-37) |
| J-V9.57 | chose to place the base's view keys, notes, pins, favourites, the grid, legend, emblem and compass controls and the ruler in named groups of the view bar and in a Notes and a Dress panel, over leaving them to a later volume, because the application is their only writer and the parity tasks need them (V9C-21) |
| J-V9.58 | chose to design item 110's tools in this volume itself (V9 §4.20) over leaving them to the architect's attachment notes, because an implementer holding the base and this volume must build them without guessing (V9C-51) |
| J-V9.59 | chose to widen `drawWall` with a `retaining` kind and `drawWay` with `raised` and the `aqueduct` class, and to add a `terrace` sugar, over new event kinds per record, because file g and volumes 6 and 10 already speak of T3's retaining kind and T4's raised flag, one tool mode maps to one event family, and the fold resolves the record by kind; the terrace is sugar because its walls lie where the levelling puts them (V9C-52) |
| J-V9.60 | chose to bend a retaining wall drawn on flat ground onto the nearest step, else into a terrace with the wall on its edge, over refusing it, because R2 allows a refusal only against a fact or a lock, and item 110 (f) wants no retaining wall on flat ground (V9C-53) |
| J-V9.61 | chose to bring a raised road or viaduct down before a town wall, through its ground way's gate, over carrying it over the wall, because a raised deck over a curtain would be an unguarded way in; the aqueduct's arch is item 110 (b)'s own rule (V9C-54) |
| J-V9.62 | chose a basic Raised toggle and an Aqueduct class chip on T4, with PageUp and PageDown while drawing, over a separate raised-way mode, because item 110 (b) names "T4 `road` with `raised`, or the aqueduct class" and the surveyed road tools raise a road with those keys (V9C-54) |
| J-V9.63 | chose a previewed Delete that needs Accept whenever the removal changes anything beyond the thing itself, over a Delete that commits at once, because R1 and R3 require the consequences to be seen first and a raised way's removal reaches routes, streets, vaults and water (V9C-55) |
| J-V9.64 | chose one typed effects list on the preview and the confirmation, with a `holds` line for a suppressing removal, over reading consequences off the ghost's geometry, because the words must reach the fates sheet, a screen reader and the clerk, and each volume owns its own consequence; the kind `added` joins the critique's seven so a Re-derive can name what it builds (V9C-56) |
| J-V9.65 | chose click-again cycling through a hit stack, with the context menu's "Select below", over a modifier-click, because alt-, shift- and ctrl-clicks are already lock, New random and reset (§14), and the stack serves raised decks, arches, crossings and tiers alike (V9C-57) |
| J-V9.66 | chose to show a deck's budget as its storey cap and footprint band, never as a count of plots, and to bend a class the deck refuses to its landward end, because the budget is volume 11's footprint and storey row and R2 bends before it refuses (V9C-58) |
| J-V9.67 | **WITHDRAWN by J-VI.4 (volumes/_integrate, 2026-09-29; item 101 R2).** Former text: chose to widen the refusal list by one named class — a rule of a building's structure or of nature that the dry run names, each with its offer — over turning volume 2's and volume 5's refusals into bends, because those volumes decided them (J-V2.73, J-V2.76; V05 §4.2) and each has a lawful offer one click away (V9C-59) |
| J-V9.68 | chose to keep a raised part on the Ground working layer, reached through the hit stack, over a fourth working-layer switch, because a raised part is a ground arena part (item 110 (b)) whose ends join ground vertices (critique §12.4) |
| J-V9.69 | chose one deck scene per raised way — a level of a multi-level scene — over drawing decks only into the ground scene's picture, because a fight on a viaduct needs the deck's parapets as walls at the deck's height, and the surveyed tabletop tool stores levels by elevation band (V9C-65) |
| J-V9.70 | chose to carry an author's removals of generated content in the skeleton, a suppressing one by its reason key, over carrying declarations only, because a removal is the author's act, the owner ruled that it holds, and the base's skeleton round trip would otherwise fail (V9C-66) |
| J-V9.71 | chose to allow a closed retaining chain as a platform over forbidding `closed`, because a temple or citadel platform is retained on every side, and item 110 (a)'s "never an enclosure" means not an `Enceinte` (no gate, no circuit), which the fold enforces (V9C-68) |
| J-V9.72 | chose an unchecked "Keep them as yours" when a Re-derive to TOWN drops a city's generated raised ways, over keeping them silently or dropping them silently, because a town builds none by its own rule while the user may want the city's, and the choice costs one click (V9C-71) |
| J-V9.73 | chose a Raised toggle that resets each time T4 is picked, and is never remembered, over a remembered one, because a remembered toggle turns the next ordinary street into a viaduct (V9C-73) |
| J-V9.74 | chose T10 `hold` as `delete`'s home tool — the Delete key and the context menu being its gestures — over leaving `delete` without a tool, because volume 10's BCR-V10-20 puts it there for the clerk, T-V9-12 and T101-1 need one home tool per kind, and the removal of generated content is a held edit of T10's class (critique-V10's CVR-V10-7) |
| J-V9.75 | chose a well pin as the bent result of an aqueduct with no higher source (J-VI.4 (h); SS-32; formerly its offer), over the critique's cistern, because a cistern is a chamber of the underground vaults system (II.7.6) that the ground tools do not draw, while a well is a ground pin the dry run places at the terminal (V9C-54 (5)) |
| J-V9.76 | **WITHDRAWN by J-VI.4 (g) (reconcile-V09-r1, SS-32): the rim case is the dry run's bend (V9 §4.20.9), the inward move its geometry (XV-V9-25), so the clerk and a skeleton get it too.** Former text: chose "Move it inside the rim" as an app-side re-draft — the stroke's points in the rim strip moved inward to 1 m inside its setback line, then previewed again — over an engine bend, because volume 5 decided the rim refusal and V9 §4.9 requires every refusal to carry a lawful offer (V9C-60) |
| J-V9.77 | chose to read a removed thing's former shape from the base's tombstone (`Tombstone.last`, BCR-V9-34) over a journal sidecar kept by the app, because a delete made by the clerk, a host or another session must also offer Show and Build it again, and the tombstone already holds the last record (V9C-55 (4)) |
| J-V9.78 | chose to expand the `terrace` sugar into volume 10's flatten mode (BCR-V10-17 with its `levelCm`) over a second levelling stroke, because the base must carry one flatten mechanism and the clerk's terrace must replay as the canvas's (critique-V10's C10-51 (2)) |
| J-V9.79 | chose to carry volume 10's key families in the one catalogue file with their `en` texts loaded from volume 10's sections, and to write here only the two sub-families volume 10 names without words (`info.under.cause.<rule>`, `info.catacomb.blocked.<cause>`), over copying volume 10's sentences into V9 §4.9 (two owners of one sentence) or leaving the keys out of the file (T-V10-29 and T-V9-15 fail and a raw key reaches the user); the `why.under.*` rows are renamed into the `info.under.*` family and point at volume 10's texts (SS-16) |
| J-V9.80 | chose a card-only mode of the one drawer, reached through a clerk slot of kind `host` that is always set in host mode, over a separate host-card component or the full drawer under configuration C, because V10 §3.17 routes a host's proposal through the same `turns` stream and card as a built-in one — a second component would draw the same card twice — and the full drawer would put a second assistant beside the host's, against "one assistant per product" (SS-06) |
| J-V9.81 | chose to hand the harness the bridge through `ClerkMount.host`, filled by the embed's bridge handler, over giving the harness the bridge transport or widening `HostSlots.clerkMode` into the whole configuration, because the bridge handler is the embed's one owner of the transport (V08 §3.1), the shell needs only the mode, and the proxy token must stay out of shell state (SS-07) |
| J-V9.82 | chose to draw `WhyAnswer.sections` as titled blocks after the facts, to withdraw `WhyCardModel.under`, and to take a raised way's `decidedBy` from its own `raised` row, over keeping `under` and this volume's own raised-way cause lines beside the sections, because each explanation must reach the screen from one row and two renderings of one outcome drift apart (SS-15) |
| J-V9.83 | chose a BCR adding a one-line `roster` to T6's row of §7.1's toolkit table (BCR-V9-35) over moving a place by a locus to T7 or having the canvas emit `assign` with an app-minted id, because a locus drop is a T6 gesture, the sugar mints the assignment id from the event's `seq` (§6.3) so neither surface writes one, and the rows must list what each tool emits for T101-2 and T-V10-1 (SS-13) |
| J-V9.84 | chose to make the canvas's T6 drop-on-a-plot mapper V10 §4.1's `where.at` and `where.plot` rows by citation — `designation { cls, use }`, the name a `setAttr` on the created use in the same group — over the canvas's former `{ cls, name }`, because the base's `Designation` has no name field and T101-3 needs the two surfaces to emit the same bytes (SS-11) |
| J-V9.85 | chose to let `ViewOpts.viewAs` hold a key form `{ tier, places }` beside a tier, set by a host's players' view through `setViewOpts`, with `effectiveKey()` returning the form when its tier is the lower and the places both lists hold otherwise, over a tier-only View as with V08 writing the party key into the view state, because the party's learned places cannot be a tier, and a view-state write refuses the frame's document formats and risks its saves (J-V9.46, SR-05, SR-06); while a host's form is set the menu's other entries are disabled and the host's strip stands for the banner, over two competing banners and a menu that could contradict the host's switch; at equal or higher form tiers the value errs toward hiding, never showing (J-A30.82) |
| J-V9.86 | chose to pass the effective key as `admitAs` on every band-less read the application makes for a view and to default the export knowledge to it, over lowering each panel's answers in the shell, because only the facade knows every withheld fact and one parameter covers every kind, present and future (SR-08; BCR-V10-22); and to keep the application's own dry runs — ghost, badge, fates sheet, refusal and bend cards, effects — at the role's key, over filtering them, because they are the user's consent to a change and a filtered dry run drops concealed uses from its fates (BCR-V10-6 (b)); BCR-V10-22's "reads and dry runs" is read as the clerk's (XV-V9-19 (c)) |
| J-V9.87 | chose to write a point-dropped `placeAt` as `plot: ''` with the point form, the dry run deriving the plot, over the shell's own hit query filling `plot`, because the canvas and the clerk must emit the same bytes (T101-3, T-V10-4) and the dry run is the one place that knows the nearest lawful plot (BCR-V10-18; SR-09) |
| J-V9.88 | chose, on a dossier-bound map, a refusal card for T6's locus drop with the element picker and **Put it at {site}** — the first candidate with no hard fails of a `sites` query narrowed by the locus (`near` its target's anchor, `district` for `in`) — over reusing `refuse.dossierOwned` or bending silently to a site, because the dossier owns the roster (item 101), R2 needs a one-click lawful alternative, and one query keeps the canvas's and the clerk's offer identical (SR-10; XV-V9-19 (b)) |
| J-V9.89 | chose to give V10's `help` and `roster` entries their controls — **How do I …?** in the drawer's menu and in Help, **Ask the assistant to place these** under T7's box, each shown only with a clerk configured and on — and to draw the help answer's `useTool` as a button, over leaving the entries reachable only by typing in the drawer or running the tool unasked, because a declared entry without a caller is a dangling wire and no assistant action runs without the user's click (SR-12; J-V9.34) |
| J-V9.90 | chose to have the skeleton import dialog run a finding's `propose` fix itself through the shell's pipeline, committed as the user's declaration with no `proposedBy`, clerk or none, over routing it to the harness, because the check must work without the model (V10 §3.21, T-V10-2), the critique engine is model-free, and `proposedBy: 'clerk'` would claim a model proposed what a rule row did; this is V10 §2.6's dispatch table's one exception (SR-13; XV-V9-19 (a)) |
| J-V9.91 | chose a `HostSlots.historyLines` list filled by the host and drawn as its own group "The party", over folding host lines into `HistoryRow` or a separate host panel, because `HistoryRow` is derived from the log alone (V9 §2.8) and a reveal is no log event, and one group at the head of the list keeps the log's rows, filters and undo untouched (J-SS2.2; SR2-01) |
| J-V9.92 | chose, for every action that makes a new document in host mode, `HostSlots.newDocuments` — `'download'` writing the new `.plat` to the user's device and releasing it, `'off'` hiding the controls — and no creation mode in host mode, over hiding the actions outright or a host-side store operation for copies, because the owner's "everything editable" keeps a past state reachable, `.plat` is the user's format in host mode (V08 §5.4 (2)), the frame holds one live document (V08 §3.1 step 6) and a host-side copy would be a new capability across the SettlementForge boundary; Enter's Same kind, new seed and `refuse.restore.dossier`'s button are included because they too make a new document, and the toast is one sentence to keep V9 §4.9's rule (J-SS2.3; SR2-02) |
| J-V9.93 | chose to give "Start a new map from this" a drawer-menu item and `attach.newMap` on `send`, standalone only, over deleting volume 10's clause and the "beside" path, because both volumes built that path and "everything editable" favours starting a new town without losing the current one, while in host mode the frame's document is the host's (J-SS2.4; SR2-13) |
| J-V9.94 | chose `ClerkMount.rebuildEvents`, one implementation in the application that the history row and the harness both call, reading the tombstones with `admitAs` at the view's effective key, over the harness rebuilding the events from the tombstone itself or reading at the role's key, because V9 §4.20.3 (4) is the one source of those events and two implementations drift, `@plat/clerk` may not import `@plat/app` (V10 §2.1), and a thing the view's key withholds must not be rebuilt from that view (J-A30.82) (J-SS2.1; SR2-14) |
| J-V9.95 | chose to give Build it again one row per kind file f item 260 suppresses — each the removed thing's own tool's declaration filled from its last record, BCR-V9-34 widened to the fields the rows read — and a deck plot's re-add by `drawFootprint` at its slot with a pre-decided fallback (withdrawn: V6 §3.19.3 (7) serves the key; SR3-12), over keeping the raised-way-only form, because the base widened the suppressed kinds (J-VI.14, ST-15) and a removal with no way back after a dependent edit breaks the owner's "add or remove"; `drawFootprint` because the base has no event that makes a bare plot and S11 fits a plot around a declared footprint (§7.1) (SR2-15) |
| J-V9.96 | chose to split V9 §3.14's older-document row into §2.9's three outcomes — (a) inside the retention window the document edits under its own version and the owner is offered the upgrade by a standalone strip, in host mode by V08 §4.2's header control alone; (b) outside it with `model` the frozen view, whose one owner control **Edit it with this version** is the `frozenImport` rebase through `edit` and `confirm`; (c) without `model` **Open its recipe with this version**, a new document made from the file's recipe and log as §6.4 opens a link, under V9 §3.9's host rule in host mode — over one row offering an upgrade and "Open its recipe" for every older document, because the base separates the three (§2.9 steps 2–3, §7.5), a version outside the window can be neither upgraded nor replayed in the browser, the frozen view's one edit had no control, one event keeps one control in host mode (J-V8.94), and opening the recipe with its log keeps the user's changes by the path the base already gives a link, with §6.4's notice (SR3-01; J-SS3.1) |
| J-V9.97 | chose to draw a frozen view's notice as the shell's own `error.frozen` strip in both modes, carrying its one control, over V08's banner slot drawing it in host mode, because that control commits an event of the document (the `frozenImport` rebase), which only the shell's pipeline issues, a slot-drawn notice beside it would show two notices or a control with no event path, and one shell in both modes is T-V9-28's premise; the banner slot keeps the players'-view strip and the held notice (XV-V9-24; SR3-01) |
| J-V9.98 | chose to define `fileMenu: false` as keeping Export skeleton, Rebuild around my drawings, Settings and About and dropping New town, Open…, Save a copy and Recently deleted (their keys inert, Settings without its Storage section), over hiding the whole menu or a separate settings control in host mode, because the kept entries are an export, an edit (§7.2's rebase has no other control) and preferences the frame needs (`openSettings`, the `host.locked` fields), the dropped ones serve the local store host mode lacks (V9 §3.8 (6)), and one menu in both modes keeps T-V9-28's allowlist short (SR3-02; J-SS3.2) |
| J-V9.99 | chose to give T7's list cards volume 10's `dossier` alternative — the element picker and **Put it at {site}** from T6's `sites` query, `near` and `district` from the line's locus and omitted for a line with none — over the list's picker alone, because one engine refusal renders one card on canvas and clerk, J-V10.93 is a recorded decision grounded in R2's one-click lawful alternative, and T6 already carries the button (SR3-03; J-SS3.3) |
| J-V9.100 | chose to word a locus as the exact reverse of V9 §4.16 (4) — the `rel`'s connective, "the {side} side of" for a side, the target's gazetteer name at the view's effective key — extending (4) to read the side form after any connective, and to write `refuse.roster.dossier` as "…on a plot {locus}" with the connective inside the slot and "in {settlement}" for a line with none, over "near {locus}" with a bare target name, because "near" would lose a locus's `in`, `on` or `at`, the round trip lets T-V9-13 test the wording mechanically, and a bare settlement name after "on a plot" is no sentence; the slots meet V10 §3.16's rule (SR3-04) |
| J-V9.101 | chose **New trees** as T12's `rerollLayer { concern: 'render.instances' }`, town-wide and committed at once, over keeping the layer chips on T10's Try again or adding `rerollLayer` to T10's row, because §7.1's T10 row lists no layer re-roll (V10's J-V10.84 built on it), T12 already homes the display re-rolls (`style.compass`, `naming.emblem`) and V10's `DressInput.restyle` reaches any concern V9 §4.3's T12 row names with no change in V10; and `render.instances` over `style.crowns`, because the trees' positions, spacing and rotation are drawn from `render.instances` (§4.9, §8.10) while `style.crowns` is a sheet's crown library, a style's look — the concern also re-draws hedgerows and render-time field strips, display only, which is the base's own "trees" layer (§7.3 item 10) (SS-29) |
| J-V9.102 | chose the dwelling closure's ladder dug access → public opening → `collapsed_shaft` from the public ground over the cluster (file f item 372's note) → the bend onto ground part 0, over SS-35's bend as the third step, because item 372 is the base record's applied text of BCR-V9-22 and keeps the user's homes below wherever any ground over the void is public, while the bend above ground — which item 101 R2 requires in place of the former refusal — is the floor only where no ground over the cluster is public and nothing over it can dig down (SS-35) |
| J-V9.103 | chose to split AP5 into AP5 (time, M4) and AP5b (host mode, M-SF), and to run T-V9-64 and T-V9-40's host clauses at M3c on the application harness's scripted host page and again at M-SF on V08's embed, over holding AP8's exit until M-SF or building part of the embed early, because V08 builds `embed.html`, `HostSlots` and its host harness in SF0, SF1 and SF6 at M-SF (J-V8.39; V08 §8.1), V10 tests its host seam at C5 on §11.3's bridge alone (T-V10-20), and the split keeps the estimate (0.75–1.25) inside the base line, since the host shell is priced with the shell (SS-34, SS-40) |
| J-V9.104 | chose to home the raised way's four context controls and a way's own `setAttr` (class, width, name, a bridge's kind) under T9, over leaving them under T4, because §7.1's T9 row owns `setAttr`, V9 §4.1 sends a panel edit to the tool that owns its kind, and volume 10 encodes every `setAttr` under T9's `set` and `span` — one home tool per kind on both surfaces and in the history's attribution; T4 keeps `drawWay`; the way's own row moves with the four because it is the same kind under the same rule (SS-46); extended by reconcile-V09-r2's second brief to a way's `split` and `merge` — **Split here** and **Join these**, which T4 no longer lists — so every kind a selected way's controls emit is T9's (SR-27; J-SS1.6) |
| J-V9.105 | chose to reach V08's `supplyChains` view through the Show menu as one more `thematic` value, offered only while the gazetteer lists an active chain at the view's key, over a host-chrome toggle or an entry always listed, because thematic views are switched only by the Show menu (V9 §5.4), a standalone copy of a dossier-bound document keeps its records and so its view, and an entry that could draw nothing would be a dead control (SS-41) |
| J-V9.106 | chose to carry J-VI.4 (d) and (e) into V9 §4.20.2 (6) and the island rows together with SS-32's (g) and (h), adding `bend.aqueduct.onIsland`, and to keep J-V9.76's inward-move geometry (every rim-strip point along the radial to 1 m inside the `setback` line) as the dry run's rule asked of volume 5 (XV-V9-25), over leaving the island rows as refusals with offers and the distance unstated, because T-V9-52's text and J-VI.4 decide the island bends, one key per bent result keeps each line true (an aqueduct cut short at the rim is not one turned into a fountain), and V5 §3.22 (4) says "inward past the rim walk" without a distance an implementer could build (SS-32) |
| J-V9.107 | chose to form a dossier group from a `dossierFacts` event and the port's `host:port` events that follow it, up to the next ledger event or another session's event, with `HistoryRow.dossierGroup` derived from it, over reading `EditEvent.group` as the seam issue's text had it, because V08 §3.6 step 6 gives the port's events no `group` (C8-15; J-V8.59) and commits an absorb, or a creation's prefix, in one run, so the session and the next ledger event bound the group exactly; and chose the creation head for a ledger event that is the log's first, since a creation's prefix opens with one (V08 §3.6 step 4) (SR-22) |
| J-V9.108 | chose to resolve a note's binding keys by a new `entity` input `dossierKey` (BCR-V9-36) over having V08 store addresses in `PortNote.keys` or the panel scanning every entity's `EntityCard.dossierKey`, because the notes are stored by binding key for byte identity across editors (V08 §2.4), one band-less read per key keeps admission under `admitAs` like every other read the application makes (V9 §2.7), and a scan would cost a query per entity (SR-22) |
| J-V9.109 | chose to word the report's "What moved" entries and its placement states as catalogue families (`report.moved.<kind>`, `report.dossier.<state>`) over words composed in the panel, because the history's dossier lines now render the same entries (SR-22) and T-V9-15's rule is that no engine code reaches a user without a row; the words are our own, one sentence each |
| J-V9.110 | chose to read **New names — this quarter**'s gazetteer with `admitAs` = `effectiveKey()` over the role's key that SR-29's text named, because V9 §2.7's band-less read rule (J-V9.86) already sends every `gazetteer` read with the view's effective key, volume 10 reads the same scope with the session's effective key (J-V10.95; CVR-V10-18 (a)) so the two surfaces write the same bytes, and a name View as withholds would otherwise be re-drawn out of the user's sight; with View as off the two keys are one. The scope is the quarter and every row not marked withheld whose district it is (J-SS1.8), `ids` in address order (CVR-V10-18 (c)) |
| J-V9.111 | chose `refuse.assignment.noSite`'s **Put it at {site}** as the same declaration at the refusal's first `moveTo` target — an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` — over one `placeAt` for both, because a refused new assignment has no element yet for a `placeAt` to pin, while a `rejectSite`'s element exists and keeps its rejection; the marked places are the refusal's `moveTo` actions, the channel the base's F-EDIT already fills (SR-30) |
| J-V9.112 | chose **Use another building** as a re-preview of the declaration grouped after an explicit `addUndergroundAccess` from the next qualifying building, the buildings listed by the dry run in `PreviewResult.alternatives` and the access's target defaulted by BCR-V9-22's grouped-access rule, over an exclusion field on the declaration or the application naming the target element, because only the dry run knows which buildings qualify and which element each measures from, the events stay the base's, and the clerk's `propose` carries the same bytes (V10 §3.16); and removed "Dig from a building instead" from the opening's bend, because steps 2 and 3 run only when no building qualifies (SR-36) |
| J-V9.113 | chose to draw V08 §4.6 item 3's `info.raised.suppressed` line from a per-epoch list on V06's `EpochReport.raised` (`suppressedFired`, XV-V9-28) over a `why` read per removed way, because the epoch report is already the panel's read for an epoch (V06 W19), `raisedOutcome` answers one subject at a time (BCR-V10-21) and would query every removed way at every epoch, and the report's `suppressedHeld` count names no removal to Show (found beside SR-22) |
| J-V9.114 | chose, for SR2-23, a key argument on `HostSlots.historyLines.list` — the shell calling `list(effectiveKey())` each time it draws the group and re-listing on each `onChange` and each `onEffectiveKey` — over handing `effectiveKey` and `onEffectiveKey` to the embed's bridge handler or letting the handler compute its own key, because V9 §2.10 makes the shell's computation the only one and hands it only to the clerk slot, the shell already re-draws its panels on `onEffectiveKey` (V9 §2.7), the View as menu is the shell's and the handler would never see it change, and a provider that is given its key keeps no View-as state of its own (J-SS2.8) |
| J-V9.115 | chose, for SR2-26, one **New decoration** control writing `style.jitter` then `style.crowns` as one group, over two controls or folding `style.crowns` into **New trees**, because the base's own word for the pair is "decoration" (§7.4's `rerollLayer` row), J-V9.101 fixed New trees' bytes to `render.instances` alone (which volume 10's `restyle` encodes), and one plain button suits the owner's reader; the group's history is one row, and volume 10's `restyle` takes the same group as one value, `'decoration'` (V10 §4.1's T12 row; J-V10.99; J-SS2.9); found beside it, the `rerollLayer` template gains "New emblem" and "New compass", which SR-29's two buttons wrote with no words of their own |
| J-V9.116 | chose, for SR2-27, to render the `{ id }` arguments of the report-entry lines and of the report panel's two lists by band-less `entity` reads at `effectiveKey()`, a withheld address shown as its `kind.<registry kind>` word and left out of the line's targets, over the role's key or dropping the line as a withheld note line is dropped, because V9 §2.7 makes every band-less read speak for its view, a report entry says that something changed (which the viewer may know) while its name is the secret, and the kind word is how the gazetteer and the why card already show a withheld place; V9 §2.9's `MsgRef` comment now separates the engine-built messages (the caller's key, the role's for the application's own dry runs, J-V9.86) from the lines a panel builds (the view's key) |
| J-V9.117 | chose to mark XV-V9-27 and XV-V9-28 **Met** with their citations over the issue's "**Open** (V04; SR3-11)" and "**Open** (V06; SR3-10)", because both owners' lanes landed the requested text after the issue was raised (V4 §3.8, 11:35; V6 §2.10 and §3.19.3 (2), 11:39) and were read here, and a status left behind a landed sibling is the defect SR3-12 names; V9 §12 keeps nothing PLAUSIBLE on their adoption (seam-surfaces-r3 SR3-12 (b), (d)) |
| J-V9.118 | chose to give `bend.under.accessDug`'s alternative a catalogue list form, "Dig down from {building} instead", beside the canvas's stepping **Use another building**, over volume 10 joining that button's text with a building's name, because a card that shows every alternative at once needs one label per building, a joined label is a line no catalogue row holds (V9 §4.9's one-source rule; a locale could not reorder it), and `{building}` is read at the reader's key as every other slot is (the canvas's dry runs at the role's key, J-V9.86; the clerk at its session key) (SR3-12 (e), with SR3-14 (b)) |
| J-V9.119 | chose to cite XV-V9-12's raised-way reading as `RaisedOutcome`'s reason key (`key`, V6 §2.13's `RaisedReasonKey`) with its `declared` outcome and IN-V10-2's `raised[].reason`, over the issue's `RaisedOutcome.reason`, because V10 §2.13's type names no field `reason` and a Met citation must name a field its target holds; and to carry SR4-05's companions to three drawer places the issue did not list — V9 §2.10's viewer sentence and V9 §4.11's *Knowledge and roles* (`refuse.viewer`, `clerk.view.cleared`) and the card-only drawer's stale card (no **Ask again**, since V10 §2.6's host card offers no `retry`) — because every key V9 §4.9's table loads needs a place the drawer draws it (the one-source rule; the wiring standard) (seam-surfaces-r4 SR4-05) |
| J-V9.120 | chose to cite V10 §3.5 step 3's *The why target* for the canvas's **Show me why** (V9 §4.9's opening rule) over keeping this volume's looser wording beside it or moving the rule here, because volume 10 wrote it once for both readers with each one's key (the canvas's the role's key, J-V9.86; the clerk's its session key), the canvas and the clerk must open one card or page for one row (T101-3; J-SS4.1), and a second statement could drift (the one-source rule); the canvas's build (AP3) implements the rule from that text (CVR-V10-19 (b), with SR4-05) |
| J-V9.121 | chose, for SR5-01, the typed button list the seam asked for (`MsgRow.buttons?: MsgButton[]`, the words in a shared `button.*` family, V9 §4.9's button column written as the list, every `refuse.*` row ending with `button.showWhy`) and to add five things its interface lacked, each because a row needed it to be data rather than prose: a sixth class `app` for the buttons of application-only rows (downloads, reloads, the frozen and mismatch choices, restores, shares, the key and cap lines, View as) — commands that are neither a map commit, a why, a selection, a tool nor a withdrawal, which the seam's PLAUSIBLE clause had not checked — never on a row a dry run answers, so the clerk's five-way mapping stays whole; `event` naming one of 21 event forms written once in V9 §4.9, so "the one event the row names" is data both cards build byte for byte; `each`, the list form J-V9.118 already gave the dug-access alternative, extended to **Choose another of the marked places**; `when` for the `[owner]` and `[names]` conditions the prose carried; and `command` naming one of 24 application commands. Also chose to key a `ConflictAction`'s `msg` (BCR-V9-12) as the button that carries it, over a second wording beside the row's, so BCR-V9-12's field keeps its consumer and the clerk's "a dry-run action's own message" label equals the canvas's words; **Move it** as a `show` (the canvas moves a selection by dragging, V9 §4.6; J-SS5.3); and locale files that carry `text` only, so a translation cannot change what a button does (seam-surfaces-r5 SR5-01; XV-V9-30) |
| J-V9.122 | chose, for SR5-04, volume 6's bend over V9 §3.9's disabled control: below a rebase point every copy and re-run — the history and chronicle rows, the restore points and the drawer's `fork` and `rerun` — takes the earliest seq with V6 §3.15.5's line as `info.copy.condensed`, loaded from volume 6 like volume 10's families, and the app detects the bend from the new document's `forkedFrom.seq` exceeding the seq asked rather than from a new return field, because V6 §4.4 already records that header and a second channel would restate it (J-V6.98; ST-35; the one-source rule) |
| J-V9.123 | chose to withdraw two buttons found unwired while writing SR5-01's lists rather than invent a source for each: `bend.capacity`'s "Show larger buildings nearby" (no query or preview field names buildings with room — BCR-V9-12's `alternatives` are a placement's plots — so the row offers **Show me why**, whose why card shows the building's capacity) and `success.saved`'s "Show" (a page cannot reveal a saved file on the user's device); and, beside them, to give `refuse.stale` **Show me why** and put `refuse.undo.dossier`'s **Show me why** last, as the rule made data requires, and to read `bend.place.noSite`'s other sites as `PreviewResult.alternatives`, as file f item 582 bends them, not as `moveTo` actions (seam-surfaces-r5 SR5-01 (b), (c)) |
| J-V9.124 | chose to name tool modes by a rule — each mode's name in its row in lower camel case, T9's contextual modes by what is selected — with the ids the buttons open written out (T6's `access`, T9's `tiers` and `massing`, T11's `rename`), over a separate id table, because `toolkit.json`'s rows already carry the names; and to state the why page's id forms, `messages#<key>` for a row and `staged/<layerId>` for a staged layer (generated by `@plat/docs` from the base's staged table), because V10 §3.5 step 3's target rule and `refuse.staged`'s `page` need an address both cards open and T-V9-32 can walk (seam-surfaces-r5 SR5-07 (a), (c)) |
| J-V9.125 | *Finalization (seam-settlements-r6 SR6-03).* Chose to scope the roster reader and T6's stamp palette to the classes the document's rung admits — the town-and-city, sky and generic rows at a base rung; the `v.` rows, the self-playing town-and-city rows and the generic rows at a village rung, a row with a `villageForm` answering through its `v.` row — with ties by `commonness` inside that set and a `v.` row first at a village rung, over one match across both namespaces with a tie on `commonness`, because volume 11 makes a label unique only within its namespace (45 words shared by script), the two `commonness` cells mean different shares (TOWN over about 180 rows, VILLAGE over 25), and a village class declared on a town map is a wrong declaration the user never asked for. |

## 10 Base change requests

### 10.1 Requests to the base

Each request names the base section by its exact heading, quotes the current text once and gives the new text or the
mechanism; this volume is designed as if every request were applied. Requests that carry a file-g rule cite its item and
add only what g does not already state.

**BCR-V9-1 — the reference UI's contents.** `## §14 Package and module layout, key interfaces, dependency rules, extension
points`, the paragraph **`@plat/app`, the reference UI.** Current: "the history panel; the tables
editor and the style dialog; the ruler (§9.5);". New: "the history panel with restore points, "Go back to here" and
"Open a copy from here", and the orphans list; the fates sheet; the export dialog and the share sheet; settings; the local
store with autosave and crash recovery (the file `DocResolver`, §11.5); the clerk drawer; the tables editor and the style
dialog; the ruler (§9.5); — the application at build depth is volume 9 (`docs/volumes/V09-application.md`), one shell for
the standalone entry and the host entry (BCR-V8-3), installable and usable offline". Add to the package's line in the
package list: "`@plat/app` the reference UI (below): the shell, its screens and flows (volume 9)".

**BCR-V9-2 — the walls control and the keymap.** (a) `## §14 …`, the per-tool interaction table. Current: "| T1 `intend`
(L0) | pick a site card and a size; drag the wealth and walls sliders (§7.8's basic panel) |" (BCR-V6-11 (b) edits the same
cell; both apply). New: "| T1 `intend` (L0) | pick a site card and a size; drag the wealth slider and pick the walls chip
(none · one ring · two rings) (§7.8's basic panel) |". (b) `### 7.8 Controls: monotone, continuous, documented; the
control-surface budget (O16 f, R15)`. Current: "its two
  sliders the wealth level and the walls (item 101 (g))". New: "its wealth slider and its walls chip (item 101 (g), the
walls control being discrete in the registry; volume 9 J-V9.14)". (c) `## §14 …`, *Input scheme*: after "**?** the keymap
overlay." add "Volume 9 §4.13 adds the tool keys 1–9 (T1–T9, outside a warp session), alt+Enter (lock), F2 (rename),
S (dress), Enter (accept), [ and ] (variations), Tab (handles), Delete (delete, or "not here" for a dossier element), H
(history), E (export), ctrl / cmd+S (download a copy), ctrl / cmd+O (open), Space (pan) and X (the assistant)."

**BCR-V9-3 — three view keys.** `### 2.9 The document and serialisation`, *View state*. Current: "season, weather, frame,
map rotation, compass, legend and emblem settings, `exportAnchor` (§11.1)". New: "season, weather, frame, map rotation,
compass, legend and emblem settings, `exportAnchor` (§11.1), `thematic` (per viewer: the thematic view shown — `none`,
`wealth`, `shade`, `links`, `quarters`, `uses`, `knowledge`, `coverage`, `voids`, `supplyChains` (volume 8 §5.2's view of
SettlementForge's active custom chains, BCR-V8-15; reconcile-V09-r1, SS-41); volume 9 §5.4), `workingLayer` (per viewer: the layer the
tools act on — ground, a sky island's `PlatKey`, or an underground depth band; volume 9 §4.2), `restore/<id>` (shared, one
key per restore point: `{ seq, name, auto?, createdAt, session }`, written to `null` to delete; volume 9 §2.8)". §11.3's
*View state* list gains `thematic` and `workingLayer` among the per-viewer keys that travel by `view.set` and never cross
to other clients as shared state, and `restore/<id>` among the shared keys.

**BCR-V9-4 — withdrawn by the revision (V9C-03; J-V9.36).** The map-side declarations are volume 11's document-only
tables `siting.declared` and `siting.linkEdits` (BCR-V11-10), written by `editTable`; no field is added to `Use`. The key
forms and cells this volume needs of them are requested of volume 11 (V9 §10.2 XV-V9-1, XV-V9-2).

**BCR-V9-5 — the `links` query kind (item 105 (j)).** `### 11.2 The embedding API and the worker boundary (SCL-6)`,
`type Query`. Current (its last member): "| { kind: 'why'; id: Id; path?: string };". New: that member (as BCR-V10-1 extends it),
then "| { kind: 'links'; ids?: Id[]; region?: Box; good?: string; page?: number } /* item 105 (j): the supply links bound by
S10a/S10b's binding function, read from the generation worker's link cache (volume 9 §3.15), recomputed and never stored —
`LinkRow`s (volume 9 §2.7), with each link's orientation, its declared link-edit row and a SettlementForge chain's status */".
It is filtered by the caller's key as §11.2's *Knowledge* paragraph states for `why`: a withheld end given by address and
kind, a concealed use's links left out. The first draft's `members` query kind is **withdrawn** (V9C-10; J-V9.42): a
record's members are `EntityCard.members` (BCR-V10-1).

**BCR-V9-6 — withdrawn by the revision (V9C-01; J-V9.33).** The oracle's answer is volume 10's `WhyAnswer`, placed in
§11.2 by BCR-V10-1; this volume adds no type to the base for it and renders it through its own `WhyCardModel` (volume 9
§2.7).

**BCR-V9-7 — two live layers and the model view's field driver (item 102 (f), item 105 (j)).** `### 8.2 Style sheets as data:
roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)`, *Live layers*. Current: "Shipped:
`live.selection` (overlay);". New: "Shipped: `live.selection` (overlay); `live.shade` (base; item 102 (f): the daylight-share
driver's raster as six stepped ink veils under the building fills, an island's shade strip outlined — volume 9 §5.4);
`live.links` (overlay; item 105 (j): the bound supply links as curved provider-to-consumer arcs by volume and good —
volume 9 §5.4); `live.coverage` (overlay; item 103 (f): for a selected class, the catchments that lack a member, from
volume 1's `catchmentOf`); `live.voids` (overlay: the underground systems' footprints on the ground with the districts above
them, from volume 1's `districtsAbove`, knowledge-filtered; volume 9 §5.4);". The shade provider draws volume 5's
`sky.island.shadeStrip` and `sky.island.shadePending` rows over its veil as volume 5 states them. The model view a provider receives gains `fieldDriver(id: 'daylight'): { cellCm: number; origin: PointCm;
w: number; h: number; values: Uint8Array }` — the field's driver raster as §4.5 holds it, or computed on demand by item
102 (a)'s sampler and cached per document state when the field skipped it; read-only.

**BCR-V9-8 — the application's tables.** `## §14 …`, the `@plat/tables` line. Current: "packs (§10.4) and the default
keymap as versioned JSON with provenance; loaders; the override layer". New: "packs (§10.4), the default keymap, the
toolkit's rows `toolkit.json` (the twelve tools, their modes, the parameters the volumes add, their `emits`, first-use
hints and availability by layout; volume 9 §2.3) and the message catalogue `messages/<locale>.json` (every bend, refusal,
fate, error, share condition and hint in plain words, keyed, with the engine codes each renders; volume 9 §2.9, §4.9) as
versioned JSON with provenance; loaders; the override layer". Every table the UI shows rows of (class rows, district kinds,
goods, style presets) carries a display `label` cell and an optional `icon` cell, and the class rows also `synonyms` and `commonness` cells for
the roster reader (volume 9 §4.16); volume 11 writes the rows.

**BCR-V9-9 — the feature snap by role.** `## §14 …`, `interface RoleIndex`. Current: "snap(p: Point, radiusPx: number, stop:
ZoomStop): Point | null /* the measure tool, §9.5 */". New: "snap(p: Point, radiusPx: number, stop: ZoomStop, roles?: Role[]
/* the candidate roles, in priority order; absent: way centre-lines, face edges and vertices (the ruler) */): { p: Point;
role: Role } | null /* the ruler and the authoring surfaces' feature snap, §9.5; volume 9 §3.4 lists each tool's roles,
the natural-barrier edges of item 106 (a) — cliff and escarpment edges, gorge rims, deep-marsh edges and shores — among
them */". §9.5's *Authoring surfaces* sentence "The **feature snap** lights the candidate edge — a street centre-line, a
shore, a wall, a ridge, a block edge —" gains ", a natural barrier for the wall tool (item 106 (g))". The same request updates
the caller the base already has: §9.5's *Measure tool* sentence "snapping to way centrelines, face edges and vertices
through the display-list index (8 px radius) — `RoleIndex.snap` in the tile worker" reads the answer's `{ p }` (the ruler
passes no `roles`, so the default roles are its own) (V9C-43).

**BCR-V9-10 — variations through the preview, and their thumbnails (merged with BCR-V10-6 (b); V9C-09, V9C-25;
J-V9.41).** `### 11.2 The embedding API and the worker boundary (SCL-6)`, `PlatApi`. Current: "preview(h: DocHandle, e:
EditEvent | EditEvent[], opts?: { view?: ViewHandle }): Promise<PreviewResult>;". New, one text for both volumes:
"preview(h: DocHandle, e: EditEvent | EditEvent[], opts?: { view?: ViewHandle; filtered?: boolean; variations?: 3; page?:
number; focus?: number }): Promise<PreviewResult>;" — `filtered` as BCR-V10-6 (b) states it; with `variations: 3` a derived
fill's dry run returns §7.3 item 10's three overlays in the `ok` branch as `previewId: string; variations: { event: EditEvent
/* resolved, with its absolute reroll map */; result: PreviewResult }[]`, `page` advancing past the rerolls used (§5.1 (6),
within `reroll.maxAdvance`) and `focus` choosing the overlay drawn as `live.ghost`; the overlays are held in the generation
worker until the draft commits or cancels. A clerk's alternatives are separate `preview` calls, one per variation. A new
call "thumbnail(h: DocHandle, req: { previewId: string; variation: number; box: BoxCm; px: [number, number] }):
Promise<ImageBitmap>" returns the tile worker's export-class raster of that preview's overlay ghost marks (≤ 160 × 120 CSS
px at the view's DPR, transferred). §7.3 item 10 gains the committed form of each source: a `fill` commits as [`fill`,
`regenerate { scope, mode: 'newRandom', rerolls }`], a field brush as [`setField`, `regenerate { scope: the blocks the dry
run re-derives past τ, … }`], a quarter's fabric as [`quarter`, `regenerate { scope: the new district, … }`], a scoped New
random as the `regenerate` alone — each one group.

**BCR-V9-11 — the wall's arcs in its preview (item 106 (a), (c), (g)).** `### 11.2 …`, `PreviewResult`. Current: "shape?:
PolygonCm | PointCm[] /* a points form's derived shape, resolved as the event would store it (§7.1) */;". New: that field,
then "`arcs?: { kind: 'walled' | 'barrier'; grade?: 'full' | 'light' | 'closure'; barrier?: 'shore' | 'cliff' | 'gorge' |
'marsh' | 'sheer' | 'enceinte' /* J-VI.3 */; points: PointCm[] }[]` /* a `drawWall` or `placeGate` preview: the derived circuit's arcs, typed by item 106 (a)'s
closure and (c)'s grade, with each anchor tower's point in `anchors` */; `anchors?: PointCm[]`".

**BCR-V9-12 — message keys in the preview, and placement alternatives (merged with BCR-V10-6 (c) and BCR-V10-1; V9C-10;
J-V9.42).** `### 11.2 …`, `PreviewResult` and `ConflictAction`. Current: "bent?: string /* the one-line reason a declaration
was bent to the nearest lawful one (R2) */ };" and "type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'reroute'|'stale'|'invalid';
target?: Id; at?: PointCm; message: string };". New: "bent?: MsgRef /* the reason as a message key with its
arguments; an argument that is an address is rendered under the caller's key (a withheld place as its kind), BCR-V10-6 (c);
its English text is the application's catalogue's (volume 9 §2.9) */; alternatives?: Id[] /* a placement's (placeAt, assign,
roster line) top three plots: the first three `SiteCandidate`s the `sites` query (BCR-V10-1) returns for its class at its
anchor or locus */ };" and "type ConflictAction = { kind: …; target?: Id; at?: PointCm; message: string /* the English
default */; msg: MsgRef }", with `type MsgRef = { key: string; args?: Record<string, string | number | { id: Id }> }` declared
in `@plat/model`. §5.2's F-EDIT row's messages are these `MsgRef`s (BCR-V10-6 (c)'s "templates with address slots, rendered
per caller"), and volume 10's `DraftItem.bent` carries the same type (V9 §10.2 XV-V9-7).

**BCR-V9-13 — a wall stretch's grade as an edit (item 106 (c)).** `### 7.1 Edits are ordered events on addresses; the named
actions; the edit targets; dry-run validation`, the edit-target table. Current: "| walls, gates, towers | `drawWall` (its
points form, item 101), `placeGate` (sugar, item 101), `moveVertex`, `setAttr`, `delete`,". New: "| walls, gates, towers |
`drawWall` (its points form, item 101), `placeGate` (sugar, item 101), `moveVertex`, `setAttr` (among them a stretch's grade,
`profile/<arc ordinal>/grade` = `full` · `light` · `closure`, item 106 (c): an edited path S7's operator keeps as a fixed
input, `closure` admitted only on an arc whose barrier closes by item 106 (a)'s defensibility table and otherwise bent to
`light`), `delete`,".

**BCR-V9-14 — an export's knowledge tier, lowered only (the key form SR-06, SR-08).** `### 11.1 Formats`, *Knowledge*.
Current: "Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3)". New: "Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3), or a lower admission the request names (`ExportOpts.knowledge`: a tier, or a
key form `{ tier, places }` — the union of `ViewOpts.viewAs`, BCR-V9-23 — admitting exactly what both it and the
caller's key admit, so never above the caller's; the bridge's `export.request` carries the same field, BCR-V8-1)". An
application passes the view's effective key there by default (volume 9 §5.10).

**BCR-V9-15 — the tabletop scene's four details (R18).** `### 11.1 Formats`, *The `.dd2vtt` profile (DEF-4)*. (a) *Fields*,
after "`portals` — doors at every entrance of a building's entrance set": add "(written `closed: true`); a window, where a
storey's scene writes one, is a portal written `closed: false`, since the format has no window flag and importers read an
open portal as a window". (b) *Fields*, `lights`: "`color`" becomes "`color` as eight hexadecimal digits, alpha first
(`AARRGGBB`)". (c) *Foundry scene JSON*: add "the grid size and distance are written before the walls". (d) *Scope*: add
"on request a plain PNG of the scene named `{cols}x{rows}` is written beside the file, for tabletops that read the grid
from the file name". Evidence: `research/ux/tool-survey.md` E4.

**BCR-V9-16 — a quarter's target size and the badge's plus and minus (merged with BCR-V10-12; V9C-10, V9C-41;
J-V9.42).** `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`, `type
PointsForm`. Current: "sizeM2?: number /* a harbour basin's size */ };". New, one text for both volumes: "sizeM2?: number /*
a harbour basin's size; for a quarter, its target area, clamped into its kind's size band — absent: the band's median (the
grower's default) */ };", and the *Points in, shape out* sentence on the quarter gains "…to its kind's size band by §4.5's
grower, or to `sizeM2` within that band when given". `### 9.5 Furniture, framing and tools`, *Authoring surfaces*. Current:
"with plus and minus that re-run the dry run at one more or one fewer". New: "with plus and minus that re-run the dry run at
the next step of the declaration's size — a quarter's `sizeM2` by (its band's maximum − its minimum) ÷ 8, clamped into the
band, from the median when unset; a fill's density dial by one step (volume 9 §4.5); a roster's badge has none (its size is
its lines)".

**BCR-V9-17 — when the first-five-minutes sessions run.** `### 13.4 Visual regression, B-ZOOM and the app harness`, *The
first-five-minutes test*. Current: "At the M2a exit and again at the M3a exit, five to eight". New: "Inside M3a — on its
midpoint build, once T5's and T6's events have landed, and again at its exit — five to eight", and at the paragraph's end:
"At the M2a exit a pipeline session of three to five such participants runs the tasks the M2a build can express — a scoped
re-roll that keeps a locked thing, a shape task, going back in the history and adding a compass — recorded and not gating,
its findings feeding M3a (volume 9 §7.3)." `## §16 Build plan — calibration and spikes first, then a viewable town, then
editing, then parity, then stage 2`: the M2a row's "the first session of item 101's first-five-minutes test (§13.4)" reads
"the pipeline session of item 101's first-five-minutes test (§13.4)", and the M3a row's "the second session of its
first-five-minutes test (§13.4)" reads "both four-task sessions of its first-five-minutes test (§13.4), at its midpoint and
its exit". No work moves between milestones.

**BCR-V9-18 — the application's pricing.** `## §16 …`, the effort table. Current: "| the reference app's UI (panels, drawing
and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented
parameters, accessibility, context help, keymap) | 8.5–12.5 |". New: "| the reference app's UI (…as now…) and volume 9's
build-depth additions — autosave with crash recovery, restore points, the message catalogue, the file-g interface (siting
rows, the link view and edits, split merge-back, wall grades, record members, the shade view, the why card), the export
dialog's estimates and tabletop details, touch and the three layout classes, the guided first town, the owner's sittings
and the known-city canvas bars; the base edits, view keys, notes, pins and ruler, the context menu, View as, Recently
deleted, re-run and volume 6's exports, people and the family tree; item 110 on the canvas — the retaining, terrace, raised
and aqueduct tools, removing and re-adding, decks, the effects list, the hit stack, the item-110 export rows, the skeleton's
removals and the second known-city canvas script | 16.75–24.75 |" (the staged layers', the staged clerk's and the building
band's screens, 2.75–4.25 pw, are priced with their staged milestones, V9 §10.2 XV-V9-8); the milestone rows M1, M2a, M3a, M3b, M4
and M4b widen by volume 9 §8.1's
step rows less the base's shares, and the totals follow (the integration pass states the new totals once).

**BCR-V9-19 — a label and a help anchor per edit path.** `### 2.8 Identity, lifecycle, provenance, the entity registry`,
*The entity registry*. Current: "**edit kinds with their undo path and lifecycle row** (§7.1, §7.4);". New: "**edit kinds with
their undo path and lifecycle row** (§7.1, §7.4), and per editable attribute path a display `label` (a message-catalogue key)
and a `help` anchor in `@plat/docs` — read by the reference UI's generated context panel (volume 9 §4.4) and by the guide;
the completeness test covers them;".

**BCR-V9-20 — the hidden-voids view key and its knowledge rule (item 109 (j) (2); V9C-04; J-V9.38).** (a) `### 2.9 The
document and serialisation`, *View state*. Current: "`handLantern` (underground only; off by default)". New:
"`handLantern` (underground only; off by default), `showUnexcavated` (underground only; per viewer; off by default: draw the
caverns and ruins nobody in town has found in V04's unexcavated style — honoured only for a key of tier `secret`, read as
`false` by any other; volume 9 §4.17.1)". (b) `### 11.3 The host bridge — the host is the store (FTG-12)`, *View state*.
Current: "and so do the light keys `light`, `sunMode`, `sunHeight` and `handLantern` (§8.4; item 68)". New: "and so do the
light keys `light`, `sunMode`, `sunHeight` and `handLantern` (§8.4; item 68) and the per-viewer `showUnexcavated` (volume 9
§4.17.1)". (c) `### 11.1 Formats`, *Knowledge*. Current: "nor the lights, glows and shafts those hosts carry (§8.1 item 7;
J-A63.82)." New: the same, then "An unexcavated cavern or ruin element (volume 4's excavation reading), its label, its links
and its lights are admitted only at tier `secret`: a picture draws them only when the request's view has
`showUnexcavated` on, GeoJSON and glTF carry them only at `secret`, and a VTT scene never." The request replaces V04's
`LayerSpec.showUnexcavated` field of BCR-10 (V9 §10.2 XV-V9-3).

**BCR-V9-21 — a chamber that starts a system, and the catacomb bend ladder (item 109 (h), (k) as revised ~20:05, J111;
V9C-05, V9C-08; J-V9.39).** `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run
validation`. Current: "| { t: 'drawChamber'; system: Id; polygon: PolygonCm; floorCm?: Cm }   // item 65: a chamber of an
underground system, in its part (II.7.6)". New: "| { t: 'drawChamber'; system: Id | { newKind: 'ruin'|'cavern'|'catacomb' };
polygon: PolygonCm; floorCm?: Cm }   // item 65: a chamber of an underground system, in its part (II.7.6); with `newKind`, a
closure (§7.3 item 9) that creates the system with its first chamber — a `ruin` with its record of source `declared` and its
axis from the chamber, a `cavern` of the site's geology, a `catacomb` by the ladder below; its undo removes both". After the
edit-target table add: "**A new catacomb from a chamber** (item 109 (k)). The dry run of `drawChamber { system: { newKind:
'catacomb' } }` bends to the nearest lawful form and never refuses: (a) its centroid inside a church-class building's
footprint → `setAttr(building, 'basement/crypt/ring', <the drawn ring clipped to the building's crypt region>)` and no chamber
is laid, and on a building without a basement volume 3's crypt ladder makes a crypt-only basement (volume 3 §4.2; V3C-75); (b) on a burial face (volume 4 §3.5.1
(1)) with the settlement's catacomb count reached → it joins the complex of which an element lies within `accessReachM`,
else becomes one `ossuary` chamber of the `dug` system under that face capped at `charnelMaxM2` (a charnel vault); (c)
below TOWN → the charnel vault; (d) on no burial face, or on a worked-out quarry below CITY → the chamber stays in the
`dug` system; a worked-out quarry at CITY or METROPOLIS within `ossuaryReachM` is a quarry ossuary. Otherwise it forms a
complex under that face within the count. Each outcome carries its `bent` `MsgRef` (volume 9 §4.9's `bend.catacomb.*`)."
The crypt bends of volume 9 §4.17.5 (e) are volume 3's plan-event dry runs (V9 §10.2 XV-V9-5).

**BCR-V9-22 — dwellings in a sealed void as a closure (item 109 (j) (4); V9C-07; J-V9.40).** `### 7.3 Locality — effective
scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`, item 9 (d). Current: "and every later edit kind that
implies missing prerequisites declares its generators the same way." New: the same, then "A declaration that places
dwellings in an underground cluster nobody can reach (volume 4's excavation reading `unexcavated`) — a `quarter` or
`drawBoundary` on a void part, a `placeAt` of a dwelling class on a void plot — is a closure too: its generators are a dug
access from the ground building nearest above the cluster whose dig floor lies within `DigRule.maxM` of the cluster's
nearest element (volume 4 §3.5.7 (d)'s kinds, cause `edit`), else a public opening at the nearest of volume 4 §3.5.7 (e)'s
candidates, its chance waived (cause `edit`), else a public opening of kind `collapsed_shaft` at the point of public ground
over the cluster nearest, in plan, to its shallowest element (cause `edit`; file f item 372's note, J-VI.4); where none of
the three exists — no public ground lies over the cluster — the dry run bends the declaration onto ground part 0 over the
same footprint and names the bend (`bend.under.noAccess`), offering "add a way down" (item 101 R2; reconcile-V09-r1,
SS-35)." And (reconcile-V09-r2's second brief, SR-36; J-V9.112) the same item gains: "With the dug access, the dry run
lists in `PreviewResult.alternatives` the further buildings the same rule qualifies, in its order (plan distance, then
address), at most three; and an `addUndergroundAccess` without a `target`, grouped before a dwelling declaration on that
cluster from one of those buildings, takes as its target the cluster's element nearest in plan to the building's
footprint (ties by address) — the element the dug access measures from — so the declaration's closure finds the cluster
reachable and generates no access of its own." `### 11.2 …`, `PreviewResult`'s `alternatives` comment (as BCR-V9-12
revises it) adds "; for a dwelling closure bent to a dug access (§7.3 item 9 (d)), the further qualifying buildings in
that rule's order, at most three".

**BCR-V9-23 — "View as" as a display filter (V9C-18; J-V9.46; the key form SR-06, J-V9.85).** `### 11.2 The embedding
API and the worker boundary (SCL-6)`. Current: "view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?:
ViewOpts): Promise<ViewHandle>;". New: the same, with `ViewOpts` declared beside it as "interface ViewOpts { /* the
view's existing options */ viewAs?: 'public' | 'local' | 'secret' | { tier: 'public' | 'local'; places: Id[] } /* a
display filter: this view's drawing, labels and reads admit exactly what both the view's knowledge key and viewAs admit
(BCR-V10-22's reading) — a tier alone is read with the key's places; a key form is a key in its own right, so when its
tier is the lower its places stand in for the key's, a place the key withholds staying withheld (a host's party key:
volume 8's players' view); the knowledge key itself is unchanged, so the document formats stay available to the role */
}" and a call "setViewOpts(v: ViewHandle, patch: Partial<ViewOpts>):
void" (an `undefined` `viewAs` clears it). BCR-V10-22, applied after this request, names the same union `Admission` for
`admitAs`, and a client that speaks for a view passes the view's effective key there (volume 9 §2.10). `### 9.2
Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally`, the knowledge filter admits what both
the view's key and its `viewAs` admit.

**BCR-V9-24 — the editor's sittings in the milestone record (V9C-38).** `### 13.3 Seed goldens with the declared-shift protocol
(G-P11, G-R9), from M1`, `interface MilestoneRecord`. Current: "d5: { status: D5Status; record: string /*
plat/goldens/d5/<milestone>/record.json, §13.6 */ } | null;". New: that line, then "ux?: { f5?: string /*
plat/goldens/ux/<milestone>/f5.json — volume 9's F5Record */; owner?: string /* plat/goldens/ux/<milestone>/owner.json — its
UxSittingRecord */ };", read by M2a's, M3a's and M3b's exit criteria (volume 9 §7.3, §7.4).

**BCR-V9-25 — the wall layer's whole circuit (item 106 (g); V9C-14; J-V9.54).** `### 8.4 Layers, shadows, heights`,
`interface LayerSpec`. Current: "interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean;
castsShadowOnto?: Layer; exportSeparately: boolean;". New: the same with "showCircuit?: boolean /* the wall layer: draw each
committed enceinte's barrier-closed arcs as a faint dashed line with anchor ticks (item 106 (g)); off by default; volume 9
§5.4 */" added.

**BCR-V9-26 — item 110's events (item 110 (a), (b), (f); V9C-52; J-V9.59; one text for volumes 9 and 10, XV-V9-10).**
`### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`, and `### 2.4 Ways
(the skeleton) and typed edges` for the class.
(a) Current: "| { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind']; closed: boolean; from?: PointsForm /* two or
more points: the run derived along ridges and contours by S5a's trace */ }". New: "| { t: 'drawWall'; points: PointCm[];
kind: Enceinte['kind'] | 'retaining'; closed: boolean; highSide?: 'left' | 'right' /* retaining only, relative to the
points' order; absent: the side whose mean ground within 10 m of the chain is higher */; from?: PointsForm /* two or more
points: the run derived along ridges and contours by S5a's trace; for a retaining wall, along the slope break nearest the
drawn run */ }". With `retaining` the fold makes a `RetainingWall` (§2.7), never an `Enceinte`: no gate, no tower spacing of
S7, no circuit and no barrier closure; `closed: true` is a platform whose high side is inside; `placeGate` never targets
one. Its dry run never refuses on the ground's account: a run on flat ground — at least `terrace.coverShare` of its stations,
sampled every 2 m, stepping less than `terrace.stepMinCm` and sloping less than `terrace.slopeMin` across ± 3 m — moves onto
the nearest slope break, terrace edge or retaining wall stepping at least `terrace.stepMinCm` within
`terrace.retainingReachM` of that share of the stations, else becomes a `terrace` (c) over the strip on the high side
between the drawn line and `terrace.flatDepthM`, levelled to the strip's highest ground plus `terrace.stepMinCm` (volume 9
§4.20.1 (3); the cells volume 11's, XV-V9-13); each way it crosses takes a stair or a ramp by the way-class rule (item
110 (a)).
(b) Current: "| { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm; from?: PointsForm /* two points: the route
derived by S4's router at the dry run (§4.3) */ }". New: "| { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm;
raised?: true /* item 110 (b): the deck in its own ground arena part (§3.4, parts from 1), its two ends ramps or stairs
joined to ground vertices, crossing the ways beneath with no junction */; from?: PointsForm /* two points: the route derived
by S4's router at the dry run (§4.3); with `raised`, the course by the raised-way course solver */ }". §2.4's current "type
WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford';" becomes
"…|'bridge'|'ford'|'aqueduct';" — a water channel, `raised` wherever it is carried above the ground, never a traffic edge
and never a portal; its buried stretches stay a line on ground part 0. The dry run of a raised `drawWay`: its ends resolve
onto ground vertices (an end on a way's centre-line splits that way, making the vertex; an end elsewhere moves along the
course to the nearest one); its interior points never split a way on part 0; a course meeting an enceinte's trace follows
BCR-V9-29; an aqueduct's first point is a source lying above its terminal within `aqueduct.sourceReachKm`, else it is bent
to the nearest such, else bent to a well at the terminal (J-VI.4 (h)); a terminal on open ground receives a fountain
pin in the same event's closure (§7.3 item 9); a stroke ending on a floating island's rim, or lying on an island's key,
is bent as J-VI.4 (d) and (e) state — a stroke ending on a rim becomes `placeSkyAccess`, one on an island's key the island's own way — with volume 5's words (V5 §4.2; file f item 362's note).
(c) A new sugar event: "| { t: 'terrace'; stroke: FieldStroke; levelCm?: Cm /* absent: the ground height at the stroke's
first point */; expansion: number }". Its `sugar.json` row expands it at its fold into `setField { field: 'terrain', stroke:
{ …stroke, mode: 'flattenTo', amount: 1, levelCm } }` — volume 10's flatten mode (BCR-V10-17) with its `levelCm`
(critique-V10's C10-51 (2)), so the base carries one flatten mechanism — and one `drawWall { kind: 'retaining', points,
closed, highSide }` per edge run of the levelled footprint along which the step reaches `terrace.stepMinCm`, each minted
from the sugar's `seq` (§6.3). An expansion replaces, in the same group, the retaining walls an earlier `terrace`
expansion made inside its footprint, so a re-levelled terrace never leaves a wall of the old step.
(d) The authoring toolkit table: T2's row "`setField(terrain)`, `warp`, `drawWater` (its points and level forms),
`moveCourseKnot`" gains "`terrace` (item 110 (a))"; T3's "`drawWall` (its points form), `placeGate`" reads "`drawWall` (its
points form; its `retaining` kind, item 110 (a)), `placeGate`"; T4's row gains "with `raised`, or the `aqueduct` class
(item 110 (b))". The edit-target table: current "| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing),
`moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |". New: "| ways,
junctions, bridges, raised ways | `drawWay` (class `bridge` for a new crossing; `raised` and the `aqueduct` class, item 110
(b)), `moveVertex` (a raised way's interior points on its part's lattice; its ends only onto ground vertices), `warp`,
`split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind; on a raised way `spans/<ordinal>/use` =
`open` · `vault`, a held user edit, kept `open` over a part-0 way, water or a flood cell by the span's recorded reason; and
BCR-V9-33's paths) |", and a row after the walls row: "| retaining walls | `drawWall` (kind `retaining`), the `terrace`
sugar, `moveVertex`, `setAttr` (material, towers, `highSide`), `delete`; a generated one re-derives with its terrain until
edited, then held (§7.2) |".
(e) **Removal.** A `delete` of generated content is the plain `delete { id }`. The delete operator — never a client —
records what the removal suppresses: BCR-V6-24's `detail.suppress` for the kinds file f item 260 names (a raised way, a
harbour-mouth chain, a quay wall, a retaining wall, a deck plot), volume 5's removed slot for an island or a sky access. A
journal or a transcript therefore replays the call exactly. Its
preview carries `holds` (BCR-V9-27).

**BCR-V9-27 — a preview's effects (V9C-56; J-V9.64).** `### 11.2 The embedding API and the worker boundary (SCL-6)`.
`PreviewResult`'s `ok | conflict` branch — current last line "shape?: PolygonCm | PointCm[] /* a points form's derived shape,
resolved as the event would store it (§7.1) */; bent?: string /* the one-line reason a declaration was bent to the nearest
lawful one (R2) */ };", as BCR-V9-11 and BCR-V9-12 revise it — and `ApplyResult`'s `confirm` branch — current "counts:
Record<EditFate['fate'], number>; scope: EditScope /* resolved */ };" — each gain, before the closing brace, "; effects?:
Effect[]; effectsMore?: number; holds?: MsgRef", with "type Effect = { kind: 'added'|'removed'|'rerouted'|'joined'|'lost'|
'displaced'|'rebuilt'|'moved'; msg: MsgRef; targets: Id[] }": the consequences to things that are not held (the held ones
are `fates`), at most 50 in the order of `kind` then of the targets' size, `effectsMore` counting the rest. The engine fills
the list from the dry run's touched set by the rows the owning volumes state — volume 2's deck buildings, volume 3's stored
plans, volume 4's arch vaults, volume 6's generated routes, the base's junctions, water and households. `holds` is present
when the event is a removal whose fold records a suppression or a removed slot (BCR-V9-26 (e)): the `MsgRef`
`info.remove.holds` with its verb (`rebuild` · `raise`) and kind. A filtered preview (BCR-V10-6 (b)) renders each target
under the caller's key — a withheld one by address and kind, a concealed use or an unexcavated element left out, an entry
with no target left dropped (critique-V10's C10-53 (1)). Volume 9 renders the list in the badge, the fates sheet, the live
region and the clerk's card (volume 9 §4.20.7).

**BCR-V9-28 — the hit stack (V9C-57; J-V9.65).** `### 11.2 …`, `type Query`. Current: "| { kind: 'hit'; view: ViewHandle;
x: number; y: number }". New: "| { kind: 'hit'; view: ViewHandle; x: number; y: number; radiusPx?: number /* default 10; 22
under a coarse pointer */ }", answered by "interface HitAnswer { ids: Id[] /* every mark under the point within the
radius, top first by §8.2's draw order — a raised part above ground part 0 — one entry per entity */; sub?: { id: Id; path:
string /* the sub-part under the point: 'spans/<ordinal>' of a raised way, 'crossings/<retaining wall id>' of a way,
'tiers/<k>' of a stepped building */ } }", computed on the main thread from the hit-test slices within 1 ms. `### 8.9
Backends, text, threads and the worker boundary`: the tile worker → main row's current "per-tile hit-test slices (mark
bboxes + entity handles)" becomes "per-tile hit-test slices (mark bboxes + entity handles + each mark's draw order and,
for a raised way's spans, a way's crossings of retaining walls and a stepped building's tiers, the sub-part path)". Volume
10's `entity { at }` answers `ids[0]` (critique-V10's CVR-V10-7).

**BCR-V9-29 — a raised way and a town wall (item 110 (b); V9C-54 (4); J-V9.61).** `### 7.1 …`, *Sugar events*. Current: "and a
gate also arises wherever a declared road crosses a wall (§7.3's S7 row)". New: "and a gate also arises wherever a declared
road on ground part 0 crosses a wall (§7.3's S7 row); an aqueduct crosses a wall by an arch in the curtain, never a gate,
and a raised road or viaduct comes down to a ground vertex before the trace and passes through the gate its ground way
makes there (item 110 (b))". `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle
(G-P3)`, the S7 row's trigger. Current: "a declared way of a class above lane crossing an enceinte — a `placeGate`'s stub or
a declared road, item 101)". New: "a declared way of a class above lane on ground part 0 crossing an enceinte — a
`placeGate`'s stub or a declared road, item 101; an aqueduct's crossing adds an arch to the curtain's run and no gate, item
110 (b))".

**BCR-V9-30 — a long bridge's mid-span landmark slot (item 110 (d); V9C-58 (7); J-V9.66).** `### 2.7 Walls, gates, towers,
castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records` — the deck
plots as the coherence pass writes them from item 110 (d); there is no current text to quote. The mechanism to add: "A
deck's landmark slots are a mole's head and its midpoint and, on a `Bridge` whose deck span is at least
volume 11's `deck.landmarks/bridgeMid/minSpanM` (volume 11 §3.24.4), one slot at its mid-span — the same mechanism serves both. A slot
is a landmark plot (`DeckContext.landmark`, volume 2 §2.6), offered to a tower or fort class and to no other; its registry
path is `deck/landmarks/<head | mid>` (critique-V10's CVR-V10-8)." Pre-decided fallback, if the coherence pass declines
it: the fort stands on the bridgehead plot, and the first known-city fixture's checklist reads "the fortress at the bridge"
(volume 9 §4.20.4 (7)).

**BCR-V9-31 — item 110 in the formats (V9C-65; J-V9.69).** `### 11.1 Formats`, one clause per format; the export side of
item 110's records, which the coherence pass adds to §2.7.
(a) **GeoJSON** — after the current "walls, towers, gates and built bridges as typed features" add: "; a raised way stays
its way's LineString with `raised: true`, `part` (its ground arena part), `deckMinCm` and `deckMaxCm` (the deck above the
ground beneath) and `reason` (`drop` · `link` · `water` · `declared`; J-VI.2); each support a Polygon (`kind: 'raisedSupport'`, `way`, `key`, `state`; J-VI.18, volume 12's name); each span a Polygon (`kind: 'span'`, `use`: `open` · `vault`); a retaining wall a LineString (`kind: 'retaining'`, J-VI.18; `highSide`: `left` · `right` of the vertex order, `stepMinCm`, `stepMaxCm`, `material`); a deck
plot's feature `deck: <the host's id>`; a stepped building's feature `tiers` (the count); features on a raised part stay in
the ground layer's collection with their `part`".
(b) **SVG and the per-layer PNGs** — raised parts draw in their own group `layer.ground.raised` above ground part 0, and
the one-PNG-per-layer zip writes them as their own PNG.
(c) **VTT** — after the current "one scene set per model layer — the ground; the sky per island; the underground one scene
per depth band" add: "; in the ground scene retaining walls and the raised supports' footprints join `line_of_sight` as
cliffs do, and no portal is written where a raised way crosses a street; each raised way crossing the scope adds one deck
scene at its mean deck elevation, named as a storey scene is, its parapet edges `line_of_sight`, its end stairs or ramps
open portals (`closed: false`) and the ground beneath drawn dimmed — at most 8 per export, the longest first, the dialog
saying so; a Foundry scene writes each deck as one more level with its elevation band".
(d) **3-D** — a raised way a deck mesh swept at its deck height with its parapets, its supports extruded from the ground to
the soffit, each `vault` span closed by its end walls; a retaining wall extruded between the ground heights on its two
sides; glTF nodes carry `extras.part`. CityJSON: after the current "`OtherConstruction` (walls, towers, gatehouses)" add ",
a retaining wall an `OtherConstruction` with `function: 'retainingWall'`; a viaduct, a raised road and an aqueduct each a
`Bridge` with `function` `viaduct` · `raisedRoad` · `aqueduct`, an arch vault a `BridgeRoom`".

**BCR-V9-32 — removals in the skeleton (V9C-66; J-V9.70).** `### 11.1 Formats`, the skeleton row. Current: "the author's
declarations, the sugar events among them (§7.1)". New: that text, then "and every author's `delete` of generated content —
by its address, and a suppressing delete (item 110 (b); BCR-V6-24) with the key the fold recorded, written by the skeleton
writer as `delete { id, suppress }` (the one place an event carries a suppression key; never written by a client) — whose
import suppresses the key whether or not the address arises; a removal whose address or key does not arise in the new
document is reported as applied with nothing to remove, never as a failure". The round trip "with the same seed, a
skeleton exported and imported again reproduces the city byte for byte" then holds for a map with removals.

**BCR-V9-33 — a crossing's form and a raised way's measures (V9C-76).** `### 7.1 …`, the edit-target table's ways row as
BCR-V9-26 (d) gives it: its `setAttr` gains `crossings/<retaining wall id>/form` = `stair` · `ramp` and, on the raised-way
record as the coherence pass writes it in §2.7, `clearanceCm` (the least soffit height over the ways it crosses) and
`spanSpacingCm` (the support spacing). The dry run bends a ramp too steep for the way's class into a longer ramp along the
way where its run allows, else back to a stair (`bend.crossing.steep`); a clearance below volume 11's
`raisedWays.structure.clearanceCm` for a crossed way's class up to it (`bend.raised.clearance`); a spacing outside the
material's `pierSpacingM` band to its nearest bound (`bend.invalid`). Each path is held once edited (§7.2).

**BCR-V9-34 — a removed thing's last shape (V9C-55 (4); J-V9.77).** `### 11.2 …`, the `entity` query as BCR-V10-1 adds it:
on a tombstoned id it answers from §2.8's `Tombstone.last` — the record's kind, name and shape, and the fields a
re-declaration reads (volume 9 §4.20.3 (4)): a way's class, width and `raised`; a wall's kind and `closed`, and a retaining
wall's `highSide`; a gate's enceinte; a building's class and its plot; a deck plot's deck host and slot ordinal — with
`removed: { seq }`, filtered by the caller's key as a live answer is. Read by volume 9's history row (Show, Build it again;
volume 9 §4.20.3 (4)) and, through `ClerkMount.rebuildEvents` (volume 9 §2.10), volume 10's `rebuild` action (reconciliation
round 3: SR2-14, SR2-15).

**BCR-V9-35 — a place by a locus is T6's one-line roster (SS-13; J-V9.83).** `### 7.1 Edits are ordered events on addresses;
the named actions; the edit targets; dry-run validation`, the authoring toolkit table. Current: "| L2 programme | T6
`place` | `placeAt` (its point form), `assign`, `build`, `drawFootprint` |". New: T6's row gains, at its end — after the
kinds BCR-V3-16 (`convert` (`relet`)) and volume 1's BCR-12 (c) add, composing with them — ", and a one-line `roster` (a
place by a locus: one line whose locus is the drop target or the typed words, volume 9 §4.5)". T7's row is unchanged:
`roster` stays T7's kind for a list. T101-1's registry therefore lists `roster` under T6 (one line) and under T7 (any
number of lines); T101-2's enumeration, volume 9's T-V9-12 and volume 10's T-V10-1 read the row as amended, and volume
10's `where.locus` and `where.free` forms emit this one-line `roster` (SS-12).

**BCR-V9-36 — an entity by its binding key (SR-22; J-V9.108).** `### 11.2 …`, the `entity` query as BCR-V10-1 adds it
(with BCR-V9-34): its input gains `dossierKey?: string` beside `id` and `at` — "by a binding key (§7.7 item 12): the
`entity` of the `DossierBinding.rows` row whose `dossierKey` it is, at the query's seq, answered as that address's
`EntityCard` under the caller's key (`admitAs`, BCR-V10-22), `withheld` as for any address; `null` when no row holds the
key or the document has no binding". Read by volume 9's history note lines and the report panel's standing-note lines
(volume 9 §4.10, §5.7) to resolve `PortNote.keys` for **Show** and for the knowledge drop (volume 8 §4.6 item 2),
and by volume 8's embed bridge handler for the party lines' places (volume 8 §3.1 step 7 (b)); answered by the facade's reader beside its `id` form (BCR-V10-1). Needed at M-SF with volume 9's AP5b (T-V9-69).

### 10.2 Cross-volume requests (to the siblings' revisions; not base changes)

| id | to | what this volume needs | finding |
|---|---|---|---|
| XV-V9-1 | V11 | `siting.declared` admits the key forms `cls:<class>` (a roster class no dossier record binds) and `use:<address>` (the `split` cell only, orphaned when the use goes, as `siting.linkEdits`' keys are), and a cell `familyWeights` (V11 §4.2's name; per family one of 0, 0.5, 1, 2 or 3) multiplying each family's soft terms for the key's kind (hard needs unscaled), read by the resolver; V11 §4.4's lifecycle rows cover them | V9C-03 |
| XV-V9-2 | V11 | `siting.linkEdits` gains the cell `avoid?: Id[]` (providers never bound; the next nearest serves), and V11 §4.2 states the three meanings: `bindTo` keeps a supplier, `avoid` cuts one, `cut: true` alone stops the good at that use | V9C-03 |
| XV-V9-3 | V04 | `showUnexcavated` is the per-viewer view key of BCR-V9-20, not a `LayerSpec` field: V4 §1b.1, §1b.3, §2.6's lifecycle row and BCR-10 follow | V9C-04 |
| XV-V9-4 | V04 | the reader returns, on a cavern or ruin cluster, the fact `under/wayIn` (the connection graph's path from the nearest surface access) and, on a burial face, the `why` path `catacomb` with its candidate-pass reason; §8.2's access row draws its symbol by `cause.rule` (V9 §4.17.3's column); V4 §4.1 adopts BCR-V9-21's chamber closure and catacomb ladder and BCR-V9-22's dwelling closure | V9C-05, V9C-06, V9C-07, V9C-08 |
| XV-V9-5 | V03 | the crypt bends of V9 §4.17.5 (e): the cathedral's crypt kept at its smallest lawful size when a plan event would remove it, another church's crypt clamped just short of the cathedral's, and the crypt join's closing listed as a fate, each with its `bent` `MsgRef` | V9C-08 |
| XV-V9-6 | V02 | none beyond V2 §3.14.5's no-refusal crypt ladder, which V9 §4.17.5 cites; the canvas-handle contract of V2 §4.5 is received in V9 §3.5; X21 is received in V9 §4.20.5; BCR-V9-30's bridge slot is a `DeckContext.landmark` plot, and CVR-V10-8's registry path `deck/landmarks/<head \| mid>` covers it | V9C-08, V9C-13, V9C-58, V9C-59 |
| XV-V9-7 | V10 | **Met** in V10's text (V10 §2.6's `createClerk(mount)` returning a `ClerkHandle`, and its `send`, whose `why` entry takes the attached `WhyAnswer` (V10 §3.1); V10 §2.4's `DraftItem.bent?: MsgRef`; the merged texts in V10 §1b.1's rows for BCR-V9-10, BCR-V9-12 and BCR-V9-16; seam-surfaces-r4 SR4-05 (d)). Was: its harness implements V9 §2.10's `ClerkSlot.mount` → `ClerkHandle`; `DraftItem.bent` is a `MsgRef` (BCR-V9-12); BCR-V10-6 (b) and (c) and BCR-V10-12 are replaced by the merged texts of BCR-V9-10, -12 and -16; its `why` entry accepts the `WhyAnswer` V09 attaches | V9C-02, V9C-09, V9C-10 |
| XV-V9-8 | V04, V05, V10, V02 | AP6, AP7, AP8 and AP10 (2.75–4.25 pw) join their staged milestones' pricing — V04's M6-U, V05's P4, V10's M3c, V02's M6c. V10's part **Met** in V10's text (V10 §8's total: the rest of M3c's price is V09's AP8, the built-in assistant's screens, 1–1.25 pw, V9 §8.1, priced in V09's total and outside V10's; reconcile-V10-r6, seam-surfaces-r5 SR5-06 (e), SR5-07 (d)); the V04, V05 and V02 parts lie outside that seam and are unchanged by this round | V9C-26, V9C-64 |
| XV-V9-9 | V07 | the palisade's "show circuit" reads BCR-V9-25's `LayerSpec.showCircuit` ("Show the whole circuit") | V9C-14 |
| XV-V9-10 | V10 | **Met** in V10's text (V10 §4.1's opening, one text with V09 cited and never restated, and its T10 `hold` rows, `remove` sending one plain `delete` per target with no reason key; T-V10-38; SR4-05 (d)). Was: one text for BCR-V9-26: V10's encoders emit exactly its shapes (critique-V10's C10-51); `delete` is T10's (BCR-V10-20), as V9 §4.3 adopts (J-V9.74), and V10's `hold` op `remove` sends the plain `delete`, never a reason key | V9C-52 |
| XV-V9-11 | V10 | **Met** in V10's text (V10 §2.6's `ProposalView.variations[].effects` and `effectsMore`, V10 §5.4's **What else changes**, V10 §4.4's destructive case and J-V10.75; SR4-05 (d)). Was: the effects list (BCR-V9-27) on the proposal card under "What else changes" and in the model's results, filtered under the key (BCR-V10-6 (b) extended), and destructive effects kept out of apply-then-undo (critique-V10's C10-53) | V9C-56 |
| XV-V9-12 | V10 | **Met** in V10's text (V10 §4.1's `retaining` row with `closed` and its `terrace` row sending the `terrace` sugar; V10 §2.13's `RaisedOutcome`, its reason key and its `declared` outcome, and IN-V10-2's `raised[].reason`; CVR-V10-7's stack top for `entity { at }`; V10 §3.9's *A removed thing*; `rebuild`'s events from `ClerkMount.rebuildEvents` (V10 §2.6, §4.3); SR4-05 (d)). Was: the encoders allow `closed` on a retaining chain (a platform, J-V9.71), send T2's terrace as the `terrace` sugar (BCR-V9-26 (c), with BCR-V10-17's `levelCm`), and the raised-way provider reads the recorded reason (`drop` · `link` · `water`; J-VI.2) or `declared`; `entity { at }` answers the hit stack's top (BCR-V9-28); `EntityCard` answers a tombstoned id (BCR-V9-34); `rebuild`'s events are V9 §4.20.3 (4)'s | V9C-68, V9C-55 |
| XV-V9-13 | V11 | the `terrace` table gains `retainingReachM` (15 m), `flatDepthM` (12 m) and `coverShare` (0.8) for V9 §4.20.1 (3)'s bends; the bridge's mid-span threshold is volume 11's `deck.landmarks/bridgeMid/minSpanM` (BCR-V9-30) — **met** by V11 §3.24.4 (SR-15); the `raisedWays` `says` sentences serve the raised way's panel (critique-V11 §11 (8)) | V9C-53, V9C-58, V9C-61 |
| XV-V9-14 | V04 | an arch vault (`archVault`, critique-V4's C4-110-1) records its raised way and span path, so V9 §4.17.6 lists it "At street level, under {way}", the depth-band filter never hides it, and the hit stack reaches it through the span | V9C-74 |
| XV-V9-15 | V03 | V3C-75's crypt ladder for `setAttr(basement/crypt/ring)` on a building without a basement, which V9 §4.17.5 (a) emits | V9C-67 |
| XV-V9-16 | V05 | (a) V05's "T9's delete" reads "volume 9's delete row (T10)" (open: V5 §1b's and §2.1's lifecycle rows still read "T9's delete"); (b) **Met** in V05's text (V5 §4.2; J-VI.4 (d), (e), (g)): V05's island and rim words are bends, one text with V9 §4.9's `bend.raised.island`, `bend.aqueduct.island`, `bend.raised.onIsland`, `bend.aqueduct.onIsland` and `bend.retaining.rim` rows, each with its alternative ("Draw a road to its foot"; "Show me why") — was: refusals each with an offer ("Move it inside the rim", J-V9.76, withdrawn; SS-32) | V9C-60 |
| XV-V9-17 | V08 | **Met** in V08's text (V08 §3.1 step 7 (a), `ClerkMount.host`, and (b), `HostSlots` with `hostName: 'SettlementForge'`; SR4-05 (d)). Was: the embed's bridge handler (V08 §3.1) fills `ClerkMount.host` (V9 §2.10): `config` and `onConfig` from each `clerk.config`, `needsToken` and `refused` posting `clerk.needsToken` and `clerk.config.refused`, `proposals` from each `preview { proposal }`, `answer` posting `clerk.proposal`; and it fills `HostSlots.hostName` ("SettlementForge") | SS-06, SS-07 |
| XV-V9-18 | V10 | **Met** in V10's text (V10 §2.6's `type ClerkHarness = ClerkHandle` with no member of its own and *The bridge, through the mount only*; V10 §3.17's host seam through `ClerkMount.host`; V10 §2.3's session key from `mount.effectiveKey()` and `onEffectiveKey`; V10 §3.9a's access-point row citing `info.under.cause.<rule>`, its catacomb row citing `info.catacomb.blocked.<cause>` and its sealed-deep and unexcavated rows naming `info.under.deep` and `info.under.sealed`; the `why.section.<kind>` titles are V9 §4.9's own rows; SR4-05 (d)). Was: `ClerkHarness` adds no member beyond `ClerkHandle` (V9 §2.10 now declares `run`, `newTopic`, `setKey`'s verdict, `defects` and `clearDefects`); V10 §2.6 and §3.17 name `mount.host` as the source of the transport, the token refresh, the refusal, the host proposals and their answers; V10 §2.3's session key is `mount.effectiveKey()` with `onEffectiveKey` (SS-10; its CVR-V10-15 names); V10 §3.9a's access-point rows and the catacomb's `blockedBy` words cite V9 §4.17.3's and §4.17.5's lines (`info.under.cause.<rule>`, `info.catacomb.blocked.<cause>`), and its sealed-deep and unexcavated rows are the keys `info.under.deep` and `info.under.sealed`; each section V10 §3.9 registers has a `why.section.<kind>` title row in V9 §4.9 (a new section adds one) | SS-06 – SS-10, SS-15, SS-16 |
| XV-V9-19 | V10 | **Met** in V10's round-3 text (V10 §2.6's dispatch note, §4.1's `where.locus` query, BCR-V10-22's last sentence, §2.3; SR3-05). Was: (a) V10 §2.6's dispatch table notes its one exception: the skeleton import dialog's **Fix** runs a finding's `propose` in the application, committed as the user's declaration with no `proposedBy`, whether or not a clerk is mounted (V9 §3.12) — T-V10-44 is unchanged, since no application-run `propose` reaches the harness; (b) V10 §3.16's `dossier` alternative "the first `sites` candidate that satisfies its locus" is V9 §4.5's query — `sites` for the class, `near` the locus target's anchor, `district` the target when the locus is `in` a quarter, `k: 3`, the first candidate with no `hardFails` — one text for canvas and clerk; (c) BCR-V10-22's last sentence reads "the built-in clerk on its reads and dry runs, the application on its band-less reads", the application's own dry runs staying at the role's key (V9 §2.7; J-V9.86); (d) V10 §2.3's session key reads the key form through V9 §2.10's rule, its corner case included | SR-06, SR-08, SR-10, SR-13 |
| XV-V9-20 | V08 | **Met** in V08's round-2 text (V08 §3.1 step 7 (b), (c), §3.14 (5); SR2-18). Was: "See what the players see" sets the frame's `ViewOpts.viewAs` to the resolved party key form by `setViewOpts` through the embed's bridge handler and clears it with `undefined`, with no view-state write (V9 §4.8; SR-05); `HostSlots.banner` draws the frame's own strips — "Showing what the players see" and the held and frozen-view notices — and `historyFilter` stays unset (SR-16); `info.viewAs.host` is this volume's row, so V08's `host.*` set (X12) gains nothing | SR-05, SR-06, SR-16 |
| XV-V9-21 | V08 | **Met** in V08's round-3 text (V08 §3.1 step 7 (b), (c), §4.6, §5.1, X12; SR3-05). Was: the embed's bridge handler fills `HostSlots.historyLines` from `host.state` — a line per reveal or hide (the difference between two successive `party` values, V08's `host.*` rows for "Revealed to the party: {places}" and "Hidden from the party again: {places}"), one line for the time the party pictures were last drawn from `partyPicturesAt`, replaced on each change, `targets` the places' entity ids — and `HostSlots.newDocuments: 'download'`; V08 §4.6 cites the slot, §5.1's list of host-mode differences gains "a new document (a copy, a re-run) is saved to the user's device, never opened in the frame", and X12 lists the new `host.*` keys (seam-surfaces-r2's SR2-03) | SR2-01, SR2-02 |
| XV-V9-22 | V10 | **Met** in V10's round-3 text (V10 §4.3, §2.6, §1b.2, §3.1 (4), T-V10-20; SR3-05). Was: (a) V10 §4.3, §2.6's `rebuild` comment and §1b's rebuild rows read "the events `ClerkMount.rebuildEvents(seq)` returns (V9 §2.10, by the rule of V9 §4.20.3 (4))" (SR2-17 (c)); (b) V10 §3.1 (4) reads "…or when the drawer's **Start a new map from this** sent the message with `attach.newMap` (V9 §2.10, §4.11)" (SR2-17 (d)); (c) V10 §3.1 (4)'s first condition (a document holding only its creation prefix) is standalone's: in host mode the frame's document is the host's and no turn enters creation mode (V9 §3.9, §4.11) | SR2-13, SR2-14 |
| XV-V9-23 | V06 | **Met** in V06's text (V6 §3.19.3 (7), V6 §2.12's suppression row, J-V6.116, V06's X39; reconcile-V06-r4, landed 07:31; seam-surfaces-r3 SR3-12 (a)): each suppressed kind's serving re-add is named in Build it again's forms, the deck plot's a `drawFootprint { polygon, cls? }` on the deck whose plot S11 fits at slot `k`, served while that declared plot stands at (host, `k`); V9 §4.20.3 (4)'s deck-plot fallback is withdrawn. Was: V6 §2.13 (7)'s user re-adds name their declared forms as volume 9's Build it again emits them: a retaining wall's "wall drawn on that line" is `drawWall { kind: 'retaining' }` on the former chain, and a deck plot's "plot added at that slot" is a `drawFootprint` on the deck whose host plot S11 fits at slot k, serving the key (host, k) (V9 §4.20.3 (4); its fallback pre-decided there) | SR2-15 |
| XV-V9-24 | V08 | **Met** in V08's text (V08 §3.1 step 7 (b), §3.8, §5.2, T-V8-47; V08's round 4, landed 07:32; SR-34). Was: (a) V08 §3.1 step 7 (b)'s `banner` list reads "the held notice": a frozen view's notice is the shell's own `error.frozen` strip with its one control, in both modes (V9 §2.2's `banner` comment, §3.14 (b); J-V9.97), and V08 §5.2's "the frame's own notice" cites that strip; (b) V08 §3.8's "the owner is offered the `frozenImport` rebase" cites V9 §3.14 (b)'s **Edit it with this version**, and its in-window upgrade stays V08 §4.2's header control, the shell drawing none (V9 §3.14 (a)) | SR3-01 |
| XV-V9-25 | V05 | V5 §3.22 (4)'s inward move of a rim stroke (J-VI.4 (g)) states its geometry as V9 §4.20.9 decides it: every point of a retaining or terrace stroke lying in the rim strip moves along the island's radial direction to 1 m inside the strip's `setback` line, the other points unchanged; its words are V9 §4.9's `bend.retaining.rim` ("The rim walk stays level; the wall stands inside it."), already V05's (reconcile-V09-r1) | SS-32 |
| XV-V9-26 | V08 | **Met** in V08's text (V08 §5.2's `CustomChainRecord` row, §1b, BCR-V8-15; landed 08:57, its knowledge rule as SR-25 leaves it; SR-34, SR-35): the gazetteer lists the chains V08 §5.2's row admits, under the kind `customChain` — the read by which V9 §5.4 offers **SettlementForge's chains** | SS-41 |
| XV-V9-27 | V04 | **Met** in V04's text (V4 §3.8's *Voids and bans* exception and its bullet *The dwelling closure's way in*, V4's U-DIG and `DugGenerators` rows, its §4.1 `addUndergroundAccess` row and T-V4-48's closures' clause on T-V9-38's three-building fixture, J-V4.119, J-V4.120; reconcile-V04-r4's continuation, landed 11:35; J-V9.117). U-DIG's closure (V4 §3.8's *Voids and bans* exception for BCR-V9-22's grouped access, and the dwelling closure among U-DIG's callers (seam-surfaces-r3 SR3-11)) takes BCR-V9-22's two new sentences: the dug-access bend lists the further buildings step 1 qualifies in `PreviewResult.alternatives` (at most three, in its order), and an `addUndergroundAccess` without `target`, grouped before a dwelling declaration on the cluster from one of them, targets the cluster's element nearest in plan to that building's footprint (ties by address) — so V9 §4.17.4's **Use another building** re-previews lawfully | SR-36 |
| XV-V9-28 | V06 | **Met** in V06's text (V6 §2.10's `EpochReport.raised.suppressedFired`, filled by V6 §3.19.3 (2), W19's and W58's reader columns, T-V6-58's kept-removed clause, J-V6.120, V06's X44; reconcile-V06-r4's continuation, landed 11:39; seam-surfaces-r3 SR3-10; J-V9.117), its entry `{ removal: the live delete's seq; week }` as asked, none for a key a re-add serves. Was: `EpochReport.raised` (V6 §2.10) gains `suppressedFired: { removal: number /* the seq of the live removal holding the slot */; week: number /* that removal's week */ }[]` — one entry per raised-way reason that fired this epoch at a slot a live removal holds (the reasons `suppressedHeld` counts, W58, W60), in removal order — so V9 §4.10's `epoch` row draws V08 §4.6 item 3's `info.raised.suppressed` line with **Show** on the removed thing (read from the removal's `delete` event and BCR-V9-34's tombstone) | SR-22 (found beside it) |
| XV-V9-29 | V08 | **Met** in V08's live text (V08 §3.1 step 7 (b), §1b, J-V8.106, J-V8.109, its X20; reconcile-V08-r3's second brief, read 10:41 before its landing), which adds a per-key answer cache: a `list` with a key not yet read returns the lines that name no place and fires `onChange` when the reads answer (J-V8.109), which V9 §4.10's re-list on each `onChange` covers. Was (seam-surfaces-r2 SR2-24 (a)): V08 §3.1 step 7 (b)'s party lines read `{places}` as the names of the places the key `list` is called with admits (V9 §2.2; the shell passes `effectiveKey()`), each read by `query({ kind: 'entity', dossierKey } \| { kind: 'entity', id }, { admitAs: that key })` (BCR-V9-36, BCR-V10-22) — a place answered `withheld` neither named nor targeted, one answered `null` named by its key with no target, a line left with no place not listed — the handler keeping no subscription of its own, in place of "…re-makes the list and fires `onChange` when `onEffectiveKey` fires"; J-V8.106 and T-V8-47's clause follow | SR2-23 |
| XV-V9-30 | V10 | **Met**: (a) – (f) and (h) in V10's landed text (V10 §3.5 step 3's reading of `MsgRow.buttons`, V10 §1b.1's buttons row, §2.6's `useTool` with `mode: 'access'`, §3.16's bends paragraph with `each`, CVR-V10-20 **Met**; reconcile-V10-r6, landed 14:21, md5 `f7d96daf…`); (g) by this lane's logged companion edit of V10 §3.11 and §3.17 (both stale cards show the row's two buttons; V10's addendum *Reconciliation round 6 — volume 9's companion row*; md5 `c78aac11…`). The request: V10 §3.5 step 3 reads the whole of V9 §2.9's `MsgButton`, including what this volume adds to seam-surfaces-r5 SR5-01's interface (J-V9.121): (a) a `commit` from `event` carries the events of the form `event` names in V9 §4.9's *The event forms* (the bytes the canvas commits, T101-3); (b) a `commit` from `alternatives` labels each alternative's `propose` by `each` (V9 §4.9's `button.putAt`, `button.digDownFrom`), and a `commit` from `unplaced` words each element by its `key`, `button.placeElement` ("Place {element} here"); (c) a `show`'s `arg` may be a list source — `dependents` (**Show them**), `created:access` (**Show the way in**), `alternatives` (**Show plots on land**), `preview` (**Show the new preview**, V10 §3.11's `focus`); (d) a button whose `when` does not hold is not offered (`owner` against the session's role; `names` when the thing is not a name); (e) the sixth class `app` sits on no row a dry run answers (T-V9-15), so a card the clerk builds meets V10's five mappings; (f) **Add a way down** is `useTool { tool: 'place', mode: 'access' }` (V9 §4.5's mode ids); (g) `refuse.stale`'s list ends with `button.showWhy` (J-V9.123), so V10 §3.11's stale card shows the row's two buttons — **Show the new preview** as its `focus`, **Show me why** a `why` of the row's page — beside **Ask again**, and a host's card the two alone (V9 §4.11 draws them so); (h) CVR-V10-20 marked **Met** | seam-surfaces-r5 SR5-01, SR5-07 (a); CVR-V10-20 |
| XV-V9-31 | V11 | V11 §3.1's registry row 87 (`messages`) reads its row type as `MsgRow` for `en.json` and `{ key; text }` for every other locale's file, since `buttons`, `tone` and `codes` are read from `en.json` only (V9 §2.9's *Locales*; J-V9.121), and its loader refuses a locale file carrying them | seam-surfaces-r5 SR5-01 |


## 11 Owner questions

Only decisions that are the owner's by rule — money, the licence, a new capability across the SettlementForge boundary,
product order. Every other choice is decided above and recorded in V9 §9. Until the owner answers, the design runs on the
recommendation marked "default".

| # | question | why it is the owner's | recommendation (the default until ruled) |
|---|---|---|---|
| Q1 | Where and when does the standalone editor go on the web — a private preview for testers only, or a public release, and on which host? | hosting and its running cost; the module stays private for now (D-22, J-A21.01) | a private preview address on a free static host, shared by link with the first-five-minutes participants and the owner only, from AP2 (M2a); the public-release decision after M4 ("mastered"), together with Q3 |
| Q2 | How are the first-five-minutes participants found, and are they thanked with money? | payment and the owner's own network | the owner invites five to eight casual game masters per session from their own circles or a game-master community, unpaid; if fewer than five agree within two weeks, a thank-you of about 20–25 US dollars each (≈ 150–200 per session, two sessions) is the owner's call |
| Q3 | What is the editor called on screen and in its files? | the product's identity; PLAT is a placeholder (D-19) | keep "PLAT" as the working name in every build and in both test sessions; choose the public name before any public release (Q1) |

The built-in clerk's model provider and its cost are volume 10's owner question; this volume's drawer works with any clerk
and ships with the scripted test clerk (V9 §8.3 risk 5). Item 110's tools raise no owner question: the owner ruled that they
go in and that a user may add or remove raised ways, and every choice this round made is recorded in J-V9.58 – J-V9.78.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed evidence).** Every base section named in V9 §1.2 was read at its current text in
`docs/ARCHITECTURE.md` (the one-page summary, §1, §7 whole where it bears on editing — §7.1's events, toolkit and dry run,
§7.2, §7.3 items 1, 4 and 7–10, §7.4 whole, §7.6, §7.7's intent and forms catalogue, §7.8 —, §9.1, §9.5, §11.1–§11.5, §12.5,
§12.6, §13.4, §13.6, §14's `@plat/app` and interfaces, §16 and the staged table); item 101 was read whole in
`docs/AMENDMENTS-2026-09-27e.md`, and file g's items 102–108 whole; `docs/DEFINITION.md` and
`docs/OWNER-INSTRUCTIONS-2026-09-25.md` whole; `research/ux/tool-survey.md` Part II (§1–§6) and Part I's sections D and E
(its 38 load-bearing claims were re-fetched live by that lane, 38 of 38 found); `docs/experiments/known-city-authoring.md`
and the reference map's README (study-only; nothing of the map entered this volume); `research/findings/visual-spec.md`'s
type and chrome sections (read to understand the references' chrome; no colour, word or layout was taken). The tool
mappings of V01, V02, V03, V04, V05, V06, V07 and V08 were read at their current text. Every current-text quotation of V9
§10 (23 of 23) was checked against `docs/ARCHITECTURE.md` by script, whitespace-normalised, and every quoted heading exists.

**PLAUSIBLE (reasoning, to be measured).** Every budget of V9 §6 until the milestones' harness runs measure it; the
latency per tool (it adds up §12.6's PLAUSIBLE scope costs); the layout's sizes and breakpoints; our own constants — the
handle salience rule and its 150 m per handle, the quarter's ± 12.5 % size step, the compaction trigger (50 entries, 60 s),
the 500 ms long press, the 22 px coarse snap radius, the shade view's six steps, the link view's caps (150 and 400); the
estimates of V9 §8; the browser storage behaviour (S-A2); the variation thumbnails' cost; and the whole of the user
experience, which only the first-five-minutes sessions (V9 §7.3) and the owner's sittings (V9 §7.4) confirm — no amount of
reading the survey replaces them (§13.4).

**The revision (revise-V9).** CONFIRMED by reading: the critique whole (`docs/volumes/critique/V09.md`, 841 lines, as folded
for J111); V10 §1b, §2.1–§2.15, §3.1, §3.9, §3.11, §3.17–§3.21, §4.2–§4.6, §5.1–§5.4 and BCR-V10-1 to -12 (V10 unchanged
since its landing); V11 §2.3–§2.4, §3.3.1, §4.1–§4.5 and BCR-V11-10; V04 as revised (V4 §1.3, §1b, §2.2, §3.5.1, §3.5.7,
§4.1–§4.7, §5.1–§5.5, BCR-10, §13); V02 §4.5 as revised; V03 §3.7.4's `Basement.crypt`; V05's `sky.island.shadeStrip` and
`shadePending` rows and its V09 contract row; V06 §2.2's device settings, §4.4 and §5.2–§5.3; V01 §1b's and V1-3.16's
callers naming this volume; V07's circuit line; and the base's §2.9 *View state*, §7.1's `drawWater`, `drawChamber`,
`split`, `merge`, `instance`, `rejectSite`, `placeAt` and `unassign` shapes, §7.3 item 9 (d), §7.4's MFCG asks, §9.5's
*Measure tool*, §11.1 *Knowledge*, §11.2's `Query`, `PreviewResult` and `view`, §11.3 *View state*, §13.3's
`MilestoneRecord` and §14's family-tree view. The current-text quotations of the revision's new and merged requests were
checked against `docs/ARCHITECTURE.md` by script, whitespace-normalised (V9 §13). PLAUSIBLE: the revision's new budgets —
the link cache's 120 ms and 5 ms, the compaction's 900 ms at METROPOLIS, the shade sampler's 60–120 ms, the family strip's
134 ms, the cold load's 1.5 s and 3 s and the bundle caps; the new constants (the 2 s idle wait, More handles' 75 m, the
seven size chips' quantiles, the 30-day bin, the 15° angle step, the 20 % re-roll-brush cover); the revised estimate of
V9 §8.1; and that the siblings adopt V9 §10.2's requests as stated — each is a request, and until it lands the screens
read the siblings' current fields as V9 §2.7, §4.17 and §2.6 name them. (XV-V9-7 is met in V10's text: reconcile-V09-r5,
seam-surfaces-r4 SR4-05 (d).)

**The second round (item 110).** CONFIRMED by reading: the critique's §12 whole (V9C-51 – V9C-81); file g's item 110 as
revised ~23:40; the base's §2.4 `WayClass`, §2.8 `LifecycleEvent` and `Tombstone`, §7.1's `drawWall` and `drawWay` members,
its toolkit table, sugar paragraph and edit-target ways row, §7.3's S7 row, §8.9's worker-boundary row, §11.1's GeoJSON,
VTT, CityJSON and skeleton rows, and §11.2's `ApplyResult`, `PreviewResult` and `Query`; V02's item-110 fold (V2 §2.6's
`DeckContext` and `DeckBudgetRead`, §3.16, §4.6 and X21); V05 §3.22 and §4.1–§4.2 as its second round revised them; V06
§2.13; V08 §2.6b; critique-V10's C10-50 – C10-53 and CVR-V10-7; critique-V4's C4-110-1 – C4-110-3; critique-V3's V3C-75;
critique-V11's §11 rows; critique-V1's V1C-85. The current-text quotations of BCR-V9-26 – BCR-V9-34 were checked against
`docs/ARCHITECTURE.md` by script, whitespace-normalised (V9 §13). PLAUSIBLE: every constant of V9 §4.20's table marked our
own (the 15 m reach, the 12 m strip, the 0.8 share, the 2 m and ± 3 m sampling, the 3 km preview threshold, the 40 m bridge
span (volume 11's cell since reconciliation round 2, SR-15), the 50-effect cap, the 8 deck scenes, the 10 cm step snap); the eight new latency rows of V9 §6.1; the second
fixture's checklist thresholds; the re-priced estimates (AP3 7.25–11, AP10 0.25–0.5, total 19.25–28.75, now 19.5–29 after the reconciliation's AP8, below); and that the
coherence pass and the siblings adopt BCR-V9-26 – BCR-V9-34 and XV-V9-10 – XV-V9-16 as stated. Nothing of item 110 was
built or run. (Of that clause, XV-V9-10 – XV-V9-12 moved to CONFIRMED in reconcile-V09-r5, SR4-05 (d): each is met in
V10's text as V9 §10.2 cites it; XV-V9-13 – XV-V9-16 — volumes 11, 4, 3 and 5, outside that seam — stay PLAUSIBLE as
stated.)

**Reconciliation round 1 (reconcile-V09-r1).** CONFIRMED by reading: `docs/volumes/critique/seam-surfaces-r0.md` whole;
V10 §2.2, §2.3's opening, §2.6, §2.8, §2.13's `WhyAnswer` and `WhySection`, §3.9's section table and `raised` outcome
table, §3.9a whole, §3.10's opening and row list, §3.16's table, §3.17 whole, §3.20's notice, §4.1's opening and T6 rows,
§4.4, §5.4, BCR-V10-7, §10.2 (CVR-V10-4) and §10.3 (V10 md5 `e5edacf6…`, unchanged during this round); V08 §2.2's
`MapSession` types as V08's reconciliation words them (`ClerkConfig`, `HostProposal`); V03's BCR-V3-16 and V01's BCR-12
(c) on the toolkit table; the base's §7.1 toolkit table, §4.7's `Designation` and §13.2's T101-1 – T101-3. BCR-V9-35's
current-text quotation was checked against `docs/ARCHITECTURE.md` by script. PLAUSIBLE: AP8's re-priced 1–1.25 pw and the
total 19.5–29; the wording of this volume's new rows (`why.section.<kind>`, `clerk.key.unchecked`, `clerk.host.mark`,
`clerk.defect.<kind>`) until T-V9-15's readability step runs; and that V08 and V10 adopt XV-V9-17 and XV-V9-18 as stated.
(That last clause moved to CONFIRMED in reconcile-V09-r5, SR4-05 (d): XV-V9-17 is met in V08 §3.1 step 7 (a) and (b),
XV-V9-18 in V10 §2.3, §2.6, §3.17 and §3.9a.)

**Reconciliation round 2 (reconcile-V09-r2).** CONFIRMED by reading: `docs/volumes/critique/seam-surfaces-r1.md` §2.1 –
§2.5 and §3 whole; V10 as landed by its own round 2 (md5 `fe19e39e…`): §2.3's effective key, §2.6's view model and
dispatch table, §3.1's entries, §3.6, §3.10's rows and fix column, §3.16's table, §3.21, §4.1's T6 rows (`where.at`,
`where.plot`, `where.locus`, `where.slot`, `element`), BCR-V10-6, BCR-V10-18 and BCR-V10-22, and its 05:03 note asking for
the both-keys reading, which V9 §2.10 and BCR-V9-23 now carry; V08 §5.1 and §5.2's held and frozen-view sentence, and its
players' view lines as they stood before V08's own round 2 (md5 `93533a14…`); V11 §3.24.4's `deck.landmarks` row
(`bridgeMid`, `minSpanM`); the base's §2.9 `knowledge` key and J-A30.82; file f items 453, 464 and 572. Every edit was an
exact-string replacement asserted unique. PLAUSIBLE: the effective key's corner rule for a form whose tier is not below
the view key's (it errs toward hiding; no frame of SettlementForge's reaches it, since its frames are `secret`); that the
round's additions need no re-pricing (each is a parameter, a card or a control on an existing flow: AP3 and AP8 are
unchanged). XV-V9-19 is met (round 4, below). XV-V9-20 is met: V08 §3.1 step 7 (b), (c) and §3.14 (5) carry it (read in V08's round-2 text; SR2-18).

**Reconciliation round 3 (reconcile-V09-r3).** CONFIRMED by reading: `docs/volumes/critique/seam-surfaces-r2.md` §3 whole
and its §5 decisions; V08 §3.1 steps 6 and 7, §4.6, §5.1, §5.4 (1)–(2) and §13's X12 and X15 in its round-2 text (md5
`d32c6a0e…`; its round 3 ran beside this one); V10 §2.1's dependency rule, §2.6's `ClerkAction` and dispatch table, §3.1
(4), §4.2 (3) and §4.3 in its round-2 text (md5 `fe19e39e…`; its round 3 ran beside this one); file f item 260; V06
§2.13's suppression rules and §4.4; V05 §3.2 (6) and §3.10 (1); the base's `Tombstone` (§2.8), `close` and the
`WithoutBase` type (§11.2), `drawFootprint` (§7.1). Every edit was an exact-string replacement asserted unique. PLAUSIBLE:
that no re-pricing is needed (each change is a slot, a flag, a menu item or one function over an existing flow: AP5 and
AP8 absorb them at their current estimates); the deck plot's re-add by `drawFootprint` until volume 6 adopts XV-V9-23 (its
fallback pre-decided in V9 §4.20.3 (4)); the four new rows' wording until T-V9-15's readability step runs. XV-V9-19, XV-V9-21 and XV-V9-22 are met (CONFIRMED by
reading volumes 8 and 10 as their third rounds landed); XV-V9-23 stays open (volume 6; seam-surfaces-r3 SR3-08). (The
clause "the deck plot's re-add by `drawFootprint` until volume 6 adopts XV-V9-23" moved to CONFIRMED in the second brief
of reconcile-V09-r4, SR3-12: XV-V9-23 is met in V6 §3.19.3 (7) and the fallback is withdrawn.)

**Reconciliation round 4 (reconcile-V09-r4).** CONFIRMED by reading: `docs/volumes/critique/seam-surfaces-r3.md` §3 and
§5 whole; the base's §2.9 *Load* steps 1–3, §6.4's retention paragraph, §7.4's rebase row, §7.5's upgrade and "keep the
old model", §7.1's `Locus` and `Cardinal`, §11.2's call list and *Confirming fates*, and §14's `EditEngine` (`migrate`,
`rebase`); V08 §3.1 step 7, §3.8, §4.2 and §5.1 – §5.2 in their live text (V08's round 4 running beside this one); V10
§2.3, §2.6's dispatch table, §3.1 (4), §3.16's `dossier` row, §4.1's `where.locus` row, §4.3, BCR-V10-22's last sentence
and J-V10.93 in its round-3 text — on which XV-V9-19 and XV-V9-22 are marked met, and XV-V9-21 on V08 §3.1 step 7 (b),
(c), §4.6 and §5.1. Every edit was an exact-string replacement asserted unique; the J, T and XV numbers were checked to
resolve. PLAUSIBLE: that no re-pricing is needed (three strips, one control and a menu's meaning on existing flows: AP3
absorbs them at 7.25–11); the new rows' wording (`info.upgrade.offer`, `error.frozen.*`, `history.rebase.<reason>`) until
T-V9-15's readability step runs; that opening a model-less file's recipe together with its log, as a link opens, is the
base's intent (J-V9.96: the base says "its recipe"; an event of the log that no longer matches under the new version is
kept in the log as orphaned and listed in the orphan table, §7.3 item 4). (The clause "that volume 8 adopts XV-V9-24"
moved to CONFIRMED in the second brief of reconcile-V09-r2, SR-34.)

**Reconciliation round 1, continuation (reconcile-V09-r1, second brief).** CONFIRMED by reading:
`docs/volumes/critique/seam-surfaces-r0.md` §4 – §7 whole (the continuation, SS-28 – SS-46); the base's §6.1 concern
registry (the rerollable concerns), §7.1's toolkit table and its `rerollLayer` row, §7.3 item 10, §8.10's instance layouts
and §11.2's `Query` union; `docs/volumes/_integrate.md`'s J-VI.4 and J-VI.30; file f items 277, 364 and 372; V05 §4.2 and
§3.22 (4) (the island and rim bends' words); V08 §2.8's `CustomChainRecord`, §5.2's drawing table and BCR-V8-15, §8.1 –
§8.2 (SF0 – SF7 and M-SF's place); V10 §3.6, §3.16's bends paragraph, §4.1's T4, T9, T11 and T12 rows, J-V10.84 and §8's
C2 – C5. Every edit was an exact-string replacement asserted unique, and every table's column count was checked unchanged.
PLAUSIBLE: that `render.instances` is the concern a user means by "trees" (J-V9.101; it also re-draws hedgerows and
render-time field strips, display only); that
volume 5 adopts XV-V9-25's geometry; that file f item 372's note takes the fourth step of BCR-V9-22 (a lane note to the
base record's reconciler); and that no re-pricing is needed (AP5's estimate is split, not changed; AP5b's menu entry and
the new rows ride existing flows). (The clause "that the gazetteer can list `customChain` records (XV-V9-26 asks volume
8)" moved to CONFIRMED in the second brief of reconcile-V09-r2, SR-34. The clause "that file f item 372's note takes the
fourth step of BCR-V9-22" moved to CONFIRMED in the second brief of reconcile-V09-r4, SR3-12: item 372 carries it.)

**Reconciliation round 2, continuation (reconcile-V09-r2, second brief).** CONFIRMED by reading:
`docs/volumes/critique/seam-surfaces-r1.md` §7 – §9 whole (SR-22 – SR-36); the base's §5.4 `GenerationReport` and
`ReportEntry`, §6.1's salt rule, §7.1's `rerollLayer`, `placeAt`, `assign`, `rejectSite` and `addUndergroundAccess`
events, §7.3 item 9 (d), II.7.6's target step, §9.5's compass and emblem, §11.2's `Query`, `PreviewResult`,
`ConflictAction` and *Knowledge*, §7.7's `DossierBinding` and `Assignment`, and `DisplayList.salts`; file f item 582; V08
§3.6 steps 4 and 6, §4.6 whole, §5.2's `CustomChainRecord` row, BCR-V8-6, BCR-V8-8 and X18 in their live text (V08's
second brief running beside this one, its SR-23, SR-24 and SR-25 text present); V10 §4.1's T9, T11 and T12 rows, J-V10.95
– J-V10.97, CVR-V10-18 and T-V10-4 in their live text (V10's second brief running beside this one). On these, XV-V9-24 is
met (V08 §3.1 step 7 (b), §3.8, §5.2, T-V8-47) and XV-V9-26 is met (V08 §5.2's row, §1b, BCR-V8-15), so the PLAUSIBLE
clauses of round 4 and of round 1's continuation on them are CONFIRMED (SR-34). Every edit was an exact-string
replacement asserted unique. PLAUSIBLE: that V08's and V10's lanes land the texts read here unchanged; that the base
record's reconciler carries BCR-V9-36 and BCR-V9-22's two new sentences into file f, that volume 4 adopts XV-V9-27 and
volume 6 XV-V9-28;
the new rows' wording (`refuse.assignment.noSite`, `history.dossierFacts.creation`, `report.moved.<kind>`,
`report.dossier.<state>`) until T-V9-15's readability step runs; the dossier groups' 50 ms line budget until AP5b measures
it; and that no re-pricing is needed (AP5b absorbs the dossier groups and the new query form's use, AP4 the two re-roll
buttons, AP3 the refusal row and its alternative). (The clauses "that the base record's reconciler carries BCR-V9-36 and
BCR-V9-22's two new sentences into file f, that volume 4 adopts XV-V9-27 and volume 6 XV-V9-28" moved to CONFIRMED in the
second brief of reconcile-V09-r4, SR3-12: file f items 583 and 372, landed 10:39; V4 §3.8, landed 11:35; V6 §2.10 and
§3.19.3 (2), landed 11:39.)

**Reconciliation round 3, continuation (reconcile-V09-r3, second brief).** CONFIRMED by reading:
`docs/volumes/critique/seam-surfaces-r2.md` §9.3, §9.4 and §11 whole (SR2-23 – SR2-28, J-SS2.8, J-SS2.9); the base's §6.1
registry sentence (exactly six rerollable concerns: `naming`, `render.instances`, `style.jitter`, `style.crowns`,
`style.compass`, `naming.emblem`), §7.4's `rerollLayer` row ("reroll names / trees / decoration / compass / emblem"; crowns
and jitter display only) and the render-hash paragraph that reads the style salts, and §5.4's `GenerationReport.dossier`
(its `element`, `site` and `closest` addresses); V08 §3.1 step 7 (b), §1b, X20, J-V8.106 and J-V8.109 in their live text at 10:41 (reconcile-V08-r3's second brief,
running beside this one), which now name the party lines at the key `list` is called with and keep no subscription, so
XV-V9-29 is **Met** and V08's X20 is met by V9 §2.2, §4.10 and T-V9-28 as they now read; V10 §4.1's T12 row, J-V10.99 and
its §12 bullet in their live text, which already encode `restyle { concern: 'decoration' }` as `style.jitter` then
`style.crowns`, each at its effective salt + 1, as one group — the bytes V9 §4.5's New decoration now writes; and a census
of V10 with no `HistoryRow` (SR2-28's claim). Every edit was an exact-string replacement asserted unique, and every table
row edited or added keeps its table's column count. PLAUSIBLE: that V08's lane lands the text read here unchanged; that the
history's one-row rule for New decoration's group, and the two report lists' kind words under View as, read well to the
owner's reader until T-V9-15's readability step and the M3b sitting run; and that no re-pricing is needed (AP4 absorbs
one button beside three, AP5b the key argument and the names' reads, within §6.3's line budget).

**Reconciliation round 4, continuation (reconcile-V09-r4, second brief).** CONFIRMED by reading:
`docs/volumes/critique/seam-surfaces-r3.md` §9.1, §9.2 and §10 whole (SR3-10 – SR3-15, the pairs and the order of work);
V6 §2.10's `EpochReport.raised`, §2.12's suppression row, §3.19.3 (2), (3) and (7), W19, W58, J-V6.116, J-V6.120, X39 and
X44 in V06's landed text (reconcile-V06-r4, 07:31 and 11:39; md5 `ba61b240…`); V4 §3.8's *Voids and bans* and *The
dwelling closure's way in*, its U-DIG, `DugGenerators` and §4.1 `addUndergroundAccess` rows, T-V4-48's closures' clause,
J-V4.119 and J-V4.120 in V04's landed text (reconcile-V04-r4's continuation, 11:35; md5 `87f5ce61…`); file f items 372
and 583 (landed 10:39; item 583's *Needed by* names volume 8 §3.1 step 7 (b)'s party lines); V10 §3.16's bends paragraph
and J-V10.98. On these, file f carries BCR-V9-36 and BCR-V9-22's two sentences, XV-V9-23 is met (the deck plot's fallback
withdrawn), and XV-V9-27 and XV-V9-28 are met (J-V9.117), so no clause on their adoption stays PLAUSIBLE. Every edit was
an exact-string replacement asserted unique, and every table row edited or added keeps its table's column count.
PLAUSIBLE: the list form's wording ("Dig down from {building} instead") until T-V9-15's readability step runs; that
volume 10 labels its alternatives by that row as SR3-14 (b) asks (its own lane; T-V10-4's three-building case decides);
and that no re-pricing is needed (a status column, a withdrawn sentence and one catalogue label: AP6 absorbs them).

**Reconciliation round 5 (reconcile-V09-r5).** CONFIRMED by reading: `docs/volumes/critique/seam-surfaces-r4.md` §1, §3,
§4 and §5 whole (SR4-01 – SR4-06, the pairs and the order of work, J-SS4.1 – J-SS4.7); V10's text as its round-5
lane (reconcile-V10-r5) wrote it beside this one, re-read in its landed text (13:10, md5 `c5aa04a6…`) — §2.6's `ClerkAction` with the `why` kind and its labels, the
dispatch table and *The card's buttons*, §3.5 step 3's four classes and *The why target*, §3.11's staleness, §3.12 (6),
§4.4, §5.4 with its list of the drawer's keys, §3.16's alternatives column and `role` row, and CVR-V10-19 — and
V10 §2.3, §2.4, §2.13, §3.9, §3.9a, §3.17, §4.1, §4.3, IN-V10-2, CVR-V10-7, T-V10-38 and V10 §1b.1's rows for BCR-V9-10,
-12 and -16; V08 §3.1 step 7 (a) and (b). On these, XV-V9-7, -10, -11, -12, -17 and -18 are marked **Met**, and the
PLAUSIBLE clauses on their adoption (the revision's for XV-V9-7, the second round's for XV-V9-10 – XV-V9-12, round 1's for
XV-V9-17 and XV-V9-18) moved to CONFIRMED. Every edit was an exact-string replacement asserted unique, and every table
row edited or added keeps its table's column count (V9 §4.9's `clerk.alt.*` row cites volume 10's sections, not its
words). PLAUSIBLE: the drawer's reading of labelled buttons and the new rows'
places until T-V9-15's readability step and T-V9-27's scripted clerk run; and that no re-pricing is needed (one dispatch
row, three catalogue rows and button words on the existing drawer: AP8 absorbs them).

**Reconciliation round 6 (reconcile-V09-r6).** CONFIRMED by reading: `docs/volumes/critique/seam-surfaces-r5.md` whole
(SR5-01 – SR5-09, the pairs and the order of work, J-SS5.1 – J-SS5.8); V6 §3.15.5, §4.4 (with its round-6 what-if
sentence) and J-V6.98 in V06's landed text (13:59); V10's text as its round-6 lane (reconcile-V10-r6) was writing it beside
this one — §2.6's widened `useTool` (`mode`, `ids`), §3.5 step 3's reading of `MsgRow.buttons` by `does`, §8's total naming
AP8 and CVR-V10-20 — and V10 §5.4's *The keys of the drawer's words* (`clerk.alt.stale.retry` among them); file f item 582
(the bends' alternatives); V9's own §2.3, §2.9, §2.10, §3.3, §3.9, §3.10, §3.14, §4.2, §4.5, §4.6, §4.9 whole, §4.11,
§4.17.2, §4.17.4, §4.17.5's bends, §4.20.1 (3), §4.20.2 (6), §4.20.3 (6) – (7), §4.20.5, §5.5, §5.9, §5.15, BCR-V9-12, -27,
-32 and the bars edited. Every button of V9 §4.9's
table was classed by a script that asserted each row's column count and that every row either received its list or had
none (110 rows with buttons, 48 without); every other edit was an exact-string replacement asserted unique. On V10 §8's
text, XV-V9-8's V10 part is marked **Met**. PLAUSIBLE: that the six classes cover every button a later row will need (the
table was classed whole; a new need adds a class by a decision); that no engine path still emits a `reroute`
`ConflictAction` now that routes bend (J-VI.4) — T-V9-15's enum walk reports one if it does; that the `MsgRef`s the dry
run builds carry the arguments the buttons read and the text does not show (`thing`, `building`, `crypt`, `layer`,
`layerId`) — T-V9-13's fixtures check it at M2a/M3a; the new words until T-V9-15's readability step runs; that volume 10
keeps XV-V9-30 as met — its landed text (14:21) meets (a) – (f) and (h) and marks CVR-V10-20 **Met**, and (g), the
stale card's second button, is this lane's logged companion edit of V10 §3.11 and §3.17 — and volume 11 takes XV-V9-31; and that no re-pricing is needed (a type,
a column written as data, 67 word rows, 21 event forms and 24 commands that name behaviour the prose already priced in AP3,
AP4, AP6 and AP8).

## 13 Fix list

The revision (revise-V9, 2026-09-28) fixed every finding of the critique in this volume, so the list holds no deferred
item. Four findings were fixed by a mechanism other than the one the critique proposed, each recorded as a vetoable
decision: V9C-04's toggle keeps V04's name `showUnexcavated` (not `underSealed`) as a per-viewer view key (J-V9.38); V9C-14's
shade strips follow V05's revised rows — a solid outline and a dashed pending line over this volume's veil — instead of
three nested areas, which V05's revision removed (J-V9.53); V9C-08's bend ladder is stated here in BCR-V9-21 because V04's
revision landed without it (J-V9.39); V9C-03's per-use override is dropped in favour of the per-kind row, with a `use:` key
kept only for "Keep together" (J-V9.36). The disposition table is appended to `docs/volumes/critique/V09.md`. What the
siblings are asked for is V9 §10.2's list — requests, not deferrals: until each lands the screens read the fields as named.

**The second round (revise-V9, 2026-09-29, item 110).** Every finding of the critique's item-110 addendum (V9C-51 – V9C-81)
is fixed in this volume; none is ruled invalid and none is deferred, so the list still holds no item. Four were fixed by a
mechanism other than the critique's, each recorded as a vetoable decision: the uphill aqueduct offers a well rather than a
cistern, since a cistern is an underground chamber the ground tools do not draw (J-V9.75); a dossier-declared raised way
cannot arise, because volume 8 binds nothing item 110 makes (V08 §2.6b (5)), so V9C-55 (3)'s dossier path is kept only as
V9 §4.3's general rule; the removed thing's former shape comes from the base's tombstone through a new request, BCR-V9-34,
which V9C-55 (4) needed and did not name (J-V9.77); and the effects list gains the kind `added`, so a Re-derive can name
what the city raises (J-V9.64). Two requests were added beyond the critique's: `delete` under T10 (J-V9.74, adopting
critique-V10's CVR-V10-7) and the terrace sugar's expansion into volume 10's flatten mode (J-V9.78). The disposition table
is appended to `docs/volumes/critique/V09.md` as its §13.

**Reconciliation round 1 (reconcile-V09-r1, 2026-09-29).** All nine seam issues this volume owns in
`docs/volumes/critique/seam-surfaces-r0.md` — SS-06, SS-07, SS-08, SS-11, SS-13, SS-15, SS-16 (majors) and SS-22, SS-23
(minors) — are fixed in place; none is ruled invalid and none is deferred, so the list still holds no item. The note at
the end of this file lists each change.

**Reconciliation round 2 (reconcile-V09-r2, 2026-09-29).** All nine seam issues this volume owns in
`docs/volumes/critique/seam-surfaces-r1.md` — SR-06, SR-08, SR-09, SR-10, SR-12, SR-13 (majors) and SR-14, SR-15, SR-16
(minors) — are fixed in place; none is ruled invalid and none is deferred, so the list still holds no item. The note at the
end of this file lists each change.

**Reconciliation round 3 (reconcile-V09-r3, 2026-09-29).** All seven seam issues this volume owns in
`docs/volumes/critique/seam-surfaces-r2.md` — SR2-01, SR2-02, SR2-13, SR2-14 (majors) and SR2-11, SR2-15, SR2-18
(minors) — are fixed in place; none is ruled invalid and none is deferred, so the list still holds no item. The deck
plot's re-add form carries a pre-decided fallback (V9 §4.20.3 (4)), not a deferral (withdrawn in the second brief of
reconcile-V09-r4: XV-V9-23 is met; SR3-12). The note at the end of this file lists
each change.

**Reconciliation round 4 (reconcile-V09-r4, 2026-09-29).** All five seam issues this volume owns in
`docs/volumes/critique/seam-surfaces-r3.md` — SR3-01, SR3-02 (majors) and SR3-03, SR3-04, SR3-05 (minors) — are fixed in
place; none is ruled invalid and none is deferred, so the list still holds no item. XV-V9-23 (volume 6) and the new
XV-V9-24 (volume 8) are requests to siblings, not deferrals. The note at the end of this file lists each change.

**Reconciliation round 1, continuation (reconcile-V09-r1, second brief, 2026-09-29).** All nine seam issues this volume
owns in the continuation of `docs/volumes/critique/seam-surfaces-r0.md` (§5) — SS-29, SS-32, SS-40, SS-41 (majors) and
SS-30, SS-31, SS-34, SS-35, SS-46 (minors) — are fixed in place; none is ruled invalid and none is deferred, so the list
still holds no item. SS-35 is fixed with file f item 372's shaft as the ladder's third step and SS-35's bend as its fourth
(J-V9.102); SS-46 also moves a way's own `setAttr` row to T9 (J-V9.104); SS-32 also carries J-VI.4 (d) and (e) into the
island rows (J-V9.106). XV-V9-25 (volume 5) and XV-V9-26 (volume 8) are requests to siblings, not deferrals. The note at
the end of this file lists each change.

**Reconciliation round 2, continuation (reconcile-V09-r2, second brief, 2026-09-29).** All seven seam issues this volume
owns in the continuation of `docs/volumes/critique/seam-surfaces-r1.md` (§7) — SR-22, SR-30 (majors) and SR-27, SR-29,
SR-34, SR-35, SR-36 (minors) — are fixed in place; none is ruled invalid and none is deferred, so the list still holds no
item. Three were fixed by a mechanism beside the issue's text, each recorded as a vetoable decision: SR-22's group is
formed by the port's session, since the port's events carry no `group` (J-V9.107), its note keys are resolved by a new
`entity` input (BCR-V9-36; J-V9.108), and the report's entries gained catalogue rows (J-V9.109); SR-29's this-quarter
read follows V9 §2.7's effective key rather than the role's key (J-V9.110); SR-36's alternative carries its events by a
widened BCR-V9-22 (J-V9.112). Found beside SR-22 and fixed: V08 §4.6 item 3's `info.raised.suppressed` line had no
field, now an epoch row's line from V06's epoch report (XV-V9-28; J-V9.113). XV-V9-27 (volume 4) and XV-V9-28 (volume
6) are requests to siblings, not deferrals. The note at the end of this
file lists each change.

**Reconciliation round 3, continuation (reconcile-V09-r3, second brief, 2026-09-29).** All four seam issues this volume
owns in the continuation of `docs/volumes/critique/seam-surfaces-r2.md` (§9) — SR2-23 (major) and SR2-26, SR2-27, SR2-28
(minors) — are fixed in place as their required changes state; none is ruled invalid and none is deferred, so the list
still holds no item. Each is recorded as a vetoable decision (J-V9.114 – J-V9.116; SR2-28 needs none). Found beside SR2-26
and fixed: the `rerollLayer` history template had no words for **New emblem** and **New compass** (J-V9.115). XV-V9-29
(volume 8, SR2-24 (a)'s text) is recorded as met in V08's live text. The note at the end of this file lists each
change.

**Reconciliation round 4, continuation (reconcile-V09-r4, second brief, 2026-09-29).** The one seam issue this volume owns
in the continuation of `docs/volumes/critique/seam-surfaces-r3.md` (§9.2) — SR3-12 (minor) — is fixed in place in all
five of its parts; it is not ruled invalid and nothing is deferred, so the list still holds no item. Part (b) is fixed
beyond its text as a vetoable decision: XV-V9-27 and XV-V9-28 are marked **Met**, not **Open**, because volumes 4 and 6
landed the requested text before this lane ran (J-V9.117); part (e)'s list form is J-V9.118. Volume 10's companion
(SR3-14 (b)) is its own lane's. The note at the end of this file lists each change.

**Reconciliation round 5 (reconcile-V09-r5, 2026-09-29).** The one seam issue this volume owns in
`docs/volumes/critique/seam-surfaces-r4.md` — SR4-05 (minor; the companions of volume 10's SR4-01 – SR4-04 and six stale
statuses) — is fixed in place in all four of its parts; it is not ruled invalid and nothing is deferred, so the list still
holds no item. Two points are fixed beside or beyond its text as one vetoable decision (J-V9.119): XV-V9-12 cites
`RaisedOutcome`'s reason key and IN-V10-2's `raised[].reason`, the fields volume 10 holds, and the drawer gains the three
places its new keys are drawn (a viewer's `refuse.viewer`, a key change's `clerk.view.cleared`, a host card's stale state
without **Ask again**). Found beside, from volume 10's companion request CVR-V10-19 (written by its round-5 lane beside
this one) and fixed: V9 §4.9's opening cites V10 §3.5 step 3's why-target rule for the canvas's **Show me why**
(J-V9.120), and the `refuse.clerk` row and T-V9-15 name `refuse.clerk.dossier.count`. The note at the end of this file
lists each change.

**Reconciliation round 6 (reconcile-V09-r6, 2026-09-29).** The three seam issues this volume owns in
`docs/volumes/critique/seam-surfaces-r5.md` — SR5-01 and SR5-04 (majors) and SR5-07 (minor, all four parts) — are fixed
in place; none is ruled invalid and nothing is deferred, so the list still holds no item. Fixed beyond the issues' text,
each a vetoable decision: the button type gains a sixth class `app` and the fields `each`, `event`, `command` and `when`,
with V9 §4.9's event forms and application commands written once (J-V9.121; asked of volume 10 as XV-V9-30, and the
locale rule of volume 11 as XV-V9-31); the bend
below a rebase point is detected from the copy's `forkedFrom.seq` (J-V9.122); two unwired buttons are withdrawn and
`refuse.stale` gains **Show me why** (J-V9.123); the mode ids and the why pages' id forms are stated (J-V9.124). The note
at the end of this file lists each change.


## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V09-1 (J-VI.1, clean-room).** The handle kind is renamed `'towerResize'` (one line); its former name coincided
  with a reference export field and is not repeated here (reworded by the continuation, J-VI.23).
* **IN-V09-2 (J-VI.4; item 101 R2).** The "added refusal class" is withdrawn: J-V9.67 is marked withdrawn, §4.9's
  sentence and §4.20.5 (4) were edited in place, T-V9-13's list reads the `bend.*` keys. The rows `refuse.raised.island`,
  `refuse.aqueduct.island`, `refuse.raised.onIsland`, `refuse.aqueduct.uphill`, `refuse.retaining.rim` and
  `refuse.stack.*` are renamed `bend.*` with the same words; each renders as a bend card (the bend's line, the bent
  declaration pre-selected, the former offer as the alternative), per J-VI.4 (a)–(i). J-V9.44's list of refusals that
  remain (a dossier fact, a lock or an assignment, a dependent later change, the viewer role, a staged layer, the rung,
  the screen) is unchanged: those are availability gates, not bends of a lawful declaration.
* **IN-V09-3 (J-VI.2, J-VI.3).** The raised-way reason words are `drop`, `link`, `water` (and `declared`); the preview's
  closure-arc barrier kinds are `shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte` (edited in place).
* **IN-V09-4 (J-VI.5; volume 2's X21).** T9's tier controls also carry, from volume 2's second revision: the **shape**
  chip (V02's tier-0 shapes), the **skirt** and **solid** chips (a tier's skirt and its solid form), a **shrine-inset
  handle** on the top tier, the **centre and radius handles** on a round or octagonal tier 0, and the **Sealed** choice
  on the stair chip (`stairs: 'none'`, edited in place); every bend of V2 §1b (`bend.tiers.*`, `bend.stack.*`,
  `bend.deck.single`, …) has a catalogue row with its words; each control emits `setMassing { op: 'tiers' }` or
  `setAttr` as V2 §4.6 states.
* **IN-V09-5 (J-VI.17 H5; volume 2's X10).** The style panel offers the `FM` building look; the tool rows for
  `setComposition room`, the secondary porch and `moveTower { shape }` exist on T9 `shape`; the advanced panel carries
  the `fantasyShapes` control (V2 §4.4–§4.5, BCR-V2-30).
* **IN-V09-6 (J-VI.17 H23; volume 4).** T9 `shape` shows a raised way's span `use` (open or vault, a held `setAttr`) and
  a ruin monument's count (`setAttr` on `monument/count`).
* **IN-V09-7 (J-VI.17 H24; X-V12-6, X-V12-8).** The tables editor's cell inspector reads `dist/evidence.json` — the
  status in plain words ("the owner's rule" for a stamped cell) and the evidence lines; the preset dialog lists the
  adopted historical packs as "historical (<era>, <region>)", offered only to documents of that era and region. V9
  §7.2's second fixture checklist cites volume 12 §3.14's K2 list: K2-4 reads "≥ 8 jetties outside the basin, deck
  buildings on ≥ 4"; the fixture's inputs live in `plat/tests/fixtures/known-city/K2/`.
* **IN-V09-8 (J-VI.8; applied in place by reconciliation round 2, SR-15).** `deck.landmarkMinSpanM` names volume 11's cell `deck.landmarks/bridgeMid/minSpanM` (40 m); it
  is not a constant of this volume.
* **IN-V09-9 (J-VI.17).** `ClerkHandle.send`'s entries are volume 10's five (`help` added in place).
* **IN-V09-10 (J-VI.14).** The delete row's "kept removed" line for a raised way, an island, an access, a harbour chain
  or a quay wall reads the one suppression mechanism (file f).
* **IN-V09-11 (J-VI.18).** BCR-V9-31 (a)'s GeoJSON names follow file f item 447's one text for both variants: each
  support a Polygon of kind `raisedSupport` (with `key` and `state`), a retaining wall of kind `retaining` (edited in
  place), plus volume 12's `raisedKind`, `source`, `stair`/`ramp` flags and `onDeck`.
* **IN-V09-12 (J-VI.22).** AP6 and XV-V9-8 name volume 4's milestone **M6-U** (edited in place); "M6c" stays volume 2's.

## Reconciliation round 1 (volumes/reconcile-V09-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against the nine seam issues `docs/volumes/critique/seam-surfaces-r0.md` assigns to this volume.
Every one is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SS-06 | major | V9 §2.2: in host mode `ShellConfig.clerk` is always set — kind `host` when `clerkMode` is `host` or `off` — and `HostSlots` gains `hostName`; V9 §4.11 gains the card-only drawer (the host's proposal card alone, its AI mark `clerk.host.mark`, Accept, Drop and Why, closing on either); §2.12 lifecycle row; T-V9-64; T-V9-40's host clause; J-V9.80; XV-V9-17 |
| SS-07 | major | V9 §2.10's `ClerkMount` gains `host` (`config`, `onConfig`, `needsToken`, `refused`, `proposals`, `answer`) with the bridge body types `ClerkConfig` and `HostProposal` cited from BCR-V10-7 under V08's names, filled by the embed's bridge handler (V08 §3.1); the closing paragraph routes the whole `clerk.config` there; §1b and §2.12 rows; J-V9.81; XV-V9-17, XV-V9-18 |
| SS-08 | major | `ClerkHandle` declares `run`, `newTopic`, `defects`, `clearDefects` and `setKey(): Promise<keyState>`; V9 §4.11's drawer menu gains New topic and the key card shows the verdict; V9 §5.12's Assistant section lists the defect records with Save as file and Clear; new catalogue rows `clerk.key.unchecked`, `clerk.defect.<kind>`, `clerk.defects.none`; T-V9-27 extended; AP8 +0.25 pw (1–1.25; total 19.5–29) |
| SS-11 | major | V9 §4.5's T6 drop-on-a-plot mapper cites V10 §4.1's `where.at` / `where.plot` rows: `designation { cls, use }`, the name a `setAttr` on the created use (its address from the preview's `created` list), one group; J-V9.84 |
| SS-13 | major | BCR-V9-35 on §7.1's toolkit table: T6's row gains a one-line `roster` (composing with BCR-V3-16 and V01's BCR-12 (c)); V9 §4.3's `roster` row and §4.5's T6 mapper name it; T-V9-12 checks each mode's `emits` against its tool's registry entry; J-V9.83 |
| SS-15 | major | `WhyCardModel` gains `sections` (title `why.section.<kind>`, rows with `text`, `value`, `tier`, `target`, `withheld`), drawn after the facts in registration order, with a §2.7 table row; `under` withdrawn; a raised way's `decidedBy` is its own `raised` row; V9 §4.17's panels and §4.20.6's why lines read the same rows; V9 §5.8 draws the sections; T-V9-65; J-V9.82 |
| SS-16 | major | V9 §2.9 and §4.9 state that the catalogue file carries volume 10's key families (`critique.K1`–`K18`, `refuse.clerk.*`, `clerk.notice`, `info.raised.<outcome>`, `info.under.*`, `info.catacomb.*`, `info.crypt.*`, `kind.<registry kind>`) with their `en` texts written once in V10 §2.10, §3.9, §3.9a, §3.10, §3.16 and §3.20; the two sub-families V10 names without words are this volume's (`info.under.cause.<rule>`, `info.catacomb.blocked.<cause>`); `why.under.deep` / `.sealed` renamed `info.under.deep` / `.sealed`; the three `info.catacomb.*` rows point at V10's texts; T-V9-15 covers every family; J-V9.79 (J-V9.55 revised) |
| SS-22 | minor | V9 §4.11's Apply-then-undo cites V10 §4.4 and drops its list of never-applied cases |
| SS-23 | minor | V9 §4.11's What the assistant sees cites V10 §5.4's view without restating its contents |

**Counterparts done in the same passages** (the V09 halves of issues owned by V10, cheap and in sections this round edited):
SS-09 — V9 §4.11's actions follow V10 §2.6's dispatch table, with `rebuild` → **Put it back** on the card; SS-10 —
`ClerkMount.effectiveKey` and `onEffectiveKey` expose the effective key (the view's key, its tier lowered to View as), under the names V10's CVR-V10-15 asks for; SS-21 — `LinkRow.chain`
cites V10's `WhyLink['chain']`; SS-24 — `ClerkSlot.label` reads "Assistant (AI)". Also CVR-V10-4's remaining row: V9 §6.2
states the standalone page's `connect-src`. The other sides are XV-V9-17 (V08) and XV-V9-18 (V10).

**Aligned after volume 10's reconciliation note (04:01).** Three names now match volume 10's round: `ClerkMount`'s key
members are `effectiveKey` and `onEffectiveKey` (CVR-V10-15); T6's one-line `roster` carries `expansion` and writes
`name: ''` for an empty name field, one text with V10 §4.1's `where.locus` row (BCR-V10-23); and the family multipliers'
cell is `familyWeights`, volume 11's name for it (V11 §4.2; CVR-V10-16), in V9 §2.6, T-V9-25 and XV-V9-1.

## Reconciliation round 2 (volumes/reconcile-V09-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the nine seam issues `docs/volumes/critique/seam-surfaces-r1.md` assigns to this volume.
Every one is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SR-06 | major | BCR-V9-23's `viewAs` takes a key form `{ tier: 'public' \| 'local'; places: Id[] }` beside a tier, admitting what both the view's key and `viewAs` admit (BCR-V10-22's reading, per volume 10's 05:03 note); V9 §2.10 states `effectiveKey()`'s rule (the form when its tier is the lower, the places both lists hold otherwise) and makes it the shell's one computation; V9 §4.8 adds a host's players' view (set by the embed's bridge handler through `setViewOpts`), the menu entry "What the players know" with the others disabled (`info.viewAs.host`), and the host's strip standing for the banner; §1b and §2.12 rows; J-V9.85; XV-V9-20 |
| SR-08 | major | V9 §2.7: every band-less `query` the application makes for a view — `why`, `entity`, `sites`, `links`, `gazetteer`, `people`, `whereIs`, `relations` — passes `admitAs` = `effectiveKey()`, cached answers re-asked on `onEffectiveKey`; the application's own dry runs stay at the role's key (consent); V9 §4.8 and §5.10: the export dialog defaults to the effective key; BCR-V9-14's `ExportOpts.knowledge` takes the key form; new bar T-V9-66; J-V9.86; XV-V9-19 (c) |
| SR-09 | major | V9 §3.3 step 4: a point-dropped `placeAt` is written `plot: ''` with `from: { points: [p] }`, the dry run deriving the plot (BCR-V10-18; V10 §4.1's `where.at`), "this plot only" writing the plot under the point (`where.plot`); V9 §4.20.4 (1): the dry run finds the deck plot under the point; T-V9-12 checks the bytes; J-V9.87 |
| SR-10 | major | V9 §4.5's T6 row: with a dossier connected a locus drop previews the one-line `roster`, and its refusal card is the new row `refuse.roster.dossier` with the element picker of V9 §4.16 (5) and **Put it at {site}** — `placeAt` on the first candidate with no hard fails of a `sites` query narrowed by the locus; T-V9-13 extended; J-V9.88; XV-V9-19 (b) |
| SR-12 | major | V9 §4.11: **How do I …?** in the drawer's menu, sending on V10's `help` entry with the answer's `useTool` drawn as its button; V9 §5.9: the same in Help; V9 §4.5's T7 row and V9 §4.11: **Ask the assistant to place these** under T7's box, sending on the `roster` entry; each shown only with a clerk configured and on; T-V9-40 extended; J-V9.89 |
| SR-13 | major | V9 §3.12: the import dialog runs a finding's `propose` fix itself through V9 §3.3's pipeline, committed as the user's declaration with no `proposedBy`, clerk or none — V10 §2.6's table's one exception; §1b row; T-V9-40 asserts a Fix with no clerk configured; J-V9.90; XV-V9-19 (a) |
| SR-14 | minor | V9 §3.14's clerk row cites V10 §3.16's `refuse.clerk.offline`, `.key.<keyState>` and `.budget` and the actions V10's row offers, quoting nothing; the row `clerk.key.refused` is deleted; `clerk.cap.reached` is the meter's foot line only |
| SR-15 | minor | the §4.20 constants table, §4.20.4 (7), BCR-V9-30 and T-V9-55 name volume 11's cell `deck.landmarks/bridgeMid/minSpanM` (V11 §3.24.4) with no number; XV-V9-13's deck clause is marked met; §12's second-round list and IN-V09-8 note the move |
| SR-16 | minor | `HostSlots.banner` renders the frame's own strips (V08 §5.1's "Showing what the players see", the held and frozen-view notices of V08 §5.2); `historyFilter` cites §11.3's viewer role for a generic host, SettlementForge setting none; V9 §1.3 drops "the viewer's filtered history"; §1b's `HistoryRow` row follows |

**Other sides.** V08's SR-05 (the players' view as `viewAs`) and V10's BCR-V10-22 are the counterparts of SR-06 and SR-08;
XV-V9-19 asks volume 10 for the dispatch table's exception, the one `sites` query of the dossier alternative, the scope of
BCR-V10-22's last sentence and the key form's corner rule; XV-V9-20 asks volume 8 for the `setViewOpts` route and the
banner slot's contents. For file f: item 464 (BCR-V9-23) is now needed by V08 too, and item 453 (BCR-V9-14) carries the
key form. The build plan's estimates are unchanged (V9 §12).

## Reconciliation round 3 (volumes/reconcile-V09-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the seven seam issues `docs/volumes/critique/seam-surfaces-r2.md` assigns to this volume.
Every one is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SR2-01 | major | V9 §2.2: `HostSlots.historyLines` (`list`, `onChange`) and `HostHistoryLine { at, text, targets }`; V9 §4.10: the host's lines as one group "The party" (`history.group.party`) at the head of the All and SettlementForge filters, newest first, **Show** when targeted, no Undo this, never persisted; V9 §5.6 draws it; §1b and §2.12 rows; T-V9-28's allowlist counts the group; J-V9.91; XV-V9-21 |
| SR2-02 | major | V9 §2.2: `HostSlots.newDocuments: 'download' \| 'off'`, required in host mode; V9 §3.9's new host bullet: every action that makes a new document (Open a copy from here, Re-run from here, `refuse.restore.dossier`'s button, the clerk's `fork` and `rerun`, Enter's Same kind, new seed, `ClerkMount.openNewDocument`) writes `export(h, 'plat')` at the role's key to the device and releases it, toast `info.copy.saved` (and `info.copy.rerunEdits` after a re-run), or with `'off'` (and below `secret`) the controls are hidden; no creation mode in host mode; V9 §3.2 (3), §4.10, §4.11 cite it; §1b, §2.12 and AP5 rows; T-V9-28 and T-V9-40 host clauses; J-V9.92; XV-V9-21, XV-V9-22 (c) |
| SR2-11 | minor | V9 §4.5's T6 row and `refuse.roster.dossier`'s button column: with no `sites` candidate free of hard fails, **Put it at {site}** is not shown and the element picker stays, one rule with volume 10's `dossier` alternative; T-V9-13 gains the case |
| SR2-13 | major | V9 §4.11's drawer menu gains **Start a new map from this** (standalone only), putting the next message in creation mode under `clerk.newMap.line`; V9 §2.10's `send` gains `attach.newMap?: true`; §1b, §2.12 and AP8 rows; T-V9-40's clause; J-V9.93; XV-V9-22 (b) |
| SR2-14 | major | V9 §2.10's `ClerkMount.rebuildEvents(seq)`; V9 §4.20.3 (4) states the one function (tombstones read at the effective key, [] when nothing can be built) that the history row and the mount share; V9 §4.10 and §4.11 cite it; BCR-V9-34 names the mount as a reader; §1b rows; T-V9-53 asserts byte-equal events from row and mount; J-V9.94; XV-V9-22 (a) |
| SR2-15 | minor | V9 §4.20.3 (2), §2.12's removal row and BCR-V9-26 (e) cite file f item 260's kinds (raised way, harbour-mouth chain, quay wall, retaining wall, deck plot; islands and sky accesses in volume 5's form); V9 §4.20.3 (4) gains a Build-it-again row per kind (a deck plot by `drawFootprint` at its slot, with a pre-decided fallback) and BCR-V9-34 the fields those rows read; T-V9-53's fixture adds a generated retaining wall and a deck plot; J-V9.95; XV-V9-23 |
| SR2-18 | minor | V9 §4.9's sentence names every `host.*` key volume 8 routes (V08 §13 X12); V9 §5.12's forced fields read `host.locked`; XV-V9-20 marked met; V9 §12 keeps XV-V9-19 open until volume 10 writes SR2-10 and SR2-17 |

**Wording kept to this volume's rules.** The seam's toast "Saved a copy to your computer: {file}. It does not follow
{host}." is shipped as one sentence, "Saved a copy to your computer as {file}; it does not follow {host}.", to meet V9
§4.9's one-sentence rule (J-V9.92). **Other sides.** V08's SR2-03 fills the two slots (XV-V9-21); V10's SR2-17 (c) and (d)
cite `rebuildEvents` and `attach.newMap`, and XV-V9-22 (c) asks it to confine the automatic creation mode to standalone;
V06 is asked to name the re-add forms (XV-V9-23). For file f: item 467 (BCR-V9-34) now also serves volume 10 through the
mount, and item 362 (BCR-V9-26) cites item 260's kinds. The build plan's estimates are unchanged (V9 §12).

## Reconciliation round 4 (volumes/reconcile-V09-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r4; covered by the whole-design retrovalidation (J84).

Reconciled in place against the five seam issues `docs/volumes/critique/seam-surfaces-r3.md` assigns to this volume.
Every one is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SR3-01 | major | V9 §3.14's older-document row is three rows citing §2.9: (a) inside the retention window the document edits under its own version and the owner is offered the upgrade — standalone the new strip `info.upgrade.offer` (**See what changes** → §7.5's diff in the fates sheet, **Do it** commits the `upgrade`; **Not now**), in host mode V08 §4.2's **Update the map engine** alone; (b) outside the window with `model` the frozen view under `error.frozen`, whose one owner control **Edit it with this version** sends the `rebase` with reason `frozenImport` through `edit`, its `confirm` with the renames in the fates sheet (host mode: `doc.changed`, then `doc.snapshot`), with `error.frozen.damaged` and `error.frozen.pack` for its refusals; (c) without `model`, `error.frozen.noModel` and **Open its recipe with this version**, a new document from the recipe and log as §6.4 opens a link, added to V9 §3.9's host-rule list. `error.frozen`'s button reads "Edit it with this version"; four catalogue rows added; V9 §3.1 (3) (b) reads "a frozen view for an output version outside the retention window"; V9 §4.3's `upgrade`, `rebase` row adds the frozen view's control; §4.10 gains `history.upgrade` and `history.rebase.<reason>`; V9 §2.2's `banner` comment: the frozen view's notice is the shell's strip, never the slot's (J-V9.97; XV-V9-24 to V08); §1b row; AP3; T-V9-67 new; J-V9.96, J-V9.97 |
| SR3-02 | major | V9 §2.2's `fileMenu: false` states its meaning once — the menu keeps Export skeleton, Rebuild around my drawings, Settings and About, drops New town, Open…, Save a copy and Recently deleted (their keys inert), Settings drops its Storage section; V9 §1.3, §5.1's top bar and §5.12 (its routes: the menu's Settings and the clerk's `openSettings`; Storage standalone only) cite it; T-V9-28's allowlist names the four items and the missing Storage section; T-V9-40 runs `openSettings` from a `key` and a `budget` refusal in host mode under `builtin`; J-V9.98 |
| SR3-03 | minor | V9 §4.5's T7 row: a list line committed naming no element comes back `dossier-owned` with `refuse.roster.dossier` — the picker and **Put it at {site}** by T6's `sites` query, `near` and `district` from the line's locus and omitted without one — one rule with volume 10's `dossier` alternative; the row's source column reads "a `roster` line naming no element — T6's one line, any line of T7's list, or the clerk's"; T-V9-13 gains the T7 case; J-V9.99 |
| SR3-04 | minor | V9 §4.16 gains (6) **Wording a locus**, the reverse of (4) (connective from `parse.rel.<rel>`, "the {side} side of" from `parse.side` and `parse.dir.<side>`, the target's gazetteer name at the view's effective key), read by `refuse.roster.dossier` and the history template "Asked for {name} {locus}"; (4) reads the side form after any connective, so the wording round-trips; the row states its slots and reads "…or put {thing} on a plot {locus}." (the connective now inside the slot; "in {settlement}" for a line with none); T-V9-13 checks the round trip; §1b row; J-V9.100 |
| SR3-05 | minor | XV-V9-19, XV-V9-21 and XV-V9-22 marked **Met** with their citations (read in volumes 8 and 10 as their third rounds landed); XV-V9-23 marked **Open** (volume 6; SR3-08); V9 §12's sentences read as the issue gives them, and a round-4 paragraph is added |

**Wording kept to this volume's rules.** The seam's slot rule "the settlement's name for a line with none" is kept, written
after `in`'s connective ("in Oakford"), because (6)'s wording carries its connective and the row's text now reads "on a
plot {locus}" — "near near the North Gate" and "on a plot Oakford" are both avoided (J-V9.100). **Other sides.** V08's
round 4 (SR3-06) words host mode's differences against V9 §2.2's `fileMenu`; XV-V9-24 asks it to leave a frozen view's
notice to the shell's strip and to cite V9 §3.14 (b) in V08 §3.8 (lane note 07:28). V10's round 4 (SR3-07 (d), (e)) cites
V9 §4.9's row for the slots and T-V10-7 for the list line (lane note 07:28). The build plan's estimates are unchanged
(V9 §12).

## Integration notes — continuation (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate (continuation); covered by the whole-design retrovalidation (J84).

* **IN-V09-13 (J-VI.23, clean-room).** IN-V09-1 no longer names the retired handle kind (its former name coincided
  with a reference export field). No meaning changed.
* **IN-V09-14 (J-VI.27).** The **Deck height** and **Arch spacing** steppers (§4.20) edit file f item 244's held fields
  `clearanceCm` and `spanSpacingCm`; item 244's support step and the course solver read them, so an edit re-lays the
  piers and re-derives the spans in the same commit (BCR-V9-33's bends unchanged).
* **IN-V09-15 (J-VI.4 applied in the text).** BCR-V9-26 (b)'s last sentence read that a raised stroke ending on an
  island's rim or lying on its key "is refused with volume 5's refusal and its offer"; it now reads that it is bent as
  J-VI.4 (d) and (e) state, as file f item 362's note already applies it; and its uphill aqueduct's last resort, which read
  "F-EDIT with the action 'a well at the terminal'", now reads "bent to a well at the terminal (J-VI.4 (h))".
* **IN-V09-16 (J-VI.30, item 101 R2).** The message rows `refuse.noSite`, `refuse.overBudget` and `refuse.vacateFirst`
  are now `bend.place.noSite`, `bend.place.overBudget` and `bend.vacate`: a user's placement that no plot here fits, one
  over its disruption budget, and a join or split that removes an occupied building are bent by the dry run and named in
  one line (file f item 582), since none contradicts a dossier fact or a lock; the clerk (volume 10) renders them as the
  item's `bent` line with its alternatives (V10 §3.16; SS-17, SS-28), no refusal category (reconcile-V09-r1, SS-30). The
  dossier-backed refusals (`refuse.dossierOwned`, `refuse.dossierRemove`, `refuse.roster.dossier`), the
  lock refusals and `refuse.assignment.noSite` — the F-EDIT item 582 keeps for an assignment, or the re-placement a
  `rejectSite` causes, that no plot satisfies inside the hard rows (reconcile-V09-r2's second brief, SR-30) — stay.

## Reconciliation round 1, continuation (volumes/reconcile-V09-r1, second brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against the nine seam issues that the continuation of `docs/volumes/critique/seam-surfaces-r0.md`
(its §5, SS-28 – SS-46, against the live text of 08:31) assigns to this volume. The lane's first brief (SS-06 – SS-23)
landed at 04:01 and is the "Reconciliation round 1" note above; this is a second brief under the same lane key. Every
issue is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SS-29 | major | V9 §3.7's Try again loses the layer chips: new names are T11's **New names** with its scope, new trees T12's **New trees** — `rerollLayer { concern: 'render.instances', salt: current + 1 }`, town-wide, committed at once — added to V9 §4.3's T12 row beside `style.compass` and `naming.emblem` (so V10's `DressInput.restyle` reaches it unchanged) and to §4.5's T12 row (a Dress-panel button, as New emblem; its mapper); T-V9-6 drives **New trees** (its step at M3b with T12) and checks that Try again offers no layer chip; AP4 builds it; §1b row; J-V9.101 |
| SS-30 | minor | IN-V09-16 reads that the clerk renders item 582's bends as the item's `bent` line with its alternatives (V10 §3.16; SS-17, SS-28), no refusal category |
| SS-31 | minor | V9 §4.15's *Declaring in words*: a named target's point is its `EntityCard.anchor` (V10 §3.6 rule 1, read by the `entity` query), nothing else snapped there; T-V9-13's locus cases compare that point and the bytes with volume 10's encoding of the same words |
| SS-32 | major | V9 §4.20.2 (5): with no higher source in reach the dry run bends the stroke to a well pin at the terminal (J-VI.4 (h)), `bend.aqueduct.uphill` reading "…to feed {terminal}, so it has a well instead." with "Show me why" only; V9 §4.20.9 and §4.2's Sky sentence: a rim retaining or terrace stroke is bent inward past the rim walk by the dry run (J-VI.4 (g)), `bend.retaining.rim` reading "The rim walk stays level; the wall stands inside it."; the inward move's geometry (to 1 m inside the `setback` line along the radial) is now the dry run's, asked of V05 as XV-V9-25; J-V9.76 withdrawn; J-V9.75 reads "the bent result"; J-V9.44's clause adds "(withdrawn by J-VI.4)"; T-V9-52 and T-V9-59 read as the issue gives them. With them (same class, J-V9.106): §4.20.2 (6) and the island rows carry J-VI.4 (d) and (e) — a raised stroke to a rim becomes the sky access (`bend.raised.island`, alternative **Draw a road to its foot**), an aqueduct stroke to a rim ends at its last ground vertex (`bend.aqueduct.island`), a stroke on an island's key drops `raised` (`bend.raised.onIsland`) or becomes a fountain pin (new row `bend.aqueduct.onIsland`); §1.2's read list and XV-V9-16 (its part (b) marked met in V05's text) follow |
| SS-34 | minor | AP8 reads "M3c (staged; with V10's C2–C5 — C5 for the host channel and the card-only drawer)"; T-V9-64's milestone reads M3c with V10's C5 |
| SS-35 | minor | V9 §4.17.4 and BCR-V9-22: the dwelling closure's ladder is dug access → public opening → a `collapsed_shaft` from the public ground over the cluster (file f item 372's note, J-VI.4) → else the dry run bends the declaration onto ground part 0 over the same footprint, `bend.under.noAccess` ("Nobody can reach this cave yet, so the homes stand above it.") with **Add a way down** and **Show me why**; the row `refuse.under.noAccess` is renamed; T-V9-38 reads "…or is bent above ground by `bend.under.noAccess`"; J-V9.102 records why file f's shaft precedes SS-35's bend |
| SS-40 | major | V9 §8.1 splits AP5: **AP5 — time** (M4, with V06's steps; 0.5–0.75 pw; T-V9-16 copy, -41, -53 epochs) and **AP5b — host mode** (M-SF, with V08's SF4 and SF6; 0.25–0.5 pw; the host shell on V08's embed with `HostSlots`, `newDocuments`, `historyLines`, the load outcomes in host mode, View as's host form, the assistant's host clauses and the Show menu's chains entry; T-V9-28, -40 host clauses, -64 on the embed, -66's embed clause, -67's host clauses, -68); T-V9-64 and T-V9-40's host clauses run at M3c on the application harness's scripted host page (defined in T-V9-64) and again at M-SF; T-V9-28, -66 and -67 milestone cells follow; AP3's exit drops -28 and names -66 and -67's standalone clauses; the total's estimates are unchanged, AP5b inside the base line; J-V9.103 |
| SS-41 | major | V9 §5.4's Show menu gains **SettlementForge's chains** (V08 §5.2's `supplyChains` view), offered only while the gazetteer lists an active `CustomChainRecord` at the view's key (XV-V9-26 to V08), a stored value drawing nothing while none is listed; BCR-V9-3's `thematic` enumeration gains `supplyChains`; V9 §5.15 and §1b rows; AP5b builds it; T-V9-68 on `town-cc-1` (its variant with one active chain, and one with none) checks the entry, the key filter, the export and that switching it changes no digest and no log; J-V9.105 |
| SS-46 | minor | V9 §4.20's four context-control rows read T9; V9 §4.20.6 (2) and (6) name T9's controls; V9 §4.3's item-110 `setAttr` row and, by the same rule (V9 §4.1; the same kind), a way's own `setAttr` row (class, width, name, a bridge's kind) are homed on T9, whose main row lists them; §4.5's T9 row names them; §1b's item-110 row reads "T9's span chips"; J-V9.104 |

**Other sides.** V10 (reconcile-V10-r1's second brief, landed 08:45): its §3.16 "The dry run's bends" renders every
`bend.*` row of V9 §4.9 as the item's `bent` line, so the new `bend.aqueduct.onIsland` and the renamed
`bend.under.noAccess` reach the clerk with no change there, and it cites V9 §4.20.2 (5) for the uphill well as the bend
itself (SS-33); its CVR-V10-17 is applied here in the same pass — V9 §4.9's `refuse.clerk.<category>` family row and
T-V9-15 read "every `RefusalCategory` value but `lock` and `rule`" (SS-28's counterpart). One example in V10 §3.16 still
reads "Add a hoist instead" among the bends' alternatives, where under J-VI.4 (d) the access is the bend and **Draw a
road to its foot** its alternative (lane note to the next surfaces round). V08: XV-V9-26 (the gazetteer's `customChain` list). V05: XV-V9-25 (the rim move's geometry). The base record (file
f): item 277 applies BCR-V9-3 with `supplyChains` in the enumeration, and item 372's note takes BCR-V9-22's fourth step
(the bend above ground where no ground over the cluster is public). Split and merge of a way at T4 (V9 §4.3's "Split
here" and "Join these") were not touched: they are not `setAttr`, T-V9-12 admits a kind a volume registers under a tool,
and whether volume 10 encodes them the same way is for the next surfaces round to check (lane note).

## Reconciliation round 2, continuation (volumes/reconcile-V09-r2, second brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the seven seam issues that the continuation of `docs/volumes/critique/seam-surfaces-r1.md`
(its §7, SR-22 – SR-36, against the live text of 09:15) assigns to this volume. The lane's first brief (SR-06 – SR-16)
landed at 05:16 and is the "Reconciliation round 2" note above; this is a second brief under the same lane key. Every
issue is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SR-22 | major | V9 §2.8's `HistoryRow` gains `lines?` (derived sub-lines, each with Show when it has targets) and `dossierGroup?`; V9 §4.10's table gains the absorb head (`host.group.absorb` or `.absorbUndated`, `{n}` the ledger event's `changes` count, `{week}` its `absorbed` week; its lines the event's notes) and the creation head (`history.dossierFacts.creation`, "Made from SettlementForge's record"), and the dossier-event row takes its report entries as lines; a new paragraph *The dossier groups* sets membership (the port's `host:port` events after a ledger event: V08 §3.6 step 6 gives them no `group`, so the issue's "same group" is read as the session, J-V9.107), V08 §4.6's order, the head's toggle and Show, the filters (All and SettlementForge; Over time lists the epochs alone), the note lines' keys resolved by `query({ kind: 'entity', dossierKey })` at the effective key (new BCR-V9-36; J-V9.108) with a withheld target dropping the line, and the report-entry lines; V9 §4.9 gains `history.dossierFacts.creation`, `report.moved.<kind>` (one per `ReportEntry.kind`) and `report.dossier.<state>` (one per placement state), since the report's words had no rows (J-V9.109); V9 §5.7's report panel lists `GenerationReport.dossier` by those rows, then `GenerationReport.dossierNotes` under `host.group.standing`; V9 §6.3's line budget; §1b (two rows and a dossier-trace row), §2.12; T-V9-15 extended; T-V9-69 new (M-SF, AP5b) |
| SR-30 | major | V9 §4.9 gains `refuse.assignment.noSite` ("No plot here suits {thing} as it is assigned. The closest places are marked.") with **Put it at {site}** — the same declaration at the refusal's first `moveTo` target: an `assign` retargeted, or a `rejectSite` grouped with `placeAt` (J-V9.111) — and **Show me why**, its code the F-EDIT file f item 582 keeps; IN-V09-16's last sentence names it among the refusals that stay; T-V9-13 and T-V9-15 extended |
| SR-27 | minor | a way's `split` and `merge` homed on T9 in V9 §4.3; T4's modes drop **Split here** and **Join these**; T9's way controls gain them with the mapper (`split { id, cut: [p] }` at the nearest centre-line point by V10 §4.1's T9 rule, CVR-V10-18 (b); `merge { ids: [first, second] }`); J-V9.104 extended; T-V9-12 reads it |
| SR-29 | minor | T11's mapper states each scope's bytes — these: `ids`, `salt: 0`; this quarter: the quarter and every non-withheld gazetteer row of its district, read at `effectiveKey()` (V9 §2.7's band-less rule and volume 10's J-V10.95, not the role's key the issue named; J-V9.110), `ids` in address order; the town: the concern's current salt + 1 (`DisplayList.salts`), no `ids`, through the fates sheet; T12's **New emblem** and a new **New compass** control (V9 §4.19; the base's `style.compass` re-roll had none) write the concern's current salt + 1, as **New trees**; V9 §4.3's T12 row and AP4 follow; T-V9-12 extended |
| SR-34 | minor | XV-V9-24 and XV-V9-26 marked **Met** with V08's citations; V9 §12's two PLAUSIBLE clauses moved to CONFIRMED |
| SR-35 | minor | V9 §4.15 cites `EntityCard.anchor` (V10 §3.6 rule 1) without the list; V9 §5.4, §5.15 and §1b cite V08 §5.2's row without its legend rule; XV-V9-26 cites V08 §5.2 |
| SR-36 | minor | `bend.under.accessOpening` loses "Dig from a building instead" (its buttons **Show the way in** and **Show me why**); **Use another building** re-previews `[addUndergroundAccess { building }, the declaration]` from the next building of `PreviewResult.alternatives`, which BCR-V9-22 now has the dry run fill with the further qualifying buildings (at most three), the access's target set by BCR-V9-22's new grouped-access rule (J-V9.112); V9 §4.17.4, §1b; XV-V9-27 to volume 4; T-V9-38 extended |

**Other sides.** V08 (reconcile-V08-r2's second brief, running beside this one): its SR-23 (`GenerationReport.dossierNotes`
by BCR-V8-8), SR-24 (the effective key on note lines) and SR-25 (a chain hidden whole past the key) are present in its
live text and are what V9 §4.10, §5.4 and §5.7 now read; its X18 names exactly this lane's rows and can be marked met,
with one difference to note: the group is bounded by the port's session, not by `EditEvent.group` (J-V9.107). V10
(reconcile-V10-r2's second brief): CVR-V10-18 (a) – (c) are applied here (the this-quarter read at the effective key,
Split here's centre-line point cited from V10 §4.1, `ids` in address order); its §3.16 carries **Use another building**
as a `propose` with the events above, and `refuse.assignment.noSite` reaches it through its `rule` row with no change
there. The base record (file f): BCR-V9-36 is new (the `entity` input `dossierKey`), and BCR-V9-22 gains two sentences
(the dug-access alternatives and the grouped-access target); both need file f to carry them (lane note to the base
record's reconciler). Volume 4: XV-V9-27. Volume 6: XV-V9-28 — found beside SR-22: V08 §4.6 item 3 draws one
`info.raised.suppressed` line per raised-way reason that fired at a closed slot, which no V09 row carried; V9 §4.10's
`epoch` row now carries it as a line from `EpochReport.raised.suppressedFired` (J-V9.113; T-V9-69's variant).


## Reconciliation round 3, continuation (volumes/reconcile-V09-r3, second brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the four seam issues that the continuation of `docs/volumes/critique/seam-surfaces-r2.md`
(its §9, SR2-20 – SR2-29, against the live text of 10:02) assigns to this volume. The lane's first brief (SR2-01, SR2-02,
SR2-11, SR2-13 – SR2-15, SR2-18) landed at 06:25 and is the "Reconciliation round 3" note above; this is a second brief
under the same lane key. Every issue is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SR2-23 | major | V9 §2.2's `HostSlots.historyLines` reads `{ list(key: ViewState['knowledge']): HostHistoryLine[]; onChange(h): () => void }`, with the comment that the shell calls `list(effectiveKey())` each time it draws the group (so again on each `onChange` and each `onEffectiveKey`) and the provider names and targets only the places that key admits, keeping no View-as state of its own (J-V9.114); V9 §4.10's host-lines paragraph re-lists with `effectiveKey()` on each `onChange` and each `onEffectiveKey`; V9 §2.10's effective-key paragraph names the host's lines among its readers; V9 §2.12's lifecycle row and §1b's `HostSlots` and `ViewOpts.viewAs` rows follow; T-V9-28's host clause gains the View as re-list (a spy on `list`, a `local` place dropped under "What anyone knows" and restored, the same for "See what the players see"); XV-V9-29 (new) records SR2-24 (a)'s text in volume 8, **Met** in its live text |
| SR2-26 | minor | T12 gains **New decoration** — one `group` of `rerollLayer { concern: 'style.jitter', salt: current + 1 }` then `rerollLayer { concern: 'style.crowns', salt: current + 1 }`, in registry order, one undo step, display only (J-V9.115) — in V9 §3.7, §4.3's T12 row (kinds and gesture), §4.5's T12 row (modes and mapper), §5.7's Dress panel and a new §1b row; V9 §4.10's `rerollLayer` template gains "New decoration" (the group one row) and, found beside it, "New emblem" and "New compass"; T-V9-6 and T-V9-12 (the bytes, and every rerollable concern of §6.1's registry written by a control) extended; AP4 lists it. Volume 10's `restyle 'decoration'` (V10 §4.1's T12 row, J-V10.99) already writes the same bytes |
| SR2-27 | minor | V9 §4.10's report-entry lines and V9 §5.7's "What moved" and placement lists render their `{ id }` arguments under `effectiveKey()` by V9 §2.7's band-less rule — an `entity` read with that `admitAs`, a withheld address as its `kind.<registry kind>` word and left out of the targets, re-rendered on `onEffectiveKey`, never at the role's key (J-V9.116); V9 §2.9's `MsgRef` comment separates engine-built messages (the caller's key) from panel-built lines (the view's key); V9 §6.3's line budget counts the names' reads; §1b's two dossier rows; T-V9-69's View as clause gains the `secret` element named by its kind word |
| SR2-28 | minor | V9 §2.12's `HistoryRow` row reads its consumers as "the history panel, the context panel's History tab, `HostSlots.historyFilter` (V9 §1b)", matching §1b; the clerk reads no `HistoryRow` |

**Other sides.** V08 (its lane on the re-issued brief, running beside this one): SR2-24 (a) — V08 §3.1 step 7 (b)'s party
lines named at the key `list` is called with, the handler keeping no subscription — is in V08's live text (read 10:41,
with its per-key answer cache, J-V8.109), recorded as XV-V9-29 **Met**; V08's X20 is met by V9 §2.2, §4.10 and T-V9-28
as they now read. V10: SR2-25 (d) is already in its live text (`restyle.concern`'s closed
set with `'decoration'`, J-V10.99), and its §12 bullet on New decoration's bytes can move to CONFIRMED against V9 §4.5's
T12 row as it now reads. No base change request is added or changed.


## Reconciliation round 4, continuation (volumes/reconcile-V09-r4, second brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r4; covered by the whole-design retrovalidation (J84).

Reconciled in place against the one seam issue that the continuation of `docs/volumes/critique/seam-surfaces-r3.md` (its
§9, SR3-10 – SR3-15, against the live text of 11:06) assigns to this volume. The lane's first brief (SR3-01 – SR3-05)
landed at 07:35 and is the "Reconciliation round 4" note above; this is a second brief under the same lane key, run after
volume 4's (11:35) and volume 6's (11:39) lanes landed the mechanisms SR3-11 and SR3-10 ask for, as the issue's order of
work intends. The issue is fixed; it is not invalid; nothing is added to the fix list (V9 §13).

| issue | part | what changed |
|---|---|---|
| SR3-12 | (a) | XV-V9-23 **Met** (V6 §3.19.3 (7), V6 §2.12's suppression row, J-V6.116, V06's X39; landed 07:31); V9 §4.20.3 (4)'s sentence "**Pre-decided fallback** for the deck plot: … lifted only by Undo this." removed; the deck-plot row reads "(served by V6 §3.19.3 (7); XV-V9-23 met)"; J-V9.95's "with a pre-decided fallback" gains "(withdrawn: V6 §3.19.3 (7) serves the key; SR3-12)"; found beside: V9 §13's round-3 sentence on that fallback gains its withdrawal |
| SR3-12 | (b) | XV-V9-27 cites "V4 §3.8's *Voids and bans* exception for BCR-V9-22's grouped access, and the dwelling closure among U-DIG's callers (seam-surfaces-r3 SR3-11)" in place of "V4 §4.1's adoption of BCR-V9-22, XV-V9-4", and XV-V9-28 carries its status — both **Met** in their owners' landed text (V4 §3.8, J-V4.119/120, 11:35; V6 §2.10, §3.19.3 (2), J-V6.120, X44, 11:39), not **Open** as the issue wrote before those landings (J-V9.117); V9 §1b's dwelling-closure row reads "the access closure's pieces with the dwelling (BCR-V9-22), dug by V4 §3.8's U-DIG" |
| SR3-12 | (c) | BCR-V9-36's readers add "and by volume 8's embed bridge handler for the party lines' places (volume 8 §3.1 step 7 (b))", the reader file f item 583 names |
| SR3-12 | (d) | V9 §12 gains the round-4-continuation paragraph: file f's carriage of BCR-V9-36 and BCR-V9-22's two sentences (items 583, 372, landed 10:39), XV-V9-23, XV-V9-27 and XV-V9-28 CONFIRMED; the PLAUSIBLE clauses of round 3, of round 1's continuation (item 372's fourth step, found beside) and of round 2's continuation each note their move to CONFIRMED |
| SR3-12 | (e) | V9 §4.9's `bend.under.accessDug` row's buttons gain the list form "Dig down from {building} instead" (one alternative's label where a card shows every alternative at once, V10 §3.16; `{building}` at the card reader's key — the canvas at the role's key, J-V9.86, the clerk at its session key) beside the canvas's stepping "Use another building"; V9 §4.17.4's *The bends' alternatives* names it as the clerk card's label (J-V9.118) |

**Other sides.** Volume 10 (SR3-14 (b), its own lane): V10 §3.16's bends paragraph and J-V10.98 may now cite V9 §4.9's
`bend.under.accessDug` list form "Dig down from {building} instead" for each listed building's label in place of a label
joined from the button's text and a name. Volumes 4 and 6: nothing further is asked (XV-V9-27 and XV-V9-28 met). No base
change request is added or changed; BCR-V9-36's reader list now matches file f item 583's *Needed by*.

## Reconciliation round 5 (volumes/reconcile-V09-r5, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r5; covered by the whole-design retrovalidation (J84).

Reconciled in place against the one seam issue that `docs/volumes/critique/seam-surfaces-r4.md` (§3.2) assigns to this
volume: SR4-05 (minor), the companions of volume 10's SR4-01 – SR4-04 (the clerk's buttons: what each does, what it says,
who makes it) and six request statuses left behind. Volume 10's own lane (reconcile-V10-r5) ran beside this one, as the
issue's order of work intends; every V10 citation below was read in its live text and re-checked in its landed text (13:10,
md5 `c5aa04a6…`), which marks CVR-V10-19 **Met** on this volume's text. The issue is fixed in all four parts;
it is not invalid; nothing is added to the fix list (V9 §13).

| issue | part | what changed |
|---|---|---|
| SR4-05 | (a) | V9 §4.11's *Turns* bullet draws `action` "as V10 §5.4 words it — a button worded by its `label`, a `select` without one as its ids' chips (J-V10.100)"; *The actions* bullet is "each worded by its `label` (V10 §5.4; SR4-02)" and gains "`why` → the why card of its `id` (V9 §5.8), else the Help page `page` (V9 §5.9) — what the canvas's **Show me why** opens for that row (V9 §3.3, §4.9; SR4-01)"; V9 §2.10's `run` comment lists `why` among the application's kinds, seven in all; T-V9-27's dispatch clause reads "the seven the application runs" and adds the `why`, labelled-`select` and chips cases. Found beside: the *Refusals* bullet, the proposal card's **Undo** and **Put it back**, the help route's closing `useTool` (`clerk.alt.help.useTool`) and V9 §3.12's **Fix** (`clerk.alt.critique.fix`) are worded by their labels |
| SR4-05 | (b) | V9 §4.9's table of volume 10's families gains `clerk.alt.*` (V10 §3.16's alternatives column, `clerk.alt.<category>.<n>`, and the harness buttons V10 §2.6's `label` comment names), `clerk.view.cleared` (V10 §3.12 (6)) and `clerk.applied` (V10 §4.4); the `refuse.clerk.<category>` row reads "every value but `lock`, `rule` and `role`", `role`'s card rendering `refuse.viewer`; T-V9-15 covers the three new families and the `role` exception; V9 §1b's `messages/en.json` row loads from V10 §3.11, §3.12, §3.13 and §4.4 too and names the button words among its readers |
| SR4-05 | (c) | V9 §4.11's stale quotation reads "shows `refuse.stale` with **Ask again** (V10 §3.11; V10 §2.6: its `retry`, worded `clerk.alt.stale.retry`)"; V9 §2.10's and §4.11's "Applied — Undo" cite `clerk.applied` (V10 §4.4). Found beside (J-V9.119): the card-only drawer's moved town shows `refuse.stale` without **Ask again** (V10 §2.6's host card offers no `retry`); V9 §2.10's viewer sentence and §4.11's *Knowledge and roles* name `refuse.viewer`, and the latter draws `clerk.view.cleared` when the effective key changes (V10 §3.12 (6)); T-V9-27 checks each |
| SR4-05 | (d) | XV-V9-7, -10, -11, -12, -17 and -18 are marked **Met** with their citations (XV-V9-12's raised-way reading cites `RaisedOutcome`'s reason key and IN-V10-2's `raised[].reason`, the fields V10 holds, J-V9.119); V9 §12's second-round clause keeps PLAUSIBLE only XV-V9-13 – XV-V9-16 and notes XV-V9-10 – XV-V9-12 met; round 1's "that V08 and V10 adopt XV-V9-17 and XV-V9-18 as stated" and the revision's clause for XV-V9-7 move to CONFIRMED; V9 §12 gains the round-5 paragraph |
| CVR-V10-19 | (b), (c) | Found beside, volume 10's companion request of its round-5 lane (its parts (a) and (d) are SR4-05 (a) and (c) above): V9 §4.9's opening rule for **Show me why** reads "the target chosen by V10 §3.5 step 3's *The why target*, one rule for this button and the clerk's `why` action, cited, not restated" (J-V9.120); the `refuse.clerk.<category>` family row names `refuse.clerk.dossier.count` (V10 §3.16's `dossier` row, J-V10.104), and T-V9-15 covers it |

**Other sides.** Volume 10 (SR4-01 – SR4-04, its own lane): V09 now draws what V10 §2.6 and §5.4 define — the `why` kind
run by the application, every label, the unlabelled `select` as chips, the stale card's **Ask again** and the two new
drawer lines — and CVR-V10-19 (a) – (d) is met in this text, so volume 10 needs no further V09 text. Volume 8: nothing is asked (XV-V9-17 met). No base change request
is added or changed; J-V9.119 is new.

## Reconciliation round 6 (volumes/reconcile-V09-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r6; covered by the whole-design retrovalidation (J84).

Reconciled in place against the three seam issues that `docs/volumes/critique/seam-surfaces-r5.md` (§3) assigns to this
volume: SR5-01 (major; a row's buttons were prose and the type held one), SR5-04 (major; V9 §3.9 disabled a copy that
volume 6 bends) and SR5-07 (minor; the companions of SR5-01 and SR5-02, a pointer, the why page's id and a status).
Volume 10's own lane (reconcile-V10-r6) ran beside this one, as the issue's order of work intends; its live text was read
for every citation below. All three issues are fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | part | what changed |
|---|---|---|
| SR5-01 | (a) | V9 §2.9's `MsgRow.action?` is replaced by `buttons?: MsgButton[]`, with `ButtonClass`, `MsgButton` (`key`, `does`, `from`, `page`, `arg`, `tool`, `mode`, `subject` as asked, and `each`, `event`, `command`, `when`), `ButtonEventId` and `AppCommand`; a new paragraph *The buttons as data* states the words, what each class does on the canvas, where a button is not drawn, the arguments a button reads, the clerk's reading and the locale rule (J-V9.121) |
| SR5-01 | (b) | V9 §4.9's button column is each row's list with its keys (110 rows re-written by script, 48 without buttons); its opening states the notation and makes "at the least **Show me why**" data — every `refuse.*` row ends with `button.showWhy` (`refuse.stale` gains it, and `refuse.undo.dossier`'s moves to last; J-V9.123); new *The `button.*` rows* (67 wordings), *The event forms* (21) and *The application commands* (24); a `ConflictAction`'s `msg` is keyed as its button; V9 §3.3's refusal sentence cites the list |
| SR5-01 | (c) | **Keep {building}** and **Keep a way open** `drop`; **Change the stairs** `tool` `shape`/`tiers` and **Change the building's shape** `shape`/`massing`, both with `subject`; **Show a different name** and **… on this map** `tool` `name`/`rename` with `subject` `[names]`; **Choose another of the marked places** `commit` from `alternatives` (each `button.putAt`); the element picker `commit` from `unplaced`; **Make this town a city** and **Rebuild from {stage}** `commit` from `event`; **Add a way down** `tool` `place`/`access`; **Move it** `show`; application-only buttons `app`. Found beside and fixed: `bend.place.noSite`'s codes cell reads `PreviewResult.alternatives` (file f item 582); `bend.capacity`'s "Show larger buildings nearby" and `success.saved`'s "Show" had no source and are withdrawn (J-V9.123) |
| SR5-01 | (d) | T-V9-15 checks the lists, the `button.*` keys, every `tool` button's `ToolId` and mode in `toolkit.json`, every `event` and `command`, `button.showWhy` on every `refuse.*` row, no `app` button on a row a dry run answers, and each `ConflictAction`'s `msg.key`; T-V9-27 compares the drawer's and the canvas's buttons for T-V9-13's fixture rows, both read from the lists (T-V10-4 is volume 10's); T-V9-13 checks the arguments the buttons read and each `commit`'s events; V9 §1b gains the buttons' row; V9 §2.12's lifecycle row names them |
| SR5-04 | — | V9 §3.9's sentence reads "Before a rebase point both take the earliest seq they can, with volume 6's line (V6 §3.15.5; J-V6.98)", and a new bullet *Before a rebase point* applies it to the history and chronicle rows, the restore points and the drawer's `fork` and `rerun`, detected from the copy's `forkedFrom.seq` (J-V9.122); V9 §4.9 gains `info.copy.condensed`, its text V6 §3.15.5's line loaded from there, shown in the new document's opening toast; V9 §4.11's `fork` and `rerun` bullet cites it; V9 §2.9's paragraph and §1b load it; T-V9-15 covers it; T-V9-27 forks and re-runs from drawer blocks below `base.seq` |
| SR5-07 | (a) | V9 §4.11's `useTool` bullet reads "that tool active in the action's `mode` (else as last used) on that mode's working layer (V9 §4.2), its `ids` selected first"; V9 §4.5 states the mode ids (J-V9.124), and its T6 row names the Below access mode `access`, which `bend.under.noAccess`'s and `info.under.sealed`'s **Add a way down** open |
| SR5-07 | (b) | V9 §4.9's `clerk.alt.*` row and T-V9-15 read "each key V10 §5.4's list of the drawer's keys names" (`clerk.alt.stale.retry` among them) |
| SR5-07 | (c) | V9 §5.15's catalogue row states the page forms — `messages#<key>` for a row, `staged/<layerId>` for a staged layer, generated by `@plat/docs` — and V9 §1b's messages row names the per-row anchors; T-V9-32 covers every row whose **Show me why** resolves to a page and every staged layer's page (J-V9.124) |
| SR5-07 | (d) | XV-V9-8's V10 part is marked **Met** on V10 §8's total naming AP8 (reconcile-V10-r6); its V04, V05 and V02 parts are unchanged |

**Other sides.** Volume 10 (SR5-02, SR5-03, SR5-05, SR5-06, its own lane): V10 §3.5 step 3 reads this volume's lists by
`does` and V10 §2.6's `useTool` carries `mode` and `ids`; what this volume adds to SR5-01's interface is asked of it as
XV-V9-30 (the `event` forms, `each`, the list sources of `show`, `when`, `app` never on its cards, the `access` mode id,
the stale card's **Show me why**), which V10's landed text (14:21, md5 `f7d96daf…`) meets but for (g); (g) was applied
here as a logged shared-file edit of V10 §3.11 and §3.17 with a dated addendum at V10's end (V10 had no lane open; md5
now `c78aac11…`), so XV-V9-30 is **Met**; V10 marks CVR-V10-20 **Met** on this text.
Volume 11 (SR5-08, its own lane): row 87's sources include `info.copy.condensed` from V6 §3.15.5 in V11's live text,
as V9 §1b states; the locale rule of *The buttons as data* is asked of its row type as XV-V9-31. Volume 6 (SR5-09):
landed; its what-if sentence is read, not cited here. No base change request is added or changed; J-V9.121 – J-V9.124,
XV-V9-30 and XV-V9-31 are new.

## Finalization (volumes/_finalize, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

The finalization fixed, in place, **SR6-03** (seam-settlements-r6, major): V9 §4.16 (3)'s roster reader, and T6's stamp palette, match only the classes the document's rung admits — at a base rung the town-and-city, sky and generic rows; at a village rung the `v.` rows, the self-playing town-and-city rows and the generic rows, a row with a `villageForm` answering through its `v.` row — ties by `commonness` inside that set, a `v.` row first at a village rung. New test **T-V9-70** (the roster reader's namespaces) and decision **J-V9.125**. Volume 11's companion (SR6-09 (b)) is applied in V11. Volume 10's clerk card now carries bend and refusal actions (V10 §2.6, SR6-01); this volume's drawer draws them from `ProposalView.variations[].bends[].actions`, `lines[].actions` and `TurnView.refused` — its own companion wording (seam-surfaces-r6 SR6-06 (d)) is on the fix list with SR6-02, SR6-03 and SCC-115 (docs/volumes/INDEX.md §7). **CONFIRMED** by execution: both edits asserted one match each; T-V9-70 inserted after T-V9-69 and J-V9.125 after J-V9.124.
