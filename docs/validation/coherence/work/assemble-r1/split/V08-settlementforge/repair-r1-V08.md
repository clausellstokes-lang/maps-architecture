
=== REPLACE # Design volume 8 — The SettlementForge stage: connecting the map to the host end to end ===
# Design volume 8 — The SettlementForge stage: connecting the map to the host end to end

> PENDING FABLE REVIEW — written by opus standing in for the Fable seats volumes/V8-settlementforge, its revisions, reconciliation and coherence lanes; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the SettlementForge stage the base (`docs/ARCHITECTURE.md`,
with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in
§7.7, §11.3, §11.4 and §14. The implementer holds the base and the volumes and nothing else (§17.1). Every fact the base or
another volume states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n`
is always the base's; a design volume's section carries its prefix everywhere, this one's included (`V08 §3.5`), and so
does every item of a list (`V09 §2.2, V09 §4.10`); `item n` is an amendment item — items 1–120 the owner's, items 200
and above file f's, each the applied text of a volume's base change request (V08 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V8.n` (V08 §9),
tests `T-V8-n` (V08 §7), the wiring rows `W1`… (V08 §1b; another volume's are written `V06 W27`). The twelve tools are item
101's T1–T12, written with their word at first use (T2 `ground`); a base bar group is written with its number (`T73-7`).
The derivation rows are §7.7's `DR1`–`DR43` by number. **Sources.** SettlementForge (SF) field names and values are quoted
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
or drops; a player's assistant reads only the party's list of known places. The map's **Find** lists the record's own
institutions first, under SettlementForge's names — pick "Blacksmiths" and every smithy the record placed glows — and
offers only what the viewer may know; it is a view and never alters the map.

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
   coalescing of dossier versions, and the background refresh after an advance (V08 §3.2–V08 §3.4). **The players' view** —
   the stored party picture set and party gazetteer, re-rendered after committed changes and reveals, and the party's
   knowledge recorded on the map record (V08 §3.14).
3. **The binding table in practice** — the life of every binding row, the carried facts per element kind, the diff
   rules that turn two dossiers into `DossierChange`s, collective members, quarantined records and the absorbed-state
   history (V08 §2.3, V08 §3.5–V08 §3.6).
4. **Persistence inside the host** — the map record SettlementForge stores beside the dossier, snapshot plus event tail,
   compaction, backups, thumbnails and the fingerprints the host compares (V08 §2.1, V08 §3.7).
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
   display names in use (item 85) (V08 §3.6, V08 §3.11).
9. **The host clerk** — SettlementForge's own assistant as a client of the tool API (V10's configuration C, decided by
   J121/J122), and the host side of V10's configurations A and B where a deployment enables the built-in clerk —
   `setClerk` with the transport and its renewal, the proposal channel and the projection (V08 §2.2, V08 §4.4, V08 §5.4 (3)).
10. **Campaign scale** — many settlements: storage, memory, the refresh queue and its budgets (V08 §3.4, V08 §6).
11. **Testing and release** — the host harness, the fixture pairs through the bridge, the end-to-end bars and the
    release checklist (V08 §7, V08 §8.3).
12. **File g's items 102 and 103 at the port** — item 102's latitude for the model-side sun from the dossier or the
    realm block (DR29), and the bar that sunlight never pushes a dossier map outside its wealth row; item 103's
    SettlementForge tags as default siting profiles (the vocabulary boundary and the lookup chain), the institution's own
    political role (`priorityCategory`) as the first input of its power association, and coverage inside a collective
    record's count range (V08 §2.6, V08 §3.5).
13. **Custom content, the host side (item 104)** — a custom institution's record as the dossier carries it (its local
    uid, definition revision and content hash, free-text category, tags, the optional scene tokens), its description
    reduced to keyword keys inside the adapter, the ACTIVE custom chains with their resource, processors, outputs and
    trade endpoints, custom resources and custom services with their provider, and the author's library fields as
    OPTIONAL host inputs (`HostContext.customLibrary`), admitted only when their revision matches the dossier's and
    recorded in the document, so that no replay needs the host (V08 §2.8, V08 §3.13). The resolution rows (the 17
    scene-archetype profiles, the category and tag deltas, the keyword table, the fallback) and the chain-placement rules
    are V11's; the solver that reads them is the base's (§4.7 S10b).
14. **The port side of file g's items 105–109** — SettlementForge's own supply chains, their dependencies and goods lists
    as the supply web's input (item 105 (i); DR33); the sea threats DR2's waterfront reads (item 106 (d)); the
    institution ladders — the name grammar, the qualifiers, the ladder data at the pinned commit, no double counting,
    steps over time (item 108); and item 109's dossier sources — the ruin's existence evidence, the cavern drivers, and
    the trace of every burial, church, cathedral and monastery record to the volumes that build catacombs and crypts,
    with the closures and tier changes that must never shrink or orphan them (DR30–DR32; V08 §2.6a, V08 §3.5.1).
15. **The port side of item 110** — the dossier facts that feed item 110 (b)'s generated raised ways: the water system
    and its demand records to the aqueduct reason (DR34), the high-ground landmarks to the elevated road's (DR35), the
    culture to the aqueduct's chance and to the stepped specialisations of item 110 (c); the toll bridge's watercourse
    rule at every rung (V08 §2.6b (3)); and the rule that nothing item 110 generates is dossier-bound, so the DM's
    removal holds through every absorb (V08 §2.6b, V08 §4.1, V08 §4.3, V08 §4.6).
16. **The port side of items 111, 113–118 and 120** — a desert dossier with or without `oasis_water`, and deserts with rivers,
    lakes or coasts (item 111; V08 §2.6 `site`, `deposits`); SettlementForge's history — the founding, the 29 event
    templates, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, the opt-in ancient ruins and
    `peakTier` with its documented gap, and the effective peak's evidence order (item 113; V08 §3.15); the defence
    readiness and the wealth word as the walls' drivers (item 114); what "specified" reads from the dossier under the
    grandeur ceiling (item 115); SettlementForge's calendar and climate for the seasons (item 117); `traditions` and the
    custom-content traditions for the festival decorations (item 118); the dossier's institution records as Find's list
    entries (item 120) (V08 §3.16). Item 116's zoom-out limit has no port
    side: the frame is the dossier map's `bounds`, which the port does not set.
17. **SettlementForge's decisions read as inputs (J121)** — the module's origin, plans, save limits, backup depth and
    storage quota, the interface language, the assistant and its model tier (V08 §2.2 `MapHostConfig`, V08 §3.7, V08 §4.4, V08 §5.5);
    and the export bundle's scene files from M-SF (J122; V08 §5.4 (2)).

**Base hooks consumed (cited, never restated).** §7.7 layer 2 (the typed slices) and the dossier contract items 1–16,
with the derivation table (DR1–DR43), the key law, the receipt rows (F1–F22, F-V8-1–F-V8-8) and the status rows; §11.2
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
replay, memory); §13.2 (B-DOSSIER-lite, T20-*, T73-*, T75-*, T77-1, T81-*, T85-*, T88-*, T108-1 – T108-3), §13.8 (CI tiers); §16 (the
milestone rows); PART III (the village page); §17.1 (3) (paths); and file g's base mechanisms — item 102's daylight share,
item 103's profiles, item 104's resolution, item 105's supply web, item 106's wall closure and waterfront, item 107's
balance, item 108's ladder steps, item 109's systems, item 110's generated content, item 111's oasis and water pull, item
113's replay, item 114's wall condition, item 115's ceiling, items 117 and 118's looks, item 120's Find — cited by item.

**Out of scope, with where each lives.** SettlementForge's own code — its tab, its storage tables, its server — is
SettlementForge's; this volume states the contract it implements (the host client's API and the map record) and ships
the client. Door 1 — any geometry for SettlementForge's simulator — stays closed (J86; §11.4). The village product's
generation is V07's; this volume designs only the port side of its hand-off. The built-in clerk itself is V10's; this
volume wires SettlementForge's own assistant (configuration C) and the host side of V10's `clerk.config` (V08 §2.2,
V08 §4.4, V08 §5.4 (3)). The siting rulebook's content — every class's and every catalogue kind's profile, and the per-kind rows
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

## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into; base records are cited. The
rows are ordered by subject: the embed and the bridge (W1–W19), the binding, digest and adapters (W20–W33), the staged
records and values (W34–W47), the owner items 108–118 at the port (W48–W67), custom content and the staged-record event
(W68–W74), the clerk, drawing and exports (W75–W79), the host's surfaces and the players' view (W80–W88), the plan and
testing (W89–W94), and Find's dossier entries (W95).

| row | piece (V08 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|---|
| W1 | embed entry `embed.html` of `@plat/app` (3.1) | the host's frame `src`; the module's static host | boots `@plat/api`'s workers; sends `ready`, `module.status` | §11.2 worker boundary, §11.3 transport; item 507 |
| W2 | `@plat/bridge-client` (2.2, 3.1) | SettlementForge's lazy Map-tab chunk | the frame's `WindowPostMessageTransport`; the host's map-record store | §11.3; item 507 |
| W3 | `MapHostConfig`'s SettlementForge inputs — `moduleOrigin`, `backupDepth`, `quotaBytes`, `locale` (2.2) | SettlementForge's existing product decisions (J121) | the frame's `src` and CSP (3.1); `MapStore.replaceSnapshot`'s backup depth (3.7); the storage row's quota check (6); the frame's message catalogue (5.5) | §11.3 *SettlementForge's configuration*; §11.5 |
| W4 | `MapRecord` (2.1) | the host, through the client's store calls (3.7) | `doc.load` + `doc.apply` at open (3.1); the refresh queue (3.4); the offer decision (3.2) | §2.9 (the document it stores), §11.3 "the host is the store" |
| W5 | `dossier.offer` / `dossier.result` (2.2) | the client (offer); the port leader (result) | `DossierPort.digest`, `creation`, `absorb` (3.3); the host's append and fan-out | §11.3's port vocabulary, §11.4 doors 1 and 2; item 472 |
| W6 | `module.status` with its `detail` key (2.2) | the embed's glue at each phase (3.1); the module at B10's rebuild and B20's mismatch (3.9) | the tab's banner beside its phase's row (5.1) | §11.3; item 472 |
| W7 | `doc.snapshot` / `doc.snapshot.ready` (2.2) | the client at creation, compaction, upgrade and rebase | `MapStore.create`, `MapStore.replaceSnapshot` | §11.3; item 472 |
| W8 | `encoded`, `seqAfter`, `logHeadAfter` on `doc.changed` and `dossier.result`; the snapshot metadata on `created` (2.2) | the module (canonical CBOR, §11.3's `logHead`) | `MapStore.commitEvents`, `MapStore.create`: the host stores them and never computes a head | §11.3; item 472 |
| W9 | `doc.load.audience` (2.2) | the client, from the audience word | the module's role and key, the lower of the two (J-V8.29) | §11.3 *Roles*; §14's audience table |
| W10 | host-minted `docId` (2.1) | the host at first creation (`MapRecord.mapId`) | `generate`'s document id, so every client's creation is identical (3.3) | §2.9 `docId`, §11.2 `generate`; item 459 |
| W11 | export `displayNames` and the lowered `knowledge?: Admission` (2.2) | the client's `exportPicture` (3.7's thumbnails, 3.11, 5.3) | §11.1's exporters, admitting what both the requester's key and it admit | §11.1 *Knowledge*, *Display names*; items 453, 572 |
| W12 | the export bundle call `MapSession.exportScenes` (2.2, 5.4 (2)) | the host page, from M-SF (J122) | the module's scene exporters (§11.1's `.dd2vtt` and Foundry scenes) under the calling key; opaque blobs packaged unread into SettlementForge's export bundle | §11.4 *The export bundle*; §11.1 VTT |
| W13 | port leader (3.3) | the role from `doc.load` (with its `audience`) and the audience table | commit: `dossier.result` events; an editing client that folds them re-runs `absorb` and reports a mismatch | §11.3 roles, convergence; §14 audience table |
| W14 | refresh queue (3.4) | the host after an advance (`refreshPending`) | a hidden frame running offer → absorb → snapshot → pictures per map | §12.8 memory; §2.9 load |
| W15 | `MapRecord.refreshing` lease (2.1) | the refresh queue | another device's page (free when expired) | — |
| W16 | upgrade offer in the host (3.8) | `ready`'s output versions vs `MapRecord.snapshot.outputVersion` | the owner's upgrade dialog → `upgrade` event (§7.5) | §6.4 retention, §11.3 handshake |
| W17 | the embed's bridge handler — the bridge to the shell (3.1 step 7) | the host's `clerk.config`, `preview { proposal }` and `host.state`; the harness's `ClerkMount.host` calls; the header's controls; the shell's selection forwarded in `entity.selected`; the loaded document's `doc.changed` `ApiEvent`s through the handler's one `subscribe` (§11.2) | `ClerkMount.host` (V09 §2.10); `HostSlots` — `header`, `banner`, `lockedControls`, `exportFormats`, `fileMenu`, `clerkMode`, `hostName`, `historyLines`, `newDocuments` (V09 §2.2); the frame's `ViewOpts.viewAs`; the posted `clerk.needsToken`, `clerk.config.refused`, `clerk.proposal` and `host.action` | §11.2 (`subscribe`), §11.3; items 472, 473, 507 |
| W18 | `host.action` and `MapSession.on('action')` (2.2, 4.2) | the frame's header controls, an owner's or editor's frame only | the host page, which runs the V08 §4.2 row's operation with `offer`, `setParty`, `MapStore.replaceSnapshot`, `MapStore.create` or its own assistant settings and `setClerk` | §11.3; item 472; T-V8-47 |
| W19 | `host.state` (2.2) | the client, after each `doc.load` and each change of `MapRecord.party`, `backups` or `partyPictures.at`; `MapSession.seePlayersView` | the header's controls, the restore dialog's list of lost edits, the history panel's party lines through `HostSlots.historyLines` (4.6), the players' view — `ViewOpts.viewAs` (V08 §3.14 (5)) | §11.3; items 464, 472 |
| W20 | the binding's port fields — `DossierBinding.adapter`, `.quarantined`, `.notes`, `absorbed` retention (2.3) | `creation` and `absorb` through the ledger event's fold (3.5, 3.6 (4)) | the next absorb's diff and remaps (3.5, 3.8); §5.3's binding check; the report | §7.7 `DossierBinding`, §2.9 dossier block; item 390 |
| W21 | `CarriedFact` shapes and the diff rules (2.3, 3.5) | `digest` | `absorb`'s change list; `factHash`; F22's convergence | §7.7 items 1, 12, 13; §7.7 `CarriedFacts` |
| W22 | THE ADAPTER'S FIELD TABLE (2.4) | the pinned line's dossier shape (the 41 required keys, the optional keys read, the realm block, the week) | every `DossierDigest` field and the derivation row it feeds; `AdapterManifest.keyList`; T-V8-20's ignore clause; §6.5 (3)'s key-list lint | §7.7 item 1's closed-digest rule and never-read reasons |
| W23 | `AdapterManifest`, `AdapterRegistry` (2.4) | each `adapters/sf/<line>/` folder | `digest`'s adapter choice (3.8); `recognise`; the lint's key list | §14 port, lint; item 508 |
| W24 | the catalogue manifest `catalogue.<line>.json` with `ladderPairs` (2.4) | the adapter's build step, from the pinned line's catalogue and ladder file | V11's `coversManifest` totality and its ladder cross-check (V11 registry row 77, T-V11-2) | §14's lint |
| W25 | `PortNote.msg` and `.keys`, each kind's class (2.4, 4.6) | the port — `digest`, `creation`, `absorb`; `custom_resolved` and `unmapped_kind` after the fold, their `class` the class built at the document's rung, in V11's class `label` cell or a pin kind's `host.pinKind.<kind>` row | an `event` or new `standing` note → the ledger event's `notes` → V09 §4.10's absorb group; a `standing` note → `DossierBinding.notes` → `GenerationReport.dossierNotes` → the report panel (V09 §5.7); every note → `dossier.result.report` → `MapSession.on('report')` and `statusText` | §14 `PortNote`; item 508 |
| W26 | `dossierFacts.notes`, `.notesCleared` and `DossierBinding.notes` (2.3, 3.6 (4)) | the port run's notes, by class and identity | the fold (the binding's standing list); the history panel's group (4.6); every derivation's report build (`GenerationReport.dossierNotes`); replay, verification (3.3) | §7.1, §7.7 item 12, §2.9's dossier block, §5.4; item 390 |
| W27 | `GenerationReport.dossierNotes` (4.6) | every derivation's report build and the verification replay on load, copying `DossierBinding.notes` at the report's seq (`[]` unbound) | `report(h)` → V09 §5.7's report panel under `host.group.standing`; T-V8-14 | §5.4 `GenerationReport`; item 390 |
| W28 | the refusal's `reason` on `dossier.result.held` and `MapRecord.held` (2.1, 2.2, 3.9) | the port's `held` note on a refused offer (a `host.held.*` row) | the tab's banner and the frame's held notice (5.1, 3.1 step 7 (b)); the thumbnail slot at a refused creation | §11.3; item 472 |
| W29 | digest additions of V08 §2.5 — `role`, `security`, `government.legitimacy`, the ladder fields, `site.ruinEvidence`, `site.threats`, `site.latitudeDeg`, the extended economy, `calamities`, the history, the readiness, the traditions | the adapter, by W22's table | DR12, `PortValues`, DR29, DR30–DR33, DR36–DR43 (§7.7) | §14 `DossierDigest`; item 509 |
| W30 | dossier row sets written out (2.6) | this volume's defaults, `@plat/tables` | `digest` and `creation` through the derivation rows | §14 item 7 `tables/dossier/*`; item 510 |
| W31 | the `kinds` shape with its pseudo-classes and `implies` column (2.6) | V11's rows per catalogue kind | DR24's first rung; DR7, DR2, DR17, DR19, S2's absent classes, §2.7's pins; DR1 at creation (a bridge-implying record) | §7.7 DR24; items 399, 510 |
| W32 | `tables/dossier/tags`, `categories`, `crime`, `cultures` (2.6) | this volume | the siting-profile lookup (item 103, V11's rows), DR24's fallback, `PortValues.crime`, DR29 | items 391, 510 |
| W33 | key-law rows for the port's own singletons and pairs — `trade`, `port-values`, `deity`, `evidence`, `history`, `site`, `relation:`, `cond:stress:`, `chain:cat:`, `dep:`, `calamity:`, `trad:` (2.3) | `digest` | binding rows, `DossierRef.element`, the carried map | §7.7 item 12 (the key law; the custom keys item 256) |
| W34 | the staged records' fill — `ConditionOverlay`, `DepositSite`, `PowerRelation`, the dossier-backed `Person` (3.11) | `creation`'s prefix and `absorb`, by `dossierRecord` puts and retires | §4.11's Works share and land-use conversions, §4.5's typing, item 72's political component, the renderer (5.2), the clerk | §2.7 (the records, their building volume V08), §7.1 `dossierRecord`; items 358, 395 |
| W35 | `PortValues` on `CircumstanceSlice.port` (2.5) | `creation` (the creation slice) and the cadence's epochs (3.6) | the readers of `PortRows.crime`, `.hinterland`, `.legitimacy` (§4.6, §4.9, II.7.3, II.7.5, §4.5 (6)); DR2's waterfront (`threats`); V05's model sampler (`latitudeDeg`); the slice's threat V06's walls read (`readiness`, item 114) | §7.7 layer 2, §10.2; item 389 |
| W36 | the `threats` row → `PortValues.threats` (2.5, 2.6) | the adapter over stressors, conditions, trade partners, access, terrain and population | DR2's waterfront through V11's `WaterfrontThreatRow` (item 106 (d)); V07's watchtower row | §7.7 DR2 |
| W37 | the `wealth` diff row → `EpochInputs.wealthLevel` (3.5) | the carried `port-values.wealth` word against the new digest's `wealth.label` (receipt F9) | DR6 at the next epoch through `tables/dossier/wealth`; V06's MEANS for item 114 (V06 W27, W89) | §7.7 DR6, receipt F9 |
| W38 | the frozen-fact rows `site` and `history` (3.5) | the carried `site` and `history` facts against the new digest | one `frozen_fact_changed` note (class report, `host.note.frozen_fact_changed`); nothing else | §7.7 item 10 (the site and the history are creation's); DR1's creation bar |
| W39 | `HistoryHint` fill (3.11) | `creation` from `history` | `Recipe.history` → S2's stage count, II.7.6 | §2.9 `Recipe.history`; §2.7 `HistoryHint` |
| W40 | DR29 latitude (3.5) | realm block's `cell.latDeg`, `tables/dossier/cultures` | `Intent.latitudeDeg` at creation, `PortValues.latitudeDeg` at a later epoch → item 102's model-side sampler (V05), V06's drift, V07's village sweeps | §7.7 DR29; item 391 |
| W41 | coverage inside a collective range (3.5) | item 103 (f)'s coverage row | DR9's count draw | §7.7 DR9; item 392 |
| W42 | realm-block helper `realmBlockFrom` (3.11) | the host's campaign placements, the realm map's scale and latitude scale, the campaign's spatial digest (its cell words and climate sub-digest) — nothing else of campaign state | `HostContext.realm` → trade bearings, north first, latitude, the climate source (item 117) | §14 `RealmBlock`; item 77; item 396 |
| W43 | calamities → `EpochInputs.events` (3.6) | `calamityHistory[]` through the digest; the carried `calamity` keys | V06's hazard phase (DR28); V04's burial growth (the deaths) | §4.11 `EpochInputs`; items 388, 393, 573 |
| W44 | stressors → `cond:stress:<type>` overlays (3.11) | the digest's normalised `stressors` | the `conditions` row's readers | §2.7; item 358 |
| W45 | the port's reserved session `host:port` (3.6) | the port | §7.4's stacks (never a user's), V09's undo tooltip | §7.1; item 359 |
| W46 | the notables' `importance` (2.5, 3.11) | the adapter from `npcs[].importance` | V10's people answer and V09's person card, which order a settlement's notables by it; no model rule reads it | §2.7 dossier-backed `Person` |
| W47 | a derived land use — a `DepositSite` under `res:derived:<landuse>` (2.6 `deposits`, 3.11) | the port's creation prefix and `absorb`, from a record whose class carries a hard `near` → `landuse:<k>` row within 0 on a dossier that lists no deposit opening `<k>` | S12a's site and land use (DR19); V07 §3.9's village claim; the class's hard row, met | §7.7 DR19; §2.7 `DepositSite`; item 508 (`derived_landuse`) |
| W48 | `DossierInstitution.step`, `.lesser`, `.popQualifier`; the ladder merge (2.5, 3.5.1) | the adapter; V11's `dossier.ladders` and its `identity` cells | DR9's member counts; V01's quarter records; V06's ladder steps (V06 §3.9.11); V10's members answer; the count parity (7.3); at village rungs V07 §2.4's range rows, DR9's members, V07 §3.10's QUARTER end claim and a pin lesser's churchyard `cross`; for a REPLACEMENT greater of a new thing, DR9's `assign` (at a village rung V07's records placement), the fortification path for a `@wall` greater | §7.7 T9, DR9; item 509 |
| W49 | `economy.chains` extended; carried `chain`, `dependency`; the goods lists (2.3, 2.5) | the adapter, V11's `goodWords`, the `chainStatus` row | DR33 → the supply web (item 105 (i)); V01's district supply term; V06's link re-binding at epochs; V07's village links and entry store | §14 `DossierDigest`; items 509, 390 |
| W50 | row sets `relations`, `historyScars`, `magic`, `era`, `materials`, `customWeights`, `isolation`, `chainStatus`, `dependencySeverity`, `calamitySeverity`, `qualifiers`, `threats`, `ruinEvidence`, `readiness`, `climates`, `historyEvents`, `festivals` (2.6) | this volume | `PowerRelation` (§4.5, item 72), `HistoryHint`, `CircumstanceSlice.magic` and `.era`, V11's material rows, `PortRows.customKinds`' numbers, S12a, the supply web, T9 and DR9, DR2, V04's ruin rule, the need and the generation-time condition (item 114), the biome's climate row (item 117), DR37's event mapping (item 113), the festival kind (item 118) | item 510 |
| W51 | `site.ruinEvidence` (2.5, 2.6a) | the adapter | V04 §3.5.0a's ruin existence and centre; V05's node term through V04's `ruinCentre()` | DR30; item 509 |
| W52 | DR30–DR32, the burial and crypt trace (2.6a) | the adapter; V11's `kinds` and `ladders` rows | V04's ruin, cavern and catacomb rules; V03's crypts; V06's epochs | §7.7 DR30–DR32; item 398 |
| W53 | DR34, the water system's inputs (2.6b) | the adapter (the records bound to `conduit_house` through V11's `kinds` and `ladders`, the demand records, the `site` row's words, the realm cell's river, the `hot_springs` deposits, the culture); DR23's rung | item 110 (b)'s aqueduct reason (the base); V11's chance, need, cap and terminal rows; V06's epoch builds (V06 §3.19.6); V10's `why` | §7.7 DR34; item 398 |
| W54 | DR35, the high-ground landmarks (2.6b) | the dossier-bound institutions of class significance at least V11 §3.24.2's `elevated.landmarkMinSignificance` and the custom `landmark` records, at their S3 reservations | item 110 (b)'s elevated-road reason; V06's epoch builds (V06 §3.19.6); V10's `why` | §7.7 DR35; §10.2 significance; item 398 |
| W55 | the toll bridge's watercourse rule with its rung column (2.6b (3)) | a record whose `kinds` row implies a bridge; DR1's site; item 111's arid row; the access word; at village rungs S0's own water draw | DR1's forced course at creation (base rungs); V07 §3.1 (1), V07 §3.11 DR1 at village rungs; V11's toll-house `near` bridge row and `deckOk`; the report's `toll_bridge_dry` | §7.7 DR1; item 399; J-VI.17 |
| W56 | the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s aqueduct, when the dossier's conduit house takes its terminal | the arches' fate and condition (the `impairments` row; V06's decay) | §2.7's raised way (`waterUse`); item 244; J-VI.9 |
| W57 | the culture's item-110 readers (2.6b (4)) | `site.culture` | V11's aqueduct culture modifier; DR15's template family → V11's stepped specialisations (item 110 (c); V11 §3.24.3) | §7.7 DR15 |
| W58 | generated item-110 content unbound; the removal hold (4.1, 4.3) | the base's item-110 generators; the DM's delete; an accepted clerk proposal | every absorb, epoch, rung change, re-key, upgrade, rebase and host undo (the slot stays closed); the history panel's lines (4.6) | §7.7 item 3; item 260; J-VI.14 |
| W59 | the port's consultation of `LadderRouter` (3.10) | the village product's `ProductDecl` in `StrategyRegistry.products` (V07 §2.1) | `creation` (the product and rung) and every `absorb` (whether the population lies in a registered range; the product at an epoch by V07 §2.1's fold; 0 routed to V07's desertion) | §1.1 `LadderRouter`, §4.11, PART III; items 202, 322 |
| W60 | the desert's water — the `site` row's `desert` with the arid chances, the `oasis_water` deposit (item 111; 2.6, 3.16 (1)) | `site.terrain`, `site.access`, the realm cell, the water deposits | S0's blueprint `oasis` (`on` with the deposit, `off` without), DR1's site, DR40's oasis; the toll bridge's failure condition (W55); V06's spring rules (a removed `oasis_water`, V06 W82) | §4.2 S0 *Water in dry country*; §7.7 DR1, DR40 |
| W61 | SettlementForge's history read (item 113; 3.15) | `history` (the founding, the events with their templates), `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle stamps, the ancient-ruin marker, `peakTier` | `Recipe.history` (`HistoryHint`); DR36–DR39's inputs → §4.11's history-first generation (V06's replay), II.7.6's buried former settlement (V04); the `HistoryRecord`'s evidence (§2.7) | §7.7 DR36–DR39; §2.7 `HistoryRecord` |
| W62 | the defence readiness (item 114; 2.6 `readiness`, 3.16 (2)) | `defenseProfile.readiness.label` and `.score` (the one part of `defenseProfile` read) | the slice's threat V06's NEED reads (V06 §3.7.7); §7.7's DR41, the generation-time condition (item 114 (d)), with the wealth word (DR6) | §7.7 DR41; §2.7 `Enceinte.condition` |
| W63 | "specified" under the grandeur ceiling (item 115; 3.16 (3)) | the dossier-backed assignments whose class the ceiling table's `settings.grandClasses` lists (V11 §3.25.4); a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1) | §4.7 S10b's rung ceiling and S2's manor count (§4.2 S2), which leave a specified building its full design (item 115 (c)); V07's manor rule (V07 §3.8); V10's note that it exceeds the tier's usual | §4.7 S10b (item 115); §10.2's ceiling table |
| W64 | SettlementForge's calendar and climate (item 117; 3.16 (4)) | `HostContext.week` (the campaign's `calendar.elapsedWeeks`); the realm block's climate word; `site.terrain` with the relief | §11.3's `view.set { week }` → §2.9's year position under the follow flag; §7.7's DR42 (item 117); the biome's climate row (§4.2 S0) | §2.9 view state; §7.7 DR42 |
| W65 | `traditions` and the custom-content traditions (item 118; 3.16 (5)) | the dossier's `traditions[]` and `customContentRoster`'s traditions bucket | the carried `trad:` facts → §7.7's DR43 (window and staging, item 118) → §8.2's decoration rows through §2.9's festival display; V09's festival list; V10's explanations | §7.7 DR43; §2.9 view state |
| W66 | the ledger's carried `history`, `readiness` and `trad:` facts (2.3) | `creation`, `absorb` | the frozen-fact row (W38), the slice's threat (W62), the festival schedule (W65) | §7.7 item 12 |
| W67 | the edge suite (3.17) | this volume's mechanisms at their limits and their combinations with every physical feature | T-V8-49 | §5's ladder |
| W68 | `dossierRecord` event (2.5) | `creation` prefix and `absorb` (3.11) | `ConditionOverlay`, `DepositSite`, `PowerRelation`, dossier-backed `Person`, `CustomChainRecord`, `CustomServiceRecord` records | §7.1, §7.4's row; item 358 |
| W69 | `DossierInstitution.custom` with `keywords` (2.8) | the adapter, from the dossier's custom instance and `customContentProvenance` | item 104 (a)'s resolution at fold (V11 §3.13.1's rungs; V08 §3.5 (5) (f)); DR10 | §14 `DossierInstitution`; item 511 |
| W70 | `DossierDigest.customChains`, `.customResources`, `.customServices` (2.8) | the adapter, from `economicState.customChains`, `config.nearbyResourceDefinitions`, `availableServices.*` | `creation` and `absorb` → `dossierRecord` puts (3.13) | §14 `DossierDigest`; item 511 |
| W71 | `CustomChainRecord`, `CustomServiceRecord` fields' rules (2.8) | `dossierRecord` events (3.13) | S10b's chain pulls and flow order (item 104 (b), (h); V11's rules); §10.3's sub-locations; the renderer and labels (5.2); the clerk's `why` (4.4) | §2.7 (the records); item 256 |
| W72 | `HostContext.customLibrary` (2.8) | the host client, from the author's content library (optional) | `digest` → the `custom-def` carried facts → item 104 (a) (5) | §14 `HostContext`; item 511 |
| W73 | carried kinds `custom-def`, `custom-chain`, `custom-service` (2.8) | `creation`, `absorb` (the ledger event) | the diff (3.5): re-resolution on a new revision (item 104 (e)), a chain's activation change (item 104 (h) (7)) | §7.7 item 12; items 256, 390 |
| W74 | `Assignment.custom` (2.8) | the creation prefix; a `custom_revision` `setAttr` | item 104 (a)'s re-resolution at fold; the custom weights read from the `custom-def` fact; the clerk's `why` | §7.7 `Assignment`; item 394 |
| W75 | the host clerk (4.4) | SettlementForge's assistant, its map tools resolved in the DM's page (the relay) | `query`, `preview`, accepted `doc.changed` with `proposedBy: 'clerk'`; a player's assistant: the stored party gazetteer | §11.2 clerk tool API |
| W76 | `MapSession.setClerk`, `preview`'s `proposal`, `on('clerkNeedsToken')`, `on('clerkProposal')`, `on('clerkConfigRefused')` (2.2) | the host page (V10's `clerk.config`; SettlementForge's assistant's proposals, V08 §4.4 (3)) | the embed's bridge handler → `ClerkMount.host` (V09 §2.10): `clerk.config` to `config`/`onConfig` and `HostSlots.clerkMode`, `preview { proposal }` to `proposals`; the harness's `needsToken`, `refused` and `answer` posted back (V08 §3.1 step 7 (a); V10 §3.17) | §11.3; item 473 |
| W77 | drawing rows `condition.*`, `worked-out`, the `supplyChains` view, the `occupation` symbol, the export attributes, the gazetteer's `customChain` rows (5.2) | the staged and custom records | the renderer, the legend, GeoJSON; V09 §5.4's Show-menu entry **SettlementForge's chains** — a chain in each only when the key admits every joined node (V08 §5.2) | §8.2, §8.3, §9.2's admission table, §11.1, §11.2; item 410 |
| W78 | the host projection of V08 §5.4 (3) (the base's kinds; V10 §3.17's rows for the reader kinds) and `E_HOST_FORMAT`, `E_HOST_KIND` (5.4) | the module in host mode, applying it to every `query.result` and `preview` reply before it is posted out of the frame | SettlementForge's assistant through the host client, which carries no projection code; the stored party gazetteer; V10's configuration B prompts; the host's `export.request` (`doc.snapshot` exempt) | §11.2, §11.3; items 472, 473; T-V8-27 |
| W79 | the status banner and `statusText` (5.1) | `module.status` from the embed's glue | SettlementForge's tab container, the host's translation | item 472 |
| W80 | host mode of `embed.html` — chrome, locked dossier values, the header's actions, the players'-view strip (5.1; `HostSlots` by V08 §3.1 step 7 (b)) | `@plat/app` | the DM's and co-DM's frames | §14 `@plat/app`; item 507 |
| W81 | the party picture set and party gazetteer (3.14) | the module in an editing session's frame or the refresh frame, on the client's `party.render`: the party key resolved by V08 §3.14 (1), passed as `ExportOpts.knowledge` and as `admitAs` to every `gazetteer` and `people` query; returned in `party.rendered`, stored by `putPartyPictures` | the player's Map tab (`MapHost.mountParty`); the player's assistant | §11.1 *Knowledge*; §11.2 `query`'s `admitAs`; §14 audience table; items 472, 513, 572 |
| W82 | `party.render` / `party.rendered` (2.2, 3.14 (3)) | the client: at creation, after each absorb it commits, 30 s after a map edit batch it committed, after each `setParty`, at open when row B18 finds the stored set stale, and in the refresh queue | the module's party render (V08 §3.14 (1)–(2)); the reply's set → `MapStore.putPartyPictures`, then `host.state { partyPicturesAt }` | §11.3; item 472; T-V8-2, T-V8-41 |
| W83 | `MapRecord.party` and `setParty` (2.1, 4.2) | an owner's or editor's "Reveal to the party" and "Hide again" | the party picture set, the party gazetteer, the DM's "See what the players see" (through `host.state`) | §9.2's key; §14 audience table |
| W84 | `HostSlots.historyLines` (3.1 step 7 (b)) | the embed's bridge handler, from successive `host.state` values — the `party` differences and `partyPicturesAt` — named and targeted at the key the shell passes to `list` by `query`'s `entity` reads (`dossierKey` or `id`, `admitAs` that key), through the handler's per-key cache, dropped at each head move its one `subscribe` reports | V09 §4.10's "The party" group of the history panel, listed with `effectiveKey()` | V09 §2.2; items 572, 583 |
| W85 | `HostSlots.newDocuments: 'download'` (3.1 step 7 (b)) | the embed's bridge handler, a constant of host mode | V09 §3.9's host-mode rule for every action that makes a new document; a copy of a dossier-bound document is detached (V06 §4.4) | V09 §2.2 |
| W86 | the catalogue families `host.note.*`, `host.held.*`, `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*`, `host.verify.mismatch`, `host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView`, `host.mirror.dropped`, `host.frame.title`, `host.pinKind.*` (3.7, 3.9, 4.2, 4.6, 5.1) | this volume's words | `messages/en.json` (V09 §2.9, V09 §4.9) and the client's `statusText` defaults; T-V8-14's walker and V09's T-V9-15 | V09 §2.9's catalogue; item 516 |
| W87 | the chains' knowledge rule (5.2) | each joined node's `knownTo` and concealment (item 63), read against the view's effective key (V09 §2.10) or the export's knowledge key (§11.1) by §9.2's admission table as a band-less reader | the `supplyChains` drawing and its legend; the gazetteer's `customChain` rows, V09 §5.4's entry and the party gazetteer; the GeoJSON `supplyChain` feature and every picture export; T-V8-25 | §9.2 `knowledge.admit`; §11.1, §11.2 *Knowledge*; item 410 |
| W88 | the locale of the frame (5.5) | `MapHostConfig.locale` (SettlementForge's interface language, J121), carried in the frame's `src` | the shell's `messages/<locale>.json` when shipped, else the catalogue's source language; the client's `statusText` defaults | §14 *the interface languages* |
| W89 | budgets (6) and bars (7) | this volume | §12.6's stage row; §13.2's suite, §13.8's tiers | items 480, 486 |
| W90 | M-SF and its steps (8) | this volume | §16's staged pricing | item 529 |
| W91 | host harness `plat/tools/hostharness/` (7.2) | the fixture pairs, a mock host store that never decodes a byte | the T-V8 bars end to end | §13.2 B-DOSSIER-lite, §13.8 |
| W92 | release checklist (8.3) | the bars and the manifests | a release of the SettlementForge configuration | §13.3 milestone records |
| W93 | the fixtures' levels for V12 (7.1) | the surveyed-dossier pairs, the custom-chain variants, the catacomb fixtures, a high-ground landmark fixture | item 108 (f)'s `exactMonotone` levels (their `@pop×k` derivatives registered in the frozen manifest, a level outside [1 500, 120 000] `notApplicable`), item 104 (h) (8)'s levels, the step script's catacomb levels, the elevated road's `higherWith`; none a calibration seed family (V12 §1b, V12 §3.7.5) | §13.2 B-DOSSIER-lite |
| W94 | the dossier row sets as non-calibratable data (2.6) | this volume's defaults | V11 §3.1 rows 63–66 and 77 (`calibratable: false`), T-V11-37; no V12 register line (V12's R4) | §13.9 (7) |
| W95 | Find's dossier entries (item 120; 3.16 (6)) | the carried `institution` facts (2.3) with the binding rows (§7.7 item 12), read at each commit through §11.2's `gazetteer` query at the viewer's effective key | V09's Find panel — its list, type-ahead and chips, and the glow and pins of their matches (item 120 (b)–(f)); a dossier chip's key and anchor in §2.9's `find` key; T-V8-58 | §11.2 (`gazetteer`, *Knowledge*); §2.9's view key `find` (item 120 (a)) |

**The dossier trace.** Every SettlementForge path the port reads, the `DossierDigest` field it fills and the derivation
row it feeds — or `ignored` with §7.7 item 1's reason — is V08 §2.4's adapter field table, the one list; no fact is read
from outside the digest, and nothing an `ignored` row names is read (T-V8-20's ignore clause).

## 2 Data model

### 2.1 The map record — what SettlementForge stores beside the dossier

The host is the store (§11.3). For SettlementForge the store is one **map record** per settlement map, kept in its own
row keyed by the settlement's id and the map id — never inside the dossier's `data` blob, where it would ride every save,
sync and public projection at about ten times the dossier's size (`research/sf/dossier-seam.md` C-6; J-V8.3). The type is
published by `@plat/bridge-client` as the host's storage contract; the module never touches storage. **The host never
computes anything it stores** (J-V8.46): every encoded event, head, sequence number and snapshot field arrives in a
message (V08 §2.2), and the host compares only strings it was handed — a proposal's `baseLogHead` against the `logHead` it
holds.

```ts
// @plat/bridge-client — the host's storage contract (hashes are lower-case hex strings: the client depends on nothing)
interface MapRecord {
  mapId: string;                 // a UUID the HOST mints when it first asks for a map; the document's docId (item 459). Immutable.
  settlementKey: string;         // `settlement:<id>` (§7.7 item 12): the dossier the map is bound to. Immutable.
  snapshot: SnapshotBlock;       // from `dossier.result.created` or `doc.snapshot.ready`, never computed by the host
  tail: { seq: number; event: Uint8Array /* the module's `encoded[i]`, stored as handed */ }[];   // the committed events after the snapshot, seq order
  logHead: string;               // the snapshot's head when the tail is empty, else the last `logHeadAfter` the host accepted
  adapter: { line: string; version: string };             // the port adapter that last committed (V08 §2.4)
  lastOffer: { dossierHash: string /* V08 §3.2 */; at: string /* ISO 8601 */; result: OfferStatus };
  absorbed: { factHash: string; week: number | null; dossierHash: string };   // the dossier state the committed log last absorbed
  status: 'current' | 'stale' | 'held' | 'refreshing';
  held?: { code: PortRefusalCode; message: string /* the port's English line, for logs */; sinceDossierHash: string;
    reason: { key: string; args?: Record<string, string | number> } /* the refusal's `held` note's msg as handed: a host.held.* row (V08 §3.9), drawn by the banner and the frame's held notice */ };
  refreshing?: { by: string /* the page session holding the refresh lease */; until: string /* ISO: now + 60 s, renewed after each map */ };
  thumbnails: { public?: Uint8Array; secret?: Uint8Array };   // PNG, 512 px on the long side (V08 §3.7)
  party: PartyKnowledge;         // what the players' party knows (V08 §3.14): written only by setParty
  partyPictures?: PartyPictureSet;   // the players' view (V08 §3.14): written only by putPartyPictures
  backups: { bytes: Uint8Array; logHead: string; docId: string /* = mapId: restore refuses any other */; at: string;
    tailAfter?: { seq: number; event: Uint8Array }[] /* backups[0] only: the tail segment the compaction that retired it removed, kept until the next compaction */ }[];
                                 // the previous snapshots, newest first: at most MapHostConfig.backupDepth of them (SettlementForge's backup decision, J121; V08 §3.7)
  refreshPending: boolean;       // queued for the background refresh (V08 §3.4)
  sizes: { snapshot: number; tail: number; backups: number; thumbnails: number; party: number };   // bytes: V08 §3.7's size check against MapHostConfig.quotaBytes
}
interface SnapshotBlock { bytes: Uint8Array /* the .plat as §2.9 writes it */; logHead: string /* §11.3 */; lastSeq: number /* its log's last seq */;
  outputVersion: string; schemaVersion: string; documentDigest: string /* §2.9's document digest over the canonical bytes */ }
interface PartyKnowledge { tier: 'public' | 'local' /* the party's base key (§9.2); never 'secret' */;
  places: string[] /* binding keys (inst:…, quarter:…, npc:…) or, for a map place, its address: the places revealed above the tier */;
  rev: number /* +1 at every setParty */; prev?: { tier: 'public' | 'local'; places: string[]; rev: number } /* the state before the last setParty: "Hide again" restores it */;
  by?: string /* the session that last wrote */ }
interface PartyPictureSet { seqAt: number /* the last seq of the log drawn */; logHead: string /* the head drawn */; partyRev: number /* the party.rev drawn */;
  outputVersion: string; week: number | null /* the dossier week drawn, for the viewer's caption */;
  levels: { z: number /* 0 city band, 1 district, 2 neighbourhood, 3 building (admitted places only, V08 §3.14 (2)) */; tileSize: 256; cols: number; rows: number;
    tiles: (Uint8Array | null)[] /* PNG, row-major; null: a z3 tile not rendered */ }[];
  svg: Uint8Array /* the city-band SVG under the party key, §11.1's inert bar */; gazetteer: Uint8Array /* UTF-8 JSON: the party gazetteer (V08 §3.14 (2) (c)) */;
  drawDigest: string /* H128 over the display lists the tiles and the SVG are drawn from, the gazetteer's bytes and `week`: party.render's unchanged test (V08 §3.14 (3)) */;
  at: string }
type OfferStatus = 'created' | 'absorbed' | 'unchanged' | 'held' | 'refused';
type PortRefusalCode = 'E_RUNG_UNAVAILABLE' | 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED' | 'E_OTHER_SETTLEMENT';
```

`status` reads: `current` — `lastOffer.dossierHash` equals the dossier the host holds now and the result committed;
`stale` — the host holds a newer dossier than `lastOffer`; `refreshing` — a live refresh lease holds the record
(`refreshing.until` in the future; an expired lease is free and the status reads `stale`); `held` — the last offer was
refused and `held` says why (V08 §3.9). The record is written only through the client's store calls (V08 §3.7, V08 §3.14),
each a compare-and-set on the `logHead` the host holds (for the party, on `party.rev`), so two writers never interleave.
`party` starts `{ tier: 'public', places: [], rev: 0 }` at `create`; `backups` starts empty.

### 2.2 The bridge additions and the host client

The envelope, transport, `re` correlation, source-window check, before-`ready` queue and the port's and the clerk's
vocabulary — which messages exist, who may send each and what each does — are §11.3's (items 472, 473). The message
TYPES are this volume's, and the host client's API:

```ts
// host → PLAT (owner or editor sessions only for dossier.offer, doc.snapshot, host.state and party.render: §11.3)
type DossierOffer = { type: 'dossier.offer'; body: {
  dossier: unknown;              // the whole dossier object, structured-cloned; never a change list (§7.7 item 1)
  dossierHash: string;           // the client's hashDossier(dossier) (V08 §3.2)
  host?: { week?: number; realm?: RealmBlock; line?: string;
    customLibrary?: CustomLibraryEntry[] /* V08 §2.8; only the entries whose definition the dossier materialised (V08 §3.13 (8)) */ };   // HostContext's fields that travel with an offer (§14)
  create?: { mapId: string } } };   // only when the host has no map record for this settlement
type DocSnapshotRequest = { type: 'doc.snapshot'; body: {} };   // creation, compaction, upgrade, rebase (V08 §3.7)
type HostState = { type: 'host.state'; body: {         // session memory only (§11.3; V08 §3.1 step 7 (c))
  party?: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: after each doc.load and whenever the host's copy changes
  backups?: { logHead: string; at: string }[];         // MapRecord.backups' heads, newest first: the restore dialog lists the map edits after backups[0].logHead (V08 §4.2)
  partyPicturesAt?: string;                            // partyPictures.at: the history panel's "pictures last drawn" (V08 §4.6)
  playersView?: boolean } };                           // MapSession.seePlayersView(on) (V08 §3.14 (5))
type PartyRender = { type: 'party.render'; body: {
  party: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: resolved by the module (V08 §3.14 (1))
  since?: { seqAt: number; partyRev: number; outputVersion: string; drawDigest: string } } };   // the stored set's stamp: the unchanged test (V08 §3.14 (3))
// base messages extended (§11.3): doc.load gains audience?: AudienceWord; doc.changed gains encoded: ArrayBuffer[] (each event's canonical CBOR, in order),
//   seqAfter: number, logHeadAfter: string; export.request gains displayNames?: Record<string /* binding key */, string>, knowledge?: Admission (item 572's type)
//   and bundle?: true (the export bundle's scene route from M-SF, V08 §5.4 (2)); ready gains protocol and adapters (§11.3)
// PLAT → host
type DossierResult = { type: 'dossier.result'; re: number; body: {
  status: OfferStatus;
  dossierHash: string;           // echoes the offer's
  baseLogHead?: string;          // 'absorbed': the head the events were computed on — the host appends only if it is current
  events?: EditEvent[];          // 'absorbed': the dossier events and epochs, author 'host', session 'host:port', in log order (§7.7 items 1, 6)
  encoded?: ArrayBuffer[]; seqAfter?: number; logHeadAfter?: string;   // 'absorbed': what the store appends and the head it moves to
  created?: SnapshotBlock;       // 'created': the new document and its metadata
  factHash?: string; week?: number | null;   // the carried facts after this result (§7.7 item 12)
  report: PortReport;            // §14's, with V08 §2.4's notes
  held?: { code: PortRefusalCode; message: string; reason: { key: string; args?: Record<string, string | number> } /* the `held` note's msg (V08 §3.9) */ } } };
type DocSnapshotReady = { type: 'doc.snapshot.ready'; re: number; body: SnapshotBlock };
type ModuleStatus = { type: 'module.status'; body: {
  phase: 'booting' | 'loading' | 'verifying' | 'ready' | 'absorbing' | 'held' | 'upgrade-available' | 'error';
  detail?: string /* a host.* catalogue key drawn beside its phase's row: B10's host.recovered.*, B20's host.verify.mismatch (V08 §3.9); else absent */;
  progress?: number /* 0–1 */; outputVersion?: string } };
type HostAction = { type: 'host.action'; body: {       // a header control's click, from an owner's or editor's frame only (V08 §4.2)
  action: 'refresh' | 'restore' | 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings';
  args?: { places?: string[] /* reveal, hide: the selected places, PartyKnowledge.places' form */;
    undo?: true /* restore party.prev: "Hide again" (hide), "Reveal again" (reveal), the tier's undo (partyTier) */; tier?: 'public' | 'local' /* partyTier */ } } };
  // surfaced as MapSession.on('action'); the host runs the V08 §4.2 row's operation with its existing calls; the client drops, and reports, an action whose row the role does not hold
type PartyRendered = { type: 'party.rendered'; re: number; body:   // its set's partyRev is the request's party.rev (V08 §3.14 (3))
  { status: 'rendered'; set: PartyPictureSet /* stored as handed with MapStore.putPartyPictures */ } | { status: 'unchanged' /* nothing stored */ } };
type AudienceWord = 'dm' | 'co-dm' | 'player' | 'anonymous' | 'gallery' | 'dm-share';   // §14's audience table's left column; only 'dm' and 'co-dm' ever load a document
```

`Admission` is item 572's type (`'public' | 'local' | 'secret' | { tier: 'public' | 'local'; places: Id[] }`), generated
from `@plat/api`'s bridge schema like every message type: it lowers the requester's key for one export and never raises
it — a tier alone is read with the requester key's places, a key form is a key in its own right (§11.1 *Knowledge*).

The **host client** is the one piece of our code in SettlementForge's bundle — dependency-free, its message types
generated from `@plat/api`'s bridge schema at build time and copied, never imported (item 507):

```ts
// @plat/bridge-client
interface MapHostConfig {
  moduleOrigin: string;          // the origin serving embed.html: SettlementForge's hosting decision, read as an input (J121; V08 §11 Q1)
  embedPath: string /* '/embed.html' */; protocol: 2;
  bootTimeoutMs: number /* 20 000 */; replyTimeoutMs: number /* 60 000 for dossier.result and doc.snapshot.ready, 15 000 otherwise */;
  backupDepth: number;           // integer ≥ 0: how many previous snapshots a record keeps — SettlementForge's backup decision (J121; V08 §11 Q2); read by replaceSnapshot (V08 §3.7)
  quotaBytes?: number;           // the storage a map record may use under the account's plan — SettlementForge's save-limit decision (J121); absent: none checked (V08 §3.7)
  locale?: string;               // BCP 47: SettlementForge's interface language for this user (J121); the frame's message catalogue (V08 §5.5); absent: the catalogue's source language
  store: MapStore;               // the host's implementation of the record's reads and compare-and-set writes
  statusText?: Record<string, string> }   // the host's own strings for host.* keys; the defaults are generated from V09's host.* catalogue in the frame's locale
interface MapStore { read(settlementKey: string): Promise<MapRecord | null>;
  commitEvents(mapId: string, expectedHead: string, encoded: Uint8Array[], seqAfter: number, logHeadAfter: string, absorbed?: MapRecord['absorbed']): Promise<'ok' | 'stale'>;
  replaceSnapshot(mapId: string, snapshot: SnapshotBlock, backupDepth: number): Promise<'ok' | 'stale'>;
    // precondition: snapshot.logHead is the record's head or the logHeadAfter of an event in its tail; keeps the tail's suffix after it; with backupDepth ≥ 1 moves
    // the old snapshot to backups[0] with the removed segment as tailAfter and drops the oldest beyond backupDepth; with 0 keeps none (V08 §3.7)
  create(record: MapRecord): Promise<'ok' | 'exists'>; putThumbnails(mapId: string, t: MapRecord['thumbnails']): Promise<void>;
  setParty(mapId: string, expectedRev: number, party: PartyKnowledge): Promise<'ok' | 'stale'>;
  putPartyPictures(mapId: string, pics: PartyPictureSet): Promise<'ok' | 'older'>;   // 'older' (nothing written) when the stored set's (seqAt, partyRev) pair is not lower than this one's
  setStatus(mapId: string, patch: Partial<Pick<MapRecord, 'status'|'held'|'lastOffer'|'refreshPending'|'refreshing'>>): Promise<void> }
interface MapHost { mount(el: HTMLElement, s: MountSpec): Promise<MapSession>;   // audience 'dm' or 'co-dm' only; any other word is refused before a frame exists
  mountParty(el: HTMLElement, s: { settlementKey: string }): Promise<PartyView>;   // a player's tab: stored pictures only, no frame, no module (V08 §3.14)
  refresh(queue: { settlementKey: string; dossier: unknown; week?: number; realm?: RealmBlock; customLibrary?: CustomLibraryEntry[] }[], o?: { signal?: AbortSignal; onEach?: (k: string, s: OfferStatus) => void }): Promise<void>;   // V08 §3.4
  hashDossier(dossier: unknown): Promise<string>;   // V08 §3.2
  realmBlockFrom(p: RealmPlacements): RealmBlock;   // V08 §3.11
  audience(word: AudienceWord): { role: 'owner'|'editor'|'viewer'|null; knowledge: 'public'|'secret' } }   // §14's table
interface MountSpec { settlementKey: string; dossier: unknown; audience: 'dm' | 'co-dm'; session: string; week?: number; realm?: RealmBlock; customLibrary?: CustomLibraryEntry[] }
interface MapSession { offer(dossier: unknown, o?: { week?: number; realm?: RealmBlock; customLibrary?: CustomLibraryEntry[] }): Promise<OfferStatus>;
  exportPicture(fmt: 'png'|'svg'|'print', o: { knowledge?: Admission; displayNames?: Record<string, string>; opts?: unknown }): Promise<ArrayBuffer>;
  exportScenes(o: { formats: ('dd2vtt' | 'foundry')[]; knowledge?: Admission; displayNames?: Record<string, string>; opts?: unknown }): Promise<{ file: string; blob: Blob }[]>;
    // from M-SF (J122; V08 §11 Q3): the chosen scene exports as opaque blobs for SettlementForge's export bundle, packaged unread (V08 §5.4 (2))
  query(q: unknown): Promise<unknown>;   // the host clerk (V08 §4.4): the answer arrives ALREADY projected by the module (V08 §5.4 (3)); the client holds no projection code
  preview(events: unknown[], o?: { view?: boolean; proposal?: HostProposal /* item 473's proposal body, generated from the bridge schema */ }): Promise<unknown>;   // the reply projected as query's
  setParty(p: { tier?: 'public'|'local'; reveal?: string[]; hide?: string[]; prev?: true /* restore party.prev */ }): Promise<'ok'|'stale'>;
    // owner or editor: writes MapRecord.party, then re-renders the party pictures (party.render, V08 §3.14 (3)) and re-sends host.state { party }
  seePlayersView(on: boolean): void;   // posts host.state { playersView: on }: a display filter (V08 §3.14 (5)); no view-state write, no store write, no event
  setClerk(config: ClerkConfig /* item 473's clerk.config body, generated from the bridge schema */): void;   // sends clerk.config
  setView(patch: Record<string, unknown>): void;
  on(ev: 'status'|'report'|'selected'|'action'|'clerkNeedsToken'|'clerkProposal'|'clerkConfigRefused', h: (x: unknown) => void): () => void;
    // action: a host.action body (V08 §4.2); clerkProposal: clerk.proposal { id, status, seqs? }; clerkConfigRefused: clerk.config.refused { reason } (item 473)
  switchTo(s: MountSpec): Promise<void>;   // reuses the frame (V08 §3.1); the same fields as mount
  close(): void }
interface PartyView { refreshFromStore(): Promise<void>; close(): void }   // pan and zoom over the stored levels; the caption host.party.asOf (V08 §5.1)
type RealmPlacements = { self: { x: number; y: number }; partners: { key: string; x: number; y: number }[]; mPerRealmUnit: number;
  latitude?: { degAtY0: number; degPerUnitY: number /* the realm map's latitude scale; y grows southward */ };
  cell?: { terrain?: string; river?: boolean; coastSideDeg?: number; climate?: string /* the climate sub-digest's word (item 117) */ } /* from the campaign's spatial digest */ };
```

### 2.3 The binding in practice — the carried facts and their hash

`DossierBinding` — with the port's fields `adapter`, `quarantined` and `notes` and the `absorbed` retention (item 390)
— `CarriedFacts` and the key law are §7.7 item 12's. This volume owns the carried shape, the port's own keys, the
fact hash and the binding row's life.

```ts
// the carried value per element kind: exactly the digest subset the diff compares (V08 §3.5), canonical field order
type CarriedFact =
  | { k: 'settlement'; name: string; tierWord: string; population: number; wealth: string /* wealth.label (receipt F9; V08 §3.5's `wealth` row) */ }
  | { k: 'institution'; name: string; kindLabel: string; kind?: string; category: string; role?: string; tags: string[]; count?: [number, number]; openTop?: boolean;
      step?: LadderStep /* V11 §2.6 */; lesserOf?: string /* the greater's key when this record was merged as its member (item 108 (c)) */; popQualifier?: number;
      districtScale: boolean; facets: DossierInstitution['facets']; forbidden: string[]; state: DossierInstitution['state']; fate?: string; inactive: boolean;
      impairments: { type: string; severity: number; covert: boolean }[]; knownTo?: 'public'|'local'|'secret'; renamedFrom?: string; members?: number /* a collective record's placed count, a map fact kept for the member keys */ }
  | { k: 'power'; name: string; category: string; standing: number; governing: boolean; controlled: string[] }
  | { k: 'relation'; kind: string /* the line's type word */; trend: string /* stable, declining, escalating */; sign: -1 | 0 | 1; strength: number; hidden: boolean }
  | { k: 'notable'; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }
  | { k: 'condition'; archetype: string; source: 'condition' | 'stressor'; severity: number; severityBand?: string; status: string; sinceWeek?: number; untilWeek?: number }
  | { k: 'resource'; state: 'available'|'depleted'|'removed'|'discovered'; custom: boolean }
  | { k: 'quarter'; name: string; phrase: string; landmarks: string[] }
  | { k: 'government'; name: string; governingPower?: string; legitimacy?: number }
  | { k: 'trade'; partners: { key: string; relationship: string }[]; links: { good: string; flow: 'import'|'export'; partner: string }[]; entrepot: boolean;
      goods: { exports: string[]; imports: string[]; transit: string[] } /* goods keys after goodWords (V08 §3.5 (6)) */; incomeShares: Record<string, number> }
  | { k: 'port-values'; crime: number | null; importPct: number | null; foodChain: Record<string, boolean> | null; legitimacy: number | null;
      latitudeDeg: number | null /* DR29's value when the realm block arrives after creation */; threats: string[] /* the `threats` row's neutral keys, sorted */;
      readiness: string | null /* the `readiness` row's neutral band (item 114; V08 §3.16 (2)) */ }
  | { k: 'deity'; key?: string; name?: string }
  | { k: 'chain'; needKey: string; resource?: string /* a res: key, else 'name:'+name */; processors: string[] /* binding keys, else 'name:'+name, flow order */;
      outputs: string[] /* goods keys, sorted */; upstream: string[] /* chain:cat: keys */; status: string /* the neutral key (V08 §2.6 `chainStatus`) */; entrepot: boolean }
  | { k: 'dependency'; severity: number /* by `dependencySeverity` */; affected: string[] /* the services it names, sorted */ }
  | { k: 'calamity'; type: string; week: number; deaths: number; severity: 'minor'|'moderate'|'major'|'catastrophic'; targets: string[] /* binding keys */ }
  | { k: 'evidence'; kinds: string[] /* the ruin-evidence kinds present, sorted (V08 §2.6 `ruinEvidence`) */ }
  | { k: 'site'; terrain: string; access: string; threat: string; magic: string; culture: string; climate?: string; isolation?: string /* frozen after creation (§7.7 item 10; V08 §3.5) */ }
  | { k: 'history'; ageYears: number | null; atWeek: number | null /* HostContext.week when ageYears was read */;
      events: string[] /* `<type>:<slug(name)>` of history.events, sorted */; ancientRuin: boolean /* frozen after creation (V08 §3.15) */ }
  | { k: 'tradition'; name: string; kind: string; weeks: [number, number]; staging: string[]; deity?: string };   // item 118 (V08 §3.16 (5))
```

**Keys of the carried map.** §7.7 item 12's binding keys for settlement, institution (a collective record once, its
members `#k` in the binding rows only), power, notable, condition, resource, quarter and government, and the custom keys
(item 256); the port's own singletons — `trade`, `port-values`, `deity`, `evidence`, `site`, `history` — and pairs:
`relation:<a>|<b>` for a power relation (its two power keys in code-point order, §2.7's `PowerRelation.key`; unordered,
because the line's pair order is not a direction — J-V8.52); `cond:stress:<type>` for a stressor (it has no id);
`chain:cat:<chainId>` for one of SettlementForge's own chains (disjoint from the custom `chain:<chainId>`, V08 §2.8);
`dep:<institution key>|<slug(resource)>` for a dependency; `calamity:<week>:<slug(name)>` for a calamity;
`trad:<id>` for a tradition (its record id, else `trad:name:<slug(name)>`). A power's `rename-faction` re-keys its relation
keys by the same `rebind` that re-keys the power (V08 §3.6 (5)), never a removal and an addition.

**`factHash`** = H128 over the canonical CBOR of the carried map, keys sorted by code point, numbers as the digest holds
them (a severity rounded to 1/1 000, a standing to 1/10 000 — the digest's own rounding, V08 §3.5 (2)), so a dossier whose
only change is below that resolution hashes equal. **Retention of `absorbed`:** every entry keeps `{ seq, week,
factHash }` forever (16 B of hash each: a century of weekly absorbs is under 100 KB, and a host's undo can match any of
them, F22); `changeIds` stay on the newest 64 entries only, and the trim is **part of the fold** — folding a
`dossierFacts` event appends its entry and then removes `changeIds` from every entry older than the newest 64 — so the
stored block and the block the fold rebuilds from the log are equal at every seq (§2.9's load check; T-V8-5). The report
reads older change ids from the log's `dossierChange` envelopes.

**A binding row's life.** *Create*: `creation` writes one row per dossier element it placed or carried (collective
members `#1…#n`, n the placed count; a ladder lesser merged into its greater, item 108 (c), becomes a row of the greater's
members — or, where the greater is a new thing, an alias row on it, or the row on the churchyard `cross` a pin lesser binds
at a village rung, V08 §3.5.1 (c)); `absorb` writes a row for each addition. *Read*: `factTier` (§2.8), the diff, the
oracle's answers (V08 §4.4). *Persist*: the dossier block (§2.9), outside the model digest. *Regenerate*: a scoped
regeneration re-places members under their addresses (§6.3), so rows follow the addresses and never change. *Undo*: a
dossier event is no undo target (§7.4); a map `undo` that would un-place a dossier element is refused (§7.7 item 2), so a
row never dangles. *Migrate*: rebuilt from the log's dossier events at first load (§7.5); an adapter-version remap or a
line migration re-keys rows by V08 §3.8 and writes a `line_migrated` note. A row whose element is removed keeps its key
and its entity (the retired assignment), so a re-opening re-binds to its own former building (F6).

### 2.4 The adapter manifest, the registry, the field table and the port's notes

Each `adapters/sf/<line>/` folder (§14) exports one manifest beside its pure digest function (item 508):

```ts
// @plat/port
interface AdapterManifest { id: 'sf'; line: string /* the canonical id, the folder name: 'fp-integration-2026-09-23' (item 512) */; version: string /* the adapter's semver */;
  commit: string /* the SF commit it was cut against: '5d699cc68' */;
  requiredKeys: string[] /* the top-level keys every dossier of the line carries (below) */;
  optionalKeys: { key: string; read: boolean }[] /* keys a lived or custom dossier may add; read: false → dropped and noted ignored_key */;
  keyList: string[] /* every host path the adapter reads, receipt paths included: the field table's read rows (below), §14's lint list */;
  recognise(raw: unknown): { accept: boolean; evidence: string[] } /* pure; reads only keyList paths: every requiredKeys key present, schemaVersion 1,
     simulationVersion 1, the `id` form `s_` + 16 hex, the institution record shape; an EXTRA top-level key is accepted — never a refusal */;
  limits: { maxBytes: number /* 8 MiB of JSON */; maxDepth: number /* 32 */; maxRecords: number /* 2 000 institutions, 500 notables, 200 of any other list */; maxString: number /* 16 KiB */ };
  vocabulary: Record<string /* a tables/dossier/* table */, string /* the table version this adapter's words were written against */>;   // release row R2 checks it against the fixtures' tablePins
  remaps: { fromVersion: string; fields: { kind: CarriedFact['k']; path: string /* a CarriedFact field */ }[] }[];   // digest changes between adapter versions (V08 §3.8)
  fromLines: { line: string; keys: { rule: 'identity' } | { rule: 'table'; rows: { from: string; to: string }[] } }[] }   // binding-key migration from an earlier line (V08 §3.8)
interface AdapterRegistry { register(m: AdapterManifest, digest: (raw: unknown, host?: HostContext) => PortResult<DossierDigest>): void;
  select(raw: unknown, o: { line?: string /* HostContext.line */; bound?: string /* the document's DossierBinding.adapter.line; absent at creation */ }):
    { status: 'ok'; manifest: AdapterManifest; defaulted?: boolean } | { status: 'refused'; code: 'E_LINE_UNSUPPORTED'; candidates: string[] } }
```

`E_OTHER_SETTLEMENT`, the port's note kinds and `PortNote`'s `msg` and `keys` are §14's (item 508). A note's IDENTITY is
the first 16 hex digits of H128 over the canonical CBOR of (kind, msg, keys sorted); its CLASS — event, standing or
report — and its words are V08 §4.6's table's, and the class decides where it is kept (V08 §3.6 (4)). This volume adds
two kinds for its new readings, each with its class and row in V08 §4.6: `frozen_fact_changed` (report; a later dossier
changes a creation-only fact, V08 §3.5) and `history_gap` (report; a history the replay needs is missing — a demoted
dossier without `peakTier`, or no age — V08 §3.15).

**The first line's key sets** (CONFIRMED on the 35 births and 12 after-tick dossiers generated on the pinned line;
`research/sf/dossier-outputs.md` §3). `requiredKeys` — the 41 keys every birth carries: `_config`, `_seed`,
`activeConditions`, `aiOverlays`, `arrivalScene`, `availableServices`, `coherenceNotes`, `config`, `conflicts`,
`culturalIdentity`, `culturalNotes`, `defenseProfile`, `economicState`, `economicViability`, `factions`,
`generationCoherenceReceipt`, `generatorVersion`, `history`, `id`, `institutions`, `isolationSupport`, `name`,
`neighborRelationship`, `npcs`, `population`, `powerStructure`, `pressureSentence`, `prominentRelationship`,
`relationships`, `resourceAnalysis`, `schemaVersion`, `settlementReason`, `simulationTrace`, `simulationVersion`,
`spatialLayout`, `stress`, `stressors`, `structuralSuggestions`, `structuralViolations`, `tier`, `userCanon`.
`optionalKeys`, read: `customContentProvenance`, `customContentRoster`, `populationHistory`, `resourceHistory`,
`tierHistory`, `institutionHistory`, `calamityHistory`, `traditions` (item 118); not read: `urbanFabric` and `npcLadder`,
with a saved dossier's `mapEdits` and an older save's `fogSessions` (the field table's `ignored` rows). A lived dossier
carries 41 to 47 keys (one week: `populationHistory`; a year:
`resourceHistory` too; the lit year: `calamityHistory`, `npcLadder`, `traditions`, `urbanFabric`), and every one is
recognised (T-V8-31). An unknown top-level key — one neither list names, a later line's addition — is accepted, dropped
by `digest` into `ignored` and noted `ignored_key`; the release checklist (R9) adds it to a list when the fixtures show it.

**THE ADAPTER'S FIELD TABLE** (fp-integration-2026-09-23). Every SettlementForge path the port reads, the
`DossierDigest` field it fills and the derivation row or reader it feeds; every path the port does not read — and every
SettlementForge source it never reads that lies outside the dossier, written with no dossier path — in an `ignored` row
with §7.7 item 1's reason. It is the one list: `AdapterManifest.keyList` is its read rows, §14's key-list lint and
T-V8-20's ignore clause read it, and the CLOSED-DIGEST RULE holds — inside a record the port reads, a field no row names is
not read (§7.7 item 1).

| SettlementForge path | digest field | feeds |
|---|---|---|
| `id` | `settlement.key` (`settlement:<id>`) | §7.7 item 12's key law; `E_OTHER_SETTLEMENT` |
| `name` | `settlement.name` | the title plate (§9.5); DR14's protected names |
| `tier` | `settlement.tierWord` | §9.5's title word (§7.7 item 15); receipt F8 |
| `population` | `settlement.population` | DR23, DR7, DR9; `LadderRouter` (V08 §3.10) |
| `_seed` | `settlement.seed` (H32, §14's port item 2) | the recipe's seed; the host's seed itself never stored |
| `schemaVersion`, `generatorVersion`, `simulationVersion` | `settlement.versions` | `recognise`; V08 §3.8's version checks |
| `config.terrainType` | `site.terrain` | DR1 (the `site` row), DR19, DR31, DR39's bare rock; item 117's climate fallback (V08 §3.16 (4)) |
| `config.tradeRouteAccess` | `site.access` | DR1, DR2, DR3 (the `access` row); the toll bridge's access word (V08 §2.6b (3)) |
| `isolationSupport.status`, `.paths[].type` | `site.isolation` | DR19 (the `isolation` row) |
| `config.monsterThreat` | `site.threat` | DR2 (the `threat` row); item 114's need |
| `config.magicLevel` | `site.magic` | `CircumstanceSlice.magic` (the `magic` row) |
| `config.cultureProfileKey` | `site.culture` | DR5, DR14, DR15, DR29 (the `cultures` row); the `era` row (V08 §2.6); DR34's culture modifier |
| `config.nearbyResources`, `.nearbyResourcesNative`, `.nearbyResourcesDepleted`, `.nearbyResourcesState`, `config.nearbyResourceDefinitions` | `site.deposits`; `customResources` (V08 §2.8) | DR1 (the water deposits), DR19, DR30, DR31, DR40 (`oasis_water`); `DepositSite` |
| `config.peakTier` | `history.peakTier` | DR36 (V08 §3.15) |
| `config.primaryDeitySnapshot` (`_deityRef`, `name`) | `religion.deityKey`, `.deityName` | DR14 (the temple's dedication); the `deity` fact; receipt F16 |
| `institutions[]` — `id`, `name`, `catalogId`, `category`, `priorityCategory`, `tags`, `status`, `inactive`, `worldPulseFate`, `remnantReason`, `impairments[]` (`type`, `severity`, `causeEventId`, `covert`), `knownTo`, `facets`, `forbiddenResources`, `foundedAt`, `demotedFrom`, `promotedFrom`, `createdByEventId`, `removedByEventId`, the `…ByWorldPulseOutcomeId` stamps, and the custom fields of V08 §2.8 | `institutions[]` (every `DossierInstitution` field, V08 §2.5); `walls` (the `@wall` kinds' records); `receipts` | DR9, DR10, DR12, DR15–DR18, DR20, DR24, DR25, DR30–DR35; item 108's ladders; DR2 (`walls`); receipts F1–F5, F15 |
| `economicState.prosperity` | `wealth.label` | DR6, DR7 (the `wealth` row); V08 §3.5's `wealth` row; item 114's means (V08 §3.16 (2)) |
| `economicState.incomeSources[]` (`source`, `percentage`) | `economy.incomeSources` | layer 2's economy slice (the `sectors` row; item 78) → DR7, DR13; DR3's toll and duty rows |
| `economicState.primaryExports`, `.primaryImports`, `.necessityImports`, `.transit`, `.isEntrepot`, `.tradeLinks[]` | `economy.exports`, `.imports`, `.transit`, `.entrepot`, `.tradeLinks`, `.goods` | DR3, DR4; the supply web's trade ends (DR33); the `trade` fact; receipt F14 |
| `economicState.compound.inst.hasWalls` | `walls.flagged` | DR2 |
| `economicState.foodSecurity.importPct`, `.chains` | `economy.foodImportPct`, `.foodChains` | DR19; `PortValues.importPct`, `.foodChain` (§4.9) |
| `economicState.activeChains[]`, `.tradeDependencies[]`, `.customChains[]` | `economy.chains`, `.dependencies`; `customChains` | DR33 → the supply web (item 105 (i)); `CustomChainRecord` (V08 §2.8) |
| `economicState.safetyProfile.blackMarketCapture`, `powerStructure.criminalCaptureState` | `security` | `PortValues.crime` (the `crime` row) → the crime scalar DR16 and DR17 read (item 88) |
| `neighborRelationship`, `neighbourNetwork[]` | `economy.partners` | DR3 (`TradePartner.relationship`); the `threats` row |
| `powerStructure.government`, `.publicLegitimacy.score` | `government.name`, `.governingPower`, `.legitimacy` | DR11 (the `government` row); `PortValues.legitimacy`; item 115's lord (V08 §3.16 (3)); receipt F11 |
| `powerStructure.previousGovernments[].tick` | `receipts`, under the government's binding key | §4.11's first dating rung for a change of government (receipt F11); the rest of each entry is ignored (below) |
| `powerStructure.factions[]` (`faction`, `category`, `power`, `isGoverning`, `controlledInstitutions`), `powerStructure.factionRelationships[]` (`pair`, `type`, `direction`) | `powers[]` with `relations` | DR11, DR12, layer 2's `PowerStanding` (item 79); `PowerRelation` (the `relations` row); receipt F10 |
| `npcs[]` — `id`, `name`, `role`, `category`, `factionAffiliation`, `institution`, `importance`, `status`, `replacedBy` | `notables[]` | the dossier-backed `Person` (V08 §3.11), DR22's exception (a notable is the dossier's, never derived from the households); `importance` → the order of V10's people answer and V09's person card; receipt F17 |
| `spatialLayout.quarters[]` (`name`, `location`, `landmarks`) | `quarters[]` | DR5's quarter claims (§7.7 item 16; the `quarters` row), DR10's landmarks (the `landmarks` row), DR14 |
| `activeConditions[]` (`id`, `archetype`, `severity`, `severityBand`, `status`, `triggeredAt.tick`, `duration`) | `conditions[]` | `ConditionOverlay` (the `conditions` row); DR21; receipt F12 |
| `stressors` (null, one object or an array) | `stressors`, normalised into `conditions[]` (`source: 'stressor'`) | `ConditionOverlay` (`cond:stress:`); the `threats` row |
| `history.age`, `.founding.age`, `.historicalEvents[]` (`type`, `templateType`, `yearsAgo`, `severity`, `name`, `anchored`, `tick`) | `history` | `HistoryHint` (the `historyScars` row); DR30, DR32; DR36–DR39 (the `historyEvents` row; V08 §3.15) |
| `tierHistory[]` (`fromTier`, `toTier`, `direction`, `outcomeId`) | `history.tiers` | DR36's evidence; receipt F8 |
| `populationHistory[]` (`tick`, `population`) | `history.population` | DR36's evidence; DR7's week |
| `calamityHistory[]` (`name`, `type`, `tick`, `deaths`, `exodus`, `targets`) | `calamities` | DR28 (`EpochInputs.events`); DR36's evidence; receipt F5 |
| `institutionHistory[]` (`tick`, `year`, `fate`), `resourceHistory[]` (`tick`, `state`) | `receipts` | the receipts' weeks (F1–F3, F13) |
| the root's `destroyedByEventId`, `lifecyclePatch` | `history.lifecycle` | DR38 (V08 §3.15); receipt F20 |
| `defenseProfile.readiness.label`, `.score` | `defence.readiness` | item 114's generation-time condition row and need (V08 §3.16 (2)) — the one part of `defenseProfile` read |
| `traditions[]` (`id`, `name`, `type`, `window`, `staging`, `deity`) and `customContentRoster.traditions` | `traditions` | item 118's traditions row (V08 §3.16 (5)) |
| `customContentProvenance`, `customContentRoster` (institutions, services, resources, supply chains) | `custom`, `customDefs`, `customServices`, `customResources` | item 104 (V08 §2.8, V08 §3.13) |
| `availableServices` (its `custom` entries) | `customServices` | `CustomServiceRecord` (V08 §2.8) |
| `HostContext.week` (the campaign's `calendar.elapsedWeeks`) | — (a host input, §14) | §4.11's last dating rung; item 117's year position (V08 §3.16 (4)) |
| `HostContext.realm` (placements, realm scale, latitude scale, the spatial digest's cell words and climate word) | — (`RealmBlock`, §14) | DR1, DR3, DR19, DR29; item 117's climate (V08 §3.11, V08 §3.16 (4)) |
| `urbanFabric`; `mapEdits` (the legacy map's container — on every saved dossier at least its `{ layoutLawVersion: 2 }` stamp); `fogSessions` (an older save's reveal sets, kept inert) | `ignored` | none — a host's own map-side layers (§7.7 item 1) |
| `worldState.spatialLedgers.*` — every sub-ledger, the spatial substrate included | — (no dossier path: SettlementForge's campaign state; the realm block carries only the frozen `spatialDigest`'s words, item 396) | none — a host's own map-side layers (§7.7 item 1) |
| SettlementForge's derived reads — the district profile, the map profile, the causal state, the system state, capacities, daily life, threat profiles, the spine | — (no dossier path: SettlementForge computes them on read or keeps them outside the dossier) | none — a host's derived reads (§7.7 item 1) |
| `simulationTrace`, `aiOverlays`, `generationCoherenceReceipt`, `config.priority*` | `ignored` | none — the host's generation log, internals and sliders (§7.7 item 1) |
| `relationships`, `prominentRelationship`, `conflicts`, the top-level `factions` (the NPC social groups), `npcLadder` | `ignored` | none — the host's NPC social groups and the NPC layer beside them (§7.7 item 1) |
| `_config` | `ignored` | none — raw inputs: the resolved `config` is read (§7.7 item 1) |
| `resourceAnalysis`, `defenseProfile` (all but `readiness`), `stress` (the alias of `stressors`, read once as `stressors`) | `ignored` | none — copies of institution records and generation scores (§7.7 item 1): the deposits come from `config.nearbyResources*`, the walls from the `@wall` kinds rows, the defence from `monsterThreat` |
| `coherenceNotes`, `structuralViolations`, `structuralSuggestions`, `economicViability` | `ignored` | none — the host's own verdicts (§7.7 item 1) |
| `userCanon`; the lived `campaignState.eventLog`, `_userEdits`, `dmLayer`, `locks` | `ignored` | none — the lived keys (§7.7 item 1) |
| `arrivalScene`, `culturalIdentity`, `culturalNotes`, `pressureSentence`, `settlementReason`, `spatialLayout.layout`, `spatialLayout.tradeAccess` (the access word's prose; the word itself is `config.tradeRouteAccess`) | `ignored` | none — prose beyond a description seed (§7.7 item 1) |
| `powerStructure.previousGovernments[]`, every field but each entry's `tick` | `ignored` | none — no mechanism of the set reads a past government (J-A73.06) |

**Selection.** `select` tries, in order: (1) `HostContext.line`, when given and registered — its adapter must accept,
else `E_LINE_UNSUPPORTED`; (2) the document's bound line (`bound`), when its adapter accepts — a map stays on its line
until a `fromLines` migration moves it (V08 §3.8); (3) the single registered adapter that accepts; (4) at a creation with
several accepting and none named, the NEWEST registered line, recorded in the binding and noted `line_defaulted` — a
declared default the report shows, never a silent guess; `E_LINE_UNSUPPORTED` naming the candidates only when none
accepts (J-V8.9). The first registered adapter is `fp-integration-2026-09-23` pinned at `5d699cc68` (J86 Q1; §14).

**The catalogue manifest.** The adapter's build step writes
`plat/packages/tables/src/dossier/catalogue.fp-integration-2026-09-23.json` — each catalogue kind's `catalogId`, name,
tiers and category, read from the pinned line's catalogue, and `ladderPairs: { greater: string; lesser: string[] }[]`,
the ladder file's pairs as data (V08 §3.5.1 (f)) — which V11's `coversManifest` check (every kind has a `kinds` row) and
its ladder cross-check (every committed pair has a `dossier.ladders` row; V11 registry row 77, T-V11-2) read. It carries
names, tiers, categories and pairs of names only; no SettlementForge code is copied.

### 2.5 The digest's additions, the staged-record event and the per-settlement values

**Digest additions** (item 509; §14 names them and cites their types here) — each read by one row:

```ts
// additions to §14's DossierDigest and DossierInstitution
  DossierInstitution.role?: string;          // SF's priorityCategory (adventuring, crafts, criminal, defense, economy, entertainment, exotic, government,
                                             // infrastructure, magic, military, religion): DR12's first input (J-V8.45; item 397)
  DossierInstitution.tags: string[];          // (existing) normalised: lower-case, de-duplicated, in the line's tag vocabulary; an unknown tag kept and noted `unmapped_word`
  DossierInstitution.openTop?: boolean;       // a count range written "(lo-hi+)": members may exceed hi up to V11's per-kind-and-rung cap (V08 §3.5.1)
  DossierInstitution.popQualifier?: number;   // "(10,000+ only)": a population floor kept from the label, never a count (V08 §3.5.1)
  DossierInstitution.qualifiers: string[];    // the non-numeric parenthesised words of the name, case-folded, in order
  DossierInstitution.step?: LadderStep;       // V11 §2.6's type; item 108 (a): from V11's dossier.ladders by kind, else the `qualifiers` row
  DossierInstitution.lesser?: string[];       // the lesser kinds of its ladder row (V11), for item 108 (c)'s merge
  DossierInstitution.mergedInto?: string;     // set when item 108 (c) merged this record into a greater present in the same dossier: the greater's key
  security: { blackMarketCapture?: number /* % of activity */; criminalCapture?: 'none'|'adversarial'|'equilibrium'|'corrupted' };
  government.legitimacy?: number;             // publicLegitimacy.score ÷ 100, in [0, 1]
  notables[].workplaceKey?: string; notables[].powerKey?: string;   // the named institution's and power's binding keys, resolved by name at digest (absent when the name joins nothing)
  powers[].relations: { with: string; kind: string; trend: string }[];   // (extended) the line's type word and its `direction` word (stable, declining, escalating)
  conditions[]: + { source: 'condition'|'stressor'; severityBand?: string };   // (extended) stressors normalised into it (V08 §3.11)
  site.ruinEvidence: { kind: 'ruins'|'ruinedLandmark'|'node'|'leyLines'|'magicalHistory'|'delving'|'undercity'; key?: string /* the record, deposit or event's binding key */; yearsAgo?: number }[];   // DR30 (V08 §2.6a)
  site.threats: string[];                     // the neutral sea-threat keys of the `threats` row (item 106 (d)), sorted
  site.latitudeDeg: number;                   // DR29's value (V08 §3.5)
  site.climate?: string;                      // a `climates` row key from the realm block's climate word (item 117; V08 §3.16 (4)); absent without it
  economy.chains: { key: string /* chain:cat:<chainId> */; chainId: string; label: string; needKey: string;
    resource?: { name: string; key?: string /* res:<deposit key> when resourceKey names a listed deposit */ };
    processors: { name: string; key?: string /* resolved by V08 §3.5 (6) */ }[] /* flow order */;
    outputs: { label: string; goods: string[] /* V11's goodWords over the label by V11 §3.13.5's matching rule; a label matching none resolves to the generic good `import`, noted unmapped_good */ }[];
    upstream: string[] /* chain:cat: keys of upstreamChains */; statusWord: string /* the line's word */; status: string /* the neutral key by `chainStatus` */;
    entrepot: boolean }[];                    // (extended)
  economy.dependencies: { key: string /* dep:… */; institution: string /* binding key, else 'name:'+name */; resource: string; severity: number; affected: string[] }[];   // (keyed)
  economy.goods: { exports: string[]; imports: string[]; transit: string[] };   // goods keys of primaryExports, primaryImports (with necessityImports) and transit by goodWords
  calamities: { key: string /* calamity:<week>:<slug(name)> */; name: string; type: string; week: number /* its tick */; deaths: number; exodus: number;
    severity: 'minor'|'moderate'|'major'|'catastrophic' /* by `calamitySeverity` over deaths ÷ the population at its week */; targets: { name: string; key?: string }[] }[];
  history: + { founding?: { yearsAgo: number } /* history.founding.age */;                    // item 113 (V08 §3.15)
    events[]: + { templateType?: string; anchored?: boolean; key: string /* the `historyEvents` row's neutral event key */ };
    tiers: { from: string; to: string; direction: 'promotion'|'demotion'; week?: number /* the outcome id's week suffix */ }[];   // tierHistory, oldest first
    population: { week: number; population: number }[];      // populationHistory, oldest first
    peakTier?: string;                                       // config.peakTier: SettlementForge's own high-water stamp
    lifecycle?: { died: boolean; deathRef?: string /* the root's destroyedByEventId */; resettled: boolean; resettledWeek?: number /* lifecyclePatch */ };
    ancientRuin?: { name: string; yearsBeforeFounding: number } };   // the opt-in "Fall of …" event that carries the ancientRuin marker
  defence: { readiness?: { label: string; score: number /* 0–100 */; band: string /* the `readiness` row's neutral band */ } };   // item 114 (V08 §3.16 (2))
  traditions: { key: string /* trad:<id> */; name: string; kind: string /* the `festivals` row's kind: religious|market|harvest|water */;
    weeks: [number, number] /* weeks of the sf445 year, 0–51, from and to inclusive; from > to wraps the year's end */; staging: string[] /* keyword keys (V08 §3.16 (5)) */;
    deity?: string; custom: boolean }[];                     // item 118 (V08 §3.16 (5))
// addition to §14's RealmBlock (item 391; item 117)
  RealmBlock.cell.latDeg?: number;            // the settlement's latitude on the realm map, degrees north (+) or south (−); set by realmBlockFrom when the realm map has a latitude scale; DR29's first input
  RealmBlock.cell.climate?: string;           // the campaign spatial digest's climate word for the settlement's cell, when SettlementForge's climate digest is on
```

**The staged-record event.** The staged records of §2.7 — `ConditionOverlay`, `DepositSite`, `PowerRelation`, the
dossier-backed `Person`, `CustomChainRecord` and `CustomServiceRecord`, whose building volume this is — are
created, changed and retired only by §7.1's `dossierRecord` event (item 358; J-V8.15), its lifecycle row §7.4's. This
volume fixes what the port writes into it: `key` is the record's binding key — `cond:<id>`, `cond:stress:<type>`,
`res:<key>`, `res:uid:<localUid>` or `res:derived:<landuse>` (V08 §2.6 `deposits`), `relation:<a>|<b>`, `npc:<id>`,
`chain:<chainId>`, `svc:uid:<localUid>`; `fields` on `put` are §2.7's fields less id, lifecycle and the derived fields
(a `DepositSite`'s `bearingCdeg` and `landUse`, written by S12a, V08 §3.11), a person's `Posting` and `Membership` targets
written as binding keys (V08 §3.11); `retire` ends the lifecycle — a condition's `untilWeek` reached, a deposit removed, a
relation dissolved, a notable dead or gone — the record staying as a tombstone for §6.3's supersedes table. Its author is
`host` and its session `host:port` only; a user's or clerk's is refused F-EDIT `dossier-owned` (§7.7 item 11).

**The per-settlement values** (item 389; J-V8.16). `PortRows.crime`, `.hinterland.importPct` and `.foodChain`, and
`.legitimacy` (§10.2) are per-settlement dossier values that move with time, not vocabulary; a table edit would re-derive
from the table's first reader stage (§7.6), the reshuffle item 22 forbids. So they ride the circumstance slice, like the
typed slices of items 77–79, with three more values that move at epochs — a realm latitude that arrives after creation,
the sea threats and the defence readiness:

```ts
interface PortValues { crime: number | null /* [0, 1] */; importPct: number | null /* [0, 1] */; foodChain: Record<string, boolean> | null; legitimacy: number | null /* [0, 1] */;
  latitudeDeg: number | null /* null: Intent.latitudeDeg (DR29) is in force */; threats: string[] | null /* null standalone: the preset row decides DR2's waterfront */;
  readiness: number | null /* [0, 1]: the `readiness` row's need weight (item 114); null standalone: the threat alone decides need */ }
// CircumstanceSlice.port (§7.7 layer 2): recipe data at creation (the timeline's first entry), epoch data afterwards (§4.11's cadence), every field null standalone.
// The value in force for the base's readers: PortRows.crime / hinterland.importPct / hinterland.foodChain / legitimacy — the current slice's `port` value when not
// null, else the table's (empty in the base: every factor 1, every list empty — T88-1 unchanged); the site latitude — port.latitudeDeg, else Intent.latitudeDeg,
// else 50; DR2's waterfront — port.threats when not null; item 114's need — the slice's threat with port.readiness when not null (V08 §3.16 (2)).
// PortRows keeps its vocabulary rows (impairments, customKinds, farmlandScale) as tables.
```

### 2.6 The dossier row sets, written out

§14 names the row sets and §7.7 states the rules that read them; the base writes out only the status rows, the receipt
rows, the quarter biases and phrases (§7.7 items 13, 14, 16) and the calendar (§4.11). Every other row set's default rows
are these. Each is a versioned `@plat/tables` table (§7.6): SettlementForge's words in the left column, the header naming
the line `fp-integration-2026-09-23`, every cell `{ value, unit, provenance: own }` with `calibratable: false` — a dossier
row set is a derivation rule of the port (item 20 (h)), never calibrated (§13.9 (7); V11 §3.1 rows 63–66, J-V11.65; V12's
R4): a value changes only as a table fix reviewed with V11, V12's register holds no entry for it, and T-V11-37 fails the
build on a `dossier.*` column marked calibratable (J-V8.107). A word the fixtures carry and a table lacks is caught by
T73-10's totality test; the declared fallback is the row marked "else". Every "else …, noted" below writes one
`unmapped_word` note (args: the word; V08 §4.6), and the `kinds` row's `'@none'` a `not_placed` note.

* **`tiers`** (title word; the rung is the population's, DR23): `thorp`, `hamlet`, `village`, `town`, `city`,
  `metropolis` → the same word as the map's title (§9.5); else the word itself, noted. Each row also carries the line's
  age range by tier (`AGE_BY_TIER`: thorp 15–300 years, hamlet 30–120, village 30–250, town 50–300, city 100–500,
  metropolis 200–800) and its midpoint, the founding's age when a dossier carries none (V08 §3.15 (1)).
* **`site`** (`terrain` → S0's site request, DR1; the relief class is S0's `relief` field, §4.2 S0, the one V04's cavern
  rows and fissure gate read, item 109 (a) (1), and item 110 reads for its terraces and its viaduct drop): `plains` →
  relief `plain`, no water beyond the site row's own river chance; `riverside` → relief `auto`, a river through the site,
  its inflow bearing drawn on `blueprint.features`; `coastal` → relief `auto`, a coast, its side drawn on
  `blueprint.features`, a harbour by `access`; `hills` → relief `hilly`; `mountain` → relief `mountainous` (the
  spur-or-terrace forms follow from it), a pass when a `defended_pass` deposit is listed; `forest` → the forest toggle on,
  woods in the hinterland; `desert` → relief `auto` and the arid climate row (item 111; V08 §3.16 (1)): S0's water rows at
  the arid row's chances — a river, a lake and a coast all stay possible — and the oasis exactly when `oasis_water` is
  listed (DR40), the arid row's own oasis chance being a standalone draw only (J-V8.116); `desert`'s arid row also raises
  the aqueduct's chance and need through V11's rows (item 110 (b)); the older words `grassland` → plains, `river` →
  riverside, `swamp` → plains with a marsh land use; else plains. **The water words** — the inputs DR1 lists as "the water
  deposits" and the access word — make their water exist at creation at every terrain, whatever the site row's chance:
  access `river` a river (the river a route), access `port` a coast with its harbour basin (a `desert` with `port` is a
  coastal desert); the deposits `river_fish`, `river_clay`, `river_mills` and `fertile_floodplain` a river;
  `fishing_grounds` the site's coast, else its river, else a lake; `deep_harbour` the harbour chance 1 on the site's coast,
  else a river or lake harbour (§4.2 S1 (6)), and on a site with neither its basin is left out and reported (§5.1 (7));
  `oasis_water` the oasis (DR40), on any terrain (a non-arid site's oasis takes its climate row's trees);
  `marshlands` a marsh land use. The realm cell's river and coast are DR1's own inputs. A water word the relief cannot
  carry (a river forced on a site whose S1 relief has no descent the river can follow) takes S1's F-RIVER rung (§5.2) and
  is reported; it is never dropped silently (T-V8-50).
* **`access`** (`tradeRouteAccess` → gates and through routes, DR2, DR3): `road` 2 gates on 1 through route; `crossroads`
  3–4 gates on 2 through routes; `river` 1–2 gates, a water gate and docks, the river a route; `port` a harbour basin and
  1–2 gates; `isolated` 1 gate on a track-class approach; `none` 1 gate, no through route; `mountain_pass` 2 gates on 1
  route through a pass; else `road`. The gate range is the bar T73-5 reads. Unwalled, a "gate" is a road entry (a junction
  of kind `gate` with no enceinte).
* **`threat`** (`monsterThreat` → `Intent.defence`, DR2): `safe` 0.1, `heartland` 0.2, `civilized` 0.3, `frontier` 0.6,
  `plagued` 0.8; else 0.3.
* **`deposits`** (deposit key → resource family and hinterland land use, DR19): `iron_deposits`, `precious_metals`,
  `gemstone_deposits`, `coal_deposits` → ore / `mine`; `stone_quarry` → stone / `quarry`; `managed_forest`,
  `mountain_timber`, `shipbuilding_timber` → timber / `lumber` and `coppice`; `ancient_grove` → timber / a reserve wood;
  `fishing_grounds`, `river_fish` → fish / `fishery`; `river_clay`, `glass_sand` → clay / `claypit`; `grain_fields`,
  `fertile_floodplain` → fertile / `arable`; `grazing_land`, `alpine_pasture`, `camel_herds` → fertile / `pasture`;
  `date_palms` → `orchard`; `salt_flats`, `desert_salt` → `saltpan`; `marshlands` → a `marsh` land use; `hunting_grounds`,
  `foraging_areas` → `wildwood` and `commons`; `deep_harbour` → the harbour chance 1; `river_mills` → the mill classes on
  the river; `hot_springs`, `hot_springs_mineral` → a bath-house site; `magical_node` → II.6's supply term (V05's node term
  of `h_town`) AND ruin evidence `node` (DR30), its `DepositSite` drawn at V04's `ruinCentre()` when a ruin exists whose
  source is not the node itself, else at DR19's site (item 109 (f)); `ancient_ruins` → the ruin system's existence source,
  evidence `ruins` (DR30; V04 §3.5.0a (1) (a)), its `DepositSite` carrying the surface ruin decoration, which becomes the
  system's surface marker and, where V04 places one, its entrance (item 109 (b)); the mining deposits `iron_deposits`,
  `precious_metals`, `gemstone_deposits`, `coal_deposits` and a copper deposit when the line lists one → also the cavern
  mining test's trigger (DR31; V04 §3.5.2's `mineBoost`); `crossroads_position` → a second through route;
  `defended_pass` → a pass toward one bearing drawn on `hinterland.outside`; `oasis_water` → the oasis (DR40; the `site`
  row's water words); a custom deposit → its custom kind's row; else a `commons` land use, noted. A `depleted` deposit is
  drawn worked out (spoil heaps, a stump field); `removed` draws nothing — a removed `oasis_water` is V06's failing spring
  (V06 W82), never a moved one; `discovered` opens its land use at the next epoch.
  **A land use a record needs** (item 20 (h): derived, never asked). A record whose class — by its `kinds` row — carries a
  hard `near` → `landuse:<k>` row within 0 (V11 §3.5.10: `salt_works` → `saltpan`, `peat_works` → `marsh`), on a dossier
  that lists no deposit opening `<k>` (`salt_flats` or `desert_salt`; `marshlands`, or the `site` row's `swamp`), opens a
  face of that land use as its deposit would: the port puts a `DepositSite` under the key `res:derived:<k>`, family `salt`
  (`saltpan`) or `peat` (`marsh`), state `available`, which S12a sites at DR19's site and whose land use it opens (V08
  §3.11), and the report notes `derived_landuse`. One site per land use, however many records need it. A land use §4.9's
  rings already give derives nothing — `sheepfold`'s `pasture`, and `wildwood`, one of `druid_grove`'s two alternatives;
  the two land uses above are the whole row, and T-V8-18's totality clause fails when a `kinds`-bound class gains a hard
  row to another land use the rings do not give, until this row names it. Its life: it is derived only while no deposit
  opens the land use when the record arrives; a deposit of that land use listed later (a new or `discovered` one) opens its
  own face by the row above and the derived site stays where it stands — least disruption, nothing standing moves; when no
  record needing it remains, it is put `depleted` (drawn worked out) and never removed; its events are the port's
  `dossierRecord` events (no undo target, §7.4). A custom record, whose class is decided at fold after the port has
  written its events (V08 §3.5 (5) (f)), opens none: its hard row takes the base's closest option, reported, and the DM
  may paint the land use (J-V8.95). At a village rung V07 §3.9's claim and the base's S12a read the derived site unchanged.
* **`landmarks`** (a landmark string → the feature that carries its name, a named-feature claim, §7.7 item 16): a string
  ending in `Row` or `Street` → a way's name, lane or secondary class; `Lane` → a lane; `Close` → a cul-de-sac; `Alley` →
  an alley; `Bridge` → a bridge; `Wharf`, `Landing` → a quay; `Common well` → a `well` pin; `Notice post` → a `notice`
  pin; `Slaughterhouse` → the name of the shambles use the roster already places; `Estates`, `Garden District`,
  `Sailors' Quarter` → a sub-area label on the quarter tree; `The Warren (slums)` → the name of an informal cluster or back
  court (items 30, 70); a string ending in `(tavern)` → that tavern use's name; `Drying racks`, `Net mending post`,
  `Beaching ground`, `Timber stacks`, `Tool shed`, `Charcoal pit`, `Alehouse` → village-product rows (a named yard part or
  use there, V07 §2.3; nothing on a town map); else nothing is created for the string (J-M2). The strings are never item
  110 (b)'s dossier landmarks and never count an institution a second time (DR35 reads institution records instead).
* **`distribution`** (an institution record → assignment granularity, DR9; keyed by the record's `kinds` row — its class
  or pseudo-class — and its ladder step, never by a bare name): a pseudo-class routes as the `kinds` shape below states
  (`@housing` → no assignment, DR7's range; `@wall` → DR2's walls list; `@absent:<class>[+<class>]` → S2's zeroed
  classes; `@none`, `@office`, `@seat`, `@layer:*`, `@landuse:*`, `@pin:*` → their readers); step COUNT, or a count range →
  `dispersed` (members `#k`); step GUILD → `building` (the hall — a member `#k` of a guild COUNT record of its family when
  the dossier holds one, V08 §3.5.1 (c)) plus a `dispersed` collective of the trade's members tied to it; step QUARTER, or
  a district-scale record (`districtScale`) → `neighbourhood`, owning the trade's members (V01; item 108 (a); at a village
  rung, V07 §3.10's end claim); step SIZE or REPLACEMENT → `building` (one, scaled by V11's factor); a CUSTOM record, whose
  class is decided at fold (V08 §3.5 (5) (f)) → `building` unless V08 §3.5.1 (e) types its step; every other class →
  `building`.
* **`wealth`** (`prosperity` → `Intent.wealthLevel` and the band the T73-7 bar reads, DR6; over epochs
  `EpochInputs.wealthLevel` through V08 §3.5's `wealth` row; item 114's means): `Subsistence` 0.05 squalid; `Struggling`
  0.2 poor; `Poor` 0.35 poor; `Moderate` 0.5 modest; `Comfortable` 0.65 comfortable; `Prosperous` 0.8 prosperous;
  `Wealthy` 0.95 rich; else `Moderate`.
* **`sectors`** (income source → §10.2's sector, item 78): trade ← `Market Taxes`, `Entrepôt Trade`, `International
  Commerce`, `Port Duties`; taxes and tolls ← `Gate Tolls`, `Toll Revenue`, `River Tolls`, `Court Fees & Fines`; crafts ←
  `Iron & Metalwork`, `Wool & Textile Trade`, `Guild Fees`, `Guild Licensing`, `Apothecary & Alchemy`, `Herbalist &
  Apothecary`; agriculture ← `Agricultural Rents`, `Grain Sales`; extraction ← `Stone Quarrying`, `Timber Trade`; fishing
  ← `Fish & Preserved Produce`, `Fish & Maritime Produce`; finance ← `Banking Fees`, `Financial Services`; religion ←
  `Church Tithes`; military ← `Military Levy`; magic ← `Spellcasting Services`, `Arcane Industry`, `Magical ley lines`
  (named by the line's income data; absent from the 35 surveyed births; it is also ruin evidence `leyLines`, DR30); crime ←
  `Criminal Syndicate Revenue`, `Smuggling Network Revenue`, `Black Market Revenue`; none (dropped, the rest
  renormalised, J-A78.71) ← `Property Rents`; else none, noted. The water / road split of §7.7 layer 2 marks `Port Duties`
  and `River Tolls` water and `Gate Tolls` and `Toll Revenue` road.
* **`government`** (government name → `Government.kind`, DR11): chartered commune ← `Town Council`, `City Council`,
  `Grand Council`, `Guild Council`, `Elder Council`, `Household Council`, `Free Elder Council`, `Elected Reeve`, `People's
  Council`; merchant oligarchy ← `Merchant Guild Council`, `Merchant City Council`, `Grand Guild Consortium`, `Merchant
  oligarchy`; seigneurial ← `Feudal Stewardship`, `Feudal Appointee`, `Noble Governorship`, `Ducal Governorship`;
  ecclesiastical ← `Church Council`; else chartered commune, noted. An `Occupation Authority` power marks the seat
  occupied (a condition overlay, V08 §3.11), never a government kind. The seigneurial kind is item 115's lord (V08 §3.16
  (3)).
* **`powers`** (a power's category and name → `Faction['kind']`, item 79): `economy` → `guild` when the name holds
  "Craft", `company` when it holds "Merchant", "Trade" or "Grain"; `religious` → `religion`; `noble` → `lordship`;
  `government` → `council` for a council, `lordship` for a stewardship or governorship; `criminal` → `criminal`;
  `military` → `military`; `magic` → `arcane`; `other` → `council` for a crisis bloc (`Claimant Bloc A`, `Claimant Bloc
  B`, `Peace Faction`, `War Council`, `Quarantine Council`, `Departure Committee`, `Investigation Faction`, `Third Bloc
  (Neutrals)`, `Rival Faction B`, `Creditor's Representative`, `Reform Congregation`, `People's Council`, `Resistance
  Network`, `Occupation Authority`) and `company` for `Monster Hunters` or `Adventurers`; the name `Unknown Faction
  (hidden)` → `secret: true` with its category's kind; else `council`, noted.
* **`conditions`** (an archetype → its `ConditionOverlay` effects, DR21 and V08 §3.11): `under_siege`, `war_pressure` → a
  siege tint, construction Works paused except fortification repair; `plague`, `plague_onset` → a quarantine tint, Works
  durations × 1.5; `famine` → Works × 1.25, the market activity scalar × 0.8; `mass_migration`,
  `regional_migration_pressure` → item 70's tent clusters at the edge at the next epoch; `occupied`, `vassal_extraction`
  → an occupation mark on the seat; `reconstruction` → the repair share of an epoch's Works × 1.5; `boom` → the
  construction share × 1.3; `bust` → vacancies × 1.3; `resource_strike`, `vein_exhausted` → no record of their own (the
  deposit's state change arrives as its own `resource` fact, F13, which puts the `DepositSite`) and no tint;
  `trade_route_cut` → no tint: the trade slice at the next epoch (F14 carries the partner change); `food_anchor_lost` → no
  tint: the hinterland row at the next epoch (`PortValues.importPct`, `foodChain`); `stressor_residual`, `custom_crisis` →
  no tint, noted; `monster_pressure` → the defence level + 0.2 and wall-repair Works; `religious_conversion` → a temple's
  dedication at the next epoch; `wartime`, `slave_revolt` → the siege tint without the pause; the political archetypes
  (`rebellion`, `insurgency`, `faction_challenge`, `politically_fractured`, `succession_void`, `dominant_npc_removed`,
  `corruption_exposed`, `infiltrated`, `recently_betrayed`, `indebted`, and every `regional_*`) → no tint: the dials at the
  next epoch; else no tint, noted. The row reads the archetype alone: a condition is put whatever its `status` (`stable`,
  `worsening`, `easing` — the line's three words; the list holds only live conditions), and a stressor is read through the
  same row under its type (the fifteen stressor types are all archetype words here).
* **`impairments`** (`PortRows.impairments`' vocabulary): physical — `capacity`, `infrastructure`, `access`,
  `supply_starved` — `conditionSteps` 1 per severity band (≥ 0.34 worn, ≥ 0.67 neglected); non-physical — `legitimacy`,
  `influence`, `wealth`, `staffing`, `corruption` — `conditionSteps` 2 per unit of severity on the institution's own dial
  term (§4.5 (6)); a `covert` impairment is never shown on a public view (DR20).
* **`crime`** (`PortValues.crime`): crime = min(1, 0.6 × `blackMarketCapture` ÷ 100 + w), w by `criminalCapture`: `none`
  0, `adversarial` 0.1, `equilibrium` 0.25, `corrupted` 0.4; both absent → null (the table's neutral).
* **`cultures`** (`site.culture` → DR29's latitude, degrees north): `germanic` 51, `latin` 43 (`mediterranean` an alias),
  `celtic` 54, `arabic` 30, `norse` 62, `slavic` 54, `east_asian` 35, `mesoamerican` 19, `south_asian` 23, `steppe` 47,
  `greek` 38, `mixed` 50; else 50. Each culture's centre of gravity, rounded (J-V8.26).
* **`categories`** (SF grouping → the generic class family DR24 falls back to): `Adventuring` → adventuring; `Crafts` →
  craft; `Criminal` → criminal; `Defense` → garrison; `Economy` → trade; `Entertainment` → entertainment; `Exotic` →
  exotic; `Government` → civic-authority; `Infrastructure` → infrastructure; `Magic` → arcane; `Religious` → worship;
  `Essential` → civic-authority; else trade, noted (an alias family never names a generic class: `civic` resolves to
  `civic-authority`, `defence` to `garrison`, V11's compiler rule). A CUSTOM record's category is free text (V08 §2.8):
  the case-folded text is matched against the rows above, then against SettlementForge's eight content groups —
  `government` → civic-authority, `infrastructure` → infrastructure, `economic` → trade, `military` → garrison,
  `religious` → worship, `arcane` → arcane, `criminal` → criminal, `social` → entertainment — then against V11's synonym
  rows (`categorySynonyms`, below). The match is the INPUT of item 104 (a)'s category rung (V11 §3.13.1 rung 3), resolved at
  fold (V08 §3.5 (5) (f)): `Other` and a text nothing matches give that rung nothing, and the resolver falls through its
  later rungs to `generic-other` (item 104 (a) (7)'s fallback, its row V11's). Each family's generic class row —
  `generic-<family>`, with its footprint template, band and relation rows — is a roster class V11 writes.
* **`tags`** (SF tag → our siting-profile family key, item 103 (a)'s "default profile by tag"; J-V8.19): `public_authority`,
  `civic` → civic-authority; `legal`, `law` → law-court; `security`, `public_order`, `law_enforcement` → watch; `defense`,
  `military` → garrison; `fortification` → fortification; `welfare` → welfare; `healing` → healing; `education`,
  `scholarly` → school; `religious`, `church`, `divine` → worship; `monastery` → monastic; `economic`, `trade`, `economy` →
  trade; `market` → market; `craft` → craft; `metalwork` → metalwork; `leather` → leatherwork; `textile` → textile;
  `timber` → timber-yard; `shipbuilding` → shipyard; `agriculture` → farming; `food` → food; `resource_extraction` →
  extraction; `industry` → industry; `warehouse` → warehouse; `port` → port; `banking` → finance; `guild` → guild-hall;
  `luxury` → luxury; `exotic` → exotic; `arcane`, `magic`, `enchanting` → arcane; `alchemy` → alchemy; `planar` → planar;
  `infrastructure` → infrastructure; `transport` → transport; `housing` → housing; `lodging` → lodging; `sanitation` →
  sanitation; `water` → water-supply; `adventuring` → adventuring; `underground` → underground; `information`,
  `brokerage` → information; `criminal`, `illicit` → criminal; `smuggling` → smuggling; `essential` → no family (a demand
  flag); else no family, noted. The profile content of every family key (emits, sensitive-to, needs, clientele, supply,
  alignment, competition, coverage) is V11's.
* **`kinds`** (catalogue kind → our class; DR24's first rung): one row per catalogue kind `{ kind: string /* the
  catalogId, e.g. 'tannery' */; class: string /* a roster class, or a pseudo-class of V11 §3.11: '@housing' → DR7's range;
  '@wall' → DR2's walls list; '@layer:sewer', '@layer:undercity' → II.7's existence (the sanitation and subterranean rows of
  V04 §2.3a); '@seat', '@office' → §10.2's government rows (a seat class, an office on its seat, no building of its own);
  '@landuse:<kind>' → DR19's land uses; '@pin:<kind>' → a §2.7 pin; '@absent:<class>[+<class>]' → S2: each named class's
  `min` and per-capita demand 0 at the settlement unless another record binds that class — a village using a neighbour's
  mill or parish church; at a village rung each named class is read through its `villageForm` by V07 §3.11 step 1; one
  class string, several classes joined by '+', e.g. '@absent:watermill+windmill' (V11 §3.11); '@none' → no placement,
  noted */; family?: string /* a tags family key that overrides the tags' default */; implies?: 'bridge' /* a feature the
  kind implies; V11 writes it, today for `toll_bridge` only; read by DR1 at creation (V08 §2.6b (3); item 399) */ }`. A
  pseudo-class is the ONE route for its record: housing and walls are decided by no other row or name list. Its SHAPE, its
  lookup chain (V08 §3.5 (5)) and its totality bar are this volume's; its rows — one per catalogue kind of the line, 280 at
  the pinned line (the count read from `dossier.catalogue`, never written into a bar) — are V11's beside each kind's siting
  profile (J-V8.18). At M1 the rows cover M1's classes (J-P11, §16); every other kind falls to its category's generic class,
  reported `unmapped_kind`.
* **`archetypes`**, **`categorySynonyms`**, **`keywords`** (item 104 (a) (2), (3), (6); their SHAPES and lookups are this
  volume's, their ROWS V11's, J-V8.18): `archetypes` — one row per scene archetype `{ id: string /* e.g. 'agrarian-mill'
  */; class: string /* a roster class */; family: string /* a tags family key */; village?: ArchetypeVillageCell /* typed
  by V11 §2.8 (class and elseClass — v.<id> classes —, pin, delta, composition, ruin), its rows from V07 §2.4's
  substitutions: read at village rungs by item 104's resolver before V11 §3.22's villageForm */ }`, exactly the 17 ids the
  line's manifest lists (totality: T-V8-25); `categorySynonyms` — `{ text: string /* case-folded free text, ≤ 100 chars */;
  group: string /* a categories row key or content group */; family?: string /* when set, wins over the group's family (a
  farm by category is a farm, not a shop) */ }`; `keywords` — `{ key: string /* a lower-case token of ≥ 3 letters or a
  two-token phrase */; family: string; weight: number /* ≤ 0.5, the weakest signal (item 104 (a) (6)) */; near?: { cls:
  string; withinM: number; weight: number } /* an authored soft row the resolver adds at the keyword's rank (V11's
  `catacomb` and `ossuary` rows use it) */; class?: string /* the record's class when the resolver's rungs 1–5 give none
  stronger */; specialisation?: 'stepped_temple'|'terraced_palace'|'tiered_tower' /* V11 §3.24.3's id */; binds?:
  'cryptAlways' /* the record's building takes `crypt: always` (V11 §3.5.8) */ }` — the effects of `class`,
  `specialisation` and `binds` are item 104's resolver's, as V11 §3.13.2 states them.
* **`relations`** (a power relation's type word → `PowerRelation`'s neutral `kind`, its sign and strength, read by §4.5's
  typing and item 72's political component): `symbiotic` → `ally`, +1, 0.6; `dependent` → `dependent`, +1, 0.5;
  `subordinate` → `subordinate`, +1, 0.4; `competitive` → `rival`, −1, 0.5; `tense` → `tense`, −1, 0.6; `corrupted` →
  `corrupt`, +1, 0.3, hidden (never on a public view, DR20); else `neutral`, 0, 0.3, noted. The trend word (the line's
  `direction`: `stable`, `declining`, `escalating`) scales the strength: `escalating` × 1.25 (capped at 1), `declining` ×
  0.75, else × 1. The line's `pair` order is not a direction (CONFIRMED: of city-1's four `subordinate` pairs, three name the
  superior first and one last), so the key stays unordered and no relation is read as directed (J-V8.52).
* **`historyScars`** (a history event type → a `HistoryHint` scar): `disaster` → a scar of type `fire` when its name or
  template word holds fire, blaze, burn or burning, `flood` when it holds flood, deluge or storm surge, else `disaster`
  (S2's stage count reads it; II.7.6 reads only `fire` and `flood`); `occupation_infiltration` → `siege`; `magical` → no
  scar, ruin evidence `magicalHistory` (V08 §2.6a); `economic`, `political`, `religious`, `demographic`, `exile_return` →
  no scar; else no scar, noted. Severity words: `minor` 0.3, `major` 0.6, `catastrophic` 0.9; else 0.5.
* **`historyEvents`** (item 113; a history event's `templateType`, else its `type` → the neutral event key V11's
  event-to-epoch rows read, DR37): `great_fire` → `fire`; `great_flood` → `flood`; `plague_years` → `plague`;
  `occupation_legacy` → `occupation`; `trade_collapse`, `market_crash` → `tradeCollapse`; `demographic_pressure` →
  `crowding`; `pilgrimage_surge` → `pilgrimage`; `external_threat` → `siege`; the event carrying the `ancientRuin` marker →
  `ancientFall` (DR38, V08 §3.15); a template word without a row falls to its `type`: `disaster` → `disaster`, `economic` →
  `tradeCollapse`, `political` and `religious` → `unrest`, `magical` → `magical`, `demographic` → `crowding`,
  `occupation_infiltration` → `occupation`, `exile_return` → `return`; else `unrest`, noted. The twenty named template words
  beyond these nine are the line's (29 in all); each takes its row when SF0's census reads it from the pinned line, and
  until a row exists its `type` fallback decides — never a dropped event (T73-10's totality over the fixtures).
* **`magic`** (`magicLevel` → `site.magic` → `CircumstanceSlice.magic`, read by II.6, item 68's lights and item 109 (f)):
  `none` → `none`; `low` → `low`; `medium` → `low`; `high` → `high`; else `none`, noted. `medium` — 32 of the 35 births,
  CONFIRMED — reads as `low` under D-3's realism floor (J-V8.47): magic present but not shaping the town.
* **`era`** (`site.culture` → `CircumstanceSlice.era`, a key of V11's `EraRow`, V11 §3.19.2): every culture of the
  `cultures` row → `c14`, V11's default row, region `western`; a later table version may give a culture another row; else
  `c14`. The line has no era field and the tier plays no part: the era is the culture's alone, and V11 §3.19.2 cites this
  row; item 110's era modifier is one constant on dossier maps and the culture is the discriminator (V08
  §2.6b (4); J-V8.71).
* **`materials`** (a custom record's `materialFamily` → the V11 material id whose largest walls share selects the material
  row, DR15; the six words of the line's enumeration, CONFIRMED in its custom-content manifest): `brick` → `brick`; `stone`
  → `ashlar`; `marble` → `ashlar`; `ruined-stone` → `rubble`; `timber` → `timber_frame`; `steel` → `ashlar` with a note (no
  steel frame under D-3's realism floor); else no material, noted.
* **`customWeights`** (a custom definition's `economicWeight` and `criticality` words → the numbers of
  `PortRows.customKinds`, read by V08 §3.11's custom kinds; J-V8.108): `economicWeight` — `minor` 0.25, `moderate` 0.5,
  `major` 0.75, `backbone` 1; `criticality` — `critical` 1, `important` 0.6, `discretionary` 0.3; else the field is left
  unset on the row (the roster's default), noted.
* **`isolation`** (`isolationSupport.paths[].type` → `site.isolation.paths`, DR19): `magical_transit` → a
  `teleport_circle` use (V11's class, sited by its own class row near the market or the castle), placed as a map derivation
  (`existence: 'map'`) only when no dossier record already binds that class (J-V8.48); `seasonal_access` → a named-feature
  claim (§7.7 item 16) naming the through route of the longest approach "Winter road"; `local_foodshed`, `hinterland`,
  `reserves`, `patronage` → nothing beyond §4.9's defaults; else nothing, noted.
* **`chainStatus`** (`activeChains[].status` → the neutral status key whose weight V11's `siting.web.chainStatus` holds;
  item 105 (i)): `running`, `operational` → `active`; `vulnerable` → `vulnerable`; `impaired` → `impaired`; `entrepot` →
  `entrepot` (its ends item 104 (b)'s import and export pulls, through the store at the gate or quay facing the partner);
  `magically_sustained` → `sustained`; else `active`, noted. The weights are V11's (active 1.0, vulnerable 0.8, impaired
  0.6, entrepot 1.0, sustained 0.9; J-V11.52); the port never holds a weight (J-V8.49).
* **`dependencySeverity`** (`tradeDependencies[].severity` → the number DR10 reads): `critical` 1.0, `severe` 0.8,
  `vulnerable` 0.6, `moderate` 0.4, `minor` 0.2; else 0.5, noted.
* **`calamitySeverity`** (a calamity's deaths ÷ the population at its week → `CalamityRef.severity`, V06's band): below
  0.01 `minor`; below 0.05 `moderate`; below 0.15 `major`; else `catastrophic` (the lit city-1 storm, 2 081 of 23 178 ≈
  0.09, is `major`).
* **`qualifiers`** (a non-numeric parenthesised word of an institution's name → its ladder step when V11's
  `dossier.ladders` names none for the kind; item 108): `multiple` → COUNT; `guild` → GUILD; `district`, `red light
  district` → QUARTER; `established` → SIZE; `commercial`, `part-time`, `official`, `if walled`, `resident`, `open cast`,
  `word of mouth`, `divine, 1st level`, `powerful` → no step (kept in the label); else no step, noted. The fourteen words
  are the survey's full list (research V15; twelve of them CONFIRMED again on the 35 births).
* **`threats`** (→ `site.threats` and `PortValues.threats`, which DR2's waterfront reads through V11's
  `WaterfrontThreatRow`; item 106 (d)). A site is sea-exposed when its terrain is `coastal` or its access is `port`.
  `naval` ← a `wartime` or `under_siege` stressor, or a `war_pressure`, `under_siege` or `wartime` condition, on a
  sea-exposed site; `hostileSeaPartner` ← a trade partner DR3 reads as hostile whose mode is `sea`, on a sea-exposed site;
  `seaMonster` ← a `monster_pressure` stressor or condition, or `monsterThreat` `frontier` or `plagued`, on a `coastal`
  site; `exposedPort` ← access `port` with a population of 20 000 or more and no other key; an inland site → no key.
  `raider` is never produced from a dossier: the line has no raid or piracy word over its fifteen stressor types and every
  condition archetype its fixtures carry (CONFIRMED), so `raider` is a standalone and pack key (J-V8.50); an archetype word
  the fixtures have not shown reaches this row as the `conditions` row's `else` (no key, noted), release row R9 lists it,
  and a raid or piracy word, once seen, gains its `raider` row as a table fix — never a guess. A change of the keys
  re-evaluates DR2's waterfront at the next epoch by item 106 (f)'s least disruption.
* **`ruinEvidence`** (DR30; → `site.ruinEvidence`): the rows of V08 §2.6a (1).
* **`readiness`** (item 114; `defenseProfile.readiness` → `defence.readiness.band` and the need weight
  `PortValues.readiness`): the weight is `score ÷ 100` clamped to [0, 1] whenever the score is present; the band by the
  weight — `fortress` ≥ 0.8, `defended` ≥ 0.55, `light` ≥ 0.3, else `vulnerable`; with no score the label decides —
  `Fortress` 0.9 `fortress`, `Well Defended` 0.7 `defended`, `Lightly Defended` 0.4 `light`, `Vulnerable` 0.15
  `vulnerable`; else 0.5 `defended`, noted; neither present → null (the standalone neutral: the threat alone decides need).
  The band is §7.7's DR41's input at generation; the weight folds into the need at epochs (V08 §3.16 (2)).
* **`climates`** (item 117; the realm cell's climate word, else `site.terrain` → a key of the biome's climate rows, §4.2
  S0, §10.2, whose season columns V11 writes): a climate word is matched case-folded to a climate row key or to that
  row's synonyms in this set — `arid`, `desert`, `hot_desert` → `arid`; `semi_arid`, `steppe` → `semi_arid`; `temperate`,
  `oceanic`, `maritime` → `temperate`; `continental` → `cold`; `boreal`, `subarctic`, `alpine` → `severe`; `tropical`,
  `subtropical`, `mediterranean` → `warm`; a word neither lists falls to the terrain column, noted. The terrain column:
  `desert` → `arid`; `mountain` → `cold`; `coastal` → `temperate`; `plains`, `riverside`, `hills`, `forest` →
  `temperate`; else `temperate`. The height correction (upland colder) is §7.7's DR42's, read on the map's
  relief. The synonyms are PLAUSIBLE until SF0's census reads the climate sub-digest's words at the pinned line (with its
  flag on); a word the census shows gains its row as a table fix.
* **`festivals`** (item 118; a tradition's `type` word → the festival kind the staging fallback and the decoration rows
  read): a word holding `feast`, `holy`, `saint`, `rite`, `pilgrim` or `procession` → `religious`; `fair`, `market` →
  `market`; `harvest`, `sowing`, `midsummer`, `midwinter`, `solstice`, `equinox` → `harvest`; `boat`, `river`, `sea`,
  `water`, `fleet` → `water`; `founding`, `coronation`, `guild`, `tournament`, `civic` → `market` (the main square is the
  civic stage: item 118 (c)'s market-or-fair fallback); else by the same test over the tradition's name, else `market`,
  noted. The four kinds are item 118 (c)'s; a tradition naming a deity is `religious` whatever its word.

### 2.6a Item 109's dossier sources and the burial and crypt trace (DR30–DR32)

The port adds no underground behaviour of its own. The ruin, the caverns, the catacombs, their access and growth are
V04's; the crypts V03's (with V02's forced basement); the classes and ladder rows V11's; the epochs V06's. The port owns
three things: the evidence and drivers it carries, the binding of each record to its class, and the lifecycle rules that
keep a closure or a tier change from shrinking or orphaning anything below (item 109 (k); J111: "cathedral also gets
crypts but cemetaries get catacombs").

**(1) The ruin evidence (`ruinEvidence` rows; V04 §3.5.0a (1) reads them in its order).**

| kind | the dossier's words | V04's reading |
|---|---|---|
| `ruins` | a `site.deposits` entry `ancient_ruins` in any state but `removed` (`discovered` counts from the next epoch) | source (a): the ruin exists, no draw; its `DepositSite`'s decoration is the surface marker |
| `ruinedLandmark` | a custom record whose scene archetype is `ruined-landmark` | source (a); significance `palace` |
| `node` | a `magical_node` deposit | source (b) |
| `leyLines` | an income row `Magical ley lines` | source (b) |
| `magicalHistory` | a history event of type `magical` (its `yearsAgo` carried) | source (c) and its age |
| `delving` | an Adventuring-category record whose name holds `delving` or `dungeon` (the line's `Dungeon delving supply district`; the line has no `delving` tag — CONFIRMED over the 35 births' tag vocabulary) | V04's `delvingFactor`, never alone |
| `undercity` | an `Underground city` record | a void-source hint: V04's undercity takes the ruin as its first void source (item 109 (i)); the record's `@layer:undercity` forces the undercity (DR17) |

An ancient founding is no evidence row: `history.ageYears` rides `HistoryHint` and V04 compares it with its own
`ancientYears`, the one constant (J-V8.51). Nor is item 113's ancient "Fall of" event: it is the site's own predecessor,
read by DR38 as a refounding over a buried former settlement (DR39; V08 §3.15), never as item 109's older civilisation.
Weights and chances are V04's `RuinRule`; the port carries evidence, never a chance.

**(2) The derivation rows** DR30 (the ruin system's existence, source, age and centre), DR31 (the cavern drivers) and
DR32 (the burial faces, the crypted churches and the church count) are §7.7's (item 398); their inputs are (1), the `site`
row's relief, the mining deposits, and (3)'s records with `stone_quarry` and `history.ageYears`; their bars are T-V8-32
(DR30, DR31) and T-V8-33 (DR32).

**(3) The burial and crypt trace, record by record** (the line's names, CONFIRMED over the 35 births: every birth carries
exactly one burial record for its tier, and a metropolis the `Cemetery network` beside it):

| record | class (V11 `kinds`) | ladder step | feeds | never |
|---|---|---|---|---|
| `Burial ground` (thorp, hamlet), `Graveyard` (village) | `cemetery` | REPLACEMENT (`graveyard` over `burial_ground`); both lessers of `parish_burial_grounds` (COUNT) (V11 §3.12) | a burial face below TOWN, which forms no catacomb (item 109 (k) (1)); V07's village routing | a catacomb source |
| `Parish burial grounds` (town) | `cemetery` (dispersed) | COUNT over `graveyard` and `burial_ground`, its members the burial faces, one per church plot's churchyard (V11 §3.12); itself a SIZE lesser of the city's record | V04's candidates, beside each church plot's churchyard part (derived map-side, §4.9) | — |
| `Burial grounds and charnel house` (city, metropolis) | `cemetery`, with its charnel part (V11) | SIZE over the lesser burial records | V04's candidates; the charnel house the surface ossuary whose fill item 109 (k) (5)'s bone reuse raises | — |
| `Cemetery network` (metropolis) | `cemetery` members beyond the gates (V11's COUNT row: one per gate on a through route, each extramural) | COUNT | V04's candidates, a metropolis's first (item 109 (k) (2); V04's rank) | — |
| `Monastery or friary`, `Multiple monasteries`, `Major monasteries (5-10)` | `monastery` | COUNT for the plural forms | each monastery's burial yard a burial face; its church counted once in the church count | — |
| `Cathedral (10,000+ only)`, `Great cathedral` | `cathedral` | `Great cathedral` SIZE over the other (V11) | V03's crypt, always, the settlement's largest; both present (`metropolis-3`) → ONE cathedral building, the lesser re-bound as its member (`ladder_merged`), one crypt | a catacomb source |
| `Parish church`, `Parish churches (2-5)`, `(10-30)`, `(50-100+)` | `church` | COUNT; a lesser range merged into the greater's (item 108 (c)) | V03's crypts by the crypted-class rows; V04's CITY and METROPOLIS count reads the placed church members plus the cathedral and each monastery's church, each once | a catacomb source; the sum of two ranges (all three metropolises carry both `(10-30)` and `(50-100+)`) |
| `Access to parish church` | `@absent:church` (V11 §3.11) | — | S2's `church` `min` and per-capita demand 0 at the settlement unless another record binds a church (the parish church is a neighbour's); at a village rung through `church`'s `villageForm` by V07 §3.11 step 1 | a building; the count |
| `Priest (resident)` | `@office` | — | an office on the church | a building; the count |
| `stone_quarry` (a deposit) | its `DepositSite` and S12a's quarry working | — | at CITY and METROPOLIS only, a worked-out working (its deposit `depleted`, or V04's own exhaustion) is V04's quarry-ossuary candidate, taken after every burial face | a candidate at TOWN |
| `Underground city` | `@layer:undercity` | — | the undercity's `require` (DR17); evidence `undercity` | — |

A church plot's churchyard part is a burial face (derived map-side by V04 and V11); the church building never is, and
neither is the cathedral or a monastery's church (0 catacombs sourced on a church, T-V8-33).

**(4) Closures, steps and deaths (the diff rules of DR32; V08 §3.5, V08 §3.6).**
* **Ruin evidence** that appears or leaves (a deposit `discovered` or `removed`, a delving record added) is an `attr`
  change of the `evidence` singleton; V04 re-evaluates the ruin at the next epoch, never mid-epoch, and a ruin once laid
  is never removed by a change of evidence (V04's persistence rule).
* **A cemetery closes, so its catacomb stagnates.** A burial record or a monastery record that turns `ruined`, `removed`
  or `destroyed`, or is closed by an `institutionHistory` fate, closes its placed burial faces at the change's week (F2's
  fates, dated by the F-rows); V04 then holds the catacomb under a closed face `stagnant` — its extent kept, its growth
  stopped, nothing lost (item 109 (k) (5); V04's `blockedBy`). A reopening (F6) resumes growth by least disruption.
* **A church's fate touches only its crypt.** A church or the cathedral turning `ruined`, `removed` or `destroyed` ruins
  or vacates its building and its crypt (V02, V03); a catacomb feels it only through a crypt join already made (V04's
  join; item 109 (j) (3b)), the join taking the base's closure state, the catacomb's extent and growth unchanged. A
  churchyard stays a burial face while its church plot keeps the churchyard part, the church ruined or not; it closes only
  when the plot is cleared and re-used by least disruption (J-V8.53). A void whose every open path closes becomes LOST by
  V04's rule (item 113 (e)); the port changes no access itself.
* **A tier change is not a closure.** A promotion adds the new tier's burial record beside the old one, and the line keeps
  the old record (`research/sf/dossier-generation.md`, its tier-shift row), so both reach the digest and item 108 (c)'s
  merge makes the lesser a member of the greater — no face closes. When a lesser leaves the list in the same absorb that
  adds the greater of its ladder (a pair in V11's `dossier.ladders` — for the burial records the pairs `graveyard`
  REPLACEMENT over `burial_ground` (hamlet to village), `parish_burial_grounds` COUNT over both (village to town) and
  `burial_grounds_and_charnel_house` SIZE over all three (town to city); V11 §3.12), the port re-binds the lesser's faces
  to the greater's key (a `rebind`, noted `ladder_promoted`, V08 §3.5.1), never a `remove`. A demotion below TOWN removes
  no catacomb (V04's ratchet; V06 and V07's maintenance mode).
* **New cemeteries** are seated by S10b's least disruption; one begins a catacomb only where V04's count allows.
* **Deaths.** A `plague` or `plague_onset` condition or stressor standing at an epoch, and a calamity's `deaths` in its
  `CalamityRef` (V08 §3.6), are that epoch's burial input for item 109 (k) (4)'s capped growth (V04 §3.10).

### 2.6b Item 110's dossier inputs — the water system, the high-ground landmarks, the toll bridges and the culture (DR34, DR35)

Item 110 (b) GENERATES raised ways at CITY and METROPOLIS, each a soft rule with a table chance and a count cap per rung,
and a TOWN gets them only by declaration. The reasons, parts, chances and caps are the base's with V11's rows; building
them over time is V06's; the terraces and retaining walls are the base's with V01's wards; stepped massing and deck plots
are V02's. The port owns four things: which dossier facts feed which reason, the rung gate, the binding rule (nothing
item 110 generates is ever dossier-bound, V08 §4.1) and the dossier's toll bridges.

**What the pinned line says about water** (CONFIRMED over the 35 births). Every tier carries exactly one required record
of the line's water group: `Water source` (thorp, hamlet), `Multiple water sources` (village, town; V11 binds it to
`@pin:well`), `Aqueduct or water system` (city and metropolis, base chance 1, described by the line as engineered water
brought into the city from beyond it; V11 binds it to `conduit_house`), and at metropolis the optional `Advanced water
infrastructure` (base chance 0.6, several aqueducts; a SIZE member of the city record, V11). All 7 CITY and METROPOLIS
births carry the city record; `metropolis-2` alone carries the metropolis one.

**(1) DR34 — the water system's inputs to item 110 (b)'s aqueduct.** The row is §7.7's (item 398); its inputs, in the
order read: the rung (DR23); the records bound to `conduit_house` through V11's `kinds` and `ladders` rows (the city record
and its SIZE member); the demand records — those bound to `bathhouse` and to the classes whose V11 row needs running
water; `site.terrain` through the `site` row (`riverside` → a river inside the walls; `desert` → the arid climate row;
`hills`, `mountain` → a relief that can hold a higher spring); the realm cell's river (DR1); the `hot_springs` deposits
(never a source); `site.culture` (V11's culture modifier). Its bar is T-V8-36.
(a) **The rung gates, never the tier word.** SettlementForge's `city` spans 5 001 – 25 000 people and its lower part is our
TOWN (DR23; research mapping T1: 4 of 24 surveyed SettlementForge cities). At TOWN the water record binds its building or
pin only and never raises arches; a DM's T4 `road` with `raised` or an aqueduct-class declaration is the only TOWN
aqueduct (item 110 (b)).
(b) **At CITY and METROPOLIS the need test counts as met** when a dossier record is bound to `conduit_house`: the dossier
states that water is brought in from beyond the city. The record is required at chance 1 on every SettlementForge city,
so it never scales a chance (it would be one constant): the table chance, the rung's cap and the source-in-reach
condition stay in force. With no higher spring or upstream river within reach, no arches are built; the conduit house
stands alone, fed by the base's cistern rule, and the build report notes `aqueduct_no_source` (§5.4's report, a generator
note). An oasis is water for the aqueduct's supply like any other (item 111 (a)): a spring-fed oasis within reach is a
source candidate.
(c) **One water system.** When an aqueduct is laid, its terminal site inside the walls is reserved, and the aqueduct's
generator binds the dossier-bound conduit house to that terminal by V11 §3.24.7 (1)'s criteria row (`pc/aqueduct/<way
lineage>`; J-VI.9); no conduit house is created that the dossier or roster does not hold; with no aqueduct, V11's
`highGround` row sites it as today.
(d) **Several aqueducts.** Each SIZE member merged into the water record (item 108 (c); the metropolis record) raises the
rung's aqueduct cap by one; the extra aqueduct ends at a public fountain or cistern under the same source-in-reach
condition.
(e) **Fate and condition.** An aqueduct whose terminal the dossier's conduit house took records a map-side link to that
use's id (§2.7's raised way, `waterUse`; item 244; J-VI.15). Through it, the record closed (`removed` or a closing fate)
leaves the aqueduct standing, dry and disused; the record ruined ruins its arches by
least disruption; an `infrastructure` impairment applies the `impairments` row's condition steps to the arches. Removing
the record never removes a standing aqueduct; its decay is V06's.
(f) **Rung changes.** A promotion past 10 000 makes the reason eligible at the next epoch, where V06 builds the aqueduct
over time; a demotion keeps every standing raised way (V08 §3.10: the standing fabric survives), and V06 ages it.
(g) **Custom content.** A custom record that item 104 (a)'s resolution at fold puts in the `water-supply` family (V08 §3.5
(5) (f); V11 §3.13.1) is a water-system record for (b)–(e), but never declares arches at TOWN (J-V8.68).
(h) **Hot springs.** A `hot_springs` or `hot_springs_mineral` deposit is never an aqueduct source: it gives a bath-house
site and mineral water, not a drinking supply (J-V8.69).
(i) **Parity.** The line doubles an aqueduct's likelihood in a desert and lists an aqueduct among the ways a tannery's and
a dyers' guild's water need is met (CONFIRMED at `5d699cc68`); the `site` row's `desert` and the demand records reach V11's
aqueduct chance and need rows, so both behaviours are reproduced by our own rows, their values V11's.

**(2) DR35 — item 110 (b)'s dossier landmarks on high ground.** The row is §7.7's (item 398); its inputs are the
dossier-bound institutions whose class significance (§10.2; item 72) is at least V11 §3.24.2's
`elevated.landmarkMinSignificance` (the castle's significance; V11's calibratable setting beside `landmarkFactor`,
J-V8.70) through V11's `kinds` rows (`citadel` → `castle`, `palace_government_complex` → `palace`,
`cathedral_10_000_only` and `great_cathedral` → `cathedral`), and the custom records with `landmarkLevel` `landmark`
(whose significance V08 §5.2 raises); each read at its S3 reservation (castle, palace, precinct), fixed before the end of
S6 where the road is committed; its high ground is the relief's. Its bar is T-V8-38. The landmark strings of
`quarters[].landmarks[]` are never read by this row (J-V8.70): the surveyed strings are street, yard, pin and institution
names (537 of 1 281 strings in the wider survey are institution names, research mapping row 21), none a high-ground
landmark; they name ways and pins by the `landmarks` row, and reading them here would count an institution a second time.
Every SettlementForge CITY and METROPOLIS birth carries at least one record this row reads (7 of 7: a citadel, a
cathedral, a great cathedral or the palace; CONFIRMED).

**(3) The toll bridge on a dry site — the rule's one home, at every rung** (item 399; J-V8.65). The births carry 11
`Toll bridge` records in 11 dossiers; 9 stand where neither terrain nor access gives a river or a coast, 6 of them at
base-rung TOWN (CONFIRMED). The `kinds` row's `implies: 'bridge'` (V08 §2.6; V11 writes the cell, today for `toll_bridge`
only) makes DR1 read the record at creation: on a site whose terrain, access, water words and realm cell — and, at a
village rung, S0's own water draw — give no river or canal, the site row forces a watercourse the record's bridge spans.
The bridge is then a ground-part-0 deck over water —
§5.3's invariant untouched, no raised way, no declaration. V07 §3.1 (1) and V07 §3.11 DR1 cite this rule at the village rungs.

| | base rungs (TOWN – METROPOLIS) | village rungs (THORP – VILLAGE) |
|---|---|---|
| the forced course | the site row's river chance becomes 1 for the smallest watercourse class (a brook), its course crossing the through route of the longest approach inside the frame | `water: brook` when terrain, access, the water words, the realm cell and S0's water draw give no flowing water (`none` or a still water); a flowing type drawn or given keeps its type; in either case, unless the realm block fixes the course's line, its entry and exit bearings lie on the two frame arcs the through road's entries divide; the road topology raised to `through` at V07 §3.1 step 3 unless the access word fixes it |
| on a coastal site with no watercourse | a brook, as above | an estuary at the brook's width class, its exit the sea side, between the same two arcs |
| the toll house | V11's toll house takes its `near` → bridge alternative first; on the deck only by V11's `deckOk` (item 110 (d)) | VS4 bridges the crossing; on the deck by `deckOk` (V07 §3.10a (4)) |
| failure → the toll house at its gate alternative (at a village rung, at an entry — the through road's where one exists — else on the heart's approach), the build report noting `toll_bridge_dry` | any of: a `desert` site with no `oasis_water` whose arid row drew no river, lake or coast (item 111); a relief S1 cannot carry the course across the approach; a fixed `isolated` or `none` access word | the same three conditions |
| a viaduct instead | at CITY and METROPOLIS a viaduct raised by item 110 (b)'s own drop reason on that approach may carry the toll; never a raised way at TOWN | never |

The site is creation's (§7.7 One path): a toll-bridge record arriving by a later absorb never re-draws the terrain — its
toll house takes a bridge where a watercourse already crosses an approach, else the gate (the entry), noted
`toll_bridge_dry`, at every rung. A "…Bridge" landmark string names the implied bridge when one exists (the `landmarks`
row unchanged). A desert with `oasis_water` forces the brook as the oasis's outflow, crossing the approach as above.

**(4) The culture's reach** (J-V8.71). The line has no era field: the culture is the only input of its era and region
preset (research mapping row 13). So the `era` row keeps `c14` for every culture, item 110's era modifier is one constant
on dossier maps, and the culture is the discriminator. `site.culture` has two item-110 readers: item 110 (b)'s aqueduct
chance, through V11's culture modifier rows (one per V11 culture row; V11 §3.20.3 covers the twelve words), and DR15's
template family → V11's stepped specialisations for item 110 (c) — stepped temples, terraced palaces, tiered towers —
keyed by culture and class (V02 §3.10). The port supplies no religion that builds in tiers: a deity is a temple's
dedication (F16), never a building form. Which cultures build in tiers and each culture's aqueduct modifier are V11's
content (V11 §3.20.3, V11 §3.24.3).

**(5) What the port never does for item 110.** It binds nothing item 110 generates: a terrace, retaining wall, raised way
or deck plot carries no `Identity.dossier`, even when a dossier record fed its reason, and its provenance names that
record for the clerk's `why` (V08 §4.1, V08 §4.4 (2); item 260). It reads no retaining wall, deck or raised way from
SettlementForge — the line has none, and its world-state works ledger is not read (J-V8.72). Item 110's generated content
rides the opaque document and the pictures through the base renderer and §7.5's migration.

### 2.7 Lifecycle of every new state field

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MapRecord` (2.1) | the host at first commit of a `created` result, every field from the message | the client at mount, offer, refresh | the host's store, compare-and-set on `logHead` | n/a (host data) | a DM's "restore previous map" swaps in `backups[0]` (V08 §4.2), then every open session gets a fresh `doc.load` | the client's record schema version; the host migrates by the client's release notes |
| `MapRecord.backups` (2.1) | `replaceSnapshot`, up to `MapHostConfig.backupDepth` | the restore dialog (through `host.state`), B10's second rung | the host's store | n/a | the restore row (V08 §4.2) | a record holding more than a lowered `backupDepth` is trimmed, oldest first, at its next compaction; a raised depth fills as compactions occur; depth 0 keeps none (B10 falls to its third rung; the restore control hidden) |
| `MapHostConfig`'s SettlementForge inputs — `moduleOrigin`, `backupDepth`, `quotaBytes`, `locale` (2.2) | SettlementForge's page, from its own product decisions (J121) | the frame's `src` and CSP (3.1), `replaceSnapshot` (3.7), the size check (3.7, 6), the catalogue (5.5) | never stored by us: the host's configuration | n/a | n/a | a changed value applies from the next mount; a document never records it |
| the `dossier.*`, `module.status`, `host.state`, `host.action`, `party.render` and `party.rendered` messages (2.2) | client or module per V08 §3 | the other side | never stored | n/a | n/a | the bridge's `protocol` number in `ready`; an unknown type is ignored and reported (§11.3) |
| `exportScenes` blobs (2.2, 5.4 (2)) | the module's scene exporters on `export.request { bundle: true }`, from M-SF | SettlementForge's export-bundle writer, unread | never by us: SettlementForge's bundle | re-requested per bundle | n/a | the exporters' own format versions (§11.1) |
| host-minted `docId` (2.1) | the host at creation | `generate`, `logHead` | the document (§2.9) | kept | n/a | none |
| `DossierBinding.adapter` (2.3) | `creation` | `absorb` (V08 §3.8) | the dossier block | rebuilt from the log's last dossier event's `DossierRef.version` and the port's report | n/a (no undo of dossier events) | rebuilt at first load (§7.5) |
| `DossierBinding.quarantined` (2.3) | `digest`, `absorb` (V08 §3.9) | the next absorb's diff (skips these keys), the report, T-V8-9 | the dossier block | kept | n/a | rebuilt by folding the `dossierFacts` events, each carrying the whole list after its absorb (V08 §3.6 (4)) |
| `absorbed` retention (2.3) | each committed absorb | F22's match, the report | the dossier block | kept | n/a | the fold trims `changeIds` older than the newest 64 entries, so the stored block equals the rebuild |
| `CarriedFact` (2.3) | `creation`, `absorb` | the diff | the dossier block | kept | n/a | remapped by V08 §3.8 |
| carried `chain`, `dependency`, `calamity`, `evidence`, a relation's `trend` and `sign`, a condition's `source`, `port-values.latitudeDeg`, `.threats` and `.readiness`, the settlement's `wealth`, and the `site`, `history` and `tradition` kinds (2.3) | `creation`, `absorb` | the diff (V08 §3.5) | the dossier block | kept | n/a | absent in an older document: filled at its next absorb as a declared remap with no map event (V08 §3.8); a calamity dated at or before the last absorbed week is carried with no event (the map never saw it happen); a `site` or `history` fact filled so writes no `frozen_fact_changed` note |
| `AdapterManifest` and the adapter's field table (2.4) | each adapter folder | `select`, `digest`, remaps; §14's key-list lint; T-V8-20 | the package | n/a | n/a | a new version declares `remaps`, a new line `fromLines`; the field table is re-cut with the adapter |
| digest additions (2.5): `role`, the ladder fields, `security`, `legitimacy`, `site.ruinEvidence`, `.threats`, `.latitudeDeg`, `.climate`, the extended economy, `calamities`, the history fields, `defence.readiness`, `traditions` | the adapter | the rows of V08 §3.5; DR2, DR9, DR28–DR43 | carried by the kinds above | n/a | n/a | as the carried kinds |
| `dossierRecord` records (2.5) | `creation` prefix, `absorb` | §2.7's readers, the renderer, the clerk | the model (records in the digest, §2.7) | kept (records, not derived) | never an undo target (§7.4) | none (new) |
| `CircumstanceSlice.port` (2.5) | `creation` (first slice), the cadence's epochs | the staged rows' readers by the value-in-force rule; V06's need (item 114) | the recipe and `EpochInputs` | read at the epoch that carries it | an epoch that carries dossier events is no undo target (§7.4) | absent in older slices, and `readiness` absent in a slice written before it: reads null (the table; the threat alone) |
| row sets of 2.6 | this volume's defaults | `digest`, `creation`, `absorb` | `@plat/tables`, pinned in the recipe | a table edit re-derives by §7.6 | an `editTable` undo (§7.4) | table versions (§6.4) |
| the `kinds` row's `implies` column (2.6, 2.6b) | V11's rows | DR1 at creation only | `@plat/tables`, pinned in the recipe | a table edit re-derives by §7.6 at an `upgrade`, never at an absorb (the site is creation's) | an `editTable` undo | table versions; absent → no implied feature |
| a derived `DepositSite` (`res:derived:<landuse>`; 2.6, 3.11) | the creation prefix or an absorb's `dossierRecord` put, when a record needing the land use is present and no deposit opens it | S12a (DR19), V07 §3.9, the renderer and labels as any `DepositSite` (5.2) | the model (a record, §2.7) | kept (a record); S12a's derived fields recomputed | never an undo target (§7.4) | none (new): a document made before it gains the site at its next absorb, placed by least disruption |
| DR34 and DR35's inputs (2.6b) | the adapter and the pinned rows, from facts already carried | item 110 (b)'s reasons at creation and at every epoch | nothing new: read from carried facts and bound uses | re-read at each regeneration and epoch | n/a | none |
| the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s laying of the aqueduct | the fate and condition rules of 2.6b (1) (e) | the model (the raised way's `waterUse`, item 244) | kept while both stand; a re-laid aqueduct re-links | the log's | a document without it has none |
| a removal of generated item-110 content (4.1, 4.3) | the base's delete of generated content (a DM's, or an accepted clerk proposal's) | every regeneration, absorb and epoch: the slot stays closed | the log (the delete event) | held; a new slot opened by a later cap increase is new and announced (4.6) | the log's undo re-opens the slot | §7.5's mapping hands the tombstone to its successor |
| `DossierInstitution.custom` with `keywords` (2.8) | the adapter | item 104 (a)'s resolution at fold (V08 §3.5 (5) (f)) | carried (the institution fact's `custom` part) | n/a | n/a | absent in an older document: filled at its next absorb as a declared remap, no event (V08 §3.8) |
| `customChains`, `customResources`, `customServices` (2.8) | the adapter | `creation`, `absorb` | carried facts, and the records they put | kept | n/a | a document made before them carries none: every present one is an `add` at the next absorb, placed by least disruption, upstream first |
| `CustomChainRecord`, `CustomServiceRecord` (2.8) | `dossierRecord` put | S10b's chain pulls (item 104, V11), §10.3's sub-locations, the renderer, labels, the clerk | the model (records in the digest, §2.7) | kept (records, not derived) | never an undo target (§7.4) | none (new) |
| `HostContext.customLibrary` (2.8) | the host client, when the author's library is at hand | `digest` | never stored as sent: its admitted fields become `custom-def` facts | n/a | n/a | the entry shape is versioned with the adapter (`AdapterManifest.version`) |
| `custom-def` facts (2.8) | the ledger event (`dossierFacts`) | the resolution at fold, replay and re-derivation; the custom weights (V08 §3.11) | the dossier block | kept | n/a | remapped by the adapter's declared `remaps` (V08 §3.8) |
| `Assignment.custom` (2.8) | the creation prefix's `assign` of a custom record; a `custom_revision` `setAttr` | the fold's re-resolution (V08 §3.13 (10)); the clerk's `why` | the model (the assignment) | kept | never (a dossier event) | absent on an older document: written by the next absorb's `setAttr`, a declared remap |
| `MapRecord.party` (2.1) | `create` (`{ public, [], 0 }`); `setParty` by an owner or editor | the party picture render and gazetteer (V08 §3.14); the frame's copy through `host.state` | the host's store, compare-and-set on `party.rev` | n/a | "Hide again" restores `party.prev` (one step; older reveals are undone by hiding them) | an older record without it reads `{ public, [], 0 }` |
| `MapRecord.partyPictures` (2.1) | `putPartyPictures` with a `party.rendered` reply's set (V08 §3.14 (3)) | `mountParty`'s viewer; the player's assistant (the gazetteer) | the host's store | re-requested (`party.render`) whenever its `logHead`, `partyRev` or `outputVersion` differs from the record's, and replaced unless the module answers `unchanged` (its `drawDigest`) | n/a (derived pictures) | absent: the viewer shows the public thumbnail and "The DM has not opened this map yet" |
| `MapRecord.refreshing` lease and `backups[0].tailAfter` (2.1) | the refresh queue; `replaceSnapshot` | another device's queue; B10's second rung | the host's store | n/a | n/a | absent in an older record: the lease is free; B10 falls to its third rung |
| `MapRecord.held.reason`, `dossier.result.held.reason` (2.1, 2.2) | the port's `held` note on a refused offer (V08 §3.9) | the banner and the frame's held notice (V08 §5.1); the thumbnail slot at a refused creation | the host's store, beside `held`, as handed | replaced by the next refusal; cleared with `held` | n/a | an older `held` without it shows `host.status.held` with the row of its `code` (E_RUNG_UNAVAILABLE: `.village`) |
| the frame's `host.state` copy, its `HostSlots.historyLines` and the players' view (`ViewOpts.viewAs` set to the party key) (2.2, 3.1 step 7, 3.14 (5)) | the client's `host.state` after each `doc.load` and each change of `party`, `backups` or `partyPictures.at`; the lines from the differences of successive values, their names and targets read per key into the handler's cache (dropped at each new line and at each head move its one `subscribe` on the loaded document reports, §11.2; J-V8.109, J-V8.110); `playersView` from `seePlayersView` or the header's toggle | the header's controls, the restore dialog, the history panel's party lines (V09 §4.10's group), §9.2's filter for the frame's drawing, labels and reads | never: the session's memory and the view's options, no view-state key, no store write, no event | re-sent after every load, restore, new map and `switchTo`; the players' view re-resolved on a new `party` and on an absorb that changes the binding rows; the handler's `subscribe` registered at each `doc.load` and released at `close` and `switchTo` | the same toggle | none (new with protocol 2; a client of another protocol is refused at `ready`, V08 §8.3 R4) |
| `host.action` (2.2, 4.2) | the frame's header controls (owner, editor) | the client → `MapSession.on('action')` → the host's operation (V08 §4.2) | never stored | n/a | each row's own undo (V08 §4.2) | the bridge's `protocol` |
| `PortNote.msg`, `.keys` (2.4) | the port, with each note it writes (`custom_resolved` and `unmapped_kind` after the fold, V08 §3.6 (4); their `class` words V11's `label` cell or a pin kind's `host.pinKind.<kind>` row) | the history panel, the report panel (through `GenerationReport.dossierNotes`) and the host's report (V08 §4.6); T-V8-14 | with the note: the ledger event (`event` and new `standing` notes), `DossierBinding.notes` (`standing`), `dossier.result` only (`report`) | a re-derivation re-renders the stored `msg`; the port recomputes notes only when it runs | n/a (no undo of dossier events) | a note stored before these fields reads `msg` `{ key: 'host.note.<kind>' }` with no args and `keys: []` |
| `dossierFacts.notes`, `.notesCleared` (3.6 (4)) | each port run, in its ledger event | the fold; V09 §4.10's absorb group | the log (the event) | replayed by fold | n/a | an older ledger event without them folds as `notes: []`, `notesCleared: []` |
| `DossierBinding.notes` (2.3) | the fold of each ledger event: the old list less `notesCleared`, plus the `standing` notes of `notes`, in identity order | every derivation's report build (into `GenerationReport.dossierNotes`), the report panel's read by `report(h)` (V08 §4.6); the next absorb's new-or-cleared test (V08 §3.6 (4)) | the dossier block | rebuilt by fold | n/a | absent in an older block: `[]`, so the next absorb carries every standing note as new |
| `GenerationReport.dossierNotes` (4.6) | every derivation's report build and the verification replay on load: `DossierBinding.notes` at the report's seq, in identity order; `[]` for a document with no binding | the report panel's dossier section through `report(h)` (V09 §5.7; V08 §4.6); T-V8-14 | the document's `derived` section with the rest of the report, outside the canonical form and every digest (§5.4) | rebuilt with the report by every derivation | none of its own: an undo's re-derivation rebuilds the report, and the binding it copies is no undo target | a report saved without it shows `[]` until the verification replay on load rebuilds it |
| the view's season and festival defaults read from the dossier (3.16 (4), (5)) | the carried `tradition` facts and `HostContext.week`, through §7.7's DR42 and DR43 | §2.9's view state under its "follow SettlementForge" flag; the festival list (V09) | the view state (outside the model hash); the traditions carried | re-read at every load and `view.set { week }` | the view state's own (§2.9) | none (new): an older document's view follows SettlementForge by default |
| a dossier entry's chip in Find — its record's binding key and its anchor address (3.16 (6)) | the viewer's pick of a dossier entry in Find (item 120 (d)) | Find's re-evaluation at each commit, absorb, epoch, undo and load (item 120 (f)) | §2.9's view key `find` — the per-viewer view state, kept in view pins, outside the model, its hash and the log (item 120 (a)) | re-evaluated: a key no binding row holds is replaced by the key its anchor's entity carries | none: a view, never an edit (item 120 (a)) | a line migration's re-key followed through the anchor at the next re-evaluation; an older view state has no chip |

### 2.8 Custom content — the records, the chains and the optional library input (item 104's host side)

**What the pinned line gives** (CONFIRMED on the `town-cc-1` fixture, generated on `fp/integration-2026-09-23` at
`5d699cc68` with SettlementForge's reference custom pack; `research/sf/dossier-outputs.md` §3.5, `research/sf/dossier-model.md`
§13, and the line's custom-content manifest read read-only). A custom institution is an ordinary `institutions[]` record
with `source: 'custom'`, `isCustom`, `localUid`, `customDefinitionCategory`, `customDefinitionId`,
`customDefinitionRevisionId`, `customDefinitionContentHash`, `customDefinitionVersion`, `customDefinitionFingerprint`,
`name`, a free-text `category`, `tags`, `description` and `required`; the scene tokens `sceneProfileId`, `landmarkLevel`
and `materialFamily` appear on the record only when the author set them (absent on the reference pack's record).
`customContentProvenance.materializedDefinitions[]` lists every materialised definition with its bucket, definition id,
revision id, content hash, local uid, name and the dossier surfaces it landed on. ACTIVE custom chains are listed in
`economicState.customChains[]` — each with a `chainId` (`discovered.<the node uids>.<a hash>`), a `label`, `status`, the
`resource` name, the `processingInstitutions` names in flow order, the `outputs` names, `activation { state,
evaluatedTier, reasons }`, `tradeEndpoints { exports, imports, promoted }` and `tradeEndpointOwners` (each endpoint's
`refId` `custom:<localUid>` and `nodeUid`). Custom resources sit in `config.nearbyResourceDefinitions[]` (name,
`localUid`, `refId`, the definition ids); custom services in `availableServices.<service category>[]` with the provider
institution's NAME in `institution`, `custom: true`, `localUid` and the definition ids. The richer definition fields —
`authority`, `defenseRole`, `criminal`, `magical`, `foodImpact`, `economicWeight`, `satisfies`, `criticality`, the
dependency references `produces`, `requires`, `subsumes`, `providedBy`, `yields`, `commodities`, `requiredInstitution`,
`requiredResources`, and a resource's `category` (its kind: water, land, special, subterranean) — live in the author's
library, not in the dossier.

```ts
// additions to §14's DossierInstitution (item 511) — present only on a record the dossier marks `source: 'custom'`
  custom?: { uid: string /* localUid: the `inst:uid:` binding key's part */; definitionId: string; revision: string /* customDefinitionRevisionId */;
    contentHash: string /* customDefinitionContentHash: a new hash is a new revision (item 104 (e)) */;
    categoryText: string /* the author's free text, trimmed, ≤ 100 chars; DossierInstitution.category holds its normalised form */;
    group?: string /* the catalogue category or content group the text names: `categories` (V08 §2.6), then V11's synonym rows; absent when none */;
    scene?: { profileId?: string /* one of the 17 archetypes, else absent and noted unmapped_word */; landmark: boolean /* landmarkLevel 'landmark' */; material?: string /* materialFamily */ };
    required: boolean /* the author's essential flag */;
    keywords: string[] /* item 104 (a) (6): the keys of V11's keyword table found in the name and the description, sorted, ≤ 16; the description itself goes no further */ };
// additions to §14's DossierDigest (item 511)
  customChains: CustomChainDigest[];
  customDefs: CustomLibraryEntry[] /* the ADMITTED library entries (V08 §3.13 (8)), sorted by definitionId */;
  customResources: { key: string /* res:uid:<localUid> */; uid: string; name: string; revision: string; contentHash: string }[];
  customServices: { key: string /* svc:uid:<localUid> */; uid: string; name: string; serviceCategory: string /* the availableServices bucket */;
    provider?: string /* the provider institution's binding key, resolved by name; absent, noted custom_node_unjoined, when the name joins nothing */; revision: string; contentHash: string }[];
interface CustomChainDigest { key: string /* chain:<chainId> */; chainId: string; label: string;
  active: boolean /* the dossier's own verdict: activation.state 'active' and status 'active' — SettlementForge's rule "all its nodes present", never recomputed by us (J-V8.33) */;
  resource?: { name: string; key?: string /* res:uid:<localUid> of a custom resource, else res:<deposit key>, when the name joins one; else absent, noted custom_node_unjoined */ };
  processors: { name: string; key?: string /* an institution's binding key when the name joins one */ }[];   // flow order, as listed
  outputs: { name: string; uid?: string /* the trade good's localUid, from tradeEndpointOwners' nodeUid */ }[];
  exports: string[]; imports: string[] /* endpoint labels */; promoted: boolean }
// the OPTIONAL library input (item 104 (a) (5); item 20 (h) (iv)): §14's HostContext.customLibrary
interface CustomLibraryEntry { definitionId: string; revision: string; contentHash: string /* read only when all three equal a definition the dossier materialised */;
  bucket: 'institutions'|'services'|'resources'|'tradeGoods';
  authority?: string; defenseRole?: string; criminal?: boolean; magical?: boolean; foodImpact?: 'none'|'produces'|'consumes';
  economicWeight?: 'minor'|'moderate'|'major'|'backbone'; satisfies?: string; criticality?: 'critical'|'important'|'discretionary';
  category?: string /* for a resource: its kind — water, land, special, subterranean */;
  produces?: string[]; requires?: string[]; subsumes?: string[]; providedBy?: string[]; yields?: string[]; commodities?: string[];
  requiredInstitution?: string[]; requiredResources?: string[] /* references as the line writes them: 'custom:<localUid>' or 'prebuilt:<category>:<slug>' */ }
```

**Additions to the carried facts (V08 §2.3).** The institution fact gains the `custom` part above less `categoryText` (a
change of the text alone that maps to the same `group` is no change). Three kinds are added:

```ts
  | { k: 'custom-def'; revision: string; contentHash: string; fields: Omit<CustomLibraryEntry, 'definitionId'|'revision'|'contentHash'> }   // key def:<definitionId>; present only once a library entry was admitted
  | { k: 'custom-chain'; active: boolean; nodes: string[] /* flow order: the resource's key (or 'name:'+name), the processors' keys (or names), the outputs' uids (or names) */; exports: string[]; imports: string[] }   // key chain:<chainId>
  | { k: 'custom-service'; provider?: string; serviceCategory: string }   // key svc:uid:<localUid>
// a custom resource is the existing 'resource' fact under res:uid:<localUid>, with custom: true
```

**The staged records the chains and services become.** `CustomChainRecord` and `CustomServiceRecord` are §2.7's (item
256), filled only by `dossierRecord` events (V08 §2.5); their fields' rules are this volume's. A chain record's `nodes`
are its resource, processors and outputs in flow order, each `key` a binding key (`res:…`, `inst:…`; an output's
`def:<definitionId>`) when the name joins one; an `endpoints` entry's `partner` is a trade partner's binding key when the
dossier's trade links name one for the good, else absent — the main gate or harbour (item 104 (h) (6)); `volume` is the
admitted library's `economicWeight` of the chain's final processor, else `moderate` (item 104 (h) (2)); `crossLinks` come
only from admitted library fields (`requires`, `produces`, `requiredInstitution`, `requiredResources`; item 104 (h) (4)),
a catalogue node by its `inst:cat:` key; the record is retired when the dossier no longer lists the chain. A service
record's `provider` is the provider institution's binding key, which item 104 (h) (5) puts the service inside or on an
adjoining plot. Their readers are S10b's chain pulls (item 104, V11's rows), §10.3's sub-locations, the renderer and
labels (V08 §5.2) and the clerk (V08 §4.4).

**Keys** (item 256's additions to §7.7 item 12's key law). `chain:<chainId>` (the dossier's chain id — stable while the
chain's node set is unchanged; a chain whose nodes change is a new chain, SettlementForge's own identity, J-V8.42);
`res:uid:<localUid>` for a custom resource (beside `res:<key>` for a catalogue deposit); `svc:uid:<localUid>` for a custom
service; `def:<definitionId>` for a library entry's carried fields. None re-binds: a custom item is renamed in
SettlementForge without changing its uid, so its keys never change (item 104 (e): "a rename changes nothing").

**The assignment's custom part.** `Assignment.custom` is §7.7's (item 394): dossier-owned (§7.7 item 11), written by the
creation prefix's `assign` and changed only by a `setAttr` on `custom.revision` with cause `custom_revision`. Its fold
(V08 §3.13 (10)) re-reads the institution's carried fact and, when present, its `custom-def` fact, re-resolves item 104
(a)'s profile and issues S10b's `dossier` request for the use (least disruption), the report's reason naming the revision.
The custom weights — `economicWeight`, `criticality`, `defenseRole`, `authority` — are read from the carried `custom-def`
fact at resolution time (V08 §3.11), never from a params delta, so a revision needs no `editTable` and no params rewrite.

## 3 Generation — the port pipeline, end to end

### 3.1 The embed: the Map tab, the frame, the boot

1. **SettlementForge's side.** The Map tab is a lazy chunk imported by nothing eager, so SettlementForge's own page loads
   as before (`research/sf/dossier-seam.md` C-10, E-8). The chunk holds SettlementForge's mount component and
   `@plat/bridge-client` (≤ 12 KB gzipped with the party viewer, V08 §6). **A player's tab** (audience `player`) calls
   `mountParty`: it reads the record's `partyPictures` and shows them in the client's small pan-and-zoom viewer, with no
   frame, no module and no message (V08 §3.14). **The DM's and co-DM's tab** calls `mount`: the client reads the map record
   (`MapStore.read`); if a thumbnail for the viewer's key exists it draws it at once as a static image (J-V8.24); it creates
   one `<iframe>` with `src = moduleOrigin + embedPath + '#p=2' + ('&lang=' + locale when MapHostConfig.locale is set)`,
   `sandbox="allow-scripts allow-same-origin allow-downloads"` (no top navigation, no pop-ups, no forms), `allow=""`,
   `referrerpolicy="no-referrer"`, sized to the tab (J-V8.7). `moduleOrigin` is SettlementForge's hosting decision, read
   from `MapHostConfig` (J121; V08 §11 Q1); SettlementForge's CSP adds it to `frame-src`. `allow-same-origin` is the
   module's OWN origin, which its workers and its cache need; it grants nothing on SettlementForge's origin. `mount`
   refuses any audience word other than `dm` and `co-dm` before a frame exists.
2. **The module's side.** The module origin serves static files only: `embed.html` (the second entry point of `@plat/app`,
   host mode — no file operations (V09 §2.2's `fileMenu: false`, V08 §5.1), no `DocResolver`, bridge-driven; item 507),
   the lazily loaded chunks of the current output version and the retained N−1 and N−2 (§6.4), fonts and the stamp-tile
   asset. Its response headers: `Content-Security-Policy: default-src 'self'; script-src 'self'; worker-src 'self' blob:;
   img-src 'self' data: blob:; connect-src 'self' <the clerk origins>; frame-ancestors <SettlementForge's app origins>`,
   where `<the clerk origins>` is a deployment row by V10's configuration (V10 §3.17): none under C (SettlementForge's own
   assistant; follows SettlementForge, J121/J122) and under `off`; the proxy's origin — one of SettlementForge's app
   origins, on the embed's allowlist — under B; the provider's API origin under A. No cross-origin isolation headers
   (generation needs none, §11.2); `Cache-Control: immutable` on hashed chunks. The module holds no account, cookie or
   secret: it trusts only messages whose origin is on its allowlist and whose source is its parent window (§11.3).
3. **Boot.** `embed.html` binds `WindowPostMessageTransport` to `window.parent` with the allowlist, sends `module.status {
   booting }`, starts the generation worker, the derivation pool (up to three workers, §4.1) and the tile worker, loads the
   model packages of the current output version, and sends `ready { outputVersions, schemaVersion, protocol: 2, adapters:
   [{ line, version }] }` (§11.3). The client flushes its queued messages in order (§11.3). `ready` within `bootTimeoutMs`
   (20 s), or the client re-creates the frame once; a second miss leaves the thumbnail with the note "the map could not
   start" and a retry button (V08 §3.9 row B1). A tab element of zero width or height (a collapsed or hidden tab) creates
   no frame: the client waits for a nonzero size (a `ResizeObserver`), and a frame whose element shrinks to zero keeps its
   document and draws nothing until it grows again (V08 §3.17).
4. **Load.** The client sends `doc.load { bytes: snapshot, role, session, audience }` — the role and the audience word both;
   the module re-derives role and key from the audience by §14's table and takes the lower of the two (J-V8.29) — then
   `doc.apply { baseLogHead: snapshot.logHead, events: tail }`. The module opens the snapshot (§2.9 steps 1–5: frozen view
   outside the window, corrupt cache replayed, verification in the background), folds the tail, and draws; the first live
   frame replaces the thumbnail. If `snapshot.outputVersion` is older than the current and inside the window, the document
   replays exactly under its own version and `module.status { upgrade-available }` goes to an owner's client only (V08
   §3.8).
5. **Offer.** The client then decides whether to offer the dossier (V08 §3.2) and commits the result (V08 §3.3).
6. **Switching settlements.** `MapSession.switchTo(spec)` — the same fields as `mount` — reuses the frame: `close` on the
   handle, then load and offer the next record; boot is paid once per page (J-V8.30). One document is live per frame; the
   previous one's memory is released before the next is opened (§12.8's line holds per document, not per campaign).
7. **Bridge to the shell** (J-V9.81). The embed entry's **bridge handler** — this volume's glue in `embed.html`, the one
   piece of host-mode code between the transport and `@plat/app`'s shell — fills the shell's two host surfaces and is their
   one channel to the bridge, so neither the shell nor V10's harness touches the transport.
   (a) **`ClerkMount.host`** (V09 §2.10). Each `clerk.config` body (item 473) becomes `config()`'s value and is passed to
   every `onConfig` handler, and its `mode` becomes `HostSlots.clerkMode` (the shell's configuration rebuilt, V09 §2.2);
   before the first one `config()` is null and `clerkMode` is `off`. Each host `preview { events, view: true, proposal }`
   is yielded by `proposals` in arrival order; a `preview` without `proposal` is §11.2's dry run, answered and projected by
   V08 §5.4 (3). The harness's calls post the messages: `needsToken()` → `clerk.needsToken {}`, `refused(reason)` →
   `clerk.config.refused { reason }`, `answer(id, status, seqs)` → `clerk.proposal { id, status, seqs? }`, which the
   client surfaces as `clerkNeedsToken`, `clerkConfigRefused` and `clerkProposal` (V08 §2.2).
   (b) **`HostSlots`** (V09 §2.2). `header` — the renderer of V08 §4.2's controls, each shown to the roles its row names,
   posting `host.action` or acting in the frame as that row says; `banner` — the frame's own strips: V08 §5.1's "Showing
   what the players see" while the players' view is on, and the held notice (`host.status.held` with the reason row
   `MapRecord.held.reason`, V08 §5.1, V08 §3.9) — a frozen view's notice is the shell's own `error.frozen` strip, never this
   slot's (V09 §3.14 (b); J-V9.97), and the tab's status banner is SettlementForge's own (V08 §5.1's table);
   `lockedControls` — the control-registry ids (§7.8) of the basic panel's population and tier word, each with the reason
   `host.locked` ("Set by {host}", V09 §5.12, read with `hostName`: "Set by SettlementForge"; a `host.*` row);
   `exportFormats` — by V08 §5.4 (2): every format §11.1's key rules admit for the frame's role and key, saved to the
   user's device; `fileMenu: false`; `historyFilter` left unset (only owner and editor frames exist, both at `secret`,
   V08 §3.11, so no history row is withheld); `clerkMode` by (a); `hostName: 'SettlementForge'`, a deployment constant of
   the SettlementForge build of the embed beside step 2's deployment rows (another host's build sets its own);
   `historyLines` (V09 §2.2) — the handler's list, newest first, made from successive `host.state` values: a line per
   change of the party, the difference between two successive `party` values this session received — `host.revealed`
   "Revealed to the party: {places}" for places added to `party.places`, `host.hidden` "Hidden from the party again:
   {places}" for places removed, `host.partyTier` "The party's base knowledge is now {tier}" for a changed `party.tier`
   ({tier} "public" or "local") — each held as its `at` (the time the value reached this session) and its places in
   `PartyKnowledge.places`' form (binding keys and addresses, V08 §2.1). `{places}` are the names of the places admitted
   by the key that `list` is called with (V09 §2.2; the shell passes `effectiveKey()`, V09 §2.10), and `targets` their
   entity ids. Each place is read by `query(h, { kind: 'entity', dossierKey } | { kind: 'entity', id }, { admitAs: that
   key })` (items 572, 583) — a binding key by `dossierKey`, a collective record by each of its members' keys
   (`<key>#k`, V08 §2.3; named once, its targets the members answered), an address by `id` — and named by the answer's
   name: a place answered `withheld` is neither named nor targeted, one answered `null` is named by its key with no
   target, and a reveal or hide line left with no place is not listed (J-V8.106). Since `list` returns at once and `query`
   answers by promise (§11.2), the handler keeps the answers in a cache keyed by the knowledge key, dropped when a line is
   added and when the document's head moves (a commit or an applied tail) — the head move read from the `doc.changed`
   `ApiEvent` of the handler's one `subscribe(h, …)` on the frame's document (§11.2), registered at each `doc.load` and
   released at `close` and `switchTo` — firing `onChange` then, so the shell lists again (J-V8.110). `list` with a key the
   cache holds builds the lines from it; with a key it does not, `list` returns only the lines that name no place
   (`host.partyTier`, `host.picturesDrawn`), starts the reads and fires `onChange` when they answer (J-V8.109). The handler
   keeps no key subscription of its own (V09 §2.2) — the shell re-lists on `onEffectiveKey` (V09 §4.10) — and is never
   handed `effectiveKey` or `onEffectiveKey` (members of `ClerkMount`, V09 §2.10). One more line, `host.picturesDrawn`
   "Party pictures last drawn {time}", comes from `partyPicturesAt`, made by the first value after a load and replaced at
   each change. `onChange` fires when a line is added or replaced. The list starts empty at each `doc.load` — the first
   `party` value after a load is the baseline and makes no line — and is never persisted, so it lists this session's party
   changes only, the record keeping no reveal history beyond `party.prev` (J-V8.58; J-V8.93); `newDocuments: 'download'`
   (V09 §2.2) — V09 §3.9's host-mode rule then governs every action that makes a new document; a copy of a dossier-bound
   document is detached (V06 §4.4): it does not follow SettlementForge (J-V8.93).
   (c) **`host.state`** (V08 §2.2). The handler keeps the latest `party`, `backups` and `partyPicturesAt` in the session's
   memory for the header's controls, the restore dialog and `historyLines` ((b); V08 §4.2, V08 §4.6); the client sends them
   after each `doc.load` (step 4) and whenever the record's copies change. `playersView` — and the header's own "See what
   the players see" toggle — sets the frame's `ViewOpts.viewAs` with `setViewOpts` (item 464) through the view handle
   `view.set` is applied to (§11.3), as V08 §3.14 (5) says, and clears it with `viewAs: undefined`.
   (d) **The selection.** The places `reveal` and `hide` carry are the frame's current selection — the entities whose ids
   the handler forwards in `entity.selected` (V08 §5.4 (4)) — each as its binding key when it is dossier-bound
   (`Identity.dossier`), else its address, the form `PartyKnowledge.places` holds (V08 §2.1).
   The handler lives as long as the frame and survives `switchTo` (step 6); its `host.state` memory is replaced by the next
   record's, sent after the next `doc.load`, its `historyLines` are cleared, and the players' view is switched off at every
   load.

### 3.2 When a dossier is offered, and coalescing

The host cannot compute the port's fact hash (it holds no port), so it compares raw dossiers: `hashDossier` = SHA-256 (Web
Crypto) of the dossier's canonical JSON — object keys sorted by code point, no insignificant whitespace, numbers as
JavaScript prints them — in lower-case hex. The DM's or co-DM's client offers when `hashDossier(dossier) ≠
record.lastOffer.dossierHash` or when the record is `held` (every new dossier is a retry), and never otherwise; a player's
page never offers (it holds no dossier, V08 §3.14). The port then decides at the fact level (J-V8.4): a dossier whose only
differences lie outside the carried facts (its generation log, prose, `simulationTrace`, the paths of V08 §2.4's `ignored` rows)
returns `unchanged`, and the host stores the new `lastOffer` with nothing appended (T-V8-6). **Coalescing** (J-V8.23): at
most one offer is in flight per session; a newer dossier arriving meanwhile replaces any queued one, and when the
in-flight result returns the newest is offered against the new head; the client counts the skipped versions in its own
report field `coalesced` (a client-side count — the port never sees a skipped version, so no port note names it). The
skipped versions lose nothing: the port diffs carried facts against the newest dossier, and each change's week comes from
the dossier's receipts (§4.11 (2)), not from which versions were seen; an element that appeared and vanished between two
offers is never seen, which is the same answer SettlementForge's own end-state gives (`research/sf/dossier-generation.md`
g§8.1). An offer meeting a document still verifying its load, an upgrade the owner has not yet chosen, or a head another
editor just moved is ruled by V08 §3.3's commit and V08 §3.17's lifecycle rows: it waits for the load, runs under the
document's own output version, and re-runs on a stale head.

### 3.3 Who runs the port, and who commits — the port leader

The port runs inside the module — in the generation worker, beside the document — and never in SettlementForge's bundle
(J-V8.1). Only an editing role — the DM (`owner`) or a co-DM (`editor`) — holds the document, the dossier and a port; a
player holds neither (J-V8.2). Because `digest`, `creation` and `absorb` are pure functions of (the document, the dossier,
`HostContext`, the adapter and table versions), every editing client computes the same events from the same state, and
every event the port emits carries the reserved session `host:port` (item 359), so the events are byte-identical whichever
editor computed them (T-V8-3) and no user's undo stack ever holds one.

* **Creation (no map record).** The host mints `mapId` and sends `dossier.offer { create: { mapId } }`. The module runs
  `digest` → `creation` (§14: the blueprint, the creation prefix, the binding and the carried facts) → `generate(blueprint,
  { docId: mapId, prefix })` (item 459; J-V8.13), and replies `dossier.result { status: 'created', created: SnapshotBlock,
  factHash, report }` — the `.plat` bytes with their `logHead`, `lastSeq`, `outputVersion`, `schemaVersion` and
  `documentDigest`, all computed by the module. The host calls `MapStore.create` with those fields as handed (`exists` →
  another client won the race; it reloads the stored record, whose document is byte-identical by determinism, T-V8-3),
  writes the two thumbnails and renders the first party picture set (V08 §3.14).
* **Absorb (a map record exists).** The module runs `digest` → `absorb(doc, digest, host)` (§14; its steps V08 §3.5–V08 §3.6),
  dry-runs the events on its working state (§7.1) — they are never refused by map locks or pins, around which they apply
  (§7.7 items 2, 5) — and replies `dossier.result { absorbed, baseLogHead, events, encoded, seqAfter, logHeadAfter,
  factHash, week, report }` WITHOUT folding them. The host treats the result exactly as a `doc.changed` from that client:
  if `baseLogHead` is the current head it calls `MapStore.commitEvents(mapId, baseLogHead, encoded, seqAfter,
  logHeadAfter, absorbed)`, sets its head to `logHeadAfter`, and fans `doc.apply` out to every open session, the sender
  included, which then folds (§11.3 convergence); otherwise it answers `doc.rejected { stale }` and the module re-runs
  `absorb` on the new head (bounded: three attempts, then `module.status { error }` and a retry at the next offer).
* **Verification by every editor.** An editing client that folds a `doc.apply` holding dossier events (session
  `host:port`) and holds the same dossier — its own last offer's hash equals the result's `dossierHash` — re-runs `absorb`
  on the pre-apply state and compares its events' encodings with the applied ones; a difference is reported as a port
  mismatch (`module.status { error, detail: 'host.verify.mismatch' }`, V08 §3.9 row B20, and a report line naming the first
  differing event), as §11.3 reports a fates mismatch. It never blocks the fold: the log's order is the truth, and the
  mismatch is a defect report (T-V8-8).
* **Two editors at once.** When a DM and a co-DM offer the same dossier, both compute the same events, the host accepts the
  first and answers the second `stale`, and the second's re-run finds nothing left to absorb (`unchanged`). No election
  protocol is needed; the log's single head is the arbiter (J-V8.2).

### 3.4 The refresh queue — campaign scale

After SettlementForge commits an advance (any interval, any member count), the host marks `refreshPending` on every map
record whose settlement's dossier changed (by `hashDossier`) and calls `MapHost.refresh(queue)` from the DM's page
(J-V8.6). The client creates ONE hidden frame (`embed.html#p=2&mode=refresh`: no tile worker, no view, no thumbnail pass
until the end) and processes the queue serially in campaign order (the members' order in the campaign), one document at a
time: take the record's **refresh lease** (`MapStore.setStatus(mapId, { refreshing: { by: session, until: now + 60 s }
})`, refused when another live lease holds it) → `doc.load` + tail → `dossier.offer` → commit the result → if the tail now
exceeds its compaction threshold, compact (V08 §3.7) → render the two thumbnails and the party picture set (V08 §3.14; the
tile worker is started for this step only) → release the lease with `status: 'current'` and `refreshPending` cleared → the
document closed, its memory released → next. A lease is renewed after each step and expires on its own; a page that dies
mid-map leaves a lease that expires within 60 s, after which any page may take the record (the record reads `stale`
meanwhile). **Scheduling:** it runs while the DM is not interacting with a map frame (the client pauses the queue when any
visible map session receives pointer or key input and resumes 5 s after the last), yields between maps, and stops on
`AbortSignal` (page leave). **Page memory:** the refresh frame does not start while a visible map frame holds a CITY or
METROPOLIS document; it runs when the Map tab is closed or the visible document is a TOWN or smaller, so the page holds at
most one CITY or METROPOLIS document at a time (V08 §6's page row). The queue is persisted by `refreshPending`, so the next
page resumes it. A map opened in a visible tab while queued is absorbed there first and dropped from the queue. An empty
queue creates no frame; a queued record whose map was deleted or whose dossier fails its offer is skipped or held by its
V08 §3.9 row, and the queue continues (V08 §3.17). **Why serial:** one live document per module instance keeps memory at
one rung's line (§12.8) plus the frame's fixed cost, on any campaign size; the cost is time, bounded in V08 §6 (a campaign
of 20 CITY maps after a year in about a minute and a half of background work, the party sets included).

### 3.5 `digest` and the diff — from a whole dossier to a list of changes

**`digest(raw, host)`** (§14's port item 2 states its duties; these are its steps, in order, all pure):
1. **Adapter.** `AdapterRegistry.select(raw, { line: host.line, bound })` (V08 §2.4) — `bound` the document's
   `DossierBinding.adapter.line` at an absorb; a refusal ends the call (`E_LINE_UNSUPPORTED`).
2. **Limits.** A bounded walk measures the structure before anything else reads it: bytes of keys and strings, depth,
   list lengths, against the manifest's `limits`; over any limit → `E_UNKNOWN_SHAPE` with a `size_limit` note naming the
   first limit passed (T-V8-20). No string longer than `maxString` is ever copied.
3. **Shape.** Every `requiredKeys` key present, with the types the port reads (`id` of the form `s_` + 16 hex, `name` a
   non-empty string, `tier` a string, `population` an integer in [0, 10⁷] (0 is a deserted settlement, routed by V08 §3.6
   (7)), `institutions` an array, `_seed` present); a failure → `E_UNKNOWN_SHAPE` listing up to 20 violations. An extra
   top-level key is never a failure: an `optionalKeys` key with `read: false`, or a key neither list names, is dropped into
   `ignored` with an `ignored_key` note. The hand-made teaching file fails here (§14).
4. **Records.** Each institution, power, notable, condition, calamity and tradition record is checked for its own required
   fields (a name; for an institution a category string; numbers finite); a failing record is QUARANTINED — kept out of
   the digest, its key (when one can be formed) listed in `DossierBinding.quarantined` with the reason, a
   `quarantined_record` note — and the rest proceeds (J-V8.8; V08 §3.9 row B4). The diff never removes a quarantined key
   (below), and a quarantine whose key cannot be formed holds every absent institution key.
5. **Keys, grammar and class.** The name grammar and the ladder step of V08 §3.5.1; §7.7 item 12's key law, with the
   housing-stock records set aside for DR7 by their `@housing` row; then the CLASS LOOKUP CHAIN (DR24): (a) a record with
   `renamedFrom` → the `kinds` row of the slug of its CURRENT name; (b) else its `kind` (catalogue key) → its `kinds` row;
   (c) else the slug of its name as a catalogue key → its `kinds` row; (d) else **the tags rung**: when the record's tags
   map through `tags` to exactly one family whose generic class exists, that class, noted `unmapped_kind` with rung `tags`;
   (e) else its category's generic class (`categories`), noted `unmapped_kind` — for (d) and (e) the note is written after
   the fold, its `class` the class that builds the record at the document's rung (V08 §4.6's row, V08 §3.6 (4); at a
   village rung V07 §3.11 step 4's tag fallback); (f) a CUSTOM record's (`custom` present, V08 §2.8) class and profile are
   NOT decided at digest (J-VI.20): steps (b)–(e) do not run for it; the digest carries their inputs — `custom` (its scene
   tokens, `group` and keyword keys), `tags`, `category` and, when admitted, its `custom-def` fact — and item 104 (a)'s
   resolution with V11 §3.13.1's rungs (the author's map declaration for its `localUid`, the archetype, the category, the
   tags, the definition fields, the keywords with their `class` cell, then `generic-other`) decides both at fold, where the
   declaration is visible; the `custom_resolved` note is written after that fold (creation's `generate`, absorb's dry run,
   V08 §3.3) and names the deciding rung from the fold's report. A `kinds` row whose class is a pseudo-class routes the
   record to its reader (V08 §2.6's `kinds` shape) and gives it no roster class — `@absent:<class>[+<class>]` to S2, each
   named class's `min` and per-capita demand 0 at the settlement unless another record binds that class. A catalogue
   record's siting-profile family is the `kinds` row's `family` when set, else the `tags` families of its tags (item 103
   (a); how several families combine is item 103's rule in §10.2), else its generic class's own. Its political `role` is
   carried as given (DR12, J-V8.45).
6. **Powers, notables, circumstances, economy, history, look.** Standings = power ÷ Σ power, rounded to 1/10 000; a
   controlled list resolved through the line's stable part (§7.7 item 12); relations from
   `powerStructure.factionRelationships`, one per unordered pair, with the type word and the `direction` trend word (the
   `relations` row gives kind, sign and strength at the put, V08 §3.11); notables' workplace and power resolved by name to
   binding keys (absent when the name joins nothing, noted `name_unjoined`), their `importance` carried for V10's people
   answer and V09's person card; deposits; every listed condition whatever its status, and the stressors normalised into
   it (`stressors` — one object or a list — each `{ type }` a condition `cond:stress:<type>` of archetype `<type>`,
   `source: 'stressor'`, severity 0.5, no weeks); quarters; the government and `security` (V08 §2.5); **the economy** —
   each `activeChains[]` entry into `economy.chains`: its resource joined to a listed deposit by `resourceKey`, its
   processors resolved by the rule below, its outputs through V11's `goodWords`, its `upstreamChains` as `chain:cat:`
   keys, its status word through `chainStatus`; `tradeDependencies` into `economy.dependencies` (the institution resolved
   by name, the severity through `dependencySeverity`); `primaryExports`, `primaryImports` with `necessityImports`, and
   `transit` into `economy.goods` through `goodWords`; **the calamities** — each `calamityHistory` entry keyed
   `calamity:<tick>:<slug(name)>`, its severity by `calamitySeverity` over its deaths and the population at its week (the
   latest `populationHistory` entry at or before it, else the current population), its targets resolved to binding keys by
   name; **the sea threats** by the `threats` row; **the ruin evidence** by the `ruinEvidence` row; **the latitude** by
   DR29; **the history** by V08 §3.15 (1); **the readiness**, **the climate** and **the traditions** by V08 §3.16 (2),
   (4) and (5); every key an `ignored` row names dropped into `ignored` (V08 §2.4). Severities round to 1/1 000 and percentages to
   1/100 — the digest's resolution (J-V8.17), so floating noise in a host's arithmetic never reads as a change.
   **Resolving a name to a record** (chain processors, dependency institutions, calamity targets): the exact name → that
   record's key; else the KIND FAMILY — the name and every record's name with their count range and qualifiers removed,
   case-folded, the last word's plural folded to its singular (`-ies` → `-y`, `-es` after s, x, z, ch or sh, else a final
   `-s`) — the one record of that family (several: the first in dossier order, noted `name_ambiguous`); else unjoined, kept
   by name and noted `chain_node_unjoined` (research mapping row 46: 2 585 of 3 381 processor names join exactly; the kind
   family is measured by T-V8-34 on the rest). **Goods words** (V11's `goodWords`): each label is resolved by V11 §3.13.5's
   matching rule; a label matching none is noted `unmapped_good`.
7. **Custom content** — V08 §3.13's steps.
8. **Ladder merges** — V08 §3.5.1 (c).
9. **Seed.** `settlement.seed = H32("plat:sf-seed" ‖ _seed)` (§14's port item 2); `_seed` and `_config` go no further.

**The diff (`absorb`'s first step).** Carried facts (V08 §2.3) against the new digest's facts under the same keys, key by
key in code-point order, **skipping every key listed in `DossierBinding.quarantined`**: a quarantined record keeps its
last carried state, and when a quarantined record's key could not be formed, every carried institution key absent from
the new digest is held — no `remove` — with one `quarantine_hold` note, until a readable dossier arrives. For each element
kind, the fields compared and the change they make (the `op` of §7.7's `DossierChange`; the receipt table decides cause,
fate and week, V08 §3.6):

| kind | key only in the new digest | key only in carried | fields compared when in both → op |
|---|---|---|---|
| settlement | — (a different settlement key refuses the absorb, `E_OTHER_SETTLEMENT`) | — | `population` → `population`; `tierWord` → `tier` (F8); `name` → `rename` (the title only); `wealth` → `prosperity`, response `epoch`: `EpochInputs.wealthLevel` through the `wealth` row (DR6; receipt F9), read by V06's wealth level and item 114's means |
| institution | `add` (F1); under a key carried as removed or ruined → `reopen` (F6); a greater of a ladder whose lesser is carried → `add`, the lesser's members re-bound as the greater's where the greater's thing is the lesser's, else the greater placed new and the lesser's key bound as at a first reading (V08 §3.5.1 (c), (d)) | `remove` with fate `vanished` (a regenerated or rerolled record: SF never deletes, research V48), unless a ladder promotion re-binds it (V08 §3.5.1 (d)) or a quarantine holds it | `state`, `fate`, `inactive` → `state` (F2, F3, F5 by §7.7 item 14's rows, fates first); `impairments` → `state` (F4); `name` with a demotion or upgrade receipt → `rename` + the class re-read (F15, F3) — an upgrade to a REPLACEMENT greater of a new thing places it new under the key and re-points the key's row to it (V08 §3.5.1 (d)); `kind`, `category`, `tags`, `role`, `step`, `lesserOf`, `popQualifier`, `openTop` → `attr` (a re-designation, item 18); `count` → `attr` (members added or removed, V08 §3.6); `knownTo`, `facets` → `attr` (§7.7 item 7) |
| power | `add` | `remove` | `standing`, `governing`, `controlled` → `power` (epoch data); `name` with `rename-faction` → `rename` (its relation keys re-keyed with it); `category` → `attr` |
| relation | `add` → a `PowerRelation` put | `remove` → retire | `kind`, `trend`, `sign`, `strength`, `hidden` → `attr` (a put) |
| notable | `add` → a `Person` put; a reroll's new key whose name and role equal a vanished key's → `rename` (re-bound, V08 §3.11) | `remove` → retire | `role`, `institution`, `power`, `status`, `importance` → `attr`; `replaced` naming a carried notable → `rename` (the successor re-bound, F17) |
| condition | `add` → a `ConditionOverlay` put | `remove` → retire at its week | `severity`, `severityBand`, `status`, `untilWeek` → `state` (a put) |
| resource | `add` → a `DepositSite` put | `remove` → the deposit's state `removed` | `state` → `state` (F13) |
| quarter | `add` → a naming claim (§7.7 item 16) | `remove` → the claim's `unassign` (the name leaves the district) | `phrase`, `landmarks` → `attr` |
| government | — | — | `name` → `attr` (its kind by the `government` table; F11), `governingPower` → `power` |
| trade | — | — | partners, links, relationships, `goods` → `attr` (F14); income shares → `attr` (the economy slice) |
| port-values | — | — | any field — `crime`, `importPct`, `foodChain`, `legitimacy` (from the government's legitimacy), `latitudeDeg`, `threats`, `readiness` → `attr` on the `port-values` key, riding the next epoch's slice |
| deity | — | — | `key`, `name` → `attr` (F16: a temple's dedication at the next epoch) |
| chain (SettlementForge's) | `add` | `remove` | any field → `attr`; response `epoch`: no map event — the supply web re-derives the chain's links from the carried facts at the next epoch (DR33; V06's dossier phase) |
| dependency | `add` | `remove` | `severity`, `affected` → `attr`; response `epoch`, as a chain |
| calamity | `add` → its event in the epoch covering its week (DR28, V08 §3.6 (3)) | nothing: a calamity that leaves the line's capped history list is never undone (J-V8.54) | none (a calamity is immutable) |
| evidence | — | — | `kinds` → `attr`; response `epoch`: V04 re-evaluates the ruin at the next epoch (V08 §2.6a (4)) |
| site | — | — | any field (`terrain`, `access`, `threat`, `magic`, `culture`, `climate`, `isolation`) → `attr`, response `none`: the site is creation's (§7.7 item 10; DR1's bars are creation bars) — the ledger event carries the new value, so the change is reported once, by one `frozen_fact_changed` note (class report) naming the field; no map event |
| history | — | — | `events`, `ancientRuin`, and `ageYears` beyond the whole years elapsed since the carried `atWeek` (±1) → `attr`, response `none`: the history shapes creation only (DR36–DR39; V08 §3.15) — reported by one `frozen_fact_changed` note, no map event; the live lists (`tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle) reach the map through the settlement, calamity and F20 rows instead |
| tradition | `add` | `remove` | `name`, `kind`, `weeks`, `staging`, `deity` → `attr`; response `none`: a look only (item 118 (a)) — the ledger event carries the new schedule, which the view's festival display reads (V08 §3.16 (5)); no map event, no model change |
| institution, custom part | (as institution) | (as institution) | `custom.contentHash` → `attr` with cause `custom_revision` (item 104 (e): the profile re-resolved and the use re-sited by least disruption); `custom.scene`, `.group`, `.keywords`, `.required` → `attr` |
| custom-chain | `add` → a `CustomChainRecord` put (active or not) | `remove` → the record retired | `active` → `state` (item 104 (h) (7)); `nodes`, `exports`, `imports` → `attr` |
| custom-service | `add` → a `CustomServiceRecord` put | `remove` → retire | `provider`, `serviceCategory` → `attr` |
| custom-def | `add` (the library's fields first seen) | kept when the offer carries no library; `remove` (response `none`, noted `custom_library_dropped`) when its definition's revision changed and no admitted entry for the new revision came (V08 §3.13 (8)) | any field → `attr` with cause `custom_library`, only when the entry's revision equals the dossier's |

A field whose carried and new values are equal after the digest's rounding makes no change. A change whose only effect is
on facts no model rule reads (a notable's importance, which orders V10's people answer and V09's person card; a
tradition; a frozen fact) is still a change: it updates `carried` through the ledger event (V08 §3.6 (4)) and the report,
and emits no map event.

**The chains' links** (item 105 (i); DR33). SettlementForge's chains become links of item 105's supply web between the
bound members; the links are DERIVED at every placement and epoch by the base's web (item 105 (a): never stored), read
from the carried `chain` and `dependency` facts; the port stores only the facts. DR33 is §7.7's (item 398): its inputs
are `economy.chains` (processors resolved, outputs through `goodWords`, upstream, the neutral status),
`economy.dependencies`, `economy.goods` and `entrepot`; each link is weighted by V11's `siting.web.chainStatus` of its
chain's status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls through the store at the gate or quay
facing the partner; its bar is T-V8-35. A processor that joins nothing binds nothing and never invents a building (the
dossier is the truth of what exists; DR9 places what it lists), reported `chain_node_unjoined`.

**The coverage pull inside a collective range** (item 103 (f); item 392). DR9 draws a collective record's placed count
inside the dossier's range from S2's per-capita rows; where the record's class carries a coverage row, the draw also takes
the coverage target — clamped into the range — as a weighted option beside the per-capita value, exactly as item 103 (f)
states for a standalone roster, and coverage then decides where the members go. The range stays the dossier fact; the
count inside it stays a map fact (J-V8.20).

**The latitude** (item 102; DR29, §7.7's; item 391). Item 102's daylight share reads the path sun at the settlement's
latitude; a dossier gives none, so the port derives it by DR29 — the realm block's `cell.latDeg`, else `site.culture`
through the `cultures` row, else 50° N — written into `Intent.latitudeDeg` at creation; V05's model sampler reads the
latitude in force (V08 §2.5's value-in-force rule), and §8.4's path mode reads it for the document's views; its bar is
T-V8-22. SettlementForge usually places a settlement on its realm map after generating it (`research/sf/dossier-seam.md`
§4, C-9), so a typical map is created with the culture's latitude and receives the realm's later. The later value never
jumps the town: it is a `port-values` change carried into the next epoch's slice (`PortValues.latitudeDeg`), and item 102
(e)'s drift moves the field and the uses by the evolution engine's normal lag — a sunnier quarter slowly improves
(J-V8.34). A DM who wants the latitude now sets it by T7 `adjust` (§7.1), a map edit with its own fate report. A document
made before `Intent.latitudeDeg` existed reads 50°, the latitude it was built with (§7.5's migration default).

#### 3.5.1 The institution ladders (item 108)

**(a) The name grammar** (applied to the record's name, in this order; the base's T9 extended, item 509):
1. `(lo-hi+)` → `count [lo, hi]`, `openTop: true` — members may exceed `hi` up to V11's per-kind-and-rung cap, reported
   (`Parish churches (50-100+)`);
2. `(lo-hi)` → `count [lo, hi]` (`Taverns (5-20)`);
3. `(n+ only)` → `popQualifier: n`, a population floor kept in the label, never a count (`Cathedral (10,000+ only)`);
4. every other parenthesised group → its case-folded words appended to `qualifiers` (`(guild)`, `(red light district)`,
   `(divine, 1st level)`).
Digits may carry thousands separators. `kindLabel` is the name with groups 1 and 2 removed and trimmed. A housing-stock
record is told by its `@housing` kinds row, not by the grammar.

**(b) The step type.** V11's `dossier.ladders` row for the record's kind (its `catalogId`, else its name's slug) gives
`step` and `lesser`; with no row, the `qualifiers` row over the record's qualifiers in order (the first with a step); with
none and a count range, COUNT; else no step. An unnumbered COUNT, QUARTER or GUILD record takes V11's range column — the
range at the kind's lowest tier — × its `rungScale` only at rungs above that tier (V11 §3.12). At a village rung (THORP,
HAMLET, VILLAGE) an unnumbered record takes V07 §2.4's range row for its step type and member class (`village.json`
`rules.ladders.ranges`, keyed by step type with the qualifier as the row's label; J-V7.105), else V11's range unscaled. A
kind whose qualifier names a step but which V11's table lacks is noted `ladder_unknown`; a record whose kind is a greater
of the committed `ladderPairs` (V08 §2.4) that the catalogue does not list is read as a plain record, noted
`uncatalogued_step` (V11 §3.12).

**(c) No double counting (item 108 (c)).** Where a greater and a lesser of one ladder row are both in the dossier, the
lesser gets `mergedInto` = the greater's key: it is not placed on its own, its range is not added to the greater's, the
roster's per-capita members of that class ARE the greater's members, and its binding key becomes an alias row on the
greater's member #1 — for SIZE and REPLACEMENT, the greater's building, save a lesser that is a pin record, which V11
§3.12's row keeps as a pin of the greater's plot: `parish_church` over `wayside_shrine` binds the shrine's key to the
churchyard `cross` pin, laid by V07 §3.10's pin-record rule at a village rung (VS8 at generation, `village.records` at an
epoch or an absorb; V07 §2.4, V07 §3.10, V07 §3.12 *Records at a village epoch* item 4), while at a base rung, where no churchyard
cross is laid, it aliases the church building. The target is chosen where the merge is first read — the creation, or the
absorb or epoch that brings the pair, the greater arriving beside its standing lesser or by promotion ((d)) — and kept
across a later rung change, the standing fabric surviving it (V08 §3.10; J-V8.111); the merge is noted `ladder_merged`.
**A pair that meets over time** (J-V8.113). At an absorb where the lesser was already placed and the greater arrives beside
it, the lesser's key follows what the greater's thing is:
* **The greater's thing is the lesser's** — every COUNT, QUARTER, GUILD and SIZE step, and the REPLACEMENT rows whose V11
  §3.12 reading keeps the lesser's thing: `graveyard` over `burial_ground` (the face re-bound), `wizard_s_tower` over
  `hedge_wizard` (the house becomes the tower), `mages_guild` over `wizard_s_tower` (the tower binds the guild's hall),
  `professional_city_watch` over `town_watch` (the posts carry on) and `cathedral_10_000_only` over `parish_church` (the
  lesser absorbed: the church converted in place with its crypt, V06 §3.9.11). The lesser's placed members are re-bound
  as the greater's members `#1…#n` (the one nearest its demand first; a `rebind` each, no address change) and DR9 adds
  members up to the greater's count by least disruption; nothing standing closes.
* **A lesser with no thing of its own** — a `@none` or `@office` lesser (`citizen_militia`, `traveling_performers`,
  `traveling_hedge_wizard`, `gates_if_walled`, `priest_resident`) — has no member to re-bind: the greater is placed as any
  added record is, and the lesser's key becomes an alias row on the greater's member `#1`, as at a first reading.
* **Every other REPLACEMENT greater is a new thing**, placed new in the absorb or the epoch that brings it — a building by
  DR9, an `assign` of its member (V08 §3.6 (5)), at a village rung through V07's records placement (V07 §3.12 *Records at a
  village epoch* item 4); a `@wall` greater by the fortification's dossier path (DR2's walls list; V06 §3.7.6 (4); at a
  village rung V07 §3.11's palisade REPLACEMENT: the palisade rebuilt on its trace, else a new ring) — and the lesser's key
  binds as at a first reading, its binding row re-pointed by one `rebind` (the fold re-points the row, V08 §3.6 (5)) noted
  `ladder_merged` (`ladder_promoted` under (d)): (i) a building lesser (`fish_market` over `fishmonger`) — an alias row on
  the greater's building (at a village rung the fish market's hall on the market's rim, V07 §3.12 (b)), the fishmonger's
  shop keeping its use, unbound, left to the use step; (ii) a pin-record lesser — the pin-lesser branch above: at a village
  rung the churchyard `cross`, laid in that batch by V07 §3.10's pin-record rule after the church, at a base rung an alias
  row on the church, and the lesser's former pin left standing, unbound (a pin lesser whose row keeps no pin —
  `wayside_shrine` under `cathedral_10_000_only` — takes an alias row on the greater's building); (iii) a `@wall` lesser
  (`town_walls` over `palisade` or `palisade_or_earthworks`, and the wall rows above it) — an alias row on the enceinte the
  fortification's path yields for the greater, the superseded ring keeping no binding.

**The guild halls.** By V11 §3.12, a GUILD record's hall binds as one member `#k` of a `craft_guilds_*` COUNT record (a
guild whose `categories` family is `craft`) or a `merchant_guilds_*` COUNT record (family `trade`) in the same dossier,
noted `ladder_merged`: the GUILD records of that family take the members `#1…#m` in dossier order, the COUNT record's
placed count is max(DR9's draw, m) — above its range's top only when the GUILD records alone exceed it, noted
`count_over_range` — and no further hall is placed (J-V8.83). At an absorb the binding follows the first case of *A pair
that meets over time*: a hall already placed is re-bound as `#k` (a `rebind`, no address change), never duplicated, and a
COUNT record that leaves the list releases its bound halls back to their GUILD records (a `rebind` each), so no hall
closes by a change of wording. A GUILD record of another family, or with no such COUNT record in the dossier, keeps its
own hall. The three metropolises' two church ranges and `metropolis-3`'s two cathedral records are the fixtures' cases
(V08 §2.6a (3)).

**(d) Steps over time (item 108 (d)).** A `promotedFrom` receipt (`upgraded_by_reconstruction`) keeps the record's one key
(§7.7 item 12's F15 re-binding: the line keeps the old kind's `catalogId`). Where the greater's thing is the lesser's ((c)'s
first case), it re-keys the singular record's binding row to the greater's `#1` (`rebind`) and DR9 adds the rest inside
the new range by least disruption. Where the greater is a new thing ((c)'s third case; J-V8.114), the greater is placed
new as that case places it, under the record's key (at a village rung through V07 §3.12 *Records at a village epoch* item
4), and the record's binding row is re-pointed from the lesser's former thing to it (a `rebind`); one key binds one thing
(J-V8.111), so the former thing is left standing, unbound — the fishmonger's shop keeping its use, the roadside shrine
standing, a palisade the new ring superseded decaying by its persistence rows — and a pin the row keeps (the churchyard
`cross` of `parish_church` over `wayside_shrine`, at a village rung) is laid in that batch by V07 §3.10's pin-record rule
for the record, keyed by its binding key and its provenance the record, with no binding row of its own. A lesser that
leaves the list in the same absorb that adds the greater of its ladder, with no receipt, is read the same way — a
promotion, noted `ladder_promoted`, never a removal and an addition: its key re-bound as the greater's `#1` in (c)'s first
case, else bound as (c)'s second or third case states, the greater placed under its own key. A `demotedFrom` receipt
(`demoted_by_disaster`) keeps the member nearest its demand as the singular record (re-bound) and closes the rest by the
receipt's fate (F2's rows; the calamity's ruins stand as ruins). A demotion or promotion of a burial record follows the
same rules, so no burial face closes by a change of wording (V08 §2.6a (4)).

**(e) Custom content (item 108 (e)).** A custom record whose admitted library entry lists `subsumes` is typed SIZE when the
subsumed kinds belong to another V11 family than its own, GUILD when they are a craft of its own family, SIZE when
unknown; its `lesser` are the subsumed kinds, merged by (c).

**(f) The ladder file.** V11 §3.12's rows agree with SettlementForge's ladder data at the pinned commit
(`src/data/institutionLadders.js` at `5d699cc68`, its upgrade pairs and subsumption rules read as data, nothing copied);
rows V11 marks `inferred` that the file lacks — `parish_churches_50_100`, `multiple_monasteries`,
`major_monasteries_5_10`, `great_cathedral`, `burial_grounds_and_charnel_house` and the rest — stay inferred, because the
dossiers list both forms (all three metropolises carry both church ranges; `metropolis-3` both cathedrals), so item 108
(c) must merge them whatever the file says. The check is release row R2's (V08 §8.3) against the committed `ladderPairs`,
and a disagreement it finds is a V11 table fix.

### 3.6 From changes to events and epochs

1. **Dating.** Each change reads its receipt row (§7.7 item 13): the first receipt present gives cause, fate and week by
   §4.11's rungs; `HostContext.week` is the last rung; no rung → `week: null` and an `unreceipted_change` note. The kinds
   this volume adds are dated by §7.7's data rows F-V8-1 – F-V8-8 (item 393) — a relation by its powers' pulse week when the
   line stamps one, else arrival; `port-values` by arrival, riding the next epoch; a custom definition by arrival; a chain
   (custom or SettlementForge's) by arrival; a dependency by arrival; a calamity by its own `tick`; the `evidence` singleton
   by arrival, riding the next epoch; the `site`, `history` and `tradition` kinds (F-V8-8) by arrival, response `none` (the
   ledger only; V08 §3.5).
2. **Order.** Changes are ordered by week (null last), then decrees before other sources, then the dossier's own record
   order (`order`), then binding key — SettlementForge's order where it has one, ours where it does not.
3. **Epochs by the cadence — §4.11 (4)** (J-V8.55). From the last epoch's week `W₀` (its `EpochRecord`, else the creation
   week) to the absorb's week `W₁` (the latest dated week, else `HostContext.week`, else `W₀`): an epoch at every calendar
   year end `W` with `W mod 52 = 0` in `(W₀, W₁]` (the `sf445` calendar's year); an epoch at the first week the population
   leaves the last epoch's `populationTarget` ± 5 % (read from `populationHistory`; with none, at `W₁` when the new
   population is outside it), the reference then moving to that epoch's target, so every crossing inside the span adds its
   own epoch; and an epoch at the week of each newly carried calamity that no other epoch falls on (a destructive event is
   epoch content, §4.11's rung at an epoch). Each epoch's `populationTarget` is the population at its week — the latest
   `populationHistory` entry at or before it, else linear between the target at `W₀` and the new population at `W₁`,
   rounded to a person — and its `circumstances` are the new digest's slices (trade, economy, powers, government, `port`):
   SettlementForge keeps no interior history of them (research V52, V56), so every epoch of a catch-up reads the end state,
   declared (J-V8.25). A span with no year end, no crossing and no calamity makes no epoch: the absorb's element events
   fold standalone (6). **The calamities** (DR28, the one row V06 and this volume share: V06 writes the reader, this volume
   the inputs). Each newly carried calamity is one entry `{ week, kind: 'calamity', calamity: CalamityRef }` in
   `EpochInputs.events` of the epoch at its week, V06's `CalamityRef` filled as `{ id: its key, name, type, severity,
   targets: the use ids of its resolved, bound targets, deaths }` (`deaths` for V04's burial growth, V08 §2.6a (4)); its F5
   targets' dossier events at the same week ride the same epoch's `EpochInputs.dossier`, so V06's hazard phase strikes them
   in place; a target that joins nothing is dropped from the list, noted `calamity_unplaced`. The calamity-to-hazard
   mapping is V06's table; the port maps nothing (J-V6.70). The port also carries into `EpochInputs` the SettlementForge
   chain changes (the carried `chain` facts, DR33), the ladder receipts (V08 §3.5.1 (d)), the church, cemetery, wall and
   ruin or mining records' changes (V08 §2.6a (4)), the water-system record and the high-ground landmarks (DR34, DR35,
   read by V06's raised-way step from the carried facts and bound uses), and the owner's upgrade request for a document
   whose epochs carried dossier events (V08 §3.8).
4. **The ledger event** (J-V8.14). The absorb's first event is one `dossierFacts { changes, quarantined, notes,
   notesCleared }` (§7.1; item 358): every `DossierChange` of this absorb with its full `before` and `after` carried facts,
   and the WHOLE quarantine list after this absorb, author `host`, no model effect. Folding it sets `carried[key] = after`
   for each change, sets `DossierBinding.quarantined` to the list, appends `{ seq, week: W₁, factHash, changeIds }` to
   `absorbed` and removes `changeIds` from every entry older than the newest 64 — so the dossier block is rebuilt from the
   log by folding these events alone, equal to the stored block at every seq (§2.9's "the fold rebuilds it"). Creation's
   prefix opens with the same event, every fact an `add`. **The port's notes** (J-V8.98). `notes` holds, in the order
   written, this run's notes of class `event` and those of class `standing` whose identity (V08 §2.4)
   `DossierBinding.notes` does not hold; `notesCleared` holds the identities of the binding's standing notes this run no
   longer writes; notes of class `report` never enter the log (V08 §4.6's class column). Folding the event sets
   `DossierBinding.notes` to the old list less `notesCleared` plus the standing notes of `notes`, in identity order — no
   model rule reads either field. The `custom_resolved` and `low_confidence` notes of the custom records this run adds or
   revises (`add`, `custom_revision`) are written after the dry run's fold (V08 §3.5 (5) (f)) and appended to `notes`
   before the events are encoded; since no model rule reads `notes`, the dry run's result stands, and every editor's re-run
   (V08 §3.3) computes the same bytes. They are `event` notes: the live resolution — which a DM's declaration may change at
   any time — is the why card's (V10 `WhyAnswer.profile`, V09 §2.7's `chips`), never a stored note. Every `unmapped_kind`
   note (a `standing` note, V08 §3.5 (5) (d)–(e)) is likewise written after the fold — the dry run's at an absorb,
   `generate`'s at creation, the loaded document's state for an offer answered `unchanged` — its `class` the class that
   builds the record there (V08 §4.6's row; J-V8.112), before `notes` and `notesCleared` are computed, so a note whose built
   class changed at a rung change is cleared and written anew at the next port run; the same bytes follow on every editor's
   re-run for the same reason. A digest whose dossier changes nothing (`unchanged`) writes no event, so its notes reach the
   host's report only.
5. **Emission, by the receipt row's response.** `assign` → an `assign` of a dossier-backed assignment (§7.7 One path:
   placed by S10b's `dossier` request, the least-disruption order — at a rung of a product that declares a records
   placement, that placement first, V06 §2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*);
   `unassign` → `unassign`; `status` → a `setAttr` of the assignment's `state` (and `memberState` for a collective, by
   DR25's distribution); `setAttr` → a `setAttr` of the named path (a re-designation mutates by §4.7 S11); `rebind` → a
   `setAttr` of the bound entity's `dossier` ref to the new key (the fold re-points the binding row; no address changes,
   §6.3; item 390) — also for a ladder promotion (V08 §3.5.1 (d)), a relation re-keyed with its power and a notable
   re-bound after a reroll (V08 §3.11); a staged record → `dossierRecord` (V08 §3.11), the stressors' overlays among them;
   a count change → `assign` of the added members as `dispersed` additions or `setAttr` of `memberState` `removed` on the
   members DR25's rule picks (`siting` keyed by the assignment and the event's `seq`); `epoch` and every slice-level
   change — `port-values`, the settlement's `wealth`, a chain, a dependency, the `evidence` singleton — → the epoch of (3),
   where the slice, the carried facts and V04 and V06's phases read them; a calamity → (3)'s event; `none` → nothing
   beyond the ledger. Each emitted event carries its own `DossierChange` in `EditBase.dossierChange` and the binding key in
   `EditBase.dossier` (§7.1).
6. **Placement in the log; the session.** Element events fold as standalone events at their week, between the epochs of
   (3); one dated exactly at an epoch's week rides that epoch's `EpochInputs.dossier` (§7.7 item 6); undated ones follow
   the last epoch, applied finished (no Works). All take `seq` from `nextSeq` in this order, `author: 'host'` and the
   reserved session `host:port` — never a user's session, no `group` (item 359); the envelope's `session` is the same
   (§11.3's *Logging*).
7. **Refusals at absorb.** A digest whose population routes outside the base ladder with no registered product (V08 §3.10)
   refuses the whole absorb (§7.7 item 15), as does `E_OTHER_SETTLEMENT`; nothing is emitted and the map is held (V08
   §3.9). **A deserted settlement:** with the village product registered, a population of 0 at an ABSORB routes to THORP
   and V07's desertion (V07 §2.1, V07 §3.12; an outcome, never a refusal) — a document whose product is the village runs it at
   the epoch directly, and a base-product document reaches it through V07 §2.1's fold, 0 lying below the band's lower edge
   (J-V8.85); at a CREATION a population of 0 is refused `E_RUNG_UNAVAILABLE` naming the floor (V07 §2.1). With no village
   product registered, 0 is held like any population below 1 500 (B7).

### 3.7 Persistence inside the host — commit, compaction, thumbnails, backups

**The host stores; the module computes** (J-V8.46). Every encoded event, sequence number, head and snapshot field the
store holds arrives in a message: `doc.changed` and `dossier.result` carry `encoded`, `seqAfter` and `logHeadAfter` (the
module's canonical CBOR of each event and §11.3's `logHead` after them); `dossier.result.created` and `doc.snapshot.ready`
carry the whole `SnapshotBlock`. The host verifies only what it can — that a proposal's `baseLogHead` equals the head it
holds — and stores the rest as handed. It never decodes a byte, never hashes an event and never computes a head (T-V8-5
runs against a store that cannot).

* **Commit.** Every committed event — a user's edit (`doc.changed` accepted), an absorb's events, an undo — is appended by
  the host to `tail` through `MapStore.commitEvents(mapId, baseLogHead, encoded, seqAfter, logHeadAfter, absorbed?)`;
  `'stale'` means another writer moved the head, and the host answers the client `doc.rejected { stale }` (§11.3). An
  absorb's commit also writes `absorbed` and `lastOffer` in the same compare-and-set.
* **Compaction** (J-V8.5; J-V8.75). When the tail passes 256 events or 256 KB, and at every `created`, `upgrade` and
  `rebase`, the committing editing client sends `doc.snapshot` and calls `MapStore.replaceSnapshot(mapId, snapshot,
  backupDepth)` with the `SnapshotBlock` of the reply. The store's precondition is that the snapshot's `logHead` is the
  record's head or the `logHeadAfter` of an event in its tail — so an edit committed between the request and the store
  call does not refuse it: the store keeps the tail's suffix after the snapshot's head and, with `backupDepth` ≥ 1, moves
  the old snapshot to `backups[0]` with the removed segment as its `tailAfter`, keeps the older backups without their
  segments and drops the oldest beyond `backupDepth` — all in one transaction; with `backupDepth` 0 it keeps none. A
  snapshot whose head is in neither place is `'stale'` (a restore or a new map replaced the log) and is discarded; the next
  commit's threshold check retries. The snapshot's canonical bytes include the whole log (§2.9), so nothing is lost by
  compaction; it only makes the next load start later in the log. `doc.snapshot` is an editing role's message and is not
  an export: `E_HOST_FORMAT` does not apply to it (V08 §5.4).
* **Load.** Snapshot plus tail replays to the session's state exactly (T-V8-5), because the tail is the log's suffix and
  `doc.apply` folds it (§11.3).
* **Thumbnails.** After each committed absorb and each compaction, the committing client (or the refresh queue) requests two
  512-px PNGs — one under key `public` (the anonymous and gallery fallback; `exportPicture`'s `knowledge` the key form `{
  tier: 'public', places: [] }`, J-V8.92) and one under `secret` (the DM's; no `knowledge`, the requester's own key) — at
  the city band with the document's style and a fixed sun (an export has no pointer, §11.1), and stores them with
  `putThumbnails`. They are what the tab shows before the frame is ready and what a failed boot leaves. The players'
  pictures are the party set of V08 §3.14.
* **Backups and restore** (J-V8.44). `backups` hold the previous snapshots, as many as SettlementForge's `backupDepth`
  (J121). The DM's "restore previous map" (V08 §4.2) refuses a backup whose `docId` differs from the record's `mapId`;
  otherwise it makes `backups[0]` the snapshot with an empty tail (the swapped-out snapshot becoming `backups[0]`), and the
  host then sends every open session of the map a fresh `doc.load` (with `module.status { loading }` between), so no
  client is left on a head the log no longer has; the next offer absorbs the current dossier forward, so the dossier stays
  the truth and only the map's own edits since that snapshot are lost — the dialog says so and lists them. With no backup
  (depth 0, or none made yet) the control is not shown.
* **The local draft mirror** (V09's). V09 keeps, in host mode, only a draft mirror in the module origin's own storage,
  keyed by the document id (V09 §3.8 (6)): the unsent edits of a session. At load, the mirror is replayed only when its
  base head is the record's head or the `logHeadAfter` of an event in the loaded tail; otherwise (a restore, a new map,
  another device's commits past a compaction) it is discarded with the notice `host.mirror.dropped` "unsaved changes from
  an earlier version of this map were dropped". The mirror persists across pages when SettlementForge's chosen module
  origin is same-site with its app, which third-party storage partitioning requires; on another site it lives for the
  session only (J121).
* **Sizes per map, and the plan's storage.** The snapshot within §2.9's size budget (TOWN ≤ 0.6 MB, CITY ≤ 3 MB,
  METROPOLIS ≤ 8 MB), the tail ≤ 256 KB between compactions, `backupDepth` backups (the newest with one tail segment ≤
  256 KB), two thumbnails ≤ 150 KB each, the party picture set (V08 §6: ≤ 2, 6 and 12 MB) — at CITY with two backups ≤ 15.9
  MB worst case, typically ≈ 8 MB; every further backup adds one snapshot. The client keeps `sizes` current at every
  store call. When `MapHostConfig.quotaBytes` is set and a commit leaves the record above it, the client first drops
  backups beyond `backups[0]` (oldest first), then the party set's building level (z3; the viewer's deepest zoom becomes
  the neighbourhood level), and never refuses or delays the commit — no edit and no absorb is lost for storage (§5); a
  record still above the allowance shows `host.status.overQuota` on the tab's banner (V08 §5.1), and what the plan then
  offers is SettlementForge's (J121).

### 3.8 Versions and migrations on both sides

**Ours.** The output version (§6.4): a stored document inside the retention window replays exactly under its own version;
the owner's client gets `module.status { upgrade-available }` and the upgrade dialog with §7.5's diff; an accepted
`upgrade` is an ordinary event over the bridge, compacted at once; the players' pictures keep the stored version's drawing
until the DM upgrades (J-V8.22). The owner's "Update the map engine" action (V08 §4.2) is the host's upgrade request V06
names for a document whose epochs carried dossier events (V06 §3.15): such a document is never upgraded by anything else.
Outside the window the document opens as §2.9's frozen view for everyone, and the owner is offered the `frozenImport`
rebase by V09 §3.14 (b)'s **Edit it with this version**, committed through `doc.changed`, after which the client sends
`doc.snapshot`. The schema version: a newer document opens read-only (§2.9 step 1) — a host serving an older module to a
newer document is a deployment error, reported in `module.status { error }`. The dossier row sets: `absorb` reads
`tables/dossier/*` at the DOCUMENT's pinned versions (§2.9's `tablePins`), so every client on one output version computes
one result; a new table version reaches a document only through `upgrade`. The adapter version: V08 §2.4's manifest;
below.

**SettlementForge's.** A dossier carries `schemaVersion`, `simulationVersion` and `generatorVersion`
(`research/sf/dossier-generation.md` §3.2); the same seed gives different dossiers on two lines at one `generatorVersion`
(g§4.5), so the LINE, not the version fields, names an adapter. The port never re-generates a dossier and never reads
SettlementForge's code, so SettlementForge's internal migrations reach the map only as a changed dossier shape.

* **A new adapter version on the same line** (SettlementForge changed a field's shape; we changed a mapping). At the next
  absorb, when `binding.adapter.version` differs from the running adapter's, the port first RE-BASELINES: for every carried
  key, a difference confined to fields the new manifest's `remaps` list for that `fromVersion` is recorded in the ledger
  event with `cause: { kind: 'adapter_remap' }` and response `none` — no map event — and noted `adapter_remap`; every other
  difference is a real change and is absorbed as usual (J-V8.10). An adapter version that changes a field's meaning without
  listing it fails T-V8-10 on the re-cut fixtures, so the declaration is enforced.
* **A new SettlementForge line** (the owner names a shipping line; §14's port item 1). One new adapter folder with its
  manifest; the fixtures re-cut by the same scripts; `fromLines` declares how an older line's binding keys map to the new
  line's (`identity` when the key law is unchanged). When a document bound to line A receives a dossier the registry gives
  to line B: B's `fromLines` entry for A re-keys the binding rows (a `rebind` `setAttr` per changed key, V08 §3.6 (5), no
  address changes), `binding.adapter` becomes B's, a `line_migrated` note is written, and the absorb proceeds by the
  re-baseline above with B's `remaps` for A. No `fromLines` entry for A → `E_LINE_UNSUPPORTED` and the map is held
  (J-V8.11).
* **The release of a line.** The checklist of V08 §8.3 runs the creation and absorb bars on the new line's fixtures, the
  cross-line migration on the old line's pairs, and T-V8-10 and T-V8-11.

### 3.9 Failure handling — every failure, its detection, its rung and what the user sees

No failure discards a stored map, and none re-rolls one (§5). A **held** map shows its last committed state with
`host.status.held` and its reason row — the refusal's `held` note, whose `msg` is one of this section's `host.held.*` rows,
stored as `MapRecord.held.reason` (V08 §2.1) — its `MapRecord.status` `held`, and every later dossier is a retry. The column
"the user sees" names catalogue keys; each key's words are written once — a `host.held.*`, `host.recovered.*` or
`host.verify.*` row here, a `host.status.*` or `host.party.*` row in V08 §5.1's table, a `host.note.*` row in V08 §4.6's. A
refusal at a CREATION shows `host.status.notCreated` and the reason row in the thumbnail slot. `E_RUNG_UNAVAILABLE`'s row is
chosen by its case: `.village` below the floor with no village product registered, `.cap` above the 120 000 cap (`{cap}`
the cap), `.empty` a creation at population 0.

| row | failure | detection | ladder (first rung that succeeds wins) | the user sees |
|---|---|---|---|---|
| B1 | the frame does not start (origin down, CSP, script error) | no `ready` within 20 s | re-create the frame once → the stored thumbnail with a retry button | `host.status.failed` (V08 §5.1) |
| B2 | a reply never comes (worker crash, out of memory) | `replyTimeoutMs` | the client re-creates the frame and re-loads the record → on a second miss, the thumbnail | `host.status.stopped` (V08 §5.1) |
| B3 | the dossier is too big, too deep or not the line's shape | V08 §3.5 steps 2–3 | refuse `E_UNKNOWN_SHAPE` → held | `host.held.E_UNKNOWN_SHAPE` "The settlement's record could not be read." (with a `size_limit` note in the host's report when a limit was passed) |
| B4 | one record is malformed in a readable dossier | step 4 | quarantine the record, absorb the rest → the quarantined element keeps its last carried state on the map (or, at creation, is not placed) and is retried at every later offer | `host.note.quarantined_record` (V08 §4.6) |
| B5 | no registered adapter accepts the dossier, or the named line's adapter refuses it | `select` (V08 §2.4) | refuse `E_LINE_UNSUPPORTED` naming the candidates → held (several accepting adapters are B19, never a refusal) | `host.held.E_LINE_UNSUPPORTED` "This SettlementForge version is not supported by the map." |
| B6 | the dossier is another settlement's | the settlement key differs from the binding's | refuse `E_OTHER_SETTLEMENT` → held; the host's own records keep settlements apart, so this row catches a host bug | `host.held.E_OTHER_SETTLEMENT` "This record belongs to another settlement." |
| B7 | the population leaves the ladder with no product for it | the router (V08 §3.10) | refuse `E_RUNG_UNAVAILABLE` naming the village product or the cap → held (creation: no map, the thumbnail slot says why); with the village product registered — as J122's build order has it before M-SF — a population below 1 500 is the village product's and never reaches this row; a population of 0 at an absorb is no failure — it routes to THORP and V07's desertion — and at a creation 0 is refused `E_RUNG_UNAVAILABLE` naming the floor (V07 §2.1; V08 §3.6 (7)) | `host.held.E_RUNG_UNAVAILABLE.village` "Settlements this small are drawn by the village map, which this build does not include." (a build without the village package only); `host.held.E_RUNG_UNAVAILABLE.cap` "Settlements of more than {cap} people are larger than the map draws."; a creation at 0: `host.held.E_RUNG_UNAVAILABLE.empty` "The settlement's record lists no inhabitants." |
| B8 | the head moved under an absorb | `doc.rejected { stale }` | re-run `absorb` on the new head, three times → `module.status { error }`, retried at the next offer | nothing, or `host.status.absorbing` (V08 §5.1) |
| B9 | the store's compare-and-set fails | `'stale'` from `MapStore` | reload the record, re-apply as B8 | nothing |
| B10 | the snapshot is damaged or its root mismatches | §2.9 step 3 | §2.9's corrupt-cache replay from the recipe and log → if the snapshot cannot be decoded at all, `backups[0]` plus its `tailAfter` segment plus the current tail (exact, since the segment holds every event the last compaction removed, V08 §3.7) → each older backup in turn, absorbing forward, the map edits since it lost and listed → a new map from the current dossier, reported; a rung whose backup does not exist (`backupDepth` 0 or fewer backups made) is skipped | as `module.status.detail` beside the `ready` row: rungs 1–2 `host.recovered.rebuilt` "The saved copy was damaged and has been rebuilt."; rung 3 `host.recovered.lost` "The saved copy was damaged and rebuilt from an older one; {n} of the map's changes were lost." (the lost edits listed in the report, V09 §5.7); rung 4 as B11 |
| B11 | the map record is gone (the host lost it) | the host detects it itself — a settlement whose other records name a `mapId` its store no longer holds; with nothing naming one, the host simply has no map and makes one | a NEW map created from the current dossier under a new `mapId`: one creation of the current state (§7.7 One path), which item 22 (c) allows to differ from the lost map; the old layout is not recoverable (J-V8.43) | `host.recovered.newMap` "The saved map was lost, so a new one was made from the settlement's current record." (the client's banner, after the new map's first commit) |
| B12 | an absorb is over its disruption budget (a draft reroll, J-M11) | the dry run (§7.7 item 5) | lands at the least-disruptive sites, reported over budget | the disruption report |
| B13 | the host restored an earlier dossier (its undo) | `factHash` equals an earlier `absorbed` entry | F22's forward convergence (§7.7 item 5) | `host.note.state_matches_absorbed` (V08 §4.6), the residue listed by §7.7 item 5's report |
| B14 | the upgrade cannot copy a pack (§7.5's cap) | the upgrade's dry run | keep the old model (§7.5) | the upgrade dialog's message |
| B15 | the settlement is deleted in SettlementForge | the host's own deletion | the host deletes the map record; nothing in the module | — |
| B16 | a hostile string in a name (markup, script) | never executed: the module renders names as text and every export escapes (§11.1's inert bar) | — | the name, inert |
| B17 | a quarantined record whose key cannot be formed | step 4 | every carried institution key absent from the new digest held (no `remove`), noted `quarantine_hold`, until a readable dossier arrives | `host.note.quarantine_hold` (V08 §4.6) |
| B18 | the party pictures are missing or older than the map | `partyPictures` absent, or its `logHead`, `partyRev` or `outputVersion` differs from the record's | the player's viewer shows what is stored, captioned with its week, and the next editing session or refresh sends `party.render`, answered with a new set or `unchanged` when nothing drawn or listed changed (V08 §3.14 (3)) | `host.party.notOpened` or `host.party.asOf` (V08 §5.1) |
| B19 | two registered adapters accept a new settlement's dossier and no line is named | `select` (V08 §2.4) | the newest registered line, recorded, noted `line_defaulted` | `host.note.line_defaulted` (V08 §4.6) |
| B20 | an editor's re-run of an applied absorb differs from it | V08 §3.3's verification | the applied log stands; the mismatch reported with the first differing event | as `module.status.detail` beside the `error` row, editors only: `host.verify.mismatch` "A map update did not match when it was checked; it has been reported." |
| B21 | the record exceeds the plan's storage (`MapHostConfig.quotaBytes`) | the client's `sizes` after a store call | drop backups beyond `backups[0]`, then the party set's z3 level; the commit is never refused (V08 §3.7) | `host.status.overQuota` (V08 §5.1) |

### 3.10 The village-tier hand-off

`LadderRouter.route(population)` (§1.1) is the one decision of which product builds a population. The village product
registers its `ProductDecl` in `StrategyRegistry.products` (V07 §2.1) — the one registration of item 202; the port
registers nothing and consults `LadderRouter`: at `creation`, which product and rung build the dossier's population; at
every `absorb`, only whether the population lies in a registered product's range. The product's rungs, range, stages and
strategies are V07's `ProductDecl`, cited, never restated.

J122's combined build order registers the village product (V-M, after M4) before the live SettlementForge connection
(M-SF, after M-CAL; V08 §8.1), so in the SettlementForge product a village-sized dossier is created on the village rung
rows by that product (V07 §3.11), and a crossing is §4.11's rung change as item 322 states it — the product at an epoch is
V07 §2.1's fold with its hand-off band (`handoff.band`), so a town passes to the village product, and a village to the
base product, only when an epoch's target leaves the band, and inside the band the previous product runs on its own rung
row. Everything the epoch builds from then on follows that product's stages, and the standing fabric survives as it
survives any growth stage (§6.3). A population of 0 at an absorb is V07's desertion (V08 §3.6 (7)). One document, one
seed, one history across both products (J-V8.12). Only a build without the village package (the base's own tests, or a
deployment that leaves the package out) refuses a population below 1 500 (§7.7 item 15) and holds a mapped town that
shrinks below 1 500 at its last state (B7) until the dossier's population returns above 1 500 — then the next absorb
diffs everything since the held state in one pass. V07 owns what the village product builds and its fold; this volume
owns the port's consultation and the one-document rule, and T-V8-19 tests them with a test `ProductDecl` registered.

### 3.11 The staged records, the per-settlement values, the realm block and the audience in use

* **Conditions and stressors.** Each digest condition is put as a `ConditionOverlay` (`cond:<id>`; archetype, severity,
  `sinceWeek`, `untilWeek`) whatever its status — the line's statuses are `stable`, `worsening` and `easing`, and its list
  holds only live conditions. Its weeks come from its ticks: with `W` the dossier's week (`HostContext.week`, else the
  latest tick of its `populationHistory`, else 0 at a creation), `sinceWeek = round(W − duration.elapsedTicks)` and
  `untilWeek = round(W + duration.expiresAtTicks − duration.elapsedTicks)` — the reading that `expiresAtTicks` is the
  condition's whole length (PLAUSIBLE: a generated condition carries `elapsedTicks` 3.25 and `expiresAtTicks` 6 at tick 0).
  T-V8-18 measures it: `untilWeek` stays within ±1 week across town-1's and city-1's one-week, one-season and one-year
  ticks; if it drifts, the pre-decided fallback reads `untilWeek = expiresAtTicks` as an absolute tick. A condition the
  dossier stops listing is retired at the absorb's week. Each stressor is put the same way under `cond:stress:<type>`
  (archetype its type, severity 0.5, `sinceWeek` its first absorb's week, no `untilWeek`) and retired when no longer
  listed. Effects are the `conditions` row's (V08 §2.6): the tint through §8.2's thematic rows, the Works factors through
  DR21, the activity scalars and the dials at the next epoch. Stressors add no `EpochInputs.events` entry: their one path
  is the overlay, which the epoch's readers read (J-V8.56).
* **Deposits.** Each listed deposit is put as a `DepositSite` (`res:<key>`; family by the `deposits` row, its state). Its
  derived fields are S12a's: reading the creation prefix's deposit puts ahead (item 395), S12a draws the bearing on
  `hinterland.outside` keyed by the deposit key (the realm block's bearing for it wins when given) and writes
  `bearingCdeg`, and the land use it makes writes `landUse` — both derived, recomputed on regeneration, never in the event
  (DR19). A state change is a put at its week and converts the land use at the next epoch (§4.11). The `magical_node` and
  `ancient_ruins` sites follow V08 §2.6's `deposits` row and V04's `ruinCentre()`; `oasis_water` is the oasis's deposit
  (DR40; V08 §3.16 (1)). A land use a record's hard row needs and no listed deposit opens is put as a derived site,
  `res:derived:<landuse>`, by the same row's rule, placed by S12a like any other.
* **Power relations.** Each unordered pair of the powers' relations is put as a `PowerRelation` with the `relations` row's
  neutral `kind`, its `sign`, its strength × the trend factor and its `hidden` flag (item 257); §4.5's typing reads the
  prefix's relation puts ahead (item 395) as a soft adjacency row — attraction for a positive sign, repulsion for a
  negative — and item 72's political component reads them as the base states. A hidden relation is never named on a
  public view (DR20).
* **Notables.** Each notable is put as a dossier-backed `Person` (`npc:<id>`): pinned whole, its `Posting` at
  `workplaceKey`'s element and its `Membership` in `powerKey`'s power, housed by §2.7's rule in the district of its
  institution or its power's seat (a notable whose names join nothing is housed in the governing power's seat district,
  noted `name_unjoined`). Its `importance` orders a settlement's notables in V10's people answer and V09's person card; no
  model rule reads it. A successor (`replaced` names a carried notable) is put with the old person's house and posting and
  the old record retired (F17); a notable reported dead or gone is retired; its house stays a house. **A reroll** (the
  research plan's J-M11): on an absorb whose settlement shows a reroll (F21's receipt), a vanished `npc:` key whose name
  and role equal a new key's is re-bound to it (`rebind`, noted `npc_rebound`), keeping its house and posting; any other
  vanished key is retired and the new one put.
* **History.** At creation only: `Recipe.history = { ageYears: history.age, scars }`, one scar per historical event by the
  `historyScars` row (V08 §2.6) with its `yearsAgo` and severity; never updated by later dossiers (`ageYears` is never
  advanced by the host's weeks, §2.7). The `magical` events go to the ruin evidence instead (V08 §2.6a). The rest of the
  history — the peak, the replay's events, destruction and refounding — is V08 §3.15's.
* **Per-settlement values.** `PortValues` from the digest — crime by the `crime` row, `importPct` = `foodImportPct` ÷ 100,
  `foodChain` = `foodChains`, legitimacy, `threats` by the `threats` row, `readiness` by the `readiness` row (V08 §3.16
  (2)), and `latitudeDeg` (null in the creation slice, where `Intent.latitudeDeg` holds DR29's value; a realm latitude that
  arrives later fills it) — in the creation slice and in each epoch's slice (V08 §3.6 (3)).
* **Custom kinds.** The dossier's custom definitions are `PortRows.customKinds` rows DERIVED at read time: the rows in
  force are the table's (empty in the base) overlaid by one row per carried custom institution — `kind` its definition id
  (the class is item 104 (a)'s resolution at fold, item 425, J-VI.20) and, only from its carried `custom-def` fact (an
  admitted library entry, V08 §3.13 (8)), `economicWeight` and `criticality` by the `customWeights` row (V08 §2.6;
  J-V8.108), `defenseRoles` and `powerAuthorities` (the entry's `defenseRole` and `authority`). Nothing is written into the
  recipe's params, so a revision changes them through its own `setAttr`'s fold (V08 §2.8) with no `editTable` — whose
  re-derivation from its first reader stage would be the reshuffle item 22 forbids. Their records, chains, resources and
  services arrive as V08 §3.13 states.
* **The realm block** (J-V8.27; item 396). The client's `realmBlockFrom(placements)` computes, host-side and without module
  code, from the campaign's placements (the settlement's and its partners' realm positions), the realm map's scale and
  latitude scale, and the campaign's spatial digest (the cell's terrain, river and coast words and, when SettlementForge's
  climate digest is on, its climate word) — nothing else of campaign state: each partner's `bearingCdeg = round(100 ×
  atan2(Δx, −Δy) in degrees) mod 36 000` (realm y grows southward), `distanceM = hypot(Δx, Δy) × mPerRealmUnit`, the cell
  with its climate word, and `latDeg = degAtY0 − y × degPerUnitY` when the latitude scale is given. The module uses it as
  §7.7 layer 2 states (true bearings, north first), as DR29's first input and as item 117's climate source (V08 §3.16 (4)).
  The host sends it with an offer only when the settlement is placed on the realm; a partner placed on the settlement's
  own position (Δx = Δy = 0) takes no bearing and is read as unplaced (DR3's derived bearing).
* **The audience in use.** The client maps SettlementForge's audience words through §14's table: the DM's page mounts with
  `dm` (owner, secret) and a co-DM's with `co-dm` (editor, secret); a player's page never mounts a frame — it shows the
  party picture set and gives its assistant the party gazetteer (V08 §3.14); anonymous, gallery and DM-full shares get
  picture exports only (V08 §5.3). The module takes the lower of the role it is told and the audience word's (J-V8.29),
  both carried by `doc.load`. Which of SettlementForge's accounts and plans see the Map tab is SettlementForge's (J121).
* **Display names** (J-V8.28). For a public picture the host computes, with its own public-projection filter, the veiled
  text of every name it wants veiled and passes `displayNames` (binding key → text) with that one export request; the
  module draws them for that export only (§11.1; T85-3 through the bridge, T-V8-16).

### 3.12 Determinism

The port reads no clock and no randomness beyond named streams: partner and deposit bearings on `gate.pick` and
`hinterland.outside` keyed by the element's key, member choices on `siting` keyed by the assignment and the event's `seq`
(§6.1). `hashDossier`'s canonical JSON, the one-way seed, the host-minted `docId`, the reserved session `host:port` and
pinned tables make creation and absorb byte-identical on every editing client and engine (T-V8-3, T73-8), which is what
lets two editors race safely (V08 §3.3) and every editor verify an applied absorb. The epoch weeks and population targets
of V08 §3.6 (3) are integer arithmetic on the dossier's receipts; a condition's weeks (V08 §3.11) are rounded to the
nearest week. The history's reading (V08 §3.15) and the look inputs (V08 §3.16) are table lookups on carried facts, so the
replay DR37 runs is byte-stable per seed and history (§6.1's replay streams). The party pictures (V08 §3.14) are drawn
from the committed document under a fixed key, style and sun, so two renders of one head give byte-identical tiles
(T-V8-41). A save, load, undo, redo, regeneration or migration changes none of these inputs: they are the log's and the
pinned tables' (V08 §3.17).

### 3.13 Custom content's arrival — records, keywords, chains, services and the library (item 104's host side)

The port carries custom content to the map; what the map does with it — the resolution order's rows, the chain's flow
order, its closeness at street scale or its stretch along a road (item 104 (h) (3) as item 107 (e) revises it), the
coverage defaults — is item 104's base mechanism with V11's rows. These steps run inside `digest` (V08 §3.5, after step 6),
all pure:

1. **The record.** For each `institutions[]` record with `source: 'custom'`: `custom.uid` = `localUid`; `definitionId`,
   `revision`, `contentHash` from the record's own definition fields, else from the `materializedDefinitions` row of the
   same `localUid`; with neither, `contentHash` = H128 over the canonical CBOR of (name, category text, tags, scene tokens)
   and a `custom_unversioned` note — so an edit of those fields still reads as a revision. `categoryText` is the trimmed
   text; `group` by V08 §2.6's `categories` chain; `required` from `required`. A record without `localUid` keys by name
   (§7.7 item 12's third rung) and is noted `custom_unkeyed`.
2. **Scene tokens.** `sceneProfileId`, `landmarkLevel` and `materialFamily` are checked against the adapter's copy of the
   line's enumerations (17, 2 and 6 values); an unknown value is dropped, noted `unmapped_word`; absent tokens stay absent
   (they are optional on the line). `materialFamily` reaches only the material row (DR15 through the `materials` row);
   `MaterialRow`'s rows are V11's.
3. **Keywords** (item 104 (a) (6)). The name, then the description: Unicode NFKC, lower-cased, split on every character
   that is not a letter or a digit, tokens shorter than 3 characters dropped; each token and each adjacent pair joined by
   one space is looked up in `keywords` (V08 §2.6); matches are kept in order of first occurrence up to 16, then sorted. The
   description is read here and nowhere else: it is not carried, not in the digest and never in the document (§7.7 item
   1's prose rule; J-V8.32). SettlementForge itself advises reading tags before names, so these keys enter the resolution
   as its weakest rung and the report marks a profile decided by them `low_confidence`. A name and description holding no
   keyword give an empty list, and the resolver falls through its later rungs (item 104 (a) (7)).
4. **Resources.** Each `config.nearbyResourceDefinitions[]` entry with `custom` true → `customResources` under
   `res:uid:<localUid>`; it is also listed in `site.deposits` (§14) with `custom: true` and `state: 'available'`, so DR19 and
   `DepositSite` (V08 §3.11) carry it; its family and land use come from the admitted library's resource `category` (its
   kind: `water` → the river or the coast, `land` → fields or pasture, `subterranean` → a mine or quarry at the hinterland
   edge, `special` → its own deposit site; item 104 (b)), else from its name's keywords, else `land`. A `water` resource on
   a site with neither river nor coast is the site's lake by the `site` row's water words (V08 §2.6).
5. **Services.** Each `availableServices.<category>[]` entry with `custom: true` → `customServices` under
   `svc:uid:<localUid>`, `serviceCategory` = the bucket, `provider` = the binding key of the institution its `institution`
   name joins (exact name, then the line's slug); no join → absent, noted `custom_node_unjoined`.
6. **Chains.** Each `economicState.customChains[]` entry → `customChains` under `chain:<chainId>`: `active` =
   (`activation.state` is `active` and `status` is `active`) — the dossier's own verdict (J-V8.33); the resource name joined
   to a custom resource (exact, then slug), else to a catalogue deposit by the `deposits` table's label; the processors
   joined to institutions' binding keys in listed order; each output's `uid` from the `tradeEndpointOwners.exports[]` entry
   whose `label` equals it; `exports`, `imports`, `promoted` as given. A node that joins nothing keeps its name, noted
   `custom_node_unjoined` — the chain still pulls between its joined nodes; a chain with one joined node or none pulls
   nothing and is still carried, drawn and listed (V08 §5.2).
7. **Cross-links and volume.** From admitted library entries only (step 8): each `requires`, `produces`,
   `requiredInstitution` and `requiredResources` reference of a chain node — `custom:<localUid>` to that item's key,
   `prebuilt:<category>:<slug>` to `inst:cat:<slug>` when the roster holds that catalogue key, else to the institution whose
   slugged name equals `<slug>` — becomes a `crossLinks` row (item 104 (h) (4)); an unresolved reference is noted
   `name_unjoined` and dropped; a reference from a node to itself makes no row. The chain's `volume` is its last
   processor's admitted `economicWeight`, else `moderate` (item 104 (h) (2)).
8. **The library** (item 104 (a) (5); J-V8.31). An entry of `HostContext.customLibrary` is ADMITTED only when its
   `definitionId`, `revision` and `contentHash` equal a definition the dossier materialised; any other entry is ignored
   with one `library_mismatch` note (the library can enrich a definition the dossier holds, never add one: the dossier is
   the sole truth, item 20 (h)). Admitted entries become `customDefs`, carried as `custom-def` facts under
   `def:<definitionId>`. An offer WITHOUT a library changes nothing that was carried (the `def:` keys are diffed only when
   the new digest holds them). When a definition's revision changes and the offer carries no admitted entry for the new
   revision, the old `def:` fact is removed (response `none`; noted `custom_library_dropped`): stale fields never describe a
   new revision, and the resolution falls back to the dossier's own rungs until the host sends the new entry.
9. **Order of the creation prefix.** After the `dossierFacts` ledger event: the `dossierRecord` puts — conditions,
   catalogue deposits, custom resources, power relations, custom chains in key order, custom services; then the `assign`s —
   first the institution nodes of every ACTIVE chain, chains in key order and each chain's nodes in flow order (a node in
   two chains at its first appearance), so a downstream node is always placed after its suppliers (item 104 (h) (4);
   J-V8.41); then every other record in the dossier's own order; then the notables' `Person` puts. Absorb emits in V08
   §3.6's order, and within one week the same rule: chain records before their nodes' assigns, nodes upstream first.
10. **Changes and their events.** A new custom record is an `add` (F1) like any institution. A new `contentHash` is an
   `attr` change with cause `custom_revision`, emitted as a `setAttr` of the assignment's `custom.revision` path: the fold
   re-resolves the profile from the new record and re-sites the use by item 22's least disruption, the report saying why
   (item 104 (e)). A chain that becomes active is a `CustomChainRecord` put with `active: true` at its week (arrival week:
   SettlementForge stamps no activation week) — its nodes are then re-sited against each other by least disruption,
   upstream first (item 104 (h) (7)); one that becomes inactive is a put with `active: false` — its nodes keep their sites
   and lose the pulls; a chain the dossier stops listing is retired, and one that returns under the same `chainId` is put
   again on its retired record, so its nodes, which never moved, keep their sites (item 104 (h) (8)'s toggle bar). A
   service whose provider changes is a put with the new provider.
11. **Never fails** (item 104 (d)). No custom input refuses a digest: a malformed custom record is quarantined as any
   record (V08 §3.5 step 4); unknown words, unjoined nodes and mismatched library entries are notes. Counts join the
   manifest's `maxRecords` (200 per list); a dossier with no custom content gives empty lists and changes nothing.

**Determinism.** Every step is a pure function of the dossier, the admitted library entries and the pinned table versions
(`archetypes`, `categorySynonyms`, `keywords`, `categories`, `tags`, `deposits`); no step reads a clock or a stream. The
admitted fields are carried in the document, so replay never needs the host (§11.4's rule for host input).

### 3.14 The players' view — the party picture set and the party gazetteer

A player never holds the map. §11.1 *Knowledge* says a host that keeps a place secret from a client "sends that client
pictures and interchange exports, never the document", and SettlementForge builds its own player face player-safe by
construction, from a public projection and never the DM's ledger (CONFIRMED at `5d699cc68`). So the players' Map tab is
fed from the map record alone: stored pictures and a stored list of words, made by an editing session or the refresh frame
under the party's key (J-V8.57).

1. **The party key.** `MapRecord.party` (V08 §2.1) holds the party's base tier (`public` or `local`) and the places revealed
   above it (binding keys for dossier elements, addresses for map places). Rendering — the module's, on the client's
   `party.render` (3) — resolves it to item 572's key form `{ tier, places }` (the `Admission` form of §2.9's view-state
   `knowledge`), `places` always present and possibly empty: each binding key through the binding rows to its entity's
   address (a collective record to all its members), each address as given; a key that no longer resolves (a place since
   removed) is skipped and kept in the list, so a re-opening re-reveals it. Every party render passes that key form as the
   `knowledge` of each picture it draws (`ExportOpts.knowledge`, §11.1) and as the `admitAs` of each query it makes (item
   572), so the set admits exactly what both the session's `secret` key and the party key admit — the party key's (item
   513); the module never raises a key.
2. **The set** (`PartyPictureSet`, V08 §2.1). (a) A PNG tile pyramid, 256-px tiles, row-major, at three levels — z0 the
   city band, z1 the district band, z2 the neighbourhood band — over the frame of the document's city-band view (at a
   village rung, V07 §5.2's township view), plus a z3 building-band level ONLY for the tiles that cover an admitted place
   above `public` (each place's bounding box plus 40 m), capped at 64 tiles, the players' close view of the places they know
   (J-V8.57). (b) The city-band SVG under the same key, inert by §11.1's bar (text as outlines, no script, no external
   reference), which the host offers to the DM and players for printing. (c) The **party gazetteer**: the answers of
   `query(h, { kind: 'gazetteer' | 'people', … }, { admitAs: the party key form of (1) })` (item 572) — band-less, so
   admitted as at the city band (§9.2's admission, §11.2), every page of both kinds carrying that `admitAs` — paged to one
   JSON document and projected by the module through V08 §5.4 (3)'s words-only rows (names, kinds, districts, tiers, the
   dossier's reasons, no coordinates) before it goes into `party.rendered` for storage — what a player's assistant reads
   (V08 §4.4 (1)). Every picture is drawn with the document's style, the fixed sun (an export has no pointer, §11.1), the
   season and festival the view follows (V08 §3.16 (4), (5)), the document's public notes, view pins and annotation layer
   (§2.9 view state, §9.5) and never a private note or a DM-only pin.
3. **When it is made, and how it crosses the bridge** (J-V8.91). The client asks and stores; the module resolves, draws and
   lists. The client of an editing session sends `party.render { party, since? }` (V08 §2.2) — `party` the record's
   `MapRecord.party`, `since` the stored set's `seqAt`, `partyRev`, `outputVersion` and `drawDigest` when one is stored —
   (a) after each absorb it commits, (b) 30 s after the last map edit batch it committed (the debounce restarts at each
   commit; a session closing with a pending render sends it first and waits for the reply), (c) at once after each
   `setParty`, and (d) at creation (V08 §3.3); the refresh queue sends it for every map it refreshes (V08 §3.4). On every
   open the client checks the stored set against the record — `partyPictures` absent, or its `logHead`, `partyRev` or
   `outputVersion` differing from the record's `logHead`, `party.rev` and `snapshot.outputVersion` (V08 §3.9 row B18) — and
   on a difference sends the request at once. The module resolves the party by (1), builds the display lists of (2)'s
   levels, the SVG's and the gazetteer, and computes `drawDigest`; when `since` holds the same `partyRev`, `outputVersion`
   and `drawDigest`, it answers `party.rendered { status: 'unchanged' }` without rasterising and nothing is stored — so an
   edit batch that changed no drawn mark and no listed word costs no store write; otherwise it rasterises in the tile
   worker between edit batches, never delaying an edit (§12.6's settle rule), and answers `party.rendered { status:
   'rendered', set }` with `seqAt` and `logHead` the head it drew and `partyRev` the request's `party.rev`. The client
   stores the set as handed with `MapStore.putPartyPictures`, which keeps the newer of two sets by the integer pair
   (`seqAt`, `partyRev`), so two editors rendering at once never store the older (`'older'` returned, nothing written), and
   then re-sends `host.state { partyPicturesAt }`.
4. **The player's tab.** `MapHost.mountParty(el, { settlementKey })` reads the record and shows the set in the client's
   small viewer (V08 §2.2 `PartyView`; ≤ 4 KB gzipped of the client's budget, no model code): a grid of `<img>` tiles under
   a CSS transform, wheel, pinch and arrow keys to pan and zoom, a level switch at each band's scale, the caption
   `host.party.asOf` (the set's `week`; V08 §5.1's table), and a focusable region labelled `host.party.region`. With no set
   stored, it shows the `public` thumbnail and `host.party.notOpened`. It holds no frame, no module, no dossier and no
   session, and sends no message (T-V8-17). `refreshFromStore` re-reads the record when the host learns the set changed
   (its own subscription; the client adds no push).
5. **The DM's check** (J-V8.87). "See what the players see" — the header's toggle in the frame, or
   `MapSession.seePlayersView(on)` from the page, which posts `host.state { playersView: on }` (V08 §2.2, V08 §3.1 step 7 (c)) —
   sets the frame's `ViewOpts.viewAs` to the party key resolved as in (1), in the key form `{ tier, places }` that item 464
   admits: a display filter, under which the frame draws, labels and reads what both its key and the party key admit (V09
   §2.10's `effectiveKey()`). So the DM sees in the live frame exactly what the next party set will show; switching it off
   clears `viewAs` (`undefined`), and while it is on the View as menu reads "What the players know" (V09 §4.8, J-V9.85).
   The frame's knowledge key stays the role's `secret` (J-V9.46), so the document formats, `doc.snapshot`, compaction and
   the draft mirror keep working while it is on; a `host.state` carrying a new `party`, or an absorb that changes the
   binding rows, re-resolves the filter. It writes no view state, nothing to the store and no event. While it is on, the
   strip "Showing what the players see" stays in the frame's banner slot (V08 §5.1).
6. **What it replaces.** SettlementForge's retired map rows carried a fog table and audience-tagged annotations
   (`research/sf/dossier-seam.md` E-7, §3). Area fog is consciously replaced by place-by-place knowledge (J-V8.58): the
   base's knowledge model is by place (§9.2), and a revealed place is named in every picture from then on. A live shared map
   for the players — a "party copy" of the document with an area fog — is decided under J122 (V08 §11 Q5): pictures and
   player views now; a live shared map after M-SF, as its own item.

### 3.15 SettlementForge's history at creation (item 113)

The replay — the peak, the coarse epochs, destruction and refounding, burial — is the base's §4.11 with V06's engine
(V06 §3.20), V04's buried former settlement and lost access, V07 at village rungs and V11's rows; its derivation rows are
§7.7's DR36–DR39. The port owns the reading: which SettlementForge facts fill `Recipe.history` at creation, how each is
normalised, and the effective peak's evidence. It reads the history once, at creation; later dossiers reach the map
through the live rows (the population, the tier, the calamities, F20), and a change of the creation-time history is a
frozen fact (V08 §3.5's `history` row).

**(1) The facts read** (the field table, V08 §2.4). `history.age` — the age (`AGE_BY_TIER` bounds it at generation: thorp
15–300 years, hamlet 30–120, village 30–250, town 50–300, city 100–500, metropolis 200–800; a lived settlement's age may
pass its tier's range, which is read as given); `history.founding.age`; `history.historicalEvents[]` — the events of the
line's 29 template types (among them `great_fire`, `plague_years`, `great_flood`, `occupation_legacy`, `trade_collapse`,
`market_crash`, `demographic_pressure`, `pilgrimage_surge`, `external_threat`), each with `yearsAgo`, a severity word and,
when it happened after the birth, its `tick`; `tierHistory[]`, `populationHistory[]` and `calamityHistory[]` in a
campaign; the root's `destroyedByEventId` and `lifecyclePatch` (terminal death and resettlement; a resettled place is
forced to thorp); the opt-in ancient ruins — an event named "The Fall of …", 120–400 years before the founding, carrying
the `ancientRuin` marker; and `config.peakTier`, SettlementForge's high-water stamp.

**(2) What creation writes into `Recipe.history`** (§2.7's `HistoryHint`, whose building volume this is; its item-113
fields typed here, which model §2.7 carries):

```ts
// additions to §2.7's HistoryHint (item 113): filled once by the port's creation; standalone, the blueprint's history option fills `peak` (§4.2 S0)
  founding?: { yearsAgo: number };        // history.founding.age, else history.age; absent both → the `tiers` row's midpoint of the tier's AGE_BY_TIER range, noted history_gap
  events: { key: string /* the `historyEvents` row's neutral key */; type: string /* the line's type word */; yearsAgo: number;
    severity: number /* the `historyScars` row's severity words: minor 0.3, major 0.6, catastrophic 0.9, else 0.5 */; name: string }[];   // every history event, oldest first (DR37)
  tiers: { from: string; to: string; direction: 'promotion'|'demotion'; yearsAgo?: number /* from the outcome id's week suffix */ }[];   // tierHistory, oldest first
  population: { yearsAgo: number; population: number }[];   // populationHistory, oldest first, each tick read as (week − tick) ÷ 52 years ago
  calamities: { yearsAgo: number; type: string; deaths: number; exodus: number; severity: 'minor'|'moderate'|'major'|'catastrophic' }[];   // calamityHistory before the creation week (DR36's losses; DR37's events)
  lifecycle?: { died: boolean; resettled: boolean; yearsAgo?: number /* the resettlement's tick, else the current settlement's founding */ };   // DR38
  ancientFall?: { name: string; yearsAgo: number /* the founding's yearsAgo + its years before the founding */ };   // DR38's ancient "Fall of" event on the site
  peak?: { tier: string; population?: number; symbolic: boolean; evidence: string[] /* the evidence kinds present, strongest first */ };   // DR36's input, by (3)
```

An event dated by a `tick` is `(week − tick) ÷ 52` years ago, the week `HostContext.week`, else the latest tick the
dossier carries; an undated event keeps the `yearsAgo` the dossier states. Every entry keeps the dossier's order where two
are equally old. The existing `ageYears` and `scars` keep their readers (§4.2 S2's stage count, II.7.6, V04); `scars` are
still one per event by the `historyScars` row, and an event of type `magical` is ruin evidence as well (V08 §2.6a).

**(3) The peak and the effective peak's evidence order** (DR36; item 113 (a) (1), (f)).
* **Recorded.** With `peakTier` present at or above the present tier, `peak = { tier: peakTier, population: the maximum of
  populationHistory when it lies inside that tier's population range, symbolic: false, evidence: ['peakTier'] }`; with
  `peakTier` equal to the present tier and no larger recorded population, there is no peak (the present is the high-water
  mark).
* **The documented gap.** SettlementForge writes no `peakTier` on some demotion paths, and never infers a peak from a
  demoted state. With no `peakTier`, the port reads the evidence of a higher tier, strongest first: (1) `tierHistory`'s
  from-tier on a demotion (the highest such); (2) the maximum of `populationHistory`, its tier by the ladder (DR23); (3) the
  losses in `calamityHistory` — the present population plus every calamity's deaths and exodus since the earliest one — its
  tier by the ladder; (4) an institution record `ruined` or `remnant` whose catalogue kind's lowest tier
  (`dossier.catalogue`, V08 §2.4) is above the present tier (a village holding a ruined "City walls and gates" or a remnant
  cathedral); (5) a resettlement after a terminal death — the tier one step above the present. Evidence kinds that show no
  tier above the present are not evidence. The effective peak's tier is the one the STRONGEST present kind shows; every
  kind present is listed in `evidence`, strongest first, for the clerk. `peak = { tier, symbolic: true, evidence }` with no
  population (V06 §3.20.1 sizes it at V11's `history.symbolicQuantile` of that tier's range), and the report notes
  `history_gap` (class report: "{name}'s greatest size is not recorded; the map shows it as {a tier} from the evidence").
* **None.** With no `peakTier` and no evidence, `peak` is absent: no peak is invented, and the events stay soft hints
  (§4.11 (1)).
The peak never contradicts a present dossier fact, and the port writes nothing back (item 20 (h); SettlementForge's own
rule that a peak is never inferred stays its own).

**(4) Destruction and refounding** (DR38). The port marks, and the base's rule and V06's engine decide: `lifecycle.died`
with `resettled` is SettlementForge's terminal death and resettlement — the destruction at `lifecycle.yearsAgo`; an event of
severity `catastrophic` is a destruction candidate whose effect is V11's event-to-epoch row's; `ancientFall` is a
predecessor destroyed before the founding, the present settlement generated on top of it (buried by DR39 when V11's burial
threshold has passed, which 120–400 years always passes unless bare rock lengthens it). An `ancientFall` is not item 109's
older civilisation: `ancient_ruins` stays DR30's (V08 §2.6a (1)); a dossier holding both has both, each by its own row.

**(5) Contradictions and gaps** — each read as defined, never a refusal: an age or founding absent → the `tiers` row's
midpoint, `history_gap`; a founding after the present (a negative age) → no founding, V06's `replayNoSpan`; an event older
than the founding (other than the ancient fall) → kept as given, V06 §3.20.1 (4)'s rule (events before the start replay
growth and decline only); `tierHistory`'s last to-tier differing from the present tier word → the present tier stands (the
dossier's present facts win, item 20), the entry kept as evidence; a `populationHistory` entry above the metropolis cap →
the peak sized at the cap (§1.1; V06 §3.20.1 (4)); a history with no events, no tiers and no peak → no replay (the one-click
path), `ageYears` and `scars` as before.

**(6) Replay and the port afterwards.** The replay's epochs are the creation prefix (§4.11 (2)); the port's first absorb
after creation starts from the present the replay met, so nothing the history built is re-derived at an absorb. A history
fact that later changes is reported (`frozen_fact_changed`), never replayed; a later demotion or resettlement arrives as a
live F8 or F20 change and reaches the epochs, where V06's decline rules — not the replay — act. With history replay off
(V11's switch) the map is the base's, byte-identical (item 113 (g)'s no-op pin), and the port still fills the fields above.
T-V8-51 holds this section.

### 3.16 The port side of items 111, 114, 115, 117, 118 and 120

Each item's mechanism is the base's with V11's rows and its volumes' parts; the port supplies what SettlementForge says.

**(1) Water in dry country (item 111).** A `desert` terrain is the arid climate row: S0 draws a river, a lake and a coast
at the arid row's chances (§4.2 S0 *Water in dry country*), and every water word of the `site` row (V08 §2.6) makes its
water exist whatever the chance — access `river` a river, access `port` a coast and harbour, a river deposit a river,
`fishing_grounds` a coast, river or lake — so a desert on a river, a lake or a coast keeps it. `oasis_water` makes the
oasis exist (DR40): a spring-fed pond or small lake with its grove and irrigated gardens, water for every rule that reads
water. A dossier desert WITHOUT `oasis_water` has no oasis: the deposit list is SettlementForge's statement of what lies
near the settlement, and the arid row's oasis chance is a standalone draw only (J-V8.116); its water is then the rivers,
lakes and coasts the arid row drew and item 111 (b)'s wells on the best-yield ground. `oasis_water` on a non-arid site
gives an oasis too (supplied by the dossier; a dossier's fact wins). A later `oasis_water` removed is V06's failing spring
(V06 W82); one listed later arrives as `discovered` and opens at the next epoch by least disruption — the site stays
creation's, so a later oasis is the spring S1's relief can place in a hollow within the frame, else it is reported and
not drawn (V08 §3.17). The toll bridge's dry-site failure reads this reading (V08 §2.6b (3)). T-V8-50 holds this part.

**(2) Walls — the defence readiness and the wealth (item 114).** The dossier's `defenseProfile.readiness` — the one part of
`defenseProfile` the port reads — becomes `defence.readiness` (the `readiness` row: a band and a need weight in [0, 1]); the
wealth word is `wealth.label` (DR6). **At generation** (item 114 (d)), §7.7's DR41 reads the band and the wealth
level and gives each enceinte run its condition at V11's table shares — a `vulnerable`, poor town shows patched and breached
runs, a `fortress` in a rich city stands whole; with item 113's replay the condition comes from the replay instead.
**Over epochs**, NEED reads the slice's threat with the readiness folded in — the need threat is max(`threat`,
`port.readiness`), so a well-kept fortress in a safe heartland keeps its walls in use and a frontier town's threat is never
lowered by a weak readiness — and MEANS reads the wealth level in force (the `wealth` diff row); V06 §3.7.7 holds
the classes and the transitions. DR2's creation defence reads the threat alone, unchanged. A readiness change is a
`port-values` change riding the next epoch's slice; no readiness (standalone, or a dossier without the field) leaves the
threat alone (the `readiness` row's null). T-V8-52 holds this part.

**(3) "Specified" under the grandeur ceiling (item 115).** The ceiling by rung is §4.7 S10b's rung ceiling, with S2's manor
count at the territory rungs (§4.2 S2), over V11's table; a dossier SPECIFIES a grand building, which then keeps its full
design at any rung (item 115 (c); the ceiling is a default, never a refusal), in exactly these cases: (a) a dossier-bound
record whose class — by its `kinds` row, or item 104 (a)'s resolution for a custom record — is one the ceiling table's
`settings.grandClasses` lists (V11 §3.25.4: the lord's and the ruler's houses), every placed member of a collective record
of such a class included (its count is the dossier's, DR9); (b) a dossier government whose `villageSeat` names the manor
house — seigneurial or crown (V11 §3.21.1) — V07's manor forced as the seat at every village rung (DR11; J-V7.104), at
VILLAGE the one manor the ceiling admits. These are NOT specifications: the wealth word and any prosperity change, a
`Wealthy Residential` quarter or any other quarter name, a notable's role or title alone, a power's standing, a count
range's open top (`openTop` members above `hi` take the ceiling like any building), and a custom record's keywords that
name a grand word without its resolution landing on a grand class. At TOWN and above the ceiling is off and the question
does not arise. A hand edit beyond the ceiling is the user's (item 101 R2; V09, V10). T-V8-53 holds this part.

**(4) Seasons — SettlementForge's calendar and the climate (item 117).** A season is a look only: it never changes the
model or its hash (item 117 (a)). The port writes nothing into the model for it. **The week:** the client sends `view.set {
week }` (§11.3) with `HostContext.week` after each `doc.load` and after each committed offer; under the view's "follow
SettlementForge" flag (§2.9, the default for a dossier map) §7.7's DR42 sets the year position to `week mod 52` by
the `calendar` row (the `sf445` year: 52 weeks, 13-week seasons from spring), so a campaign map opens on its own week;
without a week the view keeps its own position (midsummer by default). The user may pick another week or season in the
view (V09's control) and set it to follow again. **The climate:** the biome's climate row, set at creation, is
`site.climate` (the realm block's climate word through the `climates` row) when present, else the `climates` row's terrain
column, else the user's choice in the blueprint (standalone); §7.7's DR42 applies the height correction on the
map's relief. The climate is part of the frozen `site` fact: a later climate word is reported, never re-drawn. T-V8-54
holds this part.

**(5) Festival decorations — the traditions (item 118).** A look only: never a model change (item 118 (a)). `traditions[]`
and the custom-content traditions bucket (`customContentRoster.traditions`) are read at the pinned baseline — the field
table's paths (V08 §2.4), `traditions` read by the owner's rule and on no `ignored` row — into `DossierDigest.traditions`
(V08 §2.5): the key `trad:<id>` (`trad:uid:<localUid>` for a custom one, `trad:name:<slug(name)>` without an id), the name;
the kind by the `festivals` row; the window as weeks of the `sf445` year — a window stated in campaign weeks reduced mod 52,
a window whose end precedes its start wrapping past week 51, a window of 52 weeks or more the whole year, a window with no
readable week not scheduled (carried, listed with no weeks, and shown only by the user's preview), noted `unmapped_word`;
the staging prose reduced inside the adapter to the keys of V11's staging-keyword table by V08 §3.13 (3)'s tokeniser (the
prose goes no further — no dossier prose enters the document, J-V8.32's rule); and the deity when the tradition names one.
The carried `tradition` facts (V08 §2.3) are the schedule §7.7's DR43 reads: a festival's decorations show while the
view's week (item 117's year position) falls inside its weeks, placed by §8.2's decoration rows at the named or keyed place,
else the festival kind's fallback (item 118 (c)), their colours and motifs from `site.culture` (the culture's key, never the
`culturalIdentity` prose) and the deity. A tradition added, changed or removed is a ledger-only change (V08 §3.5's
`tradition` row). Two festivals in one week both show, each by its own keyed draws. T-V8-55 holds this part.

**(6) Find — the dossier's institution records as list entries (item 120).** Find is a view only (item 120 (a)): the port
writes nothing for it — no digest field, carried fact, event or view key — and its dossier entries are read, at each commit
with Find's index (item 120 (j)), from what the port has carried and bound: the carried `institution` facts (V08 §2.3) with
the binding rows (§7.7 item 12), as §11.2's `gazetteer` lists them — its `dossier`-tier rows, grouped by binding key (a
key resolved to its addresses by `entity { dossierKey }`, item 583) — at the viewer's effective key (V09 §2.10).
(a) **The entries.** Every dossier institution record that is not `removed` (§7.7 item 14) and whose binding key holds at
least one row — placed, present as its ruin, or bound as an alias — is one entry, first among Find's named institutions
(item 120 (b): "the dossier's names first, as SettlementForge gives them"), in the dossier's own order
(`DossierInstitution.order`). Its words are the record's name with only its numeric count range dropped (`kindLabel`, V08
§3.5.1 (a)) — `Blacksmiths (3-10)` reads "Blacksmiths"; `Brothel (red light district)` and `Cathedral (10,000+ only)` read
whole — beside its count and its kind: the count is how many addresses its key's rows hold (a collective record's
placed members `#1…#n`, one for a singular record), the kind the `label` cell (V11) of the class those rows bind — for a
custom record the class item 104 (a)'s resolution gives at fold. Selecting the entry selects exactly those addresses — its
members, its ruins and every alias row on its key — and never another building of its class: the record "Blacksmiths · 5"
and the class entry "Blacksmith · 7" (item 120 (b): every building of the class, dossier-bound or not) are two entries.
(b) **Merged, pseudo-class and quarantined records.** A lesser merged into its greater (V08 §3.5.1 (c)) is its own entry
under its own words, selecting what its key binds — the greater's member, a churchyard `cross`, an enceinte — so "Parish
church" still finds where the dossier's parish church went; a pseudo-class record (V08 §2.6 `kinds`) is an entry exactly
when its key binds an element (an `@pin:*` record's pin, an `@seat` record's seat) and none when it binds nothing (`@none`,
`@absent:*`, a `(0-0)` range noted `not_placed`); a quarantined record (V08 §3.9) keeps its carried words and its rows, and
so its entry. Two records whose words coincide are two entries, each followed by the district of the address its first
row holds.
(c) **Typing.** The entries' words are matched as names by item 120 (c)'s rules — prefix and whole-word, one typo forgiven
in a word of five letters or more, case-folded — over every word, the qualifier words included ("red light" offers
`Brothel (red light district)`), in whatever language SettlementForge wrote them (V08 §5.5). They are never lexicon words:
V11's synonyms do not match them, and no dossier word becomes a synonym of a class (V11 W87).
(d) **Knowledge.** An entry, its count, its suggestions, its glow and its pins pass §11.2's admission at the viewer's
effective key like every Find entry (item 120 (h)): a record none of whose addresses the key admits — a `secret` Thieves'
Guild under "See what the players see" (V08 §3.14 (5)) — is never suggested, listed, counted, drawn or hinted at; an
admitted record counts and glows only the addresses the key admits; an `unexcavated` element is absent and a concealed use
(item 63) never named.
(e) **Over time.** A chip holds through every commit, absorb, epoch, undo, load and migration until Clear or close (item
120 (a), (f)). A dossier entry's chip names its record by its binding key and, as its anchor, the address its key's first
row held when the chip was set (the chip's dossier form in §2.9's `find` key). At each re-evaluation the chip selects its
key's rows; a key that no row holds any more — re-keyed by a `rebind`: a receipted rename (F15), a ladder promotion (V08
§3.5.1 (d)), a line migration (V08 §3.8) — is replaced by the key its anchor's entity now carries (`Identity.dossier`), so
the chip stays on its record and shows its new words; a chip whose key and anchor both bind nothing (the record removed,
its building gone) selects nothing and shows 0 until cleared (item 120 (f): "a closed one goes dark"). A record an absorb
adds is an entry from the commit that folds it.
(f) **The dossier's other names.** Its notables reach Find as people, through "Where is" (the dossier-backed `Person`, V08
§3.11); its quarter names as the districts they named (§7.7 item 16), Find's area entries (V01's, item 120); its deposits'
labels as hinterland places (V08 §5.2's `DepositSite` row). A SettlementForge or custom chain is no entry: it is a
relation, offered by the Show menu's **SettlementForge's chains** under its knowledge rule (V08 §5.2).
(g) **The host's surfaces.** Find lives in an owner's or editor's frame (V09's panel). The party picture set is drawn
without it — a chip is the viewer's view, never a party render's option (V08 §3.14 (2)) — and a player's tab has no Find
(pictures and the party gazetteer; a live player map after M-SF, V08 §11 Q5); a DM's handout "where the smiths are" is a
picture the frame's export menu draws with Find shown, at the export's knowledge key (item 120 (i); §11.1).
SettlementForge's assistant (V08 §4.4) answers "where are the smiths" in words from the `gazetteer` query and sets no chip
— no host message sets the frame's view but `view.set { week }` (V08 §3.16 (4)) — while the in-frame clerk's "show me …"
is V10's (item 120 (i); J-V8.127). T-V8-58 holds this part.

**What the port never does for these items.** It writes no event for a season, a festival or Find, sets no view key but
`week` through `view.set`, and feeds no look or view back into the model; the readiness and the history are read at
creation and through the slice, never recomputed by the port at render time.

### 3.17 Edges — every mechanism at its limits (principle (11))

Every mechanism of this volume has a defined outcome at the extremes of its inputs, a rung of its failure ladder (§5:
check, repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a
test (J-V8.117). T-V8-49 runs every row on the host harness (V08 §7.2) with the fixture pairs and test-side mutations, at
THORP (P = 40), HAMLET, VILLAGE, TOWN, CITY and METROPOLIS (the cap's 120 000 and one above it), with the village product
registered and without it, and through save, load, undo, redo, regenerate and migrate. The edge classes: **none** (no
input), **one** (exactly one item), **cap** (the maximum and its caps), **degenerate** (for the port, which carries no
geometry: empty, zero-sized, self-referring or coincident inputs; the geometry the map builds from them is the base's, whose
kernel refuses a degenerate result to its stage's failure class, E-GEN-1), **data** (missing, empty or contradictory, the
dossier included), **rungs** (every rung and toggle), **lifecycle** (save, load, undo, redo, regenerate, migrate). A dossier
event is never an undo target (§7.4), so a row's undo and redo clause is always the map edits' around it.

**(a) The mechanisms.**

| mechanism | the extremes and their defined outcome | rung | test |
|---|---|---|---|
| the map record (V08 §2.1) | data: a record read with a field its client version predates takes the default of V08 §2.7's migrate column; a tail whose `seq` has a gap, or whose last `logHeadAfter` differs from `logHead`, is a damaged store — the client reloads once, then the module's §2.9 step 3 verification runs B10's ladder; a `backups` entry whose `docId` is not the `mapId` is never restored (B10 and the restore skip it) | repair locally → B10 | T-V8-49 (a), T-V8-5 |
| the messages (V08 §2.2) | data: a message missing a required field or of an unknown type is ignored and reported (§11.3); a `dossier.offer` without `dossier` is `E_UNKNOWN_SHAPE` (B3); a `party.render` with empty `places` renders the base tier only; `exportScenes` with no format makes no request and returns `[]`; one: a `host.state` with only `party` updates only the party copy | check | T-V8-49 (a), T-V8-2 |
| the carried facts and the binding (V08 §2.3) | data: an offer to a document with no dossier block (a standalone document) is refused `E_OTHER_SETTLEMENT` — only a document created by the port is bound; a stored block unequal to the fold's rebuild is §2.9's load mismatch (the fold's wins, reported); two records of one key are `duplicate_key` (§14) | check | T-V8-49 (a), T-V8-5 |
| the digest's additions (V08 §2.5) | data: every addition is optional — no history → no replay, no readiness → null, no traditions → `[]`, no climate → the terrain column; a readiness score outside 0–100 is clamped; a tradition window with no readable week is carried unscheduled (V08 §3.16 (5)) | check | T-V8-49 (a), T-V8-51 – T-V8-55 |
| the row sets (V08 §2.6) | data: a word no row lists takes the row's `else`, noted `unmapped_word`; a count range written with its bounds reversed (`(8-3)`) is read `[3, 8]`, noted; a range `(0-0)` places no member and carries the record, noted `not_placed`; rungs: the `site` row's water words force their water at every rung (village rungs through V07 §3.1) | substitute | T-V8-49 (b), T-V8-23 |
| custom content's records (V08 §2.8, V08 §3.13) | none: no custom content gives empty lists and no custom event; one: one keyword, one chain node, one service each digest as specified; data: a chain whose resource and processors join nothing is carried, drawn nowhere and noted; a library entry for a definition the dossier lacks is ignored (`library_mismatch`); degenerate: a cross-link from a node to itself makes no row; lifecycle: the admitted fields are carried in the document, so a save, load, undo, redo or migration never needs the host, and a regeneration re-resolves from the carried facts | check; leave out and report | T-V8-49 (c), T-V8-25 |
| the embed (V08 §3.1) | degenerate: a tab of zero width or height creates no frame until it has a size; a frame shrunk to zero keeps its document and draws nothing; one: a campaign with one settlement mounts and switches as with many | check | T-V8-49 (d), T-V8-1 |
| offering and coalescing (V08 §3.2) | lifecycle: an offer while a load verifies waits for it; while an owner's upgrade is available it runs under the document's own output version; after a restore or a new map it follows the fresh `doc.load`; after the DM's own undo, redo or Re-derive moved the head it is stale and re-runs (B8); after a host undo of the dossier it converges forward (F22); one: a single version offered is absorbed once; none: an identical dossier is never offered | retry that piece | T-V8-49 (d), T-V8-6, T-V8-7 |
| the refresh queue (V08 §3.4) | none: an empty queue creates no frame; one: one map runs every step and closes the frame; cap: no count limit — the queue is serial, each map bounded by V08 §6's row, and a queue longer than the page's life resumes from `refreshPending`; data: a queued dossier that is unreadable holds its map (B3) and the queue continues, a record deleted meanwhile (B15) is skipped, another settlement's dossier is B6; rungs: village-rung maps refresh through the village product, a CITY or METROPOLIS map only beside a visible TOWN or smaller (page memory), a population above the cap is B7; lifecycle: a map opened visibly is absorbed there and dropped from the queue, a lease lost to a restore or a new map (`stale`) re-reads the record, a page reload resumes | retry that piece | T-V8-49 (e), T-V8-12 |
| the digest and the diff (V08 §3.5) | none: a dossier with no institution creates a map of its population and site with no dossier-bound use; one: one changed field makes one change; cap: more dossier-backed records than the map has seats — a THORP or HAMLET dossier with a few dozen custom institutions absorbed at once — seats every one past the last plot by §4.7 S10b's last rung (a new outside plot on the hinterland face nearest its affinity district, reported `W_DOSSIER_EDGE`), none omitted (§7.7 item 2); degenerate: a record listed twice under one key is `duplicate_key`, the later kept by `order`; data: a population of 0 is V08 §3.6 (7)'s; a population above 10⁷ is `E_UNKNOWN_SHAPE`; a frozen fact changed is reported only | check; substitute (S10b's last rung) | T-V8-49 (f), T-V8-20 |
| the ladders (V08 §3.5.1) | degenerate: a record that is both a greater and a lesser of present records merges into its highest present greater only, once — the port walks each ladder row once, greatest first, so no merge loops whatever the rows hold; a `(lo-hi+)` with `hi` below `lo` reads as reversed bounds (above); cap: an open top stops at V11's per-kind-and-rung cap, reported; rungs: an unnumbered record at a village rung takes V07 §2.4's range row | check | T-V8-49 (f), T-V8-44 |
| changes to events and epochs (V08 §3.6) | none: no change writes no event (`unchanged`); a span with no year end, no crossing and no calamity makes no epoch; one: one change is one event or one epoch entry; degenerate: an absorb week before the last epoch's (`W₁ < W₀`, a host that turned its clock back) makes no epoch and folds its dated changes after the last epoch, applied finished; data: an undated change is `unreceipted_change`; rungs: an epoch that crosses a product's band is V07 §2.1's fold; lifecycle: epochs replay from the log under their version, and an absorb's epoch is no undo target | check | T-V8-49 (g), T-V8-42 |
| persistence (V08 §3.7) | degenerate: a compaction with no event since the last snapshot is skipped; `backupDepth` 0 keeps no backup, B10's second and third rungs are skipped and the restore control hidden; data: a quota below the snapshot's own size shows `host.status.overQuota` and never refuses a commit (B21); lifecycle: a snapshot, a restore and a new map each send a fresh `doc.load` | simpler shape (the trim order) | T-V8-49 (h), T-V8-5, T-V8-57 |
| versions and migrations (V08 §3.8) | degenerate: a remap list with no field re-baselines nothing and notes nothing; a `fromLines` identity that changes no key writes no `rebind`; data: a malformed version string is an unknown version — a schema read-only (§2.9 step 1), a line `E_LINE_UNSUPPORTED` | check | T-V8-49 (h), T-V8-10, T-V8-11 |
| failure handling (V08 §3.9) | degenerate: two failures at once take their rows in the order of detection — load (B10) before offer (B3) — and a failure during a rung's recovery restarts that rung once (B2 during B10's rebuild re-creates the frame and rebuilds), then leaves the thumbnail; no row loops and none re-rolls | retry that piece, once | T-V8-49 (h), T-V8-14 |
| the village hand-off (V08 §3.10) | data: a missing population is B3; a tier word disagreeing with the population is ruled by the population (DR23), the title keeping the dossier's word; a population exactly at the band's edge is V07 §2.1's; lifecycle: one document across both products survives save, load, a regeneration (the product at the document's rung) and a migration (each product's version axis) | check | T-V8-49 (i), T-V8-19 |
| determinism (V08 §3.12) | lifecycle: save, load, undo, redo, regeneration and migration leave the port's inputs — the log and the pinned tables — unchanged, so two editors' re-runs match after each | check | T-V8-3, T-V8-49 (i) |
| the players' view (V08 §3.14) | rungs: at a village rung the set covers V07 §5.2's township view; at METROPOLIS the z3 level stops at 64 tiles (the fallback 32); lifecycle: the set is stored outside the document, re-rendered when the head, the party revision or the output version moves (B18), a reveal of a place a restored map lacks is skipped and kept, an upgrade re-renders after the DM upgrades | leave out and report | T-V8-49 (j), T-V8-41 |
| the history's reading (V08 §3.15) | as V08 §3.15 (5) states each case | substitute | T-V8-51 |
| items 111, 114, 115, 117, 118 at the port (V08 §3.16) | data: a desert with no water word and no `oasis_water` has no oasis; a readiness absent leaves the threat alone; a record naming a grand word with no grand class is not "specified"; no week keeps the view's own; a tradition with no week is unscheduled; rungs: a government's `villageSeat` manor, seigneurial or crown, is specified at THORP, HAMLET and VILLAGE alike, and at TOWN and above no ceiling applies | substitute | T-V8-50, T-V8-52 – T-V8-55 |
| Find's dossier entries (V08 §3.16 (6)) | none: a dossier with no institution record offers no dossier entry, the class, area, place and people entries standing; one: a singular record is one entry of count 1; cap: every record of a METROPOLIS dossier, up to the adapter's 2 000 (V08 §2.4's `limits`), is an entry of Find's per-commit index, matched within item 120 (j)'s budget; degenerate: two records of one wording are two entries told apart by district, and a merged lesser selects its alias target; data: a `removed` record and one whose key binds nothing (`@none`, `@absent:*`, `(0-0)`) are no entry, a quarantined record keeps its carried words, and a record the key does not admit is never suggested or counted; rungs: at a village rung the records V07's resolution binds, pins included; lifecycle: a chip on a re-keyed record follows its anchor, a chip on a record the map lost shows 0 until cleared, and save, load, undo, redo, regenerate and migrate change an entry only through the binding rows they change | check | T-V8-58 |
| editing (V08 §4.1, V08 §4.3, V08 §4.5) | none: a map with no edit absorbs as a map with edits (nothing to keep), and a map with no custom content has no custom declaration to keep; one: one element's change touches its disruption set only, and one declaration on a custom record names it by `inst:uid:<localUid>`, so it survives every rename and revision; data: an edit naming a dossier element the dossier removed is orphaned and reported (the pin yields, §7.4 — the dossier removing what an edit pinned), a declaration on a custom record the dossier no longer lists included (§7.7 item 3), and an edit of a custom chain's or service's fields is refused `dossier-owned` with the map-side alternatives (V08 §4.5); lifecycle: a removal of generated item-110 content is undone and redone by the log (the slot re-opens and closes), and a custom record's revision landing between an undo and a redo re-sites around the declaration in force at its seq | check | T-V8-49 (k), T-V8-37 |
| the host actions (V08 §4.2) | rungs: every control is offered at every rung by role alone; "Restore previous map" only while a backup exists | check | T-V8-47 |
| the host clerk (V08 §4.4) | none: with no map open a headless session answers and closes; one: one tool call is one `query` or `preview`; data: an answer field outside the projection's kept list never leaves the frame (the list is a whitelist); lifecycle: a proposal waiting across a load, an upgrade or an undo that moved its base is answered `stale` and dropped | check | T-V8-49 (k), T-V8-27 |
| the DM's view (V08 §4.6) | degenerate: an absorb group always holds at least one change (a run changing nothing writes no event); a note whose `keys` bind nothing admitted is not drawn | check | T-V8-14 |
| the Map tab and the frame (V08 §5.1) | none: with no thumbnail stored the tab shows its container and banner only; degenerate: V08 §3.1 step 3's zero size | check | T-V8-49 (d) |
| drawing the records (V08 §5.2) | degenerate: a chain whose consecutive nodes share one building draws no zero-length segment and one arrowhead; a condition with no target is named in the legend only; rungs: every row draws at every rung, village rungs through V07's product | simpler shape | T-V8-49 (l), T-V8-25 |
| pictures (V08 §5.3) | none: a map with no building still draws its ground, water and ruins; one: a `knowledge` option holds for its one export only — it lowers the requester's key and never raises it, a bare tier read with the requester key's places (item 572); data: a `displayNames` entry for an unknown key is ignored, an empty veiled text withholds the name as unnamed; lifecycle: thumbnails re-render at the next commit after a restore, a new map or an upgrade | check | T-V8-49 (l), T-V8-16 |
| what leaves the frame (V08 §5.4) | data: a bundle request for a format the calling key's rules refuse answers `export.refused` for that format and returns the others | check | T-V8-48 |
| labels (V08 §5.5) | none: an empty dossier name is refused at shape (B3), so a title always exists; one: a single named place is named by the key rules like any; data: a name in a script the fonts lack falls to §9's glyph fallback, and a locale the module does not ship shows the source language | substitute | T-V8-49 (l) |

**(b) Where this volume's features meet the others'** — each with its outcome and its clause of T-V8-49 (m); its rung is the feature's own at its home, the port adding none: a dossier or custom record the feature's rule cannot seat takes F-SITING's rungs (§5.2: its closest option by §7.7's precedence, the hard rows it fails reported, never omitted), and the party column's rung is `check` (§9.2's admission under the party key decides what is named). The port
places nothing itself: a dossier record is sited by S10b's rules with its class's rows, a custom record by the class item
104 (a)'s resolution gives it, and the party set draws what the base draws under the party key. So every combination
below holds the base's or the named volume's rule for the feature, with the port's part stated.

| feature (its home) | × the dossier | × custom content | × the players' view |
|---|---|---|---|
| cliff, steep ground (§4.2 S1, item 106) | a dossier record whose class cannot stand on the slope is sited on the nearest admissible plot by S10b's relaxation, reported like any siting miss; a dossier element never forces a building onto a cliff face | as the dossier's, once its class is resolved; a custom chain's route follows the way graph, and a pair of nodes the cliff disconnects draws no segment between them (reported by the view's legend) | drawn as the base draws it; a revealed place on the edge named like any |
| river, coast, harbour (§4.2 S1, §4.3) | the water words force their water (V08 §2.6); a harbour record on a site with a river or a lake but no coast stands by §4.2 S1 (6)'s river or lake harbour; on a site with neither, it takes F-SITING's dossier rung — its first closest option by §4.7 S10b's order, the harbour hard row it fails reported — and is never omitted (§7.7 item 2; §5.2 F-SITING), while no harbour basin is drawn on dry land (§4.2 S1 (6): the basin left out and reported) | a custom `water` resource on a site with neither is its lake (V08 §3.13 step 4); a chain's endpoint at the quay or the gate facing its partner | drawn; ice and boats by the season (item 117), a look only |
| moat (§2.7, item 106) | a wall record's moat follows DR2 and the `era` row; the conduit house never takes a moat's water as an aqueduct source | a custom record needing water may take the moat by its class's row | drawn |
| raised ways, retaining walls, deck plots (item 110) | never dossier-bound (V08 §4.1); a dossier record may stand on a deck only by V11's `deckOk` | as the dossier's; a custom `landmark` feeds DR35 | drawn as generated content; their removal holds (V08 §4.3) |
| squares and markets (§4.4) | a market record claims the square by DR10; with no open space, the flanking square (the base's fallback) | as the dossier's | drawn; a festival's stalls by item 118's rows, a look only |
| the oasis (item 111) | exists exactly with `oasis_water` (J-V8.116) | a custom water resource is not an oasis unless its record is `oasis_water` | drawn with its grove and gardens |
| the frame and the zoom-out limit (§3.2 (9), item 116) | the frame is the dossier map's `bounds`, which the port does not set | — | the party set covers the frame of the city-band view (V08 §3.14 (2)); the viewer's zoom-out stops at the set's z0 |
| wards and terraced wards (V01) | quarter claims (§7.7 item 16) land on wards by V01's claim rule; a district-scale record becomes a neighbourhood (V08 §2.6 `distribution`) | as the dossier's | drawn; a ward name the party key does not admit is not named |
| building tiers, plans, crypts (V02, V03) | a crypted class by V03's rows; the grandeur ceiling's "specified" (V08 §3.16 (3)) | a custom record's `material` reaches only its material row (V02's use) | a crypt is drawn only at the building band and only for an admitted place (z3) |
| the underground: sewers, caverns, ruins, catacombs, vaults, accesses (V04) | DR30–DR32 inputs only (V08 §2.6a); a closure stagnates, never shrinks | a custom record resolved to a subterranean class takes V04's access rules; a custom `subterranean` resource is a mine or quarry at the hinterland edge | the party set draws the surface band only (no underground layer in the set); a revealed underground place is named in the gazetteer |
| sky islands, shade, sky access, landfall (V05) | the port reads nothing of the sky; `magical_node` feeds V05's node term (V08 §2.6 `deposits`) | a custom record never places an island (V05's own supply) | islands and their shade drawn by the base's rows under the party key |
| the history (V06, item 113) | read at creation only (V08 §3.15) | a custom record takes no part in the replay beyond the present's facts | the replay's remains drawn like any fabric; the history's story is the clerk's, the party gazetteer lists no replay record |
| light and the season (§8.2, items 102, 117) | the latitude (DR29) and the calendar week (V08 §3.16 (4)) are read; the model-side sun never moves with the season | a custom record's building lit like any | the party set drawn with the fixed sun, the season the view follows |
| editing, undo and save or load (§7, §7.4) | a dossier event is never undone; a map edit around it is | a DM's declaration on a custom record keys by `localUid` and survives every revision, undo and reload (V08 §4.5) | a reveal's undo is "Hide again"; the set is stored outside the document and survives every save and load |

## 4 Editing

### 4.1 No new declaration; two host-only events; item 110's generated content is never bound

The stage adds no authoring tool: a DM edits a SettlementForge map with item 101's twelve tools exactly as a standalone map
(§7.1, §14), under §7.7's precedence line, and every map edit — a move, a lock, a rejected site, a positive placement, a
style — lives in the map's log and survives every absorb (§7.7 items 3–5). The two dossier event kinds, `dossierFacts` and
`dossierRecord` (§7.1; item 358), are host-authored: an edit of either kind whose author is not `host` or whose session is
not `host:port`, or that arrives in a `doc.changed` from a client, is refused F-EDIT `dossier-owned` (§5.2, §7.7 item 11) —
only an editing client's `dossier.result` produces them. A user's edit of a staged record's fields (a condition's
severity, a notable's posting) is refused the same way; its display — a label's text, visibility — stays the user's
(§9.1). A season or a festival is a view setting (§2.9), never an edit (V08 §3.16 (4), (5)).

**Generated item-110 content is never dossier-bound** (J-V8.66; item 260). A raised way, a retaining wall (a generated
terrace's walls among them) or a deck plot the generator made (item 110) is generated content (a terrace itself is a
flatten stroke with its retaining walls, so no delete targets it and item 260 has no suppression kind for it). No dossier
record binds it: it carries no `Identity.dossier`, even when a dossier record fed its reason (DR34, DR35), and its
provenance names that record for the clerk's `why`. A DM, a co-DM or an accepted clerk proposal removes it with the base's
delete of generated content (§7.1), never with §7.7 item 3's `rejectSite`, so the removal never lapses. The dossier's own
records keep their protection: the conduit house bound to the water record stays dossier-backed, and a map delete of it
is a `rejectSite` like any dossier element's. A DM who wants an aqueduct at a TOWN draws it (T4 `road` with `raised`, or
the aqueduct class; item 110 (b)); a drawn one is a declaration, held like every declaration.

### 4.2 The host-side actions in the Map tab

Each is a control in the frame's header (V08 §5.1), offered by role — except the load-mismatch keep, listed for its
lifecycle and drawn by the shell — and each has one event or one store operation, its undo and its lifecycle. Only the DM
(`owner`) and a co-DM (`editor`) have a frame; a player's tab has no actions (V08 §3.14).

**How a click reaches the page** (J-V8.88). The controls are drawn in the frame (`HostSlots.header`, V08 §3.1 step 7 (b)),
but most operations are the page's — the host holds the dossier, the store and the assistant's settings. So a control
whose operation is the page's posts `host.action { action, args? }` (V08 §2.2), which the client surfaces as
`MapSession.on('action')`, and the host runs the row's operation with the calls named there; a control whose operation
commits an event ("Update the map engine") commits it in the frame through `doc.changed`, and the client then asks for
`doc.snapshot` as V08 §3.7 says; "See what the players see" runs in the frame alone. Keeping the saved town after a load
mismatch has no header control: it is V09 §3.14's load-mismatch choice, which the shell shows the owner at load, so one
event has one control (J-V8.94). A control that needs a confirmation ("Restore previous map", "Make a new map from the
record") shows its dialog in the frame first — the restore dialog lists the map edits after `backups[0].logHead`, which
the frame holds from `host.state` — and posts only on confirmation. No control posts anything else (T-V8-47). The
controls' and dialogs' words are `host.control.*` and `host.dialog.*` rows (V08 §5.1).

| action (role) | what it does | event or store operation | undo | lifecycle notes |
|---|---|---|---|---|
| Refresh now (owner, editor) | offers the current dossier at once | `host.action { refresh }` → the host's `MapSession.offer` with its current dossier → `dossier.offer` → committed dossier events | none: dossier events are no undo target (§7.4); the map converges if the host later restores (F22) | the record's `lastOffer`, `absorbed`; the party set re-rendered (V08 §3.14 (3)) |
| Update the map engine (owner) | upgrades the document to the running output version; the dialog summarises §7.5's diff in words — what moves, what the new version adds (raised ways, retaining walls and deck plots among them, each removable after the update), what it retires | in the frame: an `upgrade` event through `doc.changed`; the client then sends `doc.snapshot` and calls `replaceSnapshot` | `undo` of the upgrade (§7.5), in the session and after reload while `from` is in the window | `snapshot.outputVersion` changes at the compaction; the party set re-rendered |
| Keep the saved town (owner; after a load mismatch) — no header control | §2.9 step 4's keep: V09 §3.14's load-mismatch choice (`error.mismatch`'s **Keep saved** · **Use rebuilt**, V09 §4.9), which the shell shows the owner at load (J-V8.94) | in the frame: after its keep commits the `rebase` through `doc.changed`, the client sends `doc.snapshot` (a compaction) | §7.4's rebase undo | §11.3's bridged rule: other clients install it |
| Restore previous map (owner; shown only while `backups` holds one) | makes `backups[0]` the snapshot with an empty tail, then absorbs the current dossier; refuses a backup whose `docId` is not the record's `mapId` | `host.action { restore }` after the frame's dialog → `MapStore.replaceSnapshot` with the backup; a fresh `doc.load` to every open session (`module.status { loading }` between); then an offer | "restore" again swaps back (the replaced snapshot becomes `backups[0]`) | the dialog lists the map edits the restore loses — a removal of generated item-110 content made after the backup among them (V08 §4.3) |
| Make a new map from the record (owner) | a fresh creation from the current dossier under a new `mapId`; the old record is kept under its own `mapId` | `host.action { newMap }` after the frame's dialog → a creation offer under a new host-minted `mapId` and `MapStore.create` of the new record; the host points the settlement at it; a fresh `doc.load` to every open session | "Go back to the old map" (the host points the settlement at the kept record again) while the host keeps it | the old `mapId` is not deleted by the module; whether and how long the host keeps it is SettlementForge's (J121; B11 detects a pointer to a lost one); the old record's `backups` are never mixed into the new one's (restore refuses a foreign `docId`) |
| Reveal to the party (owner, editor) | adds places to what the party knows | `host.action { reveal, args: { places } }` → `MapSession.setParty({ reveal: places })` → `MapStore.setParty` (compare-and-set on `party.rev`), then the party set re-rendered and `host.state { party }` re-sent | "Hide again": `host.action { hide, args: { undo: true } }` → `setParty({ prev: true })` (one step); an older reveal is undone by hiding it | `MapRecord.party` (V08 §2.1, V08 §2.7) |
| Hide from the party (owner, editor) | removes places from `party.places` | `host.action { hide, args: { places } }` → `setParty({ hide: places })` | "Reveal again": `host.action { reveal, args: { undo: true } }` → `setParty({ prev: true })` | as above |
| The party's base knowledge (owner) | sets `party.tier` (`public`, or `local` for a party native to the town) | `host.action { partyTier, args: { tier } }` → `setParty({ tier })` | `host.action { partyTier, args: { undo: true } }` → `setParty({ prev: true })` | as above |
| See what the players see (owner, editor) | the frame's `ViewOpts.viewAs` set to the party key — a display filter; the frame's key stays `secret` (V08 §3.14 (5)) | in the frame (the header's toggle), or `MapSession.seePlayersView(on)` → `host.state { playersView }`; no view-state write, no store write, no event, no `host.action` | the same toggle | the frame's view options only (session memory) |
| Assistant settings (owner) | opens SettlementForge's own assistant settings — its AI setup, whose provider, model tier and key path follow SettlementForge's decisions (J121; §14's clerk); where the deployment enables the built-in clerk, the resulting V10 configuration is sent to the frame | `host.action { assistantSettings }` → the host opens its settings surface (outside the Map tab; J-V8.35 holds for the tab) and, for the built-in clerk, calls `MapSession.setClerk(config)` → V10's `clerk.config` (V10 §3.17; item 473) → `ClerkMount.host` and `HostSlots.clerkMode` (V08 §3.1 step 7 (a)) | the previous configuration, re-sent | the host keeps the choice; the module keeps no secret beyond the session |

### 4.3 Locality, protection and the dossier's reach

A dossier event mutates only its disruption set (§7.7 item 5; T20-8), around every lock, pin, positive placement and
declared entity (§7.2); an edit it can no longer honour is reported and orphaned, never dropped (J-A20.73). A dossier
change of exactly one element touches only that element's disruption set; a change of none writes no event (V08 §3.5). A
DM's rejection of a dossier element's site holds until the settlement grows or declines past the roster tolerance (§7.7
item 3). Nothing a player does changes the model: a player holds no document and no session (V08 §3.14), and the players'
reveals change only `MapRecord.party`, never the log.

**The removal hold for generated item-110 content.** Removing a generated raised way, a retaining wall (a generated
terrace's walls among them) or a deck plot (V08 §4.1; item 260's suppression kinds `raised`, `retaining`, `deckPlot`)
holds through every absorb, every catch-up epoch, a rung change, a line re-key (`rebind`, V08 §3.8), an `upgrade` (§7.5's
mapping hands the tombstone to its successor), the load-mismatch keep (V09 §3.14; the rebase keeps the log's edits) and a
host undo that re-offers an older dossier (F22 converges forward; the delete stays in the log). Only "Make a new map from
the record" (a new document) drops it, and "Restore previous map" drops it when the restored backup predates it — the
restore dialog lists it among the edits lost. A removed raised way's slot stays closed: when a later dossier change raises
the cap (V08 §2.6b (1) (d)), the reason may open a NEW slot only, which the history panel announces as new (V08 §4.6). The
slot mechanism is item 110's in the base (item 260; J-VI.14).

### 4.4 The host clerk — SettlementForge's assistant as a client of the tool API

In the SettlementForge module the clerk is SettlementForge's own assistant, driving the map's tool API through the host
seam (configuration C, V10; J122 V10 Q2); its provider, model tier and key path follow SettlementForge's AI setup, read as
inputs and never decided here (J121; §14's clerk). It is a clerk in §11.2's sense: it drives the map through the tool API
alone, over the bridge, with nothing added for it (J-A101.83). Its wiring:

1. **Session, rights and the relay** (J-V8.73). The assistant acts on the map only inside an editing user's session — the
   DM's or a co-DM's — through that session's `MapSession.query` and `.preview`, with that user's role and knowledge key and
   never a role of its own (J-V8.21). Wherever its model loop runs — SettlementForge's server or its page — its map tools
   RESOLVE IN THE DM'S PAGE: the page receives the tool call through SettlementForge's own channel, executes it with `query`
   or `preview` and returns the answer the module posted, already projected in the frame (V08 §5.4 (3)): the page carries no
   projection code and never holds a full answer, so the contract holds for either placement of the loop. When no map is
   open, the client opens a headless session (the refresh mode's frame, V08 §3.4) for the call and closes it after; the
   cost is one load (V08 §6). **A player's assistant never has a session**: it reads the stored party gazetteer (V08 §3.14
   (2) (c)) on SettlementForge's side, which holds only what the party knows; with no party set stored it has nothing to
   read, and says so (`host.party.notOpened`).
2. **Reading.** The kinds offered to the host clerk are those of V08 §5.4 (3)'s table: the base's `gazetteer`, `people`,
   `whereIs`, `relations` and `fates` by that section's rows, and the reader kinds of V10 §3.17's table — `brief`,
   `entity`, `sites`, `why` (with its sections), `frame` without `near` and `radiusM`, `rule` and `profile`; `measure`,
   `hit` and `inView` are refused `E_HOST_KIND`. Answers are paged at 64 KB, every row marked with its tier (`dossier`,
   `declared`, `map`) and filtered by the key; an answer with no row is an empty page, never an error. For a dossier
   element, a `why` answer names the derivation row that placed it (DR10), the relation, supply and siting rows that pulled
   it (item 103's families, from provenance — the rows V11 writes), and the dossier change that caused its current state:
   `changeId`, `source`, `week` and SettlementForge's own reason (§7.7 item 13), so "why is the tannery here" and "why did
   it move in week 40" are answered from the log. "Why is this quarter poor" reads the field's drivers, item 102's daylight
   share among them (the answer's form is V10's). For generated item-110 content, `why` names its reason — a drop, a link
   or a water need — and the DR34 or DR35 inputs it read ("the city's water system (SettlementForge) and a spring in reach
   to the north"), in V10's words. For a wall run, a replayed history, a season or a festival the answer is V10's from the
   records these readings fill (item 114's run story, the `HistoryRecord`, the view's week and the carried traditions).
3. **Proposing.** The assistant proposes through `MapSession.preview(events, { view: true, proposal })`, the proposal body
   item 473's. What the frame does with it is V10 §3.17's host proposal intake, cited: the card in the frame, Accept sending
   `doc.changed` with `proposedBy: 'clerk'` and the DM as author, and the module's `clerk.proposal { id, status, seqs? }`
   answer, which reaches the page as the session's `clerkProposal` event so the assistant learns what the DM chose; a
   refused `clerk.config` reaches it as `clerkConfigRefused`. A proposal that touches a dossier fact is refused
   `dossier-owned` with the closest alternatives (§7.7 item 11), so the assistant can suggest where the dossier's smithy
   stands but never add, remove or rename it — for that the DM changes the dossier in SettlementForge. A proposal to remove
   generated item-110 content is an ordinary delete of generated content, never refused (V08 §4.1).
4. **Prose.** The map passes no dossier prose to any assistant: this port line carries no description seed (V10 §1b.5; item
   519); SettlementForge's assistant has the dossier on its own side.
5. **Limits.** One preview in flight per session (a newer one replaces a pending one, as §12.6's settle rule); queries are
   answered in the generation worker between batches and never delay an edit.
6. **The built-in clerk (V10) in host mode** — built at M3c and run only where the deployment's configuration enables it
   (J122 V10 Q4; §14's clerk). It runs inside the module. The owner's "Assistant settings" (V08 §4.2) leads to SettlementForge's settings,
   and `MapSession.setClerk(config)` sends V10's `clerk.config`, which the embed's bridge handler routes to
   `ClerkMount.host` and `HostSlots.clerkMode` (V08 §3.1 step 7 (a)); the harness's `needsToken()` posts `clerk.needsToken`,
   which reaches the page as the session's `clerkNeedsToken` event, and SettlementForge answers with a new short-lived token
   through `setClerk` (V10 §3.17). Under V10's configuration B — the prompt passing through SettlementForge's proxy — the
   map block and every tool result are passed through V08 §5.4 (3)'s words-only projection before they leave the frame;
   under A (the provider called from the frame) nothing reaches SettlementForge; C (SettlementForge's own assistant; follows
   SettlementForge, J121/J122) needs no built-in clerk.

### 4.5 Custom content under editing

A DM's declarations about a custom kind — a place, a quarter, a pin, a siting-profile override (item 104 (a) (1), made with
item 101's tools) — name the element by its binding key `inst:uid:<localUid>`, so they survive every rename and every
revision SettlementForge makes; a revision's re-siting (V08 §3.13 (10)) is a dossier event and so moves around every lock,
pin and positive placement like any other (§7.7 item 5). A `CustomChainRecord` or `CustomServiceRecord` is dossier-owned: a
user's or clerk's edit of its fields is refused `dossier-owned` (§7.7 item 11) with the map-side alternatives — move a node
with T6 `place` (`placeAt`), reject a site with `rejectSite`. The clerk's `why` on a custom element names the resolution
rung that decided its profile (declaration, archetype, category, tags, library field, keywords or the fallback), the chain
rows that pulled it and, when keywords decided, the `low_confidence` mark (item 104 (a)). A declaration naming a custom
record the dossier no longer lists is §7.7 item 3's declaration on a removed element (kept, orphaned and reported, never
dropped); a map with no custom content has no custom declaration to keep; an undo or redo of a declaration is the base's
(§7.4), and a revision that lands between them re-sites around the declaration in force at its seq.

### 4.6 The DM's view of what the dossier did

Every line below is a catalogue key with its args (V09 §2.9's `MsgRef`); the words are written once, in this section's
tables, in V10 §3.9, in V06's chronicle templates or in V09 §4.9's rows (`history.dossierFacts.creation`,
`report.moved.<kind>`, `report.dossier.<state>`; J-V9.109), and the panels render them — no sentence is composed by the
panel (J-V8.99).

**The absorb group** (V09 §4.10). The history panel draws each committed absorb — its `dossierFacts` ledger event and the
port's `host:port` events after it, up to the next ledger event or another session's event (V08 §3.6 step 6; V09 §4.10's
dossier groups, J-V9.107) — as one group headed `host.group.absorb` ("{n} changes from SettlementForge, week {week}"), or
`host.group.absorbUndated` ("{n} changes from SettlementForge") when the ledger entry's week is null; `{n}` is the absorb's
`DossierChange` count. Inside the group, in this order:

1. **The changes.** Each dossier event is V09 §4.10's dossier-event row; under it stand the report entries it caused — the
   base report's `changes` (§5.4), each naming its `changeId` and reason — each by V09 §4.9's `report.moved.<kind>` row.
2. **The port's notes.** One line per note of the ledger event's `notes` (V08 §3.6 (4)): its `msg` rendered by the table
   below, with **Show** when its `keys` bind elements (each resolved to its address by V09 §4.10's `entity` read by
   `dossierKey`, item 583). A line whose `keys` bind an element the view's effective key (V09 §2.10; V09 §4.8) does not admit
   is not drawn (§11.2 *Knowledge*).
3. **What the absorb's epochs built by item 110.** Each epoch the absorb carried is V09 §4.10's `epoch` row — V06's chronicle
   for it (V06 W19; V06 §3.15.1): a raised way founded, finished, repaired or run dry is that chronicle's `raisedWay` entry,
   and its **Why here?** opens the way's `raised` section, whose row for a built way is `info.raised.built` with the DR34 or
   DR35 inputs it read as the answer's `facts` rows of tier `dossier` (V10 §3.9). A reason that fired at a slot the DM
   closed is one line `info.raised.suppressed` (`{w}` the removal's week; V10 §3.9, one key with V10's `raised` section),
   the history panel's "kept removed" line, drawn as V09 §4.10's `epoch` row's line, from V06's
   `EpochReport.raised.suppressedFired` (V06 §2.10, filled by the `raisedWays` pass, V06 §3.19.3 (2); J-V9.113), with
   **Show** on the removal's former outline. A way founded in a slot a cap increase opened is an ordinary founding entry —
   never the removed way's return (the slot rule, J-VI.14). The panel reads these from the epochs' records and reports (item
   110 (f) records each raised way's reason); it recomputes nothing.

The creation's prefix is listed the same way under V09 §4.10's creation row: its ledger event's notes as item 2, and, for
a settlement generated from its history, the replay's epochs as V09 §4.10's `epoch` rows (V06's `HistoryRecord` chronicle).

**The standing notes.** The report panel reads `report(h)` (§5.4's `GenerationReport`), and its dossier section (V09 §5.7's
"for a dossier-bound town") lists `GenerationReport.dossier` (the placement state — V09 §5.7's "V08's dossier state list"),
then `GenerationReport.dossierNotes` under `host.group.standing` ("How the map reads SettlementForge's record"), one line
per note as the absorb group's item 2 — its `msg` rendered by the table below, **Show** on its `keys`, and a line whose
`keys` bind an element the view's effective key does not admit not drawn. `dossierNotes` is the document's
`DossierBinding.notes` at the report's seq, copied by every derivation's report build (item 390), so every frame and every
reload shows the same list with no read of its own. The notes of class `standing` stay there while each port run writes
them, and appear in an absorb group only in the absorb that first wrote them. Notes of class `report` — and every note of an
offer answered `unchanged` or refused — reach only the host's report (`dossier.result.report`, `MapSession.on('report')`),
where the page renders them with the same keys through `statusText`.

**The held state** is no history row, since a held absorb commits nothing: the tab's banner (V08 §5.1) and the frame's
held notice (`HostSlots.banner`, V08 §3.1 step 7 (b)) show `host.status.held` and the reason row `MapRecord.held.reason`
(V08 §3.9).

**The party group.** Reveals, hides and a change of the party's base knowledge are listed as the DM's own actions
(`host.revealed`, `host.hidden`, `host.partyTier`), with the time the party pictures were last drawn
(`host.picturesDrawn`), in the panel's group "The party" through `HostSlots.historyLines` (V09 §4.10's group), which the
handler makes from successive `host.state` values (V08 §3.1 step 7 (b), (c)), since the record keeps no reveal history
beyond `party.prev` (J-V8.58). Each line is drawn by V09 §4.10's rule for the host's lines; its undo is V08 §4.2's "Hide
again" or "Reveal again".

**The port's notes in words** (J-V8.97 – J-V8.99). One row per `PortNote` kind — §14's union (item 508) and this volume's
two — key `host.note.<kind>` (the `held` kind: V08 §3.9's `host.held.*` rows). Each text is one sentence of at most 25
words in V09 §4.9's style; its args are the note's `msg.args`, filled by the port as the args column says — names as the
dossier writes them, never an id. **Show** lists what the note's `keys` hold. **Class** decides where the note is kept (V08
§3.6 (4)): `event` — the ledger event of the run that wrote it, drawn in that absorb's group; `standing` — the ledger event
only when new, then `DossierBinding.notes` while every run writes it, drawn in the report panel's dossier section from
`GenerationReport.dossierNotes`; `report` — the host's report only, never the document.

| kind | words (`en`) | args (filled from) | Show (`keys`) | class |
|---|---|---|---|---|
| `unmapped_kind` | "{name} is a kind the map does not know, so it is built like any {class}." | `name` the record's name; `class` the `label` cell (V11 §2.3; item 516) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (the `villageForm`, the archetype's `village` cell, or the tag fallback, whose `market` entry names V11's `market` class, the open space's market) — or, for a pin kind a cell names, its `host.pinKind.<kind>` row (below this table); read after the fold (V08 §3.6 (4); J-V8.115) | the record | standing |
| `unmapped_word` | "SettlementForge's word "{word}" is new to the map, so it used its usual choice for it." | `word` as the dossier writes it (every "else …, noted" of V08 §2.6's rows) | the record carrying it, if any | standing |
| `ignored_key` | "One part of the settlement's record is not read by the map." | — | — | report |
| `unreceipted_change` | "{name} changed with no week recorded, so the map shows the change as already finished." | `name` the element's | the element | event |
| `rename_without_receipt` | "{old} became {new} with no record of a renaming, so the map closed {old} and opened {new}." | `old`, `new` the two names | the new element | event |
| `duplicate_key` | "Two records are both called {name}; the map keeps them apart by their order in the record." | `name` | both records | standing |
| `state_matches_absorbed` | "The record matches an earlier state again, so the map carries on from there instead of undoing what happened since." | — | — | event |
| `realm_block_used` | "The realm map set which way {town} faces and where its roads leave." | `town` the settlement's name | — | report |
| `quarantined_record` | "One record, {name}, could not be read; it keeps its last state here and is tried again next time." | `name` the record's name, else its list's singular ("an institution", "a notable") | the element, when bound | standing |
| `quarantine_hold` | "One record could not be read, so nothing was removed with this update." | — | — | event |
| `adapter_remap` | "The map now reads {n} of the record's entries in a newer way; nothing on the map moved." | `n` the re-baselined keys | — | event |
| `line_migrated` | "The record now comes from a newer SettlementForge; the map follows it without moving anything." | — | — | event |
| `line_defaulted` | "More than one SettlementForge version could read this record, so the map used the newest." | — | — | event |
| `held` | V08 §3.9's `host.held.*` row of the refusal's code and case | `cap` for `.cap` | — | report |
| `size_limit` | "The settlement's record is larger than the map can read." | — (the limit passed is `detail`'s) | — | report |
| `ladder_merged` | "{lesser} is counted as part of {greater}, so it is not built twice." | `lesser`, `greater` the two records' names (a GUILD hall: the guild and the COUNT record) | both records | standing |
| `ladder_promoted` | "{lesser} grew into {greater}, and the map now follows the two as one record." | `lesser`, `greater` (a promotion by receipt: the record's former name and its new one) | the greater | event |
| `ladder_unknown` | "{name} names a kind of growth the map does not know, so it is built as listed." | `name` | the record | standing |
| `chain_node_unjoined` | "{owner} names {node}, which is not in the settlement's record, so the map adds nothing for it." | `owner` the chain's label, or the dependency's resource word; `node` the unjoined name | — | standing |
| `unmapped_good` | "The map does not know the good "{label}", so it trades it as a general import." | `label` as the dossier writes it | — | standing |
| `npc_rebound` | "{name} came back when the record was remade and keeps the same house and work." | `name` the notable's | the person | event |
| `calamity_unplaced` | "{calamity} struck {target}, which is not on this map, so nothing there was marked." | `calamity`, `target` the two names | — | event |
| `custom_resolved` | "{name} is built like any {class} ({rung})." | `name`; `class` as `unmapped_kind`'s row reads it — V11's `label` cell of the class built, or a pin kind's `host.pinKind.<kind>` row (at a village rung the archetype's `village` cell decides: a `mercantile-market` record names the market cross by its `host.pinKind.market_cross` row, not the `market_hall`'s label); `rung` V09 §2.7's `chips` words for the deciding rung ("from its tags", "guessed from its name" …) | the record | event |
| `custom_unversioned` | "{name} carries no revision from SettlementForge, so the map watches its name, category, tags and scene for changes." | `name` | the record | standing |
| `custom_node_unjoined` | "{owner} names {node}, which is not in the settlement's record, so the map adds nothing for it." | `owner` the custom chain's label or the custom service's name; `node` | — | standing |
| `library_mismatch` | "{n} library entries do not match the record's own versions, so the map left them out." | `n` the ignored entries | — | event |
| `custom_library_dropped` | "{name} was revised in SettlementForge; its old library details no longer apply until the new ones arrive." | `name` | the record | event |
| `low_confidence` | "{name}'s kind was guessed from its name and description; you can set it yourself if it is wrong." | `name` | the record | event |
| `uncatalogued_step` | "{name} is a larger form SettlementForge's list does not name, so the map builds it as listed." | `name` | the record | standing |
| `derived_landuse` | "{name} needs {landuse}, which the record lists no source for, so the map opened some nearby." | `name` the first record needing it, in dossier order; `landuse` the land use's label (§4.9) | the derived site and that record | standing |
| `name_unjoined` | "{owner} names {name}, which is not in the settlement's record, so that link is left out." | `owner` the notable's or chain node's name; `name` the unjoined one | the owner, when bound | standing |
| `name_ambiguous` | "{name} could mean several records; the map took the first one listed, {chosen}." | `name` as written; `chosen` the record's name | the chosen record | standing |
| `custom_unkeyed` | "{name} has no id from SettlementForge, so the map follows it by name; a renamed copy starts afresh." | `name` | the record | standing |
| `count_over_range` | "{name} has {count} halls, above its listed {lo} to {hi}, because that many guilds are named on their own." | `name` the COUNT record's; `count`; `lo`, `hi` its range | the record | standing |
| `not_placed` | "{name} has no place of its own on the map." | `name` | — | standing |
| `frozen_fact_changed` | "SettlementForge now says {field} is {value}; the map keeps the ground and history it was first drawn with." | `field` the frozen fact's word (terrain, access, threat, magic, culture, climate, isolation, history); `value` the new word as the dossier writes it | — | report |
| `history_gap` | "{name}'s greatest size is not recorded; the map shows it as {a tier} from the evidence." | `name` the settlement's; `tier` the effective peak's tier word (V08 §3.15 (3)); for a missing age, `tier` absent and the row's variant `host.note.history_gap.age` "{name}'s age is not recorded, so the map uses a usual age for its size." | — | report |

**The pin kinds' words.** Three message rows of V08's own `host.*` family, loaded by V11's registry row 87 with V08's other
`host.*` rows, give the words a note's `class` argument shows for the three pin kinds a record can name (V11 §3.11):
`host.pinKind.shrine` "wayside shrine", `host.pinKind.well` "well" and `host.pinKind.market_cross` "market cross". The
legend's own symbol-key words for every glyph are the base's and the application's (§9.5; V09), not this table's.

The group heads: `host.group.absorb`, `host.group.absorbUndated` and `host.group.standing` (words above). T-V8-14's walker
fails the build on a `PortNote` kind or a `PortRefusalCode` case without its row, on a row over 25 words, and on an arg a
row names that its note does not fill (a compile check over the union and the table).

## 5 Rendering, labels, exports

### 5.1 The Map tab — what SettlementForge draws and what the frame draws

**SettlementForge's side draws three things only** (J-V8.35): the tab's container, the stored thumbnail as an `<img>` until
the frame's first live frame (V08 §3.1 step 1), and a one-line **status banner** driven by `module.status`, so a failure is
visible even when the frame is dead — plus, on a player's tab, the client's party viewer (V08 §3.14 (4)), which is part of
the client, not SettlementForge's own drawing. The banner's words have ONE source, V09's `host.*` catalogue rows, generated
into the client's `statusText` defaults at build time in the frame's locale (V08 §5.5); the host may translate them. Keyed
by phase; the key and its words are this table's:

| phase (`module.status`) | key and words (the client's default text) | shown to |
|---|---|---|
| `booting`, `loading`, `verifying` | `host.status.opening` "Opening the map…", with `progress` when given | owner, editor |
| `absorbing` | `host.status.absorbing` "Catching up with the settlement's record…" | owner, editor |
| `held` | `host.status.held` "This map is held as it was.", followed by the reason row `MapRecord.held.reason` (a `host.held.*` row, V08 §3.9) | owner, editor |
| `upgrade-available` | `host.status.upgrade` "A newer map engine is available — use Update in the map's header" (no button: no host → PLAT message reaches a dialog in the frame, and SettlementForge draws no map control, J-V8.35) | owner |
| `error` | `host.status.stopped` "The map stopped; reopening it.", then `host.status.failed` "The map could not start." with the button **Retry** | owner, editor |
| any phase with `detail` | the `host.*` row `detail` names, beside the phase's row — B10's `host.recovered.*`, B20's `host.verify.mismatch` (V08 §3.9) — and, after B11's new map, the client's own `host.recovered.newMap` | owner, editor (B20: editors only) |
| — (the record above the plan's storage, B21) | `host.status.overQuota` "This map is larger than your plan's storage for maps." | owner |
| — (a refused creation: no map) | `host.status.notCreated` "No map was made.", followed by the reason row, in the thumbnail slot | owner, editor |
| — (the player's tab, no frame) | `host.party.asOf` "As the party knows it, week {week}" (`host.party.asOfUndated` "As the party knows it" when the set's `week` is null), or `host.party.notOpened` "The DM has not opened this map yet"; the viewer's region label `host.party.region` "Settlement map, as the party knows it" (V08 §3.14 (4)) | players |

**The frame draws everything else** — `@plat/app` in host mode (item 507): the map region, the history panel (V08 §4.6),
the report panel, the gazetteer and the "features in view" list, item 101's tools by role, the export menu by role and key,
and the tab's actions of V08 §4.2 in the frame's header (`HostSlots.header`, V08 §3.1 step 7 (b); a control whose operation
is the page's posts `host.action`, V08 §4.2), each shown only to the roles its row names. Host mode differs from the
standalone app in exactly these points: no file operations — New town, Open…, Save a copy, Recently deleted — and no
permalink (V09 §2.2's `fileMenu: false`: the host is the store, and §11.1's permalinks need a `DocResolver`, which host mode
does not configure), and Settings without its Storage section (no local store, V09 §3.8 (6); J-V8.96); every action that
makes a new document follows V09 §3.9's host-mode rule (`HostSlots.newDocuments: 'download'`, V08 §3.1 step 7 (b)); the
assistant as the host's `clerk.config` sets it — the Assistant button only under `builtin`, otherwise the card-only drawer
for a host's proposal (V09 §2.2, V09 §4.11; V10 §3.17) — with no creation mode and no **Start a new map from this** (V09 §3.9,
V09 §4.11); the history panel carries the group "The party" (`HostSlots.historyLines`, V08 §4.6); the basic panel shows the
dossier-owned intent values — the population, the tier word — locked with the reason "Set by SettlementForge"
(`HostSlots.lockedControls`, reason `host.locked`; §7.7 item 11), while the map facts the port derived (the wealth level,
the density) stay editable (§7.7 layer 1); the season and festival controls follow SettlementForge by default (V08 §3.16
(4), (5); V09's controls); only owner and editor frames exist (a player never mounts one, V08 §3.14), and a co-DM's frame
has the editor's tools and exports by §11.1's key rules; the header carries the party controls ("Reveal to the party",
"Hide again", "See what the players see", V08 §4.2), and while "See what the players see" is on — a display filter,
`ViewOpts.viewAs` (V08 §3.14 (5)) — the frame shows a persistent strip "Showing what the players see" in its banner slot
(`HostSlots.banner`), with the button "Show everything" that switches it off, so the DM never mistakes the filtered view
for the whole map; the strip stands for V09 §4.8's View-as banner while the host's party key is set (J-V8.89).
Accessibility is §14's; the `<iframe>` carries `title="Settlement map"` (the `host.frame.title` row) and the map region
its accessible name, so the tab reads as one landmark.

**The frame's own words.** Every word the frame shows for this stage is a `MsgRow` (V09 §2.9) of the `host.*`
family, written once here — each one sentence or label of at most 25 words, its buttons V09 §4.9's `button.*` rows:

| key | words (`en`) | where |
|---|---|---|
| `host.control.refresh` | "Refresh now" | V08 §4.2's header |
| `host.control.upgrade` | "Update the map engine" | the header (owner) |
| `host.control.restore` | "Restore previous map" | the header (owner, with a backup) |
| `host.control.newMap` | "Make a new map from the record" | the header (owner) |
| `host.control.goBack` | "Go back to the old map" | the header after a new map (owner, while the host keeps the old record) |
| `host.control.reveal`, `host.control.hide` | "Reveal to the party", "Hide from the party" | the header, with a selection |
| `host.control.hideAgain`, `host.control.revealAgain` | "Hide again", "Reveal again" | the header, after a reveal or a hide |
| `host.control.partyTier` | "What the party knows by default: {tier}" (`{tier}` "public knowledge" or "what locals know") | the header (owner) |
| `host.control.playersView` | "See what the players see" | the header |
| `host.control.assistant` | "Assistant settings" | the header (owner) |
| `host.dialog.restore` | "Go back to the map saved {time}? The {n} map changes made since then will be lost." (the changes listed under it) | the restore dialog |
| `host.dialog.newMap` | "Make a new map from the settlement's current record? This map is kept, and you can go back to it." | the new-map dialog |
| `host.dialog.upgrade` | "Update this map to the newer map engine? Here is what changes:" (the diff's words V09's rows for §7.5) | the upgrade dialog |
| `host.playersView` | "Showing what the players see" with the button `host.playersView.showAll` "Show everything" | the banner strip |
| `host.mirror.dropped` | "Unsaved changes from an earlier version of this map were dropped." | a notice at load (V08 §3.7) |
| `host.frame.title` | "Settlement map" | the `<iframe>`'s title |

T-V8-14's walker covers these rows as it covers the others.

### 5.2 Drawing the dossier's records and custom content

Each new entity kind is drawn, labelled, exported and persisted as this table says; the drawing rows are §8.2's thematic
and `states` rows (item 410 adds the rows named here; each has its program in every shipped family, `ink`, `lit` and
`hatched`, and falls back to the family's generic tint program where a family lacks one, §8.2), each carrying item 112's
second cue (a pattern or shape, never colour alone).

| record (V08 §) | drawn | labelled | exported | persisted |
|---|---|---|---|---|
| `ConditionOverlay` (3.11) | by its archetype's `conditions` row: `siege` — a tint on the enceinte band and a hatched ring outside the wall; `quarantine` — a desaturating tint over the built area and a barrier mark at every gate; `occupation` — a banner mark on the seat's building (the symbol `occupation`, §8.3); `migration` — item 70's camp clusters as the base draws them; every other archetype no mark | never on the map; the cartouche's legend names each drawn condition ("Under siege since week 40") for every key, since its tint is visible anyway; an archetype without a tint is named only for a `secret` key (J-V8.40) | GeoJSON: one feature per overlay (`kind: 'condition'`, archetype, severity, weeks) without geometry of its own, its `targets` the addresses it tints; SVG/PNG: the tint groups under `layer.thematic` | the model (§2.7) |
| `DepositSite` (3.11, 3.13 (4)) | its land use as §4.9 draws it; `depleted` by a `states` row `worked-out` (spoil heaps on a mine or quarry, a stump field on a wood); `removed` nothing; `oasis_water` as the oasis (§8.2's oasis rows, item 111) | the deposit's display name — the `deposits` row's label, a custom resource's name, or for a derived site (`res:derived:<landuse>`) its land use's label — as a hinterland feature label at the city band (§9.4's hinterland rows) | GeoJSON: the land-use feature gains `deposit` (key) and `depositState` | the model |
| `PowerRelation` (3.11) | not drawn; item 72's political view reads it | — | the JSON schema only (model format) | the model |
| dossier-backed `Person` (3.11) | not drawn; the gazetteer's people list and the hover card of the building it works or lives in ("Works here: Aldric Venn, master of the Tanners' Hall") | by its workplace's knowledge: a notable posted to a place a key does not admit is withheld with that place (§11.2 *Knowledge*); else public | people CSV and the JSON schema | the model |
| `HistoryHint` (3.11, 3.15) | nothing (it shapes generation); what the replay built is drawn as any fabric, and its `HistoryRecord` is V06's and V10's | — | the JSON schema | the recipe |
| `CustomChainRecord` (2.8) | an optional thematic view `supplyChains` (off by default): each ACTIVE chain as a dashed line along the way graph's shortest route between its placed nodes in flow order, an arrowhead at each node, the endpoints drawn to their gate or quay; one colour and one dash pattern per chain from the thematic palette in key order; an inactive chain, or one with fewer than two placed nodes, is not drawn. **Knowledge** (J-V8.103, J-V8.105): a chain is drawn, labelled, listed in the gazetteer and exported only when the key admits every one of its joined nodes — the view's effective key (V09 §2.10) for the drawing, the legend and the gazetteer; the export's knowledge key for GeoJSON and pictures (§11.1 *Knowledge*: the export dialog's key, or `exportPicture`'s `knowledge`, V08 §5.3) — each node whose `key` binds a placed element (the resource's site, a processor's institution and its building) admitted by its `knownTo` by §9.2's admission function as a band-less reader (as at the city band), a concealed use (item 63) never; otherwise the chain is not drawn, not listed (a chain is a relation, never an "unnamed" row) and not exported | the chain's label in the view's legend; and in the gazetteer under the kind `customChain` — each ACTIVE chain with its label, an inactive chain not listed — the read by which V09 §5.4 offers **SettlementForge's chains** (the host projection keeps the row as any `gazetteer` row, V08 §5.4 (3)); both under the drawn column's knowledge rule, so a chain with a withheld node has neither a legend row nor a gazetteer row | GeoJSON: one LineString per active chain the export's key admits by the drawn column's rule, on the view's route, `kind: 'supplyChain'`, its key and label; nothing else; an SVG or PNG export draws the view's chains under the same rule at its own key | the model |
| `CustomServiceRecord` (2.8) | not drawn (a sub-location, item 104 (h) (5)) | in its provider's hover card and the gazetteer | the JSON schema | the model |
| a custom institution's building | as any building of its class, which item 104 (a)'s resolution decides at fold (V08 §3.5 (5) (f); V11 §3.13.1); `landmark` raises its significance (item 72), so its label enters the ladder one band earlier (§9.4); `material` is passed to the building's material row (V08 §2.6's `materials`; the row's content is V11's, its use V02's) | its dossier name | as any dossier-backed building, `plat:tier` `dossier` | the model |

A held map is shown by V08 §5.1's banner and the frame's held notice (`HostSlots.banner`), a frozen view by the shell's
own `error.frozen` strip (V09 §3.14 (b)), never by a change to the map's marks. Item 110's terraces, retaining walls, raised
ways and deck plots, item 114's wall conditions and patch materials, item 111's oasis, and items 117 and 118's season and
festival looks are drawn, labelled and exported by the base's rows like any content of the map; the port adds no drawing
row for them.

### 5.3 Pictures for SettlementForge's own surfaces

* **`exportPicture(fmt, { knowledge, displayNames, opts })`** (V08 §2.2) — `png`, `svg` or `print` only (J-V8.36).
  `knowledge` — an `Admission` (item 572) — lowers the requesting editor's key for that one export and never raises it
  (item 472): the key form `{ tier: 'public', places: [] }` for an anonymous or gallery picture and `{ tier: 'local',
  places: [] }` where the DM chooses a local picture — key forms, never a bare tier, which would be read with the requester
  key's places (J-V8.92); omitted for the DM's own. Every picture for an audience that never mounts a live map — players,
  anonymous, gallery, a DM-full share (§14's audience table) — is made by an owner's or editor's session or by the refresh
  frame, and stored or served by the host as it chooses; the players' set is V08 §3.14's, drawn by the module on
  `party.render` under the resolved party key, never through `exportPicture` (J-V8.91).
* **Notes and pins in pictures.** A picture draws the document's public notes and view pins and the annotation layer (§2.9
  view state, §9.5) under its key; the DM's private notes and pins are never drawn in a picture made for another audience.
  So what SettlementForge's retired map rows called audience-tagged annotations maps to the base's public and private
  notes, and the players see the public ones in their pictures.
* **Thumbnails** (V08 §3.7): two per map record, `public` and `secret`, 512 px on the long side, the city band, the
  document's style, the fixed sun, no hand lantern (an export has no pointer, §11.1), the season and festival the view
  follows; the card of a campaign's settlement shows the `secret` thumbnail to the DM and a co-DM, the party set's z0
  picture to players when one is stored, and the `public` thumbnail to everyone else. A picture of a map with no building
  (a deserted settlement) is still drawn — its ground, water and ruins — never an empty slot.
* **Display names** (item 85): the host computes the veiled text for every name its public-projection filter veils and
  sends it with the one export (V08 §3.11); the title is included, so a veiled settlement name is veiled in the cartouche
  too.
* **SVG as data.** SettlementForge may place the SVG in its own PDF plates and public pages
  (`research/sf/dossier-seam.md` C-11); the inert bar is §11.1's (text as outlines by default, no script, no external
  reference) and SettlementForge's own sanitiser still runs on its side.
* **The title.** The dossier's name and tier word (§9.5; §7.7 item 15); a picture's metadata states its tier shares
  (§11.1), so a SettlementForge surface can say "every institution from SettlementForge's record".

### 5.4 What leaves the frame — door 1 closed by ruling, and structurally for every structured format

Door 1 is closed by ruling (J86; §11.4). Structurally (J-V8.37), no call returns a STRUCTURED format to SettlementForge's
code as data — no GeoJSON, VTT, glTF, CityJSON, CSV, skeleton or query geometry — and the export bundle's call returns
opaque blobs only. What the host does hold is stated plainly: the document, as an opaque stored artifact it has no decoder
for; pictures, whose drawn outlines the owner's audience table accepts (§14; `research/sf/dossier-seam.md` C-11); and, from
M-SF, the sealed scene files it packages unread.

1. **The host client carries no decoder.** It receives the document's bytes (`dossier.result.created` and
   `doc.snapshot.ready`) and stores them as handed; `@plat/bridge-client` imports no part of `@plat/model`, so it cannot
   read them (§14's dependency rules hold the client as a leaf that imports nothing of `plat/`, item 507). `doc.snapshot` is
   the editing role's storage message, not an export: a viewer's is refused `doc.rejected { reason: 'role' }`, and
   `E_HOST_FORMAT` does not apply to it (T-V8-27).
2. **Pictures, not data; scene files as sealed blobs.** `exportPicture` offers `png`, `svg` and `print` alone. Every other
   format — GeoJSON, VTT, glTF, CityJSON, CSV, the skeleton, `.plat` as an export — is the USER's, offered by the frame's
   export menu under §11.1's key rules and saved to the user's device through the frame's `allow-downloads` sandbox flag;
   the host client has no call that returns one as data, and the module in host mode answers a host's `export.request` for
   any other format with `export.refused { error: 'E_HOST_FORMAT' }` (item 472), save the one route below. **The export
   bundle** (J122, V08 §11 Q3). From M-SF, `MapSession.exportScenes({ formats, knowledge?, displayNames?,
   opts? })` returns the user's chosen scene exports — §11.1's `.dd2vtt` and Foundry scenes, rendered at the export's
   knowledge tier (the requester's key lowered by `knowledge`, as for a picture) and admitted by the calling key's §11.1
   rules — for SettlementForge's own export bundle. Over the bridge it is `export.request { fmt: 'dd2vtt' | 'foundry',
   opts, knowledge?, displayNames?, bundle: true }`, one request per format, answered `export.ready { bytes }` — the one
   exception to `E_HOST_FORMAT` (§11.3's port vocabulary); a request with `bundle` for any other format, or for these
   formats without it, is still refused. The client wraps each reply's bytes in a `Blob` (`application/octet-stream`, named
   by the format's file name) without reading them — the path imports no JSON parser and no text decoder, which §14's lint
   over the client checks — and SettlementForge's bundle writer copies the blobs into the bundle unread. Door 1 stays closed
   (J86): the blobs are the user's own export, packaged for the user's download, never an input to SettlementForge's
   simulator, and no call returns a structured format as data. Only an owner's or editor's session can make the call (a
   player never mounts a frame). Before M-SF maps export on their own, through the frame's export menu. T-V8-48 holds this
   route.
3. **Words, not shapes, for every clerk answer that leaves the frame.** In host mode the MODULE applies the host projection
   to every `query.result` — and to every `preview` reply — before it is posted out of the frame (item 473): this section's
   rows for the base's kinds, V10 §3.17's for the reader kinds; the host client receives only projected answers and carries
   no projection code, so one component owns the projection and no full answer ever reaches SettlementForge's page (door 1,
   J86). The projection is a fixed list of kept fields per answer kind, a table of `@plat/api`'s host-mode bridge handler;
   it keeps names, kinds, addresses, districts, tiers, reasons and alternatives by name and drops every coordinate, ring,
   bearing, distance, extent and viewport field:

   | answer (the base's kinds, §11.2) | kept | dropped |
   |---|---|---|
   | `gazetteer` rows | `id`, `kind`, `withheld`, `name`, the address, the district, the tier (`dossier`, `declared`, `map`), the use or institution kind where the key admits it | every geometry, anchor, bound, coordinate and area |
   | `people` rows | `id`, `name`, `withheld`, type, race, gender, age, profession, workplace and household by id and name (by address when withheld), district | any position |
   | `whereIs` | the person, day and hour; the place by id and name (by address when withheld) and its district | the position and any route |
   | `relations` | the tree's ids, names and relation words | — |
   | `fates`, and every `preview` reply | `status`; `actions` without `at`; each `EditFate` (`id`, `fate`, `to`, `reason`); `renames`; `counts`; `bent` | `actions[].at`, `shape` |
   | `why` | V10 §3.17's `WhyAnswer` row | as there |
   | `hit`, `inView` | not offered: refused `E_HOST_KIND` (they need a view the host does not hold) | — |

   The reader kinds — `brief`, `entity`, `sites`, `frame` without `near` and `radiusM`, `rule`, `profile`, with `measure`
   refused `E_HOST_KIND` — are V10 §3.17's rows. The party gazetteer is assembled and projected by the module the same way
   before it goes into `party.rendered` for storage (V08 §3.14 (2) (c), (3)). The built-in clerk (V10) runs in the module;
   under V10's configuration B its prompt and every tool result pass the same projection before they leave the frame (V10
   §3.17). T-V8-27 asserts on the bytes the module posts.
4. **Status and reports are text.** `module.status`, `report.changed` entries (change ids, reasons, fates by address and
   name), `entity.selected { id, kind }` and `host.action` (binding keys, addresses and words only; V08 §2.2) carry no
   geometry; `party.rendered` carries pictures and the projected gazetteer only ((2), (3)).

### 5.5 Labels

The settlement's title is the dossier's name with its tier word (§9.5; §7.7 item 15); quarter names come from the dossier's
naming claims (§7.7 item 16); every other name the dossier does not give is generated from `site.culture` (DR14). A dossier
name is rendered as text — never as markup — and a name longer than §9.4's ladder allows overflows by §9.4's rules; an
empty dossier name is refused at the shape check (V08 §3.5 step 3), so a title always has one. A place the dossier marks
`local` or `secret` is drawn but not named for a key that does not admit it (§9.2); the DM raises the party's knowledge
place by place with "Reveal to the party" (V08 §4.2), recorded on the map record for every player and every later picture
(V08 §3.14). The history panel speaks in SettlementForge's own reason words (`DossierChange.reason`) beside the map's rule;
the frame's interface language is SettlementForge's for its user (`MapHostConfig.locale`, carried in the frame's `src`;
J121): the shell loads `messages/<locale>.json` when the module ships that locale, else the catalogue's source
language, English (V09 §2.9), and the client's `statusText` defaults are generated from the same catalogue, which the host
may override with its own translation. A dossier's words — names, SettlementForge's reasons — are shown as SettlementForge
wrote them, in whatever language that is.

## 6 Performance budgets

On §12.1's reference machine, p95 (item 480), measured by the host harness (V08 §7.2) with the frame on the module's own
origin and the host page on another; every row PLAUSIBLE until SF1's measurement (V08 §8), each with its pre-decided
fallback. B is the document's building count (§12.2); T(B) is §12.5's first-map law, M(B) §12.3's model law, V §12.6's
replay law.

| budget | TOWN | CITY | METROPOLIS | basis and fallback |
|---|---|---|---|---|
| host client in SettlementForge's lazy chunk | ≤ 12 KB gzipped with the party viewer (≤ 8 KB without it), 0 dependencies | same | same | a build check (T-V8-2); over it, the generated message types move to a lazily fetched JSON schema, then the viewer to its own lazy chunk |
| thumbnail on screen after the tab is clicked | ≤ 50 ms | ≤ 50 ms | ≤ 50 ms | one PNG ≤ 150 KB decoded by the browser |
| the player's tab: first party tiles on screen | ≤ 150 ms | ≤ 150 ms | ≤ 150 ms | the z0 tiles (1–4 PNGs) read from the record and decoded; over it, the public thumbnail first, then the tiles |
| the party picture set: render (an editing session's tile worker or the refresh frame) | ≤ 0.8 s | ≤ 1.5 s | ≤ 3 s | three levels of 256-px tiles plus ≤ 64 z3 tiles, the SVG and the gazetteer; §12.7's tile law; over it, z2 is rendered for the built-up area only (its empty tiles null) and z3 capped at 32 tiles |
| the party picture set: stored | ≤ 2 MB | ≤ 6 MB | ≤ 12 MB | PNG tiles at the §12.7 compression; the same fallback |
| frame boot to `ready` (chunks cached) | ≤ 400 ms | ≤ 400 ms | ≤ 400 ms | three worker starts and the model packages from cache; over it, the derivation pool starts after `ready` (§4.1 runs single-worker until it joins) |
| frame boot to `ready` (first visit, 50 Mbit/s, 40 ms RTT) | ≤ 1.2 s | ≤ 1.2 s | ≤ 1.2 s | ≈ 1.5 MB of chunks; over it, the chunk split moves the renderer's backends out of the boot set |
| load: `doc.load` + tail to the first live frame | ≤ T(B) + 5 ms per tail event | same | same | §2.9 step 3 (open-to-editable ≤ T(B)); the tail folds by §12.6's c(e); compaction keeps the tail ≤ 256 events |
| `hashDossier` in SettlementForge's page | ≤ 10 ms at 260 KB | same | ≤ 25 ms at 600 KB | canonical JSON and Web Crypto SHA-256; over it, the hash runs in a small worker the client starts |
| `dossier.offer` clone into the frame | ≤ 5 ms at 260 KB | same | same | structured clone |
| `digest` (limits, shape, records, keys, custom, the history, readiness and traditions) | ≤ 15 ms | ≤ 25 ms | ≤ 40 ms | a walk over ≤ 260 KB; linear in bytes |
| creation of a new map | ≤ 20 ms + T(B) | same | same | `creation` is table look-ups; `generate` reads the prefix ahead (§7.7 One path); a history replay adds V06's generation budget (V06 §3.20.4; §12's one-time total time, item 119) |
| an absorb without an epoch (a week: 1–5 changes) | ≤ 40 ms + 30 ms per element event | ≤ 40 ms + 30 ms per event | ≤ 60 ms + 45 ms per event | §12.6's post-build placement bound per event; the dry run's cost is the fold's |
| an absorb with epochs (a year) | ≤ 40 ms + Σ events + Σ epochs by the evolution engine's epoch budget (V06 §6) | same | same | a CITY year of ≈ 10 events and one whole-town epoch ≈ 0.7 s |
| `dossier.result` size, excluding `created`'s bytes | ≤ 2 MB | ≤ 2 MB | ≤ 2 MB | the ledger event carries before and after facts; over it, the result is split into ordered parts of ≤ 1 MB under one `re`. The `.plat` bytes of `created` and of `doc.snapshot.ready` are `ArrayBuffer` transfers (no clone), bounded by §2.9's document budget (≤ 0.6, 3 and 8 MB) |
| the refresh queue, per map (boot paid once) | ≤ 1.3 s after a year | ≤ 3.5 s after a year | ≤ 8 s after a year | load + absorb + two thumbnails (≈ 5 µs × B + 10 ms each) + a compaction (`.plat` encode ≤ 60 ms at CITY) + the party set (the render row above); a campaign of 20 CITY maps ≤ 70 s of background work |
| memory, one live map per frame | §12.8's rung line + 30 MB | same | same | the app's fixed heap; the refresh frame has no tile worker except while it draws thumbnails and the party set |
| memory, the DM's page, all frames | ≤ 161 MB (a visible TOWN frame whose built-in clerk holds an authoring turn, and a refresh frame at TOWN); ≤ 141 MB with no turn | ≤ 231 MB (a visible TOWN frame holding a turn beside the refresh frame at CITY, which runs only beside a visible TOWN or with the Map tab closed; a visible CITY alone with a turn ≤ 196 MB); ≤ 211 MB with no turn | ≤ 421 MB (a visible METROPOLIS frame alone holding a turn; a METROPOLIS refresh beside a visible TOWN holding one ≤ 381 MB); ≤ 361 MB with no turn, ≤ 291 MB with one frame | ≤ 1 MB for the client + Σ over live frames of (§12.8's line for its document + 30 MB): 40, 110 and 260 MB; at most one CITY or METROPOLIS document live on the page (V08 §3.4) + V10's scratch line (20, 55 or 130 MB at the frame's rung) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal — configurations A and B, where that clerk runs in the frame; C opens no scratch, and the refresh frame runs no built-in clerk (J-V8.97); over the bar, V10 §3.19's overlay mode for that turn (V10's device fallback) |
| memory in SettlementForge's page, outside the frames | ≤ 1 MB + the thumbnails on screen; a player's page ≤ 1 MB + the party tiles in view (≤ 20 MB) | same | same | the client, its queue and the viewer's decoded tiles (released off screen) |
| storage per map record | ≤ 3.4 MB + 0.6 MB per backup (snapshot 0.6, tail and one kept segment 0.5, thumbnails 0.3, party set 2); with two backups ≤ 4.6 MB | ≤ 9.9 MB + 3 MB per backup; with two backups ≤ 15.9 MB worst, ≈ 8 MB typical | ≤ 20.8 MB + 8 MB per backup; with two backups ≤ 36.8 MB worst | §2.9's size budget plus the party set's row; the number of backups is SettlementForge's `backupDepth` and the allowance its `quotaBytes` (J121; V08 §3.7's trim order and B21) |
| an export-bundle scene file (from M-SF) | the scene export's own cost and §12's export-time peak, one export at a time; the client's copy into a `Blob` ≤ 5 ms per MB | same | same | the module's scene exporters, one request per format, between edit batches |

**Why these numbers.** The map tab must never feel slower than opening the standalone map: the load row is §12.5's own law,
and everything the stage adds on top — the hash, the clone, the digest, the diff — is under 100 ms at every rung. The
refresh queue trades time for memory (V08 §3.4): it is background work the DM never waits on, and a map opened before its
turn is absorbed at once in its own frame. The history reading, the readiness and the traditions are part of the digest's
row; a season or a festival costs the port nothing (a view's look, §12.5).

## 7 Tests and acceptance bars

### 7.1 The bars (T-V8-n)

Each bar names its CI tier (§13.8: PR, nightly, milestone) and the step of V08 §8 from which it runs (item 486). Fixtures
are §13.2's frozen dossier set (items 83, 84) — never a live SettlementForge — plus test-side mutations of a fixture's digest
or JSON made by the harness at run time, never written back into a fixture file.

| bar | what it proves | tier, from |
|---|---|---|
| T-V8-1 | the embed boots on Chromium, Firefox and WebKit (Playwright) with the frame on its own origin under V08 §3.1's sandbox flags and both CSPs; `ready` within V08 §6's rows; a message from a wrong origin or from another window of the right origin is dropped and logged (§11.3) | PR, SF0 |
| T-V8-2 | `@plat/bridge-client` is ≤ 12 KB gzipped with its viewer (≤ 8 KB without), imports nothing (a bundle scan), and its message types equal `@plat/api`'s bridge schema field for field (a generated-types diff); a type-level check that every `MapStore` write parameter (`encoded`, `seqAfter`, `logHeadAfter`, `SnapshotBlock`'s fields, `PartyPictureSet`) is a field of a message the client receives, so the host computes nothing it stores | PR, SF1 |
| T-V8-3 | two editing clients offering `create` for the same settlement at once: the host stores exactly one record, and the loser's document is byte-identical to the stored one (canonical bytes and model digest); two editors' absorbs of the same dossier on the same head are byte-identical, every event with session `host:port`; on the nine at-rung births × 5 seeds | PR, SF2 |
| T-V8-4 | `hashDossier` gives one value for every key order and whitespace of the same dossier, a different value for any changed scalar, and equals a Node reference implementation on every fixture | PR, SF1 |
| T-V8-5 | against a `MapStore` that stores bytes only and never decodes, hashes or computes a head: snapshot + tail replays to the session's model digest at every compaction point of a 1 000-event scripted session (edits, undo, redo, 12 absorbs); compaction at 256 events and 256 KB, including an edit committed between `doc.snapshot` and `replaceSnapshot` (the suffix kept); the backups rotate to `backupDepth` with `tailAfter` on `backups[0]`, run at depths 0, 1 and 2; after a 100-absorb script and a save–load round trip, the dossier block the fold rebuilds equals the stored one at every seq | PR, SF5 |
| T-V8-6 | a dossier differing from the carried state only in never-read keys, prose or below the digest's rounding returns `unchanged`: nothing appended, `lastOffer` updated, the document's bytes untouched | PR, SF2 |
| T-V8-7 | five dossier versions offered within one in-flight absorb: one further absorb against the newest; the carried facts after it equal the newest digest's; no change lost (each element's final state equals the newest dossier's) | PR, SF2 |
| T-V8-8 | convergence through the bridge: a host with a DM, a co-DM and two players' party viewers; 500 interleaved map edits (undo and redo from both editors), 12 weekly offers and one yearly: both editors' model digests equal at the end, 0 lost accepted events (§11.3's M3a test, extended to dossier offers); each editor re-runs every applied absorb it holds the dossier for with 0 mismatches, and a result with one event altered in transit is reported as a port mismatch by the other editor while the log stands; the players' pages receive no document message at any point | nightly, SF2 |
| T-V8-9 | quarantine: a fixture with one institution record mutated to fail its own checks absorbs every other change, lists the record in `quarantined` with a `quarantined_record` note, leaves its element's building and use unchanged; with the record's key unformable, every carried institution key absent from the digest is held (no `remove`, one `quarantine_hold` note); the next offer with the record repaired absorbs it; a save–load round trip shows no dossier-block mismatch | PR, SF3 |
| T-V8-10 | adapter remaps are declared: a test adapter version that changes a field's meaning without listing it fails the bar on the re-cut pairs; listed, the re-baseline emits no map event and notes `adapter_remap` | nightly, SF3 |
| T-V8-11 | a line change: a test "line B" adapter with `fromLines` identity re-keys by `rebind` only, changes no address, notes `line_migrated`; without a `fromLines` row the map is held with `E_LINE_UNSUPPORTED` and a later line-A dossier absorbs normally. Two registered adapters both accepting: `HostContext.line` picks when given; with none, a bound document stays on its line; a new settlement is created on the newest line, noted `line_defaulted`; `E_LINE_UNSUPPORTED` only when none accepts | nightly, SF3 |
| T-V8-12 | campaign scale: 20 maps (the nine births × seeds, grown to CITY where the fixture allows) after one year: every record `current`; the frame's memory peak ≤ one map's line + 30 MB; the queue pauses on input and resumes 5 s after; a page closed mid-queue resumes from `refreshPending`; the total within V08 §6's row | milestone, SF7 |
| T-V8-13 | `doc.snapshot`: creation, compaction, upgrade and rebase store the reply's `SnapshotBlock` as handed; its `documentDigest` equals the module's own; a restore and a new map send every open session a fresh `doc.load` and leave none on a lost head; a restore of a backup with another `docId` is refused | PR, SF2 |
| T-V8-14 | the failure ladder: each of rows B1–B21 of V08 §3.9 forced in the harness takes its stated rung and shows its column's catalogue keys with their args (never compared as words); no row changes a stored snapshot except B10's rebuild and a DM's restore; B10's second rung is exact with `tailAfter`, and B11 creates a new map under a new `mapId`. **The words' walker:** every `PortNote` kind of §14's union and of V08 §2.4 and every `PortRefusalCode` with `E_RUNG_UNAVAILABLE`'s three cases has its row (V08 §4.6, V08 §3.9), every `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*`, `host.verify.*`, `host.control.*`, `host.dialog.*`, `host.playersView`, `host.mirror.dropped` and `host.frame.title` key named here has its row (V08 §5.1, V08 §4.6, V08 §3.9), each row ≤ 25 words, and every arg a row names is filled by the port for its note (a compile check over the union and the tables); on `town-1`'s pairs an absorb's `event` and new `standing` notes are drawn in its history group from the ledger event in a second editor's frame and after a reload, the standing set in the report panel from `report(h)`'s `GenerationReport.dossierNotes` (equal to `DossierBinding.notes` at the report's seq in each of those frames, `[]` on an unbound document, listed after `GenerationReport.dossier` under `host.group.standing`), a standing note is not carried again by the next absorb that still writes it and is cleared by one that does not, and no `report` note enters the log; on a test-side variant of `town-1` whose one standing note's record and one event note's element are `secret` places, both lines are drawn at `secret` and neither is drawn — in the absorb group or the report panel — under View as "What anyone knows" or under "See what the players see" with a party key that omits them | nightly, SF6 |
| T-V8-15 | held and recovered: an unreadable dossier holds the map; a later readable one absorbs every change since the held state in one pass; in a build without the village package a population falling below 1 500 holds and returning above absorbs; with a test `ProductDecl` registered, a population of 0 at an absorb routes to THORP and V07's desertion — the map deserted, never held, for a village-product document and, through V07 §2.1's fold, for a base-product one — and a creation at 0 is refused `E_RUNG_UNAVAILABLE` naming the floor | PR, SF3 |
| T-V8-16 | display names through the bridge (T85-3 over the real transport): the public picture draws the veiled texts, title included; the document and the next export are unchanged; a `knowledge` option never raises the requester's key — a bare tier is read with the requester key's places and a key form as a key in its own right (item 572), and the thumbnails' and gallery pictures' `knowledge` is `{ tier: 'public', places: [] }` whatever places the requester's key holds | PR, SF4 |
| T-V8-17 | the players: a bridge trace of a player's page shows no `doc.load`, no `dossier.offer`, no `query` and no frame; `mount` refuses the word `player` before a frame exists; the party set's SVG and gazetteer contain none of the names the party key withholds (a byte search for every withheld name on every fixture) and the tiles are drawn from a display list that holds none (an instrumented render); every `gazetteer` and `people` query of a party render carries `admitAs` = the party key resolved by V08 §3.14 (1), in item 572's key form with `places` present, and every picture of the set the same form as its `knowledge` (an instrumented facade); each audience word gets exactly §14's role and key through `doc.load.audience`, the module taking the lower of it and `role`; anonymous, gallery and DM-full shares get pictures only | PR, SF4 |
| T-V8-18 | the staged records and the real vocabularies: conditions put whatever their status (`stable`, `worsening`, `easing`) with weeks from their ticks — `untilWeek` within ±1 week across town-1's and city-1's one-week, one-season and one-year ticks, else the pre-decided absolute-tick reading — and retired when unlisted; stressors put as overlays with no epoch event; deposits put, `bearingCdeg` and `landUse` written by S12a and recomputed on regeneration; relations put by the `relations` row; a successor notable inherits the house and posting; a reroll re-binds a notable by name and role (`npc_rebound`); a replay from the log rebuilds every record; a user's or clerk's edit of their fields is refused `dossier-owned`; TOTALITY: every relation type and trend, history event type and template word (the `historyScars` and `historyEvents` rows), condition status and archetype, stressor type, `magicLevel`, `materialFamily`, custom definition `economicWeight` and `criticality` word (the `customWeights` row, J-V8.108), isolation path, chain status, dependency severity, qualifier word, readiness label, climate word and tradition type in the fixtures has a row or the declared else, with 0 `unmapped_word` notes on the fixtures; the derived land use: a test-side mutation of `town-1` adding a `Salt works` record, with no salt deposit, has one `saltpan` face from `res:derived:saltpan`, noted `derived_landuse`, and its salt works within 0 of it (the hard row met, no closest-option report); a second salt-working record adds no second face; adding `salt_flats` later opens the deposit's own face and leaves the derived one standing; removing every salt-working record puts the derived site `depleted`, its face drawn worked out; and every class a `kinds` row binds whose hard `near` → `landuse:<k>` row within 0 names a land use outside §4.9's rings has its land use in the `deposits` row's derived list (a compile check); every row set V08 §2.6 writes compiles with `calibratable: false` on every column, T-V11-37's clause run on V08's sources (J-V8.107); **at VH**, a hamlet fixture with a `Peat cutter` record and no `marshlands` has its `marsh` face read by V07 §3.9's claim | nightly, SF4; the hamlet clause nightly, VH |
| T-V8-19 | the village hand-off with a TEST `ProductDecl` registered in `StrategyRegistry.products` (the port registers nothing): a sub-1 500 dossier is created on its rows; a town shrinking out of the band below 1 500 and a village growing out of it above keep one document, one seed and every standing address outside the epoch's disruption set; a target alternating 1 480 / 1 520 changes the product 0 times, one alternating 1 400 / 1 600 at every epoch (V07 §2.1's band) | milestone, SF4 (VH with V07) |
| T-V8-20 | limits, the ignore clause and the closed digest: dossiers over each limit refuse `E_UNKNOWN_SHAPE` with `size_limit` naming it and copy no over-long string; on every fixture the port reads no path outside the adapter's field table (V08 §2.4) — a proxy-wrapped dossier records every property access, and every access is a `keyList` path; no path an `ignored` row of the field table names is read — `defenseProfile` only at `readiness`, `powerStructure.previousGovernments[]` only at each entry's `tick` | PR, SF3 |
| T-V8-21 | `PortValues`: with values present the staged readers read the slice's; with nulls, the table's; T88-1 unchanged on the golden suite | PR, SF4 |
| T-V8-22 | the latitude: `cell.latDeg` wins when present, else the culture row, else 50; `Intent.latitudeDeg` holds it from creation; a realm latitude arriving after creation reaches the next epoch's `PortValues.latitudeDeg` and moves the field only by item 102 (e)'s drift, never at once; a document without the field reads 50; with item 102's `w_sun` at its default, T73-7 holds on every at-rung birth (a dossier map stays within one band of its wealth row) | PR, SF4 |
| T-V8-23 | the tag and category vocabularies: every tag of the fixtures and of the line's tag vocabulary has a `tags` row or the declared no-family fallback; every category and content group has a `categories` row; `unmapped_word` notes 0 on the fixtures | PR, SF3 |
| T-V8-24 | coverage inside a collective range: every collective count inside its range on every seed; with coverage rows filled, the share of districts served rises above the random-placement baseline (item 103 (f)'s bar) while the counts stay inside the ranges; with the coverage weight 0 the digest equals the no-coverage build | nightly, SF4 |
| T-V8-25 | custom content's arrival (item 104 (g)'s port side): on `town-cc-1` and its test-side variants — a custom record with only a category; category and tags; a scene archetype; the admitted library fields; an active chain — each digests to the specified `custom` part, chain, resource and service; the client sends no library entry the dossier did not materialise, and a mismatched entry reaching the port is ignored with one note; an offer without the library changes nothing; a new content hash emits one `setAttr` of `custom.revision`; a chain toggled inactive, then dropped, then listed again puts, retires and re-puts one record and moves no node; `archetypes` has exactly the line's 17 ids; zero refusals from custom input; the class is decided at fold, not at digest — a custom record with no archetype and a keyword whose `class` cell names a class resolves to that class, a map declaration for its `localUid` outranks every rung, and the `custom_resolved` note names the deciding rung; on the active-chain variant with one joined processor made a `secret` place (a test-side mutation), read at `public` and at a party key form without that place: no line, arrowhead, legend row, gazetteer `customChain` row, GeoJSON `supplyChain` feature or `supplyChains` path in an SVG export, and all of them at `secret` | PR, SF4 |
| T-V8-26 | the release checklist (V08 §8.3) runs as one script and fails on any unticked row | milestone, SF7 |
| T-V8-27 | door 1, structurally for every structured format: a type scan of `@plat/bridge-client` finds no geometry-bearing field in any value it returns except the opaque document bytes, the pictures and the export bundle's `Blob`s; `exportPicture` accepts only `png`, `svg`, `print`; a host `export.request` for any other format is refused `E_HOST_FORMAT`, save `dd2vtt` and `foundry` with `bundle` (T-V8-48); `doc.snapshot` from a viewer is refused `role` and from an editor answered; the host projection is asserted on the BYTES THE MODULE POSTS (a transport tap in the harness records every `query.result` and `preview` reply leaving the frame): on the fixture answer of every offered kind — `gazetteer`, `people`, `whereIs`, `relations`, `fates`, a `preview` reply, `brief`, `entity`, `sites`, `why` with sections, `frame` without radius, `rule`, `profile` — no coordinate, ring, bearing, distance, extent or viewport field; `measure`, `hit` and `inView` are refused `E_HOST_KIND`; the stored party gazetteer's bytes likewise; a source scan finds no projection code in `@plat/bridge-client`; under V10's configuration B every tool result leaving the frame passes it | PR, SF6 |
| T-V8-28 | inert custom text: T85-1's hostile strings as custom names, categories, tags and descriptions — and as tradition names and staging prose — reach every exporter inert; the description and the staging prose occur nowhere in the document, the digest or the carried facts (a byte search) | PR, SF4 |
| T-V8-29 | the upgrade flow: an owner's client alone gets `upgrade-available`; the party pictures keep the stored version's drawing until the DM upgrades, then re-render; the dialog names what the new version adds, item 110's content among it; the `upgrade` event is compacted at once and its undo works while `from` is in the retention window | nightly, SF5 |
| T-V8-30 | the budgets: every row of V08 §6 measured on the reference machine by the host harness, the page-level memory row with a METROPOLIS refresh beside a visible TOWN, and once more under V10's configuration B with a proposal waiting — in a visible TOWN frame beside a METROPOLIS refresh, and in a visible METROPOLIS frame alone — against the row's with-turn bars; a miss takes its row's fallback and is reported for the owner's veto (§12's rule) | milestone, SF7 |
| T-V8-31 | recognition: every pair fixture — the 35 births and the 12 after-tick dossiers, 41 to 47 top-level keys — is recognised and absorbs; an unknown extra key is accepted, dropped and noted `ignored_key`; a dossier missing one required key is refused `E_UNKNOWN_SHAPE` | PR, SF3 |
| T-V8-32 | item 109's sources (DR30, DR31): a dossier with `ancient_ruins` or a `ruined-landmark` record has a ruin system, else V04's stated reason; `magical_node`'s site stands at the ruin's centre when the ruin has another source; a `mountain` dossier's relief is `mountainous` and a `hills` one `hilly`; a mining deposit sets V04's mining test; ley lines, a magical history event and a delving record reach `site.ruinEvidence`; the ancient founding reaches only `HistoryHint`, and an ancient "Fall of" event reaches DR38, never `site.ruinEvidence` | PR, SF4 |
| T-V8-33 | the burial and crypt trace (DR32): on every birth, 0 catacombs sourced on a church, the cathedral or a monastery's church; the cathedral's crypt is the largest; `metropolis-3`'s two cathedral records give one building (`ladder_merged`); the church count counts each church once (the metropolises' two ranges merged); below TOWN no catacomb; a cemetery closed by a dossier event leaves its catacomb's extent unchanged across the next three epochs; a TOWN-to-CITY promotion pair (a test-side mutation of `town-1` grown past 10 000 with the city burial record added and the town one kept, then dropped) closes no burial face — `rebind` only, `ladder_promoted` | nightly, SF4 |
| T-V8-34 | name resolution (V08 §3.5 (6)): on the pairs, every chain processor, dependency institution and calamity target resolves exactly, by kind family, or is noted unjoined; the exact share at least the survey's (2 585 of 3 381) and the kind family's gain measured and reported; an unjoined processor never creates a building | nightly, SF4 |
| T-V8-35 | the supply links (DR33) on `town-1` and `city-1`: every chain with two joined members yields a link; an impaired chain's pull equals V11's status factor × a running one's; an entrepot chain's ends pull toward the gate or quay facing its partner; the links are never stored (a byte search of the document for a link record finds none) | PR, SF4 |
| T-V8-36 | the water system (DR34) through the bridge: on `sample-blackcrag` (CITY, mountain, a bath-house) and `city-2` (riverside), every generated aqueduct's reason is recorded and its terminal is the dossier's conduit house; `city-1` mutated to 8 000 people (rung TOWN, the city record kept) has 0 raised ways; `metropolis-2`'s aqueduct cap is one above `metropolis-3`'s under the same sources (a test-side mutation giving both the same site); a record closed by a test-side mutation leaves the arches `disused` and in place; no aqueduct draws on a hot spring; with item 110's rows off the T73 runs are byte-identical through the bridge | nightly, SF4 |
| T-V8-37 | the removal hold: on `sample-blackcrag` and `city-2` the DM removes every generated raised way; after 12 weekly offers, a yearly offer moving the population past the roster tolerance, a rung-TOWN mutation grown past 10 000, a line re-key and an `upgrade`, 0 removed raised ways stand again at their slots and the conduit house stands; a clerk's removal proposal is accepted, never refused `dossier-owned` | nightly, SF4 |
| T-V8-38 | the high-ground landmarks (DR35): on the CITY and METROPOLIS births, every elevated road's recorded reason cites only institutions of significance at least `elevated.landmarkMinSignificance` (V11 §3.24.2), custom `landmark` records or high wards, and 0 landmark strings | nightly, SF4 |
| T-V8-39 | the culture's reach: `city-3` with its culture mutated to `mesoamerican`, test-side, with V11's stepped rows on, makes the stepped specialisation eligible, its chance row read and cited in the temple's provenance; the aqueduct chance reads the culture's modifier row; with item 110's rows off, byte-identical | nightly, SF4 |
| T-V8-40 | the dry-site toll bridge (item 399): each of the six base-rung dry births (`culture-arabic`, `-celtic`, `-east_asian`, `-mediterranean`, `-slavic`, `town-3`) has a brook, a bridge where the longest approach crosses it and the toll house within 30 m of that bridge, with 0 raised ways; a `desert` mutation without `oasis_water` whose arid row drew no water gives the gate toll house and a `toll_bridge_dry` note, and with `oasis_water` the brook; an `isolated` or `none` access mutation gives `toll_bridge_dry` at a base rung as at a village rung; a toll bridge record arriving by a later absorb re-draws no terrain; **at VH** a hamlet with the record has its brook between the two frame arcs (an estuary on a coastal mutation) | PR, SF4; the hamlet clause PR, VH |
| T-V8-41 | the party picture set: re-rendered after a committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after `setParty`; two renders of one head and one party key are byte-identical; a reveal made by the DM is seen by a player who opens the tab afterwards and by a second player; "Hide again" restores the previous party; public notes and view pins are drawn, private ones never; B18 detects a stale set by head, party revision or output version; `putPartyPictures` keeps the newer of two concurrent sets; the render and storage rows of V08 §6 hold; with "See what the players see" on, the frame's city band equals the party set's z0 picture at the same head (a pixel diff, both drawn with the fixed sun), the frame's knowledge key stays `secret`, the document's view section is byte-identical before and after the toggle, `doc.snapshot` is answered and the export menu still offers the document formats; a `host.state` carrying a new `party` re-resolves the filter; the crossing (J-V8.91): each render is one `party.render` answered by one `party.rendered` whose set's `partyRev` is the request's `party.rev` and whose `seqAt` is the head drawn; a map edit batch that changes no drawn mark and no listed word (a lock) is answered `unchanged` and writes nothing to the store; an edit that renames a revealed place is answered `rendered`; a viewer's `party.render` is refused `role` | PR, SF5 |
| T-V8-42 | the calamities (DR28): the lit `city-1` pair yields its week-52 calamity as one `EpochInputs.events` entry with severity `major` (≈ 0.09 of the population) and V06's `topple` in its resolved targets' district; a target that joins nothing is dropped and noted `calamity_unplaced`; a calamity leaving the line's capped list is never undone | nightly, SF4 |
| T-V8-43 | the sea threats: a coastal test-side mutation of `city-2` with a `wartime` stressor carries `naval` and DR2 reads it through V11's waterfront row; the same site at peace carries none (or `exposedPort` at 20 000 or more with a port); an inland site carries none; a change of the keys reaches DR2 at the next epoch, never mid-epoch | PR, SF4 |
| T-V8-44 | the ladders (item 108 (f); takes T108-1 – T108-3's dossier clauses): the fourteen qualifier words parse to their steps; `(50-100+)` sets `openTop`; `(10,000+ only)` is a population floor, never a count; no double counting — each metropolis's two church ranges and `metropolis-3`'s two cathedral records merge; a `promotedFrom` receipt re-keys to `#1` and adds members where the greater's thing is the lesser's, and places a REPLACEMENT greater of a new thing new under the record's key, its row re-pointed and the lesser's former thing standing unbound (V08 §3.5.1 (d)); a `demotedFrom` keeps the member nearest its demand; the institution count parity of V08 §7.3 holds by step type on every fixture; a GUILD record beside a guild COUNT record of its family places no second hall — its hall is a COUNT member `#k`, noted `ladder_merged`; an unnumbered record at a village rung takes V07 §2.4's range row, else V11's range unscaled | nightly, SF4 |
| T-V8-45 | the DM's history lines (a harness check): a raised way built at an absorb's epoch is listed as V09 §4.10's `epoch` row whose chronicle entry is V06's `raisedWay`, and its **Why here?** opens the `raised` section with `info.raised.built` and the DR34 or DR35 inputs as `facts` rows of tier `dossier`; a reason firing at a slot the DM closed is one line `info.raised.suppressed` with the removal's week as `{w}`, from one `EpochReport.raised.suppressedFired` entry (V06 §2.10; its producer held by T-V6-58); a way founded in a slot a cap increase opened is an ordinary founding entry, never the removed way's return; the check reads the lines' keys and args, never their words; the upgrade dialog names item 110's additions | nightly, SF6 |
| T-V8-46 | the pseudo-class routes: every `kinds` row's class is a roster class or one of the pseudo-classes of V08 §2.6's `kinds` shape (a compile check over the rows); at a base rung, a test-side mutation of `town-1` with both `Access to external mill` (`@absent:watermill+windmill`) and `Access to parish church` (`@absent:church`) added and every record binding `watermill`, `windmill` or `church` removed places no watermill, windmill or church of its own; adding back one binding record restores that class; `@absent` records are counted by no building in the parity of V08 §7.3. **At VH** (with V07's rows): a hamlet fixture with `Access to external mill` places no `v.watermill` or `v.windmill` of its own, and one with `Access to parish church` no `v.parish_church`, `v.parsonage` or `v.tithe_barn` (V07 §3.11 step 1's `villageForm` reading); a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record's key to one `cross` pin inside the church's `churchyard` part and aliases it on no building, while a test-side mutation of `town-1` holding both records (added where absent) aliases the shrine's key on the parish church's building (V08 §3.5.1 (c)); **over time:** a hamlet fixture with `Wayside shrine` whose record a `promotedFrom` receipt promotes to `Parish church` at an absorb that takes it to VILLAGE stands one `v.parish_church` bound to the record's key, one churchyard `cross` laid for it (keyed by the record's binding key, its provenance the record, no binding row of its own; J-V8.114) and the old roadside `shrine` standing, bound to nothing, with one `ladder_promoted` note; the same hamlet whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt stands one `v.parish_church` bound to the church's key, binds the shrine's key to one churchyard `cross` and leaves the roadside shrine unbound; a village fixture with `Fishmonger` that gains `Fish market` binds the market's key to one hall on the market's rim, with the fishmonger's key as its alias and the fishmonger's shop keeping its use, unbound; a village fixture with `Palisade or earthworks` that gains `Town walls` binds the town walls' key to the one enceinte the fortification path yields — the palisade retyped when at least 80 % of the dwellings lie inside, else the new ring — with the palisade's key as its alias and no binding on a superseded palisade; and a test-side mutation of `town-1` whose `Hedge wizard` record a `promotedFrom` receipt promotes to `Wizard's tower` re-binds the standing house as the tower's member and places no second building (the first case of V08 §3.5.1 (c)); a hamlet fixture off any through road with an unmapped `lodging` kind writes one `unmapped_kind` note whose `class` is `v.alehouse`'s `label` cell — the class V07 §3.11 step 4 built — never the generic class, and T-V7-21's `mercantile-market` custom record at VILLAGE writes `custom_resolved` naming the market cross by its `host.pinKind.market_cross` words, the rendered sentence reading "… built like any market cross (…)", and an unmapped `lodging` kind at a hamlet off any through road renders "… so it is built like any alehouse." | PR, SF3; the hamlet and village clauses PR, VH |
| T-V8-47 | the header's controls and the bridge to the shell (a host-harness check with the transport tap): in an owner's frame and an editor's, each control is offered exactly to the roles its V08 §4.2 row names, and a click on Refresh now, Restore previous map (after its dialog), Make a new map from the record (after its dialog), Reveal to the party and Hide from the party (with a selection of one dossier-bound and one map place), Hide again, Reveal again, the party's base knowledge and Assistant settings posts exactly one `host.action` with that row's `action` and `args` — binding keys for dossier-bound places, addresses otherwise — and nothing else, and the host's handler on `on('action')` runs the row's operation; a cancelled dialog posts nothing; with `backupDepth` 0 no Restore control is offered; Update the map engine posts its `doc.changed` (an `upgrade`) and no `host.action`, then the client sends `doc.snapshot`; the header carries no Keep-the-saved-town control, and V09 §3.14's load-mismatch keep commits a `rebase` through `doc.changed`, after which the client sends `doc.snapshot`; a frozen view's **Edit it with this version** (V09 §3.14 (b)) likewise commits its `frozenImport` `rebase` through `doc.changed`, after which the client sends `doc.snapshot`, and the frame's `banner` slot carries no frozen-view notice; the `upgrade-available` banner has no button; "See what the players see" posts nothing; a `host.action` whose row the role does not hold, injected by the tap, is dropped and reported; a `clerk.config` sets `ClerkMount.host.config()` and `HostSlots.clerkMode`, a host `preview { proposal }` arrives on `proposals`, and the harness's `needsToken`, `refused` and `answer` post `clerk.needsToken`, `clerk.config.refused` and `clerk.proposal`; `HostSlots.hostName` is `SettlementForge`, the population and tier word are locked with `host.locked`, and `fileMenu` is false; `HostSlots.historyLines` lists a reveal, a hide and a tier change made in this session as one `host.revealed`, `host.hidden` and `host.partyTier` line each with its targets, makes no line for the first `party` after a load, keeps one `host.picturesDrawn` line replaced at each `partyPicturesAt`, and is empty after `switchTo`; `HostSlots.newDocuments` is `'download'`, and Open a copy from here saves a `.plat` to the device and leaves the frame's document unchanged; with "See what the players see" on after a hide, `historyLines.list` called with the party key form returns the `host.hidden` line neither naming nor targeting a place that key omits, and not at all when it named only such places, and `list` called with the frame's key once the view is switched off returns it whole; a place whose binding row is gone is named by its key with no target; a `list` with a key the handler has not read yet returns only the lines that name no place, and `onChange` fires once the reads answer; a commit renaming a place a line names, and an applied tail that raises a named place's knowledge tier above the listed key, each fire `onChange`, and the next `list` names that place by its new name, or not at all; the handler registers no `onEffectiveKey` handler and exactly one `subscribe` on the loaded document — released at `switchTo`, a fresh one registered at the next `doc.load` — and every place read goes through `query`'s `entity` form with `admitAs` the listed key (the transport tap and a facade spy; J-V8.106, J-V8.109, J-V8.110) | PR, SF6 |
| T-V8-48 | the export bundle (J122, V08 §11 Q3): `exportScenes({ formats: ['dd2vtt', 'foundry'] })` from an editor's session returns one `Blob` per format whose bytes equal the frame's own export of that format at the same key (a byte compare); the transport tap shows one `export.request { bundle: true }` per format and no other message; a `knowledge` key form lowers both files (a withheld place's name absent from both, a byte search); the client's code path from `export.ready` to the `Blob` holds no JSON parse and no text decode (a source scan, §14's lint); a request with `bundle` for `geojson`, and one for `dd2vtt` without `bundle`, are refused `E_HOST_FORMAT`; an empty `formats` list sends nothing and returns `[]`; a format the key rules refuse is `export.refused` while the other is returned | PR, SF6 |
| T-V8-49 | the edge suite (V08 §3.17): one fixture per clause — (a) the record, messages, binding and digest additions at their data limits; (b) the row sets' `else`, reversed and zero ranges, the water words at every rung; (c) custom content none, one, degenerate and through save, load, undo, redo and migration; (d) the zero-size tab, a one-settlement campaign and an offer through every lifecycle step; (e) the refresh queue empty, one, long, with bad data, at every rung and across a visible edit, a restore and a reload; (f) the digest and the ladders degenerate, and the no-seat case — a THORP dossier with 40 custom institutions absorbed at once places every one, none omitted, the report naming each edge plot (`W_DOSSIER_EDGE`); (g) epochs none, one, backwards and across a band; (h) persistence with depth 0, a quota below the snapshot, two failures at once; (i) the hand-off's data and lifecycle; (j) the players' view at a village rung and at the METROPOLIS tile cap; (k) edits and the clerk at their limits; (l) drawings, pictures and labels at their limits; (m) V08 §3.17 (b)'s feature rows at THORP, TOWN and METROPOLIS, among them a harbour record on a site with neither coast nor river, placed at its first closest option with no basin drawn and never omitted; each clause asserts its row's outcome, its rung and no whole-map retry | nightly, SF7 |
| T-V8-50 | item 111 at the port: a `desert` dossier with `oasis_water` has an oasis and its grove; without it and without a water word, none on any seed; a `desert` with access `river` has its river, with `port` its coast and harbour, with `fishing_grounds` a coast, river or lake; `oasis_water` on a `plains` dossier gives an oasis; a river forced on a relief that cannot carry it is reported, never dropped silently; `oasis_water` removed at an absorb leaves V06's failing spring; with V11 §3.24.0's climate dry cells off and no oasis deposit, byte-identical (item111.water, the port fixtures registered on V12 §3.7.8's engine by the SF4 seat) | PR, SF4 |
| T-V8-51 | item 113's reading: on a test-side "city to village" mutation of a village fixture (a `tierHistory` demotion from city, no `peakTier`), `HistoryHint.peak` is `{ tier: 'city', symbolic: true, evidence: ['tierHistory', …] }` and a `history_gap` note is written; with `peakTier: 'city'` added the peak is recorded, not symbolic; with no evidence there is no peak; each evidence kind alone (a `populationHistory` maximum, calamity losses, a ruined city-tier record, a resettlement) gives its stated tier; the events map by `historyEvents` with their years ago (a ticked event from its tick); a missing age takes the `tiers` row's midpoint with `history_gap`; an ancient "Fall of" event fills `ancientFall` and never `site.ruinEvidence`; a later dossier changing the history writes one `frozen_fact_changed` note and no event; with history replay off the map is byte-identical (item 113 (g)'s pin) | nightly, SF4 |
| T-V8-52 | item 114 at the port: the `readiness` row maps each fixture's label and score to its band and weight; at generation a `vulnerable` poor mutation and a `fortress` rich one read §7.7's DR41 with those inputs (their runs' conditions as the row's shares give them); over epochs the need threat is max(threat, readiness) — a `fortress` heartland mutation stays `high` need, a `vulnerable` frontier one keeps the frontier's need; DR2's creation defence is unchanged by the readiness (byte-identical walls and gates with and without it); a readiness change reaches the next epoch's slice only | nightly, SF4 |
| T-V8-53 | item 115's "specified": at HAMLET a dossier manor record keeps its full design above the ceiling; a dossier government whose `villageSeat` names the manor — a seigneurial one and a crown one alike — forces it at THORP, HAMLET and VILLAGE, at VILLAGE as the one manor; a `Wealthy` hamlet with a `Wealthy Residential` quarter and no grand record builds no grand dwelling; a custom record whose keywords say "palace" but whose resolution lands on a house class is capped; at TOWN every case is byte-identical to the build without the ceiling | PR, SF4; the village clauses PR, VH |
| T-V8-54 | item 117 at the port: a campaign dossier opens on its own week (`week mod 52`) under the follow flag, a changed week re-skins with the model hash unchanged across all 52 weeks through the bridge; a map without a week keeps its own; a realm climate word sets the biome's climate row at creation and a later one writes `frozen_fact_changed`; a word the `climates` row lacks falls to the terrain column, noted | PR, SF4 |
| T-V8-55 | item 118 at the port: the lit-year fixture's `traditions` digest with their weeks, kinds and staging keys (the prose absent from the document, a byte search); a window across the year's end wraps; a window with no readable week is carried unscheduled; a custom tradition keys by `localUid`; adding, changing and removing a tradition changes only the ledger (the model hash equal); the festival shows exactly in its weeks under the follow flag; with no traditions the build is byte-identical (item 118 (h)'s pin) | PR, SF4 |
| T-V8-56 | the frozen facts and the wealth over time (V08 §3.5): a later dossier changing `terrainType`, `tradeRouteAccess`, `monsterThreat`, `magicLevel` or `cultureProfileKey` writes one `frozen_fact_changed` note each, no map event, and the next identical dossier writes none; a prosperity change from `Poor` to `Prosperous` is one `prosperity` change whose epoch carries `EpochInputs.wealthLevel` 0.8, read by V06's wealth level | PR, SF3 |
| T-V8-57 | SettlementForge's decisions as inputs (J121): `moduleOrigin` sets the frame's `src` and the CSP check; `locale` loads a shipped catalogue and falls to English for an unshipped one; `backupDepth` 0, 1 and 3 keep that many backups; a `quotaBytes` below the record drops backups beyond `backups[0]`, then the party set's z3, never refuses a commit, and shows `host.status.overQuota` | PR, SF1 |
| T-V8-58 | item 120 at the port — Find's dossier entries (V08 §3.16 (6); the dossier clauses of item 120 (k)): on `town-1`, `metropolis-3` and the lit `city-1` pair through the bridge, with V09's Find, every dossier institution record that is not `removed` and whose key binds an element is one entry, first among the named institutions, in dossier order, its words its `kindLabel` and its count the addresses its key's rows hold, and its chip selects exactly those addresses (a set compare with `DossierBinding.rows`), apart from its class's entry; `metropolis-3`'s merged cathedral record is its own entry selecting its alias target; an `@absent:*` record, a `(0-0)` record and a `removed` record are no entry; "red light" offers the `red light district` record, and no V11 synonym matches a dossier entry; on a test-side variant of `town-1` with one record made `secret`, under "See what the players see" with a party key that omits it, the record is never suggested, listed, counted, glowing or pinned (a byte search of Find's answers and of the drawn display list for its name); a chip on a record re-keyed by a receipted rename, by T-V8-44's `promotedFrom` pair and by a `fromLines` table on T-V8-11's test line keeps its selection and shows the new words, and a chip on a record an absorb removes shows 0 until cleared; the document's bytes, the model digest and the party set are byte-identical with Find on and off, and the transport tap finds no chip in any bridge message | PR, SF6 (with V09's Find) |

### 7.2 The host harness

`plat/tools/hostharness/` is a test-only host (never shipped): a page on one origin mounting `@plat/bridge-client` with an
in-memory `MapStore` that implements the compare-and-set exactly as V08 §2.2 states and stores bytes only — it imports no
decoder and no hash function, so a design that needed the host to compute anything would fail to build — the module served
on a second origin, and a scripted driver that plays audiences (the DM, a co-DM, players through `mountParty`), dossier
versions (the fixture pairs, and test-side mutations of them), time advances, reveals, page closes, SettlementForge's
configuration inputs (`backupDepth`, `quotaBytes`, `locale`) and forced failures (a killed worker, a dropped reply, a
damaged snapshot, a lost record, an altered event). It runs headless on the three engines in CI and records each run's
events, stored records and model digests for the bars above. It is the only way the SF stage is tested before
SettlementForge wires the tab; SettlementForge's own integration test (V08 §8.3, row R7) runs the same driver against
SettlementForge's store.

### 7.3 Parity metrics

No reference generator embeds a map in a host with a settlement record, so the stage has no reference-parity metric of
§13.5's kind (J-V8.38). The fidelity to SettlementForge is measured instead, over the bridge, against the dossier itself:
T73-1 – T73-7 re-run on documents created through the bridge (they must equal the direct runs byte for byte, T-V8-3's
determinism), the absorb bars T75-1 – T75-5 on the pairs through the bridge, and one count parity — the institutions
SettlementForge's own dossier page lists (its non-housing records) equal the gazetteer's `dossier`-tier institutions, name
for name, on every fixture and after every pair, COUNTED BY STEP TYPE (item 108): a COUNT record as its placed members, a
GUILD record as its hall plus its members (the hall counted once — as a guild COUNT record's member when the dossier holds
one, V08 §3.5.1 (c)), a QUARTER record as its neighbourhood with the members it owns, a SIZE or REPLACEMENT record as one
building, a lesser merged into a greater (`mergedInto`) once, as the greater's member, never twice; pseudo-class records
(`@none`, `@office`, `@seat`, `@layer:*`, `@landuse:*`, `@pin:*`) by their reader's count, and `@absent:*` records by none.
The two known item-110 reach points are measured the same way: every dry-site toll bridge has its bridge (T-V8-40), and
every CITY water record has its conduit house (T-V8-36). The fixtures' levels for V12 are item 108 (f)'s `exactMonotone`
levels (the surveyed-dossier fixtures, their `@pop×k` derivatives registered in the frozen manifest, a level outside
[1 500, 120 000] `notApplicable`), item 104 (h) (8)'s levels (the custom-chain fixtures), the step script's (the catacomb
fixtures, DR32) and the elevated road's `higherWith` (a fixture carrying a high-ground landmark, DR35); none is a
calibration seed family, and B-DOSSIER-lite guards every accepted run (V12 §1b, V12 §3.7.5).

## 8 Build plan

### 8.1 Where it slots into §16

The owner's roadmap stages "SettlementForge inputs" after the generators are mastered (*Staged by the owner's roadmap*)
and the owner's definition orders it last — built standalone, then calibrated against the corpus, then connected
(`docs/DEFINITION.md` §1) — so the stage is milestone **M-SF — the SettlementForge stage**, directly after V12's **M-CAL**,
which follows every standalone generator milestone in §16's order (V12 §8.1; J-V8.39; item 529). The order is decided under J122
(V08 §11 Q4: M-SF after M-CAL), stated once in §16 and INDEX's plan; SF0–SF3 may start earlier on the frozen fixtures. M-SF
needs M3a (the API, the bridge, the absorb half, the dossier contract), M3b (the picture exporters the thumbnails and the
party set use, and the scene exporters the export bundle uses), M3c (V10's C5 host seam and V09's AP8 card-only drawer,
which SF6's host clerk and `ClerkMount.host` drive), M4 (the incremental path the catch-up epochs run on, the rung read at
each epoch), M6-E (V06's epochs and history replay, which J122's order lands before M-CAL), M-CAL's calibrated tables, and
V11's **C4b** — the SettlementForge rows: `dossier.kinds`, archetypes, category synonyms, keywords, good words and ladders
— with **C4a**'s wall barrier and waterfront rows (landed at M2b) and **C9**'s rows that items 111 and 113–118's port
readings use (V11 §8, each priced there, not here). V09's AP5b — the host shell verified on `embed.html` with SF4 and SF6
— runs inside M-SF (V09 §8.1). Without V11's rows every unmapped kind still stands at its category's generic class,
reported — the stage is never
blocked by content. An SF step started before M6-E lands runs its catch-up epochs on the base's built growth path and
hooks, which V06's epochs replace with no change to the port. The item-110 reach points (V08 §2.6b) need the base's item
110 and V11's rows for it; a step run before them carries DR34 and DR35 unread, reported. The village hand-off (VH) runs
with V07's product (J122: the village lands before M-SF) and is a half-week row of its own.

### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **SF0 — spike** (risk retirement) | `embed.html` host mode booting in a frame on a second origin under V08 §3.1's sandbox and both CSPs, on the three engines; the transport's origin and source checks; `hashDossier`; a throwaway store; ONE measurement that could refute the brief — SettlementForge's app CSP and hosting admit a frame on the module's origin with workers (V08 §8.4 risk 1) | T-V8-1 green; boot and load rows of V08 §6 measured at CITY; the CSP answer recorded | 0.75–1 |
| **SF1 — the host client and the store contract** | `@plat/bridge-client` (`MapHost`, `MapSession`, `MapStore`, `MapRecord`, `MapHostConfig` with SettlementForge's inputs — origin, backup depth, quota, locale — `statusText` generated from V09's rows, the party viewer); the generated message types; the bridge messages, `doc.snapshot`, the `encoded` and head fields, `doc.load.audience` and `ready`'s additions in `@plat/api` (item 472); the host-minted `docId` (item 459); the host harness with its bytes-only store | T-V8-2, T-V8-4, T-V8-57 | 2–2.5 |
| **SF2 — the port leader** | creation and absorb over the bridge by an editing role; commit through compare-and-set; every editor's verification of applied absorbs; the reserved session `host:port`; coalescing; `unchanged`; the refresh queue in its hidden frame with its lease and the page-memory rule | T-V8-3, T-V8-6, T-V8-7, T-V8-8, T-V8-13 | 2–3 |
| **SF3 — adapters and failure** | `AdapterManifest` with required and optional keys and the adapter's field table, `AdapterRegistry` with the selection order, limits, record quarantine and its hold, `E_OTHER_SETTLEMENT`, remaps and line migration (items 508, 390, 512); the name grammar, qualifiers and ladder merges (item 108); the frozen-fact and wealth rows of the diff; the held state with its reason; the port notes' `msg`, `keys` and classes, the ledger's `notes` and `notesCleared` and `DossierBinding.notes`, copied into `GenerationReport.dossierNotes` (items 508, 358, 390); the `tags`, `categories`, `crime`, `cultures` rows (item 510) | T-V8-9, T-V8-10, T-V8-11, T-V8-15, T-V8-20, T-V8-23, T-V8-31, T-V8-44, T-V8-46, T-V8-56 | 2.25–3.25 |
| **SF4 — the staged records, the values, the g items and custom content** | `dossierFacts` and `dossierRecord` (item 358) with the records' fills and drawing rows and the chains' knowledge rule (item 410); `PortValues` with the latitude, the sea threats and the readiness (item 389); the realm block helper and the latitude row (items 391, 396); coverage inside a range (item 392); SettlementForge's chains, dependencies and goods (DR33); the calamities and stressors; the vocabularies (relations, history, conditions, magic, era, materials, isolation); item 109's evidence, drivers and burial trace (DR30–DR32); item 110's inputs (DR34, DR35, the dry-site brook with its rung column, item 399); items 111, 113, 114, 115, 117 and 118 at the port (the water words and the oasis, the history's reading and the effective peak, the readiness, "specified", the calendar and the climate, the traditions); the display names in use; custom content's arrival (items 511, 256, 394) | T-V8-16, T-V8-18, T-V8-21, T-V8-22, T-V8-24, T-V8-25, T-V8-28, T-V8-32 – T-V8-40, T-V8-42, T-V8-43, T-V8-50 – T-V8-55 | 5.75–7.75 |
| **SF5 — persistence in the host and the players' view** | compaction through `doc.snapshot`, backups to `backupDepth` with `tailAfter`, the quota's trim order, restore and "make a new map" with fresh loads, thumbnails, the upgrade flow and its compaction; the party picture set, the party gazetteer, `setParty` and the player's tab (V08 §3.14) | T-V8-5, T-V8-17, T-V8-29, T-V8-41 | 1.5–2 |
| **SF6 — the tab's UX, the host clerk and the export bundle** | host mode's chrome, banners and history panel with item 110's lines (V08 §5.1, V08 §4.6); the words of the notes, held reasons, host lines and the frame's controls, dialogs and strip (V08 §3.9, V08 §4.6, V08 §5.1); the actions of V08 §4.2 with `host.action` and `host.state`; the bridge to the shell (`ClerkMount.host`, `HostSlots`; V08 §3.1 step 7); the host clerk's relay, projection and previews; `setClerk` and `clerkNeedsToken` (V08 §4.4, V08 §5.4); the export bundle's scene route (V08 §5.4 (2)); Find's dossier entries with V09's Find (V08 §3.16 (6); item 120; a reading of carried facts and binding rows, inside this step's estimate) | T-V8-14, T-V8-27, T-V8-45, T-V8-47, T-V8-48, T-V8-58 | 1.5–2 |
| **SF7 — hardening and release** | campaign scale; every budget measured; the edge suite (V08 §3.17); the release checklist; the fixtures re-cut and run through the bridge | T-V8-12, T-V8-26, T-V8-30, T-V8-49; T73-1 – T73-7 and T75-1 – T75-5 green through the bridge | 1.75–2.5 |
| **VH — the village hand-off** (with V07) | the port's consultation of `LadderRouter` with V07's registered `ProductDecl` (item 202), the band fold at epochs and the desertion route at 0; T-V8-19 on V07's rows as well as the test product; the village clauses of the edge suite and of items 111, 115 | T-V8-19; T-V8-15's village clause; T-V8-40's, T-V8-46's, T-V8-53's and T-V8-18's village clauses | 0.5 |
| **total (the map side)** | V11's C4b and C9 are priced by V11 | | **18–24.5** |
| SettlementForge's side (the owner's program, priced for the owner's plan, not in the total) | the lazy Map tab chunk and its mount; the map-record table with its conditional write and row-level security; `frame-src` for the module's origin and its own `MapHostConfig` values; the advance hook that marks `refreshPending` and calls `refresh`; the library entries for `customLibrary`; the assistant's use of `query` and `preview`; the export bundle's use of `exportScenes`; the status banner's strings | SettlementForge's own tests plus R7 below | 1.5–2.5 |

### 8.3 The release checklist (run by T-V8-26 before every release of the SettlementForge configuration)

| row | check |
|---|---|
| R1 | every T-V8 bar, T73-1 – T73-10, T75-1 – T75-5, T77-1, T81-2, T85-1 – T85-3, T88-1 – T88-2 and T108-1 – T108-3 green at the release commit |
| R2 | the adapter set: each registered adapter's `line`, `version` and `commit` equal a fixture manifest's rows; every manifest's `keyList` equals its field table's read rows and passes §14's lint; each manifest's `vocabulary` versions equal the `tablePins` of the fixture documents it serves, and a moved pin is reported with the table rows it changes; V11 §3.12's ladder rows agree with the committed `ladderPairs`, a disagreement a V11 table fix |
| R3 | output-version retention: the release replays every stored fixture document of the two previous output versions exactly (§6.4) |
| R4 | the host client's version and its message types match the module's `protocol`; a client one protocol behind is refused at `ready` with the upgrade notice |
| R5 | the module origin's headers equal V08 §3.1's list (a scripted fetch of each response header) |
| R6 | the budgets of V08 §6 re-measured, any fallback taken reported in the release notes |
| R7 | SettlementForge's integration: the harness driver run against SettlementForge's staging store and tab (the owner's environment) — create, a week, a year, a held dossier, a restore, an export bundle — all bars green |
| R8 | the known-defects file (§14's `@plat/docs`) lists every open defect of this stage with its workaround |
| R9 | a new SettlementForge line (when one ships): its adapter folder, the fixtures re-cut by the same scripts, T-V8-10 and T-V8-11 on the old line's pairs; every top-level key, condition archetype, climate word and tradition type the fixtures show that no list or row names is listed for a table fix |
| R10 | the clean-room scanner (§17.1 (5)) passes over `@plat/port`, `@plat/bridge-client` and the host mode's code |

### 8.4 Risks, in order

1. **SettlementForge's frame policy.** The stage assumes SettlementForge can host a frame on a second origin with workers,
   as it already does for its realm map (`research/sf/dossier-seam.md` C-1); which origin serves it is SettlementForge's
   decision (J121). SF0 measures it; **pre-decided fallback:** the module's files served under a path of SettlementForge's
   own static host with a separate origin via a subdomain it already runs, and, if no second origin is possible, a
   `MessagePortTransport` to a module worker on SettlementForge's origin without the frame — the worker holds no account
   data and receives only data messages (§11.3), the protection then resting on the bridge's data-only rule alone, reported
   to the owner.
2. **The store's conditional write.** The commit rule needs a compare-and-set on `logHead`. SettlementForge's store is a
   hosted Postgres (`research/sf/dossier-seam.md` C-6), where a conditional update is one statement; if the owner's storage
   cannot do it, **pre-decided fallback:** a lease — the client takes a 30-s renewable lease on the record before
   committing, and a client without the lease sends its edits as `doc.changed` to the leaseholder's session through the
   host.
3. **Refresh time at METROPOLIS scale.** A metropolis year can take ≈ 8 s in the queue with its party set (V08 §6).
   **Fallback:** the queue processes the maps the DM opened most recently first, and a METROPOLIS map is refreshed only
   when opened.
4. **A new SettlementForge line before M-SF lands.** One adapter folder and a fixture re-cut (§14's port item 1); the
   stage's bars are line-agnostic, so the plan does not change.
5. **Storage cost at campaign scale.** Up to ≈ 21 MB per METROPOLIS record with no backup and ≈ 8 MB more per backup (V08
   §6); the backup depth and the plan's allowance are SettlementForge's (J121). **Fallback:** the client's trim order under
   the allowance (V08 §3.7: backups beyond the newest, then the party set's z3 level), then the party set's own fallback (z2
   over the built-up area, z3 capped at 32 tiles).
6. **SettlementForge's assistant's loop.** Where its model loop runs is SettlementForge's (J121); the relay of V08 §4.4 (1)
   works either way because the map tools resolve in the DM's page. **Fallback:** if the assistant cannot call back into the
   page, it answers from the dossier alone and proposes nothing on the map; map questions and previews go to the in-frame
   built-in clerk where the deployment enables it (V08 §4.4 (6)), which needs no new stored artifact.
7. **The condition weeks' reading** (`expiresAtTicks` as a whole length, V08 §3.11) is PLAUSIBLE. T-V8-18 measures it on
   the one-week, one-season and one-year ticks; **fallback:** the absolute-tick reading, pre-decided there.
8. **SettlementForge's history, climate and tradition words at the pinned line** (V08 §2.6's `historyEvents`, `climates`,
   `festivals`). The nine template words, the climate synonyms and the festival words are PLAUSIBLE until SF0's census
   reads the pinned line; **fallback:** each unknown word takes its row's defined `else` (the event's type category, the
   terrain column, the `market` kind), noted, until a table fix gives it a row — never a dropped event, climate or festival.

## 9 Decisions (each vetoable)

A decision a later ruling changed carries one mark on its row: "amended by X" (the governing row keeps the reason).

| id | decision |
|---|---|
| J-V8.1 | chose to run the port inside the module's generation worker, beside the document, over running it in SettlementForge's bundle, because the port reads the document's carried facts and emits events the module must dry-run, and SettlementForge's bundle then holds only a 12 KB client (8 KB plus the party viewer) with no knowledge of our model |
| J-V8.2 | chose "only an editing role — the DM or a co-DM — runs the port and commits; the log's single head arbitrates" over electing a port leader, because `digest`, `creation` and `absorb` are pure, so two editors compute the same events and the host's compare-and-set drops the second as `stale` with nothing lost; a player never holds the document or the dossier (J-V8.57) |
| J-V8.3 | chose one map record in its own row beside the settlement, keyed by settlement and map id, over storing the map inside the dossier's data, because the document is about ten times the dossier's size and would ride every save, sync and public projection (`research/sf/dossier-seam.md` C-6) |
| J-V8.4 | chose the host's SHA-256 over the dossier's canonical JSON to decide WHETHER to offer, and the port's fact-level diff to decide WHAT changed, over a host-side fact hash, because the host holds no port and must stay dependency-free, while the port alone knows which keys it reads |
| J-V8.5 | chose snapshot plus event tail with compaction at 256 events or 256 KB and rotating backups over storing only the log or only snapshots, because loads stay at §12.5's law, every event is durable at once, and a damaged snapshot has a known predecessor (V08 §3.9 B10) — amended by J121: the number of backups is SettlementForge's `backupDepth`, read as an input (J-V8.118) |
| J-V8.6 | chose the background refresh after an advance to run in ONE hidden frame on the DM's page, serially, pausing on input, over a server-side renderer or parallel frames, because the product has no hosted service (§11.5), one document at a time keeps memory at one rung's line on any campaign size, and `refreshPending` makes it resumable |
| J-V8.7 | chose an `<iframe>` on the module's own origin with `allow-scripts allow-same-origin allow-downloads` over a worker or script on SettlementForge's origin, because it is SettlementForge's own pattern for its realm map (`research/sf/dossier-seam.md` C-1) and no module code then runs beside accounts or payments |
| J-V8.8 | chose to quarantine a malformed record and absorb the rest over refusing the whole dossier, because one bad record must not freeze a campaign's map, and the record keeps its last carried state and is retried at every offer |
| J-V8.9 | chose the selection order `HostContext.line` → the document's bound line → the single accepting adapter → at a creation, the newest accepting line, recorded and noted `line_defaulted` — with `E_LINE_UNSUPPORTED` only when none accepts — over refusing whenever two adapters accept, because a bound map must stay on its line until a declared migration moves it, a declared, reported default is no silent guess, and a refusal would hold every map the moment a second line was registered |
| J-V8.10 | chose a declared re-baseline (`remaps`, no map event) for an adapter's own version change over treating every re-read field as a dossier change, because a change in our reading is not a change in the settlement, and T-V8-10 enforces the declaration |
| J-V8.11 | chose declared `fromLines` key migrations with a hold when absent over re-creating the map on a line change, because the players' map must survive SettlementForge's own upgrades, and an undeclared migration would re-bind by guess |
| J-V8.12 | chose one document, one seed and one history across the village and town products over a new map at the 1 500 boundary, because the owner's continuity rule (item 22) makes a settlement's map follow its history, and §4.11's rung change already carries a crossing; the product at each epoch is V07 §2.1's fold with its hand-off band (`handoff.band`), so a population hovering at 1 500 never flips the product (item 322), and the port registers nothing — it consults `LadderRouter` over V07's `ProductDecl` (item 202) |
| J-V8.13 | chose a host-minted document id (`MapRecord.mapId`) over the module minting one per creation, because two clients creating one map at once then produce byte-identical documents (T-V8-3) |
| J-V8.14 | chose one `dossierFacts` ledger event per absorb, carrying every change's before and after, over storing the dossier block only in snapshots, because the block must rebuild from the log alone (§2.9) and the report reads it |
| J-V8.15 | chose one `dossierRecord` event kind for every staged record (conditions, deposits, relations, persons, custom chains and services) over one kind per record, because they share authorship, addressing, fold and lifecycle rules, and one kind keeps §7.4's dossier rule in one place |
| J-V8.16 | chose to carry crime, food import, food chains, legitimacy — and the readiness (item 114) — on the circumstance slice (`PortValues`) over `editTable` events on `PortRows`, because a table edit re-derives from its first reader stage — the reshuffle item 22 forbids — while an epoch's slice moves them at the cadence |
| J-V8.17 | chose to round severities to 1/1 000, standings to 1/10 000 and percentages to 1/100 in the digest over carrying raw floats, because floating noise in a host's arithmetic must never read as a change (T-V8-6) |
| J-V8.18 | chose that this volume owns the SHAPES and lookup chains of `kinds`, `archetypes`, `categorySynonyms` and `keywords` while V11 writes their rows beside each class's siting profile, over writing the kind rows here (280 at the pinned line, read from `dossier.catalogue`), because the rows are siting content that must agree with V11's profiles row by row |
| J-V8.19 | chose a SettlementForge-tag → family table in `tables/dossier/tags` over reading tags directly in the solver, because the host's words stay inside the port's tables (§14's lint), and item 103 (a)'s default-profile-by-tag needs a stable family vocabulary |
| J-V8.20 | chose to let coverage (item 103 (f)) weigh the count INSIDE a collective record's range and decide where its members go, over letting it change the range, because the range is a dossier fact and the count inside it a map fact |
| J-V8.21 | chose that SettlementForge's assistant acts only inside a user's session with that user's role and key over a role of its own, because a player's assistant must never read what the party does not know, and §11.2 already gives every clerk its viewer's key: an editor's assistant acts inside that user's frame session; a player's assistant has no session, frame or document (J-V8.57) and reads only the stored party gazetteer, made under the party key (V08 §3.14, V08 §4.4 (1)) |
| J-V8.22 | chose that the players' pictures keep the stored output version's drawing until the DM upgrades over re-rendering them under each release, because an upgrade can move things (§7.5's diff) and the DM decides when the table sees it |
| J-V8.23 | chose at most one offer in flight per session, a newer dossier replacing a queued one, over queueing every version, because the port diffs carried facts against the newest dossier and dates changes from its receipts, so skipped versions lose nothing SettlementForge's own end state keeps |
| J-V8.24 | chose to show the stored thumbnail at once and swap in the live map over a spinner, because the tab then shows the town within 50 ms whatever the frame's boot costs |
| J-V8.25 | chose that every epoch of a catch-up reads the NEW digest's slices over interpolating them, because SettlementForge keeps no interior history of trade, economy or powers (research V52, V56); interpolating would invent facts |
| J-V8.26 | chose each culture's centre of gravity, rounded, as its latitude (`cultures`) over one latitude for all, because item 102's daylight share should differ between a northern and a southern setting when the host gives no realm latitude; the values are a dossier row set, not calibratable (J-V8.107) |
| J-V8.27 | chose to compute the realm block host-side in a pure client helper (`realmBlockFrom`) from the campaign's placements, the realm map's scale and latitude scale and the campaign's spatial digest over sending raw placements to the module, because the realm map is the host's and §7.7 item 1 lets the module carry only the spatial digest's words: the module receives bearings, distances, cell words (the climate word among them, item 117) and a latitude, nothing else of campaign state |
| J-V8.28 | chose that the host computes display names with its own public filter over the module re-implementing that filter, because the filter is SettlementForge's product rule and the module must never hold it (item 85 (b)) |
| J-V8.29 | chose that the module takes the LOWER of the role it is told and the role of the audience word over trusting either alone, because a client bug in one of the two must never raise a player's rights |
| J-V8.30 | chose to reuse one frame across a campaign's settlements (`switchTo`) over a frame per settlement, because boot is then paid once per page and only one document is live |
| J-V8.31 | chose the author's library fields as an OPTIONAL `HostContext.customLibrary` admitted only when its definition, revision and content hash equal the dossier's, and carried in the document, over asking SettlementForge to add them to the dossier, because the map never asks (item 20 (h) (iv)), the dossier stays the truth, and replay must never need the host |
| J-V8.32 | chose to reduce a custom description — and a tradition's staging prose (item 118) — to keyword keys inside the adapter over carrying the prose, because §7.7 item 1 admits no prose beyond the description seed, and the keywords are what the map reads anyway |
| J-V8.33 | chose the dossier's own activation verdict for custom chains over recomputing "all nodes present" in the port, because the verdict is SettlementForge's rule on SettlementForge's facts — recomputing it could disagree with the dossier |
| J-V8.34 | chose that a realm latitude arriving after creation enters at the next epoch as a `port-values` change, moving the town only by item 102 (e)'s drift, over freezing the creation latitude, because SettlementForge usually places a settlement on its realm after generating it (`research/sf/dossier-seam.md` §4, C-9), so a frozen culture latitude would stay wrong, while re-deriving at once would shift every plot's daylight share together — the reshuffle item 22 forbids; the DM may still set it with T7 `adjust` |
| J-V8.35 | chose that SettlementForge draws only the container, the thumbnail and a status banner over drawing map chrome of its own, because the map's UI then ships and versions with the module, and a dead frame still shows a readable state |
| J-V8.36 | chose pictures only (`png`, `svg`, `print`) through `exportPicture` over every export format, because anything else as data carries geometry into SettlementForge's code (door 1, J86); files are the user's, from the frame's export menu — amended by J122 (V08 §11 Q3): from M-SF the export bundle's scene files cross as opaque blobs (J-V8.119) |
| J-V8.37 | chose to close door 1 structurally for every STRUCTURED format — no decoder in the client, pictures only through the client, every clerk answer and the party gazetteer projected to words — and to state that the host stores the document as an opaque artifact and holds pictures, over a claim that nothing geometric reaches the host, because the `.plat` bytes and the SVG paths do rest with the host and the ruling J86 plus the owner's audience table accept pictures — amended by J122: no call returns a structured format as data, and the bundle call returns opaque blobs only (J-V8.119) |
| J-V8.38 | chose dossier fidelity through the bridge (T73, T75, the institution count parity) as the stage's parity measure over a reference-parity metric, because no reference generator embeds a map in a host with a settlement record |
| J-V8.39 | chose milestone M-SF directly after V12's M-CAL, which follows M4, M5, M6 and V-M4, over running it beside M5 and M6, because the owner's definition orders the connection after the calibration and V12 places M-CAL after the standalone generators — confirmed under J122 (V08 §11 Q4) |
| J-V8.40 | chose to name a condition in the legend for every key only when its archetype draws a tint over naming every condition, because a drawn tint is visible anyway while a political condition (infiltrated, indebted) is the DM's secret |
| J-V8.41 | chose to order the creation prefix with each active custom chain's nodes upstream first over the dossier's order alone, because item 104 (h) (4) needs a downstream node to see its suppliers' sites, and a fixed order keeps creation deterministic |
| J-V8.42 | chose the dossier's `chainId` as a chain's identity — a changed node set being a new chain — over our own identity from the nodes, because it is SettlementForge's identity and needs no guess |
| J-V8.43 | chose to make a NEW map from the current dossier under a new `mapId` when the host has lost the record (B11) over refusing, because the dossier is the truth and a creation of the current state is one pass of §7.7's One path; the lost layout is not recoverable — item 22 (c) lets the new map differ — and the report says so |
| J-V8.44 | chose "restore previous map" as a swap to the newest backup followed by a forward absorb over rewinding dossier events, because dossier events are never undo targets (§7.4) and the map must end at the current dossier |
| J-V8.45 | chose to read SettlementForge's per-institution `priorityCategory` as the institution's political role, DR12's first input (item 397), over ignoring it, because it is a per-record fact naming the domain the institution serves (government, military, religion…), which is what DR12's power association needs; it is not the never-read generation sliders (`config.priority*`, §7.7 item 1), which are settlement-wide weights whose effect already sits in the institution list — so nothing is counted twice |
| J-V8.46 | chose "the host stores, the module computes" — every encoded event, sequence number, head and snapshot field arriving in a message, the host comparing only `baseLogHead` with its head — over a host that encodes or hashes, because the host client imports nothing (item 507) and a store that must compute would need our model code on SettlementForge's side |
| J-V8.47 | chose to read `magicLevel` `medium` as `low` over a fourth level, because 32 of the 35 births carry `medium` and D-3's realism floor keeps magic present but not shaping the town unless the dossier says `high` |
| J-V8.48 | chose to place a `teleport_circle` for a `magical_transit` isolation path only when no dossier record already binds that class over always placing one, because the dossier is the truth of what exists and a derived use would double a listed record |
| J-V8.49 | chose that the chain-status weights are V11's (`siting.web.chainStatus`) and the port carries only the neutral status key, over weights held in the port, because one weight table must serve the supply web on standalone and dossier maps alike; the values are V11's and calibratable |
| J-V8.50 | chose never to produce the `raider` sea-threat key from a dossier over mapping a nearby word to it, because the line has no raid or piracy word (CONFIRMED over its fifteen stressor types and the archetypes its fixtures carry); `raider` is a standalone and pack key, and a raid word a later census shows gains its row as a table fix (V08 §2.6 `threats`) |
| J-V8.51 | chose not to make an ancient founding a ruin-evidence row over reading great age as evidence, because V04 already compares `history.ageYears` with its own `ancientYears` through `HistoryHint`; one reader, one constant |
| J-V8.52 | chose to keep power-relation keys unordered and to read no relation as directed over a directed key `relation:<from>><to>`, because the line's pair order is not a direction (CONFIRMED: of `city-1`'s four `subordinate` pairs, three name the superior first and one last), so a directed reading would invert a quarter of them; a later line that stamps a direction adds it through a declared `remaps` entry |
| J-V8.53 | chose that a churchyard stays a burial face while its church plot keeps the churchyard part, the church ruined or not, closing only when the plot is cleared and re-used, over closing it with the church, because the burial ground outlives its church in historical practice and item 109 (k) never lets a catacomb shrink |
| J-V8.54 | chose never to undo a calamity that leaves SettlementForge's capped history list over reading its absence as a removal, because a calamity happened and cannot un-happen; the list is capped for size, not revised |
| J-V8.55 | chose to cite §4.11's cadence — an epoch at each calendar year end (week mod 52 = 0) and one at each ± 5 % population crossing inside the span, dated from `populationHistory`, plus one at each new calamity's week — over a cadence of this volume's own, because the cadence is the base's and a restatement with a variation is a second truth |
| J-V8.56 | chose to give stressors one path, a `cond:stress:<type>` condition overlay read by the epoch's readers, over also adding an `EpochInputs.events` entry, because two paths would count one stressor twice |
| J-V8.57 | chose to give players a stored party picture set (a PNG pyramid, a building-band level only over the places they know, the city-band SVG) and a stored party gazetteer, never the document, a dossier or a session, over a live frame filtered by their key, because §11.1 *Knowledge* forbids sending the document to a client a place is secret from, item 85 (a) forbids the seed leaving the host, and SettlementForge's player view is player-safe by construction — amended by J122 (V08 §11 Q5): pictures and player views now; a live shared map after M-SF, as its own item |
| J-V8.58 | chose to record what the party knows on the map record (`MapRecord.party`, written by `setParty`, one-step "Hide again") over per-session view state, and to replace SettlementForge's retired area fog consciously by place-by-place knowledge, because a reveal must reach every player, every later picture and the gazetteer, and the base's knowledge model is by place (§9.2); area fog over a live map belongs to the live shared map J122 places after M-SF |
| J-V8.59 | chose one reserved session, `host:port`, constant and group-less, for every event the port emits over the committing editor's session, because byte identity across editors (T-V8-3) and every user's undo stack (V09) depend on the port's events belonging to no user (item 359) |
| J-V8.60 | chose recognition by a REQUIRED key set plus a declared optional list, any other top-level key accepted and dropped with a note, over an exact key count, because lived dossiers carry 41 to 47 keys and a later line may add more; refusing an extra key would hold every advanced campaign map |
| J-V8.61 | chose a dedicated editing-role message `doc.snapshot` for creation, compaction, upgrade and rebase, exempt from `E_HOST_FORMAT`, over asking for a `.plat` export, because storage is not an export and the export refusal must stay absolute for hosts |
| J-V8.62 | chose to leave the calamity-to-hazard mapping in V06's calamity table (DR28) and to carry only the `CalamityRef` — with its deaths for V04's burial growth — over a second mapping table in this volume, because two tables would disagree; V06 owns the reader, this volume the inputs |
| J-V8.63 | chose to date a condition from its ticks — `sinceWeek = W − elapsedTicks`, `untilWeek = W + expiresAtTicks − elapsedTicks` — with a measurement and a pre-decided absolute-tick fallback, over leaving conditions undated, because the line's statuses carry no weeks and a condition must end at its week on the map |
| J-V8.64 | chose that every editing client holding the dossier re-runs an applied absorb and REPORTS a mismatch, never blocking the fold, over trusting any editor's result or requiring a second signature, because the log's order is the truth, §11.3 already reports a fates mismatch this way, and a block would let one faulty client freeze the map |
| J-V8.65 | chose, for a toll bridge on a site with no watercourse, a watercourse forced at CREATION where the record's bridge spans it (at base rungs a brook across the longest approach's through route; at village rungs V07's brook or estuary between the frame arcs — one rule with its rung column), over dropping the bridge, raising an undeclared way at a TOWN or inventing water later, because a brook is the realistic reason for a toll bridge, needs no raised way (item 110 (b) forbids one undeclared at TOWN) and touches §5.3's deck invariant not at all; a record arriving by a later absorb never re-draws the terrain (item 22), so its toll house takes an existing crossing or the gate, noted |
| J-V8.66 | chose that nothing item 110 generates is dossier-bound — its provenance naming the records that fed its reason — so the DM's removal is the base's delete of generated content and never lapses, over binding a raised way to its water record, because binding it would turn the DM's delete into a `rejectSite`, which lapses at the next epoch or scoped dossier event, and the arches would return within a year against the owner's "a user can decide to add or remove" (item 260) |
| J-V8.67 | chose that a dossier-bound conduit house makes item 110 (b)'s water need count as met at CITY and METROPOLIS, the chance, cap and source-in-reach rules unchanged, and that the RUNG, never the tier word, gates the reason, over scaling the aqueduct chance by the city water record, because that record is required at chance 1 on every SettlementForge city (7 of 7) and would be one constant, and SettlementForge's lower cities are our TOWNs, where item 110 allows arches only by declaration |
| J-V8.68 | chose that a custom record resolved to the `water-supply` family counts as a water system at CITY and METROPOLIS but never declares arches at TOWN, over treating a custom water record as a declaration, because a declaration is the DM's act on the map, not an author's library entry |
| J-V8.69 | chose never to make a hot spring an aqueduct source over allowing it, because a hot or mineral spring gives a bath-house and mineral water, not a drinking supply |
| J-V8.70 | chose to define item 110 (b)'s "dossier landmarks on high ground" as the dossier-bound institutions of class significance at least V11 §3.24.2's `elevated.landmarkMinSignificance` (the castle's, V11's calibratable setting beside the `landmarkFactor` it gates) and the custom `landmark` records, read at their S3 reservations, over SettlementForge's `quarters[].landmarks[]` strings, because the strings are street, yard, pin and institution names (none a high-ground landmark) and reading them would count an institution twice, and a map rule's constant belongs in V11's settings, not in a dossier row set |
| J-V8.71 | chose to keep the era `c14` for every culture and to carry the CULTURE to item 110's aqueduct chance and stepped specialisations, over inventing an era from the culture, because the line has no era field and the culture is its only preset input; which cultures build in tiers is V11's content |
| J-V8.72 | chose not to read SettlementForge's world-state works ledger over deriving a raised way from its infrastructure count, because the ledger names no structure, lives outside the dossier, and the port reads only the dossier and `HostContext` |
| J-V8.73 | chose to resolve SettlementForge's assistant's map tools in the DM's page — the page executing `query` and `preview` and returning the answer the module already projected (V08 §5.4 (3)), a headless session when no map is open — over a server-side map session, because the product has no hosted map service (§11.5) and the page already holds the session and the key; wherever SettlementForge runs the assistant's loop — its decision (J121) — the relay holds |
| J-V8.74 | chose that the refresh frame never starts beside a visible CITY or METROPOLIS document over letting two large documents share the DM's page, because two METROPOLIS documents would exceed any reasonable page budget (§12.8: 260 MB each); the queue waits for the tab to close or a TOWN or smaller to be visible |
| J-V8.75 | chose the compaction precondition "the snapshot's head is the record's head or lies in its tail", keeping the tail's suffix, and keeping the removed segment on `backups[0]` as `tailAfter` until the next compaction, over a compare-and-set on the head alone, because an actively edited map must still compact and B10's second rung must be exact |
| J-V8.76 | chose to re-bind a notable after a reroll by equal name and role over only through `replacedNpc`, because a reroll renumbers the ids and the research plan's J-M11 re-binds by name and role; any other vanished notable is retired |
| J-V8.77 | chose to re-render the party set after each committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after a reveal, keeping the newer of two concurrent sets by the integer pair (last seq, party revision), over rendering on every commit or only on demand, because rendering costs up to 3 s at METROPOLIS and players must see reveals at once |
| J-V8.78 | chose one source for the tab's banner and caption texts — V09's `host.*` catalogue rows, generated into the client's `statusText` defaults at build time — over a second copy in the client, because two copies drift |
| J-V8.79 | chose, when a quarantined record's key cannot be formed, to hold every carried institution key absent from the new digest (no `remove`, one `quarantine_hold` note) until a readable dossier arrives, over removing the absent keys, because an unreadable record might be any of them and a wrong removal would close a standing building |
| J-V8.80 | chose to make the `changeIds` trim part of the fold of each `dossierFacts` event over trimming at save, because the dossier block must rebuild from the log equal to the stored block at every seq (§2.9's load check) |
| J-V8.81 | chose to keep V11's ladder rows marked `inferred` where SettlementForge's ladder file lacks the pair but the dossiers list both forms (two church ranges, two cathedral records), over dropping them to match the file, because item 108 (c) must merge whatever the dossier lists; a disagreement with the file is a V11 table fix, found by release row R2 |
| J-V8.82 | chose to resolve a chain processor, dependency institution or calamity target by exact name, then by kind family (count range and qualifiers removed, plural folded), else to keep it by name and note it unjoined, over fuzzy matching or creating a building, because the dossier is the truth of what exists and a fuzzy join would bind the wrong record |
| J-V8.83 | chose to bind a GUILD record's hall into a guild COUNT record by the GUILD record's `categories` family — `craft` to `craft_guilds_*`, `trade` to `merchant_guilds_*`, members `#1…#m` in dossier order, the COUNT's placed count at least m — over binding every guild into whichever guild COUNT record is present, because a carriers' or cartographers' guild is no craft guild's member unless the dossier's own category says so, and the dossier's category is the one fact that sorts them (V11 §3.12) |
| J-V8.84 | chose to project every `preview` reply a host receives (dropping `shape` and `actions[].at`) as well as every `query.result`, and to refuse `hit` and `inView` with `E_HOST_KIND` as `measure` is, over projecting query results only and leaving the view-bound kinds unanswered, because a preview reply carries a polygon that would cross door 1 (J86), and a named refusal is the only answer a host can act on |
| J-V8.85 | chose that a population of 0 at an absorb of a BASE-product document reaches V07's desertion through V07 §2.1's fold (0 lies below the band's lower edge), over holding a town whose record reports no inhabitants, because SettlementForge's end of a settlement (§7.7 row F20) is an outcome the map must show, and the fold is the one path from a town to the village product |
| J-V8.86 | chose one host → PLAT push, `host.state` (the party key, the backups' heads, the pictures' time, the players'-view switch), kept in the session's memory, over `view.set` — which writes view state and would re-create a knowledge-key mechanism beside the filter — and over routing the frame's toggle through `host.action` and back, because the frame's controls need facts only the host's record holds, the host computes nothing it stores, and a view filter needs no round trip |
| J-V8.87 | chose "See what the players see" as a display filter — the frame's `ViewOpts.viewAs` set to the party key in item 464's key form — over setting the view's knowledge key, because V09 decided a lowered view is a filter (J-V9.46), so the document formats, `doc.snapshot`, compaction and saves stay the role's, and one capability must have one mechanism |
| J-V8.88 | chose to carry every page-side header action as one enumerated PLAT → host push, `host.action`, with the host running V08 §4.2's row through its existing calls, over giving the frame calls into the host's store or settings or drawing the controls on SettlementForge's side, because the frame holds no account or store access (§11.3), SettlementForge draws three things only (J-V8.35), and one enumerated push is testable (T-V8-47); "Update the map engine" stays in the frame because its event is the document's, and "Assistant settings" opens SettlementForge's own settings because the host holds its AI setup (J121) — amended by J-V8.94 (the load-mismatch keep is no header control) |
| J-V8.89 | chose one banner for the players' view — this volume's strip "Showing what the players see" in `HostSlots.banner`, V09 §4.8's View-as banner not drawn while the host's party key is set — over drawing both, because two lines saying the same thing crowd a narrow frame and the strip names the DM's own check; V09's half is V09 §4.8's "A host's players' view" (J-V9.85) |
| J-V8.90 | chose the embed's bridge handler as the one filler of `ClerkMount.host` and `HostSlots` (V08 §3.1 step 7), with `hostName` a deployment constant of the SettlementForge build and `historyFilter` left unset, over a bridge field for the host's name and a history filter for the co-DM, because V09 gives the harness and the shell one channel (J-V9.81), the host's name is fixed per deployment, and both frames that exist hold `secret` |
| J-V8.91 | chose to make the party picture set cross the bridge as one request and one reply — the client's `party.render { party, since? }` and the module's `party.rendered { set }` or `unchanged` — with the module resolving the party key, drawing the pictures under it as `knowledge` and listing the gazetteer under it as `admitAs`, over the client assembling the set from `exportPicture` and `query` calls, because only the module can resolve binding keys to the addresses a key form holds (item 572's places are ids), only the facade lowers a query (`admitAs`; the bridge's `query { q }` carries none), the set is one value the store takes whole (T-V8-2 requires it to arrive in a message), and the client already holds every trigger; the `drawDigest` test keeps an edit that changes nothing drawn from costing a store write |
| J-V8.92 | chose key forms with empty places — `{ tier: 'public', places: [] }`, `{ tier: 'local', places: [] }` — for the host's own public and local pictures over a bare tier, because item 572 reads a bare tier with the requester key's places, and a DM's session key may carry places a gallery picture must never admit; a key form is a key in its own right |
| J-V8.93 | chose to fill `HostSlots.historyLines` from the differences of successive `host.state` values in the handler's memory — reveals, hides and a tier change, and one replaced "pictures last drawn" line — over a stored reveal history or new `host.state` fields, because the record keeps only `party.prev` (J-V8.58), a line is no log event and the handler already holds the values; and `newDocuments: 'download'`, over `'off'`, because the owner's "everything editable" keeps a past state reachable, `.plat` is already the user's format in host mode (V08 §5.4 (2)) and a copy is detached (V06 §4.4) |
| J-V8.94 | chose one control for the load-mismatch keep — V09 §3.14's choice at load — and no button in the tab's `upgrade-available` banner, over a header control for the keep and a banner button focusing a frame dialog, because one event has one control, and no host → PLAT message or `MapSession` call reaches a dialog inside the frame while SettlementForge draws no map control (J-V8.35) |
| J-V8.95 | chose to derive, at the port, a land use that a record's hard `near` row requires and no listed deposit opens — a `DepositSite` under `res:derived:<landuse>`, one per land use, kept `depleted` when no record needs it, never removed, and left standing beside a deposit listed later — over letting the class take the base's closest option (a salt works with no pans) or asking the DM, because the dossier's record is a fact the map must honour and every gap is derived by our rules (item 20 (h)); a custom record opens none, since its class is decided at fold after the port's events are written (V08 §3.5 (5) (f)), and the DM may paint the land use |
| J-V8.96 | chose to name, in V08 §5.1's host-mode differences, Settings without its Storage section beside the four file operations, over listing the file operations alone, because the list says "exactly these points" and T-V9-28's allowlist reads it, and `fileMenu: false` has both effects (no local store in host mode, V09 §3.8 (6)); and to cite V09 §3.9's new-document rule and V09 §4.10's drawing of the host's lines instead of restating them, because a copy with a shorter action list drifts from its source |
| J-V8.97 | chose to count V10's scratch line in the one frame whose built-in clerk holds an authoring turn or a waiting proposal, under configurations A and B, with page bars of 161, 231 and 421 MB derived from V08 §3.4's page rule (the refresh frame never runs beside a visible CITY or METROPOLIS), over a 266 MB CITY figure and "configuration B only", because a visible CITY beside a refresh cannot occur under V08 §3.4, and host mode's `builtin` without a transport is configuration A (V10 §3.17's selection), whose clerk opens the same scratch in the frame; configuration C and the refresh frame open none |
| J-V8.98 | chose to keep the port's notes by class — `event` notes in the ledger event of the run that wrote them, `standing` notes in it only when new (with the identities a run clears) and as a list in `DossierBinding.notes`, `report` notes never in the document — over storing every run's whole note list in each ledger event or keeping notes only in the transient `dossier.result`, because the history panel of every editing frame and of every later load must draw an absorb's notes from the log (only the port leader's frame sees the result), while a lived dossier's standing notes would otherwise repeat in every weekly event and grow the log |
| J-V8.99 | chose to give every note, held reason and host line a catalogue key with args — `PortNote.msg` as item 463's `MsgRef`, `MapRecord.held.reason`, `module.status.detail` as a key — and to write their words once, in V08 §3.9, V08 §4.6 and V08 §5.1, with a raised way's history lines left to V06's chronicle and V10's `info.raised.*` rows, over quoting sentences in the text for a panel to compose, because V09 §4.9 renders only catalogue rows, T-V9-15 fails on a code without one, and three wordings of one line is the drift a single source prevents |
| J-V8.100 | chose to name the note kinds `name_unjoined`, `name_ambiguous`, `custom_unkeyed`, `count_over_range` and `not_placed`, and to route every row set's "else …, noted" to `unmapped_word`, over unkinded notes, because a note without a kind has no row, no class and no test |
| J-V8.101 | chose to make `custom_resolved` and `low_confidence` `event` notes written only for the custom records a run adds or revises, over standing notes re-written at every absorb, because the live resolution changes with the DM's declarations between absorbs and is the why card's (V10's `WhyAnswer.profile`, V09 §2.7's `chips`); a stored standing copy would go stale |
| J-V8.102 | chose to keep `ignored_key` and `realm_block_used` — and `frozen_fact_changed` and `history_gap` — in the host's report only, over drawing them in the history panel, because they recur at offers or report a fact read once, and name nothing that changed on the map |
| J-V8.103 | chose to hide a custom chain whole — its line, arrowheads, legend row, gazetteer row and every export feature — when the key withholds any joined node, over listing it as a `withheld: true` row or drawing it with the withheld node's end cut off, because a chain is a relation whose drawn route shows where each node stands and what it makes (the purpose §11.2 withholds), a withheld row would still let V09 §5.4 offer the view, and V09's T-V9-68 expects the entry absent |
| J-V8.104 | chose to carry the standing notes to the report panel on `GenerationReport.dossierNotes` — a copy of `DossierBinding.notes` made by every derivation's report build (item 390) — over a new `query` kind, because the panel already reads `report(h)`, the report is a derived cache every frame rebuilds (so a second editor's frame and a reload show the list without a read of their own), and the notes change only with the log |
| J-V8.105 | chose to admit a chain's nodes as a band-less reader does — each by §9.2's admission function as at the city band — for the drawing as well as for the gazetteer and the exports, and to read the export's whole knowledge key, over admitting at the band drawn and by tier alone, because a chain spans the town and would appear and vanish with zoom if admitted at the band drawn, a place a key form lists is admitted by its places (§9.2's last column), and §11.1 takes the requester's key, of which the tier is one part |
| J-V8.106 | chose to make the party lines' `{places}` and `targets` under the key the shell passes to `HostSlots.historyLines.list` (its `effectiveKey()`), each place read by `query`'s `entity` form with `admitAs` that key (items 583, 572), a `withheld` place neither named nor targeted, a `null` one named by its key with no target and a line left with no admitted place not listed, over the frame's key, because V09 §4.8 has every panel read as the players would while "See what the players see" or View as is on, and a `host.hidden` line names places the party no longer knows; the handler keeps no key subscription (V09 §2.2), since `effectiveKey` and `onEffectiveKey` are `ClerkMount`'s members, never handed to it, and the shell re-lists on `onEffectiveKey`; its one `subscribe` on the document reads head moves for its answer cache only (J-V8.110) |
| J-V8.107 | chose `calibratable: false` on every cell of the dossier row sets V08 §2.6 writes (`cultures`, `crime`, `relations`, `calamitySeverity`, `threats`' population, `customWeights`, `readiness`, `climates`, `historyEvents` and `festivals` among them), a value changing only as a table fix reviewed with V11, over calibratable cells, because a row set maps SettlementForge's vocabulary — the port's derivation rules (item 20 (h)) — not a measured quantity: §13.9 (7) never re-signs them, V11 §3.1 carries rows 63–66 and 77 `calibratable: false` (J-V11.65; T-V11-37), and V12's R4 never calibrates them; the item-110 threshold of DR35, a map rule's constant, is V11's calibratable `elevated.landmarkMinSignificance` (J-V8.70) |
| J-V8.108 | chose a dossier row set `customWeights` for the custom definition's `economicWeight` and `criticality` words, read by V08 §3.11's custom kinds, over keeping the two mappings as numbers in V08 §3.11's prose, because a constant with no table is a hard-coded universal (item 23) that no loader holds and no totality test reaches, and the words are the host's vocabulary like `dependencySeverity`'s, so they take the same row-set home and the same non-calibratable flag |
| J-V8.109 | chose a per-key answer cache in the embed's bridge handler for the party lines — a `list` with an unread key returning only the lines that name no place, the reads started and `onChange` fired when they answer — over an asynchronous `list` or a second, synchronous read path into the document, because V09 §2.2's slot returns its lines at once, §11.2's `query` answers by promise and is the one admitted read, and holding back a line until its reads answer never names, even for one frame, a place the new key withholds |
| J-V8.110 | chose to read the head move that empties the party lines' answer cache from the handler's one `subscribe(h, …)` on the frame's document (§11.2's `doc.changed` `ApiEvent`), registered at each `doc.load` and released at `close` and `switchTo`, over a head-move callback added to V09 §2.2's slot or a fresh `subscribe` per `list` call, because `subscribe` is the facade's change feed that V10's staleness watch already reads for a moved `logHead` (V10 §3.11), V09 §2.2 forbids the provider only a key subscription, a slot callback would widen V09's interface for one reader, and with no head read a renamed or newly withheld place keeps its old answer |
| J-V8.111 | chose to bind a REPLACEMENT lesser that is a pin record — `parish_church` over `wayside_shrine` — to the pin V11 §3.12's row keeps (the churchyard `cross`, laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records` at an epoch or an absorb) and to alias it on the church building only at a base rung where no such cross is laid, the target chosen where the merge is first read — the creation, or the absorb or epoch that brings the pair, the church arriving beside the standing shrine or by promotion (V08 §3.5.1 (c), (d)) — and kept across a later rung change, over one alias rule for every REPLACEMENT lesser or a re-binding at each rung change, because V11 §3.12 and V07 §2.4 keep the shrine as a thing on the map at village rungs, a key with two targets is a contradiction a builder meets, and a binding that moved at every hand-off would emit `rebind` events no dossier change caused |
| J-V8.112 | chose to write every `unmapped_kind` note after the fold, its `class` the class that builds the record at the document's rung — at a village rung V07 §3.11's village class or the pin kind a cell names — over filling it at digest from DR24's generic class, because a note that names a class the map did not build tells the DM something false, the note is read by no model rule so the later write changes no event, and `custom_resolved` already follows this order (J-V8.101) |
| J-V8.113 | chose to re-bind a placed lesser as the greater's members only where the greater's thing is the lesser's — every COUNT, QUARTER, GUILD and SIZE step and the REPLACEMENT rows whose V11 §3.12 reading keeps it (`graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`, `mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, and `cathedral_10_000_only` over `parish_church`, whose church V06 §3.9.11 converts in place with its crypt) — and to place every other REPLACEMENT greater new, the lesser's key bound as at a first reading (an alias on the fish market's hall, the churchyard `cross` or the church, the enceinte the fortification path yields), over one re-key for every pair that arrives over time, because a roadside pin cannot become a parish church, V07 places an added fish market's hall on the market's rim so a re-keyed shop would give one key two things, and a key left on a palisade the new ring superseded binds the ring left to decay; QUARTER is named with COUNT, GUILD and SIZE because a quarter's members are the lesser's buildings |
| J-V8.114 | chose, for a promotion by receipt to a REPLACEMENT greater of a new thing — one record whose key the line keeps (F15) — to re-point the record's one binding row to the greater placed new and to lay a pin the row keeps (the churchyard `cross`, at a village rung) for the record with no binding row of its own, the lesser's former thing left standing unbound, over binding the key to the cross or to both the cross and the church, because one key binds one thing (J-V8.111) and a parish church record bound to a cross would send the church's later state — a ruin, a closure, a **Show** — to the cross; where two keys meet (the church added beside a kept shrine, or the shrine leaving the list as the church arrives) the shrine's key binds the cross as at a first reading (V08 §3.5.1 (d), T-V8-46) |
| J-V8.115 | chose V11's class `label` cell (item 516) for the words a note's `class` argument shows, and a pin kind's `host.pinKind.<kind>` row (V08 §4.6), over "the display label (§9.5)", because §9.5 holds the title and the legend but no class words, a pin kind has no class row, and V07's `market` fallback builds the reservation of V11's `market` class, whose label is the word to show (V08 §4.6, V08 §1b, T-V8-46) |
| J-V8.116 | chose, for a dossier `desert`, the arid climate row with a river, a lake and a coast at its chances, every water word forcing its water, and the oasis exactly when `oasis_water` is listed — the arid row's oasis chance a standalone draw only — over drawing an oasis at the arid chance on dossier maps too, because SettlementForge's deposit list is its statement of what lies near the settlement (item 20: the dossier's facts win), a desert on a river or coast must keep it (item 111 (a)), and DR1's "water deposits" input needed its one list, which the `site` row's water words now are at every terrain (V08 §2.6, V08 §3.16 (1)) |
| J-V8.117 | chose one edge table for the volume (V08 §3.17), each mechanism's extremes with their outcome, rung and test, and one table of the combinations where this volume's features meet the others' by feature, with one edge suite (T-V8-49), over edge clauses scattered through the sections, because the port places nothing itself — every combination holds the base's or the named volume's rule for the feature — and one table lets a verifier find every edge (principle (11)) |
| J-V8.118 | chose to read SettlementForge's hosting, save-limit, backup and language decisions as `MapHostConfig` inputs — `moduleOrigin`, `quotaBytes`, `backupDepth`, `locale` (J121) — with the client's trim order under the allowance (backups beyond the newest first, then the party set's building level) and never a refused commit, over fixing two backups, a per-map quota and English in the design, because J121 makes those decisions SettlementForge's, and a storage limit must never lose an edit (§5) |
| J-V8.119 | chose, for SettlementForge's export bundle (J122 V08 Q3), one host-client call `exportScenes` over the bridge's `export.request { fmt: 'dd2vtt' \| 'foundry', bundle: true }`, returning opaque `Blob`s the client never decodes and SettlementForge packages unread, over a new message or a structured return, because the base's export path already renders scenes at a key, one flag keeps the `E_HOST_FORMAT` rule otherwise absolute, and blobs keep door 1 closed (J86): the files are the user's export, never an input to SettlementForge's simulator |
| J-V8.120 | chose to read SettlementForge's history into `Recipe.history` at creation only — the founding, the events by the `historyEvents` row, `tierHistory`, `populationHistory`, the calamities before creation, the lifecycle, the ancient fall and the peak — with the effective peak's tier the one the STRONGEST present evidence shows (a `tierHistory` demotion, the `populationHistory` maximum, calamity losses, a ruined or remnant higher-tier record, a resettlement), every present kind listed for the clerk and `history_gap` noted, over the highest tier any evidence shows, because item 113 (f) orders the evidence strongest first and the least-reliable kind must never outrank a stronger one; later history reaches the map through the live rows, never a second replay (V08 §3.15) |
| J-V8.121 | chose to fold the dossier's defence readiness into NEED as max(threat, readiness weight), with DR2's creation defence reading the threat alone, over averaging the two or letting readiness lower a threat, because a well-kept fortress keeps its walls in use in a safe heartland while a weak readiness never makes a frontier safe, and the creation's walls and gates must not change with a maintenance word (item 114 (a), (d); V08 §3.16 (2)) |
| J-V8.122 | chose "specified" (item 115 (c)) to mean a dossier-bound record of a class the ceiling table's `grandClasses` lists (V11 §3.25.4) — every placed member of such a collective record included — or a dossier government's forced manor (its `villageSeat` the manor house, seigneurial or crown; V11 §3.21.1), and nothing else (no wealth word, quarter name, title or keyword alone), over reading grandeur from the dossier's wealth or words, because item 115 (a) says prosperity in small places shows as quality, not grandeur, and only a record names a building (V08 §3.16 (3)) |
| J-V8.123 | chose to follow SettlementForge's calendar by the client's `view.set { week }` under the view's follow flag and to set the biome's climate row at creation from the realm's climate word, else the terrain, frozen after creation, over a model input for the week or a climate re-read at every absorb, because a season is a look that must never change the model or its hash (item 117 (a)) while the biome is a model input fixed with the site (V08 §3.16 (4)) |
| J-V8.124 | chose to read `traditions` at the pinned baseline into carried `tradition` facts — the window reduced to weeks of the `sf445` year, the staging prose reduced to V11's staging keyword keys inside the adapter, the kind by the `festivals` row — and to make every tradition change a ledger-only change, over a model record or an epoch event, because a festival is a look only (item 118 (a)), the owner's rule makes `traditions` an input, on no `ignored` row, and no dossier prose may enter the document (V08 §3.16 (5)) |
| J-V8.125 | chose to carry the site and the history as frozen facts whose later change writes one `frozen_fact_changed` report note and no map event, and to carry the settlement's wealth word as a `prosperity` change riding the next epoch's `EpochInputs.wealthLevel`, over skipping those changes silently, because the site and the history are creation's (§7.7 item 10) yet a DM must see that SettlementForge changed them, and a campaign's prosperity must reach DR6 and item 114's means (V08 §3.5) |
| J-V8.126 | chose the adapter's field table (V08 §2.4) as the one list of every SettlementForge path the port reads, the digest field it fills and the row it feeds, or `ignored` with §7.7 item 1's reason — one `ignored` row per reason, a source SettlementForge keeps outside the dossier written with no dossier path — with `defenseProfile.readiness` the one part of `defenseProfile` read (item 114), `traditions` read (item 118) and `powerStructure.previousGovernments[]` read only at each entry's `tick` (J-A73.06), over paths implied across the sections, because a closed digest needs one list that the manifest's `keyList`, §14's lint and T-V8-20 read |
| J-V8.127 | chose to list each dossier institution record whose key binds an element as one Find entry under its own words (`kindLabel`), selecting exactly the addresses its binding rows hold, first among the named institutions and apart from its class's entry, its chip holding the binding key with an anchor address so that it follows a re-key and goes dark at 0 when the record leaves the map, and to let SettlementForge's assistant answer in words without setting chips, over listing the dossier's names as synonyms of their classes, selecting a record by its words, or a host message that drives the frame's Find, because the owner's Find "references what's in the dossier" (item 120 (b)), a record's members are the dossier's statement while its class also holds the map's own buildings, words change with a rename while an address does not (§6.3), and Find is the viewer's view, never the host's (item 120 (a)) |

## 10 Base change requests

This volume's requests to the base are applied by file f; each is now the base's text, which this volume cites.

| request | subject | applied by | base home |
|---|---|---|---|
| BCR-V8-1 | the bridge's vocabulary for the port | item 472 | §11.3 |
| BCR-V8-2 | a host-minted document id and the creation prefix at `generate` | item 459 | §11.2, §2.9, §6.3 |
| BCR-V8-3 | the host client package and the embed entry | item 507 | §14 |
| BCR-V8-4 | the adapter manifest, the registry and the port's new results | item 508 | §14 |
| BCR-V8-5 | the digest's additions | item 509 | §14 |
| BCR-V8-6 | the two host-only event kinds | item 358 | §7.1, §7.4 |
| BCR-V8-7 | per-settlement values on the circumstance slice | item 389 | §7.7, §10.2 |
| BCR-V8-8 | the binding's additions | item 390 | §7.7, §5.4 |
| BCR-V8-9 | the village product's port path (withdrawn for the one registration) | item 202 | §1.1, §4.12, PART III |
| BCR-V8-10 | the row sets written out | item 510 | §14 |
| BCR-V8-11 | the latitude row (item 102) | item 391 | §7.7, §14, §8.4 |
| BCR-V8-12 | coverage inside a collective range (item 103 (f)) | item 392 | §7.7 |
| BCR-V8-13 | custom content's inputs (item 104) | item 511 | §14, §7.7 |
| BCR-V8-14 | custom chains and services as staged records, and their keys | item 256 | §2.7, §7.7 |
| BCR-V8-15 | drawing rows and export attributes for the records | item 410 | §8.2, §8.3, §11.1, §11.2 |
| BCR-V8-16 | the stage's budgets | item 480 | §12.6 |
| BCR-V8-17 | the stage's bars in the suites | item 486 | §13.2, §13.8 |
| BCR-V8-18 | the stage in the build plan | item 529 | §16 |
| BCR-V8-19 | the port's reserved session | item 359 | §7.1 |
| BCR-V8-20 | the change and receipt vocabularies for the port's own kinds | item 393 | §7.7 |
| BCR-V8-21 | a custom assignment's revision | item 394 | §7.7 |
| BCR-V8-22 | the creation prefix's staged records read ahead | item 395 | §7.7 |
| BCR-V8-23 | one spelling of the line id | item 512 | §14 |
| BCR-V8-24 | the realm block computed by the host glue | item 396 | §7.7, §14 |
| BCR-V8-25 | the institution's own political role in DR12 | item 397 | §7.7 |
| BCR-V8-26 | the power relation's sign and visibility | item 257 | §2.7 |
| BCR-V8-27 | the player's row of the audience table | item 513 | §14 |
| BCR-V8-28 | an aqueduct's link to its conduit house | item 244 (the raised-way record, consolidated) | §2.7 |
| BCR-V8-29 | the custom kinds derived at read time | item 425 | §10.2 |
| BCR-V8-30 | the port's derivation rows (DR28–DR35) | item 398 | §7.7 |
| BCR-V8-31 | generated content no dossier record binds | item 260 | §2.8, §7.7 |
| BCR-V8-32 | a toll bridge on a dry site | item 399 | §7.7 |

The other volumes' requests this volume's text relies on are cited at their items where read: BCR-V6-9 (item 343),
BCR-V6-12 (item 388), BCR-V6-27 (item 573), BCR-V7-11 and BCR-V7-26 (items 202, 322), BCR-V9-8 (item 516), BCR-V9-12
(item 463), BCR-V9-14 (item 453), BCR-V9-23 (item 464), BCR-V9-36 (item 583), BCR-V10-7 (item 473), BCR-V10-14 (item
519), BCR-V10-22 (item 572), BCR-V11-26 (item 425), and §16's totals (item 568). The base parts of file g's items 111,
113–118 and 120 that this volume reads are the base's (§4.2 S0, §4.7 S10b, §4.11, §7.7's DR36–DR43, §8.2, §2.9's view
state, §11.2's gazetteer), cited by item.

## 11 Owner questions

Every question is answered (`docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`); each decision is carried into its section.

| question | decision | carried into |
|---|---|---|
| Q1 — where the map module lives on the web (the origin serving `embed.html`) | follows SettlementForge (J121): its hosting decision, read as `MapHostConfig.moduleOrigin` | V08 §2.2, V08 §3.1, V08 §3.7 (the draft mirror), V08 §8.4 risk 1 |
| Q2 — which plans get the Map tab, editing and exports; whether a map record counts against a save limit; how many backups a record keeps | follows SettlementForge (J121): its plans, save limits and backups, read as `MapHostConfig.backupDepth` and `quotaBytes`; which accounts see the tab is SettlementForge's | V08 §2.1, V08 §2.2, V08 §3.7, V08 §3.9 B21, V08 §6, V08 §8.4 risk 5 |
| Q3 — scene files inside SettlementForge's export bundle | yes, from M-SF, as opaque blobs SettlementForge packages unread; until then maps export on their own (J122) | V08 §2.2 `exportScenes`, V08 §5.4 (2), T-V8-48, J-V8.119 |
| Q4 — M-SF after M-CAL | yes (J122); SF0–SF3 may start earlier | V08 §8.1, J-V8.39 |
| Q5 — a live party map | pictures and player views now; a live shared map after M-SF, as its own item (J122) | V08 §1, V08 §3.14 (6), J-V8.57, J-V8.58 |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading and execution.** SettlementForge's facts this volume builds on — the dossier's top-level keys (41
at birth, 42 with custom content, 41 to 47 lived), its sizes (45–261 KB minified), the settlement id's form, the
institution record shape and the absence of institution ids, the anchor precedence, the custom institution's fields,
`customContentProvenance`, `economicState.customChains` with its activation verdict and endpoints,
`config.nearbyResourceDefinitions`, the custom service's provider name under `availableServices`, the realm map's frame on
its own origin with origin and source checks, the dossier persisted as a row's data, and the line's custom-content
manifest's field lists — from the surveys (`research/sf/*.md` and their verification `mapping-verify.md`) and the
`town-cc-1` output generated on the pinned line `fp/integration-2026-09-23` at `5d699cc68`, read-only; executed on the
line's 35 births and 12 after-tick dossiers: the line's relation types (six), trends, history event types (eight),
condition statuses (three) and stressor types (fifteen); `magicLevel` `medium` on 32 of the 35 births; the six material
words; the fourteen qualifier words (twelve seen again); the ladder file at `5d699cc68` and its agreement with V11 §3.12;
the burial census (one burial record per tier, the metropolis's `Cemetery network`); the relation pair order not a
direction (`city-1`); the lit `city-1` storm's deaths; the water records per tier (7 of 7 CITY and METROPOLIS births carry
the city record); the eleven toll bridges (nine on dry sites, six at base-rung TOWN); `traditions` present on the lit year's
dossiers; SettlementForge's player view built player-safe by construction; SettlementForge's history fields, lifecycle,
`peakTier` and its documented gap, and its calendar and seasons as item 113 and item 117 record them (read-only, never its
map code). Every base and volume citation of this volume was read against the set with files f and g applied (items 111
and 113–118 included), and every cited volume section at its rewritten text where one exists.

**PLAUSIBLE until measured** (each with the bar or milestone that settles it): every budget of V08 §6 (SF0 and SF7; T-V8-30,
T-V8-41, with each row's fallback); the refresh queue's campaign time (T-V8-12); the storage figures beyond §2.9's own
budget (T-V8-30); the estimates of V08 §8; that SettlementForge's hosting admits a frame on a second origin with workers
(SF0's first measurement, with risk 1's fallback); that its store can compare-and-set on `logHead` (risk 2's fallback); the
dossier row sets' own values — the `cultures` latitudes, the `crime` weights, the relation strengths, the custom weight
mappings, the readiness weights and bands, the climate synonyms, the history and festival words (V08 §2.6; not
calibratable, table fixes reviewed with V11, SF0's census for the words, risk 8's fallback); that SettlementForge's scene
tokens appear on custom records when the author sets them, and that it lists only active custom chains in `customChains`
(the retire-and-re-put rule of V08 §3.13 (10) holds either way); the reading of a condition's `expiresAtTicks` as its whole
length (T-V8-18, with its fallback); the kind-family resolution's gain over exact names (T-V8-34); the chain-status weights
(V11's `siting.web.chainStatus`, calibratable; J-V8.49); the ladder rows' values (V11's `dossier.ladders`, table fixes); the
item-110 mechanisms of V08 §2.6b — the need-met rule, the terminal binding, the cap step, the fate link, the significance
threshold and the dry-site watercourse — each with the bar that would refute it (T-V8-36 – T-V8-40); that the `drawDigest`
test answers most debounced edit bursts `unchanged` (a lock, a pin, a hidden note; T-V8-41 counts it, the render budget
holding either way); that a lived dossier's standing notes stay at a few dozen once V11's `kinds` rows are total (T-V8-14
counts them on the pairs; more than 64 keeps the design, reported); that §11.2's `doc.changed` event fires for an applied
tail as for a local commit (T-V8-47's head-move clause); that V06's `EpochReport.raised.suppressedFired` is filled at every
epoch whose reason fires at a closed slot (T-V6-58, T-V8-45); the effective peak's tier read from the strongest evidence
(T-V8-51, on the "city to village" fixtures); the need fold max(threat, readiness) (T-V8-52); and that the historical
readings the item-113–118 parts rest on — a settlement's past legible in its fabric, walls kept by a well-defended place,
seasons following the calendar, festivals at their weeks — show as the owner described (the game-master trial of item 112
and V12's bars).

## 13 Fix list

No item is open. Each former item is closed at its home: the line's condition registry and the `raider`
key — the `threats` row's defined outcome for an unseen word, release row R9's census and a table fix (V08 §2.6, J-V8.50);
SettlementForge's assistant — its loop is SettlementForge's (J121) and the relay holds wherever it runs (V08 §4.4 (1), risk
6); the condition weeks' reading — T-V8-18 with its pre-decided fallback (V08 §3.11); the kind-family gain — T-V8-34, no
fuzzy matching whatever it shows (J-V8.82); the party set's budgets — T-V8-30 and T-V8-41 with V08 §6's fallbacks. Every
former hand-off to another unit is met in its owner's text: V11's ladder fixes, burial rows, `implies` and `deckOk` cells
and culture modifier rows (V11 §3.11, V11 §3.12, V11 §3.20.3, V11 §3.24; release row R2 checks the ladder file), V06's
`CalamityRef.deaths` (item 573), V07's toll-bridge reading (V07 §3.1 (1)), the slot mechanism and the raised way's
`waterUse` with its report notes (items 260, 244; J-VI.14, J-VI.15), V04's readers of the ruin evidence (V04 §3.5.0a), V09's
`HostSlots`, `ClerkMount.host`, `host.*` rows and host lines (V09 §2.2, V09 §2.10, V09 §4.9, V09 §4.10), V10's `info.raised.*` rows and
V06's chronicle entries. The hand-offs routed to this volume are met in the text above: V02's material attribution (V08
§3.13 step 2), V06's epoch inputs (V08 §3.6 (3)), V06's raised-way report and history lines (V08 §4.6 item 3), V09's bridge
handler, players'-view filter, history lines, frozen-view notice, chain gazetteer and answer cache (V08 §3.1 step 7, V08 §3.14
(5), V08 §5.2), V10's clerk origins and "kept removed" line (V08 §3.1 step 2, V08 §4.6), V11's ladder, goods, manifest, shape and
keyword cells (V08 §2.4, V08 §2.6, V08 §3.5.1), and V12's fixture levels (V08 §7.3).

## Integration notes

The volumes-integration decisions this volume carries (`docs/volumes/_integrate.md`) are folded into the body at their
homes: **J-VI.13** — the port's derivation rows are DR28–DR35 by number everywhere (DR28 one row with V06's), the working
names retired (V08 §2.6a, V08 §2.6b, V08 §3.5, V08 §3.6); **J-VI.14** and **J-VI.15** — a removed generated raised way's slot is
the one suppression mechanism (item 260), and `waterUse` joins the raised-way record, the report notes
`aqueduct_no_source` and `toll_bridge_dry` joining §5.4's vocabulary (V08 §2.6b (1) (b), (e), (3), V08 §4.3); **J-VI.9** — a
dossier-bound `conduit_house` is the aqueduct's terminal where an aqueduct is generated, and no conduit house is created
that the dossier or roster does not hold (V08 §2.6b (1) (c)); **J-VI.20** — `PortRows.customKinds` carries no fallback
class: a carried custom institution's class is item 104 (a)'s resolution at fold (V11 §3.13), the read-time overlay stays
(item 425; V08 §3.5 step 5 (f), V08 §3.11).
=== END ===

