# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)

Each decision is final unless the owner vetoes it. One paragraph each: the choice (its mechanism lives in the section
named), the alternative rejected and the cost of reversing it later; the plain-words rationale of each is in
`docs/ARCHITECTURE-RATIONALE.md`. D-1–D-7 are the owner's adopted defaults (amendment 7), each tied to its mechanism.
Decisions marked *owner veto* touch a subject the owner keeps (a purchase, the licence, new capability); the owner's
delegation of 2026-09-29 (J122) decided every question they once put to the owner, and each stays vetoable. Product
questions that belong to SettlementForge — hosting, accounts, plans, save limits and backups, the public name, the
licence for users' maps, interface languages, the AI provider, key and model tier — follow SettlementForge's own
decisions (J121).

**D-1 — the look.** The default look is clean ink (MFCG family) with IM FELL Great Primer as the label face (§17.2); the
second preset is FTG-like `lit`, on Canvas2D like every preset; a hatched preset serves the close-up (§8.2). The house
style is our own third preset `house`, drafted as three candidate style sheets at M3b and chosen by the owner on the
§13.6 panel at M4, `ink` staying the default unless the owner picks otherwise; with no pick by M4's exit, §13.6 (8)
applies. The look's values follow the corpus palette bands the owner released on 2026-09-27 — a warmer paper, a
brown-black ink and a little more colour, every shipped family inside its targets (§8.2, §13.4; item 69; J-A69.05); the
look stays clean ink in MFCG's family. Rejected: `lit` as the default; a WebGL2 reference backend for `lit` — the
lighting of item 68 leaves that rejection standing: its CPU light pass is the reference and the GPU only accelerates it
under a moving cursor, drawing no mark (§8.4, §8.9; J-A68.05). Reverse: low (a style file).

**D-2 — era and region.** The centre of gravity is high-to-late medieval Western Europe (12th–15th c.), as presets the
corpus phase re-signs through §13.9; walled shares and stage rows per rung are MFCG-calibrated (§1.1, §4.2 S2), and FTG's
lower walled share is reachable as a preset; the regional material shift (§2.6's `regionalShift` rows, off by
default, texture and colour only) is one of its region presets (item 19). Rejected: a hard-coded culture; a 0.35–0.5 walled share (MFCG's shanty
case). Reverse: low (table rows).

**D-3 — realism in the base.** Fantasy exists only as named toggles, each off by default: floating islands and their
conjured rivers — a model setting `recipe.layers.islands`, off by default, that exists only at CITY and METROPOLIS and
only where prosperity supplies it, the sky layer's view toggle showing islands and never creating them (II.6, items 10,
13 and 15; J-A10.01); the `navigable` sewer preset (II.7.2) — the historical sewer network is realism, present by tier
and hidden until its toggle (II.7.1, item 14); the game-system stat pack (D-32); magical lights, which exist only under
the S0 circumstance `magic` (`none` by default, item 68) — torches, lanterns and braziers are realism, and the night view
is a view choice, never a toggle of the model (§8.4; J-A68.05). The underground's other systems are realism by rule —
catacombs, caverns, quarries, vaults and a buried old town, hidden with the underground layer — and the undercity exists
by rule as a modest warren under the sewer's `historical` preset and at the owner's full microcosm, one to three
neighbourhoods by rung, only under the `navigable` preset (II.7.5, II.7.6; item 65; J-A65.43). Rejected: fantasy
defaults. Reverse: low.

