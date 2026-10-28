# The compounding map — M1 and after

**For the owner, 2026-10-27/28 (the managing seat, session_019yED1RC11y49BWLSYN3Wpo; Fable 5.1 at max).** The owner's question (22:1xZ, reframed 22:2xZ to M1 and everything after): *for each piece of the architecture, does it compound — must it be solved within its own phase because later phases build on it — or can we continue to the next phase and come back to fix it in isolation without everything being expensive?*

**How this was made.** Seven reading seats (Opus 5.5, high) read `docs/ARCHITECTURE.md` in full by range (§1–§2 the domain model; §3 the kernel with §16 the build plan; §4–§5 the pipeline and failure handling; §6–§7 determinism and editing; §8–§11 rendering, labels, content and export; §12–§15, §17 and Part II the evidence machinery, dependency rules and the stage-2 hooks) and, separately, the current state (`plat/docs/build/M0.md` §4b's deferral table, the fix queue's M1+ rows, the known issues, the volumes' requirements on the base, the host contract). Each produced one row per piece with the doc's own words cited by line. The seven reports are the appendices of this document, verbatim; this front part is the synthesis. Every line number below is `docs/ARCHITECTURE.md` unless another file is named. Where a reader inferred rather than read, the appendix row says so; where the synthesis relies on such an inference it says "(inferred)".

**Mechanism letters, used throughout.** A piece COMPOUNDS when a later fix would re-open work above it through one of: **(a) fan-in** — many later pieces consume its contract; **(b) evidence** — goldens, baselines, declared-shift records or ratings are keyed to its behaviour; **(c) persistence** — its form is kept in documents, logs, links, exports or a host's store; **(d) identity** — ids, orderings, streams or digests that later layers key on; **(e) performance substrate** — its cost model bounds what sits above it. A piece is ISOLATED when it sits behind a named seam (a fixed record shape, a declared shift of one stage, a versioned format, a style version, a registration slot, a `notBuilt` stub, a pre-decided fallback) so a later fix is local. MIXED means the contract compounds and the implementation behind it does not.

---

## 1 The answer in short

1. **Compounding is concentrated, not spread.** Of roughly 370 pieces the readers classified, the ones that must be settled inside their own milestone are the *contracts*: ids and orderings, record shapes and what the digest covers, the formats kept in documents, logs, links and hosts' stores, the evidence keys (the golden stage split, the invariant list, the B-CITY seed formulas, the metric registry), and a short list of performance laws. The implementations behind them — algorithms, heuristics, constants, table values, styles, paint programs, writers, indexes, pool sizes, the accelerator — are isolable by the design's own seams and can be fixed later at the cost of one declared shift or none.

2. **The order of milestones creates the cost, in three steps.** Nothing compounds before M1's first golden. From M1, a same-seed output change is never silent: it costs a shift record per stage and re-recorded goldens (§13.3; D-24 at L23502). From M3a, versions N−1 and N−2 are retained and the golden suite must replay under them, so every output bump carries a retained version and replay tests (L20260–20262; §16's M3a row). At M4's exit output version 1 is fixed and the *preview* label ends, so every later shift is a user-visible upgrade of documents people keep (L20258). So a fix to anything that moves generated output is cheapest before M1's first golden, then before M3a, then before M4.

3. **The real persistence cliff is M2a, not M1.** M1 documents have empty logs; the designed M1→M2a transform drops their model and regenerates them from the recipe (L4111–4116). Once logs carry user edits at M2a, the address scheme, the vertex signatures, the attribute paths, the lifecycle flags and the sequence scheme become replay obligations. M1's job is to make those contracts right; M2a's job is to make the log, the fold and carry-over right; M3a's job is the upgrade machinery that turns every later shift into a reported diff instead of a break. If any of the three is weak, every later declared shift breaks user documents (reader 4, row 42).

4. **M1 is where most of the stand-ins are replaced, and the first golden should be taken after them.** Thirteen of the forty rows M0 deferred (M0.md §4b) compound, and eleven of those land in M1: S7's walls, the roster, the full S3, S1's coast and islands, the deck strip, S9–S14, the `.plat` document, the derivation pool, the seams, the waterfront's gate ids, rendering and the records tooling (reader 6, section B). Each writes records the goldens, the edit log and later volumes depend on. Taking the first golden before they land would pay their shifts twice.

5. **A small set of document inconsistencies and gaps must be settled inside M1** (section 5 below): the persisted stage rank has no remap for stages inserted at M2b and M5; the op-kind rank behind the canonical op order is undefined; the canonical-form list omits counters the digest must cover; the transient arena's milestone is stated three ways; clear regions are used by generation before the fixtures that confirm them; two gate rows for the sites volume have no check evidence; the knowledge filter lands a milestone after the content it must withhold; the embedding API has no version axis.

6. **Two things that look isolated are not, and they matter most for scheduling.** First, adding a stage later is a local *registration* (stage ids are append-only numbers and keys carry the id, not the position, L10184–10187; "before its milestone each is absent and the stages around it are unchanged", L5674–5675) but not a local change of *output*: the roster's land formula already carries the dispatch share that M5's S9b fills in (L6114–6118) and S7b's capacity subtracts the expected dispatch land (L7031), so installing M5's stages moves S2, then S3's boundary, then the gate count (N₁ reads the stage-1 land, L6218–6219), then the district count, and on down the pipeline — a declared shift spread across the whole town (reader 3, short answer 2). Second, several "leaf" tables feed the town's skeleton: S2's demand reads the granularity table's plot area, the class-mix weights at each band's centre (L6116; L8409), the dispatch share and the farm mode (L8655), and S8's block-depth range reads the granularity depth rows (L7323–7329). Those rows can be changed later behind the table-version and shift protocol, but a change to one is a shift of several stages that can change the gate count: isolated in mechanism, town-wide in cost (reader 3, short answer 3).

7. **The strategy you asked about (harden what compounds inside its phase, pass over what is isolated) is the architecture's own intent.** The design builds seams on purpose. Two conditions make it safe: "isolated" has to be earned by a seam that exists and is pinned by a contract test, not asserted; and every piece passed over needs a queue row naming the milestone that absorbs it and the moment after which it stops being cheap. When the evidence is thin, a piece goes in the compounding bin: the two mistakes are not symmetric.

---

## 2 The moments at which compounding switches on

| When | What switches on | Source |
|---|---|---|
| M-1 | Baselines cross into `plat/` with countersigned crossing records; from M1 a new reference build never overwrites a row (a declared baseline shift) | L21903–21913; L20380–20383 |
| M0 | The dependency lint, path rule and determinism allowlist in the PR tier; the clean-room chain | L20715; L23537 |
| **M1** | **Goldens and declared shifts** (D-24: stage-isolated goldens built at M1, "goldens at M4" rejected); the output-version stamp, shift, cascade and milestone records; "a milestone cannot exit with an undeclared shift"; the first parity report; the first D-5 panel (diagnostic); the first timing phase that gates (R12-1/R12-3/R12-6 at TOWN and CITY; T119-1/T119-2); the `.plat` writer and reader; the port's creation half; the API reservations of "M1's API pass"; all three rungs generate, METROPOLIS included | L23502–23504; L20255–20257; L18853–18854; L20379; L20488–20490; L18398–18403; L20774; L21694; L334–336 |
| **M2a** | **The log** carries user edits over M1's format; addresses, vertex signatures, lifecycle flags and `seq` become replay obligations; the records digest joins the snapshot; the interaction-frame work starts | L21695; L4111–4116; L18287–18288 |
| M2b | The interaction-budget ratchet (no row relaxed against the previous release); METROPOLIS laws gate; D-5 gates "the base at parity"; the first planned feature shifts (LightSource → S11, the class mix, informal clusters, concealed pairs, S12c) — M2b necessarily files shift and cascade records against M1's goldens because METROPOLIS is in M1's goldens but tuned at M2b | L18431; L20776; L18398; L20273–20277; L334–336 |
| **M3a** | **Retention of N−1 and N−2**: every output bump now carries a retained version (≤ 150 KB gzipped) and replay tests; GeoJSON byte identity on five engines; the upgrade machinery and the frozen-import rebase; the bridge and the embedding API | L20260–20262; L21697; L20266–20269 |
| **M4** | **Output version 1 fixed; the preview label ends**; every later shift is a user-visible upgrade with diffs and orphans; M4's hand tools let documents hold underground and Works records before M6-U and M6-E, so those staged shapes are effectively frozen here | L20258; L10856; §7.5; L21699 |
| M5 | S7c and S9b run inside S7b and S10a at generation: probably the first declared shift of the default goldens after output version 1 (inferred) | L17967 |
| M6-U | A staged layer's first release is a declared shift of its milestone's output version: the one-time ground shift | L20281–20282; L18909–18911 |
| M-CAL | Adopting a historical pack is an output-version bump with a shift record for every moved stage | L20838–20841 |

**A gap between the cliffs (inferred, reader 1).** Retention arrives only at M3a. A declared shift released between M2a's exit and M3a's retention turns users' edited documents into frozen, view-only documents until M3a lands. Either release no shift in that window or accept frozen views.

**The decision ledger prices its own reversals** (Part II's D-rows): high after M1 — D-12 the coordinates, D-13 the plat, D-15 the streams, D-26 identity, D-28 the model digest (L23427–23529); D-16 the fused layout, high, "hence M0 and M1's fusion gate" (L23449–23450); D-4 the core language, medium after M1; D-18 the one-click trade, low as numbers and medium as architecture; low — D-21 the document, D-27 work limits; trivial — D-24 the golden tooling, D-30 thresholds, D-34 CI tiers. The readers' one correction to that table: D-24 prices the tooling, but what compounds is the evidence the tooling accumulates (reader 7, skeptic note 1), and D-21's "low" holds only before M4 (note 2).

---

## 3 Per milestone: settle inside it, or pass over it

Each milestone lists first what must be settled within it (COMPOUNDS, with the mechanism and the first later milestone that would be re-opened), then what can be passed over and fixed later (ISOLATED, with the seam that makes the fix local). The lists merge the seven readers; the appendices carry the rows with their lines.

### 3.1 M1 — the viewable town, the document, the first goldens

**Settle inside M1.**

*Identity and ordering (d, c; first re-opened at M2a when the log points at these).*
- Address ids and `Identity`: `kind:token` with the arena prefix, the parent as a field, no stored seeds — the most fanned-in contract in the model (reader 1 row 14; L586–594). The address namespace choice (the lineage-lane route moves no address; the salted-seed route is a declared address shift) (reader 6; gate check L272–278).
- The lineage key and each stage's derivation unit; generated tokens as the lineage hash; the collision rule (reader 4 rows 16–17; L10589–10628).
- The RNG engine and key layout; the stage-id and concern-id registries (append-only, never renumbered); the per-concern keying rows for M1's stages; the ordering rules (id tie-breaks, lineage-order merges, (y, x) re-seats) (reader 4 rows 1–4, 21).
- The kernel orderings M1's goldens freeze: the lattice constants and integer-cm storage; the (y, x) tie-breaks; the canonical op order with its op-kind ranks; the canonical query order; the insertion rules and placement bound; `splitFace`'s child order (anchor identity, so logged addresses); `kerb`/`corridorUnion` with `ChainProfile` widths; the pool scope rule's margin bands; five levels, kept content and the persisted stage rank; the code-to-reader map and transaction granularity; work-count accounting; digest leaves and the stored root; the snapshot block, lattice-point references and the role-row schema (reader 2 rows 1, 3, 11–12, 15, 17, 19, 21, 24, 26–29, 32, 40, 43–44, 47).
- The engine choice: switching to Clipper2 after M1 is a declared golden shift over seven stages and adds WebAssembly to the embed contract (reader 2 row 39; L5424–5433). J558 places the decision (C2) before M1.
- Part counters and the canonical field list; the document namespace segment (reader 1 rows 13, 51; reader 4 row 15).

*Record shapes and what the digest covers (a, c, d; first re-opened at M2a or M2b).*
- The entity-record anatomy and digest membership (identity, lifecycle and attributes in the model digest; derivation, naming, reason and order fields in the records digest; provenance and elaboration in neither) and the registry's column set (reader 1 rows 44, 48; L3545–3605). The digest's byte layout and what it covers (reader 4 rows 10–11).
- `ContextVector`'s field set and `Allocation` (eager, persisted, no stream key) (reader 1 rows 25, 28). The plot as parcel and lineage unit with the access guarantee (row 27). District as a group of L1 faces with its `SeamContract` on every district (row 6; L9740). Reservations (row 24). The way record and `WayClass` list (row 22). The building record and never-reused wing keys; the `BuildingGenerator` interface and stage-3 contract (footprint = union of wings exactly) (rows 29, 33). The height datum (row 31). The class vocabulary (row 32). Wall records and the unbuildable-faces invariant (row 37). Terrain and hydrology determinism (the D8 tie order; "not in the plat") (row 20). Water control-knot ordinals (row 21). Household identity (row 41). The lifecycle schema and tombstones (row 46). Derivation and naming record shapes (row 47). `factTier` and the dossier paths (row 45). Rung names and the refusal class; the `RungProfile` shape (rows 1–2). The pool's district-partition unit (row 7). Load steps 1, 2, 3 and 5 (row 52).
- The recipe (every model-affecting input and nothing else; salts only on re-rollable concerns) and the rule-table cell schema with its slice scheme (reader 1 rows 11, 50; reader 4 rows 44, 46). The recipe's table and pack pins (Q99: a table not registered in the tables view hash) (reader 6).
- The 38 record fields still un-staged in `staged.ts`, including the gate's M9 `baseCm`/`deckCm`; the accessors `datumOf`, `waterTableCm` and one `s1()`; K12 before reason records persist; the manifest's version axes K10 and the arena re-key K14 (reader 6, section F).
- The label records: `LabelEntity` with its candidates, the quarter tree, the pinned-placement shape — label spines are S13a output *in the model hash* (reader 5 rows 24–25; L15647, L16065). The zoom-stop indices and band set (`Placement.stop` is a hashed model field) (row 5). The naming contract and uniqueness order (row 32). Sequential roster ordinals ("the n-th chandler is the same chandler at any population") (row 36). The person-key scheme and the relation-store schema (rows 38–39). The style schema and naming scheme (style is canonical document state) (row 6). Display-list columns and the shared types; the worker model (S14 is the only path from model to view) (rows 1–2, 20). Render keys, the stamp-tile file and tree ordinals (rows 3, 21–22). Identity in exports: addresses plus the supersedes table, SVG metadata ids (row 41). The `.plat`, JSON schema and permalink formats (rows 40, 46).

*The pipeline's own pieces (reader 3; a, d, c, b).*
- The stage registry and the order itself: `StageDecl`, the sort over declared inputs and outputs with the stage-id tie-break, u16 ids never renumbered; the level-write rule (L0 by S1, S3, S4, S5b, S5a; L1 only by S3–S8; "by no generation stage after S9", L5792); the batch structure and `txForm` (reader 3 rows 1, 3). First re-opened at M2a, whose scoped re-derivation, "Re-derive from Sk" and replay walk this structure; M5's `TemplateFabric` writes inside S8's batch.
- The identity scheme of every stage: S4 routes in destination order; S5 ways in acceptance order; S6 districts in seed order (keyed by the grower's lineage and the turn, so a scoped regroup re-grows by the same turns, L6842–6845); cells by split ordinal; S8 work keyed by cell; S10 by block; S11 by plot; the river course-knot ordinals; gate ordinals with the prefix property ("a smaller N is always a prefix of a larger one", L6240); the sequential, prefix-stable roster ("the n-th chandler is the same chandler at any population"); the S0 draw order with its appended draws (rows 9, 10, 12, 16, 30). First re-opened by M1's own goldens and the B-EDIT-lite identity fixtures, then by M2a's log, locks and stored rerolls.
- The records one stage writes and later stages read: Terrain and `WaterBody` with their side rasters and control-knot ordinals; `Bridge` in its site/built states with the `deck_end` form ("a site becomes a bridge only when a way uses it", L5999); `Reservation` as an L1 barrier face with its role and rank; `Gate`; `Enceinte` and the castle; way classes and width knots; `District` and `QuarterNode`; `Seam` with its `baseLane` portals; the `FieldBands` record together with the two-pass field slots, even while M1's field is flat; the three `Allocation` records (district, hinterland, block); `Block` with the fields reserved for M5; `Frontage`; `Plot` with its access, party-wall and exposure fields; the site plan and the wing contract (rows 10, 11, 15, 16, 18, 22, 30–33, 37–41, 44). First re-opened at M2a (the log over M1's format), then M2b (which fills them) and M3a (migration).
- The laziness contract and the eager first map (content decisions eager and town-wide; S10, S10b, S11 and S12b write only inside their own faces, L5731; "any order of derivation gives the same model", L5733–5734); the pool's merge order and the hinterland unit; S10 (0)'s eager shared-edge bands and the 2 m margin bands ("the pooled districts and the hinterland unit never write the edge they share", L6826–6827) (rows 4, 5, 29). First re-opened at M2b (METROPOLIS tuning, the pool rule) and M5 (eager S7c and S9b; shared edges byte-equal).
- S3 as one construction (gate routes, the travel-cost field, the boundary, gates, castle, trace, the L0 water batch, the harbour route, the market, then the L1 reservations; "no later stage recomputes a boundary they were fixed on", L6179), S5's "trace before growth", and the hard precondition rows later stages are written against: roads leaving a walled stage = its gate count (L10042); footprints ∩ (wall band ⊕ setback) = ∅ (L10031); NF-P5 (L10030); the deck rule (L10029); S8's working block ≡ S9's committed block (L7295); containment (L10052); every plot has at least one access edge (L10024) (rows 14, 26, 36, 48, 59). First re-opened by M2a's dry run, which reuses them, and M2b's parity runs, measured on top of them.
- The S5c/S8 division of labour as re-gated by the fusion gate at M1 (walled regimes grow district-scale streets only; "S4 and S5b arterials are never trimmed", L6776) (rows 27, 28). First re-opened at M2b, whose MFCG and NG signature bands are fitted on it.
- Ladder keying and the tier taxonomy ("every retry draws from (entity lineage, concern, reroll, attempt) and nothing else reads that stream", L9921–9922; "no staged rung restarts anything above its district, unit or island", L9973) and the report fields M1's acceptance reads (`requested`, `ladderUses`, `bugs`, `stages[].attempts`; `ReportCode` closed, L10074) (rows 57, 60). Read by M1's own gates, then by M3a's API and M-SF's host.
- The work-limit law form (row 58): first re-opened at M2a, where a scoped run must get the limit it had in the full run.
- The slots M1 must fix even though M2b fills them (reader 3, short answer 7): the two-pass field structure, the `FieldBands` record, band-keyed table lookups, `Block.interior`, `reach` and `Plot.exposure`, and the `PlacementSolver` request and result shapes; the band ids by M2b at the latest, because M4 stores `builtBand` in the model digest (L8906–8908).

*Evidence machinery (b, c; re-opened by every later release).*
- The golden suite's definition and the stage split; the `ShiftRecord`, `CascadeRecord` and `MilestoneRecord` schemas and the `plat/goldens` layout; the output-version stamp and frozen view (reader 7 rows 24–26, 28).
- The determinism contracts: five-engine and pool-size identity, the allowlist scope, "budgets never change output", vendored libraries (rows 2, 5, 18, 39, 49). The closed set of model inputs (reader 4 row 9).
- The invariant contract and the named base invariants later products assume (containment, NF-P5, the seam exception, crossing/deck, 0 `E_KEPT`, `bugs` empty); the evidence keys (B-CITY seed formulas, the core-record fields) (reader 7 rows 14–16).
- The work-limit law form and coefficients (a hit takes a ladder rung, so coefficients are output) (row 13). The baseline, parity and metric-registry schemas (row 29). The D-5 seed formulas and records (row 30). The table-cell format with provenance and extension markers, and the parity presets (rows 33, 48). The entity registry with the staged records schema-complete and empty, and the 2 % hook budget (rows 17, 45). The off-forms in force from M1 (T13-1 islands off, T88-1 staged readers, T111-5) (row 21). The port's creation half and the frozen dossier fixtures (rows 23, 40). §14's package chain and the M1 API reservations (rows 34–38). The Part II hooks M1 must carry: `SeamContract` 100 % at exit, per-district streams with reroll isolation, the `bent-cut` fabric slot, the pin vocabulary, `RungProfile.layers`, the `Features.sewers` and geology/relief S0 draws "so they are in the first golden" (rows 50–52, 56; L21694).
- The performance substrate: one-click completeness at linear per-building cost ("Reversal cost: high as a mechanism"), O(touched) batch cost, the 10-second comfort bar, the first-map contract (rows 4, 8, 9; reader 5 row 16).
- The stand-ins replaced before the first golden: S1's coast, islands, harbour, bank classes; S2's roster; S3's full form; S7's walls, towers, gatehouses; S9–S11; the work coefficients re-fitted on B-CITY-lite; the water-gate id scheme (`gate:w<i>` collides across enceintes, C-0244, Q66) (reader 6, section B and F). Sequence the first golden after the AFTER-M-1 table cells land, or budget for their shifts (J558 lets them land inside M1 as declared shifts).
- The settlement of the inconsistencies in section 5 that fall inside M1.

**Pass over at M1 (ISOLATED; the seam).**
- Pool size and the copy's contents (the golden pool-size test; identical digests by construction). Index internals and rebuild thresholds (the canonical keys; lazy rebuild). The slot layout (slot independence; compaction on save). The transient arena (no M1 consumer; never persisted, digested or frozen). The skeleton (typed downgrades; pre-decided removal). The accelerator (a swap-in behind the façade, "slower and never different"). Adopted libraries, `regularFit`, the shape services (typed interfaces, version pins). `area2` and `ratio` (exact). Chunk size (the block-group fallback). Warnings and the CI oracles (reader 2).
- Budget numbers and configuration fallbacks (the §12.10 register). The timing-phase protocol (the last nightly job). CI tiers and the bar schedule. The test benches. The §13.7 numbers confirmed at M1 — except O14 (e)'s fallback, itself "a declared shift", decided inside M1. SVG and PNG exporter internals. The matrices, known-defects and release notes. The deny-list scanner. The app UI (reader 7).
- The ink palette, contrast thresholds, width rows, paint programs (style version). Label floors, the fallback ladder, halos, the font path (an S13b view shift behind `LabelPlacer`). Lane-selection thresholds and the kerb-hairline fallback (a render rule). Furniture scoring. Canvas jobs, the glyph atlas, the PNG band encoder, tile keys (reader 5).
- The arena's in-memory layout; snapshot encoding and size fallbacks (output-neutral); provenance (rebuilt by replay); `RungProfile` values and rung modifiers (table cells with pre-decided fallbacks); per-stage algorithms and constants (one declared shift each); defaults and preset values (pinned per output version); materials (rendering only); the derived district boundary; the declared-empty future fields (except `z: ZDecl`, consumed by the display list from M1); view state; tooling and dependency adapters (reader 1).
- Presets and packs; the `plat` bin; later ladder rungs (each turns a typed refusal into a commit on the affected seeds only); B-EDGE sweeps and the nightly's contents; the in-Chrome re-measure; hosted CI (reader 6).
- Digest maintenance (the root is a pure function of the leaves); the key-derivation implementation (the vectorised fallback is output-neutral); dmath routines (replace bit-identically or declare a shift; `pow`/`log` sit upstream in S1); the controls registry; the decoration function (the render axis); matching acceleration (reader 4).
- The pipeline's heuristics and constants (reader 3), each a declared shift of its stage behind a table version, a strategy slot or a rung — with the cascade width noted, because "isolated in mechanism" is not "cheap in output": S1's generators (the Terrain, Coast and River strategies; the F-OUTLINE and F-RIVER rungs; the cascade reaches every stage and every D-5 seed); S3's constants (the centre score table, plaza and castle area bands, the N₁ coefficients, the castle repair constants, the anisotropy rows; F-CASTLE rungs; the harbour pick's detour guard, a pre-decided fallback); S4's cost weights, smoothing and class thresholds (one table, but a shift across S3, S4 and S5 together); S5c's heading, branching and bias parameters (preset rows; the CI drift test); S5d's top-up (a rung); the stage-regime rows; S6's growth rates, the N_d law, the typing rows, the quarter cost and the N_q fit (wide cascade); S8's `cut.*` constants and `bendMode` per preset, and the F-CUT rungs; the granularity rows and class-floor values (table versions, but they move S2's and S8's digests); template rows, furniture pins, tower spacing, the naming word lists; S13b and S14 (view shifts); the quality budget (an empty table, a no-op pin); the calibrations M1 itself sets, each with its stated fallback (`plotShare` refit with a declared golden shift, L6124–6125; `portRef` PLAUSIBLE until the M1 receipt, L6406; the detour factor refit per rung, L7809; the hidden-share weights fitted at M1, L7494); which pool configuration is primary (the same model either way).

### 3.2 M2a — the edit log, replay, locality

**Settle inside M2a** (nearly all (c)(d); first re-opened at M3a, where the upgrade replays whole logs, the bridge must converge and retention begins).
- The edit-log envelope and the `seq` scheme (`seq` from `nextSeq`, never reset, survives rebase, the creation index of draws and the key for minting user-created ids); the `EditEvent` union's shipped payloads (`moveLabel`, `hideLabel`, `setAttr`, `setStyle`/`setLayer` row operations, `rerollLayer` concern ids); the rule that the log only grows and a rebase never removes events (reader 4 row 25; reader 5; reader 1 row 49).
- `resolveVertexAt`, `VertexSig`, `CarryMap` and the rebind rule (exact point, else signature within the rebind radius, else orphan; never by distance alone) (reader 4 row 26; reader 2 row 48; reader 1 row 19).
- The ordered fold with its creation prefix; replay mode (S13a per event, S14/S13b once at the end) (reader 4 row 27; reader 5).
- Carry-over semantics (survivor keeps address and lineage; successor takes the old address with a fresh lineage) and user-created minting; naming follows the address with the uniqueness rule (reader 4 rows 18, 20).
- Lock, pin and edited semantics and the precedence order's first rows; the non-append-only lifecycle block; suppression written by `delete` (reader 4 row 33; reader 1 row 46).
- The named-action modes (Regenerate keep settings byte-identical; New random; Adjust versus Re-derive), absolute rerolls and the reserved range (reader 4 rows 5, 28).
- The stored effective scope and the seam exception; the locality contract (byte identity outside the effective scope) (reader 4 rows 35–36; reader 7 rows 20, 51).
- Fates and the orphan table; recorded inputs and the records-digest layout (the records digest joins the snapshot); the confirm token and fate/rename semantics (reader 4 rows 13, 38–39; reader 5).
- Undo/redo semantics, reserved sessions and the truncation `nextSeq` rule; keeping a saved snapshot (rebase); the schema chain itself (reader 4 rows 41–43; reader 1 row 52).
- The undo projection of `CommitRecord`; `StretchRef` in logged edits; the dry run's conflict typing; kept content after reload (reader 2 rows 8, 12, 18, 31).
- Load verification with the law V and the records digest; the outcome of R12-25's memory fallback (it may move document columns into the on-demand block — a schema step after M2a); the scope-cost law from TOWN to CITY (reader 7 rows 9–11).
- People pins as explicit edits keyed by person key (reader 5). KI-5 (a non-LIFO removal leaves a split vertex) before replay exactness is claimed (reader 6).
- From the pipeline (reader 3): the replay fold's "S13a per event" and the fold position reserved for the tail (re-opened at M3a's migration and M4's epochs); how the dry run evaluates invariants (batch-local and stage-end rows checked once on the scratch overlay; a chain of batches checked once after its last batch, L9979–9986; re-opened by M3a's carve and water operators); the New random content check and the rerolls stored in the event (L9862–9880).

**Pass over at M2a.** Tree scoping (sound by over-invalidation; the byte-identity oracle). The undo-record format, checkpoints and session minting (rebuilt by replay; the fold never reads the session). Refuse-versus-bend policy (results stored resolved). T9/T10 tools and variations (they emit ordinary events). Load gating (the root of record). The oracle itself. B-EDIT sequence counts; the pipeline UX session; the R12-12/13 numbers; the T126 medium-layout pin. The rebuild at a freeze after edits; chunk size; the grid-overflow threshold; lazy partition rebuild. Authoring handles, the count badge, `live.ghost`; delta cost.

### 3.3 M2b — parity content, roofs, bridges, METROPOLIS

**Settle inside M2b.**
- `FieldBands` band ids (band-keyed rows, stored band strings, plan chains; re-opened at M3a and M4) and the capacity function (every host computes the same integer; re-opened at M3a's re-letting and M6-P) (reader 1 rows 26, 36).
- Entrance ordinals (`nextEntrance` never decreases); the basement record and the half raise ("ships with the basement gate at M2b so no document's datum shifts") (row 34). Exposure, `knownTo` and tenure (row 27). District identity and pressure (row 23). The `Use` record (row 41). Wall condition by run with its per-run export split, and the stretch-state canonical form and write order (reader 1 row 37; reader 2 row 33; reader 4 row 51).
- The bridge and deck structure at generation (`deck_end`, `deck` beside `way`; M3a's clear regions must reproduce it and the warp holds deck ends); ranks for the stages first built here (S10b, S12c); passages as L3 faces (reader 2 rows 11–12, 14, 30).
- The hook points `S7b.afterGreedy` and `S10a.afterDrivers`, `squares.quota`, the way-surface rule (re-opened at M5) (reader 7 row 52).
- The planned feature shifts filed with cascade records (deferring them stacks onto M3a's version); the NoOpPin off-forms for items 102–107 and 115; the P-row verdicts and the D-5 "base at parity" result; the interaction-ratchet baseline (re-opened by every later layer that must fit the envelope); the METROPOLIS laws; the §13.7 "not achieved" outcomes; the CPU light-pass reference (reader 7).
- The keying rows for M2b's stages (S10b, S12, `pin.light`); the digest decisions (`LightSource` is model data; character derived and unhashed, identity hashed); the stroke-list representation; parity-preset resolution (reader 4).
- The height and caster contract read by the light pass, glTF and CityJSON; the states census coupling to the upstream enumerations; `sunPath` (shared with the model's daylight sampler: a change is a model shift); `lit` on the same role vocabulary; passage and entrance-set records; the GeoJSON metric-attribute bump (reader 5).
- The street and plot statistics the D-5 rating rests on (the fusion thesis's regime split) (reader 1 row 4).
- From the pipeline (reader 3): the band-set ids, `FieldBands.middle` and the band-keyed lookups (first re-opened at M4, which stores `builtBand` and the geometry floor); where each stage reads the field (pass 1 or pass 2) and the soft-term contract (weight 0 is byte-identical, L6919–6920; re-opened at M4, M6-sky and M6-E); the `Block.interior`, `reach` and `Plot.exposure` vocabularies (re-opened at M3a's hand sealing and M3b's lights); the `PlacementSolver` request and result shapes and the one-solver identity, T16-3 ("the one solver every path that puts a use on a plot calls", L7761); household capacity and the generation fill; S12c's records and `bandRange` semantics; the call positions of the hook points and `squares.quota` counted once; the hinterland allocation and the unit contract; and the D-5 parity sitting itself — after M2b every shift records `d5SeedsChanged` (L20211), so each later shift that moves a panel seed re-opens that panel.

**Pass over at M2b.** Each soft-term weight (daylight, water pull, siting families, coverage, supply links, spread and pull: weight 0 is byte-identical); the daylight `pointsPerCell` fallback (a declared shift); class-mix rows (but S2 reads the expected plot area, so they shift S2 too); covers and concealment rows; cluster rows; farm-mode rows (coupled to S2); market siting rows and `portRef`; barrier-closure rows and the stretch profile (a no-op pin when off); wall-condition rows (a no-op pin); the grandeur ceiling (a no-op pin); harbour-wall rows; deep-interior shares and reach weights; the way-surface rule (a hook) (reader 3). Table values (pinned table versions). S10b scoring and designation templates (the output version). Lighting (view-only, outside the model digest); the GPU pass and fallback ladder (held to the CPU reference); `lit` palette and textures; roof constructions (the cache key includes the construction); the relief tier; shadow-budget fallbacks; canvas tiers (device state). Instance functions (the render axis). Class-floor and work-limit values; METROPOLIS budget misses (the accelerator or a declared budget amendment). Derived character and band range (recomputed on load); greenery and trees (generated at render); the rung-modifier fallback; the basement gate algorithm (behind `waterTableAt`); entrance and cellar probabilities (template rows); materials; the R12-4 numbers; light tier and rung fallbacks; the correlation and tendency spec numbers.

### 3.4 M3a — warps, migration, retention, the API

**Settle inside M3a.**
- Upgrade and rebase, with per-version packaging of the model packages (retention needs model packages loadable per version; packages not split per version would make retention a retrofit — inferred) (reader 4 rows 22, 42; reader 1 row 52).
- Retention of N−1 and N−2 and its replay test; migration and upgrade as undoable events (reader 7 row 26; reader 2 row 50).
- The warp's semantics (deterministic halving, order by positions alone) and warps stored as operations; drawn constraints applied at their log position; `carryWings` arithmetic once warps are logged (reader 2 row 30; reader 4 rows 29, 34; reader 1 row 30).
- Clear regions and prepared contacts — and the fact that their fallback changes the generation order of `moat: 'all'` (reader 2 row 14). Ground-part numbering and join records (never renumbered or reused; part of keys and addresses) (row 37). §2.7's laws for raised ways meeting walls and the Order fields; raised-way keys, addresses and deck-plot suppression keys (reader 1 rows 38–39).
- The embedding API `PlatApi` and the reader answer shapes (no version axis exists — section 5); the bridge envelope, `logHead`, canonical event CBOR and the version handshake; `DocResolver` and the host input routes (reader 5 rows 47–49).
- The knowledge-admission function, its table and the document-format gating; GeoJSON ids and run ordinals and five-engine byte identity; the skeleton file format; the `packs` block and row operations with `baseRowHash`; `localUid` keying; override-resolution rules; table slices and invalidation (reader 5 rows 28, 33, 37, 43; reader 4 rows 44–45).
- Resolved points forms, `expansion` versioning; operation records and the closure minting order; the precedence order; `ConflictAction` kinds (reader 4 rows 31–33, 40).
- The dossier port's absorb half: the CarriedFacts diff, existence and rejection, the one placement path, the binding key law and the `DossierChange` envelope; `hostContent` and packs (reader 4 rows 14, 47–49; reader 1 rows 43, 45, 53).
- The rung-counter hooks, the `plan.*` concerns and the canonical-prior rule; plan-rung ids (`room:<building>/<level>/<i>`); stepped and oval massing ids and stream indices (reader 4 row 5; reader 1 rows 33, 35).
- The elaboration record and cache (shared by M5, M6 and M6-P); item 88's staged records schema-complete and empty; the comfort-level waits for a dossier change and a migration (reader 7 rows 8, 21, 54).
- From the pipeline (reader 3): `MutationRecord` and the designation mutator's "one path" (if M1's S11 is not written as add-only mutation, M3a re-opens S11 as a declared shift, T18-4 — inferred); carve semantics, the `ConversionOp` kinds and the identity-exception list of records that name a way (a new record naming a way must join the list); the `raised` key, `RaisedRead`, the commit slot before S7b, arena-part allocation and `RaisedReasonKey` (re-opened by four volumes); `levelledGroundCm` as the one reader; the creation-prefix format; the least-disruption order and closest options in `PlacementResult`; the generation report as an API surface (`report(doc)`, `report.changed`; `ReportCode` closed).

**Pass over at M3a.** Operator algorithms (the output version plus the oracle). The warp kernels' mathematics (the versioned fold plus upgrade replay). Shape derivers and sugar content (shapes stored resolved; the `expansion` version). The T2–T8 tools (the event vocabulary). The deps audit. Receipt, status, derivation and budget rows (data tables). The retention window length (the pre-decided fallback to N−1). Clear-region speed (the plain-rule fallback). The warp's cost. The `equalize` brush. Anchor ordinals (never reach a snapshot). `corridorUnion` on raised parts. GeoJSON writer internals; the warp preview; the stale-detail marker; `DocResolver` implementations; the underlay. B-EDIT at 10⁵; the first-five-minutes outcomes; the O2 (c) carry-over fallback; the R12-10/14/15 numbers (R12-14's fallback changes how warps validate, so take it inside M3a). The tables editor and drawn-constraint UI. The crossing table and the way-and-channel table (non-normative; T110-4 decides); span constants; `stepProfile` (derived).

### 3.5 M3b — exports, looks

**Settle inside M3b.** The CBOR twin; the CityJSON extension schema; address numbering and path-label candidates (model data); region groups referencing quarter ids; `LightSource` records (an S11 model shift, re-opened by M4b's lit windows and M6-U's light shafts); fact tiers in persisted formats; drawing-group switches set by logged `setStyle` (reader 5).

**Pass over at M3b.** The VTT writer (a pinned external profile); glTF/OBJ writers; ink-family variants; the random-style generator (its draws are persisted as row operations); colour-vision variants; seasons, festivals, crisis looks and weather (tiles byte-identical when off; the weather stream is never saved); boats; thumbnails; the legend sheet; the forms catalogue and intent expansion rows.

### 3.6 M4 — the incremental path; output version 1

**Settle inside M4.**
- Output version 1 itself: it ends the preview label; from here every document and link is permanent and every shift goes through the upgrade machinery (reader 1, 4, 7).
- The epoch contract (an epoch is a logged event on the persisted plat; survivors never re-rolled) and live-epoch numbering; the fixed-key draw rule and the lapse of a dossier rejection at an epoch (reader 1 row 5; reader 4 rows 4, 6, 48).
- `builtBand`, `builtProsperity`, `fieldBand` with their migration; Works and the material ledger (model data with the stage derived); existence mapping and conversion causes; the `WorksStage` enumeration and drawn-week semantics (reader 1 rows 27, 42, 46; reader 5).
- Frame growth (the never-shrink law, the batch sequence, raster extension by whole cells, the raised-foot order); wall → ring road through `retypeEdges`; work-count identity under any accelerator built for the performance tiers (reader 2 rows 7, 17, 28, 31).
- The underground and island hooks built here: basement accesses, the systems' records and parts, links, the undercity bound, `raiseGrade`, `addUndergroundAccess` with its staged refusal, the S7b (5) count draw and sky allocations, the decline kinds, the hook-fixture bars; the underground closure generators' order; access and link states with knowledge (reader 7 rows 22, 55, 58; reader 4 row 40; reader 5).
- The D-5 "mastered" result and the `house` pick; the table-provenance audit; nightly cross-platform goldens green for two weeks and the incremental path of D-25 (reader 7).
- From the pipeline (reader 3): the epoch event, `EpochInputs`, the phase list of `grow-by-stage`, the regrowth-first order and the Works record ("the base builds and tests exactly one path — add a growth stage to an existing town — at M4", L9174–9175); `builtBand`, `builtProsperity` and the rule for which band a reader takes (manifested for geometry, the field for occupants; "never recomputed from the field", L8906–8908); the epoch character step and renames.

**Pass over at M4.** Ladder-table rows, churn caps, decline-table rows, `WorksTable` rows and dwell bands; S7b (5)'s island count (off unless the islands setting is on) (reader 3). Archive compression (output-neutral); decline rates and Works durations (table data); the re-grid fallback; accelerators and budget amendments; known-issue rows the fail-safe rule allows; the underground pieces behind `refuse.staged`; the character dials (derived, never stored); performance and resolution tiers (outside the digest; "never in the document"); release notes; the R12-36 thresholds; the 20-epoch budgets.

### 3.7 M4b — the simulation module

**Settle inside M4b.** Persisted relations and postings; event templates whose effects are logged edits. **Pass over.** Occupancy and schedules (a cached query, never logged); `live.people`; occupancy-driven lit windows; the family-tree view. The relation store's schema is in the base from M1 (D-10), so M4b fills, it does not define.

### 3.8 M5 — neighbourhood close-ups

**Settle inside M5.**
- What must *not* change: the seam exception, attraction candidate (b) and `corridorUnion` — M5's own bars (Hausdorff 0 on shared edges; footprint hash identical to the city level of detail) need the kernel to give the close-up and the city the same answer, and changing them re-opens M1's `SeamContract` and every golden since (reader 2 rows 13, 26, 40). Footprint hash identical to the city band requires M1's footprints to be final (reader 5).
- `Block.content` values, `HoodPlace` records and names, `HoodRecipe` documents, the persisted fabric ids; the three reserved concerns start drawing; the keying rows for the ids reserved at M1 (`fabric.select`, `hood.*`, `S8.seed`); hood pins as block overrides; the close-up record entering the digest; re-matching presentation instances (reader 1; reader 4; reader 5).
- Ranks for S7c and S9b; S7c and S9b inside S7b and S10a at generation (probably the first declared shift of the default goldens after output version 1); the declared way-name and default-map shift; W15's services `fabricSignature`, `districtsAbove` and the opening pass, which the underground and the sites consume; seam amendments in saved documents; `HoodPlace` producer ids; the NG baselines and NG panel seeds; place labels and names (model data) (reader 7; reader 6).

- From the pipeline (reader 3): S7c's `District.fabric` with its template land in the allocation and S9b's `Block.content` with its land accounting (re-opened at M6, M6-sky's unit runs, M6-U and M-ENC); and the dispatch share λ_b becoming non-zero — a global declared shift that starts at S2 and reaches the gate count (section 1, point 6).

**Pass over at M5.** Template rows, the NG preset, and the F-TEMPLATE, F-DISPATCH and F-UNIT rungs (reader 3). `TemplateFabric` internals (registrations); Find (a per-viewer key behind the T120-1 pin); the `hatched` style; the close-up cache; the fabric template content and NG-preset values (V01's tables; a declared shift only where output moves); the `SeamReport` numbers; close-ups on arbitrary boundaries (no arena-specific op); the close-up style fields.

### 3.9 M6-P — plans

**Settle inside M6-P.** Stored plans (room ids, walls and openings once a plan is edited) and the re-cut semantics; the JSON `plan` block schema (T28-19) and the rule that edited plans are model data; VTT storey ordinals and the `plat.stairs` mapping; `room:` addresses; the transient-arena contract (`readBack`'s value schema and canonical order, the re-cut rule, seed tiling, the stored-plan carry check) — though M-ENC may be its first reader (section 5); the `plan.*` keying with the rung counters and the interior ladder's keying by step; plan-damage keys of (building lineage, element id), which make V03's element ids identity-critical; the canonical-prior rule; plan-event payloads and room anchors; the damage layer keyed by `plan.damage`; storey and stair links with `{fromCm, toCm}` (gate M10) (readers 1, 2, 4, 5, 7).

**Pass over at M6-P.** The algorithm for unstored plans (a pure function outside digests); furniture; the damage drawing (byte-identical when a building never decayed); derived plans and the cache (capped, "dropped first"); R12-23's fallback (a declared view shift); the B-PLAN tests; plan rendering and exports; the `damage.elements` ranges; `tileRings` refusals (a caller bug); the plan rung's skeleton use (labels and light only).

### 3.10 M6-U — the underground

**Settle inside M6-U.** Underground part ids and `under<n>/` addresses (V06 and V14's site↔underground links use them); `AccessPoint` records (V14 reuses them); the tail phase; the one-time declared ground shift (M6-sky, M-CAL and M-SITE-A build on that output version); tunnel and gallery half-widths and the `chamber_wall` chains frontage plots end on; part allocation per system and the `UndergroundLink` ends; arch vaults keyed by raised-way span keys; the crypt in the `Basement` record; underground part numbering and lineage units; V04's fixed-key draws; `sewer` closure keying; the underground anchor rows and the digest layer; the depth-band scheme that names scenes and exports; `excavation` readings and unexcavated admission; the additions to the critical path (+3 ms at CITY, +6 ms at METROPOLIS) (readers 1, 2, 4, 5, 6, 7).

- From the pipeline (reader 3): what the tail may write on the ground — its reconcile stage writes ground uses and household counts, and the ground digest is finished after it — and the S7b (6)/(7) "remainder" rule; together a declared one-time shift of every CITY and METROPOLIS golden, because sewers are always on at those rungs (L18910); first re-opened at M6-E (`under.extend`, the fade, the crowding hook) and M-SITE-A.

**Pass over at M6-U.** The F-UNDER, F-NET and F-VOID rungs ("this row is its hook"), the underground rows, the tail strategies behind `phase:'tail'` (reader 3). Style rows, labels and light tuning; the water readers (they switch at M-W0h by design); the tail stages behind `StrategyRegistry.underground` (the ground is read-only to them); `UndergroundRule` data (zero under the parity presets); the hidden-render clause; "one cut for every underground part" (`corridorUnion` reuse); F-VOID's `E_NO_PATH` readers (additive); cavern-rule rows; condition-table readings ("never a second stored state"); crypt rank trimming; routing algorithms (behind `refuse.staged` until now); visibility toggles; the underground drawing programs, the cut-away look, shaft drawing.

### 3.11 M6, M6-E, M6-sky

- **M6 (stage 3):** wing and room rung counters, base-wing anchors and `massing` keying compound (c)(d); the stage-3 composer's intake has a pre-decided fallback; massing ids are migrated "before M6 ships any document" (L1517).
- **M6-E (evolution):** replay-epoch keys (0x8000_0000 + r), the replay epochs in the creation prefix and the `EpochReport` chronicle kept across a rebase (L10082–10083) compound (c)(d), first re-opened at M-SF's dossier histories, the village's V-M3 and M-CAL; the engine itself works on §4.11's interfaces and the hook bars bind it (T113-7 is its pin); with the replay off generation is byte-identical (L9228–9229). It uses frame growth, `retypeEdges` and the stretch-state transitions at epoch scale. Decline, hazard and history rows and the 'history' strategy's own phases can wait.
- **M6-sky:** island slot keys (`raiseIsland`) compound (c)(d); islands are off by default so the default goldens do not move; `SkyStrategy` is a registration; a draw-order change after M4 shifts documents with islands on.

### 3.12 M-SF — the SettlementForge connection (and the world after it)

**Settle inside M-SF.** The binding table and key law, `Identity.dossier` refs, host persistence, the port and seat binding the world milestones ride on (host requirements L139–140); the live absorb against CarriedFacts; the dating rungs and cadence; the staged records (ConditionOverlay, DepositSite, PowerRelation and others) becoming persistent; `hostContent` in live documents; the host-facing contracts going live: the bridge messages, `doc.snapshot.ready { outputVersion, schemaVersion, documentDigest }`, the `DossierDigest`'s SettlementForge-stage fields, the host store; item 88's readers moving output for dossier-born documents (T88-1's equivalence ends); the comfort-level wait for opening a map from SettlementForge; the crisis map rows (a closed mapping at the pinned baseline) (readers 4, 5, 7).

**The host contract's own compounding edges** (reader 6, section E; `docs/HOST-REQUIREMENTS-2026-10-18.md`): the canon (travel effort, water access, site facts; no geometry) is frozen into the host's record and changed only by a receipted re-canonize; native records are stamped with the cost-law version and geometry version, and the host keeps every geometry-1 record forever; trod ids must survive world re-derivation; the events window key switches from sequence to nonce as a declared shift; "a seed is a starting world, forever"; share codes gain a geography-source axis; every host row lands switched off and leaves output byte-for-byte unchanged when absent.

From the pipeline (reader 3): the host-facing report surfaces (`dossier`, `dossierNotes`, `changes` with `changeId`; first re-opened at M-W), and the points where the base already reads the staged port rows — the crime factor (L7547–7552), the hinterland import factor (L8608–8614), legitimacy and impairments (L7220–7224), `PowerRelation` (L6876) — each reading 1 while the rows are empty.

**Pass over at M-SF.** The values of the port rows, the ladder-record member rows and the cover rows (reader 3). The adapter per host line ("a registration, never a rewrite"); the audience table (host glue); `HostContext` (behind an input pin); the `BridgeTransport` wiring; VH (with the village); host screen re-pointing; lens presentation; the export bundle (opaque blobs); display names (never stored); party pictures; crisis-look drawing; the key list and ignore list; receipt, status, quarter and derivation rows.

**The world (M-W0h, M-W0–M-W5).** The hydrology core moves from `@plat/site` to `@plat/world` "under the same names" at M-W0h — a planned post-M1 dependency change that §16 says is "reported" as a shift (L20923–20929; L21721). V13's `world.*` concerns and W stage ids, and V14's `site` concern, G/E/R stage ids, the `site` Layer value and the `passage` role are not yet in the registries; they are append-only, so adding them is isolated — but it has to happen at M1's API pass, after which appending stays free and renumbering never is (reader 6, section D).

---

## 4 Where the deferral table stands (M0.md §4b, read as M1's inheritance)

Reader 6 classified the forty rows M0 deferred with a hook. **Thirteen compound** — the stand-in's outputs are already consumed, or the piece creates the first persisted form: S7's walls (the strip stand-in feeds S5 and S8 now; `Enceinte`'s staged fields persist from M1); the S2 roster (its outputs fan out to S5d, S6, the fields and S7b); S3's full form; S1's coast and islands (geology and the relief class are in the first golden; the golden suite runs four water settings); the deck strip and F-ROUTE (bridge states and `deckCm` persist; Q7/Q8 show the span is fragile); S7b, S9–S14 (the town's content every M2a edit and every later reader depends on; S12's milestone conflicts); the `.plat` document (the first persisted container; what really compounds is the recipe and manifest, since an M1 document is regenerated at M2a); the derivation pool (outputs invariant across pool sizes; it replaces the O(arena) per-batch image before S10/S11 at CITY); neighbour steps and `SeamContract` (M5 reads the seams of documents saved during M2a–M4); the waterfront's water-gate ids (collide across enceintes today); RH32, rendering, labels, exports and edits (new subsystems, no seam); the records tooling (every later milestone appends to it); the WASM/Clipper2 decision (a declared golden shift if taken after M1). **Eight are mixed**, **nineteen are isolated** by a true seam (the stretch-state Write protocol, frame growth at the cap, the later ladder rungs, the underground fixtures, the tests, tooling, CLI and reports).

The queue rows tagged M1 or later that touch compounding pieces: Q52 (S3's F-WALL refusals, "M1's by the rung order"), Q66 (the gate-id scheme across enceintes), Q79 (the `shape` role), Q89 (the level-discipline ruling S8's cost route needs, together with C2), Q90/Q93/Q105 (kernel rows parked to M4 whose closing will shift), Q98 (b-05a's floor change, now landable inside M1 as a declared shift), Q99 (a table not in the tables view hash: the recipe's pins must cover every table from the first recipe), Q77 (a 2^53 tie reachable at METROPOLIS, which enters M1's goldens), Q63/Q67 (declared skeleton shifts, cheapest before the first golden), Q51 (the API appendix M1's API pass starts from), L1/L29/L30 (API-surface and lifecycle-builder rows carried to M1's API pass), L13 (a lane name inside data; M1's schema), KI-3/4/5/8/9/11 (reader 6, section C).

---

## 5 Inconsistencies and gaps the readers found — settle these inside M1 or before it

Each is a place where the document, the code or the plan disagree, or where a contract the goldens will freeze is undefined. None is a bug in M0's code; each is a decision that gets expensive once the first golden exists.

1. **The persisted stage rank versus the append-only stage id.** Two readers read two different things, and both are in the document. Stage *ids* are u16 numbers added only at the end and never renumbered; stream and lineage keys carry the id, not the position, so "adding one moves no existing key" (L10184–10187) and inserting a stage is a local registration (reader 3). The kernel's kept-content *rank*, persisted one byte per face, is "the stage's position in §4.1's topological order, fixed per generator version" (L4548, L5538–5540) — a position, which an inserted stage shifts (reader 2). The two are consistent only if an inserted stage is an output-version bump and an upgrade re-derives the ranks by replay rather than reinterpreting the stored bytes; the document should say so in §3.9 (inferred; low severity if the upgrade replays, which §7.5 says it does).
2. **The op-kind rank behind the canonical op order is undefined.** It is the first key of the canonical sort (L4629); a new op kind must not re-rank existing kinds (reader 2, gap 2).
3. **Work-count identity is not required of accelerators or optimisations.** Counts choose ladder rungs (L4646–4647); the accelerator rule demands identical output, not identical counts, so count drift shows only where a golden happens to hit a limit (reader 2, gap 3).
4. **The transient arena's milestone is stated three ways**: `notBuilt('M6-P')` in the kernel façade and §4b; "open, read-back and release" in §16's M1 row; M-ENC's SE0 builds the form per amendments file u (L153–172); and L4969 contradicts itself in two sentences (reader 2, gap 4; reader 6, headline 4). M-ENC starts after M1 and is probably `readBack`'s first reader (inferred).
5. **Clear regions are used by generation before the fixtures that confirm them.** S5a's outer moats go through the carve path (L5791, L8551, L9027) in M1, yet the clear-region rules are confirmed only by M3a's fixtures, and their fallback changes the generation order of `moat: 'all'` (L4621–4623) (reader 2, gap 5).
6. **The canonical-form list is stale.** L4162–4164 names "the three part counters" and omits `nextSitePart` ("the canonical form's fourth part counter", L3867), `namespace` (L3866) and `worldRef` (L3865). The document digest is computed over the canonical bytes and M1 gates on a byte-identical save→load→save (reader 1).
7. **Gate rows M12 and M13** (V14's road access and hinterland faces) were added after the 2026-10-17 check and have no check evidence (reader 6).
8. **The registries lack the world's and the sites' ids** (V13 `world.*` concerns and W stage ids; V14 `site` concern, G/E/R ids, the `site` Layer value, the `passage` role). Append-only, so isolated — if appended at M1's API pass (reader 6).
9. **The knowledge filter lands after the content it withholds.** Concealed and hidden places are generated from M2b (L21696) but the admission filter lands at M3a (L21697); unless S14 fills the `knownTo` column (present from M1, L13278) and S13b applies the admission table from M1/M2b, M2b's exports carry secret names and M3a needs a declared view shift on the public-tier placement digests (reader 5, finding 5; inferred).
10. **The in-page `PlatApi` has no version axis**; only the bridge has one (`plat: 1`, L17525; `protocol` in `ready`, L17576). M3a settles it (reader 5, finding 6; absence confirmed by grep).
11. **GeoJSON's milestone tag disagrees** (M3a in §16, L21697; the metric variant's schema bump tagged M2b, L16962) (reader 5).
12. **JSON `plan` blocks are not reproducible across exports**: they carry whatever the session's cache holds (L16966–16969) (reader 5).
13. **Milestone conflicts in the plan**: S12a–c (M1 per §4b, M2b per §16); the full `GranularityLaw` and roofs (M1 per the M0 records, M2b per §16); II.5's M1 exit uses New random, an M2a action (reader 6, headline 4; `docs/build-prep/M1/scope.md`).
14. **`resolveVertexAt`'s rebind radius borrows §6.3's anchor radii** (L897–899): changing an anchor radius silently changes how saved vertex edits bind (reader 4). The anchor-radius fallback (L10752) is not called a declared shift while the partition fallback is (L10772), though both change which entity succeeds which.
15. **An additive schema change is an output shift**: the leaf hash includes "attributes in schema order" (L10444), so adding a field to a hashed kind moves the digest even when the change is additive (reader 4; inferred).
16. **Clone and save-as keep the namespace while `docId` is re-minted** (L10587, L10825–10827): a clone and its original share addresses, so a package holding both collides (reader 4; inferred).
17. **`Assignment.placed` is persisted with the event** (L12643); whether replay reuses or re-solves it is unstated (reader 4).
18. **Upgrade hand-offs are recomputed on every replay, never stored** (L12340); how an earlier `upgrade` event folds under a later version is unstated — its migrate cell is "—" (L12094) (reader 4).
19. **Water-gate ids collide across enceintes** (`gate:w<i>`, C-0244; Q66): the scheme must be settled before ids enter M2a's logs (reader 6).
20. **The M2a→M3a window** (section 2): no retention until M3a, so a shift released between them freezes edited documents (reader 1; inferred).
21. **§12.1's "none of them changes the model"** (L17842–17843) is contradicted by four pre-decided fallbacks that move output or format: R12-5 coarsens raster cells (L18402), R12-25 changes the document's block layout (L18422), R12-14 changes how warps validate (L18411), O14 (e) is "a declared shift" (L20680). Each is safe only on its stated milestone (reader 7).
22. **The core statistics record includes stage timings** (L18686) and is stored in the golden store (L20184); whether timings are excluded from comparison is unstated (reader 7).
23. **The hydrology move at M-W0h** (`@plat/site` → `@plat/world`, same names) is a planned post-M1 dependency change that costs a reported shift (L20923–20929; L21721) (reader 7).
24. **`TradeFlow`'s reach into the default preset** is unverified; the lattice "at the cap" for frame growth is taken from the hook text, not the code (reader 6).
25. **S10b at M1 is unstated.** §16's M1 row says "S0–S11", but M2b brings "S10b placement from the roster" and "the one placement solver at generation"; M1's placement rule is never stated, while the detour factor is calibrated at M1 (L7809; T16-4) (reader 3).
26. **Hidden-share base weights are "fitted at M1 on B-CITY"** (L7494), but passages, exposure and the hidden-share rows are M2b content (§16's M2b row) (reader 3).
27. **Secondary markets' seeds.** S6's grower lists each secondary market's claim among its seeds (L6830–6832), yet S7b (3) makes those claims after S6 (L7058–7066), and L6813–6815 says such a market seeds typing, "never its growth". District addresses follow seed order, so this must be settled no later than M2b, when N markets land (reader 3).
28. **Stage-end hard invariants.** §5.3 says a hard violation aborts the batch, but for stage-end rows (for example S7's roads = gates, L10042) the text never says which batch rolls back (reader 3).
29. **Arena part numbers in stage order.** Parts made at generation "take theirs in their stages' order" (§2.9); a new arena-creating stage that sorts before an existing one would renumber parts, and part numbers are inside addresses (reader 3; inferred).
30. **Bands under a flat field.** With M1's flat field the `FieldBands` cuts cannot divide built land by shares; the document does not say what M1's bands are (effectively one band until M2b; inferred) (reader 3).
31. **Harbour, bridges, canals.** M2b's row lists them, while S1's decks, S3's moats and the harbour pick's measurement are M1; read as M1 having the deck and route structure and M2b the furniture and canals (inferred) (reader 3).

---

## 6 Applying the strategy — the two conditions and the asymmetry

**Condition 1: "isolated" is earned by a seam, not asserted.** Before a piece is passed over, its seam must exist and be pinned: the fixed record shape has a contract test; the declared-shift path is wired (a change to it surfaces as a shift record, never silently); the versioned format has a reader for the old version; the registration slot refuses an unregistered id. Without that, deferring is accumulating debt into the goldens. The hardening protocol for an isolated piece is therefore the contract check, not the full twelve-round treatment.

**Condition 2: every deferred piece carries a queue row with its absorbing milestone and its deadline.** The deadline is the moment in section 2 after which the piece stops being cheap: the first golden for anything that moves output; M2a's log for anything addressed by an edit; M3a's retention for anything that bumps an output version; M4's version 1 for anything users keep. An isolated piece becomes a compounding one the day something persists against it.

**The asymmetry.** Calling a compounding piece isolated costs re-opened goldens, shift records and migrations of users' files. Calling an isolated piece compounding costs one extra check round. When the evidence is thin, the piece goes in the compounding bin. The readers were given a two-bin scheme and filled both bins; this synthesis moved pieces toward "compounds" wherever a reader's verdict rested on an inference it marked.

**The ladders are the seam that makes most pipeline changes local, with four exceptions.** Retries draw only from (entity lineage, concern, reroll, attempt); "no tier re-runs another stage or re-rolls anything outside the failing entity's scope" (L9920–9922). So changing a late rung changes output only on the entities that reach it, plus what sits downstream of those entities. Four things in the ladders are not isolated: the rung order and the detection thresholds (class floors, hard invariants); the attempt cap; the delivery-tier accounting that M1's acceptance reads; and the work-limit coefficients ("a change that moves output is a declared shift", L9851–9852). Hard invariants work the same way: adding or tightening one changes output only on the seeds that violate it, as a declared shift, except the rows that are preconditions later stages are written against (section 3.1), which must be right at M1 (reader 3, short answers 4–5).

**What the strategy does not change.** The bar for correctness. An isolated piece still gets fixed, just later and locally. "Isolated for correctness" is not "isolated for time": the timing phase measures whole stages, so a deferred heuristic can still blow a stage budget; the work-limit counters and budgets stay stage-level checks regardless of the bin.

---

## 7 Provenance and limits

- Read today, 2026-10-27, from `docs/ARCHITECTURE.md` at the design branch's head and the files named above; the readers' line numbers are exact against that revision.
- The classification of each piece is the readers' judgment, cross-checked in this synthesis against the other readers where ranges overlap (the kernel's role rows, the stretch-state profiles, the seams, the digest, the transient arena and the stage rank were each read by two or three readers and agree).
- Where a reader inferred (marked in the appendices), the synthesis says so. The largest inferences: the stage-rank reconciliation (gap 1), the M2a→M3a window (gap 20), the additive-schema shift (gap 15), M5's shift of the default goldens, the first reader of `readBack`, and M1's bands under a flat field (gap 30).
- The pipeline reader (§4–§5) was killed by a container restart at 23:01Z and re-run from scratch at 23:03Z; its report is the re-run's.
- Not covered: the volumes' own internals beyond what they require of the base; the village product's milestones V-M0–V-M4 (they use the base's hooks); M3c (the clerk, isolated behind the tool API).

---

## 8 The sequence — the owner's rule on exits (2026-10-28, J567)

**The owner's word (2026-10-28 ~00:05Z):** "So for everything that is compounded that is automatically supposed to be hardened to the fullest extent before proceeding to the next phase. Put that in the sequence, please." Recorded as THE MILESTONE EXIT RULE, vetoable in its reading, binding in its word:

1. **Every piece this map classifies COMPOUNDS for milestone N is hardened to the fullest extent inside milestone N, before milestone N + 1 starts.** "The fullest extent" is M0's bar, the one this programme already runs: hardening rounds until an independent closing check PASSES on the evidence — the targeted mutants killed or shown equivalent, NEAR and RELATED@1000 green, the refusal census at zero on lawful input (J264), the §5.3 invariants, the goldens where they exist, the clean-room and choices rows written — and, for a contract, its seam pinned by a contract test on the consumer's side even when the consumer is a later milestone (M1 pins the seam records M5 reads; M2a pins the log fold M3a replays). "Thoroughly" keeps J265's meaning: to the evidence, not until no reviewer can imagine anything more.
2. **A compounding piece that is a decision, not code** (the address namespace, the engine choice, the band ids, the milestone of the transient arena, the items of section 5) is "hardened" when it is DECIDED, recorded as a choices row or a J-row, and its consequence pinned by a test, before the first golden that would freeze it.
3. **ISOLATED pieces take the contract check only** — the seam exists and is pinned — plus a queue row naming the milestone that absorbs them and the moment after which they stop being cheap (section 6). **MIXED pieces harden their contract part to the bar** and treat their implementation as isolated.
4. **The lists of section 3 are the exit checklists.** A milestone's `MilestoneRecord` (§13.3) exits only when every COMPOUNDS line of its list is closed by a landed check, or ruled by the owner; the gaps of section 5 that fall inside a milestone are on that milestone's list.
5. **The order of milestones stands; the gates between them are now these checklists.** M0 → (the Mac steps, the re-budget-or-redesign decision, a-16's API rows, the ultra review; J558) → M1 → M2a → M2b → M3a → M3b → M4 → M4b → M5 → M6-P → M6-U → M6-E / M6-sky → M-SF → M-W, each exit = its compounding list hardened to the bar. The AFTER-M-1 items and the volumes' own milestones keep their start conditions (C-0071).
6. **The asymmetry stays the tie-break:** when a piece's bin is in doubt, it is COMPOUNDS and takes the bar.

*The session's agreement, with two refinements (J567):* yes — the rule is M0's own protocol applied where the map says it buys the most, and it is what makes passing over the isolated pieces safe. The refinements: (a) the bar is the closing-check protocol, with its stopping rule (a PASS on the evidence), so "fullest extent" never becomes an open-ended round count; (b) a compounding contract whose consumer is a later milestone is hardened by writing the consumer's contract test now, in its own milestone, not by waiting for the consumer.

---

# Appendices — the seven readers' reports, verbatim

Each appendix is one reading seat's hand-back (Opus 5.5, high; 2026-10-27 22:2xZ–23:3xZ), unedited. Line numbers are `docs/ARCHITECTURE.md` at the design branch's head unless the report names another file; "(inf.)" marks the reader's own inference.


## Appendix A — §1–§2: the one-page summary, scope, stack, milestones; the domain model and schemas

### Compounding analysis: ARCHITECTURE.md lines 1–4285 (one-page summary, §0, §1, §2.1–§2.9)

**Scope.** I read lines 1–4285 in full. Where I skimmed, I say so: only the long middle of the raised-way crossing table (≈L2990–3355). To place pieces in milestones I grepped four outside passages and read nothing else:
- §16's milestone rows (L21692–21726)
- §13.3's golden and shift protocol (L20179–20263)
- §6.4's version axes (L10850–10870)
- the opening of §7.5 on migration (L12286–12320)

Mechanism letters: (a) fan-in, (b) evidence, (c) persistence, (d) identity/determinism, (e) performance substrate. "Lnnnn" means a line in docs/ARCHITECTURE.md. Rows marked M0 are listed only as the substrate M1 relies on.

#### Table

| # | Piece | Where | Built | Direct consumers | Contract later code relies on | Re-done if changed one milestone later | Verdict | The doc's own freeze/defer words |
|---|---|---|---|---|---|---|---|---|
| 1 | Rung names, population bands, the 1 500 seam, `LadderRouter` and ladder-end refusals | §1.1 L328–336, L391–407; `Recipe.rung` L3897 | M1 (all three rungs; refusals in the port's tests); M3a absorb; village V-M; M-SF live | `Recipe.rung`, RungProfile rows, the dossier port, village product, rung at an epoch, per-rung goldens | Lower-inclusive bands; `route(population)`; `E_RUNG_UNAVAILABLE`; reported clamps | Goldens at band edges, B-DOSSIER-lite, the host's refusal handling, the village hand-off band | MIXED: rung names and refusal class (a)(c); band numbers are `ladder.json` cells; product routing is a registration seam | "both 1 500 inhabitants (D-33)" L330; "All three rungs generate from M1 … M2b measures and tunes it" L334–336; "`LadderRouter` reads that registration" L393; "a reader without that product refuses to replay" L3897 |
| 2 | RungProfile / `ladder.json` and population-scaled budgets | §1.1 L338–389 | M1; M2b confirms modifiers and tunes METROPOLIS | Frame, S2 stage rows, granularity, greenery, laws, §12 budgets, §13.6 matching, II.6/II.7 | Row shape; "every quantity … computed from that population, never from the rung's target" L333 | Shape: every reading stage. Values: one table version | MIXED: shape (a); values ISOLATED | "one versioned data table … calibratable" L338; modifiers "Pre-decided fallback … set to neutral" L387–389; budgets are "laws of its building count" L375 |
| 3 | One-click default; emulation-first defaults and parity presets | §1.2 L409–425; L478 | M1 (`ink`, emulation markers, MFCG/FTG presets); M2b `lit` | Short permalinks, default goldens, D-5 panels | Defaults pinned per output version; params are a "delta over the pinned shipped defaults" L3901 | Model default: one output-version shift. Style default: style version only | ISOLATED (declared shift) | "Every improvement ships behind the defaults" L424 |
| 4 | Fusion thesis: per-stage adopt/discard choices and the fused layout's regime split | §1.3–§1.4 L427–491 | M0 spike; M1 on real terrain; M2b parity | All downstream stages, §13.5 parity rows, D-5 (M1 diagnostic, M2b, M4, M5), M-CAL | Partition and bent cut inside walls, staged growth outside, one graph; measured signatures | Changing the regime after M2b moves every downstream golden and the rated renders | MIXED: regime split and signatures (b); per-stage algorithms and constants ISOLATED (stage-isolated goldens) | "measured at M0 … and again at M1 on B-CITY-lite's river, coast and relief" L490–491 |
| 5 | Incremental growth path | §1.5 L493–499 | M4; engine M6-E | M6-E, M-SF absorbs, village growth, frame growth | An epoch is a logged event on the persisted plat; survivors are never re-rolled | Epoch events in saved logs; the "0 re-rolled survivors" bar | MIXED: epoch contract (c)(d); scheduling engine ISOLATED | "exactly one incremental path … at M4 … M6-E on §4.11's interfaces" L497–499 |
| 6 | Stage-2 seam: SeamContract, TypedBoundary, Seam records, fabric registry | §1.6 L501–505; L654–658; §2.5 L1139–1162 | M1 (SeamContract on every district is an M1 gate); M5 fabrics | M5 close-ups, II.5, village fabric, V01 seam typing | District boundaries are always L1 edges; `District.seams` and `District.fabric` persisted | M5 would re-derive every district's Seams in every saved document | MIXED: invariant and Seam records (a)(c); each fabric ISOLATED | "SeamContract from M1" L503; "every further fabric is a registration" L1159; boundary "never serialised" L1142 |
| 7 | Worker topology and derivation pool | §1.7 L514; L951–960; L4036–4046 | M1 | Per-district stages, verification replay, §12.8 memory | Any pool size gives identical digests; district = index partition = chunk unit | Pool size: nothing. Partition unit: re-chunk documents and copy-on-write checkpoints | MIXED: pool ISOLATED; partition unit (a)(e) | "identical digests by construction" L4039; "same units as §7.4's copy-on-write checkpoints" L4134 |
| 8 | Units, frame orientation, unit vocabulary, LatticeSpec | §2.1 L539–559; L603, L614 | M0 lattice; M1 schema lint and `Unit` list | Every record, table cell, export, V11/V12 units, replay rebind radii | i32 cm, +x east / +y north, centidegrees only, unit-branded names, lattice constants | Every stored coordinate and every golden | COMPOUNDS (a)(c)(d) | "fixed for the arena's life" L603; "a schema lint refuses a length field with neither" L544; V11/V12 units "each exactly its present set" L557 |
| 9 | Numeric core: exact predicates, own boolean/buffer engine, `dmath` (M0) | §1.7 L515–517 | M0 | Every geometry op; five-engine digest identity | One engine on every host | Model digests of every golden and document | MIXED: (d)(e); CI oracles and a byte-identical WASM accelerator ISOLATED | "one engine means one hash on every host" L517; "byte-identical WebAssembly accelerator behind the kernel façade" L515 |
| 10 | Rendering backend and text metrics | §1.7 L518–519 | M1 ink/Canvas2D/SVG/PNG; M2b light pass; M3b night lights | §8, PNG goldens, label placement digests | Canvas2D is the reference; the CPU light pass is the golden reference | PNG goldens and S13b view shifts; never the model digest | ISOLATED (style version; GPU path "drawing no marks"); weak (b) | GPU-only light pass rejected "(exports and goldens would differ by device)" L518 |
| 11 | Rule-table format and slice citation | §1.7 L520; §2.8 L3604, L3763–3766 | M1; M2a records digest; M3a tables editor | Every stage, `tablePins`, derivation/naming records, §7.6 invalidation, V11, V12 | `{value, unit, provenance, calibratable}` per cell; slice kind, key and hash | A slice-scheme change rewrites every persisted record and changes table-edit invalidation | MIXED: schema and slicing (a)(b)(c); values ISOLATED | "§7.6 invalidates on slice-hash change" L3766 |
| 12 | Tooling, repository, dependency adapters | §1.7 L520–524 | M0–M1 | CI | Adapters around third-party code | Local | ISOLATED | "every third-party routine behind our own adapter … swap-ability" L524 |
| 13 | Layers, arena parts, part counters | §2.1 L560–585; L3863–3876 | M1 (`site` value appended at M1's API pass); parts used at M3a, M4 hooks, M6-U, M6-sky, M-SITE-A | `Identity.key`, address prefixes, display list, exports, closure records, replay | Part numbers allocated once and never reused; counters never decrease | Renumbering rewrites addresses in every log and export | COMPOUNDS (c)(d); a new layer value is an append-only seam | "never reused … part of its entities' keys and addresses" L574–577; "K1's append-only test" L562; "a replay reads it there, never recomputes it" L3873 |
| 14 | Address ids and Identity | §2.1 L586–594; L1116–1119; L3570 | M1; lineage minting at M0 | M2a edits/locks/pins/undo; M3a assignments, warps, bridge, GeoJSON; exports; people; M-SF bindings | `kind:token` with arena prefix; parent is a field; streams keyed from lineage; no stored seeds | Every log event, lock, assignment, export id and host binding | COMPOUNDS (a)(c)(d); the most fanned-in contract in the range | "edits, locks, assignments, pins, labels, households, exports and hosts point at" L586–590; parent "never parsed from the id" L593; upgrade matching "nothing is matched by string equality" L12302 |
| 15 | Arena in-memory layout and memory model (M0) | §2.2 L600–640, L946–960 | M0 | Kernel, pool copies | None outward | Kernel-internal | ISOLATED ((e) as a cost model only) | "its layout never reaches an output" L625; "≈ 12 MB (PLAUSIBLE until M0)" L949 |
| 16 | Five levels as views, route semantics, single insertion door, batch validation (M0) | §2.2 rules 1–4 and 8, L649–799, L943 | M0 | Every stage, FaceRef, per-level digests, lazy stages, undo, stage 2 | L0 land/water … L4 footprints; finer never moves coarser; typed refusals | Every stage, digest and laziness proof | COMPOUNDS (a)(d) | "no level-n result depends on whether or when a finer level was derived" L729–731 |
| 17 | References by role and the role registry | rule 5 L800–830; rule 7 L906–942 | M0; roles appended at M3a, M6-U, M-SITE-A | Every record of §2.4–§2.7; digests | Role refs only; no stored slots or positions; role rank then address id orders digests | Renaming or re-ranking a role moves every digest | MIXED: existing roles (a)(c)(d); appending a role is a seam | "never by an interned handle" L909; "appended without digest change, K5" L913 |
| 18 | Chain-attribute profiles (knot, cut/join, stretch-state) | L831–892 | M0; M1 widths and bank kinds; M2b wall condition; M3a retaining state, `laidAt` | Kerb, bands, exports, digests, V06, V12 | Knot roles, interpolation, exact cut knots, one canonical step form | Digests of every profiled chain | COMPOUNDS (c)(d); a new profiled attribute is local | "the digest hashes its values with the knot rows" L841; "one form, so the digest … is stable" L871; "*Migrate:* absent reads the default" L891 |
| 19 | Positions in the log (`VertexSig`, `resolveVertexAt`) | L893–902 | M2a fold; M3a vertex moves, warps, upgrade replay | Replays, upgrades, orphan table | Stored point plus signature; bind order exact → nearest by signature → orphan | Saved logs would bind differently | COMPOUNDS (c)(d) | "never bound by distance alone, so an upgrade replay never moves an unrelated vertex" L900 |
| 20 | Terrain and hydrology rasters with accessor seams | §2.3 L962–1049 | M0 spike; M1 S1 (geology and relief class "in the first golden"); M-W0h groundwater | Every stage via the sampler, `deriveBase`, basements, context vector, sewers (M6-U), V13 | Cells by rung; whole-cell growth; Int32 cm above datum; fixed D8 tie order; terrain not in the plat | Changing D8 or the flood moves river courses and every water golden | MIXED: S1 determinism and "not in the plat" (b)(d); readers behind `datumOf`/`windOf`/`waterTableAt` ISOLATED | "READ ONLY THROUGH `datumOf(doc)`" L966; "read as absent until M-W0h" L975; fixed D8 order L1040; coarsening fallback L1028 |
| 21 | Water bodies (incl. oasis) and slow-change conversion hooks | L993–1009, L1050–1091 | M1; M2b irrigation, harbour; M3a water operator; M4 hooks; M6-E | S1–S12, water term, outfalls, bridges, mills | Kind list; shore profiles; control-knot ordinals; causes `convert:<kind>` | Saved `controls/<ordinal>` edits and lifecycle causes | MIXED: shape, ordinals, causes (c); new kinds and oasis additive | "an ordinal never names two knots" L1000; oasis "absent `spring` is a body with no spring" L1067 |
| 22 | Ways and junctions | §2.4 L1092–1135 | M1; M2b `slopeP95`; M3a `aqueduct`, `raised` | All later stages, router, exports, V01, V04, V06 | WayClass list; spine ref; width scalar or profile; NodeRef ends | Class-keyed tables and every document | MIXED: record and list (a)(c); derived readings and load-time fills ISOLATED | "written on load by S9's rule" L1131; `wayFall` "a reading, never stored" L1108 |
| 23 | District record | §2.5 L1139–1157 | M1 core; M2b item-72 fields; M5 fabrics; M6-U undercity fields | Typing, naming, labels, stage 2, epochs, dossier | Kind is a row key; faces are an L1 ref; identity and pressure are model data | Core: digest and migration. Derived fields: nothing | MIXED: core, identity, pressure (a)(c); character, `bandRange`, boundary ISOLATED | character "recomputed on load, outside the model digest" L1143; identity "model data in the digest" L1144 |
| 24 | Reservations | L1171–1180, L1291 | M1 S3; M2b market ranks; M5; V05/V07/V14 kinds | S4 attach points, castle, S8/S10 barriers, sky, village, world sites | Barrier faces, attach vertices, kinds | Placement drives arterials, so every town golden | COMPOUNDS (a)(b); new kinds additive | "the large claims made before the streets" L1291 |
| 25 | Allocation (with SubDistrict) | L1181–1185, L1297–1306 | M1 | Every lazy/per-district stage, M2b roster, M5 template land, sky, village | Eager, persisted, no stream key | The order-independence (LC-2) proof and every saved allocation | COMPOUNDS (a)(c)(d) | "the eager content decision every lazy or per-district stage honours … stores no stream key" L1185 |
| 26 | FieldBands (band set and middle band) | L1186–1189; L2147 | M1 flat field; M2b default band set | Every band-keyed row, `builtBand`/`fieldBand`, derivation records, geometry floor, plan chain | Band ids, cuts, hysteresis, `middle` | Band-keyed rows, stored band strings, plan chains | COMPOUNDS (a)(c) for band ids; the middle designation ISOLATED | "computed once per town at S6" L1189; "a changed middle designation needs no migration" L1217 |
| 27 | Block, Frontage, Plot and site-plan parts | L1192–1241, L1307–1334 | M1 core; M2b granularity and items 30/70; M3a decks and platforms; M4 band columns; M5 `Block.content` | Buildings, households, yards, split/join edits, assignments, exports | Plot is the L3 parcel and lineage unit; ≥ 1 access edge; one shared party-wall edge; slot shapes never stored | Yard, building and household addresses; M2b parity | MIXED: parcel unit and persisted columns (a)(c)(d); site-plan algorithms ISOLATED; additive fields have load defaults | "'ordinary' … before M5" L1198; slot "persisted: no polygon" L1240; tenure "derives it at first load" L3820 |
| 28 | ContextVector | L1242–1276 | M1 | Every rule table, `BuildingInput.ctx` (M6, M6-P), village, derivation-record digest | Field set and meanings; columnar storage | Every plot's context digest and table predicates | COMPOUNDS (a)(b) | "the one per-plot vector every rule table reads" L1242; columnar L1257 |
| 29 | Building record and base wings | §2.6 L1335–1391, L1558–1573 | M1; M2b; M3a stacked/solid; M6; M6-P | Footprint hash at every LOD, stage 3, plan, `wings/<key>` edits, shadows, 3-D | Footprint = union of wings; stable, never-reused wing keys; row quads stored as built | Edit paths, per-wing streams, stored compositions | COMPOUNDS (a)(c)(d) | key "never changed, never re-used … edit paths … and stage 3's per-wing streams name the wing by it" L1365–1367 |
| 30 | Wing-carrying rule (`carryWings`) and stored-composition carry | L1574–1713 | M1 first carry; M3a warp validation and cost bar; M6, M6-P stored records | Every footprint-changing batch, warps, M5 neighbour step, stored compositions and plans | Pure arithmetic; boundary runs by identity; rounded mean-value coordinates | After M3a, logged warps would replay to different rings | MIXED: arithmetic (c)(d) from M3a; check scheduling ISOLATED (pre-decided fallback) | "store the same bytes (O9 (c))" L1592; orphaning "never silently" L1703 |
| 31 | Heights and ground datum | L1714–1752 | M1; M2b half raise; M3a levelling | Shadows, 3-D export, storeys, entrance storeys, clearances | One `deriveBase`; plinth; skirt splits into stepped wings | Every building's heights | COMPOUNDS (b)(c); plinth/skirt values ISOLATED | "One per-entity function" L1716; "the half raise ships with the basement gate at M2b … so no document's datum shifts" L1953 |
| 32 | Building class vocabulary and materials | L1392, L1408, L1753–1778 | M1; M2b; M-SF class rows | ClassRules, templates, allocations, `Use.cls`, Find chips, class family | Class id is "the one vocabulary"; material is rendering only | Renaming a class touches allocations, uses, assignments, view keys (via table-migration rows) | MIXED: class ids (a)(c); materials ISOLATED | "A material is a rendering attribute only" L1756; "table-migration row … before M6 ships any document" L1517 |
| 33 | BuildingGenerator interface, stage-3 contract, base outline builder | L1501–1514, L1526–1554, L1785–1849 | M1; M3a stepped/oval; M6; M6-P | Every LOD, export, shadow, tile, plan | Composed union = outline union exactly; base storeys; budgets; stepped construction reproduced byte for byte | Footprint hashes at every LOD and all goldens | MIXED: interface and contract (a)(b)(d); implementations ISOLATED | "the base keeps the interface, the contract and the budgets" L1789; "equals the outline's union exactly" L1797; intake fallback L1844 |
| 34 | Entrances and basements | L1485–1500, L1850–1990 | M2b; M3a door storeys, `basementDoor`; M4 requested basement; M-W0h water table; M6-U crypt | Plan, porch, VTT doors, door lights, V04 accesses | Entrances are vertices with stable ordinals; the Basement record | Openings, lights, programme anchors, access points | MIXED: ordinals and record (c)(d); basement gate ISOLATED behind `waterTableAt` | ordinal "stable … `nextEntrance`, which never decreases" L1891–1893; the water-table switch is "reported as the version's shift at M-W0h's landing" L1920; crypt "built at M6-U, absent before" L1927 |
| 35 | Plan-rung hook, elaboration record and cache, damage layer | L1413–1477, L1991–2136; L3692–3714 | M3a hooks; M6-P rung | M6-P, M6 rooms rung, V04 access heads, VTT, the clerk | Room address `room:<building>/<level>/<i>`; `plan.*` concerns; plan events; canonical prior | Once plans are stored (M6-P), these ids bind saved edits | MIXED: hook ids (c)(d) from the first stored plan; algorithm and cache ISOLATED | "adding the rung is a registration" L1998; "Rooms are values … no digest" L2081; cache "outside the model digest and outside the records digest" L3713; damage "no id minted" L2097 |
| 36 | Interior ladder and capacity function | L1478–1484, L2137–2260 | M2b capacity; M3a ladder rows, re-letting, re-homing | Generation fill (population bar), re-letting, F-PLAN, dossier re-provision | One integer capacity from shell facts at the poorest band; capacity bounds | Households per building in every golden and document | MIXED: capacity (a)(b)(c); ladder values ISOLATED | "Every host computes the same integer" L2191; plan constants "shipped … at M2b" L2186 |
| 37 | Walls, gates, towers, castle, bridges, wall condition by run | §2.7 L2266–2302, L2496–2542 | M1 S7 (bridge sites at M1 is my inference); M2b condition, built bridges, harbour; M3a repairs, `laidAt`; M6-E | Strips, setbacks, gate law, VTT walls, per-run lines, V01, V06, V12 | Both wall faces unbuildable; gates exactly where arterials cross; condition, material and epoch written together | Plots near walls, VTT exports, V12 run merges | MIXED: records and invariant (a)(b); condition by run additive, but its per-run export split feeds V12 (b) | invariant "is hard (§5.3)" L2497; "*Migrate:* … `standing`, `robust` and epoch 0 throughout" L2540 |
| 38 | Item-110 records: raised ways, retaining walls, deck plots | L2303–2344, L2543–2590, L3404–3481 | M3a; arch vaults M6-U; decay M6-E | V01 (M5), V04 (M6-U), V05, V06, V07, V09, exports | Own ground part per deck; support keys minted once; reason address from a hash; "kept from creation"; deck suppression keys | V05/V04 references and suppression keys in logs | COMPOUNDS (c)(d); span/pier constants and `stepProfile` ISOLATED | keys "minted … and never reused" L2576; "**Kept from its creation; later work gives way.**" L2578; vault "built with the underground layer (M6-U)" L3428; `stepProfile` "never stored" L3441 |
| 39 | §2.7's laws for raised ways meeting walls (tiers, Order, Laws 1–4, the check) | L2590–2906; worked examples L2906–3402 | M3a; extended at M6-E, M6-U, M6-sky, village | "every op on every path" | Tiers; "held" means locked; Order fields `laidAt`/`courseAt` in the records digest; Law 4 re-check; property bar T110-4 | Every op family added after M3a, and replay of logged hand edits | MIXED: the laws (a)(c)(d); the worked-example tables ISOLATED (non-normative) | "normative (J146)" L2592; "LAW 4 — every op re-checks" L2872; "That bar is what makes a missing example harmless" L2904; examples "non-normative" L2906 |
| 40 | Greenery, land use, site resources, decorations, pins, HoodPlace, InstanceOverride | L2345–2377 | M1 SiteResources and Pin rows; M2b greenery; M5 HoodPlace producers | Renderer, exports, V01, V05, V06 | Trees generated at render; overrides are instance events | A rule change is a declared shift | ISOLATED, except InstanceOverride (c) and the strict cross-engine GeoJSON-with-trees golden from M3a (b) | trees "generated at render and never stored" L2355; Pin "from M1" L2370; HoodPlace "no producer before M5" L2371 |
| 41 | Content records and the one-way reference | L2378–2412, L2491–2495, L3483–3506 | M1 households and relation-store schema; M2b uses; M3a relocation; M4b relation store; M-SF notables | People, sim module, plan units, dossier binding | Content points at geometry, never the reverse; household address stable; `tableVersion` | People keys, bindings, plan units | MIXED: identities (a)(c)(d); people derivation ISOLATED | "Content references geometry by id and never the reverse" L2493; "People are derived, and never materialised" L2492; `tableVersion` L2393 |
| 42 | MaterialLedger, Works, LightSource | L2392, L2450–2460 | M3b placed lights; M4 ledger and Works by hand; M6-E | Epochs, clearance, plan drawing, light pass | Works are model data with the stage derived | Saved documents with Works | MIXED: Works and ledger (c) from M4; lights ISOLATED | Works stage "derived … never stored" L2455; derived lights "never records" L2459 |
| 43 | Staged records declared schema-complete and empty (underground, sky, dossier, world/site) | L565–568, L2413–2489, L3508–3541 | Declared M1 and M3a; underground hand tools at M4; filled M6-U, M6-sky, M-SF, M-SITE-A | Volumes 4, 5, 8, 14 | Shapes and registry rows; readers read nothing until filled | Cheap while empty; from M4 documents can hold them | MIXED: ISOLATED while empty; COMPOUNDS (c) from the first milestone that stores them | "schema-complete and empty … each built by its volume" L2413; "read nothing until then" L3529; "need no change of the model" L535 |
| 44 | Entity-record anatomy and digest membership | §2.8 L3545–3605 | M1; M2a records digest; reason record reserved at M1 | Load checks, goldens, locality audit | Identity, lifecycle, attributes → model digest; derivation, naming, reason, Order → records digest; provenance and elaboration → neither | Moving a field between digests re-roots every document and golden | COMPOUNDS (b)(c)(d); record shapes go through the schema chain | "the records' encoding is the file schema's" L3997 |
| 45 | Fact tiers, dossier refs, dossier paths | L3607–3634, L3831–3847; L123 | M1; M3a refusal and absorb; M-SF | Edit refusal, `plat:tier`, tool API, port | Three tiers; `Identity.dossier` in the model digest; one port | Host bindings | MIXED: (a)(c); the `factTier` derivation and the adapter ISOLATED | "derived at read, never stored" L3619; "through the port … none reaches a record by another route" L3843; "One adapter reads SettlementForge's file" L123 |
| 46 | Lifecycle: existence plus flags, events, decline mapping, suppression, event block and archive | L3576–3588, L3635–3691, L3716–3728 | M1 schema; M2a locks, pins, undo; M3a suppression; M4 decline hooks | Edit rules, engine ladders, undo/redo, bridge, tombstone ids | One existence value plus flags; tombstones keep ids; suppression keys and one lift rule | Every saved lifecycle block and engine mapping | COMPOUNDS (a)(c)(d); conversion table and compression ISOLATED | "no code tests a single state value" L3636; "every state exists in the base schema" L3664; "an id is never minted twice" L3723; "One lift rule for both forms" L3689 |
| 47 | Derivation, naming and provenance records | L3589–3603, L3729–3762 | M1; M2a; M3a dormant naming record | Regenerate (keep settings), naming re-draws, audit, V10 | Derivation and naming records persisted; provenance never persisted | New fields: a declared records-digest shift | MIXED: derivation and naming (b)(c); provenance ISOLATED | "a declared one-time shift of the records digest's goldens …, the model digest unmoved" L3733; provenance fallback "coarser, never unsound" L3761 |
| 48 | Entity registry and completeness test | L3767–3830 | M1; rows appended at every milestone | Every kind's encodings, edit kinds, renderer, exports, explainers, `z` | The column set plus the CI test | A new column forces every kind's row | MIXED: columns (a); adding a kind ISOLATED | CI test "fails when a type is missing from any of those paths" L3783; `z: ZDecl` required L3782 |
| 49 | Document = base plus ordered log | §2.9 L3850–3943 | M1 empty log; M2a log and fold; M3a rebase and upgrade | Every client, bridge, host store, replay | Single source of truth; `nextSeq` never decreases; a rebase never removes events | Every saved log | COMPOUNDS (a)(c)(d) | "a rebase never removes events" L3862; `nextSeq` "never decreases" L3863 |
| 50 | Recipe and permalinks (with HoodRecipe) | L3891–3918 | M1 (links marked preview); M3a packs; M5 HoodRecipe | Replay, `&r=` links, goldens | Every model input and nothing else; salts only on re-rollable concerns | Links users keep outside any document | COMPOUNDS (c)(d) | "every model-affecting input and nothing else" L3895; "a geometry concern can never carry a salt" L3907 |
| 51 | Snapshot, `.plat` container, canonical form, four digests, size budget | L3923–3927, L4117–4167 | M1; M2a records digest; M3b compact twin | Every load, frozen views, bridge, host storage | Geometry once with birth levels; fields recomputed on load; chunk units; canonical field list | The save→load→save identity and the document digest | MIXED: canonical form and digests (c)(d); encoding and size fallbacks ISOLATED | "lossless and output-neutral, so no golden moves" L4148; canonical list L4162–4164 (see the inconsistency below) |
| 52 | Load procedure and mismatch resolution | L3982–4116 | M1 steps 1, 2, 3, 5; M2a verification and choices; M3a rebases | Every saved document; bridged clients | Checks under the saving version; frozen view never root-checked; mismatch never silent | Bridged convergence | MIXED: semantics (c); budget fallbacks ISOLATED | "A frozen view is never checked against its recorded model root" L3988; M1 documents regenerate from their recipe L4113–4115 |
| 53 | Side-blocks: packs, host content, dossier block, skeleton file | L3944–3981 | M3a; M-SF | Replay without pack or host; host undo; skeleton import | Pack identity by content hash; 2 MB cap; dossier block rebuilt by the fold | Every document that carries packs | COMPOUNDS (c); the cap value ISOLATED | "a hash mismatch opens the document read-only … never a replay with other content" L3974 |
| 54 | View state and per-viewer keys | L3928, L4168–4281 | M1; M3a knowledge; M3b weather; M5 Find; M-SF season follow | Renderer, export framing, bridge | Outside every digest; last-writer-wins per key; per-key migration on load | Local | ISOLATED (the `knowledge` key drives export withholding; goldens use tier public, L4175) | "a viewer never writes the model" L4201 |

#### Per milestone: what to settle within it, and what can wait

**M1**

Settle within M1 (★ = highest fan-in):
- ★ Address ids and Identity (14). Mechanisms (a)(c)(d). First re-opened: M2a, when logged edits, locks and pins start carrying addresses.
- ★ Units, frame orientation and lattice (8). The substrate for every M1 golden and every logged point from M2a.
- ★ Entity-record anatomy and digest membership (44), and the registry's column set (48). First re-opened: M2a, when the records digest joins the snapshot.
- ★ ContextVector field set (28) and Allocation (25). First re-opened: M2b, whose tables and roster placement key on them.
- Plot as parcel and lineage unit, with the access guarantee (27). Re-opened at M2a (split/join edits) and M2b (granularity).
- Part counters and the canonical field list (13, 51). Re-opened at M2a and at M3a (deck parts).
- Recipe (50). Re-opened at M2a and M3a (links and documents must replay).
- Rule-table cell schema and slice scheme (11). Re-opened at M2a and M3a.
- District as a group of L1 faces, plus SeamContract (6). Re-opened at M5.
- Reservations (24). Re-opened at M2b.
- Way record and WayClass list (22). Re-opened at M2a.
- Building record and wing keys (29). Re-opened at M2a, M3a and M6.
- BuildingGenerator interface and stage-3 contract (33). Footprint hashes are in goldens from M1; re-opened at M6.
- Height datum (31). Re-opened at M2b (shadows).
- Class vocabulary (32). Re-opened at M2b and M3a.
- Wall records and the unbuildable-faces invariant (37). Re-opened at M2b and M3a.
- Terrain/hydrology determinism (20). Re-opened at M2b (relief tier).
- Water control-knot ordinals (21). Re-opened at M3a (`moveCourseKnot`).
- Household identity (41). Re-opened at M2b and M4b.
- Lifecycle schema and tombstones (46). Re-opened at M2a.
- Derivation and naming record shapes (47). Re-opened at M2a.
- `factTier` and dossier paths (45). Re-opened at M3a.
- Rung names and refusal class (1). Re-opened at M3a.
- RungProfile shape (2). Re-opened at M2b.
- The pool's district-partition unit (7). Re-opened at M2a.
- Load steps 1, 2, 3 and 5 (52). Re-opened at M2a.

Can be fixed later in isolation:
- Arena layout: never reaches an output.
- Pool size: identical digests by construction.
- Snapshot encoding and size fallbacks: output-neutral.
- Provenance: rebuilt by replay.
- RungProfile values and rung modifiers: table cells with pre-decided fallbacks.
- Per-stage algorithms and constants: one declared shift each.
- Defaults and preset values: pinned per output version.
- Rendering and text: style version or view shifts.
- Oasis and site-resource rasters: load defaults.
- Materials: rendering attribute only.
- The derived district boundary.
- Declared-empty future fields (HoodPlace, `Block.content`, groundwater, reason record, projection key). Exception: `z: ZDecl` is consumed by the display list from M1.
- View state; tooling and dependency adapters.

**M2a**

Settle within M2a:
- ★ The log and its fold, `nextSeq`, and "a rebase never removes events" (49). Re-opened at M3a, where an upgrade replays the whole log and the bridge must converge.
- The records digest (44, 47). Re-opened at M3a (retention checks).
- `VertexSig` and the rebind rule (19). Re-opened at M3a (upgrade replays, warps).
- Lock/pin/edited flags and the non-append-only lifecycle block (46). Re-opened at M3a: the raised-way laws define "held" as locked, and bridged undo must converge.
- Suppression written by `delete`. Re-opened at M3a (re-adding generators).
- Mismatch semantics and the kept-snapshot rebase (52). Re-opened at M3a (bridged install).

Can wait:
- Verification-replay scheduling and pause: scheduling only.
- Lazy index rebuild at load: output-neutral.
- Block-group chunking of rebased documents: output-neutral.
- Undo caps: never canonical.

**M2b**

Settle within M2b:
- ★ FieldBands band ids (26). Re-opened at M3a (interior-ladder rows keyed by band name) and M4 (`builtBand` and the geometry floor).
- ★ The capacity function (36). Re-opened at M3a (re-letting and re-homing) and M6-P.
- Entrance ordinals (34). Re-opened at M3a (door storeys), M3b (VTT doors, door lights) and M6-P.
- Basement record and the half raise (34). Re-opened at M3a, M4 (requested basement) and M6-U.
- Exposure, known-to and tenure (27). Re-opened at M3a (knowledge filter and export withholding).
- District identity and pressure (23). Re-opened at M4.
- Use record (41). Re-opened at M3a.
- Wall condition by run and its per-run export split (37). Re-opened at M3a and M3b.
- The street/plot statistics that the D-5 parity rating rests on (4). Re-opened at M4 ("mastered") and M-CAL.

Can wait:
- Derived character and band range: recomputed on load.
- Greenery and trees: generated at render.
- Rung-modifier fallback.
- Basement gate algorithm: behind `waterTableAt`.
- Entrance and cellar probabilities: template rows.
- Materials and the regional shift.
- GPU light accelerator.

**M3a**

Settle within M3a:
- ★ §2.7's laws and the Order fields (39). Re-opened at M5 (V01 crossings), M6-E, M6-U and M6-sky.
- ★ Raised-way keys and addresses, and deck-plot suppression keys (38). Re-opened at M5, M6-U and M6-E.
- `carryWings` arithmetic, once warps are logged (30). Re-opened at M6 and M6-P.
- Plan-rung ids: Room address, `plan.*` concerns, plan events, canonical chain (35, 36). Re-opened at M6-P.
- Stepped/oval massing ids and stream indices (33). Re-opened at M6.
- Dossier staged shapes, the dossier block and binding (43, 45, 53). Re-opened at M-SF.
- Pack identity (53). Re-opened at M-SF.
- Skeleton format (53). Re-opened at M3c.

Can wait:
- The crossing table and the way-and-channel table: non-normative; T110-4 decides.
- Warp-check scheduling: pre-decided fallback.
- Span constants: V11 rows.
- `stepProfile`: derived.
- The elaboration cache: non-canonical.
- The frame-combination rules: local tests.

**M4**

Settle within M4:
- ★ Output version 1 itself: it ends the preview label.
- The epoch contract (5). Re-opened at M6-E.
- `builtBand`, `builtProsperity` and `fieldBand`, with their migration (27). Re-opened at M6-E and M6-P.
- Works and the material ledger (42). Re-opened at M6-E.
- Existence mapping and conversion causes (46). Re-opened at M6-E.
- Underground staged records and their parts, now writable by hand (43). Re-opened at M6-U.
- Frame-growth rules. Re-opened at M6-E.

Can wait: archive compression (output-neutral), decline rates and Works durations (data tables).

**M5**

Settle within M5: `Block.content` values, HoodPlace records and names, HoodRecipe documents, and the persisted fabric ids (c). Re-opened at M6-E, M6-U (catacomb openings) and the village.

Can wait: TemplateFabric internals (registrations), Find (a per-viewer key), the `hatched` style, the close-up cache.

**M6-P**

Settle within M6-P: stored plans — room ids, walls and openings once a plan is edited — and the re-cut semantics (c)(d). Re-opened at M6-E (decay re-cuts no plan; vacant re-cut) and M6-U (access heads).

Can wait: the algorithm for unstored plans (a pure function outside digests), furniture, the damage drawing (view only).

**M6-U**

Settle within M6-U: arch vaults keyed by raised-way span keys; the crypt in the Basement record; tunnel, gallery, chamber and link content (c)(d). Re-opened at M6-E, M6-sky and M-SITE-A (site parts reuse these roles, L913).

Can wait: cavern-rule rows, condition-table readings ("never a second stored state", L2429), crypt rank trimming.

**M-SF**

Settle within M-SF: binding rows, dossier refs, carried facts and dossier paths; the filled staged records; the host-facing refusal semantics (a)(c). These are persisted in SettlementForge's store.

Can wait: the one SettlementForge adapter (L123), crisis looks, seasons and festivals (no digest moves, L3530), the week source (a view default).

**Other milestones touching this range.** M3b (placed lights, weather, compact twin) is mostly isolated. M6, M6-E and M6-sky consume rows 29–33, 46 and 43 on the hooks above.

#### Where the milestone order itself creates compounding

1. **Goldens and shift records start at M1, with METROPOLIS included, but METROPOLIS is tuned at M2b.** M2b therefore necessarily pays in shift and cascade records against M1's goldens (L334–336), and "a milestone cannot exit with an undeclared shift" (§13.3 L20255–20257).
2. **The real persistence cliff is M2a, not M1.** M1 documents have empty logs; the designed M1→M2a transform drops their model and regenerates them from the recipe (L4111–4116). Once logs carry user edits at M2a, addresses, `VertexSig`, attribute paths and lifecycle flags become replay obligations.
3. **The M2a→M3a gap (my inference).** Retention of N−1 and N−2 only arrives at M3a (L20261), and the frozen-import rebase lands "with M3a's rebases" (§16 M1 row). So any declared shift released between M2a and M3a turns users' edited documents into view-only frozen views until M3a.
4. **From M3a, every output bump has a carrying cost:** a retained version (≤ 150 KB gzipped) plus replay tests under N−1 and N−2 (§16 M3a row).
5. **M4 fixes output version 1 and ends the preview notice** (L10856; preview text at L20259). After M4, every shift is a user-visible upgrade with diffs and orphans (§7.5).
6. **M4's hand tools let documents hold underground and Works records before M6-U and M6-E build those layers.** The staged shapes are therefore effectively frozen at M4.
7. **M1's API pass declares shapes years before their producers** (L562, L975, L3541, L3550, L4204). This is cheap while values are "read as absent", except `z: ZDecl`, which the display list uses from M1 (L3782).
8. **The raised-way laws (M3a) arrive after the wall code they constrain (M1, M2b).** Law 4 (L2872) re-opens S3/S5a/S7 and the hand wall tools. I infer shift records on hilly seeds once S4 viaducts and S6 aqueducts reach generation.
9. **The doc already uses order as a lever:**
   - the half raise ships with the basement gate (L1953)
   - capacity's plan constants are shipped at M2b (L2186)
   - massing ids are migrated "before M6 ships any document" (L1517)
   - only stepped/oval entrance hints are set before M6 (L1869)
   - the water-table switch is a declared shift at M-W0h (L1920)
10. **Rated evidence and records-digest goldens accumulate.** D-5 ratings land at M2b, M4 and M5; shift records list `d5SeedsChanged` (L20211). That a later fabric change forces re-rating is my inference; the doc does not price it. Adding fields to derivation records after M2a costs a declared one-time records-digest shift (L3733).

#### Explicitly deferred with a hook (designed so a later fix is local)

**Swap-ins and registrations**
- Stage-3 generator replaces `OutlineBuildingGenerator`, with an intake fallback (L1785–1790, L1844).
- Plan rung: "adding the rung is a registration" (L1998, L2081).
- Fabrics and products are registrations (L1159, L393).
- Byte-identical WASM accelerator (L515); GPU light pass (L518).

**Layers and records declared now, filled later**
- Staged underground and sky layers, schema-complete and empty (L535, L2413, L3508).
- Crypt "absent before" M6-U (L1927); arch vaults: "the reading alone holds" before M6-U (L2747, L3428).
- Decline states all present in the base schema (L3664); the evolution engine works on §4.11's interfaces (L497).
- Dossier records read nothing until M-SF (L3529).
- World/site records, the reason record, groundwater fields and the `site` layer, reserved at M1 (L3541, L3550, L975, L562).
- HoodPlace and `Block.content`, declared at M1 for M5 (L2371, L1198).
- Relation store schema from M1, materialised at M4b (§16 row L21700); people derived per `tableVersion` (L2393).

**Accessor seams**
- `datumOf` (L966), `waterTableAt` (L1920), the SettlementForge adapter (L123).

**Pre-decided fallbacks**
- Pool size (L4039), provenance per-unit dependencies (L3761), snapshot coding (L4148), archive compression (L3726), rung modifiers (L387–389), stage-3 intake (L1840), warp check (§16 M3a row).

**Additive fields with load defaults**
- Stretch-state profiles (L891), oasis spring (L1067), `slopeP95` (L1131), `Block.content` (L1329), wall condition (L2540), tenure (L3820), `builtBand`/`fieldBand` (L3741), `raised` (L3436), `wellYield` (L2362).

#### Doc inconsistency to settle inside M1

The canonical-form list (L4162–4164) names "the three part counters". It omits:
- `nextSitePart`, which calls itself "the canonical form's fourth part counter" (L3867); §2.1 (L576) and L3870 both speak of four counters;
- `namespace` (L3866), the address namespace segment, minted once;
- `worldRef` (L3865).

The document digest is computed over the canonical bytes, and M1 gates on a byte-identical save→load→save round trip. This needs resolving within M1. I infer the list is stale rather than intentional.


## Appendix B — §3 the geometry kernel; §16 the build plan

## Compounding analysis: §3 geometry kernel (docs/ARCHITECTURE.md L4285–5637) and §16 build plan (L21668–21824), framed for M1 and after

**Scope.** I read L4285–5638 and L21668–21824 in full. Outside that range I only grepped or read a few lines to resolve cross-references, marked **x-ref** below:
- §2.2's `Plat`, `LatticeSpec`, `LevelFaces` and `RoleTable` (L596–622) and `VertexSig` (L641)
- the stretch-state profile rules (§2.2 rule 5, L860–884)
- `SeamContract` (L22092–22099) and the pipeline order (L9738–9742)
- the preview flag (L10856–10857, L20258–20262)
- the carve and outer-moat path (L5791, L8549–8553, L9027) and the F-PLAN hook row (L9949)

**inf.** marks my own inference, not text in the doc.

Mechanism letters:
- (a) contract fan-in
- (b) evidence accumulation
- (c) persistence
- (d) identity or determinism
- (e) performance substrate

### Headline findings

1. **The kernel splits pieces whose contracts compound from pieces whose implementations don't.** The hinge is "No output depends on slot numbers" (L4640) together with the total canonical query key (L4764–4778). Because of that hinge, these can all be changed later without moving any golden: pool size, index structure, slot layout, chunk size, lazy rebuilds, the WebAssembly accelerator and the skeleton.

2. **M1's goldens lock a set of contracts that no later milestone can change for free.** None of them has a swap seam:
   - the lattice constants and integer-cm storage
   - the (y, x) tie-breaks
   - the canonical op order and query order
   - the insertion rules (attraction, placement and their guarantees)
   - `splitFace`'s child order
   - `kerb`/`corridorUnion` with `ChainProfile` widths
   - the choice of geometry engine
   - the margin bands that the pool's scope rule forces
   - the snapshot format and the role rows

   Changing any of them after M1 is a declared shift across many stages. After M3a it also obliges the retained versions N−1 and N−2 to keep replaying.

3. **Most M1+ extensions are built as local additions behind a declared seam.** That covers:
   - pool sizes 1–3 and the freeze after edits
   - `resolveVertexAt` (M2a), stretch-state profiles (M2b), `warp` (M3a)
   - arena parts (M3a, M4, M6-U, M6-sky) and `corridorUnion` reuse
   - frame growth (M4), seams (M5), transient-arena readers (M-ENC, M6-P)
   - new `E_NO_PATH` readers

   Each one starts a new persisted contract (logs, part numbers, stored plans). That contract has to be settled in the milestone that introduces it.

4. **Five places where a later change reaches back into M1's contracts:**
   - **Clear-region fallback (M3a).** If M3a takes it, it changes the generation order for `moat: 'all'` (L4621–4623).
   - **Persisted stage rank.** The rank is the stage's position in §4.1's order, "fixed per generator version" (L4548, L5538–5540). M2b and M5 add stages and the doc gives no remap (inf.).
   - **Op-kind rank.** The first key of the canonical sort is the op-kind rank (L4629), and no rank table appears in my range (inf.).
   - **Work counts.** Operation counts choose which ladder rung a stage takes (L4646–4647). The accelerator rule demands identical output, not identical counts (inf.).
   - **Clipper2 after M1.** Switching engines after M1 is a golden shift over seven stages and adds WebAssembly to the embed contract (L5424–5433).

5. **The cost of a later kernel change goes up in steps, set by §16:**
   - From M1, every exit records its declared shifts and fails on an undeclared one (L21682–21684).
   - Until M4, output is marked *preview*.
   - From M3a, versions N−1 and N−2 are retained ("goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped", M3a exit, L21697).
   - At M4, output version 1 is fixed (L21699).

### 1. Per-piece table

| # | Piece | Where | Built → extended | Direct consumers | Contract later code relies on | Redo if changed one milestone later | Verdict | Doc's own words |
|---|---|---|---|---|---|---|---|---|
| 1 | Lattice unit and `LatticeSpec` (1 cm, minEdge 25, attractCm 26, minFaceAngle 5°) | §3.2 (2) L4379–4396; constants L603, L614 (x-ref) | M0 → locked by M1's goldens | every writer; class floors (§4.7); stage setback tables; frame-growth "≤ attractCm" rules (L4433–4440); B-FUZZ tolerances (L5399–5410) | integer-cm coordinates in every snapshot; attraction band; minimum edge; the argument that 1 cm of slack exceeds 0.71 cm of rounding (L4393–4396) | every stage's goldens; bands calibrated at M-1 and M2b; every saved .plat file; M2a+ logs that store lattice points; CI bounds | COMPOUNDS (a)(b)(c)(d) | "fixed for the arena's life" (L603); "the lattice constants are fixed for an arena's life" (L5634); "All persisted geometry is integer cm" (L4369) |
| 2 | Range invariant abs(x), abs(y) < 2²³ cm, with `snap` as the only door | §3.2 (1) L4369–4378; (7) L4413–4417 | M0 → leaned on by METROPOLIS at the cap (in M1's goldens, tuned at M2b) and by M4's frame growth (L4441) | exactness of `orient2d` and `area2`; Int32 storage | exact sign in doubles; about 6× headroom at the cap (L4373–4376) | every exactness proof and every hot loop (BigInt costs) | COMPOUNDS (a)(e). The frame *table* is decoupled from it, so the table is ISOLATED | "Every exactness argument below rests on the range invariant, never on the frame table, so a rescaled frame (§13.7 O14 (e)) cannot break one" (L4377–4378); "in every build — not only in debug" (L4414) |
| 3 | Exact `orient2d`, lattice-position tie-breaks, quantise before deciding; `incircle` adopted from a library | §3.1 L4298; §3.2 (3)–(5) L4390–4400 | M0 | `splitFace` contact (L5221–5223); the load's angular sort (L5569–5570); the convex test (L5487–5489); the skeleton validator | exact sign; ties broken on (y, x) "never on slot ids" (L4391); angles in centidegrees | the tie rule: every callback-stage order and child order in M1's goldens; the predicate code itself: nothing | MIXED — tie rule COMPOUNDS (d); predicate code ISOLATED (an exact predicate has one answer); `incircle` ISOLATED | `incircle` "never on the topology path", with a "pre-decided fallback … an in-house BigInt `incircle`" (L4298) |
| 4 | Exact `area2`/`area2Big`, checked `ratio()`, `dmath`, the division lint | §3.2 (6) L4401–4412; (8) L4418–4420; L4313 | M0 (d) | class floors; m² statistics; `regularFit`'s centroid (L4883–4885); the seed-tiling check (L5601) | exact twice-area; `ratio` floors of 1 cm, 1 cm², 1 centidegree, 1 | `area2`: nothing (it is exact); a `ratio` floor: a declared shift on degenerate input only | ISOLATED | "no orientation, sliver or degeneracy decision reads the sign of a float sum" (L4410–4411) |
| 5 | Adopted libraries: robust-predicates 3.0.3, delaunator, d3-delaunay, simplex-noise, flatbush, rbush, d3-contour, earcut | §3.1 L4293–4313 | M0/M1 | site sampling, Lloyd relaxation, field seeds, medial axes (never the street source, L4304); noise; render triangulation; the label index | pinned versions; a licence check on every upgrade | an upgrade that moves output is a declared shift for the stages that read it (inf.) | ISOLATED | "version pinned and re-checked by §17.4's licence checker on every upgrade" (L4298) |
| 6 | Frame law: a rectangle centred on (0, 0) with +y north, aspect 0.5–2, `marginShare`, the `base` and `territory` laws, the margin and border chains | §3.2 (9) L4421–4431; `Frame` L4365–4367 | M0/M1 (S0) → the village's territory law; item 322's kept-arena margin share (L4459–4465) | S0 and S1; every raster's columns and rows (§2.3); the margin and border chains; the VG parity preset | the origin and axes of every stored coordinate; raster alignment | the convention: every snapshot and raster; the law's values: a declared shift | MIXED — the convention COMPOUNDS (a)(c); area and margin values ISOLATED (table rows) | a Re-derive "never shrinks the frame below its protected content" (L4429–4430) |
| 7 | Frame growth at an epoch (item 81 (b)) | §3.2 (9) L4432–4495 | M4 (T81-1 and the extreme-growth measurement, L21699) → M6-E, the village; raised and underground parts "grow by (a) and (b) on its own key" (L4480) | §4.11's growth; epoch undo (§7.4) | the frame never shrinks; growth runs as declared single-level batches, each re-deriving from S1 and sharing one clear region: (a) clear L1, (b) lay the L0 margin, (c) lay the L1 border (L4441–4446); raised feet move in order of way id, then foot index (L4467–4479); rasters grow by whole cells (L4481–4482) | once M6-E or the village logs epochs: byte-for-byte replay of every logged growth | ISOLATED as an M4 extension: the range bound was sized at the cap, the lattice is fixed for the arena's life, rasters grow by whole cells, and the re-grid fallback is local. It becomes COMPOUNDS (c)(d) for M6-E and the village. It depends on M3a's clear regions (inf.) | "So a frame and its arena never shrink" (L4439); "a replay of the log re-grows the frame byte for byte" (L4488); the fallback: "the generation report (§5.4) names the re-grid" (L4492–4494) |
| 8 | Typed results: `KernelResult`, the `KernelError` codes and the named reader of each, `E_DEGENERATE` details, warning codes | §3.1 L4315–4361 | M0 → readers added later: the dry run (M2a), F-EDIT (M3a), and for `E_NO_PATH` F-VOID plus the subterranean dossier institution's connector (M6-U, L4334) | every stage ladder in §5.2 (F-NUM, F-CUT, F-CORRIDOR, F-PLOT, F-ROUTE, F-WORK, F-SKELETON, F-PLAN); the dry run (§7.1); the §5.4 report; the B-FUZZ split | "never throws for a geometric reason" (L4315); which reader takes which code (L4319); `partial` | re-typing or merging an existing code: every reader's ladder (which changes output) and the dry-run conflict UI | MIXED — the existing code-to-reader map COMPOUNDS (a) from M1 and M2a; new codes, new readers and warnings are ISOLATED (additive; warnings only feed the report and CI) | "each code's reader in brackets" (L4319); "Every code is counted in §5.4's generation report" (L4358–4359) |
| 9 | `KernelTx` shape, `BatchScope`, `stage` and `rederivesFrom`, commit granularity | §3.3 L4499–4510, L4523–4531, L4654–4656 | M0 → `edit` scope at M2a; `clearRegion` and `prepared` at M3a; `entity` scope for transient arenas (L4529–4531) | every stage's declaration (§4.1, §14); edits (§7.3) | one batch is one growth stage, one district's infill, one block's subdivision or one edit; commit granularity is declared per stage | undo granularity in logs; dirty sets; digest updates; the work-limit scope of every stage | COMPOUNDS (a)(d); optional fields added later are additive | "Commit granularity is part of every stage's declaration (§4.1)" (L4654–4655) |
| 10 | Atomic commit or reject on a scratch overlay; the `expect`/`onFail` tiers (reject; repair, which is `absorbSliver`; downgrade) | L4523–4540 | M0 | every ladder; the dry run (edits use `reject`) | a rejected batch leaves the arena at its version; an empty batch keeps the version; the tier map to §5.1. The range has no savepoint or nested transaction: atomicity is per batch | exact rollback: every ladder retry and every dry run; the repair rule: every face near a class floor | MIXED — exactness and the tier map COMPOUNDS (a)(d); the overlay code ISOLATED; class-floor values ISOLATED (§4.7 rows) | "a rejected batch leaves the arena at its version (§2.2 rule 8)" (L4526–4527) |
| 11 | Five levels as views of one arena; one level per transaction (`E_LEVEL`); strict nesting | L4541–4546; nesting row L5589; L5611–5620; levels L592, L597 (x-ref) | M0 → passages as L3 faces at M2b; the underground level mapping at M6-U; rooms kept off the plat at M6-P | every stage's level; the per-level index, chunks and digests | L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots and residue · L4 footprints and yard parts | a new level, or content moved between levels: every stage, the index, chunking and digests | COMPOUNDS (a)(c)(d) | "Nesting admits no exception (J-A30.31). Nothing the plot model adds needs one." (L5611) |
| 12 | Kept content and the persisted stage rank (`LevelFaces.stage`, 1 byte per face) | L4547–4560; §3.9 L5538–5540; field L617 (x-ref) | M0/M1 → decisive in M2a's edits, M3a's clear regions and M4's epochs | `clearFiner` and insertions in every re-derivation; reload | the rank is "the stage's position in §4.1's topological order, fixed per generator version" (L4548) | a stage inserted later (M2b's S10b and S12c, M5's S7c and S9b; products may "add a stage by registration alone", L9738–9739) shifts the positions, and documents saved earlier carry the old positions. The doc gives no remap. The risk is contained if every insertion is an output-version bump and upgrades re-derive the ranks rather than reinterpret them (inf.) | COMPOUNDS (c)(d) | "The stage rank is persisted because the kept-content rule (§3.3) must decide the same way after a reload" (L5538–5540) |
| 13 | Batch faces and the seam exception, with §3.6's attraction candidate (b) | L4561–4564; L5081–5085 | M1 (II.1 (3)'s neighbour step; §4.6 step 7) → M5's seam amendments | S10's neighbour step; edits (§7.3 item 1); M5's close-ups. `SeamContract` is complete from M1 (L9740, x-ref) | a same-level split of a shared edge adds the vertex to the rings of the faces outside the batch; those faces are not kept, cleared or re-owned | M1's `SeamContract` on every district; M5's Hausdorff-0 bar | COMPOUNDS (a) at M1; M5's use is ISOLATED (only `splitThrough` plus this rule; inf.) | "each ring equals its prior ring with the vertex removed (the seam exception …)" (L4563–4564) |
| 14 | Clear regions and prepared contacts (LC-7); anchor ordinal allocation | L4565–4624 | the fields exist in `KernelTx` from M0; the carve fixtures confirm the rules at M3a (L4621). Users: S5a's outer moats at generation, through the carve path (L5791, L9027, x-ref); S1's water operator (M3a); the carve edit (M3a); frame growth (M4) | §4.11; §7.3 (b); §3.2 (9) | the footprint is a union of L1 cells; rules 1–3. The result (a deck span across the water, a `gate_end` pair, a closed border) is "the structure S1, S3 and S4 build at generation (J-I12)" (L4617). Anchor ordinals never reach a snapshot | the target structure: M1/M2b bridge and moat goldens. The fallback: the generation order of `moat: 'all'` | MIXED — the target structure COMPOUNDS (a)(c); the region mechanism is ISOLATED behind its fallback, but that fallback reaches back into generation | "The carve fixtures of §13.1–§13.2 confirm these rules (M3a). Pre-decided fallback … the plain rule — correct, slower; `moat: 'all'` is then carved only before S5c" (L4621–4623); "So a carve costs its footprint, not the town" (L4619) |
| 15 | Two op forms and the canonical op order | L4625–4639 | M0 | declared form: S3, S4, S7, S9's `corridorUnion`, S11, an edit's inserted feature. Callback form: S5c, S8, S10. The op-permutation and issue-order tests | declared ops are sorted by op-kind rank, then lineage key (§6.3), then op index. Callback ops run in issue order, which depends only on inputs, streams and sorted query results | changing the key, or re-ranking an existing op kind, reorders attraction and so changes every declared-form stage's goldens. No rank table appears in my range (inf.) | COMPOUNDS (d)(b) | "the committed arena is a function of the prior arena and the op set" (L4630–4631); "attraction, the one order-sensitive rule, is deterministic under the canonical order" (L4632–4633) |
| 16 | Slot independence, and the struct-of-arrays slot layout (typed arrays, half-edge pairs, flags, home column, compaction on save) | L4640–4643; L4299; L4682–4686; L5529–5530; layout L596–613 (x-ref) | M0 | compaction on save; the pool's slot remap; the slot-renumbering test; §12.8's memory lines | the rule: ties are broken on lattice positions, canonical keys and entity ids, never on slots. The layout has no outward contract | if the rule is broken anywhere, pool sizes, reloads and long sessions diverge. A layout change only means re-measuring memory and time | MIXED — the rule COMPOUNDS (d), because every other implementation piece is isolable only through it. The layout is ISOLATED for output; it is (e) only through M1's performance gates, whose fallbacks change output (inf.) | "renumbering is free" (L5530); "no implementation ever needs a slot to break a tie" (L4777) |
| 17 | Work limits counted in operations (`E_WORK_LIMIT`; the skeleton's 4·(n + r) + 64 events) | L4644–4647; L5483–5485 | M0 | ladders choosing a rung (F-WORK); §3.8's downgrades; stage declarations | what each op charges: points snapped, attraction queries, placement candidates tried, crossings resolved, faces walked, skeleton events | if an op's charge changes (an optimisation, an accelerator), a batch can hit its limit and take the next rung, which gives a different town | MIXED — the accounting COMPOUNDS (d); the limit values are ISOLATED (table rows and laws, L5634) | "Counts are identical on a slow and a fast machine, so a budget can select a ladder rung without changing what the seed produces" (L4646–4647); "The law is the floor of the `skeleton.events` row at every version" (L5485) |
| 18 | `CommitRecord` and the undo record built from it | L4511–4521, L4648–4656 | M0 → the display list's dirty set (M1); the undo record (M2a) | §3.10's checks; index maintenance; the digest update; the cost-model test; §7.4's undo | the record is not persisted. The undo record keeps lattice points, former levels, flags and stripped anchor names (L4652–4654) | the undo format inside logged events (M2a) and in retained versions (M3a) | MIXED — `CommitRecord` itself ISOLATED; the undo projection COMPOUNDS (c) from M2a | "The record is never persisted, because it holds arena slots" (L4654) |
| 19 | Digest upkeep at commit (the touched leaves, per-level plat digests, entity leaves, the root after the last overlay) | L4648–4652; L4724–4726; L5542 | M0 (d)/M1 | goldens; the pool-size test; five-engine identity; M2a's load verification and records digest. Documents store the root (the M2a fixture's `model.digest`) | leaves read routes, not slots; per-level digests are recomputed on load | every golden digest (a mechanical re-baseline); the stored root of every saved document, which forces an output-version bump | COMPOUNDS (b)(c)(d). Softened: per-level digests are never stored | "No per-level digest is stored (§2.9 step 3)" (L5542) |
| 20 | Derivation pool: the frozen base, the rebuild at the freeze, the transferred copy, the district overlays | L4658–4700 | M1 ("the derivation pool", L21694) → freezes after edits (M2a re-derivations, M4 epochs) | pooled S10, S10b, S11, S12b; the hinterland unit | each district is "a pure function of the base, its allocation and its own sub-stream" (L4699); what the copy holds does not affect output; no SharedArrayBuffer | purity: every pooled stage's goldens; the copy's contents: memory only | MIXED — purity COMPOUNDS (d); the copy and overlay structures ISOLATED | the rebuild "changes no output, and it runs at every pool size, 0 included" (L4672–4673); the fallback: "a copy made after edits carries only what a pooled stage may read under the laziness contract" (L4686–4690) |
| 21 | The pool scope rule (`E_SCOPE`) and the geometry it forces: step (0)'s eagerly built wall parts, margin bands (J-I9), street trees as `Greenery.along`, the hinterland as one more overlay | L4701–4715; L4661–4666 | M1 | plots and greenery of S10, S10b, S11, S12b; M2b's greenery and plot calibration; M5's seams | no pooled stage writes an L1 edge shared by two overlays, so every such edge without corridors gets a margin band | relaxing the rule changes geometry at every district boundary: all plot and greenery goldens, M2b's bands, M5's seam bars | COMPOUNDS (a)(b): a concurrency rule that became part of the town's geometry | "so the pooled plot and furlong lines on either side end on the band's inner edge, inside their own set (J-I9)" (L4711–4712) |
| 22 | Pool merge in lineage order, and the pool-size switch (0–3) | L4716–4730 | M1 (memory measured at pool sizes 0 and 3 at M1's exit) | the generation worker; the golden pool-size test | overlays merge in district lineage order (§6.3), with a slot remap; partitions and digest leaves travel with each overlay | nothing on the output side | ISOLATED: a declared switch (the lineage order is §6.3's contract) | "pool sizes 0–3 execute the same code on the same inputs and give identical digests by construction; the golden suite's pool-size test … confirms it on every run" (L4728–4729) |
| 23 | Spatial index: flatbush partitions per level and district, a dynamic grid (`index.gridCellM`), route-edge items in boxes padded by the 0.71 cm hot pixel, tombstones and the home column, three rebuild moments | L4731–4798 | M0/M1 | every query; the §12.4 and §12.6 budgets; §3.9's chunks (one per L2–L4 partition, L5550–5552) | answers don't depend on which structure holds an item; partitions are never rebuilt per batch | internals: nothing. Partition size: the chunk layout and the budgets | MIXED — internals ISOLATED; partition size COMPOUNDS (c)(e) through chunks, softened because the snapshot is a cache that can be rebuilt by replay | "neither which structure holds an item nor whether a finer level has been derived changes any answer" (L4774–4775); "rebuild work never grows with the number of commits" (L4796–4797) |
| 24 | Canonical query order: vertices by (y, x); edges by their level-n route endpoints; faces by the first two outer-ring vertices of level ≤ n; vertices before edges before faces | L4764–4778 | M0 | the issue order of every callback stage (S5c, S8, S10; L4635–4639); `readBack`'s order (L5017–5018); the output-neutrality of lazy rebuilds (L5574–5576) | one total key per item kind, read on the level-n route | S5c/S8/S10 goldens; the M0 (b)/(c) calibrations (σ, block-area KS, fusion statistics); M2b's bands | COMPOUNDS (d)(b) | "a key read on the full ring reverses two L3 plots once S11 derives L4" (L4775–4776) |
| 25 | The op list and its "doors" | §3.4 L4799–4870 | M0 → `warp` at M3a; partitioners for transient arenas only, at M1/M6-P | every stage and every edit | `insertChain` is the only door for new edges; `removeEdges` and `clearFiner` the only doors for removing them; knot rows and `rekey` for vertex roles; `warp` the only door for moves | a writer that bypasses the doors re-opens §3.10's coverage for every stage | MIXED — the set of doors COMPOUNDS (a); each op's internals ISOLATED (typed, counted and fuzzed, L4867–4869) | "which is why planarity, `minEdge`, clearance and the kept-content rule are properties of this list rather than of every stage" (L4866–4867) |
| 26 | `insertChain` attraction (snap and decimate, vertex, segment and stretch, crossings, re-walk; candidates (a), (b), (c)); chain classes | §3.6 L5080–5139, L5194–5203 | M0 → candidate (c) at M3a; candidate (b) at M1's neighbour step and M5's close-ups (L5083–5084) | every chain; booleans and buffers use the same machinery (L5321–5323) | how far vertices may move; the tie rules; existing geometry wins; mandatory chains never reach F-NUM | a town-wide shift; the M0 (b)/(c), M1 parity and M2b D-5 bands; the B-EDIT identity fixtures | COMPOUNDS (a)(b)(d) | "Existing geometry wins, and no edge shorter than `minEdge` can be created" (L5167) |
| 27 | Placement rule and insertion guarantees (0.71 cm hot pixel; at least minEdge from endpoints; clearance; four edge kinds; fidelity bound 2·√2·attractCm ≈ 73.5 cm) | L5140–5193, L5204–5207 | M0 → `warp`'s re-seats and slides (M3a); transient arenas' input sides (L5025–5040) | every split; the index's run boxes; oracle tolerances; stage setback tables | §3.10's placement bound; "a setback smaller than `minEdge` collapses to zero" | the lattice point of every split, so every golden; tables written against these bounds | COMPOUNDS (a)(b)(d) | "a stage that wants a visible setback draws at least `minEdge` (§4.7)" (L5205–5207) |
| 28 | Roles on shared stretches; re-inserting an existing run adds nothing; `absorbSliver` → `residue` | L5208–5220 | M0/M1 | wall-and-bank and quay-and-shore edges; S7's run re-trace; S1's water operator; M4's wall → ring road | one edge carries several persisted role rows; structural roles are never lost; the `residue` face kind | role rows in documents; conversions (M4, M6-E) | COMPOUNDS (a)(c) | "A street, wall, shore or border can therefore never lose a stretch to sliver repair" (L5217–5219) |
| 29 | `splitFace` (the bent cut's 2–3-vertex cut), `connectHole` (the hole slit), canonical child order | L4822–4823; L5221–5239 | M0 (b) "the bent-cut transaction with the hole slit" (L21693) → S8 and S10 at M1; the plan rung (`moveWall` = `mergeFaces` + `splitFace`, L5010) | S8; S10; the plan rung; §6.3's anchor rule | `E_NOT_TWO_CROSSINGS` and `E_HOLE_CONTACT` go to F-CUT; the left child comes first | child order: anchor identity, i.e. the addresses in M2a+ logs. Contact rules: S8's outcomes, calibrated on NG captures at M0 (b) | COMPOUNDS (a)(b)(d) | "so an anchor lying exactly on the cut belongs to the left child (the tie-break of the anchor rule, §6.3)" (L5236–5238) |
| 30 | `warp` and moves (the held set, including `deck_end`, `gate_end` and raised feet; slides; re-seats; order within a step; the split flag, cases (b) and (b′); whole-step validation; at most 8 halvings) | L5240–5318 | M3a ("warp kernels with whole-step validation", L21697) → brushes, `moveVertex`, `equalize`; M4; M6-E | §7.1's edits; §7.4's point-anchored records; `recordCheck` | halving is deterministic; order depends on positions only; logged warp events must replay exactly under N−1/N−2 | before M3a: nothing (I found no M1 consumer; inf.). After M3a: every logged warp and every retained version | ISOLATED through M2b → COMPOUNDS (c)(d) from M3a | "deterministic, at most 8 halvings, after which the step is a reported no-op" (L5310); "The order is a function of positions alone, never of slots" (L5288) |
| 31 | `StretchRef`, cut knots, `rekey` | L4900–4911; L4814–4820 | M0/M1 (priced in "the parity floors' kernel share", L21786) → M2a's edits, M2b's stretch-state writes, M3a's carve and re-trace, M4's wall → ring road, M6-E | every operator edit on part of a chain | both ends on one part of the chain (otherwise `E_DEGENERATE` `stretch`); every remaining sample unchanged; knots renumbered from 0 in chain order | edit events that name stretches (logs from M2a); profile knots in documents | COMPOUNDS (a)(c) from M2a | "so every remaining sample is unchanged" (L4906–4907) |
| 32 | `ChainProfile` knot machinery (knots placed through `opts.knots` or `splitThrough` and carried by attraction; `sampleProfile` by arc length, step values returned as strings; cut knots) | L4806, L4837, L4873–4879 | M0/M1 (way width profiles read by `kerb` and `bandUnion` at M1) | `kerb`, `corridorUnion`, `bandUnion`; every §2.2 rule 5 record | knot rows are persisted (§3.9 L5533–5537); interpolation by arc length; cut-knot semantics | corridor widths in every golden; knots in every document | COMPOUNDS (a)(b)(c) from M1 | "a stored chain's varying width is always a `ChainProfile`, sampled by `kerb` and `bandUnion`" (L4874–4875) |
| 33 | Stretch-state profiles (`RetainingWall.state`; `Enceinte.condition` with its material and epoch; `laidAt`; `courseAt`) | defined in §2.2 rule 5, L860–884 (x-ref); built only from range ops: `splitThrough`, `removeEdges` on a `VertexRef`, step sampling in `sampleProfile`, `rekey`'s renumbering | M2b (item 114's generation-time condition, L21696) → M3a (T3 repair, `wearWall`, retaining walls, raised-way `courseAt`); M6-E (item 114's transitions at E3, L21713) | §8.2's state rows; the digest; exports | the canonical form (a knot on the first vertex; equal neighbours dropped; all-equal becomes a scalar; the default is stored as absent) "so the digest (§6.3) is stable"; the order in which a write moves knots | from M2b: condition rows in goldens. From M3a: logged writes | ISOLATED as the M2b kernel extension: no new op; the seam is `S` or `ChainProfile<S>` with `interp: 'step'`. It COMPOUNDS (b)(c) forward, for M3a and M6-E | "One mechanism serves every such record" (L863–864) |
| 34 | `regularFit` | L4851–4855, L4880–4899 | M0/M1 (castle repair, S7) → the `equalize` brush (M3a) | §4.8; §7.1 | O(n); reads no arena; returns values, never arena coordinates | castle shapes (a declared shift) | ISOLATED | "so the castle repair (§4.8) and the `equalize` warp brush (§7.1) cannot drift apart" (L4880–4881) |
| 35 | Shape services and face partitioners (`obb`/`hull`/`lir`, `sideRuns`, `simplify`, `sampleBoundary`, `hexLattice`, `claimSubFace`, `radialSplit`, `ringBand`, `pointLocate`, `faceNeighbours`) | L4826–4828, L4845–4850; L4302, L4304 | M0/M1 | S11 (LIR); S8 (`sideRuns`); S4 (`hexLattice`); S3's reservations; §5.3's reachability walk | typed results ("callers branch on the typed result", L4848) | one stage's goldens (a declared shift). `hexLattice` draws from a `Stream`, so its draw order is part of S4's stream (inf.) | ISOLATED (each change is a stage-local declared shift); `hexLattice` is MIXED (d) | "the one contract (GEO-7)" (L4848) |
| 36 | Arena keys and version-stamped slot handles (the "generation stamp" is the arena's `version`, bumped by every commit, L612 x-ref); links across arenas by entity id | L4913–4927 | M0 | every service; parts; transient arenas | a slot is valid until its arena's next commit; services take an arena by key | the multi-arena designs (M3a, M4, M6-U, M6-sky) | MIXED — the rule COMPOUNDS (a); the stamping is a debug-build assertion, ISOLATED | "A cross-arena link is an entity id, never a slot" (L4922–4923) |
| 37 | A layer's several arenas: part numbering, join records (`UndergroundLink`'s `link_end`, `RaisedWayRecord.feet`), arena isolation | L4928–4964; §3.10 L5600 | M3a (raised-way arena parts, item 110, L21697) → M4's underground hooks ("the systems' records and parts, their links", L21699) → M6-U, M6-sky | II.7; §2.7; §6.3's addresses | a part number is allocated once, never renumbered or reused, and is part of entity keys and addresses; join vertices are placed by one transaction per part | saved documents with parts (from M3a); addresses in logs | ISOLATED as a kernel extension → COMPOUNDS (c)(d) from the first saved part (M3a) | "The kernel adds no operation for either" (L4945); "never renumbered or reused — it is part of its entities' keys and addresses" (L4935–4936) |
| 38 | Transient arenas (`TransientKey`, `transientArena`, `readBack`, `release`, the `tileRings` seed clip, fixed edges, a restricted set of writers, re-cuts) | L4965–5057 | M1 (open, read-back and release, about 1 pw, L21694) → M-ENC's view-owned form; M6-P's storeys and re-cuts; M6's stage-3 `compose()` | §2.6's plan records; V14's encounter crop. No M1 stage reads it: the F-PLAN row calls the plan rung "staged — this row is its hook" (L9949, x-ref) | `readBack`'s value schema, in canonical order. Plan records "depend on the input rings and the op sequence alone, whichever worker cut them" (L5018–5019). Kept rings re-enter exactly; seeds tile exactly | before M-ENC or M6-P: nothing. After them: plan goldens and stored-plan carry checks | ISOLATED at M1 → COMPOUNDS (b)(c) from M6-P/M-ENC | "never persisted (§3.9), digested (§6.2) or frozen (§3.3)" (L5016–5017); "The seed rings never change with the occupants" (L5053); the owner of the view form is inconsistent at L4969 (see §6) |
| 39 | One geometry engine on the arrangement (booleans, buffers, `offsetFace`, `insetRing`), and the CI oracles beside it | §3.7 L5321–5337, L5367–5376, L5397–5433 | M0 (a); decided before M1 | S1 outline repair, S3 reservations, S8 kerbs, S9 corridors, S10 step (0) bands, S11 footprints, S12b greenery (L5429–5431) | integer outputs that enter through `insertChain`; the engine is named in the report as `plat-arrangement@<version>` (L5414) | after M1, switching to Clipper2 is a declared golden shift over those seven stages and adds WebAssembly to the embed contract (`E_ENGINE_UNAVAILABLE`) | MIXED — the engine choice COMPOUNDS (b) once M1's goldens exist; refinements behind the versioned engine name are declared shifts; the oracles are ISOLATED (testkit only) | "no host can compute a different town" (L5336); "Criterion (i) has no fallback: a failure there is a kernel bug, fixed before M1" (L5423–5424); "There is no runtime fallback" (L5412) |
| 40 | `kerb(F)` defined once; `corridorUnion` and `bandUnion`; the same functions on every arena | L5338–5366, L5377–5396 | M0/M1 (S8, S9) → raised parts (M3a); close-ups on any boundary (M5); tunnels, galleries and chambers (M6-U); the sky (M6-sky) | every block in every golden; II.1 (3); II.7.3's frontage plots | the block S8 cuts and the block S9 keeps are one face; widths come from `ChainProfile`; `corridor_split` edges at junctions | every block from M1 on; M6-U's frontage invariants | COMPOUNDS (a)(b) at M1; reuse at M3a, M5, M6-U and M6-sky is ISOLATED by design | "No arena-specific band operation exists" (L5394–5395); a sky island and a raised part "need nothing of their own" (L5379–5380) |
| 41 | The WebAssembly accelerator seam and budget amendments | L5434–5447 | built only on a measured miss (more than 2× after one optimisation pass) | the hot loops behind the kernel façade | identical output on the golden suite; the TypeScript loop stays in every bundle | nothing, if the output is identical. Work counts must also match (row 17; inf.) | ISOLATED (a declared swap-in) | "that loop — and only that loop — is compiled … behind the kernel façade" (L5437–5438); "slower and never different" (L5446–5447); §16: "there is no WASM kernel (§3.7)" (L21821) |
| 42 | The straight skeleton (numeric contract, corner bounds, event coalescing, the event-limit law, validator, three readers with typed downgrades, exact convex roofs) | §3.8 L5449–5522 | M0 (a) → readers: S1's clamp and label spines (M1), S10's `regions` (M1), roofs (M2b), plan-room labels (M6-P) | §9.3; §4.2 S1; §4.7 S10 (4); §8's roofs | every reader has a typed downgrade; the skeleton never writes an arena; nothing of it is stored | a declared shift. S10's `regions` reader is the one path into stored plots | ISOLATED (the typed downgrades are the seam; removal is pre-decided) | "a skeleton code change that moves any output is a declared shift (§6.4)" (L5455–5456); "nothing else changes, because the readers above are the only readers of skeleton output" (L5521–5522); the 1° bound is "vetoable by the owner" (L5480–5481) |
| 43 | The snapshot's geometry block, one per `PlatKey` (vertex varints with levels and flags; edge triples; role rows by document id with ordinals; face rows with owner, kind and stage rank; no parents; no per-level digest) | §3.9 L5524–5546 | M1 ("the `.plat` writer and reader for generated towns", L21694) → M2a's log fold and load verification; M3a's migration and retention; M3b's CBOR twin (L5578) | every load; the documents users keep | the on-disk schema; save → load → save byte-identical (M1's exit) | every saved document; the frozen view needs the old reader. Softened: a failing snapshot loads by replay | COMPOUNDS (c) | "the document loads by replay (§2.9 step 5), never as a partial arena" (L5573–5574) |
| 44 | Chunking, and references across chunks by lattice point (one chunk for the level ≤ 1 routes; one per L2–L4 partition; Steiner splits named by their route endpoints) | L5547–5567 | M1 → M2a's rebased-size test | loading; rebased documents | references by lattice point, never by (chunk, index); content addressing | the referencing rule: slot-free persistence. Chunk size: document size only | MIXED — referencing by lattice point COMPOUNDS (c)(d); chunk size ISOLATED (the block-group fallback) | "with §2.9's block-group fallback pre-decided" (L5566–5567) |
| 45 | The load path (next/prev rebuilt by exact angle, faces re-walked, parents recovered, indexes rebuilt, digests checked) | L5569–5579 | M1/M2a | the open-to-editable bar | a deterministic rebuild | nothing on the output side | ISOLATED (the lazy-rebuild fallback doesn't change output) | "Entities carry no slots (§2.2 rule 5), so the entity table needs no remapping on load" (L5576–5577) |
| 46 | The kernel invariant suite (§3.10) | L5580–5609 | M0 → pool rows (M1); prepared-contact and arena-isolation rows (M3a); seed tiling (M6-P) | every stage and every edit; §13.2's cost-model test | what every batch may assume; "a batch costs O(touched), never O(model) (SCL-1)" (L5607) | relaxing an existing row re-opens every consumer | COMPOUNDS (a)(e) for the existing rows; rows added later ISOLATED | "These rows are the kernel's part of the §5.3 suite" (L5605) |
| 47 | Role rows instead of stored indices; references by role | §3.9 L5533–5537; §3.10 L5596; L5068; `RoleTable` L619–622 and `VertexSig` L641 (x-ref) | M0/M1 → `VertexSig` in M2a's logs | every record type; logs; migration | rows of (edge or vertex, role, entity, level, ordinal); the registry's flags (indexed, structural, linear) | renaming or re-keying a role: every document, every record, every logged signature | MIXED — the row schema and registry COMPOUNDS (a)(c)(d); the in-memory role-head and owner-head tables ISOLATED | "no record outside the kernel stores an arena slot (§2.2 rule 5)" (L5068) |
| 48 | `resolve`, `resolveVertexAt`, `signature`, `CarryMap`; succession through `setOwner` and `retypeEdges` | L4834–4836; L4871–4873 | M2a (the log) → `moveVertex` at M3a | every logged edit that names a vertex (lattice point plus `VertexSig`) | "a log position → a vertex, never by distance alone" (L4835); an orphan result | logs and retained versions (M3a) | COMPOUNDS (c)(d) from M2a | "so geometry and address always move together" (L4872–4873) |
| 49 | The kernel's negative contracts (§3.11): it reads no dossier field, no toggle, preset or style, and no rung-specific number; it never retries beyond its own batch; only arenas persist | L5621–5637 | M0 | M-SF; presets (the parity presets, NG at M5); the village rungs | negative guarantees | — | ISOLATED: content milestones cannot reach the kernel | "the kernel reads no dossier field" (L5633); "the kernel reads no toggle, preset or style" (L5635); "A kernel op never retries anything beyond its own batch" (L5623–5624) |
| 50 | §16's evidence ledger and version policy: `MilestoneRecord` with declared shifts; the output-version stamp; shift and cascade records; stage-isolated goldens; preview until M4; retention of N−1/N−2 from M3a; frozen views; the fail-safe deferral rule | L21682–21684; M1 L21694; M3a L21697; M4 L21699; L10856–10857, L20258–20262 (x-ref) | M1 → M3a → M4 | every later milestone's exit | an undeclared shift fails the exit; a link inside the retention window replays exactly | — (this is the price list for every other row) | COMPOUNDS (b)(c): later kernel changes become recorded shifts, never free ones, and the cost steps up at M3a and again at M4 | "fails on an undeclared one (§13.3)" (L21683); "output version 1 fixed, ending the *preview* label" (L21699) |
| 51 | M-1's reference baselines (`baselines.json` with `referenceBuild`; calibration records; re-fitted depth rows) | L21692 | M-1 → M0 (b)'s σ targets; M1's parity report and fusion re-run; M2b's bands; M5's NG panel | §13.5's bands; every gate | baseline rows with their provenance | a re-measurement changes every band and gate | MIXED — the baselines are keyed to the reference generators, so no kernel change invalidates them; a re-measurement cascades (b) | "the re-fitted depth rows recorded with provenance 'M-1 ⟨date⟩'" (L21692) |

### 2. Extensions after M1: local addition, or a change to an M1 contract?

| Extension | Milestone | Seam it builds on | Does it change a contract M1 depends on? | Verdict |
|---|---|---|---|---|
| Pool sizes 1–3 (#20–22) | M1 | pool size 0 runs the same overlay-and-merge path; the golden pool-size test (L4727–4729) | no. The scope rule's margin bands exist at size 0 too | ISOLATED |
| Freeze after edits or epochs (#20) | M2a, M4 | the freeze-time rebuild "changes no output" (L4672) | no | ISOLATED |
| `resolveVertexAt` and `VertexSig` (#48) | M2a | M1's role rows and lattice points | no, but it creates a new persisted contract | ISOLATED with respect to M1; COMPOUNDS forward (c)(d) |
| The undo record (#18) | M2a | `CommitRecord`'s lists of promoted, demoted and unflagged vertices | no; it is a new persisted format | the same |
| Stretch-state profiles (#33) | M2b | `ChainProfile<S>` with step interpolation, plus the existing doors | no | ISOLATED; COMPOUNDS forward (b)(c) |
| Bridge decks at generation (#14, #30) | M2b | role rows (`deck` beside `way`); the warp's held set, case (2) | no | ISOLATED. They become the structure M3a's clear regions must reproduce |
| `warp` (#30) | M3a | a door already in the op list (L4831); whole-step validation | no (I found no M1 consumer; inf.) | ISOLATED; COMPOUNDS forward (c)(d) |
| `clearRegion` and `prepared` (#14) | M3a | optional `KernelTx` fields; the J-I12 target structure | only through its fallback, which changes the generation order of `moat: 'all'` (L4623) | MIXED |
| Raised-way, underground and sky parts (#37) | M3a, M4, M6-U, M6-sky | "The kernel adds no operation for either" (L4945) | no | ISOLATED; COMPOUNDS forward (c)(d) |
| Reusing `corridorUnion` (#40) | M3a, M5, M6-U, M6-sky | "No arena-specific band operation exists" (L5394) | no | ISOLATED |
| Frame growth (#7) | M4 | the range bound sized at the cap; the lattice fixed; rasters that grow by whole cells; clear regions | no | ISOLATED; COMPOUNDS forward (c)(d) |
| `retypeEdges` for wall → ring road (#28, #31) | M4 | the existing conversion primitive (L4817) | no | ISOLATED |
| Seam amendments (#13) | M5 | the seam exception, candidate (b) and `splitThrough`, all from M1 | no, provided M1's rules stand | ISOLATED |
| Transient-arena readers (#38) | M-ENC, M6-P, M6 | M1's open, read-back and release | no | ISOLATED; COMPOUNDS forward (b)(c) |
| New `E_NO_PATH` readers (#8) | M6-U, M-SF | the typed codes | no (additive) | ISOLATED |
| A WebAssembly accelerator for one loop (#41) | any milestone, on a measured miss | the kernel façade; the TypeScript loop kept; identical output | no, if its work counts also match (inf.) | ISOLATED |
| Switching the engine to Clipper2 (#39) | required before M1 | entry through `insertChain`; `E_ENGINE_UNAVAILABLE` | yes, if taken after M1: seven stages and the embed contract | COMPOUNDS (b) |
| A stage inserted into §4.1's order (#12) | M2b, M5, products | registration (L9738–9739) | yes: persisted stage ranks are positions (inf.) | COMPOUNDS (c)(d) |
| A new op kind (#15) | any | the op-kind rank (L4629) | yes, if it re-ranks existing kinds (inf.) | COMPOUNDS (d) |

### 3. §16: what each milestone delivers, and what later milestones may not change

| Milestone (line) | Kernel-relevant deliverables | Exit evidence that locks behaviour | Estimate |
|---|---|---|---|
| M-1 (L21692) | `baselines.json` with `referenceBuild`; MFCG sweeps at ten seeds per size; FTG captures in two programmes (28 slots); NG baselines; re-fitted depth rows; the sanitised implementer digest | every §13.5 baseline row present with provenance; the digest checker finds 0 excerpts | 2.5–4 pw |
| M0 (L21693) | (a) the kernel; (b) the bent cut with the hole slit; (c) the fused-layout spike; (d) the determinism spike; (e) the site-and-fields spike; (f) CI tiers | B-FUZZ: 0 crashes on 10⁶ inputs per primitive; ≤ 8 µs per proposal "or §3.7's miss rule applied before M1"; S11's geometry ≤ 3 µs per plot; the §3.7 and §3.8 bars "with their pre-decided fallbacks applied before M1"; op-order determinism; σ within ±0.02; the fusion gate "if it fails, §4.4's fallback applies before M1"; identical digests on five engines | 9–12 pw |
| M1 (L21694) | S0–S11; the `.plat` writer and reader using §3.9's layout; the output-version stamp, shift, cascade and milestone records, and stage-isolated goldens; `SeamContract` on every district; the derivation pool; transient arena open, read-back and release; the frozen view of other output versions | save → load → save byte-identical; memory at pool sizes 0 and 3; B-EDIT-lite identity ≥ 99.9 %; placement digests identical on Node x86 and in the five-engine run; a document from an earlier output version opens as a frozen view | 40.25–52.25 pw |
| M2a (L21695) | the log and a single replay fold over M1's format; locks and pins; scoped regeneration; undo and redo as logged events; load verification; the dry run; the records digest (L21781) | the B-EDIT oracle green at 10³ and 10⁴; the corrupt-cache fixture; rebased documents ≤ 1.25× or the block-group fallback taken | 10–13.5 pw |
| M2b (L21696) | parity content; S10b; roofs; S12; harbour, bridges and canals; METROPOLIS tuned; item 114's condition (stretch-state profiles); passages | every must-have letter on 1 000 seeds; the D-5 panel against MFCG and FTG; edit cost flat from TOWN to METROPOLIS | 45.75–61 pw |
| M3a (L21697) | warp kernels; migration and upgrade; rebase; retention of N−1 and N−2; S1's water and terrain operators; the carve with clear regions; point-anchored records under a warp; raised ways with arena parts (item 110); the API | Regenerate (keep settings) byte-identical; the carve fixtures pass, "or §3.3's pre-decided fallback applied before exit"; B-EDIT at 10⁵ with 0 planarity violations; goldens replay under N−1 and N−2 (≤ 150 KB each); a frozen o(N−3) fixture | 35.25–47.25 pw |
| M3b (L21698) | exports, including the CBOR twin that carries §3.9's block | every format validator green | 21–28.5 pw |
| M4 (L21699) | the one incremental path (surviving entities byte-identical; wall → ring road as `retypeEdges`); output version 1 fixed; the fail-safe hardening pass; the underground hooks (systems' records, parts, links) | cross-platform goldens green nightly for two weeks; the epoch test with 0 re-rolled survivors; T81-1 (frame growth); the extreme-growth memory measurement | 17.75–25.5 pw |
| M4b (L21700) | `@plat/sim`; no kernel work | — | 8–14 pw |
| M5 (L21701) | `@plat/hood`; S7c; S9b; close-ups on any district and on an arbitrary boundary; the NG preset | shared-edge Hausdorff distance 0; footprint hash identical to the city level of detail | 27.5–36.75 pw |
| Staged (L21710–21728) | V-M0 runs "on M0's kernel" beside M1. M-ENC starts after M1. The village (V-M1–V-M4), M6-E, M-W0h and M-25D start after M4. M6-P's P0, P1 and P3 start after M4, P2 once volume 4's access records exist, the rest after M6. M6 and M6-U start after M5; M6-sky after M6-U; M-CAL after M6-sky; M-SF after M-CAL; M-W0–M-W5 after M-SF | each volume's §8 exits | per volume |

**What later milestones may not change, in the doc's own words:**
- **Every exit.** It "writes its `MilestoneRecord` with the milestone's declared shifts and fails on an undeclared one (§13.3)" (L21682–21684).
- **M0.** Fallbacks are applied "before M1 if a bar fails"; "§3.7's miss rule applied before M1"; for fusion, "§4.4's fallback applies before M1" (L21693).
- **M1.** "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message"; save → load → save byte-identical (L21694).
- **M2a.** It builds "the log and the one replay fold over M1's document format", on M1's format rather than replacing it (L21695).
- **M3a.** Its exit requires:
  - "Regenerate (keep settings) byte-identical"
  - "goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped"
  - "a frozen o(N−3) fixture shows no mismatch message"
  - the carve fixtures, "or §3.3's pre-decided fallback applied before exit" (L21697)
- **M4.**
  - "surviving entities byte-identical"
  - "output version 1 fixed, ending the *preview* label"
  - "a throw or crash on a valid input, a silently wrong committed result and nondeterminism are never deferred"
  - "M0's own known-issue rows are drained in M0's hardening phase before M1, so this pass takes those of M1 on" (L21699)
- **M5.** "shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0)"; "footprint hash identical to city LOD" (L21701).
- **Process rules.**
  - "A change that adds build work prices it here" (L21804–21806).
  - Cuts "are recorded for the owner's veto, not applied" (L21808).
  - "there is no WASM kernel (§3.7)" (L21821).
- **Preview semantics (x-ref L20258–20262).** Until M4, a preview link may be drawn "differently" by a later release, "and will say so". After M3a, "a link inside the window replays exactly".

### 4. Per milestone: what must be settled within it, and what can be fixed later in isolation

#### M1

**(1) Settle within M1 (COMPOUNDS):**
- **#1 Lattice constants and integer-cm storage** — (a)(b)(c)(d). First re-opened by M2a, whose logs store lattice points over M1's format; also every later golden.
- **#3, #15, #24 The orderings** — tie-breaks, canonical op order including op-kind ranks, canonical query order — (d)(b). First re-opened by M2a (B-EDIT replay identity) and M2b (parity bands measured on these outputs).
- **#26–#28 Insertion semantics** — (a)(b)(d). M2b.
- **#29 `splitFace` and `connectHole`, with child order** — (a)(b)(d). M2a, because the anchor identity goes into logged addresses.
- **#32, #40 `ChainProfile` knots and `kerb`/`corridorUnion`** — (a)(b)(c). M2b: the plot-model calibration, and stretch-state profiles build on the knots.
- **#39 The engine choice** — (b). Every golden from M2a on, and the embed contract with M3a's API.
- **#8–#10 Code-to-reader map, transaction granularity, exact rejection** — (a)(d). M2a: the dry run and undo granularity.
- **#11–#12 Five levels; kept content and the stage-rank encoding** — (a)(c)(d). M2a reads ranks after reload; M2b is the first stage insertion (inf.).
- **#13 The seam exception** — (a). M5.
- **#20–#21 Pool purity and the scope rule's margin bands** — (a)(b)(d). M2b.
- **#17 Work-count accounting** — (d). M4's performance tiers and accelerators.
- **#19 Digest leaves and the stored root** — (b)(c)(d). M2a.
- **#43, #44, #47 The snapshot block, lattice-point references, the role-row schema** — (c). M2a.
- **#6 The frame convention** — (a)(c). M4.
- **#50 The evidence ledger** — (b). It must exist at M1.

**(2) Can be passed over at M1 (ISOLATED, with the seam named):**
- **#22 Pool size and #20 the copy's contents** — the pool-size switch and its golden test; the copy fallback limited by the laziness contract.
- **#23 Index internals and rebuild thresholds** — the canonical keys; the lazy rebuild (#45).
- **#16 The slot layout** — slot independence; compaction on save.
- **#38 The transient arena** — no M1 consumer; never persisted, digested or frozen.
- **#42 The skeleton** — typed downgrades; pre-decided removal.
- **#41 The accelerator** — a swap-in behind the façade.
- **#5, #34, #35 Libraries, `regularFit`, shape services** — typed interfaces and version pins.
- **#4 `area2` and `ratio`** — exact.
- **#44 Chunk size** — the block-group fallback at M2a.
- **#8 Warnings and #39 the oracles** — report, CI and testkit only.

#### M2a

**(1) Settle within M2a:**
- **#48 `resolveVertexAt`, `signature`, `VertexSig`, `CarryMap`** — (c)(d). First re-opened by M3a: `moveVertex`, and replay of N−1/N−2.
- **#18 The undo projection** — (c). M3a.
- **#31 `StretchRef` in logged edits** — (a)(c). M3a: carve and re-trace.
- **#8 The dry run's conflict typing (`E_LEVEL`, `E_LOCKED`, `E_KEPT`)** — (a). M3a.
- **#12 Kept content after reload** — (c)(d). M3a's clear regions; M4's epochs.

**(2) Pass over:**
- **#20 The rebuild at a freeze after edits** — doesn't change output.
- **#44 Chunk size** — the block-group fallback of the rebased-size test.
- **#23 The grid-overflow threshold, max(256, ¼)** — a count; doesn't change output.
- **#45 Lazy partition rebuild** — a fallback that doesn't change output.

#### M2b

**(1) Settle within M2b:**
- **#33 The stretch-state canonical form and the order of a write** — (b)(c). M3a.
- **#14 and #30 The bridge and deck structure at generation** (`deck_end`, `deck` beside `way`) — (a)(c). M3a: the clear regions must reproduce it, and the warp holds deck ends.
- **#12 Ranks for the stages first built here (S10b, S12c)** — (c)(d). M3a's migration (inf.).
- **#11 Passages as L3 faces** — (a). M3a (sealing and opening a passage); M6-P.

**(2) Pass over:**
- **#42 Roofs** (the exact convex path and the downgrades) — derived, cached, never stored.
- **#10 and #17 Class-floor and work-limit values** — table rows and laws.
- **METROPOLIS budget misses** — the accelerator (#41) or a declared budget amendment.

#### M3a

**(1) Settle within M3a:**
- **#30 The warp's semantics** — (c)(d). M4: "a document with interleaved edits and two epochs replays to the session digest".
- **#14 Clear regions** — (a)(c). M4, where frame growth's batch (a) uses them. Taking the fallback re-opens the M1 and M2b goldens that carry `moat: 'all'`.
- **#37 Ground-part numbering and join records** — (c)(d). M4's underground hooks; M6-U.
- **#50 Retention** — from here on, any kernel change that moves output must keep N−1 and N−2 replayable.

**(2) Pass over:**
- **#14 Clear-region speed** — the plain-rule fallback.
- **The warp's cost** — §16's M3a fallback: "one check after the final step, F-REDERIVE for a failure".
- **#34 The `equalize` brush** — it shares `regularFit`.
- **Anchor ordinals** — they never reach a snapshot.
- **#40 `corridorUnion` on raised parts.**

#### M4

**(1) Settle within M4:**
- **#50 Output version 1** — (c). M5 is the first milestone re-opened.
- **#7 Frame growth** (the batch sequence, the never-shrink law, raster extension, the raised-foot order) — (c)(d). M6-E; the village.
- **#28 and #31 Wall → ring road via `retypeEdges`** — (c). M6-E.
- **#37 Underground parts and links (the hooks)** — (c)(d). M6-U.
- **#17 Work-count identity under any accelerator built for the performance tiers** — (d). Every later golden (inf.).

**(2) Pass over:**
- **#7 The re-grid fallback.**
- **#41 Accelerators and budget amendments.**
- **Known-issue rows the fail-safe rule allows.**

#### M5

**(1) Settle within M5:**
- **#13, #26, #40 Must not be changed: the seam exception, candidate (b), `corridorUnion`** — (a)(d). Changing them re-opens M1's `SeamContract` and every golden from M1 to M4. M5's own bars (Hausdorff 0; footprint hash identical to the city level of detail) need the kernel to give the close-up and the city the same answer.
- **#12 Ranks for S7c and S9b** — (c) (inf.). M6; M6-U.

**(2) Pass over:**
- **#40 Close-ups on arbitrary boundaries** — no arena-specific op.
- **The NG preset** — the kernel reads no preset (#49).

#### M6-P

**(1) Settle within M6-P:**
- **#38 Transient-arena contract** — `readBack`'s schema and order, the re-cut rule, seed tiling, the stored-plan carry check — (b)(c). Re-opened by M6's stage-3 `compose()`, by M-ENC's interiors (with V03's P1) and by P2's access records.
- **Resolve who owns the view-owned form** (L4969).

**(2) Pass over:**
- **#38 `tileRings` refusals** — a caller bug (F-PLAN).
- **#42 The plan rung's skeleton use** — labels and light only; "never a room" (L5466).
- **The planner's coarser module** — "never a second lattice" (L5021).

#### M6-U

**(1) Settle within M6-U:**
- **#40 Tunnel and gallery half-widths, and `chamber_wall` chains** (the kerb that frontage plots end on) — (a)(c). V-M2u; M-SITE-A after U3b.
- **#37 Part allocation per system and the `UndergroundLink` ends** — (c)(d). First settled by M4's hooks.

**(2) Pass over:**
- **#40 "One cut for every underground part"** — `corridorUnion` reuse.
- **#8 F-VOID's `E_NO_PATH` readers** — additive.
- **#46 Arena isolation** — already a §3.10 row.

#### M-SF

**(1) Settle within M-SF:** nothing in my range. "the kernel reads no dossier field" (L5633).

**(2) Pass over:** everything on the kernel side. The one kernel-facing item, the subterranean dossier institution's connector reading `E_NO_PATH` (L4334), is an additive reader.

#### Other milestones my range touches

- **M-ENC (after M1).** It builds the view-owned transient arena: the owner is `view:<hash64>`, it is never persisted, digested or frozen, and "K1–K13 unchanged" (L4972). It is ISOLATED. M-ENC is probably the *first* reader of `readBack`, before M6-P (inf., from the start-after columns), so that contract would settle there.
- **M6-E.** It uses #7, #28 and #31 at epoch scale, and #33's item 114 transitions.
- **M6-sky.** It uses #37 and #40, which "need nothing of their own".
- **The village.** It uses #6's territory law and #7's kept-arena share for item 322 (L4459–4465).

### 5. Pieces the doc defers with a named hook

1. **Clipper2 as the only engine**, on an M0 speed miss. Outputs still enter through `insertChain`; hosts without WebAssembly get `E_ENGINE_UNAVAILABLE`; the switch is a declared golden shift naming seven stages (L5424–5433).
2. **A per-loop WebAssembly accelerator**, only on a miss of more than 2×. A miss of up to 2× becomes a declared budget amendment; a loop that still misses gets a D-18 re-declaration for the owner's veto (L5436–5444).
3. **The skeleton leaves the product** if its corpus bar fails; the downgrades become the defaults (L5516–5522).
4. **The clear-region plain rule**, if a carve fixture fails at M3a (L4621–4624).
5. **Re-gridding during frame growth**, if M4's memory measurement fails (L4488–4495).
6. **A pool copy limited by the laziness contract, then pool shrinking**, if memory fails at M1 or M4 (L4686–4690).
7. **Lazy partition rebuilds**, for the open-to-editable bar (L5574–5576).
8. **Block-group chunks**, if M2a's rebased-size test fails (L5564–5567).
9. **An in-house BigInt `incircle`**, if the licence checker fails a version (L4298).
10. **The view-owned transient arena from "the kernel's stub row (API.md §8)"** (L4969).
11. **The skeleton's 1° bound**, "vetoable by the owner" (L5480–5481).
12. **Known-issue rows that fail safely** under §16's fail-safe rule: M0's are drained in M0's hardening, M1's at M4 (L21699).
13. **§16's cuts kept for the owner's veto** (L21808–21811). None of them is a kernel item.

### 6. Gaps, inconsistencies and inferences

1. **The stage-rank encoding has no stated remap (#12; inf.).** The rank is persisted as a position in §4.1's order and is "fixed per generator version". Stages are added at M2b and M5, and products can add stages by registration. A grep found no mention of a remap or of sparse numbering.
2. **The op-kind rank behind the canonical op sort is not defined in my range (#15).** A new op kind must not re-rank existing kinds (inf.).
3. **Work-count identity is not required for accelerators or optimisations (#17, #41; inf.).** The doc requires identical output on the golden suite. Count drift would only show where a golden happens to hit a limit.
4. **Who builds the view-owned transient arena is contradictory (L4969).** One sentence says "the kernel's stub row (API.md §8) builds the form at M6-P, its first view owner is M-ENC's". The next says "The transient arena's form is built by M-ENC's SE0 … M6-P its second reader". M-ENC starts after M1; M6-P's P0 starts after M4.
5. **Clear regions are used in generation before they are confirmed (#14).** S5a's outer moats go through the carve path (L5791, L8551, L9027). S5 is part of M1 ("S5 with each trace before its stage's growth"), yet the clear-region rules are only confirmed by M3a's fixtures, and their fallback changes generation order. §16 never names the milestone for outer moats (inf.).
6. **There is no savepoint or nested transaction in the range (#10).** Atomicity is per batch on a scratch overlay, and ladders retry whole batches.
7. **Some kernel material sits in §2.2, outside my range.** The arena layout, `LatticeSpec` and the stretch-state profile rules are defined there; I cite them from grep reads (L596–622, L641, L860–884).


## Appendix C — §4 the generation pipeline; §5 failure handling

## §4–§5 (generation pipeline, failure handling): what compounds and what can wait

I read docs/ARCHITECTURE.md lines 5638–10148 in full. I also grepped a few cross-references to date pieces: the §16 milestone rows at 21693–21701, §13.3 at 20179–20279, §6.1's stage-id and draw-order rules at 10184–10187 and 10275, §6.3's lineage key at about 10590–10601, the record shapes in §2.5 at 1181–1206, and one §13.2 test row at 18904–18911. Where something is my inference rather than the doc's text, I mark it **(inf.)**.

### The short answer

1. **Adding a stage later is designed as a local registration, and it does not re-open stored stage ranks.** Stage ids are u16 numbers, added only at the end and never renumbered. Stream keys and lineage keys carry the stage id, not the stage's position. "Adding one moves no existing key" (10184–10187). The run order is a topological sort of declared inputs and outputs, with the stage id breaking ties (5677–5679). Hook outputs join the host stage's inputs and outputs, and "with no hook registered the host is unchanged" (9734). In the doc's words: "Before its milestone each is absent and the stages around it are unchanged" (5674–5675). The data is reserved ahead of time: `Block.content` reads 'ordinary' in every document written before M5 (1198), and M1 reserves the `S8.seed` stage id for M5.
2. **But a local registration is not a local change of output.** Some base formulas already contain the term that a later stage fills in:
   - S2's stage-land formula carries `λ_b`, the block dispatch's land share (6114–6118), and S7b's capacity subtracts the expected dispatch land (7031). So installing M5's S9b with `@plat/hood` moves S2, then S3's boundary, then S3's gate count, because N₁ = round(1 + 0.47·√A) uses the stage-1 land (6218–6219), then S6's district count N_d, and so on down the pipeline.
   - M6-U's S7b steps (6) and (7) shift the ground allocation on every CITY and METROPOLIS seed, because sewers are always on at those rungs. The doc calls this "a one-time shift of the M6-U output version" (18910).
   - Each insertion is a declared shift and is designed for, but for the owner it is a cost spread across the whole town, not a leaf change.
3. **Some "leaf" tables feed back into the town's skeleton.** S2's demand reads:
   - the granularity table's plot area (the `plotArea` term),
   - the expected plot area from the class-mix weights at each band's centre (6116; 8409),
   - the S9b land share λ_b,
   - the farm mode: "S2 reads it before it demands the farm plots" (8655).

   N₁ (gates) and N_d (districts) read land areas that come from S2. S8's block-depth range reads the granularity depth rows (7323–7329). So a change to a granularity, class-mix or farm-mode row moves S2's and S3's stage-isolated digests: it is a shift of several stages that can change the gate count. These tables can be changed later behind the table-version and shift protocol, but they are not leaves.
4. **The ladders really are a seam.** Retries draw only from the key (entity lineage, concern, reroll, attempt). "No tier re-runs another stage or re-rolls anything outside the failing entity's scope" (9920–9922), and "No staged rung restarts anything above its district, unit or island" (9973). So changing a late rung changes output only on entities that reach that rung, plus whatever is downstream of those entities. Four things are not isolated:
   - the rung order and the detection thresholds (class floors, hard invariants);
   - the attempt cap (2 for geometric ladders, §6.1);
   - the delivery-tier accounting that M1's acceptance reads;
   - work-limit coefficients: "a change that moves output is a declared shift" (9851–9852).
5. **Hard invariants work in two ways.** A violation rolls the batch back "while its ladder continues" (10058–10059), so adding or tightening a hard row changes output only on seeds that violate it, as a declared shift. But several hard rows are the preconditions that later stages are written against:
   - roads leaving a walled stage = its gate count (10042);
   - footprints ∩ (wall band ⊕ setback) = ∅ (10031);
   - NF-P5 (10030);
   - the deck rule (10029);
   - containment (10052);
   - every plot has at least one access edge (10024);
   - S8's working block equals S9's committed block (7295).

   These compound and must be fixed at M1.
6. **The generation report is outside persistence and outside every digest, but it is a contract.** It is "a derived cache … excluded from the canonical form and every digest" (10121–10124). Its consumers are M1's report panel and acceptance gates, M3a's `report(doc)` and `report.changed`, and M-SF's host. `ReportCode` is deliberately closed: "`ReportCode` is untouched" (10074).
7. **The gap between M1 and M2b is large by design.**
   - M1 runs "O18 with a flat field" (§16 M1, 21694).
   - M2b (21696) brings the prosperity drivers, the six-band set, joins, splits, alleys, back lanes and the deep-interior shares, "S10b placement from the roster", S12, S12c, N markets, barrier closure and harbour furniture.
   - So what M1 must fix is the slots: the two-pass field structure, the `FieldBands` record, band-keyed table lookups, the `Block.interior`, `reach` and `Plot.exposure` fields, and the `PlacementSolver` request and result shapes. The contents can wait.
   - The band ids must be fixed by M2b at the latest, because M4 stores `builtBand` per plot in the model digest (8906–8908).
8. **What "fix later" costs grows by milestone.**
   - From M1, a same-seed change always needs a shift record plus cascade records; it is never silent (§13.3).
   - After M2a, user edit logs address the downstream entities whose addresses an upstream heuristic re-mints. Such logs replay under their own output version, and an upgrade re-matches their targets by anchor (§6.3).
   - Until M4 every link and document carries the preview flag.
   - From M3a the two previous output versions are kept (N−1, N−2).
   - From M4 output version 1 is fixed, so every later change is a new output version (§6.4, 10851–10852).

### Table of pieces

C = COMPOUNDS, I = ISOLATED, MIX = MIXED. Mechanism letters: (a) fan-in, (b) evidence, (c) persistence, (d) identity and determinism, (e) performance substrate.

| # | Piece | Where | Built (M0 stand-in?) | Later consumers | What later code relies on | If changed one milestone later | Verdict | The doc's own words |
|---|---|---|---|---|---|---|---|---|
| 1 | Stage registration and the order itself: `StageDecl`, sort over declared inputs and outputs, stage-id tie-break, u16 ids | §4.1 5677–5690; §4.12 9695–9745; §6.1 10184–10187 | M1 (M0 had only the spike stages). Village stage sets via `ProductDecl.stages` | every stage; stream and lineage keys (stage component); M2a scoped regeneration and "Re-derive from Sk"; M3a table invalidation; M5 hooks; M6-sky SKY; M6-U tail; village | ids never renumbered; the base order is exactly the drawn one; insertion by registration | renumbering an id or changing an existing stage's inputs/outputs moves keys, so every downstream address moves. A new stage shifts only its readers | **C (a)(d)** for the mechanism. Inserting a stage is a designed local registration (I) | "the base's registrations yield exactly the order drawn above" (5679); "Before its milestone each is absent and the stages around it are unchanged" (5674–5675); "needs no pipeline edit" (5682) |
| 2 | Stage hook points `S7b.afterGreedy` and `S10a.afterDrivers`; host's effective inputs/outputs = its own ∪ its hooks' | §4.12 9731–9737; S7b (1) 7038–7041; S10a 7571–7576 | declared M2b (item 323), registered M5 (S7c, S9b) | S7c, S9b (M5); invalidation | the call positions (between greedy and reconcile; between steps (i) and (ii)); hook-id order | moving a call position after M5 shifts every district | **I** (a designed seam). The call positions become C (a) once M5 is built | "declared at M2b with no registration until M5 …, so they do nothing before it" (9734–9735) |
| 3 | Batches per stage (one level each) and the level-write rule: L0 written by S1, S3, S4, S5b, S5a; L1 only by S3–S8; nothing writes L1 after S9; S10 never writes L1. Also `txForm` | §4.1 5765–5806 | M1 (kernel batches from M0) | the pool freeze (M1); NF-P5 and the strip rows; M2a tree-scoped re-derivation; M3a carve and water operators; M5 TemplateFabric (writes in S8's batch); M6-U tail ("write no ground geometry") | L1 and L2 are complete before the pool runs; a coarser batch never clears finer faces unless it declares so | a later stage that writes L1 breaks the pool, tree scoping and the NF-P5 declarations | **C (a)(e)**. The choice of `txForm` is I ("callback … always safe") | "by no generation stage after S9 (J-P46)" (5792); "registers as *callback*, which is always safe" (5685) |
| 4 | The laziness contract and the eager first map: the content decisions are eager and town-wide; S10, S10b, S11 and S12b write only inside their own faces; S8 is eager with its portals; S12c is eager after the merge | §4.1 5724–5748 | M1 (CI's derived-complete digest, §6.5 (9)) | pool (M1); click elaboration; M5 (S7c and S9b listed as eager); M6-P (the plan rung is lazy); M6-sky unit runs; the coverage of the model digest | any derivation order gives the same model | moving a decision between eager and lazy changes what the model digest covers, so every golden moves | **C (a)(d)(e)** | "So any order of derivation — viewer, worker, headless — gives the same model" (5733–5734); "**write only inside their own faces**" (5731); "the model digest covers the eager model" (5748) |
| 5 | Generation worker, derivation pool, hinterland unit; copy-on-write overlays merged in district lineage order | §4.1 5799–5821; §4.9 8558–8569 | M1 ("the derivation pool") | §12.3 budgets; M2a load verification (pool size 0); M2b METROPOLIS tuning; M6-sky island units; V01 standalone documents | pool size 0 gives the same model; a write outside the district's faces is `E_SCOPE`; merge order | changing the merge order or the overlay scope changes the slot remaps, so the digests move | **MIX**: determinism and cost contract C (d)(e); which configuration is primary is I (measured at M1 and M2b; same model either way) | "pool size 0 gives the same model (J-P10)" (5820) |
| 6 | The tail slot (`phase:'tail'`): runs after the first map, at a fixed fold position; its reconcile stage writes ground uses and household counts; the ground and root digests are finished after it | §4.1 5758–5764; §4.12 9745–9749 | the slot is in `StageDecl` from M1 (inf.); contents at M6-U | M6-U; M6-E (`under.extend`, fade); V-M2u; M-SITE-A | the fold position in replay; the order in which digests are finished | moving the fold position after M2a breaks replay equivalence | **MIX**: slot C (c)(d); contents I | "A replay runs them at the same fold position" (5763–5764); "the base registers none of them" (9749) |
| 7 | Declarations read ahead (the creation prefix of a skeleton's "bones"); each stage takes its own subject's declarations as constraints; bent at the dry run; held afterwards | §4.1 5847–5864 | M3a (item 101's T2–T8, skeleton files) | S1, S3, S4/S5b, S6, S10b, tail; §5.3 "declared means held"; M6-E history prefix; M-SF | prefix events keep their log positions; resolved forms are stored | changing how a stage reads declarations moves every document that has a skeleton | **MIX**: prefix format and "held" C (c)(d); each stage's honouring rule I | "The prefix's events keep their log positions …, so … one seed replays it byte for byte" (5859–5861); "A declared thing is held" (5863) |
| 8 | The strategy registry (Terrain, Coast, River, Manifest, Network, Enceinte, Fabric, Plot, SitePlan, BuildingGenerator, Evolution, PlacementSolver, DesignationMutator) and products; the Fabric slot `partition(district, seam, ctx)` | §4.12 9697–9730; S8 slot 7302–7306 | signatures M1. Implementations later: `TemplateFabric` M5, V02 `outline()` M6, 'history' M6-E, village VS4 | V01, V02, V06, V07 | signatures; "every caller resolves the registered one" | changing a signature re-opens every implementation | **MIX**: signatures C (a); implementations I (named seams) | "A product may register another implementation … by name, and every caller resolves the registered one" (9701–9702); fabric "`bent-cut` everywhere in the parity presets and without `@plat/hood`" (6890–6891) |
| 9 | S0 Blueprint and the auto-feature table; the draw order of `blueprint.features` (geology, relief and sewer existence appended); `autoResolved`; `Features.sewers` | §4.2 5867–5918; §6.1 10275 | M1. Geology, relief and sewers are in the first golden on purpose (§16 M1) | S1 (relief, geology, oasis); S3 (castle, moat); S7; II.7 (M6-U); V07; the recipe in permalinks and documents | one draw per feature in a fixed order; new draws appended; a toggle that is set still consumes its draw | inserting a draw in the middle shifts every later feature on every seed | **MIX**: Blueprint (recipe) and draw order C (c)(d); the P(...) rows are I (table version) | "drawn once … before any other stage and never redrawn by a later rung" (5895–5896); "appended after them in this order … so setting either moves no other draw" (10275) |
| 10 | S1 site: the Terrain and WaterBody records and side rasters (shore class, setback table, outfalls, SiteResources, geology and mining flags, course knots) versus S1's generators (fBm, coast arms, hydrology, bank classes, oasis, river islands) | §4.2 5919–6071 | M1 (M0 (e) spike S1+S4+S6); charter M-W1; surface and groundwater M-W0h | every stage (slope, water); S2 resource gates; S3 water pull; S10 setbacks; S10b wells; S12a; II.7 (M6-U); `moveCourseKnot` (M3a); `shiftCourse` (M6-E) | `WaterBody.controls` ordinals; L0 water faces with shore and bank edges; "the vector coast is authoritative" | a record or knot-scheme change re-targets stored edits. A generator change is a declared S1 shift whose cascade reaches every stage and every D-5 seed | **MIX**: records and knot ordinals C (a)(c)(d); generators I behind the Terrain, Coast and River strategies (wide cascade); river islands a rung (`not_built`); oasis I (P = 0 off the arid rows) | "the recorded input a `moveCourseKnot` edit addresses" (5976); "A standalone frame is unchanged (the charter's reading lands at M-W1)" (5925) |
| 11 | Crossing sites and pinned decks: `siteCrossings`; Bridge in state site or built; `deck_end` vertices; F-ROUTE's extra-bridge shore splits | §4.2 S1 (5) 5991–6034 | M1 (bridge furniture M2b; drawn bridges and water-operator re-siting M3a) | S3 (same deck form); S4 (decks as fixed edges); S5c snaps; S7 furniture; epochs (unused sites, M4); M3a operators (keep the Bridge address); §5.3 deck rows; M6-sky units | two pinned bank vertices; a site is not drawn, named or exported until a way uses it; within ±10° of square by construction | changing the state semantics re-opens S4, S7, §5.3 and the edits. Changing the siting heuristic is an S1 shift | **MIX**: Bridge record and deck semantics C (a)(d); siting heuristic I | "A site becomes a bridge only when a way uses it" (5999); "A site no way uses by the end of S5 stays a `site`" (6006) |
| 12 | S2 sequential, prefix-stable roster: `roster/<class>/<ordinal>`; markets keyed by ordinal; need propagation as a `perOther` floor; dossier fixed rows at the head of their class; the ContentProvider door | §4.2 6075–6100, 6163–6175, 6439–6447 | M1 (M1 classes and households); the remaining classes M2b; the dossier creation half tested at M1, its contract at M3a, the link at M-SF | S7b, S10a, S10b; M4 delta demand (the roster suffix); M6-E decline in reverse ordinal order; N_q (building count); `#k` members (M-SF); `hostContent` | prefix stability; the ordinals | changing the sequencing re-opens every epoch suffix and dossier binding | **MIX**: sequencing and keys C (d)(c); row values I (but see 20: a roster row change re-runs `portRef`) | "§10.2's sequential, prefix-stable roster" (6081); "keys each market by ordinal, so an epoch's suffix may add a secondary market" (6098–6100) |
| 13 | `StageQuotas` and the stage rows: n(c,b,k); A_k with `plotArea`, λ_b and `plotShare`; the stage count K and walled shares per rung; the history-shortened stage count K′ | §4.2 6110–6146 | M1 (`plotShare` measured at M1); λ_b ≠ 0 only with `@plat/hood` (M5) | S3 (6): A₁, which sets N₁ and t₁; S5a's t_k; S5d; S6's N_d; S10's exact check; epochs | demand = capacity by construction; the stage ordinal k (the derivation unit of S5 ways) | changing the formula re-opens S3, S5, S6. Changing any table it reads (granularity, class mix, λ_b, farm mode) moves S2, then S3's gate count | **MIX**: formula and stage ordinals C (a)(d); values I but a multi-stage shift | "refitted … by one scripted pass, with a declared golden shift (§13.3)" (6124–6125); "`λ_b` … 0 without `@plat/hood` and in the parity presets" (6117–6118) |
| 14 | S3 as one construction (gate routes, field T, boundary, gates, castle, trace, the L0 water batch, harbour route, market, then the L1 reservations) and the §4.1 "Why this order" | §4.2 6176–6180 (steps 6181–6438); §4.1 5709–5722 | M1 ("S3 reservations and gate sites"); market score, canals and closure M2b | S4 (commits S3's routes without re-solving); S5a (commits S3's trace unchanged); S7; S8 | no street on future water; walls fixed before streets; reservations are barriers before S4 | reordering breaks S4 and S5's assumptions and re-validates the "roads = N" row | **C (a)** | "so no later stage recomputes a boundary they were fixed on" (6179); "S5a commits this trace unchanged for k = 1" (6322) |
| 15 | Reservations as L1 barrier faces (the `Reservation` record, the `reserved` role, rank, `compactnessMin`, `handedFrom`) | §4.2 S3 (2) 6200–6215, (12) 6388–6428 | M1 | S4 (impassable); S5c legality; S6 edge test; S7b claims; S8 holes; S10 claims first; S11 templates; S12b parks; §5.3 (10027); M5 `reserve` seam runs; M6-sky hand-over; `setAttr rank` (a Re-derive from S3) | barrier semantics; record shape | a change re-opens every consumer listed | **C (a)(c)** | "no way crosses them (S4, S5) other than a flanking market's own way, S8 does not cut them" (6424–6426) |
| 16 | Gate picks and Gate identity: nested picks on `gate.pick`; the N₁ law; the waterfront and closed-arc reductions; the harbour pick and the detour guard; water gates; "roads leaving = N" | §4.2 S3 (4), (7) 6218–6304; §4.8 8465–8477; §5.3 10042 | M1 (harbour pick measured at M1); closed-arc reduction M2b (item 106) | S4 route split; S5a pins; S5b's N_k; S7; `TradeFlow.gates`; S10b trade rows; the market score; epochs; V06 | each gate keeps its pick's identity, ordinal, bearing and route; the prefix property; N exactly | changing the pick order changes the gate ordinals and addresses. Changing the law changes the gate count everywhere | **MIX**: identity, prefix and "= N" C (a)(d); constants, reductions and detour guard I (tables and a pre-decided rung) | "a smaller N is always a prefix of a larger one" (6240); "*Pre-decided fallback:* the detour guard of (7)" (6257) |
| 17 | Travel-cost field T and stage boundaries as level sets (one field; water pull; capped land; folded stages; re-settled by S5b) | §4.2 S3 (6) 6267–6289; §4.4 6619–6642 | M1; water pull M2b (item 111) | S3's boundary; S5a for every stage; epochs (M4); polycentric partitions; S5d | "no stage computes a new field"; stages nested | changing the field's definition moves every boundary | **MIX**: one-field construction C (a)(e); `a`, the pull weight and the regime rows are I (water pull is a soft term) | "so no stage computes a new field (SCL-3)" (6630–6631); water pull "weight 0: byte-identical" (6276) |
| 18 | The enceinte trace and record (`EnceinteStrategy` pull, pin, smooth and simplify; barrier closure, arcs, anchors; water gates; open chains; castle weld and repair; cross wall) | §4.2 S3 (8)–(9) 6305–6345; §4.4 6643–6697; §4.8 castle 8491–8531 | M1; barrier closure and stretch profile M2b (item 106) | S5a/S5b/S5c; S6 edge test; S7 strips, towers, gates; S8; S10 (0); §5.3 trace rows (10043); `wallToWay` (M4); `contractWall` and breach (M6-E); V07; raised-way laws (M3a) | the Enceinte record; gates and welds lie exactly on the trace; the trace is fixed before secondaries grow | a record change re-opens all of these. A heuristic change is an S3/S5a shift | **MIX**: record and pin semantics C (a)(c); pull, closure and castle repair constants I (the strategy, a no-op pin, the F-CASTLE rungs) | "With `barrier` closure and the stretch profile off, the trace is the base's (a no-op pin)" (6660–6661) |
| 19 | S3's L0 water batch (harbour basins, canals with deck spacing, castle and city moats with decks, the dry-moat rule, decoration ponds), the harbour route through a serving gate, and typed destinations | §4.2 S3 (2) 6200–6215, (10)–(11) 6346–6387, (13) 6429–6438 | M1 structure (inf.: the harbour pick is measured at M1); harbour furniture and canals M2b; ponds with the hinterland M2b | S4 (re-solves moat stretches through decks); S5c; S7 furniture; S10 (0) dry ditch; the carve path (M3a); §2.6 water table | water exists in L0 before any L1 way; the deck form; the harbour leaves through a gate | changing the rule re-opens S4, S5c and the §5.3 deck and quay rows | **MIX**: ordering and deck form C (a); templates, spacing and moat reach rows I (`W_MOAT_DRY` rung) | "Every deck has S1 (5)'s form and its two states" (6362) |
| 20 | Markets: the principal-market trade-convergence score with the `portRef` calibration cell; N markets; secondary claims (never touching, small patches); ranks | §4.2 6089–6100, 6388–6428; §4.5 S7b (3) 7058–7066 | M2b ("N markets with the principal-market score"); at M1 the market stays on the plaza (inf.) | S6 typing and the `market` district; prosperity kernels; S10b market rows; S11 stalls; epochs | rank on the Reservation; `portRef` computed from S0–S2 | a roster row change re-runs `portRef`, which bumps S3's table | **MIX**: rank C (a); score rows I; `portRef` is (b) evidence keyed on S0–S2 | "re-runs whenever a shipped roster row changes, … a table-version bump with its declared shift" (6404–6405); "0.12 (PLAUSIBLE) until the M1 receipt" (6406) |
| 21 | S4 lattice and the single cost function (`hexLattice` ≈ 25 m; slope, water, reservation, wall, existing-fabric and land-value terms; class grade limit `rampMaxGrade`) | §4.3 6450–6476 | M0 (c) spike on a flat synthetic site (a stand-in); full at M1 | S3 (picks, routes, T); S4; S5a, S5b, S5c; `drawWay` (M3a, stored resolved); carve re-routes (M3a); epochs (M4); history reuse cost (M6-E); village VS4 | one lattice and one cost form shared by everyone | changing the weights is one table change that shifts S3, S4 and S5 together | **MIX**: lattice and cost form C (a)(e); weights I (a multi-stage shift) | "reused by S3's pick contour, gate routes and field `T`, by S4's routes and by every S5a boundary" (6451–6452) |
| 22 | S4: one graph, then one smoothing; way class and width from multiplicity and betweenness; `width_knot`s; Y→T conversion; routes split at the gate | §4.3 6477–6514 | M1 | S5c crossing matrix; S8 continuation rules; S9 corridors; S10 frontage class; S11 treatments; `TradeFlow.ways`; naming; lights; avenues | the way-class vocabulary; "roads leaving = N" | a vocabulary change re-opens every class-keyed table | **MIX**: classes and the split C (a); smoothing and thresholds I | "S4 commits the gate routes solved at S3 … without re-solving" (6477) |
| 23 | F-ROUTE ladder (another site, then an extra bridge via two L0 shore splits, then the slope relaxed one class, then `unserved`) | §5.2 9940; §4.2 6016–6025; §4.3 6458–6466 | M1; reused by edits (M3a) and epochs (M4) | S3 (7), S4, S5b, the S4 local operator | rung order; the extra bridge's L0 write follows the level rule | adding a rung earlier in the list shifts every route that reached a later rung | **I** (rungs; output moves only on routes that reach the rung) | "a destination no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported)" (6463–6464) |
| 24 | Raised ways (viaducts, elevated roads, aqueducts): arena parts from 1; `RaisedWayRecord`; the `raised` data key with `RaisedRead`; committed before S7b (1); `RaisedReasonKey` and the ledger; generated only at CITY and METROPOLIS | §4.1 5694–5708; §4.3 6515–6573 | M3a (item 110's base parts) | S7b capacity; S8, S10 and S11 holes; S5c and S7 crossings; F-WALL's raised-way rung; V04 (M6-U); V05 (M6-sky); V06 (M6-E); V07 | one data key; arena parts allocated in stage order; stations kept from the commit | changing the slot or the key re-opens five volumes' readers | **MIX**: slot, key and identity C (a)(d); chance, cap and structure cells I (TOWN only by declaration) | `RaisedRead` "derived on read, never stored" (5699); "committed before S7b (1)" (6536) |
| 25 | `TradeFlow` (gate and way trade weights; derived; never canonical; no random draws) | §4.3 6580–6603 | M1–M2b (inf.) | S3 (12); S10b trade rows; §4.5 kernels and character trade position; epochs | the derivation rule | changing the rule shifts the market, the field and the character | **MIX**: rule C (a); not persisted, so I for (c) | "rebuilt on load, never canonical — and it draws no random number" (6585) |
| 26 | S5a and S5b for stages k ≥ 2 (boundary from T as it stands; trace; outer moats through the carve path; N_k primaries; spawned radials) | §4.4 6619–6727 | M1 ("each trace before its stage's growth"); reused by every epoch (M4) | S5c; S6; S7; M4 epochs; `contractWall` | the boundary is taken before S5b; gates are where arterials cross on ground part 0 | changing the order re-opens the epoch path | **MIX**: order and gate semantics C (a); spawning heuristics I | S5b covers "stages k ≥ 2 and every epoch stage" (6714) |
| 27 | S5c growth and its division of labour with S8 (walled regimes grow district-scale streets only; extramural regimes grow at block scale); heading model; crossing matrix; legality; prune and trim | §4.4 6728–6778 | M0 (c) spike, then M1; suburb regime M2b | S8 (district-scale faces in walled regimes); S6; epochs (built-face legality); §13.5 MFCG and NG signature rows | the split of scales; arterials are never trimmed | changing the split re-opens S8 calibration and §13.5's signature rows | **MIX**: the division of labour C (a)(b); heading, branching and bias parameters I (preset rows; CI drift test) | "In walled regimes S5c grows only the arterial-connecting secondary network at district scale" (6733–6734); "S4 and S5b arterials are never trimmed" (6776) |
| 28 | S5d capacity check, the stage-regime table and the fusion gate | §4.4 6779–6810 | fusion gate M0 (c), re-run at M1; regimes M1 (suburb M2b) | S5; F-BUDGET-STAGE; S10's exact check | a bounded top-up; the regime floors (read by S8) | the time fallback (lanes infill-only everywhere) would re-open the S5c/S8 split | **I** (a rung, table rows, pre-decided fallbacks). The time fallback is the exception: C (b) | "Neither fallback changes the architecture" (6807) |
| 29 | Shared-edge geometry: the settlement perimeter, the 2 m margin bands, and S10 (0)'s eager shared-edge bands (wall band, setbacks, glacis, towers, gatehouses) | §4.5 6818–6829; §4.7 7600–7616 | M1 | pool correctness; hinterland unit (M2b); M2a one-sided regeneration; carve (M3a); NF-P5; M5's equality of shared edges | no district overlay writes a shared edge; L1 and L2 are fixed before S10 | a change re-opens pool equivalence and every edit operator that touches strips | **C (a)(d)(e)** | "so the pooled districts and the hinterland unit never write the edge they share" (6826–6827) |
| 30 | S6 grower and district identity; the District record and typing by kind (seeds; round-robin turns on `district.seed` keyed by the grower's lineage and the turn; growth rates; edge and patch tests; merges; feature-named kinds; shanty rule) | §4.5 6830–6892 | M1 (shanty rule and full typing data M2b) | everything keyed by district (S7b, S8, S10b, S12b, S12c, S13a); M2a's S6 regroup operator; Seam records; M5 `DistrictContext`; edits, assignments, dossier | district lineage = the town plus seed order (§6.3); the same turns on a regroup | changing the seed order or keying re-mints every district address in user logs | **MIX**: identity and draw keying C (d)(c); rates, the N_d law and typing rows I (wide cascade) | "keyed by the grower's seed lineage … and the turn's number, so §7.3's S6 operator re-grows a scoped regroup by the same turns" (6842–6845) |
| 31 | Prosperity field: two declared eager passes (pass 1 at S6 with `characterOffset`; pass 2 at S10a); stored per face and as a raster; `drivers()` for the oracle. The soft-term contract. The daylight model sampler (nine suns, 32 m cells, bit layout, sampler digest) | §4.5 6893–6965 | M1 structure with a flat field ("O18 with a flat field", §16 M1); drivers and brush M2b; daylight M2b; island strips M6-sky; building-shade mask M6-E | S5d; S6 typing; S8's block depth (pass-1 band); S7b capacity; S10a; S10–S12b; epochs (re-evaluation); V05 island supply; M3a oracle | where each stage reads (pass 1 or pass 2); weight 0 is byte-identical; sampler layout and digest | moving a read point re-opens every reader | **MIX**: pass structure, read points and sampler layout C (a)(d); every driver I as a soft term | "at weight 0 the model is byte-identical to the model without it (a no-op pin, the parity presets' setting)" (6919–6920); "S10 onward reads pass 2" (6909); daylight fallback "recorded as a declared shift" (6940) |
| 32 | The band set and `FieldBands` (six bands; interpolation and the discrete-cell rule; cuts computed once per town from the band shares; the middle band; hysteresis; changed only by `setAttr`) | §4.5 6966–7020 | record at M1 (inf.: degenerate under a flat field); six-band set and middle band M2b; due marks M4 | every band-keyed table (granularity, templates, greenery, hidden shares, island supply, ladders, interior ladder, roster rows); `bandRange`; `builtBand` and the geometry floor (M4) | band ids as keys in stored records and tables; demand = capacity | changing a band id after M4 re-opens stored `builtBand`, every table and the floor | **C (a)(c)(b)**. Fix by M2b | "band capacity and demand agree by construction" (7002); "They move only by an explicit `setAttr` on that record … or by an epoch" (7003–7004) |
| 33 | S7b allocation: step order (5), (6), (7), (1) with hooks, (2), (4), (3); declared greedy order; `alloc.district`; capacity and affinity (supply term); a reconcile of at most 3 rounds; a stored `Allocation` per district and for the hinterland; sky, underground and undercity first | §4.5 7021–7105 | M1 ("the eager allocation"); supply term M2b; S7c hook M5; step (5) at M4 with SKY at M6-sky; steps (6)/(7) M6-U | S10a; S10b reconcile; S12a; SKY; tail; epoch delta (M4); M5 S7c template land | stored allocation; the order; "the ground receives the remainder" | changing the order or the record re-opens every lazy stage and the epochs | **MIX**: record, order and remainder rule C (a)(c)(d); scoring I; pseudo-district steps I behind settings (M6-U is a declared shift on CITY and METROPOLIS) | "persisted as one `Allocation` per district and one for the hinterland" (7043); the M6-U shift, §13.2 (18910) |
| 34 | S7b district claims (`claimSubFace` on non-strip faces), sub-districts, edge greens and orchards | §4.5 7045–7075 | M1 (claims); `squares.quota` "read from M2b" (7051); edge greens M2b | S8 holes; S10; S12b; the hinterland unit; M5 S9b (same `squares.quota`) | claims become reservations; no claim on strip ground | changing the claim semantics re-opens S8 and S10 | **MIX**: claims-as-reservations C (a); siting scores and thresholds I (F-SITING: re-site, then drop and report) | "re-sited on the next-best face and then reported and dropped (F-SITING)" (7057–7058) |
| 35 | S12c Character (`CharacterVector`, identity, `venueMix`; no random draws; recomputed on load), `bandRange` (written by S10a), dials, partition, pressure | §4.5 7106–7270 | M2b (the stage after S11); epoch character step and pressure M4; dossier powers M-SF | S13a names and descriptions; §10.4; II.1 `DistrictContext` and χ̃ (M5 S7c/S9b); epoch renames and re-typing; S10b and S11 range clamps; informal clusters; V10 | identity with its week; `bandRange` semantics | changing them after M4 re-opens stored identities, renames and pressure | **MIX**: inserted locally (I) but its records C (a)(c) for M4 and M5; rows and dial weights I (extension rows, 0 in parity presets) | "draw-free, recomputed on load and equal on recomputation (J-DET-12)" (7131); "the character step S12c (item 72) write theirs at the milestones that land them" (20276) |
| 36 | S8 bent cut as a kernel transaction: recursion on kerbs; lanes inserted at L1 in the district batch; T-junction ends; the F-CUT ladder (turned frames on `attempt`, mean normal, the always-succeeding slide, substitution); width law; continuation; hole slit | §4.6 7271–7443, 7517–7522 | M0 (b) transaction with hole slit, calibrated on NG; re-gated at M1 | S9 (identical kerbs); S10; deep-interior rule; M5 `TemplateFabric` (runs this recursion); II.2 ring template (slit); §13.5 NG and MFCG signatures; D-5 | "S8's working block ≡ S9's committed block"; lane lineage by cell | changing the contract re-opens S9 and M5. Changing the constants is an S8 shift that moves the calibrated signatures | **MIX**: transaction contract and lineage C (a)(d)(b); `cut.*` constants and `bendMode` per preset I; rungs I | "No rung restarts anything above F" (7429); "the primitive the stage-2 ring template needs (II.2)" (7520–7521) |
| 37 | Seam portals and the `SeamContract` (`baseLane` portals in the shared Seam; portal gap; dissolve on removal; the seam exception) | §4.6 7393–7404; §4.12 9739–9744 | M1 | M5 neighbourhoods (II.1); M2a locality oracle; M3a carve; §5.3 (10044) | one lane per portal vertex; both districts read the record | a change re-opens M5's contract and the oracle | **C (a)(c)(d)** | "Every district's `SeamContract` is complete from milestone 1 (G-P1)" (9740) |
| 38 | Deep-interior rule, reach, exposure and hidden shares (`Block.depthClass`, `interior`, `reach`; `Plot.exposure`; the interior access graph) | §4.6 7444–7516 | field slots M1 (inf.); shares, passages and exposure M2b; base weights "fitted at M1" | S10 interiors and passages; S11 spanning wings; S10b exposure rows; concealment (M2b); lights (M3b); §9.2 `knownTo`; sealing (M3a by hand, M6-E); §5.3 access (10024) | the vocabularies | adding or renaming a value re-opens every reader | **MIX**: vocabularies C (a)(c); shares and reach weights I | shares "calibrated at M-1" (7453–7455); "the base weights are fitted at M1 on B-CITY" (7494); the open reach is "the parity presets' only value" (7471–7473) |
| 39 | S9 `corridorUnion` and the Block and Frontage records (half-corridor strips, junction wedges, built blocks; `Way.slopeP95`) | §4.7 7557–7567; §2.5 1192–1206 | M1 (`slopeP95` M2b) | S10, S10a, S10b, S11; S12b and lights (own strips); character (frontage × trade); carve identity exception (`Frontage.way`); M5 `Block.content`; epochs (`Block.due`) | exact kerbs; record shapes | a change re-opens everything at block level | **C (a)(c)(d)** | "commits exactly the kerbs S8 cut against" (7557); `content` is "'ordinary' in every document written before M5" (1198) |
| 40 | S10a block allocation: (i) field-driving classes, then the `afterDrivers` hook, (ii) pass 2 plus `bandRange` plus re-homing, (iii) the rest; web order; one relaxation pass; a stored block-level `Allocation`; the way-surface rule at its end | §4.7 7568–7598 | M1 (eager); pass 2, `bandRange` and web order M2b; S9b M5; way-surface rule M2b | S10–S12b (pure functions of these records); hinterland unit | step order; the stored record | changing the order re-opens the M5 hook and `bandRange` | **MIX**: order and record C (a)(c); scoring I; way-surface rule I (a hook) | "the result is persisted as one block-level `Allocation` per block" (7591); "a pure function of these records and its own sub-stream" (7593) |
| 41 | Class floors, the granularity law and the S10 plot recipe (claims first; per-frontage regions by straight skeleton, with a reflex fallback; corners and wedges; residue kinds; joins and splits as one law with fixed orderings; vacancy runs; alleys as faces; at least one access edge; party walls) | §4.7 7617–7686 | M1 (strips; flat granularity); joins, splits, alleys and rung modifiers M2b; incremental re-cut M3a/M4 | S2 (`plotArea`); S8 (depth band); S10b JOIN requests (M3a); S11 mutator land (M3a); epoch re-cuts (M4, M6-E); `plotToGarden` and `amalgamate`; §5.3 class floors (hard) | floors; Plot shape; join and split orderings; the access guarantee | changing an ordering re-opens every stored join, split and ladder event | **MIX**: floors (hard), Plot record and orderings C (a)(b)(c); granularity rows I but a multi-stage shift (S2, S8) | "one code path (O18 g)" (7665); the class floors' "one home" (7617) |
| 42 | Levelling, retaining walls and deck plots (`terrace.enabled`; `platformCm` and `platformSteps`; `levelledGroundCm` as the one reader; the district-edge wall source; `deck.offer`) | §4.7 7687–7759 | M3a (items 110 (a), (d)) | V02 `deriveBase`; ways' stair or ramp; V04; V05; S10b `deckOk`; S11 `DeckContext`; decline of decks (M6-E) | one reader; wall identity (creation index 4096 + ordinal) | changing the reader or the identity re-opens four volumes | **MIX**: reader and identity C (a)(d); switch and rows I (off means the raster sampler, 7736) | "false in the parity presets" (7688); `deck.offer` "0 in the parity presets" (7751) |
| 43 | S10b, the one placement solver (`place` and `explain`; hard rows filter, soft rows score; derived supply links; distances by mode; least-disruption order; reconcile; closest options; the `W_DOSSIER_EDGE` last rung; `PlacementOrder`), with its M2b extensions (class mix, concealed fronts, cluster class rule, split sites, chains, coverage) | §4.7 7760–7957, 8164–8245, 8362–8417 | M1 runs a reduced S10b slot (inf.); the solver at generation M2b; post-build requests M3a; relocation over epochs M6-E | generation; hinterland; `assign`; dossier; positive placement; relocation; F-EDIT (M3a); V10 explain (M3c); M-SF | the request and result shapes; one solver (T16-3); `PlacementOrder` | changing a shape after M3a re-opens stored assignments and dossier placements | **MIX**: interface, records and one-solver identity C (a)(c); rows and `placement.extensionWeight` I (0 in parity presets) | "the one solver every path that puts a use on a plot calls" (7761); `PlacementOrder` "a declared one-time shift of the records digest at the milestone that lands it" (7929) |
| 44 | S11 designation template, row footprint = plot ∩ frontage band, the `outline()` seam, front-line jitter; M3a's stepped and deck builders and the court retype | §4.7 7958–8052 | M1 (row, detached, hovel, heights); compounds and specialisation M2b; V02 massing behind `outline()` M6; court retype M3a | mutator (M3a); Works (M4); V02 and V03 (M6, M6-P); roofs (M2b); exports | one table per class; slot roles; `BaseWing.corners` as fixed input; the party wall is the plot's side line | changing the roles or the wing contract re-opens the mutator and V02 | **MIX**: table shape, roles and wing contract C (a)(c); template rows I; `outline()` I (a named seam) | "Every path that creates or changes a building reads this one table" (7976–7977); court retype "once at M3a, a declared shift" (8041) |
| 45 | Designation mutator and `MutationRecord` (match by role, order subtract→convert→adapt→add, `siteplan.mutate`, record and inverse, "one path") | §4.7 8053–8101 | M3a. Its "one path" rule also constrains how M1's S11 is written | `assign`, `setAttr`, dossier events (M3a, M-SF); relocation (M4, M6-E); Works (M4); epoch-spread mutation (M6-E); the undo inverse | stored records in events; a stream keyed by plot lineage | if M1's S11 is not written as add-only mutation, M3a re-opens S11 as a declared shift (T18-4) **(inf.)** | **C (c)(d)** | "this stage's own batch and a later mutation are one code path" (8087–8088) |
| 46 | Households per building, the capacity function and the overflow pass | §4.7 8132–8163 | M2b ("the generation fill … within §2.6's one household capacity") | `relet` (M3a, M4); F-PLAN's never-omit rule (M6-P); the §5.3 capacity row (hard, 10013); dossier population (M-SF); M4b occupancy; Works | `Building.households` within capacity | a change re-opens the plan rung and the epochs | **C (a)(c)** | "So the solver and the plan agree on how many households a shell holds" (8158–8159) |
| 47 | Furniture and lights: S11 pins, `LightSource` rows and records, notice posts; S7's towers, gate-plaza pins, harbour-mouth chain, harbour works rows | §4.7 8102–8131, 8246–8305, 8418–8421; §4.8 8478–8490, 8532–8554 | pins M1 and M2b; lights M3b; harbour furniture M2b | the night view, exports, §5.3 light row | the rows; light ids from host lineage | a row change is a declared S11 or S7 shift | **I** (rows; territory rungs place nothing; MFCG places no lights) | first `LightSource` placement "writes a shift record for S11 with cause `feature`" (20274–20275) |
| 48 | S7 wall strips, setbacks and intervallum, gate plazas, gates = N; graded stretch; condition at generation | §4.8 8428–8477 | M1 (walls, gates, towers, castle); stretch grade and condition M2b | S7b (no claims on strips); S8; S10 (0); §5.3 rows 10030, 10031, 10042; `wallToWay` (M4); carve (M3a); V06 | strips and roles; gate counts | a change re-opens S8, S10 (0) and NF-P5 | **MIX**: strips and gate semantics C (a); widths and rows I; an absent stretch profile is the uniform base wall; condition is a no-op pin | "Both faces are unbuildable" (8442); "an absent profile is uniform (the base's wall; §7.5)" (8450–8451); condition "(the no-op pin)" (8463) |
| 49 | S12a hinterland siting, the farm table and farm modes, the hinterland unit's recipe (field-system presets; outward claim; furlong model with render-time strips; count-driven outside plots) | §4.9 8555–8687 | M2b ("S12 hinterland presets"; "FTG's hinterland order and modes") | S2 (reads the farm mode first); hinterland unit; S10b outside classes; epochs (new outside classes, M4) | the hinterland allocation; disjoint unit faces | a mode-row change moves S2, then everything downstream | **MIX**: allocation and unit contract C (a)(e); presets I (strips are render-time); farm-mode rows I but a multi-stage shift via S2 | "S2 reads it before it demands the farm plots" (8655); "so the strip look costs no model faces" (8596) |
| 50 | S12b greenery rule table (band rows; own faces only; avenues in own strips; park recipes; species; trees at render time) | §4.9 8688–8767 | M2b | §8 rendering; epochs (re-garden) | own-faces rule (row 4) | a row change is an S12b shift | **I** (a rule table; refused layouts are left out and reported; trees never stored) | trees "never stored" (8722) |
| 51 | S13a names and label candidates, with the quarter merge tree they name (`QuarterNode`; the N_q fit; names change only in §6.3's draw cases; addresses; descriptions from character) | §4.10 8768–8786; §4.5 6856–6867 | M1 (quarters and districts); street names O13-core M2b; descriptions from character M2b | labels; exports; gazetteer; M2a replay ("S13a per event"); M3a naming re-draws; renames (M4, M6-E); dossier names (M-SF); §5.3 names row (10049) | names persist; the draw cases; the tree shape | changing the draw cases re-opens stored names and renames | **MIX**: draw cases, tree shape and persistence C (c)(d); grammar, word lists and N_q constants I (renames go through §6.3) | "a successor keeps its predecessor's name" (8771); "a generated name changes only by one of §6.3's draw cases" (10049) |
| 52 | View side: S13b label placement, S14 display list, S15 simulation | §4.10 8773–8780 | M1 (S13b and S14 for the ink preset); S15 M4b | §8; M2a `DisplayDelta` | outside the model | changes are view shifts (style version, `outputVersion: null`) | **I** | "without any placement entering the model" (8775); "S15 … never in the one-click path" (8778) |
| 53 | `grow-by-stage`, the one incremental path (epoch event, delta demand, regrowth-first, built-face legality, survivors byte-identical); `EvolutionStrategy` phases; `EpochInputs`; the runner; the clock; the rung at an epoch and frame growth; Works by hand | §4.11 8789–8989, 9135–9177, 9232–9316, 9446–9464, 9563–9688 | M4; engine M6-E | M6-E 'history' strategy (wraps the base phases); village epochs; M-SF dossier cadence; M-W | stored epoch events; the phase list | changing them after M4 re-opens every document with epochs | **C (c)(d)(a)** | "The base builds and tests exactly one path — add a growth stage to an existing town — at M4" (9174–9175); "With no epoch nothing here runs, so the static baseline is unchanged" (8816) |
| 54 | Wealth ladder and geometry floor (`Block.due`; rungs 1–3; ladder table; churn caps; `builtBand` and `builtProsperity` in the model digest; the manifested band) | §4.11 8809–8985 | M4 (hooks, table, attributes with migration); engine M6-E | S10 and S11 geometry reads; S9b dispatch; epochs | stored attributes; which band each reader takes (manifested for geometry, field for occupants) | changing the reading rule re-opens every re-derivation after M4 | **MIX**: attributes and reading rule C (c)(d)(a); table rows I | "persists `builtBand` and `builtProsperity` … in the model digest … never recomputed from the field" (8906–8908) |
| 55 | The `ConversionOp` union and carve (`wallToWay`, `gateToJunction`, carve with footprint R, the identity exception, batches 1–4; decline, ladder, use, terrain-water, hidden, evolve and site ops) | §4.11 8990–9129, 9317–9381, 9505–9562 | S5a's trivial carve at M1; carve edit M3a; `wallToWay` and the decline kinds M4; `EvolveOp` M6-E; `SiteOp` M-SITE-A | stored `convert` events; locality oracle | op semantics; the list of records that name a way (re-pointed by the identity exception) | a new record that names a way must join the exception list **(inf.)** | **C (c)(a)** | the batch "re-points every record that names the way by id along the far part" (9113–9115) |
| 56 | The decline and regrowth engine and history-first generation | §4.11 9178–9231, 9382–9445, 9465–9504 | kinds and tables M4; engine and replay M6-E | M-SF histories; village V-M3; M-CAL | replay epochs keyed 0x8000_0000 + r; the creation-prefix replay | changing the keying re-opens every history-first document | **MIX**: keys and prefix C (d)(c); engine and rows I behind `EvolutionStrategy` and no-op pins | "With the replay off … generation is byte-identical to the base (a no-op pin)" (9228–9229); "with no epoch the static baseline is unchanged byte for byte" (9491) |
| 57 | Failure ladders and tiers (no whole-map retry; the batch is the unit of failure; retry keys; seven tiers; the §5.2 F-* rows; the EP edge and combination suites; delivery tiers; bug aborts; New random's content check) | §5.1 9818–9924; §5.2 9925–9974; §4.13 9751–9808 | M0 (F-CUT), M1 (the rest); New random check M2a; staged rows with their layers | every stage; M1 acceptance (zero tier-6 omissions); §13.5 ladder-use row; CI (`bugs` empty) | retries keyed on (lineage, concern, reroll, attempt); tier semantics | changing the keying or tiers re-opens every stage's ladder and the acceptance counts | **MIX**: mechanism, taxonomy and accounting C (d)(b); each rung I (output changes only on entities that reach it) | "every retry draws from (entity lineage, concern, reroll, attempt) and nothing else reads that stream" (9921–9922); "No staged rung restarts anything above its district, unit or island" (9973) |
| 58 | Cost controls that can change output: work limits (laws over committed counts; coefficients at the 99.9th percentile × 1.5; F-WORK's coarser rung) and the quality budget `perf.qualitySpend` (shipped empty) | §5.1 (5) 9832–9861; F-WORK 9956; §4.1 5749–5757 | M1 (confirmation at M1); quality rows later | M2a (a scoped re-run gets the same limit); every stage | law form; no time limits | changing the law form re-opens scoped-regeneration equivalence | **MIX**: law form C (d); coefficients I but "a change that moves output is a declared shift"; quality budget I (no-op pin) | (9851–9852); "the shipped empty table changes no output" (5755) |
| 59 | The §5.3 invariant suite (scopes batch, stage, save, load, CI; hard or soft; kinds; the cost rule's fallback) and the hard rows later code is written against | §5.3 9975–10066 | M1 ground rows; M2a dry-run reuse; staged rows with their layers | every stage; edits; CI (0 per 1 000) | the preconditions listed in the short answer | adding a row is a declared shift on violating seeds; changing a precondition row re-opens its consumers | **MIX**: framework and precondition rows C (a)(b); moving a row to stage-end scope is I | "Hard invariants abort the batch, which rolls back … while its ladder continues" (10058–10059); "moves to stage-end scope — still hard, checked later in the same stage" (10063–10064) |
| 60 | The generation report (`GenerationReport`: stages' work, attempts, warnings, ladder uses and invariants; requested; prefix; requested-vs-built; auto-resolved; bugs; dossier; dossier notes; epochs; changes; kernel; `ReportCode`) | §5.4 10067–10147 | M1 (report panel with delivery tiers); API M3a; epochs M4 and M6-E; dossier M-SF | V09 panel; `report(doc)` and `report.changed` (M3a); host (M-SF); CI acceptance | field names; the closed `ReportCode`; `[]` never absent | renaming a field after M3a breaks the API and host consumers | **MIX**: a derived cache, so I for (c) and (d); its consumer contract is C (a) | "a **derived cache** … excluded from the canonical form and every digest" (10121–10124); "`ReportCode` is untouched" (10074); "an empty list is `[]`, never absent" (10144) |

### Per milestone: settle now versus fix later

#### M1 (most of this range)

**Must be settled within M1 (COMPOUNDS):**
- **Stage registry, stage ids and the level-write rule J-P46, plus the batch structure** (rows 1, 3). (a)(d). First re-opened at M2a: scoped re-derivation, "Re-derive from Sk" and replay all walk this structure. M5's `TemplateFabric` writes inside S8's batch.
- **The identity scheme of every stage**: S4 routes in destination order; S5 ways in acceptance order; S6 districts in seed order; cells by split ordinal; S8 work keyed by cell; S10 by block; S11 by plot (§6.3). Also the river course-knot ordinals, gate ordinals and the prefix property, roster ordinals, and the S0 draw order (rows 9, 10, 12, 16, 30). (d)(c). First re-opened by M1's own goldens and B-EDIT-lite identity fixtures, then by M2a's edit log, locks and stored rerolls.
- **Record shapes written by one stage and read by later ones.** (a)(c). First re-opened at M2a (the log over M1's `.plat` format), then M2b (which fills them) and M3a (migration). They are:
  - Terrain and WaterBody, Bridge (site/built), Reservation, Gate, Enceinte and Castle, way classes and width knots;
  - District, QuarterNode, Seam with its portals;
  - the `FieldBands` record together with the two-pass field slots, even while the field is flat;
  - Allocation (district, hinterland, block);
  - Block, including the fields reserved for M5;
  - Frontage, and Plot with its access, party-wall and exposure fields;
  - SitePlan and the wing contract (rows 10, 11, 15, 16, 18, 22, 30–33, 37–41, 44).
- **The laziness contract, pool merge order, S10 (0) eager bands and margin bands** (rows 4, 5, 29). (a)(d)(e). First re-opened at M2b (METROPOLIS tuning and the pool rule) and M5 (eager S7c and S9b; shared edges byte-equal).
- **S3's one-construction order, S5's "trace before growth", and the hard precondition rows.** The rows are: roads = gates; footprints off the wall band and setback; NF-P5; the deck rule; S8's block equals S9's block; containment; at least one access edge (rows 14, 26, 36, 48, 59). (a)(b). First re-opened by M2a's dry-run validation, which reuses them, and by M2b's parity runs, which are measured on top of them.
- **The S5c/S8 division of labour, as re-gated by the fusion gate at M1** (rows 27, 28). (b)(e). First re-opened at M2b, whose §13.5 MFCG and NG signature bands are fitted on it.
- **Ladder keying, tier taxonomy and the report fields that M1's acceptance reads** (`requested`, `ladderUses`, `bugs`, `stages[].attempts`) (rows 57, 60). (b)(a). Read by M1's own gates, then by M3a's API.
- **The work-limit law form** (row 58). (d). First re-opened at M2a, where a scoped run must get the limit it had in the full run.

**Can be passed over at M1 and fixed later in isolation (the seam is named in each case):**
- S1's generators: the Terrain, Coast and River strategies plus the F-OUTLINE and F-RIVER rungs. Seam: stage-isolated goldens with a shift record (§13.3); the cascade is wide.
- S3 constants. Seams: table versions and pre-decided fallbacks; F-CASTLE rungs; the harbour pick's detour guard ("*Pre-decided fallback:* the detour guard", 6257). The constants are:
  - the centre score table, plaza and castle area bands, the N₁ coefficients;
  - the castle repair constants;
  - the anisotropy rows `a`.
- S4 cost weights, smoothing and class thresholds. A table version, but a shift across S3, S4 and S5 together.
- S5c heading, branching and bias parameters (preset rows; CI drift test). S5d's top-up (a rung). Stage-regime rows (M-1 refits).
- S6 growth rates, the N_d law, typing rows, the quarter cost and the N_q fit (table rows; wide cascade).
- S8's `cut.*` constants and `bendMode` per preset (§7.6 per-preset values), and the F-CUT rungs.
- Granularity rows and class-floor values. Table versions, but they move S2's and S8's digests too.
- Template rows, furniture pins, tower spacing, and the naming word lists (renames go through §6.3's cases).
- S13b and S14: view shifts with `outputVersion: null`.
- The quality budget: an empty table, a no-op pin.
- Calibrations that M1 itself sets, each with its doc fallback:
  - `plotShare`: refit with a declared golden shift, 6124–6125;
  - `portRef`: PLAUSIBLE until the M1 receipt, 6406;
  - the detour factor: refit per rung, 7809;
  - the hidden-share weights: fitted at M1, 7494.
- Which pool configuration is primary: measured, and it gives the same model either way.

#### M2a (editing core)

**Must be settled:**
- The replay fold, including "S13a per event" (§16 M2a), and the fold position reserved for the tail (row 6). (c)(d). First re-opened at M3a (migration and rebase), then M4 (epochs).
- How the dry run evaluates invariants: batch-local and stage-end rows checked once on the scratch overlay, and a chain of batches checked once after its last batch (9979–9986; row 59). (a). First re-opened by M3a's carve and water operators.
- The New random content check and the rerolls stored in the event (§5.1 (6), 9862–9880). (c)(d). First re-opened at M3a and M4.

**Can wait:**
- The cost rule's fallback for per-edit validation: move a row to stage-end (10063–10064).
- `reroll.maxAdvance`, a cell of the base settings row.

#### M2b (parity content; the largest set of declared shifts)

**Must be settled:**
- **The band-set ids, `FieldBands.middle` and the band-keyed table lookups** (row 32). (a)(c). First re-opened at M4, which stores `builtBand` and the geometry floor.
- **Where each stage reads the field (pass 1 or pass 2), and the soft-term contract** (row 31). (a). First re-opened at M4 (epochs re-evaluate the drivers), M6-sky (island strips) and M6-E (building-shade mask).
- **The `Block.interior`, `reach` and `Plot.exposure` vocabularies** (row 38). (a)(c). First re-opened at M3a (sealing and opening passages by hand) and M3b (lights by exposure).
- **The `PlacementSolver` request and result shapes, and the one-solver identity** (T16-3) (row 43). (a)(c). First re-opened at M3a (assignments go through the solver; dossier contract).
- **Household capacity and the generation fill** (row 46). (a)(c). First re-opened at M3a (`relet`), then M6-P.
- **S12c's records and `bandRange` semantics** (row 35). (a). First re-opened at M4 (the epoch character step) and M5 (χ̃ and `DistrictContext`).
- **The call positions of the hook points, and `squares.quota` counted once** (rows 2, 34). (a). First re-opened at M5.
- **The hinterland allocation and the unit contract** (row 49). (a)(e). First re-opened at M4.
- **The D-5 parity sitting itself.** (b). After M2b, every shift records `d5SeedsChanged` (§13.3, 20211), so each later shift that moves a panel seed re-opens that panel.

**Can wait:**
- Each soft-term weight: daylight, water pull, siting families, coverage, supply links, spread and pull. Seam: weight 0 is byte-identical (6919).
- The daylight `pointsPerCell` fallback (a declared shift, 6940).
- Class-mix rows. Rows, but S2 reads the expected plot area, so changing them shifts S2 too.
- Covers and concealment rows (`placement.extensionWeight`). Cluster rows. Greenery rows (row 50).
- Farm-mode rows (they couple to S2). Market siting rows and `portRef` (row 20).
- Barrier-closure rows and the stretch profile (a no-op pin when off, 6660–6661). Wall-condition rows (a no-op pin, 8463). The grandeur ceiling (a no-op pin, 8392).
- Harbour-wall rows, deep-interior shares and reach weights.
- The way-surface rule (a hook, 5673–5674).

#### M3a (full editing, migration, API)

**Must be settled:**
- `MutationRecord` and the mutator's "one path" (row 45). (c)(d). First re-opened at M4 (Works shows the record), then M6-E (epoch-spread mutation).
- Carve semantics, the `ConversionOp` kinds, and the identity-exception list of records that name a way (row 55). (c)(a). First re-opened at M4 (`wallToWay`) and M6-E (`digCanal`, `shiftCourse`).
- The `raised` key, `RaisedRead`, the commit slot before S7b, arena-part allocation and `RaisedReasonKey` (row 24). (a)(d). First re-opened at M5 (V01 §3.17), M6-U, M6-sky and M6-E.
- `levelledGroundCm` as the one reader (row 42). (a). First re-opened at M5, M6-U and M6-sky.
- The creation-prefix format (row 7). (c). First re-opened at M6-E (the replay prefix) and M-SF.
- The least-disruption order and closest options inside `PlacementResult` (row 43). (a)(c). First re-opened at M-SF.
- The report as an API surface, `report(doc)` and `report.changed` (row 60). (a). First re-opened at M-SF.
- From here, output versions N−1 and N−2 are kept, so every later heuristic change is replayable under the old version.

**Can wait:**
- `raisedWays` chance, cap and structure cells (generated only at CITY and METROPOLIS; at TOWN only by declaration, 6534–6535 and 6554–6556).
- The terrace switch (off means the raster sampler, 7736) and the `retaining` rows.
- Deck-offer rows. `DisruptionBudgetRow` weights.
- The court retype (a declared shift, 8041) and the stepped and deck builders (behind `outline()`).

#### M4 (incremental path; output version 1 fixed)

**Must be settled:**
- The epoch event, `EpochInputs`, the phase list of `grow-by-stage`, the regrowth-first order and the Works record (row 53). (c)(a). First re-opened at M6-E, which wraps the base phases; also the village and M-SF.
- `builtBand`, `builtProsperity` and the rule for which band a reader takes (row 54). (c)(d). First re-opened at M6-E.
- The epoch character step and renames (row 35). (c). First re-opened at M6-E and M-SF.
- The fixing of output version 1: from now on every same-seed change creates a new output version (10851–10852).

**Can wait:**
- Ladder-table rows, churn caps, decline-table rows, `WorksTable` rows and dwell bands.
- S7b (5)'s island count, which is off unless `recipe.layers.islands` is set.

#### M5 (neighbourhoods)

**Must be settled:**
- S7c's `District.fabric` with its template land in the allocation, and S9b's `Block.content` with its land accounting (rows 2, 33, 39, 40). (a)(c). First re-opened at M6 (stage 3), M6-sky unit runs, M6-U and M-ENC.
- λ_b becomes non-zero, a global declared shift starting at S2 (row 13). (b).

**Can wait:**
- Template rows, the NG preset, and the F-TEMPLATE, F-DISPATCH and F-UNIT rungs (9966–9968).

#### M6-P (plan rung)

**Must be settled:** nothing new inside this range. The plan rung must stay lazy (5838) and agree with M2b's capacity function (row 46).

**Can wait:** the F-PLAN tiers ("this row is its hook", 9949) and the interior-ladder rows.

#### M6-U (underground)

**Must be settled:**
- What the tail may write on the ground: its reconcile stage writes ground uses and household counts, and the ground digest is finished after it (row 6). (a)(b).
- The S7b (6) and (7) "remainder" rule (row 33). (a)(b).
- These are a declared one-time shift of every CITY and METROPOLIS golden (18910). First re-opened at M6-E (`under.extend`, the fade, the crowding hook) and M-SITE-A.

**Can wait:** the F-UNDER, F-NET and F-VOID rungs ("this row is its hook", 9950–9952), the underground rows, and the tail strategies behind `phase:'tail'`.

#### M6-E (evolution engine)

**Must be settled:**
- The replay-epoch keys (0x8000_0000 + r), the creation-prefix replay epochs, and the `EpochReport` chronicle, which is kept across a rebase (10082–10083) (row 56). (c)(d). First re-opened at M-SF (dossier histories), V-M3 and M-CAL.

**Can wait:** decline, hazard and history rows, and the 'history' strategy's own phases. With the replay off generation is byte-identical (9228–9229).

#### M-SF (SettlementForge)

**Must be settled:**
- The host-facing report surfaces (`dossier`, `dossierNotes`, `changes` with `changeId`) (row 60). (a). First re-opened at M-W.
- Where the base reads the staged port rows. Those points are already fixed in the base:
  - the crime factor, 7547–7552;
  - the hinterland import factor, 8608–8614;
  - legitimacy and impairments, 7220–7224;
  - `PowerRelation`, 6876.

**Can wait:** the values of the port rows (the factor is 1 while they are empty), the ladder-record member rows (C4b), and the cover rows.

#### M6-sky

SKY's own data keys, `reservations.landing` and `allocations.landing`, are designed so that nothing that runs before SKY reads them (5686–5690). SKY is isolated behind the islands setting: "With the islands setting off, SKY registers and writes nothing" (5690–5691).

### Pieces the doc explicitly defers with a hook

- **S7c and S9b**: "stage 2's (V01 §3.1; registered at M5)" (5673). Their hook points are "declared at M2b with no registration until M5 … so they do nothing before it" (9734–9735).
- **SKY**: "the sky layer's (V05 §3.1; M6-sky)" (5673). S7b (5) and the `SkyStrategy` registration are in 7076–7088 and 9745.
- **The way-surface rule at S10a's end**: "built at M2b (V01 §3.7.3)" (5673–5674).
- **The tail**: "the underground layer's (M6-U). Before its milestone each is absent and the stages around it are unchanged" (5674–5675); "the base registers none of them" (9749).
- **The quality budget**: "shipped empty …, so the shipped empty table changes no output" (5749–5755).
- **The world**: "the charter's reading lands at M-W1" (5925); the surface and groundwater steps and `frameOf` "land at M-W0h" (5984).
- **The mining flag's ore clause** waits for the underground rows: "§7.6's invalidation by slice re-derives S1 when the row lands" (6066–6071).
- **Staged records, schema-complete and empty**:
  - a staged `PowerRelation` (6876);
  - `PortRows` legitimacy and impairments, "while the rows are empty legitimacy reads 1" (7224);
  - the crime row, "schema-complete and empty in the base" and "the row empty, every factor is 1" (7547–7552);
  - the hinterland port row, "While the row is empty the factor is 1" (8614);
  - `ConditionOverlay`, "staged, empty in the base" (9656);
  - `DepositSite` (9690).
- **The evolution engine**: "its hooks are concrete now" (9135); the use step, "the hooks now, the engine's step later" (9317); decline, "the base carries now" (9385); terrain and water, "the engine is owner-staged, the kinds and the hand path are the base's" (9515); history-first generation "built with M6-E" (9178–9179).
- **Stage-3 and underground failure classes**: F-MASSING, F-COMPOSE, F-PLAN, F-UNDER, F-NET, F-VOID, each "this row is its hook" (9947–9952). The staged layers' classes "each built with its layer" (9961).
- **The Fabric slot**: `BentCutFabric` now, `TemplateFabric` at stage 2 (7302–7306; 9698). The building generator's `outline()` goes to V02 at M6 (8028–8033).
- **The plan rung** "enters the lazy list" (5838).
- **Raised ways at a TOWN**: "A TOWN gets them only by declaration" (6534–6535). The rung gate, "the router prices a span only when the routed rung is CITY or METROPOLIS" (6554–6556).
- **No-op pins that make later rows safe to land**:
  - soft terms (6919);
  - barrier closure (6660–6661);
  - wall condition (8463);
  - the grandeur ceiling (8392);
  - the history replay (9228–9229);
  - "with no epoch the static baseline is unchanged byte for byte" (9491).
- **Declared one-time shifts named in advance**:
  - the `plotShare` refit (6124–6125);
  - `portRef` (6404–6406);
  - the daylight `pointsPerCell` fallback (6940);
  - the court retype at M3a (8041);
  - `PlacementOrder` (7929);
  - work-limit coefficients (9851–9852);
  - the first placement of `LightSource` records (20274–20275);
  - S12c, the class mix, informal clusters and concealed pairs at the milestones that land them (20275–20276);
  - the M6-U allocation shift (18910).

### Inferences and tensions in the doc worth settling

- **S10b at M1 is unstated.** §16's M1 row says "S0–S11", but M2b brings "S10b placement from the roster" and "the one placement solver at generation". M1's placement rule is never stated (row 43). The detour factor is calibrated at M1 (7809; T16-4).
- **Hidden-share base weights are "fitted at M1 on B-CITY"** (7494), but passages, exposure and the hidden-share rows are M2b content (§16 M2b).
- **S6's grower lists each secondary market's claim among its seeds** (6830–6832), yet S7b (3) makes those claims after S6 (7058–7066), and 6813–6815 says such a market seeds typing, "never its growth". Because district addresses follow seed order, this needs settling no later than M2b, when N markets land.
- **Stage-end hard invariants**: §5.3 says a hard violation "abort[s] the batch", but for stage-end rows (for example S7's roads = gates, 10042) this range never says which batch rolls back.
- **Arena part numbers**: parts made at generation "take theirs in their stages' order" (§2.9, Document's part counters). A new arena-creating stage that sorts before an existing one would renumber parts, and part numbers are inside addresses (inf.).
- **Bands under a flat field**: with M1's flat field the `FieldBands` cuts cannot divide built land by shares; the doc does not say what M1's bands are (inf.: effectively one band until M2b).
- **Harbour, bridges, canals**: M2b's row lists them, while S1's decks, S3's moats and the harbour pick's measurement are M1. I read this as M1 having the deck and route structure and M2b the furniture and canals (inf.).


## Appendix D — §6 determinism; §7 editing and regeneration locality

## Reader report: docs/ARCHITECTURE.md §6 Determinism (10148–11047) and §7 Editing (11047–13230), scoped to M1 and every milestone after it

I read both ranges in full. Outside them I only grepped to resolve cross-references: §2.2 rule 5 (lines 893–901), §2.9 step 3 (4007), §3.4 (4835), the SeamContract lines (9740, 22092) and the §16 milestone rows (21693–21726). Line numbers are exact. Anything marked "(inf.)" is my inference, not something the doc says.

### Main findings

1. **The doc deliberately keeps saved documents independent of the random-number design.** "Edited documents — stability across such changes comes from carry-over by anchor and from migration (§7.5), never from stream keys" (10838–10839).
   - So changes to the RNG engine, the key layout or a stream's keying get expensive in two ways: accumulated evidence (goldens, calibration, parity panels) and identity (generated addresses are the base-32 form of the lineage hash, line 10615).
   - They do not break the document format. User documents get through such a change by M3a's upgrade, at some risk of orphaned edits.
   - The deadline for settling them is the first golden (M1) for evidence, and output version 1 at M4's exit for users.
2. **The heaviest persistence compounders are all in §7.** In order of entry into data users keep:
   - M2a: the edit-log envelope and the `seq` scheme; vertex addressing through `resolveVertexAt` and CarryMap; the ordered fold with its creation prefix; carry-over semantics.
   - M3a: the upgrade machinery; table row keys and slices; the dossier binding key law and CarriedFacts.
   - M-SF: the same dossier pieces again, now in live SettlementForge campaigns.
3. **The doc already has the seams that make most algorithm changes isolable.** Each costs a declared shift plus an upgrade diff, but nothing breaks:
   - stage-isolated goldens with per-stage shift records (10911–10914);
   - fates and renames compared only under the output version that confirmed them (11886–11888);
   - effective scopes, bends and points-form shapes stored already resolved (11651, 11549);
   - versioned sugar expansion (11529);
   - a forward-only schema chain (12290);
   - one port adapter per host line (12905);
   - `refuse.staged` stubs for layers not built yet (11424, 12005);
   - reserved id ranges (10186, 10214, 10225).
4. **Several hooks are placed at M1 so later milestones only append:**
   - later products' stage ids, V01's concern ids and `S8.seed`;
   - S0's geology, relief and sewer draws, so they are in the first golden (§16, line 21694);
   - empty-in-base digest nodes for staged records (10455);
   - the namespace segment (10587);
   - `EditBase.verb` (11064).
5. **Couplings and gaps worth a second look:**
   - `resolveVertexAt`'s rebind radius borrows §6.3's anchor radii (897–899), so changing an anchor radius silently changes how saved vertex edits bind.
   - The leaf hash includes "attributes in schema order" (10444), so adding a field to a hashed kind is an output shift even when the schema change is additive (inf.).
   - The anchor-radius fallback (10752) is not called a declared shift, although the partition fallback is (10772). Both change which entity succeeds which.
   - The namespace is kept on clone and save-as while `docId` is re-minted (10587, 10825–10827). A clone and its original therefore share addresses, so merging them into one package would collide (inf.).
   - `Assignment.placed` is "persisted with the event" (12643), but my range never says whether replay reuses it or re-solves it.
   - Upgrade hand-offs are "recomputed … on every replay, never stored" (12340), and the range does not say how an earlier `upgrade` event folds under a later version (its migrate cell is "—", 12094).

Mechanism letters in the table: (a) contract fan-in, (b) evidence accumulation, (c) persistence, (d) identity/determinism, (e) performance substrate.

### Pieces (52 rows)

| # | Piece | Where | Built (locked) | Direct consumers | What later code relies on | What a change one milestone later re-opens | Verdict | Doc's own words |
|---|---|---|---|---|---|---|---|---|
| 1 | RNG engine and draw helpers: xoshiro128** per stream; `float01=(u32>>>8)·2⁻²⁴`; `normal` = sum of 12 uniforms (Irwin–Hall); `bell4`, `mean3`, `weighted`, `deck` | 10162, 10359–10364 | M0(d); locked by M1's first golden | every stage that draws; paint programs and furniture (`STAGE_VIEW`); the stamp-tile asset build | the exact u32 sequence of every stream and each helper's formula | every stage digest moves, so every golden needs a cascade record; M1/M2b calibration and parity evidence (D-5 runs, B-CITY bands) re-measured; after M4, every user document re-maps by upgrade (orphan risk, no format change) | COMPOUNDS (b)(d) | no explicit freeze; "no transcendental in the RNG layer" (10360); powers go "through `dmath.pow`" (10364); "a declared cascade shift … never a silent one" (10836–10837) |
| 2 | Key derivation and stream-key layout: seed key → entity key → stream key over 104 packed bits (stage u16, concern u16, reroll u16, attempt u8, epoch u32, salt u16); the town root's fixed lineage; one stream per derivation, continued | 10163–10179 | M0(d) → M1 | every draw; distinctness CI; report rendering | the key bits; the field widths, which set the user caps (reroll 32 767, salt 0xFFFF, epoch 2³¹−1); "never on `docId`" (10170) | as #1, plus every cap and its refusal key | MIXED: layout and mixing COMPOUND (b)(d); how keys are computed, and their text form, ISOLATED | "never from strings" (10163); "No string is built on the generation path" (10175); fallback "output-neutral, so no golden moves" (10179) |
| 3 | Stage-id and concern-id registries (u16, append-only) | 10180–10187, 10263–10268, 10288, 10291 | M0/M1; later products' stage ids appended at M1's API pass; V01's concerns and `S8.seed` reserved at M1 | stream and lineage keys; `StageDecl.streamKeys`; the generated `rerollLayer` type; the derivation table's chance column | numbers never renumbered or reused | renumbering moves every key and lineage hash, and with them every newly minted generated address: a full cascade | COMPOUNDS (d)(b) for the numbering; appending ISOLATED | "append-only and never renumbered" (10180); "appended at M1's API pass … Adding one moves no existing key" (10186–10187); "never reused" (10288) |
| 4 | Per-concern keying rows: derivation unit, creation index, attempt cap, order of draws within a stream; roster draws keyed by ordinal; bearings keyed by binding key; fixed-key draws (E-03) | 10269–10349, caps 10215–10222, E-03 10257–10262 | with each stage: M1 (S0–S13a); M2b (S10b, S12); M3a (siting after generation keyed by `seq`, `raised.reason`, `plan.*` hooks); M4 (`works`); M5 (`hood.*`); M6 (`massing`); M6-P (`plan.damage`); M6-U (`sewer`, V04) | the reading stage; local operators (S6's operator needs `district.seed`'s turn index); §7.8's population continuity and §4.11's departures (roster prefix-stability) | which draws stay put when unrelated things change | if only that stage's draws move, one shift record; where a local operator or the locality oracle depends on the keying, M2a/M3a B-EDIT identity must be re-proven; `seq`-keyed dossier placements replay differently at upgrade | MIXED: the keying pattern COMPOUNDS (a)(b)(d); a row's cap or number of draws ISOLATED (a stage-local shift) | "the row's cell is the one statement of how its draws are keyed" (10266); "no concern's number of draws changes" (10222); "so setting either moves no other draw" (10275); "re-grows a scoped regroup exactly" (10282); "never re-drawn" (10260) |
| 5 | Re-roll state: absolute reroll counts in `regenerate`; stage-3 rung counters `<building>#<rung>` folded coarse to fine; salts (`Recipe.salts`, `rerollLayer`, per-entity naming salts) | 10190–10251 | component M0; New random M2a; rung hooks M3a, used by M6 and M6-P; salts in links M1, `rerollLayer` M2a/M3a | `regenerate` and `rerollLayer` events; links (`&r=`); the faithfulness campaign (32 768+i); variations; naming records | counts are absolute and logged; a finer rung never moves coarser streams; only 7 concerns accept salts | stored logs would replay to different towns; changing the rung order re-rolls every stored plan and wing at upgrade | COMPOUNDS (c)(d)(b) | "capped at 32 767; rerolls from 32 768 up are reserved" (10214–10215); "a finer re-roll leaves every coarser concern's stream unchanged" (10212); "no recipe, link delta or log can give any other geometry stream a salt" (10243) |
| 6 | Epoch component and history-replay keys | 10223–10233, 10351–10354 | component M0; live epochs M4; replay range M6-E | lineage creation epoch; `LifecycleEvent`, `EpochRecord`, `conditionEpoch`; the epoch-key CI test | live epochs 1…2³¹−1, numbered after the creation prefix; replay epoch r keyed as 0x8000_0000+r; ordering by week | the lineage keys, and so the addresses, of everything born at an epoch in stored documents | COMPOUNDS (c)(d) | "upper half of the u32 range reserved to it" (10225); "compares the epochs' weeks …, never their numbers" (10231); replay "adds no concern" (10354) |
| 7 | Decoration and instance draws, and positional overrides | 10365–10368, row 12084, 12206–12228 | M1 (instances, stamp tiles); override events M3a | renderer; exports (trees byte-identical on five engines from M3a); linted override resolution (10928–10931) | key = render key + ordinal, never the zoom band; only overrides stored, matched by ordinal, else by position, else orphaned | export goldens shift; stored overrides re-match, some orphan | MIXED: override addressing COMPOUNDS (c); the placement function ISOLATED on the render axis | "so nothing re-scatters with zoom. Nothing is stored except the user's instance overrides" (10366–10367); "ordinals are geometry-stable only under the same lineage" (12084) |
| 8 | Weather stream (session seed) | 10369–10398 | M3b | §8.4's weather layer, §8.2's marks | never saved; reads nothing; no model code reads it | only test T124-9 | ISOLATED | "never in the document, a link, the log or an export" (10372); "No stage, model stream, digest, tile key or export reads it, and it reads none" (10396) |
| 9 | Closed set of model inputs: `model=G(outputVersion,base,log)`; no clock, host text engine, viewing order, worker timing, host code, installed pack, run-time preferences, host seed, pointer or session seed; host providers recorded in `hostContent` | 10410–10441, 10956–10960 | lint M0(d); laziness contract M1; packs, `hostContent` and preference folding M3a | every model package, adapter and provider; replay of every stored document; the link emission rule | a document plus its blocks is enough to replay it on any host | a leak found later breaks goldens and cross-host replays; admitting a new input needs a new document block and an output bump | COMPOUNDS (a)(c)(d); the double-run check ISOLATED | "a pure function" (10412); "Nothing else reaches the model" (10417); providers "read from there on replay … so the document replays without the host" (10958–10960) |
| 10 | Model digest byte layout: leaf hash over kind, id, lineage, parent, existence, flags, attributes in schema order and owned face/chain digests; nodes sorted by address id; per-level geometry digests in canonical order; 32-bit lanes, IEEE bits (−0 as +0), UTF-8; H128 = MurmurHash3 x86-128, seed 0 | 10442–10477; §2.9 at 4007 | M0(d) → M1 (goldens, the `.plat` root of record, five-engine placement digests) | goldens; cross-host CI; the load root check; rebase `stateDigest`; upgrade `baseDigest`; bridge convergence; oracle leaf digests; New random's content check | exact bytes | every golden re-signed and every stored root recomputed. This is survivable only because the leaf encoding is per output version and M3a re-roots rebased bases | COMPOUNDS (b)(c)(d) | "the digest's hash is specified exactly" (10476); "no dependence on byte order" (10474); the leaf encoding belongs to "that version's model packages" (4007) |
| 11 | What the digest covers: eager model only, lazy content entering at its first edit; names and `LabelEntity` in; provenance, records, order fields, style, view, `hostContent`, dossier block, lighting, label placement and unedited close-ups out; Works stage and character vector derived and unhashed, identity/pressure/name history hashed; elaboration cache outside both digests | 10442–10444, 10449–10464, 10478–10486, 10556–10582 | M1, with empty-in-base layer nodes; additions at M2b (LightSource), M4 (Works, identity), M5 (close-ups), M6-U (underground), M3a→M6-P (cache) | goldens; the oracle; replay = session; click-order identity | what does and does not move a digest | moving a family in or out shifts every golden and changes what the oracle sees | COMPOUNDS (b)(d) for the boundary; the excluded families and the cache are ISOLATED as a result | staged records "empty in the base" (10455); "no digest ever depends on a click" (10581); cache "dropped at upgrade (non-canonical)" (12376) |
| 12 | Digest maintenance and load recomputation | 10487–10493, 10514–10540 | M0(d) bars; M1 root check; M2a load verification | load, save, export, API, bridge | the root is a pure function of the leaves | nothing | ISOLATED (e) | "none moves a golden, because the root is a pure function of the leaves" (10519–10520); "PLAUSIBLE until M0 (d)" (10519) |
| 13 | Records digest (derivation and naming records, plus `laidAt`/`courseAt` order leaves) | 10494–10513 | M2a (joins the snapshot; §16 at 21694) | replay = session; truncation identity; load verification; schema transforms | a leaf layout owned by the file schema | one forward schema transform per change; no golden moves | MIXED: (c) through the schema chain, not (b) | "Its leaf encoding belongs to the file schema, not to an output version" (10505); goldens "read the model digest alone" (10511–10512) |
| 14 | Histories, not states (continuity) | 10543–10555, 12866–12879 | M3a; live at M-SF | every dossier-bound document; host-undo convergence; history-determinism CI | map = f(seed, ordered dossier history, edits); dossier draws keyed by touched plots and `seq`, never by dossier values | every stored campaign map | COMPOUNDS (c)(d) | "continuity is chosen over path-independence" (10546); "never by the values the dossier holds" (10549) |
| 15 | Document identity and namespace segment | 10587–10588, 10825–10828 | M1 (API pass) | every address; the API and bridge form `<docId>/<id>`; cross-document references (V14, V13) | the segment = first 40 bits of H128(docId) at creation | every cross-document reference and exported address | COMPOUNDS (c)(d) | "minted at creation from M1's API pass and read from `docId` on an older document at load" (10587–10588) |
| 16 | Lineage key and derivation units, including lineage continuation on JOIN/SPLIT and resurrection | 10589–10611, 10773–10796 | M0(d) minting; M1 (every stage's `lineageUnit`); M3a fusion and splitting; M4/M6-U stretch splits | all streams; generated address tokens; the `dup` component; epochs | the key tuple, the 64-bit hash, the unit per stage, the canonical creation order | new generations mint different streams and addresses: a cascade plus re-mapping of stored documents | COMPOUNDS (b)(c)(d) | "`StageDecl.lineageUnit` names each stage's derivation unit" (10606); JOIN is "the exception to J-DET-2" (10776) |
| 17 | Address scheme and collision rule: `kind:token`; layer/part prefix, parts never reused; generated token = lineage hash; user-created = hash(`seq`, ordinal); opaque; `~k` suffix and `dup` | 10612–10628 | M1 (generated entities); M2a (user-created) | edits, locks, assignments, labels, households, exports, host bindings, the supersedes table | ids that users and hosts hold | stored logs, exports and host rows; a changed minting rule re-mints ids on replay, so edits orphan | COMPOUNDS (c)(d); opacity is the seam for how tokens are derived | "never parsed from the id" (10619); "the session and a replay resolve them identically" (10626) |
| 18 | Carry-over: survival, succession, tombstones, `supersededBy`, `carry` events; CarryMap is the supersedes table | 10629–10654, 10157–10158, 4835 | rule M1; M2a scoped regeneration; M3a operators and upgrade; M4 epochs | every re-derivation; `resolveVertexAt`; fates; names; exports; dossier bindings | a survivor keeps address and lineage; a successor takes the old address and name with a fresh lineage | the survival meaning of every saved edit | COMPOUNDS (a)(c)(d) | "a permanent address that follows it, separate from its random stream" (10158); "leaves the model digest unchanged (J-DET-2)" (10654) |
| 19 | Anchor and hysteresis table, and the matching routine | 10700–10772 | budget M0(d); B-EDIT-lite at M1; M2a; M3a; a row per kind at its milestone | succession; the upgrade mapping; overrides; `resolveVertexAt`'s rebind radii (898–899) | radii, class families, the tie-break (distance, old id, fresh id), greedy one-to-one assignment | which stored edits carry and which orphan; how stored vertex edits rebind | MIXED: existing rows and the tie-break COMPOUND (c)(d); the acceleration structure ISOLATED; new kinds additive | "keep ≥ 99.9 % of addresses" (10751); radii fallback (10752); "the switch is a declared shift" (10772) |
| 20 | Naming identity: a name follows its address with its naming record; five draw cases; case-(4) renames confirmed and stored | 10655–10699 | M1; M2a; M3a (case 4); M4 (case 5) | labels; exports; naming claims; `EditBase.renames`; `changedConfirmations` | a carried name is kept while its naming inputs are unchanged | hashed names re-drawn on replay, so mass rename confirmations at upgrade | COMPOUNDS (c)(d) | "a carried name is kept exactly while its naming inputs are unchanged" (10684); "Case (4)'s renames are confirmed like fates" (10689) |
| 21 | Deterministic ordering rules: id tie-breaks; merges in lineage order; collisions by lineage hash; the matching tie-break; canonical insertion order; re-seat and rebind ties by (y, x) | 10951, 10829, 10626, 11612, 12212, 900 | lint M0; pool M1; edits M2a/M3a | every golden and replay | stable tie resolution | outputs shift, and so do replays whose ties are hit | COMPOUNDS (d)(b) | "Every sort uses a total-order comparator with an id tie-break" (10951); "in lineage order, never arrival order" (10829) |
| 22 | Version axes, the declared-shift rule, goldens and retention: output, generator, schema, table, pack and style versions; preview until o1; stage-isolated goldens with shift and cascade records; N, N−1, N−2 chunks; frozen view | 10831–10840, 10850–10866, 10898–10915, 12544–12546 | M1 (stamp, records, tooling, preview); M3a (retention); M4 (o1 fixed) | every document and link; the golden store; upgrades; M-CAL | a shift = a stage digest moving; the generator version is never a replay key; model packages loadable per version | the accumulated record trail and what it means; packages not split per version would make retention a retrofit (inf.) | MIXED: axes, shift semantics, record formats and per-version packaging COMPOUND (a)(b)(c); tooling and window length ISOLATED | "bumps exactly when a release declares a shift" (10851); "fixed at M4's exit" (10856); "only stages whose own code or tables changed can differ" (10913); "shrinks to N−1" (10909) |
| 23 | Permalinks: `?o&s&z`; `&r=` deflated CBOR recipe delta; `&l=` deflated CBOR log; `&st` | 10867–10897 | M1 (preview); M2a (`&l=`, rebased-town refusal); M3a (pack and host refusals) | users' links; CI round trips | links stay parseable and replayable | links in the wild; permanent from o1 | COMPOUNDS (c), softened by the preview flag until M4 | "emitted only when it can rebuild the same town … on any machine" (10877) |
| 24 | Numeric policy and its enforcement: dmath; `**` only with literal exponents 0–4; allowlist lint over the import closure; vendored scan; one boolean/offset engine per output version; WASM accelerator; determinism CI | 10916–11046 | M0(d); tests added at each milestone | model packages; view code whose output reaches a digest | identical bits on every engine | a dmath routine's bits changing is a shift for every caller, and `pow`/`log` feed S1 and §4.6, so it is near-total; swapping the engine is a declared golden shift | MIXED: the "everything non-exact through dmath" rule and one engine per version COMPOUND (b)(d); bit-identical re-implementations, lint and CI ISOLATED | "changing the engine is an output-version bump with a declared shift" (10955); accelerator "output-neutral and moves no golden" (11042); Clipper2 "cannot reproduce the arrangement engine's integers" (11043) |
| 25 | Edit-log record format: `EditBase` (`seq` from `nextSeq`, never reset, survives rebase; author, verb, session, group, renames, dossier fields, closure, creation, mutations, disruption), the `EditEvent` union, `RowOp` by row key; the log only grows | 11062–11185; lifecycle table 12051–12099 | M2a. Fields and kinds added per milestone: `verb` (M1, read from M-W0h); closure/sugar/warp/draw/assign/editTable/upgrade (M3a); convert and Works (M4); plan events (M6-P); world and site kinds | the fold; undo/redo; host storage and bridge; `&l=` links; clerk transcripts; skeleton files | `seq` is the creation index of draws and the key for minting ids; dry-run results are stored resolved | every stored document needs a schema transform per changed kind; a `seq` change re-mints every user-created id | MIXED: envelope, `seq` scheme and shipped payloads COMPOUND (c)(d); new kinds and optional fields ISOLATED | "never reset; survives rebase" (11063); "the log only grows, which is what lets a host store it" (11193); "rows by stable key, never by position" (11179); "none is invented" (12057) |
| 26 | Geometry addressing in events: no `VertexId`/`FaceId`; `moveVertex` = `LatticePoint` + `VertexSig`, bound by `resolveVertexAt(key, at, sig, CarryMap)`: exact point, else signature match within the rebind radius, else orphan; course knots by body and ordinal | 11188–11193, 893–901, 4835, 12055–12056 | M2a; M3a (warps, knots, sky-island frames) | replay; upgrade replay; bridge | a stored edit rebinds to the same vertex or orphans visibly | stored vertex edits could drift to other vertices (coupled to #19) | COMPOUNDS (c)(d) | "No event stores a `VertexId`" (11188); "never bound by distance alone, so an upgrade replay never moves an unrelated vertex" (900–901) |
| 27 | Ordered fold, the creation prefix (the one read-ahead), and replay mode (S13a per event, S14/S13b once at the end) | 12025–12050, 11694–11698 | M2a; creation prefix M1 (port fixtures) → M3a (skeleton, dossier) → M6-E (history replay) | load verification; migration; undo beyond records; bridge; CLI | each event folds on the state its predecessors left, through the session's code path; creation events are never undo targets | the meaning of every stored log | COMPOUNDS (c)(d) | "an ordered fold … nothing is hoisted" (12025–12026); "The one read-ahead (the one statement…)" (12027) |
| 28 | Named actions: Regenerate (keep settings); New random; Adjust vs Re-derive from Sk; a designation change is neither; Same kind, new seed (Enter, seed+1 mod 2³²); Surprise me; variations | 11195–11215, 10399–10407, 12015–12022 | M2a; Surprise me M3b; per district M5 | `regenerate`/`adjust` events; the control registry's locality class; UI, API, clerk | keep = recorded inputs and unchanged rerolls, byte-identical; `adjust` stores `fromStage` and fates | stored modes; changing "keep" re-opens every stored regenerate | MIXED: event semantics COMPOUND (c); Enter's seed rule, labels and variations ISOLATED | "'Try again' is only its catalogue label" (11203); "A designation change is neither" (11204); Adjust local "only for parameters … consumed at S10 or later" (11208) |
| 29 | Warp stored as operations, and records carried with the ground (mean-value coordinates, re-seating, held halving, door lights, wing carry) | 11216–11240, 12206–12242 | M3a | replay; the kernel's `warp`; S1's water operator; pins, overrides, labels, lights | each stroke is an operation on the geometry at its log position | stored warps replay differently under a new version (an upgrade diff, no format change) | MIXED: storing operations COMPOUNDS (c); the warp kernels' maths and carry formulas ISOLATED | "never as stored displacements" (11220); "a replay recomputes the same points and rings by replaying the same operation" (12238–12239) |
| 30 | How each edit kind folds (resampling, item-110 forms, building-level edits, brushes, empty edits, every kind at the edit boundary, the frame) and the hold on deleted generated content | 11242–11345, 12243–12265 | M2a, M3a, M4, M6-P | the fold | payloads resolved at the dry run | algorithm changes surface only at upgrade; the suppression key binds every generator, absorb and epoch | MIXED: per-kind algorithms ISOLATED; suppression records COMPOUND (a)(c) | delete "holds through regeneration, every absorb and every epoch … lifted only by its undo or … re-add serving the same key" (11335–11336); empty edits leave "`nextSeq` and both digests unchanged" (11344) |
| 31 | Edit-target registry, dry-run outcome table, catalogue keys and `ConflictAction` kinds | 11348–11475 | M2a; API kinds M3a | the V09 catalogue; host API; clerk; enumeration tests | refuse/bend/conflict/confirm classes; key names; the returned kinds | key names are the host's and clerk's vocabulary; bends only affect new edits | MIXED: key names and returned kinds COMPOUND (a); refuse-vs-bend policy ISOLATED | registry declares "edit kinds with their undo path and lifecycle row" (11353); "No row returns `reroute`" (11470) |
| 32 | Authoring toolkit, tool binding, sugar events, points forms, three surfaces and the skeleton file | 11484–11576, 12398–12403 | M2a (T9, T10); M3a (T2–T8, sugar, points forms, skeleton); M3c (clerk) | canvas; clerk API; skeleton import; V09/V10 encoders | sugar is expanded at fold time at its recorded `expansion` version; points forms store the resolved shape | every sugar version must stay expandable forever | MIXED: tools and binding ISOLATED (seam: the event vocabulary); `expansion` versioning, resolved-shape storage and the skeleton format COMPOUND (c) | "never a thirteenth tool" (11506); "expand them exactly as the session did" (11529); "no replay and no later derivation re-derives or moves an accepted shape" (11549); clerk "staged (M3c)" (11574) |
| 33 | Protection semantics and the precedence order (lock > dossier existence > assignment > drawn geometry > tables > defaults; declared means held) | 11579–11604, 12696–12728 | M2a (lock, pin, edited); M3a (the rest) | every operator; Regenerate and New random; epochs; absorb; the placement solver; fates | what a saved protection guarantees | every operator and epoch re-validated; stored protections replay differently | COMPOUNDS (a)(c) | "the one order for every meeting of protections and inputs" (12696–12697); "A dossier event is never refused by a lock or a pin" (12707) |
| 34 | User inputs applied at their log position: drawn constraints through their local operator; "Rebuild around my drawings" as a rebase; brush stroke lists composited in log order and clamped once, threshold τ=0.01 | 11605–11645 | M3a; M2b (prosperity brush) | the fold; local operators; epochs; exact undo | the stored form is the drawn geometry at its position, or the stroke list | every stored drawn edit or stroke reinterpreted | COMPOUNDS (c)(d); τ and the masks ISOLATED | "survives only as the explicit action Rebuild around my drawings" (11613–11614); "clamped once at the end" (11618) |
| 35 | Effective scope (stored resolved), tree scoping, and the one-sided re-run of shared-edge parts | 11650–11666, 11678–11693 | M2a | `regenerate` events; the oracle; district regeneration | the stored scope; byte identity outside it | changes to how scope is resolved touch only new edits | MIXED: storing the resolved scope COMPOUNDS (c); the tree-scoping implementation ISOLATED | "stored in the event as the resolved `EditScope`" (11651–11652); "sound by over-invalidation" (11678); fallback "cover both sides" (11689) |
| 36 | Seam records and the seam exception (NF-P6) | 11667–11677, 10596, 10737; 9740 | M1 (Seam records, `SeamContract` on every district); M2a (the exception); M5 (consumer) | stage-2 close-ups on both sides; the oracle; M5's shared-edge (Hausdorff 0) test | which writes on the neighbour's side are allowed | M5's close-ups and shared-edge identity | COMPOUNDS (a)(b) | "Every district's `SeamContract` is complete from milestone 1" (9740) |
| 37 | Local operators for the coarse stages: S1 terrain (a) and water (b), S4, S5, S6, S7, the carve, S8–S12, designation changes, closures, staged layers, the world cascade | 11699–11865 | M2a; M3a; M4/M6-U; M-W0h | drawn edits; moved vertices; conversions; epochs | byte identity outside the footprint; the "pinned" and "beyond it" columns | an operator change becomes an upgrade diff on stored edits | MIXED: the pinned/beyond promises COMPOUND (a), weakly; each operator's algorithm ISOLATED | "beyond it (declared, never presented as local)" (11706); drainage fallback "output-neutral" (11737) |
| 38 | Edit fates and the orphan table | 11866–11891 | M2a | dry-run report; `confirm`; the upgrade's `changedConfirmations`; re-attaching orphans | the stored fate vocabulary; comparison only under the confirming version | changes to how fates are computed surface once, at upgrade | MIXED: vocabulary and storage COMPOUND (c)(a); fate computation ISOLATED | "only when it folds the event under the output version that confirmed them" (11886–11888) |
| 39 | Recorded inputs (`DerivationRecord`), the `Provenance.deps` audit, and the oracle (i)–(vii) | 11892–11945 | M2a; M3a | faithful Regenerate; Adjust; B-EDIT | which kinds keep a record | the records schema and what a faithful regenerate means | MIXED: the set of recorded kinds COMPOUNDS (c); the deps optimisation and the oracle ISOLATED | "Both routes leave the same records" (11901–11902) |
| 40 | Operation records and the closure rule (`MutationRecord`, `ClosureRecord`, `DisruptionReport`; pieces minted in dependency order) | 11946–12014 | M3a; M4 (underground generators, `refuse.staged`); M6-U | undo; later deletes; §5.3; oracle (vii) | exact inverses; which pieces were created and which reused | changing the generator order re-mints closure ids on replay | MIXED: record formats and minting order COMPOUND (c)(d); each generator ISOLATED | "one edit, at one log position of one seed, always yields one set of pieces" (11966); "refuses naming the staged layer" (12005–12006) |
| 41 | Undo/redo machinery: undo and redo as events; sessions per document and author; reserved sessions `host:port` and `world:place`; the independence check; undo records; truncation; checkpoints | 12114–12205, 12037–12050 | M2a; M3a (bridge) | every client; the host bridge | the same outcome on every client; truncated and kept logs give equal digests and addresses | stored undo semantics and the `nextSeq` rule | MIXED: undo/redo semantics, reserved sessions and truncation's `nextSeq` rule COMPOUND (c)(d); undo-record format, caps, checkpoints and session minting ISOLATED | "sessions decide which event the undo key picks, never the model" (12124); "advances `nextSeq` by one" (12184); fallback "16 events" (12202) |
| 42 | Rebases, upgrades and keeping the old model (`stateDigest`; base re-rooting; mapping by §6.3, never by string, recomputed on every replay; orphaned locks re-imposed as drawn constraints; undo by replay under `from`) | 12093–12112, 12293–12355 | M2a (keeping a saved snapshot); M3a (all of it) | every later shift that reaches users; the frozen view | this is what turns a later change into a reported diff instead of a break | if it is weak, every later declared shift breaks user documents | COMPOUNDS (a)(c) | "nothing is matched by string equality" (12302); "undo record is its `from` output version" (12322); "recomputed … on every replay, never stored" (12340) |
| 43 | Schema chain and its transforms | 12290–12292, 12359–12397 | M1 (schema version); transforms from M2a | every load of an older document | pure, forward-only; old root checked, new root written; nothing invented | — (it is the seam) | MIXED: the mechanism COMPOUNDS (c); each transform ISOLATED | "forward only" (12290); "nothing is invented" (12360); new data appears "only by an `upgrade` …, never by the schema chain" (12396) |
| 44 | Override stack and tables: stack order; preferences folded at creation; `TableId`; row keys; pinning hash (excluding provenance); row operations with `baseRowHash`; parity-preset resolution | 12404–12532 | M1 (tables, MFCG/FTG presets); M3a (overrides, preferences); M5 (NG); M6 (FM) | every table reader; recipe pins; `editTable`; slices; B-REF and D-5 | ids and row keys forever; stack order; what the hash covers; the resolution order | stored overrides orphan; recipe pins mismatch; parity runs redone | COMPOUNDS (b)(c) for ids, keys, stack, hash and resolution; table values ISOLATED | "stable, never reused" (12412); "never changes an existing document" (12423); "never moves an output version" (12453); "never positional patches" (12529); "a declared shift whenever output changes" (12545) |
| 45 | Slices and invalidation by slice (naming slices per field) | 12462–12470, 12533–12542 | M3a | the `slices` stored in derivation and naming records; provenance; the independence check | exact invalidation of stored entities | a records transform, and different invalidation for stored documents | COMPOUNDS (c)(d) | "A naming slice of a culture or ancestry row is one field of it" (12462) |
| 46 | Intent, circumstance and district-intent schemas, and the intent expansion rows | 12551–12680 | M1 (schemas); M2b (dials); M3b (expansion); M4 (timeline) | S0–S3; §4.5; epochs; the port's creation half; `&r=` links | the recipe stores them; expansion is data | a recipe schema change goes through the schema chain; an expansion change is a table shift | MIXED: the recipe schema COMPOUNDS (c); expansion rows ISOLATED | "Rows are continuous" (12558–12559); Surprise me "writes the drawn intent into the recipe" (12569) |
| 47 | Assignments and the one placement path (the S10b solver, then S11's mutator; placements persisted with the event; disruption budget) | 12636–12660, 12730–12750, 12841–12865 | M1 (schema); M2b (solver at generation); M3a | blueprint; dialog; bridge; host door; skeleton; roster; epochs; dossier events | the same town whichever way an assignment arrives; least-disruption order is what makes a host's undo converge | absorb results and convergence | MIXED: the one-path rule and stored placements COMPOUND (a)(c); solver scoring and budget rows ISOLATED | placements "persisted with the event" (12643); budget values "calibratable" (12655) |
| 48 | Dossier port contract: one-way; the port diffs each incoming dossier against the facts the map carries (CarriedFacts); the map never asks; never-read list; dossier-backed existence; rejection and its lapse; positive placement; staged records; plus the world port | 12752–12905 | M1 (creation half, tests only); M3a (absorb half); M4 (lapse at epochs); M-SF (live host); M-W1/M-W2 (world port) | SettlementForge; every dossier-bound log; §5.3 coherence | CarriedFacts is the baseline every later absorb diffs against | every stored campaign | MIXED: the CarriedFacts diff, existence and lapse rules COMPOUND (c)(a); the adapter per host line ISOLATED | halves at "M1 … M3a … SettlementForge stage" (12888–12890); "schema-complete and empty in the base" (12892); "The map never asks" (12763) |
| 49 | Binding key law, re-binding receipts, the `DossierChange` envelope, and the receipt and status tables | 13014–13098 | M1 (key law, tests); M3a (re-binding, receipts); M-SF | `Identity.dossier`, which is in the model digest; the `DossierRef` on every dossier event; binding rows rebuilt at load | a key per element kind; name slugs use the host line's own normalisation; re-binding only on a receipt | a key-law change mis-binds every stored campaign | MIXED: key law and envelope COMPOUND (c)(d); receipt and status rows ISOLATED | "a guessed identity is how silent mis-bindings begin" (13036); "the model already carries each entity's current key in `Identity.dossier`" (13041–13042) |
| 50 | Fact tiers, the derivation table, coherence rules, the dossier-owned refusal, port refusals, naming claims | 12907–13013, 13099–13142 | M1; M3a; village | §7 edit rules; §9.2; exports; API and clerk; §13.2 bars | what `factTier` means | `factTier` stores nothing; the derivation rows are an index | MIXED: `factTier` and the refusal COMPOUND (a); rows and port policies ISOLATED | "(never stored; J-A20.23)" (12918); the tests "run the rows from M1 on the frozen dossier fixtures" (12935–12936) |
| 51 | Stretch-state at the edit boundary: per-run wall condition, material and epoch; retaining-wall state; the `laidAt`/`courseAt` order profiles, kept through re-traces and re-keyed on split or join | 12066–12067, 10479–10500; profile rule at 860 | M2b (generation-time condition); M3a (wear, repair, raised-way order); M6-E (walls step) | S7's operator; §2.7's laws (the older structure decides a meeting); §8.2 state rows; epochs | "a re-derivation never re-derives a condition"; the order decides meetings | meetings re-decided on replay; a records-digest transform | MIXED: profile values and order fields COMPOUND (c)(d); condition shares and patch rows ISOLATED | "held by the run's knot profile … never re-derives a condition" (12067); order fields "form the records digest" (10481) |
| 52 | Controls, forms and previews: the control registry; the continuity sweep and its fallback; the control budget; the forms catalogue; proxy thumbnails (each town's own S0–S4 run) | 13144–13229 | M1; M3b; M6/M6-U | `@plat/docs`; the locality class used by #28; T1 `intend` | each control's locality class; a proxy's S4 digest equals the continued town's | data and tests | ISOLATED; form row keys stored in `Intent.form` must stay stable (light (c)) | "The formula is fixed now; the standard errors and medians are what the M1 sweep measures" (13193–13194); fallback "a declared shift" (13197–13199) |

### By milestone: what to settle inside it, and what can wait

Each COMPOUNDS item gives the mechanism and the first later milestone it would re-open. Each ISOLATED item names its seam.

**M1**
- Settle within M1:
  - #1–#4 (engine, key layout, id registries, M1's keying rows including S0's `blueprint.features` draw order), #21 ordering rules, and #24's "dmath plus one engine" rule — (b)(d). Re-opens M2a (B-EDIT fixtures hold M1 digests) and M2b (the 1 000-seed parity runs and D-5); from M4, every user document too.
  - #10 and #11, the digest layout and what it covers — (b)(c)(d). Re-opens M2a (load verification, replay = session).
  - #15–#17, document identity, lineage and generated addresses — (c)(d). Re-opens M2a (the log points at these ids), and later M-W1 and M-SITE-A.
  - #9, the closed input set — (a)(d). Re-opens M3a.
  - #22, version axes and shift records — (b). Re-opens every release, finally M4.
  - #44, table ids, row keys and the pinning hash — (b)(c). Re-opens M3a.
  - #46, the recipe schema — (c). Re-opens M3b and M4.
  - #36, `SeamContract` — (a)(b). Re-opens M2a and M5.
  - #19, anchor rows for M1's kinds — (c). Re-opens M2a.
  - #23, the link format — (c), preview-softened. Re-opens M2a and M4.
- Can wait (ISOLATED):
  - #12 digest maintenance — seam: the root is a pure function of the leaves.
  - #2's implementation — seam: the vectorised fallback is output-neutral.
  - dmath routines — seam: replace bit-identically, or declare a shift (but `pow`/`log` sit upstream in S1).
  - lint and CI — tooling.
  - #52 controls — seam: registry data, and the sweep fallback is a declared shift.
  - #50 rows and #49's key law — seam: frozen test fixtures only. Must be settled by M3a.
  - #7 decoration function — seam: the render axis.
  - matching acceleration — seam: sits behind the anchor table.

**M2a**
- Settle within M2a:
  - #25 log envelope and `seq` scheme — (c)(d). Re-opens M3a (the host bridge stores logs) and M4 (o1).
  - #26 `resolveVertexAt`, CarryMap and rebind radii — (c)(d). Re-opens M3a (upgrade replays, warps).
  - #27 ordered fold and creation prefix — (c)(d). Re-opens M3a and M6-E.
  - #18 carry-over and #17 user-created minting — (a)(c)(d). Re-opens M3a.
  - #20 naming follows the address, and the uniqueness rule — (c)(d). Re-opens M3a.
  - #33 lock, pin and edited semantics — (a)(c). Re-opens M3a and M4.
  - #28 and #5 named-action modes, absolute rerolls and the reserved range — (c)(d). Re-opens M3a (the faithfulness campaign).
  - #35 stored scope and #36 seam exception — (c)(a). Re-opens M5.
  - #38 fates — (c). Re-opens M3a.
  - #39 and #13 recorded inputs and records-digest layout — (c). Re-opens M3a.
  - #41 undo/redo semantics and the truncation `nextSeq` rule — (c)(d). Re-opens M3a.
  - #42 keeping a saved snapshot (rebase) — (c). Re-opens M3a.
  - #43 the schema chain itself — (c).
- Can wait (ISOLATED):
  - tree scoping — seam: the byte-identity oracle; it is sound by over-invalidation.
  - undo-record format, checkpoints and session minting — seam: rebuild by replay; the fold never reads the session.
  - refuse-vs-bend policy — seam: results are stored resolved.
  - T9/T10 and variations — seam: they emit ordinary events.
  - load gating — seam: the root of record.
  - the oracle — tooling.

**M2b**
- Settle within M2b:
  - #34 the stroke-list representation — (c). Re-opens M3a and M4.
  - #4 keying rows for M2b's stages (S10b, S12, `pin.light`) — (b)(d). Re-opens M3a.
  - #11 digest decisions: LightSource is model data; character is derived and unhashed while identity is hashed — (b)(d). Re-opens M4.
  - #51 the generation-time wall condition — (c)(d). Re-opens M3a and M6-E.
  - #44 parity-preset resolution — (b). Re-opens M-CAL.
- Can wait (ISOLATED):
  - table values — seam: pinned table versions.
  - S10b scoring and designation templates — seam: the output version.
  - lighting — seam: view-only, outside the model digest.
  - #7 instance functions — seam: the render axis.

**M3a**
- Settle within M3a:
  - #42 upgrade and rebase, and #22's per-version packaging — (a)(c)(e). Re-opens M4: from o1 on, every shift reaches users through it.
  - #44 and #45 overrides, row keys with `baseRowHash`, and slices — (c)(d). Re-opens M4, M-CAL and M-SF.
  - #29 warps stored as operations, and #34 drawn constraints — (c). Re-opens M4.
  - #32 resolved points forms, `expansion` versioning and the skeleton file — (c). Re-opens M3c and M-SF.
  - #40 operation records and closure minting order — (c)(d). Re-opens M4 and M6-U.
  - #33 the precedence order — (a)(c). Re-opens M4 and M-SF.
  - #14, #47, #48 and #49: CarriedFacts diff, existence and rejection, the one placement path, the binding key law and the `DossierChange` envelope — (c)(d)(a). Re-opens M4 (lapse at epochs) and M-SF (live campaigns).
  - #9 `hostContent` and packs — (c). Re-opens M-SF.
  - #5 and #11 rung-counter hooks, the `plan.*` concerns and the canonical-prior rule — (c)(d)(a). Re-opens M6 and M6-P.
  - #20 case (4) and #45 field slices — (c).
  - #31 `ConflictAction` kinds — (a). Re-opens M3c and M-SF.
  - #51 order fields — (c)(d). Re-opens M6-E.
- Can wait (ISOLATED):
  - #37 operator algorithms — seam: the output version plus oracle (ii)/(v).
  - #29 warp kernels — seam: the versioned fold plus upgrade replay.
  - #32 shape derivers and sugar content — seam: shapes stored resolved; the `expansion` version.
  - T2–T8 tools — seam: the event vocabulary.
  - the deps audit — seam: both routes leave the same records.
  - receipt, status and derivation rows, and budget rows — seam: data tables.
  - the retention window length — seam: the pre-decided fallback to N−1.

**M4**
- Settle within M4:
  - #22: o1 is fixed, so from here #23 links and every document are permanent and every shift must go through #42 — (c).
  - #6 live-epoch numbering — (c)(d). Re-opens M6-E and M-SF.
  - #4 the fixed-key draw rule and #48 the lapse of a rejection at an epoch — (c)(d). Re-opens M6-U and M-SF.
  - #11 the Works record and the hashed state epochs write — (b)(c). Re-opens M6-E.
  - #40 the underground closure generators' order — (c)(d). Re-opens M6-U.
- Can wait (ISOLATED):
  - underground pieces — seam: `refuse.staged`.
  - decline and wealth-ladder values — seam: table data.
  - the character dials — seam: derived and never stored.
  - performance and resolution tiers — seam: outside the digest.

**M5**
- Settle within M5:
  - #36 and #35 consuming the seams: portals, shared-edge byte equality, per-district regeneration — (a)(b). Re-opens M6 and M6-U.
  - #11 the close-up record entering the digest, and #7 re-matching presentation instances — (c)(b). Re-opens M6.
  - #3 and #4 keying rows for the ids reserved at M1 (`fabric.select`, `hood.*`, `S8.seed`) — (d)(b). Re-opens M-CAL.
  - #44 the NG preset — (b).
- Can wait (ISOLATED): fabric template content, the hatched style, Find — seams: V01's tables, the render axis, view state.

**M6-P**
- Settle within M6-P:
  - #5 and #4 `plan.*` keying with the rung counters, and the interior ladder's keying by step (10343–10347) — (c)(d). Re-opens M6-U, M6-E and M-SF.
  - plan-damage keys of (building lineage, element id), which make V03's element ids identity-critical (10797–10820) — (d). Re-opens M6-U.
  - #11 the canonical-prior rule — (a)(d).
  - #25 plan-event payloads and room anchors — (c).
- Can wait (ISOLATED): `damage.elements` ranges (table data); the elaboration cache (non-canonical); plan rendering and exports.

**M6-U**
- Settle within M6-U:
  - #16 and #17 underground part numbering and lineage units — (c)(d). Re-opens M6-sky, M-SITE-A and M-SF.
  - #4 V04's fixed-key draws — (c)(d). Re-opens M6-E.
  - #4 and #40 `sewer` closure keying — (c)(d).
  - #19 and #11 underground anchor rows and the digest layer — (c)(b).
- Can wait (ISOLATED): routing algorithms (versioned stages, behind `refuse.staged` until now); visibility toggles (view state).

**M-SF**
- Settle within M-SF:
  - #48 and #49 the live absorb against CarriedFacts, the binding key law in live campaigns, and the dating rungs and cadence — (c)(d). Re-opened by every SettlementForge host-line change (softened by the adapter per line) and by M-W1.
  - the staged records (ConditionOverlay, DepositSite, PowerRelation and others) become persistent here — (c). Re-opens M-W1.
  - #9 `hostContent` in live documents — (c).
- Can wait (ISOLATED): the adapter per host line, key list and ignore list (the `@plat/port` adapter folder); receipt, status, quarter and derivation rows (data per line); display names, audience table and iframe configuration (presentation).

**Other milestones touching my range (short):**
- M3b: #8 weather, #52 forms and thumbnails, and #46 expansion rows are all ISOLATED.
- M3c: the built-in clerk is ISOLATED behind the tool API and `proposedBy`.
- M6: wing and room rung counters, base-wing anchors and `massing` keying COMPOUND (c)(d).
- M6-E: replay-epoch keys and replay epochs in the creation prefix COMPOUND (c)(d).
- M6-sky: island slot keys (`raiseIsland`) COMPOUND (c)(d).
- M-W0h/M-W1: the `verb` field becomes read, the world noise lattice lands, plus the `world:place` session and the world port.

### Pieces the doc explicitly defers with a hook

1. Later products' stage ids are "appended at M1's API pass" (10186). `S8.seed` is "reserved at M1, its first user at M5" (10182). V01's concerns are reserved at M1, "drawing nothing before M5" (10267, 10327).
2. Retired concern ids are kept reserved, with "no reader, never reused" (10288, 10291).
3. The upper half of the epoch range is reserved for M6-E's replay (10225). Rerolls from 32 768 up are reserved for the faithfulness campaign (10214–10215).
4. World-position noise on placed frames is "expected-fail until this rule lands at M-W1: V13 §12's one declared deviation" (10170).
5. S0's appended draws (geology, relief, sewer existence) are made whether or not the toggle is set (10273–10275), "so `Terrain.geology` and the relief class are in the first golden" (§16, line 21694).
6. The digest has nodes for staged records that are "empty in the base" (10455). The staged dossier records are "schema-complete and empty in the base" (12892).
7. `EditBase.verb` is "the field at M1's API pass, read from M-W0h" (11064). World and site event kinds join the union "from its milestone" (11170).
8. The namespace segment is read "from `docId` on an older document at load" (10587–10588).
9. The port's halves are staged: creation at M1 in tests only, absorb at M3a, the live host at M-SF (12888–12890). The world port is built at M-W1 and M-W2 (12905).
10. The built-in clerk is "staged (M3c…)" (11574).
11. `addUndergroundAccess`'s underground pieces are refused with `refuse.staged` until the layer exists (12004–12006, 11424). Underground kinds are "staged, editable in the base" (11371).
12. Data a newer version derives appears "only by an `upgrade` …, never by the schema chain" (12345, 12396).
13. Each pre-decided fallback is a declared seam:
    - vectorised key derivation, output-neutral (10178–10179);
    - digest bars (i)–(iii), none moving a golden (10519–10540);
    - anchor radii doubled (10752);
    - matching per partition, a declared shift (10769–10772);
    - retention window shrinks to N−1 (10909);
    - shared edges re-run on both sides (11689–11692);
    - drainage over the whole grid, output-neutral (11737–11738);
    - undo section of 16 events and 40 ms checkpoints (12202);
    - control sweep: smoothstep with a declared shift, else made discrete (13196–13202);
    - the Clipper2-WASM engine, a declared golden shift (11043–11046).
14. The elaboration cache can be "dropped to `absent` at any time without loss" (10201) and is dropped at upgrade (12376).
15. An explicit non-goal: "Seed-exact parity with the references is not a goal" (10408).


## Appendix E — §8–§11: rendering, labels, content, export and interop

## §8–§11 (L13230–17756): rendering, labels, content and export, mapped for compounding cost

I read L13230–17756 at the level of contracts. The only things I looked up outside the range were cross-references, found with grep/sed: §2.9 (L3878, L3884–3887, L4162–4200), §6.1 (L10165), §6.3 (L10585–10587), §6.4 (L10850–10900), §6.5 (L10918–10937), RowOp (L11179), the lifecycle rows (L12086–12088, L12277), §13.3 (L20179–20279) and the §16 milestone rows (L21694–21701). All line numbers refer to `docs/ARCHITECTURE.md`.

My range spans M1, M2a, M2b, M3a, **M3b**, M4, **M4b**, M5, M6-P, M6-U and M-SF. M3b and M4b are not on your list, but they hold most of §11's file formats and all of §10's simulation module, so I include them.

Mechanism letters: (a) many consumers depend on the contract · (b) evidence is keyed to it (goldens, baselines, declared shifts) · (c) it is persisted · (d) identity or determinism · (e) it is a performance foundation.

### Main findings

1. **Most of §8 can be fixed in isolation.** The doc sends every rendering change through a "view shift" carried by the style version, never through the model: L10865 ("Style version — … changes pixels, never the model digest"), L20247–20249 (a moved placement digest bumps the style version only), L20277–20279 (the light pass is "a paint-program change … never a model shift"). Palettes, paint programs, the lighting pass, seasons and other looks, Find, the raster machinery and the VTT and glTF writers are all leaves.
2. **Six exceptions in rendering and labels do compound:**
   - **Label candidates are model data.** The spines are S13a output and sit in the model hash (L15647, L16065).
   - **The zoom-stop index is persisted.** `Placement.stop` is a hashed model field (L15663), and `LabelEntity.lod` stores band values (L15653).
   - **Tree positions are effectively persisted.** The instance function and the stamp-tile file feed positions into persisted override events (L15581–15583) and into tree exports that must be byte-identical across five engines (L15545; M3a's exit).
   - **`sunPath` is shared with the model.** The same function is the model's daylight sampler (L14789–14791).
   - **`LightSource` records are model data.** Placing them writes an S11 model shift (L20272–20275).
   - **The style schema is canonical document state** (L3878, L12088), and some style rows are keyed by entity addresses (L12277).
3. **The heaviest contracts in the range are:**
   - addresses plus the supersedes table carried by every export (L17010–17012);
   - the document formats `.plat`, JSON schema and CBOR (L16856–16858);
   - the one knowledge-admission function, read by about a dozen consumers (L15739–15743);
   - the canonical events and `logHead` that hosts store (L17576–17578, L17599);
   - the content identities: person key (L16669–16672), roster ordinals (L16226–16228) and `localUid` (L16311).
4. **S14 is the only path from model to view.** The tile worker "holds no model and no terrain" (L15357–15358), so anything a later renderer needs must become a display-list column. M1 already reserves the `baseCm`/`topCm` columns (L13280) and the per-kind height declarations, `ZDecl` (L3782), for the 2.5D renderer (M-25D).
5. **Sequencing hazard (my inference from the §16 rows).** Concealed and hidden places are generated from M2b (L21696), but the filter that withholds them lands at M3a (L21697). The `knownTo` column exists in the label table from M1 (L13278). Unless S14 fills it and S13b applies the shipped admission table from M1/M2b, M2b's exports will carry secret names, and M3a will need a declared view shift on the public-tier placement digests.
6. **Possible gap (absence confirmed by grep over the whole document).** The in-page `PlatApi` has no stated version axis. Only the bridge has one: the `plat: 1` envelope (L17525) and `protocol` in `ready` (L17576).

### Per-piece table

| # | Piece | Where | Built | Direct consumers | Contract later code relies on | Requires upstream (kernel / model / determinism / document) | Re-opened if changed one milestone later | Verdict | Doc's own words |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Display-list columns and shared types | §8.1 L13242–13301, L13365–13374 | M1; light and instance tables M2b–M3b; `baseCm`/`topCm` reserved at M1's API pass | tile worker (raster, S13b, composition); API `hit`/`inView` via the 24-byte index; every picture export's transient list; live layers | typed-array columns (54 B fixed + 4 B per attribute); `entity` handle is session-local; types live in `@plat/model` so labels and render never import each other (N-22, L13245–13246) | §6.2 per-entity leaf digest becomes `revision` (L13263); entity key becomes `key` (L13356–13358); terrain field rasters and the daylight driver (L13267–13268) | worker transfer code and the §12.8 memory budgets; S13b inputs (moves placement digests) | MIXED (a)(e) | "the two columns reserved at M1's API pass, 0 before M-25D" (L13280); handle "never hashed" (L13255) |
| 2 | S14 builder and per-type mark emission | §8.1 items 1–2 L13297–13328; §8.9 L15357–15358 | M1 (city/district) → M2b (all bands); M5/M6 close-up and composition answers as `DisplayDelta`s | tile worker (no model), light pass, exports | "backends never read the model" (L13303); footprint geometry identical in every band; city band carries every shadow caster; `surfaceTopCm` (L13293) | a registry row per drawable kind, including `ZDecl` (L3782); committed kernel geometry with no degeneracy (L15615); per-wing eave and ridge heights (L13319–13320) | any later renderer needing a value S14 does not emit; ring blocks; slab list | COMPOUNDS (a)(e) | "So the city band carries every caster any band draws" (L13326–13327) |
| 3 | Render keys and the RH32 render-tag table | §8.1 item 5 L13345–13364; census L14416–14417 | M1 | colour picks, weathering, hatch phase, crowns, `stamp.variant`, grid/line jitter, festival/crisis placement, plan rubble | RH32(tag, key, salt, ordinal or cell, style id); key = low 64 bits of the entity key; never keyed by handle or band; style id for looks only; tags only appended | entity key = seed key + lineage hash + arena key (L10165–10166); lineage stable under re-derivation (§6.3); keys differ across seeds and are independent of district order (L14416–14417) | every golden PNG (visual-regression re-sign plus style-version bump); tree positions → persisted overrides re-match or orphan (M3a); tree exports | MIXED (b)(d) | "a new tag is appended, so no existing look moves" (L13357); "golden PNGs hold" (L13362–13363) |
| 4 | Draw order and slot resolution | §8.1 item 3 L13329–13339; §8.2 L14265–14330 | M1 | tile backend, census, later volumes' semantics (sky, underground), user and host sheets | slots ordered across the whole scene; (semantic, pass) → slot cached per style version; loader refuses unresolved or ambiguous sheets | the registry's (semantic, pass) pairs per band (L14311–14313) | shipped sheets (style version); persisted user sheets may become refused | MIXED (a)(c) | "no document holds a sheet two loaders could order differently (J-R39)" (L14329–14330) |
| 5 | Zoom bands, zoom-stop table, band entry stops | L13247; §8.8 L15051–15058 | M1 | `LabelEntity.lod` (model); `PinnedPlacement.stop` (model, logged); the admission table's `coarsest` band; per-stop placement digests (27 stops); tile keys | four bands; stops k = 0…26 (+27…34) at m_k = 0.13229 m × 2^((26−k)/4) | none upstream, but its indices are written into model records | every pinned label's stop; `lod` arrays; every placement digest; admission rows | COMPOUNDS (c)(b) | entry stops "calibratable; B-ZOOM checks the pops at M1 and M2b" (L15056–15057). The stop *indices* must freeze; only band entry points may move |
| 6 | Style-sheet schema and naming scheme (roles, semantics, thematic keys, state kinds, drawing groups) | §8.2 L13404–13489, L14142–14159; doc L3878; L12088, L12277; §11.3 L17644–17650 | M1 (ink) and every later family | document `style` (canonical: sheet id@version, row operations, ground-cover regions); links `&st=`; host styles; per-viewer `stylePreset`; legend; SVG groups | roles never change meaning across bands or presets of a family; references' palettes map onto the roles; thematic keys are model attributes | semantic vocabulary from the entity registry; attribute columns (L13438); addresses for address-keyed rows (L12277) | every saved document's style rows (orphaned or refused); host sheets; preset overlays | COMPOUNDS (c)(a) | "style state (canonical, outside the model digest) … style schema versioned" (L12088); "A role never changes meaning" (L13480–13481) |
| 7 | Shipped style data (palettes, palette targets, contrast matrix, random-style repair, line-width rows, paint programs, post operations, presets, textures) | §8.2 L13491–13735, L13861–13869, L14332–14373 | M1 ink; M2b lit + textures; M3b variants and random styles; M5 hatched | tile backend, SVG writer, loader checks, B-ZOOM | values and programs sit behind the schema; random draws are persisted as row operations | model widths for width rows (wall `thicknessCm`, run class via `sampleProfile`, L13649); shore attributes (L13306–13310) | golden PNGs and measurement-render receipts only | ISOLATED (style version) | random draw "written into the `setStyle` event as row operations, so a replay never re-draws it" (L13527–13529); "Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON" (L13641–13642) |
| 8 | `states` table and its census | L13454–13462, L14191–14263; census L14426, L14457 | M2b rows; M4 Works rows (applied by hand); wall-run rows M2b/M3b; M6-U/M6-sky rows | tile backend, legend, CI at every sheet load | exactly one row per (kind, state) that the upstream ladders can produce, in every shipped sheet | the state enumerations: Existence, `Building.condition`, `SkyIsland.state`, `Enceinte.condition`/`supersededBy`, `RetainingWall.state`, `Passage.sealed`, `WorksStage`, `AccessPoint.state`, `UndergroundLink.kind` (L13455–13459) | every shipped and user sheet whenever an upstream enumeration gains a value (CI fails) | MIXED (a) | "resolves one `states` row … in every shipped sheet (CI, and at every sheet load)" (L14426) |
| 9 | Live-layer provider interface | L13871–13901 | M2a ghost; M3a stale; M3b festival, crises, windows; M4b people; M5 find; M6-E history | provider registry; tile key (base providers); composition (overlays) | `marks(view, model, region, elaborations?)`; output is view data | read-only model view and `fieldDriver('daylight')` (L13898–13900); `Document.derived.elaborations` (L13874–13875) | providers only | MIXED (a) | "view data (never hashed)" (L13872–13873) |
| 10 | View-only looks and overlays (seasons, festivals, crisis looks, weather, Find, colour-vision variants) | L13769–14189; §8.8 L15276–15303; §10.2 L16516–16659 | M3b; Find and disaster districts M5; crisis map rows M-SF | tile worker, export images and metadata, legend, `looks` query | with nothing shown, tiles are byte-identical; placement keyed on render keys | model places: root square, markets by `rank`, greens, the part-0 way graph with address-order ties (L13929), `TradeFlow` (L16585–16586), `campLand`, `Building.works` | tables or style version only | ISOLATED | "a look, never a change of the map" (L13769, L13903, L13977); "Find lands at M5" (L14110) |
| 11 | Layer settings (`LayerSpec`) and the visibility-vs-existence rule | §8.4 L14468–14515 | M1 ground; M4 hooks; M6-U; M6-sky | layered exports (`exportSeparately`), S13b candidate set, tile and light-map keys | `LayerSpec` is document style state set by a logged `setLayer`; a toggle never creates anything | layers are arena `PlatKey`s; `elevationCm`/`depthBandCm` (L14508–14511) | persisted `setLayer` events; layered export structure | MIXED (c) | "Toggles are visibility; existence is model" (L14494); island fields "are its hook" (L14485–14486) |
| 12 | Lighting model (surface layer, slabs, height pyramids and ring blocks, CPU reference, GPU pass, fallback ladder) | §8.4 L14520–14831; §8.8 L15100–15140 | M2b day; M3b night and exports; M4 lantern hook; M6-U/M6-sky | view, every raster export and still, VTT images, lit goldens | one law; CPU reference byte-identical on five engines; nothing persists | per-wing heights and `heightsAt`; wall-run tops (§2.7 law 1(7)); deck heights and passage headroom; terrain field and datum; roof faces taken from the roof construction, "never the straight skeleton directly" (L14546–14547); FTG-13 plinth tolerance (L14779–14781) | style versions and PNG re-signs, never a model shift | MIXED (b)(e) | "changing the light pass is a paint-program change … never a model shift" (L20277–20279); "nothing of the light pass persists" (L15617) |
| 13 | `LightSource` records (model) vs derived lights (view) | L14559–14570; L13287–13290, L13387–13394; L20272–20275 | M3b (placed lights) | light pass, glTF lights, `.dd2vtt` lights, Foundry AmbientLight | placed lights are §2.7 records placed at S11 by §4.7's table; derived lights are never records; a light shows only where its host shows | host lineage plus rule row as creation index (L10325); host's `concealed`/`knownTo` columns | every golden's model digest | COMPOUNDS (b)(c)(d) | "a shift record for S11 with cause `feature`, because the records join every golden's model digest" (L20273–20275) |
| 14 | `sunPath` shared by the view sun and the model daylight sampler | §8.4 *Sun* L14786–14791 | M2b (daylight driver, item 102) | §4.5 daylight field (model), path sun, `live.shade`, the season sun | one function; the model reads it only at site latitude and fixed hours | `dmath` | model digest (daylight → prosperity → siting) | COMPOUNDS (d) | "The same `sunPath` is the model's daylight sampler" (L14789–14790) |
| 15 | City-band figure-ground rule, lane selection, street-edge recoverability metric | §8.5 L14865–14911 | M1 (passages and informal clusters at M2b) | golden PNGs; MFCG parity panels; B-ZOOM | streets and squares are the only road-coloured gaps; buildings merged into masses using the kernel's integer offset, per (block, stop, revision); minor lanes drawn when needed for access and not already bounded | kernel integer offset usable in the tile worker on mark geometry (L14871–14873); footprints carry `block`; per-plot access edges and per-side frontage cover (L14902–14905); passage spans and headroom (L14876–14882) | goldens; the cross-check of the metric against M-1's research baseline | MIXED (b) | metric "measured research-side at M-1 … cross-checked … on M1's golden renders within 0.01" (L14894–14896); fallback at M1: kerb hairlines (L14897–14899) |
| 16 | First-map contract | L14936–14945 | M1 | time to first map (§12.5); pipeline order | first map = S0–S13a for every district + S14's city band; a fixed list of lazy work; drawn unlit | S13a (names, quarter tree, candidates) complete before the first map | performance budgets (M2b METROPOLIS) | MIXED (e) | "Lazy work is only what the city band does not draw" (L14939) |
| 17 | Close-up and building tiers (outline = union of wings, roofs per wing, plan rung, damaged plan) | §8.6 L14947–15037; L14840–14863 | M2b ink close-up and roofs; M5; M6 roofscape; M6-P plans and damage | footprint hash at every band; glTF/CityJSON per wing; surface layer; VTT storeys | the outline equals the union of composed wings (SCL-13); the elaboration cache is the only cache of derived detail; the tile worker never composes; roof cache key includes the construction | `BaseWing.kind/corners/ridgeAxis/on/spans` (L14967–14975); §3.8 near-rectangle test and validated skeleton; `compose/plan(Kernel, …)` (L14956–14957); damage thresholds and decay level (L14990–14996) | M5's exit "footprint hash identical to city LOD" (L21701) if M1 footprints move | COMPOUNDS (a)(d) for the outline rule; roofs and plan looks ISOLATED | "equals the union of the composed wings by contract (SCL-13)" (L14960–14961); switching roof style "needs no regeneration" (L14977–14978); damage levels "from V06 at M6-E" (L15036–15037) |
| 18 | Tiles, caches, incremental invalidation, canvas budget, Resolution/Auto | L13340–13348; §8.8 L15074–15266 | M1; measured M2b; adjuster M4 | tile worker, compositor | world-aligned tiles shared by views and exports; caches never keyed by id alone | §7.3's locality closure supplies the changed set (L13340–13342) | nothing persisted | ISOLATED | Resolution is "device state, never in the document" (L15237–15239); "PLAUSIBLE until M2b's canvas measurement and M4's" (L15232) |
| 19 | Raster machinery (Canvas2D reference, GPU compositor, split composition, glyph atlas, resumable jobs and queue, band-streamed PNG/print) | L15087–15099, L15304–15321, L15329–15349, L15386–15459 | M1; M2b; M4 | view, exports | no look differs by backend; slicing never changes output | none | none | ISOLATED | "no look that differs by backend" (L15336); "Slicing changes when calls run, never which" (L15420) |
| 20 | Worker model and the table of what crosses between workers | §8.9 L15350–15384; L17493–17516 | M1 (API rows M3a) | API, exports, S13b, live layers, band requests, derivation pool | generation worker holds document and model; tile worker holds neither model nor terrain; per-message size bounds | S14 must emit every input a renderer needs; compose/plan run from committed district state | every message shape and §12 budget | COMPOUNDS (e)(a) | "Nothing model-sized reaches the main thread" (L15367) |
| 21 | Stamp-tile file (pre-built tree-scatter tiles) | §8.10 L15477–15532; census L14418–14419 | M1 (load and seam check are M1 exits) | instance function in both workers; exporters; override resolution | four tiles per class plus a shared border band; ranks; header with versions and a stored H128 per tile | kernel `poisson` module; `rng.stream` under `render.stampTiles`; `dmath` (L15494–15498) | tree positions; a stored-hash change is a `render.stampTiles` view shift | COMPOUNDS (b)(d) | construction change "moves stored hashes and is a `render.stampTiles` view shift" (L15530–15532); annulus "PLAUSIBLE" (L15518–15519) |
| 22 | Instance function (tree layouts, ordinals, rank thinning, per-tree look) | L15469–15580 | M1 (crowns at district band); boats M3b | tile worker; override resolution; GeoJSON/glTF/CityJSON trees; bench statistics | integer-cm positions; stable ordinals (u,v,p) / (u,v) / i; coarser band is a subset of finer; under the determinism lint | `render.instances` stream (L15474–15476); exact point-in-polygon with holes on integer cm (L15539–15540); a line's start is the end whose junction address sorts first (L15549–15551) | override resolution (M3a); trees byte-identical on five engines (M3a exit) | COMPOUNDS (c)(d)(b) | "Ordinal = (u, v, p): stable" (L15541–15542); tree files "byte-identical on every host" (L15545) |
| 23 | Instance overrides (user tree edits) and their resolution | L15581–15605 | M3a brush tools (L21697); hood pins M5 | generation worker; override rows sent to the tile worker | events record the generated point; applied by ordinal only if lineage is unchanged and within 0.5 × spacing; otherwise re-matched by position, else orphaned | §6.3 lineage events (`carry`, supersession), `supersededBy`; uniform entity `overrides` table; §7.4 warp moving recorded points; `Block.overrides` in M1's schema (L21694) | persisted events in every document | COMPOUNDS (c)(d) | "never written to the document except as overrides" (L15600–15601) |
| 24 | Label records: `LabelEntity`, `QuarterNode`, `RegionGroup`, pinned placements | §9.1 L15645–15696 | M1 S13a and quarter tree; M2a logged moveLabel/hideLabel/displayText; M3b region groups | S14 label table, S13b, reader, gazetteer, exports, title | in the model hash and persisted; pins are model data ordered by `seq`, then id | S6 builds the quarter merge tree (L15914); addresses as ids; warp carries pins (L15689–15690) | model digest; migrations; logged events | COMPOUNDS (c)(d)(b) | "Model (S13a; in the model hash; persisted)" (L15647); moveLabel/hideLabel "logged, hashed model events" (L15693) |
| 25 | Label spine and candidate construction (area, path, point labels; address numbering) | §9.3 L15863–15890; L16065 | M1 area labels; street names M2b; path labels and addresses M3b | label candidates (model), S13b | deterministic and model-only (the horizontal spine is scored in model coordinates) | kernel `simplify` (topology-preserving), validated `skeleton(rings,'spine')`, Kruskal ties broken by edge index, medial-axis fallback (L15865–15874) | an S13a model shift and every spine digest | COMPOUNDS (d)(b): a label heuristic that is hashed model data | spines "persisted … carried unchanged by a migration" (L16065); "numbering is model data" (L15889) |
| 26 | S13b placement (per-stop greedy, pin pass, memo, obstacle and role indexes, placement digests) | §9.2 L15714–15862; §13.3 L20236–20249 | M1 | tile composition; SVG/PNG/print (same code); goldens (PR tier plus nightly five-engine run) | strict order (priority, area, id); result independent of tile order and slicing; one digest per (stop, knowledge key, rotation) | stable label ids; target `areaM2`; determinism lint on S14's writers of bbox, geometry, layer, z and symbol extents (L10923–10927) | a moved digest is an S13b view shift bumping style versions | MIXED (b)(d) | "bumps no output version … bumps the style version of every shipped sheet whose placements moved" (L20248–20249) |
| 27 | Label fonts and our own font parser | L15700–15713; L15344–15349 | M1 | S13b metrics, glyph atlas, SVG outlines | widths come from the bundled font files, not the browser; one pre-decided path per face | none | placement digests (view shift) | ISOLATED (style version) | "chosen by that test, never by hand" (L15707–15708); model hash independent of fonts (L15691) |
| 28 | Knowledge filter: `knownTo`, the admission function, the `knowledge.admit` table | L15731–15788; L16903–16924; L17382–17459; L13384–13394 | M3a (L21697); the `knownTo` column exists from M1 (L13278) | S13b, thematic rows, concealed marks and lights, legend, `live.voids`, every query, every picture and data export, the clerk, VTT doors | one function; document formats only for tier `secret`; table changed only by `editTable` | `knownTo` on plots, buildings, institutions, places, `Use`, `AccessPoint`, `UndergroundLink`, defaulted from `Plot.exposure` (L15733–15736); `setAttr(knownTo)` is logged (L15766–15767) | every reader and exporter; public-tier digests | COMPOUNDS (a)(c) | "the one statement of admission" (L15739); "the model digest never depends on who is looking" (L15768) |
| 29 | Label floors, the fallback ladder, quarter labels at a stop, overflow, halos, leaders | L15883–15945 | M1 (leaders/path labels M3b) | S13b | view heuristics | quarter tree and the parent link in the label table (L15903) | view shift only | ISOLATED (behind `LabelPlacer`) | fallback "tightens from 95 % to 85 %" at M1 (L15944–15945) |
| 30 | Default framing and zoom-out limit | §9.5 L16025–16035; L15059–15073 | M1 | first view, default export frame, golden renders, palette measurement render, parity panels, "Fit" | circle at the settlement centre, radius = max(outer wall radius, 95th-percentile footprint distance) × 1.08, inside the limit bounds | settlement centre, outer wall radius, `bounds` | framed goldens and receipts | MIXED (b) | same fallback (L15944–15945) |
| 31 | Map furniture and its random streams (compass, emblem, grid, title, legend, annotations, ruler) | L15947–16000 | M1 basic; M3b dress tools and annotation layer | views, exports | compass and emblem keyed from the town root with their concern salts; rerolls are logged | town-root key; concern registry and recipe salts (L13292) | concern ids are persisted in recipes and links | MIXED (c) | reroll "is a logged `rerollLayer('style.compass')` event" (L15953) |
| 32 | Names (grammar engine, uniqueness, rerolls, way-naming context, descriptions) | §9.6 L16037–16058; §10.4 L16758–16841 | M1 grammar and context; M3a re-draws on input changes; M5 stage-2 features | label text, reader, exports | names drawn only from naming concerns, only in §6.3's cases; uniqueness resolved in id order with up to 8 retries then a suffix | id order; naming concerns (§6.1); §6.3's cases | model digest; persisted names; edit locality | COMPOUNDS (d)(c) | M5 features are "a declared shift of those ways' names" (L16768–16769); names "persisted" (L16047) |
| 33 | Setting packs and user word lists | L16780–16814 | M3a (`packs` block) | recipe, `adjust`, document `packs`, link refusal | data, not code; keyed row operations carrying `baseRowHash`/`baseVersion`; content hash | table versions pinned in the recipe; row operations by stable row key (L11179) | persisted documents | COMPOUNDS (c) | "a newer table version never silently misapplies a pack" (L16810–16811) |
| 34 | Content scope and the content-locality contract | §10.1 L16078–16101 | schema M1; full allocation M2b; module M4b | allocation stages, `@plat/sim`, the locality checker | the allocation is persisted; a scoped regeneration re-places only its own scope | household address (§6.3) survives re-derivation | M4b would need a migration if the M1 schema is wrong | COMPOUNDS (c)(d) | "Base schema from M1, materialised by the module" (L16084) |
| 35 | Roster table schemas | §10.2 L16103–16216, L16259–16665 | M1 classes; M2b the rest; M-SF ladder rows | S2, S7b, S10, S11, §4.5, §4.11, `why`, packs, tables editor | V11 owns the rows; row ids appear in `why` answers; edited rows live in the document's override layer | table version pins; stable row keys | values → declared model shift; schemas and keys → persisted overrides | MIXED (c) | "migrated by its table version and orphaned when its base row changes" (L16664–16665) |
| 36 | Sequential roster | L16218–16235 | M1 | allocation; epochs (M4 incremental path); population control; crisis camp placement | the n-th building of a class is the same one at any population; prefix-stable manifests; class priority then class-id order | stream keys `roster/<class>/<ordinal>` | building identity in every town; every epoch's delta | COMPOUNDS (d)(b) | "the n-th chandler is the same chandler at any population" (L16227–16228); "prefix-stable" (L16235) |
| 37 | Custom institution kinds keyed by `localUid` | L16293–16312 | M3a / M-SF | siting profile resolution | profile overrides stored in the map document by `localUid` | the dossier's `localUid` (§7.7) | persisted overrides | COMPOUNDS (c)(d) | "keyed by `localUid` (a rename changes nothing)" (L16311) |
| 38 | People and households | L16669–16700, L16740–16756 | M1 derived lazily; M2a/M3a pins and re-derive | people queries, relation store, dossier people | person key = (household address, member ordinal, birth epoch, birth week); a table version per household; deaths and successions derived, never stored | household address survives a plot re-derivation (L16671–16672) | pinned people; relations | COMPOUNDS (d)(c) | "identities do not depend on the cadence" (L16671); "Pinning is an explicit edit, never a view" (L16675–16676) |
| 39 | Simulation module `@plat/sim` and the economy/personality schema stubs | L16702–16738; L16188 | stubs M1; content M4b | queries, `live.people`, lit windows | relations built in one global pass in person-key order and persisted (≈12 B each); occupancy and schedules are a cached query, never logged | person keys; facility rows (empty in the base) | persisted relations | MIXED (c): data compounds; schedules and occupancy isolated | "In the base registry from M1, empty until `@plat/sim` materialises them" (L16729) |
| 40 | Document formats: `.plat`, JSON schema, CBOR twin | L16856–16858, L16918–16924 | M1 `.plat` and JSON schema (in M1's gate list, L21694); CBOR M3b | `open`, host snapshots, embeds, outside tools | canonical form with byte-identical round trip; JSON schema is the API's response type; CBOR encodes the same schema; offered only whole | §2.9 canonical form; integer-cm world coordinates; output version and supersedes table | every saved document and schema consumer | COMPOUNDS (c)(a) | "published, versioned (generated from the `zod` types)" (L16857); "an encoding of the same schema" (L16858) |
| 41 | What every export carries (addresses + supersedes table, fact tier, authorship, escaping) | L17010–17012, L16926–16941; L17510–17511 | M1 (SVG metadata ids) → M3b | outside tools, API and bridge, hosts | addresses and a tombstone → successor table; ids as `<docId>/<id>`; `plat:tier`; author and proposer in log formats | address namespace segment from M1's API pass (L10586–10587); `factTier` (§2.8) | external files users keep | COMPOUNDS (c)(d) | "can follow it across re-derivations" (L17011) |
| 42 | SVG export | L16860; L15041 | M1 | users' layered post-processing, print | groups `layer.<id>` / `sem.<semantic>`; one path per (semantic, district); metadata maps sub-paths to entity ids; same S13b code | semantic names; addresses | group and metadata naming | MIXED (c): the naming compounds; the writer is isolated | — |
| 43 | GeoJSON (strict and metric) | L16859, L16943–16962 | M3a (L21697); metric attributes tagged M2b (L16962) | GIS tools, V12 measurement profile | feature `id` = address; wall-run ordinals from the trace's first vertex; strict WGS84 output byte-identical on every host (`dmath`); `plat` member with doc id and output version | addresses; chain vertex order; faces with no antennae (§3.6 rule 3) | files users keep in GIS | MIXED (c)(d) | "schema version bumped once for them; the strict variant is unchanged (M2b…)" (L16961–16962) |
| 44 | VTT exports (`.dd2vtt`, Foundry scene JSON) | L16862, L17014–17078 | M3b; raised-way rules M3a; encounter crop M-ENC; storeys M6-P; depth bands M6-U | external importers | profile pinned to dated external versions; files named `<base>.<ordinal>.dd2vtt`; model widths only | entrance set with roles and opening widths; boundary treatments; wall-run condition; retaining-wall steps; decay level; `LightSource` records; `Room.lit` | external profile only | ISOLATED (writer behind a pinned profile) | next re-verification "at Foundry 15's first stable release" (L17014) |
| 45 | glTF / OBJ / CityJSON (+ PLAT extension) | L16863–16864, L16993–17008 | M3b (+ M6/M6-P content) | 3-D tools, CityJSON validators | glTF ground as one planar partition; CityJSON integer-cm transform; extension versioned with the exporter's output version | arena leaf faces read once (§3.9); river course stations falling monotonically; heights from `baseCm`; per-wing rings | extension schema | MIXED: writers ISOLATED, extension schema (c) | extension "bumps … with the exporter's output version" (L17003); sidecar fallback (L17004–17007) |
| 46 | Permalinks and skeleton files | L16866–16867; §6.4 L10867–10893 | M1 permalinks (marked preview); M3a skeleton | shared links; re-import | links carry recipe, log and `st=` style id@version; skeleton re-imports byte for byte | output version; a shipped sheet; the `declared` fact tier; suppression keys | links users have shared | COMPOUNDS (c)(d) | skeleton "reproduces the city byte for byte" (L16867) |
| 47 | Embedding API (`PlatApi`, export options, results, query kinds, reader answers, confirm) | L17082–17516 | M3a (+ M3c, M4b, M5, M6-E, M-ENC additions) | V09 app, V10 clerk, hosts, scripts, Node package | handle-based; pages ≤ 64 KB; `created` addresses returned in address order; confirm token = H128(logHead + canonical event bytes) | `nextSeq` minting predictable at dry run (L17208); `factTier`, registry kinds, `Tombstone.last`, `DossierBinding.rows`; canonical event bytes | every host integration | COMPOUNDS (a)(c) | no API version axis (grep-confirmed absence) |
| 48 | Host bridge | L17518–17669 | M3a; port vocabulary M-SF | SettlementForge, VTT modules, relays | envelope `plat: 1`; the host stores each event's canonical CBOR as handed; `logHead` = 128-bit hash of (doc id, log length, last event); handshake by output version, otherwise a frozen read-only view | canonical event encoding; same events in host order on the same output version give the same model hash (L17610–17611) | stores held by hosts | COMPOUNDS (c)(a)(d) | "the host stores what it is handed and computes nothing" (L17578); "never replays under another version silently" (L17620) |
| 49 | Host input routes, content-provider record, `DocResolver` | L17671–17746 | M3a; M-SF | hosts, scripts | inputs only through the five listed routes; host tables and styles copied into the document; provider output recorded in `hostContent` keyed by (provider id, version, input hash) | the double-run check; the packs and host-content blocks | documents with host content | COMPOUNDS (c); `DocResolver` ISOLATED | "So a document never needs its host to replay" (L17685–17686) |

### Upstream requirements these sections place on the kernel, the model records, determinism and the document

These are the links by which M1's model choices compound into M2a–M3a's rendering and export.

**Kernel (used from the view, label and export side)**
- K1. An integer offset callable in the tile worker on mark geometry, with no arena (L14871–14873).
- K2. `simplify`: topology-preserving Visvalingam that refuses edges crossing the face or its holes, checked in the kernel's index (L15865–15867). Its output becomes model data via S13a.
- K3. `skeleton(rings,'spine')`, hole-aware and validated, with deterministic edge indices for the Kruskal tie-break; plus the medial-axis fallback (L15868–15874).
- K4. The §3.8 near-rectangle test, exact OBB ridges and the validated skeleton for roofs (L14970–14975); the `spine` reader for room labels (L14854–14855); "§3.8's readers stay three" (L14546–14547).
- K5. Exact point-in-polygon with holes on integer cm, used for tree placement (L15539–15540); the `poisson` module under the determinism lint (L15494–15496).
- K6. Committed geometry is never degenerate (L15615). Leaf faces at the finest committed level, each boundary read once (L16863). Faces can be written without "antennae" (§3.6 rule 3, L16859). All exported coordinates stay on the integer-cm lattice (L16864, L16957–16958).

**Model records**
- R1. Entity registry: each type maps to marks per band (L13303); one glyph per visible semantic (L14388–14389); the (semantic, pass) pairs per band (L14311–14313); `ZDecl` on every drawable kind at M1's API pass (L3782).
- R2. Heights per building and per wing (`heightCm`, `baseCm`, `eaveCm`, `ridgeCm`), with `stageAt`/`heightsAt` for Works (L13264, L13319–13320, L13377–13379). "Heights are §2.6's … so the surface layer, the shadows, glTF and CityJSON agree" (L14830–14831).
- R3. Wall-run tops by §2.7 law 1(7); `thicknessCm`; per-run class; per-run condition and material; `supersededBy` (L13649, L14547–14548, L14206–14210).
- R4. Per-plot access edges and per-side frontage cover (L14902–14905). Open-frontage run classes for the M1 fallback (L14898–14899). Footprints carry `block` (L14872–14873).
- R5. `Passage.frontBuilding`, `BaseWing.spans`, `headroomCm`, `Passage.sealed` (L14875–14882, L14220). `BaseWing.kind/corners/ridgeAxis/on`, and the outline equal to the union of composed wings (L14960–14975).
- R6. Entrance set with roles at footprint-edge vertices (L13665, L14429), reused for VTT doors (L17033–17035).
- R7. `LabelEntity` with candidates built at S13a; `QuarterNode` built by S6 with its `cityCut` flag; address numbering per way and side (L15647–15659, L15889–15890, L15914–15918).
- R8. `knownTo` on plots, buildings, institutions, places, `Use`, `AccessPoint` and `UndergroundLink`, defaulted from `Plot.exposure` (L15733–15737).
- R9. The state enumerations, each needing a style row in every sheet (L13455–13459, L14426).
- R10. `LightSource` records placed at S11 and linked to their host (L14559–14561, L20272–20275).
- R11. Terrain field with `Terrain.datumCm`; shore chains carrying `bankKind`/`waterKind`/`exposure`/`shoreClass` (L13267–13268, L13293, L13306–13310).
- R12. Greenery species mix and `along` offset, and the field-boundary chains, for trees (L15471–15473). A uniform entity `overrides` table and `Block.overrides` (L15591–15599, L21694).
- R13. Person key (household address, member ordinal, birth epoch, birth week); a table version per household; the relation-store schema and economy/personality stubs from M1 (L16669–16675, L16084–16088, L16728–16730). Roster per-class ordinals (L16226–16231).
- R14. Prosperity banded by §4.5 and a per-mark `class` column, for roof colour by wealth band and the raised under-copy ratios (L13752–13755, L13661). Per-district `tintKey` from colouring the districts in address order (L13741–13746).

**Determinism and identity**
- D1. Entity key = seed key + lineage hash + arena key; the render key is its low 64 bits and never the session handle; keys differ across seeds and do not depend on district derivation order (L10165–10166, L13357–13364, L14416–14417).
- D2. Per-entity leaf digest used as the content revision (L13263).
- D3. Addresses are what pins, labels, households, exports and the host point at; the namespace segment comes from M1's API pass (L10585–10587). Address order drives every ordering rule: tint colouring, Find bubbles, procession-route ties, gazetteer pages (L13363, L13741–13742, L14088, L13929). Junction addresses orient tree lines (L15549–15551).
- D4. Lineage events (`carry`, supersession) and `supersededBy` drive override resolution (L15585–15590).
- D5. The random streams `render.instances`, `render.stampTiles`, `style.crowns`, `style.compass`, `naming.emblem`, `style.random` (creation index = the `setStyle` seq) and `view.weather` (session seed); `DisplayList.salts` is typed from the concern registry (L15474–15476, L15497–15498, L15565–15567, L15951–15953, L15991–15993, L13526–13529, L14116–14119, L13292).
- D6. The §6.5 (3) determinism lint covers `@plat/labels`, the obstacle and role indexes, S14's column writers, the instance function and the CPU light pass (L10921–10937, L15717–15719). §6.5 (9): the CPU reference is byte-identical on five engines (L14680–14682).
- D7. `sunPath` is shared with the model's daylight sampler (L14786–14791).
- D8. Labels are ordered by (priority, area, id), and name uniqueness is resolved in id order (L15789–15791, L16041–16043).
- D9. `nextSeq` minting must be predictable at dry run (L17208). The same events in the same order on the same output version must give the same hash on every client, and headless must equal browser (L17610–17611, L17510).

**Document**
- Doc1. `style` is canonical: sheet id@version (with a non-shipped sheet's content), row operations, ground-cover regions; `setStyle`/`setLayer` are logged; the style schema is versioned (L3878, L12088, L17644–17650). Thematic rows can be keyed by district address (L12277). Refused sheets never enter a document (L14329–14330). Links carry `st=<style id@version>`, and are emitted only when the sheet is shipped (L10875, L10880).
- Doc2. The view section is persisted but not canonical: year position, Find, knowledge, week and so on (L4168–4200); "persisted with the view, in no digest … kept by a migration" (L15627).
- Doc3. Elaboration records and the derived-detail cache are not canonical (L3884–3887), yet the JSON export's `plan` blocks depend on what that session's cache holds (L16966–16969).
- Doc4. The `packs` and `hostContent` blocks (L16805–16807, L17682–17686); row operations by stable key with `baseRowHash` (L11179, L16808–16811).
- Doc5. Every document carries its output version; outside the retained versions it opens as a frozen view; `open` accepts `.plat` or CBOR (L17616–17620, L17096). Trees are never stored, only their overrides (L15600–15601). Spines are carried unchanged by a migration (L16065). Hosts store canonical event bytes and `logHead` (L17576–17578, L17599).

### By milestone: what must be settled within it, and what can be fixed later in isolation

**M1**
- **Settle within M1 (compounds):**
  - Identity in exports (addresses + supersedes table; SVG metadata ids) — (c)(d); first re-opened at M3a (GeoJSON, API, bridge).
  - `.plat`, the JSON schema and the permalink format — (c); re-opened at M2a (the log is folded "over M1's document format"), M3a (migration and retention) and M4 (output version 1).
  - Label records including spines, the quarter tree and the pinned-placement shape — (c)(d)(b); re-opened at M2a (replay runs S13a per event; moveLabel) and M3b (region groups, addresses).
  - The spine algorithm and its kernel inputs — (d); any later change is an S13a model shift.
  - Zoom-stop indices and the band set — (c)(b); re-opened at M2a (pins store `stop`) and M3a (the admission table's band cell).
  - The naming contract, uniqueness order and the way-naming context schema — (d)(c); re-opened at M2a (scoped regeneration must change 0 names outside scope).
  - Sequential roster ordinals — (d); re-opened at M2b (remaining classes) and M4 (incremental growth relies on the epoch suffix).
  - Person-key scheme, relation-store schema and economy/personality stubs — (c)(d); re-opened at M4b.
  - Style schema and naming scheme — (c)(a); re-opened at M2a (`setStyle` enters the log) and M2b (`lit` must map onto the same roles).
  - Display-list columns, `@plat/model` shared types and registry emission — (a)(e); re-opened at M2b (lighting needs eave/ridge columns and casters) and M-25D.
  - Worker model — (e); re-opened at the M2b METROPOLIS measurements.
  - Render keys, the stamp-tile file and tree ordinals — (b)(c)(d); re-opened at M3a (brush overrides; five-engine tree files).
  - Per-stop placement digests and the lint scope over S14's writers — (b)(d).
  - First-map contract — (e).
  - Framing rule and the recoverability metric's definition against M-1 — (b); re-opened at the M2b parity panels.
  - Filling the label table's `knownTo` column — (a); otherwise a declared view shift at M3a.
- **Can be fixed later in isolation (and through which seam):**
  - ink palette, contrast thresholds, ink width rows, raised under-copy ratios, paint programs — style version;
  - label floors, the fallback ladder, halos, font path — S13b view shift behind `LabelPlacer`;
  - lane-selection thresholds and the kerb-hairline fallback — a render rule;
  - furniture placement scoring — the furniture query;
  - Canvas2D jobs and queue, glyph atlas, PNG band encoder, tile keys — behind `TileBackend`/`RasterJob`;
  - SVG writer internals — `VectorBackend.write`, provided the group and metadata naming stays fixed.

**M2a**
- **Settle within M2a:**
  - Payload shapes of moveLabel/hideLabel (placement fields, `seq`), `setAttr(displayText/knownTo)`, the `setStyle`/`setLayer` row operations, and the `rerollLayer` concern ids — (c); re-opened at M3a (migration and upgrade as events; the bridge) and M-SF (hosts persist canonical CBOR).
  - Confirm-token and fate/rename semantics — (c)(a); re-opened at M3a.
  - Running S13a per replayed event — (d).
  - People pins as explicit edits keyed by person key — (c); re-opened at M4b.
- **Can be fixed later:** authoring handles, count badge and `live.ghost` drawing (screen-space furniture and a live layer); delta cost (`DisplayListBuilder.update`).

**M2b**
- **Settle within M2b:**
  - The height and caster contract read by the light pass, glTF and CityJSON — (a); re-opened at M3b.
  - The states census coupling to upstream enumerations — (a); re-opened at M4 (Works stages), M6-U and M6-sky.
  - CPU-reference byte-identity — (b)(d); re-opened at M3b (lit exports and VTT images).
  - `sunPath`, since the daylight driver lands here — (d); any change is a model shift.
  - `lit` keeps the same role vocabulary — (c).
  - Passage and entrance-set records used by drawing — (a); re-opened at M3b (VTT doors).
  - The GeoJSON metric attribute bump (L16962) — (c).
- **Can be fixed later:** `lit` palette and textures (style version; textures come from seeded scripts); the GPU pass and fallback ladder (held to the CPU reference by a tolerance); roof constructions (the cache key includes the construction); the relief tier; shadow-budget fallbacks; canvas tiers (device state).

**M3a**
- **Settle within M3a:**
  - `PlatApi` and the reader answer shapes — (a)(c); re-opened at M3c, M4b, M5 and M-SF.
  - Bridge envelope, `logHead`, canonical event CBOR and the version handshake — (c); re-opened at M-SF.
  - The admission function, its table and the document-format gating — (a)(c); re-opened by every later exporter and reader.
  - GeoJSON ids and run ordinals — (c)(d).
  - Skeleton format — (c)(d); re-opened at M3c.
  - `packs` block and row operations — (c).
  - `localUid` keying — (c)(d); re-opened at M-SF.
  - Override-resolution rules — (c)(d); re-opened at M5 (hood pins).
- **Can be fixed later:** GeoJSON writer internals (keeping the byte-identity test); warp preview; the stale-detail marker glyph; `DocResolver` implementations; underlay.

**M3b**
- **Settle within M3b:**
  - CBOR twin — (c); re-opened at M-SF.
  - CityJSON extension schema — (c).
  - Address numbering and path-label candidates (model data) — (c)(d); re-opened at M5.
  - Region groups that reference quarter ids — (c).
  - `LightSource` records (an S11 model shift) — (b)(d); re-opened at M4b (lit windows) and M6-U (light shafts).
  - Fact tiers in persisted formats — (c).
  - Drawing-group switches set by logged `setStyle` — (c).
- **Can be fixed later:** VTT writer (pinned profile), glTF/OBJ writers, ink-family variants, the random-style generator (its draws are persisted), colour-vision variants, seasons/festivals/crisis looks/weather (tiles byte-identical when off), boats, thumbnails, legend sheet.

**M4**
- **Settle within M4:**
  - Fixing output version 1 — (c); from then on every document and link must replay forever.
  - The `WorksStage` enumeration and drawn-week semantics — (a); re-opened at M6-E and in every sheet's states rows.
  - Access and link states with knowledge — (a)(c); re-opened at M6-U.
- **Can be fixed later:** the Resolution/Auto loop — "never in the document"; exports are byte-identical whatever the setting.

**M4b**
- **Settle within M4b:** persisted relations and postings — (c)(d); event templates whose effects are logged edits — (c).
- **Can be fixed later:** occupancy and schedules (a cached query, never logged), `live.people`, occupancy-driven lit windows, the family-tree view.

**M5**
- **Settle within M5:**
  - Footprint hash identical to the city band (an M5 exit) — this requires M1's footprints to be final; (d)(b).
  - Place labels and names (model data) — (c).
  - Hood pins as block overrides — (c).
  - The declared shift in way names — (b).
- **Can be fixed later:** the `hatched` family (style); the Find overlay (view); close-up style fields `roads`/`hatch`/`closeup`.

**M6-P**
- **Settle within M6-P:** the JSON `plan` block (room and unit addresses, openings) — (c); VTT storey ordinals and the `plat.stairs` mapping — (c); `room:` addresses — (d).
- **Can be fixed later:** plan drawing programs, room-label sizing, damage looks (byte-identical when a building never decayed), the building-band stops.

**M6-U**
- **Settle within M6-U:** the depth-band scheme that names scenes and exports — (c); `excavation` readings and unexcavated admission — (a).
- **Can be fixed later:** the underground drawing programs, the cut-away look, shaft drawing.

**M-SF**
- **Settle within M-SF:** the port's messages and `doc.snapshot.ready { outputVersion, schemaVersion, documentDigest }` — (c)(a); dossier binding keys and change envelopes in the log — (c)(d); the crisis map rows, which are a closed mapping at the pinned baseline — (c).
- **Can be fixed later:** the export bundle (opaque blobs), display names (never stored), party pictures, crisis-look drawing.

### Pieces explicitly deferred with a hook

- **Reserved at M1 for later renderers:** `LabelTable.baseCm`/`topCm` reserved at M1's API pass, 0 before M-25D (L13280); `ZDecl` rows at M1's API pass (L3782); the 2.5D tile key is a separate set (L15180); `projection` style rows (L13430) and view key (L4204).
- **Style fields waiting on later stages:** `roofscape` once stage 3 registers (L13417, L14964–14967); `painterly` family reserved (L13411, L14343); close-up fields at M5 (L13418–13420); `vtt.squareM` at M-ENC (L13431).
- **Empty schemas waiting for the port or module:** condition rows "schema-complete and empty in the base until the port fills the records" (L14151–14153); port rows (L16450–16455, L16501–16507); facility rows empty until M4b (L16188); relation store and economy stubs (L16084–16088, L16728–16730).
- **Island and underground hooks:** island fields "are its hook" (L14485–14486); underground hidden by default (L14506).
- **Crisis looks:** map rows with the port at M-SF; the disaster look draws no district until M5 (V01 W10); camp placement by gate uses a simpler rule until M6-E (V06 E2) (L16532–16543).
- **Later shifts and features:** way-naming features from M5 are a declared shift (L16766–16769); damaged-plan levels from M6-E (L15036–15037); Find at M5 (L14110); weather effects (L14139–14140) and Show crises (L14057–14058) at M3b; the Resolution adjuster at M4 (L15266).
- **Pre-decided fallbacks:** kerb hairlines (L14897–14899); framing 95 % → 85 % (L15944–15945); word-cache text (L15349); WebGL2 compositor (L15340–15343); `drop` shadows, a 3° sun step, a fixed light step (L14810–14829); `step(4)` (L15458–15459); CityJSON sidecar (L17004–17007); random-style lightness window ±8 (L13535–13536); stamp-tile rebuild on a hash mismatch (L15527–15530).
- **Marked PLAUSIBLE until measured:** light-table memory (L13368); canvas need (L15232); stamp-tile annulus (L15518–15519); palette plate model (L13627–13628).
- **External and port timing:** export bundle from M-SF (L17730–17736); the port's creation half at M1, absorb half at M3a, live bridge at M-SF (L17736); `.dd2vtt` re-verification at Foundry 15 (L17014); `Block.overrides` and the place registry row reserved in M1's schema for M5 (L21694, L15597–15599).

### Other things to check

- **JSON `plan` blocks are not reproducible.** Two JSON exports of the same document can differ depending on what was clicked, because the blocks carry whatever the session's cache holds (L16966–16969, J-A28.86). Outside consumers need to be told this.
- **GeoJSON milestone may be stale in one place.** §16 places GeoJSON at M3a (L21697), but the metric variant's schema bump is tagged M2b (L16962). Either the exporter exists earlier for V12's bench, or the tag is out of date.
- **One edge reaches back into M-1.** Street-edge recoverability and the palette-target measures must be computed by identical definitions on the research side and in the product (L14894–14896, L13611–13617, L13630–13631). A changed definition re-signs evidence across M-1, M1 and M2b.


## Appendix F — §12–§15, §17 and Part II: budgets, testing and verification, packages and dependency rules, the parity matrix, the clean room, the stage-2 hooks

### Reader report: evidence machinery, dependency rules and Part II hooks (docs/ARCHITECTURE.md 17756–24469)

**What I read.** I read all of §12, §13, §14, §15 and §17, plus Part II (II.1–II.7). The 22080–24469 range also holds PART III (23284), the delegated decisions D-1…D-35 (23353; D-24 is at 23502), the judgment calls (23581) and the "Staged by the owner's roadmap" table (24404), so I read those too.

**Cross-references I resolved outside the range (by grep only):**
- §5.1 (5) work-limit laws (9832–9856)
- §5.3 invariant type and rows (9975–10066)
- §2.1 staged layers (563–565)
- the "M1's API pass" mentions
- the §16 milestone rows (21692–21726), used only to date pieces

Anything I inferred is marked *(inference)*. Mechanism letters: (a) contract fan-in, (b) evidence accumulation, (c) persistence, (d) identity/determinism, (e) performance substrate.

#### Per-piece table

| # | Piece | Where (lines) | Milestone | Direct consumers | What later code relies on | Redo if changed one milestone later | Verdict | Key sentence (line) |
|---|---|---|---|---|---|---|---|---|
| 1 | Reference machine and calibration-score normalisation | §12.1 17776–17797 | measured M0; gates from M1 | every §12.10 row, CI timing, tier pick | every timing is divided by (runner ÷ reference score) | Re-normalise every recorded figure and restate D-18. No model change | MIXED (b) | "the reference score is stored with the goldens" 17797 |
| 2 | "Budgets never change output" (F-BUDGET-TIME is reporting-only; wall clock read only in api's worker host) | 17841–17843; 18394; xref 9857–9860 | M1 (with the goldens) | all stages, goldens, replay | a slow host never produces a different town | If broken, every golden and saved log becomes host-dependent | COMPOUNDS (d). This rule is what makes rows 3, 6 and 12 ISOLATED | "none of them changes the model" 17842–17843 |
| 3 | Per-rung model cost laws and the max clause (R12-1, R12-3) | §12.3 17884–17949; 18398, 18400 | M1 TOWN/CITY; M2b METROPOLIS | §12.5 first-map law T(B), §12.6 replay law V, T119-1 | laws fitted on M1 timing-phase sweeps; T_i ≤ 1.25·L(B_i) judged on re-timed outliers | Re-declare the law and re-derive the tables (numbers only) | ISOLATED (seam: §12.10; D-18 "Reverse: low (numbers)" 23467) | "the law re-declared at the measured p95" 18398 |
| 4 | One-click completeness with linear per-building cost (the declared trade) | 17909–17917; 18027–18036; 18382–18387; D-18 23459–23468 | M0 gate; confirmed M1/M2b | every stage or layer on the one-click path | every plot, site plan and building stays on the path at 50–60 µs per building | Taking detail off the path is a mechanism change across layout, plots and render | COMPOUNDS (e) | "Reversal cost: high as a mechanism" 17915–17916 |
| 5 | Pool-vs-single-worker rule (R12-2), with identical digests at pool sizes 0–3 | 17922–17940; 18399 | M1 | pooled S10/S10b/S11/greenery; later compose and plan work (18247, 18253) | the pool choice is configuration only | Flipping the configuration is free; losing digest identity voids the goldens | MIXED: configuration ISOLATED; digest identity COMPOUNDS (d) | "pool size never changes the model … configuration, not output" 17934–17935 |
| 6 | Budget numbers and the register (CITY split rows, first-map law F(B) and its knee, export/label/tree figures, their configuration fallbacks) | §12.4 17951–18003; §12.5 18007–18039; §12.7 18171–18242; §12.10 18389–18451 | M0–M2b | §16 exits | rows are assumptions; misses are answered by a tile-DPR step, PNG filter None, one SVG decimal | Edit the numbers or the configuration | ISOLATED (seam: the register) | "a change is configuration or a declared shift, never a run-time answer" 18394 |
| 7 | Interaction frame envelope and its no-relaxation ratchet (R12-34, T119-5) | 17832–17835; 18041–18108; 18431 | ratchet from M2b (20776) | lighting, seasons, crises, weather, Find, resolution adjuster, 2.5D | ≤ 4 ms main thread per frame; weather ≈ 1 ms; GPU ≤ 8 ms | Each later layer must fit the measured envelope; rows can never be loosened | COMPOUNDS (e)(b), a ratchet | "no row relaxed against the previous release" 18431 |
| 8 | 10 s comfort level per one-time wait (R12-31) and the progress rule (R12-32) | 17812–17837; 18428–18429; 20774 | first waits M1; each other wait at its own milestone | migration and dossier change (M3a), advance and history (M6-E), open from SettlementForge (M-SF), every export preset | a hard release bar | A later wait that misses fails the release | COMPOUNDS (e); the progress view is ISOLATED | "fails the release until its path is changed — never a declared miss" 18428 |
| 9 | Scope-cost laws and the O(touched) batch-cost counters | §12.6 18110–18133; §13.2 18697–18700 | M2a (TOWN→CITY), M2b (→METROPOLIS), M3a | every edit; M5 district regeneration ≤ 30 ms (22324–22325) | commit-record work and edge counts stay ∝ touched faces | The numbers can be re-declared; losing O(touched) means re-architecting every edit | MIXED (e) | "a count that grows with the arena fails" 18699–18700 |
| 10 | Replay/load-verification law V = M(B)+Σc(e)+S14(B)+5 ms | 18134–18154 | M2a (R12-13) | open-from-SettlementForge, long histories, epochs | cost is a sum over the log; verification runs off the path to the picture | After M4, a change means migrating users' documents *(inference)* | MIXED (c)(e) | "a log of 300 district regenerations takes ≈ 11 s" 18150–18151 |
| 11 | Memory lines and R12-25's fallback ladder | §12.8 18267–18318; 18422 | M1, M2a, M2b | document layout, pool | the first fallback step moves the provenance and lifecycle-history columns into the document's on-demand block | After M2a this is a schema-chain step for saved documents; after M4 it touches users' files | COMPOUNDS (c) if taken late; the figures themselves are ISOLATED | "leave the working set for the document's on-demand block" 18422 |
| 12 | Timing-phase protocol | 17803–17811; 20716 | gating from M1 | R12 rows, T119 bars | run alone on the runner, batches ≤ 60 s, calibration before and after, ≤ 20 min a night | Tooling only | ISOLATED (seam: last job of the nightly tier) | "screens and never gates" 17808–17809 |
| 13 | Work-limit laws, `workLimits.json` coefficients and the F-WORK flatness counter | 18693–18697, 18841–18843; 20905–20906; xref 9832–9856 | confirmed M1, then nightly | every StageDecl.workLimits (21066); the volumes' units (e.g. moduleCells) | a hit takes a ladder rung, so coefficients are output; a scoped re-run gets exactly the full run's limit | After M1 a coefficient that moves output is a declared shift; after M2a saved logs can replay differently | COMPOUNDS (b)(d) for the law form and units; the hit-rate test is ISOLATED | "a change that moves output is a declared shift" 9851–9852 (xref) |
| 14 | B-CITY / B-CITY-lite seed families and the core statistics record | 18676–18689; 20184, 20209 | M1 (all three rungs) | invariant counts, ShiftRecord.statistics, parity, ratchets | seeds = H32("bcity/<rung>/<water>/<i>") plus the V12 collision rule; record fields are statistic ids | Changing a formula or field breaks comparability of every recorded count | MIXED (b)(d) | "all three rungs from M1" 18680 |
| 15 | Invariant suite contract: `Invariant {name, scope, class: hard\|soft, kind}` | 18676–18681; xref 9990–9997, 10057–10066 | M1 | StageDecl.invariants, report counts by name, CI thresholds, staged rows (U1–U3, sky, underground) | a hard row aborts the batch (the ladder then changes output); load rows gate saved documents | A new or changed hard row after M1 shifts generation; after M2a saved documents can fail to load | COMPOUNDS (a)(b)(c) | "hard = 0 per 1 000 cities; soft within its band" 18681 |
| 16 | Named base invariants later products assume: containment, NF-P5, seam exception (NF-P6), crossing/deck, 0 E_KEPT, baseLane match, `bugs` empty | 18636, 18733–18753; xref 10030, 10044, 10052; 23315–23316 | M1 | the village product, stage 2, the underground | these rules hold by construction for later products | Each change re-opens every product built on it | COMPOUNDS (a)(b) | "the containment invariant … holds unchanged and nothing in §2–§4 needs a village exception" 23315–23316 |
| 17 | Entity-registry path test and document tests (round trip, ≤ 320 B per building, report schemas) | 18704–18711, 18868–18873 | M1 | every record type, staged ones included | every type is present in all eight paths, migration included | A type added later must enter every path and bring a migration | MIXED: the registry COMPOUNDS (a)(c); the test is ISOLATED | "fails when a type is missing from any path" 18704 |
| 18 | Cross-engine and pool determinism tests (five engines, workers on/off, pool 0–3, op order) | 18712–18718; 20264–20269 | M1; GeoJSON from M3a | goldens, replay, bridge, exports | equal bits on every host | A divergence found later contaminates every golden and saved document | COMPOUNDS (d) | "a digest that differs between engines is a determinism defect" 20246 |
| 19 | Test benches as tooling: B-FUZZ caps and refusal register, B-EDGE, faithfulness campaign, visual regression/B-ZOOM, app harness, UX sittings | 18471–18488; 18754–18756; 18815–18840; 20284–20344 | M0–M3a | kernel, stages, styles, tools | caps only tighten; the campaign blocks M3a's exit | Edit fixtures or thresholds | ISOLATED (seam: tier jobs, §13.4), with a ratchet (b) | "never raised without the owner" 18484–18485 |
| 20 | Locality oracle (effective scope, seam exception) | 18760–18814; 22286–22292 | M2a; full scale M3a | M5 reroll isolation, M6-U reroll isolation | byte identity outside the effective scope | Redefining the scope re-opens every isolation bar | MIXED: the contract COMPOUNDS (d); the oracle is ISOLATED | "checks everything else byte for byte" 22291 |
| 21 | Owner-item bar convention and off-form equalities: NoOpPins, staged readers (T88-1), T13-1, T14-1, T15-1, T67-5 | 18848–18868; 18886–18911; 19176; 19307–19312 | M1 (T13-1, T88-1, T111-5); then M2b, M3a, M3b, M5, M6-E, M-SF | every owner item, staged readers, layer toggles | with the item off, output is byte-identical to the base on the golden suite | A later item with no off form shifts goldens; a broken pin re-opens its item | COMPOUNDS (b)(d); the pin engine is ISOLATED | "no golden exists before M1 (D-24), so the attributes that land before it need none" 18853–18854 |
| 22 | Hook bars bind the staged engines (convention (3) and the hook-bar table) | 18850–18852; 20160–20178 | M1/M2b/M4 on hook fixtures | M5, M6, M6-P, M6-U, M6-sky, M6-E, the village, M-SF, M3c | the same bars re-run on each engine's output | Changing a hook's meaning re-opens the base bar and its volume's tests | COMPOUNDS (a)(b) | "until the engine lands, when the same bars bind it" 18851–18852 |
| 23 | Frozen dossier fixtures, their manifest and the B-DOSSIER-lite digests (T73-8) | 19248–19321; 20271–20272 | M1 (copied in at M1, 19252) | port creation (M1), absorb (M3a), M-SF | fixtures are cut from SettlementForge commit 5d699cc68 | A new SettlementForge line means a re-cut plus an adapter folder (a registration) | MIXED (b)(c) | "re-cut by the same scripts when the owner names another line" 19251–19252 |
| 24 | Golden suite: per-stage isolated digests on frozen upstream outputs, plus PNGs and per-stop placement digests | §13.3 20181–20185, 20225–20227 | M1 | every later stage change, D-5 renders, visual regression | the stage split and each output version's frozen upstream outputs are the key | Moving work between stages or re-seeding after M1 costs shift and cascade records for every seed, plus new frozen outputs | COMPOUNDS (b)(d); the tooling itself is cheap (D-24) | "stages untouched by a release stay byte-identical (O2 e)" 20194 |
| 25 | Declared-shift rule: ShiftRecord, CascadeRecord, and the planned owner-item shifts | 20187–20215, 20271–20282 | M1; planned uses at M2b and M6-U | every release, release notes, M-CAL (cause `calibration`), baseline shifts | committed JSON; the golden CLI refuses a record with a missing field (20231) | A schema change means migrating committed records; a missed declaration blocks the exit | COMPOUNDS (b)(c) | "A same-seed output change is never let ride silently" 20194–20195 |
| 26 | Output-version stamp, preview flag, frozen view, and retention of versions N−1/N−2 | 20255–20262; D-21 23486–23490; J-DET-9 23660 | stamp M1; retention M3a; version 1 fixed at M4's exit | documents, permalinks (o=), replay, migration | old documents replay under their own output version | After M4 every model change is a new, retained output version | COMPOUNDS (c)(d) | "until M4's exit fixes output version 1" 20258 |
| 27 | View shifts (S13b placement digests, stamp tiles), the style-version axis, lighting kept outside the model digest | 20237–20253, 20277–20279 | M1; light pass M2b | labels, render, style sheets, the `house` pick (M4) | a view change bumps style versions only | Cheap: a shift record with no output version | MIXED: placement-digest identity is (d); pixels are ISOLATED | "bumps no output version" 20248 |
| 28 | MilestoneRecord and the exit-criteria shape | 20216–20222, 20230, 20255–20257 | M1, then every milestone | §16 exits, release notes, D-5 status, parity, UX records (M2a+), known defects | result values include fallback-applied, not-achieved, owner-set, provisional-not-rated | A schema change means rewriting M1's record and every later one | COMPOUNDS (b)(c) | "a milestone cannot exit with an undeclared shift" 20257 |
| 29 | `baselines.json`, the Baseline and ParityReport schemas, the band rule, the metric registry with metricVersion | 20348–20402, 20474–20480; 21028 | crossed at M-1; diagnostic M1; gating M2b | parity CLI, MilestoneRecord.parity, CalibrationRun | rows keyed by id + metric + metricVersion + referenceBuild, append-only; each report hashes the file it read | A definition change needs a research-side re-measure, a new row and a declared baseline shift | COMPOUNDS (b)(c) | "a row is never edited or deleted, so a milestone's report stays reproducible from the file it hashed" 20476 |
| 30 | D-5 panel protocol: seed formulas, sealed keys, append-only D5Record, provisional status carried forward, owner-eye picks | §13.6 20482–20643 | diagnostic M1; gates M2b, M4, M5 | milestone claims, §13.7 thresholds | seed lists are committed before any render and never changed | Unrated panels are re-rendered at every release until rated | COMPOUNDS (b) | "A provisional status never claims what the panel gates" 20582 |
| 31 | Thresholds without a reference, the JT rule, and "not achieved" marking | §13.7 20645–20704 | M1, M2b, M3a, M3b, M5, M6-P | parity report, release notes, §15.2 | a number and provenance now | A threshold moved by a fallback stays "not achieved" | MIXED (b); the numbers are cheap (D-30 "trivial (data)" 23542) | "re-signed only by a declared shift" 20654–20655 |
| 32 | CI tiers, compute budgets, bar schedule | §13.8 20706–20797 | measured M0; schedule from M1 | §16's exits cite it (20725) | a budget changes only by a recorded decision | Split jobs | ISOLATED (seam: the tier tables; D-34 "trivial" 23572) | "never to raise the cap" 20720 |
| 33 | Corpus-calibration interface, the table-cell format {value, unit, provenance, calibratable}, historical packs | §13.9 20818–20875 | interface in the base; used at M-CAL | M-CAL, every table | adopting a pack is an output-version bump with shift records (20838–20841) | If the cell format is incomplete at M1, every table must be migrated before M-CAL | MIXED: the cell format COMPOUNDS (c)(b); CorpusAdapter is ISOLATED | "Never changed: code, mechanisms, stage order, schemas, … engineering invariants and budgets" 20864–20865 |
| 34 | Package chain and its narrowing rules (lint) | §14 21039–21062 | lint from the M0 PR tier (20715) | every package | `kernel ← model ← tables ← world ← {site, content} ← layout ← plots ← buildings ← labels ← render ← edit ← export ← port ← api ← clerk ← app`; render never imports layout; labels never imports render | Re-layering re-opens every package built on the old layering | COMPOUNDS (a) for the inner chain; the leaves are ISOLATED by construction | "render never imports layout; nothing depends on app" 21055 |
| 35 | Staged-package quarantine: no ground package imports hood/under/sky/evolve/sites/village; only api's worker host registers them | 21047–21050; 20960–20961; 20979 | the rule from M1; the packages M3b–M-SITE | ground packages | staged internals cannot break the ground; ground interface changes do break staged packages | — | ISOLATED by construction on the staged side; COMPOUNDS (a) at the ground interfaces | "never imported by the ground's packages" 20961 |
| 36 | StrategyRegistry, StageDecl registration by declared I/O, hook points, `products`/LadderRouter, the extension-point list | 21036–21037, 21064–21081, 21399–21419 | M1; hook points M2b; `products` used from V-M0 | volumes 1–7 and 14 | StageDecl fields: id, I/O, stream keys, invariants, ladder, workLimits, budgetMs, batch, lineageUnit, lazy, txForm (21066) | A field or ordering change re-opens every registrant and the golden stage split | COMPOUNDS (a)(d) | "registered in @plat/layout's registry" 20961 |
| 37 | RNG stream API (StageContext.stream, Rng.stream, u16 ConcernId, StreamOpts); stage ids and concerns append-only | 21068–21074, 21095–21097; D-15 23439–23441; xref 10180, 10264 | M0/M1 | every stage and paint program | appending a concern changes no other key | Renumbering or re-keying after M1 moves every golden and saved document | COMPOUNDS (d); additions are ISOLATED | D-15 "Reverse: high after M1" 23441 |
| 38 | Strategy interfaces (FabricStrategy, PlotStrategy, SitePlanStrategy, GranularityLaw, BuildingGenerator) with the stage-3 and plan admission budgets | 21082–21089, 21166; 18243–18263; 22689 | M1; M3a (item 110, basementDoor); M5, M6, M6-P, M6-U | the base and volumes 1, 2, 3, 4, 7 | the underground runs PlotStrategy, SitePlanStrategy and outline "unchanged" | A signature change re-opens each implementation; tighter admission budgets re-open volumes 2 and 3 | COMPOUNDS (a) | "its registration re-declares S11's row of §12.4 by the measured difference" 18246 |
| 39 | labels↔render seam (ObstacleSource, RoleIndex) and the allowlist-lint scope (model, labels, the renderer code feeding S13b, vendored sources) | 21040–21044, 21057–21058, 21167–21174 | M1 | S13b placement digests, export label placement | labels stay deterministic without importing render | Changing the scope means re-auditing placement digests on all five engines | MIXED (d) | "labels never imports render" 21042 |
| 40 | DossierPort (digest, creation, absorb), DossierDigest, PortNote, HostContext, the one-way seed, the key-list lint, adapter folders | 21101–21165, 21200–21275 | creation M1 (test-side only); absorb M3a; live wiring M-SF | api, host glue, SettlementForge | the one-way seed is written into the recipe once, at creation | A digest or creation change after M1 re-derives every dossier-born document *(inference)* | MIXED: the contract COMPOUNDS (a)(c)(d); adapters are ISOLATED | "a registration, never a rewrite" 21208 |
| 41 | EditEngine and EditEvent kinds with inverses, fates and migrations | 21179–21188, 21414; the port's `assign` prefix 21106–21107 | log M2a; migration M3a; prefix events from M1 | port, evolve (21047–21048), clerk, bridge | logged events replay through the session's code path | A meaning change after M2a requires migrating every saved log | COMPOUNDS (c) | "EditEvent kinds with migrations" 21414 |
| 42 | Authoring surfaces: twelve tools ↔ declaration kinds ↔ events; the tool API; the skeleton file | 21277–21331; 19324–19332 | M2a (T9, T10); M3a; M3b | the built-in clerk (M3c), SettlementForge's assistant (M-SF) | canvas, API and skeleton file emit the same event | A binding change after M3a re-opens clerk recordings and skeleton files | MIXED (a)(c); toolkit rows are ISOLATED | "a thirteenth tool fails it" 19325–19326 |
| 43 | Leaves: exporters, the app UI and interaction contract, keymap and messages, docs and release notes | 21190–21193, 21302–21398 | M1 onward | users | Exporter.write is a leaf; the app sits on top | Edit freely | ISOLATED (seam: the Exporter registry and @plat/app) | "nothing depends on app" 21055 |
| 44 | Parity and improvement matrices, with the C/P/O letter classes | §15 21421–21666 | — | readers of claims | a [C] letter is never cited as evidence of improvement | Edit rows | ISOLATED (a matrix) | "never cited as evidence that an improvement was achieved" 21613–21614 |
| 45 | Hooks row: every hook field declared in the schema; zero cost when unused (≤ 2 %) | 21660; S1 21661 | M1 | the staged layers | one-click time and document size within 2 % of a build with hooks stripped | A hook added later is a schema step and spends the shared 2 % *(inference)* | COMPOUNDS (c)(e) | "zero cost when unused … within 2 % (a CI comparison)" 21660 |
| 46 | Clean-room process, the deny-list scan and the palette audit | 21836–21902, 21926–21947 | in place before M0; deny-list from M-1 | all seats; tables and assets | a hashed scan in the PR tier | A late hit on shipped naming or content tables forces a content change and so a shift *(inference)* | ISOLATED (seam: the PR-tier scanner; D-29 "low (process)" 23537) | "in place before M0's code" 23537 |
| 47 | Crossing files, CrossingRecord, `plat baselines check` C1–C10 | 21903–21925 | M-1; every panel milestone | baselines.json, D-5 inputs, corpus frames | append-only, countersigned crossings | — | MIXED (b): the process is ISOLATED; the records accumulate | "each commit appends a CrossingRecord" 21913 |
| 48 | Provenance on every table cell, the `extension` marker, `(code)` P-ids | 21948–21962; T23-1 18953–18955 | M1; audited at M4 | parity presets, M-CAL, release notes | a provenance value on every cell | Missing at M1: parity presets cannot switch off extensions, and M-CAL cannot re-sign | COMPOUNDS (b)(c) | "Every table cell's provenance names where its number came from" 21948 |
| 49 | Dependency pins, vendoring, and upgrades that re-run the goldens | §17.4 22029–22068 | M0 onward | model determinism | pinned, vendored, allowlist-scanned libraries | A model-feeding upgrade after M1 is a declared shift (J-DET-28 23679) | MIXED (d) | "re-runs the checker, … the vendored sources and the goldens" 22041–22042 |
| 50 | Seam records, SeamContract, typed seam edges, baseLane portals | II.1 22082–22181; II.5 22303–22319 | M1 (100 % at M1's exit) | stage 2 (M5), sky unit runs, the underground close-up | one record per boundary run; shared geometry belongs to the base | Adding them later means S6/S8 shifts with a cascade on every golden *(inference)* | COMPOUNDS (a)(d) | "from milestone 1 (G-P1)" 22083 |
| 51 | Per-district streams and reroll isolation with the seam exception | 22286–22292; 22306, 22318–22319 | M1 | New random (M2a), M5 | byte identity outside the seam exception | Re-keying the streams moves every golden | COMPOUNDS (d) | "a New random on each of 20 districts per city changes nothing outside its seam exception" 22318–22319 |
| 52 | FabricStrategy slot (`bent-cut` from M1) and the stage-2 hook points (S7b.afterGreedy, S10a.afterDrivers), squares.quota, the way-surface rule (M2b) | 22234–22235; 22307–22309 | M1; M2b | M5 templates, `village-ways`, the D-5 NG `area` pairs | District.fabric is persisted; hook keys | An id or hook change re-opens volume 1 | COMPOUNDS (a)(c) | "BentCutFabric registered from M1 and V01's TemplateFabric at M5" 22307–22308 |
| 53 | Close-up persistence rule (refine is derived and outside the hash; the `closeup` event; instance overrides; replace = setAttr plus scoped regeneration) | II.4 22271–22282 | rule now; events with M5 | M5, M6-E | opening a district never changes the town | After M5, documents with close-up edits need migration | COMPOUNDS (c) | "held outside the base hash and never stored" 22272–22273 |
| 54 | Elaboration record, cache, `elaborate` key, stale marker | 22294–22299; 22329–22330 | M3a (§16 xref) | M5, M6, M6-P | one shared click policy | A change re-opens all three consumers | COMPOUNDS (c) | "which stage 2's close-ups and stage 3's rungs share" 22330 |
| 55 | Island hooks: `recipe.layers.islands` (a model setting, off by default), the rung row, the `island.place` draw, the S7b (5) sky allocation, SkyIsland, the SkyStrategy slot | II.6 22338–22439 | setting and rows M1 (T13-1); S7b (5) M4; SkyStrategy M6-sky | M6-sky, M6-E | with the setting off, the ground is byte-identical to the realism golden | A draw-order change after M4 shifts documents that have islands on | MIXED: ISOLATED for the default goldens; stream keying is (d) | "its ground model is byte-identical to the realism golden" 22383 |
| 56 | Sewer hooks: the `Features.sewers` S0 draw, the rung row, the `drain` column, the one-way `Tunnel.serves` link; the SewerStrategy tail stage | 22360–22374; 22526–22566; 22575–22594 | Features M1; network M6-U | M6-U, exporters, the undercity | the network writes only its own arena part; "Nothing here writes the ground" 22591 | Adding the S0 draw later moves every golden | MIXED: the S0 draw COMPOUNDS (d); the network is ISOLATED | "Features.sewers is resolved and reported and … (part 0) stays empty" 22543–22545 |
| 57 | U1–U3, the F-UNDER/F-VOID ladders, the underground pseudo-district, the S7b (6)/(7) allocation slots | 22637–22701; 22936–22944; T14-1 18906–18911 | rows in the base; run at M6-U | M6-U, the M6-E crowding hook | the population stays whole; the ground keeps the remainder | M6-U files a one-time ground shift | COMPOUNDS (b)(d) through S7b's part order; the stages are ISOLATED | "a one-time shift of the M6-U output version recorded in plat/goldens/" 18910–18911 |
| 58 | Underground records and lifecycle: AccessPoint (state, knownTo, source, cause; its SiteReach form reserved at M1's API pass), the condition table, the no-demolish lint, nextUndergroundPart, the registration slots | 22441–22492; 22821–22876 | API form M1; records M4; stages M6-U | M6-U, M-SITE-A, M6-P P2, M6-E | a tunnel's condition is a reading of existence plus closure, never a second stored state | After M4 or M6-U, persisted parts need migration | COMPOUNDS (c)(d) | "nextUndergroundPart is never reused" 22876 |
| 59 | PART III village hooks: ProductDecl, LadderRouter, one district, rung rows with layers none/never/never, the port's refusal below 1 500 | 23284–23351 | V-M0 right after M0; V-M1–V-M4 after M4 | volume 7, the port | "a village adds rows, not code" 23295–23296 | A registry change re-opens V-M* | COMPOUNDS (a) at the registry; the rows are ISOLATED | "the base does not pay for it" 23288 |

#### THE MOMENTS compounding switches on

**M-1, before any product exists.**
- Baselines cross into `plat/` through numbers-only files, each commit with a countersigned CrossingRecord (21903–21913).
- M-1 recomputed the bands on 2026-10-04. "No product existed yet, so no gate turned from passing to failing" (20397–20398).
- From M1 on, a new reference build "never overwrites a row … is a declared baseline shift" (20380–20383). A recomputation that turns a pass into a fail must be declared (20394–20395).

**M0.**
- The dependency lint, the path rule and the determinism allowlist run in the PR tier (20715).
- The clean-room chain is "in place before M0's code" (23537).

**M1: goldens and declared shifts switch on. This is the main switch.**
- D-24: "Stage-isolated goldens … built at M1" (23502–23504). It explicitly rejected "goldens at M4".
- "The output-version stamp, the shift, cascade and milestone records and the stage-isolated golden tooling are built at M1, not at hardening … a milestone cannot exit with an undeclared shift" (20255–20257).
- "no golden exists before M1 (D-24), so the attributes that land before it need none" (18853–18854).
- At M1 these also start:
  - the first ParityReport stored in the MilestoneRecord (20379);
  - the first D-5 panel, diagnostic only, with its seed lists committed (20488–20490);
  - the first timing phase that gates anything: R12-1/R12-3/R12-6 at TOWN and CITY (18398–18403), and T119-1/T119-2 (20774);
  - the `.plat` writer and reader (J-S40, 23851);
  - the port's creation half (24288);
  - the API reservations made at "M1's API pass" (22832; xref 563).

**The document format: it is not frozen in one step.**
- M1 writes it.
- M2a builds the log "over M1's document format" (18287–18288).
- M3a adds retention of N−1/N−2 with a replay test (20260–20262), and GeoJSON byte identity on five engines (20266–20269).
- M4 "fixes output version 1", ending the preview label (20258). From then on, users' documents replay under their own version (20840–20841).

**M2b.**
- The interaction-budget ratchet starts (T119-4/T119-5 from M2b, 20776).
- METROPOLIS laws gate (18398).
- The D-5 panel gates "the base at parity".
- The first planned feature shifts: LightSource → S11, the class mix, informal clusters, concealed pairs, S12c (20273–20277).

**M6-U.** "A staged layer's first release is a declared shift of its milestone's output version" (20281–20282).

**M-CAL.** Adopting a historical pack is "an output-version bump with a shift record for every moved stage" (20838–20841).

**The decision ledger's own reversal costs:**
- High after M1: D-12 coordinates (23427–23428), D-13 the plat (23430–23432), D-15 streams (23441), D-26 identity (23523), D-28 the model digest (23529).
- D-16, the fused layout: "Reverse: high … hence M0 and M1's fusion gate" (23449–23450).
- D-4, the core language: "medium after M1" (23394–23396).
- D-18: "low (numbers) … medium (architecture) if M0 or M1 miss" (23467–23468).
- Low: D-21 the document (23489), D-27 work limits (23526).
- Trivial: D-24 goldens (23504), D-30 thresholds (23542), D-34 CI tiers (23572).

#### Per milestone: what must be settled inside it, and what can be fixed later in isolation

**M1**
- COMPOUNDS, settle inside M1:
  - The golden suite definition and the stage split (rows 24, 36). (b)(d). Re-opened first at M2b, whose planned shifts are written against M1's store.
  - The ShiftRecord, CascadeRecord and MilestoneRecord schemas and the `plat/goldens` layout (rows 25, 28). (b)(c). Re-opened first at M2a, which writes the next record.
  - The output-version stamp and the frozen view (row 26). (c)(d). Re-opened at M2a.
  - The determinism contracts: five-engine and pool-size identity, the allowlist scope, "budgets never change output", vendored libraries (rows 2, 5, 18, 39, 49). (d). Re-opened at M2a (replay equals session) and M3a (GeoJSON).
  - The invariant contract, the named invariants, and the evidence keys (B-CITY seeds, core-record fields) (rows 14–16). (a)(b)(c). Re-opened at M2a (load rows on saved documents) and at M6-U (U1–U3 run in the same suite).
  - The work-limit law form and coefficients (row 13). (b)(d). Re-opened at M2a, where scoped re-runs and replay inherit the limits.
  - The baseline, parity and metric-registry schemas (row 29). (b)(c). Re-opened at M2b, where the P rows gate.
  - The D-5 seed formulas and records (row 30). (b). Re-opened at M2b.
  - The table-cell format with provenance and extension markers, and the parity presets (rows 33, 48). (b)(c). Re-opened at M2b (parity runs with extensions off) and M4 (the provenance audit).
  - The entity registry, the staged records "schema-complete and empty", the 2 % hook budget (rows 17, 45). (a)(c)(e). Re-opened at M3a (item 88's records) and M4 (underground and island records).
  - The off-forms already in force: T13-1, T88-1, T111-5 (row 21). (b)(d). Re-opened at M2b.
  - The port's creation half and the frozen fixtures (rows 23, 40). (a)(c)(d). Re-opened at M3a, where absorb diffs against facts carried since creation.
  - §14's chain and the M1 API reservations (rows 34–38). (a). Re-opened at M2b (hook points) and M5 (the hood package).
  - The Part II M1 hooks (rows 50–52, 56). (a)(c)(d). Re-opened at M5.
  - The performance substrate: one-click completeness, O(touched) batch cost, the comfort bar (rows 4, 8, 9). (e). Re-opened at M2b (METROPOLIS, S10b scoring, S12c, the daylight term).
- ISOLATED, can be fixed later:
  - budget numbers and configuration fallbacks (seam: the §12.10 register);
  - the timing-phase protocol (seam: the last nightly job);
  - CI tiers and the bar schedule (seam: the §13.8 tables);
  - the test benches (seam: tier jobs);
  - the §13.7 numbers confirmed at M1 (seam: §13.7 rows). Caveat: O14 (e)'s fallback is itself "(a declared shift)" (20680), so decide it inside M1.
  - SVG/PNG exporters (seam: the Exporter registry);
  - the matrices, known-defects and release notes (seam: reports);
  - the deny-list scanner;
  - the app UI.

**M2a**
- COMPOUNDS:
  - The EditEvent kinds and the log/replay fold over M1's format (row 41). (c). Re-opened at M3a (migration and retention) and M6-E (evolve uses edit's operators).
  - Load verification, with the records digest joining the snapshot, and the law V (row 10). (c)(e). Re-opened at M3a (the bridge convergence test) and M-SF.
  - The outcome of R12-25's memory fallback, which may move document columns into the on-demand block (row 11). (c). Re-opened at M3a as a schema step.
  - The locality contract (rows 20, 51). (d). Re-opened at M3a (full scale) and M5.
  - The scope-cost law from TOWN to CITY (row 9). (e). Re-opened at M2b and M5.
- ISOLATED:
  - B-EDIT sequence counts (seam: tier jobs);
  - the pipeline UX session, "recorded and not gating" (20343–20344);
  - the R12-12 and R12-13 numbers (seam: the register);
  - the T126 medium-layout pin (seam: a view pin).

**M2b**
- COMPOUNDS:
  - The hook points S7b.afterGreedy and S10a.afterDrivers, squares.quota and the way-surface rule (row 52). (a). Re-opened at M5.
  - The planned feature shifts, filed with cascade records (row 25). (b). If deferred, they stack onto M3a's output version.
  - The NoOpPin off-forms for items 102–107 and 115 (row 21). (b)(d). Bound on every later PR run.
  - The P-row verdicts and the D-5 "base at parity" result, rated or provisional (rows 29, 30). (b). Re-opened at M4.
  - The interaction ratchet baseline (row 7). (e)(b). Re-opened at M3b (seasons, weather, crises), M4 (resolution adjuster), M5 (Find).
  - The METROPOLIS laws and the re-declared rows (rows 3, 4). (e). Re-opened at M6-U (+6 ms at METROPOLIS).
  - The §13.7 "not achieved" outcomes (row 31). (b). Re-opened at M-CAL.
  - The CPU light-pass reference (row 27). (d). Re-opened at M3b (the night view).
- ISOLATED:
  - the R12-4 numbers;
  - light tier and rung fallbacks (seam: §8.4's ladder);
  - the correlation and tendency spec numbers (seam: the V12 spec registry);
  - `lit` role values (seam: the style version).

**M3a**
- COMPOUNDS:
  - Retention of N−1/N−2, its replay test, and migration as an undoable event (row 26). (c). Re-opened at M4.
  - GeoJSON five-engine byte identity (row 18). (d)(c). Bound on every later nightly run.
  - The absorb half, the audience table and display names (row 40). (a)(c). Re-opened at M4 (epoch clauses) and M-SF.
  - The tool API and skeleton file (row 42). (a)(c). Re-opened at M3c and M-SF.
  - The elaboration record and cache (row 54). (c). Re-opened at M5 and M6-P.
  - The bridge message schema (row 40). (a)(c). Re-opened at M-SF.
  - Item 88's staged records, schema-complete and empty (row 21). (c)(b). Re-opened at M-SF.
  - The comfort-level waits for a dossier change and a migration (row 8). (e). Re-opened at M6-E.
- ISOLATED:
  - B-EDIT 10⁵ in the milestone tier;
  - the outcomes of the first-five-minutes test (the fallback revises hints);
  - the O2 (c) carry-over fallback;
  - the R12-10/14/15 numbers. Note that R12-14's fallback changes how warps validate, so take it inside M3a.
  - the GeoJSON exporter code.

**M4**
- COMPOUNDS:
  - Output version 1, which ends the preview label (row 26). (c)(d). From M5 on, every model change is a retained output version.
  - The underground and island hooks built at M4 (§16 xref 21699): basement accesses, the systems' records and parts, links, the undercity bound, `raiseGrade`, `addUndergroundAccess` with its staged refusal, the S7b (5) count draw and sky allocations, the decline kinds, and the hook-fixture bars T8, T10–T12, T15, T64–T67 (rows 22, 55, 58). (a)(b)(c). Re-opened at M6-U, M6-sky and M6-E.
  - The D-5 "mastered" result and the `house` pick (row 30). (b). Re-offered at M4b and M5.
  - The table-provenance audit (row 48). (b)(c). Re-opened at M-CAL.
  - Nightly cross-platform goldens green for two weeks, and the incremental path from D-25 (rows 18, 37). (d). Re-opened at M6-E.
- ISOLATED:
  - release notes (seam: the generated report);
  - the R12-36 Auto-loop thresholds (seam: the register);
  - the 20-epoch budgets (seam: the milestone-tier job).

**M5**
- COMPOUNDS:
  - S7c and S9b run inside S7b and S10a at generation from M5 (17967). That is likely the first declared shift of the default goldens after output version 1 *(inference)*. (b). Re-opened at M6-sky, M6-U (U3/U4 wait on volume 1's W15) and M-SITE-A.
  - Close-up events in documents (row 53). (c). Re-opened at M6-E.
  - The NG baselines and NG panel seeds (rows 29, 30). (b).
- ISOLATED:
  - Find, a view-only feature behind the T120-1 pin;
  - `hatched` role values;
  - the hood.* table rows (seam: data, with a declared shift only where output moves);
  - the SeamReport numbers.

**M6-P**
- COMPOUNDS:
  - The plan JSON block schema (T28-19) and the rule that edited plans are model data (c). Re-opened at M6 (the stage-3 composer), M6-E (re-cuts) and M-SITE-A.
- ISOLATED:
  - Derived plans, the cache capped at 8 MB and "dropped first" (18295–18301);
  - R12-23's fallback, which is a declared view shift (18420);
  - the B-PLAN tests and the plan soft-band row.

**M6-U**
- COMPOUNDS:
  - The one-time ground shift (row 57). (b). M6-sky, M-CAL and M-SITE-A build on that output version.
  - Underground parts persisted and never reused (row 58). (c)(d). Re-opened at M6-E.
  - The additions to the critical path, +3 ms at CITY and +6 ms at METROPOLIS (17980, 17988–17989). (e). Re-opened at M-SITE.
- ISOLATED:
  - The tail stages behind StrategyRegistry.underground (seam: the registration slots; the ground is read-only);
  - UndergroundRule data, zero under the parity presets;
  - the hidden-render clause (seam: LayerSpec.visible).

**M-SF**
- COMPOUNDS:
  - Host-facing contracts go live: the bridge messages, the DossierDigest's SettlementForge-stage fields (21152–21155), the host store. (a)(c). Re-opened at M-W*.
  - Item 88's readers start moving output for dossier-born documents, so T88-1's equivalence ends *(inference)*. (b).
  - The comfort-level wait for opening a map from SettlementForge (row 8). (e).
- ISOLATED:
  - Adapter folders per SettlementForge line (seam: AdapterRegistry, "a registration, never a rewrite" 21208);
  - the audience table, which is host glue (21250–21252);
  - HostContext, behind an input pin (T125-2);
  - the BridgeTransport wiring.

**Other milestones, briefly.**
- M3b: exporters (ISOLATED) and view pins.
- M3c: ClerkBackend (an extension point).
- M4b: `@plat/sim` (ISOLATED; the relation store's schema is in the base from M1, D-10 23416–23417).
- M6-E: bound by the hook bars; T113-7 is its pin.
- M6-sky: islands are off by default, so the default goldens do not move.
- M-CAL: "Never changed: code, mechanisms, stage order, schemas, … engineering invariants and budgets" (20864–20865).

#### Part II: hooks needed by M1 versus hooks added at their own milestone

**Must be carried by M1.** Each of these is an S0/S6/S8 draw, geometry that enters every golden, or a persisted id or enum value.
- Seam records, SeamContract on every district, typed edges including `reserve`, baseLane portals: 100 % at M1's exit (22314–22319). The M1 check is "schema completeness only (the field is flat until M2b…)" (21661).
- Per-district streams, with reroll isolation checked on 20 districts per city (22306, 22318–22319).
- The `bent-cut` FabricStrategy (22307).
- Volume 1's M1 schema, including its concern ids and the `S8.seed` stage id (§16 xref 21694).
- The complete pin vocabulary in the registry (22121).
- `RungProfile.layers`, the `Features.sewers` S0 draw (22537–22545), and the geology/relief S0 draws. The §16 M1 row says these are taken at M1 "so `Terrain.geology` and the relief class are in the first golden, as `Features.sewers` is" (21694).
- `recipe.layers.islands` off, with the ground equal to the realism golden (T13-1 from M1, 20733).
- The staged-reader base-value equivalence (T88-1 from M1, 20736).
- The append-only values reserved at M1's API pass (22832; xref 563).

**Can be added at their own milestone without re-opening M1's records.** They are registrations into slots, or records that stay schema-complete and empty while the layers are off. A milestone that moves output appends its own shift records; it does not re-open M1's.
- M2b: the hook points, `squares.quota`, the way-surface rule (22307–22309).
- M3a: the elaboration record and cache.
- M4: the underground and island records, AccessPoint state, links, `raiseGrade`, `addUndergroundAccess` (with its staged refusal), the S7b (5) island draw.
- M5: TemplateFabric, S7c and S9b. These likely add a shift *(inference)*.
- M6-sky: SkyStrategy. No shift while islands are off.
- M6-U: the tail stages. They append one designed ground shift (18909–18911).
- M6-E, M6-P, M6 and M-SF follow the same pattern.

#### Explicitly deferred with a hook

"This document defers nothing" (24404). Every subject is staged with hooks named (24415–24427):
- stage 2 (M5);
- stage 3 (M6; its item-110 part at M3a);
- the plan rung (M6-P);
- the village product (V-M0 to V-M4; V-M2u after M6-U);
- the underground layer (M6-U);
- floating islands (M6-sky);
- the evolution engine (M6-E);
- corpus calibration (M-CAL);
- the SettlementForge connection (M-SF);
- the built-in clerk (M3c).

Also deferred with a hook:
- `@plat/sim` (M4b; D-10 23416–23421);
- item 88's staged records, filled at M-SF;
- the underground pieces of `addUndergroundAccess`, which refuse with F-EDIT naming the staged layer until it exists (23514–23517);
- the layer's stages, "not built here" (22865–22866).

#### Skeptic notes, both ways

1. D-24's "Reverse: trivial (test tooling)" (23504) prices only the tooling. What compounds is the evidence: shift records per output version, frozen upstream outputs, and the stage split used as a golden key.
2. D-21 rates the document "Reverse: low" (23489). That plausibly holds before M4; after output version 1 a reversal means migrating users' files *(inference)*.
3. §12.1 says "none of them changes the model" (17842–17843), but several pre-decided fallbacks do move output or format:
   - R12-5 coarsens raster cells (18402);
   - R12-25 changes the document's block layout (18422);
   - R12-14 changes how warps validate (18411);
   - O14 (e)'s fallback is "a declared shift" (20680).

   Each is safe only on its stated milestone.
4. D-23 (dmath) and D-27 (work limits) are cheap in code but move output: after M1, every change is a declared shift.
5. The core statistics record includes stage timings (18686) and is stored in the golden store (20184). The text does not say whether timings are excluded from comparison *(probably only digests and declared statistics are compared)*.
6. The package chain is a total order that would allow, for example, edit to import render. The real isolation comes from the narrowing rules.
7. The "2 % hook cost" check needs a build with hooks stripped *(inference)*. That maintenance grows with the number of hooks.
8. SeamContract's samples are constants until M2b (21661). If Seam records are in the model digest, M2b files an S6 shift *(inference)*.
9. "A registration, not a redesign" (22336, 22520) holds for code but not for evidence: M6-U shifts the ground once by design, and M5 likely does too.
10. FTG cannot be seeded, so the FTG panels re-use M-1's finite set of captures (20512–20526). A new capture is a declared baseline shift.
11. The world milestone M-W0h moves the hydrology code from `@plat/site` to `@plat/world` "under the same names" (20923–20929), and §16 notes "the shift reported" (21721). That is a planned post-M1 dependency change that does cost a shift.


## Appendix G — The current state: M0.md §4b's deferral table, the fix queue's M1+ rows, the known issues, the volumes' requirements on the base, the host contract

REPORT, reader 6: current state and the volumes, re-weighted for M1 and later (per the coordinator's clarification)

Path aliases: M0 = plat/docs/build/M0.md · FQ = docs/M0-FIX-QUEUE.md · KI = docs/KNOWN-ISSUES.md · GATE = plat/docs/build/M0-world-sites-gate.md · GCHK = plat/docs/build/checks/M0-world-sites-gate.md · SCOPE = docs/build-prep/M1/scope.md · DEFER = docs/build-prep/M1/m0-deferrals.md · VSH = docs/build-prep/M1/volume-shares.md · HOST = docs/HOST-REQUIREMENTS-2026-10-18.md · ARCH = docs/ARCHITECTURE.md · INTEG = docs/volumes/_integrate-world-sites.md · VERD = docs/validation/m0-coverage-2026-10-18/verdict.md · PROG = docs/PROGRESS.md · CH = plat/docs/build/choices.md · FILEU = docs/AMENDMENTS-2026-10-18u.md · code paths are under plat/packages/. Mechanisms: (a) fan-in, (b) evidence, (c) persistence, (d) identity/determinism, (e) perf substrate.

### HEADLINE

1. **M1 is where the costs start to compound.** M1 is where the stand-ins are replaced. It also creates the first goldens, the first persisted recipe and manifest, the first register entries and the first dossier bindings, and M2a then folds the edit log over M1's format (ARCH:21695). By my count, 13 of §4b's 40 rows compound, and 11 of those 13 land in M1.
2. **The cost of a generation change rises at three points by design.** Before M4 every document and link is "preview" (ARCH:10856-10857, :20258-20260), so a shift costs a declared shift record plus re-recorded goldens. From M3a, output versions N−1 and N−2 are retained as shipped chunks and the golden suite must replay under them (ARCH:10898-10909). From M4, output version 1 is fixed. So any fix to generated output is cheapest before M1's first golden, then before M3a, then before M4.
3. **The gate's carried rows are cheap at M1's API pass and expensive after M2a.** The rows are K10 (version axes in the manifest), K12 (CommitRecord stage/batch/reads), K14 (arena re-key), M1 (a document namespace in addresses), M2 (the carve delta) and M4 (the water-table accessor) (GCHK:30-34; GATE:32-34). M1 matters most: choosing the lineage-lane route rather than the salted-seed route is the difference between a declared address shift and no shift (GCHK:272-278).
4. **The plan has unresolved milestone conflicts:**
   - Transient arenas: `notBuilt('M6-P')` in code (kernel/src/facade/kernel.ts:268-270) and M6-P in §4b (M0:854), §16's M1 row names them as M1 work (SCOPE:24, :94), and FILEU:153-172 says M-ENC's SE0 builds the form.
   - S12a–c: M1 per §4b, M2b per §16 (SCOPE:25).
   - The full GranularityLaw and roofs: M1 per the M0 records, M2b per §16 (SCOPE:29-30).
   - II.5's M1 exit uses New random, which is an M2a action (SCOPE:26).
5. **J558 (PROG:615) changed the order before M1.** The Mac timing steps now gate M1. The owner's re-budget-or-redesign decision (C2) and "a-16's two public-API rows" follow them, and both come before M1. That is good: a Clipper2-WASM engine swap is "a declared golden shift" (M0:141-150). But J558 explicitly does not make the AFTER-M-1 run items gate M1. Those items rewrite output-affecting tables (granularity, regimes, cut, interior, bands; M0:333-335), so they can land inside M1 as declared shifts (Q98, FQ:112).
6. **Two volume/host edges are not yet carried in the base:**
   - Gate rows M12 and M13 (V14 road access and hinterland faces) were added after the 2026-10-17 check and have no check evidence (GATE:51-52 against GCHK:409-436).
   - V13's world.* concerns and W stage ids, and V14's `site` concern, G/E/R stage ids and `site` Layer value, are not yet in the registries (my script over kernel/src/registry/*.json). They are append-only, so adding them is isolated.

### A. M0 item map (background only: what each builds → its M1+ consumers → verdict)

| item (M0 line) | builds | consumed by (M1+) | verdict |
|---|---|---|---|
| s-01 (:399) | scaffold, package graph, lint host, landed tools | every later package (DEFER:25) | ISOLATED |
| s-02 (:431) | tables loader, cell {value, unit, provenance, calibratable}, M0 tables, census | M1 zod/V11 C0–C1/register; M3a overrides keyed to row hashes; every volume's tables | COMPOUNDS (c,b): tables are pinned in recipes by version and hash (ARCH:10858-10859) |
| m-01 (:439) | model records/types, the digest's schema field order, staged fields | M1 entity registry (SCOPE:206), every reader; V13 placement and V14 anchor kinds | COMPOUNDS (c,d) |
| a-01 (:451) | exact numeric core, kernel types | everything; V13 integer metres | COMPOUNDS (d) |
| a-02 (:456) | arena, role/owner tables, resolve, roles.json | all stages; V14 `passage` role; ROLE_REGISTRY_VERSION in blocks | COMPOUNDS (c,d) |
| a-03 (:459) | spatial index, pointLocate | S9–S11; pool freeze (DEFER:31); V04/V14 | MIXED (e) |
| a-04/a-05 (:461/:463) | insertion, attraction, insertChain | all geometry; L1 at M1's API pass; M3a candidate (c) | COMPOUNDS (d,e) |
| a-06 (:466) | transactions, CommitRecord, work charging, savepoints | M1 pool overlays (DEFER:32), K12; M3a clear regions; M4 epochs | COMPOUNDS (a,e) |
| a-07 (:471) | face partitioners, claimSubFace | M1 S7b score form (kernel/src/faces/claim.ts:123); V01 | MIXED |
| a-08/a-09 (:473/:476) | booleans/buffers; kerb/corridorUnion/bandUnion | M1 S9/S10; V04 bands; V14 G5 | COMPOUNDS (b,e) |
| a-10 (:478) | OBB/hull/LIR, curves, Dijkstra/A* | S10/S11; V13 W7; V14 A*/hex lattice | MIXED |
| a-11 (:481) | straight skeleton, roofs | M1 S10 regions; M2b RoofSpec; V02 | COMPOUNDS (b) (Q63/Q67 pending shifts) |
| a-12 (:483) | medial axis, skeleton corpus | B-CITY-lite corpus; V14 G5 | ISOLATED |
| a-13 (:486) | warp, simplify | M3a warp kernels | MIXED |
| a-14 (:488) | invariant suite | all; pool-scope rows at M1 (DEFER:39) | MIXED |
| a-15 (:490) | arena block encode/decode | M1 `.plat` (SCOPE:55); K10, K14 | COMPOUNDS (c) |
| a-16 (:493) | façade, notBuilt stubs | pool (M1), resolveVertexAt (M2a), transient arena | COMPOUNDS (a) |
| d-01 (:498) | RNG, stream keys, concern/stage registries | every draw; ids frozen at M0's exit (CH:31); V13/V14 appends | COMPOUNDS (d) |
| d-02/d-03 (:501/:503) | MurmurHash3/H32; dmath | RH32 (M1); every model package; V13 | COMPOUNDS (d) |
| d-04 (:505) | Merkle digest | M1 stored root (DEFER:45); M2a records digest; goldens | COMPOUNDS (d,c) |
| d-05a/d-05b (:508/:509) | lineage, addresses, collision rule; matching/carry-over | M1 naming records and tombstones; B-EDIT-lite (SCOPE:138); M2a; V06 | COMPOUNDS (d) |
| d-06/d-08/d-09 (:510/:518/:519) | cross-host harness; op-order harness; determinism spike | M1 five-engine placement digests; pool 0–3; B-CITY re-run (SCOPE:161) | ISOLATED (tools; gate M1 per J558) |
| d-07 (:514) | determinism lint | all model packages; M1 unit lint, port scan | ISOLATED (its allowlist is a contract) |
| b-01 (:523) | granularity bands | full GranularityLaw (DEFER:58; §16 says M2b) | MIXED |
| b-02/b-03 (:524/:526) | planner; BentCutFabric/S8 | M1 S9–S11 read Block/Frontage; V01 templates; V07 V-M0 | COMPOUNDS (b,e) |
| b-04/b-05/b-05a/b (:530-:537) | signature and NG harnesses; run items writing table cells | AFTER-M-1 cells land inside M1 (J558) | MIXED (b) |
| c-01 (:541) | flat fixture, S3 slice as data | replaced by S3 at M1 | ISOLATED (stand-in; evidence keyed to it) |
| c-02 (:544) | trace, strip stand-in, basic water gate | S7 at M1; gate ids | COMPOUNDS (d) |
| c-03 (:548) | S4 backbone, span through a site | M1 deck strip; gate M13 two-point road | COMPOUNDS (a) |
| c-04/c-05 (:549/:550) | S5a–S5d | M1 S5; presets; M2b suburb; M4 growth stage | COMPOUNDS (b) |
| c-06/c-07/a/b (:552-:558) | fusion gate and statistics | M1 re-run on B-CITY-lite (SCOPE clause 66) | ISOLATED / MIXED for the table cells |
| e-01 (:562) | terrain, noise module | M1 S1 additions; V13 BCR-V13-29; gate M3 | COMPOUNDS (d) |
| e-02 (:564) | hydrology | lifted into @plat/world/hydro by V13 (BCR-V13-1; V13:254-299) | COMPOUNDS (a) |
| e-03 (:565) | S1 L0 batch, crossing sites | M1 coast etc.; V13's charter as S1's one input (gate M5) | COMPOUNDS (a) |
| e-04 (:567) | S6 districts, quarter tree | M1 S13a names; V01; V04 districtsAbove | COMPOUNDS (d) |
| e-05 (:569) | fields pass 1, FieldBands | M1 pass 2; M2b daylight/prosperity | MIXED |
| e-06, f-01, f-02a/b, x-05, x-06, k-01..k-04, k-06/k-07, t-00 (:570-:614) | harnesses, timing, tiers, coverage, fuzz, scanner | the tiers from M1 | ISOLATED |
| f-03a/b (:581) | work-limit laws and coefficients | re-fitted on B-CITY-lite at M1 (DEFER:135); output-affecting | COMPOUNDS (b) |
| k-05 (:589) | metrics, parity, baselines check | V12 W2 at M1 | MIXED (b: metricVersion) |
| x-02/x-04 (:600/:601) | StrategyRegistry, runner, base registration and ranks | every stage/product; M2a scoped runs, M2b hooks, M4 epochs, M6-U tail; V07/V13/V14 products | COMPOUNDS (a,d) |
| t-01/t-02 (:613/:614) | timing runs | gate M1 and feed C2 (PROG:615) | COMPOUNDS (e), as the decision's input |
| x-01/x-03 (:615/:616) | M0 record and addendum | M1 ingests M0-record.json (DEFER:142) | COMPOUNDS (b) |

### B. §4b deferred table (M0:836-877): seam or compounding, and what reopens

**COMPOUNDING (13 rows):**

| line | deferred → to | M0 hook | why it compounds; milestone reopened |
|---|---|---|---|
| :838 | S7 walls, band, towers, gatehouses, plazas → M1 | strip stand-in `setback` lines; minimal Enceinte/Gate | The stand-in's committed lines feed S5 and S8 now. S7 must land before M1's first golden. Enceinte's staged fields (kernel's model/src/schema/staged.ts lists 38 M1 fields) and gate M9's `heightCm`/`deckCm` plus `baseCm` (GCHK:363-386) persist from M1/M2a. Reopens M1 goldens and M2a logs (wall/gate ids). |
| :839 | S2 roster → M1 | synthetic demand (C-0035); default shares (C-0049) | A clean input seam, but its outputs fan out to S5d, S6, fields and S7b, and on to the households/plots that M2a edits reference. Reopens M1 (and M2b tuning). |
| :840 | S3 (1),(2),(8),(10)–(13); polycentric; F-SITE nuclei → M1 | the S3 slice (C-0032) | Macro layout that every stage reads. V14 adds `worldSite` to S3's Destination/Reservation (V14:256-294) as an append. Reopens M1. |
| :841 | S1 coast, islands, harbour, bank classes, oasis, geology, `Terrain.mining` → M1 | C-0048 (staged geology/mining) | "Terrain.geology and the relief class are in the first golden" (SCOPE:99). The golden suite runs 4 water settings (SCOPE:61). V04 and V13 read these fields. Reopens M1 goldens and later. |
| :842 | deck strip, extra bridge, rest of F-ROUTE → M1 | span through `deck_end`; Bridge `built` (C-0076) | Bridge states and `deckCm` (the M9 gap) persist. V04 and V14 read bridges. Q7/Q8 show the span is fragile. Reopens M1/M2a. |
| :843 | S7b, S9, S10, S10b, S11, S12a–c, S13a, S14 → M1 | `corridorUnion`; Block/Frontage written by S8 | The town's content: every M2a edit and every M2b, V01, V02, V03, V04 and M-ENC (INDEX:134) reader depends on it. S12's milestone conflicts (SCOPE:25). Reopens M1 and M2a. |
| :844 | `.plat`, zod, unit lint → M1 | arena block (C-0037) | The first persisted container. K10 versions and K14 re-key (GCHK:183-199; GATE:30); L16/Q76 stale stamps after compactSlots (FQ:152, :90). Nuance: an M1 document is regenerated from its recipe at M2a (SCOPE:69), so what really compounds is the recipe and manifest. Reopens M2a load verification and M3a migration. |
| :845 | derivation pool, sizes 1–3 → M1 | pool-size-0 path; `pool: notBuilt('M1')` (kernel/src/facade/kernel.ts:366) | Outputs must be invariant across pool sizes (five-engine digests, memory at pool 0 and 3: SCOPE:155). It replaces the O(arena) per-batch image before S10/S11 at CITY (DEFER:189; L2 FQ:138). Reopens M1 perf and every golden if the merge order leaks. |
| :853 | neighbour steps, SeamContract → M5/M1 | minimal Seam with baseLane portals (C-0046) | M1 must write a complete SeamContract on every district (SCOPE:62, :144). M5 close-ups read the seams of documents saved during M2a–M4. Reopens M1 plus a seam migration of saved documents. |
| :856 | waterfront policy, quay/sea gates, open chains, moats → M1; fixed-place law → M3a | basic river water gate (C-0087); layout/src/enceinte/trace.ts:125-126 and closure.ts:34 `notBuilt('M1')` | Water-gate ids `gate:w<i>` collide across enceintes (layout/src/growth/boundary.ts:443; C-0244). The id scheme must be settled before ids enter M2a logs. The fixed-place law is isolated to M3a. |
| :861 | RH32, rendering, labels, exports, edits → M1–M3a | none (no hook) | Not a seam: new subsystems. RH32 keys the placement digests in the goldens; edits are the persisted log. |
| :862 | MilestoneRecord tooling, shift/cascade records, goldens → M1 | `M0-record.json` in exitCriteria shape (C-0042) | Every later milestone appends to these; the canonical text form is fixed once (DEFER:46, :109). |
| :864 | WASM accelerator / Clipper2-WASM → only on a measured miss | oracle adapter (M0-k-03) | Clipper2 would be "the only engine on every host … a declared golden shift" (M0:141-150). Decide before M1's first golden; J558 puts the decision before M1. |

**MIXED (8 rows):**
- :846 register `--check` → M1. Entries must exist at the landing milestone so later tuning appends history rows (V01-neighbourhoods.md:3413-3439; VSH V11-M1-2).
- :849 TradeFlow, `ringed`/`american`, suburb → M1/M2b. The presets and the suburb regime sit behind switches (layout/src/growth/legality.ts:146; proposals.ts:189), so they are isolated. How far TradeFlow reaches into the default preset is UNVERIFIED.
- :851 clear regions, prepared contacts, carves, S1 water operator, raised parts → M3a. Isolated `notBuilt('M3a')` paths (kernel/src/tx/tx.ts:88-89; insert/attractVertex.ts:107), and raised parts ride K2. But the carve edit needs the carve delta, which must be kept from M1 (gate M2, GCHK:280-296).
- :854 transient arenas → M6-P. The form is owner-less and never persisted (K9 confirmed at type level, GCHK:174), so it is isolated. readBack's outputs (promotion, stored-plan re-cuts) persist. The milestone is three-way inconsistent (see HEADLINE 4).
- :855 resolveVertexAt → M2a. A true stub now (kernel/src/facade/kernel.ts:215; CarryMap declared, C-0089). It becomes a persisted-log contract at M2a. Its type is not exported from the façade index (plat/docs/build/checks/M0-a-16-notes.md row 5).
- :858 full CrossingRecord, band-rule forms, C8–C10 → M1. The full record must be a superset of the minimal records in crossings.json (b).
- :866 deny-list scan → AFTER-M-1. A late hit re-authors M1 content rows (SCOPE clause 36: needs-M-1), which is a table bump and therefore a shift.
- :872 S11 frontage-band bar → M1. The S11 per-plot cost underlies M1 S11 and V02. A miss after goldens takes C-0098's ladder (M0:145-150).

**ISOLATED (19 rows):** :847 (in-Chrome re-measure), :848 (lots rows, measurement), :850 (stretch-state Write protocol → M2b), :852 (frame growth → M4), :857 (later ladder rungs), :859, :860 (underground fixtures; K2 CONFIRMED, GCHK:72), :863, :865, :867, :868–:871, :873–:877 (tests, tooling, CLI, reports).
- :850 is a true seam: `ChainProfile` admits Order values, sampling is `notBuilt('M2b')` (kernel/src/tx/profile.ts:225), and `Enceinte.condition*` is staged to M2b (staged.ts:50-52). It depends on M2a's cut/merge carrying knots correctly (INFERRED).
- :852 is isolated only if every document from M1 takes its lattice "at the cap", as the hook text says. K3 holds (GCHK:90); the code was not verified.
- :857: each new rung only turns a typed refusal into a commit on the affected seeds.

### C. Open queue rows tagged M1 or later (and a few untagged ones whose cost lands in M1)

| row | piece | tag | why it compounds | NO-SHIFT? |
|---|---|---|---|---|
| Q52 (FQ:66) | class E: S3 F-WALL E_SELF_INTERSECT, 4 lawful seeds | "E is M1's by the design's rung order" | Later wall rungs; shift only on those seeds | no |
| Q66 (FQ:80) | S5a refuses when a later trace crosses water while an earlier enceinte holds gates | `notBuilt('M1')` (boundary.ts:443) | (d) gate-id scheme across enceintes | not stated |
| Q79 (FQ:93) | `shape` role: into M0's tables or wait for M1 | M1 option | Role append is safe (K5 CONFIRMED, GCHK:111); the tx strip is kernel behaviour | n/a |
| Q90 (FQ:104) | kerb read's displaced run end: fail-safe refusal, closing later | HARDENING (M4) | (a,e), waits on Q89's level ruling | closing will shift |
| Q93 (FQ:107) | mint accepts a repeating live set | M4 | (d) guard only | effectively yes (my reading) |
| Q105 (FQ:119) | insertChain retrace forms 1–5, lawful refusals | notBuilt #3 (M4); ruling N-64 says the carry lacks proof | (d,e) | no (make-it-succeed) |
| Q116 (FQ:130) | coverage table gains V13 F-WORLD/F-GW/F-PLACE and V14 F-SITE† | later milestones | tests only, isolated | yes |
| L1 (FQ:137) | `exempt` parameter on placePoint | carried to M1's API pass | (a) API; "shifts insert.placementCandidates counts", and the work coefficients are fitted on counts | no |
| L2 (FQ:138) | per-batch arena image memory | measure at M1 | (e) | n/a |
| L13 (FQ:149) | ladder `mfcgSize` unit 'none'; a lane name inside data | M1's schema | (c) zod/table schema | n/a |
| L15 (FQ:151) | tools verdict changes | M4 tags | isolated | n/a |
| L29 (FQ:165) | growth/index.ts `export *` | API pass or M1 | (a) API surface M1 imports | no |
| L30 (FQ:166) | one `generatedLifecycle` builder (7 copies, Q87 FQ:101) | API pass or M1 | (c,d) lifecycle stamps on persisted records | n/a |
| KI-3 (KI:21) | consumer contract for a refused mandatory chain | M1's spec | (a) S7 and S9 consume insertChain | — |
| KI-4 (KI:31) | per-town refusal budget | M1's first towns | (b) | — |
| KI-5 (KI:22) | a non-LIFO removal leaves a split vertex | M2a / hardening | (d) replay exactness of the edit log | — |
| KI-8/9 (KI:25-26) | town vocabulary in kernel registries | extraction step | (c,d) roles persisted under ROLE_REGISTRY_VERSION | — |
| KI-11 (KI:28) | S6 makes 11/16 districts against N_d 7 | M1's towns | (d) district count drives ids, names, seams | — |

Untagged rows whose cost lands in M1 (my inference):
- Q89 (FQ:103): S8's cost route needs a level-discipline ruling (the L1/L2 band contract) together with C2. If it changes after M1 builds S9–S11, those stages and V04/V14 band users reopen.
- Q98 (FQ:112): b-05a's floor change from 30 to 37 m is a "declared shift" that can now land inside M1 (PROG:615).
- Q99 (FQ:113): the s6 table is not registered in the tables view hash. Recipe pins (ARCH:10858-10859) must cover every table from the first recipe.
- Q77 (FQ:91): a 2^53 tie becomes reachable at METROPOLIS scale, and METROPOLIS enters the M1 goldens (SCOPE clause 6).
- Q63/Q67 (FQ:77, :81): declared skeleton shifts (owner-vetoable); cheapest before M1's first golden.
- Q51 (FQ:65): API.md Appendix B is four names behind the barrel; M1's API pass starts from that frozen API.
- Q69/Q71/Q72 (FQ:83, :85, :86): NO-SHIFT performance rows that feed the C2 decision.

### D. What the volumes require of the base

Gate overall (GATE:13-52; GCHK:409-436):
- CONFIRMED: K2–K6, K8, K9, K13, M6 (kernel side), M8.
- PLAUSIBLE: K1, K7, M3, M5, M7, M9–M11.
- FAIL, carried to M1: K10, K12, M1, M2, M4.
- K11 was fixed in M0 by documentation.
- K14 is carried to M1 (Q80, FQ:94).
- **M12 and M13 are unchecked.**
- INTEG:192-198 maps the gate rows to file k items, labelled BASE at M1's API pass.

| volume (milestone) | requires of the base | already carried | still open |
|---|---|---|---|
| V01 (M5; early pieces at M1/M2b/M3a/M3b; V01:3381-3411) | `Block.content`/`overrides`, `HoodPlace` registry row, `DistrictContext`, `Recipe.product`, three concerns and `S8.seed`, the whole `hood.constants` row with register entries; complete SeamContract; M2b hook points and `Way.surface`; M3a `District.terrace`/`stepProfile`; anchor rule for `fabric.select` (V01:2081-2092) | `Block.content`/`overrides` (model/src/records/districts.ts:101, :105); `fabric.select`/`hood.dispatch`/`hood.template` (ids 76–78) and S7c/S9b/S8.seed reserved until M5 (registry JSON; CH:31) | `Recipe.product`, `HoodPlace` row; `DistrictContext` exists only layout-locally inside `FabricStrategy.partition`'s signature (layout/src/infill/bentCutFabric.ts:118-123, :184), which is Q86's duplicate-type pattern (a). The M5 way-name shift is declared by design (V01:3404-3411). |
| V04 (M6-U; V04:3194-3213) | multi-part arenas, `under<n>/` addresses, `sewer` concern, `Features.sewers` at S0 (SCOPE:95), anchor rows (§6.3), `levelledGroundCm` as the one reader, ground part 0 against raised parts; M4's hooks, M2b's solver and granularity law, M3a's edit system | K2; address prefixes (GCHK:259-278); `sewer` reserved until M6-U; tail stub (layout/src/pipeline/registry.ts:193) | the water-table function (gate M4); one-time ground shift at M6-U, declared (V04:3213); water readers provisional until M-W0h |
| V06 (M6-E; V06:195-231, :4269-4274) | lineage epoch lane; stage id in the stream key; epoch fold in the log; undo/checkpoints; run at an epoch; ConversionOps; Works/clock (M4) | the epoch lane (GCHK:259-268); `epoch.transform` reserved until M4; `notBuilt('M4')` (runner.ts:223) | everything at M2a, M3a and M4 |
| V12 (rig at M1; M-CAL; V12:80-113) | register at every exit from M1 (PR tier); table pins; declared shifts; full CrossingRecord; metricVersion; tuning only as table-version bumps (V12:28-31) | census (C-0070); M0 band forms; minimal CrossingRecord | the full record (M1); Q99's pinning gap |
| V13 (M-W0h after M4; M-W0..W5 after M-SF; V13:254-299) | K1, K3, K5, K6, K10, K12, K13; M1–M6, M8, M9, M11; `Recipe.charter`/`Document.worldRef`; hydro core lifted (BCR-V13-1); noise keyed by position on placed frames only (V13:2516-2546) | K3, K5, K6, K13 CONFIRMED; the world uses delaunay/dmath/rng/index/noise and no arena (PROG:454) | K10, K12, M1, M2, M4 carried; world.* concerns and W ids not appended; R1-1 (who records the import's markers) open (INTEG:119-140) |
| V14 (M-ENC after M1; M-SITE-A/F; M-25D; V14:256-294) | `site` Layer and `nextSitePart`; `passage` role; G/E/R ids and `site` concern; transient arena with a `view:<hash>` owner, one arena per scene (FILEU:189-203); K14; M7, M10, M11, M12, M13; VTT grid origin | K9 at type level; K2, K5, K6 appends tested | **`site` layer not appended** (K1 PLAUSIBLE: "no registry to append to", GCHK:413); K14; **M12/M13 unverified**; the transient arena's milestone |

### E. The host contract's compounding edges (HOST)

1. **The canon** carries travel effort, water access and site facts, and no geometry (HOST:19). It is frozen into the host's record and changed only by a receipted re-canonize (HOST:28, :81). Its schema is (c): a change needs every campaign re-canonized.
2. **Geometry version stamping.** Native records are stamped with the cost-law version and scale, valid within one geometry version, with reframe receipts across a change (HOST:65, :739). The host keeps "every geometry-1 record forever" (HOST:119). The map must bump the geometry version exactly (c,d).
3. **Trod ids.** Trods are keyed by host edge keys plus whole-number stations; bodies are placed by trod id plus a fraction (HOST:83, :85). Trod ids must survive world re-derivation (d).
4. **The events window key** switches from sequence to nonce mid-campaign as a declared shift. The plates must tolerate both keys (HOST:737).
5. **Seeds.** "A seed is a starting world, forever" (HOST:737), and the world seed is stored by the host (HOST:66). World generation must be versioned or deterministic for all time (d).
6. **Share codes** gain a geography-source axis (HOST:118); H14 inverts DR1's relief-class row (HOST:71), which locks in that vocabulary.
7. **Host field discipline.** Every row lands switched off, "absent, never null", and leaves output byte-for-byte unchanged when its data is absent (HOST:26, :39).
8. **The earliest host-shaped persistence is in the base at M1:** the dossier port's binding table and key law, `DossierDigest` (SCOPE:101), the fixtures frozen at fp-integration-2026-09-23 / 5d699cc68 (SCOPE:102), and `Identity.dossier`, which the leaf refuses until the M1 port (GCHK:343-352).
9. **What the map promises:** draw only host-stored, host-derived, placement or owner-ruled facts (anything else is `refuse.lens.invented`); offers only, acknowledged by `consumed`; door 1 closed to frame geometry (HOST:16-22, :719-731).

### F. Per milestone: what to settle within it, and what can pass

**M1**
- Settle within:
  - The address namespace choice, M1 (d). The salted-seed option moves no address (GCHK:272-278).
  - Append V13/V14 ids, the `site` layer and the `passage` role (VERD:287-293).
  - The manifest's version axes, K10 (c), and K14.
  - The recipe with table and pack pins (c; Q99).
  - Golden, shift and record formats (b).
  - The 38 un-staged record fields, including M9's `baseCm`/`deckCm`.
  - The `datumOf`, `waterTableCm` and one `s1()` accessors (a) (GCHK:298-330).
  - K12 before reason records persist; CommitRecord itself is never persisted (kernel/API.md:988).
  - The pool and its invariance across sizes (d,e).
  - C2 and the engine choice (e) (PROG:615).
  - Every stand-in replaced before the first golden: S1, S2, S3, S7, S9–S11, work coefficients, gate ids.
  - Sequence the first golden after the AFTER-M-1 table cells, or budget for the shifts.
  - Complete SeamContract; the dossier binding key law; register entries; the tombstone store (SCOPE:120).
- Can pass: presets and packs; the `plat` bin; later ladder rungs; B-EDGE sweeps and nightly contents; the transient arena's form (built at M-ENC SE0); the in-Chrome re-measure; hosted CI.

**M2a**
- Settle within: the edit-event schema and the one replay fold (every later edit kind folds into it); resolveVertexAt's log semantics; scoped re-derivation (`notBuilt('M2a')`, runner.ts:224) with matching and B-EDIT; the records digest joining the snapshot (SCOPE:69); undo/session semantics, which V06 and V13 reuse; KI-5.
- Can pass: tool idioms and panels (V09) over the log.

**M2b**
- Settle within: the stretch-state Write protocol (the first stored Order profiles); hook registration into hosts (layout/src/pipeline/order.ts:149), which V01's hook points need; the full granularity law and the placement solver (V04 and V14 G5 build on them); RoofSpec (V02); `Way.surface`; basement readers bound to the M1 water-table function.
- Can pass: tuned values (table bumps by design, V12:28-31); `lit` and ink's close-up looks.

**M3a**
- Settle within: retention of N−1/N−2 (it makes every later shift cost a chunk); migration and upgrade as undoable events; the embedding API and host bridge/`DocResolver`, which M-SF, V10, V13 `forkAt` and V14 `PlatApi.encounter` extend; clear regions and candidate (c); S1's water operator and the carve edit (V13's cascade); raised ground parts and `levelledGroundCm`; stored renames; overrides keyed to row hashes.
- Can pass: the tables editor UI; drawn-constraint UI.

**M4**
- Settle within: output version 1; the one incremental path (byte-identical survivors, epoch components), which carries V06, V07 and V13 time; frame growth; Works/clock hooks; V04's hooks (records, tools, closure rule, basement row); Q90, Q93, Q105; a-16's writer stamping (M0-a-16 notes row 2).
- Can pass: device-tier presentation; release notes.

**M5**
- Settle within: W15's services `fabricSignature`, `districtsAbove` and the opening pass, which V04 U3/U4 and M-SITE-A consume (V04:3196-3200; ARCH:21724); seam amendments in saved documents; the three reserved concerns start drawing; `HoodPlace` producer ids; the declared way-name and default-map shift.
- Can pass: `hatched` styling; NG-preset values.

**M6-P**
- Settle within: stored plans and re-cuts; the damage layer keyed by `plan.damage` (reserved until M6-P); storey and stair links with `{fromCm, toCm}` (gate M10); it is the second reader of M-ENC's transient-arena form and must not change it.
- Can pass: drawing styles.

**M6-U**
- Settle within: underground part ids and `under<n>/` addresses, which V06 and V14's site↔underground links use; AccessPoint records, which V14 reuses; the tail phase; the declared ground shift.
- Can pass: style rows, labels, light tuning; the water readers, which switch at M-W0h by design.

**M-SF**
- Settle within: the binding table and key law, `Identity.dossier` refs, host persistence, the port and seat binding that M-W0..W5 ride on (HOST:139-140).
- Can pass: VH (with the village); host screen re-pointing (H19); lens presentation.

### Where I inferred rather than read, and caveats in both directions

- The 13/8/19 split of the 40 §4b rows is my own classification.
- **TradeFlow** (:849): its reach into the default preset is unverified.
- **The lattice "at the cap"** (:852): taken from the hook text only, not verified in code.
- **a-16's "two public-API rows"** were not identified with certainty. The candidates are rows 5 and 7 of checks/M0-a-16-notes.md.
- **Reasons the compounding is weaker than it looks:**
  - Staged fields force later writers to fill them (staged.ts:1-4).
  - The registries are append-only (CH:31; GCHK:111, :134), so V13/V14 appends are isolated.
  - Before M4 a shift costs a declared record, and M1 documents regenerate at M2a.
- **Reasons it is stronger than it looks:**
  - J558 lets the AFTER-M-1 table rewrites land inside M1.
  - Three texts disagree on the transient arena's milestone.
  - Gate rows M12/M13 have no check evidence.
