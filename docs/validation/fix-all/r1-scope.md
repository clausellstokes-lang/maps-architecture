# Fix-all round 1 — SCOPE area (§1 scope, fusion thesis and stack; §13 testing; §14 packages and interfaces; §15 matrices; §16 build plan; §17 clean room and licences; the decision, judgment and deferral tables; the one-page summary; §0.4)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r1 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-scope-r1` · 2026-09-25 · seat: fix architect for the SCOPE area (Fable role; opus stand-in),
clean-room (no captured JavaScript bundle, no file under `reference/`, no reference code opened; the findings were read
only where a red-team or audit row cites them, for numbers).

**Status: COMPLETE.** 39 owned items: **38 FIX** (two of them duplicates fixed with their primary) and **1
STAGED-BY-OWNER** (DEF-9, the corpus calibration, with its interface concrete); **0 INVALID, 0 deferred**. Twenty-three
replacement blocks and one insertion block (the new §13.6–§13.9) follow, then the cross-area requests and the coordination
record that shows how every request the kernel, determinism, pipeline and rendering drafts sent to this area is carried.

## 0. How to read this file (plain words)

The owner asked on 2026-09-25 that nothing be put off: "I would prefer if there is no defer and everything is fixed as
soon as possible." This file does that for the parts of the design that say *what* is built, *in what order*, *how it
is tested*, *how it is kept legally clean* and *which decisions were taken*. Each problem the reviewers found in those
parts is listed in §1 with what now fixes it. §2 holds the new text of each affected part of `docs/ARCHITECTURE.md`,
ready for the integrator to paste in; each block starts with a line saying which part it replaces. §3 lists changes this
area needs in parts other areas own. §4 shows that every change the other four areas asked of this area is in the blocks.

The main changes, in plain words:

* **Tests that measure the gain, not the rule.** Every acceptance number is now tagged as a *conformance* check (true by
  construction), a *parity* check (compared with a measured reference number) or an *outcome* check (shows the town is
  better). The owner's "side-by-side" judgement gets a written protocol: seeds fixed beforehand, matched sizes, blind
  left / right order, three questions, a pass rule and a filed record. Every threshold has a number today, with the
  milestone that confirms it and what happens if the measurement disagrees.
* **An honest effort figure.** Re-derived line by line: about 150–200 expert person-weeks for the base, the content
  module and stage 2 (the earlier 100–130 left out the content, the app and the test rig). Nothing is dropped to hit a
  number; the list of what would shrink it is written down for the owner to veto.
* **A build order that follows the owner's weighting.** Editing comes directly after the first viewable town, before the
  second look; the overloaded third milestone is split in two; the simulation module gets its own milestone.
* **A clean room that cannot leak.** Programmers read only the architecture and a cleaned digest; the product's code lives
  in its own folder that never reads the research or capture folders; reference numbers reach the tests through one
  numbers-only file; a scanner fails the build if reference word lists or palette values appear; every dependency is
  permissive, pinned and credited in a generated notices file.
* **No deferrals list.** The old list is replaced by a table saying where each former deferral is now decided, and a short
  list of subjects the owner's own roadmap puts later (neighbourhood close-ups, manor buildings, the village product,
  sewers and floating islands, the evolution engine, the historical-corpus calibration, SettlementForge inputs), each with
  the hooks the base carries now.

**Reading record.** Read in full: `docs/ARCHITECTURE.md` (2 200 lines), `docs/ARCHITECTURE-VALIDATION.md`,
`docs/AMENDMENTS-2026-09-25.md`, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, `docs/DEFINITION.md`,
`docs/validation/redteam-improve.md` (every line), `docs/validation/fix-all/index.md` (headers, §3 duplicates, the scope
table, §5 notes) and every `index.json` record of the 39 owned items and of the 39 items other areas own that touch these
sections. Read at the cited detail: GEO-12 (redteam-geometry §3), LC-19 (redteam-lifecycle §3), SCL-17 – SCL-22
(redteam-scale §3), MFP-2 and MFP-8 (redteam-mfcg §3), FTG-15, FTG-16, FTG-17 and FTG-22 (redteam-ftg §3); the audit rows
MFCG L04–L10, VG VN-008 – VN-011 and VN-086 – VN-089, FTG A21 – A25, B08 – B14 and C01 – C12, and the FTG §5 / §6 and NG §6
observation lists; `captures/mfcg/exports-sweep-2026-09-25/README.md` (every line; numbers only);
`docs/CONFIDENCE.md` §1; the acceptance paragraphs of `docs/IMPROVEMENTS.md` O1, O7, O12, O13, O14, O16, O18, O19, S2
and the J-T row. Read for coordination: the four landed round-1 drafts of the other areas — their disposition tables,
their cross-area requests to this area in full, and the blocks this file's text must agree with (kernel §3.6–§3.8
decisions; determinism §5.1, §5.3, §5.4, §6.3, §6.4, §7.3, §7.4, §7.7, §7.8; pipeline §4.2 S2 / S3, §4.4, §4.12, §10.1 –
§10.3, PART III; rendering §8.2, §8.3, §8.5, §9.5, §11.2 – §11.5, §12 in full).

## 1. Disposition table

X = a cross-area request (§3). "Sections changed" names the blocks of §2 that carry the fix.

