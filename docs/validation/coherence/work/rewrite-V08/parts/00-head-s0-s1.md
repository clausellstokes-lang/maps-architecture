# Design volume 8 — The SettlementForge stage: connecting the map to the host end to end

> PENDING FABLE REVIEW — written by opus standing in for the Fable seats volumes/V8-settlementforge, its revisions, reconciliation and coherence lanes; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the SettlementForge stage the base (`docs/ARCHITECTURE.md`,
with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in
§7.7, §11.3, §11.4 and §14. The implementer holds the base and the volumes and nothing else (§17.1). Every fact the base or
another volume states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n`
is the base's; `Vnn §n` is a design volume's section, this one included (`V08 §3.5`); a list after a volume prefix stays in
that volume (`V09 §2.2, §4.10` is two sections of V09); `item n` is an amendment item — items 1–118 the owner's, items 200
and above file f's, each the applied text of a volume's base change request (V08 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V8.n` (V08 §9),
tests `T-V8-n` (V08 §7), the wiring rows `W1`… (V08 §1b; another volume's are written `V06 W27`). The twelve tools are item
101's T1–T12, written with their word at first use (T2 `ground`); a base bar group is written with its number (`T73-7`).
The derivation rows are §7.7's `DR1`–`DR40` by number. **Sources.** SettlementForge (SF) field names and values are quoted
freely — the owner's own project (amendments d, gate 2); no SettlementForge code is excerpted and nothing from its map
programs or map designs is used (§17.1). The pinned line is `fp-integration-2026-09-23` at commit `5d699cc68` (§14 item 1).

## 0 In plain words

**What this stage does.** SettlementForge gets a Map tab on every settlement's page. The first time anyone with the
game master's rights opens it, the map is drawn from the settlement's dossier: every institution the dossier lists
stands somewhere sensible, the population fills the right number of houses, the walls, gates, harbour and quarters
match what the dossier says, and everything the dossier does not say — every street, plot and house — is worked out by
the map's own rules from the same seed. The map never writes anything back into the dossier.

**When SettlementForge changes.** A DM event, a decree, a week, a season or a year of simulation all produce a new
dossier. The map does not re-draw the town: it compares the new dossier with the facts it already carries, works out
what changed (a tannery closed, a cathedral was ruined by a storm, the population fell by a fifth, the town grew
richer), reads the week of each change from the dossier's own receipts, and changes the existing town as little as it
can — the layout players know stays, and only what must move moves. The map's history panel says what moved and why, in
SettlementForge's own words ("bankrupt", "destroyed by disaster"). After the DM advances time, the maps of the campaign's
settlements catch up one by one in the background; a map opened before its turn catches up at once.

**Its past, its walls, its seasons and its feasts.** A settlement's history as SettlementForge records it — its age,
its great fires and floods, the tiers it rose and fell through, a destruction and a resettlement, ancient ruins under it
— shapes the map when it is first drawn: a village that was once a city keeps the old walls and streets of its greater
days. How well SettlementForge says the town is defended, and how rich it is, decides whether its walls stand whole or
show patched and broken stretches. A small place is never grand because it is rich unless the dossier names a grand
house. The map follows SettlementForge's calendar — frozen ponds in a cold winter, falling leaves in autumn — and dresses
the streets for a festival in the weeks SettlementForge schedules it. A desert town keeps any river, lake or coast its
record gives it, and has an oasis when its record lists one.

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
any word SettlementForge veils on public pages veiled in the picture too. SettlementForge's own AI assistant can read
the map, answer "where is the tannery and why is it there", and propose changes, which appear as ghosts the DM accepts
or drops; a player's assistant reads only the party's list of known places.

**Where it lives.** The map program runs in its own frame, as SettlementForge's realm map already does, so none of its
code runs beside SettlementForge's accounts or payments; which web address serves it, which plans carry the Map tab, how
many older copies are kept and the interface's language follow SettlementForge's own product decisions. Each map is
stored by SettlementForge next to its settlement — never inside the dossier — as a saved file plus the list of changes
since it was saved, with older copies kept as backups. SettlementForge's own export bundle can carry the map's scenes
for virtual tabletops once the connection is live, handed over as sealed files SettlementForge never reads.

**When something goes wrong.** An unreadable dossier, a SettlementForge version the map does not know yet, or a
settlement outside the sizes the map draws never breaks the map: it shows the last good town with a plain note ("This
map is held as it was. The settlement's record could not be read."), loses nothing, and catches up as soon as a readable
dossier arrives. Small settlements are drawn by the village product, which is built before the live connection; a town
that shrinks into a village, or a village that grows into a town, keeps one map.

**How it feels.** Click the Map tab: the saved picture appears at once, the live map replaces it within about a second
for a town and two for a large city, and the history panel shows any changes it just caught up with. A player's tab
opens the party's pictures at once and pans and zooms them; before the DM has first opened the map it says so. Nothing
ever asks the DM to fill in a form; nothing in SettlementForge has to change to make a map.

## 1 Scope, the base hooks consumed, and what is out of scope

**In scope — the base's staged SettlementForge row (*Staged by the owner's roadmap*, "SettlementForge inputs") brought
to build depth.** The base builds the port's creation half (M1), its absorb half (M3a), the dossier contract (§7.7
items 1–16), the bridge (§11.3) and the fixtures (§13.2). This volume designs everything the staged part needs so that a
live SettlementForge drives a map end to end:

1. **The embed** — the Map tab's lazy chunk on SettlementForge's side (a mount and our host client), the module's frame
   on its own origin, its boot, its workers, the first map from a stored thumbnail, and one frame reused across the
   settlements of a campaign (V08 §3.1).
2. **The dossier's journey** — how a whole dossier crosses the bridge (`dossier.offer`), who runs `creation` and
   `absorb` and who commits the result (the port leader: only an editing role ever holds the dossier or the document),
   coalescing of dossier versions, and the background refresh after an advance (V08 §3.2–§3.4). **The players' view** —
   the stored party picture set and party gazetteer, re-rendered after committed changes and reveals, and the party's
   knowledge recorded on the map record (V08 §3.14).
3. **The binding table in practice** — the life of every binding row, the carried facts per element kind, the diff
   rules that turn two dossiers into `DossierChange`s, collective members, quarantined records and the absorbed-state
   history (V08 §2.3, §3.5–§3.6).
4. **Persistence inside the host** — the map record SettlementForge stores beside the dossier, snapshot plus event tail,
   compaction, backups, thumbnails and the fingerprints the host compares (V08 §2.1, §3.7).
5. **Versions and migrations on both sides** — our schema, output, table and adapter versions against SettlementForge's
   `schemaVersion`, `generatorVersion`, `simulationVersion` and product lines; adapter selection, carried-fact remaps, a
   line change, and the upgrade flow inside the host (V08 §3.8).
6. **Failure and recovery** — a malformed or hostile dossier, an unknown line, another settlement's dossier, a lost or
   damaged document, a dead frame, a stale absorb (V08 §3.9).
7. **The village-tier hand-off** — the port's consultation of the one registration the village product makes (its
   `ProductDecl`, item 202), and one document across the 1 500 boundary (V08 §3.10).
