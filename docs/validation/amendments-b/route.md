# Amendments b — ROUTE (items 8–31): state, home, references, staging, decisions, rule families

> PENDING FABLE REVIEW — Opus-produced (amendments-b/route, run ahead of workflows/09-amendments-b.js; its Route seat
> resumes from this file and route.json).

> PROGRESS (kill-safe ledger of the 2026-09-27 update, item 28 (f)): ITEM 28 (f): planned — route.md (the item 28 (f)
> subsection; summary row 28; the status and document lines; rule family 7; the entity registry; stale-text rows; the
> reading list; CONFIRMED / PLAUSIBLE; the router note) and route.json object 28 | done — the item 28 (f) subsection;
> the summary row, status, document and counts lines, rule family 7, the registry, stale rows, reading list, CONFIRMED /
> PLAUSIBLE and item 31's cross-reference; route.json object 28; the router note. COMPLETE.

Status: COMPLETE (2026-09-26). Lane `amendments-b/route` (Opus router). The Route seat of `workflows/09-amendments-b.js`
resumes from this file and `route.json`; launch 09 with items `8-31`: J33 added 28; item 29 was appended on
2026-09-26 evening while this route ran; items 30 and 31 were appended after its first landing and routed in updates
(31 from its final, corrected text; its geometry-floor paragraph, added at 20:59, in a further update). On 2026-09-27
item 28 gained (f), the interior ladder (the owner's message of about 00:50); it is routed in item 28's own section,
`#### Item 28 (f)`, in a further update. No new part is touched.

**Document read.** `docs/ARCHITECTURE.md`, sha256 `7a4e19dbae731d3ea655e21a4fc97e3eaa2fd852017176a1bb4cc5e15d4ec762`
(9 668 lines, 140 headings), snapshotted at 19:58 while the consistency pass's r3 repairs were still being assembled.
Every quotation and line reference below is from that snapshot. The r3 repairs change subsection text only (the lane log
names §4.2, §5.2, §6.1, §9.5, §12.6, §13.2, §16), never headings, so the homes named here do not move. Editors must
re-read their sections from the live file before writing blocks. At landing (20:32) the live file still had that sha256
and 140 headings. `consistency/assemble-r3` then logged LANDED at 20:33. At the item-30 update (20:46) the live file's
sha256 was still `7a4e19db…c4ec762`, with its 140 headings identical to the snapshot's, so the document routed here is
the assembled r3 document, and every line reference stands. At the floor update (21:14) the sha256 was unchanged.
At the item 28 (f) update (2026-09-27) the live file's sha256 is `1dbfd9d4…` (9 667 lines, 140 headings). It differs
from the snapshot at the banner line and at two lines of §9.5 and §12.6: the manager's hand-applied r3 leftovers, as
the emulation seat's report records. (f)'s quotations are from the live file and from the landed block files.

**Counts.** 24 items (8–31): 1 SATISFIED (9), 6 ABSENT (11, 12, 13, 14, 15 — contradicted, 18 — contradicted), 17
PARTIAL (31's evolution rule contradicted in §4.11 and §2.5's derivation-record bullet; its geometry floor absent). Home
parts: pipeline 17, determinism 3, model 2, scope 1 (plus 9, satisfied at §1.1). The kernel carries no home item.
Rendering carries only item 30's second home: §9.2's knowledge label policy, by R7. Item 28 stays PARTIAL; its (f)
is ABSENT in the live document, and its inputs are carried by landed blocks.

**Read completely for this route:** `docs/AMENDMENTS-2026-09-25b.md` (items 8–31; items 29–31 were read after they were
appended; 31 in its final text, the floor paragraph included); `docs/OWNER-INSTRUCTIONS-2026-09-25.md`;
`docs/DEFINITION.md`; the title block, the one-page summary and §0; the heading tree (140 headings, by grep); §1; §2
whole (§2.1–§2.9); §3.4; §4.1–§4.7, §4.9–§4.12 (§4.6 read for item 30); §5.2; §6.1–§6.2 and §6.3's identity rules;
§7.1–§7.3 (the fates item and the operator table), §7.4's lifecycle table, §7.6–§7.8; §8.2 (paint programs), §8.3,
§8.4–§8.7; §9 whole (read for item 30); §10; §11; §12.2 and §12.7–§12.8 (stage-3 rows); §13.5, §13.6 (3), §13.9 and
§13.2's structure; §14; §15.2; §16; §17; PART II (II.1–II.6); PART III; the Delegated decisions; the Judgment-calls
index; *Staged by the owner's roadmap*; Appendix A; the "Home rules" of `docs/validation/consistency/canon.md` (and
`canon.json → parts`); `docs/PROGRESS.md` J27–J36 (J37–J45 at the updates); `research/findings/dwellings-posts.md` §0
and `research/findings/dwellings-exports.md` §0; `workflows/09-amendments-b.js` (the part keys, block protocol and route
schema). §3 other than §3.4, §5 other than §5.2, §6.4–§6.5, §8.1, §8.8–§8.10 and §13.1/§13.3/§13.4/§13.7/§13.8 were not
read in full: no item's mechanism lives there. The route names them only as places that point to a mechanism.

## How to read this file

* **Parts** are `workflows/09`'s part keys and follow the canon's home rules (R1–R13):
  - `model` is §2;
  - `kernel` is §3;
  - `pipeline` is §4, §10, PART II (II.6 included) and PART III;
  - `determinism` is §5–§7;
  - `rendering` is §8, §9, §11 and §12;
  - `scope` is the title and one-page summary, §0, §1, §13–§17, the Delegated decisions, the Judgment-calls index,
    *Staged by the owner's roadmap* and Appendix A.
* **State** judges the design against the owner's words first and the program's drafted consequences second:
  - SATISFIED: the rule is already there, quoted;
  - PARTIAL: what is there is quoted, and what is missing is listed;
  - ABSENT: the design does not have it.
* **Home** is the one section that must state the item's mechanism: fields, stage step, rule table, interface, and the
  test named for scope. **Referencing** sections carry only a pointer, a hook field or a one-line rule. Same-part
  referencing sections are listed too, because the home editor writes them.
* **BASE** means built in the program. **STAGED-HOOK** means the owner's roadmap places the engine later, and the base
  carries the fields, interfaces, invariants and hook tests now. That is staging, not a deferral.
* **Decisions touched** are quoted from the Delegated decisions, the Judgment-calls index (the full text is in
  `docs/ARCHITECTURE-RATIONALE.md` Part A) or `docs/PROGRESS.md`. The home editor rules on each one and records a
  `J-A<item>` row.
* Every item also gets a row in a landing table for items 8–28 (scope, §0; see *Cross-cutting duties*). That is why
  scope is a referencing part for every item.

## Summary table

