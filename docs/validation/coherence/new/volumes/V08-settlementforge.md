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

## 1 Scope, the base hooks consumed, and what is out of scope

**In scope — the base's staged SettlementForge row (*Staged by the owner's roadmap*, "SettlementForge inputs") brought
to build depth.** Everything the staged part needs so that a live SettlementForge drives a map end to end:

1. **The embed** — the Map tab's lazy chunk on SettlementForge's side (a mount and our host client), the module's frame
   on the origin SettlementForge gives it, its boot, its workers, first map from a stored thumbnail, and one frame
   reused across a campaign's settlements (V08 §3.1).
2. **The dossier's journey** — how a whole dossier crosses the bridge (`dossier.offer`), who runs `creation` and
   `absorb` and who commits (the port leader: only an editing role holds the dossier or the document), coalescing, and
   the background refresh after an advance (V08 §3.2–§3.4); **the players' view** — the stored party picture set and
   party gazetteer and the party's knowledge on the map record (V08 §3.14).
3. **The binding table in practice** — every binding row's life, the carried facts per element kind, the diff that turns
   two dossiers into `DossierChange`s, collective members, quarantined records and the absorbed-state history (V08 §2.3,
   §3.5–§3.6).
4. **Persistence inside the host** — the map record beside the dossier, snapshot plus event tail, compaction, backups,
   thumbnails and the fingerprints the host compares (V08 §2.1, §3.7).
5. **Versions and migrations on both sides** — our schema, output, table and adapter versions against SettlementForge's
   `schemaVersion`, `generatorVersion`, `simulationVersion` and product lines (V08 §3.8).
6. **Failure and recovery** — every failure's detection, rung and words (V08 §3.9), and every mechanism's edges
   (V08 §3.15).
7. **The village-tier hand-off** — the port's consultation of the village product's one registration (`ProductDecl`,
   item 202) and one document across the 1 500 boundary (V08 §3.10).
8. **The staged records and values filled** (item 88) — `ConditionOverlay`, `DepositSite`, `PowerRelation`,
   `HistoryHint`, the dossier-backed `Person`, and the per-settlement values the staged rows read; the calamities carried
   into the epochs; the realm block (item 77); the audience table and display names in use (item 85) (V08 §3.6, §3.11).
9. **The host clerk** — SettlementForge's assistant as a client of the tool API (configuration C, which follows
   SettlementForge, J121/J122) and the host side of V10's configurations A and B — `setClerk` with the transport and its
   renewal, the proposal channel and the projection (V08 §2.2, §4.4, §5.4 (3)).
10. **Campaign scale** — storage, memory, the refresh queue and its budgets (V08 §3.4, §6).
11. **Testing and release** — the host harness, the fixture pairs through the bridge, the bars and the release
    checklist (V08 §7, §8.3).
12. **File g's items 102–104 on this subject** — item 102's latitude (DR29); item 103's tags as default siting
    profiles, the institution's political role (DR12) and coverage inside a count range; item 104's custom content, host
    side — the custom record, its keyword keys, the active custom chains, custom resources and services, and the
    author's library fields as optional inputs (V08 §2.5, §2.6, §2.8, §3.5, §3.13). The resolution rows and the
    chain-placement rules are V11's; the solver that reads them is §4.7 S10b.
13. **The port side of items 105–110** — SettlementForge's supply chains (DR33), the sea threats DR2's waterfront reads
    (item 106 (d)), the institution ladders (item 108), item 109's dossier sources and the burial and crypt trace
    (DR30–DR32), and item 110's dossier inputs (DR34, DR35, the dry-site toll bridge) with the rule that nothing item 110
    generates is dossier-bound (V08 §2.6, §2.6a, §2.6b, §3.5.1, §4.1, §4.3).
14. **Item 111, the port side** — a dossier's desert with or without `oasis_water`, and deserts with rivers, lakes or
    coasts (V08 §2.6's `site` row, §2.6b (3)).
15. **Item 113, the port side** — reading SettlementForge's history (its age, founding, events, `tierHistory`,
    `populationHistory`, `calamityHistory`, lifecycle, ancient ruins and `peakTier` with its gap) into the replay's
    inputs, and the effective peak's evidence (V08 §2.6c).

**Base hooks consumed (cited, never restated).** §7.7 (layer 2's typed slices; the dossier contract items 1–16; the
derivation table DR1–DR40; the key law; the receipt rows F1–F22 and the port's F-V8 rows; the status rows); §11.2
(`PlatApi`, the clerk's tool API, *Knowledge*); §11.3 (transport, envelope, vocabulary with the port's messages,
convergence, handshake, roles, bridged load verification, logging); §11.4 (the doors; door 1 closed, J86); §14
(`@plat/port`, `@plat/bridge-client`, the audience table, the dossier row sets, the adapter key-list lint, the
dependency rules); §2.7 and §2.9 (the staged records, `HistoryRecord`, `Document`, the dossier block, load steps 1–5,
size budget, canonical form, view state); §10.2 (`PortRows`); §4.11 (the clock, the cadence, the rung at an epoch,
*Dossier content across epochs*, *History-first generation*); §6.1–§6.4 (streams, digests, addresses, version axes,
retention); §7.1, §7.4, §7.5 (events, lifecycles, migration); §5.2–§5.4 (F-EDIT, F-SITING, the report); §8.2 (the
drawing rows); §9.2 (the one knowledge admission, E-17) and §9.5 (the title word); §12.5–§12.8 (first map, edits,
replay, memory); §13.2 and §13.8 (the suites and CI tiers); §16 (the milestone rows); PART III (the village page);
§17.1 (3) (paths); and file g's base mechanisms of items 102–113, cited by item.

**Out of scope, with where each lives.** SettlementForge's own code — its tab, its storage tables, its server — is
SettlementForge's; this volume states the contract it implements (the host client's API and the map record) and ships
the client. Door 1 — any geometry for SettlementForge's simulator — stays closed (J86; §11.4; V08 §5.4). Hosting and
origin, plans and save limits, backups, the preview host, the product's public name, the licence for users' maps,
interface languages, the AI key or relay, the assistant and its model tier follow SettlementForge's own product
decisions, read as inputs (J121; V08 §2.2's `MapHostConfig`). The village product's generation is V07's; this volume
designs the port side of its hand-off. The built-in clerk is V10's; this volume wires SettlementForge's own clerk and the
host side of V10's configurations. Every class's and catalogue kind's siting profile and the per-kind rows of
`tables/dossier/kinds` are V11's; this volume owns the vocabulary boundary and the lookup chain. The seam with
SettlementForge is the dossier: its own map program is not reconciled with this one, and a plan artifact of
SettlementForge's is never a required input (J-Fsf-1). What the map builds from the facts carried here is its readers':
the ruin, cavern and catacomb systems and lost access (V04); the crypts (V03, with V02's basements); the calamity-to-
hazard table, every epoch behaviour and the history replay (V06); the chain-status weights, waterfront threat weights,
ladder step table, event-to-epoch rows, burial thresholds and the goods, era and material rows (V11). A live, explorable
map for players is not built in this stage (J122: pictures and player views now; a live shared map after M-SF;
V08 §3.14 (6)). SettlementForge's world-state works ledger is not read, and a raised way is never derived from it
(J-V8.72). Item 110's terraces, retaining walls, raised ways, stepped massing and deck plots are the base's and V01,
V02, V03, V04, V06 and V11's; this volume carries only their dossier inputs (V08 §2.6b).

## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into, grouped by subject. Base
records are cited. Where each dossier field comes from and which derivation row it feeds is the adapter's field table
(V08 §2.4), the one list (§7.7 item 1's closed-digest rule); no fact is read from outside the digest (T-V8-20).

| # | piece (V08 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|---|
| | **The embed, the client and the bridge** | | | |
| W1 | embed entry `embed.html` of `@plat/app` (3.1) | the host's frame `src` (the module origin and the locale, W4); the module's static host | boots `@plat/api`'s workers; sends `ready`, `module.status` | §11.2 worker boundary, §11.3 transport; item 507 |
| W2 | `@plat/bridge-client` (2.2, 3.1) | SettlementForge's lazy Map-tab chunk | the frame's `WindowPostMessageTransport`; the host's map-record store | §11.3; §14; item 507 |
| W3 | host mode of `embed.html` — chrome, locked dossier values, the header's actions, the players'-view strip (5.1; `HostSlots` by 3.1 step 7 (b)) | `@plat/app` | the DM's and co-DM's frames | §14 `@plat/app`; item 507 |
| W4 | `MapHostConfig`'s SettlementForge inputs — module origin, locale, backup depth, storage quota (2.2) | SettlementForge's own product decisions (J121) | the frame's `src` and CSP (3.1), the catalogue locale (5.5), `replaceSnapshot`'s backup count (3.7), the quota check (3.7, 6) | §11.3; J121 |
| W5 | `dossier.offer` / `dossier.result` (2.2) | the client (offer); the port leader (result) | `DossierPort.digest`, `creation`, `absorb` (3.3); the host's append and fan-out | §11.3 vocabulary, §11.4 doors 1–2; item 472 |
| W6 | `module.status` with `detail` as a catalogue key (2.2, 3.3, 3.9) | the embed's glue at each phase; B10's rebuild and B20's mismatch | the tab's banner and its fallback (5.1) | §11.3; item 472 |
| W7 | `doc.snapshot` / `doc.snapshot.ready` (2.2) | the client at creation, compaction, upgrade and rebase | `MapStore.create`, `MapStore.replaceSnapshot` | §11.3; item 472 |
| W8 | `encoded`, `seqAfter`, `logHeadAfter` on `doc.changed` and `dossier.result`; the snapshot metadata on `created` (2.2) | the module (canonical CBOR, §11.3's `logHead`) | `MapStore.commitEvents`, `MapStore.create`: the host stores them and computes no head | §11.3; item 472 |
| W9 | `doc.load.audience` (2.2) | the client, from the audience word | the module's role and key, the lower of the two (J-V8.29) | §11.3 *Roles*; §14 audience table; item 472 |
| W10 | export `displayNames` and lowered `knowledge?: Admission` (2.2; item 572's type, item 453's union) | the client's `exportPicture` (3.7's thumbnails, 3.11, 5.3) | §11.1's exporters, admitting what both the requester's key and it admit | §11.1 *Knowledge*, *Display names*; items 472, 453 |
| W11 | `exportBundle` — the scene files for SettlementForge's export bundle as opaque blobs (2.2, 5.4 (2)) | the client's `MapSession.exportBundle`, from M-SF (J122) | SettlementForge's bundle packaging, which never reads them; door 1 stays closed (J86) | §11.1 scene formats and key rules; §11.4; T-V8-48 |
| W12 | host-minted `docId` (2.1) | the host at first creation (`MapRecord.mapId`) | `generate`'s document id, so every client's creation is identical (3.3) | §2.9 `docId`, §11.2 `generate`; item 459 |
| W13 | the embed's bridge handler — the bridge to the shell (3.1 step 7) | the host's `clerk.config`, `preview { proposal }` and `host.state`; the harness's `ClerkMount.host` calls; the header's controls; the shell's selection (`entity.selected`); the document's `doc.changed` `ApiEvent`s through its one `subscribe` (§11.2) | `ClerkMount.host` (V09 §2.10); `HostSlots` — `header`, `banner`, `lockedControls`, `exportFormats`, `fileMenu`, `clerkMode`, `hostName`, `historyLines`, `newDocuments` (V09 §2.2); the frame's `ViewOpts.viewAs`; the posted `clerk.needsToken`, `clerk.config.refused`, `clerk.proposal` and `host.action` | §11.2 `subscribe`, §11.3; items 472, 473, 507 |
| W14 | `host.action` and `MapSession.on('action')` (2.2, 4.2) | the frame's header controls, an owner's or editor's frame only | the host page, which runs the 4.2 row's operation with `offer`, `setParty`, `MapStore.replaceSnapshot`, `MapStore.create` or its own assistant settings and `setClerk` | §11.3; item 472; T-V8-47 |
| W15 | `host.state` (2.2) | the client, after each `doc.load` and each change of `MapRecord.party`, `backups` or `partyPictures.at`; `MapSession.seePlayersView` | the header's controls, the restore dialog's list of lost edits, `HostSlots.historyLines` (4.6), the players' view — `ViewOpts.viewAs` (item 464; 3.14 (5)) | §11.3; item 472 |
| W16 | `HostSlots.historyLines` (3.1 step 7 (b)) | the handler, from successive `host.state` values, named and targeted per key by `query`'s `entity` reads (`admitAs` the listed key; items 583, 572) through its per-key cache, dropped at each head move (J-V8.109, J-V8.110) | V09 §4.10's group "The party" (4.6), listed with `effectiveKey` | V09 §2.2 |
| W17 | `HostSlots.newDocuments: 'download'` (3.1 step 7 (b)) | the handler, a constant of host mode | V09 §3.9's host-mode rule for every action that makes a new document; a copy of a dossier-bound document is detached (V06 §4.4) | V09 §2.2 |
| W18 | the status banner and `statusText` (5.1) | `module.status` from the embed's glue | SettlementForge's tab container; the host's translation | item 472 |
| W19 | the catalogue families `host.note.*`, `host.held.*`, `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*`, `host.pinKind.*`, `host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView`, `host.mirror.dropped` and `host.verify.mismatch` (3.7, 3.9, 4.2, 4.6, 5.1) | this volume's words | `messages/en.json` (V09 §2.9, §4.9) and the client's `statusText` defaults; T-V8-14's walker and T-V9-15 | V09 §2.9's catalogue; item 516 |
| | **The store and the map record** | | | |
| W20 | `MapRecord` (2.1) | the host, from what the messages carry (3.7) | `doc.load` + `doc.apply` at open (3.1); the refresh queue (3.4); the offer decision (3.2) | §2.9 (the document it stores); §11.3 "the host is the store" |
| W21 | `MapRecord.refreshing` lease and `backups[0].tailAfter` (2.1) | the refresh queue; `replaceSnapshot` | another device's queue; B10's second rung | — |
| W22 | the refusal's `reason` on `dossier.result.held` and `MapRecord.held` (2.1, 2.2, 3.9) | the port's `held` note (its `msg` a `host.held.*` row) | the tab's banner and the frame's held notice (5.1, 3.1 step 7 (b)); the thumbnail slot at a refused creation | §11.3; item 472 |
| W23 | upgrade offer in the host (3.8) | `ready`'s output versions against `MapRecord.snapshot.outputVersion` | the owner's upgrade dialog → `upgrade` event (§7.5) | §6.4 retention, §11.3 handshake |
| W24 | port leader (3.3) | the role from `doc.load` (with its `audience`) and the audience table | commit of `dossier.result` events; an editing client that folds them re-runs `absorb` and reports a mismatch | §11.3 roles, convergence; §14 audience table |
| W25 | refresh queue (3.4) | the host after an advance (`refreshPending`) | a headless frame running offer → absorb → snapshot → pictures per map | §12.8 memory; §2.9 load |
| | **The port: adapter, digest, binding and diff** | | | |
| W26 | `AdapterManifest` with `requiredKeys`, `optionalKeys`, `keyList`; `AdapterRegistry` (2.4) | each `adapters/sf/<line>/` folder | `digest`'s adapter choice and `recognise` (3.5, 3.8); the lint's key list | §14 port, lint; item 508 |
| W27 | the adapter's field table (2.4) | the adapter folder, per line | `AdapterManifest.keyList`, T-V8-20's ignore clause, §14's key-list lint; every row of W28 and of §7.7's DR table | §7.7 item 1's closed-digest rule; W-DOS-01a/b |
| W28 | digest additions (2.5) — `role`, `security`, `government.legitimacy`, `site.latitudeDeg`, `site.threats`, `site.ruinEvidence`, `economy.chains` extended, `economy.dependencies`, `economy.goods`, `calamities`, `step`, `lesser`, `qualifiers`, `openTop`, `popQualifier`, `mergedInto`, and the history additions of 2.6c | the adapter | DR12 (role); `PortValues` (crime, legitimacy, threats, latitude); DR29; DR30; DR33; DR28's calamities; DR9 and the ladder merge; DR36–DR39 through `HistoryHint` | §14 `DossierDigest`; item 509 |
| W29 | `E_OTHER_SETTLEMENT` and the port's note kinds with `msg`, `keys` and their class (2.4, 4.6) | `digest`, `creation`, `absorb` (`custom_resolved` and `unmapped_kind` after the fold, 3.6 (4)) | an `event` or new `standing` note → the ledger event → V09 §4.10's absorb group; a `standing` note → `DossierBinding.notes` → `GenerationReport.dossierNotes` → the report panel (V09 §5.7); every note → `dossier.result.report` → `MapSession.on('report')` | §14 `PortResult`, `PortNote`; item 508 |
| W30 | `DossierBinding.adapter`, `.quarantined`, `.notes`, `absorbed` retention (2.3) | `creation`, `absorb` and the ledger fold (3.5, 3.6) | the next absorb's diff and remaps (3.5, 3.8); §5.3's binding check; the report | §7.7 item 12, §2.9's dossier block; item 390 |
| W31 | `CarriedFact` shapes and the diff (2.3, 3.5) | `digest` | `absorb`'s change list; `factHash`; F22's convergence | §7.7 items 1, 12, 13 |
| W32 | `dossierFacts.notes`, `.notesCleared` (3.6 (4)) | each port run's notes, by class and identity | the fold (the binding's standing list); the history panel's group (4.6); every report build; replay and verification (3.3) | §7.1, §7.7 item 12, §5.4; items 358, 390 |
| W33 | `GenerationReport.dossierNotes` (4.6) | every derivation's report build and the load's verification replay, copying `DossierBinding.notes` at the report's seq (`[]` unbound) | `report(h)` → V09 §5.7's dossier section under `host.group.standing`; T-V8-14 | §5.4 `GenerationReport`; item 390 |
| W34 | the port's session `host:port` (3.6) | the port | §7.4's stacks (never a user's); V09's undo tooltip | §7.1; item 359 |
| W35 | the prosperity word over time — the diff's `wealth` row (3.5) | the carried settlement fact's `wealth` against the new digest's `wealth.label` (receipt F9) | `EpochInputs.wealthLevel` through `tables/dossier/wealth` → DR6's field at the next epoch; V06 W27's reader | §7.7 DR6; W-DOS-02 |
| W36 | the frozen facts — the diff's `site` and `history` rows (3.5) | the carried `site` and `history` singletons against the new digest | one `frozen_fact_changed` note (class `event`, its `host.note.*` row, drawn in the absorb group) and "Regenerate from the new history" (V06 §3.20.8); no map event | §7.7 One path (the site is creation's); W-DOS-08 |
| W37 | the port's consultation of `LadderRouter` (3.10) | the village product's `ProductDecl` in `StrategyRegistry.products` (V07 §2.1; item 202) | `creation` (the product and rung) and every `absorb` (whether the population lies in a registered range; the product at an epoch by V07 §2.1's fold; 0 routed to V07's desertion) | §1.1 `LadderRouter`, §4.11, PART III; item 202 |
| | **The row sets and the derivations** | | | |
| W38 | the dossier row sets written out (2.6) | this volume's defaults, `@plat/tables` | `digest` and `creation` through the derivation rows | §14 `tables/dossier/*`; item 510 |
| W39 | `tags`, `categories`, `crime`, `cultures` (2.6) | this volume | the siting-profile lookup (item 103, V11's rows), DR24's fallback, `PortValues.crime`, DR29 | items 510, 391 |
| W40 | `relations`, `historyScars`, `magic`, `era`, `materials`, `customWeights`, `isolation`, `chainStatus`, `dependencySeverity`, `calamitySeverity`, `qualifiers`, `threats`, `ruinEvidence` (2.6) | this volume | `PowerRelation` (§4.5, item 72), `HistoryHint`, `CircumstanceSlice.magic` and `.era`, V11's material rows, `PortRows.customKinds`' numbers (3.11), S12a, the supply web, the `distribution` row and DR9, DR2, V04's ruin rule | item 510 |
| W41 | the `site` row's arid reading (2.6) — `desert` with or without `oasis_water`, and deserts with rivers, lakes or coasts | `site.terrain`, `site.access`, the water deposits, the realm cell | S0's site request and S1's water (DR1); DR40's oasis; the toll-bridge rule's failure condition (2.6b (3)); V07's village site rule | §4.2 S0–S1, §7.7 DR1, DR40; item 111 |
| W42 | DR29, the latitude (3.5) | the realm block's `cell.latDeg`, `tables/dossier/cultures` | `Intent.latitudeDeg` at creation, `PortValues.latitudeDeg` at a later epoch → item 102's model-side sampler (V05), V06's drift, V07's village sweeps | §7.7 DR29; item 391 |
| W43 | coverage inside a collective range (3.5) | item 103 (f)'s coverage row | DR9's count draw | §7.7 DR9; item 392 |
| W44 | `economy.chains` extended; carried `chain`, `dependency`; the goods lists (2.3, 2.5) | the adapter, V11's `goodWords`, the `chainStatus` row | DR33 → the supply web (item 105 (i)); V01's district supply term; V06's link re-binding at epochs; V07's village links and entry store | §7.7 DR33; items 509, 390 |
| W45 | the `threats` row → `PortValues.threats` (2.5, 2.6) | the adapter over stressors, conditions, trade partners, access, terrain and population | DR2's waterfront through V11's `WaterfrontThreatRow` (item 106 (d)); V07's watchtower row | §7.7 DR2; item 389 |
| W46 | calamities → `EpochInputs.events` (3.6) | `calamityHistory[]` through the digest; the carried `calamity` keys | V06's hazard phase (DR28); V04's burial growth (the deaths) | §4.11 `EpochInputs`; items 388, 393 |
| W47 | `site.ruinEvidence` (2.5, 2.6a) | the adapter | V04 §3.5.0a's ruin existence and centre; V05's node term through V04's `ruinCentre` | §7.7 DR30; item 509 |
| W48 | the burial and crypt trace (2.6a) | the burial, church, cathedral and monastery records through V11's `kinds` and `ladders` rows | V04's faces, rank, count, ratchet and stagnation; V03's crypts | §7.7 DR32; item 398 |
| W49 | `DossierInstitution.step`, `.lesser`, `.popQualifier`; the ladder merge (2.5, 3.5.1) | the adapter; V11's `dossier.ladders` | DR9's member counts; V01's quarter records; V06's ladder steps; V10's members answer; the count parity (7.3); at village rungs V07 §2.4's range rows, DR9's members, V07 §3.10's QUARTER end claim and a pin lesser's churchyard `cross`; for a REPLACEMENT greater of a new thing (3.5.1 (c), (d)), DR9's `assign` — at a village rung V07's records placement (V07 §3.12 item 4) — the fortification path for a `@wall` greater, and V06 §3.9.11's dossier-phase ladder step | the `distribution` row, §7.7 DR9; item 509 |
| W50 | the catalogue manifest `catalogue.<line>.json` with its `ladderPairs` (2.4) | the adapter's build step, from the pinned line's catalogue and ladder file | V11's `coversManifest` totality and ladder cross-check (V11 registry row 77, T-V11-2) | §14's lint |
| W51 | a derived land use — a `DepositSite` under `res:derived:<landuse>` (2.6 `deposits`, 3.11) | the creation prefix and `absorb`, from a record whose class carries a hard `near` → `landuse:<k>` row within 0 on a dossier listing no deposit opening `<k>` | S12a's site and land use (DR19); V07 §3.9's village claim | §7.7 DR19; §2.7 `DepositSite`; item 508 |
| W52 | DR34, the water system's inputs (2.6b (1)) | the adapter and the pinned rows; DR23's rung | item 110 (b)'s aqueduct reason; V11's chance, need, cap and terminal rows; V06's epoch builds; V10's `why` | §7.7 DR34; item 398 |
| W53 | DR35, the high-ground landmarks (2.6b (2)) | the dossier-bound institutions of class significance at least V11 §3.24.2's `elevated.landmarkMinSignificance` and the custom `landmark` records, at their S3 reservations | item 110 (b)'s elevated-road reason; V10's `why` | §7.7 DR35; §10.2; item 398 |
| W54 | the `kinds` row's `implies` column and the toll-bridge rule (2.6, 2.6b (3)) | V11's `kinds` rows (`toll_bridge` → `bridge`) | DR1's river chance at creation (item 399); V11's toll-house `near` bridge row; V07 §3.1 (1)'s village rung row (E-31) | §7.7 DR1; item 399 |
| W55 | the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s aqueduct, when the dossier's conduit house takes its terminal | the arches' fate and condition (the `impairments` row; V06's decay) | §2.7's raised way `waterUse`; item 244 |
| W56 | the culture's item-110 readers (2.6b (4)) | `site.culture` | V11's aqueduct culture modifier; DR15's template family → V11's stepped specialisations (item 110 (c); V02 X17) | §7.7 DR15 |
| W57 | the history reading (2.6c) — `HistoryHint`'s additions, the lifecycle, the ancient-ruin marker and the effective peak's evidence | the adapter over `history`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle stamps and `peakTier` | `Recipe.history` → V06's `HistoryReplay.plan` (V06 §3.20) through DR36–DR39; S2's stage count and II.7.6 (the scars); V04's buried former settlement (DR39); V10's story; the diff's `history` row (W36) | §2.7 `HistoryHint`, `HistoryRecord`; §4.11 *History-first generation*; §7.7 DR36–DR39; item 113 |
| | **The staged records and the values** | | | |
| W58 | the staged records this volume builds — `ConditionOverlay`, `DepositSite`, `PowerRelation`, `HistoryHint`, the dossier-backed `Person`, `CustomChainRecord`, `CustomServiceRecord` (2.5, 2.8, 3.11, 3.13) | the `dossierRecord` event (creation prefix and `absorb`); `HistoryHint` at creation | §2.7's readers, the renderer and labels (5.2), the clerk | §2.6/§2.7's staged records, named to this volume; W-HOOK-02; items 358, 256 |
| W59 | `PortValues` on `CircumstanceSlice.port` (2.5) | `creation` (the creation slice) and the cadence's epochs (3.6) | the readers of `PortRows.crime`, `.hinterland`, `.legitimacy` (§4.6, §4.9, II.7.3, II.7.5, §4.5 (6)); DR2; DR29 | §7.7 layer 2, §10.2; item 389 |
| W60 | stressors → `stress:<type>` condition overlays (3.11) | the digest's normalised `stressors` | the `conditions` row's readers | §2.7; item 358 |
| W61 | the realm-block helper `realmBlockFrom` (3.11) | the host's campaign placements, the realm map's scale and latitude scale, the campaign's spatial digest — nothing else of campaign state | `HostContext.realm` → trade bearings, north first, latitude | §14 `RealmBlock`; items 77, 396 |
| W62 | a notable's `importance` (2.3, 5.4 (3)) | the carried notable fact | the host projection's `people` order — the host clerk's people answers and the party gazetteer (3.14 (2) (c)) | W-DOS-07 |
| | **Custom content** | | | |
| W63 | `DossierInstitution.custom` with `keywords` (2.8) | the adapter, from the custom instance and `customContentProvenance` | item 104 (a)'s resolution at fold (V11 §3.13.1's rungs; 3.5 (5) (f)); DR10 | §14 `DossierInstitution`; item 511 |
| W64 | `customChains`, `customResources`, `customServices` (2.8) | the adapter, from `economicState.customChains`, `config.nearbyResourceDefinitions`, `availableServices.*` | `creation` and `absorb` → `dossierRecord` puts (3.13) | §14 `DossierDigest`; item 511 |
| W65 | `HostContext.customLibrary` (2.8) | the host client, from the author's content library (optional) | `digest` → the `custom-def` carried facts → item 104 (a) (5) | §14 `HostContext`; item 511 |
| W66 | carried kinds `custom-def`, `custom-chain`, `custom-service`; key-law rows `chain:`, `svc:uid:`, `res:uid:`, `def:` (2.8) | `creation`, `absorb` (the ledger event); `digest` | the diff (3.5): re-resolution on a new revision (item 104 (e)), a chain's activation change (item 104 (h) (7)); binding rows, `DossierRef.element` | §7.7 item 12; items 390, 256 |
| W67 | `Assignment.custom` (2.8) | the creation prefix; a `custom_revision` `setAttr` | item 104 (a)'s re-resolution at fold; the custom weights read from the `custom-def` fact; the clerk's `why` | §7.7 `Assignment`; item 394 |
| | **Editing, the players and the clerk** | | | |
| W68 | generated item-110 content unbound; the removal hold (4.1, 4.3) | the base's item-110 generators; the DM's delete; an accepted clerk proposal | every absorb, epoch, rung change, re-key, upgrade, rebase and host undo (the slot stays closed); the history panel's lines (4.6) | §7.7 item 3; §7.1's one suppression mechanism (J-VI.14); item 260 |
| W69 | the party picture set and party gazetteer (3.14) | the module in an editing session's frame or the refresh frame, on `party.render`: the party key resolved by 3.14 (1) into item 572's key form, passed as `ExportOpts.knowledge` (item 453) and as `admitAs` to every `gazetteer` and `people` query (item 572) | the player's Map tab (`MapHost.mountParty`); the player's assistant | §11.1 *Knowledge*; §11.2 `admitAs`; §14 audience table; items 472, 513 |
| W70 | `MapRecord.party` and `setParty` (2.1, 4.2) | an owner's or editor's "Reveal to the party" and "Hide again" | the party picture set and gazetteer; "See what the players see" (through `host.state`, 3.14 (5)) | §9.2's key; §14 audience table |
| W71 | `party.render` / `party.rendered` (2.2, 3.14 (3)) | the client: at creation, after each absorb it commits, 30 s after a committed map edit batch, after each `setParty`, at open when B18 finds the stored set stale, in the refresh queue | the module's party render (3.14 (1)–(2)); the set → `MapStore.putPartyPictures`, then `host.state { partyPicturesAt }` | §11.3; item 472; T-V8-2, T-V8-41 |
| W72 | the host clerk (4.4) | SettlementForge's assistant, its map tools resolved in the DM's page | `query`, `preview`, accepted `doc.changed` with `proposedBy: 'clerk'`; a player's assistant: the stored party gazetteer | §11.2 clerk tool API |
| W73 | `MapSession.setClerk`, `preview`'s `proposal`, `on('clerkNeedsToken')`, `on('clerkProposal')`, `on('clerkConfigRefused')` (2.2) | the host page (V10's `clerk.config`; SettlementForge's assistant's proposals, 4.4 (3)) | W13 → `ClerkMount.host` and `HostSlots.clerkMode`; the harness's `needsToken`, `refused` and `answer` posted back (3.1 step 7 (a); V10 §3.17) | item 473 |
| | **Rendering and export** | | | |
| W74 | drawing rows `condition.*`, `worked-out`, the `supplyChains` view, the `occupation` symbol, the export attributes, the gazetteer's `customChain` rows (5.2) | the staged and custom records | the renderer, the legend, GeoJSON; V09 §5.4's Show-menu entry **SettlementForge's chains** | §8.2, §8.3, §11.1, §11.2; item 410 |
| W75 | the chains' knowledge rule (5.2) | each joined node's `knownTo` and concealment (item 63), read by §9.2's one admission (E-17) as a band-less reader against the view's effective key or the export's key | W74's drawing, legend, gazetteer rows and exports; the party gazetteer (3.14); T-V8-25 | §9.2; §11.1, §11.2 *Knowledge*; item 410 |
| W76 | the host projection (5.4 (3)) and `E_HOST_FORMAT`, `E_HOST_KIND` (5.4) | the module in host mode, on every `query.result` and `preview` reply before it leaves the frame (item 473 (c)) | SettlementForge's assistant through the client (no projection code there); the party gazetteer; V10's configuration B prompts; the host's `export.request` (`doc.snapshot` exempt) | §11.2, §11.3; items 472, 473 (c); T-V8-27 |
| | **Budgets, bars, plan and release** | | | |
| W77 | budgets (6) and bars (7), the edges of 3.15 among them | this volume | §12.6's stage row; §13.2's suite, §13.8's tiers | items 480, 486 |
| W78 | M-SF and its steps (8) | this volume | §16's staged milestones (J122's order) | item 529 |
| W79 | host harness `plat/tools/hostharness/` (7.2) | the fixture pairs, a mock host store that never decodes a byte | the T-V8 bars end to end | §13.2 B-DOSSIER-lite, §13.8 |
| W80 | release checklist (8.3) | the bars and the manifests | a release of the SettlementForge configuration | §13.3 milestone records |

## 2 Data model

### 2.1 The map record — what SettlementForge stores beside the dossier

The host is the store (§11.3). For SettlementForge the store is one **map record** per settlement map, kept in its own
row keyed by the settlement's id and the map id — never inside the dossier's `data` blob, where it would ride every save,
sync and public projection at about ten times the dossier's size (`research/sf/dossier-seam.md` C-6; J-V8.3). The
type is published by `@plat/bridge-client` as the host's storage contract; the module never touches storage itself.
**The host computes nothing it stores** (V08 §3.7; J-V8.46).

```ts
// @plat/bridge-client — the host's storage contract (hashes are lower-case hex strings: the client depends on nothing)
interface MapRecord {
  mapId: string;                 // a UUID the HOST mints when it first asks for a map; the document's docId (item 459). Immutable.
  settlementKey: string;         // `settlement:<id>` (§7.7 item 12): the dossier the map is bound to. Immutable.
  snapshot: SnapshotBlock;       // filled from `dossier.result.created` or `doc.snapshot.ready` (V08 §2.2), never computed by the host
  tail: { seq: number; event: Uint8Array /* the module's `encoded[i]`, stored as handed */ }[];   // the committed events after the snapshot, seq order
  logHead: string;               // the canonical head: the snapshot's when the tail is empty, else the last `logHeadAfter` the host accepted
  adapter: { line: string; version: string };             // the port adapter that last committed (V08 §2.4)
  lastOffer: { dossierHash: string /* §3.2 */; at: string /* ISO 8601 */; result: OfferStatus };
  absorbed: { factHash: string; week: number | null; dossierHash: string };   // the dossier state the committed log last absorbed
  status: 'current' | 'stale' | 'held' | 'refreshing';
  held?: { code: PortRefusalCode; message: string /* the port's English line, for logs */; sinceDossierHash: string;
    reason: { key: string; args?: Record<string, string | number> } /* the refusal's `held` note's msg, stored as handed: a host.held.* row (V08 §3.9); the banner and the frame's held notice draw it */ };
  refreshing?: { by: string /* the page session holding the refresh lease */; until: string /* ISO: now + 60 s, renewed after each map */ };
  thumbnails: { public?: Uint8Array; secret?: Uint8Array };   // PNG, 512 px on the long side (V08 §3.7)
  party: PartyKnowledge;         // what the players' party knows (V08 §3.14): written only by setParty
  partyPictures?: PartyPictureSet;   // the players' view (V08 §3.14): written only by putPartyPictures
  backups: { bytes: Uint8Array; logHead: string; docId: string /* = mapId: restore refuses any other */; at: string;
    tailAfter?: { seq: number; event: Uint8Array }[] /* backups[0] only: the tail segment the compaction that retired it removed, kept until the next compaction */ }[];   // the previous snapshots, newest first — at most MapHostConfig.backupDepth, SettlementForge's backup rule (J121)
  refreshPending: boolean;       // queued for the background refresh (V08 §3.4)
  sizes: { snapshot: number; tail: number; backups: number; thumbnails: number; party: number };   // bytes, read against SettlementForge's storage allowance (MapHostConfig.quotaBytes, J121)
}
interface SnapshotBlock { bytes: Uint8Array /* the .plat as §2.9 writes it */; logHead: string /* §11.3 */; lastSeq: number /* its log's last seq */;
  outputVersion: string; schemaVersion: string; documentDigest: string /* §2.9's document digest over the canonical bytes */ }
interface PartyKnowledge { tier: 'public' | 'local' /* the party's base key (§9.2); never 'secret' */;
  places: string[] /* binding keys (inst:…, quarter:…, npc:…) or, for a map place, its address: the places revealed above the tier */;
  rev: number /* +1 at every setParty */; prev?: { tier: 'public' | 'local'; places: string[]; rev: number } /* the state before the last setParty: "Hide again" restores it */;
  by?: string /* the session that last wrote */ }
interface PartyPictureSet { seqAt: number /* the last seq of the log drawn */; logHead: string /* the document head they were drawn at */; partyRev: number /* the party.rev drawn */;
  outputVersion: string; week: number | null /* the dossier week drawn, for the viewer's caption */;
  levels: { z: number /* 0 city band, 1 district, 2 neighbourhood, 3 building (admitted places only, V08 §3.14 (2)) */; tileSize: 256; cols: number; rows: number;
    tiles: (Uint8Array | null)[] /* PNG, row-major; null: a z3 tile not rendered */ }[];
  svg: Uint8Array /* the city-band SVG under the party key, §11.1's inert bar */; gazetteer: Uint8Array /* UTF-8 JSON: the party gazetteer (V08 §3.14 (2) (c)) */;
  drawDigest: string /* H128 over the display lists the tiles and the SVG are drawn from, the gazetteer's bytes and `week`: `party.render`'s unchanged test (V08 §3.14 (3)) */;
  at: string }
type OfferStatus = 'created' | 'absorbed' | 'unchanged' | 'held' | 'refused';
type PortRefusalCode = 'E_RUNG_UNAVAILABLE' | 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED' | 'E_OTHER_SETTLEMENT';
```

`status` reads: `current` — `lastOffer.dossierHash` equals the dossier the host holds now and the result committed;
`stale` — the host holds a newer dossier than `lastOffer`; `refreshing` — a live refresh lease holds the record
(`refreshing.until` in the future; an expired lease is free and the status reads `stale`); `held` — the last offer was
refused and `held` says why (V08 §3.9). The record is written only through the client's store calls (V08 §3.7, §3.14),
each conditioned on the `logHead` (or, for the party, on `party.rev`) the host holds — a compare-and-set — so two writers
never interleave. `party` starts `{ tier: 'public', places: [], rev: 0 }` at `create`.

### 2.2 The bridge additions and the host client

The envelope, transport, `re` correlation, source-window check and before-`ready` queue are §11.3's. §11.3's vocabulary lists the port's
messages (item 472); their types are this section's, generated into `@plat/api`'s bridge schema:

```ts
// host → PLAT (only a session whose role is owner or editor may send dossier.offer, doc.snapshot or party.render; a viewer's is answered doc.rejected { reason: 'role' })
type DossierOffer = { type: 'dossier.offer'; body: {
  dossier: unknown;              // the whole dossier object, structured-cloned; never a change list (§7.7 item 1)
  dossierHash: string;           // the host client's hashDossier(dossier) (V08 §3.2)
  host?: { week?: number; realm?: RealmBlock; line?: string;
    customLibrary?: CustomLibraryEntry[] /* V08 §2.8; the client passes only the entries whose definition the dossier materialised (V08 §3.13 (8)) */ };   // HostContext's fields that travel with an offer (§14); the audience travels on doc.load, displayNames on export.request
  create?: { mapId: string } } };   // present only when the host has no map record for this settlement
type DocSnapshotRequest = { type: 'doc.snapshot'; body: {} };   // creation, compaction, upgrade, rebase (V08 §3.7); exempt from E_HOST_FORMAT
type HostState = { type: 'host.state'; body: {         // owner or editor sessions only; the module keeps it in the session's memory — never in the document,
                                                       // its view state or a save (V08 §3.1 step 7 (c))
  party?: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: sent after each doc.load and whenever the host's copy changes
                                                       // (its own setParty; another editor's, through the host's subscription)
  backups?: { logHead: string; at: string }[];         // MapRecord.backups' heads, newest first: the restore dialog lists the map edits after backups[0].logHead (V08 §4.2)
  partyPicturesAt?: string;                            // partyPictures.at: the history panel's "pictures last drawn" (V08 §4.6)
  playersView?: boolean } };                           // MapSession.seePlayersView(on): true sets the frame's ViewOpts.viewAs to the party key, false clears it (V08 §3.14 (5))
type PartyRender = { type: 'party.render'; body: {     // owner or editor sessions only (a viewer's is answered doc.rejected { reason: 'role' }); not an export: E_HOST_FORMAT does not apply
  party: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: the key the set is drawn under, resolved by the module (V08 §3.14 (1))
  since?: { seqAt: number; partyRev: number; outputVersion: string; drawDigest: string } } };   // the stored set's stamp, when one is stored: the unchanged test (V08 §3.14 (3))
// the base messages the port extends — doc.load's `audience?: AudienceWord`, doc.changed's `encoded`, `seqAfter` and `logHeadAfter`, ready's `protocol` and
// `adapters`, export.request's `displayNames?` and `knowledge?: Admission` (item 572's type, lowering only) — are §11.3's, with their rules there (J-V8.29)
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
  detail?: string /* a host.* catalogue key the banner draws beside its phase's row — B10's host.recovered.*, B20's host.verify.mismatch (V08 §3.9) — else absent */;
  progress?: number /* 0–1 */; outputVersion?: string } };
type HostAction = { type: 'host.action'; body: {       // a push from an owner's or editor's frame only: a header control's click (V08 §4.2)
  action: 'refresh' | 'restore' | 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings';
  args?: { places?: string[] /* reveal, hide: the selected places — a dossier element's binding key, else its address (PartyKnowledge.places' form) */;
    undo?: true /* restore party.prev: "Hide again" (on hide), "Reveal again" (on reveal), the tier's undo (on partyTier) */; tier?: 'public' | 'local' /* partyTier */ } } };
  // the client surfaces it as MapSession.on('action') and the host runs the V08 §4.2 row's operation with its existing calls;
  // the client drops, and reports, an action whose row the session's role does not hold
type PartyRendered = { type: 'party.rendered'; re: number; body:   // the reply to party.render (V08 §3.14 (3)); its set's partyRev is the request's party.rev
  { status: 'rendered'; set: PartyPictureSet /* V08 §2.1: the client stores it as handed with MapStore.putPartyPictures */ } | { status: 'unchanged' /* nothing stored */ } };
type AudienceWord = 'dm' | 'co-dm' | 'player' | 'anonymous' | 'gallery' | 'dm-share';   // §14's audience table's left column, in the client's words; only 'dm' and 'co-dm' ever load a document
```

The **host client** is the one piece of our code in SettlementForge's bundle — dependency-free, generated message types
copied (never imported) from `@plat/api`'s bridge schema at build time (item 507):

```ts
// @plat/bridge-client
interface MapHostConfig {   // every SettlementForge product decision the module needs arrives here as an input (J121) — the design decides none of them
  moduleOrigin: string /* the origin SettlementForge serves the module from (J121; V08 §11 Q1) */; embedPath: string /* '/embed.html' */;
  locale: string /* SettlementForge's interface language, BCP 47 (J121): carried in the frame's src (V08 §3.1 step 1); the frame reads messages/<locale>.json, a missing file or key reading the source catalogue en.json (V09 §2.9's Locales) */;
  backupDepth: number /* SettlementForge's backup rule (J121; V08 §11 Q2): how many previous snapshots a record keeps, an integer ≥ 0 */;
  quotaBytes?: number /* SettlementForge's per-map storage allowance (J121); absent: no check (V08 §3.7) */;
  protocol: 2; bootTimeoutMs: number /* 20 000 */; replyTimeoutMs: number /* 60 000 for dossier.result and doc.snapshot.ready, 15 000 otherwise */;
  store: MapStore /* the host's implementation of the record's reads and compare-and-set writes */; statusText?: Record<string, string> /* the host's translation; the default rows are generated from V09's `host.*` catalogue */ }
interface MapStore { read(settlementKey: string): Promise<MapRecord | null>;
  commitEvents(mapId: string, expectedHead: string, encoded: Uint8Array[], seqAfter: number, logHeadAfter: string, absorbed?: MapRecord['absorbed']): Promise<'ok' | 'stale'>;
  replaceSnapshot(mapId: string, snapshot: SnapshotBlock): Promise<'ok' | 'stale'>;   // precondition: snapshot.logHead is the record's head or the logHeadAfter of an event in its tail; keeps the tail's suffix after it; moves the old snapshot to backups[0] with the removed segment as tailAfter (none when backupDepth is 0), drops every backup beyond backupDepth
  create(record: MapRecord): Promise<'ok' | 'exists'>; putThumbnails(mapId: string, t: MapRecord['thumbnails']): Promise<void>;
  setParty(mapId: string, expectedRev: number, party: PartyKnowledge): Promise<'ok' | 'stale'>;
  putPartyPictures(mapId: string, pics: PartyPictureSet): Promise<'ok' | 'older'>;   // 'older' (nothing written) when the stored set's (seqAt, partyRev) pair is not lower than this one's — integers only
  setStatus(mapId: string, patch: Partial<Pick<MapRecord, 'status'|'held'|'lastOffer'|'refreshPending'|'refreshing'>>): Promise<void> }
interface MapHost { mount(el: HTMLElement, s: MountSpec): Promise<MapSession>;   // audience 'dm' or 'co-dm' only; any other word is refused before a frame exists
  mountParty(el: HTMLElement, s: { settlementKey: string }): Promise<PartyView>;   // a player's tab: stored pictures only, no frame, no module (V08 §3.14)
  refresh(queue: { settlementKey: string; dossier: unknown; week?: number; realm?: RealmBlock; customLibrary?: CustomLibraryEntry[] }[], o?: { signal?: AbortSignal; onEach?: (k: string, s: OfferStatus) => void }): Promise<void>;   // V08 §3.4
  hashDossier(dossier: unknown): Promise<string>;   // V08 §3.2
  realmBlockFrom(p: RealmPlacements): RealmBlock;   // V08 §3.11
  audience(word: AudienceWord): { role: 'owner'|'editor'|'viewer'|null; knowledge: 'public'|'secret' } }   // §14's table
interface MountSpec { settlementKey: string; dossier: unknown; audience: 'dm' | 'co-dm'; session: string; week?: number; realm?: RealmBlock; customLibrary?: CustomLibraryEntry[] }
interface MapSession { offer(dossier: unknown, o?: { week?: number; realm?: RealmBlock; customLibrary?: CustomLibraryEntry[] }): Promise<OfferStatus>;
  exportPicture(fmt: 'png'|'svg'|'print', o: { knowledge?: Admission /* export.request's, above */; displayNames?: Record<string, string>; opts?: unknown }): Promise<ArrayBuffer>;
  query(q: unknown): Promise<unknown>;   // the host clerk (V08 §4.4): the answer arrives ALREADY projected by the module (V08 §5.4 (3); item 473 (c)); the client holds no projection code
  preview(events: unknown[], o?: { view?: boolean; proposal?: HostProposal /* item 473 (b)'s proposal body (id, reason, variations), generated from @plat/api's bridge schema */ }): Promise<unknown>;   // V10 §3.17's host proposal intake; the reply projected as query's
  setParty(p: { tier?: 'public'|'local'; reveal?: string[]; hide?: string[]; prev?: true /* restore party.prev: "Hide again", "Reveal again" */ }): Promise<'ok'|'stale'>;   // owner or editor: writes MapRecord.party, then re-renders the party pictures (party.render, V08 §3.14 (3)) and re-sends host.state { party }
  exportBundle(formats: ('dd2vtt'|'foundry')[], o?: { knowledge?: Admission }): Promise<{ fmt: string; bytes: Blob /* application/octet-stream, never parsed */ }[]>;   // from M-SF only (J122; V08 §5.4 (2)): the scene files for SettlementForge's export bundle
  seePlayersView(on: boolean): void;   // the DM's check from the page: posts host.state { playersView: on }, which sets the frame's ViewOpts.viewAs to the party key or clears it —
                                       // a display filter (item 464, in item 572's key form; V08 §3.14 (5)); no view-state write, no store write, no event
  setClerk(config: ClerkConfig /* item 473's clerk.config body — mode, transport (with its expiresAt and fallbacks), capUsd — generated from @plat/api's bridge schema like the client's other message types, never restated here */): void;   // sends V10's clerk.config
  setView(patch: Record<string, unknown>): void;
  on(ev: 'status'|'report'|'selected'|'action'|'clerkNeedsToken'|'clerkProposal'|'clerkConfigRefused', h: (x: unknown) => void): () => void;   // action: a host.action body (V08 §4.2); clerkProposal: the module's clerk.proposal { id, status, seqs? }; clerkConfigRefused: clerk.config.refused { reason } (item 473 (a), (b))
  switchTo(s: MountSpec): Promise<void>;   // reuses the frame (V08 §3.1); the same fields as mount
  close(): void }
interface PartyView { refreshFromStore(): Promise<void>; close(): void }   // pan and zoom over the stored levels; the caption host.party.asOf (V08 §5.1)
type RealmPlacements = { self: { x: number; y: number }; partners: { key: string; x: number; y: number }[]; mPerRealmUnit: number;
  latitude?: { degAtY0: number; degPerUnitY: number /* the realm map's latitude scale; y grows southward */ };
  cell?: { terrain?: string; river?: boolean; coastSideDeg?: number } /* from the campaign's spatial digest */ };
```

### 2.3 The binding in practice — the carried facts and their hash

`DossierBinding` (with its `adapter`, `quarantined`, `notes` and `absorbed` fields; item 390), `CarriedFacts` and the key
law are §7.7 item 12's. Their readers here: `adapter` — V08 §3.8's remap and line steps and `select` (V08 §2.4);
`quarantined` — the diff's skip list (V08 §3.5, §3.9), rebuilt by folding the ledger events (V08 §3.6 (4)); `notes` —
the standing notes (V08 §4.6's class column) the last port run wrote, in identity order, rebuilt by the same fold and
read by the report panel's dossier section and the next absorb. This volume owns the carried shape and the history's
retention:

```ts
// the carried value per element kind: exactly the digest subset the diff compares (V08 §3.5), canonical field order
type CarriedFact =
  | { k: 'settlement'; name: string; tierWord: string; population: number; wealth: string /* wealth.label, the prosperity word (W-DOS-02) */ }
  | { k: 'site'; terrain: string; access: string; threat: string; magic: string; culture: string; isolation: string[] /* the digest's site words: creation's inputs, compared for the frozen-fact report only (V08 §3.5) */ }
  | { k: 'history'; digest: Hash128 /* H128 over the canonical CBOR of the digest's history block (V08 §2.6c) — creation's input, compared for the frozen-fact report only */ }
  | { k: 'institution'; name: string; kindLabel: string; kind?: string; category: string; role?: string; tags: string[]; count?: [number, number]; openTop?: boolean;
      step?: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'; lesserOf?: string /* the greater's key when this record was merged as its member (item 108 (c)) */; popQualifier?: number;
      districtScale: boolean; facets: DossierInstitution['facets']; forbidden: string[]; state: DossierInstitution['state']; fate?: string; inactive: boolean;
      impairments: { type: string; severity: number; covert: boolean }[]; knownTo?: 'public'|'local'|'secret'; renamedFrom?: string; members?: number /* a collective record's placed count, a map fact kept beside it for the member keys */ }
  | { k: 'power'; name: string; category: string; standing: number; governing: boolean; controlled: string[] }
  | { k: 'relation'; kind: string /* the line's type word */; trend: string /* stable, declining, escalating */; sign: -1 | 0 | 1; strength: number; hidden: boolean }
  | { k: 'notable'; name: string; role: string; category: string; power?: string; institution?: string; importance?: string /* read by the host projection's people order (V08 §5.4 (3)) */; status?: string; replaced?: string }
  | { k: 'condition'; archetype: string; source: 'condition' | 'stressor'; severity: number; severityBand?: string; status: string; sinceWeek?: number; untilWeek?: number }
  | { k: 'resource'; state: 'available'|'depleted'|'removed'|'discovered'; custom: boolean }
  | { k: 'quarter'; name: string; phrase: string; landmarks: string[] }
  | { k: 'government'; name: string; governingPower?: string; legitimacy?: number }
  | { k: 'trade'; partners: { key: string; relationship: string }[]; links: { good: string; flow: 'import'|'export'; partner: string }[]; entrepot: boolean;
      goods: { exports: string[]; imports: string[]; transit: string[] } /* goods keys after goodWords (V08 §3.5 (6)) */; incomeShares: Record<string, number> /* the income sources' percentages */ }
  | { k: 'port-values'; crime: number | null; importPct: number | null; foodChain: Record<string, boolean> | null; legitimacy: number | null;
      latitudeDeg: number | null /* DR29's value from the realm block when it arrives after creation (V08 §3.5) */; threats: string[] /* the neutral keys of the `threats` row, sorted */ }
  | { k: 'deity'; key?: string; name?: string }
  | { k: 'chain'; needKey: string; resource?: string /* a res: key, else 'name:'+name */; processors: string[] /* binding keys, else 'name:'+name, flow order */;
      outputs: string[] /* goods keys, sorted */; upstream: string[] /* chain:cat: keys */; status: string /* the neutral status key (V08 §2.6 `chainStatus`) */; entrepot: boolean }
  | { k: 'dependency'; severity: number /* by `dependencySeverity` */; affected: string[] /* the services it names, sorted */ }
  | { k: 'calamity'; type: string; week: number; deaths: number; severity: 'minor'|'moderate'|'major'|'catastrophic'; targets: string[] /* binding keys */ }
  | { k: 'evidence'; kinds: string[] /* the ruin-evidence kinds present, sorted (V08 §2.6 `ruinEvidence`) */ };
```

**Keys of the carried map.** The binding keys of §7.7 item 12 for settlement, institution (a collective record once, its
members `#k` in the binding rows only), power, notable, condition, resource, quarter and government; the singletons of our
own — `trade`, `port-values`, `deity`, `evidence`, `site`, `history` — and: `relation:<a>|<b>` for a power relation (its two power keys in
code-point order, §2.7's `PowerRelation.key`; unordered, because the line's pair order is not a direction — V08 §3.11,
J-V8.52); `cond:stress:<type>` for a stressor (it has no id); `chain:cat:<chainId>` for one of SettlementForge's own
chains (disjoint from the custom `chain:<chainId>` of V08 §2.8); `dep:<institution key>|<slug(resource)>` for a
dependency; `calamity:<week>:<slug(name)>` for a calamity. A power's `rename-faction` re-keys its relation keys by the
same `rebind` that re-keys the power (V08 §3.6 (5)), never a removal and an addition. **`factHash`** = H128 over the
canonical CBOR of the carried map, keys sorted by code point, numbers as the digest holds them (a severity rounded to
1/1 000, a standing to 1/10 000 — the digest's own rounding, V08 §3.5 (2)), so a dossier whose only change is below that
resolution hashes equal. **Retention of `absorbed`**: every entry keeps `{ seq, week, factHash }` forever (16 B of
hash each: a century of weekly absorbs is under 100 KB and a host's undo can match any of them, F22); `changeIds` are kept
on the newest 64 entries only, and the trim is **part of the fold** — folding a `dossierFacts` event appends its entry
and then removes `changeIds` from every entry older than the newest 64 — so the stored block and the block the fold
rebuilds from the log are equal at every seq (§2.9's load check; T-V8-5). The report reads older change ids from the
log's `dossierChange` envelopes.

**A binding row's life.** *Create*: `creation` writes one row per dossier element it placed or carried (collective
members `#1…#n`, n the placed count; a ladder lesser merged into its greater, item 108 (c), becomes a row of the greater's
members, V08 §3.5.1 — or, where the greater is a new thing, an alias row on it, or the row on the churchyard `cross` a
pin lesser binds at a village rung, V08 §3.5.1 (c)); `absorb` writes a row for each addition. *Read*: `factTier` (§2.8), the diff, the oracle's answers
(V08 §4.4). *Persist*: the dossier block (§2.9), outside the model digest. *Regenerate*: a scoped regeneration re-places
members under their addresses (§6.3), so rows follow the addresses and never change. *Undo*: a dossier event is no undo
target (§7.4); a map `undo` that would un-place a dossier element is refused (§7.7 item 2), so a row never dangles.
*Migrate*: rebuilt from the log's dossier events at first load (§7.5); an adapter-version remap or a line migration
re-keys rows by V08 §3.8 and writes a `line_migrated` note. A row whose element is removed keeps its key and its entity
(the retired assignment), so a re-opening re-binds to its own former building (F6).

### 2.4 The adapter manifest, the registry and the port's new results

Each `adapters/sf/<line>/` folder (§14) exports one manifest beside its pure digest function (item 508):

```ts
// @plat/port
interface AdapterManifest { id: 'sf'; line: string /* the canonical id: the folder name, 'fp-integration-2026-09-23' (item 512) */; version: string /* the adapter's own semver */; commit: string /* the SF commit it was cut against: '5d699cc68' */;
  requiredKeys: string[] /* the top-level keys every dossier of the line carries (below) */;
  optionalKeys: { key: string; read: boolean }[] /* keys a lived or custom dossier may add; read: false → dropped and noted ignored_key (below) */;
  keyList: string[] /* every host key the adapter reads, receipt keys included — §14's lint list */;
  recognise(raw: unknown): { accept: boolean; evidence: string[] } /* pure; reads only keyList keys: every requiredKeys key present, schemaVersion 1,
     simulationVersion 1, the `id` form `s_` + 16 hex, the institution record shape; any EXTRA top-level key is accepted — never a refusal */;
  limits: { maxBytes: number /* 8 MiB of JSON */; maxDepth: number /* 32 */; maxRecords: number /* 2 000 institutions, 500 notables, 200 of any other list */; maxString: number /* 16 KiB */ };
  vocabulary: Record<string /* a tables/dossier/* table */, string /* the table version this adapter's words were written against */>;   // read by release row R2 against the pinned tablePins of the fixture documents
  remaps: { fromVersion: string; fields: { kind: CarriedFact['k']; path: string /* a CarriedFact field */ }[] }[];   // digest changes declared between adapter versions (V08 §3.8)
  fromLines: { line: string; keys: { rule: 'identity' } | { rule: 'table'; rows: { from: string; to: string }[] } }[] }   // binding-key migration from an earlier line (V08 §3.8)
interface AdapterRegistry { register(m: AdapterManifest, digest: (raw: unknown, host?: HostContext) => PortResult<DossierDigest>): void;
  select(raw: unknown, o: { line?: string /* HostContext.line */; bound?: string /* the document's DossierBinding.adapter.line; absent at creation */ }):
    { status: 'ok'; manifest: AdapterManifest; defaulted?: boolean } | { status: 'refused'; code: 'E_LINE_UNSUPPORTED'; candidates: string[] } }
// §14's PortResult (with E_OTHER_SETTLEMENT) and PortNote (its kinds, `msg` and `keys`; item 508) are the base's; what each kind is written for and its
// words and class are V08 §4.6's table. The union gains one kind: 'frozen_fact_changed' /* a later change of creation's site words or of the history (V08 §3.5's
// `site` and `history` rows; W-DOS-08) */. A note's IDENTITY is the first 16 hex digits of H128 over the canonical CBOR of (kind, msg, keys sorted); its CLASS
// (event, standing or report) decides where it is kept (V08 §3.6 (4))
```

**The first line's key sets (CONFIRMED on the 35 births and 12 after-tick dossiers generated on the pinned line).** `requiredKeys` — the 41 keys every birth carries: `_config`, `_seed`,
`activeConditions`, `aiOverlays`, `arrivalScene`, `availableServices`, `coherenceNotes`, `config`, `conflicts`,
`culturalIdentity`, `culturalNotes`, `defenseProfile`, `economicState`, `economicViability`, `factions`,
`generationCoherenceReceipt`, `generatorVersion`, `history`, `id`, `institutions`, `isolationSupport`, `name`,
`neighborRelationship`, `npcs`, `population`, `powerStructure`, `pressureSentence`, `prominentRelationship`,
`relationships`, `resourceAnalysis`, `schemaVersion`, `settlementReason`, `simulationTrace`, `simulationVersion`,
`spatialLayout`, `stress`, `stressors`, `structuralSuggestions`, `structuralViolations`, `tier`, `userCanon` (several of
them on §7.7 item 1's never-read list: required for recognition, never read). `optionalKeys`, read: `customContentProvenance`,
`customContentRoster`, `populationHistory`, `resourceHistory`, `tierHistory`, `institutionHistory`, `calamityHistory`,
and `neighbourNetwork` (a campaign's saved neighbour links, read when present; not seen in the census); not read:
`urbanFabric`, `npcLadder` and `traditions` (on §7.7 item 1's never-read list). A lived dossier carries 41 to 47 keys (one week: `populationHistory`; a year:
`resourceHistory` too; the lit year: `calamityHistory`, `npcLadder`, `traditions`, `urbanFabric`), and every one is
recognised (T-V8-31). An unknown top-level key — one neither list names, a later line's addition — is accepted, dropped
by `digest` into `ignored` and noted `ignored_key`; the release checklist (R9) adds it to a list when the fixtures show it.

**The adapter's field table** (W-DOS-01b; the one list §7.7 item 1's closed-digest rule names). Every SettlementForge
path the adapter reads, the `DossierDigest` field it fills and what reads it; every top-level key it does not read, with
its reason. A field inside a read record that no row names is not read. `AdapterManifest.keyList` is this table's left
column (receipt fields included), T-V8-20's ignore clause proxies every path outside it, and §14's key-list lint scans
it (T-V8-49). The rows are the first line's (`fp-integration-2026-09-23`); a later line's adapter folder carries its own.

| SettlementForge path | digest field | read by |
|---|---|---|
| `id` | `settlement.key` (`settlement:<id>`) | the binding (§7.7 item 12); `recognise`'s form check |
| `_seed` | `settlement.seed` (one way, §14 item 2) | the recipe's seed; nothing else |
| `name`, `tier`, `population` | `settlement.name`, `.tierWord`, `.population` | the title (§9.5, §7.7 item 15); DR7, DR23; F8, F15; the diff (V08 §3.5) |
| `schemaVersion`, `simulationVersion`, `generatorVersion` | `settlement.versions` | `recognise`; `DossierRef.version` |
| `config.terrainType` (the older `terrain` words through the `site` row) | `site.terrain` | DR1, DR19, DR31, DR34, DR39, DR40 |
| `config.tradeRouteAccess` | `site.access` | DR1, DR2, DR3; the `threats` row |
| `config.monsterThreat` | `site.threat` | DR2 (`Intent.defence`); the `threats` row |
| `config.magicLevel` | `site.magic` | `CircumstanceSlice.magic` (II.6, item 68); DR27 |
| `config.cultureProfileKey` | `site.culture` | DR1, DR5, DR14, DR15, DR29, DR34; the `era` row |
| `config.nearbyResources`, `…Native`, `…Depleted`, `…State` | `site.deposits` | DR19, DR30, DR31, DR40; `DepositSite` |
| `config.nearbyResourceDefinitions` (custom entries) | `customResources`; `site.deposits` with `custom: true` | DR19; `DepositSite` (V08 §3.13 (4)) |
| `config.primaryDeitySnapshot` | `religion` | the `deity` fact (F16) |
| `config.peakTier` | `history.peakTier` (V08 §2.6c) | DR36 |
| `config.priority*` | — | ignored: §7.7 item 1 (the sliders' effect already sits in the records) |
| `economicState.prosperity` | `wealth.label` | DR6, DR7; the diff's `wealth` row (F9) |
| `economicState.incomeSources` | `economy.incomeSources` | the economy slice (item 78, `sectors` row); DR3's water fraction |
| `economicState.primaryExports`, `.primaryImports`, `.necessityImports`, `.transit` | `economy.exports`, `.imports`, `.transit`; `economy.goods` | DR3, DR10, DR33 |
| `economicState.isEntrepot` | `economy.entrepot` | DR4, DR33 |
| `economicState.foodSecurity.importPct`, `.chains` | `economy.foodImportPct`, `.foodChains` | `PortValues` (DR19) |
| `economicState.activeChains` | `economy.chains` | DR33 |
| `economicState.tradeDependencies` | `economy.dependencies` | DR10 |
| `economicState.tradeLinks` | `economy.tradeLinks` | DR3 |
| `economicState.customChains` | `customChains` | DR10; item 104 (b), (h) (V08 §3.13 (6)) |
| `economicState.safetyProfile.blackMarketCapture` | `security.blackMarketCapture` | the `crime` row → `PortValues.crime` |
| `economicState.compound.inst.hasWalls` | `walls.flagged` | DR2 |
| every other `economicState` field (`tier`, `situationDesc`, `economicComplexity`, `localProduction`, `institutionalServices`, `treasury`, the rest of `foodSecurity` and `safetyProfile`) | — | ignored: no derivation row reads it (the institutions and the income shares carry what the map uses) |
| `neighborRelationship`; `neighbourNetwork` | `economy.partners` | DR3 |
| `powerStructure.government` | `government.name` | DR11 (`government` row) |
| `powerStructure.factions` | `powers` | DR11, DR12, item 79 |
| `powerStructure.factionRelationships` | `powers[].relations` | `PowerRelation` (the `relations` row) |
| `powerStructure.publicLegitimacy.score` | `government.legitimacy` | `PortValues.legitimacy` |
| `powerStructure.criminalCaptureState` | `security.criminalCapture` | the `crime` row |
| every other `powerStructure` field (`stability`, `recentConflict`, `previousGovernments`, the labels) | — | ignored: no derivation row reads it |
| `institutions[]` — `name` | `name`, `kindLabel`, `count`, `openTop`, `popQualifier`, `qualifiers` (V08 §3.5.1 (a)) | DR9, DR24; the ladders |
| `institutions[]` — `catalogId`, `category`, `tags`, `priorityCategory` | `kind`, `category`, `tags`, `role` | DR24; item 103's profiles; DR12 |
| `institutions[]` — `facets`, `forbiddenResources`, `knownTo` | `facets`, `forbidden`, `knownTo` | DR10, DR16, DR17, DR20 |
| `institutions[]` — `status`, `worldPulseFate`, `_worldPulseInactive`, `impairments`, `remnantReason` | `state`, `fate`, `inactive`, `impairments` | DR25; §7.7 item 14's rows; F2–F5 |
| `institutions[]` — `demotedFrom`, `promotedFrom`, `foundedAt`, the receipt stamps (`createdByEventId`, `removedByEventId`, `…ByWorldPulseOutcomeId`, `_worldPulse*`) | `renamedFrom`, `founded`, `receipts` | F1–F6, F15 (§7.7 item 13); DR21 |
| `institutions[]` — `source`, `localUid`, `isCustom`, `customDefinition*`, the scene tokens, `required` | `custom` (V08 §2.8) | item 104 (a) at fold |
| `institutions[]` — `desc` | — | read inside the adapter for a custom record's keyword keys only (V08 §3.13 (3)); never carried |
| `institutions[]` — every other field (`baseChance`, `exclusiveGroup`, `magicLicense`, `serviceKeys`, `tradeRouteRequired`, `requiredForTier`, `builtReason`, …) | — | ignored: generation inputs whose effect is the record itself |
| `activeConditions` | `conditions` | `ConditionOverlay`; DR21; the `threats` row |
| `stress`, `stressors` | `stressors` (normalised into `conditions`) | the `conditions` row; the `threats` row |
| `npcs` | `notables` | the dossier-backed `Person` (V08 §3.11); the host projection's people order (V08 §5.4 (3)) |
| `history` (`age`, `historicalEvents`) | `history` (V08 §2.6c) | `HistoryHint`; DR30; DR36–DR39 |
| `isolationSupport.paths` | `site.isolation` | DR19 (the `isolation` row) |
| `availableServices` (custom entries) | `customServices` | item 104 (h) (5) |
| `availableServices` (other entries) | — | ignored: the institutions that provide them are read |
| `spatialLayout.quarters` (`name`, `location`, `landmarks`) | `quarters` | §7.7 item 16; DR5, DR14 |
| `spatialLayout.layout`, `.tradeAccess`, `quarters[].desc` | — | ignored: prose restating the terrain and access words |
| `customContentProvenance`, `customContentRoster` | `custom` (definition ids and revisions) | V08 §3.13 (1) |
| `populationHistory`, `tierHistory`, `calamityHistory` | `history` additions (V08 §2.6c); `calamities`; receipts | F7, F8; DR28; DR36–DR39; V08 §3.6 (3)'s epochs |
| `institutionHistory`, `resourceHistory` | receipts | F2, F6, F13 (§7.7 item 13) |
| the settlement root's `destroyedByEventId`, `lifecyclePatch`, `memberBirths` | `history.lifecycle` (V08 §2.6c); receipts | F20; DR36, DR38 |
| `decrees` and the week's `decreeCauses` | receipts | F18 |
| `_config`, `defenseProfile`, `resourceAnalysis`, `factions`, `relationships`, `prominentRelationship`, `conflicts`, `coherenceNotes`, `structuralViolations`, `structuralSuggestions`, `economicViability`, `userCanon`, `simulationTrace`, `generationCoherenceReceipt`, `aiOverlays`, `urbanFabric`, `npcLadder`, `traditions`, `campaignState.eventLog`, `_userEdits`, `dmLayer`, `locks` | — | ignored: §7.7 item 1's never-read list, each with its reason there |
| `culturalIdentity`, `culturalNotes`, `arrivalScene`, `pressureSentence`, `settlementReason` | — | ignored: prose (§7.7 item 1) |
| the realm block (`HostContext.realm`) | — (host context) | DR1, DR2, DR3, DR29 (V08 §3.11) |
| the week (`HostContext.week`) | — (host context) | §4.11's last dating rung (V08 §3.6 (1)) |

**Selection (J-V8.9).** `select` tries, in order: (1) `HostContext.line`, when given and registered — its
adapter must accept, else `E_LINE_UNSUPPORTED`; (2) the document's bound line (`bound`), when its adapter accepts — a
map stays on its line until a `fromLines` migration moves it (V08 §3.8); (3) the single registered adapter that accepts;
(4) at a creation with several accepting and none named, the NEWEST registered line, recorded in the binding and noted
`line_defaulted` — a declared default the report shows, never a silent guess; `E_LINE_UNSUPPORTED` naming the candidates
only when none accepts. The first registered adapter is `fp-integration-2026-09-23` pinned at `5d699cc68` (J86 Q1; §14),
and the line id has that one spelling everywhere (item 512).

**The catalogue manifest.** The adapter's build step writes
`plat/packages/tables/src/dossier/catalogue.fp-integration-2026-09-23.json` — each catalogue kind's `catalogId`, name,
tiers and category, read from the pinned line's catalogue, and `ladderPairs: { greater: string; lesser: string[] }[]`,
the ladder file's pairs as data (V08 §3.5.1 (f)) — which V11's `coversManifest` check (every kind has a `kinds` row)
and its ladder cross-check (every committed pair has a `dossier.ladders` row; V11 registry row 77, T-V11-2) read. It
carries names, tiers, categories and pairs of names only; no SettlementForge code is copied.

### 2.5 The digest's additions, the staged-record event and the per-settlement values

**Digest additions (item 509)** — dossier facts the staged readers and the bundled rules need, each read by one row (the history's additions are V08 §2.6c's; each path is V08 §2.4's field table):

```ts
// additions to §14's DossierDigest and DossierInstitution
  DossierInstitution.role?: string;          // SF's priorityCategory — the institution's generation-priority bucket (adventuring, crafts, criminal, defense, economy,
                                             // entertainment, exotic, government, infrastructure, magic, military, religion), read as DR12's first input (J-V8.45; item 397)
  DossierInstitution.tags: string[];          // (existing) normalised: lower-case, de-duplicated, in the line's tag vocabulary; an unknown tag kept and noted `unmapped_word`
  DossierInstitution.openTop?: boolean;       // a count range written "(lo-hi+)": members may exceed hi up to V11's per-kind-and-rung cap (V08 §3.5.1)
  DossierInstitution.popQualifier?: number;   // "(10,000+ only)": a population floor kept from the label, never a count (V08 §3.5.1)
  DossierInstitution.qualifiers: string[];    // the non-numeric parenthesised words of the name, case-folded, in order
  DossierInstitution.step?: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT';   // item 108 (a): from V11's dossier.ladders by kind, else the `qualifiers` row
  DossierInstitution.lesser?: string[];       // the lesser kinds of its ladder row (V11), for 108 (c)'s merge
  DossierInstitution.mergedInto?: string;     // set when 108 (c) merged this record into a greater present in the same dossier: the greater's key
  security: { blackMarketCapture?: number /* % of activity */; criminalCapture?: 'none'|'adversarial'|'equilibrium'|'corrupted' };
  government.legitimacy?: number;             // publicLegitimacy.score ÷ 100, in [0, 1]
  notables[].workplaceKey?: string; notables[].powerKey?: string;   // the named institution's and power's binding keys, resolved by name at digest (absent when the name joins nothing)
  powers[].relations: { with: string; kind: string; trend: string }[];   // (existing, extended) the line's type word and its `direction` word (a trend: stable, declining, escalating)
  conditions[]: + { source: 'condition'|'stressor'; severityBand?: string };   // (existing, extended) stressors normalised into it (V08 §3.11)
  site.ruinEvidence: { kind: 'ruins'|'ruinedLandmark'|'node'|'leyLines'|'magicalHistory'|'delving'|'undercity'; key?: string /* the record, deposit or event's binding key */; yearsAgo?: number }[];   // DR30 (V08 §2.6a)
  site.threats: string[];                     // the neutral sea-threat keys of the `threats` row (item 106 (d)), sorted
  site.latitudeDeg: number;                   // DR29's value (V08 §3.5)
  economy.chains: { key: string /* chain:cat:<chainId> */; chainId: string; label: string; needKey: string;
    resource?: { name: string; key?: string /* res:<deposit key> when resourceKey names a listed deposit */ };
    processors: { name: string; key?: string /* resolved by V08 §3.5 (6) */ }[] /* flow order */;
    outputs: { label: string; goods: string[] /* V11's goodWords over the label by V11 §3.13.5's matching rule; a label matching none resolves to the generic good `import`, noted unmapped_good */ }[];
    upstream: string[] /* chain:cat: keys of upstreamChains */; statusWord: string /* the line's word */; status: string /* the neutral key by `chainStatus` */;
    entrepot: boolean }[];                    // (existing, extended)
  economy.dependencies: { key: string /* dep:… */; institution: string /* binding key, else 'name:'+name */; resource: string; severity: number; affected: string[] }[];   // (existing, keyed)
  economy.goods: { exports: string[]; imports: string[]; transit: string[] };   // goods keys of primaryExports, primaryImports (with necessityImports) and transit by goodWords
  calamities: { key: string /* calamity:<week>:<slug(name)> */; name: string; type: string; week: number /* its tick */; deaths: number; exodus: number;
    severity: 'minor'|'moderate'|'major'|'catastrophic' /* by `calamitySeverity` over deaths ÷ the population at its week */; targets: { name: string; key?: string }[] }[];
// §14's RealmBlock.cell.latDeg (item 391) is set by realmBlockFrom when the realm map has a latitude scale (V08 §3.11); DR29's first input
```

**The staged-record event (item 358; J-V8.15).** The staged records of §2.7 are created, changed and retired only by one
dossier-only event kind, so they replay from the log like every other record:

```ts
// §7.1's EditEvent member (item 358): its fields and rules are stated here
| { t: 'dossierRecord'; kind: 'condition' | 'deposit' | 'powerRelation' | 'person' | 'customChain' | 'customService'; key: string /* the binding key: cond:<id>, cond:stress:<type>, res:<key>, res:uid:<localUid> or res:derived:<landuse> (V08 §2.6 `deposits`), relation:<a>|<b>, npc:<id>, chain:<chainId>, svc:uid:<localUid> */;
    op: 'put' | 'retire'; fields?: Record<string, unknown> /* on put: the record's fields as §2.7 declares them, less id, lifecycle and the derived fields
      (a DepositSite's bearingCdeg and landUse, written by S12a, V08 §3.11); for a person, its Posting and Membership targets as binding keys (V08 §3.11) */ }
    // author 'host' and session 'host:port' only (a user's or clerk's dossierRecord is refused F-EDIT dossier-owned, §7.7 item 11); EditBase.dossier and .dossierChange set; its
    // address: the record kind's by §6.3 (the binding key, §6.3's table); fold: `put` creates the record or rewrites its fields in place, `retire` ends its
    // lifecycle (a condition's untilWeek reached, a deposit removed, a relation dissolved, a notable dead or gone) — the record stays as a tombstone for §6.3's
    // supersedes table; never an undo, redo or revert target (§7.4's dossier rule); migration: none needed (new in this volume's schema step, §7.5)
```

**The per-settlement values (item 389; J-V8.16).** `PortRows.crime`, `.hinterland.importPct` and `.foodChain`, and `.legitimacy`
(§10.2) are per-settlement dossier values that move with time, not vocabulary; a table edit would re-derive from the
table's first reader stage (§7.6), which is the reshuffle item 22 forbids. So they ride the circumstance slice, like the
typed slices of items 77–79, with two more values that move at epochs — a realm latitude that arrives after creation and the sea threats:

```ts
interface PortValues { crime: number | null /* [0, 1] */; importPct: number | null /* [0, 1] */; foodChain: Record<string, boolean> | null; legitimacy: number | null /* [0, 1] */;
  latitudeDeg: number | null /* null: Intent.latitudeDeg (DR29) is in force */; threats: string[] | null /* null standalone: the preset row decides DR2's waterfront */ }
// CircumstanceSlice gains `port: PortValues` — recipe data at creation (the timeline's first entry), epoch data afterwards (§4.11's cadence), every field
// null standalone. Resolution rule for the base's readers: the value of PortRows.crime / hinterland.importPct / hinterland.foodChain / legitimacy in force is
// the current slice's `port` value when it is not null, else the table's (empty in the base: every factor 1, every list empty — T88-1 unchanged); the site
// latitude in force is `port.latitudeDeg` when not null, else Intent.latitudeDeg, else 50; DR2's waterfront reads `port.threats` when not null.
// PortRows keeps its vocabulary rows (impairments, customKinds, farmlandScale) as tables.
```

### 2.6 The dossier row sets, written out

§14 names the row sets and §7.7 states the rules that read them; the base writes out only the status rows, the receipt
rows, the quarter biases and phrases (§7.7 items 13, 14, 16) and the calendar (§4.11). Every other row set's default rows
are these. Each is a versioned `@plat/tables` table (§7.6): SettlementForge's words in the left column, the header naming
the line `fp-integration-2026-09-23`, every cell `{ value, unit, provenance: own }` with `calibratable: false` — a
dossier row set is a derivation rule of the port (item 20 (h)), never calibrated (§13.9 (7); V11 §3.1 rows 63–66,
J-V11.65; V12's R4); a value changes only as a table fix reviewed with V11, V12's register holds no entry for it, and
T-V11-37 fails the build on a `dossier.*` column marked calibratable (J-V8.107). A
word the fixtures carry and a table lacks is caught by T73-10's totality test; the declared fallback is the row marked
"else". Every "else …, noted" below writes one `unmapped_word` note (args: the word; V08 §4.6), and the `kinds` row's
`'@none'` a `not_placed` note.

* **`tiers`** (title word; the rung is the population's, DR23): `thorp`, `hamlet`, `village`, `town`, `city`,
  `metropolis` → the same word as the map's title (§9.5); else the word itself, noted `unmapped_word`. Its `band`
  column is SettlementForge's own population band per word — `thorp` 8–60, `hamlet` 61–400, `village` 401–900, `town`
  901–5 000, `city` 5 001–25 000, `metropolis` 25 001–100 000 (CONFIRMED on the line) — read by V08 §2.6c's evidence
  (a population's tier) and by the effective peak's size (V06 §3.20.1 (2), at V11's `history.symbolicQuantile` of the
  band).
* **`site`** (`terrain` → S0's site request, DR1; the relief class is S0's `relief` field, §4.2 S0, and the one V04's
  cavern rows and fissure gate read, g item 109 (a) (1); item 110 reads the same relief for its terraces — (a), where the
  relief row asks for them — and its viaduct drop — (b), a ravine or valley past `viaduct.minDropM` — and `desert`'s arid
  biome raises the aqueduct's chance and need, (b), through V11's rows): `plains` → relief `plain`, no water beyond the site row's own
  river chance; `riverside` → relief `auto`, a river through the site, its inflow bearing drawn on `blueprint.features`;
  `coastal` → relief `auto`, a coast, its side drawn on `blueprint.features`, a harbour by `access`; `hills` → relief
  `hilly`; `mountain` → relief `mountainous` (the spur-or-terrace forms follow from it), a pass when a `defended_pass`
  deposit is listed; `forest` → the forest toggle on, woods in the hinterland;
  `desert` → relief `auto` and the arid biome row (V11's climate row with item 111's oasis chance, water-pull weight
  and sunlight cell), keeping every water setting a site can have (item 111 (a)): the water the dossier's other words
  give — access `river` (a river) or `port` (a harbour basin), a realm cell's river or coast, the water deposits DR1 reads
  (`river_fish`, `river_mills`, `river_clay`, `fertile_floodplain` a river; `deep_harbour` a coast; `fishing_grounds` open
  water, a coast or a lake by S0's draw) — stands at chance 1 as on any terrain; a desert with none of them draws river,
  lake and coast at the arid row's chances (§4.2 S0–S1); an `oasis_water` deposit makes an oasis exist (DR40) beside
  whatever else the site holds, and without one the arid row's oasis chance applies, likelier with no other water
  (§4.2 S1); the toll-bridge rule reads this row for its dry desert (V08 §2.6b (3)); the older words `grassland` →
  plains,
  `river` → riverside, `swamp` → plains with a marsh land use; else plains.
* **`access`** (`tradeRouteAccess` → gates and through routes, DR2, DR3): `road` 2 gates on 1 through route; `crossroads`
  3–4 gates on 2 through routes; `river` 1–2 gates, a water gate and docks, the river a route; `port` a harbour basin and
  1–2 gates; `isolated` 1 gate on a track-class approach; `none` 1 gate, no through route; `mountain_pass` 2 gates on 1
  route through a pass; else `road`. The gate range is the bar T73-5 reads. Unwalled, a "gate" is a road entry
  (a junction of kind `gate` with no enceinte).
* **`threat`** (`monsterThreat` → `Intent.defence`, DR2): `safe` 0.1, `heartland` 0.2, `civilized` 0.3, `frontier` 0.6,
  `plagued` 0.8; else 0.3.
* **`deposits`** (deposit key → resource family and hinterland land use, DR19): `iron_deposits`, `precious_metals`,
  `gemstone_deposits`, `coal_deposits` → ore / `mine`; `stone_quarry` → stone / `quarry`; `managed_forest`,
  `mountain_timber`, `shipbuilding_timber` → timber / `lumber` and `coppice`; `ancient_grove` → timber / a reserve wood;
  `fishing_grounds`, `river_fish` → fish / `fishery`; `river_clay`, `glass_sand` → clay / `claypit`; `grain_fields`,
  `fertile_floodplain` → fertile / `arable`; `grazing_land`, `alpine_pasture`, `camel_herds` → fertile / `pasture`;
  `date_palms` → `orchard`; `salt_flats`, `desert_salt` → `saltpan`; `marshlands` → a `marsh` land use; `hunting_grounds`,
  `foraging_areas` → `wildwood` and `commons`; `deep_harbour` → the harbour chance 1; `river_mills` → the mill classes on
  the river; `hot_springs`, `hot_springs_mineral` → a bath-house site; `magical_node` → II.6's supply term (V05's node
  term of `h_town`) AND ruin evidence `node` (DR30), its `DepositSite` drawn at V04's `ruinCentre()` when a ruin exists
  whose source is not the node itself, else at DR19's site (g item 109 (f)); `ancient_ruins` → the ruin system's existence
  source, evidence `ruins` (DR30; V04 §3.5.0a (1) (a)), its `DepositSite` carrying the surface ruin decoration, which
  becomes the system's surface marker and, where V04 places one, its entrance (g item 109 (b)); the mining deposits
  `iron_deposits`, `precious_metals`, `gemstone_deposits`, `coal_deposits` and a copper deposit when the line lists one →
  also the cavern mining test's trigger (DR31; V04 §3.5.2's `mineBoost`); `crossroads_position` → a second through
  route; `defended_pass` → a
  pass toward one bearing drawn on `hinterland.outside`; `oasis_water` → the oasis (DR40: a spring-fed pond or small lake with its grove and irrigated gardens, §4.2 S0–S1, V11's rows); a custom deposit → its custom
  kind's row; else a `commons` land use, noted. A `depleted` deposit is drawn worked out (spoil heaps, a stump field);
  `removed` draws nothing; `discovered` opens its land use at the next epoch. **A land use a record needs (item 20 (h):
  derived, never asked).** A record whose class — by its `kinds` row — carries a hard
  `near` → `landuse:<k>` row within 0 (V11 §3.5.10: `salt_works` → `saltpan`, `peat_works` → `marsh`), on a dossier that
  lists no deposit opening `<k>` (`salt_flats` or `desert_salt`; `marshlands`, or the `site` row's `swamp`), opens a face
  of that land use as its deposit would: the port puts a `DepositSite` under the key `res:derived:<k>`, family `salt`
  (`saltpan`) or `peat` (`marsh`), state `available`, which S12a sites at DR19's site and whose land use it opens (V08
  §3.11), and the report notes `derived_landuse`. One site per land use, however many records need it. A land use §4.9's
  rings already give derives nothing — `sheepfold`'s `pasture`, and `wildwood`, one of `druid_grove`'s two alternatives; the two land uses above are the whole row today, and T-V8-18's totality clause fails when a `kinds`-bound class
  gains a hard row to another land use the rings do not give, until this row names it. Its life: it is derived only
  while no deposit opens the land use when the record arrives; a deposit of that land use listed later (a new or
  `discovered` one) opens its own face by the row above and the derived site stays where it stands — least disruption,
  nothing standing moves; when no record needing it remains, it is put `depleted` (drawn worked out) and never removed; its events are the port's `dossierRecord` events (no undo target, §7.4). A custom record, whose
  class is decided at fold after the port has written its events (V08 §3.5 (5) (f)), opens none: its hard row takes the
  base's closest option, reported, and the DM may paint the land use (J-V8.95). At a village rung V07 §3.9's claim and
  the base's S12a read the derived site unchanged.
* **`landmarks`** (a landmark string → the feature that carries its name, a named-feature claim, §7.7 item 16): a string
  ending in `Row` or `Street` → a way's name, lane or secondary class; `Lane` → a lane; `Close` → a cul-de-sac;
  `Alley` → an alley; `Bridge` → a bridge; `Wharf`, `Landing` → a quay; `Common well` → a `well` pin; `Notice post` →
  a `notice` pin; `Slaughterhouse` → the name of the shambles use the roster already places; `Estates`, `Garden
  District`, `Sailors' Quarter` → a sub-area label on the quarter tree; `The Warren (slums)` → the name of an informal
  cluster or back court (items 30, 70); a string ending in `(tavern)` → that tavern use's name; `Drying racks`,
  `Net mending post`, `Beaching ground`, `Timber stacks`, `Tool shed`, `Charcoal pit`, `Alehouse` → village-product rows
  (a named yard part or use there; nothing on a town map); else nothing is created for the string (J-M2). The strings
  are never item 110 (b)'s dossier landmarks and never count an institution a second time (DR35 reads institution
  records instead).
* **`distribution`** (an institution record → assignment granularity, DR9; keyed by the record's `kinds` row — its
  class or pseudo-class — and its ladder step, never by a bare name): a pseudo-class routes as the `kinds`
  shape below states (`@housing` → no assignment, DR7's range; `@wall` → DR2's walls list; `@absent:<class>[+<class>]`
  → S2's zeroed classes; `@none`, `@office`, `@seat`, `@layer:*`, `@landuse:*`, `@pin:*` → their readers); step
  COUNT, or a count range → `dispersed` (members `#k`); step GUILD → `building` (the hall — a member `#k` of a guild
  COUNT record of its family when the dossier holds one, V08 §3.5.1 (c)) plus a `dispersed` collective of the
  trade's members tied to it; step QUARTER, or a district-scale record (`districtScale`) → `neighbourhood`, owning the
  trade's members (V01; item 108 (a); at a village rung, V07 §3.10's end claim); step SIZE or REPLACEMENT →
  `building` (one, scaled by V11's factor); a CUSTOM record, whose class is decided at fold (V08 §3.5 (5) (f)) →
  `building` unless V08 §3.5.1 (e) types its step; every other class → `building`.
* **`wealth`** (`prosperity` → `Intent.wealthLevel` and the band the T73-7 bar reads, DR6): `Subsistence` 0.05 squalid;
  `Struggling` 0.2 poor; `Poor` 0.35 poor; `Moderate` 0.5 modest; `Comfortable` 0.65 comfortable; `Prosperous` 0.8
  prosperous; `Wealthy` 0.95 rich; else `Moderate`.
* **`sectors`** (income source → §10.2's sector, item 78): trade ← `Market Taxes`, `Entrepôt Trade`, `International
  Commerce`, `Port Duties`; taxes and tolls ← `Gate Tolls`, `Toll Revenue`, `River Tolls`, `Court Fees & Fines`; crafts ←
  `Iron & Metalwork`, `Wool & Textile Trade`, `Guild Fees`, `Guild Licensing`, `Apothecary & Alchemy`, `Herbalist &
  Apothecary`; agriculture ← `Agricultural Rents`, `Grain Sales`; extraction ← `Stone Quarrying`, `Timber Trade`; fishing ←
  `Fish & Preserved Produce`, `Fish & Maritime Produce`; finance ← `Banking Fees`, `Financial Services`; religion ←
  `Church Tithes`; military ← `Military Levy`; magic ← `Spellcasting Services`, `Arcane Industry`; crime ← `Criminal
  Syndicate Revenue`, `Smuggling Network Revenue`, `Black Market Revenue`; magic also ← `Magical ley lines`
  (named by the line's income data, g item 109 (b); absent from the 35 surveyed births; it is also ruin evidence
  `leyLines`, DR30); none (dropped, the rest renormalised,
  J-A78.71) ← `Property Rents`; else none, noted. The water / road split of §7.7 layer 2 marks `Port Duties` and `River
  Tolls` water and `Gate Tolls` and `Toll Revenue` road.
* **`government`** (government name → `Government.kind`, DR11): chartered commune ← `Town Council`, `City Council`,
  `Grand Council`, `Guild Council`, `Elder Council`, `Household Council`, `Free Elder Council`, `Elected Reeve`,
  `People's Council`; merchant oligarchy ← `Merchant Guild Council`, `Merchant City Council`, `Grand Guild Consortium`,
  `Merchant oligarchy`; seigneurial ← `Feudal Stewardship`, `Feudal Appointee`, `Noble Governorship`, `Ducal
  Governorship`; ecclesiastical ← `Church Council`; else chartered commune, noted. An `Occupation Authority` power marks
  the seat occupied (a condition overlay, V08 §3.11), never a government kind.
* **`powers`** (a power's category and name → `Faction['kind']`, item 79): `economy` → `guild` when the name holds
  "Craft", `company` when it holds "Merchant", "Trade" or "Grain"; `religious` → `religion`; `noble` → `lordship`;
  `government` → `council` for a council, `lordship` for a stewardship or governorship; `criminal` → `criminal`;
  `military` → `military`; `magic` → `arcane`; `other` → `council` for a crisis bloc (`Claimant Bloc A`, `Claimant Bloc B`,
  `Peace Faction`, `War Council`, `Quarantine Council`, `Departure Committee`, `Investigation Faction`, `Third Bloc
  (Neutrals)`, `Rival Faction B`, `Creditor's Representative`, `Reform Congregation`, `People's Council`, `Resistance
  Network`, `Occupation Authority`) and `company` for `Monster Hunters` or `Adventurers`; the name `Unknown Faction
  (hidden)` → `secret: true` with its category's kind; else `council`, noted.
* **`conditions`** (an archetype → its `ConditionOverlay` effects, DR21 and V08 §3.11): `under_siege`, `war_pressure` →
  a siege tint, construction Works paused except fortification repair; `plague`, `plague_onset` → a quarantine tint,
  Works durations × 1.5; `famine` → Works × 1.25, the market activity scalar × 0.8; `mass_migration`,
  `regional_migration_pressure` → item 70's tent clusters at the edge at the next epoch; `occupied`, `vassal_extraction`
  → an occupation mark on the seat; `reconstruction` → the repair share of an epoch's Works × 1.5; `boom` → the
  construction share × 1.3; `bust` → vacancies × 1.3; `resource_strike`, `vein_exhausted` → no record of their
  own (the deposit's state change arrives as its own `resource` fact, F13, which puts the `DepositSite`) and no tint;
  `trade_route_cut` → no tint: the trade slice at the next epoch (F14 carries the partner change); `food_anchor_lost` →
  no tint: the hinterland row at the next epoch (`PortValues.importPct`, `foodChain`); `stressor_residual`,
  `custom_crisis` → no tint, noted; `monster_pressure` → the defence level + 0.2 and wall-repair Works; `religious_conversion` → a
  temple's dedication at the next epoch; `wartime`, `slave_revolt` → the siege tint without the pause; the political
  archetypes (`rebellion`, `insurgency`, `faction_challenge`, `politically_fractured`, `succession_void`,
  `dominant_npc_removed`, `corruption_exposed`, `infiltrated`, `recently_betrayed`, `indebted`, and every `regional_*`)
  → no tint: the dials at the next epoch; else no tint, noted. The row reads the archetype alone: a condition is put
  whatever its `status` (`stable`, `worsening`, `easing` — the line's three words; the list holds only live conditions), and a stressor is read through the same row under its type (the fifteen stressor types are all archetype words
  here).
* **`impairments`** (`PortRows.impairments`' vocabulary): physical — `capacity`, `infrastructure`, `access`,
  `supply_starved` — `conditionSteps` 1 per severity band (≥ 0.34 worn, ≥ 0.67 neglected); non-physical —
  `legitimacy`, `influence`, `wealth`, `staffing`, `corruption` — `conditionSteps` 2 per unit of severity on the
  institution's own dial term (§4.5 (6)); a `covert` impairment is never shown on a public view (DR20).
* **`crime`** (new; `PortValues.crime`): crime = min(1, 0.6 × `blackMarketCapture` ÷ 100 + w), w by `criminalCapture`:
  `none` 0, `adversarial` 0.1, `equilibrium` 0.25, `corrupted` 0.4; both absent → null (the table's neutral).
* **`cultures`** (new; `site.culture` → DR29's latitude, degrees north): `germanic` 51, `latin` 43 (`mediterranean` an
  alias), `celtic` 54, `arabic` 30, `norse` 62, `slavic` 54, `east_asian` 35, `mesoamerican` 19, `south_asian` 23,
  `steppe` 47, `greek` 38, `mixed` 50; else 50. Each culture's centre of gravity, rounded; not calibratable (a table
  fix; J-V8.26).
* **`categories`** (new; SF grouping → the generic class family DR24 falls back to): `Adventuring` → adventuring;
  `Crafts` → craft; `Criminal` → criminal; `Defense` → garrison; `Economy` → trade; `Entertainment` → entertainment;
  `Exotic` → exotic; `Government` → civic-authority; `Infrastructure` → infrastructure; `Magic` → arcane; `Religious` →
  worship; `Essential` → civic-authority; else trade, noted (an alias family never names a generic class: `civic` resolves
  to `civic-authority`, `defence` to `garrison`, V11's compiler rule). A CUSTOM record's category is free text (V08 §2.8): the case-folded text is
  matched against the rows above, then against SettlementForge's eight content groups — `government` → civic-authority,
  `infrastructure` → infrastructure, `economic` → trade, `military` → garrison, `religious` → worship, `arcane` → arcane,
  `criminal` → criminal, `social` → entertainment — then against V11's synonym rows (`categorySynonyms`, below). The
  match is the INPUT of item 104 (a)'s category rung (V11 §3.13.1 rung 3), resolved at fold (V08 §3.5 (5) (f)):
  `Other` and a text nothing matches give that rung nothing, and the resolver falls through its later rungs to
  `generic-other` (item 104 (a) (7)'s fallback, its row V11's). Each family's generic class row — `generic-<family>`, with its footprint template,
  band and relation rows — is a roster class volume V11 writes beside the others.
* **`tags`** (new; SF tag → our siting-profile family key, item 103 (a)'s "default profile by tag"; J-V8.19): `public_authority`,
  `civic` → civic-authority; `legal`, `law` → law-court; `security`, `public_order`, `law_enforcement` → watch; `defense`,
  `military` → garrison; `fortification` → fortification; `welfare` → welfare; `healing` → healing; `education`,
  `scholarly` → school; `religious`, `church`, `divine` → worship; `monastery` → monastic; `economic`, `trade`, `economy` →
  trade; `market` → market; `craft` → craft; `metalwork` → metalwork; `leather` → leatherwork; `textile` → textile;
  `timber` → timber-yard; `shipbuilding` → shipyard; `agriculture` → farming; `food` → food; `resource_extraction` →
  extraction; `industry` → industry; `warehouse` → warehouse; `port` → port; `banking` → finance; `guild` → guild-hall;
  `luxury` → luxury; `exotic` → exotic; `arcane`, `magic`, `enchanting` → arcane; `alchemy` → alchemy; `planar` →
  planar; `infrastructure` → infrastructure; `transport` → transport; `housing` → housing; `lodging` → lodging;
  `sanitation` → sanitation; `water` → water-supply; `adventuring` → adventuring; `underground` → underground;
  `information`, `brokerage` → information; `criminal`, `illicit` → criminal; `smuggling` → smuggling; `essential` → no
  family (a demand flag); else no family, noted `unmapped_word`. The profile content of every family key (emits,
  sensitive-to, needs, clientele, supply, alignment, competition, coverage) is volume V11's.
* **`kinds`** (catalogue kind → our class; DR24's first rung): one row per catalogue kind `{ kind: string /* the
  catalogId, e.g. 'tannery' */; class: string /* a roster class, or a pseudo-class of V11 §3.11: '@housing' → DR7's range; '@wall' → DR2's walls list; '@layer:sewer', '@layer:undercity' → II.7's existence
  (the sanitation and subterranean rows of V04 §2.3a); '@seat', '@office' → §10.2's government rows (a seat class, an
  office on its seat, no building of its own); '@landuse:<kind>' → DR19's land uses; '@pin:<kind>' → a §2.7 pin;
  '@absent:<class>[+<class>]' → S2: each named class's `min` and per-capita demand 0 at the settlement unless another
  record binds that class — a village using a neighbour's mill or parish church; at a village rung each named class is
  read through its `villageForm` by V07 §3.11 step 1; one class string, several classes
  joined by '+', e.g. '@absent:watermill+windmill' (V11 §3.11); '@none' → no placement, noted */; family?: string /* a tags family key that overrides the tags' default */; implies?: 'bridge'
  /* a feature the kind implies; V11 writes it, today for `toll_bridge` only; read by DR1 at creation (V08 §2.6b (3); item 399) */ }`. A pseudo-class
  is the ONE route for its record: housing and walls are no longer decided by the `distribution` row or a name list. Its SHAPE, its lookup chain (V08 §3.5 (5)) and its totality bar are this volume's; its rows — one
  per catalogue kind of the line, 280 at the pinned line (the count read from `dossier.catalogue`, never written into a
  bar) — are written by volume V11 beside each kind's siting profile (J-V8.18). At M1 the
  rows cover M1's classes (J-P11, §16); every other kind falls to its category's generic class, reported `unmapped_kind`.
* **`archetypes`**, **`categorySynonyms`**, **`keywords`** (new; item 104 (a) (2), (3), (6); their SHAPES and lookups are
  this volume's, their ROWS volume V11's, J-V8.18): `archetypes` — one row per scene archetype `{ id: string /* e.g.
  'agrarian-mill' */; class: string /* a roster class */; family: string /* a tags family key */;
  village?: ArchetypeVillageCell /* typed once by V11 §2.8 (class and elseClass — v.<id> classes —, pin, delta,
  composition, ruin), V11's rows from V07 §2.4's substitutions: read at village rungs by item 104's resolver before
  V11 §3.22's villageForm */ }`, exactly the 17 ids
  the line's manifest lists (totality: T-V8-25); `categorySynonyms` — `{ text: string /* case-folded free text, ≤ 100
  chars */; group: string /* a categories row key or content group */; family?: string /* when set, wins over the group's
  family (a farm by category is a farm, not a shop) */ }`; `keywords` — `{ key: string /* a lower-case token of ≥ 3
  letters or a two-token phrase */; family: string; weight: number /* ≤ 0.5, the weakest signal (item 104 (a) (6)) */;
  near?: { cls: string; withinM: number; weight: number } /* an authored soft row the resolver adds at the keyword's rank
  (V11's `catacomb` and `ossuary` rows use it) */; class?: string /* the record's class when the resolver's rungs 1–5
  give none stronger */; specialisation?: 'stepped_temple'|'terraced_palace'|'tiered_tower' /* V11 §3.24.3's id */;
  binds?: 'cryptAlways' /* the record's building takes `crypt: always` (V11 §3.5.8) */ }` — the effects of `class`,
  `specialisation` and `binds` are item 104's resolver's, as V11 §3.13.2 states them (X-V11-1, X-V11-6).

* **`relations`** (new; a power relation's type word → `PowerRelation`'s neutral `kind`, its sign and strength, read by
  §4.5's typing and item 72's political component): `symbiotic` → `ally`, +1, 0.6; `dependent` →
  `dependent`, +1, 0.5; `subordinate` → `subordinate`, +1, 0.4; `competitive` → `rival`, −1, 0.5; `tense` → `tense`, −1,
  0.6; `corrupted` → `corrupt`, +1, 0.3, hidden (never on a public view, DR20); else `neutral`, 0, 0.3, noted. The trend
  word (the line's `direction`: `stable`, `declining`, `escalating`) scales the strength: `escalating` × 1.25 (capped at
  1), `declining` × 0.75, else × 1. Own values, not calibratable (a table fix). The line's `pair` order is not a direction (CONFIRMED: of
  city-1's four `subordinate` pairs, three name the superior first and one last), so the key stays unordered and no
  relation is read as directed (J-V8.52).
* **`historyScars`** (new; a history event type → a `HistoryHint` scar): `disaster` → a scar of type `fire`
  when its name or template word holds fire, blaze, burn or burning, `flood` when it holds flood, deluge or storm surge,
  else `disaster` (S2's stage count reads it; II.7.6 reads only `fire` and `flood`); `occupation_infiltration` → `siege`;
  `magical` → no scar, ruin evidence `magicalHistory` (V08 §2.6a); `economic`, `political`, `religious`, `demographic`,
  `exile_return` → no scar; else no scar, noted. Severity words: `minor` 0.3, `major` 0.6, `catastrophic` 0.9; else 0.5.
* **`magic`** (new; `magicLevel` → `site.magic` → `CircumstanceSlice.magic`, read by II.6, item 68's lights and item 109
  (f)): `none` → `none`; `low` → `low`; `medium` → `low`; `high` → `high`; else `none`, noted. `medium` — 32 of the
  35 births, CONFIRMED — reads as `low` under D-3's realism floor (J-V8.47): magic present but not shaping the town.
* **`era`** (new; `site.culture` → `CircumstanceSlice.era`, a key of V11's `EraRow`, V11 §3.19.2): every culture of the
  `cultures` row → `c14`, V11's default row, region `western`; else `c14`. This row is the era derivation's one home:
  it reads the culture alone, never the tier (V11 §3.19.2 cites it). The line has no era field, so item 110's era
  modifier is one constant on dossier maps and the culture is the discriminator (V08 §2.6b (4); J-V8.71).
* **`materials`** (new; a custom record's `materialFamily` → the V11 material id whose largest walls share selects the
  material row, DR15; the six words of the line's enumeration, CONFIRMED in its custom-content manifest): `brick` →
  `brick`; `stone` → `ashlar`; `marble` → `ashlar`; `ruined-stone` → `rubble`; `timber` → `timber_frame`; `steel` →
  `ashlar` with a note (no steel frame under D-3's realism floor); else no material, noted.
* **`customWeights`** (new; a custom definition's `economicWeight` and `criticality` words → the numbers of
  `PortRows.customKinds`, read by V08 §3.11's custom kinds; J-V8.108): `economicWeight` — `minor` 0.25, `moderate` 0.5,
  `major` 0.75, `backbone` 1; `criticality` — `critical` 1, `important` 0.6, `discretionary` 0.3; else the field is left
  unset on the row (the roster's default), noted.
* **`isolation`** (new; `isolationSupport.paths[].type` → `site.isolation.paths`, DR19; `research/sf/mapping.md` row 17):
  `magical_transit` → a `teleport_circle` use (V11's class, sited by its own class row near the market or the castle),
  placed as a map derivation (`existence: 'map'`) only when no dossier record already binds that class (J-V8.48);
  `seasonal_access` → a named-feature claim (§7.7 item 16) naming the through route of the longest approach "Winter
  road"; `local_foodshed`, `hinterland`, `reserves`, `patronage` → nothing beyond §4.9's defaults; else nothing, noted.
* **`chainStatus`** (new; `activeChains[].status` → the neutral status key whose weight V11's `siting.web.chainStatus`
  holds; item 105 (i)): `running`, `operational` → `active`; `vulnerable` → `vulnerable`; `impaired` →
  `impaired`; `entrepot` → `entrepot` (its ends item 104 (b)'s import and export pulls, through the store at the gate or
  quay facing the partner); `magically_sustained` → `sustained`; else `active`, noted. The weights are V11's `siting.web.chainStatus`
  cells, one per neutral key (J-V11.52); the port never holds a weight (J-V8.49).
* **`dependencySeverity`** (new; `tradeDependencies[].severity` → the number DR10 reads): `critical` 1.0, `severe` 0.8,
  `vulnerable` 0.6, `moderate` 0.4, `minor` 0.2; else 0.5, noted.
* **`calamitySeverity`** (new; a calamity's deaths ÷ the population at its week → `CalamityRef.severity`, V06's band):
  below 0.01 `minor`; below 0.05 `moderate`; below 0.15 `major`; else `catastrophic` (the lit city-1 storm, 2 081 of
  23 178 ≈ 0.09, is `major`). Own values, not calibratable (a table fix).
* **`qualifiers`** (new; a non-numeric parenthesised word of an institution's name → its ladder step when V11's
  `dossier.ladders` names none for the kind; item 108): `multiple` → COUNT; `guild` → GUILD; `district`,
  `red light district` → QUARTER; `established` → SIZE; `commercial`, `part-time`, `official`, `if walled`, `resident`,
  `open cast`, `word of mouth`, `divine, 1st level`, `powerful` → no step (kept in the label); else no step, noted. The
  fourteen words are the survey's full list (CONFIRMED on the births).
* **`threats`** (new; → `site.threats` and `PortValues.threats`, which DR2's waterfront reads through V11's
  `WaterfrontThreatRow`; item 106 (d)). A site is sea-exposed when its terrain is `coastal` or its access is
  `port`. `naval` ← a `wartime` or `under_siege` stressor, or a `war_pressure`, `under_siege` or `wartime` condition, on
  a sea-exposed site; `hostileSeaPartner` ← a trade partner DR3 reads as hostile whose mode is `sea`, on a sea-exposed
  site; `seaMonster` ← a `monster_pressure` stressor or condition, or `monsterThreat` `frontier` or `plagued`, on a
  `coastal` site; `exposedPort` ← access `port` with a population of 20 000 or more and no other key; an inland site → no
  key. `raider` is never produced from a dossier: the line has no raid or piracy word (CONFIRMED over its fifteen
  stressor types and every fixture's condition archetypes), so `raider` stays a standalone and pack key (J-V8.50); an
  archetype word the `conditions` row lacks is `unmapped_word` and yields no key (T-V8-18's totality clause). A change of the keys re-evaluates DR2's waterfront at the next epoch by item 106
  (f)'s least disruption.
* **`ruinEvidence`** (new; DR30; → `site.ruinEvidence`): the rows of V08 §2.6a (1).

### 2.6a Item 109's dossier sources and the burial and crypt trace (DR30–DR32)

The port adds no underground behaviour of its own. The ruin, the caverns, the catacombs, their access and growth are
volume V04's; the crypts volume V03's (with V02's forced basement); the classes and ladder rows volume V11's; the epochs
volume V06's. The port owns three things: the evidence and drivers it carries, the binding of each record to its class,
and the lifecycle rules that keep a closure or a tier change from shrinking or orphaning anything below (item 109 (k) as
revised ~20:05, J111: "switch it then, cathedral also gets crypts but cemetaries get catacombs").

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
`ancientYears`, the one constant (J-V8.51). Weights and chances are V04's `RuinRule`; the port carries evidence, never a
chance.

**(2) The derivation rows** are §7.7's DR30 (the ruin system's existence, source, age and centre), DR31 (the cavern
drivers) and DR32 (the burial faces, the crypted churches and the church count), their inputs read in the order written
there; T-V8-32 and T-V8-33 hold their bars.

**(3) The burial and crypt trace, record by record** (the line's names, CONFIRMED over the 35 births: every birth
carries exactly one burial record for its tier, and a metropolis the `Cemetery network` beside it):

| record | class (V11 `kinds`) | ladder step | feeds | never |
|---|---|---|---|---|
| `Burial ground` (thorp, hamlet), `Graveyard` (village) | `cemetery` | REPLACEMENT (`graveyard` over `burial_ground`); both lessers of `parish_burial_grounds` (COUNT) (V11 §3.12) | a burial face below TOWN, which forms no catacomb (item 109 (k) (1)); V07's village routing | a catacomb source |
| `Parish burial grounds` (town) | `cemetery` (dispersed) | COUNT over `graveyard` and `burial_ground`, its members the burial faces, one per church plot's churchyard (V11 §3.12); itself a SIZE lesser of the city's record (V11 §3.12) | V04's candidates, beside each church plot's churchyard part (derived map-side, §4.9) | — |
| `Burial grounds and charnel house` (city, metropolis) | `cemetery`, with its charnel part (V11, routed) | SIZE over the lesser burial records | V04's candidates; the charnel house the surface ossuary whose fill item 109 (k) (5)'s bone reuse raises | — |
| `Cemetery network` (metropolis) | `cemetery` members beyond the gates (V11's COUNT row: one per gate on a through route, each extramural) | COUNT | V04's candidates, a metropolis's first (item 109 (k) (2); V04's rank) | — |
| `Monastery or friary`, `Multiple monasteries`, `Major monasteries (5-10)` | `monastery` | COUNT for the plural forms | each monastery's burial yard a burial face; its church counted once in the church count | — |
| `Cathedral (10,000+ only)`, `Great cathedral` | `cathedral` | `Great cathedral` SIZE over the other (V11, inferred) | V03's crypt, always, the settlement's largest; both present (`metropolis-3`) → ONE cathedral building, the lesser re-bound as its member (`ladder_merged`), one crypt | a catacomb source |
| `Parish church`, `Parish churches (2-5)`, `(10-30)`, `(50-100+)` | `church` | COUNT; a lesser range merged into the greater's (item 108 (c)) | V03's crypts by the crypted-class rows; V04's CITY and METROPOLIS count reads the placed church members plus the cathedral and each monastery's church, each once | a catacomb source; the sum of two ranges (all three metropolises carry both `(10-30)` and `(50-100+)`) |
| `Access to parish church` | `@absent:church` (V11 §3.11) | — | S2's `church` `min` and per-capita demand 0 at the settlement unless another record binds a church (the parish church is a neighbour's); at a village rung through `church`'s `villageForm` by V07 §3.11 step 1 | a building; the count |
| `Priest (resident)` | `@office` | — | an office on the church | a building; the count |
| `stone_quarry` (a deposit) | its `DepositSite` and S12a's quarry working | — | at CITY and METROPOLIS only, a worked-out working (its deposit `depleted`, or V04's own exhaustion) is V04's quarry-ossuary candidate, taken after every burial face | a candidate at TOWN |
| `Underground city` | `@layer:undercity` | — | the undercity's `require` (DR17); evidence `undercity` | — |

A church plot's churchyard part is a burial face (derived map-side by V04 and V11); the church building never is, and
neither is the cathedral or a monastery's church (0 catacombs sourced on a church, T-V8-33).

**(4) Closures, steps and deaths (the diff rules of DR32; V08 §3.5, §3.6).**
* **Ruin evidence** that appears or leaves (a deposit `discovered` or `removed`, a delving record added) is an `attr`
  change of the `evidence` singleton; V04 re-evaluates the ruin at the next epoch,
  never mid-epoch, and a ruin once laid is never removed by a change of evidence (V04's persistence rule).
* **A cemetery closes, so its catacomb stagnates.** A burial record or a monastery record that turns `ruined`,
  `removed` or `destroyed`, or is closed by an `institutionHistory` fate, closes its placed burial faces at the change's
  week (F2's fates, dated by the F-rows); V04 then holds the catacomb under a closed face `stagnant` — its extent kept,
  its growth stopped, nothing lost (item 109 (k) (5); V04's `blockedBy`). A reopening (F6) resumes growth by least
  disruption.
* **A church's fate touches only its crypt.** A church or the cathedral turning `ruined`, `removed` or `destroyed`
  ruins or vacates its building and its crypt (V02, V03); a catacomb feels it only through a crypt join already made
  (V04's join; item 109 (j) (3b)), the join taking the base's closure state, the catacomb's extent and growth unchanged.
  A churchyard stays a burial face while its church plot keeps the churchyard part, the church ruined or not; it closes
  only when the plot is cleared and re-used by least disruption (J-V8.53).
* **A tier change is not a closure.** A promotion adds the new tier's burial record beside the old one, and the line
  keeps the old record (`research/sf/dossier-generation.md`, its tier-shift row), so both reach the digest and item 108
  (c)'s merge makes the lesser a member of the greater — no face closes. When a lesser leaves the list in the same absorb
  that adds the greater of its ladder (a pair in V11's `dossier.ladders` — for the burial records the pairs `graveyard`
  REPLACEMENT over `burial_ground` (hamlet to village), `parish_burial_grounds` COUNT over both (village to town) and
  `burial_grounds_and_charnel_house` SIZE over all three (town to city); V11 §3.12), the port re-binds the
  lesser's faces to the greater's key (a `rebind`, noted `ladder_promoted`, V08 §3.5.1), never a `remove`. A demotion below TOWN removes no
  catacomb (V04's ratchet; V06 and V07's maintenance mode).
* **New cemeteries** are seated by S10b's least disruption; one begins a catacomb only where V04's count allows.
* **Deaths.** A `plague` or `plague_onset` condition or stressor standing at an epoch, and a calamity's `deaths` in its
  `CalamityRef` (V08 §3.6), are that epoch's burial input for item 109 (k) (4)'s capped growth (V04 §3.10).

### 2.6b Item 110's dossier inputs — the water system, the high-ground landmarks, the toll bridges and the culture (DR34, DR35)

Item 110 (b), as the owner revised it (~23:40: "i think raised ways for cities is fair for the genertor to generate adn
then a user can decide to add or remove"), GENERATES raised ways at CITY and METROPOLIS, "each a soft rule with a table
chance and a count cap per rung", and "A TOWN gets them only by declaration". The reasons, parts, chances and caps are
the base's (item 110; §2.7, §4.3, §4.6) with V11's rows; building them over time is V06's; the terraces and retaining
walls are the base's with V01's wards; stepped massing and deck plots are V02's. The port owns four things: which
dossier facts feed which reason, the rung gate, the binding rule (nothing item 110 generates is ever dossier-bound,
V08 §4.1) and the dossier's toll bridges.

**What the pinned line says about water (CONFIRMED over the 35 births).** Every tier carries exactly one required
record of the line's water group: `Water source` (thorp, hamlet), `Multiple water sources` (village, town; V11 binds it
to `@pin:well`), `Aqueduct or water system` (city and metropolis, base chance 1, described by the line as engineered
water brought into the city from beyond it; V11 binds it to `conduit_house`), and at metropolis the optional `Advanced
water infrastructure` (base chance 0.6, several aqueducts; a SIZE member of the city record, V11). All 7 CITY and
METROPOLIS births carry the city record; `metropolis-2` alone carries the metropolis one.

**(1) DR34 — the water system's inputs to item 110 (b)'s aqueduct.** The row is §7.7's DR34 (its inputs, in the order
read, and its bar T-V8-36); the port reads them as follows.
(a) **The rung gates, never the tier word.** SettlementForge's `city` spans 5 001–25 000 people and its lower part is
our TOWN (DR23; 4 of 24 surveyed SettlementForge cities). At TOWN the water record binds its building or pin only and
never raises arches; a DM's T4 `raised` stroke or an aqueduct-class declaration is the only TOWN aqueduct (item 110
(b)).
(b) **At CITY and METROPOLIS the need test counts as met** when a dossier record is bound to `conduit_house`: the dossier
states that water is brought in from beyond the city. The record is required at chance 1 on every SettlementForge city,
so it never scales a chance (it would be one constant): the table chance, the rung's cap and the source-in-reach
condition stay in force. With no higher spring or upstream river within reach, no arches are built; the conduit house
stands alone, fed by the base's cistern rule, and the build report notes `aqueduct_no_source` (§5.4).
(c) **One water system.** When an aqueduct is laid, its terminal site inside the walls is reserved, and the aqueduct's
generator binds the conduit house bound to the record to that terminal by V11 §3.24.7 (1)'s criteria row
(`pc/aqueduct/<way lineage>`; J-VI.9): the dossier-bound conduit house is the aqueduct's terminal wherever an aqueduct
is generated, and no conduit house is created that the dossier or the roster does not hold; with no aqueduct, V11's
`highGround` row sites it.
(d) **Several aqueducts.** Each SIZE member merged into the water record (item 108 (c); the metropolis record) raises the
rung's aqueduct cap by one; the extra aqueduct ends at a public fountain or cistern under the same source-in-reach
condition.
(e) **Fate and condition.** An aqueduct whose terminal the dossier's conduit house took records a map-side link to that
use's id (item 244: the raised way's `waterUse`, §2.7). Through it, the record closed (`removed` or a closing fate)
leaves the aqueduct standing, dry and disused; the record ruined ruins its arches by least disruption; an
`infrastructure` impairment applies the `impairments` row's condition steps to the arches. Removing the record never
removes a standing aqueduct; its decay is V06's.
(f) **Rung changes.** A promotion past 10 000 makes the reason eligible at the next epoch, where V06 builds the aqueduct
over time; a demotion keeps every standing raised way (the standing fabric survives, V08 §3.10), and V06 ages it.
(g) **Custom content.** A custom record that item 104 (a)'s resolution at fold puts in the `water-supply` family (V08
§3.5 (5) (f); V11 §3.13.1) is a water-system record for (b)–(e), but never declares arches at TOWN (J-V8.68).
(h) **Hot springs.** A `hot_springs` or `hot_springs_mineral` deposit is never an aqueduct source: it gives a bath-house
site and mineral water, not a drinking supply (J-V8.69).
(i) **Parity.** The line doubles an aqueduct's likelihood in a desert and lists an aqueduct among the ways a tannery's and
a dyers' guild's water need is met (CONFIRMED at `5d699cc68`); the `site` row's `desert` and the demand records reach
V11's aqueduct chance and need rows, so both behaviours are reproduced by our own rows, their values V11's.

**(2) DR35 — item 110 (b)'s dossier landmarks on high ground.** The row is §7.7's DR35 (bar T-V8-38): the dossier-bound
institutions whose class significance (§10.2; item 72) is at least V11 §3.24.2's `elevated.landmarkMinSignificance`
through V11's `kinds` rows (`citadel` → `castle`, `palace_government_complex` → `palace`, `cathedral_10_000_only` and
`great_cathedral` → `cathedral`), and the custom records with `landmarkLevel` `landmark` (whose significance V08 §5.2
raises), each read at its S3 reservation and fixed before the end of S6 where the road is committed (J-V8.70). The
landmark strings of `quarters[].landmarks[]` are never read by this row: the 49 surveyed strings are street, yard, pin
and institution names (537 of 1 281 strings in the wider survey are institution names), none a high-ground landmark;
they name ways and pins by the `landmarks` row, and reading them here would count an institution a second time. Every
SettlementForge CITY and METROPOLIS birth carries at least one record this row reads (7 of 7: a citadel, a cathedral, a
great cathedral or the palace; CONFIRMED).

**(3) The toll bridge — one rule at every rung (item 399; E-31; J-V8.65, J-V7.97).** A record whose `kinds` row carries
`implies: 'bridge'` (V08 §2.6; V11 writes the cell, today for `toll_bridge` only) makes DR1 read it at creation. When
the site's terrain, access, realm cell and water draw give no river or canal, the site row's river chance becomes 1 for
the smallest watercourse class — a watercourse is forced so that the dossier's toll bridge has water to cross — placed
by rung; the columns differ only where the rung's fabric differs:

| | base rungs (TOWN, CITY, METROPOLIS) | village rungs (THORP, HAMLET, VILLAGE; read by V07 §3.1 (1)) |
|---|---|---|
| the forced course | a brook whose course crosses the through route of the longest approach inside the frame | a brook whose entry and exit bearings lie on the two frame arcs the through road's two entries divide (unless the realm block fixes its line), the road topology raised to `through` at V07's step 3 |
| a coastal site with no watercourse | a brook | an estuary at the brook's width class, its exit the sea side |
| a flowing water drawn or given | no brook forced: the bridge stands where the longest approach crosses it | no brook forced: its type kept |
| the bridge and the toll house | a ground-part-0 deck over water — §5.3's invariant untouched, no raised way, no declaration; V11's toll house takes its `near` → bridge alternative first, on the deck only by V11's `deckOk` (item 110 (d)) | VS4's bridge; the toll house on its deck by `deckOk` (V07 §3.10a (4)) |
| failure: no watercourse forced | on any of — a `desert` site with no `oasis_water` and no river the arid row draws or the dossier gives (item 111; V08 §2.6's `site` row); relief S1 cannot carry the brook across the approach; a fixed `isolated` or `none` access word — the toll house takes its gate alternative, never a raised way at TOWN, and the build report notes `toll_bridge_dry` (§5.4) | on the same three, the toll house at an entry, else on the heart's approach, `toll_bridge_dry` reported |
| a drop on the approach | at CITY and METROPOLIS a viaduct raised by item 110 (b)'s own drop reason may carry the toll | — (no raised way below TOWN) |

The site is creation's (§7.7 *One path*): a toll-bridge record arriving by a later absorb never re-draws the terrain —
its toll house takes a bridge where a watercourse already crosses an approach, else the gate (at a village rung, an
entry), noted `toll_bridge_dry`; a later change of the site's words is a frozen fact (V08 §3.5's `site` row). A
"…Bridge" landmark string names the implied bridge when one exists (the `landmarks` row unchanged). The births carry 11
`Toll bridge` records in 11 dossiers; 9 stand where neither terrain nor access gives a river or a coast, 6 of them at
base-rung TOWN, and three are village births (`culture-norse`, `sample-cnocby`, `village-1`) (CONFIRMED). Bars:
T-V8-40 (base rungs), T-V7-13's toll-bridge clause (village rungs), T-V8-51 (the desert cases).

**(4) The culture's reach (J-V8.71).** The line has no era field: the culture is the only input of its era and region
preset. So the `era` row keeps `c14` for every culture, item 110's era modifier is one constant on dossier maps, and the
culture is the discriminator. `site.culture` gains two readers: item 110 (b)'s aqueduct chance, through V11's culture
modifier rows (one per V11 culture row; V11 §3.20.3 covers the twelve words), and DR15's template family → V11's
stepped specialisations for item 110 (c) — stepped temples, terraced palaces, tiered towers (V02 X17) — keyed by culture
and class. The port supplies no religion that builds in tiers: a deity is a temple's dedication (F16), never a building
form. Which cultures build in tiers and each culture's aqueduct modifier are V11's content.

**(5) What the port never does for item 110.** It binds nothing item 110 generates: a terrace, retaining wall, raised
way or deck plot carries no `Identity.dossier`, even when a dossier record fed its reason, and its provenance names that
record for the clerk's `why` (V08 §4.1, §4.4 (2); item 260). It reads no retaining wall, deck or raised way from
SettlementForge — the line has none, and its world-state works ledger is not read (J-V8.72). Item 110's generated
content rides the opaque document and the pictures through the base renderer and §7.5's migration.

### 2.6c Item 113's dossier inputs — SettlementForge's history as the replay's inputs (DR36–DR39)

Owner rule item 113: a settlement with a known history is generated as its past and aged to the present. The replay is
V06's (V06 §3.20: the plan, the coarse epochs, destruction and refounding, burial, the effective peak's size); the rows
DR36–DR39 are §7.7's; the event-to-epoch rows, burial thresholds and `history.symbolicQuantile` are V11's; the buried
former settlement and lost access are V04's. The port owns what SettlementForge's history says and where it is read, its
conversion into the recipe's `HistoryHint` on one clock, the lifecycle's reading and the effective peak's evidence. It
never writes a peak or anything else back (SettlementForge's own rule that a peak is never inferred stays its own).

**What the line gives (CONFIRMED, read-only, from its history and simulation code — never its map code).** An age drawn
by tier (`AGE_BY_TIER`: thorp 15–300 years, hamlet 30–120, village 30–250, town 50–300, city 100–500, metropolis
200–800) as `history.age`; a founding (`history.founding`, prose beyond its age); `history.historicalEvents[]`, each
with `yearsAgo`, a category `type` (economic, political, disaster, religious, magical, demographic,
occupation_infiltration, exile_return), a `templateType` of 29 (among them great_fire, plague_years, great_flood,
occupation_legacy, trade_collapse, market_crash, demographic_pressure, pilgrimage_surge, external_threat), a severity
word and a name; in campaigns `tierHistory[]` (`fromTier`, `toTier`, `direction`, `outcomeId`; no tick — its week
from the outcome id's suffix, §4.11's rungs), `populationHistory[]` (`tick`, `population`; the last 12) and
`calamityHistory[]` (`tick`, name, type, `deaths`, `exodus`, targets); a lifecycle — a terminal death
(`destroyedByEventId` on the settlement root) and a resettlement on the same site (`lifecyclePatch`, the tier forced to
thorp) — behind the line's lifecycle switch; opt-in ancient ruins — an event "The Fall of …", 120–400 years before the
founding, carrying the line's `ancientRuin` marker; and its high-water law — built extent from the historical maximum
population, occupancy from the current one, stamped as `config.peakTier` — with a documented gap: three paths lower a
tier with no stamp and no `tierHistory` entry (a calamity's direct lowering, a resettlement's forced thorp, the presets
that auto-apply proposals).

**(1) The digest's history additions** (§14's `DossierDigest.history` carries `ageYears` and `events`; V08 §2.4's rows
name the paths):

```ts
// additions to §14's DossierDigest.history (item 509's block)
  events[]: + { template: string /* the templateType, one of the line's 29 */; ancientRuin?: true /* the opt-in "Fall of" event */ }   // the base's `type` holds the category word (the historyScars row reads it)
  peakTier?: string;                                         // config.peakTier, as stamped
  tierHistory: { from: string; to: string; direction: 'promotion'|'demotion'; week: number | null /* by §4.11's rungs; null: no rung dates it */ }[];
  populationHistory: { week: number; population: number }[];
  lifecycle?: { death?: { week: number | null; ref: string /* destroyedByEventId */ }; resettled?: { week: number | null; ref: string /* the lifecyclePatch receipt */ } };
```

**(2) The recipe's history — `HistoryHint`'s additions.** §2.7 declares `HistoryHint` with `ageYears` and `scars` and
names the replay among its readers; the replay's further inputs are declared here (item 113's model wiring; the port
fills them at creation, V09's editor from the blueprint's history option, §4.2 S0, so V06 reads one shape either way):

```ts
// additions to §2.7's HistoryHint (item 113); every field optional — absent means not recorded, never zero
  events?: { type: string /* the template word: V11's history.events rows key on it */; yearsAgo: number; severity: number /* 0–1 by the historyScars row's words */; name: string }[];   // every historical event but the ancient fall, oldest first
  peakTier?: string;                  // the stamped peak tier word
  peakPopulation?: number;            // the high-water population: the largest recorded population (populationHistory's points and the present) that lies in peakTier's band; absent when none does
  tierHistory?: { from: string; to: string; yearsAgo: number | null }[];
  populationHistory?: { yearsAgo: number; population: number }[];
  calamityHistory?: { yearsAgo: number; type: string; deaths: number; exodus: number; severity: 'minor'|'moderate'|'major'|'catastrophic' }[];
  lifecycle?: { deathYearsAgo?: number; resettledYearsAgo?: number };
  ancientFallYearsAgo?: number;       // the opt-in "Fall of" event: DR38's ancient cause
  peakEvidence?: { kind: 'tierDemotion'|'populationMax'|'calamityLoss'|'higherTierListed'|'resettlement'; tier: string; ref: string /* the source's binding key, outcome id or event ref */ }[];   // (5): DR36's evidence, strongest first
```

V06's plan (V06 §3.20.1) reads them: the peak (2), the start (3), the targets (5), the events (6) and destruction and
refounding (7). `scars` keeps its base readers (S2's stage count, II.7.6) and is filled as before (V08 §3.11).

**(3) One clock.** The history's events are dated in years before the present, as the line writes them; the campaign
lists in weeks. The port converts a week `w` to `yearsAgo = (W − w) ÷ 52`, rounded to a week's fraction of a year,
with `W` the dossier's week (`HostContext.week`, else the latest tick of `populationHistory`, else 0 — V08 §3.11's
week); a week after `W` (bad data) reads 0; a `tierHistory` entry no rung dates keeps `yearsAgo: null` (evidence only).
`ageYears` is `history.age` (the founding), read as given: the dossier is the truth, and an age outside its tier's
`AGE_BY_TIER` range is neither clamped nor redrawn (the line drew it; a DM may have set it). An event older than the age
is carried (V06 records it before the replay); severity words read by the `historyScars` row (V08 §2.6), a calamity's
severity by `calamitySeverity` (V08 §2.6).

**(4) The lifecycle and the ancient fall (DR38).** A terminal death followed by a resettlement on the same site becomes
`lifecycle.deathYearsAgo` and `.resettledYearsAgo` (the resettlement's forced thorp is the tier word's history, never
evidence of decline alone); a death with no resettlement never reaches a creation — its population is 0, refused
`E_RUNG_UNAVAILABLE` (`.empty`, V08 §3.9 B7). The opt-in "Fall of" event (its `ancientRuin` marker) becomes
`ancientFallYearsAgo` and only that — it is not repeated in `events` (one fact, one reader) and it is no item-109 ruin
evidence (§7.7 DR30 reads an older civilisation's ruins; the fall is this place's own former settlement, DR38–DR39).

**(5) The effective peak's evidence (DR36; item 113 (f)).** When `peakTier` is absent — the documented gap, or a dossier
never stamped — the port lists every fact showing that the place once stood at a tier above its present tier word,
strongest first; within a kind, the higher tier first:
1. `tierDemotion` — a `tierHistory` demotion: its `from` tier;
2. `populationMax` — the largest recorded population: the tier whose band (the `tiers` row's `band` column, V08 §2.6)
   holds it;
3. `calamityLoss` — a calamity whose deaths and exodus added to the population at its week lie in a higher band: that
   band's tier;
4. `higherTierListed` — an institution listed `ruined` or `remnant` whose catalogue kind's lowest tier (the catalogue
   manifest, V08 §2.4) is above the present tier — a village holding a ruined "City walls and gates" or a remnant
   cathedral: that lowest tier;
5. `resettlement` — a resettlement after a terminal death whose `tierHistory` records the tier before the death: that
   tier.
An entry whose tier is not above the present tier word is not listed; an empty list means no peak (DR36: none without
evidence). The effective peak's tier is the highest tier the list shows, and the entries naming it are the
`HistoryRecord.peak.evidence` V06 writes, strongest first (§2.7; V06 §3.20.1 (2), which sizes it in the tier's band at
V11's quantile and marks it `symbolic`). With `peakTier` present no evidence is listed: the stamped tier is the peak,
and one at or below the present tier gives no replay (V06 §3.20.1 (1)).

**(6) Creation only, and a later rewrite.** The port fills `Recipe.history` once, at creation; `ageYears` never advances
(§2.7). Every later campaign entry is the live change feed — F7, F8 and the calamities (DR28) through V08 §3.6 — never
fed to the replay again. A rewrite of the generated past after creation (the carried `history` fact, V08 §2.3, differs:
the age, or the events' template, years ago or severity) is a frozen fact: V08 §3.5's `history` row writes
`frozen_fact_changed` and offers "Regenerate from the new history" — V08 §4.2's "Make a new map from the record", which
runs the replay from the new history — and nothing re-runs silently (V06 §3.20.8).

**(7) Edges.** `history.age` absent or not a finite number ≥ 0 fails the shape check (V08 §3.5 step 3; B3); an empty
event list gives `events: []` and no scar; a `templateType` V11's rows lack is carried and mapped to nothing by V06
(`replayEventUnmapped`); a `peakTier` word the `tiers` row lacks is noted `unmapped_word` and read as absent (the
evidence list then decides); a `populationHistory` point in no band is ignored by (5); with `history.replay` off the
additions are carried and read by nothing (V06's no-op pin). Bars: T-V8-52; V06's T-V6-73 and T-V6-77 on dossier
fixtures.

### 2.7 Lifecycle of every new state field

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MapRecord` (2.1) | the host at first commit of a `created` result, every field from the message | the client at mount, offer, refresh | the host's store, compare-and-set on `logHead` | n/a (host data) | a DM's "restore previous map" swaps in `backups[0]` (V08 §4.2), then every open session gets a fresh `doc.load` | the client's record schema version; the host migrates by the client's release notes |
| `dossier.*`, `module.status`, `party.render` and `party.rendered` messages (2.2) | client / module per V08 §3 | the other side | never stored | n/a | n/a | the bridge's `protocol` number in `ready`; an unknown type is ignored and reported (§11.3) |
| host-minted `docId` (2.1) | the host at creation | `generate`, `logHead` | the document (§2.9) | kept | n/a | none |
| `DossierBinding.adapter` (2.3) | `creation` | `absorb` (V08 §3.8) | the dossier block | rebuilt from the log's last dossier event's `DossierRef.version` and the port's report | n/a (no undo of dossier events) | rebuilt at first load (§7.5) |
| `DossierBinding.quarantined` (2.3) | `digest` / `absorb` (V08 §3.9) | the next absorb's diff (skips these keys), the report, T-V8-9 | the dossier block | kept | n/a | rebuilt by folding the `dossierFacts` events, each of which carries the whole list after its absorb (V08 §3.6 (4)) |
| `absorbed` retention (2.3) | each committed absorb | F22's match, the report | the dossier block | kept | n/a | the fold trims `changeIds` older than the newest 64 entries, so the stored block equals the rebuild (V08 §2.3) |
| `CarriedFact` (2.3) | `creation`, `absorb` | the diff | the dossier block | kept | n/a | remapped by V08 §3.8 |
| `AdapterManifest` (2.4) | each adapter folder | `select`, `digest`, remaps | the package | n/a | n/a | a new version declares `remaps`, a new line `fromLines` |
| digest additions (2.5) | the adapter | the rows of V08 §3.5 | carried (subset) | n/a | n/a | an older document's carried facts lack them: filled at its next absorb with no event (a declared remap, V08 §3.8) |
| `dossierRecord` records (2.5) | `creation` prefix, `absorb` | §2.7's readers, the renderer, the clerk | the model (records in the digest, §2.7) | kept (records, not derived) | never an undo target (§7.4) | none (new) |
| `CircumstanceSlice.port` (2.5) | `creation` (first slice), the cadence's epochs | the staged rows' readers by the resolution rule | the recipe and `EpochInputs` | read at the epoch that carries it | an epoch that carries dossier events is no undo target (§7.4) | absent in older slices: reads null (the table) |
| row sets of 2.6 | this volume's defaults | `digest`, `creation`, `absorb` | `@plat/tables`, pinned in the recipe | a table edit re-derives by §7.6 | an `editTable` undo (§7.4) | table versions (§6.4) |
| `DossierInstitution.custom` with `keywords` (2.8) | the adapter | item 104 (a)'s resolution at fold (V08 §3.5 (5) (f)) | carried (the institution fact's `custom` part) | n/a | n/a | absent in an older document's carried facts: filled at its next absorb as a declared remap, no event (V08 §3.8) |
| `customChains`, `customResources`, `customServices` (2.8) | the adapter | `creation`, `absorb` | carried facts, and the records they put | kept | n/a | a document made before this volume carries none: every present one is an `add` at the next absorb, placed by least disruption, upstream first |
| `CustomChainRecord`, `CustomServiceRecord` (2.8) | `dossierRecord` put | S10b's chain pulls (base, V11), §10.3's sub-locations, the renderer, labels, the clerk | the model (records in the digest, §2.7) | kept (records, not derived) | never an undo target (§7.4) | none (new) |
| `HostContext.customLibrary` (2.8) | the host client, when the author's library is at hand | `digest` | never stored as sent: its admitted fields become `custom-def` facts | n/a | n/a | the entry shape is versioned with the adapter (`AdapterManifest.version`) |
| `custom-def` facts (2.8) | the ledger event (`dossierFacts`) | the resolution at fold, replay and re-derivation; the custom weights (V08 §3.11) | the dossier block | kept | n/a | remapped by the adapter's declared `remaps` (V08 §3.8) |
| `MapRecord.party` (2.1) | `create` (`{ public, [], 0 }`); `setParty` by an owner or editor | the party picture render and gazetteer (V08 §3.14); the frame's copy through `host.state` — the header's controls and "See what the players see" | the host's store, compare-and-set on `party.rev` | n/a | "Hide again" restores `party.prev` (one step; older reveals are undone by hiding them) | an older record without it reads `{ public, [], 0 }` |
| `MapRecord.partyPictures` (2.1) | `putPartyPictures` with a `party.rendered` reply's set (V08 §3.14 (3)) | `mountParty`'s viewer; the player's assistant (the gazetteer) | the host's store | re-requested (`party.render`) whenever its `logHead`, `partyRev` or `outputVersion` differs from the record's, and replaced unless the module answers `unchanged` (its `drawDigest`, V08 §3.14 (3)) | n/a (derived pictures) | absent: the viewer shows the public thumbnail and "The DM has not opened this map yet" |
| `MapRecord.refreshing` lease and `backups[0].tailAfter` (2.1) | the refresh queue; `replaceSnapshot` | another device's queue; B10's second rung | the host's store | n/a | n/a | absent in an older record: the lease is free; B10 falls to its third rung |
| carried `chain`, `dependency`, `calamity`, `evidence`, a relation's `trend` and `sign`, a condition's `source`, `port-values.latitudeDeg` and `.threats` (2.3) | `creation`, `absorb` | the diff | the dossier block | kept | n/a | absent in a document made before these fields existed: filled at its next absorb as a declared remap with no map event (V08 §3.8); a calamity dated at or before the document's last absorbed week is carried with no event (the map never saw it happen) |
| `Assignment.custom` (2.8) | the creation prefix's `assign` of a custom record; a `custom_revision` `setAttr` | the fold's re-resolution (V08 §3.13 (10)); the clerk's `why` | the model (the assignment) | kept | never (a dossier event) | absent on an older document: written by the next absorb's `setAttr`, a declared remap |
| digest additions: `site.ruinEvidence`, `site.threats`, `site.latitudeDeg`, `calamities`, the extended `economy.chains`, `step`, `lesser`, `qualifiers` (2.5) | the adapter | DR28–DR33, DR2, DR9 | carried by the kinds above | n/a | n/a | as the carried kinds |
| the `kinds` row's `implies` column (2.6, 2.6b) | V11's rows | DR1 at creation only | `@plat/tables`, pinned in the recipe | a table edit re-derives by §7.6 (at an `upgrade`, never at an absorb: the site is creation's) | an `editTable` undo | table versions; absent → no implied feature |
| DR34 and DR35's inputs (2.6b) | the adapter and the pinned rows, from facts already carried (institutions, deposits, site, culture) | item 110 (b)'s reasons at creation and at every epoch | nothing new: they are read from carried facts and bound uses | re-read at each regeneration and epoch | n/a | none |
| the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s laying of the aqueduct | the fate and condition rules of 2.6b (1) (e) | the model (the raised way's field, item 244) | kept while both stand; a re-laid aqueduct re-links | the log's | a document without it has none |
| a removal of generated item-110 content (4.1, 4.3) | the base's delete of generated content (a DM's, or an accepted clerk proposal's) | every regeneration, absorb and epoch: the slot stays closed | the log (the delete event) | held; a new slot opened by a later cap increase is new and announced (4.6) | the log's undo re-opens the slot | §7.5's mapping hands the tombstone to its successor |
| the frame's `host.state` copy, its `HostSlots.historyLines` and the players' view (`ViewOpts.viewAs` set to the party key) (2.2, 3.1 step 7 (b), (c), 3.14 (5)) | the client's `host.state` after each `doc.load` and each change of `party`, `backups` or `partyPictures.at`; the lines from the differences of successive values, their names and targets read per key into the handler's cache (dropped at each new line and at each head move its one `subscribe` on the loaded document reports, §11.2; J-V8.109, J-V8.110); `playersView` from `seePlayersView` or the header's toggle | the header's controls, the restore dialog, the history panel's party lines (V09 §4.10's group), §9.2's filter for the frame's drawing, labels and reads (item 464) | never: the session's memory and the view's options, no view-state key, no store write, no event | re-sent after every load, restore, new map and `switchTo`; the players' view re-resolved on a new `party` and on an absorb that changes the binding rows; the handler's `subscribe` registered at each `doc.load` and released at `close` and `switchTo` | the same toggle | none (new with protocol 2; a client of another protocol is refused at `ready`, V08 §8.3 R4) |
| a derived `DepositSite` (`res:derived:<landuse>`; 2.6 `deposits`, 3.11) | the creation prefix or an absorb's `dossierRecord` put, when a record needing the land use is present and no deposit opens it | S12a (its site and land use, DR19), V07 §3.9, the renderer and labels as any `DepositSite` (5.2) | the model (a record, §2.7) | kept (a record); S12a's derived fields recomputed | never an undo target (§7.4) | none (new): a document made before it gains the site at its next absorb, as an addition placed by least disruption |
| `host.action` (2.2, 4.2) | the frame's header controls (owner, editor) | the client → `MapSession.on('action')` → the host's operation (V08 §4.2) | never stored | n/a | each row's own undo (V08 §4.2) | the bridge's `protocol` |
| `PortNote.msg`, `.keys` (2.4) | the port, with each note it writes (`custom_resolved` and `unmapped_kind` after the fold, V08 §3.6 (4); their `class` words V11's `label` cell or a pin kind's `host.pinKind.<kind>` row) | the history panel, the report panel (through `GenerationReport.dossierNotes`) and the host's report (V08 §4.6); T-V8-14 | with the note: the ledger event (`event` and new `standing` notes), `DossierBinding.notes` (`standing`), `dossier.result` only (`report`) | a re-derivation re-renders the stored `msg`; the port recomputes notes only when it runs | n/a (no undo of dossier events) | a note stored before these fields reads `msg` `{ key: 'host.note.<kind>' }` with no args and `keys: []` |
| `dossierFacts.notes`, `.notesCleared` (3.6 (4)) | each port run, in its ledger event | the fold (below); V09 §4.10's absorb group | the log (the event) | replayed by fold | n/a | an older ledger event without them folds as `notes: []`, `notesCleared: []` |
| `DossierBinding.notes` (2.3) | the fold of each ledger event: the old list less `notesCleared`, plus the `standing` notes of `notes`, in identity order | every derivation's report build, which copies it into `GenerationReport.dossierNotes`, the report panel's read by `report(h)` (V08 §4.6); the next absorb's new-or-cleared test (V08 §3.6 (4)) | the dossier block | rebuilt by fold | n/a | absent in an older block: `[]`, so the next absorb carries every standing note as new |
| `GenerationReport.dossierNotes` (4.6) | every derivation's report build and the verification replay on load: the document's `DossierBinding.notes` at the report's seq, in identity order; `[]` for a document with no binding | the report panel's dossier section through `report(h)` (V09 §5.7; V08 §4.6); T-V8-14 | the document's `derived` section with the rest of the report, excluded from the canonical form and every digest (§5.4) | rebuilt with the report by every derivation | none of its own: an undo's re-derivation rebuilds the report, and the binding it copies is no undo target | none: a report saved without it shows `[]` until the verification replay on load rebuilds it |
| `MapRecord.held.reason`, `dossier.result.held.reason` (2.1, 2.2) | the port's `held` note on a refused offer (V08 §3.9) | the banner and the frame's held notice (V08 §5.1); the thumbnail slot at a refused creation | the host's store, beside `held`, as handed | replaced by the next refusal; cleared with `held` | n/a | an older `held` without it shows `host.status.held` with the row of its `code` (E_RUNG_UNAVAILABLE: `.village`) |
| carried `wealth` (on the settlement fact), `site` and `history` (2.3) | `creation`, `absorb` | the diff's `wealth`, `site` and `history` rows (3.5) | the dossier block | kept | n/a | absent in an older document's carried facts: filled at its next absorb as a declared remap with no map event and no note (the map never saw them change) |
| `HistoryHint`'s additions (2.6c) | the port's creation (or V09's editor from a blueprint's history option) | V06's replay plan (V06 §3.20.1); V10's story through `HistoryRecord` | the recipe (`Recipe.history`, §2.9) | the replay re-run from the recipe by Regenerate and New random (V06 §3.20.8) | n/a (the creation prefix) | absent in an older recipe: no replay, as before (an upgrade never adds one, V06 §3.20.8) |
| `MapHostConfig`'s SettlementForge inputs — origin, locale, backup depth, quota (2.2) | the host page, from SettlementForge's product decisions (J121) | the frame's `src` and CSP (3.1), the catalogue locale (5.5), `replaceSnapshot` (3.7), the quota check (3.7) | never stored by the module (the host's configuration) | n/a | n/a | a smaller `backupDepth` drops the extra backups at the next compaction; a changed locale takes effect at the next frame boot |
| `exportBundle`'s blobs (2.2, 5.4 (2)) | the module on the client's call, from M-SF | SettlementForge's export bundle, packaged unread | never stored by the module; the host's bundle is SettlementForge's | re-made on each call from the committed document | n/a | the scene formats' own versions (§11.1) |

### 2.8 Custom content — the records, the chains and the optional library input (item 104's host side)

**What the pinned line gives (CONFIRMED on the `town-cc-1` fixture, generated on the pinned line with SettlementForge's
reference custom pack, and on the line's custom-content manifest, read-only).** A custom institution is an ordinary
`institutions[]` record with `source: 'custom'`, `isCustom`, `localUid`, `customDefinitionCategory`, `customDefinitionId`,
`customDefinitionRevisionId`, `customDefinitionContentHash`, `customDefinitionVersion`, `customDefinitionFingerprint`,
`name`, a free-text `category`, `tags`, `description` and `required`; the scene tokens `sceneProfileId`, `landmarkLevel`
and `materialFamily` appear on the record only when the author set them (item 104; absent on the reference pack's
record). `customContentProvenance.materializedDefinitions[]` lists every materialised definition with its bucket,
definition id, revision id, content hash, local uid, name and the dossier surfaces it landed on. ACTIVE custom chains are
listed in `economicState.customChains[]` — each with a `chainId` (`discovered.<the node uids>.<a hash>`), a `label`,
`status`, the `resource` name, the `processingInstitutions` names in flow order, the `outputs` names, `activation {
state, evaluatedTier, reasons }`, `tradeEndpoints { exports, imports, promoted }` and `tradeEndpointOwners` (each
endpoint's `refId` `custom:<localUid>` and `nodeUid`). Custom resources sit in `config.nearbyResourceDefinitions[]`
(name, `localUid`, `refId`, the definition ids); custom services in `availableServices.<service category>[]` with the
provider institution's NAME in `institution`, `custom: true`, `localUid` and the definition ids. The richer definition
fields — `authority`, `defenseRole`, `criminal`, `magical`, `foodImpact`, `economicWeight`, `satisfies`, `criticality`,
the dependency references `produces`, `requires`, `subsumes`, `providedBy`, `yields`, `commodities`,
`requiredInstitution`, `requiredResources`, and a resource's `category` (its kind: water, land, special, subterranean)
— live in the author's library, not in the dossier.

```ts
// §14's DossierInstitution.custom (item 511): present only on a record the dossier marks `source: 'custom'`
interface CustomRecordRef { uid: string /* localUid: the `inst:uid:` binding key's part */; definitionId: string; revision: string /* customDefinitionRevisionId */;
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
// the OPTIONAL library input (item 104 (a) (5); item 20 (h) (iv)) — a new optional field of §14's HostContext
  HostContext.customLibrary?: CustomLibraryEntry[];
interface CustomLibraryEntry { definitionId: string; revision: string; contentHash: string /* read only when all three equal a definition the dossier materialised */;
  bucket: 'institutions'|'services'|'resources'|'tradeGoods';
  authority?: string; defenseRole?: string; criminal?: boolean; magical?: boolean; foodImpact?: 'none'|'produces'|'consumes';
  economicWeight?: 'minor'|'moderate'|'major'|'backbone'; satisfies?: string; criticality?: 'critical'|'important'|'discretionary';
  category?: string /* for a resource: its kind — water, land, special, subterranean */;
  produces?: string[]; requires?: string[]; subsumes?: string[]; providedBy?: string[]; yields?: string[]; commodities?: string[];
  requiredInstitution?: string[]; requiredResources?: string[] /* references as the line writes them: 'custom:<localUid>' or 'prebuilt:<category>:<slug>' */ }
```

**Additions to the carried facts (V08 §2.3; item 390).** The institution fact gains the `custom` part above less
`categoryText` (a change of the text alone that maps to the same `group` is no change). Three kinds are added:

```ts
  | { k: 'custom-def'; revision: string; contentHash: string; fields: Omit<CustomLibraryEntry, 'definitionId'|'revision'|'contentHash'> }   // key def:<definitionId>; present only once a library entry was admitted
  | { k: 'custom-chain'; active: boolean; nodes: string[] /* flow order: the resource's key (or 'name:'+name), the processors' keys (or names), the outputs' uids (or names) */; exports: string[]; imports: string[] }   // key chain:<chainId>
  | { k: 'custom-service'; provider?: string; serviceCategory: string }   // key svc:uid:<localUid>
// a custom resource is the existing 'resource' fact under res:uid:<localUid>, with custom: true
```

**The staged records the chains and services become (item 256).** `CustomChainRecord` and `CustomServiceRecord` are
§2.7's, filled only by `dossierRecord` events (V08 §2.5) and read by S10b's chain pulls (item 104, with V11's rows),
§10.3's sub-locations, the renderer and labels (V08 §5.2) and the clerk. Their fields' rules: a chain's `nodes` in flow
order — the resource (a `res:` key), the processors (`inst:` keys) and the outputs (`def:<definitionId>`), each kept by
name when it joins nothing; `endpoints[].partner` the trade partner's binding key when the dossier's trade links name
one for the good, else absent (the main gate or harbour, item 104 (h) (6)); `volume` the admitted library's
`economicWeight` of the chain's final processor, else `moderate` (item 104 (h) (2)); `crossLinks` only from admitted
library fields (item 104 (h) (4); V08 §3.13 (7)); a chain retired when the dossier no longer lists it. A service's
`provider` is its provider institution's binding key, inside which or on an adjoining plot item 104 (h) (5) puts it.

**Keys.** §7.7 item 12's key law holds `chain:<chainId>`, `res:uid:<localUid>`, `svc:uid:<localUid>` and
`def:<definitionId>` (item 256). A chain's id is stable while its node set is unchanged; a chain whose nodes change is a
new chain, SettlementForge's own identity (J-V8.42). None re-binds: a custom item is renamed in SettlementForge without
changing its uid, so its keys never change (item 104 (e): "a rename changes nothing").

**The assignment's custom part (item 394).** `Assignment.custom` (§7.7) is dossier-owned (§7.7 item 11), written by the
creation prefix's `assign` and changed only by a `setAttr` on `custom.revision` with cause `custom_revision`. Its fold
(V08 §3.13 (10)) re-reads the institution's carried fact and, when present, its `custom-def` fact, re-resolves item 104
(a)'s profile and issues S10b's `dossier` request for the use (least disruption), the report's reason naming the revision.
The custom weights — `economicWeight`, `criticality`, `defenseRole`, `authority` — are read from the carried `custom-def`
fact at resolution time (V08 §3.11), never from a params delta, so a revision needs no `editTable` and no params rewrite.

## 3 Generation — the port pipeline, end to end

### 3.1 The embed: the Map tab, the frame, the boot

1. **SettlementForge's side.** The Map tab is a lazy chunk imported by nothing eager, so SettlementForge's first map
   is unchanged. The chunk holds SettlementForge's mount component and `@plat/bridge-client`
   (≤ 12 KB gzipped with the party viewer, V08 §6). **A player's tab** (audience `player`) calls `mountParty`: it reads
   the record's `partyPictures` and shows them in the client's small pan-and-zoom viewer, with no frame, no module and no
   message (V08 §3.14). **The DM's and co-DM's tab** calls `mount`: the client reads the map record
   (`MapStore.read`); if a thumbnail for the viewer's key exists it draws it at once as a static image (J-V8.24); it
   creates one `<iframe>` with `src = moduleOrigin + embedPath + '#p=2&lang=' + locale` (the origin and the
   language SettlementForge's, `MapHostConfig`, J121), `sandbox="allow-scripts allow-same-origin
   allow-downloads"` (no top navigation, no pop-ups, no forms), `allow=""`, `referrerpolicy="no-referrer"`, sized to the
   tab (J-V8.7). SettlementForge's CSP adds the module origin to `frame-src`. `allow-same-origin` is the module's OWN
   origin, which its workers and its cache need; it grants nothing on SettlementForge's origin. `mount` refuses any
   audience word other than `dm` and `co-dm` before a frame exists.
2. **The module's side.** The module origin serves static files only: `embed.html` (the second entry point of
   `@plat/app`, host mode — no file operations (V09 §2.2's `fileMenu: false`, V08 §5.1), no `DocResolver`, bridge-driven;
   item 507), the lazily loaded chunks of the current output version and the retained N−1 and N−2 (§6.4), fonts and
   the stamp-tile asset. Its response headers:
   `Content-Security-Policy: default-src 'self'; script-src 'self'; worker-src 'self' blob:; img-src 'self' data: blob:;
   connect-src 'self' <the clerk origins>; frame-ancestors <SettlementForge's app origins>`, where `<the clerk origins>`
   is a deployment row by volume V10's configuration (V10 §3.17): none under C (SettlementForge's own assistant; follows
   SettlementForge, J121/J122) and under `off`; the proxy's origin — one of SettlementForge's app origins, on the embed's
   allowlist — under B; the provider's API origin under A. No cross-origin isolation headers (generation needs none,
   §11.2); `Cache-Control: immutable` on hashed chunks. The module holds no account, cookie or secret: it trusts only
   messages whose origin is on its allowlist and whose source is its parent window (§11.3).
3. **Boot.** `embed.html` binds `WindowPostMessageTransport` to `window.parent` with the allowlist, sends
   `module.status { booting }`, starts the generation worker, the derivation pool (up to three workers, §4.1) and the tile
   worker, loads the model packages of the current output version and the message catalogue of its `lang` (V08 §5.5), and sends `ready { outputVersions, schemaVersion,
   protocol: 2, adapters: [{ line, version }] }` (item 472). The client flushes its queued messages in order (§11.3).
   `ready` within `bootTimeoutMs` (20 s) or the client re-creates the frame once; a second miss leaves the thumbnail with
   the note "the map could not start" and a retry button (V08 §3.9 row B1).
4. **Load.** The client sends `doc.load { bytes: snapshot, role, session, audience }` — the role and the audience word
   both; the module re-derives role and key from the audience by §14's table and takes the lower of the two (J-V8.29;
   item 472) — then `doc.apply { baseLogHead: snapshot.logHead, events: tail }`. The module opens the snapshot (§2.9
   steps 1–5: frozen view outside the window, corrupt cache replayed, verification in the background), folds the tail,
   and draws; the first live frame replaces the thumbnail. If `snapshot.outputVersion` is older than the current and
   inside the window, the document replays exactly under its own version and `module.status { upgrade-available }` goes
   to an owner's client only (V08 §3.8).
5. **Offer.** Then the client decides whether to offer the dossier (V08 §3.2) and commits the result (V08 §3.3).
6. **Switching settlements.** `MapSession.switchTo(spec)` — the same fields as `mount` — reuses the frame:
   `close` on the handle, then load and offer the next record — boot is paid once per page (J-V8.30). One document is
   live per frame; the previous one's memory is released before the next is opened (§12.8's line holds per document,
   not per campaign).
7. **Bridge to the shell** (J-V9.81). The embed entry's **bridge handler** — this volume's glue in
   `embed.html`, the one piece of host-mode code between the transport and `@plat/app`'s shell — fills the shell's two
   host surfaces and is their one channel to the bridge, so neither the shell nor volume V10's harness touches the
   transport.
   (a) **`ClerkMount.host`** (V09 §2.10). Each `clerk.config` body (item 473 (a)) becomes `config()`'s value and is passed
   to every `onConfig` handler, and its `mode` becomes `HostSlots.clerkMode` (the shell's configuration rebuilt, V09 §2.2);
   before the first one `config()` is null and `clerkMode` is `off`. Each host `preview { events, view: true, proposal }`
   is yielded by `proposals` in arrival order; a `preview` without `proposal` is §11.2's dry run, answered and projected
   by V08 §5.4 (3). The harness's calls post the messages: `needsToken()` → `clerk.needsToken {}`, `refused(reason)` →
   `clerk.config.refused { reason }`, `answer(id, status, seqs)` → `clerk.proposal { id, status, seqs? }`, which the
   client surfaces as `clerkNeedsToken`, `clerkConfigRefused` and `clerkProposal` (V08 §2.2).
   (b) **`HostSlots`** (V09 §2.2). `header` — the renderer of V08 §4.2's controls, each shown to the roles its row names,
   posting `host.action` or acting in the frame as that row says; `banner` — the frame's own strips: V08 §5.1's "Showing
   what the players see" while the players' view is on, and the held notice of V08 §5.2 (`host.status.held` with the reason
   row `MapRecord.held.reason`, V08 §5.1, §3.9) — a frozen view's notice is the
   shell's own `error.frozen` strip, never this slot's (V09 §3.14 (b); J-V9.97) (the tab's status
   banner is SettlementForge's own, V08 §5.1's table);
   `lockedControls` — the control-registry ids (§7.8) of the basic panel's population and tier word, each with the reason
   `host.locked` ("Set by {host}", V09 §5.12, read with `hostName`: "Set by SettlementForge"; a `host.*` row, V08 §4.6); `exportFormats` — by V08 §5.4 (2): every format §11.1's key rules admit for the frame's role and key, saved to the
   user's device; `fileMenu: false`; `historyFilter` left unset (only owner and editor frames exist, both at `secret`,
   V08 §3.11, so no history row is withheld); `clerkMode` by (a); `hostName: 'SettlementForge'`, a deployment constant of
   the SettlementForge build of the embed beside step 2's deployment rows (another host's build sets its own);
   `historyLines` (V09 §2.2) — the handler's list, newest first, made from successive `host.state`
   values: a line per change of the party, the difference between two successive `party` values this session received —
   `host.revealed` "Revealed to the party: {places}" for places added to `party.places`, `host.hidden` "Hidden from the
   party again: {places}" for places removed, `host.partyTier` "The party's base knowledge is now {tier}" for a changed
   `party.tier` ({tier} "public" or "local") — each held as its `at` (the time the value reached this session) and its
   places in `PartyKnowledge.places`' form (binding keys and addresses, V08 §2.1). `{places}` are the names of the places
   admitted by the key that `list` is called with (V09 §2.2; the shell passes `effectiveKey()`, V09 §2.10), and
   `targets` their entity ids. Each place is read by `query(h, { kind: 'entity', dossierKey } | { kind: 'entity', id }, {
   admitAs: that key })` (item 583, item 572) — a binding key by `dossierKey`, a collective record by each of its
   members' keys (`<key>#k`, V08 §2.3; named once, its targets the members answered), an address by `id` — and named by
   the answer's name: a place answered `withheld` is neither named nor targeted, one answered `null` is named by its key
   with no target, and a reveal or hide line left with no place is not listed (J-V8.106). Since `list` returns at
   once and `query` answers by promise (§11.2), the handler keeps the answers in a cache keyed by the knowledge key,
   dropped when a line is added and when the document's head moves (a commit or an applied tail) — the head move read from
   the `doc.changed` `ApiEvent` of the handler's one `subscribe(h, …)` on the frame's document (§11.2), registered at each
   `doc.load` and released at `close` and `switchTo` — firing `onChange` then, so the shell lists again (J-V8.110). `list` with a key the cache holds builds the lines from it; with a key it does not, `list` returns only the
   lines that name no place (`host.partyTier`, `host.picturesDrawn`), starts the reads and fires `onChange` when they
   answer, so the shell lists again (J-V8.109). The handler keeps no key subscription of its own (V09 §2.2) — the shell
   re-lists on `onEffectiveKey` (V09 §4.10) — and is never handed `effectiveKey` or `onEffectiveKey` (members of
   `ClerkMount`, V09 §2.10). And one line
   `host.picturesDrawn` "Party pictures last drawn {time}" from `partyPicturesAt`, made by the first value after a load
   and replaced at each change. `onChange` fires when a line is added or replaced. The list starts empty at each `doc.load` — the
   first `party` value after a load is the baseline and makes no line — and is never persisted, so it lists this
   session's party changes only, the record keeping no reveal history beyond `party.prev` (J-V8.58; J-V8.93);
   `newDocuments: 'download'` (V09 §2.2) — V09 §3.9's host-mode rule then governs every action
   that makes a new document; a copy of a dossier-bound document is detached (V06 §4.4): it does not follow SettlementForge
   (J-V8.93).
   (c) **`host.state`** (V08 §2.2). The handler keeps the latest `party`, `backups` and `partyPicturesAt` in the session's
   memory for the header's controls, the restore dialog and `historyLines` ((b); V08 §4.2, §4.6); the client
   sends them after each `doc.load` (step 4) and whenever the record's copies change. `playersView` — and the header's own
   "See what the players see" toggle — sets the frame's `ViewOpts.viewAs` with `setViewOpts` (item 464) through the view
   handle `view.set` is applied to (§11.3), as V08 §3.14 (5) says, and clears it with `viewAs: undefined`.
   (d) **The selection.** The places `reveal` and `hide` carry are the frame's current selection — the entities whose ids
   the handler forwards in `entity.selected` (V08 §5.4 (4)) — each as its binding key when it is dossier-bound
   (`Identity.dossier`), else its address, the form `PartyKnowledge.places` holds (V08 §2.1).
   The handler lives as long as the frame and survives `switchTo` (step 6); its `host.state` memory is replaced by the next
   record's, sent after the next `doc.load`, its `historyLines` are cleared, and the players' view is switched off at
   every load.

### 3.2 When a dossier is offered, and coalescing

The host cannot compute the port's fact hash (it holds no port), so it compares raw dossiers: `hashDossier` = SHA-256
(Web Crypto) of the dossier's canonical JSON — object keys sorted by code point, no insignificant whitespace, numbers as
JavaScript prints them — in lower-case hex. The DM's or co-DM's client offers when `hashDossier(dossier) ≠
record.lastOffer.dossierHash` or when the record is `held` (every new dossier is a retry), and never otherwise; a
player's page never offers (it holds no dossier, V08 §3.14). The port then decides at the fact level (J-V8.4): a dossier
whose only differences lie outside the carried facts (its generation log, prose, `simulationTrace`, keys on the
never-read list) returns `unchanged`, and the host stores the new `lastOffer` with nothing appended (T-V8-6).
**Coalescing** (J-V8.23): at most one offer is in flight per session; a newer dossier arriving meanwhile replaces any
queued one, and when the in-flight result returns the newest is offered against the new head; the client counts the
skipped versions in its own report field `coalesced` (a client-side count — the port never sees a skipped version, so no
port note names it). The skipped versions lose nothing: the port diffs carried facts against the newest dossier,
and each change's week comes from the dossier's receipts (§4.11 (2)), not from which versions were seen; an element that
appeared and vanished between two offers is never seen, which is the same answer SettlementForge's own end-state gives
(`research/sf/dossier-generation.md` §8.1).

### 3.3 Who runs the port, and who commits — the port leader

The port runs inside the module — in the generation worker, beside the document — and never in SettlementForge's bundle
(J-V8.1). Only an editing role — the DM (`owner`) or a co-DM (`editor`) — holds the document, the dossier and a port;
a player holds neither (J-V8.2 revised). Because `digest`, `creation` and `absorb` are pure functions of (the
document, the dossier, `HostContext`, the adapter and table versions), every editing client computes the same events
from the same state, and every event the port emits carries the reserved session `host:port` (item 359), so the
events are byte-identical whichever editor computed them (T-V8-3) and no user's undo stack ever holds one.

* **Creation (no map record).** The host mints `mapId` and sends `dossier.offer { create: { mapId } }`. The module runs
  `digest` → `creation` (§14: the blueprint, the creation prefix, the binding and the carried facts) → `generate(blueprint,
  { docId: mapId, prefix })` (item 459; J-V8.13), and replies `dossier.result { status: 'created', created: SnapshotBlock,
  factHash, report }` — the `.plat` bytes with their `logHead`, `lastSeq`, `outputVersion`, `schemaVersion` and
  `documentDigest`, all computed by the module. The host calls `MapStore.create` with those fields as handed
  (`exists` → another client won the race; it reloads the stored record, whose document is byte-identical by
  determinism, T-V8-3), writes the two thumbnails and renders the first party picture set (V08 §3.14).
* **Absorb (a map record exists).** The module runs `digest` → `absorb(doc, digest, host)` (§14; its steps V08 §3.5 –
  §3.6), dry-runs the events on its working state (§7.1) — they are never refused by map locks or pins, around which they
  apply (§7.7 items 2, 5) — and replies `dossier.result { absorbed, baseLogHead, events, encoded, seqAfter, logHeadAfter,
  factHash, week, report }` WITHOUT folding them. The host treats the result exactly as a `doc.changed` from that client:
  if `baseLogHead` is the current head it calls `MapStore.commitEvents(mapId, baseLogHead, encoded, seqAfter,
  logHeadAfter, absorbed)`, sets its head to `logHeadAfter`, and fans `doc.apply` out to every open session, the sender
  included, which then folds (§11.3 convergence); otherwise it answers `doc.rejected { stale }` and the module re-runs
  `absorb` on the new head (bounded: three attempts, then `module.status { error }` and a retry at the next offer).
* **Verification by every editor.** An editing client that folds a `doc.apply` holding dossier events (session
  `host:port`) and holds the same dossier — its own last offer's hash equals the result's `dossierHash` — re-runs
  `absorb` on the pre-apply state and compares its events' encodings with the applied ones; a difference is reported as a
  port mismatch (`module.status { error, detail: 'host.verify.mismatch' }`, V08 §3.9 row B20, and a report line naming the first differing event),
  as §11.3 reports a fates mismatch. It never blocks the fold: the log's order is the truth, and the mismatch is a defect
  report (T-V8-8).
* **Two editors at once.** When a DM and a co-DM offer the same dossier, both compute the same events, the host accepts
  the first and answers the second `stale`, and the second's re-run finds nothing left to absorb (`unchanged`). No
  election protocol is needed; the log's single head is the arbiter (J-V8.2).

### 3.4 The refresh queue — campaign scale

After SettlementForge commits an advance (any interval, any member count), the host marks `refreshPending` on every map
record whose settlement's dossier changed (by `hashDossier`) and calls `MapHost.refresh(queue)` from the DM's page
(J-V8.6). The client creates ONE hidden frame (`embed.html#p=2&mode=refresh`: no tile worker, no view, no thumbnail
pass until the end) and processes the queue serially in campaign order (the members' order in the campaign), one
document at a time: take the record's **refresh lease** (`MapStore.setStatus(mapId, { refreshing: { by: session,
until: now + 60 s } })`, refused when another live lease holds it) → `doc.load` + tail → `dossier.offer` →
commit the result → if the tail now exceeds its compaction threshold, compact (V08 §3.7) → render the two thumbnails
and the party picture set (V08 §3.14; the tile worker is started for this step only) → release the lease with `status:
'current'` and `refreshPending` cleared → the document closed, its memory released → next. A lease is renewed after each
step and expires on its own; a page that dies mid-map leaves a lease that expires within 60 s, after which any page may
take the record (the record reads `stale` meanwhile). **Scheduling:** it runs while the DM is not interacting with a map
frame (the client pauses the queue when any visible map session receives pointer or key input and resumes 5 s after the
last), yields between maps, and stops on `AbortSignal` (page leave). **Page memory:** the refresh frame does not
start while a visible map frame holds a CITY or METROPOLIS document; it runs when the Map tab is closed or the visible
document is a TOWN, so the page holds at most one CITY or METROPOLIS document at a time (V08 §6's page row). The queue is
persisted by `refreshPending`, so the next page resumes it. A map opened in a visible tab while queued is absorbed there
first and dropped from the queue. **Why serial:** one live document per module instance keeps memory at one rung's line
(§12.8) plus the frame's fixed cost, on any campaign size; the cost is time, bounded in V08 §6 (a campaign of 20 CITY
maps after a year in about a minute and a half of background work, the party sets included).

### 3.5 `digest` and the diff — from a whole dossier to a list of changes

**`digest(raw, host)`** (§14 item 2 states its duties; these are its steps, in order, all pure):
1. **Adapter.** `AdapterRegistry.select(raw, { line: host.line, bound })` (V08 §2.4) — `bound` the document's
   `DossierBinding.adapter.line` at an absorb; a refusal ends the call (`E_LINE_UNSUPPORTED`).
2. **Limits.** A bounded walk measures the structure before anything else reads it: bytes of keys and strings, depth,
   list lengths, against the manifest's `limits`; over any limit → `E_UNKNOWN_SHAPE` with a `size_limit` note naming the
   first limit passed (T-V8-20). No string longer than `maxString` is ever copied.
3. **Shape.** Every `requiredKeys` key present, with the types the port reads (`id` of the form `s_` + 16 hex, `name` a
   non-empty string, `tier` a string, `population` an integer in [0, 10⁷] (0 is a deserted settlement, routed by V08 §3.6 (7)),
   `institutions` an array, `_seed` present, `history.age` a finite number ≥ 0, V08 §2.6c); a
   failure → `E_UNKNOWN_SHAPE` listing up to 20 violations. An extra top-level key is never a failure: an
   `optionalKeys` key with `read: false`, or a key neither list names, is dropped into `ignored` with an `ignored_key`
   note. The hand-made teaching file fails here (§14).
4. **Records.** Each institution, power, notable, condition and calamity record is checked for its own required fields
   (a name; for an institution a category string; numbers finite); a failing record is QUARANTINED — kept out of the
   digest, its key (when one can be formed) listed in `DossierBinding.quarantined` with the reason, a
   `quarantined_record` note — and the rest proceeds (J-V8.8; V08 §3.9 row B4). The diff never removes a quarantined key
   (below), and a quarantine whose key cannot be formed holds every absent institution key.
5. **Keys, grammar and class.** The name grammar and the ladder step of V08 §3.5.1; §7.7 item 12's key law, with the
   housing-stock records set aside for DR7 by their `@housing` row; then the CLASS LOOKUP CHAIN (DR24): (a) a record with
   `renamedFrom` → the `kinds` row of the slug of its CURRENT name; (b) else its `kind` (catalogue key) → its `kinds` row;
   (c) else the slug of its name as a catalogue key → its `kinds` row; (d) else **the tags rung**: when the record's
   tags map through `tags` to exactly one family whose generic class exists, that class, noted `unmapped_kind` with rung
   `tags`; (e) else its category's generic class (`categories`), noted `unmapped_kind` — for (d) and (e) the note is
   written after the fold, its `class` the class that builds the record at the document's rung (V08 §4.6's row, V08 §3.6
   (4); at a village rung V07 §3.11 step 4's tag fallback); (f) a CUSTOM record's (`custom`
   present, V08 §2.8) class and profile are NOT decided at digest (J-VI.20): steps (b)–(e) do not run for it; the
   digest carries their inputs — `custom` (its scene tokens, `group` and keyword keys), `tags`, `category` and, when
   admitted, its `custom-def` fact — and item 104 (a)'s resolution with V11 §3.13.1's rungs (the author's map
   declaration for its `localUid`, the archetype, the category, the tags, the definition fields, the keywords with their
   `class` cell, then `generic-other`) decides both at fold, where the declaration is visible; the `custom_resolved` note
   is written after that fold (creation's `generate`, absorb's dry run, V08 §3.3) and names the deciding rung from the
   fold's report. A `kinds` row whose class is a pseudo-class routes the record to its reader (V08 §2.6's `kinds` shape)
   and gives it no roster class — `@absent:<class>[+<class>]` to S2, each named class's `min` and per-capita demand 0 at
   the settlement unless another record binds that class. A catalogue record's siting-profile family is the
   `kinds` row's `family` when set, else the `tags` families of its tags (item 103 (a); how several families combine is
   item 103's rule in §10.2), else its generic class's own. Its political `role` is carried as given (DR12, J-V8.45).
6. **Powers, notables, circumstances, economy.** Standings = power ÷ Σ power, rounded to 1/10 000; a controlled list
   resolved through the line's stable part (§7.7 item 12); relations from `powerStructure.factionRelationships`, one per
   unordered pair, with the type word and the `direction` trend word (the `relations` row gives kind, sign and strength
   at the put, V08 §3.11); notables' workplace and power resolved by name to binding keys (absent when the name joins
   nothing, noted `name_unjoined`); deposits; every listed condition whatever its status, and the stressors normalised into it
   (`stressors`, else `stress` — one object or a list — each `{ type }` a condition `cond:stress:<type>` of archetype
   `<type>`, `source: 'stressor'`, severity 0.5, no weeks); quarters; the government and `security` (V08 §2.5);
   **the economy** — each `activeChains[]` entry into `economy.chains`: its resource joined to a listed deposit by
   `resourceKey`, its processors resolved by the rule below, its outputs through V11's `goodWords`, its `upstreamChains`
   as `chain:cat:` keys, its status word through `chainStatus`; `tradeDependencies` into `economy.dependencies` (the
   institution resolved by name, the severity through `dependencySeverity`); `primaryExports`, `primaryImports` with
   `necessityImports`, and `transit` into `economy.goods` through `goodWords`; **the calamities** — each `calamityHistory`
   entry keyed `calamity:<tick>:<slug(name)>`, its severity by `calamitySeverity` over its deaths and the population at
   its week (the latest `populationHistory` entry at or before it, else the current population), its targets resolved to
   binding keys by name; **the sea threats** by the `threats` row; **the ruin evidence** by the `ruinEvidence`
   row; **the latitude** by DR29; every never-read key dropped into `ignored` (§7.7 item 1). Severities round to
   1/1 000 and percentages to 1/100 — the digest's resolution (J-V8.17), so floating noise in a host's arithmetic never
   reads as a change.
   **Resolving a name to a record** (chain processors, dependency institutions, calamity targets): the exact
   name → that record's key; else the KIND FAMILY — the name and every record's name with their count range and
   qualifiers removed, case-folded, the last word's plural folded to its singular (`-ies` → `-y`, `-es` after s, x, z, ch
   or sh, else a final `-s`) — the one record of that family (several: the first in dossier order, noted `name_ambiguous`); else
   unjoined, kept by name and noted `chain_node_unjoined` (2 585 of 3 381 surveyed processor names join
   exactly; the kind family is measured by T-V8-34 on the rest). **Goods words** (V11's `goodWords`): each label is
   resolved by V11 §3.13.5's matching rule; a label matching none is noted `unmapped_good`.
7. **Custom content** — V08 §3.13's steps.
8. **Ladder merges** — V08 §3.5.1 (c).
9. **Seed.** `settlement.seed = H32("plat:sf-seed" ‖ _seed)` (§14 item 2); `_seed` and `_config` go no further.

**The diff (`absorb`'s first step).** Carried facts (V08 §2.3) against the new digest's facts under the same keys, key by
key in code-point order, **skipping every key listed in `DossierBinding.quarantined`**: a quarantined record
keeps its last carried state, and when a quarantined record's key could not be formed, every carried institution key
absent from the new digest is held — no `remove` — with one `quarantine_hold` note, until a readable dossier arrives.
For each element kind, the fields compared and the change they make (the `op` of §7.7's `DossierChange`; the receipt
table decides cause, fate and week, V08 §3.6):

| kind | key only in the new digest | key only in carried | fields compared when in both → op |
|---|---|---|---|
| settlement | — (a different settlement key refuses the absorb, `E_OTHER_SETTLEMENT`) | — | `population` → `population`; `tierWord` → `tier` (F8); `name` → `rename` (the title only) |
| wealth (the settlement fact's `wealth`, W-DOS-02) | — | — | `wealth` → `prosperity` (F9): response `epoch` — the next epoch's `EpochInputs.wealthLevel` through `tables/dossier/wealth`, which DR6's field reads (item 102 (e)'s drift; V06 W27), never a re-roll at the absorb |
| site (the `site` singleton, W-DOS-08) | — | — | any word → `attr` with cause `frozen`, response `none` (row F-V8-8): the site is creation's (§7.7 *One path*; §7.7 DR1's bar is a creation bar), so no map event; one `frozen_fact_changed` note (class `event`) names what changed — the DM may make a new map from the record (V08 §4.2) |
| history (the `history` singleton, W-DOS-08) | — | — | its digest → `attr` with cause `frozen`, response `none` (F-V8-8): the recipe's history is creation's (V08 §2.6c (6)); one `frozen_fact_changed` note (class `event`) offers "Regenerate from the new history" — V08 §4.2's "Make a new map from the record" (V06 §3.20.8); nothing re-runs silently |
| institution | `add` (F1); under a key carried as removed or ruined → `reopen` (F6); a greater of a ladder whose lesser is carried → `add`, the lesser's members re-bound as the greater's where the greater's thing is the lesser's, else the greater placed new and the lesser's key bound as at a first reading (V08 §3.5.1 (c), (d)) | `remove` with fate `vanished` (a regenerated or rerolled record: SF never deletes, `research/sf/mapping-verify.md` V48), unless a ladder promotion re-binds it (V08 §3.5.1 (d)) or a quarantine holds it | `state`, `fate`, `inactive` → `state` (F2, F3, F5 by item 14's rows, fates first); `impairments` → `state` (F4); `name` with a demotion or upgrade receipt → `rename` + the class re-read (F15, F3) — an upgrade to a REPLACEMENT greater of a new thing places it new under the key and re-points the key's row to it (V08 §3.5.1 (d)); `kind`, `category`, `tags`, `role`, `step`, `lesserOf`, `popQualifier`, `openTop` → `attr` (a re-designation, item 18); `count` → `attr` (members added or removed, V08 §3.6); `knownTo`, `facets` → `attr` (§7.7 item 7) |
| power | `add` | `remove` | `standing`, `governing`, `controlled` → `power` (epoch data); `name` with `rename-faction` → `rename` (its relation keys re-keyed with it); `category` → `attr` |
| relation | `add` → a `PowerRelation` put | `remove` → retire | `kind`, `trend`, `sign`, `strength`, `hidden` → `attr` (a put) |
| notable | `add` → a `Person` put; a reroll's new key whose name and role equal a vanished key's → `rename` (re-bound, V08 §3.11) | `remove` → retire | `role`, `institution`, `power`, `status` → `attr`; `replaced` naming a carried notable → `rename` (the successor re-bound, F17) |
| condition | `add` → a `ConditionOverlay` put | `remove` → retire at its week | `severity`, `severityBand`, `status`, `untilWeek` → `state` (a put) |
| resource | `add` → a `DepositSite` put | `remove` → the deposit's state `removed` | `state` → `state` (F13) |
| quarter | `add` → a naming claim (§7.7 item 16) | `remove` → the claim's `unassign` (the name leaves the district) | `phrase`, `landmarks` → `attr` |
| government | — | — | `name` → `attr` (its kind by the `government` table; F11), `governingPower` → `power` |
| trade | — | — | partners, links, relationships, `goods` → `attr` (F14); income shares → `attr` (the economy slice) |
| port-values | — | — | any field — `crime`, `importPct`, `foodChain`, `legitimacy` (from the government's legitimacy), `latitudeDeg`, `threats` → `attr` on the `port-values` key, riding the next epoch's slice |
| deity | — | — | `key`, `name` → `attr` (F16: a temple's dedication at the next epoch) |
| chain (SettlementForge's) | `add` | `remove` | any field → `attr`; response `epoch`: no map event — the supply web re-derives the chain's links from the carried facts at the next epoch (DR33; V06's dossier phase) |
| dependency | `add` | `remove` | `severity`, `affected` → `attr`; response `epoch`, as a chain |
| calamity | `add` → its event in the epoch covering its week (DR28, V08 §3.6 (3)) | nothing: a calamity that leaves the line's capped history list is never undone (J-V8.54) | none (a calamity is immutable) |
| evidence | — | — | `kinds` → `attr`; response `epoch`: V04 re-evaluates the ruin at the next epoch (V08 §2.6a (4)) |
| institution, custom part | (as institution) | (as institution) | `custom.contentHash` → `attr` with cause `custom_revision` (item 104 (e): the profile re-resolved and the use re-sited by least disruption); `custom.scene`, `.group`, `.keywords`, `.required` → `attr` |
| custom-chain | `add` → a `CustomChainRecord` put (active or not) | `remove` → the record retired | `active` → `state` (item 104 (h) (7)); `nodes`, `exports`, `imports` → `attr` |
| custom-service | `add` → a `CustomServiceRecord` put | `remove` → retire | `provider`, `serviceCategory` → `attr` |
| custom-def | `add` (the library's fields first seen) | kept when the offer carries no library; `remove` (response `none`, noted `custom_library_dropped`) when its definition's revision changed and no admitted entry for the new revision came (V08 §3.13 (8)) | any field → `attr` with cause `custom_library`, only when the entry's revision equals the dossier's |

A field whose carried and new values are equal after the digest's rounding makes no change. A change that moves nothing
on the map (a notable's importance, read only by the host projection's people order, V08 §5.4 (3)) is still a change: it
updates `carried` through the ledger event (V08 §3.6 (4)) and the report, and emits no map event.

**The chains' links (item 105 (i); §7.7 DR33).** SettlementForge's chains become links of item 105's supply web
between the bound members; the links are DERIVED at every placement and epoch by the base's web (item 105 (a): never
stored), read from the carried `chain` and `dependency` facts; the port stores only the facts (bar T-V8-35). A processor that joins nothing binds nothing and never invents a building (the dossier is the truth of what exists;
DR9 places what it lists), reported `chain_node_unjoined`.

**The coverage pull inside a collective range (item 103 (f); item 392).** DR9 draws a collective record's placed
count inside the dossier's range from S2's per-capita rows; where the record's class carries a coverage row, the draw
also takes the coverage target — clamped into the range — as a weighted option beside the per-capita value, exactly as
item 103 (f) states for a standalone roster, and coverage then decides where the members go. The range stays the
dossier fact; the count inside it stays a map fact (J-V8.20).

**The latitude row (item 102; item 391).** Item 102's daylight share reads the path sun at the settlement's latitude; a
dossier gives none, so the port derives it by §7.7's DR29 — the realm block's `cell.latDeg`, else the culture's row of
`tables/dossier/cultures`, else 50° N — written into `Intent.latitudeDeg` at creation; a latitude that arrives or
changes later is a `port-values` change carried into the next epoch's slice (`PortValues.latitudeDeg`, V08 §2.5's
resolution rule), read by V05's model sampler and §8.4's path mode (bars T73-7, T-V8-22).

SettlementForge usually places a settlement on its realm map after generating it (`research/sf/dossier-seam.md` §4, C-9), so a typical map
is created with the culture's latitude and receives the realm's later. The later value never jumps the town: it
enters as an input change at the next epoch, and item 102 (e)'s drift moves the field and the uses by the evolution
engine's normal lag — a sunnier quarter slowly improves (J-V8.34). A DM who wants the latitude now sets it by
`adjust` (§7.1), a map edit with its own fate report. A document made before `Intent.latitudeDeg` existed reads 50°, the
latitude it was built with (§7.5's migration default).

#### 3.5.1 The institution ladders (item 108)

**(a) The name grammar** (applied to the record's name, in this order — the input of the `distribution` row; item 509):
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
none and a count range, COUNT; else no step. An unnumbered COUNT, QUARTER or GUILD record takes V11's range column —
the range at the kind's lowest tier — × its `rungScale` only at rungs above that tier (V11 §3.12). At a village rung
(THORP, HAMLET, VILLAGE) an unnumbered record takes V07 §2.4's range row for its step type and member class
(`village.json` `rules.ladders.ranges`, keyed by step type with the qualifier as the row's label; J-V7.105),
else V11's range unscaled. A kind whose qualifier names a step but which
V11's table lacks is noted `ladder_unknown`; a record whose kind is a greater of the committed `ladderPairs` (V08 §2.4)
that the catalogue does not list is read as a plain record, noted `uncatalogued_step` (V11 §3.12).

**(c) No double counting (item 108 (c)).** Where a greater and a lesser of one ladder row are both in the dossier, the
lesser gets `mergedInto` = the greater's key: it is not placed on its own, its range is not added to the greater's, the
roster's per-capita members of that class ARE the greater's members, and its binding key becomes an alias row on the
greater's member #1 (for SIZE and REPLACEMENT, the greater's building — save a lesser that is a pin record, which V11
§3.12's row keeps as a pin of the greater's plot: `parish_church` over `wayside_shrine` binds the shrine's key to the
churchyard `cross` pin, laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records`
at an epoch or an absorb (V07 §2.4, §3.10, §3.12 *Records at a village epoch* item 4) — while at a base rung, where no churchyard cross is laid, it aliases the church building as
above; the target is chosen where the merge is first read — the creation, or the absorb or epoch that brings the pair,
the greater arriving beside its standing lesser or by promotion ((d)) — and kept across a later rung change, the
standing fabric surviving it (V08 §3.10; J-V8.111)) — noted `ladder_merged`.
**A pair that meets over time** (J-V8.113). At an absorb where the lesser was already
placed and the greater arrives beside it, the lesser's key follows what the greater's thing is:
* **The greater's thing is the lesser's** — every COUNT, QUARTER, GUILD and SIZE step, and the REPLACEMENT rows whose
  V11 §3.12 reading keeps the lesser's thing: `graveyard` over `burial_ground` (the face re-bound), `wizard_s_tower`
  over `hedge_wizard` (the house becomes the tower), `mages_guild` over `wizard_s_tower` (the tower binds the guild's
  hall), `professional_city_watch` over `town_watch` (the posts carry on) and `cathedral_10_000_only` over
  `parish_church` (the lesser absorbed: the church converted in place with its crypt, V06 §3.9.11). The lesser's placed
  members are re-bound as the greater's members `#1…#n` (the one nearest its demand first; a `rebind` each, no address
  change) and DR9 adds members up to the greater's count by least disruption; nothing standing closes.
* **A lesser with no thing of its own** — a `@none` or `@office` lesser (`citizen_militia`, `traveling_performers`,
  `traveling_hedge_wizard`, `gates_if_walled`, `priest_resident`) — has no member to re-bind: the greater is placed as
  any added record is, and the lesser's key becomes an alias row on the greater's member `#1`, as at a first reading.
* **Every other REPLACEMENT greater is a new thing**, placed new in the absorb or the epoch that brings it — a building
  by DR9, an `assign` of its member (V08 §3.6 (5)), at a village rung through V07's records placement (V07 §3.12
  *Records at a village epoch* item 4); a `@wall` greater by the fortification's dossier path (DR2's walls list; V06
  §3.7.6 (4); at a village rung V07 §3.11's palisade REPLACEMENT: the palisade rebuilt on its trace, else a new ring) —
  and the lesser's key binds as at a first reading, its binding row re-pointed by one `rebind` (the fold re-points the
  row, V08 §3.6 (5)) noted `ladder_merged` (`ladder_promoted` under (d)): (i) a building lesser (`fish_market` over
  `fishmonger`) — an alias row on the greater's building (at a village rung the fish market's hall on the market's rim,
  V07 §3.12 (b)), the fishmonger's shop keeping its use, unbound, left to the use step; (ii) a pin-record lesser — the
  pin-lesser branch above: at a village rung the churchyard `cross`, laid in that batch by V07 §3.10's pin-record rule
  after the church, at a base rung an alias row on the church, and the lesser's former pin left standing, unbound (a pin
  lesser whose row keeps no pin — `wayside_shrine` under `cathedral_10_000_only` — takes an alias row on the greater's
  building); (iii) a `@wall` lesser (`town_walls` over `palisade` or `palisade_or_earthworks`, and the wall rows above
  it) — an alias row on the enceinte the fortification's path yields for the greater, the superseded ring keeping no
  binding.

**The guild halls.** By V11 §3.12, a GUILD record's hall binds as one member `#k` of a `craft_guilds_*` COUNT record (a guild whose `categories` family is `craft`) or a `merchant_guilds_*`
COUNT record (family `trade`) in the same dossier, noted `ladder_merged`: the GUILD records of that family take the
members `#1…#m` in dossier order, the COUNT record's placed count is max(DR9's draw, m) — above its range's top only
when the GUILD records alone exceed it, noted `count_over_range` — and no further hall is placed (J-V8.83). At an absorb the binding follows the first case of *A pair that meets over time*: a hall
already placed is re-bound as `#k` (a `rebind`, no address change), never duplicated, and a COUNT record that leaves
the list releases its bound halls back to their GUILD records (a `rebind` each), so no hall closes by a change of
wording. A GUILD record of another family, or with no such COUNT record in the dossier, keeps its own hall. The three metropolises' two church
ranges and `metropolis-3`'s two cathedral records are the fixtures' cases (V08 §2.6a (3)).

**(d) Steps over time (item 108 (d)).** A `promotedFrom` receipt (`upgraded_by_reconstruction`) keeps the record's one
key (§7.7 item 12's F15 re-binding: the line keeps the old kind's `catalogId`). Where the greater's thing is the
lesser's ((c)'s first case), it re-keys the singular record's binding row to the greater's `#1` (`rebind`) and DR9 adds
the rest inside the new range by least disruption. Where the greater is a new thing ((c)'s third case; J-V8.114), the greater is placed new as that case places it, under the record's key (at a village rung through
V07 §3.12 *Records at a village epoch* item 4), and the record's binding row is re-pointed from the lesser's former thing
to it (a `rebind`); one key binds one thing (J-V8.111), so the former thing is left standing, unbound — the fishmonger's
shop keeping its use, the roadside shrine standing, a palisade the new ring superseded decaying by its persistence rows
— and a pin the row keeps (the churchyard `cross` of `parish_church` over `wayside_shrine`, at a village rung) is laid in
that batch by V07 §3.10's pin-record rule for the record, keyed by its binding key and its provenance the record, with
no binding row of its own. A lesser that leaves the list in the same absorb that adds the greater of its ladder, with no
receipt, is read the same way — a promotion, noted `ladder_promoted`, never a removal and an addition: its key re-bound
as the greater's `#1` in (c)'s first case, else bound as (c)'s second or third case states, the greater placed under its
own key. A `demotedFrom` receipt
(`demoted_by_disaster`) keeps the member nearest its demand as the singular record (re-bound) and closes the rest by the
receipt's fate (F2's rows; the calamity's ruins stand as ruins). A demotion or promotion of a burial record follows the
same rules, so no burial face closes by a change of wording (V08 §2.6a (4)).

**(e) Custom content (item 108 (e)).** A custom record whose admitted library entry lists `subsumes` is typed SIZE when
the subsumed kinds belong to another V11 family than its own, GUILD when they are a craft of its own family, SIZE when
unknown; its `lesser` are the subsumed kinds, merged by (c).

**(f) The ladder file.** V11 §3.12's rows agree with SettlementForge's ladder data at the pinned commit
(`src/data/institutionLadders.js` at `5d699cc68`, its pairs read as data, nothing copied): the pairs the file holds carry
source `ladder` or `subsumption`, and the rows the file lacks but the dossiers list both forms of — two church ranges on
every metropolis, `metropolis-3`'s two cathedral records — stay `inferred`, since item 108 (c) must merge whatever the
dossier lists (J-V8.81). The check is release row R2's, re-run when a baseline moves (V08 §8.3).

### 3.6 From changes to events and epochs

1. **Dating.** Each change reads its receipt row (§7.7 item 13): the first receipt present gives cause, fate and week by
   §4.11's rungs; `HostContext.week` is the last rung; no rung → `week: null` and an `unreceipted_change` note. The kinds
   this volume adds are dated by rows F-V8-1 – F-V8-8 of `tables/dossier/receipts` (item 393; the base names them, §7.7
   item 13): F-V8-1 a relation by its powers' pulse week when the line stamps one, else arrival; F-V8-2 `port-values` by
   arrival, riding the next epoch; F-V8-3 a custom definition, chain or service by arrival; F-V8-4 a chain of
   SettlementForge's by arrival; F-V8-5 a dependency by arrival; F-V8-6 a calamity by its own `tick` (a receipt), riding
   the epoch at its week; F-V8-7 the `evidence` singleton by arrival, riding the next epoch; F-V8-8 the `site` and
   `history` singletons by arrival, response `none` and a `frozen_fact_changed` note (V08 §3.5; W-DOS-08). The
   settlement's prosperity word is the base's F9 (response `epoch`).
2. **Order.** Changes are ordered by week (null last), then decrees before other sources, then the dossier's own record
   order (`order`), then binding key — SettlementForge's order where it has one, ours where it does not.
3. **Epochs by the cadence — §4.11 (4) as the base states it** (J-V8.55). From the last epoch's week `W₀` (its
   `EpochRecord`, else the creation week) to the absorb's week `W₁` (the latest dated week, else `HostContext.week`, else
   `W₀`): an epoch at every calendar year end `W` with `W mod 52 = 0` in `(W₀, W₁]` (the `sf445` calendar's year); an
   epoch at the first week the population leaves the last epoch's `populationTarget` ± 5 % (read from
   `populationHistory`; with none, at `W₁` when the new population is outside it), the reference then moving to that
   epoch's target, so every crossing inside the span adds its own epoch; and an epoch at the week of each newly carried
   calamity that no other epoch falls on (a destructive event is epoch content, §4.11's rung at an epoch). Each epoch's
   `populationTarget` is the population at its week — the latest `populationHistory` entry at or before it, else linear
   between the target at `W₀` and the new population at `W₁`, rounded to a person — and its `circumstances` are the new
   digest's slices (trade, economy, powers, government, `port`): SettlementForge keeps no interior history of them
   (`research/sf/mapping-verify.md` V52, V56), so every epoch of a catch-up reads the end state, declared (J-V8.25). **The calamities (DR28;
   V06's DR28, the same row: V06 writes the reader, this volume the inputs).** Each newly carried calamity is one entry
   `{ week, kind: 'calamity', calamity: CalamityRef }` in `EpochInputs.events` of the epoch at its week, V06's
   `CalamityRef` filled as `{ id: its key, name, type, severity, targets: the use ids of its resolved, bound targets,
   deaths }` (`deaths` for V04's burial growth, V08 §2.6a (4); V06 §2.4); its F5 targets' dossier
   events at the same week ride the same epoch's `EpochInputs.dossier`, so V06's hazard phase strikes them in place; a
   target that joins nothing is dropped from the list, noted `calamity_unplaced`. The calamity-to-hazard mapping is
   V06's table; the port maps nothing (J-V6.70).
4. **The ledger event** (J-V8.14). The absorb's first event is one `dossierFacts { changes, quarantined,
   notes, notesCleared }` (item 358): every `DossierChange` of this absorb with its full `before` and `after` carried
   facts, and the WHOLE quarantine list after this absorb, author `host`, no model effect. Folding it sets `carried[key] =
   after` for each change, sets `DossierBinding.quarantined` to the list, appends `{ seq, week: W₁, factHash, changeIds }`
   to `absorbed` and removes `changeIds` from every entry older than the newest 64 — so the dossier block is rebuilt from
   the log by folding these events alone, equal to the stored block at every seq (§2.9's "the fold rebuilds it").
   Creation's prefix opens with the same event, every fact an `add`. **The port's notes** (J-V8.98). `notes`
   holds, in the order written, this run's notes of class `event` and those of class `standing` whose identity (V08
   §2.4) `DossierBinding.notes` does not hold; `notesCleared` holds the identities of the binding's standing notes this
   run no longer writes; notes of class `report` never enter the log (V08 §4.6's class column). Folding the event sets
   `DossierBinding.notes` to the old list less `notesCleared` plus the standing notes of `notes`, in identity order —
   no model rule reads either field. The `custom_resolved` and `low_confidence` notes of the custom records this run
   adds or revises (`add`, `custom_revision`) are written after the dry run's fold (V08 §3.5 (5) (f)) and appended to
   `notes` before the events are encoded; since no model rule reads `notes`, the dry run's result stands, and every
   editor's re-run (V08 §3.3) computes the same bytes. They are `event` notes: the live resolution — which a DM's
   declaration may change at any time — is the why card's (V10 `WhyAnswer.profile`, V09 §2.7's `chips`), never a stored
   note. Every `unmapped_kind` note (a `standing` note, V08 §3.5 (5) (d)–(e)) is likewise written after the fold — the
   dry run's at an absorb, `generate`'s at creation, the loaded document's state for an offer answered `unchanged` — its
   `class` the class that builds the record there (V08 §4.6's row; J-V8.112), before `notes` and `notesCleared`
   are computed, so a note whose built class changed at a rung change is cleared and written anew at the next port run;
   the same bytes follow on every editor's re-run for the same reason. A digest whose dossier changes nothing
   (`unchanged`) writes no event, so its notes reach the host's report only.
5. **Emission, by the receipt row's response.** `assign` → an `assign` of a dossier-backed assignment (§7.7 One path:
   placed by S10b's `dossier` request, the least-disruption order — at a rung of a product that declares a records
   placement, that placement first, V06 §2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*); `unassign` → `unassign`; `status` → a `setAttr` of
   the assignment's `state` (and `memberState` for a collective, by DR25's distribution); `setAttr` → a `setAttr` of the
   named path (a re-designation mutates by §4.7 S11); `rebind` → a `setAttr` of the bound entity's `dossier` ref to the
   new key (the fold re-points the binding row; no address changes, §6.3; item 390) — also for a ladder promotion
   (V08 §3.5.1 (d)), a relation re-keyed with its power and a notable re-bound after a reroll (V08 §3.11); a staged
   record → `dossierRecord` (V08 §3.11), the stressors' overlays among them; a count change → `assign` of the added
   members as `dispersed` additions or `setAttr` of `memberState` `removed` on the members DR25's rule picks (`siting`
   keyed by the assignment and the event's `seq`); `epoch` and every slice-level change — `port-values`, a chain, a
   dependency, the `evidence` singleton — → the epoch of (3), where the slice, the carried facts and V04 and V06's
   phases read them; a calamity → (3)'s event; `none` → nothing beyond the ledger. Each emitted event carries its own
   `DossierChange` in `EditBase.dossierChange` and the binding key in `EditBase.dossier` (§7.1).
6. **Placement in the log; the session.** Element events fold as standalone events at their week, between the epochs of
   (3); one dated exactly at an epoch's week rides that epoch's `EpochInputs.dossier` (§7.7 item 6); undated ones follow
   the last epoch, applied finished (no Works). All take `seq` from `nextSeq` in this order, `author: 'host'` and the
   reserved session `host:port` — never a user's session, no `group` (item 359); the envelope's `session` is the
   same (§11.3's *Logging*).
7. **Refusals at absorb.** A digest whose population routes outside the base ladder with no registered product
   (V08 §3.10) refuses the whole absorb (§7.7 item 15), as does `E_OTHER_SETTLEMENT`; nothing is emitted and the map is
   held (V08 §3.9). **A deserted settlement**: with the village product registered, a population of 0 at an
   ABSORB routes to THORP and V07's desertion (V07 §2.1, §3.12; an outcome, never a refusal) — a document whose product
   is the village runs it at the epoch directly, and a base-product document reaches it through V07 §2.1's fold, 0
   lying below the band's lower edge (J-V8.85); at a CREATION a population of 0 is refused `E_RUNG_UNAVAILABLE` naming
   the floor (V07 §2.1). With no village product registered, 0 is held like any population below 1 500 (B7).

### 3.7 Persistence inside the host — commit, compaction, thumbnails, backups

**The host stores; the module computes** (J-V8.46). Every encoded event, sequence number, head and snapshot
field the store holds arrives in a message: `doc.changed` and `dossier.result` carry `encoded`, `seqAfter` and
`logHeadAfter` (the module's canonical CBOR of each event and §11.3's `logHead` after them); `dossier.result.created`
and `doc.snapshot.ready` carry the whole `SnapshotBlock`. The host verifies only what it can — that a proposal's
`baseLogHead` equals the head it holds — and stores the rest as handed. It never decodes a byte, never hashes an event
and never computes a head (T-V8-5 runs against a store that cannot).

* **Commit.** Every committed event — a user's edit (`doc.changed` accepted), an absorb's events, an undo — is appended
  by the host to `tail` through `MapStore.commitEvents(mapId, baseLogHead, encoded, seqAfter, logHeadAfter, absorbed?)`;
  `'stale'` means another writer moved the head, and the host answers the client `doc.rejected { stale }` (§11.3). An
  absorb's commit also writes `absorbed` and `lastOffer` in the same compare-and-set.
* **Compaction** (J-V8.5). When the tail passes 256 events or 256 KB, and at every `created`, `upgrade`
  and `rebase`, the committing editing client sends `doc.snapshot` and calls `MapStore.replaceSnapshot(mapId, snapshot)`
  with the `SnapshotBlock` of the reply. The store's precondition is that the snapshot's `logHead` is the record's head
  or the `logHeadAfter` of an event in its tail — so an edit committed between the request and the store call does not
  refuse it: the store keeps the tail's suffix after the snapshot's head, moves the old snapshot to `backups[0]` with the
  removed segment as its `tailAfter`, keeps the older backups without their segments and drops every backup beyond
  `MapHostConfig.backupDepth` (SettlementForge's backup rule, J121; with a depth of 0 the old snapshot is dropped, and
  B10's second and third rungs are absent) — all in one transaction. A snapshot whose head is in neither place is `'stale'` (a restore or a new map replaced the log) and is
  discarded; the next commit's threshold check retries. The snapshot's canonical bytes include the whole log (§2.9), so
  nothing is lost by compaction; it only makes the next load start later in the log. `doc.snapshot` is an editing role's
  message and is not an export: `E_HOST_FORMAT` does not apply to it (V08 §5.4).
* **Load.** Snapshot plus tail replays to the session's state exactly (T-V8-5), because the tail is the log's suffix
  and `doc.apply` folds it (§11.3).
* **Thumbnails.** After each committed absorb and each compaction, the committing client (or the refresh queue)
  requests two 512-px PNGs — one under key `public` (the anonymous and gallery fallback; `exportPicture`'s `knowledge`
  the key form `{ tier: 'public', places: [] }`, J-V8.92) and one under `secret` (the DM's; no `knowledge`, the requester's
  own key) — at the city band with the document's style and a fixed sun (an export has no pointer, §11.1), and stores them with
  `putThumbnails`. They are what the tab shows before the frame is ready and what a failed boot leaves. The players'
  pictures are the party set of V08 §3.14.
* **Backups and restore** (J-V8.44). `backups` hold the previous snapshots, as many as `backupDepth` (J121). The DM's "restore previous map"
  (V08 §4.2) refuses a backup whose `docId` differs from the record's `mapId`; otherwise it makes `backups[0]` the
  snapshot with an empty tail (the swapped-out snapshot becoming `backups[0]`), and the host then sends every open session
  of the map a fresh `doc.load` (with `module.status { loading }` between), so no client is left on a head the log no
  longer has; the next offer absorbs the current dossier forward, so the dossier stays the truth and only the map's own
  edits since that snapshot are lost — the dialog says so and lists them.
* **The local draft mirror (V09's).** Volume V09 keeps, in host mode, only a draft mirror in the module origin's
  own storage, keyed by the document id (V09 §3.8 (6)): the unsent edits of a session. At load, the mirror is replayed
  only when its base head is the record's head or the `logHeadAfter` of an event in the loaded tail; otherwise (a restore,
  a new map, another device's commits past a compaction) it is discarded with the notice `host.mirror.dropped` "Unsaved changes from an
  earlier version of this map were dropped." The mirror persists inside SettlementForge's page only when the module's origin
  (SettlementForge's, J121) is same-site with SettlementForge's app, as third-party storage partitioning requires;
  otherwise it lives for the session only (T-V8-53 covers both).
* **Sizes, per map:** the snapshot within §2.9's size budget, the tail ≤ 256 KB between compactions, `backupDepth`
  backups (the newest with one tail segment ≤ 256 KB), two thumbnails ≤ 150 KB each and the party picture set (V08 §6's
  storage row). SettlementForge decides whether a record counts against a plan and how large it may be (J121): with
  `quotaBytes` set, a commit that would pass it still commits — the map's log is never refused for size — and the client
  reports `host.status.quota` to the owner, the next compaction dropping backups beyond the allowance first.

### 3.8 Versions and migrations on both sides

**Ours.** The output version (§6.4): a stored document inside the retention window replays exactly under its own version;
the owner's client gets `module.status { upgrade-available }` and the upgrade dialog with §7.5's diff; an accepted
`upgrade` is an ordinary event over the bridge, compacted at once; the players' pictures keep the stored version's
drawing until the DM upgrades (J-V8.22). The owner's "Update the map engine" action (V08 §4.2) is the host's upgrade
request that volume V06 names for a document whose epochs carried dossier events (V06 §3.15): such a document is never
upgraded by anything else. Outside the window the document opens as §2.9's frozen view for everyone, and the owner is offered
the `frozenImport` rebase by V09 §3.14 (b)'s **Edit it with this version**, committed through `doc.changed`, after which the
client sends `doc.snapshot`. The schema version: a newer document opens read-only (§2.9 step 1) — a host serving an older
module to a newer document is a deployment error, reported in `module.status { error }`. The dossier row sets: `absorb`
reads `tables/dossier/*` at the DOCUMENT's pinned versions (§2.9's `tablePins`), so every client on one output version
computes one result; a new table version reaches a document only through `upgrade`. The adapter version: V08 §2.4's
manifest; below.

**SettlementForge's.** A dossier carries `schemaVersion`, `simulationVersion` and `generatorVersion` (`research/sf/dossier-generation.md` §3.2); the same seed gives different dossiers on two lines at one
`generatorVersion` (§4.5 there), so the LINE, not the version fields, names an adapter. The port never re-generates a dossier and never
reads SettlementForge's code, so SettlementForge's internal migrations reach the map only as a changed dossier shape.

* **A new adapter version on the same line** (SettlementForge changed a field's shape; we changed a mapping). At the
  next absorb, when `binding.adapter.version` differs from the running adapter's, the port first RE-BASELINES: for every
  carried key, a difference confined to fields the new manifest's `remaps` list for that `fromVersion` is recorded in the
  ledger event with `cause: { kind: 'adapter_remap' }` and response `none` — no map event — and noted `adapter_remap`;
  every other difference is a real change and is absorbed as usual (J-V8.10). An adapter version that changes a field's
  meaning without listing it fails T-V8-10 on the re-cut fixtures, so the declaration is enforced.
* **A new SettlementForge line** (the owner names a shipping line; §14 item 1). One new adapter folder with its
  manifest; the fixtures re-cut by the same scripts; `fromLines` declares how an older line's binding keys map to the new
  line's (`identity` when the key law is unchanged). When a document bound to line A receives a dossier the registry
  gives to line B: B's `fromLines` entry for A re-keys the binding rows (a `rebind` `setAttr` per changed key, V08 §3.6
  (5), no address changes), `binding.adapter` becomes B's, a `line_migrated` note is written, and the absorb proceeds by
  the re-baseline above with B's `remaps` for A. No `fromLines` entry for A → `E_LINE_UNSUPPORTED` and the map is held
  (J-V8.11).
* **The release of a line.** The checklist of V08 §8.3 runs the creation and absorb bars on the new line's fixtures, the
  cross-line migration on the old line's pairs, and T-V8-10 and T-V8-11.

### 3.9 Failure handling — every failure, its detection, its rung and what the user sees

No failure discards a stored map, and none re-rolls one (§5). A **held** map shows its last committed state with
`host.status.held` and its reason row — the refusal's `held` note, whose `msg` is one of this section's `host.held.*`
rows, stored as `MapRecord.held.reason` (V08 §2.1) — its `MapRecord.status` `held`, and every later dossier is a retry.
The column "the user sees" names catalogue keys (V08 §4.6, §5.1); each key's words are written once — a `host.held.*`,
`host.recovered.*` or `host.verify.*` row here, a `host.status.*` or `host.party.*` row in V08 §5.1's table, a
`host.note.*` row in V08 §4.6's. A refusal at a CREATION shows `host.status.notCreated` and the reason row in the
thumbnail slot. `E_RUNG_UNAVAILABLE`'s row is chosen by its case: `.village` below the floor with no village product
registered, `.cap` above the 120 000 cap (`{cap}` the cap), `.empty` a creation at population 0.

| row | failure | detection | ladder (first rung that succeeds wins) | the user sees |
|---|---|---|---|---|
| B1 | the frame does not start (origin down, CSP, script error) | no `ready` within 20 s | re-create the frame once → the stored thumbnail with a retry button | `host.status.failed` (V08 §5.1) |
| B2 | a reply never comes (worker crash, out of memory) | `replyTimeoutMs` | the client re-creates the frame and re-loads the record → on a second miss, the thumbnail | `host.status.stopped` (V08 §5.1) |
| B3 | the dossier is too big, too deep or not the line's shape | V08 §3.5 steps 2–3 | refuse `E_UNKNOWN_SHAPE` → held | `host.held.E_UNKNOWN_SHAPE` "The settlement's record could not be read." (with a `size_limit` note in the host's report when a limit was passed) |
| B4 | one record is malformed in a readable dossier | step 4 | quarantine the record, absorb the rest → the quarantined element keeps its last carried state on the map (or, at creation, is not placed) and is retried at every later offer | `host.note.quarantined_record` (V08 §4.6) |
| B5 | no registered adapter accepts the dossier, or the named line's adapter refuses it | `select` (V08 §2.4) | refuse `E_LINE_UNSUPPORTED` naming the candidates → held (several accepting adapters are B19, never a refusal) | `host.held.E_LINE_UNSUPPORTED` "This SettlementForge version is not supported by the map yet." |
| B6 | the dossier is another settlement's | the settlement key differs from the binding's | refuse `E_OTHER_SETTLEMENT` → held; the host's own records keep settlements apart, so this row catches a host bug | `host.held.E_OTHER_SETTLEMENT` "This record belongs to another settlement." |
| B7 | the population leaves the base ladder with no product for it | the router (V08 §3.10) | refuse `E_RUNG_UNAVAILABLE` naming the village product or the cap → held (creation: no map, the thumbnail slot says why); with the village product registered, a population of 0 at an absorb is no failure — it routes to THORP and V07's desertion — and at a creation 0 is refused `E_RUNG_UNAVAILABLE` naming the floor (V07 §2.1; V08 §3.6 (7)) | `host.held.E_RUNG_UNAVAILABLE.village` "This settlement is smaller than this map build draws." (a build without the village package only: J122's order registers the village product before M-SF, V08 §3.10); `host.held.E_RUNG_UNAVAILABLE.cap` "Settlements of more than {cap} people are larger than the map draws."; a creation at 0: `host.held.E_RUNG_UNAVAILABLE.empty` "The settlement's record lists no inhabitants." |
| B8 | the head moved under an absorb | `doc.rejected { stale }` | re-run `absorb` on the new head, three times → `module.status { error }`, retried at the next offer | nothing, or `host.status.absorbing` (V08 §5.1) |
| B9 | the store's compare-and-set fails | `'stale'` from `MapStore` | reload the record, re-apply as B8 | nothing |
| B10 | the snapshot is damaged or its root mismatches | §2.9 step 3 | §2.9's corrupt-cache replay from the recipe and log → if the snapshot cannot be decoded at all, `backups[0]` plus its `tailAfter` segment plus the current tail (exact, since the segment holds every event the last compaction removed, V08 §3.7) → the next older backup absorbing forward, the map edits since it lost and listed → a new map from the current dossier, reported (a rung whose backup `backupDepth` does not keep is skipped) | as `module.status.detail` beside the `ready` row: rungs 1–2 `host.recovered.rebuilt` "The saved copy was damaged and has been rebuilt."; rung 3 `host.recovered.lost` "The saved copy was damaged and rebuilt from an older one; {n} of the map's changes were lost." (the lost edits listed in the report, V09 §5.7); rung 4 as B11 |
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

### 3.10 The village-tier hand-off

`LadderRouter.route(population)` (§1.1) is the one decision of which product builds a population. The village product
registers its `ProductDecl` in `StrategyRegistry.products` (V07 §2.1; item 202) — the one registration of file f item
202; the port registers nothing and consults `LadderRouter`: at `creation`, which product and rung build the dossier's
population; at every `absorb`, only whether the population lies in a registered product's range. The
product's rungs, range, stages and strategies are V07's `ProductDecl` and are not restated here.

J122's combined order builds the village product (V-M, after M4) before M-SF, so every live SettlementForge build has
it registered and small settlements are drawn by it. Only a build without the village package refuses a population
below 1 500 (§7.7 item 15) and holds a mapped town that shrinks below 1 500 at its last state (B7) until the dossier's
population returns above 1 500 — then the next absorb diffs everything since the held state in one pass. With the
village product registered: a village-sized dossier is
created on the village rung rows by that product (V07 §3.11); and a crossing is §4.11's rung change as item 322 states
it — the product at an epoch is V07 §2.1's fold with its hand-off band (`handoff.band`), so a town passes to the village
product, and a village to the base product, only when an epoch's target leaves the band, and inside the band the
previous product runs on its own rung row. Everything the epoch builds from then on follows that product's
stages, and the standing fabric survives as it survives any growth stage (§6.3). A population of 0 at an absorb is V07's
desertion (V08 §3.6 (7)). One document, one seed, one history across both products (J-V8.12). The village volume
(V07) owns what the village product builds and its fold; this volume owns the port's consultation and the one-document
rule, and T-V8-19 tests them with a test `ProductDecl` registered.

### 3.11 The staged records, the per-settlement values, the realm block and the audience in use

* **Conditions and stressors**. Each digest condition is put as a `ConditionOverlay` (`cond:<id>`;
  archetype, severity, `sinceWeek`, `untilWeek`) whatever its status — the line's statuses are `stable`, `worsening` and
  `easing`, and its list holds only live conditions. Its weeks come from its ticks: with `W` the dossier's week
  (`HostContext.week`, else the latest tick of its `populationHistory`, else 0 at a creation), `sinceWeek =
  round(W − duration.elapsedTicks)` and `untilWeek = round(W + duration.expiresAtTicks − duration.elapsedTicks)` — the
  reading that `expiresAtTicks` is the condition's whole length (a generated condition carries `elapsedTicks` 3.25 and
  `expiresAtTicks` 6 at tick 0). T-V8-18 holds `untilWeek` within ±1 week across town-1's and city-1's one-week,
  one-season and one-year ticks; where it does not, the adapter's next version reads `expiresAtTicks` as an absolute tick
  (`untilWeek = expiresAtTicks`), a declared remap (V08 §3.8), and T-V8-18 then holds that reading (J-V8.63). A condition the dossier stops listing is retired at the absorb's week. Each
  stressor is put the same way under `cond:stress:<type>` (archetype its type, severity 0.5, `sinceWeek` its first
  absorb's week, no `untilWeek`) and retired when no longer listed. Effects are the `conditions` row's (V08 §2.6): the
  tint through §8.2's thematic rows, the Works factors through DR21, the activity scalars and the dials at the next
  epoch. Stressors add no `EpochInputs.events` entry: their one path is the overlay, which the epoch's readers read
  (J-V8.56).
* **Deposits**. Each listed deposit is put as a `DepositSite` (`res:<key>`; family by the `deposits` row, its
  state). Its derived fields are S12a's: reading the creation prefix's deposit puts ahead (item 395), S12a draws the
  bearing on `hinterland.outside` keyed by the deposit key (the realm block's bearing for it wins when given) and writes
  `bearingCdeg`, and the land use it makes writes `landUse` — both derived, recomputed on regeneration, never in the
  event (DR19). A state change is a put at its week and converts the land use at the next epoch (§4.11). The
  `magical_node` and `ancient_ruins` sites follow V08 §2.6's `deposits` row and V04's `ruinCentre()`. A land use a
  record's hard row needs and no listed deposit opens is put as a derived site, `res:derived:<landuse>`, by the same
  row's rule, placed by S12a like any other.
* **Power relations**. Each unordered pair of the powers' relations is put as a `PowerRelation` with the
  `relations` row's neutral `kind`, its `sign`, its strength × the trend factor and its `hidden` flag (item 257 adds
  `sign` and `hidden` to the record); §4.5's typing reads the prefix's relation puts ahead (item 395) as a soft adjacency
  row — attraction for a positive sign, repulsion for a negative — and item 72's political component reads them as the
  base states. A hidden relation is never named on a public view (DR20).
* **Notables.** Each notable is put as a dossier-backed `Person` (`npc:<id>`): pinned whole, its `Posting` at
  `workplaceKey`'s element and its `Membership` in `powerKey`'s power, housed by §2.7's rule in the district of its
  institution or its power's seat (a notable whose names join nothing is housed in the governing power's seat district,
  noted `name_unjoined`). A successor (`replaced` names a carried notable) is put with the old person's house and posting and the old
  record retired (F17); a notable reported dead or gone is retired; its house stays a house. **A reroll** (`research/sf/PLAN.md`'s
  J-M11): on an absorb whose settlement shows a reroll (F21's receipt), a vanished `npc:` key whose name
  and role equal a new key's is re-bound to it (`rebind`, noted `npc_rebound`), keeping its house and posting; any other
  vanished key is retired and the new one put.
* **History.** At creation only: `Recipe.history = { ageYears: history.age, scars, … }` — one scar per historical
  event by the `historyScars` row (V08 §2.6) with its `yearsAgo` and severity, and item 113's additions by V08 §2.6c;
  never updated by later dossiers (`ageYears` is never advanced by the host's weeks, §2.7; a later rewrite is V08 §3.5's
  frozen `history` row). The `magical` events give no scar; they are ruin evidence (V08 §2.6a) and replay events.
* **Per-settlement values.** `PortValues` from the digest — crime by the `crime` row, `importPct` = `foodImportPct` ÷
  100, `foodChain` = `foodChains`, legitimacy, `threats` by the `threats` row, and `latitudeDeg` (null in the creation
  slice, where `Intent.latitudeDeg` holds DR29's value; a realm latitude that arrives later fills it) — in the
  creation slice and in each epoch's slice (V08 §3.6 (3)).
* **Custom kinds**. The dossier's custom definitions are `PortRows.customKinds` rows DERIVED at read time: the
  rows in force are the table's (empty in the base) overlaid by one row per carried custom institution — `kind` its
  definition id (its class is item 104 (a)'s resolution at fold, V11 §3.13; item 425, J-VI.20) and,
  only from its carried `custom-def` fact (an admitted library
  entry, V08 §3.13 (8)), `economicWeight` and `criticality` by the `customWeights` row (V08 §2.6; a dossier row set, not
  calibratable, J-V8.108), `defenseRoles` and `powerAuthorities` (the entry's `defenseRole` and `authority`)
  (item 425). Nothing is written into the recipe's params, so a revision changes them through
  its own `setAttr`'s fold (V08 §2.8) with no `editTable` — whose re-derivation from its first reader stage would be the
  reshuffle item 22 forbids. Their records, chains, resources and services arrive as V08 §3.13 states.
* **The realm block** (J-V8.27; item 396). The client's `realmBlockFrom(placements)` computes, host-side and
  without module code, from the campaign's placements (the settlement's and its partners' realm positions), the realm
  map's scale and latitude scale, and the campaign's spatial digest (the cell's terrain, river and coast words) —
  nothing else of campaign state: each partner's `bearingCdeg = round(100 × atan2(Δx, −Δy) in degrees) mod 36 000` (realm
  y grows southward), `distanceM = hypot(Δx, Δy) × mPerRealmUnit`, the cell, and `latDeg = degAtY0 − y × degPerUnitY`
  when the latitude scale is given. The module uses it as §7.7 layer 2 states (true bearings, north first) and as DR29's
  first input. The host sends it with an offer only when the settlement is placed on the realm.
* **The audience in use.** The client maps SettlementForge's audience words through §14's table: the DM's page mounts
  with `dm` (owner, secret) and a co-DM's with `co-dm` (editor, secret); a player's page never mounts a frame — it shows
  the party picture set and gives its assistant the party gazetteer (V08 §3.14); anonymous, gallery and DM-full
  shares get picture exports only (V08 §5.3). The module takes the lower of the role it is told and the audience word's
  (J-V8.29), both carried by `doc.load`.
* **Display names** (J-V8.28). For a public picture the host computes, with its own public-projection filter, the veiled text of
  every name it wants veiled and passes `displayNames` (binding key → text) with that one export request; the module
  draws them for that export only (§11.1; T85-3 through the bridge, T-V8-16).

### 3.12 Determinism

The port reads no clock and no randomness beyond named streams: partner and deposit bearings on `gate.pick` and
`hinterland.outside` keyed by the element's key, member choices on `siting` keyed by the assignment and the event's
`seq` (§6.1). `hashDossier`'s canonical JSON, the one-way seed, the host-minted `docId`, the reserved session
`host:port` and pinned tables make creation and absorb byte-identical on every editing client and engine (T-V8-3,
T73-8), which is what lets two editors race safely (V08 §3.3) and every editor verify an applied absorb. The
epoch weeks and population targets of V08 §3.6 (3) are integer arithmetic on the dossier's receipts; a condition's
weeks (V08 §3.11) are rounded to the nearest week. The party pictures (V08 §3.14) are drawn from the committed document
under a fixed key, style and sun, so two renders of one head give byte-identical tiles (T-V8-41).

### 3.13 Custom content's arrival — records, keywords, chains, services and the library (item 104's host side)

The port carries custom content to the map; what the map does with it — the resolution order's rows, the chain's flow
order, its closeness at street scale or its stretch along a road (item 104 (h) (3) as revised by item 107 (e)), the
coverage defaults — is item 104's base mechanism (applied by the coherence pass
from file g) with volume V11's rows. These steps run inside `digest` (V08 §3.5, after step 6), all pure:

1. **The record.** For each `institutions[]` record with `source: 'custom'`: `custom.uid` = `localUid`; `definitionId`,
   `revision`, `contentHash` from the record's own definition fields, else from the `materializedDefinitions` row of
   the same `localUid`; with neither, `contentHash` = H128 over the canonical CBOR of (name, category text, tags, scene
   tokens) and a `custom_unversioned` note — so an edit of those fields still reads as a revision. `categoryText` is the
   trimmed text; `group` by V08 §2.6's `categories` chain; `required` from `required`. A record without `localUid` keys
   by name (§7.7 item 12's third rung) and is noted `custom_unkeyed`.
2. **Scene tokens.** `sceneProfileId`, `landmarkLevel` and `materialFamily` are checked against the adapter's copy of
   the line's enumerations (17, 2 and 6 values); an unknown value is dropped, noted `unmapped_word`; absent tokens stay
   absent (they are optional on the line).
3. **Keywords (item 104 (a) (6)).** The name, then the description: Unicode NFKC, lower-cased, split on every character
   that is not a letter or a digit, tokens shorter than 3 characters dropped; each token and each adjacent pair joined by
   one space is looked up in `keywords` (V08 §2.6); matches are kept in order of first occurrence up to 16, then sorted.
   The description is read here and nowhere else: it is not carried, not in the digest and never in the document
   (§7.7 item 1's prose rule; J-V8.32). SettlementForge itself advises reading tags before names, so these keys enter
   the resolution as its weakest rung and the report marks a profile decided by them `low_confidence`.
4. **Resources.** Each `config.nearbyResourceDefinitions[]` entry with `custom` true → `customResources` under
   `res:uid:<localUid>`; it is also listed in `site.deposits` (§14) with `custom: true` and `state: 'available'`, so DR19
   and `DepositSite` (V08 §3.11) carry it; its family and land use come from the admitted library's resource `category`
   (its kind: `water` → the river or the coast, `land` → fields or pasture, `subterranean` → a mine or quarry at the
   hinterland edge, `special` → its own deposit site; item 104 (b)), else from its name's keywords, else `land`.
5. **Services.** Each `availableServices.<category>[]` entry with `custom: true` → `customServices` under
   `svc:uid:<localUid>`, `serviceCategory` = the bucket, `provider` = the binding key of the institution its
   `institution` name joins (exact name, then the line's slug); no join → absent, noted `custom_node_unjoined`.
6. **Chains.** Each `economicState.customChains[]` entry → `customChains` under `chain:<chainId>`: `active` =
   (`activation.state` is `active` and `status` is `active`) — the dossier's own verdict (J-V8.33); the resource name
   joined to a custom resource (exact, then slug), else to a catalogue deposit by the `deposits` table's label; the
   processors joined to institutions' binding keys in listed order; each output's `uid` from the
   `tradeEndpointOwners.exports[]` entry whose `label` equals it; `exports`, `imports`, `promoted` as given. A node that
   joins nothing keeps its name, noted `custom_node_unjoined` — the chain still pulls between its joined nodes.
7. **Cross-links and volume.** From admitted library entries only (step 8): each `requires`, `produces`,
   `requiredInstitution` and `requiredResources` reference of a chain node — `custom:<localUid>` to that item's key,
   `prebuilt:<category>:<slug>` to `inst:cat:<slug>` when the roster holds that catalogue key, else to the institution
   whose slugged name equals `<slug>` — becomes a `crossLinks` row (item 104 (h) (4)); an unresolved reference is noted `name_unjoined`
   and dropped. The chain's `volume` is its last processor's admitted `economicWeight`, else `moderate` (item 104 (h) (2)).
8. **The library (item 104 (a) (5); J-V8.31).** An entry of `HostContext.customLibrary` is ADMITTED only when its `definitionId`,
   `revision` and `contentHash` equal a definition the dossier materialised; any other entry is ignored with one
   `library_mismatch` note (the library can enrich a definition the dossier holds, never add one: the dossier is the sole
   truth, item 20 (h)). Admitted entries become `customDefs`, carried as `custom-def` facts under `def:<definitionId>`.
   An offer WITHOUT a library changes nothing that was carried (the `def:` keys are diffed only when the new digest
   holds them). When a definition's revision changes and the offer carries no admitted entry for the new revision, the
   old `def:` fact is removed (response `none`; noted `custom_library_dropped`): stale fields never describe a new
   revision, and the resolution falls back to the dossier's own rungs until the host sends the new entry.
9. **Order of the creation prefix.** After the `dossierFacts` ledger event: the `dossierRecord` puts — conditions,
   catalogue deposits, custom resources, power relations, custom chains in key order, custom services; then the `assign`s
   — first the institution nodes of every ACTIVE chain, chains in key order and each chain's nodes in flow order (a node
   in two chains at its first appearance), so a downstream node is always placed after its suppliers (item 104 (h) (4); J-V8.41);
   then every other record in the dossier's own order; then the notables' `Person` puts. Absorb emits in V08 §3.6's
   order, and within one week the same rule: chain records before their nodes' assigns, nodes upstream first.
10. **Changes and their events.** A new custom record is an `add` (F1) like any institution. A new `contentHash` is an
   `attr` change with cause `custom_revision`, emitted as a `setAttr` of the assignment's `custom.revision` path: the fold
   re-resolves the profile from the new record and re-sites the use by item 22's least disruption, the report saying
   why (item 104 (e)). A chain that becomes active is a `CustomChainRecord` put with `active: true` at its week (arrival
   week: SettlementForge stamps no activation week) — its nodes are then re-sited against each other by least
   disruption, upstream first (item 104 (h) (7)); one that becomes inactive is a put with `active: false` — its nodes
   keep their sites and lose the pulls; a chain the dossier stops listing is retired, and one that returns under the same
   `chainId` is put again on its retired record, so its nodes, which never moved, keep their sites (item 104 (h) (8)'s
   toggle bar). A service whose provider changes is a put with the new provider.
11. **Never fails (item 104 (d)).** No custom input refuses a digest: a malformed custom record is quarantined as any
   record (V08 §3.5 step 4); unknown words, unjoined nodes and mismatched library entries are notes. Counts join the
   manifest's `maxRecords` (200 per list).

**Determinism.** Every step is a pure function of the dossier, the admitted library entries and the pinned table
versions (`archetypes`, `categorySynonyms`, `keywords`, `categories`, `tags`, `deposits`); no step reads a clock or a
stream. The admitted fields are carried in the document, so replay never needs the host (§11.4's rule for host input).

### 3.14 The players' view — the party picture set and the party gazetteer

A player never holds the map. §11.1 *Knowledge* says a host that keeps a place secret from a client "sends that client
pictures and interchange exports, never the document", and SettlementForge builds its own player face player-safe by
construction, from a public projection and never the DM's ledger (CONFIRMED at `5d699cc68`). So the
players' Map tab is fed from the map record alone: stored pictures and a stored list of words, made by an editing
session or the refresh frame under the party's key (J-V8.57).

1. **The party key.** `MapRecord.party` (V08 §2.1) holds the party's base tier (`public` or `local`) and the places
   revealed above it (binding keys for dossier elements, addresses for map places). Rendering — the module's, on the
   client's `party.render` (3) — resolves it to item 572's key form `{ tier, places }` (the `Admission` form of §2.9's
   view-state `knowledge`), `places` always present and possibly empty: each binding key through the binding rows to its
   entity's address (a collective record to all its members), each address as given; a key that no longer resolves (a
   place since removed) is skipped and kept in the list, so a re-opening re-reveals it. Every party render passes that key
   form as the `knowledge` of each picture it draws (`ExportOpts.knowledge`, item 453) and as the `admitAs` of each query
   it makes (item 572), so the set admits exactly what both the session's `secret` key and the party key admit — the
   party key's (item 513); the module never raises a key.
2. **The set** (`PartyPictureSet`, V08 §2.1). (a) A PNG tile pyramid, 256-px tiles, row-major, at three levels — z0 the
   city band, z1 the district band, z2 the neighbourhood band — over the frame of the document's city-band view, plus a
   z3 building-band level ONLY for the tiles that cover an admitted place above `public` (each place's bounding box plus
   40 m), capped at 64 tiles, the players' close view of the places they know (J-V8.57). (b) The city-band SVG under the
   same key, inert by §11.1's bar (text as outlines, no script, no external reference), which the host offers to the
   DM and players for printing. (c) The **party gazetteer**: the answers of `query(h, { kind: 'gazetteer' | 'people', … },
   { admitAs: the party key form of (1) })` (item 572) — band-less, so admitted as at the city band (§11.2), every page
   of both kinds carrying that `admitAs` — paged to one JSON document and projected by the module through V08
   §5.4 (3)'s words-only rows (names, kinds, districts, tiers, the dossier's reasons, no coordinates) before it goes into
   `party.rendered` for storage — what a player's assistant reads (V08 §4.4 (1)). Every picture is drawn
   with the document's style, the fixed sun (an export has no pointer, §11.1), the document's public notes, view pins
   and annotation layer (§2.9 view state, §9.5) and never a private note or a DM-only pin.
3. **When it is made, and how it crosses the bridge** (J-V8.91). The client asks and stores; the module resolves, draws
   and lists. The client of an editing session sends `party.render { party, since? }` (V08 §2.2) — `party` the record's
   `MapRecord.party`, `since` the stored set's `seqAt`, `partyRev`, `outputVersion` and `drawDigest` when one is stored —
   (a) after each absorb it commits, (b) 30 s after the last map edit batch it committed (the debounce restarts at each
   commit; a session closing with a pending render sends it first and waits for the reply), (c) at once after each
   `setParty`, and (d) at creation (V08 §3.3); the refresh queue sends it for every map it refreshes (V08 §3.4). On every
   open the client checks the stored set against the record — `partyPictures` absent, or its `logHead`, `partyRev` or
   `outputVersion` differing from the record's `logHead`, `party.rev` and `snapshot.outputVersion` (V08 §3.9 row B18) —
   and on a difference sends the request at once. The module resolves the party by (1), builds the display lists of (2)'s
   levels, the SVG's and the gazetteer, and computes `drawDigest`; when `since` holds the same `partyRev`,
   `outputVersion` and `drawDigest`, it answers `party.rendered { status: 'unchanged' }` without rasterising and nothing
   is stored — so an edit batch that changed no drawn mark and no listed word costs no store write; otherwise it
   rasterises in the tile worker between edit batches, never delaying an edit (§12.6's settle rule), and answers
   `party.rendered { status: 'rendered', set }` with `seqAt` and `logHead` the head it drew and `partyRev` the request's
   `party.rev`. The client stores the set as handed with `MapStore.putPartyPictures`, which keeps the newer of two sets
   by the integer pair (`seqAt`, `partyRev`), so two editors rendering at once never store the older (`'older'` returned,
   nothing written), and then re-sends `host.state { partyPicturesAt }`.
4. **The player's tab.** `MapHost.mountParty(el, { settlementKey })` reads the record and shows the set in the client's
   small viewer (V08 §2.2 `PartyView`; ≤ 4 KB gzipped of the client's budget, no model code): a grid of `<img>` tiles
   under a CSS transform, wheel, pinch and arrow keys to pan and zoom, a level switch at each band's scale, the caption
   `host.party.asOf` (the set's `week`; V08 §5.1's table), and a focusable region labelled `host.party.region`. With no
   set stored, it shows the `public` thumbnail and `host.party.notOpened`. It holds no
   frame, no module, no dossier and no session, and sends no message (T-V8-17). `refreshFromStore` re-reads the record
   when the host learns the set changed (its own subscription; the client adds no push).
5. **The DM's check** (J-V8.87). "See what the players see" — the header's toggle in the frame, or
   `MapSession.seePlayersView(on)` from the page, which posts `host.state { playersView: on }` (V08 §2.2, §3.1 step 7
   (c)) — sets the frame's `ViewOpts.viewAs` to the party key resolved as in (1), in the key form `{ tier, places }` that
   item 464 admits in item 572's key form: a display filter, under which the frame draws, labels and reads what both its
   key and the party key admit (V09 §2.10's `effectiveKey()`, item 464). So the DM sees in the live frame exactly
   what the next party set will show; switching it off clears `viewAs` (`undefined`), and while it is on the View as menu
   reads "What the players know" (V09 §4.8, J-V9.85). The frame's knowledge key stays the role's
   `secret` (J-V9.46), so the document formats, `doc.snapshot`, compaction and the draft mirror keep working while it is
   on; a `host.state` carrying a new `party`, or an absorb that changes the binding rows, re-resolves the filter. It
   writes no view state, nothing to the store and no event. While it is on, the strip "Showing what the players see"
   stays in the frame's banner slot (V08 §5.1).
6. **What it replaces.** SettlementForge's retired map rows carried a fog table and audience-tagged annotations
   (`research/sf/dossier-seam.md` E-7, §3). Area fog is consciously replaced by place-by-place knowledge (J-V8.58): the
   base's knowledge model is by place (§9.2) and a revealed place is named in every picture from then on. A live shared
   map for players — the "party copy" an area fog would need — is decided under J122: pictures and player views now; a
   live shared map after M-SF, not part of this stage (V08 §11 Q5).

### 3.15 Edges — every mechanism at its limits (principle (11))

Every outcome below is defined, sits on §5.1's failure ladder — check, repair locally, retry that piece, simpler
shape, substitute, leave out and report; **never a whole-map retry** — and is tested by the clause named: T-V8-54 takes
every row of 3.15.1–3.15.2 as a clause named by its letter, T-V8-55 every row of 3.15.3. No edge ends in a crash, a
hang, lost data, a silent wrong result or a whole-map retry; a stored map is never discarded (V08 §3.9).

**3.15.1 Rules that hold for every mechanism of this volume.**
1. **Degenerate geometry.** The port and the host side make no geometry of their own: every map change the port causes
   is a dossier event placed by §4.7 S10b's one solver and committed through the kernel's transactions, so a degenerate
   result is refused by the kernel (§3.1's `E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE` …) and handled by the
   placing stage's class — §5.2 F-SITING (the element at its first closest option, reported, never dropped: §7.7 item 2)
   or F-EDIT for an event — on its ladder. Snapshots, notes, messages and the party gazetteer carry no geometry.
2. **Missing, empty or contradictory data.** An absent optional field reads its declared default: a row set's "else"
   (noted `unmapped_word`), a null `PortValues` field the table's value, an absent `HostContext` field the derivation
   row's next input (§7.7 item 10), an absent stored field its migrate default (V08 §2.7's column). A required key or
   type missing is B3; a malformed record B4 (quarantined, the rest absorbed); two records of one key `duplicate_key`,
   told apart by order; a tier word disagreeing with the population — the population picks the rung, the word the title
   (§7.7 item 15); a custom record's inputs disagreeing among themselves — item 104 (a)'s rung order decides.
3. **Every rung.** The port runs at every rung a registered product covers — THORP, HAMLET and VILLAGE through V07's
   product (its rows; the ladders' village ranges, V08 §3.5.1 (b); the toll bridge's village row, V08 §2.6b (3)), TOWN,
   CITY and METROPOLIS through the base's — and refuses outside them (B7). Features gated by rung keep their gates:
   raised ways at CITY and METROPOLIS (V08 §2.6b (1) (a)), catacombs from TOWN (V08 §2.6a), islands at CITY and above
   (DR27).
4. **Toggles and presets.** A layer shown or hidden, "See what the players see" and View as change no port input and
   no event (views are outside every digest). The parity presets and the neutral cells of items 111 and 113 change
   generation, not the port: its events are the same; with `history.replay` off the history's additions are carried and
   read by nothing.
5. **Save, load, undo, redo, regenerate, migrate.** Dossier events are no undo targets (§7.4); the ledger fold rebuilds
   the dossier block from the log at every seq (V08 §3.6 (4); §2.9's load check); a scoped regeneration re-places under
   the same addresses, so binding rows never change (V08 §2.3); migration is §7.5 with V08 §3.8's remaps and line moves.
   A mechanism with a case of its own names it below.

**3.15.2 Each mechanism's own edges.**

| # | mechanism | edge | outcome (rung) |
|---|---|---|---|
| (a) | the map record (V08 §2.1) | a field absent (an older client), a `party` absent, more backups than `backupDepth`, a record naming another settlement | the field's migrate default (V08 §2.7); `party` `{ public, [], 0 }`; the extra backups dropped at the next compaction; a mount refused before a frame exists, reported as B6's host bug (check → leave out and report) |
| (b) | the bridge messages (V08 §2.2) | an unknown type, a missing field, a `dossier.offer` whose `dossier` is not an object, a `party.render` whose `party.rev` is older than the stored set's, a `host.state` with a field absent | ignored and reported (§11.3); B3; the reply's set carries its own `partyRev` and `putPartyPictures` keeps the newer (`'older'`, nothing written); the handler keeps its previous value of the absent field (check → leave out and report) |
| (c) | the binding (V08 §2.3) | a carried key the running adapter no longer knows; a binding row whose address is superseded; the rebuilt block differing from the stored one | removed by the adapter's declared remap, response `none`; re-pointed through §6.3's supersedes table; the rebuilt block wins at load (§2.9's check), reported (repair locally) |
| (d) | the digest's additions (V08 §2.5) | `security`, `legitimacy`, `ruinEvidence`, a calamity's `deaths` or targets, the latitude absent or empty | `crime` null (the table's); legitimacy null; DR30's stated no-source reason; `deaths` 0 (severity `minor`) and an event with no targets (V06's hazard phase places nothing, `calamity_unplaced` per missing target); DR29's next input (substitute) |
| (e) | custom content (V08 §2.8, §3.13) | no custom content; one record; malformed, unknown or mismatched inputs | nothing carried; one `assign` placed as its resolved class; V08 §3.13 (11)'s rules — quarantine, notes, never a refusal (leave out and report) |
| (f) | the embed (V08 §3.1) | the frame at zero size (a hidden tab); a `src` without `lang`; a `lang` with no catalogue file | the frame boots and draws on its first non-zero size, no error; the source catalogue `en`; the same (substitute) |
| (g) | offering (V08 §3.2) | an offer during a user's undo run, before `doc.load` completes, after a restore, or while an `upgrade` is in flight | the absorb folds at the head, users' stacks keep their own events; queued by §11.3's before-`ready` queue; run against the restored head; waits for the upgrade's commit — one offer in flight (retry that piece) |
| (h) | the refresh queue (V08 §3.4) | an empty queue; one map; a campaign of any size; a queued record with no dossier or held; a village-rung or METROPOLIS document; a lease that expires mid-map | returns at once, no frame made; one frame, processed and closed; serial, no cap, bounded by V08 §6's row and resumable from `refreshPending`; skipped with `refreshPending` kept and `onEach` reporting `refused`, a held record offered (every dossier a retry); refreshed as any, a METROPOLIS only beside no visible CITY or METROPOLIS document; another page may take it, and the first page's commit is then `'stale'` and drops the map (retry that piece) |
| (i) | changes to events and epochs (V08 §3.6) | an absorb with no change; one change; a change dated after `W₁`; a target outside every ladder; a catch-up across rungs; replay | `unchanged`, no event; one ledger event and its one event or epoch entry; dated `W₁`; B7 (nothing absorbed); epochs at every rung, a crossing only through V07 §2.1's band; the fold rebuilds everything (check → substitute) |
| (j) | the village hand-off (V08 §3.10) | a population of exactly 1 500; a registered product whose range meets the base's | the base ladder's floor, inclusive (§1.1); `LadderRouter`'s order (§1.1) — one product per population (check) |
| (k) | determinism (V08 §3.12) | a load, a same-seed regeneration, a second editor | byte-identical events and documents (T-V8-3); a mismatch is reported, the log standing (B20) |
| (l) | custom content under editing (V08 §3.13, §4.5) | no custom record; one declaration; a declaration naming a `localUid` the dossier no longer lists; save, load, undo and a revision | nothing; placed by its binding key; orphaned and reported (§7.7 item 5), kept in the log; declarations are map events (undo, redo) that survive every revision; the revision's re-siting is a dossier event (no undo target) (leave out and report) |
| (m) | the players' view (V08 §3.14) | every rung; a revealed place since removed; an undone map edit; an upgrade | THORP–VILLAGE through V07's product with the same pyramid over the smaller frame and the z3 cap unchanged, METROPOLIS with V08 §6's z2 fallback; the key kept in `party.places` and skipped at render, re-revealed on a re-opening; the next render; re-rendered at the upgrade (simpler shape) |
| (n) | the host-only events (V08 §4.1) | an absorb with nothing to record; one change; a stored `dossierRecord` put with a field missing; save, load and migration | no `dossierFacts` is written (`unchanged`); one ledger event; the fold reads the record kind's migrate defaults (§2.7); folded from the log, no undo target, no migration of their own (check → substitute) |
| (o) | the host-side actions (V08 §4.2) | every action at every rung | each row acts identically at THORP through METROPOLIS; "Update the map engine" upgrades a village-product document by §7.5 as any (check) |
| (p) | locality (V08 §4.3) | one dossier change touching one element | only its disruption set changes (§7.7 item 5; T20-8) (repair locally) |
| (q) | the host clerk (V08 §4.4) | no open map; a query with no result; a malformed query; a proposal with no events; a proposal stale after an absorb | a headless session opened and closed; an empty page; §11.2's error; refused `invalid`; `clerk.proposal { status: 'stale' }` (leave out and report) |
| (r) | the DM's view of the dossier (V08 §4.6) | a **Show** whose element was removed, or whose outline has zero area | **Show** targets the element's former plot (its address in the log), never a missing entity (substitute) |
| (s) | the Map tab and the drawings (V08 §5.1, §5.2) | a record with no thumbnails; a custom chain with fewer than two placed nodes, or with no way path between two consecutive nodes; a removed deposit; a siege tint on an unwalled map; an occupation mark where the rung's government row names no seat | the banner alone over an empty slot; nothing drawn (its gazetteer row kept under the knowledge rule), the pathless segment not drawn and the rest drawn; nothing drawn; the tint on the built area's outer edge; no mark, the condition still named in the legend (leave out and report) |
| (t) | pictures (V08 §5.3) | no document loaded; a `knowledge` that is no `Admission`; `displayNames` for keys nothing binds | refused until `ready`; refused as §11.1's `E_KNOWLEDGE_TIER`; the unbound keys ignored (check) |
| (u) | what leaves the frame (V08 §5.4) | a format outside `png`, `svg`, `print`; `exportBundle` with no format, or a format other than `dd2vtt` and `foundry`, or in a build before M-SF | `E_HOST_FORMAT`; `[]`; `E_HOST_FORMAT`; the method is absent from the client (check) |
| (v) | labels (V08 §5.5) | an empty settlement name; an empty institution name; a name longer than `maxString`; a locale file lacking a key | refused by the shape check (B3); the record quarantined (B4); `size_limit` (B3); the source catalogue's row (substitute) |

**3.15.3 Where this volume's features meet another unit's at their limits.** The owning unit's rule decides; this
volume applies it.

| # | combination | outcome (rung) |
|---|---|---|
| (w1) | a dossier element on a cliff or steep ground (every rung) | its class's terrain gate (§2.6) keeps it off plots it refuses; with no site passing, its first closest option, reported F-SITING (§7.7 item 2); a `mountain` or `hills` dossier's relief is DR1's and DR31's |
| (w2) | a dossier's coast and harbour (every rung; the harbour TOWN and above) | a `coastal` dossier has a coast and a `port` one a harbour basin (DR1, a creation bar); a harbour record on an inland dossier takes the harbour class's closest option (river docks where a river runs), reported; a later change of the access word is a frozen fact (V08 §3.5) |
| (w3) | a dossier element and the moat or a square (TOWN and above; squares every rung) | never in the moat band (§2.7's unbuildable setbacks); a market record's hall on the square or, when none fits, on a rim plot, reported by F-SITING when neither fits |
| (w4) | a dossier's oasis (every rung) | `oasis_water` makes the oasis exist (DR40), on any terrain the dossier gives (a supplied oasis); the water-needing records are sited toward it by their rows |
| (w5) | a dossier element and the frame (every rung) | placed only inside the frame (§3.2 (9)); a deposit bearing leaving the frame opens its land use at the frame's hinterland ring (DR19) |
| (w6) | a dossier element and V01's neighbourhoods, a terraced ward, V03's plans, V04's vaults (their rungs) | its plot is never typed away (DR26's bar); on a terrace by its class's terrain gate, the terrace's walls unbound (V08 §4.1); its plan by V03, a crypted class's crypt always (DR32); a vault by V04's rows, a ruined state by V04's ruin rules |
| (w7) | a dossier element under an island's shade or beside a sky access (CITY, METROPOLIS) | the shade is a soft term of DR6's field and moves no dossier element (dossier existence sits above rule tables, §7.7); an access never takes a dossier element's plot (DR27's placement order) |
| (w8) | the dossier and the light (every rung) | the dossier supplies no light: the sun's latitude is DR29's, the lights item 68's under `site.magic` |
| (x1) | a custom record and any feature — cliff, steep, river, coast, harbour, moat, raised way, retaining wall, deck plot, square, oasis, frame, neighbourhood, terraced ward, tiers, plan, sewer, cavern, ruin, catacomb, access, vault, shade, landfall (their rungs) | placed as the class item 104 (a) resolves at fold and meeting every feature exactly as a catalogue record of that class; `generic-other` carries no underground, deck, tier or sky rows, so it never sits in a sewer, cavern, ruin, catacomb, vault, access or deck plot, never takes a tier and never goes up; a resolved class whose hard row names a feature the map lacks takes its closest option, reported F-SITING |
| (x2) | a custom record and editing, undo, save and load, the light | as (l); its `custom-def` facts ride the document, so replay needs no host; drawn as any building of its class, `landmark` raising its significance (V08 §5.2) |
| (y1) | the players' pictures and any feature — cliff, steep, river, harbour, moat, raised way, retaining wall, deck plot, square, oasis, frame, neighbourhood, terraced ward, crypt, island, shade, sky access, landfall (their rungs) | the set draws the committed document as its saved view state shows it (§2.9) under the party key: a feature with no knowledge of its own is drawn; a named place — a crypt, a named raised way, a neighbourhood place, an island — is named only when §9.2's admission passes it for the party key, else drawn unnamed |
| (y2) | the players' pictures and the history (every rung) | the replay's result is drawn like any geometry (old walls, ruins); its story reaches the party gazetteer only through admitted places' rows, never the `HistoryRecord` |
| (z) | a dossier removing what an edit pinned | §7.7 item 5: the dossier event lands around the pin, the pin that can no longer be honoured is orphaned and reported, never dropped silently; V08 §3.6 applies the removal |

## 4 Editing

### 4.1 No new declaration; two host-only events; item 110's generated content is never bound

The stage adds no authoring tool: a DM edits a SettlementForge map with item 101's twelve tools exactly as a
standalone map (§7.1, §14), under §7.7's precedence line, and every map edit — a move, a lock, a rejected site, a
positive placement, a style — lives in the map's log and survives every absorb (§7.7 items 3–5). The two event kinds
this volume adds, `dossierFacts` and `dossierRecord` (item 358), are host-authored: an `edit` of either kind whose author
is not `host` or whose session is not `host:port`, or that arrives in a `doc.changed` from a client, is refused F-EDIT
`dossier-owned` (§5.2, §7.7 item 11) — only an editing client's `dossier.result` produces them. A user's edit of a staged
record's fields (a condition's severity, a notable's posting) is refused the same way; its display — a label's text,
visibility — stays the user's (§9.1).

**Generated item-110 content is never dossier-bound (J-V8.66; item 260).** A raised way, a retaining wall (a
generated terrace's walls among them) or a deck plot the generator made (item 110) is generated content (a terrace
itself is a flatten stroke with its retaining walls, so no delete targets it and item 260 has no suppression kind for
it). No dossier record binds it: it carries no
`Identity.dossier`, even when a dossier record fed its reason (DR34, DR35), and its provenance names that record
for the clerk's `why`. A DM, a co-DM or an accepted clerk proposal removes it with the base's delete of generated
content (§7.1), never with §7.7 item 3's `rejectSite`, so the removal never lapses. The dossier's own records keep their
protection: the conduit house bound to the water record stays dossier-backed, and a map delete of it is a `rejectSite`
like any dossier element's. A DM who wants an aqueduct at a TOWN draws it (T4 `road` with `raised`, or the aqueduct
class; item 110 (b)); a drawn one is a declaration, held like every declaration.

### 4.2 The host-side actions in the Map tab

Each is a control in the frame's header (V08 §5.1), offered by role — except the load-mismatch keep, listed for its
lifecycle and drawn by the shell — and each has one event or one store operation, its undo and its lifecycle. Only the DM (`owner`) and a co-DM (`editor`) have a frame; a player's tab has no actions (V08 §3.14).

**How a click reaches the page** (J-V8.88). The controls are drawn in the frame (`HostSlots.header`, V08 §3.1 step
7 (b)), but most operations are the page's — the host holds the dossier, the store and the assistant's settings. So a
control whose operation is the page's posts `host.action { action, args? }` (V08 §2.2), which the client surfaces as
`MapSession.on('action')`, and the host runs the row's operation with the calls named there; a control whose operation
commits an event ("Update the map engine") commits it in the frame through `doc.changed`, and the client then asks for
`doc.snapshot` as V08 §3.7 says; "See what the players see" runs in the frame alone. Keeping the saved town after a load
mismatch has no header control: it is V09 §3.14's load-mismatch choice, which the shell shows the owner at load, so one
event has one control (J-V8.94). A control that
needs a confirmation ("Restore previous map", "Make a new map from the record") shows its dialog in the frame first — the
restore dialog lists the map edits after `backups[0].logHead`, which the frame holds from `host.state` — and posts only
on confirmation. No control posts anything else (T-V8-47).

| action (role) | what it does | event or store operation | undo | lifecycle notes |
|---|---|---|---|---|
| Refresh now (owner, editor) | offers the current dossier at once | `host.action { refresh }` → the host's `MapSession.offer` with its current dossier → `dossier.offer` → committed dossier events | none: dossier events are no undo target (§7.4); the map converges if the host later restores (F22) | the record's `lastOffer`, `absorbed`; the party set re-rendered (V08 §3.14 (3)) |
| Update the map engine (owner) | upgrades the document to the running output version; the dialog summarises §7.5's diff in words — what moves, what the new version adds (raised ways, retaining walls and deck plots among them, each removable after the update), what it retires | in the frame: an `upgrade` event through `doc.changed`; the client then sends `doc.snapshot` and calls `replaceSnapshot` | `undo` of the upgrade (§7.5), in the session and after reload while `from` is in the window | `snapshot.outputVersion` changes at the compaction; the party set re-rendered |
| Keep the saved town (owner; after a load mismatch) — no header control | §2.9 step 4's keep: V09 §3.14's load-mismatch choice (`error.mismatch`'s **Keep saved** · **Use rebuilt**, V09 §4.9), which the shell shows the owner at load (J-V8.94) | in the frame: after its keep commits the `rebase` through `doc.changed`, the client sends `doc.snapshot` (a compaction) | §7.4's rebase undo | §11.3's bridged rule: other clients install it |
| Restore previous map (owner) | makes `backups[0]` the snapshot with an empty tail, then absorbs the current dossier; refuses a backup whose `docId` is not the record's `mapId`; not offered while the record keeps no backup (`backupDepth` 0) | `host.action { restore }` after the frame's dialog → `MapStore.replaceSnapshot` with the backup; a fresh `doc.load` to every open session (`module.status { loading }` between); then an offer | "restore" again swaps back (`backups` rotate: the replaced snapshot becomes `backups[0]`) | the dialog lists the map edits the restore loses — a removal of generated item-110 content made after the backup among them (V08 §4.3) |
| Make a new map from the record (owner) | a fresh creation from the current dossier under a new `mapId`; the old record is kept under its own `mapId` | `host.action { newMap }` after the frame's dialog → a creation offer under a new host-minted `mapId` and `MapStore.create` of the new record; the host points the settlement at it; a fresh `doc.load` to every open session | "Go back to the old map" (the host points the settlement at the kept record again) while the host keeps it | the old `mapId` is not deleted by the module; whether and how long the host keeps it is the host's (B11 detects a pointer to a lost one); the old record's `backups` are never mixed into the new one's (restore refuses a foreign `docId`) |
| Reveal to the party (owner, editor) | adds places to what the party knows | `host.action { reveal, args: { places } }` → `MapSession.setParty({ reveal: places })` → `MapStore.setParty` (compare-and-set on `party.rev`), then the party set re-rendered and `host.state { party }` re-sent | "Hide again": `host.action { hide, args: { undo: true } }` → `setParty({ prev: true })` (one step); an older reveal is undone by hiding it | `MapRecord.party` (V08 §2.1, §2.7) |
| Hide from the party (owner, editor) | removes places from `party.places` | `host.action { hide, args: { places } }` → `setParty({ hide: places })` | "Reveal again": `host.action { reveal, args: { undo: true } }` → `setParty({ prev: true })` | as above |
| The party's base knowledge (owner) | sets `party.tier` (`public`, or `local` for a party native to the town) | `host.action { partyTier, args: { tier } }` → `setParty({ tier })` | `host.action { partyTier, args: { undo: true } }` → `setParty({ prev: true })` | as above |
| See what the players see (owner, editor) | the frame's `ViewOpts.viewAs` set to the party key — a display filter; the frame's key stays `secret` (V08 §3.14 (5)) | in the frame (the header's toggle), or `MapSession.seePlayersView(on)` → `host.state { playersView }`; no view-state write, no store write, no event, no `host.action` | the same toggle | the frame's view options only (session memory) |
| Assistant settings (owner) | opens SettlementForge's own assistant settings, where the host's configuration of V10's built-in clerk (M3c) is chosen — the provider, model tier and key path follow SettlementForge's AI setup (J121) and its own assistant is configuration C (J121/J122) | `host.action { assistantSettings }` → the host opens its own assistant settings (SettlementForge's settings surface, outside the Map tab; J-V8.35 holds for the tab) and calls `MapSession.setClerk(config)` → V10's `clerk.config` (V10 §3.17; item 473) → `ClerkMount.host` and `HostSlots.clerkMode` (V08 §3.1 step 7 (a)) | the previous configuration, re-sent | the host keeps the choice; the module keeps no secret beyond the session |

**The controls' words.** Each word the header draws is a `host.*` catalogue row, its `en` text written once here and
loaded by V09 §4.9 unchanged — a label `host.control.<action>`, an undo word `host.undo.<action>`, a dialog's line
`host.dialog.<action>`: `host.control.refresh` "Refresh now"; `host.control.upgrade` "Update the map engine" with
`host.dialog.upgrade` "Update the map engine? {summary}" (the §7.5 diff in words); `host.control.restore` "Restore
previous map" with `host.dialog.restore` "Restore the previous saved map? The changes made since it will be lost:
{edits}." and `host.undo.restore` "Restore again"; `host.control.newMap` "Make a new map from the record" with
`host.dialog.newMap` "Make a new map from SettlementForge's record? The current map is kept, and you can go back to it."
and `host.undo.newMap` "Go back to the old map"; `host.control.reveal` "Reveal to the party" with `host.undo.reveal`
"Hide again"; `host.control.hide` "Hide from the party" with `host.undo.hide` "Reveal again"; `host.control.partyTier`
"The party's base knowledge" with `host.undo.partyTier` "Undo"; `host.control.playersView` "See what the players see";
`host.control.assistantSettings` "Assistant settings". T-V8-14's walker checks that every word V08 §3.7, §4.2 and §5.1
quote has its key.

### 4.3 Locality, protection and the dossier's reach

A dossier event mutates only its disruption set (§7.7 item 5; T20-8), around every lock, pin, positive placement and
declared entity (§7.2); an edit it can no longer honour is reported and orphaned, never dropped (J-A20.73). A DM's
rejection of a dossier element's site holds until the settlement grows or declines past the roster tolerance (§7.7 item
3). Nothing a player does changes the model: a player holds no document and no session (V08 §3.14), and the players'
reveals change only `MapRecord.party`, never the log.

**The removal hold for generated item-110 content.** Removing a generated raised way, a retaining wall
(a generated terrace's walls among them) or a deck plot (V08 §4.1; file f item 260's suppression kinds `raised`,
`retaining`, `deckPlot`) holds through every absorb, every catch-up epoch, a rung change, a line re-key (`rebind`,
V08 §3.8), an `upgrade` (§7.5's mapping hands the tombstone to its successor), the load-mismatch keep (V09 §3.14; the
rebase keeps the log's edits) and a host undo that re-offers an older dossier (F22 converges forward; the delete stays in the log).
Only "Make a new map from the record" (a new document) drops it, and "Restore previous map" drops it when the restored
backup predates it — the restore dialog lists it among the edits lost. A removed raised way's slot stays closed: when a
later dossier change raises the cap (V08 §2.6b (1) (d)), the reason may open a NEW slot only, which the history panel
announces as new (V08 §4.6). The slot is §7.1's one suppression mechanism (J-VI.14;
item 260), the same for islands and accesses.

### 4.4 The host clerk — SettlementForge's assistant as a client of the tool API

SettlementForge's assistant is a clerk in §11.2's sense: it drives the map through the tool API alone, over the bridge,
with nothing added for it (§14's clerk; J-A101.83). Its wiring:

1. **Session, rights and the relay (J-V8.73).** The assistant acts on the map only inside an editing
   user's session — the DM's or a co-DM's — through that session's `MapSession.query` and `.preview`, with that user's
   role and knowledge key and never a role of its own (J-V8.21). Wherever its model loop runs — SettlementForge's server
   or its page; the relay needs neither answer — its map tools RESOLVE IN THE DM'S PAGE: the
   page receives the tool call through SettlementForge's own channel, executes it with `query` or `preview` and returns
   the answer the module posted, already projected in the frame (V08 §5.4 (3); item 473 (c)): the page carries no
   projection code and never holds a full answer. When no map is open, the client opens a headless session (the refresh mode's
   frame, V08 §3.4) for the call and closes it after; the cost is one load (V08 §6). **A player's assistant never has a
   session**: it reads the stored party gazetteer (V08 §3.14 (2) (c)) on SettlementForge's side, which holds only what
   the party knows.
2. **Reading.** The kinds offered to the host clerk are those of V08 §5.4 (3)'s table: the base's `gazetteer`,
   `people`, `whereIs`, `relations` and `fates` by that section's rows, and the reader kinds of V10 §3.17's table —
   `brief`, `entity`, `sites`, `why` (with its sections), `frame` without `near` and `radiusM`, `rule` and `profile`;
   `measure`, `hit` and `inView` are refused `E_HOST_KIND`. Answers are paged at 64 KB, every row marked with its tier
   (`dossier`, `declared`, `map`) and filtered by the key. For a dossier element, a `why` answer names the derivation row that placed it
   (DR10), the relation, supply and siting rows that pulled it (item 103's families, from provenance — the rows volume
   V11 writes), and the dossier change that caused its current state: `changeId`, `source`, `week` and
   SettlementForge's own reason (§7.7 item 13), so "why is the tannery here" and "why did it move in week 40" are
   answered from the log. "Why is this quarter poor" reads the field's drivers, item 102's daylight share among them
   (the answer's form is volume V10's). For generated item-110 content, `why` names its reason — a drop, a link or a
   water need — and the DR34 or DR35 inputs it read ("the city's water system (SettlementForge) and a spring
   in reach to the north"), in V10's words.
3. **Proposing.** The assistant proposes through `MapSession.preview(events, { view: true, proposal })`, the proposal
   body item 473 (b)'s. What the frame does with it is V10 §3.17's host proposal intake, cited, not restated: the card
   in the frame, Accept sending `doc.changed` with `proposedBy: 'clerk'` and the DM as author, and the module's
   `clerk.proposal { id, status, seqs? }` answer, which reaches the page as the session's `clerkProposal` event so the
   assistant learns what the DM chose; a refused `clerk.config` reaches it as `clerkConfigRefused`. A proposal that touches a dossier fact is refused
   `dossier-owned` with the closest alternatives (§7.7 item 11), so the assistant can suggest where the dossier's smithy
   stands but never add, remove or rename it — for that the DM changes the dossier in SettlementForge. A proposal to
   remove generated item-110 content is an ordinary delete of generated content, never refused (V08 §4.1).
4. **Prose.** The map passes no dossier prose to any assistant: this port line carries no description seed (V10 §1b.5;
   item 519); SettlementForge's assistant has the dossier on its own side.
5. **Limits.** One preview in flight per session (a newer one replaces a pending one, as §12.6's settle rule); queries are
   answered in the generation worker between batches and never delay an edit.
6. **The built-in clerk (volume V10) in host mode.** It runs inside the module. The DM chooses its configuration with
   "Assistant settings" (V08 §4.2: the header control's `host.action { assistantSettings }` opens SettlementForge's own
   settings): `MapSession.setClerk(config)` sends V10's `clerk.config`, which the embed's bridge handler routes to
   `ClerkMount.host` and `HostSlots.clerkMode` (V08 §3.1 step 7 (a)); the harness's `needsToken()` posts
   `clerk.needsToken`, which reaches the page as the session's `clerkNeedsToken` event, and SettlementForge answers with a
   new short-lived token through `setClerk` (V10 §3.17). Under V10's configuration B — the prompt passing through
   SettlementForge's proxy — the map block and every tool result are passed through V08 §5.4 (3)'s words-only projection
   before they leave the frame; under A (the provider called from the frame) nothing reaches SettlementForge; C (this
   section's own assistant; follows SettlementForge, J121/J122) needs no built-in clerk. The built-in clerk ships at M3c
   and runs only where the deployment's `clerk.config` enables it; its provider, model tier and key path are inputs read
   from SettlementForge's AI setup (J121), never decided here.

### 4.5 Custom content under editing

A DM's declarations about a custom kind — a place, a quarter, a pin, a siting-profile override (item 104 (a) (1), made
with item 101's tools) — name the element by its binding key `inst:uid:<localUid>`, so they survive every rename and
every revision SettlementForge makes; a revision's re-siting (V08 §3.13 (10)) is a dossier event and so moves around
every lock, pin and positive placement like any other (§7.7 item 5). A `CustomChainRecord` or `CustomServiceRecord` is
dossier-owned: a user's or clerk's edit of its fields is refused `dossier-owned` (§7.7 item 11) with the map-side
alternatives — move a node with `placeAt`, reject a site with `rejectSite`. The clerk's `why` on a custom element names
the resolution rung that decided its profile (declaration, archetype, category, tags, library field, keywords or the
fallback), the chain rows that pulled it and, when keywords decided, the `low_confidence` mark (item 104 (a)).

### 4.6 The DM's view of what the dossier did

Every line below is a catalogue key with its args (V09 §2.9's `MsgRef`); the words are written once, in this section's
tables, in V10 §3.9, in V06's chronicle templates or in V09 §4.9's rows (`history.dossierFacts.creation`,
`report.moved.<kind>`, `report.dossier.<state>`; J-V9.109), and the panels render them — no sentence is composed by the
panel (J-V8.99).

**The absorb group** (V09 §4.10). The history panel draws each committed absorb — its `dossierFacts`
ledger event and the port's `host:port` events after it, up to the next ledger event or another session's event (V08
§3.6 step 6; V09 §4.10's dossier groups, J-V9.107) — as one group headed `host.group.absorb` ("{n}
changes from SettlementForge, week {week}"), or `host.group.absorbUndated` ("{n} changes from SettlementForge") when the
ledger entry's week is null; `{n}` is the absorb's `DossierChange` count. Inside the group, in this order:

1. **The changes.** Each dossier event is V09 §4.10's dossier-event row, and under it the report entries it caused
   (§5.4's `changes`, each naming its `changeId` and reason), each by V09 §4.9's `report.moved.<kind>` row.
2. **The port's notes.** One line per note of the ledger event's `notes` (V08 §3.6 (4)): its `msg` rendered by the
   table below, with **Show** when its `keys` bind elements (each resolved to its address by V09 §4.10's `entity` read by
   `dossierKey`, item 583). A
   line whose `keys` bind an element the view's effective key (V09 §2.10; V09 §4.8) does not admit is not drawn (§11.2
   *Knowledge*).
3. **What the absorb's epochs built by item 110.** Each epoch the absorb carried is V09 §4.10's `epoch` row — V06's
   chronicle for it (V06 W19; V06 §3.15.1): a raised way founded, finished, repaired or run dry is that chronicle's
   `raisedWay` entry, and its **Why here?** opens the way's `raised` section, whose row for a built way is
   `info.raised.built` with the DR34 or DR35 inputs it read as the answer's `facts` rows of tier `dossier`
   (V10 §3.9). A reason that fired at a slot the DM closed is one line `info.raised.suppressed` (`{w}` the removal's
   week; V10 §3.9, one key with V10's `raised` section), drawn as V09 §4.10's `epoch` row's line, from V06's
   `EpochReport.raised.suppressedFired` (V06 §2.10, filled by the `raisedWays` pass, V06 §3.19.3 (2); J-V9.113), with **Show** on the removal's former
   outline. A way founded in a slot
   a cap increase opened is an ordinary founding entry — never the removed way's return (the slot rule, J-VI.14). The
   panel reads these from the epochs' records and reports (item 110 (f) records each raised way's reason); it recomputes
   nothing.

The creation's prefix is listed the same way under V09 §4.10's creation row: its ledger event's notes as item 2.

**The standing notes**. The report panel reads `report(h)` (§5.4's `GenerationReport`), and its
dossier section (V09 §5.7's "for a dossier-bound town") lists `GenerationReport.dossier` (the placement state — V09 §5.7's
"V08's dossier state list"), then `GenerationReport.dossierNotes` under `host.group.standing` ("How the map reads
SettlementForge's record"), one line per note as the absorb group's item 2 — its `msg` rendered by the table below,
**Show** on its `keys`, and a line whose `keys` bind an element the view's effective key (V09 §2.10; V09 §4.8) does not
admit not drawn. `dossierNotes` is the document's `DossierBinding.notes` at the report's seq, copied by every
derivation's report build (item 390), so every frame and every reload shows the same list with no read of its own. The
notes of class `standing` stay there while each port run writes them, and appear in an absorb group only in the absorb
that first wrote them. Notes of class `report` — and every note of an offer answered
`unchanged` or refused — reach only the host's report (`dossier.result.report`, `MapSession.on('report')`), where the
page renders them with the same keys through `statusText`.

**The held state** is no history row, since a held absorb commits nothing: the tab's banner (V08 §5.1) and the frame's
held notice (`HostSlots.banner`, V08 §3.1 step 7 (b)) show `host.status.held` and the reason row `MapRecord.held.reason`
(V08 §3.9).

**The party group.** Reveals, hides and a change of the party's base knowledge are listed as the DM's own actions
(`host.revealed`, `host.hidden`, `host.partyTier`), with the time the party pictures were last drawn
(`host.picturesDrawn`), in the panel's group "The party" through `HostSlots.historyLines` (V09 §4.10's group), which the handler makes from successive `host.state` values (V08 §3.1 step 7 (b), (c)), since the record keeps no
reveal history beyond `party.prev` (J-V8.58). Each line is drawn by V09 §4.10's rule for the host's lines; its undo is
V08 §4.2's "Hide again" or "Reveal again".

**The port's notes in words** (J-V8.97 – J-V8.99). One row per `PortNote` kind of §14's union with
V08 §2.4's `frozen_fact_changed` — key `host.note.<kind>` (the `held` kind: V08 §3.9's `host.held.*` rows). Each text is one sentence of at
most 25 words in V09 §4.9's style; its args are the note's `msg.args`, filled by the port as the args column says — names
as the dossier writes them, never an id. **Show** lists what the note's `keys` hold. **Class** decides where the note is
kept (V08 §3.6 (4)): `event` — the ledger event of the run that wrote it, drawn in that absorb's group; `standing` — the
ledger event only when new, then `DossierBinding.notes` while every run writes it, drawn in the report panel's dossier
section from `GenerationReport.dossierNotes`; `report` — the host's report only, never the document.

| kind | words (`en`) | args (filled from) | Show (`keys`) | class |
|---|---|---|---|---|
| `unmapped_kind` | "{name} is a kind the map does not know yet, so it is built like any {class}." (no article before the slot: "like any" reads with every label) | `name` the record's name; `class` the `label` cell (V11 §2.3, item 516) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (the `villageForm`, the archetype's `village` cell, or the tag fallback, whose `market` entry names V11's `market` class, the open space's market) — or, for a pin kind a cell names, its `host.pinKind.<kind>` row (*The pin kinds' words*, below this table); read after the fold (V08 §3.6 (4); J-V8.115) | the record | standing |
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
| `ladder_unknown` | "{name} names a kind of growth the map does not know yet, so it is built as listed." | `name` | the record | standing |
| `chain_node_unjoined` | "{owner} names {node}, which is not in the settlement's record, so the map adds nothing for it." | `owner` the chain's label, or the dependency's resource word; `node` the unjoined name | — | standing |
| `unmapped_good` | "The map does not know the good "{label}" yet, so it trades it as a general import." | `label` as the dossier writes it | — | standing |
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
| `frozen_fact_changed` | "SettlementForge's record now says something new about {what}; the map keeps what it was made from — make a new map from the record to use it." | `what` "the ground" (the `site` row) or "the settlement's past" (the `history` row) | — | event |

**The pin kinds' words.** Three message rows of V08's own `host.*` family, loaded by V11's registry row 87 with V08's other `host.*` rows, give the words a note's `class` argument shows for the three pin kinds a record can name (V11 §3.11): `host.pinKind.shrine` "wayside shrine", `host.pinKind.well` "well" and `host.pinKind.market_cross` "market cross". The legend's own symbol-key words for every glyph are the base's and the application's (§9.5; V09), not this table's.

The group heads: `host.group.absorb`, `host.group.absorbUndated` and `host.group.standing` (words above). T-V8-14's
walker fails the build on a `PortNote` kind or a `PortRefusalCode` case without its row, on a row over 25 words, and on an
arg a row names that its note does not fill (a compile check over the union and the table).

## 5 Rendering, labels, exports

### 5.1 The Map tab — what SettlementForge draws and what the frame draws

**SettlementForge's side draws three things only** (J-V8.35): the tab's container, the stored thumbnail as an `<img>`
until the frame's first live frame (V08 §3.1 step 1), and a one-line **status banner** driven by `module.status`, so a
failure is visible even when the frame is dead — plus, on a player's tab, the client's party viewer (V08 §3.14 (4)),
which is part of the client, not SettlementForge's own drawing. The banner's words have ONE source, volume V09's `host.*`
catalogue rows, generated into the client's `statusText` defaults at build time; the host may translate them.
Keyed by phase; the key and its words are this table's (V09 §4.9 loads them):

| phase (`module.status`) | key and words (the client's default text) | shown to |
|---|---|---|
| `booting`, `loading`, `verifying` | `host.status.opening` "Opening the map…", with `progress` when given | owner, editor |
| `absorbing` | `host.status.absorbing` "Catching up with the settlement's record…" | owner, editor |
| `held` | `host.status.held` "This map is held as it was.", followed by the reason row `MapRecord.held.reason` (a `host.held.*` row, V08 §3.9) | owner, editor |
| `upgrade-available` | `host.status.upgrade` "A newer map engine is available — use Update in the map's header" (no button: no host → PLAT message reaches a dialog in the frame, and SettlementForge draws no map control, J-V8.35) | owner |
| `error` | `host.status.stopped` "The map stopped; reopening it.", then `host.status.failed` "The map could not start." with the button `host.status.retry` "Retry" | owner, editor |
| any phase with `detail` | the `host.*` row `detail` names, beside the phase's row — B10's `host.recovered.*`, B20's `host.verify.mismatch` (V08 §3.9) — and, after B11's new map, the client's own `host.recovered.newMap` | owner, editor (B20: editors only) |
| — (a refused creation: no map) | `host.status.notCreated` "No map was made yet.", followed by the reason row, in the thumbnail slot | owner, editor |
| — (the player's tab, no frame) | `host.party.asOf` "As the party knows it, week {week}" (`host.party.asOfUndated` "As the party knows it" when the set's `week` is null), or `host.party.notOpened` "The DM has not opened this map yet"; the viewer's region label `host.party.region` "Settlement map, as the party knows it" (V08 §3.14 (4)) | players |
| — (a commit past SettlementForge's storage allowance, `MapHostConfig.quotaBytes`) | `host.status.quota` "This map is larger than its storage allowance; older copies will be dropped first." | owner |

**The frame draws everything else** — `@plat/app` in host mode (item 507): the map region, the history panel (V08 §4.6),
the report panel, the gazetteer and the "features in view" list, item 101's tools by role, the export menu by role and
key, and the tab's actions of V08 §4.2 in the frame's header (`HostSlots.header`, V08 §3.1 step 7 (b); a control whose
operation is the page's posts `host.action`, V08 §4.2), each shown only to the roles its row names. Host mode
differs from the standalone app in exactly these points: no file operations — New town, Open…, Save a copy,
Recently deleted — and no permalink (V09 §2.2's `fileMenu: false`: the host is the store, and §11.1's permalinks
need a `DocResolver`, which host mode does not configure), and Settings without its Storage section (no local store,
V09 §3.8 (6); J-V8.96); every action that makes a new document follows V09 §3.9's host-mode rule
(`HostSlots.newDocuments: 'download'`, V08 §3.1 step 7 (b)); the assistant as the host's `clerk.config` sets it
— the Assistant button only under `builtin`, otherwise the card-only drawer for a host's proposal (V09 §2.2, §4.11; V10
§3.17) — with no creation mode and no **Start a new map from this** (V09 §3.9, §4.11); the history panel carries the group
"The party" (`HostSlots.historyLines`, V08 §4.6); the basic panel shows the dossier-owned
intent values — the population, the tier word — locked with the reason "Set by SettlementForge" (`HostSlots.lockedControls`,
reason `host.locked`; §7.7 item 11), while
the map facts the port derived (the wealth level, the density) stay editable (§7.7 layer 1); only owner and editor
frames exist (a player never mounts one, V08 §3.14), and a co-DM's frame has the editor's tools and exports by §11.1's
key rules; the header carries the party controls ("Reveal to the party", "Hide again", "See what the players see",
V08 §4.2), and while "See what the players see" is on — a display filter, `ViewOpts.viewAs` (V08 §3.14 (5)) — the frame
shows a persistent strip `host.playersView` "Showing what the players see" in its banner slot (`HostSlots.banner`),
its row carrying `buttons: [button.showEverything app(viewAsOff)]` (V09 §2.9's `MsgButton`; the button's words "Show
everything"; in host mode the clear is the players'-view toggle's off, V08 §3.14 (5)), so the DM never mistakes the filtered view for the whole map; the strip stands for
V09 §4.8's View-as banner while the host's party key is set (J-V8.89; V09 §4.8). Accessibility is §14's; the `<iframe>` carries
`title="Settlement map"` and the map region its accessible name, so the tab reads as one landmark.

### 5.2 Drawing the dossier's records and custom content

Each new entity kind is drawn, labelled, exported and persisted as this table says; the drawing rows are §8.2's
thematic and `states` rows (item 410 adds the rows named here; each has its program in every shipped family, `ink`,
`lit` and `hatched`, and falls back to the family's generic tint program where a family lacks one, §8.2).

| record (V08 §) | drawn | labelled | exported | persisted |
|---|---|---|---|---|
| `ConditionOverlay` (3.11) | by its archetype's `conditions` row: `siege` — a tint on the enceinte band and a hatched ring outside the wall; `quarantine` — a desaturating tint over the built area and a barrier mark at every gate; `occupation` — a banner mark on the seat's building (a new symbol `occupation`, §8.3); `migration` — item 70's camp clusters as the base draws them; every other archetype no mark | never on the map; the cartouche's legend names each drawn condition ("Under siege since week 40") for every key, since its tint is visible anyway; an archetype without a tint is named only for a `secret` key (J-V8.40) | GeoJSON: one feature per overlay (`kind: 'condition'`, archetype, severity, weeks) without geometry of its own, its `targets` the addresses it tints; SVG/PNG: the tint groups under `layer.thematic` | the model (§2.7) |
| `DepositSite` (3.11, 3.13 (4)) | its land use as §4.9 draws it; `depleted` by a `states` row `worked-out` (spoil heaps on a mine or quarry, a stump field on a wood); `removed` nothing | the deposit's display name — the `deposits` row's label, a custom resource's name, or for a derived site (`res:derived:<landuse>`) its land use's label — as a hinterland feature label at the city band (§9.4's hinterland rows) | GeoJSON: the land-use feature gains `deposit` (key) and `depositState` | the model |
| `PowerRelation` (3.11) | not drawn; item 72's political view reads it | — | the JSON schema only (model format) | the model |
| dossier-backed `Person` (3.11) | not drawn; the gazetteer's people list and the hover card of the building it works or lives in ("Works here: Aldric Venn, master of the Tanners' Hall") | by its workplace's knowledge: a notable posted to a place a key does not admit is withheld with that place (§11.2 *Knowledge*); else public | people CSV and the JSON schema | the model |
| `HistoryHint` (3.11) | nothing (it shapes generation) | — | the JSON schema | the recipe |
| `CustomChainRecord` (2.8) | an optional thematic view `supplyChains` (off by default): each ACTIVE chain as a dashed line along the way graph's shortest route between its placed nodes in flow order, an arrowhead at each node, the endpoints drawn to their gate or quay; one colour per chain from the thematic palette in key order; an inactive chain is not drawn. **Knowledge** (J-V8.103, J-V8.105): a chain is drawn, labelled, listed in the gazetteer and exported only when the key admits every one of its joined nodes — the view's effective key (V09 §2.10) for the drawing, the legend and the gazetteer; the export's knowledge key for GeoJSON and pictures (§11.1 *Knowledge*: the export dialog's key, item 453, or `exportPicture`'s `knowledge`, V08 §5.3) — each node whose `key` binds a placed element (the resource's site, a processor's institution and its building) admitted by its `knownTo` in §9.2's admission table as a band-less reader admits it (as at the city band, §11.2 *Knowledge*), a concealed use (item 63) never; otherwise the chain is not drawn, not listed (a chain is a relation, never an "unnamed" row) and not exported | the chain's label in the view's legend; and in the gazetteer under the kind `customChain` — each ACTIVE chain with its label, an inactive chain not listed — the read by which V09 §5.4 offers **SettlementForge's chains** (XV-V9-26; the host projection keeps the row as any `gazetteer` row, V08 §5.4 (3)); both under the drawn column's knowledge rule, so a chain with a withheld node has neither a legend row nor a gazetteer row | GeoJSON: one LineString per active chain the export's key admits by the drawn column's rule, on the view's route, `kind: 'supplyChain'`, its key and label; nothing else; an SVG or PNG export draws the view's chains under the same rule at its own key | the model |
| `CustomServiceRecord` (2.8) | not drawn (a sub-location, item 104 (h) (5)) | in its provider's hover card and the gazetteer | the JSON schema | the model |
| a custom institution's building | as any building of its class, which item 104 (a)'s resolution decides at fold (V08 §3.5 (5) (f); V11 §3.13.1); `landmark` raises its significance (item 72), so its label enters the ladder one band earlier (§9.4); `material` is passed to the building's material row (§2.6; the row's content is V02's) | its dossier name | as any dossier-backed building, `plat:tier` `dossier` | the model |

A held map is shown by V08 §5.1's banner and the frame's held notice (`HostSlots.banner`), a frozen view by the shell's
own `error.frozen` strip (V09 §3.14 (b)), never by a change to the map's marks. Item 110's terraces, retaining walls, raised ways and deck plots are drawn, labelled and exported by the
base's rows like any generated content; the port adds no drawing row for them.

### 5.3 Pictures for SettlementForge's own surfaces

* **`exportPicture(fmt, { knowledge, displayNames, opts })`** (V08 §2.2) — `png`, `svg` or `print` only (J-V8.36).
  `knowledge` — an `Admission`, item 572's type and item 453's union — lowers the requesting editor's key
  for that one export and never raises it (item 472): the key form `{ tier: 'public', places: [] }` for an anonymous or
  gallery picture and `{ tier: 'local', places: [] }` where the DM chooses a local picture — key forms, never a bare
  tier, which would be read with the requester key's places (J-V8.92); omitted for the DM's own. Every picture for an
  audience that never mounts a live map — players, anonymous, gallery, a DM-full share (§14's audience table) — is made
  by an owner's or editor's session or by the refresh frame, and stored or served by the host as it chooses; the
  players' set is V08 §3.14's, drawn by the module on `party.render` under the resolved party key, never through
  `exportPicture` (J-V8.91).
* **Notes and pins in pictures.** A picture draws the document's public notes and view pins and the annotation
  layer (§2.9 view state, §9.5) under its key; the DM's private notes and pins are never drawn in a picture made for
  another audience. So what SettlementForge's retired map rows called audience-tagged annotations maps to the base's
  public and private notes, and the players see the public ones in their pictures.
* **Thumbnails** (V08 §3.7): two per map record, `public` and `secret`, 512 px on the long side, the city band, the
  document's style, the fixed sun, no hand lantern (an export has no pointer, §11.1); the card of a campaign's
  settlement shows the `secret` thumbnail to the DM and a co-DM, the party set's z0 picture to players when one is
  stored, and the `public` thumbnail to everyone else.
* **Display names** (item 85): the host computes the veiled text for every name its public-projection filter veils
  and sends it with the one export (V08 §3.11); the title is included, so a veiled settlement name is veiled in the
  cartouche too.
* **SVG as data.** SettlementForge may place the SVG in its own PDF plates and public pages (`research/sf/dossier-seam.md` C-11); the inert
  bar is §11.1's (text as outlines by default, no script, no external reference) and SettlementForge's own sanitiser
  still runs on its side.
* **The title.** The dossier's name and tier word (§9.5; §7.7 item 15); a picture's metadata states its tier shares
  (§11.1), so a SettlementForge surface can say "every institution from SettlementForge's record".

### 5.4 What leaves the frame — door 1 closed by ruling, and structurally for every structured format

Door 1 is closed by ruling (J86; §11.4). Structurally (J-V8.37), no call returns a structured format to
SettlementForge's code as data — no GeoJSON, VTT, glTF, CityJSON, CSV, skeleton or query geometry it could read. What
the host does hold is stated plainly: the document, as an opaque stored artifact it has no decoder for; pictures, whose
drawn outlines the owner's audience table accepts (§14); and, from M-SF, the export bundle's scene files as opaque blobs
it packages unread ((2)).

1. **The host client carries no decoder.** It receives the document's bytes (`dossier.result.created` and
   `doc.snapshot.ready`) and stores them as handed; `@plat/bridge-client` imports no part of `@plat/model`, so it cannot
   read them (the lint of §14's dependency rules gains the client as a leaf that imports nothing of `plat/`,
   item 507). `doc.snapshot` is the editing role's storage message, not an export: a viewer's is refused
   `doc.rejected { reason: 'role' }`, and `E_HOST_FORMAT` does not apply to it (T-V8-27).
2. **Pictures, not data.** `exportPicture` offers `png`, `svg` and `print` alone. Every other format — GeoJSON, VTT,
   glTF, CityJSON, CSV, the skeleton, `.plat` as an export — is the USER's, offered by the frame's export menu under
   §11.1's key rules and saved to the user's device through the frame's `allow-downloads` sandbox flag; the host client
   has no call that returns one, and the module in host mode answers a host's `export.request` for any other format with
   `export.refused { error: 'E_HOST_FORMAT' }` (item 472) — with one exception, the export bundle (V08 §11 Q3, decided
   under J122: yes, from M-SF; until then maps export on their own). **The export bundle** (J-V8.116). From M-SF,
   `MapSession.exportBundle(formats, { knowledge? })` asks for the scene files a DM chose for SettlementForge's export
   bundle — `dd2vtt` and `foundry`, §11.1's scene formats — as `export.request { fmt, opts: { bundle: true }, knowledge? }`
   from an owner's or editor's session (a viewer's is refused `role`); the module renders each at the export's
   knowledge key (the requester's key, lowered by `knowledge` and never raised, item 572) under §11.1's key rules and
   answers `export.ready { bytes }`; the client returns each as an opaque `Blob` of type `application/octet-stream`,
   parsing nothing, and SettlementForge's code packages the blobs into its bundle unread — the contract clause the host
   implements, beside the no-decoder rule of (1). Door 1 stays closed: the bundle is packaging for the user's download,
   never input to SettlementForge's simulator, which reads no map geometry (J86). Any other format, and `opts.bundle` in
   a build before M-SF, is refused `E_HOST_FORMAT` (T-V8-48).
3. **Words, not shapes, for every clerk answer that leaves the frame.** In host mode the MODULE applies the host
   projection to every `query.result` — and to every `preview` reply — before it is posted out of the frame
   (item 473 (c)): this section's rows for the base's kinds, V10 §3.17's for the reader kinds; the host client
   receives only projected answers and carries no projection code, so one component owns the projection and no full
   answer ever reaches SettlementForge's page (door 1, J86). The projection is a fixed list of kept fields per
   answer kind, a table of `@plat/api`'s host-mode bridge handler; it keeps names, kinds, addresses, districts, tiers,
   reasons and alternatives by name and drops every coordinate, ring, bearing, distance, extent and viewport field:

   | answer (the base's kinds, §11.2) | kept | dropped |
   |---|---|---|
   | `gazetteer` rows | `id`, `kind`, `withheld`, `name`, the address, the district, the tier (`dossier`, `declared`, `map`), the use or institution kind where the key admits it | every geometry, anchor, bound, coordinate and area |
   | `people` rows | `id`, `name`, `withheld`, type, race, gender, age, profession, workplace and household by id and name (by address when withheld), district; ordered with the dossier-backed persons first by their carried `importance` (`pillar`, `key`, `notable`, `minor`, then none), then by name (W-DOS-07) | any position |
   | `whereIs` | the person, day and hour; the place by id and name (by address when withheld) and its district | the position and any route |
   | `relations` | the tree's ids, names and relation words | — |
   | `fates`, and every `preview` reply | `status`; `actions` without `at`; each `EditFate` (`id`, `fate`, `to`, `reason`); `renames`; `counts`; `bent` | `actions[].at`, `shape` |
   | `why` | V10 §3.17's `WhyAnswer` row | as there |
   | `hit`, `inView` | not offered: refused `E_HOST_KIND` (they need a view the host does not hold) | — |

   The reader kinds — `brief`, `entity`, `sites`, `frame` without `near` and `radiusM`, `rule`, `profile`, with `measure`
   refused `E_HOST_KIND` — are V10 §3.17's rows. The party gazetteer is assembled and projected by the module
   the same way before it goes into `party.rendered` for storage (V08 §3.14 (2) (c), (3)). The built-in clerk (volume V10) runs in the module;
   under V10's configuration B its prompt and every tool result pass the same projection before they leave the frame
   (V10 §3.17). T-V8-27 asserts on the bytes the module posts.
4. **Status and reports are text.** `module.status`, `report.changed` entries (change ids, reasons, fates by address
   and name), `entity.selected { id, kind }` and `host.action` (binding keys, addresses and words only; V08 §2.2) carry
   no geometry; `party.rendered` carries pictures and the projected gazetteer only ((2), (3)).

### 5.5 Labels

The settlement's title is the dossier's name with its tier word (§9.5; §7.7 item 15); quarter names come from the
dossier's naming claims (§7.7 item 16); every other name the dossier does not give is generated from `site.culture`
(DR14). A dossier name is rendered as text — never as markup — and a name longer than §9.4's ladder allows overflows by
§9.4's rules. A place the dossier marks `local` or `secret` is drawn but not named for a key that does not admit it
(§9.2); the DM raises the party's knowledge place by place with "Reveal to the party" (V08 §4.2), recorded on the map
record for every player and every later picture (V08 §3.14). The history panel speaks in
SettlementForge's own reason words (`DossierChange.reason`) beside the map's rule, and in the DM's language only as far
as SettlementForge supplies the words. The frame's interface language is SettlementForge's (J121): `MapHostConfig.locale`
reaches the frame in its `src` (V08 §3.1 step 1) and the module reads that locale's catalogue file (V09 §2.9's
*Locales*); English is the catalogue's source language, whose row stands in for a missing file or key — never a product
default of its own (T-V8-53).

## 6 Performance budgets

On §12.1's reference machine, p95 (item 480), measured by the host harness (V08 §7.2) with the frame on the module's own origin and
the host page on another; every row PLAUSIBLE until SF1's measurement (V08 §8), each with its pre-decided fallback. B is
the document's building count (§12.2); T(B) is §12.5's first-map law, M(B) §12.3's model law, V §12.6's replay law.

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
| `digest` (limits, shape, records, keys, custom) | ≤ 15 ms | ≤ 25 ms | ≤ 40 ms | a walk over ≤ 260 KB; linear in bytes |
| creation of a new map | ≤ 20 ms + T(B) | same | same | `creation` is table look-ups; `generate` reads the prefix ahead (§7.7 One path) |
| an absorb without an epoch (a week: 1–5 changes) | ≤ 40 ms + 30 ms per element event | ≤ 40 ms + 30 ms per event | ≤ 60 ms + 45 ms per event | §12.6's post-build placement bound per event; the dry run's cost is the fold's |
| an absorb with epochs (a year) | ≤ 40 ms + Σ events + Σ epochs by §12.6's epoch law | same | same | a CITY year of ≈ 10 events and one whole-town epoch ≈ 0.7 s; the evolution engine's own epoch budget (volume V06) replaces §12.6's law when it lands |
| `dossier.result` size, excluding `created`'s bytes | ≤ 2 MB | ≤ 2 MB | ≤ 2 MB | the ledger event carries before and after facts; over it, the result is split into ordered parts of ≤ 1 MB under one `re`. The `.plat` bytes of `created` and of `doc.snapshot.ready` are `ArrayBuffer` transfers (no clone), bounded by §2.9's document budget (≤ 0.6, 3 and 8 MB) |
| the refresh queue, per map (boot paid once) | ≤ 1.3 s after a year | ≤ 3.5 s after a year | ≤ 8 s after a year | load + absorb + two thumbnails (≈ 5 µs × B + 10 ms each) + a compaction (`.plat` encode ≤ 60 ms at CITY) + the party set (the render row above); a campaign of 20 CITY maps ≤ 70 s of background work |
| memory, one live map per frame | §12.8's rung line + 30 MB | same | same | the app's fixed heap; the refresh frame has no tile worker except while it draws thumbnails and the party set |
| memory, the DM's page, all frames | ≤ 161 MB (a visible TOWN frame whose built-in clerk holds an authoring turn, and a refresh frame at TOWN); ≤ 141 MB with no turn | ≤ 231 MB (a visible TOWN frame holding a turn beside the refresh frame at CITY, which runs only beside a visible TOWN or with the Map tab closed; a visible CITY alone with a turn ≤ 196 MB); ≤ 211 MB with no turn | ≤ 421 MB (a visible METROPOLIS frame alone holding a turn; a METROPOLIS refresh beside a visible TOWN holding one ≤ 381 MB); ≤ 361 MB with no turn, ≤ 291 MB with one frame | ≤ 1 MB for the client + Σ over live frames of (§12.8's line for its document + 30 MB): 40, 110 and 260 MB; at most one CITY or METROPOLIS document live on the page (V08 §3.4) + V10's scratch line (item 481: 20, 55 or 130 MB at the frame's rung) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal — configurations A and B, where that clerk runs in the frame; C opens no scratch, and the refresh frame runs no built-in clerk (J-V8.97); over the bar, V10 §3.19's overlay mode for that turn (item 481's device fallback) |
| memory in SettlementForge's page, outside the frames | ≤ 1 MB + the thumbnails on screen; a player's page ≤ 1 MB + the party tiles in view (≤ 20 MB) | same | same | the client, its queue and the viewer's decoded tiles (released off screen) |
| storage per map record, with two backups | ≤ 4.6 MB worst (snapshot 0.6, tail and one kept segment 0.5, 2 backups 1.2, thumbnails 0.3, party set 2) | ≤ 15.9 MB worst, ≈ 8 MB typical | ≤ 36.8 MB worst | §2.9's size budget plus the party set's row; each backup adds one snapshot's size, so the record scales with `MapHostConfig.backupDepth` — SettlementForge's rule (J121; V08 §11 Q2) — and its allowance is SettlementForge's (`quotaBytes`, V08 §3.7) |
| the export bundle's scene files (from M-SF) | §11.1's scene exports, timed by §12.7's export law | same | same | rendered in the generation worker between edit batches, never delaying an edit (§12.6's settle rule) |

**Why these numbers.** The map tab must never feel slower than opening the standalone map: the load row is §12.5's own
law, and everything the stage adds on top — the hash, the clone, the digest, the diff — is under 100 ms at every rung.
The refresh queue trades time for memory (V08 §3.4): it is background work the DM never waits on, and a map opened
before its turn is absorbed at once in its own frame.

## 7 Tests and acceptance bars

### 7.1 The bars (T-V8-n)

Each bar names its CI tier (§13.8: PR, nightly, milestone) and the step of V08 §8 from which it runs (item 486). Fixtures are
§13.2's frozen dossier set (items 83, 84) — never a live SettlementForge — plus test-side mutations of a fixture's
digest or JSON made by the harness at run time, never written back into a fixture file.

| bar | what it proves | tier, from |
|---|---|---|
| T-V8-1 | the embed boots on Chromium, Firefox and WebKit (Playwright) with the frame on its own origin under V08 §3.1's sandbox flags and both CSPs; `ready` within V08 §6's rows; a message from a wrong origin or from another window of the right origin is dropped and logged (§11.3) | PR, SF0 |
| T-V8-2 | `@plat/bridge-client` is ≤ 12 KB gzipped with its viewer (≤ 8 KB without), imports nothing (a bundle scan), and its message types equal `@plat/api`'s bridge schema field for field (a generated-types diff); a type-level check that every `MapStore` write parameter (`encoded`, `seqAfter`, `logHeadAfter`, `SnapshotBlock`'s fields, `PartyPictureSet`) is a field of a message the client receives, so the host computes nothing it stores | PR, SF1 |
| T-V8-3 | two editing clients offering `create` for the same settlement at once: the host stores exactly one record, and the loser's document is byte-identical to the stored one (canonical bytes and model digest); two editors' absorbs of the same dossier on the same head are byte-identical, every event with session `host:port`; on the nine at-rung births × 5 seeds | PR, SF2 |
| T-V8-4 | `hashDossier` gives one value for every key order and whitespace of the same dossier, a different value for any changed scalar, and equals a Node reference implementation on every fixture | PR, SF1 |
| T-V8-5 | against a `MapStore` that stores bytes only and never decodes, hashes or computes a head: snapshot + tail replays to the session's model digest at every compaction point of a 1 000-event scripted session (edits, undo, redo, 12 absorbs); compaction at 256 events and 256 KB, including an edit committed between `doc.snapshot` and `replaceSnapshot` (the suffix kept); the backups rotate `backupDepth` deep — run at 0, 1 and 2 — with `tailAfter` on the newest; after a 100-absorb script and a save–load round trip, the dossier block the fold rebuilds equals the stored one at every seq | PR, SF5 |
| T-V8-6 | a dossier differing from the carried state only in never-read keys, prose or below the digest's rounding returns `unchanged`: nothing appended, `lastOffer` updated, the document's bytes untouched | PR, SF2 |
| T-V8-7 | five dossier versions offered within one in-flight absorb: one further absorb against the newest; the carried facts after it equal the newest digest's; no change lost (each element's final state equals the newest dossier's) | PR, SF2 |
| T-V8-8 | convergence through the bridge: a host with a DM, a co-DM and two players' party viewers; 500 interleaved map edits (undo and redo from both editors), 12 weekly offers and one yearly: both editors' model digests equal at the end, 0 lost accepted events (§11.3's M3a test, extended to dossier offers); each editor re-runs every applied absorb it holds the dossier for with 0 mismatches, and a result with one event altered in transit is reported as a port mismatch by the other editor while the log stands; the players' pages receive no document message at any point | nightly, SF2 |
| T-V8-9 | quarantine: a fixture with one institution record mutated to fail its own checks absorbs every other change, lists the record in `quarantined` with a `quarantined_record` note, leaves its element's building and use unchanged; with the record's key unformable, every carried institution key absent from the digest is held (no `remove`, one `quarantine_hold` note); the next offer with the record repaired absorbs it; a save–load round trip shows no dossier-block mismatch | PR, SF3 |
| T-V8-10 | adapter remaps are declared: a test adapter version that changes a field's meaning without listing it fails the bar on the re-cut pairs; listed, the re-baseline emits no map event and notes `adapter_remap` | nightly, SF3 |
| T-V8-11 | a line change: a test "line B" adapter with `fromLines` identity re-keys by `rebind` only, changes no address, notes `line_migrated`; without a `fromLines` row the map is held with `E_LINE_UNSUPPORTED` and a later line-A dossier absorbs normally. Two registered adapters both accepting: `HostContext.line` picks when given; with none, a bound document stays on its line; a new settlement is created on the newest line, noted `line_defaulted`; `E_LINE_UNSUPPORTED` only when none accepts | nightly, SF3 |
| T-V8-12 | campaign scale: 20 maps (the nine births × seeds, grown to CITY where the fixture allows) after one year: every record `current`; the frame's memory peak ≤ one map's line + 30 MB; the queue pauses on input and resumes 5 s after; a page closed mid-queue resumes from `refreshPending`; the total within V08 §6's row | milestone, SF7 |
| T-V8-13 | `doc.snapshot`: creation, compaction, upgrade and rebase store the reply's `SnapshotBlock` as handed; its `documentDigest` equals the module's own; a restore and a new map send every open session a fresh `doc.load` and leave none on a lost head; a restore of a backup with another `docId` is refused | PR, SF2 |
| T-V8-14 | the failure ladder: each of rows B1–B20 of V08 §3.9 forced in the harness takes its stated rung and shows its column's catalogue keys with their args (never compared as words); no row changes a stored snapshot except B10's rebuild and a DM's restore; B10's second rung is exact with `tailAfter`, and B11 creates a new map under a new `mapId`. **The words' walker**: every `PortNote` kind of the base and V08 §2.4 and every `PortRefusalCode` with `E_RUNG_UNAVAILABLE`'s three cases has its row (V08 §4.6, §3.9), every `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*`, `host.verify.*`, `host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView` and `host.mirror.dropped` key named here has its row and every word V08 §3.7, §4.2 and §5.1 quote has its key (V08 §5.1, §4.2, §4.6, §3.9), each row ≤ 25 words, and every arg a row names is filled by the port for its note (a compile check over the union and the tables); on `town-1`'s pairs an absorb's `event` and new `standing` notes are drawn in its history group from the ledger event in a second editor's frame and after a reload, the standing set in the report panel from `report(h)`'s `GenerationReport.dossierNotes` (equal to `DossierBinding.notes` at the report's seq in each of those frames, `[]` on an unbound document, listed after `GenerationReport.dossier` under `host.group.standing`), a standing note is not carried again by the next absorb that still writes it and is cleared by one that does not, and no `report` note enters the log; on a test-side variant of `town-1` whose one standing note's record and one event note's element are `secret` places, both lines are drawn at `secret` and neither is drawn — in the absorb group or the report panel — under View as "What anyone knows" or under "See what the players see" with a party key that omits them | nightly, SF6 |
| T-V8-15 | held and recovered: an unreadable dossier holds the map; a later readable one absorbs every change since the held state in one pass; a population falling below 1 500 holds (no village product registered) and returning above absorbs; with a test `ProductDecl` registered, a population of 0 at an absorb routes to THORP and V07's desertion — the map deserted, never held, for a village-product document and, through V07 §2.1's fold, for a base-product one — and a creation at 0 is refused `E_RUNG_UNAVAILABLE` naming the floor | PR, SF3 |
| T-V8-16 | display names through the bridge (T85-3 over the real transport): the public picture draws the veiled texts, title included; the document and the next export are unchanged; a `knowledge` option never raises the requester's key — a bare tier is read with the requester key's places and a key form as a key in its own right (item 572), and the thumbnails' and gallery pictures' `knowledge` is `{ tier: 'public', places: [] }` whatever places the requester's key holds | PR, SF4 |
| T-V8-17 | the players: a bridge trace of a player's page shows no `doc.load`, no `dossier.offer`, no `query` and no frame; `mount` refuses the word `player` before a frame exists; the party set's SVG and gazetteer contain none of the names the party key withholds (a byte search for every withheld name on every fixture) and the tiles are drawn from a display list that holds none (an instrumented render); every `gazetteer` and `people` query of a party render carries `admitAs` = the party key resolved by V08 §3.14 (1), in item 572's key form with `places` present, and every picture of the set the same form as its `knowledge` (an instrumented facade); each audience word gets exactly §14's role and key through `doc.load.audience`, the module taking the lower of it and `role`; anonymous, gallery and DM-full shares get pictures only | PR, SF4 |
| T-V8-18 | the staged records and the real vocabularies: conditions put whatever their status (`stable`, `worsening`, `easing`) with weeks from their ticks — `untilWeek` within ±1 week across town-1's and city-1's one-week, one-season and one-year ticks, else the adapter's declared absolute-tick remap (V08 §3.11) — and retired when unlisted; stressors put as overlays with no epoch event; deposits put, `bearingCdeg` and `landUse` written by S12a and recomputed on regeneration; relations put by the `relations` row; a successor notable inherits the house and posting; a reroll re-binds a notable by name and role (`npc_rebound`); a replay from the log rebuilds every record; a user's or clerk's edit of their fields is refused `dossier-owned`; TOTALITY: every relation type and trend, history event type, condition status and archetype, stressor type, `magicLevel`, `materialFamily`, custom definition `economicWeight` and `criticality` word (the `customWeights` row, J-V8.108), isolation path, chain status, dependency severity and qualifier word in the fixtures has a row or the declared else, with 0 `unmapped_word` notes on the fixtures; the derived land use: a test-side mutation of `town-1` adding a `Salt works` record, with no salt deposit, has one `saltpan` face from `res:derived:saltpan`, noted `derived_landuse`, and its salt works within 0 of it (the hard row met, no closest-option report); a second salt-working record adds no second face; adding `salt_flats` later opens the deposit's own face and leaves the derived one standing; removing every salt-working record puts the derived site `depleted`, its face drawn worked out; and every class a `kinds` row binds whose hard `near` → `landuse:<k>` row within 0 names a land use outside §4.9's rings has its land use in the `deposits` row's derived list (a compile check); every row set V08 §2.6 writes compiles with `calibratable: false` on every column, T-V11-37's clause run on V08's sources (J-V8.107); **at VH**, a hamlet fixture with a `Peat cutter` record and no `marshlands` has its `marsh` face read by V07 §3.9's claim | nightly, SF4; the hamlet clause nightly, VH |
| T-V8-19 | the village hand-off with a TEST `ProductDecl` registered in `StrategyRegistry.products` (the port registers nothing): a sub-1 500 dossier is created on its rows; a town shrinking out of the band below 1 500 and a village growing out of it above keep one document, one seed and every standing address outside the epoch's disruption set; a target alternating 1 480 / 1 520 changes the product 0 times, one alternating 1 400 / 1 600 at every epoch (V07 §2.1's band) | milestone, SF4 (VH with V07) |
| T-V8-20 | limits and the ignore clause: dossiers over each limit refuse `E_UNKNOWN_SHAPE` with `size_limit` naming it and copy no over-long string; on every fixture the port reads no key of §7.7 item 1's never-read list (a proxy-wrapped dossier records every property access) | PR, SF3 |
| T-V8-21 | `PortValues`: with values present the staged readers read the slice's; with nulls, the table's; T88-1 unchanged on the golden suite | PR, SF4 |
| T-V8-22 | the latitude: `cell.latDeg` wins when present, else the culture row, else 50; `Intent.latitudeDeg` holds it from creation; a realm latitude arriving after creation reaches the next epoch's `PortValues.latitudeDeg` and moves the field only by item 102 (e)'s drift, never at once; a document without the field reads 50; with item 102's `w_sun` at its default, T73-7 holds on every at-rung birth (a dossier map stays within one band of its wealth row) | PR, SF4 |
| T-V8-23 | the tag and category vocabularies: every tag of the fixtures and of the line's tag vocabulary has a `tags` row or the declared no-family fallback; every category and content group has a `categories` row; `unmapped_word` notes 0 on the fixtures | PR, SF3 |
| T-V8-24 | coverage inside a collective range (item 392): every collective count inside its range on every seed; with coverage rows filled, the share of districts served rises above the random-placement baseline (item 103 (f)'s bar) while the counts stay inside the ranges; with the coverage weight 0 the digest equals the no-coverage build | nightly, SF4 |
| T-V8-25 | custom content's arrival (item 104 (g)'s port side): on `town-cc-1` and its test-side variants — a custom record with only a category; category and tags; a scene archetype; the admitted library fields; an active chain — each digests to the specified `custom` part, chain, resource and service; the client sends no library entry the dossier did not materialise, and a mismatched entry reaching the port is ignored with one note; an offer without the library changes nothing; a new content hash emits one `setAttr` of `custom.revision`; a chain toggled inactive, then dropped, then listed again puts, retires and re-puts one record and moves no node; `archetypes` has exactly the line's 17 ids; zero refusals from custom input; the class is decided at fold, not at digest — a custom record with no archetype and a keyword whose `class` cell names a class resolves to that class, a map declaration for its `localUid` outranks every rung, and the `custom_resolved` note names the deciding rung; on the active-chain variant with one joined processor made a `secret` place (a test-side mutation), read at `public` and at a party key form without that place: no line, arrowhead, legend row, gazetteer `customChain` row, GeoJSON `supplyChain` feature or `supplyChains` path in an SVG export, and all of them at `secret` | PR, SF4 |
| T-V8-26 | the release checklist (V08 §8.3) runs as one script and fails on any unticked row | milestone, SF7 |
| T-V8-27 | door 1, structurally for every structured format: a type scan of `@plat/bridge-client` finds no geometry-bearing field in any value it returns except the opaque document bytes and the pictures; `exportPicture` accepts only `png`, `svg`, `print`; a host `export.request` for any other format is refused `E_HOST_FORMAT`; `doc.snapshot` from a viewer is refused `role` and from an editor answered; the host projection is asserted on the BYTES THE MODULE POSTS (a transport tap in the harness records every `query.result` and `preview` reply leaving the frame): on the fixture answer of every offered kind — `gazetteer`, `people`, `whereIs`, `relations`, `fates`, a `preview` reply, `brief`, `entity`, `sites`, `why` with sections, `frame` without radius, `rule`, `profile` — no coordinate, ring, bearing, distance, extent or viewport field; `measure`, `hit` and `inView` are refused `E_HOST_KIND`; the stored party gazetteer's bytes likewise; a source scan finds no projection code in `@plat/bridge-client`; under V10's configuration B every tool result leaving the frame passes it | PR, SF6 |
| T-V8-28 | inert custom text: T85-1's hostile strings as custom names, categories, tags and descriptions reach every exporter inert; the description occurs nowhere in the document, the digest or the carried facts (a byte search) | PR, SF4 |
| T-V8-29 | the upgrade flow: an owner's client alone gets `upgrade-available`; the party pictures keep the stored version's drawing until the DM upgrades, then re-render; the dialog names what the new version adds, item 110's content among it; the `upgrade` event is compacted at once and its undo works while `from` is in the retention window | nightly, SF5 |
| T-V8-30 | the budgets: every row of V08 §6 measured on the reference machine by the host harness, the page-level memory row with a METROPOLIS refresh beside a visible TOWN, and once more under V10's configuration B with a proposal waiting — in a visible TOWN frame beside a METROPOLIS refresh, and in a visible METROPOLIS frame alone — against the row's with-turn bars; a miss takes its row's fallback and is reported for the owner's veto (§12's rule) | milestone, SF7 |
| T-V8-31 | recognition: every pair fixture — the 35 births and the 12 after-tick dossiers, 41 to 47 top-level keys — is recognised and absorbs; an unknown extra key is accepted, dropped and noted `ignored_key`; a dossier missing one required key is refused `E_UNKNOWN_SHAPE` | PR, SF3 |
| T-V8-32 | item 109's sources (DR30, DR31): a dossier with `ancient_ruins` or a `ruined-landmark` record has a ruin system, else V04's stated reason; `magical_node`'s site stands at the ruin's centre when the ruin has another source; a `mountain` dossier's relief is `mountainous` and a `hills` one `hilly`; a mining deposit sets V04's mining test; ley lines, a magical history event and a delving record reach `site.ruinEvidence`; the ancient founding reaches only `HistoryHint` | PR, SF4 |
| T-V8-33 | the burial and crypt trace (DR32): on every birth, 0 catacombs sourced on a church, the cathedral or a monastery's church; the cathedral's crypt is the largest; `metropolis-3`'s two cathedral records give one building (`ladder_merged`); the church count counts each church once (the metropolises' two ranges merged); below TOWN no catacomb; a cemetery closed by a dossier event leaves its catacomb's extent unchanged across the next three epochs; a TOWN-to-CITY promotion pair (a test-side mutation of `town-1` grown past 10 000 with the city burial record added and the town one kept, then dropped) closes no burial face — `rebind` only, `ladder_promoted` | nightly, SF4 |
| T-V8-34 | name resolution (V08 §3.5 (6)): on the pairs, every chain processor, dependency institution and calamity target resolves exactly, by kind family, or is noted unjoined; the exact share at least the survey's (2 585 of 3 381) and the kind family's gain measured and reported; an unjoined processor never creates a building | nightly, SF4 |
| T-V8-35 | the supply links (DR33) on `town-1` and `city-1`: every chain with two joined members yields a link; an impaired chain's pull equals V11's status factor × a running one's; an entrepot chain's ends pull toward the gate or quay facing its partner; the links are never stored (a byte search of the document for a link record finds none) | PR, SF4 |
| T-V8-36 | the water system (DR34) through the bridge: on `sample-blackcrag` (CITY, mountain, a bath-house) and `city-2` (riverside), every generated aqueduct's reason is recorded and its terminal is the dossier's conduit house; `city-1` mutated to 8 000 people (rung TOWN, the city record kept) has 0 raised ways; `metropolis-2`'s aqueduct cap is one above `metropolis-3`'s under the same sources (a test-side mutation giving both the same site); a record closed by a test-side mutation leaves the arches `disused` and in place; no aqueduct draws on a hot spring; with item 110's rows off the T73 runs are byte-identical through the bridge | nightly, SF4 |
| T-V8-37 | the removal hold: on `sample-blackcrag` and `city-2` the DM removes every generated raised way; after 12 weekly offers, a yearly offer moving the population past the roster tolerance, a rung-TOWN mutation grown past 10 000, a line re-key and an `upgrade`, 0 removed raised ways stand again at their slots and the conduit house stands; a clerk's removal proposal is accepted, never refused `dossier-owned` | nightly, SF4 |
| T-V8-38 | the high-ground landmarks (DR35): on the CITY and METROPOLIS births, every elevated road's recorded reason cites only institutions of significance at least `elevated.landmarkMinSignificance` (V11 §3.24.2), custom `landmark` records or high wards, and 0 landmark strings | nightly, SF4 |
| T-V8-39 | the culture's reach: `city-3` with its culture mutated to `mesoamerican`, test-side, with V11's stepped rows on, makes the stepped specialisation eligible, its chance row read and cited in the temple's provenance; the aqueduct chance reads the culture's modifier row; with item 110's rows off, byte-identical | nightly, SF4 |
| T-V8-40 | the dry-site toll bridge (item 399): each of the six base-rung dry births (`culture-arabic`, `-celtic`, `-east_asian`, `-mediterranean`, `-slavic`, `town-3`) has a brook, a bridge where the longest approach crosses it and the toll house within 30 m of that bridge, with 0 raised ways; a `desert` mutation gives the gate toll house and a `toll_bridge_dry` note; a toll bridge record arriving by a later absorb re-draws no terrain | PR, SF4 |
| T-V8-41 | the party picture set: re-rendered after a committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after `setParty`; two renders of one head and one party key are byte-identical; a reveal made by the DM is seen by a player who opens the tab afterwards and by a second player; "Hide again" restores the previous party; public notes and view pins are drawn, private ones never; B18 detects a stale set by head, party revision or output version; `putPartyPictures` keeps the newer of two concurrent sets; the render and storage rows of V08 §6 hold; with "See what the players see" on, the frame's city band equals the party set's z0 picture at the same head (a pixel diff, both drawn with the fixed sun), the frame's knowledge key stays `secret`, the document's view section is byte-identical before and after the toggle, `doc.snapshot` is answered and the export menu still offers the document formats; a `host.state` carrying a new `party` re-resolves the filter; the crossing (J-V8.91): each render is one `party.render` answered by one `party.rendered` whose set's `partyRev` is the request's `party.rev` and whose `seqAt` is the head drawn; a map edit batch that changes no drawn mark and no listed word (a lock) is answered `unchanged` and writes nothing to the store; an edit that renames a revealed place is answered `rendered`; a viewer's `party.render` is refused `role` | PR, SF5 |
| T-V8-42 | the calamities (DR28): the lit `city-1` pair yields its week-52 calamity as one `EpochInputs.events` entry with severity `major` (≈ 0.09 of the population) and V06's `topple` in its resolved targets' district; a target that joins nothing is dropped and noted `calamity_unplaced`; a calamity leaving the line's capped list is never undone | nightly, SF4 |
| T-V8-43 | the sea threats: a coastal test-side mutation of `city-2` with a `wartime` stressor carries `naval` and DR2 reads it through V11's waterfront row; the same site at peace carries none (or `exposedPort` at 20 000 or more with a port); an inland site carries none; a change of the keys reaches DR2 at the next epoch, never mid-epoch | PR, SF4 |
| T-V8-44 | the ladders (item 108 (f)): the fourteen qualifier words parse to their steps; `(50-100+)` sets `openTop`; `(10,000+ only)` is a population floor, never a count; no double counting — each metropolis's two church ranges and `metropolis-3`'s two cathedral records merge; a `promotedFrom` receipt re-keys to `#1` and adds members where the greater's thing is the lesser's, and places a REPLACEMENT greater of a new thing new under the record's key, its row re-pointed and the lesser's former thing standing unbound (V08 §3.5.1 (d)); a `demotedFrom` keeps the member nearest its demand; the institution count parity of V08 §7.3 holds by step type on every fixture; a GUILD record beside a guild COUNT record of its family places no second hall — its hall is a COUNT member `#k`, noted `ladder_merged`; an unnumbered record at a village rung takes V07 §2.4's range row, else V11's range unscaled | nightly, SF4 |
| T-V8-45 | the DM's history lines (a harness check): a raised way built at an absorb's epoch is listed as V09 §4.10's `epoch` row whose chronicle entry is V06's `raisedWay`, and its **Why here?** opens the `raised` section with `info.raised.built` and the DR34 or DR35 inputs as `facts` rows of tier `dossier`; a reason firing at a slot the DM closed is one line `info.raised.suppressed` with the removal's week as `{w}`, from one `EpochReport.raised.suppressedFired` entry (V06 §2.10; its producer held by T-V6-58); a way founded in a slot a cap increase opened is an ordinary founding entry, never the removed way's return; the check reads the lines' keys and args, never their words; the upgrade dialog names item 110's additions | nightly, SF6 |
| T-V8-46 | the pseudo-class routes: every `kinds` row's class is a roster class or one of the pseudo-classes of V08 §2.6's `kinds` shape (a compile check over the rows); at a base rung, a test-side mutation of `town-1` with both `Access to external mill` (`@absent:watermill+windmill`) and `Access to parish church` (`@absent:church`) added and every record binding `watermill`, `windmill` or `church` removed places no watermill, windmill or church of its own; adding back one binding record restores that class; `@absent` records are counted by no building in the parity of V08 §7.3. **At VH** (with V07's rows, after SR1-02): a hamlet fixture with `Access to external mill` places no `v.watermill` or `v.windmill` of its own, and one with `Access to parish church` no `v.parish_church`, `v.parsonage` or `v.tithe_barn` (V07 §3.11 step 1's `villageForm` reading); a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record's key to one `cross` pin inside the church's `churchyard` part and aliases it on no building, while a test-side mutation of `town-1` holding both records (added where absent) aliases the shrine's key on the parish church's building (V08 §3.5.1 (c)); **over time**: a hamlet fixture with `Wayside shrine` whose record a `promotedFrom` receipt promotes to `Parish church` at an absorb that takes it to VILLAGE stands one `v.parish_church` bound to the record's key, one churchyard `cross` laid for it (keyed by the record's binding key, its provenance the record, no binding row of its own; J-V8.114) and the old roadside `shrine` standing, bound to nothing, with one `ladder_promoted` note; the same hamlet whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt stands one `v.parish_church` bound to the church's key, binds the shrine's key to one churchyard `cross` and leaves the roadside shrine unbound; a village fixture with `Fishmonger` that gains `Fish market` binds the market's key to one hall on the market's rim, with the fishmonger's key as its alias and the fishmonger's shop keeping its use, unbound; a village fixture with `Palisade or earthworks` that gains `Town walls` binds the town walls' key to the one enceinte the fortification path yields — the palisade retyped when at least 80 % of the dwellings lie inside, else the new ring — with the palisade's key as its alias and no binding on a superseded palisade; and a test-side mutation of `town-1` whose `Hedge wizard` record a `promotedFrom` receipt promotes to `Wizard's tower` re-binds the standing house as the tower's member and places no second building (the first case of V08 §3.5.1 (c)); a hamlet fixture off any through road with an unmapped `lodging` kind writes one `unmapped_kind` note whose `class` is `v.alehouse`'s `label` cell — the class V07 §3.11 step 4 built — never the generic class, and T-V7-21's `mercantile-market` custom record at VILLAGE writes `custom_resolved` naming the market cross by its `host.pinKind.market_cross` words, the rendered sentence reading "… built like any market cross (…)", and an unmapped `lodging` kind at a hamlet off any through road renders "… so it is built like any alehouse." | PR, SF3; the hamlet and village clauses PR, VH |
| T-V8-47 | the header's controls and the bridge to the shell (a host-harness check with the transport tap): in an owner's frame and an editor's, each control is offered exactly to the roles its V08 §4.2 row names, and a click on Refresh now, Restore previous map (after its dialog), Make a new map from the record (after its dialog), Reveal to the party and Hide from the party (with a selection of one dossier-bound and one map place), Hide again, Reveal again, the party's base knowledge and Assistant settings posts exactly one `host.action` with that row's `action` and `args` — binding keys for dossier-bound places, addresses otherwise — and nothing else, and the host's handler on `on('action')` runs the row's operation; a cancelled dialog posts nothing; Update the map engine posts its `doc.changed` (an `upgrade`) and no `host.action`, then the client sends `doc.snapshot`; the header carries no Keep-the-saved-town control, and V09 §3.14's load-mismatch keep commits a `rebase` through `doc.changed`, after which the client sends `doc.snapshot`; a frozen view's **Edit it with this version** (V09 §3.14 (b)) likewise commits its `frozenImport` `rebase` through `doc.changed`, after which the client sends `doc.snapshot`, and the frame's `banner` slot carries no frozen-view notice; the `upgrade-available` banner has no button; "See what the players see" posts nothing; a `host.action` whose row the role does not hold, injected by the tap, is dropped and reported; a `clerk.config` sets `ClerkMount.host.config()` and `HostSlots.clerkMode`, a host `preview { proposal }` arrives on `proposals`, and the harness's `needsToken`, `refused` and `answer` post `clerk.needsToken`, `clerk.config.refused` and `clerk.proposal`; `HostSlots.hostName` is `SettlementForge`, the population and tier word are locked with `host.locked`, and `fileMenu` is false; `HostSlots.historyLines` lists a reveal, a hide and a tier change made in this session as one `host.revealed`, `host.hidden` and `host.partyTier` line each with its targets, makes no line for the first `party` after a load, keeps one `host.picturesDrawn` line replaced at each `partyPicturesAt`, and is empty after `switchTo`; `HostSlots.newDocuments` is `'download'`, and Open a copy from here saves a `.plat` to the device and leaves the frame's document unchanged; with "See what the players see" on after a hide, `historyLines.list` called with the party key form returns the `host.hidden` line neither naming nor targeting a place that key omits, and not at all when it named only such places, and `list` called with the frame's key once the view is switched off returns it whole; a place whose binding row is gone is named by its key with no target; a `list` with a key the handler has not read yet returns only the lines that name no place, and `onChange` fires once the reads answer; a commit renaming a place a line names, and an applied tail that raises a named place's knowledge tier above the listed key, each fire `onChange`, and the next `list` names that place by its new name, or not at all; the handler registers no `onEffectiveKey` handler and exactly one `subscribe` on the loaded document — released at `switchTo`, a fresh one registered at the next `doc.load` — and every place read goes through `query`'s `entity` form with `admitAs` the listed key (the transport tap and a facade spy; J-V8.106, J-V8.109, J-V8.110) | PR, SF6 |
| T-V8-48 | the export bundle (V08 §5.4 (2); V08-XCONF-5): from M-SF, `exportBundle(['dd2vtt', 'foundry'])` from an editor's session returns two `Blob`s of type `application/octet-stream` whose bytes equal the frame's own export of those formats at the same key; `knowledge` lowers the key and never raises it (a withheld place absent from both blobs, a byte search); a viewer's call is refused `role`; `[]` returns `[]`; `png` through it and `opts.bundle` in a pre-M-SF build are refused `E_HOST_FORMAT`; a source scan finds no parse of the blobs in `@plat/bridge-client`; no other call returns a structured format (T-V8-27 unchanged) | PR, SF6 |
| T-V8-49 | the adapter's field table (V08 §2.4; W-DOS-01a/b): `AdapterManifest.keyList` equals the table's left column; on every fixture a proxy-wrapped dossier records every property access, and every access lies on a table row — no `ignored` row's path and no field inside a read record that no row names is read; every digest field a row names is filled on the fixture that carries its path; §14's key-list lint passes over the adapter folder | PR, SF3 |
| T-V8-50 | the changes that move nothing at once (W-DOS-02, -07, -08): on `town-1`'s pairs with a test-side prosperity change (`Moderate` → `Prosperous`), the ledger carries one `prosperity` change dated by F9 and the next epoch's `EpochInputs.wealthLevel` is the `wealth` row's 0.8, the field moving only by that epoch (no event at the absorb); a changed terrain word and a rewritten history each write one `frozen_fact_changed` event note in the absorb group, update `carried` and emit no map event, and no later offer repeats the note; a notable's changed `importance` changes no map byte and reorders the projected `people` rows (`pillar` before `key` before `notable` before `minor`) | PR, SF4 |
| T-V8-51 | item 111 on dossiers (V08 §2.6's `site` row, §2.6b (3)): test-side desert mutations of `town-1` — with `oasis_water`; with access `river`; with `deep_harbour`; with a realm cell's coast; with none of them — give an oasis (DR40) beside the water the other words give, a river, a coast, a coast, and the arid row's chances respectively; the no-water desert with a `Toll bridge` record reports `toll_bridge_dry` with the gate toll house (base rungs) and at a hamlet mutation the entry toll house (village rungs); the river desert's toll house stands at the river's bridge on the longest approach; a `plains` mutation with `oasis_water` has its oasis (a supplied oasis) | PR, SF4; the hamlet clause VH |
| T-V8-52 | item 113's reading (V08 §2.6c): on the lit `city-1` pair and test-side mutations — a history with a `great_fire` 40 years ago, a `tierHistory` demotion city → town, a `populationHistory` peak of 26 000, a calamity with deaths and exodus crossing a band, a ruined `City walls and gates` record at a village, a death and resettlement, an opt-in "Fall of" event — `Recipe.history` holds each field with `yearsAgo` on one clock (±1 week), the evidence list in the order of V08 §2.6c (5) naming the tiers stated, no evidence entry at or below the present tier, `peakTier` present suppressing the list, the ancient fall carried once (not in `events`, not in `site.ruinEvidence`); every birth's `history.age` lies inside its tier's `AGE_BY_TIER` range and is carried unclamped; with `history.replay` off the document is byte-identical to one made with the additions absent | PR, SF4 |
| T-V8-53 | SettlementForge's inputs (J121; V08-XCONF-2, -6): the frame's `src` carries `MapHostConfig.locale` and the frame draws that locale's catalogue rows, the source row for a missing key, `en` for a missing file; `backupDepth` 0, 1 and 2 keep exactly that many backups and B10's rungs skip the missing ones; with `quotaBytes` below a record's size the commit lands and `host.status.quota` is shown to the owner; the draft mirror persists across reloads on a same-site origin and lives for the session only on another | PR, SF5 |
| T-V8-54 | the edges (V08 §3.15.1–§3.15.2): each row (a)–(v) forced in the harness takes its stated outcome and rung, with no crash, hang, lost event, silent wrong result or whole-map retry; the general rules' clauses run on every mechanism's fixture — a degenerate placement reported F-SITING and the element placed at its closest option, every absent optional field at its default, every rung from THORP to the METROPOLIS cap (the village rungs with a test `ProductDecl`), every layer toggle and parity preset changing no port event, and save, load, undo, redo, regenerate and migrate after each | nightly, SF7 |
| T-V8-55 | the combinations (V08 §3.15.3): each row (w1)–(z) on a test-side mutation holding both features at their limits takes its stated outcome — a dossier element never placed in the moat band, off a refused cliff plot or outside the frame; a custom record resolved to `generic-other` never underground, on a deck or up an island; a party set naming no unadmitted crypt, raised way, neighbourhood place or island; a dossier removal of a pinned element orphaning and reporting the pin | nightly, SF7 |

### 7.2 The host harness

`plat/tools/hostharness/` is a test-only host (never shipped): a page on one origin mounting `@plat/bridge-client` with an
in-memory `MapStore` that implements the compare-and-set exactly as V08 §2.2 states and stores bytes only — it imports no
decoder and no hash function, so a design that needed the host to compute anything would fail to build — the
module served on a second origin, and a scripted driver that plays audiences (the DM, a co-DM, players through
`mountParty`), dossier versions (the fixture pairs, and test-side mutations of them), time advances, reveals, page
closes and forced failures (a killed worker, a dropped reply, a damaged snapshot, a lost record, an altered event). It runs
headless on the three engines in CI and records each run's events, stored records and model digests for the bars above.
It is the only way the SF stage is tested before SettlementForge wires the tab; SettlementForge's own integration test
(V08 §8.3, row R7) runs the same driver against SettlementForge's store.

### 7.3 Parity metrics

No reference generator embeds a map in a host with a settlement record, so the stage has no reference-parity metric of
§13.5's kind (J-V8.38). The fidelity to SettlementForge is measured instead, over the bridge, against the dossier
itself: T73-1 – T73-7 re-run on documents created through the bridge (they must equal the direct runs byte for byte,
T-V8-3's determinism), the absorb bars T75-1 – T75-5 on the pairs through the bridge, and one count parity — the
institutions SettlementForge's own dossier page lists (its non-housing records) equal the gazetteer's `dossier`-tier
institutions, name for name, on every fixture and after every pair, COUNTED BY STEP TYPE (item 108): a COUNT
record as its placed members, a GUILD record as its hall plus its members (the hall counted once — as a guild COUNT
record's member when the dossier holds one, V08 §3.5.1 (c)), a QUARTER record as its neighbourhood with the
members it owns, a SIZE or REPLACEMENT record as one building, a lesser merged into a greater (`mergedInto`) once, as the
greater's member, never twice; pseudo-class records (`@none`, `@office`, `@seat`, `@layer:*`, `@landuse:*`, `@pin:*`)
by their reader's count, and `@absent:*` records by none. The two known item-110 reach points are measured the same way: every dry-site toll bridge has
its bridge (T-V8-40), and every CITY water record has its conduit house (T-V8-36).

## 8 Build plan

### 8.1 Where it slots into §16

The owner's roadmap stages "SettlementForge inputs" after the generators are mastered (*Staged by the owner's
roadmap*), and the owner's definition orders it last — built standalone, then calibrated against the corpus, then
connected (docs/DEFINITION.md §1). The stage is milestone **M-SF — the SettlementForge stage**, last in J122's combined
order (§16; `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`): after M4, the four streams M5 (V01), the village V-M1–V-M4
(V07), M6-E (V06) and the plan rung's P0, P1 and P3 (V03); then M6 (V02) and M6-U (V04); then M6-P's rest and M6-sky
(V05); then M-CAL (V12); then M-SF, with the village hand-off VH inside it (V08 §11 Q4, decided under J122: M-SF after
M-CAL; J-V8.39; item 529). The port's creation half is built at M1 on frozen dossiers, so a SettlementForge settlement
becomes a map from the first milestone; M-SF adds the live connection. It needs M3a (the API, the bridge, the absorb
half, the dossier contract), M3b (the picture exporters the thumbnails and the party set use), M4 (the incremental path
the catch-up epochs run on, the rung read at each epoch), M6-E (the epochs the port's catch-ups and the history replay
run — V06's E9 reads V08 §2.6c's inputs), V-M4 (the village product VH consults), M-CAL's calibrated tables, and V11's
**C4** — the SettlementForge rows: `dossier.kinds`, archetypes, category synonyms, keywords, good words, ladders, the wall
barrier and waterfront rows, and the history rows (V11 §8's C4, priced there). Without a V11 row an unmapped kind still
stands at its category's generic class, reported — the stage is never blocked by content. Item 110's reach points (V08
§2.6b) and item 111's rows are built before M-SF in this order, so DR34, DR35 and DR40 have their readers when the
live connection lands.

### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **SF0 — spike** (risk retirement) | `embed.html` host mode booting in a frame on a second origin under V08 §3.1's sandbox and both CSPs, on the three engines; the transport's origin and source checks; `hashDossier`; a throwaway store; ONE measurement that could refute the brief — SettlementForge's app CSP and hosting admit a frame on the module's origin with workers (§8.4 risk 1) | T-V8-1 green; boot and load rows of V08 §6 measured at CITY; the CSP answer recorded | 0.75–1 |
| **SF1 — the host client and the store contract** | `@plat/bridge-client` (`MapHost`, `MapSession`, `MapStore`, `MapRecord`, `statusText` generated from V09's rows, the party viewer); the generated message types; the bridge messages, `doc.snapshot`, the `encoded` and head fields, `doc.load.audience` and `ready`'s additions in `@plat/api` (item 472); the host-minted `docId` (item 459); the host harness with its bytes-only store | T-V8-2, T-V8-4 | 1.75–2.25 |
| **SF2 — the port leader** | creation and absorb over the bridge by an editing role; commit through compare-and-set; every editor's verification of applied absorbs; the reserved session `host:port`; coalescing; `unchanged`; the refresh queue in its hidden frame with its lease and the page-memory rule | T-V8-3, T-V8-6, T-V8-7, T-V8-8, T-V8-13 | 2–3 |
| **SF3 — adapters and failure** | `AdapterManifest` with required and optional keys and the adapter's field table (V08 §2.4), `AdapterRegistry` with the selection order, limits, record quarantine and its hold, `E_OTHER_SETTLEMENT`, remaps and line migration (item 508, item 390, item 512); the name grammar, qualifiers and ladder merges (item 108); the held state with its reason; the port notes' `msg`, `keys` and classes, the ledger's `notes` and `notesCleared` and `DossierBinding.notes`, copied into `GenerationReport.dossierNotes` (item 508, item 358, item 390); the `tags`, `categories`, `crime`, `cultures` rows (item 510) | T-V8-9, T-V8-10, T-V8-11, T-V8-15, T-V8-20, T-V8-23, T-V8-31, T-V8-44, T-V8-46, T-V8-49 | 2.25–3.25 |
| **SF4 — the staged records, the values, the g items and custom content** | `dossierFacts` and `dossierRecord` (item 358) with the records' fills and drawing rows and the chains' knowledge rule (item 410); `PortValues` with the latitude and the sea threats (item 389); the realm block helper and the latitude row (item 391, item 396); coverage inside a range (item 392); SettlementForge's chains, dependencies and goods (DR33); the calamities and stressors; the corrected vocabularies (relations, history, conditions, magic, era, materials, isolation); item 109's evidence, drivers and burial trace (DR30–DR32); item 110's inputs (DR34, DR35, the dry-site brook, item 399); the display names in use; custom content's arrival (item 511, item 256, item 394); the diff's `wealth`, `site` and `history` rows and the people order; item 111's desert readings; item 113's history reading (V08 §2.6c) | T-V8-16, T-V8-18, T-V8-21, T-V8-22, T-V8-24, T-V8-25, T-V8-28, T-V8-32 – T-V8-40, T-V8-42, T-V8-43, T-V8-50 – T-V8-52 | 5.25–6.75 |
| **SF5 — persistence in the host and the players' view** | compaction through `doc.snapshot`, backups with `tailAfter`, restore and "make a new map" with fresh loads, thumbnails, the upgrade flow and its compaction; the party picture set, the party gazetteer, `setParty` and the player's tab (V08 §3.14); SettlementForge's inputs — origin, locale, backup depth, quota (J121) | T-V8-5, T-V8-17, T-V8-29, T-V8-41, T-V8-53 | 1.75–2.25 |
| **SF6 — the tab's UX and the host clerk** | host mode's chrome, banners and history panel with item 110's lines (V08 §5.1, §4.6); the words of the notes, held reasons and host lines (V08 §3.9, §4.6, §5.1); the actions of V08 §4.2 with `host.action` and `host.state`; the bridge to the shell (`ClerkMount.host`, `HostSlots`; V08 §3.1 step 7); the host clerk's relay, projection and previews; `setClerk` and `clerkNeedsToken` (V08 §4.4, §5.4); the export bundle (V08 §5.4 (2)) | T-V8-14, T-V8-27, T-V8-45, T-V8-47, T-V8-48 | 1.5–2 |
| **SF7 — hardening and release** | campaign scale; every budget measured; the release checklist; the fixtures re-cut and run through the bridge; the edges of V08 §3.15 | T-V8-12, T-V8-26, T-V8-30, T-V8-54, T-V8-55; T73-1 – T73-7 and T75-1 – T75-5 green through the bridge | 2–2.5 |
| **VH — the village hand-off** (inside M-SF, V-M4 landed) | the port's consultation of `LadderRouter` with V07's registered `ProductDecl` (file f item 202), the band fold at epochs and the desertion route at 0; T-V8-19 on V07's rows as well as the test product | T-V8-19; T-V8-15's village clause; T-V8-46's hamlet clauses; T-V8-18's hamlet clause | 0.5 |
| **total (the map side)** | SF0–SF7 and VH; V11's C4 is priced by V11 | | **17.75–23.5** |
| SettlementForge's side (the owner's program, priced for the owner's plan, not in the total) | the lazy Map tab chunk and its mount; the map-record table with its conditional write and row-level security; `frame-src` for the module's origin; the advance hook that marks `refreshPending` and calls `refresh`; the library entries for `customLibrary`; the assistant's use of `query` and `preview`; the status banner's strings | SettlementForge's own tests plus R7 below | 1.5–2.5 |

### 8.3 The release checklist (run by T-V8-26 before every release of the SettlementForge configuration)

| row | check |
|---|---|
| R1 | every T-V8 bar, T73-1 – T73-10, T75-1 – T75-5, T77-1, T81-2, T85-1 – T85-3 and T88-1 – T88-2 green at the release commit |
| R2 | the adapter set: each registered adapter's `line`, `version` and `commit` equal a fixture manifest's rows; every manifest's `keyList` passes §14's lint; each manifest's `vocabulary` versions equal the `tablePins` of the fixture documents it serves, and a moved pin is reported with the table rows it changes |
| R3 | output-version retention: the release replays every stored fixture document of the two previous output versions exactly (§6.4) |
| R4 | the host client's version and its message types match the module's `protocol`; a client one protocol behind is refused at `ready` with the upgrade notice |
| R5 | the module origin's headers equal V08 §3.1's list (a scripted fetch of each response header) |
| R6 | the budgets of V08 §6 re-measured, any fallback taken reported in the release notes |
| R7 | SettlementForge's integration: the harness driver run against SettlementForge's staging store and tab (the owner's environment) — create, a week, a year, a held dossier, a restore — all bars green |
| R8 | the known-defects file (§14's `@plat/docs`) lists every open defect of this stage with its workaround |
| R9 | a new SettlementForge line (when one ships): its adapter folder, the fixtures re-cut by the same scripts, T-V8-10 and T-V8-11 on the old line's pairs |
| R10 | the clean-room scanner (§17.1 (5)) passes over `@plat/port`, `@plat/bridge-client` and the host mode's code |

### 8.4 Risks, in order

1. **SettlementForge's frame policy.** The stage assumes SettlementForge can host a frame with workers on the
   origin it gives the module (J121), as it already does for its realm map (`research/sf/dossier-seam.md` C-1). SF0
   measures it; **pre-decided fallback:** if no second origin is possible, a `MessagePortTransport` to a module worker on SettlementForge's origin
   without the frame — the worker holds no account data and receives only data messages (§11.3), the protection then
   resting on the bridge's data-only rule alone, reported to the owner.
2. **The store's conditional write.** The commit rule needs a compare-and-set on `logHead`. SettlementForge's store is
   a hosted Postgres (`research/sf/dossier-seam.md` C-6), where a conditional update is one statement; if SettlementForge's storage cannot do it,
   **pre-decided fallback:** a lease — the client takes a 30-s renewable lease on the record before committing, and a
   client without the lease sends its edits as `doc.changed` to the leaseholder's session through the host.
3. **Refresh time at METROPOLIS scale.** A metropolis year can take ≈ 8 s in the queue with its party set (V08 §6). **Fallback:** the queue
   processes the maps the DM opened most recently first, and a METROPOLIS map is refreshed only when opened.
4. **A new SettlementForge line before M-SF lands.** One adapter folder and a fixture re-cut (§14 item 1); the stage's
   bars are line-agnostic, so the plan does not change.
5. **Storage cost at campaign scale.** Up to ≈ 37 MB per METROPOLIS record with two backups and the party set (V08 §6);
   the backup count and the allowance are SettlementForge's (J121). **Fallback:** past the allowance the client drops
   backups first (V08 §3.7), then the party set takes its own fallback (z2 over the built-up area, z3 capped at 32
   tiles).
6. **SettlementForge's assistant cannot call back into the page.** The relay of V08 §4.4 (1) works wherever the
   assistant's loop runs, because the map tools resolve in the DM's page. **Fallback:** if it cannot call back, it
   answers from the dossier alone and proposes nothing on the map; map questions and previews go to the in-frame built-in
   clerk (V08 §4.4 (6)), which needs no new stored artifact.
7. **The condition weeks' reading** (`expiresAtTicks` as a whole length, V08 §3.11). T-V8-18 measures it on the
   one-week, one-season and one-year ticks; **fallback:** the absolute-tick reading as a declared remap (V08 §3.11).

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V8.1 | chose to run the port inside the module's generation worker, beside the document, over running it in SettlementForge's bundle, because the port reads the document's carried facts and emits events the module must dry-run, and SettlementForge's bundle then holds only a 12 KB client (8 KB plus the party viewer) with no knowledge of our model |
| J-V8.2 | chose "only an editing role — the DM or a co-DM — runs the port and commits; the log's single head arbitrates" over electing a port leader, because `digest`, `creation` and `absorb` are pure, so two editors compute the same events and the host's compare-and-set drops the second as `stale` with nothing lost; a player never holds the document or the dossier (J-V8.57) |
| J-V8.3 | chose one map record in its own row beside the settlement, keyed by settlement and map id, over storing the map inside the dossier's data, because the document is about ten times the dossier's size and would ride every save, sync and public projection (`research/sf/dossier-seam.md` C-6) |
| J-V8.4 | chose the host's SHA-256 over the dossier's canonical JSON to decide WHETHER to offer, and the port's fact-level diff to decide WHAT changed, over a host-side fact hash, because the host holds no port and must stay dependency-free, while the port alone knows which keys it reads |
| J-V8.5 | **amended by J121** (V08-XCONF-2; the backup depth is SettlementForge's, J-V8.117). chose snapshot plus event tail with compaction at 256 events or 256 KB and rotating backups over storing only the log or only snapshots, because loads stay at §12.5's law, every event is durable at once, and a damaged snapshot has a known predecessor (V08 §3.9 B10) |
| J-V8.6 | chose the background refresh after an advance to run in ONE hidden frame on the DM's page, serially, pausing on input, over a server-side renderer or parallel frames, because the product has no hosted service (§11.5), one document at a time keeps memory at one rung's line on any campaign size, and `refreshPending` makes it resumable |
| J-V8.7 | chose an `<iframe>` on the module's own origin with `allow-scripts allow-same-origin allow-downloads` over a worker or script on SettlementForge's origin, because it is SettlementForge's own pattern for its realm map (`research/sf/dossier-seam.md` C-1) and no module code then runs beside accounts or payments |
| J-V8.8 | chose to quarantine a malformed record and absorb the rest over refusing the whole dossier, because one bad record must not freeze a campaign's map, and the record keeps its last carried state and is retried at every offer |
| J-V8.9 | chose the selection order `HostContext.line` → the document's bound line → the single accepting adapter → at a creation, the newest accepting line, recorded and noted `line_defaulted` — with `E_LINE_UNSUPPORTED` only when none accepts — over refusing whenever two adapters accept, because a bound map must stay on its line until a declared migration moves it, and a declared, reported default is no silent guess, while a refusal whenever two adapters accept would hold every map the moment a second line was registered |
| J-V8.10 | chose a declared re-baseline (`remaps`, no map event) for an adapter's own version change over treating every re-read field as a dossier change, because a change in our reading is not a change in the settlement, and T-V8-10 enforces the declaration |
| J-V8.11 | chose declared `fromLines` key migrations with a hold when absent over re-creating the map on a line change, because the players' map must survive SettlementForge's own upgrades, and an undeclared migration would re-bind by guess |
| J-V8.12 | chose one document, one seed and one history across the village and town products over a new map at the 1 500 boundary, because the owner's continuity rule (item 22) makes a settlement's map follow its history, and §4.11's rung change already carries a crossing; the product at each epoch is V07 §2.1's fold with its hand-off band (`handoff.band`), so a population hovering at 1 500 never flips the product (item 322), and the port registers nothing — it consults `LadderRouter` over V07's `ProductDecl` (file f item 202) |
| J-V8.13 | chose a host-minted document id (`MapRecord.mapId`) over the module minting one per creation, because two clients creating one map at once then produce byte-identical documents (T-V8-3) |
| J-V8.14 | chose one `dossierFacts` ledger event per absorb, carrying every change's before and after, over storing the dossier block only in snapshots, because the block must rebuild from the log alone (§2.9) and the report reads it |
| J-V8.15 | chose one `dossierRecord` event kind for every staged record (conditions, deposits, relations, persons, custom chains and services) over one kind per record, because they share authorship, addressing, fold and lifecycle rules, and one kind keeps §7.4's dossier rule in one place |
| J-V8.16 | chose to carry crime, food import, food chains and legitimacy on the circumstance slice (`PortValues`) over `editTable` events on `PortRows`, because a table edit re-derives from its first reader stage — the reshuffle item 22 forbids — while an epoch's slice moves them at the cadence |
| J-V8.17 | chose to round severities to 1/1 000, standings to 1/10 000 and percentages to 1/100 in the digest over carrying raw floats, because floating noise in a host's arithmetic must never read as a change (T-V8-6) |
| J-V8.18 | chose that this volume owns the SHAPES and lookup chains of `kinds`, `archetypes`, `categorySynonyms` and `keywords` while volume V11 writes their rows beside each class's siting profile, over writing the kind rows here (280 at the pinned line, read from `dossier.catalogue`), because the rows are siting content that must agree with V11's profiles row by row |
| J-V8.19 | chose a SettlementForge-tag → family table in `tables/dossier/tags` over reading tags directly in the solver, because the host's words stay inside the port's tables (§14's lint), and item 103 (a)'s default-profile-by-tag needs a stable family vocabulary |
| J-V8.20 | chose to let coverage (item 103 (f)) weigh the count INSIDE a collective record's range and decide where its members go, over letting it change the range, because the range is a dossier fact and the count inside it a map fact |
| J-V8.21 | chose that SettlementForge's assistant acts only inside a user's session with that user's role and key over a role of its own, because a player's assistant must never read what the party does not know, and §11.2 already gives every clerk its viewer's key: an editor's assistant acts inside that user's frame session with the user's role and key; a player's assistant has no session, frame or document (J-V8.57) and reads only the stored party gazetteer, made under the party key (V08 §3.14, §4.4 (1)) |
| J-V8.22 | chose that the players' pictures keep the stored output version's drawing until the DM upgrades over re-rendering them under each release, because an upgrade can move things (§7.5's diff) and the DM decides when the table sees it; players see pictures, not a live map |
| J-V8.23 | chose at most one offer in flight per session, a newer dossier replacing a queued one, over queueing every version, because the port diffs carried facts against the newest dossier and dates changes from its receipts, so skipped versions lose nothing SettlementForge's own end state keeps |
| J-V8.24 | chose to paint the stored thumbnail at once and swap in the live map over a spinner, because the tab then shows the town within 50 ms whatever the frame's boot costs |
| J-V8.25 | chose that every epoch of a catch-up reads the NEW digest's slices over interpolating them, because SettlementForge keeps no interior history of trade, economy or powers (`research/sf/mapping-verify.md` V52, V56); interpolating would invent facts |
| J-V8.26 | chose each culture's centre of gravity, rounded, as its latitude (`cultures`) over one latitude for all, because item 102's daylight share should differ between a northern and a southern setting when the host gives no realm latitude; the values are not calibratable (a table fix, J-V8.107) |
| J-V8.27 | chose to compute the realm block host-side in a pure client helper (`realmBlockFrom`) from the campaign's placements, the realm map's scale and latitude scale and the campaign's spatial digest over sending raw placements to the module, because the realm map is the host's and §7.7 item 1 lets the module carry only the spatial digest's words: the module receives bearings, distances, cell words and a latitude, nothing else of campaign state (item 396) |
| J-V8.28 | chose that the host computes display names with its own public filter over the module re-implementing that filter, because the filter is SettlementForge's product rule and the module must never hold it (item 85 (b)) |
| J-V8.29 | chose that the module takes the LOWER of the role it is told and the role of the audience word over trusting either alone, because a client bug in one of the two must never raise a player's rights |
| J-V8.30 | chose to reuse one frame across a campaign's settlements (`switchTo`) over a frame per settlement, because boot is then paid once per page and only one document is live |
| J-V8.31 | chose the author's library fields as an OPTIONAL `HostContext.customLibrary` admitted only when its definition, revision and content hash equal the dossier's, and carried in the document, over asking SettlementForge to add them to the dossier, because the map never asks (item 20 (h) (iv)), the dossier stays the truth, and replay must never need the host |
| J-V8.32 | chose to reduce a custom description to keyword keys inside the adapter over carrying the description, because §7.7 item 1 admits no prose beyond the description seed, and the keywords are item 104's weakest signal anyway |
| J-V8.33 | chose the dossier's own activation verdict for custom chains over recomputing "all nodes present" in the port, because the verdict is SettlementForge's rule on SettlementForge's facts — recomputing it could disagree with the dossier |
| J-V8.34 | chose that a realm latitude arriving after creation enters at the next epoch as a `port-values` change, moving the town only by item 102 (e)'s drift, over freezing the creation latitude, because SettlementForge usually places a settlement on its realm after generating it (`research/sf/dossier-seam.md` §4, C-9), so a frozen culture latitude would stay wrong, while re-deriving at once would shift every plot's daylight share together — the reshuffle item 22 forbids; the DM may still `adjust` it |
| J-V8.35 | chose that SettlementForge draws only the container, the thumbnail and a status banner over drawing map chrome of its own, because the map's UI then ships and versions with the module, and a dead frame still shows a readable state |
| J-V8.36 | chose pictures only (`png`, `svg`, `print`) through the host client over every export format, because anything else carries geometry into SettlementForge's code (door 1, J86); files are the user's, from the frame's export menu |
| J-V8.37 | **amended by J-V8.116** (J122, V08 §11 Q3). chose to close door 1 structurally for every STRUCTURED format — no decoder in the client, no call returning a structured format as data, pictures through the client, every clerk answer and the party gazetteer projected to words — and to state that the host stores the document as an opaque artifact and holds pictures, over claiming that nothing geometric reaches the host, because the `.plat` bytes and the SVG paths do rest with the host and the ruling J86 plus the owner's audience table accept pictures |
| J-V8.38 | chose dossier fidelity through the bridge (T73, T75, the institution count parity) as the stage's parity measure over a reference-parity metric, because no reference generator embeds a map in a host with a settlement record |
| J-V8.39 | chose milestone M-SF last, directly after V12's M-CAL, in J122's combined order (V08 §8.1), over running it beside M5 and M6, because the owner's definition orders the connection after the calibration and V12 places M-CAL after the standalone generators; V08 §11 Q4 is decided under J122 (M-SF after M-CAL) |
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
| J-V8.50 | chose never to produce the `raider` sea-threat key from a dossier over mapping a nearby word to it, because the line has no raid or piracy word (CONFIRMED over its fifteen stressor types and the archetypes seen); `raider` stays a standalone and pack key |
| J-V8.51 | chose not to make an ancient founding a ruin-evidence row over reading great age as evidence, because V04 already compares `history.ageYears` with its own `ancientYears` through `HistoryHint`; one reader, one constant |
| J-V8.52 | chose to keep power-relation keys unordered and to read no relation as directed over a directed key `relation:<from>><to>`, because the line's pair order is not a direction (CONFIRMED: of `city-1`'s four `subordinate` pairs, three name the superior first and one last), so a directed reading would invert a quarter of them; a later line that stamps a direction adds it through a declared `remaps` entry |
| J-V8.53 | chose that a churchyard stays a burial face while its church plot keeps the churchyard part, the church ruined or not, closing only when the plot is cleared and re-used, over closing it with the church, because the burial ground outlives its church in historical practice and item 109 (k) never lets a catacomb shrink |
| J-V8.54 | chose never to undo a calamity that leaves SettlementForge's capped history list over reading its absence as a removal, because a calamity happened and cannot un-happen; the list is capped for size, not revised |
| J-V8.55 | chose to cite §4.11's cadence — an epoch at each calendar year end (week mod 52 = 0) and one at each ± 5 % population crossing inside the span, dated from `populationHistory`, plus one at each new calamity's week — over a drifting year and a single population epoch, because the cadence is the base's and a restatement with a variation is a second truth |
| J-V8.56 | chose to give stressors one path, a `stress:<type>` condition overlay read by the epoch's readers, over also adding an `EpochInputs.events` entry, because two paths would count one stressor twice |
| J-V8.57 | chose to give players a stored party picture set (a PNG pyramid, a building-band level only over the places they know, the city-band SVG) and a stored party gazetteer, never the document, a dossier or a session, over a live frame filtered by their key, because §11.1 *Knowledge* forbids sending the document to a client a place is secret from, item 85 (a) forbids the seed leaving the host, and SettlementForge's player view is player-safe by construction; a live shared map is decided under J122 — after M-SF, not in this stage (V08 §11 Q5) |
| J-V8.58 | chose to record what the party knows on the map record (`MapRecord.party`, written by `setParty`, one-step "Hide again") over per-session view state, and to replace SettlementForge's retired area fog consciously by place-by-place knowledge, because a reveal must reach every player, every later picture and the gazetteer, and the base's knowledge model is by place (§9.2); area fog would need the live shared map J122 places after M-SF |
| J-V8.59 | chose one reserved session, `host:port`, constant and group-less, for every event the port emits over the committing editor's session, because byte identity across editors (T-V8-3) and every user's undo stack (V09) depend on the port's events belonging to no user (item 359) |
| J-V8.60 | chose recognition by a REQUIRED key set plus a declared optional list, any other top-level key accepted and dropped with a note, over an exact key count, because lived dossiers carry 41 to 47 keys and a later line may add more; refusing an extra key would hold every advanced campaign map |
| J-V8.61 | chose a dedicated editing-role message `doc.snapshot` for creation, compaction, upgrade and rebase, exempt from `E_HOST_FORMAT`, over asking for a `.plat` export, because storage is not an export and the export refusal must stay absolute for hosts |
| J-V8.62 | chose to leave the calamity-to-hazard mapping in volume V06's calamity table (DR28) and to carry only the `CalamityRef` — with its deaths for V04's burial growth — over a second mapping table in this volume, because two tables would disagree; V06 owns the reader, this volume the inputs |
| J-V8.63 | chose to date a condition from its ticks — `sinceWeek = W − elapsedTicks`, `untilWeek = W + expiresAtTicks − elapsedTicks` — measured by T-V8-18 with the absolute-tick reading as its declared remap, over leaving conditions undated, because the line's statuses carry no weeks and a condition must end at its week on the map |
| J-V8.64 | chose that every editing client holding the dossier re-runs an applied absorb and REPORTS a mismatch, never blocking the fold, over trusting any editor's result or requiring a second signature, because the log's order is the truth, §11.3 already reports a fates mismatch this way, and a block would let one faulty client freeze the map |
| J-V8.65 | chose, for a toll bridge on a site with no watercourse, a brook added at CREATION across the longest approach's through route (the site row's river chance set to 1 for the smallest class), over dropping the bridge, raising an undeclared way at a TOWN or inventing water later, because a brook is the realistic reason for a toll bridge, needs no raised way (item 110 (b) forbids one undeclared at TOWN) and touches §5.3's deck invariant not at all; a record arriving by a later absorb never re-draws the terrain (item 22), so its toll house takes an existing crossing or the gate, noted (item 399) |
| J-V8.66 | chose that nothing item 110 generates is dossier-bound — its provenance naming the records that fed its reason — so the DM's removal is the base's delete of generated content and never lapses, over binding a raised way to its water record, because binding it would turn the DM's delete into a `rejectSite`, which lapses at the next epoch or scoped dossier event, and the arches would return within a year against the owner's "a user can decide to add or remove" (item 260) |
| J-V8.67 | chose that a dossier-bound conduit house makes item 110 (b)'s water need count as met at CITY and METROPOLIS, the chance, cap and source-in-reach rules unchanged, and that the RUNG, never the tier word, gates the reason, over scaling the aqueduct chance by the city water record, because that record is required at chance 1 on every SettlementForge city (7 of 7) and would be one constant, and SettlementForge's lower cities are our TOWNs, where item 110 allows arches only by declaration |
| J-V8.68 | chose that a custom record resolved to the `water-supply` family counts as a water system at CITY and METROPOLIS but never declares arches at TOWN, over treating a custom water record as a declaration, because a declaration is the DM's act on the map, not an author's library entry |
| J-V8.69 | chose never to make a hot spring an aqueduct source over allowing it, because a hot or mineral spring gives a bath-house and mineral water, not a drinking supply |
| J-V8.70 | chose to define item 110 (b)'s "dossier landmarks on high ground" as the dossier-bound institutions of class significance at least the castle's and the custom `landmark` records, read at their S3 reservations, over SettlementForge's `quarters[].landmarks[]` strings, because the strings are street, yard, pin and institution names (none a high-ground landmark) and reading them would count an institution twice; the threshold is V11 §3.24.2's calibratable setting `elevated.landmarkMinSignificance`, beside the `landmarkFactor` it gates, since a map rule's constant belongs in V11's settings, not in this volume or a dossier row set (J-V8.107) |
| J-V8.71 | chose to keep the era `c14` for every culture and to carry the CULTURE to item 110's aqueduct chance and stepped specialisations, over inventing an era from the culture, because the line has no era field and the culture is its only preset input; which cultures build in tiers is V11's content |
| J-V8.72 | chose not to read SettlementForge's world-state works ledger over deriving a raised way from its infrastructure count, because the ledger names no structure, lives outside the dossier, and the port reads only the dossier and `HostContext` |
| J-V8.73 | chose to resolve SettlementForge's assistant's map tools in the DM's page — the page executing `query` and `preview` and returning the answer the module already projected (V08 §5.4 (3)), a headless session when no map is open — over a server-side map session, because the product has no hosted map service (§11.5) and the page already holds the session and the key; wherever the assistant's loop runs, the relay is the same |
| J-V8.74 | chose that the refresh frame never starts beside a visible CITY or METROPOLIS document over letting two large documents share the DM's page, because two METROPOLIS documents would exceed any reasonable page budget (§12.8: 260 MB each); the queue waits for the tab to close or a TOWN to be visible |
| J-V8.75 | chose the compaction precondition "the snapshot's head is the record's head or lies in its tail", keeping the tail's suffix, and keeping the removed segment on `backups[0]` as `tailAfter` until the next compaction, over a compare-and-set on the head alone, because an actively edited map must still compact and B10's second rung must be exact |
| J-V8.76 | chose to re-bind a notable after a reroll by equal name and role over only through `replacedNpc`, because a reroll renumbers the ids and `research/sf/PLAN.md`'s J-M11 re-binds by name and role; any other vanished notable is retired |
| J-V8.77 | chose to re-render the party set after each committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after a reveal, keeping the newer of two concurrent sets by the integer pair (last seq, party revision), over rendering on every commit or only on demand, because rendering costs up to 3 s at METROPOLIS and players must see reveals at once |
| J-V8.78 | chose one source for the tab's banner and caption texts — volume V09's `host.*` catalogue rows, generated into the client's `statusText` defaults at build time — over a second copy in the client, because two copies drift |
| J-V8.79 | chose, when a quarantined record's key cannot be formed, to hold every carried institution key absent from the new digest (no `remove`, one `quarantine_hold` note) until a readable dossier arrives, over removing the absent keys, because an unreadable record might be any of them and a wrong removal would close a standing building |
| J-V8.80 | chose to make the `changeIds` trim part of the fold of each `dossierFacts` event over trimming at save, because the dossier block must rebuild from the log equal to the stored block at every seq (§2.9's load check) |
| J-V8.81 | chose to keep V11's ladder rows marked `inferred` where SettlementForge's ladder file lacks the pair but the dossiers list both forms (two church ranges, two cathedral records), over dropping them to match the file, because item 108 (c) must merge whatever the dossier lists; the file's other pairs are V11 §3.12's rows, re-checked by release row R2 |
| J-V8.82 | chose to resolve a chain processor, dependency institution or calamity target by exact name, then by kind family (count range and qualifiers removed, plural folded), else to keep it by name and note it unjoined, over fuzzy matching or creating a building, because the dossier is the truth of what exists and a fuzzy join would bind the wrong record |
| J-V8.83 | chose to bind a GUILD record's hall into a guild COUNT record by the GUILD record's `categories` family — `craft` to `craft_guilds_*`, `trade` to `merchant_guilds_*`, members `#1…#m` in dossier order, the COUNT's placed count at least m — over binding every guild into whichever guild COUNT record is present, because a carriers' or cartographers' guild is no craft guild's member unless the dossier's own category says so, and the dossier's category is the one fact that sorts them (V11 §3.12) |
| J-V8.84 | chose to project every `preview` reply a host receives (dropping `shape` and `actions[].at`) as well as every `query.result`, and to refuse `hit` and `inView` with `E_HOST_KIND` as `measure` is, over projecting query results only and leaving the view-bound kinds unanswered, because a preview reply carries a polygon that would cross door 1 (J86), and a named refusal is the only answer a host can act on |
| J-V8.85 | chose that a population of 0 at an absorb of a BASE-product document reaches V07's desertion through V07 §2.1's fold (0 lies below the band's lower edge), over holding a town whose record reports no inhabitants, because SettlementForge's end of a settlement (§7.7 row F20) is an outcome the map must show, and the fold is the one path from a town to the village product |
| J-V8.86 | chose one host → PLAT push, `host.state` (the party key, the backups' heads, the pictures' time, the players'-view switch), kept in the session's memory, over `view.set` — which writes view state and would re-create a knowledge-key mechanism V09 does not keep (J-V9.46) — and over routing the frame's toggle through `host.action` and back, because the frame's controls need facts only the host's record holds, the host computes nothing it stores, and a view filter needs no round trip |
| J-V8.87 | chose "See what the players see" as a display filter — the frame's `ViewOpts.viewAs` set to the party key in item 572's key form — over setting the view's knowledge key, because V09 decided a lowered view is a filter (J-V9.46) so the document formats, `doc.snapshot`, compaction and saves stay the role's, and one capability must have one mechanism |
| J-V8.88 | **amended by J-V8.94**. chose to carry every page-side header action as one enumerated PLAT → host push, `host.action`, with the host running V08 §4.2's row through its existing calls, over giving the frame calls into the host's store or settings or drawing the controls on SettlementForge's side, because the frame holds no account or store access (§11.3), SettlementForge draws three things only (J-V8.35), and one enumerated push is testable (T-V8-47); "Update the map engine" stays in the frame because its event is the document's, and "Assistant settings" opens SettlementForge's own settings because the host holds the proxy, the token and the cap |
| J-V8.89 | chose one banner for the players' view — this volume's strip "Showing what the players see" in `HostSlots.banner`, V09 §4.8's View-as banner not drawn while the host's party key is set — over drawing both, because two lines saying the same thing crowd a narrow frame and the strip names the DM's own check; V09's half is V09 §4.8's "A host's players' view" (J-V9.85) |
| J-V8.90 | chose the embed's bridge handler as the one filler of `ClerkMount.host` and `HostSlots` (V08 §3.1 step 7), with `hostName` a deployment constant of the SettlementForge build and `historyFilter` left unset, over a bridge field for the host's name and a history filter for the co-DM, because V09 gives the harness and the shell one channel (J-V9.81), the host's name is fixed per deployment, and both frames that exist hold `secret` |
| J-V8.91 | chose to make the party picture set cross the bridge as one request and one reply — the client's `party.render { party, since? }` and the module's `party.rendered { set }` or `unchanged` — with the module resolving the party key, drawing the pictures under it as `knowledge` and listing the gazetteer under it as `admitAs`, over the client assembling the set from `exportPicture` and `query` calls, because only the module can resolve binding keys to the addresses a key form holds (item 572's places are ids), only the facade lowers a query (`admitAs`; the bridge's `query { q }` carries none), the set is one value the store takes whole (T-V8-2 requires it to arrive in a message), and the client already holds every trigger — its commits, `setParty`, the open-time check and the refresh loop; the `drawDigest` test keeps an edit that changes nothing drawn from costing a store write |
| J-V8.92 | chose key forms with empty places — `{ tier: 'public', places: [] }`, `{ tier: 'local', places: [] }` — for the host's own public and local pictures over a bare tier, because item 572 reads a bare tier with the requester key's places, and a DM's session key may carry places a gallery picture must never admit; a key form is a key in its own right |
| J-V8.93 | chose to fill `HostSlots.historyLines` from the differences of successive `host.state` values in the handler's memory — reveals, hides and a tier change, and one replaced "pictures last drawn" line — over a stored reveal history or new `host.state` fields, because the record keeps only `party.prev` (J-V8.58), a line is no log event and the handler already holds the values; and `newDocuments: 'download'`, over `'off'`, because the owner's "everything editable" keeps a past state reachable, `.plat` is already the user's format in host mode (V08 §5.4 (2)) and a copy is detached (V06 §4.4) |
| J-V8.94 | chose one control for the load-mismatch keep — V09 §3.14's choice at load — and no button in the tab's `upgrade-available` banner, over a header control for the keep and a banner button focusing a frame dialog, because one event has one control, and no host → PLAT message or `MapSession` call reaches a dialog inside the frame while SettlementForge draws no map control (J-V8.35) |
| J-V8.95 | chose to derive, at the port, a land use that a record's hard `near` row requires and no listed deposit opens — a `DepositSite` under `res:derived:<landuse>`, one per land use, kept `depleted` when no record needs it, never removed, and left standing beside a deposit listed later — over letting the class take the base's closest option (a salt works with no pans) or asking the DM, because the dossier's record is a fact the map must honour and every gap is derived by our rules (item 20 (h)); a custom record opens none, since its class is decided at fold after the port's events are written (V08 §3.5 (5) (f)), and the DM may paint the land use |
| J-V8.96 | chose to name, in V08 §5.1's host-mode differences, Settings without its Storage section beside the four file operations, over listing the file operations alone, because the list says "exactly these points" and T-V9-28's allowlist reads it, and `fileMenu: false` has both effects (no local store in host mode, V09 §3.8 (6)); and to cite V09 §3.9's new-document rule and V09 §4.10's drawing of the host's lines instead of restating them, over keeping this volume's shorter copies, because a copy with a shorter action list drifts from its source |
| J-V8.97 | chose to count V10's scratch line (item 481) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal, under configurations A and B, with page bars of 161, 231 and 421 MB derived from V08 §3.4's page rule (the refresh frame never runs beside a visible CITY or METROPOLIS), over a 266 MB CITY bar and a count under configuration B only, because that case (a visible CITY beside a refresh) cannot occur under §3.4, and host mode's `builtin` without a transport is configuration A (V10 §3.17's selection), whose clerk opens the same scratch in the frame; configuration C and the refresh frame open none |
| J-V8.98 | chose to keep the port's notes by class — `event` notes in the ledger event of the run that wrote them, `standing` notes in it only when new (with the identities a run clears) and as a list in `DossierBinding.notes`, `report` notes never in the document — over storing every run's whole note list in each ledger event or keeping notes only in the transient `dossier.result`, because the history panel of every editing frame and of every later load must draw an absorb's notes from the log (only the port leader's frame sees the result), while a lived dossier's standing notes would otherwise repeat in every weekly event and grow the log |
| J-V8.99 | chose to give every note, held reason and host line a catalogue key with args — `PortNote.msg` as item 463's `MsgRef`, `MapRecord.held.reason`, `module.status.detail` as a key — and to write their words once, in V08 §3.9, §4.6 and §5.1, with a raised way's history lines left to V06's chronicle and V10's `info.raised.*` rows, over quoting sentences in the text for a panel to compose, because V09 §4.9 renders only catalogue rows, T-V9-15 fails on a code without one, and three wordings of one line is the drift a single source prevents |
| J-V8.100 | chose to name five note kinds — `name_unjoined`, `name_ambiguous`, `custom_unkeyed`, `count_over_range`, `not_placed` — where the text said "noted" without a kind, and to route every row set's "else …, noted" to `unmapped_word`, over leaving those notes unkinded, because a note without a kind has no row, no class and no test |
| J-V8.101 | chose to make `custom_resolved` and `low_confidence` `event` notes written only for the custom records a run adds or revises, over standing notes re-written at every absorb, because the live resolution changes with the DM's declarations between absorbs and is the why card's (V10's `WhyAnswer.profile`, V09 §2.7's `chips`); a stored standing copy would go stale |
| J-V8.102 | chose to keep `ignored_key` and `realm_block_used` in the host's report only, over drawing them in the history panel, because they recur at every offer of a lived dossier and name nothing that changed on the map |
| J-V8.103 | chose to hide a custom chain whole — its line, arrowheads, legend row, gazetteer row and every export feature — when the key withholds any joined node, over listing it as a `withheld: true` row or drawing it with the withheld node's end cut off, because a chain is a relation whose drawn route shows where each node stands and what it makes (the purpose §11.2 withholds), a withheld row would still let V09 §5.4 offer the view, and V09's T-V9-68 already expects the entry absent |
| J-V8.104 | chose to carry the standing notes to the report panel on `GenerationReport.dossierNotes` — a copy of `DossierBinding.notes` made by every derivation's report build (item 390) — over a new `query` kind or a new V08 request, because the panel already reads `report(h)`, the report is a derived cache every frame rebuilds (so a second editor's frame and a reload show the list without a read of their own), and the notes change only with the log |
| J-V8.105 | chose to admit a chain's nodes as a band-less reader does — each by §9.2's table as at the city band — for the drawing as well as for the gazetteer and the exports, and to read the export's whole knowledge key rather than the export's tier alone, over admitting at the band drawn and by tier alone, because a chain spans the town and would appear and vanish with zoom if admitted at the band drawn, a place a key form lists is admitted by its places (§9.2's last column), and §11.1 takes the requester's key, of which the tier is one part |
| J-V8.106 | chose to make the party lines' `{places}` and `targets` under the view's effective key — a line left with no admitted place not listed — over the frame's key, because V09 §4.8 has every panel read as the players would while "See what the players see" or View as is on, and a `host.hidden` line names places the party no longer knows: the key is the one the shell passes to `HostSlots.historyLines.list` (its `effectiveKey()`), each place read by `query`'s `entity` form with `admitAs` that key (item 583, item 572), a `withheld` place neither named nor targeted and a `null` one named by its key with no target; the handler keeps no key subscription (V09 §2.2), since `effectiveKey` and `onEffectiveKey` are `ClerkMount`'s members, never handed to it, and the shell re-lists on `onEffectiveKey`; its one `subscribe` on the document reads head moves for its answer cache only (J-V8.110) |
| J-V8.107 | chose `calibratable: false` on every cell of the dossier row sets V08 §2.6 writes (`cultures`, `crime`, `relations`, `calamitySeverity`, `threats`' population and the new `customWeights` among them), a value changing only as a table fix reviewed with V11, over calibratable cells, because a row set maps SettlementForge's vocabulary — the port's derivation rules (item 20 (h)) — not a measured quantity: §13.9 (7) never re-signs them, V11 §3.1 carries rows 63–66 and 77 `calibratable: false` (J-V11.65; T-V11-37), and V12's R4 never calibrates them, so a source written by the old header would fail the lint and ask V12's register for entries it must refuse. The item-110 threshold of DR35, a map rule's constant rather than a vocabulary row, moves to V11's calibratable `elevated.landmarkMinSignificance` (J-V8.70) |
| J-V8.108 | chose a dossier row set `customWeights` for the custom definition's `economicWeight` and `criticality` words, read by V08 §3.11's custom kinds, over keeping the two mappings as numbers in §3.11's prose, because a constant with no table is a hard-coded universal (item 23) that no loader holds and no totality test reaches, and the words are the host's vocabulary like `dependencySeverity`'s, so they take the same row-set home and the same non-calibratable flag |
| J-V8.109 | chose a per-key answer cache in the embed's bridge handler for the party lines — a `list` with an unread key returning only the lines that name no place, the reads started and `onChange` fired when they answer — over an asynchronous `list` or a second, synchronous read path into the document, because V09 §2.2's slot returns its lines at once, §11.2's `query` answers by promise and is the one admitted read, and holding back a line until its reads answer never names, even for one frame, a place the new key withholds |
| J-V8.110 | chose to read the head move that empties the party lines' answer cache from the handler's one `subscribe(h, …)` on the frame's document (§11.2's `doc.changed` `ApiEvent`), registered at each `doc.load` and released at `close` and `switchTo`, over a head-move callback added to V09 §2.2's slot or a fresh `subscribe` per `list` call, because `subscribe` is the facade's change feed that volume V10's staleness watch already reads for a moved `logHead` (V10 §3.11), V09 §2.2 forbids the provider only a key subscription, a slot callback would widen V09's interface for one reader, and with no head read a renamed or newly withheld place keeps its old answer |
| J-V8.111 | chose to bind a REPLACEMENT lesser that is a pin record — `parish_church` over `wayside_shrine` — to the pin V11 §3.12's row keeps (the churchyard `cross`, laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records` at an epoch or an absorb) and to alias it on the church building only at a base rung where no such cross is laid, the target chosen where the merge is first read — the creation, or the absorb or epoch that brings the pair, the church arriving beside the standing shrine or by promotion (V08 §3.5.1 (c), (d)) — and kept across a later rung change, over one alias rule for every REPLACEMENT lesser or a re-binding at each rung change, because V11 §3.12 and V07 §2.4 keep the shrine as a thing on the map at village rungs, a key with two targets is a contradiction a builder meets, and a binding that moved at every hand-off would emit `rebind` events no dossier change caused |
| J-V8.112 | chose to write every `unmapped_kind` note after the fold, its `class` the class that builds the record at the document's rung — at a village rung V07 §3.11's village class or the pin kind a cell names — over filling it at digest from DR24's generic class, because a note that names a class the map did not build tells the DM something false, the note is read by no model rule so the later write changes no event, and `custom_resolved` already follows this order (J-V8.101) |
| J-V8.113 | chose to re-bind a placed lesser as the greater's members only where the greater's thing is the lesser's — every COUNT, QUARTER, GUILD and SIZE step and the REPLACEMENT rows whose V11 §3.12 reading keeps it (`graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`, `mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, and `cathedral_10_000_only` over `parish_church`) — and to place every other REPLACEMENT greater new, the lesser's key bound as at a first reading (an alias on the fish market's hall, the churchyard `cross` or the church, the enceinte the fortification path yields), over the generic re-key for every pair that arrives over time, because a roadside pin cannot become a parish church, V07 places an added fish market's hall on the market's rim so a re-keyed shop would give one key two things, and a key left on a palisade the new ring superseded binds the ring left to decay; the cathedral row is included because V11's reading is "the lesser absorbed" and V06 §3.9.11 converts the church in place carrying its crypt, and QUARTER is named with COUNT, GUILD and SIZE because a quarter's members are the lesser's buildings; `ladder_promoted`'s words now hold for both readings (V08 §3.5.1 (c), §3.5, §4.6, T-V8-44, T-V8-46) |
| J-V8.114 | chose, for a promotion by receipt to a REPLACEMENT greater of a new thing — one record whose key the line keeps (F15) — to re-point the record's one binding row to the greater placed new and to lay a pin the row keeps (the churchyard `cross`, at a village rung) for the record with no binding row of its own, the lesser's former thing left standing unbound, over binding the key to the cross or to both the cross and the church, because one key binds one thing (J-V8.111) and a parish church record bound to a cross would send the church's later state — a ruin, a closure, a **Show** — to the cross; where two keys meet (the church added beside a kept shrine, or the shrine leaving the list as the church arrives) the shrine's key binds the cross as at a first reading (V08 §3.5.1 (d), T-V8-46) |
| J-V8.115 | chose V11's class `label` cell (item 516) for the words a note's `class` argument shows, and a pin kind's `host.pinKind.<kind>` row (V08 §4.6), over "the display label (§9.5)", because §9.5 holds the title and the legend but no class words, a pin kind has no class row, and V07's `market` fallback builds the reservation of V11's `market` class, whose label is the word to show (V08 §4.6, §1b, T-V8-46) |
| J-V8.116 | chose, for the export bundle (V08 §11 Q3, decided under J122: yes, from M-SF), one client call `exportBundle` carried as `export.request { opts: { bundle: true } }` for the two scene formats of §11.1, answered as opaque `Blob`s SettlementForge packages unread, over a new message pair or opening `exportPicture` to scene formats, because the base's `export.request` already carries `knowledge` and the key rules, one exception to `E_HOST_FORMAT` is testable (T-V8-48), and door 1 stays closed — the blobs are packaging for the user's download, never input to SettlementForge's simulator (J86) |
| J-V8.117 | chose to read every SettlementForge product decision the module needs — the module origin, the interface language, the backup depth and the storage allowance — as `MapHostConfig` inputs (J121; V08 §11 Q1, Q2), a commit past the allowance still landing with an owner notice, over fixing any of them in the design or refusing a commit, because the map is a SettlementForge module and its log must never be lost to a size rule |
| J-V8.118 | chose to carry the interface language in the frame's `src` (`#p=2&lang=…`) over a `doc.load` field, because the frame needs its words before any document loads (the boot's `module.status` and the thumbnail's notes) and the base's message stays unchanged; English is the catalogue's source language, never a product default (J121) |
| J-V8.119 | chose to carry the prosperity word on the settlement fact and apply its change at the next epoch as `EpochInputs.wealthLevel` (F9), over re-deriving DR6's field at the absorb, because the field moves by item 102 (e)'s drift and a jump would reshuffle every plot's band (item 22) (W-DOS-02) |
| J-V8.120 | chose to carry the site words and the generated past as frozen facts — a change reported by one `frozen_fact_changed` event note that points to "Make a new map from the record", no map event — over re-drawing the terrain or re-running the replay on an absorb, because the site and the history are creation's (§7.7 *One path*; V06 §3.20.8) and a silent skip would hide a DM's rewrite (W-DOS-08) |
| J-V8.121 | chose to read a notable's `importance` as the order of the host projection's `people` rows (the host clerk's answers and the party gazetteer) over dropping it from the digest, because the pillars and key figures are who a DM and players ask about first, and the field is the dossier's own ranking (W-DOS-07) |
| J-V8.122 | chose one adapter field table per line — every SettlementForge path, the digest field it fills and its reader, or its ignore reason — as the list `keyList`, T-V8-20's proxy and the lint read, over a key list maintained beside the code, because §7.7 item 1's closed-digest rule needs one list, and a path the table does not name is then provably unread (W-DOS-01b) |
| J-V8.123 | chose to read a desert dossier's other water words (a river or port access, a realm cell's river or coast, the water deposits) at chance 1 and `oasis_water` as an oasis beside them, the arid row's chances deciding only where the dossier says nothing, over treating a desert as dry unless it lists oasis water, because item 111 keeps every water setting in dry country and the dossier's words are facts (item 20) |
| J-V8.124 | chose to add the replay's inputs to `HistoryHint` under SettlementForge's own names (`peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle) on one clock of years ago, over passing the raw lists to V06, because V06 then reads one shape for a dossier and a blueprint alike and the port alone knows how to date SettlementForge's ticks and outcome ids (item 113) |
| J-V8.125 | chose to list the effective peak's evidence strongest first with the tier each fact shows, the peak's tier the highest listed, and to carry the ancient "Fall of" event once, as the ancient cause (never in `events`, never item-109 ruin evidence), over a single strongest fact or counting the fall twice, because item 113 (f) names the evidence order and a lesser but stronger fact must not hide a higher tier the record plainly shows (a ruined city wall), and the fall is this place's own former settlement (item 113 (b), (c)) |
| J-V8.126 | chose to read `history.age` as given, never clamped to or redrawn from its tier's `AGE_BY_TIER` range, over clamping, because the dossier is the truth and a DM may have set an age the generator would not draw |
| J-V8.127 | chose one toll-bridge rule at V08 §2.6b (3) with a column per rung range and the union of both volumes' failure conditions at every rung, over V08's and V07's two rules (E-31), because one watercourse question has one home and each failure — a dry desert, relief that cannot carry the brook, a fixed isolated or none access — is as real at a village as at a town |
| J-V8.128 | chose to define every edge of this volume's mechanisms on §5.1's ladder through the placing stage's own failure class — the port creating no geometry of its own — over edge rules of the port's own, because a dossier element's placement is S10b's and F-SITING already never drops it (§7.7 item 2) (V08 §3.15) |

## 10 Base change requests

Every request this volume made is applied to the base by file f (`docs/AMENDMENTS-2026-09-28f.md`); the base text is the
home and this volume cites it. Each row: the request, the applied item, the base section it lands in.

| request | subject | applied as | base section |
|---|---|---|---|
| BCR-V8-1 | the bridge's vocabulary for the port | item 472 | §11.3 |
| BCR-V8-2 | a host-minted document id and the creation prefix at `generate` | item 459 | §11.2 |
| BCR-V8-3 | the host client package and the embed entry | item 507 | §14 |
| BCR-V8-4 | the adapter manifest, the registry and the port's new results | item 508 | §14 |
| BCR-V8-5 | the digest's additions | item 509 | §14 |
| BCR-V8-6 | the two host-only event kinds | item 358 | §7.1 |
| BCR-V8-7 | per-settlement values on the circumstance slice | item 389 | §7.7 |
| BCR-V8-8 | the binding's additions | item 390 | §7.7 |
| BCR-V8-9 | the village product's port path — withdrawn: the village product's one registration, `ProductDecl` in `StrategyRegistry.products`, serves it | item 202 | §1.1 |
| BCR-V8-10 | the row sets written out | item 510 | §14 |
| BCR-V8-11 | the latitude row (g item 102) | item 391 | §7.7 |
| BCR-V8-12 | coverage inside a collective range (g item 103 (f)) | item 392 | §7.7 |
| BCR-V8-13 | custom content's inputs (g item 104) | item 511 | §14 |
| BCR-V8-14 | custom chains and services as staged records, and their keys (g item 104) | item 256 | §2.7 |
| BCR-V8-15 | drawing rows and export attributes for the records | item 410 | §8.2 |
| BCR-V8-16 | the stage's budgets | item 480 | §12.6 |
| BCR-V8-17 | the stage's bars in the suites | item 486 | §13.2 |
| BCR-V8-18 | the stage in the build plan | item 529 | §16 |
| BCR-V8-19 | the port's reserved session | item 359 | §7.1 |
| BCR-V8-20 | the change and receipt vocabularies for the port's own kinds | item 393 | §7.7 |
| BCR-V8-21 | a custom assignment's revision | item 394 | §7.7 |
| BCR-V8-22 | the creation prefix's staged records read ahead | item 395 | §7.7 |
| BCR-V8-23 | one spelling of the line id | item 512 | §14 |
| BCR-V8-24 | the realm block computed by the host glue | item 396 | §7.7 |
| BCR-V8-25 | the institution's own political role in DR12 | item 397 | §7.7 |
| BCR-V8-26 | the power relation's sign and visibility | item 257 | §2.7 |
| BCR-V8-27 | the player's row of the audience table | item 513 | §14 |
| BCR-V8-28 | an aqueduct's link to its conduit house | item 244 | §2.7 |
| BCR-V8-29 | the custom kinds derived at read time | item 425 | §10.2 |
| BCR-V8-30 | the port's derivation rows (DR28–DR35) | item 398 | §7.7 |
| BCR-V8-31 | generated content no dossier record binds | item 260 | §2.8 |
| BCR-V8-32 | a toll bridge on a dry site | item 399 | §7.7 |

The additions this volume makes to base records and unions are stated where they are typed — §14's `PortNote` kind
`frozen_fact_changed` and the receipt row F-V8-8 (V08 §2.4, §3.6 (1)), `HistoryHint`'s replay inputs and the digest's
history block (V08 §2.6c), the export bundle's use of `export.request` (V08 §5.4 (2)) — each cited by the base section it
extends.

## 11 Owner questions — every one answered

| # | question | decision | carried in |
|---|---|---|---|
| Q1 | the module's web origin | follows SettlementForge (J121): `MapHostConfig.moduleOrigin` is SettlementForge's input | V08 §2.2, §3.1, §3.7 (the draft mirror) |
| Q2 | plans, save limits, backups | follows SettlementForge (J121): `MapHostConfig.backupDepth` and `.quotaBytes` are its inputs; which plans get the tab and whether a record counts against a save limit are SettlementForge's | V08 §2.1, §2.2, §3.7, §6, §8.4 risk 5 |
| Q3 | scene files inside SettlementForge's export bundle | J122: yes, from M-SF (opaque bytes, V08-XCONF-5); until then maps export on their own | V08 §5.4 (2), T-V8-48, J-V8.116 |
| Q4 | M-SF after M-CAL | J122: yes | V08 §8.1, J-V8.39 |
| Q5 | a live party map | J122: pictures and player views now; a live shared map after M-SF, not in this stage | V08 §1, §3.14 (6), J-V8.57 |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed evidence).** The SettlementForge facts this volume builds on are CONFIRMED by the surveys
(`research/sf/*.md`, verified in `mapping-verify.md`) and by the fixtures generated on the pinned line
`fp/integration-2026-09-23` at `5d699cc68` (the 35 births, the 12 after-tick dossiers, `town-cc-1` with the reference
custom pack), read-only: the 41 required and 7 optional top-level keys and the 41–47 of a lived dossier; the dossier's
sizes, the settlement id's form, the institution record's shape, the absence of institution ids and the anchor
precedence; the line's relation types and trends, history event types, condition statuses and stressor types;
`magicLevel` `medium` on 32 of 35 births; the six material words and fourteen qualifier words; the ladder file at
`5d699cc68`; the burial census; the relation pair order not a direction; the lit `city-1` storm's deaths; the water
records per tier and the eleven toll bridges; the custom institution's fields, `customContentProvenance`,
`economicState.customChains` with its activation verdict, `config.nearbyResourceDefinitions` and the custom service's
provider name; the history's `AGE_BY_TIER`, event types, lifecycle and high-water law with its documented gap (item
113's reading); the realm map's frame on its own origin with origin and source checks; SettlementForge's player view
built player-safe by construction. Every base section, file f and g item and sibling-volume section cited was read at its
current text.

**PLAUSIBLE (reasoning; the bar or milestone that settles each).**

| claim | settled by |
|---|---|
| every budget of V08 §6, the refresh queue's campaign time and the party set's render and storage rows | SF0 and SF7's measurements (T-V8-30, T-V8-41), each row's fallback pre-decided |
| the storage figures beyond §2.9's own budget | T-V8-30 |
| the estimates of V08 §8 | the milestone records (§13.3) |
| SettlementForge's hosting admits a frame with workers on the module's origin; its store can compare-and-set on `logHead` | SF0 (risk 1's fallback); risk 2's fallback |
| the dossier row sets' own values — the `cultures` latitudes, the `crime` weights, the relation strengths, the `customWeights` mappings, the `threats` and `calamitySeverity` bands | table fixes reviewed with V11 (not calibratable, J-V8.107); T-V8-18, T-V8-22, T-V8-42, T-V8-43 |
| scene tokens appear on custom records when the author sets them; SettlementForge lists only active custom chains | T-V8-25 (the retire-and-re-put rule holds either way) |
| `expiresAtTicks` is a condition's whole length | T-V8-18 (its declared remap otherwise, V08 §3.11) |
| the kind-family resolution's gain over exact names | T-V8-34 measures and reports it; no fuzzy matching whatever it shows (J-V8.82) |
| a lived dossier's standing notes stay at a few dozen once V11's `kinds` rows are total | T-V8-14 on the pairs; more changes nothing in the design (their ledger cost is paid only when they change) |
| the `drawDigest` test answers most debounced edit bursts `unchanged` | T-V8-41 (the render budget holds either way) |
| §11.2's `doc.changed` event fires for an applied tail as for a local commit | T-V8-47's head-move clause |
| the item-110 mechanisms of V08 §2.6b — the need-met rule, the terminal binding, the cap step, the fate link, the significance threshold and the dry-site brook | T-V8-36 – T-V8-40 |
| the path of the opt-in ancient-ruin marker and the outcome-id dating of `tierHistory` | T-V8-52 on test-side mutations (the fixtures carry no opt-in ruins) |

## 13 Fix list

Empty: every fix-list item and every hand-off routed here is closed in the text.