8. **The staged records and values filled** (item 88) — `ConditionOverlay` (the conditions and the normalised
   stressors), `DepositSite`, `PowerRelation`, `HistoryHint`, the dossier-backed `Person`, and the per-settlement values
   the staged rows read (crime, food import, legitimacy, the site latitude, the sea threats, the defence readiness); the
   calamities carried into the epochs for V06's hazard phase; the realm block's supply (item 77); the audience table and
   display names in use (item 85) (V08 §3.6, §3.11).
9. **The host clerk** — SettlementForge's own assistant as a client of the tool API (V10's configuration C, decided by
   J121/J122), and the host side of V10's configurations A and B where a deployment enables the built-in clerk —
   `setClerk` with the transport and its renewal, the proposal channel and the projection (V08 §2.2, §4.4, §5.4 (3)).
10. **Campaign scale** — many settlements: storage, memory, the refresh queue and its budgets (V08 §3.4, §6).
11. **Testing and release** — the host harness, the fixture pairs through the bridge, the end-to-end bars and the
    release checklist (V08 §7, §8.3).
12. **File g's items 102 and 103 at the port** — item 102's latitude for the model-side sun from the dossier or the
    realm block (DR29), and the bar that sunlight never pushes a dossier map outside its wealth row; item 103's
    SettlementForge tags as default siting profiles (the vocabulary boundary and the lookup chain), the institution's own
    political role (`priorityCategory`) as the first input of its power association, and coverage inside a collective
    record's count range (V08 §2.6, §3.5).
