# SettlementForge world, site and hydrology architecture — the refined brief (DRAFT, 2026-10-16)

Status: a draft refinement of the owner's brief of 2026-10-16, written by the session for the owner's veto. Not yet an
owner instruction. Nothing in `plat/` reads it. It replaces the original brief's single forty-six-section deliverable
with five parts in time order, the first of which must finish before M0 is committed.

## 0 Why this brief exists now

M0 closes in days. M0 is the kernel, the determinism machinery and the spikes; its exported API freezes at its close
and reopens only at M1's API pass (J263 Q1, item 130). The world, site and hydrology architecture will be designed
after M0, but the kernel and the model it is designed on are being committed now. The purpose of this brief is
therefore twofold: first, to say exactly what M0 must have, and must not foreclose, so the later architecture needs no
kernel rewrite; second, to charter that later architecture as a design volume on the existing base rather than as a
second architecture beside it.

The original brief is kept as the statement of intent. Its principles stand. Its premises are corrected in §1.

## 1 Corrections to the original brief's premises

1. **What this repository is.** This repository is PLAT, SettlementForge's map module. SettlementForge is the host.
   The host owns the dossier, the simulator, conditions, calamities, regional pressures, cultures and the world-state
   ledgers. By owner ruling (item 20; "it is one directional") the dossier is the map's only fixed truth, the map never
   writes back and never asks. Every sentence of the original brief that says "SettlementForge" must be read as one of
   "the host", "the map module" or "the two together", and the reading is recorded. Where the brief has the map
   module absorbing a semantic edit into world state (§6) or making sites simulator objects (§19), it reverses the
   ruling; those sections are rewritten in Part D under the boundary decision of Part C.
2. **The proposals to reconcile do not exist in the repository.** No FMG or world-generation proposal, no procedural
   site or dungeon proposal, no persistent-site simulation proposal and no hydrology proposal beyond §4.2 S1 is
   committed here. FMG appears once, as integration hook row G2. The decision matrix of the original §34 has nothing
   in three of its columns until those proposals are written down and committed under `docs/design/`. Part C asks for
   them.
3. **The clean-room rule governs the research.** `plat/CLEAN-ROOM.md` rule 3: no other settlement generator's code is
   read, ported or paraphrased; rule 2: implementer-side seats never open the research tree. The original §2's "read
   source code where available" is a research-seat activity whose findings reach `plat/` only through the design and
   numbers-only files. Azgaar's generator is MIT-licensed and may be read by a research seat; Dungeon Alchemist,
   DunGen, Donjon, Dungeon Scrawl and RPG Map Editor are proprietary and are studied by observation only. The MFCG and
   FTG research is done and confirmed (`research/findings/`, `docs/confidence/`, `docs/improvements/`); it is cited,
   not redone.
4. **One classification vocabulary.** The design uses CONFIRMED versus PLAUSIBLE, choice rows with reasons, and
   owner questions. The original brief's five labels map onto it: CONFIRMED stays CONFIRMED; OBSERVED is CONFIRMED
   with the observation cited; INFERRED and PROPOSED are PLAUSIBLE with the inference or proposal named; UNKNOWN is an
   owner question or an open finding. No second vocabulary is introduced.
5. **The kernel's intended scope is the planar cm lattice inside the range invariant** (|x|, |y| < 2^23 cm, about
   84 km). The original §32 already rejects coordinate assumptions beyond it. World and regional scale therefore
   live in a second representation, in metres, on a raster and a graph, outside the kernel, with an explicit placement
   transform between the two. This is a premise of the design, not a finding to reach.

## 2 Part A — the M0 close gate (before M0 is committed; days)

Each row is checked against the code by a seat that may read `plat/`, and the finding is recorded as CONFIRMED or
PLAUSIBLE with the file and line. A row that fails and can be fixed without an exported-API change is fixed in the
current hardening rounds. A row that needs an API change is written to M1's API pass with its reason, and M0 closes
with the row recorded as carried. Nothing here adds a feature to M0; every row is "do not foreclose".

