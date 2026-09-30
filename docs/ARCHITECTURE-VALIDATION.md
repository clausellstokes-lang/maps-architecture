# ARCHITECTURE-VALIDATION — the red team's findings against `docs/ARCHITECTURE.md`

Sections §1 onward belong to the Revise / red-team lanes of workflow 03. §0 is written first so every validator knows
the document's history before attacking it.

## §0 Provenance and completion (ARCHITECTURE-finish seat, 2026-09-25 15:08 EDT)

**How `docs/ARCHITECTURE.md` came to be.** The ARCHITECTURE synthesis seat (chief architect, Fable 5.1, workflow 03
run `wf_e306f20c-a9f`) wrote `docs/design/judging.md` (complete on disk at 13:29) and `docs/ARCHITECTURE.md` §0–§15,
checkpointed the file at 13:26 EDT on the coordinator's order, then continued and wrote §16, §17, PART II, PART III,
the delegated decisions, the judgment calls, the deferrals and Appendix A before a usage limit ended it at about
13:28. No LANDED line was written. The checkpoint heading and its DONE / REMAINING list stayed in the file.

**What the ARCHITECTURE-finish seat did (this section's author).** It read `docs/ARCHITECTURE.md` (2 224 lines),
`docs/design/judging.md` (226 lines) and the SPEC block plus the GROUND paragraphs of
`workflows/03-assess-design-validate.js` in full — and nothing else: no proposal, judge, findings, confidence or
capture file. Everything it changed is therefore consistency and completion work reasoned from those three texts;
it introduced no new evidence and no new reference number.

*Verified complete (read, not asserted):* §1–§15 against SPEC items 1–15 and the owner's PRODUCT SCOPE, PLOT MODEL,
PLOT GRANULARITY, PROSPERITY, GREENERY, EVOLUTION, CITY ADD-ON LAYERS, ASSIGNMENT HOOK and ADOPTED DEFAULTS
paragraphs; §16 (M-1, M0, M1–M5 with executed exit criteria, the effort range with its basis, the riskiest items in
order, the out-of-scope list), §17 (clean-room rule, licence table, allowlist), PART II (II.1–II.5), PART III (one
page, no design), the 22 delegated decisions (the owner's seven adopted defaults are D-1–D-7, each FINAL), the 18
judgment calls, the deferrals and Appendix A. The post-checkpoint sections are at the depth of §1–§15, not stubs.

*Repaired:* §0.4 pointed the sky context at PART II §II.4 (it lives in II.1 rule 5); II.1 used `SeamReport` and
`Pin` without defining them; II.5 claimed "four `FabricStrategy` registrations from M1 (D-15)" — the base registers
`BentCutFabric` at M1 and the three templates at M5, and the graft is G-P2, not D-15; the improvement matrix cited
§7.1 for proxy thumbnails, which no section designed (now a bullet in §7.8 and the pointer corrected).

*Added:* D-23 (deterministic maths through `dmath` plus the lint), D-24 (per-stage goldens with the declared-shift
record), D-25 (exactly one incremental path in the base); the stage-2 acceptance line in II.5 read from
`SeamReport`; CityJSON in the deferrals; a §16 sentence on why M-1 and M0 precede the viewable town; wording notes
on *plot* versus *lot* (§2.5) and on *layer* versus toggle groups (§2.1); Appendix A.4; §0.6 (the completion record
that replaced the checkpoint block); the status line now names both seats.

*Changed in `docs/design/judging.md` (eight pointers, all into ARCH):* G-P6 lands in §6.5 not §6.4; G-P9 lands in
§2.9, §6.4, §7.5 not §6.3; G-P10 lands in §6.2, §6.5 not §6.4; K-5's answer named the plots stage "S8" (ARCH S10)
and summed CITY p50 to ≈ 240 ms (ARCH §12 sums to 252 ms); the sequencing-gap answer said "S6b" (ARCH S8); the
budgets answer said "S9" for site plans (ARCH S11); the fusion-fallback answer pointed at §4.5 (it is §4.4); the
effort answer said ≈ 100–140 (ARCH §16 states ≈ 100–130 inside the judge's 100–140). Nothing else in judging.md was
touched.

**What the red team should weigh.** (1) Every mechanism, constant, budget and estimate in ARCH is PLAUSIBLE by its
own §A.3 until M-1 / M0 measure it. (2) The least-reviewed text is what the finishing seat added — D-23–D-25, the
`SeamReport` / `Pin` types, the §7.8 thumbnail bullet, II.5's acceptance line — and the sections the synthesis seat
wrote in its last minutes after the checkpoint (§16, §17, PART II, PART III, the decision and judgment tables); they
were verified by one reader, not by a second architect. (3) The CITY budget headroom (§12: 252 ms p50 against
300 ms p95) is thin and ARCH says so. (4) The document's own deferrals list is the authoritative "documented, not a
bug to re-find" list; a finding that re-raises one of them should say why the deferral is wrong, not that it exists.

CONFIRMED in this section: the file history above (mtimes, the checkpoint heading's own text, the absence of a LANDED
line, the line counts) and every repair listed (each executed and re-read). PLAUSIBLE: that the post-checkpoint
sections are at full depth — a reading judgment by one seat.

## §0.M Manager notes for the revision round (2026-09-25, main session on Opus 5.5)

> PENDING FABLE REVIEW — written by the main session on Opus 5.5 (the manager role is Fable's); queued as A-M1.

Evidence that landed after the red-team lenses were briefed; the reviser must take it into account.

1. **MFCG export units (J19).** MFCG's GeoJSON export is in METRES; only its SVG uses 4 m units (road width 8 in the
   JSON vs 2 in the SVG, exactly 4×; consistent with the MFP-8 area check). Recompute every figure in
   `docs/validation/redteam-mfcg.md` MFP-5 (building counts per size, time per building) from
   `captures/mfcg/exports-sweep-2026-09-25/README.md`: seed 555001, no river/coast — size 40 ≈ 1 475 buildings on
   58 ha walled, size 80 ≈ 5 242 on 220 ha, size 130 ≈ 13 091 on 548 ha, ≈ 22 buildings per walled hectare from
   size 40 up; size 200 with river + coast ≈ 53 900. If MFP-5's 13 000–36 000 at size 80 came from a city with
   shantytown/sprawl options, say so; otherwise correct it.
2. **Acceptance-test size mapping (J20).** TOWN = MFCG size 40, CITY = size 80, METROPOLIS = size 130 (matched on the
   architecture's rung building counts: 1 200–1 500 / 4 500–6 000 / 12 000–15 000). The architecture's TOWN timing bar
   cites MFCG size 25, which has only ≈ 411 buildings — re-anchor the per-rung speed bars to sizes 40/80/130 and the
   measured cost law (≈ 19.5 ms + 7.5 µs per building, profile-mfcg Explicit-gates addendum). FTG can only be compared
   at city size until the owner rules on O1 (paid FTG account).
3. **Bent-cut recipe not yet in §4 (queue B12).** Adopt, as the measured default for bent cuts: the start point at a
   fraction of the parent face's OBB MAJOR axis drawn from ≈ N(0.5, 0.09) (plain faces ≈ 0.066, ring faces ≈ 0.098);
   the start side a coin flip; perpendicular departure; the far side = the side hit by the perpendicular ray (66 %);
   the corner at mid-course; rounded (equal-chord arc) vs sharp ≈ 53 / 47; junction ends stop half the crossed road's
   width short; width = a + b·length with a per-seed intercept. Source: `research/findings/profile-neighbourhood.md`
   §§ Bent-cut geometry / parent-face / prediction / anchor (all pending Fable review).
4. **Village build change.** The Village Generator's palisade is built BEFORE roads on build 19365073 (New-build
   addendum, queue B08) — relevant only to PART III (village readiness).

## §R1 Fix-all round 1 (2026-09-25): every item's disposition, the former deferrals, and the changelog

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r1)

*In plain words.* The owner ruled "I would prefer if there is no defer and everything is fixed as soon as possible."
Every problem the red team, the coverage audits, the owner's late rules, the manager's notes and the old deferral list
raised — 299 items — was given to the area of the architecture it belongs to; each area rewrote its sections, and one
integrating seat merged the five rewrites into `docs/ARCHITECTURE.md` and settled the points where two areas disagreed.
The table below says, for every item, what happened to it and where the fix now lives: **FIXED** (the architecture now
contains a mechanism that defeats the failure), **INVALID** (the finding was factually wrong — none were), or
**STAGED-BY-OWNER** (the subject belongs to a later stage of the owner's own roadmap, and the architecture now carries
its concrete hooks). Nothing was deferred. All six seats were opus stand-ins for Fable seats; the work is queued for
Fable review.

Sources: the area drafts `docs/validation/fix-all/r1-{kernel,determinism,pipeline,rendering,scope}.md` (each item's full
mechanism is in its owner's draft), the master list `docs/validation/fix-all/index.md` / `index.json`, and the
integration record `docs/validation/fix-all/r1-integration-log.md` (conflicts C-1–C-22).

### §R1.1 Disposition of every item handled in round 1

**Counts:** 299 items — **282 FIXED** (8 of them duplicates fixed with their primary), **17 STAGED-BY-OWNER**, **0 INVALID**,
**0 deferred**. By owner area: kernel 21, determinism 47, pipeline 128, rendering 64, scope 39. By source kind: 9 blocker,
97 major, 57 minor red-team findings; 108 coverage items (96 audit gaps and 12 caveats and corrections); 7 owner
amendments; 4 manager notes; 17 deferrals. Rows are grouped by owner area, in the master list's order; "where" lists the
owner's sections and, after "also", the sections other areas changed for the item; a trailing "integration C-n" names the
conflict resolution that shaped the final text.

| id | source | severity / kind | disposition | where in ARCHITECTURE.md | one-line reason |
|---|---|---|---|---|---|
| GEO-1 | redteam-geometry | blocker | FIXED | §2.2 (rules 1–3, 6, 8), §2.3, §3.1, §3.4, §3.6, §3.10; also §5.3, §13.1, J-6, D-13, §12 memory | one arena per `PlatKey` with level-tagged edges and per-level face records ("levels are views"): nesting holds by construction and is checked by index; a finer vertex on a coarser edge is a Steiner vertex ≤ 0.71 cm off, excluded … |
| GEO-3 | redteam-geometry | major | FIXED | §2.2 (`LatticeSpec`), §3.1, §3.2 (2), §3.6; also §5.2 F-NUM, D-19, §15.2 O4 (e) | vertex, segment and stretch attraction at 26 cm replaces the 5 cm weld, so the 5–25 cm dead band cannot occur (measured: 0 edges below 25 cm); mandatory chains cannot fail for a precision reason; optional chains keep "reject" |
| GEO-4 | redteam-geometry | major | FIXED | §2.2 (`RoleTable`, rule 7), §3.6, §3.10; also §2.4 edge-type paragraph, §13.1 fixtures | a `(role, entity)` set per edge and vertex from a role registry; shared stretches merge roles, never duplicate or overwrite; `absorbSliver` never deletes an edge carrying a structural role |
| GEO-5 | redteam-geometry | major | FIXED | §2.2 (rule 5, reference types), §3.4 (`resolve`), §3.9; also §2.4–§2.7, II.1, §7.1, §14 `Scope` | no entity, contract, event or scope stores an arena slot; geometry is reached through the kernel's role and owner reverse indexes (`ChainRef`, `EdgeSetRef`, `VertexRef`, `FaceRef` as views), so nothing can go stale; persisted … — integration C-6: pipeline schemas and II.1 converted to kernel views and lattice points |
| GEO-6 | redteam-geometry | major | FIXED | §3.4, §3.6; also §11 GeoJSON | contact semantics for `splitFace` (endpoints only; interior contact is `E_NOT_TWO_CROSSINGS`; antennae count as boundary), `connectHole` for slits, left-child rule, antennae dropped from exported rings |
| GEO-7 | redteam-geometry | major | FIXED | §3.1 (OBB row, `KernelError`), §3.2 (7)–(8) | one OBB contract (`E_DEGENERATE`, never ok-with-zero-extent); `snap` rejects `!(Math.abs(v) < 223)` in every build; `ratio()` for computed divisors, linted |
| GEO-8 | redteam-geometry | major | FIXED | §3.1 (skeleton row), §3.8; also §5.2 F-SKELETON | doubles with + − × ÷ √ only, 1 mm / 1 cm coalescing, id ties, event work limit; exact OBB roofs for near-rectangles; a four-part validator gating every output; typed downgrades |
| GEO-9 | redteam-geometry | major | FIXED | §3.1, §3.7; also §1.7, §5.4, §13.1, §14, §17, D-14 | one engine on every host: booleans, buffers and bands built on the kernel's own arrangement; Clipper2 and `polygon-clipping` are CI oracles only; an engine change is a version bump with a declared golden shift — integration C-8: §12.4 S9 row and §11.2 engine clause aligned |
| GEO-10 | redteam-geometry | major | FIXED | §3.1 (curves row), §3.4 (`warp`), §3.6; also §7.1, §7.4 | whole-step move validation (incident edges, swept triangles, clearance), global deterministic halving; warp = a displacement field over every level ≥ `fromLevel`, moving shared vertices once; Steiner vertices re-seated |
| GEO-11 | redteam-geometry | major | FIXED | §3.3; also §7.2, §7.3 | a batch's ops are applied in a canonical order (kind, entity id, stream index), so attraction is deterministic; the interactive path for drawn constraints is the replay path; the oracle is restated |
| GEO-15 | redteam-geometry | major | FIXED | §2.3; also §4.2 S1, §13 fixtures | heights `Int32` cm relative to a per-document datum, range-checked with clamp-and-report (never wrap); two-gradient flat resolution into its own array; fixed D8 tie order |
| GEO-20 | redteam-geometry | major | FIXED | §3.4, §3.7; also §4.6, §4.7 S9, §13.1 | the kerb defined once, `kerb(F) = F − ⋃ buffer(spineᵢ, hwᵢ)`, committed by `corridorUnion` (= `bandUnion` with corridor roles); S8 cuts the committed blocks; the half-plane path only for uniform convex insets |
| GEO-32 | redteam-geometry | minor | FIXED | §3.1 (predicates row), §3.2 (6); also §2.1 | `area2` exact integer (bbox-relative terms, ≤ 1 024-term double partials flushed to BigInt); orientation only from `orient2d` at the lowest-leftmost vertex |
| GEO-35 | redteam-geometry | minor | FIXED | §3.2 (2), §3.6, §3.10; also §5.2 F-CORRIDOR, §5.3, §15.2 O4 (e) | one `minEdge` for every writer (booleans, buffers, offsets, smoothing and warp all go through `insertChain` or `warp`), checked by the invariant at the same value; face floors are width and area |
| SCL-2 | redteam-scale | blocker | FIXED | §2.2 (`LevelIndex`), §3.1 (index row), §3.3; also J-7, §13.2 | static packed indexes rebuilt only at stage end (per district partition at L2–L4), a dynamic uniform grid inside stages, count-based rebuild while editing, id-sorted query results |
| SCL-22 | redteam-scale | minor | FIXED (dup of GEO-9) | §3.7; also §5.4, §11 embed contract, §12 S9 | there is no runtime fallback left to budget; the report names the engine; the pre-decided M0 fallback (Clipper2-WASM as the only engine) makes WebAssembly an embed requirement instead of a second path — integration C-8: the 2.5× boolean-fallback budget withdrawn from §12.4 |
| COV-VG-VN-156 | coverage-audit-vg | coverage (low) | STAGED-BY-OWNER | §3.2 (9); also §4.2 S0, §12 frame column, D-19 | the base hook is concrete now: `Frame` = width × height from the rung's area and an `aspect` blueprint parameter (0.5–2); the range bound is derived at the extreme aspect — integration C-16: range bound re-derived at the population cap (≈ 6× headroom) |
| COV-VG-WC3 | coverage-audit-vg | coverage (low) | FIXED | §3.1 (Poisson row) | the ragged wood edge comes from thinning stamped blue-noise tiles by the domain-warped density noise; the sampler is not warped |
| DEF-2 | ARCHITECTURE | deferral | FIXED | §3.7; also Deferrals, D-14, §16 M0 | decided now: booleans and buffers on the arrangement; the M0 bars that confirm it; pre-decided fallback Clipper2-WASM as the single engine |
| DEF-3 | ARCHITECTURE | deferral | FIXED | §3.8; also Deferrals, D-14, §17 | decided now: in-house skeleton under the numeric contract and validator; the M0 bars; pre-decided fallback = the two downgrades become the default paths |
| DEF-13 | ARCHITECTURE | deferral | FIXED | §3.7; also Deferrals, §1.7, D-4, §16 out-of-scope list | decided now: no WASM kernel; M0 per-op bars; pre-decided fallback = a byte-identical WebAssembly accelerator for a missed hot loop only, the TypeScript loop kept on every host |
| GEO-2 | redteam-geometry | blocker | FIXED | §5.1, §5.2, §5.4, §6.2, §6.5, §7.8 [§3.1, §4.1, §12, §13.2, §14] | every output-affecting budget is an operation count (`E_WORK_LIMIT`, F-WORK); wall clock lives outside model packages and only schedules lazy work (F-BUDGET-TIME, reporting and scheduling only); CI time-dilation run ×10 / ×0.1 … |
| GEO-31 | redteam-geometry | minor | FIXED | §6.5 [D-23, §14] | the lint becomes an allowlist of exact `Math` members; `` only with literal exponents 0–4; the same scan runs over every vendored dependency with a pinned-version audit record |
| GEO-33 | redteam-geometry | minor | FIXED | §7.1, §7.2 | strokes resampled to ≥ `minEdge` with a topology check at the authoring boundary; `drawWater` takes add rings (unioned) and subtract rings (land brush); `drawBoundary` snaps to whole L1 cells |
| GEO-34 | redteam-geometry | minor | FIXED | §2.1, §6.3 [§3.6 (5), already carried by the kernel] | anchors matched with per-kind hysteresis radii (building 0.5 m) by nearest match and id tie-break; on-edge rule: the face left of the directed cut keeps the id; fixture ≥ 99.9 % ids kept under 1 cm perturbation, fallback decided |
| GEO-41 | redteam-geometry | minor | FIXED | §7.7, §7.8 | continuity and monotonicity stated over 50 seeds × 21 steps with a fixed formula for ε; expansion rows made continuous (fractional `joinMax`, smoothstep avenue probability) |
| LC-1 | redteam-lifecycle | blocker | FIXED | §2.1, §2.8, §2.9, §6.1, §6.3 [§3.4, §4.1, §11, §14] | address id (opaque, `kind:token`, token = hash of the lineage key, never reused, tombstones) separated from the lineage key (stream identity); survival keeps both, succession hands only the address to the anchor-matched … — integration C-10: stored stream keys removed from the entity schemas |
| LC-3 | redteam-lifecycle | major | FIXED | §6 plain words, §6.3, §6.4 [one-page, §13.3, §15.2 O2, D-15, D-24] | the promise restated to its true scope; stage-isolated goldens run new stage code on frozen upstream outputs; end-to-end goldens re-signed only with a cascade record |
| LC-4 | redteam-lifecycle | major | FIXED | §7.1, §7.3, §7.8 [§15.2 O2 (c)] | every control records its consuming stage; Adjust is local only at S10+ or with a spatial scope; earlier parameters run as "Re-derive from stage k" with a confirmed edit-fate report |
| LC-5 | redteam-lifecycle | major | FIXED | §5.1, §6.1, §7.1 | `reroll` (user, absolute per scope entity, stored in the event) and `attempt` (ladder, restarts at 0 per reroll, same cap) are separate key components |
| LC-7 | redteam-lifecycle | major | FIXED | §5.2, §7.3 [§4.2–§4.8] | a local operator per coarse stage (S1 water and terrain, S4, S5, S6, S7) with pinned boundaries; F-REDERIVE repairs plots and footprints that the new coarse geometry invalidates, by events; otherwise the edit is declared … |
| LC-8 | redteam-lifecycle | major | FIXED | §7.2, §7.3, §7.4 | an edited attribute implicitly pins the attribute and the entity's existence; the dry run lists every protected entity in the effective scope with its fate (kept / carried / orphaned / discarded); overrides never move by id alone |
| LC-9 | redteam-lifecycle | major | FIXED | §5.2, §7.7 [§4.2 S0, §4.7 S10] | precedence lock > assignment > drawn geometry > rules; blueprint assignments become `assign` events at log positions 0…k; re-solves place only unmapped members around fixed points; epoch rule stated |
| LC-10 | redteam-lifecycle | major | FIXED | §2.9, §7.2, §7.4 [§14] | one replay semantics, an ordered fold; a drawn constraint re-runs its class's local operator at its log position, the same code path on screen and on replay; hoisting survives only as an explicit rebase |
| LC-11 | redteam-lifecycle | major | FIXED | §2.9, §7.1, §7.4, §7.5 [§4.11, §16 M4] | `{t:'epoch'}` is an EditEvent in the ordered log; `EpochRecord` is derived from it; undo, replay and upgrade treat epochs like any event |
| LC-13 | redteam-lifecycle | major | FIXED | §2.9, §7.1, §7.5 | a `rebase` event makes the chosen state the document's base and records that it is not seed-reproducible before it; edits wait until verification finishes or the user chooses |
| LC-14 | redteam-lifecycle | major | FIXED | §6.4, §7.5 [§16 M3, D-21] | migration maps entities by kind, anchor, class family and overlap; an orphaned lock re-imposes its last geometry; the upgrade is an undoable event; retention: output versions N−1 and N−2 ship as lazy browser chunks, every output … |
| LC-15 | redteam-lifecycle | major | FIXED | §2.9, §6.2, §6.4, §7.6 [§11 permalinks row] | the canonical recipe holds every model-affecting input (preferences folded in at creation); the permalink carries the compressed recipe and log or refuses and offers a file; `&doc=` only with a configured resolver |
| LC-21 | redteam-lifecycle | minor | FIXED | §2.8, §7.4, §7.6 | provenance cites consulted table slices by hash (row, weight vector, bracketing pair, threshold set, match predicate); invalidation on slice-hash change; predicate tables fall back to "Re-derive from the first reader stage" |
| LC-22 | redteam-lifecycle | minor | FIXED | §7.1, §7.6 | table, preset and style edits are row operations addressed by stable row key with the base row's hash; a changed or missing row is an orphan, reported |
| LC-24 | redteam-lifecycle | minor | FIXED | §2.9, §5.4 | the log is the single source of truth; locks, epochs, report and statistics are derived caches outside the canonical form and the digest; timings are session telemetry, never saved |
| LC-25 | redteam-lifecycle | minor | FIXED | §2.8, §6.2 | the model digest covers model content only; version stamps, rule slices, derivation inputs and deps form a separately hashed provenance block |
| LC-26 | redteam-lifecycle | minor | FIXED | §2.8 | one existence state plus orthogonal flags (locked, pinned, edited, assigned, with attribute paths) |
| LC-27 | redteam-lifecycle | minor | FIXED | §7.2, §7.4 | field strokes are a list composited once and clamped once, undo removes a stroke; a warp replays as its operation at its log position, per-vertex displacements are a verification record only |
| LC-28 | redteam-lifecycle | minor | FIXED | §2.9, §6.1, §6.3, §7.5 [§11] | Enter = a new document with seed + 1 and the same recipe without edits, locks, assignments or salts, with a warning; `docId` minted at creation, re-minted on clone, prefixed at the API boundary; a newer schema opens read-only … |
| LC-29 | redteam-lifecycle | minor | FIXED | §2.1, §6.1, §6.3 | layer and island are components of every lineage key and prefix non-ground addresses; the distinct-key test adds a sky-island fixture |
| LC-30 | redteam-lifecycle | minor | FIXED | §2.9, §7.7, §7.8 | proxies are the town's own S0–S4 run under deterministic work budgets, checked by digest when picked; "Surprise me" draws from the `intent.surprise` stream and writes the intent into the recipe; the entry mode is a recipe field |
| LC-31 | redteam-lifecycle | minor | FIXED | §2.9, §6.5, §7.1, §7.6 [§11, §14] | every bridge command maps one-to-one to a logged EditEvent; host tables arrive as `editTable` / `editPreset` / `setStyle` events copied into the log with provenance `host`; a host provider passes a double-run check and its … |
| SCL-1 | redteam-scale | blocker | FIXED | §5.3, §6.2 [§3.3, §13.2] | every invariant has a scope (batch-local, stage-end, save, CI-only); the model hash is a Merkle digest maintained along dirty paths; per-edit validation cost flat TOWN → METROPOLIS ± 20 % |
| SCL-5 | redteam-scale | major | FIXED | §2.8, §7.4 [§2.5, §12] | whole-document snapshot ring replaced by scoped undo records O(scope) and cost-driven checkpoints; provenance stored as columns with interned stage runs and u32 deps |
| SCL-11 | redteam-scale | major | FIXED | §2.9, §5.4 | fields are recomputed on load, never persisted; geometry persisted once (one vertex store, each level's own chains only, inherited boundaries never repeated); only ladder keys are recorded; a document-size test per rung |
| SCL-12 | redteam-scale | major | FIXED | §6.1 | stream keys mixed from structured components (entity key cached at mint, u16 stage and concern ids, reroll, attempt, epoch, salt) with no string built; ≤ 0.1 µs per key measured at M0, output-neutral fallback decided |
| SCL-16 | redteam-scale | minor | FIXED | §7.8 [§12] | six proxies < 1 s at TOWN (O16 (e) restored); progressive proxies at CITY (≤ 250 ms each) and METROPOLIS (≤ 500 ms each) |
| SCL-20 | redteam-scale | minor | FIXED | §2.8, §2.9 | lifecycle history moves to an append-only event block keyed by id; tombstones move to an archive outside the working set and indexes; a 20-epoch growth budget and test |
| VIS-11 | redteam-visual | minor | FIXED | §5.1, §5.2 [§2.6, §3.1, §13.1] | the roof downgrade is a plain roof (no ridge or hip lines); hip-from-OBB only where the footprint is its own OBB; a fixture asserts no roof line outside the footprint |
| MFP-12 | redteam-mfcg | minor | FIXED | §7.8 | a "features" checkbox strip (plaza, temple, shanty town, farms, greens) counted as one basic-panel control; "Surprise me" becomes the seed control's button so the panel stays at 12 |
| FTG-21 | redteam-ftg | minor | FIXED | §2.9 [§11, §12] | snapshot contents stated (every level's own chains once, entity columns, no provenance, no field rasters); ≤ 320 B per building gzipped at CITY against FTG's 212 B, with a lossless pre-decided fallback; the compact twin stores … |
| COV-MFCG-L03 | coverage-audit-mfcg | coverage (low) | FIXED | §7.1 | every MFCG warp tool mapped to a named kernel with stated semantics (Displace, Liquify, Relax, Bloat, Pinch, Equalize; Rotate as a whole-map view rotation; Measure is the ruler, not a warp); staged Apply / Discard |
| COV-VG-VN-008 | coverage-audit-vg | coverage (low) | FIXED | §6.1, §7.1 | `rerollLayer(concern)` advances a per-concern salt for non-geometry concerns (naming, labels, instances, crowns, style jitter) |
| COV-NG-XA36 | coverage-audit-ng-shared | coverage (low) | STAGED-BY-OWNER | §2.8, §7.1 [§2.6, §4.11, §8.2] | hooks now: existence states `abandoned`, `decayed` and `ruined`, conversions `abandon` / `decay` / `ruin` / `clear` / `rebuild` usable by hand in the base; the evolution engine decides when (owner's later stage); the ruin paint … |
| COV-NG-CR02 | coverage-audit-ng-shared | coverage (medium) | FIXED | §2.9, §7.1 | (duplicate of COV-MFCG-L03) Rotate turns the whole map about the frame centre as a view key; the compass is decoupled (true north by default, free on request) |
| COV-FTG-C12 | coverage-audit-ftg | coverage (low) | FIXED | §7.1, §7.2 | locks take attribute paths; a person scope regenerates with its locked fields kept (relations and schedules excluded as non-local) |
| COV-FTG-C13 | coverage-audit-ftg | coverage (low) | FIXED | §7.1 [§11 query] | `setAttrMany` over ids resolved from a query at dry run (stored resolved, one undo step); person-search facets are a cross-area request |
| COV-FTG-M01 | coverage-audit-ftg | coverage (medium) | FIXED | §7.1, §7.4 | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `fill` events that act through the plot model, each with a lifecycle row |
| COV-FTG-M04 | coverage-audit-ftg | coverage (low) | FIXED | §7.1, §7.4 | `paint` (roof kind, roof and wall colour) resolved to ids under the brush; `paintGround` (style region); `treeBrush` expanding to greenery and `instance` events |
| COV-VG-VN-090 | coverage-audit-vg | coverage (low) | STAGED-BY-OWNER | §2.8 | (duplicate of COV-NG-XA36) the `ruined` existence state and the `ruin` conversion exist in the base schema; §8.2's `ruin` program draws it |
| COV-VG-WC1 | coverage-audit-vg | coverage (low) | FIXED | §6.1 | the "irreproducible" rationale corrected: the references' successors are reproducible per build but tied to its draw order; `seed + 1` stands on its own |
| AM-5 | AMENDMENTS-2026-09-25 | amendment | FIXED | §2.8, §7 plain words, §7.1–§7.6 [§0.4] | each clause of the owner rule mapped to a mechanism; the entity registry declares every type's edit kinds, undo path, persistence and migration hook, with a CI coverage test |
| GEO-13 | redteam-geometry | major | FIXED | §4.2 S1 (2); §5.2 (D-a) | Normal displacement clamped to 0.8 × local feature size; non-zero union repair keeps the anchor component, other loops typed; 10 000-outline property test |
| GEO-14 | redteam-geometry | major | FIXED | §4.2 S1 (2); §2.3 (K-a); §8 (R-d) | Vector coast authoritative, coastal cells ramped past sea level ± 10 cm, contours extracted per tile and clipped to land faces — no crossing possible, no abort path — integration C-12: drainage stays a raster query (kernel), contours clipped per tile |
| GEO-16 | redteam-geometry | major | FIXED | §4.3 | Routes unioned on the lattice with multiplicity, split at degree ≠ 2, merged on the graph, each chain smoothed and inserted once |
| GEO-17 | redteam-geometry | major | FIXED | §4.2 S1 (5); §4.3; §4.8; §2.7 Bridge | S1 emits pinned bank-to-bank decks perpendicular to flow; S4 routes to deck endpoints as fixed edges; F-ROUTE moves the site along its reach |
| GEO-18 | redteam-geometry | major | FIXED | §4.1; §4.4 S5a; §4.8 | Trace, gates and castle weld fixed in S5a before the stage's growth; topology-preserving simplification; last F-WALL rung cuts at the setback |
| GEO-19 | redteam-geometry | major | FIXED | §4.2 S3; §4.8; §4.11 | Harbour basins, moats and canals reserved and carved into L0 at S3, before S4; later carves go through the conversion path |
| GEO-21 | redteam-geometry | major | FIXED | §4.6 step 7 | Cut ends extended to the crossed spine and inserted as T-junctions (splitThrough); 'stop half a width short' is the renderer's stroke rule |
| GEO-22 | redteam-geometry | major | FIXED | §4.6 sides, steps 3–5 | Sides are runs within 10° cumulative turning; perpendicularity on run chords or a ± 5 m tangent window; start/far sides defined for any face via the minor-axis line at f |
| GEO-23 | redteam-geometry | major | FIXED | §4.6 step 8 | Reflex pre-cut and antenna split; always-succeeding clipped cut before substitution; substitution only for faces ≤ 2 × band area; residue reported ≤ 5 % |
| GEO-24 | redteam-geometry | major | FIXED | §4.7 S10 (4)–(5) | Blocks partitioned into per-frontage regions by the straight skeleton (reflex pre-cut fallback); strips never leave their region; property test |
| GEO-25 | redteam-geometry | major | FIXED | §4.6 deep-interior rule; §4.7 S10 (9); §4.1 | Back lanes and through-alleys decided and inserted in S8's district batch; S10 never writes L1 |
| GEO-26 | redteam-geometry | major | FIXED | §4.7 S11 row; §4.1 transactions | Row footprint = plot ∩ frontage band (boolean), one L4 batch per block, so party walls are shared edges on curved frontages |
| GEO-27 | redteam-geometry | major | FIXED | §4.11 | Built-face legality class in epoch growth: no crossing built faces except along plot lines or by declared demolish conversions; re-cut through the conversion path |
| GEO-30 | redteam-geometry | major | FIXED | II.1 rule (3); II.2; II.5 | Seam amendment: T-junctions on shared spines via splitThrough, recorded as new portals in both contracts; neighbour re-derives only corridor and wedge |
| GEO-36 | redteam-geometry | minor | FIXED | §4.2 S1 (3)–(4) | Knot offsets ≤ half the control spacing with a simplicity test; carve cap with F-RIVER re-trace; island only if branch separation ≥ (w₁ + w₂)/2 + min islet |
| GEO-37 | redteam-geometry | minor | FIXED | §4.4 S5c legality | Regime clearance applied to shores, wall setback bands, reservations and the stage boundary, not only parallel spines |
| GEO-38 | redteam-geometry | minor | FIXED | §2.7; §4.8; §4.11; §2.2 (K-d) | Bands, glacis, towers, gatehouses as per-side FaceRef unions; wallToWay clearance rule clips plots keeping ids where anchors survive |
| GEO-42 | redteam-geometry | minor | FIXED | §4.6 step 10 | Bent-cut continuation forbidden across district-boundary edges |
| LC-2 | redteam-lifecycle | blocker | FIXED | §4.1; §4.5 S7b; §4.7 S10a; §2.5; §6.2 (D-d) | Laziness contract; eager town-wide allocation (districts, then blocks) and two declared field passes; derived-complete hash CI over random district orders — integration C-18: S7b allocation row added to §12.4 |
| LC-6 | redteam-lifecycle | major | FIXED | §4.5 bands and brush; §2.5 FieldBands, DerivationRecord; §7.2 (D-g) | Cut points computed once from roster shares and recorded; hysteresis on the recorded band; relative strokes; re-derive beyond τ = 0.01 on session and replay |
| LC-12 | redteam-lifecycle | major | FIXED | §4.11; §2.5 DerivationRecord; §7.3 (D-h) | Survivors keep built state; field changes act only via rate-limited transformation events; Regenerate (keep) reads the recorded inputs — integration C-5: one DerivationRecord, in §2.8 |
| LC-16 | redteam-lifecycle | major | FIXED | §2.7 Person, Household; §10.3; §4.7 S10b; §7.4 (D-i) | Pins only by explicit edit; seen = view state; person key (household lineage, ordinal, birth epoch); ageing by epoch; people row in §7.4 |
| LC-18 | redteam-lifecycle | major | FIXED | II.1; II.4; II.5 | Refine close-ups are derived presentation data outside the hash; template replacement is a logged model edit; close-up edits are instance overrides — integration C-14: derived close-up until a logged closeup event |
| SCL-4 | redteam-scale | major | FIXED | §4.1; §4.10; §8.5 / §12 (R-d) | One-click first paint = complete city LOD (S0–S13 eager); laziness only below the city band; METROPOLIS preview replaced exactly once — integration C-2: no preview at any rung; the pool meets the first-map bar |
| SCL-13 | redteam-scale | major | FIXED | §2.6 BuildingGenerator | outline() (≤ 10 µs, every LOD) / compose() (lazy per tile, ≤ 1 ms) split; union contract test; stage-3 intake measurement with pre-decided fallbacks |
| VIS-8 | redteam-visual | major | FIXED | §2.5 PlotBound; §4.7 S11 table; §8 / §11 (R-b, R-f) | Boundary treatment per plot edge (none/fence/hedge/wall/railing, gates) from the site-plan table; counts toward streetwall continuity; exported |
| VIS-10 | redteam-visual | major | FIXED | §2.6 BaseWing; §4.7 S11; §8.2 (R-a) | Every footprint stored as rectangular wings with ridge axes; roof construction a style parameter over the wings |
| MFP-2 | redteam-mfcg | major | FIXED | §4.4 S5c; §4.6; §1.4 (S-a); §13.5 (S-b) | Walled regimes grow only district-scale secondaries (120–200 m); lanes and intramural secondaries from the bent cut; MFCG signature rows in the gate |
| MFP-3 | redteam-mfcg | major | FIXED | §4.2 S3; §4.4 S5a; §4.8; §2.5 Reservation | S3 reservations (plaza, castle, precinct, market) as L1 barriers before S4; castle welded into the trace; F-CASTLE repairs in place |
| MFP-4 | redteam-mfcg | major | FIXED | §4.2 S3; §4.3; §4.8 | N gate sites picked first (nested, prefix-stable); each gate one road out and one street in; N = 0 sealed without a postern |
| MFP-6 | redteam-mfcg | major | FIXED | §4.2 S2 stage rows; §4.4 regimes; D-2 (S-f) | Walled share ≈ 0.88–0.9 per rung from MFCG's 0.87–0.92; ribbon default extramural; suburb only by preset or shanty toggle |
| MFP-7 | redteam-mfcg | major | FIXED | §2.5; §4.5 typing; §4.7 S10b; §2.6 dwelling | Feature-named district kinds; live-in rows site households at their workplaces; block-level use-mix acceptance |
| MFP-9 | redteam-mfcg | minor | FIXED | §2.7 Enceinte.setbackCm; §4.8; §4.7 S10; §5.3 (D-b) | Inner and outer setbacks both unbuildable, hard invariant; ribbon plots start beyond the outer band |
| MFP-10 | redteam-mfcg | minor | FIXED | §4.5 grower and quarters; §9 (R-e) | District band derived from the count law; quarters N_q = round(1.37·B^0.267) fitted on MFCG as the city-LOD label unit — integration C-1: one quarter merge tree (S6), city cut at the count law |
| MFP-11 | redteam-mfcg | minor | FIXED | §4.9 S12b | greens toggle mapped onto the table (floor rates, park districts, report); castle esplanade row |
| FTG-1 | redteam-ftg | blocker | FIXED | as LC-2 (duplicate of LC-2) | Same mechanism as LC-2: eager allocation before any per-district stage; order-independence CI |
| FTG-2 | redteam-ftg | major | FIXED | §4.2 S2; §4.4 S5d; §4.5 bands; §4.7 S10 | Plot counts per class × band; plotShare measured (MFCG 0.60–0.65); bands from roster shares; S5d top-up and exact check after S10 |
| FTG-3 | redteam-ftg | major | FIXED | §4.5 S7b claims (duplicate of MFP-3) | District claims > one block cut out before S8; S8 cuts around them; parks only on reserved faces or residue |
| FTG-4 | redteam-ftg | major | FIXED | §4.4 S5b; §4.11 | Main-road step per stage and per epoch: new primaries routed incrementally to match the stage's gate law |
| FTG-5 | redteam-ftg | major | FIXED | §4.4 S5a; §13.5 (S-b) | Boundary = network-travel-cost level set with anisotropy row a (1.3 walled … 8 linear-street); outline metric monotone in a — integration C-11: one travel-cost field with the road anisotropy, stage thresholds on cumulative land |
| FTG-6 | redteam-ftg | major | FIXED | §4.4 S5c; §15.2 (S-d) | Per-preset heading model (ou / radiusHold / gridLock), crossing matrix, switchable bias, junction bands; ringed fixture |
| FTG-7 | redteam-ftg | major | FIXED | §4.9 S12a; §4.1 order; §4.7 S10b; §10.2 | S12a before S10b makes outside plots count-driven from the allocation; one farm table links farm demand and farmland |
| FTG-8 | redteam-ftg | major | FIXED | §2.7 Enceinte; §4.4 S5a; §4.8 | Open traces anchored on shore; waterfront policy row (open / quay wall / sea wall); aroundStage placement; quays reachable |
| FTG-9 | redteam-ftg | major | FIXED | §10.1; §10.3; §2.7 | Relation store schema in the base, materialised once by the module and persisted; content locality contract; storage restated |
| FTG-10 | redteam-ftg | major | FIXED | §10.3; §2.7 (duplicate of LC-16) | Pin only on explicit edit; per-household person-table version; re-derivation of existing people only by a diffed action |
| FTG-11 | redteam-ftg | major | FIXED | §2.6 SubLocation; §10.3 | SubLocation with tags and capacities; whole-population occupancy per (day type, hour) in two passes, cached, ≤ 50 ms per hour |
| FTG-13 | redteam-ftg | major | FIXED | §2.6 Heights.baseCm; §4.7 S11; §8.4 / §11 (R-c, R-f) | Ground datum per wing, wall vertex, gate, tower, bridge; plinth, skirts, stepped wings; shadows and glTF from baseCm |
| FTG-14 | redteam-ftg | major | FIXED | §10.2 | Sequential grid roster keyed by building ordinal; manifest(P₂) ⊇ manifest(P₁); epoch delta = suffix — integration C-17: §12.4 costs the sequential roster |
| FTG-17 | redteam-ftg | minor | FIXED | §4.4 S5c heading model | Ornstein–Uhlenbeck curvature with goal reversion, sigma in degrees per 100 m; executed drift distribution (p50 21°, > 90° 0.1 %) |
| FTG-18 | redteam-ftg | minor | FIXED | §4.4 between stages; §2.4 (K-b) | Only S5-grown provisional spines are trimmed; S4 and S5b arterials never |
| FTG-19 | redteam-ftg | minor | FIXED | §4.2 S3 step 5; §15.2 (S-d) | Island towns get shore destinations (harbour, landings, ferry point); O4 (g) counts landings |
| FTG-20 | redteam-ftg | minor | FIXED | §4.4 suburb row | Optional perimeter lane offset from the previous enceinte seeds offshoots besides arterial seeds |
| IMP-8 | redteam-improve | major | FIXED | §4.6 deep-interior rule; §13.5 (S-b) | Deep-interior treatment (court / back lane / through-alley / rear plots) by band shares, decided in S8; court-share keep-test |
| IMP-9 | redteam-improve | major | FIXED | §4.2 S1 (3) mouths; §4.2 S3 polycentric; §7.7 (D-k); §15.2 (S-d) | Distributaries by descent without rejoining; k = 2–3 nuclei with own enceintes; linear-street and island-city realisable |
| COV-MFCG-A03 | coverage-audit-mfcg | coverage (medium) | FIXED | §4.2 S0 | Per-rung feature table on its own concern, drawn once before any stage; every auto value reported |
| COV-MFCG-C05 | coverage-audit-mfcg | coverage (low) | FIXED | §4.6 step 1 | Working major axis rotated toward the contour direction by min(0.5, slope/0.3) on faces steeper than 5 % |
| COV-MFCG-C07 | coverage-audit-mfcg | coverage (medium) | FIXED | as FTG-8 (duplicate of FTG-8) | Waterfront policy row read by S5a and F-WALL: open along quays and beaches by default, or quay / sea wall with water gates |
| COV-MFCG-E04 | coverage-audit-mfcg | coverage (high) | FIXED | §4.2 S3 step 4–5 | Each gate carries a bearing (requested or least-cost to the frame); unwalled towns derive bearings by the same law |
| COV-MFCG-G03 | coverage-audit-mfcg | coverage (low) | FIXED | §4.6 partition recipes; §4.9 park layout; §4.7 S11 | fan / semiFan / ring PartitionRecipes from splitFace and insetRing, used by parks and cloister templates |
| COV-MFCG-G05 | coverage-audit-mfcg | coverage (medium) | FIXED | §2.6 outline builder | Axis-locked cell-drop composer for institution classes behind outline() |
| COV-MFCG-I01 | coverage-audit-mfcg | coverage (medium) | FIXED | §4.7 furniture pins | Main plaza always gets a centrepiece (statue 0.6 / fountain 0.3 / market cross 0.1, offset rule); gate-plaza pins |
| COV-MFCG-I03 | coverage-audit-mfcg | coverage (low) | FIXED | §4.9 park layout | Radial fan of groves if compactness ≥ 0.7, else semi-fan; perimeter path |
| COV-MFCG-Q01 | coverage-audit-mfcg | coverage (low) | FIXED | §4.2 S0; §9 (R-e) | Each reference limit stated as supported: several enceintes, 0–2 castles, islands and confluences, polycentric settlements, multi-line labels |
| COV-VG-VN-170 | coverage-audit-vg | coverage (medium) | FIXED | §4.7 S10 (8) and granularity table | Vacancy-run share of frontage per band, typed vacant or joined garden; keep-test |
| COV-VG-VN-179 | coverage-audit-vg | coverage (low) | STAGED-BY-OWNER | II.2 SquareFabric | Stage 2: SquareFabric mode 'void' leaves the square as the void of omitted frontages; hook concrete |
| COV-NG-N06 | coverage-audit-ng-shared | coverage (low) | STAGED-BY-OWNER | II.1 rule (5); §4.2 S1 (2) | Stage 2: outline templates (disc, D, lozenge, crescent, spindle) for standalone and sky calls; hook concrete |
| COV-NG-N12 | coverage-audit-ng-shared | coverage (low) | STAGED-BY-OWNER | II.2 RingFabric | Stage 2: rings as the only seed geometry, bands outside-in, first cut a slit, radials staggered band to band; hook concrete |
| COV-NG-N18 | coverage-audit-ng-shared | coverage (medium) | FIXED | §4.6 step 2 (duplicate of MN-3) | Start at f ~ N(0.5, σ) of the major axis (σ 0.066 / 0.098) with an outlier term, no clamp; M0 (b) distributional |
| COV-NG-N19 | coverage-audit-ng-shared | coverage (low) | FIXED | §4.6 step 6 | Fillet tangent length = r_t × shorter leg, r_t ~ N(0.73, 0.10) clipped to [0.54, 0.87] |
| COV-NG-N20 | coverage-audit-ng-shared | coverage (low) | FIXED | §4.6 step 9; II.2 | Free-end term e = 0.025 × median cut length; fixed per-district widths for template and ring roads |
| COV-NG-N27 | coverage-audit-ng-shared | coverage (low) | FIXED | §4.7 S11 compound row; §2.5 PlotBound; II.3 (duplicate of VIS-8) | The manor compound's enclosure wall and gate are base boundary treatments, drawn by the close-up from model data |
| COV-NG-XA07 | coverage-audit-ng-shared | coverage (low) | STAGED-BY-OWNER | II.3 | Stage 2: dispatch table reads spacing to the nearest landmark or manor block; minimum landmark spacing row; hook concrete |
| COV-NG-XB23 | coverage-audit-ng-shared | coverage (low) | FIXED | §2.7 Pin; II.2 (duplicate of COV-FTG-J02) | Pin kinds statue and monument in the base; SquareFabric centrepiece at the nexus |
| COV-NG-VS27 | coverage-audit-ng-shared | coverage (medium) | FIXED | §2.7 LandUse.crop / livestock; §4.9 S12a | Era/region crop table with a rotation scheme assigns crop and livestock per field |
| COV-NG-CR23 | coverage-audit-ng-shared | coverage (low) | FIXED | §2.7 Pin (duplicate of COV-FTG-J02) | Pin kinds statue and bandstand; per-block decoration rows |
| COV-FTG-B06 | coverage-audit-ftg | coverage (low) | FIXED | §10.2 rosterMode | minimiseUnemployment (default) or matchRatios, both grid-sequential and prefix-stable |
| COV-FTG-B09 | coverage-audit-ftg | coverage (medium) | FIXED | §4.2 S1 (10); §2.7 SiteResources; §4.9 S12a (duplicate of FTG-7) | Resource rasters from the site; S2 gates and S12a siting of outside classes read them |
| COV-FTG-B11 | coverage-audit-ftg | coverage (low) | FIXED | §10.3 work | Postings persisted; after an edit only changed workplaces and the unemployed pool re-matched; unfilled postings reported |
| COV-FTG-B12 | coverage-audit-ftg | coverage (low) | FIXED | §2.7 Faction; §10.3 | Roles with criteria and counts, goals with methods, secret flag; headcount reconciled with the seat's working capacity |
| COV-FTG-B13 | coverage-audit-ftg | coverage (low) | FIXED | §2.7 Government; §10.2; §4.2 S0/S2 | Government circumstance selects offices that force seats (castle, keep, bishop's palace, town hall …) and a military share |
| COV-FTG-B14 | coverage-audit-ftg | coverage (low) | FIXED | §2.7 Religion; §10.2 | Religions with generated pantheons, worshipper and practice shares, clergy rate; temples proportional to practising worshippers |
| COV-FTG-C01 | coverage-audit-ftg | coverage (low) | FIXED | §10.3 people model | AncestryRow (life stages, max age, heights, name grammar) and a partnering matrix as data; one human ancestry in the base |
| COV-FTG-C02 | coverage-audit-ftg | coverage (low) | FIXED | §10.3; §10.4 | Appearance templates in the grammar engine: weighted options, substitution, conditional and fallback lines, article agreement |
| COV-FTG-C04 | coverage-audit-ftg | coverage (low) | FIXED | §2.7; §10.3 (duplicate of FTG-9) | FamilyUnit and Relation schema in the relation store |
| COV-FTG-C05 | coverage-audit-ftg | coverage (low) | FIXED | §10.3 events | EventTemplate with preconditions, weight and effects as logged, undoable edit events |
| COV-FTG-C07 | coverage-audit-ftg | coverage (low) | FIXED | §2.6 SubLocation (duplicate of FTG-11) | SubLocation capacities and tags from the class table (index's required-change text is mis-copied; the claim is answered) |
| COV-FTG-C08 | coverage-audit-ftg | coverage (low) | FIXED | §2.7 Person.status, carer; §10.3; §5.3 (D-b) | Person types and carer-following; carer reassignment by rule; reference integrity |
| COV-FTG-D26 | coverage-audit-ftg | coverage (low) | FIXED | §4.4 S5a anisotropy (duplicate of FTG-5) | The anisotropy ratio a is the wide-versus-elongated control for ribbons and suburbs |
| COV-FTG-E02 | coverage-audit-ftg | coverage (low) | FIXED | §4.5 S7b; §4.7 S10a; §2.5 SubDistrict | Cluster-tagged classes get contiguous sub-district block groups inside their district |
| COV-FTG-E07 | coverage-audit-ftg | coverage (low) | FIXED | §4.7 S11 tents row; §2.7 Pin | Tents arrangement (tent buildings, fire-pit pins, dirt) in squalid and shanty districts |
| COV-FTG-E10 | coverage-audit-ftg | coverage (low) | FIXED | §10.4; §4.10; §2.5 District.description | Generated one-line district description from mix, features and prosperity; editable |
| COV-FTG-F09 | coverage-audit-ftg | coverage (low) | FIXED | §2.5 District.buildingScale; §4.7 S11 | Continuous 0.5–2 building-scale multiplier per district or Adjust regeneration; tents row |
| COV-FTG-F16 | coverage-audit-ftg | coverage (medium) | FIXED | §2.6 footprint templates (duplicate of COV-MFCG-G05) | Landmark footprint templates as data rows fitted to the claim in the base |
| COV-FTG-F20 | coverage-audit-ftg | coverage (medium) | FIXED | §2.6 MaterialRow; §2.7 Enceinte.material | Material table by district kind × class × band × era with per-district and per-building overrides |
| COV-FTG-F21 | coverage-audit-ftg | coverage (low) | FIXED | §2.6 description, openingHours | Generated building descriptions and opening hours from the class table |
| COV-FTG-F23 | coverage-audit-ftg | coverage (low) | FIXED | §2.5 PlotBound (duplicate of VIS-8) | Fences, hedges and walls as plot boundary treatments |
| COV-FTG-G07 | coverage-audit-ftg | coverage (low) | FIXED | §4.8 intervallum | Intervallum lane as an era row (on at CITY / METROPOLIS inner and outer enceintes) |
| COV-FTG-G09 | coverage-audit-ftg | coverage (medium) | FIXED | §4.8 castle template; §2.7 Castle | Gatehouse facing the castle street, internal paths, inner ward, surround row |
| COV-FTG-G10 | coverage-audit-ftg | coverage (low) | FIXED | §4.8; §2.7 Castle, Tower | Keep shapes rect / square / octagon / round / cruciform; octagonal towers; inner ward |
| COV-FTG-H04 | coverage-audit-ftg | coverage (low) | FIXED | §4.2 S1 (2) arms | Two coast arms, each with its own shape and detail rows |
| COV-FTG-H06 | coverage-audit-ftg | coverage (low) | FIXED | §4.2 S1 (7); §2.3 (K-a) | Bay / headland / straight per shore segment by smoothed curvature; per-class bank-kind weights |
| COV-FTG-H07 | coverage-audit-ftg | coverage (low) | FIXED | §4.2 S1 (8); §4.7 S10; §4.9 S12a | Shore setback table per bank kind for plots and fields, typed shore band |
| COV-FTG-H11 | coverage-audit-ftg | coverage (low) | FIXED | §4.2 S1 (3) (duplicate of IMP-9) | Distributaries in a delta mouth |
| COV-FTG-H17 | coverage-audit-ftg | coverage (low) | FIXED | §4.8 harbour | Harbour-wall shape and type rows, straight or branching piers on harbour and open coast, pier material |
| COV-FTG-I03 | coverage-audit-ftg | coverage (low) | FIXED | §4.9 S12a | Count-driven division of outside land by weighted Voronoi with a same-kind clustering term |
| COV-FTG-I09 | coverage-audit-ftg | coverage (low) | FIXED | §4.9 S12b | Street trees, ambient scatter and shoreline bands as rule rows |
| COV-FTG-I11 | coverage-audit-ftg | coverage (low) | FIXED | §2.7 Greenery.species; §4.9 | Species mix per green entity from the climate table, inner and outer shares for woods |
| COV-FTG-I12 | coverage-audit-ftg | coverage (medium) | FIXED | §4.9 S12a decorations; §2.7 Decoration | Hinterland decoration table with counts by rung and biome, trails and keep-clear radii |
| COV-FTG-I15 | coverage-audit-ftg | coverage (low) | FIXED | §4.9 climate table | ClimateTable rows: ground cover, species, field system, roof form, scatter |
| COV-FTG-J02 | coverage-audit-ftg | coverage (low) | FIXED | §4.7 furniture pins; §2.7 Pin | Per-block weighted decoration row and per-district singletons by deck; statue, monument, bandstand, campfire kinds |
| COV-FTG-J05 | coverage-audit-ftg | coverage (low) | FIXED | §4.7 furniture pins | Market stalls on the square's edge band and round the market hall, ≈ 1 per 150 m², ≤ 40 |
| COV-FTG-L06 | coverage-audit-ftg | coverage (low) | FIXED | §10.4 | Per-culture grammars and corpora; user-uploaded lists become user corpora in the document |
| COV-VG-VN-002 | coverage-audit-vg | coverage (low) | STAGED-BY-OWNER | §4.1; §4.12 StageDecl; PART III | Village staged: stage graph ordered from declared I/O so a density stage can precede the network; hook concrete |
| COV-VG-VN-003 | coverage-audit-vg | coverage (low) | STAGED-BY-OWNER | §4.12 NetworkStrategy / EnceinteStrategy; PART III (duplicate of MN-4) | Village staged: enceinte input to network growth and an EnceinteStrategy before the roads; hook concrete |
| COV-VG-WC2 | coverage-audit-vg | coverage (low) | FIXED | §4.2 S1 (3); PART III; §15.1 (S-d) | Wording corrected: VG's course is a terrain-independent spline laid before its terrain; ours is descent-traced with a carved field |
| COV-VG-WC4 | coverage-audit-vg | coverage (low) | STAGED-BY-OWNER | PART III item 4; §1.6 (S-a) | Village staged: a village is one district, so containment holds unchanged; hook concrete |
| AM-1 | AMENDMENTS-2026-09-25 | amendment | FIXED | §4.9 S12b clause map | Every clause mapped to a rule row; rows interpolated along prosperity like coverage and granularity |
| AM-2 | AMENDMENTS-2026-09-25 | amendment | STAGED-BY-OWNER | §2.7 SkyIsland; II.1; II.6; §4.2 S1 (2) | Islands staged: two reasons by rule or assignment, echo terrain, placement rule, no underground relation; interfaces concrete |
| AM-3 | AMENDMENTS-2026-09-25 | amendment | FIXED | §2.6 heights and ground datum; §8.4 (R-c) | Heights with baseCm on every building, wing, tower, wall run, gate and bridge; shadow hook and a stated shadow budget — integration C-15: shadow budget ≤ 20 % of tile raster time with the drop-mode fallback |
| AM-6 | AMENDMENTS-2026-09-25 | amendment | FIXED | §4.5 fields clause map | Continuous field, driver table, ε share, recorded bands, interpolation, epochs, brush — each clause mapped |
| MN-3 | ARCHITECTURE-VALIDATION | manager-note | FIXED | §4.6 recipe | The measured AN-6 recipe adopted: f on the major axis, coin side, perpendicular departure, R1 far side, proj corner, 0.53 fillet, width law |
| MN-4 | ARCHITECTURE-VALIDATION | manager-note | STAGED-BY-OWNER | PART III item 2; §4.12 | Village staged: palisade-before-roads (density-lattice hull) admitted through EnceinteStrategy and the enceinte input; hook concrete |
| DEF-7 | ARCHITECTURE | deferral | STAGED-BY-OWNER | II.6; §2.7 SkyIsland, Tunnel; Deferrals (S-f) | Sewers and islands staged: SkyStrategy, IslandRule, SewerStrategy and records concrete; entry moved to 'staged by the owner' |
| DEF-8 | ARCHITECTURE | deferral | STAGED-BY-OWNER | §4.11; Deferrals (S-f) | Evolution engine staged: ConversionOp kinds incl. decline, EpochInputs, EvolutionStrategy; the growth path built |
| DEF-10 | ARCHITECTURE | deferral | FIXED | §10.4 SettingPack; §7.6 (D-j) | Pack format and loading layer decided; the base ships one pack; further contents are data |
| DEF-15 | ARCHITECTURE | deferral | STAGED-BY-OWNER | PART III; Deferrals (S-f) | Village product staged: five concrete hooks (declared-I/O stages, enceinte input, tracker network, one district, ladder rows) |
| DEF-16 | ARCHITECTURE | deferral | FIXED | §4.1 worker | Per-district pool specified now; M2 measures METROPOLIS single-threaded; the pool switches on if it misses 1 s p95 — integration C-4: the pool is primary, measured at M1; single worker the fallback |
| DEF-17 | ARCHITECTURE | deferral | STAGED-BY-OWNER | §2.6 stage-3 hook; §16 (S-e) | Stage-3 compositions staged: outline/compose split, cost contract, intake measurement and fallback concrete |
| GEO-28 | redteam-geometry | major | FIXED | §8.1, §8.8 | world-aligned tile pyramid: every tile draws every intersecting mark in one global program order (all casings before any body across the scene); same-semantic fills unioned per tile path; ½-px same-colour seam underlay; render … |
| GEO-29 | redteam-geometry | major | FIXED | §9.1, §9.2, §8.9 | label placement is view data (S13b), outside the model hash; text widths from the bundled OFL fonts' own metric tables parsed by our code, never the host text engine; headless-vs-browser hash and placement tests — integration C-3: placement is view data at every band (S13b) |
| GEO-39 | redteam-geometry | minor | FIXED | §9.3 | area-label spine = longest path of the maximum-clearance spanning tree of the hole-aware skeleton graph; topology-preserving simplification |
| GEO-40 | redteam-geometry | minor | FIXED | §11.1 (3-D row) | glTF ground = the plat's leaf faces exported once each, clipped to terrain cells and draped; rivers as sloped surfaces from per-station water levels, lakes and sea as level planes |
| LC-17 | redteam-lifecycle | major | FIXED | §9.1, §9.2, §9.6 | names and label candidates are model data re-derived only inside a regenerated scope; placement is view data; uniqueness never renames an existing entity; test: a block reroll changes 0 names and 0 Label entities outside it — integration C-3: S13a model / S13b view split applied in §4.10 |
| LC-20 | redteam-lifecycle | major | FIXED | §8.10 | one instance set per entity from a stamped blue-noise tile, positions independent of the band, bands thin by stable rank prefix; `instance` override events replayed after regeneration |
| LC-23 | redteam-lifecycle | minor | FIXED | §8.1, §8.8 | every derived cache keyed (entity handle, content revision digest, band, style version, construction); tiles invalidated by dirty world regions from the changed marks |
| SCL-3 | redteam-scale | major | FIXED | §12.4 | CITY per-stage split re-budgeted with the mechanism named for every stage (coarse-grid fBm, 16 m hydrology, hex lattice, one plaza-rooted Dijkstra reused by growth, 32 m fields with O(N) blur, distance rasters for context … — integration C-11, C-13, C-17, C-18: §4 mechanisms and §12.4 rows reconciled; critical path 245 ms p50 |
| SCL-6 | redteam-scale | major | FIXED | §8.9, §11.2 | handle-based API; document stays in the generation worker; columnar display list delivered as transferred deltas; per-call crossing table; SharedArrayBuffer optional; main-thread receive ≤ 4 ms per delivery |
| SCL-7 | redteam-scale | major | FIXED | §8.8, §12.5 | 512-device-px tile pyramid at 2^¼ zoom stops, LRU canvas budget in bytes per tier, scaled interim tiles during gestures, progressive re-raster in the tile worker, print by streaming tile bands into the PNG encoder; zoom, pan … |
| SCL-8 | redteam-scale | major | FIXED | §8.10, §12.7 | tile stamp normative for every scatter class (Bridson k = 50 only builds the tiles once per session); crown library of 20 per class per style; instances generated per tile in the tile worker; ≤ 1 µs placement and ≤ 2 µs draw per … |
| SCL-9 | redteam-scale | major | FIXED | §8.1, §9.2, §12.6 | S14 and S13a incremental over a dirty region; S13b recomputed per affected tile; replay mode builds the display list once at the end; warp preview on tiles at ≥ 30 fps with invariants on Apply; edit budgets stated as functions of … |
| SCL-10 | redteam-scale | major | FIXED | §9.2, §12.7 | S13 split: model-side candidates (zoom-independent) and view-side selection per zoom stop in the tile worker by local evaluation of the global priority greedy (≤ 2 ms per stop for ≤ 2 000 visible candidates); addresses and street … |
| SCL-14 | redteam-scale | major | FIXED | §11.1 (SVG row), §12.7 | SVG export at the city band by default; compound paths per (semantic, district) with an id side table; trees as one path per green entity; ≤ 650 B per building and ≤ 60 000 elements at METROPOLIS; scripted Inkscape open check |
| SCL-15 | redteam-scale | minor | FIXED | §12.1 | reference hardware = the capture machine (Apple M1, 8 cores, Chrome stable / Node 24); named low-end device; calibration benchmark normalises CI timings; each budget states where it is measured |
| SCL-17 | redteam-scale | minor | FIXED | §12.5 | one first-map target per rung on the default Canvas2D backend (≤ 150 ms / 400 ms / 1 s); no rung depends on WebGL2 |
| VIS-1 | redteam-visual | major | FIXED | §8.2, §8.3, §8.5 | symbolisation table per semantic × band in m or paper px (no "u"); ink rows calibrated on MFCG's metre export at matched view scale; walls drawn after footprints and clipped inward to the setback; outlines thin by band; sub-floor … |
| VIS-2 | redteam-visual | major | FIXED | §8.2 | roles `road`, `ground`, `court`, `garden`, `field`, `verge` added with our own values; pairwise ΔE2000 / ΔL* matrix replaces the luminance rule, checked on palettes (100 % of random styles) and on rendered city-band images |
| VIS-3 | redteam-visual | major | FIXED | §8.5 | city-band ways chosen by access need: every way that is a plot's only access and is not bounded by continuous frontage is drawn with a lane symbol; metric ≥ 95 % |
| VIS-4 | redteam-visual | major | FIXED | §9.4 | label legibility floor in px (area labels cap ≥ 7 px); quarter labels from a model-side merge tree; declared overflow ≤ 20 %; acceptance ≥ 12 on-map area labels per rung at the default view — integration C-1: the §9.4 tree is the §4.5 tree |
| VIS-5 | redteam-visual | major | FIXED (dup of LC-20) | §8.10 | as LC-20; crown shape, colour jitter and hatch phase keyed by (entity, ordinal) |
| VIS-6 | redteam-visual | major | FIXED (dup of SCL-7) | §8.8, §12.5 | as SCL-7; views settle on exact zoom stops, so hairlines and casings are exact at every settled view; hairline-fidelity check |
| VIS-7 | redteam-visual | major | FIXED | §8.2, §8.9 | `lit` specified as Canvas2D-runnable programs (tinted pattern textures, per-face directional tones, vector penumbra shadows with `penumbraPx`, pre-shaded crown sprites, field-raster water ramps and foam); Canvas2D is the … |
| VIS-9 | redteam-visual | major | FIXED | §8.2, §8.6 | every shipped family defines all four bands with invariant roles; detail cross-faded over the hysteresis interval; role-continuity check ΔE2000 < 2 |
| VIS-12 | redteam-visual | minor | FIXED | §8.1, §8.2 | `field` mark kind with a raster geometry; hillshade, depth ramps and beach bands are programs over it |
| VIS-13 | redteam-visual | minor | FIXED | §8.1, §8.2 | S14 emits shore marks per bank segment with `bankKind`, `waterKind`, `exposure`; foam, beach, cliff and quay programs select on them; census: foam on 0 % of quay and sheltered segments |
| VIS-14 | redteam-visual | minor | FIXED | §8.5 | avenues are not drawn at the city band; check: no tree mark covers a tier-1/2 casing at the city band |
| VIS-15 | redteam-visual | minor | FIXED | §9.4 | halo role = the role of the area mark under each glyph, looked up in the display-list index |
| VIS-16 | redteam-visual | minor | FIXED | §8.2, §8.3 | order parity = the recorded order is a subsequence of the preset's order and each added semantic has a declared slot with a reason; NG's no-ridge-stroke and footprint-only outline checks and MFCG's walls-after-buildings rule added |
| VIS-17 | redteam-visual | minor | FIXED | §8.4 | per-layer occlusion mode (opaque, ghost, offset view) in `LayerSpec`; island placement rule requested from pipeline (§3) |
| VIS-18 | redteam-visual | minor | FIXED (dup of SCL-14) | §11.1, §12.7 | as SCL-14 |
| MFP-1 | redteam-mfcg | blocker | FIXED | §8.5, §8.2, §8.3 | city-band figure-ground contract: blocks in the `ground` role, footprints as masses, streets and squares the only `road` voids; the one-click first paint is the complete city band; street-edge recoverability and contrast metrics … |
| MFP-5 | redteam-mfcg | major | FIXED | §12.2, §12.3, §12.9 | speed bars re-anchored at matched building counts (MFCG sizes 40 / 80 / 130: 57 / 131 / 156 ms); per-building budgets stated; the 1.8–5.1× model-time trade (≈ 2–3× to first map) declared with its reason; population cap above … |
| FTG-12 | redteam-ftg | major | FIXED | §11.3 | the host is the store: `doc.load`, `doc.apply {baseStateId}` (accept or reject-and-rebase), `doc.changed`, `stateId` = hash(document id, log length, last event hash), version handshake, a view-state section outside the model hash … |
| COV-MFCG-A06 | coverage-audit-mfcg | coverage (low) | FIXED | §9.5 | content-weighted framing: walled stage ∪ the 95th-percentile footprint radius, no letterbox; the same frame for exports unless set |
| COV-MFCG-J04 | coverage-audit-mfcg | coverage (low) | FIXED | §9.5 | gazetteer legend panel (title, numbered districts, lettered landmarks, scale bar, emblem), any corner or free position, border styles, units, three label modes |
| COV-MFCG-K06 | coverage-audit-mfcg | coverage (medium) | FIXED | §8.2, §8.4 | ink's `raised` offset under-copy is on by default; only the projected shadow pass is off |
| COV-MFCG-K12 | coverage-audit-mfcg | coverage (low) | FIXED | §8.2 | `tint` program keyed by district (spectrum / brightness / overlay, strength, neighbours ≥ 30° apart by graph colouring) and per-roof weathering |
| COV-MFCG-K16 | coverage-audit-mfcg | coverage (low) | FIXED | §8.2 | ink order with trees after fields and before walls, forest over tracks |
| COV-MFCG-L10 | coverage-audit-mfcg | coverage (medium) | FIXED | §9.5 | measure tool (distance and area, metres / feet, snapping to ways and faces) in furniture and `@plat/app` |
| COV-MFCG-M06 | coverage-audit-mfcg | coverage (low) | FIXED | §9.5 | emblem slot now: import (sanitised SVG / PNG) plus a minimal own procedural emblem; off by default |
| COV-VG-VN-029 | coverage-audit-vg | coverage (medium) | FIXED | §8.2 | relief tier in the base (contour, hachure and grass marks extracted per render tile), optional and off by default; scope reconciles §15.1 / §16 / PART III (§3) |
| COV-VG-VN-031 | coverage-audit-vg | coverage (medium) | FIXED | §8.2 | `hillshade(sun, strength)` over the terrain `field` mark, water exempt, strength from the shadow role; M2 slot requested (§3) |
| COV-VG-VN-158 | coverage-audit-vg | coverage (low) | FIXED | §11.1, §8.10 | GeoJSON, glTF and CityJSON instance trees from the same stamp function (seeded, reproducible, never stored) |
| COV-NG-XB08 | coverage-audit-ng-shared | coverage (low) | FIXED | §9.5 | compass auto-placement by an occlusion score over eight frame positions, away from the centre; manual placement and rotation as view state |
| COV-NG-XB15 | coverage-audit-ng-shared | coverage (low) | FIXED | §9.5 | grid kinds none / square / hex / mesh, cell size in metres or feet, colour role, skip-water option |
| COV-NG-XB17 | coverage-audit-ng-shared | coverage (low) | FIXED | §8.2 | multi-colour pick rule: per individual by hash(style, role, entity[, ordinal]); aggregate fills take index 0 |
| COV-NG-XB32 | coverage-audit-ng-shared | coverage (low) | FIXED (dup of COV-VG-VN-158) | §11.1 | as VN-158 |
| COV-FTG-I05 | coverage-audit-ftg | coverage (low) | FIXED | §8.2 | `feather(widthM)` edge program as vector bands (no bitmap blur) for fields bordering open ground; on in `lit` |
| COV-FTG-K05 | coverage-audit-ftg | coverage (low) | FIXED | §8.4 | `Sun` record and `sunPath(latitude, day, hour)`; view-state time drives an optional moving sun; night below −6° |
| COV-FTG-K06 | coverage-audit-ftg | coverage (low) | FIXED | §8.2 | season and weather as view-state inputs selecting thematic override rows (deciduous re-skin, snow overlay with roads kept legible, overcast removes projected shadows) |
| COV-FTG-K07 | coverage-audit-ftg | coverage (low) | FIXED | §8.2, §8.9 | `post` operations per tile (greyscale, sepia, tint, vignette, pixelate, dot screen, scanline, crosshatch-noise) on Canvas2D, PNG and the compositor; SVG carries the colour-matrix subset |
| COV-FTG-K13 | coverage-audit-ftg | coverage (low) | FIXED | §8.2 | live layers through a `LiveLayerProvider` (favourite people from the module's occupancy, favourite buildings from view state) |
| COV-FTG-L08 | coverage-audit-ftg | coverage (medium) | FIXED (dup of COV-MFCG-L10) | §9.5 | as L10 |
| COV-FTG-N06 | coverage-audit-ftg | coverage (low) | FIXED | §11.3 | transport-agnostic bridge (window postMessage and MessagePort transports) so any relay can carry it; static VTT exports for iframe-less hosts; no Roll20 extension built (decision recorded) |
| COV-FTG-N07 | coverage-audit-ftg | coverage (low) | FIXED | §11.5 | `DocResolver` interface for `&doc=` links and publishing, viewer / editor / owner roles enforced by client and host; no hosted service (decision) |
| COV-VG-WC5 | coverage-audit-vg | coverage (low) | FIXED | §8.4 | shadow casters listed: buildings, wings, towers, walls, gatehouses, bridges, piers, trees, sky islands |
| COV-FTG-OBS5 | coverage-audit-ftg | coverage (low) | FIXED | §12.9 | FTG comparator cites part 2: server 2.9–3.2 s, scene built 6.4–7.0 s after the click, loading a finished settlement 2.0 s busy |
| MN-1 | ARCHITECTURE-VALIDATION | manager-note | FIXED | §12.2, §12.9, §8.2 | matched sizes and counts from the size sweep; MFCG's GeoJSON is in metres and only its SVG uses 4 m units; the size-80 15 392-building city is the options-confounded one |
| DEF-4 | ARCHITECTURE | deferral | FIXED | §11.1 (VTT row) | the dd2vtt profile specified: format, grid units, line of sight from walls / footprints / yard walls, portals from entrances and gates, lights, embedded PNG, scene scope and size cap with splitting |
| DEF-5 | ARCHITECTURE | deferral | FIXED | §11.1 (3-D row) | CityJSON 2.0 exporter built (integer vertices with a transform carry our centimetre lattice losslessly); D-8 amended (§3) |
| DEF-6 | ARCHITECTURE | deferral | FIXED | §8.9 | no SDF text: every backend draws text into Canvas2D label tiles (the WebGL2 compositor uploads them); measured at M1 with a glyph-atlas fallback |
| DEF-11 | ARCHITECTURE | deferral | FIXED | §11.4 | generic host-input contract decided (blueprint fields, events, tables copied with provenance `host`, providers double-run-checked and recorded); the SettlementForge mapping stays staged by the owner behind it |
| DEF-12 | ARCHITECTURE | deferral | FIXED | §11.5 | decision: no hosted sync service in the product; the host-as-store bridge and the resolver provide sync and sharing |
| GEO-12 | redteam-geometry | major | FIXED | §13.1, §13.8 | constructive degeneracy generators — lattice points on segments by gcd stepping, collinear overlaps, cuts through vertices and grazing reflex vertices, antennae, coincident typed chains, snapped rotated rectangles / squares / … |
| LC-19 | redteam-lifecycle | major | FIXED | §16 (M1 content and every exit), §13.3, D-24 | the output-version stamp, shift and cascade records and stage-isolated golden tooling are M1 work; links made before M4's exit are labelled *preview* links that show their output version; every milestone's exit lists its declared … |
| SCL-18 | redteam-scale | minor | FIXED | §13.8 (new), §16, D-34 | three CI tiers with wall-clock budgets on a stated runner (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h), timings normalised by §12.1's calibration score; the locality oracle once per sequence; a job over budget is split, never … |
| SCL-19 | redteam-scale | minor | FIXED | §13.2 | cost-model tests on ≥ 6 sizes per stage (1 500 → 120 000 people) failing on a log-log slope above 1.15 (1.25 for stages declared n log n); per-edit cost of a fixed scope flat from TOWN to METROPOLIS ± 20 %; index-rebuild work … |
| SCL-21 | redteam-scale | minor | FIXED | §13.2, §15.2 O6 (d) | the statistics record split into an O(n) core emitted per generation (4 ms at CITY, §12.4) and bench metrics (detour index, Moran's I, KS distances, tree statistics from §8.10's stamps) computed on demand or in the bench only |
| MFP-8 | redteam-mfcg | minor | FIXED | §1.4 units row, §13.5 | 4.00 m per MFCG internal unit, the JSON export already in metres; MFCG baseline rows from the size-sweep exports with provenance; MFCG lot areas labelled lots, never a house-size anchor |
| FTG-15 | redteam-ftg | major | FIXED | §13.5, §15.2 O4 (b) | curves compared after resampling both sides at 10 m (turning per 100 m, heading change per 50 m); junction-to-junction run lengths by class instead of edge lengths; every reference cell labelled *target*, *weakness to beat* or … |
| FTG-16 | redteam-ftg | major | FIXED | §16 M-1, §13.6, D-31 | FTG BIG_TOWN (≈ 5 600) and BIG_CITY (24 500) captured free over the daily allowance at M-1 and decoded with the existing tools; population-matched pairs; METROPOLIS: no purchase by default — the BIG_CITY pair plus FTG's published … |
| FTG-22 | redteam-ftg | minor | FIXED | §17 (with §11.3) | the bridge vocabulary is our own (§11.3); §17 states the rule (protocol ideas admissible, the module's message and field names not reused) and the deny-list scan carries those names |
| IMP-1 | redteam-improve | blocker | FIXED | §17, §14 (`@plat/testkit`), §13.5, §16 M-1, D-29 | implementer inputs = ARCH + a sanitised implementer digest written by one seat and checked by another; `research/`, `captures/`, `reference/` and the findings research-only; the product repository `plat/` outside them with a path … |
| IMP-2 | redteam-improve | major | FIXED | §16 (effort table), D-20 | line-by-line re-derivation: base 136–182 pw + stage 2 14–18 pw = 150–200 pw, equal to the milestone sum; content authoring and the app's UI are named work items; stated as an owner-visible decision with the list of cuts that … |
| IMP-3 | redteam-improve | major | FIXED | §16, D-1, D-7, D-10, D-35 | the editing core (M2a) directly after M1 and before the second preset; `lit` on Canvas2D (§8.2); M3 split into M3a (full editing, migration, API) and M3b (exports, forms, should-have tiers); `@plat/sim` its own milestone M4b … |
| IMP-4 | redteam-improve | major | FIXED | §15.2 (every letter tagged C / P / O), §13.6, D-5 | tags; a C letter is never cited as evidence of improvement; each first-weighted improvement has a P or O letter its own rule cannot satisfy — plot texture: figure-ground, streetwall and plot statistics against MFCG's exports and … |
| IMP-5 | redteam-improve | major | FIXED | §15.2 O1 (a), O3 (b), §13.5, D-9 | requested-feature delivery counted by tier (a tier-6 omission of a requested feature is a failure, target 0; degraded ≤ 5 % with a pre-decided fallback); p95 wall-clock on an MFCG-worst configuration set against MFCG's 3.7–4.0 s … |
| IMP-6 | redteam-improve | major | FIXED | §13.7 (new), §13.5, D-30 | every threshold without a reference source has a number now (provenance "architecture 2026-09-25"), the first milestone whose mechanism runs confirms it by measurement or by the D-5 panel, and a pre-decided fallback applies if it … |
| IMP-7 | redteam-improve | major | FIXED | §15.2 O9 (c), §16 M3a | O9 (c) = §7.3 item 7 (iv): byte identity for Regenerate (keep settings); New random inside the central 95 % band of K ≥ 50 from-scratch generations of the same scope; a campaign judged by a binomial test on the pass rate |
| IMP-10 | redteam-improve | minor | FIXED | §15.2 O1 (b), O7 (a) / (d), O12 (b), O13 (a), O14 (b) | the dropped clauses restored with their numbers; O7 (a)'s "every person a work or role" is a module letter measured at M4b |
| IMP-11 | redteam-improve | minor | FIXED | §15.2 O16 (c), S2; §13.6 | tester counts replaced by scripted task checks in the browser harness (actions and response time per task); S2's preference test folded into the D-5 protocol with the owner as the declared rater |
| IMP-12 | redteam-improve | minor | FIXED | §15.2 O4 (h), §13.5, §16 M1 | between-seed dispersion of the signature vector over 100 seeds per rung and water setting, floored by MFCG's and FTG's dispersions, from M1 |
| IMP-13 | redteam-improve | minor | FIXED | §16 M1 exit | the fusion gate re-run as an M1 exit on B-CITY-lite's river, coast and relief configurations with the reordered stages (reservations, trace before growth), with pre-decided M1 fallbacks for time and for statistics |
| IMP-14 | redteam-improve | minor | FIXED | §17, D-23 | Boost entry corrected; `dmath` = our own TypeScript port of the needed fdlibm 5.3 routines with the Sun notice (no `@stdlib` closure); the checker over the transitive production closure with listed dev-only exceptions; a … |
| IMP-15 | redteam-improve | minor | FIXED | §17, §13.5, D-1 | style laws tested on our palettes (§8.3), reference ratios kept as descriptive benchmarks; the default label face is IM FELL Great Primer (OFL; a third-party asset outside the clean-room rule) |
| IMP-16 | redteam-improve | minor | FIXED | §15.2 O9 (f), §13.2 | O9 (f) = the thirteen scripted scenarios of §7.4 with locality share, invariant results and re-run cost reported |
| COV-MFCG-L08 | coverage-audit-mfcg | coverage (low) | FIXED | §14 `@plat/app` (keymap), §15.1 MFCG F3 | a stated input scheme held in an editable `keymap.json`: click selects, shift+click New random, ctrl / cmd+click reset to generated, alt+click lock, double-click zoom to the entity; single-key toggles; active only while the map … |
| COV-VG-VN-010 | coverage-audit-vg | coverage (low) | FIXED | §13.5 | every baseline carries `referenceBuild` with its capture id, script and date; the parity CLI refuses a row without it; a reference build change is a declared baseline shift |
| COV-VG-VN-088 | coverage-audit-vg | coverage (medium) | FIXED | §1.1, D-33; X rendering §12.2, pipeline PART III | the base's floor is 1 500 people, equal to the village ladder's ceiling; 1 500–10 000 is a base TOWN whose size follows its population; a request below 1 500 routes to the village product through a declared hook (clamped and … — integration C-9: TOWN floor 1 500 in §12.2 as well |
| COV-FTG-A24 | coverage-audit-ftg | coverage (low) | FIXED | §14 `@plat/app`, §13.4, §15.1 FTG A1 | an accessibility contract (WCAG 2.2 AA for the app's chrome, landmarks and labels, full keyboard reach, the gazetteer list / search and a "features in view" list as the non-visual route to the map), tested by axe-core and … |
| COV-FTG-A25 | coverage-audit-ftg | coverage (low) | FIXED | §14 `@plat/app` and `@plat/docs`, §13.2 | a user guide generated from the control and entity registries plus written pages; context help on every control and panel through §7.8's anchors; release notes naming known defects from a tracked file; CI link and coverage checks |
| COV-FTG-B10 | coverage-audit-ftg | coverage (medium) | FIXED | D-32, §15.1 FTG B7; X pipeline §2.7 / §10.3 | economy content (resource chains, items and services with prices, stock per building, global price edits) decided into `@plat/sim` with a base schema stub; flagged for owner veto as a new-capability call |
| COV-FTG-C03 | coverage-audit-ftg | coverage (medium) | FIXED | D-32, §15.1 FTG B8; X pipeline §10.3 | personality, education gated by class and a stat block with profession modifiers decided into `@plat/sim`, derived from the person key; the stat block is a named game-system pack, off by default; flagged for owner veto |
| COV-FTG-C11 | coverage-audit-ftg | coverage (low) | FIXED | §14 `@plat/app`, §15.1 FTG B9; X rendering §11.2 | a family-tree view over the relation store (layered generations, elided expansion, re-root) in the app, module tier, built at M4b |
| COV-NG-OBS3 | coverage-audit-ng-shared | coverage (low) | FIXED (dup of MFP-8) | §13.5 | the MFCG footprint baseline re-based on the metre exports and labelled lots; the "≈ 13–14 m across at size 25" figure removed |
| COV-FTG-OBS1 | coverage-audit-ftg | coverage (low) | FIXED | §15.1 | every FTG row re-cited to the section that now carries its mechanism; rows added for the ruler, economy, personality, stalls, feathered edges, tree species and the family tree |
| AM-4 | AMENDMENTS-2026-09-25 | amendment | FIXED | §1.1, §0.4, D-33 | both ladders named; a `RungProfile` table defines per rung the population band, frame, stage rows, budgets, granularity modifiers and greenery modifiers; size within a rung follows population |
| AM-7 | AMENDMENTS-2026-09-25 | amendment | FIXED | D-1 – D-7, §0.4, §13.6 | every clause checked against a concrete mechanism and completed: ink default and `lit` on Canvas2D; the house style drafted as three candidate sheets at M3b and chosen by the owner at M4; era rows refined through §13.9; fantasy … |
| MN-2 | ARCHITECTURE-VALIDATION | manager-note | FIXED | §13.5 (timing row), §13.6, §16, D-31 | TOWN = MFCG size 40, CITY = 80, METROPOLIS = 130 in every side-by-side and timing row (MFCG 57 / 131 / 156 ms); FTG compared at TOWN and CITY on free captures, METROPOLIS per D-31 |
| DEF-1 | ARCHITECTURE | deferral | FIXED (dup of IMP-6) | Deferrals, §13.5, §13.7 | no placeholder band remains: every band has a number and a provenance now, a fixed update rule from `baselines.json`, and §13.7 for thresholds no reference can set |
| DEF-9 | ARCHITECTURE | deferral | STAGED-BY-OWNER | §13.9 (new), Deferrals | the corpus-calibration interface is concrete: `CorpusAdapter`, corpus rows in `baselines.json`, `CalibrationRun` applied as table-version bumps with declared shifts; running it is the owner's staged phase |
| DEF-14 | ARCHITECTURE | deferral | FIXED | D-22, §17 | default posture decided: the product repository is proprietary, all rights reserved to the owner, until the owner chooses — the most option-preserving default (relicensing is the owner's unilateral act; publishing cannot be … |

### §R1.2 The former "Deferrals" list, entry by entry

The architecture's "Deferrals" section is now **"Staged by the owner's roadmap (this document defers nothing)"** and lists
only the seven roadmap subjects (stage 2, stage 3, the village product, sewers and floating islands, the evolution engine,
the historical-corpus calibration, SettlementForge inputs) with the sections that carry their hooks. Every other former
entry is a decision in the body:

| former entry | decision | where |
|---|---|---|
| final numeric targets for every band and threshold (J-T) | every band and threshold has a number, a provenance and an update rule; the thresholds no reference can set have a confirming milestone and a pre-decided fallback | §13.5 (band rule), §13.7, D-30 |
| the boolean library choice | booleans, buffers and bands on the kernel's own arrangement; Clipper2-WASM becomes the single engine only if M0's bar fails | §3.7, D-14 |
| the straight-skeleton port versus in-house | in-house under a numeric contract and a validator; the downgrades become the default paths only if M0's bar fails | §3.8, D-14 |
| the dd2vtt profile details | specified | §11.1 |
| CityJSON as a second 3-D format | built | §11.1, D-8 |
| WebGL2 SDF text | none: every backend draws text into Canvas2D label tiles, with a glyph-atlas fallback if M1's measurement fails | §8.9 |
| setting packs | the pack format and loading layer; the base ships one pack; further packs are data | §10.4, D-6 |
| host inputs | the host-input contract: blueprint fields, logged events, tables copied with provenance `host`, providers double-run-checked and their outputs recorded in the document | §11.4 |
| a sync service | none in the product: the host is the store over the bridge, and `DocResolver` shares documents | §11.5 |
| a WASM kernel | none; a byte-identical WebAssembly accelerator for a measured hot loop is the pre-decided fallback | §3.7, D-4 |
| the owner's own licence | proprietary, all rights reserved, until the owner chooses — *owner veto* | §17.3, D-22 |
| per-district worker pools (formerly in §4.1's text) | the derivation pool and its merge protocol specified; primary once M1 measures it, the single worker the fallback | §4.1, §12.3, D-18 |

### §R1.3 Changelog of `docs/ARCHITECTURE.md`, round 1

* **Size and marking.** 2 200 → 6350 lines. 129 section headings carry the round-1 review banner; §0.7 records the
  round; judgment calls grew from 18 to 111 (J-K, J-DET, J-P, J-R, J-S rows from the drafts; J-I1–J-I8 from integration).
* **Kernel (§2.2, §2.3, §3.1–§3.5 replaced; §3.6–§3.10 new).** One arena per layer with the five levels as views and
  roles instead of stored slot lists; attraction at 26 cm instead of a 5 cm weld; contact and move semantics; one geometry
  engine on every host with Clipper2 and `polygon-clipping` as CI oracles (fallback: Clipper2-WASM as the single engine);
  an in-house straight skeleton with a validator and downgrades; `Int32` heights on a datum; each arena stored once;
  kernel invariants with scopes.
* **Determinism (§2.1, §2.8, §2.9, §5, §6, §7 replaced).** Address ids separated from lineage keys with survival and
  succession; work limits instead of clocks; structured stream keys; a Merkle model digest maintained at commit; one
  ordered replay fold with rebase, upgrade and epoch events; scoped undo records; output versions with N−1 / N−2
  retention; decline states in the lifecycle; the edit-target table and the named actions.
* **Pipeline (§2.5–§2.7, §4.1–§4.12, §10, PART II, PART III replaced; II.6 new).** Reservations and gate sites at S3; each
  wall traced before its stage's growth; the bent cut inside the walls and FTG growth outside; MFCG's measured gate and
  quarter laws; the eager allocation and the laziness contract; per-frontage plot regions, wings, heights with a ground
  datum; greenery and hinterland rule tables; the sequential roster and the relation-store schema; the staged layers'
  hooks; the village hooks by declared stage I/O.
* **Rendering (§8, §9, §11, §12 replaced; §8.8–§8.10 new).** A columnar display list and world-aligned tile pyramid;
  roles with a contrast matrix and a symbolisation table; `lit` on Canvas2D; decoration by entity and ordinal; label
  placement as view data with our own font metrics; the host bridge and host-input contract; per-rung budgets on a named
  machine with the derivation pool and a declared trade against MFCG.
* **Scope (summary, §0.4, §1, §13–§17, decisions, judgment calls, the staged list replaced; §13.6–§13.9, §17.1–§17.4
  new).** The two ladders meeting at 1 500 inhabitants with a rung-profile table; evidence classes on every acceptance
  number; the owner's side-by-side protocol; thresholds without a reference source; CI tiers; the corpus interface; the
  milestone split M2a / M2b, M3a / M3b, M4b; effort 150–200 pw; the clean-room chain.
* **Integration (§0.7, §2.4 and edits across §2–§12, II, III).** 81 cross-area requests applied and 22 conflicts settled
  (C-1–C-22 in the integration log; J-I1–J-I8 in the architecture) — chiefly: one quarter merge tree (C-1); no preview at
  any rung with the pool primary (C-2, C-4); label placement as view data (C-3); kernel references and lineage-keyed
  streams in every schema (C-6, C-10); one travel-cost field for all growth stages (C-11); the range bound at the
  population cap (C-16); §12.4's rows reconciled with §4 (C-8, C-17, C-18).
* **Superseded note.** Item (4) of §0's "What the red team should weigh" — "the document's own deferrals list is the
  authoritative 'documented, not a bug to re-find' list" — no longer applies: the document has no deferrals list; the
  staged-by-owner list is the only "later" list, and it is the owner's roadmap.
* **Not in this round.** The owner's evening rules 8–9 (`docs/AMENDMENTS-2026-09-25b.md`) are the next amendment pass's
  input; the drafts already carry size by population within a rung (§1.1) and the decline states and conversions (§2.8,
  §4.11), which that pass verifies against the rules' full text.

**What round 2 (or the Fable review) should weigh first.** (1) The integration judgments J-I1 (one quarter tree), J-I5 (one
travel-cost field) and J-I2 with J-P10 (no preview; the pool primary) — each settles a disagreement between two stand-in
drafts on reasoning alone. (2) The kernel's decision to build booleans and buffers on its own arrangement (J-K4) and the
identity model of §6.3 (J-DET-1, J-DET-2): both are foundations every other area now leans on. (3) The effort increase to
150–200 person-weeks (§16) and the M2a-before-M2b order, which change what the owner sees and when.

## §R2 Fix-all round 2 (2026-09-25): every item's disposition and the changelog

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r2)

*In plain words.* After round 1, five checkers re-read the design against every round-1 fix. They found nine round-1
items not fully fixed and ninety new problems the rewrite had introduced — 99 items. Each went back to the area of the
architecture it belongs to; each area rewrote its sections again, and one integrating seat merged the five rewrites
into `docs/ARCHITECTURE.md`, applied every change one area asked of another and settled seven places where the drafts did
not fit together. The table says, for every item, what happened to it and where the fix now lives. Every item is
**FIXED** (the architecture now contains a mechanism that defeats the failure the checker wrote down); none was found
factually wrong (**INVALID**), none belonged to a later stage of the owner's roadmap (**STAGED-BY-OWNER**), and nothing
was deferred. All six seats were opus stand-ins for Fable seats; the work is queued for Fable review.

Sources: the area drafts `docs/validation/fix-all/r2-{kernel,determinism,pipeline,rendering,scope}.md` (each item's full
mechanism is in its owner's draft), the verifications that raised the items `docs/validation/fix-all/r1-verify-*.md`,
and the integration record `docs/validation/fix-all/r2-integration-log.md` (conflicts C-1–C-7).

### §R2.1 Disposition of every item handled in round 2

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r2)

**Counts:** 99 items — **99 FIXED** (1 of them a duplicate fixed with its primary: N-21 → NF-P9), **0 STAGED-BY-OWNER**,
**0 INVALID**, **0 deferred**. By owner area in round 2: kernel 24, determinism 16, pipeline 18, rendering 27, scope 14
(LC-17 moved from rendering to determinism and COV-VG-VN-029 from rendering to pipeline, because the residual text sat
in those areas' sections). By source: 9 round-1 items the verifiers judged UNRESOLVED (GEO-3, GEO-5, GEO-35, LC-7,
LC-17, COV-VG-VN-029, COV-NG-XB32, FTG-22, IMP-7) and 90 new findings (VK-1–VK-19 from the kernel verification; NF-D1–NF-D16
from the determinism verification; NF-P1–NF-P14 from the pipeline verification; N-1–N-29 from the rendering
verification; NF-S1–NF-S12 from the scope verification — each id listed below under the area that fixed it). By
severity: 26 major, 71 minor, 2 coverage (1 medium, 1 low); no blocker. "where" names the owner area and its sections;
"X:" or "[…]" marks sections other areas changed for the item; a trailing "integration C-n" names the conflict
resolution that shaped the final text.

| id | source | severity or kind | disposition | where in `docs/ARCHITECTURE.md` | one-line reason |
|---|---|---|---|---|---|
| GEO-3 | redteam-geometry (UNRESOLVED in r1-verify-kernel) | major | FIXED | kernel: §3.1, §3.2 (1)–(3), §3.6; X: §13.1, J-K2 | a vertex whose exact foot lies within `attractCm` of an edge's endpoint moves onto that endpoint; every new vertex on an existing edge (split foot, stretch join or leave point, crossing) is placed by one placement rule that keeps `minEdge` … |
| GEO-5 | redteam-geometry (UNRESOLVED in r1-verify-kernel) | major | FIXED | kernel: §2.2 (types; rules 5, 7), §3.4 (`resolveVertexAt`, `signature`, `pinVertices`), §3.6 (held vertices), §3.9; X: §2.4, §2.5, §2.7, II.1, §7.1, §7.4 | (a) every entity-held vertex carries an indexed role (`attach`, `anchor`, `weld`, `deck_end`; gate openings are `gate_opening` sub-edges) and no entity record stores a position; (b) a log position carries a `VertexSig` and binds by exact … |
| GEO-35 | redteam-geometry (UNRESOLVED in r1-verify-kernel) | minor | FIXED | kernel: §3.1 (curves row), §3.2 (2), §3.3 (`CommitRecord.moved`), §3.6 (whole-step validation), §3.10; X: §7.4 | a warp or smoothing step also requires every edge incident to a moved vertex (re-seats and slides included) to be ≥ `minEdge` and no two vertices on one lattice point, else it halves; §3.10 checks new *and moved* edges from the commit … |
| VK-1 | r1-verify-kernel (new finding) | major | FIXED | kernel: §2.2 (rule 6, `LevelFaces.stage`), §3.1 (`E_KEPT`), §3.3 (kept content, `rederivesFrom`), §3.4 (`clearFiner`, `corridorUnion`), §3.6, §3.7, §3.9 … | each face records its stage rank; a batch clears finer content only from its `rederivesFrom` stage on; finer faces of earlier stages are kept obstacles (`E_KEPT`) — integration C-1: the band parts stand in L1 wall strips built after S9 (NF-P5, J-P29), so the one-click order makes no kept content and the rule is the safety net and the basis of clear regions (J-I10) |
| VK-2 | r1-verify-kernel (new finding) | major | FIXED | kernel: §2.2 (`ChainProfile`, rule 5, knot roles), §2.3 (`bankKinds`, `shoreClass`, `course`), §3.4 (`insertChain` knots, `bandUnion`, `kerb` … | varying chain attributes are knot profiles: values at vertices carrying an indexed knot role, interpolated by arc length (linear) or held (step); splits, attraction, crossings, promotion and warp never change them; `kerb`, `bandUnion` and … |
| VK-3 | r1-verify-kernel (new finding) | major | FIXED | kernel: §3.1 (`E_SCOPE`), §3.3 (the pool's five steps), §3.10 (pool-scope row); X: §4.1, §4.9, §6.5, §11.2, §12.4, §12.8 | each pool worker gets a read-only transferred copy of the arena frozen after S10a (no `SharedArrayBuffer`); one copy-on-write overlay per district from that base; `E_SCOPE` on a write outside the district and at merge; lineage-order merge … — integration C-3, C-7: S10's shared-edge step (wall parts, margin bands) runs eagerly before the freeze; the pool scope is defined exactly (J-I9) |
| VK-4 | r1-verify-kernel (new finding) | major | FIXED | kernel: §3.1 (booleans row), §3.7; X: §13.1 | the oracle comparison is split by our engine's attraction warnings: unattracted cases strict (equal face counts, symmetric difference ≤ perimeter × 1 cm), attracted cases valid and within perimeter × √2 · `attractCm`; ≥ 10⁵ unattracted … |
| VK-5 | r1-verify-kernel (new finding) | major | FIXED | kernel: §3.7; X: §2.6, §12.4, §12.7 | the kernel's M0 bar is S11's geometry share, ≤ 3 µs per plot median (≤ 25 µs compound), inside one S11 row of 5 µs whose other 2 µs are rules; a stage-3 `outline()` at 10 µs re-declares the row when it registers |
| VK-6 | r1-verify-kernel (new finding) | major | FIXED | kernel: §3.2 (4), §3.3 (two forms), §3.4 header; X: §4.1, §6.5 (9), §13.1, §14, §16 | declared form (independent ops, canonical order, permutation test) and callback form (issue order, issue-order determinism test); S5c, S8 and S10 are callback-form |
| VK-7 | r1-verify-kernel (new finding) | major | FIXED | kernel: §3.6 (moves); X: §7.1, §7.4, §13.1 | a vertex on an edge of level < `fromLevel` slides: its displacement is projected on the fixed route, kept `attractCm` from the route's fixed vertices and re-seated within 0.71 cm; shore-junction warp fixture |
| VK-8 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §3.2 (1), (6), J-K13 | bbox-relative terms < 2⁴⁸ from the range invariant; the double partial is flushed to BigInt when it reaches 2⁵², so `area2` is exact for every ring `snap` can produce; `area2Big` for self-crossing operands |
| VK-9 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §2.3, J-K12; X: §4.2 S1 (3), §12.4, §13.1 | `Terrain.hydro` grid over frame + margin at 16 / 25 / 32 m — the old cell counts, measured at the old cost; `flowAt` samples it; D8 recomputed on the carved corridor; the 3 000 m fixture counts its land cells |
| VK-10 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §3.1 (skeleton row), §3.8, J-K21 | the exact OBB roof path requires a convex footprint; gable ends taken on the footprint; the notched counter-example (executed) now takes the skeleton |
| VK-11 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §3.7, J-K8 | a miss > 2× builds the accelerator; ≤ 2× builds it only if the stage row breaks, else a declared budget amendment; a remaining miss re-declares the model budget as a D-18 amendment; X: §16 M0 |
| VK-12 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §3.7 | the pointer reads §6.5 (10) |
| VK-14 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §3.1 (index row), §3.3, J-K6 | a total canonical key per item kind: vertex (y, x); edge by its endpoints, lower first; face by its canonical ring's first two vertices; vertex < edge < face |
| VK-15 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 (`LevelIndex`), §3.1, §3.3 | tombstones filter static-partition hits only; a reused slot's new item lives in the grid, so reuse cannot hide it |
| VK-16 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §3.1 (predicates row) | `robust-predicates` 3.0.3, Unlicense, registry-confirmed (`redteam-improve.md` §5.1), pinned and re-checked by §17.4; pre-decided fallback an in-house BigInt `incircle` |
| VK-17 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §3.2 (2), §3.6; `docs/validation/bench/` | the round-1 script and output are committed (`fixall_kernel_r1_attract_check.*`, reproduced) with the round-2 measurement (`fixall_kernel_r2_attract.*`); §3.2 and §3.6 cite only these |
| VK-18 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 3, §3.3 (`CommitRecord.promoted`), §3.6, J-K11; X: §6.2, §7.4, II.1 | finer vertices on a route the chain ends on or joins are attraction candidates; an attracted one is promoted to the batch's level (listed; undo restores) — chosen over clearing and re-deriving the neighbour |
| VK-19 | r1-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 3 | the stage-2 T-junction example is removed (II.1 inserts it at level 1); a band's cross edge on its wall is the example instead |
| NF-D15 | r1-verify-determinism (new finding) | minor | FIXED | kernel: §3.1 (deterministic-maths row) | **build**: our TypeScript port of fdlibm 5.3 with Sun's notice (D-23, J-11, §17.4) |
| N-19 | r1-verify-rendering (new finding) | minor | FIXED | kernel: §3.8 | roofs are cached by (entity, content revision, roof construction), never by id alone (§8.1 (5)) |
| NF-S8 | r1-verify-scope (new finding) | minor | FIXED | kernel: §3.1 (predicates and deterministic-maths rows) | aligned with §17.4 and D-23: `dmath` built; `robust-predicates` 3.0.3 Unlicense, confirmed |
| VK-13 | r1-verify-kernel (new finding) | minor | FIXED | determinism: §6.5 [§3.7] | byte identity is required of the WebAssembly accelerator only; the Clipper2-WASM fallback is a different engine, adopted as a declared golden shift and checked for identical digests across hosts |
| LC-7 | redteam-lifecycle (UNRESOLVED in r1-verify-determinism) | major | FIXED | determinism: §5.2, §5.3, §6.3, §7.1, §7.2, §7.3, §7.4 [§2.2, §2.6, §4.2, §4.3, §4.7, §4.8, §13.2] | the S1 water operator re-sites crossing decks on the re-traced reach and chains the S4, S5, S6 and S7 operators; F-REDERIVE gains way rungs (re-route through a deck, else cut at the bank and prune the stub; a deck over land becomes … — integration C-4: S1's water operator re-carves the reach with a clear region (J-I10) |
| NF-D1 | r1-verify-determinism (new finding) | major | FIXED | determinism: §2.9, §6.3, §6.5, §7.1, §7.4 [§11.2, §11.3, §13.2, §14, §16] | `{t:'undo'; of}` and `{t:'redo'; of}` are log events applied at the head through the same fold, with per-session stacks and a conservative independence check; truncation only in unshared documents, with a canonical `nextSeq` so the model … |
| NF-D2 | r1-verify-determinism (new finding) | major | FIXED | determinism: §2.9, §6.4, §6.5, §7.6 [§10.4, §11.1] | packs recorded by id, version and content hash; every non-shipped pack's content is copied into the document's `packs` block; a link is refused (the `.plat` file or `&doc=` offered) when the recipe needs a non-shipped pack or `hostContent` … |
| NF-D3 | r1-verify-determinism (new finding) | minor | FIXED | determinism: §7.3, §7.4, §7.6 | §7.3 (5) reads "derivation record"; slice invalidation reads persisted `DerivationRecord.slices` where present, rebuilt provenance otherwise, and takes the first-reader-stage fallback where neither exists |
| NF-D4 | r1-verify-determinism (new finding) | minor | FIXED | determinism: §2.9, §7.4, §7.5 | an upgrade's undo record is its `from` output version (undo = a replay under the retained version); a rebase's undo record is its previous base — the recipe, always kept, or an earlier rebased state under the undo cap; past the cap, or … |
| NF-D5 | r1-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 [§3.9] | snapshots are stored as content-addressed chunks per district partition, so `model` shares every unchanged chunk with `base.state` (and is only a chunk list while the post-rebase log is empty); saving always writes `model`; a model-less … — integration C-6: district boundaries are L1 edges, so the chunk argument holds |
| NF-D6 | r1-verify-determinism (new finding) | minor | FIXED | determinism: §5.1, §7.1 [§13.2] | after New random each scope entity's content digest (identity left out) is compared; an unchanged one advances its reroll up to k = 3 more times, then keeps its old reroll and is reported; the event stores the rerolls used; B-EDIT … |
| NF-D7 | r1-verify-determinism (new finding) | minor | FIXED | determinism: §6.3, §7.8 [§12.6] | succession matching: grid buckets of the hysteresis radius per kind and class family, ≤ 2 µs per entity (measured 0.4–0.6 µs), district-partition-first matching as the fallback; a failing control's expansion row becomes a smoothstep over … |
| LC-17 | redteam-lifecycle (UNRESOLVED in r1-verify-rendering) | major | FIXED | determinism: §7.4 | the MFCG-asks row reads "`moveLabel`, `hideLabel` — `LabelEntity.pinned` / `hidden` only (model data, in the digest); 0 other model changes; placement is view data" |
| N-1 | r1-verify-rendering (new finding) | major | FIXED | determinism: §2.9, §7.3, §6.5 [§8.1, §12.6, §13.2] | replay mode suppresses only S14 and S13b; S13a's scoped delta runs at each event's log position as in the session; B-EDIT fixture: two scoped regenerations drawing the same street name, then a `moveLabel` — replay digest = session digest |
| N-17 | r1-verify-rendering (new finding) | minor | FIXED | determinism: §5.2 | the F-LABEL row repeats §9.4's seven rungs in order |
| N-18 | r1-verify-rendering (new finding) | minor | FIXED | determinism: §6.1, §7.1, §7.4 [§14] | `labels` leaves `rerollLayer` and the salt list; only concerns that a registered stage or paint program draws from are rerollable, enforced by a registry test |
| N-29 | r1-verify-rendering (new finding) | minor | FIXED | determinism: §2.1 | §2.1 points to §8.4's `LayerSpec` instead of restating it |
| NF-S9 | r1-verify-scope (new finding) | minor | FIXED | determinism: §7.1 | the warp table's Measure row points to §9.5's measure tool (view data, no model event) |
| NF-S10 | r1-verify-scope (new finding) | minor | FIXED | determinism: §5.1, §5.2 [§4.12, §14, §13.2] | work limits are laws `floor + perUnit × count(unit, scope)` over the batch scope's population-derived counts, so they follow population inside a rung and a scoped re-run gets the same limit; §13.2's sweeps check the F-WORK hit rate is flat … |
| NF-P1 | r1-verify-pipeline (new finding) | major | FIXED | pipeline: §4.2 (S3 rewritten), §4.3, §4.4 (S5a, S5d), §4.8, §4.1, §2.7; XR K4, D6, D8, R1, S2, S3 | One construction: S3 solves the gate routes on its lattice, computes the one travel-cost field over them, takes the stage-1 boundary as its level set, puts each gate at the first crossing of its route with that boundary, sites the castle … |
| NF-P2 | r1-verify-pipeline (new finding) | major | FIXED | pipeline: §2.6, §4.7 S11; XR K4, R4 | `BaseWing { kind: 'rect' |
| NF-P3 | r1-verify-pipeline (new finding) | major | FIXED | pipeline: §4.9, §4.5 S7b (4), §2.5, §2.7, §4.1, §4.7; XR D3, S5 | S12b writes only inside its own faces: avenue and street-tree rows are `Greenery.along` rows in the planting district's own half-corridor strip (no plat edge); edge orchards are hinterland `Allocation` rows drawn at S7b and built by the … |
| NF-P4 | r1-verify-pipeline (new finding) | major | FIXED | pipeline: §4.2 S3 (2), (10), §4.3, §4.4 (outer moats), §4.8, §2.7 `Bridge` | S3 emits pinned decks of S1's form for the water it carves: one per main gate across a city moat, one at the castle gate across a castle moat, canal decks at a spacing row; S4/S5 route through them as fixed edges; S7 builds the bridges. … — integration C-4: outer-moat and edit carves insert with a clear region (J-I10) |
| NF-P5 | r1-verify-pipeline (new finding) | major | FIXED | pipeline: §4.8, §4.6, §4.7 S10 (0), §2.5, §2.7; XR K1, K5, D8 | S7 cuts two L1 wall strips off the faces beside each trace (band + setback, bounded by the setback line or intervallum; band + setback + glacis or berm); S8 never cuts a strip and its lanes end on it; the band, tower and gatehouse L3 parts … — integration C-1 (the pipeline's order kept) and C-3 (the strip parts eager, before the pool; J-I9) |
| NF-P6 | r1-verify-pipeline (new finding) | major | FIXED | pipeline: §4.6 step 7, §2.5, II.1 (rule 6, `Seam`), II.4, II.5, §4.12, §4.1; XR K3, D1, D2, D4, S1 | Every S8 lane end on a district-boundary spine is a `baseLane` portal + `SeamAmendment` in the one shared `Seam` record both districts read; a portal gap keeps two districts' lanes off one vertex; a removed lane's vertex is dissolved; the … — integration C-5: dissolution limited to `split`-flagged vertices (J-I11) |
| NF-P7 | r1-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.1 (per-level batch table), §4.2 S3 (10), §4.9, §4.11 | Every stage's batches listed per level; "S8 is the only stage after S5 that writes L1" replaced by the true list (S3–S8, never after S9); the stray "separate L1 transaction" clause deleted (later lanes are `drawWay` edits under §7.3) … |
| NF-P8 | r1-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.1, §4.9; XR R1, R2 | One stated position: S12a (siting, no geometry) runs after S7b and before S8; the hinterland unit (its S10–S12b at L3/L4) runs on the generation worker concurrently with the pool as one more overlay of disjoint faces, committed in lineage … — integration C-2: kernel P14 declined; the hinterland unit is an overlay in §3.3; C-7: a headland along the perimeter keeps it off the shared edge (J-I9) |
| NF-P9 | r1-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.5 (quarters); XR R3 | City cut at `min(N_q, L)` nodes (L = districts grown); TOWN figure corrected to 9–10 (N_q) with the cut 5–11 across the TOWN band; executed: 8 / 13 / 17 against MFCG's 9 / 12 / 18 at the matched sizes (±1); §9.4's `min(12, districts)` bar … |
| NF-P10 | r1-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (1), (2), (4), (6), §4.3 | T partitioned by nearest source nucleus; separation floor `τ(a)·(R_i+R_j)` + both setbacks and glacis + 30 m (≈ 800 m for two 29 ha TOWN nuclei; τ from the executed tip factors); re-site ≤ 3, then merge under one enceinte with a cross … |
| NF-P13 | r1-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.5 S7b (5), II.6, §2.5 | S7b creates each sky pseudo-district's `Allocation` first, before islands exist, from `IslandRule.areaHaBand` × the dense core's plot share ÷ band plot area, richest band down; `SkyStrategy.place(…, allocations, …)` takes them as declared … |
| NF-P14 | r1-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.11; XR K2, D7 | `carve` way rule by class: arterials and sole connections kept with a perpendicular pinned deck via S4's local operator; other classes cut at the bank setback, stubs pruned, access restored by S5's local operator or an alley, else … — integration C-4: the carve inserts with a clear region, promoting its prepared vertices (J-I10) |
| NF-D8 | r1-verify-determinism (new finding) | minor | FIXED | pipeline: §10.4 | `rosterPatch: { table, baseVersion, ops: RowOp[] }[]` — rows by key with `baseRowHash`; a changed or vanished base row (or an insert on an existing key) is an orphan, kept and reported as in §7.6. |
| NF-D9 | r1-verify-determinism (new finding) | minor | FIXED | pipeline: §2.5, §4.5 S7b (1), §4.7 S10a | `Allocation.stream` removed; S7b draws from the town's `alloc.district` stream and S10a from each district's `alloc.block` stream, derived from lineage on demand. |
| NF-D16 | r1-verify-determinism (new finding) | minor | FIXED | pipeline: §4.1 | "The model digest covers the eager model …", with the document digest named as the separate hash of the canonical bytes. |
| COV-VG-VN-029 | coverage-audit-vg (UNRESOLVED in r1-verify-rendering) | coverage (medium) | FIXED | pipeline: PART III | Item 5: VG's spotlight vignette and grass-tuft look as `painterly` programs; hillshade, contour and hachure marks are the base relief tier (§8.2); "does not pay for" now names VG's spotlight and painterly look, not the relief renderer; the … |
| N-20 | r1-verify-rendering (new finding) | minor | FIXED | pipeline: §4.1 | "The tile worker rasters tiles from the display list and the main thread only composites them (§8.9)." |
| N-21 | r1-verify-rendering (new finding) | minor | FIXED (dup of NF-P9) | pipeline: §4.5 | as NF-P9: the cut is `min(N_q, L)`, so ≈ 440 buildings (N_q 7, districts 5–6) cut at every district. |
| NF-D10 | r1-verify-determinism (new finding) | minor | FIXED | rendering: §8.1 (new `key` column, item 5), §8.2, §8.3, §8.10 | every render-time hash is `RH32(tag, key, salt[, ordinal / cell][, style id])` over the entity's 64-bit lineage hash carried in the mark table, never the session-local handle; tint order by address; a reload / two-derivation-order … |
| NF-D11 | r1-verify-determinism (new finding) | minor | FIXED | rendering: §8.10; §3 → §7.1, §7.4 | an override applies by ordinal only while no `carry` or supersession follows its event **and** the ordinal still lies within 0.5 × spacing of the recorded `point`; otherwise it re-matches by position (claim-once, log order), else orphaned … |
| NF-D13 | r1-verify-determinism (new finding) | minor | FIXED | rendering: §12.3 | "merged in district lineage order (§4.1, §6.3)" |
| NF-P12 | r1-verify-pipeline (new finding) | minor | FIXED | rendering: §12.3 | the same sentence |
| NF-D14 | r1-verify-determinism (new finding) | minor | FIXED | rendering: §11.2, §11.3; §3 → §14 | `ApplyResult` = ok / conflict / `confirm { token, fates, counts, scope }`; `PlatApi.confirm(h, token, fates)` and `cancel`; resubmitting the event with `fates` filled is the same operation (commits only if a fresh dry run computes the same … |
| COV-NG-XB32 | coverage-audit-ng-shared (UNRESOLVED in r1-verify-rendering) | coverage (low) | FIXED | rendering: §11.1, §8.10 | GeoJSON tree MultiPoint gains `species[]` (per-tree features `species`); CityJSON `SolitaryVegetationObject` per instance with `species`, `crownDiameter`, `height`; glTF instancing node per (green entity, crown class) with per-instance … |
| N-2 | r1-verify-rendering (new finding) | major | FIXED | rendering: §12 intro, §12.3, §12.5, §12.9, §8.5; §3 → D-18, J-R17, J-R7, J-I2, §1.2, §4.1, §15.1, §16 | first map as laws of B: TOWN ≤ 40 ms + 70 µs × B, CITY ≤ 60 + 60, METROPOLIS ≤ 120 + 62 (model law + F(B) ≤ 20 ms + 10 µs × B); one second holds for every TOWN and CITY and METROPOLIS ≤ ≈ 14 200 buildings (≈ 48 000 people); ≈ 2.3 s at the … |
| N-3 | r1-verify-rendering (new finding) | major | FIXED | rendering: §8.2, §9.4, §8.3; §3 → §13.4 | halo = the local role when text passes the label floor, else `ground` (guaranteed by the ink / ground row); matrix gains ink / paper (label floor), ink / building (30 / 40), ink / tree (25 / 30); `lit` ink → `#34281E`, `hatched` ink → … |
| N-4 | r1-verify-rendering (new finding) | major | FIXED | rendering: §8.1 (`LabelTable`, `InstanceTable`, `StringTable`), §8.2 (live layers), §8.6, §8.9 (threads, crossing rows), §8.10, §12.7, §12.8 | providers, override resolution, on-demand bands, `compose()` and close-ups run in the generation worker or pool; the tile worker holds no model and receives label, instance and string rows and band answers as transferred `DisplayDelta` … |
| N-5 | r1-verify-rendering (new finding) | major | FIXED | rendering: §8.8, §8.9, §12.5; §3 → §15.1 | base and labels composed into one bitmap per tile in the tile worker; the ≤ 4-per-frame cap applies to gestures only, first paint and settle commit every ready tile; tile count (P = 35 at 1 440 × 900 @2) and per-tile / per-building raster … |
| N-6 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §8.5 | bounded = covered share ≥ 0.8 on **both** sides and width ≥ the 1.5-px closing; drawn whenever access-critical and below 0.8 on either side; mass closing never crosses a drawn way's corridor; metric uses the same definition |
| N-7 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §8.1 item 3, §8.2 (order note), §8.8, §8.3 | slot-major across the scene, passes inside a slot; way casings / bodies are separate slots; bridges cased on their sides only; census asserts the logged (slot, pass) sequence is non-decreasing |
| N-8 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §8.4, §8.8 | path-mode sun quantised to 1° in the tile key; shadows in their own half-resolution per-tile layer between `under` and `over` base layers where the budget admits, so a step re-rasters only shadows; latest-wins; M2b measurement with a 3° … |
| N-9 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §8.8 (a, b), §8.1 item 6 and §12.8 (c), §8.4 (d) | (a) m_k per CSS px, tile side 512 × m_k ÷ d; (b) budget 3P + 7 MB from the viewport, tier ceilings 72 / 128 / 192 MB with a tile-DPR step-down rule; (c) 54 B per mark, ≈ 10 MB display list at CITY, one full copy; (d) §4.2 S1 (2), §2.7, II.6 |
| N-10 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §8.10, §8.3 | `grid` rank = bit-reversed Morton (2-D van der Corput), `line` rank = bit-reversed index; band b draws r < s_b; census covers all three layouts |
| N-11 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §9.2, §9.4, §8.1 (`LabelTable.parent`) | rung 5 decided per stop from geometry before the greedy; the ancestor QuarterNode's own label is one candidate per stop with the highest yielding member's priority, the node's area and id; yielding members suppressed and reported |
| N-12 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §9.2, §8.2; §3 → §17.2, §16 | PR-tier CI (from M1) asserts `cmap` / `hmtx` / `glyf` and reports `smcp` / `onum`; the path per face is chosen by the test: the face's own features, else the family's OFL SC cut, else synthetic small caps at 0.75 cap height; lining figures … |
| N-13 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §11.1, §12.7, §8.9; §3 → §17.2 | SVG text as glyph outlines (`<defs>` + `<use>`, text in `aria-label` / `<title>`) by default, or editable text in the unmodified face embedded as an `@font-face` data URI; both counted in the SVG budget; CI renders each in its target … |
| N-14 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §11.1 | default strict RFC 7946 WGS84 via an inverse transverse Mercator at the geo anchor (default 0° / 0° / 0°, `plat` foreign member, 7 decimals, no `crs`); metric variant by prior arrangement with a sidecar; CityJSON carries the anchor as … |
| N-15 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §11.3; §3 → §2.9 | the document style stays canonical (`setStyle`, owner / editor only); the view key becomes `stylePreset`, a per-viewer preset that never writes `setStyle` |
| N-16 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §12.6; §3 → §7.3, §2.9 (N-1 alignment) | V = M(B) + Σ c(e) + S14(B) + 5 ms with per-kind c(e); the reference mix (300 edits at CITY) ≈ 1.4 s; 300 district regenerations ≈ 11 s; measured at M2a with a pre-decided restatement |
| N-25 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §8.2, §8.5 | `ink` field → `#ECDFBF` (chroma 17.3); `ink` wall = ink; courts drawn as `ground` at the city band — eight city-band role colours, max chroma 17.3 |
| N-26 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §8.2; §3 → §6.1, §16 | bounded repair: fixed row order, ≤ 100 unit steps (raise lighter, else lower darker), sRGB re-check, ≤ 3 attempts from `style.random`, then the shipped palette; simulated fallback 0.4–0.9 %; M3b confirmation with a narrower-window fallback |
| N-27 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §12.1, §12.5, §12.7, §12.8; §3 → §13.8, §16 | (a) Chrome cross-check in the nightly tier, the Chrome figure governs a > 15 % gap; (b) `bench/calibrate` records memory, OS and browser versions (host facts read and recorded); (c) first map, settle, re-raster, SVG and PNG budgets … |
| N-28 | r1-verify-rendering (new finding) | minor | FIXED | rendering: §9.1 (`Placement`), §9.2 | `Placement` = stop, size px, anchor, spine, direction, lines; fixed pin at its own and finer stops, a yielding candidate (hidden and reported) at coarser stops; the dry run refuses pin-on-pin collisions at a pin's stop |
| NF-S7 | r1-verify-scope (new finding) | minor | FIXED | rendering: §12.9 | FTG compared at BIG_TOWN and BIG_CITY from M-1 (METROPOLIS per D-31); the existing timing is FTG's CITY preset, restated against PLAT's law at its 2 798 buildings |
| NF-S11 | r1-verify-scope (new finding) | minor | FIXED | rendering: §8.2 | the texture generator is `plat/tools/textures/`; each asset names script and seed |
| NF-D12 | r1-verify-determinism (new finding) | minor | FIXED | scope: §14 [§6.1 determinism, §9.5 and §8.10 rendering] | `StageContext.stream(concern: ConcernId, entity: Handle, opts: StreamOpts { reroll, attempt, epoch, salt })` over the kernel's one structured mixer (`rng.stream`), with `streamOpts()` filling the defaults; town-level and per-document … |
| NF-P11 | r1-verify-pipeline (new finding) | minor | FIXED | scope: §15.1, §1.4 | NG B8 now reads II.2's radial-free `RingFabric` (rings are the only seed geometry; radials come from each annulus's bent cut, staggered); NG B1 points to II.1 rule (5) and §4.2 S1 (2)'s outline templates; MFCG B6 names §4.8's in-place … |
| N-22 | r1-verify-rendering (new finding) | minor | FIXED | scope: §14 | `TileBackend` shadows `'off'\\|'drop'\\|'prism'` (§8.2's values); dependency chain `… plots ← labels ← render ← edit …`; S13b's render inputs arrive as parameters through `ObstacleSource` and `RoleIndex`, declared by `@plat/labels` and … |
| N-23 | r1-verify-rendering (new finding) | minor | FIXED | scope: §16, §13.4 | M2b builds `ink`'s neighbourhood close-up (with the roofs) and its building band, and `lit`'s four bands; M5 builds `hatched`'s city, district, neighbourhood and building bands; B-ZOOM's role-continuity check runs from M2b for `ink` and … |
| N-24 | r1-verify-rendering (new finding) | minor | FIXED | scope: §13.3, §13.8 [§6.5 (9) determinism, §9.1 rendering] | a per-stop **placement digest** (label, chosen candidate, ladder rung, size, glyph positions as exact doubles) over the golden suite at B-ZOOM's 27 stops, stored with the goldens, compared on Node x86 in the PR tier and on the five engines … |
| FTG-22 | redteam-ftg (UNRESOLVED in r1-verify-scope) | minor | FIXED | scope: §17.1 (2), (9) [§2.9 determinism — already renamed in r2; §11.3 rendering; §10.3 pipeline] | the bridge token is `logHead` (`baseLogHead`, `currentLogHead`); §10.3's calendar sentence uses `view.set { time }` and the module command `sim.advance { hours }`; §17.1 scans this document at every integration pass, not only at M-1 … |
| IMP-7 | redteam-improve (UNRESOLVED in r1-verify-scope) | major | FIXED | scope: §15.2 O9 (c), §13.2, §13.8, §16 M3a, J-S4 [§7.3 item 7 (iv) determinism — the rank test is in r2; tie rule, campaign size and reference rerolls … | calibrated rank test: per statistic, the rank of the regenerated value among K = 50 from-scratch generations (rerolls 32 768 + i), ties broken by a uniform draw, χ² on a 10-bin histogram, Holm at family-wise 0.01, n = 400 regenerated … |
| NF-S1 | r1-verify-scope (new finding) | minor | FIXED | scope: §13.3, §13.5, §13.6, §13.9, §14 | `ShiftRecord` and `CascadeRecord` JSON in `plat/goldens/shifts/o<k>.json`, `MilestoneRecord` in `plat/goldens/milestones/`, `D5Record` and the seed list in `plat/goldens/d5/`; `ShiftRecord`, `CascadeRecord`, `MilestoneRecord` defined in … |
| NF-S2 | r1-verify-scope (new finding) | major | FIXED | scope: §13.6, §16, D-1, D-5, judgment calls | one rule in §13.6 (7) and §16: a not-rated gating panel lets the build continue with the milestone's D-5 status recorded *provisional — not rated*; "the base at parity" (M2b), "mastered" (M4) and the stage-2 gate (M5) are claimed only by a … |
| NF-S3 | r1-verify-scope (new finding) | minor | FIXED | scope: §13.5 | FTG's turning per 100 m is a **target for organic presets** with the row's declared 0.5–1.5 × band (an exception to the band rule, stated with its reason) and a pre-decided `headingSigma` recalibration; the no-cliff and entropy clauses … |
| NF-S4 | r1-verify-scope (new finding) | minor | FIXED | scope: §15.2, §13.7 | S2, S4, S5 and S6 letters restated in the matrix with C / P / O classes (IMPROVEMENTS cited only for traceability); a §13.7 row gives S4's square-area band a number; **J-T** defined once in §13.7 |
| NF-S5 | r1-verify-scope (new finding) | minor | FIXED | scope: §13.5, §13.7, §16 M-1 | rows whose reference numbers come from M-1 are marked ⟨M-1⟩ with the pre-decided outcome "unmeasurable → descriptive, gates nothing, `known-defects.json`"; M-1's list gains every such measurement (MFCG streetwall continuity, lots per … |
| NF-S6 | r1-verify-scope (new finding) | minor | FIXED | scope: §13.7, §16, §13.2 [§5.3 determinism] | O19 (g) confirmed at M2b for `ink` and `lit`; M2a measures flat per-edit validation TOWN → CITY and M2b adds METROPOLIS |
| NF-S12 | r1-verify-scope (new finding) | minor | FIXED | scope: §15.1 | the NG table is headed "31 rows" |

### §R2.2 Conflicts settled at integration

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r2)

| # | the disagreement | resolution | judgment |
|---|---|---|---|
| C-1 | kernel VK-1 built the wall band as S7's kept L3 content before S8; pipeline NF-P5 cut L1 wall strips at S7 and built the band after S9 | the pipeline's order (a lane needs an L1 boundary to end on); the kernel's kept-content rule stays as the safety net; kernel, determinism and fixture text aligned (§2.2, §3.3, §3.7, §7.1, §7.3, §13.1) | J-P29, J-K14 amended |
| C-2 | kernel P14 had S12a commit its corridors and plots early; pipeline made S12a geometry-free with a hinterland unit after S9 | the pipeline's version; §3.3 names the hinterland unit as one more pool overlay | J-P27 |
| C-3 | the pipeline pooled the wall-strip parts, which split a trace two districts share — a merge-time `E_SCOPE` under the kernel's scope rule | S10's shared-edge step (0) builds them eagerly on both sides before the pool's freeze | J-I9 |
| C-4 | the pipeline needed local coarse insertion (carve, outer moat, re-carved reach) that the kernel draft never defined | adopted as §3.3's clear regions, with the pipeline's pre-decided fallback and an M3a confirmation | J-I10 |
| C-5 | "dissolve any role-free degree-2 vertex" would straighten a chain whose own shape vertex a removed lane had used | dissolution limited to `split`-flagged vertices | J-I11 |
| C-6 | "district boundaries are always spine edges" against the settlement perimeter and wall-trace boundaries | "always L1 edges"; the chunk argument of §2.9 / §3.9 holds | — |
| C-7 | the settlement perimeter (districts on one side, the pooled hinterland unit on the other) and shared reservation boundaries would be split by both sides' pooled lines; read literally, the scope rule also forbade waterfront plot lines ending on their bank | an exact scope definition (§3.3 step 3; splits allowed on boundary edges no other overlay writes) and a 2 m margin band on each side of every shared non-spine edge, laid by the eager shared-edge step (≈ 3 ms at CITY; CITY ≈ 251 ms p50) | J-I9 (extended) |

### §R2.3 Changelog of `docs/ARCHITECTURE.md`, round 2

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r2)

* **Size and marking.** 6 350 → 8 383 lines. 101 section headings carry the round-2 review banner (100 changed sections
  and the new §0.8); the title's revision note and §0.8 record the round; judgment calls grew from 111 to 175 rows
  (J-K9–J-K21, J-DET-16–J-DET-28, J-P26–J-P33, J-R19–J-R37, J-S20–J-S27 from the drafts; J-I9–J-I11 from integration;
  eleven rows restated and J-K14 amended).
* **Kernel (§2.2, §2.3, §3.1–§3.4, §3.6–§3.10).** An endpoint rule and one placement rule for every new vertex on an
  existing edge (0 short edges measured where round 1 left 1.34 %); role-carrying entity vertices and signed log
  positions; knot profiles for varying chain attributes; kept content by stage rank; two transaction forms; pool
  overlays on a frozen transferred arena copy; the hydrology grid over frame and margin; the convexity gate on exact
  roofs; exact `area2` under a 2⁵² flush.
* **Determinism (§2.1, §2.9, §5.1–§5.3, §6.1, §6.3–§6.5, §7.1–§7.6, §7.8).** River and terrain edits as chained local
  operators with re-sited bridges, F-REDERIVE way rungs and exact re-basing; undo and redo as logged events with
  per-session stacks; setting packs copied into the document and links refused without them; content-addressed snapshot
  chunks; replay with S13a per event; work limits as population laws; grid-bucketed succession matching.
* **Pipeline (§2.5–§2.7, §4.1–§4.9, §4.11, §4.12, §10.4, II.1, II.4–II.6, PART III).** The stage-1 boundary, gates,
  castle weld, trace and moat from one S3 construction; moat and canal decks at S3; L1 wall strips; `quad` wings for
  clipped row houses; S12b writing only its own faces and the hinterland unit on the generation worker; shared `Seam`
  records with `baseLane` portals; the quarter city cut at `min(N_q, L)`; twin-town separation; sky allocations before
  islands; the carve way rule; roster patches by row key.
* **Rendering (§8.1–§8.6, §8.8–§8.10, §9.1, §9.2, §9.4, §11.1–§11.3, §12, §12.1, §12.3, §12.5–§12.9).** First-map
  budgets as laws of the building count, with the one-second knee at ≈ 14 200 buildings and ≈ 2.3 s at the cap declared
  for veto; the halo rule and retuned inks; a tile worker that holds no model; base and labels composed per tile;
  render-time keys by lineage; strict WGS84 GeoJSON; SVG text as glyph outlines; fate confirmation in the API; a
  per-viewer style preset.
* **Scope (§1.2, §1.4, §1.7, §13.1–§13.9, §14, §15.1, §15.2, §16, §17.1, §17.2, decisions, judgment calls).** The
  calibrated rank test for New random with a randomised tie-break; the unrated-panel rule (*provisional*, never claiming
  parity); shift and milestone records inside the repository; ⟨M-1⟩ reference cells with pre-decided outcomes; the
  `@plat/model` home of the shared view types; `StageContext.stream` with structured options; every other area's
  requests of these sections folded in.
* **Integration (the summary, the title note, §0.8, §1.5, §2.4, §4.10, §6.2, §9.5, §10.3, §12.4, the staged list, and
  edits across §2–§16).** 50 cross-area requests applied and 7 conflicts settled (C-1–C-7): the shared-edge step —
  wall-strip parts and 2 m margin bands along the settlement perimeter — eager before the pool, with an exact pool
  scope (J-I9); clear regions for coarse edits (J-I10); the `split` flag for exact restoration (J-I11);
  district boundaries as L1 edges; §12.4 re-summed (CITY ≈ 251 ms p50, p95 ≤ 300 ms unchanged) with §12.3's p50 column;
  the stale §13.4 label bar, §13.1 fixture and §1.5 epoch wording corrected; the staged list's hooks brought up to date.

**What round 3 (or the Fable review) should weigh first.** (1) Shared edges in the pool: L1 wall strips with the band
built after S9, and the eager shared-edge step (wall parts, perimeter margin bands) before the pool (C-1, C-3, C-7;
J-P29, J-I9). (2) Clear regions (C-4; J-I10), new kernel semantics that the
carve, the outer moat and S1's water operator all rest on. (3) The first-map laws and the declared ≈ 2.3 s at the
METROPOLIS cap (N-2; D-18, J-R17) — an owner-veto item — and the unrated-panel rule (NF-S2; J-S20).


## §R3 Fix-all round 3 (2026-09-25): every item's disposition and the changelog

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r3)

*In plain words.* After round 2, five checkers re-read the design against every round-2 fix. They accepted all of them
and found 55 new problems the rewrite had introduced or brought to light; the pipeline area found one more while fixing
its share — 56 items. Each went to the area of the architecture it belongs to; each area rewrote its sections, and one
integrating seat merged the five rewrites into `docs/ARCHITECTURE.md`, applied every change one area asked of another
and settled three places where the rewrites did not fit together — the largest: a bridge's deck is its road's own edge,
the same after an edit as at generation, and every canal or moved river prepares every place where the new water will
meet a street, a wall or a district edge before the water goes in. The table says, for every item, what happened to it
and where the fix now lives. Every item is **FIXED** (the architecture now contains a mechanism that defeats the
failure the checker wrote down); none was found factually wrong (**INVALID**), none belonged to a later stage of the
owner's roadmap (**STAGED-BY-OWNER**), and nothing was deferred. All six seats were opus stand-ins for Fable seats; the
work is queued for Fable review.

Sources: the area drafts `docs/validation/fix-all/r3-{kernel,determinism,pipeline,rendering,scope}.md` (each item's full
mechanism is in its owner's draft), the verifications that raised the items `docs/validation/fix-all/r2-verify-*.md`,
and the integration record `docs/validation/fix-all/r3-integration-log.md` (conflicts C-1–C-3).

### §R3.1 Disposition of every item handled in round 3

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r3)

**Counts:** 56 items — **56 FIXED**, **0 STAGED-BY-OWNER**, **0 INVALID**, **0 deferred**. By owner area in round 3:
kernel 9, determinism 17, pipeline 11, rendering 8, scope 11 (VK2-2 and VK2-12–VK2-16 of the kernel verification, VP2-4
of the pipeline verification and NR-8 of the rendering verification were fixed by the determinism area; VP2-9 by the
kernel area; VK2-10 and VK2-11 by the pipeline area; VD2-6 by the rendering area; NR-9 and NR-10 by the scope area,
because the text sat in those areas' sections). By source: 55 new findings of the round-2 verifications (VK2-1–VK2-16,
VD2-1–VD2-10, VP2-1–VP2-10, NR-1–NR-10, VS2-1–VS2-9) and one found by the pipeline area while fixing VP2-10 (R3-P1); no
round-2 item was judged UNRESOLVED. By severity: 6 major (VK2-1, VK2-2, VK2-3, VD2-1, VP2-1, NR-1), 50 minor; no
blocker. "where" names the owner area and its sections; "X:" or "[…]" marks sections other areas changed for the item; a
trailing "integration C-n" names the conflict resolution that shaped the final text.

| id | source | severity or kind | disposition | where in `docs/ARCHITECTURE.md` | one-line reason |
|---|---|---|---|---|---|
| VK2-1 | r2-verify-kernel (new finding) | major | FIXED | kernel: §3.3 (pool step 1, step 4, the index paragraph, J-K25), §3.1 (index row), §2.2 (`LevelIndex` comment), §3.10 (two rows) | S10's eager step (0) ends by rebuilding the L3 static partitions it touched (≈ 9 000 items, ≈ 2.3 ms at CITY by the measured build rate) before the freeze; the frozen copy carries the L0–L3 static partitions; the freeze asserts every dynamic grid and tombstone set empty; and each level's index holds only items born at that … |
| VK2-3 | r2-verify-kernel (new finding) | major | FIXED | kernel: §2.2 rules 3 and 7, §3.1 (`E_LEVEL`, `W_PROMOTED`), §3.3 (`KernelTx.prepared`, clear-region rules 1–3, J-K24), §3.6 candidate (c) and fixtures, §3.10; X: §4.1, §4.11, §6.2, §7.3 (b), §13.1, §16; integration C-1, C-2 | a coarse insertion names its permitted contacts by role in `KernelTx.prepared` — deck bank vertices, water-gate vertices, the anchors of a boundary cut at the bank — attracts onto and promotes exactly them and never shares a finer edge; any other contact is `E_LEVEL` inside the clear region and `E_KEPT` outside; the deck span … |
| VK2-4 | r2-verify-kernel (new finding) | minor | FIXED | kernel: §3.3 index paragraph and J-K6, §3.1 index row | a level-n query returns level-n items keyed on the level-n route: an edge by its level-n route edge's endpoints (never a sub-edge's), a face by the first two vertices of level ≤ n on its outer ring from the lowest-leftmost such vertex, a doubly visited vertex taking the smaller successor; measured: the full-ring key reverses … |
| VK2-5 | r2-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 3 (`split` flag paragraph) and `flags` comment, §3.6 moves (flag rule) and J-K26 | a move clears the `split` flag of every vertex it displaces except a Steiner vertex re-seated onto its coarser edge's route and a vertex sliding along a fixed route (dissolving either still restores that edge exactly); promotion clears it too, because a promoted vertex is one of the coarser chain's own vertices |
| VK2-6 | r2-verify-kernel (new finding) | minor | FIXED | kernel: §3.6 slides and re-seats, J-K17 and J-K18 amended, §3.1 `W_PLACED` comment | re-seats and slides choose their lattice point by the placement rule's (i)–(iii) on the moved geometry, never plain rounding; measured 12.9 % → 0 failures; the verifier's 25.3 cm fixture made constructive (a vertex 25.35 cm from the warped kerb: plain rounding 24.999 cm and halves, the rule 25.999 cm and commits) |
| VK2-7 | r2-verify-kernel (new finding) | minor | FIXED | kernel: §3.3 kept-content bullet (`E_KEPT` for insertion and clearing only; a move's `rederivesFrom`), `KernelTx.rederivesFrom` comment, §3.6 moves (held set, fixed routes) and J-K27, J-K14 amended, §3.4 `warp` and smoothing, §3.10 rows | (a) a warp or smoothing batch keeps nothing: `rederivesFrom` = the first stage that writes `fromLevel` (S1/S3/S9/S10/S11), and `E_KEPT` governs insertion and clearing only; (b) the held set is every level-n route vertex of a locked or pinned entity's resolved geometry (all `FaceRef` rings, holes included) and of every finer … |
| VK2-8 | r2-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 5 (cut and join sub-bullet) and J-K23, `ChainProfile.values` comment, §3.4 `retypeEdges` (`rekey` returns both profiles; `ordinalOffset` removed) | a cut of a profiled chain gives each part a cut knot at the cut vertex carrying the exact sampled value (step: the held value; a knot vertex copied; a knotless part a scalar); a join drops a knot only where the joined profile samples identically; measured: 8.47 m → 6.8 × 10⁻¹³ cm largest change, re-join bit-exact 20 000 / 20 000 |
| VK2-9 | r2-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 types (`RoleHeadTable`, `OwnerTable`), *Size*, J-K22; §3.3 pool steps 1, 2 and 4 (tables in the copy; overlay-local tables and handles remapped at merge) | both tables are typed-array open-addressing hash tables (load ≤ 0.5, fixed hash, backward-shift deletion, lookups only), so the frozen copy is ArrayBuffers only; measured: a per-worker `Map` rebuild would cost ≈ 10–20 ms at CITY (≈ 62 ms at METROPOLIS) against ≈ 1.1 ms for the 12 MB copy |
| VP2-9 | r2-verify-pipeline (new finding) | minor | FIXED | kernel: §2.2 rule 1 | "(a spine, a wall line, a reservation boundary, a shore or the perimeter)"; §2.9's and §3.9's chunk argument needs only "an L1 edge" and is unaffected |
| VD2-1 | r2-verify-determinism (new finding) | major | FIXED | determinism: §7.3 (b) and its table row, §5.2 F-REDERIVE and F-EDIT, §5.3 (edit chains); X: §3.3, §3.6, §2.3, §13.1, §13.2, §16, J-DET-23; integration C-1, C-2 | S1's water operator runs in §4.11's order: the new water, crossing sites, S4 routes and wall runs as data; one L1 batch re-lays kept ways through their sited decks' bank vertices, re-traces crossed wall runs with water-gate bank vertices, cuts lesser ways at the setback and anchors every other crossed boundary (J-I13); one L0 … |
| VK2-2 | r2-verify-kernel (new finding) | major | FIXED | determinism: §7.3 item 2, its S6, S8–S11 and S12 rows, item 7 (vi), §7.1 (E_KEPT resolution) [§3.3, §4.5, §4.7, §4.9, §13.2] | a scope holding wall-strip faces or faces on the settlement perimeter or a shared reservation boundary re-runs S10's step (0) for its own side after its S8 and S9 — `bandUnion` restricted to its faces, cross edges attracted onto the other side's vertices; S6's operator re-lays margin bands where sharing changed and removes them … |
| VK2-12 | r2-verify-kernel (new finding) | minor | FIXED | determinism: §7.1 (event, table, addressing), §7.3 (b) 1, §7.4 (new row), §5.2 F-RIVER [§2.2 rule 5, §2.3, §4.2 S1 (3)] | `WaterBody.controls` (ordinals in course order, fresh ordinals on re-trace) as S1's recorded input; `moveCourseKnot { water; ordinal; at; to }` bound by the carried water address and the ordinal within half the control spacing, else the nearest knot of that body, else orphaned; an edited knot is implicitly pinned |
| VK2-13 | r2-verify-kernel (new finding) | minor | FIXED | determinism: §7.4 (warp row, new paragraph "Warp and what stands on the ground"), §7.1 (warp paragraph), §5.2 F-EDIT [§2.6, §2.7, §8.10, §9.1] | pins, point decorations, positional instance overrides (held in the entity's model override table) and pinned label placements move by their mean-value coordinates in their host face, are re-seated inside it at their clearance or fated and reported; protected ones are held (the warp halves); everything carried is re-based on … |
| VK2-14 | r2-verify-kernel (new finding) | minor | FIXED | determinism: §7.3 (a) 4 | the wall's `base` profile: changed knots take the new value; a changed trace vertex without a knot gains one |
| VK2-15 | r2-verify-kernel (new finding) | minor | FIXED | determinism: §7.3 (a) 2 | the drainage fallback runs over the whole hydrology grid, frame and margin, ≈ 16–17 ms at CITY |
| VK2-16 | r2-verify-kernel (new finding) | minor | FIXED | determinism: §6.5 (10) | "S10's shared-edge bands" added to the Clipper2 shift list |
| VD2-2 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §5.3 (crossing row) [§4.8, §13.2] | a `pier` or `quay` way whose connected pier and quay edges meet land in at most one land face is a harbour work standing in the water (pier, mole or breakwater arm, detached breakwater); one joining two land faces needs a deck; two-arm-mole and detached-breakwater fixtures |
| VD2-3 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §2.8, §7.4 (truncation), §6.5 (9) | the lifecycle block is ordered by `seq`; an undo removes its target's entries and tombstones, a redo re-inserts them, neither writes its own; a truncated redo advances `nextSeq` by one; the property test covers a redo followed by a user-created entity |
| VD2-4 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §7.4 (new "Sessions" bullet, Targets), §7.1 (`EditBase.session`), §2.9 (view key) [§11.2, §11.3] | a session is per document and author: minted once by `@plat/api` outside the model packages, stored in the unshared document's `view.keys['session']`, reused on every open; a bridged client takes the host's session from `doc.load`; the fold never reads it |
| VD2-5 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §7.1 (union comment), §7.4 (rerollLayer row) [§8.1] | §7.1 points to the registry without a list; §7.4's row adds compass and emblem; `DisplayList.salts` becomes `Record<RerollableConcern, number>` |
| VD2-7 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §6.2 | the recipe is §2.9's `Recipe` (packs by hash included); host tables are logged events; new bullet "no installed pack" |
| VD2-8 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §2.9, §6.4, §7.6, §5.2 F-EDIT [§10.4, §11.3, §11.4] | selecting a user corpus is an `adjust` of the pack list entering `user:<hash>`, `shipped: false` in `Recipe.packs`, so the link is refused (a new CI case); a provider output over the 2 MB cap is refused at the call and returns the requesting edit as F-EDIT |
| VD2-9 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 (chunks, size fallback, `ChunkRef`), §6.2 (three fallbacks) [§3.9] | cross-chunk references by lattice point; the coarse chunk holds level-≤ 1 routes and each partition chunk its own Steiner splits; fallbacks: per-block-group chunks then a declared amendment under the hard rung budget; root finalised only when read; CI recomputes one seeded subtree per layer and load compares maintained roots |
| VD2-10 | r2-verify-determinism (new finding) | minor | FIXED | determinism: §6.3 (new bullet "Names follow the address", fixtures), §6.1 (salt), §7.1 (`rerollLayer` `ids`), §7.3 item 2, §7.4 [§9.6, §10.4] | a successor of the same class family carries its predecessor's generated name with the address; S13a draws only for entities with no predecessor, under a town-wide `rerollLayer(naming)`, or an ids-scoped one with per-entity salts in the event; a carried-name collision re-draws the later address, reported |
| VP2-4 | r2-verify-pipeline (new finding) | minor | FIXED | determinism: §5.3 (NF-P5 row) | the row binds generation batches and every edit batch except those of an edit whose declared re-derivation re-runs that enceinte's step (0): tree scoping over strips, S7's operator, the water operator's re-traced runs, `wallToWay`, `contractWall` |
| NR-8 | r2-verify-rendering (new finding) | minor | FIXED | determinism: §2.9 load steps 3–4, §7.1 (`rebase.at`), §7.4, §6.5 (9); X: §11.3, §12.6, §12.8, §13.2, §16; integration C-3 | the displayed snapshot is the working state and edits apply at once; the verification replay runs in a pool worker to `h₀` (its model counted in place of the pool's frozen copies, J-I14); table and preset edits wait for its provenance; a mismatch is resolved by rebasing at `h₀` or re-applying the later events to the replayed … |
| VP2-1 | r2-verify-pipeline (new finding) | major | FIXED | pipeline: §4.11 (way rule, footprint, other crossings, batches), §4.4; X: §3.3, §7.3 (carve row, (b) 4), §13.1, §16, J-P34, J-I10; integration C-1, C-2 | the carve's one footprint `R` = channel ⊕ (`attractCm` + bank setback) ∪ every L1 cell its way rule touches (and every cell bordering a re-traced wall run) is the clear region, the re-derived set, the fate report's scope and the locality check less the seam exception; the preparation batch also re-traces crossed wall runs with … |
| VP2-2 | r2-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (5), (7), (10), new (11), (13), J-P35; §4.4; XR D5, S3 | The harbour route leaves S3 (5) and `T`'s road set and is solved in the new S3 (11), after the trace and the moat: inside the stage-1 region straight from the plaza; outside it through the **serving gate** found by one multi-source Dijkstra from every gate's exit (the far bank of its moat deck), so it leaves through a gate and … |
| VP2-3 | r2-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.5 S7b (3), §4.8; XR K5, S3 | S7b's claims are cut from the district's coarse faces other than its `wall_strip` faces (`claimSubFace`'s `within` is that face list); only S7's gate plazas use a strip's setback zone; a castle's esplanade is claimed beyond the outer strip; test: 0 claims meeting a strip. |
| VP2-5 | r2-verify-pipeline (new finding) | minor | FIXED | pipeline: §2.6, §4.7 S11 row, J-P39; XR K6, R5, S3, S5 | `BaseWing` comment: sides 1 and 3 are the party-wall chains (straight, or with the lot cut's one bend); the ridge joins arc-length midpoints; new `corners` field records the four side starts, set by S11 when it clips the row. |
| VP2-6 | r2-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.1, §4.5, §4.7; XR R3 | One width everywhere: "half-width 2 m (2 m on each side; a table value ≥ the residue class's minimum width)". |
| VP2-7 | r2-verify-pipeline (new finding) | minor | FIXED | pipeline: §2.5; receipt re-run; XR R1, R2 | "the `min(N_q, L)` nodes of its city cut"; `fixall_pipeline_r2_quarters.py` re-run with the J-P28 column `min(N_q, N_d)` and a header naming J-P28: it prints 8 / 13 / 17 at the matched sizes and "from 5 to 11" across the TOWN band, the numbers §4.5 cites. |
| VP2-8 | r2-verify-pipeline (new finding) | minor | FIXED | pipeline: §2.6 | "The shadow pass is §8.4's (optional, off by default, timed at M2b); the base populates every height and keeps the display list's shadow hook"; "a later 3-D export" → "the 3-D export (§11.1)". |
| VP2-10 | r2-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (8), (9), (10), J-P36; §4.7 S10 (0); §4.8; XR R4, S3 | An `on_enceinte` castle's moat is only its outer arc (the city moat's stretch there, or a channel clipped against the town wall's berm); the town side takes the castle row's `townSide` — a dry ditch (`ditch` residue in the bailey's town-side strip) or nothing; S3 (8)'s filter keeps every solved route off a planned castle moat; … |
| VK2-10 | r2-verify-kernel (new finding) | minor | FIXED | pipeline: II.1 (types, rule, J-P37), II.5, §4.7; XR D1, K7, S4, S5 | `SeamEdge.type` gains `'reserve'` with `reservation?: Id`; a type rule by role precedence (way, wall, water/cliff, reserve, field, frame, sky); a `reserve` run's shared geometry is the `reserved` chain and the margin band's two parts; `hard` by the reservation kind; II.5's M1 acceptance checks every seam edge typed. |
| VK2-11 | r2-verify-kernel (new finding) | minor | FIXED | pipeline: II.1 (3), J-P38; §4.6 step 7; II.4; XR K2, K3, K4, D4, S1 | The **neighbour step**: one L2 batch on the neighbour's half-corridor strip inserts one `corridor_split` from the junction vertex to the foot on the kerb — nothing cleared, no plot re-derived; its kerb end lands on (and promotes) a plot-line end within `attractCm`, else adds one kerb vertex; removal restores the kerb exactly; … |
| R3-P1 | r3-pipeline (found while fixing VP2-10) | minor | FIXED | pipeline: §4.2 S3 (9); XR D5, S3 | "The trace departs from the boundary by ≤ 40 m everywhere" contradicts an `on_enceinte` castle whose outer arc — the shared wall stretch — bulges up to the bailey's width beyond the boundary; the test now exempts that stretch. |
| VD2-6 | r2-verify-determinism (new finding) | minor | FIXED | rendering: §8.1 (the `key` columns, item 5, reasoning), §8.2 (multi-colour roles), §8.3 (census row), §8.10 (per-instance look), §12.8 (wording); cross: §6.1 (determinism), J-R19 (scope) | `RH32` is keyed by the **render key** = the low 64 bits (words 0–1) of the entity key, which mixes the seed key with the lineage hash, layer and island and is already cached in the arena; a census row checks that entities with equal lineage in two seeds' towns get different render keys |
| NR-1 | r2-verify-rendering (new finding) | major | FIXED | rendering: §12.3 (new table, declaration, max clause, measurement, fallbacks), §12 plain words, §12.9; cross: D-18, §15.2 O3 (d), §1.1 table header, §13.2 / §13.8, §16, J-R38 (scope) | per rung: where O3 (d)'s bar holds for p95 (B ≤ 1 333 / 5 200 / 17 300) and for the max (each generation ≤ 1.25 × its own law: B ≤ 1 000 / 4 000 / 13 460), band-bottom / default / top values, single-worker thresholds; the miss above declared for the owner's veto with reason and reversal cost; laws confirmed by the cost-model … |
| NR-2 | r2-verify-rendering (new finding) | minor | FIXED | rendering: §12 plain words | reworded to the laws: a town under a quarter second; a city under half a second up to ≈ 25 000 people and under 0.6 s at 30 000; a metropolis up to ≈ 48 000 people in about a second; plus the model-time sentence of NR-1 |
| NR-3 | r2-verify-rendering (new finding) | minor | FIXED | rendering: §8.1 item 3, §8.2 (`OrderSlot`, layer-order rows 5, 6, 10, 11, *Slot resolution*), §8.3 (census row); cross: J-R39 (scope) | `OrderSlot` gains `slot`, `passes?` and `derived?`; the loader resolves every emitted (semantic, pass) by most-specific-wins and refuses a sheet with an unresolved or tied pair; shipped `way.*` entries name passes [1] (slot 5) and [2] (slot 6); S14 emits one mark per pass; the raised under-copy and projected shadows are … |
| NR-4 | r2-verify-rendering (new finding) | minor | FIXED | rendering: §8.9 (threads, four crossing rows, *Queries to the tile worker*), §9.5 (compass, title, ruler); cross: §14 comments, §16, J-R40 (scope) | main ↔ tile worker furniture-placement and snap queries, copied, ≤ 4 KB each way, served ahead of raster work with tile rasters cut at 8 ms, so an answer lands within one frame; measured at M1 / M2b, fallback 4-ms slices; the API's `hit` and `inView` queries run in the generation worker on its index |
| NR-5 | r2-verify-rendering (new finding) | minor | FIXED | rendering: §8.1 item 6, §8.9 (threads, export rows), §11.1 (SVG row, *Where exports run*), §12.7, §12.8 (*Export-time peak*); cross: §14 `Exporter`, §4.10 (pipeline), J-R41 (scope) | SVG exports build a transient list in the generation worker (`DisplayListBuilder.build(model, band)`), run S13b there through `@plat/labels` with render's `ObstacleSource` / `RoleIndex`, and release it; raster exports cross to the tile worker as requests; the peak (≈ 1.9 KB per building at the city band: 10 MB CITY, 26 MB … |
| NR-6 | r2-verify-rendering (new finding) | minor | FIXED | rendering: §8.10 (new bullet *One construction everywhere*, *Where it runs*), §8.3 (census row); cross: §6.1 registry (determinism), §13.3, §13.8, J-R42 (scope) | stamp tiles from `rng.stream` with a constant entity key (domain, class index, spacing, tile index), `STAGE_VIEW` and the non-rerollable concern `render.stampTiles`; integer-centimetre points; `dmath` trigonometry and exponentials, `Math.sqrt`; sums and ties in point-index order; the builder under §6.5's lint; a census hash … |
| NR-7 | r2-verify-rendering (new finding) | minor | FIXED | rendering: §11.1 (CityJSON row, *The CityJSON extension*); cross: §16 M3b, J-R43 (scope) | PLAT ships a CityJSON Extension (`Plat`) defining `+platGeoAnchor`, listed in `extensions` only when an anchor is written; CI validates with the local schema; pre-decided fallback: a `<name>.geoanchor.json` sidecar (not `<name>.city.json`, which is the export itself) |
| NR-9 | r2-verify-rendering (new finding) | minor | FIXED | scope: §16 (M1 exit) | "the label-tile measurement (§8.9)" → "the label-composition measurement (§8.9)" |
| NR-10 | r2-verify-rendering (new finding) | minor | FIXED | scope: §17.1 (8) | adds, each with its section: MurmurHash3's x86 128-bit hash and 32-bit finaliser (Appleby, public domain), Krüger's series in Karney's formulation, the van der Corput radical inverse and Morton order, Ulichney's void-and-cluster — and every other published method the text now uses (xoshiro128\*\*, Irwin–Hall, monotone chain and … |
| VS2-1 | r2-verify-scope (new finding) | minor | FIXED | scope: §16 (M3a row), §17.1 (2) check (iv); `docs/validation/bench/doc_checks.py` S1 | the M3a row is one line again; the integration seat's scripted check fails any table line outside fenced code that does not start and end with `\|` (executed: it finds exactly this row today and 0 after the blocks are applied to a copy) |
| VS2-2 | r2-verify-scope (new finding) | minor | FIXED | scope: §1.1, §13.2, §13.6 (1), §16 (M1 content, M2a exit, M2b content, estimate note), D-35, J-S28; cross: §5.3 (determinism) | METROPOLIS generates from M1 as a `ladder.json` row on the one pipeline; M2b measures and tunes it; its cost-model sizes are reported from M1 and gate from M2b |
| VS2-3 | r2-verify-scope (new finding) | minor | FIXED | scope: §15.1 FTG H2, §1.1 (column head, cells, *Budgets inside a rung*), D-18, §15.2 O3 (d) (the last two with rendering's NR-1) | H2: client-side, no server round trip; first map < 1 s for every TOWN and CITY and METROPOLIS ≤ ≈ 14 200 buildings, ≈ 2.3 s at the cap; model within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people; both misses declared; §1.1's column reads "model p95 at the target (§12.3's law inside the band; O3 (d) read over the band)" … |
| VS2-4 | r2-verify-scope (new finding) | minor | FIXED | scope: §13.3 (placement digests), §14 (dependency rules, `RoleIndex` comment), J-S31; cross: §6.5 (3) (determinism), §9.2 (rendering) | §6.5's allowlist lint covers `@plat/labels` and the renderer code that feeds S13b — every `ObstacleSource` / `RoleIndex` implementation, what it calls and the S14 writers of `bbox`, geometry, `layer`, `z` and symbol-extent columns — found as import closures by CI; the rest of `@plat/render` stays outside |
| VS2-5 | r2-verify-scope (new finding) | minor | FIXED | scope: §13.3 (`WaterSetting`, `ShiftRecord`, `MilestoneRecord.parity`), §13.6 (2), (9), §14 | `parity: string` added to `MilestoneRecord`; one `type WaterSetting = 'none'\|'coast'\|'river'\|'coast+river'` in `@plat/testkit`, used by B-CITY, the golden store, `ShiftRecord`, `D5Record` and §13.6 (2) |
| VS2-6 | r2-verify-scope (new finding) | minor | FIXED | scope: §13.6 (2), §14, J-S29; cross: §2.9 `type Seed`, §6.1 Enter (determinism) | `H32(s)` = h1 of MurmurHash3_x86_128 over the UTF-8 bytes of `s`, seed 0 — verification value 0xB3ECE62A reproduced, two check vectors in the text; MFCG seeds 1 + (H32 mod 2 147 483 646); seeds are u32 `Seed`s written as decimal strings |
| VS2-7 | r2-verify-scope (new finding) | minor | FIXED | scope: Judgment calls (preamble) | "`r2-integration-log.md` §3" → "§4, its conflict table"; a round-3 clause added |
| VS2-8 | r2-verify-scope (new finding) | minor | FIXED | scope: §17.1 (2), (9); `docs/validation/bench/doc_checks.py`, `docs/validation/doc-checks-allow.tsv`; J-S32 | five scripted checks before M-1 — identifiers, colour values, token 3-gram runs of ≥ 5 tokens, table rows, pointers — with a reviewed allow file and a non-zero exit that stops the pass; from M-1 the hashed scan replaces the three content checks |
| VS2-9 | r2-verify-scope (new finding) | minor | FIXED | scope: §13.2, §13.8, §15.2 O9 (c), J-S4, J-S30; cross: §7.3 item 7 (iv) (determinism) | n = 800 scopes (400 block + 400 district, ≈ 40 800 generations, ≈ 12.5 CPU-min); executed at ρ = 0 / 0.8 / 1: 1.0–1.4 % false campaign failures, 2 000 / 2 000 detection of +0.25 sd bias and 0.8 × snugness at ρ ≤ 0.8, 99.3 % / 99.7 % at ρ = 1, against 92.2 % / 95.2 % at n = 400 |

### §R3.2 Conflicts settled at integration

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r3)

| # | the disagreement | resolution | judgment |
|---|---|---|---|
| C-1 | the deck form: the kernel draft laid each kept way's deck as an L0 edge on the way's straight L1 edge by a new **edge promotion** (VK2-3's required change, X-P3, X-D2, X-D3 (a), X-S1 (b)); the pipeline (K8, J-P40) and determinism (KR3-3, §7.3 (b) 4) drafts made the deck span the way's own L1 edge between two promoted bank vertices, with no L0 edge across the water | the pipeline's and determinism's form, which is also generation's (S1 and S3 place only the bank vertices at L0, S4 lays the span) and keeps L0 land and water only; edge promotion removed from §2.2, §3.1, §3.3 (`CommitRecord.promotedEdges` gone), §3.6 and §3.10; its other use, a new bank along a kept quay, served by cutting the quay back and extending it after the water; §4.2 S1 (5), §4.1's S3 and S5 rows, §2.2 rule 7 and §13.1's fixture state the form | J-I12 (new), J-K24 amended |
| C-2 | what a coarse insertion prepares: the kernel's rule 2 required prepared vertices wherever the new water meets any finer edge (landings and quays, district and reservation boundaries, the perimeter, setback lines); the pipeline's carve prepared deck vertices only ("nothing else is prepared") and the determinism operator decks and water gates only; determinism's KR3-2 (b) had `clearFiner` remove only partition content | one list for both operators: deck bank vertices, water-gate vertices on re-traced wall runs, and anchors at the bank points of every other crossed finer edge that is no way (perimeter and district-boundary stretches, setback and glacis lines), the stretch between removed; quays and landings cut back and extended after the water (no anchor); a carve that crosses a wall re-traces the run with a water gate like the water operator; a reservation in the way is an F-EDIT conflict; the preparation clears partition content only, whole faces, and the coarse batch clears nothing (§3.3 rules 1–3, §4.11, §7.3 (b) 3–4) | J-I13 (new) |
| C-3 | load verification's memory: the determinism draft moved the replay to the generation worker "when §12.8's working set leaves no room for a second model" (RR3-9 repeated it), but the replay needs its own model wherever it runs | the replay's model is counted in place of the pool's frozen arena copies (none are held while a document loads); with pool size 0 it runs in the generation worker on its own arena; M1's memory measurement includes the reference CITY document's load verification under §12.8's existing fallbacks (§2.9 step 3, §12.8) | J-I14 (new) |

Harmonised without a conflict: §3.3's one-sided step (0) sentence now uses determinism's wording (KR3-1 with the kernel's
X-D6); the kernel's X-D2 and X-D3 (a) (edges in undo records and digests) were superseded by C-1, X-D3 (b) applied.

### §R3.3 Changelog of `docs/ARCHITECTURE.md`, round 3

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r3)

* **Size and marking.** 8 383 → 9 546 lines. 80 section headings carry the round-3 review banner (55 sections replaced
  by area blocks, 24 changed at integration, and the new §0.9); the title's revision note and §0.9 record the round;
  judgment calls grew from 175 to 213 rows (J-K22–J-K27, J-DET-29–J-DET-39, J-P34–J-P40, J-R38–J-R43, J-S28–J-S32 from
  the drafts; J-I12–J-I14 from integration; J-K6, J-K14, J-K17, J-K18, J-DET-14, J-DET-23, J-R19, J-S4 restated; J-K24,
  J-I10, J-I11 amended).
* **Kernel (§2.2, §3.1, §3.3, §3.4, §3.6, §3.10).** S10's eager step (0) rebuilds the L3 partitions it touched before
  the freeze, the frozen copy carries L0–L3 with every dynamic grid asserted empty, and each level's index holds only
  items born at that level; named prepared contacts for coarse insertions; query order read on the level-n route;
  the `split` flag cleared by moves except re-seats and slides; re-seats and slides by the placement rule (12.9 % → 0
  measured failures); a move keeps nothing and holds every route vertex of a locked or pinned entity; cut knots carrying
  the exact sampled value; typed open-addressing lookup tables; "a reservation boundary" among district boundaries.
* **Determinism (§2.8, §2.9, §5.2, §5.3, §6.1–§6.5, §7.1, §7.3, §7.4, §7.6).** S1's water operator in the carve's
  order; one-sided step (0) re-runs for every shared edge a scope borders; `WaterBody.controls` and `moveCourseKnot`;
  point-anchored records carried by a warp; harbour works admitted by topology; the lifecycle block ordered by `seq`;
  per-document sessions; the rerollable-concern registry as the one list; user corpora as non-shipped packs; chunks
  referenced by lattice point; names follow the address; editing during load verification; the NF-P5 invariant's edit
  exemption; the Clipper2 shift list with S10's bands.
* **Pipeline (§2.5, §2.6, §4.1, §4.2, §4.4–§4.8, §4.11, II.1, II.4, II.5).** The carve's footprint; the harbour route
  through its serving gate (a sealed town's water gate); an `on_enceinte` castle's outer-arc moat and town-side dry
  ditch; no S7b claim in a wall strip; the `reserve` seam type; II.1 (3)'s neighbour step; `BaseWing.corners`; one
  margin-band width; the quarter count stated once; the shadow pass as §8.4's optional base part.
* **Rendering (§8.1–§8.3, §8.9, §8.10, §9.5, §11.1, §12, §12.3, §12.7–§12.9).** Render-time hashes keyed by the entity
  key's low 64 bits (seed-dependent); O3 (d)'s model bars read over every size with a max clause and the miss above
  ≈ 4 500 / 17 700 / 58 800 people declared for veto; explicit passes in `OrderSlot`; furniture and snap queries to
  the tile worker; SVG exports on a transient list in the generation worker; stamp tiles from a constant key; a
  declared CityJSON extension with a sidecar fallback.
* **Scope (§1.1, §13.1–§13.3, §13.6, §13.8, §14, §15.1, §15.2, §16, §17.1, D-18, D-35, judgment calls).** METROPOLIS
  generated from M1 and tuned at M2b; the speed promises restated to the laws; n = 800 scopes for the rank test; `H32`
  as MurmurHash3's first word with check vectors; `WaterSetting` and `MilestoneRecord.parity`; the allowlist lint over
  S13b's inputs; scripted document checks (`docs/validation/bench/doc_checks.py`) with a reviewed allow file; every
  published algorithm named in §17.1 (8); the M3a row re-joined; every other area's requests of these sections folded in.
* **Integration (the title note, the summary, §0.9, §2.3, §2.7, §3.7–§3.9, §4.9, §4.10, §7.2, §8.6, §9.1, §9.2, §9.4,
  §9.6, §10.4, §11.2–§11.4, §12.4, §12.6, D-15, the judgment calls, the staged list, and edits across §2–§16).** 89
  cross-area request rows handled (the log's §3 table), three conflicts settled (C-1–C-3); §12.4 re-summed with the
  step (0) partition rebuild (CITY ≈ 253 ms p50, p95 ≤ 300 ms unchanged; single worker ≈ 334 ms; METROPOLIS ≈ 606 /
  801 ms; TOWN ≈ 76 ms) and §12.3's p50 column; the stale `naming/*` wording of §4.1 and §4.10 and D-15's Enter
  corrected; two table rows the edits had split re-joined; the scripted document checks run over all 74 changed
  sections — 0 unreviewed hits (C3's 308 new runs reviewed into `docs/validation/doc-checks-allow.tsv`), 0 broken table
  rows, 0 dangling `§` pointers (the one external `§16.2` excepted).

**What the Fable review should weigh first.** (1) C-1 / J-I12: dropping the kernel's edge promotion for the deck form the
pipeline and determinism areas use — check §3.3 rule 3, §3.6 (c), §4.2 S1 (5) and §7.3 (b) 4 together, and that no
operator still needs a coarse chain to share a finer edge. (2) C-2 / J-I13: the one preparation list — in particular
that a carve re-tracing a crossed wall run with a water gate (a capability the pipeline draft did not have) and the
boundary anchors are enough for every contact the L0 batch can make. (3) The kernel's index-contents rule and the
freeze assertion (VK2-1, J-K25), and the declared O3 (d) miss (NR-1, D-18) — an owner-veto item.

## §R4 Fix-all round 4 (2026-09-26): every item's disposition and the changelog

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4)

*In plain words.* After round 3, five checkers re-read the design against every round-3 fix. They accepted all of them
but one — the half of an earlier item that asked every seat editing the design, not only the integrating seat, to run
the copy checks — and found 39 new problems the rewrite had introduced or brought to light; the kernel and scope areas
found three more while fixing theirs — 43 items. Each went to the area of the architecture it belongs to; each area
rewrote its sections, and one integrating seat merged the five rewrites into `docs/ARCHITECTURE.md`, applied every
change one area asked of another and settled four places where the rewrites did not fit together — the largest: a moved
river now names the points where it crosses a wall and a district edge exactly as a dug canal does, and the map's outer
edge is drawn with the land and water while the printed frame is drawn with the first streets. The table says, for every
item, what happened to it and where the fix now lives. Every item is **FIXED** (the architecture now contains a mechanism
that defeats the failure the checker wrote down); none was found factually wrong (**INVALID**), none belonged to a later
stage of the owner's roadmap (**STAGED-BY-OWNER**), and nothing was deferred. All six seats were opus stand-ins for Fable
seats; the work is queued for Fable review.

Sources: the area drafts `docs/validation/fix-all/r4-{kernel,determinism,pipeline,rendering,scope}.md` (each item's full
mechanism and its measurements are in its owner's draft), the verifications that raised the items
`docs/validation/fix-all/r3-verify-*.md`, and the integration record `docs/validation/fix-all/r4-integration-log.md`
(conflicts C-1–C-4).

### §R4.1 Disposition of every item handled in round 4

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4)

**Counts:** 43 items — **43 FIXED**, **0 STAGED-BY-OWNER**, **0 INVALID**, **0 deferred**. By owner area in round 4:
kernel 8, determinism 8, pipeline 9, rendering 7, scope 11 (VK3-1 of the kernel verification was fixed by the
determinism area and VK3-8 by the pipeline area, with a kernel companion; VD3-7 of the determinism verification and NP3-9
of the pipeline verification by the scope area, because the text sat in those areas' sections). By source: 39 new
findings of the round-3 verifications (VK3-1–VK3-9, VD3-1–VD3-8, NP3-1–NP3-9, NR3-1–NR3-7, VS3-1–VS3-6), one round-2 item
judged UNRESOLVED by the round-3 scope verification (VS2-8, its amendment-pass half), and three found by the areas while
fixing them (K4-1, S4-1, S4-2). By severity: 5 major (VK3-1, VD3-1, VD3-2, NP3-1, NP3-2), 38 minor; no blocker. "where"
names the owner area and its sections; "X:" marks sections other areas changed for the item; a trailing "integration
C-n" names the conflict resolution that shaped the final text.

| id | source | severity or kind | disposition | where in `docs/ARCHITECTURE.md` | one-line reason |
|---|---|---|---|---|---|
| VK3-2 | r3-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 7 (anchors, contact names, gate ends), rules 3 and 5, the types; §3.3 (`KernelTx.prepared`, clear-region rules 2–3); §3.6 (c); §3.9; §3.10; J-K29; X: §2.7 `Gate.banks`, §4.4, §4.11, §7.3 (b) 3, 4, 7, §13.1; integration C-1, C-2 | a water gate's two bank vertices carry `('gate_end', gate, 0 \| 1)` under a fresh `Gate` whose `banks` name them; every other bank point a transient `anchor` contact name (the entity of the edge's first own-level row, its smallest free ordinal, from 2 on an enceinte) stripped at promotion, so rows never collide or persist; the map border is prepared and kept closed |
| VK3-3 | r3-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 3 (demotion), the types, §3.3 (`CommitRecord.demoted`, `unflagged`), §3.4, §3.6, §3.9, §3.10 (level-consistency row), J-K28; X: §2.9, §6.2, §7.3 (b) 4, 9, §7.4, II.1 (3), §4.6 step 7, §13.1 | levels follow the rows: a removal demotes the edges and vertices its remaining rows no longer justify, clears a broken run's `split` flag and returns a promoted vertex left beside its run to its level, so reversing the neighbour step by any edit restores the kerb's route, index and digest (100 000 of 100 000 random routes, checked) |
| VK3-4 | r3-verify-kernel (new finding) | minor | FIXED | kernel: §3.6 ("Order within a step"), J-K30; X: §13.1 | a step's re-seats and slides are placed one at a time in canonical order by pre-step lattice position, so the output never depends on slot numbers (the two orders differ in 6.8 % of close pairs, measured) |
| VK3-5 | r3-verify-kernel (new finding) | minor | FIXED | kernel: §3.3 pool step 1, §3.1, §3.10 (frozen-base row), J-K25; X: §2.9 step 3, §4.1, §4.11, §13.2 | every freeze first rebuilds the static partitions edits left dirty, at every pool size, then asserts the grids empty (≈ 2–10 ms after typical edits, ≈ 59 ms worst case, measured) |
| VK3-6 | r3-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 *Size*, §3.3 step 1, J-K16, J-K22; X: §12.3, §12.4, §12.8 | the pool's frozen copy is counted with its static index partitions (38.4 B per item, measured): ≤ ≈ 15 MB per copy at CITY, ≈ 1.5 ms each, ≈ 20 MB after edits; §12.4's critical path 255 ms p50 (METROPOLIS 609 ms); §12.8's CITY line itemised |
| VK3-7 | r3-verify-kernel (new finding) | minor | FIXED | kernel: §3.3 (index paragraph, `CommitRecord`), §3.6 (held set) | three wording slips corrected ("between two vertices of that level or coarser"; the empty record line; the deck's held reason) |
| VK3-9 | r3-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 (`StretchRef`, `RoleRow`, `RoleKey`, rule 5), §3.4, §3.1, §3.3 rule 2, J-K31; X: §4.11, §7.3 (b) 3–4, §7.4, §13.1 | a batch-local `StretchRef` names part of a chain for `removeEdges` and `retypeEdges`, with cut knots at a removed stretch's ends (every remaining sample within 10⁻¹¹ cm, measured), and the two missing vertex-role doors are added |
| K4-1 | found by the kernel area in round 4 | minor | FIXED | kernel: §2.2 rule 3, §3.3 (index paragraph), §3.1, §3.6, §3.10 (placement-bound row), J-K32; X: §13.1 | the 0.71 cm hot pixel is a placement bound and each route-edge index item is boxed over the vertices on its run, because promotions and same-level splits change routes under finer vertices without moving them (9.8 % of promotions, up to 1.25 cm, measured) |
| VK3-1 | r3-verify-kernel (new finding) | major | FIXED | determinism: §7.3 (b) 2–4, 8, item 7 (v), the S1 row, J-DET-23; X: §3.3 (KR4-4), §13.2 | S1's water operator computes its footprint in (b) 2 and both batches declare it: the L1 batch clears it by §3.3 rule 1, the L0 batch clears nothing, so a pond drawn in a block or a widened bank commits with no `E_LEVEL` and every face outside it byte-identical |
| VD3-1 | r3-verify-determinism (new finding) | major | FIXED | determinism: §2.9 steps 2–5, §6.2, §5.3 (load row), §7.4, J-DET-38, J-DET-40; X: §3.9 (KR4-1), §12.6 (RR4-3), §13.2, §16 | the load recomputes the decoded state's whole digest tree (≈ 31–34 ms at CITY, measured synthetic) and matches `model.digest` before the first edit; a mismatch is a corrupt cache, loaded by replay and never verified; open-to-editable ≤ T(B), with pre-decided fallbacks |
| VD3-2 | r3-verify-determinism (new finding) | major | FIXED | determinism: §2.8 (`NamingRecord`), §6.1, §6.3 (case (4)), §7.3, §7.4, §7.6, J-DET-37, J-DET-41; X: §9.6 (RR4-1), §10.4 (PR4-1), §13.2, §16 | every generated name persists its naming record; an unedited name whose recorded naming slices changed is re-drawn with its own salt, the renames listed for confirmation; a user corpus pack carries its binding as a keyed row operation |
| VD3-3 | r3-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 (the pack set), §6.2, §6.4, §7.4, §7.6, J-DET-35; X: §10.4 (integration coherence) | the document's pack set is the base recipe's packs plus every pack an `adjust` in the log names; its non-shipped content stays saved while any event names it, and the link rule reads the pack set |
| VD3-4 | r3-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 step 4, `Base`, §7.4 (rebase row), J-DET-42; X: §11.3 (RR4-2), §16 | a non-owner client keeps the `doc.load` bytes and installs the saved town when the owner's `keptSnapshot` rebase arrives, and a later loader takes it without asking, so every client converges on the owner's choice |
| VD3-5 | r3-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 step 3, J-DET-43; X: §4.1 (PR4-5), §12.6, §12.8, J-I14; integration C-3 | every edit made during load verification runs its per-district stages in the generation worker at pool size 0, so no frozen copy exists beside the replay's model; measured at M2a |
| VD3-6 | r3-verify-determinism (new finding) | minor | FIXED | determinism: §5.3 (NF-P5 row), J-DET-39; X: §13.2 | the NF-P5 exemption is a declaration each chained edit's dry run computes, with a registry test, so the carve and every strip the water operator changes are covered and a lane across a strip is still refused |
| VD3-8 | r3-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 (`Recipe.salts`, load step 1), §6.1, §6.4, §5.3 | `Recipe.salts` is keyed by `RerollableConcern` and the schema refuses any other key; such a document opens read-only naming the field |
| VK3-8 | r3-verify-kernel (new finding) | minor | FIXED | pipeline: §4.1 (the S1 and S3 rows, the writer sentence, J-P46), §2.7 `Tunnel`; kernel part: §3.3 (`rederivesFrom`), J-K33; X: §2.2 rules 1 and 7, §3.2 (9), §3.3 rules 2–3 (X-K1), §14; integration C-2 | the arena's outer ring is one L0 `margin` chain written first by S1 and the map border one L1 `border` chain written first in S3's L1 batch; a move's `rederivesFrom` is the first stage of §4.1's order, so no list of first writers can go stale |
| NP3-1 | r3-verify-pipeline (new finding) | major | FIXED | pipeline: §2.6 (`carryWings`, the wing-carrying rule, its check and test, J-P42), §2.5 (`SlotPlan`), §4.7 S11, §4.6 step 7, II.1 (3); X: §2.2 rule 5, §3.4 (`ChainInsert`, `warp`'s `recordCheck`), §3.6, §3.9, §5.3, §7.3, §7.4, §8.6, §13.2, §14 | stored wing rings are carried with their footprint by one rule — boundary runs re-read from the footprint's rings, joints by mean-value coordinates, a de-rectangled rect turned quad — and checked inside a warp's whole-step validation (48 000 of 48 000 tiled carries exact, measured) |
| NP3-2 | r3-verify-pipeline (new finding) | major | FIXED | pipeline: §4.11 (the run's strip lines, the new strips' way cuts, footprint (a)–(d), batches (1)–(3), J-P34); X: §3.3 (X-K5), §7.3 (b) 2–3, 7 (X-D4), §13.1, §13.2, §16 | the carve footprint is exactly the cells its buffer meets or its way rule touches, a crossed wall's old strip-line stretches and new strips included, and every way the new strips meet is cut at their boundary, so a canal or a river move across a wall stays local |
| NP3-3 | r3-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.11 (4), J-P43; X: §7.3 (b) 6, §13.2 | once the water is in, each land face of the footprint takes the typing of the pre-edit cell holding most of its area, so a canal across the perimeter leaves both banks' countryside the hinterland's |
| NP3-4 | r3-verify-pipeline (new finding) | minor | FIXED | pipeline: §2.7 (`Bridge.state`), §4.1, §4.2 S1 (5), S3 (13), §4.3, §4.4, §4.8, §4.11, J-P44; X: §2.2 rule 7 (X-K6), §5.2, §5.3, §7.3 (b) 2, 4, 9, §7.4, §11.1, §13.2, §14; integration C-4 | every emitted crossing is a `site` — two pinned bank vertices, no span, not drawn — that becomes `built` when a way uses it; a deck where no site stands is placed by one L0 batch of two shore splits; the water operator carries sites like decks |
| NP3-5 | r3-verify-pipeline (new finding) | minor | FIXED | pipeline: II.1 (3), §4.6 step 7; X: §2.2 rule 3 (J-K28), §7.3 item 1, §13.1 | removing the street reverses the neighbour step whatever the edit — a promoted plot-line end or footprint corner returns to its level by demotion — and the coarser rings along the kerb follow under the seam exception |
| NP3-6 | r3-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (4), (7), (11), §4.3, §4.8; X: §5.2 (F-WALL), §5.3 | every statement reads "no main gate and no external arterial", and a harbour outside the stage-1 region still gets its harbour gate |
| NP3-7 | r3-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (4), (7), (11), J-P35, J-P45; X: §13.2, §16 M1, §14 | one of the N picks is forced where the plaza ↔ harbour least-cost path leaves the pick contour, so a walled port's harbour road leaves on the harbour side; M1 measures p99 ≤ 1.5 × that path, with the detour guard as the pre-decided fallback |
| NP3-8 | r3-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (2), §4.1 (J-P27), §4.5 S7b (3) (J-P41), §2.7 `Enceinte.moat`, §4.8; X: §8.2 | four slips: "(10) and (12)"; J-P27's ≈ 267 ms; J-P41 recorded; `Enceinte.ditch` renamed `moat`, so `ditch` names only the dry residue |
| NR3-1 | r3-verify-rendering (new finding) | minor | FIXED | rendering: §12.3 (*Which configuration is primary*), §12.9, J-R44; X: §4.1, §16, D-18, J-P10, J-R18 | the pool stays primary at each size where it runs within its law + 10 %, beats a single worker on the same generations and gives identical digests, with pre-decided per-size outcomes otherwise |
| NR3-2 | r3-verify-rendering (new finding) | minor | FIXED | rendering: §8.9 (resumable rasters), §8.3 (census row), J-R40; X: §14 (`TileBackend`, `RasterJob`), §13.2 | `TileBackend.begin` → `RasterJob.step` / `finish` / `cancel`: a tile raster pauses between native calls to serve queries, and a tile rastered in 1-ms slices is pixel-identical to one rastered whole |
| NR3-3 | r3-verify-rendering (new finding) | minor | FIXED | rendering: §9.2 (the pin pass), §9.1 (`PinnedPlacement.seq`), §8.1 (`pinSeq`), J-R45; X: §13.4, §16 | a pin pass at every stop, in `moveLabel` order, hides and reports a pin that meets an earlier fixed pin, so pins never collide after a warp, a rename or a style change |
| NR3-4 | r3-verify-rendering (new finding) | minor | FIXED | rendering: §12.3 (the max clause), §12.1 (the timing phase), J-R38, J-R49; X: §13.2, §13.8, D-18, §16 | the nightly run only screens the max clause; a flagged generation is re-timed three times alone on the runner and fails on the median; every gating timing is taken in a solo timing phase |
| NR3-5 | r3-verify-rendering (new finding) | minor | FIXED | rendering: §12.3, §12.9, J-R17 | 75 µs and 58 µs per building (100 ÷ 1 333 and 300 ÷ 5 200) |
| NR3-6 | r3-verify-rendering (new finding) | minor | FIXED | rendering: §8.9 (queue classes), §11.1, §12.7, §12.8, §8.1, J-R46, J-R47; X: §4.10, §14 (`Exporter`), §13.2, §16 | a four-class tile-worker queue puts the view before exports with a bounded export share, and raster exports use a transient list transferred with the request, so an edit made during a long export cannot tear it |
| NR3-7 | r3-verify-rendering (new finding) | minor | FIXED | rendering: §8.10 (the shipped stamp-tile asset), §8.3, §12.7, J-R42, J-R48; X: §3.1, §6.1, §13.2, §13.3, §13.7, §13.8, §14, §15.1, D-11, J-10 | the stamp tiles are built when the product is built and shipped (≈ 31 KB, hash-checked), one set per stamped class at 4 m scaled by each entity's spacing |
| VD3-7 | r3-verify-determinism (new finding) | minor | FIXED | scope: §14 (`EditEngine.rebase(…, at?)`), J-S38; X: §2.9 step 4 (DR-2) | `rebase` takes an optional `at` — the log head or h₀, anything else `E_REBASE_AT` — so keeping the saved town behind the head is expressible |
| NP3-9 | r3-verify-pipeline (new finding) | minor | FIXED | scope: the one-page summary | the summary says "the optional shadow pass and the 3-D export read real heights" instead of "can be added later" |
| VS2-8 | r2-verify-scope; UNRESOLVED in r3-verify-scope (its amendment-pass half) | minor | FIXED | scope: §17.1 (2), J-S32; `docs/validation/bench/doc_checks.py`; one line in each of `workflows/04-amendments.js`, `05-fable-review.js`, `06-fix-all.js` | the checks bind every seat that writes this document, with the command line stated, and the workflow prompts name them; this integration ran them over its 71 changed section keys (0 unreviewed) |
| VS3-1 | r3-verify-scope (new finding) | minor | FIXED | scope: §16 (M1, M2a, M2b), J-S37, J-I14 (merged); X: §12.8 (R-1), §12.1 (R-2); integration C-3 | the memory measurement under load verification of the reference 300-edit CITY document is an M2a exit criterion; M1 keeps the memory test of generated towns |
| VS3-2 | r3-verify-scope (new finding) | minor | FIXED | scope: the summary, §1.1, §15.1 (H2); X: §12 (plain words), §12.9 (R-3) | both knees stated: p95 up to ≈ 4 500 / 17 700 / 58 800 people, every single run up to ≈ 3 400 / 13 600 / 45 800 |
| VS3-3 | r3-verify-scope (new finding) | minor | FIXED | scope: §17.1 (8) | every published method the text uses is named — the seven the checker found and seven more a scripted scan of 119 method names found |
| VS3-4 | r3-verify-scope (new finding) | minor | FIXED | scope: §17.1 (2) (ii), (iii), (vi), J-S35; `doc_checks.py` C2–C4; `docs/validation/doc-checks-allow.tsv` | the checks read the captures' JSON, and a new order-free list check catches 429 of 429 pasted lists (the 3-gram check none of the alphabetised ones) |
| S4-1 | found by the scope area in round 4 | minor | FIXED | scope: §17.1 (5), J-S36 | M-1's hashed deny-list holds each reference list's salted member digests and flags five or more members on one line or table column, so a reordered copy is found |
| VS3-5 | r3-verify-scope (new finding) | minor | FIXED | scope: §17.1 (2) *Calibration*, J-S32 | the calibration is restated as the reproducible "47 runs (45 distinct)" on a committed slice of the measured text |
| S4-2 | found by the scope area in round 4 | minor | FIXED | scope: §16 M2a; X: §2.9 *Size budget* (DR-3) | the rebased-document size test, worded "at M1" and listed at no milestone, is an M2a exit criterion |
| VS3-6 | r3-verify-scope (new finding) | minor | FIXED | scope: §13.6 (2), (3), (6), (9), §16, J-S33, J-S34 | against FTG one pair per capture (2 of 3 per rung); against NG at M5 five seeded pairs for each of its four templates, PLAT's district matched ± 20 % by a committed search with a `sizeMismatch` fallback |

### §R4.2 Conflicts settled at integration

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4)

| # | the disagreement | resolution | judgment |
|---|---|---|---|
| C-1 | how S1's water operator names the points where new water meets a wall or a boundary: the determinism draft gave a re-traced run's water-gate bank vertices persistent `('anchor', enceinte, k)` rows and each crossed boundary an anchor on its own entity list (KR4-2); the kernel draft named a water gate's bank vertices `gate_end` under a fresh `Gate` and every other bank point a transient contact name on the edge's first own-level row (VK3-2, J-K29) | the kernel's form, which owns §2.2 rule 7 (the determinism draft deferred to it): §7.3 (b) 3, 4, 7 and item 7 (v) carry the kernel's X-D1 / X-D2 wording with the entity rule written out; KR4-2 superseded | J-I15 (new) |
| C-2 | the frame lines: the kernel draft prepared "the frame's `border` and `margin` lines" as two L1 lines kept closed across new water and cited them in J-K33's reason; the pipeline draft (VK3-8, J-P46) made the arena's outer ring an L0 `margin` chain written by S1 and only the frame rectangle an L1 `border` chain written in S3's L1 batch | the pipeline's levels (the kernel's own X-P5 contract (ii)), with pipeline X-K1 applied to §2.2 rules 1 and 7, §3.2 (9), §3.3 rules 2–3 and pool step 3; §7.3 (b) 3 prepares the `border` only; J-I13 and J-K33's inline reason restated | J-I16 (new) |
| C-3 | when load-verification memory is measured: the determinism and rendering drafts at M1 (VD3-5, RR4-4, SR4-2, with the naming re-draws at M2a); the scope draft at M2a (and the naming re-draws at M3a), because M1 builds no document, log or load verification | the scope draft's milestones: §12.8 and §12.1 at M2a (R-1, R-2), J-I14 as the scope draft merged it, §16 as folded | J-S37, J-I14 (merged) |
| C-4 | crossing sites inside S1's water operator (found at integration): NP3-4 made every emitted crossing a `site` until a way uses it, while the determinism draft's §7.3 (b), written against the round-3 text, built a deck at every site a route uses and said nothing of the unused ones, old or new | §7.3 (b) 2 matches an old unused site like a deck and keeps every other new site a `site`; (b) 4 inserts unused new sites' bank vertices with the new shores and removes old sites' with theirs; (b) 9 removes a site left over land (X-D8); §11.1 exports built bridges only | J-I17 (new) |

Harmonised without a conflict (each draft had deferred to the owning lane's wording): §7.4's warp paragraph takes the
pipeline's X-D1 sentence over the determinism draft's folded summary; §7.3 (b) 2 (iii), (b) 3 and (b) 7 take X-D4's
strip-line wording; §7.4's "draw bridges" row takes X-D7's; §2.9 step 3 carries both the kernel's X-D6 and VD3-5, which
agree that nothing freezes a copy while verification runs.

### §R4.3 Changelog of `docs/ARCHITECTURE.md`, round 4

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4)

* **Size and marking.** 9 546 → 10 723 lines. 71 section headings carry the round-4 review banner (51 sections replaced
  by area blocks, the judgment-call section changed by row blocks and at integration, 18 sections changed at integration
  only, and the new §0.10); the title's revision note and §0.10 record the round; judgment calls grew from 213 to 244
  rows (J-K28–J-K33, J-DET-40–J-DET-43, J-P41–J-P46, J-R44–J-R49, J-S33–J-S38 from the drafts; J-I15–J-I17 from
  integration; J-DET-23, J-DET-35, J-DET-37–J-DET-39, J-P34, J-P35, J-R17, J-R38, J-R40, J-R42 and J-S32 restated;
  J-K11, J-K16, J-K25, J-K26, J-10, J-P10, J-R18, J-I11, J-I13 and J-I14 amended).
* **Kernel (§2.2, §3.1, §3.3, §3.4, §3.6, §3.9, §3.10).** Levels follow the rows (demotion); water gates' `gate_end`
  vertices and transient contact names; `StretchRef` with cut knots; canonical placement order within a warp step; every
  freeze rebuilds the partitions edits left dirty; the pool's copies counted with their index partitions; the hot pixel
  as a placement bound with run-boxed index items.
* **Determinism (§2.8, §2.9, §5.3, §6.1–§6.4, §7.3, §7.4, §7.6).** The water operator clears its footprint before the
  water; the load recomputes its own digest before the first edit (corrupt cache → replay); naming records and the
  naming-input re-draws; the pack set; the owner's keep reaching every bridged client; single-worker per-district stages
  during verification; the NF-P5 exemption as a declaration; `Recipe.salts` keyed by rerollable concerns.
* **Pipeline (§2.5–§2.7, §4.1–§4.8, §4.11, II.1).** Wing rings carried with their footprints (`carryWings`); the carve
  footprint across a wall and the new strips' way cuts; the post-water typing rule; crossing sites; the neighbour step's
  reversal by demotion; the harbour gate rule stated once; the forced harbour pick with the detour guard as fallback; the
  frame lines' levels and writers; `Enceinte.moat`.
* **Rendering (§8.1, §8.3, §8.9, §8.10, §9.1, §9.2, §11.1, §12.1, §12.3, §12.7–§12.9).** The per-size pool rule;
  resumable rasters and the four-class tile-worker queue; raster exports on transient lists; the pin pass; the timing
  phase and confirmed max-clause outliers; 75 / 58 µs; the shipped, scaled stamp-tile asset; §12.8 re-itemised.
* **Scope (the summary, §1.1, §13.1, §13.2, §13.6, §14, §15.1, §16, §17.1, judgment calls).** `rebase(…, at?)`; both
  speed knees; the checks binding every writing seat, reading the captures' JSON, with the list check and its hashed
  twin; the milestone corrections (load-verification memory and the rebased size test at M2a, naming re-draws at M3a);
  the D-5 pairing rules; every published method named; every other area's requests of these sections folded in.
* **Integration (the title note, the summary, §0.10, §3.2, §4.10, §5.2, §8.2, §8.6, §9.6, §10.4, §11.3, §12, §12.4,
  §12.6, §13.3, §13.4, §13.7, §13.8, D-11, D-18, the judgment calls, the staged list, and edits inside the blocks).** 83
  cross-area request rows handled (32 absorbed by the receiving draft, 50 applied here, 1 superseded; the log's §3
  table), four conflicts settled (C-1–C-4); §12.4 re-summed with the index partitions in the pool's copies (CITY ≈ 255 ms
  p50 — 2 + 25 + 16 + 10 + 40 + 17 + 4 + 20 + 25 + 8 + 1 + 5 + 48 + 13 + 12 + 4 + 5 — p95 ≤ 300 ms unchanged;
  METROPOLIS ≈ 609 ms; single worker ≈ 334 ms and TOWN ≈ 76 ms unchanged); §10.4's pack wording aligned to the pack set;
  the summary kept true to the round (bridges where roads cross, the harbour-side gate, wings following the warp brush,
  background prints, walls crossed locally); the paragraphs the edits lengthened re-wrapped at 120 columns (text
  unchanged, word for word); the scripted document checks run over all 71 changed section keys — 0 unreviewed hits (C3's
  93 new runs reviewed into `docs/validation/doc-checks-allow.tsv`), 0 broken table rows, 0 dangling `§` pointers (the
  one external `§16.2` excepted).

**What the Fable review should weigh first.** (1) C-2 / J-I16 with J-P46: the frame lines' levels — the outer ring at L0,
the border at L1 laid across water faces as a deck span is — and whether any reader of a `margin` line still assumes L1
(II.1's `frame` seam type, §3.3's scope check, the hinterland's margin fields). (2) C-4 / J-I17: sites carried through
S1's water operator — an integration addition neither draft wrote. (3) The kernel's demotion rule and `split`-flag
retention (VK3-3, J-K28) and the naming record with its pack-carried row binding (VD3-2, J-DET-41) — the two new
persisted or level-changing mechanisms of the round.

## §R5 Fix-all round 5 (2026-09-26): every item's disposition and the changelog

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r5)

*In plain words.* After round 4, five checkers re-read the design against every round-4 fix. They accepted all 43 and
found 35 new problems the rewrite had introduced or brought to light — one serious, 34 small; the determinism area found
one more while fixing its share — 36 items. Each went to the area of the architecture it belongs to; each area rewrote
its sections, and one integrating seat merged the five rewrites into `docs/ARCHITECTURE.md`, applied every change one
area asked of another and settled two places where the rewrites did not fit together: which bridges get their bank
points placed before the water exists (the kernel's list had not yet seen the pipeline's new rule for a bridge added
while a river is being moved), and how a file saved by the first milestone opens once a later milestone adds a second
fingerprint to saved files (it is rebuilt from its recipe). The serious item: a saved town's fingerprint was being
checked by program versions that had not made it, which would have called almost every old town damaged; now each
fingerprint is checked only by the version that made it. One owner-visible number moved: the effort estimate rises from
150–200 to **153–204 expert person-weeks**, because the pieces rounds 4 and 5 added are now itemised and priced (§16,
D-20). The table says, for every item, what happened to it and where the fix now lives. Every item is **FIXED** (the
architecture now contains a mechanism that defeats the failure the checker wrote down); none was found factually wrong
(**INVALID**); one (NP4-2) concerns stage 3, which the owner's roadmap places later — its hook is now concrete, so it is
FIXED under the governing rule, not staged; nothing was deferred. All six seats were opus stand-ins for Fable seats; the
work is queued for Fable review.

Sources: the area drafts `docs/validation/fix-all/r5-{kernel,determinism,pipeline,rendering,scope}.md` (each item's full
mechanism and its measurements are in its owner's draft), the verifications that raised the items
`docs/validation/fix-all/r4-verify-*.md`, and the integration record `docs/validation/fix-all/r5-integration-log.md`
(conflicts C-1 and C-2, the request ledger, the document checks).

### §R5.1 Disposition of every item handled in round 5

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r5)

**Counts:** 36 items — **36 FIXED**, **0 STAGED-BY-OWNER**, **0 INVALID**, **0 deferred**. By owner area in round 5:
kernel 6, determinism 11, pipeline 8, rendering 6, scope 5 (VD4-10 of the determinism verification was fixed by the
pipeline area, and VS4-5 of the scope verification by the determinism area, because the text sat in those areas'
sections). By source: 35 new findings of the round-4 verifications (VK4-1–VK4-6, VD4-1–VD4-10, NP4-1–NP4-7,
NR4-1–NR4-6, VS4-1–VS4-6) — every round-4 item was accepted, none left UNRESOLVED — and one found by the determinism area
while fixing them (D5-1). By severity: 1 major (VD4-1), 35 minor; no blocker. "where" names the owner area and its
sections; "X:" marks sections other areas changed for the item; a trailing "integration C-n" names the conflict
resolution that shaped the final text.

| id | source | severity or kind | disposition | where in `docs/ARCHITECTURE.md` | one-line reason |
|---|---|---|---|---|---|
| VK4-1 | r4-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 3 (b) and (c), the `flags` comment; §3.3 `CommitRecord.unflagged`; §3.4 `pinVertices`; X: §5.2 F-REDERIVE, §7.3 (b) 4 and 9, §13.1; integration C-1 | a deck's bank vertex left over land keeps the level of its `deck_end` rows — L1 at once when a preparation batch placed them, L0 with no L0 edge when an L0 batch did — until F-REDERIVE strips the rows by `removeEdges`; stripping a vertex's last vertex role row clears its kernel pin, so the deck becomes an ordinary segment of its way |
| VK4-2 | r4-verify-kernel (new finding) | minor | FIXED | kernel: §3.1 planar-subdivision row; §2.2 rule 3; §3.6 (J-K18); J-K32; X: §5.3 kernel row | the withdrawn "Steiner bound" is replaced everywhere by the placement bound; the drift a same-level change leaves is measured (≈ 1.25 cm after one change, ≈ 1.5 cm after several) and read by nothing but the index boxes |
| VK4-3 | r4-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 flag rule (b′), rule 3 (c), J-K28; §3.3 `unflagged`; §3.6 split-flag bullet and fixtures, J-K26; X: II.1 (3), §13.1 | split restoration is guarded by the `split` flag alone (100 000 of 100 000 restored with 0–4 later same-level vertices on the route, where the distance test refused 0.54–0.66 %); a warp clears the flag of an unmoved vertex of its run's own level whose run neighbour moved, so a bent run is never restored straight |
| VK4-4 | r4-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 rule 7, §3.6 held set and fixtures, J-K35; X: §2.7 `Gate.banks`, §4.4, §13.1 | a water gate's `gate_end` vertices are held under a warp unless `fromLevel = 0`, as a deck's are, whatever their level (a generated gate's L1 Steiner vertices, an edited gate's L0 ones) |
| VK4-5 | r4-verify-kernel (new finding) | minor | FIXED | kernel: §2.2 `LevelIndex.tombstones`, `Plat.indexHome`, *Size*; §3.1 index row; §3.3 ("No item changes in place", tombstones, pool steps 1, 2, 4), J-K34; §3.10; X: §5.3 kernel row, §12.8, §13.1 | every item a batch deletes, re-levels or changes is tombstoned in the partition its home entry names and its successor inserted in the grid; tombstones are item keys, one set per partition, emptied by that partition's rebuild — so no query answer depends on rebuild timing (VK-15's cross-district slot reuse closed too) |
| VK4-6 | r4-verify-kernel (new finding) | minor | FIXED | kernel: (a) §3.3 clear-region rules 2–3; (b) §3.4 `splitThrough`, §2.2 rule 7, J-K29; (c) §3.9; X: §2.9 chunks, §13.1 | (a) the border across new water is its stretch between the two contact points, corners included; (b) the kernel allocates an `anchor` contact name's ordinal as the op applies, in canonical order; (c) a change of a level-≤ 1 route edge also rewrites every chunk holding a split on it, which §2.9's rebased-size test counts |
| VD4-1 | r4-verify-determinism (new finding) | **major** | FIXED | determinism: §2.9 steps 2–4, `Base`, `Snapshot`; §5.3 load row; §6.2; §6.4 retention; §6.5 (9); §7.1 (`rebase.version`, `upgrade.baseDigest`); §7.4 rebase and upgrade rows; §7.5; J-DET-44; X: §3.9 (KR5-1), §11.3 (RR5-2 (c)), §13.2 (SR5-1), §16 M3a (SR5-2) | every recomputed-root check runs under the model packages of the output version that recorded the root; a rebased base has a root of record per version (the rebase's under its `version`, each upgrade's `baseDigest` under its `to`, taken after checking under `from`); a frozen view is checked by content hashes only and labelled "made with o<k>; not verified by this version" |
| VD4-2 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 steps 3–4; §6.2 (iii); §5.3 load row; J-DET-45; X: §11.3 (RR5-2 (b)), §12.6 (RR5-4), §13.2, §16 M2a | under the off-edit-path recomputation, "trust the saved town", the keep, saves, exports, digest reads and bridged root comparisons wait until the recomputed roots match (a mismatch withdraws the keep for good); edits do not wait |
| VD4-3 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §2.8 (dormant naming record); §6.3; §6.5 (9); §7.3 item 4; §7.4 lock, setAttr, assign, rerollLayer, revert and undo/redo rows; J-DET-46; X: §11.2 (RR5-1 (c)), §13.2 | a protected name keeps its naming record dormant; the event that ends the protection (unlock, unassign, or an undo, redo or revert that frees it) runs case (4) for it, the rename listed, confirmed and stored; a naming reroll's undo restores the records with the names |
| VD4-4 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §7.1 (`EditBase.renames`, `Rename`, `fates` on `editTable` / `editPreset`); §6.3; §7.3 items 4 and 7 (i); §7.4; §7.6; J-DET-47; X: §11.2 (RR5-1, J-R33), §11.3 (RR5-2 (a)), §14 (SR5-3) | every event whose fold re-draws a name stores the confirmed renames; a replay or a receiving client that computes different ones reports a mismatch; an action whose dry run lists renames returns `confirm`, and `confirm` carries them |
| VD4-5 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §2.8 (`NamingRecord.slices`, `SliceRef.key`), §6.3, §7.6, J-DET-48; X: §9.6 (RR5-3), §10.4 (PR5-1) | each field of a culture or ancestry row is its own naming slice (`<rowKey>/<field>`), so replacing one corpus re-draws only the names drawn from that field — a street list never renames districts |
| VD4-6 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §2.8, §2.9 (`Snapshot.recordsDigest`, steps 2–3), §5.3, §6.2 (the records digest), §6.5 (9), J-DET-49; X: §12.6 (RR5-4), §12.8 (RR5-5), §13.2, §16 M2a; integration C-2 | a records digest over the persisted derivation and naming records — stored, recomputed at every load (≈ 4 ms at CITY, measured), compared by the verification replay; a records-only mismatch adopts the replay's state and re-applies the edits made meanwhile |
| VD4-7 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 (`UndoRecord.redo`, the pack-set rule), §6.5 (9), §7.4 truncation, §7.6, J-DET-35 (restated); X: §13.2 | a truncated target is saved on the redo stack in the `undo` section, and a pack's content stays while the recipe, the log or such a held event names it |
| VD4-8 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §6.4 (link condition, message, CI), §2.9 (`--recipe-only`), §7.4 rebase row, J-DET-50; X: §16 M3a | a link is emitted only when the base is the recipe; a town kept from its saved copy offers its `.plat` file or `&doc=` instead |
| VD4-9 | r4-verify-determinism (new finding) | minor | FIXED | determinism: §2.9 (`Recipe.packs.shipped` informative), §6.4, §7.4 upgrade row, §7.5 (`MigrationMap.packsSaved`), J-DET-35; X: §16 M3a | before an upgrade commits, every pack of the pack set the new version stops shipping is copied into the document from the old version's shipped copy (past the 2 MB cap: an F-EDIT conflict) |
| VS4-5 | r4-verify-scope (new finding; fixed by the determinism area) | minor | FIXED | determinism: §5.2 F-RIVER test column | the test spells the water setting `coast+river`, as `WaterSetting` does |
| D5-1 | found by the determinism area in round 5 | minor | FIXED | determinism: §2.9 `RebaseReason`, §7.4 rebase row, J-DET-51 | the rebase reason `keptOldModel` is removed — keeping the old model at an upgrade needs no rebase, so no event could carry it |
| VD4-10 | r4-verify-determinism (new finding; fixed by the pipeline area) | minor | FIXED | pipeline: §4.2 S1 (5), J-P44; §4.1 S4 and edits rows; §4.3; §2.7 `Bridge.over` and Bridges; X: §2.2 rule 7 (X-K2), §5.2 F-ROUTE (X-D1); integration C-1 | inside S1's water operator or a carve, whose water is not yet inserted, F-ROUTE's extra-bridge rung only sites its deck: the operator's L1 batch places its bank vertices on the way's new route and its L0 batch promotes them; the two-shore-split placement is for standing water only |
| NP4-1 | r4-verify-pipeline (new finding) | minor | FIXED | pipeline: II.4 | II.4's seam exception lists the wing rings of the buildings on the neighbouring footprints and a promoted vertex returning to its level, as §4.6 step 7 and §7.3 item 1 do |
| NP4-2 | r4-verify-pipeline (new finding) | minor (stage-3 subject; hook made concrete) | FIXED | pipeline: §2.6 (`CarriedShapes`, the stored-composition rule, the stage-3 intake, the test), J-P48; X: §2.2 rule 5 (X-K1), §3.6 (X-K3), §3.9 (integration), §5.3 (X-D6), §7.3 item 7 (ii) (X-D5), §7.4 (X-D4), §13.2 and the staged list (X-S6) | a stored stage-3 composition is carried in the same `carryWings` call as the base wings — boundary points made footprint vertices when it is stored, the union, rooms and towers checked, undone with the wings, orphaned visibly on a rare non-warp failure |
| NP4-3 | r4-verify-pipeline (new finding) | minor | FIXED | pipeline: §2.6 ("When it runs is stage-agnostic"), §4.1 S12b and edits rows, J-P47; X: §5.3 (X-D6), §13.2 (X-S1) | `carryWings` runs after every committed batch whose commit record changes a footprint face, in generation or in an edit, so Regenerate (keep settings) is byte-identical to generation |
| NP4-4 | r4-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (4), (7), (11), J-P35, J-P45; X: §13.2 (X-S2) | where the harbour's nucleus has no unforced gate pick left, the detour guard applies unconditionally, so the harbour route stays within 1.5 × the least-cost path |
| NP4-5 | r4-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (11); X: §5.2 F-WALL (X-D2), §13.2 (X-S3), §13.5 (X-S4) | every test counts the N main gates plus a harbour gate where one was placed |
| NP4-6 | r4-verify-pipeline (new finding) | minor | FIXED | pipeline: §2.6 rule 4 (pairing tiers, cost, fallback), J-P49; X: §3.6 (X-K3), §5.3 (X-D6), §12.6 (X-R1), §16 M3a (X-S5) | the wing check is tiered by the building's pairing (no union, a ring test, or the arrangement union), measured ≈ 0.4 ms per pass for 450 buildings, counted in the warp budget and measured at M3a with a pre-decided fallback |
| NP4-7 | r4-verify-pipeline (new finding) | minor | FIXED | pipeline: §4.2 S3 (10), §4.4 outer moats, §2.7 Bridges; X: §5.2 F-REDERIVE (X-D3) | every deck has the site / built states, an outer moat's deck is a `built` `Bridge` whose furniture S7 builds, and a site left over land is removed |
| NR4-1 | r4-verify-rendering (new finding) | minor | FIXED | rendering: §8.10, §8.3 (seam row), J-R42, J-R50; X: §3.1 (K1), §6.1 (D1), §13.2 (SC-2), §13.8 (SC-3), §15.1 (SC-7), §16 M1 (SC-5) | a class's four stamp tiles share one border band cut from a fifth, full tile, so any two meet without a seam (0 close pairs in all 256 2 × 2 arrangements, measured), the check enforced by the build tool and the PR tier |
| NR4-2 | r4-verify-rendering (new finding) | minor | FIXED | rendering: §9.2 (`LabelPlacer.begin`, `PlacementJob`), §8.9, §11.1, §12.7, §8.3, J-R51; X: §14 (SC-4), §13.2 (SC-2), §13.8 (SC-3), §16 M1 (SC-5) | label placement is a resumable job stepped one decision at a time (an export's first in class 4), so a large print never holds up the view; whole and stepped placement give identical digests |
| NR4-3 | r4-verify-rendering (new finding) | minor | FIXED | rendering: §8.10 (*Stamp*, *Grid and line*, *Budgets*), §11.1, J-R52; X: §6.5 (3) (D2), §13.3 (SC-1), §13.8 (SC-3), §16 M3a (SC-5) | instance positions use `dmath` for the rotation and are rounded to integer centimetres under the allowlist lint; the five-engine run compares a GeoJSON with trees byte for byte from M3a |
| NR4-4 | r4-verify-rendering (new finding) | minor | FIXED | rendering: §8.8 (the per-row filter rule), §12.7 (the fallback), J-R53 | a PNG time miss fixes the None row filter on every host (measured 3–6 × faster encoding, the file −4 % to +10 %), then zlib level 3 in Node; in browsers, which take no level, the D-18 re-declaration |
| NR4-5 | r4-verify-rendering (new finding) | minor | FIXED | rendering: §8.4 (light steps), §8.8, §8.2, §8.10, §8.9, §12.7, §8.3, J-R54; X: §16 M2b (SC-5) | with a moving sun, face lighting, roofs, hillshade and lit crowns follow 15° / 5° light steps shared by the view, each re-rastered by a light pass that runs to completion; measured at M2b, with the fixed sun as the pre-decided fallback |
| NR4-6 | r4-verify-rendering (new finding) | minor | FIXED | rendering: §12 opening, §12.6; X: the one-page summary (SC-6) | "a typical run" now reads "19 runs in 20" (the p95), and the load-verification sentence says where the edits and the replay run |
| VS4-1 | r4-verify-scope (new finding) | minor | FIXED | scope: J-I15 (pipe escaped), §17.1 (2) (iv), J-S39; `docs/validation/bench/doc_checks.py` S1 | the table check counts cells by unescaped pipes, which is the renderer's rule, and J-I15 renders whole |
| VS4-2 | r4-verify-scope (new finding) | minor | FIXED | scope: §14 `EditEngine.rebase`, J-S38; X: §7.1 (the determinism block) | `rebase` returns an `ApplyResult`; a bad `at` is a `conflict` whose message begins `E_REBASE_AT`, nothing appended, on every host alike |
| VS4-3 | r4-verify-scope (new finding) | minor | FIXED | scope: §16 M1 and M2a, J-S37, J-S40, J-I14; X: §12.8 (RS5-1); integration C-2 (§2.9 step 5, J-I19) | M1 builds the `.plat` writer and reader for generated towns and exits on their round trip; M2a builds the log and load verification over that format; an M1 file, which has no records digest, loads by regeneration |
| VS4-4 | r4-verify-scope (new finding) | minor | FIXED | scope: §13.6 (2), (3), (9); §14; §16 M-1; §17.1 (4); D-29; J-S41, J-S42; X: II.2 (PS5-1) | FTG pairs are generated at the capture's recorded population, carried to the product by a committed numbers-only `ftg-captures.json`; NG's square pairs, and the `square` row's default, use the `void` mode |
| VS4-6 | r4-verify-scope (new finding) | minor | FIXED | scope: §16 (plain words, effort table, the new components paragraph, cuts), D-20, J-15, J-S6, J-S43 | the six new components rounds 4–5 added are itemised (≈ 14–22 working days) and priced; the total moves from 150–200 to 153–204 pw with the milestone rows summing to it, and every later pass prices its build work the same way |

### §R5.2 Conflicts settled at integration

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r5)

| # | the disagreement | resolution | judgment |
|---|---|---|---|
| C-1 | which decks get L0 and which L1 `deck_end` rows (kernel × pipeline, found at integration): the kernel's VK4-1 text listed "S4's or an edit's added deck" among the L0 writers, while the pipeline's VD4-10 made F-ROUTE's extra-bridge rung only site its deck inside S1's water operator or a carve, its bank vertices placed by the operator's L1 batch; the determinism draft's folded §7.3 (b) 4 also named S5a an L0 writer, which the kernel's round-5 reading corrected (S5a's outer moat places L1 rows) | the added deck is an L0 writer **on standing water** only; a deck the rung sites inside a water operator or a carve has L1 rows, its operator's preparation batch placing them — §2.2 rule 3's writer list, §7.3 (b) 4 (the kernel's X-D1 text, with the outer moat and the rung's deck added) and §2.2 rule 7 (the pipeline's X-K2) agree | J-I18 (new) |
| C-2 | how a document saved by M1's generated-town format opens once M2a adds the records digest (scope × determinism, found at integration): the scope's VS4-3 builds the `.plat` writer at M1 and says M2a's reader opens an M1 file "by the same regeneration", while the determinism's VD4-6 makes `recordsDigest` a required snapshot field checked at every load, and §2.9 had no rule for a file without it | §2.9 step 5: the schema transform that adds `recordsDigest` drops such a file's `model` — nothing recorded a records root for it — and the load regenerates the town from its recipe and empty log, never reporting it verified; a *preview* file loses nothing | J-I19 (new) |

Harmonised without a conflict (each draft had deferred to the owning lane's wording for the companion text it folded):
§7.3 (b) 9 and §5.2 F-REDERIVE take the kernel's "and clears their kernel pins" (X-D2); §5.3's kernel row takes the
kernel's X-D3 (placement bound, level consistency, index freshness); §5.2's F-ROUTE, F-WALL and F-REDERIVE rows take the
pipeline's X-D1–X-D3 over the determinism draft's folded sentences (the carve added to the rung's exception, the roads
leaving each walled stage counted, a crossing site's own detection and ladder clause); §7.4's warp paragraph takes the
pipeline's X-D4 (a stored composition's rings and tower centres; its check; the undo record), and the warp row says
"stored compositions"; §6.5 (3) takes the rendering area's D2 wording of the instance function's lint closure. The
rendering draft folded determinism RR5-4 and pipeline X-R1 into §12.6, and the scope draft folded determinism SR5-2 and
SR5-3, pipeline X-S5 and rendering SC-4, SC-5 and SC-9 into §14, §16 and J-I15; each was phrase-checked in place and not
applied twice.

### §R5.3 Changelog of `docs/ARCHITECTURE.md`, round 5

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r5)

* **Size and marking.** 10 723 → 11 477 lines (`wc -l`). 62 section headings carry the round-5 review banner (42
  sections replaced by area blocks, the delegated-decision and judgment-call sections changed by row blocks and at
  integration, 18 headings changed at integration only — the new §0.11 among them); the title's revision note and §0.11
  record the round; judgment calls grew from 244 to 269 rows (J-K34–J-K35, J-DET-44–J-DET-51, J-P47–J-P49, J-R50–J-R54,
  J-S39–J-S43 from the drafts; J-I18–J-I19 from integration; J-K18, J-K26, J-K28, J-K29, J-K32, J-DET-35, J-P35, J-P42,
  J-P44, J-P45, J-R42, J-S37 and J-S38 restated; J-15, J-S6, J-R33 and J-I14 amended; J-I15's pipe escaped).
* **Kernel (§2.2, §3.1, §3.3, §3.4, §3.6, §3.9, §3.10).** A deck over land keeps the level of its rows until F-REDERIVE
  strips them, and a vertex that loses its last vertex role loses its pin; the placement bound replaces the Steiner
  bound everywhere, with the several-change drift measured; restoration guarded by the `split` flag alone, cleared when
  a warp moves the run under an unmoved same-level vertex; water gates held under a street-level warp; tombstones as item
  keys, one set per partition, with the index's home column; the border's stretch across new water, kernel-allocated
  contact-name ordinals, chunks rewritten with the route edges their splits name.
* **Determinism (§2.8, §2.9, §5.2, §5.3, §6.2–§6.5, §7.1, §7.3–§7.6).** Roots checked under the version that recorded
  them, with roots of record for a rebased base and content-hash-only frozen views; the keep and saves gated on the
  off-path recomputation; dormant naming records and stored, confirmed renames; field-level naming slices; the records
  digest; packs held by a saved redo and copied at an upgrade that stops shipping them; links only from recipe-based
  towns; `keptOldModel` removed.
* **Pipeline (§2.6, §2.7, §4.1–§4.4, II.4).** The wing carry after every batch that changes a footprint face, with a
  stored stage-3 composition carried alike and a check tiered by pairing (measured, counted, with its fallback); decks
  inside a water operator sited and placed by the operator's own batches; the harbour detour guard where the harbour's
  nucleus has no pick left; the gate counts; the deck states and the outer moat's built bridge.
* **Rendering (§8.2–§8.4, §8.8–§8.10, §9.2, §11.1, §12 opening, §12.6, §12.7).** Seam-compatible stamp tiles; resumable
  label placement; integer-centimetre instance positions under the lint; the PNG row-filter rule and its None fallback;
  light steps and light passes for a moving sun; "19 runs in 20".
* **Scope (§13.6, §14, §16, §17.1, D-20, D-29, the judgment calls).** The table check's cell count; `rebase`'s typed
  refusal; the M1 document format; the FTG capture file and recorded populations; the `void` square; the effort estimate
  153–204 pw with the new components itemised.
* **Integration (the title note, the summary, §0.11, §6.1, §9.6, §10.4, §11.2, §11.3, §12.8, §13.1–§13.3, §13.5, §13.8,
  §15.1, II.1, II.2, the staged list, the judgment calls, and edits inside the blocks of §2.2, §2.7, §2.9, §3.1, §3.6,
  §3.9, §4.4, §5.2, §5.3, §6.2, §6.5, §7.3 and §7.4).** 55 cross-area request rows handled (43 applied here — 8 of them
  over a draft's folded companion text, the owner's wording governing — 8 absorbed by the receiving draft, 4 alignment
  notes satisfied; the log's §3 table), two conflicts settled (C-1, C-2); the summary kept true to the round (a street
  list renames only its streets; a freed name offered its list's new name; keeping a saved copy waits for its check; old
  towns shown unverified; a kept town shared as its file); II.2's quoted template phrase put in our own words; the
  paragraphs the edits lengthened re-wrapped at 120 columns (text unchanged, word for word); the scripted document checks
  run over all 62 changed section keys — 0 unreviewed hits (50 runs reviewed into `docs/validation/doc-checks-allow.tsv`,
  most of them in §13.5 and II.2, first scanned this round), 0 broken table rows under the new cell count, 0 dangling
  `§` pointers (the one external `§16.2` excepted), 269 of 269 cited judgment ids and 35 of 35 decision ids defined.

**What the Fable review should weigh first.** (1) VD4-1 / J-DET-44 with C-2 / J-I19: the version-pinned roots — two new
persisted fields (`rebase.version`, `upgrade.baseDigest`), the records digest's schema-level encoding beside the model
digest's version-level one, and the M1-file rule this seat added. (2) C-1 / J-I18 with VK4-1 and VD4-10: the split of
deck writers by the water they stand on, across §2.2 rules 3 and 7, §7.3 (b) 4 and §5.2 F-ROUTE. (3) The owner-visible
moves: the effort estimate 153–204 pw (J-S43), the confirmation a freed name now asks for on undo or unlock (J-DET-46),
and the `void` default of the `square` template (J-S42).

## §Ab Amendments b applied (2026-09-26)

Lane `amendments-b/assemble-r0` (2026-09-27, a mechanical seat) applied the ten block files of
`docs/validation/amendments-b/` — the part seats' text for items 8–31 of `docs/AMENDMENTS-2026-09-25b.md` — to
`docs/ARCHITECTURE.md` and `docs/ARCHITECTURE-RATIONALE.md` with `docs/validation/amendments-b/apply-blocks.py`, in
file-name order and, within a file, in block order. All 131 blocks were applied and none was skipped: 61 REPLACE, 49
APPEND TO SECTION and 1 INSERT AFTER, plus 10 J-ROWS blocks (156 rows of the judgment index) and 10 RATIONALE-A blocks
(156 entries of Part A). The document grew from 9 667 to 12 417 lines (1 121 558 to 1 503 967 bytes; sha256
`1dbfd9d4…` to `87d89692…`), and the rationale file from 1 857 to 2 013 lines (sha256 `5f80e197…` to `3f39b2de…`).
The copies taken before assembly are `docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-2026-09-26.md`. The headings went from 140 to 145: `## II.7`
and its four subsections are new, and the REPLACE of §0.2 retitled that heading. Four APPEND blocks were overwritten
by a later REPLACE of the same heading that carries their text verbatim, and each of them is present exactly once.
The reference check finds no broken reference beyond the two external citations the document already had. The
document checks over the 25 changed top-level keys exit 0 (C1 5 / 0, C2 0 / 0, C3 1 138 / 0, C4 9 / 0, S1 0, S2 0)
after 451 reviewed allow rows. The lane's record is `docs/validation/amendments-b/assemble-r0.md`.

The home and the referencing sections of each item are read from §0.2's landing table as assembled. The column
"blocks applied" lists, for each block file (`blocks-⟨seat⟩.md`; `p-` stands for `pipeline-`), the blocks whose
text names the item (as "item N", `J-AN.n`, `TN-n` or `AM-N`). `R#n` is the file's n-th block, a REPLACE; `A#n` is
an APPEND TO SECTION and `I#n` an INSERT AFTER; the key before it is the section the block targets. The four carried
blocks are the §4.11 APPENDs of `p-assignments` (A#5), `p-emulation-hidden` (A#9) and `p-evolution-islands` (A#1),
which `p-prosperity-change-dossier-plan` R#1 carries, and the §4.2 APPEND of `p-assignments` (A#4), which
`p-emulation-hidden` R#2 carries.

| item | home section | referencing sections | blocks applied |
|---|---|---|---|
| 8 | §4.11 | §2.6, §2.8, §6.3, §7.1, §7.4, §8.2, §15.2, §16, D-25 | determinism: §6.3 R#6, §7.1 R#8, §7.3 R#10, §7.4 R#11; model: §2.6 R#6, §2.7 R#7, §2.8 R#8; p-assignments: §4.7 R#1; p-evolution-islands: §4.11 A#1, §4.7 A#4, §10.2 A#5; p-prosperity-change-dossier-plan: §4.11 R#1; p-sewers: PART II A#1; rendering: §8.2 R#2, §11.1 R#10; scope: §0.2 R#2, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A8.*: 11 index rows + 11 Part A entries |
| 9 | §1.1 | §13.6 | scope: §0.2 R#2; J-A9.*: 1 index rows + 1 Part A entries |
| 10 | II.6 | §4.5, §4.9, §4.11, §2.7, §7.1, §7.4, D-3 | model: §2.7 R#7; p-emulation-hidden: §4.5 R#5; p-evolution-islands: §4.11 A#1, II.6 A#2, §4.9 A#3; p-prosperity-change-dossier-plan: §4.11 R#1; scope: §0.2 R#2, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A10.*: 4 index rows + 4 Part A entries |
| 11 | II.6 | §4.11, §2.7, §2.8, §7.1, §7.4, §8.2, §8.4, D-25 | model: §2.7 R#7, §2.8 R#8; p-evolution-islands: §4.11 A#1, II.6 A#2; p-prosperity-change-dossier-plan: §4.11 R#1; p-sewers: PART II A#1; rendering: §8.2 R#2, §11.1 R#10; scope: §0.2 R#2, §13.2 A#7, §16 R#14, Staged list R#18; J-A11.*: 3 index rows + 3 Part A entries |
| 12 | II.7.3 | II.7.4, §2.1, §2.2, §2.5, §2.7, §3.7, §5.2, §5.3, §6.1, §8.4, §11.1, §13.1, §14 | kernel: §3.4 A#3, §3.7 R#4; model: §2.1 A#1, §2.2 R#2, §2.5 R#5, §2.6 R#6, §2.7 R#7; p-evolution-islands: II.6 A#2; p-sewers: PART II A#1, II.6 A#2, §4.5 A#6; rendering: §8.4 R#4, §11.1 R#10; scope: §0.2 R#2, §13.1 A#6, §13.2 A#7, §13.8 A#10, §16 R#14, Staged list R#18; J-A12.*: 11 index rows + 11 Part A entries |
| 13 | II.6 (2) | §1.1, PART III, §4.5, §4.11, §7.8, D-3, D-33 | determinism: §7.8 R#15; model: §2.7 R#7; p-emulation-hidden: §4.5 R#5; p-evolution-islands: §4.11 A#1, II.6 A#2, PART III A#6; p-prosperity-change-dossier-plan: §4.11 R#1; scope: §0.2 R#2, §1.1 R#3, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A13.*: 2 index rows + 2 Part A entries |
| 14 | II.7.1 | §1.1, §1.2, §4.2, PART III, §6.1, §7.8, §8.4, D-3 | determinism: §7.8 R#15; model: §2.1 A#1, §2.7 R#7, §2.9 R#9; p-emulation-hidden: §4.2 R#2; p-sewers: PART II A#1, II.6 A#2, PART III A#4, §4.2 A#5; rendering: §8.4 R#4; scope: §0.2 R#2, §1.1 R#3, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A14.*: 4 index rows + 4 Part A entries |
| 15 | II.6 | §4.5, §6.1, §7.8, §8.4, D-3 | determinism: §7.8 R#15; model: §2.7 R#7; p-emulation-hidden: §4.5 R#5; p-evolution-islands: II.6 A#2; rendering: §8.4 R#4; scope: §0.2 R#2, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A15.*: 2 index rows + 2 Part A entries |
| 16 | §4.7 S10b | §10.2, §4.2, §7.7, §7.3, §5.2, §2.5, §12.4, §13.9, §14, §15.2, §16, D-32 | determinism: §7.7 R#14; p-assignments: §4.7 R#1, §10.1 R#2, §10.2 R#3, §4.2 A#4, PART III A#8; p-emulation-hidden: §4.2 R#2, §4.5 R#5, §4.6 R#6; rendering: §12.4 R#14, §12.6 R#15; scope: §0.2 R#2, §13.2 A#7, §13.9 A#11, §14 R#12, §15.2 R#13, §16 R#14, Delegated decisions R#16; J-A16.*: 9 index rows + 9 Part A entries |
| 17 | §4.11 | §2.6, §2.8, §6.3, §7.1, §7.4, §7.7, §10.3, §11.3, D-25 | determinism: §5.2 R#1, §5.3 R#2, §6.1 R#4, §6.3 R#6, §7.1 R#8, §7.4 R#11, §7.5 A#12, §7.7 R#14; model: §2.6 R#6, §2.7 R#7, §2.8 R#8; p-assignments: §4.7 R#1, §10.2 R#3, §4.11 A#5, §10.3 A#7, PART III A#8; p-evolution-islands: §4.11 A#1; p-prosperity-change-dossier-plan: §4.11 R#1, §10.2 A#8; rendering: §11.2 R#11, §12.6 R#15; scope: §0.2 R#2, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A17.*: 4 index rows + 4 Part A entries |
| 18 | §4.7 S11 | §2.5, §2.6, §4.11, §6.1, §6.3, §7.3, §7.4, §7.7, §14, §16 | determinism: §6.1 R#4, §7.1 R#8, §7.3 R#10, §7.7 R#14; kernel: §3.4 A#3; model: §2.6 R#6, §2.8 R#8; p-assignments: §4.7 R#1, §4.11 A#5, PART III A#8; p-prosperity-change-dossier-plan: §4.11 R#1, §4.1 A#2, II.4 A#11; rendering: §11.2 R#11, §12.6 R#15; scope: §0.2 R#2, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A18.*: 4 index rows + 4 Part A entries |
| 19 | §4.7 S11 | §2.6, §10.2, §8.2, §7.7, §1.4, §16, D-2 | determinism: §7.7 R#14; model: §2.5 R#5, §2.6 R#6, §2.7 R#7; p-assignments: §4.7 R#1, §10.2 R#3, PART III A#8; p-prosperity-change-dossier-plan: §4.11 R#1, §10.2 A#8; rendering: §8.2 R#2, §8.3 R#3, §8.5 R#5, §11.2 R#11, §12.6 R#15; scope: §0.2 R#2, §1.4 R#5, §13.2 A#7, §16 R#14; J-A19.*: 4 index rows + 4 Part A entries |
| 20 | §7.7 | §7.1, §7.2, §7.4, §5.2, §5.3, §5.4, §2.8, §2.9, §4.7, §4.11, §11.3, §11.4, summary, §14, §15.2, §16 | determinism: §5.2 R#1, §5.4 R#3, §6.5 R#7, §7.1 R#8, §7.4 R#11, §7.5 A#12, §7.7 R#14; model: §2.8 R#8, §2.9 R#9; p-assignments: §4.7 R#1, §4.11 A#5; p-prosperity-change-dossier-plan: §4.11 R#1; rendering: §11.2 R#11, §11.3 R#12, §11.4 R#13, §12.6 R#15; scope: §0.2 R#2, §13.2 A#7, §15.2 R#13, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A20.*: 8 index rows + 8 Part A entries |
| 21 | §17.3 | D-22, §17.1, §17.4, §11.3 | kernel: §3.1 R#1; rendering: §11.2 R#11, §11.3 R#12, §12.6 R#15; scope: §0.2 R#2, §17.1 R#15; J-A21.*: 3 index rows + 3 Part A entries |
| 22 | §7.7 | §6.2, §7.3, §5.4, §2.9, §4.2, §4.7, §4.11, §11.3, §11.4 | determinism: §6.2 A#5, §6.5 R#7, §7.1 R#8, §7.4 R#11, §7.7 R#14; model: §2.8 R#8, §2.9 R#9; p-assignments: §4.7 R#1; p-prosperity-change-dossier-plan: §4.11 R#1, §4.1 A#2, §4.2 A#3, §4.5 A#4; rendering: §11.2 R#11, §11.3 R#12, §11.4 R#13, §12.6 R#15; scope: §0.2 R#2, §13.2 A#7, §15.2 R#13, §16 R#14, Staged list R#18; J-A22.*: 5 index rows + 5 Part A entries |
| 23 | §7.6 | §1.4, §17.1, §4.1, §4.7, §13.5, §16 | determinism: §7.6 R#13; model: §2.3 R#3, §2.5 R#5, §2.6 R#6; p-assignments: §4.7 R#1, §10.2 R#3; p-emulation-hidden: §4.1 A#1, §4.2 R#2, §4.5 R#5, §4.6 R#6, §4.11 A#9; p-evolution-islands: §4.11 A#1; p-prosperity-change-dossier-plan: §4.11 R#1, §10.2 A#8; p-sewers: PART II A#1; rendering: §8.2 R#2, §9.2 R#8; scope: §0.2 R#2, §1.4 R#5, §13.2 A#7, §13.5 A#8, §16 R#14, §17.1 R#15; J-A23.*: 3 index rows + 3 Part A entries |
| 24 | §4.2 | §4.3, §4.5, §4.7, §10.2, §2.5, summary, §1.4, §13.5, §13.7, D-16, D-17 | model: §2.5 R#5; p-assignments: §4.7 R#1, §10.2 R#3; p-emulation-hidden: §4.2 R#2, §4.3 A#3, §4.4 A#4, §4.5 R#5, §4.7 A#7, §4.11 A#9, §10.2 A#10, PART III A#11; p-prosperity-change-dossier-plan: §4.11 R#1; scope: §0.2 R#2, §1.4 R#5, §13.2 A#7, §13.5 A#8, §13.7 A#9, §16 R#14; J-A24.*: 4 index rows + 4 Part A entries |
| 25 | §4.11 | §2.3, §7.1, §7.4, §7.3, §6.1, D-25 | determinism: §6.1 R#4, §7.1 R#8, §7.3 R#10; model: §2.3 R#3, §2.7 R#7; p-emulation-hidden: §4.11 A#9, PART III A#11; p-evolution-islands: §4.11 A#1; p-prosperity-change-dossier-plan: §4.11 R#1; scope: §0.2 R#2, §13.2 A#7, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A25.*: 4 index rows + 4 Part A entries |
| 26 | §4.9 | §4.2, §10.2, §4.1, §4.4, §1.4, §15.2, §16 | p-assignments: §10.2 R#3, §4.2 A#4; p-emulation-hidden: §4.1 A#1, §4.2 R#2, §4.4 A#4, §4.9 R#8, §10.2 A#10, PART III A#11; rendering: §12.4 R#14; scope: §0.2 R#2, §1.4 R#5, §13.2 A#7, §15.2 R#13, §16 R#14; J-A26.*: 4 index rows + 4 Part A entries |
| 27 | §4.5 | §10.2, §4.7, §4.9, §2.5, §1.4, §13.5 | model: §2.5 R#5, §2.6 R#6; p-assignments: §4.7 R#1; p-emulation-hidden: §4.2 R#2, §4.5 R#5, §4.6 R#6, §4.9 R#8, §10.2 A#10, PART III A#11; p-prosperity-change-dossier-plan: §4.11 R#1, §4.5 A#4; scope: §0.2 R#2, §1.4 R#5, §13.2 A#7, §13.5 A#8, §14 R#12, §16 R#14; J-A27.*: 5 index rows + 5 Part A entries |
| 28 | §2.6 | §2.8, §2.9, §4.1, §4.7, §10.2, §4.11, II.4, II.5, §3.4, §3.10, §5.2, §5.3, §6.1, §6.2, §6.5, §7.1, §7.3, §7.4, §8.5, §8.6, §11.1, §12.7, §12.8, summary, §1.1, §1.2, §13.1, §13.7, §14, §16 | determinism: §5.2 R#1, §5.3 R#2, §6.1 R#4, §6.2 A#5, §6.3 R#6, §6.5 R#7, §7.1 R#8, §7.3 R#10, §7.4 R#11, §7.5 A#12, §7.6 R#13, §7.7 R#14, §7.8 R#15; kernel: §3.4 A#3, §3.8 R#5, §3.10 R#6; model: §2.5 R#5, §2.6 R#6, §2.7 R#7, §2.8 R#8, §2.9 R#9; p-assignments: §4.7 R#1, §10.2 R#3; p-emulation-hidden: §4.5 R#5, §4.6 R#6; p-prosperity-change-dossier-plan: §4.11 R#1, §4.1 A#2, §4.7 A#6, §10.2 A#8, II.4 A#11, II.5 A#12; rendering: §8.2 R#2, §8.3 R#3, §8.5 R#5, §8.6 R#6, §11.1 R#10, §12.7 R#16, §12.8 R#17; scope: §0.2 R#2, §13.1 A#6, §13.2 A#7, §13.7 A#9, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A28.*: 27 index rows + 27 Part A entries |
| 29 | §2.6 | §2.3, II.7.3, §2.2, §2.5, §4.7, §10.2, §4.6, §5.3, §6.1, §7.1, §7.3, §7.4, §8.2, §8.5, §11.1, §1.4, §13.5, §15.2, §16 | determinism: §5.3 R#2, §6.1 R#4, §7.1 R#8, §7.2 R#9, §7.3 R#10, §7.4 R#11, §7.5 A#12; model: §2.2 R#2, §2.3 R#3, §2.5 R#5, §2.6 R#6; p-assignments: §4.7 R#1; p-emulation-hidden: §4.7 A#7; p-prosperity-change-dossier-plan: §4.6 A#5, §10.2 A#8; p-sewers: PART II A#1; rendering: §8.2 R#2, §8.3 R#3, §8.5 R#5, §11.1 R#10; scope: §0.2 R#2, §1.4 R#5, §13.2 A#7, §13.5 A#8, §15.2 R#13, §16 R#14, Staged list R#18; J-A29.*: 6 index rows + 6 Part A entries |
| 30 | §4.6; §9.2 | §4.7, §2.4, §2.6, §2.8, §2.9, §3.4, §4.11, PART III, §5.2, §5.3, §6.1, §7.1, §7.4, §7.7, §8.3, §8.5, §11.1, §11.4, summary, §13.5, §13.7, §14, §15.2, §16 | determinism: §5.2 R#1, §5.3 R#2, §7.1 R#8, §7.4 R#11, §7.7 R#14; kernel: §3.4 A#3, §3.10 R#6; model: §2.2 R#2, §2.4 R#4, §2.5 R#5, §2.6 R#6, §2.7 R#7, §2.8 R#8, §2.9 R#9; p-assignments: §4.7 R#1, §10.2 R#3; p-emulation-hidden: §4.6 R#6, §4.7 A#7, §4.11 A#9, PART III A#11; p-prosperity-change-dossier-plan: §4.11 R#1, §4.6 A#5; p-sewers: PART II A#1; rendering: §8.2 R#2, §8.3 R#3, §8.5 R#5, §9.2 R#8, §9.5 R#9, §11.1 R#10, §11.2 R#11, §11.3 R#12, §12.6 R#15; scope: §0.2 R#2, §13.2 A#7, §13.5 A#8, §13.7 A#9, §15.2 R#13, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A30.*: 13 index rows + 13 Part A entries |
| 31 | §4.11 | §4.7, §4.5, §4.6, §4.9, §10.2, §10.3, II.1, II.3, §2.5, §2.6, §2.8, §6.1, §6.3, §7.1, §7.2, §7.4, §7.3, §7.5, §7.6, §5.2, §5.3, §8.2, summary, §14, §15.2, §16, D-25 | determinism: §5.2 R#1, §5.3 R#2, §6.1 R#4, §6.3 R#6, §7.1 R#8, §7.2 R#9, §7.3 R#10, §7.4 R#11, §7.5 A#12, §7.6 R#13; kernel: §3.4 A#3; model: §2.5 R#5, §2.6 R#6, §2.8 R#8; p-assignments: §4.7 R#1, §4.11 A#5, §10.3 A#7; p-emulation-hidden: §4.5 R#5, §4.11 A#9; p-prosperity-change-dossier-plan: §4.11 R#1, §4.5 A#4, §4.6 A#5, §4.7 A#6, §4.9 A#7, §10.2 A#8, II.1 A#9, II.3 A#10; rendering: §8.2 R#2, §11.1 R#10, §12.6 R#15; scope: §0.2 R#2, §13.2 A#7, §15.2 R#13, §16 R#14, Delegated decisions R#16, Staged list R#18; J-A31.*: 15 index rows + 15 Part A entries |

### §Ab.1 Repair round 1 applied (2026-09-27)

Lane `amendments-b/assemble-r1` (2026-09-27, a mechanical seat) applied the six repair files of round 1 —
`docs/validation/amendments-b/repair-r1-{determinism,kernel,model,pipeline,rendering,scope}.md`, the Opus stand-in
seats' answers to the 230 issues of the six verify-r0 reports — with `docs/validation/amendments-b/apply-blocks.py`, in
file-name order. All 94 blocks were applied and none was skipped: 82 REPLACE (every one on a distinct heading), 6 J-ROWS
blocks (50 rows) and 6 RATIONALE-A blocks (54 entries). The seats' hand-off was then applied by
`docs/validation/amendments-b/assemble-r1-handoff.py`: the 23 restated index rows and 27 restated Part A entries were
moved into the older rows' places and the older rows deleted (one row per id; 459 index rows and 459 Part A entries, no
duplicate id); the paragraph under `# Judgment calls` was swapped for scope's VS-40 text; and the rendering seat's three
one-string substitutions were made (§2.6 `Room.lit`, §7.6's table enumeration, §2.9's export reach). The document went
from 12 417 to 12 793 lines (1 503 967 to 1 571 348 bytes; sha256 `87d89692…` to `365e19f2…`), the rationale file from
2 013 to 2 040 lines (`3f39b2de…` to `50a94f2d…`); the copies taken before are
`docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r1-2026-09-27.md`. Headings stay 145 (every heading line
unchanged); fence lines go from 110 to 108 because the II.6 REPLACE removes the retired island code block (VK-05, VP-01).
The resolver (`refs.py`) finds the same 2 external citations and nothing else broken; the document checks over the 25
changed top-level keys exit 0 after 142 of the seats' reviewed allow rows and 57 of the assembler's. The report is
`docs/validation/amendments-b/assemble-r1.md`.

Legend. *Part* is the repair seat that answered the issue (several when more than one seat's blocks cite it). *Blocks*
are the subsections whose REPLACE block the seat's ledger lists for the issue, plus the J rows it restated or added and
any scripted hand-off step; *where* is the location cell of the seat's own issue table (the kernel seat kept its ledger
in its block file's preamble and has no such table, so its cell is "—"). Every one of the 230 issue ids that the six
verify-r0 reports define appears once.

| issue | part | blocks (the seat's ledger; J rows; hand-off) | where (the seat's issue table) |
|---|---|---|---|
| V-MAB-01 | model | §2.6, J rows J-A30.23 | §2.6 |
| V-MAB-02 | model | §2.2, §2.6, J rows J-A29.23 | §2.6, §2.2 |
| V-MAB-03 | determinism | §7.4, J rows J-A30.71 | §7.4, §7.1, §5.3 |
| V-MAB-04 | kernel | §3.10, J rows J-A30.31 | — |
| V-MAB-05 | pipeline | §4.11 | §4.11 |
| V-MAB-06 | model | §2.5, J rows J-A30.24 | §2.5 |
| V-MAB-07 | pipeline | §4.6 | §4.6 |
| V-MAB-08 | model | §2.9 | §2.9 |
| V-MAB-09 | model | §2.9 | §2.9 |
| V-MAB-10 | pipeline | II.6 | II.6, II.7.3 |
| V-MAB-11 | pipeline | II.7.4 | II.7.4 |
| V-MAB-12 | model | §2.3 | §2.3 |
| V-MAB-13 | pipeline | §4.11 | §4.11 |
| V-MAB-14 | model | §2.6, J rows J-A29.24, J-A29.23 | §2.6 |
| V-MAB-15 | model | §2.3, §2.6, J rows J-A29.24, J-A29.23 | §2.3; §2.6 |
| V-MAB-16 | model | §2.6 | §2.6 |
| V-MAB-17 | model | §2.6 | §2.6 |
| V-MAB-18 | model | §2.6, J rows J-A29.24, J-A29.23 | §2.6 |
| V-MAB-19 | model | §2.6, J rows J-A28.28 | §2.6 |
| V-MAB-20 | pipeline | §10.2 | §10.2 |
| V-MAB-21 | model | §2.6, J rows J-A28.28 | §2.6 |
| V-MAB-22 | model | §2.5, §2.6, J rows J-A28.29 | §2.6 (+ §2.5 pointer) |
| V-MAB-23 | model | §2.6, J rows J-A28.29 | §2.6 (+ §2.5 pointer) |
| V-MAB-24 | model | §2.8 | §2.8 |
| V-MAB-25 | model | §2.2, §2.6, J rows J-A29.23 | §2.6, §2.2 |
| V-MAB-26 | model | §2.6 | §2.6 |
| V-MAB-27 | model | §2.6 | §2.6 |
| V-MAB-28 | model | §2.5 | §2.5 |
| V-MAB-29 | model, pipeline, rendering | §4.11, §2.8, §8.2, J rows J-A8.22 | §2.6, §2.8 |
| V-MAB-30 | model | §2.6 | §2.6 |
| V-MAB-31 | model | §2.6, J rows J-A29.23 | §2.6, §2.2 |
| V-MAB-32 | model | §2.6, J rows J-A28.29 | §2.6 (+ §2.5 pointer) |
| V-MAB-33 | model | §2.7 | §2.7 |
| V-MAB-34 | rendering | §12.7, §12.6, J rows J-A28.83 | §12.7; §12.6 |
| V-MAB-35 | scope | §0.2 | §0.2 rows 11, 25; T25-1 |
| V-MAB-36 | determinism | §7.1, J rows J-A30.72, J-A24.71, J-A31.76 | §7.1, §7.4 |
| V-MAB-37 | determinism | §6.3 | §6.3 |
| V-MAB-38 | determinism | §7.4 | §7.4 warp paragraph |
| V-MAB-39 | pipeline | §4.11 | §4.11 |
| V-MAB-40 | pipeline | §4.11 | §4.11 |
| V-MAB-41 | rendering | §8.1, §9.2, §11.3 | §8.1, §9.2, §11.3 |
| V-MAB-42 | pipeline | §10.2 | §10.2 |
| VK-01 | kernel | §3.1, J rows J-A21.31 | — |
| VK-02 | kernel | §3.1, §3.4, J rows J-A28.34, J-A28.33 | — |
| VK-03 | kernel | §3.4, §3.10 | — |
| VK-04 | determinism, model, scope | §5.3, §2.6, §13.2, J rows J-A30.23 | §2.6; T28-14, T28-4 |
| VK-05 | pipeline | II.6 | II.6 |
| VK-06 | kernel | §3.10, J rows J-A30.31 | — |
| VK-07 | kernel | §3.7 | — |
| VK-08 | kernel | §3.4, §3.10, J rows J-A12.32 | — |
| VK-09 | kernel | §3.4, §3.10, J rows J-A12.32 | — |
| VK-10 | kernel | §3.4, §3.10, J rows J-A12.32 | — |
| VK-11 | kernel | §3.4, §3.10, J rows J-A12.32 | — |
| VK-12 | kernel | §3.4 | — |
| VK-13 | kernel | §3.1, §3.3, §3.4 | — |
| VK-14 | kernel | §3.2 | — |
| VK-15 | kernel | doc-checks-allow.tsv rows (hand-off) | — |
| VK-16 | scope | J rows J-A21.01, J-A21.31 | J-A21.01 Part A |
| VK-17 | scope | §13.1 | §13.1 |
| VK-18 | scope | §13.2 | T28-14, T28-4 |
| VK-19 | scope | §0.2, Staged | §0.2 rows 12, 21, 28, 30; Staged |
| VK-20 | scope | §14 | §13.2 registry sentence; §14 |
| VK-21 | model | §2.6 | §2.6 |
| VK-22 | determinism | §5.2, §7.1 | §7.1, §5.2 |
| VK-23 | determinism | §7.3 | §7.3 click row |
| VK-24 | rendering | §3.8, §11.1, §2.6 (hand-off), J rows J-A28.85 | §8.5, §8.1 item 2, §9.2, §8.6, §11.1, §3.8 |
| VK-25 | rendering | §12.7, J rows J-A28.83 | §12.7 |
| VK-26 | rendering | §8.5, §8.6 | §8.5, §8.6 |
| VK-27 | pipeline | §4.1, II.4, J rows J-A28.42 | §4.1, II.4, J-A28.42 |
| VK-28 | kernel, pipeline | II.7.3, §3.4, §3.10, J rows J-A12.32 | II.7.3 |
| VK-29 | pipeline | II.6, II.7.1 | II.6, II.7.3; II.7.1 |
| VP-01 | pipeline | II.6 | II.6 |
| VP-02 | pipeline | II.6, II.7.3 | II.6, II.7.3 |
| VP-03 | pipeline | §4.1, II.4, J rows J-A28.42 | §4.1, II.4, J-A28.42 |
| VP-04 | rendering | §8.5, §8.6 | §8.5, §8.6 |
| VP-05 | pipeline | §4.11 | §4.11 rung 1, step (c), `LadderOp.relet` |
| VP-06 | pipeline | §4.11, J rows J-A20.41 | §4.11 step (h), J-A20.41 |
| VP-07 | pipeline | §4.11 | §4.11 |
| VP-08 | pipeline | §4.6, §4.11, J rows J-A31.40 | §4.11 rung 2, floor paragraph, `LadderOp.thin`, hidden plots; §4.6 |
| VP-09 | pipeline | §4.11, J rows J-A31.40 | §4.11 rung 2, floor paragraph, `LadderOp.thin`, hidden plots; §4.6 |
| VP-10 | determinism | §5.3, J rows J-A31.75 | §5.3 epoch row |
| VP-11 | scope | §13.2 | T31-9 |
| VP-12 | determinism | §6.1 | §6.1 |
| VP-13 | pipeline | §4.5 | §4.5 |
| VP-14 | pipeline | §4.7 | §4.7 |
| VP-15 | pipeline | §4.7 | §4.7 |
| VP-16 | pipeline | §10.2 | §10.2 |
| VP-17 | pipeline | §10.2 | §10.2 |
| VP-18 | pipeline | II.1, II.7.3 | II.1, II.7.3 |
| VP-19 | pipeline | II.7.4 | II.7.4 |
| VP-20 | pipeline | §4.11, §10.2 | §4.11 lottery and lag, §10.2 |
| VP-21 | pipeline | §4.11 | §4.11 regrowth-first |
| VP-22 | pipeline | §4.11 | §4.11 regrowth-first |
| VP-23 | pipeline | §4.2 | §4.2 (S2, S3 (2), S3 (12)) |
| VP-24 | pipeline | II.7.3, II.7.4, PART III | II.7.3, II.7.4, PART III |
| VP-25 | pipeline | §4.7, §4.11, II.3, J rows J-A31.43 | §4.7; §4.11, §4.7 S10 (2), II.3, J-A31.43 |
| VP-26 | pipeline | §4.5 | §4.5 |
| VP-27 | pipeline | §4.11 | §4.11 rung 1, step (c), `LadderOp.relet` |
| VP-28 | pipeline | §4.7 | §4.7 |
| VP-29 | pipeline | §4.11 | §4.11 regrowth-first |
| VP-30 | pipeline | §10.4 | §10.4 |
| VP-31 | pipeline | §4.1 | §4.1 |
| VP-32 | pipeline | §4.11, J rows J-A31.44 | §4.11, J-A31.44 |
| VP-33 | determinism | §7.4, J rows J-A31.44 | §7.4 `builtBand` row |
| VP-34 | determinism | §7.1, §7.4 | §7.1, §7.4 |
| VP-35 | determinism | §7.6 | §7.6 |
| VP-36 | model | §2.3, §2.5, §2.6, J rows J-A29.24, J-A29.23 | §2.3; §2.6; §2.5 |
| VP-37 | rendering | §12.6 | §12.6 |
| VP-38 | scope | §0.2, §13.2 | §0.2 rows 11, 25; T25-1 |
| VP-39 | scope | §14 | §13.2 registry sentence; §14 |
| VP-40 | scope | §13.2 | T8-7, T31-4, T12-1 |
| VP-41 | scope | Staged | Staged |
| VD-01 | determinism | §6.3 | §6.3 |
| VD-02 | determinism | §6.1, J rows J-A28.61 | §6.1, §6.2, §7.1, §7.4 |
| VD-03 | determinism | §6.1, §7.1, §7.4, J rows J-A28.61 | §6.1, §6.2, §7.1, §7.4 |
| VD-04 | determinism | §5.1, §7.4 | §5.1 (6), §7.4 |
| VD-05 | determinism | §7.4, §7.7, J rows J-A20.74, J-A20.41 | §7.7, §7.4 |
| VD-06 | pipeline | §4.11, J rows J-A20.41 | §4.11 step (h), J-A20.41 |
| VD-07 | determinism | §6.2, §7.1, §7.4, J rows J-A22.74, J-DET-6 | §7.1, §7.4, §6.2, §7.7 |
| VD-07b | pipeline | §4.2 | §4.2 |
| VD-08 | determinism | §7.4, §7.7 | §7.7 item 6, §7.4 epoch row |
| VD-08b | pipeline | §4.11 | §4.11 |
| VD-09 | determinism | §6.1 | §6.1 |
| VD-10a | pipeline | §4.11 | §4.11 |
| VD-10b | determinism | §7.1, §7.4, J rows J-A25.61 | §7.1, §7.3, §7.4 |
| VD-11 | determinism | §7.1, §7.3, §7.4, J rows J-A25.61 | §7.1, §7.3, §7.4 |
| VD-11b | scope | §0.2 | §0.2 rows 11, 25; T25-1 |
| VD-12 | determinism | §5.3, J rows J-A31.75 | §5.3 epoch row |
| VD-12b | pipeline | §4.11, J rows J-A31.40 | §4.11 rung 2, floor paragraph, `LadderOp.thin`, hidden plots; §4.6 |
| VD-12c | scope | §13.2 | T31-9 |
| VD-13 | determinism | §5.4, J rows J-A22.75 | §5.4 (+ §7.7 pointer) |
| VD-14a | pipeline | §4.1, II.4, J rows J-A28.42 | §4.1, II.4, J-A28.42 |
| VD-14b | rendering | §8.5, §8.6 | §8.5, §8.6 |
| VD-15 | pipeline | §4.7 | §4.7 |
| VD-16 | pipeline | §4.7 | §4.7 |
| VD-17 | pipeline | §4.11 | §4.11 rung 1, step (c), `LadderOp.relet` |
| VD-18 | determinism | §7.1, §7.4 | §7.1, §7.4 |
| VD-19 | determinism | §7.1, §7.4, J rows J-A30.72, J-A24.71, J-A31.76 | §7.1, §7.4 |
| VD-20 | determinism | §7.1, §7.4, J rows J-A12.71 | §7.1, §7.4 |
| VD-21 | determinism | §7.4, J rows J-A30.71 | §7.4, §7.1, §5.3 |
| VD-22 | determinism | §6.3 | §6.3 |
| VD-23 | pipeline | §4.11, J rows J-A31.48 | §4.11, J-A31.48 |
| VD-24 | determinism | J rows J-DET-2 | J-DET-2 |
| VD-25 | determinism | §7.5 | §7.5 |
| VD-26 | determinism | §7.6 | §7.6 |
| VD-27 | determinism | §5.3 | §5.3 |
| VD-28 | determinism | §6.2 | §6.2 |
| VD-29 | determinism | §6.3 | §6.3 |
| VD-30 | determinism | §7.3 | §7.3 click row |
| VD-31 | determinism | §7.3 | §7.3 item 1 |
| VD-32 | determinism | §7.3 | §7.3 (a) 3 |
| VD-33 | determinism | §7.2 | §7.2 |
| VD-34 | determinism | §5.2, §7.7, J rows J-A20.75 | §7.7 item 2, §5.2, §7.1, §7.2 |
| VD-35a | pipeline | §4.1, J rows J-A23.41 | §4.1, J-A23.41 |
| VD-35b | scope | §1.4 | §1.4, §17.1 (6) |
| VD-36 | model | §2.8 | §2.8 |
| VD-37 | pipeline | II.7.2, II.7.3 | II.7.2, II.7.3 |
| VR-01 | rendering | §8.5, §8.6 | §8.5, §8.6 |
| VR-02 | model | §2.9 | §2.9 |
| VR-03 | determinism | §5.4, J rows J-A22.75 | §5.4 (+ §7.7 pointer) |
| VR-04 | rendering | §12.7, J rows J-A28.83 | §12.7 |
| VR-05 | rendering | §11.1, J rows J-A28.84 | §11.1 |
| VR-06 | rendering | §8.2, §8.3, §8.4, §8.5, §11.1, J rows J-A30.87 | §8.5 (2), §8.4, §8.2, §11.1 |
| VR-07 | rendering | §8.1, §8.3, §8.5, §8.6, §9.2, §11.1, J rows J-A28.85, §2.6 (hand-off) | §8.5, §8.1 item 2, §9.2, §8.6, §11.1, §3.8 |
| VR-08 | rendering | §9.2, §11.2, J rows J-A30.83 | §9.2, §11.2 |
| VR-09 | rendering | §8.2, §8.3, §8.8, §9.2, §11.1, §11.2, J rows J-A30.85 | §11.2, §11.1, §9.2, §8.2, §8.8 |
| VR-10 | rendering | §8.2, §8.3, §8.8, §9.2, §11.1, §11.2, J rows J-A30.85, §2.9 (hand-off) | §11.2, §11.1, §9.2, §8.2, §8.8 |
| VR-11 | rendering | §8.2, §8.3, §8.8, §9.2, §11.1, §11.2, J rows J-A30.85 | §11.2, §11.1, §9.2, §8.2, §8.8 |
| VR-12 | rendering | §8.8, §8.9 | §8.8, §8.9 |
| VR-13 | rendering | §8.2 | §8.2, §8.9 |
| VR-14 | rendering | §8.2, §8.3 | §8.2, §8.3 |
| VR-15 | rendering | §8.2, §8.3 | §8.2, §8.3 |
| VR-16 | rendering | §8.2, §8.3 | §8.2, §8.3 |
| VR-17 | rendering | §8.2, §8.3, J rows J-A19.81 | §8.2, §8.3 |
| VR-18 | rendering | §8.1, §9.2, §11.3 | §8.1, §9.2, §11.3 |
| VR-19 | rendering | §8.1, §9.2, §11.3 | §8.1, §9.2, §11.3 |
| VR-20 | rendering | §8.4, §8.5, §8.9, §11.1, J rows J-A28.42 | §8.4, §8.5, §11.1, §8.9 |
| VR-21 | rendering | §8.4, §8.5, §8.9, §11.1, J rows J-A28.42 | §8.4, §8.5, §11.1, §8.9 |
| VR-22 | rendering | §8.4, §8.5, §8.9, §11.1, J rows J-A28.42 | §8.4, §8.5, §11.1, §8.9 |
| VR-23 | rendering | §12.6, §12.7 | §12.7 |
| VR-24 | rendering | §12.6 | §12.6 |
| VR-25 | rendering | §12.6, §12.7 | §12.6 |
| VR-26 | rendering | §8.4, §8.5, §8.9, §11.1, J rows J-A28.42 | §8.4, §8.5, §11.1, §8.9 |
| VR-27 | rendering | §8.4, §8.5, §8.9, §11.1, J rows J-A28.42 | §8.4, §8.5, §11.1, §8.9 |
| VR-28 | rendering | §11.1, J rows J-A28.86 | §11.1 |
| VR-29 | rendering | §12.8 | §12.8 |
| VR-30 | rendering | §9.2, §7.6 (hand-off), J rows J-A30.86 | §9.2 |
| VR-31 | scope | §13.3 | §13.3 |
| VR-32 | scope | summary | summary |
| VR-33 | model | §2.9 | §2.9 |
| VS-01 | scope | §13.6 | §13.5, §13.7, §13.6 (3), §13.9 (5) |
| VS-02 | pipeline | §4.2, J rows J-A24.43 | §4.2 S3 (12), J-A24.43 |
| VS-03 | scope | §13.2, §13.8, §16, Staged | T28-17, T28-18; §13.8; §16; Staged |
| VS-04 | scope | §13.2, §15.2, §16 | T20-5; §15.2 O10 (i); §16 M3a |
| VS-05 | scope | §0.2, §15.2 | §0.2 rows 26, 21, 28 |
| VS-06 | scope | §16, Delegated decisions | §16, D-20 |
| VS-07 | scope | §15.1 | §15.1 B7, B13, B14, a:J05 |
| VS-08 | scope | summary | summary |
| VS-09 | scope | §0.2, §17.1, J rows J-A21.01, J-A21.31 | §0.2 rows 26, 21, 28; J-A21.01 Part A |
| VS-10 | scope | §17.1 | §17.1 (2), D-2 |
| VS-11 | scope | §13.2 | T8-7, T31-4, T12-1 |
| VS-12 | scope | §13.2 | T31-9 |
| VS-13 | scope | §0.2, §13.2 | §0.2 rows 11, 25; T25-1 |
| VS-14 | scope | §13.2 | T8-7, T31-4, T12-1 |
| VS-15 | determinism | §5.3 | §5.3 |
| VS-16 | scope | §1.4, §13.5 | §1.4, §17.1 (6); §13.5, §13.7, §13.6 (3), §13.9 (5) |
| VS-17 | pipeline | §4.2, §4.9, J rows J-A26.43, J-A26.44 | §4.9, §4.2 S2, J-A26.43, J-A26.44 |
| VS-18 | model | §2.6 | §2.6 |
| VS-19 | model | §2.6 | §2.6 |
| VS-20 | scope | §13.2, §15.2, §16 | T28-19, T29-5, T30-5, T12-1; O12 (d); §16 |
| VS-21 | scope | §13.3 | §13.3 |
| VS-22 | scope | summary, §16, Delegated decisions | §16, D-20 |
| VS-23 | scope | §0.2, §13.2, §14, §16, Delegated decisions, Staged | §0.2 rows 26, 21, 28; T28-17, T28-18; §13.8; §16; Staged |
| VS-24 | scope | §13.2, §14 | §13.2 registry sentence; §14 |
| VS-25 | scope | §0.2, §14 | §0.2 rows 26, 21, 28; §13.2 registry sentence; §14 |
| VS-26 | scope | §1.2 | §1.2 |
| VS-27 | scope | §1.1 | §1.1 |
| VS-28 | scope | §1.1 | §1.1 |
| VS-29 | pipeline | §4.11, J rows J-A31.44 | §4.11, J-A31.44 |
| VS-30 | scope | §16 | §16, D-20 |
| VS-31 | scope | §16 | §16, D-20 |
| VS-32 | scope | §13.2 | T15-1 |
| VS-33 | scope | §16, Delegated decisions | §16, D-20 |
| VS-34 | scope | §13.8, §16 | §16, §13.8 |
| VS-35 | scope | Staged | Staged |
| VS-36 | scope | Delegated decisions | §17.1 (2), D-2 |
| VS-37 | scope | §13.2, §13.7, Appendix A | §13.5, §13.7, §13.6 (3), §13.9 (5); Appendix A |
| VS-38 | scope | §1.4, §17.1 | §1.4, §17.1 (6) |
| VS-39 | scope | §13.9 | §13.5, §13.7, §13.6 (3), §13.9 (5) |
| VS-40 | scope | # Judgment calls paragraph (hand-off) | the index paragraph |

### §Ab.2 Repair round 2 applied (2026-09-27)

Lane `amendments-b/assemble-r2` (2026-09-27, a mechanical seat) applied the six repair files of round 2 —
`docs/validation/amendments-b/repair-r2-{determinism,kernel,model,pipeline,rendering,scope}.md`, the Opus stand-in
seats' answers to the 85 issues of the six verify-r1 reports — with `docs/validation/amendments-b/apply-blocks.py`, in
file-name order. All 58 blocks were applied and none was skipped: 46 REPLACE (every one on a distinct heading), 6 J-ROWS
blocks (30 rows) and 6 RATIONALE-A blocks (32 entries). No file was truncated. The seats' hand-off was then applied by
`docs/validation/amendments-b/assemble-r2-handoff.py`: the 20 restated index rows and 22 restated Part A entries were
moved into the older rows' places and the older rows deleted (one row per id; 469 index rows and 469 Part A entries, no
duplicate id, the same id set in both), and the paragraph under `# Judgment calls` was swapped for scope's VS1-04 text
(2 lines to 2). The 10 new ids (J-A28.73, J-A22.76, J-A29.25, J-A20.22, J-A28.46, J-A11.43, J-A20.42, J-A12.47, J-A28.87,
J-A17.01) stay where the protocol appended them. The document went from 12 793 to 12 942 lines (1 571 348 to 1 599 297
bytes; sha256 `365e19f2…` to `831efd42…`), the rationale file from 2 040 to 2 050 lines (`50a94f2d…` to `f2c2a1ca…`);
the copies taken before are `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r2-2026-09-27.md`. Headings stay 145 (every heading line
unchanged) and fence lines stay 108. The resolver (`refs.py`) finds the same 2 external citations and nothing else
broken. The document checks over the 19 changed top-level keys exit 0 after the 10 C3 rows the model seat proposed,
attributed and written by the assembler. The report is `docs/validation/amendments-b/assemble-r2.md`.

Legend. *Part* is the repair seat that answered the issue. *Blocks* are the subsections whose REPLACE block the seat's
ledger or issue table lists for the issue, plus the J rows it restated or added (and in which table) and any scripted
hand-off step; *where* is the location cell of the seat's own issue table. Every one of the 85 issue ids that the six
verify-r1 reports define appears once; an id that two reports define (VK1-14 = VP1-18; VS1-09, VS1-10 and VS1-11 =
VD1-18, V-MAB1-11 and VP1-08) has a row of its own.

| issue | part | blocks | where |
|---|---|---|---|
| V-MAB1-01 | model | §2.5, §2.6, §2.8, J-A30.23 (restated, index and Part A) | 2.6, 2.5, 2.8 |
| V-MAB1-02 | pipeline | §4.6 | §4.6 |
| V-MAB1-03 | model | §2.6, J-A28.23 (restated, index and Part A) | 2.6 |
| V-MAB1-04 | pipeline | §4.7, §10.2, J-A28.46 (new, index and Part A) | §4.7, §10.2, J-A28.46 |
| V-MAB1-05 | model | §2.5, §2.6, §2.8, J-A28.29 (restated, index and Part A) | 2.5, 2.6, 2.8 |
| V-MAB1-06 | model | §2.6, J-A28.26 (restated, index and Part A) | 2.6 |
| V-MAB1-07 | kernel | §3.4, §3.10 | §3.4, §3.10 |
| V-MAB1-08 | model | §2.6, J-A28.26 (restated, index and Part A) | 2.6 |
| V-MAB1-09 | model | §2.6, J-A28.26 (restated, index and Part A) | 2.6 |
| V-MAB1-10 | determinism | §5.3 | §5.3 interior-ladder row |
| V-MAB1-11 | scope | §13.2, J-A28.01 (restated, Part A) | T28-14 |
| V-MAB1-12 | model | §2.6, J-A30.23 (restated, index and Part A) | 2.6 |
| V-MAB1-13 | model | §2.6 | 2.6 |
| V-MAB1-14 | model | §2.9 | 2.9 |
| V-MAB1-15 | determinism | §7.5 | §7.5 transforms |
| V-MAB1-16 | model | §2.5 | 2.5 |
| VK1-01 | kernel | §3.1, §3.4, §3.10, J-A28.34 (restated, index and Part A) | §3.4, §3.1, §3.10; J-A28.34 |
| VK1-02 | determinism | §5.2, J-A28.73 (new, index and Part A) | §5.2 F-PLAN |
| VK1-03 | model | §2.6, J-A28.26 (restated, index and Part A) | 2.6 |
| VK1-04 | model | §2.6, J-A29.25 (new, index and Part A) | 2.6 |
| VK1-05 | kernel | §3.10 | §3.10 |
| VK1-06 | kernel | §3.4 | §3.4 |
| VK1-07 | determinism | §6.1 | §6.1 |
| VK1-08 | kernel | §3.4, §3.10 | §3.10 |
| VK1-09 | kernel | J-A12.31 (restated, index and Part A) | J-A12.31 |
| VK1-10 | kernel | §3.4, J-A28.34 (restated, index and Part A) | §3.4; J-A28.34 Part A |
| VK1-11 | rendering | §12.2 | 12.2 |
| VK1-12 | scope | §13.1, §14 | §14 (twice); §13.1 |
| VK1-13 | scope | §13.1 | §13.1 |
| VK1-14 | kernel | §3.7 | §3.7 |
| VP1-01 | pipeline | §4.11, J-A31.40 (restated, index and Part A) | §4.11 rung 2, J-A31.40 |
| VP1-02 | pipeline | §4.11, J-A31.44 (restated, index and Part A) | §4.11 floor, J-A31.44 |
| VP1-03 | determinism | §7.4, J-A31.71 (restated, index and Part A) | §7.4 `builtBand` row; J-A31.71 |
| VP1-04 | pipeline | §4.11, J-A31.44 (restated, index and Part A) | §4.11 writer list, J-A31.44 |
| VP1-05 | pipeline | §4.11 | §4.11 rung 1 |
| VP1-06 | pipeline | §4.1, §4.7, §4.9, J-A26.44 (restated, index and Part A) | §4.1, §4.7 S10b, §4.9, J-A26.44 |
| VP1-07 | pipeline | §4.9, J-A26.44 (restated, index and Part A) | §4.9 `rivers`, J-A26.44 |
| VP1-08 | scope | §13.2 | T26-2 |
| VP1-09 | pipeline | §4.2, J-A24.43 (restated, index and Part A) | §4.2 S3 (12), J-A24.43 |
| VP1-10 | pipeline | §4.7, J-A20.42 (new, index and Part A) | §4.7 S10b, `PlacementResult`, J-A20.42 |
| VP1-11 | determinism | §5.2, §7.7 | §5.2 F-SITING; §7.7 precedence |
| VP1-12 | pipeline | §4.11, II.6, J-A11.43 (new, index and Part A) | II.6, §4.11 `DeclineOp`, J-A11.43 |
| VP1-13 | pipeline | II.7.3, II.7.4, J-A12.47 (new, index and Part A) | II.7.3 (c), II.7.4, J-A12.47 |
| VP1-14 | pipeline | §4.5 | §4.5 |
| VP1-15 | pipeline | §4.7 | §4.7 S11 |
| VP1-16 | pipeline | II.1 | II.1 |
| VP1-17 | determinism | §7.6 | §7.6 |
| VP1-18 | kernel | §3.7 | §3.7 |
| VD1-01 | determinism | §5.3, J-A31.75 (restated, index and Part A) | §5.3 epoch row; J-A31.75 |
| VD1-02 | determinism | §5.2, §7.1, §7.4, J-A22.74 (restated, index and Part A) | §7.4 read-ahead and Targets; §7.1 `creation` and `revert`; §5.2 F-EDIT; J-A22.74 |
| VD1-03 | pipeline | §4.11 | §4.11 rung 1 |
| VD1-04 | determinism | §6.3, J-DET-2 (restated, index and Part A) | §6.3; J-DET-2 |
| VD1-05 | determinism | §5.2, §7.7 | §5.2 F-SITING; §7.7 precedence |
| VD1-06 | determinism | §6.1, §7.1, J-DET-53 (restated, index and Part A) | §6.1 Enter; §7.1; J-DET-53 |
| VD1-07 | determinism | §7.4, J-A31.71 (restated, index and Part A) | §7.4 `builtBand` row; J-A31.71 |
| VD1-08 | determinism | §5.2, §5.3, §7.1, §7.2, §7.7, J-A20.75 (restated, index and Part A) | §7.7 item 2 (the home list); §5.2, §7.1, §7.2 (pointers); §5.3 dossier row; J-A20.75 |
| VD1-09 | determinism | §7.1 | §7.1 edit targets |
| VD1-10 | determinism | §7.5 | §7.5 transforms |
| VD1-11 | determinism | §7.1, §7.4, J-A12.71 (restated, index and Part A) | §7.1 `placeAccess` and tunnels row; §7.4 row; J-A12.71 |
| VD1-12 | determinism | §7.1, §7.7, J-A22.76 (new, index and Part A) | §7.7 item 6; §7.1 `seq`; J-A22.76 (new) |
| VD1-13 | determinism | §7.6 | §7.6 |
| VD1-14 | pipeline | §4.11, J-A31.40 (restated, index and Part A) | §4.11 rung 1, `LadderOp.thin`, J-A31.40 |
| VD1-15 | pipeline | §4.11, J-A31.48 (restated, index and Part A) | §4.11, J-A31.48 |
| VD1-16 | model | §2.6 | 2.6 |
| VD1-17 | model | §2.8, J-A20.22 (new, index and Part A) | 2.8 |
| VD1-18 | scope | §13.2 | T31-9 |
| VR1-01 | rendering | §11.2 | 11.2 |
| VR1-02 | rendering | §8.5, §11.1, J-A30.87 (restated, index and Part A) | 8.5 (2), 11.1, J-A30.87 |
| VR1-03 | rendering | §11.1, J-A30.85 (restated, index and Part A) | 11.1, J-A30.85 |
| VR1-04 | rendering | §11.2, J-A30.85 (restated, index and Part A) | 11.2, J-A30.85 Part A |
| VR1-05 | rendering | §11.3, J-A30.85 (restated, index and Part A) | 11.3, J-A30.85 |
| VR1-06 | rendering | §8.3, §8.5, §9.4, J-A28.87 (new, index and Part A) | 8.5, 9.4, 8.3, J-A28.87 (new) |
| VR1-07 | scope | §13.2 | T30-5 |
| VR1-08 | rendering | §8.9 | 8.9 |
| VS1-01 | scope | §13.2, §16, J-A17.01 (new, index and Part A), J-A20.01 (restated, Part A) | T20-2; §16 M3a and M4 exits; J-A17.01; J-A20.01 |
| VS1-02 | scope | §0.2, §13.2, §14, §16, Staged | §0.2 rows 12, 24; §13.2; §14 (package line and `@plat/edit` comment); Staged sewers row; §16 M4 content |
| VS1-03 | scope | §1.4 | §1.4 |
| VS1-04 | scope | # Judgment calls paragraph (hand-off (2), 2 → 2 lines) | index paragraph (hand-off) |
| VS1-05 | scope | §13.9 | §13.9 (4) |
| VS1-06 | scope | §14 | §14 |
| VS1-07 | scope | §13.2, J-A28.01 (restated, Part A) | T28-13 |
| VS1-08 | determinism | §5.2 | §5.2 F-PLAN test |
| VS1-09 | scope | §13.2 | T31-9 |
| VS1-10 | scope | §13.2, J-A28.01 (restated, Part A) | T28-14 |
| VS1-11 | scope | §13.2 | T26-2 |

### §Ab.3 Repair round 3 applied (2026-09-27)

Lane `amendments-b/assemble-r3` (2026-09-27, a mechanical seat) applied the six repair files of round 3 —
`docs/validation/amendments-b/repair-r3-{determinism,kernel,model,pipeline,rendering,scope}.md`, the Opus stand-in
seats' answers to the 53 issues of `docs/validation/amendments-b/validate.md` §6 — with
`docs/validation/amendments-b/apply-blocks.py`, in file-name order. All 46 blocks were applied and none was skipped: 35
REPLACE (every one on a distinct heading), 5 J-ROWS blocks (13 rows) and 6 RATIONALE-A blocks (16 entries). No file was
truncated. The seats' one hand-off, the restated-row swap, was then applied by
`docs/validation/amendments-b/assemble-r3-handoff.py`: the 12 restated index rows and 15 restated Part A entries were
moved into the older rows' places and the older rows deleted, and the script asserted that the swapped ids are exactly
the ones the six hand-offs name. That leaves one row per id: 470 index rows and 470 Part A entries, no duplicate id, and
the same id set in both. The one new id, J-A20.43, stays where the protocol appended it. No seat handed off a paragraph
swap or a one-string substitution this round. The document went from 12 942 to 13 028 lines (1 599 297 to 1 618 241
bytes; sha256 `831efd42…` to `1a861c72…`). The rationale file went from 2 050 to 2 051 lines (`f2c2a1ca…` to
`8a24a5a7…`). The copies taken before are `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r3-2026-09-27.md`. Headings stay at 145, every heading line
unchanged, and fence lines stay at 108. The resolver (`refs.py`) finds the same 2 external citations and nothing else
broken. The document checks over the 19 changed top-level keys exit 0 with no new allow row (C3 1 251 hits before and
1 250 after, 0 unreviewed). The report is `docs/validation/amendments-b/assemble-r3.md`.

Legend. *Part* is the repair seat that answered the issue. *Carries* lists the carried ids that validate.md §3 merged
into this primary; each is applied once, through its primary. *Sections changed* lists the subsections whose REPLACE
block the seat's ledger or issue table gives for the issue, then the J rows it restated or added and in which table.
One row is given for each of the 53 primaries of validate.md §6. VD2-15, which validate withdrew, has no row.

| issue | severity | part | carries | sections changed |
|---|---|---|---|---|
| V-MAB2-01 | major | model | — | §2.6, §2.8, J-A28.23 (restated, index and Part A) |
| V-MAB2-02 | minor | pipeline | — | §4.7 |
| V-MAB2-04 | minor | determinism | VD2-05 | §7.1, §7.4, §7.5, J-A31.76 (restated, index and Part A) |
| V-MAB2-05 | minor | determinism | VP2-06, VD2-08 | §5.2 |
| V-MAB2-06 | minor | model | — | §2.8 |
| V-MAB2-07 | minor | model | — | §2.6 |
| V-MAB2-08 | minor | model | — | §2.6 |
| V-MAB2-09 | minor | model | VK2-05, VD2-09 | §2.6, J-A28.26 (restated, index and Part A) |
| V-MAB2-10 | minor | model | — | §2.6, J-A29.25 (restated, index and Part A) |
| V-MAB2-11 | minor | pipeline | — | §10.2 |
| V-MAB2-12 | minor | model | VP2-08 | §2.6; §7.3, §7.6 (the determinism seat's sweep of the same stale built-count wording, its departure 6) |
| V-MAB2-13 | minor | model | — | §2.6 |
| V-MAB2-15 | minor | kernel | — | §3.4 |
| VK2-01 | minor | kernel | — | §3.4, J-A28.34 (restated, Part A) |
| VK2-02 | minor | kernel | — | §3.4 |
| VK2-03 | minor | kernel | — | §3.4, J-A28.33 (restated, Part A) |
| VK2-04 | minor | kernel | — | §3.4, J-A28.34 (restated, Part A) |
| VK2-06 | minor | determinism | VD2-10 | §5.2 |
| VK2-08 | minor | scope | VS2-09 | §13.1 |
| VK2-09 | minor | scope | VS2-10 | §13.1 |
| VP2-01 | minor | pipeline | — | §4.7, §10.2, J-A28.46 (restated, index and Part A); §7.3, §7.6 (the same determinism sweep) |
| VP2-02 | minor | pipeline | V-MAB2-03, VD2-14 | §4.11 |
| VP2-03 | minor | pipeline | — | §4.11 |
| VP2-04 | minor | pipeline | — | II.6, J-A11.43 (restated, index and Part A) |
| VP2-05 | minor | determinism | — | §6.3 |
| VP2-07 | minor | determinism | — | §5.2 |
| VP2-09 | minor | scope | VS2-04 | §13.2, §16 |
| VP2-11 | minor | scope | VS2-06 | §13.2 |
| VP2-12 | minor | scope | VS2-07 | §13.2 |
| VP2-13 | minor | scope | VS2-08 | Staged |
| VD2-01 | major | determinism | — | §5.2, §5.3, §7.1, §7.7, J-A20.75 (restated, index and Part A) |
| VD2-02 | major | pipeline | — | §4.11, J-A20.43 (new, index and Part A) |
| VD2-04 | minor | determinism | — | §5.3, §7.3 |
| VD2-06 | minor | determinism | V-MAB2-05 (b) | §7.3 |
| VD2-07 | minor | determinism | — | §7.1 |
| VD2-11 | minor | determinism | — | §5.2, J-A28.73 (restated, index and Part A) |
| VD2-12 | minor | determinism | — | §7.6 |
| VD2-13 | minor | determinism | — | §6.1, J-DET-53 (restated, index and Part A) |
| VR2-01 | minor | rendering | — | §8.3, §8.4, §8.5, §11.1, J-A30.87 (restated, index and Part A) |
| VR2-02 | minor | rendering | — | §8.6 |
| VR2-03 | minor | rendering | — | §12.7 |
| VR2-04 | minor | kernel | — | §3.2 |
| VR2-06 | minor | scope | VS2-12 | §13.2 |
| VS2-01 | minor | scope | — | §0.2 |
| VS2-02 | minor | scope | V-MAB2-14, VK2-07 | §13.2 |
| VS2-03 | minor | scope | VD2-03 | §0.2, §13.2, §15.2, §16, J-A17.01 (restated, index and Part A), J-A20.01 (restated, Part A) |
| VS2-05 | minor | scope | VP2-10 | §13.2 |
| VS2-11 | minor | scope | VK2-10, VR2-05 | §1.1 |
| VAL-01 | minor | pipeline | — | §4.1 |
| VAL-02 | minor | pipeline | — | §4.6, J-A30.41 (restated, index and Part A) |
| VAL-03 | minor | scope | — | §13.2 |
| VAL-04 | minor | scope | — | summary |
| VAL-05 | minor | scope | — | §13.2, §13.7, §15.2 |

### §Ab.4 The hand fix applied and closed (2026-09-27)

The closing seat of amendments b (`docs/validation/amendments-b/closing-report.md` §2) left 31 issues — 2 major, 29 minor —
for a hand fix. Workflow 13 (`handfix-b`) applied them and closed the pass in four steps, each recorded under
`docs/validation/amendments-b/handfix/`: **apply** (`apply.md`, `handfix.py`) applied the 31 as 74 sub-change rows by exact
single-occurrence substitution, none skipped (`1a861c72…` → `5d752c9b…`); five verifiers then found 26 minor edges, which
**repair round 1** answered with 19 blocks in four block files, assembled by `assemble-r1.md` (→ `e9c0b828…`); four verifiers
found 13 minor edges, which **repair round 2** answered with 14 blocks in six block files, assembled by `assemble-r2.md`
(→ `357c02f2…`); six verifiers found 14 minor edges (13 distinct changes: one issue was filed twice, and two edit the same
§2.6 sentence), which the Fable **close** seat applied itself by 24 exact substitutions (`close.md`, `close-apply.py`,
`close-apply-log.json`; → `1c23190f…`, 13 026 lines; the rationale `9575f26c…` → `0be40dfd…`, 2 053 lines). Nothing is
left open: every issue of every round ended FIXED, none was ruled invalid (the owner's no-defer rule). The copies taken
before each step are `docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b{,-repair-r1,-repair-r2,-close}-2026-09-27.md`,
read-only. Headings stay at 145 and the fence lines at 108 through every step; the judgment index and Part A hold 472
rows each (J-A30.25 added by the apply, J-A30.26 by round 1, none since), the same id set in both. The resolver finds the
same 2 external citations and nothing else broken after every step. The document checks over the changed top-level keys
exit 0 after every step; the whole pass added 10 reviewed allow rows (6 by the apply, 1 by round 1's pipeline seat, 2 by
round 1's scope seat via the assembler, none by round 2 or the close), and the close's 24 substitutions add 0 hits (849 raw
hits before and after over keys 0, 2, 3, 5, 7, 8, 12, 13 and Judgment calls; the rationale's set 278 = 278).

Legend. *Part* is the seat that owned the fix. *Carries* lists the ids the closing report or a verifier merged into the
primary; each is applied once, through its primary. *Sections changed* lists the subsections the fix edited, then the J
rows it restated, added or amended and in which table. Line numbers are those of the report that applied the round.

**The 31 hand fixes (apply).**

| # | issue | severity | part | carries | sections changed |
|---|---|---|---|---|---|
| 1 | VP3-04 | minor | pipeline | — | §10.2, §4.7 |
| 2 | VP3-01 | major | pipeline | VD3-02 | §4.7, J-A28.46 (index and Part A) |
| 3 | VD3-01 | major | determinism | VP3-02 | §5.2 |
| 4 | VS3-04 | minor | scope | VD3-12 (2), VP3-03 | §13.2, §16 |
| 5 | V-MAB3-01 | minor | model | VD3-11, VP3-07 | §2.6, J-A28.23 (index and Part A) |
| 6 | V-MAB3-08 | minor | determinism | — | §7.3, §5.2 (the F-EDIT insertion also carries VR3-01 (3)) |
| 7 | VR3-01 | minor | model | — | §2.5, §7.1, §13.2, J-A30.25 (new, index and Part A); §5.2 through #6 |
| 8 | VD3-05 | minor | determinism | V-MAB3-07 | §5.3 (new row) |
| 9 | VD3-06 | minor | determinism | V-MAB3-10 | §7.1 |
| 10 | VD3-07 | minor | determinism | — | §7.3 |
| 11 | VD3-08 | minor | determinism | — | §7.4 |
| 12 | V-MAB3-09 | minor | determinism | — | §7.3 |
| 13 | VS3-05 | minor | scope | VD3-12 (1), (3), V-MAB3-06 | §13.2, §13.8, §16, J-A28.01 (Part A) |
| 14 | V-MAB3-02 | minor | model | VR3-02 | §2.6, J-A28.28 (Part A) |
| 15 | VK3-01 | minor | model | — | §2.6, J-A28.26 (index and Part A) |
| 16 | V-MAB3-03 | minor | model | — | §2.6 |
| 17 | VS3-07 | minor | scope | V-MAB3-11 | §13.2 |
| 18 | V-MAB3-04 | minor | model | — | §10.2, §2.6, J-A29.25 (Part A) |
| 19 | V-MAB3-05 | minor | model | — | §2.6 |
| 20 | VS3-08 | minor | scope | V-MAB3-12 | §13.2 |
| 21 | VP3-05 | minor | pipeline | — | II.6, J-A11.43 (Part A) |
| 22 | VD3-10 | minor | determinism | VP3-06 | §6.3 |
| 23 | VS3-03 | minor | scope | — | §13.2 |
| 24 | VD3-03 | minor | determinism | — | §7.7, J-A20.75 (index and Part A) |
| 25 | VD3-04 | minor | determinism | — | §7.4, §7.1, §7.7, §5.2, J-A22.76 (index and Part A) |
| 26 | VD3-09 | minor | determinism | — | §5.2, J-A28.73 (Part A) |
| 27 | VP3-08 | minor | determinism | — | J-A28.51 (Part A) |
| 28 | VK3-02 | minor | kernel | — | J-A28.33 (index) |
| 29 | VS3-01 | minor | scope | — | §0.2, §16, Staged |
| 30 | VS3-02 | minor | scope | — | J-A16.01 (Part A) |
| 31 | VS3-06 | minor | scope | VK3-03 | §13.1 |

**Repair round 1** (the five verify-r0 reports' 26 issues, all minor; block files `repair-r1-{determinism,model,pipeline,scope}.md`).

| issue | part | carries | sections changed |
|---|---|---|---|
| VHM-01 | model | — | §2.5 `Passage.headroomCm`, §7.1, §13.2 T30-4 (carried by the scope block), §7.3 item 1 (hand-off H1) |
| VHM-02 | model | — | §2.6 `BaseWing.spans`, §2.5 `Passage.frontBuilding`, §7.1, §7.3 item 1 (H1), §13.2 T8-3 (H2), J-A30.26 (new, index and Part A) |
| VHM-03 | model | VKH-02 | §2.6 step 4 |
| VHM-04 | model | VKH-01 (reconciled) | §2.6 stage-3 contract, J-A28.26 (restated, index and Part A) |
| VHM-05 | model | — | J-A29.25 (restated, index) |
| VHM-06 | model | — | J-A28.23 (restated, index) |
| VHM-07 | scope | — | §13.2 T28-2, T28-3 |
| VKH-03 | scope | — | §13.1 |
| VDH-01 | determinism | — | §7.4 (Replay semantics, the assign / unassign row, Independence, the rejectSite / placeAt row), §5.2 F-EDIT ladder, §7.7 item 3 |
| VDH-02 | scope | — | §13.2 T20-2 |
| VDH-03 | determinism | — | §7.4 setField row |
| VDH-04 | determinism | — | §7.3 items 1 and 4 |
| VDH-05 | determinism | — | §6.3 |
| VDH-06 | determinism | — | J-A28.73 (restated, index) |
| VPH-01 | pipeline | — | J-A28.46 (restated, index and Part A) |
| VPH-02 | pipeline | — | §10.2, §10.3, J-A28.46 (Part A: the `liveIn` precedence ruling) |
| VPH-03 | pipeline | — | II.6, J-A11.43 (restated, index) |
| VPH-04 | model | — | §2.6 (`Building.households` comment, capacity bullet) |
| VPH-05 | scope | — | (1) §13.2 T19-4; (2) superseded by VSH-01 |
| VSH-01 | scope | VPH-05 (2) | §13.2 T11-1 |
| VSH-02 | scope | — | J-A16.01 (restated, Part A) |
| VSH-03 | model | — | J-A28.28 (restated, index) |
| VSH-04 | scope | — | §13.2 §2.6's test |
| VSH-05 | scope | — | §13.2 T20-6 |

**Repair round 2** (the four verify-r1 reports' 13 issues, all minor; block files `repair-r2-{determinism,kernel,model,pipeline,rendering,scope}.md`).

| issue | part | sections changed |
|---|---|---|
| VHM1-01 | model | §2.6 `Basement.access` comment |
| VHM1-02 | model | §2.6 step 5 |
| VHM1-03 | model | §2.6 stage-3 contract (widened to any stair bay or chimney stack inside a composer's room), steps 3, 4 and 6, the re-cut bullet, `Composition.rooms`; J-A28.26 (restated, index and Part A) |
| VHM1-04 | kernel | §3.4 seed-clip gloss; J-A28.34 (restated, Part A) |
| VHM1-05 | rendering | §8.2 passage-arch row |
| VDR-01 | determinism | §5.2 F-EDIT ladder |
| VDR-02 | determinism | §7.4 Application bullet |
| VDR-03 | determinism | J-A20.74 (restated, Part A) |
| VPH1-01 | pipeline | §4.7, §10.2, §2.5 `BuildingSlot.unhoused` (hand-off P1), J-A28.46 (restated, index and Part A) |
| VPH1-02 | model | §2.6 (capacity 0 for a slot without `houses`; the change rule's table list; `Building.dwelling`), J-A28.23 (restated, index and Part A) |
| VSR-01 | scope | §13.2 (B-PLAN fixture list, T28-4) |
| VSR-02 | scope | §13.2 T28-18 |
| VSR-03 | scope | §13.2 T28-18 |

**The close** (the six verify-r2 reports' 14 issues, all minor; applied by `close-apply.py`, 24 substitutions).

| issue | part | carries | sections changed |
|---|---|---|---|
| VHM2-01 | model | VPH2-01 (word for word) | §7.1 buildings row, §2.8 registry paragraph |
| VHM2-02 | model | VKH2-01 (1) (one reconciled sentence) | §2.6 stage-3 contract |
| VHM2-03 | model | — | §2.6 `Building.dwelling` |
| VHM2-04 | kernel | — | §3.4 (`fixed` comment, re-cut paragraph), J-A28.33 (index and Part A, restated in place) |
| VKH2-01 | model | — | §2.6 (through VHM2-02), J-A28.26 (Part A, restated in place) |
| VPH2-02 | scope | — | §13.2 T19-4 |
| VDH2-01 | determinism | — | §7.4 Application bullet |
| VDH2-02 | scope | — | §13.2 T18-1, T28-18 |
| VR2H-01 | rendering | — | §12.7, J-A28.83 (index and Part A, restated in place) |
| VR2H-02 | rendering | — | §8.3 draw-style census (new row) |
| VSR2-01 | scope | — | §13.2 B-PLAN fixture list |
| VSR2-02 | determinism | — | §5.3 (new row) |
| VSR2-03 | scope | — | §0.2 rows 20 and 28 |

## §Ac Amendments c applied (2026-09-27)

Lane `amendments-c/assemble-r0` (2026-09-28, a mechanical seat) applied the twelve block files of
`docs/validation/amendments-c/` to `docs/ARCHITECTURE.md` and `docs/ARCHITECTURE-RATIONALE.md` with
`docs/validation/amendments-c/apply-blocks.py`. The blocks carry the bundled pass (owner, 2026-09-28: "just bundle all of
c, d, and e together now"): items 20 (h) and 32–72 of `docs/AMENDMENTS-2026-09-27c.md`, items 73–88 of
`docs/AMENDMENTS-2026-09-27d.md` and item 101 of `docs/AMENDMENTS-2026-09-27e.md`. All 132 blocks were applied and none
was skipped: 82 REPLACE, 25 APPEND TO SECTION and 1 INSERT AFTER, plus 12 J-ROWS blocks (230 rows of the judgment
index) and 12 RATIONALE-A blocks (230 entries of Part A). No file was truncated, no heading was missing, and no heading
was replaced twice, so no three-way merge was needed. The blocks were applied in the two-pass order of route §C.9.2:
every REPLACE first, then every INSERT AFTER, APPEND TO SECTION, J-ROWS and RATIONALE-A block, each group in file-name
order and block order. The literal one-pass order loses seat T's §4.5 APPEND (item 72's home paragraphs), because
`blocks-pipeline-transitions-…` sorts before `blocks-pipeline-walls-…`, whose §4.5 REPLACE would then overwrite it. The
reference check found two cited judgment ids with no index row, J-Fdet-1 and J-Fredteam-1. Their Fable section text had
been folded into §7.4 and §4.6 by the seats. The lane added their Fable J rows and Part A entries verbatim
(`assemble-r0-refs-fix.blocks`); the Fable APPEND bodies were not applied. The document grew from 13 026 to 16 872 lines
(1 645 248 to 2 192 330 bytes; sha256 `1c23190f…` to `7f4c0e25…`). The rationale file grew from 2 053 to 2 285 lines
(sha256 `0be40dfd…` to `22f01184…`). The copies taken before assembly are
`docs/archive/ARCHITECTURE-pre-amendments-c-2026-09-27.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-2026-09-27.md`. The headings went from 145 to 147, and the two new
ones are II.7.5 and II.7.6. Every block's text is present exactly once. The judgment index and Part A hold 704 rows
each, and each id appears in both with no duplicate. The document checks over the 25 changed top-level keys exit 0
(C1 5 / 0, C2 0 / 0, C3 1 441 / 0, C4 12 / 0, S1 0, S2 0) after 125 reviewed allow rows. The lane's record is
`docs/validation/amendments-c/assemble-r0.md`.

The home and the referencing sections of items 20 (h), 32–72 and 101 are read from §0.2's landing table as assembled.
Items 73–88 share item 20's row there, so theirs are read from the route (`route.json`, marked "(route)"). The column
"blocks applied" lists, for each seat's block file, the blocks whose text names the item: as "item N", as a range or
list "items N–M", as `J-AN.n`, or as `TN-n` or `TN`. For 20 (h), it also counts "20 (h)", T20-7 … T20-12 and
J-A20.76 onward. The seats are E2 `blocks-determinism-determinism-…`, E1 `blocks-determinism-dossier`, K
`blocks-kernel`, M `blocks-model`, A `blocks-pipeline-bentcut`, B `blocks-pipeline-plots`, D
`blocks-pipeline-staged-…`, T `blocks-pipeline-transitions-…`, C `blocks-pipeline-walls-…`, R `blocks-rendering`,
S1 `blocks-scope-provenance-…` and S2 `blocks-scope-render-labels-…`. `R#n` is the file's n-th block, a REPLACE; `A#n`
is an APPEND TO SECTION and `I#n` an INSERT AFTER; the key before it is the section the block targets. The J-A counts
are this pass's rows only.

| item | home section | referencing sections | blocks applied |
|---|---|---|---|
| 20 (h) | §7.7 | §2.8, §7, §9.2, §11, §13.2 | E2: §5.2 R#2, §5.3 R#3, §5.4 R#4, §6.1 R#5, §6.2 R#6, §7.1 R#9, §7.3 R#11, §7.5 A#13; E1: §7.7 R#1; M: §2.2 R#2, §2.6 R#6, §2.8 R#8, §2.9 R#9; D: §10.2 R#5; T: §4.11 R#7, §4.5 A#3; C: §4.2 R#2; R: §8.4 R#4, §9.1 R#10, §9.2 R#11, §11.1 R#16, §11.3 R#18, §11.4 R#19; S1: §1.4 R#4, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.8 A#8; J-A20.*: 7 index rows + 7 Part A entries |
| 32 | §17.1 (1) | §0.3, D-29, Appendix A, summary | S1: §17.1 R#1, §0.3 R#5, Delegated decisions R#8, §0.2 R#10; J-A32.*: 2 index rows + 2 Part A entries |
| 33 | §4.6 | §13.5, §1.3, §1.4, §0.3, D-16 | A: §4.6 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; J-A33.*: 3 index rows + 3 Part A entries |
| 34 | §4.6 step 1 | §6.1, §16, §13.5 | E2: §6.1 R#5; A: §4.6 R#1; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A34.*: 3 index rows + 3 Part A entries |
| 35 | §4.6 step 2 | II.2 | E2: §6.1 R#5; A: §4.6 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A35.*: 1 index rows + 1 Part A entries |
| 36 | §4.6 step 3 | §6.1 | E2: §6.1 R#5; A: §4.6 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A36.*: 1 index rows + 1 Part A entries |
| 37 | §4.6 steps 4–5 | §7.6, §16 | E2: §6.1 R#5, §7.6 R#14; A: §4.6 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A37.*: 4 index rows + 4 Part A entries |
| 38 | §4.6 step 6 | §13.5 | E2: §6.1 R#5; A: §4.6 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A38.*: 1 index rows + 1 Part A entries |
| 39 | §4.6 step 8 | §5.2, §3.5, §1.3 | E2: §5.2 R#2, §6.1 R#5; A: §4.6 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A39.*: 1 index rows + 1 Part A entries |
| 40 | §4.6 step 9 | II.2 | E2: §6.1 R#5; A: §4.6 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A40.*: 1 index rows + 1 Part A entries |
| 41 | §13.5 | §6.1, §13.2, §16 | E2: §6.1 R#5; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A41.*: 3 index rows + 3 Part A entries |
| 42 | §4.7 S10 (10) | §4.6, §5.2, §1.3 | E2: §5.2 R#2; B: §4.7 R#1; S1: §17.1 R#1, §1.3 R#3, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A42.*: 1 index rows + 1 Part A entries |
| 43 | §4.7 S11 | §7.6, §15.1 | E2: §6.1 R#5, §7.1 R#9, §7.6 R#14; M: §2.5 R#5; B: §4.7 R#1; D: §10.2 R#5; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A43.*: 3 index rows + 3 Part A entries |
| 44 | §4.7 S11 | §2.5, §7.6, II.3, §15.1 | E2: §7.6 R#14; B: §4.7 R#1; D: II.3 R#2, §10.2 R#5; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A44.*: 2 index rows + 2 Part A entries |
| 45 | §4.8 | §3.4, §5.2, §7.1, §1.4 | E2: §5.2 R#2, §7.1 R#9; K: §3.4 R#1, §3.1 R#2; C: §4.8 R#1; S1: §17.1 R#1, §1.4 R#4, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §13.1 A#4; J-A45.*: 3 index rows + 3 Part A entries |
| 46 | §4.2 S3 (4) | §4.4, §13.5, D-17, D-19 | C: §4.2 R#2, §4.4 R#3; S1: §17.1 R#1, §13.5 R#2, §1.4 R#4, §13.2 R#6, §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A46.*: 3 index rows + 3 Part A entries |
| 47 | §4.5 | §6.1, §1.4, D-16 | E2: §6.1 R#5, §7.3 R#11; C: §4.5 R#4; S1: §17.1 R#1, §1.4 R#4, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A47.*: 3 index rows + 3 Part A entries |
| 48 | §13.5 | §1.4, Appendix A | S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A48.*: 1 index rows + 1 Part A entries |
| 49 | §13.5 | §1.4 | C: §4.2 R#2; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A49.*: 1 index rows + 1 Part A entries |
| 50 | §2.6 | §4.7, §10.2, §13.5, §1.4 | M: §2.6 R#6; D: §10.2 R#5; T: §4.7 A#5; R: §8.4 R#4; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A50.*: 2 index rows + 2 Part A entries |
| 51 | §5.1 (1) | §1.4, §15.1 | E2: §5.1 R#1; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A51.*: 1 index rows + 1 Part A entries |
| 52 | §6.5 (9) | §13.3 | E2: §6.5 R#8; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §13.3 A#5; J-A52.*: 1 index rows + 1 Part A entries |
| 53 | §8.10 | §3.1, §13.5, D-11 | K: §3.1 R#2; R: §8.10 R#9; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §13.1 A#4; J-A53.*: 2 index rows + 2 Part A entries |
| 54 | §8.2 | §8.4, §15.1 | R: §8.2 R#2, §8.3 R#3, §8.4 R#4; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A54.*: 1 index rows + 1 Part A entries |
| 55 | §9.3 | — | R: §9.2 R#11, §9.3 R#12; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A55.*: 1 index rows + 1 Part A entries |
| 56 | §15.1 | §6.1 | S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A56.*: 1 index rows + 1 Part A entries |
| 57 | §4.9 | §1.4 | C: §4.9 R#6; S1: §17.1 R#1, §1.4 R#4, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A57.*: 3 index rows + 3 Part A entries |
| 58 | II.2 | II.3, §8.2, §8.3, §13.5, §15.1 | D: II.2 R#1, II.3 R#2; R: §8.2 R#2, §8.3 R#3; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A58.*: 3 index rows + 3 Part A entries |
| 59 | §2.6 | §12.7 | M: §2.6 R#6; R: §12.7 R#22; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: Staged R#14; J-A59.*: 1 index rows + 1 Part A entries |
| 60 | §2.6 | §13.5, §15.1 | S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1; J-A60.*: 1 index rows + 1 Part A entries |
| 61 | PART III | §13.5 | D: PART III R#3; S1: §17.1 R#1, §13.5 R#2, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A61.*: 1 index rows + 1 Part A entries |
| 62 | §17.1 (6) | §7.6 | E2: §7.6 R#14; S1: §17.1 R#1, §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; J-A62.*: 1 index rows + 1 Part A entries |
| 63 | §4.7 | §2.6, §2.7, §10.2, §9.2, §11.1, §11.2, §7.7, II.7.3, §13.2 | E2: §5.3 R#3, §6.1 R#5, §7.1 R#9, §7.3 R#11, §7.4 R#12, §7.5 A#13; E1: §7.7 R#1; M: §2.6 R#6, §2.7 R#7, §2.8 R#8; A: §4.6 R#1; B: §4.7 R#1; D: PART III R#3, §10.2 R#5, II.7.3 R#8, II.7.4 R#9, §4.7 A#4; T: §4.11 R#7, §4.7 A#5; R: §8.1 R#1, §8.2 R#2, §8.3 R#3, §8.5 R#5, §9.2 R#11, §11.1 R#16, §11.2 R#17; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.3 A#5, §13.8 A#8; J-A63.*: 8 index rows + 8 Part A entries |
| 64 | II.7.3 | II.7.4, §10.2, §2.6, §13.2 | E2: §5.3 R#3, §6.1 R#5, §6.3 R#7, §7.1 R#9, §7.4 R#12, §7.5 A#13; M: §2.6 R#6, §2.7 R#7, §2.8 R#8; D: §10.2 R#5, II.6 R#6, II.7.3 R#8, II.7.4 R#9, §4.7 A#4, II.7.4 A#10; T: §4.6 A#4; R: §8.2 R#2, §8.3 R#3, §9.2 R#11, §11.1 R#16; S1: §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.2 R#13, Staged R#14, §13.2 A#3, §13.8 A#8; J-A64.*: 4 index rows + 4 Part A entries |
| 65 | II.7.5, II.7.6 | §3.4, §1.1, §7.1, D-3, §13.2 | E2: §5.2 R#2, §5.3 R#3, §6.1 R#5, §6.3 R#7, §7.1 R#9, §7.3 R#11, §7.4 R#12, §7.5 A#13; E1: §7.7 R#1; K: §3.4 R#1, §3.7 R#4; M: §2.1 R#1, §2.2 R#2, §2.3 R#3, §2.5 R#5, §2.7 R#7, §2.8 R#8, §2.9 R#9; D: PART III R#3, §10.2 R#5, II.6 R#6, II.7.3 R#8, II.7.4 R#9, II.7 I#7, II.7.4 A#10; T: §4.11 R#7; C: §4.2 R#2, §4.5 R#4; R: §8.2 R#2, §8.3 R#3, §8.4 R#4, §9.1 R#10, §9.2 R#11, §11.1 R#16; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §1.1 R#10, §15.2 R#13, Staged R#14, §13.2 A#3, §13.1 A#4, §13.8 A#8; J-A65.*: 14 index rows + 14 Part A entries |
| 66 | §7.3 item 9 | II.7.6, §7.1, D-25, §13.2 | E2: §5.2 R#2, §5.3 R#3, §6.1 R#5, §6.3 R#7, §7.1 R#9, §7.3 R#11, §7.4 R#12, §7.5 A#13; M: §2.6 R#6, §2.7 R#7, §2.8 R#8, §2.9 R#9; D: PART III R#3, §10.2 R#5, II.7.3 R#8, II.7.4 R#9, II.7.4 A#10; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §15.2 R#13, Staged R#14, §13.2 A#3; J-A66.*: 3 index rows + 3 Part A entries |
| 67 | §4.11 | §7.1, §6.1, §8.2, §8.5, D-25, §13.2 | E2: §5.2 R#2, §5.3 R#3, §5.4 R#4, §6.1 R#5, §6.2 R#6, §6.3 R#7, §6.5 R#8, §7.1 R#9, §7.4 R#12, §7.5 A#13; E1: §7.7 R#1; M: §2.5 R#5, §2.6 R#6, §2.7 R#7, §2.8 R#8, §2.9 R#9; B: §4.7 R#1; D: §10.2 R#5, II.6 R#6; T: §4.11 R#7, §4.10 A#6, §10.4 A#10; R: §8.1 R#1, §8.2 R#2, §8.3 R#3, §8.5 R#5, §11.1 R#16, §11.3 R#18, §8.6 A#6; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §15.2 R#13, Staged R#14, §13.2 A#3, §13.3 A#5, §13.9 A#9; J-A67.*: 15 index rows + 15 Part A entries |
| 68 | §8.4 | §2.7, §4.7, §6.1, §6.5, §7.1, §7.8, D-1, D-3, D-19, §13.4, §13.5 | E2: §5.2 R#2, §5.3 R#3, §6.1 R#5, §6.2 R#6, §6.3 R#7, §6.5 R#8, §7.1 R#9, §7.4 R#12, §7.8 R#15, §7.5 A#13; E1: §7.7 R#1; M: §2.6 R#6, §2.7 R#7, §2.8 R#8, §2.9 R#9; D: II.6 R#6, II.7.3 R#8, II.7.4 A#10; T: §4.11 R#7, §4.7 A#5, §10.3 A#9; C: §4.2 R#2; R: §8.1 R#1, §8.2 R#2, §8.3 R#3, §8.4 R#4, §8.5 R#5, §8.8 R#7, §8.9 R#8, §8.10 R#9, §9.4 R#13, §11.1 R#16, §11.3 R#18, §12.7 R#22, §12.5 A#20, §12.8 A#23; S1: §13.5 R#2, §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1, §14 R#2, §1.2 R#11, §1.7 R#12, §15.2 R#13, Staged R#14, §13.2 A#3, §13.3 A#5, §13.4 A#6, §13.8 A#8, §13.9 A#9; J-A68.*: 18 index rows + 18 Part A entries |
| 69 | §8.2 | §13.4, §7.6, §13.9, §17.1, D-1 | E2: §7.6 R#14, §7.5 A#13; M: §2.8 R#8; R: §8.2 R#2, §8.3 R#3; S1: §17.1 R#1, §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1, Staged R#14, §13.2 A#3, §13.4 A#6, §13.7 A#7, §13.9 A#9; J-A69.*: 6 index rows + 6 Part A entries |
| 70 | §4.7 S11 | §10.2, §2.5, §9.1, §13.2 | E2: §5.2 R#2, §5.3 R#3, §6.1 R#5, §7.1 R#9, §7.4 R#12, §7.5 A#13; E1: §7.7 R#1; M: §2.5 R#5, §2.6 R#6, §2.8 R#8; B: §4.7 R#1; D: §10.2 R#5, II.7.3 R#8, II.7.4 A#10; T: §4.11 R#7, §4.5 A#3, §4.7 A#5, §4.10 A#6, §10.2 A#8, §10.3 A#9, §10.4 A#10; C: §4.5 R#4, §4.9 R#6; R: §8.2 R#2, §8.3 R#3, §8.5 R#5, §9.1 R#10, §9.4 R#13, §9.6 A#15; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1, §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.3 A#5, §13.9 A#9; J-A70.*: 10 index rows + 10 Part A entries |
| 71 | §4.7 S10b | §10.2, §4.2, §13.2, §13.5 | E2: §6.1 R#5, §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8; B: §4.7 R#1; D: §10.2 R#5; T: §4.11 R#7, §4.5 A#3, §4.7 A#5, §10.2 A#8; C: §4.2 R#2, §4.5 R#4; S1: §13.5 R#2, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3, §13.3 A#5, §13.7 A#7, §13.9 A#9; J-A71.*: 5 index rows + 5 Part A entries |
| 72 | §4.5 | §2.5, §7.7, §6.3, §10.4, §1.4, D-10, D-16, D-32, §13.2 | E2: §5.3 R#3, §5.4 R#4, §6.1 R#5, §6.2 R#6, §6.3 R#7, §7.1 R#9, §7.4 R#12, §7.5 A#13; E1: §7.7 R#1; M: §2.5 R#5, §2.7 R#7, §2.8 R#8, §2.9 R#9; D: §10.2 R#5; T: §4.1 R#1, §4.11 R#7, §4.3 A#2, §4.5 A#3, §4.7 A#5, §4.10 A#6, §10.2 A#8, §10.4 A#10; C: §4.2 R#2, §4.5 R#4; R: §8.2 R#2, §9.1 R#10, §9.4 R#13, §11.1 R#16, §9.6 A#15; S1: §1.4 R#4, §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1, §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.3 A#5, §13.8 A#8, §13.9 A#9; J-A72.*: 16 index rows + 16 Part A entries |
| 73 | §14 (route) | §11.4, §7.7, §6.5, §16, Staged, §0.2, summary | E2: §6.5 R#8, §7.1 R#9; E1: §7.7 R#1; M: §2.8 R#8, §2.9 R#9; R: §11.4 R#19; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.3 A#5, §13.8 A#8; J-A73.*: 5 index rows + 5 Part A entries |
| 74 | §7.7 (route) | §2.9, §2.8, §14, §11.4, §7.1, §6.3, §5.3 | E2: §5.3 R#3, §6.2 R#6, §6.3 R#7, §7.1 R#9, §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8, §2.9 R#9; R: §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3; J-A74.*: 3 index rows + 3 Part A entries |
| 75 | §7.7 (route) | §11.4, §11.3, §2.8, §4.11, §14, §16, §7.1, §5.4, §7.4 | E2: §5.4 R#4, §7.1 R#9, §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8, §2.9 R#9; T: §4.11 R#7; R: §11.2 R#17, §11.3 R#18, §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3; J-A75.*: 2 index rows + 2 Part A entries |
| 76 | §4.11 (route) | §7.7, §2.9, §14, §16, §13.2, §10.3 | E2: §7.4 R#12, §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8; T: §4.11 R#7, §10.3 A#9; R: §11.4 R#19; S1: §13.2 R#6, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.8 A#8; J-A76.*: 7 index rows + 7 Part A entries |
| 77 | §7.7 (route) | §4.3, §4.11, §2.9, §2.4, §11.1, §14, §16, Staged, §6.1 | E2: §6.1 R#5, §7.5 A#13; E1: §7.7 R#1; M: §2.4 R#4, §2.8 R#8, §2.9 R#9; T: §4.11 R#7, §4.3 A#2; R: §11.1 R#16, §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.8 A#8; J-A77.*: 3 index rows + 3 Part A entries |
| 78 | §7.7 (route) | §10.2, §4.5, §4.11, §14, Delegated decisions, D-10, D-32, §16 | E2: §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8; D: §10.2 R#5; T: §4.11 R#7, §10.2 A#8; R: §11.4 R#19; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3; J-A78.*: 2 index rows + 2 Part A entries |
| 79 | §2.7 (route) | §7.7, §10.2, §4.11, §10.3, §14, §15.1, Staged, §16, §2.8 | E2: §7.5 A#13; E1: §7.7 R#1; M: §2.7 R#7, §2.8 R#8; D: §10.2 R#5; T: §4.11 R#7, §10.2 A#8, §10.3 A#9; R: §11.4 R#19; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §15.1 R#1, §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3; J-A79.*: 3 index rows + 3 Part A entries |
| 80 | §7.7 (route) | §2.8, §4.11, §4.7, §14, §16, §5.3, §7.1, §6.1, §7.4 | E2: §5.3 R#3, §6.1 R#5, §7.1 R#9, §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8; T: §4.11 R#7, §4.7 A#5; R: §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3; J-A80.*: 2 index rows + 2 Part A entries |
| 81 | §7.7 (route) | §1.1, §4.11, PART III, §9.5, §11.4, §5.4 | E2: §5.4 R#4, §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8; T: §4.11 R#7, PART III A#11; R: §9.5 R#14, §11.4 R#19; S1: §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §1.1 R#10, §15.2 R#13, Staged R#14, §13.2 A#3, §13.8 A#8; J-A81.*: 3 index rows + 3 Part A entries |
| 82 | §7.7 (route) | §2.7, §2.8, §10.4, §10.2, §14, §16, §9.1 | E2: §6.3 R#7, §7.1 R#9, §7.5 A#13; E1: §7.7 R#1; M: §2.7 R#7, §2.8 R#8; D: §10.2 R#5; T: §4.5 A#3, §4.7 A#5, §10.2 A#8, §10.4 A#10; R: §9.1 R#10, §11.4 R#19, §9.6 A#15; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3; J-A82.*: 4 index rows + 4 Part A entries |
| 83 | §13.2 (route) | §6.5, §13.8, §16 | E2: §6.5 R#8; E1: §7.7 R#1; M: §2.8 R#8; R: §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3, §13.8 A#8; J-A83.*: 2 index rows + 2 Part A entries |
| 84 | §13.2 (route) | §14, §17.1, §16 | E1: §7.7 R#1; M: §2.8 R#8; R: §11.4 R#19; S1: §17.1 R#1, §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3; J-A84.*: 2 index rows + 2 Part A entries |
| 85 | §14 (route) | §2.9, §6.2, §11.1, §11.3, §13.2, §16 | E1: §7.7 R#1; M: §2.8 R#8, §2.9 R#9; R: §11.1 R#16, §11.3 R#18, §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.8 A#8; J-A85.*: 5 index rows + 5 Part A entries |
| 86 | §7.7 (route) | §11.4, §14, §16 | E1: §7.7 R#1; M: §2.8 R#8; R: §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3; J-A86.*: 2 index rows + 2 Part A entries |
| 87 | §7.7 (route) | §11.4, §2.9, §14, §7.4 | E1: §7.7 R#1; M: §2.8 R#8; R: §11.4 R#19; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, §13.2 A#3; J-A87.*: 1 index rows + 1 Part A entries |
| 88 | §2.7 (route) | §10.2, §4.6, §4.11, §7.7, §8.2, Staged, §16, §2.8 | E1: §7.7 R#1; M: §2.7 R#7, §2.8 R#8, §2.9 R#9; D: §10.2 R#5, II.7.3 R#8, II.7.4 A#10; T: §4.11 R#7, §4.6 A#4, §10.2 A#8, §10.3 A#9; R: §8.2 R#2; S1: §16 R#7, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3; J-A88.*: 3 index rows + 3 Part A entries |
| 101 | §7.1 | §7.7, §4.1, §9.1, §9.4, §9.5, §11.2, §11.1, §14, §13.2, §13.4, §1.4 | E2: §5.2 R#2, §5.3 R#3, §6.1 R#5, §6.2 R#6, §6.3 R#7, §6.5 R#8, §7.1 R#9, §7.2 R#10, §7.3 R#11, §7.4 R#12, §7.8 R#15, §7.5 A#13; E1: §7.7 R#1; M: §2.8 R#8, §2.9 R#9; T: §4.1 R#1, §4.3 A#2; R: §8.2 R#2, §9.1 R#10, §9.2 R#11, §9.3 R#12, §9.4 R#13, §9.5 R#14, §11.1 R#16, §11.2 R#17, §12.6 A#21; S1: §1.4 R#4, §16 R#7, Delegated decisions R#8, Appendix A R#9, §0.2 R#10; S2: §14 R#2, §15.2 R#13, Staged R#14, §13.2 A#3, §13.4 A#6, §13.8 A#8; J-A101.*: 18 index rows + 18 Part A entries |

### §Ac.1 Repair round 1 applied (2026-09-28)

Lane `amendments-c/assemble-r1` (2026-09-28, a mechanical seat) applied the six repair files of round 1 —
`docs/validation/amendments-c/repair-r1-{determinism,kernel,model,pipeline,rendering,scope}.md`, the Opus stand-in
seats' answers to the 159 issues of the six verify-r0 reports — with `docs/validation/amendments-c/apply-blocks.py` in
its two-pass order (every REPLACE first, then the J-ROWS and RATIONALE-A blocks, each group in file-name order and block
order; scope's REPLACE of the whole `# Judgment calls` section would otherwise erase the other seats' J rows). All 89
blocks were applied and none was skipped: 77 REPLACE (every one on a distinct heading, so no three-way merge was needed;
scope's §0.2 block retitles its heading), 6 J-ROWS blocks (36 rows) and 6 RATIONALE-A blocks (40 entries). No file was
truncated. The seats' hand-offs were then applied by `docs/validation/amendments-c/assemble-r1-handoff.py`: the 17
restated index rows and 21 restated Part A entries were moved into the older rows' places and the older rows deleted
(723 index rows and 723 Part A entries, each id in both, no duplicate); the rendering seat's three one-string
substitutions in the document (§5.2 F-LIGHT's pass name, §13.4's pre-decided fallback, §16's M2b trigger at 53 ms) and
one in Part A (J-A68.86's P-id clause) were made; its hand-off 6 (§13.2 T30-5) was checked, not applied, because scope's
§13.2 block already carries the aligned clause; and the provenance rows P22–P24 were appended to
`research/findings/code-impact.md` §(d) verbatim from the rendering report's hand-off 3 (each row's source names and
sections checked against the reading it cites), because the repaired §8.4 (h) and §13.5 cite them. The document went
from 16 872 to 17 050 lines (2 192 330 to 2 246 556 bytes; sha256 `7f4c0e25…` to `024c57da…`), the rationale file
from 2 285 to 2 304 lines (623 311 to 648 787 bytes; `22f01184…` to `33b21ca8…`); the copies taken before are
`docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r1-2026-09-28.md`. Headings stay 147 and fence lines 130.
The resolver (`docs/validation/amendments-b/refs.py`) finds the same 2 external citations and nothing else broken;
every cited J id, P id and T id resolves (196 T ids, all in §13.2). The document checks over the 23 changed top-level
keys exit 0 (C1 5 / 0, C2 0 / 0, C3 1 420 / 0, C4 12 / 0, S1 0, S2 0) after 3 reviewed allow rows, all three C3 runs
that the P22 row's own wording raises once it joins the findings corpus. The report is
`docs/validation/amendments-c/assemble-r1.md`.

Legend. *Part* is the repair seat that answered the issue. *Sections changed* is the location cell of the seat's own
issue table (determinism, model, pipeline, rendering); for the kernel and scope seats, whose tables name blocks, it is
the sections of the blocks the row cites. "J rows" and "Part A" mean the seat's J-ROWS and RATIONALE-A blocks; a
"hand-off" is a step of the assembler's hand-off script. Every one of the 159 issue ids that the six verify-r0 reports
define appears in the table; an id another report restates appears with its alias ("=").

| issue | part | sections changed |
|---|---|---|
| VD0-01 = VPR0-11 (major) | determinism | §6.1 `works`; §7.7 DR21; J-A67.61 |
| VD0-02 = V-MC0-19 (a) (major) | determinism | §7.5 |
| V-MC0-19 (b), (c) | determinism | §7.5 |
| VD0-03 (major) | determinism | §7.1 `startWorks`; §7.4 row; J-A67.72 |
| VD0-04 (major) | determinism | §7.3 item 9 (d); §5.2 F-EDIT; J-A66.71 |
| V-MC0-04 (major) | determinism | §7.4 *Warp and what stands on the ground*; J-A68.73 |
| V-MC0-05 (major) | determinism | §5.3 entrance row |
| V-MC0-12 | determinism | §5.3 basement row |
| V-MC0-20 | determinism | §6.2; §7.1 districts row; J-A72.61 |
| V-MC0-21 | determinism | §6.2 content node; §6.3 anchor row + matching routine |
| V-MC0-22 | determinism | §7.7 item 9; §7.1 toolkit |
| V-MC0-23 | determinism | §7.7 item 1 + ts block |
| V-MC0-24 | determinism | §7.1 terrain row |
| VKC-17 | determinism | §7.3 staged-layers row (both columns); §5.3 staged-layers row (same shape) |
| VPR0-25 | determinism | §7.7 DR11, DR16, DR18, DR19 |
| VPR0-30 + VD0-13 | determinism | §6.1 readers |
| VD0-08 | determinism | §6.1 Enter; §6.4 link |
| VD0-10 | determinism | §6.3 lineage |
| VD0-11 | determinism | §6.1 `sewer`; §7.3 item 9 (d) |
| VD0-14 | determinism | §6.2 *Histories* |
| VD0-15 | determinism | §6.1 |
| VD0-16 | determinism | §7.3 item 9 (a) and the operator row; J-A66.71 |
| VD0-17 | determinism | §7.3 item 10; §6.1 variations |
| VD0-18 | determinism | §7.1 comment |
| VD0-19 | determinism | §7.1 uses, underground and names rows |
| VD0-20 | determinism | §5.2 F-PLOT |
| VD0-22 | determinism | §5.4 |
| VD0-23 | determinism | §7.5; J-A76.72 |
| VD0-24 | determinism | §7.4 knownTo row |
| VD0-25 | determinism | §7.4 underground row |
| VKC-04 = VPR0-13 = VD0-21 | kernel | §3.1 |
| VKC-02 = VPR0-07 = VD0-27 | kernel | §3.2, J rows, Part A |
| VKC-01 | kernel | §3.4, §3.10, J rows, Part A |
| VKC-03 | kernel | §3.4, Part A |
| VKC-07 | kernel | §3.4 |
| VKC-05 | kernel | §3.7, J rows, Part A |
| VKC-06 | kernel | §3.7 |
| V-MC0-01 | model | §2.8 |
| V-MC0-02 = VD0-07 | model | §2.1, §2.7 |
| V-MC0-03 | model | §2.2 rule 5, §2.7 |
| V-MC0-07 = VD0-05 | model | §2.7 |
| V-MC0-10 | model | §2.5, §2.6 |
| V-MC0-11 | model | §2.6 |
| V-MC0-13 | model | §2.7 |
| V-MC0-14 | model | §2.7, §2.8 |
| V-MC0-15 | model | §2.6 |
| V-MC0-16 | model | §2.7 |
| V-MC0-26 = VKC-09 = VPR0-08 | model | §2.2 |
| V-MC0-27 = VKC-12 | model | §2.8 |
| VRC-24 | model | §2.7 |
| VPR0-28 | pipeline | §4.1 |
| VPR0-12 = V-MC0-18 | pipeline | §4.2 S0, S1 (1), S1 (10); J-A65.49 |
| VPR0-01 | pipeline | §4.2 S3 (4), (7), (12); §4.3; J-A77.42 |
| VPR0-15 = V-MC0-17 (HistoryHint) | pipeline | §4.2 S2; II.7.6; J-A88.42 |
| VPR0-15 = V-MC0-17 (PowerRelation, legitimacy, impairments) | pipeline | §4.5 Typing, (2), (6); J-A88.42 |
| VPR0-15 (hinterland) | pipeline | §4.9 farm table; J-A88.42 |
| VPR0-03 | pipeline | §4.5 (5), §4.7 S10a (ii); J-A72.50 |
| VPR0-16 | pipeline | §4.5 (6) |
| VPR0-23 | pipeline | §4.5 S7b (7) |
| VPR0-31 | pipeline | §4.5 (3), §10.2 identities; J-A72.51 |
| VPR0-33 | pipeline | §4.5 S7b (3) |
| VPR0-22 | pipeline | §4.6, II.7.3 (2), II.7.5 size law, §10.2 `PortRows.crime` and staged-rows bullet; J-A88.41 restated |
| VPR0-04 = V-MC0-06 = VRC-21 | pipeline | §4.7 `LightRule`, (1); J-A68.42 |
| VPR0-05 = V-MC0-08 = VD0-06 = VRC-22 | pipeline | §4.7 (4) |
| VPR0-02 | pipeline | §4.7 Informal clusters (1), (2); §10.2 class mix; J-A70.49 |
| VKC-15 | pipeline | §4.8 (1), (2) |
| VKC-08 = VPR0-06 | pipeline | §4.11 *The rung at an epoch*; J-A81.41 restated |
| VKC-14 | pipeline | §4.11 *A cut way's far part* |
| VPR0-10 | pipeline | §4.11 `DeclineOp`, II.6; J-A65.48 restated |
| VPR0-17 | pipeline | §4.11 islands bullet |
| VPR0-26 = V-MC0-25 | pipeline | §4.11 *Works* (1) |
| VPR0-18 | pipeline | §4.12 |
| VPR0-19 | pipeline | §10.4 `rosterPatch` |
| VPR0-24 | pipeline | §10.4 new bullet; II.7.5 pointer; J-A65.40 |
| VPR0-29 | pipeline | II.1 |
| VPR0-20 | pipeline | II.4 |
| VPR0-34 | pipeline | II.7.1, II.7.2 |
| VPR0-27 | pipeline | II.7.3 (4), II.7.4 `knownTo`, II.7.6 step 5 |
| VPR0-32 | pipeline | II.7.3 access; J-A64.44 |
| VKC-16 | pipeline | II.7.5 order, seed and locality |
| VPR0-14 | pipeline | II.7.5 `ClearUndercity`, II.7.6 `RaiseGrade` |
| VPR0-09 = V-MC0-28 | pipeline | II.7.6 `RaiseGrade.system?`, buried-town bullet; J-A65.46 restated |
| VKC-10 | pipeline | II.7.6 buried-town bullet; J-A65.46 restated |
| VKC-11 | pipeline | II.7.6 one-system paragraph, step 3; J-A65.47 Part A restated |
| VKC-13 | pipeline | J-A12.45 index and Part A restated |
| VD0-12 | pipeline | II.7.6 closure instances |
| VKC-18 | rendering | §8.4 |
| VPR0-21 | rendering | §8.2 |
| VD0-09 | rendering | §11.4 |
| VRC-01 (major), VSC-09 | rendering | §11.2, §9.2 |
| VRC-02 | rendering | §8.3 |
| VRC-03 | rendering | §8.3 |
| VRC-04 | rendering | §8.4 (c) |
| VRC-05 | rendering | §8.4 (f), §8.2, §8.8, §8.9 |
| VRC-06 | rendering | §8.4 (f), §8.8 |
| VRC-07 | rendering | §8.4 (c), §12.5, §12.7 |
| VRC-08 | rendering | §8.4 (g), §8.8, §8.9, §12.8; hand-off 5: §13.4 fallback |
| VRC-09 | rendering | §8.4 (d), (e), Sun bullet; §8.2 |
| VRC-10 | rendering | §8.4 |
| VRC-11 | rendering | §8.2, §8.3 |
| VRC-12 | rendering | §11.1 |
| VRC-13 | rendering | §12.4, §12.3; hand-off 7: §16 M2b trigger |
| VRC-14 | rendering | §12.8 |
| VRC-15 | rendering | §8.4 (h); hand-offs 2 and 3: Part A J-A68.86, code-impact.md P22–P24 |
| VRC-16 | rendering | §9.4 |
| VRC-17 | rendering | §8.4 (f), (g), §8.5, §8.9; hand-off 4: §5.2 F-LIGHT |
| VRC-18 | rendering | §8.2 |
| VRC-19 | rendering | §11.4 |
| VRC-20 | rendering | §12.2 |
| VSC-01 (major) | scope | §16, §13.2, §0.2, J rows, Part A |
| VSC-02 | scope | §0.2 |
| VSC-03 | scope | Judgment calls |
| VSC-04 | scope | §1.2 |
| VSC-05 | scope | §15.2 |
| VSC-06 | scope | §15.1, §15.2 |
| VSC-07 | scope | §14 |
| VSC-08 | scope | §13.2 |
| VSC-10 (= VRC-23) | scope | summary, Judgment calls, Part A |
| VSC-11 | scope | §13.3 |
| VSC-12 | scope | §13.2, §13.8, §16, Judgment calls, Part A, §15.2 |
| VSC-13 | scope | §14 |
| VSC-14 | scope | Appendix A |
| VSC-15 | scope | §13.5; hand-off 3: code-impact.md P22–P24 |
| VSC-16 | scope | §16, §13.2 |
| VSC-17 | scope | §16 |
| VSC-18 | scope | §15.2 |
| VSC-19 | scope | §14 |
| VSC-20 | scope | Staged |
| VSC-21 | scope | §1.1, §14, Delegated decisions, §0.2, §13.2, J rows, Part A |
| VSC-22 = VD0-26 | scope | §13.3 |
| VSC-23 = VKC-19 | scope | §13.2 |
| VSC-24 = VKC-20 | scope | §13.2 |
| VSC-25 | scope | §0.2, summary |
| VSC-26 = V-MC0-09 | scope | §13.5, §13.2, §15.2, Judgment calls, Part A |

### §Ac.2 Repair round 2 applied (2026-09-28)

Lane `amendments-c/assemble-r2` (2026-09-28, a mechanical seat) applied the six repair files of round 2 —
`docs/validation/amendments-c/repair-r2-{determinism,kernel,model,pipeline,rendering,scope}.md`, the Opus stand-in
seats' answers to the 75 issues of the six verify-r1 reports — with `docs/validation/amendments-c/apply-blocks.py` in
its two-pass order (every REPLACE first, then the J-ROWS and RATIONALE-A blocks, each group in file-name order and block
order). All 55 blocks were applied and none was skipped: 45 REPLACE (every one on a distinct heading, so no three-way
merge was needed; no heading was retitled), 5 J-ROWS blocks (19 rows) and 5 RATIONALE-A blocks (20 entries); the kernel
file carries no ruling. No file was truncated. The seats' hand-offs were then applied by
`docs/validation/amendments-c/assemble-r2-handoff.py`: the 9 restated index rows (J-A63.22, J-A65.46, J-A65.49,
J-A68.73, J-A68.83, J-A68.85, J-A68.89, J-A72.50, J-A88.42) and 10 restated Part A entries (the same and J-A66.01) were
moved into the older rows' places and the older rows deleted; the 10 new ids (J-A65.22, J-A88.73, J-A65.02, J-A68.90,
J-A63.82, J-A68.91, J-A68.92, J-A85.83, J-A101.86, J-A67.83) stay where the protocol appended them (733 index rows and
733 Part A entries, the same id set, no duplicate). The rendering seat's one-string substitutions were made, each found
once inside its named row or subsection: J-A20.82's index row and Part A entry ("§2.8's marker" to "§2.8's `factTier`"),
J-A68.86's Part A clause (its P-ids P22–P24, the readings' sections being code-impact.md §(d)'s), II.7.3's light-shaft
sentence (a secret shaft lit only for a key under which it draws) on pipeline's r2 text, and §13.4's fallback ("the
traversal unchanged"). Three hand-offs were checked, not applied: pipeline's §5.2 F-SITING texts are carried by
determinism's §5.2 block, model's §2.2 states the further part's ring that kernel's §3.2 (9) points to, and pipeline's
S0 relief toggle and determinism's §6.1 draw order, which scope's bars name, landed together. The document went from
17 050 to 17 215 lines (2 246 556 to 2 281 645 bytes; sha256 `024c57da…` to `3daa0b07…`), the rationale file from
2 304 to 2 314 lines (648 787 to 664 923 bytes; `33b21ca8…` to `bfa20419…`); `research/findings/code-impact.md` is
unchanged. The copies taken before are `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r2-2026-09-28.md`. Headings stay 147 (every heading line
unchanged) and fence lines 130. The resolver (`docs/validation/amendments-b/refs.py`) finds the same 2 external
citations and nothing else broken; every cited J id resolves in the index (the only other `J-` tokens are five
pre-existing Part A citations of other ledgers' ids: the survey plan's J-M4 and J-M9, the Fable review's J-Fcode-1
to J-Fcode-3), and the 202 cited T ids are all in §13.2. The document checks
over the 18 changed top-level keys exit 0 (C1 5 / 0, C2 0 / 0, C3 1 334 / 0, C4 10 / 0, S1 0, S2 0), the same counts as
the untouched document on the same corpus, with no correction and no allow row. The report is
`docs/validation/amendments-c/assemble-r2.md`.

Legend. *Part* is the repair seat that answered the issue. *Sections changed* is the location cell of the seat's own
issue table (for the kernel seat, the subsection and paragraph its table names), with the J rows it restated or added
and any step of the assembler's hand-off script. Every one of the 75 issue ids that the six verify-r1 reports define
appears in the table; an id another report restates appears with its alias ("=").

| issue | part | sections changed |
|---|---|---|
| V-MC1-01 = VD1-08 | model | §2.7 `Use.concealment`, `Use.concealmentSource`; J-A63.22 (restated, index and Part A) |
| V-MC1-03 = VD1-12 | model | §2.7 `LightSource.host` |
| V-MC1-05 | model | §2.7 `HistoryHint` (the staged records' paragraph) |
| V-MC1-06 | model | §2.6 entrance rule 4 |
| V-MC1-10 | model | §2.3 the raster sentence, `HydroGrid.cellCm` |
| V-MC1-11 | model | §2.3 `Terrain.geology`; §2.8 the registry |
| VKC1-02 | model | §2.2 rule 1, the further parts; J-A65.22 (new, index and Part A) |
| VD1-13 | model | §2.8 the registry, `Works` |
| VKC1-01 | kernel | §3.2 (9) *Frame growth at an epoch* |
| VKC1-03 | kernel | §3.3 *Clear regions and prepared contacts* |
| VPR1-02 | determinism | §5.2 F-SITING (where, detection, ladder, household rung) |
| VD1-01 = VS1-01 | determinism | §7.7 item 15, DR23; §5.4 |
| VPR1-15 | determinism | §6.1 readers |
| V-MC1-07 = VD1-06 | determinism | §7.1 `setEntrance` and the entrances paragraph |
| VD1-07 | determinism | §7.1 `startWorks.change`, `WithoutBase`, `WorksChange` |
| V-MC1-04 = VD1-05 | determinism | §7.4 *Warp* (every light host's face) |
| VD1-04 | determinism | §7.4 *Warp* (door lights); J-A68.73 (restated, index and Part A) |
| VD1-02 | determinism | §7.5 |
| VD1-03 | determinism | §7.7 layer 2, DR17; J-A88.73 (new, index and Part A) |
| VPR1-16 | determinism | §7.7 trade, DR3 |
| VPR1-01 (major) | pipeline | §4.5 (5); J-A72.50 (restated, index and Part A); its §5.2 F-SITING text in determinism's §5.2 block |
| VPR1-03 | pipeline | §4.5 (6); §10.2 `conditionSteps`; J-A88.42 (restated, index and Part A) |
| VPR1-04 | pipeline | II.7.6 (the buried town); II.7.5 (S7b's prediction); J-A65.46 (restated, index and Part A) |
| VKC1-04 = VPR1-05 | pipeline | §4.11 *The rung at an epoch* (rasters) |
| VKC1-05 = VPR1-07 | pipeline | §4.11 *The rung at an epoch* (underground re-derivers) |
| VPR1-06 = VD1-14 = VS1-02 | pipeline | §4.11 *The rung at an epoch* (the cap refusal) |
| V-MC1-02 = VPR1-08 = VD1-09 | pipeline | §4.7 *Concealed institutions* (1) |
| V-MC1-08 = VPR1-14 | pipeline | §4.7 S11 *Entrances* |
| VPR1-09 = VD1-10 | pipeline | II.7.6 *The pieces an access edit generates* |
| VPR1-10 | pipeline | §4.10 |
| VPR1-11 | pipeline | II.7.3 *Access, air and light*; II.7.5 *Lifelines and light* |
| VPR1-12 | pipeline | §4.2 S0, S1 (1), S1 (10), S2; §4.9; J-A65.49 (restated, index and Part A) |
| VPR1-13 | pipeline | §10.2 `PortRows.hinterland` |
| V-MC1-09 = VD1-11 = VRC1-10 | rendering | §9.2; §11.1 (three places); §11.2; hand-off: J-A20.82 index row and Part A |
| VRC1-01 (major) | rendering | §8.4 (c), §8.8, §8.9, §8.1, §8.3, §12.5, §12.8; J-A68.89 (restated), J-A68.90 (new) |
| VRC1-02 | rendering | §8.4 (c), §8.8, §8.3; J-A68.83 (restated); hand-off: §13.4 "the traversal unchanged" |
| VRC1-03 (major) | rendering | §8.1 item 7, §8.4 (b), (f), §8.8, §11.1, §8.3; J-A63.82 (new); hand-off: II.7.3 light shaft |
| VRC1-04 | rendering | §8.4 (f), §8.2; J-A68.91 (new) |
| VRC1-05 | rendering | §11.1 SVG row, §8.2 |
| VRC1-06 | rendering | §8.3 |
| VRC1-08 | rendering | §11.2 |
| VRC1-09 = VS1-03 | rendering | §12.2, §11.4 |
| VRC1-11 | rendering | §11.2, §11.3, §11.4; J-A85.83 (new) |
| VRC1-12 | rendering | §8.8, §12.8, §11.1 |
| VRC1-13 | rendering | §12.7; J-A68.85 (restated) |
| VRC1-14 | rendering | §8.2 |
| VRC1-15 | rendering | §8.1, §8.2, §8.3; J-A67.83 (new) |
| VRC1-16 | rendering | hand-off: Part A J-A68.86 |
| VRC1-17 | rendering | §8.4 (f), §8.8, §8.9, §12.5; J-A68.92 (new) |
| VRC1-18 | rendering | §11.3, §11.2; J-A101.86 (new) |
| VKC1-06 = VS1-05 | scope | §13.2 T81-1 |
| VS1-04 | scope | §13.2 T65-7, T70-6, T72-9, T77-1, T88-1; §13.8; §16 M1, M2b, M3a, M4; §0.2 row 65; J-A65.02 (new, index and Part A) |
| VPR1-17 | scope | as VS1-04, of which it is the narrower form |
| VRC1-07 | scope | §13.2 T30-5 |
| VS1-06 | scope | §13.2 T30-5 |
| VS1-07 | scope | §16 M3a, M4; §13.2 T66-5; J-A66.01 (restated, Part A) |
| VS1-08 | scope | Delegated decisions D-25 |
| VS1-09 | scope | the summary (both places) |

Beyond the issue rows, the scope seat folded the pipeline seat's cross-part note 2 into §13.2 (T65-7's dossier clause,
T65-8, T72-9's placement clause, T88-2) and §16 M2b's exit, and the determinism seat folded the pipeline seat's §5.2
hand-off into its own §5.2 block.

### §Ac.3 Repair round 3 applied (2026-09-28)

Lane `amendments-c/assemble-r3` (2026-09-28, a mechanical seat) applied the five repair files of round 3 —
`docs/validation/amendments-c/repair-r3-{determinism,model,pipeline,rendering,scope}.md`, the Opus stand-in seats'
answers to the 29 open issues (33 ids) of `docs/validation/amendments-c/validate.md` §5; the kernel part had none — with
`docs/validation/amendments-c/apply-blocks.py` in its two-pass order. All 36 blocks were applied and none was skipped:
26 REPLACE (every one on a distinct heading, so no three-way merge was needed; no heading was retitled), 5 J-ROWS blocks
(11 rows) and 5 RATIONALE-A blocks (13 entries). No file was truncated. The seats' hand-offs were then applied by
`docs/validation/amendments-c/assemble-r3-handoff.py`: the 9 restated index rows (J-A68.73, J-A68.85, J-A68.89,
J-A68.90, J-A68.92, J-A81.01, J-A88.21, J-A88.42, J-A101.86) and 11 restated Part A entries (the same and J-A42.41,
J-P37) were moved into the older rows' places and the older rows deleted; the 2 new ids (J-A68.93, J-A68.94) stay where
the protocol appended them (735 index rows and 735 Part A entries, the same id set, no duplicate). The determinism seat's
VD2-03 script (`repair-determinism-r3-handoff.py`, run unchanged) then rewrote 26 pointers — 25 layer-2 ones to
"§7.7 layer 2" and one layer-1 one to "§7.7 layer 1" — and checked that every "§7.7 item 1" / "§7.7 item 2" left (11 and
14) is a known dossier-contract pointer, and the rationale file's 3 as well. Nine cross-seat texts were checked, not
applied, each present once in its subsection or index row: §13.2's lit-street fixture follows §7.4's door-light wording;
the restated J-A68.73 row no longer carries "fraction along the footprint edge"; T88-1 and J-A88.42 name the catacomb
age; §2.9 names S2's stage count and II.7.6's rules as the history's readers, and §2.7 and J-A88.21 cite J-A88.42; J-A81.01's section column reads "§7.7 item 15, §1.1, §14". The
output is byte-identical to the rendering seat's own swap script followed by the generic swap and the determinism
script run standalone. The document went from 17 215 to 17 305 lines (2 281 645 to 2 298 461 bytes; sha256
`3daa0b07…` to `70ddb6e3…`), the rationale file from 2 314 to 2 316 lines (664 923 to 672 652 bytes; `bfa20419…` to
`e138da23…`); `research/findings/code-impact.md` and the allow file are unchanged. The copies taken before are
`docs/archive/ARCHITECTURE-pre-amendments-c-repair-r3-2026-09-28.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r3-2026-09-28.md`. Headings stay 147 (every heading line
unchanged) and fence lines 130; 33 headings' own text changed (the 26 REPLACE targets, the six subsections only the
VD2-03 script touched — §4.2, §4.3, §4.5, §5.3, §10.3, II.7.5 — and the judgment index). The resolver
(`docs/validation/amendments-b/refs.py`) finds the same 2 external citations and nothing else broken; every cited J id
resolves in the index (the only other `J-` tokens are the five pre-existing Part A citations of other ledgers' ids), and
the 202 cited T ids are all in §13.2. The document checks over the 15 changed top-level keys exit 0 (C1 5 / 0, C2 0 / 0,
C3 1 159 / 0, C4 11 / 0, S1 0, S2 0); the untouched document on the same corpus gives C3 1 153 / 0, the six added hits
being reviewed build tags ("NG 1.2.2's", five "of the 2026-09-25 capture"); no correction and no allow row. The report is
`docs/validation/amendments-c/assemble-r3.md`.

Legend. *Part* is the repair seat that answered the issue. *Sections changed* is the location cell of the seat's own
issue table, with the J rows it restated or added and any step of the assembler's hand-off. Every one of the 33 issue ids
that validate.md §5 lists appears in the table; an id another report restates appears with its alias ("="). RP3-01 is
the pipeline seat's self-found defect, fixed under the no-defer rule.

| issue | part | sections changed |
|---|---|---|
| VRC2-01 | rendering | §8.4 (c), (f); §8.8; §8.9; §8.3; §12.5; §12.7; §12.8; §8.1; §11.1 (first-ring band); J-A68.89, J-A68.90 (restated), J-A68.93, J-A68.94 (new) |
| VRC2-03 | rendering | §8.4 (g); §8.8; §8.9; §12.8; J-A68.85, J-A68.89 (restated) |
| V-MC2-01 | model | §2.9 `Recipe.history`; J-A88.21 (restated, index and Part A) |
| V-MC2-02 | model | §2.7 `UndergroundSystem.sources` (with the dug passage's building, `addUndergroundAccess`) |
| VPR2-01 | pipeline | §4.7 S10b *Reconcile* |
| VPR2-02 | pipeline | §4.7 *Concealed institutions* (1) (re-placed by (2)–(6)) |
| VPR2-03 | pipeline | §4.11 *The rung at an epoch* (the `buried` and `dug` parts re-laid by `corridorUnion`) |
| VPR2-04 | pipeline | II.7.6 *The derivations*; `UndergroundSystemRow.chance` comment |
| VPR2-05 | pipeline | II.7.6 *A buried old town* |
| VPR2-06 | pipeline | II.7.6 `params` comment |
| VPR2-07 = VD2-02 | determinism | §7.7 F4 row and the status table's `impaired` row |
| VPR2-08 = VS2-02 | scope | §14 `StrategyRegistry.underground` comment |
| VD2-01 | determinism | §7.4 *Warp and what stands on the ground* (three places); J-A68.73 (restated, index and Part A) |
| VD2-03 | determinism | §7.7's list head (the pointer convention); assembler hand-off: 26 pointer rewrites in §2.7, §2.9, §4.2, §4.3, §4.5, §4.11, §5.3, §10.2, §10.3, §11.1, §14, II.7.5 and the J-A79.23 index row |
| VD2-04 = VS2-01 | scope | §13.2 B-EDIT fixtures (the lit-street warp fixture); §16 M3b and M4 exits |
| VD2-05 = VS2-05 | scope | J-A81.01 (restated: index section column, Part A provenance) |
| VRC2-02 | rendering | §8.8; §8.9 (band request row, `TileRasterOpts.block`); §8.1 item 2; J-A68.93 (new) |
| VRC2-04 | rendering | §8.4 (c); §8.3 (four rows); J-A68.90 (restated, Part A) |
| VRC2-05 | rendering | §8.1 (comment, item 6); §8.8 print; §11.1; J-A68.93 (new) |
| VRC2-06 | rendering | §8.4 (f); §8.3 (hand-lantern row); J-A68.92 (restated) |
| VRC2-07 | rendering | §11.3; J-A101.86 (restated) |
| VS2-03 | scope | §13.2 T88-1 |
| VS2-04 | pipeline | J-A88.42 (restated, index and Part A) |
| VS2-06 | scope | §0.2 rows 64, 65, 67, 70, 72 |
| VS2-07 | scope | §16 the O1 line's basis |
| VAL-01 | pipeline | §4.6 step 2; J-A42.41 (restated, Part A) |
| VAL-02 | scope | §13.5 plot-area gradient row; §15.1 FTG C9 row; the same class, vetoable: §13.5's amendments-c paragraph (three build names), §15.2 O5's reference note |
| VAL-03 | pipeline | §4.7 *Informal clusters* 3 (i), (ii) (the cluster row's values, with the path width) |
| VAL-04 | pipeline | J-P37 (restated, Part A) |
| RP3-01 | pipeline | §10.2 `ClusterRow.fireGapM` typed by rung; §4.7 *Informal clusters* (ii) reads it at the settlement's rung |

Beyond the issue rows: the rationale file's information run of the document checks (outside §17.1 (2)'s gate) shows ten
new unreviewed 3-gram and list hits, all in the rendering seat's restated or new Part A entries (J-A68.85, J-A68.90,
J-A68.92, J-A68.93, J-A101.86); they are listed in the report for the next round.

### §Ac.4 Hand fix (2026-09-28)

Lane `handfix-c/apply` (2026-09-28, a mechanical seat) applied the hand-fix list of the amendments-c closing seat —
the 19 issues (1 major, 18 minor) of `docs/validation/amendments-c/closing-report.md` §2, with its §3 rulings, written
as the 59 data rows of `docs/validation/amendments-c/closing-handfix-rows.py` — by
`docs/validation/amendments-c/handfix-apply.py`, which reuses those rows and the amendments-b hand-fix engine unchanged.
All 59 rows were applied and none was skipped: every anchor was found exactly once on the original and on the evolving
text, and every new text occurs exactly once in the result. The result is byte-identical to the closing seat's dry run.
The document went from 17 305 to 17 297 lines (2 298 461 to 2 304 442 bytes; sha256 `70ddb6e3…` to `87588d34…`), the
rationale file from 2 316 to 2 317 lines (672 652 to 675 351 bytes; `e138da23…` to `db063efd…`); headings stay 147,
every heading line unchanged. The copies taken before are `docs/archive/ARCHITECTURE-pre-handfix-c-2026-09-28.md` and
`docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-c-2026-09-28.md`. The resolver finds the same 2 external citations and
nothing else broken; the judgment index and Part A hold 736 rows each, one id set (J-A66.72 new). The document checks over the 13 changed top-level keys exit 0 (C1 5 / 0, C2 0 / 0, C3 1 185 / 0, C4 9 / 0, S1 0, S2 0); the untouched document on the same corpus gives C3 1 186 / 0; no correction and no allow row.
The report is `docs/validation/amendments-c/handfix-apply.md`.

| issue | sections changed |
|---|---|
| VD3-02 (major) | §5.3 the light row |
| VD3-03 | §4.7 `LightRule.offsetCm`; §4.7 *Light sources* (4) |
| VD3-01 | §7.4 the door light's carry, its re-seat and held-record exceptions; J-A68.73 (restated, index and Part A) |
| VS3-01 (= VD3-09) | §13.2 the B-EDIT lit-street fixture |
| VD3-05 (= V-MC3-02, VPR3-04's §7.3 part) | §7.3 item 9 (d); §6.1 the underground closure's keying; J-A66.72 (new, index and Part A) |
| VD3-06 (= V-MC3-03, VPR3-04's §2.7 part) | §2.7 `UndergroundSystem.sources`; §2.1 the underground layer (the `dug` part, and when a `dug` system exists) |
| VD3-07 (= VPR3-04's II.7.6 clause) | II.7.6 the `dug` kind, the `dug` system's creation and the closing paragraph; §4.11 frame growth |
| VS3-02 (= VD3-08, widened) | §13.2 T66-6 (new); §16 M4 exit; J-A66.01 (restated, index and Part A) |
| VS3-03 | §0.2 row 66 |
| V-MC3-01 (= VPR3-03) | §2.7 `Use.concealmentSource` comment |
| VPR3-02 | J-A63.41 (restated, Part A) |
| VPR3-01 | §10.2 `ClusterRow.kinds.depthM`; §4.7 *Informal clusters* 3 (i) |
| VD3-04 | §7.7 the `Intent` comment |
| VRC3-01 | §8.1 items 2 and 6; §8.8 the pyramid levels and the ring blocks; §8.3 mountainous row; J-A68.93 (restated, index and Part A) |
| VRC3-02 | §8.1 `surfaceTopCm`; §8.4 (a); §8.8 the slab list; §8.9 the tile worker → main row; §8.3 island-shadow row (new) |
| VRC3-03 | §8.8 the print paragraph |
| VRC3-04 | §8.8 the export tile's window and the block cache; §12.8; J-A68.90 (restated, index and Part A) |
| VS3-04 (= VRC3-05) | §16 M4 exit |
| VS3-05 | §12.5 the measurement; J-A68.92 (restated, Part A) |
