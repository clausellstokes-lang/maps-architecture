# repair-r3-determinism — lane coherence/repair-determinism-r3 (unit determinism: base §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-determinism-r3; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first "=== " line is
# ignored. Base: docs/ARCHITECTURE.md sha256 4ed292e94f2442e5… (assemble-r2's output, the live file). Each REPLACE body
# is the live subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-determinism-r3/
# gen.py with edits.py; only the touched paragraphs are re-wrapped, every other line verbatim). 5 REPLACE blocks (§6.1,
# §6.3, §6.5, §7.1, §7.7), 0 RULING REQUEST blocks. Binding: adjudication-r3.md (R3-01 – R3-03, R3-09, R3-11 – R3-13,
# R3-21 – R3-23, R3-25; Part H · determinism).
#
# PROGRESS
# - P1 brief read whole; adjudication-r3 TOC, R3-01 – R3-03, R3-09 – R3-13, R3-17 – R3-27 and Part H · determinism read
#   whole (and Part H · V08's END lines, which meet DR44): done
# - P2 issue sources (verify-determinism-r2t, -vol-V03-V04-r2t, -vol-V11-V12-r2t, -agree-host-r2t's VAH-r2-01 as the
#   brief quotes it), V11 §3.25.10 – §3.25.11, V08 §3.16 (7), V04 §5.6 (1)–(2), V03 §2.2, §2.7 *At the frame* and
#   `RaisedFoot`, II.7.6 step 3, T66-2, §8.2's hard rules, §9.2's admission function; live §6.1, §6.3, §6.5, §7.1, §7.7
#   read whole: done
# - P3 11 asserted edits over 5 subsections (edits.py): done
# - P4 checks on scratch copies (below); result file; LANDED: done
#
# DISPOSITIONS — 16 routed issues: 11 FIXED, 5 MERGED (closed by their targets' fixes, no block of their own), 0 INVALID,
# 0 ruling requests
# - VDC2-01 (major; R3-23 (a)): §6.1 *The weather stream* — the gap a unit exponential E = −ln(1 − u) through
#   `dmath.log`, spent at the live rate R(t) over view time (none while R = 0); a kind live while its band holds §2.9's
#   `yearWeek` and, under `light: 'time'`, its `hours` hold the view's hour, its rate `perHour` × V11's site factor (the
#   sites read from the model at the view's head); the kind drawn when the spell starts, the length in its `lengthS`; a
#   running spell changed only through §8.2's hard rules; the pure-function inputs widened to the climate row, year
#   position, sites and view hour in force at each moment; §6.5 (9)'s test adds the scripted year-position change (a week
#   with no live kind into a live week and back) and a view hour crossing a kind's `hours` (T124-9).
# - VDC2-02: §6.1's `view.weather` row keys the spell's marks (§8.2's positions, lengths and sways) on the spell's entity
#   key folded with the frame's world-aligned cell; *The weather stream* names them (both ends).
# - VDC2-03: §6.5 (3)'s lint scope takes the weather timeline function with every function it calls; CI's closure roots
#   name it (judgment (1)).
# - VDC2-04 (graded major; FIX amended per R3-23 (b)): Start a shower now starts the commonest LIVE kind at that moment
#   (V11 §3.25.11's rule); "at a moment with no live kind (R = 0)" a press starts none and V09 disables the button with
#   its reason (§7.8: never a silent no-op) — the required change's "in a week with no live kind" not written (R3-23 (b));
#   §6.5 (9)'s test fixes that press.
# - VDC2-06: §6.3 — [lo, hi] the element kind's range (V11 §3.25.10's `damage.elements` row); the walls material acts only
#   through the decay level's rate (V06's `decayLevel`, V11's `damage.materials`).
# - VV34-r2-16 (graded major; closes VAL-R2-03, MERGED): §6.3's key forms add the choir flight and the `cellarVault` (their
#   room's address) and the `cryptVault` cell (its room's address and its grid node, V04 §5.6 (2), whose V04 end names the
#   node, VV34-r2-03), with the one vault of a crypt holding no cell centre (judgment (5)).
# - VDC2-11 (R3-22 (a)): §7.7 item 1 — the latitude and the site's words the dossier's where it carries them (culture,
#   DR29; terrain type, access and deposits, DR1, DR19, DR42), else the generator's defaults; the partners' and the
#   deposits' bearings the generator's draws or the user's settings, never an input (VDC2-11's text).
# - VDC2-16 (closes VKr2-04 and VPC-R2-18, both MERGED): E-07's `addUndergroundAccess` row — the connector that finds no
#   route (II.7.6 step 3: `E_NO_PATH`, its two causes in II.7.6's words), the refusal naming the blocking building or the
#   water table, the basement not laid; keys `bend.under.basement`, `refuse.under.basement`, `refuse.under.route` (V09
#   writes their rows, VDC2-17). VPC-R2-18's key `refuse.access.route` not written (Part H's note).
# - VKr2-06 (R3-25 (a); closes VM-R2T-05, MERGED): §7.1's `drawWay` comment reads "its two ends its feet (§2.7's
#   `RaisedWayRecord.feet`)"; VM-R2T-05's comment text not written (R3-25 (a): the citation form), its case written at
#   the edit's prose home (judgment (2)).
# - VPC-R2-02 (R3-11, R3-09 (d); closes VDC2-09, MERGED): DR44 reads the `map` row of the source word V08 §3.16 (7) (b)
#   gives the overlay, `regional_migration_pressure` the refugee camp, the other regional_* pressures `none`.
# - VAH-r2-01 (R3-13): DR44 states a condition's tier — `public` where its map row gives a look, `secret` where it is
#   `none`, a key form listing the overlay's address admitting it whatever its tier (J-V8.128); V08 §3.16 (7) (e) cites it
#   (V08's END line).
#
# END LINES written this round (R3-01; Part H · determinism)
# - END of VAH-r2-02 (V08; R3-12): DR44's source clause — "a stressor's overlay draws no look while a condition's overlay
#   whose map row gives the same look kind stands (V08 §3.16 (7) (b))".
# - END of VPC-R2-03 (V08; R3-09 (d)): DR44 names "the `map` row of the source word V08 §3.16 (7) (b) gives the overlay (a
#   stressor's type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype)".
# - END of VAT-r2-04 (rendering; R3-21): §7.7 item 1 — "the host's commands (§11.3: a week and a selection by `view.set`,
#   the layers shown by a logged `setLayer` sent by `doc.apply`, as a user's toggle)", the rest as it stood.
#
# JUDGMENT CALLS (vetoable)
# (1) VDC2-03: §6.5 (3)'s sentence naming CI's import-closure roots lists the CPU reference light pass beside the new
#     timeline function — both are in the lint's scope, and a scope member the closure does not start from is never
#     linted (the same root cause; the light pass was in scope since item 68 but not among the roots).
# (2) VKr2-06 / VM-R2T-05: §7.1's *Raised ways, aqueducts and retaining walls* said an end "elsewhere moves along the
#     course to the nearest [ground vertex]", silent on a stroke drawn beyond the frame; it now cites §2.7 *At the frame*
#     ("a course drawn beyond the frame bends to the arena's outer ring, its foot at the ring point"), so the edit's prose
#     and the record agree; the feet's form stays §2.7's alone.
# (3) VDC2-02: the registry clause sits after "never from the seed key" (the required change put it one clause earlier),
#     so "never from the seed key" stays with the spell's key it qualifies; content as required.
# (4) VDC2-01: "at that moment" for the kind's pick reads the rates that spent the gap's last part, so a rate change at
#     the very instant the integral reaches E (an hour boundary, a scrub) has one outcome.
# (5) VV34-r2-16: V04 §5.6 (2) keys a crypt whose ring holds no cell centre by its room's id alone (one `cryptVault`); the
#     key list names that form too, so §6.3's list is exhaustive (VAL-R2-03's reading).
# (6) DR44's rule cell is set as sentences — the chain (overlay → map row → look row → scale, placement, drawing); then
#     the map rows (their totality, R3-11's regional clause, the unmapped word, R3-12's pairing); then knowledge; then the
#     aftermath — so R3-09 (d)'s parenthesis and R3-11's clause read whole, unnested. "As a band-less reader" (V08 §3.16
#     (7) (e)'s words, which V08's END line drops when (e) becomes a citation) is carried into DR44, so nothing is lost.
# (7) VDC2-04 / VDC2-01: §6.5 (9)'s weather-timeline test also fixes a press at a moment with no live kind and a view
#     hour crossing a kind's `hours` under `light: 'time'` — principle (11): the edges §6.1 now defines are tested.
# (8) VDC2-16: the action cell's "the basement not laid" is attached to the refusal by a comma (a bent basement is
#     laid); the cause cell gives `E_NO_PATH`'s two causes in II.7.6 step 3's own words ("enclosed within
#     `foundationClearM` by …").
#
# HAND-OFFS (R3-01 (3): ends no line names; for round 4's verifiers)
# - V09 §4.21.14 (3) (l. 3650–3651) reads the spells "over V11's weather columns for the climate row and the view's week";
#   §6.1 and R3-23 (c) read them at §2.9's `yearWeek` with the sites and, under `light: 'time'`, the view hour. V09
#   §4.21.14 (4)'s closing "so the timeline replays from its seed, its clock and the presses (T124-9)" omits the climate
#   row, year position, sites and view hour in force, which §6.1's pure-function list now names; V09 may cite §6.1. (V09's
#   own VV910-r2-01 rewrites (4)'s dust-haze clause this round.)
#
# CHECKS (on scratch copies; live files untouched)
# - apply-blocks.py (the assembler's applier, unchanged) on a copy of the live base and rationale: 5 blocks found, 5
#   applied, 0 skipped; audit 5 × OK (present once); headings 153 → 153; fences balanced, 140 → 140 fence lines; title
#   block unchanged; rationale byte-identical; document 22 470 → 22 494 lines.
# - whole-document diff = 11 hunks, one per edit (l. 9352, 9382–9395, 9786–9803, 9914–9917, 10007–10009, 10073, 10220,
#   10380, 11687–11688, 11706–11707, 11896 of the live file); no other line moves.
# - doc_checks.py --sections 6.1,6.3,6.5,7.1,7.7 before and after: identical (C1 5/0, C2 1/0, C3 111/0, C4 0/0, S1 0/0;
#   exit 0) but S2 208 → 211, all three new hits the volume pointers the new text cites (V04 §5.6, V08 §3.16), reviewed by
#   the allow file (0 unreviewed). The tool warns the reference corpus is INCOMPLETE in this checkout (captures,
#   research/patreon, research/devlogs, research/ftg-docs, research/external absent): its clean-room result is NOT
#   authoritative — provisional until re-run on the machine that holds the corpus.
# - no review id (R2-nn, R3-nn, a verifier id) in any block's design text (R3-02).
#
# SIZE (principle (9)): §6.1, §6.3, §6.5, §7.1, §7.7 38 803 → 39 476 words (+673, +1.7 %): §6.1 +303, §6.3 +49, §6.5
#  +105, §7.1 +63, §7.7 +153. Removed: the bearing clause item 125 retires (restatement of no rule, replaced by DR29's,
#  DR1's, DR19's and DR42's sources). No word removed from content. The growth is the defined edges and wiring the issues
#  require (the live-rate timeline and its test, the marks' keys, the lint scope, E-07's no-route refusal, the element-id
#  forms, DR44's source word, regional clause, pairing and tier); a repair round adds no shrink of its own, the band
#  being the rewrite's (no unit shrinks here; the irreducible content is the owner's items 122–125 at build depth).

=== REPLACE ### 6.1 RNG and stream design ===
### 6.1 RNG and stream design

* **Engine:** xoshiro128\*\* per stream (four 32-bit words; period 2¹²⁸ − 1; fast in JS, no BigInt).
* **Keys are mixed from structured components, never from strings** (K-6 / R-1 kept). The **seed key** (128 bits) is
  derived once from the seed by four 32-bit-lane finalisers with distinct salts (all `Math.imul`). An entity's
  **entity key** — the mix of the seed key, its lineage hash (§6.3) and its arena key (layer and part, §2.2) — is
  computed once when the entity is minted and cached in the arena beside the lineage hash. Town-level draws — S0's
  feature draws, terrain noise and the per-document furniture (the compass and the emblem, §9.5) — use the **town
  root's** entity key, the seed key mixed with the fixed town lineage (ground arena, no parent, creation epoch 0, index
  0 — index 1 for a standalone neighbourhood document, V01 §2.8; item 340), so they depend on the recipe alone and
  never on `docId`. Paint programs and furniture pass the reserved stage id `STAGE_VIEW` (0xffff) to the one mixer
  (§14 `Rng.stream`). A **stream key** is one finaliser round over the entity key combined with the packed components
  (stage id u16, concern id u16, reroll u16, attempt u8, epoch u32, salt u16 — 104 bits, inside the key's four 32-bit
  words); its four words seed the state directly
  (the all-zero state is replaced by a fixed nudge). A stream is created once per derivation and continued; a second
  request in the same derivation returns the same stream. No string is built on the generation path: the textual form
  `S11/siteplan@plot:7kq2m9x4c1b0a/arrangement[/r=1][/a=2][/e=0]` is rendered from the same components for reports
  only. *Budget:* ≤ 0.1 µs per stream key (string paths measured 0.73 µs). *Measurement:* the M0 (d) determinism spike
  times key derivation over a B-CITY city. *Pre-decided fallback:* derive a batch's stream keys in one vectorised pass
  over a typed array — output-neutral, so no golden moves.
* **Stage ids** are u16, registered append-only and never renumbered, like the concerns: the base's stages; `S8.seed`
  (a template's seed ways and plazas, distinct from S8's so no seed's lineage key can equal a lane's of the same cell;
  reserved at M1, its first user at M5; items 340, 345); the evolution engine's `EVO_PRELUDE`, `EVO_HAZARD`,
  `EVO_FIELD`, `EVO_USES`, `EVO_DEPARTURES`, `EVO_DECLINE`, `EVO_FORT`, `EVO_TERRAIN`, `EVO_LADDER`, `EVO_MUTATION`,
  `EVO_SITING`, `EVO_GROWTH`, `EVO_WORKS`, `EVO_UNDER` (the underground adapters' own draw, excavation by demand, V06
  §3.18.1) and `EVO_RAISED` (the `raisedWays` phase's stage; its gate draws are `raised.reason`'s, keyed by the reason
  key, V06 §3.16) (item 342); the village product's `VS1`… stages (V07 §3.14); and `STAGE_VIEW`. Adding one
  moves no existing key.
* **The components:**
  - **lineage** — the entity's stream identity, its lineage key (§6.3); a surviving entity keeps it, so nothing that
    survives is re-rolled;
  - **concern** — what the draw is for (registry below); streams are never shared across concerns;
  - **reroll** — the scope entity's New random count, an absolute number stored in its identity and written into the
    `regenerate` event as an explicit per-entity map (the rerolls actually used, §5.1 (6)); children draw with their
    derivation unit's reroll, so New random on a block changes that block's plots and nothing else. **The stage-3
    rungs** (item 28) are their own derivation units, with one reroll counter per `regenerate.rung` value — `wings`,
    `rooms`, `plan`, `plan.layout`, `plan.roles`, `plan.furnish`, in that order from the coarsest. Their streams —
    `plan.*` and the composition's concerns — carry S11's stage id, the stage that made the building (§4.7; for an
    underground building, the underground stage's S11 run, II.7.3), which a transient arena's batches carry too (§3.3).
    Each counter is an absolute count, advanced only by a `regenerate` that names its rung and stored in that event's
    map under `<building id>#<rung>`; a rung's reroll is that count as the log gives it, never a field of the
    elaboration record (§2.8), so a replay rebuilds it exactly and the cache can be dropped to `absent` at any time
    without loss (§6.2). A stage-3 concern's stream mixes the counters of its own level and of every coarser level
    through the one mixer (§14 `Rng.stream`): the coarser counters are folded into the building's key, one finaliser
    round per level in rung order, and the concern's own counter is its reroll component —
      - `plan.program` reads `#wings`, `#rooms` and `#plan`;
      - `plan.layout` reads those and `#plan.layout`;
      - `plan.roles` reads those and `#plan.roles`;
      - `plan.furnish` reads all six;
      - the composition's concerns (`compose.dormers`, `compose.porch` and `compose.rooms`, V02 §3.12; item 341) read
        `#wings`, and at `rooms` also `#rooms`.

    So a finer re-roll leaves every coarser concern's stream unchanged — re-rolling the layout keeps the wings, the
    entrances and the stair core by construction, and re-rolling the roles moves no wall — while a coarser one re-rolls
    everything below it (J-A28.61). **A user's reroll count, a rung's counter included, is capped at 32 767**; rerolls
    from 32 768 up are reserved for the faithfulness references (§7.3 item 7 (iv)). New random on an entity whose count
    stands at the cap does not advance it: the entity keeps its reroll and is reported `no_alternative` (§5.1 (6)), and
    the dry run names the cap;
  - **attempt** — the ladder's retry number (§5.1), restarting at 0 inside each reroll. Each concern's **attempt cap**
    is the HIGHEST attempt index its ladder may reach: attempts run 0 … cap, so cap 0 is one attempt. Every geometric
    ladder's cap is 2 (three attempts: tier 3); the naming re-draw of §9.6 has cap 8 (a repeated name re-draws on its
    own stream before taking a distinguishing suffix); a concern no ladder retries has cap 0. A row below that states
    its own cap overrides the default (DIC-02: no concern's number of draws changes);
  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town; live epochs run 1 … 2³¹ − 1, a bound no
    log reaches: an `epoch` that would pass it is refused at its dry run, naming the cap — `refuse.epoch.cap`, §7.1);
    the history replay at generation keys its coarse epochs r = 1 … R with `0x8000_0000 + r`, the upper half of the
    u32 range reserved to it, so no replay draw can equal a live epoch's (g item 113; below). On a document generated
    from its history the live epochs are numbered 1, 2, … after the creation prefix, whatever its length R, so a
    Re-derive that replays a corrected history keeps every live epoch's keys; a replay epoch r records
    `0x8000_0000 + r` as its epoch number wherever the model records one — §6.3's creation epoch in the lineage key,
    `LifecycleEvent.epoch` and `Lifecycle.since.epoch` (§2.8), `EpochRecord.epoch` (§2.9), §2.7's `conditionEpoch` and
    V06 §2.11's index. A rule that orders by epoch compares the epochs' weeks (an `EpochRecord`'s week, its
    `inputs.week`, §4.11), never their numbers, so every replay epoch precedes every live epoch;
  - **salt** — a per-concern number in the recipe (default 0) that `rerollLayer(concern)` bumps (§7.1), for
    **rerollable** concerns only. A concern can be rerollable only if a registered stage or paint program reads it (a
    `StageDecl.streamKeys` entry or a paint program names it) and it is not a geometry concern — the village product's
    `village.track` excepted (item 344), whose `rerollLayer` re-grows the village's roads and is therefore dry-run as a
    Re-derive from its reader stage VS4 with the fate report (V07 §4.3). The registry marks which are: exactly `naming`,
    `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem` (the last two read by the
    compass furniture program and the emblem generator, §9.5) and `village.track`. `naming.quarter` and `style.random`
    are registered non-rerollable (a new `setStyle` event re-draws the random style, §8.2), as is every other geometry
    concern, whose reroll is the regenerate action — so rerolling the trees or the names moves nothing else.
    `rerollLayer`'s concern type is generated from the registry, the recipe's initial salts are keyed by the same type
    and its schema refuses any other key (§2.9), so no recipe, link delta or log can give any other geometry stream a
    salt; a CI test fails when a rerollable concern has no reader (J-DET-22). A town-wide `rerollLayer` sets the concern's town salt; an **ids-scoped** `rerollLayer` of `naming`
    re-draws only the names of the entities it lists, each with the per-entity salt the event carries. A salt is a u16
    capped at 0xFFFF: a `rerollLayer` whose concern's town salt — or, ids-scoped, whose entity's salt — stands at the cap
    keeps that salt, and the dry run reports that concern or entity `no_alternative` with the cap named, as a reroll
    at its cap is (§5.1 (6)). Every other name
    draw takes its salt by §6.3's draw case — the town salt for an entity with no predecessor, the salt its naming record
    holds for a changed naming input — so a name's salt is never in the model digest: the event that set it holds it,
    and the naming record caches it (§2.8). Labels draw nothing (§9.2, §9.3): no labels concern is registered, "reroll
    the labels" is not offered, and re-placing a label is `moveLabel`.
  - Draws keyed by an ordinal rather than by an entity — the roster's prefix-stable `roster/<class>/<ordinal>` draws
    (§10.2) — use the class's registry entry as the derivation unit and the ordinal as the creation index, through the
    same mixer; a trade partner's and a listed deposit's bearing hash that element's binding key as the derivation unit
    the same way (below).
* **Fixed-key draws** (E-03). Where a thing's existence is decided by a chance that can rise over its life — the
  underground's catacomb source, overlap shaft, crypt join, dig and public opening (V04 §3.12) — the draw is one
  uniform on the named concern keyed by the subject's own lineage key parts with no epoch component: fixed for the
  subject's life, never re-drawn, and compared at each moment its site names against the chance then in force; the
  subject exists from the first moment the chance exceeds the draw, and what a met chance made persists. Each site
  states only its concern, key parts, chance source, comparison moments and persistence, and V04 §3.12 its exceptions.
* **Concern registry (G-P6).** Adding a concern is a reviewed change to a registry file; concern ids are u16,
  append-only and never renumbered, so adding a concern changes no other key. Each row declares its reader stages,
  whether it is rerollable, its attempt cap (§6.1's attempt component: the default unless the row states one) and its
  keying — the row's cell is the one statement of how its draws are keyed; a reader's section cites it. Each row keeps
  the u16 id it was appended with; a volume's rows take the next ids when their stage lands (V01's reserved at M1). No
  stream outside the table exists.