| item | subject | state | home (part · section) | referencing parts | base / staged | rule family |
|---|---|---|---|---|---|---|
| 8 | decline and regrowth hooks | PARTIAL | pipeline · §4.11 | model, determinism, rendering, scope | STAGED-HOOK (the regrowth-first rule also binds the base's grow path) | evolution |
| 9 | size set by population within each tier | **SATISFIED** | scope · §1.1 (no change) | scope (landing row only) | BASE | — |
| 10 | islands are a product of prosperity | PARTIAL | pipeline · II.6 | model, determinism, scope | STAGED-HOOK | islands; evolution |
| 11 | the underground fades like the walls | ABSENT | pipeline · II.6 | model, determinism, rendering, scope | STAGED-HOOK | sewers; evolution |
| 12 | underground neighbourhoods along the sewers | ABSENT | pipeline · II.6 | model, kernel, determinism, rendering, scope | STAGED-HOOK | sewers |
| 13 | islands only in cities and metropolises | ABSENT | pipeline · II.6 | determinism, scope | STAGED-HOOK | islands |
| 14 | sewers by tier | ABSENT | pipeline · II.6 | determinism, rendering, scope | STAGED-HOOK | sewers |
| 15 | not every city has islands | ABSENT (contradicted) | pipeline · II.6 | determinism, rendering, scope | STAGED-HOOK | islands |
| 16 | assignments obey spatial and supply-chain rules | PARTIAL | pipeline · §4.7 (S10b) | model, determinism, rendering, scope | BASE | assignments |
| 17 | uses move as the city grows and declines | PARTIAL | pipeline · §4.11 | model, determinism, rendering, scope | BASE + STAGED-HOOK | assignments; evolution |
| 18 | a plot's buildings mutate to a new designation | ABSENT (contradicted) | pipeline · §4.7 (S11) | model, determinism, scope | BASE + STAGED-HOOK | assignments; floor plan; dossier |
| 19 | every designation scales with prosperity | PARTIAL | pipeline · §4.7 (S11) | model, determinism, rendering, scope | BASE | assignments; emulation; floor plan |
| 20 | one-way data flow; the dossier is the authority | PARTIAL | determinism · §7.7 | model, pipeline, rendering, scope | BASE (SettlementForge's mapping staged) | dossier |
| 21 | licence: this module is GPL-3 | PARTIAL | scope · §17.3 | kernel, rendering | BASE | dossier (the host boundary) |
| 22 | dossier changes mutate the map, never re-roll it | PARTIAL | determinism · §7.7 | model, pipeline, rendering, scope | BASE (mapping and epoch clause staged) | dossier; evolution; assignments |
| 23 | emulation-first defaults; no hard-coded universals | PARTIAL | determinism · §7.6 | pipeline, scope | BASE | emulation |
| 24 | several markets, as MFCG and FTG do | PARTIAL | pipeline · §4.2 (S2, S3) | model, scope | BASE | emulation |
| 25 | terrain and water can change, slowly | PARTIAL | pipeline · §4.11 | model, determinism, scope | STAGED-HOOK (conversion kinds usable by hand in the base) | evolution; emulation |
| 26 | hinterland decided with the town, drawn after it | PARTIAL | pipeline · §4.9 | rendering (only if the order changes), scope | BASE | emulation; assignments (supply chains) |
| 27 | prosperity maps onto the references' wealth models | PARTIAL | pipeline · §4.5 | model, scope | BASE | emulation |
| 28 | floor plans and elaboration by click; (f) the interior ladder — the interior has no floor | PARTIAL ((f) ABSENT in the live document; its inputs are in landed blocks) | model · §2.6 (with §2.8–§2.9) | kernel, pipeline, determinism, rendering, scope | STAGED-HOOK (the plan rung and its interior re-cut) + BASE (the click policy and the cache; (f)'s rows, unit field and `stale` marking) | floor plan; with 31 (rung 1's `relet`) |
| 29 | entrances and basements | PARTIAL | model · §2.6 | pipeline, determinism, rendering, scope | BASE + STAGED-HOOK (the plan's consumption) | floor plan; assignments; sewers |
| 30 | hidden plots and clandestine places | PARTIAL | pipeline · §4.6 (S8's deep-interior rule, with §4.7 S10); the label policy's second home: rendering · §9.2 | model, kernel, determinism, rendering, scope | BASE + STAGED-HOOK (sealing and reopening by the engine) | evolution; assignments; floor plan; dossier |
| 31 | prosperity change drives fusion and splitting — a slow, asymmetric ladder with a geometry floor | PARTIAL (the evolution rule is contradicted; the floor is absent) | pipeline · §4.11 (Survivors, the floor included), with §4.7 S10 (7)'s orderings and §4.5's middle band | model, determinism, rendering, scope | STAGED-HOOK (trigger, durations, churn, the floor applied at epochs) + BASE (re-cut, lineage, due mark, ladder and replaceability rows, households per building, edit kinds, `builtBand` and the floor rule) | evolution; assignments; emulation (27's middle band); with 30 and 28 |

**Load per part.** Home items do not repeat in the same part's referencing list. Item 30 has two homes for two facts:
pipeline §4.6 (hidden plots) and rendering §9.2 (the knowledge label policy).

| part | home items | referencing items (other parts' homes) |
|---|---|---|
| model | 28, 29 | 8, 10, 11, 12, 16, 17, 18, 19, 20, 22, 24, 25, 27, 30, 31 |
| kernel | — | 12, 21, 28, 30 |
| pipeline | 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27, 30, 31 | 20, 22, 23, 28, 29 |
| determinism | 20, 22, 23 | 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 28, 29, 30, 31 |
| rendering | 30 (second home: §9.2's knowledge label policy) | 8, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22, 26, 28, 29, 31 |
| scope | 21 | 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 |

**For the manager: the pipeline part is heavy.** It holds 17 home items, because by R3 every stage rule, the evolution
hook (§4.11) and the staged layers (II.6) are the pipeline's. The canon forces this assignment; one editor is not
required. If one seat cannot hold it, split pipeline along section lines, so that no two seats write one subsection:

* **pipeline-A** — §4.1–§4.10 and §10: items 16, 18, 19, 24, 26, 27 and 30.
* **pipeline-B** — §4.11, §4.12, PART II and PART III: items 8, 10, 11, 12, 13, 14, 15, 17, 25 and 31.

Their mutual one-liners travel as cross-part notes:
* 8 needs lines in §4.5 and §4.7 S10;
* 17 needs a line in §10.3;
* 16 and 18 need lines in §4.11.

The decision is the manager's (J-row).

## Items

### Item 8 — Decline and regrowth are part of evolution (hooks now; the engine stays staged)

**(a) Owner's words.** "consider what regression would look like … what if something happens that forces it to shrink
organically … it's this combination of growth, regression and growth where appropriate." The war example is
hypothetical and is NOT written into the design. The drafted consequences (a)–(h) are:
* (a) a lifecycle ladder for buildings, and one for walls and gates;
* (b) decline strips the fabric in persistence order, as a tendency;
* (c) exposure is weighted by drivers, not a fixed order;
* (d) a salvage material ledger;
* (e) regrowth reoccupies the old plan first;
* (f) population drives change with lag and memory;
* (g) everything is deterministic, and ruins keep their ids;
* (h) style classes for declined fabric and superseded walls.

**(b) State: PARTIAL.**

*Already there:*
* §2.8: ``type Existence = 'generated'|'built'|'altered'|'converted'|'abandoned'|'decayed'|'ruined'|'demolished'``.
* §2.8, "The decline hooks": "`abandoned`, `decayed` and `ruined` exist in the base schema with their conversions
  (§4.11's `ConversionOp`), which a user can apply by hand in the base (§7.1); a ruined building keeps its footprint and
  heights and draws with the ruin program and the `none` roof kind (§8.2)."
* §4.11's `ConversionOp`: ``{ op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */;
  building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }``, plus
  `wallToWay`, `gateToJunction`, `demolish`, `amalgamate` and `rebuild`.
* §4.11: "the sequential roster (a population fall selects its suffix in reverse ordinal order; a decline rule table —
  periphery, lowest value, noxious and extramural first, never locked or assigned — chooses which buildings empty)".
* §4.11 caps change: "at most a table share of a district's plots transforms per epoch (default 10 % per decade)".
* §4.11: "nothing that survives is re-rolled".
* §8.2: the `ruin` program, and the tone overrides for `existence = abandoned` and `existence = decayed`.

*Missing:*
* (a) The states vacant, derelict (roofless), robbed-or-cleared (a footprint trace) and reused (garden, orchard, field,
  or a new building on the old foundations). `clear` exists as an operation but no state names the trace.
* (a) Wall and gate states: in use → neglected → breached or partly dismantled → superseded, with the old line
  persisting. Only `contractWall` and `wallToWay` exist.
* (b) The persistence order as weighted tendencies: uses, then buildings, then plot boundaries; streets and walls
  last; terrain and water slowest.
* (c) §4.11's decline rule table is a FIXED order ("… first"), which J27 and J28 require to become weighted drivers with
  chance. Also missing: fields and gardens still worked after their dwellings are gone, and the prosperity field
  contracting and concentrating as surviving households absorb neighbouring plots.
* (d) The salvage ledger. `robStone` exists with no ledger and no effect on where repairs and new building happen.
* (e) Regrowth on the old plan. §4.11 places delta demand "only on new or transformed plots".
* (f) Lag and memory.
* (g) The identity of a cleared trace is unstated.
* (h) Style classes for vacant, derelict, robbed, reused and superseded walls.

**(c) Home: pipeline, §4.11** — "Incremental mode, transformations and conversions (the evolution hook; one path built
in the base)". State once:
* the decline tendency table the `EvolutionStrategy` reads: the persistence-order weights, the exposure drivers read
  from the context vector (undefended suburbs, marginal ground, the intramural periphery; a resilient core around
  markets, churches and the castle) and a chance term;
* the salvage rule: cleared material feeds nearby repairs and building;
* the regrowth-first rule. It also binds the base's built `grow-by-stage` path: delta demand goes first to vacant,
  derelict and cleared plots of the old plan and to the old street lines, before new faces;
* the lag rule;
* the new `ConversionOp` kinds.

**(d) Referencing.**
* **model §2.8** — the building lifecycle ladder occupied → vacant → derelict → ruin → robbed or cleared (trace) →
  reused, as `Existence` values or a mapping onto them (the editor's ruling). Transitions are a data table. A ruined,
  robbed or cleared building stays a live record with its address until it is reused or demolished (no tombstone).
  Add `reusedAs` and `formerUse` traces.
* **model §2.7** — `Enceinte` gains a wall state (in use, neglected, breached or partly dismantled, superseded) and a
  `supersededBy` link to the shorter inner ring; the old ring's line persists as a trace. Add a town-level salvage
  `MaterialLedger` record: material, quantity, source entity, epoch.
* **model §2.6** — the derelict (roofless) state uses `RoofSpec.kind 'none'`, which already exists for ruins. A building
  raised on old foundations references its predecessor.
* **pipeline §4.5, §4.7 (S10) and §10.2** (same part) — one line each:
  - §4.5: the field contracts and concentrates under decline, re-evaluated by an epoch as today;
  - §4.7 S10: vacant plots merge into gardens and fields (`plotToGarden`, `amalgamate`);
  - §10.2: a population fall selects the roster suffix in reverse order (this exists), with the vacancy lag of §4.11.
* **determinism §6.3** — declined entities keep address and lineage (ruins, robbed and cleared traces), and regrowth on
  an old plot re-uses the plot's address.
* **determinism §6.1** — any new decline or salvage concern is appended to the registry (or reuses `epoch.transform`).
* **determinism §7.1 and §7.4** — `convert` covers the new kinds. Edit-target rows are added for buildings (vacate,
  derelict, rob, clear, reuse), walls (neglect, breach, contract) and plots (`plotToGarden`). The `convert` lifecycle
  row lists the new kinds with their undo.
* **rendering §8.2** — style classes, by extending the `ruin` program and its two tone overrides: vacant, derelict
  (roofless), ruined, robbed or cleared (a footprint trace), reused fabric, and neglected, breached or superseded walls
  with the old line persisting.
* **scope**:
  - *Staged by the owner's roadmap*, the evolution row: the new hooks;
  - D-25's paragraph: the transformation vocabulary now names them;
  - §13.2 hook tests: each decline conversion applied by hand undoes exactly; the grow path fills vacant old-plan plots
    before new faces; ruins keep their addresses;
  - §15.2's hooks row;
  - §16: price the hooks at M4 beside the incremental path;
  - the landing row.

**(e) STAGED-HOOK.** The engine is roadmap-staged. The states, conversion kinds, tables, ledger record and style
classes land now as hooks. Regrowth-first is enforced now on the one built path.

**(f) Decisions touched.**
* D-25: "Exactly one built and tested incremental path in the base — add a growth stage to an existing town, with wall
  → ring road as a typed conversion — plus the epoch key component and the transformation-event vocabulary, decline
  included; the evolution engine is staged by the owner with its interfaces concrete (§4.11)."
* §4.11's decline table: "periphery, lowest value, noxious and extramural first, never locked or assigned".
  - J27: "amendment 8's fixed decline order … → weighted tendencies".
  - J28: "8 decline tendencies = evolution-stage only".
* §4.11: "Siting across epochs places only delta demand, only on new or transformed plots" — this collides with (e).
* §4.11's rate cap: "default 10 % per decade".
* J-DET-33: "a lifecycle event block ordered by `seq`, undone and redone with its target".

The editor rules:
1. whether new `Existence` values are added or mapped onto the existing ones;
2. whether a cleared trace is a live record;
3. whether locked and assigned entities stay exempt from decline (today "never locked or assigned").

**(g) Rule family:** evolution — 8, 11, 17, 22, 25, with 10's island decline. One persistence-order and tendency table
serves them all.

### Item 9 — Size is set by population, even within each tier

**(a) Owner's words.** "the actual size of the town, even within each tier is determined by population."

**(b) State: SATISFIED.**
* §1.1: "**Size within a rung follows population:** the request's population chooses the rung whose band contains it —
  … — and every quantity below it (roster, stage budgets, district count, frame, plots) is computed from that
  population, never from the rung's target".
* §1.1: "**Budgets inside a rung.** Because size follows population, a rung's budgets are laws of its building count,
  never one number per rung".
* §12.2: "Within a rung the frame area scales with population ÷ target (the side with its square root)".
* §4.5: the district count law `N_d = round(3.5 · √(A_ha / 10))` over the settlement's land.
* §4.9: park area "per 1 000 inhabitants".
* The drafted parity consequence holds at §13.6 (3): "Against MFCG, PLAT's population is set so that its building
  count matches MFCG's at the matched size (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at the
  capture's recorded population". The village rungs are population bands too (PART III (5)).
* The per-rung `RungProfile` modifiers and stage rows are constant inside a band and step only at a band edge. That is
  the tier model itself, not a breach.

**(c) Home: scope, §1.1.** No change.

**(d) Referencing.** Scope §0: the landing row records SATISFIED and points to §1.1 and §13.6 (3). Nothing else.

**(e) BASE.**

**(f) Decisions touched.** No ruling is needed. An optional `J-A9` row may record "already the rule". The decisions
already standing:
* D-33: "They meet at 1 500 inhabitants; size within a rung follows population; per-rung rows live in `ladder.json`";
* J-S13: "modest per-rung granularity and greenery modifiers in one `RungProfile` table";
* J-S41: "an FTG pair's PLAT side generated at the capture's recorded population";
* D-31: the matched references.

**(g) Rule family:** none. It underlies the per-rung layer rows of 13 and 14.

### Item 10 — Floating islands are a product of prosperity (magic is a supplied resource)

**(a) Owner's words.** "Floating islands are also a product of prosperity. If there is no prosperity, there is no floating
islands. Because we consider magic to be a resource that needs to constantly be supplied so the size of an island
correspond to prosperity both of the neighborhood and the overall city respectively." The program also PROPOSES, and
this is vetoable: in the evolution stage an island loses area and altitude as prosperity falls, is abandoned below the
supporting threshold and settles or falls, leaving a ruin; regrowth can raise a new island.

**(b) State: PARTIAL.**

*Already there:*
* II.6: "`prosperity` — the island carries a very prosperous neighbourhood or set of neighbourhoods: by rule, when the
  toggle is on, S7b allocates the roster's richest demand for up to three districts' worth of households to sky
  pseudo-districts instead of the ground".
* II.6: ``interface IslandRule { reason: 'prosperity'|'institution'; maxIslands: 1|2|3; elevationCmBand; areaHaBand;
  placement; terrain }``.
* §4.5 S7b (5): "A `prosperity` island's plot land is its area — drawn from `IslandRule.areaHaBand` on the `island.place`
  stream — × the dense core's plot share (0.62)".
* §2.7 has the `SkyIsland` record.

*Missing:*
* The rule that no island exists without prosperity.
* An island's size as a function of BOTH its neighbourhood's prosperity and the whole city's. Today it is a random draw
  from a band, and altitude is also a band draw.
* The rule sitting in the band-row rule family of coverage, granularity and greenery (§4.7, §4.9), reading the same
  prosperity field.
* Supply for an `institution` island.
* The proposed decline response.

**(c) Home: pipeline, II.6** (floating islands). The island supply law: an island's existence, area and altitude are
band rows interpolated along two prosperity values, the carried districts' and the town's, and are zero below the
supporting threshold. `IslandRule` becomes that table.

**(d) Referencing.**
* **pipeline §4.5 S7b (5)** (same part) — the sky allocation's land comes from II.6's law instead of an `areaHaBand`
  draw, and is made only where the law is above zero.
* **pipeline §4.9** (same part) — one line: the island rows belong to the same band-row rule family.
* **pipeline §4.11** (same part) — the proposed evolution response (island decline, abandonment, settling or falling,
  ruin; regrowth) as conversion kinds, marked vetoable.
* **model §2.7** — `SkyIsland` gains the law's inputs and outputs: the supporting prosperity of the carried districts
  and of the town, the derived area and altitude, and island lifecycle states (abandoned, settled, fallen).
* **determinism §7.1 and §7.4** — the island conversions, if adopted, are editable by hand and undoable like the decline
  kinds. The law's random term draws on `island.place` (§6.1, no new concern).
* **scope**:
  - D-3's paragraph: islands exist only where prosperity supports them;
  - *Staged by the owner's roadmap*, the sewers-and-islands row: the supply law is a hook;
  - §13.2 hook test: no island without prosperity; area monotone in each prosperity;
  - the landing row.

**(e) STAGED-HOOK.**

**(f) Decisions touched.**
* D-3: "Fantasy exists only as named toggles, each off by default: floating islands and their conjured rivers (II.6),
  fantasy sewers (II.6), the game-system stat pack (D-32), the `night` preset's lights."
* AM-2, §0.2's row 2: "floating islands (a toggle, staged by the owner)".
* II.6: "The toggle creates 1–3 islands."
* §4.5 S7b (5): the `areaHaBand` draw.
* AM-6: the prosperity field.

The editor rules:
1. whether an `institution` island is gated by prosperity too — the owner's "If there is no prosperity, there is no
   floating islands" reads as applying to every island;
2. the proposed decline response.

**(g) Rule family:** islands (10, 13, 15), with the evolution family for the decline response.

### Item 11 — The underground fades like the walls

**(a) Owner's words.** "Sewer systems and the underground like the walls fade slowly, rather some tunnels simply cave in
or become decommissioned rather than intentionally taken down by populations." The drafted lifecycle: in use →
neglected (silted) → partly caved in → collapsed or decommissioned (sealed). Tunnels are never deliberately demolished.
Abandoned tunnels persist as underground ruins that later growth may reopen. Decline follows the surface's drivers and
lag, and the underground is the slowest layer after terrain.

**(b) State: ABSENT.** Only the generic machinery exists:
* §2.7: ``interface Tunnel { id; kind: 'drain'|'main'|'culvert'|'passage'; centreline; widthCm; invert; follows?;
  outfall?; serves; chambers?; rule }`` has no condition field. By §2.4 every record embeds `Lifecycle`, so `Existence`
  applies generically.
* §4.11's decline kinds address buildings only: ``{ op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear'; building:
  Id }``.
* II.6 covers the sewer's derivation, presets and rendering, and no lifecycle.

**(c) Home: pipeline, II.6** (sewers). The underground layer's lifecycle: the states above; no epoch rule demolishes a
tunnel; abandoned tunnels persist as ruins that growth may reopen or reuse; decline uses §4.11's drivers and lag, with
the underground placed after streets and walls and before terrain in the persistence order.

**(d) Referencing.**
* **pipeline §4.11** (same part) — the persistence-order table (item 8) places the underground. Add tunnel conversion
  kinds (silt, cave in, seal or decommission, reopen, reuse); no `demolish` in the engine for tunnels.
* **model §2.7** — `Tunnel` gains a condition or lifecycle field, plus the `navigable` flag item 12 needs.
* **model §2.8** — map the tunnel states onto `Existence`, or add a per-kind state table.
* **determinism §7.1 and §7.4** — the tunnel conversions are editable by hand (an edit-target row for tunnels) and
  undoable.
* **rendering §8.2 and §8.4** — styles for silted, caved-in and sealed tunnels and for underground ruins, drawn through
  the underground layer's cut-away or overlay.
* **scope** — the staged list row; a §13.2 hook test (the tunnel conversions by hand; no evolution rule issues a tunnel
  `demolish`); the landing row.

**(e) STAGED-HOOK.**

**(f) Decisions touched.**
* D-25: the transformation vocabulary "decline included" names buildings and walls only today.
* DEF-7: sewers are owner-staged.
* D-3: "fantasy sewers (II.6)".

The editor rules whether a user's `delete` of a tunnel stays available (everything is editable) while the engine never
demolishes one.

**(g) Rule families:** sewers (11, 12, 14) and evolution (8, 11, 17, 22, 25).

### Item 12 — Underground neighbourhoods along the sewers

**(a) Owner's words.** "Some sewer systems will have underground neighborhoods, or buildings … each plot can only occupy
an adjacent space next to a sewer line (there are no sewer alleys for example) and the buildings are also adjacent flush
against the external wall of the sewer. Rule should be given that governed how they are generated." The program
PROPOSES rules (a)–(h), vetoable:
* (a) the tunnel is the underground street, with frontage plots one or two rooms deep and corner plots at junctions; no
  plot reaches a second tunnel; doors open only onto the tunnel;
* (b) only navigable tunnels qualify;
* (c) the surface constrains the underground: no rooms under rivers, the harbour or the water table, and none under
  walls, gates, the keep or cathedral foundations; a room under a surface building only as that building's cellar;
* (d) access by stairs and shafts, with air and light shafts;
* (e) occupants follow the same rule tables and prosperity field;
* (f) the lifecycle follows the sewers;
* (g) each building carries depth and ceiling height and is drawn on its own level;
* (h) generation order: city → sewer network → underground plots and buildings, from one seed, all editable.

**(b) State: ABSENT.**
* §2.1: "**Each layer has its own arena** … The base populates only `ground`; the others are schema-complete and empty."
* §2.7: `Tunnel.chambers?: FaceRef`.
* II.6's presets: "`historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the
  fantasy preset: large vaulted mains with chambers)".

There are no underground plots, buildings, access points, rules or order.

**(c) Home: pipeline, II.6** (the staged layers; a new sub-part is the editor's choice). State the owner's three
constraints as hard rules and the proposed rule set as data: a rule table plus an `UndergroundStrategy` (or a second
stage of `SewerStrategy`), registered after the sewer stage by declared I/O (§4.12).

**(d) Referencing.**
* **model §2.1** — the underground arena holds the underground neighbourhoods' plots and buildings when the staged stage
  runs (schema-complete now).
* **model §2.2 rule 1** — the level mapping in the underground arena: L1 tunnel centrelines; L2 the tunnel band (bore
  plus wall); L3 frontage plots; L4 buildings. Or the editor's alternative.
* **model §2.5, §2.6 and §2.7** — the underground `Plot` fronts a tunnel band. Buildings gain `depthCm` and `ceilingCm`
  (heights below the datum) and `cellarOf` (a surface building's own cellar or undercroft). Access points (stairs,
  shafts, wells, cellar stairs) and air and light shafts become records. `Tunnel` gains `navigable`.
* **kernel §3.7** — confirm that `bandUnion` (and the corridor use) accepts `tunnel` chains in the underground arena, so
  the tunnel's outer wall is the frontage edge the plots share ("flush against the external wall"). Otherwise name the
  operation needed.
* **determinism §5.3** — the invariants the rules imply:
  - every underground plot fronts exactly one tunnel;
  - no access-only tunnel;
  - no room under water, the harbour or the water table, or under walls, gates, the keep or cathedral foundations;
  - a room under a surface building only as its cellar;
  - at least one access per underground neighbourhood.
* **determinism §6.1** — an underground concern appended to the registry.
* **rendering §8.4** — each underground building is drawn on its own level: a `LayerSpec` per depth level, or `z` bands
  inside the underground layer.
* **rendering §11.1** — VTT gives one scene (level) per underground level with its depth; GeoJSON and CityJSON carry
  depth and ceiling height.
* **scope**:
  - §14's `StrategyRegistry` gains the underground registration;
  - the staged list row;
  - a §13.2 hook test: a schema fixture of one underground neighbourhood validates, and each §5.3 invariant has a
    fixture;
  - the landing row.

**(e) STAGED-HOOK.**

**(f) Decisions touched.**
* D-3 (the `navigable` preset is the fantasy sewer);
* DEF-7;
* D-13: "Five refinement levels as views of one arena per layer …, a separate arena per layer and per sky island";
* II.6's two presets.

The editor rules on the proposed rule set (a)–(h), which is vetoable, as `J-A12`.

**(g) Rule family:** sewers (11, 12, 14).

### Item 13 — Floating islands only in cities and metropolises

**(a) Owner's words.** "floating islands be limited only to cities and metropolises." Drafted consequences:
* the island toggle is unavailable for TOWN and for every village tier;
* within CITY and METROPOLIS, item 10's prosperity rule still decides whether islands exist;
* in the evolution stage, a settlement falling below the city band loses its islands by item 10's decline, and one
  growing into the band may gain islands.

**(b) State: ABSENT.**
* II.6: "The toggle creates 1–3 islands." — no rung condition.
* §4.5 S7b (5): "When the island toggle is on, S7b creates each sky pseudo-district's `Allocation` itself" — at any rung.

**(c) Home: pipeline, II.6.** The island rule's rung condition: islands are possible only where
`RungProfile.layers.islands` allows them — CITY and METROPOLIS. Band crossings in evolution follow item 10.

**(d) Referencing.**
* **scope §1.1** — `RungProfile` gains a per-rung layers row (islands: TOWN no, CITY yes, METROPOLIS yes). This is the
  data value II.6's rule reads.
* **pipeline PART III** (same part) — the village rungs carry no island layer (one line).
* **pipeline §4.5 S7b (5)** (same part) — no sky allocation below CITY.
* **pipeline §4.11** (same part) — an epoch's band crossing loses or gains islands.
* **determinism §7.8** — the island control is disabled below CITY, with its reason, in the control registry and the
  panels.
* **scope** — D-3; the staged list; a §13.2 test (TOWN and village requests never carry islands); the landing row.

**(e) STAGED-HOOK.**

**(f) Decisions touched.**
* D-3;
* AM-2;
* D-33 (the ladder);
* II.6's "The toggle creates 1–3 islands".

**(g) Rule family:** islands (10, 13, 15).

### Item 14 — Sewers by tier

**(a) Owner's words.** "Sewers can exist in towns though more rare and then becomes a necessity for cities and
Metropolis." Drafted rule:
* TOWN: optional, with a probability rising with population and prosperity, never certain;
* CITY and METROPOLIS: always present, and the toggle only controls whether the network is SHOWN, because drainage,
  outfalls, plot rules and underground neighbourhoods depend on it;
* villages: no sewers;
* underground neighbourhoods follow: rare in towns, possible in cities.

**(b) State: ABSENT.**
* II.6: "A `SewerStrategy` registers as a stage after S11 (declared inputs: ways with `flowToward`, the drainage raster
  and outfalls of §2.3, plots and buildings with their class table's `drain` column, the underground plat; output:
  `Tunnel` records)". There is no tier rule, and the toggle decides generation.
* D-3: "fantasy sewers (II.6)" are off by default.

**(c) Home: pipeline, II.6.** Sewer existence by tier:
* the town draw (a law of population and prosperity);
* always in CITY and METROPOLIS;
* none in the village tiers;
* the toggle is visibility, not existence;
* the dependants (the `drain` column, outfalls, underground neighbourhoods) read the model, not the view.

**(d) Referencing.**
* **scope §1.1** — `RungProfile.layers.sewers` holds the TOWN probability law and "always" for CITY and METROPOLIS.
* **pipeline §4.2 S0** (same part) — where the town's sewer draw happens. S0's feature table draws before the prosperity
  field exists, so the draw either reads the intent's `wealthLevel` or moves after S6's pass 1 (a ruling).
* **pipeline PART III** (same part) — villages have no sewers.
* **rendering §8.4** — the sewer toggle is the underground `LayerSpec.visible`; existence is model.
* **determinism §7.8** — the sewer control is a view control at CITY and METROPOLIS and a model feature (auto, on, off)
  at TOWN; the registry records its locality class.
* **determinism §6.1** — the town draw uses the existing `sewer` concern.
* **scope** — D-3 (historical sewers are realism and always present in cities; the `navigable` preset stays the fantasy
  toggle, off by default); the staged list; a §13.2 test; the landing row.

**(e) STAGED-HOOK.** The network is the staged stage. The existence rule and the per-rung data are hooks now.

**(f) Decisions touched.**
* D-3;
* DEF-7;
* II.6's two presets;
* the class table's `drain` column (II.6).

The editor rules which plot rules depend on the sewer's existence (for example cess pits versus connections).

**(g) Rule family:** sewers (11, 12, 14).

### Item 15 — Not every city has islands

**(a) Owner's words.** "not all cities or Metropolis have floating islands." Drafted consequences:
* being a city or metropolis makes islands possible, never guaranteed;
* whether any exist, and how many (0–3), is drawn from the seed and weighted by prosperity;
* the island toggle shows islands where the settlement has them and does not create islands the settlement cannot
  sustain.

**(b) State: ABSENT, and contradicted.**
* II.6: "The toggle creates 1–3 islands".
* II.6's `IslandRule.maxIslands: 1|2|3`.
* §4.5 S7b (5): allocations are made "When the island toggle is on".

**(c) Home: pipeline, II.6.** The island count, 0–3, is drawn from the seed and weighted by prosperity — a poor city
has none, a rich one none or several. The toggle shows islands and never creates them.

**(d) Referencing.**
* **pipeline §4.5 S7b (5)** (same part) — the number of sky pseudo-districts is the drawn count, not "the toggle is on".
* **determinism §6.1** — the count draw on `island.place` (or a new concern).
* **rendering §8.4** — the toggle is the sky `LayerSpec.visible`.
* **determinism §7.8** — the island control is a view control.
* **scope** — D-3; a §13.2 test (the count distribution against prosperity; poor cities have none); the landing row.

**(e) STAGED-HOOK.**

**(f) Decisions touched.**
* D-3;
* AM-2;
* II.6's "The toggle creates 1–3 islands";
* §4.5 S7b (5).

**Key ruling for the II.6 editor, with 10 and 13.** If the toggle only changes visibility, a settlement that "has"
islands moves its richest demand into them even when they are hidden. D-3 says fantasy is off by default in the base.
Separate two things:
* a model-level fantasy-layers setting — off by default under D-3, so no island exists and the realism base is unchanged;
* the per-view visibility toggle.

Decide whether hidden islands still take the ground's rich demand. The owner's words ("not all cities … have") are
satisfied either way.

**(g) Rule family:** islands (10, 13, 15).

### Item 16 — Assignments obey spatial and supply-chain rules

**(a) Owner's words.** "when it comes to neighborhood assignments and building assignments, this is after you already
built the city, make sure that there are rules or templates of rules in place for their respective spatial relations
with other buildings, supply chains, etc." Drafted consequences:
* (a) RELATION RULES as data templates per building and neighbourhood type — adjacency, proximity and avoidance;
  environmental; access; capacity; prosperity band — each HARD or SOFT;
* (b) SUPPLY CHAINS from the demand stage's resource and dependency graph — inputs, outputs, travel distance and mode
  (street, river, sea) — scored in placement, with needs that propagate;
* (c) one PLACEMENT SOLVER for generation and for later assignments, which joins plots when needed and relocates
  displaced uses as a local recorded repair; when no plot satisfies the hard rules it says so and offers the closest
  options;
* (d) the templates are editable and later calibrated against the corpus.

**(b) State: PARTIAL.**

*Already there:*
* §7.7: ``interface PlacementCriteria { districts?; districtKinds?; prosperityBands?; minSpacingM?; nearM?: { to:
  'water'|'gate'|'market'|'centre'|Id; maxM }[]; frontageClass?; avoid? }``.
* §7.7: ``interface PlacementSolver { solve(…): KernelResult<Id[]> } // greedy max-min-distance by score with a bounded
  swap pass; reports infeasibility with the nearest achievable count``.
* §4.7 S10b: "a rule-based score over the plot context — noxious trades downstream and extramural (`upstream` high,
  outside the enceinte), mills on water, markets and inns at tier-1 junctions or gates, religious precincts and faction
  turf as attractors, frontage class, area fit".
* §10.2's class rows: ``requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[]``,
  `cluster`, `noxious`.
* §10.3: "resource *provides / uses* edges on roster rows are data the schedules may read".
* §5.2, F-SITING's ladder.

*Missing:*
* the relation templates per type with HARD and SOFT marks;
* one solver shared by S10b and §7.7 — today they are two mechanisms;
* supply chains with distance and mode, scored in placement, and need propagation;
* joins, and relocation of displaced uses as a local recorded repair;
* infeasibility on hard relations reported with the closest options — this exists only for drift bounds, as F-EDIT;
* the corpus calibration hook for the templates.

**(c) Home: pipeline, §4.7, S10b "Placement"** — the one placement solver. It filters by HARD relation rules and scores
by weighted SOFT rules and supply-chain distances. Generation and every assignment path (§7.7) use it. It joins plots
where the use needs land, relocates displaced uses as a local recorded repair, and reports infeasibility with the
closest options.

**(d) Referencing.**
* **pipeline §10.2 and §4.2 S2** (same part):
  - the relation templates and supply edges `{input, output, maxDistance, mode}` are roster and class-table data per
    class and per neighbourhood kind — "the same data-driven resource/dependency graph the demand stage uses";
  - S2's demand propagates through the supply edges (a new brewery requires grain and malt).
* **determinism §7.7** — `PlacementCriteria` becomes per-assignment overrides of the relation templates; assignments are
  placed by §4.7's solver; the precedence stays "lock > assignment > …".
* **determinism §7.3** — relocations and joins are local operators with an effective scope and fates.
* **determinism §5.2** — F-SITING and F-EDIT never break a hard rule silently; an infeasible placement reports the
  closest options; the manifest-reduction rung never silently drops a hard-required class, nor dossier content (item 20).
* **model §2.5** — confirm the context vector and S10b's per-class distance rasters carry what the templates read
  (upwind, upstream and `terrainClass` exist; distances to classes come from the rasters). Add a field only if one is
  missing.
* **rendering §12.4** — S10b's row is re-declared, measured, for relation and supply scoring.
* **scope**:
  - §13.2 and §13.5 tests: hard relations satisfied 100 %; supply distances within the templates; O7 (b)'s rule
    satisfaction extended;
  - §13.9: the corpus phase re-signs the templates — the owner's (d);
  - §14: one solver — `@plat/content`'s S10b and `@plat/plots`' "assignment + placement solver" are merged;
  - §15.2's O7 and O10 rows;
  - §16: the O10 pricing line;
  - D-10 and D-32;
  - the landing row.

**(e) BASE.** The rule machinery and the one solver are base. The SettlementForge assignment inputs are staged (§11.4),
and so is the corpus calibration (§13.9).

**(f) Decisions touched.**
* D-32: "Economy (resource chains, items and services with prices, stock per building, global price edits), personality
  … are `@plat/sim` content (M4b)". Split it: placement supply edges go in the base, economics stay in the module.
* D-10: simulation depth.
* J-DET-11: "lock > assignment in the precedence order".
* §7.7's precedence line.
* J-13: "the greenery table, control rules, control budget, forms schema and intent example written here".
* O7 (b) and O10 (e): the acceptance letters.

**(g) Rule families:** assignments (16–19). 20 and 22 use the solver, and 26 takes food, fuel and timber through its
supply chains.

### Item 17 — Assignments and uses move as the city grows and declines

**(a) Owner's words.** "assignments can change as cities grow and decline — a shop may close down here but reopen over
there organically, and according to distribution." Drafted consequences:
* (a) uses are separate from the buildings that house them;
* (b) each epoch re-scores uses against 16's rules and the current distribution;
* (c) relocation is a recorded event with inertia and traces of former uses;
* (d) owner and host assignments are stable identities that move with their use unless PINNED, and every change is
  reported;
* (e) it is deterministic.

**(b) State: PARTIAL.**

*Already there:*
* §2.6: `Building { … use: Id /* roster building type */; dwelling?: Id; … assignment?: Id; drift?: DriftBounds;
  occupants: Id[] }`.
* §7.1's `swapUse`: "exchanges two buildings' uses, occupants and assignments atomically, footprints staying".
* §7.7: "**Epochs** keep placed members; members are added only by an event that changes the count or the criteria".
* §4.11 has no use relocation.

*Missing:* use records separate from buildings; epoch re-scoring and relocation; inertia; former-use traces; assignments
that move unless pinned; the report.

**(c) Home: pipeline, §4.11.** The evolution-stage use step: re-score against 16's rules and supply chains and the
current distribution; close, open or relocate with inertia thresholds; traces of former uses; pinned assignments stay
and the town adapts; the conversion kinds for uses.

**(d) Referencing.**
* **model §2.7 and §2.6** — a `Use` record (address, roster class, the building or buildings it occupies, assignment,
  former-use history). `Building.use` becomes a reference to its current `Use`, or none when the building is vacant.
  Buildings carry `formerUses`.
* **model §2.8** — use lifecycle (open, closed, relocated); the relocation lifecycle event's `detail.from` and `to`.
* **determinism §6.3** — a use's address moves with the use; the building keeps its own address.
* **determinism §7.1 and §7.4** — events to close, open or relocate a use by hand (`swapUse` generalised); edit-target
  and lifecycle rows.
* **determinism §7.7** — assignments move with their use unless pinned, replacing "Epochs keep placed members"; every
  change is reported.
* **pipeline §10.3** (same part) — households, live-in dwellings and postings follow a relocated use.
* **rendering §11.3** — relocations are reported to the host (`subscribe` / report events), one line.
* **scope** — D-25 (the vocabulary gains use relocation); the staged evolution row; a §13.2 hook test (relocating a use
  by hand keeps its address, the building persists vacant, and undo restores); §15.2's hooks row; the landing row.

**(e) BASE + STAGED-HOOK.**
* STAGED: the epoch re-scoring.
* BASE: the separation of use from building and the hand-relocation event, which items 18, 20 and 22 need now.

**(f) Decisions touched.**
* §7.7's "Epochs keep placed members …" contradicts 17 (d).
* J-DET-11.
* J-P22: "pinning by explicit edit only".
* D-25.
* D-10 and D-32 (postings live in the module).
* §7.1's `swapUse`.

**(g) Rule families:** assignments (16–19) and evolution (8, 11, 17, 22, 25).

### Item 18 — A plot's buildings MUTATE to match a new designation

**(a) Owner's words.** "if a new plot is assigned, then the buildings can be regenerated appropriately to match the actual
designation of the building" — clarified: "it is a mutation of its previous design to the newest design, with additions
and subtractions." Drafted consequences:
* (a) a designation change never re-rolls; the new design is derived from the old by recorded additions and
  subtractions, from the plot's stream for that step;
* (b) it is local;
* (c) host and user changes apply immediately; in the evolution stage the change spreads over epochs;
* (d) locked parts are never subtracted;
* (e) it is deterministic and reversible — the inverse mutation restores the design.

**(b) State: ABSENT, and the current path contradicts it.**
* §7.7: "every `assign` event — from the blueprint, the dialog or the host bridge — runs the same claims-first
  re-derivation for its scope (S10 step 3 on the target's block, or on the blocks of a dispersed assignment's chosen
  plots, §4.7)". That is a fresh derivation of the scope.
* §7.4, the assign row: "the claims-first re-derivation of its scope (§7.7)".
* §4.11: ``{ op: 'rebuild'; building: Id; cls: BuildingClass }`` (a class upgrade).
* §7.2: locks survive regeneration.

There is no mutation operator.

**(c) Home: pipeline, §4.7, S11 "Site plans and footprints"** — the designation-mutation operator. The design delta is
taken between the current design (site plan, slots, wings, a stored composition and plan) and the new designation's
prosperity-scaled template (item 19). It is applied as recorded additions, subtractions and conversions from the plot's
stream for that step, and its inverse is applied on reversal.

**(d) Referencing.**
* **model §2.6 and §2.5** — the design's parts are addressable (slots by `BuildingSlot.role`, wings, outbuildings), so
  additions and subtractions are recorded against them. A mutation record is persisted with the event or the building's
  derivation record. A stored composition and plan (28) mutate with the design.
* **determinism §7.3** — a designation change (`setAttr` use or class, `assign`, a relocation, a dossier
  re-designation) runs §4.7's mutation operator on the plot, and a joined neighbour, instead of tree scoping.
* **determinism §7.4** — the `assign` and `setAttr` rows: undo is the inverse mutation.
* **determinism §7.7** — "One path … claims-first re-derivation" becomes the mutation path; claims-first stays only
  where land must be joined.
* **determinism §6.1** — the mutation step's stream (a concern keyed by the plot and the event).
* **determinism §6.3** — kept parts keep their addresses; added parts are minted from the event's lineage.
* **pipeline §4.11** (same part) — the epoch-spread form: occupy if compatible, then adapt, extend, and rebuild only the
  parts that cannot be adapted, as recorded events.
* **scope**:
  - §13.2 tests: kept parts byte-identical; nothing outside the plot or plots changes; locks never subtracted; A → B → A
    restores the earlier design;
  - §14: the operator lives in `@plat/plots`;
  - §16: pricing;
  - the landing row.

**(e) BASE + STAGED-HOOK.**
* BASE: the immediate mutation.
* STAGED-HOOK: the epoch-spread form.

**(f) Decisions touched.**
* §7.7's "One path" (claims-first re-derivation).
* J-DET-10: "an edited attribute is implicitly pinned".
* §7.1's named actions: Regenerate (keep settings) and New random stay distinct from a mutation.
* §4.11's `rebuild`.
* O10 (e): drift bounds.
* J-P48: "a stored stage-3 composition carried in the same call as the base wings".

**(g) Rule families:** assignments (16–19), the floor plan (28) and the dossier (22 mutates through it).

### Item 19 — Every designation scales with prosperity

**(a) Owner's words.** "a town has multiple blacksmiths dispersed across different bands of prosperity. They should scale
appropriately in size and structure … this goes for all of the buildings across prosperity bands." On materials (owner,
2026-09-26): "different materials for construction is only represented by a change in texture or color. It has nothing
to do with the shape." Drafted consequences:
* (a) a PROSPERITY-SCALED TEMPLATE per designation: size budget, structures, storeys and heights, frontage treatment
  (lean-to stall → shopfront → arcaded front), court and garden, specialisation;
* materials: FTG's model is the default, and the regional prosperity shift is optional;
* (b) the template is interpolated along the continuous field, with bands only for discrete choices;
* (c) it applies to EVERY building type and to every creation or change path;
* (d) the templates are data, calibrated later.

**(b) State: PARTIAL.**

*Already there:*
* §4.7 S11: "the site-plan table keyed by `class × prosperityBand × density` (interpolated) gives coverage ratio,
  arrangement, setbacks, separation (party wall / slot / passage), front-line jitter …, yard partition and **boundary
  treatments**".
* §2.6: ``interface ClassRules { pick(ctx, assignment?): { cls; heights; roof; template? } } // a data table, not
  code``, and "Diversity 'from a giant manor to a small hovel' stays a property of `ClassRules` (data keyed by the
  context vector)".
* §4.5: "continuous rules (coverage, plot size, greenery share, building scale) **interpolate linearly between band
  rows along the value**".
* §2.6, Materials: "`MaterialRow` is a rule table keyed by district kind × class × prosperity band × era (weighted rows;
  temples and churches stone by row) … The style sheet maps materials to colour and texture roles."

