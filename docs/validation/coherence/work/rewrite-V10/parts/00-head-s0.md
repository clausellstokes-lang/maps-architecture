# Design volume 10 — The AI clerk: reading, explaining, authoring and critiquing through the tool vocabulary

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V10-clerk; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`, with files
f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth: the built-in
clerk of item 101 (d), staged at M3c (*Staged by the owner's roadmap*, §16), together with the parts of the tool API the
base names — the oracle's answer, the reader's map brief, the solver's explanation — and the host clerk seam. The
implementer holds the base and this volume and nothing else (§17.1). Every fact the base or another volume states is
cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n`
is a design volume's section, this one included (`V10 §3.9`); `item n` is an amendment item — items 1–113 the owner's
(102–113 file g's), items 200 and above file f's, each the applied text of a volume's base change request (V10 §10 lists
this volume's, BCR-V10-n → its item); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited
and never restated; `DRn` a §7.7 derivation row. Decisions are `J-V10.n` (V10 §9), tests `T-V10-n` (V10 §7), requests
to sibling volumes `CVR-V10-n` (V10 §10.2). A bare `T1`–`T12` is item 101's tool, written with its word at first use in a
paragraph (T8 `fill`); a toolkit layer is written with its word (the INTENT layer); a bare `L0`–`L4` is a refinement
level (§2.2).

## 0 In plain words

**What it is.** The assistant — labelled "Assistant (AI)" in the program; this design calls it the clerk — is an optional
helper in a drawer beside the map. You talk to it in ordinary words. It does four things, and only these: it **reads**
the map and answers questions about it; it **explains** why anything is where it is ("why is the tannery down by the
river?" — "because tanneries are pulled downstream and away from houses, and this was the best plot that met those
rules; these two other plots came close"); it **builds** — you describe a town ("a walled harbour town on a hill with a
temple quarter") or paste a list of places, and it turns your words into the same twelve tools a person uses with the
mouse; and it **checks** a plan before you commit to it ("your temple quarter has no temple in it yet; your harbour
quarter has no quay").

**How it feels.** Nothing the assistant does changes your map by itself. Every suggestion arrives as a faint overlay —
the ghost you also see while drawing — with one short line saying what it did and why, the number of plots, households
and buildings it would make, anything it would move and, where the rules offer real alternatives, up to three versions
to flip between. You accept, ask it to try again, or drop it. An accepted suggestion is one step of undo, like any
gesture. You can keep talking ("make the lower city denser", "move the temples nearer the citadel"); each reply is
another suggestion. Where a rule says no — the thing is fixed by SettlementForge, or you locked it — the assistant says
so in plain words and offers the nearest things it *can* do, as buttons.

**Terraces, arches and removals.** Ask for "a viaduct over the ravine", "bring water from the northern spring on
arches", "terrace the south slope", "a fort at the head of the mole" or "give the temple five stepped tiers", and the
assistant proposes exactly that, as the canvas's own tools would draw it. A city may already have raised some of these
itself — a viaduct where a road meets a deep gorge, an aqueduct where the wells run short — and the assistant says why
("it crosses the gorge, a 34 m drop") and, asked "why is there no viaduct here?", answers that too ("a town builds them
only once it is a city; you may draw one"). Ask it to remove one and, before anything happens, it shows everything the
removal would change ("the road goes round by the lower bridge; the fountain on the square loses its water"); once you
accept, the town never builds it back, and "put it back" returns it. It never adds a raised way, a terrace or a retaining
wall, and never removes anything, unless you asked.

**Water and the past.** In a dry land it says why the town hugs its water ("water is scarce here: the houses crowd to
the spring, and the wealthy hold the land nearest it"; "the town grew around its oasis") and why a quarter far from the
water is poor. Where the map was generated from the settlement's history it tells that story from the record the history
left ("the walls were built when this was a city of twelve thousand"; "the lanes past the church follow the streets of
the old city"); where only the ruins show that the place was once greater, it says so and adds "its exact size is not
recorded". It explains ruins buried under the town and a cellar or cave nobody can reach any more ("once known, its way
in closed").

**What it never does.** It never draws a picture — it writes only the declarations the tools make, so everything it
proposes can be moved, reshaped or given a New random afterwards, and every export says which parts you drew, which the rules
derived and which the assistant proposed. It never makes up facts about your SettlementForge settlement: what the dossier
says is fixed, and the assistant can place what the dossier lists but never add to it, remove or rename it. It never
tells you something your view is not allowed to know: a player's assistant sees the town as the player does, so a secret
guild's name never reaches it, and a hidden function behind a shop front does not exist for it at all.

**What it knows, and what it keeps back.** To a player's assistant a hidden house is just "a building": it is never told
what kind of place it is, let alone its name. Caves and ruins under the town that nobody living there has found do not
exist for a player's assistant; the game master's assistant sees them and says plainly that nobody in town has found
them yet. When the owner looks at the town as a player would (the **View as** menu), the assistant sees and says only
what that player would. Explaining the underground, it says how each way down came about ("the smith's cellar broke
into the cave"), why nobody lives in a sealed cave (there is no way in), why a church has a crypt — the cathedral always
has one, the largest in town — while the catacombs lie under the cemeteries, and why an old catacomb stopped growing
and now fills its ossuaries with old bones instead. It answers history questions ("when did the north wall come down?",
"what stood here a hundred years ago?") and measures distances ("about 340 m by street"). Whatever it says about a
SettlementForge place — a date, a count, a name — must be something the map told it; anything else is shown greyed out
as "not found on the map", never as fact. Ask for "a village" and, once the village product is installed, you get a
village, not a small town.

**Turning it on, and what it costs.** In SettlementForge the assistant is SettlementForge's own, driving the map's tools
through the same doors a person's clicks use; which AI service it runs on, which model and how it is paid for are
SettlementForge's settings, not the map's. The map's own built-in assistant is for the standalone program and for hosts
that switch it on: it is off until you open it, labelled as AI everywhere it appears, and it reaches the AI service
named by the program's AI settings — with your own key (it stays on your machine) or through the connection the
embedding program provides. A question costs a few cents and a building request some tens of cents; you set a monthly
limit and the drawer shows what you have spent. Its settings — which model, what it may spend — belong to your device: a
map someone shares with you can never change them. Without any assistant — offline, no key, or simply switched off —
every tool and every feature of the map works exactly the same; the assistant only ever drives the tools you already
have.

**What leaves your machine.** Your messages, and a written description of the map filtered to what your view may know —
district names, landmarks, roads and walls in words and compass bearings. Never the map file, never an image, never a
secret your view does not hold, never your key to anyone but the AI service your settings name (or the host you chose).
Conversations stay in memory unless you ask the program to keep them; the changes you accepted live in the map's own
history, as every edit does.