13. **Custom content, the host side (item 104)** — a custom institution's record as the dossier carries it (its local
    uid, definition revision and content hash, free-text category, tags, the optional scene tokens), its description
    reduced to keyword keys inside the adapter, the ACTIVE custom chains with their resource, processors, outputs and
    trade endpoints, custom resources and custom services with their provider, and the author's library fields as
    OPTIONAL host inputs (`HostContext.customLibrary`), admitted only when their revision matches the dossier's and
    recorded in the document, so that no replay needs the host (V08 §2.8, §3.13). The resolution rows (the 17
    scene-archetype profiles, the category and tag deltas, the keyword table, the fallback) and the chain-placement rules
    are V11's; the solver that reads them is the base's (§4.7 S10b).
14. **The port side of file g's items 105–109** — SettlementForge's own supply chains, their dependencies and goods lists
    as the supply web's input (item 105 (i); DR33); the sea threats DR2's waterfront reads (item 106 (d)); the
    institution ladders — the name grammar, the qualifiers, the ladder data at the pinned commit, no double counting,
    steps over time (item 108); and item 109's dossier sources — the ruin's existence evidence, the cavern drivers, and
    the trace of every burial, church, cathedral and monastery record to the volumes that build catacombs and crypts,
    with the closures and tier changes that must never shrink or orphan them (DR30–DR32; V08 §2.6a, §3.5.1).
15. **The port side of item 110** — the dossier facts that feed item 110 (b)'s generated raised ways: the water system
    and its demand records to the aqueduct reason (DR34), the high-ground landmarks to the elevated road's (DR35), the
    culture to the aqueduct's chance and to the stepped specialisations of item 110 (c); the toll bridge's watercourse
    rule at every rung (V08 §2.6b (3)); and the rule that nothing item 110 generates is dossier-bound, so the DM's
    removal holds through every absorb (V08 §2.6b, §4.1, §4.3, §4.6).
16. **The port side of items 111 and 113–118** — a desert dossier with or without `oasis_water`, and deserts with rivers,
    lakes or coasts (item 111; V08 §2.6 `site`, `deposits`); SettlementForge's history — the founding, the 29 event
    templates, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, the opt-in ancient ruins and
    `peakTier` with its documented gap, and the effective peak's evidence order (item 113; V08 §3.15); the defence
    readiness and the wealth word as the walls' drivers (item 114); what "specified" reads from the dossier under the
    grandeur ceiling (item 115); SettlementForge's calendar and climate for the seasons (item 117); `traditions` and the
    custom-content traditions for the festival decorations (item 118) (V08 §3.16). Item 116's zoom-out limit has no port
    side: the frame is the dossier map's `bounds`, which the port does not set.
17. **SettlementForge's decisions read as inputs (J121)** — the module's origin, plans, save limits, backup depth and
    storage quota, the interface language, the assistant and its model tier (V08 §2.2 `MapHostConfig`, §3.7, §4.4, §5.5);
    and the export bundle's scene files from M-SF (J122; V08 §5.4 (2)).

