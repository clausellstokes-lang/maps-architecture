# SettlementForge world, site, encounter and hydrology architecture — the refined brief (contract-first; 2026-10-16, revised the same day)

Status: the owner's brief of 2026-10-16 as refined by the session and accepted by the owner ("yes please fold these into
the architecture"; `docs/AMENDMENTS-2026-10-16j.md` items 131–140). It supersedes the first draft of the same file
(the fifteen-row checklist). Nothing in `plat/` reads it. It charters volumes 13 and 14 and binds M0's close by its
Part A.

## 0 Why this brief exists now

M0 closes in days and its exported kernel API freezes at its close until M1's API pass. The world, site, encounter and
hydrology architecture is designed after M0, but the kernel and the model it stands on are being committed now. So the
brief has two jobs: say what M0 must have, and must not foreclose, as an executable gate; and charter the later design
as volumes on the existing base rather than a second architecture beside it.

## 1 Premises (corrected from the original brief)

1. This repository is PLAT, the map module. SettlementForge is the host, and it exists at
   `clausellstokes-lang/settlement-engine`: the simulator, the dossier, the world-pulse clock, a vendored FMG fork, a
   frozen spatial digest, and a town-map placeholder. The dossier is the map's only fixed truth and the flow is one way
   (item 20). Every "SettlementForge" in the original brief reads as host, map module or both.
2. The proposals the original brief asks to reconcile now exist as the three columns of its decision matrix:
   `docs/design/proposal-world-native.md`, `proposal-sites-encounters.md`, `proposal-hydrology-water-state.md`. Their
   matrix rows carry the reconciled decision and reason.
3. The clean-room rule governs the research. The FMG survey is done (`research/fmg/`); MFCG and FTG research is done
   and cited; the site-generator survey (Dungeon Alchemist, DunGen, Donjon, Dungeon Scrawl, RPG Map Editor) is
   observation-only research-seat work still to run.
4. One classification vocabulary: CONFIRMED, PLAUSIBLE, owner question.
5. The kernel's planar integer-centimetre scope is a premise: world scale is a second representation in metres on a
   raster plus a graph, with a placement transform; the kernel is the materializer's geometry from settlement through
   interior and site scale.

## 2 The identity (ruled under the delegation, vetoable; item 131 (b))

A **persistent world-state materializer with scale-partitioned representations**: one world state, several
materializers, two coordinate regimes with an explicit transform. The host owns political facts; the map module owns
the world regime and every materialization. Never a collection of generators.

## 3 The two contracts (item 131 (c))

**The world-fact contract.** Every canonical thing — a world, a river, a settlement, a fort, a cave, a sewer, an
ambush — carries: an identity with a namespace; a kind; a placement in a coordinate regime; an elevation against the
datum; a water class now and at construction; knowledge layers (exists, DM knows, players know, players reached,
discoverable); a lifecycle state with its cause; a reason record naming what produced it. Domain-neutral.

**The materializer contract.** Input: a set of world facts plus a context record. Output: arenas, derived facts and
reason records. The current pipeline stages, the site materializers, the encounter crop and the world generator all
fit this signature or do not belong.

The M0 gate is the question "do the kernel and the model satisfy the materializer contract", answered by Part A.

## 4 Part A — the M0 close gate (item 140; before M0 commits)

Kernel-frozen rows (K1–K13) must be resolved before commit or carried to M1's API pass with a reason; model rows are recorded
now and are M1's to change. Every row is "do not foreclose"; where a row can be a test it joins M0's exit suite.

