# Red team — DETERMINISM AND STATE LIFECYCLE lens against `docs/ARCHITECTURE.md`
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat redteam:lifecycle (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `validation/redteam-lifecycle` · 2026-09-25 · seat: red-team validator (Fable role; opus stand-in), clean-room (no
captured JavaScript bundle opened; no reference code copied).

**Status: COMPLETE — 31 findings (2 blocker, 18 major, 11 minor).** §2 is the parseable table (one row per finding, the
`RT_SCHEMA` fields); §3 gives each failure scenario, its evidence and the required change; §4 lists what to keep; §5
groups the findings for the reviser and names the overlaps with `redteam-geometry.md` (cited by `GEO-n`, not repeated);
§6 separates CONFIRMED from PLAUSIBLE.

## §0 Reading record

| file | size | read |
|---|---|---|
| `workflows/lane-prompts/03/redteam_lifecycle.prompt.txt` | 23 KB | in full (the brief) |
| `research/findings/_critic.md` | 42 KB, 478 lines | in full, first (standing ruling) |
| `docs/ARCHITECTURE.md` | 245 KB, 2 200 lines | in full, every line (§0–§17, PART II, PART III, D-1–D-25, J-1–J-18, deferrals, Appendix A) |
| `docs/validation/redteam-geometry.md` | 134 KB | §0–§2 (the full findings table GEO-1–GEO-42), §4–§6 in full; §3 detail by heading only (the table rows state each claim, evidence and change) — read so that this lens cites, and does not duplicate, its findings |
| `workflows/03-assess-design-validate.js` | — | `RT_SCHEMA` and the RedTeam / Revise / Verify phases only (to make §2 parseable) |
| `research/findings/_critic-os.md` | 63 KB, 434 lines | in full (§0–§6: constants, C1–C18, S1–S20, the Random draw order §4, gaps) |
| `research/findings/_critic-vg-ng.md` | 37 KB, 226 lines | in full (V1–V27 incl. V25 the VG build change, §2, S1–S29/P1–P5, §4, §6) |
| `research/findings/_critic-ftg.md` | 49 KB, 256 lines | in full (F1–F27, §2, 37 spot-checks, §4 payload table, §6 gaps) |
| `docs/ARCHITECTURE-VALIDATION.md` | 5 KB | in full (the file's history; which sections are least reviewed: D-23–D-25, §7.8's thumbnail bullet, §16, PART II) |
| `docs/IMPROVEMENTS.md` | 193 KB | O2 and O9 in full (lines 216–300: answers, design idea, acceptance, restraint) — the two opportunities this lens tests; the rest not read |
| `research/findings/profile-mfcg.md` | 204 KB | §2 (the Blueprint URL keys, lines 58–100) and the Explicit-gates addendum passages in full: Enter drops explicit params (1045–1060), the seed chain / no reseed / save-restore / clock seed (1170–1212), EG2-4 re-roll on a gate-count change (1590–1605, 1665–1700), the determinism recommendation (1715–1732); the rest by grep hits only |
| `research/findings/mfcg-posts-b.md` | 65 KB | §2.21 tail and §2.22 (lines 538–566: edits not in the URL, round trip 'subtly changed the city geometry', permalinks) and open questions 13–19 (755–766) |
| `research/findings/mfcg-devlogs-a.md` | 91 KB | §2.27 determinism, permalinks and state (lines 865–880) |
| `research/findings/vg-posts-b.md` | 91 KB | the 1.6.1 behaviour-shift note (485–495), §2.34 house numbering (715–732) and the permalink lines (798–808), located by grep |
| `research/findings/profile-village.md` | 207 KB | R6 (lines 1879–1905), checked for the successor-seed statement (not used) |
| `research/findings/ftg-posts-a.md`, `ftg-posts-b.md`, `ftg-posts-c.md` | — | ftg-posts-a release rows 1–4 (id-model change destroyed towns); ftg-posts-b T-05 (versioned files as undo); ftg-posts-c §2.20 bulk regenerate (lines 615–635) and the 151265004 bullet (920–935) — located by grep |
| `research/findings/ftg-docs-params.md` | 77 KB | line 454 only (the lazy-person quote, via grep) and §3.10 as cited by `_critic-ftg.md` |
| `research/findings/watabou-extra-a.md` | — | §2.21 (lines 829–840: what a Perilous Shores permalink does not capture), located by grep |
| `research/ftg-docs/useSettlements__settings.md` | raw guide page | lines 15–40 (FTG's per-person persistence rule and the index-stored option hazard), read at source |

**Not read** (outside this lens or superseded by the critics read above): the other findings files cover to cover
(`mfcg-posts-a`, `mfcg-devlogs-b`, `os-*`, `profile-neighbourhood`, `vg-posts-a`, `vg-ng-devlogs`,
`ftg-payload-visual`, `watabou-extra-b`, the rest of `watabou-extra-a`, `visual-spec`, `manor`), `docs/CONFIDENCE.md`, the design proposals and
judges, and any capture file. `redteam-geometry.md` §3 was read by heading only (its table rows carry each finding).
Every reference fact used below comes from a passage listed here or from a critic file read in full. No captured
JavaScript bundle and no reference source code was opened. Reading total ≈ 200 k tokens, under the 350 k switch point.

## §1 Lens, method, severity rule

**Lens (from the brief).** DETERMINISM AND STATE LIFECYCLE: trace every piece of state through create, read, persist,
regenerate / re-derive, grow / extend (the EVOLUTION hook: the pipeline run incrementally on an existing settlement;
wall → road conversion), undo / restore, clone, migrate / import; hunt for the write that survives one path and ghosts
another — edits lost on area-regenerate, pins that dangle after roster or geometry change, seeds that reshuffle when a
feature is added, goldens that silently shift, version-migration gaps, permalink / parameter drift.

**Method.** Each finding is a concrete input or state → a wrong output, a non-reproducible model, a lost or misbound
edit, an unmeasurable claim, or an uncovered capability, with the architecture section that specifies the failing
mechanism (quoted), the evidence, and the specific change required. The architecture's own text is the primary
evidence for this lens (the failure is usually two of its own rules colliding); reference behaviour is cited where the
references show the same failure class (build drift, stream continuation, lost edits). Where a finding re-raises
something in the architecture's *Deferrals* list it says why the deferral does not cover it; where it overlaps a
geometry-lens finding it cites that `GEO-n` and argues only the lifecycle consequence.

**Severity** (the geometry lens's rule, kept so the two files calibrate together). *blocker* — the design, as written,
cannot meet a goal it states (quoted) **and** the repair changes a core structure or a cross-cutting guarantee (the
id model, determinism, the document contract); *major* — will bite in normal use and needs a design change to a
mechanism, a stage or an interface; *minor* — a local defect or an under-specification with a cheap, contained fix.

**Evidence classes.** Architecture text (quoted by section) is CONFIRMED as what the design says. Reference behaviour
is CONFIRMED only where a findings or critic file records it and this seat read that passage. A failure scenario built
from two quoted rules is CONFIRMED as a contradiction in the text; how often it bites in a built system is PLAUSIBLE
until M0–M4 exist. Arithmetic shown inline is CONFIRMED as arithmetic.

## §2 Findings table (machine-parseable; one row per finding)

Columns match the workflow's `RT_SCHEMA` (`id`, `severity`, `claim`, `evidence`, `required_change`), as in
`redteam-geometry.md`. Each row stands alone; §3 carries the full failure scenario per id. `ARCH` = `docs/ARCHITECTURE.md`.

| id | severity | claim | evidence | required change |
|---|---|---|---|---|
| LC-1 | blocker | One hierarchical id string `<kind>:<parent path>/<n>`, minted from a per-parent creation-order counter, is both the address every edit, lock, assignment, pin, household and label points at and the key of the entity's random streams. It cannot survive the re-parenting the design itself performs (drawBoundary re-runs S6, district merge/split, outskirtToDistrict, epoch district extension, a locked plot outliving a district regenerate): the re-parented entity either takes a new path (locks, assignments and renames orphan) or keeps a path that lies, after which the parent's counter mints the same string again (duplicate id, batch abort). Fresh ids are 'minted afresh' at their creation position and a revision suffix is used 'only on collision with a locked or edited id', so a superseded id that was assigned, pin-hosting, labelled or housing a household is recycled to an unrelated entity and every reference silently re-binds. JOINed plot ids encode their member list, so a prosperity brush or an epoch that changes a join set changes the ids of exactly the manor, inn and institution plots most likely to carry assignments. | ARCH §2.1 (id format, anchor rule, collision rule, JOIN id), §6.3, §6.1 (path = stage/entity id/concern), §7.2 (locks as fixed inputs; drawn boundaries before S6), §7.4 (orphans), §4.11 (outskirtToDistrict; districts extend), §4.5 (merge floor), §4.7 S10 (7), §2.8 (single LifecycleState). Brief, ASSIGNMENT HOOK: ids 'that survive regeneration and edits'; one-page: 'edits are saved as a list of events on stable ids, they survive regeneration and version upgrades'. IMPROVEMENTS O9 design idea: 'locked and edited entities are never mutated'. FTG 65223067 and 66499838 (ftg-posts-a rows 1–2): an id-model change 'requires destroying all existing towns'; D-12, D-13 and D-15 price reversal 'high after M1'. | Separate address from lineage. Address id: opaque, document-scoped, minted once from a per-kind high-water counter persisted in the document, never reused (tombstones with supersededBy), parent held as a field and never parsed from the string. Carry-over: every re-derivation (regenerate, Adjust, template replacement, migration, epoch) matches new entities to old by anchor (GEO-34 hysteresis plus a class-compatibility check) and hands over the old address id, including across a change of parent. Stream key: a lineage key (parent lineage key + local creation index + reroll, attempt, epoch) recorded in Provenance and kept by a carried-over entity so its draws do not change. JOIN ids follow the anchor rule. One collision rule: a fresh id never equals a live or tombstoned id. Exports carry address ids and a supersedes table. B-EDIT fixtures with drawBoundary, district merge and split, outskirtToDistrict, regenerate around a lock and an id-recycling case: 0 duplicate ids, 0 silent re-binds. |
| LC-2 | blocker | S10–S14 are 'lazy per district after the first paint' and METROPOLIS 'relies on' it, but S10b siting fills plots town-wide 'in descending score with capacity accounting' and reconciles by JOINing plots in the affinity or next-best district, S10's claims-first step needs siting's decision before a district's plots are cut, the F-CUT substitution rung reads 'the roster's largest unplaced class', S13 collisions and names are town-wide, and the prosperity drivers include kernels around tanneries and institutions that exist only after siting. The order in which districts are first viewed therefore decides which plot hosts the guildhall, which plots are joined, which block is substituted and which label wins: two users (or the UI and the headless CLI) get different towns from one seed. | ARCH §4.1 bullet 1, §4.7 S10 (3) and S10b, §5.2 F-SITING and F-CUT rows, §4.5 driver list, §9 collision per LOD, §12 ('METROPOLIS relies on lazy per-district derivation of S10–S13'), §6.2 (pure function), O2 (a), O11 (f) 'headless hash = UI hash', one-page 'The same seed always gives the same town on every machine'. MFCG and NG build the whole model before drawing and FTG generates in one server pass (_critic-ftg F20; roadlength100 README), so the hazard is new with the lazy tier. | Write a laziness contract: a stage may be lazy only if its output for district D is a pure function of eager upstream state and D's own sub-stream, reading no other district's lazy output and writing nothing outside D. Split S10b into an eager town-level allocation after S9 (demand per class to districts and blocks, claims and JOIN decisions at block granularity) and a lazy per-district placement that honours it; move institution-dependent prosperity kernels to the allocation or to a declared eager second field pass; F-CUT reads the allocation, not live roster state; S13 either eager per LOD or view data outside the model hash (LC-17, GEO-29). Define the model hash over the fully derived model; CI derives districts in random permutations and requires identical hashes. |
| LC-3 | major | Stream paths embed creation-order ids, so any change that alters an upstream stage's output (a new branch type in S5, a fix that consumes one more heading draw) renumbers districts, blocks and plots below it and moves every downstream draw although the downstream code is unchanged. 'Adding a feature later does not reshuffle existing maps', 'feature growth without reshuffling' and 'stages untouched by a release stay byte-identical … a property rather than a hope' are false as stated; a shift record naming S5 is accompanied by moved goldens in S6–S14, which are either bulk re-signed (an S11 regression landing in the same release rides through) or leave CI red. | ARCH one-page; §6.1 paths (e.g. S11/siteplan/plot:d3/b7/p2/arrangement); §6.3 (already scoped to 'another stage or concern'); §13.3; D-15; D-24; O2 (b), (e). _critic-vg-ng V25: across VG builds 19251041 and 19365073 seed 3131 kept its name and POIs but not its geometry — per-concern streams protect names, nothing protects downstream geometry. vg-posts-b §2.23 (105215836): 1.6.1 'a behaviour-shift release: the same seed would not reproduce a pre-1.6.1 map'. | Stage-isolated goldens: each stage's golden is the hash of the new stage code run on the previous release's frozen upstream outputs, so only stages whose code or tables changed can differ; end-to-end goldens re-signed only with a cascade record listing every downstream stage that moved and showing through the isolated goldens that each moved only through its inputs; restate the one-page sentence and D-15 to the true scope (independent concerns and later stages do not reshuffle; a geometry change reshuffles its descendants as a declared shift); rely on LC-1's carry-over, not on stream paths, where edited documents need stability. |
| LC-4 | major | 'Adjust re-solves with a changed parameter, locality guaranteed' and O2 (c) '≥ 95 % of entities that do not depend on it stay byte-identical' after 'one more gate, coast side west' cannot hold: in PLAT the gate count is an S3 destination list and the coast side an S1 input, so every arterial, growth stage, district seed and id downstream depends on them; the 'do not depend' set is empty and the index vacuous. Nine of the twelve basic-panel controls are consumed in S0–S7. A user who adds a gate to an edited town gets a new town inside the wall with every edit passing through anchor matching, and the dry run validates invariants only, so it never says so. | ARCH §7.1, §7.3 (Adjust via the DAG), §7.8 basic panel, §4.2 S3 (gates as destinations), §15.2 O2 (c); IMPROVEMENTS O2 acceptance (c) and its MFCG baseline; profile-mfcg EG2-4 (changing gates re-rolls 'streets, wards, districts, buildings, fields and every name'); IMPROVEMENTS O2 answers: FTG roadLength 60→100 gave 4→3 districts and 17→29 towers. | Record each parameter's consuming stage in the control registry; promise Adjust locality only for parameters consumed at S10 or later or carrying a spatial scope; for earlier ones the action is 'Re-derive from stage k' with LC-1 carry-over and a dry-run edit-fate report (kept, carried, orphaned — counts and list) the user confirms; restate O2 (c) per parameter class: entities outside the stage-k closure byte-identical 100 %, edited-entity carry-over rate reported, target set after M3 measures it. |
| LC-5 | major | The failure ladder (tier 3: 'retry the same entity with the next ATTEMPT sub-stream; ≤ 3 attempts') and the user's 'New random' ('re-derives the scope with attempt + 1') share one path segment. If a block's committed result came from ladder attempt 1, New random reproduces it exactly (the button does nothing); counted from the committed attempt, rerolls consume the ladder, so the third reroll has no tier-3 retry left and any failure drops to straight cuts or a court substitution; a scope whose blocks sit at different attempts has no single 'attempt + 1', and a relative attempt in the event does not replay. | ARCH §5.1 tiers, §6.1 'Attempts append /attempt=n', §7.1 four actions, §7.4 regenerate row (log: scope, mode, attempt), §14 stream(concern, entity?, attempt?). profile-mfcg seed chain: MFCG keeps per-ward rerolls independent of its retry stream by Random.save/restore. | Two segments: /reroll=r (user intent, absolute per entity, stored in provenance and in the event as an explicit per-entity map) and /attempt=n (ladder, restarting at 0 for every reroll with the same cap); test that New random always changes its scope or reports 'no alternative within the ladder'. |
| LC-6 | major | Prosperity is banded 'by quantiles with hysteresis' while continuous rules interpolate along the value, and a field edit 'regenerates the plots and site plans of the blocks whose band changed, nothing else'. Quantiles are town-relative, so a stroke in one quarter (or an epoch's rich suburb) moves thresholds and re-bands blocks far away; hysteresis makes a band depend on the previous band, so a from-scratch replay and the session disagree; a stroke that moves values inside a band changes what a replay computes (interpolated width, coverage) but re-derives nothing, so the user sees no effect and the next load reports a mismatch. Whether a stroke is absolute or relative, which decides what an epoch does with it, is unstated. | ARCH §4.5 (banding, interpolation, 'editable as a brush layer', epochs keep strokes), §4.7 granularity table interpolated, §7.2, §7.3 oracle, §4.11, §2.9 K-3; O18 (g) perturbation ≥ 95 % outside, O18 (i) 'edits replay'. Arithmetic example in §3. | Bands from absolute, calibratable thresholds in the table (or quantile thresholds computed once and stored as recipe data, changed only by an explicit event); hysteresis keyed to the entity's recorded band so replay reproduces it; a field edit re-derives every block whose interpolated inputs moved beyond a declared tolerance, the same tolerance on replay; strokes declared relative (Δ composited over the driver field, clamped once) and their epoch behaviour stated. |
| LC-7 | major | 'L(n+1) = refine_n(L(n)); an edit at level n invalidates only the finer faces under the touched faces' holds from L1 faces down, but L1 is not a per-L0-face refinement: S4 routes between destinations across the frame, S5 grows a town-wide queue, S6 grows districts across faces and S7 traces a whole enceinte. §7.1 makes terrain, water outlines, river control points, ways, districts, walls and gates edit targets, and the terrain brush inherits a 'blocks whose band changed' rule that has no meaning for terrain. A terrain or river edit therefore either re-runs the pipeline from S1 (the town re-rolls; 'the rest of the town is byte-identical' fails) or leaves an inconsistent model (a bridge over land, a road ending at the new bank, footprints in the new channel — the hard 'water ∩ footprints = ∅' invariant aborts the batch and no ladder row covers it). | ARCH §2.2 rule 4, §7.3, §7.1 targets, §7.2 (field rule; drawn constraints before S1, S4, S6, S7), §4.2 S1 (3) (rivers by descent, terrain carved to the course), §4.1 (S4 and S5 one batch per stage), §5.3. References regenerate only below the coarse level: MFCG rerolls wards inside fixed streets (profile-mfcg seed chain, save/restore); FTG regenerates lots with roads kept, and its users still see regenerated areas 'denser than the original' (ftg-posts-c §2.20; 157283634). | Specify a local operator per coarse stage with pinned boundaries: S1 edits treat water as locked unless the edit targets water; S4 re-routes only arterials whose corridors meet the edit region, with endpoints and outside spines pinned; S5 regrows only inside the affected coarse faces with their boundary spines pinned; S6 re-grows only districts touching the region; S7 re-traces only the affected wall run. The dry run shows the effective region and the edit fates (LC-4, LC-8); where no local operator exists the edit is declared 're-derive from Sk' with carry-over, never presented as local; B-EDIT adds terrain and river-control-point sequences. |
| LC-8 | major | Only locked or pinned entities are protected from regeneration; the fate of edits on other entities inside a regenerate scope is unspecified, and IMPROVEMENTS O9's 'locked and edited entities are never mutated' was dropped. Under the anchor rule an edited but unlocked entity either keeps its id because its anchor cell did not move, and its setAttr overrides (name, use, class, heights, roof) are re-applied to what is now a different building, or it is superseded and its edits vanish (orphaned, or silently re-bound per LC-1). Pin hosts, labels, assignments and pinned people inside the scope are in the same position, and so are entities replaced by a stage-2 template. | ARCH §7.2, §7.3 ('discard every unpinned finer entity'), §7.4 setAttr row ('an input override at the stage that would compute it') and regenerate row, §2.1 anchor rule, II.1 rule 4 and SeamReport.superseded, §2.7 Pin.host; IMPROVEMENTS O9 design idea and acceptance (b), (e). FTG: bulk regenerate 'will delete any residents' and 'cannot be undone' (ftg-posts-c §2.20); users refuse to re-roll a district because of 'custom locations I already baked in' (IMPROVEMENTS O9, 120828892); MFCG churches 'used to disappear after rerolling a ward' (IMPROVEMENTS O9). | Restore O9's rule: an edited attribute implicitly pins that attribute and the entity's existence against Regenerate and New random unless the user chooses 'discard edits in scope'; the dry run lists every edited, assigned, pin-hosting, labelled or people-pinned entity in the effective scope with its fate (kept as a fixed input; carried to its anchor-matched successor after a class-compatibility check; discarded by an explicit supersede event) and shows the effective scope (the covering faces, which can exceed the drawn area); overrides never transfer by id alone. |
| LC-9 | major | 'Order of precedence at S10–S11: assignment > lock > …' lets a later or host assignment overwrite an entity the user locked; a dispersed assignment whose one member is superseded is re-solved from its criteria, and the greedy max-min solver then moves the members in districts nobody touched; assignments enter both as recipe data (applied by S10's claims-first step) and as assign events (applied afterwards), so the same assignment gives different towns by path; whether epochs re-solve dispersed assignments is unstated. | ARCH §7.7 (precedence; PlacementSolver), §7.4 assign row ('criteria replay if an id is unmapped'), §2.9 recipe.assignments, §4.2 S0 Blueprint, §4.7 S10 (3), §5.2 F-EDIT, §6.4 (&a=<assignment hash>), §4.11. Brief, ASSIGNMENT HOOK: the assignment 'takes precedence over the generator's own class rules' — over rules, not over the user's locks. | Precedence lock > assignment > user-drawn geometry > rules; a targeted assignment on a locked entity is a dry-run conflict; the dispersed solver excludes locked entities; re-solve only the unmapped members with mapped placements as fixed points; one path (recipe assignments are sugar for assign events at log position 0, and every assign event triggers the same claims-first re-derivation for its scope); epochs keep placed members and add members only when count or criteria change. |
| LC-10 | major | Drawn ways, water, walls, greens and boundaries are 'inserted before the stage that would create the class', while every other event applies in log order to the state at its position. Interactively a drawn way enters a finished town and the area re-derives with carry-over and revision suffixes; on replay (K-3 background verification, undo beyond the 8-snapshot ring, migration) it is hoisted to S4 and the whole town is generated around it with creation-order ids. Any later edit on an entity created by the session's local re-derivation addresses an id the replay mints differently: it is orphaned or silently re-bound, every such document fails verification on every load, and migration loses the edit. | ARCH §7.2, §7.4 drawing row ('inserted as constraints before the stage…'; migrate 'replay inserts the same geometry'), §2.9 K-3 policy, §14 EditEngine.replay(recipe, edits), §6.2, §7.3 oracle. | One replay semantics, an ordered fold: each event applies to the state after its predecessors, and a drawn constraint re-runs its class's stage for the affected scope at its log position — the same code path interactively and on replay (GEO-11 asks this for weld order); hoisting survives only as an explicit 'rebase' that rewrites the recipe and shows a diff like a migration; CI requires replay(recipe, log) = session hash on B-EDIT sequences that mix draw events with later attribute edits. |
| LC-11 | major | Epochs are not events: grow() writes doc.epochs, the EditEvent union has no epoch kind, EditEngine.replay(recipe, edits) takes no epochs, and the recipe carries a separate circumstances timeline. The order of edits relative to epochs is lost (edits to epoch-2 entities replay against epoch 0 and orphan), a multi-epoch document cannot be re-derived for K-3 verification, an epoch cannot be undone, and a migration re-runs the recipe so epoch 0 re-rolls under the new version while the later epochs were derived from states the new version never persisted — the 200-year history does not survive an upgrade. | ARCH §4.11, §2.9 (Document: epochs, circumstances, snapshot optional), §7.1 union, §14 EditEngine, §7.5, §16 M4 (the incremental path arrives after M3's log), D-25. Brief, EVOLUTION: 'epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch sub-stream … every change traces to a recorded event'. | {t:'epoch', epoch, inputs} is an EditEvent in the ordered log (the recipe's timeline only schedules such events); EpochRecord = {log index, inputs, post-epoch hash}; replay folds epochs in order; undo of an epoch restores the pre-epoch snapshot; a multi-epoch document migrates by replaying the whole ordered log with a per-epoch diff, or is pinned to its version (LC-14); M4's exit test replays a document with interleaved edits and two epochs to the session hash. |
| LC-12 | major | An epoch re-solves the town-wide fields ('the fields are re-solved with the previous field as a prior') and then re-derives S8–S13 'on new or changed faces only' while promising that 'nothing that survives is re-rolled because its stream path is unchanged'. The re-solved field changes the context vector of surviving plots everywhere: if their faces count as changed, S10–S11 re-derive them with unchanged streams but new inputs (a re-roll by another name; M4's '0 re-rolled survivors' fails); if not, survivors keep stale context and a later 'Regenerate (keep settings)' on an untouched block re-derives it with the new field, so the faithful action changes a block nobody asked to change. Delta demand plus global siting have the same two outcomes for survivors' uses. | ARCH §4.11, §4.5 (the field moved by epochs), §7.2, §7.3, §4.7 S10b, §16 M4 exit, D-25; brief EVOLUTION (districts densifying or decaying as recorded events; nothing that survives is re-rolled) and PROSPERITY ('the evolution stage moves the field over time'). | Survivors keep their built state across epochs; a field change acts on them only through explicit, rate-limited transformation events chosen by rules (densify, subdivide, amalgamate, decay, rebuild) triggered by band crossings beyond a hysteresis and drawn from …/epoch=e streams; each entity records the inputs of its last derivation (field sample, band, table versions) so 'Regenerate (keep)' reproduces it, and re-deriving with current inputs is the explicit Adjust; siting across epochs places only delta demand on new or transformed plots. |
| LC-13 | major | On a hash mismatch 'the user chooses the snapshot or the replay', and at an upgrade 'the user may keep the old materialised model', but nothing rebases the document: its recipe and log still replay to the other state. Every later load reports the same mismatch; undo beyond the 8-snapshot ring is 'rebuilt by replay' and silently returns the replay's town; the next migration discards the chosen snapshot; a kept old model whose version leaves the replay window can no longer be regenerated faithfully and later edits run the new pipeline on old-version entities under one generatorVersion field; edits made while a METROPOLIS verification is still running are replayed onto another state if the user then picks the replay. | ARCH §2.9 persistence policy, §7.4 regenerate row (k = 8; older snapshots rebuilt by replay), §7.5, §12 memory, J-8, D-21. | A rebase event: choosing the snapshot (or keeping an old model) compacts the document — the chosen state becomes the new base with its hash, the log restarts after it, replay starts from the base snapshot, and the document records that it is not seed-reproducible before that point; undo below the rebase uses the base; a kept old model pins the replay version (LC-14); edits wait until verification finishes or the user chooses. |
| LC-14 | major | Migration re-applies the log 'on the id-mapped model', but the mapping is unspecified; with creation-order ids the new version mints the same strings for different entities, so string equality mis-binds edits silently instead of reporting orphans (O9 (e) fails without a report). An orphaned lock is 'listed … with its last geometry' but not re-imposed, so the locked building is replaced by whatever the new version draws. 'The last N minor versions stay replayable' — the only mechanism behind 'permalinks never silently change' — has no stated shipping mechanism in a browser library without a server, no N, no rule for major versions and no milestone; an upgrade is not an event, so it cannot be undone after commit. | ARCH §7.5, §7.4 lock and assign migrate cells, §2.9, §6.4, D-21, §16 (no milestone); _critic-vg-ng V25 (same seed, 29 → 24 buildings across builds); vg-posts-b §2.34 (VG stores house marks in its permalinks from 1.6.5 [STATED, 117634240]; the numbering is creation order [INFERRED]); FTG 65223067/66499838 (towns destroyed by an id-model change) and 151265004 ('no way to automatically regenerate settlements with these features'). | Specify the mapping: old snapshot entities matched to the new model by kind, anchor, class family and overlap above a threshold, with LC-1 carry-over; unmatched edits are reported orphans, never string-matched; an orphaned lock re-imposes its last geometry as a user-drawn constraint unless the user drops it; the upgrade is an undoable event keeping the pre-upgrade snapshot; define retention: an output version that bumps only with a declared shift, old output versions of the model packages kept as versioned tree-shakable modules for a stated window, documents outside it open as frozen snapshots (view, export, rebase per LC-13); build and test it in M3 (replay goldens under N−1 and N−2). |
| LC-15 | major | The model reads more than the recipe and the permalink carry. §6.2 says model = G(version, seed, params, assignments, edits), but §7.6's effective parameters include userGlobal and documentOverrides, §7.7 adds intent, character and circumstances, and S10b has two entry points. The permalink carries v, s, z, a params delta from a preset, the preset id, an assignment hash (which cannot reproduce assignments), and &doc=<id> (which resolves nowhere: no server, sync deferred); table and style versions are separate axes not in the link, and preset=<id> resolves to a user-edited preset on the author's machine. A shared link therefore reproduces another town without warning, against D-21. | ARCH §2.9, §6.2, §6.4, §7.6, §7.7, §4.7 S10b (entry points), §1.7 ('no server'), deferrals ('a sync service'), D-21. MFCG 102377277: 'No manual changes made to a map are encoded into its URL' and a round trip 'subtly changed the city geometry' (mfcg-posts-b §2.21); MFCG's URL has no version key (profile-mfcg §2); PS legend edits are not in its permalink (watabou-extra-a §2.21). | Define the canonical recipe as every model-affecting input: seed, rung, the full effective parameter delta over the shipped defaults of the pinned table versions (userGlobal and documentOverrides copied into the document at creation and folded in), intent, character, circumstances, entry mode, assignments inline, table-version pins, output version; the permalink is the compressed canonical recipe (or refuses and offers a file); &doc= only when a resolver is configured; the style version in the link for pixel identity; CI tests permalink → recipe → permalink identity and permalink hash = session hash; the app warns when a link cannot carry the document. |
| LC-16 | major | 'A person is pinned once seen or edited (FTG's rule)' turns viewing into a persistent write: the document (and the hash, if pins are model data) depends on what the user looked at, the headless API and the UI diverge, browsing the gazetteer fills the edit log and the undo stack and overflows the 2 KB inline-log permalink. FTG's documented rule locks details on edit, not on view. Pinned people reference households that are re-derived by plot regeneration and by siting's reconcile, so they dangle or attach to households of another size; §7.4 has no people row; people have no time argument, so survivors of an epoch keep their ages for decades. | ARCH §10.3, §4.7 S10b ('pinned once seen'), §2.7 Person and Household, §7.4 (no people row), §14 ContentProvider.people vs derivePerson(seed, id); research/ftg-docs/useSettlements__settings.md (FTG saves 'only a few key details … per person. The rest is generated when the person is selected. When a person is manually edited, those generated details are locked in'), ftg-docs-params §3.10; FTG regenerate 'will delete any residents and may update other people' (ftg-posts-c §2.20); IMPROVEMENTS O9 ('people are reconciled … rather than deleted'). | Pins come only from an explicit user action or an edit (FTG's rule); what a user has seen is per-user view state outside the document; a person key = (household lineage id under LC-1, member ordinal, birth epoch) with an ageing rule per epoch; §7.4 gains a people row (regenerate: households with pinned or edited people are fixed inputs or re-homed by rule with an event; migrate: orphaned people reported); O7 (g) tested under table edits as a declared shift for unpinned people. |
| LC-17 | major | After any scoped regeneration the design 're-run[s] only the label and display stages globally', but S13 is a model stage (names and Label entities, a hard 0-collision invariant, the model hash). A block reroll moves label candidates and collision outcomes across the town and can change names conditioned on the model or resolved for uniqueness outside the scope, so O2 (b) 'rerolling one block changes nothing outside it', O2 (d) and O9 (b) fail for labels and possibly names; name uniqueness is unspecified (resolved in creation order, a new street steals 'Mill Lane' and a street elsewhere is renamed); moveLabel is declared outside the model hash while Label is a model entity. | ARCH §7.3, §4.10, §9 (collision; names conditioned on the model), §2.7 Label, §7.4 setLayer/setStyle/moveLabel row, §5.3; O2 (b), (d); O9 (b); O13 (e) 'edited names persist 100 %'. | Decide the status of label placement together with GEO-29: view data derived per LOD from the model plus pinned placements (outside the model hash and the byte-identity claims), or S13 re-run only inside the regenerated region plus a declared collision halo; names are per-entity draws with deterministic uniqueness that never renames an existing entity (the new entity re-draws); feature-conditioned names re-evaluated only inside the scope; test: a block reroll changes 0 names outside it. |
| LC-18 | major | Stage-2 close-ups have no persistence status. A 'bent-cut' close-up refines inside faces and returns blocks, ways, plots, buildings, greens, pins and labels; the neighbourhood tier is 'generated lazily per district tile'; stage-3 compositions are 'lazily generated, stored only when edited'. If refinements enter the model, the town (and its city-LOD footprints, which the owner wants shown at every zoom) differs before and after a district is opened and between users; if they do not, edits to close-up entities (move a well, rename a close-up lane, lock a close-up house) have no create, persist, regenerate or migrate path, and the 'same kind, new seed per district with locks' workflow has nothing to lock. | ARCH II.1 (rules 2 and 4; NeighbourhoodResult; SeamReport), II.4, II.5, §8.6, §2.6, §7.4 (no close-up row); brief PRODUCT SCOPE: stage 2 designed 'to the depth needed to guarantee the base's model supports it'; stage 3 'those footprint shapes are what shows at every zoom, including the city view'. | State that a close-up is a pure function of the district's committed base state, its sub-seed, strategy and params (deterministic whether computed eagerly or lazily), held as a derived refinement level outside the base hash until its first edit, after which its edits are events on close-up ids anchored like base entities; a base re-derivation of the district re-derives its close-up with carry-over and reports orphans; city-LOD footprints read the same source at every zoom, so a close-up that changes footprints is a model change with its own event. |
| LC-19 | major | The build plan ships 'permalink … goldens v0' at M1, adds at M2 the prosperity field, the full granularity law, siting, compounds, greenery and the suburb regime (each changes every M1 town for the same seed), and brings the declared-shift protocol and per-stage hashes only at M4; no milestone builds the N-version replay. From M1 to M4 every same-seed change rides without a shift record, the owner's side-by-side seeds (D-5) change between milestones, and M1 permalinks break by design. | ARCH §16 (M1, M2, M4 rows), §13.3, D-5, D-21, D-24 (tooling priced 'trivial'); §13.3 quoting owner non-negotiable 10 ('a same-seed output change is never let ride silently'). | Move the shift record, the output-version stamp and per-stage golden tooling into M1; label pre-M4 permalinks as preview links showing their output version; every milestone's exit lists its declared shifts; add version retention to M3 with an exit test (LC-14). |
| LC-20 | major | Decoration draws from style streams 'keyed by entity id and LOD band at render time and is never stored', so tree, scatter and roof-detail positions differ between district and neighbourhood LOD and between exports at different LODs (a VTT scene vs a print), contrary to 'geometry never changes with zoom'; and an individual tree, stall or roof detail — a generated element — has no edit event, although every generated element must be editable with edits that persist and survive regeneration; any edit to a greenery face re-rolls every tree on it. | ARCH §6.1, §2.7 Greenery.treeStream, §4.9 (trees at render), §8.1, §13.4 (B-ZOOM no pops), §7.1 ('every generated element is a target', owner amendment 5). FTG forest fills are render-time and their determinism untested (_critic-ftg §2 and §6 item 4); IMPROVEMENTS O2 answers: MFCG tree crowns and gable counts differ between two renders of one city. | One decoration stream per entity; LOD subsets as prefixes of a progressive ordered sample so each coarser band is a subset of the finer one; an instance-override event {t:'instance', entity, ordinal or point, op: add, move, remove, restyle} replayed as geometry after regeneration (ordinals re-matched by position); B-ZOOM checks instance positions identical across the bands where they exist. |
| LC-21 | minor | 'A rule change invalidates exactly the entities whose Provenance.rules cite that row' misses entities that consulted the table without citing the changed row: a weighted draw depends on every weight, an interpolated rule on both bracketing rows, a band lookup on the thresholds, and an inserted row on everything it would now match. Those entities stay stale, the oracle fails, and the implied fallback for a table edit (no spatial scope) is an unstated whole-town re-derivation. | ARCH §7.4 editTable row, §6.1 (weighted, deck), §4.7 interpolation, §7.3 (oracle; DAG trusted only where proven), §2.8 Provenance.rules. | Provenance cites (table id, hash of the consulted slice): the whole weight vector for weighted draws, the bracketing pair for interpolation, the threshold set for bands; invalidate on slice-hash change; B-EDIT includes weight edits and row insertions; state the fallback. |
| LC-22 | minor | Table and preset overrides are JSON Patch documents, whose pointers address array rows by position; when a shipped table version inserts or reorders rows, an override silently applies to a different row (not 'reported and kept orphaned'). FTG documents the same class: an edited person's hair stored as option index '1' turns red when the option list changes and blank when the option is removed. | ARCH §7.1 editTable/editPreset (patch: JsonPatch), §6.4 ('user overrides carry their base version'), §7.4 editTable migrate cell; research/ftg-docs/useSettlements__settings.md (index-stored options). | Address rows by stable row keys (keyed maps or a custom patch op) and store the base row's hash with each override; applying to a changed or missing row reports an orphan. |
| LC-23 | minor | Derived geometry is 'cached by entity id', lazy stage outputs are 'cached by id' and tiles are re-rasterised 'only when a district's marks change'; the anchor rule keeps ids when content changes (heights or roof setAttr, a regenerated footprint whose centroid stays in its 1 m cell, a table edit), so stale roofs, spines and scatter are served, and marks shared across districts (a boundary street, a label) change without the district's own marks changing. | ARCH §8.5, §4.1 bullet 1, §2.1 anchor rule. | Cache key = (id, content revision hash of the entity's inputs, LOD band, style version); invalidation from the closure the locality mechanism already computes. |
| LC-24 | minor | The document stores several facts twice without a declared source of truth — locks as a set and as events, preferences as prefs and as editTable/editPreset events, assignments in the recipe and as events, epochs outside the log, and a report with per-stage millisecond timings — so after a migration, an undo or a background verification the copies can disagree and save → load → save byte identity (O9 a) depends on which copy is written. | ARCH §2.9 Document, §5.4 (ms per stage), §7.4 lock row ('doc.locks'), §7.6. | Declare locks, prefs, epochs, report and stats as derived caches rebuilt from the log and excluded from the canonical form and the hash, or make them authoritative and drop the duplicate events; timings live outside the canonical document. |
| LC-25 | minor | Provenance stores generatorVersion and tableVersions on every entity and the model hash covers 'the canonical serialisation', so a release that changes no output still changes every entity and every hash; every golden moves each release and LC-3's isolation test cannot pass. | ARCH §2.8 Provenance, §6.2, §5.3 ('the model hash recomputed equals the recorded one'), §13.3. | Hash model content only (geometry, attributes, address ids, lineage keys) and keep version stamps and deps in a separately hashed provenance block. |
| LC-26 | minor | Lifecycle.state is a single value (generated, edited, pinned, assigned, …), so a pin followed by an assign leaves the entity 'assigned' and no longer 'pinned' to any code reading the state, and an edited-then-assigned id becomes recyclable under §6.3's 'locked or edited' guard (LC-1). | ARCH §2.8 LifecycleState, §6.3, §7.2. | Orthogonal flags (locked, pinned, edited, assigned) plus an existence state (generated, built, altered, converted, demolished); the history stays the event list. |
| LC-27 | minor | Two inverses are not inverses. A brush undo is an 'inverse stroke', which is inexact once values clamp (+0.3 on 0.9 clamps to 1.0; −0.3 gives 0.7). A warp persists 'both the per-vertex displacement and the brush stroke', so after a district-level regenerate or a migration mapped vertices get the recorded displacement and new ones 'sample the stroke field' — but Equalize, Bloat, Pinch and Rotate act on cells, not as displacement fields, so the replayed warp differs from the session and mixes two semantics across one region. | ARCH §7.4 setField and moveVertex/warp rows, §7.1 warp event; _critic.md C4/C5 (Equalize = a cell's angles, Bloat = larger cells). | Strokes kept as a list composited once (clamp at the end), undo removes the stroke; warp replays as the operation (kernel, centre, radius, strength) on the current geometry at its log position (LC-10), per-vertex displacements kept only as a verification record. |
| LC-28 | minor | 'Enter = seed + 1' does not say what happens to parameters, intent, locks, edits and assignments (MFCG's Enter drops explicit parameters); the document has no identity, so a clone carries the same ids and a host holding two towns cannot tell their plot:d3/b7/p2 apart; opening a document saved by a newer version in an older embedded library is unspecified (migrations run forward only); §6.1's reference note is imprecise — MFCG's successor seed is the deterministic stream state, what is irreproducible is its size and flags. | ARCH §6.1, §2.9, §7.5, §11 (embedding API, bridge); profile-mfcg Explicit-gates addendum ('the value persists through Blueprint.updateURL but is dropped by Enter'; 47063541 'pressing Enter … forgets the number of roads'; seed chain k = 585 in both passes; size and flags from a non-seeded input). | Enter = a new document with seed + 1 and the same recipe without edits, locks and assignments (with a warning when the current document has edits); a document uuid minted at creation, kept on save, re-minted on clone and prefixed to ids at the API boundary; a newer schema opens read-only with a message; correct §6.1's note. |
| LC-29 | minor | Ids and stream paths carry no layer segment although each layer has its own plat and sky islands carry districts; a sky district minted district:d3 shares every stream path with ground district:d3 and draws identical numbers (mirrored cut choices); the distinct-key CI test runs on B-CITY, which has no sky layer. | ARCH §2.1 (layers; ids), §6.1 (paths; distinct-key test), §2.7 SkyIsland, II.1 sky call. | Add a layer (and island) segment to address ids and lineage keys; include a sky-island fixture in the distinct-key test. |
| LC-30 | minor | Three pieces of session state sit outside the recipe: choosing a proxy thumbnail 'continues that seed's pipeline from S5', so if any proxy is computed with a budget-driven simplification (F-BUDGET-TIME, GEO-2) the continued town differs from its permalink replay; 'Surprise me' draws an intent from an unstated source; and S10b's layout-first entry point is not a recipe field. | ARCH §7.8 proxy thumbnails, §7.1 ('Surprise me'), §4.7 S10b entry points, §5.2 F-BUDGET-TIME. | Proxies are bit-identical S0–S4 runs, checked by hash when picked; surprise intents come from a seeded intent stream and are written into the recipe; the entry mode is a recipe field. |
| LC-31 | minor | Host inputs are not required to reach the document: bridge commands (UPDATE_ENTITY, ASSIGN, REGENERATE) are not stated to be logged as EditEvents, host rosters supplied through ContentProvider are not copied into the document, and a host provider may use Math.random or the network while the lint covers only in-repo model packages; a host-edited document then cannot replay standalone. The 'host inputs' deferral covers what hosts may supply, not the persistence of the bridge M3 builds. | ARCH §11 embedding API and bridge, §14 ContentProvider extension point, §6.5 (3) lint scope, deferrals ('host inputs'). | Every bridge command maps one-to-one to a logged EditEvent; host tables are copied into the document with provenance 'host'; a registered provider is checked by a double-run determinism test, or its outputs are recorded in the document. |

**Counts:** 31 findings — 2 blocker, 18 major, 11 minor.

## §3 Findings in detail (failure scenario → evidence → required change)

Scenario quantities (edit counts, band values) are illustrative; each scenario is built only from rules quoted from
ARCH, so the contradiction is CONFIRMED in the text while its frequency in a built system is PLAUSIBLE (§6).

### LC-1 · blocker · One id string is both the address and the stream key; it breaks under re-parenting, recycles dead ids, and encodes JOIN membership

**The rules that collide.** §2.1: "Every entity has a stable hierarchical id `<kind>:<parent path>/<n>` (e.g.
`plot:d3/b7/p2` …) minted from the parent's id and a per-parent stage counter"; "a regenerated entity keeps its id when
its anchor is unchanged, otherwise it is minted afresh with a `supersedes` link"; "A JOINed plot's id is the lowest
member id with `+` (`plot:d3/b7/p2+p3+p4`)". §6.3: ids are minted "in the deterministic creation order of the parent's
stage run"; "a regenerated scope mints under a revision suffix only on collision with a locked or edited id". §6.1: the
stream path is `"<stage>/<entity id>/<concern>…"`, e.g. `S11/siteplan/plot:d3/b7/p2/arrangement`. §7.2: "A locked or
pinned entity (and every finer face under it) is excluded from regeneration and becomes a fixed input"; drawn district
boundaries enter "before S6". §4.11 lists `outskirtToDistrict(faces)` and "S6 (districts extend …)"; §4.5 merges faces
below the district floor "into the neighbour".

**Failure scenario A (re-parenting).** The user renames the inn `bldg:d3/b7/p2/f1` "The Golden Goose" (setAttr) and locks
its plot `plot:d3/b7/p2`, then draws a district boundary that moves block b7 into district d4. S6 re-types; S8 re-runs
on the touched coarse faces. Block b7's anchor (its centroid cell) has not moved, so by §2.1 it "keeps its id" — the
string `block:d3/b7`, now under d4. District d3's re-run S8 then mints its fresh blocks from its per-parent counter;
the fresh block at creation position 7 is again `block:d3/b7` (and a scoped re-run whose counter restarts at 0 collides
with d3's untouched blocks as well — §2.1's suffix rule covers two *regenerated* entities, §6.3's covers *locked or
edited* ones, and neither covers a fresh id meeting an untouched sibling). Two live entities share one id, the hard
invariant "id uniqueness and reference integrity" (§5.3) aborts the batch, and the boundary edit cannot be applied.
If instead the implementer re-mints the moved block and its descendants under d4 (`block:d4/b12`, `plot:d4/b12/p0`, …), the lock on `plot:d3/b7/p2` resolves to nothing — the plot is
no longer protected at the next regenerate — and the rename is orphaned: the inn loses its name although nothing moved.
The same arises for a district merge or split (§7.4 "add or delete a district → split / merge + regenerate"),
`outskirtToDistrict`, an epoch's district extension absorbing a sub-floor district, and a locked plot that survives a
district-level regenerate inside a newly cut block.

**Failure scenario B (recycling).** An assignment "the Guildhall" is persisted on `bldg:d3/b7/p4/f1` (§7.4: "the
placement solver's result is persisted with the event"). The user rerolls block b7. The Guildhall building's anchor
cell changes, so it is superseded; another new building is created fourth in b7's run and is "minted afresh" as
`bldg:d3/b7/p4/f1`. The old id was assigned, not locked or edited (and `Lifecycle.state` holds one value, LC-26), so no
revision suffix is used. The assignment, and any Pin hosted by, Label targeting, Household housed in or Institution
listing the old id, now resolves to an unrelated building — silently, with no orphan report.

**Failure scenario C (JOIN ids).** A manor stands on `plot:d3/b7/p2+p3+p4` with an assignment. A prosperity brush
lowers the quarter slightly; S10 (7) re-joins to the band's upper end and produces `p2+p3`; the manor plot's id changes
and the assignment is superseded — on exactly the plots (manors, inns, institutions) the ASSIGNMENT HOOK is for.

**Why it is a blocker.** The owner's ASSIGNMENT HOOK requires "stable, addressable ids for districts / neighbourhoods /
lots / buildings that survive regeneration and edits", and the one-page promises edits "on stable ids" that "survive
regeneration and version upgrades". With the parent path in the id and a counter that restarts per run, no rule set
can both keep ids through re-parenting and keep them unique; and because the same string keys the random streams, a
fix that keeps an id stable changes (or cannot change) the entity's draws. The repair changes the id model — which
D-12, D-13 and D-15 price "high after M1". The references show why this must be settled first: FTG's 2022 change of
road persistence from coordinates to intersection ids "requires destroying all existing towns" and "old settlements
[were] wiped" (ftg-posts-a rows 1–2, 65223067 / 66499838); VG stores house marks in its permalinks from 1.6.5 (117634240,
vg-posts-b §2.34 [STATED]) and numbers them, by that file's inference, in creation order — so a build that turns seed
3131's 29 buildings into 24 (_critic-vg-ng V25) points the stored marks at other houses (PLAUSIBLE).
IMPROVEMENTS O9's design idea, "locked and edited entities are never mutated", is also not carried into ARCH (LC-8).

**Required change.**
1. *Address id* — opaque and document-scoped (e.g. `plot#4Q7`), minted once from a per-kind high-water counter stored in
   the document, never reused; a demolished or superseded entity leaves a tombstone with `supersededBy`; the parent is a
   field, never parsed from the string.
2. *Carry-over* — every re-derivation (regenerate, Adjust, template replacement, migration, epoch) matches new entities
   to old ones by anchor (with GEO-34's hysteresis and a class-family check) and hands over the old address id, also
   when the parent changed; unmatched old ids become tombstones.
3. *Lineage key* — the stream key is parent lineage key + local creation index (+ `/reroll`, `/attempt`, `/epoch`,
   LC-5), recorded in Provenance; a carried-over entity keeps its lineage key, so its draws do not change ("nothing that
   survives is re-rolled").
4. JOINed plots take their id by the anchor rule like any plot; `members` is history only.
5. One collision rule replacing §2.1's and §6.3's two: a fresh id never equals a live or tombstoned id.
6. Exports (GeoJSON, SVG, VTT, JSON) carry address ids and a supersedes table.
7. B-EDIT fixtures: drawBoundary, district merge and split, `outskirtToDistrict`, regenerate around a lock, and the
   recycling case of scenario B — 0 duplicate ids, 0 silent re-binds (every reference resolves to its carried-over
   successor or is reported).

**Overlaps.** GEO-5 (raw arena indices persisted in entities and events) and GEO-34 (anchor quantisation flips) are the
geometric handle layer beneath this; this finding is the entity-id layer. LC-26 (single-valued lifecycle state) widens
scenario B.

### LC-2 · blocker · Lazy per-district derivation of S10–S14 makes the model depend on the order districts are viewed

**The rules that collide.** §4.1: "S10–S14 are lazy per district after the first paint (G-R8): the display list at city
LOD is emitted as soon as S9 commits; site plans and labels of a district are derived when first needed and cached by
id." §12: "METROPOLIS relies on lazy per-district derivation of S10–S13 (only visible districts first)." But S10 is
"Plots + Siting", and S10b is town-wide: "The roster's demand is placed onto plots by a rule-based solver … plots are
filled in descending score with capacity accounting … a bounded plan–fit–reconcile loop (≤ 3 rounds) adjusts the
manifest where a class finds no plot (one more JOIN in the affinity district …)"; F-SITING's ladder is "JOIN plots in
the affinity district → next-best district → take a whole block". S10 step (3) — "institutions and assignments
`claimSubFace` … *before* ordinary plots are cut" — needs siting's decision for a district before that district's plots
exist. F-CUT's last rung substitutes "joined plot for the roster's largest unplaced class" — live, town-wide roster
state. §4.5's prosperity drivers include "negative kernels around tanneries, slaughterhouses … attractors at the
roster's institutions", which have positions only after siting. §9's collision index is town-wide per LOD.

**Failure scenario.** A CITY is opened in the app and the user pans east first. District d5 is derived first; its S10b
share places the town's one guildhall on d5's best plot (capacity accounting sees d5's plots only). The market
district d2, whose frontage scores highest town-wide, is derived later and finds the guildhall placed. The same seed in
the headless CLI — which has no viewport and must derive every district for goldens and exports, in whatever fixed
order it uses — puts the guildhall in d2 whenever it reaches d2 before d5. The golden suite (headless) never
sees the UI's town; O11 (f) "headless hash = UI hash" and O2 (a) fail; a permalink recipient who pans west first gets a
third variant. The same order dependence decides which plots S10b JOINs, which block F-CUT substitutes and which
labels win collisions. Making S10b eager restores determinism but removes the laziness the METROPOLIS budget relies on.

**Why it is a blocker.** "The same seed always gives the same town on every machine" (one-page) is a cross-cutting
guarantee; as written the design cannot meet it and the METROPOLIS budget at once, and the repair changes the stage
decomposition. The references do not have this hazard: MFCG and NG build the whole model before drawing, and FTG
generates in one server pass (≈ 3–7 s, `_critic-ftg.md` F20 and the roadlength100 README).

**Required change.** (1) A written laziness contract: a stage may be lazy only if its output for district D is a pure
function of eager upstream state and D's own sub-stream, reading no other district's lazy output and writing nothing
outside D. (2) Split S10b: an eager, town-level *allocation* after S9 — demand per class assigned to districts and
blocks by capacity and affinity, including claims and JOIN decisions at block granularity (counts, not geometry) —
and a lazy per-district *placement* that honours it. (3) Institution-dependent prosperity kernels read the allocation
(district and block positions), or a declared eager second field pass runs after it; plots never see a field that a
later district's derivation changes. (4) F-CUT's substitution reads the allocation, not live roster state. (5) S13 is
either eager per LOD or view data outside the model hash (LC-17, GEO-29). (6) The model hash is defined over the fully
derived model; a CI test derives districts in random permutations and requires identical hashes.

**Overlaps.** GEO-2 (wall-clock rungs) and GEO-29 (host text engine) are two other leaks of the same guarantee; the
scale lens should price the eager allocation at METROPOLIS.

### LC-3 · major · Stream paths embed creation-order ids, so upstream changes reshuffle every descendant; the golden protocol's byte-identity claim is false

**Failure scenario.** Release 1.3 fixes a heading-draw bug in S5 (one extra draw per proposal). S5's per-stage golden
moves and gets a shift record. S6–S14's goldens move too, for all 144 golden runs (12 seeds × 3 rungs × 4 water
settings), because the new S5 network changes district seeds and numbering (S6), block ids (S8), plot ids (S10) — and
therefore the path of every downstream draw (`S11/siteplan/plot:d3/b7/p2/arrangement`). The release engineer either
re-signs S6–S14 "because of the S5 shift" — and an unrelated S11 coverage-table error in the same release rides
through — or CI stays red. The owner's non-negotiable 10, which §13.3 quotes ("a same-seed output change is never let
ride silently"), is undermined by the protocol meant to enforce it.

**Evidence.** One-page: "adding a feature later does not reshuffle existing maps". D-15: "feature growth without
reshuffling". §13.3 / D-24: "only that stage's goldens are re-signed; stages untouched by a release stay byte-identical
(O2 e), which the stream design makes a property rather than a hope". §6.3 already narrows O2 (b) to "another stage or
concern" and calls a change inside a geometry stage "a declared golden shift" — but the one-page, D-15 and O2 (e) keep
the broad promise, and the descendants of that stage are not "untouched". The references show exactly this pattern:
across VG builds 19251041 → 19365073, seed 3131 kept its name and POIs but not its geometry — "Name and POI streams are
seed-stable across builds, geometry is not" (`_critic-vg-ng.md` V25); VG 1.6.1 was "a behaviour-shift release: the same
seed would not reproduce a pre-1.6.1 map" (vg-posts-b §2.23, 105215836).

**Required change.** (1) *Stage-isolated goldens*: each stage's golden is the hash of the new stage code run on the
previous release's frozen upstream outputs (stored in the golden store), so only stages whose code or tables changed
can differ. (2) End-to-end goldens are re-signed only with a *cascade record* listing every downstream stage that moved
and pointing at the isolated goldens that show each moved only through its inputs. (3) Restate the one-page sentence,
D-15 and O2 (e) to the true scope. (4) Where edited documents need stability across such changes, rely on LC-1's
anchor carry-over and LC-14's migration, not on stream paths.

### LC-4 · major · "Adjust … locality guaranteed" cannot hold for the basic panel's parameters, and O2 (c) is vacuous as defined

**Failure scenario.** A user edits 40 buildings (names and uses) and then raises the gate count from 4 to 5 with Adjust,
trusting "locality guaranteed" enough not to lock anything. Gates are S3 destinations (§4.2), so S4 routes a new
arterial across two districts, S5 regrows the stage, S6 re-types, S7 re-traces, and every district is re-cut. Every edit
whose entity lies downstream of the new arterial passes through anchor matching: some carry over, the rest are orphaned
(or silently re-bound under LC-1). The dry run (§7.1) checks invariants, finds no conflict, and says nothing about the
edits.

**Evidence.** §7.1: "**Adjust** re-solves with a changed parameter, locality guaranteed". O2 (c) (IMPROVEMENTS O2 and ARCH
§15.2): after "one more gate, coast side west", "the share of entities that do not depend on it and stay byte-identical
≥ 95 %", with the MFCG baseline "a `gates` change re-rolls everything down to the name". In PLAT, gates enter at S3 and
the coast side at S1, so every arterial, stage, district seed and id below depends on them, and through §6.1's paths
every draw does; "entities that do not depend on it" is an empty set and the index is vacuous. §7.8's basic panel (seed,
size rung, water setting and side, walls, castle, gates, planned ↔ organic, wealth level, greenery, style preset,
labels, "Surprise me") has nine of its twelve controls consumed in S0–S7 (all but greenery, style preset and labels). MFCG does exactly what O2 (c) calls the baseline:
gates 0 / 1 / 4 / 9 re-roll "streets, wards, districts, buildings, fields and every name" (profile-mfcg EG2-4); FTG's
roadLength 60 → 100 gave 4 → 3 districts and 17 → 29 towers (IMPROVEMENTS O2 answers).

**Required change.** Record each parameter's consuming stage in the control registry. Promise Adjust locality only for
parameters consumed at S10 or later or carrying a spatial scope (a district's density, a block's granularity). For
earlier parameters, the action is *Re-derive from stage k* with LC-1 carry-over and a dry-run edit-fate report (kept /
carried / orphaned, with counts and a list) that the user confirms. Restate O2 (c) per parameter class: entities
outside the stage-k closure byte-identical 100 %, and the edited-entity carry-over rate reported, with its target set
once M3 measures it.

### LC-5 · major · The failure ladder and "New random" share the `attempt` segment

**Failure scenario 1.** Block b7's plot subdivision failed at attempt 0 (a sliver, F-PLOT) and committed at attempt 1
(tier 3). The user presses New random on b7: "re-derives the scope with `attempt + 1`" → attempt 1 → the identical
committed result. The button does nothing.
**Failure scenario 2.** If "+ 1" counts from the committed attempt, three New random presses on a dense-core block run at
attempts 1, 2, 3; the third has no tier-3 retry left under "≤ 3 attempts", so any sliver drops straight to tier 4
(straight cut on the mean normal) or tier 5 (court substitution) — the third reroll produces a visibly degraded block.
**Failure scenario 3.** A New random over an area whose blocks sit at attempts 0, 1 and 2 has no single "attempt + 1";
an event storing a relative attempt (`attempt?: number` is optional) does not replay after an upstream change.

**Evidence.** §5.1 tier 3 "retry the same entity with the next ATTEMPT sub-stream; ≤ 3 attempts"; §6.1 "**Attempts**
append `/attempt=n`"; §7.1 New random; §7.4 regenerate row ("log (scope, mode, attempt)"); §14
`stream(concern, entity?, attempt?)`. MFCG keeps its per-ward reroll independent of its retries by running
sub-generators between `Random.save` and `restore` (profile-mfcg seed-chain section: "that isolation is what makes a
per-ward reroll possible without moving anything else").

**Required change.** Two path segments: `/reroll=r` (user intent; an absolute number per entity, stored in its
provenance and written into the event as an explicit per-entity map) and `/attempt=n` (the ladder, restarting at 0 for
each reroll with the same cap). Test: New random always changes its scope or reports "no alternative within the
ladder", and the ladder cap is identical for every reroll.

### LC-6 · major · Quantile bands with hysteresis, and band-only re-derivation, make prosperity results path-dependent and non-local

**Failure scenario (illustrative numbers).** The prosperous band is [0.45, 0.65) of the value. A user brushes +0.05 over
a quarter at 0.52, giving 0.57. No block changes band, so by §7.2 nothing is re-derived and the user sees no effect.
Save; reopen; the background K-3 verification replays: S10 interpolates the granularity row at 0.57 instead of 0.52
(frontage 9–14 m band read at a different point), so plot widths differ → "mismatch" dialog (LC-13). Second case: a
stroke that raises one quarter shifts the town's quantile thresholds, so blocks on the far side of the town cross a band
and are re-derived — O18 (g) "perturbation ≥ 95 % outside" fails. Third case: with hysteresis, a block's band depends on
its previous band, so a replay (which never passes through the intermediate states the session saw) assigns different
bands than the session did.

**Evidence.** §4.5: "**banded** (poor / modest / prosperous / rich, by quantiles with hysteresis) **only where a table
needs a class**, while continuous rules (coverage, plot size, greenery share, building scale) **interpolate linearly
between band rows along the value**"; "**editable** as a brush layer whose strokes persist as edits (§7.2); **moved by the
evolution stage** (an epoch re-evaluates the drivers with the new circumstances and keeps the strokes)". §7.2: "a field
edit regenerates the plots and site plans of the blocks whose band changed, nothing else". §4.7: the granularity table is
"interpolated along the prosperity value". Whether a stroke sets a value or adds a delta is not stated, so what "keeps the
strokes" means after an epoch moves the drivers is undefined.

**Required change.** (1) Bands from absolute, calibratable thresholds held in the table — or quantile thresholds computed
once at generation and stored as recipe data, changed only by an explicit event. (2) If hysteresis stays, key it to the
entity's recorded band so a replay reproduces it. (3) A field edit re-derives every block whose interpolated inputs
moved beyond a declared tolerance, with the same tolerance on replay (or continuous rules quantised to that tolerance).
(4) Declare strokes relative (a Δ composited over the driver field and clamped once) and state their behaviour under
epochs (LC-12).

### LC-7 · major · Coarse-level edits have no local re-derivation operator

**Failure scenario.** The user raises a hill 4 m with the terrain brush across the river reach beside the market. S1's
rivers are traced "by steepest descent" with "the terrain carved to the course", so the descent now takes the river
60 m west. §7.3's tree scoping re-derives the finer faces under the touched L0 faces; but the arterials and their bridge
belong to S4, which "routes … between destinations" across the frame in one batch and is not re-run. The bridge now
spans dry land, the road meets the new channel with no crossing, F-ROUTE never fires (S4 did not run), and footprints
now stand in the new channel, so the hard invariant "water ∩ footprints = ∅" (§5.3) — for which no §5.2 ladder row
exists — aborts the batch. The alternative reading
(re-run S1 onward) re-rolls the whole town, contradicting "the rest of the town is byte-identical" (§7 plain words).

**Evidence.** §2.2 rule 4: "**Refinement is a pure function**: `L(n+1) = refine_n(L(n), params, subseed)`; an edit at level n
invalidates only the finer faces under the touched faces". That is true from L1 faces down (S8 per district, S10 per
block, S11 per plot), but L1 is not a per-L0-face refinement: S4 routes between destinations across the frame, S5 grows
a town-wide proposal queue per stage (§4.1: "S4 and each S5 stage commit one batch"), S6 grows districts across faces,
S7 traces an enceinte around a stage. §7.1 makes "terrain brush and primitives, water outlines and river control
points, ways, districts, plots, buildings, walls, gates" edit targets; `setField` includes `terrain`, and §7.2's rule for
field edits ("blocks whose band changed") has no meaning for terrain. The references regenerate only below the coarse
level: MFCG rerolls a ward inside fixed streets (profile-mfcg seed chain: sub-generators between `save`/`restore`);
FTG's regenerate-area tool rebuilds lots with roads kept, and even so its users find regenerated areas "denser than the
original" (ftg-posts-c §2.20; 157283634).

**Required change.** A local operator per coarse stage, each with pinned boundaries: S1 edits treat water as locked unless
the edit targets water (the brush clamps against the bed, or re-carves it only inside the stroke); S4 re-routes only
arterials whose corridors intersect the edit region, with endpoints and outside spines pinned; S5 regrows only inside
the affected coarse faces with their boundary spines pinned; S6 re-grows only districts touching the region; S7
re-traces only the affected wall run. The dry run shows the effective region and the edit fates (LC-4, LC-8). Where no
local operator exists, the edit is declared "re-derive from Sk" with LC-1 carry-over and never presented as local.
B-EDIT adds terrain-brush and river-control-point sequences.

**Overlaps.** GEO-27 (incremental S5 crossing built plots) and GEO-11 (insertion order of drawn constraints).

### LC-8 · major · The fate of edits inside a regenerate scope is undefined; overrides follow ids to other entities or vanish

**Failure scenario.** The user renames a house "Mother Agnes's Bakery" and sets its use to bakery (two setAttr events),
without locking it, then presses New random on its block. §7.3 "discard[s] every unpinned finer entity" and re-derives
the block with `attempt + 1`. The new building whose footprint centroid falls in the old 1 m anchor cell is a narrow
row house, so by §2.1 it "keeps its id"; §7.4 re-applies the setAttr overrides "as an input override at the stage that
would compute it", so the row house becomes the bakery (a use its narrow plot may not fit, which F-SITEPLAN then
downgrades) while the building the user named is gone. Had the anchor moved, the edits would instead be orphaned, or silently re-bound to a recycled id
(LC-1 B). The dry run said nothing either way. Stage-2 template replacement has the same gap: "a replaced district
re-derives its entities under the anchor rule and records `supersedes`" (II.1 rule 4), with no rule for the edits on the
replaced plots.

**Evidence.** §7.2 protects only "A locked or pinned entity"; §7.3 and §7.4's regenerate row ("the scope's unlocked
entities re-derive") are silent about edited, assigned, pin-hosting (`Pin.host`, §2.7) or labelled entities and about
households with pinned people. IMPROVEMENTS O9's design idea — "locked **and edited** entities are never mutated; people
are reconciled (households move, jobs re-match) rather than deleted" — did not reach ARCH, and O9's acceptance (b)
("entities touched outside the declared scope = 0") and (e) ("keeps 100 % of edited entities") depend on it. The
references show the cost: FTG's bulk regenerate "will delete any residents" and "cannot be undone" (ftg-posts-c §2.20);
FTG users refuse to re-roll a district because of "custom locations I already baked in" and MFCG's local churches "used
to disappear after rerolling a ward" (both via IMPROVEMENTS O9 answers).

**Required change.** Restore O9's rule: an edited attribute implicitly pins that attribute and the entity's existence
against Regenerate and New random, unless the user chooses "discard edits in scope". The dry run lists every edited,
assigned, pin-hosting, labelled or people-pinned entity in the *effective* scope — the covering faces of §7.3, which can
be larger than the drawn area, shown to the user — with its fate: kept as a fixed input; carried to its anchor-matched
successor after a class-family check; or discarded by an explicit `supersede` event. Overrides never transfer by id
alone.

### LC-9 · major · Assignments override locks, dispersed re-solves move untouched placements, and assignments enter by two paths

**Failure scenario 1 (precedence).** The user locks the house of a player character. A host later sends
`ASSIGN {dispersed: 5 temples, criteria …}` through the bridge. §7.7's precedence "assignment > lock > user-drawn geometry
> rule tables > defaults" lets the solver place a temple on the locked plot; F-EDIT raises a conflict only when "an
assignment cannot be honoured within its drift bounds", which it can.
**Failure scenario 2 (re-solve).** A dispersed assignment "3 shrines, min spacing 400 m" was solved to d2, d5 and d7. The
user rerolls d5; the d5 shrine's plot is superseded. §7.4: "criteria replay if an id is unmapped" — the greedy
max-min-distance solver re-places all three, so the shrines in d2 and d7, which nobody touched, move.
**Failure scenario 3 (two paths).** The same "Guildhall" assignment given in the recipe (S0 Blueprint "assignments";
`recipe.assignments`) acts in S10's claims-first step, before ordinary plots are cut; given as an `assign` event it acts
after generation on existing plots. The towns differ, and the permalink carries only `&a=<assignment hash>` (LC-15).
**Failure scenario 4 (epochs).** After an epoch adds districts matching the criteria, whether the solver re-runs (moving
survivors) or never considers the new districts is unstated.

**Evidence.** ARCH §7.7 (precedence; `PlacementSolver`), §7.4 assign row, §2.9, §4.2 S0, §4.7 S10 (3), §5.2 F-EDIT, §6.4,
§4.11. The brief's ASSIGNMENT HOOK asks for "an assignment / constraint input that takes precedence over the generator's
own class rules" — precedence over rules, not over the user's locks.

**Required change.** Precedence lock > assignment > user-drawn geometry > rules; a targeted assignment on a locked entity
is a dry-run conflict returned as an action; the dispersed solver excludes locked entities from its candidates; a
re-solve places only the unmapped members, with mapped placements as fixed points; one path — recipe assignments are
sugar for `assign` events at log position 0, and every `assign` event re-derives its scope through the same claims-first
step; epochs keep placed members and add members only when the count or the criteria change.

### LC-10 · major · Drawn constraints are hoisted before their stage on replay but applied at their log position interactively

**Failure scenario.** Log: [`drawWay` (a bypass road); `setAttr(bldg:d4/b9/p3@r2/f1, name = "Toll House")`]. In the session,
the bypass is inserted into the finished town; the affected area re-derives under the anchor rule, and the toll house
receives the revision-suffixed id the setAttr names. On reload, the K-3 background verification replays: by §7.2 the
drawn way is inserted "before S4's routing", so the whole town is generated around it from scratch and ids are minted
in creation order — the building at the toll site is `bldg:d4/b11/p2/f1`. The setAttr's target does not exist: the
name is orphaned (or, under LC-1 B, lands on whatever now carries the old string), the verification reports a mismatch
on every load, and a migration — for which replay is the only path — loses the edit.

**Evidence.** §7.2: user-drawn features are "**inserted before the stage that would create the class** (drawn water before
S1's descent; drawn ways before S4's routing, so arterials reuse them; drawn walls before S7; drawn district boundaries
before S6)". §7.4 drawing row: "inserted as constraints before the stage that would create the class"; migrate: "replay
inserts the same geometry under the new version". Every other kind — setAttr, delete, merge, split, join, assign,
regenerate, warp — applies in log order to the state at its position (§7.4's undo and regenerate semantics; §14
`replay(recipe, edits)`). §2.9: the snapshot is "re-verified against a re-derivation … a mismatch is reported". §6.2:
"model = G(version, seed, params, assignments, edits)" — a function of the ordered log.

**Required change.** One replay semantics, an ordered fold: each event applies to the state its predecessors produced,
and a drawn constraint re-runs its class's stage for the affected scope at its log position — the same code path
interactively and on replay, which is also what GEO-11 requires for weld order. "Hoist before the stage" survives only
as an explicit *rebase* that rewrites the recipe and shows a diff like a migration (LC-13). CI requires
`replay(recipe, log)` to equal the session hash on B-EDIT sequences that mix draw events with later attribute edits.

**Overlaps.** GEO-11 argues the same decision from insertion-order dependence of the weld; together they fix the
document's replay contract.

### LC-11 · major · Epochs are not events in the ordered log

**Failure scenario.** A town is generated (epoch 0); the user renames 12 streets; `grow()` adds a suburb stage and
converts the old wall into a ring road (epoch 1); the user assigns "the New Guildhall" to a suburb plot. Save and reload:
the background verification calls `replay(recipe, edits)`, which has no epochs — it rebuilds epoch 0, applies the
renames, and fails the assign (its target exists only after epoch 1). The mismatch dialog offers the replay; choosing
it deletes the suburb. An upgrade re-runs the recipe under the new version: epoch 0 re-rolls, and epoch 1 had been
"derived from epoch N's persisted state", a state the new version never produced — the settlement's history cannot
survive the upgrade. The user also cannot undo the epoch: it is not an event, and O9 (d)'s enumeration test covers
events only.

**Evidence.** §4.11: `grow(doc, epochInputs)` — the entry point. §2.9: the Document holds `epochs: EpochRecord[]` beside
`edits: EditEvent[]`, and `recipe.circumstances?: CircumstanceTimeline` as a second source of epoch inputs; `snapshot?`
is optional. §7.1: the EditEvent union has `convert` but no epoch or grow kind. §14: `replay(recipe: Recipe, edits:
EditEvent[])`. §16 M4 builds the incremental path after M3 built the log. The brief's EVOLUTION: "epoch N+1 is derived
from epoch N's persisted state, the inputs and the seed's epoch sub-stream … every change traces to a recorded event".

**Required change.** `{t: 'epoch', epoch, inputs}` is an EditEvent in the ordered log; the recipe's circumstances
timeline only *schedules* such events. `EpochRecord` = {log index, inputs, post-epoch model hash}. Replay folds epochs in
order; undo of an epoch restores the pre-epoch snapshot. A multi-epoch document migrates by replaying the whole ordered
log with a per-epoch diff, or it is pinned to its version (LC-14). M4's exit test: a document with interleaved edits and
two epochs replays to the session hash.

**Deferral check.** The deferrals list "the evolution engine beyond the one incremental path"; this finding concerns
the one path the base itself builds at M4 (D-25), so the deferral does not cover it.

### LC-12 · major · An epoch re-solves the global fields while promising survivors are not re-rolled

**Failure scenario.** Epoch 1 adds a rich western suburb and a market gate. S6 re-solves the prosperity field, which
raises the old west quarter from the modest to the prosperous band. Reading A — the quarter's faces count as
"changed": S10–S11 re-derive them with their unchanged stream paths but new inputs, joining plots into larger parcels —
the survivors are demolished and rebuilt without any event, and M4's "0 re-rolled survivors" fails. Reading B — they do
not count as changed: survivors keep their old context vectors; months later the user presses Regenerate (keep
settings) on one old block to fix a sliver, and it comes back as prosperous-band parcels unlike its neighbours — the
"faithful" action changed a block nobody asked to change. S2's delta demand with town-wide siting (LC-2) presents the
same choice for survivors' uses.

**Evidence.** §4.11: "S6 (districts extend; the fields are re-solved with the previous field as a prior and the brush
strokes kept) → … S8–S13 on new or changed faces only"; "nothing outside the touched faces changes"; "nothing that
survives is re-rolled because its stream path is unchanged". §4.5: the field is "moved by the evolution stage". §7.3:
Regenerate re-runs "with the same stage parameters and sub-streams" — i.e. current inputs. §16 M4 exit: "epoch test: 0
re-rolled survivors". The brief's EVOLUTION names "districts densifying or decaying" as recorded changes, and the
owner's PROSPERITY ruling has the evolution stage move the field "over time as circumstances change".

**Required change.** Survivors keep their built state across epochs. A field change acts on them only through explicit,
rate-limited transformation events chosen by rules — densify, subdivide, amalgamate, decay, rebuild — triggered by band
crossings beyond a hysteresis, recorded with their causes and drawn from `…/epoch=e` streams. Each entity records the
inputs of its last derivation (field sample, band, table versions), so Regenerate (keep settings) reproduces it, and
re-deriving with current inputs is the explicit Adjust. Siting across epochs places only the delta demand, on new or
transformed plots.

**Overlaps.** GEO-27 covers the geometric side (new growth crossing built plots); this finding covers fields, context
and uses.

### LC-13 · major · Choosing the snapshot (or keeping the old model) leaves a document whose later undo, migration and verification switch back silently

**Failure scenario.** A document loads with a hash mismatch; the user keeps the snapshot, makes ten edits, and undoes
nine. The engine holds "the last k = 8 snapshots … older ones are rebuilt by replay" — the ninth undo replays recipe +
log, which yields the *other* state, and the town changes shape under an undo. Variants: every later load reports the
same mismatch; the next migration replays the recipe and discards the chosen state; a model kept at upgrade ("the user
may keep the old materialised model instead") drifts out of the replayable window, after which Regenerate on it runs
the new pipeline on old-version entities while the document declares one `generatorVersion`; and on a METROPOLIS load,
edits made during the seconds-long background verification are applied to the snapshot and then replayed onto a
different state if the user finally picks the replay.

**Evidence.** §2.9: "a mismatch is reported, never silent, and the user chooses the snapshot or the replay"; "The app
keeps the last N minor versions replayable". §7.5: "the user may keep the old materialised model instead". §7.4
regenerate/undo row and §12: the k = 8 ring, "older ones are rebuilt by replay". J-8, D-21.

**Required change.** A `rebase` event: choosing the snapshot, or keeping an old model, compacts the document — the chosen
state becomes the new base with its hash, the log restarts after it, replay starts from the base snapshot rather than
the seed, and the document records that it is not seed-reproducible before the rebase. Undo below the rebase uses the
base. A kept old model pins the document's replay version (LC-14). Edits wait until verification finishes or the user
chooses.

### LC-14 · major · Migration: unspecified id mapping, silent mis-binding, orphan locks that no longer protect, and no mechanism for "the last N versions"

**Failure scenario.** A v1.4 document holds 30 setAttr edits on buildings and a lock on a mill plot. v1.6 changes S10's
corner rule. The upgrade replays the recipe; creation-order minting now gives `bldg:d2/b4/p7/f1` to a different
building, and the rename "The Crooked Mitre" lands on it — by string equality, with no orphan report. The mill's id is
unmapped, so it is "listed as an **orphan lock** with its last geometry, never dropped" — listed, but the new version's
town has no mill there. After commit the upgrade cannot be undone (it is not an event). A permalink from v1.1 opened
under v1.9, outside "the last N minor versions", replays under "the nearest replayable version"; with no snapshot the
promised diff has no left-hand side, so the notice can only say the version changed — the town the link was shared for
is unrecoverable, and D-21's "permalinks never silently change" reduces to a warning.

**Evidence.** §7.5: "the edit log re-applies on the id-mapped model" — the mapping is not specified anywhere. §7.4: lock
migrate cell (orphan lock listed), assign cell (criteria replay). §2.9, §6.4 and D-21 rest "permalinks never silently
change" on keeping "the last N minor versions replayable", but no section says how old pipelines ship in a browser-first
embeddable library without a server, what N is, what happens at a major version, and no milestone in §16 builds or tests
it. The references show the drift this must survive: VG seed 3131 gave 29 buildings on one build and 24 on the next
(`_critic-vg-ng.md` V25) while VG permalinks store house marks from 1.6.5 (117634240, vg-posts-b §2.34 [STATED];
creation-order numbering [INFERRED] there); FTG has "no way to automatically regenerate settlements with these
features" (151265004, ftg-posts-c) and once destroyed all towns over an id-model change (65223067).

**Required change.** (1) Specify the mapping: entities of the old snapshot matched to the new model by kind, anchor,
class family and overlap above a threshold, with LC-1's carry-over; unmatched edits are reported orphans, never
string-matched. (2) An orphaned lock re-imposes its last geometry as a user-drawn constraint unless the user drops it.
(3) The upgrade is an undoable event that keeps the pre-upgrade snapshot. (4) Define retention: an *output version* that
bumps only with a declared shift; the model packages of old output versions kept as versioned, tree-shakable modules for
a stated window; documents and permalinks outside it open as frozen snapshots (view, export, rebase — LC-13) with a
visible notice. (5) Build and test this in M3 (replay the goldens under N−1 and N−2).

### LC-15 · major · The recipe and the permalink omit model-affecting inputs; an assignment hash cannot reproduce assignments; `&doc=<id>` needs a server that does not exist

**Failure scenario.** A user sets a global preference "row houses 10 % deeper" (the `userGlobal` layer) and shares
`?v=1.2&s=9f3k&z=CITY&preset=organic`. The recipient's town has different plots; the author's own headless export of the
same link differs from the author's screen; nothing warns either side. Variants: a town with assignments shares
`&a=<assignment hash>`, which can verify but not reproduce them; an edited town shares `&doc=<id>`, which resolves
nowhere because "no server; an optional sync service later" is deferred; the author edited the "organic" preset
(`editPreset`), so `preset=organic` means something else on every other machine; a table update shipped without a
generator-version bump changes the town under an unchanged `v=`.

**Evidence.** §6.2: "`model = G(version, seed, params, assignments, edits)`". §7.6: "`effectiveParams = defaults(tableVersions)
⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ editEvents`". §7.7: intent, character and circumstances, "all persisted in
the blueprint". §4.7 S10b: "Both entry points exist: content-first (default) and layout-first". §6.4: the permalink is
`?v=…&s=…&z=…&p=<base64url params delta from the preset>&preset=<id>[&a=<assignment hash>]`, "an edited town is a
document (`&doc=<id>`, or the compressed edit log inline when < 2 KB)"; version axes are generator, schema, "table
versions (each rule table separately …)" and style. §1.7 persistence: "no server". D-21: "permalinks never silently
change". The references' permalinks fail the same way: MFCG — "No manual changes made to a map are encoded into its URL
(apart from the city name)" and a round trip "subtly changed the city geometry" (102377277, mfcg-posts-b §2.21), and its
URL has no version key (profile-mfcg §2); Perilous Shores' legend edits "are not saved in the permalink"
(watabou-extra-a §2.21).

**Required change.** Define the *canonical recipe* as every model-affecting input: seed, rung, the full effective
parameter delta over the shipped defaults of the pinned table versions (userGlobal and documentOverrides copied into the
document at creation and folded in, visibly), intent, character, circumstances, entry mode, assignments inline,
table-version pins and the output version (LC-14). The permalink is the compressed canonical recipe, or it refuses and
offers a file; `&doc=` only when a resolver is configured; the style version rides along for pixel identity. CI:
permalink → recipe → permalink identity, and permalink-model hash = session hash. The app warns when a link cannot carry
the document (edits over the inline limit, an unresolvable doc id).

**Deferral check.** "A sync service" is deferred; this finding asks that the permalink not emit `&doc=` until one exists,
not that the service be built.

### LC-16 · major · "A person is pinned once seen" turns reading into writing, and pinned people dangle when their household moves

**Failure scenario.** A user browses the gazetteer and opens forty people's entries, which pins them. The edit log (and the undo
stack) now holds forty pin events, and the 2 KB inline-log permalink overflows. The headless API, which views nobody,
produces a document without those pins, so O11 (f) fails if pins are model data. The user then rerolls a block:
households are re-derived from the new plots, and siting's reconcile moves others ("households take residential plots by
wealth band = prosperity band ± drift"); seven pinned people now reference households that no longer exist, or that now
have three members where the pins assumed five. §7.4 has no row for people, so nothing says what happens. Across an
epoch of thirty years the pinned blacksmith is still 34.

**Evidence.** §10.3: "a person is pinned once seen or edited (FTG's rule)"; §4.7 S10b: "People are derived lazily from
`(seed, household id)` and pinned once seen"; §2.7 Person / Household; §14 `ContentProvider.people(household, rng)` beside
§10.3's `derivePerson(seed, id)`. FTG's documented rule is lock-on-edit, not lock-on-view: "In the settlement file, only a
few key details are saved per person. The rest is generated when the person is selected. When a person is manually
edited, those generated details are locked in, alongside any manual edits" (`research/ftg-docs/useSettlements__settings.md`,
read at source; ftg-docs-params §3.10). FTG's own regenerate shows the dangling-people failure: it "will delete any
residents and may update other people", and bulk Edit leaves "people linked to the buildings … not updated in any way"
(ftg-posts-c §2.20). IMPROVEMENTS O9 asked that "people are reconciled (households move, jobs re-match) rather than
deleted".

**Required change.** Pins come only from an explicit user action or an edit (FTG's actual rule); what a user has seen is
per-user view state outside the document. A person's key is (household lineage id under LC-1's carry-over, member
ordinal, birth epoch), with an ageing rule per epoch. §7.4 gains a people row: on regenerate, households with pinned or
edited people are fixed inputs or re-homed by rule with an event; on migrate, orphaned people are reported. O7 (g) "lazy
people stable" is tested under table edits, where unpinned people change as a declared shift.

### LC-17 · major · Every local regeneration re-runs names and labels for the whole town

**Failure scenario.** The user rerolls one block. §7.3 then "re-run[s] only the label and display stages globally": the
block's new street label competes for space, a district label two districts away now collides at its preferred spine
position and falls to its straight-label rung, and a label near the other edge of the map moves in turn. If street
names are unique per town and resolved in creation order, a new lane in the block takes "Mill Lane" and the old Mill
Lane elsewhere is renamed. O2 (b) ("rerolling one block changes nothing outside it"), O2 (d) and O9 (b) ("entities
touched outside the declared scope = 0") fail for Label entities and possibly for names.

**Evidence.** §7.3: "re-run only the label and display stages globally". S13 is a model stage (§4.10: "draws names … and
places labels"); `Label` is a model entity with `pinned?: Placement` (§2.7); §5.3 makes "0 collisions at every LOD" an
invariant; §9 conditions names on the model ("a street for its destination or trade") and leaves uniqueness unstated;
§7.4 files `moveLabel` under "style is part of the document, not the model hash" although Label is model data; O13 (e):
"edited names persist 100 %".

**Required change.** Decide label placement's status together with GEO-29: either view data derived per LOD from the
model plus pinned placements (outside the model hash and the byte-identity claims), or S13 re-run only inside the
regenerated region plus a declared collision halo. Names are per-entity draws whose uniqueness is resolved
deterministically without ever renaming an existing entity (the new entity re-draws); feature-conditioned names are
re-evaluated only inside the scope. Test: a block reroll changes 0 names and 0 label placements outside the scope (or
outside the halo).

**Overlaps.** GEO-29 (label fitting depends on the host text engine) — one decision resolves both.

### LC-18 · major · Stage-2 close-ups have no persistence status

**Failure scenario.** The user opens district d6 as a close-up ('bent-cut' refinement). The close-up cuts two courtyards
and an extra lane, which changes footprints. Reading A — the refinement enters the plats: the city view (where "those
footprint shapes are what shows at every zoom", owner) now differs from the city view of a user who never opened d6,
and the model hash depends on which districts were opened. Reading B — it is view-only: the user moves a well, renames
the new lane and locks a house in the close-up, and none of those edits has a create, persist, regenerate or migrate
path; the II.4 workflow "Same kind, new seed per district with locks" has nothing to lock. Either way, when the base
later re-derives d6 (a widened boundary street next door), the refined content has no carry-over rule beyond
`SeamReport.superseded`.

**Evidence.** II.1: rule (2) "the close-up may **refine** inside faces (finer lanes, courtyards, greens, pins, roofs and
hatching detail)"; `NeighbourhoodResult` returns blocks, ways, plots, buildings, greens, pins, labels; rule (4) about
footprint hashes for entities "the close-up did not refine". §8.6: the neighbourhood tier is "generated lazily per
district tile from the district's sub-seed". §2.6: compositions are "lazily generated, stored only when edited". §7.4
has no row for close-up entities. The brief's PRODUCT SCOPE asks that stage 2 be designed "to the depth needed to
guarantee the base's model supports it", and that at stage 3 "those footprint shapes are what shows at every zoom,
including the city view".

**Required change.** State that a close-up is a pure function of the district's committed base state, its sub-seed, its
strategy and its params — deterministic whether computed eagerly or lazily — held as a derived refinement level outside
the base model hash until its first edit; after that, its edits are events on close-up ids anchored like base entities.
A base re-derivation of the district re-derives the close-up with LC-1 carry-over and reports orphans. City-LOD
footprints read the same source at every zoom, so a close-up that changes footprints is a model change with its own
event (and the city view shows it for every user).

### LC-19 · major · The build plan ships permalinks and goldens at M1, the shift protocol at M4, and version retention nowhere

**Failure scenario.** At M1 the owner reviews side-by-sides of 20 seeds (D-5) and shares a few permalinks. M2 adds the
prosperity field, the full granularity law, S10b siting, compound site plans, greenery and the suburb regime — each
changes every M1 town for the same seed. The declared-shift protocol and per-stage hashes arrive only at M4, so the M2
and M3 changes ride with no shift record; the seeds the owner liked look different at the next review without anyone
saying why; M1 permalinks break by design, and no milestone builds the "last N versions" replay that D-21 relies on.

**Evidence.** §16 M1: "permalink, the report panel, the B-CITY harness and goldens v0"; M2's content list; M4: "golden
suite with per-stage hashes and the declared-shift protocol". §13.3 quotes the owner's rule "a same-seed output change
is never let ride silently"; D-24 prices the tooling "trivial (test tooling)"; D-21; D-5.

**Required change.** Move the shift record, the output-version stamp and the per-stage golden tooling into M1; label
pre-M4 permalinks as preview links that show their output version; every milestone's exit lists its declared shifts;
add version retention to M3 with an exit test (LC-14).

### LC-20 · major · Render-time instances are keyed by LOD band and cannot be edited

**Failure scenario.** A garden's trees are drawn at district LOD from `style/…/district` and at neighbourhood LOD from
`style/…/neighbourhood`: zooming in re-scatters them, and a VTT scene exported at neighbourhood LOD places trees (which
some VTTs treat as vision blockers) where the printed district-LOD map shows other trees. The user drags one orchard tree off a
path: there is no event kind for it, and the next edit to the orchard face re-rolls every tree in it.

**Evidence.** §6.1: "**Decoration** (trees, roof detail, scatter, hatch phase) draws from `style/*` streams keyed by entity id
and LOD band at render time and is never stored"; §2.7 `Greenery.treeStream` "instances at render, never stored"; §4.9
trees at render; §8.1 "geometry never changes with zoom"; §13.4 B-ZOOM "absence of feature pops"; §7.1 "Every generated
element is a target" (owner amendment 5: every generated element editable, edits persist and survive regeneration).
FTG's forest trees are render-time fills whose determinism is untested (`_critic-ftg.md` §2 and §6 item 4); MFCG's tree
crowns and gable counts differ between two renders of one city (IMPROVEMENTS O2 answers).

**Required change.** One decoration stream per entity; LOD subsets as prefixes of a progressive, ordered sample, so every
coarser band is a subset of the finer one; an instance-override event
`{t: 'instance', entity, ordinal | point, op: add | move | remove | restyle}` replayed as geometry after regeneration, with
ordinals re-matched by position; B-ZOOM checks instance positions identical across the bands where they exist.

### Minor findings (LC-21 – LC-31)

**LC-21 · minor · Table-edit invalidation by cited rows is too narrow.** §7.4: "a rule change invalidates exactly the
entities whose `Provenance.rules` cite that row". *Scenario:* the user raises the weight of "inn" in a weighted class
table; entities that drew "house" from the same table are not invalidated although their draw outcome depends on every
weight (§6.1 `weighted`, `deck`); likewise an interpolated rule depends on both bracketing rows (§4.7), a band lookup on
the thresholds, an inserted row on everything it would now match. The locality oracle then fails, and the fallback for
a table edit (no spatial scope, so tree scoping means the whole town) is not stated. *Change:* provenance cites (table
id, hash of the consulted slice) — the whole weight vector for weighted draws, the bracketing pair for interpolation, the
threshold set for bands; invalidate on slice-hash change; B-EDIT includes weight edits and row insertions; state the
fallback.

**LC-22 · minor · JSON-Patch overrides silently retarget after a table update.** §7.1: `editTable` / `editPreset` carry
`patch: JsonPatch`, whose pointers address array rows by position; §6.4 "user overrides carry their base version"; §7.4
"an override of a row that no longer exists is reported and kept `orphaned`". *Scenario:* a shipped table version inserts
a row before row 12; the user's `/rows/12/value` override now edits a different row, with no report. FTG documents the
class for index-stored options: an edited person's hair stored as option index "1" turns red when the option list
changes and blank when the option is removed (`research/ftg-docs/useSettlements__settings.md`). *Change:* address rows by
stable row keys (keyed maps or a custom patch op) and store the base row's hash with each override; applying to a changed
or missing row reports an orphan.

**LC-23 · minor · Caches keyed by entity id serve stale content.** §8.5: "derived geometry (roofs, spines, scatter) is cached
by entity id and discardable"; §4.1: lazy outputs "cached by id"; tiles "re-rasterised only when a district's marks
change". *Scenario:* a setAttr raises a building's floors, or a regenerate keeps a footprint's id because its centroid
stays in the same 1 m cell (§2.1): the cached roof is served; a boundary street shared by two districts changes and the
neighbour's tile is not re-rasterised. *Change:* cache key = (id, content revision hash of the entity's inputs, LOD band,
style version), invalidated from the closure the locality mechanism already computes.

**LC-24 · minor · Duplicated document state.** §2.9's Document stores `locks` and lock/unlock events, `prefs` and
editTable/editPreset events, `recipe.assignments` and assign events (LC-9), `epochs` outside the log (LC-11), and a
`report` with per-stage `ms` timings (§5.4). *Scenario:* after a migration orphans a lock event, the `locks` set still
lists the id (or not — unstated); a background verification refreshes `report`; save → load → save (O9 a) is
byte-identical only if the same copy wins every time. *Change:* declare `locks`, `prefs`, `epochs`, `report` and `stats`
derived caches rebuilt from the log and excluded from the canonical form and the hash — or make them authoritative and
drop the duplicate events; timings live outside the canonical document.

**LC-25 · minor · Version stamps in the hashed model.** §2.8 stores `generatorVersion` and `tableVersions` in every entity's
Provenance; §6.2 hashes "the canonical serialisation"; §5.3 checks "the model hash recomputed equals the recorded one".
*Scenario:* a release that changes no output bumps the version string, so every entity and every golden hash changes; the
shift protocol drowns in noise and LC-3's isolated goldens cannot pass. *Change:* hash model content only (geometry,
attributes, address ids, lineage keys); keep version stamps and `deps` in a separately hashed provenance block.

**LC-26 · minor · A single-valued lifecycle state drops pins.** §2.8: `Lifecycle.state: LifecycleState` holds one of
generated / edited / pinned / assigned / built / altered / converted / demolished. *Scenario:* pin, then assign → state
`assigned`; code that tests `state === 'pinned'` (regeneration exclusion, §7.2) no longer protects the entity, and an
edited-then-assigned id becomes recyclable under §6.3's "locked or edited" guard (LC-1 B). *Change:* orthogonal flags
(locked, pinned, edited, assigned) plus an existence state (generated, built, altered, converted, demolished); the
history stays the event list.

**LC-27 · minor · Two inverses are not inverses.** §7.4 setField undo is an "inverse stroke": with values clamped per
stroke, +0.3 on 0.9 gives 1.0 and −0.3 then gives 0.7, not 0.9 (arithmetic). The warp row persists "both the per-vertex
displacement and the brush stroke, so a regenerated region without those ids samples the stroke field"; but Equalize (a
cell's angles), Bloat and Pinch (cell size) and Rotate are cell-relative operations (`_critic.md` C4/C5), not displacement
fields, so after a district-level regenerate or a migration the replayed warp differs from the session and mixes two
semantics across one region (kinks where old and new vertices meet). *Change:* strokes kept as a list composited once and
clamped at the end, with undo removing the stroke; a warp replays as the operation (kernel, centre, radius, strength) on
the current geometry at its log position (LC-10), per-vertex displacements kept only as a verification record.

**LC-28 · minor · Enter, clone, document identity and forward compatibility.** §6.1 "`Enter` = seed + 1" does not say what
happens to parameters, intent, locks, edits and assignments; MFCG's Enter drops explicit parameters ("the value persists
through `Blueprint.updateURL` but is dropped by Enter"; 47063541 "pressing Enter … forgets the number of roads",
profile-mfcg Explicit-gates addendum). The document has no identity, so a "save as" clone carries the same ids and a host
holding two towns (the embedding and assignment hooks) cannot tell their `plot:d3/b7/p2` apart; a document saved by a
newer version and opened in an older embedded library is unspecified (§7.5 migrates forward only). §6.1's reference note
is imprecise: MFCG's successor seed is the deterministic stream state (k = 585 in both passes), and what is irreproducible
is its size and flags (profile-mfcg seed chain). *Change:* Enter creates a new document with seed + 1 and the same recipe
without edits, locks and assignments (warning when the current document has edits); a document uuid minted at creation,
kept on save, re-minted on clone and prefixed to ids at the API boundary; a newer schema opens read-only with a message;
correct the §6.1 note.

**LC-29 · minor · Ids and stream paths are not layer-qualified.** §2.1 gives each layer its own plat and §2.7 `SkyIsland`
carries `districts`, but ids and §6.1's paths have no layer segment. *Scenario:* a sky district minted `district:d3`
shares every stream path with ground `district:d3` and draws identical numbers — its cuts mirror the ground district's;
§6.1's distinct-key test runs on B-CITY, which has no sky layer, so it never fires. *Change:* a layer (and island)
segment in address ids and lineage keys; a sky-island fixture in the distinct-key test.

**LC-30 · minor · Session state outside the recipe: proxies, "Surprise me", entry mode.** §7.8: choosing one of six S0–S4
proxies "continues that seed's pipeline from S5" within 1 s for all six; if any proxy is produced with a budget-driven
simplification (F-BUDGET-TIME's "coarser parameters", GEO-2), the continued town differs from its permalink's replay.
"Surprise me" (§7.1) draws a random intent from an unstated source; S10b's layout-first entry point (§4.7) is not a
recipe field. *Change:* proxies are bit-identical S0–S4 runs, checked by hash when picked; surprise intents come from a
seeded `intent` stream and are written into the recipe; the entry mode is a recipe field (LC-15).

**LC-31 · minor · Host inputs are not required to reach the document.** §11: the bridge accepts `UPDATE_ENTITY | ASSIGN |
REGENERATE` and host rosters arrive through `ContentProvider` (§14 extension points), but nothing requires a bridge command
to be logged as an EditEvent or a host roster to be copied into the document, and §6.5 (3)'s lint covers only in-repo
model packages, so a host provider may use `Math.random` or the network. *Scenario:* a VTT host assigns and renames
through the bridge; the saved document replays without the host and loses both. *Change:* every bridge command maps
one-to-one to a logged EditEvent; host tables are copied into the document with provenance `host`; a registered provider
passes a double-run determinism check, or its outputs are recorded. *Deferral check:* "host inputs" is deferred, but that
covers what a host may supply, not the persistence of the bridge that M3 builds.

## §4 What the design already gets right under this lens (keep it through the revision)

* **Named sub-streams per concern, with a registry.** Names, decoration and content never share a stream with geometry.
  The VG build change shows exactly what this buys: seed 3131 kept its name and POIs while its geometry changed
  (`_critic-vg-ng.md` V25). LC-3 corrects only the *scope* of the promise, not the mechanism.
* **Retries keyed by (entity, attempt).** A failed attempt never shifts any other draw. In the 2017 loop a rejected
  citadel had already consumed its gate draws and every retry continued the one stream (`_critic-os.md` §4.2, row 58);
  the live MFCG still continues the stream rather than reseeding (profile-mfcg seed chain). LC-5 only separates user
  rerolls from ladder retries.
* **A seed is not a save.** The document holds the recipe, the ordered edit log and a hash-verified snapshot, and a
  mismatch is reported, never silent (J-8, the K-3 repair). That is beyond all four references: MFCG has no save and its
  permalinks drop edits; FTG's only undo is the creator's file history; NG and VG keep only seed and tags. LC-10, LC-11
  and LC-13 repair the replay contract; they do not argue for events-only or snapshot-only.
* **Separate version axes and a version in the permalink.** MFCG's and VG's links carry no version (profile-mfcg §2;
  `_critic-vg-ng.md` V25). LC-14 and LC-15 complete the idea; they do not replace it.
* **Per-stage goldens with a declared-shift record** (D-24, §13.3). This is the owner's non-negotiable written as a
  mechanism. LC-3, LC-19 and LC-25 make it enforceable.
* **Stable ids with anchors and `supersedes` links.** This is the right mechanism for carrying identity through
  regeneration. LC-1 asks only that the address be separated from the stream lineage so the mechanism can work.
* **The four regenerate actions, dry-run validation and undo.** The four actions are distinct operations, a dry run
  returns conflicts as actions, and undo is by inverse events with an enumeration test. LC-4, LC-5 and LC-8 add edit
  fates and a reroll segment on top.
* **Content references geometry by id, never the reverse.** So content can be re-solved without moving the map.
* **Lazy people derived from ids.** FTG's storage economy (50 000 people in kilobytes) is kept. LC-16 changes only what
  triggers a pin.
* **The entity registry with migration hooks and a CI path-coverage test.** VG's palisade "ghost" cannot recur.
* **Exactly one incremental path, built and tested at M4** (D-25), with the epoch stream rule. This is the right scope
  for a hook. LC-11 and LC-12 make its record replayable and its survivors stable.
* **Integer geometry, `dmath`, and a canonical sorted-key serialisation for the hash.** The geometry lens's GEO-2, GEO-9,
  GEO-29 and GEO-31 close the remaining numeric leaks.
* **"Headless hash = UI hash" as an acceptance criterion** (O11 f). This is the right test; LC-2 and LC-16 make it
  passable.

**Examined without a separate finding.**
* The kernel's batch transactions: a failed batch leaves the plat at its previous version, which is atomic and suits
  undo.
* The generation report's printed stream keys, which make attempts replayable.
* The concern registry's review rule.
* The per-layer plats. Apart from LC-29's id and path qualification they raised no lifecycle problem.
* The data dictionaries: append-only and id-referenced (§10.3), which removes FTG's re-colouring hazard for
  dictionaries. LC-22 is the same hazard in the table-override path.

## §5 How the findings cluster for the reviser, and overlaps with other lenses

| cluster | findings | the one decision that resolves most of it |
|---|---|---|
| identity and carry-over | LC-1, LC-8, LC-14, LC-26, LC-28, LC-29 (+ GEO-5, GEO-34) | opaque, never-reused address ids carried by anchor matching; lineage keys for streams; edited attributes pinned; migration mapping by anchor, never by string |
| determinism of derivation | LC-2, LC-17, LC-20, LC-30, LC-31 (+ GEO-2, GEO-9, GEO-29, GEO-31) | a laziness contract with an eager town-level siting allocation; label placement as view data or region-scoped; one decoration stream per entity; everything the model reads is inside the recipe |
| the document's replay contract | LC-10, LC-11, LC-13, LC-24, LC-27 (+ GEO-11) | one ordered fold for every event, drawn constraints and epochs included; a rebase event; derived caches out of the canonical form |
| locality of regeneration | LC-4, LC-6, LC-7, LC-12, LC-21 (+ GEO-27) | locality promised per consuming stage; absolute bands; local operators for the coarse stages; survivors changed only by events |
| versions, goldens and links | LC-3, LC-14, LC-15, LC-19, LC-22, LC-25 | output versions; stage-isolated goldens from M1; canonical-recipe permalinks; version retention built in M3; key-addressed overrides |
| content and people | LC-5, LC-9, LC-16 | reroll separate from attempt; lock above assignment with fixed-point re-solves; pins only by explicit action |
| stage-2 readiness | LC-18 | close-ups as a deterministic derived level; their edits are events on anchored ids |

**Overlaps with other lenses.**
* **Geometry.** The geometry lens handed three findings to this lens: GEO-5, GEO-11 and GEO-34. They are cited, not
  repeated:
  * GEO-5 and GEO-34 are the handle layer beneath LC-1.
  * GEO-11 and LC-10 are one decision about the document's replay path.
  * GEO-27 is the geometric side of LC-7 and LC-12.
  * GEO-29 and LC-17 decide label placement together.
  * GEO-2 is a sibling leak of LC-2 and LC-30.
  * GEO-38 (wallToWay clearance) is one of the transformation events LC-12 requires.
* **Scale.** LC-2's eager allocation at METROPOLIS; the bundle size of LC-14's version retention; LC-11's replay cost for
  multi-epoch documents; LC-23's cache keys.
* **Visual.** LC-20 (instances across LOD bands) and LC-17 (label placement status).
* **MFCG and FTG parity.** LC-28 (Enter semantics); LC-7 (regeneration below versus above the coarse level, against
  FTG's regenerate-area tool); LC-16 (FTG's actual person rule).
* **Improvement claims.** LC-3 and LC-4 show that O2 (e) and O2 (c), as written, cannot be measured.

**Deferrals.** Three findings touch the ARCH deferral list, and each says why the deferral does not cover it:
* LC-11: the evolution-engine deferral does not cover the M4 path the base builds itself.
* LC-15: the sync-service deferral only means the permalink must not emit `&doc=` yet.
* LC-31: the host-inputs deferral covers what a host may supply, not the persistence of the bridge M3 builds.

No other finding re-raises a deferral.

## §6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (checked in the documents or computed).
* Every quotation of `docs/ARCHITECTURE.md`, which was read in full.
* Each finding's contradiction. Each is built only from quoted ARCH rules, so it is CONFIRMED as a contradiction in the
  text.
* Every reference fact, taken from a passage this seat read (§0):
  * the four critic files, in full;
  * profile-mfcg: §2, and the Explicit-gates addendum's seed chain, EG2-4 and EG2-6;
  * mfcg-posts-b §2.21–§2.22 and open question 16;
  * mfcg-devlogs-a §2.27;
  * vg-posts-b §2.23 and its permalink lines;
  * ftg-posts-a (release rows 1–4), ftg-posts-b T-05, ftg-posts-c §2.20 and the 151265004 bullet;
  * the FTG guide page `useSettlements__settings.md`, lines 15–40, read at source;
  * IMPROVEMENTS O2 and O9, in full.
* The clamp arithmetic in LC-27.

**PLAUSIBLE** (reasoning only; no PLAT code exists yet).
* How often each failure fires in a built system.
* The illustrative quantities in the scenarios (40 edits, 60 m, the band values, the ages).
* Whether an implementer would build the literal mechanism or quietly fix it. For example, making S10b eager would move
  LC-2's cost into the METROPOLIS budget.
* That JSON Patch pointers address arrays by index (LC-22). This is general specification knowledge, not re-read here.
* That a browser-first library cannot keep N old pipelines without an explicit mechanism (LC-14). This is engineering
  judgement.
* The severity ranking, which is this seat's judgement under §1's rule.