*Missing:*
* one designation template per type covering size budget, structures, storeys, frontage treatment, court and garden,
  and specialisation (the poor smith a farrier, the rich one an armourer);
* the rule that the template applies on every path — generation, host assignment, relocation, mutation;
* the material default as FTG's model — today the default table keys materials by prosperity band;
* the explicit rule that material is a rendering attribute only.

**(c) Home: pipeline, §4.7, S11** — the designation-template table: prosperity-scaled, interpolated, with bands only for
discrete choices. S11, the mutation operator (18), relocation (17) and assignments (§7.7) all read it.

**(d) Referencing.**
* **model §2.6** — `ClassRules.pick` reads the template. The Materials paragraph — the material rule's single home —
  states:
  - the default: FTG's per-stage default material, overridden per district and per building type (temples stone), with
    wealth shown through lifestyle pools and roof colour;
  - the optional regional prosperity shift, within what the region builds with;
  - that a material changes texture and colour only — never footprint, wings, storeys, heights or roof form.
* **pipeline §10.2** (same part) — class rows name the template and its specialisation rows.
* **rendering §8.2** — materials map to colour and texture roles only (a pointer to §2.6).
* **determinism §7.7** — an assignment's drift bounds are read against the template.
* **scope**:
  - §13.2 and §13.5 tests: two smiths of one designation differ continuously along prosperity; every type has a
    template; a material change leaves the geometry byte-identical;
  - D-2 (the regional material table is a preset row);
  - §1.4's "buildings" row: FTG's material model is the default;
  - §16: pricing;
  - the landing row.

**(e) BASE.**

**(f) Decisions touched.**
* D-2: "The centre of gravity is high-to-late medieval Western Europe (12th–15th c.), as presets the corpus phase
  re-signs through §13.9".
* §2.6: the `MaterialRow` key carries `band` in the default.
* COV-FTG-F20.
* AM-6.
* J28: "19 materials = FTG's per-stage/district/type model by default, prosperity shift optional".
* The owner's material rule of 2026-09-26.

**(g) Rule families:** assignments (16–19), emulation (FTG's material default) and the floor plan (the room programme
is part of the template).

### Item 20 — One-way data flow; the dossier is the authority

**(a) Owner's words.**
* "the map does not edit the dossier … This module only takes input from SettlementForge and returns back the map. So if
  a player, for example, deletes one smithy from the map, not the dossier, then the map generator needs to still respect
  it and build the smithy somewhere else and all of the other elements in a coherent way, still based off of that same
  seed. The smithy can only truly be deleted if it is removed via instructions from the dossier/SettlementForge."
* On rejected sites: "it is not permanent because if a settlement grows or declines that might be appropriate to put
  something there … but the immediate effect should be that that place is not there".
* On positive placement: "maybe you want a specific place to be something".

Drafted consequences:
* (a) one-way flow; the bridge has no command that writes to the dossier;
* (b) dossier content exists on every map; a map delete is a PLACEMENT REJECTION (the solver re-places the element and
  repairs locally); the rejection is non-permanent and lapses on growth, decline or a dossier change there;
* (c) only the dossier adds, removes or re-designates;
* (d) map edits live in the map's own document;
* (e) PROPOSED: generator-added filler may be deleted, and what the dossier needs is re-provided;
* (f) dossier changes are re-applied as dossier events, keeping compatible map edits and reporting the rest;
* (g) positive placement.

**(b) State: PARTIAL.**

*Already there:*
* §11.4: "A host may supply input only through these doors: (1) blueprint fields — seed, rung, population, intent,
  character, circumstances, assignments — …; (2) edit events through the API or `doc.apply`, which are logged; (3)
  tables, presets and styles …; (4) a registered `ContentProvider` … The mapping of SettlementForge's own data onto
  these doors is staged".
* §11.3: "The host holds the canonical document and log".
* §7.1: ``{ t: 'delete'; id: Id }`` removes any entity.
* §5.2, F-SITING's last rung: "reduce the manifest, lowest-priority classes first, and report `unplaced`".
* §7.7: "**Precedence: lock > assignment > user-drawn geometry > rule tables > defaults**".

*Missing:*
* dossier-backed provenance and its existence authority;
* rejection as a non-permanent exclusion that lapses;
* positive placement;
* re-application with a compatibility report;
* the filler rule, which is proposed;
* the explicit one-way rule and the absent dossier command.

F-SITING and `delete` as written could remove dossier content.

**(c) Home: determinism, §7.7** (constraints and assignments; the ASSIGN hook). The dossier contract's model side:
* a dossier-backed class of assignment with existence authority;
* rejection: an excluded site held while the settlement stays in the same state, lapsing at an epoch or at a dossier
  change touching that area;
* positive placement, honoured under the hard rules or reported with the closest acceptable sites;
* re-application of dossier events;
* the precedence line gains dossier existence.

**(d) Referencing.**
* **determinism §7.1, §7.2, §7.4, §5.2, §5.3 and §5.4** (same part):
  - a `delete` of a dossier-backed entity is recorded as a rejection; a new positive-placement event;
  - protection gains dossier-backed existence;
  - lifecycle rows, including the lapse;
  - F-SITING's manifest reduction never drops dossier content, and F-EDIT reports a blocked positive placement with the
    closest sites;
  - the invariant "every dossier-backed element exists";
  - the report.
* **model §2.8** — a `dossier` source on the entity's identity or lifecycle (the dossier element's id), and the
  rejection record: excluded site, held state, lapse condition.
* **model §2.9** — one line: map edits live in the document's log; dossier events enter it with provenance `dossier`.
* **pipeline §4.7** — the solver re-places rejected elements and honours positive placements, joining plots and mutating
  buildings by 18 and 19 and relocating what was there.
* **pipeline §4.11** — a rejection lapses at an epoch.
* **rendering §11.4** — the dossier door: dossier events with `author: 'host'` and provenance `dossier`. The module never
  writes the dossier.
* **rendering §11.3** — no PLAT → host message writes, patches or proposes a dossier change; `doc.changed` carries
  map-document events only; SettlementForge stores the returned map document as an opaque artifact.
* **scope**:
  - one clause in the one-page summary's *Editing* paragraph;
  - *Staged by the owner's roadmap*, the SettlementForge-inputs row: the dossier contract's hooks;
  - §13.2 tests: a map delete of a dossier-backed element re-places it coherently from the same seed; the rejection
    lapses at an epoch; a blocked positive placement returns the rule and the closest sites;
  - §14: `EditEngine` and the bridge;
  - §15.2's hooks row;
  - §16: pricing;
  - the landing row.

**(e) BASE.** The contract, flags, events and invariants are base. The SettlementForge data mapping stays staged, as
§11.4 already says.

**(f) Decisions touched.**
* J-R15: "host-as-store".
* J-R16: "a transport-agnostic bridge plus the static VTT exports".
* J-DET-11.
* §7.7's precedence line.
* §5.2, F-SITING.
* DEF-11: the host-input contract.
* J23 (PROGRESS): the module "talking to SettlementForge only through a data protocol".

The editor rules:
1. where dossier existence sits in the precedence order against a lock;
2. whether the proposed filler rule (e) is adopted;
3. the order between (f) and (g).

**(g) Rule families:** the dossier (20, 22), with 21's host boundary. It uses item 16's solver.

### Item 21 — Licence: this module is GPL-3

**(a) Owner's words.** "I intend to make this module, and this module not the rest of the project from SettlementForge,
GPL-3 license." (General information, not legal advice.) Drafted consequences:
* (a) GPL-3 source, licence text and notices; dependencies GPL-3-compatible;
* (b) the module is a separate program at arm's length from SettlementForge — its own bundle, loaded separately in a
  worker, iframe or service, talking only through item 20's data protocol, never linked into SettlementForge;
* (c) TownGeneratorOS is itself GPL-3, so it may be consulted and adapted with attribution;
* (d) the proprietary references and their data assets stay off-limits;
* (e) D-22 becomes GPL-3.

**(b) State: PARTIAL.** The separation machinery largely exists; the licence rule is the opposite of the owner's choice.

*Already there, the separation machinery:*
* §11.3's `WindowPostMessageTransport` (iframe hosts) and `MessagePortTransport`;
* §11.2: the document lives in the generation worker;
* §1.7: "an embed bundle (ESM or iframe)".

*Opposite of the owner's choice:*
* §17.3: "Until the owner chooses, the `plat/` repository is **proprietary: "Copyright © the owner. All rights
  reserved."** … (J-S10); flagged for the owner's veto".
* D-22: "Proprietary, all rights reserved to the owner, until the owner chooses (§17.3); no dependency may constrain the
  choice".
* §17.1 (1): "No code from TownGeneratorOS (GPL-3), the FTG Foundry module or any captured bundle is read for
  implementation, ported or paraphrased".
* §17.4: "Nothing GPL, AGPL or LGPL is linked or bundled".
* §1.7's dependencies row: "permissive licences only … an open licence choice for the owner (D-22)".
* The one-page summary: "every library is permissively licensed, so the owner keeps every licensing choice".

**(c) Home: scope, §17.3** "Our own licence" — GPL-3 for the module:
* the LICENSE file and notices;
* source publication;
* the dependency rule becomes "GPL-3-compatible";
* the arm's-length separation rule (separate bundle, loaded separately, data-only protocol, never compiled, bundled or
  linked into SettlementForge);
* TownGeneratorOS consultable and adaptable with attribution and notices;
* the proprietary references and their data unchanged.

**(d) Referencing.**
* **scope** (same part):
  - the summary's *Clean room* paragraph;
  - §1.7's dependency and runtime-target rows;
  - §17.1 (1) and (6): TownGeneratorOS consultation, attribution provenance, and the seats that may read it;
  - §17.4: the checker's allowlist becomes GPL-3-compatible, and "nothing GPL linked" is re-grounded;
  - D-4, D-22, D-29 and D-14 (the reason CGAL is rejected);
  - J-S10 superseded; J-S8;
  - the staged list's mention of "the owner's licence";
  - §14: licence headers; the embed bundle is the module's own program;
  - the landing row.
* **rendering §11.2** — `PlatApi` is the module's own API inside its bundle. SettlementForge reaches the module only
  through §11.3's bridge.
* **rendering §11.3** — the bridge is the arm's-length boundary; messages carry data only (dossier in, map out).
* **kernel §3.1** — the straight-skeleton row's "CGAL is GPL/LGPL — rejected" is re-grounded. The licence is no longer
  the reason; the browser-first and one-engine reasons stand.

**(e) BASE.**

**(f) Decisions touched.**
* D-22 (owner veto — now exercised by the owner).
* J-S10: "a proprietary default licence".
* D-4: "A browser-first embeddable TypeScript library with an app on top; permissive dependencies only".
* D-29: the clean-room chain.
* J-S8: "implementer inputs: this document, a checked digest, a separate repository, numbers-only baselines".
* D-14: "Rejected: CGAL (GPL)"; J-K5.
* J23 (PROGRESS): "keep the module a separate program talking to SettlementForge only through a data protocol …;
  TownGeneratorOS (GPL-3) may now be consulted and adapted with attribution; the proprietary references' code and data
  assets stay off-limits".

The editor rules how TownGeneratorOS consultation enters the clean-room chain: which seats may read it, and where the
attribution is recorded. The route's own clean-room rule stands: nothing from `partitioned/`, and nothing outside the
project root.

**(g) Rule family:** the host boundary, with 20 and 22.

### Item 22 — Dossier changes mutate the existing map; they never re-roll it

**(a) Owner's words.** "we start off with the seed and then the player decides to add an institution or building to the
dossier. The seed must respect that as well, and in some ways respect the previous layout prior to the addition or
subtraction." Drafted consequences:
* (a) a dossier addition, removal or re-designation is applied to the CURRENT map as a mutation with least disruption:
  vacant or under-used plots first, then movable uses within the neighbourhood, joins only when needed; displaced uses
  relocate; a removal leaves the plot vacant;
* (b) a disruption budget and a report; everything else keeps its geometry and identity;
* (c) the map is a function of the seed, the ORDERED dossier history and the map's edits — continuity over
  path-independence;
* (d) a new map from an existing dossier has every element present from the start;
* (e) the same holds inside the evolution stage.

**(b) State: PARTIAL.**

*Already there:*
* §6.2: "`model = G(outputVersion, base, log)` — a pure function … the log is folded in order (§7.4)".
* §2.9: the log is "every event since the document was created, in `seq` order".
* §7.1: `EditBase.author: 'user'|'host'|'epoch'|'migration'`.
* §7.7: "**One path.** A blueprint's assignments and edits become `assign` and edit events at log positions 0…k … every
  `assign` event … runs the same claims-first re-derivation for its scope".