| # | row | test or verification |
|---|---|---|
| K1 | `Layer` codes append-only in digest and block format; no path assumes `'ground'` is the root | append a fourth value in a test registry; every golden digest byte-identical |
| K2 | `PlatKey.part` round-trips with independent frames and lattice specs; parts not assumed dense | encode and decode a two-part arena; resolve every reference form per part |
| K3 | `Frame` purely local; no absolute position in any digest | read `num/` and `digest/` |
| K4 | reference forms resolved against a separately supplied key | read `types/refs.ts`, the façade |
| K5 | role registry append-only without digest change; `LINEAR_PARTS` extensible per transaction | append a role; goldens unchanged |
| K6 | concern and stage registries append-only without renumbering; a new stream independent of every existing one | append; stream outputs unchanged |
| K7 | a rank function can order stages from two registries | read `tx/`, the façade |
| K8 | encode-decode digest-equal for every arena kind including parts ≥ 1; `compactSlots` deterministic | the `reattach` golden extended to parts |
| K9 | the transient-arena stub's designed contract admits an arena with no owner document | read §3.4, `facade/notBuilt.ts` |
| K10 | every persisted block names every version it depends on | read `io/` |
| K11 | no algorithm branches on a domain role beyond the documented defaults | grep |
| K12 | the commit journal records stage, concern and inputs read, so a reason record can be reconstructed | read `tx/`, `CommitRecord` |
| K13 | no digest, reference form, invariant or kernel operation reads or assumes an elevation; `Frame` and the lattice are two-dimensional only (2.5D is a projection; z never enters the kernel) | grep for any z-like field; read `num/`, `digest/`, `types/refs.ts` |
| M1 | a namespace segment in the address form (or an M1 item) | read `model/src/identity` |
| M2 | the carve delta or pre-carve heightfield recoverable; water surfaces separable from the heightfield | read `site/src/hydro/carve.ts`, `surface.ts`, `terrain/types.ts` |
| M3 | the datum behind one accessor | read `site/src/terrain` |
| M4 | the water table behind one function | the readers named at §2.4 and V04 |
| M5 | S1's terrain and water parameters as one input record (the charter's landing) | read S1's entry |
| M6 | a placement record reserved per arena set | model |
| M7 | an anchor record reserved (address, site reference, knowledge flag) | model |
| M8 | a reason record reserved per generated fact | model |
| M9 | z-completeness: every drawable record kind declares a base elevation and a top, or a surface, or is listed flat with a reason | read the model's record types; the gap list is the finding |
| M10 | vertical-link records (stair, shaft, ramp, trapdoor, access) carry an elevation at both ends | model, V03/V04 records |
| M11 | the projection and vertical exaggeration are view state outside the document hash; the style store's schema admits a projection family | §2.9 view state, §8 styles |

Deliverable: `docs/build/checks/M0-world-sites-gate.md`, every row CONFIRMED or PLAUSIBLE with evidence, signed in the
clean-room ledger. M0 does not close without it. No row is closed by changing the design to match the code without a
choices row.

## 5 Part B — the audit (in parallel with Part A)

The original brief's §1, §3, §5, §15, §16 against the design and the code together, one finding per item (CONFIRMED
present; CONFIRMED designed, not built, with the milestone; PLAUSIBLE gap with the smallest addition; owner question),
to `docs/validation/world-sites/audit.md`. It must also cover: the village ladder and hinterland (V07, §4.9); the sky
layer as the precedent for a disconnected arena with its own terrain (V05); the evolution engine's epochs and scars
(V06); the port's two tiers of fact (§7.7, V08); knowledge admission (§9.2, §11.2); the crisis looks as the existing
view-only transient (item 122); the frozen-fixture and budget-tier discipline (§12, §13).

## 6 Part C — rulings under the delegation and the owner questions that remain

Ruled (vetoable): the boundary option (a) — the host owns political facts, the map module owns the world regime, the
host's capture of the reference generator is replaced by the world port, the host's frozen spatial digest staying its
engine state, built from the port's canon at its receipted canonize — every new campaign's birth canon, or a re-canonize — (refined 2026-10-17, `docs/AMENDMENTS-2026-10-17m.md`); planar bounded worlds in metres now; tectonics and erosion over time built once at generation as the formation op
and baked, never re-run (the owner's rule F1, 2026-10-17, superseding this ruling's first two clauses;
`docs/AMENDMENTS-2026-10-23r.md` item 926; V13 §3.2.1), fluid dynamics and a sphere not built; no second FMG fork and no embedding of its code; FMG maps imported once as
data; Watabou's boundary kept as the boundary between the world regime and the settlement map; time of day not a
parameter; transient encounters derived, never random; who keeps a gate under the sway — the host's intermediary
settlement until the sway has passed its soak, the crossing holder then offered as a per-gate policy the host may adopt
(J385; V13 §11); the map's lenses over the host's simulated systems — plague first, then the sway (territory) and
patrols, trade and populations, religion, prosperity and alignment — one mechanism, no invented fact, a lens with
nothing moving shown still and never hidden, no player view of alignment, holy and cult sites only as DM-placed sites (J384; V13 §5.8, §5.9), the
trade lens drawing each settlement's production, needs, exports, imports and services and its food coverage, and the
religion lens the host's local and global deity rankings and its piety (J380; V13 §5.9); a world from this module
canonized at the birth of every new campaign, whatever the campaign's tier — the product ruling the host implements,
its premium canonize entitlement never gating it (J387), which gives every new campaign on such a world the canon
SettlementForge today sells only as its entitled one-shot "Map geography" action —, a settlement
founded after the birth canon joining it by an additive re-canonize SettlementForge runs itself between two of its
advances, at the first chance after the founding — a change to SettlementForge, whose canonize today runs only when
the DM asks — covering only the new settlement, the seat territories its founding redraws and the water links on the
sea or lake it reaches, SettlementForge keeping its own rules and every other settlement's ports and circles as the
canon had them, a new version of the canon with its receipt, any settlement whose travel band it changes reported,
never silently, which that entitlement never gates either (J388: without it, every settlement founded after the
birth would stay unmapped to the simulation's canon-gated lanes and to the lenses until the DM re-mapped the whole
realm by the premium act), a re-canonize that shifts other geometry and retcons staying the premium DM's act, and a host fight verdict alone moving a march line while the
host's military reading is dark (J386; V13 §8.5, §11).
Owner questions that remain: whether SettlementForge's existing
campaigns are offered an elective rebase (the transition otherwise ruled: every frozen digest kept, the import on
request, a legacy world view with no write; V13 §8.5, §11 Q1); whether the realm map's replacement is part of the map
module's post-launch disposition (V13 §11 Q2); (the world canon's place outside J86's door 1 — V13 §11 Q4 — was ruled under the owner's delegation of 2026-10-23, J396 (1): outside, the door closed for frame geometry, H22's birth canon waiting on it no longer); the audit's
unknowns about the host (the modified bundle source, the missing design documents, the production frame size).

