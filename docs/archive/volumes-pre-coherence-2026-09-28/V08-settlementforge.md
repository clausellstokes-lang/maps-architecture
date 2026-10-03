# Design volume 8 — The SettlementForge stage: connecting the map to the host end to end

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V8-settlementforge; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V8; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r6; covered by the whole-design retrovalidation (J84).

> Revision note (2026-09-28/29, lane volumes/revise-V8). Revised in place against `docs/volumes/critique/V08.md` (49
> findings: 4 blockers, 23 majors, 22 minors — C8-01 – C8-40 with C8-02 as switched for the owner's ~20:05 ruling J111,
> "switch it then, cathedral also gets crypts but cemetaries get catacombs", and the item-110 addendum C8-41 – C8-49 under
> the owner's ~23:30 "they go in" and ~23:40 raised-ways revision). Players now receive stored pictures of the town as the party
> knows it, never the map file or the record (C8-01); item 109's sources, the burial and crypt trace, item 105 (i)'s
> chains, item 106 (d)'s sea threats, item 108's ladders, the calamities and the corrected vocabularies are in; the host's
> store is filled from what the messages carry (C8-04); item 110's dossier inputs are traced (DR-V8.7, DR-V8.8), and what
> item 110 generates is never dossier-bound, so the DM's removal holds (C8-41 – C8-49). The disposition of every finding is appended to the critique;
> what the revision deliberately leaves, and the hand-offs to sibling volumes, are V08 §13.

PROGRESS (one line per section: planned | done)
- 0 In plain words: done
- 1 Scope and base hooks: done
- 1b Wiring table: done
- 2 Data model: done
- 3 Generation (the port pipeline): done
- 4 Editing: done
- bundle (file g items 102, 103, 104 folded into 1, 1b, 2.5–2.8, 3.5, 3.13): done
- 5 Rendering, labels, exports: done
- 6 Performance budgets: done
- 7 Tests and acceptance bars: done
- 8 Build plan: done
- 9 Decisions: done
- 10 Base change requests: done
- 11 Owner questions: done
- 12 CONFIRMED versus PLAUSIBLE: done
- 13 Fix list: done (filled by the revision)
- REVISION (lane volumes/revise-V8, against critique/V08.md):
  - R1 §0, §1, §1b (C8-01, C8-02 (9), C8-06 – C8-11 wiring): done
  - R2 §2.1 – §2.5, §2.7, §2.8 (C8-01, C8-03, C8-04, C8-06, C8-07, C8-10, C8-12 – C8-17, C8-19, C8-21, C8-22, C8-30, C8-34): done
  - R3 §2.6 row sets and §2.6a the item-109 trace (C8-02, C8-07, C8-08, C8-10, C8-11, C8-22, C8-33): done
  - R4 §3 generation (C8-01, C8-02, C8-03, C8-05 – C8-13, C8-15, C8-18, C8-19, C8-21, C8-23, C8-25, C8-27 – C8-31, C8-35, C8-37, C8-39): done (§3.1 – §3.11 by the first run; §3.12 and the new §3.14 by the continuing run)
  - R4b item 110 (critique §9's addendum, C8-41 – C8-49): done (§1, §1b, §2.6, the new §2.6b, §2.7, §4, §7, §9, §10)
  - R5 §4, §5 (C8-01, C8-05, C8-14, C8-20, C8-36, C8-40, C8-42, C8-47): done
  - R6 §6, §7, §8 (C8-23, C8-24, C8-26, bars for every fix): done
  - R7 §9 – §12 (decisions, BCRs, Q5, evidence): done
  - R8 §13 fix list and hand-offs: done
  - R9 disposition table appended to critique/V08.md: done (§10 of the critique)
- RECONCILIATION round 1 (lane volumes/reconcile-V08-r1, 18 seam issues of critique/seam-surfaces-r0.md and
  critique/seam-settlements-r0.md): done (the note "Reconciliation round 1" at the end of this file)
- RECONCILIATION round 2 (lane volumes/reconcile-V08-r2, 6 seam issues of critique/seam-surfaces-r1.md SR-03 – SR-05 and
  critique/seam-settlements-r1.md SR1-26 – SR1-28): done (the note "Reconciliation round 2" at the end of this file)
- RECONCILIATION round 3 (lane volumes/reconcile-V08-r3, 7 seam issues of critique/seam-surfaces-r2.md SR2-03, SR2-04,
  SR2-06, SR2-07, SR2-09, SR2-16 and critique/seam-settlements-r2.md SR2-04): done (the note "Reconciliation round 3" at
  the end of this file)
- RECONCILIATION round 4 (lane volumes/reconcile-V08-r4, 1 seam issue of critique/seam-surfaces-r3.md SR3-06): done (the
  note "Reconciliation round 4" at the end of this file)
- RECONCILIATION round 1, continuation (lane volumes/reconcile-V08-r1 re-run with the six findings of
  critique/seam-surfaces-r0.md §5 owned here — SS-38, SS-39, SS-42, SS-43, SS-44, SS-45; the thirteen seam-settlements-r0
  issues of its first run verified in place): done (the note "Reconciliation round 1 — continuation" at the end of this
  file)
- RECONCILIATION round 2, continuation (lane volumes/reconcile-V08-r2 re-run with SR-23, SR-24, SR-25 of
  critique/seam-surfaces-r1.md §7, its continuation of 09:15; SR1-26 – SR1-28 of its first run verified in place): done
  (the note "Reconciliation round 2 — continuation" at the end of this file)
- RECONCILIATION round 3, continuation (lane volumes/reconcile-V08-r3 re-run with SR2-24 of
  critique/seam-surfaces-r2.md §9, its continuation of 10:02, and SCC-R2C-1 of critique/seam-content-calibration-r2.md
  §7.2, its continuation of 10:12; SR2-04 (DR19) of seam-settlements-r2 of its first run verified in place): done (the
  note "Reconciliation round 3 — continuation" at the end of this file)
- RECONCILIATION round 4, continuation (lane volumes/reconcile-V08-r4 re-run with SR3-13 of critique/seam-surfaces-r3.md
  §9, its continuation of 11:06, and SCC-R3C-11 of critique/seam-content-calibration-r3.md §6.2, its continuation of
  11:18; SR3-06 of its first run not in this brief): done (the note "Reconciliation round 4 — continuation" at the end
  of this file)
- RECONCILIATION round 5 (lane volumes/reconcile-V08-r5, 4 seam issues: SR4-06, SR4-07, SR4-12 of
  critique/seam-settlements-r4.md and SR4-06 of critique/seam-surfaces-r4.md): done (the note "Reconciliation round 5"
  at the end of this file)
- RECONCILIATION round 6 (lane volumes/reconcile-V08-r6, 4 seam issues of critique/seam-settlements-r5.md: SR5-01
  (major), SR5-06, SR5-07, SR5-08): done (the note "Reconciliation round 6" at the end of this file)

Conventions. "The base" is `docs/ARCHITECTURE.md` with amendments c, d and e folded in (their closing pass has landed) and
file g's items 102 – 110 as the coherence pass applies them; a section sign (§) points into the base, "V08 §" into this
volume. SettlementForge (SF) field names and values are quoted freely — the owner's own project (amendments d, gate 2);
no SettlementForge code is excerpted and nothing from its map programs or map designs is used. Base change requests are
BCR-V8-n (§10 here); decisions J-V8.n (§9 here); bars T-V8-n (§7 here).

## 0 In plain words

**What this stage does.** SettlementForge gets a Map tab on every settlement's page. The first time anyone with the
game master's rights opens it, the map is drawn from the settlement's dossier: every institution the dossier lists
stands somewhere sensible, the population fills the right number of houses, the walls, gates, harbour and quarters
match what the dossier says, and everything the dossier does not say — every street, plot and house — is worked out by
the map's own rules from the same seed. The map never writes anything back into the dossier.

**When SettlementForge changes.** A DM event, a decree, a week, a season or a year of simulation all produce a new
dossier. The map does not re-draw the town: it compares the new dossier with the facts it already carries, works out
what changed (a tannery closed, a cathedral was ruined by a storm, the population fell by a fifth), reads the week of
each change from the dossier's own receipts, and changes the existing town as little as it can — the layout players
know stays, and only what must move moves. The map's history panel says what moved and why, in SettlementForge's own
words ("bankrupt", "destroyed by disaster"). After the DM advances time, the maps of the campaign's settlements catch up
one by one in the background; a map opened before its turn catches up at once.

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
any word SettlementForge veils on public pages veiled in the picture too. SettlementForge's AI assistant can read the map,
answer "where is the tannery and why is it there", and propose changes, which appear as ghosts the DM accepts or drops;
a player's assistant reads only the party's list of known places.

**Where it lives.** The map program runs in its own frame on its own web address, as SettlementForge's realm map
already does, so none of its code runs beside SettlementForge's accounts or payments. Each map is stored by
SettlementForge next to its settlement — never inside the dossier — as a saved file plus the list of changes since it
was saved, with two older copies kept as backups.

**When something goes wrong.** An unreadable dossier, a SettlementForge version the map does not know yet, or a
settlement that has shrunk below the town floor never breaks the map: it shows the last good town with a plain note
("This map is held as it was. The settlement's record could not be read."), loses nothing, and catches up as soon as a
readable dossier arrives. A settlement under 1 500 people waits for the village product, which will plug into the same
doorway; when it exists, a town that shrinks into a village, or a village that grows into a town, keeps one map.

**How it feels.** Click the Map tab: the saved picture appears at once, the live map replaces it within about a second
for a town and two for a large city, and the history panel shows any changes it just caught up with. A player's tab
opens the party's pictures at once and pans and zooms them; before the DM has first opened the map it says so. Nothing
ever asks the DM to fill in a form; nothing in SettlementForge has to change to make a map.

## 1 Scope, the base hooks consumed, and what is out of scope

**In scope — the base's staged SettlementForge row (*Staged by the owner's roadmap*, "SettlementForge inputs") brought
to build depth.** The base already builds the port's creation half (M1), its absorb half (M3a), the dossier contract
(§7.7 items 1–16), the bridge (§11.3) and the fixtures (§13.2). This volume designs everything the staged part needs so
that a live SettlementForge drives a map end to end:

1. **The embed** — the Map tab's lazy chunk on SettlementForge's side (a mount and our host client), the module's frame
   on its own origin, its boot, its workers, first paint from a stored thumbnail, and reuse of one frame across the
   settlements of a campaign (V08 §3.1).
2. **The dossier's journey** — how a whole dossier crosses the bridge (`dossier.offer`), who runs `creation` and
   `absorb` and who commits the result (the port leader: only an editing role ever holds the dossier or the document),
   coalescing of dossier versions, and the background refresh after an advance (V08 §3.2–§3.4). **The players' view** —
   the stored party picture set and the party gazetteer, re-rendered after committed changes and reveals, and the party's
   knowledge recorded on the map record (V08 §3.14; C8-01, C8-14).
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
   `ProductDecl`, file f item 202), and one document across the 1 500 boundary (V08 §3.10).
8. **The staged records and values filled** (item 88) — `ConditionOverlay` (the conditions and the normalised
   stressors), `DepositSite`, `PowerRelation`, `HistoryHint`, the dossier-backed `Person`, and the per-settlement values
   the staged rows read (crime, food import, legitimacy, the site latitude, the sea threats); the calamities carried into
   the epochs for volume V06's hazard phase; the realm block's supply (item 77); the audience table and display names in
   use (item 85) (V08 §3.6, §3.11).
9. **The host clerk** — SettlementForge's AI assistant as a client of the tool API (configuration C), and the host side
   of V10's configurations B and C — `setClerk` with the transport and its renewal, the proposal channel and the
   projection (V08 §2.2, §4.4, §5.4 (3); SS-38 of seam-surfaces-r0's continuation).
10. **Campaign scale** — many settlements: storage, memory, the refresh queue and its budgets (V08 §3.4, §6).
11. **Testing and release** — the host harness, the fixture pairs through the bridge, the end-to-end bars and the
    release checklist (V08 §7, §8.3).
12. **The bundled owner rules of file g, where they reach this subject** — item 102's latitude for the model-side sun
    from the dossier or the realm block, and the bar that sunlight never pushes a dossier map outside its wealth row;
    item 103's SettlementForge tags as default siting profiles (the vocabulary boundary and the lookup chain), the
    institution's own political role (`priorityCategory`) as the first input of its power association, and coverage
    inside a collective record's count range (V08 §2.6, §3.5, BCR-V8-11, BCR-V8-12).
13. **Custom content, the host side (item 104; owner, 2026-09-28 ~17:50 and ~18:00)** — a custom institution's record as
    the dossier carries it (its local uid, definition revision and content hash, free-text category, tags, the optional
    scene tokens), its description reduced to keyword keys inside the adapter, the ACTIVE custom chains of the dossier
    with their resource, processors, outputs and trade endpoints, custom resources and custom services with their
    provider, and the author's library fields as OPTIONAL host inputs (`HostContext.customLibrary`), admitted only when
    their revision matches the dossier's and recorded in the document, so that no replay needs the host (V08 §2.8,
    §3.13; BCR-V8-13, BCR-V8-14). The resolution rows (the 17 scene-archetype profiles, the category and tag deltas, the
    keyword table, the fallback) and the chain-placement rules are volume V11's; the solver that reads them is the
    base's (§4.7 S10b).
14. **The port side of file g's items 105 – 109** — SettlementForge's own supply chains, their dependencies and goods
    lists as the supply web's input (item 105 (i); DR-V8.5); the sea threats DR2's waterfront reads (item 106 (d)); the
    institution ladders — the name grammar, the qualifiers, the ladder data re-checked at the pinned commit, no double
    counting, steps over time (item 108); and item 109's dossier sources — the ruin's existence evidence, the cavern
    drivers, and the trace of every burial, church, cathedral and monastery record to the volumes that build catacombs
    and crypts, with the closures and tier changes that must never shrink or orphan them (DR-V8.2 – DR-V8.4; V08 §2.6a,
    §3.5.1).
15. **The port side of file g's item 110** (owner ~23:30, "they go in", and ~23:40's raised-ways revision) — the dossier
    facts that feed item 110 (b)'s generated raised ways: the water system and its demand records to the aqueduct reason
    (DR-V8.7), the high-ground landmarks to the elevated road's (DR-V8.8), the culture to the aqueduct's chance and to the
    stepped specialisations of item 110 (c); a toll bridge on a dry site (BCR-V8-32); and the rule that nothing item 110
    generates is dossier-bound, so the DM's removal holds through every absorb (V08 §2.6b, §4.1, §4.3, §4.6).

**Base hooks consumed (cited, never restated).** §7.7 layer 2 (the typed slices) and the dossier contract items 1–16,
with the derivation table (DR1–DR25), the key law, the receipt rows (F1–F22) and the status rows; §11.2 (`PlatApi`, the
clerk's tool API, *Knowledge*); §11.3 (transport, envelope, vocabulary, convergence, version handshake, roles, bridged load
verification, logging); §11.4 (the doors; the port's refusals; door 1 closed, J86); §14 (`@plat/port`: `DossierPort`,
`PortResult`, `PortNote`, `HostContext`, `RealmBlock`, `DossierDigest`, `DossierInstitution`, `PortReport`, the audience
table, the dossier row sets, the lint over adapter key lists, the dependency rule); §2.9 (`Document`, the dossier block,
load steps 1–5, size budget, canonical form, view state); §2.7 (the staged records); §10.2 (`PortRows`); §4.11 (the clock,
the cadence, the rung at an epoch, *Dossier content across epochs*); §6.2–§6.4 (digests, addresses, version axes,
retention); §7.1 (`EditBase`, `DossierRef`, `EditEvent`), §7.4 (lifecycles), §7.5 (migration); §5.2–§5.4 (F-EDIT,
F-SITING, the report); §8.2 (the conditions' thematic rows); §9.5 (the title word); §12.5–§12.8 (first map, edits,
replay, memory); §13.2 (B-DOSSIER-lite, T20-*, T73-*, T75-*, T77-1, T81-*, T85-*, T88-*), §13.8 (CI tiers); §16 (the
milestone rows); PART III (the village page); §17.1 (3) (paths); §4.11's `EpochInputs.events` (the calamities); §9.2 (the
knowledge key the party pictures are drawn under); and file g's base mechanisms as the coherence pass applies them —
item 102's daylight share, item 103's profiles, item 104's resolution, item 105's supply web, item 106's wall closure
and waterfront, item 107's balance, item 108's ladder steps, item 109's systems — cited by item, never restated.

**Out of scope, with where each lives.** SettlementForge's own code — its tab, its storage tables, its server — is
SettlementForge's; this volume states the contract it implements (the host client's API and the map record) and ships
the client. Door 1 — any geometry for SettlementForge's simulator — stays closed (J86; §11.4). The village product's
generation is volume V07's; this volume designs only the port side of its hand-off. The built-in clerk itself is volume
V10's; this volume builds SettlementForge's own clerk (configuration C) and the host side of V10's configurations B and C —
`setClerk` with the transport and its renewal (the same call selects configuration A, which needs nothing more from the
host), the proposal channel and the projection (V08 §2.2, §4.4, §5.4 (3)). The siting rulebook's content — every
class's and every catalogue kind's profile, and the per-kind rows of `tables/dossier/kinds` — is volume V11's; this volume
owns the vocabulary boundary and the lookup chain. The shade-map view is volume V09's. Reconciliation with
SettlementForge's own map program and SettlementForge's plan-artifact seam are the owner's, parked (J-Fsf-1). What the
map builds from the facts this volume carries is its readers': the ruin, cavern and catacomb systems, their access and
growth are volume V04's; the crypts volume V03's (with V02's basements); the calamity-to-hazard table and every epoch
behaviour volume V06's; the chain-status weights, the waterfront threat weights, the ladder step table and the
goods, era and material rows volume V11's. A live, explorable map for players (a "party copy" of the document) is not
built: owner question Q5. SettlementForge's world-state works ledger — its per-settlement counts of completed
infrastructure, import and emigration works — is not read, and a raised way is never derived from it (J-V8.72): it names
no structure, it lives outside the dossier, and the port reads only the dossier and `HostContext`. Item 110's terraces,
retaining walls, raised ways, stepped massing and deck plots are the base's and volumes V01, V02, V03, V04, V06 and V11's;
this volume carries only their dossier inputs (V08 §2.6b).

## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into. Base records are cited.

| piece (V08 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| embed entry `embed.html` of `@plat/app` (3.1) | the host's frame `src`; the module's static host | boots `@plat/api`'s workers; sends `ready`, `module.status` | §11.2 worker boundary, §11.3 transport; BCR-V8-3 |
| `@plat/bridge-client` (2.2, 3.1) | SettlementForge's lazy Map-tab chunk | the frame's `WindowPostMessageTransport`; the host's map-record store | §11.3; BCR-V8-3 |
| `MapRecord` (2.1) | the host, through the client's `onCommit`, `onSnapshot`, `onThumbnail` callbacks (3.7) | `doc.load` + `doc.apply` at open (3.1); the refresh queue (3.4); the offer decision (3.2) | §2.9 (the document it stores), §11.3 "the host is the store" |
| `dossier.offer` / `dossier.result` messages (2.2) | the client (offer); the port leader (result) | `DossierPort.digest`, `creation`, `absorb` (3.3); the host's append and fan-out | §11.3 vocabulary, §11.4 door 1 and door 2; BCR-V8-1 |
| `module.status` message (2.2) | the embed's glue at each phase (3.1, 3.9) | the host's banner and fallback (5.1) | §11.3; BCR-V8-1 |
| export `displayNames`, lowered `knowledge?: Admission` (2.2; BCR-V10-22's type, which is BCR-V9-14's union; SR2-06) | the client's `exportPicture` (3.7's thumbnails, 3.11, 5.3) | §11.1's exporters, admitting what both the requester's key and it admit | §11.1 *Knowledge*, *Display names*; BCR-V8-1, BCR-V9-14 |
| host-minted `docId` (2.1) | the host at first creation (`MapRecord.mapId`) | `generate`'s document id, so every client's creation is identical (3.3) | §2.9 `docId`, §11.2 `generate`; BCR-V8-2 |
| port leader (3.3) | the role from `doc.load` (with its `audience`) and the audience table | commit: `dossier.result` events; an editing client that folds them re-runs `absorb` and reports a mismatch (C8-37) | §11.3 roles, convergence; §14 audience table |
| refresh queue (3.4) | the host after an advance (`refreshPending`) | a headless frame running offer → absorb → snapshot per map | §12.8 memory; §2.9 load |
| `DossierBinding.adapter`, `.quarantined`, `absorbed` retention (2.3) | `creation` and `absorb` (3.5, 3.6) | the next absorb's diff and remaps (3.5, 3.8); §5.3's binding check; the report | §7.7 item 12, §2.9 dossier block; BCR-V8-8 |
| `CarriedFact` shapes and `DiffRule`s (2.3, 3.5) | `digest` | `absorb`'s change list; `factHash`; F22's convergence | §7.7 items 1, 12, 13 |
| `AdapterManifest`, `AdapterRegistry` (2.4) | each `adapters/sf/<line>/` folder | `digest`'s adapter choice (3.8); the lint's key list | §14 port, lint; BCR-V8-4 |
| `E_OTHER_SETTLEMENT`, new `PortNote` kinds (2.4) | `absorb`, `digest` | `dossier.result`, the held state (3.9), the report; their words (V08 §4.6's tables) | §14 `PortResult`, `PortNote`; BCR-V8-4 |
| digest additions: `role`, `security`, `government.legitimacy`, `site.culture`'s latitude (2.5) | the adapter | DR12 (role), `PortValues` (crime, legitimacy), DR-V8.1 (latitude) | §14 `DossierDigest`; BCR-V8-5 |
| `dossierRecord` event (2.5) | `creation` prefix and `absorb` (3.11) | `ConditionOverlay`, `DepositSite`, `PowerRelation`, dossier-backed `Person` records | §2.7 staged records, §7.1; BCR-V8-6 |
| `PortValues` on `CircumstanceSlice.port` (2.5) | `creation` (the creation slice) and the cadence's epochs (3.6) | the readers of `PortRows.crime`, `.hinterland`, `.legitimacy` (§4.6, §4.9, II.7.3, II.7.5, §4.5 (6)) | §7.7 layer 2, §10.2; BCR-V8-7 |
| `HistoryHint` fill (3.11) | `creation` from `history` | `Recipe.history` → S2's stage count, II.7.6 | §2.9 `Recipe.history` |
| dossier row sets written out (2.6) | this volume's defaults, `@plat/tables` | `digest` and `creation` through the derivation rows | §14 `tables/dossier/*`; BCR-V8-10 |
| `tables/dossier/tags`, `categories`, `crime`, `cultures` (2.6) | this volume | the siting-profile lookup (item 103, V11's rows), DR24's fallback, `PortValues.crime`, DR-V8.1 | BCR-V8-10, BCR-V8-11 |
| DR-V8.1 latitude row (3.5) | realm block's `cell.latDeg`, `tables/dossier/cultures` | `Intent.latitudeDeg` at creation, `PortValues.latitudeDeg` at a later epoch → item 102's model-side sampler (V05's text), V06's drift, V07's village sweeps | §7.7 item 10; BCR-V8-11 citing g 102 |
| coverage inside a collective range (3.5) | item 103 (f)'s coverage row | DR9's count draw | §7.7 DR9; BCR-V8-12 citing g 103 (f) |
| realm-block helper `realmBlockFrom` (3.11) | the host's campaign placements (the settlement's and its partners' positions), the realm map's scale and latitude scale, the campaign's spatial digest — nothing else of campaign state | `HostContext.realm` → trade bearings, north first, latitude | §14 `RealmBlock`; item 77; BCR-V8-24 |
| the port's consultation of `LadderRouter` (3.10) | the village product's `ProductDecl` in `StrategyRegistry.products` (V07 §2.1; BCR-V7-11) | `creation` (the product and rung) and every `absorb` (whether the population lies in a registered range; the product at an epoch by V07 §2.1's fold; 0 routed to V07's desertion) | §1.1 `LadderRouter`, §4.11, PART III; file f item 202 (BCR-V8-9 withdrawn; SS-28) |
| upgrade offer in the host (3.8) | `ready`'s output versions vs `MapRecord.snapshot.outputVersion` | the owner's upgrade dialog → `upgrade` event (§7.5) | §6.4 retention, §11.3 handshake |
| the host clerk (4.4) | SettlementForge's assistant, its map tools resolved in the DM's page (the relay) | `query`, `preview`, accepted `doc.changed` with `proposedBy: 'clerk'`; a player's assistant: the stored party gazetteer | §11.2 clerk tool API |
| `MapSession.setClerk`, `preview`'s `proposal`, `on('clerkNeedsToken')`, `on('clerkProposal')`, `on('clerkConfigRefused')` (2.2; SS-02, SS-03) | the host page (volume V10's `clerk.config` choice; SettlementForge's assistant's proposals, V08 §4.4 (3)) | the embed's bridge handler → `ClerkMount.host` (V9 §2.10): `clerk.config` to `config`/`onConfig` and `HostSlots.clerkMode`, `preview { proposal }` to `proposals`; the harness's `needsToken`, `refused` and `answer` posted back as `clerk.needsToken`, `clerk.config.refused` and `clerk.proposal` (V08 §3.1 step 7 (a); V10 §3.17; SR-03) | BCR-V10-7 (V10's) |
| `DossierInstitution.custom` with `keywords` (2.8) | the adapter, from the dossier's custom instance and `customContentProvenance` | item 104 (a)'s resolution at fold, its inputs (2)–(4), (6) (V11 §3.13.1's rungs; V08 §3.5 (5) (f), SS-12); DR10 | §14 `DossierInstitution`; BCR-V8-13 |
| `DossierDigest.customChains`, `.customResources`, `.customServices` (2.8) | the adapter, from `economicState.customChains`, `config.nearbyResourceDefinitions`, `availableServices.*` | `creation` and `absorb` → `dossierRecord` puts (3.13) | §14 `DossierDigest`; BCR-V8-13 |
| `CustomChainRecord`, `CustomServiceRecord` (2.8) | `dossierRecord` events (3.13) | S10b's chain pulls and flow order (item 104 (b), (h); V11's rules); §10.3's sub-locations; the renderer and labels (5.2); the clerk's `why` (4.4) | §2.7 staged records; BCR-V8-14 |
| `HostContext.customLibrary` (2.8) | the host client, from the author's content library (optional) | `digest` → the `custom-def` carried facts → item 104 (a) (5) | §14 `HostContext`; BCR-V8-13 |
| carried kinds `custom-def`, `custom-chain`, `custom-service` (2.8) | `creation`, `absorb` (the ledger event) | the diff (3.5): re-resolution on a new revision (item 104 (e)), a chain's activation change (item 104 (h) (7)) | §7.7 item 12; BCR-V8-8, BCR-V8-14 |
| key-law rows `chain:`, `svc:uid:`, `res:uid:`, `def:` (2.8) | `digest` | binding rows, `DossierRef.element`, the carried map | §7.7 item 12; BCR-V8-14 |
| the status banner and `statusText` (5.1) | `module.status` from the embed's glue | SettlementForge's tab container, the host's translation | BCR-V8-1 |
| host mode of `embed.html` — chrome, locked dossier values, the header's actions, the players'-view strip (5.1; `HostSlots` by V08 §3.1 step 7 (b)) | `@plat/app` | the DM's and co-DM's frames | §14 `@plat/app`; BCR-V8-3 |
| drawing rows `condition.*`, `worked-out`, the `supplyChains` view, the `occupation` symbol, the export attributes, the gazetteer's `customChain` rows (5.2) | the staged and custom records | the renderer, the legend, GeoJSON; V9 §5.4's Show-menu entry **SettlementForge's chains**, offered while the gazetteer lists one (XV-V9-26) — a chain in each of them only when the key admits every joined node (V08 §5.2's knowledge rule; SR-25) | §8.2, §8.3, §9.2's admission table, §11.1, §11.2; BCR-V8-15 |
| the host projection of V08 §5.4 (3) (the base's kinds; V10 §3.17's rows for the reader kinds) and `E_HOST_FORMAT`, `E_HOST_KIND` (5.4) | the module in host mode, applying it to every `query.result` and `preview` reply before it is posted out of the frame (BCR-V10-7 (c); SS-01) | SettlementForge's assistant through the host client, which carries no projection code; the stored party gazetteer; V10's configuration B prompts; the host's `export.request` (`doc.snapshot` exempt) | §11.2, §11.3; BCR-V8-1; BCR-V10-7 (c); T-V8-27 |
| budgets (6) and bars (7) | this volume | §12.6's stage row; §13.2's suite, §13.8's tiers | BCR-V8-16, BCR-V8-17 |
| M-SF and its steps (8) | this volume | §16's staged pricing | BCR-V8-18 |
| host harness `plat/tools/hostharness/` (7.2) | the fixture pairs, a mock host store that never decodes a byte | T-V8 bars end to end | §13.2 B-DOSSIER-lite, §13.8 |
| release checklist (8.3) | the bars and the manifests | a release of the SettlementForge configuration | §13.3 milestone records |
| **added by the revision** | | | |
| the party picture set and party gazetteer (3.14) | the module in an editing session's frame or the refresh frame, on the client's `party.render`: the party key resolved by V08 §3.14 (1) into BCR-V10-22's key form, passed as `ExportOpts.knowledge` to §11.1's picture exporters (BCR-V9-14) and as `admitAs` to every `gazetteer` and `people` query (BCR-V10-22; SR2-06, SR2-07); returned in `party.rendered`, stored by the client with `putPartyPictures` | the player's Map tab (`MapHost.mountParty`, its small viewer); the player's assistant | §11.1 *Knowledge*; §11.2 `query`'s `admitAs`; §14 audience table; BCR-V8-1, BCR-V8-27 |
| `MapRecord.party` and `setParty` (2.1, 4.2) | an owner's or editor's "Reveal to the party" and "Hide again" | the party picture set, the party gazetteer, the DM's "See what the players see" (through `host.state`, V08 §3.14 (5)) | §9.2's key; §14 audience table ("as the host records what the party learns") |
| `doc.snapshot` / `doc.snapshot.ready` (2.2) | the client at creation, compaction, upgrade and rebase | `MapStore.create`, `MapStore.replaceSnapshot` | §11.3; BCR-V8-1 |
| `encoded`, `seqAfter`, `logHeadAfter` on `doc.changed` and `dossier.result`; the snapshot metadata on `created` (2.2) | the module (canonical CBOR, §11.3's `logHead`) | `MapStore.commitEvents`, `MapStore.create`: the host stores them and never computes a head | §11.3; BCR-V8-1 |
| `doc.load.audience` (2.2) | the client, from the audience word | the module's role and key, the lower of the two (J-V8.29) | §11.3 *Roles*; BCR-V8-1 |
| `AdapterManifest.requiredKeys`, `.optionalKeys` (2.4) | each adapter folder | `recognise`; the ignore clause; the lint's key list | §14; BCR-V8-4 |
| the port's session `host:port` (3.6) | the port | §7.4's stacks (never a user's), V09's undo tooltip | §7.1; BCR-V8-19 |
| `economy.chains` extended; carried `chain`, `dependency`; the goods lists (2.3, 2.5) | the adapter, V11's `goodWords`, the `chainStatus` word row | DR-V8.5 → the supply web (item 105 (i)); V01's district supply term; V06's link re-binding at epochs; V07's village links and entry store | §14 `DossierDigest`; BCR-V8-5, BCR-V8-8 |
| the `threats` row → `PortValues.threats` (2.5, 2.6) | the adapter over stressors, conditions, trade partners, access, terrain and population | DR2's waterfront through V11's `WaterfrontThreatRow` (item 106 (d)); V07's watchtower row | §7.7 DR2; BCR-V8-7 |
| calamities → `EpochInputs.events` (3.6) | `calamityHistory[]` through the digest; the carried `calamity` keys | V06's hazard phase (DR-V6.1, numbered with DR-V8.6); V04's burial growth (the deaths) | §4.11 `EpochInputs`; BCR-V6-12 (V06's typed reading); BCR-V8-20 (the receipt row) |
| stressors → `stress:<type>` condition overlays (3.11) | the digest's normalised `stressors` | the `conditions` row's readers | §2.7; BCR-V8-6 |
| row sets `relations`, `historyScars`, `magic`, `era`, `materials`, `customWeights`, `isolation`, `chainStatus`, `dependencySeverity`, `qualifiers`, `threats`, `ruinEvidence` (2.6) | this volume | `PowerRelation` (§4.5, item 72), `HistoryHint`, `CircumstanceSlice.magic` and `.era`, V11's material rows, `PortRows.customKinds`' numbers (§10.2's roster, V08 §3.11), S12a, the supply web, T9 and DR9, DR2, V04's ruin rule | BCR-V8-10 |
| `site.ruinEvidence` (2.5, 2.6a) | the adapter | V04 §3.5.0a's ruin existence and centre; V05's node term through V04's `ruinCentre()` | DR-V8.2; BCR-V8-5 |
| DR-V8.2 – DR-V8.6 (2.6a, 3.5, 3.6) | this volume | §7.7's derivation table (the coherence pass numbers them) | BCR-V8-30 |
| `DossierInstitution.step`, `.lesser`, `.popQualifier`; the ladder merge (2.5, 3.5) | the adapter; V11's `dossier.ladders`, re-checked against the ladder file at `5d699cc68` (V08 §3.5.1) | DR9's member counts; V01's quarter records; V06's ladder steps; V10's members answer; the count parity (7.3); at village rungs V07's readings — V07 §2.4's range rows (`rules.ladders.ranges`), DR9's members and V07 §3.10's QUARTER end claim — and a pin lesser's churchyard `cross` (V07 §3.10; V08 §3.5.1 (c); seam-settlements-r4 SR4-06, SR4-12); for a REPLACEMENT greater of a new thing met over time (V08 §3.5.1 (c), (d); SR5-01), DR9's `assign` — at a village rung V07's records placement (V07 §3.12 *Records at a village epoch* item 4) — the fortification path for a `@wall` greater, and V06's dossier-phase ladder step, which converts nothing in place for it (V6 §3.9.11) | §7.7 T9, DR9; BCR-V8-5 |
| `Assignment.custom` (2.8) | the creation prefix; a `custom_revision` `setAttr` | item 104 (a)'s re-resolution at fold; the custom weights read from the `custom-def` fact; the clerk's `why` | §7.7 `Assignment`; BCR-V8-21 |
| `MapRecord.refreshing` lease (2.1) | the refresh queue | another device's page (free when expired) | — |
| the catalogue manifest `catalogue.<line>.json` with its `ladderPairs` (2.4) | the adapter's build step, from the pinned line's catalogue and ladder file | V11's `coversManifest` totality and its ladder cross-check over `ladderPairs` (its C4 rows; V11 registry row 77, T-V11-2) | §14's lint |
| **added for item 110** (critique §9) | | | |
| DR-V8.7, the water system's inputs (2.6b) | the adapter (the records bound to `conduit_house` through V11's `kinds` and `ladders`, the demand records, the `site` row's words, the realm cell's river, the `hot_springs` deposits, the culture); DR23's rung | item 110 (b)'s aqueduct reason (the base); V11's chance, need, cap and terminal rows; V06's epoch builds; V10's `why` | §7.7 DR table; BCR-V8-30 |
| DR-V8.8, the high-ground landmarks (2.6b) | the dossier-bound institutions of class significance at least V11 §3.24.2's `elevated.landmarkMinSignificance` and the custom `landmark` records, at their S3 reservations | item 110 (b)'s elevated-road reason; V10's `why` | §10.2 significance; BCR-V8-30 |
| the `kinds` row's `implies` column and the dry-site brook (2.6, 2.6b) | V11's `kinds` rows (`toll_bridge` → `bridge`) | DR1's river chance at creation (BCR-V8-32); V11's toll-house `near` bridge row; V07's village cell | §7.7 DR1; BCR-V8-32 |
| the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s aqueduct, when the dossier's conduit house takes its terminal | the arches' fate and condition (the `impairments` row; V06's decay) | §2.7's raised way; BCR-V8-28 |
| the culture's item-110 readers (2.6b (4)) | `site.culture` | V11's aqueduct culture modifier; DR15's template family → V11's stepped specialisations (item 110 (c); V02 X17) | §7.7 DR15 |
| generated item-110 content unbound; the removal hold (4.1, 4.3) | the base's item-110 generators; the DM's delete; an accepted clerk proposal | every absorb, epoch, rung change, re-key, upgrade, rebase and host undo (the slot stays closed); the history panel's lines (4.6) | §7.7 item 3; BCR-V8-31 |
| **added by reconciliation round 2** (SR-03 – SR-05) | | | |
| the embed's bridge handler — the bridge to the shell (3.1 step 7) | the host's `clerk.config`, `preview { proposal }` and `host.state` messages; the harness's `ClerkMount.host` calls; the header's controls; the shell's selection as forwarded in `entity.selected`; the loaded document's `doc.changed` `ApiEvent`s through the handler's one `subscribe` (§11.2; the answer cache's head-move drop, SR3-13 (c)) | `ClerkMount.host` (V9 §2.10); `HostSlots` — `header`, `banner`, `lockedControls`, `exportFormats`, `fileMenu`, `clerkMode`, `hostName`, `historyLines`, `newDocuments` (V9 §2.2; the last two as SR2-01 and SR2-02 add them); the frame's `ViewOpts.viewAs`; the posted `clerk.needsToken`, `clerk.config.refused`, `clerk.proposal` and `host.action` | §11.2 (`subscribe`), §11.3; BCR-V8-1, BCR-V8-3; BCR-V10-7; V9 XV-V9-17 |
| `host.action` and `MapSession.on('action')` (2.2, 4.2) | the frame's header controls, an owner's or editor's frame only | the host page, which runs the V08 §4.2 row's operation with `offer`, `setParty`, `MapStore.replaceSnapshot`, `MapStore.create` or its own assistant settings and `setClerk` | §11.3; BCR-V8-1; T-V8-47 |
| `host.state` (2.2) | the client, after each `doc.load` and each change of `MapRecord.party`, `backups` or `partyPictures.at`; `MapSession.seePlayersView` | the header's controls, the restore dialog's list of lost edits, the history panel's party lines through `HostSlots.historyLines` (4.6; SR2-03), the players' view — `ViewOpts.viewAs` (BCR-V9-23 with SR-06's key form; V08 §3.14 (5)) | §11.3; BCR-V8-1 |
| **added by reconciliation round 3** (SR2-03, SR2-04, SR2-06, SR2-07) | | | |
| `party.render` / `party.rendered` (2.2, 3.14 (3)) | the client: at creation, after each absorb it commits, 30 s after a map edit batch it committed, after each `setParty`, at open when row B18 finds the stored set stale, and in the refresh queue | the module's party render (V08 §3.14 (1)–(2)); the reply's set → `MapStore.putPartyPictures`, then `host.state { partyPicturesAt }` | §11.3; BCR-V8-1; T-V8-2, T-V8-41 |
| `HostSlots.historyLines` (3.1 step 7 (b)) | the embed's bridge handler, from successive `host.state` values — the `party` differences and `partyPicturesAt` — named and targeted at the key the shell passes to `list` by `query`'s `entity` reads (`dossierKey` or `id`, `admitAs` that key; BCR-V9-36, BCR-V10-22), through the handler's per-key cache, dropped at each head move its one `subscribe` on the loaded document reports (§11.2; SR2-24; SR3-13; J-V8.109, J-V8.110) | V9 §4.10's "The party" group of the history panel (V08 §4.6), listed with `effectiveKey()` | V9 §2.2 (SR2-01, SR2-23); V08 §13 X16, X20 |
| `HostSlots.newDocuments: 'download'` (3.1 step 7 (b)) | the embed's bridge handler, a constant of host mode | V9 §3.9's host-mode rule, which then governs every action that makes a new document; a copy of a dossier-bound document is detached (V6 §4.4) | V9 §2.2 (SR2-02); V08 §13 X16; SR3-06 |
| a derived land use — a `DepositSite` under `res:derived:<landuse>` (2.6 `deposits`, 3.11) | the port's creation prefix and `absorb`, from a record whose class carries a hard `near` → `landuse:<k>` row within 0 on a dossier that lists no deposit opening `<k>` | S12a's site and land use (DR19); V07 §3.9's village claim; the class's hard row, now met | §7.7 DR19; §2.7 `DepositSite`; BCR-V8-4 (`derived_landuse`) |
| **added by reconciliation round 1's continuation** (SS-39, SS-43, SS-44 of seam-surfaces-r0) | | | |
| `PortNote.msg` and `.keys`, each kind's class (2.4, 4.6) | the port — `digest`, `creation`, `absorb`; `custom_resolved` and `unmapped_kind` after the fold, their `class` the class built at the document's rung (V08 §3.6 (4); SR4-07), in the words of V11's class `label` cell (BCR-V9-8) or, for a pin kind, its `host.pinKind.<kind>` row (V08 §4.6; SR5-07, SR6-06) | an `event` or new `standing` note → the ledger event's `notes` → V9 §4.10's absorb group (V08 §4.6); a `standing` note → `DossierBinding.notes` → `GenerationReport.dossierNotes` → `report(h)` → the report panel's dossier section (V9 §5.7; SR-23); every note → `dossier.result.report` → `MapSession.on('report')` and the client's `statusText` | §14 `PortNote`; BCR-V8-4 |
| `dossierFacts.notes`, `.notesCleared` and `DossierBinding.notes` (2.3, 3.6 (4)) | the port run's notes, by class and identity | the fold (the binding's standing list); the history panel's group (V08 §4.6); every derivation's report build, which copies the list into `GenerationReport.dossierNotes` for the report panel (`report(h)`, V08 §4.6; SR-23); replay, verification (V08 §3.3) | §7.1, §7.7 item 12, §2.9's dossier block, §5.4; BCR-V8-6, BCR-V8-8 |
| the refusal's `reason` on `dossier.result.held` and `MapRecord.held` (2.1, 2.2, 3.9) | the port's `held` note on a refused offer (its `msg`: a `host.held.*` row) | the tab's banner and the frame's held notice (V08 §5.1, §3.1 step 7 (b)); the thumbnail slot at a refused creation | §11.3; BCR-V8-1 |
| the catalogue families `host.note.*`, `host.held.*`, `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*` and `host.verify.mismatch` (3.9, 4.6, 5.1) | this volume's words | `messages/en.json` (V9 §2.9, §4.9; V08 §13 X12) and the client's `statusText` defaults (C8-40); T-V8-14's walker and V9's T-V9-15 | V9 §2.9's catalogue (BCR-V9-8) |
| `module.status.detail` as a catalogue key (2.2, 3.3, 3.9) | the module at B10's rebuild and B20's mismatch | the tab's banner, beside its phase's row (V08 §5.1) | §11.3; BCR-V8-1 |
| **added by reconciliation round 2's continuation** (SR-23, SR-25 of seam-surfaces-r1) | | | |
| `GenerationReport.dossierNotes` (4.6; SR-23) | every derivation's report build and the verification replay on load, copying `DossierBinding.notes` at the report's seq (`[]` for an unbound document) | `report(h)` → V9 §5.7's report panel, its dossier section under `host.group.standing` after `GenerationReport.dossier` (V08 §4.6); T-V8-14 | §5.4 `GenerationReport`; BCR-V8-8 |
| the chains' knowledge rule (5.2; SR-25) | each joined node's `knownTo` (§2.5 – §2.7) and concealment (item 63), read against the view's effective key (V9 §2.10) or the export's knowledge key (§11.1) by §9.2's admission table as a band-less reader | the `supplyChains` drawing and its legend; the gazetteer's `customChain` rows, and so V9 §5.4's Show-menu entry and the party gazetteer (V08 §3.14); the GeoJSON `supplyChain` feature and every picture export; T-V8-25 | §9.2 `knowledge.admit`; §11.1 and §11.2 *Knowledge*; BCR-V8-15 |

**Dossier facts this volume reads, each traced to its digest field and derivation row.** Population, tier word,
name → `settlement.*` → DR7, DR23, §9.5's title; institutions → `institutions[]` → DR9, DR10, DR24, DR25 and item 14's
state rows; the institution's political role → `DossierInstitution.role` (new) → DR12; tags → `DossierInstitution.tags`
→ item 103's default profile through `tables/dossier/tags`; powers and relations → `powers[]` → DR11, DR12 and
`PowerRelation`; notables → `notables[]` → the dossier-backed `Person` (DR22's exception); conditions → `conditions[]` →
`ConditionOverlay` and DR21; deposits → `site.deposits` → DR19 and `DepositSite`; history → `history` → `HistoryHint`;
safety and capture → `security` (new) → `PortValues.crime` (DR16, DR17); legitimacy → `government.legitimacy` (new) →
`PortValues.legitimacy`; food import and chains → `economy.foodImportPct`, `.foodChains` → `PortValues` (DR19); culture →
`site.culture` → DR1, DR14, DR15, DR-V8.1 (new); realm placements → `HostContext.realm` → DR1, DR2, DR3, DR-V8.1; custom records → `DossierInstitution.custom` → item 104 (a)'s resolution at
fold (V11 §3.13.1's rungs 2–6; DR24's custom rung cites it, V08 §3.5 (5) (f)); active custom chains → `customChains` → DR10's chains input and item 104 (b), (h); custom
resources → `customResources` → DR19 and `DepositSite`; custom services → `customServices` → item 104 (h) (5); the
library's definition fields → `HostContext.customLibrary` (optional) → item 104 (a) (5). No fact is read
from outside the digest, and nothing on §7.7 item 1's never-read list is read (T-V8-20's ignore clause).

**Added by the revision (each traced the same way).** `economicState.activeChains[]` → `economy.chains` (extended) →
DR-V8.5 (item 105 (i)); `tradeDependencies` → `economy.dependencies` → DR10; `primaryExports`, `primaryImports`,
`transit` → `economy.exports`, `.imports`, `.transit` (resolved to goods by `goodWords`) → DR3, DR10, DR-V8.5;
`calamityHistory[]` → `calamities` → DR-V8.6 (V06's DR-V6.1); `stressors` → `stressors` (normalised) → condition
overlays → DR21; `activeConditions` → `conditions` (every status) → DR21; faction relationships (type and trend) →
`powers[].relations` → `PowerRelation` → DR12; history event types → `HistoryHint.scars` (the `historyScars` row) and
`site.ruinEvidence`; `magicLevel` → `site.magic` → `CircumstanceSlice.magic` (the `magic` row; II.6, item 68, item 109
(f)); the culture → `CircumstanceSlice.era` (the `era` row; V11's `EraRow`); a custom record's `materialFamily` → V11's
material rows (the `materials` row; DR15); a custom definition's `economicWeight` and `criticality` →
`PortRows.customKinds`' numbers (the `customWeights` row; §10.2's roster); `isolationSupport.paths` → `site.isolation` →
DR19 (the `isolation` row);
deposits, custom scene archetypes, income rows, history and Adventuring records → `site.ruinEvidence` → DR-V8.2; the
terrain and the mining deposits → DR-V8.3; the burial, church, cathedral and monastery records → DR9 with item 108 →
DR-V8.4's trace; stressors, conditions, trade partners, access, terrain and population → `PortValues.threats` → DR2's
waterfront; a realm or culture latitude → DR-V8.1.

**Added for item 110 (critique §9).** The culture → `site.culture` → also item 110 (b)'s aqueduct chance (DR-V8.7) and
DR15's template family → V11's stepped specialisations (item 110 (c)); the water records (the city record and its SIZE
member), the bath-house and water-needing craft records, the terrain, the realm cell's river and the `hot_springs`
deposits → DR-V8.7; the institutions of class significance at least V11 §3.24.2's `elevated.landmarkMinSignificance`
and the custom `landmark` records → DR-V8.8; a record
whose `kinds` row implies a bridge → DR1's dry-site brook (BCR-V8-32); the terrain → the relief → item 110 (a)'s terraces
and (b)'s viaduct drop; `desert` → the arid biome → the aqueduct's chance and need. The landmark strings of
`quarters[].landmarks[]` reach none of item 110's rules, and SettlementForge's works ledger is not read (J-V8.70,
J-V8.72).

**Added by reconciliation round 3.** A record whose class — by its `kinds` row — carries a hard `near` → `landuse:<k>`
row within 0, on a dossier that lists no deposit opening `<k>` → a derived `DepositSite` under `res:derived:<k>` → DR19
(V08 §2.6's `deposits` row; SR2-04 of seam-settlements-r2).

## 2 Data model

### 2.1 The map record — what SettlementForge stores beside the dossier

The host is the store (§11.3). For SettlementForge the store is one **map record** per settlement map, kept in its own
row keyed by the settlement's id and the map id — never inside the dossier's `data` blob, where it would ride every save,
sync and public projection at about ten times the dossier's size (research: `research/sf/dossier-seam.md` C-6; J-V8.3). The
type is published by `@plat/bridge-client` as the host's storage contract; the module never touches storage itself.
**The host never computes anything it stores** (C8-04): every encoded event, head, sequence number and snapshot field
arrives in a message (V08 §2.2), and the host compares only strings it was handed — the `baseLogHead` of a proposal
against the `logHead` it holds (J-V8.46).

```ts
// @plat/bridge-client — the host's storage contract (hashes are lower-case hex strings: the client depends on nothing)
interface MapRecord {
  mapId: string;                 // a UUID the HOST mints when it first asks for a map; the document's docId (BCR-V8-2). Immutable.
  settlementKey: string;         // `settlement:<id>` (§7.7 item 12): the dossier the map is bound to. Immutable.
  snapshot: SnapshotBlock;       // filled from `dossier.result.created` or `doc.snapshot.ready` (V08 §2.2), never computed by the host
  tail: { seq: number; event: Uint8Array /* the module's `encoded[i]`, stored as handed */ }[];   // the committed events after the snapshot, seq order
  logHead: string;               // the canonical head: the snapshot's when the tail is empty, else the last `logHeadAfter` the host accepted
  adapter: { line: string; version: string };             // the port adapter that last committed (V08 §2.4)
  lastOffer: { dossierHash: string /* §3.2 */; at: string /* ISO 8601 */; result: OfferStatus };
  absorbed: { factHash: string; week: number | null; dossierHash: string };   // the dossier state the committed log last absorbed
  status: 'current' | 'stale' | 'held' | 'refreshing';
  held?: { code: PortRefusalCode; message: string /* the port's English line, for logs */; sinceDossierHash: string;
    reason: { key: string; args?: Record<string, string | number> } /* the refusal's `held` note's msg, stored as handed: a host.held.* row (V08 §3.9); the banner and the frame's held notice draw it (SS-44) */ };
  refreshing?: { by: string /* the page session holding the refresh lease */; until: string /* ISO: now + 60 s, renewed after each map */ };   // C8-30
  thumbnails: { public?: Uint8Array; secret?: Uint8Array };   // PNG, 512 px on the long side (V08 §3.7)
  party: PartyKnowledge;         // what the players' party knows (C8-14; V08 §3.14): written only by setParty
  partyPictures?: PartyPictureSet;   // the players' view (C8-01; V08 §3.14): written only by putPartyPictures
  backups: { bytes: Uint8Array; logHead: string; docId: string /* = mapId: restore refuses any other */; at: string;
    tailAfter?: { seq: number; event: Uint8Array }[] /* backups[0] only: the tail segment the compaction that retired it removed, kept until the next compaction (C8-27) */ }[];   // the two previous snapshots, newest first
  refreshPending: boolean;       // queued for the background refresh (V08 §3.4)
  sizes: { snapshot: number; tail: number; backups: number; thumbnails: number; party: number };   // bytes, for the host's quota
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

The envelope, transport, `re` correlation, source-window check and before-`ready` queue are §11.3's. This volume adds nine
message types — host → PLAT `dossier.offer`, `doc.snapshot`, `host.state` and `party.render`; PLAT → host `dossier.result`,
`doc.snapshot.ready`, `module.status`, `host.action` and `party.rendered` — and extends three base messages and two export
options (BCR-V8-1):

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
                                                       // its view state or a save (V08 §3.1 step 7 (c); SR-04, SR-05)
  party?: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: sent after each doc.load and whenever the host's copy changes
                                                       // (its own setParty; another editor's, through the host's subscription)
  backups?: { logHead: string; at: string }[];         // MapRecord.backups' heads, newest first: the restore dialog lists the map edits after backups[0].logHead (V08 §4.2)
  partyPicturesAt?: string;                            // partyPictures.at: the history panel's "pictures last drawn" (V08 §4.6)
  playersView?: boolean } };                           // MapSession.seePlayersView(on): true sets the frame's ViewOpts.viewAs to the party key, false clears it (V08 §3.14 (5))
type PartyRender = { type: 'party.render'; body: {     // owner or editor sessions only (a viewer's is answered doc.rejected { reason: 'role' }); not an export: E_HOST_FORMAT does not apply
  party: { tier: 'public' | 'local'; places: string[]; rev: number };   // MapRecord.party as stored: the key the set is drawn under, resolved by the module (V08 §3.14 (1))
  since?: { seqAt: number; partyRev: number; outputVersion: string; drawDigest: string } } };   // the stored set's stamp, when one is stored: the unchanged test (V08 §3.14 (3))
// base messages extended
//   doc.load { bytes | ref, role, session, audience?: AudienceWord }   — the module derives role and key from `audience` by §14's table and takes the lower of that and `role` (J-V8.29)
//   doc.changed { baseLogHead, events, encoded: ArrayBuffer[] /* each event's canonical CBOR, in order */, seqAfter: number, logHeadAfter: string }
//   export.request { fmt, opts, displayNames?: Record<string /* binding key */, string>, knowledge?: Admission }
//     — Admission is BCR-V10-22's type, which is BCR-V9-14's union ('public' | 'local' | 'secret' | { tier: 'public'|'local'; places: Id[] }), generated from
//       @plat/api's bridge schema like every message type: it lowers the requester's key for this export only and never raises it — a tier alone is read with the
//       requester key's places, a key form is a key in its own right (SR2-06)
// PLAT → host
type DossierResult = { type: 'dossier.result'; re: number; body: {
  status: OfferStatus;
  dossierHash: string;           // echoes the offer's
  baseLogHead?: string;          // 'absorbed': the head the events were computed on — the host appends only if it is current
  events?: EditEvent[];          // 'absorbed': the dossier events and epochs, author 'host', session 'host:port', in log order (§7.7 items 1, 6)
  encoded?: ArrayBuffer[]; seqAfter?: number; logHeadAfter?: string;   // 'absorbed': what the store appends and the head it moves to (C8-04)
  created?: SnapshotBlock;       // 'created': the new document and its metadata
  factHash?: string; week?: number | null;   // the carried facts after this result (§7.7 item 12)
  report: PortReport;            // §14's, with V08 §2.4's notes
  held?: { code: PortRefusalCode; message: string; reason: { key: string; args?: Record<string, string | number> } /* the `held` note's msg (V08 §3.9; SS-44) */ } } };
type DocSnapshotReady = { type: 'doc.snapshot.ready'; re: number; body: SnapshotBlock };
type ModuleStatus = { type: 'module.status'; body: {
  phase: 'booting' | 'loading' | 'verifying' | 'ready' | 'absorbing' | 'held' | 'upgrade-available' | 'error';
  detail?: string /* a host.* catalogue key the banner draws beside its phase's row — B10's host.recovered.*, B20's host.verify.mismatch (V08 §3.9; SS-44) — else absent */;
  progress?: number /* 0–1 */; outputVersion?: string } };
type HostAction = { type: 'host.action'; body: {       // a push from an owner's or editor's frame only: a header control's click (V08 §4.2; SR-04)
  action: 'refresh' | 'restore' | 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings';
  args?: { places?: string[] /* reveal, hide: the selected places — a dossier element's binding key, else its address (PartyKnowledge.places' form) */;
    undo?: true /* restore party.prev: "Hide again" (on hide), "Reveal again" (on reveal), the tier's undo (on partyTier) */; tier?: 'public' | 'local' /* partyTier */ } } };
  // the client surfaces it as MapSession.on('action') and the host runs the V08 §4.2 row's operation with its existing calls;
  // the client drops, and reports, an action whose row the session's role does not hold
type PartyRendered = { type: 'party.rendered'; re: number; body:   // the reply to party.render (V08 §3.14 (3)); its set's partyRev is the request's party.rev
  { status: 'rendered'; set: PartyPictureSet /* V08 §2.1: the client stores it as handed with MapStore.putPartyPictures */ } | { status: 'unchanged' /* nothing stored */ } };
type AudienceWord = 'dm' | 'co-dm' | 'player' | 'anonymous' | 'gallery' | 'dm-share';   // §14's audience table's left column, in the client's words; only 'dm' and 'co-dm' ever load a document (C8-01)
```

The **host client** is the one piece of our code in SettlementForge's bundle — dependency-free, generated message types
copied (never imported) from `@plat/api`'s bridge schema at build time (BCR-V8-3):

```ts
// @plat/bridge-client
interface MapHostConfig { moduleOrigin: string /* e.g. the module's own subdomain (owner question V08 §11 Q1) */; embedPath: string /* '/embed.html' */;
  protocol: 2; bootTimeoutMs: number /* 20 000 */; replyTimeoutMs: number /* 60 000 for dossier.result and doc.snapshot.ready, 15 000 otherwise */;
  store: MapStore /* the host's implementation of the record's reads and compare-and-set writes */; statusText?: Record<string, string> /* the host's translation; the default rows are generated from V09's `host.*` catalogue (C8-40) */ }
interface MapStore { read(settlementKey: string): Promise<MapRecord | null>;
  commitEvents(mapId: string, expectedHead: string, encoded: Uint8Array[], seqAfter: number, logHeadAfter: string, absorbed?: MapRecord['absorbed']): Promise<'ok' | 'stale'>;
  replaceSnapshot(mapId: string, snapshot: SnapshotBlock): Promise<'ok' | 'stale'>;   // precondition: snapshot.logHead is the record's head or the logHeadAfter of an event in its tail (C8-29); keeps the tail's suffix after it; moves the old snapshot to backups[0] with the removed segment as tailAfter, drops backups[2]
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
  exportPicture(fmt: 'png'|'svg'|'print', o: { knowledge?: Admission /* export.request's, above (SR2-06) */; displayNames?: Record<string, string>; opts?: unknown }): Promise<ArrayBuffer>;
  query(q: unknown): Promise<unknown>;   // the host clerk (V08 §4.4): the answer arrives ALREADY projected by the module (V08 §5.4 (3); BCR-V10-7 (c)); the client holds no projection code (SS-01)
  preview(events: unknown[], o?: { view?: boolean; proposal?: HostProposal /* BCR-V10-7 (b)'s proposal body (id, reason, variations), generated from @plat/api's bridge schema */ }): Promise<unknown>;   // V10 §3.17's host proposal intake (SS-03); the reply projected as query's
  setParty(p: { tier?: 'public'|'local'; reveal?: string[]; hide?: string[]; prev?: true /* restore party.prev: "Hide again", "Reveal again" */ }): Promise<'ok'|'stale'>;   // owner or editor: writes MapRecord.party, then re-renders the party pictures (party.render, V08 §3.14 (3)) and re-sends host.state { party }
  seePlayersView(on: boolean): void;   // the DM's check from the page (C8-14): posts host.state { playersView: on }, which sets the frame's ViewOpts.viewAs to the party key or clears it —
                                       // a display filter (BCR-V9-23 with SR-06's key form; V08 §3.14 (5)); no view-state write, no store write, no event (SR-05)
  setClerk(config: ClerkConfig /* BCR-V10-7's clerk.config body — mode, transport (with its expiresAt and fallbacks), capUsd — generated from @plat/api's bridge schema like the client's other message types, never restated here (SS-02) */): void;   // sends V10's clerk.config
  setView(patch: Record<string, unknown>): void;
  on(ev: 'status'|'report'|'selected'|'action'|'clerkNeedsToken'|'clerkProposal'|'clerkConfigRefused', h: (x: unknown) => void): () => void;   // action: a host.action body (V08 §4.2; SR-04); clerkProposal: the module's clerk.proposal { id, status, seqs? }; clerkConfigRefused: clerk.config.refused { reason } (BCR-V10-7 (a), (b); SS-03)
  switchTo(s: MountSpec): Promise<void>;   // reuses the frame (V08 §3.1); the same fields as mount (C8-40)
  close(): void }
interface PartyView { refreshFromStore(): Promise<void>; close(): void }   // pan and zoom over the stored levels; the caption host.party.asOf (V08 §5.1)
type RealmPlacements = { self: { x: number; y: number }; partners: { key: string; x: number; y: number }[]; mPerRealmUnit: number;
  latitude?: { degAtY0: number; degPerUnitY: number /* the realm map's latitude scale; y grows southward */ };
  cell?: { terrain?: string; river?: boolean; coastSideDeg?: number } /* from the campaign's spatial digest */ };
```

### 2.3 The binding in practice — additions to `DossierBinding`, the carried facts and their hash

`DossierBinding`, `CarriedFacts` and the key law are §7.7 item 12's. This volume adds three fields and fixes the carried
shape and the history's retention (BCR-V8-8):

```ts
// additions to §7.7's DossierBinding
  adapter: { line: string; version: string };   // the adapter whose digest wrote `carried` — read by V08 §3.8's remap and line steps and by select (V08 §2.4)
  quarantined: { key: string; reason: string; since: number /* the seq of the dossierFacts event that first carried it */ }[];   // V08 §3.9; rebuilt by folding dossierFacts events (V08 §3.6 (4))
  notes: PortNote[];   // the STANDING notes (V08 §4.6's class column) the last port run wrote — how the map reads the current dossier — in identity order;
                       // rebuilt by folding dossierFacts' notes and notesCleared (V08 §3.6 (4)); read by the report panel's dossier section and the next absorb (SS-44)
// the carried value per element kind: exactly the digest subset the diff compares (V08 §3.5), canonical field order
type CarriedFact =
  | { k: 'settlement'; name: string; tierWord: string; population: number }
  | { k: 'institution'; name: string; kindLabel: string; kind?: string; category: string; role?: string; tags: string[]; count?: [number, number]; openTop?: boolean;
      step?: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'; lesserOf?: string /* the greater's key when this record was merged as its member (item 108 (c)) */; popQualifier?: number;
      districtScale: boolean; facets: DossierInstitution['facets']; forbidden: string[]; state: DossierInstitution['state']; fate?: string; inactive: boolean;
      impairments: { type: string; severity: number; covert: boolean }[]; knownTo?: 'public'|'local'|'secret'; renamedFrom?: string; members?: number /* a collective record's placed count, a map fact kept beside it for the member keys */ }
  | { k: 'power'; name: string; category: string; standing: number; governing: boolean; controlled: string[] }
  | { k: 'relation'; kind: string /* the line's type word */; trend: string /* stable, declining, escalating */; sign: -1 | 0 | 1; strength: number; hidden: boolean }
  | { k: 'notable'; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }
  | { k: 'condition'; archetype: string; source: 'condition' | 'stressor'; severity: number; severityBand?: string; status: string; sinceWeek?: number; untilWeek?: number }
  | { k: 'resource'; state: 'available'|'depleted'|'removed'|'discovered'; custom: boolean }
  | { k: 'quarter'; name: string; phrase: string; landmarks: string[] }
  | { k: 'government'; name: string; governingPower?: string; legitimacy?: number }
  | { k: 'trade'; partners: { key: string; relationship: string }[]; links: { good: string; flow: 'import'|'export'; partner: string }[]; entrepot: boolean;
      goods: { exports: string[]; imports: string[]; transit: string[] } /* goods keys after goodWords (V08 §3.5 (6)) */; incomeShares: Record<string, number> /* the income sources' percentages */ }
  | { k: 'port-values'; crime: number | null; importPct: number | null; foodChain: Record<string, boolean> | null; legitimacy: number | null;
      latitudeDeg: number | null /* DR-V8.1's value from the realm block when it arrives after creation (V08 §3.5) */; threats: string[] /* the neutral keys of the `threats` row, sorted */ }
  | { k: 'deity'; key?: string; name?: string }
  | { k: 'chain'; needKey: string; resource?: string /* a res: key, else 'name:'+name */; processors: string[] /* binding keys, else 'name:'+name, flow order */;
      outputs: string[] /* goods keys, sorted */; upstream: string[] /* chain:cat: keys */; status: string /* the neutral status key (V08 §2.6 `chainStatus`) */; entrepot: boolean }
  | { k: 'dependency'; severity: number /* by `dependencySeverity` */; affected: string[] /* the services it names, sorted */ }
  | { k: 'calamity'; type: string; week: number; deaths: number; severity: 'minor'|'moderate'|'major'|'catastrophic'; targets: string[] /* binding keys */ }
  | { k: 'evidence'; kinds: string[] /* the ruin-evidence kinds present, sorted (V08 §2.6 `ruinEvidence`) */ };
```

**Keys of the carried map.** The binding keys of §7.7 item 12 for settlement, institution (a collective record once, its
members `#k` in the binding rows only), power, notable, condition, resource, quarter and government; the singletons of our
own — `trade`, `port-values`, `deity`, `evidence` — and: `relation:<a>|<b>` for a power relation (its two power keys in
code-point order, §2.7's `PowerRelation.key`; unordered, because the line's pair order is not a direction — V08 §3.11,
J-V8.52); `cond:stress:<type>` for a stressor (it has no id); `chain:cat:<chainId>` for one of SettlementForge's own
chains (disjoint from the custom `chain:<chainId>` of V08 §2.8); `dep:<institution key>|<slug(resource)>` for a
dependency; `calamity:<week>:<slug(name)>` for a calamity. A power's `rename-faction` re-keys its relation keys by the
same `rebind` that re-keys the power (V08 §3.6 (5)), never a removal and an addition. **`factHash`** = H128 over the
canonical CBOR of the carried map, keys sorted by code point, numbers as the digest holds them (a severity rounded to
1/1 000, a standing to 1/10 000 — the digest's own rounding, V08 §3.5 (2)), so a dossier whose only change is below that
resolution hashes equal. **Retention of `absorbed`** (C8-13): every entry keeps `{ seq, week, factHash }` forever (16 B of
hash each: a century of weekly absorbs is under 100 KB and a host's undo can match any of them, F22); `changeIds` are kept
on the newest 64 entries only, and the trim is **part of the fold** — folding a `dossierFacts` event appends its entry
and then removes `changeIds` from every entry older than the newest 64 — so the stored block and the block the fold
rebuilds from the log are equal at every seq (§2.9's load check; T-V8-5). The report reads older change ids from the
log's `dossierChange` envelopes.

**A binding row's life.** *Create*: `creation` writes one row per dossier element it placed or carried (collective
members `#1…#n`, n the placed count; a ladder lesser merged into its greater, item 108 (c), becomes a row of the greater's
members, V08 §3.5.1 — or, where the greater is a new thing, an alias row on it, or the row on the churchyard `cross` a
pin lesser binds at a village rung, V08 §3.5.1 (c); SR5-01); `absorb` writes a row for each addition. *Read*: `factTier` (§2.8), the diff, the oracle's answers
(V08 §4.4). *Persist*: the dossier block (§2.9), outside the model digest. *Regenerate*: a scoped regeneration re-places
members under their addresses (§6.3), so rows follow the addresses and never change. *Undo*: a dossier event is no undo
target (§7.4); a map `undo` that would un-place a dossier element is refused (§7.7 item 2), so a row never dangles.
*Migrate*: rebuilt from the log's dossier events at first load (§7.5); an adapter-version remap or a line migration
re-keys rows by V08 §3.8 and writes a `line_migrated` note. A row whose element is removed keeps its key and its entity
(the retired assignment), so a re-opening re-binds to its own former building (F6).

### 2.4 The adapter manifest, the registry and the port's new results

Each `adapters/sf/<line>/` folder (§14) exports one manifest beside its pure digest function (BCR-V8-4):

```ts
// @plat/port
interface AdapterManifest { id: 'sf'; line: string /* the canonical id: the folder name, 'fp-integration-2026-09-23' (C8-19; BCR-V8-23) */; version: string /* the adapter's own semver */; commit: string /* the SF commit it was cut against: '5d699cc68' */;
  requiredKeys: string[] /* the top-level keys every dossier of the line carries (below) */;
  optionalKeys: { key: string; read: boolean }[] /* keys a lived or custom dossier may add; read: false → dropped and noted ignored_key (below) */;
  keyList: string[] /* every host key the adapter reads, receipt keys included — §14's lint list */;
  recognise(raw: unknown): { accept: boolean; evidence: string[] } /* pure; reads only keyList keys: every requiredKeys key present, schemaVersion 1,
     simulationVersion 1, the `id` form `s_` + 16 hex, the institution record shape; any EXTRA top-level key is accepted — never a refusal (C8-03) */;
  limits: { maxBytes: number /* 8 MiB of JSON */; maxDepth: number /* 32 */; maxRecords: number /* 2 000 institutions, 500 notables, 200 of any other list */; maxString: number /* 16 KiB */ };
  vocabulary: Record<string /* a tables/dossier/* table */, string /* the table version this adapter's words were written against */>;   // read by release row R2 against the pinned tablePins of the fixture documents (C8-34)
  remaps: { fromVersion: string; fields: { kind: CarriedFact['k']; path: string /* a CarriedFact field */ }[] }[];   // digest changes declared between adapter versions (V08 §3.8)
  fromLines: { line: string; keys: { rule: 'identity' } | { rule: 'table'; rows: { from: string; to: string }[] } }[] }   // binding-key migration from an earlier line (V08 §3.8)
interface AdapterRegistry { register(m: AdapterManifest, digest: (raw: unknown, host?: HostContext) => PortResult<DossierDigest>): void;
  select(raw: unknown, o: { line?: string /* HostContext.line */; bound?: string /* the document's DossierBinding.adapter.line; absent at creation */ }):
    { status: 'ok'; manifest: AdapterManifest; defaulted?: boolean } | { status: 'refused'; code: 'E_LINE_UNSUPPORTED'; candidates: string[] } }
// §14's PortResult refusal codes gain 'E_OTHER_SETTLEMENT' (an absorb whose digest's settlement key differs from the binding's);
// §14's PortNote kinds gain 'quarantined_record' | 'quarantine_hold' | 'adapter_remap' | 'line_migrated' | 'line_defaulted' | 'held' | 'size_limit'
//   | 'ladder_merged' | 'ladder_promoted' | 'ladder_unknown' | 'chain_node_unjoined' | 'unmapped_good' | 'npc_rebound' | 'calamity_unplaced'
//   | 'custom_resolved' | 'custom_unversioned' | 'custom_node_unjoined' | 'library_mismatch' | 'custom_library_dropped' | 'low_confidence'
//   | 'uncatalogued_step' /* a record whose kind is a greater of the committed ladderPairs that the catalogue does not list (V11 §3.12; V08 §3.5.1 (b)) */
//   | 'derived_landuse' /* a land use a record's hard row needs, opened with no deposit to open it (V08 §2.6 `deposits`; SR2-04) */
//   | 'name_unjoined' /* a name one record uses for another — a notable's workplace or power, a cross-link reference — joins none (V08 §3.5 (6), §3.11, §3.13 (7)) */
//   | 'name_ambiguous' /* a name joins several records by kind family; the first in dossier order taken (V08 §3.5 (6)) */
//   | 'custom_unkeyed' /* a custom record without localUid, keyed by name (V08 §3.13 (1)) */
//   | 'count_over_range' /* a guild COUNT record placed above its range's top because its GUILD records alone exceed it (V08 §3.5.1 (c)) */
//   | 'not_placed' /* a record whose `kinds` row is '@none' (V08 §2.6) */
//   — the five named by reconciliation round 1's continuation, where the text said "noted" without a kind (SS-44)
// §14's PortNote gains (SS-44): msg: MsgRef /* BCR-V9-12's type: key 'host.note.<kind>' (a `held` note: its host.held.* row, V08 §3.9), args as V08 §4.6's table names,
//   strings and numbers only — names as the dossier writes them, counts, words */; keys: string[] /* the binding keys of the elements it concerns, [] when none: the line's Show */
//   — `detail` stays the English line for logs and tests. A note's IDENTITY is the first 16 hex digits of H128 over the canonical CBOR of (kind, msg, keys sorted); its
//   CLASS (event, standing or report) is V08 §4.6's table's, and decides where it is kept (V08 §3.6 (4))
```

**The first line's key sets (CONFIRMED on the 35 births and 12 after-tick dossiers generated on the pinned line;
receipt `scratchpad/volumes/rv8/census2.out`).** `requiredKeys` — the 41 keys every birth carries: `_config`, `_seed`,
`activeConditions`, `aiOverlays`, `arrivalScene`, `availableServices`, `coherenceNotes`, `config`, `conflicts`,
`culturalIdentity`, `culturalNotes`, `defenseProfile`, `economicState`, `economicViability`, `factions`,
`generationCoherenceReceipt`, `generatorVersion`, `history`, `id`, `institutions`, `isolationSupport`, `name`,
`neighborRelationship`, `npcs`, `population`, `powerStructure`, `pressureSentence`, `prominentRelationship`,
`relationships`, `resourceAnalysis`, `schemaVersion`, `settlementReason`, `simulationTrace`, `simulationVersion`,
`spatialLayout`, `stress`, `stressors`, `structuralSuggestions`, `structuralViolations`, `tier`, `userCanon` (several of
them on §7.7 item 1's never-read list: required for recognition, never read). `optionalKeys`, read: `customContentProvenance`,
`customContentRoster`, `populationHistory`, `resourceHistory`, `tierHistory`, `institutionHistory`, `calamityHistory`;
not read: `urbanFabric` (on §7.7 item 1's never-read list), `npcLadder` and `traditions` (no reader: the notables and
powers already carry what the map uses). A lived dossier carries 41 to 47 keys (one week: `populationHistory`; a year:
`resourceHistory` too; the lit year: `calamityHistory`, `npcLadder`, `traditions`, `urbanFabric`), and every one is
recognised (T-V8-31). An unknown top-level key — one neither list names, a later line's addition — is accepted, dropped
by `digest` into `ignored` and noted `ignored_key`; the release checklist (R9) adds it to a list when the fixtures show it.

**Selection (C8-19; J-V8.9 revised).** `select` tries, in order: (1) `HostContext.line`, when given and registered — its
adapter must accept, else `E_LINE_UNSUPPORTED`; (2) the document's bound line (`bound`), when its adapter accepts — a
map stays on its line until a `fromLines` migration moves it (V08 §3.8); (3) the single registered adapter that accepts;
(4) at a creation with several accepting and none named, the NEWEST registered line, recorded in the binding and noted
`line_defaulted` — a declared default the report shows, never a silent guess; `E_LINE_UNSUPPORTED` naming the candidates
only when none accepts. The first registered adapter is `fp-integration-2026-09-23` pinned at `5d699cc68` (J86 Q1; §14),
and the line id has that one spelling everywhere (BCR-V8-23).

**The catalogue manifest (V11's request, answered with C8-22).** The adapter's build step writes
`plat/packages/tables/src/dossier/catalogue.fp-integration-2026-09-23.json` — each catalogue kind's `catalogId`, name,
tiers and category, read from the pinned line's catalogue, and `ladderPairs: { greater: string; lesser: string[] }[]`,
the ladder file's pairs as data (V08 §3.5.1 (f)) — which V11's `coversManifest` check (every kind has a `kinds` row)
and its ladder cross-check (every committed pair has a `dossier.ladders` row; V11 registry row 77, T-V11-2) read. It
carries names, tiers, categories and pairs of names only; no SettlementForge code is copied.

### 2.5 The digest's additions, the staged-record event and the per-settlement values

**Digest additions (BCR-V8-5)** — dossier facts the staged readers and the bundled rules need, each read by one row:

```ts
// additions to §14's DossierDigest and DossierInstitution
  DossierInstitution.role?: string;          // SF's priorityCategory — the institution's generation-priority bucket (adventuring, crafts, criminal, defense, economy,
                                             // entertainment, exotic, government, infrastructure, magic, military, religion), read as DR12's first input (J-V8.45; BCR-V8-25)
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
  site.ruinEvidence: { kind: 'ruins'|'ruinedLandmark'|'node'|'leyLines'|'magicalHistory'|'delving'|'undercity'; key?: string /* the record, deposit or event's binding key */; yearsAgo?: number }[];   // DR-V8.2 (V08 §2.6a)
  site.threats: string[];                     // the neutral sea-threat keys of the `threats` row (item 106 (d)), sorted
  site.latitudeDeg: number;                   // DR-V8.1's value (V08 §3.5)
  economy.chains: { key: string /* chain:cat:<chainId> */; chainId: string; label: string; needKey: string;
    resource?: { name: string; key?: string /* res:<deposit key> when resourceKey names a listed deposit */ };
    processors: { name: string; key?: string /* resolved by V08 §3.5 (6) */ }[] /* flow order */;
    outputs: { label: string; goods: string[] /* V11's goodWords over the label by V11 §3.13.5's matching rule; a label matching none resolves to the generic good `import`, noted unmapped_good */ }[];
    upstream: string[] /* chain:cat: keys of upstreamChains */; statusWord: string /* the line's word */; status: string /* the neutral key by `chainStatus` */;
    entrepot: boolean }[];                    // (existing, extended: C8-06)
  economy.dependencies: { key: string /* dep:… */; institution: string /* binding key, else 'name:'+name */; resource: string; severity: number; affected: string[] }[];   // (existing, keyed)
  economy.goods: { exports: string[]; imports: string[]; transit: string[] };   // goods keys of primaryExports, primaryImports (with necessityImports) and transit by goodWords
  calamities: { key: string /* calamity:<week>:<slug(name)> */; name: string; type: string; week: number /* its tick */; deaths: number; exodus: number;
    severity: 'minor'|'moderate'|'major'|'catastrophic' /* by `calamitySeverity` over deaths ÷ the population at its week */; targets: { name: string; key?: string }[] }[];
// addition to §14's RealmBlock (BCR-V8-11)
  RealmBlock.cell.latDeg?: number;            // the settlement's latitude on the realm map, degrees north (+) or south (−); set by realmBlockFrom when the realm map has a latitude scale; DR-V8.1's first input
```

**The staged-record event (BCR-V8-6; J-V8.15).** The staged records of §2.7 are created, changed and retired only by one
dossier-only event kind, so they replay from the log like every other record:

```ts
// a new member of §7.1's EditEvent union
| { t: 'dossierRecord'; kind: 'condition' | 'deposit' | 'powerRelation' | 'person' | 'customChain' | 'customService'; key: string /* the binding key: cond:<id>, cond:stress:<type>, res:<key>, res:uid:<localUid> or res:derived:<landuse> (V08 §2.6 `deposits`), relation:<a>|<b>, npc:<id>, chain:<chainId>, svc:uid:<localUid> */;
    op: 'put' | 'retire'; fields?: Record<string, unknown> /* on put: the record's fields as §2.7 declares them, less id, lifecycle and the derived fields
      (a DepositSite's bearingCdeg and landUse, written by S12a, V08 §3.11); for a person, its Posting and Membership targets as binding keys (V08 §3.11) */ }
    // author 'host' and session 'host:port' only (a user's or clerk's dossierRecord is refused F-EDIT dossier-owned, §7.7 item 11); EditBase.dossier and .dossierChange set; its
    // address: the record kind's by §6.3 (the binding key, §6.3's table); fold: `put` creates the record or rewrites its fields in place, `retire` ends its
    // lifecycle (a condition's untilWeek reached, a deposit removed, a relation dissolved, a notable dead or gone) — the record stays as a tombstone for §6.3's
    // supersedes table; never an undo, redo or revert target (§7.4's dossier rule); migration: none needed (new in this volume's schema step, §7.5)
```

**The per-settlement values (BCR-V8-7; J-V8.16).** `PortRows.crime`, `.hinterland.importPct` and `.foodChain`, and `.legitimacy`
(§10.2) are per-settlement dossier values that move with time, not vocabulary; a table edit would re-derive from the
table's first reader stage (§7.6), which is the reshuffle item 22 forbids. So they ride the circumstance slice, like the
typed slices of items 77–79, with two more values that move at epochs — a realm latitude that arrives after creation
(C8-21) and the sea threats (C8-08):

```ts
interface PortValues { crime: number | null /* [0, 1] */; importPct: number | null /* [0, 1] */; foodChain: Record<string, boolean> | null; legitimacy: number | null /* [0, 1] */;
  latitudeDeg: number | null /* null: Intent.latitudeDeg (DR-V8.1) is in force */; threats: string[] | null /* null standalone: the preset row decides DR2's waterfront */ }
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
T-V11-37 fails the build on a `dossier.*` column marked calibratable (SCC-R2C-1; J-V8.107). A
word the fixtures carry and a table lacks is caught by T73-10's totality test; the declared fallback is the row marked
"else". Every "else …, noted" below writes one `unmapped_word` note (args: the word; V08 §4.6), and the `kinds` row's
`'@none'` a `not_placed` note (SS-44).

* **`tiers`** (title word; the rung is the population's, DR23): `thorp`, `hamlet`, `village`, `town`, `city`,
  `metropolis` → the same word as the map's title (§9.5); else the word itself, noted `unmapped_word`.
* **`site`** (`terrain` → S0's site request, DR1; the relief class is S0's `relief` field, §4.2 S0, and the one V04's
  cavern rows and fissure gate read, g item 109 (a) (1); item 110 reads the same relief for its terraces — (a), where the
  relief row asks for them — and its viaduct drop — (b), a ravine or valley past `viaduct.minDropM` — and `desert`'s arid
  biome raises the aqueduct's chance and need, (b), through V11's rows; C8-48): `plains` → relief `plain`, no water beyond the site row's own
  river chance; `riverside` → relief `auto`, a river through the site, its inflow bearing drawn on `blueprint.features`;
  `coastal` → relief `auto`, a coast, its side drawn on `blueprint.features`, a harbour by `access`; `hills` → relief
  `hilly`; `mountain` → relief `mountainous` (the spur-or-terrace forms follow from it), a pass when a `defended_pass`
  deposit is listed; `forest` → the forest toggle on, woods in the hinterland;
  `desert` → the arid biome row, open water only with an `oasis_water` deposit; the older words `grassland` → plains,
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
  term of `h_town`) AND ruin evidence `node` (DR-V8.2), its `DepositSite` drawn at V04's `ruinCentre()` when a ruin exists
  whose source is not the node itself, else at DR19's site (g item 109 (f)); `ancient_ruins` → the ruin system's existence
  source, evidence `ruins` (DR-V8.2; V04 §3.5.0a (1) (a)), its `DepositSite` carrying the surface ruin decoration, which
  becomes the system's surface marker and, where V04 places one, its entrance (g item 109 (b)); the mining deposits
  `iron_deposits`, `precious_metals`, `gemstone_deposits`, `coal_deposits` and a copper deposit when the line lists one →
  also the cavern mining test's trigger (DR-V8.3; V04 §3.5.2's `mineBoost`); `crossroads_position` → a second through
  route; `defended_pass` → a
  pass toward one bearing drawn on `hinterland.outside`; `oasis_water` → a pond or lake; a custom deposit → its custom
  kind's row; else a `commons` land use, noted. A `depleted` deposit is drawn worked out (spoil heaps, a stump field);
  `removed` draws nothing; `discovered` opens its land use at the next epoch. **A land use a record needs (SR2-04 of
  seam-settlements-r2; item 20 (h): derived, never asked).** A record whose class — by its `kinds` row — carries a hard
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
  are never item 110 (b)'s dossier landmarks and never count an institution a second time (DR-V8.8 reads institution
  records instead; C8-43).
* **`distribution`** (an institution record → assignment granularity, DR9; keyed by the record's `kinds` row — its
  class or pseudo-class — and its ladder step, never by a bare name, C8-07 (6)): a pseudo-class routes as the `kinds`
  shape below states (`@housing` → no assignment, DR7's range; `@wall` → DR2's walls list; `@absent:<class>[+<class>]`
  → S2's zeroed classes, SS-10; `@none`, `@office`, `@seat`, `@layer:*`, `@landuse:*`, `@pin:*` → their readers); step
  COUNT, or a count range → `dispersed` (members `#k`); step GUILD → `building` (the hall — a member `#k` of a guild
  COUNT record of its family when the dossier holds one, V08 §3.5.1 (c), SS-23) plus a `dispersed` collective of the
  trade's members tied to it; step QUARTER, or a district-scale record (`districtScale`) → `neighbourhood`, owning the
  trade's members (V01; item 108 (a); at a village rung, V07 §3.10's end claim, SS-42); step SIZE or REPLACEMENT →
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
  `leyLines`, DR-V8.2); none (dropped, the rest renormalised,
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
  whatever its `status` (`stable`, `worsening`, `easing` — the line's three words; the list holds only live conditions,
  C8-10), and a stressor is read through the same row under its type (the fifteen stressor types are all archetype words
  here).
* **`impairments`** (`PortRows.impairments`' vocabulary): physical — `capacity`, `infrastructure`, `access`,
  `supply_starved` — `conditionSteps` 1 per severity band (≥ 0.34 worn, ≥ 0.67 neglected); non-physical —
  `legitimacy`, `influence`, `wealth`, `staffing`, `corruption` — `conditionSteps` 2 per unit of severity on the
  institution's own dial term (§4.5 (6)); a `covert` impairment is never shown on a public view (DR20).
* **`crime`** (new; `PortValues.crime`): crime = min(1, 0.6 × `blackMarketCapture` ÷ 100 + w), w by `criminalCapture`:
  `none` 0, `adversarial` 0.1, `equilibrium` 0.25, `corrupted` 0.4; both absent → null (the table's neutral).
* **`cultures`** (new; `site.culture` → DR-V8.1's latitude, degrees north): `germanic` 51, `latin` 43 (`mediterranean` an
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
  match is the INPUT of item 104 (a)'s category rung (V11 §3.13.1 rung 3), resolved at fold (V08 §3.5 (5) (f); SS-12):
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
  catalogId, e.g. 'tannery' */; class: string /* a roster class, or a pseudo-class of V11 §3.11 (BCR-V11-9, adopted,
  C8-22): '@housing' → DR7's range; '@wall' → DR2's walls list; '@layer:sewer', '@layer:undercity' → II.7's existence
  (the sanitation and subterranean rows of V04 §2.3a); '@seat', '@office' → §10.2's government rows (a seat class, an
  office on its seat, no building of its own); '@landuse:<kind>' → DR19's land uses; '@pin:<kind>' → a §2.7 pin;
  '@absent:<class>[+<class>]' → S2: each named class's `min` and per-capita demand 0 at the settlement unless another
  record binds that class — a village using a neighbour's mill or parish church; at a village rung each named class is
  read through its `villageForm` by V07 §3.11 step 1 (SR1-02); one class string, several classes
  joined by '+', e.g. '@absent:watermill+windmill' (V11 §3.11; SS-10); '@none' → no placement, noted */; family?: string /* a tags family key that overrides the tags' default */; implies?: 'bridge'
  /* a feature the kind implies; V11 writes it, today for `toll_bridge` only; read by DR1 at creation (V08 §2.6b (3); BCR-V8-32) */ }`. A pseudo-class
  is the ONE route for its record: housing and walls are no longer decided by the `distribution` row or a name list. Its SHAPE, its lookup chain (V08 §3.5 (5)) and its totality bar are this volume's; its rows — one
  per catalogue kind of the line, 280 at the pinned line (the count read from `dossier.catalogue`, never written into a
  bar; SS-35) — are written by volume V11 beside each kind's siting profile (J-V8.18). At M1 the
  rows cover M1's classes (J-P11, §16); every other kind falls to its category's generic class, reported `unmapped_kind`.
* **`archetypes`**, **`categorySynonyms`**, **`keywords`** (new; item 104 (a) (2), (3), (6); their SHAPES and lookups are
  this volume's, their ROWS volume V11's, J-V8.18): `archetypes` — one row per scene archetype `{ id: string /* e.g.
  'agrarian-mill' */; class: string /* a roster class */; family: string /* a tags family key */;
  village?: ArchetypeVillageCell /* SS-09's village cell, typed once by V11 §2.8 (class and elseClass — v.<id> classes —,
  pin, delta, composition, ruin; V11's reconciliation round 1 widened the three-field sketch so V07 §2.4's else-classes,
  composition keys and the ruin decoration are data), V11's rows from V07 §2.4's substitutions: read at village rungs by
  item 104's resolver before V11 §3.22's villageForm (SS-11) */ }`, exactly the 17 ids
  the line's manifest lists (totality: T-V8-25); `categorySynonyms` — `{ text: string /* case-folded free text, ≤ 100
  chars */; group: string /* a categories row key or content group */; family?: string /* when set, wins over the group's
  family (a farm by category is a farm, not a shop) */ }`; `keywords` — `{ key: string /* a lower-case token of ≥ 3
  letters or a two-token phrase */; family: string; weight: number /* ≤ 0.5, the weakest signal (item 104 (a) (6)) */;
  near?: { cls: string; withinM: number; weight: number } /* an authored soft row the resolver adds at the keyword's rank
  (V11's `catacomb` and `ossuary` rows use it) */; class?: string /* the record's class when the resolver's rungs 1–5
  give none stronger */; specialisation?: 'stepped_temple'|'terraced_palace'|'tiered_tower' /* V11 §3.24.3's id */;
  binds?: 'cryptAlways' /* the record's building takes `crypt: always` (V11 §3.5.8) */ }` — the effects of `class`,
  `specialisation` and `binds` are item 104's resolver's, as V11 §3.13.2 states them (X-V11-1, X-V11-6; SS-11).

* **`relations`** (new; a power relation's type word → `PowerRelation`'s neutral `kind`, its sign and strength, read by
  §4.5's typing and item 72's political component; C8-10 (a)): `symbiotic` → `ally`, +1, 0.6; `dependent` →
  `dependent`, +1, 0.5; `subordinate` → `subordinate`, +1, 0.4; `competitive` → `rival`, −1, 0.5; `tense` → `tense`, −1,
  0.6; `corrupted` → `corrupt`, +1, 0.3, hidden (never on a public view, DR20); else `neutral`, 0, 0.3, noted. The trend
  word (the line's `direction`: `stable`, `declining`, `escalating`) scales the strength: `escalating` × 1.25 (capped at
  1), `declining` × 0.75, else × 1. Own values, not calibratable (a table fix). The line's `pair` order is not a direction (CONFIRMED: of
  city-1's four `subordinate` pairs, three name the superior first and one last), so the key stays unordered and no
  relation is read as directed (J-V8.52).
* **`historyScars`** (new; a history event type → a `HistoryHint` scar, C8-10 (b)): `disaster` → a scar of type `fire`
  when its name or template word holds fire, blaze, burn or burning, `flood` when it holds flood, deluge or storm surge,
  else `disaster` (S2's stage count reads it; II.7.6 reads only `fire` and `flood`); `occupation_infiltration` → `siege`;
  `magical` → no scar, ruin evidence `magicalHistory` (V08 §2.6a); `economic`, `political`, `religious`, `demographic`,
  `exile_return` → no scar; else no scar, noted. Severity words: `minor` 0.3, `major` 0.6, `catastrophic` 0.9; else 0.5.
* **`magic`** (new; `magicLevel` → `site.magic` → `CircumstanceSlice.magic`, read by II.6, item 68's lights and item 109
  (f); C8-11): `none` → `none`; `low` → `low`; `medium` → `low`; `high` → `high`; else `none`, noted. `medium` — 32 of the
  35 births, CONFIRMED — reads as `low` under D-3's realism floor (J-V8.47): magic present but not shaping the town.
* **`era`** (new; `site.culture` → `CircumstanceSlice.era`, a key of V11's `EraRow`, V11 §3.19.2): every culture of the
  `cultures` row → `c14`, V11's default row, region `western`; a later table version may give a culture another row;
  else `c14`. The line has no era field, so item 110's era modifier is one constant on dossier maps and the culture is
  the discriminator (V08 §2.6b (4); J-V8.71).
* **`materials`** (new; a custom record's `materialFamily` → the V11 material id whose largest walls share selects the
  material row, DR15; the six words of the line's enumeration, CONFIRMED in its custom-content manifest): `brick` →
  `brick`; `stone` → `ashlar`; `marble` → `ashlar`; `ruined-stone` → `rubble`; `timber` → `timber_frame`; `steel` →
  `ashlar` with a note (no steel frame under D-3's realism floor); else no material, noted.
* **`customWeights`** (new; a custom definition's `economicWeight` and `criticality` words → the numbers of
  `PortRows.customKinds`, read by V08 §3.11's custom kinds; J-V8.108): `economicWeight` — `minor` 0.25, `moderate` 0.5,
  `major` 0.75, `backbone` 1; `criticality` — `critical` 1, `important` 0.6, `discretionary` 0.3; else the field is left
  unset on the row (the roster's default), noted.
* **`isolation`** (new; `isolationSupport.paths[].type` → `site.isolation.paths`, DR19; research mapping row 17):
  `magical_transit` → a `teleport_circle` use (V11's class, sited by its own class row near the market or the castle),
  placed as a map derivation (`existence: 'map'`) only when no dossier record already binds that class (J-V8.48);
  `seasonal_access` → a named-feature claim (§7.7 item 16) naming the through route of the longest approach "Winter
  road"; `local_foodshed`, `hinterland`, `reserves`, `patronage` → nothing beyond §4.9's defaults; else nothing, noted.
* **`chainStatus`** (new; `activeChains[].status` → the neutral status key whose weight V11's `siting.web.chainStatus`
  holds; item 105 (i); C8-06 (4)): `running`, `operational` → `active`; `vulnerable` → `vulnerable`; `impaired` →
  `impaired`; `entrepot` → `entrepot` (its ends item 104 (b)'s import and export pulls, through the store at the gate or
  quay facing the partner); `magically_sustained` → `sustained`; else `active`, noted. The weights are V11's (active 1.0,
  vulnerable 0.8, impaired 0.6, entrepot 1.0; `sustained` 0.9 as V11 adopted it, J-V11.52, V08 §13 X2 closed); the port never holds
  a weight (J-V8.49).
* **`dependencySeverity`** (new; `tradeDependencies[].severity` → the number DR10 reads): `critical` 1.0, `severe` 0.8,
  `vulnerable` 0.6, `moderate` 0.4, `minor` 0.2; else 0.5, noted.
* **`calamitySeverity`** (new; a calamity's deaths ÷ the population at its week → `CalamityRef.severity`, V06's band):
  below 0.01 `minor`; below 0.05 `moderate`; below 0.15 `major`; else `catastrophic` (the lit city-1 storm, 2 081 of
  23 178 ≈ 0.09, is `major`). Own values, not calibratable (a table fix).
* **`qualifiers`** (new; a non-numeric parenthesised word of an institution's name → its ladder step when V11's
  `dossier.ladders` names none for the kind; item 108; C8-07 (1)): `multiple` → COUNT; `guild` → GUILD; `district`,
  `red light district` → QUARTER; `established` → SIZE; `commercial`, `part-time`, `official`, `if walled`, `resident`,
  `open cast`, `word of mouth`, `divine, 1st level`, `powerful` → no step (kept in the label); else no step, noted. The
  fourteen words are the survey's full list (research V15; twelve of them CONFIRMED again on the 35 births).
* **`threats`** (new; → `site.threats` and `PortValues.threats`, which DR2's waterfront reads through V11's
  `WaterfrontThreatRow`; item 106 (d); C8-08). A site is sea-exposed when its terrain is `coastal` or its access is
  `port`. `naval` ← a `wartime` or `under_siege` stressor, or a `war_pressure`, `under_siege` or `wartime` condition, on
  a sea-exposed site; `hostileSeaPartner` ← a trade partner DR3 reads as hostile whose mode is `sea`, on a sea-exposed
  site; `seaMonster` ← a `monster_pressure` stressor or condition, or `monsterThreat` `frontier` or `plagued`, on a
  `coastal` site; `exposedPort` ← access `port` with a population of 20 000 or more and no other key; an inland site → no
  key. `raider` is never produced from a dossier: the line has no raid or piracy word (CONFIRMED over its fifteen
  stressor types and the condition archetypes seen; its full condition registry was not read), so `raider` stays a
  standalone and pack key (J-V8.50). A change of the keys re-evaluates DR2's waterfront at the next epoch by item 106
  (f)'s least disruption.
* **`ruinEvidence`** (new; DR-V8.2; → `site.ruinEvidence`): the rows of V08 §2.6a (1).

### 2.6a Item 109's dossier sources and the burial and crypt trace (DR-V8.2 – DR-V8.4; C8-02)

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

**(2) The derivation rows** (§7.7's table form; numbered by the coherence pass, BCR-V8-30):

| row | map fact | dossier inputs, in the order read | rule (its home) | chance | the bar it holds |
|---|---|---|---|---|---|
| DR-V8.2 | the ruin system's existence, source, age and centre | `site.ruinEvidence`; `history.ageYears`; the `ancient_ruins` and `magical_node` deposit sites | V04 §3.5.0a (1)–(3) | V04's (`sewer`, keyed by the source's lineage) | a dossier with `ancient_ruins` or a `ruined-landmark` record has a ruin system, else a stated reason (T-V8-32) |
| DR-V8.3 | the cavern drivers | `site.terrain` → the relief class (`site` row); the mining deposits | V04 §3.5.2's relief rows, fissure gate and mining test | V04's | a `mountain` dossier's relief is `mountainous`; a mining deposit sets the mining test (T-V8-32) |
| DR-V8.4 | the burial faces, the crypted churches and the church count | the records of (3); `stone_quarry`; `history.ageYears` | the classes by V11's `kinds` and `ladders` rows; the crypts by V03 §2.4 with V02's basement; faces, rank, count, ratchet and stagnation by V04 §3.5.1 and §3.10 | none at the port | T-V8-33 |

**(3) The burial and crypt trace, record by record** (the line's names, CONFIRMED over the 35 births: every birth
carries exactly one burial record for its tier, and a metropolis the `Cemetery network` beside it; receipt
`scratchpad/volumes/cv8/burial-census.out`):

| record | class (V11 `kinds`) | ladder step | feeds | never |
|---|---|---|---|---|
| `Burial ground` (thorp, hamlet), `Graveyard` (village) | `cemetery` | REPLACEMENT (`graveyard` over `burial_ground`); both lessers of `parish_burial_grounds` (COUNT) (V11 §3.12; SS-26, SS-45) | a burial face below TOWN, which forms no catacomb (item 109 (k) (1)); V07's village routing | a catacomb source |
| `Parish burial grounds` (town) | `cemetery` (dispersed) | COUNT over `graveyard` and `burial_ground`, its members the burial faces, one per church plot's churchyard (V11 §3.12; SS-26); itself a SIZE lesser of the city's record (V08 §13 X4) | V04's candidates, beside each church plot's churchyard part (derived map-side, §4.9) | — |
| `Burial grounds and charnel house` (city, metropolis) | `cemetery`, with its charnel part (V11, routed) | SIZE over the lesser burial records | V04's candidates; the charnel house the surface ossuary whose fill item 109 (k) (5)'s bone reuse raises | — |
| `Cemetery network` (metropolis) | `cemetery` members beyond the gates (V11's COUNT row: one per gate on a through route, each extramural) | COUNT | V04's candidates, a metropolis's first (item 109 (k) (2); V04's rank) | — |
| `Monastery or friary`, `Multiple monasteries`, `Major monasteries (5-10)` | `monastery` | COUNT for the plural forms | each monastery's burial yard a burial face; its church counted once in the church count | — |
| `Cathedral (10,000+ only)`, `Great cathedral` | `cathedral` | `Great cathedral` SIZE over the other (V11, inferred) | V03's crypt, always, the settlement's largest; both present (`metropolis-3`) → ONE cathedral building, the lesser re-bound as its member (`ladder_merged`), one crypt | a catacomb source |
| `Parish church`, `Parish churches (2-5)`, `(10-30)`, `(50-100+)` | `church` | COUNT; a lesser range merged into the greater's (item 108 (c)) | V03's crypts by the crypted-class rows; V04's CITY and METROPOLIS count reads the placed church members plus the cathedral and each monastery's church, each once | a catacomb source; the sum of two ranges (all three metropolises carry both `(10-30)` and `(50-100+)`) |
| `Access to parish church` | `@absent:church` (V11 §3.11; SS-10) | — | S2's `church` `min` and per-capita demand 0 at the settlement unless another record binds a church (the parish church is a neighbour's); at a village rung through `church`'s `villageForm` by V07 §3.11 step 1 (SR1-02) | a building; the count |
| `Priest (resident)` | `@office` | — | an office on the church | a building; the count |
| `stone_quarry` (a deposit) | its `DepositSite` and S12a's quarry working | — | at CITY and METROPOLIS only, a worked-out working (its deposit `depleted`, or V04's own exhaustion) is V04's quarry-ossuary candidate, taken after every burial face | a candidate at TOWN |
| `Underground city` | `@layer:undercity` | — | the undercity's `require` (DR17); evidence `undercity` | — |

A church plot's churchyard part is a burial face (derived map-side by V04 and V11); the church building never is, and
neither is the cathedral or a monastery's church (0 catacombs sourced on a church, T-V8-33).

**(4) Closures, steps and deaths (the diff rules of DR-V8.4; V08 §3.5, §3.6).**
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
  `burial_grounds_and_charnel_house` SIZE over all three (town to city); V11 §3.12, SS-26, SS-45), the port re-binds the
  lesser's faces to the greater's key (a `rebind`, noted `ladder_promoted`, V08 §3.5.1), never a `remove`. A demotion below TOWN removes no
  catacomb (V04's ratchet; V06 and V07's maintenance mode).
* **New cemeteries** are seated by S10b's least disruption; one begins a catacomb only where V04's count allows.
* **Deaths.** A `plague` or `plague_onset` condition or stressor standing at an epoch, and a calamity's `deaths` in its
  `CalamityRef` (V08 §3.6), are that epoch's burial input for item 109 (k) (4)'s capped growth (V04 §3.10).

### 2.6b Item 110's dossier inputs — the water system, the high-ground landmarks, the toll bridges and the culture (DR-V8.7, DR-V8.8; C8-41 – C8-45)

Item 110 (b), as the owner revised it ~23:40 ("i think raised ways for cities is fair for the genertor to generate adn
then a user can decide to add or remove"), GENERATES raised ways at CITY and METROPOLIS, "each a soft rule with a table
chance and a count cap per rung", and "A TOWN gets them only by declaration". The reasons, parts, chances and caps are
the base's (item 110, homed by the coherence pass) with volume V11's rows; building them over time is volume V06's; the
terraces and retaining walls are the base's with volume V01's wards; stepped massing and deck plots are volume V02's.
The port owns four things: which dossier facts feed which reason, the rung gate, the binding rule (nothing item 110
generates is ever dossier-bound, V08 §4.1) and the dossier's toll bridges.

**What the pinned line says about water (CONFIRMED; critique C8-41's census over the 35 births).** Every tier carries
exactly one required record of the line's water group: `Water source` (thorp, hamlet), `Multiple water sources`
(village, town; V11 binds it to `@pin:well`), `Aqueduct or water system` (city and metropolis, base chance 1, described
by the line as engineered water brought into the city from beyond it; V11 binds it to `conduit_house`), and at
metropolis the optional `Advanced water infrastructure` (base chance 0.6, several aqueducts; a SIZE member of the city
record, V11). All 7 CITY and METROPOLIS births carry the city record; `metropolis-2` alone carries the metropolis one.

**(1) DR-V8.7 — the water system's inputs to item 110 (b)'s aqueduct.**

| row | map fact | dossier inputs, in the order read | rule (its home) | chance | the bar it holds |
|---|---|---|---|---|---|
| DR-V8.7 | the aqueduct reason's inputs: whether the water need counts as met, the terminal, the cap step, the source candidates and the chance modifiers | the rung (DR23); the records bound to `conduit_house` through V11's `kinds` and `ladders` rows (the city record and its SIZE member); the demand records — those bound to `bathhouse` and to the classes whose V11 row needs running water; `site.terrain` through the `site` row (`riverside` → a river inside the walls; `desert` → the arid biome; `hills`, `mountain` → a relief that can hold a higher spring); the realm cell's river (DR1); the `hot_springs` deposits (never a source); `site.culture` (V11's culture modifier) | item 110 (b)'s aqueduct reason (the base) with V11's chance, need, cap and terminal rows | the reason's own stream (the base's) | T-V8-36 |

(a) **The rung gates, never the tier word.** SettlementForge's `city` spans 5 001 – 25 000 people and its lower part is
our TOWN (DR23; research mapping T1: 4 of 24 surveyed SettlementForge cities). At TOWN the water record binds its building
or pin only and never raises arches; a DM's T4 `raised` stroke or an aqueduct-class declaration is the only TOWN
aqueduct (item 110 (b)).
(b) **At CITY and METROPOLIS the need test counts as met** when a dossier record is bound to `conduit_house`: the dossier
states that water is brought in from beyond the city. The record is required at chance 1 on every SettlementForge city,
so it never scales a chance (it would be one constant): the table chance, the rung's cap and the source-in-reach
condition stay in force. With no higher spring or upstream river within reach, no arches are built; the conduit house
stands alone, fed by the base's cistern rule, and the build report notes `aqueduct_no_source` (§5.4's report, a
generator note).
(c) **One water system.** When an aqueduct is laid, its terminal site inside the walls is reserved, and the aqueduct's
generator binds the conduit house bound to the record to that terminal by V11 §3.24.7 (1)'s criteria row
(`pc/aqueduct/<way lineage>`; J-VI.9, IN-V08-3; SS-38 — V08 §13 X5's `near` row is superseded); with no aqueduct,
V11's `highGround` row sites it as today.
(d) **Several aqueducts.** Each SIZE member merged into the water record (item 108 (c); the metropolis record) raises the
rung's aqueduct cap by one; the extra aqueduct ends at a public fountain or cistern under the same source-in-reach
condition.
(e) **Fate and condition.** An aqueduct whose terminal the dossier's conduit house took records a map-side link to that
use's id (BCR-V8-28; the field is item 110's raised way's). Through it, the record closed (`removed` or a closing fate)
leaves the aqueduct standing, dry and disused; the record ruined ruins its arches by least disruption; an
`infrastructure` impairment applies the `impairments` row's condition steps to the arches. Removing the record never
removes a standing aqueduct; its decay is volume V06's.
(f) **Rung changes.** A promotion past 10 000 makes the reason eligible at the next epoch, where volume V06 builds the
aqueduct over time; a demotion keeps every standing raised way (V08 §3.10: the standing fabric survives), and V06 ages
it.
(g) **Custom content.** A custom record that item 104 (a)'s resolution at fold puts in the `water-supply` family
(V08 §3.5 (5) (f); V11 §3.13.1) is a water-system
record for (b) – (e), but never declares arches at TOWN (J-V8.68).
(h) **Hot springs.** A `hot_springs` or `hot_springs_mineral` deposit is never an aqueduct source: it gives a bath-house
site and mineral water, not a drinking supply (J-V8.69).
(i) **Parity.** The line doubles an aqueduct's likelihood in a desert and lists an aqueduct among the ways a tannery's and
a dyers' guild's water need is met (CONFIRMED at `5d699cc68`); the `site` row's `desert` and the demand records reach
V11's aqueduct chance and need rows, so both behaviours are reproduced by our own rows, their values V11's.

**(2) DR-V8.8 — item 110 (b)'s dossier landmarks on high ground.**

| row | map fact | dossier inputs, in the order read | rule (its home) | chance | the bar it holds |
|---|---|---|---|---|---|
| DR-V8.8 | the landmarks an elevated road may link | the dossier-bound institutions whose class significance (§10.2; item 72) is at least V11 §3.24.2's `elevated.landmarkMinSignificance` (the castle's significance; V11's calibratable setting beside `landmarkFactor`; SCC-R2C-10, J-V8.70) through V11's `kinds` rows (`citadel` → `castle`, `palace_government_complex` → `palace`, `cathedral_10_000_only` and `great_cathedral` → `cathedral`), and the custom records with `landmarkLevel` `landmark` (whose significance V08 §5.2 raises); each read at its S3 reservation (castle, palace, precinct), fixed before the end of S6 where the road is committed; its high ground is the relief's | item 110 (b)'s elevated-road reason (the base) | the reason's own stream | T-V8-38 |

The landmark strings of `quarters[].landmarks[]` are never read by this row (J-V8.70): the 49 surveyed strings are
street, yard, pin and institution names (537 of 1 281 strings in the wider survey are institution names, research
mapping row 21), none a high-ground landmark; they name ways and pins by the `landmarks` row, and reading them here would
count an institution a second time. Every SettlementForge CITY and METROPOLIS birth carries at least one record this row
reads (7 of 7: a citadel, a cathedral, a great cathedral or the palace; CONFIRMED).

**(3) The toll bridge on a dry site (BCR-V8-32; J-V8.65).** The births carry 11 `Toll bridge` records in 11 dossiers;
9 stand where neither terrain nor access gives a river or a coast, 6 of them at base-rung TOWN (CONFIRMED). The `kinds`
row's `implies: 'bridge'` (V08 §2.6; V11 writes the cell, today for `toll_bridge` only) makes DR1 read the record at
creation: on a site whose terrain, access and realm cell give no river or canal, the site row's river chance becomes 1
for the smallest watercourse class (a brook) whose course crosses the through route of the longest approach inside the
frame. The bridge is then a ground-part-0 deck over water — §5.3's invariant untouched, no raised way, no declaration.
V11's toll house takes its `near` → bridge alternative first when that bridge exists; whether it may stand on the deck is
V11's `deckOk` (item 110 (d)). On `desert` without `oasis_water`, or where S1's relief cannot carry the brook across the
approach, the toll house takes its gate alternative and the build report notes `toll_bridge_dry` — never a raised way at
TOWN; at CITY and METROPOLIS a viaduct raised by item 110 (b)'s own drop reason on that approach may carry the toll. The
site is creation's (§7.7 One path): a toll bridge record arriving by a later absorb never re-draws the terrain — its toll
house takes a bridge where a watercourse already crosses an approach, else the gate, noted `toll_bridge_dry`. A "…Bridge"
landmark string names the implied bridge when one exists (the `landmarks` row unchanged). The village births carrying
the record reach volume V07 through the same `kinds` cell (routed, V08 §13 X7).

**(4) The culture's reach (C8-44; J-V8.71).** The line has no era field: the culture is the only input of its era and
region preset (research mapping row 13). So the `era` row keeps `c14` for every culture, item 110's era modifier is one
constant on dossier maps, and the culture is the discriminator. `site.culture` gains two readers: item 110 (b)'s
aqueduct chance, through V11's culture modifier rows (one per V11 culture row; V11 §3.20.3 covers the twelve words), and
DR15's template family → V11's stepped specialisations for item 110 (c) — stepped temples, terraced palaces, tiered
towers (V02 X17) — keyed by culture and class. The port supplies no religion that builds in tiers: a deity is a
temple's dedication (F16), never a building form. Which cultures build in tiers and each culture's aqueduct modifier are
V11's content (routed, V08 §13 X6).

**(5) What the port never does for item 110.** It binds nothing item 110 generates: a terrace, retaining wall, raised
way or deck plot carries no `Identity.dossier`, even when a dossier record fed its reason, and its provenance names that
record for the clerk's `why` (V08 §4.1, §4.4 (2); BCR-V8-31). It reads no retaining wall, deck or raised way from
SettlementForge — the line has none, and its world-state works ledger is not read (J-V8.72). Item 110's generated content
rides the opaque document and the pictures through the base renderer and §7.5's migration.

### 2.7 Lifecycle of every new state field

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MapRecord` (2.1) | the host at first commit of a `created` result, every field from the message (C8-04) | the client at mount, offer, refresh | the host's store, compare-and-set on `logHead` | n/a (host data) | a DM's "restore previous map" swaps in `backups[0]` (V08 §4.2), then every open session gets a fresh `doc.load` (C8-28) | the client's record schema version; the host migrates by the client's release notes |
| `dossier.*`, `module.status`, `party.render` and `party.rendered` messages (2.2) | client / module per V08 §3 | the other side | never stored | n/a | n/a | the bridge's `protocol` number in `ready`; an unknown type is ignored and reported (§11.3) |
| host-minted `docId` (2.1) | the host at creation | `generate`, `logHead` | the document (§2.9) | kept | n/a | none |
| `DossierBinding.adapter` (2.3) | `creation` | `absorb` (V08 §3.8) | the dossier block | rebuilt from the log's last dossier event's `DossierRef.version` and the port's report | n/a (no undo of dossier events) | rebuilt at first load (§7.5) |
| `DossierBinding.quarantined` (2.3) | `digest` / `absorb` (V08 §3.9) | the next absorb's diff (skips these keys), the report, T-V8-9 | the dossier block | kept | n/a | rebuilt by folding the `dossierFacts` events, each of which carries the whole list after its absorb (V08 §3.6 (4); C8-12) |
| `absorbed` retention (2.3) | each committed absorb | F22's match, the report | the dossier block | kept | n/a | the fold trims `changeIds` older than the newest 64 entries, so the stored block equals the rebuild (V08 §2.3; C8-13) |
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
| carried `chain`, `dependency`, `calamity`, `evidence`, a relation's `trend` and `sign`, a condition's `source`, `port-values.latitudeDeg` and `.threats` (2.3) | `creation`, `absorb` | the diff | the dossier block | kept | n/a | absent in a document made before the revision: filled at its next absorb as a declared remap with no map event (V08 §3.8); a calamity dated at or before the document's last absorbed week is carried with no event (the map never saw it happen) |
| `Assignment.custom` (2.8) | the creation prefix's `assign` of a custom record; a `custom_revision` `setAttr` | the fold's re-resolution (V08 §3.13 (10)); the clerk's `why` | the model (the assignment) | kept | never (a dossier event) | absent on an older document: written by the next absorb's `setAttr`, a declared remap |
| digest additions of the revision: `site.ruinEvidence`, `site.threats`, `site.latitudeDeg`, `calamities`, the extended `economy.chains`, `step`, `lesser`, `qualifiers` (2.5) | the adapter | DR-V8.1 – DR-V8.6, DR2, DR9 | carried by the kinds above | n/a | n/a | as the carried kinds |
| the `kinds` row's `implies` column (2.6, 2.6b) | V11's rows | DR1 at creation only | `@plat/tables`, pinned in the recipe | a table edit re-derives by §7.6 (at an `upgrade`, never at an absorb: the site is creation's) | an `editTable` undo | table versions; absent → no implied feature |
| DR-V8.7 and DR-V8.8's inputs (2.6b) | the adapter and the pinned rows, from facts already carried (institutions, deposits, site, culture) | item 110 (b)'s reasons at creation and at every epoch | nothing new: they are read from carried facts and bound uses | re-read at each regeneration and epoch | n/a | none |
| the aqueduct's link to its conduit house (2.6b (1) (e)) | item 110 (b)'s laying of the aqueduct | the fate and condition rules of 2.6b (1) (e) | the model (the raised way's field, BCR-V8-28) | kept while both stand; a re-laid aqueduct re-links | the log's | a document without it has none |
| a removal of generated item-110 content (4.1, 4.3) | the base's delete of generated content (a DM's, or an accepted clerk proposal's) | every regeneration, absorb and epoch: the slot stays closed | the log (the delete event) | held; a new slot opened by a later cap increase is new and announced (4.6) | the log's undo re-opens the slot | §7.5's mapping hands the tombstone to its successor |
| the frame's `host.state` copy, its `HostSlots.historyLines` and the players' view (`ViewOpts.viewAs` set to the party key) (2.2, 3.1 step 7 (b), (c), 3.14 (5)) | the client's `host.state` after each `doc.load` and each change of `party`, `backups` or `partyPictures.at`; the lines from the differences of successive values, their names and targets read per key into the handler's cache (dropped at each new line and at each head move its one `subscribe` on the loaded document reports, §11.2; J-V8.109, J-V8.110); `playersView` from `seePlayersView` or the header's toggle | the header's controls, the restore dialog, the history panel's party lines (V9 §4.10's group), §9.2's filter for the frame's drawing, labels and reads (BCR-V9-23) | never: the session's memory and the view's options, no view-state key, no store write, no event | re-sent after every load, restore, new map and `switchTo`; the players' view re-resolved on a new `party` and on an absorb that changes the binding rows; the handler's `subscribe` registered at each `doc.load` and released at `close` and `switchTo` (SR3-13 (c)) | the same toggle | none (new with protocol 2; a client of another protocol is refused at `ready`, V08 §8.3 R4) |
| a derived `DepositSite` (`res:derived:<landuse>`; 2.6 `deposits`, 3.11) | the creation prefix or an absorb's `dossierRecord` put, when a record needing the land use is present and no deposit opens it | S12a (its site and land use, DR19), V07 §3.9, the renderer and labels as any `DepositSite` (5.2) | the model (a record, §2.7) | kept (a record); S12a's derived fields recomputed | never an undo target (§7.4) | none (new): a document made before it gains the site at its next absorb, as an addition placed by least disruption |
| `host.action` (2.2, 4.2) | the frame's header controls (owner, editor) | the client → `MapSession.on('action')` → the host's operation (V08 §4.2) | never stored | n/a | each row's own undo (V08 §4.2) | the bridge's `protocol` |
| `PortNote.msg`, `.keys` (2.4; SS-44) | the port, with each note it writes (`custom_resolved` and `unmapped_kind` after the fold, V08 §3.6 (4); SR4-07; their `class` words V11's `label` cell or a pin kind's `host.pinKind.<kind>` row, SR5-07, SR6-06) | the history panel, the report panel (through `GenerationReport.dossierNotes`, SR-23) and the host's report (V08 §4.6); T-V8-14 | with the note: the ledger event (`event` and new `standing` notes), `DossierBinding.notes` (`standing`), `dossier.result` only (`report`) | a re-derivation re-renders the stored `msg`; the port recomputes notes only when it runs | n/a (no undo of dossier events) | a note stored before these fields reads `msg` `{ key: 'host.note.<kind>' }` with no args and `keys: []` |
| `dossierFacts.notes`, `.notesCleared` (3.6 (4); SS-44) | each port run, in its ledger event | the fold (below); V9 §4.10's absorb group | the log (the event) | replayed by fold | n/a | an older ledger event without them folds as `notes: []`, `notesCleared: []` |
| `DossierBinding.notes` (2.3; SS-44) | the fold of each ledger event: the old list less `notesCleared`, plus the `standing` notes of `notes`, in identity order | every derivation's report build, which copies it into `GenerationReport.dossierNotes`, the report panel's read by `report(h)` (V08 §4.6; SR-23); the next absorb's new-or-cleared test (V08 §3.6 (4)) | the dossier block | rebuilt by fold | n/a | absent in an older block: `[]`, so the next absorb carries every standing note as new |
| `GenerationReport.dossierNotes` (4.6; SR-23) | every derivation's report build and the verification replay on load: the document's `DossierBinding.notes` at the report's seq, in identity order; `[]` for a document with no binding | the report panel's dossier section through `report(h)` (V9 §5.7; V08 §4.6); T-V8-14 | the document's `derived` section with the rest of the report, excluded from the canonical form and every digest (§5.4) | rebuilt with the report by every derivation | none of its own: an undo's re-derivation rebuilds the report, and the binding it copies is no undo target | none: a report saved without it shows `[]` until the verification replay on load rebuilds it |
| `MapRecord.held.reason`, `dossier.result.held.reason` (2.1, 2.2; SS-44) | the port's `held` note on a refused offer (V08 §3.9) | the banner and the frame's held notice (V08 §5.1); the thumbnail slot at a refused creation | the host's store, beside `held`, as handed | replaced by the next refusal; cleared with `held` | n/a | an older `held` without it shows `host.status.held` with the row of its `code` (E_RUNG_UNAVAILABLE: `.village`) |

### 2.8 Custom content — the records, the chains and the optional library input (item 104's host side)

**What the pinned line gives (CONFIRMED on the `town-cc-1` fixture, generated on `fp/integration-2026-09-23` @ `5d699cc68`
with SettlementForge's reference custom pack; `research/sf/dossier-outputs.md` §3.5, `research/sf/dossier-model.md` §13,
and the line's custom-content manifest read read-only for item 104).** A custom institution is an ordinary
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
// additions to §14's DossierInstitution (BCR-V8-13) — present only on a record the dossier marks `source: 'custom'`; replaces §14's `custom?: { uid }`
  custom?: { uid: string /* localUid: the `inst:uid:` binding key's part */; definitionId: string; revision: string /* customDefinitionRevisionId */;
    contentHash: string /* customDefinitionContentHash: a new hash is a new revision (item 104 (e)) */;
    categoryText: string /* the author's free text, trimmed, ≤ 100 chars; DossierInstitution.category holds its normalised form */;
    group?: string /* the catalogue category or content group the text names: `categories` (V08 §2.6), then V11's synonym rows; absent when none */;
    scene?: { profileId?: string /* one of the 17 archetypes, else absent and noted unmapped_word */; landmark: boolean /* landmarkLevel 'landmark' */; material?: string /* materialFamily */ };
    required: boolean /* the author's essential flag */;
    keywords: string[] /* item 104 (a) (6): the keys of V11's keyword table found in the name and the description, sorted, ≤ 16; the description itself goes no further */ };
// additions to §14's DossierDigest (BCR-V8-13)
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

**Additions to the carried facts (V08 §2.3; BCR-V8-8).** The institution fact gains the `custom` part above less
`categoryText` (a change of the text alone that maps to the same `group` is no change). Three kinds are added:

```ts
  | { k: 'custom-def'; revision: string; contentHash: string; fields: Omit<CustomLibraryEntry, 'definitionId'|'revision'|'contentHash'> }   // key def:<definitionId>; present only once a library entry was admitted
  | { k: 'custom-chain'; active: boolean; nodes: string[] /* flow order: the resource's key (or 'name:'+name), the processors' keys (or names), the outputs' uids (or names) */; exports: string[]; imports: string[] }   // key chain:<chainId>
  | { k: 'custom-service'; provider?: string; serviceCategory: string }   // key svc:uid:<localUid>
// a custom resource is the existing 'resource' fact under res:uid:<localUid>, with custom: true
```

**The staged records the chains and services become (BCR-V8-14; new schema-complete records beside §2.7's staged ones).**

```ts
// @plat/model (§2.7) — filled only by `dossierRecord` events (V08 §2.5); read by S10b's chain pulls (the base as g item 104 applies, with V11's rows) and §10.3
interface CustomChainRecord { id: Id; key: string /* chain:<chainId> */; label: string; active: boolean;
  nodes: { role: 'resource'|'processor'|'output'; key?: string /* a binding key: res:…, inst:…; an output's def:<definitionId> */; name: string }[];   // flow order
  endpoints: { flow: 'import'|'export'; label: string; partner?: string /* a trade partner's binding key when the dossier's trade links name one for the good; else absent: the main gate or harbour (item 104 (h) (6)) */ }[];
  volume: 'minor'|'moderate'|'major'|'backbone' /* item 104 (h) (2): the admitted library's economicWeight of the chain's final processor, else 'moderate' */;
  crossLinks: { from: string; to: string /* binding keys; a catalogue node by its inst:cat: key */; via: 'requires'|'produces'|'requiredInstitution'|'requiredResources' }[] /* item 104 (h) (4); only from admitted library fields */;
  lifecycle: Lifecycle /* §2.8; retired when the dossier no longer lists the chain */ }
interface CustomServiceRecord { id: Id; key: string /* svc:uid:<localUid> */; name: string; serviceCategory: string;
  provider?: string /* the provider institution's binding key: item 104 (h) (5) puts the service inside it or on an adjoining plot */; lifecycle: Lifecycle }
```

**Keys (BCR-V8-14, additions to §7.7 item 12's key law).** `chain:<chainId>` (the dossier's chain id — stable while the
chain's node set is unchanged; a chain whose nodes change is a new chain, which is SettlementForge's own identity, J-V8.42);
`res:uid:<localUid>` for a custom resource (beside `res:<key>` for a catalogue deposit); `svc:uid:<localUid>` for a
custom service; `def:<definitionId>` for a library entry's carried fields. None re-binds: a custom item is renamed in
SettlementForge without changing its uid, so its keys never change (item 104 (e): "a rename changes nothing").

**The assignment's custom part (C8-17; BCR-V8-21).** A custom record's dossier-backed assignment carries
`Assignment.custom?: { uid: string; revision: string; contentHash: string }` — dossier-owned (§7.7 item 11), written by the
creation prefix's `assign` and changed only by a `setAttr` on `custom.revision` with cause `custom_revision`. Its fold
(V08 §3.13 (10)) re-reads the institution's carried fact and, when present, its `custom-def` fact, re-resolves item 104
(a)'s profile and issues S10b's `dossier` request for the use (least disruption), the report's reason naming the revision.
The custom weights — `economicWeight`, `criticality`, `defenseRole`, `authority` — are read from the carried `custom-def`
fact at resolution time (V08 §3.11), never from a params delta, so a revision needs no `editTable` and no params rewrite.

## 3 Generation — the port pipeline, end to end

### 3.1 The embed: the Map tab, the frame, the boot

1. **SettlementForge's side.** The Map tab is a lazy chunk imported by nothing eager, so SettlementForge's first paint
   is unchanged (research: C-10, E-8). The chunk holds SettlementForge's mount component and `@plat/bridge-client`
   (≤ 12 KB gzipped with the party viewer, V08 §6). **A player's tab** (audience `player`) calls `mountParty`: it reads
   the record's `partyPictures` and shows them in the client's small pan-and-zoom viewer, with no frame, no module and no
   message (V08 §3.14; C8-01). **The DM's and co-DM's tab** calls `mount`: the client reads the map record
   (`MapStore.read`); if a thumbnail for the viewer's key exists it draws it at once as a static image (J-V8.24); it
   creates one `<iframe>` with `src = moduleOrigin + embedPath + '#p=2'`, `sandbox="allow-scripts allow-same-origin
   allow-downloads"` (no top navigation, no pop-ups, no forms), `allow=""`, `referrerpolicy="no-referrer"`, sized to the
   tab (J-V8.7). SettlementForge's CSP adds the module origin to `frame-src`. `allow-same-origin` is the module's OWN
   origin, which its workers and its cache need; it grants nothing on SettlementForge's origin. `mount` refuses any
   audience word other than `dm` and `co-dm` before a frame exists.
2. **The module's side.** The module origin serves static files only: `embed.html` (the second entry point of
   `@plat/app`, host mode — no file operations (V9 §2.2's `fileMenu: false`, V08 §5.1), no `DocResolver`, bridge-driven;
   BCR-V8-3), the lazily loaded chunks of the current output version and the retained N−1 and N−2 (§6.4), fonts and
   the stamp-tile asset. Its response headers:
   `Content-Security-Policy: default-src 'self'; script-src 'self'; worker-src 'self' blob:; img-src 'self' data: blob:;
   connect-src 'self' <the clerk origins>; frame-ancestors <SettlementForge's app origins>`, where `<the clerk origins>`
   is a deployment row by volume V10's configuration (V10 §3.17): none under C (SettlementForge's own assistant, the
   default recommended here) and under `off`; the proxy's origin — one of SettlementForge's app origins, on the embed's
   allowlist — under B; the provider's API origin under A. No cross-origin isolation headers (generation needs none,
   §11.2); `Cache-Control: immutable` on hashed chunks. The module holds no account, cookie or secret: it trusts only
   messages whose origin is on its allowlist and whose source is its parent window (§11.3).
3. **Boot.** `embed.html` binds `WindowPostMessageTransport` to `window.parent` with the allowlist, sends
   `module.status { booting }`, starts the generation worker, the derivation pool (up to three workers, §4.1) and the tile
   worker, loads the model packages of the current output version, and sends `ready { outputVersions, schemaVersion,
   protocol: 2, adapters: [{ line, version }] }` (BCR-V8-1). The client flushes its queued messages in order (§11.3).
   `ready` within `bootTimeoutMs` (20 s) or the client re-creates the frame once; a second miss leaves the thumbnail with
   the note "the map could not start" and a retry button (V08 §3.9 row B1).
4. **Load.** The client sends `doc.load { bytes: snapshot, role, session, audience }` — the role and the audience word
   both; the module re-derives role and key from the audience by §14's table and takes the lower of the two (J-V8.29;
   BCR-V8-1) — then `doc.apply { baseLogHead: snapshot.logHead, events: tail }`. The module opens the snapshot (§2.9
   steps 1–5: frozen view outside the window, corrupt cache replayed, verification in the background), folds the tail,
   and draws; the first live frame replaces the thumbnail. If `snapshot.outputVersion` is older than the current and
   inside the window, the document replays exactly under its own version and `module.status { upgrade-available }` goes
   to an owner's client only (V08 §3.8).
5. **Offer.** Then the client decides whether to offer the dossier (V08 §3.2) and commits the result (V08 §3.3).
6. **Switching settlements.** `MapSession.switchTo(spec)` — the same fields as `mount` (C8-40) — reuses the frame:
   `close` on the handle, then load and offer the next record — boot is paid once per page (J-V8.30). One document is
   live per frame; the previous one's memory is released before the next is opened (§12.8's line holds per document,
   not per campaign).
7. **Bridge to the shell** (SR-03; V9 XV-V9-17; J-V9.81). The embed entry's **bridge handler** — this volume's glue in
   `embed.html`, the one piece of host-mode code between the transport and `@plat/app`'s shell — fills the shell's two
   host surfaces and is their one channel to the bridge, so neither the shell nor volume V10's harness touches the
   transport.
   (a) **`ClerkMount.host`** (V9 §2.10). Each `clerk.config` body (BCR-V10-7 (a)) becomes `config()`'s value and is passed
   to every `onConfig` handler, and its `mode` becomes `HostSlots.clerkMode` (the shell's configuration rebuilt, V9 §2.2);
   before the first one `config()` is null and `clerkMode` is `off`. Each host `preview { events, view: true, proposal }`
   is yielded by `proposals` in arrival order; a `preview` without `proposal` is §11.2's dry run, answered and projected
   by V08 §5.4 (3). The harness's calls post the messages: `needsToken()` → `clerk.needsToken {}`, `refused(reason)` →
   `clerk.config.refused { reason }`, `answer(id, status, seqs)` → `clerk.proposal { id, status, seqs? }`, which the
   client surfaces as `clerkNeedsToken`, `clerkConfigRefused` and `clerkProposal` (V08 §2.2).
   (b) **`HostSlots`** (V9 §2.2). `header` — the renderer of V08 §4.2's controls, each shown to the roles its row names,
   posting `host.action` or acting in the frame as that row says; `banner` — the frame's own strips: V08 §5.1's "Showing
   what the players see" while the players' view is on, and the held notice of V08 §5.2 (`host.status.held` with the reason
   row `MapRecord.held.reason`, V08 §5.1, §3.9) — a frozen view's notice is the
   shell's own `error.frozen` strip, never this slot's (V9 §3.14 (b); J-V9.97; XV-V9-24) (the tab's status
   banner is SettlementForge's own, V08 §5.1's table; V9 XV-V9-20);
   `lockedControls` — the control-registry ids (§7.8) of the basic panel's population and tier word, each with the reason
   `host.locked` ("Set by {host}", V9 §5.12, read with `hostName`: "Set by SettlementForge"; a `host.*` row, V08 §13
   X12); `exportFormats` — by V08 §5.4 (2): every format §11.1's key rules admit for the frame's role and key, saved to the
   user's device; `fileMenu: false`; `historyFilter` left unset (only owner and editor frames exist, both at `secret`,
   V08 §3.11, so no history row is withheld); `clerkMode` by (a); `hostName: 'SettlementForge'`, a deployment constant of
   the SettlementForge build of the embed beside step 2's deployment rows (another host's build sets its own);
   `historyLines` (V9 §2.2; SR2-01, SR2-03; XV-V9-21) — the handler's list, newest first, made from successive `host.state`
   values: a line per change of the party, the difference between two successive `party` values this session received —
   `host.revealed` "Revealed to the party: {places}" for places added to `party.places`, `host.hidden` "Hidden from the
   party again: {places}" for places removed, `host.partyTier` "The party's base knowledge is now {tier}" for a changed
   `party.tier` ({tier} "public" or "local") — each held as its `at` (the time the value reached this session) and its
   places in `PartyKnowledge.places`' form (binding keys and addresses, V08 §2.1). `{places}` are the names of the places
   admitted by the key that `list` is called with (V9 §2.2; the shell passes `effectiveKey()`, V9 §2.10; SR2-23), and
   `targets` their entity ids. Each place is read by `query(h, { kind: 'entity', dossierKey } | { kind: 'entity', id }, {
   admitAs: that key })` (BCR-V9-36, BCR-V10-22) — a binding key by `dossierKey`, a collective record by each of its
   members' keys (`<key>#k`, V08 §2.3; named once, its targets the members answered), an address by `id` — and named by
   the answer's name: a place answered `withheld` is neither named nor targeted, one answered `null` is named by its key
   with no target, and a reveal or hide line left with no place is not listed (SR2-24; J-V8.106). Since `list` returns at
   once and `query` answers by promise (§11.2), the handler keeps the answers in a cache keyed by the knowledge key,
   dropped when a line is added and when the document's head moves (a commit or an applied tail) — the head move read from
   the `doc.changed` `ApiEvent` of the handler's one `subscribe(h, …)` on the frame's document (§11.2), registered at each
   `doc.load` and released at `close` and `switchTo` — firing `onChange` then, so the shell lists again (SR3-13 (c);
   J-V8.110). `list` with a key the cache holds builds the lines from it; with a key it does not, `list` returns only the
   lines that name no place (`host.partyTier`, `host.picturesDrawn`), starts the reads and fires `onChange` when they
   answer, so the shell lists again (J-V8.109). The handler keeps no key subscription of its own (V9 §2.2) — the shell
   re-lists on `onEffectiveKey` (V9 §4.10) — and is never handed `effectiveKey` or `onEffectiveKey` (members of
   `ClerkMount`, V9 §2.10). And one line
   `host.picturesDrawn` "Party pictures last drawn {time}" from `partyPicturesAt`, made by the first value after a load
   and replaced at each change. `onChange` fires when a line is added or replaced. The list starts empty at each `doc.load` — the
   first `party` value after a load is the baseline and makes no line — and is never persisted, so it lists this
   session's party changes only, the record keeping no reveal history beyond `party.prev` (J-V8.58; J-V8.93);
   `newDocuments: 'download'` (V9 §2.2; SR2-02, SR2-03; SR3-06) — V9 §3.9's host-mode rule then governs every action
   that makes a new document; a copy of a dossier-bound document is detached (V6 §4.4): it does not follow SettlementForge
   (J-V8.93).
   (c) **`host.state`** (V08 §2.2). The handler keeps the latest `party`, `backups` and `partyPicturesAt` in the session's
   memory for the header's controls, the restore dialog and `historyLines` ((b); V08 §4.2, §4.6); the client
   sends them after each `doc.load` (step 4) and whenever the record's copies change. `playersView` — and the header's own
   "See what the players see" toggle — sets the frame's `ViewOpts.viewAs` with `setViewOpts` (BCR-V9-23) through the view
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
port note names it; C8-34). The skipped versions lose nothing: the port diffs carried facts against the newest dossier,
and each change's week comes from the dossier's receipts (§4.11 (2)), not from which versions were seen; an element that
appeared and vanished between two offers is never seen, which is the same answer SettlementForge's own end-state gives
(research: g§8.1).

### 3.3 Who runs the port, and who commits — the port leader

The port runs inside the module — in the generation worker, beside the document — and never in SettlementForge's bundle
(J-V8.1). Only an editing role — the DM (`owner`) or a co-DM (`editor`) — holds the document, the dossier and a port;
a player holds neither (C8-01; J-V8.2 revised). Because `digest`, `creation` and `absorb` are pure functions of (the
document, the dossier, `HostContext`, the adapter and table versions), every editing client computes the same events
from the same state, and every event the port emits carries the reserved session `host:port` (C8-15; BCR-V8-19), so the
events are byte-identical whichever editor computed them (T-V8-3) and no user's undo stack ever holds one.

* **Creation (no map record).** The host mints `mapId` and sends `dossier.offer { create: { mapId } }`. The module runs
  `digest` → `creation` (§14: the blueprint, the creation prefix, the binding and the carried facts) → `generate(blueprint,
  { docId: mapId, prefix })` (BCR-V8-2; J-V8.13), and replies `dossier.result { status: 'created', created: SnapshotBlock,
  factHash, report }` — the `.plat` bytes with their `logHead`, `lastSeq`, `outputVersion`, `schemaVersion` and
  `documentDigest`, all computed by the module (C8-04). The host calls `MapStore.create` with those fields as handed
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
* **Verification by every editor (C8-37).** An editing client that folds a `doc.apply` holding dossier events (session
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
until: now + 60 s } })`, refused when another live lease holds it; C8-30) → `doc.load` + tail → `dossier.offer` →
commit the result → if the tail now exceeds its compaction threshold, compact (V08 §3.7) → render the two thumbnails
and the party picture set (V08 §3.14; the tile worker is started for this step only) → release the lease with `status:
'current'` and `refreshPending` cleared → the document closed, its memory released → next. A lease is renewed after each
step and expires on its own; a page that dies mid-map leaves a lease that expires within 60 s, after which any page may
take the record (the record reads `stale` meanwhile). **Scheduling:** it runs while the DM is not interacting with a map
frame (the client pauses the queue when any visible map session receives pointer or key input and resumes 5 s after the
last), yields between maps, and stops on `AbortSignal` (page leave). **Page memory (C8-23):** the refresh frame does not
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
   non-empty string, `tier` a string, `population` an integer in [0, 10⁷] (0 is a deserted settlement, routed by V08 §3.6 (7); SS-21),
   `institutions` an array, `_seed` present); a
   failure → `E_UNKNOWN_SHAPE` listing up to 20 violations. An extra top-level key is never a failure (C8-03): an
   `optionalKeys` key with `read: false`, or a key neither list names, is dropped into `ignored` with an `ignored_key`
   note. The hand-made teaching file fails here (§14).
4. **Records.** Each institution, power, notable, condition and calamity record is checked for its own required fields
   (a name; for an institution a category string; numbers finite); a failing record is QUARANTINED — kept out of the
   digest, its key (when one can be formed) listed in `DossierBinding.quarantined` with the reason, a
   `quarantined_record` note — and the rest proceeds (J-V8.8; V08 §3.9 row B4). The diff never removes a quarantined key
   (below), and a quarantine whose key cannot be formed holds every absent institution key (C8-12).
5. **Keys, grammar and class.** The name grammar and the ladder step of V08 §3.5.1; §7.7 item 12's key law, with the
   housing-stock records set aside for DR7 by their `@housing` row; then the CLASS LOOKUP CHAIN (DR24): (a) a record with
   `renamedFrom` → the `kinds` row of the slug of its CURRENT name; (b) else its `kind` (catalogue key) → its `kinds` row;
   (c) else the slug of its name as a catalogue key → its `kinds` row; (d) else **the tags rung** (C8-33): when the record's
   tags map through `tags` to exactly one family whose generic class exists, that class, noted `unmapped_kind` with rung
   `tags`; (e) else its category's generic class (`categories`), noted `unmapped_kind` — for (d) and (e) the note is
   written after the fold, its `class` the class that builds the record at the document's rung (V08 §4.6's row, V08 §3.6
   (4); at a village rung V07 §3.11 step 4's tag fallback; SR4-07); (f) a CUSTOM record's (`custom`
   present, V08 §2.8) class and profile are NOT decided at digest (SS-12; J-VI.20): steps (b)–(e) do not run for it; the
   digest carries their inputs — `custom` (its scene tokens, `group` and keyword keys), `tags`, `category` and, when
   admitted, its `custom-def` fact — and item 104 (a)'s resolution with V11 §3.13.1's rungs (the author's map
   declaration for its `localUid`, the archetype, the category, the tags, the definition fields, the keywords with their
   `class` cell, then `generic-other`) decides both at fold, where the declaration is visible; the `custom_resolved` note
   is written after that fold (creation's `generate`, absorb's dry run, V08 §3.3) and names the deciding rung from the
   fold's report. A `kinds` row whose class is a pseudo-class routes the record to its reader (V08 §2.6's `kinds` shape)
   and gives it no roster class — `@absent:<class>[+<class>]` to S2, each named class's `min` and per-capita demand 0 at
   the settlement unless another record binds that class (SS-10). A catalogue record's siting-profile family is the
   `kinds` row's `family` when set, else the `tags` families of its tags (item 103 (a); how several families combine is
   item 103's rule in §10.2), else its generic class's own. Its political `role` is carried as given (DR12, J-V8.45).
6. **Powers, notables, circumstances, economy.** Standings = power ÷ Σ power, rounded to 1/10 000; a controlled list
   resolved through the line's stable part (§7.7 item 12); relations from `powerStructure.factionRelationships`, one per
   unordered pair, with the type word and the `direction` trend word (the `relations` row gives kind, sign and strength
   at the put, V08 §3.11); notables' workplace and power resolved by name to binding keys (absent when the name joins
   nothing, noted `name_unjoined`); deposits; every listed condition whatever its status, and the stressors normalised into it
   (`stressors`, else `stress` — one object or a list — each `{ type }` a condition `cond:stress:<type>` of archetype
   `<type>`, `source: 'stressor'`, severity 0.5, no weeks; C8-09); quarters; the government and `security` (V08 §2.5);
   **the economy** — each `activeChains[]` entry into `economy.chains` (C8-06): its resource joined to a listed deposit by
   `resourceKey`, its processors resolved by the rule below, its outputs through V11's `goodWords`, its `upstreamChains`
   as `chain:cat:` keys, its status word through `chainStatus`; `tradeDependencies` into `economy.dependencies` (the
   institution resolved by name, the severity through `dependencySeverity`); `primaryExports`, `primaryImports` with
   `necessityImports`, and `transit` into `economy.goods` through `goodWords`; **the calamities** — each `calamityHistory`
   entry keyed `calamity:<tick>:<slug(name)>`, its severity by `calamitySeverity` over its deaths and the population at
   its week (the latest `populationHistory` entry at or before it, else the current population), its targets resolved to
   binding keys by name (C8-09); **the sea threats** by the `threats` row; **the ruin evidence** by the `ruinEvidence`
   row; **the latitude** by DR-V8.1; every never-read key dropped into `ignored` (§7.7 item 1). Severities round to
   1/1 000 and percentages to 1/100 — the digest's resolution (J-V8.17), so floating noise in a host's arithmetic never
   reads as a change.
   **Resolving a name to a record** (chain processors, dependency institutions, calamity targets; C8-06 (3)): the exact
   name → that record's key; else the KIND FAMILY — the name and every record's name with their count range and
   qualifiers removed, case-folded, the last word's plural folded to its singular (`-ies` → `-y`, `-es` after s, x, z, ch
   or sh, else a final `-s`) — the one record of that family (several: the first in dossier order, noted `name_ambiguous`); else
   unjoined, kept by name and noted `chain_node_unjoined` (research mapping row 46: 2 585 of 3 381 processor names join
   exactly; the kind family is measured by T-V8-34 on the rest). **Goods words** (V11's `goodWords`): each label is
   resolved by V11 §3.13.5's matching rule; a label matching none is noted `unmapped_good` (SR1-26).
7. **Custom content** — V08 §3.13's steps.
8. **Ladder merges** — V08 §3.5.1 (c).
9. **Seed.** `settlement.seed = H32("plat:sf-seed" ‖ _seed)` (§14 item 2); `_seed` and `_config` go no further.

**The diff (`absorb`'s first step).** Carried facts (V08 §2.3) against the new digest's facts under the same keys, key by
key in code-point order, **skipping every key listed in `DossierBinding.quarantined`** (C8-12): a quarantined record
keeps its last carried state, and when a quarantined record's key could not be formed, every carried institution key
absent from the new digest is held — no `remove` — with one `quarantine_hold` note, until a readable dossier arrives.
For each element kind, the fields compared and the change they make (the `op` of §7.7's `DossierChange`; the receipt
table decides cause, fate and week, V08 §3.6):

| kind | key only in the new digest | key only in carried | fields compared when in both → op |
|---|---|---|---|
| settlement | — (a different settlement key refuses the absorb, `E_OTHER_SETTLEMENT`) | — | `population` → `population`; `tierWord` → `tier` (F8); `name` → `rename` (the title only) |
| institution | `add` (F1); under a key carried as removed or ruined → `reopen` (F6); a greater of a ladder whose lesser is carried → `add`, the lesser's members re-bound as the greater's where the greater's thing is the lesser's, else the greater placed new and the lesser's key bound as at a first reading (V08 §3.5.1 (c), (d); SR5-01) | `remove` with fate `vanished` (a regenerated or rerolled record: SF never deletes, research V48), unless a ladder promotion re-binds it (V08 §3.5.1 (d)) or a quarantine holds it | `state`, `fate`, `inactive` → `state` (F2, F3, F5 by item 14's rows, fates first); `impairments` → `state` (F4); `name` with a demotion or upgrade receipt → `rename` + the class re-read (F15, F3) — an upgrade to a REPLACEMENT greater of a new thing places it new under the key and re-points the key's row to it (V08 §3.5.1 (d); SR5-01); `kind`, `category`, `tags`, `role`, `step`, `lesserOf`, `popQualifier`, `openTop` → `attr` (a re-designation, item 18); `count` → `attr` (members added or removed, V08 §3.6); `knownTo`, `facets` → `attr` (§7.7 item 7) |
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
| chain (SettlementForge's) | `add` | `remove` | any field → `attr`; response `epoch`: no map event — the supply web re-derives the chain's links from the carried facts at the next epoch (DR-V8.5; V06's dossier phase) |
| dependency | `add` | `remove` | `severity`, `affected` → `attr`; response `epoch`, as a chain |
| calamity | `add` → its event in the epoch covering its week (DR-V8.6, V08 §3.6 (3)) | nothing: a calamity that leaves the line's capped history list is never undone (J-V8.54) | none (a calamity is immutable) |
| evidence | — | — | `kinds` → `attr`; response `epoch`: V04 re-evaluates the ruin at the next epoch (V08 §2.6a (4)) |
| institution, custom part | (as institution) | (as institution) | `custom.contentHash` → `attr` with cause `custom_revision` (item 104 (e): the profile re-resolved and the use re-sited by least disruption); `custom.scene`, `.group`, `.keywords`, `.required` → `attr` |
| custom-chain | `add` → a `CustomChainRecord` put (active or not) | `remove` → the record retired | `active` → `state` (item 104 (h) (7)); `nodes`, `exports`, `imports` → `attr` |
| custom-service | `add` → a `CustomServiceRecord` put | `remove` → retire | `provider`, `serviceCategory` → `attr` |
| custom-def | `add` (the library's fields first seen) | kept when the offer carries no library; `remove` (response `none`, noted `custom_library_dropped`) when its definition's revision changed and no admitted entry for the new revision came (V08 §3.13 (8)) | any field → `attr` with cause `custom_library`, only when the entry's revision equals the dossier's |

A field whose carried and new values are equal after the digest's rounding makes no change. A change whose only effect
is on facts no rule reads (a notable's importance) is still a change: it updates `carried` through the ledger event
(V08 §3.6 (4)) and the report, and emits no map event.

**The chains' links (item 105 (i); DR-V8.5; C8-06).** SettlementForge's chains become links of item 105's supply web
between the bound members; the links are DERIVED at every placement and epoch by the base's web (item 105 (a): never
stored), read from the carried `chain` and `dependency` facts; the port stores only the facts.

| row | map fact | dossier inputs, in the order read | rule (its home) | chance | the bar it holds |
|---|---|---|---|---|---|
| DR-V8.5 | the supply links between the chains' bound members, their goods and weights | `economy.chains` (processors resolved, outputs through `goodWords`, upstream, the neutral status), `economy.dependencies`, `economy.goods`, `entrepot` | item 105 (a)–(h)'s web at S10a/S10b and every epoch (the base as g applies it), each link × V11's `siting.web.chainStatus` of its chain's status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls through the store at the gate or quay facing the partner | none | every chain with two joined members yields a link; an impaired chain's pull equals the status factor × a running one's; an entrepot chain's end pulls toward the gate or quay facing its partner (T-V8-35) |

A processor that joins nothing binds nothing and never invents a building (the dossier is the truth of what exists;
DR9 places what it lists), reported `chain_node_unjoined`.

**The coverage pull inside a collective range (item 103 (f); BCR-V8-12).** DR9 draws a collective record's placed
count inside the dossier's range from S2's per-capita rows; where the record's class carries a coverage row, the draw
also takes the coverage target — clamped into the range — as a weighted option beside the per-capita value, exactly as
item 103 (f) states for a standalone roster, and coverage then decides where the members go. The range stays the
dossier fact; the count inside it stays a map fact (J-V8.20).

**The latitude row (item 102; BCR-V8-11).** Item 102's daylight share reads the path sun at the settlement's latitude; a
dossier gives none, so the port derives it by one new row of §7.7's derivation table (numbered by the coherence pass:
V01, V05, V06 and V08 each propose a row; this volume calls its row DR-V8.1):

| row | map fact | dossier inputs, in the order read | rule (its home) | chance | the bar it holds |
|---|---|---|---|---|---|
| DR-V8.1 | the site latitude the model-side sun reads (item 102 (a)) | the realm block's `cell.latDeg` (optional); `site.culture` through `tables/dossier/cultures`; else 50° N | the port writes it into `Intent.latitudeDeg` at creation (BCR-V8-11); a latitude that arrives or changes later is a `port-values` change carried into the next epoch's slice (`PortValues.latitudeDeg`); V05's model sampler reads the latitude in force (V08 §2.5's resolution rule); §8.4's path mode reads it for the document's views | none | a dossier map's population-weighted mean band stays within one band of its wealth row with the sun term on (T73-7 unchanged; T-V8-22) |

SettlementForge usually places a settlement on its realm map after generating it (research s §4, C-9), so a typical map
is created with the culture's latitude and receives the realm's later (C8-21). The later value never jumps the town: it
enters as an input change at the next epoch, and item 102 (e)'s drift moves the field and the uses by the evolution
engine's normal lag — a sunnier quarter slowly improves (J-V8.34 revised). A DM who wants the latitude now sets it by
`adjust` (§7.1), a map edit with its own fate report. A document made before `Intent.latitudeDeg` existed reads 50°, the
latitude it was built with (§7.5's migration default).

#### 3.5.1 The institution ladders (item 108; C8-07)

**(a) The name grammar** (applied to the record's name, in this order; the base's T9 extended, BCR-V8-5):
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
(`village.json` `rules.ladders.ranges`, keyed by step type with the qualifier as the row's label; V07 SR1-16, J-V7.105),
else V11's range unscaled (SS-08). A kind whose qualifier names a step but which
V11's table lacks is noted `ladder_unknown`; a record whose kind is a greater of the committed `ladderPairs` (V08 §2.4)
that the catalogue does not list is read as a plain record, noted `uncatalogued_step` (V11 §3.12).

**(c) No double counting (item 108 (c)).** Where a greater and a lesser of one ladder row are both in the dossier, the
lesser gets `mergedInto` = the greater's key: it is not placed on its own, its range is not added to the greater's, the
roster's per-capita members of that class ARE the greater's members, and its binding key becomes an alias row on the
greater's member #1 (for SIZE and REPLACEMENT, the greater's building — save a lesser that is a pin record, which V11
§3.12's row keeps as a pin of the greater's plot: `parish_church` over `wayside_shrine` binds the shrine's key to the
churchyard `cross` pin, laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records`
at an epoch or an absorb (V07 §2.4, §3.10, §3.12 *Records at a village epoch* item 4; seam-settlements-r4 SR4-01,
seam-settlements-r5 SR5-01) — while at a base rung, where no churchyard cross is laid, it aliases the church building as
above; the target is chosen where the merge is first read — the creation, or the absorb or epoch that brings the pair,
the greater arriving beside its standing lesser or by promotion ((d)) — and kept across a later rung change, the
standing fabric surviving it (V08 §3.10; seam-settlements-r4 SR4-06; J-V8.111)) — noted `ladder_merged`.
**A pair that meets over time** (seam-settlements-r5 SR5-01; J-V8.113). At an absorb where the lesser was already
placed and the greater arrives beside it, the lesser's key follows what the greater's thing is:
* **The greater's thing is the lesser's** — every COUNT, QUARTER, GUILD and SIZE step, and the REPLACEMENT rows whose
  V11 §3.12 reading keeps the lesser's thing: `graveyard` over `burial_ground` (the face re-bound), `wizard_s_tower`
  over `hedge_wizard` (the house becomes the tower), `mages_guild` over `wizard_s_tower` (the tower binds the guild's
  hall), `professional_city_watch` over `town_watch` (the posts carry on) and `cathedral_10_000_only` over
  `parish_church` (the lesser absorbed: the church converted in place with its crypt, V6 §3.9.11). The lesser's placed
  members are re-bound as the greater's members `#1…#n` (the one nearest its demand first; a `rebind` each, no address
  change) and DR9 adds members up to the greater's count by least disruption; nothing standing closes.
* **A lesser with no thing of its own** — a `@none` or `@office` lesser (`citizen_militia`, `traveling_performers`,
  `traveling_hedge_wizard`, `gates_if_walled`, `priest_resident`) — has no member to re-bind: the greater is placed as
  any added record is, and the lesser's key becomes an alias row on the greater's member `#1`, as at a first reading.
* **Every other REPLACEMENT greater is a new thing**, placed new in the absorb or the epoch that brings it — a building
  by DR9, an `assign` of its member (V08 §3.6 (5)), at a village rung through V07's records placement (V07 §3.12
  *Records at a village epoch* item 4); a `@wall` greater by the fortification's dossier path (DR2's walls list; V6
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
when the GUILD records alone exceed it, noted `count_over_range` — and no further hall is placed (SS-23; J-V8.83). At an absorb the binding follows the first case of *A pair that meets over time*: a hall
already placed is re-bound as `#k` (a `rebind`, no address change), never duplicated, and a COUNT record that leaves
the list releases its bound halls back to their GUILD records (a `rebind` each), so no hall closes by a change of
wording. A GUILD record of another family, or with no such COUNT record in the dossier, keeps its own hall. The three metropolises' two church
ranges and `metropolis-3`'s two cathedral records are the fixtures' cases (V08 §2.6a (3)).

**(d) Steps over time (item 108 (d)).** A `promotedFrom` receipt (`upgraded_by_reconstruction`) keeps the record's one
key (§7.7 item 12's F15 re-binding: the line keeps the old kind's `catalogId`). Where the greater's thing is the
lesser's ((c)'s first case), it re-keys the singular record's binding row to the greater's `#1` (`rebind`) and DR9 adds
the rest inside the new range by least disruption. Where the greater is a new thing ((c)'s third case; seam-settlements-r5
SR5-01; J-V8.114), the greater is placed new as that case places it, under the record's key (at a village rung through
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

**(f) The re-check against the ladder file (CONFIRMED; C8-07 (2)).** SettlementForge's ladder data at the pinned commit
(`src/data/institutionLadders.js` at `5d699cc68`, blob `91f6e2bd…`, identical to the scratch export read by this lane; its
upgrade pairs and subsumption rules read as data, nothing copied) was compared with V11 §3.12's rows. Agreements: every
row V11 marks `ladder` or `subsumption`. Rows V11 marks `inferred` that the file holds (their source becomes `ladder` or
`subsumption`): `craft_guilds_100_150` and `merchant_guilds_50_100` (open-top subsumptions of both lower ranges),
`banking_houses` and `banking_district` (with `pawnbroker` among the lessers), `gambling_halls`, `gambling_district`,
`multiple_criminal_factions`, `multiple_adventurers_guilds` (with `hireling_hall`), `slave_market_district`,
`carriers_guild`, `cartographer_s_guild`, `large_prison`, `mages_district` (with `mages_guild`, `alchemist_shop` and
`alchemist_quarter`), `thieves_guild_powerful` (with `black_market_bazaar` and `contract_killer`), `mint_official`
(with `assay_office`), `international_trade_center` (over `caravan_masters_exchange` and `caravaneer_s_post`).
Disagreements: `hospital_network`'s lessers are `almshouse` and `foundling_home` in the file, not the two hospitals;
`dungeon_delving_supply_district`'s lesser is `bowyers_fletchers_guild`. Pairs the file holds that V11 lacks: wayside
shrine → parish church; water source → multiple water sources; traveling performers → theaters; hedge wizard and
traveling hedge wizard → wizard's tower; wizard's tower → mages' guild; carriers' guild → caravan masters' exchange;
academy of magic, assassins' guild, auction house, gladiatorial school, printing house, great library, major port,
specialized metalworkers, caravaneer's post, chroniclers' exchange, whisper market, black market and thieves' guild
chapter over their named lessers; major hospital over almshouse. Rows V11 infers that the file lacks —
`parish_churches_50_100`, `multiple_monasteries`, `major_monasteries_5_10`, `great_cathedral`,
`burial_grounds_and_charnel_house` and the rest — stay `inferred`: the dossiers list both forms (all three metropolises
carry both church ranges; `metropolis-3` both cathedrals), so item 108 (c) must merge them whatever the file says. Every
fix is a table change handed to revise-V11 (V08 §13, X1), reported by R2 when a baseline moves.

### 3.6 From changes to events and epochs

1. **Dating.** Each change reads its receipt row (§7.7 item 13): the first receipt present gives cause, fate and week by
   §4.11's rungs; `HostContext.week` is the last rung; no rung → `week: null` and an `unreceipted_change` note. The kinds
   this volume adds are dated by rows F-V8-1 – F-V8-7 of `tables/dossier/receipts` (BCR-V8-20): a relation by its powers'
   pulse week when the line stamps one, else arrival; `port-values` by arrival, riding the next epoch; a custom definition
   by arrival; a chain (custom or SettlementForge's) by arrival; a dependency by arrival; a calamity by its own `tick`
   (a receipt); the `evidence` singleton by arrival, riding the next epoch.
2. **Order.** Changes are ordered by week (null last), then decrees before other sources, then the dossier's own record
   order (`order`), then binding key — SettlementForge's order where it has one, ours where it does not.
3. **Epochs by the cadence — §4.11 (4) as the base states it** (C8-31; J-V8.55). From the last epoch's week `W₀` (its
   `EpochRecord`, else the creation week) to the absorb's week `W₁` (the latest dated week, else `HostContext.week`, else
   `W₀`): an epoch at every calendar year end `W` with `W mod 52 = 0` in `(W₀, W₁]` (the `sf445` calendar's year); an
   epoch at the first week the population leaves the last epoch's `populationTarget` ± 5 % (read from
   `populationHistory`; with none, at `W₁` when the new population is outside it), the reference then moving to that
   epoch's target, so every crossing inside the span adds its own epoch; and an epoch at the week of each newly carried
   calamity that no other epoch falls on (a destructive event is epoch content, §4.11's rung at an epoch). Each epoch's
   `populationTarget` is the population at its week — the latest `populationHistory` entry at or before it, else linear
   between the target at `W₀` and the new population at `W₁`, rounded to a person — and its `circumstances` are the new
   digest's slices (trade, economy, powers, government, `port`): SettlementForge keeps no interior history of them
   (research V52, V56), so every epoch of a catch-up reads the end state, declared (J-V8.25). **The calamities (DR-V8.6;
   V06's DR-V6.1, the same row: V06 writes the reader, this volume the inputs).** Each newly carried calamity is one entry
   `{ week, kind: 'calamity', calamity: CalamityRef }` in `EpochInputs.events` of the epoch at its week, V06's
   `CalamityRef` filled as `{ id: its key, name, type, severity, targets: the use ids of its resolved, bound targets,
   deaths }` (`deaths` added for V04's burial growth, V08 §2.6a (4); handed to V06, V08 §13 X3); its F5 targets' dossier
   events at the same week ride the same epoch's `EpochInputs.dossier`, so V06's hazard phase strikes them in place; a
   target that joins nothing is dropped from the list, noted `calamity_unplaced`. The calamity-to-hazard mapping is
   V06's table; the port maps nothing (J-V6.70).
4. **The ledger event** (J-V8.14; C8-12, C8-13). The absorb's first event is one `dossierFacts { changes, quarantined,
   notes, notesCleared }` (BCR-V8-6): every `DossierChange` of this absorb with its full `before` and `after` carried
   facts, and the WHOLE quarantine list after this absorb, author `host`, no model effect. Folding it sets `carried[key] =
   after` for each change, sets `DossierBinding.quarantined` to the list, appends `{ seq, week: W₁, factHash, changeIds }`
   to `absorbed` and removes `changeIds` from every entry older than the newest 64 — so the dossier block is rebuilt from
   the log by folding these events alone, equal to the stored block at every seq (§2.9's "the fold rebuilds it").
   Creation's prefix opens with the same event, every fact an `add`. **The port's notes** (SS-44; J-V8.98). `notes`
   holds, in the order written, this run's notes of class `event` and those of class `standing` whose identity (V08
   §2.4) `DossierBinding.notes` does not hold; `notesCleared` holds the identities of the binding's standing notes this
   run no longer writes; notes of class `report` never enter the log (V08 §4.6's class column). Folding the event sets
   `DossierBinding.notes` to the old list less `notesCleared` plus the standing notes of `notes`, in identity order —
   no model rule reads either field. The `custom_resolved` and `low_confidence` notes of the custom records this run
   adds or revises (`add`, `custom_revision`) are written after the dry run's fold (V08 §3.5 (5) (f)) and appended to
   `notes` before the events are encoded; since no model rule reads `notes`, the dry run's result stands, and every
   editor's re-run (V08 §3.3) computes the same bytes. They are `event` notes: the live resolution — which a DM's
   declaration may change at any time — is the why card's (V10 `WhyAnswer.profile`, V9 §2.7's `chips`), never a stored
   note. Every `unmapped_kind` note (a `standing` note, V08 §3.5 (5) (d)–(e)) is likewise written after the fold — the
   dry run's at an absorb, `generate`'s at creation, the loaded document's state for an offer answered `unchanged` — its
   `class` the class that builds the record there (V08 §4.6's row; SR4-07; J-V8.112), before `notes` and `notesCleared`
   are computed, so a note whose built class changed at a rung change is cleared and written anew at the next port run;
   the same bytes follow on every editor's re-run for the same reason. A digest whose dossier changes nothing
   (`unchanged`) writes no event, so its notes reach the host's report only.
5. **Emission, by the receipt row's response.** `assign` → an `assign` of a dossier-backed assignment (§7.7 One path:
   placed by S10b's `dossier` request, the least-disruption order — at a rung of a product that declares a records
   placement, that placement first, V6 §2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*;
   seam-settlements-r5 SR5-06); `unassign` → `unassign`; `status` → a `setAttr` of
   the assignment's `state` (and `memberState` for a collective, by DR25's distribution); `setAttr` → a `setAttr` of the
   named path (a re-designation mutates by §4.7 S11); `rebind` → a `setAttr` of the bound entity's `dossier` ref to the
   new key (the fold re-points the binding row; no address changes, §6.3; BCR-V8-8) — also for a ladder promotion
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
   reserved session `host:port` — never a user's session, no `group` (C8-15; BCR-V8-19); the envelope's `session` is the
   same (§11.3's *Logging*).
7. **Refusals at absorb.** A digest whose population routes outside the base ladder with no registered product
   (V08 §3.10) refuses the whole absorb (§7.7 item 15), as does `E_OTHER_SETTLEMENT`; nothing is emitted and the map is
   held (V08 §3.9). **A deserted settlement** (SS-21): with the village product registered, a population of 0 at an
   ABSORB routes to THORP and V07's desertion (V07 §2.1, §3.12; an outcome, never a refusal) — a document whose product
   is the village runs it at the epoch directly, and a base-product document reaches it through V07 §2.1's fold, 0
   lying below the band's lower edge (J-V8.85); at a CREATION a population of 0 is refused `E_RUNG_UNAVAILABLE` naming
   the floor (V07 §2.1). With no village product registered, 0 is held like any population below 1 500 (B7).

### 3.7 Persistence inside the host — commit, compaction, thumbnails, backups

**The host stores; the module computes** (C8-04; J-V8.46). Every encoded event, sequence number, head and snapshot
field the store holds arrives in a message: `doc.changed` and `dossier.result` carry `encoded`, `seqAfter` and
`logHeadAfter` (the module's canonical CBOR of each event and §11.3's `logHead` after them); `dossier.result.created`
and `doc.snapshot.ready` carry the whole `SnapshotBlock`. The host verifies only what it can — that a proposal's
`baseLogHead` equals the head it holds — and stores the rest as handed. It never decodes a byte, never hashes an event
and never computes a head (T-V8-5 runs against a store that cannot).

* **Commit.** Every committed event — a user's edit (`doc.changed` accepted), an absorb's events, an undo — is appended
  by the host to `tail` through `MapStore.commitEvents(mapId, baseLogHead, encoded, seqAfter, logHeadAfter, absorbed?)`;
  `'stale'` means another writer moved the head, and the host answers the client `doc.rejected { stale }` (§11.3). An
  absorb's commit also writes `absorbed` and `lastOffer` in the same compare-and-set.
* **Compaction** (J-V8.5; C8-05, C8-29). When the tail passes 256 events or 256 KB, and at every `created`, `upgrade`
  and `rebase`, the committing editing client sends `doc.snapshot` and calls `MapStore.replaceSnapshot(mapId, snapshot)`
  with the `SnapshotBlock` of the reply. The store's precondition is that the snapshot's `logHead` is the record's head
  or the `logHeadAfter` of an event in its tail — so an edit committed between the request and the store call does not
  refuse it: the store keeps the tail's suffix after the snapshot's head, moves the old snapshot to `backups[0]` with the
  removed segment as its `tailAfter` (C8-27), keeps `backups[1]` without its segment, drops older ones — all in one
  transaction. A snapshot whose head is in neither place is `'stale'` (a restore or a new map replaced the log) and is
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
* **Backups and restore** (J-V8.44; C8-28). `backups` hold the two previous snapshots. The DM's "restore previous map"
  (V08 §4.2) refuses a backup whose `docId` differs from the record's `mapId`; otherwise it makes `backups[0]` the
  snapshot with an empty tail (the swapped-out snapshot becoming `backups[0]`), and the host then sends every open session
  of the map a fresh `doc.load` (with `module.status { loading }` between), so no client is left on a head the log no
  longer has; the next offer absorbs the current dossier forward, so the dossier stays the truth and only the map's own
  edits since that snapshot are lost — the dialog says so and lists them.
* **The local draft mirror (V09's; C8-35).** Volume V09 keeps, in host mode, only a draft mirror in the module origin's
  own storage, keyed by the document id (V09 §3.8 (6)): the unsent edits of a session. At load, the mirror is replayed
  only when its base head is the record's head or the `logHeadAfter` of an event in the loaded tail; otherwise (a restore,
  a new map, another device's commits past a compaction) it is discarded with the notice "unsaved changes from an earlier
  version of this map were dropped". The mirror needs the module's storage to persist inside SettlementForge's page,
  which third-party storage partitioning allows only when the module's origin is same-site with SettlementForge's app —
  Q1's recommendation (a subdomain of SettlementForge's own domain) meets it; on another site the mirror lives for the
  session only.
* **Sizes (the host's quota, per map):** the snapshot within §2.9's size budget (TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS
  ≤ 8 MB), the tail ≤ 256 KB between compactions, two backups (the newer with one tail segment ≤ 256 KB), two thumbnails
  ≤ 150 KB each, the party picture set (V08 §6: ≤ 2, 6 and 12 MB) — at CITY ≤ 15.9 MB worst case, typically ≈ 8 MB.

### 3.8 Versions and migrations on both sides

**Ours.** The output version (§6.4): a stored document inside the retention window replays exactly under its own version;
the owner's client gets `module.status { upgrade-available }` and the upgrade dialog with §7.5's diff; an accepted
`upgrade` is an ordinary event over the bridge, compacted at once; the players' pictures keep the stored version's
drawing until the DM upgrades (J-V8.22). The owner's "Update the map engine" action (V08 §4.2) is the host's upgrade
request that volume V06 names for a document whose epochs carried dossier events (V6 §3.15): such a document is never
upgraded by anything else. Outside the window the document opens as §2.9's frozen view for everyone, and the owner is offered
the `frozenImport` rebase by V9 §3.14 (b)'s **Edit it with this version**, committed through `doc.changed`, after which the
client sends `doc.snapshot` (XV-V9-24). The schema version: a newer document opens read-only (§2.9 step 1) — a host serving an older
module to a newer document is a deployment error, reported in `module.status { error }`. The dossier row sets: `absorb`
reads `tables/dossier/*` at the DOCUMENT's pinned versions (§2.9's `tablePins`), so every client on one output version
computes one result; a new table version reaches a document only through `upgrade`. The adapter version: V08 §2.4's
manifest; below.

**SettlementForge's.** A dossier carries `schemaVersion`, `simulationVersion` and `generatorVersion` (research:
dossier-generation §3.2); the same seed gives different dossiers on two lines at one `generatorVersion` (research: V
treecheck, g§4.5), so the LINE, not the version fields, names an adapter. The port never re-generates a dossier and never
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
The column "the user sees" names catalogue keys (V08 §13 X12); each key's words are written once — a `host.held.*`,
`host.recovered.*` or `host.verify.*` row here, a `host.status.*` or `host.party.*` row in V08 §5.1's table, a
`host.note.*` row in V08 §4.6's (SS-44). A refusal at a CREATION shows `host.status.notCreated` and the reason row in the
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
| B7 | the population leaves the base ladder with no product for it | the router (V08 §3.10) | refuse `E_RUNG_UNAVAILABLE` naming the village product or the cap → held (creation: no map, the thumbnail slot says why); with the village product registered, a population of 0 at an absorb is no failure — it routes to THORP and V07's desertion — and at a creation 0 is refused `E_RUNG_UNAVAILABLE` naming the floor (V07 §2.1; V08 §3.6 (7); SS-21) | `host.held.E_RUNG_UNAVAILABLE.village` "Villages are drawn by the village map, which is coming later."; `host.held.E_RUNG_UNAVAILABLE.cap` "Settlements of more than {cap} people are larger than the map draws."; a creation at 0: `host.held.E_RUNG_UNAVAILABLE.empty` "The settlement's record lists no inhabitants." |
| B8 | the head moved under an absorb | `doc.rejected { stale }` | re-run `absorb` on the new head, three times → `module.status { error }`, retried at the next offer | nothing, or `host.status.absorbing` (V08 §5.1) |
| B9 | the store's compare-and-set fails | `'stale'` from `MapStore` | reload the record, re-apply as B8 | nothing |
| B10 | the snapshot is damaged or its root mismatches | §2.9 step 3 | §2.9's corrupt-cache replay from the recipe and log → if the snapshot cannot be decoded at all, `backups[0]` plus its `tailAfter` segment plus the current tail (exact, since the segment holds every event the last compaction removed, V08 §3.7) → `backups[1]` absorbing forward, the map edits since it lost and listed → a new map from the current dossier, reported | as `module.status.detail` beside the `ready` row: rungs 1–2 `host.recovered.rebuilt` "The saved copy was damaged and has been rebuilt."; rung 3 `host.recovered.lost` "The saved copy was damaged and rebuilt from an older one; {n} of the map's changes were lost." (the lost edits listed in the report, V9 §5.7); rung 4 as B11 |
| B11 | the map record is gone (the host lost it) | the host detects it itself — a settlement whose other records name a `mapId` its store no longer holds; with nothing naming one, the host simply has no map and makes one | a NEW map created from the current dossier under a new `mapId`: one creation of the current state (§7.7 One path), which item 22 (c) allows to differ from the lost map; the old layout is not recoverable (J-V8.43) | `host.recovered.newMap` "The saved map was lost, so a new one was made from the settlement's current record." (the client's banner, after the new map's first commit) |
| B12 | an absorb is over its disruption budget (a draft reroll, J-M11) | the dry run (§7.7 item 5) | lands at the least-disruptive sites, reported over budget | the disruption report |
| B13 | the host restored an earlier dossier (its undo) | `factHash` equals an earlier `absorbed` entry | F22's forward convergence (§7.7 item 5) | `host.note.state_matches_absorbed` (V08 §4.6), the residue listed by §7.7 item 5's report |
| B14 | the upgrade cannot copy a pack (§7.5's cap) | the upgrade's dry run | keep the old model (§7.5) | the upgrade dialog's message |
| B15 | the settlement is deleted in SettlementForge | the host's own deletion | the host deletes the map record; nothing in the module | — |
| B16 | a hostile string in a name (markup, script) | never executed: the module renders names as text and every export escapes (§11.1's inert bar) | — | the name, inert |
| B17 | a quarantined record whose key cannot be formed | step 4 | every carried institution key absent from the new digest held (no `remove`), noted `quarantine_hold`, until a readable dossier arrives (C8-12) | `host.note.quarantine_hold` (V08 §4.6) |
| B18 | the party pictures are missing or older than the map | `partyPictures` absent, or its `logHead`, `partyRev` or `outputVersion` differs from the record's | the player's viewer shows what is stored, captioned with its week, and the next editing session or refresh sends `party.render`, answered with a new set or `unchanged` when nothing drawn or listed changed (V08 §3.14 (3)) | `host.party.notOpened` or `host.party.asOf` (V08 §5.1) |
| B19 | two registered adapters accept a new settlement's dossier and no line is named | `select` (V08 §2.4) | the newest registered line, recorded, noted `line_defaulted` | `host.note.line_defaulted` (V08 §4.6) |
| B20 | an editor's re-run of an applied absorb differs from it | V08 §3.3's verification | the applied log stands; the mismatch reported with the first differing event (C8-37) | as `module.status.detail` beside the `error` row, editors only: `host.verify.mismatch` "A map update did not match when it was checked; it has been reported." |

### 3.10 The village-tier hand-off

`LadderRouter.route(population)` (§1.1) is the one decision of which product builds a population. The village product
registers its `ProductDecl` in `StrategyRegistry.products` (V07 §2.1; BCR-V7-11) — the one registration of file f item
202; the port registers nothing and consults `LadderRouter`: at `creation`, which product and rung build the dossier's
population; at every `absorb`, only whether the population lies in a registered product's range (SS-19, SS-28). The
product's rungs, range, stages and strategies are V07's `ProductDecl` and are not restated here.

With no village product registered, a population below 1 500 is refused (§7.7 item 15) and a mapped town that shrinks
below 1 500 is held at its last state (B7) until the dossier's population returns above 1 500 — then the next absorb
diffs everything since the held state in one pass. With the village product registered: a village-sized dossier is
created on the village rung rows by that product (V07 §3.11); and a crossing is §4.11's rung change as BCR-V7-26 states
it — the product at an epoch is V07 §2.1's fold with its hand-off band (`handoff.band`), so a town passes to the village
product, and a village to the base product, only when an epoch's target leaves the band, and inside the band the
previous product runs on its own rung row (SS-20). Everything the epoch builds from then on follows that product's
stages, and the standing fabric survives as it survives any growth stage (§6.3). A population of 0 at an absorb is V07's
desertion (V08 §3.6 (7); SS-21). One document, one seed, one history across both products (J-V8.12). The village volume
(V07) owns what the village product builds and its fold; this volume owns the port's consultation and the one-document
rule, and T-V8-19 tests them with a test `ProductDecl` registered.

### 3.11 The staged records, the per-settlement values, the realm block and the audience in use

* **Conditions and stressors** (C8-09, C8-10 (c)). Each digest condition is put as a `ConditionOverlay` (`cond:<id>`;
  archetype, severity, `sinceWeek`, `untilWeek`) whatever its status — the line's statuses are `stable`, `worsening` and
  `easing`, and its list holds only live conditions. Its weeks come from its ticks: with `W` the dossier's week
  (`HostContext.week`, else the latest tick of its `populationHistory`, else 0 at a creation), `sinceWeek =
  round(W − duration.elapsedTicks)` and `untilWeek = round(W + duration.expiresAtTicks − duration.elapsedTicks)` — the
  reading that `expiresAtTicks` is the condition's whole length (PLAUSIBLE: a generated condition carries `elapsedTicks`
  3.25 and `expiresAtTicks` 6 at tick 0). Its measurement: `untilWeek` stays within ±1 week across town-1's and city-1's
  one-week, one-season and one-year ticks (T-V8-18); pre-decided fallback, if it drifts: `untilWeek =
  expiresAtTicks` read as an absolute tick. A condition the dossier stops listing is retired at the absorb's week. Each
  stressor is put the same way under `cond:stress:<type>` (archetype its type, severity 0.5, `sinceWeek` its first
  absorb's week, no `untilWeek`) and retired when no longer listed. Effects are the `conditions` row's (V08 §2.6): the
  tint through §8.2's thematic rows, the Works factors through DR21, the activity scalars and the dials at the next
  epoch. Stressors add no `EpochInputs.events` entry: their one path is the overlay, which the epoch's readers read
  (J-V8.56).
* **Deposits** (C8-18). Each listed deposit is put as a `DepositSite` (`res:<key>`; family by the `deposits` row, its
  state). Its derived fields are S12a's: reading the creation prefix's deposit puts ahead (BCR-V8-22), S12a draws the
  bearing on `hinterland.outside` keyed by the deposit key (the realm block's bearing for it wins when given) and writes
  `bearingCdeg`, and the land use it makes writes `landUse` — both derived, recomputed on regeneration, never in the
  event (DR19). A state change is a put at its week and converts the land use at the next epoch (§4.11). The
  `magical_node` and `ancient_ruins` sites follow V08 §2.6's `deposits` row and V04's `ruinCentre()`. A land use a
  record's hard row needs and no listed deposit opens is put as a derived site, `res:derived:<landuse>`, by the same
  row's rule (SR2-04), placed by S12a like any other.
* **Power relations** (C8-10 (a)). Each unordered pair of the powers' relations is put as a `PowerRelation` with the
  `relations` row's neutral `kind`, its `sign`, its strength × the trend factor and its `hidden` flag (BCR-V8-26 adds
  `sign` and `hidden` to the record); §4.5's typing reads the prefix's relation puts ahead (BCR-V8-22) as a soft adjacency
  row — attraction for a positive sign, repulsion for a negative — and item 72's political component reads them as the
  base states. A hidden relation is never named on a public view (DR20).
* **Notables.** Each notable is put as a dossier-backed `Person` (`npc:<id>`): pinned whole, its `Posting` at
  `workplaceKey`'s element and its `Membership` in `powerKey`'s power, housed by §2.7's rule in the district of its
  institution or its power's seat (a notable whose names join nothing is housed in the governing power's seat district,
  noted `name_unjoined`). A successor (`replaced` names a carried notable) is put with the old person's house and posting and the old
  record retired (F17); a notable reported dead or gone is retired; its house stays a house. **A reroll** (C8-39; the
  research plan's J-M11): on an absorb whose settlement shows a reroll (F21's receipt), a vanished `npc:` key whose name
  and role equal a new key's is re-bound to it (`rebind`, noted `npc_rebound`), keeping its house and posting; any other
  vanished key is retired and the new one put.
* **History.** At creation only: `Recipe.history = { ageYears: history.age, scars }`, one scar per historical event by
  the `historyScars` row (V08 §2.6) with its `yearsAgo` and severity; never updated by later dossiers (`ageYears` is
  never advanced by the host's weeks, §2.7). The `magical` events go to the ruin evidence instead (V08 §2.6a).
* **Per-settlement values.** `PortValues` from the digest — crime by the `crime` row, `importPct` = `foodImportPct` ÷
  100, `foodChain` = `foodChains`, legitimacy, `threats` by the `threats` row, and `latitudeDeg` (null in the creation
  slice, where `Intent.latitudeDeg` holds DR-V8.1's value; a realm latitude that arrives later fills it) — in the
  creation slice and in each epoch's slice (V08 §3.6 (3)).
* **Custom kinds** (C8-17). The dossier's custom definitions are `PortRows.customKinds` rows DERIVED at read time: the
  rows in force are the table's (empty in the base) overlaid by one row per carried custom institution — `kind` its
  definition id (no `fallbackClass`: the class is item 104 (a)'s resolution at fold, BCR-V11-26, J-VI.20; SS-37) and,
  only from its carried `custom-def` fact (an admitted library
  entry, V08 §3.13 (8)), `economicWeight` and `criticality` by the `customWeights` row (V08 §2.6; a dossier row set, not
  calibratable, J-V8.108), `defenseRoles` and `powerAuthorities` (the entry's `defenseRole` and `authority`)
  (BCR-V8-29). Nothing is written into the recipe's params, so a revision changes them through
  its own `setAttr`'s fold (V08 §2.8) with no `editTable` — whose re-derivation from its first reader stage would be the
  reshuffle item 22 forbids. Their records, chains, resources and services arrive as V08 §3.13 states.
* **The realm block** (J-V8.27; C8-21; BCR-V8-24). The client's `realmBlockFrom(placements)` computes, host-side and
  without module code, from the campaign's placements (the settlement's and its partners' realm positions), the realm
  map's scale and latitude scale, and the campaign's spatial digest (the cell's terrain, river and coast words) —
  nothing else of campaign state: each partner's `bearingCdeg = round(100 × atan2(Δx, −Δy) in degrees) mod 36 000` (realm
  y grows southward), `distanceM = hypot(Δx, Δy) × mPerRealmUnit`, the cell, and `latDeg = degAtY0 − y × degPerUnitY`
  when the latitude scale is given. The module uses it as §7.7 layer 2 states (true bearings, north first) and as DR-V8.1's
  first input. The host sends it with an offer only when the settlement is placed on the realm.
* **The audience in use.** The client maps SettlementForge's audience words through §14's table: the DM's page mounts
  with `dm` (owner, secret) and a co-DM's with `co-dm` (editor, secret); a player's page never mounts a frame — it shows
  the party picture set and gives its assistant the party gazetteer (V08 §3.14; C8-01); anonymous, gallery and DM-full
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
T73-8), which is what lets two editors race safely (V08 §3.3) and every editor verify an applied absorb (C8-37). The
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

### 3.14 The players' view — the party picture set and the party gazetteer (C8-01, C8-14, C8-36)

A player never holds the map. §11.1 *Knowledge* says a host that keeps a place secret from a client "sends that client
pictures and interchange exports, never the document", and SettlementForge builds its own player face player-safe by
construction, from a public projection and never the DM's ledger (CONFIRMED at `5d699cc68`, critique C8-01). So the
players' Map tab is fed from the map record alone: stored pictures and a stored list of words, made by an editing
session or the refresh frame under the party's key (J-V8.57).

1. **The party key.** `MapRecord.party` (V08 §2.1) holds the party's base tier (`public` or `local`) and the places
   revealed above it (binding keys for dossier elements, addresses for map places). Rendering — the module's, on the
   client's `party.render` (3) — resolves it to BCR-V10-22's key form `{ tier, places }` (the `Admission` form of §2.9's
   view-state `knowledge`), `places` always present and possibly empty: each binding key through the binding rows to its
   entity's address (a collective record to all its members), each address as given; a key that no longer resolves (a
   place since removed) is skipped and kept in the list, so a re-opening re-reveals it. Every party render passes that key
   form as the `knowledge` of each picture it draws (`ExportOpts.knowledge`, BCR-V9-14) and as the `admitAs` of each query
   it makes (BCR-V10-22), so the set admits exactly what both the session's `secret` key and the party key admit — the
   party key's (BCR-V8-27; SR2-06); the module never raises a key.
2. **The set** (`PartyPictureSet`, V08 §2.1). (a) A PNG tile pyramid, 256-px tiles, row-major, at three levels — z0 the
   city band, z1 the district band, z2 the neighbourhood band — over the frame of the document's city-band view, plus a
   z3 building-band level ONLY for the tiles that cover an admitted place above `public` (each place's bounding box plus
   40 m), capped at 64 tiles, the players' close view of the places they know (J-V8.57). (b) The city-band SVG under the
   same key, inert by §11.1's bar (text as outlines, no script, no external reference), which the host offers to the
   DM and players for printing. (c) The **party gazetteer**: the answers of `query(h, { kind: 'gazetteer' | 'people', … },
   { admitAs: the party key form of (1) })` (BCR-V10-22) — band-less, so admitted as at the city band (§11.2), every page
   of both kinds carrying that `admitAs` (SR2-07) — paged to one JSON document and projected by the module through V08
   §5.4 (3)'s words-only rows (names, kinds, districts, tiers, the dossier's reasons, no coordinates) before it goes into
   `party.rendered` for storage — what a player's assistant reads (V08 §4.4 (1)). Every picture is drawn
   with the document's style, the fixed sun (an export has no pointer, §11.1), the document's public notes, view pins
   and annotation layer (§2.9 view state, §9.5) and never a private note or a DM-only pin (C8-36).
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
5. **The DM's check** (SR-05; J-V8.87). "See what the players see" — the header's toggle in the frame, or
   `MapSession.seePlayersView(on)` from the page, which posts `host.state { playersView: on }` (V08 §2.2, §3.1 step 7
   (c)) — sets the frame's `ViewOpts.viewAs` to the party key resolved as in (1), in the key form `{ tier, places }` that
   BCR-V9-23 admits as SR-06 amends it: a display filter, under which the frame draws, labels and reads what both its
   key and the party key admit (V9 §2.10's `effectiveKey()`, BCR-V9-23; SR2-09). So the DM sees in the live frame exactly
   what the next party set will show; switching it off clears `viewAs` (`undefined`), and while it is on the View as menu
   reads "What the players know" (V9 §4.8, J-V9.85). The frame's knowledge key stays the role's
   `secret` (J-V9.46), so the document formats, `doc.snapshot`, compaction and the draft mirror keep working while it is
   on; a `host.state` carrying a new `party`, or an absorb that changes the binding rows, re-resolves the filter. It
   writes no view state, nothing to the store and no event. While it is on, the strip "Showing what the players see"
   stays in the frame's banner slot (V08 §5.1).
6. **What it replaces.** SettlementForge's retired map rows carried a fog table and audience-tagged annotations
   (research s E-7, §3). Area fog is consciously replaced by place-by-place knowledge (J-V8.58): the base's knowledge
   model is by place (§9.2), a revealed place is named in every picture from then on, and an area fog over a live
   map is the "party copy" capability of owner question Q5, not built.

## 4 Editing

### 4.1 No new declaration; two host-only events; item 110's generated content is never bound

The stage adds no authoring tool: a DM edits a SettlementForge map with item 101's twelve tools exactly as a
standalone map (§7.1, §14), under §7.7's precedence line, and every map edit — a move, a lock, a rejected site, a
positive placement, a style — lives in the map's log and survives every absorb (§7.7 items 3–5). The two event kinds
this volume adds, `dossierFacts` and `dossierRecord` (BCR-V8-6), are host-authored: an `edit` of either kind whose author
is not `host` or whose session is not `host:port`, or that arrives in a `doc.changed` from a client, is refused F-EDIT
`dossier-owned` (§5.2, §7.7 item 11) — only an editing client's `dossier.result` produces them. A user's edit of a staged
record's fields (a condition's severity, a notable's posting) is refused the same way; its display — a label's text,
visibility — stays the user's (§9.1).

**Generated item-110 content is never dossier-bound (C8-42; J-V8.66; BCR-V8-31).** A raised way, a retaining wall (a
generated terrace's walls among them) or a deck plot the generator made (item 110) is generated content (SR2-16: a
terrace itself is a flatten stroke with its retaining walls, so no delete targets it and file f item 260 has no
suppression kind for it). No dossier record binds it: it carries no
`Identity.dossier`, even when a dossier record fed its reason (DR-V8.7, DR-V8.8), and its provenance names that record
for the clerk's `why`. A DM, a co-DM or an accepted clerk proposal removes it with the base's delete of generated
content (§7.1), never with §7.7 item 3's `rejectSite`, so the removal never lapses. The dossier's own records keep their
protection: the conduit house bound to the water record stays dossier-backed, and a map delete of it is a `rejectSite`
like any dossier element's. A DM who wants an aqueduct at a TOWN draws it (T4 `road` with `raised`, or the aqueduct
class; item 110 (b)); a drawn one is a declaration, held like every declaration.

### 4.2 The host-side actions in the Map tab

Each is a control in the frame's header (V08 §5.1), offered by role — except the load-mismatch keep, listed for its
lifecycle and drawn by the shell (SR2-04) — and each has one event or one store operation, its undo and its lifecycle. Only the DM (`owner`) and a co-DM (`editor`) have a frame; a player's tab has no actions (V08 §3.14).

**How a click reaches the page** (SR-04; J-V8.88). The controls are drawn in the frame (`HostSlots.header`, V08 §3.1 step
7 (b)), but most operations are the page's — the host holds the dossier, the store and the assistant's settings. So a
control whose operation is the page's posts `host.action { action, args? }` (V08 §2.2), which the client surfaces as
`MapSession.on('action')`, and the host runs the row's operation with the calls named there; a control whose operation
commits an event ("Update the map engine") commits it in the frame through `doc.changed`, and the client then asks for
`doc.snapshot` as V08 §3.7 says; "See what the players see" runs in the frame alone. Keeping the saved town after a load
mismatch has no header control: it is V9 §3.14's load-mismatch choice, which the shell shows the owner at load, so one
event has one control (J-V8.94). A control that
needs a confirmation ("Restore previous map", "Make a new map from the record") shows its dialog in the frame first — the
restore dialog lists the map edits after `backups[0].logHead`, which the frame holds from `host.state` — and posts only
on confirmation. No control posts anything else (T-V8-47).

| action (role) | what it does | event or store operation | undo | lifecycle notes |
|---|---|---|---|---|
| Refresh now (owner, editor) | offers the current dossier at once | `host.action { refresh }` → the host's `MapSession.offer` with its current dossier → `dossier.offer` → committed dossier events | none: dossier events are no undo target (§7.4); the map converges if the host later restores (F22) | the record's `lastOffer`, `absorbed`; the party set re-rendered (V08 §3.14 (3)) |
| Update the map engine (owner) | upgrades the document to the running output version; the dialog summarises §7.5's diff in words — what moves, what the new version adds (raised ways, retaining walls and deck plots among them, each removable after the update), what it retires (C8-47 (3)) | in the frame: an `upgrade` event through `doc.changed`; the client then sends `doc.snapshot` and calls `replaceSnapshot` | `undo` of the upgrade (§7.5), in the session and after reload while `from` is in the window | `snapshot.outputVersion` changes at the compaction; the party set re-rendered |
| Keep the saved town (owner; after a load mismatch) — no header control | §2.9 step 4's keep: V9 §3.14's load-mismatch choice (`error.mismatch`'s **Keep saved** · **Use rebuilt**, V9 §4.9), which the shell shows the owner at load (SR2-04; J-V8.94) | in the frame: after its keep commits the `rebase` through `doc.changed`, the client sends `doc.snapshot` (a compaction) | §7.4's rebase undo | §11.3's bridged rule: other clients install it |
| Restore previous map (owner) | makes `backups[0]` the snapshot with an empty tail, then absorbs the current dossier; refuses a backup whose `docId` is not the record's `mapId` | `host.action { restore }` after the frame's dialog → `MapStore.replaceSnapshot` with the backup; a fresh `doc.load` to every open session (`module.status { loading }` between); then an offer | "restore" again swaps back (`backups` rotate: the replaced snapshot becomes `backups[0]`) | the dialog lists the map edits the restore loses — a removal of generated item-110 content made after the backup among them (V08 §4.3) |
| Make a new map from the record (owner) | a fresh creation from the current dossier under a new `mapId`; the old record is kept under its own `mapId` | `host.action { newMap }` after the frame's dialog → a creation offer under a new host-minted `mapId` and `MapStore.create` of the new record; the host points the settlement at it; a fresh `doc.load` to every open session | "Go back to the old map" (the host points the settlement at the kept record again) while the host keeps it | the old `mapId` is not deleted by the module; whether and how long the host keeps it is the host's (B11 detects a pointer to a lost one); the old record's `backups` are never mixed into the new one's (restore refuses a foreign `docId`) |
| Reveal to the party (owner, editor) | adds places to what the party knows | `host.action { reveal, args: { places } }` → `MapSession.setParty({ reveal: places })` → `MapStore.setParty` (compare-and-set on `party.rev`), then the party set re-rendered and `host.state { party }` re-sent | "Hide again": `host.action { hide, args: { undo: true } }` → `setParty({ prev: true })` (one step); an older reveal is undone by hiding it | `MapRecord.party` (V08 §2.1, §2.7) |
| Hide from the party (owner, editor) | removes places from `party.places` | `host.action { hide, args: { places } }` → `setParty({ hide: places })` | "Reveal again": `host.action { reveal, args: { undo: true } }` → `setParty({ prev: true })` | as above |
| The party's base knowledge (owner) | sets `party.tier` (`public`, or `local` for a party native to the town) | `host.action { partyTier, args: { tier } }` → `setParty({ tier })` | `host.action { partyTier, args: { undo: true } }` → `setParty({ prev: true })` | as above |
| See what the players see (owner, editor) | the frame's `ViewOpts.viewAs` set to the party key — a display filter; the frame's key stays `secret` (V08 §3.14 (5); SR-05) | in the frame (the header's toggle), or `MapSession.seePlayersView(on)` → `host.state { playersView }`; no view-state write, no store write, no event, no `host.action` | the same toggle | the frame's view options only (session memory) |
| Assistant settings (owner) | chooses volume V10's configuration for the built-in clerk and its spending cap | `host.action { assistantSettings }` → the host opens its own assistant settings (SettlementForge's settings surface, outside the Map tab; J-V8.35 holds for the tab) and calls `MapSession.setClerk(config)` → V10's `clerk.config` (V10 §3.17; BCR-V10-7) → `ClerkMount.host` and `HostSlots.clerkMode` (V08 §3.1 step 7 (a)) | the previous configuration, re-sent | the host keeps the choice; the module keeps no secret beyond the session |

### 4.3 Locality, protection and the dossier's reach

A dossier event mutates only its disruption set (§7.7 item 5; T20-8), around every lock, pin, positive placement and
declared entity (§7.2); an edit it can no longer honour is reported and orphaned, never dropped (J-A20.73). A DM's
rejection of a dossier element's site holds until the settlement grows or declines past the roster tolerance (§7.7 item
3). Nothing a player does changes the model: a player holds no document and no session (V08 §3.14), and the players'
reveals change only `MapRecord.party`, never the log.

**The removal hold for generated item-110 content (C8-42 (2), (3)).** Removing a generated raised way, a retaining wall
(a generated terrace's walls among them) or a deck plot (V08 §4.1; file f item 260's suppression kinds `raised`,
`retaining`, `deckPlot`) holds through every absorb, every catch-up epoch, a rung change, a line re-key (`rebind`,
V08 §3.8), an `upgrade` (§7.5's mapping hands the tombstone to its successor), the load-mismatch keep (V9 §3.14; the
rebase keeps the log's edits) and a host undo that re-offers an older dossier (F22 converges forward; the delete stays in the log).
Only "Make a new map from the record" (a new document) drops it, and "Restore previous map" drops it when the restored
backup predates it — the restore dialog lists it among the edits lost. A removed raised way's slot stays closed: when a
later dossier change raises the cap (V08 §2.6b (1) (d)), the reason may open a NEW slot only, which the history panel
announces as new (V08 §4.6). The slot mechanism is item 110's in the base (routed to the coherence pass with critique-V5's
same request for islands, V08 §13 X8).

### 4.4 The host clerk — SettlementForge's assistant as a client of the tool API

SettlementForge's assistant is a clerk in §11.2's sense: it drives the map through the tool API alone, over the bridge,
with nothing added for it (§14's clerk; J-A101.83). Its wiring:

1. **Session, rights and the relay (C8-01, C8-20; J-V8.73).** The assistant acts on the map only inside an editing
   user's session — the DM's or a co-DM's — through that session's `MapSession.query` and `.preview`, with that user's
   role and knowledge key and never a role of its own (J-V8.21). Wherever its model loop runs — SettlementForge's server
   or its page; SettlementForge's assistant was not surveyed (V08 §12) — its map tools RESOLVE IN THE DM'S PAGE: the
   page receives the tool call through SettlementForge's own channel, executes it with `query` or `preview` and returns
   the answer the module posted, already projected in the frame (V08 §5.4 (3); BCR-V10-7 (c)): the page carries no
   projection code and never holds a full answer (SS-01). When no map is open, the client opens a headless session (the refresh mode's
   frame, V08 §3.4) for the call and closes it after; the cost is one load (V08 §6). **A player's assistant never has a
   session**: it reads the stored party gazetteer (V08 §3.14 (2) (c)) on SettlementForge's side, which holds only what
   the party knows.
2. **Reading.** The kinds offered to the host clerk are those of V08 §5.4 (3)'s table (SS-04): the base's `gazetteer`,
   `people`, `whereIs`, `relations` and `fates` by that section's rows, and the reader kinds of V10 §3.17's table —
   `brief`, `entity`, `sites`, `why` (with its sections), `frame` without `near` and `radiusM`, `rule` and `profile`;
   `measure`, `hit` and `inView` are refused `E_HOST_KIND`. Answers are paged at 64 KB, every row marked with its tier
   (`dossier`, `declared`, `map`) and filtered by the key. For a dossier element, a `why` answer names the derivation row that placed it
   (DR10), the relation, supply and siting rows that pulled it (item 103's families, from provenance — the rows volume
   V11 writes), and the dossier change that caused its current state: `changeId`, `source`, `week` and
   SettlementForge's own reason (§7.7 item 13), so "why is the tannery here" and "why did it move in week 40" are
   answered from the log. "Why is this quarter poor" reads the field's drivers, item 102's daylight share among them
   (the answer's form is volume V10's). For generated item-110 content, `why` names its reason — a drop, a link or a
   water need — and the DR-V8.7 or DR-V8.8 inputs it read ("the city's water system (SettlementForge) and a spring
   in reach to the north"), in V10's words (C8-47 (4)).
3. **Proposing.** The assistant proposes through `MapSession.preview(events, { view: true, proposal })`, the proposal
   body BCR-V10-7 (b)'s. What the frame does with it is V10 §3.17's host proposal intake, cited, not restated: the card
   in the frame, Accept sending `doc.changed` with `proposedBy: 'clerk'` and the DM as author, and the module's
   `clerk.proposal { id, status, seqs? }` answer, which reaches the page as the session's `clerkProposal` event so the
   assistant learns what the DM chose; a refused `clerk.config` reaches it as `clerkConfigRefused` (SS-03). A proposal that touches a dossier fact is refused
   `dossier-owned` with the closest alternatives (§7.7 item 11), so the assistant can suggest where the dossier's smithy
   stands but never add, remove or rename it — for that the DM changes the dossier in SettlementForge. A proposal to
   remove generated item-110 content is an ordinary delete of generated content, never refused (V08 §4.1).
4. **Prose.** The map passes no dossier prose to any assistant: this port line carries no description seed (V10 §1b.5;
   BCR-V10-14); SettlementForge's assistant has the dossier on its own side (SS-05).
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
   section's own assistant, the default recommended) needs no built-in clerk.

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

Every line below is a catalogue key with its args (V9 §2.9's `MsgRef`); the words are written once, in this section's
tables, in V10 §3.9, in V06's chronicle templates or in V9 §4.9's rows (`history.dossierFacts.creation`,
`report.moved.<kind>`, `report.dossier.<state>`; J-V9.109), and the panels render them — no sentence is composed by the
panel (SS-43, SS-44; J-V8.99; SR2-24 (c)).

**The absorb group** (V9 §4.10; C8-47 (1), (2)). The history panel draws each committed absorb — its `dossierFacts`
ledger event and the port's `host:port` events after it, up to the next ledger event or another session's event (V08
§3.6 step 6; V9 §4.10's dossier groups, J-V9.107; SR2-24 (d)) — as one group headed `host.group.absorb` ("{n}
changes from SettlementForge, week {week}"), or `host.group.absorbUndated` ("{n} changes from SettlementForge") when the
ledger entry's week is null; `{n}` is the absorb's `DossierChange` count. Inside the group, in this order:

1. **The changes.** Each dossier event is V9 §4.10's dossier-event row, and under it the report entries it caused
   (§5.4's `changes`, each naming its `changeId` and reason), each by V9 §4.9's `report.moved.<kind>` row (SR2-24 (c)).
2. **The port's notes.** One line per note of the ledger event's `notes` (V08 §3.6 (4)): its `msg` rendered by the
   table below, with **Show** when its `keys` bind elements (each resolved to its address by V9 §4.10's `entity` read by
   `dossierKey`, BCR-V9-36). A
   line whose `keys` bind an element the view's effective key (V9 §2.10; V9 §4.8) does not admit is not drawn (§11.2
   *Knowledge*; SR-24).
3. **What the absorb's epochs built by item 110.** Each epoch the absorb carried is V9 §4.10's `epoch` row — V06's
   chronicle for it (V06 W19; V6 §3.15.1): a raised way founded, finished, repaired or run dry is that chronicle's
   `raisedWay` entry, and its **Why here?** opens the way's `raised` section, whose row for a built way is
   `info.raised.built` with the DR-V8.7 or DR-V8.8 inputs it read as the answer's `facts` rows of tier `dossier`
   (V10 §3.9). A reason that fired at a slot the DM closed is one line `info.raised.suppressed` (`{w}` the removal's
   week; V10 §3.9, one key with V10's `raised` section, CVR-V10-14), drawn as V9 §4.10's `epoch` row's line, from V06's
   `EpochReport.raised.suppressedFired` (V6 §2.10, filled by the `raisedWays` pass, V6 §3.19.3 (2); V9 XV-V9-28; J-V9.113;
   SR2-24 (b); X21), with **Show** on the removal's former
   outline. A way founded in a slot
   a cap increase opened is an ordinary founding entry — never the removed way's return (the slot rule, J-VI.14). The
   panel reads these from the epochs' records and reports (item 110 (f) records each raised way's reason); it recomputes
   nothing.

The creation's prefix is listed the same way under V9 §4.10's creation row: its ledger event's notes as item 2.

**The standing notes** (SS-44; SR-23, SR-24). The report panel reads `report(h)` (§5.4's `GenerationReport`), and its
dossier section (V9 §5.7's "for a dossier-bound town") lists `GenerationReport.dossier` (the placement state — V9 §5.7's
"V08's dossier state list"), then `GenerationReport.dossierNotes` under `host.group.standing` ("How the map reads
SettlementForge's record"), one line per note as the absorb group's item 2 — its `msg` rendered by the table below,
**Show** on its `keys`, and a line whose `keys` bind an element the view's effective key (V9 §2.10; V9 §4.8) does not
admit not drawn. `dossierNotes` is the document's `DossierBinding.notes` at the report's seq, copied by every
derivation's report build (BCR-V8-8), so every frame and every reload shows the same list with no read of its own. The
notes of class `standing` stay there while each port run writes them, and appear in an absorb group only in the absorb
that first wrote them. Notes of class `report` — and every note of an offer answered
`unchanged` or refused — reach only the host's report (`dossier.result.report`, `MapSession.on('report')`), where the
page renders them with the same keys through `statusText`.

**The held state** is no history row, since a held absorb commits nothing: the tab's banner (V08 §5.1) and the frame's
held notice (`HostSlots.banner`, V08 §3.1 step 7 (b)) show `host.status.held` and the reason row `MapRecord.held.reason`
(V08 §3.9).

**The party group.** Reveals, hides and a change of the party's base knowledge are listed as the DM's own actions
(`host.revealed`, `host.hidden`, `host.partyTier`), with the time the party pictures were last drawn
(`host.picturesDrawn`), in the panel's group "The party" through `HostSlots.historyLines` (V9 §4.10's group; SR2-01,
SR2-03), which the handler makes from successive `host.state` values (V08 §3.1 step 7 (b), (c)), since the record keeps no
reveal history beyond `party.prev` (J-V8.58). Each line is drawn by V9 §4.10's rule for the host's lines; its undo is
V08 §4.2's "Hide again" or "Reveal again" (SR3-06).

**The port's notes in words** (SS-44; J-V8.97 – J-V8.99). One row per `PortNote` kind — the base's eight and V08 §2.4's
twenty-seven — key `host.note.<kind>` (the `held` kind: V08 §3.9's `host.held.*` rows). Each text is one sentence of at
most 25 words in V9 §4.9's style; its args are the note's `msg.args`, filled by the port as the args column says — names
as the dossier writes them, never an id. **Show** lists what the note's `keys` hold. **Class** decides where the note is
kept (V08 §3.6 (4)): `event` — the ledger event of the run that wrote it, drawn in that absorb's group; `standing` — the
ledger event only when new, then `DossierBinding.notes` while every run writes it, drawn in the report panel's dossier
section from `GenerationReport.dossierNotes`; `report` — the host's report only, never the document.

| kind | words (`en`) | args (filled from) | Show (`keys`) | class |
|---|---|---|---|---|
| `unmapped_kind` | "{name} is a kind the map does not know yet, so it is built like any {class}." (seam-settlements-r6 SR6-07: no article before the slot) | `name` the record's name; `class` the `label` cell (V11 §2.3, BCR-V9-8; seam-settlements-r5 SR5-03) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (the `villageForm`, the archetype's `village` cell, or the tag fallback, whose `market` entry names V11's `market` class, the open space's market) — or, for a pin kind a cell names, its `host.pinKind.<kind>` row (*The pin kinds' words*, below this table; seam-settlements-r6 SR6-06); read after the fold (V08 §3.6 (4); SR4-07, SR5-07; J-V8.115) | the record | standing |
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
| `custom_resolved` | "{name} is built like any {class} ({rung})." (SR6-07) | `name`; `class` as `unmapped_kind`'s row reads it — V11's `label` cell of the class built, or a pin kind's `host.pinKind.<kind>` row (at a village rung the archetype's `village` cell decides: a `mercantile-market` record names the market cross by its `host.pinKind.market_cross` row, not the `market_hall`'s label; SR4-07, SR5-07); `rung` V9 §2.7's `chips` words for the deciding rung ("from its tags", "guessed from its name" …) | the record | event |
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

**The pin kinds' words** (seam-settlements-r6 SR6-06; applied by the finalization). Three message rows of V08's own `host.*` family, loaded by V11's registry row 87 with V08's other `host.*` rows, give the words a note's `class` argument shows for the three pin kinds a record can name (V11 §3.11): `host.pinKind.shrine` "wayside shrine", `host.pinKind.well` "well" and `host.pinKind.market_cross` "market cross". The legend's own symbol-key words for every glyph are the base's and the application's (§9.5; V09), not this table's.

The group heads: `host.group.absorb`, `host.group.absorbUndated` and `host.group.standing` (words above). T-V8-14's
walker fails the build on a `PortNote` kind or a `PortRefusalCode` case without its row, on a row over 25 words, and on an
arg a row names that its note does not fill (a compile check over the union and the table).

## 5 Rendering, labels, exports

### 5.1 The Map tab — what SettlementForge draws and what the frame draws

**SettlementForge's side draws three things only** (J-V8.35): the tab's container, the stored thumbnail as an `<img>`
until the frame's first live frame (V08 §3.1 step 1), and a one-line **status banner** driven by `module.status`, so a
failure is visible even when the frame is dead — plus, on a player's tab, the client's party viewer (V08 §3.14 (4)),
which is part of the client, not SettlementForge's own drawing. The banner's words have ONE source, volume V09's `host.*`
catalogue rows, generated into the client's `statusText` defaults at build time (C8-40); the host may translate them.
Keyed by phase; the key and its words are this table's (SS-44; V08 §13 X12):

| phase (`module.status`) | key and words (the client's default text) | shown to |
|---|---|---|
| `booting`, `loading`, `verifying` | `host.status.opening` "Opening the map…", with `progress` when given | owner, editor |
| `absorbing` | `host.status.absorbing` "Catching up with the settlement's record…" | owner, editor |
| `held` | `host.status.held` "This map is held as it was.", followed by the reason row `MapRecord.held.reason` (a `host.held.*` row, V08 §3.9) | owner, editor |
| `upgrade-available` | `host.status.upgrade` "A newer map engine is available — use Update in the map's header" (no button: no host → PLAT message reaches a dialog in the frame, and SettlementForge draws no map control, J-V8.35; SR2-04) | owner |
| `error` | `host.status.stopped` "The map stopped; reopening it.", then `host.status.failed` "The map could not start." with the button **Retry** | owner, editor |
| any phase with `detail` | the `host.*` row `detail` names, beside the phase's row — B10's `host.recovered.*`, B20's `host.verify.mismatch` (V08 §3.9) — and, after B11's new map, the client's own `host.recovered.newMap` | owner, editor (B20: editors only) |
| — (a refused creation: no map) | `host.status.notCreated` "No map was made yet.", followed by the reason row, in the thumbnail slot | owner, editor |
| — (the player's tab, no frame) | `host.party.asOf` "As the party knows it, week {week}" (`host.party.asOfUndated` "As the party knows it" when the set's `week` is null), or `host.party.notOpened` "The DM has not opened this map yet"; the viewer's region label `host.party.region` "Settlement map, as the party knows it" (V08 §3.14 (4)) | players |

**The frame draws everything else** — `@plat/app` in host mode (BCR-V8-3): the map region, the history panel (V08 §4.6),
the report panel, the gazetteer and the "features in view" list, item 101's tools by role, the export menu by role and
key, and the tab's actions of V08 §4.2 in the frame's header (`HostSlots.header`, V08 §3.1 step 7 (b); a control whose
operation is the page's posts `host.action`, V08 §4.2), each shown only to the roles its row names. Host mode
differs from the standalone app in exactly these points (SR3-06): no file operations — New town, Open…, Save a copy,
Recently deleted — and no permalink (V9 §2.2's `fileMenu: false`; SR3-02: the host is the store, and §11.1's permalinks
need a `DocResolver`, which host mode does not configure), and Settings without its Storage section (no local store,
V9 §3.8 (6); SR3-02; J-V8.96); every action that makes a new document follows V9 §3.9's host-mode rule
(`HostSlots.newDocuments: 'download'`, V08 §3.1 step 7 (b); SR2-03); the assistant as the host's `clerk.config` sets it
— the Assistant button only under `builtin`, otherwise the card-only drawer for a host's proposal (V9 §2.2, §4.11; V10
§3.17) — with no creation mode and no **Start a new map from this** (V9 §3.9, §4.11); the history panel carries the group
"The party" (`HostSlots.historyLines`, V08 §4.6); the basic panel shows the dossier-owned
intent values — the population, the tier word — locked with the reason "Set by SettlementForge" (`HostSlots.lockedControls`,
reason `host.locked`; §7.7 item 11), while
the map facts the port derived (the wealth level, the density) stay editable (§7.7 layer 1); only owner and editor
frames exist (a player never mounts one, V08 §3.14), and a co-DM's frame has the editor's tools and exports by §11.1's
key rules; the header carries the party controls ("Reveal to the party", "Hide again", "See what the players see",
V08 §4.2), and while "See what the players see" is on — a display filter, `ViewOpts.viewAs` (V08 §3.14 (5)) — the frame
shows a persistent strip "Showing what the players see" in its banner slot (`HostSlots.banner`), with the button "Show
everything" that switches it off, so the DM never mistakes the filtered view for the whole map; the strip stands for
V9 §4.8's View-as banner while the host's party key is set (J-V8.89; V08 §13 X15). Accessibility is §14's; the `<iframe>` carries
`title="Settlement map"` and the map region its accessible name, so the tab reads as one landmark.

### 5.2 Drawing the dossier's records and custom content

Each new entity kind is drawn, labelled, exported and persisted as this table says; the drawing rows are §8.2's
thematic and `states` rows (BCR-V8-15 adds the rows named here; each has its program in every shipped family, `ink`,
`lit` and `hatched`, and falls back to the family's generic tint program where a family lacks one, §8.2).

| record (V08 §) | drawn | labelled | exported | persisted |
|---|---|---|---|---|
| `ConditionOverlay` (3.11) | by its archetype's `conditions` row: `siege` — a tint on the enceinte band and a hatched ring outside the wall; `quarantine` — a desaturating tint over the built area and a barrier mark at every gate; `occupation` — a banner mark on the seat's building (a new symbol `occupation`, §8.3); `migration` — item 70's camp clusters as the base draws them; every other archetype no mark | never on the map; the cartouche's legend names each drawn condition ("Under siege since week 40") for every key, since its tint is visible anyway; an archetype without a tint is named only for a `secret` key (J-V8.40) | GeoJSON: one feature per overlay (`kind: 'condition'`, archetype, severity, weeks) without geometry of its own, its `targets` the addresses it tints; SVG/PNG: the tint groups under `layer.thematic` | the model (§2.7) |
| `DepositSite` (3.11, 3.13 (4)) | its land use as §4.9 draws it; `depleted` by a `states` row `worked-out` (spoil heaps on a mine or quarry, a stump field on a wood); `removed` nothing | the deposit's display name — the `deposits` row's label, a custom resource's name, or for a derived site (`res:derived:<landuse>`, SR2-04) its land use's label — as a hinterland feature label at the city band (§9.4's hinterland rows) | GeoJSON: the land-use feature gains `deposit` (key) and `depositState` | the model |
| `PowerRelation` (3.11) | not drawn; item 72's political view reads it | — | the JSON schema only (model format) | the model |
| dossier-backed `Person` (3.11) | not drawn; the gazetteer's people list and the hover card of the building it works or lives in ("Works here: Aldric Venn, master of the Tanners' Hall") | by its workplace's knowledge: a notable posted to a place a key does not admit is withheld with that place (§11.2 *Knowledge*); else public | people CSV and the JSON schema | the model |
| `HistoryHint` (3.11) | nothing (it shapes generation) | — | the JSON schema | the recipe |
| `CustomChainRecord` (2.8) | an optional thematic view `supplyChains` (off by default): each ACTIVE chain as a dashed line along the way graph's shortest route between its placed nodes in flow order, an arrowhead at each node, the endpoints drawn to their gate or quay; one colour per chain from the thematic palette in key order; an inactive chain is not drawn. **Knowledge** (SR-25; J-V8.103, J-V8.105): a chain is drawn, labelled, listed in the gazetteer and exported only when the key admits every one of its joined nodes — the view's effective key (V9 §2.10) for the drawing, the legend and the gazetteer; the export's knowledge key for GeoJSON and pictures (§11.1 *Knowledge*: the export dialog's key, BCR-V9-14, or `exportPicture`'s `knowledge`, V08 §5.3) — each node whose `key` binds a placed element (the resource's site, a processor's institution and its building) admitted by its `knownTo` in §9.2's admission table as a band-less reader admits it (as at the city band, §11.2 *Knowledge*), a concealed use (item 63) never; otherwise the chain is not drawn, not listed (a chain is a relation, never an "unnamed" row) and not exported | the chain's label in the view's legend; and in the gazetteer under the kind `customChain` — each ACTIVE chain with its label, an inactive chain not listed — the read by which V9 §5.4 offers **SettlementForge's chains** (XV-V9-26; the host projection keeps the row as any `gazetteer` row, V08 §5.4 (3)); both under the drawn column's knowledge rule, so a chain with a withheld node has neither a legend row nor a gazetteer row | GeoJSON: one LineString per active chain the export's key admits by the drawn column's rule, on the view's route, `kind: 'supplyChain'`, its key and label; nothing else; an SVG or PNG export draws the view's chains under the same rule at its own key | the model |
| `CustomServiceRecord` (2.8) | not drawn (a sub-location, item 104 (h) (5)) | in its provider's hover card and the gazetteer | the JSON schema | the model |
| a custom institution's building | as any building of its class, which item 104 (a)'s resolution decides at fold (V08 §3.5 (5) (f); V11 §3.13.1); `landmark` raises its significance (item 72), so its label enters the ladder one band earlier (§9.4); `material` is passed to the building's material row (§2.6; the row's content is V02's) | its dossier name | as any dossier-backed building, `plat:tier` `dossier` | the model |

A held map is shown by V08 §5.1's banner and the frame's held notice (`HostSlots.banner`), a frozen view by the shell's
own `error.frozen` strip (V9 §3.14 (b); XV-V9-24), never by a change to the map's marks. Item 110's terraces, retaining walls, raised ways and deck plots are drawn, labelled and exported by the
base's rows like any generated content; the port adds no drawing row for them.

### 5.3 Pictures for SettlementForge's own surfaces

* **`exportPicture(fmt, { knowledge, displayNames, opts })`** (V08 §2.2) — `png`, `svg` or `print` only (J-V8.36).
  `knowledge` — an `Admission`, BCR-V10-22's type and BCR-V9-14's union (SR2-06) — lowers the requesting editor's key
  for that one export and never raises it (BCR-V8-1): the key form `{ tier: 'public', places: [] }` for an anonymous or
  gallery picture and `{ tier: 'local', places: [] }` where the DM chooses a local picture — key forms, never a bare
  tier, which would be read with the requester key's places (J-V8.92); omitted for the DM's own. Every picture for an
  audience that never mounts a live map — players, anonymous, gallery, a DM-full share (§14's audience table) — is made
  by an owner's or editor's session or by the refresh frame, and stored or served by the host as it chooses; the
  players' set is V08 §3.14's, drawn by the module on `party.render` under the resolved party key, never through
  `exportPicture` (J-V8.91).
* **Notes and pins in pictures (C8-36).** A picture draws the document's public notes and view pins and the annotation
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
* **SVG as data.** SettlementForge may place the SVG in its own PDF plates and public pages (research C-11); the inert
  bar is §11.1's (text as outlines by default, no script, no external reference) and SettlementForge's own sanitiser
  still runs on its side.
* **The title.** The dossier's name and tier word (§9.5; §7.7 item 15); a picture's metadata states its tier shares
  (§11.1), so a SettlementForge surface can say "every institution from SettlementForge's record".

### 5.4 What leaves the frame — door 1 closed by ruling, and structurally for every structured format

Door 1 is closed by ruling (J86; §11.4). Structurally (J-V8.37 revised; C8-05), no STRUCTURED format reaches
SettlementForge's code — no GeoJSON, VTT, glTF, CityJSON, CSV, skeleton or query geometry. What the host does hold is
stated plainly: the document, as an opaque stored artifact it has no decoder for, and pictures, whose drawn outlines the
owner's audience table accepts (§14; research C-11).

1. **The host client carries no decoder.** It receives the document's bytes (`dossier.result.created` and
   `doc.snapshot.ready`) and stores them as handed; `@plat/bridge-client` imports no part of `@plat/model`, so it cannot
   read them (the lint of §14's dependency rules gains the client as a leaf that imports nothing of `plat/`,
   BCR-V8-3). `doc.snapshot` is the editing role's storage message, not an export: a viewer's is refused
   `doc.rejected { reason: 'role' }`, and `E_HOST_FORMAT` does not apply to it (T-V8-27).
2. **Pictures, not data.** `exportPicture` offers `png`, `svg` and `print` alone. Every other format — GeoJSON, VTT,
   glTF, CityJSON, CSV, the skeleton, `.plat` as an export — is the USER's, offered by the frame's export menu under
   §11.1's key rules and saved to the user's device through the frame's `allow-downloads` sandbox flag; the host client
   has no call that returns one, and the module in host mode answers a host's `export.request` for any other format with
   `export.refused { error: 'E_HOST_FORMAT' }` (BCR-V8-1). Whether SettlementForge's own export bundle may carry the
   map's scene files is the owner's (V08 §11 Q3); until the owner says so, it may not.
3. **Words, not shapes, for every clerk answer that leaves the frame.** In host mode the MODULE applies the host
   projection to every `query.result` — and to every `preview` reply — before it is posted out of the frame
   (BCR-V10-7 (c)): this section's rows for the base's kinds, V10 §3.17's for the reader kinds; the host client
   receives only projected answers and carries no projection code, so one component owns the projection and no full
   answer ever reaches SettlementForge's page (SS-01; door 1, J86). The projection is a fixed list of kept fields per
   answer kind, a table of `@plat/api`'s host-mode bridge handler; it keeps names, kinds, addresses, districts, tiers,
   reasons and alternatives by name and drops every coordinate, ring, bearing, distance, extent and viewport field:

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
   refused `E_HOST_KIND` — are V10 §3.17's rows (SS-04). The party gazetteer is assembled and projected by the module
   the same way before it goes into `party.rendered` for storage (V08 §3.14 (2) (c), (3)). The built-in clerk (volume V10) runs in the module;
   under V10's configuration B its prompt and every tool result pass the same projection before they leave the frame
   (C8-20; V10 §3.17). T-V8-27 asserts on the bytes the module posts.
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
as SettlementForge supplies the words — the module's own strings are its locale table (§14's app), with English the
default.

## 6 Performance budgets

On §12.1's reference machine, p95 (BCR-V8-16), measured by the host harness (V08 §7.2) with the frame on the module's own origin and
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
| `dossier.result` size, excluding `created`'s bytes | ≤ 2 MB | ≤ 2 MB | ≤ 2 MB | the ledger event carries before and after facts; over it, the result is split into ordered parts of ≤ 1 MB under one `re`. The `.plat` bytes of `created` and of `doc.snapshot.ready` are `ArrayBuffer` transfers (no clone), bounded by §2.9's document budget (≤ 0.6, 3 and 8 MB) (C8-26) |
| the refresh queue, per map (boot paid once) | ≤ 1.3 s after a year | ≤ 3.5 s after a year | ≤ 8 s after a year | load + absorb + two thumbnails (≈ 5 µs × B + 10 ms each) + a compaction (`.plat` encode ≤ 60 ms at CITY) + the party set (the render row above); a campaign of 20 CITY maps ≤ 70 s of background work |
| memory, one live map per frame | §12.8's rung line + 30 MB | same | same | the app's fixed heap; the refresh frame has no tile worker except while it draws thumbnails and the party set |
| memory, the DM's page, all frames (C8-23; SS-39) | ≤ 161 MB (a visible TOWN frame whose built-in clerk holds an authoring turn, and a refresh frame at TOWN); ≤ 141 MB with no turn | ≤ 231 MB (a visible TOWN frame holding a turn beside the refresh frame at CITY, which runs only beside a visible TOWN or with the Map tab closed; a visible CITY alone with a turn ≤ 196 MB); ≤ 211 MB with no turn | ≤ 421 MB (a visible METROPOLIS frame alone holding a turn; a METROPOLIS refresh beside a visible TOWN holding one ≤ 381 MB); ≤ 361 MB with no turn, ≤ 291 MB with one frame | ≤ 1 MB for the client + Σ over live frames of (§12.8's line for its document + 30 MB): 40, 110 and 260 MB; at most one CITY or METROPOLIS document live on the page (V08 §3.4) + V10's scratch line (BCR-V10-19: 20, 55 or 130 MB at the frame's rung) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal — configurations A and B, where that clerk runs in the frame; C opens no scratch, and the refresh frame runs no built-in clerk (J-V8.97); over the bar, V10 §3.19's overlay mode for that turn (BCR-V10-19's device fallback) |
| memory in SettlementForge's page, outside the frames | ≤ 1 MB + the thumbnails on screen; a player's page ≤ 1 MB + the party tiles in view (≤ 20 MB) | same | same | the client, its queue and the viewer's decoded tiles (released off screen) |
| storage per map record | ≤ 4.6 MB worst (snapshot 0.6, tail and one kept segment 0.5, 2 backups 1.2, thumbnails 0.3, party set 2) | ≤ 15.9 MB worst, ≈ 8 MB typical | ≤ 36.8 MB worst | §2.9's size budget plus the party set's row; the backups' count per rung is the owner's (V08 §11 Q2) |

**Why these numbers.** The map tab must never feel slower than opening the standalone map: the load row is §12.5's own
law, and everything the stage adds on top — the hash, the clone, the digest, the diff — is under 100 ms at every rung.
The refresh queue trades time for memory (V08 §3.4): it is background work the DM never waits on, and a map opened
before its turn is absorbed at once in its own frame.

## 7 Tests and acceptance bars

### 7.1 The bars (T-V8-n)

Each bar names its CI tier (§13.8: PR, nightly, milestone) and the step of V08 §8 from which it runs (BCR-V8-17). Fixtures are
§13.2's frozen dossier set (items 83, 84) — never a live SettlementForge — plus test-side mutations of a fixture's
digest or JSON made by the harness at run time, never written back into a fixture file.

| bar | what it proves | tier, from |
|---|---|---|
| T-V8-1 | the embed boots on Chromium, Firefox and WebKit (Playwright) with the frame on its own origin under V08 §3.1's sandbox flags and both CSPs; `ready` within V08 §6's rows; a message from a wrong origin or from another window of the right origin is dropped and logged (§11.3) | PR, SF0 |
| T-V8-2 | `@plat/bridge-client` is ≤ 12 KB gzipped with its viewer (≤ 8 KB without), imports nothing (a bundle scan), and its message types equal `@plat/api`'s bridge schema field for field (a generated-types diff); a type-level check that every `MapStore` write parameter (`encoded`, `seqAfter`, `logHeadAfter`, `SnapshotBlock`'s fields, `PartyPictureSet`) is a field of a message the client receives, so the host computes nothing it stores (C8-04) | PR, SF1 |
| T-V8-3 | two editing clients offering `create` for the same settlement at once: the host stores exactly one record, and the loser's document is byte-identical to the stored one (canonical bytes and model digest); two editors' absorbs of the same dossier on the same head are byte-identical, every event with session `host:port` (C8-15); on the nine at-rung births × 5 seeds | PR, SF2 |
| T-V8-4 | `hashDossier` gives one value for every key order and whitespace of the same dossier, a different value for any changed scalar, and equals a Node reference implementation on every fixture | PR, SF1 |
| T-V8-5 | against a `MapStore` that stores bytes only and never decodes, hashes or computes a head (C8-04): snapshot + tail replays to the session's model digest at every compaction point of a 1 000-event scripted session (edits, undo, redo, 12 absorbs); compaction at 256 events and 256 KB, including an edit committed between `doc.snapshot` and `replaceSnapshot` (the suffix kept, C8-29); the backups rotate two deep with `tailAfter`; after a 100-absorb script and a save–load round trip, the dossier block the fold rebuilds equals the stored one at every seq (C8-13) | PR, SF5 |
| T-V8-6 | a dossier differing from the carried state only in never-read keys, prose or below the digest's rounding returns `unchanged`: nothing appended, `lastOffer` updated, the document's bytes untouched | PR, SF2 |
| T-V8-7 | five dossier versions offered within one in-flight absorb: one further absorb against the newest; the carried facts after it equal the newest digest's; no change lost (each element's final state equals the newest dossier's) | PR, SF2 |
| T-V8-8 | convergence through the bridge: a host with a DM, a co-DM and two players' party viewers; 500 interleaved map edits (undo and redo from both editors), 12 weekly offers and one yearly: both editors' model digests equal at the end, 0 lost accepted events (§11.3's M3a test, extended to dossier offers); each editor re-runs every applied absorb it holds the dossier for with 0 mismatches, and a result with one event altered in transit is reported as a port mismatch by the other editor while the log stands (C8-37); the players' pages receive no document message at any point | nightly, SF2 |
| T-V8-9 | quarantine: a fixture with one institution record mutated to fail its own checks absorbs every other change, lists the record in `quarantined` with a `quarantined_record` note, leaves its element's building and use unchanged; with the record's key unformable, every carried institution key absent from the digest is held (no `remove`, one `quarantine_hold` note); the next offer with the record repaired absorbs it; a save–load round trip shows no dossier-block mismatch (C8-12) | PR, SF3 |
| T-V8-10 | adapter remaps are declared: a test adapter version that changes a field's meaning without listing it fails the bar on the re-cut pairs; listed, the re-baseline emits no map event and notes `adapter_remap` | nightly, SF3 |
| T-V8-11 | a line change: a test "line B" adapter with `fromLines` identity re-keys by `rebind` only, changes no address, notes `line_migrated`; without a `fromLines` row the map is held with `E_LINE_UNSUPPORTED` and a later line-A dossier absorbs normally. Two registered adapters both accepting (C8-19): `HostContext.line` picks when given; with none, a bound document stays on its line; a new settlement is created on the newest line, noted `line_defaulted`; `E_LINE_UNSUPPORTED` only when none accepts | nightly, SF3 |
| T-V8-12 | campaign scale: 20 maps (the nine births × seeds, grown to CITY where the fixture allows) after one year: every record `current`; the frame's memory peak ≤ one map's line + 30 MB; the queue pauses on input and resumes 5 s after; a page closed mid-queue resumes from `refreshPending`; the total within V08 §6's row | milestone, SF7 |
| T-V8-13 | `doc.snapshot` (C8-05): creation, compaction, upgrade and rebase store the reply's `SnapshotBlock` as handed; its `documentDigest` equals the module's own; a restore and a new map send every open session a fresh `doc.load` and leave none on a lost head (C8-28); a restore of a backup with another `docId` is refused | PR, SF2 |
| T-V8-14 | the failure ladder: each of rows B1–B20 of V08 §3.9 forced in the harness takes its stated rung and shows its column's catalogue keys with their args (never compared as words); no row changes a stored snapshot except B10's rebuild and a DM's restore; B10's second rung is exact with `tailAfter`, and B11 creates a new map under a new `mapId` (C8-27). **The words' walker** (SS-44): every `PortNote` kind of the base and V08 §2.4 and every `PortRefusalCode` with `E_RUNG_UNAVAILABLE`'s three cases has its row (V08 §4.6, §3.9), every `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*` and `host.verify.*` key named here has its row (V08 §5.1, §4.6, §3.9), each row ≤ 25 words, and every arg a row names is filled by the port for its note (a compile check over the union and the tables); on `town-1`'s pairs an absorb's `event` and new `standing` notes are drawn in its history group from the ledger event in a second editor's frame and after a reload, the standing set in the report panel from `report(h)`'s `GenerationReport.dossierNotes` (equal to `DossierBinding.notes` at the report's seq in each of those frames, `[]` on an unbound document, listed after `GenerationReport.dossier` under `host.group.standing`; SR-23), a standing note is not carried again by the next absorb that still writes it and is cleared by one that does not, and no `report` note enters the log; on a test-side variant of `town-1` whose one standing note's record and one event note's element are `secret` places, both lines are drawn at `secret` and neither is drawn — in the absorb group or the report panel — under View as "What anyone knows" or under "See what the players see" with a party key that omits them (SR-24) | nightly, SF6 |
| T-V8-15 | held and recovered: an unreadable dossier holds the map; a later readable one absorbs every change since the held state in one pass; a population falling below 1 500 holds (no village product registered) and returning above absorbs; with a test `ProductDecl` registered, a population of 0 at an absorb routes to THORP and V07's desertion — the map deserted, never held, for a village-product document and, through V07 §2.1's fold, for a base-product one — and a creation at 0 is refused `E_RUNG_UNAVAILABLE` naming the floor (SS-21) | PR, SF3 |
| T-V8-16 | display names through the bridge (T85-3 over the real transport): the public picture draws the veiled texts, title included; the document and the next export are unchanged; a `knowledge` option never raises the requester's key — a bare tier is read with the requester key's places and a key form as a key in its own right (BCR-V10-22), and the thumbnails' and gallery pictures' `knowledge` is `{ tier: 'public', places: [] }` whatever places the requester's key holds (SR2-06) | PR, SF4 |
| T-V8-17 | the players (C8-01, C8-14): a bridge trace of a player's page shows no `doc.load`, no `dossier.offer`, no `query` and no frame; `mount` refuses the word `player` before a frame exists; the party set's SVG and gazetteer contain none of the names the party key withholds (a byte search for every withheld name on every fixture) and the tiles are drawn from a display list that holds none (an instrumented render); every `gazetteer` and `people` query of a party render carries `admitAs` = the party key resolved by V08 §3.14 (1), in BCR-V10-22's key form with `places` present, and every picture of the set the same form as its `knowledge` (an instrumented facade; SR2-06, SR2-07); each audience word gets exactly §14's role and key through `doc.load.audience`, the module taking the lower of it and `role`; anonymous, gallery and DM-full shares get pictures only | PR, SF4 |
| T-V8-18 | the staged records and the real vocabularies (C8-09 – C8-11): conditions put whatever their status (`stable`, `worsening`, `easing`) with weeks from their ticks — `untilWeek` within ±1 week across town-1's and city-1's one-week, one-season and one-year ticks, else the pre-decided absolute-tick reading — and retired when unlisted; stressors put as overlays with no epoch event; deposits put, `bearingCdeg` and `landUse` written by S12a and recomputed on regeneration; relations put by the `relations` row; a successor notable inherits the house and posting; a reroll re-binds a notable by name and role (`npc_rebound`, C8-39); a replay from the log rebuilds every record; a user's or clerk's edit of their fields is refused `dossier-owned`; TOTALITY: every relation type and trend, history event type, condition status and archetype, stressor type, `magicLevel`, `materialFamily`, custom definition `economicWeight` and `criticality` word (the `customWeights` row, J-V8.108), isolation path, chain status, dependency severity and qualifier word in the fixtures has a row or the declared else, with 0 `unmapped_word` notes on the fixtures; the derived land use (SR2-04): a test-side mutation of `town-1` adding a `Salt works` record, with no salt deposit, has one `saltpan` face from `res:derived:saltpan`, noted `derived_landuse`, and its salt works within 0 of it (the hard row met, no closest-option report); a second salt-working record adds no second face; adding `salt_flats` later opens the deposit's own face and leaves the derived one standing; removing every salt-working record puts the derived site `depleted`, its face drawn worked out; and every class a `kinds` row binds whose hard `near` → `landuse:<k>` row within 0 names a land use outside §4.9's rings has its land use in the `deposits` row's derived list (a compile check); every row set V08 §2.6 writes compiles with `calibratable: false` on every column, T-V11-37's clause run on V08's sources (SCC-R2C-1; J-V8.107); **at VH**, a hamlet fixture with a `Peat cutter` record and no `marshlands` has its `marsh` face read by V07 §3.9's claim | nightly, SF4; the hamlet clause nightly, VH |
| T-V8-19 | the village hand-off with a TEST `ProductDecl` registered in `StrategyRegistry.products` (the port registers nothing; SS-28): a sub-1 500 dossier is created on its rows; a town shrinking out of the band below 1 500 and a village growing out of it above keep one document, one seed and every standing address outside the epoch's disruption set; a target alternating 1 480 / 1 520 changes the product 0 times, one alternating 1 400 / 1 600 at every epoch (V07 §2.1's band; SS-20) | milestone, SF4 (VH with V07) |
| T-V8-20 | limits and the ignore clause: dossiers over each limit refuse `E_UNKNOWN_SHAPE` with `size_limit` naming it and copy no over-long string; on every fixture the port reads no key of §7.7 item 1's never-read list (a proxy-wrapped dossier records every property access) | PR, SF3 |
| T-V8-21 | `PortValues`: with values present the staged readers read the slice's; with nulls, the table's; T88-1 unchanged on the golden suite | PR, SF4 |
| T-V8-22 | the latitude: `cell.latDeg` wins when present, else the culture row, else 50; `Intent.latitudeDeg` holds it from creation; a realm latitude arriving after creation reaches the next epoch's `PortValues.latitudeDeg` and moves the field only by item 102 (e)'s drift, never at once (C8-21); a document without the field reads 50; with item 102's `w_sun` at its default, T73-7 holds on every at-rung birth (a dossier map stays within one band of its wealth row) | PR, SF4 |
| T-V8-23 | the tag and category vocabularies: every tag of the fixtures and of the line's tag vocabulary has a `tags` row or the declared no-family fallback; every category and content group has a `categories` row; `unmapped_word` notes 0 on the fixtures | PR, SF3 |
| T-V8-24 | coverage inside a collective range (BCR-V8-12): every collective count inside its range on every seed; with coverage rows filled, the share of districts served rises above the random-placement baseline (item 103 (f)'s bar) while the counts stay inside the ranges; with the coverage weight 0 the digest equals the no-coverage build | nightly, SF4 |
| T-V8-25 | custom content's arrival (item 104 (g)'s port side): on `town-cc-1` and its test-side variants — a custom record with only a category; category and tags; a scene archetype; the admitted library fields; an active chain — each digests to the specified `custom` part, chain, resource and service; the client sends no library entry the dossier did not materialise, and a mismatched entry reaching the port is ignored with one note; an offer without the library changes nothing; a new content hash emits one `setAttr` of `custom.revision`; a chain toggled inactive, then dropped, then listed again puts, retires and re-puts one record and moves no node; `archetypes` has exactly the line's 17 ids; zero refusals from custom input; the class is decided at fold, not at digest — a custom record with no archetype and a keyword whose `class` cell names a class resolves to that class, a map declaration for its `localUid` outranks every rung, and the `custom_resolved` note names the deciding rung (SS-12); on the active-chain variant with one joined processor made a `secret` place (a test-side mutation), read at `public` and at a party key form without that place: no line, arrowhead, legend row, gazetteer `customChain` row, GeoJSON `supplyChain` feature or `supplyChains` path in an SVG export, and all of them at `secret` (SR-25) | PR, SF4 |
| T-V8-26 | the release checklist (V08 §8.3) runs as one script and fails on any unticked row | milestone, SF7 |
| T-V8-27 | door 1, structurally for every structured format (C8-05): a type scan of `@plat/bridge-client` finds no geometry-bearing field in any value it returns except the opaque document bytes and the pictures; `exportPicture` accepts only `png`, `svg`, `print`; a host `export.request` for any other format is refused `E_HOST_FORMAT`; `doc.snapshot` from a viewer is refused `role` and from an editor answered; the host projection is asserted on the BYTES THE MODULE POSTS (a transport tap in the harness records every `query.result` and `preview` reply leaving the frame; SS-01): on the fixture answer of every offered kind — `gazetteer`, `people`, `whereIs`, `relations`, `fates`, a `preview` reply, `brief`, `entity`, `sites`, `why` with sections, `frame` without radius, `rule`, `profile` (CVR-V10-3; SS-04) — no coordinate, ring, bearing, distance, extent or viewport field; `measure`, `hit` and `inView` are refused `E_HOST_KIND`; the stored party gazetteer's bytes likewise; a source scan finds no projection code in `@plat/bridge-client`; under V10's configuration B every tool result leaving the frame passes it | PR, SF6 |
| T-V8-28 | inert custom text: T85-1's hostile strings as custom names, categories, tags and descriptions reach every exporter inert; the description occurs nowhere in the document, the digest or the carried facts (a byte search) | PR, SF4 |
| T-V8-29 | the upgrade flow: an owner's client alone gets `upgrade-available`; the party pictures keep the stored version's drawing until the DM upgrades, then re-render; the dialog names what the new version adds, item 110's content among it; the `upgrade` event is compacted at once and its undo works while `from` is in the retention window | nightly, SF5 |
| T-V8-30 | the budgets: every row of V08 §6 measured on the reference machine by the host harness, the page-level memory row with a METROPOLIS refresh beside a visible TOWN, and once more under V10's configuration B with a proposal waiting — in a visible TOWN frame beside a METROPOLIS refresh, and in a visible METROPOLIS frame alone — against the row's with-turn bars (SS-39); a miss takes its row's fallback and is reported for the owner's veto (§12's rule) | milestone, SF7 |
| T-V8-31 | recognition (C8-03): every pair fixture — the 35 births and the 12 after-tick dossiers, 41 to 47 top-level keys — is recognised and absorbs; an unknown extra key is accepted, dropped and noted `ignored_key`; a dossier missing one required key is refused `E_UNKNOWN_SHAPE` | PR, SF3 |
| T-V8-32 | item 109's sources (DR-V8.2, DR-V8.3): a dossier with `ancient_ruins` or a `ruined-landmark` record has a ruin system, else V04's stated reason; `magical_node`'s site stands at the ruin's centre when the ruin has another source; a `mountain` dossier's relief is `mountainous` and a `hills` one `hilly`; a mining deposit sets V04's mining test; ley lines, a magical history event and a delving record reach `site.ruinEvidence`; the ancient founding reaches only `HistoryHint` | PR, SF4 |
| T-V8-33 | the burial and crypt trace (DR-V8.4): on every birth, 0 catacombs sourced on a church, the cathedral or a monastery's church; the cathedral's crypt is the largest; `metropolis-3`'s two cathedral records give one building (`ladder_merged`); the church count counts each church once (the metropolises' two ranges merged); below TOWN no catacomb; a cemetery closed by a dossier event leaves its catacomb's extent unchanged across the next three epochs; a TOWN-to-CITY promotion pair (a test-side mutation of `town-1` grown past 10 000 with the city burial record added and the town one kept, then dropped) closes no burial face — `rebind` only, `ladder_promoted` | nightly, SF4 |
| T-V8-34 | name resolution (V08 §3.5 (6)): on the pairs, every chain processor, dependency institution and calamity target resolves exactly, by kind family, or is noted unjoined; the exact share at least the survey's (2 585 of 3 381) and the kind family's gain measured and reported; an unjoined processor never creates a building | nightly, SF4 |
| T-V8-35 | the supply links (DR-V8.5; C8-06) on `town-1` and `city-1`: every chain with two joined members yields a link; an impaired chain's pull equals V11's status factor × a running one's; an entrepot chain's ends pull toward the gate or quay facing its partner; the links are never stored (a byte search of the document for a link record finds none) | PR, SF4 |
| T-V8-36 | the water system (DR-V8.7; C8-41) through the bridge: on `sample-blackcrag` (CITY, mountain, a bath-house) and `city-2` (riverside), every generated aqueduct's reason is recorded and its terminal is the dossier's conduit house; `city-1` mutated to 8 000 people (rung TOWN, the city record kept) has 0 raised ways; `metropolis-2`'s aqueduct cap is one above `metropolis-3`'s under the same sources (a test-side mutation giving both the same site); a record closed by a test-side mutation leaves the arches `disused` and in place; no aqueduct draws on a hot spring; with item 110's rows off the T73 runs are byte-identical through the bridge | nightly, SF4 |
| T-V8-37 | the removal hold (C8-42): on `sample-blackcrag` and `city-2` the DM removes every generated raised way; after 12 weekly offers, a yearly offer moving the population past the roster tolerance, a rung-TOWN mutation grown past 10 000, a line re-key and an `upgrade`, 0 removed raised ways stand again at their slots and the conduit house stands; a clerk's removal proposal is accepted, never refused `dossier-owned` | nightly, SF4 |
| T-V8-38 | the high-ground landmarks (DR-V8.8; C8-43): on the CITY and METROPOLIS births, every elevated road's recorded reason cites only institutions of significance at least `elevated.landmarkMinSignificance` (V11 §3.24.2), custom `landmark` records or high wards, and 0 landmark strings | nightly, SF4 |
| T-V8-39 | the culture's reach (C8-44): `city-3` with its culture mutated to `mesoamerican`, test-side, with V11's stepped rows on, makes the stepped specialisation eligible, its chance row read and cited in the temple's provenance; the aqueduct chance reads the culture's modifier row; with item 110's rows off, byte-identical | nightly, SF4 |
| T-V8-40 | the dry-site toll bridge (C8-45; BCR-V8-32): each of the six base-rung dry births (`culture-arabic`, `-celtic`, `-east_asian`, `-mediterranean`, `-slavic`, `town-3`) has a brook, a bridge where the longest approach crosses it and the toll house within 30 m of that bridge, with 0 raised ways; a `desert` mutation gives the gate toll house and a `toll_bridge_dry` note; a toll bridge record arriving by a later absorb re-draws no terrain | PR, SF4 |
| T-V8-41 | the party picture set (C8-01, C8-14, C8-36): re-rendered after a committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after `setParty`; two renders of one head and one party key are byte-identical; a reveal made by the DM is seen by a player who opens the tab afterwards and by a second player; "Hide again" restores the previous party; public notes and view pins are drawn, private ones never; B18 detects a stale set by head, party revision or output version; `putPartyPictures` keeps the newer of two concurrent sets; the render and storage rows of V08 §6 hold; with "See what the players see" on (SR-05), the frame's city band equals the party set's z0 picture at the same head (a pixel diff, both drawn with the fixed sun), the frame's knowledge key stays `secret`, the document's view section is byte-identical before and after the toggle, `doc.snapshot` is answered and the export menu still offers the document formats; a `host.state` carrying a new `party` re-resolves the filter; the crossing (J-V8.91): each render is one `party.render` answered by one `party.rendered` whose set's `partyRev` is the request's `party.rev` and whose `seqAt` is the head drawn; a map edit batch that changes no drawn mark and no listed word (a lock) is answered `unchanged` and writes nothing to the store; an edit that renames a revealed place is answered `rendered`; a viewer's `party.render` is refused `role` | PR, SF5 |
| T-V8-42 | the calamities (C8-09; DR-V8.6): the lit `city-1` pair yields its week-52 calamity as one `EpochInputs.events` entry with severity `major` (≈ 0.09 of the population) and V06's `topple` in its resolved targets' district; a target that joins nothing is dropped and noted `calamity_unplaced`; a calamity leaving the line's capped list is never undone | nightly, SF4 |
| T-V8-43 | the sea threats (C8-08): a coastal test-side mutation of `city-2` with a `wartime` stressor carries `naval` and DR2 reads it through V11's waterfront row; the same site at peace carries none (or `exposedPort` at 20 000 or more with a port); an inland site carries none; a change of the keys reaches DR2 at the next epoch, never mid-epoch | PR, SF4 |
| T-V8-44 | the ladders (item 108 (f); C8-07): the fourteen qualifier words parse to their steps; `(50-100+)` sets `openTop`; `(10,000+ only)` is a population floor, never a count; no double counting — each metropolis's two church ranges and `metropolis-3`'s two cathedral records merge; a `promotedFrom` receipt re-keys to `#1` and adds members where the greater's thing is the lesser's, and places a REPLACEMENT greater of a new thing new under the record's key, its row re-pointed and the lesser's former thing standing unbound (V08 §3.5.1 (d); SR5-01); a `demotedFrom` keeps the member nearest its demand; the institution count parity of V08 §7.3 holds by step type on every fixture; a GUILD record beside a guild COUNT record of its family places no second hall — its hall is a COUNT member `#k`, noted `ladder_merged` (SS-23); an unnumbered record at a village rung takes V07 §2.4's range row, else V11's range unscaled (SS-08) | nightly, SF4 |
| T-V8-45 | the DM's history lines (C8-47; SS-43; a harness check): a raised way built at an absorb's epoch is listed as V9 §4.10's `epoch` row whose chronicle entry is V06's `raisedWay`, and its **Why here?** opens the `raised` section with `info.raised.built` and the DR-V8.7 or DR-V8.8 inputs as `facts` rows of tier `dossier`; a reason firing at a slot the DM closed is one line `info.raised.suppressed` with the removal's week as `{w}`, from one `EpochReport.raised.suppressedFired` entry (V6 §2.10; its producer held by T-V6-58; X21); a way founded in a slot a cap increase opened is an ordinary founding entry, never the removed way's return; the check reads the lines' keys and args, never their words; the upgrade dialog names item 110's additions | nightly, SF6 |
| T-V8-46 | the pseudo-class routes (SS-10; SR1-27): every `kinds` row's class is a roster class or one of the pseudo-classes of V08 §2.6's `kinds` shape (a compile check over the rows); at a base rung, a test-side mutation of `town-1` with both `Access to external mill` (`@absent:watermill+windmill`) and `Access to parish church` (`@absent:church`) added and every record binding `watermill`, `windmill` or `church` removed places no watermill, windmill or church of its own; adding back one binding record restores that class; `@absent` records are counted by no building in the parity of V08 §7.3. **At VH** (with V07's rows, after SR1-02): a hamlet fixture with `Access to external mill` places no `v.watermill` or `v.windmill` of its own, and one with `Access to parish church` no `v.parish_church`, `v.parsonage` or `v.tithe_barn` (V07 §3.11 step 1's `villageForm` reading); a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record's key to one `cross` pin inside the church's `churchyard` part and aliases it on no building, while a test-side mutation of `town-1` holding both records (added where absent) aliases the shrine's key on the parish church's building (V08 §3.5.1 (c); seam-settlements-r4 SR4-01, SR4-06); **over time** (seam-settlements-r5 SR5-01): a hamlet fixture with `Wayside shrine` whose record a `promotedFrom` receipt promotes to `Parish church` at an absorb that takes it to VILLAGE stands one `v.parish_church` bound to the record's key, one churchyard `cross` laid for it (keyed by the record's binding key, its provenance the record, no binding row of its own; J-V8.114) and the old roadside `shrine` standing, bound to nothing, with one `ladder_promoted` note; the same hamlet whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt stands one `v.parish_church` bound to the church's key, binds the shrine's key to one churchyard `cross` and leaves the roadside shrine unbound; a village fixture with `Fishmonger` that gains `Fish market` binds the market's key to one hall on the market's rim, with the fishmonger's key as its alias and the fishmonger's shop keeping its use, unbound; a village fixture with `Palisade or earthworks` that gains `Town walls` binds the town walls' key to the one enceinte the fortification path yields — the palisade retyped when at least 80 % of the dwellings lie inside, else the new ring — with the palisade's key as its alias and no binding on a superseded palisade; and a test-side mutation of `town-1` whose `Hedge wizard` record a `promotedFrom` receipt promotes to `Wizard's tower` re-binds the standing house as the tower's member and places no second building (the first case of V08 §3.5.1 (c)); a hamlet fixture off any through road with an unmapped `lodging` kind writes one `unmapped_kind` note whose `class` is `v.alehouse`'s `label` cell — the class V07 §3.11 step 4 built — never the generic class, and T-V7-21's `mercantile-market` custom record at VILLAGE writes `custom_resolved` naming the market cross by its `host.pinKind.market_cross` words (SR4-07, SR5-07, SR6-06), the rendered sentence reading "… built like any market cross (…)", and an unmapped `lodging` kind at a hamlet off any through road renders "… so it is built like any alehouse." (SR6-07) | PR, SF3; the hamlet and village clauses PR, VH |
| T-V8-47 | the header's controls and the bridge to the shell (SR-03, SR-04; a host-harness check with the transport tap): in an owner's frame and an editor's, each control is offered exactly to the roles its V08 §4.2 row names, and a click on Refresh now, Restore previous map (after its dialog), Make a new map from the record (after its dialog), Reveal to the party and Hide from the party (with a selection of one dossier-bound and one map place), Hide again, Reveal again, the party's base knowledge and Assistant settings posts exactly one `host.action` with that row's `action` and `args` — binding keys for dossier-bound places, addresses otherwise — and nothing else, and the host's handler on `on('action')` runs the row's operation; a cancelled dialog posts nothing; Update the map engine posts its `doc.changed` (an `upgrade`) and no `host.action`, then the client sends `doc.snapshot`; the header carries no Keep-the-saved-town control, and V9 §3.14's load-mismatch keep commits a `rebase` through `doc.changed`, after which the client sends `doc.snapshot`; a frozen view's **Edit it with this version** (V9 §3.14 (b)) likewise commits its `frozenImport` `rebase` through `doc.changed`, after which the client sends `doc.snapshot`, and the frame's `banner` slot carries no frozen-view notice (XV-V9-24); the `upgrade-available` banner has no button (SR2-04); "See what the players see" posts nothing; a `host.action` whose row the role does not hold, injected by the tap, is dropped and reported; a `clerk.config` sets `ClerkMount.host.config()` and `HostSlots.clerkMode`, a host `preview { proposal }` arrives on `proposals`, and the harness's `needsToken`, `refused` and `answer` post `clerk.needsToken`, `clerk.config.refused` and `clerk.proposal`; `HostSlots.hostName` is `SettlementForge`, the population and tier word are locked with `host.locked`, and `fileMenu` is false; `HostSlots.historyLines` lists a reveal, a hide and a tier change made in this session as one `host.revealed`, `host.hidden` and `host.partyTier` line each with its targets, makes no line for the first `party` after a load, keeps one `host.picturesDrawn` line replaced at each `partyPicturesAt`, and is empty after `switchTo`; `HostSlots.newDocuments` is `'download'`, and Open a copy from here saves a `.plat` to the device and leaves the frame's document unchanged (SR2-03); with "See what the players see" on after a hide, `historyLines.list` called with the party key form returns the `host.hidden` line neither naming nor targeting a place that key omits, and not at all when it named only such places, and `list` called with the frame's key once the view is switched off returns it whole; a place whose binding row is gone is named by its key with no target; a `list` with a key the handler has not read yet returns only the lines that name no place, and `onChange` fires once the reads answer; a commit renaming a place a line names, and an applied tail that raises a named place's knowledge tier above the listed key, each fire `onChange`, and the next `list` names that place by its new name, or not at all (SR3-13 (c)); the handler registers no `onEffectiveKey` handler and exactly one `subscribe` on the loaded document — released at `switchTo`, a fresh one registered at the next `doc.load` — and every place read goes through `query`'s `entity` form with `admitAs` the listed key (the transport tap and a facade spy; SR2-24; SR3-13; J-V8.106, J-V8.109, J-V8.110) | PR, SF6 |

### 7.2 The host harness

`plat/tools/hostharness/` is a test-only host (never shipped): a page on one origin mounting `@plat/bridge-client` with an
in-memory `MapStore` that implements the compare-and-set exactly as V08 §2.2 states and stores bytes only — it imports no
decoder and no hash function, so a design that needed the host to compute anything would fail to build (C8-04) — the
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
institutions, name for name, on every fixture and after every pair, COUNTED BY STEP TYPE (item 108; C8-07): a COUNT
record as its placed members, a GUILD record as its hall plus its members (the hall counted once — as a guild COUNT
record's member when the dossier holds one, V08 §3.5.1 (c)), a QUARTER record as its neighbourhood with the
members it owns, a SIZE or REPLACEMENT record as one building, a lesser merged into a greater (`mergedInto`) once, as the
greater's member, never twice; pseudo-class records (`@none`, `@office`, `@seat`, `@layer:*`, `@landuse:*`, `@pin:*`)
by their reader's count, and `@absent:*` records by none. The two known item-110 reach points are measured the same way: every dry-site toll bridge has
its bridge (T-V8-40), and every CITY water record has its conduit house (T-V8-36).

## 8 Build plan

### 8.1 Where it slots into §16

The owner's roadmap stages "SettlementForge inputs" after the generators are mastered (*Staged by the owner's
roadmap*) and the owner's definition orders it last — built standalone, then calibrated against the corpus, then
connected (docs/DEFINITION.md §1) — so the stage is milestone **M-SF — the SettlementForge stage**, directly after volume
V12's **M-CAL**, which follows the standalone generators M4, M5, M6 and V-M4 (V12 §8.1; J-V8.39 revised; BCR-V8-18). It
needs M3a (the API, the bridge, the absorb half, the dossier contract), M3b (the picture exporters the thumbnails and the
party set use), M4 (the incremental path the catch-up epochs run on, the rung read at each epoch), M-CAL's calibrated
tables, and volume V11's **C4** — the SettlementForge rows: `dossier.kinds`, archetypes, category synonyms, keywords,
good words, ladders, the wall barrier and waterfront rows (V11 §8's C4, priced there at 1.5–2.0 pw, not here). Without V11's
rows every unmapped kind still stands at its category's generic class, reported — the stage is never blocked by content.
Because M-CAL follows M5 and M6, M-SF no longer runs beside them; putting M-SF earlier (before M-CAL, calibrating
afterwards) is the owner's product-order choice (V08 §11 Q4). The evolution engine (volume V06) is not required: before
it lands, a catch-up epoch runs the base's built growth path and hooks, and when it lands its epochs replace them with
no change to the port. The item-110 reach points (V08 §2.6b) need the base's item 110 (built with the editing and
authoring milestones) and V11's rows for it; before those, DR-V8.7 and DR-V8.8 have no reader and are carried unread,
reported. The village hand-off (VH) waits for volume V07's product and is a half-week row of its own.

### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **SF0 — spike** (risk retirement) | `embed.html` host mode booting in a frame on a second origin under V08 §3.1's sandbox and both CSPs, on the three engines; the transport's origin and source checks; `hashDossier`; a throwaway store; ONE measurement that could refute the brief — SettlementForge's app CSP and hosting admit a frame on the module's origin with workers (§8.4 risk 1) | T-V8-1 green; boot and load rows of V08 §6 measured at CITY; the CSP answer recorded | 0.75–1 |
| **SF1 — the host client and the store contract** | `@plat/bridge-client` (`MapHost`, `MapSession`, `MapStore`, `MapRecord`, `statusText` generated from V09's rows, the party viewer); the generated message types; the bridge messages, `doc.snapshot`, the `encoded` and head fields, `doc.load.audience` and `ready`'s additions in `@plat/api` (BCR-V8-1); the host-minted `docId` (BCR-V8-2); the host harness with its bytes-only store | T-V8-2, T-V8-4 | 1.75–2.25 |
| **SF2 — the port leader** | creation and absorb over the bridge by an editing role; commit through compare-and-set; every editor's verification of applied absorbs; the reserved session `host:port`; coalescing; `unchanged`; the refresh queue in its hidden frame with its lease and the page-memory rule | T-V8-3, T-V8-6, T-V8-7, T-V8-8, T-V8-13 | 2–3 |
| **SF3 — adapters and failure** | `AdapterManifest` with required and optional keys, `AdapterRegistry` with the selection order, limits, record quarantine and its hold, `E_OTHER_SETTLEMENT`, remaps and line migration (BCR-V8-4, BCR-V8-8, BCR-V8-23); the name grammar, qualifiers and ladder merges (item 108); the held state with its reason; the port notes' `msg`, `keys` and classes, the ledger's `notes` and `notesCleared` and `DossierBinding.notes`, copied into `GenerationReport.dossierNotes` (BCR-V8-4, BCR-V8-6, BCR-V8-8; SS-44, SR-23); the `tags`, `categories`, `crime`, `cultures` rows (BCR-V8-10) | T-V8-9, T-V8-10, T-V8-11, T-V8-15, T-V8-20, T-V8-23, T-V8-31, T-V8-44, T-V8-46 | 2–3 |
| **SF4 — the staged records, the values, the g items and custom content** | `dossierFacts` and `dossierRecord` (BCR-V8-6) with the records' fills and drawing rows and the chains' knowledge rule (BCR-V8-15; SR-25); `PortValues` with the latitude and the sea threats (BCR-V8-7); the realm block helper and the latitude row (BCR-V8-11, BCR-V8-24); coverage inside a range (BCR-V8-12); SettlementForge's chains, dependencies and goods (DR-V8.5); the calamities and stressors; the corrected vocabularies (relations, history, conditions, magic, era, materials, isolation); item 109's evidence, drivers and burial trace (DR-V8.2 – DR-V8.4); item 110's inputs (DR-V8.7, DR-V8.8, the dry-site brook, BCR-V8-32); the display names in use; custom content's arrival (BCR-V8-13, BCR-V8-14, BCR-V8-21) | T-V8-16, T-V8-18, T-V8-21, T-V8-22, T-V8-24, T-V8-25, T-V8-28, T-V8-32 – T-V8-40, T-V8-42, T-V8-43 | 4.5–6 |
| **SF5 — persistence in the host and the players' view** | compaction through `doc.snapshot`, backups with `tailAfter`, restore and "make a new map" with fresh loads, thumbnails, the upgrade flow and its compaction; the party picture set, the party gazetteer, `setParty` and the player's tab (V08 §3.14) | T-V8-5, T-V8-17, T-V8-29, T-V8-41 | 1.5–2 |
| **SF6 — the tab's UX and the host clerk** | host mode's chrome, banners and history panel with item 110's lines (V08 §5.1, §4.6); the words of the notes, held reasons and host lines (V08 §3.9, §4.6, §5.1; SS-44); the actions of V08 §4.2 with `host.action` and `host.state`; the bridge to the shell (`ClerkMount.host`, `HostSlots`; V08 §3.1 step 7); the host clerk's relay, projection and previews; `setClerk` and `clerkNeedsToken` (V08 §4.4, §5.4) | T-V8-14, T-V8-27, T-V8-45, T-V8-47 | 1.25–1.75 |
| **SF7 — hardening and release** | campaign scale; every budget measured; the release checklist; the fixtures re-cut and run through the bridge | T-V8-12, T-V8-26, T-V8-30; T73-1 – T73-7 and T75-1 – T75-5 green through the bridge | 1.5–2 |
| **VH — the village hand-off** (after V07) | the port's consultation of `LadderRouter` with V07's registered `ProductDecl` (file f item 202), the band fold at epochs and the desertion route at 0 (SS-20, SS-21, SS-28); T-V8-19 on V07's rows as well as the test product | T-V8-19; T-V8-15's village clause; T-V8-46's hamlet clauses (SR1-27); T-V8-18's hamlet clause (SR2-04) | 0.5 |
| **total (the map side)** | the revision adds ≈ 2.75–3.5 pw over the first estimate (12.75–17.5): the players' pictures, the snapshot and head fields, the ladders, the g-item traces, item 110's inputs; reconciliation round 2 adds 0.25 pw at SF6 (the bridge to the shell, `host.action`, `host.state`); reconciliation round 1's continuation adds 0.25 pw at SF3's top (the notes' args, classes and standing list, SS-44); V11's C4 (1.5–2.0 pw) is priced by V11 | | **15.75–21.5** |
| SettlementForge's side (the owner's program, priced for the owner's plan, not in the total) | the lazy Map tab chunk and its mount; the map-record table with its conditional write and row-level security; `frame-src` for the module's origin; the advance hook that marks `refreshPending` and calls `refresh`; the library entries for `customLibrary`; the assistant's use of `query` and `preview`; the status banner's strings | SettlementForge's own tests plus R7 below | 1.5–2.5 |

### 8.3 The release checklist (run by T-V8-26 before every release of the SettlementForge configuration)

| row | check |
|---|---|
| R1 | every T-V8 bar, T73-1 – T73-10, T75-1 – T75-5, T77-1, T81-2, T85-1 – T85-3 and T88-1 – T88-2 green at the release commit |
| R2 | the adapter set: each registered adapter's `line`, `version` and `commit` equal a fixture manifest's rows; every manifest's `keyList` passes §14's lint; each manifest's `vocabulary` versions equal the `tablePins` of the fixture documents it serves, and a moved pin is reported with the table rows it changes (C8-34) |
| R3 | output-version retention: the release replays every stored fixture document of the two previous output versions exactly (§6.4) |
| R4 | the host client's version and its message types match the module's `protocol`; a client one protocol behind is refused at `ready` with the upgrade notice |
| R5 | the module origin's headers equal V08 §3.1's list (a scripted fetch of each response header) |
| R6 | the budgets of V08 §6 re-measured, any fallback taken reported in the release notes |
| R7 | SettlementForge's integration: the harness driver run against SettlementForge's staging store and tab (the owner's environment) — create, a week, a year, a held dossier, a restore — all bars green |
| R8 | the known-defects file (§14's `@plat/docs`) lists every open defect of this stage with its workaround |
| R9 | a new SettlementForge line (when one ships): its adapter folder, the fixtures re-cut by the same scripts, T-V8-10 and T-V8-11 on the old line's pairs |
| R10 | the clean-room scanner (§17.1 (5)) passes over `@plat/port`, `@plat/bridge-client` and the host mode's code |

### 8.4 Risks, in order

1. **SettlementForge's frame policy.** The stage assumes SettlementForge can host a frame on a second origin with
   workers, as it already does for its realm map (research C-1). SF0 measures it; **pre-decided fallback:** the module's
   files served under a path of SettlementForge's own static host with a separate origin via a subdomain it already
   runs, and, if no second origin is possible, a `MessagePortTransport` to a module worker on SettlementForge's origin
   without the frame — the worker holds no account data and receives only data messages (§11.3), the protection then
   resting on the bridge's data-only rule alone, reported to the owner.
2. **The store's conditional write.** The commit rule needs a compare-and-set on `logHead`. SettlementForge's store is
   a hosted Postgres (research C-6), where a conditional update is one statement; if the owner's storage cannot do it,
   **pre-decided fallback:** a lease — the client takes a 30-s renewable lease on the record before committing, and a
   client without the lease sends its edits as `doc.changed` to the leaseholder's session through the host.
3. **Refresh time at METROPOLIS scale.** A metropolis year can take ≈ 8 s in the queue with its party set (V08 §6). **Fallback:** the queue
   processes the maps the DM opened most recently first, and a METROPOLIS map is refreshed only when opened.
4. **A new SettlementForge line before M-SF lands.** One adapter folder and a fixture re-cut (§14 item 1); the stage's
   bars are line-agnostic, so the plan does not change.
5. **Storage cost at campaign scale.** Up to ≈ 37 MB per METROPOLIS record with two backups and the party set (V08 §6).
   The backup count per rung is the owner's (V08 §11 Q2); **fallback:** one backup at METROPOLIS, then the party set's
   own fallback (z2 over the built-up area, z3 capped at 32 tiles).
6. **SettlementForge's assistant is unsurveyed.** Where its model loop runs is not known (V08 §12); the relay of V08 §4.4
   (1) works either way because the map tools resolve in the DM's page. **Fallback:** if the assistant cannot call back
   into the page, it answers from the dossier alone and proposes nothing on the map; map questions and previews go to
   the in-frame built-in clerk (V08 §4.4 (6)), which needs no new stored artifact.
7. **The condition weeks' reading** (`expiresAtTicks` as a whole length, V08 §3.11) is PLAUSIBLE. T-V8-18 measures it on
   the one-week, one-season and one-year ticks; **fallback:** the absolute-tick reading, pre-decided there.

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V8.1 | chose to run the port inside the module's generation worker, beside the document, over running it in SettlementForge's bundle, because the port reads the document's carried facts and emits events the module must dry-run, and SettlementForge's bundle then holds only a 12 KB client (8 KB plus the party viewer) with no knowledge of our model |
| J-V8.2 | chose "only an editing role — the DM or a co-DM — runs the port and commits; the log's single head arbitrates" over electing a port leader, because `digest`, `creation` and `absorb` are pure, so two editors compute the same events and the host's compare-and-set drops the second as `stale` with nothing lost. REVISED (C8-01): the first version's viewer half — a player previewing uncommitted absorbs — is withdrawn; a player never holds the document or the dossier (J-V8.57) |
| J-V8.3 | chose one map record in its own row beside the settlement, keyed by settlement and map id, over storing the map inside the dossier's data, because the document is about ten times the dossier's size and would ride every save, sync and public projection (research C-6) |
| J-V8.4 | chose the host's SHA-256 over the dossier's canonical JSON to decide WHETHER to offer, and the port's fact-level diff to decide WHAT changed, over a host-side fact hash, because the host holds no port and must stay dependency-free, while the port alone knows which keys it reads |
| J-V8.5 | chose snapshot plus event tail with compaction at 256 events or 256 KB and two rotating backups over storing only the log or only snapshots, because loads stay at §12.5's law, every event is durable at once, and a damaged snapshot has a known predecessor (V08 §3.9 B10) |
| J-V8.6 | chose the background refresh after an advance to run in ONE hidden frame on the DM's page, serially, pausing on input, over a server-side renderer or parallel frames, because the product has no hosted service (§11.5), one document at a time keeps memory at one rung's line on any campaign size, and `refreshPending` makes it resumable |
| J-V8.7 | chose an `<iframe>` on the module's own origin with `allow-scripts allow-same-origin allow-downloads` over a worker or script on SettlementForge's origin, because it is SettlementForge's own pattern for its realm map (research C-1) and no module code then runs beside accounts or payments |
| J-V8.8 | chose to quarantine a malformed record and absorb the rest over refusing the whole dossier, because one bad record must not freeze a campaign's map, and the record keeps its last carried state and is retried at every offer |
| J-V8.9 | chose the selection order `HostContext.line` → the document's bound line → the single accepting adapter → at a creation, the newest accepting line, recorded and noted `line_defaulted` — with `E_LINE_UNSUPPORTED` only when none accepts — over refusing whenever two adapters accept, because a bound map must stay on its line until a declared migration moves it, and a declared, reported default is no silent guess, while the first version's refusal would hold every map the moment a second line was registered. REVISED (C8-19) |
| J-V8.10 | chose a declared re-baseline (`remaps`, no map event) for an adapter's own version change over treating every re-read field as a dossier change, because a change in our reading is not a change in the settlement, and T-V8-10 enforces the declaration |
| J-V8.11 | chose declared `fromLines` key migrations with a hold when absent over re-creating the map on a line change, because the players' map must survive SettlementForge's own upgrades, and an undeclared migration would re-bind by guess |
| J-V8.12 | chose one document, one seed and one history across the village and town products over a new map at the 1 500 boundary, because the owner's continuity rule (item 22) makes a settlement's map follow its history, and §4.11's rung change already carries a crossing; the product at each epoch is V07 §2.1's fold with its hand-off band (`handoff.band`), so a population hovering at 1 500 never flips the product (BCR-V7-26; SS-20), and the port registers nothing — it consults `LadderRouter` over V07's `ProductDecl` (file f item 202; SS-28) |
| J-V8.13 | chose a host-minted document id (`MapRecord.mapId`) over the module minting one per creation, because two clients creating one map at once then produce byte-identical documents (T-V8-3) |
| J-V8.14 | chose one `dossierFacts` ledger event per absorb, carrying every change's before and after, over storing the dossier block only in snapshots, because the block must rebuild from the log alone (§2.9) and the report reads it |
| J-V8.15 | chose one `dossierRecord` event kind for every staged record (conditions, deposits, relations, persons, custom chains and services) over one kind per record, because they share authorship, addressing, fold and lifecycle rules, and one kind keeps §7.4's dossier rule in one place |
| J-V8.16 | chose to carry crime, food import, food chains and legitimacy on the circumstance slice (`PortValues`) over `editTable` events on `PortRows`, because a table edit re-derives from its first reader stage — the reshuffle item 22 forbids — while an epoch's slice moves them at the cadence |
| J-V8.17 | chose to round severities to 1/1 000, standings to 1/10 000 and percentages to 1/100 in the digest over carrying raw floats, because floating noise in a host's arithmetic must never read as a change (T-V8-6) |
| J-V8.18 | chose that this volume owns the SHAPES and lookup chains of `kinds`, `archetypes`, `categorySynonyms` and `keywords` while volume V11 writes their rows beside each class's siting profile, over writing the kind rows here (280 at the pinned line, read from `dossier.catalogue`; SS-35), because the rows are siting content that must agree with V11's profiles row by row |
| J-V8.19 | chose a SettlementForge-tag → family table in `tables/dossier/tags` over reading tags directly in the solver, because the host's words stay inside the port's tables (§14's lint), and item 103 (a)'s default-profile-by-tag needs a stable family vocabulary |
| J-V8.20 | chose to let coverage (item 103 (f)) weigh the count INSIDE a collective record's range and decide where its members go, over letting it change the range, because the range is a dossier fact and the count inside it a map fact |
| J-V8.21 | chose that SettlementForge's assistant acts only inside a user's session with that user's role and key over a role of its own, because a player's assistant must never read what the party does not know, and §11.2 already gives every clerk its viewer's key. REVISED (C8-01; SS-42 of seam-surfaces-r0's continuation): an editor's assistant acts inside that user's frame session with the user's role and key (§11.2); a player's assistant has no session, frame or document (J-V8.57) and reads only the stored party gazetteer, made under the party key (V08 §3.14, §4.4 (1)) |
| J-V8.22 | chose that the players' pictures keep the stored output version's drawing until the DM upgrades over re-rendering them under each release, because an upgrade can move things (§7.5's diff) and the DM decides when the table sees it. REVISED (C8-01): players see pictures, not a live map |
| J-V8.23 | chose at most one offer in flight per session, a newer dossier replacing a queued one, over queueing every version, because the port diffs carried facts against the newest dossier and dates changes from its receipts, so skipped versions lose nothing SettlementForge's own end state keeps |
| J-V8.24 | chose to paint the stored thumbnail at once and swap in the live map over a spinner, because the tab then shows the town within 50 ms whatever the frame's boot costs |
| J-V8.25 | chose that every epoch of a catch-up reads the NEW digest's slices over interpolating them, because SettlementForge keeps no interior history of trade, economy or powers (research V52, V56); interpolating would invent facts |
| J-V8.26 | chose each culture's centre of gravity, rounded, as its latitude (`cultures`) over one latitude for all, because item 102's daylight share should differ between a northern and a southern setting when the host gives no realm latitude; the values are not calibratable (a table fix: the row sets' flag, V08 §2.6's header; REVISED by SCC-R2C-1, J-V8.107) |
| J-V8.27 | chose to compute the realm block host-side in a pure client helper (`realmBlockFrom`) from the campaign's placements, the realm map's scale and latitude scale and the campaign's spatial digest over sending raw placements to the module, because the realm map is the host's and §7.7 item 1 lets the module carry only the spatial digest's words: the module receives bearings, distances, cell words and a latitude, nothing else of campaign state. REVISED (C8-21; BCR-V8-24) |
| J-V8.28 | chose that the host computes display names with its own public filter over the module re-implementing that filter, because the filter is SettlementForge's product rule and the module must never hold it (item 85 (b)) |
| J-V8.29 | chose that the module takes the LOWER of the role it is told and the role of the audience word over trusting either alone, because a client bug in one of the two must never raise a player's rights |
| J-V8.30 | chose to reuse one frame across a campaign's settlements (`switchTo`) over a frame per settlement, because boot is then paid once per page and only one document is live |
| J-V8.31 | chose the author's library fields as an OPTIONAL `HostContext.customLibrary` admitted only when its definition, revision and content hash equal the dossier's, and carried in the document, over asking SettlementForge to add them to the dossier, because the map never asks (item 20 (h) (iv)), the dossier stays the truth, and replay must never need the host |
| J-V8.32 | chose to reduce a custom description to keyword keys inside the adapter over carrying the description, because §7.7 item 1 admits no prose beyond the description seed, and the keywords are item 104's weakest signal anyway |
| J-V8.33 | chose the dossier's own activation verdict for custom chains over recomputing "all nodes present" in the port, because the verdict is SettlementForge's rule on SettlementForge's facts — recomputing it could disagree with the dossier |
| J-V8.34 | chose that a realm latitude arriving after creation enters at the next epoch as a `port-values` change, moving the town only by item 102 (e)'s drift, over freezing the creation latitude, because SettlementForge usually places a settlement on its realm after generating it (research s §4, C-9), so a frozen culture latitude would stay wrong, while re-deriving at once would shift every plot's daylight share together — the reshuffle item 22 forbids; the DM may still `adjust` it. REVISED (C8-21) |
| J-V8.35 | chose that SettlementForge draws only the container, the thumbnail and a status banner over drawing map chrome of its own, because the map's UI then ships and versions with the module, and a dead frame still shows a readable state |
| J-V8.36 | chose pictures only (`png`, `svg`, `print`) through the host client over every export format, because anything else carries geometry into SettlementForge's code (door 1, J86); files are the user's, from the frame's export menu |
| J-V8.37 | chose to close door 1 structurally for every STRUCTURED format — no decoder in the client, pictures only through the client, every clerk answer and the party gazetteer projected to words — and to state that the host stores the document as an opaque artifact and holds pictures, over the first version's claim that nothing geometric reaches the host, because that claim was false (the `.plat` bytes and the SVG paths do rest with the host) and the ruling J86 plus the owner's audience table already accept pictures. REVISED (C8-05) |
| J-V8.38 | chose dossier fidelity through the bridge (T73, T75, the institution count parity) as the stage's parity measure over a reference-parity metric, because no reference generator embeds a map in a host with a settlement record |
| J-V8.39 | chose milestone M-SF directly after volume V12's M-CAL, which follows M4, M5, M6 and V-M4, over running it beside M5 and M6, because the owner's definition orders the connection after the calibration and V12 places M-CAL after the standalone generators; an earlier M-SF is the owner's product-order choice (Q4). REVISED (C8-24) |
| J-V8.40 | chose to name a condition in the legend for every key only when its archetype draws a tint over naming every condition, because a drawn tint is visible anyway while a political condition (infiltrated, indebted) is the DM's secret |
| J-V8.41 | chose to order the creation prefix with each active custom chain's nodes upstream first over the dossier's order alone, because item 104 (h) (4) needs a downstream node to see its suppliers' sites, and a fixed order keeps creation deterministic |
| J-V8.42 | chose the dossier's `chainId` as a chain's identity — a changed node set being a new chain — over our own identity from the nodes, because it is SettlementForge's identity and needs no guess |
| J-V8.43 | chose to make a NEW map from the current dossier under a new `mapId` when the host has lost the record (B11) over refusing, because the dossier is the truth and a creation of the current state is one pass of §7.7's One path; the lost layout is not recoverable — item 22 (c) lets the new map differ — and the report says so. REVISED (C8-27) |
| J-V8.44 | chose "restore previous map" as a swap to the newest backup followed by a forward absorb over rewinding dossier events, because dossier events are never undo targets (§7.4) and the map must end at the current dossier |
| J-V8.45 | chose to read SettlementForge's per-institution `priorityCategory` as the institution's political role, DR12's first input (BCR-V8-25), over ignoring it, because it is a per-record fact naming the domain the institution serves (government, military, religion…), which is what DR12's power association needs; it is not the never-read generation sliders (`config.priority*`, §7.7 item 1), which are settlement-wide weights whose effect already sits in the institution list — so nothing is counted twice (C8-32) |
| J-V8.46 | chose "the host stores, the module computes" — every encoded event, sequence number, head and snapshot field arriving in a message, the host comparing only `baseLogHead` with its head — over a host that encodes or hashes, because the host client imports nothing (BCR-V8-3) and a store that must compute would need our model code on SettlementForge's side (C8-04) |
| J-V8.47 | chose to read `magicLevel` `medium` as `low` over a fourth level, because 32 of the 35 births carry `medium` and D-3's realism floor keeps magic present but not shaping the town unless the dossier says `high` (C8-11) |
| J-V8.48 | chose to place a `teleport_circle` for a `magical_transit` isolation path only when no dossier record already binds that class over always placing one, because the dossier is the truth of what exists and a derived use would double a listed record (C8-11) |
| J-V8.49 | chose that the chain-status weights are V11's (`siting.web.chainStatus`) and the port carries only the neutral status key, over the weights the critique proposed for V08, because one weight table must serve the supply web on standalone and dossier maps alike; the values are V11's and calibratable (C8-06) |
| J-V8.50 | chose never to produce the `raider` sea-threat key from a dossier over mapping a nearby word to it, because the line has no raid or piracy word (CONFIRMED over its fifteen stressor types and the archetypes seen); `raider` stays a standalone and pack key (C8-08) |
| J-V8.51 | chose not to make an ancient founding a ruin-evidence row over reading great age as evidence, because V04 already compares `history.ageYears` with its own `ancientYears` through `HistoryHint`; one reader, one constant (C8-02) |
| J-V8.52 | chose to keep power-relation keys unordered and to read no relation as directed over the critique's directed key `relation:<from>><to>`, because the line's pair order is not a direction (CONFIRMED: of `city-1`'s four `subordinate` pairs, three name the superior first and one last), so a directed reading would invert a quarter of them; a later line that stamps a direction adds it through a declared `remaps` entry (C8-10) |
| J-V8.53 | chose that a churchyard stays a burial face while its church plot keeps the churchyard part, the church ruined or not, closing only when the plot is cleared and re-used, over closing it with the church, because the burial ground outlives its church in historical practice and item 109 (k) never lets a catacomb shrink (C8-02) |
| J-V8.54 | chose never to undo a calamity that leaves SettlementForge's capped history list over reading its absence as a removal, because a calamity happened and cannot un-happen; the list is capped for size, not revised (C8-09) |
| J-V8.55 | chose to cite §4.11's cadence — an epoch at each calendar year end (week mod 52 = 0) and one at each ± 5 % population crossing inside the span, dated from `populationHistory`, plus one at each new calamity's week — over the first version's drifting year and single population epoch, because the cadence is the base's and a restatement with a variation is a second truth (C8-31) |
| J-V8.56 | chose to give stressors one path, a `stress:<type>` condition overlay read by the epoch's readers, over also adding an `EpochInputs.events` entry, because two paths would count one stressor twice (C8-09) |
| J-V8.57 | chose to give players a stored party picture set (a PNG pyramid, a building-band level only over the places they know, the city-band SVG) and a stored party gazetteer, never the document, a dossier or a session, over a live frame filtered by their key, because §11.1 *Knowledge* forbids sending the document to a client a place is secret from, item 85 (a) forbids the seed leaving the host, and SettlementForge's player view is player-safe by construction; a live "party copy" is a new capability, owner question Q5 (C8-01) |
| J-V8.58 | chose to record what the party knows on the map record (`MapRecord.party`, written by `setParty`, one-step "Hide again") over per-session view state, and to replace SettlementForge's retired area fog consciously by place-by-place knowledge, because a reveal must reach every player, every later picture and the gazetteer, and the base's knowledge model is by place (§9.2); area fog over a live map is Q5's (C8-14, C8-36) |
| J-V8.59 | chose one reserved session, `host:port`, constant and group-less, for every event the port emits over the committing editor's session, because byte identity across editors (T-V8-3) and every user's undo stack (V09) depend on the port's events belonging to no user (C8-15; BCR-V8-19) |
| J-V8.60 | chose recognition by a REQUIRED key set plus a declared optional list, any other top-level key accepted and dropped with a note, over an exact key count, because lived dossiers carry 41 to 47 keys and a later line may add more; refusing an extra key would hold every advanced campaign map (C8-03) |
| J-V8.61 | chose a dedicated editing-role message `doc.snapshot` for creation, compaction, upgrade and rebase, exempt from `E_HOST_FORMAT`, over asking for a `.plat` export, because storage is not an export and the export refusal must stay absolute for hosts (C8-05) |
| J-V8.62 | chose to leave the calamity-to-hazard mapping in volume V06's calamity table (DR-V6.1) and to carry only the `CalamityRef` — with its deaths for V04's burial growth — over a second mapping table in this volume, because two tables would disagree; V06 owns the reader, this volume the inputs (C8-09) |
| J-V8.63 | chose to date a condition from its ticks — `sinceWeek = W − elapsedTicks`, `untilWeek = W + expiresAtTicks − elapsedTicks` — with a measurement and a pre-decided absolute-tick fallback, over leaving conditions undated, because the line's statuses carry no weeks and a condition must end at its week on the map (C8-10) |
| J-V8.64 | chose that every editing client holding the dossier re-runs an applied absorb and REPORTS a mismatch, never blocking the fold, over trusting any editor's result or requiring a second signature, because the log's order is the truth, §11.3 already reports a fates mismatch this way, and a block would let one faulty client freeze the map (C8-37) |
| J-V8.65 | chose, for a toll bridge on a site with no watercourse, a brook added at CREATION across the longest approach's through route (the site row's river chance set to 1 for the smallest class), over dropping the bridge, raising an undeclared way at a TOWN or inventing water later, because a brook is the realistic reason for a toll bridge, needs no raised way (item 110 (b) forbids one undeclared at TOWN) and touches §5.3's deck invariant not at all; a record arriving by a later absorb never re-draws the terrain (item 22), so its toll house takes an existing crossing or the gate, noted (C8-45; BCR-V8-32) |
| J-V8.66 | chose that nothing item 110 generates is dossier-bound — its provenance naming the records that fed its reason — so the DM's removal is the base's delete of generated content and never lapses, over binding a raised way to its water record, because binding it would turn the DM's delete into a `rejectSite`, which lapses at the next epoch or scoped dossier event, and the arches would return within a year against the owner's "a user can decide to add or remove" (C8-42; BCR-V8-31) |
| J-V8.67 | chose that a dossier-bound conduit house makes item 110 (b)'s water need count as met at CITY and METROPOLIS, the chance, cap and source-in-reach rules unchanged, and that the RUNG, never the tier word, gates the reason, over scaling the aqueduct chance by the city water record, because that record is required at chance 1 on every SettlementForge city (7 of 7) and would be one constant, and SettlementForge's lower cities are our TOWNs, where item 110 allows arches only by declaration (C8-41) |
| J-V8.68 | chose that a custom record resolved to the `water-supply` family counts as a water system at CITY and METROPOLIS but never declares arches at TOWN, over treating a custom water record as a declaration, because a declaration is the DM's act on the map, not an author's library entry (C8-41 (g)) |
| J-V8.69 | chose never to make a hot spring an aqueduct source over allowing it, because a hot or mineral spring gives a bath-house and mineral water, not a drinking supply (C8-41 (h)) |
| J-V8.70 | chose to define item 110 (b)'s "dossier landmarks on high ground" as the dossier-bound institutions of class significance at least the castle's and the custom `landmark` records, read at their S3 reservations, over SettlementForge's `quarters[].landmarks[]` strings, because the strings are street, yard, pin and institution names (none a high-ground landmark) and reading them would count an institution twice; the threshold is its own calibratable row (C8-43), REVISED (SCC-R2C-10; J-V8.107): V11 §3.24.2's setting `elevated.landmarkMinSignificance`, beside the `landmarkFactor` it gates, since a map rule's constant belongs in V11's settings, not in this volume or a dossier row set |
| J-V8.71 | chose to keep the era `c14` for every culture and to carry the CULTURE to item 110's aqueduct chance and stepped specialisations, over inventing an era from the culture, because the line has no era field and the culture is its only preset input; which cultures build in tiers is V11's content (C8-44) |
| J-V8.72 | chose not to read SettlementForge's world-state works ledger over deriving a raised way from its infrastructure count, because the ledger names no structure, lives outside the dossier, and the port reads only the dossier and `HostContext` (C8-49) |
| J-V8.73 | chose to resolve SettlementForge's assistant's map tools in the DM's page — the page executing `query` and `preview` and returning the answer the module already projected (V08 §5.4 (3)), a headless session when no map is open — over a server-side map session, because the product has no hosted map service (§11.5) and the page already holds the session and the key; where the assistant's loop runs is unsurveyed and does not change the relay (C8-20) |
| J-V8.74 | chose that the refresh frame never starts beside a visible CITY or METROPOLIS document over letting two large documents share the DM's page, because two METROPOLIS documents would exceed any reasonable page budget (§12.8: 260 MB each); the queue waits for the tab to close or a TOWN to be visible (C8-23) |
| J-V8.75 | chose the compaction precondition "the snapshot's head is the record's head or lies in its tail", keeping the tail's suffix, and keeping the removed segment on `backups[0]` as `tailAfter` until the next compaction, over a compare-and-set on the head alone, because an actively edited map must still compact and B10's second rung must be exact (C8-27, C8-29) |
| J-V8.76 | chose to re-bind a notable after a reroll by equal name and role over only through `replacedNpc`, because a reroll renumbers the ids and the research plan's J-M11 re-binds by name and role; any other vanished notable is retired (C8-39) |
| J-V8.77 | chose to re-render the party set after each committed absorb, 30 s after the last committed edit batch that changed a drawn mark, and at once after a reveal, keeping the newer of two concurrent sets by the integer pair (last seq, party revision), over rendering on every commit or only on demand, because rendering costs up to 3 s at METROPOLIS and players must see reveals at once (C8-01) |
| J-V8.78 | chose one source for the tab's banner and caption texts — volume V09's `host.*` catalogue rows, generated into the client's `statusText` defaults at build time — over a second copy in the client, because two copies drift (C8-40) |
| J-V8.79 | chose, when a quarantined record's key cannot be formed, to hold every carried institution key absent from the new digest (no `remove`, one `quarantine_hold` note) until a readable dossier arrives, over removing the absent keys, because an unreadable record might be any of them and a wrong removal would close a standing building (C8-12) |
| J-V8.80 | chose to make the `changeIds` trim part of the fold of each `dossierFacts` event over trimming at save, because the dossier block must rebuild from the log equal to the stored block at every seq (§2.9's load check) (C8-13) |
| J-V8.81 | chose to keep V11's ladder rows marked `inferred` where SettlementForge's ladder file lacks the pair but the dossiers list both forms (two church ranges, two cathedral records), over dropping them to match the file, because item 108 (c) must merge whatever the dossier lists; every disagreement with the file is a table fix handed to revise-V11 (C8-07) |
| J-V8.82 | chose to resolve a chain processor, dependency institution or calamity target by exact name, then by kind family (count range and qualifiers removed, plural folded), else to keep it by name and note it unjoined, over fuzzy matching or creating a building, because the dossier is the truth of what exists and a fuzzy join would bind the wrong record (C8-06) |
| J-V8.83 | chose to bind a GUILD record's hall into a guild COUNT record by the GUILD record's `categories` family — `craft` to `craft_guilds_*`, `trade` to `merchant_guilds_*`, members `#1…#m` in dossier order, the COUNT's placed count at least m — over binding every guild into whichever guild COUNT record is present, because a carriers' or cartographers' guild is no craft guild's member unless the dossier's own category says so, and the dossier's category is the one fact that sorts them (SS-23; V11 §3.12) |
| J-V8.84 | chose to project every `preview` reply a host receives (dropping `shape` and `actions[].at`) as well as every `query.result`, and to refuse `hit` and `inView` with `E_HOST_KIND` as `measure` is, over projecting query results only and leaving the view-bound kinds unanswered, because a preview reply carries a polygon that would cross door 1 (J86), and a named refusal is the only answer a host can act on (SS-01, SS-04) |
| J-V8.85 | chose that a population of 0 at an absorb of a BASE-product document reaches V07's desertion through V07 §2.1's fold (0 lies below the band's lower edge), over holding a town whose record reports no inhabitants, because SettlementForge's end of a settlement (§7.7 row F20) is an outcome the map must show, and the fold is the one path from a town to the village product (SS-21) |
| J-V8.86 | chose one host → PLAT push, `host.state` (the party key, the backups' heads, the pictures' time, the players'-view switch), kept in the session's memory, over `view.set` — which writes view state and would re-create the knowledge-key mechanism SR-05 removes — and over routing the frame's toggle through `host.action` and back, because the frame's controls need facts only the host's record holds, the host computes nothing it stores, and a view filter needs no round trip (SR-04, SR-05) |
| J-V8.87 | chose "See what the players see" as a display filter — the frame's `ViewOpts.viewAs` set to the party key in SR-06's key form — over setting the view's knowledge key, because V09 decided a lowered view is a filter (J-V9.46) so the document formats, `doc.snapshot`, compaction and saves stay the role's, and one capability must have one mechanism (SR-05) |
| J-V8.88 | chose to carry every page-side header action as one enumerated PLAT → host push, `host.action`, with the host running V08 §4.2's row through its existing calls, over giving the frame calls into the host's store or settings or drawing the controls on SettlementForge's side, because the frame holds no account or store access (§11.3), SettlementForge draws three things only (J-V8.35), and one enumerated push is testable (T-V8-47); "Update the map engine" and "Keep the saved town" stay in the frame because their events are the document's, and "Assistant settings" opens SettlementForge's own settings because the host holds the proxy, the token and the cap (SR-04). REVISED (SR2-04; J-V8.94): "Keep the saved town" is not a header control — it is V9 §3.14's load-mismatch choice, shown by the shell at load |
| J-V8.89 | chose one banner for the players' view — this volume's strip "Showing what the players see" in `HostSlots.banner`, V9 §4.8's View-as banner not drawn while the host's party key is set — over drawing both, because two lines saying the same thing crowd a narrow frame and the strip names the DM's own check; V09's half is V9 §4.8's "A host's players' view" (J-V9.85; V08 §13 X15) |
| J-V8.90 | chose the embed's bridge handler as the one filler of `ClerkMount.host` and `HostSlots` (V08 §3.1 step 7), with `hostName` a deployment constant of the SettlementForge build and `historyFilter` left unset, over a bridge field for the host's name and a history filter for the co-DM, because V09 gives the harness and the shell one channel (J-V9.81), the host's name is fixed per deployment, and both frames that exist hold `secret` (SR-03) |
| J-V8.91 | chose to make the party picture set cross the bridge as one request and one reply — the client's `party.render { party, since? }` and the module's `party.rendered { set }` or `unchanged` — with the module resolving the party key, drawing the pictures under it as `knowledge` and listing the gazetteer under it as `admitAs`, over the client assembling the set from `exportPicture` and `query` calls, because only the module can resolve binding keys to the addresses a key form holds (BCR-V10-22's places are ids), only the facade lowers a query (`admitAs`; the bridge's `query { q }` carries none), the set is one value the store takes whole (T-V8-2 requires it to arrive in a message), and the client already holds every trigger — its commits, `setParty`, the open-time check and the refresh loop; the `drawDigest` test keeps the first version's rule that an edit changing nothing drawn costs no store write (SR2-06, SR2-07; found in passing) |
| J-V8.92 | chose key forms with empty places — `{ tier: 'public', places: [] }`, `{ tier: 'local', places: [] }` — for the host's own public and local pictures over a bare tier, because BCR-V10-22 reads a bare tier with the requester key's places, and a DM's session key may carry places a gallery picture must never admit; a key form is a key in its own right (SR2-06) |
| J-V8.93 | chose to fill `HostSlots.historyLines` from the differences of successive `host.state` values in the handler's memory — reveals, hides and a tier change, and one replaced "pictures last drawn" line — over a stored reveal history or new `host.state` fields, because the record keeps only `party.prev` (J-V8.58), a line is no log event (J-SS2.2) and the handler already holds the values; and `newDocuments: 'download'`, over `'off'`, because the owner's "everything editable" keeps a past state reachable, `.plat` is already the user's format in host mode (V08 §5.4 (2)) and a copy is detached (V6 §4.4; J-SS2.3) (SR2-03) |
| J-V8.94 | chose one control for the load-mismatch keep — V9 §3.14's choice at load — and no button in the tab's `upgrade-available` banner, over a header control for the keep and a banner button focusing a frame dialog, because one event has one control, and no host → PLAT message or `MapSession` call reaches a dialog inside the frame while SettlementForge draws no map control (J-V8.35) (SR2-04 of seam-surfaces-r2) |
| J-V8.95 | chose to derive, at the port, a land use that a record's hard `near` row requires and no listed deposit opens — a `DepositSite` under `res:derived:<landuse>`, one per land use, kept `depleted` when no record needs it, never removed, and left standing beside a deposit listed later — over letting the class take the base's closest option (a salt works with no pans) or asking the DM, because the dossier's record is a fact the map must honour and every gap is derived by our rules (item 20 (h)); a custom record opens none, since its class is decided at fold after the port's events are written (V08 §3.5 (5) (f)), and the DM may paint the land use (SR2-04 of seam-settlements-r2) |
| J-V8.96 | chose to name, in V08 §5.1's host-mode differences, Settings without its Storage section beside the four file operations SR3-06 lists, over listing the file operations alone, because the list says "exactly these points" and T-V9-28's allowlist reads it, and SR3-02 gives `fileMenu: false` both effects (no local store in host mode, V9 §3.8 (6)); and to cite V9 §3.9's new-document rule and V9 §4.10's drawing of the host's lines instead of restating them, over keeping this volume's shorter copies, because a copy with a shorter action list drifts from its source (SR3-06) |
| J-V8.97 | chose to count V10's scratch line (BCR-V10-19) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal, under configurations A and B, with page bars of 161, 231 and 421 MB derived from V08 §3.4's page rule (the refresh frame never runs beside a visible CITY or METROPOLIS), over the seam's 266 MB CITY figure and "configuration B only", because the 266 MB case (a visible CITY beside a refresh) cannot occur under §3.4, and host mode's `builtin` without a transport is configuration A (V10 §3.17's selection), whose clerk opens the same scratch in the frame; configuration C and the refresh frame open none (SS-39) |
| J-V8.98 | chose to keep the port's notes by class — `event` notes in the ledger event of the run that wrote them, `standing` notes in it only when new (with the identities a run clears) and as a list in `DossierBinding.notes`, `report` notes never in the document — over storing every run's whole note list in each ledger event or keeping notes only in the transient `dossier.result`, because the history panel of every editing frame and of every later load must draw an absorb's notes from the log (only the port leader's frame sees the result), while a lived dossier's standing notes would otherwise repeat in every weekly event and grow the log (SS-44) |
| J-V8.99 | chose to give every note, held reason and host line a catalogue key with args — `PortNote.msg` as BCR-V9-12's `MsgRef`, `MapRecord.held.reason`, `module.status.detail` as a key — and to write their words once, in V08 §3.9, §4.6 and §5.1, with a raised way's history lines left to V06's chronicle and V10's `info.raised.*` rows, over quoting sentences in the text for a panel to compose, because V9 §4.9 renders only catalogue rows, T-V9-15 fails on a code without one, and three wordings of one line is the drift a single source prevents (SS-43, SS-44) |
| J-V8.100 | chose to name five note kinds — `name_unjoined`, `name_ambiguous`, `custom_unkeyed`, `count_over_range`, `not_placed` — where the text said "noted" without a kind, and to route every row set's "else …, noted" to `unmapped_word`, over leaving those notes unkinded, because a note without a kind has no row, no class and no test (SS-44, found in passing) |
| J-V8.101 | chose to make `custom_resolved` and `low_confidence` `event` notes written only for the custom records a run adds or revises, over standing notes re-written at every absorb, because the live resolution changes with the DM's declarations between absorbs and is the why card's (V10's `WhyAnswer.profile`, V9 §2.7's `chips`); a stored standing copy would go stale (SS-44) |
| J-V8.102 | chose to keep `ignored_key` and `realm_block_used` in the host's report only, over drawing them in the history panel, because they recur at every offer of a lived dossier and name nothing that changed on the map (SS-44) |
| J-V8.103 | chose to hide a custom chain whole — its line, arrowheads, legend row, gazetteer row and every export feature — when the key withholds any joined node, over listing it as a `withheld: true` row or drawing it with the withheld node's end cut off, because a chain is a relation whose drawn route shows where each node stands and what it makes (the purpose §11.2 withholds), a withheld row would still let V9 §5.4 offer the view, and V09's T-V9-68 already expects the entry absent (SR-25; J-SS1.9) |
| J-V8.104 | chose to carry the standing notes to the report panel on `GenerationReport.dossierNotes` — a copy of `DossierBinding.notes` made by every derivation's report build (BCR-V8-8) — over a new `query` kind or a new V08 request, because the panel already reads `report(h)`, the report is a derived cache every frame rebuilds (so a second editor's frame and a reload show the list without a read of their own), and the notes change only with the log (SR-23; J-SS1.7) |
| J-V8.105 | chose to admit a chain's nodes as a band-less reader does — each by §9.2's table as at the city band — for the drawing as well as for the gazetteer and the exports, and to read the export's whole knowledge key where SR-25's wording says "the export's tier", over admitting at the band drawn and by tier alone, because a chain spans the town and would appear and vanish with zoom if admitted at the band drawn, a place a key form lists is admitted by its places (§9.2's last column), and §11.1 takes the requester's key, of which the tier is one part (SR-25) |
| J-V8.106 | chose to make the party lines' `{places}` and `targets` under the view's effective key — a line left with no admitted place not listed — over the frame's key, because V9 §4.8 has every panel read as the players would while "See what the players see" or View as is on, and a `host.hidden` line names places the party no longer knows (the sibling of SR-24 in V08 §3.1 step 7 (b), found in passing). REVISED (SR2-24 (a); SR2-23, J-SS2.8): the key is the one the shell passes to `HostSlots.historyLines.list` (its `effectiveKey()`), each place read by `query`'s `entity` form with `admitAs` that key (BCR-V9-36, BCR-V10-22), a `withheld` place neither named nor targeted and a `null` one named by its key with no target; the handler keeps no key subscription (V9 §2.2), since `effectiveKey` and `onEffectiveKey` are `ClerkMount`'s members, never handed to it, and the shell re-lists on `onEffectiveKey`; its one `subscribe` on the document reads head moves for its answer cache only (J-V8.110; SR3-13 (c)) |
| J-V8.107 | chose `calibratable: false` on every cell of the dossier row sets V08 §2.6 writes (`cultures`, `crime`, `relations`, `calamitySeverity`, `threats`' population and the new `customWeights` among them), a value changing only as a table fix reviewed with V11, over the first header's `calibratable: true` unless marked, because a row set maps SettlementForge's vocabulary — the port's derivation rules (item 20 (h)) — not a measured quantity: §13.9 (7) never re-signs them, V11 §3.1 carries rows 63–66 and 77 `calibratable: false` (J-V11.65; T-V11-37), and V12's R4 never calibrates them, so a source written by the old header would fail the lint and ask V12's register for entries it must refuse (SCC-R2C-1). The item-110 threshold of DR-V8.8, a map rule's constant rather than a vocabulary row, moves to V11's calibratable `elevated.landmarkMinSignificance` (SCC-R2C-10; J-V8.70) |
| J-V8.108 | chose a dossier row set `customWeights` for the custom definition's `economicWeight` and `criticality` words, read by V08 §3.11's custom kinds, over keeping the two mappings as numbers in §3.11's prose, because a constant with no table is a hard-coded universal (item 23) that no loader holds and no totality test reaches, and the words are the host's vocabulary like `dependencySeverity`'s, so they take the same row-set home and the same non-calibratable flag (found in passing beside SCC-R2C-1) |
| J-V8.109 | chose a per-key answer cache in the embed's bridge handler for the party lines — a `list` with an unread key returning only the lines that name no place, the reads started and `onChange` fired when they answer — over an asynchronous `list` or a second, synchronous read path into the document, because V9 §2.2's slot returns its lines at once (SR2-23's shape), §11.2's `query` answers by promise and is the one admitted read, and holding back a line until its reads answer never names, even for one frame, a place the new key withholds (SR2-24 (a)) |
| J-V8.110 | chose to read the head move that empties the party lines' answer cache from the handler's one `subscribe(h, …)` on the frame's document (§11.2's `doc.changed` `ApiEvent`), registered at each `doc.load` and released at `close` and `switchTo`, over a head-move callback added to V9 §2.2's slot or a fresh `subscribe` per `list` call, because `subscribe` is the facade's change feed that volume V10's staleness watch already reads for a moved `logHead` (V10 §3.11), V9 §2.2 forbids the provider only a key subscription, a slot callback would widen V09's interface for one reader, and with no head read a renamed or newly withheld place keeps its old answer (SR3-13 (c)) |
| J-V8.111 | chose to bind a REPLACEMENT lesser that is a pin record — `parish_church` over `wayside_shrine` — to the pin V11 §3.12's row keeps (the churchyard `cross`, laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records` at an epoch or an absorb) and to alias it on the church building only at a base rung where no such cross is laid, the target chosen where the merge is first read — the creation, or the absorb or epoch that brings the pair, the church arriving beside the standing shrine or by promotion (V08 §3.5.1 (c), (d); amended in reconciliation round 6, seam-settlements-r5 SR5-01) — and kept across a later rung change, over one alias rule for every REPLACEMENT lesser or a re-binding at each rung change, because V11 §3.12 and V07 §2.4 keep the shrine as a thing on the map at village rungs, a key with two targets is a contradiction a builder meets (seam-settlements-r4 SR4-06), and a binding that moved at every hand-off would emit `rebind` events no dossier change caused |
| J-V8.112 | chose to write every `unmapped_kind` note after the fold, its `class` the class that builds the record at the document's rung — at a village rung V07 §3.11's village class or the pin kind a cell names — over filling it at digest from DR24's generic class, because a note that names a class the map did not build tells the DM something false (seam-settlements-r4 SR4-07), the note is read by no model rule so the later write changes no event, and `custom_resolved` already follows this order (J-V8.101) |
| J-V8.113 | chose to re-bind a placed lesser as the greater's members only where the greater's thing is the lesser's — every COUNT, QUARTER, GUILD and SIZE step and the REPLACEMENT rows whose V11 §3.12 reading keeps it (`graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`, `mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, and `cathedral_10_000_only` over `parish_church`) — and to place every other REPLACEMENT greater new, the lesser's key bound as at a first reading (an alias on the fish market's hall, the churchyard `cross` or the church, the enceinte the fortification path yields), over the generic re-key for every pair that arrives over time, because a roadside pin cannot become a parish church, V07 places an added fish market's hall on the market's rim so a re-keyed shop would give one key two things, and a key left on a palisade the new ring superseded binds the ring left to decay (seam-settlements-r5 SR5-01, J-SR5.3); the cathedral row is added to the seam's list of four because V11's reading is "the lesser absorbed" and V6 §3.9.11 converts the church in place carrying its crypt (the seam's own census, critique §4 (C), reads it so), and QUARTER is named with COUNT, GUILD and SIZE because a quarter's members are the lesser's buildings; `ladder_promoted`'s words now hold for both readings (V08 §3.5.1 (c), §3.5, §4.6, T-V8-44, T-V8-46) |
| J-V8.114 | chose, for a promotion by receipt to a REPLACEMENT greater of a new thing — one record whose key the line keeps (F15) — to re-point the record's one binding row to the greater placed new and to lay a pin the row keeps (the churchyard `cross`, at a village rung) for the record with no binding row of its own, the lesser's former thing left standing unbound, over binding the key to the cross (the seam's fixture wording read literally) or to both the cross and the church, because one key binds one thing (J-V8.111) and a parish church record bound to a cross would send the church's later state — a ruin, a closure, a **Show** — to the cross; where two keys meet (the church added beside a kept shrine, or the shrine leaving the list as the church arrives) the shrine's key binds the cross as at a first reading (V08 §3.5.1 (d), T-V8-46; X23) |
| J-V8.115 | chose V11's class `label` cell (BCR-V9-8) for the words a note's `class` argument shows, and a pin kind's `host.pinKind.<kind>` row (V08 §4.6; amended by the finalization, seam-settlements-r6 SR6-06: no text produced a symbol-key word), over "the display label (§9.5)", because §9.5 holds the title and the legend but no class words, a pin kind has no class row, and V07's `market` fallback builds the reservation of V11's `market` class, whose label is the word to show (seam-settlements-r5 SR5-07) (V08 §4.6, §1b, T-V8-46; X25) |

## 10 Base change requests

Each request names the base section by its exact heading, quotes the current text once and gives the new text or the
mechanism to add; this volume is designed as if every request were applied. Requests that carry a file-g rule cite its
item; they add only what g does not already state.

**BCR-V8-1 — the bridge's vocabulary for the port.** `### 11.3 The host bridge — the host is the store (FTG-12)`,
*Vocabulary*. Current: "Host → PLAT: `doc.load { bytes | ref, role, session }`, `doc.apply { baseLogHead, events }`,
`view.set { patch }`, `export.request { fmt, opts }`" and "PLAT → host: `ready { outputVersions, schemaVersion }`,
`doc.changed { baseLogHead, events }`". New: host → PLAT gains `dossier.offer { dossier, dossierHash, host?, create? }`
(owner or editor only), `doc.snapshot {}` (owner or editor only; a viewer's either is answered `doc.rejected {
reason: 'role' }`), `host.state { party?, backups?, partyPicturesAt?, playersView? }` (owner or editor sessions only;
the module keeps it in the session's memory — never in the document, its view state or a save; `playersView` sets the
frame's `ViewOpts.viewAs` to the party key, never the view's knowledge key; SR-04, SR-05) and `party.render { party,
since? }` (owner or editor only, a viewer's answered `doc.rejected { reason: 'role' }`; not an export: the module
resolves `party` to a key form, draws the party picture set under it as `knowledge` and lists its gazetteer under it as
`admitAs`, V08 §3.14; SR2-06, SR2-07); `doc.load` becomes `doc.load { bytes | ref, role, session, audience? }` — the module derives role and
key from the audience word by §14's table and takes the LOWER of that and `role`; `export.request` becomes
`export.request { fmt, opts, displayNames?, knowledge?: Admission }` — `Admission` is BCR-V10-22's type, which is
BCR-V9-14's union (`'public' | 'local' | 'secret' | { tier, places }`): `knowledge` lowers the requester's key for that
export only and never raises it, a tier given alone read with the requester key's places and a key form a key in its own
right (one field, one type; SR2-06), `displayNames` as §11.1's *Display names*; in host mode the module answers an
`export.request` for any format other than `png`, `svg` and `print` with `export.refused { error: 'E_HOST_FORMAT' }`
(V08 §5.4), which never applies to `doc.snapshot`. PLAT → host gains `dossier.result { status, dossierHash,
baseLogHead?, events?, encoded?, seqAfter?, logHeadAfter?, created?, factHash?, week?, report, held? }` (a reply,
carrying `re`; `held` is `{ code, message, reason }`, `reason` the refusal's `held` note's `msg`, a `host.held.*` row of
V08 §3.9; SS-44), `doc.snapshot.ready { bytes, logHead, lastSeq, outputVersion, schemaVersion, documentDigest }` (a reply),
`module.status { phase, detail?, progress?, outputVersion? }` (a push; `detail`, when present, a `host.*` catalogue key the
banner draws beside its phase's row, V08 §3.9; SS-44) and `host.action { action: 'refresh' | 'restore' |
'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings', args?: { places?, undo?, tier? } }` (a push from an
owner's or editor's frame only: a header control's click, which the host runs as V08 §4.2's row says; SR-04) and
`party.rendered { status: 'rendered', set } | { status: 'unchanged' }` (a reply, carrying `re`; the set is V08 §2.1's
`PartyPictureSet`, which the host stores as handed); `ready` becomes `ready { outputVersions,
schemaVersion, protocol, adapters: { line, version }[] }`; `doc.changed` becomes `doc.changed { baseLogHead, events,
encoded, seqAfter, logHeadAfter }` — each event's canonical CBOR in order, the last seq and the head after them — so the
host stores what it is handed and computes nothing. Add after *Convergence*: "A dossier offer's commit follows the same
rule: the host appends a `dossier.result`'s encoded events only when its `baseLogHead` is the current head (V08 §3.3);
the host verifies that one equality and stores the rest as handed." The types are V08 §2.2's.

**BCR-V8-2 — a host-minted document id and the creation prefix at `generate`.** `### 11.2 The embedding API and the
worker boundary (SCL-6)`. Current: "`generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void }):
Promise<DocHandle>;`". New: "`generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void; docId?: Uuid /* a
host-minted id, e.g. a SettlementForge map record's mapId; else minted here */; prefix?: EditEvent[] /* the port's
creation prefix, written at positions 0…k with `creation` set */ }): Promise<DocHandle>;`". And `### 2.9 The document
and serialisation`, the `docId` field's comment "minted at creation by @plat/api (outside the model packages)" becomes
"minted at creation by @plat/api, or given by the host to `generate` (§11.2)"; `### 6.3 Identity: address ids, lineage
keys, carry-over (and the scope of stability, stated)`, *Document identity*: "`docId` (a UUID) is minted when a document
is created" gains ", or taken from the host when it passes one (§11.2)".

**BCR-V8-3 — the host client package and the embed entry.** `## §14 Package and module layout, key interfaces,
dependency rules, extension points`. Current: "`@plat/app      the reference UI (below)`". New: "`@plat/app` the
reference UI (below), with a second entry `embed.html` — host mode: no file operations, no `DocResolver`, bridge-driven (V08
§3.1, §5.1)"; add the package "`@plat/bridge-client` the host client a host page imports: `MapHost`, `MapSession`,
`MapStore`, `MapRecord`, `hashDossier`, `realmBlockFrom`, the status texts; dependency-free, its message types generated
from `@plat/api`'s bridge schema at build time (V08 §2.2)"; and to the dependency rules: "`bridge-client` imports nothing
of `plat/` and nothing else; nothing in `plat/` imports it".

**BCR-V8-4 — the adapter manifest, the registry and the port's new results.** `## §14 Package and module layout, key interfaces, dependency rules, extension points`, the `@plat/port` block.
Current: "`| { status: 'refused'; code: 'E_RUNG_UNAVAILABLE' … | 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED';`" and "`interface
PortNote { kind: 'unmapped_kind'|'unmapped_word'|'ignored_key'|'unreceipted_change'|'rename_without_receipt'|'duplicate_key'|'state_matches_absorbed'|'realm_block_used';`".
New: the refusal codes gain `'E_OTHER_SETTLEMENT'`; the note kinds gain `'quarantined_record' | 'quarantine_hold' |
'adapter_remap' | 'line_migrated' | 'line_defaulted' | 'held' | 'size_limit' | 'ladder_merged' | 'ladder_promoted' |
'ladder_unknown' | 'chain_node_unjoined' | 'unmapped_good' | 'npc_rebound' | 'calamity_unplaced' | 'custom_resolved' |
'custom_unversioned' | 'custom_node_unjoined' | 'library_mismatch' | 'custom_library_dropped' | 'low_confidence' |
'uncatalogued_step' | 'derived_landuse' | 'name_unjoined' | 'name_ambiguous' | 'custom_unkeyed' | 'count_over_range' |
'not_placed'` (`uncatalogued_step` added by reconciliation round 1 for V11 §3.12's uncatalogued greater kinds,
`derived_landuse` by round 3 for V08 §2.6's derived land use, SR2-04, the last five by round 1's continuation where the
text said "noted" without a kind, SS-44); `PortNote` becomes `{ kind; detail: string /* the English line, for logs and
tests */; msg: MsgRef /* BCR-V9-12's type: key 'host.note.<kind>' (a held note: a host.held.* row), args strings and
numbers as V08 §4.6's table names */; keys: string[] /* the binding keys it concerns, [] when none */ }`, each kind of
class `event`, `standing` or `report` by V08 §4.6's table (SS-44; J-V8.98, J-V8.99); the
first version's `preview_only` and `coalesced` are withdrawn: no preview absorb exists, and the skipped-version count is
the client's own report field); add `AdapterManifest` (with `requiredKeys` and `optionalKeys`) and `AdapterRegistry` with
its selection order (V08 §2.4), and the rule that `DossierPort.digest` selects its adapter through the registry; item
1's "one more adapter folder" gains "with its manifest".

**BCR-V8-5 — the digest's additions.** `## §14 Package and module layout, key interfaces, dependency rules, extension points`, `DossierDigest` and `DossierInstitution`. Current: "`government: {
name: string; governingPower?: string; previous: { label: string; cause: string; week?: number }[] };`". Mechanism: add
`DossierInstitution.role?`, `security`, `government.legitimacy?`, `notables[].workplaceKey?` and `.powerKey?` as V08 §2.5
declares them — and the revision's: `DossierInstitution.openTop`, `.popQualifier`, `.qualifiers`, `.step`, `.lesser`,
`.mergedInto`; `powers[].relations` with the line's type and trend words; `conditions[]`'s `source` and `severityBand`;
`site.ruinEvidence`, `site.threats`, `site.latitudeDeg`; `economy.chains` extended, `economy.dependencies` keyed,
`economy.goods`; `calamities`; the adapter fills them (V08 §3.5 step 6, §3.5.1).

**BCR-V8-6 — the two host-only event kinds.** `### 7.1 Edits are ordered events on addresses; the named actions; the edit
targets; dry-run validation`. Current (the targets table's history row): "the dossier events — `assign`, `unassign` and
`setAttr` with `EditBase.dossier` and `EditBase.dossierChange` set, produced by the dossier port and folded in the host's
order (§7.7, items 73, 75)". New: "… `assign`, `unassign`, `setAttr`, `dossierFacts` (the absorb's ledger: every change
with its before and after carried facts, the quarantine list and the run's notes by class — `notes` and `notesCleared`,
V08 §3.6 (4) — no model effect) and `dossierRecord` (a staged record put or retired) with …";
add both kinds to the `EditEvent` union as V08 §2.5 and §3.6 (4) declare them, and to `### 7.4 Lifecycle of every edit
kind (create · read · persist · regenerate · undo · migrate) — G-P8` one row each: author `host` only; never an undo,
redo or revert target; replayed by fold; migration none.

**BCR-V8-7 — per-settlement values on the circumstance slice.** `### 7.7 Intent, character, constraints, assignments, the
forms catalogue (O10; the ASSIGN hook)`, `CircumstanceSlice`. Current: "`trade: TradePartner[]; entrepot: boolean;
economy: EconomyShares; powers: PowerStanding[] /* items 77–79 */ }`". New: "… `powers: PowerStanding[]; port: PortValues
/* V08 §2.5: crime, food import, food chains, legitimacy — null standalone */ }`". And `### 10.2 Roster (data-driven,
replaceable; sequential and prefix-stable; our values)`, `PortRows`: add after its block "The values in force of `crime`,
`hinterland.importPct`, `hinterland.foodChain` and `legitimacy` are the current slice's `port` values when not null, else
this table's (V08 §2.5)."

**BCR-V8-8 — the binding's additions.** `### 7.7 …`, `DossierBinding`. Current: "`interface DossierBinding { line: string
/* the SettlementForge line (item 73) */;`". New: add `adapter: { line: string; version: string }`, `quarantined: {
key: string; reason: string; since: number }[]` and `notes: PortNote[]` (the standing notes, rebuilt by folding the
ledger events' `notes` and `notesCleared`, V08 §3.6 (4); SS-44); `CarriedFacts` typed by V08 §2.3's `CarriedFact` union with V08 §2.8's
custom kinds; `absorbed` keeps `{ seq, week, factHash }` for every entry and `changeIds` for the newest 64; and the
receipt response `rebind` is emitted as a `setAttr` of the bound entity's `dossier` ref (V08 §3.6 (5)). And (SR-23)
`### 5.4 The generation report`, `GenerationReport`. Current: "`dossier: { element: Id; state:
'placed'|'rejectedSite'|'blocked'; site?: Id; rules?: string[] /* the hard rows the placement fails, if any */; closest?:
Id[] }[];`". New: after that member add `dossierNotes: PortNote[];   // V08 §4.6: the document's DossierBinding.notes
(§7.7) at the report's seq, in identity order; [] for a document with no binding` — rebuilt with the report by every
derivation and by the verification replay on load, so, like the rest of the report, a derived cache excluded from the
canonical form and every digest; and in the prose below the block, after "the `dossier` list above is the standing state
the report shows after any derivation", add "; `dossierNotes` beside it is the port's standing account of how it read
the host's record (§14 `PortNote`), which the report panel lists after the placement state".

**BCR-V8-9 — the village product's port path.** **WITHDRAWN** (SS-19, SS-28; reconciliation round 1) in favour of
file f item 202, the one registration: the village product registers its `ProductDecl` in `StrategyRegistry.products`
(BCR-V7-11), `LadderRouter` reads it, and the port consults `LadderRouter` at `creation` and at every `absorb` and
registers nothing; `PortRungPath` and `registerRungPath` are dropped, and the first version's mechanism and PART III line
are not applied (item 202 states the PART III line).

**BCR-V8-10 — the row sets written out.** `## §14 Package and module layout, key interfaces, dependency rules, extension points`, item 7. Current: "`tiers`, `site`, `access`, `threat`, `deposits`,
`quarters`, `landmarks`, `distribution`, `kinds`, `status`, `wealth`, `sectors` …, `government`, `powers`, `conditions`,
`calendar` …, `receipts` and `derivation`". New: add `tags`, `categories`, `crime`, `cultures`, `archetypes`,
`categorySynonyms`, `keywords`, `relations`, `historyScars`, `magic`, `era`, `materials`, `customWeights`, `isolation`,
`chainStatus`, `dependencySeverity`, `calamitySeverity`, `qualifiers`, `threats` and `ruinEvidence` (V08 §2.6, §2.6a), and after "§7.7 states the rules that read them" add "; V08 §2.6 writes the default
rows of every set §7.7 does not, and fixes the shapes of `kinds`, `archetypes`, `categorySynonyms` and `keywords`, whose
rows volume V11 writes".

**BCR-V8-11 — the latitude row (g item 102).** `### 7.7 …`, item 10's table: after the row "| DR25 |" add V08 §3.5's row
(named DR-V8.1 there; the coherence pass numbers it after the other volumes' proposed rows). `## §14 Package and module layout, key interfaces, dependency rules, extension points`, `RealmBlock`.
Current: "`cell?: { terrain?: string; river?: boolean; coast?: { sideCdeg: Cdeg } };`". New: "`cell?: { terrain?: string;
river?: boolean; coast?: { sideCdeg: Cdeg }; latDeg?: number /* degrees north */ };`". `### 8.4 Layers, shadows,
heights`, `SunSpec`. Current: "`latitudeDeg: number /* path mode; default 50 */ };`". New: "`latitudeDeg: number /* path
mode; the view's default is the latitude in force — the recipe's `Intent.latitudeDeg` (g item 102; DR-V8.1), else 50 —
while the model-side sampler reads the recipe's latitude itself (V05) */ };`" — one merged text with volume V05's request
on the same comment (C8-38). And `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the
ASSIGN hook)`, `Intent`: add `latitudeDeg?: number /* degrees north; a document without it reads 50 (§7.5's default) */`
unless the coherence pass's item-102 text already adds it, in which case DR-V8.1 is its dossier source.

**BCR-V8-12 — coverage inside a collective range (g item 103 (f)).** `### 7.7 …`, item 10's row DR9. Current: "S2's
per-capita rows clamped into the record's range (§4.2)". New: "S2's per-capita rows clamped into the record's range
(§4.2), the class's coverage target, clamped into the range, a weighted option beside them (g item 103 (f); V08 §3.5)".

**BCR-V8-13 — custom content's inputs (g item 104).** `## §14 Package and module layout, key interfaces, dependency rules, extension points`, `DossierInstitution` and `DossierDigest`. Current:
"`custom?: { uid: string };`" and "`custom: { definitions: { key: string; category: string; name: string }[] };`". New: the
institution's `custom?` as V08 §2.8 declares it; the digest's `custom` kept and joined by `customChains`, `customDefs`,
`customResources` and `customServices` (V08 §2.8); `HostContext` gains `customLibrary?: CustomLibraryEntry[]` (optional,
item 20 (h) (iv)). `### 7.7 …`, item 10's row DR24. Current: "its name, `kind`, `category`, `tags`; a demotion or upgrade
receipt". New: "… a demotion or upgrade receipt; for a custom record, the inputs of g item 104 (a)'s resolution — its
scene archetype, free-text category, tags, admitted definition fields and keyword keys — its class decided at fold, not
at digest (V08 §3.5 (5) (f); V11 §3.13.1; SS-12)". And item 1's prose clause. Current: "and prose beyond a description seed the clerk may read
(item 101)". New: "… (item 101) — a custom record's description is read only inside the adapter, reduced to keyword keys
and never carried (g item 104 (a) (6); V08 §3.13 (3))".

**BCR-V8-14 — custom chains and services as staged records, and their keys (g item 104).** `### 2.7 Walls, gates, towers,
castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records`: add
`CustomChainRecord` and `CustomServiceRecord` (V08 §2.8) beside the staged records, schema-complete and filled only by
`dossierRecord`. `### 7.7 …`, item 12's key law. Current: "| a condition; a resource; a quarter; the government |
`cond:<id>`; `res:<key>`; `quarter:<slug(name)>`; `government` | none |". New: "| a condition; a resource; a quarter; the
government; a custom chain; a custom service; a custom library entry | `cond:<id>`; `res:<key>`, or `res:uid:<localUid>`
for a custom resource; `quarter:<slug(name)>`; `government`; `chain:<chainId>`; `svc:uid:<localUid>`;
`def:<definitionId>` | none |". Item 8's list "`ConditionOverlay`, `DepositSite`, `HistoryHint`, `PowerRelation` and the dossier-backed
`Person` (§2.7)" gains "`CustomChainRecord`, `CustomServiceRecord`".

**BCR-V8-15 — drawing rows and export attributes for the records.** `### 8.2 Style sheets as data: roles, contrast,
symbolisation, paint programs, layer order, presets (G-R2)`, *Thematic layers*. Current: "FTG D7's matchers are override
rows keyed by entity attributes (`prosperity`, `use`, `epoch`, `owner`, `material`) — data, not code." Mechanism: add
the thematic rows `condition.siege`, `condition.quarantine`, `condition.occupation` and the view `supplyChains` (a chain drawn only when the view's key admits every joined node, V08 §5.2), and the
`states` row `worked-out`, as V08 §5.2 states, in every shipped family; `### 8.3 Symbol catalogue and draw-style census`
gains the symbol `occupation`. `### 11.1 Formats`, the GeoJSON row: the public attributes gain `deposit` and
`depositState` on a land-use feature, one `condition` feature per overlay (no geometry of its own, its `targets`), and
one `supplyChain` LineString per active chain whose every joined node the export's key admits (V08 §5.2's knowledge rule; SR-25). `### 11.2 The embedding API and the worker boundary (SCL-6)`,
the `gazetteer` query: its rows gain the kind `customChain` — each ACTIVE `CustomChainRecord` with its label, listed
only when the key admits every joined node (a relation, never a `withheld: true` row; SR-25), an inactive one not listed
(V08 §5.2; XV-V9-26).

**BCR-V8-16 — the stage's budgets.** `### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)`.
Current: "* **Proxy thumbnails:** §7.8's budget." New, after it: "* **The SettlementForge stage:** V08 §6's rows — the
host client, the tab's thumbnail, the frame's boot, load, the hash, the digest, creation, absorbs, the refresh queue,
memory and storage per map record."

**BCR-V8-17 — the stage's bars in the suites.** `### 13.2 Per-stage invariants, statistics, cost-model tests, contract
tests, B-EDIT`. Current: "* **The authoring toolkit (item 101; §7.1, §14): elegance bars and fixtures.**" New, before it:
"* **The SettlementForge stage (V08 §7).** T-V8-1 – T-V8-47 on the host harness `plat/tools/hostharness/`, with the
frozen fixtures and test-side mutations only." And `### 13.8 CI tiers and compute budgets (SCL-18; D-34)` gains the
tiers V08 §7.1 names.

**BCR-V8-18 — the stage in the build plan.** `## §16 Build plan — calibration and spikes first, then a viewable town,
then editing, then parity, then stage 2`. Current: "the port's host wiring and the realm block's supply, the behaviour of
item 88's staged records, the built-in clerk and plots on a bridge deck — are not priced, by the roadmap." New (item 110
(d) takes plots on a bridge deck off the staged list, so the merged sentence drops them; C8-46): "… the port's host
wiring and the realm block's supply, the behaviour of item 88's staged records and the built-in clerk — are not priced in
the rows above; the SettlementForge stage is milestone M-SF, after volume V12's M-CAL, priced by its volume at 15.75–21.5 pw
on the map side (V08 §8)". If the coherence pass's item-110 fold has already removed "and plots on a bridge deck", the
Current text is that folded sentence and the New text is the same merged sentence. And *Staged by the owner's roadmap*,
the SettlementForge row's "The staged part: …" gains "— built at depth by volume V08".

**BCR-V8-19 — the port's reserved session (C8-15).** `### 7.1 Edits are ordered events on addresses; the named actions;
the edit targets; dry-run validation`, `EditBase`. Current: "`session: string /* the authoring session, per document and
author (§7.4): its undo and redo stacks; never read by the fold */;`". New: "`session: string /* the authoring session,
per document and author (§7.4): its undo and redo stacks; never read by the fold. Every event the dossier port emits
carries the reserved session 'host:port', constant, with no group (V08 §3.6 (6)): no user's stack ever holds one */;`".

**BCR-V8-20 — the change and receipt vocabularies for the port's own kinds (C8-16).** `### 7.7 Intent, character,
constraints, assignments, the forms catalogue (O10; the ASSIGN hook)`, `DossierChange`. Current: "`element: { kind:
'settlement'|'institution'|'power'|'notable'|'resource'|'condition'|'trade'|'quarter'|'government'|'deity'; key: string
/* the binding key */ };`". New: the kind union gains `'relation'|'port-values'|'chain'|'dependency'|'calamity'|
'evidence'|'custom-def'|'custom-chain'|'custom-service'`; `ReceiptRow.element`, typed from it, follows. The receipt table
`tables/dossier/receipts` gains the rows V08 §3.6 (1) names: F-V8-1 `relation` (receipt: the powers' pulse week when the
line stamps one, else arrival; response `setAttr` through a `dossierRecord` put); F-V8-2 `port-values` (arrival; response
`epoch`); F-V8-3 `custom-def`, `custom-chain`, `custom-service` (arrival; responses by V08 §3.5's diff table); F-V8-4
`chain` (arrival; `epoch`); F-V8-5 `dependency` (arrival; `epoch`); F-V8-6 `calamity` (receipt: its own tick; `epoch`,
riding `EpochInputs.events`); F-V8-7 `evidence` (arrival; `epoch`). The government's legitimacy is read as an `attr` on
the `port-values` key (the government row keeps name and governing power). T73-10's totality test covers every new row.

**BCR-V8-21 — a custom assignment's revision (C8-17).** `### 7.7 …` (the same heading), `Assignment`. Current: "`state:
'active'|'ruined'|'removed' /* item 80: written only by dossier events through item 14's rows; a map assignment stays
'active' */;`". New: after it, "`custom?: { uid: string; revision: string; contentHash: string } /* dossier-owned (item
11): a custom record's definition revision; a setAttr of custom.revision with cause custom_revision re-reads the
carried fact, re-resolves g item 104 (a)'s profile and re-sites the use by least disruption (V08 §2.8, §3.13 (10)) */;`".

**BCR-V8-22 — the creation prefix's staged records read ahead (C8-18).** `### 7.7 …`, *One path — placement, then
mutation (items 16, 18)*. Current: "the `assign` events flagged `creation` (the prefix the base derivation's S2 reads
ahead as fixed rows, §7.4, J-A22.74:". New: "the `assign` events flagged `creation` (the prefix the base derivation's S2
reads ahead as fixed rows, and whose `dossierRecord` puts S12a — the deposit sites, writing their derived bearing and
land use — and §4.5's typing — the power relations — read ahead the same way (V08 §3.11), §7.4, J-A22.74:".

**BCR-V8-23 — one spelling of the line id (C8-19).** `## §14 Package and module layout, key interfaces, dependency
rules, extension points`, `DossierPort.adapter`. Current: "`line: string /* the SettlementForge product line, e.g.
'fp/integration-2026-09-23' */`". New: "`line: string /* the SettlementForge line's canonical id — its adapter folder's
name, e.g. 'fp-integration-2026-09-23' (the git branch fp/integration-2026-09-23 at commit 5d699cc68) */`". Every place
that names the LINE uses the folder spelling; a place that names the git branch keeps the slash.

**BCR-V8-24 — the realm block computed by the host glue (C8-21).** `### 7.7 …`, the dossier contract's item 1. Current:
"the campaign's frozen `spatialDigest` is the one campaign fact the optional realm block may carry (§14)". New: "the
optional realm block (§14) is computed by the host glue from the campaign's placements of the settlement and its
partners, the realm map's scale and latitude scale and the frozen `spatialDigest`; the module receives only its
bearings, distances, cell words and latitude". And `## §14 Package and module layout, key interfaces, dependency rules,
extension points`, `RealmBlock`. Current: "`// optional realm data (item 77), filled by the host glue from the campaign's
frozen spatial digest — the one campaign fact it may carry (§7.7 item 1)`". New: "`// optional realm data (item 77),
computed by the host glue (the host client's realmBlockFrom, V08 §3.11) from the campaign's placements, realm scale,
latitude scale and frozen spatial digest; it carries only bearings, distances, cell words and a latitude (§7.7 item 1)`".

**BCR-V8-25 — the institution's own political role in DR12 (C8-32).** `### 7.7 …`, item 10's table, row DR12. Current:
"| DR12 | a district's political alignment | DR10's lots; the class-to-power rows (§10.2) with `Institution.powers`
overrides; the power slice |". New inputs: "the institution's own political role (`DossierInstitution.role`,
SettlementForge's per-record `priorityCategory`; V08 §2.5, J-V8.45) first; DR10's lots; the class-to-power rows (§10.2)
with `Institution.powers` overrides; the power slice". The never-read sliders (`config.priority*`) stay unread.

**BCR-V8-26 — the power relation's sign and visibility (C8-10).** `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`, `PowerRelation`. Current:
"`kind: string /* the dossier's pair type: alliance, rivalry, feud … data */; strength: number /* 0–1 */;`". New: "`kind:
string /* the neutral kind of tables/dossier/relations: ally, dependent, subordinate, rival, tense, corrupt, neutral */;
sign: -1 | 0 | 1 /* attraction or repulsion for §4.5's typing */; hidden: boolean /* never named on a public view (DR20)
*/; strength: number /* 0–1, the row's strength × its trend factor */;`" — the key stays unordered (V08 §2.3, J-V8.52).

**BCR-V8-27 — the player's row of the audience table (C8-01).** `## §14 Package and module layout, key interfaces,
dependency rules, extension points`, the audience table. Current: "| a player | `viewer` | `public`, raised place by place
as the host records what the party learns | views and picture exports under its key |". New: "| a player | none — no
document, no dossier, no session | the party key: `MapRecord.party`'s tier, raised place by place as the host records
what the party learns | the stored party picture set and party gazetteer only, made by an editing session or the refresh
frame under the party key (V08 §3.14; §11.1 *Knowledge*) |".

**BCR-V8-28 — an aqueduct's link to its conduit house (C8-41 (e)).** `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`, the raised-way record g
item 110 (b) adds (not yet in the base text; the coherence pass homes it). Mechanism: the record gains "`waterUse?: Id /*
an aqueduct's terminal use when a dossier-bound conduit house took it (V08 §2.6b (1) (e)): the use's closure leaves the
aqueduct dry and disused, its ruin ruins the arches by least disruption, its infrastructure impairment applies the
condition steps; removing the use never removes the aqueduct */`".

**BCR-V8-29 — the custom kinds derived at read time (C8-17).** `### 10.2 Roster (data-driven, replaceable; sequential and
prefix-stable; our values)`, `PortRows`. Current: "`customKinds: { kind: string; criticality?: number; economicWeight?:
number; defenseRoles?: string[]; powerAuthorities?: string[]; fallbackClass: string /* the class a custom kind is built
as */ }[];`". New: the same row type less `fallbackClass` (retired by BCR-V11-26: a custom kind's class is g item 104
(a)'s resolution; J-VI.20, IN-V08-4; SS-37), commented "`/* the rows in force are this table's (empty in the base) overlaid at
read time by one row per carried custom institution, from its carried custom-def fact (V08 §3.11); never written into
the recipe's params */`".

**BCR-V8-30 — the port's derivation rows (C8-02, C8-06, C8-09, C8-41, C8-43).** `### 7.7 …`, item 10's table. Mechanism:
add the rows DR-V8.2 (the ruin's existence evidence), DR-V8.3 (the cavern drivers), DR-V8.4 (the burial faces, crypted
churches and church count), DR-V8.5 (SettlementForge's chains' links), DR-V8.6 (the calamities, numbered with V06's
DR-V6.1), DR-V8.7 (the water system's inputs to item 110 (b)'s aqueduct) and DR-V8.8 (item 110 (b)'s high-ground
landmarks) exactly as V08 §2.6a, §2.6b, §3.5 and §3.6 state them; the coherence pass numbers them after the other
volumes' proposed rows, and item 20 (h)'s totality bar covers them.

**BCR-V8-31 — generated content no dossier record binds (C8-42; g item 110).** `### 7.7 …`, the dossier contract's item 3.
Current: "3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1):".
New, after its first sentence: "A generated entity that no dossier record binds — a raised way, a retaining wall (a generated
terrace's walls among them) or a deck plot among them (g item 110) — is deleted as any generated content (§7.1), and the deletion holds through
regeneration, every absorb and every epoch; a dossier record read as an input of its reason does not bind it."

**BCR-V8-32 — a toll bridge on a dry site (C8-45; g item 110).** `### 7.7 …`, item 10's table, row DR1. Current: "| DR1 |
the site: relief, coast and its side, river course and inflow, lake, marsh | the realm cell's terrain, river and coast
(optional); `site.terrain`, `site.access`, the water deposits, `site.culture` |". New inputs: "… `site.culture`; a dossier
record whose `kinds` row implies a bridge"; and the rule cell gains: "on a site whose terrain, access and realm cell give
no river or canal, the site row's river chance becomes 1 for the smallest watercourse class (a brook) whose course
crosses the through route of the longest approach inside the frame — at creation only; on `desert` without an oasis, or
where S1's relief cannot carry it, no brook, the build report noting `toll_bridge_dry` (V08 §2.6b (3))".

## 11 Owner questions

Only decisions that are the owner's by rule — money, a new capability across the SettlementForge boundary, product
order, paid-surface behaviour. Every other choice is decided above and recorded in V08 §9. Until the owner answers, the
design runs on the recommendation marked "default".

| # | question | why it is the owner's | recommendation (the default until ruled) |
|---|---|---|---|
| Q1 | Where does the map module live on the web — which origin serves `embed.html` and its files? | hosting, a domain and its running cost | a subdomain of SettlementForge's own domain served as static files from the host SettlementForge already uses, as its realm map is (`map.` today; for example `plat.` for this module), which keeps the module SAME-SITE with SettlementForge's app so its own storage persists inside SettlementForge's page (V09's local draft mirror needs it, V08 §3.7; C8-35) — no server code, cached immutable chunks, a cost of static hosting only |
| Q2 | Which SettlementForge plans get the Map tab, map editing and the file exports; does a map record count against a plan's save limit; how many backups does a record keep? | paid-surface behaviour and storage cost | every account that can open a settlement sees its map and pictures; editing and the file exports follow the plan that already carries custom content and the export bundle; a map record never counts as a save; two backups at TOWN and CITY, one at METROPOLIS (V08 §6's storage row) |
| Q3 | May SettlementForge's own export bundle (its Foundry / virtual-tabletop package) carry the map's scene files — geometry passing through SettlementForge's code as unread bytes? | a new capability across the boundary, next to door 1 (J86) | yes, for the user's export bundle only, the bytes handed unread to the user's download, under the contract clause that SettlementForge's simulator never reads them; until ruled: no — pictures only through the host client, scene files from the frame's own export menu (V08 §5.4) |
| Q4 | Where does M-SF sit among the staged milestones — after volume V12's calibration M-CAL (which follows M4, M5, M6 and V-M4), or earlier, calibrating the dossier maps afterwards? | product order | after M-CAL, as the owner's definition orders it (standalone, calibrated, then connected) and V12 places it; an earlier start is possible for SF0 – SF3 alone (the spike, the client, the port leader, the adapters), which touch no calibrated table; the village hand-off (VH) whenever the village product (V07) lands |
| Q5 | Should players get a live, explorable map in their tab rather than stored pictures? It needs a new "party copy" of the map file that leaves out everything the party does not know, made and kept in step by the DM's sessions — a new capability across the SettlementForge boundary, about 2–3 person-weeks, and it would also carry an area fog if wanted | a new capability across the boundary (what players' browsers receive) | pictures now (V08 §3.14: a zoomable picture set, the building-band close view of every place the party knows, the party's gazetteer for their assistant); the party copy later, if players ask for measuring, layers or searching the map itself |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed evidence).** Added by the revision, executed in this lane's scratch
(`scratchpad/volumes/rv8/census2.out`, `census3.out`) and the critique's (`scratchpad/volumes/cv8/`,
`scratchpad/volumes/critique-v8-110/`): the 41 keys every birth carries and the 42 to 47 a lived dossier carries (the
optional keys named in V08 §2.4); the line's relation types (six), trends, history event types (eight), condition
statuses (three) and stressor types (fifteen); `magicLevel` `medium` on 32 of the 35 births; the six material words;
the fourteen qualifier words (twelve seen again); the ladder file at `5d699cc68` (blob `91f6e2bd…`) and its agreements and
disagreements with V11 (V08 §3.5.1 (f)); the burial census (one burial record per tier, the metropolis's `Cemetery
network`); the relation pair order not a direction (`city-1`); the lit `city-1` storm's deaths; the water records per tier
(7 of 7 CITY and METROPOLIS births carry the city record) and the eleven toll bridges (nine on dry sites, six at
base-rung TOWN); SettlementForge's player view built player-safe by construction. Earlier: the SettlementForge facts this
volume builds on — the dossier's top-level keys (41, or 42 with custom content, at birth), its sizes (45–261 KB minified), the settlement id's form, the institution record
shape, the absence of institution ids, the anchor precedence, the custom institution's fields, `customContentProvenance`,
`economicState.customChains` with its activation verdict and endpoints, `config.nearbyResourceDefinitions`, the custom
service's provider name under `availableServices`, the realm map's frame on its own origin with origin and source
checks, the persistence of the dossier as a row's data, and the line's custom-content manifest's field lists — are
CONFIRMED by the surveys (`research/sf/*.md`, their verification `mapping-verify.md`) and, for the custom content, by
reading the `town-cc-1` output generated on the pinned line `fp/integration-2026-09-23` @ `5d699cc68` and the line's
manifest read-only in this lane's scratch. Every base section cited was read at its current text; every quotation of
V08 §10 was checked against `docs/ARCHITECTURE.md` by script (verbatim, whitespace-normalised).

**Added by reconciliation round 1 (CONFIRMED by reading the current text).** Every citation the round added was read at
its current text on 2026-09-29: V10 §3.17 and BCR-V10-7 (a)–(c) (the host projection in the module, the proposal
intake, `clerk.config`'s body with `expiresAt: number` and `fallbacks`), V10 §1b.5 and BCR-V10-14 (no description
seed); V07 §2.1 (the fold, `handoff.band`, the desertion and the creation floor), §2.4's `rules.ladders.ranges`, §3.11
and BCR-V7-17/-26; V11 §3.11's pseudo-classes, §3.12's range paragraph and GUILD-hall rule, §3.13.1's rungs, §3.13.2's
keyword cells, §3.24.7 (1)'s criteria row, registry row 77 and T-V11-2's 280 kinds; file f item 202. The companions
round 1 used as if applied are now CONFIRMED in the landed text (read 2026-09-29 by reconcile-V08-r2; SR1-28): V11's
SS-26 burial pairs (§3.12's `parish_burial_grounds` COUNT over `graveyard` and `burial_ground`, and `graveyard`
REPLACEMENT over `burial_ground`), SS-09's `village` archetype cell (§2.8's `ArchetypeVillageCell`, §3.13.2's column),
SS-36's `+` spelling (§3.11's `access_to_external_mill` → `@absent:watermill+windmill`) and SS-08's range paragraph
(§3.12, citing V08 §3.5.1 (b)); V07's SS-43 reading (§3.11's external mill paragraph and W56). Cited by section, not
line, since both volumes are being edited this round (V08 §13 X14 closed).

**Added by reconciliation round 2 (CONFIRMED by reading the current text on 2026-09-29).** V9 §2.2's `HostSlots` (with
`clerkMode`, `hostName`, `lockedControls`, `historyFilter`, `exportFormats`, `fileMenu`), V9 §2.10's `ClerkMount.host`
(`config`, `onConfig`, `needsToken`, `refused`, `proposals`, `answer`), V9 §4.8 and J-V9.46 ("View as" a display
filter), J-V9.81 (one channel through the embed's bridge handler), XV-V9-17, V9 §5.12's "Set by {host}" and BCR-V9-23's
`ViewOpts.viewAs`; V11 §3.13.5's good-word matching rule (with its `import` fallback and `unmapped_good` report); base
§11.3's *View state* (the knowledge key a per-viewer view key). Read in V09 as landed (reconcile-V09-r2, 05:16; re-read
by reconcile-V08-r3, SR2-09): SR-06's key form in BCR-V9-23, V9 §4.8's "A host's players' view" with the banner
yielding to this volume's strip (J-V9.85, J-V8.89), SR-16's `historyFilter` and XV-V9-20 (V08 §13 X15). Landed and read (reconcile-V07-r2, 05:11): V07 §3.11 step 1's
village reading of `@absent` through `villageForm` — `@absent:church` zeroing `v.parish_church`, `v.parsonage` and
`v.tithe_barn`, `@absent:watermill+windmill` zeroing both village mills (SR1-02, J-V7.103) — which T-V8-46's VH clauses
read; and V07 §2.4's range rows keyed by step type (SR1-16), which V08 §3.5.1 (b) now cites.

**Added by reconciliation round 3 (CONFIRMED by reading the current text on 2026-09-29).** BCR-V10-22's `Admission` type
and its reading (lowering only; a tier alone read with the caller key's places; a key form a key in its own right) and
`query`'s `admitAs`; BCR-V9-14's union for `ExportOpts.knowledge`; V9 §2.10's `effectiveKey()` rule; V9 §3.14's
load-mismatch row and V9 §4.9's `error.mismatch` (**Keep saved** · **Use rebuilt**); V9 §2.2's `HostSlots` with
`historyLines`, `HostHistoryLine` and `newDocuments`, V9 §3.9's host-mode rule for new documents, V9 §4.10's group "The
party" and `info.copy.saved`, and XV-V9-21 — as landed by V09's round 3 (06:25; V08 §13 X16 closed); the base's §11.3 bridge `query { q }`, which carries no admission (the ground of J-V8.91); the
base's `knowledge` key shape (`places: Id[]`, addresses), `DepositSite` (§2.7) and §4.9's S12a rings (gardens, closes,
orchards, fields, meadow, pasture, commons, coppice, wild wood); V11 §3.5.10's hard `near` → `landuse:<k>` within 0 rows
(`salt_works`, `sheepfold`, `vineyard_house`, `peat_works`, `druid_grove`) and V11's `kinds` rows binding `salt_works`
and `peat_cutter` (and none binding `vineyard_house`); file f item 260's `suppress.kind` values and item 472's note;
V6 §4.4's detached fork. **PLAUSIBLE:** that the `drawDigest` test answers most debounced edit bursts `unchanged` (a
lock, a pin, a hidden note) — its saving is unmeasured; the render budget of V08 §6 holds either way.

**Added by reconciliation round 4 (CONFIRMED by reading the current text on 2026-09-29, 07:20 – 07:40).** V9 §3.9's host-mode
rule for new documents with its full action list (Re-run from here and Open a copy from here on the history and
chronicle rows and the restore points, `refuse.restore.dossier`'s button, the drawer's `fork` and `rerun`, Enter's Same
kind, new seed and `ClerkMount.openNewDocument`) and its closing sentence (no **Start a new map from this** and no
creation mode in host mode); V9 §4.10's paragraph "The host's lines" (**Show** when targeted, no **Undo this**, the
host's own Hide again or Reveal again as the undo); V9 §2.2's `clerkMode` comment and V9 §4.11's card-only drawer (no
Assistant button under `off` or `host`) and "Starting a new map from this" (standalone only); V10 §3.17 as the host clerk
seam; V9 §5.1's top bar, whose one file menu holds New town, Open…, Save a copy, Export skeleton, Rebuild around my
drawings, Recently deleted, Settings and About; and, in V09's text at its round 4's checkpoint (07:28), V9 §2.2's
`fileMenu: false` comment (the file menu keeps Export skeleton, Rebuild around my drawings, Settings and About, drops New
town, Open…, Save a copy and Recently deleted, and Settings drops its Storage section; SR3-02, J-V9.98), `HostSlots.banner`'s
comment (a frozen view's notice the shell's own `error.frozen` strip; J-V9.97) and V9 §3.14's three load rows with (b)'s
**Edit it with this version**. Since CONFIRMED in the landed text (SS-45): V09's round 4 landed at 07:35 (lane log)
with V9 §2.2's `fileMenu: false` comment, J-V9.98 and T-V9-28's allowlist as V08 §13 X17 states them, read in V09's
current text by reconciliation round 1's continuation; X17 is closed.

**Added by reconciliation round 1's continuation (CONFIRMED by reading the current text on 2026-09-29, from 08:33).**
V10 §3.9's `raised` outcome table (`info.raised.built`; `info.raised.suppressed`, one key with this volume's panel,
CVR-V10-14), BCR-V10-19's scratch line (TOWN 20, CITY 55, METROPOLIS 130 MB, held during an authoring turn and while its
proposal waits) and V10 §3.17's host-mode selection (`builtin` without a transport is configuration A, with one the
proxy's B, `host` the host's own C); V06's wiring row W19 and V6 §3.15.1 (the chronicle's `raisedWay` entries, drawn at
display from V6 §5.2's templates, never stored); V9 §2.9's `MsgRef` and `MsgRow.codes` (a `PortNote` among the engine
codes), V9 §4.9's style rule and its sentence on `host.*` keys, V9 §4.10's `epoch` and dossier-event rows and "The host's
lines", V9 §2.7's `chips` words, V9 §5.7's report panel with "V08's dossier state list"; V11 §3.13.5's `import` fallback
for an unmatched good; the base's `PortNote { kind, detail }` with its eight kinds and `PortResult` (§14) and §5.4's
report; V08 §3.4's page rule (no refresh frame beside a visible CITY or METROPOLIS document), which puts the CITY page's
peak at 231 MB, not the 266 MB the seam assumed (J-V8.97). **PLAUSIBLE:** that a lived dossier's standing notes stay at a
few dozen once V11's `kinds` rows are total, the storage argument of J-V8.98 — counted on the pairs by T-V8-14 at SF3;
more than 64 standing notes on a fixture keeps the design (their ledger cost is paid only when they change) and is
reported.

**Added by reconciliation round 2's continuation (CONFIRMED by reading the current text on 2026-09-29, from 09:21).**
The base's §5.4 `GenerationReport` — its `dossier` member the standing placement state, no member carrying the port's
notes, the whole report a derived cache rebuilt by every derivation and excluded from every digest — and §11.2's
`report(h)` and query kinds, none of which returns the binding's notes (SR-23); §9.2's admission table (a `secret` place
admitted at every band only to tier `secret` or a key listing it), §11.2 *Knowledge* (a withheld place listed with
`withheld: true`; a band-less reader admits as at the city band) and §11.1 *Knowledge* (every picture and interchange
export takes the requester's key) (SR-25); V9 §2.10's `effectiveKey()` rule and V9 §4.8's "every other read for the view"
at the effective key, with a host's players' view as a key form (SR-24); V9 §5.4's Show-menu entry read from the
gazetteer at the view's effective key, and T-V9-68's absent entry under a key withholding one node (SR-25). Since
CONFIRMED in the landed text (SR2-24 (e); reconcile-V09-r2's continuation landed 09:49, read 2026-09-29 ~10:35): V9
§2.8's `HistoryRow.lines` and `.dossierGroup`, V9 §4.10's dossier groups and its absorb and creation heads with their
note lines, V9 §5.7's report panel listing `GenerationReport.dossier` then `.dossierNotes` under `host.group.standing`,
V9 §5.4 citing V08 §5.2's row, and XV-V9-26 marked met (V9 §10.2) — as V08 §13 X18 states them; X18 is closed.

**Added by reconciliation round 3's continuation (CONFIRMED by reading the current text on 2026-09-29, from 10:31).**
V11 §3.1's paragraph on rows 63–66 and 77 (`calibratable: false`, a table fix reviewed with V08; SCC-06, J-V11.65),
§3.13's head, T-V11-37's clause (no `dossier.*` column calibratable) and row 63's list of row sets; V12's R4 ("the
dossier row sets (§13.9 (7))" never calibrated); the base's §13.9 (7) ("The dossier row sets (§14) are not re-signed by
the corpus"); V11's `siting.web.chainStatus` row with `sustained` 0.9 (J-V11.52; X2 closed); V9 §4.9's
`history.dossierFacts.creation`, `report.moved.<kind>` and `report.dossier.<state>` rows (J-V9.109), V9 §4.10's
dossier groups bounded by the port's session (J-V9.107) and its `epoch` row's `info.raised.suppressed` lines from V06's
`EpochReport.raised.suppressedFired` (XV-V9-28; J-V9.113) — V09's text CONFIRMED, the field itself PLAUSIBLE until
volume 6 writes it (seam-surfaces-r3 SR3-10), which it has since done (the next paragraph); BCR-V9-36's `dossierKey`
input and the base's `query` returning a promise (§11.2). That V09 adopts SR2-23's slot shape `list(key)` and V11 adds
`elevated.landmarkMinSignificance` and `customWeights` as V08 §13 X19 and X20 state them — PLAUSIBLE when this
paragraph was written — is CONFIRMED: reconcile-V09-r3's and reconcile-V11-r3's continuations landed at 10:48 (the next
paragraph; X19 and X20 closed; seam-surfaces-r3 SR3-13 (b), seam-content-calibration-r3 SCC-R3C-11).

**Added by reconciliation round 4's continuation (CONFIRMED by reading the current text on 2026-09-29, from 11:40).**
V11 §3.24.2's `elevated.landmarkMinSignificance` 20 (the castle's significance; calibratable, its entry V12 §3.11's
`raisedWays` settings line; typed in V11 §2.8c and counted by V11 §3.24.7 (4)) and V11 §3.1 row 63's list of `dossier.*`
row sets naming `customWeights` (V08 §2.6; J-V8.108), non-calibratable like the row's others (V11 §3.1's paragraph on
rows 63–66 and 77) — reconcile-V11-r3's continuation, landed 10:48 (X19 closed). V9 §2.2's `HostSlots.historyLines` as
`{ list(key: ViewState['knowledge']); onChange }` with its comment (the shell calls `list(effectiveKey())` at each draw,
so again on each `onChange` and each `onEffectiveKey`; the provider keeps no View-as state or key subscription of its
own; a provider may answer at once and fire `onChange` when more is read), V9 §4.10's re-list, T-V9-28's View-as clause
and XV-V9-29 marked met — reconcile-V09-r3's continuation, landed 10:48 (X20 closed). V6 §2.10's
`EpochReport.raised.suppressedFired: { removal; week }[]`, filled by the `raisedWays` pass (V6 §3.19.3 (2)), held by
T-V6-58's kept-removed clause and J-V6.120, with V6 §13's X44 marking XV-V9-28 met — reconcile-V06-r4's continuation,
landed 11:39 (X21 opened and closed). The base's §11.2 `subscribe(h, handler)` delivering `doc.changed` `ApiEvent`s,
the feed V10 §3.11's staleness watch reads for a moved `logHead` — a user's edit, a host's dossier event, another
client's edit — and the head read of V08 §3.1 step 7 (b)'s answer cache (J-V8.110). **PLAUSIBLE:** that §11.2's
`doc.changed` event fires for an applied tail as for a local commit — the base's row read as V10 §3.11 reads it;
T-V8-47's head-move clause measures it.

**Added by reconciliation round 5 (CONFIRMED by reading the current text on 2026-09-29, from 12:40).** V10 §3.9's
`info.raised.<outcome>` rows with `suppressed` ("one key with V08's history panel", C8-47) and V10 §10.2's CVR-V10-14,
whose V08 part reads **Met**; V06's W19 (`EpochReport` and `ChronicleEntry`, V6 §2.10, §3.15.1, with the `raisedWay`
kind, read by V9 §4.10's `epoch` row lines and V08 §4.6 item 3); V9 §4.10's `epoch` row (V06's chronicle line with its
`info.raised.suppressed` lines); V9 §4.9's sentence that every `host.*` key volume 8 names is a row of the same file,
its text volume 8's (citing V08 §13 X12); V9 §5.12's `host.locked`; T-V9-15's walker over V08's port notes (X11 and X12
closed). V11 §3.12's `parish_church` REPLACEMENT row ("the shrine's pin kept as the churchyard cross") and
`cathedral_10_000_only` (the lesser absorbed, no pin kept), so only the first meets V08 §3.5.1 (c)'s pin-lesser
exception; V07 §2.4's REPLACEMENT row binding the shrine record to the churchyard's `cross` pin; V07 §3.11 steps 1–4
(the tag fallback's `lodging` → `v.inn` on a through road, else `v.alehouse`) and V07 §2.4's archetype `village` cells, read
before `villageForm` (a `mercantile-market` record's `market_cross`). **CONFIRMED (2026-09-29, reconciliation round 6;
seam-settlements-r5 SR5-08; was PLAUSIBLE):** that V07 §3.10 lays the churchyard `cross` a pin lesser binds and V11
§3.11–§3.12 read as seam-settlements-r4 SR4-01 and SR4-02 require — reconcile-V11-r5 landed at 12:51 and
reconcile-V07-r5 at 13:07, and their texts read so: V07 §3.10's pin-record rule (the churchyard `cross` of a wayside
shrine merged into a parish church laid in the church's `churchyard` yard part at its point nearest the door, the
shrine record binding it), V07 §3.11 step 4 (the port's one `unmapped_kind` note naming the class the fallback gives,
V08 §4.6), V11 §3.11's `@pin:<kind>` reading (at a village rung VS8's pins, a record forcing its pin where none stands,
V07 §3.10) and V11 §3.12's `parish_church` row (at a village rung the cross VS8 lays, bound by the shrine record; at a
base rung the alias on the church, V08 §3.5.1 (c)); read in the live files at 14:06 (V07 md5 c12250ca…, V11 md5
0f9e615b…); X22 CLOSED.

**Added by reconciliation round 6** (seam-settlements-r5). **CONFIRMED:** the tiers that bring the three REPLACEMENT
pairs to a village map over time (V11's kinds rows: `wayside_shrine` T, H and `parish_church` V, never sharing a birth
tier; `fishmonger` and `fish_market` both V; `palisade` T, `palisade_or_earthworks` H, V and `town_walls` W);
that SettlementForge's promotion keeps the record's key (the line keeps the old kind's `catalogId`; the base's key law,
§7.7 item 12, and F15; research `sf/mapping-verify.md`), which is why V08 §3.5.1 (d) re-points one key rather than
aliasing a second (J-V8.114); the lessers of V11 §3.12's REPLACEMENT rows read from its kinds rows (`citizen_militia`,
`traveling_performers`, `traveling_hedge_wizard`, `gates_if_walled` `@none`; `priest_resident` `@office`;
`wayside_shrine` `@pin:shrine`; `palisade`, `palisade_or_earthworks` `@wall`; `fishmonger` a shopfront;
`hedge_wizard` a dwelling-row house), so V08 §3.5.1 (c)'s three cases cover every row; V07's round-6 companion text of
SR5-02 read live at 14:06 and again at 14:12 after reconcile-V07-r6 landed (14:05; V07 md5 215e9cae…): *Records at a village epoch* item 4, §3.10's
last sentence, §3.11's upgrade exception and the palisade REPLACEMENT's `town_walls` key (the rebuilt enceinte, else the
new ring, the palisade's key its alias), §2.4's REPLACEMENT rows and J-V7.131; V06's SR5-04 text read live (V06 md5
412a7418…; reconcile-V06-r6 running): V6 §3.9.11's REPLACEMENT row excepting a greater V08 §3.5.1 (d) places new, and
converting the church in place when the cathedral replaces it. **PLAUSIBLE:** that V07's next lane takes the one-key
reading of a promotion receipt into item 4 and T-V7-13 (X23; reconcile-V07-r6 landed at 14:05, a minute before the
hand-off) and V06's round 6 names the exception by V08's cases rather than by template family (X24; hand-off at 14:06);
that V11's class `label` cell lands as read in its checkpointed text at 14:12 (V11 §2.3's *The display cells*: `label`,
`icon?`, `synonyms`, `commonness`, J-V11.93; reconcile-V11-r6 running; X25); and that the legend's symbol key, generated from the registry
(§9.5; O12 d), carries a word for each pin kind (the base says the key is generated from the registry; no registry row
read names the words — T-V8-46's market-cross clause refutes it if not).

**PLAUSIBLE (reasoning, to be measured).** Every budget of V08 §6 (until SF0 and SF7 measure them); the refresh queue's
campaign time; the storage figures beyond §2.9's own budget; the estimates of V08 §8; that SettlementForge's hosting admits
a frame on a second origin with workers (SF0's first measurement, with its fallback); that its store can compare-and-set
on `logHead` (risk 2's fallback); the `cultures` latitudes, the `crime` weights, the relation strengths and the custom
weight mappings (`customWeights`) — own values of the dossier row sets, not calibratable, changed only as table fixes
reviewed with V11 (V08 §2.6's header; SCC-R2C-1); that SettlementForge's scene tokens appear on custom records when the author
sets them (read in item 104's survey of the line's code, not seen on the reference pack's record); and that SettlementForge
lists only active custom chains in `customChains` (the reference pack's two chains are both active; the retire-and-re-put
rule of V08 §3.13 (10) holds either way). Added by the revision: the party set's render and storage budgets (V08 §6);
the reading of a condition's `expiresAtTicks` as its whole length (V08 §3.11, measured by T-V8-18 with its fallback);
SettlementForge's assistant's architecture — where its model loop runs — unsurveyed (the relay of V08 §4.4 (1) holds
either way; risk 6); the kind-family resolution's gain over exact names (T-V8-34 measures it); the chain-status
weights (V11's own `siting.web.chainStatus` cells, calibratable; J-V8.49); the threat, ladder and culture rows' values
(the dossier row sets `threats` and `cultures` and V11's `dossier.ladders` — not calibratable, table fixes reviewed with
V11; SCC-R2C-1); and every item-110 mechanism of V08 §2.6b — the
need-met rule, the terminal binding, the cap step, the fate link, the significance threshold (V11's
`elevated.landmarkMinSignificance`) and the dry-site
brook — each vetoable and each with a bar that would refute it (T-V8-36 – T-V8-40).

## 13 Fix list

Filled by the revision (lane volumes/revise-V8, 2026-09-29). Every blocker, major and minor of `docs/volumes/critique/V08.md`
(C8-01 – C8-49) is fixed in this volume or ruled with evidence (the disposition table appended to the critique); no
minor was left unfixed. What remains is of two kinds: items deliberately left for a later step, each with its reason and
the step that closes it, and hand-offs — rows or fields another volume or the coherence pass owns, which this volume
cites and designs as if applied. Reconciliation round 1 (2026-09-29) fixed all 18 of its seam issues and left nothing
on this list; X5 is superseded and X14 added. Reconciliation round 2 (2026-09-29) fixed all 6 of its seam issues and left
nothing on this list; X14 is closed (its companions landed, V08 §12) and X15 added. Reconciliation round 3 (2026-09-29)
fixed all 7 of its seam issues and left nothing on this list; X15 is closed (V09's round 2 landed, V08 §12), and X16
was added and closed (V09's round 3 landed with its companions). Reconciliation round 4 (2026-09-29) fixed its one seam
issue (SR3-06) and left nothing on this list; X17 is added (V09's SR3-02 half, met in V09's checkpointed text).
Reconciliation round 1's continuation (2026-09-29) fixed the six findings of seam-surfaces-r0's continuation owned here
(SS-38, SS-39, SS-42, SS-43, SS-44, SS-45) and left nothing on this list; X17 is closed, X11 and X12 widened.
Reconciliation round 2's continuation (2026-09-29) fixed the three findings of seam-surfaces-r1's continuation owned here
(SR-23, SR-24, SR-25) and left nothing on this list; X12 follows SR-23, and X18 is added (V09's companions).
Reconciliation round 3's continuation (2026-09-29) fixed its two new issues (SR2-24 of seam-surfaces-r2's continuation,
SCC-R2C-1 of seam-content-calibration-r2's) with SCC-R2C-10's V08 half, and left nothing on this list; X2 and X18 are
closed (their companions landed, V08 §12), and X19 (V11) and X20 (V09) are added (both since closed; seam-surfaces-r3
SR3-13). Reconciliation round 4's continuation (2026-09-29) fixed its two new issues (SR3-13 of seam-surfaces-r3's
continuation, SCC-R3C-11 of seam-content-calibration-r3's) and left nothing on this list; X19 and X20 are closed (their
lanes landed at 10:48, V08 §12), and X21 (V06) was added and closed (V06's round-4 continuation landed at 11:39 with the
field). Reconciliation round 5 (2026-09-29) fixed its four seam issues (SR4-06, SR4-07 and SR4-12 of seam-settlements-r4,
SR4-06 of seam-surfaces-r4) and left nothing on this list; X11 (V10, V06) and X12 (V09), met in their owners' text, are
closed (V08 §12), and X22 (V07, V11) is added for the companions of SR4-06 and SR4-07 (seam-settlements-r4).
Reconciliation round 6 (2026-09-29) fixed its four seam issues (SR5-01, SR5-06, SR5-07 and SR5-08 of
seam-settlements-r5) and left nothing on this list; X22 is closed (both lanes landed, V08 §12), and X23 (V07), X24 (V06)
and X25 (V11) are added for the companions of SR5-01 and SR5-07.

**(a) Deliberately left for later (the owner's "fix down the line").**

| # | item | why later | closed by |
|---|---|---|---|
| F1 | the line's full condition registry is not read (only the archetypes seen on the fixtures); if it holds a raid or piracy archetype, the `threats` row gains a `raider` source by a table version | nothing on the 47 fixture dossiers needs it, and the claim of J-V8.50 is stated on what was read | SF4's first act: a read-only census of the registry at `5d699cc68` (J67 scope), the row added if found |
| F2 | SettlementForge's assistant is unsurveyed (where its model loop runs, how it calls tools) | the relay of V08 §4.4 (1) works either way; the survey changes no contract | SF6's first act: a read-only survey; risk 6's fallback stands until then |
| F3 | the condition weeks' reading (`expiresAtTicks` as a whole length) is PLAUSIBLE | only the fixtures' ticks can settle it | T-V8-18's measurement at SF4, with the absolute-tick fallback pre-decided |
| F4 | the kind-family resolution's gain over exact names is unmeasured | a measurement on the pairs, not a design choice | T-V8-34 at SF4; no fuzzy matching whatever it shows (J-V8.82) |
| F5 | the party set's render and storage budgets are PLAUSIBLE | SF0 and SF7 measure them | T-V8-30 and T-V8-41, with V08 §6's fallback |

**(b) Hand-offs (owned elsewhere; this volume is designed as if each were applied).**

| # | to | what | from |
|---|---|---|---|
| X1 | revise-V11 | the ladder table's fixes from the re-check against SettlementForge's ladder file: the `inferred` rows the file holds become `ladder` or `subsumption`; `hospital_network`'s and `dungeon_delving_supply_district`'s lessers corrected; the pairs the file holds that V11 lacks added; the rows the file lacks but the dossiers list both forms of kept `inferred` (J-V8.81) | V08 §3.5.1 (f) |
| X2 | revise-V11 | **CLOSED** (reconciliation round 3's continuation): V11's `siting.web.chainStatus` row holds `sustained` 0.9 (J-V11.52), read in its text (V08 §12). Was: the `chainStatus` key `sustained` (a magically sustained chain) in `siting.web.chainStatus`, proposed at 0.9 | V08 §2.6 `chainStatus` |
| X3 | V06 | `CalamityRef.deaths: number`, the calamity's deaths, read by V04's burial growth | V08 §3.6 (3) |
| X4 | revise-V11 | the burial ladder rows: `Parish burial grounds` a SIZE lesser of the city record; `Burial grounds and charnel house`'s charnel part; `Cemetery network` a COUNT row, one member per gate on a through route, each extramural; `Great cathedral` SIZE over `Cathedral (10,000+ only)` | V08 §2.6a (3) |
| X5 | revise-V11 | **SUPERSEDED** (SS-38): the first version's `near` → terminal row on `conduit_house` is not added; V11 §3.24.7 (1)'s criteria row `pc/aqueduct/<way lineage>`, written by the aqueduct's generator, binds the conduit house to the terminal (J-VI.9, IN-V08-3) | V08 §2.6b (1) (c) |
| X6 | revise-V11, V02 | one culture modifier row per V11 culture row for item 110 (b)'s aqueduct chance; the stepped specialisation rows (item 110 (c)) keyed by culture and class, which DR15's template family reads | V08 §2.6b (4) |
| X7 | V07 | the village births carrying `Toll bridge` (`culture-norse`, `sample-cnocby`, `village-1`) read the same `kinds` cell's `implies: 'bridge'` in the village product's site rule | V08 §2.6b (3) |
| X8 | the coherence pass (_integrate) | the SLOT mechanism for removed generated item-110 content — a removed raised way's slot stays closed and a cap increase opens only a new slot — together with critique-V5's C5-51, which asks the same for islands | V08 §4.3 |
| X9 | revise-V11 | the `kinds` row's `implies: 'bridge'` cell for `toll_bridge`; the toll house's `deckOk` (whether it may stand on a bridge deck, item 110 (d)) | V08 §2.6, §2.6b (3) |
| X10 | the coherence pass (_integrate) | BCR-V8-28's `waterUse` field on item 110's raised-way record once that record is homed in §2.7; the generator report notes `aqueduct_no_source` and `toll_bridge_dry` in §5.4's report vocabulary | V08 §2.6b (1) (b), (e), (3) |
| X11 | V10, V06 | **CLOSED** (seam-surfaces-r4 SR4-06; reconciliation round 5): V10 §3.9's `info.raised.*` outcome rows, `info.raised.suppressed` one key with the history panel's line (V10 CVR-V10-14's V08 part **Met**), and V06's chronicle `raisedWay` entries (V06 W19; V6 §3.15.1) drawn as V9 §4.10's `epoch` rows, read in their text (V08 §12). Was: the words of item 110's `why` answers — V10 §3.9's `info.raised.*` rows, `info.raised.suppressed` one key with the history panel's line (CVR-V10-14) — and the history panel's raised-way lines, which are V06's chronicle `raisedWay` entries (V06 W19; V6 §3.15.1, §5.2's templates) drawn as V9 §4.10's `epoch` rows; this volume quotes none (SS-43) | V08 §4.4 (2), §4.6 |
| X12 | V09 | **CLOSED** (seam-surfaces-r4 SR4-06; reconciliation round 5): V9 §4.9's sentence "Every `host.*` key volume 8 names is a row of the same file, its text volume 8's (V08 §13 X12 …)", with V9 §5.12's `host.locked` ("Set by {host}") and T-V9-15's walker over V08's port notes (SR2-18, landed in V09's round 2), read in its text (V08 §12). Was: the `host.*` catalogue rows for the player's caption, "The DM has not opened this map yet", the strip "Showing what the players see" with its "Show everything" button, the party controls ("Hide again" and "Reveal again" among them), `host.locked` ("Set by {host}", V08 §3.1 step 7 (b); reconciliation round 2), the draft mirror's discard notice, the `upgrade-available` banner's "A newer map engine is available — use Update in the map's header" (no button), and the history panel's party lines `host.revealed` "Revealed to the party: {places}", `host.hidden` "Hidden from the party again: {places}", `host.partyTier` "The party's base knowledge is now {tier}" and `host.picturesDrawn` "Party pictures last drawn {time}" (reconciliation round 3, SR2-03, SR2-04), generated into the client's `statusText` where the client draws them; and (SS-44) the families `host.note.<kind>` (V08 §4.6's table, one row per `PortNote` kind), `host.held.<code>` (V08 §3.9, `E_RUNG_UNAVAILABLE` by case), `host.status.*` and `host.party.*` (V08 §5.1's table), `host.group.absorb`, `.absorbUndated` and `.standing` (V08 §4.6), `host.recovered.*` and `host.verify.mismatch` (V08 §3.9), with their words as written there — V9 §4.9's sentence on `host.*` keys and T-V9-15's walker read them (its engine codes include every `PortNote` kind and `PortRefusalCode`), and V9 §5.7's report panel lists `GenerationReport.dossier` (the placement state, "V08's dossier state list"), then `GenerationReport.dossierNotes` under `host.group.standing` (SR-23; V09's sentence is SR-22's) | V08 §3.1 step 7 (b), §3.7, §3.9, §3.14, §4.6, §5.1 |
| X13 | V04 | the readers of `site.ruinEvidence`'s seven kinds in V04 §3.5.0a's order, DR-V8.3's relief and mining inputs, and DR-V8.4's burial faces, rank and church count as V08 §2.6a states them | V08 §2.6a |
| X14 | reconcile-V11-r1, reconcile-V07-r1 | **CLOSED** (SR1-28; reconciliation round 2): all landed and read in the current text (V08 §12). Was: the companions of this volume's seam fixes, which this volume is written as if applied: V11 §3.12's burial pairs (`parish_burial_grounds` COUNT over `graveyard` and `burial_ground`; `graveyard` REPLACEMENT over `burial_ground`; SS-26), V11 §3.13.2's `village` archetype cell (SS-09), the spelling `@absent:watermill+windmill` in V11 §3.11 and BCR-V11-9 (SS-36), V11 §3.12's range paragraph citing V08 §3.5.1 (b)'s village sentence (SS-08); V07's `access_to_external_mill` read as `@absent:watermill+windmill` (SS-43) | V08 §2.6, §2.6a, §3.5.1 (reconciliation round 1) |
| X15 | V09 (reconcile-V09-r2, with SR-06 and SR-16) | **CLOSED** (SR2-09; reconciliation round 3): landed at 05:16 with every companion below, read in V09's text (V08 §12). Was: the companions of this round's fixes, which this volume is written as if applied — read applied in V09's current text (2026-09-29 ~05:12, that lane's batch-1 checkpoint of 05:08; open only until it lands): BCR-V9-23's `viewAs` admits the key form `{ tier, places }` (SR-06); V9 §4.8's "A host's players' view" — a host may set it, the View as menu then reads "What the players know" with `info.viewAs.host`, and the View-as banner is not drawn while the host's strip stands for it (J-V8.89, J-V9.85); `HostSlots.historyFilter` cites a generic host's viewer role and SettlementForge sets none (SR-16); `HostSlots.banner` draws the frame's own strips (XV-V9-20) | V08 §3.1 step 7, §3.14 (5), §5.1 (reconciliation round 2) |
| X16 | V09 (reconcile-V09-r3, with SR2-01 and SR2-02) | **CLOSED** within reconciliation round 3: V09's round 3 landed 06:25 with both slots, read in its text (V08 §12; V09's XV-V9-21 met by V08 §3.1 step 7 (b), §4.6, §5.1, X12). Was: the companions of this round's SR2-03: V9 §2.2's `HostSlots` gains `historyLines?: { list(): HostHistoryLine[]; onChange(h): () => void }` (`HostHistoryLine { at; text: MsgRef; targets: Id[] }`) and `newDocuments: 'download' \| 'off'`; V9 §4.10 draws the lines as the group "The party" at the head of the history list under **All** and **SettlementForge**, newest first, each with **Show** when it has targets and no **Undo this**, never persisted; V9 §3.9's new-document actions under `'download'` save the new `.plat` to the device, release it and toast `info.copy.saved` | V08 §3.1 step 7 (b), §4.6, §5.1 (reconciliation round 3) |
| X17 | V09 (reconcile-V09-r4, with SR3-02) | **CLOSED** (SS-45; reconciliation round 1's continuation): V09's round 4 landed 07:35; J-V9.98, V9 §2.2's `fileMenu: false` comment and T-V9-28's allowlist read in its text (V08 §12). Was: the companion of reconciliation round 4's SR3-06 (c) — V9 §2.2's `fileMenu: false` states its meaning once (in host mode the file menu keeps Export skeleton, Rebuild around my drawings, Settings and About and drops New town, Open…, Save a copy and Recently deleted; Settings drops its Storage section), V9 §5.1's top-bar row and V9 §5.12 cite it, and T-V9-28's allowlist names those four items and the Storage section | V08 §3.1 step 2, §5.1, BCR-V8-3 (reconciliation round 4) |
| X18 | V09 (reconcile-V09-r2's continuation, with SR-22, SR-34 and SR-35 of seam-surfaces-r1) | **CLOSED** (SR2-24 (e); reconciliation round 3's continuation): that lane landed 09:49; V9 §2.8, §4.10, §5.4, §5.7 and §10.2's XV-V9-26 read in its text (V08 §12). Was: OPEN until that lane lands (started 09:27): V9 §2.8's `HistoryRow.lines` and V9 §4.10's `dossierFacts` rows — the absorb group's head (`host.group.absorb`, `.absorbUndated`), its note lines with **Show**, a line dropped under the view's effective key, and the creation's row — by which V08 §4.6's absorb group is drawn (SR-22); V9 §5.7's dossier-bound item listing `GenerationReport.dossier`, then `GenerationReport.dossierNotes` under `host.group.standing` (SR-22 with this volume's SR-23); XV-V9-26 marked met with V08 §5.2's listed rule as SR-25 leaves it (SR-34); V9 §5.4 citing V08 §5.2's row without restating its rule (SR-35) | V08 §4.6, §5.2 (reconciliation round 2's continuation) |
| X19 | V11 (reconcile-V11-r3's continuation, with SCC-R2C-10; and the next V11 lane for `customWeights`) | **CLOSED** (SCC-R3C-11; SR3-13 (a); reconciliation round 4's continuation): reconcile-V11-r3's continuation landed 10:48; V11 §3.24.2 holds `elevated.landmarkMinSignificance` 20 (calibratable, its entry V12 §3.11's `raisedWays` settings line) and V11 §3.1 row 63 lists `customWeights`, non-calibratable like the row's others, read in its text (V08 §12). Was: OPEN until V11's text holds them: V11 §3.24.2's settings gain `elevated.landmarkMinSignificance` (the castle's significance; calibratable, bound by V12 §3.11's item-110 lines) beside `landmarkFactor`, whose text cites DR-V8.8 for the records that count (SCC-R2C-10's V11 half; J-V8.70); V11 §3.1 row 63's list of `dossier.*` row sets gains `customWeights` (V08 §2.6; J-V8.108), with its columns `calibratable: false` like the row's others | V08 §2.6 `customWeights`, §2.6b DR-V8.8, §3.11 (reconciliation round 3's continuation) |
| X20 | V09 (its next reconcile lane, with SR2-23 of seam-surfaces-r2's continuation) | **CLOSED** (SR3-13 (a); reconciliation round 4's continuation): reconcile-V09-r3's continuation landed 10:48; V9 §2.2's `list(key)` slot with its comment, V9 §4.10's re-list, T-V9-28's View-as clause and XV-V9-29 marked met, read in its text (V08 §12). Was: OPEN until V09's text holds it: V9 §2.2's `HostSlots.historyLines` reads `{ list(key: ViewState['knowledge']): HostHistoryLine[]; onChange(h: () => void): () => void }` — the shell calls `list(effectiveKey())` each time it draws the group, the provider naming and targeting only the places that key admits; V9 §4.10's host-lines paragraph re-lists them with `effectiveKey()` on each `onChange` and each `onEffectiveKey`; T-V9-28's host clause gains "a View as change re-lists the host lines with the new key" (J-SS2.8) | V08 §3.1 step 7 (b), §1b, T-V8-47, J-V8.106, J-V8.109 (reconciliation round 3's continuation) |
| X21 | V06 (reconcile-V06-r4's continuation, with SR3-10) | **CLOSED** within reconciliation round 4's continuation: V06's lane landed 11:39 with the field, read in its text (V6 §2.10, §3.19.3 (2), T-V6-58, J-V6.120, its X44; V08 §12). Was: `EpochReport.raised.suppressedFired: { removal: number /* the live delete's seq */; week: number /* that removal's week */ }[]` as seam-surfaces-r3 SR3-10 states it — one entry per suppressed raised-way key whose reason passes its chance gate at the epoch, in removal order, none for a key a re-add serves — read by V08 §4.6 item 3 and T-V8-45 | V08 §4.6 item 3, T-V8-45 (reconciliation round 4's continuation; SR3-13 (d)) |
| X22 | V07 (reconcile-V07-r5, with seam-settlements-r4 SR4-01 and SR4-08), V11 (reconcile-V11-r5, with SR4-02) | **CLOSED** (seam-settlements-r5 SR5-08; reconciliation round 6): reconcile-V11-r5 landed 12:51 and reconcile-V07-r5 13:07; V07 §3.10's pin-record rule, V07 §3.11 step 4, V11 §3.11's `@pin:<kind>` reading and V11 §3.12's `parish_church` row read in their text (V08 §12). Was: OPEN until both lanes land (started 12:36 and 12:39): V07 §3.10's rule that a pin record forces its pin — the churchyard `cross` of a wayside shrine merged into a parish church laid in the church's `churchyard` part, the pin V08 §3.5.1 (c)'s pin-lesser branch binds — and V07 §3.11 step 4's one `unmapped_kind` note naming the class the fallback gives (SR4-08); V11 §3.11's `@pin:<kind>` read at a village rung as VS8's pins and V11 §3.12's `parish_church` row naming both readings (at a village rung the cross VS8 lays, at a base rung the alias on the church, V08 §3.5.1 (c)) | V08 §3.5.1 (c), §4.6, T-V8-46 (reconciliation round 5) |
| X23 | V07 (its next reconcile lane; reconcile-V07-r6 landed 14:05 with SR5-02, a minute before this hand-off) | **CLOSED** by the finalization (seam-settlements-r6 SR6-01 applied in V07: item 4, §3.10, §3.11, §2.4, T-V7-13, T-V7-35, J-V7.131). Formerly OPEN until V07's text holds it (lane note 14:06): *Records at a village epoch* item 4's "the shrine record's key binding it (V08 §3.5.1 (c))" holds where the shrine keeps a key of its own (the church added beside a kept shrine, or the shrine leaving the list as the church arrives); after a promotion receipt the record's one key binds the church placed new and the churchyard `cross` is laid for the record — keyed by its binding key, its provenance the record — with no binding row of its own (V08 §3.5.1 (d); J-V8.114); T-V7-13's promotion clause reads "one churchyard `cross` laid for the record with no binding row, the record's key on the church" | V08 §3.5.1 (d), T-V8-46 (reconciliation round 6) |
| X24 | V06 (its next lane; reconcile-V06-r6 landed at 13:59, before this hand-off; seam-settlements-r6 SR6-02) | **CLOSED** by the finalization (SR6-02 applied in V06: V6 §3.9.11's REPLACEMENT row by V08 §3.5.1 (c)'s cases, J-V6.125, T-V6-45, X47). Formerly OPEN until V06's text holds it (lane note 14:06): V6 §3.9.11's REPLACEMENT row and J-V6.125 name the rows V08 places new by V08 §3.5.1 (c)'s cases — a building lesser whose row keeps not the lesser's thing (`fish_market` over `fishmonger`), a pin-record lesser (`parish_church` over `wayside_shrine`), the `@wall` rows by the fortification path — never by "another template family", since `hedge_wizard` → `wizard_s_tower`, `wizard_s_tower` → `mages_guild` and `parish_church` → `cathedral_10_000_only` change template family yet keep the lesser's thing in place | V08 §3.5.1 (c) (reconciliation round 6) |
| X25 | V11 (reconcile-V11-r6, with seam-settlements-r5 SR5-03) | **CLOSED** (seam-settlements-r6 SR6-05 (a)): V11 §2.3's *The display cells*, V11 §3.5.15 and J-V11.93 – J-V11.95 landed at 14:25; a generic class's label is its family's `label` cell (J-V11.95), not `trade.noun`. Formerly OPEN until that lane lands (its checkpointed text at 14:12 holds V11 §2.3's *The display cells*, J-V11.93): the class rows' `label` cell (BCR-V9-8, as SR5-03 asks: `label`, `icon?`, `synonyms`, `commonness` on `BuildingClassRow`, the `generic-<family>` classes' labels from V11's `trade.noun` slice), whose words V08 §4.6's `unmapped_kind` and `custom_resolved` notes show; V07's `v.` rows' labels follow with SR5-10 | V08 §4.6, T-V8-46 (reconciliation round 6) |

**(c) Rulings against the critique (evidence in the disposition table).** C8-10's directed relation key is not adopted
(J-V8.52: the line's pair order is not a direction, CONFIRMED on `city-1`); C8-06's chain-status numbers and C8-09's
calamity-to-hazard rows are adopted in substance but owned by V11 and V06 respectively, the port carrying keys and
references only (J-V8.49, J-V8.62).


## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V08-1 (J-VI.13).** The coherence pass numbers this volume's rows: DR-V8.1 → **DR29**, DR-V8.2 → **DR30**,
  DR-V8.3 → **DR31**, DR-V8.4 → **DR32**, DR-V8.5 → **DR33**, DR-V8.6 → **DR28** (one row with volume 6's DR-V6.1),
  DR-V8.7 → **DR34**, DR-V8.8 → **DR35**. The working names stay as aliases in this volume's text.
* **IN-V08-2 (J-VI.14, J-VI.15; X8, X10).** X8's slot mechanism is the one suppression mechanism of J-VI.14 (BCR-V6-24,
  widened to islands and accesses); X10's `waterUse` joins the raised-way record and the report notes `aqueduct_no_source`
  and `toll_bridge_dry` join §5.4's vocabulary (file f).
* **IN-V08-3 (J-VI.9).** A dossier-bound `conduit_house` (`aqueduct_or_water_system` → V11 §3.11) is the aqueduct's
  terminal where an aqueduct is generated; no conduit house is created that the dossier or roster does not hold.
* **IN-V08-4 (J-VI.20).** BCR-V8-29's `customKinds` row type carries no `fallbackClass` (BCR-V11-26): a carried custom
  institution's class is volume 11's item 104 (a) resolution; the read-time overlay of this volume stays (file f item 425).

## Reconciliation round 1 (volumes/reconcile-V08-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 18 seam issues owned by this volume in `docs/volumes/critique/seam-surfaces-r0.md`
(SS-01 – SS-05) and `docs/volumes/critique/seam-settlements-r0.md` (SS-08, SS-10 – SS-12, SS-20, SS-21, SS-23, SS-28,
SS-35, SS-37, SS-38, SS-42, SS-45): 1 blocker, 11 majors and 6 minors, **all 18 FIXED**, 0 ruled invalid, 0 left on the
fix list. Every sentence of the volume that read otherwise was edited in place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SS-01 (blocker) | The host projection is the MODULE's: applied to every `query.result` and every `preview` reply before it is posted out of the frame (BCR-V10-7 (c)); the host client carries no projection code (§5.4 (3), now with the kept and dropped fields of the base's kinds as a table; §4.4 (1); §2.2's `query`; §3.14 (2) (c); the §1b row; J-V8.73). T-V8-27 asserts on the bytes the module posts through a transport tap. J-V8.84 records the preview-reply projection. |
| SS-02 | `MapSession.setClerk(config: ClerkConfig)` takes BCR-V10-7's `clerk.config` body by citation, generated from `@plat/api`'s bridge schema (§2.2). |
| SS-03 | `MapSession.preview(events, o?: { view?, proposal? })` with BCR-V10-7 (b)'s proposal; `on('clerkProposal' \| 'clerkConfigRefused')` (§2.2, the §1b row); §4.4 (3) cites V10 §3.17's intake instead of describing it. |
| SS-04 | §4.4 (2) and §5.4 (3) list the offered kinds by citing V10 §3.17's table; `measure`, `hit` and `inView` refused `E_HOST_KIND`; T-V8-27's fixture list gains `brief`, `entity`, `sites`, `why` with sections, `frame` without radius, `rule`, `profile` (and the base's `fates` and the preview reply). |
| SS-05 | §4.4 (4): the map passes no dossier prose; the port line carries no description seed (V10 §1b.5; BCR-V10-14). |
| SS-08 | §3.5.1 (b): V11's range is the kind's lowest-tier range, scaled only above it; at a village rung an unnumbered record takes V07 §2.4's `rules.ladders.ranges` row, else V11's range unscaled; T-V8-44 gains the clause. |
| SS-10 | The `kinds` shape accepts `'@absent:<class>[+<class>]'` routed to S2 (§2.6 `kinds` and `distribution`, §3.5 (5)); §2.6a (3) reads `Access to parish church` → `@absent:church`; new bar T-V8-46 (SF3; BCR-V8-17's range now T-V8-1 – T-V8-46); §7.3 counts `@absent` records by none. |
| SS-11 | The `keywords` shape gains `class?`, `specialisation?` and `binds?: 'cryptAlways'`; the `archetypes` shape gains SS-09's optional `village` cell (§2.6). |
| SS-12 | §3.5 (5) (f): a custom record's class and profile are decided at fold by item 104 (a)'s resolution with V11 §3.13.1's rungs, never at digest; the `custom_resolved` note is written after the fold and names the deciding rung. Followed through §1b (the facts trace and the wiring row), §2.6 `categories` and `distribution`, §2.6b (1) (g), §2.7, §5.2, BCR-V8-13 and T-V8-25. |
| SS-20 | §3.10: a crossing is §4.11's rung change as BCR-V7-26 states it — the product at an epoch is V07 §2.1's fold with `handoff.band`; `LadderRouter` decides the product at creation and, at an absorb, only whether the population lies in a registered range. T-V8-19 gains the 1 480 / 1 520 (0 changes) and 1 400 / 1 600 (every epoch) clause; J-V8.12 cites the band. |
| SS-21 | §3.5 step 3's range is [0, 10⁷]; §3.6 (7) and B7: a population of 0 at an absorb routes to THORP and V07's desertion (a base-product document through the fold, J-V8.85), a creation at 0 is refused `E_RUNG_UNAVAILABLE` naming the floor; T-V8-15 gains the clause. |
| SS-23 | §3.5.1 (c): a GUILD record's hall binds as a member `#k` of a `craft_guilds_*` (family `craft`) or `merchant_guilds_*` (family `trade`) COUNT record of the same dossier, noted `ladder_merged` (J-V8.83); the `distribution` row and §7.3's parity follow; T-V8-44 gains the clause. |
| SS-28 | §3.10 drops `PortRungPath` and `registerRungPath`: the village product registers its `ProductDecl` (V07 §2.1; BCR-V7-11), the port consults `LadderRouter`; BCR-V8-9 WITHDRAWN in favour of file f item 202; the §1 scope item, the §1b row and the VH step follow; T-V8-19 registers a test `ProductDecl`. |
| SS-35 | "≈ 270" → 280 at the pinned line, read from `dossier.catalogue` (§2.6 `kinds`, J-V8.18). |
| SS-37 | §3.11's `fallbackClass` clause deleted; §5.2's building row and BCR-V8-13 cite the fold wording; BCR-V8-29's New drops `fallbackClass` (IN-V08-4). |
| SS-38 | §2.6b (1) (c): the aqueduct's generator binds the conduit house to the terminal by V11 §3.24.7 (1)'s criteria row; §13 X5 marked SUPERSEDED. |
| SS-42 | The `distribution` row's QUARTER step gains "(at a village rung, V07 §3.10's end claim)". |
| SS-45 | §2.6a (3): `Burial ground` and `Graveyard` read "REPLACEMENT (`graveyard` over `burial_ground`); both lessers of `parish_burial_grounds` (COUNT)", `Parish burial grounds` reads COUNT over both; (4)'s promotion sentence cites the three burial pairs (SS-26's, V11's to add). |

**Found in passing and fixed (the intake rule; each small and wiring-only).** (1) V11 registry row 77, W46 and T-V11-2
read `ladderPairs` from the catalogue manifest V08's build step writes, which V08 §2.4 said carried "names and tiers
only": the manifest now carries `ladderPairs: { greater, lesser[] }[]` (§2.4, the §1b row). (2) V11 §3.12's
`uncatalogued_step` note had no home in the port's note kinds: added to §2.4's union, BCR-V8-4 and §3.5.1 (b). (3) The
host `preview` reply carries `shape` and `actions[].at`: projected like a query answer (§5.4 (3); J-V8.84).

**New rows.** J-V8.83 – J-V8.85; T-V8-46; §13 X14 (the companions in V11 and V07 this volume is written as if applied:
SS-26, SS-09, SS-36, SS-08's V11 half, SS-43); §12's paragraph on what this round read. Counts now: 85 J-V8, 32 BCR-V8
(BCR-V8-9 withdrawn), 46 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f cites this volume's requests by id with a line pointer ("V08 §10, l. NNNN"); the round
added lines before §10, so those pointers are now approximate — the BCR ids are the authority. BCR-V8-9 is withdrawn
(file f item 202 already says so); BCR-V8-4, -13, -17 and -29 changed text (a note kind, the DR24 custom inputs, the bar
range and the retired `fallbackClass`), applied by reference.

## Reconciliation round 2 (volumes/reconcile-V08-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 6 seam issues owned by this volume in `docs/volumes/critique/seam-surfaces-r1.md`
(SR-03, SR-04, SR-05) and `docs/volumes/critique/seam-settlements-r1.md` (SR1-26, SR1-27, SR1-28): 3 majors and 3
minors, **all 6 FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in
place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SR-03 (major) | §3.1 gains step 7 "Bridge to the shell": the embed's bridge handler routes `clerk.config` to `ClerkMount.host.config`/`onConfig` and `HostSlots.clerkMode`, host `preview { proposal }` to `ClerkMount.host.proposals`, and posts `clerk.needsToken`, `clerk.config.refused` and `clerk.proposal` from the harness's `needsToken`, `refused` and `answer` (a); it fills `HostSlots` — `header` with §4.2's controls, `banner` with §5.1's strip, `lockedControls` with the population and tier word (reason `host.locked`, "Set by SettlementForge"), `exportFormats` by §5.4 (2), `fileMenu: false`, `historyFilter` unset, `hostName: 'SettlementForge'` a deployment constant of the embed build (b); it keeps `host.state` (c) and the selection `reveal`/`hide` carry (d). §1b: row 32's consumer is the bridge handler → `ClerkMount.host` (V9 §2.10); row 40 reads "the DM's and co-DM's frames" without "filtered history"; a new row for the handler. §4.4 (6) and §5.1 cite step 7. J-V8.90. |
| SR-04 (major) | A PLAT → host push `host.action { action: 'refresh' \| 'restore' \| 'newMap' \| 'reveal' \| 'hide' \| 'partyTier' \| 'assistantSettings'; args?: { places?, undo?, tier? } }` from owner or editor frames only, surfaced as `MapSession.on('action')` (§2.2, BCR-V8-1). §4.2 gains "How a click reaches the page" and each row's operation column names its `host.action` (or, for "Update the map engine" and "Keep the saved town", the event committed in the frame and the client's `doc.snapshot`; "See what the players see" in the frame alone); confirmation dialogs are the frame's, the restore dialog listing the edits after `backups[0].logHead`; "Hide again"/"Reveal again" are `args.undo` → `setParty({ prev: true })`; "Assistant settings" opens SettlementForge's own settings, then `setClerk`. New bar T-V8-47 (PR, SF6). §1b and §2.7 rows; §5.4 (4); SF6's exit and estimate (+0.25 pw; total 15.75–21.25, BCR-V8-18 follows). J-V8.88. |
| SR-05 (major) | "See what the players see" is a display filter: the header's toggle, or `seePlayersView(on)` posting `host.state { playersView }`, sets the frame's `ViewOpts.viewAs` to the party key resolved as in §3.14 (1), in SR-06's key form, and clears it when off; no view-state write; the frame's key stays `secret`, so the document formats, `doc.snapshot`, compaction and the draft mirror keep working (§3.14 (5), §4.2's row, §2.2's comment, §5.1's strip in `HostSlots.banner`). To give the frame the party key it filters by, a host → PLAT memory-only push `host.state { party?, backups?, partyPicturesAt?, playersView? }` (§2.2, BCR-V8-1, §2.7, §1b; J-V8.86), which also feeds the restore dialog and the history panel's reveal lines (§4.6). T-V8-41 gains the players'-view clause. J-V8.87, J-V8.89. |
| SR1-26 (minor) | §3.5 step 6: "each label is resolved by V11 §3.13.5's matching rule; a label matching none is noted `unmapped_good`". |
| SR1-27 (minor) | T-V8-46 keeps at SF3 the compile check and a base-rung test-side mutation of `town-1` carrying both `@absent` records (with every binding record removed); the two hamlet clauses move to VH, read through V07 §3.11 step 1's `villageForm` reading (SR1-02); §8.2's VH exit lists them. In passing, §2.6's `kinds` shape and §2.6a (3)'s `Access to parish church` row cite that village reading. |
| SR1-28 (minor) | §12: V11's SS-26 burial pairs, SS-09's `village` cell, SS-36's spelling and SS-08's range paragraph, and V07's SS-43 reading, are CONFIRMED in the landed text, cited by section (lines move while both volumes are edited); §13 X14 CLOSED. |

**New rows.** J-V8.86 – J-V8.90; T-V8-47 (BCR-V8-17's range now T-V8-1 – T-V8-47); §13 X15 (V09's companions: SR-06's
key form, the View-as banner yielding to the strip, `historyFilter`, `HostSlots.banner` — read applied in V09's text by its
own round-2 lane, open until it lands); X12 gains `host.locked` and the strip's button; §12's round-2 paragraph. Aligned
with V09's round-2 text as read: `HostSlots.banner` also carries the held and frozen-view notices (XV-V9-20), and
`viewAs` is cleared with `undefined`. **Found in passing** (V07's note to this lane, 05:11): V08 §3.5.1 (b)'s village range
sentence reads V07 §2.4's row "for its step type and member class" (V07 SR1-16). Counts now: 90 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f item 472 cites BCR-V8-1 by id; its text grew by `host.state` and `host.action`
(applied by reference). BCR-V8-17 (the bar range) and BCR-V8-18 (15.75–21.25 pw) changed text likewise.

## Reconciliation round 3 (volumes/reconcile-V08-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 7 seam issues owned by this volume in `docs/volumes/critique/seam-surfaces-r2.md`
(SR2-03, SR2-04, SR2-06, SR2-07, SR2-09, SR2-16) and `docs/volumes/critique/seam-settlements-r2.md` (SR2-04 — the two
files number independently, so the second is written "SR2-04 (settlements)" below): 2 majors and 5 minors, **all 7
FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in place; this note lists
the changes.

| issue | what changed (where) |
|---|---|
| SR2-06 (major) | `export.request`'s `knowledge` is `Admission` — BCR-V10-22's type, which is BCR-V9-14's union — with its reading (lowering only; a tier alone read with the requester key's places; a key form a key in its own right): BCR-V8-1, §2.2's comment, `MapSession.exportPicture`, the §1b row. The party renders pass the resolved party key as the key form `{ tier, places }`, `places` always present (§3.14 (1)). The host's own public and local pictures pass key forms with empty places, never a bare tier (§3.7's thumbnails, §5.3; J-V8.92). T-V8-16 gains the reading. |
| SR2-07 (major) | §3.14 (2) (c): the party gazetteer is `query(h, { kind: 'gazetteer' \| 'people', … }, { admitAs: the party key form })`, band-less (city-band admission, §11.2); the §1b party-set row names `admitAs` and BCR-V10-22; T-V8-17 gains "every `gazetteer` and `people` query of a party render carries that `admitAs`" (and every picture that `knowledge`). |
| SR2-03 | §3.1 step 7 (b) fills `HostSlots.historyLines` from the differences of successive `host.state` values — `host.revealed`, `host.hidden`, `host.partyTier` (a tier change is a party change too) and one replaced `host.picturesDrawn` line; empty at each load, never persisted — and `newDocuments: 'download'` (a copy of a dossier-bound document is detached, V6 §4.4); (c) and the handler's lifetime paragraph follow. §4.6 cites the slot; §5.1's differences list gains the saved-copy point and the party group; §13 X12 lists the four keys; T-V8-47 asserts both slots; §1b and §2.7 rows; J-V8.93. V09's halves (SR2-01, SR2-02) are X16. |
| SR2-04 (minor) | §5.1's `upgrade-available` banner reads "A newer map engine is available — use Update in the map's header", no button (J-V8.35). §4.2's "Keep the saved town" row is V9 §3.14's load-mismatch choice, shown by the shell at load — no header control; after its keep commits the `rebase`, the client sends `doc.snapshot`; "How a click reaches the page" and §4.3 follow; T-V8-47 drops it from the header and asserts the load-mismatch keep's path and the button-less banner. J-V8.88 marked REVISED; J-V8.94. |
| SR2-09 (minor) | §3.14 (5) cites V9 §2.10's `effectiveKey()` and BCR-V9-23 ("what both its key and the party key admit") instead of round 1's wording; §12's round-2 paragraph reads "read in V09 as landed (reconcile-V09-r2, 05:16)"; X15 CLOSED. |
| SR2-16 (minor) | §4.1 and §4.3 read "a raised way, a retaining wall (a generated terrace's walls among them) or a deck plot", §4.3 citing file f item 260's suppression kinds; BCR-V8-31's New text follows. |
| SR2-04 (settlements) (minor) | §2.6's `deposits` row: a record whose class carries a hard `near` → `landuse:<k>` row within 0 (V11 §3.5.10: `salt_works` → `saltpan`, `peat_works` → `marsh`) on a dossier listing no deposit that opens `<k>` gets a derived `DepositSite` under `res:derived:<k>` (family `salt` or `peat`), sited by S12a at DR19's site, noted `derived_landuse`; one per land use; kept `depleted` when no record needs it, never removed; a later deposit opens its own face beside it; a custom record opens none (its class is decided at fold). §3.11, §2.5's key list, §2.4's note kinds and BCR-V8-4, §5.2's label, §2.7 and §1b rows; T-V8-18 gains the salt-works mutation of `town-1`, a totality compile check over the `kinds`-bound hard rows, and a hamlet peat clause at VH (§8.2's VH exit); J-V8.95. |

**Found in passing and fixed (the intake rule).** The party picture set had no message to cross the bridge in:
`PartyPictureSet` was a store input no message carried (T-V8-2 requires one), and neither the resolved party key (ids)
nor `admitAs` (a facade option; the bridge's `query { q }` has none) can be produced by the client, so SR2-06 and SR2-07
could not be met by a client-assembled set. The set now crosses as one request and one reply — the client's
`party.render { party, since? }` and the module's `party.rendered { status: 'rendered', set } | { status: 'unchanged' }`
(§2.2, BCR-V8-1, §3.14 (3), B18, §2.7, §1b; J-V8.91) — with `PartyPictureSet.drawDigest` keeping the first version's rule
that an edit which changes nothing drawn or listed costs no store write; T-V8-41 gains the crossing clauses. The
message count is now nine.

**New rows.** J-V8.91 – J-V8.95; §13 X16 (V09's SR2-01 and SR2-02 halves), closed within the round — V09's round 3
landed at 06:25 with both slots, V9 §3.9's host-mode rule and the group "The party", which this volume now cites (its
XV-V9-21 met; §5.1's saved-copy point names V9 §3.9's actions, a copy, a re-run and a new seed, since host mode has no
creation beside the current one); X12 widened; §12's round-3 paragraph. Counts now: 95 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions
(unchanged). Effort unchanged: the party render's crossing replaces the unspecified assembly already priced in SF5, and
the derived land use is one port rule inside SF4's range.

**For the coherence pass.** File f item 472 (BCR-V8-1) — its *Note* already records SR2-06's union; its text also grew by
`party.render` and `party.rendered` (applied by reference). Items 453 and 572 may now read *Needed by* with V08 met
(SR2-19's conditions: V08's `export.request` carries the union; V08's party gazetteer passes `admitAs`). BCR-V8-4 (a note
kind) and BCR-V8-31 (the terrace wording) changed text, applied by reference.

## Reconciliation round 4 (volumes/reconcile-V08-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r4; covered by the whole-design retrovalidation (J84).

Reconciled in place against the one seam issue owned by this volume in `docs/volumes/critique/seam-surfaces-r3.md`
(SR3-06, minor, restatement): **FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was
edited in place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SR3-06 (a) | §3.1 step 7 (b)'s `newDocuments` clause reads "`newDocuments: 'download'` — V9 §3.9's host-mode rule then governs every action that makes a new document; a copy of a dossier-bound document is detached (V6 §4.4): it does not follow SettlementForge (J-V8.93)": the shorter action list and the `export(h, 'plat')` mechanism, both V9 §3.9's, are gone. §1b's `HostSlots.newDocuments` row cites V9 §3.9 without the list. |
| SR3-06 (b) | §4.6's last sentence reads "Each line is drawn by V9 §4.10's rule for the host's lines; its undo is V08 §4.2's "Hide again" or "Reveal again"." Earlier in that paragraph, step 7 (b)'s restated difference rule became a citation of V08 §3.1 step 7 (b), (c). |
| SR3-06 (c) | §5.1's host-mode differences gain the assistant as the host's `clerk.config` sets it — the Assistant button only under `builtin`, otherwise the card-only drawer for a host's proposal (V9 §2.2, §4.11; V10 §3.17) — with no creation mode and no **Start a new map from this** (V9 §3.9, §4.11); "no file menu, open, save or permalink" reads "no file operations — New town, Open…, Save a copy, Recently deleted — and no permalink (V9 §2.2's `fileMenu: false`; SR3-02)", plus Settings without its Storage section (SR3-02's second effect; J-V8.96), so the list T-V9-28's allowlist reads is complete; the new-document point cites V9 §3.9 without a list. |

**Found in passing and fixed (the intake rule).** §3.1 step 2 and BCR-V8-3's new text for base §14 read "no file menu"
for host mode, the wording SR3-06 (c) retires; both read "no file operations" (step 2 citing V9 §2.2's `fileMenu:
false` and V08 §5.1).

**Found in passing and fixed (V09's note of 07:28, XV-V9-24; J-V9.97).** V09's round 4 makes a frozen view's notice the
shell's own `error.frozen` strip with its one owner control **Edit it with this version** (V9 §3.14 (b)). §3.1 step 7
(b)'s `banner` now carries the held notice only; §5.2's frozen view cites V9 §3.14 (b)'s strip; §3.8's `frozenImport`
rebase is offered by that control and committed through `doc.changed`, the client then sending `doc.snapshot`; T-V8-47
gains that path and the banner slot's absence of a frozen-view notice. Inside
the window V08 §4.2's **Update the map engine** stays host mode's only upgrade control (V9 §3.14 (a); J-V8.94), and a
model-less document's **Open its recipe with this version** follows V9 §3.9's host rule, which §3.1 step 7 (b) now cites
for every new document.

**New rows.** J-V8.96; §13 X17 (V09's SR3-02 half, met in V09's checkpointed text, closing when V09's round 4 lands);
§12's round-4 paragraph. Counts now: 96 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions (unchanged). Effort
unchanged: wording only.

**For the coherence pass.** File f item 507 (BCR-V8-3, the host client package and the embed entry): its New text
changed one phrase ("no file operations" for "no file menu"), applied by reference.

## Reconciliation round 1 — continuation (volumes/reconcile-V08-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r1; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a wider brief than its 03:53 landing covered: the thirteen `seam-settlements-r0` issues of
the first run (SS-08, SS-10 – SS-12, SS-20, SS-21, SS-23, SS-28, SS-35, SS-37, SS-38, SS-42, SS-45) and six findings of
`docs/volumes/critique/seam-surfaces-r0.md` §5, its continuation of 08:31 (SS-38, SS-39, SS-42, SS-43, SS-44, SS-45 — the
two critique files number independently, so the second set is written "(surfaces)" below where an id repeats). **The
thirteen** were verified in the live text after rounds 2 – 4 (every anchor present: the village range sentence, the
`@absent` shape and `Access to parish church` row, the keyword and archetype cells, the fold-time custom class, the band
and T-V8-19's clause, [0, 10⁷] and the desertion, the guild-hall binding, `PortRungPath` withdrawn, 280 kinds, no
`fallbackClass`, the criteria row, the end claim and the burial steps) and not redone. **The six** — 1 major and 5
minors — are **all FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in
place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SS-44 (surfaces, major) | V08 §4.6 gains the table "The port's notes in words": one row per `PortNote` kind — the base's eight and V08 §2.4's twenty-seven — key `host.note.<kind>`, one sentence of at most 25 words, its args and where the port fills them, its **Show** keys and its class (`event`, `standing`, `report`). V08 §3.9's "the user sees" column now names keys: the held reasons `host.held.<code>` (`E_RUNG_UNAVAILABLE` by case: `.village`, `.cap`, `.empty`) with their words, B10 – B11's `host.recovered.*`, B20's `host.verify.mismatch`, and the note rows for B4, B13, B17 and B19; V08 §5.1's banner table keys its rows (`host.status.*`, `host.party.*`). To make the words reachable (the note had only `detail`, and no frame but the port leader's ever saw a note): `PortNote` gains `msg` (BCR-V9-12's `MsgRef`) and `keys` (V08 §2.4, BCR-V8-4); the ledger event carries `notes` and `notesCleared` by class and `DossierBinding.notes` keeps the standing list (V08 §2.3, §3.6 (4), BCR-V8-6, BCR-V8-8); `MapRecord.held` and `dossier.result.held` carry the refusal's `reason` (V08 §2.1, §2.2, BCR-V8-1); `module.status.detail` names a key (V08 §2.2, §3.3). §2.7's lifecycle rows, §1b's rows, SF3 and SF6 follow; X12 names every family; T-V8-14 gains the words' walker and the persistence clauses (J-V8.98 – J-V8.102). |
| SS-38 (surfaces) | V08 §1's out-of-scope sentence reads "The built-in clerk itself is volume V10's; this volume builds SettlementForge's own clerk (configuration C) and the host side of V10's configurations B and C — `setClerk` with the transport and its renewal …, the proposal channel and the projection (V08 §2.2, §4.4, §5.4 (3))"; in-scope item 9 says the same. |
| SS-39 (surfaces) | V08 §6's page-memory row adds V10's scratch line (BCR-V10-19) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal: TOWN ≤ 161 MB, CITY ≤ 231 MB, METROPOLIS ≤ 421 MB (the no-turn bars kept beside them). Two corrections to the finding's arithmetic, recorded in J-V8.97: configuration A runs the same clerk in the frame (host mode's `builtin` without a transport, V10 §3.17), so the line counts under A and B; and the CITY peak is 231 MB, not 266 MB, because V08 §3.4 never runs the refresh frame beside a visible CITY. T-V8-30's page case runs once more under B with a proposal waiting. |
| SS-42 (surfaces) | J-V8.21 marked "REVISED (C8-01; SS-42 …)": an editor's assistant acts inside that user's frame session with the user's role and key; a player's assistant has no session and reads only the stored party gazetteer made under the party key. |
| SS-43 (surfaces) | V08 §4.6 quotes no raised-way sentence: an absorb's epoch that built a raised way is V9 §4.10's `epoch` row (V06's chronicle `raisedWay` entry, W19), **Why here?** opening `info.raised.built`; a reason at a closed slot is the line `info.raised.suppressed` (V10 §3.9); a way in a slot a cap increase opened is an ordinary founding entry. X11 names V06 beside V10; T-V8-45 checks keys and args, not words. The group heads are keyed too (`host.group.absorb`, `.absorbUndated`, `.standing`). |
| SS-45 (surfaces) | §13 X17 **CLOSED** (V09's round 4 landed 07:35; J-V9.98, V9 §2.2, T-V9-28 read in its text); §12's round-4 PLAUSIBLE moved to CONFIRMED with that citation. |

**Found in passing and fixed (the intake rule).** (1) Seven places said "noted" with no note kind — a notable's
workplace or power and a cross-link reference that join nothing, a kind-family name matching several records, a custom
record without `localUid`, a guild COUNT record above its range, a `kinds` row `'@none'`, and a custom service's provider
or chain resource that join nothing: the first five now name `name_unjoined`, `name_ambiguous`, `custom_unkeyed`,
`count_over_range` and `not_placed` (new kinds, V08 §2.4, BCR-V8-4; J-V8.100), the last two `custom_node_unjoined`; and
V08 §2.6 states once that every row set's "else …, noted" writes `unmapped_word`. (2) V08 §2.5's `outputs` comment said
an unmatched good label gives `[]`, against V11 §3.13.5's rule (it resolves to the generic good `import`, noted
`unmapped_good`): now it cites that rule. (3) V09's continuation lane (reconcile-V09-r1, checkpoint 08:47) asks this
volume, XV-V9-26, to list each ACTIVE custom chain in the gazetteer under the kind `customChain` (withheld unless the key
admits every node), the read by which V9 §5.4 offers **SettlementForge's chains** (its SS-41): V08 §5.2's row, the §1b
row and BCR-V8-15 (the §11.2 gazetteer kind) now say so.

**New rows.** J-V8.97 – J-V8.102; no new bar (T-V8-14, T-V8-30 and T-V8-45 widened); §12's continuation paragraph; §13's
intro, X11, X12 and X17. SF3 +0.25 pw at its top (the notes' args, classes and standing list): M-SF 15.75–21.5 pw
(BCR-V8-18 follows). Counts now: 102 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f's items for BCR-V8-1 (item 472: `dossier.result.held.reason`, `module.status.detail`
as a key), BCR-V8-4 (five kinds, `PortNote.msg` and `.keys`), BCR-V8-6 (`dossierFacts.notes`, `.notesCleared`),
BCR-V8-8 (`DossierBinding.notes`), BCR-V8-15 (the gazetteer kind `customChain`) and BCR-V8-18 (15.75–21.5 pw) changed
text, applied by reference. **For V09** (no edit made there): V9 §4.9's sentence on `host.*` keys and T-V9-15 already
cover the port's notes; V08 §13 X12 now lists every family by name, and V9 §5.7's "V08's dossier state list" is
`DossierBinding.notes` under `host.group.standing`.

## Reconciliation round 2 — continuation (volumes/reconcile-V08-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r2; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a wider brief than its 05:12 landing covered: the three `seam-settlements-r1` minors of the
first run (SR1-26, SR1-27, SR1-28) and three findings of `docs/volumes/critique/seam-surfaces-r1.md` §7, its continuation
of 09:15 (SR-23, SR-25 majors; SR-24 minor). **The first three** were verified in the live text (V08 §3.5 step 6 cites
V11 §3.13.5's matching rule with `unmapped_good`; T-V8-46's hamlet clauses sit at VH with a base-rung `town-1` mutation
at SF3; V08 §12 lists the V11 and V07 companions as CONFIRMED and §13 X14 is CLOSED) and not redone. **The three new
findings** are **all FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in
place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SR-23 (major) | BCR-V8-8 gains a second target: §5.4's `GenerationReport` adds `dossierNotes: PortNote[]` — the document's `DossierBinding.notes` at the report's seq, in identity order, `[]` for an unbound document, rebuilt with the report by every derivation and the verification replay (a derived cache, in no digest) — with a sentence in §5.4's prose. V08 §4.6's *The standing notes* reads: the report panel reads `report(h)`; its dossier section lists `GenerationReport.dossier` (the placement state, V9 §5.7's "V08's dossier state list"), then `GenerationReport.dossierNotes` under `host.group.standing`, one line per note as the absorb group's item 2; the class column's `standing` cell names the field. §1b: the `PortNote` and ledger rows route standing notes through `GenerationReport.dossierNotes` and `report(h)`, and a new row for the field; §2.7: the `DossierBinding.notes` row's read column and a new lifecycle row for the field. T-V8-14's report-panel clause reads the field (equal to the binding at the report's seq in every frame and after a reload, `[]` unbound, listed after the placement state). SF3 names it. §13 X12's V9 §5.7 clause follows. J-V8.104. |
| SR-24 (minor) | V08 §4.6 item 2 and *The standing notes* drop a note line whose `keys` bind an element the view's effective key (V9 §2.10; V9 §4.8) does not admit, in place of "the frame's key". T-V8-14 gains the clause: on a `town-1` variant with a `secret` standing-note record and a `secret` event-note element, both lines at `secret`, neither under View as "What anyone knows" nor under "See what the players see" with a party key omitting them. |
| SR-25 (major) | V08 §5.2's `CustomChainRecord` row gains its **Knowledge** rule: a chain is drawn, labelled, listed in the gazetteer and exported only when the key admits every joined node — the view's effective key for the drawing, the legend and the gazetteer, the export's knowledge key for GeoJSON and pictures (§11.1) — each node by its `knownTo` in §9.2's table as a band-less reader admits it, a concealed use never; otherwise not drawn, not listed (a relation, never an "unnamed" row) and not exported. BCR-V8-15's §8.2, §11.1 and §11.2 clauses say the same ("listed only when the key admits every joined node"). T-V8-25 gains the active-chain variant with one `secret` processor, read at `public` and at a party key form without it: no line, arrowhead, legend row, gazetteer row, GeoJSON feature or SVG path, all present at `secret`. §1b: the drawing-rows row and a new row for the rule. SF4 names it. J-V8.103, J-V8.105 (the export's whole key, not its tier alone, as §11.1 reads it; nodes admitted as at the city band, so a chain does not flicker with zoom). |

**Found in passing and fixed (the intake rule).** V08 §3.1 step 7 (b) resolved the party lines' `{places}` "under the
frame's key", the sibling of SR-24: a `host.hidden` line would name, under "See what the players see", places the party no
longer knows. The lines' `{places}` and `targets` now follow the view's effective key — a withheld place neither named nor
targeted, a line left with no place not listed, the list re-made on `onEffectiveKey` (V9 §2.10) — with a T-V8-47 clause
and J-V8.106.

**New rows.** J-V8.103 – J-V8.106; no new bar (T-V8-14, T-V8-25 and T-V8-47 widened); §12's continuation paragraph; §13's
intro, X12 and X18 (V09's companions, open until reconcile-V09-r2's continuation lands: SR-22's `HistoryRow.lines` and
`dossierFacts` rows, V9 §5.7's sentence, SR-34's XV-V9-26 status and SR-35's citation of V08 §5.2). Effort unchanged: a
copied list in the report build and one admission test per chain fit SF3's and SF4's ranges (PLAUSIBLE). Counts now: 106
J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f item 390 cites BCR-V8-8 by id and now also touches §5.4 (its "Also touches" line does
not yet say so); item 410 cites BCR-V8-15, whose §11.2 gazetteer clause is not in its "Also touches" line either. Both
are applied by reference; no edit was made in file f. **For V09** (no edit made there): V08 §4.6 and §5.2 now read as
SR-22's V9 §5.7 sentence and SR-34's "listed rule as SR-25 leaves it" expect.

**Checks.** `docs/validation/bench/doc_checks.py` (headings from the base) on this file before and after: C1, C2, C4 and S1
0 hits both; C3 213 → 225, the new hits generic phrases ("as well as for the", "in place of the frame"), number runs and
the PENDING line; S2 192 → 211, the new hits volume-qualified pointers (V9 §2.10, V9 §5.7, V08 §3.14). The diff against
the backup (`scratchpad/volumes/rcV8r2c/V08-pre-r2c.md`) holds this lane's hunks only.

## Reconciliation round 3 — continuation (volumes/reconcile-V08-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r3; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a different brief from the one its 06:30 landing covered. That brief's SR2-04 of
`seam-settlements-r2` (the land use a record needs, DR19) was verified in the live text and not redone: V08 §2.6's
`deposits` row still opens `res:derived:<k>` for `salt_works` and `peat_works`, notes `derived_landuse`, and T-V8-18
holds the salt-works mutation. The two new issues are **both FIXED**, 0 ruled invalid, 0 left on the fix list. They are
SR2-24 (minor), from `docs/volumes/critique/seam-surfaces-r2.md` §9, whose continuation landed at 10:02, and SCC-R2C-1
(major), from `docs/volumes/critique/seam-content-calibration-r2.md` §7.2, whose continuation landed at 10:12. Every
sentence that said otherwise was edited in place, and the table below lists the changes.

| issue | what changed (where) |
|---|---|
| SR2-24 (a) (minor; SR2-23's companion) | V08 §3.1 step 7 (b): `{places}` are the names of the places admitted by the key that `list` is called with (V9 §2.2; the shell passes `effectiveKey()`). Each place is read by `query(h, { kind: 'entity', dossierKey } \| { kind: 'entity', id }, { admitAs: that key })` (BCR-V9-36, BCR-V10-22): a binding key by `dossierKey`, a collective record by its members' `#k` keys, an address by `id`. A `withheld` place is neither named nor targeted, a `null` one is named by its key with no target, and a reveal or hide line left with no place is not listed. The handler keeps no subscription and is never handed `effectiveKey` or `onEffectiveKey`. Because `list` is synchronous and `query` answers by promise, the handler keeps a per-key answer cache, dropped at each new line and each head move. A `list` with an unread key returns only the lines that name no place, then fires `onChange` once the reads answer (J-V8.109). J-V8.106 is REVISED. T-V8-47's clause is rewritten (the party key form, the frame's key, a `null` place, an unread key, no `onEffectiveKey` handler, every read through `query` with `admitAs`). The §1b row and the §2.7 lifecycle row are updated. |
| SR2-24 (b) | V08 §4.6 item 3: the suppressed raised-way line is "drawn as V9 §4.10's `epoch` row's line, from V06's `EpochReport.raised.suppressedFired` (V9 XV-V9-28; J-V9.113)". No `raisedOutcome` or `RaisedWayLedger` read remains in the volume. |
| SR2-24 (c) | V08 §4.6's opening now lists V9 §4.9's rows (`history.dossierFacts.creation`, `report.moved.<kind>`, `report.dossier.<state>`; J-V9.109) as a home of the words. Item 1 reads "each by V9 §4.9's `report.moved.<kind>` row". In passing, item 2's key resolution cites V9 §4.10's `entity` read by `dossierKey` (BCR-V9-36), as SR2-20's *Needed by* expects. |
| SR2-24 (d) | V08 §4.6's absorb group is now "the port's `host:port` events after it, up to the next ledger event or another session's event (V08 §3.6 step 6; V9 §4.10's dossier groups, J-V9.107)". |
| SR2-24 (e) | X18 is **CLOSED**: V09's continuation landed at 09:49, and its V9 §2.8, §4.10, §5.4, §5.7 and §10.2 (XV-V9-26 met) were read in its text. §12's round-2-continuation PLAUSIBLE clause has moved to CONFIRMED. |
| SCC-R2C-1 (major) | V08 §2.6's header now gives every cell as `{ value, unit, provenance: own }` with `calibratable: false`. A dossier row set is a derivation rule of the port (item 20 (h)) and is never calibrated (§13.9 (7); V11 §3.1 rows 63–66, J-V11.65; V12's R4). A value changes only as a table fix reviewed with V11, V12's register holds no entry for it, and T-V11-37 fails a calibratable `dossier.*` column. The rows `cultures`, `relations` and `calamitySeverity` and J-V8.26 (REVISED) now read "not calibratable (a table fix)". §12's two sentences are rewritten: the dossier row sets' values (`cultures`, `crime`, relations, `customWeights`, `threats`, `dossier.ladders`) are not calibratable, and "calibratable" is kept only for V11's own `siting.web.chainStatus` cells (J-V8.49). T-V8-18 gains the clause that V08's sources compile with `calibratable: false`, which is T-V11-37's check. The decision is J-V8.107. |
| SCC-R2C-10, V08 half (the move SCC-R2C-1 points to) | DR-V8.8 now reads "at least V11 §3.24.2's `elevated.landmarkMinSignificance`" in place of its own `landmark.minSignificance` 20, and the same edit is made in §1b's two places, T-V8-38, J-V8.70 (REVISED) and §12's item-110 list. V11's half is X19. |

**Found in passing and fixed (the intake rule).** In V08 §3.11, the custom kinds' `economicWeight` and `criticality`
numbers were "own values, calibratable" and had no table: a hard-coded universal (item 23) of the same class as
SCC-R2C-1. They now form a dossier row set, `customWeights`, in V08 §2.6, with the same flag (J-V8.108). §3.11 cites it,
and it is added to §1b's row-set row and §1b's input list, to BCR-V8-10's list and to T-V8-18's totality clause. V11's
row 63 gaining the name is X19. In V11's text, `siting.web.chainStatus` holds `sustained` 0.9 (J-V11.52), so X2 is
CLOSED and §2.6's `chainStatus` row cites it.

**New rows.** J-V8.107 – J-V8.109 are new, and J-V8.26, J-V8.70 and J-V8.106 are REVISED. There is no new bar: T-V8-18,
T-V8-38 and T-V8-47 are edited. §12 has a new continuation paragraph. In §13, the intro is updated, X2 and X18 are
closed, and two hand-offs are added. X19 (V11) covers `elevated.landmarkMinSignificance` and `customWeights` in row 63.
X20 (V09) covers SR2-23's `list(key)` slot shape, V9 §4.10's re-list and T-V9-28's clause. Effort is unchanged:
a cache in the handler and one table fit SF4's and SF6's ranges (PLAUSIBLE). Counts now are 109 J-V8, 32 BCR-V8
(BCR-V8-9 withdrawn), 47 T-V8 and 5 owner questions.

**For the siblings (no edit made in their files).** V09: SR2-23, as X20 states it. V11 (reconcile-V11-r3's continuation,
running): SCC-R2C-10's setting, and `customWeights` in row 63's list with `calibratable: false`. V12: SCC-R2C-4's drop of
"volume 8's §2.6 own values" from the default line now matches V08's header, and no V08 milestone names a register
entry.

## Reconciliation round 4 — continuation (volumes/reconcile-V08-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r4; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a different brief from the one its 07:32 landing covered; that landing's SR3-06 is not in
this brief and stays as written. The two new issues are **both FIXED**, 0 ruled invalid, 0 left on the fix list:
SR3-13 (minor), from `docs/volumes/critique/seam-surfaces-r3.md` §9 (its continuation of 11:06), and SCC-R3C-11
(minor), from `docs/volumes/critique/seam-content-calibration-r3.md` §6.2 (its continuation of 11:18). SCC-R3C-11 asks
for a subset of SR3-13 (a) and (b), and the two were applied as one change.

| issue | what changed (where) |
|---|---|
| SR3-13 (a), SCC-R3C-11 | V08 §13: X19 is **CLOSED**. It cites V11 §3.24.2's `elevated.landmarkMinSignificance` (calibratable, V12 §3.11's `raisedWays` settings line) and V11 §3.1 row 63's `customWeights` (non-calibratable like the row's others); reconcile-V11-r3's continuation landed 10:48. X20 is **CLOSED**. It cites V9 §2.2's `list(key)`, §4.10's re-list, T-V9-28's View-as clause and XV-V9-29 met; reconcile-V09-r3's continuation landed 10:48. §13's opening "and X19 (V11) and X20 (V09) are added" now continues "(both since closed; seam-surfaces-r3 SR3-13)". |
| SR3-13 (b), SCC-R3C-11 | V08 §12: the round-3 continuation's sentence on X19 and X20 now says they were PLAUSIBLE when written and are CONFIRMED, with both landing times. A new paragraph, "Added by reconciliation round 4's continuation", holds what was read and where. |
| SR3-13 (c) | V08 §3.1 step 7 (b): the answer cache's head-move drop now names its source: "the head move read from the `doc.changed` `ApiEvent` of the handler's one `subscribe(h, …)` on the frame's document (§11.2), registered at each `doc.load` and released at `close` and `switchTo` — firing `onChange` then, so the shell lists again". "The handler keeps no subscription of its own" now reads "no key subscription of its own (V9 §2.2)". T-V8-47 gains "and exactly one `subscribe` on the loaded document", released at `switchTo` with a fresh one at the next `doc.load`. It also gains a behavioural clause: a commit that renames a named place, and an applied tail that raises a named place's knowledge tier above the listed key, each fire `onChange`, and the next `list` names the place by its new name or not at all. This is the failure the seam describes. The same rule is carried into §1b's two rows (the bridge handler's inputs and hook, and the `historyLines` producer) and §2.7's lifecycle row (read, and regenerate). New J-V8.110. |
| SR3-13 (d) | V08 §12: the round-3 continuation's sentence on V09's `epoch` row lines keeps V09's text CONFIRMED and adds "the field itself PLAUSIBLE until volume 6 writes it (seam-surfaces-r3 SR3-10)". Volume 6 wrote the field before this lane edited: reconcile-V06-r4's continuation landed 11:39, with V6 §2.10's `EpochReport.raised.suppressedFired: { removal; week }[]`, V6 §3.19.3 (2), T-V6-58 and J-V6.120, and its X44 asks this volume to close X21. So §13 gains X21 (V06) as SR3-13 (d) states it, and X21 is **opened and closed** in this lane, as X16 was in round 3. The new §12 paragraph confirms the field. V08 §4.6 item 3 and T-V8-45 now cite V6 §2.10 as the producer. |

**Found in passing and fixed (the intake rule).** J-V8.106's REVISED tail said "the handler keeps no subscription". That
is the same defect as SR3-13 (c), so it now reads "no key subscription (V9 §2.2) … its one `subscribe` on the document
reads head moves for its answer cache only (J-V8.110)". §12's new paragraph records one point as PLAUSIBLE: that §11.2's
`doc.changed` event fires for an applied tail as it does for a local commit. The base's `subscribe` row lists the event
without saying which commits raise it. V10 §3.11's staleness watch reads it the same way (a host's dossier event,
another client's edit), and T-V8-47's new clause measures it.

**New rows.** J-V8.110 is new, and J-V8.106 is edited in its REVISED tail. There is no new bar: T-V8-45 and T-V8-47 are
widened. In §13, X19 and X20 are closed and X21 is added and closed. Effort is unchanged, since one `subscribe` and its
release fit SF6's range. Counts now are 110 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8 and 5 owner questions. No
base change request is needed, because §11.2's `subscribe` is used as the base states it.

**For the siblings (no edit made in their files).** V06: X44's request is met here (X21 closed, §12 CONFIRMED). V09:
XV-V9-28's second reader (V08 §4.6 item 3) now cites V6 §2.10, which is SR3-12 (b)'s pair. V9 §2.2's "keeping no View-as
state or key subscription of its own" reads as V08 §3.1 step 7 (b) now does.

## Reconciliation round 5 (volumes/reconcile-V08-r5, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r5; covered by the whole-design retrovalidation (J84).

Reconciled in place against the four seam issues owned by this volume in `docs/volumes/critique/seam-settlements-r4.md`
(SR4-06, SR4-07, SR4-12) and `docs/volumes/critique/seam-surfaces-r4.md` (SR4-06), all minor: **4 FIXED**, 0 ruled
invalid, 0 left on the fix list. The two files number their findings separately, so "SR4-06 (settlements)" and "SR4-06
(surfaces)" are two issues.

| issue | what changed (where) |
|---|---|
| SR4-06 (settlements) | V08 §3.5.1 (c): after "the greater's building" the rule reads "— save a lesser that is a pin record, which V11 §3.12's row keeps as a pin of the greater's plot: `parish_church` over `wayside_shrine` binds the shrine's key to the churchyard `cross` pin, laid by VS8 at a village rung (V07 §2.4, §3.10; seam-settlements-r4 SR4-01), while at a base rung, where no churchyard cross is laid, it aliases the church building as above". It adds that the target is chosen where the merge is first read and kept across a later rung change (J-V8.111). T-V8-46's VH clauses gain SR4-01's hamlet fixture: the shrine record's key bound to one `cross` pin in the churchyard and aliased on no building. They also gain the base-rung counterpart, a `town-1` mutation whose shrine key aliases the church building. |
| SR4-07 | V08 §4.6: `unmapped_kind`'s `class` arg reads "the display label (§9.5) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (the `villageForm`, the archetype's `village` cell, or the tag fallback), or the pin kind its cell names — read after the fold". `custom_resolved`'s `class` cites that row and names the `mercantile-market` case (the market cross, not the `market_hall`). V08 §3.5 step 5 (d)–(e) and §3.6 (4) now write `unmapped_kind` after the fold, as `custom_resolved` already was: after the dry run at an absorb, after `generate` at creation, and from the loaded document's state for an offer answered `unchanged`. This happens before `notes` and `notesCleared` are computed, so a note whose built class changes is cleared and written anew (J-V8.112). §1b's `PortNote` row and §2.7's lifecycle row say the same. T-V8-46 gains a hamlet fixture, off any through road, whose unmapped `lodging` kind's note names `v.alehouse`, and a clause for T-V7-21's `mercantile-market` record, whose `custom_resolved` note names the market cross. |
| SR4-12 | V08 §1b's row for `DossierInstitution.step`, `.lesser`, `.popQualifier` and the ladder merge: the consumer cell adds "at village rungs V07's readings — V07 §2.4's range rows (`rules.ladders.ranges`), DR9's members and V07 §3.10's QUARTER end claim" (the section signs qualified by volume, this volume's convention). It also adds the pin lesser's churchyard `cross` from SR4-06 (settlements). |
| SR4-06 (surfaces) | V08 §13: X11 (V10, V06) is **CLOSED**, citing V10 §3.9's `info.raised.*` rows with `info.raised.suppressed` as one key (CVR-V10-14's V08 part **Met**) and V06's chronicle `raisedWay` entries (W19; V6 §3.15.1) drawn as V9 §4.10's `epoch` rows. X12 (V09) is **CLOSED**, citing V9 §4.9's sentence on `host.*` keys, V9 §5.12's `host.locked` and T-V9-15 (SR2-18, V09's round 2). §13's opening names both closures under this round. Each citation was read in the live text (V10 0edd1635…, V09 f16fc374…, V06 1d669d79…). |

**New rows.** J-V8.111 and J-V8.112. §13 gains X22 (V07, V11), open until reconcile-V07-r5 and reconcile-V11-r5 land
with SR4-01, SR4-02 and SR4-08. §12 gains the paragraph "Added by reconciliation round 5". Its one PLAUSIBLE point
is that V07 §3.10 lays the churchyard `cross` and V11 §3.11–§3.12 read as SR4-01 and SR4-02 require. Those lanes,
reconcile-V07-r5 and reconcile-V11-r5, were running when this was written, and T-V8-46's hamlet clause would refute the
rule if they land otherwise. No bar is new: T-V8-46 is widened. No base change request is needed. Counts now are 112
J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8 and 5 owner questions. Effort is unchanged: the note's later write and the
pin-lesser branch fit SF3's range.

**For the siblings (no edit made in their files).** V07 (reconcile-V07-r5): SR4-01's rule is the producer this volume's
pin-lesser branch binds to, and SR4-08's step 4 can cite V08 §4.6's `unmapped_kind` row as it now reads. V11
(reconcile-V11-r5): SR4-02 (b)'s "at a base rung the shrine record's key aliases the church, V08 §3.5.1 (c)" matches
this volume's text.

## Reconciliation round 6 (volumes/reconcile-V08-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r6; covered by the whole-design retrovalidation (J84).

Reconciled in place against the four seam issues owned by this volume in `docs/volumes/critique/seam-settlements-r5.md`
(SR5-01, major; SR5-06, SR5-07, SR5-08, minors): **4 FIXED**, 0 ruled invalid, 0 left on the fix list.

| issue | what changed (where) |
|---|---|
| SR5-01 | V08 §3.5.1 (c) gains *A pair that meets over time* in three cases. (1) The greater's thing is the lesser's — every COUNT, QUARTER, GUILD and SIZE step and the REPLACEMENT rows whose V11 §3.12 reading keeps it (`graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`, `mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, and `cathedral_10_000_only` over `parish_church`): the old re-key, unchanged. (2) A `@none` or `@office` lesser re-binds nothing; its key aliases the greater as at a first reading. (3) Every other REPLACEMENT greater is placed new in the absorb or epoch that brings it — a building by DR9's `assign`, at a village rung through V07 §3.12 *Records at a village epoch* item 4; a `@wall` greater by the fortification path, at a village rung V07 §3.11's palisade REPLACEMENT — and the lesser's key binds as at a first reading by one `rebind`: an alias on the fish market's hall (the fishmonger's shop keeping its use, unbound), the churchyard `cross` at a village rung or an alias on the church at a base rung (the old roadside pin standing, unbound), an alias on the enceinte the fortification path yields (no binding on a superseded palisade). (c)'s pin-lesser branch reads "laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records` at an epoch or an absorb", and its first reading includes the absorb or epoch that brings the pair over time. (d): a promotion receipt keeps the record's one key (F15; the line keeps the old `catalogId`); in case (3) the greater is placed new under it, the key's row re-pointed to it and the lesser's former thing left standing, unbound, a kept pin (the churchyard `cross`) laid for the record with no binding row of its own (J-V8.114); a lesser leaving the list as its greater arrives is read by the same three cases. The diff table's institution row (added greater; the upgrade receipt) says the same. §2.3's binding-row life, §1b's ladder row (V07's item 4, the fortification path, V6 §3.9.11) and `ladder_promoted`'s words ("… and the map now follows the two as one record") follow. T-V8-44's promotion clause is split by case; T-V8-46's VH clauses gain the receipt-promoted shrine hamlet (one `v.parish_church` on the record's key, one churchyard `cross` laid for it with no binding row, the roadside shrine unbound), the no-receipt shrine-to-church hamlet (the shrine's key on the cross), the fish-market village (the market's key on one rim hall, the fishmonger's its alias), the palisade-to-town-walls village and a `town-1` hedge-wizard promotion (the house re-bound, no second building). J-V8.111 amended; J-V8.113, J-V8.114 new. |
| SR5-06 | V08 §3.6 (5)'s `assign` parenthesis reads "(§7.7 One path: placed by S10b's `dossier` request, the least-disruption order — at a rung of a product that declares a records placement, that placement first, V6 §2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*)". The events the port emits do not change. |
| SR5-07 | V08 §4.6's `unmapped_kind` `class` cell reads "the `label` cell (V11 §2.3, BCR-V9-8; SR5-03) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (… the tag fallback, whose `market` entry names V11's `market` class, the open space's market) — or, for a pin kind a cell names, the pin kind's word in the legend's symbol key (§9.5, generated from the registry, O12 d); read after the fold"; `custom_resolved` cites it (the market cross by its symbol-key word); §1b's two `PortNote` rows name the words' producers; T-V8-46 reads "`v.alehouse`'s `label` cell" and "the market cross by its symbol-key word". J-V8.115 new. |
| SR5-08 | V08 §13's X22 is **CLOSED**, citing V07 §3.10's pin-record rule, V07 §3.11 step 4, V11 §3.11's `@pin:<kind>` reading and V11 §3.12's `parish_church` row (reconcile-V11-r5 landed 12:51, reconcile-V07-r5 13:07), read live at 14:06; V08 §12's round-5 PLAUSIBLE sentence moves to CONFIRMED, dated, with the same citations. |

**Beyond the seam's text (vetoable, J-V8.113 and J-V8.114).** Two refinements go past the required change as written.
First, `cathedral_10_000_only` over `parish_church` joins the seam's four "keeps the lesser's thing" rows, and QUARTER
joins COUNT, GUILD and SIZE. V11's reading of the cathedral row is "the lesser absorbed", V6 §3.9.11 converts the church
in place with its crypt, and the seam's own census (critique §4 (C)) reads the cathedral as absorbing its lessers. A
quarter's members are the lesser's buildings. Second, the seam's receipt fixture says the promoted record's key binds the
churchyard `cross`. A receipt keeps one key, and that key must bind the church, or the church's later state (a ruin, a
closure, **Show**) would land on the cross. So the key binds the church, and the cross is laid for the record with no
binding row of its own. Where two keys meet, the shrine's key binds the cross as the seam asks, and T-V8-46 tests both.

**New rows.** J-V8.113, J-V8.114 and J-V8.115; J-V8.111 amended in place. §13 closes X22 and adds X23 (V07: the
one-key reading in item 4 and T-V7-13), X24 (V06: V6 §3.9.11's exception named by V08's cases, not by template family)
and X25 (V11: the class `label` cell, SR5-03, present in that running lane's checkpointed text). The hand-offs to V07
and V06 were written to `docs/lane-events.log` at 14:06; reconcile-V07-r6 had landed at 14:05, so X23 waits for V07's
next lane, and V07's item 4 and T-V7-13 meanwhile read "the shrine record's key binding it" — true where two keys meet,
and refuted for the receipt case by T-V8-46. §12 closes the round-5 PLAUSIBLE point and gains "Added by reconciliation round 6". No
bar is new: T-V8-44 and T-V8-46 are widened. No base change request is needed, since F15 already keeps the row. Counts
now are 115 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8 and 5 owner questions. Effort is unchanged: the three cases
are rows of the digest's ladder step and the placement calls V07 and V06 already own, inside SF3's range.

## Finalization (volumes/_finalize, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

The finalization closed X23, X24 and X25 (their owners' texts now hold them: V07 by SR6-01, V06 by SR6-02, applied by the finalization; V11 landed at 14:25 — seam-settlements-r6 SR6-05 (a)) and fixed two minors of seam-settlements-r6: **SR6-06** — three message rows `host.pinKind.shrine`, `host.pinKind.well` and `host.pinKind.market_cross` (*The pin kinds' words*, after §4.6's table) are the producer of a pin kind's words in a note's `class` argument (the `unmapped_kind` and `custom_resolved` cells, §1b's two rows, T-V8-46, J-V8.115); **SR6-07** — both templates read "built like any {class}", with no article before the slot, and T-V8-46 checks the rendered sentence. Left on the fix list: SR6-05 (b)'s §12 sentence and seam-surfaces-r6 SR6-04 (docs/volumes/INDEX.md §7). **CONFIRMED** by execution: every edit an exact-match replacement with its count asserted (the `unmapped_kind` cell replaced on its own row, the round-5 fix table's quotation of the old words left as history).
