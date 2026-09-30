# Design volume 8 — The SettlementForge stage: connecting the map to the host end to end

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V8-settlementforge, its revision, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the owner-staged SettlementForge stage the base
(`docs/ARCHITECTURE.md`, with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`)
carries at hook depth — the port's creation half (M1), its absorb half (M3a), the dossier contract (§7.7), the bridge
(§11.3) and the fixtures (§13.2). The implementer holds the base and this volume and nothing else (§17.1). Every fact
the base or another volume states is cited, never restated; every new fact is stated once, here. **Citations:** a bare
`§n` or `II.n` is the base's; `Vnn §n` is a design volume's section, this one included (`V08 §3.5`); `item n` is an
amendment item — items 1–113 the owner's (102–113 file g's), items 200 and above file f's, each the applied text of a
volume's base change request (V08 §10 lists this volume's, BCR-V8-n → its item); `J-VI.n` is a volumes-integration
decision (`docs/volumes/_integrate.md`), cited and never restated; `DRn` a §7.7 derivation row; `Fn` a §7.7 receipt row.
Decisions are `J-V8.n` (V08 §9), tests `T-V8-n` (V08 §7), the wiring rows `W1`… of V08 §1b (another unit cites them as
`V08 W12`). SettlementForge (SF) field names and values are quoted freely — the owner's own project (amendments d, gate
2); no SettlementForge code is excerpted and nothing from its map programs or map designs is used.

## 0 In plain words

**What this stage does.** SettlementForge gets a Map tab on every settlement's page. The first time anyone with the
game master's rights opens it, the map is drawn from the settlement's dossier: every institution the dossier lists
stands somewhere sensible, the population fills the right number of houses, the walls, gates, harbour and quarters
match what the dossier says, and everything the dossier does not say — every street, plot and house — is worked out by
the map's own rules from the same seed. The map never writes anything back into the dossier.

**The settlement's past.** SettlementForge gives every settlement an age and a history — its founding, fires, floods,
plagues and occupations, and in a campaign its rises and falls in tier and population, its calamities, even its death
and resettlement. The map reads all of it: a place that was once a city and is now a village is generated as that city
and aged to the village, so its old walls, too-large church and empty streets are still there; where SettlementForge
never recorded how big the place once was, the map uses the higher tier the record shows as a symbolic size and says so.

**When SettlementForge changes.** A DM event, a decree, a week, a season or a year of simulation all produce a new
dossier. The map does not re-draw the town: it compares the new dossier with the facts it already carries, works out
what changed (a tannery closed, a cathedral was ruined by a storm, the population fell by a fifth, the town grew poor),
reads the week of each change from the dossier's own receipts, and changes the existing town as little as it can — the
layout players know stays, and only what must move moves. The map's history panel says what moved and why, in
SettlementForge's own words ("bankrupt", "destroyed by disaster"). A later rewrite of what the dossier says about the
ground or the settlement's past is reported, and the DM decides whether to regenerate. After the DM advances time, the
maps of the campaign's settlements catch up one by one in the background; a map opened before its turn catches up at
once.

**Your own content.** Institutions and supply chains a DM invents in SettlementForge's homebrew library arrive in the
dossier like the built-in ones. The map reads what SettlementForge records for each — its scene type (a mill, a forge,
an inn…), its category and tags, and, when SettlementForge hands it over, the fuller library entry — and places it where
such a thing belongs. A supply chain SettlementForge reports as active is laid out as one working line: the raw material
at its field or quarry, the workshops stepping inward, the seller near the market. Renaming a custom item in
SettlementForge changes nothing on the map; revising it moves it only as far as the revision requires.

**What the record says about the town's institutions and the ground beneath it.** A record such as "Blacksmiths (3-10)"
is drawn as several smithies, a guild as its hall with its workshops, a "district" as a quarter — never twice when
SettlementForge also lists the smaller form. SettlementForge's own supply chains tie their mills, bakeries and markets
together, and a weakened chain pulls less. A coastal town whose record names a war or a hostile sea partner walls its
quays. A storm the record reports leaves its damage where it struck. Ancient ruins, a magical node, ley lines or a
magical past in the record put an older town's ruins beneath the map; mines and mountains make caverns likelier.
Catacombs grow only under cemeteries — never under churches — and only from a town upward; the cathedral always has the
largest crypt; a cemetery the record closes stops its catacomb growing, and nothing is ever lost below.

**Water in dry country.** A desert settlement may still lie on a river, a lake or the coast when its record says so; a
record listing oasis water gets an oasis — a spring-fed pool with its grove and irrigated gardens — and the town crowds
around its water.

**Aqueducts, raised roads and toll bridges.** In a city (10 000 people or more) whose record lists its water system, the
map may carry an aqueduct on arches from a spring or river in reach to the city's conduit house, and a raised road may
link a citadel, a palace or a cathedral on high ground; a town gets these only if the DM draws them. They are the map's
own additions: the DM can remove any of them and it stays removed through every later update from SettlementForge, and
the history panel says why each was built. A toll bridge in the record gets a stream to cross, never a bridge over dry
land.

**Who sees what.** The DM sees and edits everything; a co-DM edits too. Players never receive the DM's map file or
SettlementForge's record: their Map tab shows pictures of the town as the party knows it — a place the party has not
learned is drawn but not named — redrawn after every change the DM saves and every place the DM reveals ("Reveal to the
party"; a "See what the players see" switch lets the DM check). Gallery and public pictures show only public names, with
any word SettlementForge veils on public pages veiled in the picture too. SettlementForge's AI assistant can read the map,
answer "where is the tannery and why is it there", and propose changes, which appear as ghosts the DM accepts or drops;
a player's assistant reads only the party's list of known places. A live shared map for the players is not part of
this stage (the owner's decision, J122).

**Where it lives.** The map program runs in its own frame on the web address SettlementForge gives it, as
SettlementForge's realm map already does, so none of its code runs beside SettlementForge's accounts or payments. Each
map is stored by SettlementForge next to its settlement — never inside the dossier — as a saved file plus the list of
changes since it was saved, with as many older copies kept as SettlementForge's own backup rule keeps; the map's
interface speaks the language SettlementForge is set to. From the live connection on, a DM's SettlementForge export
bundle can carry the map's scene files too.

**When something goes wrong.** An unreadable dossier, a SettlementForge version the map does not know yet, or a
settlement too large for the map never breaks the map: it shows the last good town with a plain note ("This map is held
as it was. The settlement's record could not be read."), loses nothing, and catches up as soon as a readable dossier
arrives. Small settlements are drawn by the village product, which is built before the live connection; a town that
shrinks into a village, or a village that grows into a town, keeps one map.

**How it feels.** Click the Map tab: the saved picture appears at once, the live map replaces it within about a second
for a town and two for a large city, and the history panel shows any changes it just caught up with. A player's tab
opens the party's pictures at once and pans and zooms them; before the DM has first opened the map it says so. Nothing
ever asks the DM to fill in a form; nothing in SettlementForge has to change to make a map.