**Base hooks consumed (cited, never restated).** §7.7 layer 2 (the typed slices) and the dossier contract items 1–16,
with the derivation table (DR1–DR40), the key law, the receipt rows (F1–F22, F-V8-1–F-V8-7) and the status rows; §11.2
(`PlatApi`, the clerk's tool API, *Knowledge*); §11.3 (transport, envelope, vocabulary with the port's and the clerk's
additions, convergence, version handshake, roles, bridged load verification, logging); §11.4 (the doors; door 1 closed,
J86; the export bundle); §14 (`@plat/port`: `DossierPort`, `PortResult`, `PortNote`, `HostContext`, `RealmBlock`,
`DossierDigest`, `DossierInstitution`, `PortReport`, the audience table, the dossier row sets, the key-list lint, the
dependency rule); §2.9 (`Document`, the dossier block, load steps 1–5, size budget, canonical form, view state); §2.7 (the
staged records, `CustomChainRecord`, `CustomServiceRecord`, `HistoryRecord`, the raised-way record); §10.2 (`PortRows`);
§4.11 (the clock, the cadence, the rung at an epoch, *Dossier content across epochs*, history-first generation); §6.2–§6.4
(digests, addresses, version axes, retention); §7.1 (`EditBase`, `DossierRef`, `EditEvent` with `dossierFacts` and
`dossierRecord`), §7.4 (lifecycles), §7.5 (migration); §5.2–§5.4 (F-EDIT, F-SITING, the report with `dossierNotes`); §8.2
(the thematic, season and decoration rows); §9.2 (the knowledge key); §9.5 (the title word); §12.5–§12.8 (first map, edits,
replay, memory); §13.2 (B-DOSSIER-lite, T20-*, T73-*, T75-*, T77-1, T81-*, T85-*, T88-*), §13.8 (CI tiers); §16 (the
milestone rows); PART III (the village page); §17.1 (3) (paths); and file g's base mechanisms — item 102's daylight share,
item 103's profiles, item 104's resolution, item 105's supply web, item 106's wall closure and waterfront, item 107's
balance, item 108's ladder steps, item 109's systems, item 110's generated content, item 111's oasis and water pull, item
113's replay, item 114's wall condition, item 115's ceiling, items 117 and 118's looks — cited by item.

**Out of scope, with where each lives.** SettlementForge's own code — its tab, its storage tables, its server — is
SettlementForge's; this volume states the contract it implements (the host client's API and the map record) and ships
the client. Door 1 — any geometry for SettlementForge's simulator — stays closed (J86; §11.4). The village product's
generation is V07's; this volume designs only the port side of its hand-off. The built-in clerk itself is V10's; this
volume wires SettlementForge's own assistant (configuration C) and the host side of V10's `clerk.config` (V08 §2.2,
§4.4, §5.4 (3)). The siting rulebook's content — every class's and every catalogue kind's profile, and the per-kind rows
of `tables/dossier/kinds` — is V11's; this volume owns the vocabulary boundary and the lookup chain. The shade-map view is
V09's. Reconciliation with SettlementForge's own map program and its plan-artifact seam stay outside this design by the
owner's ruling (J-Fsf-1). What the map builds from the facts this volume carries is its readers': the ruin, cavern and catacomb systems,
their access and growth are V04's; the crypts V03's (with V02's basements); the calamity-to-hazard table, every epoch
behaviour and the history replay V06's; the chain-status weights, the waterfront threat weights, the ladder step table,
the goods, era, material, patch-material, ceiling, season and decoration rows V11's. A live, explorable map for players
— a "party copy" of the document — is decided under J122: pictures and player views now; a live shared map after M-SF
(V08 §11 Q5). SettlementForge's world-state works ledger is not read, and a raised way is never derived from it
(J-V8.72). Item 110's terraces, retaining walls, raised ways, stepped massing and deck plots are the base's and V01, V02,
V03, V04, V06 and V11's; this volume carries only their dossier inputs (V08 §2.6b).