## 7 Part D — the design volumes (after M0 closes)

**Volume 13, World and hydrology** and **Volume 14, Sites and encounters**, to the volume template (§0 in plain words,
§1 scope and base hooks, §1b wiring, §2 data model, §3 generation, §4 editing, §5 rendering and exports, §6 budgets,
§7 tests, §8 build plan, §9 decisions, §10 base change requests, §11 owner questions, §12 CONFIRMED versus PLAUSIBLE,
§13 fix list, integration notes), V14 consuming V13's hooks, the charter shared between them. The base changes go to
the amendments series (file j's BCR rows and what the volumes add), applied by the coherence pass. The three proposals
are the volumes' sources; the threads of 2026-10-16 are placed as follows.

- **V13 world** (`proposal-world-native.md` §3–§9): frame, units, placement; terrain rasters and the recipe; water
  surfaces as dated records; hydrology at two scales; climate with pole inputs and the seasonal curve; biomes;
  distance fields, suitability, resources; routes under the host's cost law; political materialization; siting and
  the settlement-map record; labels; identity, determinism, editing; the charter; the host changes; the import
  adapter; export compatibility; rendering and level of detail.
- **V13 hydrology and water state** (`proposal-hydrology-water-state.md`): the additions in order; the water class
  test and route classes; surface things; the two edit verbs and the cascade; locks hold geometry, physics decides
  state; explainability.
- **V14 sites and encounters** (`proposal-sites-encounters.md`): one operation, two retention policies, promotion; the
  transient crop; the site card with its two attachment modes and the surface exception; the admissibility table; the
  request record and the complexity vector; composition and topology-first materialization; the history superposition;
  lifecycle, condition transforms and the two deletion verbs; the anchor record, context-dependent icons and the
  knowledge layers; scale and the VTT crop scope with a stable grid origin.
- **Scale coherence** (item 135) as a cross-cutting section of both: three regimes, boundary conditions downward,
  deterministic refinement, edits stored at their scale, per-regime tables and budgets.
- **The decision matrix and the dependency graph** of the original brief's §34–§35, with every arrow labelled and
  owned under the boundary ruling; the ADR of §36 as the volumes' §9.

Forbidden to the volumes: rewriting a mechanism the base builds and tests without a finding against a stated
requirement; a kernel primitive naming a domain; a coordinate regime inside the kernel; a map fact becoming a dossier
fact; complexity as a count; a site required to pass through every state; feature parity with FMG as a goal.

## 8 Part E — acceptance bars ("excellently integratable")

1. A fourth `Layer`, a new role, concern and stage appended; every existing digest byte-identical.
2. A two-part site document round-trips digest-equal and resolves every reference per part.
3. A placement positions an arena set in the world; moving it changes no arena digest.
4. Sea level rises a metre; the heightfield is byte-identical; only surfaces, classes and consequences change, with
   reason records the clerk reads.
5. A river is re-routed from the uncarved ground; the old bed remains as a terrain fact with its cause.
6. A town is regenerated locally around a new site, and a site inside a town, with nothing outside the dirty set
   reshuffled.
7. Two world packages with one site each merge with no address collision; a site's parts are adopted into a settlement
   document keeping every identity and lock.
8. A counterfactual fork is edited, simulated, inspected and discarded; the canonical package is byte-identical.
9. Every dependency arrow has one owner; no map-side write reaches a dossier fact except through the port as a
   derived fact.
10. The clerk answers "why is this here", "what caused this", "what changed" and "what if" for a site, a river, a
    settlement and an encounter from recorded reason chains alone, with a test that fails when a chain is missing.
11. The same click at the same address in the same week returns the same encounter map; its VTT re-export keeps the
    grid origin.
12. A flooded crypt, a drowned ruin and a flooded street are classified by one test, per storey, by share and by
    route, and their classes change under a dated surface without any identity changing.
13. Every one of FMG's eighteen stale-data paths has a test proving the equivalent edit recomputes here.
14. The same document hashes identically under the flat view and every 2.5D projection (isometric, oblique,
    perspective) and under every vertical exaggeration.
15. A pointer in a 2.5D view resolves to the same address as in the flat view at the same model point.
16. Every drawable entity has a base and a top, or a surface, or is listed flat with a reason; the list is empty of
    unexplained entries.
17. An interior draws as per-storey slabs from the same plan the flat view draws, with the model byte-identical.
18. (Bar T, 2026-10-17) The transition for an existing campaign — the capture frozen, the import on request, the
    campaign drawn in the world view — changes no byte of its simulated state; every frozen digest is kept; only an
    elective, receipted rebase moves it (V13 §8.5).

## 9 Order and timing

| when | what | gate |
|---|---|---|
| now, before M0 commits | Part A and Part B in parallel; the site-generator survey as a research lane | `M0-world-sites-gate.md` complete |
| M0 close to M1 API pass | the carried kernel rows become M1 API items; the model rows M1 work | the M1 spec run reads the gate file |
| after M0 | V13 and V14 by the volume workflow with critique and seams; the coherence pass admits file j's BCRs | the coherence pass |
| the first encounter milestone | the in-town transient crop, grid overlay, transient layer, VTT export (works on the viewable town) | bars 11, 13 |
| the first site milestone | the attached kind (a crypt under a church, a cellar complex), then a small fort | bars 2, 6, 10, 12 |
| the 2.5D renderer milestone (after the viewable town) | the projection family, draped terrain, extruded massing, per-storey slabs, cutaway bands, hit testing, the raise-or-lower edit | bars 14–17 |
| the world milestones | W1 terrain, surfaces, hydrology, climate, biomes, suitability, the charter, the port (the canon, the map feed, the recorded inputs); W2 routes on the host's genesis, the seat territory and the sway with patrols, siting stage 2; W3 labels, exports, the adapter (1.114 and 1.152); the lenses (V13's M-W5, after W2): one mechanism and eight lenses, plague first | bars 3, 4, 5, 7 |
| the host's track (V13 §8.5) | now, on the fork: the capture's frame, seed, scale and unit, the export command, the band census, the register rows (H1–H3); with W1: the port and the second builder of its digest (H4–H11); with W2: genesis, the polity facts, the decree law for world edits, the presentation messages (H12–H17), and a native world canonized at birth for every new campaign, whatever its tier — the product ruling the host implements, its premium canonize entitlement never gating it, after the second builder of its digest, the scale stamp and genesis (H5, H7, H12) — V13 §11 Q4, which held it, ruled by delegation on 2026-10-23, J396 (1) — (H22; J386; J387); with the lenses (V13's M-W5): the lens window and the lenses' asks in their build order, plague first (H23–H30); after W3: the capture freeze to a deadline, the elective rebase, then the fork's retirement (H18–H20); the experience pass's asks H36–H46 (J397: a campaign born with the realistic rules applied and its realms named, the birth window, the grace rule, the party observer and the believed rows' ages, a court's beliefs and the integrity register, the headline reader, the readers of the map feed named, `reasonOf` for the host's cause walk, the ambiguity law amended, claims and treaty terms, net force bands), each written as a prompt for a host session in research/sf/host-prompts-2026-10-24.md, with H24, H31 and H32 restated there | Bar T (18) |

## 10 Not in this brief

The original §32's rejections stand. Added: no second architecture document; no second vocabulary; no proprietary
generator code read; no kernel change in M0 beyond a fix the hardening rounds admit; no FMG fork or embedding;
fluid dynamics, a sphere, an economy or military simulation in the map module (tectonics and erosion over time,
excluded here on 2026-10-16, are admitted by the owner's rule F1 of 2026-10-17 as the formation op — run once at
generation and baked, never a simulation that runs on; `docs/AMENDMENTS-2026-10-23r.md` items 926 and 962).