**D-4 — the product shape.** A browser-first embeddable TypeScript library with an app on top; permissive dependencies
only (§17.4's checker over the production closure); one generation worker, a derivation pool and a tile worker behind a
handle-based API (§1.7, §11.2). Rejected: a Rust / WASM core from day one; server-side generation. Reverse: medium after
M1 for the core language — a measured hot loop may get a byte-identical WebAssembly accelerator (§3.7), there is no
WASM kernel; low for the worker model.

**D-5 — "mastered".** The owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, run through the
written blind protocol of §13.6, plus the parity numbers of §13.5; an unrated panel follows §13.6 (7). Rejected: numbers only; an eye with no protocol. Reverse:
none.

**D-6 — naming.** Original English-fantasy naming; setting packs in §10.4's format, the base shipping one pack; further
packs are data. Rejected: reuse of reference corpora. Reverse: low.

**D-7 — weighting.** Realism, editability and plot texture first; speed and export next; novelty last — and the
weighting orders the build: the editing core (M2a) before the second preset and the rest of parity (M2b) (§16).
Rejected: speed first; editing after the lit look. Reverse: none.

**D-8 — 3-D export.** glTF 2.0 (OBJ secondary) and CityJSON 2.0 (§11.1). Rejected: CityJSON left for later. Reverse: low (an
exporter).

**D-9 — no restart path.** "No restart path" is a design property; the acceptance numbers are requested-feature delivery
by ladder tier and p95 time per delivered town on MFCG's worst configurations, with their bars in §13.5. Rejected: "0
whole-map restarts" as the number; a p99-bounded restart tier. Reverse: low (criteria).

**D-10 — simulation depth.** The base holds the roster, the context vector, allocation and placement, households and
lazy people, and the relation store's schema from M1; schedules, calendar, factions' meetings, events, economy and
personality are the optional `@plat/sim` module at its own milestone, M4b (§10.1). The base's three dials read the
dossier's — or, standalone, the recipe's — sector shares and power standings as field drivers (§4.5, §7.7; items 72,
78, 79) and never model an economy (J-A72.05). Rejected: schedules and the calendar in the first release; the module
inside M4. Reverse: low.

**D-11 — scatter.** Poisson-disc k = 50, all candidates evaluated, drawn from the thin ring between r₀ and 1.1 r₀, the tile wrapping at its edges — the references' sampler as read in their code (P14; `poisson.annulus`, Bridson's [r₀, 2 r₀] the alternative value) —, builds the per-class ranked tiles once, when the
product is built; per-instance placement is the stamp (§8.10); a measurement (NN p1, pair-correlation) may relax k.
Rejected: k = 30; per-entity Bridson sampling. Reverse: trivial (a table value).

**D-12 — coordinates.** Integer centimetres centred on (0, 0), +y north, under §3.2 (1)'s range invariant. Rejected:
millimetres; doubles. Reverse: high after M1.

**D-13 — the plat.** Five refinement levels as views of one arena per layer (level-tagged edges, per-level face
records), a separate arena per layer and per sky island, unions for multi-face entities (§2.2). Rejected: one flat
subdivision; five separate per-level DCELs (nesting cannot hold on the lattice). Reverse: high after M1.

**D-14 — geometry engine.** Booleans, buffers and bands on the kernel's own arrangement — one engine on every host, with
the oracles and the one pre-decided fallback of §3.7; the straight skeleton built in-house under §3.8's contract and
validator, its downgrades the default paths. Rejected: CGAL (GPL); a JS skeleton port; a runtime pure-JS boolean
fallback (a second engine, different digests). Reverse: low (adapters).

**D-15 — streams.** xoshiro128\*\* streams keyed from §6.1's structured components, the lineage separate from the
address id, concern ids append-only; Enter makes a new document with the successor seed of §6.1. Rejected: one global
stream; a counter-based RNG. Reverse: high after M1.

**D-16 — the fused layout.** Routed arterials between named destinations; reservations and gate sites at S3 and each
enceinte traced before its stage's growth; inside the walls district-scale secondaries plus NG 1.2.2's bent-cut infill,
its mechanism restated in our metric terms (J-A33.01), outside them FTG-shaped growth with explicit legality and stage
regimes; districts grown over the coarse skeleton at MFCG 12710731's per-kind growth rates, typed feature-named before
placement and, after it, named and described by the identity their plots, powers, trade and economy give them (item 72;
J-A72.05), and grouped into quarters; frontage-first plots with the granularity law (§1.4, §4).
Rejected: the four rejected shapes of §1.4; FTG growth down to block scale inside the walls. Reverse: high (the layout
core) — hence M0 and M1's fusion gate.

**D-17 — the enceinte.** Gate sites picked and castle and plaza reserved at S3; stage 1's enceinte traced at S3 from the
travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to
defensible ground before that stage's streets grow; gates exactly at arterial crossings with exact N by the measured
gate law with its waterfront reduction (item 46); gate plazas; the castle by score with the inside / on-enceinte / outside option; an open waterfront by
default (§4.2 S3, §4.4, §4.8). Rejected: a wall on cell edges; tower-per-vertex; walls traced after growth. Reverse:
low.