* §7.7: "**Re-solving:** when a member of a dispersed assignment is superseded without a successor, only that member is
  re-placed, with every mapped placement as a fixed point … nothing still mapped moves".

*Missing:*
* the least-disruption search order;
* the disruption budget and report;
* vacancy on removal;
* the explicit continuity rule;
* the dossier-at-creation statement;
* the epoch clause.

**(c) Home: determinism, §7.7.** Dossier events are mutations:
* the least-disruption site search order;
* the disruption budget, and the report of what moved, joined or vacated and why;
* a removal leaves the plot vacant, for 17's rules to re-use;
* the continuity rule.

**(d) Referencing.**
* **determinism §6.2** (same part) — one line: two histories reaching one dossier may give different, equally valid
  maps.
* **determinism §7.3 and §5.4** (same part) — the budget bounds the effective scope; the report.
* **model §2.9** — the document keeps the ordered dossier history in its log (a pointer).
* **pipeline §4.7** — the solver's least-disruption objective and search order.
* **pipeline §4.11** — dossier events arriving mid-history are mutations at that epoch.
* **pipeline §4.2 S2 and §4.5 S7b** — every dossier element of a brand-new map is present from the start. Rule whether
  dossier-at-creation enters S2's demand or stays as the log's first `assign` events (0…k).
* **rendering §11.4 and §11.3** — dossier events come through the host door, in the host's order.
* **scope**:
  - §13.2 tests: the same history from the same seed reproduces the map; two histories give two valid maps; everything
    outside the report is byte-identical;
  - the staged list;
  - §16;
  - the landing row.

**(e) BASE.** Dossier events are host events. The SettlementForge mapping is staged, and so is clause (e) with the
engine.

**(f) Decisions touched.**
* §7.7's "One path" and "Re-solving".
* J-DET-6: "one ordered replay fold for constraints, epochs, rebases and upgrades".
* D-21: "A base (the recipe, or a rebased state) and the ordered log …".
* J-R15.
* J-DET-11.

Record continuity over path-independence as `J-A22`. The owner's "respect the previous layout" supports it.

**(g) Rule families:** the dossier (20, 22), evolution, and assignments (the solver and 18's mutation).

### Item 23 — Emulation-first defaults; no hard-coded universals

**(a) Owner's words.** A program item (2026-09-26), from the owner's "I still want it to be based in our base of MFCG and
FTG emulation first". Drafted consequences:
* every rule's DEFAULT reproduces what MFCG and/or FTG do where they have the behaviour; parity is the base;
* our extensions are layered on top as data-driven tendencies with chance, or as options — never fixed laws or fixed
  orders;
* "always", "never" or "first … then" means "by default, as a table value that can be changed per region, era and
  setting";
* no corpus content enters the design.

**(b) State: PARTIAL.**

*Already there:*
* §7.6: "**Tables have keyed rows.** Every rule table — … — is versioned JSON: a map from a stable row key to a row whose
  cells carry `{value, unit, provenance: {source, date, note}, calibratable}`".
* §7.6: ``effectiveParams = defaults(pinned table versions) ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ log
  events``.
* §17.1 (6): "Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩ ⟨behaviour⟩` …".
* §1.4 adopts MFCG-class or FTG-class behaviour per stage under the DESIGN TIEBREAKER.
* D-2: era and region presets.

*Missing:*
* the rule that defaults emulate the references and extensions layer on top as tendencies or options;
* the reading rule for absolutes;
* a provenance marker that tells an emulated default from an extension;
* the parity test of the default configuration as that rule's proof.

**(c) Home: determinism, §7.6** "The override layer and editable tables". The defaults layer is the emulation baseline:
* each default cell marks the reference behaviour it emulates;
* extensions carry an `extension` mark with their chance, weight or option;
* a settlement rule stated as "always", "never" or "first … then" is a default table value per region, era and setting.

**(d) Referencing.**
* **scope §1.4** — one line: defaults emulate the references; the tiebreaker chooses between MFCG and FTG where both have
  the behaviour; extensions layer on top; a pointer to §7.6.
* **scope §17.1 (6)** — the provenance values name the emulated reference behaviour, or point to §7.6's marker (rule
  which section holds the field).
* **scope §13.5 and §16 M4** — the default configuration stays inside the references' parity bands (B-REF), and M4's
  table-provenance audit covers the marker.
* **pipeline** — a sweep of over-strong settlement claims in its sections. Starting list, by snapshot line:
  - l. 3877, §4.11: the decline order "… first" (→ item 8);
  - l. 2803, §4.2 S3 (1): "the best is the **centre / market**" (→ item 24);
  - l. 3192–3193, §4.5: "A **shanty / squalid** type is allowed only after the first half of the stages and only outside
    the enceinte (FTG's staging rule)". FTG's rule is the baseline; "only outside the enceinte" is ours (→ item 27);
  - l. 3679, §4.9: "every church / temple plot: a `churchyard` part ≥ 30 % of the plot's yard" — our own row, so a
    default;
  - l. 3520, §4.7: "The main plaza always gets one centrepiece" — MFCG's behaviour, kept as the default;
  - §4.9's hinterland (→ item 26);
  - II.6's toggles (→ items 13–15).
  Engineering invariants — planarity, "never re-rolled", "never stored", work limits — are not settlement rules and are
  out of scope.
* **model** — §2.6's `MaterialRow` default (→ item 19).
* **Every part** sweeps its own settlement absolutes. The list above is a starting point, not exhaustive.

**(e) BASE.**

**(f) Decisions touched.**
* D-2.
* D-19: "defaults and calibration anchors, all data that costs nothing to change".
* §1.4's TB rule.
* §17.1 (6).
* J27 and J28 (PROGRESS): the re-grounding.

The editor rules where the emulation marker lives: §7.6's cell schema or §17.1 (6)'s provenance values.

**(g) Rule family:** emulation (23–27).

### Item 24 — Several markets, as MFCG and FTG already do

**(a) Owner's words.** The owner (2026-09-26): "the central market does not actually have to be central to the city." A
program item from J27 and J28. Drafted consequences:
* the baselines: MFCG's central plaza is a market; secondary market wards and plazas never touch another market, prefer
  small patches and became rarer in 0.9.2; FTG places markets by its district rules (two squares in the captured city);
* the default: one principal market plus secondary markets and churches by size; our extension lets the count follow
  growth nuclei and demand;
* N markets in the model, demand and siting;
* the principal market is central by default, not by law; it is scored by where trade meets — the convergence of main
  roads, a bridgehead, the harbour, just inside or outside a gate, a widened main street.

**(b) State: PARTIAL.**

*Already there:*
* §4.2 S3 (1): "Candidate centres … are scored by a rule table — distance to a crossing site …, to the harbour
  candidate, slope, elevation above the flood line, wind exposure, distance from the frame, and a controlled random
  term; the best is the **centre / market**".
* For polycentric forms: "the market sits at the highest-scoring nucleus".
* §4.2 S3 (2): "a separate **market square** when the roster asks for one (CITY and above)".
* §4.7 S10b: "markets and inns at tier-1 junctions or gates".
* §2.5: `Reservation.kind … 'market'`, the district kind `market`, and `ContextVector.dist.market`.
* §4.7: market stalls "line the market square's edge band and ring a market hall in market districts".

*Missing:*
* an N-market demand (principal plus secondary, by size, the MFCG and FTG baselines);
* secondary-market siting rules (no market touching another; small patches);
* a principal-market score by trade convergence, separate from the centre;
* the count following nuclei and demand.

**(c) Home: pipeline, §4.2** — S2's market demand and S3's siting of the principal and secondary markets.

**(d) Referencing.**
* **pipeline §4.3, §4.4, §4.5, §4.7 and §10.2** (same part):
  - destinations and attach points per market;
  - the sources of `T` (ruling below);
  - grower seeds and a prosperity-driver kernel at every market;
  - S10b's market institutions against market squares, and stalls per square;
  - market institution rows by size.
* **model §2.5** — several `Reservation`s of kind `market` with a rank (principal or secondary); `ContextVector.dist.market`
  is the nearest market; a `market` district per market.
* **scope**:
  - the one-page summary: "the market square, the castle and the large precincts are reserved" becomes the markets;
  - §1.4's "centre and destinations" row;
  - §13.5 parity rows: MFCG's secondary-plaza frequency and non-adjacency; FTG's market squares;
  - the landing row.

**(e) BASE.**

**(f) Decisions touched.**
* D-16: "Routed arterials between named destinations; reservations and gate sites at S3 …".
* D-17: "Gate sites picked and castle and plaza reserved at S3 …".
* J-P3: "reservations and gate sites at S3, and the trace before each stage's growth".
* J-P26: "gate routes, boundary, gates, castle weld, trace and moat from one travel-cost construction" — `T` is
  plaza-rooted.
* MFP-3.
* J-P1.

**Key ruling.** When trade convergence puts the principal market off-centre (a bridgehead, the harbour, a gate), state
whether the growth centre stays separate from the principal market: `T`'s source, the gate routes' root, and MFCG's
plaza as roundabout.

**(g) Rule family:** emulation (23–27).

### Item 25 — Terrain and water can change, slowly

**(a) Owner's words.** A program item from J27 (the owner: "should any of these change the design now before we
continue?") and J28. Drafted consequences:
* reclamation (draining marsh, filling foreshore), canal digging, silting and river-course shifts are rare conversion
  events in the evolution hooks, and user edits already exist for water;
* terrain and water are the slowest-changing layer, not immutable;
* the data model and the incremental path allow these conversions with the same local-repair and event rules;
* the emulation note: neither reference has time.

**(b) State: PARTIAL.**

*Already there:*
* §4.11: ``{ op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }`` with its footprint and batches.
* §7.1's water edits: `drawWater`, `moveCourseKnot`, and the terrain brush's `water: 'follow'`.
* §7.3 (b): S1's water operator, the local repair path.
* §2.3: `WaterBody.kind` includes `'canal'`.
* §2.7: `LandUse` kind `'marsh'`.

*Missing:* reclamation, silting and course shifts as conversion kinds; their rarity and rates in the persistence-order
table; the record changes each one makes.

**(c) Home: pipeline, §4.11** — the terrain and water conversion kinds, their rarity rows in item 8's persistence-order
table (the slowest layer), and their repair through S1's water operator.

**(d) Referencing.**
* **model §2.3** — what each conversion changes: a silting reach's width and depth profile; reclaimed marsh or
  foreshore becoming land with a trace; a course shift re-tracing the reach.
* **determinism §7.3 (b)** — S1's water operator is the local repair of these conversions (a pointer).
* **determinism §7.1 and §7.4** — the terrain and water edit-target rows gain the conversions; a lifecycle row.
* **determinism §6.1** — an epoch terrain/water concern if one is needed, appended.
* **scope**:
  - the staged evolution row;
  - D-25;
  - a §13.2 hook test: a reclamation and a silting applied by hand stay local, byte-identical outside their footprint;
  - the landing row.

**(e) STAGED-HOOK.** The engine is staged; the conversion kinds are usable by hand in the base, as the decline kinds
are.

**(f) Decisions touched.**
* J27: "'terrain and water never change' → weighted tendencies".
* J28: "25 terrain/water change = hook only (neither reference has time; both already allow water edits)".
* D-25.
* J-DET-23: "S1's water operator re-sites crossings and chains S4–S7 in §4.11's order".
* J-DET-24: "the terrain brush defaults to `water: 'locked'` with exact re-basing".
* J-P30 and J-P34: the carve's way rule and footprint.

**(g) Rule families:** evolution, and emulation.

### Item 26 — The hinterland is decided with the town and drawn after it — FTG's order

**(a) Owner's words.** A program item from J27 and J28. Drafted consequences:
* the baselines: FTG decides buildings and people first, farm households included, and draws the outer settlement last,
  with farmland modes (farmsteads fill the remaining space, or around the perimeter along the main roads out) chosen by
  settlement size and landscape; MFCG fills countryside cells outside the walls with farms;
* the default: FTG's order and modes; the DEMAND stage decides farm households and food, fuel and timber needs (with
  16's supply chains), and the outer stage draws fields and woods into the available countryside;
* the extension: the hinterland's extent follows demand; a minimum hinterland is kept clear of suburb growth only when
  demand requires it (off by default).

**(b) State: PARTIAL.**

*Already there:*
* §4.2 S2: "Outside classes (farmsteads, mills, quarries, lumber yards, fisheries, mines) are demanded here, sited by
  S12a and placed on the outside plots the hinterland unit builds (FTG-7)".
* §4.9: "**One farm table (FTG-7).** `FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead }` … S2 demands `farmsteads = round(arableHaPerCapita · P / fieldHaPerFarmstead)`".
* The field-system presets: "open-field strips … enclosed fields … farmsteads with driveways, perimeter, along rivers,
  or the MFCG/VG sector look".
* "managed woodland by distance band and wild wood beyond".
* The `ClimateTable` sets "the default field system and farm layout" by biome.
* §4.1: "S12a before S10b, so the roster's farms, mills and quarries have outside sites to go to (FTG-7)".
* The hinterland unit "runs on the generation worker while the pool runs the districts".

*Missing:*
* fuel and timber demand, with woods sized to it;
* supply-chain linkage;
* FTG's modes chosen by size and landscape by default;
* the outer settlement drawn after the town — it is drawn in parallel today, though the content is already decided
  eagerly;
* the extent-follows-demand extension;
* the off-by-default minimum-hinterland clearance.

**(c) Home: pipeline, §4.9** — S12a and the hinterland unit.

**(d) Referencing.**
* **pipeline §4.2 S2, §10.2, §4.1 and §4.4** (same part):
  - fuel and timber demand rows next to the farm table;
  - the order statement;
  - the off-by-default clearance against suburb growth.
* **rendering §12.4** — only if the unit's order changes: its row no longer hides behind the pool.
* **scope**:
  - §1.4's "hinterland" row;
  - §13.2 and §15.2's O14 letters: woods sized to fuel and timber demand, next to the existing farmland per capita;
  - the landing row.

**(e) BASE.**

**(f) Decisions touched.**
* J-P27: "the hinterland unit on the generation worker as one more overlay".
* J-I6: "furlong-sized field faces; open-field strips as render-time segmentation".
* FTG-7.
* O14.
* J28: "26 hinterland = FTG order (decided with demand, drawn last; fill available countryside) — early land
  reservation dropped to an off-by-default option".

The editor rules whether "drawn after" changes the unit's execution order. Either way the model is the same, because the
content is eager; the difference is a budget matter.

**(g) Rule families:** emulation, and assignments (16's supply chains).

### Item 27 — Prosperity maps onto the references' wealth models

**(a) Owner's words.** A program item from J28 (the owner: "I still want it to be based in our base of MFCG and FTG
emulation first"), building on the owner's "prosperity is a gradient and a band rather than binary". Drafted
consequences:
* the baselines: MFCG's ward types (patriciate, merchant, craftsmen, slum …); FTG's lifestyle tiers (squalid, poor,
  modest, comfortable, wealthy, aristocratic) drawn from a distribution, with districts typed by class, pools banded by
  lifestyle, and shanty towns replacing lower-class districts when the average lifestyle is squalid or poor, only after
  the first half of the settlement is built;
* the default: the field's bands reproduce those classes and distributions;
* the continuous gradient is our extension.

**(b) State: PARTIAL.**

*Already there:*
* §4.5: "**Bands (LC-6, FTG-2).** The cut points are computed **once per town** so that the share of built land in each
  band equals that band's share of the plot land the roster demands (household wealth shares × the band's plot areas,
  S2)".
* §4.5, typing: "A **shanty / squalid** type is allowed only after the first half of the stages and only outside the
  enceinte (FTG's staging rule)".
* §4.7's granularity bands: poor / dense, modest, prosperous, rich.
* §10.2: "lifestyle-banded pools with rare outliers (weights ours)".
* §2.5: "**Districts are feature-named, never class-named (J-P1).** … 'rich quarter' and 'poor quarter' are
  *descriptions*".
* §1.4's "districts" row: "class-typed wards MFCG itself dropped".

*Missing:*
* the default band configuration reproducing FTG's six tiers and weights and MFCG's ward mix;
* FTG's shanty trigger (average lifestyle squalid or poor);
* the gradient named as the extension.

**(c) Home: pipeline, §4.5** — the prosperity field's default bands.

**(d) Referencing.**
* **pipeline §10.2, §4.7 and §4.9** (same part):
  - the household lifestyle weights default to FTG's six tiers;
  - the granularity, site-plan and greenery rows are keyed to those tiers, or a declared mapping onto the four current
    rows;
  - the shanty trigger.
* **model §2.5** — the default cut count and band labels of `FieldBands`, and the `prosperityBand` labels. J-P1 is
  unchanged: bands are not district kinds.
* **scope**:
  - §1.4's "districts" row, stated consistently with J-P1;
  - §13.5 parity rows: FTG's lifestyle distribution and MFCG's ward-class shares;
  - the landing row.

**(e) BASE.**

**(f) Decisions touched.**
* J-P1: "feature-named district kinds".
* AM-6 (§0.2's row 6).
* LC-6 and FTG-2: the band cuts.
* MFP-7.
* J28: "new 27 prosperity field's default bands reproduce MFCG ward types and FTG lifestyle tiers/shanty rule".

**Ruling: which MFCG is the baseline.** J28's evidence ("os-wards-render §6.5", "os-model") is the 2017 open-source
model's ward types, while §1.4 records that the live MFCG dropped class-typed wards. State the behaviour reproduced — the
ward-class shares as band targets — without re-typing districts.

**(g) Rule families:** emulation, with 19 (the designation templates by band).

### Item 28 — Floor plans and elaboration by click (the Dwellings rung)

**(a) Owner's words.**
* "a user can go click into a building from within the neighborhood view and pull this up which takes all of the
  geometry and height and pieces from the manor view and then makes a coherent floor plan of the building also taking
  and tailoring to the building type and function."
* "the first thing that gets built is the city level view with a general view of different neighborhoods as plots
  without buildings. A user clicks into a neighborhood and that generates that neighborhoods buildings. Once generated
  it is saved. Plots can be preassigned institution/buildings as well just not generated. The same thing happens when
  users click a building in a neighborhood. This cuts back on loading everything all at once. of course generated
  buildings and neighborhoods as you zoom out are saved to be viewed until something changes in them from the simulator
  which lets the user know to click and see changes at their own pace."

The program's interpretation, vetoable (J33):
* (a) a fourth rung, `plan`, built function first: a room programme from designation and band, and a partition fitted
  to it, coherent with the exterior;
* (b) elaboration by click as a trigger policy over §4.1's laziness contract, with eager footprints kept at city zoom and
  a "plots only" cadastral view as an option;
* (c) saved, then stale until clicked: an elaboration cache per rung with its input digests; the rung states absent,
  current, stale and edited; a click re-derives as a mutation;
* (d) the plan rung is staged; the hooks land now.

**(b) State: PARTIAL.**

*Already there:*
* §2.6: `Heights { … floors: number; … }`.
* §2.6: ``interface Composition { lod: ('outline'|'wings'|'rooms')[]; wings: Wing[]; towers: ComposedTower[]; courts:
  Polygon[]; rooms?: Room[] }``.
* §2.6: ``interface Room { ring: Polygon; wing: number; subLocation?: Id }``.
* §2.6: ``interface Porch { side; offsetCm; widthCm; depthCm }``, and `Building.entrance: VertexRef`.
* §2.6: `BuildingGenerator.compose(input, outline, lod: 'wings'|'rooms', k)` — "lazy, per visible tile".
* §2.6: `SubLocation` — "rooms at stage 3 refine, never replace".
* §2.6: `composition?` — "stage 3: lazily generated, stored only when edited; its streams derive from the building's
  lineage (§6.1)".
* §4.1: "The one-click first paint is the complete city LOD (SCL-4) … Laziness is restricted to what the city band does
  not draw: … stage-2 close-up detail and stage-3 compositions — each a pure function under the contract".
* §8.6: compositions are "computed on demand for the visible tiles' buildings … and cached there by (entity key,
  revision, lod)".
* §8.5: "**building** — wings and rooms (stage 3)".
* §2.5: "a cadastral outline group is an optional toggle".
* The eager content decisions are the `Allocation` records (§2.5, §4.1).

*Missing:*
* the plan rung: per storey, rooms with walls, doors, windows on exterior sides, stairs stacked across storeys, the
  entrance on the frontage or access side, a cellar where the class says, abstract furniture;
* the function-first room programme and its partition;
* the exterior-coherence rules;
* plan edits;
* per-rung streams, the restrictive rerolls;
* the `elaborate` setting and the click trigger;
* the persisted elaboration cache, the rung states and the stale markers;
* the room graph in the export;
* the plan's budget row and acceptance bars;
* a ruling on the owner's "plots without buildings" first view against J33's eager footprints.

**(c) Home: model, §2.6** — the fourth rung and its interface: `'plan'` in `Composition.lod`; the plan record per storey;
the room-programme column read from the class table; the plan step of `BuildingGenerator`; editability; the rung's
streams. The same editor states the rung states and the elaboration cache in §2.8 and §2.9 (same part).

**(d) Referencing.**
* **model §2.8 and §2.9** (same part):
  - the rung states absent, current, stale and edited, on `Lifecycle` or `DerivationRecord`;
  - the elaboration cache as a non-canonical cache beside `model`, keyed by each rung's recorded input digests and kept
    across zoom-outs and sessions;
  - the `elaborate` document setting;
  - the entrance side on `Wing` and `Porch`.
* **pipeline §4.1** — the trigger policy over the laziness contract:
  - `elaborate: 'click'` is the owner's default, `'view'` automatic within §12's budgets;
  - a neighbourhood click composes to the wings rung (stage 3) and opens stage 2's close-up at M5;
  - a building click derives the plan;
  - the eager content decision (use, class, assignment, `Lifecycle.assigned`) is named as the owner's pre-assignment.
* **pipeline §4.7 S11 and §10.2** — the room programme is part of the designation template (item 19) and the roster's
  class rows.
* **pipeline II.4 and II.5** — stage 2's close-ups follow the same click policy and stale marking.
* **determinism §6.1** — per-rung concerns for plan partition, room roles and furniture: re-rolling roles never moves a
  wall, and re-rolling the plan never changes the exterior.
* **determinism §6.2** — the cache sits outside both digests; staleness is detected by the recorded input digests; the
  derived-complete test covers click order.
* **determinism §7.1** — plan edit events (room role, wall move, door move) scoped to the building; a click logs nothing.
* **determinism §7.3** — a click on a stale rung re-derives as a mutation of the cached state (18's operator).
* **determinism §7.4** — the lifecycle rows.
* **rendering §8.5** — the building band draws the plan; the "plots only" view option; stale markers at every zoom.
* **rendering §8.6** — plans derive on demand; the persisted cache replaces the in-memory `(entity key, revision, lod)`
  cache.
* **rendering §11.1** — the room graph in our own JSON schema; VTT walls and doors per storey.
* **rendering §12.7** — one plan per click.
* **rendering §12.8** — the cache's memory.
* **kernel §3.4, §3.8 and §3.10** — the plan partition's geometry, on the building's composition rings or on a transient
  per-building arena:
  - the listed operations it uses (`splitFace`, `ringBand`, `radialSplit`, `booleans`, `lir`);
  - a `plan` reader if it uses the skeleton;
  - the invariants: rooms tile each storey's wing rings exactly, and the plan's outer walls equal the wing rings.
* **scope**:
  - the summary and §1.1's stage table: stage 3 gains the plan rung and click elaboration;
  - §13.2's plan acceptance bars: every programme room present; every room reachable; stairs stacked; walls equal the
    wing rings;
  - elaboration and staleness tests;
  - §14: the plan step on `BuildingGenerator`, and the package that owns the cache;
  - §15.2's hooks row;
  - §16: pricing of the base hooks (the setting, the cache, the fields);
  - *Staged by the owner's roadmap*'s stage-3 row gains the plan rung's hooks;
  - the landing row.
  - After this pass (the closing seat), `docs/DEFINITION.md` gains the rung.

**(e) STAGED-HOOK + BASE.**
* STAGED-HOOK: the plan rung comes after the Fantasy-Manor buildings in the owner's order.
* BASE: the click policy and the stale-until-clicked cache apply now to the base's lazy tiers — the district band's lazy
  detail and stage 2 at M5 — and to stage 3 when it lands.

**(f) Decisions touched.**
* J33 (PROGRESS): "eager footprints at city zoom (MFCG parity) with a cadastral 'plots only' view as an option …
  Rejected: bare-plot city view by default; store every derived rung".
* J-P18: "an `outline()` / `compose()` split with a cost contract".
* J-P9: "an eager town-wide allocation, a laziness contract and a complete first paint".
* J-I2: "no preview at any rung"; J-R7: "no S9 preview"; SCL-4.
* J-P23: "close-up refinement as derived data; template replacement as a model edit".
* J-P48; DEF-17; D-35.
* J36 (PROGRESS): 09's editors start only after the Fable Dwellings synthesis lands; item 28's hooks come from it.

The editor rules, and records vetoably:
1. the owner's "plots without buildings" first view against J33's default;
2. the plan's unit and scale (dwellings-posts §0 item 10: "the cell size … is the owner's call");
3. whether rooms are plat faces or composition rings.

**(g) Rule family:** the floor plan — 28 and 29 (entrances and basements feed the plan), with 16–19's room programmes
and the mutation of 18 and 22.

#### Item 28 (f) — The interior has no floor: the interior ladder (added 2026-09-27; routed in a further update)

**(a) Owner's words** (2026-09-27, about 00:50; the whole message as the owner wrote it — the amendments file quotes it
with elisions, and `docs/PROGRESS.md` J48 records the intake):
* "one thing to add to the dwellings. following on the fact that we put a floor to the geometry regarding prosperity,
  that does not mean the interior has to be. so in other news more prosperity means a larger home for a smaller family
  with potential for staff rooms which are dwarfed compared to the owners. where if it gets poorer, the neighborood, each
  building may stay or get. to the floor we have described, however the interior then becomes rearranged so a larger
  space gets partitioned, hallways may be created that lead into seperate rooms for different families, etc etc and
  this scales appropraietly, this is concurrent with how the buildings cycle between middle to rich. And the more rooms
  for more occupying famiiles the richer a building gets."
* "common rooms may be a thing if in appropraite prosperity, larger rooms vs smaller rooms too. but if it gets really
  poor, then its just simply all appartments that can probably fit no more than a bedroom and a small place within to
  cook food. maybe not even that second part."
* "I was originally concerned with... if every area gets developed where are the poor are suppose to stay, then i
  realized same building geometry but not the interior."

The program's interpretation (item 28 (f), vetoable):
* The ROOM PROGRAMME reads the occupants' band and the household count, never the plot's geometry floor. The plan is
  re-cut inside the unchanged wing rings as the occupants change.
* The INTERIOR LADDER is a rule table by band:
  - rich: one household in the whole shell; large principal rooms; a service side with small staff rooms; few corridors;
  - middle: one or two households, each with a kitchen and a parlour;
  - middling-poor: a lodging house — several households on separate floors or wings, a corridor or stair hall inserted
    to give each its own door, a shared kitchen and a common room where the band allows;
  - poor: a tenement — one-family apartments of a bedroom and a small cooking place, off a corridor and the stair core;
  - destitute: single rooms off the corridor, no cooking place, shared facilities or none.
* Households per building fall as the band rises and rise as it falls; room sizes follow.
* The re-cut is item 18's mutation applied to rooms. The stair core, the exterior walls, the entrances and the chimneys
  stay; partitions, corridors and doors are re-derived with least disruption.
* Item 31's rich ↔ middle cycle runs through this ladder both ways. Only the interior, never the shell, falls below the
  middle.
* A §13 bar: after a two-row fall, every dossier household has its own door off a corridor or stair hall, inside the
  same wing rings, with the stair core unmoved.

**The first quote's last sentence needs a reading.** Read literally, it says the more families a building houses, the
richer the building. Applied to the occupants, that contradicts the message's first clause: "more prosperity means a
larger home for a smaller family". Two readings agree with everything else:
1. CAPACITY — the richer the shell was built, the more rooms it has to partition, so the more families it can hold once
   it is let out. In the design this is the template row's `households.max` (§10.2 declares the column, landed); under
   this reading its default rows rise with the band the shell was built for.
2. A slip for "poorer".

Both readings keep the drafted rule that households per building rise as the occupants' band falls. The route
recommends reading 1, because it speaks of the *building*, not of its occupants. The model seat records the reading in
a J-A28 row, and the validator checks it as an owner-fidelity point.

**(b) State: ABSENT in the live document. Its inputs are carried by blocks that have landed but are not yet applied.**

*The live document* (sha256 `1dbfd9d4…`, 9 667 lines, 140 headings; read for this update):
* §2.6: `interface Room { ring: Polygon …; wing: number …; subLocation?: Id /* the SubLocation it hosts */ }` and
  `Composition.lod: ('outline'|'wings'|'rooms')[]`. There is no plan rung, no programme, and no household in any room.
* §2.6: `Building.occupants: Id[]` and `dwelling?: Id /* the household living in a workplace (live-in) … */`.
* §2.6: sub-locations — "stage-3 rooms refine them (a `Room` may host a sub-location) and never replace their ids".
* §2.7: `interface Household { id …; plot: Id; building: Id; members: number …; wealth: number; … }`.
* §1.4's buildings row discards "FTG's one-building-one-household lot".
* §10.2: `households: HouseholdRow[] /* size distributions by class */`.

Nothing in the live document derives an interior from its occupants.

*Already in the landed blocks.* The assembler applies these; the model seat builds on them and does not restate them.
* **Pipeline §4.11 REPLACE** (`blocks-pipeline-prosperity-change-dossier-plan.md`), rung 1:
  - "`relet` raises a building's household count toward its template row's `households.max` (§10.2) … its plan rung
    re-cuts the programme from one household to many when it is next derived (item 28: the rung goes `stale`, §2.8)";
  - growing rich: "households re-united (`relet` down to the row's built count)";
  - the floor paragraph gives the field band, not the manifested band, to "households, condition, specialisation, the
    room programme, labels and descriptions" (J-A31.43).
* **Pipeline §4.7** (`blocks-pipeline-assignments.md`), J-A19.43: "geometry columns read the manifested band (the field
  band raised to the geometry floor); the specialisation and the room programme read the field band".
* **Pipeline §10.2 APPEND** (the prosperity-change seat; J-A28.43):
  - `DesignationTemplateRow.households: { built: number; max: number }` and `programme`;
  - `RoomProgramRow { for: { cls; band; use?; era? }; rooms: RoomRuleRow[]; pattern; circulation /* the share of a
    storey given to halls and corridors */; stair; basementAccess; furnish }`;
  - `RoomRuleRow.count.law` includes `'perHousehold'` ("one for each household of item 31's `relet`"), and
    `area: [min, target, max]` is in m².
* **Pipeline §4.1 and II.4 APPENDs.** Households are a recorded input of a rung, and a change marks the rung `stale`. The
  click re-derives the rung by mutating the cached state (J-A28.42).
* **Determinism** (`blocks-determinism.md`):
  - §6.1's `plan.program`, `plan.layout`, `plan.roles` and `plan.furnish` concerns, keyed by the rung's own reroll
    (J-A28.61);
  - §7.1's plan events: `setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`,
    `moveStairCore`;
  - §7.3's stale-click row: "`BuildingGenerator.plan` with the cached result as `prior` (§2.6): rooms whose wing, ring
    and role survive are kept with their addresses … the stair core kept unless its wing went" (J-A28.71);
  - §6.2's rule that a derived rung "is a pure function of the building's committed state and its own streams", and
    §6.5 (9)'s "byte-identical cached results per (entity, rung, input digest)" over click orders;
  - §5.2's F-PLAN ladder and §5.3's plan-tiling invariant.
* **The Fable synthesis** (`research/findings/dwellings-synthesis.md`):
  - §2.2: "item 31's households demand one dwelling unit each";
  - the stair core, the entrance rooms and the hearth rooms are anchors fixed before any cut;
  - the `spine` pattern gives a double-loaded corridor;
  - §1.4 gives the ranked-size aim.

*Missing — what (f) adds:*
1. **The programme's inputs**, stated at the plan rung: the occupants' band and the household count — never the
   manifested band and never `geometryFloor`.
2. **The interior ladder**, as a rule table with its context vector: the occupants' band and value, the household count,
   class, use, storeys and era. Each row states:
   - how many households the shell holds;
   - the rooms of each household's unit;
   - the shared rooms the band allows (a shared kitchen, a common room, shared facilities);
   - the staff rooms, and their size relative to the owners' rooms;
   - the circulation: few corridors, or an inserted corridor or stair hall;
   - the room-size band, interpolated along the value inside a row.
3. **The dwelling unit.** Each room belongs to one household's unit, or is shared, service or circulation. Each unit has
   its own entry door onto circulation (a corridor, stair hall or landing) or onto the street, and never opens through
   another unit's room.
4. **The re-cut rule, both ways:**
   - fixed: the wing rings, the stair core, the entrances, the hearths and chimney stacks, item 30's reserved passage
     cells, and the basement ring;
   - re-derived: partitions, corridors, doors and roles;
   - least disruption: a room whose ring fits a role of the new programme keeps its ring and address, even if its role
     changes;
   - re-uniting the households removes what the subdivision added.
5. **Household units are never omitted.** A unit falls to the next poorer unit form (an apartment becomes a single room)
   before any unit is dropped. The count the plan must house is bounded by what the shell holds.
6. **Editability** of the new state (a room's unit).
7. **The §13 bars.**

**(c) Home: model, §2.6** — the same home as item 28, the plan rung. It states once:
* the programme's inputs;
* the interior ladder's rule table, stated here once, as §2.6 states `MaterialRow`'s rule table. Per band it gives the
  households per shell, the unit's rooms, the shared rooms, the staff rooms and their relative size, the circulation
  form and the room-size band. It is the cross-class structure that the plan rung applies. The per-class programme rows
  (which rooms a smithy or an inn has at each band) stay §10.2's content (`RoomProgramRow`, J-A28.43) and follow it;
* the unit on the plan's room record, and the unit-door rule;
* the re-cut rule and the never-omit rule;
* the capacity: the floor area of the building's storeys (each wing's area times its `Heights.floors`), less the
  circulation share, divided by the smallest unit form's minimum area. The base can compute this from its wings
  without the plan rung.

Same part:
* §2.8's elaboration record lists the household count and the occupants' band among the plan rung's recorded inputs. The
  prosperity seat's cross-note already asks that "a re-let, a band change … mark `stale`".
* §2.7 names the link from a household to its unit in its building's plan.

**(d) Referencing.** Each part's seat has either landed already or runs after this update (see *Timing* below).
* **Pipeline §10.2** (landed) — one line:
  - the per-class `RoomProgramRow` rows follow §2.6's interior ladder (a pointer; the rule is stated there);
  - the `programme` column is read at the occupants' band row and `households` at the plot's `builtBand` row, as
    J-A19.43 and §4.11 already say;
  - if the model seat rules a unit-scope column on `RoomRuleRow` (household, shared, service), it lands here by a
    cross-part note.
* **Pipeline §4.11** (landed) — one pointer in rung 1:
  - the re-cut is §2.6's interior ladder;
  - `relet` keeps the count within §2.6's capacity, so F-PLAN never has to drop a household.
* **Pipeline §4.7 S11** (landed) — nothing new. Item 18's mutator is the operator the re-cut applies to rooms, and §2.6
  states it.
* **Pipeline §4.5** (landed) — a conflict to reconcile:
  - the default `FieldBands.middle` is "the row the granularity table calls modest" in the prosperity seat's §4.5
    APPEND, but `comfortable` in the emulation seat's §4.5 REPLACE (J-A27.42);
  - under that seat's default shares, the median household lies in `comfortable` (cumulative shares 0.011, 0.022,
    0.239, 0.674);
  - both land in §4.5, the REPLACE first, so the verify-pipeline seat reduces them to one statement. The interior
    ladder's middle row depends on it through (f)'s "falls below the middle".
