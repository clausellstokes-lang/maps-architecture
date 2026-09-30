# Design volume 10 — The AI clerk: reading, explaining, authoring and critiquing through the tool vocabulary

> PENDING FABLE REVIEW — written by opus standing in for the Fable seats of volume 10 (volumes/V10-clerk, its revision, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the built-in clerk of item 101 (d) and the parts of the
tool API the base names and this volume types — the oracle's answer, the reader kinds, the solver's explanation — and the
host clerk seam, over the base (`docs/ARCHITECTURE.md`, with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`,
`docs/AMENDMENTS-2026-09-28g.md`). The implementer holds the base and the volumes and nothing else (§17.1). Every fact the
base or another volume states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n`
or `II.n` is always the base's, also inside a list; `Vnn §n` is a design volume's section, this one included
(`V10 §3.9`), and every section of a list carries its own prefix (`V09 §2.9, V09 §4.9`); `item n` is an amendment item —
items 1–119 the owner's instructions and file g's rules, 200 and above file f's, each the applied text of a volume's base
change request (V10 §10.1 maps this volume's former request ids to them); `J-VI.n` is a volumes-integration decision
(`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V10.n` (V10 §9), tests `T-V10-n` (V10 §7),
cross-volume requests `CVR-V10-n` (V10 §10.2); the critique rows K1–K18 are this volume's (V10 §3.10); the wiring
tables of V10 §1b are this volume's own. **Names.** The twelve tools are item 101's T1–T12, written with their word at
first use in a paragraph (T8 `fill`); a base bar group always with its number (T101-1); the toolkit's layers always with
their word (L0 INTENT … L4 FINISH), a bare L0–L4 being a refinement level (§2.2). **Words.** Every sentence the clerk's
drawer shows is a row of V09's message catalogue (V09 §2.9, V09 §4.9) or of `clerk.content` (V10 §2.10); the English
quoted here is those rows' source text, and which locales ship follows SettlementForge (J121).

## 0 In plain words

**What it is.** The assistant — labelled "Assistant (AI)" in the program; this design calls it the clerk — is an
optional helper that lives in a drawer beside the map. You talk to it in ordinary words. It does four things, and only
these: it **reads** the map and answers questions about it; it **explains** why anything is where it is ("why is the
tannery down by the river?" — "because tanneries are pulled downstream and away from houses, and this was the best plot
that met those rules; these two other plots came close"); it **builds** — you describe a town ("a walled harbour town on a
hill with a temple quarter") or paste a list of places, and it turns your words into the same twelve tools a person uses
with the mouse; and it **checks** a plan before you commit to it ("your temple quarter has no temple in it yet; your
harbour quarter has no quay").

**How it feels.** Nothing the assistant does changes your map by itself. Every suggestion arrives as a faint overlay on the
map — the ghost you also see while drawing — with one short line saying what it did and why, the number of plots,
households and buildings it would make, anything it would move, and, where the rules offer real alternatives, up to
three versions to flip between. You accept, ask it to try again, or drop it. An accepted suggestion is one step of undo,
like any gesture. You can keep talking: "make the lower city denser", "move the temples nearer the citadel" — each reply
is another suggestion. Where a rule says no (the thing is fixed by SettlementForge, or you locked it), the assistant says so
in plain words and offers the nearest things it *can* do, as buttons.

**Terraces, arches and removals.** Ask for "a viaduct over the ravine", "bring water from the northern spring on
arches", "terrace the south slope", "a fort at the head of the mole" or "give the temple five stepped tiers", and the
assistant proposes exactly that, as the canvas's own tools would draw it. A city may already have raised some of these by
itself — a viaduct where a road meets a deep gorge, an aqueduct where the wells run short — and the assistant says why ("it
crosses the gorge, a 34 m drop") and, asked "why is there no viaduct here?", answers that too ("a town builds them only
once it is a city; you may draw one"). Ask it to remove one and, before anything happens, it shows everything the removal
would change — "the road goes round by the lower bridge; the fountain on the square loses its water" — and once you
accept, the town never builds it back; "put it back" returns it. It never adds a raised way, a terrace or a retaining
wall, and never removes anything, unless you asked.

**A place's story, and its look.** It tells how a town came to look as it does: why the old walls run far beyond the
houses ("the walls were built when this was a city of twelve thousand"), what a stretch of wall went through ("patched
with timber in the lean years; rebuilt in stone after the siege"), why a desert town crowds round its oasis and why the
richest houses hold the gardens by the water, and why a rich village's farmhouses are still plain ones. Where the map
shows that a place once stood higher but nobody recorded how high, it says exactly that ("the old walls show this was
once a city; its exact size is not recorded"). It explains the season and a festival as the look they are ("the millpond
is frozen: it is midwinter, and winters here are cold"; "the streets are hung for the Feast of the Lantern, weeks 20–21")
— neither ever changes the map.

**What it never does.** It never draws a picture — it only writes the same declarations the tools make, so everything it
proposes can be moved, reshaped and re-rolled afterwards, and every export says which parts you drew, which the rules
derived and which the assistant proposed. It never makes up facts about your SettlementForge settlement: what the dossier
says is fixed, and the assistant can place what the dossier lists but never add to it, remove or rename it. It never tells
you something your view is not allowed to know: a player's assistant sees the town as the player does, so a secret guild's
name never reaches it, and a hidden function behind a shop front does not exist for it at all.

**What it knows, and what it keeps back.** To a player's assistant a hidden house is just "a building": it is never told
what kind of place it is, let alone its name. Caves and ruins under the town that nobody living there has found do not
exist for a player's assistant at all; the game master's assistant sees them and says plainly that nobody in town has
found them yet. When the owner looks at the town as a player would (the **View as** menu), the assistant sees and says
only what that player would, too. Explaining the underground, it says how each way down came about ("the smith's cellar
broke into the cave"), why nobody lives in a sealed cave (there is no way in), why a church has a crypt — the cathedral
always has one, the largest in town — while the catacombs lie under the cemeteries, and why an old catacomb stopped
growing and now fills its ossuaries with old bones instead. It answers history questions ("when did the north wall come
down?", "what stood here a hundred years ago?") and measures distances ("about 340 m by street"). Whatever it says about a
SettlementForge place — a date, a count, a name — must be something the map told it; anything else is shown greyed out as
"not found on the map", never as fact. Ask for "a village" and, once the village product is installed, you get a village,
not a small town.

**Turning it on, and what it costs.** It is off until you open it, and it is labelled as AI everywhere it appears. Inside
SettlementForge the assistant is SettlementForge's own: it drives the map through these same tools, and its AI service,
model and key follow SettlementForge's AI setup (J121, J122). In the standalone program the built-in assistant runs over
the internet on the AI service the program's setup names, either with your own key for that service (it stays on your
machine) or through a connection a host provides. A question costs a few cents and a building request some tens of cents;
you set a monthly limit and the drawer shows what you have spent. The assistant's own settings — which model it uses,
what it may spend — belong to your device: a map someone shares with you can never change them. Without the assistant —
offline, no key, or simply switched off — every tool and every feature of the map works exactly the same; the assistant
only ever drives the tools you already have.

**What leaves your machine.** Your messages, and a written description of the map filtered to what your view may know —
district names, landmarks, roads and walls in words and compass bearings. Never the map file, never an image, never a
secret your view does not hold, never your key to anyone but the AI service your setup names (or the host you chose).
Conversations stay in memory unless you ask the program to keep them; the changes you accepted live in the map's own
history, as every edit does.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds (to build depth)

1. **The package `@plat/clerk`** (§14; item 518), in two entry points: `@plat/clerk/core` — everything that needs no
   language model: the map brief's text rendering, the spatial resolver (words and bearings to points), the twelve tools'
   encoders (tool inputs to §7.1's events), drafts and proposals, variations, the critique engine, the knowledge guard,
   the grounding check, transcripts and their skeleton projection, the usage meter and the settings; and
   `@plat/clerk/model` — the model backend (`ClerkBackend`), the request builder, the streaming turn loop and the
   system prompt, loaded lazily only when the clerk is switched on (J-V10.2).
2. **The model-facing tool set** — sixteen tools: the twelve declaration tools of §7.1's toolkit, each a typed input
   that encodes to that tool's events; `read_map` and `why` (the reader and the oracle); `check_draft` and `critique`
   (the dry run and the rules check). Their schemas are generated from `@plat/model`'s event schemas and `@plat/tables`'
   vocabularies, so the clerk can never emit an event the canvas cannot (J-V10.5).
3. **The oracle at depth** — the typed answer `WhyAnswer`, the per-kind explainers (`WhyProvider`) registered in §2.8's
   entity registry, the placement solver's read-only `explain` mode with its candidate mode, and the prosperity field's
   driver decomposition — what §11.2 names ("the rule, its inputs and the alternatives it weighed") and V10 §2.13 types
   (items 468, 311, 270, 297), with open **sections** so every volume's explainer can say what it knows and a generic
   provider for every other kind (item 270), and the placement's order index so a "why" reproduces the score the rules
   computed when they placed it (item 271). It serves the clerk, the application's why card (V09 §2.7) and any host clerk
   alike, and carries the explanations the owner's items assign here: item 102's daylight share, item 103 (e)'s rows that
   pulled, item 104 (a)'s resolution rung, item 105 (j)'s links and goods, item 106 (g)'s unwalled sides, item 107's
   spread-versus-pull balance, item 108's record members, item 109's ruins, ways down, sealed voids, catacombs and crypts
   (V10 §3.9a), item 110's raised ways with their recorded reasons, a removed thing's removal, retaining walls and deck
   plots (V10 §3.9), item 111's water pull and oasis, item 113's history story and symbolic peak, item 114's wall runs,
   item 115's ceiling, and item 117's seasons and item 118's festivals as looks (V10 §3.9b).
4. **Reader kinds** the clerk needs and §11.2's `Query` carries by item 468: `brief` (the whole map in words and
   bearings, filtered by the key), `entity` (one thing's attributes with their tiers), `sites` (the lawful candidate plots
   of a class near a point, from the solver's candidate mode), `measure` (a distance straight or by street), `frame` (what
   stood near a point at a week, from V06's frames), and `rule` and `profile` (V11's row explanation and compiled profile);
   and the clerk-side reads `chronicle` and `history` over V06's chronicle and the lifecycle block.
5. **Scratch documents** — a disposable copy of the live document (edit mode) or a fresh generation from a draft
   blueprint (creation mode), on which the clerk's declarations are tried before anything is proposed (item 469), and the
   key-filtered form of dry-run results with the addresses an event creates (item 470).
6. **The preview-first protocol** — how a turn becomes a proposal with up to three variations, how it is shown, accepted
   as one undo step, retried, dropped or found stale; and the apply-then-undo setting that §13.4's first-five-minutes
   test pre-decides as its fallback.
7. **Natural language to a skeleton draft and a roster**, iteration, critique rules, refusals and bends with
   alternatives, the "never invent a dossier fact" and knowledge-gating mechanisms, transcripts that replay as skeletons.
8. **The host clerk seam** — three configurations (the built-in clerk on a user's key, the built-in clerk through a host's
   proxy, the host's own clerk over the bridge — SettlementForge's configuration, J121, J122), the bridge messages that
   select them, the proposal card a host's own clerk gets in the map frame and the answer that tells it what the user
   chose, and the words-only projection of every reader answer that leaves the frame (item 473).
9. **Cost and latency budgets, offline behaviour, safety and privacy, and the evaluation set** with its graders, tiers
   and pass bars; the command-line clerk (`plat clerk`, `@plat/cli`, §14), built only if the browser cannot reach the
   provider (V10 §3.17, J-V10.24).
10. **The drawer's harness** — `createClerk(mount)`, this volume's implementation of V09 §2.10's `ClerkHandle` (it adds
    no member), which the drawer drives and which reaches a host's bridge only through `ClerkMount.host` (V10 §2.6).
11. **Item 110's calls** — the typed forms that declare retaining walls, terraces, islets, raised ways and aqueducts,
    deck slots, stepped tiers and span uses (V10 §2.12, V10 §4.1); the removal of any generated thing through T10
    `hold` (item 368); anchors inside raw events, so every geometric kind the escape hatch carries is callable without
    coordinates (J-V10.73); the effects a change has, shown and told before it applies (V10 §3.11); the rule that none of
    these is declared or removed unasked (V10 §3.3 rule 16); and the scripted tool-API transcript of the second
    known-city fixture (V10 §3.15).

### 1.2 The base hooks this volume consumes (cited, never restated)

| base section | what this volume uses |
|---|---|
| §7.1 | the event union and `EditBase` (`proposedBy`, `group`, `session`, `author`, `creation`), the points forms, `FieldStroke` with its flatten mode (item 366), the toolkit's twelve tools with the one event → tool binding table and the dry-run outcome table (bends and the two refusals), the sugar events and their expansion (the unnamed roster line, item 571) |
| §7.2 | declared means held (R13): what a clerk-proposed, user-accepted event declares is held like any declaration |
| §7.3 | §7.3 item 4 (fates and renames the user confirms), §7.3 item 9 (closures), §7.3 item 10 (New random and three variations) |
| §7.4 | undo and redo as events, groups as one undo step, per-session stacks, the independence check; every edit kind's lifecycle row |
| §7.7 | intent (layer 1) and its expansion; the precedence line; the dossier contract (one way, existence, rejection, positive placement, knowledge, two tiers, the derivation table DR1–DR35 and item 113's history rows from DR36) |
| §7.8 | the control registry's parameters that T1 `intend` adjusts |
| §2.8 | `factTier`, `Provenance` (its `symbolic` flag, item 113), `DerivationRecord` with the placement order index (item 271), `NamingRecord`, lifecycle events, the entity registry with its dossier paths, readable paths and explainers (item 270) |
| §2.7 | `Enceinte.condition` and each run's material (item 114); the raised ways' parts, `RetainingWall` and the deck plots (items 244–246) |
| §2.9 | view state: the year position and its follow flag (item 117), the festival display (item 118) |
| §4.2 S0, S1, §4.4, §4.5 | the oasis and spring features and the water pull (item 111); the prosperity field and its drivers with item 102's daylight term and item 111's water term and climate cell (item 297); item 72's character and identities |
| §4.3 | the raised ways' generation and `raisedOutcome` (item 290) |
| §4.7 S10b | the one placement solver, `PlacementRequest`, `PlacementResult`, closest options, the claims-first order and item 105 (f)'s anchors-first order with its relaxation pass, the read-only `explain` (item 311), the rung ceiling on the class mix (item 115); S11's designation |
| §4.11 | history-first generation: the peak, the replay, destruction and refounding, burial, the effective peak (item 113) |
| §5.2, §5.4 | F-EDIT and its actions; the generation report (`requested`, `dossier`, `changes`, `prefix`) |
| §8.2 | `live.ghost`, `live.selection`; the wall-state rows (item 114), the season rows (item 117), the festival rows (item 118) |
| §9.2 | the knowledge admission, the one function every reader cites (the clerk reads only through the reader under its viewer's key) |
| §9.5 | the count badge and the handles a ghost carries; a quarter's size step (item 348) |
| §11.1 | the skeleton file; authorship and tiers in every export (a clerk-made creation prefix keeps its authorship, item 365); inert exports |
| §11.2 | the facade (`generate`, `open`, `scratch`, `edit`, `preview`, `confirm`, `undo`, `query`, `report`, `subscribe`, `close`), `PreviewResult`, `ApplyResult`, the *Knowledge* rules and the oracle rules (1)–(4), `admitAs` (item 572), `filtered` (item 470), the reader kinds (items 468, 460, 583), the clerk's tool API paragraph (items 471, J-A101.83) |
| §11.3 | roles and knowledge keys and their authority, the bridge's `preview` message and `clerk.*` messages (item 473), convergence, logging |
| §11.4, §11.5 | host inputs (nothing asks the host for a fact); no hosted service |
| §12.3, §12.6, §12.8 | model, edit and preview budgets; memory lines, the clerk's scratch line (item 481) |
| §13.2, §13.4 | T101-1 – T101-9 (the clerk's path in the fixtures, item 487); the first-five-minutes test and its preview-first-clerk fallback |
| §14 | package layout and dependency rules (`@plat/clerk`, `@plat/cli`; items 518, J-A505.02); the authoring surfaces and the clerk paragraph (item 519); the interaction contract R1–R19; the clerk row of the tools table |
| §16 | M3a's tool API; M3c, the built-in clerk, beside M3b (item 531; J122) |
| §17.1, §17.4 | the clean-room chain; the provider's SDK as a production dependency (item 538) |
| items 101 (d), (f′) R10, R19; 63 (c); 20, 20 (h) | the clerk's four roles and its limits (preview-first, labelled, optional, never pixels); knowledge gating of concealed uses; the dossier as the only immutable truth |
| items 102–119 | the explanations listed in V10 §1.1 (3), their base mechanisms read at their homes; item 109 (j) (2)'s "the clerk says so" and (k) (J111); item 110 as revised ~23:40 |

| volume section | what this volume uses |
|---|---|
| V09 §2.7, V09 §2.9, V09 §2.10, V09 §3.9, V09 §4.3, V09 §4.5, V09 §4.8, V09 §4.9, V09 §4.11, V09 §4.20 | the why card's `WhyCardModel` (a projection of `WhyAnswer`); the message catalogue, `MsgRef`, `MsgRow.buttons` and its keys; `ClerkSlot`, `ClerkMount` (`effectiveKey`, `rebuildEvents(seq)`, `host`) and `ClerkHandle`, which this volume's harness implements (V10 §2.6); `forkAt` and `rerunFrom`, which the application runs for the `fork` and `rerun` actions; the tool screens and mode ids; the one-line `roster` a place by a locus emits; the drawer; item 110's canvas gestures and event shapes (items 362, 465, 466, 246) |
| V11 §2.4, V11 §3.3.1, V11 §3.11, V11 §4.2, V11 §4.5 | the derived-row ids and the families' `says`; the catalogue kinds of V10 §1b.5; the document-only tables `siting.declared` and `siting.linkEdits`; `explainRow` and `profile` |
| V01 §4.5, V02 §4.5, V02 §4.6, V03 §4.6, V04 §4.5, V05 §4.5, V06 §4.1, V06 §4.5, V07 §4.5 | each volume's explainers, registered as `WhyProvider`s or section providers (V10 §3.9's owed table), and its events reaching the clerk through the tool schemas generated from the registry (V10 §3.4) |
| V02 §3.16, V02 §4.6 | `DeckContext` and the deck budget, the `tiers` op and a tier's heights, the stepped specialisations, the registry paths `massing/stack` and `deck/landmarks/<head\|mid>` |
| V02 §3.14.5, V03 §2.1, V03 §3.7.4 | `Basement.crypt`, its rank (the principal crypt), the raised and rim forms and the wet-ground rule — read by V10 §3.9a |
| V04 §2.2, V04 §3.5, V04 §3.5.7, V04 §4.5, V04 §5.2 | `RuinRecord`, `CatacombComplex`, `AccessCause`, `LinkCause`, `reusedBy`, `excavation(cluster)`, the LOST state (item 113 (e)), the `secret`-only admission of an unexcavated element, `catacombOutcome`; item 110's arch vaults, a ruin's stepped monument, the terminal cistern, a void met by a footing — read, never written, by V10 §3.9a |
| V05 §3.20, V05 §4.2, V05 §4.5 | the daylight term's per-island `sources`; `skyRoute`, the landing a cross-arena pull goes through; the island bend lines |
| V06 §2.10, V06 §2.11, V06 §2.13, V06 §3.7, V06 §3.15, V06 §3.19, V06 §4.1, V06 §4.5 | `ChronicleEntry`, `LifecycleEvent.detail.why`, `RaisedWayLedger`, `RaisedReasonKey`, `RaisedCandidate`, the suppression `detail.suppress` (item 260), the walls' need and means (item 114), `locate(w)` and the frame builder, the shade masks' history, the replay record (item 113), the bend line of a standalone neighbourhood document's clock |
| V07 §2.1, V07 §2.7, V07 §4.5 | `LadderRouter.route`, `ProductDecl('village')`, the rung table, `VillageRequest` with its plan forms and field systems, the village `WhyProvider` |
| V08 §3.1, V08 §4.4, V08 §5.4 | the frame's content security policy (V10 §3.17's connect rule); SettlementForge's own assistant as a bridge client and the words-only projection of its reads (this volume designs the built-in clerk, the seam that chooses between the two, the host proposal card and the projection rows for its kinds) |
| V12 §2.6 | the calibration register entry a table cell carries (read by `RuleAnswer`, V10 §2.13) |

The runtime targets are the base's two, the browser and the Node command line (§2).

### 1.3 Out of scope, and whose it is

* **The drawer's screen** — its layout, animation, keyboard focus and the variation tray's look — is the application's
  (V09 §4.11). This volume supplies the drawer's view model (`TurnView`, `ProposalView`, V10 §2.6) and its events, and
  fixes every behaviour behind them.
* **SettlementForge's own assistant** — its session, rights and the projection of its reads to words — is
  V08 §4.4 and V08 §5.4; here only the seam that chooses it over the built-in clerk (V10 §3.17).
* **The rows the explanations cite** — every class's siting profile, supply edges, goods, balance, ladder step types,
  signature pairs, the wall defensibility rows, the patch materials, the ceiling, the season and festival tables — are
  the content volume's (V11); the oracle names them by their row ids.
* **Where the rules raise a way, level a terrace or plot a deck, patch a wall or replay a history** — the base's
  generation (items 110, 113, 114) and V06's epochs (V06 §3.7, V06 §3.19); the canvas gestures for them — V09 §4.20.
  The clerk declares, removes and explains them; it decides none of them.
* **Training or fine-tuning a model** — none; the clerk uses a general model through the provider's API.
* **Voice input** — dictation is the operating system's; the drawer takes text.
* **A hosted service of ours** — none (§11.5); the clerk reaches the model with a user's key or through a host.
* **Images of the map sent to the model** — none: the clerk reads words and structures only (J-V10.9).
* **AI-written notes on map objects** — declined: a place's prose is SettlementForge's (the dossier) and a map note or pin
  is V09's; the clerk writes declarations only (J-V10.69).
* **Choosing the AI service, model or key path** — none: they are the deployment's AI configuration, which
  SettlementForge's AI setup decides (J121); the built-in clerk ships one backend over the provider's SDK (V10 §2.11), and
  a host that wants another model fills the `ClerkBackend` seam itself or runs its own clerk (configuration C, which is
  SettlementForge's, J122) (J-V10.69).
* **A help assistant as a separate product** — not needed: "how do I …?" is a question the clerk answers from §14's tools
  table with a `useTool` action (V10 §3.1's help route, J-V10.69).