**D-18 — budgets as laws** (*owner veto on the misses above the knees*). Model and first-map budgets are per-rung laws of
the building count (§12.3, §12.5), read over every size of a rung, with the derivation pool primary wherever §12.3's rule
keeps it and the single worker as the pre-decided fallback elsewhere; the max clause is judged on outliers confirmed by
solo re-timing (§12.3); the one-click path stays complete at every size; the per-building cost against MFCG is a
declared trade (§12.9). The owner may veto the two declared misses: O3 (d)'s model bars above the sizes §12.3 states,
and O12 (g)'s first-map bar above the knee §12.5 states. Rejected: workers assumed without a merge protocol; matching
MFCG's per-building cost by dropping plot detail; a preview or a coarser one-click path above the knee. Reverse: low
(numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss.

**D-19 — defaults and calibration anchors**, all data that costs nothing to change: the codename PLAT and the package
prefix `@plat/*` (the product's public name follows SettlementForge's, J121); the
terrain resolution per rung (§2.3); frame areas, aspect and margin (§1.1, §3.2 (9)); the minimum edge, the attraction
distance, the minimum plot width and angle (§3.2 (2)); the district band from the count law (§4.5); the gate law with
its waterfront reduction (§4.2 S3); stage counts and walled shares per rung (§1.1, §4.2 S2); the day view by default with
the cursor as its sun — the owner's rule (item 68) — and a fixed sun where there is no pointer, every shipped family
casting shadows by default, the `ink` map gently in its own ink and the `MFCG` preset none (J-A68.81; decided J-C1;
J-A68.05); heights always populated (§2.6);
tower spacing and every band as calibratable table rows (§7.6). Reverse: trivial (data).

**D-20 — effort.** Computed once in §16 (file f item 568): the base with stage 2 ≈ 221.5–300.5 expert person-weeks
(the base 194.25–264.25, the content module included, plus stage 2 27.25–36.25), and the whole program with every staged
milestone ≈ 392.25–539.25, re-derived line by line (J-A16.01, J-A63.05, J-A73.05, J-A101.05); the cuts that would
reduce the first total to ≈ 204.5–272.5 are recorded for the owner's veto, not applied (§16). Rejected: 100–130 pw; cutting scope to
hold it. Reverse: none (an estimate).

**D-21 — the document.** A base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot
cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and
every version in the CLI; an upgrade is an undoable event (§2.9, §6.4, §7.4, §7.5). Rejected: events only; "the last N
minor versions stay replayable" with no mechanism. Reverse: low. In the SettlementForge module the host is the store,
and its plans, save limits and backups follow SettlementForge (J121; volume 8).

**D-22 — our own licence** (*owner veto*). Proprietary, all rights reserved to the owner — the owner's ruling of
2026-09-27, the GPL-3 intent withdrawn (§17.3; J-A21.01); no dependency may constrain a later choice; the licence of the
maps users make follows SettlementForge's terms (J121). Rejected: leaving it undecided; an open licence by default.
Reverse: low (a licence file) until code is published.

**D-23 — deterministic maths.** Transcendentals through `dmath`, our TypeScript port of the fdlibm 5.3 routines with
Sun's notice, under §6.5 (3)'s allowlist lint, which also scans vendored dependencies (§6.5 (4)). Rejected: in-house
polynomial approximations; trusting the engine's `Math.*`; the `@stdlib` packages. Reverse: low (one adapter and one lint
rule).

**D-24 — goldens.** Stage-isolated goldens (new stage code on frozen upstream outputs), built at M1; end-to-end goldens
re-signed only with a cascade record; every milestone files its declared shifts; a same-seed output change is never let
ride silently (§13.3). Rejected: one whole-model hash per seed; goldens at M4. Reverse: trivial (test tooling).