* **Determinism §5.2** (landed) — F-PLAN:
  - tier 0 never trims a household unit;
  - tier 5's substitution for a unit is the next poorer unit form;
  - tier 6 never omits a household unit;
  - the test column adds "every household housed".
* **Determinism §5.3** (landed) — two invariant rows or clauses:
  - every unit's entry door opens on circulation or the street, never through another unit's room;
  - a re-cut leaves the wing rings, the stair core, the entrances and the hearths unchanged.
* **Determinism §6.1 and §6.5** (landed):
  - no new concern: the re-cut draws on `plan.layout` and `plan.roles`;
  - §6.5 (9)'s click-order identity covers re-cuts, which binds the model seat's ruling on `prior` (below).
* **Determinism §7.1 and §7.4** (landed) — the room's unit is editable, either by a plan event (for example
  `setRoomUnit`) or through the existing events, as the model seat rules; and it has a lifecycle row.
* **Determinism §7.3** (landed) — the stale-click row's `prior` clause follows §2.6's re-cut rule:
  - rooms that fit a role of the new programme keep their ring and address, even if the role changes;
  - the entrances and hearths are fixed, with the stair core.
* **Determinism §7.6** (landed) — the interior ladder's rows are editable table values. By item 23 they are defaults, not
  laws.
* **Rendering §11.1** — the room graph carries each room's unit, and each unit's household and entry door, so an
  exported plan says who lives where. The host already holds the households.
* **Rendering §12.7** — the one-plan-per-click budget covers a re-cut, including the chain of the `prior` ruling if that
  ruling is taken.
* **Rendering §8.5 and §9** — no new text. The plan draw shows walls and doors, and the stale marker covers a pending
  re-cut.
* **Kernel** — no new text. The re-cut's cuts run on the rung's transient arena (J-A28.31), and §3.10's tiling invariant
  holds after a re-cut.