| # | What the later architecture needs | What to verify now | Where to look |
|---|---|---|---|
| A1 | A site that is not a layer of the town: a fort, cave, mine or ruin with its own frame, placed in the world | `Layer` is a closed union of three (`types/ids.ts:14`); its code is hashed into the level digest and the block format (`digest/levelDigest.ts:772`, `io/format.ts:27`). Verify that `layerCodeOf` is append-only and recorded as such, so a fourth value changes no existing digest, and that no code path assumes `'ground'` is the root of every document | `kernel/src/types/ids.ts`, `io/format.ts`, `digest/`, every `switch` on `Layer` |
| A2 | Disconnected parts of one site; several arenas per site | `PlatKey.part` is carried by the digest, the encoder, the decoder and the index (`io/encode.ts:378`, `io/decode.ts:274`, `index/query.ts:96`); multi-part use is a hook, nothing refused (API §8). Verify that parts ≥ 1 have independent frames and lattice specs and that nothing enumerates parts by assuming they are dense from 0 | `arena/plat.ts`, `io/`, `index/` |
| A3 | An arena placed in a larger coordinate space without re-coordinating its geometry | The kernel has no world placement and must not get one. Verify that `Frame` is purely local (an origin and extents) and that no digest hashes an absolute position outside the frame, so a model-side placement record (world position, bearing) can be added later with no kernel change | `num/` (`Frame`), `digest/` |
| A4 | Vertical relations between arenas (a shaft from a cellar to a cave, a stair between storeys of a site) | These are model records, not kernel geometry. Verify that every persistent reference form (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`) is resolved against a separately supplied `PlatKey` (`resolve(ref, key)`, API §3.5), so a cross-arena link record carries two keys and no reference embeds one | `types/refs.ts`, `facade/` |
| A5 | Persistent addresses that survive a world package, a fork and a merge of two packages | Addresses are `kind + lineage hash + arena prefix` with the arena defaulting to GROUND (`model/src/identity/address.ts:76`). Verify whether the address form has, or can take by append, a document or site namespace segment, so addresses from two sites or two worlds cannot collide. If it cannot, this is an M1 API item, recorded now | `model/src/identity/address.ts`, `lineage.ts`, `mint.ts` |
| A6 | New roles for caves, passages, chambers and site entrances | The role registry is append-only and fixed at load (`arena/roles.json`, `ROLE_REGISTRY_VERSION`). Verify that appending a role changes no existing document's digest and that the `LINEAR_PARTS` table (`tx/tx.ts:418`) can be extended per transaction through `TxEnv.chainParts` without touching the kernel | `arena/registry.ts`, `tx/tx.ts` |
| A7 | New RNG concerns and stages for world, site and hydrology generation | `concerns.json` (93 concerns) and `stages.json` are append-only (C-0020) with generated ids. Verify that appending renumbers nothing and that a stream keyed by a new concern and stage is independent of every existing stream (the determinism bar: unrelated content never reshuffles) | `registry/`, `rng/` |
| A8 | Local regeneration of a site inside a town, and of a town around a site | Kept content is enforced through stage ranks and `rederivesFrom` (`E_KEPT`, API §3.3) with `TxEnv.rankOf` pluggable. Verify that a rank function can order stages from two registries (the town's and a site's) without ambiguity | `tx/`, `facade/` |
| A9 | Counterfactuals: fork a document, edit, inspect, discard or commit | Savepoints are per transaction (`tx/savepoint.ts`); a whole-arena fork is encode → decode. Verify that the round trip is digest-equal (the `reattach` golden equals `fresh`, J371) for every arena kind including parts ≥ 1 and that `compactSlots` is deterministic | `io/`, `tx/savepoint.ts` |
| A10 | Generate first, water state later | The carve writes the riverbed into the height raster itself (`site/src/hydro/carve.ts` header). Verify that the pre-carve heightfield, or the carve delta, remains recoverable and that the water surface elevation of every water body is a field separate from the heightfield, so sea level and lake levels can change without re-terraining and a river can be re-routed from the uncarved ground. If the base heightfield is overwritten in place, record it as an M1 item: keep the delta | `site/src/hydro/carve.ts`, `surface.ts`, `terrain/types.ts`, `water/` |
| A11 | One world datum, many frames | `Terrain.datumCm` is one per document, "0 when absent" (`site/src/terrain/types.ts:76`). Verify that the datum is read only through one accessor, so it can later be derived from a world datum plus the frame's placement without touching the stages that read heights | `site/src/terrain/`, `hydro/`, `water/` |
| A12 | Groundwater as a derived field | The water table is the nearest water body's surface elevation (§2.4). Verify that the cellar, crypt and underground rules read it through one function with a documented signature, so a derived groundwater field can replace the lookup without touching the rules | the readers named at ARCHITECTURE §2.4 and V04 |
| A13 | Transient spaces: encounters, battle maps, hypothetical geometry | `geom.transientArena` is a stub staged to M6-P (API §8). Verify that the stub's contract as designed (§3.4 transient arenas) admits an arena with no owner document, since an encounter may stand on no town | `facade/notBuilt.ts`, ARCHITECTURE §3.4 |
| A14 | Versioning for packages, forks and merges | `ARENA_BLOCK_FORMAT`, `ROLE_REGISTRY_VERSION`, `ENGINE_VERSION`, registry versions exist (API §10). Verify that every persisted block names every version it depends on, so a package can state its generator version table in one place | `io/`, `digest/` |
| A15 | Nothing in the kernel names a domain | API §1 states it; verify by grep that no algorithm branches on a role name other than the documented defaults, and list the defaults as the known host vocabulary | `kernel/src/` |

The gate's deliverable is one file, `docs/build/checks/M0-world-sites-gate.md`, fifteen rows, each CONFIRMED or PLAUSIBLE
with its evidence, each failure marked fixed-in-M0 or carried-to-M1, signed in the clean-room ledger. M0 does not
close until every row is recorded. No row may be closed by changing the design to match the code without a choice row.

## 3 Part B — the audit (in parallel with Part A; days)

The original brief's §1, §3, §5, §15 and §16, run against the design and the code together, with the vocabulary of
§1.4 above. Output: `docs/validation/world-sites/audit.md`, one finding per item, each one of:

- CONFIRMED present: the design has it and the code builds it (cite both);
- CONFIRMED designed, not built: the design has it, the build stages it (cite the milestone);
- PLAUSIBLE gap: neither has it, and a sentence on the smallest addition;
- owner question.

Items the audit must cover beyond the original brief's lists, because they exist and the brief omitted them: the
village ladder and its landscape (V07), the hinterland (§4.9), the sky layer as the existing precedent for a
disconnected arena with its own terrain (V05), the evolution engine's epochs and scars as the existing history model
(V06), the port's two tiers of fact and `factTier` (§7.7, V08), knowledge admission at the viewer's key (§9.2, §11.2),
the crisis looks as the existing view-only transient (item 122), and the frozen-fixture and budget-tier test discipline
(§12, §13).

## 4 Part C — the decisions only the owner can take (before Part D starts)

1. **The boundary.** Which of these is the product: (a) the host grows a world layer (terrain, hydrology, territories,
   routes, sites as dossier records) and the map module materializes it, keeping the one-way flow; (b) the map module
   absorbs world generation and site simulation, and the one-way rulings are reopened for that scope; (c) a third
   component, a world module, sits beside both, owns world canonical state, and feeds both the host's simulator and the
   map module. The session's recommendation is (a) for canonical state with (c) as its implementation home if the
   host cannot carry it, and never (b). The reasons: (b) doubles the scope, makes the map a second source of truth,
   and contradicts items 20 and 125; (a) keeps every existing ruling and makes every site a dossier fact with a map.
2. **The missing proposals.** The FMG/world proposal, the site/dungeon proposal, the persistent-site simulation proposal
   and the hydrology proposal are written down, each as one file under `docs/design/`, in the owner's words or from
   the owner's notes, before the decision matrix is drawn. A proposal that exists only in conversation is not a
   column.
3. **Research seats and sources.** Confirm that Azgaar's generator may be read by a research seat under rule 1, that
   the proprietary site generators are observation-only, and name the capture discipline for them (the same as
   `captures/` for MFCG and FTG, kept local).
4. **The identity of the thing.** Accept or veto the session's answer to the original §4: a persistent world-state
   materializer with scale-partitioned representations, one world state, several materializers, two coordinate regimes
   with an explicit placement transform. The kernel is the materializer's geometry for settlement through interior and
   site scales; the world regime is metres on a raster and a graph.

## 5 Part D — the design volume (after M0 closes; weeks)

The original brief's §7 through §36 become **volume 13, World and sites**, written to the existing volume template
(`docs/volumes/_integrate.md`): §0 in plain words, §1 scope and base hooks consumed, §1b wiring table, §2 data model,
§3 generation, §4 editing, §5 rendering, §6 budgets, §7 tests, §8 build plan, §9 decisions, §10 base change requests,
§11 owner questions, §12 CONFIRMED versus PLAUSIBLE, §13 fix list, integration notes. Where the volume cannot be one,
it is two: V13 world and hydrology, V14 sites and encounters, with V14 consuming V13's hooks. The base changes go to
an amendments file in the existing series, applied by the coherence pass, never by editing `ARCHITECTURE.md` in place.

The content requirements of the original brief are kept whole and placed as follows.

- **World model (orig. §8, §13–§18):** the world regime; terrain and elevation in metres against one world datum; sea
  level as a world fact with a history; regional hydrology (watersheds, base rivers, lakes) as world facts that the
  existing local hydrology refines inside a frame; groundwater as a derived field from terrain, nearest water surface
  and geology, never a simulation; absolute elevation versus local depth kept as two fields; historical water states as
  dated world facts so a present site can carry evidence of a past one.
- **Generate first, water state later (orig. §14), refined:** a built space obeys the water state of its construction
  epoch (the existing cellar and crypt rules stand); a natural or ancient space is generated from its causes and
  classified against the current state; every space carries both its construction-time and current water class.
- **Settlement (orig. §9):** the existing pipeline, unchanged in mechanism; the volume names which of its inputs become
  world facts (terrain, water, routes, resources, territory) and which stay settlement-local (demand, prosperity
  field, siting).
- **Sites (orig. §10–§13, §19):** one site model with policies per kind; the lifecycle as a state set with explicit
  causes, not a mandatory sequence; the complexity model as named dimensions with units, never a slider; context as a
  typed input record; a ruin as the preserved traces of its former generation, by the evolution engine's existing
  epoch and scar mechanism extended to sites.
- **Knowledge (orig. §20):** world existence, host knowledge, DM knowledge, each player's knowledge and physical
  accessibility as separate layers, built on the existing `knownTo` and admission function.
- **Editing, semantic edits, counterfactuals (orig. §21–§23):** the existing lock and lifecycle model; a semantic edit
  is a proposal to the owner of the fact it changes (the host, through the port, for dossier facts; the map for its
  own tier), never a silent promotion; a counterfactual is a forked package that is discarded or committed whole.
- **Rendering, labels, determinism, persistence, packages, history, performance, clerk, explainability (orig. §24–§31):**
  the existing sections extended, each with its reason chain stated as data the clerk reads, never infers.
- **The decision matrix (orig. §34)** with its four columns filled from the committed proposals of Part C.
- **The dependency graph (orig. §35)** with every arrow labelled canonical, derived, procedural, event-driven, cached,
  reversible or persistent, and each arrow's owner (host, world module, map module) named under Part C's decision.
- **The ADR (orig. §36)** as the volume's §9, in the existing "chose X over Y because Z" form, vetoable.

What the volume is forbidden to do: rewrite a mechanism the base builds and tests without a finding that it fails a
stated requirement; introduce a kernel primitive that names a domain; introduce a coordinate regime inside the kernel;
make a map fact a dossier fact; define complexity as a count; require a site to pass through every lifecycle state.

## 6 Part E — what "excellently integratable" means, as acceptance bars

The architecture is integratable when every statement below holds. Each is a test or a reviewable record, not a claim.

1. A fourth `Layer` value and a new role, concern and stage can be appended, and every existing document's digest is
   byte-identical before and after.
2. A site document with two parts and its own frame round-trips through encode and decode digest-equal, and resolves
   every reference form against the right part.
3. A placement record positions an arena in the world regime, and moving the placement changes no arena digest.
4. Sea level changes by a metre and the heightfield is byte-identical; only water surfaces, water classes and their
   consequences change, and the change is explained by a reason chain the clerk can read.
5. A river is re-routed from the uncarved ground; the old bed remains as a terrain fact with its cause.
6. A town is regenerated locally around a new site and nothing outside the dirty set reshuffles; a site is regenerated
   locally inside a town with the same guarantee.
7. Two world packages with one site each are merged, and no address collides.
8. A counterfactual fork is edited, simulated, inspected and discarded, and the canonical package is byte-identical.
9. Every arrow of the dependency graph has one owner, and no map-side write reaches a dossier fact except through the
   port as a proposal.
10. The clerk answers "why is this here", "what caused this", "what changed" and "what if" for a site, a river and a
    settlement from recorded reason chains alone, with a test that fails when a chain is missing.

## 7 Order and timing

| when | what | gate |
|---|---|---|
| now, before M0 commits | Part A (the fifteen rows) and Part B (the audit) in parallel; Part C's questions put to the owner | M0 closes only with `M0-world-sites-gate.md` complete |
| M0 close to M1 API pass | the carried rows of Part A become M1 API items with their reasons | the M1 spec run (workflows/33) reads the gate file |
| after Part C is answered | Part D, the volume or volumes, by the volume workflow with critique and seams | the coherence pass admits the base amendments |
| the first site milestone | the first site materializer (a cave or a ruin under a town, the simplest kind) after the viewable town | the acceptance bars 2, 6 and 10 |
| last | world-scale materialization, because it depends on Part C's boundary decision | the acceptance bars 3, 4, 5, 7 |

## 8 What is deliberately not in this brief

The original §32's rejections stand in full. Added: no second architecture document; no second classification
vocabulary; no reading of proprietary generator code; no kernel change in M0 beyond a fix the hardening rounds already
admit; no design work on world scale before the owner answers the boundary question.