| item | disposition | sections changed | mechanism, in one line |
|---|---|---|---|
| GEO-12 | FIX | §13.1, §13.8 | constructive degeneracy generators — lattice points on segments by gcd stepping, collinear overlaps, cuts through vertices and grazing reflex vertices, antennae, coincident typed chains, snapped rotated rectangles / squares / regular n-gons, holes touching the outer ring at a vertex, values exactly on quantisation boundaries and just out of range — held to the same 0-crash / 0-invalid bar in every CI tier; `splitFace` children tile the parent exactly (`area2` equality); every skeleton output passes the §3.8 validator (connected; independent cycles = holes) or is a reported downgrade |
| LC-19 | FIX | §16 (M1 content and every exit), §13.3, D-24 | the output-version stamp, shift and cascade records and stage-isolated golden tooling are M1 work; links made before M4's exit are labelled *preview* links that show their output version; every milestone's exit lists its declared shifts and fails on an undeclared one; retention of output versions N−1 and N−2 is built and tested in M3a |
| SCL-18 | FIX | §13.8 (new), §16, D-34 | three CI tiers with wall-clock budgets on a stated runner (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h), timings normalised by §12.1's calibration score; the locality oracle once per sequence; a job over budget is split, never given a larger cap |
| SCL-19 | FIX | §13.2 | cost-model tests on ≥ 6 sizes per stage (1 500 → 120 000 people) failing on a log-log slope above 1.15 (1.25 for stages declared n log n); per-edit cost of a fixed scope flat from TOWN to METROPOLIS ± 20 %; index-rebuild work against commits × level size |
| SCL-21 | FIX | §13.2, §15.2 O6 (d) | the statistics record split into an O(n) core emitted per generation (4 ms at CITY, §12.4) and bench metrics (detour index, Moran's I, KS distances, tree statistics from §8.10's stamps) computed on demand or in the bench only |
| MFP-8 | FIX | §1.4 units row, §13.5 | 4.00 m per MFCG internal unit, the JSON export already in metres; MFCG baseline rows from the size-sweep exports with provenance; MFCG lot areas labelled lots, never a house-size anchor |
| FTG-15 | FIX | §13.5, §15.2 O4 (b) | curves compared after resampling both sides at 10 m (turning per 100 m, heading change per 50 m); junction-to-junction run lengths by class instead of edge lengths; every reference cell labelled *target*, *weakness to beat* or *descriptive*; junction bands per preset |
| FTG-16 | FIX | §16 M-1, §13.6, D-31 | FTG BIG_TOWN (≈ 5 600) and BIG_CITY (24 500) captured free over the daily allowance at M-1 and decoded with the existing tools; population-matched pairs; METROPOLIS: no purchase by default — the BIG_CITY pair plus FTG's published metropolis pictures as an unscored reference card — with a premium month recorded as the owner's veto option |
| FTG-22 | FIX | §17 (with §11.3) | the bridge vocabulary is our own (§11.3); §17 states the rule (protocol ideas admissible, the module's message and field names not reused) and the deny-list scan carries those names |
| IMP-1 | FIX | §17, §14 (`@plat/testkit`), §13.5, §16 M-1, D-29 | implementer inputs = ARCH + a sanitised implementer digest written by one seat and checked by another; `research/`, `captures/`, `reference/` and the findings research-only; the product repository `plat/` outside them with a path rule; B-REF reads only a numbers-only `baselines.json`; a hashed content deny-list scan in CI; reference-derived constants labelled by origin; a seat ledger in `CLEAN-ROOM.md` |
| IMP-2 | FIX | §16 (effort table), D-20 | line-by-line re-derivation: base 136–182 pw + stage 2 14–18 pw = 150–200 pw, equal to the milestone sum; content authoring and the app's UI are named work items; stated as an owner-visible decision with the list of cuts that would shrink it |
| IMP-3 | FIX | §16, D-1, D-7, D-10, D-35 | the editing core (M2a) directly after M1 and before the second preset; `lit` on Canvas2D (§8.2); M3 split into M3a (full editing, migration, API) and M3b (exports, forms, should-have tiers); `@plat/sim` its own milestone M4b after the relation store; snapshot-first persistence with retention (§6.4); nothing leaves the program |
| IMP-4 | FIX | §15.2 (every letter tagged C / P / O), §13.6, D-5 | tags; a C letter is never cited as evidence of improvement; each first-weighted improvement has a P or O letter its own rule cannot satisfy — plot texture: figure-ground, streetwall and plot statistics against MFCG's exports and FTG's payloads at matched rungs with the intended direction declared; editability: the scripted MFCG-ask scenarios with locality; legibility, charm and realism: the D-5 protocol |
| IMP-5 | FIX | §15.2 O1 (a), O3 (b), §13.5, D-9 | requested-feature delivery counted by tier (a tier-6 omission of a requested feature is a failure, target 0; degraded ≤ 5 % with a pre-decided fallback); p95 wall-clock on an MFCG-worst configuration set against MFCG's 3.7–4.0 s; "no restart path" kept as a design property |
| IMP-6 | FIX | §13.7 (new), §13.5, D-30 | every threshold without a reference source has a number now (provenance "architecture 2026-09-25"), the first milestone whose mechanism runs confirms it by measurement or by the D-5 panel, and a pre-decided fallback applies if it disagrees; J-T narrowed to reference-settable bands under a fixed band rule |
| IMP-7 | FIX | §15.2 O9 (c), §16 M3a | O9 (c) = §7.3 item 7 (iv): byte identity for Regenerate (keep settings); New random inside the central 95 % band of K ≥ 50 from-scratch generations of the same scope; a campaign judged by a binomial test on the pass rate |
| IMP-10 | FIX | §15.2 O1 (b), O7 (a) / (d), O12 (b), O13 (a), O14 (b) | the dropped clauses restored with their numbers; O7 (a)'s "every person a work or role" is a module letter measured at M4b |
| IMP-11 | FIX | §15.2 O16 (c), S2; §13.6 | tester counts replaced by scripted task checks in the browser harness (actions and response time per task); S2's preference test folded into the D-5 protocol with the owner as the declared rater |
| IMP-12 | FIX | §15.2 O4 (h), §13.5, §16 M1 | between-seed dispersion of the signature vector over 100 seeds per rung and water setting, floored by MFCG's and FTG's dispersions, from M1 |
| IMP-13 | FIX | §16 M1 exit | the fusion gate re-run as an M1 exit on B-CITY-lite's river, coast and relief configurations with the reordered stages (reservations, trace before growth), with pre-decided M1 fallbacks for time and for statistics |
| IMP-14 | FIX | §17, D-23 | Boost entry corrected; `dmath` = our own TypeScript port of the needed fdlibm 5.3 routines with the Sun notice (no `@stdlib` closure); the checker over the transitive production closure with listed dev-only exceptions; a generated third-party notices file shipped with every bundle; exact version pins, no prereleases |
| IMP-15 | FIX | §17, §13.5, D-1 | style laws tested on our palettes (§8.3), reference ratios kept as descriptive benchmarks; the default label face is IM FELL Great Primer (OFL; a third-party asset outside the clean-room rule) |
| IMP-16 | FIX | §15.2 O9 (f), §13.2 | O9 (f) = the thirteen scripted scenarios of §7.4 with locality share, invariant results and re-run cost reported |
| COV-MFCG-L08 | FIX | §14 `@plat/app` (keymap), §15.1 MFCG F3 | a stated input scheme held in an editable `keymap.json`: click selects, shift+click New random, ctrl / cmd+click reset to generated, alt+click lock, double-click zoom to the entity; single-key toggles; active only while the map has focus; every key action also on a menu |
| COV-VG-VN-010 | FIX | §13.5 | every baseline carries `referenceBuild` with its capture id, script and date; the parity CLI refuses a row without it; a reference build change is a declared baseline shift |
| COV-VG-VN-088 | FIX | §1.1, D-33; X rendering §12.2, pipeline PART III | the base's floor is 1 500 people, equal to the village ladder's ceiling; 1 500–10 000 is a base TOWN whose size follows its population; a request below 1 500 routes to the village product through a declared hook (clamped and reported while that product does not exist) |
| COV-FTG-A24 | FIX | §14 `@plat/app`, §13.4, §15.1 FTG A1 | an accessibility contract (WCAG 2.2 AA for the app's chrome, landmarks and labels, full keyboard reach, the gazetteer list / search and a "features in view" list as the non-visual route to the map), tested by axe-core and keyboard-only scripted tasks |
| COV-FTG-A25 | FIX | §14 `@plat/app` and `@plat/docs`, §13.2 | a user guide generated from the control and entity registries plus written pages; context help on every control and panel through §7.8's anchors; release notes naming known defects from a tracked file; CI link and coverage checks |
| COV-FTG-B10 | FIX | D-32, §15.1 FTG B7; X pipeline §2.7 / §10.3 | economy content (resource chains, items and services with prices, stock per building, global price edits) decided into `@plat/sim` with a base schema stub; flagged for owner veto as a new-capability call |
| COV-FTG-C03 | FIX | D-32, §15.1 FTG B8; X pipeline §10.3 | personality, education gated by class and a stat block with profession modifiers decided into `@plat/sim`, derived from the person key; the stat block is a named game-system pack, off by default; flagged for owner veto |
| COV-FTG-C11 | FIX | §14 `@plat/app`, §15.1 FTG B9; X rendering §11.2 | a family-tree view over the relation store (layered generations, elided expansion, re-root) in the app, module tier, built at M4b |
| COV-NG-OBS3 | FIX (duplicate of MFP-8) | §13.5 | the MFCG footprint baseline re-based on the metre exports and labelled lots; the "≈ 13–14 m across at size 25" figure removed |
| COV-FTG-OBS1 | FIX | §15.1 | every FTG row re-cited to the section that now carries its mechanism; rows added for the ruler, economy, personality, stalls, feathered edges, tree species and the family tree |
| AM-4 | FIX | §1.1, §0.4, D-33 | both ladders named; a `RungProfile` table defines per rung the population band, frame, stage rows, budgets, granularity modifiers and greenery modifiers; size within a rung follows population |
| AM-7 | FIX | D-1 – D-7, §0.4, §13.6 | every clause checked against a concrete mechanism and completed: ink default and `lit` on Canvas2D; the house style drafted as three candidate sheets at M3b and chosen by the owner at M4; era rows refined through §13.9; fantasy only as the listed named toggles; browser-first library with the §17 checker; "mastered" through the §13.6 protocol plus the parity numbers; naming through §10.4's pack format; the weighting now orders the build (M2a before M2b) |
| MN-2 | FIX | §13.5 (timing row), §13.6, §16, D-31 | TOWN = MFCG size 40, CITY = 80, METROPOLIS = 130 in every side-by-side and timing row (MFCG 57 / 131 / 156 ms); FTG compared at TOWN and CITY on free captures, METROPOLIS per D-31 |
| DEF-1 | FIX (duplicate of IMP-6) | Deferrals, §13.5, §13.7 | no placeholder band remains: every band has a number and a provenance now, a fixed update rule from `baselines.json`, and §13.7 for thresholds no reference can set |
| DEF-9 | STAGED-BY-OWNER | §13.9 (new), Deferrals | the corpus-calibration interface is concrete: `CorpusAdapter`, corpus rows in `baselines.json`, `CalibrationRun` applied as table-version bumps with declared shifts; running it is the owner's staged phase |
| DEF-14 | FIX | D-22, §17 | default posture decided: the product repository is proprietary, all rights reserved to the owner, until the owner chooses — the most option-preserving default (relicensing is the owner's unilateral act; publishing cannot be withdrawn); flagged for owner veto; the permissive-only closure, the notices file and the clean-room chain keep every licence open |

**Counts:** 39 items — 38 FIX (two duplicates: COV-NG-OBS3 with MFP-8, DEF-1 with IMP-6), 1 STAGED-BY-OWNER, 0 INVALID,
0 deferred.

## 2. Replacement and insertion blocks

Blocks are in document order. Every block carries the section banner the stand-in rule requires. New judgment calls
made inside a block are written there as "chose X over Y because Z" and collected, with every other area's, in the
Judgment-calls block (S-21).

### Block S-1 — the one-page summary (items LC-3's summary sentence for determinism, AM-4, AM-7, IMP-3, IMP-4, IMP-5, IMP-13, IMP-1; pipeline S-a)

=== REPLACE The whole design in one page (plain words) ===

## The whole design in one page (plain words)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

We are building one program that draws believable medieval towns and cities at three sizes — town, city, metropolis,
with the size inside each set by the requested population — the way watabou's Medieval Fantasy City Generator (MFCG) and
Thomas Allerton's Fantasy Town Generator (FTG) do, taking the best idea from each at every step and adding our own
measured improvements. Later the same program will open any district as a detailed neighbourhood (stage 2), and later
still each building will be composed of wings and roofs the way Fantasy Manor builds a manor (stage 3). A separate
village generator (thorp → hamlet → village) comes afterwards; this design carries the hooks it needs and does not pay
for it.

How it works, in order. First the ground: a real heightfield in metres with water that flows downhill, so rivers always
reach the sea and coasts never contradict the contours (neither reference has this; MFCG restarts a whole city when its
river fails). Second the demand: from the requested population we compute, from our own tables, how many houses,
workshops, inns, churches and so on the town needs and how much land that takes — before any street is drawn (FTG's
idea). Third the big decisions: the market square, the castle and the large precincts are reserved, the gates are
chosen and each ring of wall is traced before the streets it encloses are grown, so nothing later has to cut through
them (MFCG builds its wall first for the same reason). Fourth the streets: main roads are routed between real
destinations (gates, the market, bridges, the harbour) over the terrain; inside the walls the lanes are cut by the "bent
cut" that gives watabou's maps their charm — one bend, arriving square to the far side — measured from Neighbourhood's
recordings, while outside the walls side streets grow along the main roads the way FTG's do. Fifth the districts: groups
of blocks named for their market, gate, harbour or castle, shaped by a prosperity field that rises near the centre, the
market and high dry ground and falls near tanneries, walls and damp low ground. Sixth the plots: every block is divided
from its street frontage into parcels whose width and depth follow prosperity — rich quarters join plots into fewer,
larger ones with courts; poor quarters split them and get narrow alleys. Seventh the buildings: each plot gets a site
plan — a row house with party walls, a manor set back behind a yard with outbuildings, a detached house, a hovel — and
every building carries its floors and roof heights even though the map is drawn from above, so shadows and 3-D can be
added later. Then towers, the castle, bridges, the harbour, fields and woods sized to the population, greenery placed by
rules that read prosperity, and finally names and curved labels that never cover a gate or a keep.

Everything is drawn from one "display list", so the same town renders as a clean ink map (the default, in MFCG's
family), as a textured lit map like FTG's, or as a hatched close-up like Neighbourhood's — all on one drawing path — and
exports to SVG, PNG, GeoJSON, virtual-tabletop scenes and 3-D. Everything is editable: every element and every rule
table can be changed, edits are saved as a list of events on permanent addresses, they survive regeneration and version
upgrades, and the generator repairs around them locally instead of re-rolling the world. The same seed always gives the
same town on every machine. Adding a new kind of decoration or name, re-rolling one block or growing the town never
reshuffles what already exists; a change to how an early step works changes the towns built on it, and every release
declares such a change, stage by stage, instead of letting it slip through; edited towns keep their edits through their
permanent addresses. There is no whole-map retry: every step that can fail has a short, bounded fallback ladder, and the
report says for every requested feature whether it was delivered in full, simplified or left out.

How we know it works. The riskiest part — whether grown streets and bent-cut lanes fit together within the speed budget
— is measured first, in a spike, and again on real terrain and water at the first milestone. Every acceptance number
says whether it only checks that a rule was followed, compares us with a measured MFCG or FTG number, or shows that the
town is better; the owner's side-by-side judgement follows a written, blind protocol at matched sizes, and every
threshold has a number today. The first product milestone is a viewable town for the owner's eye; editing comes
directly after it, because the owner ranks editability first. The programmers work from this document and a cleaned
digest of the research — never from the references' code, word lists or palettes — and every library is permissively
licensed, so the owner keeps every licensing choice.

What comes later, by the owner's own roadmap, with its hooks built now: neighbourhood close-ups, manor-style buildings,
the village product, sewers and floating islands, the town's evolution over decades, calibration against historical
maps, and SettlementForge inputs. Nothing else is postponed.

### Block S-2 — §0.4 (items AM-4, AM-7; determinism S-2 for AM-5; pipeline S-i for AM-1, AM-2, AM-3, AM-6)

=== REPLACE §0.4 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land ===

### 0.4 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

The fix-all pass of 2026-09-25 checked every clause of every rule at its landing and added what was missing; where a
rule has several clauses its landing carries a clause map.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 1 greenery by prosperity | §4.9 S12b rule table (reads the prosperity field and the district kind; yard planting by plot class), §15.2 O19 | §4.9 |
| 2 floating islands, refined (a toggle, staged by the owner) | §2.7 `SkyIsland` with its own terrain and a `reason` (prosperous quarter or unique institution); PART II II.1 rule 5 (the sky call) and II.6 (the staged layers' hooks); §4.2 (island outline); §11 (per-layer export) | II.6 |
| 3 heights for shadows | §2.6 heights and the ground datum on every building, wing, tower and roof; §8.4 the shadow pass and the display list's shadow hook | §2.6 |
| 4 size ladders | §1.1 (both ladders; the `RungProfile` table: population band, frame, stage rows, budgets, granularity and greenery modifiers per rung; size within a rung follows population); §12.2 (bands and matched reference sizes); PART III (the village ladder THORP → HAMLET → VILLAGE and its ceiling) | §1.1 |
| 5 everything editable | §7.1 (the clause map, the edit-target table and its registry test), §7.2–§7.6, §2.8 (edit paths in the entity registry) | §7.1 |
| 6 prosperity a gradient and a band | §4.5 (the field, its drivers, bands only where a table needs one, continuous interpolation, evolution moves the field), §4.7 (interpolating rules), §7.2 (brush edits) | §4.5 |
| 7 adopted defaults | Delegated decisions D-1–D-7, each clause tied to its mechanism (the ink default and `lit` on Canvas2D; era rows refined by §13.9; the named fantasy toggles; the browser-first library under §17's checker; "mastered" through §13.6's protocol plus the parity numbers; naming through §10.4's packs; the weighting ordering the build, §16) | D-1–D-7 |

### Block S-3 — §1.1 (items AM-4, COV-VG-VN-088, IMP-3; rendering §1.1 request; pipeline S-e staged list; kernel COV-VG-VN-156 frames)

=== REPLACE §1.1 What is built, in what order ===

### 1.1 What is built, in what order; the two size ladders

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19: the plot model, plot granularity, prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (designed here, built after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| **STAGE 3** (staged by the owner, after stage 2) | manor-style building compositions per plot, from a giant manor to a hovel by data rules | hooks concrete: §2.6 (`outline` / `compose` split, cost contract, intake measurement), §8.6 |
| **VILLAGE** (a separate product, staged by the owner; THORP → HAMLET → VILLAGE) | not designed; its hooks are concrete and nothing in the base precludes it | PART III, §15.1 VILLAGE-LATER rows |
| **staged by the owner, hooks concrete** | sewers and floating islands (II.6; §2.1 layers, §2.3 drainage); the evolution engine beyond the one built growth path (§4.11); calibration against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract) | the named sections |

**The two ladders (owner rule 4).** The town/city generator scales **TOWN → CITY → METROPOLIS**; the village product scales
**THORP → HAMLET → VILLAGE** (PART III). The ladders meet without a gap or an overlap: the village ceiling and the base
floor are both **1 500 inhabitants** (D-33). **Size within a rung follows population** (owner, 2026-09-25): the request's
population chooses the rung whose band contains it — bands include their lower bound and exclude their upper one, so
TOWN is [1 500, 10 000), CITY [10 000, 30 000) and METROPOLIS [30 000, 120 000] — and every quantity below it — roster,
stage budgets, district count, frame, plots — is computed from that population, never from the rung's target.

**The rung profile.** Everything the owner's rule says is "defined per rung" lives in one versioned data table,
`ladder.json` in `@plat/tables`, one `RungProfile` row per rung, calibratable like every table (§7.6) and refined by the
corpus phase (§13.9):

```ts
interface RungProfile {
  rung: 'TOWN'|'CITY'|'METROPOLIS';
  populationBand: [number, number]; populationTarget: number;           // the band chooses the rung; the target is the default request
  frameAreaKm2AtTarget: number; aspect: [number, number] /* 0.5–2; square by default */;   // side scales with √(population ÷ target) (§3.2, §12.2)
  stageRows: StageRowRef;                                               // stage count, regimes and walled shares (§4.2 S2)
  budgets: BudgetRef;                                                   // model, first-map and memory budgets (§12.3, §12.5, §12.8)
  granularity: { frontageScale: number; depthScale: number; joinMaxDelta: Record<ProsperityBand, number> };   // scales the §4.7 rows
  greenery: { parkPer1000Scale: number; edgeGreenProb: number; privateGreenShift: number /* points */ };       // scales the §4.9 rows
  districtCountLaw: LawRef; gateLaw: LawRef;                            // §4.5, §4.8
  matched: { mfcgSize: number; ftgSize?: 'BIG_TOWN'|'BIG_CITY'|'METROPOLIS' };   // the side-by-side references (§13.6)
}
```

| rung | population band (default target) | buildings at the target | frame at the target (+ 30 % margin per side) | stage rows | model p95 | granularity (frontage × / depth × / rich join max +) | greenery (parks per 1 000 × / edge green or orchard probability / private green shift) | matched references |
|---|---|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2.0 km square) | 2 stages; walled core 0.90 of buildings, ribbon 0.10 | 100 ms | 1.10 / 1.10 / 0 | 0.8 / 1.0 / +5 points | MFCG size 40; FTG BIG_TOWN (≈ 5 600) |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5.0 km square) | 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | 300 ms | 1.00 / 1.00 / 0 | 1.0 / 0.6 / 0 | MFCG size 80; FTG BIG_CITY (24 500) |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8.0 km square) | 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | 800 ms | 0.90 / 0.95 / +1 | 1.2 / 0.4 / −3 points | MFCG size 130; FTG METROPOLIS per D-31 |

The stage rows are §4.2 S2's (MFCG's measured 0.87–0.92 of buildings inside the outermost wall); the budgets are §12's;
the matched references are §13.6's. *Chose* modest per-rung modifiers — wider and deeper plots and more private green in
a town, narrower frontages, larger joined rich plots and more public parks in a metropolis — *over* identical rows at
every rung *because* the owner asked for granularity and greenery to be defined per rung, and land pressure in the core
rises with town size (the historical pattern the corpus phase will calibrate); the values are PLAUSIBLE defaults with
provenance "architecture 2026-09-25". **Confirmation (M2b, B-CITY):** the modest band's median frontage orders TOWN >
CITY > METROPOLIS and park area per 1 000 inhabitants orders TOWN < CITY < METROPOLIS. **Pre-decided fallback:** if an
ordering fails, that modifier's distance from 1 is doubled once and re-measured; if it still fails, the modifier is set
to neutral (1.0 / 0) and the ordering is reported as not produced.

**Requests at the ends of the ladder.** A request below 1 500 inhabitants is routed by `LadderRouter.route(population) →
{ product: 'base' | 'village', rung }` to the village product (PART III); while no village product is registered the
base builds a 1 500-person TOWN and `requestedVsBuilt` reports the clamp. A request above 120 000 is clamped to 120 000
and reported. A request that names both a rung and a population outside that rung's band is an F-EDIT conflict whose dry
run offers the rung the population belongs to.

### Block S-4 — §1.2 (pipeline S-a first paint; SCL-17 / rendering §12.5 first map per rung; COV-MFCG-K06 raised copy; IMP-15 face)

=== REPLACE §1.2 The one-click default, stated once ===

### 1.2 The one-click default, stated once

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

`generate({seed})` → a TOWN of 5 000 people whose complete city band — every block in its ground tone, every footprint
mass, street, wall, gate and quarter label — is on screen within 150 ms of the click on the reference machine (§12.1; a
CITY within 0.4 s and a METROPOLIS within 1 s, §12.5). The first paint is the finished city picture, never a partial
preview (§8.5). Defaults: the `ink` style with MFCG's raised under-copy on and the projected shadow off; walls on at
every rung (R6); first-level features at *auto*, drawn per seed from S0's feature-probability table and reported (§7.8);
coast or river by the site model's request defaults; curved quarter and district labels in IM FELL Great Primer (§17);
scale bar and compass; no questionnaire, no hidden state. Every improvement ships behind the defaults (R8): the fast
path never pays for the simulation module, projected shadows, relief, thumbnails or the advanced panel.

### Block S-5 — §1.4 (items MFP-8 units row, IMP-4 criteria, IMP-5 failure-policy criterion, IMP-13 gate sentence; MN-1; pipeline S-a rows for MFP-2, GEO-18, MFP-3, MFP-7, MFP-10, GEO-24; determinism LC-1 id wording)

=== REPLACE §1.4 Fusion thesis, stage by stage ===

### 1.4 Fusion thesis, stage by stage

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

The rule at every genuine conflict is the owner's DESIGN TIEBREAKER: the approach more faithful to how real settlements
are constrained and laid out — explicit constraints (terrain, water, defence, land use, access, growth) and precise
real-unit geometry with measurable statistics — with legibility and one-click use as a floor. Rows marked **TB** are
where it decided; rows marked "no TB" are where charm and evidence agree and it was not needed. Each criterion carries its
§15.2 class: **C** conformance (true once the rule is built), **P** parity with a measured reference number, **O** an
outcome the references do not reach.

| stage | MFCG-class approach (evidence) | FTG-class approach (evidence) | PLAT adopts | discards, and why (measurable criterion) | TB? |
|---|---|---|---|---|---|
| site: terrain, water | coast = 6-octave noise per cell, `sea` an angle; river = course search with 712 rejections and 21 canal restarts in 58 attempts, whole-city restart on failure (`_critic.md` C15; CONFIDENCE B3/B8) | water first, coast "in two arms", rivers that "may bend back", no terrain ("Mountains aren't properly supported yet", CONFIDENCE C1/C2/D8) | **new (O1)**: heightfield in metres + hydrology; rivers by descent; coasts/lakes/islands from one closed-outline routine; coast and contours agree by construction; water faces enter L0 with typed shores | MFCG's mesh-edge rivers (no bed, restarts) and FTG's border-touch typing — neither has a terrain constraint. Criterion: requested water features delivered by tier with 0 tier-6 omissions (O1 a, O); non-monotonic beds 0, contours cross water 0 (O1 b, C) | **TB** |
| units and frame | an internal unit of **4.00 m** (the SVG scale bar against the map group, three files: 3.9998 / 3.9998 / 3.9991 m); its GeoJSON export is already in metres (road width 8 in the JSON, 2 in the SVG) — `captures/mfcg/exports-sweep-2026-09-25/README.md`, redteam-mfcg MFP-8 | integer centimetres centred on (0,0), +y north (`_critic-ftg.md` F1, CONFIRMED) | FTG's convention | MFCG's internal unit (read only to measure its exports). Criterion: every parameter and export in metres (O6 a, C) | **TB** |
| centre and destinations | plaza = innermost cell; streets = BFS gate → plaza on cell edges; roads to a phantom point 1 000 units out (`os-model.md` §6 via CONFIDENCE B7) | initial-roads type at the origin, no destinations ("most of the settlements in FTG look similar", 112861635) | **MFCG's idea on FTG's substrate**: named destinations (market, gates, bridging points, harbour, external bearings), the plaza and castle reserved and the gate sites picked at S3, arterials routed between them over a cost surface in real metres | FTG's destination-less bloom. Criterion: through-roads at a destination 100 % (O4 a, C); detour ≤ 1.4 (O4 b, P) | **TB** |
| secondary streets | since 0.10.0 every non-arterial street is the district-wide twisted bisection of the merged ward polygon — a real, fully connected secondary network with mostly 3-valent nodes, cut inside a wall built first so the fabric inherits its shape (87882877; `profile-mfcg.md` §4.9 via redteam-mfcg MFP-2); the 2017 ancestor drew streets on cell edges | proposal-queue growth in stages, 15° per-vertex cap, half-step normal streets, prune/trim between stages (`ftg-docs-params.md` §2.2–2.5) | **by regime**: inside the walls S5 grows only district-scale secondaries that join the arterials (separation ≈ 120–250 m) and S8's recursive bent cut of each district polygon cuts every lane and intramural secondary; outside the walls **FTG's staged growth** along the main roads, destination-aware, curvature-continuous, with explicit legality thresholds FTG never states; the suburb regime by preset (§4.4) | FTG growth down to block scale inside the walls (the fabric would neither inherit the wall nor carry MFCG's signature); FTG's clamp-only wiggle (zero mass above 15°, `_critic-ftg.md` §4 row 7). Criterion: MFCG's street signature — lot-orientation coherence at 60 / 120 / 250 m and wall alignment by distance band inside MFCG's measured ranges (P, §13.5); no turn cliff and junction p5 ≥ 30° (O4 b, P) | **TB** |
| districts | grown from seeds around features with `validatePatch/validateEdge`, holes split (CONFIDENCE B9); live typing is feature-named | district = one growth lot typed from the remaining pool "and what the lot is next to"; 49 % of buildings in no ring (`_critic-ftg.md` F4/F13) | **MFCG's grower over FTG's objects**: districts are groups of coarse skeleton faces seeded at features, grown with arterials, walls and water as barriers, **feature-named** (market, gate, harbour, castle, temple, riverbank …), merged into **quarters** for city-zoom labels; the use mix comes from the roster's allocation and the prosperity field, with a mixed-use floor | FTG's one-lot districts (containment 53 %); class-typed wards MFCG itself dropped. Criterion: containment 100 % (O11 b, C); city-zoom quarter labels at MFCG's count per matched size and block-level use mix in band (P, §13.5) | partial TB |
| block fabric (lanes) | twisted bisection of wards into blocks and alleys; restart on "bad poly" (`_critic.md` C13; ST-8) | straight inserted roads to a target area (§2.5) | **NG's bent cut** with the measured signature (start at N(0.5, σ) of the OBB major axis, one bend at mid-course, ≥ 85° arrival; BG-2/BG-4, manager note 3) as a hole-aware kernel transaction with a bounded ladder; the district's class band as the stop law; the deep-interior choice (court, back lane, through-alley, rear plots) by band shares | FTG's straight roads (too regular); MFCG's restart. Criterion: K1/K2 within the measured spread (P); 4-way share per preset, organic 0–15 % (R3, P) | no TB — charm and evidence agree |
| blocks → plots | bisection lots + `filterInner` + `indentFronts`; lots painted as buildings | strips / centroid cuts / shrink-then-split; 441 m² in every class; no owner (`_critic-ftg.md` F17) | **new (O5/O18)**: per-frontage regions of each block, strips perpendicular to each frontage with party walls, typed residue, joins and splits from the prosperity field, alleys and back lanes where the band's deep-interior share says so | both references' cut-then-filter lots. Criterion: access edge 100 % (O5 a, C); streetwall continuity and footprint cover against MFCG's exports at the matched rung, direction declared (P, §13.5); within-district plot-area CV above its floor (O, §13.7) | **TB** — burgage plots were laid from the frontage |
| buildings | lots drawn as buildings ("the illusion of buildings"); Complex = rectangles; landmarks by `lir` | building = plot (Dense) or inset plot (Gaps); entrance 3 m from the road (C9) | **the owner's plot model**: parcel with 0..n footprints and a typed yard; site plan by class (row / compound / detached / hovel / institution / tents); heights on everything; entrance rule kept; landmark footprint templates in the base; the stage-3 generator behind the `outline` / `compose` interface (§2.6) | MFCG's global display switch; FTG's one-building-one-household lot. Criterion: O17 (a)–(i) | TB (owner ruling, metric tables) |
| walls, gates, castle | one ring on cell edges, built before the streets; `gates = N` exact; a tower on every non-gate vertex; castle = a cell with a 0.75 compactness repair loop (B5/B6) | wall = typed edge chain on the district ring after a stage; towers at 39 m median; no gate objects; castle fitted into its lot (C11/C12) | **FTG's staging + MFCG's gate identity and wall-first order**: gate sites picked and the castle and plaza reserved at S3; each enceinte traced from its stage's provisional boundary pulled to defensible ground *before* that stage's streets grow; gates exactly where arterials cross, exact N by MFCG's measured gate law; towers by rule; castle by score with the compactness gate as a shape check repaired by re-siting; several enceintes; an open waterfront by default; lifecycle for wall → road | MFCG's cell-as-castle and tower-per-vertex; FTG's ungated crossings. Criterion: O8 (a)–(h); walled share at MFCG's measured 0.87–0.92 (P, §13.5) | **TB** — defence as an explicit constraint |
| hinterland | farms as a ward type, `Cutter.grid`/`splitField`; forests "fill all available space" (the creator: "historically incorrect anyway") | main roads to the border, four farmland modes, farmsteads with driveways, hedgerows, reserves (C14–C16) | **FTG's contract + O14**: land use sized to population, field systems as presets (open-field strips, enclosed, FTG's hedgerows, the MFCG/VG sector look), farmsteads by their fields, woodland by distance, a context margin | MFCG's fill-the-leftovers. Criterion: O14 (a)–(g) | TB |
| content | population ≈ 6.12 × buildings, wards are "hints" (`_critic.md` C1) | roster first from a dependency graph; every building has occupants; people lazy (B1–B6) | **FTG's guarantee, two-way**: a sequential, prefix-stable roster from our own tables → an eager allocation to districts and blocks → placement onto plots → a bounded reconcile; people derived lazily | MFCG's multiplier. Criterion: O7 (a)–(h) | TB |
| determinism | one MINSTD stream, retry continues the stream (A2) | `seed: null`, server-side (A4) | **O2**: 128-bit-keyed sub-streams per (stage, entity lineage, concern, reroll, attempt, epoch); integer geometry; permanent lineage-hash addresses with anchors (§6.3) | both models. Criterion: O2 (a)–(e) | — |
| rendering | ink print, casing idiom, per-ward cache, no zoom ("a big flaw") | lit web map, merged geometry, tiers | **one semantic display list with LOD and paint programs on one drawing path** (Canvas2D the reference backend of every preset); ink default, lit second, hatched for stage 2 | each renderer's coupling of geometry to its drawing path; a second render path for the lit look. Criterion: O12 (a)–(g) | — |
| editing | 8 warp kernels, per-ward reroll, no save | layout editor, regenerate area, bulk edit, "cannot be undone" | **FTG's graph editing on our plat + MFCG's warp kernels**, all as events on permanent addresses with locality, dry-run validation and undo | nothing of substance; neither persists. Criterion: O9 (a)–(f), the MFCG asks as measured scenarios (O9 f, O) | — |
| labels | curved labels on skeleton spines, halo, legend | arced serif labels, 2 m / 5 ft grid, scale bar, no compass | **MFCG's spines made hole-aware and collision-checked, quarter labels at city zoom + FTG's furniture** | none. Criterion: O13 (a)–(h) | — |
| failure policy | whole-city retry incl. wards and geometry (ST-8) | server "gives up"; no fallback in the splitter | **MFCG's tiers minus the restart tier**: typed results, bounded ladders, substitution, and a report that counts every requested feature by delivery tier | both. Criterion: tier-6 omissions of requested features 0 and p95 time on MFCG's worst configurations (O1 a, O3 b, O); hard invariant violations 0 / 1 000 (C) | — |

Where a genuinely new mechanism replaces both: the site model (O1), the plat kernel (O3), frontage-first plots and the
granularity law (O5/O18), the prosperity field (O18), the plot/site-plan model with heights (O17), the greenery rule
family (O19), the semantic display list with paint programs (O12), the document and edit log (O9), the keyed stream
design (O2), the layer model.

**The fused layout, stated as a shape and with its rejected alternatives** (§4.4 has the mechanism): grown arterials
with partitioned blocks *and* a partition seeded from a grown skeleton are the same thesis at two granularities — the
backbone's faces are partitioned by bent cuts, and the cuts are promoted to ways of the same graph; inside the walls
the partition does the street work MFCG's does, outside them growth does FTG's. Rejected in writing: (a) MFCG-first (a
Voronoi cell mesh as truth, growth only outside the walls) — streets without geometry, roads that point at nothing, no
incremental growth without re-meshing; (b) FTG-first end to end (queue growth down to lanes) — the "vaguely circular"
look-alikes the creator names and the loss of the T-junction signature R3 requires; (c) an Urban Places-style quad base
mesh — geometry inherits the mesh resolution, which the precision tiebreaker forbids, and its construction is
unrecovered; (d) bent cuts as queue proposals — the recursion is what yields the measured statistics. The MFCG creator's
own warning that road-first plus block subdivision "seems problematic" (devlog 31287) is the risk the fusion gate O4 (f)
guards — measured at M0 on a flat site and again at M1 on B-CITY-lite's river, coast and relief configurations with the
reordered stages (§16).

### Block S-6 — §1.5 (pipeline S-a for FTG-4, LC-12; DEF-8's staged status)

=== REPLACE §1.5 Incremental growth (the evolution hook, answered by the thesis) ===

### 1.5 Incremental growth (the evolution hook, answered by the thesis)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

A growth-based backbone extends natively. An epoch is a logged event that runs the main-road step on the persisted
network (S4 re-routes to new destinations, reusing existing streets through their low crossing cost) and then one more
growth stage, whose provisional boundary is traced as the next enceinte before its streets grow — on the persisted plat,
with the epoch component of every stream key (§6.1, §4.11). The partition side runs inside coarse faces, so it extends
by re-deriving only the faces the epoch touches. Everything that survives an epoch changes only through explicit,
logged transformation events — conversions (wall → ring road, gate → junction, outskirt → district) and, for decline,
demolition, abandonment, ruin and a shorter wall ring — each a typed plat operation that re-types edges and faces and
re-derives their finer levels locally; nothing that survives is re-rolled. The evolution engine that schedules epochs
from circumstances is staged by the owner; its interfaces (`EpochInputs`, `EvolutionStrategy`, the `ConversionOp` kinds
including decline) are concrete in §4.11. The base builds and tests exactly one incremental path — add a growth stage to
an existing town, with wall → ring road — at M4 (§16).

### Block S-7 — §1.6 (COV-VG-WC4, COV-VG-VN-002 via pipeline S-a; COV-VG-VN-088 ceiling)

=== REPLACE §1.6 Stage 2 and the village in one paragraph each ===

### 1.6 Stage 2 and the village in one paragraph each

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

*Stage 2.* A district is a group of skeleton faces whose boundary edges are typed (shared street with centreline,
width and class; wall with gates; quay or bank; field; cliff; sky) and which carries a `SeamContract` from milestone 1.
Stage 2 opens a district as an NG-class close-up by running a `FabricStrategy` (the base's bent cut, or NG's ring /
square / street templates) inside that boundary at neighbourhood LOD; seams are exact by construction because both
sides read one shared edge; fields are continuous across soft seams. Details in PART II.

*Village* (a separate product staged by the owner). It needs a one-road backbone with partial driveways, detached-in-yard
and farmstead site plans, a density field computed before its roads, a palisade built before its roads, and its own
ladder THORP → HAMLET → VILLAGE whose ceiling, 1 500 inhabitants, is the base's floor (§1.1). The base carries each hook
now: the pipeline is the topological order of declared stage inputs and outputs, so a village registers its density
stage and its palisade (`EnceinteStrategy`) ahead of its network (§4.1, §4.12); every `NetworkStrategy` receives the
traced enceintes as an input; the strategy registry admits a tracker-steered network and a "houses along ways" fabric;
a village is modelled as **one district** of kind `village`, so the containment invariant building ⊂ plot ⊂ block ⊂
district holds unchanged; the class tables include cottage / farmstead / detached; the hinterland model is shared.
PART III lists the hooks.

### Block S-8 — §1.7 (kernel S5 for GEO-9 / DEF-13; rendering §1.7 rows for VIS-7, DEF-6, GEO-29, DEF-12; IMP-1 repository row; IMP-14 `dmath`; SCL-6 handle API)

=== REPLACE §1.7 Tech stack (reasons; no dependence on any existing project) ===

### 1.7 Tech stack (reasons; no dependence on any existing project)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

| choice | decision | why | rejected |
|---|---|---|---|
| language | **TypeScript** (strict), ES2022 modules, no DOM in model packages | browser-first embeddable library (owner D-4); one language for kernel, pipeline, renderer and app; the reference evidence is JavaScript-shaped (call censuses), so budgets transfer | Rust → WASM core (two languages, slower iteration while constants are still tuned by eye and corpus); a WASM kernel — none: a measured hot loop may get a byte-identical WebAssembly accelerator behind the kernel façade (§3.7); Haxe (the references' tool, no advantage); C++/CGAL desktop (GPL, not browser-first) |
| runtime targets | browser: main-thread UI, **one generation worker** plus a **derivation pool** of up to three workers for the per-district stages (§4.1, §12.3) and a **tile worker** (§8.9), behind a handle-based API (§11.2); Node 24 LTS (CLI, tests, research-side baseline scripts, headless goldens; the CLI's PNG export uses `@napi-rs/canvas` as an optional dependency); an embed bundle (ESM or iframe) | the headless API reproduces the UI's model hash (O11 f); B-CITY runs without a browser | server-side generation (FTG's 3–7 s round trip is the thing to beat) |
| numeric core | integer centimetres in `Int32Array` arenas; exact `orient2d` in doubles under a derived range bound; `robust-predicates` for `incircle`; **booleans, buffers and bands built on the kernel's own arrangement — one engine on every host** (§3.7), with Clipper2 and `polygon-clipping` as CI oracles only; `dmath`, our own TypeScript port of the fdlibm 5.3 routines the model needs (§17) | integers remove float non-determinism and epsilon geometry (FTG's own lesson); one engine means one hash on every host (GEO-9) | doubles with epsilons (the references' whole failure class); exact rationals everywhere (10–100× slower); a runtime boolean fallback (a second engine with different hashes) |
| rendering backends | **Canvas2D — the reference backend of every preset including `lit`**, with a world-aligned tile pyramid (§8.8); **SVG** (layered, ids preserved); **PNG and print** by band-streamed tiles at any DPI; WebGL2 only as the pre-decided tile-compositor fallback (§8.9) | one drawing path keeps screen, PNG and print identical (O12 c) and avoids the duplicate render path both creators warned about; MFCG proves per-group caching keeps 46 000 fills at 590 uploads; NG proves per-primitive canvases do not | three.js as the primary (textures and lighting are one *style*); WebGPU-only (too new for the embed target); a WebGL2 reference backend for `lit` (a second drawing path) |
| text | Canvas2D label tiles from the bundled OFL fonts; widths from the fonts' own metric tables, parsed by our code (§9.2); no SDF text | the same glyph positions on every output and in every engine | the host text engine for metrics (engines shape differently) |
| build and test | pnpm workspaces monorepo, `tsc` project references, `esbuild` for library bundles, Vite for the app, `vitest` + `fast-check` property tests, Playwright visual regression with `pixelmatch` / SSIM, axe-core for accessibility, a `bench/` package that runs B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM in the three CI tiers of §13.8 | conventional, permissive (axe-core is MPL-2.0 and dev-only), fast | — |
| data | rule tables, presets, style sheets and the rung profiles (`ladder.json`, §1.1) as versioned JSON with a schema (`zod`) and `{value, unit, provenance, calibratable}` per cell | everything editable; corpus calibration through §13.9 | — |
| persistence | a self-contained `.plat` document (JSON manifest + binary blocks); no hosted service — for multi-client use the host is the store (§11.3, §11.5) | O9; embedding needs no backend | a sync service of our own |
| repository | the product lives in its own repository, `plat/`, at the root of this folder, outside `research/`, `captures/` and `reference/`; a CI path rule fails any import, fixture or script path that resolves outside `plat/` (§17) | the clean room (D-29): the product can never read reference material by accident | the product inside the research tree |
| dependencies | permissive licences only, checked over the transitive production closure, pinned exactly and credited in a generated notices file (§17); every third-party routine behind our own adapter | clean room, swap-ability and an open licence choice for the owner (D-22) | — |

### Block S-9 — §13 plain words and §13.1 (items GEO-12, SCL-18 pointer; kernel S8; determinism S-3)

=== REPLACE §13 Testing and verification (the *In plain words* paragraph under the §13 heading) ===

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

*In plain words.* Five test benches run in continuous integration, in three tiers — a quick one on every change
(minutes), a full one every night (hours) and the largest runs at every milestone: random and deliberately awkward shapes
thrown at the geometry kernel (it must never crash or hang), a thousand towns per size and water setting (every rule
checked), up to a hundred thousand scripted edits (nothing lost, nothing overlapping, nothing outside the edit changed),
fixed "golden" seeds whose fingerprints must not change unless a release says why, and measurements of our towns against
numbers we measured from the references — read from one numbers-only file, never from the captures themselves. Every
acceptance number says what kind of evidence it is; the owner judges side-by-sides through a written, blind protocol;
every threshold has a number today and a stated way to confirm it.

=== REPLACE §13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===

### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

Every kernel primitive is fuzzed with two input families, held to one bar — **0 crashes, 0 hangs (hard timeout), 0
invalid outputs** — at the sizes of §13.8's tiers.

1. **Random inputs** (`fast-check`): concave, holed, thin, near-collinear, snapped, duplicated-vertex, ≥ 300-vertex and
   zero-area polygons and chains.
2. **Constructive degeneracies (GEO-12).** Random sampling almost never lands on an exact degeneracy — a line across a
   2²⁴ frame holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with probability
   ≤ 2⁻²⁴ — so every degenerate class is built on purpose from random parameters:
   * lattice points exactly on a segment, placed by gcd stepping (`p₀ + k · d / gcd(dx, dy)`);
   * collinear triples and collinear overlapping edges (shared runs from 1 cm to the whole edge, same and opposite
     direction);
   * cuts through a vertex and cuts grazing a reflex vertex (through it, and offset by 0 and ± 1 lattice unit);
   * antennae (chains dangling into a face) and chains touching a boundary at one point;
   * coincident typed chains — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field
     boundary;
   * rectangles, squares and regular n-gons (n = 3 … 12) rotated by random angles and snapped to the lattice;
   * holes touching the outer ring at a vertex and along an edge, and holes touching each other;
   * simultaneous skeleton events (regular polygons, equal-sided rectangles, symmetric notches);
   * values exactly on quantisation boundaries (half-centimetre ties before snapping; ± (2²³ − 1)) and values `snap`
     must refuse (± 2²³, NaN, ± ∞).

**Properties** (checked after every operation): output simple; nesting by index (every face inside its parent); no
edge shorter than `minEdge` from any writer and clearance ≥ `minEdge`; Euler characteristic after every insertion;
`remove(insert(x)) ≡ id` on the topology; **`splitFace` children tile the parent exactly at the child level (integer
`area2` equality)**; `mergeFaces ∘ splitFace` restores the ring and the id; `corridorUnion` faces disjoint and covering;
`offset(−d) ∘ offset(+d)` ⊆ original and `insetFace` empties monotonically; **every straight-skeleton output passes the
§3.8 validator — a connected graph inside the face whose number of independent cycles equals the number of holes — or is
a reported downgrade**; OBB contains the hull and collinear input returns `E_DEGENERATE`; LIR inside the face; snap
rounding idempotent and terminating within its bound; the `orient2d` sign equal to a BigInt reference on adversarial
triples; Poisson minimum distance ≥ r; differential agreement with the CI oracles (Clipper2-WASM in Node,
`polygon-clipping`) on booleans and buffers (§3.7); roles preserved on coincident chains (a sliver between a spine and a
shore keeps both); a batch's result identical under any permutation of its ops; `clearFiner` after a refinement restores
the coarser level exactly; mandatory chains never rejected for precision; 0 stale references after every batch; save →
load → save byte-identical (§3.9); a 3 000 m relief fixture stores without a clamp and D8 is defined on 100 % of land
cells; every routine returns a typed result on the pathological corpus.

**Ladder coverage (G-R9):** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial
axis, the plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; a
skeleton failure is never a crash and never a visual surprise.

### Block S-10 — §13.2 (items SCL-19, SCL-21, IMP-16, COV-FTG-A25; determinism S-4; kernel S9; pipeline S-c; rendering §13.2)

=== REPLACE §13.2 Per-stage invariants, cost-model tests, contract tests ===

### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants in the harness — on B-CITY (1 000 seeds × 4 water settings × 3
  rungs in the nightly tier; 50 seeds per rung in the PR tier, §13.8). Each invariant has an id, a severity, a count in
  the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band. The **digest-maintenance oracle**
  checks on every B-CITY-lite city that the Merkle digest maintained batch by batch equals a full recompute (§6.2).
* **The statistics record, split (SCL-21).** The **core record** is O(n) and is emitted by every generation within
  4 ms at CITY (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and
  band of plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram;
  turning per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests (SCL-19).** Each stage is timed on **six sizes** — 1 500, 5 000, 10 000, 20 000, 50 000 and 120 000
  inhabitants, five seeds each (nightly) — and its log-log slope of time against its declared work measure (the `Stage`'s
  `workLimits`, §14) must not exceed **1.15** for a stage declared linear and **1.25** for one declared n log n; §12.3's
  per-rung cost laws are fitted on the same runs. **Per-edit cost against model size:** a fixed scope — one plot edit, one
  block reroll, one district regeneration — costs the same at TOWN, CITY and METROPOLIS within ± 20 % (§12.6), and so
  does per-edit validation (§5.3). **Index work** is fitted against commits × level size (§3.3). A **memory test** per
  rung uses §12.8's definition; a **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9). All timings
  are normalised by §12.1's calibration score.
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3 (G-P10); §6.5's determinism tests run beside them (time dilation
  × 10 and × 0.1, the derived-complete digest over three district orders, replay = session, the host-provider double run). S8's working block equals S9's
  committed block (Hausdorff 0; §3.7).
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0
  untyped loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback;
  attached and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)`
  for P₂ > P₁ on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed`
  fixture (≥ 3 closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 %,
  walled share in band); the derived-complete digest identical across district orders; opening a person leaves the
  digest, the log and the undo stack unchanged.
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iv) runs **once per sequence** — at its end and at one seeded
  random position — never per edit (SCL-18). Fixtures: the re-parenting set (`drawBoundary`, district merge and split,
  `outskirtToDistrict`, regenerate around a lock, the id-recycling case); terrain-brush and river-control-point
  sequences; table weight edits and row insertions; drawn features mixed with later attribute edits; epochs and rebases;
  the B-EDIT-lite identity fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); and **the thirteen MFCG
  asks of §7.4 as scripted scenarios (IMP-16)**, each reporting its locality share (entities outside the effective scope
  byte-identical), its invariant results and its re-run cost against §12.6.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage (COV-FTG-A25).** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`);
  every in-app help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

### Block S-11 — §13.3 (item LC-19; determinism S-5 for LC-3, LC-25)

=== REPLACE §13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9) ===

### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

A golden suite of 12 seeds × {TOWN, CITY, METROPOLIS} × {none, coast, river, coast + river} stores, per stage, its
**stage-isolated digest** (the stage's new code run on the previous output version's frozen upstream outputs, §6.4), its
entity counts, the core statistics record and one PNG per LOD and preset. A release either matches or declares:

* a **shift record** for every stage whose isolated digest moved — the stage, the cause (a rule-table change, a fix, a
  new concern), the seeds and statistics that moved, the expected direction, and the output version the release creates;
* a **cascade record** for every end-to-end golden it re-signs, listing each downstream stage that moved and showing,
  from the isolated goldens, that each moved only through its inputs; a downstream stage whose isolated digest also
  moved needs its own shift record, so an unrelated regression cannot ride on an upstream shift.

An undeclared move fails CI; only declared stages are re-signed; stages untouched by a release stay byte-identical
(O2 e). A same-seed output change is never let ride silently (owner non-negotiable 10).

**From M1 (LC-19).** The output-version stamp, the shift and cascade records and the stage-isolated golden tooling are
built at M1, not at hardening (§16). Every milestone from M1 on files its declared shifts in its exit record
(`docs/validation/shifts/<milestone>.md`: each output version created, its shift records, and which seeds of the D-5
panel of §13.6 changed), and a milestone cannot exit with an undeclared shift. **Preview links:** until M4's exit fixes
output version 1, every permalink and document made by the app is marked *preview* — the app shows "preview: made with
output version oN; a later release may draw this seed differently and will say so" — and the link carries its `o=`
(§6.4). Retention of output versions N−1 and N−2 (§6.4) is built and its replay test passes at M3a; from then on a link
inside the window replays exactly and one outside it opens with §6.4's notice.

A nightly cross-platform golden run (Node x86 / arm64, Chromium, Firefox, WebKit; workers on and off; pool sizes 0 and
3) is the reproducibility proof.

### Block S-12 — §13.4 (items COV-FTG-A24, IMP-11; rendering §13.4 for MFP-1, VIS-1 – VIS-5, VIS-14)

=== REPLACE §13.4 Visual regression and B-ZOOM ===

### 13.4 Visual regression, B-ZOOM and the app harness

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

* **Visual regression.** Playwright renders the golden suite per preset, LOD and backend; SSIM / `pixelmatch` against
  the stored PNG with a per-preset threshold; the draw-style census of §8.3 per preset; a "no fills" and a "no outlines"
  render must remain legible (R13).
* **B-ZOOM** (1:50 000 → 1:500, the default view of every rung): legibility floors and no feature popping more than once
  (footprint hash identical across bands); §8.3's checks — hairline fidelity, decoration stability, role continuity
  across band switches, no tree mark over a tier-1/2 casing, no casing pixels in junction mouths, the contrast matrix on
  the rendered city band; §9.4's label checks — floors, at least min(12, the number of districts) area labels on the map,
  0 collisions at settled views and through a scripted zoom sweep; §8.5's figure-ground metrics — street-edge
  recoverability against MFCG's value on its matched plain sweep renders, access-critical ways drawn ≥ 95 %.
* **The app harness** (Playwright, the reference machine of §12.1):
  * **Scripted tasks (O16 c; IMP-11)** — share a view link, export a layered SVG, change the coast side, see five
    variants of one kind, recover from a mistaken regenerate, measure a street with the ruler, find a named building
    through the gazetteer: each passes when it completes in the stated number of UI actions (one action where a
    reference needs a detour; recovery = one undo) with every app response ≤ 1 s, run on every PR.
  * **Accessibility (COV-FTG-A24)** — axe-core on every screen and panel of `@plat/app` reports 0 serious or critical
    violations; every control is reachable and operable by keyboard alone in a scripted run with visible focus; every
    scripted task above also passes keyboard-only; the gazetteer list and search and the "features in view" list reach
    every building, plot, district and pinned person without the canvas.
  * **Input scheme** — every binding of the default `keymap.json` (§14) fires its action while the map has focus and
    none fires while a text field has focus; a user-edited keymap round-trips through save and load.

### Block S-13 — §13.5 (items MFP-8, COV-NG-OBS3, FTG-15, COV-VG-VN-010, MN-2, IMP-1 (b), IMP-4, IMP-5, IMP-12, IMP-15, DEF-1; pipeline S-b; rendering §13.5; GEO-3's ladder-use row)

=== REPLACE §13.5 Reference-parity metrics computed against our captures (B-REF) ===

### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

The `parity` CLI in `@plat/testkit` reads **only** `baselines.json` — our own measurements of the references, numbers
only, generated research-side by scripts under `research/baselines/` from the captures and committed into
`plat/packages/testkit/baselines/` (§17, D-29) — and our B-CITY outputs, and reports every metric against its band. It
never opens `captures/`, `research/` or `reference/`.

```ts
interface Baseline {
  id: string; metric: string; unit: string;
  reference: 'MFCG' | 'FTG' | 'NG' | 'VG' | `corpus:${string}`;       // corpus rows arrive through §13.9
  referenceBuild: string;            // itch build, FTG server date + create-request hash, NG / VG build — required (COV-VG-VN-010)
  capture: string; script: string; date: string;                       // provenance: capture folder, research-side script, run date
  matched?: { rung: Rung; mfcgSize?: number; ftgSize?: 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS'; population?: number };
  role: 'target' | 'weakness' | 'descriptive';                        // what the reference number means for us (FTG-15)
  values: { p10?: number; p50?: number; p90?: number; n: number; seeds: number } | { bins: number[]; histogram: number[]; n: number; seeds: number };
}
```

The CLI refuses a row without `referenceBuild`, `capture`, `script` or `date`. A new reference build never overwrites a
row: it adds a row (the id gains the build) and is a **declared baseline shift** in the milestone's shift record, so a
silently drifting reference build (VG changed geometry for the same seed between builds 19251041 and 19365073) can
never move a gate unnoticed. Rows hold numbers, units and provenance only — no names, colours, grammars or code.

**The band rule (DEF-1; IMP-6).** Every band below has a number and a provenance now. *Target* rows pass when ours lies
in [p10 × 0.9, p90 × 1.1] of the reference's seed spread (a single-value baseline: ± 15 %), and distributions when our
KS distance to the reference is ≤ 1.25 × the reference's own seed-to-seed KS distance at p90. *Weakness* rows are
one-sided: ours must beat the reference in the declared direction by the stated margin. *Descriptive* rows are reported
beside ours and gate nothing. The bands below are this rule applied to today's baselines; when M-1 re-measures a
baseline (five seeds per matched MFCG size, FTG's new captures), the band is recomputed by the same rule with provenance
"M-1 ⟨date⟩", and a recomputation that turns a passing gate into a failing one is declared in the shift record.
Thresholds no reference can set are §13.7's.

**Matched sizes (MN-2; §12.2, §13.6).** TOWN ↔ MFCG size 40 and FTG BIG_TOWN; CITY ↔ MFCG size 80 and FTG BIG_CITY;
METROPOLIS ↔ MFCG size 130 (FTG per D-31). MFCG numbers come from its plain-option size sweep (walls, citadel, plaza and
temple on; shanty town, parks, river and coast off; its JSON export is in metres, the internal unit 4.00 m). **Curves
(FTG-15)** are measured after both sides are resampled at a 10 m arc-length step, so neither FTG's 25–40 m placement
steps nor PLAT's smoothed vertex spacing enters a number.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| street turning | turning per 100 m; heading change per 50 m (10 m resampling) | FTG: zero mass above 15° per step and a flat heading spectrum (`_critic-ftg.md` §4 rows 7–9) — **weakness**; FTG's turning per 100 m after 10 m resampling, measured at M-1 on its payloads — descriptive | no cliff (no empty bin above 15° while the bin below it holds > 1 %); organic presets' turning per 100 m within 0.5–1.5 × FTG's; heading entropy ≥ FTG's | P |
| growth drift | net turn of grown streets over 600 m (organic regimes) | — (our heading model, §4.4) | p50 15–30°; > 90° on ≤ 1 % | C |
| junction arm angles and degrees | every L1 junction | NG 361 / 361 T — **target** for organic presets; FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — **weakness** for organic presets, **target** for `ringed` and `american` | median 85–95°; p5 ≥ 30°; 4-way share organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % (FTG-6) | P |
| street runs by class | junction-to-junction run lengths per class (never edge lengths) | FTG main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m, lot outlines 14.70 m (roadlength100 README) — **target** for the extramural ribbon and suburb regimes, descriptive inside the walls | class medians by the band rule (extramural, suburb) | P |
| MFCG street signature (MFP-2) | lot-orientation coherence R4 within 60 / 120 / 250 m; lot alignment with the wall by distance band; T / Y share; intramural dead ends; blocks per ha; lots per block | MFCG R4 0.84–0.97 / 0.58–0.88 / 0.32–0.68; within 40 m of the wall median deviation 3.5–4.5° and 84–92 % within 15°, 56–70 % at 40–100 m, 38–58 % at 100–200 m (redteam-mfcg MFP-2, from the exports); lots per block from the sweep — **target** inside the walls | the band rule, walled districts | P |
| blocks | L2 built-block areas per district | NG block counts per template at `medium` (vertex captures) — **target** on the same face shapes; FTG block-lot median 441 m² in every class — **weakness** (no gradient) | KS by the band rule; inside the NG band on the same face shapes (O4 f) | P |
| deep block interiors (IMP-8) | court share of deep blocks per band | NG hollow-block frequency (vertex captures); MFCG inner-lot removal (sweep) — **target** | the band rule per class (§4.6) | P |
| bent-cut signature | infill and lot cuts | NG: start at N(0.5, σ) of the OBB major axis with σ 0.066 (plain faces) and 0.098 (ring faces); one bend at mid-course in 380 / 519; ≥ 85° arrival in 96 %; 53 % filleted (BG-1 / BG-2 / PF-3; manager note 3) — **target** | σ within ± 0.02; corner within 0.10 of mid-course ≥ 80 %; arrivals ≥ 85° ≥ 95 % | P |
| figure-ground and streetwall (MFP-1; plot texture, IMP-4) | city-band street-edge recoverability; gross footprint cover inside the walls; streetwall continuity on dense frontages | MFCG recoverability on its matched plain sweep renders — **target**; MFCG gross cover inside the walls 0.60–0.64 at sizes 40–130 — **descriptive, direction declared**: ours lower because yards exist; MFCG streetwall continuity on the same frontage classes — **target** | recoverability ≥ MFCG − 0.03; cover reported (expected below 0.60); streetwall ≥ MFCG's on dense frontages | O |
| plots and footprints | L3 plot areas; L4 footprint areas and sides | FTG footprint median 103 m², p95 154 m², quad side 10.3 m, worst-corner p95 22.9° — **target** for ordinary houses; MFCG footprints (median 225–289 m² at sizes 40–250 in metres) are **lots drawn as buildings — descriptive, never a house-size anchor** (MFP-8) | ordinary houses median 60–160 m², p95 < 400 m²; a sheared minority kept | P |
| entrance rule | L4 | FTG: on the outline, 2.99 m from the road; 53 % of buildings with a vertex ≤ 2 m from a road — **target** | 100 % on the access edge, 2–4 m | P |
| party walls and attachment | row classes | NG 39–43 % of perimeter, 95–99 % attached — **target** for dense / poor; FTG residences 0–5 %, industry 96–98 % — descriptive | attached ≥ 90 % in dense / poor; party-wall share by the band rule per class | P |
| plot-area gradient | Spearman(prosperity, plot area); Moran's I; within-district plot-area CV | FTG 441 m² in every class; NG Moran's I −0.04 … +0.03 — **weakness** | ≥ 0.8 and > 0 (both follow from the rules: C); within-district CV ≥ 0.25 (§13.7: O) | C / O |
| alleys | alley length per ha by prosperity | FTG 0 alley length at every decile — **weakness** | Spearman ≤ −0.7 | C |
| vacancy runs (COV-VG-VN-170) | share of frontage length in vacancy runs, per band | — (our rule; VG's partly ringed blocks are the motive) | within ± 0.02 of the granularity table's share per band | C |
| quays and substitution | quays reachable from the network; blocks left as substitution residue (F-CUT tier 5) | — | quays reachable 100 %; substitution residue ≤ 5 % of blocks | C |
| walled share and ribbons (MFP-6) | buildings inside the outermost wall; extramural buildings within 100 m of an arterial | MFCG 0.87–0.92 at sizes 40–250; 71–85 % (sweep) — **target** | the band rule | P |
| MFCG anchors (MFP-8) | district areas; wall vertex spacing; castle area and compactness; plaza area; city-zoom quarter labels | MFCG district areas 2.4–17.6 ha at size 40 and median 29 ha at size 80; wall vertex spacing p50 88 m at size 40; castle 0.5–3.2 ha (8.7 at size 130); plaza 0.32–0.58 ha; 9 / 12 / 18 districts at sizes 40 / 80 / 130 (sweep) — **target** | the band rule; castle in band on ≥ 99 % of seeds | P |
| outline anisotropy (FTG-5) | land-sector r90 CV; road / non-road r90 ratio | FTG 0.20–0.33 and 1.26–1.65 (both CITY payloads) — **target** for organic presets | the band rule; monotone in the anisotropy row | P |
| block-level use mix (MFP-7) | residential-only block share; per-block use-mix entropy; trade households at their workplace | MFCG's "venue mix with residents, no residential wards" — descriptive | §13.7's bands | O |
| towers and gates | S7 | FTG 39 m median spacing, 17 / 17 towers on ring vertices — **target**; FTG 6 and 2 ungated crossings — **weakness**; MFCG 5 / 8 / 12 gates at sizes 40 / 80 / 130, `gates = N` exact — **target** | spacing by the band rule; ungated crossings 0; N exact; roads leaving each walled stage = N | P |
| water | L0 | FTG 50 m resampling, rivers ≈ 31 m mean at CITY — **target**; MFCG `riverWidth` in metres (142 m at size 200 with river and coast) — descriptive | outline step ≤ 25 m; width band by class | P |
| tree scatter | §8.10's stamped instances, in the bench | FTG nearest-neighbour median 9.7 m, minimum 0.14 m (not Poisson) — **weakness**; MFCG / NG Bridson k = 50 with a 140-point tile — **target** for the sampler | NN p1 ≥ §13.7's canopy threshold; pair-correlation per class reported | O |
| population and buildings | totals | MFCG ≈ 6.12 persons per building (a multiplier) — **weakness**; FTG 3.4 — descriptive | requested population within ± 5 % on ≥ 95 % of seeds; the ratio reported | C |
| generation time (MN-2, MFP-5) | model p95 and time to first map per rung (§12) | MFCG app timings 57 / 131 / 156 ms at sizes 40 / 80 / 130 — descriptive with §12.9's declared trade; FTG CITY: server 2.9–3.2 s, scene 6.4–7.0 s after the click, load 2.0 s busy — **weakness**; NG hood 10–96 ms — **target** for opening a district | §12.3 / §12.5 budgets; model ≤ 2.5 × MFCG at TOWN and CITY and ≤ 5.5 × at METROPOLIS; first map ≥ 10 × faster than FTG at CITY | P |
| MFCG-worst configurations (IMP-5) | wall-clock p95 per delivered town, ladder costs included: METROPOLIS with river, coast, walls and castle | MFCG size 80 with river and coast: 10 attempts for 3 cities, 3.7–4.0 s (IMPROVEMENTS O1); 24 restarts in 58 attempts — **weakness** | ≤ 1.0 s per delivered town | O |
| requested-feature delivery (IMP-5) | the report's delivery tier per requested feature | MFCG: a requested river fails 7 of 10 attempts at size 80; VG: 4 of 13 highway maps discarded — **weakness** | tier-6 omissions of requested features 0; degraded (tiers 4–5) ≤ 5 % (§13.7) | O |
| ladder use | the report | — | tier ≥ 2 on ≤ 2 % of transactions per stage; p99 ≤ 3 attempts | C |
| draw style (IMP-15, VIS-16) | the display list and renders against the draw records | MFCG: casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order; wall, tower and road-core widths 6.2 / 12.4 / 6.5 px at size 40's scale — **target** (`ink`); NG square caps, ≈ 17.4 hatch triangles and 2.33 shadow quads per wing — **target** (`hatched`); NG roof dark / light ratios 0.787 / 0.802 / 0.834 and VG water bands 5.196 : 2.828 : 1 — **descriptive** (they are their palettes' values; the laws are tested on ours, §8.3) | `ink`: casing law on 100 % of ribbons, round joins ≥ 99.9 %, order parity as §8.3 defines it, widths ± 15 %, outline share ≤ 25 %; `hatched`: 15–20 triangles per wing, no ridge stroke, outline = footprint; the roof law on our palette within ± 0.02 and our bands W · (i / N)^1.5 within 1e-4 | P |
| labels | protected overlaps; inside-area share; curvature; holes; count | MFCG: gates and the keep covered, walls straddled — **weakness**; MFCG district counts (the anchors row) — **target** | 0 / ≥ 99 % / within §13.7's curvature limit / 0 labels crossing holes / the anchors row | O |
| between-seed variety (IMP-12) | dispersion of the §7.7 signature vector (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed share, outline anisotropy) over 100 seeds per rung and water setting: mean pairwise distance of vectors standardised by the rung's pooled deviations | MFCG over its plain sweep seeds at the matched size; FTG over every payload at the matched size — **target as a floor** | ours ≥ the larger reference dispersion at the matched rung | O |

### Block S-14 — new §13.6–§13.9, inserted after §13.5 as Block S-13 renames it (items IMP-4, IMP-6, IMP-11, SCL-18, FTG-16, MN-2, DEF-1, DEF-9, AM-7's D-5 clause)

=== INSERT AFTER §13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file ===

### 13.6 The owner's side-by-side protocol (D-5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

"Mastered" means the owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, plus the measured
parity numbers (D-5). This protocol makes the eye a recorded, repeatable judgement that cannot be steered by choosing
flattering seeds.

1. **When.** At M1 (diagnostic: the base is not yet complete, so the result is recorded and does not gate), at M2b (gates
   "the base at parity"), at M4 (gates "mastered") and at M5 against NG (gates stage 2, and replaces S2's blind preference
   test with n ≥ 20 raters, which the program has no pool for; IMP-11).
2. **Seeds fixed before rendering.** Five seeds per rung and per water setting (none; river + coast), each
   `H32("d5/⟨milestone⟩/⟨rung⟩/⟨water⟩/⟨i⟩")`, committed to `docs/validation/d5/⟨milestone⟩/seeds.json` before any render;
   no seed is replaced after it is rendered. MFCG seeds are derived the same way and rendered with its plain options (river
   and coast on for the water pairs).
3. **Matched pairs.** Each pair shows PLAT and one reference at the same rung, the same ground scale (metres per pixel)
   and the same frame. Against MFCG, PLAT's population is set so that its building count matches MFCG's at the matched size
   (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at FTG's population (BIG_TOWN ≈ 5 600, BIG_CITY
   24 500; METROPOLIS per D-31). PLAT draws `ink` against MFCG's default style and, from M2b, `lit` against FTG's default
   (`ink` at M1). Against FTG, one pair per seed shows the extramural suburb at FTG's overview framing (VIS-3).
4. **Blind order.** Generator-identifying furniture is removed from both sides (titles, legends, compasses, interface
   chrome) and the blind pairs are rendered without labels; labels are judged in a separate, non-blind pass. Left or right
   is a seeded coin per pair and the pair order is shuffled; the key is stored sealed in the record and opened after the
   answers.
5. **The rubric** — three questions per pair, each answered *left*, *right* or *same*, with an optional one-line note:
   (1) *Legibility:* which lets you read the town — its streets, walls and quarters — more easily at this size?
   (2) *Realism:* which looks more like a real medieval town? (3) *Charm:* which would you rather use for a game or a
   story?
6. **Pass rule.** For each reference and each question, PLAT is judged better or the same on at least two thirds of the
   milestone's pairs, and on no rung is PLAT judged worse on every pair. A gating milestone whose run fails a question does
   not exit until a re-run passes or the owner accepts the failure in the record; the failing question and the owner's
   notes enter `known-defects.json`.
7. **The rater.** The owner is the declared rater. If the owner has not rated within seven days of the panel being ready,
   the milestone proceeds on its measured numbers, the protocol result is recorded as *not rated*, and the same panel is
   offered again at the next milestone; no seat rates on the owner's behalf.
8. **The threshold panel.** At the same sitting the owner sees the strips of §13.7 (renders of one seed at a threshold's
   number and one step either side) and picks one or answers *same*; the pick becomes the threshold with provenance
   "owner-eye ⟨milestone⟩".
9. **Record and clean room.** The panel is assembled research-side (`research/d5/`) from PNG exports that the product's
   CLI writes and from the reference images in `captures/`; the product repository never reads the captures (§17). The
   record `docs/validation/d5/⟨milestone⟩.md` holds the seeds, image hashes, the sealed key, the answers and notes, the
   pass or fail per question and the threshold picks.

### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

Every threshold is in one of two classes and there is no third. **Reference-settable** bands are §13.5's, set by its band
rule from `baselines.json` (J-T applies to them). **Thresholds no reference can set** — the properties the references
lack, which is where the base claims to improve — are listed here: each has a number now (provenance "architecture
2026-09-25"), is confirmed at the first milestone at which its mechanism runs, and has a pre-decided fallback. The
corpus phase may later re-sign any of them as a declared shift (§13.9).

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| O18 (i) smooth field | p99 of \|∇P\| ≤ 0.5 per 100 m of the normalised prosperity field, outside hard seams | M2b: B-CITY measurement, and a §13.6 strip at σ = 45 / 60 / 90 m | σ rises one step (60 → 75 m) and the measurement repeats; an owner pick of σ replaces the number with that σ's measured p99 |
| O18 (j) plot-size variety | within-district plot-area CV ≥ 0.25 for districts with ≥ 30 plots | M2b | the granularity rows' frontage CV rises from 0.25 to 0.35; if still failing, the floor becomes the measured p10 and the gap enters `known-defects.json` |
| O18 (h), O7 (f), S3 soft seams | across soft seams: Δ median frontage ≤ 25 %, Δ median plot area ≤ 35 %, Δ median storeys ≤ 1 | M2b | the fields' seam smoothing radius doubles; if still failing, the band becomes the measured p95 + 5 points |
| O19 (d) canopy | tree nearest-neighbour p1 ≥ 0.5 × the class's mean crown diameter (orchard, avenue, garden); ≥ 0.3 × for woods | M2b (bench, §8.10's stamps) | the stamp tiles' minimum distance is raised to the threshold (a table value) |
| O19 (g) city-zoom greenery | every green face ≥ 0.3 ha drawn at the city band with a short side ≥ 2 px; the green / ground and green / paper pairs at or above §8.2's contrast floors; no option coupling drops the layer | M1 (`ink`), M2b (`lit`) | the `green` role steps one value step from `ground` (a style row) and the check repeats |
| O12 (a) legibility floors | minimum drawn feature ≥ 2 px; area-label cap height ≥ 7 px (§9.4) | M1: B-ZOOM and a §13.6 strip at 6 / 7 / 8 px | the owner's pick; with no pick, 7 px stands |
| O13 (a) label curvature | a label's spine turns ≤ 45° over any window of the label's length (§9.3) | M1 | the spine's smoothing step doubles; a label still over the limit takes §9.4's next ladder rung |
| O13 (c) name–feature consistency | a name that references a feature type has that feature within 250 m | M1 | the grammar's feature guard uses the measured p95 distance as its radius |
| O7 (b) water-dependent trades | within 100 m of water | M2b | the placement score's water term weight doubles |
| O14 (b) farmsteads | every farmstead within 300 m of one of its own fields and within 1 500 m of all of them | M2b | S12a re-sites a violating farmstead to its fields' area-weighted centroid |
| O14 (c) wood edges | edge straightness (chord ÷ path length over 200 m windows) median ≤ 0.90; canopy fraction monotone in the wildness control | M3b | the edge-noise amplitude rises by half and the measurement repeats |
| O14 (e) built / map area | settlement-perimeter area ÷ frame area (without margin) within 0.06–0.25 at every rung and population | M1 | the frame side per rung is rescaled in `ladder.json` so the median ratio is 0.12 (a declared shift) |
| block-level use mix (MFP-7) | residential-only blocks ≤ 60 % of blocks in core districts; per-block use-mix entropy p50 ≥ 0.5 bits; ≥ 70 % of trade households live at their workplace | M2b | the live-in default share of craft and shop rows rises one step (§10.2) |
| requested features (IMP-5) | degraded delivery (tiers 4–5) on ≤ 5 % of requested features | M1 | the F-* ladder whose degraded rung fires most gets 5 instead of 3 tier-3 attempts; if still over, the band becomes the measured rate + 2 points and the top three causes enter `known-defects.json` |
| O16 (c) scripted tasks | one UI action where a reference needs a detour; recovery = one undo; every app response ≤ 1 s | M1 (link, SVG, coast side, variants), M2a (undo), M3b (the rest) | a task over its action count gets a toolbar shortcut and repeats |
| O2 (c) carry-over | edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3 (§15.2) | M3a (B-EDIT) | §6.3's doubled anchor radii with the IoU test; then an edited building or plot left without a successor re-imposes its last geometry as a drawn constraint |

Realism against real towns is measured by the corpus phase (§13.9), which the owner's roadmap stages after the
standalone generators; until then the base's realism evidence is the D-5 realism question and the P rows of §13.5, and
§15.2 says so.

### 13.8 CI tiers and compute budgets (SCL-18; D-34)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

The full verification rig costs ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the suite; 10⁵ oracle
regenerations ≈ 8 CPU-h; 10⁶ fuzz inputs × ≈ 20 primitives ≈ 0.3–5.5 CPU-h), so it cannot gate a single change. It runs
in three tiers, each with a wall-clock budget on a stated runner (a 16-core x86-64 Linux machine; timings normalised by
§12.1's calibration score):

| tier | runs | budget | contents |
|---|---|---|---|
| **PR** | every change | ≤ 15 min on 8 cores | lint (the determinism allowlist, units, dependency direction, the repository path rule), type check, unit and contract tests; B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set; B-CITY-lite 50 seeds per rung × 4 water settings; B-EDIT 10³ sequences with the oracle once per sequence; stage-isolated goldens on Node x86; the licence, notices and deny-list scans; the app's scripted and accessibility tasks on Chromium |
| **nightly** | every night | ≤ 4 h on 16 cores | B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite; B-FUZZ 10⁶ per primitive; B-EDIT 10⁴ sequences; the five-engine golden run with one PNG per LOD and preset; visual regression and B-ZOOM; cost-model sweeps (six sizes × five seeds); control sweeps at TOWN and CITY; the option matrix; the B-REF parity report |
| **milestone** | every milestone exit, and weekly | ≤ 12 h on 16 cores | B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test; the parity report at five seeds per matched size; the D-5 renders; memory and document-size tests at every rung |

A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with *over budget*; the answer is to split
the job or make it faster, never to raise the cap — a budget changes only by a recorded decision. **Measurement (M0):**
the harness times each tier on the runner. **Pre-decided fallback:** if the PR tier exceeds 15 min, B-CITY-lite drops to
25 seeds per rung and the random fuzz to 5 × 10³ inputs per primitive (the constructive set is never cut), and the
nightly tier absorbs the difference.

### 13.9 The corpus-calibration interface (staged by the owner; DEF-9)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

The owner's roadmap puts calibration against the historical map corpus after the standalone generators (the base,
neighbourhoods, buildings, the village) are built; the corpus lies outside this folder and is not read by this program
(the standalone ruling). The base carries the interface now, so the corpus phase needs one adapter and no other code:

```ts
interface CorpusAdapter { id: string; version: string; maps(): AsyncIterable<CorpusMap> }     // written in the owner's staged phase
interface CorpusMap { id: string; source: string /* archive, sheet, date */; era: string; region: string; populationEstimate?: number;
  features: FeatureCollection /* GeoJSON in metres: ways, blocks, plots, buildings, walls, water, greens, with their kinds */ }
interface CalibrationRun {
  id: string; corpus: { adapter: string; version: string; maps: string[] };
  metrics: string[];                                      // §13.5 metric ids, computed on corpus maps by the same parity code
  changes: { table: string; rowKey: string; column: string; from: unknown; to: unknown; evidence: string[] /* baseline ids */ }[];
  before: ParityReport; after: ParityReport; shift: ShiftRecord;   // §13.3
}
```

1. The parity code computes every §13.5 metric on the adapter's maps research-side and writes `baselines.json` rows with
   `reference: 'corpus:⟨map id⟩'`, role *target* and `referenceBuild` = the corpus version.
2. A `CalibrationRun` changes table cells only; every cell is `{value, unit, provenance, calibratable}` (§7.6), and each
   changed cell's provenance becomes `{ source: 'corpus', evidence, date }`.
3. The run ships as a table-version bump inside an output-version bump with a shift record for every moved stage
   (§13.3, §6.4), so every existing document keeps replaying under its own output version.
4. The first tables it re-signs are the era and region presets (D-2), the rung profiles (§1.1), the granularity,
   site-plan and greenery rows (§4.7, §4.9) and the forms' signatures (§7.7); the §13.7 thresholds whose provenance is
   "architecture" or "owner-eye" are re-signed where the corpus measures them.

### Block S-15 — §14 (items IMP-1 (b), COV-MFCG-L08, COV-FTG-A24, COV-FTG-A25, COV-FTG-C11; kernel S6; determinism S-6; pipeline S-h; rendering §14)

=== REPLACE §14 Package and module layout, key interfaces, dependency rules, extension points ===

## §14 Package and module layout, key interfaces, dependency rules, extension points

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17).

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (stamped ranked tiles), curves, index (flatbush / rbush /
               grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys), concern registry
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), setting packs (§10.4) and the default keymap as
               versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand, government and religion rows, S7b / S10a allocation, S10b placement, households and people
               derivation, the relation-store schema, the economy and personality schema stubs (D-32), naming engine + grammar
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / quarters, S7
               fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland, S12b greenery;
               the StrategyRegistry and the ordering of registered StageDecls
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys, boundary treatments; S11 site plans, packer, heights,
               footprint templates; the BuildingGenerator interface (`outline` / `compose`) + OutlineBuildingGenerator; assignment +
               placement solver
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names, candidates, spines and the quarter merge tree; S13b view placement; the font-metrics reader; collision;
               furniture incl. the ruler and the emblem generator
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and tile worker, backends (Canvas2D,
               SVG, print tiles; the WebGL2 tile compositor as a fallback), shadow pass, decoration stamps, live layers
@plat/edit     edit events, dry-run validation, undo and redo records, scoped regeneration, rebase, the dependency audit, event
               migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge (§11.3) and DocResolver
               (§11.5), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from the shift records (§13.3) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift and cascade records, the boolean and buffer oracles
               (Clipper2-WASM in Node, polygon-clipping), the clean-room scanner (§17), the D-5 export command (PNGs for §13.6's panel)
```

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← {labels, render}
← edit ← export ← api ← app`; `docs` reads the registries of `model` and `tables` only; `hood` depends on `layout` /
`plots` only through their interfaces; `sim` depends on `content` and `model` only; `render` never imports `layout`;
nothing depends on `app`; no package imports a backend it does not need; every adopted runtime library is imported in
exactly one adapter file of the one package that uses it; model packages obey §6.5's allowlist lint, which also scans
the vendored dependency sources; no import, fixture or script path may resolve outside `plat/` (§17).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {
  version: string; lineageUnit: EntityKind /* whose lineage keys its draws, §6.3 */;
  workLimits: Record<Rung, WorkLimits> /* output-affecting limits and the declared cost class, §5.1, §13.2 */; budgetMs: Record<Rung, number> /* reporting only */;
  inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>; stream(concern: string, entity?: Id, opts?: { attempt?: number; epoch?: number }): Stream;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy> }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6)
// @plat/kernel — the façade the stages see
interface Kernel { plat(key: PlatKey): Plat; view(key: PlatKey, level: Level): LevelView; resolve(ref: GeomRef, key: PlatKey): Resolved; geom: GeomOps; index: SpatialIndex;
  tx<T>(tx: KernelTx, fn: (overlay: Overlay) => KernelResult<T>): KernelResult<T> }
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, character: CharacterVector, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod) } is §2.6's
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                LabelEntity, QuarterNode: §9.1; backends and threads: §8.9
interface TileBackend   { raster(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; shadows: 'off'|'drop'|'projected'; tier: 'low'|'mid'|'high' }): ImageBitmap }
interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(fates) */; undo(doc: Document): Document; redo(doc: Document): Document;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff }; rebase(doc: Document, reason: RebaseReason): Document }
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
// @plat/testkit — Baseline: §13.5; CorpusAdapter, CalibrationRun: §13.9
```

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the editing tools (draw, move, warp, brushes, the four actions, lock, assign); the tables editor and the style
dialog; the ruler (§9.5); the gazetteer and the "features in view" list; context help; the family-tree view (module).

* **Input scheme (COV-MFCG-L08)** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like
  every table). Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a
  district fills the view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind
  (MFCG's ward reroll); *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of
  the entity's own edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4);
  dragging a selected vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus:
  **A** alleys at the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T**
  trees, **M** ruler, **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New
  random on the selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit,
  **?** the keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global
  bindings off; every bound action is also on a menu or a button.
* **Accessibility (COV-FTG-A24)** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the
  tables editor) meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description come
  from the control registry (its label and documentation anchor); every icon button has a text label. Every action is
  reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map region
  takes arrow-key panning and **+ / −** zoom. **The non-visual route to the map** is the gazetteer (list and search over
  districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features in view" list
  (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each announcing its
  name, kind and district); selecting in either list selects on the map and the reverse. UI text contrast ≥ 4.5 : 1 and
  UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference turns off animated zoom;
  the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide (COV-FTG-A25)** — every control and panel carries a help link to its anchor in
  `@plat/docs` (§7.8's documentation anchor), opened in a side panel. The guide's reference pages are generated from the
  control registry (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table
  schemas (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and
  the tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json`
  (id, symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view (COV-FTG-C11; module tier, M4b)** — reads `query(h, { kind: 'relations', person, up: n, down: m })`
  over the relation store (§10.3): generations in rows by birth epoch, partners side by side and children below;
  branches beyond two generations elided into a count that expands on click; re-root on any person; opening a person
  never pins it (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy` and `SewerStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver`; `CorpusAdapter` (§13.9).

### Block S-16 — §15 plain words and §15.1 (items COV-FTG-OBS1, COV-MFCG-L08, COV-FTG-A24, COV-FTG-A25, COV-FTG-B10, COV-FTG-C03, COV-FTG-C11; kernel S12; pipeline S-d; rendering §15.1; COV-VG-WC2, COV-VG-VN-029)

=== REPLACE §15 Parity matrix and improvement matrix (the *In plain words* paragraph under the §15 heading) ===

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

*In plain words.* Two checklists: every capability we recorded in the four reference generators, and where it lives in
this design (MFCG and FTG rows in the base; Neighbourhood rows in the stage-2 interface; Village rows only checked as
not blocked); and every improvement the program committed to, with the mechanism that delivers it, the number that would
prove it and what kind of proof that number is — a check that our own rule was followed, a comparison with a measured
reference number, or evidence that the result is better.

=== REPLACE §15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2) ===

### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

Tags: **BASE** (delivered by stage 1), **STAGE-2** (delivered by the neighbourhood stage through an interface the base
carries), **VILLAGE-LATER** (the separate product staged by the owner; checked as not precluded, hooks in PART III),
**module** (the optional `@plat/sim`, milestone M4b), **hook**. "Beyond" marks rows where the base deliberately exceeds
the reference's recorded weakness. Rows whose id starts `a:` were added by the fix-all pass from the coverage audits'
rows (COV-FTG-OBS1): the matrix is now no coarser than the findings.

**MFCG (40 rows) — all BASE**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 S0, §6.4 permalinks, §7.7 intent (MFCG's flags kept as intent toggles and the features strip, §7.8) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (beyond: no whole-city restart; every requested feature counted by delivery tier) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | replaced by the plat and backbone faces (§2.2, §4.3); Delaunator kept for site sampling; the "denser, regular centre" look carried by the stage regimes | BASE |
| B2 | junction optimisation | §3.6 attraction + §4.3 junction merge (8 m), Y → T | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 closed-outline coast at the request's bearing | BASE |
| B4 | `buildDomains` (land components) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.2 S3 gate sites; §4.4 trace before the stage's growth; §4.8 gates at arterials with exact N by the measured gate law, water gates, towers by rule | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.2 S3 castle reservation by score with the inside / on-enceinte / outside option; §4.8 keep by `lir`, bailey, compactness gate with re-siting | BASE |
| B7 | streets and roads (`Topology`, `aStar`, `tidyUpRoads`) | §4.3 routed arterials, destinations = gates / market / bridges / harbour | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, distributaries (a delta), estuary as a width rule, islands; §4.8 bridges, canals as an intent flag | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.5 grower over coarse faces, `check4holes`, feature-named kinds, quarters | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill of each district polygon: the intramural secondary network and its lanes as spines | BASE |
| B11 | block → lots (twisted bisection, OBB, `indentFronts`) | §4.7 S10 per-frontage plots + front jitter (construction replaced by ruling O5; statistics matched, §13.5) | BASE |
| B12 | outskirts density falloff | §4.4 ribbon regime with the distance-to-gate kernel; §4.5 density field | BASE |
| B13 | shanty town / ribbon sprawl | §4.5 squalid type after the first half of the stages, outside the enceinte, with MFCG's trigger set; §4.4 ribbon regime; the suburb regime on the shanty toggle | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.2 S3 plaza reservation sized per rung; §4.7 S9 `square` faces; §4.8 gate plazas and church forecourts (G-R1); institutions via claims | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S11 institution site plans; §2.6 landmark footprint templates and OutlineBuildingGenerator; `lir` keep; solid-ink landmarks in `ink` | BASE (+ stage-3 hook) |
| B16 | greens / parks | §4.9 greenery rule table | BASE |
| B17 | farms and fields | §4.9 hinterland presets incl. the furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture (basin, moles, quays, piers at 12–20 m) | BASE |
| B19 | trees and forests | §4.9 forests as faces; §8.10 stamped ranked tiles (Poisson k = 50, built once per session) | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4 / S5 costs (beyond) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.5 LOD bands + the plot model: the Lots look = footprint masses over the `ground` role at the city band; Hidden = a layer toggle; cadastral layer optional (beyond: no global switch) | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.8 straight skeleton with the plain-roof downgrade; §8.2 `roof` program; §2.6 roof spec + heights; Raised = `ink`'s offset under-copy, on by default (the projected shadow off, §8.4) | BASE |
| C3 | lot post-processing (`Offset`) | §4.7 S11 front-line jitter parameter | BASE |
| D1 | naming (Tracery + Markov, feature-conditioned) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 hole-aware spines, quarter labels at city zoom, OBB-arc / straight / legend fallbacks (beyond: protected features) | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9.5 (emblem slot with import and a minimal own generator; compass reroll) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, the contrast matrix, per-entity tints, thematic overrides | BASE |
| E2 | stroke discipline, layer order, caching | §8.2–§8.3 (casing idiom, round joins, order parity, world-aligned tiles) | BASE |
| E3 | alleys layer | §4.6 lanes / alleys are ways; §8.5 access-critical lanes drawn at the city band, the rest by LOD | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.8 continuous zoom on 2^¼ stops + the district band (beyond "no zoom"); framing §9.5; hairline mode (key **N**) | BASE |
| F1 | warp tools (8) | §3.4 `warp` + §7.1 `warp` event with dry-run and whole-step validation | BASE |
| F2 | rerolls, renames, landmarks | §7.1 the named actions, `setAttr`, `assign` (beyond: persisted, undoable) | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app` input scheme in `keymap.json` (click edits, shift+click New random, ctrl / cmd+click reset, single-key toggles, §14); the measure tool (§9.5); the size ladder as data (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 (beyond: round-trip import, layered SVG) | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API, host bridge and static exports serve any host; the emblem is our own generator (§9.5); no third-party service is called (standalone) | BASE (hook) |
| H1 | population and scale model | §10.2 population as input; §2.1 metres (beyond the multiplier) | BASE |
| H2 | performance envelope | §12 (matched sizes 40 / 80 / 130; §12.9's declared trade) | BASE |

**FTG (46 rows + 9 audit rows) — BASE unless noted**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2 S0, §7.6 presets as data, §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary blocks / CBOR twin | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §6.4 retention, §7.5 migrate (beyond: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11.2 handle API and workers; §2.9 document; §10.3 lazy people | BASE |
| a:A24 | app accessibility; list and search views reaching buildings and people without the map | §14 `@plat/app` accessibility contract, the gazetteer and "features in view" lists; §13.4 tests | BASE |
| a:A25 | user guide, context-aware documentation links, release notes naming defects | §14 `@plat/docs` and context help; §7.8 anchors; §13.2 coverage and link checks | BASE |
| B1 | size ladder, population and area budget | §1.1 ladder and rung profiles; §4.2 S2 stage quotas; §12.2 | BASE |
| B2 | dependency-graph building selection | §10.2 sequential roster (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 households (base); postings and re-matching in the module | BASE + module |
| B4 | people model | §10.3 derived people with ancestry rows (own tables) | BASE + module (data depth) |
| B5 | government, religion, factions, military | §2.7 Faction / Institution entities with seats; §10.2 government and religion rows (base); meetings, roles and goals in the module | BASE + module |
| B6 | relations, friend groups, rivalries, events | the relation store — schema in the base (§10.1), materialised by `@plat/sim` | module |
| a:B10 | economy: resource chains, items and services with prices, stock per building, global price edits | D-32: `@plat/sim` over the base schema stub (§10.3); roster rows' provides / uses edges (§10.2) | module |
| a:C03 | personality, education gated by class, stat block with profession modifiers | D-32: `@plat/sim`, derived from the person key; the stat block a named game-system pack, off by default | module |
| a:C11 | family-tree view (layered generations, elided expansion, re-root) | §14 `@plat/app` family-tree view over the relation store | module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine, bank classes (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, tributaries, distributaries, river islands, crossing sites; §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (beyond: attraction policy, levels as views of one arena, role sets on edges) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages, initial roads) | §4.4 S5 outside the walls (mean-reverting curvature walk, destination-biased, explicit legality; per-preset growth rules for `american` / `ringed`); travel-cost stage boundaries with the anisotropy row (FTG's spoke priority) | BASE |
| C6 | district lots: creation, merge floor, type selection, order | §4.5 grower and typing, merge floor; S7b allocation | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings), placement modes, modifiers | §4.7 claims first → S8 → S10 → S11; Dense / Gaps / Individually placed ≈ row / detached / compound; the tents arrangement row (§4.7 S11) and the building-scale multiplier (§2.5) | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S10 per-frontage regions (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S11; entrance rule kept; non-rectangular landmark footprint templates in the base (§2.6) | BASE |
| C10 | suburb stage | §4.4 suburb regime (offshoots, cul-de-sacs, small lots from the outset, density Bernoulli) by preset or the shanty toggle | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.2 S3 castle reservation + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 water furniture; §4.5 docks | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.9 S12a count-driven outside land, farmsteads, outside buildings on their resources (§10.2 `outside` rows) | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.9; §8.2 hedgerow instances in `lit` | BASE |
| a:I11 | tree species | §2.7 `Greenery.species` from the climate table; §4.9 inner and outer shares for woods | BASE |
| C16 | landscape decorations, reserve, climate presets | §4.9 S12a decoration table (ponds, copses, stone circles, ruins with trails, counts by rung and biome, keep-clear radii); `reserve` land use; climate as a circumstance + style preset | BASE (should-have) |
| a:I05 | feathered field edges | §8.2 `feather` program (vector bands), on in `lit` | BASE |
| C17 | perimeter expand + round; decoration system | §4.9 settlement perimeter offset and rounded; §4.7 furniture pins (per-block weighted rows, per-district singletons) and plot boundary treatments (§2.5) | BASE |
| a:J05 | market stalls | §4.7 furniture pins: stalls on the square's edge band and round the market hall | BASE |
| C18 | district and building naming, erosion | §10.4 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §8.1 columnar display list + tile backends (batched; picking through hit-test slices) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset on Canvas2D with our procedural texture set | BASE |
| D3 | roofs (straight skeleton) | §3.8, §8.2 (roofs cached per entity revision, not per render) | BASE |
| D4 | water rendering and coast decoration | §8.2 bands, depth ramp, foam, bank classes | BASE |
| D5 | day/night, weather, seasons, window lights | §8.4 sun vector + shadow hook; `night` preset with the `lights` role; lights from the module | BASE (hook) + module |
| D6 | post-process effects | §8.2 post operations per tile (greyscale, sepia, tint, vignette, pixelate, dot screen, scanline, crosshatch noise) | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9; thematic layers = style overrides keyed by attributes (§8.2) | BASE |
| a:L08 | ruler (distance measuring) | §9.5 measure tool (distance and area, metres and feet, snapping) | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF and CityJSON exports; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §7.1 draw / move / warp events with split-on-cross and dry-run validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.1 the named actions with scope; `setAttr` batches; faithful regeneration (beyond: undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1 `setAttr`, data dictionaries by id (§10.3), annotation layer (§9.5), view notes (§11.3), `LayerSpec` | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 module; sub-locations with capacities (§2.6) | module |
| F2 | clock, calendar, external time sync | §10.3 module; the time view state and the module's command over the bridge (§11.3) | module |
| G1 | export | §11 (beyond: districts in GeoJSON; per-layer VTT; CityJSON) | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT exports (Foundry-class, dd2vtt) + the host bridge over any transport; no hosted service — the host is the store (§11.5) | BASE |
| H1 | data scale | §12.8 memory; lazy people | BASE |
| H2 | performance envelope | §12 (beyond: sub-second client-side at every rung) | BASE |

**NG (32 rows) — STAGE-2 unless the base already delivers it**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, `Settings`, URL state | PART II request (fabric id, params, character); §6.4 permalinks | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seed (beyond) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (NG's local retries are the F-CUT ladder) | BASE |
| B1 | hood outline (`createShape`) | the district's typed boundary; standalone / sky outline from §4.2's routine; outline templates (II.2) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations selected per district (II.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli (`BisectorEx`) | §4.6 slit routing — the primitive `RingFabric` needs | BASE (primitive), STAGE-2 (ring) |
| B5 | street finishing: extend, fillet, width, corridor | §4.6; §4.7 S9 corridors | BASE |
| B6 | block content dispatch (Normal / Manor / Empty / Green) | §4.6 the deep-interior choice by band shares; §4.7 S10 residue typing; §4.9 greens; the weighted, area- and spacing-conditioned choice as a stage-2 table (II.3) | BASE + STAGE-2 |
| B7 | square-template plaza | `SquareFabric`; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (II.2: concentric spines at a radius law + radials) | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S10 (construction, 0 discards) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 wings in the base + stage-3 hook; roof kinds in the base | BASE (+ stage 3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments + §4.9 grove rule | BASE |
| C4 | greens, groves, shared Poisson field | §4.9 greenery rules; §8.10 stamped tiles | BASE |
| C5 | trees (crown construction, colour, shading, depth sort) | §8.2 lobed crowns, depth sort in `hatched`; §8.10 crown library | BASE symbol, STAGE-2 tier |
| C6 | pins: wells, fountains, large trees | §2.7 `Pin` kinds; §4.7 furniture pins in yards and squares; close-up density by the stage-2 table (II.3) | BASE (pins), STAGE-2 (close-up density) |
| C7 | uneven streetwall | §4.7 S11 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | §2.5 character vector; metric scale (beyond) | BASE |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9.5 emptiest-corner rule | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 (`hatched` / `graphic` presets; multi-colour roles) | BASE |
| E2 | canvas, layer order, stroke discipline, depth-sorted trees | §8.2–§8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 programs (paved stripe, cobbles, tiles, outlined, dashed) in `hatched` | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.2 `roof` + `hatch(taper)`; §8.6 | STAGE-2 tier (programs in BASE) |
| E5 | shadows (prism quads, tree shadows) | §8.4 shadow pass from stored heights | BASE hook, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets as data | STAGE-2 tier |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app` (keymap, §14); rotation = view (§7.1); `setAttr` rename persists | BASE (app) |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations (Procgen Mansion hand-off) | the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off) | hook |
| H1 | performance envelope | §12 (open a district ≤ NG's 10–96 ms; per-district regeneration ≤ 30 ms) | STAGE-2 |

**VG (44 rows) — VILLAGE-LATER: not-precluded checks, hooks in PART III**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the intent layer and presets are data (§7.7); tags derivable from the statistics record |
| G2 | seed / RNG / retry | §6 streams; §5 no seed swap |
| G3–G5 | river course before terrain, height field, water extraction | S1 shares level-set water and a carved field; VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers, which S1's carve step serves (PART III) |
| G6, G7 | density map, heart | the density field is the same field type (§4.5); a village registers a density `StageDecl` ahead of its network (§4.12) and seeds one heart (§4.2 S3) |
| G8, G9 | tracker roads, bridges | a village registers a tracker-steered `NetworkStrategy` that receives the traced enceintes (§4.12); bridges §4.8 |
| G10, G11 | square + centrepieces, wharf / piers | `square` faces + pins; `quay` / `pier` ways |
| G12–G16 | buildings + population, fields, orchards, forest, palisade | detached / farmstead site plans (§4.7); hinterland presets and orchards (§4.9); forests; the palisade built before the roads by the village's `EnceinteStrategy` (PART III) |
| G17–G19 | naming, legend / POIs, population class | §10.4, §9.5 annotation layer, §10.2; the ladder's village rows (PART III) |
| R1–R17 | rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + programs (§8.2: bands, contour and hachure marks, outline mix, vignette, `lights`); the relief tier (hillshade, contours, hachures) is an optional base program, off by default; VG's grass-tuft and spotlight looks stay with the village product |
| E1–E6, D1 | export, JSON, permalinks, editing, integrations, performance, scale | §11, §7, §12, §2.1 (metres everywhere; VG's 0.7 m / unit ambiguity removed) |

All 44 rows are not precluded; the base pays for none of them beyond what it needs itself (the relief tier is a base
should-have in its own right, O12 extras). Caution recorded from the parity judge: the five-level plat is the least
village-shaped model — a village with houses along ways leaves L2 / L3 nearly empty — admissible, since a village is one
district and nothing assumes walls or a market (PART III).

### Block S-17 — §15.2 (items IMP-4, IMP-5, IMP-7, IMP-10, IMP-11, IMP-12, IMP-16, SCL-21; determinism S-7; kernel S10; pipeline S-d; rendering §15.2)

=== REPLACE §15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 ===

### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

Every acceptance letter carries its class: **[C] conformance** — it holds by construction once the rule is built, so it
proves the implementation follows the design and is never cited as evidence that an improvement was achieved; **[P]
parity** — compared with a measured reference number in `baselines.json` by §13.5's band rule; **[O] outcome** — it can
show that the result is better than the references, for a user or for realism. Thresholds without a reference source
have their numbers in §13.7. Letters that `docs/IMPROVEMENTS.md` stated and an earlier draft dropped are restored with
their numbers (IMP-10).

**The first-weighted improvements (D-7) and the evidence their own rules cannot fake (IMP-4).**
* *Plot texture* (O5, O17, O18): §13.5's figure-ground and streetwall rows against MFCG's exports at the matched rung,
  with the intended direction of each difference declared; the plots, party-wall and MFCG street-signature rows; the
  within-district plot-area CV floor [P / O].
* *Editability* (O9, O16-core, O2 c): the thirteen MFCG asks as measured scenarios; locality outside the scope;
  faithfulness against from-scratch generations; carry-over rates of edited entities [O].
* *Legibility and charm*: the §13.6 protocol's legibility and charm questions; street-edge recoverability [O / P].
* *Realism*: the §13.6 protocol's realism question and the P rows of §13.5. Realism against real towns is the corpus
  phase's measurement (§13.9), which the owner's roadmap stages after the standalone generators; this matrix makes no
  realism claim beyond those two.

| id | tier | mechanism in this design | acceptance (class of each letter) |
|---|---|---|---|
| O2 deterministic recipe | must | §6.1 keyed streams with the concern registry; §6.3 addresses and lineage; seeded decoration; epoch components | (a) identical model digest on two machines and three browsers, 100 % [O — FTG has no seed; VG drifts between builds]; (b) the scope of stability as §6.3 states it — grammar, decoration and block-reroll perturbations change 0 other entities [C]; (c) per parameter class: entities outside the stage-k closure byte-identical 100 % [C]; edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3, measured at M3a with §13.7's fallback [O]; (d) addresses 100 % stable outside the scope on B-EDIT [C]; (e) stage-isolated goldens: only declared stages move (§13.3) [C] |
| O6 metric units, furniture, statistics | must | §2.1 cm + unit lint; §1.1 ladder; §9.5 furniture; §13.2 core statistics record | (a) 100 % of length fields carry a unit (lint) [C]; (b) ordinary-house footprint median 60–160 m², p95 < 400 m² [P — FTG 103 / 154 m²; MFCG's footprints are lots, descriptive only]; (c) scale bar and grid within 0.5 % [C]; (d) 100 % of generations emit the core statistics record with provenance, the bench metrics on demand (§13.2) [C] |
| O3 robust kernel, typed ladders, report | must | §3, §5 | (a) B-FUZZ on random inputs and constructive degeneracies: 0 crash / hang / invalid output [O — all four references crash or retry on degenerate input]; (b) hard invariant violations 0 / 1 000 cities [O]; "no restart path" is a design property, not an acceptance number (IMP-5); (c) B-EDIT 0 planarity violations [C]; (d) model p95 TOWN ≤ 100 ms, CITY ≤ 300 ms, METROPOLIS ≤ 800 ms (§12.3) [P — MFCG at matched sizes, with §12.9's declared trade]; (e) identical digest across platforms [O]; (f) the seed never swapped; ladder uses ≤ 2 % of transactions, p99 ≤ 3 attempts [C]; (g) p95 per delivered town on the MFCG-worst configuration set ≤ 1.0 s against MFCG's 3.7–4.0 s (§13.5) [O] |
| O11 schema, registry, exports, API | must | §2 schema + registry with the CI path test, §11, §14 | (a) registry round-trip 100 %, no type missing from any path [C]; (b) containment 100 % [C]; (c) export → import → export identical [C]; (d) GeoJSON validates and loads in QGIS with districts [P — FTG omits districts]; (e) 0 dangling references [C]; (f) headless digest = UI digest [C]; (g) VTT grid 0 px [C]; (h) layered SVG separable and opening in Inkscape within 120 s at METROPOLIS [O] |
| O1 terrain and hydrology first | must | §4.2 S1 | (a) requested water features counted by delivery tier: tier-6 omissions 0, degraded ≤ 5 % (§13.7) [O — MFCG fails a requested river in 7 of 10 attempts at size 80]; (b) 0 non-monotonic beds; every river has an outfall; width never decreases downstream; every terrain cell has a defined flow path to an outfall (100 %); contours cross water 0 times [C]; (c) 10 / 10 configurations on 100 seeds each — coast, estuary, confluence, river island, lake shore, delta (distributaries), moat, island city, hill town, cliff or ravine [O]; (d) building ∩ water = 0 [O — MFCG's buildings over its river]; (e) the water stage linear in cell count, ≤ 5 ms at a 128²-cell equivalent and inside §12.4's S1 budget [P — VG 17–87 ms for one 128² village]; (f) site classifier ≥ 90 % [O]; (g) unused eligible land components 0 [C]; R11: river within the core when requested = 100 % [C] |
| O4 two-tier street network | must | §4.3, §4.4, §4.6 | (a) 100 % of through-roads reach destinations, bearings ± 10° [C]; (b) detour ≤ 1.4; junction p5 ≥ 30°; no turn cliff (10 m resampling); 4-way share per preset — organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % [P]; (c) width ~ betweenness [C]; (d) slope p95 within class [C]; (e) 0 edges below `minEdge` and 0 clearance violations [C]; (f) network + infill ≤ 100 ms at CITY with block statistics in the NG bands — the fusion gate, at M0 on a flat site and at M1 on river, coast and relief configurations [P]; the MFCG street signature inside the walls (§13.5) [P]; (g) N external connections exactly, island towns counting their shore landings [C]; (h) between-seed dispersion of the signature vector ≥ the larger of MFCG's and FTG's at the matched rung, from M1 (IMP-12) [O] |
| O5 frontage-first plots | must | §4.7 S10 | (a) access edge 100 % [C]; (b) 0 plots < 3 m, wedges < 0.5 % [C]; (c) side walls ± 5° ≥ 90 % [C]; (d) typed coverage 100 %, discard ≤ 0.05 [C]; (e) plot and block distributions by §13.5's band rule [P]; (f) 0 self-intersecting, duplicate or doorless buildings [O — FTG's hourglasses and ≈ 10 % doorless]; (g) streetwall gap ≤ 1 m [C]; streetwall continuity on dense frontages ≥ MFCG's at the matched rung [P] |
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class (IMP-8) [P]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — p99 \|∇P\| ≤ 0.5 per 100 m (§13.7) — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]; (k) gap-width modes [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4 | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) rule satisfaction ≥ 95 % (noxious trades downstream or extramural; water trades within 100 m of water; market on a tier-1 junction or gate), reported per city [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands (MFP-7) [O] |
| O19 greenery by prosperity | must | §4.9 rule table | (a) Spearman(prosperity, private green share) ≥ 0.7 within ± 5 points of the table mean, σ ≤ 8 across seeds [C — NG's 23–58 % at identical tags is the weakness]; (b) public-green rules ≥ 95 %; park area per 1 000 inhabitants in band per rung [C]; (c) 100 % of greenery typed and owned or common, untyped leftover green 0 [O — MFCG and NG green is leftover space]; (d) tree nearest-neighbour p1 ≥ §13.7's canopy threshold, pair-correlation per class [O — FTG minimum 0.14 m]; (e) a district-band view with 10 000 visible trees composes in one 16 ms frame from cached tiles (§12.7) [P — VG P1]; (f) the greenery control monotone and continuous (§7.8) [C]; (g) city-zoom greenery passes §13.7's legibility check and no option coupling drops the layer [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile and ≤ 4 uploads per frame (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 %, every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map per rung ≤ 150 ms / 0.4 s / 1 s (§12.5) [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical; New random inside the central 95 % band of K ≥ 50 from-scratch generations of the same scope on median plot area, frontage width, density and attached share, a campaign failing only when its pass rate is below 0.95 at p < 0.01 (binomial) [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7 | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, infeasibility reported with the nearest count [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C] |
| O13 full (street names, addresses, annotation) | should | §9 | (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O — no reference names its streets]; (d) 0 spelling errors [C]; (f) annotation layer [C]; (g) addresses 100 % [C] |
| O14 full (rings, presets, wildness, feasibility) | should | §4.9 | (c) wood-edge straightness median ≤ 0.90, canopy monotone in wildness (§13.7) [O — VG's "Some" ≈ "Many"]; (f) ≥ 95 % of the map land-classed [C]; (g) scatter statistics [P] |
| O16 full (thumbnails, drafts, discoverability, responsive, accessible) | should | §7.8 (S0–S4 proxy thumbnails, G-R4), `@plat/app` (§14) | (c) the scripted tasks of §13.4 — share a view link, export a layered SVG, change the coast side, see five variants of one kind, recover from a mistaken regenerate — each in one action where a reference needs a detour, every response ≤ 1 s (replaces "≥ 90 % of testers"; IMP-11) [O]; (e) six thumbnails < 1 s at TOWN [P]; (g) editor usable at 768 px [C]; the accessibility contract (§14, §13.4) [C] |
| O12 extras (relief tier, tiled export, low-end tier) | should | §8.2 relief tier; §8.8 tiled export; the low tier (§12) | as O12 (b), (e); the relief tier renders at every rung and is off by default [C] |
| O7 simulation module | should | §10.1, §10.3 `@plat/sim` (M4b) | the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported; every person a work or role (100 %); the economy and personality content of D-32 derived deterministically from its keys [C] |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | (g), (h); format validators, CityJSON's included [C] |
| O9 extras (upgrade replay with diff) | should | §7.5, §6.4 retention | the upgrade test; goldens replay under N−1 and N−2 [C] |
| O2 / O6 extras (golden suite, calibration interface) | should | §13.3, §7.6, §13.9 | the declared-shift protocol in CI from M1; every table value replaceable with provenance; the corpus interface of §13.9 present [C] |
| hooks 1–8 (§5.4) | must | 1 addresses + sub-seeds §6.3 / §6.1; 2 lifecycle + edit log + incremental pipeline + conversions §2.8 / §7 / §4.11; 3 assignment input + solver §7.7; 4 context vector + rules as data §2.5 / §7.6; 5 building-generator interface + heights + shadow hook §2.6 / §8.4; 6 layers + drainage + any-boundary neighbourhood + island outlines §2.1 / §2.3 / PART II / §4.2; 7 editable versioned tables + preference layer §7.6; 8 circumstances timeline + stored editable field §7.7 / §4.5 | every hook field declared in the schema of every entity type and populated when used (registry test, 100 %) [C]; zero cost when unused — with every hook unused, the one-click model time and document size equal a build with the hook fields removed within 2 % (a CI comparison) [C] |
| S1 boundary and seam contract | STAGE-2 (must in base) | §2.5 `SeamContract` from M1, §4.12, PART II | 100 % of districts carry a complete contract; portals 100 %; misalignment 0; Hausdorff 0 for shared entities [C]; at M1 the check is schema completeness only (the field is flat until M2b, so its samples are constants) [C] |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.5 fields with `hard` flags per seam edge | Δ frontage, area and storeys within §13.7's bands on soft seams [O — NG's hoods cannot share a street] |
| S2 context features, S4 templates, S5 render tier, S6 workflow | STAGE-2 | PART II II.2–II.5, §8.6, §7.1 | as `docs/IMPROVEMENTS.md` §3.2, S2's blind preference test run through §13.6 at M5 with the owner as the declared rater (IMP-11) [O] |

### Block S-18 — §16 (items IMP-2, IMP-3, IMP-13, LC-19, FTG-16, MN-2, SCL-18, IMP-1 (M-1 digest), IMP-12; kernel S11; determinism S-8; pipeline S-e; rendering §16; DEF-2, DEF-3, DEF-5, DEF-7, DEF-8, DEF-10 – DEF-13, DEF-15, DEF-17 out-of-scope entries)

=== REPLACE §16 Build plan — calibration and spikes first, then a viewable town, then parity, then stage 2 ===

## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 150–200 expert person-weeks. The subjects the
owner's roadmap puts later are listed at the end with their hooks; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 75–100 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit files the milestone's declared
shifts and fails on an undeclared one (§13.3).

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal (IMP-8); **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza (MFP-2, MFP-6, MFP-8); **FTG captures at BIG_TOWN and BIG_CITY**, three of each over six days on the free daily allowance, decoded with the existing tools (FTG-16); outline anisotropy on every FTG payload (FTG-5); the variety dispersions of MFCG and FTG (IMP-12); **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (IMP-1) | every §13.5 baseline row present with its provenance and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + re-walk ≤ 8 µs per proposal; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-permutation determinism; (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13 names with quarter and district labels; the `ink` preset at the city and district bands on the Canvas2D tile pyramid; SVG / PNG export; permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, shift and cascade records and stage-isolated golden tooling (LC-19)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items (IMP-2):** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages (IMP-13)** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (the pool stays primary if its CITY p95 ≤ 300 ms and digests are identical for pool sizes 0–3 on 200 seeds, else the single-worker column is declared); the label-tile measurement (§8.9); the figure-ground metrics, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's (IMP-12); the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY); the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included | 33–43 pw |
| **M2a — the editing core** (D-7: before the second preset) | the document and log with the one replay fold; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo with undo records and checkpoints; dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation flat within ± 20 % from TOWN to METROPOLIS; "recover from a mistaken regenerate" in one undo | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D** with our procedural texture set (≈ 1 pw); the relief tier; METROPOLIS, with the single-thread METROPOLIS measurement (§4.1) and the compositor measurement (§8.9). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded | 33–42 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools | O9 (c) faithfulness (§7.3 item 7 iv), (e) and (f) — the thirteen MFCG asks as scripted scenarios; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved events, one digest, 0 lost accepted events); GeoJSON loads in QGIS with districts | 15–19 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 % | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit; **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets; METROPOLIS first map ≤ 1 s; the D-5 protocol passes at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded; every table value replaceable with provenance | 11–16 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (every person a work or role 100 %; the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported); one hour for 50 000 people ≤ 50 ms; a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` render tier (tapered hatch, two-tone roofs, prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees, hood title); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; **the D-5 protocol against NG** (S2's preference test with the owner as rater) passes or the owner's acceptance is recorded | 14–18 pw |

**Effort, with its basis (IMP-2; D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 9–13 | neither reference has it |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label tiles, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 5–7 | §11 |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 7–11 | new in both references |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 4–6 | forms tuned by eye and the D-5 panel |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 8–12 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 7–10 | §13 |
| mechanisms the fix-all pass added that the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine) | 5–7 | the kernel, pipeline and rendering drafts of 2026-09-25 |
| **base subtotal (M-1 – M4b)** | **136–182** | |
| stage 2 (M5) | 14–18 | as before |
| **total** | **150–200** | equal to the milestone sum above |

*Chose* to state the larger, honest total *over* keeping 100–130 by cutting scope *because* the owner asked that nothing
be deferred and that everything be fixed as soon as possible, and the earlier figure left out the content, the app and
the rig that the base contains. The cuts that would shrink it are recorded for the owner's veto, not applied: the
module M4b (8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the
should-have "full" tiers (4–6 pw) — together a base of ≈ 119–154 pw and a total of ≈ 133–172 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a, with Clipper2-WASM as the pre-decided single
engine, §3.7); the straight skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's
re-pricing is the warning); the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time
(§13.6's rater rule answers it).

**Staged by the owner (hooks concrete; documented, not bugs to re-find):** stage-3 building compositions (§2.6's
`outline` / `compose` split, cost contract and intake measurement); the village product THORP → HAMLET → VILLAGE (PART
III); sewers and floating islands (II.6); the evolution engine beyond the one built growth path (§4.11); calibration
against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract). Nothing else is out of
scope: CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2).

### Block S-19 — §17 (items IMP-1, IMP-14, IMP-15, FTG-22, DEF-14; kernel S7; determinism S-11; rendering §17)

=== REPLACE §17 Clean-room and legal posture; third-party licences ===

## §17 Clean-room and legal posture; third-party licences

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

*In plain words.* We never copy or port the references' code (the 2017 open-source ancestor is GPL and the live builds
are proprietary); we re-implement published ideas and the behaviour we measured. Their name lists, palettes, building
tables and textures are their creative content and are never reused; ours are written fresh. The people who write the
product read only this document and a cleaned digest of the research, never the research itself; the product lives in
its own folder that cannot reach the research folders; reference numbers reach the tests through one numbers-only file;
and a scanner stops the build if a reference word list, palette or table turns up. Every library has a permissive
licence, is pinned and is credited in a generated notices file, so the owner can choose any licence for our own code.

### 17.1 The clean-room chain (IMP-1; D-29)

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased.
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan below on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule and is scanned at M-1.
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
4. **Reference numbers only through `baselines.json`.** Research-side scripts (`research/baselines/`) measure the
   captures and write numbers with provenance (§13.5's `Baseline` rows); the file is committed into
   `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled research-side from
   the product's PNG exports and the capture images (§13.6).
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names (FTG-22), and texture and image file hashes. The list holds only salted
   SHA-256 digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list §9.6 already needs,
   of token 3-grams in list order (so a copied table is caught even when every word in it is ordinary), of exact six-digit
   colour values, and of file bytes. `@plat/testkit`'s clean-room scanner digests the same way every token of
   `@plat/tables`, assets, source string literals and comments and the digest, in the PR tier; a hit fails the build
   unless an allow entry with a written reason is reviewed and added. At every milestone the checker seat also runs a
   research-side palette audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette
   fails and is redesigned. Every file in `plat/assets` names the script that generated it or its third-party licence
   (fonts); a file with neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm. The creators' *stated* ideas: twisted bisection, the casing idiom, skeleton
   labels, the proposal queue, dependency ratios, lazy people, integer centimetres — with constants calibrated on our
   own measurements.
9. **Protocol names (FTG-22).** The host bridge's vocabulary is our own (§11.3). Schema-level ideas — an event /
   command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message and field names are
   not reused and are in the deny-list.

### 17.2 Fonts (IMP-15)

Fonts are third-party assets under the SIL Open Font License and sit outside the clean-room rule: they are neither the
references' code nor their creative data. *Chose* IM FELL Great Primer (OFL) as the default label face *over* a
different serif chosen "for clean-room distance" *because* it is the face of MFCG's labels and part of the ink look the
owner adopted (D-1), and clean-room distance applies to the references' code and content, not to a public OFL font;
EB Garamond and Cinzel ship as alternatives. Fonts ship unmodified; CI reads each face's name table and refuses to
subset a face that declares a Reserved Font Name; the OFL text ships in the notices file. Label metrics are read from
the bundled files (§9.2).

### 17.3 Our own licence (D-22; DEF-14)

Until the owner chooses, the `plat/` repository is **proprietary: "Copyright © the owner. All rights reserved."** in its
`LICENSE` file, with no open-source licence. *Chose* this default *over* an open licence *because* it keeps every option:
the owner can later publish under any licence by one act, while an open licence once granted cannot be withdrawn from
those who received the code. Flagged for the owner's veto. What keeps every choice open: permissive-only dependencies
checked over the production closure (§17.4); nothing copyleft linked or bundled; the notices file; the clean-room chain
(§17.1); every file written by the program's seats for the owner, and no outside contribution without the owner's
written assent.

### 17.4 Dependencies (IMP-14)

* **Checker.** The allowlist — MIT, ISC, BSD-2 / 3, Apache-2.0, BSL-1.0, CC0, Unlicense, OFL (fonts) and Sun's fdlibm
  notice — runs in the PR tier over the **transitive production closure** of every shipped bundle (library, embed, app,
  CLI). Dev-only dependencies are listed exceptions, each with its reason: `@resvg/resvg-js` (MPL-2.0), Playwright and
  its downloaded browsers (MPL / LGPL components), axe-core (MPL-2.0), the oracles, the validators and the spell-check
  dictionary; Inkscape and QGIS are GPL programs that CI runs as external tools and never links.
* **Notices.** CI generates `THIRD-PARTY-NOTICES.txt` from the production closure (name, version, licence text,
  copyright lines) plus the fonts' OFL text and the fdlibm notice; every bundle ships it, and the minifier keeps `/*! */`
  banners.
* **Pins.** Exact versions in every `package.json` with the lockfile committed; no prerelease in the production closure;
  an upgrade is a reviewed change that re-runs the checker, §6.5's allowlist scan of the vendored sources and the goldens.
  Every adopted runtime library is vendored at its pinned version into `plat/vendor/`, scanned by the determinism
  allowlist (§6.5), with an audit record kept in `@plat/kernel`.

| dependency | licence | use | status |
|---|---|---|---|
| `robust-predicates` 3.0.3 | Unlicense | `incircle`; the adversarial `orient2d` reference in tests | adopt, pinned |
| booleans, buffers and bands on the arrangement | ours | §3.7 | built |
| straight skeleton with its validator | ours | roofs, label spines (§3.8) | built |
| `dmath` | our TypeScript port of the fdlibm 5.3 routines the model needs (netlib's sources), carrying Sun's notice — no `@stdlib` closure | deterministic transcendentals | built |
| Clipper2 (`clipper2-wasm` 0.4.0) | BSL-1.0 | CI oracle for booleans and buffers; the pre-decided M0 fallback would ship it compiled to WASM as the single engine (§3.7) | dev (shipped only if the fallback fires) |
| `polygon-clipping` 0.15.7 | MIT | CI oracle | dev |
| `delaunator`, `d3-delaunay` | ISC | site sampling, medial axes | adopt |
| `earcut` | ISC | triangulation (fields, glTF and CityJSON meshes) | adopt |
| `flatbush`, `rbush` | ISC, MIT | spatial indices | adopt |
| `simplex-noise` | MIT | noise base (our seeding, fBm, warp) | adopt; determinism checked by the vendored scan |
| `d3-contour` | ISC | marching squares for render-tile contours | adopt |
| `cbor-x` | MIT | the compact twin | adopt |
| `zod` | MIT | schemas | adopt |
| `@napi-rs/canvas` 1.0.9 | MIT | the Node CLI's PNG export | adopt (optional, CLI only) |
| `fast-check`, `vitest`, Playwright, `pixelmatch`, `ssim.js`, Vite, `esbuild`, `tsx`, pnpm, TypeScript | MIT / MIT / Apache-2.0 / ISC / MIT / MIT / MIT / MIT / MIT / Apache-2.0 | tests and build | dev |
| axe-core | MPL-2.0 | accessibility tests (§13.4) | dev, never shipped |
| `@resvg/resvg-js` | MPL-2.0 (file-level copyleft) | headless SVG rendering in CI | dev, never shipped |
| OFL fonts: IM FELL Great Primer (default), EB Garamond, Cinzel | SIL OFL 1.1 | label and title faces | style assets, unmodified (§17.2) |

Nothing GPL, AGPL or LGPL is linked or bundled; CGAL is excluded (its straight skeleton is GPL). Boost.Geometry is
BSL-1.0 with no GPL parts; it is not used.

### Block S-20 — Delegated decisions (items AM-7, IMP-1, IMP-2, IMP-3, IMP-5, IMP-6, IMP-15, FTG-16, MN-2, COV-FTG-B10, COV-FTG-C03, COV-FTG-C11, COV-VG-VN-088, SCL-18, DEF-14; kernel S3; determinism S-9; pipeline S-f; rendering's decision requests)

=== REPLACE Delegated decisions (the owner deferred all judgment; each is final unless vetoed) ===

# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

For each decision: the choice, the rationale in plain words, the alternative rejected, and what it would cost to
reverse later. D-1–D-7 are the owner's adopted defaults (amendment 7), each clause now tied to its mechanism. Decisions
marked *owner veto* touch a subject the owner keeps (a purchase, the licence, new capability): the program has taken
the most option-preserving default and flags it.

| id | decision (final) | rationale in plain words | alternative rejected | cost to reverse |
|---|---|---|---|---|
| D-1 | **Default look = clean ink (MFCG family) with IM FELL Great Primer as the label face; second preset FTG-like `lit`, on Canvas2D like every preset; a hatched preset for the close-up; the house style (the owner's "later") = our own third preset `house`, drafted as three candidate style sheets at M3b and chosen by the owner on the §13.6 panel at M4, `ink` staying the default unless the owner picks otherwise** | the ink map is the most legible and best-loved default and the cheapest to prove first; `lit` on the one drawing path really is "a style file, not an architecture" (IMP-3, VIS-7); the face is MFCG's label signature and an OFL asset outside the clean room (IMP-15) | lit default; a WebGL2 reference backend for `lit` | low (a style file) |
| D-2 | **Era and region centre of gravity = high-to-late medieval Western Europe (12th–15th c.)**, as presets the corpus phase re-signs through §13.9; walled shares and stage rows per rung MFCG-calibrated (≈ 0.9 of buildings inside the outermost wall, §4.2 S2), FTG's lower walled share reachable as a preset | the owner's adopted default; "the corpus refines later" is the owner's staging, and §13.9 is its interface | a hard-coded culture; a 0.35–0.5 walled share (MFCG's shanty case) | low (table rows) |
| D-3 | **Realism in the base; fantasy only as named toggles, each off by default**: floating islands and their conjured rivers (II.6), fantasy sewers (II.6), the game-system stat pack (D-32), the `night` preset's lights | the owner's default; realism is what the corpus can calibrate | fantasy defaults | low |
| D-4 | **Browser-first embeddable TypeScript library with an app on top; permissive dependencies only (§17.4's checker over the production closure); one generation worker, a derivation pool and a tile worker behind a handle-based API (§11.2)** | one language; the reference evidence is JavaScript-shaped; embedding needs no server; permissive licences keep our own licence open (D-22) | a Rust / WASM core from day one; server-side generation | medium after M1 for the core language — a measured hot loop may get a byte-identical WebAssembly accelerator (§3.7), there is no WASM kernel; low for the worker model |
| D-5 | **"Mastered" = the owner's eye on side-by-sides against MFCG and FTG at town / city / metropolis, run through the written blind protocol of §13.6 (seeds fixed beforehand, matched sizes, three questions, a pass rule, a filed record), plus the parity numbers of §13.5** | the owner's default; numbers alone miss charm, eyes alone miss statistics; the protocol makes the eye repeatable and unsteerable (IMP-4, IMP-11) | numbers only; an eye with no protocol | none |
| D-6 | **Original English-fantasy naming; setting packs in §10.4's format, the base shipping one pack; further packs are data** | the owner's default and the clean-room rule; "setting packs later" now means later contents, not a later format (DEF-10) | reuse of reference corpora | low |
| D-7 | **Improvement weighting: realism, editability, plot texture first; speed and export next; novelty last — and it orders the build: the editing core (M2a) before the second preset and the rest of parity (M2b)** | the owner's default; it decides ties in the build plan, and now visibly does (IMP-3) | speed first; editing after the lit look | none |
| D-8 | **3-D export = glTF 2.0 (OBJ secondary) and CityJSON 2.0** | the widest tool support for VTT and game users; CityJSON's integer vertices with a transform carry our centimetre lattice losslessly, so its exporter is thin (§11.1) | CityJSON left for later | low (an exporter) |
| D-9 | **"No restart path" is a design property; the acceptance numbers are requested-feature delivery by ladder tier (a tier-6 omission of a requested feature is a failure, target 0; degraded ≤ 5 %) and p95 time per delivered town on MFCG's worst configurations (≤ 1.0 s against MFCG's 3.7–4.0 s)** | "0 restarts" was true by construction and measured nothing; these two numbers compare with what a user gets from MFCG (IMP-5); a bounded restart tier would still hide feasibility bugs, and the omission count exposes them | "0 whole-map restarts" as the number; a p99-bounded restart tier | low (criteria) |
| D-10 | **Simulation depth in the base = roster, context vector, allocation and placement, households and lazy people, with the relation store's schema in the base from M1; schedules, calendar, factions' meetings, events, economy and personality in the optional `@plat/sim` module, its own milestone M4b** (IMPROVEMENTS J-S kept; the product proposal's widening rejected) | the map never waits for a simulation; with the schema in the base the module materialises data without changing the model (FTG-9); its own milestone keeps it from crowding hardening (IMP-3) | schedules and the calendar in the first release; the module inside M4 | low |
| D-11 | **Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles once per session; per-instance placement is the stamp (§8.10)** | matching the recorded scatter costs nothing per tree once the tiles exist; a measurement (NN p1, pair-correlation) may relax it | k = 30; per-entity Bridson sampling | trivial (a table value) |
| D-12 | **Integer centimetres centred on (0, 0), +y north; range invariant 2²³ cm** | exact geometry on every machine; FTG's proven convention; nine-fold headroom over the largest frame at the extreme aspect (§3.2 (1)) | millimetres; doubles | high after M1 |
| D-13 | **Five refinement levels as views of one arena per layer (level-tagged edges, per-level face records), a separate arena per layer and per sky island, unions for multi-face entities** | locality of edits and regeneration is a tree walk; nesting exact by construction; each boundary stored once; sky and underground never cut ground faces | one flat subdivision; five separate per-level DCELs (nesting cannot hold on the lattice, GEO-1) | high after M1 |
| D-14 | **Booleans, buffers and bands on the kernel's own arrangement — one engine on every host; Clipper2 and `polygon-clipping` as CI oracles only; the straight skeleton built in-house under §3.8's contract and validator; the M0 bars and pre-decided fallbacks in §3.7–§3.8 (Clipper2-WASM as the single engine; the downgrades as the default paths)** | one engine means one digest on every host (GEO-9); no permissive, mature skeleton library exists | CGAL (GPL); a JS skeleton port; a runtime pure-JS boolean fallback (a second engine, different digests) | low (adapters) |
| D-15 | **xoshiro128\*\* streams keyed from structured components (seed key, entity lineage, stage, concern, reroll, attempt, epoch, salt), the lineage separate from the address id, concern ids append-only; Enter = a new document with seed + 1** | locality, feature growth without reshuffling across concerns, epochs; no BigInt | one global stream; a counter-based RNG | high after M1 |
| D-16 | **The fused layout = routed arterials between named destinations; reservations and gate sites at S3 and each enceinte traced before its stage's growth; inside the walls district-scale secondaries plus NG's bent-cut infill with the measured construction, outside them FTG-shaped growth with explicit legality and stage regimes; districts grown over the coarse skeleton, feature-named and grouped into quarters; frontage-first plots with the granularity law** | the owner's "best of both" under the tiebreaker: constraints and metres for the streets, MFCG's street signature inside the walls, FTG's accretion outside; M0 measures the risk and M1 re-measures it on real terrain | the four rejected shapes of §1.4 and §4.4; FTG growth down to block scale inside the walls | high (the layout core) — hence M0 and M1's gate |
| D-17 | **Enceinte = gate sites picked and castle and plaza reserved at S3; each enceinte traced from its stage's provisional boundary pulled to defensible ground before that stage's streets grow; gates exactly at arterial crossings with exact N by the measured gate law; gate plazas; castle by score with the inside / on-enceinte / outside option; an open waterfront by default** | defence as an explicit constraint; MFCG's wall-first order and gate identity; FTG's staging | a wall on cell edges; tower-per-vertex; walls traced after growth | low |
| D-18 | **Budgets per §12.3: model p95 TOWN 100 ms, CITY 300 ms, METROPOLIS 800 ms with the derivation pool as the primary configuration and the single worker as the pre-decided fallback (measured at M1 at CITY and at M2b at METROPOLIS); first map per rung ≤ 150 ms / 0.4 s / 1 s; a per-building cost ≈ 2 × MFCG's at TOWN and CITY and ≈ 5 × at METROPOLIS declared as a trade (§12.9)** | the one-click floor and the references' bars; the trade buys terrain, plots, site plans, roster placement, greenery and labels MFCG does not build, which D-7 ranks above speed | workers assumed without a merge protocol; matching MFCG's per-building cost by dropping plot detail | low (numbers), medium (architecture if M0 or M1 miss) |
| D-19 | **Codename PLAT and `@plat/*`; terrain resolution 5 / 8 / 10 m; frame areas 4 / 25 / 64 km² with aspect 0.5–2 (square by default) + 30 % margin, the side scaling with √(population ÷ target); min edge 25 cm with attraction at 26 cm; min plot width 2.5 m; min plot angle 12°; the district band derived from the count law; the gate law `round(1 + 0.47 √A_ha)`; stage counts and walled shares per rung (§1.1, §4.2 S2); shadows off by default with a fixed sun; heights always populated; tower spacing and every band as calibratable table rows** | defaults and calibration anchors that cost nothing to change | — | trivial (data) |
| D-20 | **Effort ≈ 150–200 expert person-weeks: the base 136–182 (the content module included) plus stage 2 14–18, re-derived line by line in §16; the cuts that would reduce it to ≈ 133–172 recorded for the owner's veto, not applied** | the earlier 100–130 left out content authoring, the app, the test rig and FTG's non-map scope (IMP-2); the owner asked that nothing be deferred | 100–130 pw; cutting scope to hold it | none (an estimate) |
| D-21 | **The document persists a base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and every version in the CLI; an upgrade is an undoable event** | loads are instant, links never silently change, and a mismatch is always reported and resolved once | events only; "the last N minor versions stay replayable" with no mechanism | low |
| D-22 | **Our own licence: proprietary, all rights reserved to the owner, until the owner chooses (§17.3); no dependency may constrain the choice** — *owner veto* | an open licence cannot be withdrawn once granted, while a proprietary default can be opened by one act — the most option-preserving default (DEF-14) | leaving it undecided; an open licence by default | low (a licence file) until code is published |
| D-23 | **Deterministic transcendentals through `dmath` — our TypeScript port of the fdlibm 5.3 routines with Sun's notice — with an allowlist lint (exact `Math` members only; `**` only with literal exponents 0–4, rewritten to multiplications; `ratio()` for computed divisors) that also scans vendored dependencies** | the same digest on every engine; a vetted algorithm, and no 94-package `@stdlib` closure (IMP-14); the lint makes the rule enforceable (J-11) | in-house polynomial approximations; trusting the engine's `Math.*`; the `@stdlib` packages | low (one adapter and one lint rule) |
| D-24 | **Goldens are stage-isolated (new stage code on frozen upstream outputs) and built at M1; end-to-end goldens are re-signed only with a cascade record; every milestone files its declared shifts; a same-seed output change is never let ride silently** | the owner's non-negotiable as a mechanism from the first viewable town, not from hardening (LC-19) | one whole-model hash per seed; goldens at M4 | trivial (test tooling) |
| D-25 | **The evolution hook in the base is exactly one built and tested path — add a growth stage to an existing town, with wall → ring road as a typed conversion — plus the epoch key component and the transformation-event vocabulary, decline included; the evolution engine is staged by the owner with its interfaces concrete (§4.11)** | it is the path "regenerate this area" uses, so it costs little and proves the persisted plat extends; the owner's roadmap puts the engine later | no incremental path; the full engine now | low |
| D-26 | **Identity: opaque lineage-hash addresses with survival and succession (§6.3)** | an address must not depend on creation order, lazily derived districts or worker scheduling (J-DET-1) | hierarchical creation-order ids; a per-kind counter | high after M1 |
| D-27 | **Work limits, never wall clock, bound every output-affecting budget (§5.1)** | a watchdog would make one seed give different towns on different machines (J-DET-3) | wall-clock watchdogs | low |
| D-28 | **The model digest is a Merkle root over the eager model's content only, maintained at batch commit (§6.2)** | the canonical serialisation costs ≈ 1.2 s per CITY model and provenance must not move goldens (J-DET-4, J-DET-5) | hashing the canonical serialisation per batch | high after M1 |
| D-29 | **The clean-room chain (§17.1): implementers read only this document and a checked implementer digest; the product in its own repository `plat/` with a path rule; reference numbers only through `baselines.json`; a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by origin; a seat ledger in `CLEAN-ROOM.md`** | the owner's clean-room ruling must hold by mechanism, not intention; the findings quote GPL code and reference data, so they cannot be implementer inputs (IMP-1) | findings and captures as implementer inputs; path-only CI rules | low (process) — in place before M0's code |
| D-30 | **Every threshold has a number now: reference-settable bands by §13.5's band rule from `baselines.json`; the thresholds no reference can set in §13.7, each with a provisional number, the first milestone that confirms it and a pre-decided fallback; no placeholder can gate or pass** | "set later by the corpus" left M2 unable to exit or invited silent promotion of placeholders (IMP-6, DEF-1) | J-T placeholders until the corpus phase | trivial (data) |
| D-31 | **Matched references: TOWN = MFCG size 40 and FTG BIG_TOWN (≈ 5 600); CITY = MFCG size 80 and FTG BIG_CITY (24 500); METROPOLIS = MFCG size 130. FTG's premium METROPOLIS is not purchased: the METROPOLIS side-by-side uses MFCG 130, with FTG's published metropolis pictures as an unscored reference card; a one-month premium FTG subscription for one measured capture is the owner's option** — *owner veto* | matched on building count (MN-2) and population (FTG-16); the free captures cover two of three rungs; only the owner can make a purchase | a CITY-only FTG comparison; a purchase by the program | low (one capture day if the owner buys) |
| D-32 | **Economy (resource chains, items and services with prices, stock per building, global price edits), personality (trait sentences, motivation, mannerism, hobbies), education gated by class and a stat block with profession modifiers are `@plat/sim` content (M4b), derived from their keys with our own authored tables; their schema stubs are in the base (§10.3); the stat block is a named game-system pack, off by default (D-3); the family-tree view is in the app (§14)** — *owner veto: new capability rather than repair* | the owner's definition names FTG-class "roster-first population and economy", FTG parity includes them, and the module keeps them off the one-click path (COV-FTG-B10, C03, C11) | leaving them unrecorded; putting them on the one-click path | low (module content; dropping it removes ≈ 2–4 pw from M4b) |
| D-33 | **The two ladders meet at 1 500 inhabitants: the village ladder THORP → HAMLET → VILLAGE ends there and the base's TOWN band starts there (1 500–10 000); size within a rung follows population; per-rung rows live in `ladder.json` (§1.1); a request below 1 500 routes to the village product (clamped and reported while none is registered), one above 120 000 is clamped and reported** | the owner's two ladders and "size follows population"; no gap or overlap exactly where MFCG's creator admits its small towns fail (COV-VG-VN-088, AM-4) | an undefined boundary; a 2 000 floor leaving a gap below the base | trivial (data) |
| D-34 | **Three CI tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h) on a stated runner; the oracle once per sequence; an over-budget job is split, never re-capped (§13.8)** | a 10–20 CPU-hour rig cannot gate a change; the owner's efficiency standard asks for structural shortening (SCL-18) | one full run per change | trivial |
| D-35 | **Build order: M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset, METROPOLIS) → M3a full editing, migration and API → M3b exports, forms and should-have tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; nothing leaves the program** | the owner's weighting orders the build; M3 was overloaded (≈ 31–40 pw itemised against 20–26); the module needs the relation store first (IMP-3) | the lit look before editing; moving exports, forms or the module out of the program | low (a plan) |

### Block S-21 — Judgment calls (J-6, J-7, J-10, J-12, J-14, J-15, J-16 amended; the kernel's J-K, determinism's J-DET, pipeline's J-P and rendering's J-R rows added as their drafts asked; this area's J-S rows)

=== REPLACE Judgment calls ("chose X over Y because Z"; each vetoable) ===

# Judgment calls ("chose X over Y because Z"; each vetoable)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

J-1 – J-18 are the synthesis seat's (seven amended by the fix-all pass). The rows added on 2026-09-25 keep their
area prefixes — J-K (kernel), J-DET (determinism), J-P (pipeline), J-R (rendering), J-S (scope) — because the blocks
that made them cite them by those ids; the full reasoning of each sits in the section it names.

| id | call |
|---|---|
| J-1 | Chose the kernel proposal as the base over the improvement winner because it wins two lenses and the sum, ships the fusion as the owner stated it, and its defects are paragraph-sized repairs; the product proposal's mechanisms were grafted, not its skeleton (`docs/design/judging.md` §2). |
| J-2 | Chose to type districts and solve the fields **before** the bent-cut infill (the parity judge's sequencing repair) over reading the stage regime alone, because a poor quarter's blocks should be smaller than a rich one's and the stage regime is only the floor. |
| J-3 | Chose FTG-shaped growth for the secondary streets outside the walls over least-cost connectors (the pipeline proposal's default) because the owner asked for the best of both and the measured suburb signature (cul-de-sacs, 30 m streets, 14.7 m lots) is unreachable by routing alone; inside the walls the bent cut does the street work (J-P4); the fusion gate guards the cost. |
| J-4 | Chose plat-tree scoping as the primary locality mechanism with the dependency graph as audit and optimisation, over the DAG as primary, because tree scoping is sound by over-invalidation and the DAG is sound only when every spatial read is declared — the CI oracle proves that per stage before the DAG is trusted. |
| J-5 | Chose a 128-bit key hash and 32-bit-lane mixing over SplitMix64 or a 32-bit key because JavaScript lacks native 64-bit multiply and a 32-bit key collides with probability ≈ 0.25 per city (the engineering judge's arithmetic). |
| J-6 | Chose `FaceRef` unions with L2 half-corridor strips and junction wedges over restricting the nesting invariant, because a strict tree makes scoped regeneration and containment proofs trivial and the union costs one indirection; nesting is exact by construction because the five levels are views of one arena per layer (J-K1), checked by index, not by coordinates. |
| J-7 | Chose batched transactions (stage / district / block / edit) over per-insertion transactions; static indexes are rebuilt at stage end per partition, never per batch (§3.3, J-K6), because per-batch rebuilds of a growing level cost seconds (1.9 s at S10, 13.4 s at S11 at CITY, measured). |
| J-8 | Chose a snapshot-plus-replay document over events-only because loads must be instant and a version may be unavailable; the digest verification keeps events-only's honesty. |
| J-9 | Chose IMPROVEMENTS' J-S scope for the simulation over the product proposal's widening because the one-click path must never pay for it and nothing is lost by building the module second (D-10). |
| J-10 | Chose Poisson k = 50 over k = 30 because the critic ruled the references evaluate 50 and scatter is render-time; the ranked tiles are built once per session (§8.10); a measurement, not an assertion, may relax it (D-11). |
| J-11 | Chose `dmath` from an fdlibm port over in-house polynomials because a vetted algorithm is less risk for the same determinism; the lint makes the choice enforceable; the port is our own TypeScript of fdlibm 5.3 (D-23). |
| J-12 | Chose one generation worker plus a derivation pool for the per-district stages, with the merge protocol written first (§4.1) and the pool primary once M1 measures identical digests for pool sizes 0–3 (§12.3), over worker pools assumed in the budget with parallel mutation of one subdivision unspecified, because after the eager allocation the per-district stages are pure functions of eager upstream state and their own sub-streams. |
| J-13 | Chose to write the greenery rule table, the monotone-control mechanism, the control-surface budget, the forms catalogue schema and the intent-expansion example in this document over deferring them to validation, because the improvement judge listed them as gaps no proposal fills and each is a must-have letter or a keep-test. |
| J-14 | Chose to schedule CONFIDENCE §6's experiments #5 and #10 (no recording needed) and #2 as milestone M-1 — with FTG's two free sizes, MFCG's five-seed sweep, the variety baselines and the clean-room inputs (§16) — over starting M0 with placeholder constants, because they set the stop laws and bands every spike is measured against and cost two to three person-weeks. |
| J-15 | Chose to re-cut M1 to the viewable town only and to state 150–200 pw (D-20) over the proposals' 60–90 and the synthesis draft's 100–130, because the per-reference floors bound the base from below and the content, app and rig lines were missing (IMP-2). |
| J-16 | Chose the anchor rule with `supersedes` on top of lineage-hash addresses (J-DET-1) over ids by creation order alone, because edits and regeneration must keep addressable ids (the assignment hook) while a feature added inside a stage may legitimately shift its siblings — stated as a declared golden shift, never a silent one. |
| J-17 | Chose to keep the kernel's `PLAT` codename over a new name because the winner's structure is the document's structure; the name is a placeholder (D-19). |
| J-18 | Chose to run this lane on a relayed status question (recorded in §0.3 and `docs/design/judging.md` §0) over returning without files, because returning would have sent eleven downstream seats at a missing document. |
| J-K1 | Chose one arena per layer with the five levels as views over five separate per-level DCELs, because nesting cannot hold on the lattice across separate structures (GEO-1) and each boundary is stored once (§2.2). |
| J-K2 | Chose vertex, segment and stretch attraction at 26 cm over a 5 cm weld beside a 25 cm minimum edge, because the 5–25 cm band was neither welded nor legal (GEO-3) (§3.6). |
| J-K3 | Chose role and owner tables with resolved views over stored face and edge slots in entities, because stored slots go stale on every edit (GEO-5) (§2.2). |
| J-K4 | Chose booleans, buffers and bands on the kernel's own arrangement, one engine on every host, over Clipper2-WASM with a pure-JS fallback, because two engines give two digests for one seed (GEO-9) (§3.7). |
| J-K5 | Chose an in-house straight skeleton under a numeric contract and a four-part validator over adopting a port, because no permissive, mature port exists and every output must be checkable (§3.8). |
| J-K6 | Chose static indexes rebuilt at stage end per partition with id-sorted queries over per-batch rebuilds, because per-batch rebuilds of a growing level cost seconds (§3.3). |
| J-K7 | Chose `Int32` centimetre heights relative to a per-document datum over `Int16` heights above a fixed datum, because `Int16` wraps above ≈ 327 m of relief (GEO-15) (§2.3). |
| J-K8 | Chose no WASM kernel — with a byte-identical WebAssembly accelerator for a measured hot loop as the pre-decided fallback — over a WASM kernel behind the façade, because a second implementation must reproduce every output bit and the TypeScript kernel keeps one engine (§3.7). |
| J-DET-1 | Chose opaque address ids whose token is the hash of the entity's lineage key over hierarchical creation-order ids and over a per-kind high-water counter, because a hierarchical id breaks under re-parenting and recycles dead ids, and a counter depends on the order in which lazily derived districts and parallel workers mint, while a lineage-hash token is the same in any order; the tombstone check keeps "never reused" (§6.3). |
| J-DET-2 | Chose to keep the lineage (and so the draws) only for entities that survive un-derived, and to hand only the address to an anchor-matched successor, over carrying the lineage in both cases, because New random must really re-roll its scope while names, locks and assignments must follow the building the user means (§6.3). |
| J-DET-3 | Chose operation-count work limits for every output-affecting budget over wall-clock watchdogs, because a watchdog makes one seed give different towns on slow, throttled or busy machines; wall clock only postpones or resumes lazy work (§5.1). |
| J-DET-4 | Chose a Merkle digest maintained at batch commit over hashing the canonical serialisation, because the serialisation costs ≈ 1.2 s per CITY model (measured, SCL-1) and would run thousands of times per generation; the canonical text stays for golden files and exports (§6.2). |
| J-DET-5 | Chose to keep version stamps, rule slices, derivation inputs and deps out of the model digest (a separate provenance digest) over hashing whole entity records, because otherwise a release that changes no output changes every digest (§2.8, §6.2). |
| J-DET-6 | Chose one ordered replay fold — drawn constraints, epochs, rebases and upgrades applied at their log positions — over hoisting drawn constraints before their stage, because hoisting makes every reload regenerate a different town than the one on screen; hoisting survives only as the explicit "Rebuild around my drawings" rebase (§7.2, §7.4). |
| J-DET-7 | Chose a `rebase` event when a saved state is kept over leaving the recipe and log unchanged, because otherwise every later load, undo and migration silently switches back to the other state (§2.9). |
| J-DET-8 | Chose scoped undo records and cost-driven checkpoints over an eight-deep ring of whole-document snapshots, because one CITY snapshot is ≈ 80 MB (SCL-5) against a ≈ 100 MB heap (§7.4). |
| J-DET-9 | Chose output versions that bump only with a declared shift, with N−1 and N−2 retained as lazy browser chunks and every version installable in the Node CLI, over "the last N minor generator versions stay replayable", because a server-less browser library needs a concrete shipping mechanism and most releases change no output (§6.4). |
| J-DET-10 | Chose to make an edited attribute implicitly pinned (IMPROVEMENTS O9's rule) over protecting only locked entities, because users refuse to reroll districts holding work they "already baked in" and FTG's regenerate deletes it (§7.2). |
| J-DET-11 | Chose lock > assignment in the precedence order over assignment > lock, because the owner's hook asks precedence over the generator's class rules, not over the user's own locks; a host that must override a lock sends an unlock first, which the log records (§7.7). |
| J-DET-12 | Chose to recompute the prosperity, density and greenery fields on load over persisting their rasters, because the rasters gzip to 2.7–11 MB (SCL-11) against 3–8 MB document budgets while the drivers and strokes that define them are tiny (§2.9). |
| J-DET-13 | Chose to state control monotonicity and continuity over 50 seeds per step with a fixed ε formula over a per-seed ε, because the design's discrete stop rules make single seeds jump by construction; a per-seed test would fail or be tuned to pass (§7.8). |
| J-DET-14 | Chose to make `drawBoundary` snap to whole L1 cells over creating invisible `district_bound` edges through blocks, because every seam edge must be typed street, water, wall, field, cliff or frame for stage 2's `SeamContract` (§7.1). |
| J-DET-15 | Chose MFCG's whole-map Rotate as a view rotation with a compass that points at model north by default (and can be decoupled) over rotating model coordinates, because wind, sun, aspect and slope read model north and GeoJSON must stay in the model frame (§7.1). |
| J-P1 | Chose feature-named district kinds over class-typed kinds because MFCG's live taxonomy dropped class wards and its townspeople lived where they worked (§2.5). |
| J-P2 | Chose a quarter level for city-LOD labels over thinning district labels, because MFCG labels every one of its larger districts (§4.5). |
| J-P3 | Chose reservations and gate sites at S3 and the trace before each stage's growth over claims and walls after growth, because nothing then has to cut, gate or reroute streets and the fabric inherits the wall (§4.2, §4.4). |
| J-P4 | Chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG growth everywhere, because MFCG's measured intramural signature comes from recursion on the district polygon (§4.4). |
| J-P5 | Chose MFCG's walled share over 0.35–0.5, because a mostly-extramural default reproduces MFCG's shanty case and a compact walled town with ribbons is the constrained medieval pattern (§4.2 S2). |
| J-P6 | Chose plot counts per band with a measured plot share over one area per class with `1 − 0.38`, because 38 % is footprint over lot and plots span 11× in size across bands (§4.2 S2). |
| J-P7 | Chose a network-travel-cost level set with an anisotropy row over isotropic distance-cost, because FTG's creator retired the circular look and its towns are measurably longer along main roads (§4.4). |
| J-P8 | Chose a mean-reverting curvature walk with goal reversion over a random walk on the rate of turn, because the latter curls 600 m streets through 73–108° (§4.4; `docs/validation/bench/fixall_pipeline_ou_heading.out`). |
| J-P9 | Chose an eager town-wide allocation, a laziness contract and a complete city-LOD first paint over lazy per-district S10–S14, because the lazy tier made the town depend on viewing order and the owner wants footprints at city zoom (§4.1). |
| J-P10 | Chose to specify the district pool and its merge protocol now (§4.1) over leaving pools behind a later measured need; reconciled with J-R18 and D-18 by the fix-all pass: the pool is the primary configuration once M1 measures identical digests for pool sizes 0–3 and CITY p95 ≤ 300 ms, and the single worker is the pre-decided fallback (§12.3), with M2b measuring METROPOLIS single-threaded. |
| J-P11 | Chose to forbid bent-cut continuation across district boundaries over two-district transactions (§4.6). |
| J-P12 | Chose the vector coast with contours clipped to land over a shoreline extracted as the raster's level set, because it keeps centimetre precision and makes the invariant constructive (§4.2 S1). |
| J-P13 | Chose per-frontage regions from the block's straight skeleton over FTG's reflex pre-cut as the primary construction, keeping the pre-cut as its fallback, because regions are exact on curves (§4.7 S10). |
| J-P14 | Chose row footprints by clipping over fitted rectangles, because party walls must be one shared edge on bent and curved frontages (§4.7 S11). |
| J-P15 | Chose to decide the deep-block interior in S8 by band shares over S10 inserting lanes, because S10 cannot write L1 and dense quarters must keep their courts (§4.6). |
| J-P16 | Chose NG's perpendicular-ray far side with a pre-decided fallback chain over an open rule (§4.6 step 4). |
| J-P17 | Chose wings stored in the base over single-wing L / T (§2.6). |
| J-P18 | Chose an `outline()` / `compose()` split with a cost contract over one lazy `compose` (§2.6). |
| J-P19 | Chose `baseCm` = the highest sample plus a plinth, with foundation skirts and stepped wings, over the lowest sample, because no floor may be buried and nothing may float (§2.6). |
| J-P20 | Chose a sequential grid roster keyed by building ordinal over a capped fixed-point iteration, because only the former is prefix-stable in population (§10.2). |
| J-P21 | Chose a base-schema relation store materialised by the module over relations re-derived on every read (§10.1). |
| J-P22 | Chose pinning by explicit edit only over "pinned once seen", FTG's own rule (§10.3). |
| J-P23 | Chose close-up refinement as derived data and template replacement as a model edit over refinements entering the model (II.4). |
| J-P24 | Chose the gate law `round(1 + 0.47 √A_ha)` fitted on MFCG's size sweep over `2 + round(0.9 √(A/10))`, because it reproduces MFCG's 5 / 8 / 12 / 18 gates and the old law gives 4 / 6 / 9 / 12 (`docs/validation/bench/fixall_pipeline_mfcg_fits.out`). |
| J-P25 | Chose an open waterfront as the default over a sea wall, because MFCG's coastal wall stops at the water and FTG's captured wall is an open chain (§2.7). |
| J-R1 | Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread ≈ 140 ms to deserialise while typed arrays transfer in constant time and slice cheaply into deltas (§8.1). |
| J-R2 | Chose world-aligned tile rasters over per-district rasters because district boundaries are streets and a district bitmap cannot follow continuous zoom (§8.1). |
| J-R3 | Chose low-chroma value steps over saturated hues for the default roles because the restraint clause asks for one ink and a few roles, and eight tones meet every contrast floor (§8.2). |
| J-R4 | Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG and print identical, removes the duplicate render path both creators warned about, and every part of the lit look has a vector or per-tile form within the tile budgets; normal-mapped relief is the only loss (§8.2). |
| J-R5 | Chose the ground tone over kerb hairlines as the city band's figure-ground because a kerb line doubles the linework at city zoom and fights the casing idiom; hairlines are the pre-decided fallback (§8.5). |
| J-R6 | Chose not to draw avenue trees at the city band over a thin green line inside the corridor because at city zoom a corridor is ≈ 2 px, where a line fuses with the casing and adds a ninth tone (§8.5). |
| J-R7 | Chose no S9 preview over a block preview because §12.5's first-map targets are met without one and a preview's figure-ground differs from the finished picture (§8.5). |
| J-R8 | Chose settling on exact 2^¼ zoom stops over re-rastering at arbitrary scales because an arbitrary-scale raster defeats the cache and the per-stop label placement; the settled scale is within ± 9 % of the requested one (§8.8). |
| J-R9 | Chose Canvas2D label tiles over SDF text because once tiles are composited text never needs the GPU, and one text path keeps text identical on every output (§8.9). |
| J-R10 | Chose a handle-and-tiles worker boundary over sending the document or mark objects to the main thread because structured-cloning a CITY entity table costs ≈ 162 ms and a 60 000-mark list ≈ 140 ms, while bitmaps and typed arrays transfer in constant time (§8.9). |
| J-R11 | Chose stamped, ranked scatter tiles over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer band by construction (§8.10). |
| J-R12 | Chose label placement as view data measured with our own font metrics over placement in the model, because collisions change with zoom inside a band, and over the host's text engine, because engines shape text differently (§9.1). |
| J-R13 | Chose a minimal own emblem generator plus import over import only and over a full blazon engine, because the legend should carry an emblem in one click at a fraction of a person-week and heraldic depth is not a map-parity item (§9.5). |
| J-R14 | Chose to build CityJSON over leaving it for later because its integer-vertex-plus-transform encoding carries our centimetre lattice losslessly, so the exporter is thin, and it gives GIS users a standard 3-D path (§11.1). |
| J-R15 | Chose host-as-store over a sync service of our own because the product is a standalone, backend-free library, a host already owns accounts and storage, and §11.3's protocol makes any host a correct store (§11.5). |
| J-R16 | Chose a transport-agnostic bridge plus the static VTT exports over a Roll20 extension because an extension needs an account and store publishing outside a standalone program, and FTG's extension only relays the same messages (§11.5). |
| J-R17 | Chose a per-building cost of ≈ 57–74 µs at p95 over matching MFCG's 12–39 µs because PLAT builds what MFCG does not, which D-7 ranks above speed, and every rung still shows its first map within one second (§12.9). |
| J-R18 | Chose the derivation pool as the primary configuration over a single worker because after the eager allocation the per-district stages are pure functions of eager upstream state and their own sub-streams, so they run in parallel without shared writes (§12.9). |
| J-S1 | Chose to tag every acceptance letter C / P / O and to require a P or O letter for each first-weighted improvement over citing the existing numbers as evidence of improvement, because most of them hold by construction and would pass while the town reads worse than MFCG or FTG (IMP-4; §15.2). |
| J-S2 | Chose a written, blind side-by-side protocol with the owner as the declared rater over tester counts and an unstructured "owner's eye", because the program has one human and an eye without fixed seeds, blinding and a pass rule can be steered (IMP-4, IMP-11; §13.6). |
| J-S3 | Chose to give every threshold a number now, with a confirming milestone and a pre-decided fallback, over placeholders set by the corpus phase, because the corpus comes after the whole standalone program and placeholders either block a milestone or get promoted silently (IMP-6; §13.7). |
| J-S4 | Chose byte identity for Regenerate (keep settings) and a band from K ≥ 50 from-scratch generations for New random over two-sample KS tests per regeneration, because the KS criterion fails a perfect regenerator (IMP-7; §15.2 O9 c). |
| J-S5 | Chose requested-feature delivery by tier and time on MFCG's worst configurations over "0 whole-map restarts" as the acceptance number, because the latter is true by construction (IMP-5; D-9). |
| J-S6 | Chose to state the honest 150–200 pw and record the possible cuts for the owner's veto over cutting scope to keep 100–130, because the owner asked that nothing be deferred (IMP-2; D-20). |
| J-S7 | Chose to put the editing core before the second preset, split M3 and give the module its own milestone over moving exports, forms and the module out of the base release as the red team proposed, because the owner's no-defer rule keeps them in the program while D-7 still orders the work (IMP-3; D-35). |
| J-S8 | Chose implementer inputs = this document plus a checked digest, a separate repository and a numbers-only baseline file over path-based CI rules alone, because the findings themselves quote GPL code and reference creative data (IMP-1; D-29). |
| J-S9 | Chose a hashed deny-list of non-dictionary tokens, ordered 3-grams, colour values and file bytes over a plain word list, because a plain list would copy the reference content into the product repository and would trip on ordinary words any medieval roster shares (§17.1). |
| J-S10 | Chose a proprietary default licence over leaving the licence undecided or defaulting to an open licence, because it keeps every option for the owner (DEF-14; D-22). |
| J-S11 | Chose FTG's free BIG_TOWN and BIG_CITY sizes and no purchase over a CITY-only FTG comparison or a purchase by the program, because a purchase is the owner's alone and the free sizes cover two of three rungs (FTG-16; D-31). |
| J-S12 | Chose 1 500 inhabitants as both the base's floor and the village ceiling over a 2 000 clamp, because a gap would leave requests between the ladders unanswered exactly where MFCG's creator admits its small towns fail (COV-VG-VN-088; D-33). |
| J-S13 | Chose modest per-rung granularity and greenery modifiers in one `RungProfile` table over identical rows at every rung, because the owner asked for them to be defined per rung and land pressure rises with town size (AM-4; §1.1). |
| J-S14 | Chose to put economy, personality, stats and the family tree in the module with base schema stubs, flagged for the owner's veto, over leaving them unrecorded or putting them on the one-click path (COV-FTG-B10, C03, C11; D-32). |
| J-S15 | Chose IM FELL Great Primer as the default label face over a different serif chosen for "clean-room distance", because fonts are OFL assets outside the clean-room rule and the face belongs to the adopted ink look (IMP-15; §17.2). |
| J-S16 | Chose three CI tiers with fixed wall-clock budgets over one full run per change, because the full rig costs 10–20 CPU-hours (SCL-18; D-34). |
| J-S17 | Chose to resample curves at 10 m and compare junction-to-junction runs over per-vertex turn angles and edge lengths, because the latter measure the polyline representation, not the town (FTG-15; §13.5). |
| J-S18 | Chose MFCG's input idiom, stated in an editable keymap, over leaving hotkeys unstated in the app (COV-MFCG-L08; §14). |
| J-S19 | Chose WCAG 2.2 AA for the app's chrome with the gazetteer and "features in view" lists as the non-visual route to the map over no accessibility statement, because FTG's users asked for list access and the map canvas alone reaches no one who cannot see it (COV-FTG-A24; §14). |

### Block S-22 — the Deferrals section (items DEF-1, DEF-9, DEF-14; and, as their owners asked, the removal of DEF-2 – DEF-8, DEF-10 – DEF-13, DEF-15 – DEF-17)

=== REPLACE Deferrals (documented, not bugs to re-find) ===

# Deferrals — none (owner rule, 2026-09-25)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r1)

The owner ruled on 2026-09-25: "I would prefer if there is no defer and everything is fixed as soon as possible." This
document defers nothing. Every entry of the former list is decided below, with the section that now carries its
mechanism; the subjects the owner's own roadmap puts in a later stage are listed separately, each with the concrete
hooks the base carries now (documented, not bugs to re-find).

**Formerly deferred, now decided**

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

**Staged by the owner (hooks concrete now)**

| subject (the owner's roadmap stage) | the hooks the base carries now | where |
|---|---|---|
| stage 2 — neighbourhood composition (after the base) | `SeamContract` on every district from M1; the `FabricStrategy` slot; the neighbourhood band; the `hatched` programs | PART II, §4.12 |
| stage 3 — manor-style building compositions (after stage 2) | `BuildingGenerator.outline` / `compose` with a cost contract; wings and heights in the base; the stage-3 intake measurement | §2.6, §8.6 |
| the village product (after the town / city) | stages ordered by declared I/O; `EnceinteStrategy` and the enceinte input of every network strategy; tracker-network and houses-along-ways registrations; a village as one district; the ladder rows and the 1 500 boundary | PART III, §1.1, §1.6, §4.12, D-33 |
| sewers and floating islands (toggles, after the city is mastered) | one arena per layer and per sky island; `LayerSpec`; drainage queryable per cell; `SkyIsland` and `Tunnel` records; `SkyStrategy`, `IslandRule` and `SewerStrategy` registrations; the sky close-up call; shadows onto the ground layer | II.6, §2.1, §2.3, §2.7, §8.4 |
| the evolution engine (much later) | epoch events and key components; `EpochInputs`, `EvolutionStrategy`; the `ConversionOp` kinds, decline included; the one built growth path | §4.11, §1.5, D-25 |
| calibration against the historical corpus (after the standalone generators) | `CorpusAdapter`; corpus rows in `baselines.json`; `CalibrationRun` as table-version bumps with declared shifts; provenance on every table cell | §13.9, §7.6 |
| SettlementForge inputs (after the generators are mastered) | the host-input contract and the host bridge | §11.4, §11.3 |

## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

**Milestone names.** This area's §16 splits M2 into **M2a** (the editing core) and **M2b** (the base at parity) and M3
into **M3a** (full editing, migration, the API and the bridge) and **M3b** (exports, forms, should-have tiers), and adds
**M4b** (the content module). Every other area's block that names a milestone must use the new names; the requests
below list each occurrence found.

### 3.1 To KERNEL

| # | section | request | items |
|---|---|---|---|
| K-S1 | §3.7, §3.8 | No text change requested. For the record: §16 M0's exit cites "§3.7's bars (i)–(ii) and §3.8's bar" and §13.1 cites "the §3.8 validator (connected; independent cycles = holes)" and "`snap` refuses ± 2²³, NaN, ± ∞" — please keep those names stable in the integrated text. | GEO-12, kernel S8, S11 |

### 3.2 To DETERMINISM

| # | section | request | items |
|---|---|---|---|
| D-S1 | §7.1 (`EditEvent`), §7.4 | Add a `{ t: 'revert'; id: Id }` event — "reset to generated": one logged, undoable event that applies, in reverse order, the inverses of every event in the log whose target is the entity (its own edits only; edits to other entities stay). It is what ctrl / cmd+click invokes (§14's keymap, MFCG's ctrl-click reset). Add its lifecycle row to §7.4. | COV-MFCG-L08 |
| D-S2 | §6.4 (permalinks) | Links and documents made before output version 1 (fixed at M4's exit) carry `preview: true`, and the app shows the preview notice of §13.3; the flag disappears for links made from output version 1 on. | LC-19 |
| D-S3 | §6.4, §7.4, §7.5, and wherever the blocks say "M3" for retention, rebase, upgrade events and the N−1 / N−2 replay test | "M3" → "M3a". Undo records, checkpoints, the CITY district undo ≤ 30 ms and per-edit validation flat ± 20 % are measured at **M2a** (the editing core), as §16 now schedules them. | IMP-3, LC-14, determinism S-8 |
| D-S4 | §7.8 | The control registry's fields also feed `@plat/docs`' generated reference pages (label, range, unit, output metric, consuming stage, locality class, documentation anchor) — one sentence. | COV-FTG-A25 |

### 3.3 To PIPELINE

| # | section | request | items |
|---|---|---|---|
| P-S1 | §4.1 (the worker bullet) | Align with D-18 and §12.3: the derivation pool is the primary configuration once M1 measures CITY p95 ≤ 300 ms with identical digests for pool sizes 0–3; the single worker is the pre-decided fallback; M2b's single-threaded METROPOLIS measurement stays as a second check. "M2" → "M2b". | DEF-16, D-18, J-P10 |
| P-S2 | §4.7 S10, §4.9 S12b | One sentence each: the granularity rows are scaled by the rung's `RungProfile.granularity` (frontage × and depth × on every band; the rich band's join maximum + `joinMaxDelta`), and the greenery rows by `RungProfile.greenery` (park area per 1 000 ×, the edge-green or orchard probability, the private-green shift), §1.1; `GranularityLaw.bands` takes the rung (§14). | AM-4 |
| P-S3 | §10.3 (and §2.7's content entities) | Add the D-32 schema stubs, materialised by `@plat/sim`: `ItemRow { id; category; unit; basePrice /* in the setting pack's coin unit */; providedBy?: string[] /* roster class ids */ }`, `ServiceRow { id; providedBy: string[]; basePrice }`, `Stock { building: Id; item: string; qty: number }`, `PriceTable { multiplier: number; overrides: Record<string, number> }` (global price edits are `editTable` events), `PersonTraits { traits: string[]; motivation: string; mannerism: string; hobbies: string[]; education: string }` derived from the person key, and `StatBlockPack { id; attributes: string[]; base: Record<string, [number, number]>; professionModifiers: Record<string, Record<string, number>> }` — a named game-system pack, off by default; all tables our own. The relation store answers the family-tree query of §14. | COV-FTG-B10, COV-FTG-C03, COV-FTG-C11 |
| P-S4 | §10.1 | "delivered in the base release cycle after M2" → "delivered at milestone M4b (§16), after the relation store's schema, which is in the base from M1". | IMP-3, D-10 |
| P-S5 | PART III item 5 | "VILLAGE ≈ 400–1 500 inhabitants" → "VILLAGE ≈ 400 up to (not including) 1 500"; "a request above the village ceiling goes to the base" → "a request of 1 500 or more is a base TOWN (§1.1, D-33); below 1 500 `LadderRouter` routes to the village product". | COV-VG-VN-088, D-33 |
| P-S6 | §4.4 (the fusion-gate paragraph) | Add: "The gate is repeated at M1 on B-CITY-lite's river, coast and relief configurations with the reordered stages, with M1's pre-decided fallbacks (§16)." | IMP-13 |
| P-S7 | §4.2 S0 | The blueprint's size: the population chooses the rung by its band (§1.1); a rung without a population takes the rung's target; a rung with a population outside its band is an F-EDIT conflict offering the right rung. | AM-4, COV-VG-VN-088 |
| P-S8 | every pipeline block that names "M2" for parity work (greenery, the METROPOLIS measurement, the pool switch) or "M3" | "M2" → "M2b"; "M3" → "M3a" for editing, migration and the bridge, "M3b" for exports and forms. | IMP-3 |

### 3.4 To RENDERING

| # | section | request | items |
|---|---|---|---|
| R-S1 | §12.2 (ladder table and the clamp bullet) | TOWN's band is **1 500–10 000**; "a request below 2 000 people is clamped to 2 000" → "a request below 1 500 is routed to the village product by `LadderRouter` (§1.1), and clamped to 1 500 and reported while none is registered" (D-33). | COV-VG-VN-088, AM-4 |
| R-S2 | §12.4 (S9 row and the stated-assumptions paragraph) | Follow the kernel's GEO-9 decision (the kernel's own request R1 to you): S9 = "booleans and bands on the kernel's arrangement (§3.7)", and drop "WebAssembly is part of the embed contract … the pure-JS boolean fallback … 2.5×"; the report still names the engine. | GEO-9, SCL-22, D-14 |
| R-S3 | §11.2 (`PlatApi`, `Query`) | `regenerate(h, scope, mode: 'keep' \| 'newRandom')` plus `adjust(h, param, value)` (determinism S-6; §7.1's named actions); add `Query` kinds `{ kind: 'relations'; person: Id; up: number; down: number }` (the family-tree view) and `{ kind: 'inView'; view: ViewHandle }` (the "features in view" list, §14). | COV-FTG-C11, COV-FTG-A24, determinism S-6 |
| R-S4 | §9.3 | State O13 (a)'s curvature limit as §13.7's number — a label's spine turns ≤ 45° over any window of the label's length — or give your own number, and §13.7 follows it. | IMP-10, IMP-6 |
| R-S5 | §8.9, §8.2, §12 and every rendering block that names "M2" (the `lit` preset, the relief tier, the compositor measurement) or "M3" (the handle API, the bridge and resolver, CityJSON, dd2vtt, the bridge convergence test) | "M2" → "M2b"; "M3" → "M3a" for the handle API, the bridge, the resolver and the convergence test, "M3b" for CityJSON and dd2vtt. | IMP-3 |
| R-S6 | §8.2 (`ink` preset row), §9.2 | The default label face is IM FELL Great Primer (§17.2); remove any remaining "non-IM-Fell default serif" wording. | IMP-15 |

## 4. Coordination record — every request the other areas sent to this area, and where it is carried

| from | request | carried in | note |
|---|---|---|---|
| kernel S1 | J-K1 – J-K8 | S-21 | kept with their prefixes |
| kernel S2 | J-6, J-7 amendments | S-21 | as asked |
| kernel S3 | D-4, D-12, D-13, D-14, D-19 | S-20 | as asked |
| kernel S4 | delete three deferrals | S-22 | now in "formerly deferred, now decided" |
| kernel S5 | §1.7 numeric-core and language rows | S-8 | as asked |
| kernel S6 | §14 kernel line, testkit oracles, `Scope`, `Kernel` façade, `StageContext.plats`, `Stage` work limit | S-15 | `Scope`'s region carries a `PlatKey` and a level, as kernel S6 and determinism S-6 both ask |
| kernel S7 | §17 Clipper2 and `polygon-clipping` rows, skeleton decided, published algorithms | S-19 | as asked |
| kernel S8 | §13.1 properties | S-9 | as asked, plus GEO-12's generators |
| kernel S9 | §13.2 index-work cost test; S8 ≡ S9 contract | S-10 | as asked |
| kernel S10 | O4 (e), O3 (a) | S-17 | as asked |
| kernel S11 | §16 M0 content, exit and estimate; out-of-scope list | S-18 | M0 is 9–12 pw (the kernel's 8–11 plus the determinism and site-and-fields spikes) |
| kernel S12 | §15.1 FTG C4 | S-16 | as asked |
| determinism S-1 | the one-page summary sentence | S-1 | as asked, in plain words |
| determinism S-2 | §0.4 amendment 5 landing | S-2 | as asked |
| determinism S-3 | §13.1 plain-roof downgrade, no roof line outside the footprint | S-9 | as asked |
| determinism S-4 | §13.2 tests and B-EDIT fixtures | S-10 | as asked |
| determinism S-5 | §13.3 stage-isolated goldens from M1 | S-11 | as asked |
| determinism S-6 | §14 `Stage`, `StageContext`, `Scope`, `EditEngine`, `PlatApi`, lint, `ContentProvider` | S-15; R-S3 | `PlatApi` stays §11.2's (a pointer in §14); its `regenerate` / `adjust` change is R-S3 to rendering |
| determinism S-7 | §15.2 O2 (b), (c), (e), O9 (c), (e), (f), O16 (e) | S-17 | as asked; O2 (c)'s rates also listed in §13.7 |
| determinism S-8 | §16 M0, M1, M3, M4 additions | S-18 | modified: undo records, checkpoints, the district undo and flat per-edit validation go to M2a (the editing core now precedes M3); rebase, upgrade and retention stay in M3a |
| determinism S-9 | D-15, D-21, D-23, D-24; new D-26 – D-28 | S-20 | as asked |
| determinism S-10 | J-DET-1 – J-DET-15 | S-21 | verbatim |
| determinism S-11 | §17 vendored-and-scanned note | S-19 (§17.4) | as asked |
| pipeline S-a | §1.2, §1.4, §1.5, §1.6 | S-4 – S-7 | as asked |
| pipeline S-b | §13.5 new rows | S-13 | every row asked for is present (street signature, walled share and ribbons, outline anisotropy, deep interiors, vacancy runs, growth drift, use mix, castle band, roads per walled stage, quays, substitution residue, junctions per preset, quarter labels) |
| pipeline S-c | §13.1 / §13.2 property tests | S-10 | placed in §13.2's stage property tests |
| pipeline S-d | §15.1 / §15.2 | S-16, S-17 | as asked |
| pipeline S-e | §16 M-1, M0 (b), M0 (c), M1, M2, M4; staged list; setting packs | S-18 | "M2" is M2b |
| pipeline S-f | D-2, D-10, D-17, D-18 / J-12, D-19, D-25; Deferrals | S-20, S-21, S-22 | D-18 follows rendering's pool-primary configuration; J-P10 is reconciled with J-R18 in S-21 and P-S1 asks §4.1 to match |
| pipeline S-g | J-P1 – J-P25 | S-21 | verbatim except J-P10 (reconciled) |
| pipeline S-h | §14 | S-15 | `Household.members` is §2.7's (no §14 text) |
| pipeline S-i | §0.4 landings | S-2 | as asked |
| pipeline S-j | the base floor as the village ceiling | S-3, D-33; R-S1, P-S5 | 1 500 exactly, both ladders |
| rendering §1.7 | backends, text, runtime, persistence rows | S-8 | as asked |
| rendering §1.1 / AM-4 | population bands and the 120 000 cap | S-3 | TOWN's floor is 1 500, not 2 000 (D-33; R-S1) |
| rendering §1.4 | units row | S-5 | as asked |
| rendering §13.2 | memory test, per-rung cost laws on ≥ 6 sizes, scope invariance | S-10 | as asked |
| rendering §13.4 | §8.3, §9.4 and §8.5 checks in B-ZOOM | S-12 | as asked |
| rendering §13.5 | matched timing row, draw-style order parity and symbolisation, labels, tree statistics | S-13 | as asked |
| rendering §14 | display-list, style, API, bridge, resolver, label and layer types; package lines | S-15 | pointers to §8.1, §8.2, §8.4, §9.1, §11.2 – §11.5; `TileBackend` and `VectorBackend` replace the old `Backend` |
| rendering §15.1 | MFCG B19, C1, D3, E1, E2, E4; FTG D2, D6, G2; VG R1 – R17 | S-16 | as asked |
| rendering §15.2 | O12 (b), (f), (g), O19 (e), O11 (h), O12 extras, O13 (a), O3 (d) | S-17 | as asked |
| rendering §16 | M0 site-and-fields spike; M1 exits; M2 `lit`, relief, compositor; M3 exporters, bridge, handle API; the suburb against FTG; out-of-scope list | S-18, S-14 (§13.6 item 3) | M2 → M2b; M3 → M3a (API, bridge) and M3b (exporters) |
| rendering Deferrals | remove five entries | S-22 | as asked |
| rendering decisions | D-1, D-8, D-11, D-18 | S-20 | as asked |
| rendering judgment calls | one row per "chose" | S-21 | J-R1 – J-R18 |
| rendering §17 | fonts per IMP-15, dependency rows | S-19 | as asked |
| rendering FTG-22, SCL-21 | bridge vocabulary; statistics core record | S-19 (§17.1 item 9), S-10 | as asked |

## 5. CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read at source or executed by this seat): every quotation of `docs/ARCHITECTURE.md` and of the other
areas' landed drafts that these blocks rely on; every red-team and audit claim cited in §1, read at its detail section;
the MFCG sweep numbers used in §1.1, §1.4 and §13.5 (sizes 40 / 80 / 130: 1 475 / 5 242 / 13 091 buildings, walled
shares 0.87–0.92, cover 0.60–0.64, gates 5 / 8 / 12, districts 9 / 12 / 18, app timings 57 / 131 / 156 ms, the 4.00 m
unit), read in `captures/mfcg/exports-sweep-2026-09-25/README.md`; CONFIDENCE §1's per-reference effort figures; the
IMPROVEMENTS acceptance clauses restored in §15.2, read in their paragraphs; the effort arithmetic of §16 (the line table
and the milestone table both sum to 150–200 pw, the base to 136–182, the cut list to 17–28 pw — executed,
`scratchpad/effort_check.out`); the judgment-table row count (103 rows: 18 + 8 + 15 + 25 + 18 + 19, counted).

**PLAUSIBLE** (this seat's reasoning; no PLAT code exists): every new number without a reference source — the rung
modifiers (§1.1), the §13.7 thresholds, the CI tier budgets and their compute estimates, the degraded-delivery band, the
MFCG-worst-configuration target — each carries its confirming milestone and pre-decided fallback; the effort lines; the
licence facts not re-fetched this session (they rest on redteam-improve §5's registry reads of 2026-09-25); that the
hashed deny-list catches copying without tripping on ordinary words (its 3-gram rule is the mechanism, measured at
M-1 on the digest); and every disposition, which is this seat's judgement under the owner's no-defer rule.
