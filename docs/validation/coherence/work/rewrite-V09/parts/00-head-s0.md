# Design volume 9 — The application: the map editor a casual user opens, and the authoring toolkit as screens and flows

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V9-application, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the application — the shell, its screens and flows,
the twelve tools as screens, the message catalogue and the clerk's drawer — that the base (`docs/ARCHITECTURE.md`, with
files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) names as `@plat/app` (§14).
The implementer holds the base and the twelve volumes and nothing else (§17.1). Every fact the base or another volume
states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's;
`Vnn §n` is a design volume's section, this one included (`V09 §4.9`); `item n` is an amendment item — items 1–113 the
owner's (102–113 file g's), items 200 and above file f's, each the applied text of a volume's base change request (V09
§10 lists this volume's, BCR-V9-n → its item); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`),
cited and never restated; `DRn` a §7.7 derivation row; a toolkit layer is written with its word (L0 INTENT), a bare
L0–L4 being a refinement level (§2.2); a tool is written with its word at first use (T8 `fill`), a base bar group with its
number (T8-1). Decisions are J-V9.n (V09 §9), bars T-V9-n (V09 §7), cross-volume requests XV-V9-n (V09 §10.2); the row ids
W, H and IN are this volume's own. Every word the application shows a user is quoted in "double quotes"; each is a row of
the message catalogue (V09 §2.9) — data, not code. Nothing here is taken from a reference program's code, word lists,
palettes or screens: the reference generators' and the surveyed tools' behaviour enters only as described behaviour,
cited by file and section (`research/ux/tool-survey.md`, `research/findings/visual-spec.md`), and the application's
colours, words and layout are our own (§17.1).

## 0 In plain words

**What a person sees when they open it.** A finished town, already drawn, filling the screen — never a blank page or a
form. One quiet line sits over it: "Change anything: click it." A small strip along the bottom offers six other towns to
try, and a dice button makes a completely new one. Everything else waits until it is wanted.

**How changing it feels.** Down the left side is a short column of tools, grouped the way a town is thought about: what
kind of place it is (its site, size, wealth, walls and — if you wish — its past), its ground and bones (hills, rivers
and springs, walls, roads, quarters), what is in it (named places, a pasted list of places), its fabric (denser here, a
garden there, this house shaped just so, this corner kept) and its finish (names and the look). At first only four tools
show — change the town's kind, paint a quarter, drop a place, dress the map — and the rest appear the moment they are
useful. Whatever you do with a tool, you see the result before it happens: a pale "ghost" of the new quarter, road, wall
or house appears under your hand within about a fifth of a second, with a little badge that says how many plots,
households and buildings it will hold, and handles you can drag. Nothing is final until you let go or press accept, and
even then one press of undo takes it back. If what you ask cannot be done exactly, the program does the nearest thing it
can and says so in one plain sentence ("The wall follows the ridge; it was 40 m off your line"), with the other lawful
options one click away. It holds back only where it honestly cannot do what you ask: a fact a SettlementForge record
fixes, something you locked, a change another person's later work depends on, or a drawing tool on a screen too small
for it. Even then it says why in one sentence and offers at least one thing it can do instead.

**Your work is never lost.** Every change is saved the moment you make it — inside SettlementForge by SettlementForge's
own saving, and in the standalone editor on your own computer, with no account and no internet needed. A history panel
lists every change in plain words ("Painted the Tanners' quarter", "Moved the north gate") with its time; you can step
back to any point, name a point to come back to, or open a copy of the town as it was. Things you declared — a quarter
you painted, a tavern you placed, a wall you drew — stay put: when you ask for "a different version of this block" or
"new trees", everything you made is kept and only the rest changes, and the program shows you three versions side by
side to choose from.

**Seeing why.** Click any building and ask "Why here?": the program lists what pulled it there — the market it sells
to, the mill that supplies it, the river it needs, the garrison a thieves' den keeps away from, the morning shade of a
floating island, the water a desert town crowds around — and shows the other sites it considered. A "shade" view paints
how much of the day each street lies in shadow, and a "supply" view draws the lines between each workshop and the places
it buys from and sells to; you can pin, redirect or cut any of those lines, and the town keeps your choice from then on.
Every view that tells things apart by colour also tells them apart by a pattern, a line or a label, and the settings
offer a checked version of each map for the three common kinds of colour blindness.

**Water in dry country.** In a desert the ground tool can add an oasis — a spring-fed pool with its grove and watered
gardens — or remove one; the town leans toward its water, and the richest houses hold the ground nearest it.

**A town with a past.** A town can be made as what is left of something bigger: choose "once a city" and the program
builds the city first, lets its history run down to today, and leaves the walls far beyond the houses, the church too
big for its parish and the old streets as field tracks. The history panel's story and the town's cards tell what the
past left.

**Below the streets.** The underground has its own layer: sewers, catacombs, caves, old quarries and the ruins of an
older town that stood here before. Some caves and ruins lie sealed, and nobody in town knows of them; the game master
alone can switch on "Show hidden caves and ruins" and see them drawn faint and dashed, while a player's view never shows
them. A place whose last way in was closed is "lost": it stays remembered, drawn faded, until someone finds a way back.
Click any way down and it says how it came about ("The Old Mill dug a way down when it was built", "A sinkhole opens
here", "The sewer broke into it in year 40") and can light up the whole path in from the street. People only live
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

**The assistant.** Inside SettlementForge, SettlementForge's own assistant works the map through the same tools a person
uses, under SettlementForge's own AI settings (J121). In the standalone editor, and wherever a deployment turns it on,
an optional built-in assistant, clearly labelled as AI and off until you open it, can take a sentence like "a walled
harbour town with a temple quarter" and propose it as ghosts you accept or refuse, answer "why is this here?", and check a
plan for mistakes. It never draws pictures and never changes anything by itself. The first time, it says in plain words
what it sends and to whom; where that deployment uses the person's own key to the AI service, it asks for the key before
anything leaves the computer, every answer shows what it cost, and it stops at the monthly limit set. (How it thinks is
volume 10's subject; this volume is its drawer on the screen.)

**How we will know it works.** Before each editing milestone closes, five SettlementForge users who have never seen it
get a finished town and must, without help and within five minutes, paint a named quarter, put a named place near a
landmark, restyle the map and add a compass, and re-roll part of the town while keeping what they made. The owner does
the same tasks at a recorded sitting. A known-city test builds a whole original city with the structure of a famous
fantasy map three ways — typed as a file, drawn by hand in the editor, and dictated to the assistant. The file and the
hand-drawn town must come out identical, and the assistant's version must have the same structure. A second known city —
a port on a headland with terraced quarters, a harbour mole with its towers and a raised road — is built the same ways.
Before the public release, ten to twenty SettlementForge game masters use the map on their own settlements for at least
two sessions of play, and their report must exist before release (V09 §7.2, V09 §7.3, V09 §7.6).