* **Scope:**
  - §13.2 bars:
    1. the owner's bar: when a building's occupants' band falls two rows, every dossier household is housed with its
       own door off a corridor or stair hall, inside the same wing rings, with the stair core unmoved;
    2. the shell stays byte-identical through any interior re-cut: its wings, entrances, heights and roof;
    3. re-uniting the households restores the earlier plan where nothing else changed (item 18 (e)'s inverse);
    4. a schema test: every band of the band set maps to an interior row, and every row names its unit, shared, staff
       and size columns;
    5. the owner's concern: after a district's two-band fall, every roster household is housed without a new plot.
  - D-25's vocabulary gains "interior ladder" and "dwelling unit".
  - The landing row's clause map for item 28 gains (f).
  - The one-page summary's building line gains one clause: the shell keeps its floor, and the interior follows its
    occupants.
  - The Staged list's stage-3 row: the interior ladder rides the plan rung's hooks.
  - §16: no new line; the plan rung's hook line absorbs it.
  - At closing, `docs/DEFINITION.md` gains the rung together with this sentence: where the poor live — the same shells,
    a different interior.

*Timing.* The determinism and pipeline seats (`amend-determinism`, 23:15; `amend-pipeline-prosperity-change-dossier-plan`,
23:23) landed before (f) was written into the amendments file (00:44). Their one-liners above therefore reach them only
as the model seat's cross-part notes and through verify → repair. The model, rendering and scope seats run after this
update and read (f) here.

**(e) STAGED-HOOK + BASE.**
* STAGED: the interior derivation belongs to the plan rung (stage 3), and the epoch driver of `relet` belongs to the
  evolution engine.
* BASE now:
  - the programme's band input (landed);
  - the household capacity, and `relet` usable by hand (landed);
  - the rows as data, with the schema test;
  - the unit field, declared with the plan records;
  - `stale` marking on a household or band change;
  - the edit kinds.

**(f) Decisions touched** (quoted). The model seat rules on each and records `J-A28` rows in its own range.
* J-A19.43 (landed): "geometry columns read the manifested band (the field band raised to the geometry floor); the
  specialisation and the room programme read the field band". (f) agrees; cite it.
* J-A31.43 (landed): "… the manifested band and value (max of field and floor) for everything built, the field for use,
  condition and labels". (f) puts the interior on the field side, as §4.11's floor paragraph already lists "the room
  programme".
* J-A28.43 (landed): the room-programme table in §10.2. The interior ladder's rows are its rows.
* J-A31.49 (landed): `relet`, which drives the household count.
* J-A31.45 (landed) and J-A27.42 (the emulation seat, whose blocks are written but not yet landed): the default middle
  band — the conflict above.
* J-A28.61 (landed): the plan concerns, keyed by the rung's reroll.
* J-A28.71 (landed): §7.3's `prior` is the cached result. This stands against §6.2's "pure function of the building's
  committed state", against §6.5 (9)'s identical results "per (entity, rung, input digest)" over click orders, and
  against §4.1's "never its content" (J-A28.41, J-A28.42).
* F-PLAN (landed §5.2): tier 6, "a hard room omitted and reported".
* §2.6 sub-locations: "stage-3 rooms refine them … and never replace their ids". A re-cut keeps each sub-location
  hosted, unless item 18's mutation removes it.
* §1.4: FTG's one-building-one-household lot is discarded. (f) is the positive form of that discard.
* Item 18 (e): the inverse mutation restores the earlier design.
* Item 23 (the emulation baseline). No reference has interiors that follow their occupants: MFCG and FTG draw no plans,
  and Dwellings plans one household per house. With no epoch and no `relet`, a building's households equal
  `households.built`, and the static baseline is unchanged.
* J48 (`docs/PROGRESS.md`, the manager's intake): "it needs no new records, only program rows and the mutation already
  designed". This holds for record types. The plan's room gains one field, its unit, unless the model seat rules a unit
  record.

The editor rules on:
1. **The reading of the owner's last sentence** (above). The route recommends the capacity reading.
2. **The occupants' band.** Either the field band at the plot (J-A19.43), or the households' own `wealth` (§2.7). The
   route recommends the field band. S10b already places households on plots of their band ± drift, so the two agree
   until an epoch.
3. **The interior rows against the band set.** Either by band name, like every other band-keyed table and like
   `RoomProgramRow.for.band` (landed), or as offsets from `FieldBands.middle`. The route recommends band names; the
   geometry floor stays relative, while the interior reads the occupants' absolute band. With the six-band default the
   rows map as follows:
   - `prosperous` and `rich` → rich;
   - `comfortable` → middle;
   - `modest` → middling-poor;
   - `poor` → poor;
   - `squalid` → destitute.
4. **The unit's representation.** Either a household reference on the plan's room (absent for shared rooms and
   circulation), or a dwelling-unit record. The route recommends the reference, which needs no new record type.
5. **The re-cut's `prior`.** It must be canonical. The route recommends a fixed chain: the plan for (band, households) is
   derived from the building's built programme (its `builtBand` row and `households.built`), one row or one household at
   a time, each step a least-disruption mutation. The result then depends only on the current inputs, which satisfies
   §6.5 (9), and a return restores the earlier plan exactly. The alternative is the cached result at click time, as the
   landed §7.3 row states. That makes the plan depend on when the user clicked whenever the inputs changed twice between
   clicks.
6. **The staff rooms' size rule**: relative to the owners' principal rooms, following the ranked-size aim of the
   synthesis §1.4.
7. **The unit edit**: a new plan event, or derived from doors.
8. **The capacity `relet` must respect**: the smaller of the row's `households.max` and the shell capacity of (c).

**(g) Rule families:**
* the floor plan (28, 29);
* prosperity change (31): rung 1's `relet`, and the field side of the floor;
* assignments: 18's mutation applied to rooms, and 19's programme by band;
* emulation: 27's band set and the middle band.

### Item 29 — Entrances and basements (added to the amendments file while this route was being written)

**(a) Owner's words.** "larger buildings can have more than one entrance. there should always be a street facing
entrance. back or side entrances if an alley presents itself are optional or random but limited. back entrances in the
case of a larger court or yard is recommended. and selective but appropriate basements. I leave all judgement to you."
The program's interpretation, vetoable:
* (a) ENTRANCES ARE A SET: `entrances: Entrance[]`, each `{ vertex, role: main|side|rear|yard|service, faces:
  street|lane|alley|yard|court }`, at least one per building, under five rules:
  1. the main entrance always faces the street, or, for a set-back building, the court or path from the plot's street
     gate;
  2. side and rear entrances only where another access edge exists, by a class-table probability, capped;
  3. a yard door by default when the yard or court is large enough;
  4. every entrance is a named footprint vertex carried by the wing rule, editable, and re-derived under item 18's
     mutation;
  5. the plan rung opens a door at every entrance and roots its circulation at the main one.
* (b) BASEMENTS ARE SELECTIVE AND APPROPRIATE, derived from:
  - the class rows;
  - the terrain gate: no cellar under the water table or the flood band; a half-cellar or walk-out cellar on a slope
    past the class threshold; rock lowers the probability;
  - prosperity;
  - size and storeys.
  The basement lies inside the ground-floor footprint and is smaller, with its own storey record and a stair or trapdoor
  the plan places. It never joins a sewer. It is editable.
* (c) The emulation note: MFCG and FTG give one entrance per building; Dwellings gives one entrance and no back doors,
  and a basement about half the time for one-storey houses, always smaller than the ground floor. Our rules extend these
  and never contradict them by default.
* (d) The homes the item lists: §2.6 and §4.7 S11; §2.5's site plan; the class-table columns; the basement decision in
  §2.6 reading §2.3; edits in §7; item 28; the §13 bars.

**(b) State: PARTIAL.** One entrance exists as MFCG/FTG parity; the set, the rules and basements are absent.

*Already there:*
* §2.6: `entrance: VertexRef /* ('entrance', building id): a vertex on the footprint edge that lies on the access edge */`.
* §2.5: `BuildingSlot { role: string; entranceOn: EdgeSetRef /* ('access', plot id) */ }`.
* §4.7 S11: "Entrance on the access edge 3 ± 1 m from the corridor (FTG's measured rule, §13.5)".
* §1.4's buildings row: "FTG's entrance rule kept".
* §2.5: `Plot.access: EdgeSetRef /* ('access', plot id): ≥ 1 edge always (§5.2 F-PLOT) */`.
* §2.5: `PlotBound.gates … /* every access edge with a treatment has ≥ 1 */`.
* §2.2 rule 7: the vertex role `entrance`, not indexed.
* §2.5: `ContextVector.terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'` and `slope`.
* §2.6: `deriveBase` with the foundation skirt and `skirtMaxCm`.
* §15.2's O17 (f): "0 self-intersecting, duplicate or doorless buildings".

*Missing:*
* the entrance set with roles and faces;
* the main-entrance rule for set-back buildings on multi-building plots;
* side and rear entrances gated by extra access edges, with their probabilities and caps;
* the yard-door default;
* re-derivation under mutation, and entrance edits;
* the basement decision and its storey record;
* the relation to the sewer layer;
* the §13 bars.

`Heights` has no below-ground storey. The design has no "water table" fact as such: the gate must be defined from
§2.3's drainage and `terrainClass` (low, damp, flood) and from height above the nearest water level.

**(c) Home: model, §2.6** — the building's entrance set and its basement.
* The `Entrance` record and `entrances[]`, replacing `entrance`.
* The five rules, as a per-entity derivation that S11, the mutation operator (item 18) and the edit layer all call, as
  `deriveBase` is called today.
* The basement decision as a derived attribute, reading the class rows and the terrain gate: its record in `Heights` or
  beside it (floors below ground, kind full, half or walk-out, the inset ring).

This is the same editor and part as item 28, which consumes both.

**(d) Referencing.**
* **model §2.2 rule 7 and §2.5** (same part):
  - the `entrance` vertex role becomes indexed, `('entrance', building id, i)`;
  - `BuildingSlot.entranceOn` is generalised to the slot's entrance set;
  - the yard-door rule reads `Plot.yard` parts and `Plot.access` beyond the frontage;
  - the plot keeps its street-facing gate or door on the frontage (`PlotBound.gates` or the main entrance).
* **model §2.3** (same part) — the terrain gate reads the flood band and drainage facts (no new raster unless the editor
  defines a water-table depth).
* **pipeline §4.7 S11 and §10.2** — S11 places entrances and decides basements by calling §2.6's rules. The class-table
  and site-plan rows hold, by class × size × prosperity band:
  - the side, rear and service entrance probabilities and caps;
  - the yard-door area threshold;
  - the cellar rows and the slope threshold;
  - the rock cost.
  The existing "3 ± 1 m" rule stays the main entrance's placement.
* **pipeline §4.6 and §4.7 S10** — one line: an alley "presents itself" when S8's interior rule (back lane,
  through-alley) or S10's alley rung gives the plot an access edge beyond its frontage.
* **pipeline II.6** (item 12's rules) — a cellar belongs to its surface building and never joins a sewer tunnel. It is
  not an underground plot.
* **determinism §7.1 and §7.4** — building edits add, remove and move an entrance and override the basement decision
  (edit-target and lifecycle rows).
* **determinism §7.3** — the terrain operator (a) re-derives basements whose terrain gate changed, beside re-basing; the
  mutation operator (item 18) re-derives entrances (a house that becomes a shop gains its street door; a shop that
  closes keeps its door as a house door).
* **determinism §6.1** — a concern for the entrance and basement draws (or reuse of `siteplan`), appended.
* **determinism §5.3** — the invariants: exactly one main entrance per building, facing its street or court; no side or
  rear entrance without an access edge; no cellar under the flood band; a basement inside the ground-floor footprint.
* **rendering §8.2 and §8.5** — entrance glyphs per role at the district band and finer (today "footprints with outlines
  and entrances").
* **rendering §11.1** — VTT doors at every entrance; GeoJSON entrance points with roles; glTF and CityJSON basements
  below `baseCm`.
* **scope**:
  - the §13.2 acceptance bars: exactly one main entrance facing its street or court; no side or rear entrance without an
    access edge; no cellar under the flood band; basement inside the ground-floor footprint and smaller;
  - §13.5: the main entrance's FTG parity row stays; the Dwellings basement share is a descriptive note only, because
    Dwellings has no `baselines.json` row;
  - §15.2's O17 row: doorless → the entrance set;
  - §1.4's buildings row: FTG's entrance rule is the default, the set its extension;
  - §16: pricing;
  - the landing row.

**(e) BASE + STAGED-HOOK.**
* BASE: the entrance set, its rules and the basement decision — the base draws entrances and exports doors and 3-D.
* STAGED: the plan rung's consumption (item 28).

**(f) Decisions touched.**
* §1.4 and §4.7 S11's "FTG's entrance rule kept" ("entrance on the outline ≈ 3 m from the road (C9; 2.99 m measured,
  §13.5)").
* O17 (f).
* J-P19: "`baseCm` = the highest sample plus a plinth, with skirts and stepped wings".
* J-P42 and J-P47: the wing carry (entrance vertices are footprint vertices).
* §2.2 rule 7: the `entrance` role is not indexed.
* D-8: the 3-D export.
* Item 12 (cellars against the underground) and items 18 and 28.

The editor rules on:
* how the "water table" is defined from existing facts;
* whether a basement is part of `Heights` or a separate record;
* the caps per class.

**(g) Rule families:** the floor plan (28 and 29), assignments (16–19 — designation changes add or remove entrances,
and the templates carry the entrance and cellar rows), and sewers (12 — a cellar never joins a sewer).

### Item 30 — Hidden plots and clandestine places (appended to the amendments file after this route first landed)

**(a) Owner's words.** "there should be some plots that do not have a direct access to streets, these are generally only
accessible via alleys. but imagine slums or hidden or clandestine places outside of public view, plots with buildings
or institutions that only those that grew up there or knew about it have access to or the knowledge of." The program's
interpretation, vetoable:
* (a) exposure is a plot property: `Plot.exposure: street|lane|alley|court|hidden`. Hidden means no edge is visible from
  a public way; the access guarantee stays.
* (b) the share is set by prosperity and density as a rule table: high in the poorest, densest bands, low in the
  middling bands, present again at the top as private gated courts; higher in cities than in towns; none in villages.
  The emulation note: MFCG and FTG give every building a street, and the hidden share is our extension.
* (c) PASSAGES through buildings: a way class `passage` under a wing, drawn as an arch glyph, which becomes a passage room
  in the plan rung. S10's alley rung may choose a passage where the frontage is continuous.
* (d) knowledge is separate from geometry: `knownTo: public|local|secret` on plot, institution and building. It is a
  dossier fact, defaulting from exposure, and drives the label policy and the reader through a view-state switch. "The
  place is always on the map; what is hidden is its name and its purpose."
* (e) the evolution hooks: hidden plots arise by densification and vanish by clearance; a passage can be SEALED (exposure
  `sealed`, its buildings decaying as vacant) and reopened.
* (f) editable.
* (g) the homes the item lists, and its §13 bars:
  - every hidden plot is reachable by a chain of access edges from a public way;
  - the hidden share is within its band's target;
  - no secret label at settlement zoom;
  - legibility: a hidden court reads as a court behind buildings.

**(b) State: PARTIAL.** The interior treatments and the access guarantee exist; exposure, the hidden-plot share,
passages as a way, knowledge and the sealed state do not.

*Already there:*
* §4.6's deep-interior rule, S8, J-P15: "`court` (a hollow block, perimeter plots around a shared court …),
  `back_lane` (a lane spine through the middle …), `through_alley` (an alley spine joining two opposite frontages),
  `rear_plots` (a second row of plots reached by a passage). Default shares — poor: court 0.35, back lane 0.25,
  through-alley 0.30, rear plots 0.10; modest: 0.45 / 0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich:
  0.75 / 0.10 / 0 / 0.15".
* §4.7 S10 (9): "slivers narrower than the minimum plot width that connect two ways become `alley` L3 faces, not spines
  (GEO-25)".
* §2.5: `Plot.access: EdgeSetRef /* ('access', plot id): ≥ 1 edge always (§5.2 F-PLOT) */` and `Block.interior`.
* §5.2, F-PLOT's ladder: "… → merge into the neighbour → insert an alley for access → typed residue (court / vacant)",
  with the test "every plot has ≥ 1 access edge (100 %); 0 landlocked buildings".
* §2.4: `WayClass` = `through|primary|secondary|lane|alley|cul_de_sac|track|path|quay|pier|bridge|ford`. There is no
  `passage`.
* §9.1: `LabelEntity { … lod: LodBand[]; … hidden?: boolean }` and the `hideLabel` event.
* §2.9's view state is per viewer: "layer choices, `stylePreset` (a per-viewer preset …)"; J-R34.
* §8.5: "enclosed courts stay `ground` and take `court` from the district band".
* §4.11: `densify`, `subdivide` and `clear`.

*Missing:*
* the exposure attribute and its derivation;
* a deliberate hidden-plot share by band and density, including the private courts at the top;
* the passage way class, its glyph and its plan room;
* `knownTo` on plot, institution and building;
* the knowledge label policy, and the reader and gazetteer policy;
* the viewer's knowledge switch;
* the sealed state and reopening;
* the edits;
* the §13 bars.

**(c) Home: pipeline, §4.6** — S8's deep-interior rule, with §4.7 S10's plot cut and alley rung in the same part.
* The hidden-plot mechanism: band rows by prosperity and density give target shares of court, rear, alley-reached and
  hidden plots, and private gated courts at the top. Villages are none.
* How S8 and S10 make hidden plots deliberately.
* How `exposure` is derived from the plot's reach.
* Where S10's alley rung chooses a passage.

**Second home, by R7 (labels):** rendering §9.2 states the knowledge label policy in full, in "the candidate set of a
stop" — the one place where `knownTo` changes what is drawn.

**(d) Referencing.**
* **model §2.5 and §2.6** — `Plot.exposure` (street, lane, alley, court, hidden, and `sealed` from (e)) and
  `knownTo: public|local|secret` on plot, building and `Institution`, defaulting from exposure (hidden → local).
* **model §2.4** — the `passage` class. **Planarity ruling.** A passage "under a building's wing" cannot be an ordinary
  L1 way: its L2 corridor would cut the footprint the wing spans, and S10, which is to choose it, never writes L1 (§4.1:
  "S10 never writes L1"; J-P46). The model editor rules between:
  - (i) a passage as a covered L3 alley-as-face (GEO-25) running through the building's footprint region, with the wing
    spanning it — the stage-3 union contract and the wing carry of §2.6 must then accept a footprint with a passage
    sub-face;
  - (ii) a declared exception to the level nesting, confirmed by the kernel editor.
* **model §2.8** — the sealed state: an access edge marked sealed; the plot's exposure `sealed`; its buildings decay as
  vacant (item 8); reopening restores it.
* **model §2.9** — a per-viewer knowledge key in the view state (the places, or knowledge sets, the viewer holds),
  outside every digest, like `stylePreset`.
* **model §2.6** (item 28's editor) — the plan rung reserves the passage cells before partitioning, as a passage room.
  The passage's ends are the building's entrances onto it (item 29's entrance set).
* **kernel §3.4, §3.7 and §3.10** — confirm the chosen passage representation keeps planarity and nesting. Name any
  operation option (ii) would need, or confirm option (i) needs none.
* **pipeline §4.7 S10b** (same part; item 16's templates) — an institution with `knownTo` local or secret prefers
  hidden plots.
* **pipeline §4.11** (same part) — densification makes hidden courts reached by a new passage; clearance removes them;
  seal and reopen are conversion kinds.
* **pipeline PART III** (same part) — villages have no hidden share by default.
* **determinism §5.2 and §5.3** — F-PLOT keeps its guarantee: a hidden plot's access is a chain of access edges
  (alley, court or passage faces) to a public way, never landlocked. The §5.3 invariant: every hidden plot reachable
  from a public way.
* **determinism §7.1 and §7.4** — edits: seal or open a passage; hide or reveal a place (`setAttr knownTo`); add a
  passage. Edit-target and lifecycle rows.
* **determinism §7.7** — `knownTo` of a dossier-backed institution is a dossier fact (item 20's contract).
* **rendering §9.2 (the label policy's home)**, stated in full in "the candidate set of a stop":
  - `knownTo` filters the candidate set before the greedy runs: local and secret names are hidden at the settlement
    (city) band; local names are shown at the neighbourhood band; secret names are shown only at the building band, or
    when the viewer's knowledge key holds them;
  - `LabelEntity.lod` and `hidden` (§9.1) stay the model's mechanisms;
  - placement digests are per (stop, knowledge set), and goldens use the empty set;
  - §9.5's legend (numbered districts, lettered landmarks) honours the same filter.
* **rendering §8.2, §8.3 and §8.5** — an arch glyph for `passage` in the symbol catalogue, so every semantic keeps
  exactly one registry glyph. Legibility at the city band: a hidden court reads as a court behind buildings (ground and
  `court` tones, the building masses), never as an empty block.
* **rendering §11.2 and §11.1** — the reader: `query` (gazetteer, hit, `inView`) and hover content withhold the names and
  purposes of local and secret places unless the viewer's knowledge key holds them. Exports take the export's view
  state, so a shared SVG, PNG or GeoJSON leaks no secret name.
* **rendering §11.3** — the knowledge key travels as a per-viewer view key, like `stylePreset`. §11.4: a dossier may
  designate a place secret.
* **scope**:
  - §13.2 and §13.5 bars:
    - every hidden plot is reachable by an access-edge chain from a public way;
    - the hidden share is within its band's target ± tolerance;
    - no label of a secret place at the city band without the knowledge key;
    - a hidden court is drawn as a court, and the §8.5 figure-ground metrics still hold;
    - the emulation presets (MFCG and FTG modes) produce a 0 hidden share;
  - §15.2's O5 letter "access edge 100 %", extended to chain reachability;
  - §14: the app's gazetteer honours the knowledge key;
  - §16: pricing;
  - the staged evolution row: the seal and reopen hooks;
  - the landing row.

**(e) BASE + STAGED-HOOK.**
* BASE: exposure, the hidden shares, passages, `knownTo`, the label and reader policy, the edits.
* STAGED: the evolution arising and vanishing, sealing and reopening by the engine (item 8), and SettlementForge's
  designation of secret institutions (item 20's mapping). Sealing by hand is available in the base.

**(f) Decisions touched.**
* J-P15: "the deep-block interior decided in S8 by band shares", with §4.6's default shares.
* §5.2 F-PLOT and O5 (a): "access edge 100 %".
* GEO-25: alleys as L3 faces, not spines.
* §4.1: "S10 never writes L1"; J-P46.
* §2.6's stage-3 contract: "the union of the composed wings equals the outline's union exactly".
* J-R12: label placement as view data.
* J-R34: "a per-viewer `stylePreset` view key".
* §8.5's figure-ground contract (MFP-1).
* **With item 23** — rule whether the hidden share is on by band in the default preset (a tendency layered on the
  references' every-plot-fronts-a-street baseline, which the emulation presets keep, as the item says), checking
  §13.5's plot and streetwall parity rows.
* **Clean room** — the item cites "banned prior #4" for its legibility bar. That is a record id of the map-corpus
  preview, which J25 and J27 keep out of the design and which lives under `partitioned/`, which the pass may not use.
  State the bar in the design's own terms (§8.5), never with the corpus id. The item's historic warrant — closes, courts
  and Hinterhöfe, traboules, gated dead-end lanes — is rationale for `J-A30`'s Part A entry, not normative text.

The editor rules on:
* how "visible from a public way" is decided (adjacency to a public corridor or open face, or a sight-line test);
* the passage representation.

**(g) Rule families:**
* evolution (8): sealing, densification, clearance;
* assignments (16): hidden plots preferred for secret institutions;
* the floor plan (28, 29): the passage room and its entrances;
* the dossier (20): `knownTo` as a dossier fact.

### Item 31 — Prosperity change drives plot fusion and splitting, as a slow asymmetric ladder (appended after this route first landed; routed from the final text)

**(a) Owner's words.**
* "in regards to settlements changing some neighborhoods can grow poor or grow rich, this should affect plot
  aggregation and fusing or separation organically."
* On the first draft: "even if a neighborhood grows poor, it is hard to imagine that it would be torn down into a slum
  if it was filled with mansions."
* On the correction: "it is much easier for a poor neighborhood to grow rich and merge plots".
* On the floor, the item's final paragraph (added at 20:59, routed in a later update): "rich places can be changed but
  their floor is bounded to middle class in a sense. think of it as refurbished housing or development. so once a
  neighborhood generally gets to a middle class outcome, that forever remains its geometry until vacancy, ruin, fire,
  war, or redevelopment shifts things entirely. it would cycle in appropriate circumstances between rich and middle".

The program's interpretation, final and vetoable:
* (a) The trigger is a band change with hysteresis at an epoch. The block becomes DUE; a churn cap applies per epoch and
  per block.
* (b) The stock persists and form follows wealth with a lag. The response is a ladder, and NO OCCUPIED BUILDING IS
  DEMOLISHED BY A BAND CHANGE:
  - rung 1, at every due epoch — use and occupancy:
    - growing poor: lodgings with several households per building; the room programme re-cut for many tenants
      (item 28); outbuildings converted; yard infill; the garden built over; neglect in the fabric;
    - growing rich: renovation and extension (item 18), outbuildings restored, gardens reclaimed, infill cleared;
  - rung 2, after the table's duration — tenure and yards: a back court with its passage (item 30), or a court cleared;
    a class change keeping the shell (item 18);
  - rung 3, only on vacancy, ruin, fire, war or redevelopment — the geometry follows. The fusion orderings (vacant or
    same-owner first, then rear plots into their front plot) and splitting orderings (the widest frontage, then the
    deepest yard) apply to S10's re-cut of the due block, with its neighbours fixed, under the band's target, capped by
    churn.
  THE LADDER IS ASYMMETRIC. Speed is set by the REPLACEABILITY of the standing stock — a class-table column: tents,
  sheds and hovels at once; cottages and timber row houses after a short duration; stone houses after a long one;
  manors, halls and institutions only by ruin or redevelopment — and by DIRECTION: rising wealth reaches rung 3 within a
  few epochs by replacing cheap stock; falling wealth stays at rungs 1–2 for generations. The rule table carries a
  duration per rung by direction and by replaceability.
  THE GEOMETRY HAS A FLOOR. Each plot records `builtBand`, the band its present stock was built for, and derives
  `geometryFloor`: the settlement's middle band for stock built at or above it; for stock built below it, its own built
  band ("a hovel cannot read poorer than a hovel"). The manifested geometry band never falls below the floor by wealth
  change alone: a mansion district grown poor reads as middle-class geometry — big plots, big shells, subdivided into
  lodgings, yards infilled — while its occupants, condition and labels follow the field. Between the rich and the
  middle manifestation it cycles freely and reversibly through rungs 1–2, with no geometry change. Only rung 3's
  events reset `builtBand`, and the new stock sets a new floor. The middle band is each settlement's own (§4.5's
  per-town cuts).
* (c) Lineage survives: a fused plot takes its largest parent's lineage key, and split children are keyed by the parent
  plus the child index. An undo is exact.
* (d) Base hooks:
  - the per-block re-cut with fixed neighbours;
  - the lineage rules;
  - the `due` mark with the band and the epochs spent in it;
  - the ladder rows (duration per rung by direction and replaceability, churn cap, orderings) and the replaceability
    column;
  - households per building and the decline states (§2.6, §2.8);
  - fusion and splitting as edit kinds (§7);
  - `builtBand` and `geometryFloor` on the plot record (§2.5), with the floor rule;
  - the §13 bars.
* (e) The emulation note: no reference evolves, and the static baseline is unchanged when no epoch passes.

**(b) State: PARTIAL, and the current evolution rule contradicts it.**

*Already there:*
* §4.11, "Survivors (LC-12)": "A re-evaluated field acts on them **only through explicit, rate-limited transformation
  events**, chosen by rules and drawn from `…/epoch=e` streams: `densify` / `subdivide` when a plot's value has risen
  past a cut point by more than the hysteresis, `amalgamate` when neighbours join, `rebuild` (a class upgrade), `decay`
  when the value has fallen past a cut; at most a table share of a district's plots transforms per epoch (default 10 %
  per decade)".
  - Subdividing on a *rise* runs against the owner's granularity rule (rich quarters join plots, poor ones split them)
    and against item 31.
  - The rule does not protect occupied buildings.
  - It has no ladder, no direction asymmetry and no stock replaceability; the cap is per district.
* §4.5: `FieldBands.hysteresis` (0.02), and "A block keeps its recorded band unless its value crosses a cut point by
  more than the hysteresis".
* §4.7 S10 (7): "**Joins and splits, one law** … both directions read the same context vector — one code path (O18 g)".
* §2.5: `Plot.members` ("joined plots (EVO)"). `Block` has no due mark.
* §6.3, "**JOIN and SPLIT.** A joined plot takes its address by the anchor rule from the member whose frontage anchor it
  keeps; … A later SPLIT **resurrects** a member whose anchor matches".
* The J-DET-2 index row: "lineage kept only for entities surviving un-derived; successors get the address only".
* §7.1: plot `split`, `join` and `merge` events. §7.4: "structural ops on the plat (§3.4) with dependants re-derived".
* §7.2: a field brush "re-derives every block whose plot samples moved … by more than τ = 0.01 of the field's range".
* §2.6: `Building.occupants: Id[]` and `dwelling?`. §2.7: `Household { plot; building; members; wealth }`.
* §1.4 discards "FTG's one-building-one-household lot".
* §2.8: `abandoned`, `decayed` and `ruined`, with their §8.2 tone overrides.
* The class table: §10.2's `BuildingClassRow` columns, read through §2.6's `ClassRules`. It has no replaceability.
* The `ConversionOp`s `densify`, `subdivide`, `amalgamate` and `rebuild`.

*Missing:*
* the three-rung ladder and its protection of occupied buildings;
* the asymmetry by direction and by stock replaceability;
* the replaceability column;
* the per-block DUE mark with its band and the epochs spent in it;
* the per-block churn cap;
* households per building as a capacity that rung 1 raises;
* neglect states;
* rung 2's tenure and yards, and class change keeping the shell;
* rung 3's triggers and orderings;
* lineage continuity through fusion and splitting;
* fusion and splitting as least-disruption edit kinds;
* the §13 bars.

*The geometry floor (the final paragraph): ABSENT as a rule. Its supports are there, and two statements contradict it.*

*Supports:*
* §4.5, "Over time (LC-12)": "surviving plots keep their built state and change only through §4.11's explicit,
  rate-limited transformation events"; §4.11: "Surviving plots and buildings keep their built state." The design keeps
  the stock, but records no band for it.
* §2.8, `DerivationRecord`: `band?: string /* the recorded band hysteresis reads */`. This is a band memory, but it
  cannot be the floor's. The record is outside the model digest, and "Every derivation that changes the entity's leaf
  digest (§6.2) rewrites it", so a rung-1 or rung-2 mutation of the site plan would overwrite it with the poorer band.
* §4.5, Bands: "The cut points are computed **once per town**". So each settlement's middle band is already its own in
  value, but no band is designated the middle one.
* §4.5, Bands: "Bands are used **only where a table needs a class**; continuous rules (coverage, plot size, greenery
  share, building scale) **interpolate linearly between band rows along the value**". A floor on the band alone would
  leave every interpolated rule free to read the poorer value.
* §2.5 (J-P1): "'rich quarter' and 'poor quarter' are *descriptions* derived from the prosperity field for naming and
  the description line only". Labels already follow the field, as the floor asks.
* §2.9: "Entities are stored as columns (identity, lifecycle, attributes, derivation records and naming records,
  §2.8)", while the fields "are not stored" and are recomputed on load (J-DET-12). A plot attribute survives a load; a
  value recomputed from the field would not.

*Contradicts:*
* §2.5, the `DerivationRecord` bullet: "a field brush or an epoch compares each plot's current sample with the recorded
  one and re-derives only what §7.2's τ rule selects". An epoch that re-derives plots by τ gives neither the ladder nor
  the floor. This is stale text (listed below).
* §4.11's `decay` "when the value has fallen past a cut" (quoted above) has no bound.

*Missing:*
* `builtBand`, with a continuous companion for the interpolated rules;
* the derived `geometryFloor`, and each settlement's middle-band designation;
* the split between the geometry band (plots, shells, yards) and the field band (occupants, condition, labels);
* which paths set `builtBand`: rung 3, plus the rulings in (f) on refurbishment, `Adjust`, brushes and template
  replacement;
* resurrection, undo and migration of the attribute;
* the floor's §13 bars.

**(c) Home: pipeline, §4.11** — the "Survivors" paragraph, rewritten as the slow asymmetric ladder:
* the DUE trigger;
* the three rungs with their protection of occupied buildings;
* the duration of each rung by direction and by the stock's replaceability;
* the churn cap per epoch and per block;
* how each rung calls the shared operators: item 18's mutation, item 30's back courts, item 17's relocation, and S10's
  re-cut with neighbours fixed.
The rung-3 orderings are stated with §4.7 S10 (7)'s one join-and-split law, in the same part.

**The geometry floor is stated once, in the same Survivors paragraph:**
* `geometryFloor = min(builtBand, the settlement's middle band)`, by the band order;
* the geometry band, `max(field band, geometryFloor)` — and on the continuous value, `max(field value, the floor's
  value)` — is what every change other than a rung-3 event reads for plots, shells, yards and outbuildings;
* the field band is what occupancy (households per building), condition (neglect) and labels read;
* rung-3 events, and the redevelopment-class edits that §7 rules on, set `builtBand` to the band of the new stock;
* the rich ↔ middle cycle runs through rungs 1–2 only, with no plot or shell change;
* each rung-1 and rung-2 operation of the ladder table carries a manifestation column. It is either geometry, bounded
  by the floor (the yard-infill kinds, back courts, outbuilding conversions), or occupancy and condition, which are
  free.
The middle band's designation is stated at §4.5, in the same part, with item 27's default band set.

**(d) Referencing.**
* **pipeline, same part:**
  - §10.2: the class table's `BuildingClassRow` gains the replaceability column (tents, sheds and hovels at once;
    cottages and timber row houses short; stone houses long; manors, halls and institutions only by ruin or
    redevelopment). The column's single home is here; §2.6 points to it. Also here: households per building (lodgings)
    follow the roster — the dossier's roster where one exists — and item 17's relocation, with a household capacity per
    building by class and band.
  - §10.3: households follow a relocated or re-let use.
  - §4.7 S10 (7): the incremental form of the join-and-split law, with the fusion and splitting orderings, neighbours
    fixed, under the band's target, capped by churn.
  - §4.7 S11 (item 18's operator): rung 1's renovation and extension; rung 2's class change keeping the shell (mansion →
    tenement, inn, workshop, chapel); outbuildings converted or restored; yard infill or clearance.
  - §4.6 (item 30): rung 2's back court with its passage, or the court cleared and re-gardened; passages sealed or
    opened as the band rises.
  - §4.9: gardens built over and reclaimed through the yard-planting rows.
  - §4.5: the DUE trigger reads `FieldBands`' hysteresis (one line).
  - §4.5 (the floor; a cross-note to item 27's seat): the Bands bullet names each settlement's middle band in the
    default band set. With FTG's six tiers as item 27's default, the ruling picks the middle tier (modest or
    comfortable) or defines it as the band that holds the town's median household. The "Over time" bullet points to
    the floor.
  - §4.7 S10 (2) and S11 (the floor; a cross-note to the assignments seat for S11): in every re-derivation that is not
    a rung-3 event or a redevelopment-class edit, S10's granularity reading and S11's site-plan reading take the
    geometry band and value. Item 19's designation template splits its columns: SHAPE (size budget, structures,
    storeys, heights, frontage, court and garden) reads the geometry value; USE and CONDITION (specialisation,
    households) read the field value. On a band change, item 18's mutation never subtracts shape below the geometry
    band's template.
  - §4.6 (the floor; a cross-note to item 30's seat): rung 2's back court with its passage is geometry. It is allowed
    only where the geometry band is itself a band whose row makes such courts, so a middle-floored plot's yard is
    infilled, not cut into a court of tenements.
  - PART II.1 and II.3 (the floor): a `refine` close-up reads the committed plots and never changes `builtBand`. A
    `replace` close-up — a template fabric, "a model edit" (II.4) — is a redevelopment-class edit, so its plots take
    `builtBand` from the band the template reads. II.3's Normal / Manor / Empty / Green dispatch reads the geometry
    band.
* **model §2.5** — `Block` gains `due?`: the band it must meet and the epochs spent in it.
* **model §2.6** —
  - `ClassRules` and the building record read the class table's replaceability (a pointer to §10.2);
  - households per building: `occupants` as households with a capacity by class and band, or an explicit `households`
    list;
  - neglect is expressed through material and roof attributes — rendering-only by item 19 — and the roof lost late
    through `RoofSpec 'none'`;
  - a class change keeps the shell (item 18's mutation record);
  - the plan rung (item 28) re-cuts its room programme from one household to many.
* **model §2.8** — neglect and multiple-occupancy states in one family with item 8's ladder: occupied, let or multiply
  occupied, neglected, vacant, derelict ….
* **model §2.5 (the floor)** —
  - `Plot.builtBand: string` — a band label of the settlement's `FieldBands` — and a continuous companion (for example
    `builtProsperity: number`, the field value on [0, 1] the stock was built for). Both are persisted attributes: in
    schema order in the leaf digest (§6.2) and in the snapshot's columns (§2.9);
  - `geometryFloor` is derived at read from `builtBand` and the middle designation, and never stored, so a changed
    designation needs no migration;
  - `FieldBands` gains the middle designation (for example `floorBand: string`);
  - the `DerivationRecord` bullet's epoch clause is rewritten: an epoch acts only through §4.11's ladder, bounded by
    the floor.
* **model §2.8 (the floor)** — `DerivationRecord.band` keeps "the recorded band hysteresis reads". One line
  distinguishes the two memories: `DerivationRecord.band` sits in the records digest and is rewritten by every
  derivation; `builtBand` sits in the model digest and is rewritten only by rung-3 events and redevelopment-class edits.
  The entity registry's plot row gains the attribute's migration hook (§7.5).
* **determinism §6.3** — the lineage rule: a fused plot keeps its largest parent's lineage; a split child is keyed by
  the parent's key plus the child index. Reconcile it with the JOIN/SPLIT address rule (the anchor member; `resurrect`),
  and make the exception to J-DET-2 explicit: a mutation continues lineage, and only a reroll takes fresh lineage. The
  owner: "It's not new rerolls its modifications and variations to the original seed."
* **determinism §6.1** — a pointer: lineage keys the streams, so the fused plot's buildings keep their streams.
* **determinism §7.1 and §7.4** — fusion and splitting as edit kinds that run the least-disruption re-cut with item
  18's mutation. Either re-specify today's plot `join` and `split` ("dependants re-derived") or add kinds. The undo
  record keeps the former rings and records, so undo restores them exactly.
* **determinism §7.2 (ruling)** — the prosperity brush re-derives blocks past τ. Decide whether it keeps that
  re-derivation, as an explicit edit with its fate report, or respects "no occupied building removed by a band change"
  by running the ladder's operators.
* **determinism §7.3** — the re-cut's effective scope is the due block, its neighbours fixed; fates.
* **determinism §7.6** — the ladder rows (duration per rung by direction and replaceability, churn caps, orderings) and
  the replaceability column are editable tables (one line in its enumeration).
* **determinism §5.2 and §5.3** — F-PLOT holds after every re-cut; party walls agree on both sides. An epoch invariant:
  no occupied building is removed by a band change; a redevelopment first vacates, by item 17's relocation.
* **determinism §6.3 (the floor)** — a split's resurrected member takes `builtBand` from the rung-3 event that re-cut
  it, not from its tombstone's last record; only an undo restores the tombstone's record exactly. The floor draws no
  random numbers, so §6.1 gains no stream.
* **determinism §7.1 (the floor)** — `builtBand` is written by the rung-3 edit kinds (fusion, splitting, `rebuild`,
  and redevelopment), which re-derive the stock to the band they set. The editor rules on a direct `setAttr` of
  `builtBand` in the plots row of the edit targets (today "`setAttr` (use, owner)"): either it is such a redevelopment,
  with the stock re-derived to match, or it is refused as derived state. It is never a bare value change that leaves
  the stock disagreeing with its record. `geometryFloor` is never edited directly.
* **determinism §7.2 and §7.3 (a) 3 (ruling; joins the §7.2 ruling above)** — a prosperity brush, and the terrain
  brush's re-evaluation of the field drivers, re-derive blocks past τ. Rule one of two options. Either they stay
  authorial re-derivations that set `builtBand` in their scope, so the static base behaves exactly as today, or they
  respect the floor. The route recommends the first: a brush is how a user designs the town, and the floor governs
  wealth change over epochs.
* **determinism §7.3 and §7.4 (the floor)** — the lifecycle row of `builtBand`:
  - create: generation (the plot's band at S10), rung-3 events and the redevelopment-class edits;
  - read: the ladder, and S10 and S11 through the geometry band;
  - persist: the attribute columns (§2.9);
  - regenerate: Regenerate (keep settings) keeps it. `Adjust` ("re-deriving it with the new field is the explicit
    `Adjust`", §4.11) needs a ruling: either a redevelopment-class re-derivation that resets it in its scope and lists
    it in the fate report, or one that respects the floor;
  - undo: the undo record restores it;
  - migrate: §7.5.
* **determinism §7.5 (the floor)** — a document written before the attribute gets `builtBand` = its plot's
  `DerivationRecord.band`. This is exact for every document without an epoch.
* **determinism §7.6 (the floor)** — the middle designation and the manifestation column are editable table values.
  By item 23 the floor is a default, not a law.
* **determinism §5.3 (the floor)** — an epoch invariant: after an epoch, a plot without a rung-3 event keeps its ring
  and its shells, and its geometry band is at or above its floor.
* **rendering §8.2** — neglect style classes (wear, patched roofs, a roof lost late), extending item 8's classes;
  materials stay rendering-only.
* **rendering (the floor): no new text.** Condition draws from §2.8's states through the neglect classes above.
  Labels and descriptions stay on the field (J-P1). Nothing in rendering reads `builtBand`.
* **scope**:
  - §13.2 bars: after a re-cut every plot keeps ≥ 1 access edge and the class minimums; party walls agree on both sides;
    granularity is within the band's target ± tolerance; the churn cap holds; no occupied building is removed by a band
    change; generation-then-mutation equals the same history replayed;
  - a schema test that every class has a replaceability and every rung a duration per direction and replaceability;
  - §14: `@plat/tables` names the ladder table beside `ladder.json` and `workLimits.json`;
  - the staged evolution row: the trigger, durations and churn as hooks;
  - D-25: the vocabulary gains the ladder;
  - §15.2: O18 (g) and the hooks row;
  - §16: the edit kinds at M3a, the hooks at M4;
  - the floor's §13.2 bars:
    - (1) after any run of epochs with no rung-3 event on a plot, its ring and its buildings' shells are unchanged,
      and its geometry band is at or above its floor;
    - (2) after a rung-3 event, `builtBand` is the band of the new stock;
    - (3) a rich → poor → rich run with no rung-3 event leaves rings and shells byte-identical, and returns the rung-1
      and rung-2 attributes to the rich manifestation within the ladder's durations;
    - (4) with no epoch, `builtBand` equals each plot's generation band and the geometry band equals the field band
      (item 23's unchanged static baseline);
    - (5) a town and a metropolis each resolve their own middle band;
    - (6) a schema test that every band set names its middle band;
  - no golden exists before M1 (D-24), so the new attribute needs no declared golden shift;
  - D-25's vocabulary also gains the built band, the geometry floor and the geometry band;
  - the landing row, whose clause map gains the floor.

**(e) STAGED-HOOK + BASE.**
* STAGED: the epoch trigger, the ladder's durations and the churn belong to the evolution stage (item 8).
* BASE:
  - the per-block re-cut with fixed neighbours;
  - the lineage rules;
  - the due mark;
  - the ladder rows and the replaceability column;
  - households per building and the neglect states;
  - fusion and splitting as edit kinds usable by hand;
  - the §13 bars.
* The floor: `builtBand` and its value companion, the middle designation, the floor rule, the manifestation column and
  the attribute's lifecycle paths are BASE. They stay inert until an epoch passes: with no epoch, the geometry band is
  the field band. Applying the floor at epochs is the engine's (STAGED).

**(f) Decisions touched.**
* §4.11's Survivors rule (quoted; LC-12) — its direction and its demolition-permissive scheme are replaced.
* §4.5 and LC-6: the hysteresis.
* §6.3's JOIN and SPLIT, and J-DET-2.
* §7.4's structural-ops row.
* §7.2's τ brush rule.
* O18 (g).
* D-25.
* §1.4's rejection of FTG's one-building-one-household lot.
* **Item 8's owner note.** "The owner's war example is hypothetical and NOT to be written into the design". Rung 3's
  list names "war", so express rung 3's triggers generically — vacancy, ruin, and the destructive or redevelopment
  circumstance events of `EpochInputs.events` — and keep the war scenario out of the normative text, or record the
  ruling.
* **Rung 3's rich-direction redevelopment.** "A buyer joins two or three small worn plots and builds one large house",
  within a few epochs, must still honour "no occupied building is removed by a band change". Define redevelopment as
  purchase, then relocation (item 17), then vacancy, then re-cut.
* **Item 23.** The static baseline is unchanged when no epoch passes.

**The floor's rulings** (the final paragraph):
* §2.5's `DerivationRecord` bullet, the epoch clause (quoted in (b)): rewritten, not kept.
* §2.8's `DerivationRecord.band`: kept, and distinguished from `builtBand`.
* §4.5's Bands (LC-6, FTG-2): the per-town cuts stay. Rule on an explicit `setAttr` on `FieldBands`, which
  "re-derives every block whose band changes": it is either authorial, setting `builtBand` where it re-derives, or
  bounded by the floor.
* AM-6 and MFP-7, "prosperity is a gradient and a band": the floor is stated on the value as well as on the band. Rule
  on the continuous companion and on the floor's value (for example the middle band's lower cut, or the built value
  when that is lower).
* Item 27's default bands (J28): which band is the middle one, ruled with the emulation seat.
* J-DET-12, "the prosperity, density and greenery fields recomputed on load": `builtBand` is persisted as an attribute
  and is never recomputed from the field.
* §7.2's brush, §7.3 (a) 3's terrain-driven field re-evaluation, and §4.11's `Adjust` with §7.4's
  "regenerate / adjust / re-derive from Sk" row: each is authorial or floor-bound (see (d)).
* §6.3's JOIN and SPLIT resurrection: `builtBand` comes from the event, not from the tombstone.
* J-P1: unchanged. Labels follow the field.
* **Refurbishment.** The owner says "think of it as refurbished housing or development" and "once a neighborhood
  generally gets to a middle class outcome". The draft sets `builtBand` only at rung 3. Rule whether a completed upward
  refurbishment at rungs 1–2 raises `builtBand` — item 18's extension of a building to a band's shape template — so
  that a renovated district keeps its floor too. The owner's "gets to" and "refurbished" favour raising it. Lowering
  stays rung-3 only.
* **"Generally".** The draft keeps the record per plot, and the neighbourhood's outcome is the aggregate of its plots.
  Record plot granularity, or aggregation by block, as the ruling.
* **Item 8's owner note, again.** The floor quote names "war" too. Rung 3's triggers stay generic: vacancy, ruin, and
  the destructive or redevelopment circumstance events.
* J45 (`docs/PROGRESS.md`) records the manager's intake of the floor. It is program history, not an architecture
  decision; the J-A31 rows state the rulings.

**(g) Rule families:**
* evolution: 8, 11, 17, 22, 25, 31;
* assignments: 17 and 18 — relocation and mutation;
* item 30's back courts and passages;
* item 28's room programmes, which mutate from one household to many (item 28 (f), the interior ladder: the interior
  has no floor);
* the floor also joins:
  - the emulation family: item 27's default bands name the middle band it reads;
  - the assignments family: in items 18 and 19, shape columns read the geometry band, and use and condition columns
    read the field band;
  - item 30: back courts are geometry;
  - stage 2: II.1 and II.3.

## Rule families (designed together)

Each family is one rule set. Its members share tables, records and operators, and their editors must read one another's
sections and cross-part notes.

1. **Assignments — 16, 17, 18, 19** (with 20 and 22 as users, 26 for supply chains, 28 and 29 for room programmes and
   entrances, and 30, whose secret institutions prefer hidden plots through 16's templates). One placement solver (§4.7
   S10b, item 16) reads one set of relation templates and supply edges (§10.2). One designation-template table (§4.7
   S11, item 19) feeds one mutation operator (§4.7 S11, item 18), which relocation (§4.11, item 17), assignments and
   dossier events (§7.7, items 20 and 22) and the plan rung (item 28) all call. The one data-model change they share is
   use ≠ building (§2.6 and §2.7, item 17). Homes: pipeline for 16–19; determinism §7.7 for the assignment and dossier
   paths; model for the `Use` record.
2. **Evolution hooks — 8, 11, 17, 22, 25, 31** (and 10's and 13's island decline, and 30's densification, clearance,
   sealing and reopening of hidden plots). 31's slow asymmetric ladder — use and occupancy, then tenure and yards, then
   geometry only on vacancy, ruin or redevelopment; speed by direction and by the stock's replaceability; no occupied
   building removed by a band change — is how the one tendency table acts on survivors. Its geometry floor bounds the
   downward manifestation at each settlement's middle band (`builtBand`, reset only by rung 3). One persistence-order
   and tendency table in §4.11 orders uses → buildings → plot boundaries → streets and walls → the underground → terrain
   and water, with weights and chance. One `ConversionOp` list holds the decline kinds, tunnel kinds, use relocation,
   terrain and water kinds, and the island kinds if adopted. The lifecycle states live in §2.8, the style classes in
   §8.2, the identity rules in §6.3, and the event rows in §7.1 and §7.4. The base's built grow path already obeys
   regrowth-first (item 8 (e)). Homes: pipeline §4.11 (8, 17, 25), II.6 (11) and determinism §7.7 (22, whose epoch
   clause points to §4.11).
3. **Islands — 10, 13, 15** (II.6). One island rule: rung-gated (13, through a `RungProfile` layers row in §1.1),
   count-drawn and prosperity-weighted (15), sized by the two-prosperity supply law (10). The toggle is visibility (§8.4
   `LayerSpec`, §7.8). The D-3 ruling decides whether the realism base admits islands in the model at all. §4.5 S7b (5)
   reads the rule.
4. **Sewers — 11, 12, 14** (II.6), with 29's cellar rule. Existence by tier (14, a `RungProfile` layers row), the
   lifecycle (11), and underground neighbourhoods on navigable tunnels only (12). A cellar is its surface building's and
   never joins a tunnel (29). The toggle is visibility; the D-3 ruling covers the `navigable` preset.
5. **Dossier flow — 20, 22**, with 21's host boundary and 30's `knownTo` as a dossier fact. §7.7 holds the
   dossier-backed class, rejection, positive placement, re-application and mutation with least disruption. §11.3 and
   §11.4 hold the one-way door and the absence of any dossier-writing command. §17.3 holds the arm's-length separation
   that makes the protocol data-only (21).
6. **Emulation baselines — 23, 24, 25, 26, 27.** §7.6 states the principle and the provenance marker (23). Each baseline
   lands in its stage: markets §4.2 (24), terrain and water change §4.11 (25), hinterland order §4.9 (26), wealth bands
   §4.5 (27). 27's default band set also names the middle band that 31's geometry floor reads. 19's FTG material default
   belongs here too.
7. **The floor plan — 28 and 29**, with 16–19's room programmes and entrance and cellar rows, 18 and 22's mutation, and
   30's passage (a passage room reserved before partitioning, with entrances onto it). Model §2.6 holds the fourth rung,
   the entrance set and the basement; §2.8 and §2.9 the rung states and the elaboration cache; §4.1 the click policy;
   §6.1 the per-rung streams; §7 the plan and entrance edits; §8.5, §8.6, §11.1 and §12.7 the draw, export and budget;
   §13.2 the acceptance bars. Item 28 (f), the interior ladder, joins this family to prosperity change: 31's rung 1
   `relet` changes a building's household count, and §2.6's plan re-cuts the interior inside the unchanged shell,
   reading the occupants' band where the shell reads the floor.

## Cross-cutting duties

* **Landing table (scope).** Add a landing table for items 8–29 beside §0.2 (which lands items 1–7 of
  `docs/AMENDMENTS-2026-09-25.md`), in §0.2's form — one row per item: rule, landing (the home), clause map. Item 9's row
  records SATISFIED at §1.1 and §13.6 (3). A sibling subsection or a retitled §0.2 is the scope editor's choice.
* **Pricing (scope §16).** "A pass that adds build work prices it here": every BASE mechanism above names the effort
  line that absorbs it or widens one, and the milestone rows stay equal to the total. Candidates:
  - the O10 line: the solver and templates (16), the mutation (18), the dossier contract (20, 22);
  - the O17/O18/O19 line: designation templates (19), wealth bands (27), entrances and basements (29);
  - the O9 line: rejection and positive placement, the elaboration cache and click policy (28);
  - the O14 line: the hinterland order and demand (26);
  - the parity floors: markets (24);
  - hooks priced at M4 beside the incremental path: 8, 11, 17, 25 and the island and underground hooks.
* **Entity registry.** Every new record type or field set enters §2.8's entity registry and §13.2's path-completeness
  test: `Use`, `Entrance`, the basement record, the rejection record, the elaboration-cache entries, the salvage ledger,
  the underground plot and building fields, the plot's `builtBand` with its migration hook (item 31), and the plan
  room's household unit (item 28 (f)).
* **J-A rows.** Every ruling above becomes a `J-A<item>` row in the Judgment-calls index, with a Part A entry in
  `docs/ARCHITECTURE-RATIONALE.md`, plain-language and vetoable (the block protocol's `J-ROWS` and `RATIONALE-A` blocks).
* **Document checks.** `docs/validation/bench/doc_checks.py` runs on every changed section. Items 28 and 29 are the risk:
  no Dwellings room-name list, tag list, glyph or palette may enter the document (checks (iii) and (vi)). Author our own
  room programme. Quote a creator's sentence only under 15 words, for traceability. Note:
  `research/findings/dwellings-posts.md` already raised one unreviewed C3 false positive, assigned to the assembler's
  allow row (`consistency/validate`).
* **Staged list (scope).** *Staged by the owner's roadmap* gains, in its rows:
  - evolution: 8, 11, 17, 22 (e) and 25;
  - sewers and floating islands: 10–15;
  - stage 3: 28's plan rung;
  - SettlementForge inputs: the hooks of 20 and 22.
  The list stays the one list of staged subjects.

## Stale text the verifiers must find gone (state the old rule; each is cited in its item above)

| where (snapshot) | stale sentence or rule | item |
|---|---|---|
| II.6, floating islands | "The toggle creates 1–3 islands." and `IslandRule.maxIslands: 1\|2\|3` as the toggle's effect | 13, 15 |
| §4.5 S7b (5) | "When the island toggle is on, S7b creates …"; the area "drawn from `IslandRule.areaHaBand`" | 10, 13, 15 |
| §4.2 S3 (1) | "the best is the **centre / market**" (market and centre fused by law) | 24 |
| one-page summary | "the market square, the castle and the large precincts are reserved" | 24 |
| §4.11, the evolution hook | "a decline rule table — periphery, lowest value, noxious and extramural first, never locked or assigned" (a fixed order) | 8, 23 |
| §4.11, survivors | "Siting across epochs places only delta demand, only on new or transformed plots" (against regrowth-first) | 8 |
| §7.7, one path | "every `assign` event … runs the same claims-first re-derivation for its scope" (a re-derivation, not a mutation) | 18, 22 |
| §7.7, epochs | "Epochs keep placed members; members are added only by an event that changes the count or the criteria" | 17 |
| §2.6, materials | `MaterialRow` keyed by prosperity band as the default table | 19, 23 |
| §4.5, typing | "only outside the enceinte" in the shanty rule (ours, not FTG's) | 27, 23 |
| §5.2, F-SITING | "reduce the manifest, lowest-priority classes first" with no exclusion for dossier content | 20 |
| §7.1, events | `delete` on a dossier-backed entity as a removal | 20 |
| §17.3, D-22, J-S10 | the proprietary default licence | 21 |
| summary *Clean room*; §1.7 | "every library is permissively licensed, so the owner keeps every licensing choice"; "an open licence choice for the owner (D-22)" | 21 |
| §17.1 (1) | "No code from TownGeneratorOS (GPL-3) … is read for implementation, ported or paraphrased" | 21 |
| §17.4 | "Nothing GPL, AGPL or LGPL is linked or bundled" | 21 |
| §3.1, D-14 | CGAL rejected for its licence ("CGAL is GPL/LGPL — rejected"; "Rejected: CGAL (GPL)") | 21 |
| §2.6 | the single `entrance: VertexRef` | 29 |
| §2.6 | `Composition.lod: ('outline'\|'wings'\|'rooms')[]` without the plan rung | 28 |
| §4.11, survivors | "`densify` / `subdivide` when a plot's value has risen past a cut point …, `decay` when the value has fallen past a cut; at most a table share of a district's plots transforms per epoch" (subdivision on a rise; no protection of occupied buildings; no ladder) | 31 |
| §2.5, the `DerivationRecord` bullet | "a field brush or an epoch compares each plot's current sample with the recorded one and re-derives only what §7.2's τ rule selects" (an epoch re-deriving plots by τ: no ladder, no floor) | 31 |
| §7.4, the structural-ops row | plot `split` and `join` with "dependants re-derived" (a re-derivation, not item 18's mutation) | 31, 18 |
| pending block: `blocks-determinism.md` §5.2, F-PLAN | "tier 6: a hard room omitted and reported", with no exception for a household unit | 28 (f) |
| pending block: `blocks-determinism.md` §7.3, the stale-click row (J-A28.71) | "`BuildingGenerator.plan` with the cached result as `prior`": the plan then depends on when the user clicked, against §6.2's pure function and §6.5 (9)'s click-order identity | 28, 28 (f) |
| pending blocks: `blocks-pipeline-prosperity-change-dossier-plan.md` §4.5 APPEND against `blocks-pipeline-emulation-hidden.md` §4.5 REPLACE | the default middle band as "the row the granularity table calls modest" against `comfortable` (J-A27.42; the median household under the default shares) | 31, 27, 28 (f) |

## For the item-28 editors (and item 29's) — what to read

J36: 09's editors start only when the consistency pass has closed and the Fable Dwellings synthesis has landed, because
item 28's hooks come from it. Read, in this order:

1. `research/findings/dwellings-synthesis.md` — workflows/10's Fable synthesis: KEEP, CHANGE, ADD, the HOOKS item 28
   must carry, and corrections to item 28's drafted interpretation. **Not yet written at 20:00.** It is the primary
   input.
2. `research/findings/_critic-dwellings.md` — workflows/10's Fable critic. Its binding rulings supersede the three
   readers. **Not yet written.**
3. `research/findings/profile-dwellings.md` — the build profile (lane `dwellings/profile`). **IN PROGRESS at 20:00**
   (§1–§3 and §6 written; §0, §4, §5 and §7–§9 pending). Read it once its `LANDED` line appears in
   `docs/lane-events.log`. Its §4 stage reconstruction (partition, doors, stairs, role assignment) and §7 geometry
   statistics are the parts the plan rung needs.
4. `research/findings/dwellings-posts.md` — landed 19:52. Read it whole:
   - §0: ten headline findings — function-first inversion, the stair core first, room-type records, scale;
   - §2 (a)–(p): the method, especially (c) partition, (d) vertical links, (e) roles, (f) entrance, (m) the restrictive
     rerolls, (o) scale;
   - §3: Taverns, the typed-building method;
   - §4: limits and complaints, which become our acceptance bars.
5. `research/findings/dwellings-exports.md` — landed 19:56:
   - §0;
   - §1: the JSON schema as observed — the room graph, doors as edge records, stairs as cell pairs;
   - §3: the statistics — each storey a door tree, the depth order public → private, basement smaller than the ground
     floor, one exit.
6. `docs/confidence/dwellings.md`, `docs/confidence/dwellings-ruling.md` and the Dwellings section of
   `docs/CONFIDENCE.md`, when workflows/10's Assess and Rule seats land.
7. `research/findings/manor.md` §2.9, §2.10, §4.3 and §9 — the Fantasy Manor review; §9 is the precedent synthesis.
8. In the architecture: §2.6 whole (with the wing-carrying rule and the stage-3 contract), §2.8, §2.9, §4.1, §6.1, §7.3,
   §8.5, §8.6, §11.1, §12.7 and PART II.4.
9. For item 28 (f): its section above (the owner's whole message is there), and the landed blocks it names —
   `blocks-pipeline-prosperity-change-dossier-plan.md` (the §4.11 REPLACE's rung 1 and floor paragraph; the §10.2
   APPEND's `households`, `RoomProgramRow` and `RoomRuleRow`; the §4.1 and II.4 APPENDs), `blocks-pipeline-assignments.md`
   (J-A19.43), `blocks-determinism.md` (§5.2's F-PLAN row, §6.1's plan concerns, §6.2's cache rule, §6.5 (9), §7.1's
   plan events and §7.3's stale-click row), and the synthesis §1.2–§1.4 and §2.2.

Clean room: ideas only. The item says "Clean-room: ideas only", and implementers get the architecture and a sanitised
digest (§17.1). The scale, or cell size, is the owner's call (dwellings-posts §0 item 10): take a vetoable default and
record it as `J-A28`.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read on disk):
* every quotation above against the snapshot (sha256 `7a4e19db…c4ec762`);
* the owner's words against `docs/AMENDMENTS-2026-09-25b.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md`;
* the part keys and block protocol against `workflows/09-amendments-b.js`;
* the home rules against `canon.md` and `canon.json → parts`;
* the floor's quotations against the live file at the floor update (sha256 `7a4e19db…c4ec762`, unchanged since the
  snapshot);
* the state of the Dwellings lanes against the files and `docs/lane-events.log` at 20:00;
* item 28 (f): its quotations against the live file (sha256 `1dbfd9d4…`) and the landed block files; the owner's
  whole message against the request the workflow harness relays (the amendments file's quote elides sentences, which
  (f) (a) restores); the landing times against `docs/lane-events.log`; the median-band arithmetic on the emulation
  seat's default shares.

**PLAUSIBLE** (routing judgment):
* the choice of each home where two sections could host an item — 16 (§4.7 rather than §7.7), 17 (§4.11 rather than
  §2.7), 18 (§4.7 S11 rather than §7.3), 20 (§7.7 rather than §11.4), 23 (§7.6 rather than §1.4), 28 and 29 (§2.6 rather
  than §4.1 or §4.7), 30 (§4.6 with a second home at §9.2 for the label policy, rather than §2.5), 31 (§4.11 rather
  than §4.7 S10);
* the SATISFIED verdict for item 9;
* the floor's routing: its home in the Survivors paragraph, with the middle designation at §4.5; the new stale clause
  in §2.5; and the recommendations in item 31 (d) and (f) (brushes stay authorial; a completed refurbishment raises
  `builtBand`);
* the stale-text list as complete for the named rules. It is not a full sweep: every part sweeps its own section;
* item 28 (f): its home at §2.6, with the interior ladder's rule table stated there and the per-class rows kept in §10.2; the
  capacity reading of the owner's last sentence; the recommendations in (f)'s rulings (the field band, band names,
  a household reference on the plan's room, the canonical chain for `prior`, the capacity bound); and the conflict
  between the landed §7.3 `prior` and §6.5 (9)'s click-order identity, which is reasoning, not an executed test.

> Manager note (2026-09-26 21:15): item 31 gained its final paragraph after routing — the geometry FLOOR (`builtBand` and `geometryFloor` on the plot record, §2.5, model as a referencing part; the floor rule in the ladder rows, pipeline home; the cycle rich ↔ middle as rungs 1–2). No new part is touched; the model, pipeline and determinism seats read the item text itself.

> Router update (2026-09-26 21:14): the floor is now routed in item 31's own section — the owner's words and the
> interpretation (a), its state (b: absent as a rule, with its supports and a new stale clause in §2.5's
> `DerivationRecord` bullet), its home in the Survivors paragraph with the middle designation at §4.5 (c), its
> references (d), staging (e), rulings (f) and families (g) — and in `route.json`'s object 31. As the note says, no new
> part is touched.

> Manager note (2026-09-27 00:5x): item 28 gained (f), the INTERIOR LADDER (the room program reads the occupants' band and household count, not the geometry floor; a rule table rich → destitute; re-cut as item 18's mutation inside unchanged wing rings; §13 bar). Homes unchanged: model §2.6 (the model seat, still to run, reads the item text), the rule tables, item 31 rung 1 (a cross-reference added), §10 households. No re-route needed.

> Router update (2026-09-27, the item 28 (f) update): the manager's note holds at the level of parts — no new part is
> touched, so the Route seat's structured summary is unchanged (24 items; 9 satisfied; the same parts and the same item
> lists per part), and the Amend seats keep their keys. (f) is now routed in item 28's own section, `#### Item 28 (f)`:
> the owner's whole message and the reading its last sentence needs (a); the state — ABSENT in the live document, with
> its inputs in landed blocks (b); the home at §2.6 (c); the one-liners owed by the landed pipeline and determinism
> seats and by the rendering and scope seats still to run (d); staging (e); the decisions touched and eight rulings for
> the model seat (f); and the families (g). Three pending-block conflicts that (f) depends on are added to the
> stale-text table: F-PLAN's tier 6, §7.3's `prior`, and the default middle band. `route.json`'s object 28 is updated;
> the other 23 objects are byte-identical.


## Fable review (2026-09-27) — B-amendments-b/route

Reviewer: Fable (claude-fable-5-1), lane fable-review/main/integration (`docs/fable-review/main/integration.md`).
**Verdict: CORRECTED.** The homes follow the canon's home rules R1–R13 (the six contested choices re-derived and
confirmed: 16 → §4.7 S10b, 17 → §4.11, 18 → §4.7 S11, 20 → §7.7, 23 → §7.6, 28 and 29 → §2.6; 30's two homes; 31 → §4.11),
the seven rule families are right, item 9's SATISFIED holds, and the rulings this route flagged were the right ones to
flag. One correction, which every later reader of this file must apply:

**Item 21 is superseded.** The section "Item 21 — Licence: this module is GPL-3" above, its consequences (a)–(e) — in
particular (c), "TownGeneratorOS … may be consulted and adapted with attribution" — and the six rows of the stale-text
table attributed to item 21 (§17.3 / D-22 / J-S10's proprietary default; the summary's *Clean room* and §1.7's
permissive-licence sentences; §17.1 (1)'s "No code from TownGeneratorOS (GPL-3) …"; §17.4's "Nothing GPL, AGPL or LGPL
is linked or bundled"; §3.1 / D-14's CGAL rejection) were routed on the owner's 2026-09-25 intent. On 2026-09-27 the
owner ruled "then lets stay private for now", and item 21 of `docs/AMENDMENTS-2026-09-25b.md` now reads PRIVATE FOR
NOW: the proprietary default of §17.3 / D-22 STANDS and is SATISFIED by the current text; J23's permission to consult and
adapt TownGeneratorOS is WITHDRAWN (an idea source only); the clean-room chain of §17.1 stays absolute; dependencies stay
permissive-only (§17.4); the separate-program shape is kept by design choice, not by licence. Those six stale-text rows
are therefore WITHDRAWN: the text they name is the ruled text and must stand. The design already carries the ruling —
§17.3, §17.4 and D-22 unchanged, §17.1 (1) with its J-A21.01 pointer, J-A21.01 / J-A21.31 / J-A21.81 in the index and
Part A, §0.2's row 21 "SATISFIED by the owner's ruling of 2026-09-27" — so no design block follows from this review.
Read item 21 in the amendments file, never in this route.