| concern | cap | keyed by — and read by |
|---|---|---|
| `terrain.noise`, `terrain.controls` | default | the town root's key: S1's terrain (§4.2 S1) |
| `water.coast`, `water.river`, `water.islands`, `water.delta` | default | the town root's key: S1's water (§4.2 S1) |
| `site.centre` | default | the town root's key: S3's siting (§4.2 S3) |
| `blueprint.features` | default | the town root's key: S0's per-rung feature draws (§4.2 S0); then, appended after them in this order, the geology flag's uniform (§4.2 S1 (10), item 65; J-A65.49) and the relief toggle's `auto` pick (§4.2 S0; S1 (1) reads the class), each drawn whether its toggle is `auto` or set (a set toggle ignores its draw), so setting either moves no other draw; the sewer layer's existence draw (II.7.1) |
| `intent.surprise` | 0 | a fresh seed's town root: Surprise me's intent draw (§7.7 layer 1) |
| `gate.pick` | default | S3's gate picks (§4.2 S3 (7)); a trade partner's bearing where the blueprint gives none (§7.7 layer 2, item 77; no host input gives one, item 125 (b)), the partner's binding key hashed as the derivation unit, so the bearing never moves when unrelated facts change |
| `reserve.plaza`, `reserve.castle`, `reserve.precinct`, `reserve.water` | default | S3's reservations (§4.2 S3) |
| `roster` | default | S2's roster, with the ordinal-keyed `roster/<class>/<ordinal>` draws (§10.2) |
| `route` | default | S4's router (§4.3) |
| `growth.heading`, `growth.branch`, `growth.mainroad`, `growth.curvature` | default | S5's growth (§4.4) |
| `district.seed` | default | S6's seeds (§4.5); each grower's turn skips and its absorbed neighbour (item 47), keyed by the grower's seed lineage (its feature's; a remainder seed's first face) with the turn number as the creation index, so §7.3's S6 operator re-grows a scoped regroup exactly |
| `district.type` | default | S6's typing (§4.5) |
| `alloc.district` | default | S7b's allocation (§4.5 S7b), including its edge-green-or-orchard choice per district and dispersal's controlled random share (item 72) |
| `alloc.block` | default | S10a's block allocation (§4.7); item 105 (f)'s relaxation pass (≤ 2) |
| `field.chance` | default | the prosperity field's ε (§4.5) |
| `cut.t` | 2 | the bent cut (§4.6, items 34–40): twice per attempt — step 2's position bell and step 4's corner bell, three uniforms each; step 8's turned frames on the `attempt` component (item 39) |
| `cut.side` | — | retired: the start run is a deterministic rule (§4.6 step 3); the id reserved, no reader, never reused (J-A41.61) |
| `cut.arc` | default | one uniform per corner §4.6 step 5 keeps on a lane or street cut — the fillet predictor's one test (step 6); stage 2's ring courses (II.2, item 58 (a): the district's one shared phase, each vertex's jitter, each ring's spacing factor), keyed by the district with the ring's ordinal as the creation index |
| `cut.width` | default | one uniform u per district, the exponent `p` = `4^u` ÷ 2 through `dmath.pow` (§4.6) |
| `cut.farSideAlt` | — | retired: the far side is a deterministic rule (§4.6 step 5); the id reserved, no reader, never reused (J-A41.61) |
| `plot.width`, `plot.vacancy`, `plot.bounds` | default | S10's plots (§4.7 S10); a plot fusion or splitting (item 31), keyed from the due block's lineage, the members' buildings keeping their streams because their lineage continues (§6.3) |
| `plot.join` | default | S10's joins (§4.7 S10); the cluster row's `wholeBlock` pick (§4.7 S11, item 70), keyed by the block; the fractional join bonus of §7.7 layer 1 |
| `siting` | default | S10b (§4.7): a concealed institution's default mode and its cover (item 63), keyed by the institution's lineage; a residential plot's building class from the class mix (item 71), keyed by the plot and its request; a post-build placement — an `assign`, a dossier event, a positive placement or a relocation (§7.7) — with the causing event's `seq` as its creation index (§6.3); the members of a collective dossier record a status reaches (§7.7 item 14, item 80), keyed by the record's assignment with the dossier event's `seq` as its creation index |
| `siteplan` | default | S11 (§4.7): a plot's front recession (item 43) and a cluster's packing (item 70), keyed by the plot |
| `siteplan.template` | default | S11's template choice (§4.7) |
| `heights`, `material` | default | S11 (§4.7, §2.6) |
| `greenery`, `fields`, `crop`, `forest` | default | S12 (§4.9) |
| `hinterland.outside` | default | S12a (§4.9); a listed deposit's bearing, which no input gives (DR19; item 88, staged; item 125 (b)), its binding key hashed as the derivation unit |
| `hinterland.decor` | default | S12a's decoration (§4.9) |
| `pin.centrepiece`, `pin.stall` | default | pins (§4.7, II.3) |
| `pin.decor` | default | pins (§4.7); the neighbourhood tier's pin picks with their weight decay (II.3, item 58 (c)), keyed by the block with the pick's ordinal |
| `people` | default | `derivePerson` (§10.3) |
| `content/relations` | default | the relations (§10) |
| `naming` | 8 | rerollable. S13a (§9.6); an epoch's district rename (§6.3 case (5), item 72), with the renaming epoch's component |
| `naming.quarter` | default | S13a's quarter names (§9.6); non-rerollable |
| `naming.emblem` | default | rerollable. The emblem generator (§9.5) |
| `warp.jitter` | default | the warp's `jitter` kernel (§7.1) |
| `epoch.transform` | default | §4.11: the strike pool's `u` (V06 §3.5.2) and each entity's dwell spans, keyed by the entity's lineage and the epoch; the terrain and water conversions (reclamation, silting, a course shift), keyed by the water body's or land-use face's lineage (J-A25.61); a churn cap's extra — the chance of one more carried by a cap scaled by a fractional `years` (J-A76.44) — keyed by the district's lineage with the cap's kind as the creation index and the epoch component |
| `island.place` | default | S7b (5) and V05: the island count, each slot's reason, and per island its template, bearing, outline, placement, own relief, river, underside, access kinds and dwell spans, by V05 §3.18's creation indices (item 476) |
| `sewer` | default | the network stage's routing, connection and `pit` draws (II.7.2); the basement access lottery (II.7.3, item 64), keyed by the building's lineage; every draw of the layer's other systems (II.7.6, item 65), keyed by the system's lineage — its part in the arena key — and the element's source; the undercity's existence and size (II.7.5), keyed by the settlement's lineage; the connection stage's links; an underground closure's generators (§7.3 item 9), keyed by the edited entity's lineage — the building's, or an undercity lifeline's neighbourhood `District` — the target's and the event's `seq` (a closure's other generators draw on the concerns of the stage they call, keyed the same way); V04's fixed-key draws (above). The underground stage and the undercity's neighbourhoods draw on the ordinary `plot.*`, `siting`, `siteplan` and `heights` concerns keyed from the underground pseudo-district's or their own lineage (II.7, §6.3) |
| `style.jitter`, `style.crowns`, `style.compass` | default | rerollable. The paint programs and the compass furniture (§8.2, §9.5) |
| `render.instances` | default | rerollable. The instance function (§8.10) |
| `style.random` | 2 | the random-style draw of §8.2: creation index = the `setStyle` event's `seq` |
| `render.stampTiles` | 0 | the stamp-tile library (§8.10): a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index: 0–3 for the class's four tiles, 4 for their shared border band) — with `STAGE_VIEW` and reroll, attempt, epoch and salt 0; read by `@plat/kernel`'s `poisson` builder when `plat/tools/stamptiles/` builds the shipped asset, and in a worker only by the fallback rebuild of a tile whose hash differs |
| `siteplan.mutate` | 2 | geometry. §4.7 S11's designation mutator, keyed by the plot's lineage; an added main slot |
| `use.relocate` | 0 | §4.11's use step on the use's `…/epoch=e` stream |
| `siteplan.entrance` | 2 | geometry. The side, rear and yard door draws and the basement decision of §2.6, keyed by the building's lineage, so re-deriving the entrances after a mutation or a terrain change disturbs no site-plan draw (J-A29.61) |
| `plan.program`, `plan.roles`, `plan.furnish` | 0 | geometry; non-rerollable by salt. `BuildingGenerator.plan` (§2.6), keyed with the rung counters (above); `plan.roles` re-derives what hangs off roles (window demand, door kinds, furniture) |
| `plan.layout` | 2 | geometry; non-rerollable by salt. `BuildingGenerator.plan` (§2.6), F-PLAN's tier 3; keyed with the rung counters; it keeps the wings, the entrances and the stair core |
| `reserve.market` | 0 | geometry. §4.2 S3 (12)'s trade-convergence random term, keyed by the town root's entity key |
| `cut.interior` | 0 | geometry. §4.6's deep-interior draw, one (treatment, reach) pair per deep block, keyed by the block's lineage |
| `cut.stop` | 0 | geometry. The per-face stop threshold of §4.6's first step, one draw of four uniforms per face, keyed by the face's lineage; not retried — a turned frame re-plans steps 2–7 only |
| `works` | 0 | for a Works an epoch starts: keyed by its target's lineage with the epoch's week as the creation index and the epoch component — the start offset within the epoch's span (§4.11 *Works* (10)) drawn first, the duration inside its `WorksTable` row's range second; for a Works a dated change or a scheduled edit starts: keyed by its target's lineage with its given start week as the creation index — the duration alone (J-A67.61) |
| `pin.light` | 0 | geometry. S11's placement of the light sources (§4.7), keyed by the host's lineage with the light rule row as the creation index; a light's flicker is never a stream — a pure function of its render key and the view's time (§8.4; J-A68.61) |
| `raised.reason` | 0 | geometry. The raised-way generator (item 110 (b); §4.3, §4.6; item 290): one uniform per `RaisedReasonKey` (§2.7) with epoch component 0, in the kind order aqueduct, viaduct, elevated — the gate `u < p` at every generation and epoch, the same draw each time, never re-drawn; a raised part's pier pitch where no `spanSpacingCm` is edited, keyed by (the way's lineage, `pitch`) (§2.7's support step (1)); a span's open-or-vault draw, keyed by (the way's lineage, the span's stations `a`, `b`) (§2.7's span rule (3)); V06's `EVO_RAISED` phase draws its gates here |
| `fabric.select` | 0 | V01 §3.12 (S7c's draw); reserved at M1, drawing nothing before M5 (item 340) |
| `hood.dispatch` | 0 | V01 §3.12 (S9b's picks); reserved at M1 (item 340) |
| `hood.template` | 3 | V01 §3.12 (the seed primitives; F-TEMPLATE's redraw rung); reserved at M1 (item 340) |
| `massing` | 2 | geometry. S11's `outline()` and every operator that re-derives S11 on a plot, keyed by the building's lineage (V02 §3.12; item 341) |
| `compose.dormers`, `compose.porch` | 0 | geometry. Keyed with `#wings` (V02 §3.12) |
| `compose.rooms` | 0 | keyed with `#wings` and `#rooms` (V02 §3.12) |
| `village.plan`, `village.density`, `village.palisade`, `village.track`, `village.open`, `village.slot`, `village.fields` | 0 | the village product's stages (V07 §3.14; item 344); `village.track` rerollable |
| `walls.condition` | 0 | S3's and S7's generation-time condition of each enceinte run (§7.7 DR41, item 114 (d); a village palisade's in VS3, V07 §3.4 (8)): keyed by the enceinte's lineage with the stretch's index along the trace (V06 §3.7.2 (2)'s cut at `walls.dismantleStretchM`) as the creation index — one uniform choosing the run's condition by V11's `walls.condition` generation shares, then, for a `patched` run, one choosing its material among the `walls.patchMaterials` rows admitted for the enceinte's kind and culture by weight; no draw while `walls.condition.atGeneration` is false, and none under history-first generation, whose replay gives the condition (V06 §3.7.7 (5)) |
| `plan.damage` | 0 | geometry-free; non-rerollable by salt; epoch component 0. Item 123's damage thresholds (§6.3 *Plan damage*): one uniform per plan element, keyed by (the building's lineage, the element's id) at the stage id its `plan.*` concerns carry, no rung counter, reroll or salt entering — fixed for the element's life, never re-drawn; read by every reader that draws a plan's damage: §2.6 step 7's damage layer, V03 (the plan's drawing per state, its exports, the panel lines), V02 (the exterior), V04 (cellars, crypts and underground buildings), §8.6 and §11.1 |
| `view.weather` | 0 | view only; non-rerollable. The weather timeline (item 124; *The weather stream*, below): keyed from the session seed by the spell index, never from the seed key; the spell's marks (§8.2's *Weather effects*: positions, lengths and sways) on further keys of the same concern — the spell's entity key folded through the one mixer with the frame's world-aligned cell as structured components — so a mark stays put while its spell lasts; read by §8.4's per-frame weather layer and §8.2's effect marks, which §8.8 places above the tiles — never by a stage, a digest, a tile key or an export |

  The geometry floor of item 31 draws nothing and adds no concern, and neither does the interior ladder (item 28 (f)):
  each step of a re-cut along it is its own derivation of the rung on the same four `plan.*` concerns under the rung's
  lineage and counters, keyed by the step's target — its ladder row and household count — as the creation index of
  §6.3's lineage key, so a step's draws are a function of what it cuts toward and never of when a click, an epoch or a
  `relet` reached it (§7.3's canonical prior; J-A28.63). Every chance entry of §7.7's derivation table names a concern of
  this registry or "none". The **variations** of a
  derived fill (§7.3 item 10) are its scope's next distinct rerolls, derived on the dry run's overlay; the one accepted
  commits as a `regenerate` with that absolute reroll, so no component is added.
* **The history replay** (g item 113; §4.11, V06). A settlement generated from its history runs its coarse epochs on
  the concerns of the stages each epoch runs, keyed as those concerns' rows state with the replay's epoch component
  (above); the replay reads the history as recorded input (the dossier's history facts through DR36–DR39, §7.7, or the
  blueprint's history option, §4.2 S0), so one seed and one history replay byte-identically, and it adds no concern.
* **Distinctness:** a CI test asserts that every stream key and every lineage hash in a B-CITY city **and in a
  sky-island fixture** (two islands carrying districts, underground tunnels) is distinct; the birthday bound is
  negligible (2¹²⁸ for stream keys; ≈ 3 × 10⁻¹⁰ per city of 10⁵ entities for the 64-bit lineage hashes, and §6.3's
  collision rule covers even that) — the test guards the encoder, not the arithmetic.
* **Draw helpers:** `u32`, `float01` (`(u32 >>> 8) · 2⁻²⁴`), `int(lo, hi)`, `bool(p)`, `normal()` (Irwin–Hall of 12
  uniforms — no transcendental in the RNG layer, G-R12; the NG roof jitter's 6-uniform pseudo-normal is a style-time
  helper), `bell4()` (the folded bell `|(u₁ + u₂ + u₃ + u₄) / 2 − 1|` on [0, 1], whose mean is seven thirtieths — the
  stop test's draw), `mean3()` (three uniforms averaged, for §4.6's position and corner draws), `fuzzy(f)`,
  `weighted(table)`, `deck(table)` (draw without replacement — MFCG 12710731's deck selection idea). The helpers draw
  uniforms only; every power of a draw (`(e_hi / e_lo)^g`, `4^u`) goes through `dmath.pow` (§6.5 (3)).
* **Decoration** draws are §8.10's (the render key and the instance ordinal, never the LOD band), so nothing
  re-scatters with zoom. Nothing is stored except the user's instance overrides (`instance` events, §7.1) and the
  current positions of positional overrides in the entity's override table, which a warp or a vertex move carries with
  the ground (§7.4).
* **The weather stream** (g item 124; J137). The weather effects' timeline (item 124 (b)) is the one stream not keyed
  from the document: it draws on `view.weather` (the registry) from a **session seed** — a u32 the app takes from the
  platform's random source, outside the model packages (§6.5 (3)), once when a map is opened, holds in session state and
  never saves: never in the document, a link, the log or an export; a test fixes it. Spell i's entity key is the four
  32-bit-lane finalisers (as for the seed key) over (the session seed, i), its stream key the one mixer's round with
  `STAGE_VIEW`, `view.weather` and reroll, attempt, epoch and salt 0. Its marks draw per world-aligned cell on the
  spell's entity key folded with the cell (the registry row). Its uniforms draw, in order, the clear gap before it as a
  unit exponential E = −ln(1 − u) (`dmath.log`), its kind and its length (V11 §3.25.11's reading of the columns). The
  gap is spent at the live rate: from the end of spell i − 1, or the map's opening, the clear time runs until the
  integral over view time of R(t) ÷ 3 600 reaches E, where R(t) is the summed rate of the kinds live at view time t —
  each kind's `perHour` × V11's site factor, the sites read from the model at the view's head. A kind is live at a
  moment when its band in the climate row's weather cells holds §2.9's `yearWeek` and, under `light: 'time'`, its
  `hours` hold the view's hour (§2.9's `time` key). So a time with no live kind (R = 0) spends none of the gap and
  brings no spell, and a change of the year position, the climate row, the sites or the hour changes the rate from that
  moment, the drawn E kept. The kind is drawn when the spell starts, kind k with chance its rate ÷ R at that moment (the
  rates that spent the gap's last part), and the length uniform in that kind's `lengthS`. A spell's kind and length are
  fixed once it starts; a change acts on a running spell only through §8.2's hard rules (a `snow` spell on a row where
  snow cannot fall draws nothing). **Start a shower now** (V09) starts a spell of the commonest live kind at once as the
  next spell index, its length drawn there, the press held in session state — the commonest kind as V11 §3.25.11 defines
  it (the live kind of greatest rate after the sites' factors, at that moment); at a moment with no live kind (R = 0) a
  press starts none, and V09 disables the button there with its reason (§7.8: never a silent no-op). Switching the
  effects off draws nothing and stops no clock. The timeline is therefore a pure function of (the session seed, the
  view's time since the map opened, the climate row, year position, sites and view hour in force at each moment, the
  presses), and a test that fixes them replays it exactly (T124-9; §6.5 (9)). No stage, model stream, digest, tile key
  or export reads it, and it reads none; the `weather` view key — the seasonal cover (§2.9) — draws nothing from it;
  item 124 (c)'s two hard rules (no snow, falling or lying, where winter does not freeze; rain rare in arid country) are
  the climate columns' (V11) and §8.2's, never a draw's.
* **Enter** creates a **new document** with seed (seed + 1) mod 2³² (a `Seed` is a u32, §2.9) and the same recipe —
  params, intent, the district intents (`districtIntent`), entry mode, table pins, packs — without edits, locks, map
  assignments or salts. The dossier is kept: the new document's creation prefix holds one `creation` `assign` event,
  carrying its `DossierRef`, per live dossier-backed assignment of the current document — the assignment as the
  dossier's live events leave it (each live dossier `setAttr` on the element written into the copy's matching
  `Assignment` field: `name`, `function`, `shapeClass`, `knownTo`, `drift`), without `placed`, `target` or `use`, which
  name the old town's entities — so every dossier element is present from the start, as the dossier now says it (item
  20 (c), item 22 (d), §7.7 *One path*). Rejections and positive placements, which are map edits, are not carried. When
  the current document has edits the app first warns and offers to save it (J-DET-53).
* Seed-exact parity with the references is not a goal (§1; `docs/CONFIDENCE.md` §1).
=== END ===

=== REPLACE ### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated) ===
### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels,
households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when
an entity is re-derived.

* **Lineage key** = (arena key — layer and part, §2.2 —, the derivation unit's lineage hash, stage, creation epoch,
  creation index, the derivation unit's reroll[, dup]); `lineageHash` is its 64-bit hash, cached in the arena. The
  **derivation unit** is the entity whose derivation run created this one, declared per stage in the registry: the town
  for S4 routes (in destination order) and S6 districts (in seed order); the growth stage for S5 ways (in acceptance
  order); the L1 cell a way split, for new cells (split ordinal); the cell for S8 blocks and lanes; a template's seed
  ways and plazas take the stage id `S8.seed` (§6.1; item 345), so no seed's lineage key can equal a lane's of the same
  cell; the block for S10 plots and alleys; the plot for S11 buildings, yard parts and households; the household for
  people (member ordinal); S6's run for `Seam` records (creation index by the run's lowest-then-leftmost vertex); the
  S5c growth run, the district's S8 run (for `baseLane` portals) or the creating edit for portals; the parent surface
  district for an undercity neighbourhood (II.7.5), whose district's lineage continues its parent's; the system for its
  galleries and chambers (II.7.6; its part in the arena key); the connection stage's run for links (creation index by
  the pair's canonical order); the host for a light source (its light rule row and its ordinal along the host — a door
  light's entrance ordinal, a street light's ordinal along its way strip — as the creation index; §4.7 *Light sources*
  (1)); the target for a Works (its start week as the creation index); the creating edit event (its `seq`) for
  anything a user draws or builds; for any other kind (cells and junctions made by a growth commit, walls, water
  bodies, bridges, greenery), the stage run that created it. The **creation index** is the deterministic creation order
  of that unit's run, or the canonical order the stage declares (for faces and vertices: by their lowest-then-leftmost
  lattice point). `StageDecl.lineageUnit` (§4.12) names each stage's derivation unit by its kind:

  ```ts
  type EntityKind = string;   // a type of §2.8's entity registry, as Identity.kind and an address's `kind:` prefix spell it ('cell', 'block', 'plot', 'building', 'household', 'district', 'system' …), or a run unit: 'town' (the town root), 'run' (the stage run that created the entity, its creation index the run's canonical order) or 'edit' (the creating event, its `seq`)
  ```

* **Address id** = `kind:token`, prefixed `<layer><part>/` outside the ground layer — the island's part on the sky
  layer (item 203), the system's part on the underground layer, the sewer network's part 0 written bare (`sky2/plot:…`,
  `under/tunnel:…`, `under3/gallery:…`); a part number is part of the address and, like it, never reused (§3.4,
  J-A65.31). For a generated entity the token is the base-32 form of its lineage hash at creation (13 characters); for
  a user-created one it is the hash of the creating event's `seq` and its ordinal — the pieces a closure creates (§7.3
  item 9, item 66) and the entities a sugar event's expansion creates (§7.1, item 101) are user-created entities of
  their event, their ordinals in the closure's dependency order and the expansion's order. The address is opaque: the
  parent is a field and is never parsed from the id (J-DET-1).
* **Never reused; one collision rule.** Minting runs after the succession matching below. A fresh entity whose natural
  address equals a live address, a tombstone, or an address its own batch retires takes the suffix `~k` with the
  smallest free k. A fresh lineage key equal to that of a live entity outside the batch's re-derived set (a survivor —
  a locked plot, say) takes the smallest free `dup` component, so no two live entities share draws; the entities the
  batch itself replaces are not collisions, which is what lets a faithful Regenerate (keep settings) re-mint their
  lineage keys, match them by anchor and reproduce them exactly. Collisions are resolved in the batch's canonical order
  (records sorted by lineage hash), so the session and a replay resolve them identically. An address that an `undo`
  withdraws (§7.4) is free again, but only the same derivation — the same unit, lineage and reroll, which is what a
  `redo` or a repeated New random re-runs — can mint it, so nothing is re-bound to an unrelated entity.
* **Carry-over — survival and succession.** Whenever a scope is re-derived (regenerate, Adjust, re-derive from Sk, a
  local operator of §7.3, template replacement, migration, an epoch, the history replay):
  - an entity that is **not re-derived** — outside the invalidation set, a fixed input (locked, pinned, edited,
    assigned or declared, §7.2), or merely re-parented — **survives**: it keeps its address and its lineage (so its
    draws do not change); only its `parent` field and a `reparent` lifecycle event change;
    - the kept parts of a designation mutation (§4.7 S11), the rooms a re-cut of a stored plan keeps along the interior
      ladder (item 28 (f), §7.3) and the standing fabric of an epoch — a vacant, derelict, ruined, cleared or reused
      building, a neglected, breached or superseded enceinte, a silted, caved-in or sealed tunnel, a waning or settled
      island (§4.11, II.6) — survive in exactly this sense: address and lineage kept, their state a lifecycle change; a
      `reuse … build` successor raised on a cleared trace succeeds it at the trace's address (`supersede`), regrowth on
      an old plot re-uses the plot's address, and a `raiseIsland` mints the island's arena key and lineage from the
      town's lineage, the slot index and the epoch component, so the same history raises the same island (item 8;
      J-A8.61); a use (§2.7) keeps its own address as it moves — its anchor is (its plot's address, its role) — while
      the building it leaves keeps its own (item 17); the parts a mutation adds are user-created entities minted from
      the causing event's `seq` and ordinal (below); a dossier-backed assignment is a fixed input like any assignment,
      so its element survives every re-derivation of the ground under it (§7.7);
  - an entity that **is re-derived** is matched to the fresh entities by its anchor: the fresh entity with the same kind
    and class family whose anchor lies nearest within the kind's hysteresis radius **succeeds** it — it takes the old
    address and the old generated name with its naming record (every reference re-binds to it; §7.3 item 4 decides which
    overrides move with it) and keeps its own fresh lineage (its draws are the new ones: New random really re-rolls); a
    `carry` event records the lineage change, and the same batch re-owns the successor's faces and roles under the
    address (`setOwner`, `retypeEdges`, §3.4), so geometry and address move together;
  - an old entity with no successor becomes a **tombstone** in the archive (§2.8) whose `supersededBy` names the fresh
    entity covering its anchor point, if any; a fresh entity with no predecessor keeps its fresh address;
  - lifecycle events are written only for changes (existence, flags, a lineage change, supersession, re-parenting), so
    a re-derivation that reproduces its entities exactly leaves the model digest unchanged (J-DET-2).
* **Names follow the address, and follow their inputs.** A generated name — its text and short form — is handed to a
  successor with the address, together with its naming record (§2.8: the naming slices its last draw consulted and the
  salt it used), as a lock or an assignment is; so the bridge a river edit re-sites, the street a New random re-cuts and
  the district a boundary edit regroups keep their names. S13a **draws** a name only in five cases:
  1. for an entity with no predecessor, with the town salt;
  2. for every unedited name under a town-wide `rerollLayer(naming)`, with the new town salt;
  3. for the entities an ids-scoped `rerollLayer(naming)` lists (§7.1), each with its per-entity salt: the dry run gives
     each listed entity the salt one above the largest its name has been drawn with (the town salt and every earlier
     ids-scoped salt the log gave it), and a re-drawn name equal to the old one advances that salt by §5.1 (6)'s
     advance rule; the event stores the salts actually used, so a replay repeats neither the choice nor the advances;
  4. for an unedited generated name whose **naming inputs changed**, with the salt its naming record holds. Case (4)
     runs whenever S13a runs over the name's entity: after an `adjust` of the pack list (a pack added or removed, a
     corpus selected or deselected, §7.6); after an `editTable` or `editPreset` that changes a naming slice (§7.6); in
     an upgrade's mapping (§7.5); in a `frozenImport` rebase (§2.9 step 2), over every unedited generated name; at the
     event that ends the name's protection — an `unlock` or an `unassign` that frees it, or an `undo`, `redo` or
     `revert` whose result removes the `setAttr`, `lock` or `assign` that held it (§2.8's dormant record); and in any
     re-derivation whose scope reaches S13a. It compares every slice the name's naming record cites with the current
     effective tables, and a slice whose hash differs, or that no longer resolves (a deselected corpus, a removed row),
     re-draws the name;
  5. at an epoch, for a district whose identity row changed at that epoch's character step (§4.5, item 72 — a change the
     identity's hysteresis already filtered): its unedited generated name is re-drawn on its `naming` stream with the
     renaming epoch's component (§6.1) and the salt its naming record holds, the old text moved to
     `District.nameHistory` (§2.5); a protected name — a `setAttr`, a lock, an assignment, a dossier naming claim
     (§7.7 item 16, item 82) — is never re-drawn, its naming record staying dormant (§2.8). The rename is listed in the
     epoch's report (§5.4) and stored in the event (`EditBase.renames`, §7.1) like case (4)'s, without a confirmation:
     an epoch is the history's own step (§4.11). A replay re-draws it identically (J-A72.62).

  Each field of a culture or ancestry row is its own naming slice (§7.6), and a name's record cites only the fields its
  draw read, so selecting another corpus for one field re-draws exactly the names drawn from that field: a street list
  chosen for a culture renames that culture's streets, never its districts or quarters. So **a carried name is kept
  exactly while its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that lost
  its gate) is not a naming input and renames nothing (§9.6) — in generation and in every edit; only case (5) renames a
  district at an epoch, and only past its identity's hysteresis. Every draw uses the entity's `naming` stream — keyed
  from its entity key (§6.1) with the salt of its case and the attempt — and writes the name's naming record anew.
  **Case (4)'s renames are confirmed like fates** (the one statement; §7.3 item 4 and §7.4 cite it as "case (4)"): the
  dry run lists each, old and new text side by side, in the edit's fate report with its other unprotected
  consequences; the edit commits after the user confirms them (an action whose dry run lists any returns `confirm`, a
  `frozenImport` rebase included), and the confirmed renames are stored in the event (`EditBase.renames`, §7.1). A
  replay or a receiving client re-draws them identically, because the draw is a function of the stream, the salt and
  the inputs at that log position; one that computes different renames reports a mismatch under §7.3 item 4's rule. A
  user-set name (`setAttr`) is an edited attribute, a locked name path a fixed input and an assigned name held at its
  assignment (§7.7); none is re-drawn while protected, and each keeps its naming record dormant for the event that ends
  the protection (§2.8). When carrying or a re-draw brings two equal names into one uniqueness scope (§9.6 — a district
  merge that joins two lanes of the same name), the entity whose address sorts later re-draws on its own stream, and
  the rename is listed in the edit's fate report (J-DET-37, J-DET-46).
* **Anchors and hysteresis.** Matching is by distance, never by quantised cell: candidate (old, fresh) pairs within the
  radius and of the same class family are sorted by (distance, old id, fresh id) and assigned one-to-one greedily in
  that order, so coincident anchors resolve by id. An overlap-anchored entity of zero length or area never reaches
  matching — the kernel refuses it first (§5.1 (9)).

| kind | anchor | radius | class family |
|---|---|---|---|
| plot | its highest-class frontage: (way address, start offset along the way) | 0.5 m along the same way or its successor | use family (residential, commercial, institutional, agricultural) |
| building | footprint centroid | 0.5 m | building class family (a table row: small dwellings; halls and manors; religious; workshops and stores; towers and keeps; …) |
| yard part (§2.5) | (its plot's address, its part kind, its ordinal in the site plan) | the same plot | part kind |
| block, cell | centroid | 2 m (block), 5 m (cell) | — |
| `Frontage` record (§2.5) | (its block's address, the address of the way it fronts); its split by a stretch conversion below | the same block and way | — |
| district | its seed feature's address | same feature | district kind family |
| way | its end junctions' addresses; else overlap ≥ 50 % of its length | — | way class family |
| `Corridor` record (§2.4) | its way's address | the same way | — |
| junction, gate, tower, pin | position | 1 m (junction, pin), 2 m (gate, tower) | kind |
| castle (§2.7) | its claim's centroid | 2 m | — |
| decoration (§2.7) | (its host face's owner address, its rule row, its ordinal) | half its row's spacing from its recorded point | decoration class |
| bridge | its deck's midpoint, on the same river (the water body's address or its successor) | the crossing-site search band of §4.2 S1 (5) (`crossing.searchBandM`, a cell of the base settings row, V11 §3.1) | kind (bridge, ford) |
| enceinte, water body, greenery, land use | overlap ≥ 50 % (IoU) | — | kind |
| household, person, label | (plot address, ordinal); (household address, ordinal); target address | — | — |
| use (§2.7) | (plot address, role); a relocation moves it by its event (item 17) | — | use class family |
| institution (§2.7) | its binding key when dossier-backed (§7.7 item 12); else its use's address | the same key or use | institution kind |
| base wing (§2.6; V02) | (its building's address, its key); after a re-derivation, by role, then its ridge midpoint in the building's frame (item 346) | 0.5 m | wing role |
| room of a stored plan (§2.6) | centroid within its wing, per storey — for a wing standing on another (V02's `BaseWing.on`), per its storey counted from its first level (`s − s₀`, V03 §3.3); the address's level part records the level at minting and is never re-read as the storey (item 347) | 0.5 m in the wing's frame | any role: a re-cut along the interior ladder keeps a room's address on its ring even when its role changes, an owner's parlour becoming a family's room (item 28 (f), §7.3) |
| entrance (an indexed vertex role `('entrance', building, i)`, §2.2 rule 7) | carried with its wing by `carryWings` (§2.6); re-matched by (wing, side, offset) when the wing is re-derived | half the side's length | entrance role |
| passage (§2.5, item 30) | (its front plot's address, its kerb end — the midpoint of the passage face's edge on that plot's frontage kerb) | 0.5 m along the same kerb | — (one family) |
| access point (II.7.4, items 12 and 64) | (its element's address — the tunnel, gallery, chamber or underground building it reaches, in its part — and the position of its `('access_point', id)` vertex on that element's kerb or wall) | 1 m | `AccessPoint.kind` |
| tunnel, gallery (§2.7, II.7, II.7.6) | its end junctions' addresses; else overlap ≥ 50 % of its length, in its own part | — | `Tunnel.kind`; the gallery's system kind |
| chamber (II.7.6, item 65) | its floor face's centroid, in its own part | 2 m | the system kind |
| underground link (II.7.6, item 65) | its two ends' element addresses | the same pair | `UndergroundLink.via` |
| undercity neighbourhood (II.7.5, item 65) | its parent surface district's address and its void system's part | the same parent and part | — |
| light source (§2.7, item 68) | (its host's address, its light rule row, its ordinal along the host) — a door lantern by its building and entrance, a street light by its way strip and ordinal | 1 m from its recorded point | the light kind |
| Works (§4.11, item 67) | (its target's address, its start week) | the same target and week | the Works kind |
| condition overlay, deposit site, power relation (§2.7, item 88; staged, empty in the base) | its binding key (§7.7 item 12) | the same key | the record kind |
| sky island (II.6, item 10) | its slot: the key `raiseIsland` mints from the town's lineage, the slot index and the epoch (J-A8.61) | the same slot | — |
| sky access (V05) | (its island's address, its role, its ordinal) (item 476) | the same island | `SkyAccess.kind` |
| seam (NF-P6) | its two districts' addresses and its first chain's address | same pair and chain | — |
| portal | position | 1 m | portal kind (`baseLane`, growth, edit) |

  *Split through an anchor:* the child left of the directed cut keeps the id (§3.6 (5)). *Households and people:* a
  household's address survives a re-derivation of its plot by succession (anchor: plot address and ordinal), so a
  person's key — (household address, member ordinal, birth epoch), §10.3 — is stable wherever the household is.
  *Bridges:* when S1's water operator re-sites the crossings of an edited reach (§7.3 (b) 2), each old deck is succeeded
  by the re-sited deck nearest its old midpoint within the band, so the bridge keeps its name, its assignment and its
  way's reference. *Measurement (M1, B-EDIT-lite):* 1 cm perturbations of every vertex keep ≥ 99.9 % of addresses.
  *Pre-decided fallback:* the building and plot radii double to 1 m and an IoU ≥ 0.5 test joins the class-family check.
* **The matching routine, its budget and its fallback.** One routine hands addresses on in every re-derivation —
  scoped regeneration, Adjust, Re-derive from Sk (from S1 the whole town is re-derived and matched), a local operator,
  template replacement, epochs, migration and the upgrade mapping of §7.5. *Point-anchored kinds* (plots by frontage
  offset, buildings, blocks, cells, junctions, gates, towers, pins, the castle, decorations, bridges, passages by kerb
  end, access points) are matched through a uniform grid per (kind, class family) whose cell is the kind's hysteresis
  radius, so every candidate of an old entity lies in its 3 × 3 cell neighbourhood; candidate pairs are collected,
  sorted by (distance, old id, fresh id) and assigned greedily. *Overlap-anchored kinds* (ways and tunnels without
  matched end junctions, enceintes, water bodies, greenery, land use) take their candidates from the kernel's spatial
  index (§3.3) and compute the overlap on those candidates only; a sky island is matched by its slot, a staged dossier
  record or a dossier-backed institution by its binding key, and a key-anchored kind (yard parts, `Frontage` and
  `Corridor` records, base wings, sky accesses) by its key, no distance read. *Budget:* ≤ 2 µs per re-derived
  point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of §12.6. Measured on
  synthetic anchor sets (Apple M1, Node 24; `docs/validation/bench/fixall_det_r2_match.out`): 0.60 µs per entity for a
  450-building district regeneration, 0.59 µs for a 30 000-entity CITY re-derivation (0.38 µs when the fresh town is
  unrelated to the old one) and 0.59 µs for an 80 000-entity METROPOLIS mapping at a 2 m radius. *Measurement (M0 d,
  then M1 on B-EDIT-lite and a Re-derive-from-S1 fixture):* the routine inside the engine, on real anchors, per kind.
  *Pre-decided fallback:* matching runs per static-index partition (§3.3) — each old entity's candidates are first
  taken from the fresh entities of its own district's partition, and only the entities left unmatched are matched
  across partitions — which bounds every grid by one partition; because an entity near a district boundary can then
  take a farther candidate inside its own district, the switch is a declared shift (§6.4).
* **JOIN and SPLIT — the address by the anchor, the lineage continued (item 31 (c); J-A31.73).** A joined plot takes its
  address by the anchor rule from the member whose frontage anchor it keeps; the other members become tombstones with
  `supersededBy` = the joined plot, and `members` is history. Its **lineage** is not fresh: the fused plot continues the
  lineage key of its largest member by area (ties by address id) — the exception to J-DET-2, which gives a re-derived
  successor the address only — so the streams of its buildings and yard parts continue from that member's and the same
  seed under the same history re-cuts the same fabric; the epoch component of every draw (§6.1) keeps an epoch's re-cut
  distinct from the parent's original draws without breaking the tie to them (the owner: modifications of the original
  seed, not new rolls). A SPLIT keys each child by the parent's lineage key with the child's index as its creation
  index: the child that keeps the parent's frontage anchor keeps the address and the others take fresh addresses; every
  child takes the continued lineage, the parent's lineage key with its child index; a later SPLIT **resurrects** a
  member whose anchor matches — the one permitted reuse of a tombstoned id, recorded as a `resurrect` event, safe
  because a JOIN's member ids were never given to another entity — and the resurrected member takes its address from the
  tombstone, its lineage from the parent and the child index, and its `builtBand` (§2.5) from the rung-3 event that
  re-cut it, never from the tombstone's last record; only an `undo` restores that record exactly (§7.4). A **tunnel
  record** split by a stretch conversion (II.6, J-A11.43) follows the same rule, the centreline's first vertex standing
  for the frontage anchor: the part holding it keeps the address, the other parts take addresses minted from the
  causing event's `seq` and ordinal, and every part continues the tunnel's lineage with its part index. A block's
  `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the
  record's first kerb edge in the centreline's order keeps its address, every other part — two where the record spans
  a whole interior stretch — takes an address minted from the causing event's `seq` and ordinal, each part continues the
  record's lineage with its part index, and an `undo` restores the one record (§7.4). A mutation continues lineage; only
  a re-derivation takes a fresh one — New random, and every successor the matching above gives in a re-derived scope
  (Adjust, Re-derive from Sk, a local operator of §7.3, template replacement, migration, what an epoch re-derives)
  (J-DET-2).
* **Plan damage — one threshold per plan element, no new id (g item 123; J136).** Each plan element of a building — each
  wall run (an outer wall or a partition), floor area, door, window, stair, roof bay over a room and furniture piece,
  and below ground the cellar's and the crypt's kinds (V04) — draws ONE uniform u on `plan.damage` (§6.1), keyed by (the
  building's lineage — an underground building's own; a cellar's or crypt's element the building above's —, the
  element's id): the id's parts — its element kind and V03 §2.2's plan-part id (`wall:`, `op:`, `win:`, `core:`,
  `furn:`); a floor area, the roof bay over a room, a choir flight and a `cellarVault` by their room's address; a
  `cryptVault` cell by its room's address and its grid node, the one `cryptVault` of a crypt whose ring holds no cell
  centre by its room's address (V04 §5.6 (2)) — folded into the key through the one mixer as structured components,
  never a string, with creation epoch and epoch component 0 and no rung counter, reroll or salt, at the stage id its
  `plan.*` concerns carry (§6.1). Its **threshold** is t = lo + u · (hi − lo), [lo, hi] its element kind's range (V11
  §3.25.10's `damage.elements` row: outer walls and ground floors late, partitions and upper floors early; item 123
  (c)); the walls material acts only through the decay level's rate (V06's `decayLevel`, V11's `damage.materials`). The
  draw is §6.1's fixed-key draw in all but persistence: fixed for the element's life, never re-drawn, minting no id and
  moving nothing, and compared, wherever a reader draws the plan, with the building's **decay level** (V06's
  `decayLevel`, derived and never stored; §2.6 step 7): the element shows damaged exactly while the level is above 0 and
  at least t — a level of 0 damages nothing, so a building never decayed draws its plan unchanged (`item123.damage`)
  whatever its kinds' ranges. Damage is therefore monotone in the level (a higher level's damaged set contains a
  lower's), never relocated, and leaves in reverse threshold order as a restoration lowers the level. Every room, wall,
  opening and id is the intact plan's (T123-1); for a seed, each element breaks at one level on every engine (T123-3;
  §6.5 (9)). An element a stored plan's re-cut mints (V03 §3.11) draws by its own new id; a kept element keeps its id
  and so its threshold.
* **Dossier bindings never re-key (item 74).** A dossier re-binding (§7.7 item 12) re-points a binding row of
  `Document.dossier` and never re-keys a map address: the element's records keep their ids, lineage and geometry. A
  dossier name change that carries no receipt is a removal plus an addition (§7.7 item 12), and the addition mints
  nothing until the solver places the new element, from its placing event's `seq` (above).
* **Document identity.** `docId` (a UUID) is minted when a document is created, or taken from the host when it passes
  one (§11.2; item 459), kept on save, and re-minted on clone and save-as; addresses are document-scoped, so a clone
  keeps them. At the API and bridge boundary every id is rendered `<docId>/<id>`, so a host holding two towns never
  confuses their plots. Exports carry addresses and a supersedes table (tombstone → successor).
* **Workers** merge results in lineage order, never arrival order (the one statement; §6.2 and §6.5 (6) cite it).

**The scope of stability, stated** (O2 b, e):
1. *Independent concerns* — adding or changing a concern (a decoration layer, a name grammar, label rules) changes no
   other concern's draws; changing a naming input re-draws only the names whose records cite it (case (4) above).
2. *Scoped rerolls* — New random on a scope changes nothing outside its effective scope (§7.3).
3. *Upstream changes* — a change to stage k's code or tables changes stage k's outputs and, through their lineage and
   inputs, what is derived from them: a declared cascade shift (§6.4, §13.3), never a silent one; stages upstream of k
   and independent of it stay byte-identical.
4. *Edited documents* — stability across such changes comes from carry-over by anchor and from migration (§7.5), never
   from stream keys.

*Measurement (M0 d and M1):* minting and matching within the budget above; B-EDIT fixtures for `drawBoundary`, district
merge and split, `outskirtToDistrict`, regenerate around a lock, a course-knot move that re-sites a bridge (the bridge
keeps its address and name), New random on a district (every matched successor keeps its name; only entities without a
predecessor draw one), a district merge that joins two equal lane names (the later address re-draws, reported), and the
recycling case (a superseded, assigned building whose creation slot is reused) — 0 duplicate ids and 0 silent re-binds
(every reference resolves to its successor or is reported). The naming-input fixtures are §13.2's.
=== END ===

=== REPLACE ### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10) ===
### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

1. Topology is §3.2's (integer centimetres, exact predicates).
2. Fields, costs and weights are IEEE doubles; `+ − × ÷` and `Math.sqrt` are exact by specification; every other
   real function goes through `dmath`, the vetted fdlibm port (§3.1; D-23).
3. **The lint is an allowlist.** In model packages — and in every adapter or provider whose output reaches the model —
   the only `Math` members allowed are `abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32, fround`,
   plus the arithmetic operators. The allowlist also holds for the view code whose output reaches a bit-compared
   digest: `@plat/labels`, every implementation of `ObstacleSource` and `RoleIndex` (§14), the functions they call, and
   the S14 builder code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`,
   `layer`, `z` and the symbol extents computed from the style sheet's sizes (a rotated symbol's extent uses `dmath`) —
   and §8.10's instance function with every function it calls (the stamp, grid and line layouts, the per-instance look
   draws and the density edge test), which the model-format exporters and override resolution run in the generation
   worker and whose positions §13.3 compares byte for byte across engines; and the CPU reference light pass of §8.4 with
   every function it calls (item 68) — its buffers and light values are compared byte for byte across engines by (9)'s
   lighting test, while the GPU implementation, held to it by a tolerance, stays outside (J-A68.62); and the weather
   stream's timeline function (§6.1 *The weather stream*: the spell draws, the gap's exponential through `dmath.log`,
   the rate integral, the kind's pick and the length) with every function it calls, whose spells (9)'s weather-timeline
   test compares across engines (T124-9). CI finds that code as the import closure of those implementations, column
   writers, the instance function, the CPU reference light pass and the timeline function, from the TypeScript program,
   so a module that joins it is linted without being listed; the rest of `@plat/render` — paint programs, backends,
   compositing — stays outside, because its output is pixels compared by visual regression (§13.3, §13.4).
   `**` is allowed only with a literal integer exponent from 0 to 4, and the build rewrites it into explicit
   multiplications (exponentiation is implementation-approximated in JavaScript); every other power goes through
   `dmath.pow` (S1's river-width law `w0 · acc^0.4` is `dmath.pow(acc, 0.4)`). Also forbidden: `Math.random`, `Date`,
   `performance`, timers, `crypto.getRandomValues`, DOM access, locale-dependent string operations (`toLocaleString`,
   `localeCompare`, `Intl`), `Array.prototype.sort` without a comparator, and any dependence on object-key or `Map`
   iteration order beyond insertion order. The lint also enforces §3.2 (8)'s division rule (`ratio()`), and it scans the
   dossier port's adapter boundary (item 73): no module of `plat/` outside `@plat/port`'s adapter folders names a key of
   the host's dossier — the adapter's key list (§14; its field table, V08 §2.4) is the scan's input — so the host's
   vocabulary lives in one folder.
4. **Vendored dependencies are scanned too.** Every third-party library a kernel adapter imports is vendored at a pinned
   version and passes the same allowlist scan at each version change; an audit record (library, version, scan result,
   each exception with its wrapper) is kept in `@plat/kernel`. A library that fails (for example one that calls
   `Math.hypot`) is patched or wrapped in its adapter before adoption.
5. Every sort uses a total-order comparator with an id tie-break (the OS `ObjectMap` key-order hazard cannot occur).
6. Pool workers follow §3.3's overlay-and-merge protocol (§6.3 *Workers*); no result depends on arrival order, and no
   model package reads time (§5.1 (5)).
7. **One boolean and offset engine per output version, on every host** (D-14): no host may silently run a different
   engine; changing the engine is an output-version bump with a declared shift.
8. **Host providers.** Host tables are §6.2's. Host code registered as a provider (`ContentProvider`, §14) passes a
   double-run check at registration — the same request run twice in two fresh workers must return identical digests —
   and its results are recorded in the document's `hostContent` block, keyed by (provider id, version, input hash), and
   read from there on replay (§2.9, §11.4), so the document replays without the host. Setting packs follow the same rule
   through the document's `packs` block (§2.9).
9. **Determinism tests (CI)** — each on one fixture per base rung (§5.1 (10)), with a METROPOLIS fixture at the
   population cap:
   * *cross-host* — identical digests on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, pool
     sizes 0–3;
   * *time dilation* — the golden suite under a shim that scales every clock read × 10 and × 0.1 gives byte-identical
     per-stage digests;
   * *derived-complete digest* — every district's S10, S10b, S11 and S12b and the hinterland unit's (S12b named
     explicitly), derived for 50 METROPOLIS seeds in three random orders with pool sizes 0–3, give identical digests
     (the laziness contract, §4.1);
   * *op-order determinism* (§13.2) and *placement digests* (§13.3);
   * *headless = UI* (O11 f);
   * *replay = session* — replaying base and log gives the session's model digest **and records digest** on every
     B-EDIT sequence (§7.3 item 7 (i)), including the naming-collision fixture of §7.3 item 7 (i), sequences with undo
     and redo from several sessions, edits made during load verification under both choices of a forced mismatch (§2.9
     step 4), and edits made before a records mismatch, re-applied (§2.9 step 3);
   * *truncation identity* — a B-EDIT sequence folded with its undone pairs kept and with them truncated gives the same
     model digest **and records digest** (§7.4), including a redo followed by a user-created entity, whose address must
     be the same in both folds, a `setAttr(name)` + `undo` pair, a `lock` + `unlock` pair and a naming `rerollLayer` +
     `undo` pair, each around a corpus selection — the freeing event re-drawing the name by §6.3's case (4), listed,
     confirmed and stored in the event, and the naming records restored with the names (§2.8) — and a corpus selection
     + `undo`, truncated, saved, reloaded and redone, its pack still in `packs` (§2.9);
   * *links and documents without their inputs* — §6.4's pack, user-corpus, provider and rebased-town cases;
   * *checks under the recording version* — a `keptSnapshot`-rebased CITY document upgraded across a test output
     version whose field driver and digest leaf encoding differ from `from`'s opens editable after a reload and replays
     to the session's digest; a frozen view of a fixture written by a test build labelled o(N−3) opens with no mismatch
     message, while one with a chunk's bytes altered reports damage and refuses the `frozenImport` rebase (§2.9 steps
     2–3, §7.5);
   * the double-run check of registered providers (8), and the distinct-key test of §6.1;
   * *click-order identity* (item 28) — the derived-complete digest extended to the elaboration rungs: for 50 CITY
     seeds, every district's wings and every clicked building's plan derived in three random click orders, under
     `elaborate: 'click'` and `'view'`, with the cache dropped to `absent` between runs, give identical model digests and
     records digests and byte-identical cached results per (entity, rung, input digest) across hosts; a layout re-roll
     leaves the wings, entrances and stair core byte-identical and a roles re-roll leaves every ring and opening
     position byte-identical (§6.1; the B-PLAN fixtures are §13.2's); **the interior ladder** (item 28 (f)) — a building
     whose occupants' band and household count change twice between clicks (a `relet` by hand and a band fall by an
     epoch) gives the same plan, byte for byte, with a click after each change and with one click at the end, and the
     same again with the cache dropped between them; its shell's leaf digest is unchanged by every re-cut; and a return
     to the as-built band and count gives the as-built plan exactly (§7.3's canonical prior);
   * *history determinism* (items 20, 22) — the same seed with the same ordered history of dossier events, rejections,
     positive placements and edits gives one model digest on every host, and two histories that reach one dossier give
     two valid maps whose difference is confined to their events' disruption sets (§6.2, §7.7; the fixtures are
     §13.2's); the history replay at generation (g item 113) is byte-stable per seed and history;
   * *epoch keys* (g item 113) — on a document generated from its history, live epochs folded across 0x8000 (0x7FFF to
     0x8001) key draws none of which equals a replay epoch's (`0x8000_0000 + r`): §6.1's distinct-key test over both
     ranges, the live epochs numbered from 1 after the prefix whatever R, and no lineage key a replay epoch mints
     equal to one a live epoch mints (§6.1's epoch component);
   * *session-history independence* (item 52; J-A52.61) — for 20 seeds, a seed's model digest generated first in a
     fresh process equals its digest when generated after 50 other maps generated earlier in that session and after
     every view toggle and zoom stop: no render draw touches a model stream (§6.1), Enter's successor is (seed + 1) mod
     2³², not a stream's state (§6.1), and no cache is keyed by anything but its content (§8.10's stamp tiles are built
     with the product and content-hashed). The references' mechanisms are the reason the test exists: in MFCG 12710731,
     VG 1.6.9 and NG 1.2.2 the renderer's leftover stream state becomes the following map's seed, and each caches its
     tree-spacing tiles per session; Dwellings (itch 17195045) resets its generator from the clock for some houses;
     Fantasy Manor 1.0.0 build 890 seeds from the page's load time. Ours is independent of the session by construction,
     and the test keeps it so;
   * *dossier fixtures* (item 83, T73-8) — the same dossier fixture of §13.2's B-DOSSIER-lite and the same seed give the
     same model digest on Node x86 and arm64 and in the nightly five-engine run;
   * *works stages* (item 67) — a Works' drawn stage at week w is a pure function of its record and w: the drawing at a
     week, reached directly or by scrubbing weeks forward and back, is byte-identical, and no digest moves (§6.2);
   * *lighting* (item 68) — the CPU reference light pass gives byte-identical light for the same model, lights, view and
     time on the five engines; the GPU pass lies within §13.4's tolerance of it; a light's flicker is a pure function of
     its render key and the view's time (§8.4);
   * *plan damage* (g item 123) — for every building of a B-CITY-lite fixture, its decay level stepped from 0 to 1,
     the damaged elements at each level are byte-identical on the five engines and contain the previous
     level's, each element breaking at the same level for a seed (T123-3); every element id equals the intact plan's
     (T123-1), and a level of 0 draws the plan byte-identically (`item123.damage`; §6.3 *Plan damage*);
   * *weather timeline* (g item 124) — a fixed session seed, view time and set of **Start a shower now** presses replay
     the same spells — kind, start and length — on the five engines (T124-9); a scripted year-position change from a
     week with no live kind into a live week, and back, replays identically on the five engines, a spell starting in the
     live week and a press in the week with no live kind starting none, and so does a view hour crossing a kind's
     `hours` under `light: 'time'` (T124-9); two session seeds give byte-identical model digests and tiles, with the
     effects on and off (§6.1 *The weather stream*);
   * *skeleton round trip* (item 101) — a map's declared subset exported as a skeleton (§11.1) and re-imported under its
     seed reproduces its model digest; a clerk's transcript of tool calls, replayed, gives the session's digest; one
     declaration made on the canvas, through the tool API and in a skeleton file gives one event (the elegance bars that
     schedule these are §13.2's).
10. **Second implementations.** *The WebAssembly accelerator* of §3.7 (J-K8) compiles a hot loop from the same integer
    algorithm as the TypeScript loop it replaces, so it must reproduce that loop's integer outputs byte for byte: a
    cross-implementation test runs the golden suite with the accelerator on and off and requires identical per-stage
    digests. It is output-neutral and moves no golden; the TypeScript loop stays in every bundle. *The Clipper2-WASM
    engine* (§3.7's pre-decided fallback) is a different engine: it cannot reproduce the arrangement engine's integers,
    replaces it as the single engine on every host (7) with a declared golden shift (§3.7, §13.3), is pinned and
    vendored (4) and named in the report (§5.4); its determinism test is (9)'s cross-host one (J-DET-28).
=== END ===

=== REPLACE ### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===
### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session, per document and author (§7.4): its undo and redo stacks; never read by the fold. Every event the dossier port emits carries the reserved session 'host:port', constant, with no group (V08 §3.6 (6); item 359): no user's stack ever holds one */;
  group?: number /* one undo step: every event of one `edit` (or `confirm`) call that carries a group shares it; the engine writes it at commit as the `seq` of that call's first event, whatever number the client sent, so a group is unique in the log and `undo.of` names it (§7.4 Targets) */;
  renames?: Rename[] /* on every event whose fold re-draws a name by §6.3's case (4), and an epoch's case (5) renames */;
  dossier?: DossierRef /* set by the dossier port (`@plat/port`, §14) on every event a dossier change generates through the host door (§11.4): the element's binding key, opaque to the module (§7.7 item 12) */;
  dossierChange?: DossierChange /* set by the port with `dossier`: the change envelope (§7.7 item 13) */;
  proposedBy?: 'clerk' /* item 101: an event a clerk proposed and the user accepted — the author stays the user; the exports' provenance reads it (§11.1) */;
  closure?: ClosureRecord /* §7.3 item 9 */;
  creation?: true /* set by `generate` on the log's creation prefix at positions 0…k (§7.4 Replay semantics); a prefix event keeps its `proposedBy` through `generate`, the skeleton export and its import (V10; item 365) */;
  mutations?: MutationRecord[] /* §4.7 S11's records of the designation mutations the event ran, persisted with it like `renames` (item 18) */;
  disruption?: DisruptionReport /* a dossier event's, a positive placement's or a relocation's consequences as its dry run listed them (§7.7 item 5) */ }
type Rename = { id: Id; from: string; to: string };   // the name's text before and after, as the user saw them; also §5.4's ReportEntry rename
type DossierRef = { element: string; version?: string };   // `element` the binding key of §7.7 item 12, `version` the host's product line; the module reads it, never writes it
type EditId = number;   // an event's `seq`: what a batch's edit scope (`BatchScope`, §3.3) and a seam amendment's cause (II.1) name
type PointsForm = { points: PointCm[] /* the declared anchors: one seed, two to four corners, a source and a mouth, a shore point, or a brush's or lasso's samples */;
  levelCm?: Cm /* water's level form */; spring?: true /* a lake's point-and-level form fed by a spring: an oasis (g item 111) */;
  sizeM2?: number /* a harbour basin's size; for a quarter, its target area, clamped into its kind's size band — absent: the band's median, the grower's default (item 348) */ };   // item 101 (i): the minimal declaration of a shaped thing — the event stores the derived shape, resolved, as its geometry
type Cardinal = 'N'|'E'|'S'|'W';
type Locus = { rel: 'in'|'on'|'at'|'near'; target: Id; side?: Cardinal };   // a roster line's or a place's locus: "in <quarter>", "on the harbour", "at <gate>", "north side of <square>", "near <place>" — item 16's relation templates as hints
type RosterLine = { name: string /* '' for an unnamed place, which S13a names (item 571) */; cls: BuildingClass; locus?: Locus; element?: string /* with a dossier connected: the binding key of the dossier element the line places */ };
type RungKey = string;   // `${Id}#${rung}`: a stage-3 rung's reroll counter in a `regenerate` event's map (§6.1)
interface DisruptionReport { cost: number; budget: number /* the request kind's row, §7.7 */; overBudget: boolean; moved: { use: Id; from: Id; to: Id | null /* null: vacated */ }[]; joined: Id[][]; vacated: Id[]; mutated: Id[]; why: { id: Id; rule: string }[] }
type EditScope = { ids: Id[] } | { ring: PolygonCm; key: PlatKey; level: Level } | { kind: 'shade'; island: Id /* V05: Update shade now */ }
  | { kind: 'people'; households: Id[] /* §10.3's re-derive people: the chosen households' people re-derived, diffed, under the current person tables */ };   // resolved to the effective scope at dry run and stored resolved
type EditFate = { id: Id; fate: 'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string };
type FieldStroke = { path: PointCm[]; radiusCm: Cm; falloff: 'linear'|'cosine'; amount: number /* relative Δ: field units, or cm for terrain; with `mode`, a share 0–1 */;
  mode?: 'flattenTo' /* terrain only: move the ground under the stroke toward `levelCm` by `amount` instead of adding a Δ — the base's one flatten mechanism (item 366) */;
  levelCm?: Cm /* flattenTo's level — absent: the mean ground height under the stroke's footprint, resolved into the event by the dry run */;
  water?: 'locked'|'follow' /* terrain only; default 'locked' (§7.2, §7.3) */ };
type EditEvent = EditBase & (
  | { t: 'lock'; ids: Id[]; paths?: string[] } | { t: 'unlock'; ids: Id[]; paths?: string[] }          // paths: attribute-level locks
  | { t: 'pin'; ids: Id[] } | { t: 'unpin'; ids: Id[] }                                                  // only ever an explicit user action — never emitted by viewing
  | { t: 'moveVertex'; key: PlatKey; at: LatticePoint /* the vertex's position before the move */; sig: VertexSig /* its role signature at the edit, §2.2 rule 5 */; to: LatticePoint }
  | { t: 'moveCourseKnot'; water: Id; ordinal: number /* the knot's ordinal in WaterBody.controls, §2.3 */; at: PointCm /* its position before the move */; to: PointCm }   // a river's control knot is S1's recorded input, not an arena vertex
  | { t: 'warp'; key: PlatKey; fromLevel: 0 | 1 /* 1 by default; 0 also moves water and coast */; strokes: WarpStroke[] }   // one staged warp session, committed on Apply
  | { t: 'drawWay'; points: PointCm[]; class: WayClass /* 'aqueduct' among them, §2.4 */; widthCm: Cm; raised?: true /* item 110 (b): the deck in its own ground arena part (§3.4), its two ends its feet (§2.7's `RaisedWayRecord.feet`), crossing the ways beneath with no junction */;
      walk?: { headingCdeg: Cdeg; class: 'road'|'track'; maxLengthM?: M } /* V07 §4.2: resolved into `points` at the dry run */; key?: PlatKey /* V05: a sky island's arena; default the ground */;
      from?: PointsForm /* two or more points: each consecutive pair routed by S4's router at the dry run (§4.3); with `raised`, by the raised-way course solver */ }
  | { t: 'drawWater'; kind: WaterKind; add: PolygonCm[]; subtract?: PolygonCm[]; line?: PointCm[]; widthCm?: Cm; key?: PlatKey; from?: PointsForm /* a lake: one point and a level, with `spring` an oasis; a river: a source and a mouth; a harbour: a sea level, a shore point and a size */ }   // add rings unioned, subtract rings = land brush (islands)
  | { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind'] | 'retaining'; closed: boolean; highSide?: 'left'|'right' /* retaining only, relative to the points' order; absent: the side whose mean ground within 10 m of the chain is higher */; key?: PlatKey;
      from?: PointsForm /* two or more points: the run derived along ridges and contours by S5a's trace; for a retaining wall, along the slope break nearest the drawn run */ }
  | { t: 'placeGate'; enceinte: Id; at: PointCm; expansion: number }   // sugar (item 101)
  | { t: 'drawGreen'; polygon: PolygonCm; kind: Greenery['kind']; densityPerHa?: number; key?: PlatKey }
  | { t: 'drawBoundary'; polygon: PolygonCm; district?: Id; kind?: string /* the district-kind row that steers a points form's snap */; key?: PlatKey; from?: PointsForm /* one seed, two to four corners or a lasso: grown along block edges (below) */ }   // snaps to whole L1 cells
  | { t: 'quarter'; boundary: PolygonCm /* resolved at dry run */; from?: PointsForm; kind: string /* a district-kind row */; name?: string; band?: string; district?: Id;
      fabric?: FabricStrategyId | 'auto' /* V01: the layout the quarter asks for (item 349) */; terrace?: 'on'|'off' /* V01: the terracing it asks for (item 350) */;
      sky?: { altitudeCm?: Cm; institution?: string /* an IslandInstitution kind */ } /* V05 §4.2: its points are world points */; expansion: number }   // sugar (item 101)
  | { t: 'roster'; lines: RosterLine[]; expansion: number }   // sugar (item 101)
  | { t: 'group'; name: string; quarters: Id[]; expansion: number }   // sugar (item 101): a region label group on §9.1's quarter tree
  | { t: 'terrace'; stroke: FieldStroke; levelCm?: Cm /* absent: the ground height at the stroke's first point */; expansion: number }   // sugar (item 110 (a)): below
  | { t: 'declareEnd'; anchor?: Id | PointCm; boundary?: PolygonCm; kind: VillageEnd['kind']; name?: string }   // V07 §4.2 (item 357): the lasso's plots join the declared end, keyed by the event's address and held
  | { t: 'drawFootprint'; polygon: PolygonCm; cls?: BuildingClass; use?: Id; heights?: Partial<Heights>; key?: PlatKey }
  | { t: 'build'; plot: Id; cls: BuildingClass; use?: Id; footprint?: PolygonCm; heights?: Partial<Heights> }
  | { t: 'moveFootprint'; id: Id; deltaCm: VecCm; rotateCdeg?: number }
  | { t: 'swapUse'; a: Id; b: Id }
  | { t: 'fill'; scope: EditScope; arrangement: SitePlan['arrangement']; cls?: BuildingClass }
  | { t: 'setAttr'; id: Id; path: string; value: unknown }
  | { t: 'setAttrMany'; ids: Id[] /* resolved at dry run */; query?: Query /* what the user asked, kept for display */; path: string; value: unknown }
  | { t: 'paint'; target: 'roofKind'|'roofColour'|'wallColour'; ids: Id[] /* resolved under the brush */; brush: BrushPath; value: string }
  | { t: 'paintGround'; region: PolygonCm; cover: string; colour?: string }                           // a style region (FTG's texture brush) — outside the model digest
  | { t: 'instance'; entity: Id /* or a plan room, `room:<building>/<level>/<i>` (V03) */; ordinal?: string /* for a room: its furniture item's ordinal */; point?: PointCm; op: 'add'|'move'|'remove'|'restyle'; to?: PointCm;
      style?: Partial<InstanceStyle> /* §8.10's; for a room's furniture Partial<{ glyph: string; rotCdeg: number; wCm: Cm; dCm: Cm }> */ }   // an ordinal-addressed event's dry run also fills `point` with the instance's generated position; the first on a room stores the composition (item 374)
  | { t: 'delete'; id: Id } | { t: 'merge'; ids: Id[] } | { t: 'split'; id: Id; cut: PointCm[] } | { t: 'join'; ids: Id[] }   // on plots, split and join are item 31's splitting and fusion; delete: below
  | { t: 'rejectSite'; element: Id /* the dossier-backed assignment or its placed member */; site: Id /* the plot */; op: 'reject'|'lift' }   // item 20 (b): a rejection, never a removal (§7.7 item 3)
  | { t: 'placeAt'; plot: Id /* '' when `from` is given: the plot derived by the dry run and written into the event (item 367) */; element?: Id /* a dossier-backed element or assignment member pinned here */; designation?: Designation /* §4.7 S11: a use the generator controls, designated here */; lift?: boolean; from?: PointsForm /* one point */ }   // item 20 (g): positive placement; lift frees the plot
  | { t: 'setEntrance'; building: Id; op: 'add'|'move'|'remove'; index?: number /* the entrance edited, by its indexed role */; role?: Entrance['role']; wing?: number; side?: number; offsetCm?: Cm }   // item 29
  | { t: 'drawPassage'; plot: Id; from: PointCm; to: PointCm; widthCm: Cm }   // item 30 (c): a covered passage under the front building's ground storey, as §2.5's passage face; sealing and reopening are convert ops (§4.11)
  | { t: 'drawTunnel'; points: PointCm[]; kind: Tunnel['kind']; widthCm?: Cm; headroomCm?: Cm; system?: Id /* item 65: a gallery of that underground system, in its part (II.7.6); absent: the sewer network, part 0 */; from?: PointsForm /* two points: the route derived at the dry run (II.7); item 355 */ }   // items 11, 12: a `tunnel` chain on the underground arena — never a `drawWay` (U2, II.7.3); width and headroom default to II.7.2's profile row, `navigable` derived (§2.7)
  | { t: 'drawChamber'; system: Id | { newKind: 'ruin'|'cavern'|'catacomb' }; polygon: PolygonCm; floorCm?: Cm; from?: PointsForm /* one point and a size, or three or more points */ }   // item 65; with `newKind`, a closure (§7.3 item 9) creating the system with its first chamber (item 361)
  | { t: 'addLink'; a: Id; b: Id; kind: UndergroundLink['kind']; via: UndergroundLink['via'] }   // item 65: a link between elements of different parts (II.7.6)
  | { t: 'addUndergroundAccess'; building: Id; target?: Id /* an element, else the closure's target order (II.7.6) */; kind?: AccessPoint['kind'] }   // item 66: a closure edit (§7.3 item 9)
  | { t: 'placeAccess'; kind: AccessPoint['kind']; role: AccessPoint['role']; ground: PointCm; element: Id /* the tunnel, gallery, chamber or underground building it reaches (II.7.4) */ }   // item 12 (d): a new AccessPoint opening at `ground`, its `access_point` vertex on `element`'s kerb or wall at the nearest point; its underground end moved by `moveVertex` on that vertex, its opening by `setAttr` on `ground.at` (re-hosted by `pointLocate` on the ground's `PlatKey`, `ground.host` rewritten, refused outside II.7.3's admitted ground); removed by `delete`
  | { t: 'placeSkyAccess'; island: Id; top: PointCm /* local; snapped to the rim at the dry run */; foot: PointCm /* world */; kind?: SkyAccess['kind']; role?: SkyAccess['role'] }   // V05 §4.2
  | { t: 'setRoomRole'; building: Id; storey: number; room: Id; role: RoomRole }   // the plan events (item 28; records §2.6's): a role change re-derives what hangs off roles — windows, door kinds, furniture — and moves no wall
  | { t: 'moveWall'; building: Id; storey: number; wall: Id; deltaCm: Cm }         // slides a partition wall along its normal (mergeFaces then splitFace on the rung's transient arena, §3.4)
  | { t: 'splitRoom'; building: Id; storey: number; room: Id; cut: [PointCm, PointCm]; roles?: [RoomRole, RoomRole] }   // splitFace
  | { t: 'mergeRooms'; building: Id; storey: number; rooms: [Id, Id]; role?: RoomRole }   // mergeFaces, never across a wing joint; the surviving role chosen or given, the removed wall's openings dropped
  | { t: 'setOpening'; building: Id; storey: number; wall: Id; at?: Cm; kind: 'door'|'arch'|'open'|'none'; hinge?: 0|1; swing?: Id /* V03 §2.1; item 354 */ }   // an entrance's door moves with its entrance (setEntrance) and is never removed here
  | { t: 'setWindow'; building: Id; storey: number; wall: Id; at?: Cm; op: 'add'|'move'|'remove'; kind?: 'window'|'slit'|'light' /* V03 §2.1 */ }   // exterior walls only
  | { t: 'moveStairCore'; building: Id; core: Id; bay?: PolygonCm; kind?: StairCore['kind'] }   // at least one of bay and kind; the bay on every storey it serves, each storey's partition re-running around it, plan.layout kept where the wing is unchanged
  | { t: 'setRoomUnit'; building: Id; storey: number; room: Id; unit?: Id }             // item 28 (f): the household whose dwelling unit the room belongs to (`Room.unit`, §2.6); absent for a shared, service or circulation room
  | { t: 'setHearth'; building: Id; storey: number; room: Id; op: 'add'|'move'|'remove'; wall?: Id; at?: Cm }   // V03 §4.2 (item 352): the stack re-placed under the rung's rules, each storey it crosses re-cut
  | { t: 'setMassing'; building: Id; op: MassingOp } | { t: 'setComposition'; building: Id; op: CompositionOp }   // stage 3 (V02 §4.1, which declares both ops; item 351); the first one stores the composition
  | { t: 'revert'; id: Id }   // "reset to generated": one undoable event applying, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only; §7.4); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id | RungKey, number> /* absolute, per scope entity — with `rung`, the rung's counter: the rerolls actually used (§5.1 (6)) */; rung?: 'wings'|'rooms'|'plan'|'plan.layout'|'plan.roles'|'plan.furnish' /* item 28: New random on one rung of one building */; discardEdits?: boolean; fates: EditFate[] }
  | { t: 'adjust'; param: string; value: unknown; fromStage: StageId; fates: EditFate[] }                 // Adjust, and Re-derive from stage k
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'|'terrain'; stroke: FieldStroke; key?: PlatKey }          // a relative Δ (or terrain's flattenTo); the stroke list is composited once (§7.2)
  | { t: 'assign'; assignment: Assignment } | { t: 'unassign'; id: Id }
  | { t: 'moveLabel'; id: Id; placement: Placement } | { t: 'hideLabel'; id: Id; hidden: boolean }      // LabelEntity.pinned / hidden — model data (§9)
  | { t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }
  | { t: 'editTable'; table: TableId; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* the confirmed fates of §7.6's first-reader-stage re-derivation */ }
  | { t: 'editPreset'; preset: string; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] } | { t: 'setStyle'; ops: RowOp[]; provenance?: 'host' }
  | { t: 'rerollLayer'; concern: RerollableConcern /* generated from the concern registry (§6.1) */; salt: number /* town-wide: the concern's new salt; 0 with `ids` */;
      ids?: Id[] /* `naming` only: re-draw these entities' names */; salts?: Record<Id, number> /* with `ids`: the per-entity salts actually used (§6.3) */ }
  | { t: 'convert'; op: ConversionOp /* §4.11, V06's EvolveOp and V05's island ops among them */ }
  | { t: 'startWorks'; target: Id; kind: Works['kind']; startWeek?: number /* default: the document's week */; change?: WorksChange /* the hand change the Works shows, folded at once at this event's position under its `seq`, author and session (§4.11 (1)); absent only for a repair, decay or clear of the target */ } | { t: 'cancelWorks'; works: Id }   // item 67: a timed Works on the weekly clock (§4.11; J-A67.72)
  | { t: 'placeLight'; kind: string /* a light rule row's kind */; point: PointCm; host?: Id /* default: the entity under the point */; heightCm?: Cm; key?: PlatKey }   // item 68: a hand-placed LightSource (§2.7)
  | { t: 'closeup'; district: Id; strategy: FabricStrategyId /* informative: the district's fabric at the event */; params: CloseupParams /* V01 §2.5 */ }   // logged before the first presentation edit inside a close-up (PART II)
  | { t: 'epoch'; epoch: number; inputs: EpochInputs }                                                  // an epoch is an event in the log (§4.11)
  | { t: 'dossierFacts'; changes: DossierChange[] /* each with its full before and after carried facts */; quarantined: { key: string; reason: string; since: number }[]; notes: PortNote[]; notesCleared: string[] }   // V08 §3.6 (4): the absorb's ledger; no model effect; folding it rebuilds Document.dossier
  | { t: 'dossierRecord'; kind: 'condition'|'deposit'|'powerRelation'|'person'|'customChain'|'customService'; key: string /* the binding key */; op: 'put'|'retire'; fields?: Record<string, unknown> /* on put: §2.7's fields less id, lifecycle and derived fields */ }   // V08 §2.5: the staged records' one event
  | { t: 'rebase'; reason: RebaseReason; stateDigest: Hash128; version: string /* the output version whose model packages computed stateDigest — the document's output version from this event on; a frozenImport sets it to the library's current version (§2.9 steps 2–3) */;
      at: number /* the log head its state materialises: the previous event's seq, or h₀ when kept after edits made during load verification (§2.9 step 4); any other value is refused with E_REBASE_AT and nothing is appended (§14) */ }   // §2.9
  | { t: 'upgrade'; from: string; to: string; mapping: MigrationMap /* §7.5 */; baseDigest?: Hash128 /* with a rebased base: base.state's model root computed under `to`, the root later loads under `to` check it against (§2.9 step 3, §7.5) */ }
  | { t: 'undo'; of: number /* seq of the event undone, or of the first event of its group */ }        // applied at the head through the same fold (§7.4)
  | { t: 'redo'; of: number /* seq of the undo it reverses */ } );
type RowOp = { op: 'set'|'insert'|'delete'; rowKey: string; field?: string; value?: unknown; baseRowHash?: Hash64 };   // rows by stable key, never by position
type WarpKernel = 'displace'|'liquify'|'relax'|'bloat'|'pinch'|'equalize'|'swirl'|'jitter';
type WarpStroke = { kernel: WarpKernel; centre: PointCm; radiusCm: Cm; innerRadiusCm?: Cm; strength: number; dragCm?: VecCm };
type WithoutBase<E> = E extends unknown ? Omit<E, keyof EditBase> : never;   // an event's own fields, member by member of a union
type WorksChange = WithoutBase<Extract<EditEvent, { t: 'build' | 'convert' | 'join' | 'split' | 'delete' }>>;   // J-A67.72: exactly these five kinds; its EditBase fields are the wrapping event's
// Designation and MutationRecord are §4.7 S11's, RoomRole, Entrance and StairCore §2.6's, ConversionOp §4.11's; Works, LightSource and UndergroundLink §2.7's (their rules §4.11's, §4.7's and II.7.6's); AccessPoint II.7.4's; DossierChange §7.7's;
// ClosureRecord §7.3 item 9's; MassingOp and CompositionOp V02 §4.1's; SkyAccess V05 §2.2's; VillageEnd V07 §2.5's; CloseupParams V01 §2.5's; PortNote §14's
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5): geometry is addressed by entity address, by
lattice point with a role signature (bound by `resolveVertexAt`, never by distance alone), by a water body's address
with a course-knot ordinal (bound as §7.4's `moveCourseKnot` row states), or by a ring. A point-form event with `key`
takes its points in that arena's frame, a sky island's converted from the world by the island's anchor at the dry run,
so a later move of the island never invalidates the event (V05 §4.2). Undo and redo are events like the rest (§7.4): the
log only grows, which is what lets a host store it (§11.3).

**The named actions** (G-R4; O16-core) are separate operations with distinct semantics, never one flag:
* **Regenerate (keep settings)** re-derives the scope with each entity's *recorded* inputs and unchanged rerolls
  (§7.3): faithful, and byte-identical when nothing upstream changed; used after a lock or a drawn constraint.
* **New random** — always on a scope (item 101 R5; J-A101.75; the one statement): a block, a quarter, a building's rung,
  a person, a tunnel run or system, or a rerollable layer such as the trees (`rerollLayer`); an unscoped new town is only
  the empty state's action, before anything is declared. It advances the reroll of every scope entity by one, written
  into the event as an absolute map, so a replay is exact and blocks at different rerolls each move on; §5.1 (6)'s
  content check advances again a scope entity whose content comes out unchanged, and the map records the rerolls used.
  "Try again" is only its catalogue label (V09 §4.9).
* **A designation change is neither.** `assign`, `unassign`, a `setAttr` on a plot's use or class, a relocated use and
  a dossier event run §4.7 S11's mutation of the standing design toward the new designation's template — kept parts
  kept, additions and subtractions recorded — never a re-derivation and never a re-roll (§7.3 item 8, item 18); a click
  on a stale elaboration rung re-derives it from its canonical prior (§7.3's table; never the cache; item 28, item 28 (f)).
* **Adjust** re-solves with a changed parameter. Locality is promised only for parameters the control registry (§7.8)
  lists as consumed at S10 or later, or that carry a spatial scope (a district's density, a block's granularity). A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  wealth level, the recipe's pack list) has no local operator and is offered as **Re-derive from stage k**: everything
  from Sk down re-derives with carry-over (§6.3), and the user confirms the edit-fate report first.
* **Same kind, new seed** is Enter's successor — a new document with seed + 1 that keeps the recipe and the dossier
  (§6.1); per district (PART II) it is New random on the district. **Surprise me** is §7.7 layer 1's.

**Warp is MFCG's staged edit.** Strokes in a warp session preview on the L1 overlay at interactive rate — vertex moves
and a redraw of the affected tiles, no invariants (§8.8) — and **Apply** commits one `warp` event holding the strokes
in order (a warp event is committed only on Apply, and Apply on a session without strokes commits nothing); **Discard**
drops them. On Apply, and on every replay, each stroke is applied as its **operation** to the geometry current at that
log position, never as stored displacements: the operation computes, from the current geometry, a displacement field
over the vertices under the brush, and the kernel's `warp(field, fromLevel, region)` applies it with §3.6's whole-step
validation, halving, re-seating, sliding and held vertices (the dry run lists the held entities), re-deriving locally
any face that then fails a class floor, logged. Records that stand on a point rather than a vertex move with their host
face, and every footprint, trace and deck the warp moved is re-based on the ground it now stands on (§7.4, *Warp and
what stands on the ground*). A warp with `fromLevel = 0` that moves water hands the moved shores to S1's water operator
as its new water (§7.3 (b) 1).

| MFCG tool | PLAT | semantics |
|---|---|---|
| Displace | `displace` | drags vertices under the brush by `dragCm`: full weight inside `innerRadiusCm`, falling linearly to 0 at `radiusCm` |
| Liquify (a softer Displace) | `liquify` | as `displace` with a smooth cosine falloff over the whole radius |
| Relax (repairs too-short mesh edges) | `relax` | Laplacian relaxation of the vertices under the brush toward equal edge lengths |
| Bloat (enlarges cells) | `bloat` | each L1 cell under the brush grows about its centroid by `strength`, neighbours yielding |
| Pinch (inverse of Bloat) | `pinch` | each L1 cell under the brush shrinks about its centroid |
| Equalize (regularises one cell's shape) | `equalize` | each cell under the brush moves its vertices `strength` × 20 % toward the targets `regularFit` returns for the cell's ring (§3.4) — MFCG 12710731's tool is its castle routine (§4.8, item 45) |
| Rotate (the whole map about its centre) | the `rotation` view key (§2.9) | a whole-map rotation about the frame centre as view state — never a vertex operation, which would re-snap every vertex (§3.6): model north (+y) is unchanged; the compass is decoupled — its view key is `trueNorth` (default: it keeps pointing at model north) or `free` (its own angle, MFCG's behaviour); exports apply the rotation as §11.1 states (J-DET-15) |
| Measure (a ruler, not a warp) | the measure tool of §9.5 | view data — no model event |
| — | `swirl` | our local rotation about the brush centre (not an MFCG tool) |
| — | `jitter` | seeded random displacement from the `warp.jitter` stream |

**Drawing at the authoring boundary.** Pointer samples are resampled along arc length to a spacing of at least
`minEdge`, simplified with a topology-preserving Visvalingam at `minEdge`, and a self-crossing stroke is split into
simple runs before `insertChain` (§3.4); a stroke that resamples to fewer than two points, or a ring to zero area, is an
empty edit (below). `drawWater` takes `add` rings, unioned by the boolean engine, and `subtract` rings — a land brush —
so an island is a subtract ring inside an add ring and two overlapping sea shapes simply union (FTG's documented
method); rivers and canals take a `line` and a width. `drawBoundary` selects the L1 cells whose area lies at least 50 %
inside the drawn polygon, and the district boundary becomes the boundary of those cells; a polygon that covers no cell
by half is bent to the one cell it covers most (ties by address), the bend named in one line (item 101 R2), and a
polygon of zero area is an empty edit (below); the dry run shows the snapped boundary before commit (J-DET-14). A `drawWay`
of class `bridge` across a river face places its `Bridge` by §4.2 S1 (5)'s rule for a drawn bridge; S4's operator
routes the drawn way's ends to its deck (§7.3).

**Raised ways, aqueducts and retaining walls (item 110 (a)–(b); items 362–364).** A raised `drawWay`'s ends resolve onto
ground vertices (an end on a way's centre-line splits that way, making the vertex; an end elsewhere moves along the
course to the nearest one; a course drawn beyond the frame bends to the arena's outer ring, its foot at the ring point,
§2.7 *At the frame*); its interior points never split a way on ground part 0; a course meeting an enceinte's trace
comes down to a ground vertex before it and passes through the gate its ground way makes there, while an aqueduct
crosses a wall by an arch in the curtain, never a gate (item 363); an aqueduct's first point is a source lying above its
terminal within `aqueduct.sourceReachKm`, else it is bent to the nearest such source, else to a well at the terminal
(J-VI.4 (h)); a terminal on open ground receives a fountain pin in the same event's closure (§7.3 item 9); a raised or
aqueduct stroke ending on a floating island's rim makes no way and is bent into `placeSkyAccess` with the stroke's ends
as top and foot, and one lying on an island's key is drawn as the island's own way (an aqueduct there a fountain pin)
(J-VI.4 (d)–(e); V05 §4.2). A `drawWall` of kind `retaining` folds into a `RetainingWall` (§2.7) — never an `Enceinte`:
no gate, no tower spacing of S7, no circuit and no barrier closure; `closed: true` is a platform whose high side is
inside; `placeGate` never targets one. Its dry run never refuses on the ground's account: a run on flat ground — at least
`terrace.coverShare` of its stations, sampled every 2 m, stepping less than `terrace.stepMinCm` and sloping less than
`terrace.slopeMin` across ± 3 m — moves onto the nearest slope break, terrace edge or retaining wall stepping at least
`terrace.stepMinCm` within `terrace.retainingReachM` of that share of the stations, else becomes a `terrace` over the strip
on the high side between the drawn line and `terrace.flatDepthM`, levelled to the strip's highest ground plus
`terrace.stepMinCm` (V09 §4.20.1 (3); the cells V11's); each way it crosses takes a stair or a ramp by the way-class rule
(item 110 (a)). The `terrace` sugar expands at its fold into `setField { field: 'terrain', stroke: { …stroke, mode:
'flattenTo', amount: 1, levelCm } }` and one `drawWall { kind: 'retaining', points, closed, highSide }` per edge run of the
levelled footprint along which the step reaches `terrace.stepMinCm`, each minted from the sugar's `seq` (§6.3); an
expansion replaces, in the same group, the retaining walls an earlier `terrace` expansion made inside its footprint, so a
re-levelled terrace never leaves a wall of the old step.

**Building-level editing**, each acting through the plot model: `drawFootprint` places a hand-drawn footprint
(concave allowed, simple) on the plot that contains it — a footprint spanning several plots proposes their JOIN in the
dry run; one on unplotted land (a green, a residue, a field) creates a plot around it with access to the nearest way,
or returns a conflict if none is reachable — and the host plot's site plan is re-fitted around it as a fixed slot
(buildings that no longer fit are listed in the fate report). `build` places a building of a class on a plot (the site
plan picks the footprint when none is given) — §4.11's `build(...)`. `moveFootprint` moves or turns a footprint;
leaving its plot re-homes it to the plot it lands on, with both site plans re-fitted. `swapUse` exchanges two
buildings' uses, households and assignments atomically, footprints staying — two `relocateUse` conversions under one
event (§4.11, item 17); a use is opened, closed or relocated by hand through `convert` with `openUse`, `closeUse` and
`relocateUse`, the building persisting vacant or converted (§4.11). `fill` forces an arrangement (dense row fill, for
instance) on the scope's plots and re-runs S11 there.

**Entrances, basements, passages and plans (items 28–30).** `setEntrance` adds, moves or removes a side, rear, yard or
service door under §2.6's rules — never the main entrance, which may only move along the footprint side §2.6 rule 1 puts
it on — and `setAttr(basement)` overrides the derived basement decision (an edited attribute, §7.2); `drawPassage`
reserves a covered passage under the front building of a plot as a passage face (§2.5) that gives the plots behind it
their access rows, and `convert` with `sealPassage` / `openPassage` (§4.11) seals or reopens one by setting
`Passage.sealed` (§2.5); `Passage.headroomCm` and `Passage.frontBuilding` are derived — S11 writes them with the spanning
wings' `spans`, a heights edit of a spanning wing re-derives the headroom, and the event that makes the front building a
footprint trace or a tombstone clears `frontBuilding` (§2.5, §2.6) — and have no edit kind of their own.
`setAttr(knownTo)` hides or reveals a place's name and purpose for §9.2's label policy (a value the dossier set is
dossier-owned, §7.7 item 11); a front's concealed programme (item 63) is edited like any other, through `setEntrance` and
the plan events. The plan events edit a building's stored plan storey by storey, the first of them — like the first
`setComposition` or furniture `instance` — storing the composition (§2.6), each dry-run against §13.2's plan bars on the
overlay and bent, never silently repaired (V03 §4.2; the outcome table below); a building's household count is changed by
hand through `convert` with `relet` (§4.11) within §2.6's capacity, which marks an unstored plan stale and re-cuts a stored
one inside the event (§7.3); an edit that lowers a building's capacity below its households — any change §2.6's
capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4); a click on a building
or a neighbourhood logs nothing (item 28 (c)).

**Brushes.** `paint` sets roof kind, roof colour or wall colour on every building whose footprint centroid lies under
the brush path (ids resolved at dry run and stored). `paintGround` records a ground-cover region in the style (FTG's
texture brush): pixels only. The tree brush is a batch of `instance` events on the entities under the brush (§8.10),
one undo step; painting trees where no green entity exists first logs a `drawGreen` (a `wood` on open land, a
`yard_planting` in a yard) to host them. `instance` events also carry close-up presentation edits (II.4) and a plan
room's furniture (V03). The field brushes are `setField` strokes (§7.2); the terrain brush's `water` mode chooses
whether water stays where it is (`locked`, the default) or follows the new ground (`follow`), and its `flattenTo` mode is
T2 `ground`'s flatten gesture.

**People.** A lock with `paths` fixes chosen attributes of a person (name, age, role …); New random on a person
re-derives it with a new reroll keeping locked paths; relations and schedules are not re-derived by a person reroll
(they are town-wide, §10). `setAttrMany` edits many entities at once — job, workplace, schedule, household
(relocation), land use — from a query whose result is resolved to ids at dry run and stored, so a replay never re-runs
the query; it is one undo step.

**Delete.** A `delete` of generated content is the plain `delete { id }`: a dossier-backed element's is recorded as
`rejectSite` (§7.7 item 3), a dossier-declared record's is refused, and the delete operator — never a client — records
what the removal suppresses: `LifecycleEvent.detail.suppress` for a raised way, a harbour-mouth chain, a quay wall, a
retaining wall or a deck plot (§2.8; item 260), V05's removed slot for an island or a sky access; its dry run names the
suppression in plain words ("the town will not rebuild this aqueduct; undo brings it back") with the entity's fates
(V06 §3.19.3 (6)), and its preview carries `holds`. The removal holds through regeneration, every absorb and every epoch
(item 110 (b)), lifted only by its undo or by the user's own re-add serving the same key (item 260); a journal or a
transcript replays the call exactly. Any other generated entity's delete holds by carry-over: the event follows the
entity's successor (§7.3 item 4).

**Empty edits.** An edit whose dry run resolves to nothing — a warp applied with no strokes, a stroke of fewer than two
resampled points or a ring of zero area, a `setAttrMany` whose query matches no id, a `roster` with no lines, a `group`
with no quarters, a `fill` or `regenerate` whose scope covers no face, a New random or `rerollLayer` whose every scope
entity reports `no_alternative`, a terrain stroke whose every cell `locked` mode masks (§7.2) — appends nothing: its dry run reports it empty with the reason (V09 §4.9), and applying
it leaves the log head and every digest unchanged. *Test (B-EDIT):* each empty form leaves `nextSeq` and both digests
unchanged, a zero-area `drawBoundary` among them; and a thin `drawBoundary` polygon covering no L1 cell by half commits
the one-cell bend with its line, the cell the one it covers most (ties by address).

**Edit targets — owner amendment 5.** Every generated element is editable (the table below); every rule table and
preset is editable (§7.6), by a user through the preference layer and by us through new table versions; edits are
first-class events that persist (the log, §2.9), undo (§7.4 — undo and redo are log events, so they work in a shared
document too), survive regeneration (§7.2–§7.3: protection, carry-over and fates) and migrate between versions (§7.5);
the generator repairs around them locally (§7.3's operators, F-REDERIVE); the preference and override layer sits above
the defaults (§7.6). The entity registry (§2.8) declares each type's edit kinds with their undo path and lifecycle row;
its completeness test is §13.2's. "Derived" below names attributes written only by the paths given, with no edit kind of
their own.

| element | edit events |
|---|---|
| terrain | `setField(terrain)` with `water: 'locked'` or `'follow'` and its `flattenTo` mode, the `terrace` sugar, `drawWater` (hollows and lakes; with `spring`, an oasis — g item 111), `setAttr` on site features; `setAttr` on `geology` — an override of S1's value (§2.3), re-deriving the underground systems that read it (II.7.6's caverns) |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and coasts, `moveCourseKnot` on a river's control knots, `setAttr` (bank class; `WaterBody.spring.flow` — a spring's flow, item 111, V06 §4.2), `delete` (an oasis's water body with its spring, grove and gardens, §2.3) |
| ways, junctions, bridges, raised ways | `drawWay` (class `bridge` for a new crossing; `raised` and the `aqueduct` class, item 110 (b)), `moveVertex` (a raised way's interior points on its part's lattice; its ends only onto ground vertices), `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind; on a raised way `spans/<ordinal>/use` = `open` · `vault`, a held user edit, kept `open` over a part-0 way, water or a flood cell by the span's recorded reason; `crossings/<retaining wall id>/form` = `stair` · `ramp`; `clearanceCm` and `spanSpacingCm`, item 364), `convert` (`downgradeWay`, `upgradeWay`, `repairRaised`; V06); derived: `formerClass` (V06 §2.8; a `setAttr` of `class` clears it) |
| districts | `drawBoundary` (its points form, item 101), `quarter` (sugar, item 101), `merge`, `split`, `setAttr` (kind, name, its `DistrictIntent` — §7.7 layer 2 —, `identity` — an override of the derived identity, item 72; §4.5 —, `fabric`, `fabricParams.*`, `terrace`), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement; derived: the character vector and the band range (§4.5), `pressure` (epochs only) and `nameHistory` (§6.3's case (5) and a dossier rename, §2.5); an undercity neighbourhood (II.7.5) is a district like any, with `convert` `clearUndercity` |
| reservations (§2.5) | `setAttr` on a market's `rank` (`principal` or `secondary`, item 24): a Re-derive from S3 with its fate report, §4.2 S3 (12)'s batch taking the edited rank as a fixed input (J-A24.71) |
| blocks, plots | `split` and `join` (item 31's splitting and fusion: the least-disruption re-cut of §4.7 S10 (7) with S11's mutator, neighbours fixed, undo exact — §7.4), `merge`, `fill`, `setAttr` (use, owner, `knownTo`; `tenure` — an override of the value derived from the owner and the band, kept like `knownTo`, item 70; `frontJitterCm` — 0 or in [`jitter.minM`, `jitter.maxM`], the footprint re-fitted by S11's mutator with the neighbours fixed, item 43; a block's `reach` — `open`, `passage` or `gated` — re-deriving the block's interior by S10 (7)'s re-cut with its neighbours fixed, J-A30.72; a block's `content`, V01), `regenerate`, `lock`, `assign`, `placeAt`, `rejectSite`, `drawPassage`, `convert` (`plotToGarden`, `amalgamate`, `subdivide`, `densify` (`infill`, `back_court`), `thin` (`infill`, `back_court`), `sealPassage`, `openPassage`; §4.11); derived: `builtBand` and `builtProsperity` (§4.11's floor paragraph; J-A31.44, J-A31.71), `fieldBand` (§2.5; J-A28.29), `exposure` (from the access rows), a block's `due` (§4.11's ladder); a cluster's structures are buildings, and a re-pack of a cluster is its plot's `regenerate` (item 70) |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof, basement, `knownTo`, `condition` — an edited attribute §4.11's rung 1 then leaves as set, §7.2, J-A31.76; `wings/<key>/heights` and `wings/<key>/roof`, V02), `setEntrance`, `delete` (a generator-added building; a dossier-backed one becomes `rejectSite`), `convert` (demolish, abandon, decay, ruin, clear, rebuild; vacate, reoccupy, reuse; openUse, closeUse, relocateUse, mutate — with a `MutationPlan` step, V06 —; `relet`, within §2.6's capacity, item 28 (f); `burn`, V06; §4.11), `startWorks` / `cancelWorks` (item 67), `addUndergroundAccess` (item 66; §7.3 item 9), `assign`, `regenerate` with `rung`, the plan events (item 28; `setRoomUnit`, item 28 (f)), `setHearth` and `instance` on a room's furniture (V03), `setMassing` and `setComposition` (stage 3, V02), `lock` on a room's path (`plan/rooms/<id>`), `setAttr` of a room's name (`plan/rooms/<id>/name`, V03 §4.2); derived: `nextEntrance` (§2.6's entrance derivation and `setEntrance`), `reusedAs` (`convert reuse`), `formerUses` (the use conversions that close or move a building's use), `predecessor` (`reuse … build`), each base wing's `spans` (S11 when it builds or re-fits a passage's front building, cleared by S11 or by the event that makes that building a footprint trace or a tombstone, §2.6), each slot's `frontage` (the designation template, re-derived by S11's mutator) and `unhoused` (§4.7's generation fill, cleared by the designation mutator) |
| mutation plans (V06) | `setAttr` of a step's `dueWeek`; `delete`; a `mutate` with its step (item 264) |
| walls, gates, towers | `drawWall` (its points form, item 101), `placeGate` (sugar, item 101), `moveVertex`, `setAttr` (among them `pathway` — a ring's fate and its week, V06 §4.2 —, a stretch's grade, `profile/<arc ordinal>/grade` = `full` · `light` · `closure`, item 106 (c): an edited path S7's operator keeps as a fixed input, `closure` admitted only on an arc whose barrier closes by item 106 (a)'s defensibility table and otherwise bent to `light`; item 360), `delete`, `convert` (wallToWay, gateToJunction; neglect, breach, dismantle, contractWall; `absorbWall`, `wearWall` and `repairWall`, V06 §2.8 — `repairWall` with its material, robust or a patch row of V11's `walls.patchMaterials` (item 114), a hand repair of a dismantled stretch bent to a new stretch drawn on its line, J-VI.4) — §4.11; derived: an enceinte's `supersededBy` (`contractWall`) and each run's `condition`, material and last-change epoch (§2.7; item 114), written by those conversions, an epoch's walls step (V06 §3.7.7) and S3 and S7's generation-time condition (§7.7 DR41) |
| retaining walls (§2.7) | `drawWall` (kind `retaining`), the `terrace` sugar, `moveVertex`, `setAttr` (material, towers, `highSide`), `delete`, `convert` `repairRetaining` (V06; a ruined stretch's repair bent to a new drawn stretch); a generated one re-derives with its terrain until edited, then held (§7.2) |
| uses (§2.7) | `convert` (openUse, closeUse, relocateUse — §4.11), `swapUse`, `setAttr` (specialisation; a concealed use's `concealment`, `front` and `knownTo`, item 63 — dossier-owned where the dossier set them), `assign` / `unassign` and the assignment's `pinned` (§7.7); derived: `concealmentSource` (written with `concealment`, `edit` for a map value); a use's address moves with it (§6.3) |
| institutions (§2.7) | `setAttr` (`knownTo`, name, `concealment`, `front`, `powers`), `assign` / `unassign` (§7.7); the values the dossier set are dossier-owned (§7.7 item 11) |
| tunnels, galleries, chambers, links, access points (II.6, II.7; staged, editable in the base) | tunnels: `drawTunnel`, `moveVertex`, `setAttr` (kind, `widthCm`, `headroomCm` — `navigable` re-derived from them, §2.7 —, `depthOffsetCm` — the invert re-laid, bent to the cover limit —, `name`), `delete`, `convert` (silt, caveIn, seal, reopen, flood) — a tunnel's condition is no `setAttr` path: it reads `existence` and `closure`, so a condition change is the matching `convert` (J-A11.21), and the profile preset is II.7.2's network choice, not a tunnel field; galleries of another system are `drawTunnel` with its `system` and chambers `drawChamber` (with `newKind`, a new ruin, cavern or catacomb system, bent as below), each in its system's part (J-A65.71), edited like tunnels, a chamber's `setAttr` also on `kind` and `ceilingCm`, a gallery's `walkway` derived (II.7.5), a catacomb's `fill` a `setAttr`; links: `addLink`, `setAttr` (kind, `knownTo`), `delete`; a buried old town is `convert` `raiseGrade` (II.7.6); access points: `placeAccess` (from public ground), `addUndergroundAccess` (from a building's basement: a closure), `moveVertex` on the `access_point` vertex (the underground end), `setAttr` (kind, role, `state` — open, locked or bricked, a collapsed reading never set — and `knownTo`, item 64; `ground.at`, the opening — re-hosted by `pointLocate` on the ground's `PlatKey`), `delete`; `setLayer` on `underground` is the CITY / METROPOLIS visibility toggle (§7.8); J-A12.71 |
| sky islands and their accesses (V05) | `quarter` with `sky`, `setAttr` (`anchor`, `altitudeCm`, `areaHa`, `occlusion`, `underside.*`, `field.*` — `field.prosperity` a declared target mean —, name), `setField` with `key` (terrain and the prosperity, density and greenery brushes), `drawWall` with `key`, `moveVertex` and `warp` on the island's key, `regenerate` (the island's scope; the scope `shade` — Update shade now), `lock`, `delete` (folded as `convert removeIsland`, the record kept in state `removed` holding its slot), `convert` (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`, `removeIsland`); accesses: `placeSkyAccess`, `setAttr` (kind — re-checked against `magic` and the row's limits —, role, `state`, `knownTo`, `ground.at` — re-landed as a move), `delete` (a generated access's ordinal held in `removedAccesses`); derived: `groundRefCm`, `elevationCm`, `shadeBasis`, `supply`, `state`'s dates, `slot`, `landfall`, `removed`, `removedAccesses`; `recipe.layers.islands` and `islands.count` are `adjust`s that re-derive from S7b (§7.8), an integer `islands.count` counting the slots removed islands hold as filled and opening only free slots — a count never releases a hold (V05 §3.2 (6); item 260) |
| the village (V07 §4.1, V07 §4.4) | `declareEnd`, `drawWay` with `walk`, `setAttr` on `VillagePlan`, `VillageRequest`, `VillageField` and `VillageEnd`, a village density stroke, `drawGreen` (`kind: 'green'`), `convert` (`retypeLand`, `retireWay`, `effaceWay`, `reopenWay`); the other kinds as above |
| terrain and water conversions (§4.11, item 25) | `convert` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal`, `retypeLand` — the slow conversions the evolution engine schedules, usable by hand), repaired through S1's terrain or water operator or the carve: a marsh's `reclaim` by the terrain operator (§7.3 (a)), a foreshore's `reclaim`, `siltReach` and `shiftCourse` by the water operator (§7.3 (b)), `digCanal` by the carve (§4.11); derived: `LandUse.reclaimed` (§2.3) |
| works (§4.11, item 67; J-A67.71) | `startWorks`, `cancelWorks`, `setAttr` on the Works (`startWeek`, its duration within its `WorksTable` row); its stage at a week derived |
| lights (§2.7, item 68; J-A68.72) | `placeLight`, `setAttr` (kind, `heightCm`, colour, intensity, `radiusCm`; `point` — re-hosted by `pointLocate` on its host's `PlatKey`), `delete`, `lock`; derived lights (lit windows, the plan rung's room lights) have no edit kind; the view's light keys (§2.9) are not logged |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) — both authorial: the blocks they re-derive past τ take the new field as their built state and their plots' `builtBand` (§7.2, item 31) |
| names, labels | `setAttr` (text; a label's `displayText`, §9.1, cleared by `revert`), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`), `group` (a region label group — `RegionGroup`, §9.1 —, sugar, item 101; renamed by `setAttr`, removed by `delete`), `setAttr` on a `HoodPlace` and a new place (V01); a name the dossier gave or claimed is dossier-owned, its label's display text a map-side choice (item 20 (h)) |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope; a household's people by the scope `people`, §10.3's re-derive people), `pin`; a household's building and its dwelling unit (§2.7, item 28 (f)) follow `relet` and item 17's relocation (§4.11, §10.3), never a bare `setAttr` |
| close-ups (stage 2; V01 §4.1) | `instance` on a hood pin (its block and ordinal) and the close-up's params, after a `closeup` event; every other close-up entity is a base entity edited as one, with no `closeup` event; a district's layout is `setAttr(fabric)` + `regenerate` (T8 `fill`), a block's content `setAttr(content)` (T9 `shape`), a local place's name and knowledge `setAttr` (T11 `name`) (item 272) |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo`; the dossier events — `assign`, `unassign`, `setAttr`, `dossierFacts` (the absorb's ledger; no model effect) and `dossierRecord` (a staged record put or retired), with `EditBase.dossier` and `EditBase.dossierChange` set, produced by the dossier port and folded in the host's order (§7.7; items 73, 75, 358); the creation prefix's events carry `EditBase.creation` (§7.4) |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope with its
case-(4) renames (§7.3 item 4) — for a chained operator (§7.3 item 3) the whole chain runs on the overlay, so the report
lists every re-sited bridge, re-routed or cut way and re-based building before anything commits; for a declaration's
points form, the derived shape with its handles; for an area declaration (`quarter`, `fill`, `roster`), the plots,
households and buildings it will hold — the count the ghost's badge shows (§9.5; item 101 R14); for an `undo` or
`redo`, the independence check of §7.4; for a dossier event or a positive placement, its disruption against the request
kind's budget row, stored in the event (§7.7 item 5). Conflicts come back as actions, never silently resolved, by the
outcome table below. A host's bridge commands map onto these events (§11.3).

**The dry run's outcomes** (E-07; the one home of every refusal, conflict and bend cause of a dry run; §5.2's F-EDIT
row cites it. The gates outside a dry run — §11.1's export tier, §11.2's `advance` on a dossier-bound document (V06
§2.3), the shell's layer gate (V09 §4.2), V09 §3.9's restore and V10 §3.16's harness and model refusals — are their own
sections, V09 §4.9's lead naming each.) A declaration is **refused** only where it contradicts a dossier fact or a lock
(item 101 R2), or where an availability gate stops it — an assignment's bounds, a dependent later change, the role, a
staged layer, the rung (J-VI.4, J-VI.30) —, or where the input has no lawful form to bend to — a table edit's dangling
reference, type error or required row (V11 §4.1), a host provider's output past §2.9's cap, an edit of a device-only
table (V10 §2.10), an `epoch` past §6.1's epoch cap; every other infeasible declaration is **bent** to the nearest
lawful one, which the dry run names in one line, the former offer becoming the bend or its first alternative; the
other rows are **conflicts** returned with their actions, or **confirmations**. Each outcome carries its catalogue key
(V09 §4.9) as a `MsgRef` (§5.2 F-EDIT).

| cause | outcome | the action, or the bend's target | key |
|---|---|---|---|
| a map event (no `EditBase.dossier`; a dossier event is never refused by a lock or a pin, §7.7's precedence) crosses, targets or moves a locked or pinned entity or attribute path — a drawn way across a locked entity, a targeted assignment on one (§7.7's precedence), new water ⊕ bank setback meeting a locked or pinned way, wall or finer entity (§7.3 (b) 3), a warp carrying a held point-anchored record out of its host face (§7.4) | refused | the blocking lock — unlock; one of the closest acceptable declarations that leave the locked entity untouched (item 20 (g); `PreviewResult.alternatives`); or keep the lock; a host's map event that must override a lock sends an unlock first | `refuse.locked`, `refuse.water`, `refuse.warp` |
| new water reaching a reservation (§7.3 (b) 3) | conflict | Re-derive from S3 | `refuse.water.reservation` |
| an edit of an assigned attribute beyond its drift bounds (§7.7) | refused | remove the assignment, or change within the bounds | `refuse.assigned` |
| a map event changing a dossier-owned value (§7.7 item 11) | refused `dossier-owned` | the map-side alternative where one exists (§7.7 item 11) | `refuse.dossierOwned` |
| a map event closing, removing or re-designating a dossier-backed element (§7.7 item 2's list) | refused | `rejectSite` (move it) or `placeAt` (designate the plot for something else, the element re-placed) — a `delete` of one is recorded as `rejectSite` instead | `refuse.dossierRemove` |
| a declaration contradicting a dossier fact or a lock (item 101) | refused | the lock or the dossier fact it meets, with the closest acceptable declarations (item 20 (g)) | `refuse.dossierOwned`, `refuse.locked` |
| with a dossier connected, a roster line naming no dossier element | refused `dossier-owned` | the dossier's unplaced elements | `refuse.roster.dossier` |
| a `dossierFacts` or `dossierRecord` from any author but the port, or a delete of a dossier-declared record (§7.7) | refused `dossier-owned` | — | `refuse.dossierOwned` |
| an assignment, or the re-placement a `rejectSite` causes, that no plot satisfies inside the hard rows (a dossier fact's conflict; item 582) | conflict | the closest acceptable sites with the hard rows each fails (§4.7 S10b) | `refuse.assignment.noSite` |
| an `undo` naming a `creation` event | refused | `unassign` (a blueprint assignment); `rejectSite` and `placeAt` (a dossier element) | `refuse.undo.creation` |
| an `undo`, `redo` or `revert` naming an event of the port's session `host:port` — a dossier event, a `dossierFacts` or `dossierRecord`, or a port epoch, whether or not it carried a dossier change (§7.4 *Replay semantics*) | refused | `rejectSite` and `placeAt` for each dossier element it placed or re-designated (a dossier `unassign` leaves none) | `refuse.undo.dossier` |
| an `undo` or `redo` whose target has dependent live events (§7.4 *Independence*) | conflict | the dependent events and their authors, to undo first — never an event of session `host:port`, so a target one of them depends on stays as it is | `refuse.undo.dependent` |
| `E_KEPT` or `E_LEVEL`: the edit would cross or clear finer content an earlier stage made, or content outside a coarse edit's clear region (§3.3) | conflict | one resolution: start the re-derivation at the stage that made that content (for a wall's band parts or a margin band's part, S10's step (0) for the wall strips of the touched run or for the scope's side of the touched stretch, §4.7, §7.3 item 2) | `refuse.kept` |
| a tool or closure piece of a staged layer not yet built (the underground's pieces of `addUndergroundAccess`, §7.3 item 9 (d)) | refused | naming the staged layer | `refuse.staged` |
| an `addUndergroundAccess` whose terrain rules out every basement form (§2.6's requested-mode ladder), or whose connector passes its route's bound or finds no route (II.7.6 step 3: `E_NO_PATH`, the basement ring enclosed within `foundationClearM` by other footprints, basement rings or dug passages, or the water table above every floor between it and the target) | bent, else refused | the nearest lawful basement form (half cellar, walk-out, a hatch to a crawl space); else the refusal naming the terrain, the route's bound, or the blocking building or the water table, the basement not laid | `bend.under.basement`, `refuse.under.basement`, `refuse.under.route` |
| a dwelling declaration in an underground cluster nobody can reach (§7.3 item 9 (d)) | bent | the closure's dug access, else a public opening, else the declaration onto ground part 0 over the same footprint | `bend.under.accessDug`, `bend.under.accessOpening`, `bend.under.noAccess` |
| a user's positive placement that no plot satisfies inside the hard rows | bent | the closest acceptable site (the one §4.7 S10b ranks first), naming it and the reason; the other acceptable sites as alternatives (item 582) | `bend.place.noSite` |
| a user's positive placement over its disruption budget | bent | the closest acceptable site within the budget; the exact site with its disruption and the other acceptable sites as alternatives (item 582) | `bend.place.overBudget` |
| a plot `join` or `split` that would remove an occupied building | bent | the demolition carried as a fate, its households relocated by item 17; accepting the dry run is item 31's confirmation, and "keep the building" withdraws the edit (item 582) | `bend.vacate` |
| a plan edit leaving a room below its row's minimum area; a plan edit or a `setRoomUnit` leaving a unit without its own door onto circulation or the street (item 28 (f)) | bent | the smallest lawful split; the nearest wall position that keeps each unit's door (V03 §4.2) | `bend.room.minArea`, `bend.room.noDoor` |
| a plan edit (`setOpening`, `moveWall`, `splitRoom`, `mergeRooms`, `moveStairCore`) or a `setRoomUnit` leaving a room the main entrance no longer reaches (V03 §3.6 O2's tree; item 28 (f)) | bent | the nearest lawful form that keeps every room reached — the door kept, or moved to the nearest wall of the room whose other side reaches circulation (V03 §4.2) | `bend.room.unreachable` |
| a hand `relet` above §2.6's capacity | bent | clamped to the capacity | `bend.capacity` |
| a heights edit leaving a base wing spanning a passage below two floors (`Passage.headroomCm`, §2.5; item 30) | bent | the passage moved to the nearest run its front building covers with two storeys | `bend.passage` |
| a capacity re-homing that cannot place its excess (§2.6's capacity rule): locked or pinned households alone above the new capacity | refused | the lock | `refuse.locked` |
| the same, a household that fills no dossier's population that no residential building of the district has room for | conflict | the capacities that refuse it; relocation first (item 17) | `refuse.capacity.household` |
| a Works edit that would leave a plot without access or a building's occupants unhoused (§5.3's Works row; item 67) | conflict | the plots and households named; relocation first (item 17) | `refuse.works.access` |
| a moved course knot whose carve would exceed `carveMaxCm` (§7.3 (b) 1) | bent | the deepest lawful course, the knot at the nearest position along the drag within the cap | `bend.carve` |
| a value outside its declared range — a table cell (`jitter.minM` below its bound among them, §4.7 S11; §7.6) or an edited path with a range | bent | clamped to the nearest lawful value | `bend.invalid` |
| a host provider's output that would pass §2.9's cap on pack data and host content | refused | naming the provider and the size | `refuse.host.cap` |
| an upgrade's copy of a pack `to` stops shipping that would pass that cap (§7.5) | conflict | "keep the old model", the one resolution | `refuse.upgrade.packCap` |
| an `epoch` whose number would pass the live epochs' bound of §6.1's epoch component (2³¹ − 1) | refused | naming the cap; nothing commits | `refuse.epoch.cap` |
| the effective scope holds protected entities whose fate is not *kept*, or the edit re-draws names by §6.3's case (4) | confirmation | the fate list and the renames to confirm (§7.3 item 4) | the fates sheet (V09) |
| a warp step that would break an invariant | bent | the step halved (§3.6), named in one line | `bend.warp.halved` |
| a bug abort on the overlay (§5.1 (8)) | conflict | nothing commits; the cause `bug` with the stream key | `refuse.bug` |
| a declaration from a viewer role (§11.2's `role`) | refused `role` | none: nothing is computed, so no list, count or shape | `refuse.viewer` |
| an `adjust` of the islands setting (`recipe.layers.islands`, `islands.count`) below CITY, from any client (II.6; §7.8's disabled control) | refused, the rung | the rung change to CITY (T1 `intend`'s size chips) | `refuse.islandsRung` |
| an `editTable` setting a `raisedWays` row below CITY (item 110 (b)'s rung gate), or carrying a dangling `ref` or a type error (V11 §4.1) | refused F-EDIT, naming the rule | for the rung gate, declaring the raised way (T4 `road`'s Raised mode); none for the others | `refuse.table.rung`, `refuse.table.invalid` |
| an `editTable` row `delete`, or a pack's patch, removing a row readers fall back to — the schema's `defaultRow`, a `TotalityRule.allowFallback` target, the only row covering a value a totality rule requires, or the last row of a table not `mayEmpty` (V11 §4.1; J-V11.113); a pack's such op is refused at load, the row standing (V11 §3.2.3) | refused F-EDIT, naming the readers | editing the row's cells | `refuse.table.required` |
| a `setStyle` whose sheet leaves an unresolved or ambiguous layer-order pair (§8.2; J-R39) | conflict `invalid` | the offending pairs, which the style dialog lists; nothing applied | `refuse.style.order` |
| an `editTable` on `knowledge.admit` by which a `public` row would admit finer than `city`, or a higher tier finer than a lower one (§9.2) | conflict `invalid` | the offending rows | `refuse.table.knowledge` |
| an `editTable` on `clerk.ops` from a document's override layer, a skeleton or a host (V10 §2.10) | refused `invalid` | none: the device's preference layer alone edits it | `refuse.clerk.opsDevice` |
| a preview or an apply whose base changed before it committed (§11.2) | conflict | a new preview | `refuse.stale` |
| a Re-derive — a rung change or a population `adjust` — whose frame law gives a frame not enclosing the locked, pinned or declared entities and drawn constraints (§7.4's frame row; §3.2 (9)) | bent | the smallest frame of the rule that encloses them, at the frame's `aspect`, its centre (0, 0) | `bend.frame.held` |
| every other infeasible declaration (item 101 R2) | bent | the nearest lawful declaration, named in one line — a quarter's snap and size, a lake's level, a harbour's size, a river's course, a road's route and bridge, a wall's ridge, reach, waterfront, open ground and aqueduct arch, a fill's band, a roster line, a place's site, a retaining wall's flat ground, move and rim, a raised way's clearance, ends, wall and island strokes, an aqueduct's source, terminal and uphill run (a well), a crossing's steep ramp, a chamber's catacomb ladder (below), a crypt, a deck, a stack and its tiers, a ruin's axis, a tunnel's depth offset (to the cover limit), a stair kind or bay (V03 §4.2), a wall stretch's `closure` grade (to `light`), a hand repair of stone that is gone (a new stretch or part on its line; V06) | V09 §4.9's `bend.*` rows |

**The returned kinds** (§11.2's `ConflictAction.kind`; the one statement). A refused or conflicting outcome returns its
action as a `ConflictAction` only where the action is one of these kinds: `unlock` — the rows whose action is the
blocking lock: the first row (a map event meeting a lock or pin; its keys `refuse.locked`, `refuse.water`,
`refuse.warp`), a declaration meeting a lock and a capacity re-homing held by locked or pinned households (both
`refuse.locked`) — its `target` the blocking entity; `unassign` — `refuse.assigned`, its `target` the
assignment; `moveTo` — `refuse.assignment.noSite`, one per closest acceptable site, its `target` the plot; `stale` — the
stale-base row; `invalid` — the three rows that refuse or conflict as `invalid` (a style sheet's order, the knowledge
admission, the clerk's operations). Every other row returns its catalogue key alone, its offered actions being that
key's event forms (V09 §4.9: a re-derivation, the dependents to show, `rejectSite` and `placeAt`) or the preview's
`alternatives` (the closest acceptable declarations of a refusal); a bend is no conflict — it applies, named in one line
with its alternatives. No row returns `reroute`: a route is bent, never refused (the last row).

**A new catacomb from a chamber** (item 109 (k); item 361). The dry run of `drawChamber { system: { newKind: 'catacomb' } }`
bends to the nearest lawful form and never refuses: (a) its centroid inside a church-class building's footprint →
`setAttr(building, 'basement/crypt/ring', <the drawn ring clipped to the building's crypt region>)` and no chamber is laid,
and on a building without a basement V03's crypt ladder makes a crypt-only basement (V03 §4.2); (b) on a burial face (V04
§3.5.1 (1)) with the settlement's catacomb count reached → it joins the complex of which an element lies within
`accessReachM`, else becomes one `ossuary` chamber of the `dug` system under that face capped at `charnelMaxM2` (a charnel
vault); (c) below TOWN → the charnel vault; (d) on no burial face, or on a worked-out quarry below CITY → the chamber stays
in the `dug` system; a worked-out quarry at CITY or METROPOLIS within `ossuaryReachM` is a quarry ossuary. Otherwise it
forms a complex under that face within the count. Each outcome carries its `bend.catacomb.*` key. `newKind: 'ruin'` creates
the system with its record of source `declared` and its axis from the chamber, `newKind: 'cavern'` one of the site's
geology; the undo of any of them removes both the system and the chamber.

**The authoring toolkit (item 101; owner: "come up with an elegant set of tools for both an ai clerk and a user where a
dedicated user can build it or emulate it"): declare, then derive (J-A101.71).** Authoring is a set of DECLARATIONS,
each one of the events above or sugar over one, with one dry run, one fate report, one commit and one undo, so nothing
changes silently. The rules derive everything undeclared — item 20 (h) applied to human input: a declared fact stays
fixed, like a dossier fact, until its author changes it (§7.2; §2.8's `factTier` reads it `declared`); its infeasible
forms are the outcome table's. **Emulating** a city is declaring its intent, bones and programme (the INTENT, GROUND AND
BONES and PROGRAMME layers) and letting the rules fill the fabric; **building** it is declaring the fabric too (FABRIC and
FINISH) — the same tools at a different depth. The twelve tools, in five layers of commitment (the author may stop at
any layer; everything below it is derived; the sky parameters of V05 §4.1 ride T2 `ground` – T6 `place` and T8 `fill` –
T10 `hold` through `key` and `quarter`'s `sky`):

| layer | tools |
|---|---|
| L0 INTENT | T1 `intend` — the recipe's intent at creation (§7.7 layer 1: site, size, form, era and style, prosperity, walls; `Recipe.product`, V01), afterwards the basic panel's sliders and chips (§7.8) |
| L1 GROUND AND BONES | T2 `ground`, T3 `wall`, T4 `road`, T5 `quarter` |
| L2 PROGRAMME | T6 `place`, T7 `roster` |
| L3 FABRIC | T8 `fill` (its three variations are §7.3 item 10's), T9 `shape`, T10 `hold` |
| L4 FINISH | T11 `name`, T12 `dress` — beyond its events, the close-up's `pinGate` and vignette (V01), the furniture (§9.5) and the exports (§11); the underlay is view state (§2.9, §9.5) |

The events each tool homes are the binding's below; a mode may also emit a kind another tool homes (`toolkit.json`'s
`emits`, V09 §2.3), as T9 `shape`'s footprint drag emits `drawFootprint` (E-04: one table).

A new capability adds a parameter to an existing tool, never a thirteenth tool (§13.2's elegance bars). **The binding**
(E-04; the one home, keyed by event kind and target class or path; T101-1's registry, T101-2's enumeration, V09's
T-V9-12 and V10's T-V10-1 check it over every `EditEvent` kind; V09 §4.3 adds each row's gestures, V10 §3.5's encoders
read it):

| home tool | event kinds (the target class or path where it decides the home) |
|---|---|
| T1 `intend` | `adjust` (intent, recipe, layers, islands, the sewer family, ruins, a standalone neighbourhood document's outline) — the basic panel's Adjust and Re-derive events |
| T2 `ground` | `setField(terrain)` (its `flattenTo` mode), `terrace` (item 110 (a)), `warp`, `drawWater` (its points and level forms; a lake's `spring`, an oasis), `moveCourseKnot`; `moveVertex` on a shore or coast; `setAttr` on `geology`, a bank class, a site feature, `WaterBody.spring.flow` (item 111; V06 §4.2); `convert` `reclaim`, `siltReach`, `shiftCourse`, `digCanal`, `retypeLand` (item 209) |
| T3 `wall` | `drawWall` (every kind, its points form, `retaining` included, item 110 (a)), `placeGate`; `moveVertex` on an enceinte's trace — a stretch's anchor vertex and a gate's crossing among them — or a retaining wall's chain; `setAttr` on a retaining wall, on the castle (`site`, `baileyArea`) and on `Enceinte.pathway` (a ring's fate and its week; V06 §4.2); `convert` `wallToWay`, `gateToJunction`, `neglect`, `breach`, `dismantle`, `contractWall`, `absorbWall`, `wearWall`, `repairWall` (with its material: robust, or a patch row of V11's `walls.patchMaterials`; item 114), `repairRetaining` |
| T4 `road` | `drawWay` (every class — a road across water a bridge, by the drawing rule above —, its points form, `raised`, the `aqueduct` class, item 110 (b), V07's walk mode), `drawTunnel`, `addLink`, `placeSkyAccess`; `moveVertex` on a way's, a raised way's (its ends onto ground vertices) or a tunnel's chain |
| T5 `quarter` | `quarter`, `drawBoundary`, `declareEnd` (at a village rung); `setAttr` on a district (kind, identity, `DistrictIntent`, band); `merge` and `split` of districts |
| T6 `place` | `placeAt` (its point form, and its `lift`), `assign`, `unassign`, `build`, `drawFootprint`, `rejectSite` (and its `lift`), `drawChamber`, `placeAccess`, `addUndergroundAccess`, `instance` on a hood pin (add, move, remove, restyle; V01's furniture stamp, item 349), `roster` of one line (a place by a locus — the drop target or the typed words, V09 §4.5; item 570); `convert` `relet` (item 353), `openUse`, `closeUse`, `relocateUse`, `mutate`; `swapUse`; `setAttr` on a market's `rank`, a use's `concealment` and `front`, an institution's `powers` |
| T7 `roster` | `roster` of any number of lines |
| T8 `fill` | `fill`, `setField` (density, greenery, prosperity), `drawGreen`, `setAttrMany` of land use, `instance` on trees and §8.10's other decoration instances (add, move, remove, restyle; the tree brush's groups); `setAttr(fabric)`, `setAttr(fabricParams.*)`, `setAttr(terrace)` with their `regenerate` (each pair one undo group: the layout card, the Terraces chip) |
| T9 `shape` | `split`, `join` and `merge` of ways and plots; `moveFootprint`, `setEntrance`, `paint`; `setAttr` on the shape paths (a building's class, heights, roof and basement; a plot's tenure, reach and front jitter; a way's class, width, surface and name; a bridge's kind; a square's type; a block's content; a raised way's spans, crossings, `clearanceCm` and `spanSpacingCm`; a wall stretch's grade; an access point's paths; a catacomb's `fill`; an island's and a sky access's paths; a mutation plan's step); `moveVertex` on an access point and on an island's key; `setMassing`, `setComposition`; the plan events, `setHearth`, `instance` on furniture; `drawPassage`; `convert` `sealPassage`, `openPassage`, `densify`, `thin`, `subdivide`, `amalgamate`, `plotToGarden`, the decline kinds, `rebuild`, `burn`, `downgradeWay`, `upgradeWay`, `repairRaised`, the tunnel and island kinds, `raiseGrade`, `clearUndercity`; `startWorks`, `cancelWorks`, `setAttr` on a Works; `editTable` on `siting.declared` and `siting.linkEdits`; `delete` of an access point or of catacomb galleries; every `setAttr` path no other row homes (a person's attributes, a use's specialisation) |
| T10 `hold` | `lock`, `unlock`, `pin`, `unpin`, `revert`, `regenerate` (keep, New random, a rung, a tunnel run or system, an island's `shade`, a household's people — the scope `people`, §10.3), `rerollLayer('village.track')`, `delete` of anything else (a dossier-backed element's recorded as `rejectSite`, a dossier-declared record's refused, a generated removal holding — *Delete* above; item 368) |
| T11 `name` | `setAttr(name)` (a room's on `plan/rooms/<id>/name`, V03 §4.2; a new `HoodPlace`'s, V01), `setAttr(displayText)`, `setAttr(knownTo)` on a plot, building or institution, `moveLabel`, `hideLabel`, `group`, `rerollLayer(naming)` |
| T12 `dress` | `setStyle`, `setLayer`, `paintGround`, `placeLight`, `setAttr` and `delete` of a light, `rerollLayer` of `style.compass`, `naming.emblem`, `render.instances`, `style.jitter` and `style.crowns` |
| no tool — its producer | `setAttrMany` other than land use (the multi-selection's context panel); `closeup` (the first presentation edit inside a close-up); `editTable`, `editPreset` (the tables editor and the presets dialog, §7.6); `epoch` (V06's `advance` from T1 `intend`'s time card, a timeline entry, the port's cadence; the history replay's runner at generation, §4.11 *History-first generation* (2), §7.4's `epoch` row); `undo`, `redo` (the undo keys, the API, a host's `doc.apply`); `upgrade`, `rebase` (the upgrade offer, the load-mismatch choice, the frozen view, Rebuild around my drawings); `dossierFacts`, `dossierRecord` and every dossier event (the port only); `convert` from an epoch (the engine) |

* **Sugar events** (J-A101.72; the one statement of their expansion) are logged as themselves — one undo step, one fate
  report — and expanded at their fold into the events they stand for by the sugar expansion table (`sugar.json`, §7.6)
  at the version the event records (`expansion`), so a replay and an upgrade expand them exactly as the session did
  (§7.5); what an expansion creates is minted from the sugar event's `seq` (§6.3). `placeGate(enceinte, at)` is a short
  through-way stub of the enceinte's gate class crossing the trace at `at`, square to it, so S7's operator builds the
  gate there — and a gate also arises wherever a declared road on ground part 0 crosses a wall (§7.3's S7 row), while an
  aqueduct crosses by an arch and a raised road comes down before the trace (above). `quarter` is a `drawBoundary` (with
  its kind's size band and snap), a whole-neighbourhood `assign` naming that kind as its `function` — which §4.5's
  character reads as it reads a dossier kind, a declared kind winning over an emergent identity —, a `setAttr(name)`,
  `setAttr(district.fabric)` when `fabric` is given and `setAttr(district.terrace)` when `terrace` is given (V01), and,
  when a band is given, a `setField(prosperity)` stroke over the boundary moving its mean to the band's centre; at a
  village rung it expands to `declareEnd` carrying its `boundary` (V07 §4.1). `roster` is one `assign` per line (its
  class, name and locus as `PlacementCriteria` hints; a line whose `name` is `''` makes an assignment with no `name`,
  which S13a names as it names any place the rules placed — item 571), all in one group and solved together by §4.7
  S10b's solver in one dry run in its claims-first order; a line the rules cannot honour is bent, listed with its
  closest options (`bend.roster.line`). With a dossier connected the roster is the dossier's: a line must name a dossier
  element (`RosterLine.element`) and expands to a `placeAt` of it — the author may only place. `group(name, quarters)`
  creates a named region label group over those nodes of §9.1's quarter tree. `terrace` is above.
* **Points in, shape out, handles always** (item 101 (i); J-A101.73). `drawBoundary`, `drawWater`, `drawWall`, `drawWay`,
  `drawTunnel`, `drawChamber` and `placeAt` take a points form (`PointsForm`; water also a level): the dry run derives the
  shape with the operator that builds that class and stores it in the event's geometry fields, resolved, as `EditScope`
  is, so no replay and no later derivation re-derives or moves an accepted shape. A client sends a points-form event with
  each geometry field the dry run resolves written empty — `points: []` (`drawWay`, `drawWall`, `drawTunnel`), `boundary:
  []` (`quarter`), `add: []` (`drawWater`), `polygon: []` (`drawBoundary`, `drawChamber`), and a `placeAt`'s `plot: ''`
  (item 367) — beside its `from`; the dry run fills them, so every surface writes one byte form (T101-3). A **quarter** grows from its seed point
  along block edges to its kind's size band by §4.5's grower, or to `sizeM2` within that band when given (two to four
  points give its far edges; a lasso its outline), its boundary snapped to street centre-lines, water, walls and ridges
  and never through a block, the kind steering the snap (a harbour quarter hugs the shore, a manor quarter prefers high
  dry ground, a market quarter centres on a square); a **lake** fills the basin S1's terrain gives it to the declared
  level, and with `spring` it is an oasis — S1's spring-fed pond or small lake with its grove and irrigated gardens (§4.2
  S1, g item 111); a **river** runs from a source to a mouth by S1's water operator; a **coast and harbour** take a sea
  level and one shore point with a basin size, their quays by §4.8's harbour rules; a **wall** follows ridges and contours
  between two or more points by S5a's trace, closing when its ends meet, its ends snapped to barriers and the barrier arcs
  shown as part of the circuit (item 106 (g)); a **road** joins its points, pair by pair, by S4's router with its class (§4.3); a
  **tunnel** its two points by the network's router (II.7); a **chamber** takes one point and a size or three or more
  points; a **place** takes the plot its one point selects — the plot under it, else the nearest lawful one by §4.7 S10b
  — and S11's site plan. The derived shape keeps four to eight handles by default (more on demand); dragging one is a new
  declaration of the same kind on the same entity (a `drawBoundary` with the district's id, a `moveVertex`, a
  `moveCourseKnot`), so its fates list what re-derives, locally. The authoring surface's feature snap (§9.5) is visible
  and escapable and is resolved into the event's points before the dry run; the kernel's attraction (§3.6) applies to
  every insertion and is never escaped. A brush is many seeds and a lasso many points: one event kind per thing.
* **Three surfaces, one vocabulary.** The canvas (§14's reference UI), the clerk's tool API, over §11.2's embedding API,
  and the skeleton file (§11.1 — the ordered declarations, imported as the log's creation prefix and read ahead by their
  stages, §7.4) produce identical events. A clerk's proposal is a dry run shown as a ghost; accepted, it commits with
  `proposedBy: 'clerk'` and the user as its author (J-A101.74). The clerk never bypasses the dry run or the undo, never
  writes a dossier fact, and reads only what its viewer may know (§9.2). The tool API and these events are the base's;
  the built-in clerk is staged (M3c; *Staged by the owner's roadmap*), and plots on a bridge deck, a mole, a jetty or a
  quay platform are built with item 110 (d).
=== END ===

=== REPLACE ### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) ===
### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

Three input layers above the parameter vector, all persisted in the recipe — a pointer names one as §7.7 layer n,
while §7.7 item n names the dossier contract's item n (below) and a bare item n is an owner or amendment item:

1. **Intent** (outcome targets; `Intent`, below): form archetype, size as population / area / buildings with a
   tolerance, water setting and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient
   direction, era and region preset, defence level, density, latitude. **Expansion** (intent → ≈ 200 internal
   parameters) is a pure function held in data: each intent field maps to internal parameters by `{param, fn:
   'const'|'linear'|'smoothstep'|'table', args}` rows (tables interpolate linearly), evaluated in a fixed order. **Rows
   are continuous**: no rounding and no comparison inside a continuous control — a discrete outcome is a probability
   drawn per entity or a discrete control that declares itself (§7.8). Example — `wealthLevel ∈ [0, 1]` →
   `field.characterOffset = lerp(−0.3, +0.3)`, `granularity.joinMaxBonus = 2 · wealthLevel` (fractional: its fractional
   part is the probability that a candidate plot takes one more join, drawn from the `plot.join` stream),
   `greenery.parkPer1000 = lerp(0.1, 0.8)`; item 71's class mix reads `wealthLevel` itself — no expansion row — moving
   every band row's weights toward the larger classes in a rich town and the smaller in a poor one, the cuts staying the
   town's own (§4.7 S10b; J-A71.42); `planned ∈ [0, 1]` → `growth.headingSigma = lerp(20, 5)` degrees per 100 m of
   street, `growth.crossroadProb = lerp(0.02, 0.15)`, `avenues.probability = smoothstep(0.3, 0.7, planned)` per eligible
   tier-1 way. Every internal parameter is documented (unit, range, effect, provenance, consuming stage) and reachable in
   the advanced panel (O10 a); the registry test proves 100 %. **Surprise me** (the one statement) draws every intent
   field from its declared range and weights on the `intent.surprise` stream of a fresh seed and writes the drawn intent
   into the recipe of a new document, so the town's link reproduces it. For a dossier-bound map the port's creation half
   fills the intent from the dossier by the derivation table (§7.7 item 10; `wealthLevel` from the dossier's prosperity
   word, `latitudeDeg` by DR29); the filled values are map facts (§7.7 item 9) and stay editable.
2. **Character and circumstances** (items 72 and 76–79): the per-district **intent** — `DistrictIntent` (wealth,
   density, age, function mix, planned / organic, greenery, fortification, building scale), supplied automatically per
   district and overridable — is the input that shapes a district's generation; a district's **character** is item
   72's derived profile (`CharacterVector`, §2.5), read from what was built and naming the district (§4.5), never an
   input. The **circumstances** are one `CircumstanceSlice` (below) per entry of a **timeline** dated in weeks — §4.11's
   week (*The clock*; item 76) — on a dossier-bound map the dossier's own weeks, its present week the dossier's latest
   stamped tick (item 125) — that *schedules* epoch events: an epoch
   happens only as an `epoch` event in the log (§7.1, hook 8), proposed by the app at a timeline entry or by the port at
   §4.11's cadence, and the timeline's first entry is the creation slice S0 reads (§4.2). The season is read from the
   week through §4.11's calendar row and never stored (the view's default season: DR42, item 117); an epoch's population target and terrain events ride its
   `EpochInputs` (§4.11); a government's kind names its lordship (§10.2). The slice carries the activity scalars —
   market, harbour and main-street activity, default 1 — that the prosperity field's kernels read under decline
   (§4.11), the port's per-settlement values (`port`, V08 §2.5's; null standalone; item 389), and the recipe's feature set holds `layers.islands`, II.6's model setting (§7.8).
   **The typed slices** (items 77–79) are read by item 72's dials and terms (§4.5) and by S2 and S3 (§4.2); each is
   recipe data at creation and epoch data afterwards; the port fills them from a dossier, and standalone the blueprint
   and our own rows fill them by the same rules, so every reader sees the same fields with or without a dossier
   (J-A77.71).
   - *Trade* (`trade`, `entrepot`; item 77). **Partners**, in order: the dossier's named neighbours and the partners its
     trade links name, each keyed by its binding key (§7.7 item 12); with none, one derived partner per through route of
     the settlement's access row (`source: 'derived'`); standalone, one per external bearing the blueprint requests, else
     per through route of its access intent. **Weight**: a partner's listed trade links (a named neighbour with none
     counts one), zero for a `hostile` relationship or a suppressed economy — a rival's or a cold-war partner's listed
     links are kept, as SettlementForge keeps them — normalised to Σ = 1, derived partners sharing equally. **Mode**:
     where the site has navigable water, the partners in weight order take `sea` (a harbour) or `river` (docks on a
     river) until their weights cover the water fraction of all toll and duty income — the income rows the port marks
     water (port duties, river tolls) over all it marks water or road (gate and road tolls) — and the rest `road`; with
     no such income the water fraction is the site's default (one half for a harbour town, one quarter for a river town;
     our own values, calibratable); without navigable water every partner is `road`. **Bearing**: the user's setting
     where the blueprint gives the partner one (a standalone partner's requested bearing); else a draw on `gate.pick`
     (§6.1), uniform over the arc the site admits for its mode — open water for `sea`, the river's upstream and
     downstream reaches for `river`, the land arc for `road` — so a partner's bearing never moves when unrelated facts
     change; no host input gives one (item 125 (b)). The `road` partners' bearings are among S3
     (4)'s requested external bearings (§4.2); every partner's bearing and weight feed `TradeFlow` — the per-gate and
     harbour weights and the dominant bearing — which is derived from the slice, `entrepot` and the road-and-gate
     geometry at §4.3. No input sends a true bearing after creation (item 125 (a)):
     a partner's bearing changes by a user's edit alone, and the geo anchor's `bearingDeg` (§11.1) stays a user setting.
   - *Economy* (`economy`; item 78). Shares over the sectors of §10.2's `RosterTables.sectors`, Σ = 1: with a dossier,
     its income sources mapped to sectors by the port's revenue rows (a revenue with no sector — rents — drops out and
     the rest renormalise; J-A78.71); standalone, the blueprint's economy setting, by default an even mix, which
     amplifies no class (J-A78.72). Read by item 72's economy dial (§4.5) at creation and at each epoch past its
     hysteresis (§4.11) and by S2's town-level character (§4.2 S2, §10.2); the shares are read, never modelled (D-10,
     D-32).
   - *Powers* (`powers`; item 79). One standing per power: with a dossier, `standing` = its power ÷ the settlement's
     total, its kind by the port's category-and-name rows (military and arcane powers included, §2.7), `governing` and
     `secret` from the dossier; standalone, the governing power the `government` row names and the established religion
     (§10.2's rows), 0.6 and 0.4 (our own defaults, calibratable). `appliedStanding` starts at `standing` and moves only
     past the dials' hysteresis at an epoch (§4.11). The base reads standings, never materialised factions — `Faction`
     stays the module's (§10.1); an `arcane` standing is honoured whenever a dossier states it and, standalone, arises
     only under a `magic` circumstance above `none` (D-3).
   The **undercity** setting (item 65; `auto` by default) is `require` when the dossier lists a subterranean
   district-scale record — placed as a `neighbourhood` assignment that II.7.5's existence test must host — and `forbid`
   when the blueprint or the host's circumstances rule one out; `disorder` (0–1, default 0) is the lawlessness II.7.5's
   size law reads, the blueprint's setting (a timeline entry's over epochs); the dossier's crime scalar never fills it —
   it reaches the undercity through §4.6's staged crime term alone (item 88; J-A88.41, J-A88.73), so crime is counted
   once.
3. **Constraints**: pins and **assignments**:

```ts
// — layer 1's record: the recipe's intent, `Recipe.intent` (§2.9); layer 1's expansion rows turn it into the internal parameters
interface Intent { form: string /* a forms-catalogue row (below) */; population?: number; areaHa?: number; buildings?: number /* the size: any of the three */; tolerance: number /* the size's relative tolerance */;
  water: WaterSetting /* §13.3's one spelling */; coastSideCdeg?: Cdeg; gates?: number; wallRings?: number; planned: number /* 0–1: planned ↔ organic */; wealthLevel: number /* 0–1 */;
  wealthGradientCdeg?: Cdeg /* the wealth gradient's direction */; era: string /* a row key of the `era` table (`EraRow`, V11 §2.8, V11 §3.19.1); item 400 */; defence: number /* 0–1: the defence level */; density: number /* 0–1: the density control (§7.8) */;
  latitudeDeg?: number /* degrees north; the model-side sun's latitude (item 102 (a)); DR29 fills it for a dossier-bound map; absent reads 50 (§7.5) */ }
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'|'feature';
  target?: Id /* one building / plot, one district, or — granularity 'feature' — the way, bridge, quay or pin a named-feature claim names (§7.7 item 16) */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  criteria?: PlacementCriteria /* a building or neighbourhood assignment's own soft rows: a naming claim's location phrase (§7.7 item 16) */;
  claim?: { kind: 'name'; bias: { identity: string /* a quarter identity row (§10.2) */; weight: number }[] } /* a naming claim (§7.7 item 16): it names and biases, never zones */;
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read against §4.7 S11's designation template (item 19); typed in §2.6 (MC-11) */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */;
  existence: 'map'|'dossier' /* dossier: the element exists on every map the module returns (§7.7 item 2) */; dossier?: DossierRef /* §7.1: its `element` is the binding key (§7.7 item 12) */;
  state: 'active'|'ruined'|'removed' /* item 80: written only by dossier events through §7.7 item 14's rows; a map assignment stays 'active' */;
  memberState?: Record<Id /* a placed member */, 'ruined'|'removed'> /* a dispersed assignment's members a collective record's state reached (§7.7 item 14); an absent member is active */;
  custom?: { uid: string; revision: string; contentHash: string } /* dossier-owned: a custom record's definition revision; a setAttr of custom.revision with cause custom_revision re-reads the carried fact, re-resolves item 104 (a)'s profile and re-sites the use by least disruption (V08 §2.8, V08 §3.13 (10); item 394) */;
  use?: Id /* the Use record the assignment names (§2.7); the assignment moves with it (item 17 (d)) */; pinned: boolean /* stays where it is under epochs and re-applications; the town adapts around it */;
  knownTo?: 'public'|'local'|'secret' /* item 30 (d): a dossier fact when the dossier sets it (§7.7 item 9); §9.2's label policy reads it */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a dossier fact when the dossier sets it; resolved and placed by §4.7's concealment rule */;
  front?: string /* item 63: a front the dossier names — its class or its name; absent: §4.7's cover table picks it */ }
type PlacementCriteria = RelationRule[];   // per-assignment overrides of the class's relation rows (§10.2, §4.7 S10b): nearM → a `near` row, minSpacingM → an `avoid` row on the assignment's own members, frontageClass → a `frontage` row, districts / districtKinds / prosperityBands → `band`-class filters; also written by item 110 (b)'s raised-way generator on the one conduit house bound to an aqueduct's cistern terminal (V11 §3.24.7 (1), id pc/aqueduct/<way lineage>; item 401)
// PlacementSolver, PlacementRequest and PlacementResult are §4.7 S10b's — the one solver every placement path calls (item 16)
interface Rejection { element: Id; site: Id; seq: number /* the rejectSite event */; held: { epoch: number; populationTarget: number /* the target in force when the rejection was made: the last folded epoch's EpochInputs.populationTarget, else the population the recipe resolves to at S2 (§4.2) */ }; lapsedAt?: number /* the seq of the epoch or dossier event that lapsed it */ }   // model data, in the digest (§2.8 lists it); the solver reads it as PlacementRequest.rejected while lapsedAt is unset
interface DisruptionBudgetRow { kind: 'dossier'|'positive'|'relocation'|'assignment'; weights: { displacedUse: number; join: number; subtractedPart: number; vacated: number }; budget: number; displacementDepth: number }   // a rule table (§7.6); defaults displacedUse 1, join 2, subtractedPart 0.5, vacated 1, budget 6, displacementDepth 1 — our own values, calibratable
// — layer 2's records (items 72, 76–79); declared here once and read at their homes
interface DistrictIntent { district?: Id /* absent: the town-wide default */; wealth?: number; density?: number; age?: number; functionMix?: Record<string, number> /* Σ = 1 */;
  planned?: number; greenery?: number; fortification?: number; buildingScale?: number }   // each 0–1; an absent field is derived; the input a district is generated from, never item 72's derived CharacterVector (§2.5)
interface CircumstanceSlice {
  era: string /* a row key of the `era` table (`EraRow`, V11 §2.8, V11 §3.19.1): tower kinds and spacing, moat width, intervallum, market paving, public lighting, fuel and timber per head, pump date, harbour chain, suburb regime, material rows */; biome: string /* §4.9's climate rows */;
  government: Government['kind'] /* its row forces the seats (§10.2) */; threat: number /* 0–1: the defence level's source at creation (§7.7 item 10, DR2); the evolution engine's over epochs */;
  disorder: number /* 0–1, default 0 (item 65) */; undercity: 'auto'|'require'|'forbid' /* item 65 */; magic: 'none'|'low'|'high' /* item 68; 'none' by default under D-3 */;
  landscape: { fertileLand: boolean; mines: boolean; quarries: boolean; fishing: boolean; logging: boolean } /* the S0 landscape toggles (§4.2) */;
  activity: { market: number; harbour: number; mainStreet: number } /* default 1 each: the prosperity kernels under decline (§4.11) */;
  trade: TradePartner[]; entrepot: boolean; economy: EconomyShares; powers: PowerStanding[] /* items 77–79 */;
  port: PortValues | null /* V08 §2.5's per-settlement values; null standalone (item 389) */ }
interface CircumstanceTimeline { entries: { week: number /* §4.11's week */; populationTarget?: number; slice: CircumstanceSlice; events?: EpochInputs['events'] }[] }   // Recipe.circumstances (§2.9): entries in week order, the first the creation slice; applied only through `epoch` events (§7.1)
interface TradePartner { key: string /* the partner's binding key, or a standalone name */; mode: 'road'|'river'|'sea'; weight: number /* Σ = 1 over the partners; 0 for a hostile one */;
  bearingCdeg: Cdeg; relationship?: string /* the dossier's word for the neighbour relation */;
  source: 'dossier'|'derived' /* an older schema's stored 'realm' reads 'dossier', its bearing kept (§7.5's schema chain; item 125) */ }
type Sector = string;   // a row key of §10.2's RosterTables.sectors — trade, taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion, military, magic, crime
type EconomyShares = Record<Sector, number>;   // Σ = 1 (item 78)
interface PowerStanding { key: string /* the power's binding key, or a standalone name */; kind: Faction['kind']; standing: number /* Σ = 1 over the settlement's powers */; governing: boolean; secret: boolean;
  appliedStanding: number /* the value item 72's dials last applied: moves only past their hysteresis at an epoch (§4.11) */ }
// — the dossier contract's records (§7.7 items 10, 12–14; the port that fills them is §14's)
interface DerivationRow { row: string /* DR1 … */; family: string; covers: string[] /* the §2.8 registry kinds and attribute paths the row derives */; inputs: string[] /* digest fields, in the order read */;
  rule: string /* the section whose rule derives it */; chance: string /* a §6.1 concern, or 'none' */; bar: string /* the coherence bar it holds (§7.7 item 11) */ }   // tables/dossier/derivation, provenance own
interface DossierBinding { line: string /* the SettlementForge line (item 73) */; adapter: { line: string; version: string };
  rows: { dossierKey: string /* the binding key */; entity: Id /* the address that carries Identity.dossier (§2.8, §6.3) */; kind: string; since: { seq: number }; rebound?: { from: string; seq: number; receipt: string }[] }[];
  quarantined: { key: string; reason: string; since: number /* the seq of the dossierFacts event that first carried it */ }[];
  notes: PortNote[] /* the standing notes, rebuilt by folding the dossierFacts events' notes and notesCleared (V08 §3.6 (4)) */;
  factHash: Hash128 /* of `carried` */; absorbed: { seq: number; week: number | null; factHash: Hash128; changeIds?: string[] /* kept for the newest 64 entries */ }[] /* every absorbed state, newest last (§7.7 item 5's convergence report) */ }   // item 390
type CarriedFacts = Record<string /* binding key */, CarriedFact /* V08 §2.3's union with V08 §2.8's custom kinds: the dossier fact's fields as the port's digest holds them */>;   // the "previous dossier" §7.7 item 1's diff runs against
interface DossierChange { changeId: string /* the host's event, outcome or decree id; else a Hash128 of (element, op, week) */;
  source: 'event'|'pulse'|'decree'|'regeneration'|'edit'|'diff'; week: number | null /* §4.11's dating rungs; null: applied finished, without transition stages */;
  cause?: { kind: string; ref?: string; author?: string /* the host's author word */ };
  element: { kind: 'settlement'|'institution'|'power'|'notable'|'resource'|'condition'|'trade'|'quarter'|'government'|'deity'|'relation'|'port-values'|'chain'|'dependency'|'calamity'|'evidence'|'custom-def'|'custom-chain'|'custom-service'|'site'|'history'|'tradition'; key: string /* the binding key */ };
  op: 'add'|'remove'|'state'|'attr'|'tier'|'population'|'prosperity'|'power'|'rename'|'reopen'; before?: unknown; after?: unknown; fate?: string;
  reason?: string /* the host's reason, shown beside the map's rule in the disruption report */; receipts: string[] /* the receipt fields found (§7.7 item 13) */ }   // EditBase.dossierChange (§7.1)
interface ReceiptRow { row: string /* F1 … F22, F-V8-1 … F-V8-8 */; element: DossierChange['element']['kind']; op: DossierChange['op'];
  receipts: string[] /* the receipt fields in precedence order: the first present decides cause, fate and week */;
  response: 'assign'|'unassign'|'setAttr'|'status'|'rebind'|'epoch'|'converge'|'none'; dating: 'receipt'|'arrival' }   // tables/dossier/receipts, provenance own, the SettlementForge line in its header; `rebind` is emitted as a setAttr of the bound entity's dossier ref (V08 §3.6 (5))
interface StatusRow { status: string; fates?: string[] /* keyed first (§7.7 item 14) */; response: 'open'|'wear'|'dial'|'smaller'|'removed'|'ruined'|'none' }   // tables/dossier/status
```

**Precedence: lock > dossier existence > assignment > user-drawn geometry > rule tables > defaults** — the one order for
every meeting of protections and inputs (§7.2, §7.1's outcome table); S10–S11 apply it to assignments. A targeted
assignment on a locked entity (or a locked attribute path) is refused with the actions unlock, one of the closest
acceptable declarations that leave the locked entity untouched (item 20 (g)), or keep the lock (§7.1's outcome table);
the dispersed solver never places a member on a locked entity. A host's map event (no `EditBase.dossier`) that must
override a lock sends an unlock first, and the log records it (J-DET-11). **Dossier existence** — with every dossier-owned value (§7.7 item 11)
— sits below the lock for every map event, re-derivation and epoch (a dossier event that changes a locked value
supersedes that lock, below) and above every assignment, drawn shape and rule (the one statement): a dossier-backed element is
never removed by anything on the map and never placed on a locked entity — it takes the best unlocked site the hard rows
allow and, when no site passes them, its first closest option — the fewest hard rows failed, then the best score, in
§4.7 S10b's order — with the rows it fails reported (§5.2 F-SITING), never omitted (J-A20.71).
**A dossier event is never refused by a lock or a pin** (items 20 and 22 first, principle (3)'s precedence; V08 §3.3). A
lock or pin on a dossier-owned value, or on a dossier-backed element's existence, state, name, kind or membership, holds
against every map event, re-derivation and epoch; a dossier event that changes it supersedes it for what it changes —
the lock or pin reported orphaned in the event's disruption report (`why`: the dossier fact) and kept in the log as
history (§7.7 item 5), its other paths still held: a dossier rename lands on a locked name path, a dossier `ruined` or
`removed` state on an institution whose building is locked ruins or closes that building's use (§7.7 item 14), a class
change re-classes a locked class path, a dossier `knownTo` replaces a locked one. A lock on anything else the event
touches is honoured, the event applied around it by its least-disruption order. A dossier population is met through the
epoch's departures and arrivals: where the unlocked dwellings cannot absorb a fall, the leaving households (the roster's
suffix, §4.11) leave locked and pinned dwellings too, each by a `relet` down (V06 §3.5.1 (4)) — even a protected dwelling's
last household, its building then standing empty but never `vacate`d, so it keeps its state, shell, existence
and every locked path — counted `uses.heldByProtection` in the epoch's report. Where the unlocked households cannot
meet the fall, the leaving households are taken from locked and pinned households too, in the roster's suffix order
(§4.11), each lock or pin reported orphaned in the epoch's disruption report (`why`: the dossier's population) and kept
in the log as history: the population is the dossier's (item 8 (f)).
*Fixtures (B-DOSSIER-lite, §13.2's T20-14 – T20-16):* a dossier rename on a locked name path, and a `ruined` and a
`removed` state on an institution whose building is locked — each lands, the lock reported orphaned, every other locked
entity byte-identical (T20-14); a dossier population fall over a town whose remaining households all live in locked
dwellings — the population met within the roster tolerance, every locked building's state and shell byte-identical,
the emptied ones counted in `uses.heldByProtection`, no `vacate` emitted on a locked or pinned building (T20-15); a
fall over a town whose remaining households are all locked — met within the roster tolerance, every superseded
household lock reported orphaned (T20-16).

**One path — placement, then mutation (items 16, 18).** A blueprint's assignments and edits, every element of a dossier
a new document starts from — the port's creation half (§14, item 73) builds that blueprint and this prefix through the
derivation table (§7.7 item 10), the recipe's seed derived one way from the dossier's (§14, item 85) — and the
declarations of a skeleton file imported as a new document (§11.1, item 101), become `assign`, `dossierRecord` and edit
events of the creation prefix (§7.4 *Replay semantics*: S2 reads its `assign` events ahead — the dossier's elements
counted in S2's demand as well, so their land is claimed eagerly at S7b and S10 (3) places them claims-first, J-A22.72;
its staged-record puts and a skeleton's drawn declarations are read ahead by the stages that use them); every `assign`
event — from the blueprint, the dialog, the host bridge or the host door (§11.4) — is placed by §4.7 S10b's one solver
for its scope (claims-first in the creation prefix, the least-disruption order after the city is built) and applied to
each placed plot by §4.7 S11's designation mutator, so an assignment gives the same town whichever way it arrived and
never re-rolls what stood there. **A product's records placement** (item 202): at a rung of a product that declares
`ProductDecl.records` (V07 §2.1), an added record is first offered to that placement, which places it or declines it, a
declined record taking S10b's placement as above; each removal of a record by §7.7 item 2 (through `closeUse`) is
followed by the placement's `remove` call — on an epoch's path at §4.11's dossier step (e) and on an absorb without an
epoch alike, drawing and minting as a post-build placement does (§6.1, §6.3). **Re-solving:** when a member of a
dispersed assignment is superseded without a successor, only that member is re-placed, with every mapped placement as a
fixed point (the minimum spacing is measured from them); nothing still mapped moves. **Epochs (item 17 (d);
J-A17.71):** an assignment is a stable identity that moves with its use under §4.11's use step unless `pinned`, in which
case it stays and the town adapts around it; members are added only by an event that changes the count or the criteria
and are then placed with the existing members fixed; every move, closing and reopening is reported (§5.4's `changes`,
§11.3).

**The dossier contract (items 20 and 22; owner: "the map does not edit the dossier … This module only takes input from
SettlementForge and returns back the map").**
1. *One way.* SettlementForge → map module → map. The dossier enters through the host door of §11.4 as dossier events —
   `assign`, `unassign`, `setAttr`, `dossierFacts` and `dossierRecord` events with `author: 'host'`, `EditBase.dossier`
   and `EditBase.dossierChange` set (§7.1) — in the host's order; the module never writes to, patches or proposes a
   change to the dossier, and the bridge has no message that does (§11.3). Map edits live in the map's own document
   (§2.9), which the host may store as an opaque artifact; nothing in it flows back. **The port produces the events**
   (§14, item 73). SettlementForge sends whole dossiers and no change list, so the port DIFFS the incoming dossier against
   the dossier facts the map already carries by their binding keys (`Document.dossier.carried`, §7.7 item 12) — no
   host-side history is needed — writes one `DossierChange` per changed element (§7.7 item 13), dates it by §4.11's
   dating rungs (item 76) and emits its events, the absorb's first event its `dossierFacts` ledger (V08 §3.6 (4)).
   **The map never asks** (item 20 (h) (iv); the owner: "it is one directional"): a gap in the dossier is the map's to
   fill by the derivation table (§7.7 item 10), never a request — no message, report or field asks the host for a fact,
   and neither the doors (§11.4) nor the port takes a data input beyond the dossier (item 125 (a); J-A20.79):
   `HostContext` (§14) carries no fact — its `audience`, `displayNames` and `line` change no document a dossier makes
   (T125-2) — and the host's commands (§11.3: a week and a selection by `view.set`, the layers shown by a logged
   `setLayer` sent by `doc.apply`, as a user's toggle) are commands, never inputs, which the map never needs (item 125
   (c)). The port reads a custom institution's dossier record —
   `source: 'custom'`, its `localUid`, category, tags, description, `required` and scene tokens — and the library's
   definition fields only where the dossier itself carries them, in its `customContentRoster` and
   `customContentProvenance` entries (item 104 (a) (5)'s "when the port receives them", received only through the
   dossier); without them item 104's generic siting supplies what they would, the absence reported —
   `HostContext.customLibrary` is no input (item 125 (a), (e)). **What the port never reads** (item 86; J-A86.71), by reason — the paths are V08 §2.4's field table, the
   one list (its `ignored` rows, each with its reason), read by `AdapterManifest.keyList`, T-V8-20's ignore clause and
   §6.5 (3)'s key-list lint: a host's own map-side layers and its derived reads (the spatial substrate and every spatial
   ledger included); its generation log, internals and sliders; its NPC social groups and the NPC layer beside them; raw
   inputs (the resolved configuration is read); copies of institution records and generation scores (walls come from the
   `@wall` kinds rows, defence from `monsterThreat`, the deposits from `config.nearbyResources*`); the host's own
   verdicts; the lived keys; and prose beyond a description seed the clerk may read (item 101) — a custom record's
   description is read only inside the adapter, reduced to keyword keys and never carried (item 104 (a) (6); V08 §3.13
   (3)). Two parts are read by the owner's rules: the defence readiness (`defenseProfile.readiness` alone; item 114,
   V08 §3.16 (2)) and the traditions with the custom-content traditions bucket (item 118, V08 §3.16 (5)). **The
   closed-digest rule** (W-DOS-01a): inside a record the port reads, a field no `DossierDigest` field names is not
   read. Nothing of the campaign beyond the dossier is read — its placements of the settlement and its partners, the
   realm map, its scale and latitude scale, the frozen `spatialDigest` (item 125 (a); item 396's realm block is no
   input): the latitude and the site's words they would give are the dossier's where it carries them — its culture
   (DR29), its terrain type, access and deposits (DR1, DR19, DR42) — else the generator's defaults; the partners' and
   the deposits' bearings are the generator's draws or the user's settings, never an input (layer 2's *Bearing*, DR3,
   DR19; item 125 (b)). The adapter reports every key it dropped
   (`ignored_key`, §14). The reasons: a host's own map
   memory would make its map program the base, against the owner's rule that what we build stays the base; the sliders'
   effect already sits in the institutions and the income shares, so reading them would count it twice; and
   SettlementForge's own district names — in its news — are never matched to our districts (owner, J80 Q6; J-A86.72).
2. *Existence* (the one statement; §7.2 and §5.3 cite it). Everything the dossier specifies — buildings, institutions,
   assignments, named features — is a dossier-backed assignment (`existence: 'dossier'`) and exists on every map the
   module returns, live or — when the dossier lists it ruined — present as its ruin (§7.7 item 14): F-SITING never drops
   it, `delete` never removes it, and only a dossier event removes, adds or re-designates it; a removal (`state:
   'removed'`, §7.7 item 14) leaves the plot vacant through `closeUse` (§4.11) for item 17's rules to re-use. The
   dossier's population is a dossier fact as well — a count, which the households that fill it honour: they are map facts
   (§7.7 item 9), derived and housed through the roster's demand (§10.2). A map event — one a user, or a host's map edit,
   appends without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element is refused
   (§7.1's outcome table), with the actions `rejectSite` (move it) and `placeAt` (designate the plot for something else,
   the element re-placed): an `unassign`; a `setAttr` of its use or class; a `convert` `closeUse` of its use or `mutate`
   of its plot to another designation; a conversion that empties or removes the building that houses it (`vacate`,
   `abandon`, `decay`, `ruin`, `robStone`, `clear`, `demolish`); a plot `join` or `split` whose fate would demolish that
   building. A map `delete` of it is recorded as `rejectSite` (§7.7 item 3), and a `relocateUse` or `swapUse` moves it and
   is not refused (J-A20.75). An `epoch` is bound by the same rule without being refused by it: no step of an epoch closes
   a dossier-backed use or leaves one without its building — §4.11's *Dossier content across epochs* relocates it first,
   or keeps it in its building, wherever a step would close it or empty or remove that building — so every dossier-backed
   element is live and placed — or present as its listed ruin — after every epoch (§5.3's row). Elements the generator
   added on its own — filler houses, trees, lanes — may be deleted on the map with local repair, and whatever the dossier
   needs of them (housing for its population, a demanded class) is re-provided elsewhere by the same solver (J-A20.72).
3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1). A generated
   entity that no dossier record binds — a raised way, a retaining wall (a generated terrace's walls among them) or a deck
   plot among them (item 110) — is deleted as any generated content (§7.1 *Delete*), and the deletion holds through
   regeneration, every absorb and every epoch; a dossier record read as an input of its reason does not bind it (item
   260). For a rejection, the site is excluded (`Rejection`, above; `PlacementRequest.rejected`), the solver re-places
   the element by the least-disruption order (§4.7 S10b) and the surroundings repair locally (§7.3), from the same seed.
   The rejection is not permanent (owner: "it is not permanent because if a settlement grows or declines that might be
   appropriate to put something there"): it holds while the settlement stays in the state it was made in and **lapses** —
   the site eligible again under the ordinary rules, the element staying where it is — at the first `epoch` event folded
   after it whose `populationTarget` differs from `held.populationTarget` by more than the roster tolerance (§4.11; item
   76; J-A76.43, J-A76.71) — the settlement has grown or declined, not drifted — or at the first dossier event folded
   after it whose effective scope holds the site's block; the lapsing event writes `lapsedAt` into the record inside its
   own touched set, so no event is logged for the lapse, and an undo of a lapsing epoch outside the port's session
   `host:port` restores the hold (§7.4's no-undo-target rule; J-A20.74, with J-A20.41). A user lifts a rejection with `rejectSite` and
   `op: 'lift'`.
4. *Positive placement* (owner: "maybe you want a specific place to be something"). `placeAt` pins a dossier-backed
   element, an assignment member or a designation the generator controls to a chosen plot: the solver honours it when
   the hard rows allow — joining plots and mutating the buildings by §4.7 S10 (7) and S11, relocating whatever was there
   by the least-disruption order — and otherwise the dry run bends it to the closest acceptable site with the blocking
   rows named (§7.1's outcome table). It never creates or deletes dossier content, persists until the user lifts it or the
   dossier removes the element, and draws on `siting` keyed by the plot and the event (§6.1), so it follows the same
   determinism.
5. *Re-application* (the one statement of the disruption report). A dossier change after the first map is a mutation of
   the CURRENT map, never a reshuffle: the solver's least-disruption order (vacant or under-used plots first, then a use
   that can move within the same district, one displacement level, then a join only when the new use needs the land —
   §4.7 S10b) finds the site, S11's mutator adapts the buildings, a removal vacates; households the dossier adds fill
   standing shells first by `relet`, up to §2.6's capacity, before any new plot (item 28 (f), §4.11), their plans re-cut
   as §7.3 states. Positive placements and the map's other edits are honoured first, as pins and protected entities
   (§7.2), and the dossier event is applied around them; an edit it can no longer honour is reported and orphaned, never
   dropped silently (J-A20.73) — a user's value of a field the dossier now sets is superseded by the dossier fact, the
   user's event staying in the log as history and listed in the disruption report (`why`: the dossier fact). Its
   **disruption** — every moved use, joined or vacated plot and mutated building, each with the rule that caused it — is
   computed in the dry run against the request kind's `DisruptionBudgetRow`, stored in the event (`EditBase.disruption`,
   §7.1) and shown as its fate report (§7.3 item 4); the budget bounds the search — the first rung of the order that fits
   is taken — and the effective scope (§7.3 item 1), never the dossier's authority: an event no rung fits within budget
   still lands at the least-disruptive site and is reported over budget (J-A22.73). Every request kind has its row (a
   schema test); a budget of 0 admits only a placement that moves, joins, subtracts and vacates nothing, so a dossier
   event with none lands at its least-disruptive site over budget and a user's positive placement bends to the closest
   site of cost 0, the exact site offered with its disruption. Everything not in the disruption set keeps its exact
   geometry and identity (the oracle, §7.3 item 7 (vii)).
   **A host's undo (item 87).** A host that restores an earlier dossier state sends it as a dossier change like any
   other; the port diffs it (§7.7 item 1), and because §4.7 S10b's least-disruption order takes vacant plots first and
   §4.11 prefers a building's `formerUses`, an element the host removed and then restored returns to its own vacated
   building and an element added and then withdrawn leaves the plot it took — the map converges to its earlier state
   wherever nothing else changed; the residue is reported, and the report names the earlier absorbed state the dossier
   now equals (`state_matches_absorbed`, by the binding's `absorbed` hashes, §7.7 item 12). No rewind of dossier events
   exists: a dossier event stays no undo target (§7.4; J-A87.71).
6. *Continuity.* The map is a function of the seed, the ordered history of dossier events and the map's own edits —
   continuity over path-independence (§6.2 *Histories, not states*; J-A22.71), because the owner asked that the seed
   "respect the previous layout prior to the addition or subtraction". A brand-new map from an existing dossier has every
   element present from the start (*One path*, above). Inside the evolution stage the same rules apply. A dossier change
   the host sends with an epoch rides in that epoch's `EpochInputs.dossier` (§4.11) and is applied at §4.11's step (e),
   after the use step and the ladder and before siting (J-A22.42); one sent between epochs folds at its own log position
   and mutates the map the last epoch left (item 22 (e)). The events an epoch carries take their `seq` from `nextSeq` when
   the `epoch` event is appended — the epoch's own first, then the carried events' in the host's order — so their draws
   and minted addresses are keyed as a standalone event's are (§6.1, §6.3); they fold only inside the epoch and are
   no undo targets, and neither is the epoch that carries them (§7.4) (J-A22.76). The port groups a host's changes into
   these events and epochs by §4.11's cadence (item 76): an element change folds at its own week as a standalone dossier
   event, in the host's order; a population change or a typed-slice change rides the epoch the cadence schedules, in its
   `EpochInputs`.
7. *Knowledge.* A dossier may designate an institution hidden or secret and, for a clandestine one, its concealment and
   its front (item 63): `Assignment.knownTo`, `concealment` and `front` are then dossier facts; the solver prefers
   hidden plots through the class's relation rows (§4.6, §4.7 S10b; item 30), places a front and the function it hides
   as one item by §4.7's concealment rule, and §9.2's label policy reads them. A raid or a discovery is a dossier event,
   applied as a least-disruption mutation — the front may close, the hidden function relocate, a passage be sealed
   (items 17, 22, 30) — and a map delete relocates by `rejectSite` (§7.7 item 3). A value the dossier set is dossier-owned
   (§7.7 item 11; J-A20.77, superseding the override clauses of J-A30.71 and J-A30.72); where the dossier sets no such
   value it is a map fact, edited as §7.1 lists.
8. *What is staged.* The port's creation half is the base's (M1, exercised by the frozen dossier fixtures of §13.2 —
   items 83, 84 — never by a live host), its absorb half lands with this contract at M3a, and its wiring to a live host
   bridge is the owner's SettlementForge stage (§11.4, §14, *Staged by the owner's roadmap*; item 73); no door opens the
   other way — the host's simulator never reads the map's geometry (J86, §11.4). The records and rows the port fills when
   a host supplies them are declared schema-complete and empty in the base: `ConditionOverlay`, `DepositSite`,
   `PowerRelation`, the dossier-backed `Person`, `CustomChainRecord` and `CustomServiceRecord` (§2.7; items 88, 256),
   each written only by `dossierRecord`, `HistoryHint` on the recipe (§2.9), written once by the port's creation (V08
   §3.15), and the impairment, hinterland, crime, custom-weight and
   legitimacy rows (§10.2) (item 88). Everything else in this contract — the events, records, precedence, rejection,
   positive placement, budget, continuity and §7.7 items 9–16 — is the base's, exercised today through the dialog, the API
   and the fixtures.

**The derivation rule and the port's contract** (item 20 (h), 2026-09-27; items 74–87; owner: "whatever the dossier
doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of
immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things
from the dossier and in accordance with our rules").

9. *Two tiers of fact* (item 20 (h) (i)). Every fact the map holds is either a **dossier fact** — a record or value the
   dossier supplies, carried by the map under its binding key (§7.7 item 12), immutable on the map and changed only by a
   dossier event (§7.7 item 1) — or a **map fact** — everything else: positions and geometry, plots, buildings and their
   classes, the households that fill the dossier's population, plot assignments, prosperity values, the settlement-level
   trade direction and the partners' derived bearings, a collective record's count inside its range, the names the
   dossier does not give, each district's character. Map facts belong to the map — generated, regenerated, edited and
   replaced freely, subject only to §7.7 items 10 and 11. The dossier facts, by kind: the settlement's name, tier word
   and population; each dossier-backed element's existence, state (§7.7 item 14), name, kind and membership and, where
   the dossier gives them, its `knownTo`, concealment and front; a collective record's count range; each quarter's name
   (§7.7 item 16); the typed slices' dossier-sourced values — partners, relationships and listed links, income shares,
   power standings, the government; the conditions; a custom record's definition revision. For every field, §2.8's
   `factTier` derives which tier holds it (never stored; J-A20.23), read by §7's edit rules (§7.7 item 11), §9.2's
   reader, §11's exports and the API through which any clerk reads (§11.2). An author's declarations (item 101) are map
   facts `factTier` reads as `declared`: held against generation and re-rolls until the author changes them (§7.2), and
   never above a dossier fact — a declaration that would contradict one is refused, with the closest acceptable
   alternatives (item 20 (g)) (J-A20.76).
10. *Derive before invent — the derivation table* (item 20 (h) (ii)). A map fact the dossier does not supply is derived
   from what it does supply, by the design's rules, before any recourse to chance. The table is an INDEX: one row per
   map-fact family — the dossier inputs it reads (the port's `DossierDigest` fields, §14), the section whose rule
   derives it (stated there, never here), where seeded chance enters (a concern of §6.1, or none) and the coherence bar
   it never contradicts (§7.7 item 11). A row's inputs are read in the order written — the dossier's, then the
   blueprint's own; no host input is a data input (item 125 (a)) — and when none is present the rule's default applies,
   the generator's own choice exactly as on a map made without a dossier, reported with the fallback taken (item 125
   (b); T125-1); a missing input never refuses, stalls or becomes a request (§7.7 item 1). Standalone, the blueprint
   and our own roster are the inputs of every row — the same rows, so connecting a dossier changes inputs, not rules;
   the tests run the rows
   from M1 on the frozen dossier fixtures and on blueprints alike (§13.2, items 83, 84). The rows are data
   (`DerivationRow`, above; `tables/dossier/derivation`, provenance `own`), each naming the §2.8 registry kinds and
   attribute paths it `covers`; §13.2's totality test proves that every map-fact family of the registry is covered by a
   row and that every row's chance names a registered concern or none (item 20 (h), with item 83's vocabulary test;
   J-A20.78). The rows DR26–DR35 are the volumes' (items 383, 384, 387, 388, 391, 398; the volumes' working names for them are retired, ID-DR),
   DR36–DR39 history's (item 113), DR40 the oasis's (item 111), and DR41–DR44 the item-114, item-117, item-118 and
   item-122 rows: the walls' generation-time condition, the default view season, the festival decorations and the crisis
   looks — the last three a look only, never in the model or its hash.

| row | map fact | dossier inputs, in the order read | rule (its home) | chance (§6.1) | the bar it holds |
|---|---|---|---|---|---|
| DR1 | the site: relief, coast and its side, river course and inflow, lake, marsh | `site.terrain`, `site.access`, the water deposits, `site.culture`; a dossier record whose `kinds` row implies a bridge | S0's site request (`tables/dossier/site`); S1 (§4.2); on a site whose terrain, access and water deposits give no river or canal, the site row's river chance becomes 1 for the smallest watercourse class (a brook) whose course crosses the through route of the longest approach inside the frame — at creation only; on `desert` without an oasis, or where S1's relief cannot carry it, no brook, the build report noting `toll_bridge_dry` (V08 §2.6b (3); item 399) | `blueprint.features`; S1's `terrain.*` and `water.*` | at creation, a coastal dossier has a coast, a riverside one a river, a port one a harbour basin; a later site change is reported, never re-derived (V08 §3.5) |
| DR2 | walls, enceintes and gates; the waterfront | `walls.records`, `walls.citadel`, `walls.flagged`, `site.access`, the population, `site.threat`; the threats by sea (a naval or raider threat, a hostile sea partner, a coastal monster threat) | the access row's gate counts; S0's walls and castle toggles; S3's gate law (§4.2); the wall furniture (§4.8); item 106's barrier closure and the waterfront from circumstances — `open` by default, `quay_wall` with sea gates where the threats come by sea or on a sea-exposed port above a table size, `sea_wall` only by preset or request, the preset row still overriding (item 106 (d)) | `gate.pick` | walls exactly when the dossier lists a wall institution; the gate count inside the access row; a citadel record gives a citadel; a sea-threat dossier gets a quay wall with sea gates and a peaceful one an open front; every walled port gets its harbour-mouth chain (item 106 (e)) |
| DR3 | trade partners, their weights, modes and bearings | `economy.partners`, `economy.tradeLinks`, the toll and duty income rows, `site.access` | layer 2's trade fill (above), its `road` partners' bearings read by S3 (4) as requested bearings (§4.2) | `gate.pick` (§6.1) | a `hostile` partner carries no trade; a rival's listed links are kept; a bearing never moves on an unrelated change |
| DR4 | trade flow: per-gate and harbour weights, the dominant bearing | DR3's slice; `entrepot` | `TradeFlow` (§4.3) | none | weights sum to one; a harbour town's harbour carries the sea share; a derived partner is marked `derived` |
| DR5 | districts: count, kinds, boundaries, identities | the population; quarter claims (§7.7 item 16); district-scale records; `site.culture` (the forms weights); power seats (DR11) | S6's typing and grower, item 72's identities (§4.5) | `district.seed`, `district.type` | every quarter name on at most one district, and on exactly one unless reported waiting (§7.7 item 16); each district-scale record on a neighbourhood of its own; no district named for a social class |
| DR6 | the prosperity field and each plot's band | `wealth.label` (to `intent.wealthLevel` by `tables/dossier/wealth`), and over epochs the changed word as `EpochInputs.wealthLevel` (receipt F9 through V08 §3.5's diff row; W-DOS-02); the economy and power slices; quarter hints | the field with item 72's dials (§4.5) | `field.chance` | the population-weighted mean band within one band of the wealth row's band |
| DR7 | households: count, sizes, bands | the population; `wealth.label`; the rung; the housing record's range; the economy slice | S2's roster (§4.2, §10.2) | `roster` (its ordinal draws) | the members sum to the population within the roster tolerance; the residential building count inside the housing record's range; every household housed |
| DR8 | the class mix inside a neighbourhood | DR6's field; `intent.wealthLevel` | S10b's class mix (§4.7, item 71) | `siting` | the larger classes' share monotone in the value within a band row |
| DR9 | institution instances: a collective record's count, each instance's class and band, the members a ladder step stands for | `institutions[].kind`, `.count`, `.districtScale`; the population; `wealth.label`; the institution ladders (`tables/dossier/ladders`, V11 §2.6 — each pair and subsumption typed COUNT, QUARTER, GUILD, SIZE or REPLACEMENT, provenance `ref:SettlementForge institutionLadders.js`, pinned to the port's baseline and re-checked when it moves; item 108), with the `kinds` row set's rows for the unnumbered qualifiers (V08 §2.6) | S2's per-capita rows clamped into the record's range (§4.2), the class's coverage target, clamped into the range, a weighted option beside them (item 103 (f); V08 §3.5; item 392); the step type's members (item 108 (a)–(c): a COUNT record's members n buildings of the lesser class, a QUARTER a district-defining record owning the trade's members, a GUILD one hall plus a collective of workshops, a SIZE one larger building or compound, a REPLACEMENT the greater only), an unnumbered record's range a table range per kind and rung; DR24's class; its distribution (§4.5's three distributions); S11's templates (§4.7) | `roster` (its ordinal draws) | the count inside the record's range; a singular record placed once; no ladder pair counted twice — a lesser reaching the map beside its greater is a member, never an addition; members rise monotonically across a population sweep |
| DR10 | positions: where each element stands | class, `tags`, `facets`, `forbidden`, the landmarks naming it, chains and dependencies, the power association, `knownTo` | S10b's one solver, claims-first from the creation prefix (§4.7; *One path*) | `siting` (keyed by the assignment and member); `alloc.district` (a dispersed class's controlled random share per district, §4.5) | every dossier-backed element placed (§7.7 item 2); a hard row never broken silently |
| DR11 | power seats and turf | `powers[]` (standing, governing, controlled); `government` | §10.2's government rows (the seat classes) and §4.7 S10b's faction-turf attractor rows; item 72's significance weighs them (§4.5) | none (ties by address) | the governing power's seat is the government's seat institution |
| DR12 | a district's political alignment | the institution's own political role (`DossierInstitution.role`, SettlementForge's per-record `priorityCategory`; V08 §2.5; item 397) first; DR10's plots; the class-to-power rows (§10.2) with `Institution.powers` overrides; the power slice | item 72 (§4.5) | none | shares sum to one per district; a shared building counts once |
| DR13 | a district's economic role | DR10's plots; the class-to-sector column (§10.2); the economy slice | item 72 (§4.5) | none | a building serving two sectors counts once, partitioned |
| DR14 | the names the dossier does not give — ways, districts, quarters and V01's local places (`HoodPlace`) | the dossier's names (protected); `religion.deityName` (the principal temple's dedication, §10.4); `site.culture` | §10.4 with item 72's dominant components | `naming`, `naming.quarter` | no generated name repeats a dossier name within its kind |
| DR15 | buildings: class, footprint, storeys, heights, materials, entrances, basements | the use's class and the plot's band (DR6, DR10); `site.culture` (a template-family row) | S11's designation templates (§4.7, item 19); §2.6 | `siteplan`, `siteplan.entrance`, `heights`, `material` | a material never changes a shape |
| DR16 | hidden plots, passages, fronts | `facets`; criminal categories; covert impairments; the crime scalar (§10.2's staged crime row, item 88) | the hidden share with its staged crime term (§4.6); the concealment rule (§4.7, item 63) | `siting` (the front pick) | a clandestine record's public views show only its front |
| DR17 | the underground: sewers, accesses, the undercity, the ruin and the voids | the population; sanitation records; subterranean kinds; the crime scalar (§10.2's staged crime row, item 88); the blueprint's `disorder`; `undercity`; the ruin's sources, the mining deposits and `mountain` terrain, the church-class records and their counts, the burial records and the `Cemetery network` (DR30–DR32) | II.7's feature law — a sanitation record (an institution matching `tables/dossier/sanitation`) sets `toggles.sewers` to `on`; a subterranean institution matching `tables/dossier/subterranean` forces its system kind (II.7.6), one matching none takes the `arena: 'underground'` hard row and, placed on the surface, a dug underground from its cellar (II.7.6's connection stage), only on a plot whose terrain gate (§2.6) admits at least a half cellar (a hard row), its basement forced; the two row sets' rows and binding targets are V04 §2.3a's (`Sewage system` → the sewer system; `Underground network` → the dug network; `Underground city` → `undercity: 'require'` and the first neighbourhood; `Black market bazaar` → the core's black market; a catacomb record → one complex on a burial face, its surface seated as a `cemetery` use at S10b where the roster holds no burial face; a crypt record → its church's crypt, never a system; a mine or cistern record → its working or cistern); a custom record matches by its resolved profile (item 104 (a)); II.7.5 with §4.6's staged crime term (item 386) | `blueprint.features`, `sewer` | the underground mode only with a navigable run; a required undercity exists; a sanitation record gives sewers; a subterranean record has an underground |
| DR18 | informal clusters and camps | DR6's field; the rung; slum claims | the cluster rows (§4.7, item 70); the shanty staging (§4.5) | `siteplan` | never on a standing plot floored at the middle band or above |
| DR19 | the hinterland: land uses, their bearings and sizes | `site.deposits`, `economy.foodImportPct`, `site.isolation`, `site.terrain` | S12a and §4.9; `economy.foodImportPct` through §10.2's staged hinterland row (`PortRows.hinterland`, item 88), which scales §4.9's farmland once the port fills it | `hinterland.outside` (§6.1) | every listed deposit has its land use |
| DR20 | the knowledge of places | `facets`; covert impairments | item 30's defaults (§4.6); item 63 (§4.7); each `HoodPlace`'s default by `hood.placeKnowledge` where the dossier says nothing, an opening's its `AccessPoint`'s (V01; item 384) | none | a covert fact never reaches a public view |
| DR21 | transition timing | the change's week (§4.11's rungs); the calendar row's season; conditions | the `Works` (§4.11, item 67) | `works` (§6.1) | the stage shown at week w depends only on the record and w |
| DR22 | persons beyond the notables | the households (DR7) | `derivePerson` (§10.3) | `people` | a person derives from its key alone |
| DR23 | the rung and the frame | the population | §1.1's size ladders and the registered products (`ProductDecl`, §4.12); §3.2 (9)'s frame rule | none | the rung is the population's; a dossier outside the ladder is handled by §7.7 item 15 |
| DR24 | a record's class | its name, `kind`, `category`, `tags`; a demotion or upgrade receipt; for a custom record, the inputs of item 104 (a)'s resolution — its scene archetype, free-text category, tags, admitted definition fields and keyword keys — its class decided at fold, not at digest (V08 §3.5 (5) (f); V11 §3.13.1; item 511) | the class rule (§7.7 item 12) | none | a kind without a class row takes its category's generic class, reported, never refused |
| DR25 | a collective record's state over its members | the record's state and severity band | the distribution rule (§7.7 item 14) | `siting` (§6.1) | the affected share equals the severity band's share |
| DR26 | a district's layout (its fabric) and its blocks' content (squares, greens, yards, manor blocks) | DR5's kinds and identities (ladder QUARTER records among them), DR6's field, DR8's class mix, DR9's instances (ladder SIZE and GUILD records among them), DR12's and DR13's alignment and role (through the provisional character), the chains' links (item 105 (i)), DR1's and DR2's site and walls | S7c and S9b (V01 §3.3, V01 §3.5; item 384) | `fabric.select`, `hood.dispatch` | a dossier element's plot is never typed away — its block stays `ordinary` and holds it; the district's population stays whole (T-V1-12) |
| DR27 | floating islands: the gate, count, reason, size, altitude and access kinds; what the sky fill carries of a chain; the shares it may not take | the population (DR23); `wealth.label` (DR6); the households' bands (DR7); the institutions (DR9, DR24: a palace, cathedral, great temple, prison or mage's instance; a custom institution by its resolved scene archetype and `landmarkLevel`); the ladder records by their step type (only a singular or SIZE record may go up; COUNT, GUILD and QUARTER members counted across both arenas); the district-defining records (their raised shares never taken by the fill); `government` (DR11); `site.magic`; `site.deposits` (a `magical_node`); the active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 105 (i)) | V05 §3.2–V05 §3.10, V05 §3.15 (1b), V05 §3.20 (9)–(12) (item 387) | `island.place` | every bound CITY or METROPOLIS map with the setting on has its gate resolved, its node term traced to a deposit or to none, each island's reason traced to a DR7 or DR9 fact, and no ladder pair counted twice across the arenas |
| DR28 | destructive events at an epoch | `calamityHistory[]` with its tick, severity and the institutions it marked ruined (F5) | the evolution engine's calamity table (V06 §2.4, `tables/evolution.json#calamities`) to the `HazardRow` kinds, the place at the centroid of the calamity's F5 targets, the cap or count by severity; the port only carries the records into `EpochInputs.events` (a calamity's `deaths` feed the catacomb need, V06 §3.18.2 (3)) (item 388) | `epoch.transform` (the hazard operators' draws) | a calamity no row maps is reported and ignored; its F5 targets are struck in place, never relocated; no hazard is invented for a dossier-bound map (`evolution.hazards` is `none` by rule) |
| DR29 | the site latitude the model-side sun reads (item 102 (a)) | `site.culture` through `tables/dossier/cultures`; else 50° N, the generator's default (item 125 (b)) | the port writes it into `Intent.latitudeDeg` at creation, a map fact the user may edit (§7.7 item 9); a later `site.culture` change is reported (`frozen_fact_changed`, V08 §3.5), never re-derived; V05's model sampler reads the latitude in force (V08 §2.5); §8.4's path mode reads it for the document's views (item 391) | none | a dossier map's population-weighted mean band stays within one band of its wealth row with the sun term on (T73-7; T-V8-22) |
| DR30 | the ruin system's existence, source, age and centre (item 109 (b)) | `site.ruinEvidence`; `history.ageYears`; the `ancient_ruins` and `magical_node` deposit sites | V04 §3.5.0a (1)–(3) | `sewer` (keyed by the source's lineage) | a dossier with `ancient_ruins` or a `ruined-landmark` record has a ruin system, else a stated reason (T-V8-32) |
| DR31 | the cavern drivers (item 109 (a)) | `site.terrain` → the relief class (`site` row); the mining deposits | V04 §3.5.2's relief rows, fissure gate and mining test | `sewer` | a `mountain` dossier's relief is `mountainous`; a mining deposit sets the mining test (T-V8-32) |
| DR32 | the burial faces, the crypted churches and the church count | the church-class and burial records (V08 §2.6a (3)); `stone_quarry`; `history.ageYears` | the classes by V11's `kinds` and `ladders` rows; the crypts by V03 §2.4 with V02's basement; faces, rank, count, ratchet and stagnation by V04 §3.5.1 and V04 §3.10 | none | T-V8-33 |
| DR33 | the supply links between the chains' bound members, their goods and weights (item 105 (i)) | `economy.chains` — SettlementForge's `activeChains[]`: processors resolved, outputs through `goodWords`, upstream, the neutral status —, `economy.dependencies`, `economy.goods`, `entrepot` | item 105 (a)–(h)'s web at S10a/S10b and every epoch, each link × V11's `siting.web.chainStatus` of its chain's status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls through the store at the gate or quay facing the partner | none | every chain with two joined members yields a link; an impaired chain's pull equals the status factor × a running one's; an entrepot chain's end pulls toward the gate or quay facing its partner (T-V8-35) |
| DR34 | the aqueduct reason's inputs: whether the water need counts as met, the terminal, the cap step, the source candidates and the chance modifiers | the rung (DR23); the records bound to `conduit_house` through V11's `kinds` and `ladders` rows; the demand records (bound to `bathhouse` and to the classes whose V11 row needs running water); `site.terrain` through the `site` row (`riverside` → a river inside the walls; `desert` → the arid biome; `hills`, `mountain` → a relief that can hold a higher spring); the river DR1 gives; the `hot_springs` deposits (never a source); `site.culture` | item 110 (b)'s aqueduct reason with V11's chance, need, cap and terminal rows | `raised.reason` | T-V8-36 |
| DR35 | the landmarks an elevated road may link | the dossier-bound institutions whose class significance (§10.2; item 72) is at least V11 §3.24.2's `elevated.landmarkMinSignificance` through V11's `kinds` rows, and the custom records with `landmarkLevel` `landmark`; each read at its S3 reservation (castle, palace, precinct), fixed before the end of S6 where the road is committed; its high ground is the relief's | item 110 (b)'s elevated-road reason | `raised.reason` | T-V8-38 |
| DR36 | the peak: the built extent's high-water mark the history replay grows to (item 113 (a) (1), (f)) | `peakTier` and the high-water population; without them the evidence of a higher tier, strongest first — `tierHistory`'s from-tier on a demotion, the maximum of `populationHistory`, the losses in `calamityHistory`, a higher tier's institutions listed ruined or remnant, a resettlement after a terminal death; standalone, the blueprint's history option (§4.2 S0) | §4.11's history-first generation (V06): the peak's tier, or an **effective peak** — the higher tier itself sized at a representative value inside that tier's population range (V11's cell; by default the range's lower quartile), marked `symbolic` in the fact's provenance, which only sizes the remnants the replay leaves | none | no peak without evidence of a higher tier; a symbolic peak sized inside its tier and marked; never a contradiction of a present dossier fact, and never written back (SettlementForge's own rule that a peak is never inferred stays its own) |
| DR37 | the replay's epochs and the events it plays (item 113 (a) (2)) | `history.ageYears` (the founding); `history.events` (their types, years ago and severity); `tierHistory`, `populationHistory`, `calamityHistory` | §4.11's replay as coarse epochs from the founding or the peak to the present, each event mapped to its epoch by V11's event-to-epoch rows (V06) | the concerns of the stages each coarse epoch runs, with the replay's epoch component (§6.1) | the dossier's present facts met exactly at the replay's end (item 20); the replay byte-stable per seed and history |
| DR38 | destruction and refounding (item 113 (b)) | the lifecycle's terminal death and resettlement (`destroyedByEventId`, `lifecyclePatch`); a catastrophic event; an ancient "Fall of" event on the site | §4.11: the old settlement's geometry becomes ruins and the new one is generated on top, reusing old roads, gate gaps and bridges (the route cost favouring them), building on old foundations and quarrying the ruins (the salvage ledger), its plan and culture its own | as DR37 | a refounded fixture reuses old roads where they serve |
| DR39 | burial: when the former settlement's ruins lie underground (item 113 (c)) | the ruins' ages from the replay; floods, river silt and rebuilding on top; bare rock (`site.terrain`) | II.7.6's buried former settlement, derived from the former geometry at its old ground level, past V11's burial threshold (a century by default, shortened by floods, silt and rebuilding, lengthened on bare rock); distinct from DR30's older civilisation | none | buried ruins only past the threshold, matching the former geometry |
| DR40 | an oasis (item 111 (a)) | `site.deposits`'s `oasis_water`; `site.terrain` (an arid site) — the site itself DR1's | S0's and S1's oasis feature (§4.2): a spring-fed pond or small lake in a hollow or at a fault line, its grove and irrigated gardens | none with the deposit; standalone, `blueprint.features` at the arid row's chance | a dossier with `oasis_water` has an oasis; an oasis only on an arid site unless drawn or supplied |
| DR41 | the enceinte runs' generation-time condition (item 114 (d); the item-114 row) | `defence.readiness` (V08's `readiness` row: its band; standalone, the band the creation slice's `threat` gives by that row); `wealth.label` (DR6's `intent.wealthLevel`, its MEANS class against V11's `walls.condition.meansLow` and `meansHigh`); `site.culture` (the patch rows admitted); the enceintes and their stretches (DR2) | S3 and S7 lay each run's condition — `standing`, `worn`, `patched` or `breached` — from V11's `walls.condition` generation shares for (readiness band, MEANS class), and a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture (V11 §3.25.3), each run's last-change epoch 0; with `atGeneration` false every run `standing`; under history-first generation the replay's condition instead (V06 §3.7.7 (5)); over epochs the need reads max(`threat`, `PortValues.readiness`) and the means the wealth level in force (V06 §3.7.7; V08 §3.16 (2)) | `walls.condition` (§6.1) | a `vulnerable`, poor town shows patched and breached runs; a `fortress` in a rich city stands whole; with `atGeneration` false every run stands (the no-op pin) |
| DR42 | the default view season (item 117: a look only, never in the model or its hash; the item-117 row) | the present week — the dossier's own latest stamped tick, the greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks (§2.9's *The week's source*; §4.11 *The clock* (1); item 125); the `calendar` row (`sf445`); the climate: the `climates` row's terrain column for `site.terrain` (item 125 (b)), else the blueprint's choice; S0's relief class | §2.9's view state: under its "follow SettlementForge" flag the year position is the present week mod 52 on the `sf445` year (52 weeks, 13-week seasons from spring); with no stamped tick, and standalone, the view keeps the user's season control, midsummer (week 19) by default (item 125 (b)); the biome's climate row is the climate's first source present, set at creation (§4.2 S0); the season look reads that row's season columns (V11's), except that a `hilly` or `mountainous` relief (S0's class; item 117 (d)'s "mountain and upland colder") reads the next colder row's — warm → temperate → cold → severe, an arid or semi-arid row unchanged — the height correction, applied whichever source gave the row but once: a `mountain` terrain's terrain-column row, which already reads `cold` by its height, is not corrected again; the correction never changes the model's row; §8.2's season rows draw it; a later `site.terrain` word is reported (`frozen_fact_changed`, V08 §3.5), never re-drawn | none | a dossier map opens on its dossier's latest stamped week, one with no stamped tick on the user's season (midsummer by default); the same document hashes identically in all 52 weeks; a temperate row on hilly or mountainous relief draws the `cold` row's season cells, a `mountain` terrain's `cold` row is not corrected to `severe` |
| DR43 | festival decorations (item 118: a look only, never in the model or its hash; the item-118 row) | the carried `tradition` facts (`trad:` keys: the name, the kind by the `festivals` row, the weeks of the `sf445` year, the staging keys, the deity; V08 §2.3, V08 §3.16 (5)); `site.culture`; the view's year position (DR42) | §2.9's festival display (follow, off, or preview one festival): following, a festival's decorations show while the view's week lies inside its weeks — a window whose end precedes its start wrapping past week 51 — drawn by §8.2's festival rows from §10.2's decoration table by tier and kind at the place its staging keys name, else the festival kind's fallback, never over a keep-out or a gate's passage, their colours and motifs by `site.culture` and the deity; two festivals in one week both show; a tradition with no readable week is unscheduled, shown only in preview; standalone no tradition exists and none is invented | `render.instances` (view draws only: §8.10's keyed placement, as §8.2's festival rows key it) | no festival changes a digest; a festival shows exactly in its weeks |
| DR44 | the crisis looks (item 122, with (h)–(i): a look only, never in the model or its hash; the item-122 row) | the `ConditionOverlay`s standing in the view (§2.7: archetype, severity, `sinceWeek`, `untilWeek`; a stressor, a condition or a simulator event as V08 carries it) — §2.9's `week` in [`sinceWeek`, `untilWeek`), or from `sinceWeek` on while the overlay stands where it has no `untilWeek`, never the year position; a calamity's `targets` (`calamityHistory[]`); the forces', coalitions' and travelling groups' headcounts where the dossier gives them, else the condition's or calamity's own counts (`exodus`, arrivals) (item 122 (h); V08); the map's rung | each standing overlay → the `map` row of the source word V08 §3.16 (7) (b) gives the overlay (a stressor's type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype) → its look row → its scale at the rung by severity, or by headcount at `areaPerHeadM2` where the dossier gives one, placed by §10.2's *Crisis looks* (c)–(f) and drawn by §8.2's look rows under §2.9's `crises` key (`off` none; `preview` one look at `previewSeverity` with no condition). The `map` rows are §10.2's `RosterTables.crisis` (its `stressor`, `archetype` and `event` rows): every SettlementForge stressor type and condition archetype at the pinned baseline has exactly one, a look kind or `none` — `regional_migration_pressure` the refugee camp (item 122 (b)'s mass immigration), the other regional_* pressures `none`; a source with no row reads `none`, reported `unmapped_word` (V08); a stressor's overlay draws no look while a condition's overlay whose map row gives the same look kind stands (V08 §3.16 (7) (b)). Knowledge admission at the viewer's effective key (§9.2's admission function, as a band-less reader, §11.2): a condition's `knownTo` is `public` where its `map` row gives a look (a camp, a quarantine, smoke and ruins are sights) and `secret` where the row is `none`; a key form listing the overlay's address admits it whatever its tier (V08 §3.16 (7) (e); J-V8.128); a withheld condition is never drawn, listed, counted or named. What a crisis leaves reaches the model only through the epoch path (DR28's calamity in `EpochInputs.events`, the population target; V06's hand-over); standalone no condition exists and none is invented — only a preview draws | `render.instances` (view draws only: §8.10's render keys from the seed, the condition's id and the place, a preview keyed on its look kind; never a model stream) | the same document hashes identically with crises on and off and in every week (T122-1); each look shows exactly in its condition's weeks (T122-2); every SettlementForge stressor type and condition archetype at the baseline has its `map` row (T122-4) |

   **The history replay's record.** A settlement generated from its history (DR36–DR39) carries the replay's record —
   §2.7's `HistoryRecord` (its peak with `symbolic` and the evidence used, its coarse epochs and the events each played,
   refoundings, buried systems; written by V06's replay) — which the report's `epochs` list (§5.4) and the clerk read (V10), so the story can be told ("the walls were built when this was a
   city of twelve thousand"; "its exact size is not recorded" for a symbolic peak).
11. *Coherence* (item 20 (h) (iii)). The derivation obeys four rules, proved by §13.2's coherence bars (item 20 (h)) on
   the design's own dossier events and by the port's bars on the frozen dossier fixtures (item 83), and checked at run
   time by §5.3's coherence rows: (a) no derived fact contradicts a dossier fact — counts, kinds, existence and state,
   membership, the realm-level trade facts (each table row's bar); (b) a dossier change re-derives exactly the dependent
   map facts — the rows whose inputs it changed — inside its disruption set, by §7.7 item 5's least-disruption mutation,
   never a re-roll; (c) the derivation reads nothing beyond three inputs — the seed, the ordered dossier history and the
   map's edits (§7.7 item 6), so the same inputs reproduce the same map; (d) nothing derived flows back (§7.7 item 1).
   The rules bind the DERIVATION — generation, re-derivation and every dossier event; a user's edit of a map fact (a
   prosperity stroke, a moved building, a renamed lane) belongs to the user and stands, since it alters no dossier fact.
   **The dossier-owned refusal** (the one statement; §7.1, §7.4, §5.2 and §7.7 items 2 and 7 cite it): an edit that
   WOULD alter a dossier fact — a rename of a dossier-named element or quarter (a claimed quarter name, item 82), a
   change of its kind or class (§7.7 item 2), a `setAttr` of a value the dossier set (`knownTo`, `concealment`, `front`,
   `powers`, `state`, `custom.revision`), a collective record's count set outside its range, an `adjust` of a
   dossier-bound map's population or of a slice value the dossier supplied, a declaration or a closure that would
   contradict one, a user's or clerk's `dossierFacts` or `dossierRecord` — is refused with the reason `dossier-owned`, the
   map-side alternative offered where one exists: a label's display text and its visibility (§9.1), what each viewer
   sees by the viewer's knowledge key (§11.3), a count inside the range (J-A20.77). Where the dossier's `site.magic`
   resolves `none`, the islands setting is refused (DR27; V05 §4.4).
12. *The binding — identity without dossier ids* (item 20 (h) (v), made concrete by item 74). SettlementForge keys most
   of its records by NAME and gives most institutions no id at birth, so the map binds its own stable addresses (§6.3) to
   the dossier's keys in the document's `dossier` block (§2.9: a `DossierBinding` and the `CarriedFacts`, above), which
   the port's events write at creation and at every absorb (the `dossierFacts` ledger folds into it). The KEY LAW for SettlementForge's records,
   stated here, with the port's own keys V08 §2.3's, applied by the port's adapter (§14) — the only code that reads
   SettlementForge's fields (J-A74.72):

| element | binding key | re-binding receipts |
|---|---|---|
| the settlement | `settlement:<id>` — the dossier's own id, stable across reloads, same-seed regeneration and section rerolls; a new id is a new dossier and a new map | `rename-settlement` renames the title label only |
| an institution | `inst:cat:<catalogId>`, else `inst:uid:<localUid>`, else `inst:name:<slug(name)>` — SettlementForge's own anchor precedence; `#k` appended for a collective record's k-th member; two records of one key told apart by their order in the dossier, reported `duplicate_key` | `demotedFrom` with the fate `demoted_by_disaster`, `promotedFrom` with `upgraded_by_reconstruction`: the row is kept and the record re-classed by its new name |
| a power | `power:id:<faction.id>` when the dossier authored one, else `power:<slug(name)>` | `rename-faction` |
| a notable | `npc:<id>` | a successor's `replacedNpc` links the successor's row to the one it replaces |
| a condition; a resource; a quarter; the government; a custom chain; a custom service; a custom library entry | `cond:<id>`; `res:<key>`, or `res:uid:<localUid>` for a custom resource; `quarter:<slug(name)>`; `government`; `chain:<chainId>`; `svc:uid:<localUid>`; `def:<definitionId>` (item 256) | none |
| the port's own keys — V08 §2.3's singletons and pair keys and V08 §2.5's derived deposit key | V08 §2.3's (cited, not restated) | none |

   `slug` is the line's own name normalisation, applied by the adapter, so a name key agrees with the catalogue key the
   line writes at birth. **Class is read apart from identity** (DR24): a record's class comes from its current NAME when
   a demotion or upgrade receipt is present — its kept catalogue key then names the old kind — else from its catalogue
   kind, else from its name, category and tags, the fallback every record without a catalogue key needs; a kind with no
   class row takes its category's generic class and is reported (`unmapped_kind`), never refused (at M1 the rows cover
   M1's classes). **Re-binding** happens only on a receipt of the table: a name change without one is a removal plus an
   addition, reported (`rename_without_receipt`), because a guessed identity is how silent mis-bindings begin
   (J-A74.73). A power's controlled-institution list is resolved to binding keys through the stable part the line itself
   stores — the slug of the institution's own id, else of its name — against the current roster, never through the
   catalogue key. `DossierRef.element` is the binding key and `DossierRef.version` the SettlementForge line (§7.1);
   `Identity.dossier` carries the ref on the entity the element is (§2.8; J-A20.22); a re-binding re-points a binding
   row and never re-keys a map address (§6.3). The model digest does not cover the block, because the model already
   carries each entity's current key in `Identity.dossier`, and `carried` holds dossier facts the map does not draw (a
   notable's role), whose change must not change the map's digest; `binding` is rebuilt from the log's dossier events at
   load and must equal the stored rows (§5.3), and `factHash` is the hash of `carried` (J-A74.71).
13. *The change envelope and the receipt table* (item 75). Every event a dossier change generates carries its
   `DossierChange` (above) in `EditBase.dossierChange` (§7.1), so the disruption report, `LifecycleEvent.cause` and
   §5.4's `changes` say why — the host's reason beside the map's rule (item 22 (b)). SettlementForge records a change
   only through scattered receipts — stamps on the record, capped history lists, decrees, a news feed — so the port reads
   them through the RECEIPT TABLE (`ReceiptRow`, above; `tables/dossier/receipts`): per change kind, the receipt fields
   in precedence order — the first present decides the cause, the fate and the week, by §4.11's dating rungs — and the
   response. The design states the rows below (J-A75.71); the others — F6 reopened, F7 population, F9 prosperity, F10
   power standings, F11 government, F12 conditions, F13 resources, F16 the deity, F17 notables, F19 a confirmed table
   event, F21 a reroll — and the port's own kinds of V08 §3.6 (1) — F-V8-1 `relation` (the powers' pulse week when the
   line stamps one, else arrival; a `setAttr` through a `dossierRecord` put), F-V8-2 `port-values` (arrival; `epoch`; the
   government's legitimacy read as an `attr` on this key), F-V8-3 `custom-def`, `custom-chain` and `custom-service`
   (arrival; the responses of V08 §3.5's diff table), F-V8-4 `chain`, F-V8-5 `dependency` and F-V8-7 `evidence`
   (arrival; `epoch`), F-V8-6 `calamity` (its own tick; `epoch`, riding `EpochInputs.events`) (item 393), F-V8-8 `site`, `history` and
   `tradition` (arrival; `none` — the ledger event alone: `carried` updated, a `site` or `history` change noted
   `frozen_fact_changed`, a tradition's new schedule read by the festival display, DR43; V08 §3.5, V08 §3.6 (1)) — are data rows
   of the same type, their completeness §13.2's vocabulary totality tests (item 83; T73-10). A change no rung dates is
   applied finished, without transition stages, and reported (`unreceipted_change`).

| row | change | receipts read, the first present deciding | response |
|---|---|---|---|
| F1 | an institution added | a new binding key; `createdByEventId` or an `add-institution` decree; `_worldPulseTierAdded`, `_worldPulseEconomyBuilt` or `_worldPulseFounded` with their outcome ids and `foundedAt`; the fate `founded_by_flourishing`, which writes nothing else and is dated by arrival alone | an `assign` with `existence: 'dossier'`, placed by S10b's `dossier` request (§4.7); an addition under a key the map carries as removed or ruined is a REOPEN (row F6, §7.7 item 14); a missing `foundedAt` never reads as "stood since the founding" |
| F2 | an institution removed | `worldPulseFate` and `_worldPulseInactive` FIRST — the closure fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered`, `abolished`, `disbanded`, `captured_by_local_powers`, `abandoned_with_the_settlement` under status `remnant` — then status `removed` with `removedByEventId`, or a `remove-institution` decree | §7.7 item 14's `removed`: `unassign`, `closeUse`, the plot vacant |
| F3 | reduced or converted | the fates `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant`; `demotedFrom` or `promotedFrom` | a `setAttr` of the designation in place (item 18's mutation); a demotion or upgrade is also row F15's re-binding, the record re-classed by its new name |
| F4 | impaired or restored | the visible `impairments[]` (the state `impaired` derived from them) | the physical types — capacity, infrastructure, access, supply — one `condition` step per severity band; the non-physical — legitimacy, influence, wealth, staffing, corruption — the impaired institution's own dial term only (§4.5's three dials; J-A88.42) |
| F5 | ruined | status `ruined` with `destroyed_by_disaster`, `remnantReason` and the calamity's targets (never `destroyedByEventId`, which is the settlement's) | §7.7 item 14's `ruined`: present as its ruin |
| F8 | the tier moved | a `tierHistory[]` entry, or a bare `tier` change with none (a calamity, a resettlement, a preset that applies proposals at once) | the rung re-read at the next epoch's target (§4.11); the tier word re-titles the map (§7.7 item 15) |
| F14 | trade | `_cutRoutes`, `_userRoutes`, a route link, `tradeLinks`, a partner's relationship — a rival's or a cold-war partner's listed links kept, only `hostile` or a suppressed economy carrying none | the trade slice at the next epoch |
| F15 | a rename | `rename-settlement`, `rename-faction`, `rename-npc`; for an institution only `demotedFrom` or `promotedFrom` | §7.7 item 12's re-binding; without a receipt a removal plus an addition, reported |
| F18 | a decree | `decrees[]` applied with `tickRef`; the week's `decreeCauses[]` | the decree's own change rows; a decree whose verb binds no world effect expects no change |
| F20 | the settlement ended or born | `destroyedByEventId` on the settlement root; `lifecyclePatch`; `memberBirths` | an END is an epoch that ruins every building by the decline hooks (§4.11); a resettlement of the same site is the SAME map regrowing on its old plan by item 8's regrowth-first order (owner, J80 Q4; J-A75.72); a member birth is a new dossier and a new map |
| F22 | the host undid a change | the incoming dossier's fact hash equals an earlier absorbed state's | §7.7 item 5's forward convergence, reported `state_matches_absorbed` |

14. *A listed element's state* (item 80). SettlementForge never deletes a record — a removed, ruined or closed
   institution stays listed with its status — so an assignment carries `state`, written only by dossier events through
   these rows (`StatusRow`, above; `tables/dossier/status`), keyed on the fate word and the inactive flag BEFORE the
   status, so that a bankrupt shop is never kept open as a smaller designation:

| the dossier's state (fate first) | the map's response |
|---|---|
| absent or `active` | open |
| `impaired` (derived from the visible impairments) | open; the physical types wear the building one `condition` step per severity band, the non-physical reach the impaired institution's own dial term only (§4.5's three dials) |
| `remnant` with `privatized`, `downsized`, `reduced_to_watch_post` or `survives_as_remnant` | a smaller designation in place (item 18's mutation) |
| `remnant` with a closure fate (row F2's list), or `removed` | `removed`: `unassign`, `closeUse`, the plot vacant (§7.7 item 2) |
| `ruined`, `destroyed`, `destroyed_by_disaster`, `ruined_by_decree` | `ruined`: PRESENT as its ruin — its use closed, its building `ruined` (§2.8's existence), counted present by §5.3's dossier row |
| `vacant` (an empty seat, not an empty building) | no physical change |

   A listed ruin stays on the map as its ruin, so a dossier that lists a ruin is never contradicted by a map that shows
   the element open or gone (J-A80.71); an epoch keeps it as it stands — the decline ladder never robs, clears or
   rebuilds its building (§4.11's exemptions) until a dossier event changes its state. A reopen — an element returning
   to `active` — re-opens its use in its own former building first (S10b's `dossier` request ranks it first, §4.7),
   repaired by a `Works` where item 67's clock runs (§4.11) and at once otherwise. A collective record's state is
   distributed over its placed members: the affected share is the severity band's share (all members when the state
   carries no severity), the members chosen on `siting` keyed by the assignment, the dossier event's `seq` its creation
   index (§6.1), and recorded in `memberState`; the record's `state` stays `active` while any member is (J-A80.72).
15. *Population, rung and tier word* (item 81; owner, J80 Q3; item 202). While no village product is registered, a
   dossier whose population lies below the TOWN floor (§1.1) is refused by the port (`E_RUNG_UNAVAILABLE`, naming the
   village product, PART III): §1.1's clamp to the floor applies only to a blueprint request that carries no dossier,
   because a dossier's population is a dossier fact and a clamped town would contradict it (J-A81.71). With the village
   product registered (`ProductDecl` in `StrategyRegistry.products`, §4.12), the port consults `LadderRouter` at creation
   and at every absorb: a population inside the product's range routes to its rung, an absorb whose population is 0 routes
   to THORP and runs V07's desertion (V07 §3.12; an outcome, not a refusal), and a creation below 1 stays refused. A
   dossier whose population lies above the METROPOLIS cap (§1.1) is refused the same way — `E_RUNG_UNAVAILABLE` naming
   the cap, nothing absorbed — at creation and at every absorb (§14's `creation` and `absorb`): §1.1's clamp to the cap
   serves only a request that carries no dossier, because a clamped town would contradict the dossier's population there
   too (J-A81.01). Inside the ladder the population chooses the rung (§1.1) at creation and, at each epoch's target, by
   §4.11's rung at an epoch; the dossier's own tier WORD is a dossier fact and the map's title word (§9.5) — a "city" of
   5 001 people is drawn on the TOWN rung and still titled a city (J-A81.72). A bare tier change with no history entry
   fires row F8 like any tier receipt (§7.7 item 13).
16. *Quarters and landmarks — naming claims* (item 82; owner, J80 Q5 and Q6). SettlementForge picks its quarters by a
   name test at generation and never refreshes them, so a quarter enters the map as a NAMING CLAIM, never a zoning
   (J-A82.71): a `neighbourhood` assignment with `claim` set, carrying the quarter's `name`, a kind bias from the
   quarter rows (`tables/dossier/quarters`: Market toward a market identity; Religious toward temple; Noxious Trades
   toward craft with the noxious rows; Waterfront toward docks or riverbank by its phrase; Government toward the seat's
   district; Mages' toward an arcane identity; Artisan toward craft; Shadows toward a low band and a larger hidden
   share; Wealthy and Common Residential toward band biases; Roadside Shrine a shrine claim with a soft edge row; the
   village quarters — Alehouse & Common, Fishing Landing, Woodcutters' Ground — one row apiece), and its location phrase
   as SOFT rows in `criteria`: "Downstream/downwind" → `downstream` and `downwind`; the high-ground phrases →
   `highGround`; "Central" and "Village centre" → `nearCentre`; the water phrases → `nearWater`; "Between market and
   residential" → `nearMarket`; "At the forest edge" → toward the wood land use; "Isolated area (safety concerns)" →
   `far` from the centre; "Old town or slums" → the oldest stage and a low band; "At the settlement edge" → the edge;
   "Spread throughout" → no district; "Eastern district (traditional)" → a soft east row at low weight, a placeholder
   dropped on the owner's word (J80 Q5; J-A82.72). At creation S6's typing reads the claim's bias and rows as soft
   terms (§4.5), so a matching district arises wherever the site allows one; the district whose emergent identity (item
   72, §4.5) best matches the claim carries the name — protected as an assigned name (§10.4) and kept past item 72's
   hysteresis; when no district matches above the claim floor (0.5 of a perfect match; our own value, calibratable) the
   name waits, reported, and is matched again at each epoch — never forced onto a poor match (J-A82.73). An ABSENT
   quarter is never a fact, and SettlementForge's own district names — in its news — are never matched (J80 Q6). A
   landmark string the roster already demands becomes a NAMED-FEATURE claim (granularity `feature`: the way, bridge, quay
   or pin it names — a notice post among the pin kinds, §2.7; `tables/dossier/landmarks`); nothing is created for a
   string alone.

A whole-neighbourhood assignment sets the district's intent (layer 2) and its class mix — overriding the class-mix
table's weights inside the assigned district (§4.7 S10b, item 71) — while every building stays individually diversified
by the class rules within the drift bounds, read against §4.7 S11's designation template (item 19) and passed to
`BuildingGenerator.compose`; a district-defining dossier institution is such an assignment with `existence: 'dossier'`,
one district per instance (item 72, §4.5); assignments are events (persist, undo, migrate) and take precedence over
class rules (O10 e). Stable addresses for districts, neighbourhoods, plots and buildings that survive regeneration and
edits are §6.3's.

**Forms catalogue.** A form is a row `{ id, constraints, growthProgramme, signature }`: constraints (site request, wall
rings, plaza position, planned flag, gate count band), a growth programme (stage regimes and branch tables, §4.4), and a
morphometric signature (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed
share). Its schema and its thirteen rows ship at the milestone §16 names for the forms (T1 `intend`'s site cards read
them, §7.8): `organic`, `bastide-grid`, `linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`,
`hill-acropolis`, `bridge-town`, `port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3),
`confluence`, `twin-town`, `polycentric` (two or three nuclei, §4.2 S3) and `citadel-and-port` (item 101: a walled upper
town on high ground over a walled lower port — two nuclei of §4.2 S3, the upper on a hill site primitive with its own
enceinte, the lower on the quay front with its own, one arterial joining them); forms compose by growth stage (an
organic core with a planned extension). O10 (g)'s classifier runs on the signature vector.
=== END ===