**D-25 — the evolution hook.** Exactly one built and tested incremental path in the base — add a growth stage to an
existing town, with wall → ring road as a typed conversion — plus the epoch key component and the transformation-event
vocabulary — the decline ladders of buildings, walls and tunnels with the salvage ledger and the regrowth-first siting
(item 8), the island kinds (items 10, 13), use relocation and the designation mutation (items 17, 18), the wealth ladder
with the built band, the geometry floor and the manifested band (item 31), the interior ladder, the dwelling unit and the canonical prior
(item 28 (f)), rejection and positive placement (item 20), fusion and splitting as edit kinds, the terrain-water kinds
(item 25) and the sealing and reopening of passages (item 30) — every kind usable by hand in the base and undoable;
the `Works` record that shows a change on the ground mid-way over its weeks, with
its `WorksTable`, its stage derived at any week and its drawing rows (item 67; §4.11; J-A67.41), and the access edit
whose closure rule generates the pieces it needs (item 66; §7.3 item 9 (d); J-A66.71, J-A66.01: its underground
pieces run once the underground layer's stages exist, its dry run until then refusing with F-EDIT naming the staged
layer, its bars on the layer's hook fixture from M4); the evolution engine, which
schedules them from circumstances on the weekly clock, is volume 6, built at M6-E on these interfaces (§4.11, II.6,
II.7).
Rejected: no incremental path; the full engine now. Reverse: low.

**D-26 — identity.** Opaque lineage-hash addresses with survival and succession (§6.3). Rejected: hierarchical
creation-order ids; a per-kind counter. Reverse: high after M1.

**D-27 — work limits.** Work limits, never wall clock, bound every output-affecting budget (§5.1). Rejected: wall-clock
watchdogs. Reverse: low.

**D-28 — the model digest.** A Merkle root over the eager model's content only, maintained at batch commit (§6.2).
Rejected: hashing the canonical serialisation per batch. Reverse: high after M1.

**D-29 — the clean-room chain** (§17.1): implementers read only the architecture set — the base, `docs/volumes/INDEX.md`
and the volumes their milestone builds — and a checked implementer digest; research seats also read the captured
bundles to understand them, the implementers' inputs unchanged (§17.1 (1); J-A32.01); the
product in its own repository `plat/` with a path rule; reference numbers only through the committed files of §17.1 (4);
a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by
origin; a seat ledger in `CLEAN-ROOM.md`. Rejected: findings and captures as implementer inputs; path-only CI rules.
Reverse: low (process) — in place before M0's code.

**D-30 — thresholds.** Every threshold has a number now: reference-settable bands by §13.5's band rule from
`baselines.json`; the thresholds no reference can set in §13.7, each with a provisional number, the first milestone that
confirms it and a pre-decided fallback; no placeholder can gate or pass. Rejected: placeholders set by the corpus phase.
Reverse: trivial (data).

**D-31 — matched references** (*owner veto*). The matched sizes of §13.5; FTG's premium METROPOLIS is not purchased: the
METROPOLIS side-by-side uses MFCG 130, with FTG's published metropolis pictures as an unscored reference card; no premium FTG capture is bought
(J122, V12 Q-V12-1). Rejected: a CITY-only FTG comparison; a purchase. Reverse: low (one capture day if the owner
buys).

**D-32 — economy, personality and stats** (*owner veto: new capability rather than repair*). Economy (resource chains,
items and services with prices, stock per building, global price edits), personality (trait sentences, motivation,
mannerism, hobbies), education gated by class and a stat block with profession modifiers are `@plat/sim` content
(M4b), derived from their keys with our own authored tables; their schema stubs are in the base (§10.3); the stat block
is a named game-system pack, off by default (D-3); the family-tree view is in the app (§14). Rejected: leaving them
unrecorded; putting them on the one-click path. Reverse: low (module content; dropping it removes ≈ 2–4 pw from M4b).
The split (J-A16.44): the resource and supply edges placement reads and S2's need propagation are base data
(§10.2, §4.7 S10b); prices, stock and trade stay module content. Items 72, 77 and 78 keep the split: the dossier's or
the recipe's sector shares and trade partners are read as they are — by the economy dial and by the gates' and ways'
trade weights (§4.3, §4.5) — and never priced, stocked or exchanged (J-A72.05).

**D-33 — the two ladders.** They meet at 1 500 inhabitants; size within a rung follows population; per-rung rows live in
`ladder.json` — the `layers` rows of items 13 and 14 among them (J-A13.01); requests below and above the ladder are routed or
clamped as §1.1 states — a dossier below 1 500 people is refused by the port, naming the village product, while no
village product is registered, and routed to it once one is (§7.7; item 81, J-A81.71; file f item 202), and one above
the 120 000 cap is refused, naming the cap (§1.1; J-A81.01). Rejected: an undefined
boundary; a 2 000 floor leaving a gap below the base. Reverse: trivial (data).

**D-34 — CI tiers.** Three tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h) on a stated
runner; the oracle once per sequence; an over-budget job is split, never re-capped (§13.8). Rejected: one full run per
change. Reverse: trivial.

**D-35 — build order.** M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset; METROPOLIS,
which generates from M1, measured and tuned) → M3a full editing, migration and API → M3b exports, forms and should-have
tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; the volumes' milestones in the
owner's combined order (J122; §16): V-M0 right after M0, M3c beside M3b, after M4 the village, M6-E and M6-P's first
rungs beside M5, then M6 and M6-U, then M6-sky, M-CAL and M-SF; nothing leaves the program.
Rejected: the lit look before editing; moving exports, forms or the module out of the program. Reverse: low (a plan).

